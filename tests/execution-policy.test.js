'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const Fastify = require('fastify');
const cookie = require('@fastify/cookie');
const jwt = require('jsonwebtoken');
const execution = require('../server/services/execution');
const languages = require('../server/services/execution/languages');
const localRunner = require('../server/services/execution/local-runner');
const budget = require('../server/services/execution/budget');
const exercises = require('../server/exercises');
const executeRoutes = require('../server/routes/execute');
const exerciseRoutes = require('../server/routes/exercises');

const executableLanguages = languages.listLanguages()
  .map(language => language.id)
  .filter(language => language !== 'analyse');
const unavailableMessage = 'Le moteur d’exécution est temporairement indisponible.';
const successResponse = {
  ok: true,
  httpStatus: 200,
  data: { stdout: 'résultat distant\n', stderr: '', exit_code: 0 }
};

function preserveEnvironment(context, name) {
  const original = process.env[name];
  context.after(() => {
    if (original === undefined) delete process.env[name];
    else process.env[name] = original;
  });
}

function providerMocks(context, trapLocal = true) {
  const state = {
    pistonConfigured: false,
    oanorConfigured: false,
    pistonResponse: successResponse,
    oanorResponse: successResponse,
    pistonCalls: [],
    oanorCalls: [],
    localCalls: 0
  };
  context.mock.method(execution.piston, 'isConfigured', () => state.pistonConfigured);
  context.mock.method(execution.oanor, 'isConfigured', () => state.oanorConfigured);
  context.mock.method(execution.piston, 'run', async payload => {
    state.pistonCalls.push(payload);
    if (state.pistonResponse instanceof Error) throw state.pistonResponse;
    return state.pistonResponse;
  });
  context.mock.method(execution.oanor, 'run', async payload => {
    state.oanorCalls.push(payload);
    if (state.oanorResponse instanceof Error) throw state.oanorResponse;
    return state.oanorResponse;
  });
  if (trapLocal) {
    context.mock.method(localRunner, 'run', async () => {
      state.localCalls += 1;
      throw new Error('Le moteur local ne doit pas être appelé.');
    });
  }
  return state;
}

function payloadFor(language, code = 'programme pédagogique') {
  return { language, code, stdin: '', allowLocal: true };
}

function assertNoLocalCalls(state) {
  assert.equal(state.localCalls, 0, 'aucun appel au moteur local');
}

function assertSandbox() {
  assert.equal(process.env.HOME, undefined, 'HOME doit être absent');
  assert.equal(fs.readFileSync('/proc/1/comm', 'utf8').trim(), 'bwrap');
  assert.match(process.env.F39_HOST_NET_NS || '', /^net:\[\d+\]$/);
  assert.notEqual(fs.readlinkSync('/proc/self/ns/net'), process.env.F39_HOST_NET_NS);
  const routes = fs.readFileSync('/proc/net/route', 'utf8').trim().split('\n').slice(1);
  assert.equal(routes.length, 0, 'le namespace réseau ne doit avoir aucune route');
}

test('sans fournisseur : aucun langage ne peut activer le repli local', async context => {
  preserveEnvironment(context, 'ALLOW_LOCAL_EXECUTION_FALLBACK');
  const state = providerMocks(context);

  for (const environmentFlag of [undefined, 'true']) {
    if (environmentFlag === undefined) delete process.env.ALLOW_LOCAL_EXECUTION_FALLBACK;
    else process.env.ALLOW_LOCAL_EXECUTION_FALLBACK = environmentFlag;
    for (const allowLocal of [false, true]) {
      for (const language of executableLanguages) {
        await assert.rejects(
          execution.execute(payloadFor(language), { allowLocal }),
          error => error.code === 'not_configured' && error.userMessage === unavailableMessage,
          `${language}, allowLocal=${allowLocal}, variable=${environmentFlag}`
        );
      }
    }
  }

  assertNoLocalCalls(state);
  assert.equal(state.pistonCalls.length, 0);
  assert.equal(state.oanorCalls.length, 0);
});

