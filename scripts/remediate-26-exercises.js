#!/usr/bin/env node
/**
 * scripts/remediate-26-exercises.js
 *
 * Convertit les 26 cours non-informatiques restants dans server/exercises/
 * vers le mode canonique d'étude de cas (language: 'analyse') :
 *
 * B1 (6) :
 * - b1-reseaux
 * - b1-ccna1
 * - b1-robotique
 * - b1-cyber
 * - b1-virtualisation
 * - b1-projet
 *
 * B2 (4) :
 * - assembleur
 * - cyber-securite-b2
 * - ccna
 * - docker
 *
 * B3 (16) :
 * - b3-cloud-computing
 * - b3-devops
 * - b3-firewall
 * - b3-github
 * - b3-linux
 * - b3-pfsense
 * - b3-reseau-lan
 * - b3-windows-server
 * - b3-cloud-azure
 * - b3-cryptographie
 * - b3-google-cloud
 * - b3-hacking
 * - b3-cloud-aws
 * - b3-supervision
 * - b3-voip
 * - b3-virtualisation
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

function cleanBrief(brief) {
  let b = brief || '';
  b = b.replace(/Le programme reçoit/gi, 'Dans cette étude, on considère');
  b = b.replace(/Le script lit <strong>n lignes<\/strong>/gi, 'Analysez chaque ligne proposée');
  b = b.replace(/Le script lit sur l’entrée standard[^.]*\./gi, 'Analysez les paramètres du problème pour chaque cas.');
  b = b.replace(/Le script lit sur l'entrée standard[^.]*\./gi, 'Analysez les paramètres du problème pour chaque cas.');
  b = b.replace(/Le script lit[^.]*\./gi, 'Analysez les données fournies pour chaque cas.');
  b = b.replace(/Lit sur l’entrée standard[^.]*\./gi, 'Analysez les paramètres du problème pour chaque cas.');
  b = b.replace(/Lit sur l'entrée standard[^.]*\./gi, 'Analysez les paramètres du problème pour chaque cas.');
  b = b.replace(/Le programme lit[^.]*\./gi, 'Analysez les données soumises pour chaque cas.');
  b = b.replace(/sur l'entrée standard/gi, 'dans l’énoncé du cas');
  b = b.replace(/sur l’entrée standard/gi, 'dans l’énoncé du cas');
  b = b.replace(/Le script doit afficher/gi, 'Indiquez pour chaque cas');
  b = b.replace(/Le script affiche/gi, 'Indiquez');
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
    s = s.replace(/from\s+[a-z_]+\s+import\s+[^.]*/gi, 'Appliquez la règle méthodologique du cours.');
    s = s.replace(/import\s+[a-z_]+[^.]*\./gi, 'Structurez votre réponse selon la grille demandée.');
    s = s.replace(/Un if\/elif sur la variable[^.]*\./gi, 'Distinguez les catégories méthodologiques requises.');
    s = s.replace(/Découpe la ligne avec split\([^)]*\)[^.]*\./gi, 'Identifiez les critères fournis dans chaque cas.');
    s = s.replace(/Utilise une f-string[^.]*\./gi, 'Respectez le format de sortie demandé.');
    s = s.replace(/print\(f"[^"]*"\)/gi, 'Indiquez le libellé attendu.');
    s = s.replace(/read -r [^.]*\./gi, 'Analysez chaque entrée.');
    s = s.replace(/int\(l\.split\([^)]*\)[^.]*\./gi, 'Appliquez la conversion arithmétique appropriée.');
    s = s.replace(/sys\.stdin\.read\(\)[^.]*\./gi, 'Analysez les critères fournis.');
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
  const exTitle = ex.title || 'Exercice';
  const exId = ex.id;

  const starterParts = [
    `# Grille d'analyse (${exId}) — ${exTitle}`,
    `# Complétez la résolution demandée sous chaque cas ci-dessous :`,
    ``
  ];

  const solutionParts = [];
  const example = (ex.examples && ex.examples[0]) || { stdin: 'donnees_exemple', expected: '' };
  solutionParts.push(`[Exemple]`);
  solutionParts.push(example.expected || (tests[0] && tests[0].expected) || '');
  solutionParts.push(``);

  const newTests = [];

  tests.forEach((t, idx) => {
    const caseNum = idx + 1;
    const label = t.label || `Cas ${caseNum}`;

    starterParts.push(`[Cas ${caseNum} — ${label}]`);
    starterParts.push(formatStdinLines(t.stdin));
    starterParts.push(`A_COMPLETER`);
    starterParts.push(``);

    solutionParts.push(`[Cas ${caseNum} — ${label}]`);
    solutionParts.push(t.expected || '');
    solutionParts.push(``);

    newTests.push({
      label: label,
      stdin: `cas:${caseNum}`,
      expected: t.expected
    });
  });

  exCopy.starter = starterParts.join('\n');
  exCopy.solution = solutionParts.join('\n').trim();
  exCopy.tests = newTests;

  if (!exCopy.examples || exCopy.examples.length === 0) {
    exCopy.examples = [{ stdin: 'exemple_donnees', expected: (tests[0] && tests[0].expected) || '', note: 'Cas d’illustration' }];
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

console.log('=== CONVERSION DES 26 COURS RESTANTS VERS LE MODE ANALYSE ===\n');

// 1. B1 (6 cours)
processExerciseFile(path.join(ROOT, 'server/exercises/b1-reseaux.js'));
processExerciseFile(path.join(ROOT, 'server/exercises/b1-ccna1.js'));
processExerciseFile(path.join(ROOT, 'server/exercises/b1-robotique.js'));
processExerciseFile(path.join(ROOT, 'server/exercises/b1-cyber.js'));
processExerciseFile(path.join(ROOT, 'server/exercises/b1-virtualisation.js'));
processExerciseFile(path.join(ROOT, 'server/exercises/b1-projet.js'));

// 2. B2 (4 cours)
processExerciseDirectory(path.join(ROOT, 'server/exercises/assembleur'));
processExerciseDirectory(path.join(ROOT, 'server/exercises/cyber-securite-b2'));
processExerciseDirectory(path.join(ROOT, 'server/exercises/ccna'));
processExerciseDirectory(path.join(ROOT, 'server/exercises/docker'));

// 3. B3 (16 cours)
processExerciseDirectory(path.join(ROOT, 'server/exercises/b3-cloud-computing'));
processExerciseDirectory(path.join(ROOT, 'server/exercises/b3-devops'));
processExerciseDirectory(path.join(ROOT, 'server/exercises/b3-firewall'));
processExerciseDirectory(path.join(ROOT, 'server/exercises/b3-github'));
processExerciseDirectory(path.join(ROOT, 'server/exercises/b3-linux'));
processExerciseDirectory(path.join(ROOT, 'server/exercises/b3-pfsense'));
processExerciseDirectory(path.join(ROOT, 'server/exercises/b3-reseau-lan'));
processExerciseDirectory(path.join(ROOT, 'server/exercises/b3-windows-server'));
processExerciseDirectory(path.join(ROOT, 'server/exercises/b3-cloud-azure'));
processExerciseDirectory(path.join(ROOT, 'server/exercises/b3-cryptographie'));
processExerciseDirectory(path.join(ROOT, 'server/exercises/b3-google-cloud'));
processExerciseDirectory(path.join(ROOT, 'server/exercises/b3-hacking'));
processExerciseDirectory(path.join(ROOT, 'server/exercises/b3-cloud-aws'));
processExerciseDirectory(path.join(ROOT, 'server/exercises/b3-supervision'));
processExerciseDirectory(path.join(ROOT, 'server/exercises/b3-voip'));
processExerciseDirectory(path.join(ROOT, 'server/exercises/b3-virtualisation'));

console.log('\n=== CONVERSION EXERCICES TERMINÉE AVEC SUCCÈS ===\n');
