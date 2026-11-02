'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Fastify = require('fastify');
const cookie = require('@fastify/cookie');
const rateLimit = require('@fastify/rate-limit');
const jwt = require('jsonwebtoken');
const parse5 = require('parse5');

const catalogue = require('../server/exercises');
const courseConfig = require('../server/exercises/course-config');
const execution = require('../server/services/execution');
const localRunner = require('../server/services/execution/local-runner');
const budget = require('../server/services/execution/budget');
const aiHelp = require('../server/services/ai-help');
const aiPool = require('../server/services/ai-pool');
const exerciseRoutes = require('../server/routes/exercises');
const labGenerator = require('../scripts/generate-code-labs');

const root = path.resolve(__dirname, '..');
const grids = catalogue.listExercises().filter(exercise => exercise.language === 'analyse');
const privateMarker = 'MARQUEUR_CONFIDENTIEL_LOT1_P3';
const quotaSnapshot = { used: 1, limit: 100, remaining: 99, globalUsed: 1, globalLimit: 1000 };

function assertNoMarker(value, context) {
  assert.ok(!JSON.stringify(value).includes(privateMarker), context);
}

function assertFields(value, expected, context) {
  assert.ok(value && typeof value === 'object' && !Array.isArray(value), context);
  assert.ok(Object.keys(value).sort().join('|') === [...expected].sort().join('|'), context);
}

function fixture(overrides = {}) {
  return {
    id: 'confidentialite-c1-e1',
    course: 'b1-algebre',
    chapter: 1,
    level: 'n1',
    title: 'Titre public',
    goal: 'Objectif public',
    brief: '<p>Énoncé public.</p>',
    starter: '[Cas 1]\nA_COMPLETER\n[Cas 2]\nA_COMPLETER',
    language: 'analyse',
    hints: ['Indice public'],
    examples: [{
      stdin: 'ENTREE_EXEMPLE_PUBLIQUE',
      expected: `${privateMarker}_ATTENDU_EXEMPLE`,
      note: `${privateMarker}_NOTE_RESOLUE`
    }],
    tests: [
      { stdin: 'cas:1', expected: `${privateMarker}_ATTENDU_1`, label: `${privateMarker}_LIBELLE_1` },
      { stdin: 'cas:2', expected: `${privateMarker}_ATTENDU_2`, hint: `${privateMarker}_INDICE_2` }
    ],
    solution: `${privateMarker}_CORRIGE_COMPLET`,
    ...overrides
  };
}

async function harness(testContext, options = {}) {
  const previousSecret = process.env.JWT_SECRET;
  process.env.JWT_SECRET = 'cle-factice-grilles-confidentialite';
  testContext.after(() => {
    if (previousSecret === undefined) delete process.env.JWT_SECRET;
    else process.env.JWT_SECRET = previousSecret;
  });

  testContext.mock.method(budget, 'canExecute', options.canExecute || (() => ({ allowed: true })));
  testContext.mock.method(budget, 'consume', options.consume || (() => {}));
  testContext.mock.method(budget, 'snapshot', options.snapshot || (() => ({ ...quotaSnapshot })));
  if (options.getExercise) testContext.mock.method(catalogue, 'getExercise', options.getExercise);
  if (options.execute) testContext.mock.method(execution, 'execute', options.execute);
  if (options.chat) testContext.mock.method(aiPool, 'chatCompletion', options.chat);

  const app = Fastify({ logger: false });
  await app.register(cookie);
  await app.register(rateLimit, { max: 10000, timeWindow: '1 minute' });
  await app.register(exerciseRoutes, { prefix: '/api' });
  await app.ready();
  testContext.after(() => app.close());

  const token = jwt.sign({ userId: 'test-grilles-confidentialite' }, process.env.JWT_SECRET);
  let requestCount = 0;
  async function request(url, payload, settings = {}) {
    requestCount++;
    const address = settings.address || `198.18.${Math.floor((requestCount - 1) / 254) % 254}.${(requestCount - 1) % 254 + 1}`;
    return app.inject({
      method: 'POST',
      url,
      remoteAddress: address,
      headers: settings.authenticated === false ? {} : { cookie: `auth_token=${token}` },
      payload
    });
  }
  return {
    app,
    submit: (payload, settings) => request('/api/exercise/submit', payload, settings),
    help: (payload, settings) => request('/api/code-help', payload, settings)
  };
}

