/**
 * Exercices de code — /api/exercise/submit et /api/code-help
 *
 * Les tests de correction ne quittent jamais le serveur : le navigateur envoie
 * le code, il reçoit un verdict (spec §20 et §21).
 */

const execution = require('../services/execution');
const localRunner = require('../services/execution/local-runner');
const budget = require('../services/execution/budget');
const exercises = require('../exercises');
const { isGradingSuspended, gradingSuspensionMessage } = require('../exercises/grading-policy');
const { runTests, MAX_TESTS } = require('../exercises/runner');
const { methodExercises, checkMethod } = require('../exercises/method-check');
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

function publicRouteError(error, request, reply) {
  const statusCode = error && Number.isInteger(error.statusCode) && error.statusCode >= 400 && error.statusCode <= 599
    ? error.statusCode : 500;
  request.log.error({ statusCode }, 'Erreur API exercice');
  return reply.code(statusCode).send({
    status: statusCode === 429 ? 'rate_limited' : 'api_error',
    error: statusCode === 429 ? 'Trop de demandes. Réessayez dans quelques instants.'
      : 'La demande n’a pas pu être traitée. Réessayez.'
  });
}

function publicQuota(key) {
  const snapshot = budget.snapshot(key);
  const number = value => Number.isFinite(value) && value >= 0 ? value : 0;
  return {
    used: number(snapshot.used),
    limit: number(snapshot.limit),
    remaining: number(snapshot.remaining),
    globalUsed: number(snapshot.globalUsed),
    globalLimit: number(snapshot.globalLimit)
  };
}

const publicStopReasons = new Set([
  'wrong_output', 'compile_error', 'runtime_error', 'timeout',
  'rate_limited', 'api_error', 'unknown_error', 'cancelled'
]);

async function publicFeedback(exercise, report, submittedCode) {
  const isAnalyse = exercise.language === 'analyse';
  const invalidShebang = !isAnalyse && report.stop && report.stop.reason === 'invalid_source' && exercise.requiredShebang;
  const exampleIndex = !isAnalyse && exercise.verifyFirstExample === true
    ? Math.min(exercise.tests.length, MAX_TESTS) : -1;
  const results = report.results.map((result, index) => ({
    label: invalidShebang ? 'Shebang' : (isAnalyse ? `Cas ${index + 1}` :
      (index === exampleIndex ? 'Exemple affiché' : `Test caché ${index + 1}`)),
    ok: Boolean(result.ok)
  }));
  if (!report.stop) return { results, stop: null };
  if (invalidShebang) {
    return {
      results,
      stop: {
        reason: 'invalid_source',
        testIndex: 0,
        label: 'Shebang',
        userMessage: `La première ligne doit être exactement ${exercise.requiredShebang}, sans caractère avant ni après.`
      }
    };
  }
  const testIndex = Number.isInteger(report.stop.testIndex) && report.stop.testIndex >= 0
    ? report.stop.testIndex : 0;
  if (isAnalyse) {
    const reason = publicStopReasons.has(report.stop.reason) ? report.stop.reason : 'api_error';
    let actual = '';
    if (reason === 'wrong_output') {
      const output = typeof report.stop.actual === 'string' ? report.stop.actual : '';
      if (output && submittedCode.includes(output)) {
        actual = output;
      } else if (exercise.tests[testIndex]) {
        const selected = await localRunner.runAnalyse(submittedCode, exercise.tests[testIndex].stdin);
        actual = selected.data.stdout;
      }
    }
    return {
      results,
      stop: {
        reason,
        testIndex,
        label: `Cas ${testIndex + 1}`,
        actual,
        userMessage: reason === 'wrong_output'
          ? 'Réponse incorrecte. Vérifiez vos calculs ou votre raisonnement.'
          : 'La vérification n’a pas pu être effectuée. Réessayez.'
      }
    };
  }
  const isExample = testIndex === exampleIndex;
  return {
    results,
    stop: {
      reason: publicStopReasons.has(report.stop.reason) ? report.stop.reason : 'api_error',
      testIndex,
      label: isExample ? 'Exemple affiché' : `Test caché ${testIndex + 1}`,
      ...(isExample ? { example: true } : { hidden: true })
    }
  };
}