test('Piston reste prioritaire pour tous les langages même avec les deux drapeaux', async context => {
  preserveEnvironment(context, 'ALLOW_LOCAL_EXECUTION_FALLBACK');
  process.env.ALLOW_LOCAL_EXECUTION_FALLBACK = 'true';
  const state = providerMocks(context);
  state.pistonConfigured = true;
  state.oanorConfigured = true;

  for (const language of executableLanguages) {
    const result = await execution.execute(payloadFor(language), { allowLocal: true });
    assert.equal(result.provider, 'piston', language);
    assert.equal(result.status, 'success', language);
    assert.equal(result.stdout, 'résultat distant\n', language);
  }

  assert.deepEqual(state.pistonCalls.map(payload => payload.languageId), executableLanguages);
  assert.equal(state.oanorCalls.length, 0);
  assertNoLocalCalls(state);
});

test('Oanor est utilisé lorsque Piston est absent, même avec les deux drapeaux', async context => {
  preserveEnvironment(context, 'ALLOW_LOCAL_EXECUTION_FALLBACK');
  process.env.ALLOW_LOCAL_EXECUTION_FALLBACK = 'true';
  const state = providerMocks(context);
  state.oanorConfigured = true;

  for (const language of executableLanguages) {
    const result = await execution.execute(payloadFor(language), { allowLocal: true });
    assert.equal(result.provider, 'oanor', language);
    assert.equal(result.status, 'success', language);
    assert.equal(result.stdout, 'résultat distant\n', language);
  }

  assert.deepEqual(state.oanorCalls.map(payload => payload.languageId), executableLanguages);
  assert.equal(state.pistonCalls.length, 0);
  assertNoLocalCalls(state);
});

test('erreurs HTTP des fournisseurs : statuts conservés sans repli local', async context => {
  preserveEnvironment(context, 'ALLOW_LOCAL_EXECUTION_FALLBACK');
  process.env.ALLOW_LOCAL_EXECUTION_FALLBACK = 'true';
  const state = providerMocks(context);

  for (const provider of ['piston', 'oanor']) {
    state.pistonConfigured = provider === 'piston';
    state.oanorConfigured = true;
    for (const [httpStatus, expectedStatus] of [[429, 'rate_limited'], [503, 'api_error']]) {
      state[`${provider}Response`] = {
        ok: false,
        httpStatus,
        data: { message: 'Refus du fournisseur de test.' },
        raw: ''
      };
      for (const language of executableLanguages) {
        const result = await execution.execute(payloadFor(language), { allowLocal: true });
        assert.equal(result.provider, provider, language);
        assert.equal(result.ok, false, language);
        assert.equal(result.status, expectedStatus, language);
        assert.equal(result.httpStatus, httpStatus, language);
        assert.equal(result.userMessage, 'Refus du fournisseur de test.', language);
      }
    }
  }

  assert.equal(state.pistonCalls.length, executableLanguages.length * 2);
  assert.equal(state.oanorCalls.length, executableLanguages.length * 2);
  assertNoLocalCalls(state);
});

test('erreurs de transport : timeout et indisponibilité sont conservés', async context => {
  preserveEnvironment(context, 'ALLOW_LOCAL_EXECUTION_FALLBACK');
  process.env.ALLOW_LOCAL_EXECUTION_FALLBACK = 'true';
  const state = providerMocks(context);

  for (const provider of ['piston', 'oanor']) {
    state.pistonConfigured = provider === 'piston';
    state.oanorConfigured = true;
    for (const [code, statusCode] of [['timeout', 504], ['upstream_unreachable', 502]]) {
      const providerError = new execution[provider].ExecutionError(code, 'Détail interne', {
        userMessage: 'Message sûr du fournisseur.'
      });
      state[`${provider}Response`] = providerError;
      for (const language of executableLanguages) {
        await assert.rejects(
          execution.execute(payloadFor(language), { allowLocal: true }),
          error => error === providerError,
          `${provider}, ${language}, ${code}`
        );
      }
      assert.deepEqual(execution.errorToHttp(providerError), {
        statusCode,
        code,
        message: 'Message sûr du fournisseur.'
      });
    }
  }

  assert.equal(state.pistonCalls.length, executableLanguages.length * 2);
  assert.equal(state.oanorCalls.length, executableLanguages.length * 2);
  assertNoLocalCalls(state);
});