function descendants(node, predicate) {
  const matches = [];
  function visit(current) {
    if (predicate(current)) matches.push(current);
    for (const child of current.childNodes || []) visit(child);
    if (current.content) visit(current.content);
  }
  visit(node);
  return matches;
}

function attribute(node, name) {
  const match = (node.attrs || []).find(entry => entry.name === name);
  return match ? match.value : undefined;
}

function hasClass(node, className) {
  return (attribute(node, 'class') || '').split(/\s+/).includes(className);
}

function textContent(node) {
  if (node.nodeName === '#text') return node.value;
  return (node.childNodes || []).map(textContent).join('');
}

function textValues(value) {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(textValues);
  if (value && typeof value === 'object') return Object.values(value).flatMap(textValues);
  return [];
}

function normalized(value) {
  return typeof value === 'string'
    ? value.normalize('NFKC').toLocaleLowerCase('fr').replace(/\s+/g, ' ').trim()
    : '';
}

test('projection et JSON : champs de correction et notes d’exemple absents pour 830 grilles', testContext => {
  assert.equal(grids.length, 830);
  let caseCount = 0;
  let exampleCount = 0;
  for (const exercise of grids) {
    const projected = catalogue.toClient(exercise);
    const serialized = JSON.parse(JSON.stringify(projected));
    assert.equal(Object.hasOwn(serialized, 'tests'), false, exercise.id);
    assert.equal(Object.hasOwn(serialized, 'solution'), false, exercise.id);
    assert.equal(serialized.examples.length, exercise.examples.length, exercise.id);
    caseCount += exercise.tests.length;
    exampleCount += exercise.examples.length;
    for (const [index, example] of serialized.examples.entries()) {
      assertFields(example, ['stdin'], `${exercise.id} exemple ${index + 1}`);
      assert.equal(example.stdin, exercise.examples[index].stdin, exercise.id);
    }
    const poisoned = {
      ...exercise,
      tests: [{ stdin: privateMarker, expected: privateMarker, label: privateMarker }],
      solution: privateMarker,
      examples: exercise.examples.map(example => ({ ...example, expected: privateMarker, note: privateMarker, other: privateMarker }))
    };
    const poisonedProjection = catalogue.toClient(poisoned);
    assertNoMarker(poisonedProjection, exercise.id);
    assert.deepEqual(poisonedProjection, projected, exercise.id);
  }

  for (const exercise of catalogue.listExercises().filter(entry => entry.language !== 'analyse')) {
    assert.deepEqual(catalogue.toClient(exercise).examples, exercise.examples || [], exercise.id);
  }

  const overlap = fixture({
    brief: `<p>Texte déjà public : ${privateMarker}</p>`,
    examples: [{ stdin: privateMarker, expected: privateMarker, note: privateMarker }]
  });
  const projectedOverlap = catalogue.toClient(overlap);
  assert.equal(projectedOverlap.examples[0].stdin, privateMarker);
  assertFields(projectedOverlap.examples[0], ['stdin'], 'entrée publique identique à un attendu');
  assert.ok(projectedOverlap.brief.includes(privateMarker));
  testContext.diagnostic(`${grids.length} grilles, ${caseCount} cas cachés et ${exampleCount} exemples contrôlés.`);
});

