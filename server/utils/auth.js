/**
 * Vérification d'identité pour les routes API.
 * Reprend exactement le contrôle des routes existantes : cookie `auth_token`
 * signé (JWT), HttpOnly, posé par /api/login. Aucun état serveur.
 */
const jwt = require('jsonwebtoken');

/**
 * @param {import('fastify').FastifyRequest} request
 * @returns {{userId: string, email?: string, level?: string}|null}
 */
function getUser(request) {
  const token = request.cookies && request.cookies.auth_token;
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.userId) return null;
    return decoded;
  } catch {
    return null;
  }
}

/**
 * Renvoie l'utilisateur ou envoie une 401 et retourne null.
 * @returns {{userId: string}|null}
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
  if (user && user.userId) return `u:${user.userId}`;
  return `ip:${request.ip || 'unknown'}`;
}

module.exports = { getUser, requireUser, quotaKey };
