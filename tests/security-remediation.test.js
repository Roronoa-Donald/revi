'use strict';

/**
 * tests/security-remediation.test.js
 * Suite de tests de sécurité et d'isolation (SEC-001, SEC-002, SEC-003, SEC-004, OPS-001, AUTH-001).
 */

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const jwt = require('jsonwebtoken');

const localRunner = require('../server/services/execution/local-runner');
const execution = require('../server/services/execution');
const languages = require('../server/services/execution/languages');
const db = require('../server/db');
const aiPool = require('../server/services/ai-pool');
const { buildApp } = require('../server/app');

describe('SEC-001 : Isolation de l’exécution locale (JS, Python, Analyse)', () => {
  test('runJavaScript : impossible de lire les secrets de process.env via évasion de prototype VM', async () => {
    process.env.TEST_HOST_SECRET = 'CANARY_SECRET_123';
    try {
      const escapeCode = `
        const results = [];
        try {
          const fn = this.constructor.constructor;
          const p = fn('return typeof process !== "undefined" ? process : null')();
          results.push(p && p.env ? p.env.TEST_HOST_SECRET : 'NO_PROC');
        } catch (e) {
          results.push('BLOCKED_THIS');
        }
        try {
          const fn2 = console.log.constructor;
          const p2 = fn2('return typeof process !== "undefined" ? process : null')();
          results.push(p2 && p2.env ? p2.env.TEST_HOST_SECRET : 'NO_PROC2');
        } catch (e) {
          results.push('BLOCKED_CONSOLE');
        }
        try {
          const fn3 = readline.constructor;
          const p3 = fn3('return typeof process !== "undefined" ? process : null')();
          results.push(p3 && p3.env ? p3.env.TEST_HOST_SECRET : 'NO_PROC3');
        } catch (e) {
          results.push('BLOCKED_READLINE');
        }
        console.log(results.join('|'));
      `;
      const res = await localRunner.runJavaScript(escapeCode, '');
      const combined = `${res.data.stdout || ''}\n${res.data.stderr || ''}`;
      assert.ok(!combined.includes('CANARY_SECRET_123'), 'Le secret hôte ne doit jamais fuiter dans stdout/stderr');
    } finally {
      delete process.env.TEST_HOST_SECRET;
    }
  });

  test('runJavaScript : accès interdit à process, require, fs, child_process et réseau (fetch, WebSocket)', async () => {
    const probeCode = `
      console.log('process:', typeof process);
      console.log('require:', typeof require);
      console.log('fetch:', typeof fetch);
      console.log('WebSocket:', typeof WebSocket);
    `;
    const res = await localRunner.runJavaScript(probeCode, '');
    assert.equal(res.ok, true);
    assert.equal(res.data.exit_code, 0);
    assert.match(res.data.stdout, /process: undefined/);
    assert.match(res.data.stdout, /require: undefined/);
    assert.match(res.data.stdout, /fetch: undefined/);
    assert.match(res.data.stdout, /WebSocket: undefined/);
  });

  test('runPython : exécution isolée dans un sous-processus sans accès à TEST_HOST_SECRET', async () => {
    process.env.TEST_HOST_SECRET = 'CANARY_SECRET_PYTHON_456';
    try {
      const pyCode = `
import sys
x = int(input())
print("Carre:", x * x)
`;
      const res = await localRunner.runPython(pyCode, '12\n');
      assert.equal(res.ok, true);
      assert.equal(res.data.exit_code, 0);
      assert.match(res.data.stdout, /Carre: 144/);
      const combined = `${res.data.stdout}\n${res.data.stderr}`;
      assert.ok(!combined.includes('CANARY_SECRET_PYTHON_456'));
    } finally {
      delete process.env.TEST_HOST_SECRET;
    }
  });

  test('execution.execute (allowLocal) : isolation de bout en bout contre l’extraction de secrets', async () => {
    process.env.TEST_HOST_SECRET = 'CANARY_EXECUTE_789';
    try {
      const res = await execution.execute(
        {
          language: 'javascript',
          code: `
            try {
              const p = this.constructor.constructor('return process')();
              console.log(p.env.TEST_HOST_SECRET);
            } catch (e) {
              console.log('ISOLATED');
            }
          `
        },
        { allowLocal: true }
      );
      assert.ok(!res.stdout.includes('CANARY_EXECUTE_789'));
      assert.ok(!res.stderr.includes('CANARY_EXECUTE_789'));
    } finally {
      delete process.env.TEST_HOST_SECRET;
    }
  });

  test('runJavaScript & runPython : terminaison sur boucle infinie et plafonnement de sortie à 64 Ko', async () => {
    const loopRes = await localRunner.runJavaScript('while (true) {}', '', 400);
    assert.notEqual(loopRes.data.exit_code, 0, 'Une boucle infinie JS doit échouer par timeout');

    const pyLoopRes = await localRunner.runPython('while True:\n    pass\n', '', 400);
    assert.notEqual(pyLoopRes.data.exit_code, 0, 'Une boucle infinie Python doit échouer par timeout');

    const floodRes = await localRunner.runJavaScript(
      'for (let i = 0; i < 5000; i++) console.log("A".repeat(100));',
      '',
      3000
    );
    assert.ok(Buffer.byteLength(floodRes.data.stdout, 'utf8') <= 65536, 'stdout JS doit être plafonné à 64 Ko');
  });

  test('Mode étude de cas (analyse) : support dans languages.js et localRunner.runAnalyse', async () => {
    const lang = languages.getLanguage('analyse');
    assert.ok(lang, 'Le langage analyse doit être déclaré dans languages.js');
    assert.equal(lang.id, 'analyse');
    assert.equal(lang.monaco, 'plaintext');
    assert.equal(localRunner.canHandle('analyse'), true);

    const responseText = `
      # Grille d'analyse architecture
      Acteur   :   Administrateur réseau
      Risque: Spoofing ARP
      Mesure :   Dynamic ARP Inspection
    `;

    const allRes = await localRunner.runAnalyse(responseText, '');
    assert.equal(allRes.ok, true);
    assert.equal(
      allRes.data.stdout.trim(),
      'Acteur : Administrateur réseau\nRisque: Spoofing ARP\nMesure : Dynamic ARP Inspection'
    );

    const line2 = await localRunner.runAnalyse(responseText, 'ligne:2');
    assert.equal(line2.data.stdout.trim(), 'Risque: Spoofing ARP');

    const lines1to2 = await localRunner.runAnalyse(responseText, 'lignes:1-2');
    assert.equal(lines1to2.data.stdout.trim(), 'Acteur : Administrateur réseau\nRisque: Spoofing ARP');

    const byKey = await localRunner.runAnalyse(responseText, 'cle:Mesure');
    assert.equal(byKey.data.stdout.trim(), 'Mesure : Dynamic ARP Inspection');
  });
});