test('pages existantes : inventaire des exemples et cohérence des attributs, sans supposer leur régénération', testContext => {
  const pages = new Map();
  let visibleExpected = 0;
  let visibleNote = 0;
  for (const exercise of grids) {
    const config = courseConfig[exercise.course];
    const filename = path.join(root, config.dir, config.chapterDir, `chapitre${exercise.chapter}.html`);
    if (!pages.has(filename)) {
      const document = parse5.parse(fs.readFileSync(filename, 'utf8'));
      const labs = new Map();
      for (const node of descendants(document, entry => attribute(entry, 'data-exercise') !== undefined)) {
        labs.set(attribute(node, 'data-exercise'), node);
      }
      pages.set(filename, labs);
    }
    const lab = pages.get(filename).get(exercise.id);
    assert.ok(lab, exercise.id);
    assert.equal(attribute(lab, 'data-language'), 'analyse', exercise.id);
    assert.equal(attribute(lab, 'data-stdin'), exercise.examples[0].stdin.replace(/\r\n/g, '\n'), exercise.id);
    assert.equal(descendants(lab, node => attribute(node, 'data-lab-starter') !== undefined).length, 1, exercise.id);

    const parts = descendants(lab, node => hasClass(node, 'lab__sample-part'));
    for (const part of parts) {
      const label = descendants(part, node => node.nodeName === 'b')[0];
      const output = descendants(part, node => node.nodeName === 'pre')[0];
      if (label && output && textContent(label).trim() === 'Résolution attendue' &&
          textContent(output) === exercise.examples[0].expected) visibleExpected++;
    }
    if (exercise.examples[0].note && descendants(lab, node => hasClass(node, 'lab__note'))
      .some(node => textContent(node).trim() === exercise.examples[0].note.trim())) visibleNote++;
  }
  assert.equal(visibleExpected, 0, 'aucune résolution d’exemple ne doit être dans les pages');
  assert.equal(visibleNote, 0, 'aucune note de résolution ne doit être dans les pages');
  testContext.diagnostic(`${grids.length} ateliers dans ${pages.size} pages ; ${visibleExpected} attendus et ${visibleNote} notes d’exemple encore présents dans le HTML inspecté.`);
});

test('soumission : succès et échec à chacun des cas cachés des 830 grilles', async testContext => {
  let currentExercise;
  let failingIndex;
  let calls;
  const api = await harness(testContext, {
    execute: async ({ stdin }) => {
      const index = calls++;
      assert.equal(stdin, currentExercise.tests[index].stdin || '', currentExercise.id);
      if (failingIndex === -1 || index < failingIndex) {
        return { ok: true, status: 'success', stdout: currentExercise.tests[index].expected };
      }
      return {
        ok: true,
        status: 'success',
        stdout: `${privateMarker}\n${currentExercise.tests[index].expected}\n${currentExercise.solution}\n${currentExercise.examples[0].expected}`,
        stderr: privateMarker,
        userMessage: privateMarker
      };
    }
  });

  let checkedCases = 0;
  for (const exercise of grids) {
    currentExercise = exercise;
    const code = exercise.tests.map((entry, index) => `[Cas ${index + 1}]\nREPONSE_ENVOYEE_PAR_ELEVE_${index + 1}`).join('\n');
    for (let scenario = -1; scenario < exercise.tests.length; scenario++) {
      failingIndex = scenario;
      calls = 0;
      const response = await api.submit({ exerciseId: exercise.id, code });
      assert.equal(response.statusCode, 200, `${exercise.id} scénario ${scenario}`);
      const report = response.json();
      assertFields(report, ['passed', 'total', 'results', 'stop', 'quota'], exercise.id);
      assert.equal(report.total, exercise.tests.length, exercise.id);
      assertNoMarker(report, `${exercise.id} scénario ${scenario}`);
      assert.deepEqual(report.quota, quotaSnapshot, exercise.id);
      if (scenario === -1) {
        assert.equal(calls, exercise.tests.length, exercise.id);
        assert.equal(report.passed, exercise.tests.length, exercise.id);
        assert.equal(report.stop, null, exercise.id);
        assert.equal(report.results.length, exercise.tests.length, exercise.id);
      } else {
        checkedCases++;
        assert.equal(calls, scenario + 1, exercise.id);
        assert.equal(report.passed, scenario, exercise.id);
        assert.equal(report.results.length, scenario + 1, exercise.id);
        assertFields(report.stop, ['reason', 'testIndex', 'label', 'actual', 'userMessage'], exercise.id);
        assert.equal(report.stop.reason, 'wrong_output', exercise.id);
        assert.equal(report.stop.testIndex, scenario, exercise.id);
        assert.equal(report.stop.label, `Cas ${scenario + 1}`, exercise.id);
        const submitted = await localRunner.runAnalyse(code, exercise.tests[scenario].stdin);
        assert.ok(report.stop.actual === submitted.data.stdout, `${exercise.id} : réponse non issue de l’usager`);
        assert.equal(report.stop.userMessage, 'Réponse incorrecte. Vérifiez vos calculs ou votre raisonnement.', exercise.id);
      }
      for (const [index, result] of report.results.entries()) {
        assertFields(result, ['label', 'ok'], exercise.id);
        assert.equal(result.label, `Cas ${index + 1}`, exercise.id);
        assert.equal(result.ok, scenario === -1 || index < scenario, exercise.id);
      }
    }
  }
  testContext.diagnostic(`${grids.length} succès et ${checkedCases} échecs ciblés ; rapports limités au verdict et à la saisie.`);
});

