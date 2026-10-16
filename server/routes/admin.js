const crypto = require('node:crypto');
const jwt = require('jsonwebtoken');
const db = require('../db');
const { hashPassword } = require('../utils/password');
const { COURSES } = require('../middleware/access-control');
const aiPool = require('../services/ai-pool');

function timingSafeCompare(a, b) {
  const digestA = crypto.createHash('sha256').update(String(a)).digest();
  const digestB = crypto.createHash('sha256').update(String(b)).digest();
  return crypto.timingSafeEqual(digestA, digestB);
}

/**
 * Vérifie le token admin. Retourne true si valide, false sinon.
 */
function verifyAdmin(request) {
  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret || !String(jwtSecret).trim()) return false;
    const token = request.cookies && request.cookies.admin_token;
    if (!token) return false;
    const decoded = jwt.verify(token, jwtSecret);
    return Boolean(decoded && decoded.admin === true);
  } catch {
    return false;
  }
}

module.exports = async function adminRoutes(fastify) {

  // Hook de pré-validation : protéger toutes les routes admin sauf /login
  fastify.addHook('onRequest', async (request, reply) => {
    const urlPath = request.url.split('?')[0];
    if (urlPath === '/api/admin/login' && request.method === 'POST') return;
    if (urlPath.startsWith('/api/admin/courses')) return;

    if (!verifyAdmin(request)) {
      return reply.code(401).send({ success: false, message: 'Non autorisé' });
    }
  });

  /**
   * POST /api/admin/login — rate-limit 5/min
   */
  fastify.post('/login', {
    config: { rateLimit: { max: 5, timeWindow: '1 minute' } }
  }, async (request, reply) => {
    try {
      const adminUsername = process.env.ADMIN_USERNAME;
      const adminPassword = process.env.ADMIN_PASSWORD;
      const jwtSecret = process.env.JWT_SECRET;

      if (
        typeof adminUsername !== 'string' || !adminUsername.trim() ||
        typeof adminPassword !== 'string' || !adminPassword.trim() ||
        typeof jwtSecret !== 'string' || !jwtSecret.trim()
      ) {
        return reply.code(503).send({
          success: false,
          message: 'Administration désactivée : identifiants non configurés.'
        });
      }

      const { username, password } = request.body || {};

      if (
        typeof username !== 'string' ||
        typeof password !== 'string' ||
        username.trim().length === 0 ||
        password.length === 0
      ) {
        await db.logActivity('admin_login_failed', {
          ip: request.ip,
          details: 'Tentative de connexion échouée - user: ' + String(username || '(vide)').replace(/[<>&"']/g, '').slice(0, 80)
        });
        return reply.code(401).send({ success: false, message: 'Identifiants incorrects' });
      }

      const usernameValid = timingSafeCompare(username, adminUsername);
      const passwordValid = timingSafeCompare(password, adminPassword);

      if (usernameValid && passwordValid) {
        const isProd = process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production';
        const token = jwt.sign({ admin: true }, jwtSecret, { expiresIn: '8h' });

        reply.setCookie('admin_token', token, {
          httpOnly: true,
          secure: isProd,
          sameSite: 'lax',
          maxAge: 8 * 60 * 60,
          path: '/',
          domain: process.env.COOKIE_DOMAIN || undefined
        });

        await db.logActivity('admin_login', { ip: request.ip, details: 'Connexion admin réussie' });
        return reply.send({ success: true, message: 'Connexion réussie' });
      }

      await db.logActivity('admin_login_failed', {
        ip: request.ip,
        details: 'Tentative de connexion échouée - user: ' + String(username || '(vide)').replace(/[<>&"']/g, '').slice(0, 80)
      });

      return reply.code(401).send({ success: false, message: 'Identifiants incorrects' });
    } catch (err) {
      fastify.log.error(err);
      return reply.code(500).send({ success: false, message: 'Erreur serveur' });
    }
  });

  fastify.post('/logout', async (request, reply) => {
    reply.clearCookie('admin_token', { path: '/', domain: process.env.COOKIE_DOMAIN || undefined });
    return reply.send({ success: true });
  });

  fastify.get('/verify', async (request, reply) => {
    return reply.send({ authenticated: true });
  });

  fastify.get('/courses', async (request, reply) => {
    return reply.send(COURSES);
  });

  /**
   * GET /api/admin/stats — stats comptes utilisateurs
   */
  fastify.get('/stats', async (request, reply) => {
    try {
      const result = await db.query(`
        SELECT
          (SELECT COUNT(*) FROM users) AS total_users,
          (SELECT COUNT(*) FROM users WHERE subscription_status = 'active' AND (subscription_expires_at IS NULL OR subscription_expires_at > CURRENT_TIMESTAMP)) AS subscribed_users,
          (SELECT COUNT(*) FROM users WHERE is_active = FALSE) AS disabled_users,
          (SELECT COUNT(*) FROM sessions WHERE is_valid = TRUE) AS active_sessions,
          (SELECT COUNT(*) FROM users WHERE subscription_expires_at IS NOT NULL AND subscription_expires_at BETWEEN CURRENT_TIMESTAMP AND CURRENT_TIMESTAMP + INTERVAL '7 days') AS expiring_soon,
          (SELECT COALESCE(SUM(amount), 0) FROM payments WHERE status = 'approved') AS revenue_total,
          (SELECT COUNT(*) FROM payments WHERE status = 'approved') AS payments_count
      `);
      return reply.send(result.rows[0]);
    } catch (err) {
      fastify.log.error(err);
      return reply.code(500).send({ message: 'Erreur serveur' });
    }
  });

  /**
   * GET /api/admin/users?filter=all|subscribed|free|disabled&search=
   */
  fastify.get('/users', async (request, reply) => {
    try {
      const { filter = 'all', search = '' } = request.query;
      const conditions = [];
      const params = [];

      if (filter === 'subscribed') {
        conditions.push(`subscription_status = 'active' AND (subscription_expires_at IS NULL OR subscription_expires_at > CURRENT_TIMESTAMP)`);
      } else if (filter === 'free') {
        conditions.push(`(subscription_status != 'active' OR (subscription_expires_at IS NOT NULL AND subscription_expires_at <= CURRENT_TIMESTAMP))`);
      } else if (filter === 'disabled') {
        conditions.push('is_active = FALSE');
      }

      if (search && String(search).trim()) {
        params.push('%' + String(search).trim() + '%');
        conditions.push(`(email ILIKE $${params.length} OR COALESCE(display_name, '') ILIKE $${params.length})`);
      }

      let sql = `
        SELECT u.*,
          (SELECT COUNT(*)::int FROM sessions s WHERE s.user_id = u.id AND s.is_valid = TRUE) AS active_sessions
        FROM users u`;
      if (conditions.length) sql += ' WHERE ' + conditions.join(' AND ');
      sql += ' ORDER BY u.created_at DESC';

      const result = await db.query(sql, params);
      return reply.send(result.rows);
    } catch (err) {
      fastify.log.error(err);
      return reply.code(500).send({ message: 'Erreur serveur' });
    }
  });

  /**
   * POST /api/admin/users — créer un compte (email, password, displayName, months?)
   */
  fastify.post('/users', async (request, reply) => {
    try {
      const { email, password, displayName, months } = request.body || {};
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
        return reply.code(400).send({ success: false, message: 'Email invalide' });
      }
      if (!password || String(password).length < 8) {
        return reply.code(400).send({ success: false, message: 'Mot de passe : 8 caractères minimum' });
      }

      const existing = await db.getUserByEmail(email);
      if (existing) {
        return reply.code(409).send({ success: false, message: 'Un compte existe déjà avec cet email' });
      }

      let user = await db.createUser(email, hashPassword(String(password)), displayName);
      if (months && Number(months) > 0) {
        user = await db.extendSubscription(user.id, Number(months), 'admin');
      }

      await db.logActivity('admin_user_created', {
        userId: user.id,
        email: user.email,
        ip: request.ip,
        details: `Compte créé par l'admin${months ? ` — abonnement ${months} mois` : ' (gratuit)'}`
      });

      return reply.send({ success: true, message: 'Compte créé', user });
    } catch (err) {
      fastify.log.error(err);
      return reply.code(500).send({ success: false, message: 'Erreur serveur' });
    }
  });

  /**
   * POST /api/admin/users/:id/subscribe — { months } : prolonge l'abonnement
   */
  fastify.post('/users/:id/subscribe', async (request, reply) => {
    try {
      const { id } = request.params;
      const months = Math.max(1, Math.min(36, Number((request.body || {}).months) || 1));
      const user = await db.extendSubscription(parseInt(id), months, 'admin');
      if (!user) return reply.code(404).send({ success: false, message: 'Utilisateur introuvable' });

      await db.logActivity('admin_subscribed', {
        userId: user.id,
        email: user.email,
        ip: request.ip,
        details: `Abonnement +${months} mois (jusqu'au ${user.subscription_expires_at})`
      });
      return reply.send({ success: true, message: `Abonnement prolongé de ${months} mois`, user });
    } catch (err) {
      fastify.log.error(err);
      return reply.code(500).send({ success: false, message: 'Erreur serveur' });
    }
  });

  /**
   * POST /api/admin/users/:id/unsubscribe — retire l'abonnement
   */
  fastify.post('/users/:id/unsubscribe', async (request, reply) => {
    try {
      const { id } = request.params;
      const user = await db.setSubscription(parseInt(id), 'free', null, 'admin');
      if (!user) return reply.code(404).send({ success: false, message: 'Utilisateur introuvable' });

      await db.query('UPDATE sessions SET is_valid = FALSE WHERE user_id = $1', [user.id]);
      await db.logActivity('admin_unsubscribed', {
        userId: user.id,
        email: user.email,
        ip: request.ip,
        details: 'Abonnement retiré, sessions invalidées'
      });
      return reply.send({ success: true, message: 'Abonnement retiré', user });
    } catch (err) {
      fastify.log.error(err);
      return reply.code(500).send({ success: false, message: 'Erreur serveur' });
    }
  });

  /**
   * POST /api/admin/users/:id/reset-sessions — déverrouille l'appareil (kick toutes les sessions)
   */
  fastify.post('/users/:id/reset-sessions', async (request, reply) => {
    try {
      const { id } = request.params;
      const user = await db.getUserById(parseInt(id));
      if (!user) return reply.code(404).send({ success: false, message: 'Utilisateur introuvable' });

      await db.query('UPDATE sessions SET is_valid = FALSE WHERE user_id = $1', [user.id]);
      await db.logActivity('admin_sessions_reset', {
        userId: user.id,
        email: user.email,
        ip: request.ip,
        details: 'Sessions réinitialisées (appareil déverrouillé)'
      });
      return reply.send({ success: true, message: 'Toutes les sessions ont été invalidées. Le user pourra se connecter sur un nouvel appareil.' });
    } catch (err) {
      fastify.log.error(err);
      return reply.code(500).send({ success: false, message: 'Erreur serveur' });
    }
  });

  /**
   * POST /api/admin/users/:id/toggle-active — activer/désactiver le compte
   */
  fastify.post('/users/:id/toggle-active', async (request, reply) => {
    try {
      const { id } = request.params;
      const user = await db.getUserById(parseInt(id));
      if (!user) return reply.code(404).send({ success: false, message: 'Utilisateur introuvable' });

      const newState = !user.is_active;
      await db.query('UPDATE users SET is_active = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2', [newState, user.id]);
      if (!newState) {
        await db.query('UPDATE sessions SET is_valid = FALSE WHERE user_id = $1', [user.id]);
      }

      await db.logActivity('admin_user_toggled', {
        userId: user.id,
        email: user.email,
        ip: request.ip,
        details: newState ? 'Compte réactivé' : 'Compte désactivé (sessions invalidées)'
      });
      return reply.send({ success: true, message: newState ? 'Compte réactivé' : 'Compte désactivé', is_active: newState });
    } catch (err) {
      fastify.log.error(err);
      return reply.code(500).send({ success: false, message: 'Erreur serveur' });
    }
  });

  /**
   * DELETE /api/admin/users/:id
   */
  fastify.delete('/users/:id', async (request, reply) => {
    try {
      const { id } = request.params;
      const user = await db.getUserById(parseInt(id));
      if (!user) return reply.code(404).send({ success: false, message: 'Utilisateur introuvable' });

      await db.query('DELETE FROM users WHERE id = $1', [user.id]);
      await db.logActivity('admin_user_deleted', {
        email: user.email,
        ip: request.ip,
        details: 'Compte supprimé définitivement'
      });
      return reply.send({ success: true, message: 'Compte supprimé définitivement' });
    } catch (err) {
      fastify.log.error(err);
      return reply.code(500).send({ success: false, message: 'Erreur serveur' });
    }
  });

  /**
   * GET /api/admin/sessions — sessions actives avec email user
   */
  fastify.get('/sessions', async (request, reply) => {
    try {
      const result = await db.query(`
        SELECT s.*, u.email, u.display_name
        FROM sessions s
        LEFT JOIN users u ON s.user_id = u.id
        ORDER BY s.created_at DESC
        LIMIT 500
      `);
      return reply.send(result.rows);
    } catch (err) {
      fastify.log.error(err);
      return reply.code(500).send({ message: 'Erreur serveur' });
    }
  });

  /**
   * POST /api/admin/sessions/:id/revoke
   */
  fastify.post('/sessions/:id/revoke', async (request, reply) => {
    try {
      const { id } = request.params;
      const session = await db.revokeSession(parseInt(id));
      if (!session) return reply.code(404).send({ success: false, message: 'Session introuvable' });
      return reply.send({ success: true, message: 'Session révoquée.', session });
    } catch (err) {
      fastify.log.error(err);
      return reply.code(500).send({ success: false, message: 'Erreur serveur' });
    }
  });

  /**
   * GET /api/admin/payments — historique paiements
   */
  fastify.get('/payments', async (request, reply) => {
    try {
      const result = await db.query(`
        SELECT p.*, u.email
        FROM payments p
        LEFT JOIN users u ON p.user_id = u.id
        ORDER BY p.created_at DESC
        LIMIT 200
      `);
      return reply.send(result.rows);
    } catch (err) {
      fastify.log.error(err);
      return reply.code(500).send({ message: 'Erreur serveur' });
    }
  });

  /**
   * GET /api/admin/logs — journal d'activité
   */
  fastify.get('/logs', async (request, reply) => {
    try {
      const { limit = 100, offset = 0, type = null } = request.query;
      const [logs, total] = await Promise.all([
        db.getActivityLogs(parseInt(limit), parseInt(offset), type || null),
        db.getActivityLogsCount(type || null)
      ]);
      return reply.send({ logs, total, limit: parseInt(limit), offset: parseInt(offset) });
    } catch (err) {
      fastify.log.error(err);
      return reply.code(500).send({ message: 'Erreur serveur' });
    }
  });

  // ==========================================
  // Routes Gestion IA Multi-Fournisseurs & Clés
  // ==========================================

  /**
   * GET /api/admin/ai/config — récupère la configuration IA active et les métadonnées des fournisseurs
   */
  fastify.get('/ai/config', async (request, reply) => {
    try {
      const config = await aiPool.getConfig();
      return reply.send({
        success: true,
        config,
        providers: aiPool.PROVIDERS
      });
    } catch (err) {
      fastify.log.error(err);
      return reply.code(500).send({ success: false, message: 'Erreur lors de la récupération de la configuration IA.' });
    }
  });

  /**
   * POST /api/admin/ai/config — met à jour le fournisseur actif et les modèles
   */
  fastify.post('/ai/config', async (request, reply) => {
    try {
      const { active_provider, chat_model, code_model, temperature, max_tokens } = request.body || {};
      const updated = await aiPool.updateConfig({
        active_provider,
        chat_model,
        code_model,
        temperature,
        max_tokens
      });
      await db.logActivity('admin_ai_config_updated', {
        ip: request.ip,
        details: `Fournisseur IA actif : ${updated.active_provider}, chat : ${updated.chat_model}, code : ${updated.code_model}`
      });
      return reply.send({ success: true, message: 'Configuration IA enregistrée avec succès.', config: updated });
    } catch (err) {
      fastify.log.error(err);
      return reply.code(500).send({ success: false, message: err.message || 'Erreur lors de la mise à jour.' });
    }
  });

  /**
   * GET /api/admin/ai/keys — liste les clés configurées avec statut et compteurs
   */
  fastify.get('/ai/keys', async (request, reply) => {
    try {
      const { provider } = request.query || {};
      const keys = await aiPool.getKeys(provider || null);
      return reply.send({ success: true, keys });
    } catch (err) {
      fastify.log.error(err);
      return reply.code(500).send({ success: false, message: 'Erreur lors de la récupération des clés IA.' });
    }
  });

  /**
   * POST /api/admin/ai/keys — ajoute une clé au pool
   */
  fastify.post('/ai/keys', async (request, reply) => {
    try {
      const { provider, apiKey, label, baseUrl } = request.body || {};
      if (!apiKey || !apiKey.trim()) {
        return reply.code(400).send({ success: false, message: 'La clé API est requise.' });
      }
      const newKey = await aiPool.addKey({ provider, apiKey, label, baseUrl });
      await db.logActivity('admin_ai_key_added', {
        ip: request.ip,
        details: `Ajout clé ${newKey.provider} (id: ${newKey.id}, label: ${newKey.label})`
      });
      return reply.send({ success: true, message: 'Clé ajoutée au pool.', key: newKey });
    } catch (err) {
      fastify.log.error(err);
      return reply.code(400).send({ success: false, message: err.message || 'Erreur lors de l’ajout de la clé.' });
    }
  });

  /**
   * DELETE /api/admin/ai/keys/:id — supprime une clé du pool
   */
  fastify.delete('/ai/keys/:id', async (request, reply) => {
    try {
      const { id } = request.params;
      await aiPool.deleteKey(id);
      await db.logActivity('admin_ai_key_deleted', {
        ip: request.ip,
        details: `Suppression clé IA #${id}`
      });
      return reply.send({ success: true, message: 'Clé supprimée avec succès.' });
    } catch (err) {
      fastify.log.error(err);
      return reply.code(500).send({ success: false, message: 'Erreur lors de la suppression de la clé.' });
    }
  });

  /**
   * POST /api/admin/ai/keys/:id/toggle — active ou désactive une clé
   */
  fastify.post('/ai/keys/:id/toggle', async (request, reply) => {
    try {
      const { id } = request.params;
      const res = await aiPool.toggleKey(id);
      if (!res) {
        return reply.code(404).send({ success: false, message: 'Clé introuvable.' });
      }
      await db.logActivity('admin_ai_key_toggled', {
        ip: request.ip,
        details: `Statut clé #${id} changé en : ${res.isActive ? 'Actif' : 'Désactivé'}`
      });
      return reply.send({ success: true, key: res });
    } catch (err) {
      fastify.log.error(err);
      return reply.code(500).send({ success: false, message: 'Erreur lors du changement de statut.' });
    }
  });

  /**
   * POST /api/admin/ai/fetch-models — interroge l'API du fournisseur pour lister les modèles réels
   */
  fastify.post('/ai/fetch-models', async (request, reply) => {
    try {
      const { provider, apiKey, baseUrl } = request.body || {};
      const models = await aiPool.fetchModels(provider, apiKey, baseUrl);
      return reply.send({ success: true, models });
    } catch (err) {
      fastify.log.error(err);
      return reply.code(500).send({ success: false, message: 'Impossible de récupérer la liste des modèles.' });
    }
  });

  /**
   * POST /api/admin/ai/test-key — teste la connectivité et la latence d'une clé API
   */
  fastify.post('/ai/test-key', async (request, reply) => {
    try {
      const result = await aiPool.testKey(request.body || {});
      return reply.send({ success: true, ...result });
    } catch (err) {
      fastify.log.error(err);
      return reply.code(500).send({ success: false, ok: false, error: err.message });
    }
  });
};
