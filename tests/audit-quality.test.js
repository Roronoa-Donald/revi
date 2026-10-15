/**
 * tests/audit-quality.test.js — Suite de tests automatisée pour la remédiation Impeccable
 *
 * Vérifie l'ensemble des 14 critères d'audit :
 * - Responsive / Mobile First (navigation horizontale, déconfliction FAB mobile)
 * - UI / UX & Affichage (mode sombre complet, suppression dark-glow, état vide recherche)
 * - Accessibilité / A11y (skip links, ARIA live, aria-pressed, touch targets >= 40px)
 * - SEO & Découvrabilité (sitemap 71 cours + ch1, balises OpenGraph, canonical, favicon)
 * - Performance & Hygiène (zéro dépendance CDN FontAwesome, prefers-reduced-motion)
 */
const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const { execSync } = require('node:child_process');

const ROOT = path.resolve(__dirname, '..');
const { COURSE_DIRS } = require('../server/courses');

test('Audit Quality 1 : sitemap.xml contient les 71 cours canoniques et leurs chapitres 1', () => {
  const sitemapPath = path.join(ROOT, 'sitemap.xml');
  assert.ok(fs.existsSync(sitemapPath), 'sitemap.xml existe');
  const sitemap = fs.readFileSync(sitemapPath, 'utf8');

  assert.ok(sitemap.includes('<loc>https://revi-mu.vercel.app/</loc>'), 'Accueil présent');
  assert.ok(sitemap.includes('<loc>https://revi-mu.vercel.app/preparation-web/index.html</loc>'), 'Atelier préparation présent');

  // Vérifier que chaque cours canonique est indexé
  for (const courseId of COURSE_DIRS) {
    const enc = encodeURI(courseId);
    assert.ok(
      sitemap.includes(`<loc>https://revi-mu.vercel.app/${enc}/index.html</loc>`),
      `Index manquant dans le sitemap pour ${courseId}`
    );
    if (fs.existsSync(path.join(ROOT, courseId, 'chapitres', 'chapitre1.html'))) {
      assert.ok(
        sitemap.includes(`<loc>https://revi-mu.vercel.app/${enc}/chapitres/chapitre1.html</loc>`),
        `Chapitre 1 gratuit manquant dans le sitemap pour ${courseId}`
      );
    }
  }

  // Le script de check doit passer
  const checkOutput = execSync('node scripts/generate-sitemap.js --check', { cwd: ROOT, encoding: 'utf8' });
  assert.ok(checkOutput.includes('est synchronisé'), 'Vérification sitemap synchronisé');
});

test('Audit Quality 2 : index.html a un état vide, des badges >= 12px (0.75rem), canonical et favicon', () => {
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

  // Badges rescale
  assert.ok(html.includes('.badge-level {\n            font-size: 0.75rem;'), 'badge-level font-size rescalé à 0.75rem');
  assert.ok(html.includes('.badge-free {\n            font-size: 0.75rem;'), 'badge-free font-size rescalé à 0.75rem');
  assert.ok(!html.includes('font-size: 0.68rem;'), 'aucune occurrence résiduelle de 0.68rem');

  // État vide
  assert.ok(html.includes('id="portalEmptyState"'), 'élément #portalEmptyState présent');
  assert.ok(html.includes('id="portalResetFilters"'), 'bouton #portalResetFilters présent');
  assert.ok(html.includes('emptyState.hidden = visibleCount > 0;'), 'toggle emptyState dans applyFilters');

  // SEO & Favicon
  assert.ok(html.includes('<link rel="canonical" href="https://revi-mu.vercel.app/">'), 'canonical link présent');
  assert.ok(html.includes('<link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">'), 'favicon SVG présent');
  assert.ok(html.includes('<meta name="twitter:card" content="summary">'), 'twitter:card présent');
});

test('Audit Quality 3 : cours.css implémente le mode sombre complet et la navigation mobile déroulante', () => {
  const css = fs.readFileSync(path.join(ROOT, 'scripts', 'templates', 'cours.css'), 'utf8');

  // Mode sombre
  assert.ok(css.includes('[data-theme="dark"]'), 'sélecteur [data-theme="dark"] présent');
  assert.ok(css.includes('[data-theme="dark"] body'), 'styles body dark');
  assert.ok(css.includes('[data-theme="dark"] .box'), 'styles box dark');
  assert.ok(css.includes('[data-theme="dark"] .fc__face'), 'styles flashcards dark');
  assert.ok(css.includes('[data-theme="dark"] .qcm__score'), 'styles score dark');

  // Navigation mobile non masquée mais scrollable
  assert.ok(!css.includes('.__S__nav__links { display: none; }'), 'nav links ne sont plus masqués sur mobile');
  assert.ok(css.includes('overflow-x: auto'), 'scroll horizontal présent');
  assert.ok(css.includes('-webkit-overflow-scrolling: touch'), 'inertial scrolling présent');

  // Tables responsives
  assert.ok(css.includes('table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: .82rem; display: block; overflow-x: auto;'), 'tables responsives par défaut');
});