test('une réponse effectivement envoyée par l’usager ne devient pas une fuite par simple coïncidence', async testContext => {
  const exercise = fixture();
  const code = `[Cas 1]\n${exercise.tests[1].expected}\n[Cas 2]\nÀ compléter`;
  const api = await harness(testContext, {
    getExercise: () => exercise,
    execute: async ({ code: submitted }) => {
      const selected = await localRunner.runAnalyse(submitted, 'cas:1');
      return { ok: true, status: 'success', stdout: selected.data.stdout };
    }
  });
  const response = await api.submit({ exerciseId: exercise.id, code });
  assert.equal(response.statusCode, 200);
  assert.equal(response.json().stop.actual, exercise.tests[1].expected);
  assert.equal(response.json().stop.reason, 'wrong_output');
  assert.equal(Object.hasOwn(response.json().stop, 'expected'), false);
});

test('une réponse multiligne échappée reste issue de la saisie réelle', async testContext => {
  const exercise = fixture();
  const code = '# Format REVI-ANALYSE:1\n[Cas 1]\n\\=# détail\n\\=[Cas 9]\n  autre ligne\n[Cas 2]\nréponse';
  const api = await harness(testContext, { getExercise: () => exercise });
  const response = await api.submit({ exerciseId: exercise.id, code });
  assert.equal(response.statusCode, 200);
  assert.equal(response.json().stop.reason, 'wrong_output');
  assert.equal(response.json().stop.actual, '# détail\n[Cas 9]\n  autre ligne');
  assertNoMarker(response.json(), 'réponse multiligne');
});

test('soumission : exercice inconnu, authentification, suspension, entrée et quotas', async testContext => {
  const exercise = fixture();
  let allowed = true;
  let executions = 0;
  const api = await harness(testContext, {
    getExercise: id => id === 'absent' ? null : {
      ...exercise,
      chapter: id === 'prive' ? 2 : 1,
      course: id === 'suspendu' ? 'csharp' : exercise.course
    },
    canExecute: () => ({ allowed }),
    execute: async () => { executions++; return { ok: true, stdout: 'erreur de l’élève' }; }
  });

  const cases = [
    [{ exerciseId: 'absent', code: 'x' }, {}, 400],
    [{ exerciseId: 'prive', code: 'x' }, { authenticated: false }, 401],
    [{ exerciseId: 'suspendu', code: 'x' }, {}, 503],
    [{ exerciseId: exercise.id, code: '' }, {}, 400],
    [{ exerciseId: exercise.id, code: null }, {}, 400],
    [{ exerciseId: exercise.id, code: 'x'.repeat(execution.LIMITS.code + 1) }, {}, 400]
  ];
  for (const [payload, settings, status] of cases) {
    const response = await api.submit(payload, settings);
    assert.equal(response.statusCode, status);
    assertNoMarker(response.json(), `statut ${status}`);
  }
  allowed = false;
  const exhausted = await api.submit({ exerciseId: exercise.id, code: 'x' });
  assert.equal(exhausted.statusCode, 429);
  assert.equal(exhausted.json().status, 'rate_limited');
  assertNoMarker(exhausted.json(), 'quota initial');
  assert.equal(executions, 0);
});

