/**
 * Exercices de code — /api/exercise/submit et /api/code-help
 *
 * Les tests de correction ne quittent jamais le serveur : le navigateur envoie
 * le code, il reçoit un verdict (spec §20 et §21).
 */

const execution = require('../services/execution');
const budget = require('../services/execution/budget');
const exercises = require('../exercises');
const { runTests, MAX_TESTS } = require('../exercises/runner');
const aiHelp = require('../services/ai-help');
const aiPool = require('../services/ai-pool');
const { getUser, requireUser, quotaKey } = require('../utils/auth');

/** Retire le balisage d'un énoncé avant de le donner au modèle. */
function plain(html) {
  return String(html || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tooLong(value) {
  return Buffer.byteLength(String(value || ''), 'utf8') > execution.LIMITS.code;
}

async function exerciseRoutes(fastify) {
  // ========================
  // Soumission corrigée
  // ========================
  fastify.post('/exercise/submit', {
    config: { rateLimit: { max: 8, timeWindow: '1 minute' } }
  }, async (request, reply) => {
    const body = request.body || {};
    const exercise = exercises.getExercise(body.exerciseId);
    if (!exercise) {
      return reply.code(400).send({ error: 'Exercice inconnu.' });
    }

    const user = getUser(request);
    // Le chapitre 1 de chaque cours est 100% libre et gratuit (code lab inclus).
    // Les chapitres 2+ nécessitent un compte utilisateur connecté.
    if (exercise.chapter > 1 && !user) {
      return reply.code(401).send({ error: 'Authentification requise pour les chapitres 2 et suivants.' });
    }
    const code = typeof body.code === 'string' ? body.code : '';
    if (!code.trim()) {
      return reply.code(400).send({ error: 'Écrivez du code avant de soumettre.' });
    }
    if (tooLong(code)) {
      return reply.code(400).send({ error: 'Le code est trop long.' });
    }

    const key = quotaKey(user, request);
    const guard = budget.canExecute(key);
    if (!guard.allowed) {
      return reply.code(429).send({
        status: 'rate_limited',
        error: 'Vous avez atteint votre nombre d’exécutions pour aujourd’hui. Réessayez demain.',
        quota: budget.snapshot(key)
      });
    }

    // Chaque test lancé consomme une exécution : on la compte au moment de
    // l'appel, pour rester exact même si la correction s'arrête en route.
    const trackedExecute = async payload => {
      if (!budget.canExecute(key).allowed) {
        const error = new execution.ExecutionError('api_error', 'Quota épuisé');
        error.userMessage = 'Quota d’exécutions épuisé pour aujourd’hui.';
        throw error;
      }
      budget.consume(key, 1);
      return execution.execute(payload, { allowLocal: true });
    };

    const report = await runTests(exercise, code, {
      execute: trackedExecute,
      maxTests: MAX_TESTS
    });

    if (!report.ok && report.error) {
      fastify.log.error({ code: report.error.code }, 'Échec de correction');
      return reply.code(report.error.code === 'not_configured' ? 503 : 502).send({
        error: report.error.message,
        status: 'api_error'
      });
    }

    return reply.send({
      passed: report.passed,
      total: report.total,
      results: report.results,
      stop: report.stop,
      quota: budget.snapshot(key)
    });
  });

  // ========================
  // Explication par l'IA
  // ========================
  fastify.post('/code-help', {
    config: { rateLimit: { max: 12, timeWindow: '1 minute' } }
  }, async (request, reply) => {
    const body = request.body || {};
    const exercise = body.exerciseId ? exercises.getExercise(body.exerciseId) : null;
    const user = getUser(request);

    // Le chapitre 1 de chaque cours est 100% libre et gratuit (tuteur IA inclus).
    if ((!exercise || exercise.chapter > 1) && !user) {
      return reply.code(401).send({ error: 'Authentification requise pour cette explication.' });
    }

    const code = typeof body.code === 'string' ? body.code : '';
    const stdout = typeof body.stdout === 'string' ? body.stdout : '';
    const stderr = typeof body.stderr === 'string' ? body.stderr : '';
    const compileError = typeof body.compileError === 'string' ? body.compileError : '';
    const expected = typeof body.expected === 'string' ? body.expected : '';
    const actual = typeof body.actual === 'string' ? body.actual : '';
    const question = typeof body.question === 'string' ? body.question : '';

    try {
      const messages = aiHelp.buildMessages({
        statement: exercise ? `${exercise.goal} ${plain(exercise.brief)}` : '',
        code,
        stdout,
        stderr,
        compileError,
        expected,
        actual,
        question
      });

      const completion = await aiPool.chatCompletion({
        messages,
        max_tokens: 350,
        temperature: 0.3,
        task: 'code-help'
      });

      const data = completion.data;
      const raw = data && data.choices && data.choices[0] && data.choices[0].message
        ? data.choices[0].message.content
        : '';

      const clean = aiHelp.sanitizeExplanation(raw);
      if (!clean.text) {
        return reply.code(502).send({ error: 'Le tuteur IA n’a pas pu formuler d’explication.' });
      }

      return reply.send({
        explanation: clean.text,
        notice: clean.notice,
        stripped: clean.stripped
      });
    } catch (err) {
      fastify.log.error('Tuteur IA error:', err);
      const status = err.status === 429 ? 429 : (err.status && Number.isInteger(err.status) ? err.status : 502);
      return reply.code(status).send({
        error: status === 429
          ? 'Le tuteur IA est sollicité par trop d’élèves. Réessayez dans quelques instants.'
          : (err.message || 'Le tuteur IA est momentanément indisponible.')
      });
    }
  });
}

module.exports = exerciseRoutes;
