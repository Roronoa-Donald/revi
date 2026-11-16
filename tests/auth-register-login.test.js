'use strict';

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const db = require('../server/db');
const { buildApp } = require('../server/app');

function makeMemoryDbRunner(state) {
  return async (text, params) => {
    const sql = String(text).trim();

    if (/^SELECT \* FROM users WHERE email = \$1/i.test(sql)) {
      const user = state.users.find((u) => u.email === params[0]);
      return { rows: user ? [user] : [] };
    }

    if (/^SELECT \* FROM users WHERE id = \$1/i.test(sql)) {
      const user = state.users.find((u) => u.id === params[0]);
      return { rows: user ? [user] : [] };
    }

    if (/^INSERT INTO users\b/i.test(sql)) {
      const [email, password_hash, display_name, level] = params;
      if (state.users.some((u) => u.email === email)) {
        const err = new Error('duplicate key value violates unique constraint');
        err.code = '23505';
        throw err;
      }
      const user = {
        id: state.nextUserId++,
        email,
        password_hash,
        display_name,
        level,
        is_active: true,
        subscription_status: 'free',
        subscription_expires_at: null,
        created_at: new Date().toISOString(),
        last_login_at: null
      };
      state.users.push(user);
      return { rows: [user] };
    }

    if (/^DELETE FROM users WHERE id = \$1/i.test(sql)) {
      state.users = state.users.filter((u) => u.id !== params[0]);
      return { rows: [] };
    }

    if (/^UPDATE users SET last_login_at/i.test(sql)) {
      const user = state.users.find((u) => u.id === params[1]);
      if (user) {
        user.last_fingerprint = params[0];
        user.last_login_at = new Date().toISOString();
      }
      return { rows: [] };
    }

    if (/^UPDATE sessions\s+SET is_valid = FALSE/i.test(sql)) {
      return { rows: [] };
    }

    if (/^INSERT INTO sessions\b/i.test(sql)) {
      if (state.failSessionInsert) {
        throw new Error('simulated sessions insert failure');
      }
      const [user_id, jti, machine_fingerprint, platform] = params;
      const session = {
        id: state.nextSessionId++,
        user_id,
        jti,
        machine_fingerprint,
        platform,
        is_valid: true,
        created_at: new Date().toISOString()
      };
      state.sessions.push(session);
      return { rows: [session] };
    }

    if (/^SELECT \* FROM sessions WHERE jti = \$1/i.test(sql)) {
      const s = state.sessions.find((row) => row.jti === params[0]);
      return { rows: s ? [s] : [] };
    }

    if (/^UPDATE sessions SET last_verified/i.test(sql)) {
      return { rows: [] };
    }

    if (/^INSERT INTO activity_logs\b/i.test(sql) || /^SELECT COUNT\(\*\)/i.test(sql)) {
      return { rows: [{ n: 0 }] };
    }

    return { rows: [] };
  };
}

