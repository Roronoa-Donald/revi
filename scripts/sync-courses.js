#!/usr/bin/env node
/**
 * scripts/sync-courses.js
 *
 * Propage la liste canonique des cours (server/courses.js) dans les fichiers qui
 * ne peuvent pas la `require` : le middleware edge (ESM) et le script client
 * (navigateur). Le bloc est encadré par des marqueurs :
 *
 *     // >>> COURSE_REGISTRY  (…NE PAS ÉDITER À LA MAIN…)
 *     // <<< COURSE_REGISTRY
 *
 * Modes :
 *   node scripts/sync-courses.js           → réécrit les blocs (idempotent)
 *   node scripts/sync-courses.js --check   → exit 1 si un bloc a dérivé (CI)
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const registry = require(path.join(ROOT, 'server', 'courses.js'));

const START = '// >>> COURSE_REGISTRY';
const END = '// <<< COURSE_REGISTRY';

const HEADER =
  '// >>> COURSE_REGISTRY (généré depuis server/courses.js par scripts/sync-courses.js — NE PAS ÉDITER À LA MAIN)';

/** Bloc pour le middleware edge (ESM, tabulations 2 espaces). */
function edgeBlock() {
  const dirs = registry.COURSE_DIRS.map((id) => `  ${JSON.stringify(id)}`).join(',\n');
  const levels = registry.COURSE_DIRS.map((id) => `  ${JSON.stringify(id)}: ${JSON.stringify(registry.COURSES[id].level)}`).join(',\n');
  return [
    HEADER,
    'const COURSE_DIRS = [',
    dirs,
    '];',
    '',
    'const COURSE_LEVELS = {',
    levels,
    '};',
    '',
    'const LEVEL_RANK = { b1: 1, b2: 2, b3: 3 };',
    END
  ].join('\n');
}

/** Bloc pour le client (une ligne compacte, pas de const/let modernes). */
function clientBlock() {
  const dirs = '[' + registry.COURSE_DIRS.map((id) => `'${id}'`).join(', ') + ']';
  const levelsEntries = registry.COURSE_DIRS.map((id) => `"${id}":"${registry.COURSES[id].level}"`).join(',');
  return [
    HEADER,
    '  var COURSE_DIRS = ' + dirs + ';',
    '  var COURSE_LEVELS = {' + levelsEntries + '};',
    '  var LEVEL_RANK = { b1: 1, b2: 2, b3: 3 };',
    '  // <<< COURSE_REGISTRY'
  ].join('\n');
}

const TARGETS = [
  { file: 'middleware.js', block: edgeBlock, indentMarkers: false },
  { file: path.join('public', 'js', 'auth-check.js'), block: clientBlock, indentMarkers: true }
];

function replaceBlock(content, block, indentMarkers) {
  const startRe = /^([ \t]*)\/\/ >>> COURSE_REGISTRY[^\n]*\n[\s\S]*?^[ \t]*\/\/ <<< COURSE_REGISTRY/m;
  if (!startRe.test(content)) {
    throw new Error('Marqueurs COURSE_REGISTRY introuvables');
  }
  const indented = indentMarkers
    ? block.split('\n').map((l) => (l ? '  ' + l : l)).join('\n')
    : block;
  return content.replace(startRe, indented);
}

const check = process.argv.includes('--check');
let drift = 0;

for (const target of TARGETS) {
  const full = path.join(ROOT, target.file);
  const original = fs.readFileSync(full, 'utf8');
  const next = replaceBlock(original, target.block(), target.indentMarkers);

  if (next === original) {
    console.log(`   ${target.file} — à jour`);
  } else if (check) {
    drift++;
    console.log(`   ${target.file} — DÉRIVE (relancer: node scripts/sync-courses.js)`);
  } else {
    fs.writeFileSync(full, next, 'utf8');
    console.log(`    ${target.file} — mis à jour`);
  }
}

if (check) {
  if (drift > 0) {
    console.error(`\n ${drift} fichier(s) désynchronisé(s) du registre server/courses.js.`);
    process.exit(1);
  }
  console.log('\n Toutes les listes de cours sont synchronisées.');
} else {
  console.log(`\n Synchronisation terminée (${registry.COURSE_DIRS.length} cours).`);
}