async function exerciseRoutes(fastify) {
  // ========================
  // Soumission corrigée
  // ========================
  fastify.post('/exercise/submit', {
    config: { rateLimit: { max: 8, timeWindow: '1 minute' } },
    errorHandler: publicRouteError
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
    if (isGradingSuspended(exercise.course, exercise.id)) {
      return reply.code(503).send({ status: 'grading_suspended', error: gradingSuspensionMessage(exercise.course, exercise.id) });
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
        quota: publicQuota(key)
      });
    }

    // Chaque test lancé consomme une exécution : on la compte au moment de
    // l'appel, pour rester exact même si la correction s'arrête en route.
    const trackedExecute = async payload => {
      if (!budget.canExecute(key).allowed) {
        const error = new execution.ExecutionError('quota_exhausted', 'Quota épuisé');
        error.userMessage = 'Quota d’exécutions épuisé pour aujourd’hui.';
        throw error;
      }
      budget.consume(key, 1);
      return execution.execute(payload);
    };

    const checkedExecute = methodExercises.includes(exercise.id) ? async payload => {
      const checked = await checkMethod(exercise.id, payload.code, trackedExecute, payload.stdin);
      if (checked.status !== 'verified') {
        const error = new Error('Contrôle de méthode indisponible ou non concluant.');
        error.code = checked.status === 'not_evaluable' ? 'method_not_evaluable' : 'method_unavailable';
        throw error;
      }
      return { ok: true, status: 'success', stdout: checked.output, stderr: '', compileError: '', exitCode: 0 };
    } : trackedExecute;

    const report = await runTests(exercise, code, {
      execute: checkedExecute,
      maxTests: MAX_TESTS
    });

    if (!report.ok && report.error) {
      if (report.error.code === 'method_not_evaluable') {
        return reply.code(422).send({
          status: 'method_not_evaluable',
          error: 'La méthode ne peut pas être vérifiée automatiquement dans ce cadre. Aucune note n’est attribuée ; demandez une relecture.',
          quota: publicQuota(key)
        });
      }
      if (report.error.code === 'method_unavailable') {
        return reply.code(503).send({
          status: 'api_error',
          error: 'Le contrôle de méthode est temporairement indisponible. Aucune note n’est attribuée.',
          quota: publicQuota(key)
        });
      }
      if (report.error.code === 'quota_exhausted') {
        return reply.code(429).send({
          status: 'rate_limited',
          error: 'Vous avez atteint votre nombre d’exécutions pour aujourd’hui. Réessayez demain.',
          quota: publicQuota(key)
        });
      }
      const code = ['not_configured', 'timeout', 'upstream_unreachable', 'invalid_request'].includes(report.error.code)
        ? report.error.code : 'api_error';
      fastify.log.error({ code }, 'Échec de correction');
      return reply.code(code === 'not_configured' ? 503 : 502).send({
        error: code === 'timeout'
          ? 'Le service d’exécution a mis trop de temps à répondre. Réessayez.'
          : 'Le moteur d’exécution est temporairement indisponible.',
        status: 'api_error'
      });
    }

    const feedback = await publicFeedback(exercise, report, code);
    return reply.send({
      passed: report.passed,
      total: report.total,
      results: feedback.results,
      stop: feedback.stop,
      quota: publicQuota(key)
    });
  });

  // ========================
  // Explication par l'IA
  // ========================
  fastify.post('/code-help', {
    config: { rateLimit: { max: 12, timeWindow: '1 minute' } },
    errorHandler: publicRouteError
  }, async (request, reply) => {
    const body = request.body || {};
    const exercise = body.exerciseId ? exercises.getExercise(body.exerciseId) : null;
    const user = getUser(request);

    // Le chapitre 1 de chaque cours est 100% libre et gratuit (tuteur IA inclus).
    if ((!exercise || exercise.chapter > 1) && !user) {
      return reply.code(401).send({ error: 'Authentification requise pour cette explication.' });
    }

    if (exercise && exercise.language === 'analyse') {
      return reply.send({
        explanation: 'Relisez l’énoncé et les données du cas. Vérifiez les unités, les contraintes et chaque étape de votre raisonnement avant de réessayer.',
        notice: '',
        stripped: 0
      });
    }

    const code = typeof body.code === 'string' ? body.code : '';
    const stdout = typeof body.stdout === 'string' ? body.stdout : '';
    const stderr = typeof body.stderr === 'string' ? body.stderr : '';
    const compileError = typeof body.compileError === 'string' ? body.compileError : '';
    const expected = typeof body.expected === 'string' ? body.expected : '';
    const actual = typeof body.actual === 'string' ? body.actual : '';
    const status = ['compile_error', 'runtime_error', 'timeout', 'wrong_output'].includes(body.status)
      ? body.status : '';
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
        status,
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
      const status = err && Number.isInteger(err.status) && err.status >= 400 && err.status <= 599
        ? err.status : 502;
      fastify.log.error({ status }, 'Échec du tuteur IA');
      return reply.code(status).send({
        error: status === 429
          ? 'Le tuteur IA est sollicité par trop d’élèves. Réessayez dans quelques instants.'
          : ((err && err.message) || 'Le tuteur IA est momentanément indisponible.')
      });
    }
  });
}

module.exports = exerciseRoutes;
