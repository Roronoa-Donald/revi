'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fastify = require('fastify');
const jwt = require('jsonwebtoken');
const exercises = require('../server/exercises');
const gradingPolicy = require('../server/exercises/grading-policy');
const execution = require('../server/services/execution');
const budget = require('../server/services/execution/budget');
const aiHelp = require('../server/services/ai-help');
const aiPool = require('../server/services/ai-pool');
const syntheticExercises = new Map();
const originalGradingSuspended = gradingPolicy.isGradingSuspended;
gradingPolicy.isGradingSuspended = (course, exerciseId) => {
  const fixture = syntheticExercises.get(exerciseId);
  return fixture && fixture.course === course && exercises.getExercise(exerciseId) === fixture
    ? false : originalGradingSuspended(course, exerciseId);
};
const exerciseRoutes = require('../server/routes/exercises');
gradingPolicy.isGradingSuspended = originalGradingSuspended;

const privateValues = [
  'ENTREE_PRIVEE_UNIQUE_1', 'ENTREE_PRIVEE_UNIQUE_2',
  'ATTENDU_PRIVE_UNIQUE_1', 'ATTENDU_PRIVE_UNIQUE_2',
  'LIBELLE_PRIVE_UNIQUE_1', 'LIBELLE_PRIVE_UNIQUE_2',
  'INDICE_PRIVE_UNIQUE_2', 'SORTIE_PRIVEE_UNIQUE',
  'ERREUR_PRIVEE_UNIQUE', 'MESSAGE_PRIVE_UNIQUE'
];

function exerciseFixture(overrides = {}) {
  return {
    id: 'privacy-c1-e1',
    course: 'b1-python',
    chapter: 1,
    language: 'python',
    tests: [
      { label: 'LIBELLE_PRIVE_UNIQUE_1', stdin: 'ENTREE_PRIVEE_UNIQUE_1', expected: 'ATTENDU_PRIVE_UNIQUE_1' },
      { label: 'LIBELLE_PRIVE_UNIQUE_2', stdin: 'ENTREE_PRIVEE_UNIQUE_2', expected: 'ATTENDU_PRIVE_UNIQUE_2', hint: 'INDICE_PRIVE_UNIQUE_2' }
    ],
    ...overrides
  };
}

function assertNoPrivateValues(value) {
  const serialized = JSON.stringify(value);
  for (const privateValue of privateValues) {
    assert.equal(serialized.includes(privateValue), false, `${privateValue} ne doit pas figurer dans la réponse`);
  }
}

async function setup(testContext, exercise, execute) {
  const originalGetExercise = exercises.getExercise;
  const originalExecute = execution.execute;
  syntheticExercises.set(exercise.id, exercise);
  exercises.getExercise = id => id === exercise.id ? exercise : originalGetExercise(id);
  execution.execute = execute;
  budget.reset();
  const app = fastify({ logger: false });
  app.register(require('@fastify/cookie'));
  app.register(require('@fastify/rate-limit'), { max: 100, timeWindow: '1 minute' });
  app.register(exerciseRoutes, { prefix: '/api' });
  testContext.after(async () => {
    await app.close();
    syntheticExercises.delete(exercise.id);
    exercises.getExercise = originalGetExercise;
    execution.execute = originalExecute;
    budget.reset();
  });
  return async (code = 'programme étudiant', options = {}) => app.inject({
    method: 'POST',
    url: '/api/exercise/submit',
    remoteAddress: options.remoteAddress,
    cookies: options.cookies,
    payload: { exerciseId: options.exerciseId || exercise.id, code }
  });
}

test('un résultat incorrect ne révèle ni entrées, ni attendus, ni libellés des tests cachés', async testContext => {
  const exercise = exerciseFixture();
  let calls = 0;
  const submit = await setup(testContext, exercise, async ({ stdin }) => {
    calls++;
    if (calls === 1) return { ok: true, status: 'success', stdout: exercise.tests[0].expected };
    assert.equal(stdin, exercise.tests[1].stdin);
    return { ok: true, status: 'success', stdout: `SORTIE_PRIVEE_UNIQUE ${stdin}`, stderr: 'ERREUR_PRIVEE_UNIQUE', exitCode: 0 };
  });
  const response = await submit();
  assert.equal(response.statusCode, 200);
  const report = response.json();
  assert.equal(calls, 2);
  assert.equal(report.passed, 1);
  assert.equal(report.total, 2);
  assert.deepEqual(report.results, [
    { label: 'Test caché 1', ok: true },
    { label: 'Test caché 2', ok: false }
  ]);
  assert.equal(report.stop.reason, 'wrong_output');
  assert.equal(report.stop.testIndex, 1);
  assert.equal(report.stop.hidden, true);
  assertNoPrivateValues(report);
  for (const field of ['input', 'expected', 'actual', 'stderr', 'compileError', 'exitCode', 'userMessage']) {
    assert.equal(Object.hasOwn(report.stop, field), false, field);
  }
});

