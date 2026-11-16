'use strict';

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const jwt = require('jsonwebtoken');

const db = require('../server/db');
const { buildApp } = require('../server/app');

function hasForbiddenKey(obj, targetKey = 'password_hash') {
  if (!obj || typeof obj !== 'object') return false;
  if (Object.prototype.hasOwnProperty.call(obj, targetKey)) return true;
  if (Array.isArray(obj)) return obj.some((item) => hasForbiddenKey(item, targetKey));
  return Object.values(obj).some((val) => hasForbiddenKey(val, targetKey));
}

describe('Tâche 1.5 : Aucune fuite de password_hash sur les endpoints /api/admin/users*', () => {
  test('GET /users, POST /users, POST /users/:id/subscribe et /unsubscribe ne renvoient jamais password_hash', async () => {
    const savedSecret = process.env.JWT_SECRET;
    process.env.JWT_SECRET = 'admin-sec-test-secret';
    const adminCookie = {
      admin_token: jwt.sign({ admin: true, username: 'admin' }, process.env.JWT_SECRET)
    };

    const origQuery = db.query;
    const origGetByEmail = db.getUserByEmail;
    const origCreateUser = db.createUser;
    const origExtend = db.extendSubscription;
    const origSetSub = db.setSubscription;
    const origLog = db.logActivity;

    const rawUser = {
      id: 7,
      email: 'eleve@example.com',
      password_hash: 'scrypt$secret$deadbeef123456',
      display_name: 'Élève Test',
      level: 'b2',
      is_active: true,
      subscription_status: 'active',
      subscription_expires_at: '2027-01-01T00:00:00.000Z',
      active_sessions: 1
    };

    db.query = async (sql) => {
      if (String(sql).includes('FROM users')) {
        return { rows: [{ ...rawUser }] };
      }
      return { rows: [] };
    };
    db.getUserByEmail = async () => null;
    db.createUser = async () => ({ ...rawUser });
    db.extendSubscription = async () => ({ ...rawUser });
    db.setSubscription = async () => ({ ...rawUser, subscription_status: 'free', subscription_expires_at: null });
    db.logActivity = async () => {};

    const app = buildApp({ logger: false });
    try {
      const rList = await app.inject({
        method: 'GET',
        url: '/api/admin/users',
        cookies: adminCookie
      });
      assert.strictEqual(rList.statusCode, 200);
      assert.strictEqual(hasForbiddenKey(rList.json(), 'password_hash'), false, 'GET /api/admin/users ne doit jamais renvoyer password_hash');

      const rCreate = await app.inject({
        method: 'POST',
        url: '/api/admin/users',
        cookies: adminCookie,
        payload: { email: 'eleve@example.com', password: 'Password1234', displayName: 'Élève Test' }
      });
      assert.strictEqual(rCreate.statusCode, 200);
      assert.strictEqual(hasForbiddenKey(rCreate.json(), 'password_hash'), false, 'POST /api/admin/users ne doit jamais renvoyer password_hash');

      const rSub = await app.inject({
        method: 'POST',
        url: '/api/admin/users/7/subscribe',
        cookies: adminCookie,
        payload: { months: 1 }
      });
      assert.strictEqual(rSub.statusCode, 200);
      assert.strictEqual(hasForbiddenKey(rSub.json(), 'password_hash'), false, 'POST /subscribe ne doit jamais renvoyer password_hash');

      const rUnsub = await app.inject({
        method: 'POST',
        url: '/api/admin/users/7/unsubscribe',
        cookies: adminCookie
      });
      assert.strictEqual(rUnsub.statusCode, 200);
      assert.strictEqual(hasForbiddenKey(rUnsub.json(), 'password_hash'), false, 'POST /unsubscribe ne doit jamais renvoyer password_hash');
    } finally {
      db.query = origQuery;
      db.getUserByEmail = origGetByEmail;
      db.createUser = origCreateUser;
      db.extendSubscription = origExtend;
      db.setSubscription = origSetSub;
      db.logActivity = origLog;
      await app.close();
      if (savedSecret !== undefined) process.env.JWT_SECRET = savedSecret;
      else delete process.env.JWT_SECRET;
    }
  });
});
