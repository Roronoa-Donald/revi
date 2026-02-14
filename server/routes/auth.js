const jwt = require('jsonwebtoken');
const db = require('../db');
const { generateJti, hashFingerprint } = require('../utils/keygen');
const { COURSES, COURSE_ICONS, COURSE_THEMES } = require('../middleware/access-control');

const JWT_SECRET = process.env.JWT_SECRET;
const IS_PROD = process.env.NODE_ENV === 'production';

module.exports = async function authRoutes(fastify) {

  /**
   * GET /api/course-info?course=xxx
   * Retourne le nom et l'icône d'un cours à partir de son identifiant
   */
  fastify.get('/course-info', async (request, reply) => {
    const { course } = request.query;
    if (course && COURSES[course]) {
      return reply.send({
        id: course,
        name: COURSES[course],
        icon: COURSE_ICONS[course] || '📚',
        theme: COURSE_THEMES[course] || null
      });
    }
    return reply.send({ id: null, name: null, icon: '🔑', theme: null });
  });

  /**
   * POST /api/activate
   * Active une clé et crée une session
   * Rate-limit : 5 tentatives/minute par IP
   */
  fastify.post('/activate', {
    config: {
      rateLimit: {
        max: 5,
        timeWindow: '1 minute'
      }
    }
  }, async (request, reply) => {
    try {
      const { key, fingerprint } = request.body || {};

      if (!key || !fingerprint) {
        return reply.code(400).send({
          success: false,
          message: 'Clé d\'activation et fingerprint requis'
        });
      }

      // Valider le format XXXX-XXXX
      const keyRegex = /^[A-Z0-9]{4}-[A-Z0-9]{4}$/;
      if (!keyRegex.test(key.toUpperCase())) {
        return reply.code(400).send({
          success: false,
          message: 'Format de clé invalide. Attendu: XXXX-XXXX'
        });
      }

      const keyCode = key.toUpperCase();
      const fpHash = hashFingerprint(fingerprint);

      // Chercher la clé en base
      const keyRecord = await db.getKeyByCode(keyCode);

      if (!keyRecord) {
        return reply.code(404).send({
          success: false,
          message: 'Clé d\'activation introuvable'
        });
      }

      if (!keyRecord.is_active) {
        return reply.code(403).send({
          success: false,
          message: 'Cette clé a été révoquée par l\'administrateur'
        });
      }

      // Vérifier si la clé est expirée
      if (keyRecord.expires_at && new Date(keyRecord.expires_at) < new Date()) {
        return reply.code(403).send({
          success: false,
          message: 'Cette clé a expiré. Contactez l\'administrateur.'
        });
      }

      // Si la clé est déjà utilisée
      if (keyRecord.is_used) {
        // Vérifier si c'est la même machine (re-activation autorisée)
        if (keyRecord.machine_fingerprint !== fpHash) {
          return reply.code(403).send({
            success: false,
            message: 'Cette clé est déjà utilisée sur un autre appareil. Contactez l\'administrateur pour une réinitialisation.'
          });
        }
        // Même machine → invalider l'ancienne session et en créer une nouvelle
        const oldSessions = await db.query(
          'SELECT jti FROM sessions WHERE key_id = $1 AND is_valid = TRUE',
          [keyRecord.id]
        );
        for (const s of oldSessions.rows) {
          await db.revokeSessionByJti(s.jti);
        }
      } else {
        // Marquer comme utilisée
        await db.markKeyUsed(keyRecord.id, fpHash);
      }

      // Créer une nouvelle session
      const jti = generateJti();
      await db.createSession(keyRecord.id, jti, fpHash);

      // Générer le JWT
      const token = jwt.sign(
        {
          keyId: keyRecord.id,
          scope: keyRecord.scope,
          jti: jti
        },
        JWT_SECRET,
        { expiresIn: '30d' }
      );

      // Placer le JWT dans un cookie httpOnly
      reply.setCookie('auth_token', token, {
        httpOnly: true,
        secure: IS_PROD,
        sameSite: 'lax',
        path: '/',
        maxAge: 30 * 24 * 60 * 60, // 30 jours
        domain: process.env.COOKIE_DOMAIN || undefined
      });

      // Logger l'activation
      await db.logActivity('activation', {
        keyId: keyRecord.id,
        keyCode: keyCode,
        scope: keyRecord.scope,
        ip: request.ip,
        fingerprint: fpHash,
        details: 'Clé activée avec succès'
      });

      return reply.send({
        success: true,
        scope: keyRecord.scope,
        message: 'Clé activée avec succès ! Vous avez maintenant accès aux contenus.'
      });

    } catch (err) {
      fastify.log.error(err);
      return reply.code(500).send({
        success: false,
        message: 'Erreur serveur lors de l\'activation'
      });
    }
  });

  /**
   * GET /api/verify
   * Vérifie si la session courante est valide
   */
  fastify.get('/verify', async (request, reply) => {
    try {
      const token = request.cookies.auth_token;

      if (!token) {
        return reply.send({ authenticated: false });
      }

      const decoded = jwt.verify(token, JWT_SECRET);

      // Vérifier la session en base
      const session = await db.getSessionByJti(decoded.jti);
      if (!session || !session.is_valid) {
        return reply.send({ authenticated: false });
      }

      // Vérifier que la clé est toujours active
      const keyRecord = await db.getKeyById(decoded.keyId);
      if (!keyRecord || !keyRecord.is_active) {
        return reply.send({ authenticated: false });
      }

      // Vérifier si la clé est expirée
      if (keyRecord.expires_at && new Date(keyRecord.expires_at) < new Date()) {
        return reply.send({ authenticated: false, reason: 'expired' });
      }

      // Mettre à jour last_verified
      await db.updateSessionVerified(decoded.jti);

      return reply.send({
        authenticated: true,
        scope: decoded.scope
      });

    } catch (err) {
      // JWT invalide ou expiré
      return reply.send({ authenticated: false });
    }
  });

  /**
   * POST /api/verify-fingerprint
   * Vérifie le fingerprint actuel vs. celui stocké
   */
  fastify.post('/verify-fingerprint', async (request, reply) => {
    try {
      const token = request.cookies.auth_token;
      const { fingerprint } = request.body || {};

      if (!token || !fingerprint) {
        return reply.send({ valid: false });
      }

      const decoded = jwt.verify(token, JWT_SECRET);
      const session = await db.getSessionByJti(decoded.jti);

      if (!session || !session.is_valid) {
        return reply.send({ valid: false });
      }

      const fpHash = hashFingerprint(fingerprint);
      if (session.machine_fingerprint !== fpHash) {
        // Fingerprint différent → invalider la session
        await db.revokeSessionByJti(decoded.jti);
        return reply.send({ valid: false, reason: 'fingerprint_mismatch' });
      }

      return reply.send({ valid: true });

    } catch (err) {
      return reply.send({ valid: false });
    }
  });

  /**
   * POST /api/logout
   * Déconnexion (supprime le cookie)
   */
  fastify.post('/logout', async (request, reply) => {
    try {
      const token = request.cookies.auth_token;
      if (token) {
        try {
          const decoded = jwt.verify(token, JWT_SECRET);
          await db.revokeSessionByJti(decoded.jti);
        } catch (e) { /* token invalide, on supprime quand même */ }
      }

      reply.clearCookie('auth_token', { path: '/' });
      return reply.send({ success: true });

    } catch (err) {
      return reply.code(500).send({ success: false });
    }
  });
};
