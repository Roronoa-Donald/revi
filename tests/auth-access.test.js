'use strict';

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const jwt = require('jsonwebtoken');

const db = require('../server/db');
const { buildApp } = require('../server/app');

describe('Tâche 1.2 : Contrôle strict session DB, statut actif, abonnement et niveau', () => {
  test('POST /api/exercise/submit : rejette en 401 un JWT valide dont la session DB est révoquée ou le compte désactivé', async () => {
    const savedSecret = process.env.JWT_SECRET;
    process.env.JWT_SECRET = 'test-auth-access-secret';

    const origGetSession = db.getSessionByJti;
    const origGetUser = db.getUserById;
    const app = buildApp({ logger: false });

    try {
      const token = jwt.sign({ userId: 77, jti: 'jti-revoked-77' }, process.env.JWT_SECRET);

      // 1. Session révoquée en DB (is_valid: false) -> 401 même si JWT cryptographiquement valide
      db.getSessionByJti = async () => ({ jti: 'jti-revoked-77', user_id: 77, is_valid: false });
      db.getUserById = async () => ({
        id: 77,
        is_active: true,
        level: 'b3',
        subscription_status: 'active'
      });

      const resRevoked = await app.inject({
        method: 'POST',
        url: '/api/exercise/submit',
        cookies: { auth_token: token },
        payload: { exerciseId: 'al3-c2-e1', code: 'print(1)' }
      });
      assert.strictEqual(resRevoked.statusCode, 401, 'Une session révoquée doit être rejetée en 401');

      // 2. Compte désactivé en DB (is_active: false) -> 401
      db.getSessionByJti = async () => ({ jti: 'jti-revoked-77', user_id: 77, is_valid: true });
      db.getUserById = async () => ({
        id: 77,
        is_active: false,
        level: 'b3',
        subscription_status: 'active'
      });

      const resInactive = await app.inject({
        method: 'POST',
        url: '/api/exercise/submit',
        cookies: { auth_token: token },
        payload: { exerciseId: 'al3-c2-e1', code: 'print(1)' }
      });
      assert.strictEqual(resInactive.statusCode, 401, 'Un compte désactivé doit être rejeté en 401');
    } finally {
      db.getSessionByJti = origGetSession;
      db.getUserById = origGetUser;
      await app.close();
      if (savedSecret !== undefined) process.env.JWT_SECRET = savedSecret;
      else delete process.env.JWT_SECRET;
    }
  });

  test('POST /api/exercise/submit & /api/execute : rejette en 403 un utilisateur sans abonnement actif ou de niveau insuffisant sur chap 2+ B3', async () => {
    const savedSecret = process.env.JWT_SECRET;
    process.env.JWT_SECRET = 'test-auth-access-secret-2';

    const origGetSession = db.getSessionByJti;
    const origGetUser = db.getUserById;
    const app = buildApp({ logger: false });

    try {
      const token = jwt.sign({ userId: 88, jti: 'jti-valid-88', level: 'b1' }, process.env.JWT_SECRET);

      // 1. Utilisateur actif niveau B3 mais SANS abonnement actif sur chapitre 2 -> 403
      db.getSessionByJti = async () => ({ jti: 'jti-valid-88', user_id: 88, is_valid: true });
      db.getUserById = async () => ({
        id: 88,
        is_active: true,
        level: 'b3',
        subscription_status: 'inactive',
        subscription_expires_at: null
      });

      const resNoSubSubmit = await app.inject({
        method: 'POST',
        url: '/api/exercise/submit',
        cookies: { auth_token: token },
        payload: { exerciseId: 'al3-c2-e1', code: 'print(1)' }
      });
      assert.strictEqual(resNoSubSubmit.statusCode, 403, 'Sans abonnement actif, chapitre 2+ doit renvoyer 403');

      const resNoSubExec = await app.inject({
        method: 'POST',
        url: '/api/execute',
        cookies: { auth_token: token },
        payload: { language: 'python', exerciseId: 'al3-c2-e1', code: 'print(1)' }
      });
      assert.strictEqual(resNoSubExec.statusCode, 403, 'Sans abonnement actif, /api/execute chapitre 2+ doit renvoyer 403');

      // 2. Utilisateur abonné actif mais niveau B1 sur cours B3 -> 403
      db.getUserById = async () => ({
        id: 88,
        is_active: true,
        level: 'b1',
        subscription_status: 'active',
        subscription_expires_at: new Date(Date.now() + 86400000).toISOString()
      });

      const resWrongLevel = await app.inject({
        method: 'POST',
        url: '/api/exercise/submit',
        cookies: { auth_token: token },
        payload: { exerciseId: 'al3-c2-e1', code: 'print(1)' }
      });
      assert.strictEqual(resWrongLevel.statusCode, 403, 'Un compte B1 abonné ne peut pas soumettre un chapitre 2+ B3');

      const resWrongLevelHelp = await app.inject({
        method: 'POST',
        url: '/api/code-help',
        cookies: { auth_token: token },
        payload: { exerciseId: 'al3-c2-e1', code: 'print(1)' }
      });
      assert.strictEqual(resWrongLevelHelp.statusCode, 403, 'Un compte B1 abonné ne peut pas appeler /api/code-help sur un chapitre 2+ B3');
    } finally {
      db.getSessionByJti = origGetSession;
      db.getUserById = origGetUser;
      await app.close();
      if (savedSecret !== undefined) process.env.JWT_SECRET = savedSecret;
      else delete process.env.JWT_SECRET;
    }
  });
});
