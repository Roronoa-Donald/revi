const crypto = require('crypto');

/**
 * Génère une clé d'activation au format XXXX-XXXX
 * 8 positions entièrement aléatoires (crypto.randomInt, sans biais modulo)
 * ~40 bits d'entropie sur 32 caractères non ambigus.
 */
function generateActivationKey() {
  // Caractères non ambigus (exclusion de 0/O, 1/I/l)
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

  let key = '';
  for (let i = 0; i < 8; i++) {
    key += chars[crypto.randomInt(chars.length)];
  }

  return key.substring(0, 4) + '-' + key.substring(4, 8);
}

/**
 * Génère un identifiant unique pour les sessions JWT (jti)
 */
function generateJti() {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Hash un fingerprint pour stockage sécurisé
 */
function hashFingerprint(fingerprint) {
  return crypto.createHash('sha256').update(fingerprint).digest('hex');
}

module.exports = { generateActivationKey, generateJti, hashFingerprint };
