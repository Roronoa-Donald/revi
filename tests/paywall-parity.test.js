'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const jwt = require('jsonwebtoken');

const { buildApp } = require('../server/app');
const FedaPayService = require('../server/services/fedapay');
const execution = require('../server/services/execution');
const budget = require('../server/services/execution/budget');
const executeRoutes = require('../server/routes/execute');

const ROOT = path.join(__dirname, '..');

// ----------------------------------------------------------------------------
// 1. Unification tarifaire dans les assets statiques
// ----------------------------------------------------------------------------

test('Tarification : cohérence entre fedapay.js, account.html et auth-check.js', () => {
  const fedapayService = new FedaPayService();
  const monthly = fedapayService.getPlanDetails('monthly');
  const annual = fedapayService.getPlanDetails('annual');

  assert.strictEqual(monthly.amount, 5000, 'Le tarif mensuel officiel doit être 5000 FCFA');
  assert.strictEqual(annual.amount, 45000, 'Le tarif annuel officiel doit être 45000 FCFA');

  const accountHtml = fs.readFileSync(path.join(ROOT, 'public/account.html'), 'utf8');
  const authCheckJs = fs.readFileSync(path.join(ROOT, 'public/js/auth-check.js'), 'utf8');

  // Aucun tarif obsolète à 1 000 ou 1000 ne doit subsister
  assert.doesNotMatch(
    authCheckJs,
    /1\s?000\s?F/i,
    'auth-check.js ne doit plus contenir de mention de 1 000 F'
  );
  assert.doesNotMatch(
    accountHtml,
    /payAmount\s*=\s*1000\b/,
    'account.html ne doit plus avoir payAmount = 1000'
  );
  assert.doesNotMatch(
    accountHtml,
    /1\s?000\s?F/i,
    'account.html ne doit plus contenir de mention de 1 000 F'
  );

  // Vérifier la présence des montants officiels 5 000 et 45 000
  assert.match(
    authCheckJs,
    /5\s?000/i,
    'auth-check.js doit mentionner le montant mensuel officiel 5 000 FCFA'
  );
  assert.match(
    accountHtml,
    /5\s?000/i,
    'account.html doit mentionner le montant mensuel officiel 5 000 FCFA'
  );
  assert.match(
    accountHtml,
    /45\s?000/i,
    'account.html doit mentionner le montant annuel officiel 45 000 FCFA'
  );
});

// ----------------------------------------------------------------------------
// 2. Endpoint /api/fedapay/config
// ----------------------------------------------------------------------------

test('API : /api/fedapay/config retourne les plans et montants officiels', async () => {
  const app = buildApp({ logger: false });
  try {
    const res = await app.inject({
      method: 'GET',
      url: '/api/fedapay/config'
    });

    assert.strictEqual(res.statusCode, 200);
    const body = res.json();
    assert.strictEqual(typeof body.enabled, 'boolean');
    assert.strictEqual(body.currency, 'XOF');
    assert.ok(body.amounts, 'amounts doit être présent');
    assert.strictEqual(body.amounts.monthly, 5000);
    assert.strictEqual(body.amounts.annual, 45000);
  } finally {
    await app.close();
  }
});

// ----------------------------------------------------------------------------
// 3. Exécution anonyme Chapitre 1 vs Chapitre 2+ sur POST /api/execute
// ----------------------------------------------------------------------------

