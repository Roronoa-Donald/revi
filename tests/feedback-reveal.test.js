'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const fastify = require('fastify');
const jwt = require('jsonwebtoken');

const execution = require('../server/services/execution');
const budget = require('../server/services/execution/budget');
const exercises = require('../server/exercises');
const gradingPolicy = require('../server/exercises/grading-policy');
const aiPool = require('../server/services/ai-pool');
const exerciseRoutes = require('../server/routes/exercises');

const ROOT = path.resolve(__dirname, '..');

function buildFixture(overrides = {}) {
  return {
    id: 'lot2c-c1-e1',
    course: 'b1-python',
    chapter: 1,
    level: 'n1',
    language: 'python',
    title: 'Somme et signe',
    goal: 'Calculer la somme de deux entiers lus sur stdin.',
    brief: '<p>Lisez deux entiers et affichez leur somme.</p>',
    starter: 'a = int(input())\nb = int(input())\n# À compléter\n',
    hints: ['Additionnez a et b puis affichez le résultat.'],
    examples: [{ stdin: '2\n3', expected: '5', note: '2 + 3 = 5' }],
    tests: [
      { label: 'TEST_PRIVE_1', stdin: '10\n20', expected: '30' },
      { label: 'TEST_PRIVE_2', stdin: '-5\n5', expected: '0' }
    ],
    solution: 'a = int(input())\nb = int(input())\nprint(a + b)\n',
    ...overrides
  };
}

async function setupServer(t, { fixture, executeMock, chatMock } = {}) {
  const originalGetExercise = exercises.getExercise;
  const originalExecute = execution.execute;
  const originalIsSuspended = gradingPolicy.isGradingSuspended;
  const originalChat = aiPool.chatCompletion;
  const originalJwt = process.env.JWT_SECRET;

  process.env.JWT_SECRET = 'lot2c-test-secret';
  budget.reset();
  if (typeof exerciseRoutes._resetAttempts === 'function') {
    exerciseRoutes._resetAttempts();
  }
  gradingPolicy.isGradingSuspended = () => false;

  if (fixture) {
    exercises.getExercise = id => (id === fixture.id ? fixture : originalGetExercise(id));
  }
  if (executeMock) {
    execution.execute = executeMock;
  }
  if (chatMock) {
    aiPool.chatCompletion = chatMock;
  }

  const app = fastify({ logger: false });
  app.register(require('@fastify/cookie'));
  app.register(require('@fastify/rate-limit'), { max: 200, timeWindow: '1 minute' });
  app.register(exerciseRoutes, { prefix: '/api' });

  t.after(async () => {
    await app.close();
    exercises.getExercise = originalGetExercise;
    execution.execute = originalExecute;
    gradingPolicy.isGradingSuspended = originalIsSuspended;
    aiPool.chatCompletion = originalChat;
    if (originalJwt === undefined) delete process.env.JWT_SECRET;
    else process.env.JWT_SECRET = originalJwt;
    budget.reset();
    if (typeof exerciseRoutes._resetAttempts === 'function') {
      exerciseRoutes._resetAttempts();
    }
  });

  return app;
}

// ============================================================================
// 1. Routage local de `algo` / `pseudocode` dans server/services/execution/index.js
// ============================================================================

