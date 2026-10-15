const jwt = require('jsonwebtoken');
const db = require('../db');
const { generateJti, hashFingerprint } = require('../utils/keygen');
const { hashPassword, verifyPassword, generateToken, sha256 } = require('../utils/password');
const mailer = require('../mailer');
const { COURSES, COURSE_ICONS, COURSE_THEMES, LEVELS, LEVEL_LABELS, normalizeLevel, coursesForLevel, getCourseLevel } = require('../middleware/access-control');

const JWT_SECRET = process.env.JWT_SECRET;
const IS_PROD = process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production';
const SESSION_DAYS = 30;

// Options de cookie symétriques pose/suppression (fix clearCookie + COOKIE_DOMAIN)
function cookieBaseOptions() {
  return { path: '/', domain: process.env.COOKIE_DOMAIN || undefined };
}

function isEmailValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(email || ''));
}

function subscriptionPayload(user) {
  const subscribed = db.hasActiveSubscription(user);
  return {
    subscribed,
    subscriptionStatus: user.subscription_status,
    subscriptionExpiresAt: user.subscription_expires_at
  };
}

/**
 * Crée une session DB + pose le cookie. Une seule session active par user :
 * toute session précédente est révoquée (nouvel appareil = ancien kické).
 */
async function establishSession(reply, user, fingerprintHash) {
  // Conservation de jusqu'à 3 sessions simultanées (PC, mobile, onglets)
  // Révoque uniquement les sessions actives excédentaires les plus anciennes.
  await db.query(
    `UPDATE sessions
     SET is_valid = FALSE
     WHERE user_id = $1
       AND is_valid = TRUE
       AND id NOT IN (
         SELECT id FROM sessions
         WHERE user_id = $1 AND is_valid = TRUE
         ORDER BY created_at DESC
         LIMIT 2
       )`,
    [user.id]
  );

  const jti = generateJti();
  await db.query(
    'INSERT INTO sessions (user_id, jti, machine_fingerprint, platform) VALUES ($1, $2, $3, $4)',
    [user.id, jti, fingerprintHash || 'no-fingerprint', 'b2']
  );

  const token = jwt.sign(
    { userId: user.id, jti },
    JWT_SECRET,
    { expiresIn: `${SESSION_DAYS}d` }
  );

  reply.setCookie('auth_token', token, {
    httpOnly: true,
    secure: IS_PROD,
    sameSite: 'lax',
    maxAge: SESSION_DAYS * 24 * 60 * 60,
    ...cookieBaseOptions()
  });

  return jti;
}

/**
 * Résout la requête en session utilisateur valide, ou null.
 * Vérifie : JWT, session DB valide, user actif.
 */
async function resolveUser(request) {
  const token = request.cookies.auth_token;
  if (!token) return null;
  let decoded;
  try {
    decoded = jwt.verify(token, JWT_SECRET);
  } catch (e) {
    return null;
  }
  if (!decoded || !decoded.userId || !decoded.jti) return null;

  const session = await db.getSessionByJti(decoded.jti);
  if (!session || !session.is_valid || session.user_id !== decoded.userId) return null;

  const user = await db.getUserById(decoded.userId);
  if (!user || !user.is_active) return null;

  return { user, session };
}

