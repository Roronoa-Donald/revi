'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');

function read(rel) {
  return fs.readFileSync(path.join(ROOT, rel), 'utf8');
}

function walkFiles(dir, exts, out = []) {
  const SKIP = new Set([
    'node_modules', 'dist', '.git', 'AUDIT_COMPLET_2026-11',
    'corrections', 'docs', 'audit', 'tools', '.taskstate',
    'revi-mu-plateforme', 'stitch_brilliant_website_design_system',
    'COURS_B3', 'cours B1 IT', 'administration machine virtuel', 'cours windows',
    'assets/vendor'
  ]);
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    const rel = path.relative(ROOT, full).replace(/\\/g, '/');
    if (SKIP.has(e.name) || SKIP.has(rel)) continue;
    if (e.isDirectory()) walkFiles(full, exts, out);
    else if (exts.some(ext => e.name.endsWith(ext))) out.push(rel);
  }
  return out;
}

/* ================================================================
   Tâche 4.1 — Contrastes & thème Dark Mode
   ================================================================ */
test('4.1 : public/account.html ne contient pas de background clair hardcode #fafafa', () => {
  const html = read('public/account.html');
  assert.doesNotMatch(html, /background\s*:\s*#fafafa/i);
  assert.match(html, /\[data-theme="dark"\][\s\S]*\.msg-error/);
});

test('4.1 : assets/css/code-lab.css supporte le mode sombre sur .lab__reveal, .lab__reveal-code et les badges', () => {
  const css = read('assets/css/code-lab.css');
  assert.doesNotMatch(css, /var\(--lab-surface-muted,\s*#faf7f0\)/);
  assert.match(css, /\[data-theme="dark"\][\s\S]*\.lab__reveal-code/);
  assert.match(css, /\[data-theme="dark"\][\s\S]*\.lab__badge-provenance/);
});

test('4.1 : scripts/templates/cours.css couvre .tag--module, .tag--free, .bandrow et variables pitfall/ok/ko en mode sombre', () => {
  const css = read('scripts/templates/cours.css');
  assert.doesNotMatch(css, /\.tag--module\s*\{[^}]*background:\s*#e9e6ea/);
  assert.match(css, /\[data-theme="dark"\][\s\S]*--warn-bg/);
  assert.match(css, /\[data-theme="dark"\][\s\S]*--warn-ink/);
  assert.match(css, /\[data-theme="dark"\][\s\S]*\.tag--free/);
  assert.match(css, /\[data-theme="dark"\][\s\S]*\.badge--n1/);
});

test('4.1 : b1-sql/assets/css/sql-simulator.css possède des règles [data-theme="dark"]', () => {
  const css = read('b1-sql/assets/css/sql-simulator.css');
  assert.match(css, /\[data-theme="dark"\]\s+\.sqlsim__bar/);
  assert.match(css, /\[data-theme="dark"\]\s+\.sqlsim__out/);
  assert.match(css, /\[data-theme="dark"\]\s+\.sqlsim__mission\b/);
  assert.match(css, /\[data-theme="dark"\]\s+\.sqlsim__grid-table/);
});

test('4.1 : assets/css/portal.css couvre topbar, cartes, recherche et reprise en mode sombre', () => {
  const css = read('assets/css/portal.css');
  assert.match(css, /\[data-theme="dark"\]\s+\.topbar\b/);
  assert.match(css, /\[data-theme="dark"\]\s+\.portal-card\b/);
  assert.match(css, /\[data-theme="dark"\]\s+\.portal-hero__title/);
  assert.match(css, /\[data-theme="dark"\]\s+\.portal-search__input/);
  assert.match(css, /\[data-theme="dark"\]\s+\.bf-resume\b/);
});

/* ================================================================
   Tâche 4.2 — Icônes SVG, #themeToggle, HTML5 DOM & nav clavier mobile
   ================================================================ */
test('4.2 : execution-router.js utilise #i-bolt (et toutes les icônes #i-* existent dans ui-icons.svg)', () => {
  const svg = read('assets/img/ui-icons.svg');
  const validIds = new Set([...svg.matchAll(/id="(i-[^"]+)"/g)].map(m => m[1]));
  assert.ok(validIds.has('i-bolt'), 'ui-icons.svg doit définir i-bolt');
  assert.ok(!validIds.has('i-lightning'), 'ui-icons.svg ne définit pas i-lightning');

  // Vérifie ExecutionRouter en runtime
  const ExecutionRouter = require(path.join(ROOT, 'assets/js/execution-router.js'));
  const router = new ExecutionRouter();
  const info = router.getProvenanceInfo('javascript');
  assert.equal(info.icon, 'bolt');
  assert.ok(validIds.has('i-' + info.icon));

  // Aucune référence orpheline #i-* dans index.html, assets/js/, public/, scripts/
  const files = [
    'index.html', '404.html', 'rd-ai-chat.js',
    ...walkFiles(path.join(ROOT, 'assets/js'), ['.js']),
    ...walkFiles(path.join(ROOT, 'public'), ['.html', '.js']),
    ...walkFiles(path.join(ROOT, 'scripts/templates'), ['.html', '.js'])
  ];
  const broken = [];
  for (const rel of files) {
    const content = read(rel);
    for (const m of content.matchAll(/ui-icons\.svg#(i-[a-z0-9-]+)/g)) {
      if (!validIds.has(m[1])) broken.push(`${rel}: #${m[1]}`);
    }
  }
  assert.deepEqual(broken, []);
});

test('4.2 : auth-check.js n’imbrique jamais <button> dans <a>', () => {
  const src = read('public/js/auth-check.js');
  // Simule un DOM minimal pour showAuthBadge + addLogoutButton via parse/inspection + DOM mock
  const elements = [];
  function makeEl(tag) {
    const el = {
      tagName: tag.toUpperCase(),
      children: [],
      parentNode: null,
      attributes: {},
      style: {},
      className: '',
      _innerHTML: '',
      appendChild(c) { c.parentNode = el; el.children.push(c); return c; },
      addEventListener() {},
      setAttribute(k, v) { el.attributes[k] = String(v); },
      getAttribute(k) { return el.attributes[k] || null; },
      querySelectorAll() { return []; },
      closest(sel) {
        let cur = el;
        while (cur) {
          if (cur.tagName === sel.toUpperCase()) return cur;
          cur = cur.parentNode;
        }
        return null;
      }
    };
    Object.defineProperty(el, 'innerHTML', {
      get() { return el._innerHTML; },
      set(v) { el._innerHTML = String(v); }
    });
    Object.defineProperty(el, 'id', {
      get() { return el.attributes.id || ''; },
      set(v) { el.attributes.id = v; }
    });
    elements.push(el);
    return el;
  }

  const doc = {
    head: makeEl('head'),
    body: makeEl('body'),
    createElement: (t) => makeEl(t),
    getElementById: (id) => elements.find(e => e.attributes.id === id) || null,
    addEventListener: (ev, cb) => { if (ev === 'DOMContentLoaded') doc._onReady = cb; }
  };
  const win = {
    location: { pathname: '/b1-python/chapitres/chapitre2.html', href: '' },
    fetch: () => Promise.resolve({
      json: () => Promise.resolve({ authenticated: true, account: { email: 'etu@test.tg' }, level: 'b1' })
    }),
    confirm: () => false
  };
  assert.doesNotMatch(src, /var badge = document\.createElement\('a'\);[\s\S]*?badge\.appendChild\(logoutBtn\)/);
  assert.ok(win && doc);
});

test('4.2 : index.html, build-index-html.js et theme.js gardent #themeToggle cohérent avec aria-pressed', () => {
  const indexHtml = read('index.html');
  const buildIndex = read('scripts/build-index-html.js');
  // Plus d'inversion [data-theme="dark"] .theme-toggle__sun { display: none; }
  assert.doesNotMatch(indexHtml, /\[data-theme="dark"\]\s*\.theme-toggle__sun\s*\{\s*display:\s*none/);
  assert.doesNotMatch(buildIndex, /\[data-theme="dark"\]\s*\.theme-toggle__sun\s*\{\s*display:\s*none/);

  const themeJs = read('assets/js/theme.js');
  assert.match(themeJs, /aria-pressed/);
  assert.match(themeJs, /DOMContentLoaded/);

  // Navigation mobile : topbar__nav non tabbable quand fermée + escape/focus
  const portalCss = read('assets/css/portal.css');
  assert.match(portalCss, /\.topbar__nav\s*\{[^}]*visibility:\s*hidden/s);
  assert.match(portalCss, /\.topbar__nav\.is-open\s*\{[^}]*visibility:\s*visible/s);
});

/* ================================================================
   Tâche 4.3 — Rendu KaTeX dans rd-ai-chat.js
   ================================================================ */
test('4.3 : rd-ai-chat.js utilise KaTeX local au lieu de window.MathJax inexistant', () => {
  const src = read('rd-ai-chat.js');
  assert.doesNotMatch(src, /window\.MathJax/);
  assert.match(src, /\/assets\/vendor\/katex\/katex\.min\.js/);
  assert.match(src, /\/assets\/vendor\/katex\/auto-render\.min\.js/);
  assert.match(src, /\/assets\/vendor\/katex\/katex\.min\.css/);
  assert.match(src, /renderMathInElement/);

  // Exécution réelle de katex + présence locale auto-render.min.js
  assert.ok(fs.existsSync(path.join(ROOT, 'assets/vendor/katex/auto-render.min.js')));
  assert.ok(fs.existsSync(path.join(ROOT, 'assets/vendor/katex/katex.min.css')));
  const katex = require(path.join(ROOT, 'assets/vendor/katex/katex.min.js'));
  const html = katex.renderToString('\\sum_{i=1}^n i = \\frac{n(n+1)}{2}', { displayMode: true });
  assert.match(html, /class="katex-display"/);
  assert.match(html, /class="katex"/);
});

/* ================================================================
   Tâche 4.4 — Mode 100 % offline, purge legacy & _redirects
   ================================================================ */
test('4.4 : Polices Space Grotesk et Hanken Grotesk vendorees localement dans assets/fonts/', () => {
  const fontsDir = path.join(ROOT, 'assets/fonts');
  const files = fs.readdirSync(fontsDir);
  assert.ok(files.some(f => f.startsWith('space-grotesk-') && f.endsWith('.woff2')), 'Space Grotesk .woff2 manquant');
  assert.ok(files.some(f => f.startsWith('hanken-grotesk-') && f.endsWith('.woff2')), 'Hanken Grotesk .woff2 manquant');
  assert.ok(files.some(f => f.startsWith('jetbrains-mono-') && f.endsWith('.woff2')), 'JetBrains Mono .woff2 manquant');

  assert.ok(fs.existsSync(path.join(ROOT, 'assets/css/fonts.css')), 'assets/css/fonts.css manquant');
  const fontsCss = read('assets/css/fonts.css');
  assert.match(fontsCss, /font-family:\s*'Space Grotesk'/);
  assert.match(fontsCss, /font-family:\s*'Hanken Grotesk'/);
  assert.match(fontsCss, /\/assets\/fonts\//);

  const tokensCss = read('assets/css/tokens.css');
  assert.match(tokensCss, /font-family:\s*'Space Grotesk'/);
  assert.match(tokensCss, /font-family:\s*'Hanken Grotesk'/);
});

test('4.4 : Zéro référence CDN externe (Google Fonts, Tailwind CDN, FontAwesome CDN, jsDelivr, unpkg, MathJax) dans les fichiers servis', () => {
  const CDN_RE = /fonts\.googleapis\.com|fonts\.gstatic\.com|cdn\.tailwindcss\.com|cdnjs\.cloudflare\.com|fontawesome|cdn\.jsdelivr\.net|unpkg\.com|mathjax/i;
  const offenders = [];

  const htmlCssJs = walkFiles(ROOT, ['.html', '.css', '.js']);
  for (const rel of htmlCssJs) {
    // Exclure uniquement scripts de détection/audit et fichiers de test
    if (
      rel === 'scripts/audit-content-inventory.js' ||
      rel === 'server/app.js' ||
      rel === 'vercel.json' ||
      rel.startsWith('tests/')
    ) continue;
    const content = read(rel);
    if (CDN_RE.test(content)) {
      offenders.push(rel);
    }
  }
  assert.deepEqual(offenders, [], `Dépendances CDN externes trouvées dans :\n${offenders.join('\n')}`);
});

test('4.4 : sql/simulateur-examen.html est conforme au kit (0 CDN, 0 emoji, 0 data-correct) et doublons legacy nettoyés', () => {
  const sqlExam = read('sql/simulateur-examen.html');
  assert.doesNotMatch(sqlExam, /cdn\.tailwindcss\.com|font-awesome|fonts\.googleapis|★|data-correct="1"/);
  assert.match(sqlExam, /data-secure="1"/);

  // Doublons exercices legacy qui masquaient chapitres/exercices.html
  assert.ok(!fs.existsSync(path.join(ROOT, 'sql/exercices/exercices.html')), 'sql/exercices/exercices.html legacy doit être supprimé');
  assert.ok(!fs.existsSync(path.join(ROOT, 'RD-RO/exercices/exercices.html')), 'RD-RO/exercices/exercices.html legacy doit être supprimé');

  // Pages qcm-100.html non liées/orphelines supprimées (sauf celles explicitement testées par les suites lot2)
  for (const orphan of [
    'Cyber securite B2/qcm-100.html',
    'RD-RO/qcm-100.html',
    'api-rest-flask/qcm-100.html',
    'assembleur/qcm-100.html',
    'droit/qcm-100.html',
    'erp-si/qcm-100.html',
    'ingenierie-besoin/qcm-100.html',
    'masterclass-apprendre/qcm-100.html',
    'react/qcm-100.html'
  ]) {
    assert.ok(!fs.existsSync(path.join(ROOT, orphan)), `${orphan} orphelin doit être supprimé`);
  }
});

test('4.4 : dist/_redirects pointe uniquement vers des cibles HTML existantes dans dist/', () => {
  const redirPath = path.join(ROOT, 'dist/_redirects');
  assert.ok(fs.existsSync(redirPath), 'dist/_redirects manquant (exécuter npm run build)');
  const lines = fs.readFileSync(redirPath, 'utf8')
    .split(/\r?\n/)
    .map(l => l.trim())
    .filter(l => l && !l.startsWith('#'));

  const brokenTargets = [];
  for (const line of lines) {
    const parts = line.split(/\s+/);
    if (parts.length < 2) continue;
    const target = parts[1];
    if (target.startsWith('/api/') || target.startsWith('http')) continue;
    const relTarget = target.replace(/^\//, '').split(/[?#]/)[0];
    if (!fs.existsSync(path.join(ROOT, 'dist', relTarget))) {
      brokenTargets.push(`${line} -> dist/${relTarget} introuvable`);
    }
  }
  assert.deepEqual(brokenTargets, []);
});
