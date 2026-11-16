/**
 * Garde-fou de quota pour les appels d'exécution.
 *
 * Le plan gratuit du fournisseur est un plafond PARTAGÉ et ferme
 * (2 100 appels / mois, 2 requêtes / seconde). On ne construit donc rien comme
 * si c'était illimité : chaque exécution est comptée et refusée au-delà d'un
 * budget quotidien.
 *
 * Lot 3A : le compteur en mémoire reste synchrone pour le chemin critique, et
 * se synchronise de manière asynchrone avec la table `execution_quota_daily`
 * via `server/db.js` afin de consolider les quotas entre instances serverless
 * lorsque PostgreSQL est disponible.
 */

const db = require('../../db');

const STATE = new Map(); // clé de quota → { day, count }
let globalState = { day: '', count: 0 };
const GLOBAL_QUOTA_KEY = '__global__';

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
 * Synchronise en tâche de fond ou à la demande la consommation vers `execution_quota_daily`.
 */
async function persistQuotaIncrement(key, day, n) {
  if (!db || typeof db.incrementExecutionQuota !== 'function') return;
  try {
    const [userDbCount, globalDbCount] = await Promise.all([
      db.incrementExecutionQuota(key, day, n),
      db.incrementExecutionQuota(GLOBAL_QUOTA_KEY, day, n)
    ]);
    const currentEntry = STATE.get(key);
    if (currentEntry && currentEntry.day === day && Number.isFinite(userDbCount)) {
      currentEntry.count = Math.max(currentEntry.count, userDbCount);
    }
    if (globalState.day === day && Number.isFinite(globalDbCount)) {
      globalState.count = Math.max(globalState.count, globalDbCount);
    }
  } catch {
    // Repli silencieux sur le compteur mémoire si la base est indisponible
  }
}

/**
 * Recharge l'état d'une clé et du compteur global depuis `execution_quota_daily`.
 * @param {string} key clé de quota
 */
async function syncFromDb(key) {
  const day = rollover();
  if (!db || typeof db.getExecutionQuota !== 'function') {
    return snapshot(key);
  }
  try {
    const [userDbCount, globalDbCount] = await Promise.all([
      key ? db.getExecutionQuota(key, day) : Promise.resolve(0),
      db.getExecutionQuota(GLOBAL_QUOTA_KEY, day)
    ]);
    if (key && Number.isFinite(userDbCount) && userDbCount > 0) {
      const entry = STATE.get(key) || { day, count: 0 };
      entry.count = Math.max(entry.count, userDbCount);
      STATE.set(key, entry);
    }
    if (Number.isFinite(globalDbCount) && globalDbCount > 0) {
      globalState.count = Math.max(globalState.count, globalDbCount);
    }
  } catch {
    // Repli silencieux en mémoire
  }
  return snapshot(key);
}

/**
 * @param {string} key clé de quota (compte ou IP)
 * @param {number} n nombre d'exécutions consommées
 */
function consume(key, n = 1) {
  const day = rollover();
  const entry = STATE.get(key) || { day, count: 0 };
  entry.count += n;
  STATE.set(key, entry);
  globalState.count += n;

  // Synchronisation asynchrone non bloquante vers execution_quota_daily
  persistQuotaIncrement(key, day, n);

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
  if (db && typeof db.clearMemoryStoresForTest === 'function') {
    db.clearMemoryStoresForTest();
  }
}

module.exports = { consume, canExecute, snapshot, syncFromDb, limits: LIMITS, reset };