test('API directes du moteur local : tous les interpréteurs refusent de lancer du code', async () => {
  const entrypoints = [
    ['python', 'runPython'],
    ['javascript', 'runJavaScript'],
    ['sql', 'runSql'],
    ['algo', 'runPseudoCode']
  ];
  for (const [language, method] of entrypoints) {
    assert.equal(localRunner.canHandle(language), false, language);
    const dispatched = await localRunner.run(payloadFor(language));
    assert.equal(dispatched.ok, false, language);
    assert.equal(dispatched.httpStatus, 503, language);
    const direct = await localRunner[method]('texte de test', '');
    assert.equal(direct.ok, false, method);
    assert.equal(direct.httpStatus, 503, method);
  }
  for (const alias of ['py', 'js', 'pseudo-code', 'pseudocode']) {
    assert.equal(localRunner.canHandle(alias), false, alias);
    const result = await localRunner.run(payloadFor(alias));
    assert.equal(result.ok, false, alias);
    assert.equal(result.httpStatus, 503, alias);
  }
});

test('analyse reste une sélection de texte, sans interpréter la réponse', async context => {
  const state = providerMocks(context, false);
  const code = '[Cas 1]\nconsole.log("texte non exécuté")\n[Cas 2]\nRéponse structurée';
  const result = await execution.execute({ language: 'analyse', code, stdin: 'cas:1' });
  assert.equal(result.ok, true);
  assert.equal(result.provider, 'local');
  assert.equal(result.stdout, 'console.log("texte non exécuté")');
  assert.equal(state.pistonCalls.length, 0);
  assert.equal(state.oanorCalls.length, 0);
});

test('catalogue statique : son repli ne lance aucun code', async context => {
  const state = providerMocks(context);
  const catalogue = await execution.getLanguages(true);
  assert.equal(catalogue.source, 'fallback');
  assert.ok(catalogue.languages.some(language => language.id === 'python'));
  assert.ok(catalogue.languages.some(language => language.id === 'javascript'));
  assert.ok(catalogue.languages.some(language => language.id === 'sql'));
  assertNoLocalCalls(state);
});

