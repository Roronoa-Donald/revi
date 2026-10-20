const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

// ========================
// 1. Mots de passe (scrypt)
// ========================
const { hashPassword, verifyPassword, generateToken, sha256 } = require('../server/utils/password');

test('hashPassword produit un hash scrypt vérifiable', () => {
  const hash = hashPassword('MotDePasse123');
  assert.ok(hash.startsWith('scrypt$'));
  assert.ok(verifyPassword('MotDePasse123', hash));
  assert.ok(!verifyPassword('mauvais', hash));
});

test('hashPassword : sels différents pour un même mot de passe', () => {
  const h1 = hashPassword('abc12345');
  const h2 = hashPassword('abc12345');
  assert.notStrictEqual(h1, h2);
  assert.ok(verifyPassword('abc12345', h1));
  assert.ok(verifyPassword('abc12345', h2));
});

test('verifyPassword résiste aux entrées malformées', () => {
  assert.strictEqual(verifyPassword('x', ''), false);
  assert.strictEqual(verifyPassword('x', 'garbage'), false);
  assert.strictEqual(verifyPassword('x', 'md5$abc$def'), false);
  assert.strictEqual(verifyPassword('x', null), false);
});

test('generateToken : tokens uniques et URL-safe', () => {
  const t1 = generateToken();
  const t2 = generateToken();
  assert.notStrictEqual(t1, t2);
  assert.ok(/^[A-Za-z0-9_-]+$/.test(t1));
  assert.strictEqual(t1.length, 43); // 32 bytes base64url
});

test('sha256 : déterministe', () => {
  assert.strictEqual(sha256('abc'), sha256('abc'));
  assert.notStrictEqual(sha256('abc'), sha256('abd'));
});

// ========================
// 2. Webhook FedaPay : signature HMAC (t=…,s=…)
// ========================
const crypto = require('crypto');

function fedapaySign(payload, secret, timestamp = Math.floor(Date.now() / 1000)) {
  const sig = crypto.createHmac('sha256', secret).update(`${timestamp}.${payload}`, 'utf8').digest('hex');
  return `t=${timestamp},s=${sig}`;
}

// Réplique exacte de verifyWebhookSignature (routes/fedapay.js)
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

const WH_SECRET = 'wh_sandbox_test_secret';
const PAYLOAD = JSON.stringify({ name: 'transaction.approved', entity: { 'v1/transaction': { id: 42, status: 'approved' } } });

test('webhook FedaPay : signature valide acceptée', () => {
  const header = fedapaySign(PAYLOAD, WH_SECRET);
  assert.ok(verifyWebhookSignature(PAYLOAD, header, WH_SECRET));
});

test('webhook FedaPay : signature invalide rejetée', () => {
  const header = fedapaySign(PAYLOAD, 'wh_mauvais_secret');
  assert.ok(!verifyWebhookSignature(PAYLOAD, header, WH_SECRET));
});

test('webhook FedaPay : payload modifié rejeté', () => {
  const header = fedapaySign(PAYLOAD, WH_SECRET);
  const tampered = PAYLOAD.replace('42', '43');
  assert.ok(!verifyWebhookSignature(tampered, header, WH_SECRET));
});

test('webhook FedaPay : timestamp trop vieux rejeté (tolérance 5 min)', () => {
  const old = Math.floor(Date.now() / 1000) - 3600;
  const header = fedapaySign(PAYLOAD, WH_SECRET, old);
  assert.ok(!verifyWebhookSignature(PAYLOAD, header, WH_SECRET));
});

test('webhook FedaPay : header malformé rejeté', () => {
  assert.ok(!verifyWebhookSignature(PAYLOAD, '', WH_SECRET));
  assert.ok(!verifyWebhookSignature(PAYLOAD, 'garbage', WH_SECRET));
  assert.ok(!verifyWebhookSignature(PAYLOAD, 't=abc,s=zz', WH_SECRET));
});

// ========================
// 3. Politique de protection (miroir middleware.js)
// ========================
const COURSE_DIRS = ['linux', 'php', 'probabilites', 'rd_java', 'rd_winserver', 'admin-vm', 'droit', 'react', 'api-rest-flask', 'erp-si', 'ingenierie-besoin', 'masterclass-apprendre', 'RD-RO', 'assembleur', 'Cyber securite B2', 'sql', 'csharp', 'ccna', 'uml', 'uiux', 'docker', 'infographie', 'preparation-web', 'epreuves'];

function isProtectedPath(pathname) {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length < 1) return false;
  const courseName = parts[0];
  if (!COURSE_DIRS.includes(courseName)) return false;
  if (parts.length < 2) return courseName === 'epreuves' || courseName === 'preparation-web';
  if (courseName === 'epreuves') return true;
  if (courseName === 'preparation-web') {
    if (parts[1] === 'assets') return false;
    return true;
  }
  const filename = parts[parts.length - 1] || '';
  const isQcmData = /qcm/i.test(filename) && (filename.endsWith('.js') || filename.endsWith('.json'));
  if (isQcmData) return true;
  if (parts[1] === 'assets') return pathname.endsWith('.pdf');
  if (parts.length === 2 && (parts[1] === 'index.html' || parts[1] === '')) return false;
  if (parts[1] === 'chapitres' && parts.length >= 3 && parts[2] === 'chapitre1.html') return false;
  if (!pathname.endsWith('.html') && !pathname.endsWith('.pdf')) return false;
  return true;
}

