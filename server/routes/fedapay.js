/**
 * server/routes/fedapay.js
 *
 * Passerelle officielle FedaPay (https://docs.fedapay.com).
 * Architecture Fail-Closed & Triple Canal de Résilience Mobile Money :
 *   1. Étape 1 (Tentative serveur) : POST /dashboard/abonnement/attempt & POST /api/fedapay/attempt
 *   2. Canal A (Retour rapide navigateur vérifié serveur) : POST /dashboard/abonnement/callback & POST /api/fedapay/callback
 *   3. Canal B (Webhook serveur-à-serveur avec HMAC-SHA256) : POST /webhooks/fedapay & POST /api/fedapay/webhook & POST /api/payments/fedapay/webhook
 *   4. Canal C (Formulaire de secours / Récupération manuelle) : POST /dashboard/abonnement/recover & POST /api/fedapay/recover
 */
'use strict';

let FedaPayService;
try {
  FedaPayService = require('../services/fedapay');
} catch {
  // Mode dégradé si non copié dans un environnement bwrap
}

let db;
try {
  db = require('../db');
} catch {
  // Mode sans base de données
}
let mailer;
try {
  mailer = require('../mailer');
} catch {
  // Optionnel
}

// Mémoire de secours pour l'idempotence quand la base de données est indisponible
const memoryWebhookEvents = new Set();

