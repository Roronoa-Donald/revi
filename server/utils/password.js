const crypto = require('crypto');

/**
 * Hachage de mot de passe avec scrypt (node:crypto, aucune dépendance).
 * Format stocké : scrypt$<salt hex>$<hash hex>
 */
const KEYLEN = 64;

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(String(password), salt, KEYLEN).toString('hex');
  return `scrypt$${salt}$${hash}`;
}

function verifyPassword(password, stored) {
  try {
    const [scheme, salt, hash] = String(stored || '').split('$');
    if (scheme !== 'scrypt' || !salt || !hash) return false;
    const candidate = crypto.scryptSync(String(password), salt, KEYLEN);
    const expected = Buffer.from(hash, 'hex');
    if (candidate.length !== expected.length) return false;
    return crypto.timingSafeEqual(candidate, expected);
  } catch (e) {
    return false;
  }
}

/**
 * Token aléatoire URL-safe (pour reset password, jti, etc.)
 */
function generateToken(bytes = 32) {
  return crypto.randomBytes(bytes).toString('base64url');
}

/**
 * Hash sha256 hex d'un token (stockage DB)
 */
function sha256(value) {
  return crypto.createHash('sha256').update(String(value)).digest('hex');
}

module.exports = { hashPassword, verifyPassword, generateToken, sha256 };