test('Lot 2C (Exécution) : algo s’exécute localement sans PISTON_URL ni OANOR_API_KEY', async t => {
  const prevPiston = process.env.PISTON_URL;
  const prevOanor = process.env.OANOR_API_KEY;
  delete process.env.PISTON_URL;
  delete process.env.OANOR_API_KEY;
  t.after(() => {
    if (prevPiston === undefined) delete process.env.PISTON_URL;
    else process.env.PISTON_URL = prevPiston;
    if (prevOanor === undefined) delete process.env.OANOR_API_KEY;
    else process.env.OANOR_API_KEY = prevOanor;
  });

  const okRes = await execution.execute({
    language: 'algo',
    code: 'Algorithme Double\nVariable n : Entier\nDebut\n  Lire(n)\n  Afficher(n * 2)\nFin',
    stdin: '21'
  });
  assert.equal(okRes.provider, 'local');
  assert.equal(okRes.ok, true);
  assert.equal(okRes.status, 'success');
  assert.equal(okRes.stdout.trim(), '42');

  const syntaxRes = await execution.execute({
    language: 'algo',
    code: 'Algorithme Casse\nDebut\n  Si x > 0 Alors\n    Afficher(x)\nFin',
    stdin: ''
  });
  assert.equal(syntaxRes.provider, 'local');
  assert.equal(syntaxRes.ok, false);
  assert.equal(syntaxRes.status, 'compile_error');
  assert.ok(syntaxRes.compileError.length > 0);

  const runtimeRes = await execution.execute({
    language: 'algo',
    code: 'Debut\n  i <- 1\n  TantQue i > 0 Faire\n    i <- i + 1\n  FinTantQue\nFin',
    stdin: ''
  });
  assert.equal(runtimeRes.provider, 'local');
  assert.equal(runtimeRes.ok, false);
  assert.equal(runtimeRes.status, 'runtime_error');
  assert.ok(runtimeRes.stderr.length > 0);
});

// ============================================================================
// 2. Tuteur /api/code-help sans court-circuit générique pour analyse
// ============================================================================

test('Lot 2C (Tuteur IA) : /api/code-help utilise aiHelp.buildMessages pour analyse sans fuite d’attendu', async t => {
  const fixture = buildFixture({
    id: 'lot2c-analyse-1',
    course: 'RD-RO',
    language: 'analyse',
    title: 'Routage simplexe',
    goal: 'Identifier la contrainte saturée.',
    tests: [
      { label: 'Cas 1', stdin: 'cas:1', expected: 'ATTENDU_CONFIDENTIEL_ANALYSE_1' },
      { label: 'Cas 2', stdin: 'cas:2', expected: 'ATTENDU_CONFIDENTIEL_ANALYSE_2' }
    ],
    solution: 'ATTENDU_CONFIDENTIEL_ANALYSE_1\nATTENDU_CONFIDENTIEL_ANALYSE_2',
    takeaway: 'Toujours vérifier la saturation exacte.'
  });

  let capturedMessages = null;
  const app = await setupServer(t, {
    fixture,
    chatMock: async req => {
      capturedMessages = req.messages;
      return {
        data: {
          choices: [{
            message: {
              content: '**Ce qui bloque :**\nVotre calcul de marge oublie le coefficient.\n\n**Pourquoi :**\nLa contrainte R1 consomme 2 par unité.\n\n**Pistes pour corriger :**\n- Recalculez 2 * x1.\n- Comparez au plafond.'
            }
          }]
        }
      };
    }
  });

  const res = await app.inject({
    method: 'POST',
    url: '/api/code-help',
    payload: {
      exerciseId: fixture.id,
      code: '# Format REVI-ANALYSE:1\n[Cas 1 — Saturation]\nMA_REPONSE_ETUDIANT',
      actual: 'MA_REPONSE_ETUDIANT',
      expected: 'TENTATIVE_INJECTION_ATTENDU',
      status: 'wrong_output',
      failingCaseLabel: 'Cas 1 — Saturation',
      question: 'Pourquoi ma marge est fausse ?'
    }
  });

  assert.equal(res.statusCode, 200);
  const body = res.json();
  assert.match(body.explanation, /coefficient/);
  assert.doesNotMatch(body.explanation, /Relisez l’énoncé et les données du cas/);
  assert.ok(Array.isArray(capturedMessages) && capturedMessages.length === 2);

  const promptUser = capturedMessages[1].content;
  assert.match(promptUser, /Routage simplexe/);
  assert.match(promptUser, /MA_REPONSE_ETUDIANT/);
  assert.match(promptUser, /Cas 1 — Saturation/);
  assert.match(promptUser, /Pourquoi ma marge est fausse/);
  assert.doesNotMatch(promptUser, /ATTENDU_CONFIDENTIEL_ANALYSE/);
  assert.doesNotMatch(promptUser, /TENTATIVE_INJECTION_ATTENDU/);
  assert.match(promptUser, /attendu.{0,35}(non transmis|non communiqué|masqué)/i);
});

