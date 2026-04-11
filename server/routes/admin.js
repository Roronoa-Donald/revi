const jwt = require('jsonwebtoken');
const db = require('../db');
const { generateActivationKey } = require('../utils/keygen');
const { COURSES } = require('../middleware/access-control');

const JWT_SECRET = process.env.JWT_SECRET;
const IS_PROD = process.env.NODE_ENV === 'production';

// Classe de clés gérée par cet admin (B2 par défaut, overridé par B1)
const KEY_CLASS = process.env.KEY_CLASS || 'b2';

/**
 * Vérifie le token admin. Retourne true si valide, false sinon.
 */
function verifyAdmin(request) {
  try {
    const token = request.cookies.admin_token;
    if (!token) return false;
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded.admin === true;
  } catch {
    return false;
  }
}

module.exports = async function adminRoutes(fastify) {

  // Hook de pré-validation : protéger toutes les routes admin sauf /login
  fastify.addHook('onRequest', async (request, reply) => {
    // Autoriser /api/admin/login sans authentification
    const urlPath = request.url.split('?')[0];
    if (urlPath === '/api/admin/login' && request.method === 'POST') return;
    // Autoriser la page de login (GET)
    if (urlPath.startsWith('/api/admin/courses')) return;

    if (!verifyAdmin(request)) {
      return reply.code(401).send({ success: false, message: 'Non autorisé' });
    }
  });

  /**
   * POST /api/admin/login
   * Rate-limit : 5 tentatives/minute
   */
  fastify.post('/login', {
    config: {
      rateLimit: {
        max: 5,
        timeWindow: '1 minute'
      }
    }
  }, async (request, reply) => {
    try {
      const { username, password } = request.body || {};

      if (
        username === process.env.ADMIN_USERNAME &&
        password === process.env.ADMIN_PASSWORD
      ) {
        const token = jwt.sign({ admin: true }, JWT_SECRET, { expiresIn: '8h' });

        reply.setCookie('admin_token', token, {
          httpOnly: true,
          secure: IS_PROD,
          sameSite: 'lax',
          path: '/',
          maxAge: 8 * 60 * 60,
          domain: process.env.COOKIE_DOMAIN || undefined
        });

        await db.logActivity('admin_login', {
          ip: request.ip,
          details: 'Connexion admin réussie'
        });

        return reply.send({ success: true, message: 'Connexion réussie' });
      }

      await db.logActivity('admin_login_failed', {
        ip: request.ip,
        details: 'Tentative de connexion échouée - user: ' + (username || '(vide)')
      });

      return reply.code(401).send({
        success: false,
        message: 'Identifiants incorrects'
      });

    } catch (err) {
      fastify.log.error(err);
      return reply.code(500).send({ success: false, message: 'Erreur serveur' });
    }
  });

  /**
   * POST /api/admin/logout
   */
  fastify.post('/logout', async (request, reply) => {
    reply.clearCookie('admin_token', { path: '/' });
    return reply.send({ success: true });
  });

  /**
   * GET /api/admin/verify
   */
  fastify.get('/verify', async (request, reply) => {
    return reply.send({ authenticated: true });
  });

  /**
   * GET /api/admin/courses
   * Liste des cours disponibles (pour le formulaire de création)
   */
  fastify.get('/courses', async (request, reply) => {
    return reply.send(COURSES);
  });

  /**
   * GET /api/admin/stats
   */
  fastify.get('/stats', async (request, reply) => {
    try {
      const stats = await db.getStatsByClass(KEY_CLASS);
      return reply.send(stats);
    } catch (err) {
      fastify.log.error(err);
      return reply.code(500).send({ message: 'Erreur serveur' });
    }
  });

  /**
   * GET /api/admin/keys
   * Liste toutes les clés avec filtre et recherche optionnels
   */
  fastify.get('/keys', async (request, reply) => {
    try {
      const { filter, search } = request.query;
      const keys = await db.getAllKeysByClass(KEY_CLASS, filter, search);
      return reply.send(keys);
    } catch (err) {
      fastify.log.error(err);
      return reply.code(500).send({ message: 'Erreur serveur' });
    }
  });

  /**
   * POST /api/admin/keys
   * Créer une ou plusieurs clés
   */
  fastify.post('/keys', async (request, reply) => {
    try {
      const { scope = 'all', note = '', count = 1 } = request.body || {};
      const numKeys = Math.min(Math.max(1, parseInt(count) || 1), 50); // Max 50 clés à la fois

      // Abonnement mensuel : expiration fixe a 30 jours
      const now = new Date();
      const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

      const createdKeys = [];
      for (let i = 0; i < numKeys; i++) {
        const keyCode = generateActivationKey();
        const key = await db.createKey(keyCode, scope, note, expiresAt, KEY_CLASS);
        createdKeys.push(key);
      }

      return reply.send({
        success: true,
        message: `${numKeys} cles creees - abonnement mensuel 30 jours`,
        keys: createdKeys
      });

    } catch (err) {
      fastify.log.error(err);
      return reply.code(500).send({ success: false, message: 'Erreur lors de la création' });
    }
  });

  /**
   * POST /api/admin/keys/:id/reset
   * Réinitialise une clé (la rend réutilisable sur une nouvelle machine)
   */
  fastify.post('/keys/:id/reset', async (request, reply) => {
    try {
      const { id } = request.params;
      const key = await db.resetKey(parseInt(id));

      if (!key) {
        return reply.code(404).send({ success: false, message: 'Clé introuvable' });
      }

      return reply.send({
        success: true,
        message: 'Clé réinitialisée. L\'ancienne session a été invalidée.',
        key
      });

    } catch (err) {
      fastify.log.error(err);
      return reply.code(500).send({ success: false, message: 'Erreur serveur' });
    }
  });

  /**
   * POST /api/admin/keys/:id/revoke
   * Révoque une clé (désactivation complète)
   */
  fastify.post('/keys/:id/revoke', async (request, reply) => {
    try {
      const { id } = request.params;
      const key = await db.revokeKey(parseInt(id));

      if (!key) {
        return reply.code(404).send({ success: false, message: 'Clé introuvable' });
      }

      return reply.send({
        success: true,
        message: 'Clé révoquée et sessions invalidées.',
        key
      });

    } catch (err) {
      fastify.log.error(err);
      return reply.code(500).send({ success: false, message: 'Erreur serveur' });
    }
  });

  /**
   * POST /api/admin/keys/:id/reactivate
   * Réactive une clé précédemment révoquée
   */
  fastify.post('/keys/:id/reactivate', async (request, reply) => {
    try {
      const { id } = request.params;
      const key = await db.reactivateKey(parseInt(id));

      if (!key) {
        return reply.code(404).send({ success: false, message: 'Clé introuvable' });
      }

      return reply.send({
        success: true,
        message: 'Clé réactivée.',
        key
      });

    } catch (err) {
      fastify.log.error(err);
      return reply.code(500).send({ success: false, message: 'Erreur serveur' });
    }
  });

  /**
   * POST /api/admin/keys/:id/renew
   * Renouvelle l'abonnement (ajoute 30 jours a partir d'aujourd'hui)
   */
  fastify.post('/keys/:id/renew', async (request, reply) => {
    try {
      const { id } = request.params;
      const key = await db.renewKey(parseInt(id));

      if (!key) {
        return reply.code(404).send({ success: false, message: 'Clé introuvable' });
      }

      await db.logActivity('key_renewed', {
        keyId: key.id,
        keyCode: key.key_code,
        scope: key.scope,
        ip: request.ip,
        details: 'Abonnement renouvele (+30 jours)'
      });

      return reply.send({
        success: true,
        message: 'Abonnement renouvele (+30 jours).',
        key
      });

    } catch (err) {
      fastify.log.error(err);
      return reply.code(500).send({ success: false, message: 'Erreur serveur' });
    }
  });

  /**
   * DELETE /api/admin/keys/:id
   * Supprime définitivement une clé
   */
  fastify.delete('/keys/:id', async (request, reply) => {
    try {
      const { id } = request.params;
      await db.deleteKey(parseInt(id));
      return reply.send({ success: true, message: 'Clé supprimée définitivement' });
    } catch (err) {
      fastify.log.error(err);
      return reply.code(500).send({ success: false, message: 'Erreur serveur' });
    }
  });

  /**
   * GET /api/admin/sessions
   * Liste toutes les sessions
   */
  fastify.get('/sessions', async (request, reply) => {
    try {
      const sessions = await db.getAllSessionsByClass(KEY_CLASS);
      return reply.send(sessions);
    } catch (err) {
      fastify.log.error(err);
      return reply.code(500).send({ message: 'Erreur serveur' });
    }
  });

  /**
   * POST /api/admin/sessions/:id/revoke
   * Révoque une session spécifique
   */
  fastify.post('/sessions/:id/revoke', async (request, reply) => {
    try {
      const { id } = request.params;
      const session = await db.revokeSession(parseInt(id));

      if (!session) {
        return reply.code(404).send({ success: false, message: 'Session introuvable' });
      }

      return reply.send({
        success: true,
        message: 'Session révoquée.',
        session
      });

    } catch (err) {
      fastify.log.error(err);
      return reply.code(500).send({ success: false, message: 'Erreur serveur' });
    }
  });

  /**
   * GET /api/admin/stats/courses
   * Statistiques détaillées par cours
   */
  fastify.get('/stats/courses', async (request, reply) => {
    try {
      const stats = await db.getStatsByCourseByClass(KEY_CLASS);
      return reply.send(stats);
    } catch (err) {
      fastify.log.error(err);
      return reply.code(500).send({ message: 'Erreur serveur' });
    }
  });

  /**
   * GET /api/admin/logs
   * Journal d'activité avec pagination et filtre
   */
  fastify.get('/logs', async (request, reply) => {
    try {
      const { limit = 100, offset = 0, type = null } = request.query;
      const [logs, total] = await Promise.all([
        db.getActivityLogsByClass(KEY_CLASS, parseInt(limit), parseInt(offset), type || null),
        db.getActivityLogsCountByClass(KEY_CLASS, type || null)
      ]);
      return reply.send({ logs, total, limit: parseInt(limit), offset: parseInt(offset) });
    } catch (err) {
      fastify.log.error(err);
      return reply.code(500).send({ message: 'Erreur serveur' });
    }
  });
};
