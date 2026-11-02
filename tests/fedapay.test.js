/**
 * tests/fedapay.test.js
 *
 * Tests unitaires et d'intégration pour la passerelle officielle FedaPay :
 *   - Service FedaPay : calcul des formules certifiées côté serveur (Fail-Closed)
 *   - Génération des références marchandes uniques (MBFP_<uuid>)
 *   - Sécurité HMAC-SHA256 du Webhook FedaPay (format t=...,s=... et anti-rejeu 5 min)
 *   - Validation Fail-Closed des transactions (status, montant, devise, merchant_reference)
 *   - Routes Fastify :
 *       * Configuration (/config et /dashboard/abonnement/config)
 *       * Étape 1 : Tentative serveur (/attempt et /dashboard/abonnement/attempt)
 *       * Canal B : Webhook signé et idempotence (/webhooks/fedapay et /api/fedapay/webhook)
 *       * Canal C : Formulaire de secours (/recover et /dashboard/abonnement/recover)
 */
'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');

const FedaPayService = require('../server/services/fedapay');
const { buildApp } = require('../server/app');

const TEST_PUBLIC_KEY = 'pk_sandbox_fedapay_test_123456';
const TEST_SECRET_KEY = 'sk_sandbox_fedapay_secret_abcdef';
const TEST_WEBHOOK_SECRET = 'wh_sandbox_fedapay_secret_789012';

test('FedaPayService : calcul des formules certifiées côté serveur (Fail-Closed)', () => {
  const service = new FedaPayService({
    publicKey: TEST_PUBLIC_KEY,
    secretKey: TEST_SECRET_KEY,
    webhookSecret: TEST_WEBHOOK_SECRET
  });

  // Formule Mensuelle : 5 000 FCFA / 1 mois
  const monthly = service.getPlanDetails('monthly');
  assert.equal(monthly.plan, 'monthly');
  assert.equal(monthly.amount, 5000);
  assert.equal(monthly.months, 1);
  assert.equal(monthly.currency, 'XOF');

  // Alias mensuel
  assert.equal(service.getPlanDetails('mensuel').amount, 5000);
  assert.equal(service.getPlanDetails('1').amount, 5000);

  // Formule Annuelle : 45 000 FCFA / 12 mois
  const annual = service.getPlanDetails('annual');
  assert.equal(annual.plan, 'annual');
  assert.equal(annual.amount, 45000);
  assert.equal(annual.months, 12);
  assert.equal(annual.currency, 'XOF');

  // Alias annuel
  assert.equal(service.getPlanDetails('annuel').amount, 45000);
  assert.equal(service.getPlanDetails('12').amount, 45000);

  // Formule invalide => rejet strict (Fail-Closed)
  assert.throws(() => service.getPlanDetails('inconnu'), /Formule inconnue/);
});

test('FedaPayService : génération des références marchandes uniques (MBFP_<uuid>)', () => {
  const service = new FedaPayService();
  const ref1 = service.generateMerchantReference('MBFP');
  const ref2 = service.generateMerchantReference('MBFP');

  assert.match(ref1, /^MBFP_[a-f0-9]{32}$/);
  assert.match(ref2, /^MBFP_[a-f0-9]{32}$/);
  assert.notEqual(ref1, ref2, 'Deux références marchandes doivent être rigoureusement uniques');
});