test('Audit Quality 4 : course-kit.js injecte theme.js, skip-nav, themeToggle, OpenGraph et canonical', () => {
  const kit = require('../scripts/course-kit');
  const dummyCourse = {
    id: 'test-course',
    slug: 'tc',
    brand: 'Test Course',
    brandIcon: 'code',
    accent: '#456dff',
    accentDeep: '#2c4dd9',
    accentSoft: '#eef2ff',
    accentBorder: '#c7d2fe',
    storeKey: 'tc_store',
    chapters: [{ n: 1, title: 'Introduction' }]
  };

  const rendered = kit.page(dummyCourse, 'chapitres/chapitre1.html', {
    title: 'Chapitre 1 — Test',
    description: 'Description test',
    body: '<p>Contenu test</p>'
  });

  assert.ok(rendered.includes('<script src="/assets/js/theme.js"></script>'), 'theme.js injecté dans head');
  assert.ok(rendered.includes('<nav class="skip-nav" aria-label="Accès rapide"><a href="#content" class="skip-link">Aller au contenu</a></nav>'), 'skip-nav link présent');
  assert.ok(rendered.includes('<main id="content" class="tcwrap">'), 'main id="content" présent');
  assert.ok(rendered.includes('id="themeToggle"'), 'bouton #themeToggle présent');
  assert.ok(rendered.includes('<link rel="canonical" href="https://revi-mu.vercel.app/test-course/chapitres/chapitre1.html">'), 'canonical link présent');
  assert.ok(rendered.includes('<meta property="og:title" content="Chapitre 1 — Test">'), 'og:title présent');
  assert.ok(rendered.includes('<meta name="twitter:card" content="summary">'), 'twitter:card présent');
});

test('Audit Quality 5 : cours.js gère le toggle du thème et le support ARIA', () => {
  const js = fs.readFileSync(path.join(ROOT, 'scripts', 'templates', 'cours.js'), 'utf8');

  assert.ok(js.includes('scoreEl.setAttribute(\'role\', \'status\');'), 'role status sur scoreEl');
  assert.ok(js.includes('scoreEl.setAttribute(\'aria-live\', \'polite\');'), 'aria-live polite sur scoreEl');
  assert.ok(js.includes('card.setAttribute(\'aria-pressed\', \'false\');'), 'aria-pressed initial sur cards');
  assert.ok(js.includes('card.setAttribute(\'aria-pressed\', flipped ? \'true\' : \'false\');'), 'aria-pressed toggle sur cards');
  assert.ok(js.includes('function initTheme()'), 'initTheme présent');
  assert.ok(js.includes('window.toggleTheme()'), 'appel window.toggleTheme');
});

test('Audit Quality 6 : code-lab.css élimine les chromatic glow et respecte les touch targets', () => {
  const css = fs.readFileSync(path.join(ROOT, 'assets', 'css', 'code-lab.css'), 'utf8');

  // Pas de chromatic glow (rgba(79, 70, 229) dans box-shadow)
  assert.ok(!css.includes('rgba(79, 70, 229, 0.35)'), 'box-shadow chromatic glow éliminé');
  assert.ok(css.includes('box-shadow: 0 2px 6px rgba(0, 0, 0, 0.22);'), 'ombre neutre en élévation présente');

  // Touch targets
  assert.ok(css.includes('.lab__btn {') && css.includes('min-height: 40px;'), '.lab__btn a min-height: 40px');
  assert.ok(css.includes('.lab__tab {') && css.includes('min-height: 38px;'), '.lab__tab a min-height: 38px');
});

test('Audit Quality 7 : rd-ai-chat.js est autonome sans FontAwesome et mobile-friendly', () => {
  const js = fs.readFileSync(path.join(ROOT, 'rd-ai-chat.js'), 'utf8');

  // Pas de CDN FontAwesome
  assert.ok(!js.includes('cdnjs.cloudflare.com/ajax/libs/font-awesome'), 'CDN FontAwesome supprimé');
  assert.ok(!js.includes('fas fa-'), 'Classes FontAwesome supprimées au profit de SVG natifs');

  // Préférence de mouvement
  assert.ok(js.includes('@media (prefers-reduced-motion: reduce)'), 'prefers-reduced-motion présent');

  // Déconfliction mobile
  assert.ok(js.includes('@media (max-width: 640px)'), 'media query mobile présente');
  assert.ok(js.includes('.rdai-whatsapp') && js.includes('display: none !important;'), 'whatsapp flottant masqué sur mobile');
  assert.ok(js.includes('ICONS.whatsapp'), 'bouton whatsapp intégré dans le panneau de chat');
});

test('Audit Quality 8 : Impeccable detect valide index.html et assets sans anti-pattern', () => {
  const impeccableBin = '/home/rd/.gemini/skills/impeccable/scripts/impeccable';
  if (!fs.existsSync(impeccableBin)) return;

  const targets = ['index.html', 'assets/css/code-lab.css', 'scripts/templates/cours.css'];
  for (const target of targets) {
    try {
      execSync(`${impeccableBin} detect ${target}`, { cwd: ROOT, stdio: 'pipe' });
    } catch (err) {
      assert.fail(`Impeccable detect a échoué sur ${target} : ${err.stderr?.toString() || err.message}`);
    }
  }
});

