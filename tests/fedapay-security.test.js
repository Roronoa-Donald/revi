'use strict';

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const jwt = require('jsonwebtoken');

const db = require('../server/db');
const FedaPayService = require('../server/services/fedapay');
const { buildApp } = require('../server/app');

function makeUserToken(userId = 10, jti = 'jti-feda-10') {
  return jwt.sign({ userId, jti }, process.env.JWT_SECRET);
}

describe('Tâche 1.3 : Sécurité FedaPay Fail-Closed & Anti-Rejeu', () => {
  test('1. /attempt et /callback exigent une session authentifiée valide (401 si anonyme)', async () => {
    const app = buildApp({ logger: false });
    try {
      const attemptAnon = await app.inject({
        method: 'POST',
        url: '/api/fedapay/attempt',
        payload: { plan: 'monthly' }
      });
      assert.strictEqual(attemptAnon.statusCode, 401, 'POST /api/fedapay/attempt anonyme doit retourner 401');

      const callbackAnon = await app.inject({
        method: 'POST',
        url: '/api/fedapay/callback',
        payload: { transaction_id: '999001', merchant_reference: 'MBFP_anon' }
      });
      assert.strictEqual(callbackAnon.statusCode, 401, 'POST /api/fedapay/callback anonyme doit retourner 401');
    } finally {
      await app.close();
    }
  });

  test('2. /callback refuse si aucune tentative DB ou si la tentative appartient à un autre utilisateur (jamais d’activation)', async () => {
    const savedSecret = process.env.JWT_SECRET;
    process.env.JWT_SECRET = 'feda-sec-callback-test';

    const origGetSession = db.getSessionByJti;
    const origGetUser = db.getUserById;
    const origGetById = db.getPaymentById;
    const origGetByRef = db.getPaymentByMerchantRef;
    const origGetByTx = db.getPaymentByTxId;
    const origExtend = db.extendSubscription;
    const origGetTx = FedaPayService.prototype.getTransaction;

    let extendedCalled = 0;
    db.getSessionByJti = async (jti) => ({ jti, user_id: 10, is_valid: true });
    db.getUserById = async (id) => ({ id, is_active: true, email: 'user10@test.local', subscription_status: 'inactive' });
    db.extendSubscription = async () => {
      extendedCalled++;
      return { id: 10, subscription_expires_at: new Date().toISOString() };
    };
    FedaPayService.prototype.getTransaction = async (txId) => ({
      id: txId,
      status: 'approved',
      amount: 5000,
      currency: { iso: 'XOF' },
      merchant_reference: 'MBFP_victim_ref'
    });

    const app = buildApp({ logger: false });
    try {
      const token = makeUserToken(10, 'jti-cb-10');

      // Cas A : aucune tentative en base -> doit refuser (404) sans activer
      db.getPaymentById = async () => null;
      db.getPaymentByMerchantRef = async () => null;
      db.getPaymentByTxId = async () => null;

      const resNoPayment = await app.inject({
        method: 'POST',
        url: '/api/fedapay/callback',
        cookies: { auth_token: token },
        payload: { transaction_id: '777001', merchant_reference: 'MBFP_victim_ref' }
      });
      assert.strictEqual(resNoPayment.statusCode, 404, 'Callback sans tentative DB doit retourner 404');
      assert.strictEqual(extendedCalled, 0, 'Aucun abonnement ne doit être activé sans tentative DB');

      // Cas B : tentative appartenant à user_id = 99 -> doit refuser (403)
      db.getPaymentByMerchantRef = async () => ({
        id: 55,
        user_id: 99,
        amount: 5000,
        currency: 'XOF',
        merchant_reference: 'MBFP_victim_ref',
        status: 'pending',
        months_granted: 1
      });

      const resForeign = await app.inject({
        method: 'POST',
        url: '/api/fedapay/callback',
        cookies: { auth_token: token },
        payload: { transaction_id: '777001', merchant_reference: 'MBFP_victim_ref' }
      });
      assert.strictEqual(resForeign.statusCode, 403, 'Callback sur tentative d’un autre compte doit retourner 403');
      assert.strictEqual(extendedCalled, 0, 'Aucun abonnement ne doit être activé pour un tiers');
    } finally {
      db.getSessionByJti = origGetSession;
      db.getUserById = origGetUser;
      db.getPaymentById = origGetById;
      db.getPaymentByMerchantRef = origGetByRef;
      db.getPaymentByTxId = origGetByTx;
      db.extendSubscription = origExtend;
      FedaPayService.prototype.getTransaction = origGetTx;
      await app.close();
      if (savedSecret !== undefined) process.env.JWT_SECRET = savedSecret;
      else delete process.env.JWT_SECRET;
    }
  });

  test('3. /recover bloque le double-crédit et rejette une seconde tentative (409)', async () => {
    const savedSecret = process.env.JWT_SECRET;
    process.env.JWT_SECRET = 'feda-sec-recover-test';

    const origGetSession = db.getSessionByJti;
    const origGetUser = db.getUserById;
    const origGetByTx = db.getPaymentByTxId;
    const origGetByRef = db.getPaymentByMerchantRef;
    const origExtend = db.extendSubscription;
    const origUpdatePayment = db.updatePaymentStatus;
    const origLog = db.logActivity;
    const origGetTx = FedaPayService.prototype.getTransaction;

    let extendedCount = 0;
    let paymentRow = {
      id: 91,
      user_id: 10,
      amount: 5000,
      currency: 'XOF',
      merchant_reference: 'MBFP_recover_91',
      status: 'pending',
      months_granted: 1
    };

    db.getSessionByJti = async (jti) => ({ jti, user_id: 10, is_valid: true });
    db.getUserById = async (id) => ({ id, is_active: true, email: 'user10@test.local', subscription_status: 'inactive' });
    db.getPaymentByTxId = async () => paymentRow.fedapay_transaction_id ? paymentRow : null;
    db.getPaymentByMerchantRef = async () => paymentRow;
    db.extendSubscription = async () => {
      extendedCount++;
      return { id: 10, subscription_expires_at: new Date(Date.now() + 86400000).toISOString() };
    };
    db.updatePaymentStatus = async (_id, status, extra = {}) => {
      paymentRow = { ...paymentRow, status, fedapay_transaction_id: extra.fedapayTransactionId || paymentRow.fedapay_transaction_id };
      return paymentRow;
    };
    db.logActivity = async () => {};
    FedaPayService.prototype.getTransaction = async (txId) => ({
      id: txId,
      status: 'approved',
      amount: 5000,
      currency: { iso: 'XOF' },
      merchant_reference: 'MBFP_recover_91'
    });

    const app = buildApp({ logger: false });
    try {
      const token = makeUserToken(10, 'jti-rec-10');

      const r1 = await app.inject({
        method: 'POST',
        url: '/api/fedapay/recover',
        cookies: { auth_token: token },
        payload: { transaction_id: '888001' }
      });
      assert.strictEqual(r1.statusCode, 200, 'Premier recover légitime doit réussir');
      assert.strictEqual(extendedCount, 1);

      const r2 = await app.inject({
        method: 'POST',
        url: '/api/fedapay/recover',
        cookies: { auth_token: token },
        payload: { transaction_id: '888001' }
      });
      assert.strictEqual(r2.statusCode, 409, 'Rejeu recover sur transaction déjà approuvée doit retourner 409');
      assert.strictEqual(extendedCount, 1, 'L abonnement ne doit JAMAIS être étendu deux fois');
    } finally {
      db.getSessionByJti = origGetSession;
      db.getUserById = origGetUser;
      db.getPaymentByTxId = origGetByTx;
      db.getPaymentByMerchantRef = origGetByRef;
      db.extendSubscription = origExtend;
      db.updatePaymentStatus = origUpdatePayment;
      db.logActivity = origLog;
      FedaPayService.prototype.getTransaction = origGetTx;
      await app.close();
      if (savedSecret !== undefined) process.env.JWT_SECRET = savedSecret;
      else delete process.env.JWT_SECRET;
    }
  });

  test('4. Webhook : fail-closed sans webhookSecret et rejet sans fallback si getTransaction échoue', async () => {
    const savedWebhook = process.env.FEDAPAY_WEBHOOK_SECRET;
    delete process.env.FEDAPAY_WEBHOOK_SECRET;

    const appNoSecret = buildApp({ logger: false });
    try {
      const resNoSecret = await appNoSecret.inject({
        method: 'POST',
        url: '/api/fedapay/webhook',
        payload: {
          id: 'evt_no_secret_1',
          name: 'transaction.approved',
          entity: { id: 1234, status: 'approved', amount: 5000 }
        }
      });
      assert.ok([401, 503].includes(resNoSecret.statusCode), `Webhook sans secret configuré doit échouer (reçu ${resNoSecret.statusCode})`);
    } finally {
      await appNoSecret.close();
    }

    // Avec secret configuré, si getTransaction échoue -> ne doit pas faire confiance au payload brut
    const crypto = require('node:crypto');
    process.env.FEDAPAY_WEBHOOK_SECRET = 'wh_strict_test_secret';
    const origGetTx = FedaPayService.prototype.getTransaction;
    const origExtend = db.extendSubscription;
    let extendedInWebhook = 0;

    FedaPayService.prototype.getTransaction = async () => {
      throw new Error('FedaPay API unreachable');
    };
    db.extendSubscription = async () => {
      extendedInWebhook++;
      return {};
    };

    const appStrict = buildApp({ logger: false });
    try {
      const rawBody = JSON.stringify({
        id: 'evt_strict_fail_1',
        name: 'transaction.approved',
        entity: { id: 445566, status: 'approved', amount: 5000, merchant_reference: 'MBFP_fake' }
      });
      const ts = Math.floor(Date.now() / 1000);
      const sig = crypto.createHmac('sha256', process.env.FEDAPAY_WEBHOOK_SECRET).update(`${ts}.${rawBody}`, 'utf8').digest('hex');

      const resApiFail = await appStrict.inject({
        method: 'POST',
        url: '/api/fedapay/webhook',
        headers: {
          'content-type': 'application/json',
          'x-fedapay-signature': `t=${ts},s=${sig}`
        },
        payload: rawBody
      });
      assert.ok(resApiFail.statusCode >= 500 || resApiFail.statusCode === 400, `Échec API FedaPay ne doit pas créditer en 200 (reçu ${resApiFail.statusCode})`);
      assert.strictEqual(extendedInWebhook, 0, 'Aucun abonnement ne doit être activé si getTransaction échoue');
    } finally {
      FedaPayService.prototype.getTransaction = origGetTx;
      db.extendSubscription = origExtend;
      await appStrict.close();
      if (savedWebhook !== undefined) process.env.FEDAPAY_WEBHOOK_SECRET = savedWebhook;
      else delete process.env.FEDAPAY_WEBHOOK_SECRET;
    }
  });
});
