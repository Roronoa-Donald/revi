/**
 * server/services/fedapay.js
 *
 * Service officiel d'intégration FedaPay (https://docs.fedapay.com).
 * Spécifications :
 *   - CDN Frontend : https://cdn.fedapay.com/checkout.js?v=1.1.7
 *   - API REST : https://api.fedapay.com/v1 (ou https://sandbox-api.fedapay.com/v1)
 *   - Double canal de vérification (Canal A : Callback client vérifié côté serveur,
 *     Canal B : Webhook signé HMAC-SHA256, Canal C : Formulaire de secours)
 *   - Règle Fail-Closed : validation stricte status, amount, currency et merchant_reference
 */
'use strict';

const crypto = require('node:crypto');

// Montants par défaut certifiés serveur (FCFA)
const DEFAULT_PRICING = {
  monthly: {
    amount: 5000,
    months: 1,
    description: 'Abonnement Mensuel'
  },
  annual: {
    amount: 45000,
    months: 12,
    description: 'Abonnement Annuel'
  }
};

class FedaPayService {
  /**
   * @param {Object} [options]
   * @param {string} [options.publicKey] Clé publique (pk_live_... ou pk_sandbox_...)
   * @param {string} [options.secretKey] Clé secrète (sk_live_... ou sk_sandbox_...)
   * @param {string} [options.webhookSecret] Secret webhook (wh_live_... ou wh_sandbox_...)
   * @param {string} [options.environment] 'sandbox' ou 'live'
   * @param {string} [options.currency] Devise ISO ('XOF' par défaut)
   */
  constructor(options = {}) {
    this.publicKey = String(
      options.publicKey || process.env.FEDAPAY_PUBLIC_KEY || ''
    ).trim();

    this.secretKey = String(
      options.secretKey || process.env.FEDAPAY_SECRET_KEY || ''
    ).trim().replace(/^['"]|['"]$/g, '');

    this.webhookSecret = String(
      options.webhookSecret || process.env.FEDAPAY_WEBHOOK_SECRET || ''
    ).trim().replace(/^['"]|['"]$/g, '');

    const explicitEnv = (options.environment || process.env.FEDAPAY_ENVIRONMENT || '').toLowerCase().trim();
    if (explicitEnv === 'live' || explicitEnv === 'sandbox') {
      this.environment = explicitEnv;
    } else {
      // Détection automatique : clé sandbox => sandbox, sinon live
      this.environment = (this.secretKey.includes('sandbox') || this.publicKey.includes('sandbox'))
        ? 'sandbox'
        : 'live';
    }

    this.currency = (options.currency || process.env.FEDAPAY_CURRENCY || 'XOF').toUpperCase().trim();

    this.apiBase = this.environment === 'sandbox'
      ? 'https://sandbox-api.fedapay.com/v1'
      : 'https://api.fedapay.com/v1';
  }

  isConfigured() {
    return Boolean(this.secretKey);
  }

  /**
   * Retourne la formule certifiée côté serveur (Fail-Closed)
   * Le frontend ne décide jamais du prix.
   */
  getPlanDetails(planInput) {
    const raw = String(planInput || '').toLowerCase().trim();
    let planKey = 'monthly';
    if (raw === 'annual' || raw === 'annuel' || raw === '12' || raw === 'year' || raw === 'yearly') {
      planKey = 'annual';
    } else if (raw === 'monthly' || raw === 'mensuel' || raw === '1' || raw === 'month' || raw === '') {
      planKey = 'monthly';
    } else {
      throw new Error(`[FedaPay] Formule inconnue : '${planInput}'. Formules acceptées : 'monthly', 'annual'.`);
    }

    const base = DEFAULT_PRICING[planKey];
    const envMonthly = Number(process.env.FEDAPAY_AMOUNT_MONTHLY || process.env.FEDAPAY_AMOUNT);
    const envAnnual = Number(process.env.FEDAPAY_AMOUNT_ANNUAL);

    const amount = planKey === 'monthly'
      ? (Number.isFinite(envMonthly) && envMonthly > 0 ? envMonthly : base.amount)
      : (Number.isFinite(envAnnual) && envAnnual > 0 ? envAnnual : base.amount);

    return {
      plan: planKey,
      amount,
      currency: this.currency,
      months: base.months,
      description: base.description
    };
  }

  /**
   * Génère une référence marchande unique et infalsifiable
   * Format: "MBFP_<uuid>"
   */
  generateMerchantReference(prefix = 'MBFP') {
    let randStr;
    if (typeof crypto.randomUUID === 'function') {
      randStr = crypto.randomUUID().replace(/-/g, '');
    } else {
      randStr = crypto.randomBytes(16).toString('hex');
    }
    return `${prefix}_${randStr}`;
  }

  /**
   * Récupère les détails d'une transaction directement auprès de l'API FedaPay
   * GET /v1/transactions/:id
   */
  async getTransaction(transactionId) {
    if (!this.secretKey) {
      throw new Error('[FedaPay] Clé secrète FEDAPAY_SECRET_KEY manquante pour interroger l’API.');
    }
    if (!transactionId) {
      throw new Error('[FedaPay] transactionId obligatoire pour interroger FedaPay.');
    }

    const url = `${this.apiBase}/transactions/${encodeURIComponent(transactionId)}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.secretKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    const text = await response.text();
    let json = null;
    try {
      json = text ? JSON.parse(text) : null;
    } catch {
      // Ignorer l'erreur de parsing
    }

    if (!response.ok) {
      const msg = (json && (json.message || json.errors)) || text || `HTTP ${response.status}`;
      throw new Error(`[FedaPay API] Erreur récupération transaction ${transactionId} : ${msg}`);
    }

    const tx = (json && (json['v1/transaction'] || json.transaction)) || json;
    return tx;
  }

  /**
   * Validation stricte Fail-Closed d'une transaction FedaPay :
   *   1. status === 'approved'
   *   2. amount === montant attendu en base
   *   3. currency === 'XOF' (ou ID 1)
   *   4. merchant_reference === référence attendue
   */
  validateApprovedTransaction(tx, expectedPayment) {
    if (!tx || typeof tx !== 'object') {
      return { valid: false, reason: 'Transaction FedaPay vide ou invalide' };
    }

    // 1. Statut
    const status = String(tx.status || '').toLowerCase().trim();
    if (status !== 'approved') {
      return { valid: false, reason: `Statut '${status}' non approuvé` };
    }

    // 2. Montant exact
    const txAmount = Number(tx.amount);
    const expectedAmount = Number(expectedPayment.amount);
    if (!Number.isFinite(txAmount) || txAmount !== expectedAmount) {
      return {
        valid: false,
        reason: `Montant non concordant (attendu: ${expectedAmount}, reçu FedaPay: ${txAmount})`
      };
    }

    // 3. Devise (XOF / CFA)
    let txCurrency = '';
    if (typeof tx.currency === 'object' && tx.currency) {
      txCurrency = String(tx.currency.iso || '').toUpperCase();
    } else if (typeof tx.currency === 'string') {
      txCurrency = tx.currency.toUpperCase();
    } else if (tx.currency_id === 1) {
      txCurrency = 'XOF';
    }
    const expectedCurrency = String(expectedPayment.currency || this.currency).toUpperCase();
    if (txCurrency && txCurrency !== expectedCurrency) {
      return {
        valid: false,
        reason: `Devise non concordante (attendue: ${expectedCurrency}, reçue FedaPay: ${txCurrency})`
      };
    }

    // 4. Référence marchande
    const expectedRef = expectedPayment.merchant_reference || expectedPayment.merchantReference;
    if (expectedRef) {
      const txRef = tx.merchant_reference ||
        (tx.custom_metadata && (tx.custom_metadata.merchant_reference || tx.custom_metadata.merchantReference));

      if (txRef && txRef !== expectedRef) {
        return {
          valid: false,
          reason: `Référence marchande non concordante (attendue: ${expectedRef}, reçue FedaPay: ${txRef})`
        };
      }
    }

    return { valid: true };
  }

  /**
   * Vérifie la signature cryptographique du Webhook FedaPay sans SDK :
   * Format header : X-FEDAPAY-SIGNATURE: t=<timestamp>,s=<signature_hex>
   * Calcul : HMAC_SHA256(secret, `${timestamp}.${rawBody}`) === signature_hex
   * Anti-rejeu : tolérance 5 minutes (300 secondes)
   */
  verifyWebhookSignature(rawBody, header, overrideSecret) {
    const secret = overrideSecret || this.webhookSecret;
    if (!secret || !rawBody || !header) {
      return false;
    }

    try {
      const parts = String(header).split(',').reduce((acc, item) => {
        const idx = item.indexOf('=');
        if (idx > 0) {
          const k = item.slice(0, idx).trim();
          const v = item.slice(idx + 1).trim();
          if (k === 't') acc.t = v;
          if (k === 's') acc.sigs.push(v);
        }
        return acc;
      }, { t: null, sigs: [] });

      if (!parts.t || parts.sigs.length === 0) {
        return false;
      }

      // 1. Contrôle anti-rejeu : tolérance 5 minutes (300s)
      const timestamp = parseInt(parts.t, 10);
      if (isNaN(timestamp)) {
        return false;
      }
      const nowSec = Math.floor(Date.now() / 1000);
      const age = nowSec - timestamp;
      if (Math.abs(age) > 300) {
        return false;
      }

      // 2. Calcul HMAC-SHA256
      const bodyStr = typeof rawBody === 'string' ? rawBody : rawBody.toString('utf8');
      const payloadToSign = `${parts.t}.${bodyStr}`;
      const expectedHex = crypto
        .createHmac('sha256', secret)
        .update(payloadToSign, 'utf8')
        .digest('hex');

      const expectedBuffer = Buffer.from(expectedHex, 'utf8');

      // 3. Comparaison en temps constant contre les attaques temporelles
      return parts.sigs.some(candidateSig => {
        const candidateBuffer = Buffer.from(String(candidateSig).trim(), 'utf8');
        return (
          candidateBuffer.length === expectedBuffer.length &&
          crypto.timingSafeEqual(candidateBuffer, expectedBuffer)
        );
      });
    } catch {
      return false;
    }
  }
}

module.exports = FedaPayService;