// ============================================================================
// 3. Vrai diff pédagogique dans publicFeedback() (/api/exercise/submit)
// ============================================================================

test('Lot 2C (Diff) : exemple visible et erreurs de compilation/exécution renvoient input/expected/actual tronqués', async t => {
  const longOutput = 'X'.repeat(700);
  const fixture = buildFixture({
    id: 'lot2c-diff-ex',
    verifyFirstExample: true,
    examples: [{ stdin: 'EX_IN', expected: 'EX_OUT_' + 'Y'.repeat(600) }],
    tests: [
      { label: 'C1', stdin: 'H_IN_1', expected: 'H_OUT_1' },
      { label: 'C2', stdin: 'H_IN_2', expected: 'H_OUT_2' }
    ]
  });

  let mode = 'wrong_example';
  const app = await setupServer(t, {
    fixture,
    executeMock: async ({ stdin }) => {
      if (mode === 'compile_error') {
        return {
          ok: false,
          status: 'compile_error',
          stdout: '',
          stderr: '',
          compileError: 'SyntaxError: ligne 3 ' + 'E'.repeat(600),
          exitCode: 1
        };
      }
      if (mode === 'runtime_error') {
        return {
          ok: false,
          status: 'runtime_error',
          stdout: 'avant crash',
          stderr: 'ZeroDivisionError: division by zero',
          compileError: '',
          exitCode: 1
        };
      }
      if (stdin === 'H_IN_1') return { ok: true, status: 'success', stdout: 'H_OUT_1' };
      if (stdin === 'H_IN_2') return { ok: true, status: 'success', stdout: 'H_OUT_2' };
      return { ok: true, status: 'success', stdout: longOutput };
    }
  });

  // 1) Échec sur exemple visible
  const exRes = await app.inject({
    method: 'POST',
    url: '/api/exercise/submit',
    remoteAddress: '10.90.1.1',
    payload: { exerciseId: fixture.id, code: 'print(1)' }
  });
  assert.equal(exRes.statusCode, 200);
  const exBody = exRes.json();
  assert.equal(exBody.stop.example, true);
  assert.equal(exBody.stop.reason, 'wrong_output');
  assert.equal(exBody.stop.input, 'EX_IN');
  assert.ok(exBody.stop.expected.startsWith('EX_OUT_'));
  assert.ok(exBody.stop.expected.length <= 505);
  assert.ok(exBody.stop.actual.startsWith('XXXXX'));
  assert.ok(exBody.stop.actual.length <= 505);

  // 2) Erreur de compilation
  mode = 'compile_error';
  const compRes = await app.inject({
    method: 'POST',
    url: '/api/exercise/submit',
    remoteAddress: '10.90.1.2',
    payload: { exerciseId: fixture.id, code: 'def :' }
  });
  assert.equal(compRes.statusCode, 200);
  const compBody = compRes.json();
  assert.equal(compBody.stop.reason, 'compile_error');
  assert.ok(compBody.stop.compileError.includes('SyntaxError'));
  assert.ok(compBody.stop.compileError.length <= 505);

  // 3) Erreur d'exécution
  mode = 'runtime_error';
  const runRes = await app.inject({
    method: 'POST',
    url: '/api/exercise/submit',
    remoteAddress: '10.90.1.3',
    payload: { exerciseId: fixture.id, code: '1/0' }
  });
  assert.equal(runRes.statusCode, 200);
  const runBody = runRes.json();
  assert.equal(runBody.stop.reason, 'runtime_error');
  assert.ok(runBody.stop.stderr.includes('ZeroDivisionError'));
  assert.equal(runBody.stop.exitCode, 1);
});