test('soumission : quota épuisé entre deux cas, sans message interne', async testContext => {
  const exercise = fixture();
  let checks = 0;
  let calls = 0;
  const api = await harness(testContext, {
    getExercise: () => exercise,
    canExecute: () => ({ allowed: ++checks <= 2 }),
    execute: async () => { calls++; return { ok: true, stdout: exercise.tests[0].expected }; }
  });
  const response = await api.submit({ exerciseId: exercise.id, code: 'réponse' });
  assert.equal(response.statusCode, 429);
  assert.equal(response.json().status, 'rate_limited');
  assert.equal(calls, 1);
  assertNoMarker(response.json(), 'quota intermédiaire');
});

test('quota : seuls les champs numériques prévus sont renvoyés', async testContext => {
  const exercise = fixture();
  let allowed = true;
  let exhaustedDuringExecution = false;
  const api = await harness(testContext, {
    getExercise: () => exercise,
    canExecute: () => ({ allowed }),
    snapshot: () => ({
      used: 1,
      limit: privateMarker,
      remaining: 99,
      globalUsed: NaN,
      globalLimit: 1000,
      expected: privateMarker,
      details: { solution: privateMarker }
    }),
    execute: async () => {
      if (exhaustedDuringExecution) {
        const error = new Error(privateMarker);
        error.code = 'quota_exhausted';
        throw error;
      }
      return { ok: true, stdout: 'réponse incorrecte' };
    }
  });
  const payload = { exerciseId: exercise.id, code: '[Cas 1]\nréponse' };
  const responses = [await api.submit(payload)];
  allowed = false;
  responses.push(await api.submit(payload));
  allowed = true;
  exhaustedDuringExecution = true;
  responses.push(await api.submit(payload));
  assert.deepEqual(responses.map(response => response.statusCode), [200, 429, 429]);
  for (const response of responses) {
    const quota = response.json().quota;
    assertFields(quota, ['used', 'limit', 'remaining', 'globalUsed', 'globalLimit'], 'projection quota');
    assert.deepEqual(quota, { used: 1, limit: 0, remaining: 99, globalUsed: 0, globalLimit: 1000 });
    assertNoMarker(response.json(), 'quota contaminé');
  }
});

test('soumission : états d’exécution, libellés et messages restent filtrés', async testContext => {
  let exercise = fixture();
  let outcome;
  const api = await harness(testContext, {
    getExercise: () => exercise,
    execute: async () => outcome
  });
  const statuses = ['compile_error', 'runtime_error', 'timeout', 'rate_limited', 'api_error', 'unknown_error', 'cancelled', privateMarker];
  for (const status of statuses) {
    outcome = {
      ok: false,
      status,
      stdout: privateMarker,
      stderr: privateMarker,
      compileError: privateMarker,
      userMessage: privateMarker,
      exitCode: 1
    };
    const response = await api.submit({ exerciseId: exercise.id, code: '[Cas 1]\nréponse' });
    assert.equal(response.statusCode, 200);
    const report = response.json();
    assertNoMarker(report, `état ${status}`);
    assertFields(report.stop, ['reason', 'testIndex', 'label', 'actual', 'userMessage'], 'arrêt');
    assert.equal(report.stop.reason, status === privateMarker ? 'api_error' : status);
    assert.equal(report.stop.label, 'Cas 1');
    assert.equal(report.stop.actual, '');
    assert.equal(report.stop.userMessage, 'La vérification n’a pas pu être effectuée. Réessayez.');
  }

  exercise = fixture({ requiredShebang: `${privateMarker}_SHEBANG` });
  const shebang = await api.submit({ exerciseId: exercise.id, code: 'réponse sans shebang' });
  assert.equal(shebang.statusCode, 200);
  assert.equal(shebang.json().stop.reason, 'api_error');
  assertNoMarker(shebang.json(), 'shebang non applicable à analyse');
});

