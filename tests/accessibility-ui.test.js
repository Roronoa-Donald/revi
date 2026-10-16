/**
 * tests/accessibility-ui.test.js
 *
 * Suite de tests TDD pour OBJ-07 & OBJ-09 (A11Y-001, PROD-001, SEO-001) :
 * - A11Y-001 (WCAG 2.2 AA Contrast Floor) :
 *   - Chaque cours en mode clair (theme.mode === 'light') dans server/courses.js possède
 *     une couleur accent avec un ratio de contraste WCAG 2.2 >= 4.5:1 sur #ffffff
 *     (>= 4.0:1 sur #faf7f2) et accentDark >= 4.5:1 sur #ffffff.
 *   - Chaque carte de cours sur index.html (--course-accent et couleur .card__icon)
 *     possède un ratio de contraste >= 4.5:1 sur #ffffff.
 *   - Chaque cours dans server/content/*.js possède accent et accentDeep >= 4.5:1 sur #ffffff.
 * - PROD-001 & SEO-001 (Catalogue & Portal Integrity) :
 *   - index.html ne contient aucune balise <a class="card portal-card"> non fermée.
 *   - index.html n'expose pas le module vide b1-vb-excel comme carte active avec "Ch. 1 gratuit",
 *     et b1-vb-excel est marqué archived: true dans server/courses.js.
 *   - Les compteurs affichés sur index.html (B1 = 23 cours, B2 = 24 cours, B3 = 23 cours,
 *     Tous = 70 cours, #activeFilterCount = 23 cours, meta description & sous-titre hero
 *     mentionnant 68 cours interactifs) correspondent exactement aux cartes rendues (70).
 *   - b1-vb-excel/index.html inclut <link rel="canonical">, <meta property="og:title">,
 *     <meta property="og:description">, <meta name="twitter:card"> et précise son statut.
 *   - node scripts/check-courses-sync.js s'exécute avec code 0 et 0 avertissement [warn].
 */
'use strict';

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const ROOT = path.resolve(__dirname, '..');
const { COURSES } = require('../server/courses');
const { checkCoursesSync } = require('../scripts/check-courses-sync');

/**
 * Calcule la luminance relative WCAG 2.2 d'une couleur hexadécimale (#rgb ou #rrggbb).
 */
