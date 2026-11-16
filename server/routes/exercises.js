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
const { COURSES } = require('../courses');
const gradingPolicy = require('../exercises/grading-policy');
const { runTests, MAX_TESTS } = require('../exercises/runner');
const { methodExercises, checkMethod } = require('../exercises/method-check');
const aiHelp = require('../services/ai-help');
const aiPool = require('../services/ai-pool');
const { getUser, requireUser, requireCourseAccess, quotaKey } = require('../utils/auth');
const db = require('../db');

const FEEDBACK_MAX_CHARS = 500;
const REVEAL_MIN_FAILURES = 3;
const PROVIDER_STOP_REASONS = new Set(['api_error', 'rate_limited', 'unknown_error', 'cancelled']);

// Cache en mémoire des tentatives par couple (utilisateur/session, exercice)
// doublé par la persistance BDD dans user_exercise_attempts (Lot 3A).
const attemptStore = new Map();

function attemptKey(key, exerciseId) {
  return `${key}::${exerciseId}`;
}

function resolveDbUserId(user) {
  const raw = user ? (user.userId != null ? user.userId : user.id) : null;
  if (raw == null) return null;
  const str = String(raw).trim();
  if (/^\d+$/.test(str) && Number(str) > 0) return Number(str);
  // Hors connexion PostgreSQL (tests unitaires à session JWT synthétique non numérique),
  // le suivi reste en mémoire dans attemptStore sans appeler db.toDbUserId.
  if (!db.isConnected()) return null;
  return raw;
}

async function getAttemptState(key, exerciseId, userId = null) {
  const k = attemptKey(key, exerciseId);
  const cached = attemptStore.get(k);
  if (cached) return cached;

  if (userId != null) {
    const dbRow = await db.getExerciseAttempt(userId, exerciseId);
    if (dbRow) {
      const hydrated = {
        solved: Boolean(dbRow.solved),
        failuresCount: Number(dbRow.attempts_count || 0),
        attemptsCount: Number(dbRow.attempts_count || 0),
        solutionRevealed: Boolean(dbRow.solution_revealed),
        updatedAt: dbRow.updated_at ? new Date(dbRow.updated_at).getTime() : Date.now()
      };
      attemptStore.set(k, hydrated);
      return hydrated;
    }
  }
  return { solved: false, failuresCount: 0 };
}

async function recordAttempt(key, exerciseId, solved, meta = {}) {
  const k = attemptKey(key, exerciseId);
  const current = attemptStore.get(k) || { solved: false, failuresCount: 0, attemptsCount: 0, solutionRevealed: false };
  current.attemptsCount = (current.attemptsCount || 0) + 1;
  if (solved) {
    current.solved = true;
  } else {
    current.failuresCount += 1;
  }
  current.updatedAt = Date.now();
  attemptStore.set(k, current);

  if (meta.userId != null) {
    await db.upsertExerciseAttempt(meta.userId, exerciseId, {
      solved,
      incrementAttempts: true,
      bestPassed: meta.bestPassed,
      totalTests: meta.totalTests,
      lastCode: meta.lastCode,
      solutionRevealed: Boolean(current.solutionRevealed)
    });
  }
  return current;
}

function resetAttempts() {
  attemptStore.clear();
}

function clipFeedback(value, max = FEEDBACK_MAX_CHARS) {
  if (value === undefined || value === null) return '';
  const str = String(value);
  if (str.length <= max) return str;
  return `${str.slice(0, max)}…`;
}

function containsHiddenSecret(text, test, checkExpected = false) {
  if (!text || !test) return false;
  const trimmedText = text.trim();
  const stdin = typeof test.stdin === 'string' ? test.stdin.trim() : '';
  if (stdin && (trimmedText === stdin || (stdin.length >= 3 && text.includes(stdin)))) {
    return true;
  }
  if (checkExpected) {
    const expected = typeof test.expected === 'string' ? test.expected.trim() : '';
    if (expected && (trimmedText === expected || (expected.length >= 2 && text.includes(expected)))) {
      return true;
    }
  }
  return false;
}

function redactHiddenSecrets(text, test) {
  let out = typeof text === 'string' ? text : '';
  if (!out || !test) return out;
  const secrets = [test.stdin, test.expected]
    .map(v => (typeof v === 'string' ? v.trim() : ''))
    .filter(v => v.length >= 3);
  for (const secret of secrets) {
    if (out.includes(secret)) {
      out = out.split(secret).join('[masqué]');
    }
  }
  return out;
}