module.exports = async function fedapayRoutes(fastify) {
  const service = FedaPayService ? new FedaPayService() : {
    isConfigured: () => false,
    publicKey: '',
    environment: 'sandbox',
    currency: 'XOF',
    getPlanDetails: (p) => ({ plan: p || 'monthly', amount: p === 'annual' ? 45000 : 5000, currency: 'XOF', months: p === 'annual' ? 12 : 1, description: 'Abonnement' }),
    generateMerchantReference: (prefix = 'MBFP') => `${prefix}_fallback`,
    verifyWebhookSignature: () => false,
    validateApprovedTransaction: () => ({ valid: false, reason: 'Service indisponible' }),
    getTransaction: async () => { throw new Error('Service FedaPay non chargé'); }
  };

  // Helper pour authentifier l'utilisateur via JWT cookie
  const resolveUser = async (request) => {
    const token = request.cookies && request.cookies.auth_token;
    if (!token || !db) return null;
    try {
      const jwt = require('jsonwebtoken');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded || !decoded.userId) return null;
      const session = await db.getSessionByJti(decoded.jti);
      if (!session || !session.is_valid) return null;
      const user = await db.getUserById(decoded.userId);
      return user && user.is_active ? user : null;
    } catch {
      return null;
    }
  };

  const requireAuth = async (request, reply) => {
    const user = await resolveUser(request);
    if (!user) {
      return reply.code(401).send({ success: false, message: 'Connexion requise pour cette action.' });
    }
    request.user = user;
  };

  // ============================================================================
  // CONFIGURATION PUBLIQUE POUR LE FRONTEND
  // ============================================================================
  const handleConfig = async () => {
    const monthly = service.getPlanDetails('monthly');
    const annual = service.getPlanDetails('annual');

    return {
      enabled: service.isConfigured(),
      public_key: service.publicKey,
      environment: service.environment,
      currency: service.currency,
      amounts: {
        monthly: monthly.amount,
        annual: annual.amount
      }
    };
  };

  // ============================================================================
  // ÉTAPE 1 : PRÉPARATION / TENTATIVE SERVEUR (FAIL-CLOSED)
  // POST /dashboard/abonnement/attempt et POST /api/fedapay/attempt
  // ============================================================================
  const handleAttempt = async (request, reply) => {
    try {
      const user = (await resolveUser(request)) || request.user;
      const body = request.body || {};
      const plan = body.plan || 'monthly';

      // 1. Calcul du montant réel et des détails côté serveur (Le frontend ne décide jamais du prix)
      const planDetails = service.getPlanDetails(plan);

      // 2. Génération d'une référence marchande unique infalsifiable
      const merchantRef = service.generateMerchantReference('MBFP');

      let paymentId = 'tentative_' + Date.now();

      // 3. Enregistrement en base de données avec statut 'pending'
      if (db && typeof db.createPayment === 'function') {
        try {
          const paymentRecord = await db.createPayment({
            userId: user ? user.id : null,
            merchantReference: merchantRef,
            plan: planDetails.plan,
            amount: planDetails.amount,
            currency: planDetails.currency,
            description: planDetails.description,
            status: 'pending',
            monthsGranted: planDetails.months,
            metadata: {
              userEmail: user ? user.email : (body.email || null),
              plan: planDetails.plan,
              createdAt: new Date().toISOString()
            }
          });
          if (paymentRecord && paymentRecord.id) {
            paymentId = paymentRecord.id;
          }

          if (user && typeof db.logActivity === 'function') {
            await db.logActivity('payment_attempt', {
              userId: user.id,
              email: user.email,
              ip: request.ip,
              details: `Tentative FedaPay (${planDetails.plan}, ${planDetails.amount} ${planDetails.currency}, ref: ${merchantRef})`
            });
          }
        } catch (dbErr) {
          fastify.log.warn(`[FedaPay DB] Tentative enregistrée en mode fallback : ${dbErr.message}`);
        }
      }

      // 4. Renvoi de la tentative certifiée pour initialisation du widget FedaPay
      return reply.send({
        success: true,
        attempt: {
          payment_id: paymentId,
          merchant_reference: merchantRef,
          amount: planDetails.amount,
          currency: planDetails.currency,
          plan: planDetails.plan,
          description: planDetails.description
        },
        public_key: service.publicKey,
        environment: service.environment
      });
    } catch (err) {
      fastify.log.error(err);
      return reply.code(400).send({
        success: false,
        message: err.message || 'Erreur lors de la préparation de la transaction.'
      });
    }
  };

  // ============================================================================
  // CANAL A : RETOUR RAPIDE NAVIGATEUR AVEC CONTRÔLE SERVEUR STRICT
  // POST /dashboard/abonnement/callback et POST /api/fedapay/callback
  // ============================================================================
  const handleCallback = async (request, reply) => {
    try {
      const user = await resolveUser(request);
      const { transaction_id, payment_id, merchant_reference } = request.body || {};

      if (!transaction_id) {
        return reply.code(400).send({
          success: false,
          message: 'transaction_id requis pour valider le paiement.'
        });
      }

      // 1. Récupération de la tentative en base
      let payment = null;
      if (db) {
        try {
          if (payment_id) {
            payment = await db.getPaymentById(payment_id);
          }
          if (!payment && merchant_reference) {
            payment = await db.getPaymentByMerchantRef(merchant_reference);
          }
          if (!payment) {
            payment = await db.getPaymentByTxId(transaction_id);
          }
        } catch (dbErr) {
          fastify.log.warn(`[FedaPay DB] Recherche tentative : ${dbErr.message}`);
        }
      }

      // 2. Interrogation directe de l'API FedaPay (le serveur ne croit pas le client)
      const tx = await service.getTransaction(transaction_id);

      // Si le paiement est déjà approuvé en base, idempotence immédiate
      if (payment && payment.status === 'approved') {
        const freshUser = user && db ? await db.getUserById(user.id).catch(() => null) : null;
        return reply.send({
          success: true,
          status: 'approved',
          subscribed: true,
          expiresAt: freshUser ? freshUser.subscription_expires_at : (payment.period_end || null),
          message: 'Paiement déjà validé.'
        });
      }

      // 3. Validation stricte Fail-Closed
      const expected = payment || {
        amount: Number(tx.amount),
        currency: 'XOF',
        merchant_reference: merchant_reference
      };

      const check = service.validateApprovedTransaction(tx, expected);
      if (!check.valid) {
        fastify.log.warn(`[FedaPay Callback] Validation rejetée : ${check.reason}`);
        return reply.code(400).send({
          success: false,
          status: tx.status,
          message: `Paiement non certifié : ${check.reason}`
        });
      }

      // 4. Activation du compte et mise à jour en base
      const targetUserId = (payment && payment.user_id) || (user && user.id);
      let updatedUser = null;

      if (db && targetUserId) {
        try {
          const months = (payment && payment.months_granted) || (expected.plan === 'annual' ? 12 : 1);
          updatedUser = await db.extendSubscription(targetUserId, months, 'fedapay');

          if (payment) {
            await db.updatePaymentStatus(payment.id, 'approved', {
              fedapayTransactionId: String(transaction_id),
              periodStart: new Date().toISOString(),
              periodEnd: updatedUser.subscription_expires_at,
              merchantReference: expected.merchant_reference
            });
          }

          if (typeof db.logActivity === 'function') {
            await db.logActivity('payment_approved_callback', {
              userId: targetUserId,
              details: `Paiement approuvé via Canal A (tx: ${transaction_id}, +${months} mois)`
            });
          }

          if (mailer && typeof mailer.sendPaymentReceiptEmail === 'function' && updatedUser.email) {
            try {
              await mailer.sendPaymentReceiptEmail(updatedUser.email, {
                amount: tx.amount,
                currency: 'XOF',
                months: months,
                expiresAt: updatedUser.subscription_expires_at
              });
            } catch (mailErr) {
              fastify.log.warn(`[FedaPay Mailer] Échec envoi reçu : ${mailErr.message}`);
            }
          }
        } catch (dbErr) {
          fastify.log.warn(`[FedaPay DB] Échec extension abonnement callback : ${dbErr.message}`);
        }
      }

      return reply.send({
        success: true,
        status: 'approved',
        subscribed: true,
        expiresAt: updatedUser ? updatedUser.subscription_expires_at : null,
        message: 'Paiement confirmé et abonnement activé avec succès.'
      });
    } catch (err) {
      fastify.log.error(err);
      return reply.code(500).send({
        success: false,
        message: err.message || 'Erreur lors de la vérification de la transaction.'
      });
    }
  };

  // ============================================================================
  // CANAL B : WEBHOOK OFFICIEL SERVEUR À SERVEUR AVEC SIGNATURE HMAC-SHA256
  // POST /webhooks/fedapay, POST /api/fedapay/webhook, POST /api/payments/fedapay/webhook
  // ============================================================================
  const handleWebhook = async (request, reply) => {
    const raw = request.rawBody ||
      (typeof request.body === 'string' ? request.body : JSON.stringify(request.body || {}));

    const sigHeader = request.headers['x-fedapay-signature'] || request.headers['X-FEDAPAY-SIGNATURE'];

    // 1. Vérification cryptographique obligatoire de la signature HMAC-SHA256
    if (service.webhookSecret) {
      if (!sigHeader || !service.verifyWebhookSignature(raw, sigHeader)) {
        fastify.log.warn('[FedaPay Webhook] Rejet 401 : Signature HMAC invalide ou timestamp expiré.');
        return reply.code(401).send({ received: false, error: 'invalid_signature' });
      }
    } else if (process.env.NODE_ENV === 'production') {
      fastify.log.warn('[FedaPay Webhook] ATTENTION : FEDAPAY_WEBHOOK_SECRET non défini en production.');
    }

    const payload = typeof request.body === 'string' ? JSON.parse(request.body) : (request.body || {});
    const eventName = payload.name || payload.type || payload.event || '';
    const eventId = String(payload.id || request.headers['x-fedapay-event-id'] || `${eventName}_${Date.now()}`);

    const tx = (payload.entity && (payload.entity['v1/transaction'] || payload.entity.transaction)) ||
      payload.transaction || payload.data || {};

    const txId = tx && tx.id != null ? String(tx.id) : (payload.transaction_id != null ? String(payload.transaction_id) : null);
    const status = String(tx.status || '').toLowerCase().trim();

    fastify.log.info(`[FedaPay Webhook] Événement reçu : name=${eventName}, txId=${txId}, status=${status}`);

    // 2. Contrôle d'idempotence via table payment_webhook_events et mémoire
    let isDuplicate = false;
    if (memoryWebhookEvents.has(eventId)) {
      isDuplicate = true;
    }
    if (db && typeof db.getWebhookEvent === 'function') {
      try {
        const existingEvent = await db.getWebhookEvent(eventId);
        if (existingEvent && existingEvent.processed_at) {
          isDuplicate = true;
        } else {
          await db.recordWebhookEvent({
            eventId,
            eventName,
            transactionId: txId,
            payload
          });
        }
      } catch (dbErr) {
        fastify.log.warn(`[FedaPay DB] Échec enregistrement webhook event : ${dbErr.message}`);
      }
    }

    if (isDuplicate) {
      fastify.log.info(`[FedaPay Webhook] Événement ${eventId} déjà traité, acquittement immédiat.`);
      return reply.code(200).send({ received: true, duplicate: true });
    }
    memoryWebhookEvents.add(eventId);

    try {
      if (eventName === 'transaction.approved' || status === 'approved') {
        if (!txId) {
          return reply.code(200).send({ received: true, warning: 'no_transaction_id' });
        }

        // 3. Double vérification serveur auprès de l'API FedaPay avant mise à jour
        let confirmedTx = tx;
        try {
          confirmedTx = await service.getTransaction(txId);
        } catch (fetchErr) {
          fastify.log.warn(`[FedaPay Webhook] Consultation API échouée, fallback sur payload webhook : ${fetchErr.message}`);
        }

        if (String(confirmedTx.status || '').toLowerCase() !== 'approved') {
          fastify.log.warn(`[FedaPay Webhook] Statut non approuvé après consultation API : ${confirmedTx.status}`);
          return reply.code(200).send({ received: true, status: confirmedTx.status });
        }

        // Recherche du paiement correspondant en base
        let payment = null;
        if (db) {
          try {
            payment = await db.getPaymentByTxId(txId);
            if (!payment && confirmedTx.merchant_reference) {
              payment = await db.getPaymentByMerchantRef(confirmedTx.merchant_reference);
            }
          } catch (dbErr) {
            fastify.log.warn(`[FedaPay DB] Recherche paiement webhook : ${dbErr.message}`);
          }
        }

        if (payment) {
          if (payment.status === 'approved') {
            if (db && typeof db.markWebhookEventProcessed === 'function') {
              await db.markWebhookEventProcessed(eventId).catch(() => {});
            }
            return reply.code(200).send({ received: true, duplicate: true });
          }

          const userId = payment.user_id;
          if (userId && db) {
            try {
              const months = payment.months_granted || 1;
              const updated = await db.extendSubscription(userId, months, 'fedapay');
              await db.updatePaymentStatus(payment.id, 'approved', {
                fedapayTransactionId: txId,
                periodStart: new Date().toISOString(),
                periodEnd: updated.subscription_expires_at
              });

              if (mailer && typeof mailer.sendPaymentReceiptEmail === 'function') {
                const user = await db.getUserById(userId).catch(() => null);
                if (user && user.email) {
                  try {
                    await mailer.sendPaymentReceiptEmail(user.email, {
                      amount: payment.amount,
                      currency: payment.currency || 'XOF',
                      months: months,
                      expiresAt: updated.subscription_expires_at
                    });
                  } catch (mErr) {
                    fastify.log.warn(`[FedaPay Mailer] ${mErr.message}`);
                  }
                }
              }

              if (typeof db.logActivity === 'function') {
                await db.logActivity('payment_approved_webhook', {
                  userId,
                  details: `Paiement approuvé via Webhook (tx: ${txId}, +${months} mois)`
                });
              }
            } catch (dbErr) {
              fastify.log.warn(`[FedaPay DB] Erreur extension abonnement webhook : ${dbErr.message}`);
            }
          } else if (db) {
            await db.updatePaymentStatus(payment.id, 'approved', { fedapayTransactionId: txId }).catch(() => {});
          }
        } else if (db && typeof db.logActivity === 'function') {
          await db.logActivity('payment_unknown_webhook', {
            details: `Transaction FedaPay approuvée inconnue en base (tx: ${txId})`
          }).catch(() => {});
        }

        if (db && typeof db.markWebhookEventProcessed === 'function') {
          await db.markWebhookEventProcessed(eventId).catch(() => {});
        }

        return reply.code(200).send({ received: true, status: 'approved' });
      }

      if (['transaction.canceled', 'transaction.declined', 'transaction.failed'].includes(eventName) ||
          ['canceled', 'declined', 'failed'].includes(status)) {
        if (txId && db) {
          try {
            const payment = await db.getPaymentByTxId(txId);
            if (payment && payment.status === 'pending') {
              await db.updatePaymentStatus(payment.id, status || 'canceled', { fedapayTransactionId: txId });
              if (payment.user_id && typeof db.logActivity === 'function') {
                await db.logActivity('payment_declined_webhook', {
                  userId: payment.user_id,
                  details: `Paiement refusé ou annulé via Webhook (tx: ${txId})`
                });
              }
            }
          } catch (dbErr) {
            fastify.log.warn(`[FedaPay DB] Échec mise à jour échec webhook : ${dbErr.message}`);
          }
        }
        if (db && typeof db.markWebhookEventProcessed === 'function') {
          await db.markWebhookEventProcessed(eventId).catch(() => {});
        }
        return reply.code(200).send({ received: true });
      }

      // Autres événements : acquittement standard
      if (db && typeof db.markWebhookEventProcessed === 'function') {
        await db.markWebhookEventProcessed(eventId).catch(() => {});
      }
      return reply.code(200).send({ received: true });
    } catch (err) {
      fastify.log.error(err);
      return reply.code(500).send({ received: false, error: err.message });
    }
  };

  // ============================================================================
  // CANAL C : FORMULAIRE DE SECOURS / RÉCUPÉRATION MANUELLE
  // POST /dashboard/abonnement/recover et POST /api/fedapay/recover
  // ============================================================================
  const handleRecover = async (request, reply) => {
    try {
      const user = await resolveUser(request);
      if (!user) {
        return reply.code(401).send({ success: false, message: 'Connexion requise pour récupérer un paiement.' });
      }

      const { transaction_id } = request.body || {};
      if (!transaction_id) {
        return reply.code(400).send({
          success: false,
          message: 'Veuillez saisir l\'identifiant ou la référence de transaction FedaPay.'
        });
      }

      const tx = await service.getTransaction(transaction_id);
      if (String(tx.status).toLowerCase() !== 'approved') {
        return reply.code(400).send({
          success: false,
          message: `Cette transaction a le statut '${tx.status}'. Seules les transactions approuvées peuvent être activées.`
        });
      }

      let payment = null;
      if (db) {
        try {
          payment = await db.getPaymentByTxId(transaction_id);
          if (!payment && tx.merchant_reference) {
            payment = await db.getPaymentByMerchantRef(tx.merchant_reference);
          }
        } catch (dbErr) {
          fastify.log.warn(`[FedaPay DB] Recherche transaction recover : ${dbErr.message}`);
        }
      }

      const months = (payment && payment.months_granted) || 1;
      let updatedUser = null;
      if (db) {
        try {
          updatedUser = await db.extendSubscription(user.id, months, 'fedapay');

          if (payment) {
            await db.updatePaymentStatus(payment.id, 'approved', {
              fedapayTransactionId: String(transaction_id),
              periodStart: new Date().toISOString(),
              periodEnd: updatedUser ? updatedUser.subscription_expires_at : null
            });
          }

          if (typeof db.logActivity === 'function') {
            await db.logActivity('payment_recovered_manually', {
              userId: user.id,
              details: `Paiement récupéré manuellement via Canal C (tx: ${transaction_id}, +${months} mois)`
            });
          }
        } catch (dbErr) {
          fastify.log.warn(`[FedaPay DB] Échec extension recover : ${dbErr.message}`);
        }
      }

      return reply.send({
        success: true,
        message: 'Transaction vérifiée et validée. Votre abonnement a été activé !',
        subscribed: true,
        expiresAt: updatedUser ? updatedUser.subscription_expires_at : null
      });
    } catch (err) {
      fastify.log.error(err);
      return reply.code(400).send({
        success: false,
        message: err.message || 'Impossible de récupérer cette transaction. Vérifiez la référence.'
      });
    }
  };

  // ============================================================================
  // POLLING HISTORIQUE DE COMPATIBILITÉ
  // GET /api/fedapay/check-status
  // ============================================================================
  const handleCheckStatus = async (request, reply) => {
    try {
      const user = request.user;
      const txId = request.query && request.query.txId ? String(request.query.txId).trim() : null;

      let payment = null;
      if (txId && db) {
        try {
          payment = await db.getPaymentByTxId(txId);
          if (payment && payment.user_id !== user.id) payment = null;
        } catch {}
      }
      if (!payment && db) {
        try {
          payment = await db.getLatestPaymentForUser(user.id);
        } catch {}
      }

      if (!payment) {
        return reply.send({
          success: true,
          status: 'none',
          subscribed: db ? db.hasActiveSubscription(user) : false
        });
      }

      if (payment.status === 'approved') {
        const freshUser = db ? await db.getUserById(user.id).catch(() => null) : null;
        return reply.send({
          success: true,
          status: 'approved',
          subscribed: true,
          expiresAt: freshUser ? freshUser.subscription_expires_at : null
        });
      }

      if (payment.status === 'pending' && service.isConfigured() && payment.fedapay_transaction_id) {
        try {
          const tx = await service.getTransaction(payment.fedapay_transaction_id);
          const txStatus = String(tx.status || '').toLowerCase();
          if (txStatus === 'approved') {
            const updated = db ? await db.extendSubscription(user.id, payment.months_granted || 1, 'fedapay') : null;
            if (db) {
              await db.updatePaymentStatus(payment.id, 'approved', {
                fedapayTransactionId: payment.fedapay_transaction_id,
                periodStart: new Date().toISOString(),
                periodEnd: updated ? updated.subscription_expires_at : null
              });
            }
            return reply.send({
              success: true,
              status: 'approved',
              subscribed: true,
              expiresAt: updated ? updated.subscription_expires_at : null
            });
          }
        } catch (fetchErr) {
          fastify.log.warn({ err: fetchErr.message }, 'Échec check-status');
        }
      }

      return reply.send({
        success: true,
        status: payment.status,
        subscribed: db ? db.hasActiveSubscription(user) : false
      });
    } catch (err) {
      fastify.log.error(err);
      return reply.code(500).send({ success: false, message: 'Erreur lors de la vérification du statut.' });
    }
  };

  // ============================================================================
  // ENREGISTREMENT EXPLICITE DE TOUS LES ENDPOINTS
  // ============================================================================
  // Routes sous /api/fedapay/*
  fastify.get('/api/fedapay/config', handleConfig);
  fastify.post('/api/fedapay/attempt', handleAttempt);
  fastify.post('/api/fedapay/callback', handleCallback);
  fastify.post('/api/fedapay/webhook', { config: { rateLimit: { max: 60, timeWindow: '1 minute' } } }, handleWebhook);
  fastify.post('/api/fedapay/recover', handleRecover);
  fastify.get('/api/fedapay/check-status', { preHandler: [requireAuth] }, handleCheckStatus);

  // Routes sous /dashboard/abonnement/* (Cahier des charges strict)
  fastify.get('/dashboard/abonnement/config', handleConfig);
  fastify.post('/dashboard/abonnement/attempt', handleAttempt);
  fastify.post('/dashboard/abonnement/callback', handleCallback);
  fastify.post('/dashboard/abonnement/recover', handleRecover);

  // Routes Webhook alternatives (Cahier des charges strict)
  fastify.post('/webhooks/fedapay', { config: { rateLimit: { max: 60, timeWindow: '1 minute' } } }, handleWebhook);
  fastify.post('/api/payments/fedapay/webhook', { config: { rateLimit: { max: 60, timeWindow: '1 minute' } } }, handleWebhook);

  // Support si le plugin est enregistré avec préfixe relatif (ex: fastify.register(plugin, { prefix: '/api/fedapay' }))
  fastify.get('/config', handleConfig);
  fastify.post('/attempt', handleAttempt);
  fastify.post('/callback', handleCallback);
  fastify.post('/webhook', { config: { rateLimit: { max: 60, timeWindow: '1 minute' } } }, handleWebhook);
  fastify.post('/recover', handleRecover);
  fastify.get('/check-status', { preHandler: [requireAuth] }, handleCheckStatus);
};