test('les libellés des tests réussis restent également confidentiels', async testContext => {
  const exercise = exerciseFixture();
  let calls = 0;
  const submit = await setup(testContext, exercise, async () => ({
    ok: true, status: 'success', stdout: exercise.tests[calls++].expected
  }));
  const response = await submit();
  const report = response.json();
  assert.equal(response.statusCode, 200);
  assert.equal(report.passed, 2);
  assert.equal(report.stop, null);
  assert.deepEqual(report.results, [
    { label: 'Test caché 1', ok: true },
    { label: 'Test caché 2', ok: true }
  ]);
  assertNoPrivateValues(report);
});

test('un exemple affiché peut être évalué sans révéler les tests cachés', async testContext => {
  const exercise = exerciseFixture({
    verifyFirstExample: true,
    examples: [{ stdin: 'exemple public', expected: 'réponse publique' }]
  });
  let calls = 0;
  const submit = await setup(testContext, exercise, async ({ stdin }) => {
    calls++;
    if (calls <= 2) return { ok: true, status: 'success', stdout: exercise.tests[calls - 1].expected };
    assert.equal(stdin, 'exemple public');
    return { ok: true, status: 'success', stdout: 'SORTIE_PRIVEE_UNIQUE', stderr: 'ERREUR_PRIVEE_UNIQUE' };
  });
  const response = await submit();
  const report = response.json();
  assert.equal(response.statusCode, 200);
  assert.equal(calls, 3);
  assert.equal(report.passed, 2);
  assert.equal(report.total, 3);
  assert.deepEqual(report.results, [
    { label: 'Test caché 1', ok: true },
    { label: 'Test caché 2', ok: true },
    { label: 'Exemple affiché', ok: false }
  ]);
  assert.deepEqual(report.stop, {
    reason: 'wrong_output', testIndex: 2, label: 'Exemple affiché', example: true
  });
  assertNoPrivateValues(report);
});

test('un exemple à vérifier absent bloque la correction sans lancer de programme', async testContext => {
  const exercise = exerciseFixture({ verifyFirstExample: true, examples: [] });
  let calls = 0;
  const submit = await setup(testContext, exercise, async () => {
    calls++;
    return { ok: true, status: 'success', stdout: '' };
  });
  const response = await submit();
  assert.equal(response.statusCode, 502);
  assert.equal(calls, 0);
  assertNoPrivateValues(response.json());
});

for (const status of ['compile_error', 'runtime_error', 'timeout']) {
  test(`un échec ${status} sur l’exemple reste distinct et sans diagnostic privé`, async testContext => {
    const exercise = exerciseFixture({
      verifyFirstExample: true,
      examples: [{ stdin: 'exemple public', expected: 'réponse publique' }]
    });
    let calls = 0;
    const submit = await setup(testContext, exercise, async () => {
      calls++;
      if (calls <= 2) return { ok: true, status: 'success', stdout: exercise.tests[calls - 1].expected };
      return { ok: false, status, stdout: 'SORTIE_PRIVEE_UNIQUE', stderr: 'ERREUR_PRIVEE_UNIQUE',
        compileError: 'ERREUR_PRIVEE_UNIQUE', userMessage: 'MESSAGE_PRIVE_UNIQUE' };
    });
    const response = await submit();
    assert.equal(response.statusCode, 200);
    assert.deepEqual(response.json().stop, {
      reason: status, testIndex: 2, label: 'Exemple affiché', example: true
    });
    assertNoPrivateValues(response.json());
  });
}

