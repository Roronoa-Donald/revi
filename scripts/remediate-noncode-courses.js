#!/usr/bin/env node
/**
 * scripts/remediate-noncode-courses.js
 *
 * Convertit tous les exercices et ateliers des cours de modélisation, hardware,
 * infographie, C# et SQL vers le mode canonique d'étude de cas (language: 'analyse') :
 * - b1-merise (B1)
 * - b1-architecture (B1)
 * - uml (B2)
 * - infographie (B2)
 * - csharp (B2)
 * - sql (B2)
 * - b1-sql (B1)
 * - b3-sql (B3)
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

function cleanBrief(brief) {
  let b = brief || '';
  b = b.replace(/Le programme reçoit/gi, 'Dans cette étude, on considère');
  b = b.replace(/Le script lit <strong>n lignes<\/strong>/gi, 'Analysez chaque ligne proposée');
  b = b.replace(/Le script lit[^.]*\./gi, 'Analysez les données fournies pour chaque cas.');
  b = b.replace(/Lit sur l’entrée standard[^.]*\./gi, 'Analysez les paramètres du problème pour chaque cas.');
  b = b.replace(/Le programme lit[^.]*\./gi, 'Analysez les données soumises pour chaque cas.');
  b = b.replace(/sur l'entrée standard/gi, 'dans l’énoncé du cas');
  b = b.replace(/sur l’entrée standard/gi, 'dans l’énoncé du cas');
  b = b.replace(/Affiche <code>/gi, 'Indiquez <code>');
  b = b.replace(/Affichez <code>/gi, 'Indiquez <code>');
  b = b.replace(/Affichez sur une seule ligne/gi, 'Indiquez');
  b = b.replace(/Affiche le nombre/gi, 'Indiquez le nombre');
  b = b.replace(/Affiche /gi, 'Indiquez ');
  b = b.replace(/Affichez /gi, 'Indiquez ');
  return b;
}

function cleanHints(hints) {
  if (!Array.isArray(hints)) return [];
  return hints.map(h => {
    let s = h;
    s = s.replace(/from\s+math\s+import\s+[^.]*/gi, 'Appliquez la règle méthodologique du cours.');
    s = s.replace(/Un if\/elif sur la variable[^.]*\./gi, 'Distinguez les catégories méthodologiques requises.');
    s = s.replace(/import sys[^.]*\./gi, 'Structurez votre réponse selon la grille demandée.');
    s = s.replace(/Découpe la ligne avec split\([^)]*\)[^.]*\./gi, 'Identifiez les critères fournis dans chaque cas.');
    s = s.replace(/Utilise une f-string[^.]*\./gi, 'Respectez le format de sortie demandé.');
    s = s.replace(/print\(f"[^"]*"\)/gi, 'Indiquez le libellé attendu.');
    s = s.replace(/read -r [^.]*\./gi, 'Analysez chaque entrée.');
    return s;
  });
}

function formatStdinLines(stdin) {
  if (!stdin || !stdin.trim()) return '# (Aucune donnée spécifique)';
  return stdin.trim().split('\n').map(l => `# Données : ${l}`).join('\n');
}

function convertExercise(ex) {
  const exCopy = { ...ex };
  exCopy.language = 'analyse';
  exCopy.brief = cleanBrief(ex.brief);
  exCopy.hints = cleanHints(ex.hints);

  const tests = ex.tests || [];
  const test1 = tests[0] || { label: 'Cas 1', stdin: '', expected: '' };
  const test2 = tests[1] || { label: 'Cas 2', stdin: '', expected: '' };
  const test3 = tests[2] || { label: 'Cas 3', stdin: '', expected: '' };

  const exTitle = ex.title || 'Exercice';
  const exId = ex.id;

  exCopy.starter = [
    `# Grille d'analyse (${exId}) — ${exTitle}`,
    `# Complétez la résolution demandée sous chaque cas ci-dessous :`,
    ``,
    `[Cas 1 — ${test1.label}]`,
    formatStdinLines(test1.stdin),
    `A_COMPLETER`,
    ``,
    `[Cas 2 — ${test2.label}]`,
    formatStdinLines(test2.stdin),
    `A_COMPLETER`,
    ``,
    `[Cas 3 — ${test3.label}]`,
    formatStdinLines(test3.stdin),
    `A_COMPLETER`,
    ``
  ].join('\n');

  const example = (ex.examples && ex.examples[0]) || { stdin: 'donnees_exemple', expected: '' };

  exCopy.solution = [
    `[Exemple]`,
    example.expected,
    ``,
    `[Cas 1 — ${test1.label}]`,
    test1.expected,
    ``,
    `[Cas 2 — ${test2.label}]`,
    test2.expected,
    ``,
    `[Cas 3 — ${test3.label}]`,
    test3.expected
  ].join('\n');

  exCopy.tests = [
    { label: test1.label, stdin: 'cas:1', expected: test1.expected },
    { label: test2.label, stdin: 'cas:2', expected: test2.expected },
    { label: test3.label, stdin: 'cas:3', expected: test3.expected }
  ];

  if (!exCopy.examples || exCopy.examples.length === 0) {
    exCopy.examples = [{ stdin: 'exemple_donnees', expected: test1.expected, note: 'Cas d’illustration' }];
  } else {
    exCopy.examples = exCopy.examples.map((eg, idx) => ({
      ...eg,
      stdin: eg.stdin && !eg.stdin.startsWith('cas:') ? eg.stdin : `exemple_${idx + 1}`
    }));
  }

  return exCopy;
}