function diagnoseMismatch(test, actual) {
  const expected = String(test && test.expected !== undefined ? test.expected : '');
  const actualStr = String(actual !== undefined && actual !== null ? actual : '');
  const expNorm = expected.replace(/\r\n/g, '\n').trim();
  const actNorm = actualStr.replace(/\r\n/g, '\n').trim();

  if (expNorm === actNorm || expected.replace(/\s+/g, '') === actualStr.replace(/\s+/g, '')) {
    return 'Différence de format / espaces / saut de ligne';
  }
  const expTokens = expNorm.split(/\s+/).filter(Boolean);
  const actTokens = actNorm.split(/\s+/).filter(Boolean);
  if (
    expNorm.toLowerCase() === actNorm.toLowerCase()
    || (expTokens.length >= 2 && expTokens.length === actTokens.length
      && expTokens.slice().sort().join('\n') === actTokens.slice().sort().join('\n'))
  ) {
    return 'Ordre des éléments ou casse';
  }
  const stdin = String(test && test.stdin !== undefined ? test.stdin : '');
  if (actNorm === '' || /(?:^|[\s\n])(?:-\d+|0)(?:$|[\s\n])/.test(stdin)) {
    return 'Cas limite négatif, nul ou vide';
  }
  const numRe = /^-?\d+(?:[.,]\d+)?(?:\s+-?\d+(?:[.,]\d+)?)*$/;
  if (numRe.test(expNorm) && numRe.test(actNorm)) {
    return 'Valeur numérique attendue différente';
  }
  if (expNorm.split('\n').length !== actNorm.split('\n').length) {
    return 'Nombre de lignes ou de valeurs différent';
  }
  return 'Sortie différente du résultat attendu';
}

