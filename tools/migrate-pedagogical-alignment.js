/**
 * tools/migrate-pedagogical-alignment.js
 *
 * Migration automatique et rigoureuse des 14 cours non-informatiques
 * de language: 'shell' / 'python' vers language: 'analyse' (grilles d'évaluation structurées).
 */
'use strict';

const fs = require('fs');
const path = require('path');

const COURSES = [
  'b1-droit',
  'b1-anglais',
  'b1-fr-pro',
  'b1-bureautique',
  'droit',
  'masterclass-apprendre',
  'uiux',
  'ingenierie-besoin',
  'erp-si',
  'b3-anglais',
  'b3-agile',
  'b3-document-technique',
  'b3-etude-quantitative',
  'b3-veille'
];

function cleanBrief(brief) {
  if (!brief) return '';
  return brief
    .replace(/Le script lit <strong>n lignes<\/strong>[^:]*:/gi, 'Pour chaque situation proposée :')
    .replace(/Le script lit <strong>n lignes<\/strong>/gi, 'Pour chaque cas soumis')
    .replace(/Le script lit sur l['’]entrée standard/gi, 'Pour chaque cas d’application')
    .replace(/Le script lit/gi, 'L’analyse porte sur')
    .replace(/Pour chaque ligne il affiche/gi, 'Pour chaque situation, indiquez')
    .replace(/Il affiche/gi, 'Indiquez')
    .replace(/Il termine par/gi, 'Concluez par')
    .replace(/interpréteur Python/gi, 'moteur d’évaluation')
    .replace(/interpréteur Bash/gi, 'moteur d’évaluation')
    .replace(/script Python/gi, 'grille d’analyse')
    .replace(/script Bash/gi, 'grille d’analyse')
    .replace(/script/gi, 'cas')
    .replace(/programme/gi, 'analyse');
}

function cleanHints(hints) {
  if (!Array.isArray(hints)) return [];
  return hints.map(h =>
    h.replace(/read -r/g, 'l’analyse des données')
     .replace(/for \(\([^)]*\)\); do/g, 'le traitement méthodique')
     .replace(/dans les branches du if/g, 'selon les cas prévus')
     .replace(/branche « [^»]+ »/g, 'qualification correspondante')
     .replace(/sys\.stdin/g, 'les données fournies')
     .replace(/import sys/g, 'la méthode')
     .replace(/declare -A/g, 'la grille de critères')
     .replace(/dictionnaire Python/g, 'la grille de critères')
     .replace(/round\(valeur, 1\)/g, 'l’arrondi à une décimale')
     .replace(/au format exact «/g, 'selon la syntaxe attendue «')
     .replace(/au format «/g, 'selon la syntaxe «')
  );
}

function formatDataLines(stdin) {
  const lines = String(stdin || '').trim().split('\n');
  if (lines.length === 0 || (lines.length === 1 && lines[0] === '')) {
    return '# Données : (aucune donnée spécifique requise)';
  }
  // Si la première ligne est un entier isolé (compteur n) et qu'il y a d'autres lignes
  const hasCount = lines.length > 1 && /^\d+$/.test(lines[0].trim());
  const dataLines = hasCount ? lines.slice(1) : lines;
  return dataLines.map(l => `# Données : ${l}`).join('\n');
}

function buildStarter(ex) {
  let out = `# Grille d'analyse (${ex.id}) — ${ex.title}\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n`;
  ex.tests.forEach((t, i) => {
    out += `[Cas ${i + 1} — ${t.label}]\n`;
    out += `${formatDataLines(t.stdin)}\n`;
    out += `A_COMPLETER\n\n`;
  });
  return out.trim() + '\n';
}

function buildSolution(ex) {
  let out = `[Exemple]\n${ex.examples[0].expected.trim()}\n\n`;
  ex.tests.forEach((t, i) => {
    out += `[Cas ${i + 1} — ${t.label}]\n`;
    out += `${t.expected.trim()}\n\n`;
  });
  return out.trim() + '\n';
}

function convertExercise(ex) {
  const converted = {
    id: ex.id,
    chapter: ex.chapter,
    level: ex.level,
    language: 'analyse',
    title: ex.title,
    goal: ex.goal,
    brief: cleanBrief(ex.brief),
    starter: buildStarter(ex),
    hints: cleanHints(ex.hints),
    examples: ex.examples.map(e => ({
      stdin: e.stdin,
      expected: e.expected,
      ...(e.note ? { note: e.note } : {})
    })),
    tests: ex.tests.map((t, i) => ({
      label: t.label,
      stdin: `cas:${i + 1}`,
      expected: t.expected
    })),
    solution: buildSolution(ex)
  };
  return converted;
}

function serializeExercise(ex) {
  return `  {
    id: ${JSON.stringify(ex.id)},
    chapter: ${ex.chapter},
    level: ${JSON.stringify(ex.level)},
    language: 'analyse',
    title: ${JSON.stringify(ex.title)},
    goal: ${JSON.stringify(ex.goal)},
    brief: ${JSON.stringify(ex.brief)},
    starter: ${JSON.stringify(ex.starter)},
    hints: ${JSON.stringify(ex.hints, null, 6).replace(/\n/g, '\n    ')},
    examples: ${JSON.stringify(ex.examples, null, 6).replace(/\n/g, '\n    ')},
    tests: ${JSON.stringify(ex.tests, null, 6).replace(/\n/g, '\n    ')},
    solution: ${JSON.stringify(ex.solution)}
  }`;
}

// 1. Mise à jour de server/exercises/
console.log('1. Conversion des fichiers dans server/exercises/...');
const exercisesDir = path.join(__dirname, '..', 'server', 'exercises');

for (const courseId of COURSES) {
  const singleFilePath = path.join(exercisesDir, `${courseId}.js`);
  const courseDirPath = path.join(exercisesDir, courseId);

  if (fs.existsSync(singleFilePath) && !fs.existsSync(courseDirPath)) {
    // Fichier unique (b1-droit, b1-anglais, b1-fr-pro, b1-bureautique)
    const list = require(singleFilePath);
    const converted = list.map(convertExercise);
    const content = `/**
 * Catalogue des ${converted.length} études de cas du cours « ${courseId} ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
${converted.map(serializeExercise).join(',\n')}
];
`;
    fs.writeFileSync(singleFilePath, content, 'utf8');
    console.log(`  ✓ ${courseId}.js (${converted.length} exercices convertis)`);
  } else if (fs.existsSync(courseDirPath)) {
    // Dossier multi-chapitres (droit, masterclass-apprendre, uiux, etc.)
    const chapterFiles = fs.readdirSync(courseDirPath)
      .filter(f => f.startsWith('chapitre') && f.endsWith('.js'))
      .sort();

    let total = 0;
    for (const chapFile of chapterFiles) {
      const fullPath = path.join(courseDirPath, chapFile);
      const list = require(fullPath);
      const converted = list.map(convertExercise);
      total += converted.length;
      const content = `/**
 * ${chapFile} — Études de cas du cours « ${courseId} ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
${converted.map(serializeExercise).join(',\n')}
];
`;
      fs.writeFileSync(fullPath, content, 'utf8');
    }
    console.log(`  ✓ ${courseId}/ (${chapterFiles.length} chapitres, ${total} exercices convertis)`);
  }
}

console.log('\n2. Nettoyage de server/content/ pour les 14 cours...');
const contentDir = path.join(__dirname, '..', 'server', 'content');

for (const courseId of COURSES) {
  const dir = path.join(contentDir, courseId);
  if (!fs.existsSync(dir)) continue;

  const files = fs.readdirSync(dir, { recursive: true })
    .filter(f => typeof f === 'string' && (f.endsWith('.js') || f.endsWith('.html')));

  for (const rel of files) {
    const full = path.join(dir, rel);
    let code = fs.readFileSync(full, 'utf8');
    let changed = false;

    if (code.includes('data-language="shell"') || code.includes('data-language="python"')) {
      code = code.replace(/data-language="(shell|python)"/g, 'data-language="analyse"');
      changed = true;
    }

    if (code.includes('#!/bin/bash')) {
      code = code.replace(/#!\/bin\/bash\n[\s\S]*?(?=<\/script>)/,
        `# Zone libre : rédigez vos grilles d'analyse et cas d'application.\n[Cas 1 — Cas d'application libre]\n# Données :\nA_COMPLETER\n`);
      changed = true;
    }

    if (code.includes('print("Zone libre')) {
      code = code.replace(/# Zone libre : simulez[\s\S]*?(?=<\/script>)/,
        `# Zone libre : rédigez vos grilles d'analyse et cas d'application.\n[Cas 1 — Cas d'application libre]\n# Données :\nA_COMPLETER\n`);
      changed = true;
    }

    if (code.includes('en Bash') || code.includes('script Bash') || code.includes('script Python')) {
      code = code
        .replace(/en Bash/g, 'par études de cas')
        .replace(/script Bash/g, 'grille d’analyse')
        .replace(/script Python/g, 'grille d’analyse')
        .replace(/scripts Bash/g, 'études de cas')
        .replace(/scripts Python/g, 'études de cas')
        .replace(/trois exercices Bash/g, 'trois études de cas pratiques')
        .replace(/Exercices de code exécutables/g, 'Études de cas d’application')
        .replace(/Exercices de code/g, 'Études de cas pratiques')
        .replace(/Atelier de scripts/g, 'Atelier d’études de cas')
        .replace(/Atelier de code/g, 'Atelier pratique');
      changed = true;
    }

    if (changed) {
      fs.writeFileSync(full, code, 'utf8');
      console.log(`  ✓ Mis à jour: ${courseId}/${rel}`);
    }
  }
}

console.log('\nMigration terminée.');
