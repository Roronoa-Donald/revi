/**
 * FedaPay — paiement d'abonnement (1000 XOF / mois) + webhook.
 *
 * Flux checkout (API REST, fetch natif — pas de SDK) :
 *   1. POST {API}/v1/transactions            → transaction (description, amount, callback_url, customer)
 *   2. POST {API}/v1/transactions/{id}/token → { token, url }
 *   3. Le client paie sur `url` (mobile money / carte)
 *   4. FedaPay appelle notre webhook (X-FEDAPAY-SIGNATURE: t=…,s=HMAC_SHA256(timestamp + '.' + body))
 *
 * Events traités : transaction.approved (abonnement prolongé), transaction.canceled/declined (log).
 *
 * Env requis : FEDAPAY_SECRET_KEY (sk_live_… / sk_sandbox_…),
 *              FEDAPAY_WEBHOOK_SECRET (wh_sandbox… / wh_…), optionnels :
 *              FEDAPAY_ENVIRONMENT=live|sandbox (défaut sandbox si clé sandbox), FEDAPAY_AMOUNT (défaut 1000).
 */
const crypto = require('crypto');
const db = require('../db');
const mailer = require('../mailer');

const DEFAULT_AMOUNT = Number(process.env.FEDAPAY_AMOUNT || 1000);
const DEFAULT_MONTHS = 1;