describe('SEC-002 : Authentification Admin Fail-Closed et Timing-Safe', () => {
  test('POST /api/admin/login : refuse (503) quand ADMIN_USERNAME, ADMIN_PASSWORD ou JWT_SECRET est absent (pas de bypass undefined === undefined)', async () => {
    const savedUser = process.env.ADMIN_USERNAME;
    const savedPass = process.env.ADMIN_PASSWORD;
    const savedSecret = process.env.JWT_SECRET;

    delete process.env.ADMIN_USERNAME;
    delete process.env.ADMIN_PASSWORD;
    process.env.JWT_SECRET = 'test-secret-admin-sec002';

    const app = buildApp({ logger: false });
    try {
      const res = await app.inject({
        method: 'POST',
        url: '/api/admin/login',
        payload: {}
      });
      assert.equal(res.statusCode, 503, 'Doit répondre 503 si les identifiants admin ne sont pas configurés');
      assert.equal(res.json().success, false);
    } finally {
      await app.close();
      if (savedUser !== undefined) process.env.ADMIN_USERNAME = savedUser;
      else delete process.env.ADMIN_USERNAME;
      if (savedPass !== undefined) process.env.ADMIN_PASSWORD = savedPass;
      else delete process.env.ADMIN_PASSWORD;
      if (savedSecret !== undefined) process.env.JWT_SECRET = savedSecret;
      else delete process.env.JWT_SECRET;
    }
  });

  test('POST /api/admin/login : comparaison timing-safe, refus 401 sur mauvais identifiants et succès 200 sur bons identifiants', async () => {
    const savedUser = process.env.ADMIN_USERNAME;
    const savedPass = process.env.ADMIN_PASSWORD;
    const savedSecret = process.env.JWT_SECRET;
    const origLog = db.logActivity;
    db.logActivity = async () => {};

    process.env.ADMIN_USERNAME = 'superadmin';
    process.env.ADMIN_PASSWORD = 'correct-horse-battery-staple';
    process.env.JWT_SECRET = 'test-secret-admin-sec002';

    const app = buildApp({ logger: false });
    try {
      const badRes = await app.inject({
        method: 'POST',
        url: '/api/admin/login',
        payload: { username: 'superadmin', password: 'wrong-password' }
      });
      assert.equal(badRes.statusCode, 401);

      const emptyRes = await app.inject({
        method: 'POST',
        url: '/api/admin/login',
        payload: { username: '', password: '' }
      });
      assert.equal(emptyRes.statusCode, 401);

      const okRes = await app.inject({
        method: 'POST',
        url: '/api/admin/login',
        payload: { username: 'superadmin', password: 'correct-horse-battery-staple' }
      });
      assert.equal(okRes.statusCode, 200);
      assert.equal(okRes.json().success, true);
    } finally {
      db.logActivity = origLog;
      await app.close();
      if (savedUser !== undefined) process.env.ADMIN_USERNAME = savedUser;
      else delete process.env.ADMIN_USERNAME;
      if (savedPass !== undefined) process.env.ADMIN_PASSWORD = savedPass;
      else delete process.env.ADMIN_PASSWORD;
      if (savedSecret !== undefined) process.env.JWT_SECRET = savedSecret;
      else delete process.env.JWT_SECRET;
    }
  });
});