test('Lot 2C (Diff caché) : diagnostic par catégorie ou hint sans jamais fuiter expected ni stdin caché', async t => {
  const cases = [
    {
      name: 'format / espaces',
      stdin: 'ALPHA_IN',
      expected: 'bonjour monde',
      actual: 'bonjour   monde\n\n',
      expectPattern: /format|espace|saut de ligne/i
    },
    {
      name: 'ordre ou casse',
      stdin: 'BETA_IN',
      expected: 'Bonjour',
      actual: 'bonjour',
      expectPattern: /ordre|casse/i
    },
    {
      name: 'cas limite négatif ou nul',
      stdin: '-5\n0',
      expected: 'INVALIDE',
      actual: '-5',
      expectPattern: /limite|négatif|nul|vide/i
    },
    {
      name: 'valeur numérique différente',
      stdin: '12\n8',
      expected: '20',
      actual: '24',
      expectPattern: /numérique/i
    },
    {
      name: 'hint explicite du test',
      stdin: 'GAMMA_IN',
      expected: 'ATTENDU_SECRET_99',
      actual: 'MAUVAISE_SORTIE',
      hint: 'Pensez à trier le tableau avant de retourner la médiane.',
      expectPattern: /médiane/i
    }
  ];

  for (const [idx, c] of cases.entries()) {
    const fixture = buildFixture({
      id: `lot2c-cat-${idx}`,
      tests: [
        { label: 'SECRET_LABEL_A', stdin: c.stdin, expected: c.expected, ...(c.hint ? { hint: c.hint } : {}) },
        { label: 'SECRET_LABEL_B', stdin: 'OTHER_IN', expected: 'OTHER_OUT' }
      ]
    });

    const app = await setupServer(t, {
      fixture,
      executeMock: async () => ({ ok: true, status: 'success', stdout: c.actual, stderr: '', exitCode: 0 })
    });

    const res = await app.inject({
      method: 'POST',
      url: '/api/exercise/submit',
      remoteAddress: `10.91.0.${idx + 1}`,
      payload: { exerciseId: fixture.id, code: 'print(0)' }
    });
    assert.equal(res.statusCode, 200, c.name);
    const body = res.json();
    assert.equal(body.stop.hidden, true, c.name);
    assert.equal(Object.hasOwn(body.stop, 'expected'), false, `${c.name} ne doit jamais exposer expected`);
    assert.equal(Object.hasOwn(body.stop, 'input'), false, `${c.name} ne doit jamais exposer input`);
    assert.doesNotMatch(JSON.stringify(body), /SECRET_LABEL_A|ATTENDU_SECRET_99|ALPHA_IN|BETA_IN|GAMMA_IN/);

    const diagText = [body.stop.hint, body.stop.category, body.stop.userMessage].filter(Boolean).join(' ');
    assert.match(diagText, c.expectPattern, `${c.name} : diagnostic reçu = "${diagText}"`);
  }

  // Anti-exfiltration : si stdout répète stdin caché, actual est masqué
  const echoFixture = buildFixture({
    id: 'lot2c-echo-secret',
    tests: [
      { label: 'SECRET', stdin: 'ENTREE_SECRETE_XYZ', expected: 'SORTIE_ATTENDUE_XYZ' },
      { label: 'SECRET2', stdin: 'ENTREE_2', expected: 'SORTIE_2' }
    ]
  });
  const echoApp = await setupServer(t, {
    fixture: echoFixture,
    executeMock: async ({ stdin }) => ({ ok: true, status: 'success', stdout: `echo:${stdin}` })
  });
  const echoRes = await echoApp.inject({
    method: 'POST',
    url: '/api/exercise/submit',
    remoteAddress: '10.91.0.99',
    payload: { exerciseId: echoFixture.id, code: 'print(input())' }
  });
  assert.doesNotMatch(JSON.stringify(echoRes.json()), /ENTREE_SECRETE_XYZ/);
});

