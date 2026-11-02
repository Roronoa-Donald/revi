'use strict';

const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const parse5 = require('parse5');
const { listExercises } = require('../../server/exercises');
const { COURSES } = require('../../server/courses');

const root = path.resolve(__dirname, '../..');
const seed = 'revi-lot1-partie3-2026-10-30';
const exercises = listExercises().filter(exercise => exercise.language === 'analyse');
const wanted = Math.ceil(exercises.length * 0.05);
const fingerprint = value => crypto.createHash('sha256').update(`${seed}|${value}`).digest('hex');
const groups = new Map();
for (const exercise of exercises) {
  if (!groups.has(exercise.course)) groups.set(exercise.course, []);
  groups.get(exercise.course).push(exercise);
}
if (exercises.length !== 830 || wanted !== 42 || groups.size !== 46 || wanted > groups.size) {
  throw new Error('Périmètre du tirage modifié : revoir la méthode avant de générer.');
}

const groupNames = [...groups.keys()].sort((left, right) =>
  fingerprint(`cours|${left}`).localeCompare(fingerprint(`cours|${right}`)));
const sample = groupNames.slice(0, wanted).map(course =>
  [...groups.get(course)].sort((left, right) =>
    fingerprint(`fiche|${left.id}`).localeCompare(fingerprint(`fiche|${right.id}`)))[0]);

const inventoryFile = path.join(root, 'corrections/resultats/inventaire-couverture-lot1-partie2.tsv');
const inventoryLines = fs.readFileSync(inventoryFile, 'utf8').trimEnd().split('\n');
const headings = inventoryLines.shift().split('\t');
const idIndex = headings.indexOf('identifiant');
const sourceIndex = headings.indexOf('provenance_donnees');
if (idIndex < 0 || sourceIndex < 0) throw new Error('Colonnes de provenance absentes.');
const sources = new Map(inventoryLines.map(line => {
  const fields = line.split('\t');
  return [fields[idIndex], fields[sourceIndex]];
}));

function plain(html) {
  const fragment = parse5.parseFragment(String(html || ''));
  const chunks = [];
  function visit(node) {
    if (node.nodeName === '#text') chunks.push(node.value);
    if (node.tagName === 'br') chunks.push('\n');
    for (const child of node.childNodes || []) visit(child);
    if (['p', 'li', 'div'].includes(node.tagName)) chunks.push('\n');
  }
  visit(fragment);
  return chunks.join('').replace(/[ \t]+/g, ' ').replace(/ *\n */g, '\n').replace(/\n{3,}/g, '\n\n').trim();
}

function fenced(value) {
  const contents = String(value || '').trimEnd();
  const runs = contents.match(/~{3,}/g) || [];
  const fence = '~'.repeat(Math.max(3, ...runs.map(run => run.length + 1)));
  return `${fence}text\n${contents}\n${fence}`;
}

const omitted = groupNames.slice(wanted).sort();
const lines = [
  '# Échantillon de grilles formatives pour relecture humaine',
  '',
  `Le catalogue contient ${exercises.length} grilles ; ${wanted} sont tirées, soit ${(100 * wanted / exercises.length).toFixed(2)} % (5 % arrondi à l'entier supérieur).`,
  `Graine : \`${seed}\`. L'ordre des cours puis le choix d'une fiche dans chaque cours sont déterminés par SHA-256 de la graine et de l'identifiant.`,
  `Le tirage comprend une grille de chacun des ${wanted} cours retenus sur ${groups.size} ; les cours non tirés sont : ${omitted.map(course => `\`${course}\``).join(', ')}.`,
  'Ce tirage stratifié n’est pas une preuve statistique de qualité pour toutes les grilles. Les attendus et corrigés ne sont pas reproduits dans ce document.',
  '',
  '## Grille de relecture',
  '',
  '- Compréhension : vocabulaire défini, objectif compréhensible, consigne non ambiguë.',
  '- Cohérence : cas et indices compatibles avec la consigne ; données suffisantes et cas limites pertinents.',
  '- Statut : activité explicitement formative, sans prétention à une validation générale.',
  '- Noter chaque observation et son emplacement ; aucune relecture humaine n’est présumée effectuée.',
  ''
];
const rows = ['identifiant\tcours\ttitre\tsource\tchapitre'];
for (const exercise of sample) {
  const source = sources.get(exercise.id);
  if (!source || !COURSES[exercise.course]) throw new Error(`Provenance absente : ${exercise.id}`);
  const title = String(exercise.title).replace(/[\r\n\t]/g, ' ');
  const goal = String(exercise.goal || '').replace(/[\r\n\t]/g, ' ');
  rows.push([exercise.id, exercise.course, title, source, exercise.chapter].join('\t'));
  lines.push(`## ${exercise.id} — ${title}`,
    '', `Cours : ${COURSES[exercise.course].name} (\`${exercise.course}\`), chapitre ${exercise.chapter}.`,
    `Source : \`${source}\`.`, '', `**Objectif :** ${goal}`, '', '**Consigne**', '', plain(exercise.brief), '',
    '**Données et grille visibles**', '', fenced(exercise.starter), '',
    '**Entrée de l’exemple visible**', '', fenced(exercise.examples?.[0]?.stdin || '(aucune)'), '',
    '**Indices visibles**', '', ...exercise.hints.map(hint => `- ${String(hint).replace(/\s+/g, ' ').trim()}`), '');
}

const output = path.join(root, 'corrections/resultats');
fs.writeFileSync(path.join(output, 'echantillon-grilles-5pourcent-lot1-partie3.md'), lines.join('\n') + '\n');
fs.writeFileSync(path.join(output, 'echantillon-grilles-5pourcent-lot1-partie3.tsv'), rows.join('\n') + '\n');
console.log(`${sample.length} grilles de ${sample.length} cours choisies ; ${omitted.length} cours non tirés.`);
