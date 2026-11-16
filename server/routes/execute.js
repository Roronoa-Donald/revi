/**
 * Exécution de code — /api/execute
 *
 * L'élève n'a jamais la clé du fournisseur : le navigateur appelle ce serveur,
 * le serveur appelle le fournisseur (spec §7 et §29).
 */

const execution = require('../services/execution');
const budget = require('../services/execution/budget');
const exercises = require('../exercises');
const { requireActiveUser, requireCourseAccess, quotaKey } = require('../utils/auth');

// Quota IP strict pour les exécutions anonymes (15 exécutions / heure / IP)
const ANON_EXEC_LIMIT_PER_IP = 15;
const ANON_EXEC_WINDOW_MS = 60 * 60 * 1000; // 1 heure

const anonIpState = new Map(); // ip -> { count: number, resetAt: number }

function checkAnonIpQuota(ip) {
  const now = Date.now();
  const entry = anonIpState.get(ip);
  if (!entry || now >= entry.resetAt) {
    return { allowed: true, remaining: ANON_EXEC_LIMIT_PER_IP };
  }
  if (entry.count >= ANON_EXEC_LIMIT_PER_IP) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }
  return { allowed: true, remaining: ANON_EXEC_LIMIT_PER_IP - entry.count };
}

function consumeAnonIpQuota(ip) {
  const now = Date.now();
  let entry = anonIpState.get(ip);
  if (!entry || now >= entry.resetAt) {
    entry = { count: 0, resetAt: now + ANON_EXEC_WINDOW_MS };
  }
  entry.count += 1;
  anonIpState.set(ip, entry);
  return entry.count;
}

async function executeRoutes(fastify) {
  // Catalogue affiché dans le sélecteur de langage. Recoupé avec ce que le
  // fournisseur annonce réellement, ou le catalogue statique s'il est injoignable.
  fastify.get('/execute/languages', {
    config: { rateLimit: { max: 30, timeWindow: '1 minute' } }
  }, async (request, reply) => {
    const exerciseId = (request.query && request.query.exerciseId) ||
      (request.headers && request.headers['x-exercise-id']);
    const exercise = exerciseId ? exercises.getExercise(exerciseId) : null;

    if (!exercise || exercise.chapter !== 1) {
      const user = await requireActiveUser(request, reply);
      if (!user) return;
    }

    const catalogue = await execution.getLanguages();
    return reply.send({
      source: catalogue.source,
      matched: catalogue.matched,
      languages: catalogue.languages
    });
  });

  // Une seule action d'exécution par clic : pas d'auto-run à la frappe,
  // pas de rafale (spec §22, §23, §38).
  fastify.post('/execute', {
    config: { rateLimit: { max: 60, timeWindow: '1 minute' } }
  }, async (request, reply) => {
    const body = request.body || {};
    const exerciseId = body.exerciseId ||
      (request.query && request.query.exerciseId) ||
      (request.headers && request.headers['x-exercise-id']);
    const exercise = exerciseId ? exercises.getExercise(exerciseId) : null;

    let user = null;
    if (exercise && exercise.chapter === 1) {
      const access = await requireCourseAccess(request, reply, {
        courseId: exercise.course,
        chapter: exercise.chapter
      });
      if (!access) return;
      user = access.user || null;
      if (!user) {
        const ip = request.ip || 'unknown';
        const anonGuard = checkAnonIpQuota(ip);
        if (!anonGuard.allowed) {
          return reply.code(429).send({
            status: 'rate_limited',
            error: 'Limite d’exécutions anonymes atteinte pour cette heure (15 max). Connectez-vous ou réessayez plus tard.'
          });
        }
      }
    } else if (exercise) {
      user = await requireCourseAccess(request, reply, {
        courseId: exercise.course,
        chapter: exercise.chapter
      });
      if (!user) return;
    } else {
      user = await requireCourseAccess(request, reply, {
        courseId: body.courseId || null,
        chapter: body.chapter != null ? body.chapter : null
      });
      if (!user) return;
    }

    const key = quotaKey(user, request);
    const guard = budget.canExecute(key);
    if (!guard.allowed) {
      return reply.code(429).send({
        status: 'rate_limited',
        error: guard.reason === 'global'
          ? 'Le service d’exécution est saturé pour aujourd’hui. Réessayez demain.'
          : 'Vous avez atteint votre nombre d’exécutions pour aujourd’hui. Réessayez demain.',
        quota: budget.snapshot(key)
      });
    }

    try {
      if (!user) {
        consumeAnonIpQuota(request.ip || 'unknown');
      }
      budget.consume(key, 1);
      const result = await execution.execute({
        language: body.language,
        code: body.code,
        stdin: body.stdin,
        args: body.args,
        options: body.options,
        compiler: body.compiler
      });
      return reply.send({ ...result, quota: budget.snapshot(key) });
    } catch (error) {
      fastify.log.error({ code: error && error.code }, 'Échec d’exécution');
      const { statusCode, message, code } = execution.errorToHttp(error);
      return reply.code(statusCode).send({ error: message, status: 'api_error', code });
    }
  });
}

// Helpers de test
executeRoutes._resetAnonIpQuota = () => anonIpState.clear();
executeRoutes._getAnonIpState = () => anonIpState;

module.exports = executeRoutes;