for (const id of ['ws2-c4-e3', 'fl2-c4-e1']) {
  test(`${id} : la route note l’exemple réel après les sept tests cachés`, async testContext => {
    const exercise = { ...exercises.getExercise(id), chapter: 1 };
    assert.equal(exercise.verifyFirstExample, true);
    assert.equal(exercise.tests.length, 7);
    let calls = 0;
    const submit = await setup(testContext, exercise, async ({ stdin }) => {
      const index = calls++;
      if (index < exercise.tests.length) {
        assert.equal(stdin, exercise.tests[index].stdin);
        return { ok: true, status: 'success', stdout: exercise.tests[index].expected };
      }
      assert.equal(stdin, exercise.examples[0].stdin);
      return { ok: true, status: 'success', stdout: 'réponse incorrecte' };
    });
    const response = await submit();
    const report = response.json();
    assert.equal(response.statusCode, 200);
    assert.equal(calls, 8);
    assert.equal(report.passed, 7);
    assert.equal(report.total, 8);
    assert.deepEqual(report.stop, {
      reason: 'wrong_output', testIndex: 7, label: 'Exemple affiché', example: true
    });
    assert.equal(report.quota.used, 8);
  });
}

for (const status of ['compile_error', 'runtime_error', 'api_error', 'unknown_error']) {
  test(`un échec ${status} ne renvoie aucun flux ni message du test caché`, async testContext => {
    const submit = await setup(testContext, exerciseFixture(), async ({ stdin }) => ({
      ok: false,
      status,
      stdout: `SORTIE_PRIVEE_UNIQUE ${stdin}`,
      stderr: `ERREUR_PRIVEE_UNIQUE ${stdin}`,
      compileError: `ERREUR_PRIVEE_UNIQUE ${stdin}`,
      userMessage: `MESSAGE_PRIVE_UNIQUE ${stdin}`,
      exitCode: 42
    }));
    const response = await submit();
    const report = response.json();
    assert.equal(response.statusCode, 200);
    assert.equal(report.stop.reason, status);
    assert.equal(report.stop.hidden, true);
    assertNoPrivateValues(report);
    for (const field of ['input', 'expected', 'actual', 'stderr', 'compileError', 'exitCode', 'userMessage']) {
      assert.equal(Object.hasOwn(report.stop, field), false, field);
    }
  });
}

test('une exception de transport ne divulgue pas son message brut', async testContext => {
  const submit = await setup(testContext, exerciseFixture(), async ({ stdin }) => {
    const error = new Error(`ERREUR_PRIVEE_UNIQUE ${stdin}`);
    error.code = 'api_error';
    error.userMessage = `MESSAGE_PRIVE_UNIQUE ${stdin}`;
    throw error;
  });
  const response = await submit();
  assert.equal(response.statusCode, 502);
  assertNoPrivateValues(response.json());
  assert.match(response.json().error, /indisponible|réessayez/i);
});

test('un quota épuisé entre deux cas conserve son diagnostic sans lancer le second', async testContext => {
  const previous = process.env.EXEC_DAILY_LIMIT_PER_USER;
  process.env.EXEC_DAILY_LIMIT_PER_USER = '1';
  testContext.after(() => {
    if (previous === undefined) delete process.env.EXEC_DAILY_LIMIT_PER_USER;
    else process.env.EXEC_DAILY_LIMIT_PER_USER = previous;
  });
  const exercise = exerciseFixture();
  let calls = 0;
  const submit = await setup(testContext, exercise, async () => {
    calls++;
    return { ok: true, status: 'success', stdout: exercise.tests[0].expected };
  });
  const response = await submit();
  assert.equal(response.statusCode, 429);
  assert.equal(calls, 1);
  assert.match(response.json().error, /exécutions|quota/i);
  assert.equal(response.json().quota.used, 1);
  assertNoPrivateValues(response.json());
});