// ============================================================================
// 4. toClient() + buildTakeaway() + POST /api/exercise/reveal
// ============================================================================

test('Lot 2C (Projection & Reveal) : toClient sans fuite et POST /api/exercise/reveal sécurisé', async t => {
  const fixtureWithTakeaway = buildFixture({
    id: 'lot2c-rev-1',
    takeaway: 'À retenir : convertir les entrées avec int() avant d’additionner.'
  });
  const clientView = exercises.toClient(fixtureWithTakeaway);
  assert.equal(clientView.tests, undefined);
  assert.equal(clientView.solution, undefined);
  assert.equal(clientView.takeaway, undefined);

  const fixtureWithoutTakeaway = buildFixture({ id: 'lot2c-rev-2', chapter: 2 });
  delete fixtureWithoutTakeaway.takeaway;
  assert.equal(typeof exercises.buildTakeaway, 'function');
  const generatedTakeaway = exercises.buildTakeaway(fixtureWithoutTakeaway);
  assert.ok(typeof generatedTakeaway === 'string' && generatedTakeaway.length > 20);
  assert.doesNotMatch(generatedTakeaway, /TEST_PRIVE_1/);

  // Chapitre 2 exige l'authentification sur /reveal
  const appCh2 = await setupServer(t, { fixture: fixtureWithoutTakeaway });
  const unauth = await appCh2.inject({
    method: 'POST',
    url: '/api/exercise/reveal',
    payload: { exerciseId: fixtureWithoutTakeaway.id }
  });
  assert.equal(unauth.statusCode, 401);

  // Chapitre 1 anonyme : bloqué avant 3 échecs ou réussite
  let shouldPass = false;
  let simulateProviderDown = false;
  let idx = 0;
  const app = await setupServer(t, {
    fixture: fixtureWithTakeaway,
    executeMock: async () => {
      if (simulateProviderDown) {
        const err = new Error('down');
        err.code = 'upstream_unreachable';
        throw err;
      }
      if (shouldPass) {
        return { ok: true, status: 'success', stdout: fixtureWithTakeaway.tests[idx++ % 2].expected };
      }
      return { ok: true, status: 'success', stdout: 'MAUVAIS' };
    }
  });

  // 0 essai -> 403, attemptsRemaining = 3
  const r0 = await app.inject({
    method: 'POST',
    url: '/api/exercise/reveal',
    remoteAddress: '10.92.0.10',
    payload: { exerciseId: fixtureWithTakeaway.id }
  });
  assert.equal(r0.statusCode, 403);
  assert.equal(r0.json().attemptsRemaining, 3);
  assert.equal(r0.json().solution, undefined);

  // Panne fournisseur -> ne compte pas comme un échec étudiant
  simulateProviderDown = true;
  const downRes = await app.inject({
    method: 'POST',
    url: '/api/exercise/submit',
    remoteAddress: '10.92.0.10',
    payload: { exerciseId: fixtureWithTakeaway.id, code: 'print(1)' }
  });
  assert.equal(downRes.statusCode, 502);
  simulateProviderDown = false;

  const rAfterDown = await app.inject({
    method: 'POST',
    url: '/api/exercise/reveal',
    remoteAddress: '10.92.0.10',
    payload: { exerciseId: fixtureWithTakeaway.id }
  });
  assert.equal(rAfterDown.statusCode, 403);
  assert.equal(rAfterDown.json().attemptsRemaining, 3);

  // 1er échec -> 403, attemptsRemaining = 2
  await app.inject({
    method: 'POST',
    url: '/api/exercise/submit',
    remoteAddress: '10.92.0.10',
    payload: { exerciseId: fixtureWithTakeaway.id, code: 'print(1)' }
  });
  const r1 = await app.inject({
    method: 'POST',
    url: '/api/exercise/reveal',
    remoteAddress: '10.92.0.10',
    payload: { exerciseId: fixtureWithTakeaway.id }
  });
  assert.equal(r1.statusCode, 403);
  assert.equal(r1.json().attemptsRemaining, 2);

  // 2e échec -> 403, attemptsRemaining = 1
  await app.inject({
    method: 'POST',
    url: '/api/exercise/submit',
    remoteAddress: '10.92.0.10',
    payload: { exerciseId: fixtureWithTakeaway.id, code: 'print(2)' }
  });
  const r2 = await app.inject({
    method: 'POST',
    url: '/api/exercise/reveal',
    remoteAddress: '10.92.0.10',
    payload: { exerciseId: fixtureWithTakeaway.id }
  });
  assert.equal(r2.statusCode, 403);
  assert.equal(r2.json().attemptsRemaining, 1);

  // 3e échec -> débloqué (200)
  await app.inject({
    method: 'POST',
    url: '/api/exercise/submit',
    remoteAddress: '10.92.0.10',
    payload: { exerciseId: fixtureWithTakeaway.id, code: 'print(3)' }
  });
  const r3 = await app.inject({
    method: 'POST',
    url: '/api/exercise/reveal',
    remoteAddress: '10.92.0.10',
    payload: { exerciseId: fixtureWithTakeaway.id }
  });
  assert.equal(r3.statusCode, 200);
  const body3 = r3.json();
  assert.equal(body3.exerciseId, fixtureWithTakeaway.id);
  assert.equal(body3.solution, fixtureWithTakeaway.solution);
  assert.equal(body3.takeaway, fixtureWithTakeaway.takeaway);
  assert.equal(body3.tests, undefined);

  // Un autre utilisateur / IP reste verrouillé, puis débloque immédiatement dès réussite (1er essai)
  const rOtherLocked = await app.inject({
    method: 'POST',
    url: '/api/exercise/reveal',
    remoteAddress: '10.92.0.20',
    payload: { exerciseId: fixtureWithTakeaway.id }
  });
  assert.equal(rOtherLocked.statusCode, 403);
  assert.equal(rOtherLocked.json().attemptsRemaining, 3);

  shouldPass = true;
  const passSubmit = await app.inject({
    method: 'POST',
    url: '/api/exercise/submit',
    remoteAddress: '10.92.0.20',
    payload: { exerciseId: fixtureWithTakeaway.id, code: fixtureWithTakeaway.solution }
  });
  assert.equal(passSubmit.statusCode, 200);
  assert.equal(passSubmit.json().passed, 2);

  const rSolved = await app.inject({
    method: 'POST',
    url: '/api/exercise/reveal',
    remoteAddress: '10.92.0.20',
    payload: { exerciseId: fixtureWithTakeaway.id }
  });
  assert.equal(rSolved.statusCode, 200);
  assert.equal(rSolved.json().solution, fixtureWithTakeaway.solution);
  assert.equal(rSolved.json().tests, undefined);
});

// ============================================================================
// 5. UI Diff, Corrigé commenté & PseudoCodeEngine dans code-lab.js / code-lab.css
// ============================================================================

test('Lot 2C (UI & CSS) : panneau reveal, diff visuel, PseudoCodeEngine et 0 emoji', () => {
  const js = fs.readFileSync(path.join(ROOT, 'assets/js/code-lab.js'), 'utf8');
  const css = fs.readFileSync(path.join(ROOT, 'assets/css/code-lab.css'), 'utf8');

  assert.match(js, /lab__reveal-btn/);
  assert.match(js, /lab__reveal-panel/);
  assert.match(js, /\/api\/exercise\/reveal/);
  assert.match(js, /Sortie attendue/);
  assert.match(js, /Votre sortie/);
  assert.match(js, /PseudoCodeEngine/);

  assert.match(css, /\.lab__reveal-btn/);
  assert.match(css, /\.lab__reveal-panel/);

  const emojiRe = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u;
  assert.equal(emojiRe.test(js), false, 'code-lab.js ne doit contenir aucun emoji');
  assert.equal(emojiRe.test(css), false, 'code-lab.css ne doit contenir aucun emoji');
});