function safeVisibleExpected(exercise, candidate) {
  const value = typeof candidate === 'string' ? candidate : '';
  if (!value || !exercise) return value;
  const hiddenSet = new Set(
    (exercise.tests || [])
      .map(t => (typeof t.expected === 'string' ? t.expected.trim() : ''))
      .filter(Boolean)
  );
  const visibleSet = new Set(
    (exercise.examples || [])
      .map(e => (typeof e.expected === 'string' ? e.expected.trim() : ''))
      .filter(Boolean)
  );
  if (hiddenSet.has(value.trim()) && !visibleSet.has(value.trim())) {
    return '';
  }
  return value;
}

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
  const reason = publicStopReasons.has(report.stop.reason) ? report.stop.reason : 'api_error';
  const failedTest = isExample
    ? (Array.isArray(exercise.examples) ? exercise.examples[0] : null)
    : (Array.isArray(exercise.tests) ? exercise.tests[testIndex] : null);

  const stop = {
    reason,
    testIndex,
    label: isExample ? 'Exemple affiché' : `Test caché ${testIndex + 1}`,
    ...(isExample ? { example: true } : { hidden: true })
  };

  if (reason === 'compile_error' || reason === 'runtime_error' || reason === 'timeout') {
    if (report.stop.compileError) {
      const safeCompile = isExample ? report.stop.compileError : redactHiddenSecrets(report.stop.compileError, failedTest);
      stop.compileError = clipFeedback(safeCompile);
    }
    if (report.stop.stderr) {
      const safeStderr = isExample ? report.stop.stderr : redactHiddenSecrets(report.stop.stderr, failedTest);
      stop.stderr = clipFeedback(safeStderr);
    }
    if (report.stop.exitCode !== undefined && report.stop.exitCode !== null) {
      stop.exitCode = report.stop.exitCode;
    }
    if (isExample && failedTest) {
      stop.input = clipFeedback(failedTest.stdin || '');
      if (typeof failedTest.expected === 'string') {
        stop.expected = clipFeedback(failedTest.expected);
      }
      if (typeof report.stop.actual === 'string') {
        stop.actual = clipFeedback(report.stop.actual);
      }
    }
    return { results, stop };
  }

  if (reason === 'wrong_output' && failedTest) {
    const actualStr = typeof report.stop.actual === 'string' ? report.stop.actual : '';
    const category = diagnoseMismatch(failedTest, actualStr);
    stop.category = category;

    if (isExample) {
      stop.input = clipFeedback(failedTest.stdin || '');
      stop.expected = clipFeedback(failedTest.expected || '');
      stop.actual = clipFeedback(actualStr);
      if (typeof failedTest.hint === 'string' && failedTest.hint.trim()) {
        stop.hint = clipFeedback(failedTest.hint.trim(), 300);
      }
    } else {
      if (typeof failedTest.hint === 'string' && failedTest.hint.trim() && !containsHiddenSecret(failedTest.hint, failedTest, true)) {
        stop.hint = clipFeedback(failedTest.hint.trim(), 300);
      }
      if (!containsHiddenSecret(actualStr, failedTest, false)) {
        stop.actual = clipFeedback(actualStr);
      } else {
        stop.actualRedacted = true;
      }
      stop.userMessage = stop.hint || category;
    }
  }

  return { results, stop };
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

    const access = await requireCourseAccess(request, reply, {
      courseId: exercise.course,
      chapter: exercise.chapter
    });
    if (!access) return;
    const user = access.free ? access.user : access;
    if (gradingPolicy.isGradingSuspended(exercise.course, exercise.id)) {
      return reply.code(503).send({ status: 'grading_suspended', error: gradingPolicy.gradingSuspensionMessage(exercise.course, exercise.id) });
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

    // Chaque test lancé vers le fournisseur externe (Piston/Oanor) consomme une exécution ;
    // les moteurs locaux (algo, sql, analyse) n'entament pas le quota externe.
    const trackedExecute = async payload => {
      const isLocal = localRunner.canHandle(payload && payload.language);
      if (!budget.canExecute(key).allowed) {
        const error = new execution.ExecutionError('quota_exhausted', 'Quota épuisé');
        error.userMessage = 'Quota d’exécutions épuisé pour aujourd’hui.';
        throw error;
      }
      if (!isLocal) {
        budget.consume(key, 1);
      }
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
    const providerStopped = feedback.stop && PROVIDER_STOP_REASONS.has(feedback.stop.reason);
    const resolvedUserId = resolveDbUserId(user);
    if (!providerStopped) {
      const solved = report.total > 0 && report.passed === report.total;
      await recordAttempt(key, exercise.id, solved, {
        userId: resolvedUserId,
        bestPassed: report.passed,
        totalTests: report.total,
        lastCode: code
      });
    }

    return reply.send({
      passed: report.passed,
      total: report.total,
      results: feedback.results,
      stop: feedback.stop,
      quota: publicQuota(key)
    });
  });

  // ========================
  // Déblocage du corrigé expliqué
  // ========================
  fastify.post('/exercise/reveal', {
    config: { rateLimit: { max: 20, timeWindow: '1 minute' } },
    errorHandler: publicRouteError
  }, async (request, reply) => {
    const body = request.body || {};
    const exercise = exercises.getExercise(body.exerciseId);
    if (!exercise) {
      return reply.code(400).send({ error: 'Exercice inconnu.' });
    }

    const access = await requireCourseAccess(request, reply, {
      courseId: exercise.course,
      chapter: exercise.chapter
    });
    if (!access) return;
    const user = access.free ? access.user : access;

    const resolvedUserId = resolveDbUserId(user);
    const key = quotaKey(user, request);
    const attempt = await getAttemptState(key, exercise.id, resolvedUserId);
    const unlocked = attempt.solved === true
      || attempt.failuresCount >= REVEAL_MIN_FAILURES
      || attempt.solutionRevealed === true;

    if (!unlocked) {
      return reply.code(403).send({
        error: "Termine d'abord l'exercice ou essaie au moins 3 fois avant de débloquer le corrigé.",
        attemptsRemaining: Math.max(0, REVEAL_MIN_FAILURES - attempt.failuresCount)
      });
    }

    attempt.solutionRevealed = true;
    attemptStore.set(attemptKey(key, exercise.id), attempt);
    if (resolvedUserId != null) {
      await db.upsertExerciseAttempt(resolvedUserId, exercise.id, {
        solved: Boolean(attempt.solved),
        incrementAttempts: false,
        attemptsCount: Number(attempt.attemptsCount || attempt.failuresCount || 0),
        solutionRevealed: true
      });
    }

    return reply.send({
      exerciseId: exercise.id,
      solution: typeof exercise.solution === 'string' ? exercise.solution : '',
      takeaway: exercises.buildTakeaway(exercise)
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
    const access = await requireCourseAccess(request, reply, {
      courseId: exercise ? exercise.course : (body.courseId || null),
      chapter: exercise ? exercise.chapter : (body.chapter != null ? body.chapter : null)
    });
    if (!access) return;
    const user = access.free ? access.user : access;

    const code = typeof body.code === 'string' ? body.code : '';
    const stdout = typeof body.stdout === 'string' ? body.stdout : '';
    const stderr = typeof body.stderr === 'string' ? body.stderr : '';
    const compileError = typeof body.compileError === 'string' ? body.compileError : '';
    const rawExpected = typeof body.expected === 'string' ? body.expected : '';
    const expected = exercise && exercise.language === 'analyse'
      ? ''
      : safeVisibleExpected(exercise, rawExpected);
    const actual = typeof body.actual === 'string' ? body.actual : '';
    const status = ['compile_error', 'runtime_error', 'timeout', 'wrong_output'].includes(body.status)
      ? body.status : '';
    const failingCaseLabel = typeof body.failingCaseLabel === 'string' ? body.failingCaseLabel : '';
    const question = typeof body.question === 'string' ? body.question : '';
    const courseMeta = exercise && exercise.course ? COURSES[exercise.course] : null;

    try {
      const messages = aiHelp.buildMessages({
        language: exercise ? exercise.language : '',
        level: exercise ? (exercise.level || (courseMeta && courseMeta.level) || 'B1') : '',
        course: exercise ? exercise.course : '',
        courseTitle: courseMeta ? courseMeta.name : '',
        chapter: exercise ? exercise.chapter : '',
        title: exercise ? exercise.title : '',
        goal: exercise ? exercise.goal : '',
        statement: exercise ? `${exercise.goal} ${plain(exercise.brief)}` : '',
        code,
        failingCaseLabel,
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

exerciseRoutes._resetAttempts = resetAttempts;
exerciseRoutes._getAttemptState = getAttemptState;
exerciseRoutes.REVEAL_MIN_FAILURES = REVEAL_MIN_FAILURES;

module.exports = exerciseRoutes;