function processExerciseFile(filePath) {
  delete require.cache[require.resolve(filePath)];
  const mod = require(filePath);
  if (!Array.isArray(mod)) {
    console.warn(`[WARN] ${filePath} n'exporte pas un tableau d'exercices`);
    return;
  }
  const converted = mod.map(convertExercise);
  const code = `'use strict';\n\nmodule.exports = ${JSON.stringify(converted, null, 2)};\n`;
  fs.writeFileSync(filePath, code, 'utf8');
  console.log(`[OK] Converti: ${path.relative(ROOT, filePath)} (${converted.length} exercices -> analyse)`);
}

function processExerciseDirectory(dirPath) {
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.js') && !f.startsWith('index')).sort();
  for (const f of files) {
    processExerciseFile(path.join(dirPath, f));
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. Convertir les exercices
// ─────────────────────────────────────────────────────────────────────────────
console.log('1. Conversion des catalogues d’exercices...\n');

processExerciseFile(path.join(ROOT, 'server/exercises/b1-merise.js'));
processExerciseFile(path.join(ROOT, 'server/exercises/b1-architecture.js'));
processExerciseDirectory(path.join(ROOT, 'server/exercises/uml'));
processExerciseDirectory(path.join(ROOT, 'server/exercises/infographie'));
processExerciseDirectory(path.join(ROOT, 'server/exercises/csharp'));
processExerciseDirectory(path.join(ROOT, 'server/exercises/sql'));
processExerciseFile(path.join(ROOT, 'server/exercises/b1-sql.js'));
processExerciseDirectory(path.join(ROOT, 'server/exercises/b3-sql'));

// ─────────────────────────────────────────────────────────────────────────────
// 2. Mettre à jour les ateliers dans server/content/
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n2. Mise à jour des ateliers transverses...\n');

function updateContentFile(relPath, langFrom, langTo, label) {
  const filePath = path.join(ROOT, relPath);
  if (!fs.existsSync(filePath)) return;
  let c = fs.readFileSync(filePath, 'utf8');
  c = c.replace(new RegExp(`data-language="${langFrom}"`, 'g'), `data-language="${langTo}"`);
  c = c.replace(new RegExp(`data-languages="1"`, 'g'), `data-languages="1"`);
  c = c.replace(/ic\('terminal'\) \+ ' (Python|Shell|Bash)'/g, `ic('clipboard') + ' ${label}'`);
  fs.writeFileSync(filePath, c, 'utf8');
  console.log(`[OK] Atelier mis à jour dans: ${relPath}`);
}

updateContentFile('server/content/b1-merise/pages.js', 'shell', 'analyse', 'Modélisation MERISE');
updateContentFile('server/content/b1-architecture/pages.js', 'shell', 'analyse', 'Architecture matérielle');
updateContentFile('server/content/uml/pages/accueil.js', 'python', 'analyse', 'Modélisation UML');
updateContentFile('server/content/infographie/pages/accueil.js', 'python', 'analyse', 'Infographie & Design');
updateContentFile('server/content/csharp/pages/accueil.js', 'python', 'analyse', 'Architecture C# .NET');
updateContentFile('server/content/sql/pages/accueil.js', 'python', 'analyse', 'Requêtes SQL');
updateContentFile('server/content/b1-sql/pages.js', 'shell', 'analyse', 'Bases de données & SQL');
updateContentFile('server/content/b3-sql/pages/accueil.js', 'python', 'analyse', 'SQL Avancé & Concurrence');

console.log('\n=== TERMINÉ AVEC SUCCÈS ===\n');
