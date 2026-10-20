/**
 * tests/catalogue-build-integrity.test.js
 *
 * Suite de tests TDD pour OBJ-06 & OBJ-07 (BLD-001, BLD-002, PROD-001, SEO-001) :
 * - BLD-001 : inclusion des PDFs publiés légitimes (epreuves/Recueil_Epreuves_2024_2025.pdf, assets/docs/)
 *             dans dist/ tout en excluant les documents sources bruts (.pdf hors epreuves/assets/docs, .docx, .doc, .py)
 *             et les dossiers internes (.taskstate, audit, tests, tools).
 * - BLD-002 : intégrité structurelle complète des 4 cours B1 autonomes (b1-algo, b1-c-cpp, b1-php, b1-python)
 *             dans les sources et dans dist/ (avec injection auth).
 * - PROD-001 / SEO-001 : résolution de tous les liens de cartes de index.html dans le dépôt et dans dist/,
 *             et vérification de scripts/check-courses-sync.js.
 */
'use strict';

const { test, describe, before } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const {
  STANDALONE_B1_COURSES,
  checkCoursesSync
} = require('../scripts/check-courses-sync');

function walkFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkFiles(full, fileList);
    } else {
      fileList.push(full);
    }
  }
  return fileList;
}

describe('Catalogue & Build Pipeline Integrity (BLD-001, BLD-002, PROD-001)', () => {
  before(() => {
    execFileSync(process.execPath, [path.join(ROOT, 'scripts', 'build.js')], {
      cwd: ROOT,
      stdio: 'pipe'
    });
  });

  test('BLD-001 : dist/epreuves/Recueil_Epreuves_2024_2025.pdf est copié à l’identique et epreuves/index.html > 100 Ko', () => {
    const srcPdf = path.join(ROOT, 'epreuves', 'Recueil_Epreuves_2024_2025.pdf');
    const distPdf = path.join(DIST, 'epreuves', 'Recueil_Epreuves_2024_2025.pdf');
    const distIndex = path.join(DIST, 'epreuves', 'index.html');

    assert.ok(fs.existsSync(srcPdf), 'Le PDF source epreuves/Recueil_Epreuves_2024_2025.pdf doit exister');
    assert.ok(fs.existsSync(distPdf), 'Le PDF compilé dist/epreuves/Recueil_Epreuves_2024_2025.pdf doit exister');
    assert.ok(fs.existsSync(distIndex), 'La page dist/epreuves/index.html doit exister');

    const srcStat = fs.statSync(srcPdf);
    const distStat = fs.statSync(distPdf);
    const indexStat = fs.statSync(distIndex);

    assert.equal(distStat.size, srcStat.size, 'La taille en octets du PDF dans dist/ doit correspondre exactement à la source');
    assert.ok(distStat.size > 30 * 1024, `Le PDF doit être non vide (> 30 Ko, trouvé: ${distStat.size} octets)`);
    assert.ok(indexStat.size > 100 * 1024, `epreuves/index.html dans dist/ doit dépasser 100 Ko (trouvé: ${indexStat.size} octets)`);

    const header = fs.readFileSync(distPdf).subarray(0, 5).toString('ascii');
    assert.equal(header, '%PDF-', 'Le fichier copié doit avoir un en-tête PDF valide (%PDF-)');
  });

  test('BLD-001 : Aucun fichier source de travail (.docx, .doc, .py) ni PDF brut hors epreuves/ et assets/docs/ ne fuite dans dist/', () => {
    const allDistFiles = walkFiles(DIST);
    assert.ok(allDistFiles.length > 500, 'dist/ doit contenir le site compilé');

    const leakedDocOrPy = [];
    const leakedRawPdfs = [];

    for (const file of allDistFiles) {
      const rel = path.relative(DIST, file).split(path.sep).join('/');
      const ext = path.extname(file).toLowerCase();

      if (['.docx', '.doc', '.py'].includes(ext)) {
        leakedDocOrPy.push(rel);
      }
      if (ext === '.pdf') {
        const allowed =
          rel.startsWith('epreuves/') ||
          rel.startsWith('assets/docs/') ||
          rel.includes('/assets/docs/');
        if (!allowed) {
          leakedRawPdfs.push(rel);
        }
      }
    }

    assert.deepEqual(leakedDocOrPy, [], `Aucun fichier .docx/.doc/.py ne doit fuiter dans dist/ : ${leakedDocOrPy.join(', ')}`);
    assert.deepEqual(leakedRawPdfs, [], `Aucun PDF brut de référence ne doit fuiter dans dist/ : ${leakedRawPdfs.join(', ')}`);

    for (const forbiddenDir of ['.taskstate', 'audit', 'tests', 'tools']) {
      assert.ok(
        !fs.existsSync(path.join(DIST, forbiddenDir)),
        `Le dossier interne ${forbiddenDir} ne doit jamais être copié dans dist/`
      );
    }
  });

  test('BLD-002 : Les 4 cours B1 autonomes (b1-algo, b1-c-cpp, b1-php, b1-python) sont complets dans les sources et dans dist/', () => {
    for (const [courseId, meta] of Object.entries(STANDALONE_B1_COURSES)) {
      const requiredPages = [
        'index.html',
        'sommaire.html',
        'atelier.html',
        'exercices/exercices.html'
      ];
      for (let i = 1; i <= meta.expectedChapters; i++) {
        requiredPages.push(`chapitres/chapitre${i}.html`);
      }

      for (const relPage of requiredPages) {
        const srcFile = path.join(ROOT, courseId, relPage);
        const distFile = path.join(DIST, courseId, relPage);

        assert.ok(fs.existsSync(srcFile), `Source manquante : ${courseId}/${relPage}`);
        assert.ok(fs.existsSync(distFile), `Fichier dist manquant : dist/${courseId}/${relPage}`);

        const distHtml = fs.readFileSync(distFile, 'utf8');
        assert.ok(
          distHtml.includes('/_auth/js/auth-check.js'),
          `Auth script non injecté dans dist/${courseId}/${relPage}`
        );
        assert.ok(
          distHtml.includes('/_auth/css/auth-styles.css'),
          `Auth styles non injectés dans dist/${courseId}/${relPage}`
        );
      }
    }
  });

  test('PROD-001 : Toutes les cartes <a class="card ..."> de index.html pointent vers un fichier existant dans le dépôt et dans dist/', () => {
    const srcIndex = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
    const cardMatches = [...srcIndex.matchAll(/<a\s+href="([^"]+)"\s+class="card\s+portal-card"/g)];

    assert.ok(cardMatches.length >= 68, `Au moins 68 cartes attendues sur index.html (trouvé: ${cardMatches.length})`);

    for (const m of cardMatches) {
      const rawHref = m[1];
      const decodedRel = decodeURIComponent(rawHref);
      const repoTarget = path.join(ROOT, decodedRel);
      const distTarget = path.join(DIST, decodedRel);

      assert.ok(
        fs.existsSync(repoTarget),
        `La carte href="${rawHref}" pointe vers un fichier inexistant dans le dépôt (${decodedRel})`
      );
      assert.ok(
        fs.existsSync(distTarget),
        `La carte href="${rawHref}" pointe vers un fichier inexistant dans dist/ (${decodedRel})`
      );
    }
  });

  test('check-courses-sync : vérifie la synchronisation du registre et les 68 cours interactifs', () => {
    const report = checkCoursesSync();
    assert.equal(report.ok, true, `Erreurs de synchronisation : ${report.errors.join(' | ')}`);
    assert.equal(report.interactiveCount, 68, 'Le catalogue doit compter exactement 68 cours interactifs complets');
    assert.equal(report.standaloneB1Count, 4, '4 cours B1 autonomes doivent être suivis');
  });
});