describe('Auth endpoints /api/register, /api/login, /api/verify', () => {
  test('POST /api/register puis /api/login et /api/verify fonctionnent avec JWT_SECRET dynamique et COOKIE_DOMAIN malformé', async () => {
    const savedSecret = process.env.JWT_SECRET;
    const savedDomain = process.env.COOKIE_DOMAIN;
    delete process.env.JWT_SECRET;

    const state = { users: [], sessions: [], nextUserId: 1, nextSessionId: 1 };
    db.setQueryRunnerForTest(makeMemoryDbRunner(state));
    const app = buildApp({ logger: false });

    try {
      // JWT_SECRET défini APRÈS le chargement du module (ex. env dynamique)
      process.env.JWT_SECRET = 'dynamic-runtime-secret-123456';
      process.env.COOKIE_DOMAIN = 'https://revi-mu.vercel.app';

      const regRes = await app.inject({
        method: 'POST',
        url: '/api/register',
        payload: {
          email: 'alice@example.com',
          password: 'password123',
          displayName: 'Alice',
          level: 'b2',
          fingerprint: 'fp-device-1'
        }
      });

      assert.strictEqual(regRes.statusCode, 200);
      const regBody = regRes.json();
      assert.strictEqual(regBody.success, true);
      assert.strictEqual(regBody.authenticated, true);
      assert.strictEqual(regBody.account.email, 'alice@example.com');
      assert.strictEqual(state.users.length, 1);
      assert.strictEqual(state.sessions.length, 1);

      const authCookie = regRes.cookies.find((c) => c.name === 'auth_token');
      assert.ok(authCookie && authCookie.value, 'Le cookie auth_token doit être posé');

      const verifyRes = await app.inject({
        method: 'GET',
        url: '/api/verify',
        cookies: { auth_token: authCookie.value }
      });
      assert.strictEqual(verifyRes.statusCode, 200);
      assert.strictEqual(verifyRes.json().authenticated, true);

      const loginRes = await app.inject({
        method: 'POST',
        url: '/api/login',
        payload: {
          email: 'alice@example.com',
          password: 'password123',
          fingerprint: 'fp-device-2'
        }
      });
      assert.strictEqual(loginRes.statusCode, 200);
      assert.strictEqual(loginRes.json().success, true);
      assert.strictEqual(state.sessions.length, 2);
    } finally {
      db.setQueryRunnerForTest(null);
      await app.close();
      if (savedSecret !== undefined) process.env.JWT_SECRET = savedSecret;
      else delete process.env.JWT_SECRET;
      if (savedDomain !== undefined) process.env.COOKIE_DOMAIN = savedDomain;
      else delete process.env.COOKIE_DOMAIN;
    }
  });

  test('JWT_SECRET manquant renvoie 503 sans créer d\'utilisateur orphelin', async () => {
    const savedSecret = process.env.JWT_SECRET;
    process.env.JWT_SECRET = '   ';

    const state = { users: [], sessions: [], nextUserId: 1, nextSessionId: 1 };
    db.setQueryRunnerForTest(makeMemoryDbRunner(state));
    const app = buildApp({ logger: false });

    try {
      const regRes = await app.inject({
        method: 'POST',
        url: '/api/register',
        payload: {
          email: 'bob@example.com',
          password: 'password123',
          level: 'b2'
        }
      });
      assert.strictEqual(regRes.statusCode, 503);
      assert.strictEqual(regRes.json().success, false);
      assert.strictEqual(state.users.length, 0, 'Aucun utilisateur orphelin ne doit être inséré');

      const loginRes = await app.inject({
        method: 'POST',
        url: '/api/login',
        payload: { email: 'bob@example.com', password: 'password123' }
      });
      assert.strictEqual(loginRes.statusCode, 503);
    } finally {
      db.setQueryRunnerForTest(null);
      await app.close();
      if (savedSecret !== undefined) process.env.JWT_SECRET = savedSecret;
      else delete process.env.JWT_SECRET;
    }
  });

  test('Échec d\'insertion de session annule l\'utilisateur créé pendant /api/register', async () => {
    const savedSecret = process.env.JWT_SECRET;
    process.env.JWT_SECRET = 'rollback-secret-test';

    const state = { users: [], sessions: [], nextUserId: 1, nextSessionId: 1, failSessionInsert: true };
    db.setQueryRunnerForTest(makeMemoryDbRunner(state));
    const app = buildApp({ logger: false });

    try {
      const regRes = await app.inject({
        method: 'POST',
        url: '/api/register',
        payload: {
          email: 'carol@example.com',
          password: 'password123',
          level: 'b2'
        }
      });
      assert.strictEqual(regRes.statusCode, 500);
      assert.strictEqual(state.users.length, 0, 'Le rollback doit supprimer l\'utilisateur sans session');
    } finally {
      db.setQueryRunnerForTest(null);
      await app.close();
      if (savedSecret !== undefined) process.env.JWT_SECRET = savedSecret;
      else delete process.env.JWT_SECRET;
    }
  });

  test('api/index.js active les logs d\'erreur et login/account n\'encodent pas deux fois .textContent', () => {
    const root = path.resolve(__dirname, '..');
    const apiEntry = fs.readFileSync(path.join(root, 'api/index.js'), 'utf8');
    assert.doesNotMatch(apiEntry, /buildApp\(\{\s*logger:\s*false\s*\}\)/);
    assert.match(apiEntry, /logger:\s*\{\s*level:\s*['"]error['"]\s*\}/);

    const loginHtml = fs.readFileSync(path.join(root, 'public/login.html'), 'utf8');
    assert.doesNotMatch(loginHtml, /showMsg\([^)]*esc\(/);

    const accountHtml = fs.readFileSync(path.join(root, 'public/account.html'), 'utf8');
    assert.doesNotMatch(accountHtml, /accountEmail'\)\.textContent\s*=\s*esc\(/);
  });
});