test('API execute : accès anonyme autorisé uniquement sur Chapitre 1 valide', async () => {
  const origPistonConfigured = execution.piston.isConfigured;
  const origPistonRun = execution.piston.run;

  execution.piston.isConfigured = () => true;
  execution.piston.run = async () => ({
    ok: true,
    httpStatus: 200,
    data: { stdout: '42\n', stderr: '', exit_code: 0 }
  });

  if (typeof executeRoutes._resetAnonIpQuota === 'function') {
    executeRoutes._resetAnonIpQuota();
  }
  budget.reset();

  const app = buildApp({ logger: false });
  try {
    // 1. Anonyme SANS exerciseId -> 401
    const resNoEx = await app.inject({
      method: 'POST',
      url: '/api/execute',
      payload: { language: 'python', code: 'print(42)' }
    });
    assert.strictEqual(resNoEx.statusCode, 401, 'Sans exerciseId, anonyme doit renvoyer 401');

    // 2. Anonyme avec exerciseId INCONNU -> 401
    const resUnknownEx = await app.inject({
      method: 'POST',
      url: '/api/execute',
      payload: { language: 'python', code: 'print(42)', exerciseId: 'inconnu-xyz' }
    });
    assert.strictEqual(resUnknownEx.statusCode, 401, 'exerciseId inconnu anonyme doit renvoyer 401');

    // 3. Anonyme avec exercice de Chapitre 2 -> 401
    const resCh2 = await app.inject({
      method: 'POST',
      url: '/api/execute',
      payload: { language: 'python', code: 'print(42)', exerciseId: 'py-c2-e1' }
    });
    assert.strictEqual(resCh2.statusCode, 401, 'Chapitre 2 anonyme doit renvoyer 401');

    // 4. Anonyme avec exercice de Chapitre 1 -> Succès (PAS 401)
    const resCh1 = await app.inject({
      method: 'POST',
      url: '/api/execute',
      payload: { language: 'python', code: 'print(42)', exerciseId: 'py-c1-e1' }
    });
    assert.notStrictEqual(resCh1.statusCode, 401, 'Chapitre 1 anonyme ne doit pas renvoyer 401');
    assert.strictEqual(resCh1.statusCode, 200, 'Chapitre 1 anonyme doit réussir l exécution');
    const ch1Json = resCh1.json();
    assert.strictEqual(ch1Json.status, 'success');
  } finally {
    await app.close();
    execution.piston.isConfigured = origPistonConfigured;
    execution.piston.run = origPistonRun;
    budget.reset();
  }
});

test('API execute : quota IP strict pour les exécutions anonymes (429)', async () => {
  const origPistonConfigured = execution.piston.isConfigured;
  const origPistonRun = execution.piston.run;

  execution.piston.isConfigured = () => true;
  execution.piston.run = async () => ({
    ok: true,
    httpStatus: 200,
    data: { stdout: 'ok\n', stderr: '', exit_code: 0 }
  });

  if (typeof executeRoutes._resetAnonIpQuota === 'function') {
    executeRoutes._resetAnonIpQuota();
  }
  budget.reset();

  const app = buildApp({ logger: false });
  try {
    const clientIp = '198.51.100.42';

    // 15 exécutions successives sous le quota IP
    for (let i = 0; i < 15; i++) {
      const res = await app.inject({
        method: 'POST',
        url: '/api/execute',
        headers: { 'x-forwarded-for': clientIp },
        payload: { language: 'python', code: 'print("quota test")', exerciseId: 'py-c1-e1' }
      });
      assert.strictEqual(res.statusCode, 200, `L appel ${i + 1} doit passer`);
    }

    // Le 16ème appel de la même IP doit être rejeté avec 429
    const resOverLimit = await app.inject({
      method: 'POST',
      url: '/api/execute',
      headers: { 'x-forwarded-for': clientIp },
      payload: { language: 'python', code: 'print("quota test")', exerciseId: 'py-c1-e1' }
    });
    assert.strictEqual(resOverLimit.statusCode, 429, 'Le 16ème appel doit renvoyer 429');
    assert.strictEqual(resOverLimit.json().status, 'rate_limited');
  } finally {
    await app.close();
    execution.piston.isConfigured = origPistonConfigured;
    execution.piston.run = origPistonRun;
    budget.reset();
  }
});

// ----------------------------------------------------------------------------
// 4. Contrôle d'accès sur GET /api/execute/languages
// ----------------------------------------------------------------------------

test('API execute : /api/execute/languages accessible aux connectés ou anonymes avec chap1', async () => {
  const app = buildApp({ logger: false });
  try {
    // 1. Anonyme sans exerciseId -> 401
    const resAnon = await app.inject({
      method: 'GET',
      url: '/api/execute/languages'
    });
    assert.strictEqual(resAnon.statusCode, 401);

    // 2. Anonyme avec chapitre 2 -> 401
    const resCh2 = await app.inject({
      method: 'GET',
      url: '/api/execute/languages?exerciseId=py-c2-e1'
    });
    assert.strictEqual(resCh2.statusCode, 401);

    // 3. Anonyme avec chapitre 1 -> 200
    const resCh1 = await app.inject({
      method: 'GET',
      url: '/api/execute/languages?exerciseId=py-c1-e1'
    });
    assert.strictEqual(resCh1.statusCode, 200);
    assert.ok(Array.isArray(resCh1.json().languages));

    // 4. Connecté sans exerciseId -> 200
    process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret';
    const token = jwt.sign({ userId: 'u-auth-test', email: 'test@example.com' }, process.env.JWT_SECRET);
    const resAuth = await app.inject({
      method: 'GET',
      url: '/api/execute/languages',
      cookies: { auth_token: token }
    });
    assert.strictEqual(resAuth.statusCode, 200);
  } finally {
    await app.close();
  }
});
