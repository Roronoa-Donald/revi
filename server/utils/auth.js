/**
 * Vérification d'identité et d'autorisation pour les routes API.
 * Vérifie : signature JWT, validité de session DB (jti / is_valid), statut actif,
 * abonnement actif et niveau d'accès hiérarchique B1 ⊂ B2 ⊂ B3.
 */
const jwt = require('jsonwebtoken');
const db = require('../db');
const accessControl = require('../middleware/access-control');

function isDbEnforced() {
  return Boolean(
    process.env.NODE_ENV === 'production'
    || db.isConnected()
  );
}

/**
 * Décodage JWT brut uniquement (ne garantit ni révocation ni abonnement).
 * @param {import('fastify').FastifyRequest} request
 * @returns {{userId: string|number, jti?: string, email?: string, level?: string}|null}
 */
function getUser(request) {
  const token = request && request.cookies && request.cookies.auth_token;
  if (!token || !process.env.JWT_SECRET) return null;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || decoded.userId == null) return null;
    return decoded;
  } catch {
    return null;
  }
}

/**
 * Résout la session active complète depuis JWT + PostgreSQL (ou mocks DB en test).
 * Fail-closed si la base est configurée ou si les accesseurs DB renvoient une session
 * révoquée / un compte désactivé.
 */
async function resolveActiveUser(request) {
  const decoded = getUser(request);
  if (!decoded) return null;

  const dbRequired = isDbEnforced();

  if (dbRequired && !decoded.jti) {
    return null;
  }

  let session = null;
  if (decoded.jti) {
    let sessionQueried = false;
    try {
      session = await db.getSessionByJti(decoded.jti);
      sessionQueried = true;
    } catch {
      if (dbRequired) return null;
    }
    if (sessionQueried) {
      if (!session || !session.is_valid) return null;
      if (session.expires_at && new Date(session.expires_at) <= new Date()) return null;
      if (session.user_id != null && String(session.user_id) !== String(decoded.userId)) return null;
    }
  }

  let dbUser = null;
  let userQueried = false;
  try {
    dbUser = await db.getUserById(decoded.userId);
    userQueried = true;
  } catch {
    if (dbRequired) return null;
  }

  if (userQueried) {
    if (!dbUser || !dbUser.is_active) return null;
    return {
      ...decoded,
      ...dbUser,
      userId: dbUser.id != null ? dbUser.id : decoded.userId,
      level: accessControl.normalizeLevel(dbUser.level || decoded.level || 'b2') || 'b2',
      subscribed: db.hasActiveSubscription(dbUser),
      _session: session
    };
  }

  if (dbRequired) return null;

  return {
    ...decoded,
    userId: decoded.userId,
    level: accessControl.normalizeLevel(decoded.level || 'b2') || 'b2',
    subscribed: decoded.subscribed !== undefined ? Boolean(decoded.subscribed) : true
  };
}

/**
 * Exige une session utilisateur valide et un compte actif (401 sinon).
 */
async function requireActiveUser(request, reply) {
  const user = await resolveActiveUser(request);
  if (!user) {
    reply.code(401).send({ error: 'Authentification requise ou session expirée.' });
    return null;
  }
  return user;
}

/**
 * Indique si une ressource (cours + chapitre) est librement accessible au titre du chapitre 1 gratuit.
 */
function isFreeChapterOne(courseId, chapter) {
  if (!courseId || courseId === 'epreuves' || courseId === 'preparation-web') return false;
  return Number(chapter) === 1 || String(chapter) === '1';
}

/**
 * Contrôle complet d'accès à un cours/chapitre :
 * - Chapitre 1 hors épreuves/preparation-web → libre (résout quand même l'utilisateur si cookie valide)
 * - Tout autre contenu (chapitres >= 2, examens, sans chapitre, epreuves, preparation-web) →
 *   exige utilisateur actif + niveau suffisant + abonnement actif.
 */
async function requireCourseAccess(request, reply, { courseId = null, chapter = null } = {}) {
  if (isFreeChapterOne(courseId, chapter)) {
    const user = await resolveActiveUser(request);
    return { free: true, user };
  }

  const user = await requireActiveUser(request, reply);
  if (!user) return null;

  if (courseId && accessControl.COURSES[courseId]) {
    if (!accessControl.canAccessCourse(user.level, courseId)) {
      reply.code(403).send({
        error: 'Votre niveau de compte ne permet pas d’accéder à ce cours.',
        code: 'level_denied'
      });
      return null;
    }
  }

  const requiresSub = chapter != null || (courseId && (courseId === 'epreuves' || courseId === 'preparation-web'));
  if (requiresSub && !user.subscribed) {
    reply.code(403).send({
      error: 'Un abonnement actif est requis pour accéder à ce contenu.',
      code: 'subscription_required'
    });
    return null;
  }

  return user;
}

/**
 * Compatibilité synchrone : renvoie le payload JWT décodé ou envoie 401.
 */
function requireUser(request, reply) {
  const user = getUser(request);
  if (!user) {
    reply.code(401).send({ error: 'Authentification requise.' });
    return null;
  }
  return user;
}

/** Identifiant de quota : le compte si présent, sinon l'IP réelle. */
function quotaKey(user, request) {
  const uid = user && (user.userId != null ? user.userId : user.id);
  if (uid != null) return `u:${uid}`;
  return `ip:${(request && request.ip) || 'unknown'}`;
}

module.exports = {
  getUser,
  resolveActiveUser,
  requireActiveUser,
  requireCourseAccess,
  requireUser,
  isFreeChapterOne,
  quotaKey
};