module.exports = async function authRoutes(fastify) {

  /**
   * GET /api/course-info?course=xxx
   */
  fastify.get('/course-info', async (request, reply) => {
    const { course } = request.query;
    if (course && COURSES[course]) {
      return reply.send({
        id: course,
        name: COURSES[course],
        icon: COURSE_ICONS[course] || 'book',
        theme: COURSE_THEMES[course] || null
      });
    }
    return reply.send({ id: null, name: null, icon: 'book', theme: null });
  });

  /**
   * POST /api/register — création de compte (gratuit)
   * Rate-limit : 5/min/IP
   */
  fastify.post('/register', {
    config: { rateLimit: { max: 5, timeWindow: '1 minute' } }
  }, async (request, reply) => {
    try {
      const { email, password, displayName, fingerprint, level } = request.body || {};

      if (!isEmailValid(email)) {
        return reply.code(400).send({ success: false, message: 'Adresse email invalide.' });
      }
      if (!password || String(password).length < 8) {
        return reply.code(400).send({ success: false, message: 'Le mot de passe doit contenir au moins 8 caractères.' });
      }

      // Niveau choisi à l'inscription (défaut b2 = préserve l'accès historique).
      const chosenLevel = normalizeLevel(level) || 'b2';

      const existing = await db.getUserByEmail(email);
      if (existing) {
        return reply.code(409).send({ success: false, message: 'Un compte existe déjà avec cet email. Connecte-toi.' });
      }

      const user = await db.createUser(email, hashPassword(String(password)), displayName, chosenLevel);
      const fpHash = fingerprint ? hashFingerprint(fingerprint) : null;
      if (fpHash) await db.touchUserLogin(user.id, fpHash);

      await establishSession(reply, user, fpHash);

      await db.logActivity('user_registered', {
        userId: user.id,
        email: user.email,
        ip: request.ip,
        fingerprint: fpHash,
        details: 'Inscription'
      });

      return reply.send({
        success: true,
        authenticated: true,
        account: { email: user.email, displayName: user.display_name, level: user.level || 'b2' },
        ...subscriptionPayload(user)
      });
    } catch (err) {
      fastify.log.error(err);
      return reply.code(500).send({ success: false, message: 'Erreur serveur lors de l\'inscription.' });
    }
  });

  /**
   * POST /api/login — connexion (kick l'appareil précédent)
   * Rate-limit : 10/min/IP
   */
  fastify.post('/login', {
    config: { rateLimit: { max: 10, timeWindow: '1 minute' } }
  }, async (request, reply) => {
    try {
      const { email, password, fingerprint } = request.body || {};
      if (!email || !password) {
        return reply.code(400).send({ success: false, message: 'Email et mot de passe requis.' });
      }

      const user = await db.getUserByEmail(email);
      // Message générique : pas d'énumération de comptes
      if (!user || !verifyPassword(String(password), user.password_hash)) {
        await db.logActivity('login_failed', {
          email: String(email).slice(0, 200),
          ip: request.ip,
          details: 'Identifiants invalides'
        });
        return reply.code(401).send({ success: false, message: 'Email ou mot de passe incorrect.' });
      }
      if (!user.is_active) {
        return reply.code(403).send({ success: false, message: 'Ce compte est désactivé. Contacte l\'administrateur.' });
      }

      const fpHash = fingerprint ? hashFingerprint(fingerprint) : null;
      await db.touchUserLogin(user.id, fpHash);
      await establishSession(reply, user, fpHash);

      const kicked = await db.query(
        'SELECT COUNT(*)::int AS n FROM activity_logs WHERE event_type = $1 AND user_id = $2 AND created_at > CURRENT_TIMESTAMP - INTERVAL \'2 seconds\'',
        ['session_revoked', user.id]
      );
      void kicked; // informational only

      await db.logActivity('login', {
        userId: user.id,
        email: user.email,
        ip: request.ip,
        fingerprint: fpHash,
        details: 'Connexion (session unique : appareils précédents déconnectés)'
      });

      return reply.send({
        success: true,
        authenticated: true,
        account: { email: user.email, displayName: user.display_name, level: user.level || 'b2' },
        ...subscriptionPayload(user)
      });
    } catch (err) {
      fastify.log.error(err);
      return reply.code(500).send({ success: false, message: 'Erreur serveur lors de la connexion.' });
    }
  });

  /**
   * GET /api/verify — état de session (compat : authenticated + scope 'all' si abonné)
   */
  fastify.get('/verify', async (request, reply) => {
    try {
      const resolved = await resolveUser(request);
      if (!resolved) return reply.send({ authenticated: false });

      await db.query('UPDATE sessions SET last_verified = CURRENT_TIMESTAMP WHERE jti = $1', [resolved.session.jti]);
      const subscribed = db.hasActiveSubscription(resolved.user);

      return reply.send({
        authenticated: true,
        account: { email: resolved.user.email, displayName: resolved.user.display_name, level: resolved.user.level || 'b2' },
        level: resolved.user.level || 'b2',
        scope: subscribed ? 'all' : '',
        keyClass: resolved.user.level || 'b2',
        ...subscriptionPayload(resolved.user)
      });
    } catch (err) {
      fastify.log.error(err);
      return reply.send({ authenticated: false });
    }
  });

  /**
   * GET /api/me — infos compte (page Mon compte)
   */
  fastify.get('/me', async (request, reply) => {
    const resolved = await resolveUser(request);
    if (!resolved) return reply.code(401).send({ authenticated: false });

    const { user, session } = resolved;
    return reply.send({
      authenticated: true,
      account: {
        email: user.email,
        displayName: user.display_name,
        level: user.level || 'b2',
        createdAt: user.created_at,
        lastLoginAt: user.last_login_at
      },
      device: {
        fingerprint: session.machine_fingerprint ? session.machine_fingerprint.slice(0, 12) + '…' : null,
        since: session.created_at
      },
      ...subscriptionPayload(user)
    });
  });

  /**
   * GET /api/courses — catalogue des cours accessibles au compte connecté,
   * groupé par niveau. Utilisé par le switcher de cours et le portail.
   */
  fastify.get('/courses', async (request, reply) => {
    const resolved = await resolveUser(request);
    const userLevel = resolved ? (resolved.user.level || 'b2') : null;

    // Anonyme : catalogue public (gratuit) — les index et chapitre 1 de tous les
    // cours restent consultables ; le switcher complet exige un compte.
    const level = userLevel || normalizeLevel(request.query.level) || 'b1';

    const allowed = new Set(coursesForLevel(level));
    const viewRank = { b1: 1, b2: 2, b3: 3 };
    const userRank = viewRank[level] || 1;

    // Tous les niveaux sont exposés ; `accessible` indique ceux débloqués pour ce
    // compte. Le switcher affiche les niveaux supérieurs verrouillés (UX : montrer
    // ce qui existe au-dessus au lieu de le cacher).
    const levels = LEVELS.map((l) => ({
      id: l,
      label: LEVEL_LABELS[l],
      accessible: (viewRank[l] || 99) <= userRank,
      courses: Object.keys(COURSES)
        .filter((id) => getCourseLevel(id) === l)
        .map((id) => ({
          id,
          name: COURSES[id].name,
          icon: COURSE_ICONS[id] || 'book',
          theme: COURSE_THEMES[id] || null,
          locked: !allowed.has(id)
        }))
    }));

    return reply.send({
      authenticated: Boolean(resolved),
      level,
      levels,
      total: allowed.size
    });
  });

  /**
   * POST /api/logout
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
      reply.clearCookie('auth_token', cookieBaseOptions());
      return reply.send({ success: true });
    } catch (err) {
      return reply.code(500).send({ success: false });
    }
  });

  // ==========================================================================
  // Mot de passe oublié / réinitialisation
  // ==========================================================================

  /**
   * POST /api/forgot-password — demande de reset (réponse générique)
   */
  fastify.post('/forgot-password', {
    config: { rateLimit: { max: 3, timeWindow: '1 minute' } }
  }, async (request, reply) => {
    try {
      const { email } = request.body || {};
      const generic = { success: true, message: 'Si un compte existe pour cet email, un lien de réinitialisation vient d\'être envoyé.' };

      if (!isEmailValid(email)) return reply.send(generic);

      const user = await db.getUserByEmail(email);
      if (!user) return reply.send(generic);

      const token = generateToken(32);
      await db.createPasswordResetToken(user.id, sha256(token), 30);

      const base = process.env.BASE_URL || `${request.protocol}://${request.headers.host}`;
      const resetUrl = `${base}/_auth/login.html?reset=${encodeURIComponent(token)}`;

      const result = await mailer.sendPasswordResetEmail(user.email, resetUrl);
      await db.logActivity('password_reset_requested', {
        userId: user.id,
        email: user.email,
        ip: request.ip,
        details: result.sent ? 'Email envoyé' : `Email non envoyé (${result.reason})`
      });

      // Lien de reset en clair UNIQUEMENT en développement explicite.
      // Jamais en prod (Vercel) : sinon n'importe qui peut obtenir le lien
      // de reset d'un compte sans accéder à sa boîte mail.
      // Dev uniquement hors Vercel (VERCEL_ENV est posé par Vercel lui-même)
      const isDev = !process.env.VERCEL_ENV
        && (process.env.NODE_ENV === 'development' || process.env.SHOW_DEV_RESET_URL === '1');
      if (!result.sent && isDev) {
        return reply.send({ ...generic, devResetUrl: resetUrl });
      }
      return reply.send(generic);
    } catch (err) {
      fastify.log.error(err);
      return reply.code(500).send({ success: false, message: 'Erreur serveur.' });
    }
  });

  /**
   * POST /api/reset-password — consommation du token
   */
  fastify.post('/reset-password', {
    config: { rateLimit: { max: 5, timeWindow: '1 minute' } }
  }, async (request, reply) => {
    try {
      const { token, password } = request.body || {};
      if (!token) return reply.code(400).send({ success: false, message: 'Token manquant.' });
      if (!password || String(password).length < 8) {
        return reply.code(400).send({ success: false, message: 'Le mot de passe doit contenir au moins 8 caractères.' });
      }

      const record = await db.getValidPasswordResetToken(sha256(String(token)));
      if (!record) {
        return reply.code(400).send({ success: false, message: 'Lien invalide ou expiré. Refais une demande.' });
      }

      await db.updateUserPassword(record.user_id, hashPassword(String(password)));
      await db.consumePasswordResetToken(record.id);

      const user = await db.getUserById(record.user_id);
      await db.logActivity('password_reset_done', {
        userId: record.user_id,
        email: user ? user.email : null,
        ip: request.ip,
        details: 'Mot de passe réinitialisé (sessions révoquées)'
      });

      return reply.send({ success: true, message: 'Mot de passe mis à jour. Tu peux te connecter.' });
    } catch (err) {
      fastify.log.error(err);
      return reply.code(500).send({ success: false, message: 'Erreur serveur.' });
    }
  });

  // ==========================================================================
  // Compat clés (transition) — endpoints conservés mais désactivés
  // ==========================================================================

  fastify.post('/activate', async (request, reply) => {
    return reply.code(410).send({
      success: false,
      message: 'Les clés d\'activation ne sont plus utilisées. Crée un compte ou connecte-toi.'
    });
  });

  fastify.post('/verify-fingerprint', async (request, reply) => {
    return reply.send({ valid: true });
  });
};