test('routes execute et exercise/submit : pas de drapeau local et erreurs conservées', async context => {
  preserveEnvironment(context, 'ALLOW_LOCAL_EXECUTION_FALLBACK');
  preserveEnvironment(context, 'JWT_SECRET');
  process.env.ALLOW_LOCAL_EXECUTION_FALLBACK = 'true';
  process.env.JWT_SECRET = 'cle-factice-pour-test-local';
  const state = providerMocks(context);
  context.mock.method(budget, 'canExecute', () => ({ allowed: true }));
  context.mock.method(budget, 'consume', () => {});
  context.mock.method(budget, 'snapshot', () => ({}));
  context.mock.method(exercises, 'getExercise', () => ({
    course: 'b1-python',
    chapter: 1,
    language: 'python',
    tests: [{ stdin: '', expected: 'résultat distant' }]
  }));
  const calls = [];
  const originalExecute = execution.execute;
  context.mock.method(execution, 'execute', (...args) => {
    calls.push(args);
    return originalExecute(...args);
  });

  const app = Fastify({ logger: false });
  context.after(() => app.close());
  await app.register(cookie);
  await app.register(executeRoutes, { prefix: '/api' });
  await app.register(exerciseRoutes, { prefix: '/api' });
  await app.ready();

  const authToken = jwt.sign({ userId: 'f39-utilisateur' }, process.env.JWT_SECRET);
  const executeRequest = {
    method: 'POST',
    url: '/api/execute',
    headers: { cookie: `auth_token=${authToken}` },
    payload: payloadFor('python', 'print(1)')
  };
  const submitRequest = {
    method: 'POST',
    url: '/api/exercise/submit',
    payload: { exerciseId: 'f39', code: 'print(1)', allowLocal: true }
  };

  const executeUnavailable = await app.inject(executeRequest);
  assert.equal(executeUnavailable.statusCode, 503);
  assert.equal(executeUnavailable.json().code, 'not_configured');
  const submitUnavailable = await app.inject(submitRequest);
  assert.equal(submitUnavailable.statusCode, 503);
  assert.equal(submitUnavailable.json().status, 'api_error');
  assert.ok(calls.every(call => call[1] === undefined), 'les routes ne doivent pas activer allowLocal');

  state.pistonConfigured = true;
  state.pistonResponse = new execution.piston.ExecutionError('timeout', 'Détail interne', {
    userMessage: 'Délai de test dépassé.'
  });
  const executeTimeout = await app.inject(executeRequest);
  assert.equal(executeTimeout.statusCode, 504);
  assert.equal(executeTimeout.json().code, 'timeout');
  const submitTimeout = await app.inject(submitRequest);
  assert.equal(submitTimeout.statusCode, 502);
  assert.equal(submitTimeout.json().error, 'Le service d’exécution a mis trop de temps à répondre. Réessayez.');

  state.pistonResponse = {
    ok: false, httpStatus: 429, data: { message: 'Quota du fournisseur atteint.' }, raw: ''
  };
  const executeRateLimited = await app.inject(executeRequest);
  assert.equal(executeRateLimited.statusCode, 200);
  assert.equal(executeRateLimited.json().status, 'rate_limited');
  assert.equal(executeRateLimited.json().httpStatus, 429);
  const submitRateLimited = await app.inject(submitRequest);
  assert.equal(submitRateLimited.statusCode, 200);
  assert.equal(submitRateLimited.json().stop.reason, 'rate_limited');

  for (const provider of ['piston', 'oanor']) {
    state.pistonConfigured = provider === 'piston';
    state.oanorConfigured = true;
    state[`${provider}Response`] = successResponse;
    const executeSuccess = await app.inject(executeRequest);
    assert.equal(executeSuccess.statusCode, 200);
    assert.equal(executeSuccess.json().provider, provider);
    assert.equal(executeSuccess.json().stdout, 'résultat distant\n');
    const submitSuccess = await app.inject(submitRequest);
    assert.equal(submitSuccess.statusCode, 200);
    assert.equal(submitSuccess.json().passed, 1);
    assert.equal(submitSuccess.json().stop, null);
  }
  assert.ok(calls.every(call => call[1] === undefined), 'les routes ne doivent pas activer allowLocal');
  assertNoLocalCalls(state);
});

const isolatedProbes = process.env.F39_ISOLATED_PROBES === '1';

test('worker historique lancé directement : refus sans exécuter le programme', { skip: !isolatedProbes }, () => {
  assertSandbox();
  const worker = path.join(__dirname, '../server/services/execution/isolated-worker.js');
  const result = spawnSync(process.execPath, [worker], {
    input: JSON.stringify({ language: 'javascript', code: 'console.log("F39_PROGRAMME_EXECUTE")' }),
    encoding: 'utf8',
    timeout: 3000
  });
  assert.equal(result.error, undefined);
  assert.equal(result.status, 1);
  const response = JSON.parse(result.stdout);
  assert.equal(response.ok, false);
  assert.equal(response.httpStatus, 503);
  assert.equal(response.data.stdout, '');
});

