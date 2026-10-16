#!/usr/bin/env node
/**
 * scripts/remediate-math-courses.js
 *
 * Convertit tous les exercices des 4 cours de mathématiques :
 * - probabilites (B2)
 * - RD-RO (B2)
 * - b1-algebre (B1)
 * - b1-stats (B1)
 *
 * en grilles de résolution mathématique structurées (language: 'analyse'),
 * sans aucun code Python ni parsing de chaînes.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

function cleanBrief(brief) {
  let b = brief || '';
  b = b.replace(/Le programme reçoit/gi, 'Dans cette étude, on considère');
  b = b.replace(/Le script lit[^.]*\./gi, 'Analysez les données fournies pour chaque cas.');
  b = b.replace(/Lit sur l’entrée standard[^.]*\./gi, 'Analysez les paramètres du problème pour chaque cas.');
  b = b.replace(/Le programme lit[^.]*\./gi, 'Analysez les données soumises pour chaque cas.');
  b = b.replace(/sur l'entrée standard/gi, 'dans l’énoncé du cas');
  b = b.replace(/Affiche cette probabilité/gi, 'Calculez et indiquez cette probabilité');
  b = b.replace(/Affiche <code>/gi, 'Indiquez <code>');
  b = b.replace(/Affichez <code>/gi, 'Indiquez <code>');
  b = b.replace(/Affichez sur une seule ligne/gi, 'Indiquez');
  b = b.replace(/Affiche le nombre/gi, 'Indiquez le nombre');
  b = b.replace(/Affiche /gi, 'Indiquez ');
  return b;
}

function cleanHints(hints) {
  if (!Array.isArray(hints)) return [];
  return hints.map(h => {
    let s = h;
    s = s.replace(/from\s+math\s+import\s+[^.]*/gi, 'Appliquez la formule mathématique du cours.');
    s = s.replace(/La fonction (gcd|factorial|comb|erf|sqrt|exp)[^.]*\./gi, 'Effectuez le calcul arithmétique correspondant.');
    s = s.replace(/Découpe la ligne avec split\([^)]*\)[^.]*\./gi, 'Identifiez les coefficients donnés dans chaque cas.');
    s = s.replace(/Convertis les coordonnées en float[^.]*\./gi, 'Vérifiez la cohérence mathématique des valeurs.');
    s = s.replace(/Pour 4 décimales, utilise une f-string[^.]*\./gi, 'Arrondissez le résultat à 4 décimales.');
    s = s.replace(/Utilise une f-string[^.]*\./gi, 'Respectez le format de sortie demandé.');
    s = s.replace(/print\(f"[^"]*"\)/gi, 'Indiquez la valeur numérique attendue.');
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
    `# Grille de calcul (${exId}) — ${exTitle}`,
    `# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :`,
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
    test3.expected,
    ``
  ].join('\n');

  exCopy.tests = [
    { label: test1.label, stdin: 'cas:1', expected: test1.expected },
    { label: test2.label, stdin: 'cas:2', expected: test2.expected },
    { label: test3.label, stdin: 'cas:3', expected: test3.expected }
  ];

  return exCopy;
}

function convertFile(filePath, header) {
  const raw = require(filePath);
  const isArray = Array.isArray(raw);
  if (!isArray) throw new Error(`${filePath} n'exporte pas un tableau d'exercices`);

  const converted = raw.map(convertExercise);
  const content = `${header}\n'use strict';\n\nmodule.exports = ${JSON.stringify(converted, null, 2)};\n`;
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`[OK] Converti ${filePath} (${converted.length} exercices)`);
}

// 1. probabilites (6 chapitres)
for (let ch = 1; ch <= 6; ch++) {
  const p = path.join(ROOT, 'server', 'exercises', 'probabilites', `chapitre${ch}.js`);
  convertFile(p, `/**\n * Chapitre ${ch} — Probabilités B2.\n * Mode d'évaluation mathématique structurée (language: 'analyse').\n */`);
}

// 2. RD-RO (6 chapitres)
for (let ch = 1; ch <= 6; ch++) {
  const p = path.join(ROOT, 'server', 'exercises', 'RD-RO', `chapitre${ch}.js`);
  convertFile(p, `/**\n * Chapitre ${ch} — Recherche Opérationnelle B2.\n * Mode d'évaluation mathématique structurée (language: 'analyse').\n */`);
}

// 3. b1-algebre
convertFile(
  path.join(ROOT, 'server', 'exercises', 'b1-algebre.js'),
  `/**\n * Algèbre linéaire B1 — 18 exercices de calcul et raisonnement vectoriel/matriciel.\n * Mode d'évaluation mathématique structurée (language: 'analyse').\n */`
);

// 4. b1-stats
convertFile(
  path.join(ROOT, 'server', 'exercises', 'b1-stats.js'),
  `/**\n * Statistique descriptive B1 — 18 exercices de calcul statistique.\n * Mode d'évaluation mathématique structurée (language: 'analyse').\n */`
);

console.log('Conversion des 72 exercices mathématiques terminée avec succès.');