function relativeLuminance(hex) {
  const clean = String(hex).replace(/^#/, '').trim();
  const full =
    clean.length === 3
      ? clean
          .split('')
          .map((c) => c + c)
          .join('')
      : clean;
  if (!/^[0-9a-fA-F]{6}$/.test(full)) {
    throw new Error(`Couleur hexadécimale invalide : ${hex}`);
  }
  const channels = [
    parseInt(full.slice(0, 2), 16) / 255,
    parseInt(full.slice(2, 4), 16) / 255,
    parseInt(full.slice(4, 6), 16) / 255
  ].map((v) => (v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));

  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

/**
 * Calcule le ratio de contraste WCAG 2.2 entre deux couleurs hexadécimales.
 */
function contrastRatio(hex1, hex2) {
  const l1 = relativeLuminance(hex1);
  const l2 = relativeLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

describe('A11Y-001 — Conformité WCAG 2.2 AA des couleurs d’accentuation', () => {
  test('server/courses.js : tous les cours en mode light ont un contraste >= 4.5:1 sur #ffffff (>= 4.0:1 sur #faf7f2)', () => {
    const violations = [];
    for (const [courseId, course] of Object.entries(COURSES)) {
      const theme = course.theme;
      assert.ok(theme, `Thème manquant pour ${courseId}`);
      if (theme.mode !== 'light') continue;

      const crWhite = contrastRatio(theme.accent, '#ffffff');
      const crWarm = contrastRatio(theme.accent, '#faf7f2');
      const crDarkWhite = contrastRatio(theme.accentDark, '#ffffff');

      if (crWhite < 4.5) {
        violations.push(`${courseId}.accent (${theme.accent}) sur #ffffff = ${crWhite.toFixed(2)}:1 (< 4.5:1)`);
      }
      if (crWarm < 4.0) {
        violations.push(`${courseId}.accent (${theme.accent}) sur #faf7f2 = ${crWarm.toFixed(2)}:1 (< 4.0:1)`);
      }
      if (crDarkWhite < 4.5) {
        violations.push(`${courseId}.accentDark (${theme.accentDark}) sur #ffffff = ${crDarkWhite.toFixed(2)}:1 (< 4.5:1)`);
      }
    }

    assert.deepEqual(
      violations,
      [],
      `Violations de contraste dans server/courses.js :\n${violations.join('\n')}`
    );
  });

  test('server/content/*.js : tous les modules ont accent et accentDeep >= 4.5:1 sur #ffffff', () => {
    const contentDir = path.join(ROOT, 'server', 'content');
    const files = fs.readdirSync(contentDir).filter((f) => f.endsWith('.js'));
    assert.ok(files.length >= 64, `Au moins 64 fichiers attendus dans server/content/ (trouvé: ${files.length})`);

    const violations = [];
    for (const file of files) {
      const mod = require(path.join(contentDir, file));
      const crAccent = contrastRatio(mod.accent, '#ffffff');
      const crDeep = contrastRatio(mod.accentDeep, '#ffffff');
      if (crAccent < 4.5) {
        violations.push(`${file} accent (${mod.accent}) = ${crAccent.toFixed(2)}:1 (< 4.5:1)`);
      }
      if (crDeep < 4.5) {
        violations.push(`${file} accentDeep (${mod.accentDeep}) = ${crDeep.toFixed(2)}:1 (< 4.5:1)`);
      }
    }

    assert.deepEqual(
      violations,
      [],
      `Violations de contraste dans server/content/*.js :\n${violations.join('\n')}`
    );
  });

  test('index.html : chaque carte a --course-accent et .card__icon avec un contraste >= 4.5:1 sur #ffffff', () => {
    const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
    const cardRe = /<a\s+href="([^"]+)"\s+class="card\s+portal-card"\s+style="--course-accent:\s*(#[0-9a-fA-F]{3,6})[^"]*"[^>]*>([\s\S]*?)<\/a>/g;
    const matches = [...html.matchAll(cardRe)];
    assert.ok(matches.length > 0, 'Aucune carte détectée sur index.html');

    const violations = [];
    for (const m of matches) {
      const href = m[1];
      const accentHex = m[2];
      const inner = m[3];
      const crAccent = contrastRatio(accentHex, '#ffffff');
      if (crAccent < 4.5) {
        violations.push(`Carte ${href} --course-accent (${accentHex}) = ${crAccent.toFixed(2)}:1 (< 4.5:1)`);
      }
      const iconMatch = inner.match(/class="card__icon"[^>]*style="color:\s*(#[0-9a-fA-F]{3,6})/);
      if (iconMatch) {
        const iconHex = iconMatch[1];
        const crIcon = contrastRatio(iconHex, '#ffffff');
        if (crIcon < 4.5) {
          violations.push(`Carte ${href} .card__icon (${iconHex}) = ${crIcon.toFixed(2)}:1 (< 4.5:1)`);
        }
      }
    }

    assert.deepEqual(
      violations,
      [],
      `Violations de contraste sur les cartes de index.html :\n${violations.join('\n')}`
    );
  });
});

describe('PROD-001 & SEO-001 — Intégrité du catalogue, de index.html et de b1-vb-excel', () => {
  test('index.html : toutes les balises <a class="card portal-card"> sont correctement fermées par </a>', () => {
    const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
    const gridSectionMatch = html.match(/<section\s+id="grid"[^>]*>([\s\S]*?)<\/section>/);
    assert.ok(gridSectionMatch, 'Section #grid introuvable dans index.html');

    const gridContent = gridSectionMatch[1];
    const openTags = [...gridContent.matchAll(/<a\s+href="[^"]+"\s+class="card\s+portal-card"/g)];
    const closeTags = [...gridContent.matchAll(/<\/a>/g)];

    assert.equal(
      openTags.length,
      closeTags.length,
      `Nombre de <a class="card portal-card"> (${openTags.length}) !== nombre de </a> (${closeTags.length}) dans #grid`
    );
  });

  test('PROD-001 : b1-vb-excel est marqué archived: true dans server/courses.js et retiré des cartes actives de index.html', () => {
    assert.ok(COURSES['b1-vb-excel'], 'b1-vb-excel doit rester dans COURSES pour la rétrocompatibilité des 71 chemins');
    assert.equal(
      COURSES['b1-vb-excel'].archived,
      true,
      'COURSES["b1-vb-excel"].archived doit être true'
    );

    const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
    assert.ok(
      !html.includes('href="b1-vb-excel/index.html"'),
      'index.html ne doit pas lister la coquille vide b1-vb-excel comme carte active'
    );
  });

  test('PROD-001 & SEO-001 : les compteurs (23 B1, 24 B2, 23 B3, 70 Tous, 68 cours interactifs) et badges de index.html sont exacts', () => {
    const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
    const cards = [...html.matchAll(/<a\s+href="([^"]+)"\s+class="card\s+portal-card"[^>]*data-level="(b1|b2|b3)"/g)];

    const counts = { b1: 0, b2: 0, b3: 0 };
    for (const c of cards) {
      counts[c[2]]++;
    }

    assert.equal(counts.b1, 23, `23 cartes B1 attendues sur index.html (trouvé: ${counts.b1})`);
    assert.equal(counts.b2, 24, `24 cartes B2 attendues sur index.html (trouvé: ${counts.b2})`);
    assert.equal(counts.b3, 23, `23 cartes B3 attendues sur index.html (trouvé: ${counts.b3})`);
    assert.equal(cards.length, 70, `70 cartes au total attendues sur index.html (trouvé: ${cards.length})`);

    // Vérification des compteurs dans les onglets et la barre de statut
    const tabB1Match = html.match(/id="tab-b1"[\s\S]*?<span[^>]*class="level-tab__count"[^>]*>([^<]+)<\/span>/);
    const tabB2Match = html.match(/id="tab-b2"[\s\S]*?<span[^>]*class="level-tab__count"[^>]*>([^<]+)<\/span>/);
    const tabB3Match = html.match(/id="tab-b3"[\s\S]*?<span[^>]*class="level-tab__count"[^>]*>([^<]+)<\/span>/);
    const tabAllMatch = html.match(/id="tab-all"[\s\S]*?<span[^>]*class="level-tab__count"[^>]*>([^<]+)<\/span>/);
    const activeFilterMatch = html.match(/id="activeFilterCount">([^<]+)<\/strong>/);

    assert.equal(tabB1Match?.[1]?.trim(), '23 cours', 'Le compteur B1 doit afficher "23 cours"');
    assert.equal(tabB2Match?.[1]?.trim(), '24 cours', 'Le compteur B2 doit afficher "24 cours"');
    assert.equal(tabB3Match?.[1]?.trim(), '23 cours', 'Le compteur B3 doit afficher "23 cours"');
    assert.equal(tabAllMatch?.[1]?.trim(), '70 cours', 'Le compteur Tous doit afficher "70 cours"');
    assert.equal(activeFilterMatch?.[1]?.trim(), '23 cours', '#activeFilterCount doit afficher "23 cours"');

    // Vérification des métadonnées et du sous-titre hero (68 cours interactifs)
    assert.match(
      html,
      /<meta\s+name="description"\s+content="[^"]*68 cours interactifs/,
      'La meta description doit mentionner "68 cours interactifs"'
    );
    assert.match(
      html,
      /<meta\s+property="og:description"\s+content="[^"]*68 cours interactifs/,
      'La balise og:description doit mentionner "68 cours interactifs"'
    );
    assert.match(
      html,
      /<p\s+class="portal-hero__subtitle">[^<]*68 cours interactifs/,
      'Le sous-titre hero doit mentionner "68 cours interactifs"'
    );

    // Vérification du badge de la carte epreuves/index.html
    const epreuvesCardMatch = html.match(/<a\s+href="epreuves\/index\.html"[^>]*class="[^"]*card[^"]*"[\s\S]*?<\/a>/);
    assert.ok(epreuvesCardMatch, 'Carte epreuves/index.html présente');
    assert.match(
      epreuvesCardMatch[0],
      /<span\s+class="badge-free">Examens<\/span>/,
      'La carte epreuves/index.html doit afficher le badge "Examens"'
    );
  });

  test('SEO-001 : b1-vb-excel/index.html inclut canonical, OpenGraph, twitter:card et mentionne son statut d’archive/programme', () => {
    const vbHtml = fs.readFileSync(path.join(ROOT, 'b1-vb-excel', 'index.html'), 'utf8');

    assert.match(
      vbHtml,
      /<link\s+rel="canonical"\s+href="https:\/\/revi-mu\.vercel\.app\/b1-vb-excel\/index\.html"\s*\/?>/,
      'b1-vb-excel/index.html doit contenir <link rel="canonical">'
    );
    assert.match(
      vbHtml,
      /<meta\s+property="og:title"\s+content="[^"]+"/,
      'b1-vb-excel/index.html doit contenir <meta property="og:title">'
    );
    assert.match(
      vbHtml,
      /<meta\s+property="og:description"\s+content="[^"]+"/,
      'b1-vb-excel/index.html doit contenir <meta property="og:description">'
    );
    assert.match(
      vbHtml,
      /<meta\s+name="twitter:card"\s+content="summary"\s*\/?>/,
      'b1-vb-excel/index.html doit contenir <meta name="twitter:card" content="summary">'
    );
    assert.match(
      vbHtml,
      /archive|programme|refonte/i,
      'b1-vb-excel/index.html doit indiquer clairement son statut de programme/archive/refonte'
    );
  });

  test('check-courses-sync.js : code de sortie 0 et aucun avertissement [warn]', () => {
    const report = checkCoursesSync();
    assert.equal(report.ok, true, `Erreurs check-courses-sync : ${report.errors.join(' | ')}`);
    assert.deepEqual(
      report.warnings,
      [],
      `Aucun avertissement ne doit subsister dans check-courses-sync : ${report.warnings.join(' | ')}`
    );

    const cliOut = execFileSync(process.execPath, [path.join(ROOT, 'scripts', 'check-courses-sync.js')], {
      cwd: ROOT,
      encoding: 'utf8'
    });
    assert.ok(!cliOut.includes('[warn]'), `Sortie CLI contient [warn] : ${cliOut}`);
  });
});