describe('SEC-003 & AUTH-001 : Liste blanche des modèles IA et révocation de session', () => {
  test('POST /api/ai-chat : ignore les modèles non autorisés et vérifie la révocation de session', async () => {
    const savedSecret = process.env.JWT_SECRET;
    process.env.JWT_SECRET = 'test-secret-ai-chat-sec003';

    const origChat = aiPool.chatCompletion;
    const origGetSession = db.getSessionByJti;
    const origGetUser = db.getUserById;

    let capturedOptions = null;
    aiPool.chatCompletion = async (opts) => {
      capturedOptions = opts;
      return { data: { choices: [{ message: { content: 'Réponse test' } }] } };
    };

    const app = buildApp({ logger: false });
    try {
      // 1. Modèle arbitraire coûteux ignoré -> remplacé par undefined
      db.getSessionByJti = async () => ({ is_valid: true, user_id: 42 });
      db.getUserById = async () => ({ id: 42, is_active: true });

      const validToken = jwt.sign({ userId: 42, jti: 'jti-valid-1' }, process.env.JWT_SECRET);
      const res1 = await app.inject({
        method: 'POST',
        url: '/api/ai-chat',
        cookies: { auth_token: validToken },
        payload: {
          model: 'openai/gpt-4o-expensive',
          messages: [{ role: 'user', content: 'Bonjour' }]
        }
      });
      assert.equal(res1.statusCode, 200);
      assert.equal(capturedOptions.model, undefined, 'Le modèle hors liste blanche doit être ramené à undefined');

      // 2. Modèle dans la liste blanche conservé
      const res2 = await app.inject({
        method: 'POST',
        url: '/api/ai-chat',
        cookies: { auth_token: validToken },
        payload: {
          model: 'deepseek/deepseek-chat',
          messages: [{ role: 'user', content: 'Bonjour' }]
        }
      });
      assert.equal(res2.statusCode, 200);
      assert.equal(capturedOptions.model, 'deepseek/deepseek-chat');

      // 3. Session révoquée en base -> 401
      db.getSessionByJti = async () => ({ is_valid: false, user_id: 42 });
      const resRevoked = await app.inject({
        method: 'POST',
        url: '/api/ai-chat',
        cookies: { auth_token: validToken },
        payload: {
          messages: [{ role: 'user', content: 'Bonjour' }]
        }
      });
      assert.equal(resRevoked.statusCode, 401, 'Une session révoquée doit être rejetée avec 401');
    } finally {
      aiPool.chatCompletion = origChat;
      db.getSessionByJti = origGetSession;
      db.getUserById = origGetUser;
      await app.close();
      if (savedSecret !== undefined) process.env.JWT_SECRET = savedSecret;
      else delete process.env.JWT_SECRET;
    }
  });
});

describe('SEC-004 & OPS-001 : Durcissement CORS et Content-Security-Policy', () => {
  test('CORS : refuse les sous-domaines tiers .vercel.app / .onrender.com et autorise revi-mu', async () => {
    const app = buildApp({ logger: false });
    try {
      const evilVercel = await app.inject({
        method: 'GET',
        url: '/api/course-info',
        headers: { origin: 'https://evil-attacker.vercel.app' }
      });
      assert.equal(
        evilVercel.headers['access-control-allow-origin'],
        undefined,
        'Un domaine tiers .vercel.app ne doit jamais recevoir Access-Control-Allow-Origin'
      );

      const evilRender = await app.inject({
        method: 'GET',
        url: '/api/course-info',
        headers: { origin: 'https://phishing.onrender.com' }
      });
      assert.equal(
        evilRender.headers['access-control-allow-origin'],
        undefined,
        'Un domaine tiers .onrender.com ne doit jamais recevoir Access-Control-Allow-Origin'
      );

      const officialVercel = await app.inject({
        method: 'GET',
        url: '/api/course-info',
        headers: { origin: 'https://revi-mu.vercel.app' }
      });
      assert.equal(officialVercel.headers['access-control-allow-origin'], 'https://revi-mu.vercel.app');

      const previewVercel = await app.inject({
        method: 'GET',
        url: '/api/course-info',
        headers: { origin: 'https://revi-mu-git-main-team.vercel.app' }
      });
      assert.equal(previewVercel.headers['access-control-allow-origin'], 'https://revi-mu-git-main-team.vercel.app');
    } finally {
      await app.close();
    }
  });

  test('CSP : présence de l’en-tête Content-Security-Policy avec directives de défense en profondeur', async () => {
    const app = buildApp({ logger: false });
    try {
      const res = await app.inject({
        method: 'GET',
        url: '/api/course-info'
      });
      const csp = res.headers['content-security-policy'];
      assert.ok(csp, 'L’en-tête Content-Security-Policy doit être présent');
      assert.match(csp, /default-src 'self'/);
      assert.match(csp, /object-src 'none'/);
      assert.match(csp, /frame-ancestors 'self'/);
      assert.match(csp, /worker-src 'self' blob:/);
    } finally {
      await app.close();
    }
  });
});