test('soumission : erreurs du moteur et exceptions inattendues ne livrent aucun détail', async testContext => {
  let exercise = fixture();
  let errorCode;
  const api = await harness(testContext, {
    getExercise: () => exercise,
    execute: async () => {
      if (errorCode === 'exception_interne') {
        return { ok: true, get stdout() { throw new Error(privateMarker); } };
      }
      const error = new Error(`${privateMarker}_MESSAGE`);
      error.code = errorCode;
      error.userMessage = `${privateMarker}_MESSAGE_UTILISATEUR`;
      throw error;
    }
  });

  for (const [code, status] of [
    ['quota_exhausted', 429], ['not_configured', 503], ['timeout', 502],
    ['upstream_unreachable', 502], ['invalid_request', 502], [privateMarker, 502], ['exception_interne', 500]
  ]) {
    errorCode = code;
    const response = await api.submit({ exerciseId: exercise.id, code: 'réponse' });
    assert.equal(response.statusCode, status, code);
    assertNoMarker(response.json(), code);
  }

  exercise = fixture({ verifyFirstExample: true });
  const invalid = await api.submit({ exerciseId: exercise.id, code: 'réponse' });
  assert.equal(invalid.statusCode, 502);
  assertNoMarker(invalid.json(), 'exemple d’analyse non vérifiable');
});

test('limitation de fréquence : réponse d’erreur générique', async testContext => {
  const exercise = fixture();
  const api = await harness(testContext, { getExercise: () => exercise });
  let response;
  for (let index = 0; index < 9; index++) {
    response = await api.submit({ exerciseId: exercise.id, code: '' }, { address: '198.18.200.1' });
  }
  assert.equal(response.statusCode, 429);
  assertNoMarker(response.json(), 'limitation de fréquence');
});

test('aide formative : aucune réponse privée, aucun modèle génératif', async testContext => {
  const exercise = fixture();
  let calls = 0;
  const api = await harness(testContext, {
    getExercise: () => exercise,
    chat: async () => { calls++; throw new Error(privateMarker); }
  });
  const payload = { exerciseId: exercise.id, code: 'réponse personnelle', status: 'wrong_output' };
  const baseline = await api.help(payload);
  assert.equal(baseline.statusCode, 200);
  assertFields(baseline.json(), ['explanation', 'notice', 'stripped'], 'aide formative');
  assertNoMarker(baseline.json(), 'aide formative');
  for (const field of ['code', 'stdout', 'stderr', 'compileError', 'expected', 'actual', 'question']) {
    const response = await api.help({ ...payload, [field]: privateMarker });
    assert.equal(response.statusCode, 200, field);
    assert.deepEqual(response.json(), baseline.json(), field);
    assertNoMarker(response.json(), field);
  }
  assert.equal(calls, 0);
});

