/**
 * Garde-fou de quota pour les appels d'exécution.
 *
 * Le plan gratuit du fournisseur est un plafond PARTAGÉ et ferme
 * (2 100 appels / mois, 2 requêtes / seconde). On ne construit donc rien comme
 * si c'était illimité : chaque exécution est comptée et refusée au-delà d'un
 * budget quotidien.
 *
 * LIMITE ASSUMÉE : le compteur vit en mémoire du processus. Sur un
 * déploiement serverless multi-instances il n'est pas global ; il protège
 * contre l'emballement d'un élève, pas contre un usage coordonné. Le vrai
 * filet reste le HTTP 429 du fournisseur, correctement relayé à l'élève.
 */

const STATE = new Map(); // clé de quota → { day, count }
let globalState = { day: '', count: 0 };

function today() {
  return new Date().toISOString().slice(0, 10);
}

function envLimit(name, fallback) {
  const value = Number(process.env[name]);
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

const LIMITS = {
  perUser: () => envLimit('EXEC_DAILY_LIMIT_PER_USER', 40),
  global: () => envLimit('EXEC_DAILY_LIMIT_GLOBAL', 900)
};

function rollover() {
  const day = today();
  if (globalState.day !== day) globalState = { day, count: 0 };
  for (const [key, entry] of STATE) {
    if (entry.day !== day) STATE.delete(key);
  }
  return day;
}

/**
 * @param {string} key clé de quota (compte ou IP)
 * @param {number} n nombre d'exécutions consommées
 */
function consume(key, n = 1) {
  rollover();
  const entry = STATE.get(key) || { day: today(), count: 0 };
  entry.count += n;
  STATE.set(key, entry);
  globalState.count += n;
  return entry.count;
}

/** Peut-on encore lancer au moins une exécution ? */
function canExecute(key) {
  rollover();
  if (globalState.count >= LIMITS.global()) {
    return { allowed: false, reason: 'global' };
  }
  const entry = STATE.get(key);
  if (entry && entry.count >= LIMITS.perUser()) {
    return { allowed: false, reason: 'user' };
  }
  return { allowed: true, reason: null };
}

function snapshot(key) {
  rollover();
  const entry = STATE.get(key);
  return {
    used: entry ? entry.count : 0,
    limit: LIMITS.perUser(),
    remaining: Math.max(0, LIMITS.perUser() - (entry ? entry.count : 0)),
    globalUsed: globalState.count,
    globalLimit: LIMITS.global()
  };
}

/** Réservé aux tests. */
function reset() {
  STATE.clear();
  globalState = { day: '', count: 0 };
}

module.exports = { consume, canExecute, snapshot, limits: LIMITS, reset };