test('le refus du shebang reste explicite sans lancer de test', async testContext => {
  const exercise = exerciseFixture({ language: 'bash', requiredShebang: '#!/bin/bash' });
  let calls = 0;
  const submit = await setup(testContext, exercise, async () => { calls++; });
  const response = await submit('echo bonjour');
  assert.equal(response.statusCode, 200);
  assert.equal(calls, 0);
  const report = response.json();
  assert.equal(report.stop.reason, 'invalid_source');
  assert.equal(report.stop.label, 'Shebang');
  assert.match(report.stop.userMessage, /#!\/bin\/bash/);
  assertNoPrivateValues(report);
});

test('les grilles d’analyse indiquent le cas à corriger sans livrer l’attendu', async testContext => {
  const exercise = exerciseFixture({
    language: 'analyse',
    tests: [{ label: 'Cas visible', stdin: 'cas:1', expected: 'attendu formatif' }]
  });
  const submit = await setup(testContext, exercise, async () => ({
    ok: true, status: 'success', stdout: 'réponse de l’étudiant'
  }));
  const response = await submit('[Cas 1]\nréponse de l’étudiant');
  const report = response.json();
  assert.equal(response.statusCode, 200);
  assert.equal(report.stop.reason, 'wrong_output');
  assert.equal(report.stop.label, 'Cas 1');
  assert.equal(Object.hasOwn(report.stop, 'expected'), false);
  assert.equal(report.stop.actual, 'réponse de l’étudiant');
  assert.match(report.stop.userMessage, /vérifiez/i);
  assert.deepEqual(report.results, [{ label: 'Cas 1', ok: false }]);
  assert.doesNotMatch(JSON.stringify(report), /attendu formatif/);
  assert.notEqual(report.stop.hidden, true);
});

test('tous les exercices exécutables actifs protègent leur retour de test', async testContext => {
  const originalExecute = execution.execute;
  const names = ['JWT_SECRET', 'EXEC_DAILY_LIMIT_PER_USER', 'EXEC_DAILY_LIMIT_GLOBAL'];
  const previous = Object.fromEntries(names.map(name => [name, process.env[name]]));
  process.env.JWT_SECRET = 'session-confidentialite-test';
  process.env.EXEC_DAILY_LIMIT_PER_USER = '2000';
  process.env.EXEC_DAILY_LIMIT_GLOBAL = '2000';
  const token = jwt.sign({ userId: 'confidentialite-test' }, process.env.JWT_SECRET);
  const app = fastify({ logger: false });
  app.register(require('@fastify/cookie'));
  app.register(require('@fastify/rate-limit'), { max: 8, timeWindow: '1 minute' });
  app.register(require('../server/routes/exercises'), { prefix: '/api' });
  budget.reset();
  testContext.after(async () => {
    await app.close();
    execution.execute = originalExecute;
    budget.reset();
    for (const name of names) {
      if (previous[name] === undefined) delete process.env[name];
      else process.env[name] = previous[name];
    }
  });

  const active = exercises.listExercises().filter(exercise =>
    exercise.language !== 'analyse' && !gradingPolicy.isGradingSuspended(exercise.course, exercise.id));
  assert.ok(active.length > 0);
  for (const [index, exercise] of active.entries()) {
    let calls = 0;
    execution.execute = async ({ stdin, code }) => {
      calls++;
      const methodCheck = ['algo-c6-e3', 'algo-c9-e1', 'algo-c9-e3', 'algo-c10-e3'].includes(exercise.id);
      if (methodCheck) {
        const match = /^REVI_INPUT="([A-Za-z0-9+/=]*)"$/m.exec(code);
        assert.ok(match, exercise.id);
        stdin = Buffer.from(match[1], 'base64').toString('utf8');
      }
      const stdout = calls === 1 ? exercise.tests[0].expected : `SORTIE_PRIVEE_UNIQUE ${stdin}`;
      if (methodCheck) return {
        ok: true, status: 'success',
        stdout: JSON.stringify({ schema: 'revi-methode-v1', status: 'verified', output: stdout })
      };
      if (calls === 1) return { ok: true, status: 'success', stdout };
      return {
        ok: true, status: 'success',
        stdout,
        stderr: 'ERREUR_PRIVEE_UNIQUE', exitCode: 0
      };
    };
    const response = await app.inject({
      method: 'POST',
      url: '/api/exercise/submit',
      remoteAddress: `10.21.${Math.floor(index / 250)}.${index % 250 + 1}`,
      cookies: { auth_token: token },
      payload: {
        exerciseId: exercise.id,
        code: exercise.requiredShebang ? `${exercise.requiredShebang}\n# test` : 'programme étudiant'
      }
    });
    assert.equal(response.statusCode, 200, exercise.id);
    const report = response.json();
    assert.equal(calls, 2, exercise.id);
    assert.equal(report.passed, 1, exercise.id);
    assert.deepEqual(report.results, [
      { label: 'Test caché 1', ok: true },
      { label: 'Test caché 2', ok: false }
    ], exercise.id);
    assert.deepEqual(report.stop, {
      reason: 'wrong_output', testIndex: 1, label: 'Test caché 2', hidden: true
    }, exercise.id);
    assertNoPrivateValues(report);
  }
  testContext.diagnostic(`${active.length} soumissions simulées : aucun flux ou libellé interne renvoyé ; aucun programme étudiant exécuté.`);
});

test('toutes les grilles d’analyse actives conservent leur retour sans révéler les attendus', async testContext => {
  const names = ['JWT_SECRET', 'EXEC_DAILY_LIMIT_PER_USER', 'EXEC_DAILY_LIMIT_GLOBAL'];
  const previous = Object.fromEntries(names.map(name => [name, process.env[name]]));
  process.env.JWT_SECRET = 'session-grilles-test';
  process.env.EXEC_DAILY_LIMIT_PER_USER = '2000';
  process.env.EXEC_DAILY_LIMIT_GLOBAL = '2000';
  testContext.after(() => {
    for (const name of names) {
      if (previous[name] === undefined) delete process.env[name];
      else process.env[name] = previous[name];
    }
  });
  const token = jwt.sign({ userId: 'grilles-test' }, process.env.JWT_SECRET);
  const active = exercises.listExercises().filter(exercise =>
    exercise.language === 'analyse' && !gradingPolicy.isGradingSuspended(exercise.course, exercise.id));
  assert.ok(active.length > 0);
  const answer = 'REPONSE_ETUDIANT_UNIQUE';
  const submit = await setup(testContext, active[0], async () => ({
    ok: true, status: 'success', stdout: answer
  }));
  for (const [index, exercise] of active.entries()) {
    const response = await submit(answer, {
      exerciseId: exercise.id,
      remoteAddress: `10.22.${Math.floor(index / 250)}.${index % 250 + 1}`,
      cookies: { auth_token: token }
    });
    assert.equal(response.statusCode, 200, exercise.id);
    const report = response.json();
    assert.equal(report.passed, 0, exercise.id);
    assert.deepEqual(report.results, [{ label: 'Cas 1', ok: false }], exercise.id);
    assert.deepEqual(report.stop, {
      reason: 'wrong_output', testIndex: 0, label: 'Cas 1', actual: answer,
      userMessage: 'Réponse incorrecte. Vérifiez vos calculs ou votre raisonnement.'
    }, exercise.id);
  }
  testContext.diagnostic(`${active.length} grilles simulées : la réponse de l’élève reste visible, pas l’attendu ; les données des cas restent elles-mêmes affichées.`);
});

test('le tuteur distingue les échecs sans inventer de diagnostic ou d’attendu', () => {
  const cases = [
    ['compile_error', /compilation/i],
    ['runtime_error', /exécution|arrêté/i],
    ['timeout', /délai|temps/i],
    ['wrong_output', /résultat|réponse/i]
  ];
  for (const [status, expected] of cases) {
    const userMessage = aiHelp.buildMessages({ code: 'programme étudiant', status })[1].content;
    assert.match(userMessage, expected, status);
    assert.match(userMessage, /non transmis|non communiqué|masqué/i, status);
    assert.doesNotMatch(userMessage, /sans erreur visible/i, status);
  }
  const analysisMessage = aiHelp.buildMessages({
    code: 'réponse de l’étudiant', status: 'wrong_output', actual: 'réponse de l’étudiant'
  })[1].content;
  assert.match(analysisMessage, /réponse de l’étudiant/);
  assert.match(analysisMessage, /attendu.{0,35}(non transmis|non communiqué|masqué)/i);
  assert.doesNotMatch(analysisMessage, /Résultat attendu\s*:\s*(?:\n|$)/);
});

test('la route du tuteur transmet seulement un statut autorisé', async testContext => {
  const originalChat = aiPool.chatCompletion;
  let captured;
  aiPool.chatCompletion = async request => {
    captured = request.messages;
    return { data: { choices: [{ message: { content: 'Vérifiez la syntaxe de votre programme.' } }] } };
  };
  const app = fastify({ logger: false });
  app.register(require('@fastify/cookie'));
  app.register(require('@fastify/rate-limit'), { max: 100, timeWindow: '1 minute' });
  app.register(require('../server/routes/exercises'), { prefix: '/api' });
  testContext.after(async () => {
    await app.close();
    aiPool.chatCompletion = originalChat;
  });
  const request = status => app.inject({
    method: 'POST', url: '/api/code-help',
    payload: { exerciseId: 'py-c1-e1', code: 'print(1)', status }
  });
  const valid = await request('compile_error');
  assert.equal(valid.statusCode, 200);
  assert.match(captured[1].content, /compilation/i);
  assert.match(captured[1].content, /non transmis|non communiqué|masqué/i);
  const invalid = await request('compile_error\nINSTRUCTION_NON_AUTORISEE');
  assert.equal(invalid.statusCode, 200);
  assert.doesNotMatch(captured[1].content, /INSTRUCTION_NON_AUTORISEE/);
});