test('aide formative : aucun corrigé ni appel au modèle pour les 830 grilles', async testContext => {
  let current;
  let calls = 0;
  const api = await harness(testContext, {
    getExercise: () => current,
    chat: async () => { calls++; throw new Error(privateMarker); }
  });
  let reference;
  for (const exercise of grids) {
    current = {
      ...exercise,
      solution: privateMarker,
      tests: exercise.tests.map(entry => ({ ...entry, expected: privateMarker, hint: privateMarker })),
      examples: exercise.examples.map(entry => ({ ...entry, expected: privateMarker, note: privateMarker }))
    };
    const response = await api.help({ exerciseId: exercise.id, code: 'réponse personnelle' });
    assert.equal(response.statusCode, 200, exercise.id);
    assertNoMarker(response.json(), exercise.id);
    if (!reference) reference = response.json();
    assert.deepEqual(response.json(), reference, exercise.id);
  }
  assert.equal(calls, 0);
  testContext.diagnostic(`${grids.length} grilles : une aide générale constante, aucun appel au modèle et aucun champ de correction transmis.`);
});

test('tuteur : authentification et exception hors du fournisseur ne divulguent pas les messages', async testContext => {
  let mode = 'prive';
  const api = await harness(testContext, {
    getExercise: id => {
      if (mode === 'exception') throw new Error(privateMarker);
      if (id === 'inconnu') return null;
      return fixture({ chapter: mode === 'public' ? 1 : 2 });
    },
    chat: async () => ({ data: { choices: [{ message: { content: 'Une piste.' } }] } })
  });
  const denied = await api.help({ exerciseId: 'prive', code: 'réponse' }, { authenticated: false });
  assert.equal(denied.statusCode, 401);
  assertNoMarker(denied.json(), 'authentification tuteur');
  const unknownDenied = await api.help({ exerciseId: 'inconnu', code: 'réponse' }, { authenticated: false });
  assert.equal(unknownDenied.statusCode, 401);
  const unknownAuthorized = await api.help({ exerciseId: 'inconnu', code: 'réponse' });
  assert.equal(unknownAuthorized.statusCode, 200);
  mode = 'public';
  const publicChapter = await api.help({ exerciseId: 'public', code: 'réponse' }, { authenticated: false });
  assert.equal(publicChapter.statusCode, 200);
  mode = 'exception';
  for (const request of [api.submit, api.help]) {
    const response = await request({ exerciseId: 'exception', code: 'réponse' });
    assert.equal(response.statusCode, 500);
    assertNoMarker(response.json(), 'exception inattendue');
  }
});

test('JSON invalide : les erreurs du parseur ne renvoient pas de détails', async testContext => {
  const api = await harness(testContext);
  for (const url of ['/api/exercise/submit', '/api/code-help']) {
    const response = await api.app.inject({
      method: 'POST',
      url,
      headers: { 'content-type': 'application/json' },
      payload: `{"erreur":"${privateMarker}`
    });
    assert.equal(response.statusCode, 400);
    assertNoMarker(response.json(), url);
  }
});

const chromePath = process.env.CHROME_BIN || '/usr/bin/chromium';

