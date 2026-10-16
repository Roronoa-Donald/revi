#!/usr/bin/env node
/**
 * scripts/check-courses-sync.js
 *
 * Vérifie la cohérence globale du catalogue de cours :
 * 1. Synchronisation du registre canonique (server/courses.js ↔ middleware.js ↔ public/js/auth-check.js)
 * 2. Intégrité structurelle des 68 cours interactifs complets :
 *    - 64 cours générés depuis server/content/*.js
 *    - 4 cours B1 autonomes (BLD-002 : b1-algo, b1-c-cpp, b1-php, b1-python)
 * 3. Présence des ressources des modules spéciaux (epreuves + PDF, preparation-web + quiz JSON)
 * 4. Résolution de tous les liens de cartes sur index.html
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const registry = require(path.join(ROOT, 'server', 'courses.js'));

const STANDALONE_B1_COURSES = {
  'b1-algo': { expectedChapters: 10 },
  'b1-c-cpp': { expectedChapters: 8 },
  'b1-php': { expectedChapters: 8 },
  'b1-python': { expectedChapters: 6 }
};

const SPECIAL_MODULES = ['epreuves', 'preparation-web'];
const ARCHIVED_OR_SHELL_MODULES = ['b1-vb-excel'];

function getInteractiveCourses() {
  return registry.COURSE_DIRS.filter(
    (id) => !SPECIAL_MODULES.includes(id) && !ARCHIVED_OR_SHELL_MODULES.includes(id)
  );
}

function checkCoursesSync() {
  const errors = [];
  const warnings = [];

  // 1. Vérifier la synchronisation server/courses.js -> middleware.js & auth-check.js
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'sync-courses.js'), '--check'], {
      cwd: ROOT,
      encoding: 'utf8',
      stdio: 'pipe'
    });
  } catch (err) {
    errors.push(`Désynchronisation COURSE_REGISTRY : ${err.stderr || err.stdout || err.message}`);
  }

  // 2. Vérifier les 4 cours B1 autonomes (BLD-002)
  for (const [courseId, meta] of Object.entries(STANDALONE_B1_COURSES)) {
    if (!registry.COURSES[courseId]) {
      errors.push(`Cours autonome B1 manquant dans server/courses.js : ${courseId}`);
      continue;
    }
    const dir = path.join(ROOT, courseId);
    for (const rel of ['index.html', 'sommaire.html', 'atelier.html', 'exercices/exercices.html']) {
      if (!fs.existsSync(path.join(dir, rel))) {
        errors.push(`Fichier requis manquant pour ${courseId} : ${courseId}/${rel}`);
      }
    }
    for (let i = 1; i <= meta.expectedChapters; i++) {
      const chRel = `chapitres/chapitre${i}.html`;
      if (!fs.existsSync(path.join(dir, chRel))) {
        errors.push(`Chapitre manquant pour ${courseId} : ${courseId}/${chRel}`);
      }
    }
  }

  // 3. Vérifier l'ensemble des 68 cours interactifs
  const interactiveCourses = getInteractiveCourses();
  for (const courseId of interactiveCourses) {
    const dir = path.join(ROOT, courseId);
    if (!fs.existsSync(dir)) {
      errors.push(`Dossier de cours introuvable : ${courseId}`);
      continue;
    }
    for (const reqFile of ['index.html', 'sommaire.html', 'atelier.html', 'chapitres/chapitre1.html']) {
      if (!fs.existsSync(path.join(dir, reqFile))) {
        errors.push(`Structure incomplète pour ${courseId} : ${reqFile} manquant`);
      }
    }
    const hasExercices =
      fs.existsSync(path.join(dir, 'exercices', 'exercices.html')) ||
      fs.existsSync(path.join(dir, 'chapitres', 'exercices.html'));
    if (!hasExercices) {
      errors.push(`Structure incomplète pour ${courseId} : exercices/exercices.html (ou chapitres/exercices.html) manquant`);
    }
    const chapDir = path.join(dir, 'chapitres');
    if (fs.existsSync(chapDir)) {
      const chaps = fs.readdirSync(chapDir).filter((f) => /^chapitre\d+\.html$/.test(f));
      if (chaps.length < 6) {
        errors.push(`Nombre de chapitres insuffisant pour ${courseId} : ${chaps.length} (< 6)`);
      }
    }
    if (!STANDALONE_B1_COURSES[courseId]) {
      const contentFile = path.join(ROOT, 'server', 'content', `${courseId}.js`);
      if (!fs.existsSync(contentFile)) {
        errors.push(`Source server/content/${courseId}.js manquante pour le cours généré ${courseId}`);
      }
    }
  }

  // 4. Vérifier les modules spéciaux (epreuves, preparation-web)
  if (!fs.existsSync(path.join(ROOT, 'epreuves', 'index.html'))) {
    errors.push('epreuves/index.html manquant');
  }
  if (!fs.existsSync(path.join(ROOT, 'epreuves', 'Recueil_Epreuves_2024_2025.pdf'))) {
    errors.push('epreuves/Recueil_Epreuves_2024_2025.pdf manquant');
  }
  if (!fs.existsSync(path.join(ROOT, 'preparation-web', 'index.html'))) {
    errors.push('preparation-web/index.html manquant');
  }

  // 5. Vérifier que chaque carte de index.html pointe vers un fichier existant
  const indexHtmlPath = path.join(ROOT, 'index.html');
  if (fs.existsSync(indexHtmlPath)) {
    const html = fs.readFileSync(indexHtmlPath, 'utf8');
    const cardLinks = [...html.matchAll(/<a\s+href="([^"]+)"\s+class="card\s+portal-card"/g)];
    for (const match of cardLinks) {
      const rawHref = match[1];
      const decodedHref = decodeURIComponent(rawHref);
      const targetPath = path.join(ROOT, decodedHref);
      if (!fs.existsSync(targetPath)) {
        errors.push(`Lien de carte cassé dans index.html : ${rawHref} -> ${decodedHref} introuvable`);
      }
      const courseId = decodedHref.split('/')[0];
      if (ARCHIVED_OR_SHELL_MODULES.includes(courseId)) {
        warnings.push(
          `PROD-001 : La carte "${courseId}" (${rawHref}) pointe vers un module sans chapitres ni exercices.`
        );
      }
    }
  }

  return {
    ok: errors.length === 0,
    interactiveCount: interactiveCourses.length,
    standaloneB1Count: Object.keys(STANDALONE_B1_COURSES).length,
    specialCount: SPECIAL_MODULES.length,
    errors,
    warnings
  };
}

module.exports = {
  STANDALONE_B1_COURSES,
  SPECIAL_MODULES,
  ARCHIVED_OR_SHELL_MODULES,
  getInteractiveCourses,
  checkCoursesSync
};

if (require.main === module) {
  const report = checkCoursesSync();
  console.log(
    `[check-courses-sync] ${report.interactiveCount} cours interactifs (${report.standaloneB1Count} B1 autonomes) + ${report.specialCount} modules spéciaux.`
  );
  for (const w of report.warnings) {
    console.warn(`  [warn] ${w}`);
  }
  if (!report.ok) {
    for (const e of report.errors) {
      console.error(`  [err]  ${e}`);
    }
    process.exit(1);
  }
  console.log('[ok] Catalogue et synchronisation des cours vérifiés.');
}
