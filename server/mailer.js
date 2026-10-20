/**
 * Envoi d'emails via SMTP (Gmail App Password).
 * nodemailer est chargé paresseusement : la fonctionnalité est optionnelle.
 * Sans SMTP_* configuré, les emails sont simplement journalisés (mode dev).
 *
 * Vars :
 *   SMTP_HOST (défaut smtp.gmail.com), SMTP_PORT (défaut 465),
 *   SMTP_USER, SMTP_PASS, MAIL_FROM (défaut SMTP_USER)
 */
let _transporter = null;

function isConfigured() {
  return Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);
}

function getTransporter() {
  if (_transporter) return _transporter;
  const nodemailer = require('nodemailer');
  _transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT || 465),
    secure: Number(process.env.SMTP_PORT || 465) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
  return _transporter;
}

/**
 * Envoie un email simple. Retourne { sent, error? }.
 * N'échoue jamais fort : en prod un échec SMTP ne doit pas casser la requête.
 */
async function sendMail({ to, subject, text, html }) {
  if (!isConfigured()) {
    console.log(` [SMTP non configuré] À: ${to} — Sujet: ${subject}`);
    if (text) console.log(`   ${text.slice(0, 300)}`);
    return { sent: false, reason: 'smtp_not_configured' };
  }
  try {
    const transporter = getTransporter();
    await transporter.sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to,
      subject,
      text,
      html: html || undefined
    });
    return { sent: true };
  } catch (err) {
    console.error(' Erreur envoi email:', err.message);
    return { sent: false, reason: err.message };
  }
}

/**
 * Email de réinitialisation de mot de passe.
 * Lien : {BASE_URL}/_auth/login.html?reset=<token>
 */
async function sendPasswordResetEmail(email, resetUrl) {
  const subject = 'Réinitialisation de ton mot de passe — Cours Interactifs';
  const text =
`Salut !

Tu as demandé la réinitialisation de ton mot de passe.

Clique ici pour choisir un nouveau mot de passe :
${resetUrl}

Ce lien expire dans 30 minutes et ne peut être utilisé qu'une seule fois.
Si tu n'es pas à l'origine de cette demande, ignore simplement cet email.

— Cours Interactifs`;
  const html =
`<div style="font-family:monospace,sans-serif;max-width:560px;margin:0 auto;padding:24px;background:#f5f3f1;border-radius:16px;">
  <h2 style="color:#141414;margin:0 0 12px;">Réinitialisation de mot de passe</h2>
  <p style="color:#57534e;font-size:14px;line-height:1.6;">
    Tu as demandé la réinitialisation de ton mot de passe.<br>
    Clique sur le bouton ci-dessous pour en choisir un nouveau.
  </p>
  <p style="margin:24px 0;">
    <a href="${resetUrl}" style="display:inline-block;background:#29cc57;color:#14320f;font-weight:700;padding:12px 24px;border-radius:60px;text-decoration:none;">
      Choisir un nouveau mot de passe
    </a>
  </p>
  <p style="color:#78716c;font-size:12px;">
    Ce lien expire dans 30 minutes et ne peut être utilisé qu'une seule fois.<br>
    Si tu n'es pas à l'origine de cette demande, ignore simplement cet email.
  </p>
  <p style="color:#141414;font-size:13px;">— Cours Interactifs</p>
</div>`;
  return sendMail({ to: email, subject, text, html });
}

/**
 * Email de confirmation de paiement / renouvellement.
 */
async function sendPaymentReceiptEmail(email, { amount, currency, expiresAt, months }) {
  const fmt = new Intl.NumberFormat('fr-FR').format(amount);
  const expiry = expiresAt ? new Date(expiresAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : '—';
  const subject = `Paiement confirmé — accès ${months} mois`;
  const text =
`Paiement reçu, merci !

Montant : ${fmt} ${currency}
Accès accordé : ${months} mois, jusqu'au ${expiry}

Bon apprentissage !
— Cours Interactifs`;
  const html =
`<div style="font-family:monospace,sans-serif;max-width:560px;margin:0 auto;padding:24px;background:#f5f3f1;border-radius:16px;">
  <h2 style="color:#141414;margin:0 0 12px;">Paiement confirmé</h2>
  <p style="color:#57534e;font-size:14px;line-height:1.6;">
    Merci ! Ton accès est prolongé de <strong>${months} mois</strong>.
  </p>
  <table style="width:100%;border-collapse:collapse;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e4e4e4;">
    <tr><td style="padding:10px 14px;color:#57534e;">Montant</td><td style="padding:10px 14px;text-align:right;font-weight:700;color:#141414;">${fmt} ${currency}</td></tr>
    <tr><td style="padding:10px 14px;color:#57534e;border-top:1px solid #e4e4e4;">Valide jusqu'au</td><td style="padding:10px 14px;text-align:right;font-weight:700;color:#141414;border-top:1px solid #e4e4e4;">${expiry}</td></tr>
  </table>
  <p style="color:#78716c;font-size:12px;margin-top:16px;">Bon apprentissage ! — Cours Interactifs</p>
</div>`;
  return sendMail({ to: email, subject, text, html });
}

module.exports = {
  isConfigured,
  sendMail,
  sendPasswordResetEmail,
  sendPaymentReceiptEmail
};