test('interface : grille et tuteur fonctionnent avec un HTML simulé sans réponses d’exemple', {
  skip: fs.existsSync(chromePath) ? false : 'Chromium requis pour le contrôle de l’interface',
  timeout: 60000
}, async testContext => {
  const { chromium } = require('playwright-core');
  const api = await harness(testContext, {
    chat: async () => ({ data: { choices: [{ message: { content: 'Vérifiez la méthode et comparez les données.' } }] } })
  });
  const fragment = parse5.parseFragment(labGenerator.renderSection('b1-algebre', 1));
  function removeExampleAnswers(node) {
    if (!node.childNodes) return;
    node.childNodes = node.childNodes.filter(child => {
      if (hasClass(child, 'lab__note')) return false;
      if (!hasClass(child, 'lab__sample-part')) return true;
      const label = descendants(child, entry => entry.nodeName === 'b')[0];
      return !label || textContent(label).trim() !== 'Résolution attendue';
    });
    for (const child of node.childNodes) removeExampleAnswers(child);
  }
  removeExampleAnswers(fragment);
  const html = `<!doctype html><html lang="fr"><meta charset="utf-8"><body>${parse5.serialize(fragment)}<script src="/assets/js/code-lab.js"></script></body></html>`;
  const asset = fs.readFileSync(path.join(root, 'assets/js/code-lab.js'), 'utf8');
  const browser = await chromium.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-background-networking']
  });
  testContext.after(() => browser.close());
  const context = await browser.newContext({ serviceWorkers: 'block' });
  const page = await context.newPage();
  const errors = [];
  const sent = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.route('**/*', async route => {
    const request = route.request();
    const address = new URL(request.url());
    if (address.origin !== 'http://grilles.test') return route.abort();
    if (address.pathname === '/b1-algebre/chapitres/chapitre1.html') {
      return route.fulfill({ contentType: 'text/html; charset=utf-8', body: html });
    }
    if (address.pathname === '/assets/js/code-lab.js') {
      return route.fulfill({ contentType: 'text/javascript; charset=utf-8', body: asset });
    }
    if (address.pathname === '/api/exercise/submit' || address.pathname === '/api/code-help') {
      sent.push({ url: address.pathname, payload: request.postDataJSON() });
      const response = await api.app.inject({
        method: 'POST',
        url: address.pathname,
        headers: { 'content-type': 'application/json' },
        payload: request.postData()
      });
      return route.fulfill({ status: response.statusCode, contentType: 'application/json', body: response.body });
    }
    return route.abort();
  });
  await page.goto('http://grilles.test/b1-algebre/chapitres/chapitre1.html', { waitUntil: 'load' });
  const lab = page.locator('[data-exercise="al-c1-e1"]');
  const firstAnswer = lab.locator('.lab__case-input').first();
  await firstAnswer.waitFor();
  const answer = 'Réponse personnelle incorrecte.';
  await firstAnswer.fill(answer);
  assert.doesNotMatch(await lab.locator('.lab__sample').innerText(), /Résolution attendue/);
  const submitted = page.waitForResponse(response => response.url().endsWith('/api/exercise/submit'));
  await lab.locator('[data-lab-submit]').click();
  const report = await (await submitted).json();
  assert.equal(report.stop.reason, 'wrong_output');
  assert.equal(report.stop.actual, answer);
  assert.equal(Object.hasOwn(report.stop, 'expected'), false);
  const result = lab.getByRole('region', { name: 'Résultat de la correction' });
  await result.waitFor({ state: 'visible' });
  assert.match(await result.innerText(), /Réponse personnelle incorrecte/);
  assert.doesNotMatch(await result.innerText(), /Sortie attendue/);

  const explained = page.waitForResponse(response => response.url().endsWith('/api/code-help'));
  await lab.locator('[data-lab-report-help]').click();
  assert.equal((await explained).status(), 200);
  const tutorRequest = sent.find(entry => entry.url === '/api/code-help');
  assert.equal(tutorRequest.payload.expected, '');
  assert.equal(tutorRequest.payload.actual, answer);

  const exercise = catalogue.getExercise('al-c1-e1');
  const inputs = lab.locator('.lab__case-input');
  assert.equal(await inputs.count(), exercise.tests.length);
  for (const [index, entry] of exercise.tests.entries()) {
    const submittedAnswer = await localRunner.runAnalyse(exercise.solution, entry.stdin);
    await inputs.nth(index).fill(submittedAnswer.data.stdout);
  }
  const resubmitted = page.waitForResponse(response => response.url().endsWith('/api/exercise/submit'));
  await lab.locator('[data-lab-submit]').click();
  const success = await (await resubmitted).json();
  assert.equal(success.passed, exercise.tests.length);
  assert.equal(success.total, exercise.tests.length);
  assert.equal(success.stop, null);
  assert.ok(success.results.every(entry => entry.ok));
  assert.deepEqual(errors, []);
  testContext.diagnostic('Chromium : entrée d’exemple conservée, échec et succès vérifiés, tuteur appelé sans attendu. HTML expurgé en mémoire seulement.');
});