test('le moteur SQL du banc reste disponible uniquement dans le confinement d’audit', { skip: !isolatedProbes }, () => {
  assertSandbox();
  const worker = path.join(__dirname, '../corrections/outils/sondes/sql-audit-worker.js');
  const result = spawnSync(process.execPath, [worker], {
    input: JSON.stringify({ code: 'SELECT 42 AS resultat;', stdin: '' }),
    encoding: 'utf8', timeout: 8000, maxBuffer: 256 * 1024
  });
  assert.equal(result.error, undefined);
  assert.equal(result.status, 0, result.stderr);
  const response = JSON.parse(result.stdout);
  assert.equal(response.ok, true);
  assert.equal(response.data.exit_code, 0);
  assert.match(response.data.stdout, /42/);
});

test('sondes hostiles : aucun fournisseur absent ou défaillant ne lance le code', { skip: !isolatedProbes }, async context => {
  assertSandbox();
  preserveEnvironment(context, 'ALLOW_LOCAL_EXECUTION_FALLBACK');
  process.env.ALLOW_LOCAL_EXECUTION_FALLBACK = 'true';
  const state = providerMocks(context, false);
  const probes = [
    ['boucle Python', 'python', 'while True:\n    pass'],
    ['boucle JavaScript', 'javascript', 'while (true) {}'],
    ['sortie Python', 'python', 'print("X" * 10000000)'],
    ['sortie JavaScript', 'javascript', 'console.log("X".repeat(10000000))'],
    ['fichier Python', 'python', 'open("/tmp/f39-probe-python", "w").write("executé")'],
    ['fichier JavaScript', 'javascript', 'require("node:fs").writeFileSync("/tmp/f39-probe-js", "executé")'],
    ['fichier SQL', 'sql', 'ATTACH DATABASE "/tmp/f39-probe-sql" AS probe;'],
    ['réseau Python', 'python', 'import urllib.request\nurllib.request.urlopen("http://127.0.0.1:9")'],
    ['réseau JavaScript', 'javascript', 'fetch("http://127.0.0.1:9")'],
    ['requête récursive SQL', 'sql', 'WITH RECURSIVE x(n) AS (SELECT 1 UNION ALL SELECT n+1 FROM x) SELECT sum(n) FROM x;']
  ];

  for (const scenario of ['absent', 'piston-http', 'piston-transport', 'oanor-http', 'oanor-transport']) {
    state.pistonConfigured = scenario.startsWith('piston');
    state.oanorConfigured = scenario.startsWith('oanor');
    if (scenario.endsWith('http')) {
      state[scenario.startsWith('piston') ? 'pistonResponse' : 'oanorResponse'] = {
        ok: false, httpStatus: 503, data: {}, raw: ''
      };
    }
    if (scenario.endsWith('transport')) {
      const provider = scenario.startsWith('piston') ? 'piston' : 'oanor';
      state[`${provider}Response`] = new execution[provider].ExecutionError('upstream_unreachable', 'Panne de test');
    }
    for (const [label, language, code] of probes) {
      if (scenario.endsWith('http')) {
        const result = await execution.execute(payloadFor(language, code), { allowLocal: true });
        assert.equal(result.status, 'api_error', `${scenario} : ${label}`);
        assert.equal(result.httpStatus, 503, `${scenario} : ${label}`);
      } else {
        const expectedCode = scenario === 'absent' ? 'not_configured' : 'upstream_unreachable';
        await assert.rejects(
          execution.execute(payloadFor(language, code), { allowLocal: true }),
          error => error.code === expectedCode,
          `${scenario} : ${label}`
        );
      }
    }
  }

  for (const file of ['/tmp/f39-probe-python', '/tmp/f39-probe-js', '/tmp/f39-probe-sql']) {
    assert.equal(fs.existsSync(file), false, file);
  }
});
