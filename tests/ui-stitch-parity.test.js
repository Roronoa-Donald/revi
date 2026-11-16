'use strict';

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');

function read(relPath) {
  return fs.readFileSync(path.join(ROOT, relPath), 'utf8');
}

describe('Lot 3B — UI-Stitch-Align Parity Tests', () => {

  describe('1. Portail (assets/css/portal.css + index.html)', () => {
    test('portal.css ne masque plus .card__desc ni .card__meta avec display: none et style .card__progress', () => {
      const css = read('assets/css/portal.css');
      assert.doesNotMatch(
        css,
        /\.portal-card\s+\.card__desc[\s\S]{0,80}display\s*:\s*none/i,
        'portal.css ne doit plus cacher .portal-card .card__desc'
      );
      assert.doesNotMatch(
        css,
        /\.portal-card\s+\.card__meta[\s\S]{0,80}display\s*:\s*none/i,
        'portal.css ne doit plus cacher .portal-card .card__meta'
      );
      assert.match(css, /\.portal-card\s+\.card__desc/, 'portal.css doit styler .portal-card .card__desc');
      assert.match(css, /\.portal-card\s+\.card__meta/, 'portal.css doit styler .portal-card .card__meta');
      assert.match(css, /\.card__progress/, 'portal.css doit styler .card__progress');
    });

    test('chaque .portal-card dans index.html affiche badge, .card__meta, .card__desc et .card__progress, mis à jour via rd:progress-loaded', () => {
      const html = read('index.html');
      const gridStart = html.indexOf('<section id="grid"');
      const gridEnd = html.indexOf('</section>', gridStart);
      assert.ok(gridStart !== -1 && gridEnd !== -1, 'Section #grid présente dans index.html');
      const gridHtml = html.slice(gridStart, gridEnd);

      const cards = gridHtml.split(/<a\s+href="[^"]+"\s+class="card\s+portal-card"/).slice(1);
      assert.equal(cards.length, 71, 'Les 71 cartes de cours doivent être présentes');

      cards.forEach((cardChunk, idx) => {
        assert.match(cardChunk, /class="badge-(?:level|free)"/, `Carte #${idx + 1} doit avoir un badge de niveau`);
        assert.match(cardChunk, /class="[^"]*\bcard__meta\b[^"]*"/, `Carte #${idx + 1} doit avoir .card__meta (chapitres/durée)`);
        assert.match(cardChunk, /class="[^"]*\bcard__desc\b[^"]*"/, `Carte #${idx + 1} doit avoir .card__desc`);
        assert.match(cardChunk, /class="[^"]*\bcard__progress\b[^"]*"/, `Carte #${idx + 1} doit avoir .card__progress`);
      });

      assert.match(html, /rd:progress-loaded/, 'index.html doit écouter CustomEvent("rd:progress-loaded")');
      assert.match(html, /rd-progress|cours-progress-v1/, 'index.html doit lire la progression depuis localStorage');
    });

    test('navigation mobile (< 768px) : bouton menu accessible (aria-expanded) + barre basse .stitch-bottom-nav à 4 onglets avec icônes ui-icons.svg', () => {
      const html = read('index.html');
      const css = read('assets/css/portal.css');
      const iconsSvg = read('assets/img/ui-icons.svg');

      // Bouton menu mobile avec aria-expanded
      assert.match(
        html,
        /<button[^>]+class="[^"]*topbar__menu-btn[^"]*"[^>]+aria-expanded="(?:false|true)"|<button[^>]+aria-expanded="(?:false|true)"[^>]+class="[^"]*topbar__menu-btn[^"]*"/,
        'index.html doit avoir un bouton menu mobile .topbar__menu-btn avec aria-expanded'
      );

      // Barre de navigation basse Stitch fixe sur < 768px avec 4 onglets : Accueil, Parcours, Atelier, Compte
      assert.match(html, /class="[^"]*\bstitch-bottom-nav\b[^"]*"/, 'index.html doit contenir .stitch-bottom-nav');
      for (const tabLabel of ['Accueil', 'Parcours', 'Atelier', 'Compte']) {
        assert.match(
          html,
          new RegExp(`stitch-bottom-nav[\\s\\S]*?${tabLabel}`, 'i'),
          `.stitch-bottom-nav doit contenir l'onglet ${tabLabel}`
        );
      }

      // Vérifie que .stitch-bottom-nav utilise des icônes ui-icons.svg valides
      const navMatch = html.match(/<nav[^>]*class="[^"]*\bstitch-bottom-nav\b[^"]*"[\s\S]*?<\/nav>/);
      assert.ok(navMatch, 'Balise <nav class="stitch-bottom-nav"> présente');
      const iconUses = [...navMatch[0].matchAll(/<use\s+href="\/assets\/img\/ui-icons\.svg#(i-[a-z0-9-]+)"/g)];
      assert.ok(iconUses.length >= 4, '.stitch-bottom-nav doit avoir au moins 4 icônes ui-icons.svg');
      for (const m of iconUses) {
        assert.ok(iconsSvg.includes(`id="${m[1]}"`), `Icône ${m[1]} doit exister dans ui-icons.svg`);
      }

      // CSS mobile < 768px pour .stitch-bottom-nav et tiroir .topbar__nav
      assert.match(css, /\.stitch-bottom-nav/, 'portal.css doit styler .stitch-bottom-nav');
      assert.match(css, /\.topbar__menu-btn/, 'portal.css doit styler .topbar__menu-btn');
    });
  });

  describe('2. Dark Mode & Header sur public/login.html, public/account.html, 404.html', () => {
    const pages = ['public/login.html', 'public/account.html', '404.html'];
    const iconsSvg = read('assets/img/ui-icons.svg');

    for (const pagePath of pages) {
      test(`${pagePath} charge tokens.css, theme.js, expose #themeToggle dans un header avec ui-icons.svg et supporte [data-theme="dark"]`, () => {
        const html = read(pagePath);
        assert.match(html, /href="\/assets\/css\/tokens\.css"/, `${pagePath} doit charger /assets/css/tokens.css`);
        assert.match(html, /src="\/assets\/js\/theme\.js"/, `${pagePath} doit charger /assets/js/theme.js`);
        assert.match(html, /id="themeToggle"/, `${pagePath} doit contenir #themeToggle`);
        assert.match(html, /<header\b/i, `${pagePath} doit contenir un <header>`);
        assert.match(html, /\/assets\/img\/ui-icons\.svg#i-[a-z0-9-]+/, `${pagePath} doit utiliser ui-icons.svg`);
        assert.match(html, /\[data-theme="dark"\]|--color-bg/, `${pagePath} doit supporter le thème sombre`);

        const uses = [...html.matchAll(/\/assets\/img\/ui-icons\.svg#(i-[a-z0-9-]+)/g)];
        assert.ok(uses.length >= 1, `${pagePath} doit référencer au moins une icône ui-icons.svg`);
        for (const u of uses) {
          assert.ok(iconsSvg.includes(`id="${u[1]}"`), `Icône ${u[1]} dans ${pagePath} doit exister dans ui-icons.svg`);
        }
      });
    }

    test('public/account.html préserve les formulaires FedaPay (5 000 / 45 000 FCFA, #fedapay-recovery-form) et scripts auth', () => {
      const html = read('public/account.html');
      assert.match(html, /5[\s\u00a0\u202f]?000/, 'Tarif mensuel 5 000 FCFA préservé');
      assert.match(html, /45[\s\u00a0\u202f]?000/, 'Tarif annuel 45 000 FCFA préservé');
      assert.match(html, /id="fedapay-recovery-form"/, '#fedapay-recovery-form préservé');
      assert.match(html, /data-pay-feda/, 'Boutons [data-pay-feda] préservés');
      assert.match(html, /\/_auth\/js\/fingerprint\.js/, 'fingerprint.js préservé');
    });

    test('public/login.html préserve #loginForm et fingerprint.js', () => {
      const html = read('public/login.html');
      assert.match(html, /id="loginForm"/, '#loginForm préservé');
      assert.match(html, /\/_auth\/js\/fingerprint\.js/, 'fingerprint.js préservé');
    });
  });

  describe('3. Harmonisation des 4 cours manuels B1 (b1-python, b1-c-cpp, b1-algo, b1-php)', () => {
    const courses = ['b1-python', 'b1-c-cpp', 'b1-algo', 'b1-php'];

    for (const course of courses) {
      test(`${course} : toutes les pages HTML partagent <header class="alnav">, tokens.css, theme.js, #themeToggle, cours.js et liens cohérents`, () => {
        const rootPages = ['index.html', 'sommaire.html', 'atelier.html', 'exercices/exercices.html'];
        const chapDir = path.join(ROOT, course, 'chapitres');
        const chapPages = fs.readdirSync(chapDir).filter(f => f.endsWith('.html')).map(f => `chapitres/${f}`);
        const allPages = [...rootPages, ...chapPages];

        for (const rel of allPages) {
          const fullRel = `${course}/${rel}`;
          const html = read(fullRel);

          assert.match(html, /href="\/assets\/css\/tokens\.css"/, `${fullRel} doit charger /assets/css/tokens.css`);
          assert.match(html, /src="\/assets\/js\/theme\.js"/, `${fullRel} doit charger /assets/js/theme.js`);
          assert.match(html, /id="themeToggle"/, `${fullRel} doit avoir #themeToggle`);
          assert.match(html, /<header\s+class="[^"]*\balnav\b[^"]*"/, `${fullRel} doit avoir <header class="alnav">`);
          assert.match(html, /assets\/js\/cours\.js/, `${fullRel} doit charger cours.js`);

          // Liens de navigation cohérents dans le header
          const headerMatch = html.match(/<header\s+class="[^"]*\balnav\b[^"]*"[\s\S]*?<\/header>/);
          assert.ok(headerMatch, `${fullRel} doit fermer proprement </header>`);
          const h = headerMatch[0];
          assert.match(h, /href="\/"/, `${fullRel} header doit lier vers le portail /`);
          assert.match(h, /sommaire\.html/, `${fullRel} header doit lier vers sommaire.html`);
          assert.match(h, /atelier\.html/, `${fullRel} header doit lier vers atelier.html`);
          assert.match(h, /cartes\.html/, `${fullRel} header doit lier vers cartes.html`);
          assert.match(h, /formules\.html/, `${fullRel} header doit lier vers formules.html`);
          assert.match(h, /simulateur-examen\.html/, `${fullRel} header doit lier vers simulateur-examen.html`);

          // Pas de code-lab.js dupliqué
          const codeLabJsCount = (html.match(/\/assets\/js\/code-lab\.js/g) || []).length;
          assert.equal(codeLabJsCount, 1, `${fullRel} doit charger code-lab.js exactement 1 fois`);
          const codeLabCssCount = (html.match(/\/assets\/css\/code-lab\.css/g) || []).length;
          assert.equal(codeLabCssCount, 1, `${fullRel} doit charger code-lab.css exactement 1 fois`);
        }
      });
    }
  });

  describe('4. Boutons Répétition Espacée Leitner sur cartes.html & cours.js', () => {
    test('scripts/course-kit.js et les 4 cartes.html manuels exposent les 3 boutons Leitner (again/1j, hard/3j, easy/7j)', () => {
      const kit = require('../scripts/course-kit');
      const sampleCourse = {
        id: 'b1-test',
        dir: 'b1-test',
        title: 'Test B1',
        level: 'B1',
        code: 'TST-101',
        prefix: 'tst',
        store: 'b1test:progress',
        accent: '#1d4ed8',
        chapters: [[1, 'Ch 1', 'Desc']]
      };
      const cardsBody = kit.cards([
        { title: 'Mod 1', items: [{ q: 'Q1 ?', a: 'R1' }, { q: 'Q2 ?', a: 'R2' }] }
      ]);
      const fullPage = kit.page(sampleCourse, 'chapitres/cartes.html', {
        title: 'Cartes',
        description: 'Desc',
        depth: 1,
        active: 'cartes',
        body: cardsBody
      });

      assert.match(fullPage, /data-leitner="again"[\s\S]*?À revoir · 1j/, 'course-kit cartes.html doit contenir À revoir · 1j (data-leitner="again")');
      assert.match(fullPage, /data-leitner="hard"[\s\S]*?Moyen · 3j/, 'course-kit cartes.html doit contenir Moyen · 3j (data-leitner="hard")');
      assert.match(fullPage, /data-leitner="easy"[\s\S]*?Acquis · 7j/, 'course-kit cartes.html doit contenir Acquis · 7j (data-leitner="easy")');

      for (const course of ['b1-python', 'b1-c-cpp', 'b1-algo', 'b1-php']) {
        const cartesHtml = read(`${course}/chapitres/cartes.html`);
        assert.match(cartesHtml, /data-leitner="again"[\s\S]*?À revoir · 1j/, `${course}/chapitres/cartes.html doit avoir data-leitner="again"`);
        assert.match(cartesHtml, /data-leitner="hard"[\s\S]*?Moyen · 3j/, `${course}/chapitres/cartes.html doit avoir data-leitner="hard"`);
        assert.match(cartesHtml, /data-leitner="easy"[\s\S]*?Acquis · 7j/, `${course}/chapitres/cartes.html doit avoir data-leitner="easy"`);
      }
    });

    test('scripts/templates/cours.js et assets/js/cours.js sont identiques et implémentent Leitner + CustomEvents rd:flashcard-review et rd:chapter-mastery', () => {
      const tplJs = read('scripts/templates/cours.js');
      const assetJs = read('assets/js/cours.js');
      assert.equal(tplJs, assetJs, 'scripts/templates/cours.js et assets/js/cours.js doivent être identiques');

      for (const jsPath of [
        'scripts/templates/cours.js',
        'assets/js/cours.js',
        'b1-python/assets/js/cours.js',
        'b1-c-cpp/assets/js/cours.js',
        'b1-algo/assets/js/cours.js',
        'b1-php/assets/js/cours.js'
      ]) {
        const code = read(jsPath);
        assert.match(code, /rd:flashcard-review/, `${jsPath} doit émettre CustomEvent('rd:flashcard-review')`);
        assert.match(code, /courseId/, `${jsPath} doit inclure courseId dans le detail de l'événement`);
        assert.match(code, /cardHash/, `${jsPath} doit inclure cardHash dans le detail de l'événement`);
        assert.match(code, /rating/, `${jsPath} doit inclure rating dans le detail de l'événement`);
        assert.match(code, /rd:chapter-mastery/, `${jsPath} doit émettre CustomEvent('rd:chapter-mastery')`);
        assert.match(code, /data-leitner/, `${jsPath} doit gérer les boutons [data-leitner]`);
        assert.match(code, /nextReview|leitner/, `${jsPath} doit calculer/stocker la date de prochaine révision Leitner`);
      }
    });
  });
});