test('FedaPayService : vérification cryptographique HMAC-SHA256 du Webhook', () => {
  const service = new FedaPayService({
    webhookSecret: TEST_WEBHOOK_SECRET
  });

  const rawPayload = JSON.stringify({
    name: 'transaction.approved',
    entity: {
      id: 98765,
      status: 'approved',
      amount: 5000,
      currency: { iso: 'XOF' },
      merchant_reference: 'MBFP_test123'
    }
  });

  const nowSec = Math.floor(Date.now() / 1000);
  const signatureHex = crypto
    .createHmac('sha256', TEST_WEBHOOK_SECRET)
    .update(`${nowSec}.${rawPayload}`, 'utf8')
    .digest('hex');

  const validHeader = `t=${nowSec},s=${signatureHex}`;

  // 1. Signature valide et récente acceptée
  assert.equal(service.verifyWebhookSignature(rawPayload, validHeader), true);

  // 2. Signature altérée rejetée
  const tamperedHeader = `t=${nowSec},s=${signatureHex.slice(0, -2)}ff`;
  assert.equal(service.verifyWebhookSignature(rawPayload, tamperedHeader), false);

  // 3. Corps brut altéré rejeté
  assert.equal(service.verifyWebhookSignature(rawPayload + ' ', validHeader), false);

  // 4. Clé différente rejetée
  assert.equal(service.verifyWebhookSignature(rawPayload, validHeader, 'wh_wrong_secret'), false);

  // 5. Anti-rejeu : timestamp supérieur à 5 minutes (301s) rejeté
  const expiredTimestamp = nowSec - 305;
  const expiredSigHex = crypto
    .createHmac('sha256', TEST_WEBHOOK_SECRET)
    .update(`${expiredTimestamp}.${rawPayload}`, 'utf8')
    .digest('hex');
  const expiredHeader = `t=${expiredTimestamp},s=${expiredSigHex}`;
  assert.equal(service.verifyWebhookSignature(rawPayload, expiredHeader), false);

  // 6. Entrées vides rejetées
  assert.equal(service.verifyWebhookSignature('', validHeader), false);
  assert.equal(service.verifyWebhookSignature(rawPayload, ''), false);
});

test('FedaPayService : validation Fail-Closed des transactions', () => {
  const service = new FedaPayService();

  const expectedPayment = {
    amount: 5000,
    currency: 'XOF',
    merchant_reference: 'MBFP_valid_ref_123'
  };

  const validTx = {
    status: 'approved',
    amount: 5000,
    currency: { iso: 'XOF' },
    merchant_reference: 'MBFP_valid_ref_123'
  };

  // Transaction conforme => valide
  assert.deepEqual(service.validateApprovedTransaction(validTx, expectedPayment), { valid: true });

  // 1. Statut non approuvé (pending / canceled) => rejet
  assert.equal(
    service.validateApprovedTransaction({ ...validTx, status: 'pending' }, expectedPayment).valid,
    false
  );

  // 2. Falsification du montant (ex: client a payé 500 au lieu de 5000) => rejet
  assert.equal(
    service.validateApprovedTransaction({ ...validTx, amount: 500 }, expectedPayment).valid,
    false
  );

  // 3. Falsification de la devise => rejet
  assert.equal(
    service.validateApprovedTransaction({ ...validTx, currency: { iso: 'EUR' } }, expectedPayment).valid,
    false
  );

  // 4. Falsification de la référence marchande => rejet
  assert.equal(
    service.validateApprovedTransaction({ ...validTx, merchant_reference: 'MBFP_pirate' }, expectedPayment).valid,
    false
  );
});

test('Fastify Routes : Configuration et Tentative serveur (/attempt)', async () => {
  process.env.FEDAPAY_PUBLIC_KEY = TEST_PUBLIC_KEY;
  process.env.FEDAPAY_SECRET_KEY = TEST_SECRET_KEY;
  process.env.FEDAPAY_WEBHOOK_SECRET = TEST_WEBHOOK_SECRET;

  const app = buildApp({ logger: false });

  // 1. Route de configuration (/api/fedapay/config et alias /dashboard/abonnement/config)
  const cfgRes = await app.inject({
    method: 'GET',
    url: '/api/fedapay/config'
  });
  assert.equal(cfgRes.statusCode, 200);
  const cfg = JSON.parse(cfgRes.body);
  assert.equal(cfg.enabled, true);
  assert.equal(cfg.public_key, TEST_PUBLIC_KEY);
  assert.equal(cfg.amounts.monthly, 5000);
  assert.equal(cfg.amounts.annual, 45000);

  // 2. Étape 1 : Tentative serveur (/dashboard/abonnement/attempt)
  const attemptMonthly = await app.inject({
    method: 'POST',
    url: '/dashboard/abonnement/attempt',
    payload: { plan: 'monthly' }
  });
  assert.equal(attemptMonthly.statusCode, 200);
  const monthlyData = JSON.parse(attemptMonthly.body);
  assert.equal(monthlyData.success, true);
  assert.equal(monthlyData.attempt.amount, 5000);
  assert.equal(monthlyData.attempt.currency, 'XOF');
  assert.equal(monthlyData.attempt.plan, 'monthly');
  assert.match(monthlyData.attempt.merchant_reference, /^MBFP_/);

  // 3. Étape 1 : Tentative annuelle (/api/fedapay/attempt)
  const attemptAnnual = await app.inject({
    method: 'POST',
    url: '/api/fedapay/attempt',
    payload: { plan: 'annual' }
  });
  assert.equal(attemptAnnual.statusCode, 200);
  const annualData = JSON.parse(attemptAnnual.body);
  assert.equal(annualData.attempt.amount, 45000);
  assert.equal(annualData.attempt.plan, 'annual');
});