test('chapitre 1 de chaque cours : gratuit (anonyme OK)', () => {
  for (const c of COURSE_DIRS) {
    if (c === 'epreuves' || c === 'preparation-web') continue;
    assert.ok(!isProtectedPath(`/${c}/chapitres/chapitre1.html`), `${c}/chapitre1 devrait être gratuit`);
  }
});

test('chapitre 2+ : payant', () => {
  assert.ok(isProtectedPath('/react/chapitres/chapitre2.html'));
  assert.ok(isProtectedPath('/linux/chapitres/chapitre5.html'));
  assert.ok(isProtectedPath('/sql/modules/mod01.html'));
});

test('index de cours + portail : gratuits et sans trace d\'abonnement', () => {
  for (const c of COURSE_DIRS) {
    // epreuves : tout payant ; preparation-web : section spéciale protégée même sur l'index
    if (c === 'epreuves' || c === 'preparation-web') continue;
    assert.ok(!isProtectedPath(`/${c}/index.html`), `${c}/index devrait être gratuit`);
  }
  assert.ok(!isProtectedPath('/index.html'));
  assert.ok(!isProtectedPath('/'));
});

test('epreuves : tout payant', () => {
  assert.ok(isProtectedPath('/epreuves/index.html'));
  assert.ok(isProtectedPath('/epreuves/b2-math.pdf'));
});

test('données QCM : toujours payantes', () => {
  assert.ok(isProtectedPath('/react/qcm-100.js'));
  assert.ok(isProtectedPath('/docker/qcm-data.json'));
});

test('assets non-PDF : gratuits ; PDF assets : payants', () => {
  assert.ok(!isProtectedPath('/react/assets/css/style.css'));
  assert.ok(isProtectedPath('/react/assets/docs/tp1.pdf'));
});

test('fichiers non-HTML/PDF hors cours : libres', () => {
  assert.ok(!isProtectedPath('/rd-ai-chat.js'));
  assert.ok(!isProtectedPath('/robots.txt'));
});

// ========================
// 4. Admin Dashboard : Sécurité et syntaxe
// ========================
const vm = require('vm');

test('public/admin/dashboard.html & login.html : scripts valides sans syntax error', () => {
  const dashHtml = fs.readFileSync(path.join(__dirname, '..', 'public', 'admin', 'dashboard.html'), 'utf8');
  const dashScripts = [...dashHtml.matchAll(/<script[\s\S]*?>([\s\S]*?)<\/script>/gi)];
  assert.ok(dashScripts.length >= 2, 'dashboard.html doit contenir au moins 2 balises script');
  for (const [i, m] of dashScripts.entries()) {
    assert.doesNotThrow(() => {
      new vm.Script(m[1]);
    }, `dashboard.html: script #${i} a une erreur de syntaxe`);
  }

  const loginHtml = fs.readFileSync(path.join(__dirname, '..', 'public', 'admin', 'login.html'), 'utf8');
  const loginScripts = [...loginHtml.matchAll(/<script[\s\S]*?>([\s\S]*?)<\/script>/gi)];
  for (const [i, m] of loginScripts.entries()) {
    assert.doesNotThrow(() => {
      new vm.Script(m[1]);
    }, `login.html: script #${i} a une erreur de syntaxe`);
  }
});

test('public/admin/dashboard.html : garde anti-flash et redirection client', () => {
  const dashHtml = fs.readFileSync(path.join(__dirname, '..', 'public', 'admin', 'dashboard.html'), 'utf8');
  assert.ok(dashHtml.includes('body { display: none; }'), 'le body doit être masqué par défaut');
  assert.ok(dashHtml.includes('/api/admin/verify'), 'doit vérifier /api/admin/verify');
  assert.ok(dashHtml.includes('window.location.replace(\'/_auth/admin/login.html\')'), 'doit rediriger vers le login en cas de non-auth');
});

test('middleware.js : intercepte /_auth/admin/dashboard', () => {
  const middlewareSrc = fs.readFileSync(path.join(__dirname, '..', 'middleware.js'), 'utf8');
  assert.ok(middlewareSrc.includes('/_auth/admin/dashboard'), 'middleware.js doit cibler /_auth/admin/dashboard');
  assert.ok(middlewareSrc.includes('/api/admin/verify'), 'middleware.js doit appeler /api/admin/verify');
  assert.ok(middlewareSrc.includes('/_auth/admin/login.html'), 'middleware.js doit rediriger vers /_auth/admin/login.html');
});