function getSecretKey() {
  return String(process.env.FEDAPAY_SECRET_KEY || '').trim().replace(/^['"]|['"]$/g, '');
}

function apiBase() {
  const key = getSecretKey();
  const env = (process.env.FEDAPAY_ENVIRONMENT || '').toLowerCase().trim();
  if (env === 'live') return 'https://api.fedapay.com';
  if (env === 'sandbox') return 'https://sandbox-api.fedapay.com';
  // Auto : clé sandbox → sandbox, sinon live
  return key.includes('sandbox')
    ? 'https://sandbox-api.fedapay.com'
    : 'https://api.fedapay.com';
}

function isConfigured() {
  const key = getSecretKey();
  return Boolean(key);
}

function authHeader() {
  const key = getSecretKey();
  if (key.startsWith('pk_')) {
    throw new Error('La clé FEDAPAY_SECRET_KEY configurée commence par pk_ (clé publique). Tu dois renseigner la clé SECRÈTE (sk_live_... ou sk_sandbox_...).');
  }
  return { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' };
}

async function fedapayFetch(path, opts = {}) {
  const url = apiBase() + path;
  const res = await fetch(url, { ...opts, headers: { ...authHeader(), ...(opts.headers || {}) } });
  const text = await res.text();
  let json = null;
  try { json = text ? JSON.parse(text) : null; } catch (e) { /* réponse non JSON */ }
  if (!res.ok) {
    const errorDetails = (json && (json.message || (json.errors ? JSON.stringify(json.errors) : null))) || text || `HTTP ${res.status}`;
    throw new Error(`FedaPay ${path} : ${errorDetails}`);
  }
  return json;
}

/**
 * Crée la transaction + le token de checkout. Retourne { token, url, transactionId }.
 */
async function createCheckout({ user, amount, description, callbackUrl, metadata }) {
  const nameParts = (user.display_name || '').trim().split(/\s+/).filter(Boolean);
  const firstname = nameParts[0] || (user.email ? user.email.split('@')[0] : 'Apprenant');
  const lastname = nameParts.slice(1).join(' ') || 'Etudiant';

  const txRes = await fedapayFetch('/v1/transactions', {
    method: 'POST',
    body: JSON.stringify({
      description: description || 'Abonnement Cours Interactifs',
      amount,
      currency: { iso: 'XOF' },
      callback_url: callbackUrl,
      customer: {
        email: user.email,
        firstname: firstname,
        lastname: lastname
      },
      custom_metadata: metadata || {}
    })
  });

  const tx = txRes && txRes['v1/transaction'] ? txRes['v1/transaction'] : (txRes.transaction || txRes);
  const txId = tx && tx.id;
  if (!txId) {
    throw new Error('Transaction FedaPay créée mais aucun identifiant retourné.');
  }

  const tokenRes = await fedapayFetch(`/v1/transactions/${txId}/token`, { method: 'POST', body: '{}' });
  const tokenData = tokenRes || {};
  const token = tokenData.token || (tokenData['v1/token'] && tokenData['v1/token'].token);
  const url = tokenData.url || (tokenData['v1/token'] && tokenData['v1/token'].url);

  if (!url) {
    throw new Error('FedaPay n\'a pas renvoyé d\'URL de paiement pour cette transaction.');
  }

  return { token, url, transactionId: txId };
}

/**
 * Vérifie la signature webhook FedaPay sans SDK :
 * header `X-FEDAPAY-SIGNATURE: t=<unix>,s=<hex>` ; signature = HMAC_SHA256(secret, `${t}.${payload}`).
 * Tolérance : 5 minutes (comme le SDK officiel).
 */
function verifyWebhookSignature(rawBody, header, secret) {
  try {
    const parts = String(header || '').split(',').reduce((acc, item) => {
      const [k, v] = item.split('=');
      if (k === 't') acc.t = v;
      if (k === 's') acc.sigs.push(v);
      return acc;
    }, { t: null, sigs: [] });

    if (!parts.t || !parts.sigs.length) return false;

    const expected = crypto.createHmac('sha256', secret).update(`${parts.t}.${rawBody}`, 'utf8').digest('hex');
    const ok = parts.sigs.some(s => {
      const a = Buffer.from(String(s), 'hex');
      const b = Buffer.from(expected, 'hex');
      return a.length === b.length && crypto.timingSafeEqual(a, b);
    });
    if (!ok) return false;

    const age = Math.floor(Date.now() / 1000) - parseInt(parts.t, 10);
    return Math.abs(age) <= 300;
  } catch (e) {
    return false;
  }
}

module.exports = async function fedapayRoutes(fastify) {

  const requireAuth = async (request, reply) => {
    const token = request.cookies.auth_token;
    if (!token) return reply.code(401).send({ success: false, message: 'Connexion requise.' });
    let decoded;
    try { decoded = jwtVerify(token); } catch (e) { return reply.code(401).send({ success: false, message: 'Session invalide.' }); }
    const session = await db.getSessionByJti(decoded.jti);
    if (!session || !session.is_valid || !decoded.userId) return reply.code(401).send({ success: false, message: 'Session invalide.' });
    const user = await db.getUserById(decoded.userId);
    if (!user || !user.is_active) return reply.code(401).send({ success: false, message: 'Compte invalide.' });
    request.fedapayUser = user;
  };

  function jwtVerify(token) {
    const jwt = require('jsonwebtoken');
    return jwt.verify(token, process.env.JWT_SECRET);
  }

  /**
   * GET /api/fedapay/config — le front sait si le paiement est actif
   */
  fastify.get('/config', async () => {
    return { enabled: isConfigured(), amount: DEFAULT_AMOUNT, currency: 'XOF' };
  });

  /**
   * POST /api/fedapay/checkout — lance un paiement (user connecté requis)
   */
  fastify.post('/checkout', { preHandler: [requireAuth] }, async (request, reply) => {
    try {
      if (!isConfigured()) {
        return reply.code(503).send({ success: false, message: 'Paiement en ligne bientôt disponible. Contacte l\'administrateur.' });
      }

      const user = request.fedapayUser;
      const months = Math.max(1, Math.min(12, Number((request.body || {}).months || DEFAULT_MONTHS)));
      const amount = DEFAULT_AMOUNT * months;

      const host = request.headers['x-forwarded-host'] || request.headers.host;
      const proto = request.headers['x-forwarded-proto'] || (request.headers.host && request.headers.host.includes('localhost') ? 'http' : 'https');
      const base = (process.env.BASE_URL || `${proto}://${host}`).replace(/\/+$/, '');
      const callbackUrl = `${base}/_auth/account.html?payment=return`;

      const checkout = await createCheckout({
        user,
        amount,
        description: `Abonnement Cours Interactifs — ${months} mois`,
        callbackUrl,
        metadata: { userId: user.id, months }
      });

      await db.createPayment({
        userId: user.id,
        fedapayTransactionId: String(checkout.transactionId),
        amount,
        currency: 'XOF',
        description: `Abonnement ${months} mois`,
        status: 'pending',
        monthsGranted: months,
        metadata: { months, token: checkout.token }
      });

      await db.logActivity('payment_started', {
        userId: user.id,
        email: user.email,
        ip: request.ip,
        details: `Checkout FedaPay créé (${amount} XOF, ${months} mois)`
      });

      return reply.send({ success: true, url: checkout.url, token: checkout.token });
    } catch (err) {
      fastify.log.error(err);
      const detail = err && err.message ? err.message : 'Erreur lors de la création du paiement.';
      return reply.code(502).send({ success: false, message: detail, error: detail });
    }
  });

  /**
   * GET /api/fedapay/check-status — vérifie le statut réel du paiement au retour FedaPay
   */
  fastify.get('/check-status', { preHandler: [requireAuth] }, async (request, reply) => {
    try {
      const user = request.fedapayUser;
      const txId = request.query && request.query.txId ? String(request.query.txId).trim() : null;

      let payment = null;
      if (txId) {
        payment = await db.getPaymentByTxId(txId);
        if (payment && payment.user_id !== user.id) payment = null;
      }
      if (!payment) {
        payment = await db.getLatestPaymentForUser(user.id);
      }

      if (!payment) {
        return reply.send({
          success: true,
          status: 'none',
          subscribed: db.hasActiveSubscription(user)
        });
      }

      // Si le paiement est déjà approuvé en base
      if (payment.status === 'approved') {
        const freshUser = await db.getUserById(user.id);
        return reply.send({
          success: true,
          status: 'approved',
          subscribed: true,
          expiresAt: freshUser.subscription_expires_at
        });
      }

      // Si le statut est en attente et que FedaPay est configuré, interroger directement FedaPay
      if (payment.status === 'pending' && isConfigured() && payment.fedapay_transaction_id) {
        try {
          const res = await fedapayFetch(`/v1/transactions/${payment.fedapay_transaction_id}`);
          const tx = (res && (res['v1/transaction'] || res.transaction)) || res || {};
          const txStatus = tx.status || '';

          if (txStatus === 'approved') {
            const updated = await db.extendSubscription(user.id, payment.months_granted || 1, 'fedapay');
            await db.updatePaymentStatus(payment.id, 'approved', {
              fedapayTransactionId: payment.fedapay_transaction_id,
              periodStart: new Date().toISOString(),
              periodEnd: updated.subscription_expires_at
            });
            await db.logActivity('payment_approved', {
              userId: user.id,
              email: user.email,
              details: `Paiement approuvé via contrôle synchrone : +${payment.months_granted || 1} mois`
            });
            return reply.send({
              success: true,
              status: 'approved',
              subscribed: true,
              expiresAt: updated.subscription_expires_at
            });
          }

          if (txStatus === 'canceled' || txStatus === 'declined' || txStatus === 'failed') {
            await db.updatePaymentStatus(payment.id, txStatus, {
              fedapayTransactionId: payment.fedapay_transaction_id
            });
            return reply.send({
              success: true,
              status: txStatus,
              subscribed: false
            });
          }

          return reply.send({
            success: true,
            status: txStatus || 'pending',
            subscribed: false
          });
        } catch (fetchErr) {
          fastify.log.warn({ err: fetchErr.message }, 'Échec interrogation FedaPay transaction status');
        }
      }

      return reply.send({
        success: true,
        status: payment.status,
        subscribed: db.hasActiveSubscription(user)
      });
    } catch (err) {
      fastify.log.error(err);
      return reply.code(500).send({ success: false, message: 'Erreur lors de la vérification du statut.' });
    }
  });

  /**
   * POST /api/fedapay/webhook — notifications FedaPay (public, signé)
   * IMPORTANT : route publique → le body brut est requis pour la vérif HMAC.
   */
  fastify.post('/webhook', {
    config: {
      rateLimit: { max: 60, timeWindow: '1 minute' }
    }
  }, async (request, reply) => {
    const secret = process.env.FEDAPAY_WEBHOOK_SECRET;
    const raw = request.rawBody || (typeof request.body === 'string' ? request.body : JSON.stringify(request.body || {}));

    if (secret) {
      const sig = request.headers['x-fedapay-signature'];
      if (!verifyWebhookSignature(raw, sig, secret)) {
        return reply.code(400).send({ received: false, error: 'invalid_signature' });
      }
    } else if (process.env.NODE_ENV === 'production') {
      fastify.log.warn('FEDAPAY_WEBHOOK_SECRET non configuré : webhook accepté sans vérification !');
    }

    const event = typeof request.body === 'string' ? JSON.parse(request.body) : (request.body || {});
    const name = event.name || event.type || '';
    const tx = (event.entity && (event.entity['v1/transaction'] || event.entity.transaction)) || event.transaction || event.data || {};
    const txId = tx && tx.id != null ? String(tx.id) : (event.transaction_id != null ? String(event.transaction_id) : null);
    const status = tx.status || '';

    try {
      if (name === 'transaction.approved' || (name === '' && status === 'approved')) {
        const payment = txId ? await db.getPaymentByTxId(txId) : null;

        if (payment) {
          if (payment.status === 'approved') {
            return reply.send({ received: true, idempotent: true });
          }

          const user = payment.user_id ? await db.getUserById(payment.user_id) : null;
          if (user) {
            const updated = await db.extendSubscription(user.id, payment.months_granted || 1, 'fedapay');
            await db.updatePaymentStatus(payment.id, 'approved', {
              fedapayTransactionId: txId,
              periodStart: new Date().toISOString(),
              periodEnd: updated.subscription_expires_at
            });
            await mailer.sendPaymentReceiptEmail(user.email, {
              amount: payment.amount,
              currency: payment.currency || 'XOF',
              months: payment.months_granted || 1,
              expiresAt: updated.subscription_expires_at
            });
            await db.logActivity('payment_approved', {
              userId: user.id,
              email: user.email,
              details: `Paiement approuvé : +${payment.months_granted || 1} mois (jusqu'au ${updated.subscription_expires_at})`
            });
          } else {
            await db.updatePaymentStatus(payment.id, 'approved', { fedapayTransactionId: txId });
          }
        } else {
          // Paiement inconnu (créé hors de notre système) : on journalise
          await db.logActivity('payment_unknown_approved', {
            details: `Transaction FedaPay inconnue approuvée: ${txId}`
          });
        }
        return reply.send({ received: true });
      }

      if (name === 'transaction.canceled' || name === 'transaction.declined' || name === 'transaction.failed' || status === 'canceled' || status === 'declined') {
        const payment = txId ? await db.getPaymentByTxId(txId) : null;
        if (payment && payment.status === 'pending') {
          await db.updatePaymentStatus(payment.id, 'canceled', { fedapayTransactionId: txId });
          if (payment.user_id) {
            await db.logActivity('payment_canceled', {
              userId: payment.user_id,
              details: `Paiement annulé/échoué (${txId})`
            });
          }
        }
        return reply.send({ received: true });
      }

      // transaction.created et autres : accusé simple
      return reply.send({ received: true });
    } catch (err) {
      fastify.log.error(err);
      return reply.code(500).send({ received: false });
    }
  });
};