test('Fastify Routes : Webhook officiel FedaPay (Sécurité HMAC 401 & Rejet invalide)', async () => {
  process.env.FEDAPAY_PUBLIC_KEY = TEST_PUBLIC_KEY;
  process.env.FEDAPAY_SECRET_KEY = TEST_SECRET_KEY;
  process.env.FEDAPAY_WEBHOOK_SECRET = TEST_WEBHOOK_SECRET;

  const app = buildApp({ logger: false });

  const payload = {
    id: 'evt_test_54321',
    name: 'transaction.canceled',
    entity: {
      id: 54321,
      status: 'canceled',
      amount: 5000
    }
  };
  const rawBody = JSON.stringify(payload);
  const nowSec = Math.floor(Date.now() / 1000);
  const signatureHex = crypto
    .createHmac('sha256', TEST_WEBHOOK_SECRET)
    .update(`${nowSec}.${rawBody}`, 'utf8')
    .digest('hex');

  // 1. Rejet 401 si signature absente ou invalide
  const resBadSig = await app.inject({
    method: 'POST',
    url: '/webhooks/fedapay',
    headers: {
      'content-type': 'application/json',
      'x-fedapay-signature': `t=${nowSec},s=invalid_signature`
    },
    payload: rawBody
  });
  assert.equal(resBadSig.statusCode, 401);

  // 2. Succès 200 si signature HMAC valide sur /webhooks/fedapay
  const resOk1 = await app.inject({
    method: 'POST',
    url: '/webhooks/fedapay',
    headers: {
      'content-type': 'application/json',
      'x-fedapay-signature': `t=${nowSec},s=${signatureHex}`
    },
    payload: rawBody
  });
  assert.equal(resOk1.statusCode, 200);
  assert.equal(JSON.parse(resOk1.body).received, true);

  // 3. Succès 200 sur l'alias /api/fedapay/webhook
  const resOk2 = await app.inject({
    method: 'POST',
    url: '/api/fedapay/webhook',
    headers: {
      'content-type': 'application/json',
      'x-fedapay-signature': `t=${nowSec},s=${signatureHex}`
    },
    payload: rawBody
  });
  assert.equal(resOk2.statusCode, 200);
  assert.equal(JSON.parse(resOk2.body).received, true);

  // 4. Succès 200 sur l'alias /api/payments/fedapay/webhook
  const resOk3 = await app.inject({
    method: 'POST',
    url: '/api/payments/fedapay/webhook',
    headers: {
      'content-type': 'application/json',
      'x-fedapay-signature': `t=${nowSec},s=${signatureHex}`
    },
    payload: rawBody
  });
  assert.equal(resOk3.statusCode, 200);
  assert.equal(JSON.parse(resOk3.body).received, true);

  // 5. Idempotence : un rejeu du même webhook est acquitté immédiatement sans double traitement
  const resDuplicate = await app.inject({
    method: 'POST',
    url: '/webhooks/fedapay',
    headers: {
      'content-type': 'application/json',
      'x-fedapay-signature': `t=${nowSec},s=${signatureHex}`
    },
    payload: rawBody
  });
  assert.equal(resDuplicate.statusCode, 200);
  assert.equal(JSON.parse(resDuplicate.body).duplicate, true);
});

test('Fastify Routes : Canal C Formulaire de secours (/recover)', async () => {
  const app = buildApp({ logger: false });

  // Rejet si transaction_id manquant ou non connecté
  const resRecoverNoAuth = await app.inject({
    method: 'POST',
    url: '/dashboard/abonnement/recover',
    payload: { transaction_id: '12345' }
  });
  assert.equal(resRecoverNoAuth.statusCode, 401);

  const resRecoverEmpty = await app.inject({
    method: 'POST',
    url: '/api/fedapay/recover',
    payload: {}
  });
  assert.equal(resRecoverEmpty.statusCode, 401);
});
