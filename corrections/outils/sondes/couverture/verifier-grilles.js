'use strict';

const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { sections } = require('./grille');
const root = path.resolve(process.argv[2] || process.cwd());
if (!process.argv[3]) throw new Error('Fournir un répertoire de sortie privé déjà créé.');
const destination = path.resolve(process.argv[3]);
const output = fs.lstatSync(destination);
if (!output.isDirectory() || output.isSymbolicLink() || fs.realpathSync(destination) !== destination ||
    destination === root || destination.startsWith(root + path.sep) || (output.mode & 0o077) !== 0) {
  throw new Error('Destination privée hors du dépôt requise.');
}
const parse5 = require(path.join(root, 'node_modules/parse5'));
const { listExercises } = require(path.join(root, 'server/exercises'));
const { MAX_TESTS } = require(path.join(root, 'server/exercises/runner'));
const config = require(path.join(root, 'server/exercises/course-config'));
const analyses = listExercises().filter(exercise => exercise.language === 'analyse');
const byId = new Map(analyses.map(exercise => [exercise.id, exercise]));
const state = new Map(analyses.map(exercise => [exercise.id, {
  exact: 0,
  different: 0,
  initialized: 0,
  misconfigured: 0,
  files: new Set(),
  sourceSections: sections(exercise.starter),
  present: exercise.tests.slice(0, MAX_TESTS).map(() => false),
  matching: exercise.tests.slice(0, MAX_TESTS).map(() => false),
  visible: exercise.tests.slice(0, MAX_TESTS).map(() => false)
}]));
const normalize = value => String(value || '').replace(/\r\n?/g, '\n').replace(/^\n/, '').replace(/\s+$/, '\n');
const hash = value => crypto.createHash('sha256').update(String(value)).digest('hex');
const inputFingerprint = exercise => hash(JSON.stringify({
  starter: exercise.starter,
  selectors: exercise.tests.slice(0, MAX_TESTS).map(test => test.stdin)
}));
const pageFingerprints = {};

function attr(node, name) {
  return (node.attrs || []).find(attribute => attribute.name === name)?.value;
}

function children(node, callback) {
  callback(node);
  for (const child of node.childNodes || []) children(child, callback);
}

let inspectedFiles = 0;
for (const course of [...new Set(analyses.map(exercise => exercise.course))]) {
  const entry = config[course];
  if (!entry) continue;
  const folder = path.join(root, entry.dir);
  const chapterFolder = path.join(folder, entry.chapterDir);
  const files = [];
  for (const directory of [folder, chapterFolder]) {
    if (!fs.existsSync(directory)) continue;
    for (const filename of fs.readdirSync(directory)) {
      if (filename.endsWith('.html')) files.push(path.join(directory, filename));
    }
  }
  for (const filename of files) {
    const text = fs.readFileSync(filename, 'utf8');
    pageFingerprints[path.relative(root, filename)] = hash(text);
    const document = parse5.parse(text);
    inspectedFiles++;
    let hasLabScript = false;
    children(document, node => {
      if (node.tagName === 'script' && /(?:^|\/)code-lab\.js(?:\?|$)/.test(attr(node, 'src') || '')) hasLabScript = true;
    });
    children(document, node => {
      if (node.tagName !== 'div') return;
      const id = attr(node, 'data-exercise');
      if (!byId.has(id) || byId.get(id).course !== course) return;
      const record = state.get(id);
      record.files.add(path.relative(root, filename));
      if (attr(node, 'data-lab') === undefined || attr(node, 'data-language') !== 'analyse' || !hasLabScript) {
        record.misconfigured++;
        return;
      }
      record.initialized++;
      let starter = null;
      children(node, descendant => {
        if (descendant.tagName === 'script' && attr(descendant, 'data-lab-starter') !== undefined) starter = descendant;
      });
      if (!starter) return;
      const content = (starter.childNodes || []).map(child => child.value || '').join('');
      if (normalize(content) === normalize(byId.get(id).starter)) record.exact++;
      else record.different++;
      const displayed = sections(content);
      const allDisplayed = [...displayed.values()].filter(values => values.length).map(values => JSON.stringify(values));
      byId.get(id).tests.slice(0, MAX_TESTS).forEach((test, index) => {
        const selector = /^cas\s*:\s*(\d+)$/i.exec(String(test.stdin || '').trim());
        if (!selector) return;
        const number = Number(selector[1]);
        const sourceData = record.sourceSections.get(number);
        const pageData = displayed.get(number);
        if (pageData && pageData.length) record.present[index] = true;
        if (!sourceData || !sourceData.length) return;
        const serialized = JSON.stringify(sourceData);
        if (pageData && JSON.stringify(pageData) === serialized) record.matching[index] = true;
        if (allDisplayed.includes(serialized)) record.visible[index] = true;
      });
    });
  }
}

fs.mkdirSync(destination, { recursive: true, mode: 0o700 });
const lines = ['identifiant\tcours\toccurences_conformes\toccurences_differentes\tselecteurs\tdonnees_affichees\tdonnees_conformes\tdonnees_source_visibles\tprovenance\toccurences_initialisables\toccurences_non_initialisables'];
const visibility = { pageFingerprints, exercises: {} };
for (const exercise of analyses.sort((left, right) => left.id < right.id ? -1 : left.id > right.id ? 1 : 0)) {
  const record = state.get(exercise.id);
  lines.push([exercise.id, exercise.course, record.exact, record.different, record.present.length,
    record.present.filter(Boolean).length, record.matching.filter(Boolean).length,
    record.visible.filter(Boolean).length, [...record.files].sort().join('|'), record.initialized, record.misconfigured].join('\t'));
  visibility.exercises[exercise.id] = { fingerprint: inputFingerprint(exercise), visibleByTestIndex: record.visible };
}
fs.writeFileSync(path.join(destination, 'grilles-pages.tsv'), `${lines.join('\n')}\n`, { mode: 0o600, flag: 'wx' });
fs.writeFileSync(path.join(destination, '.visibilite-grilles.json'), `${JSON.stringify(visibility)}\n`, { mode: 0o600, flag: 'wx' });
console.log(JSON.stringify({
  grilles: analyses.length,
  pagesInspectees: inspectedFiles,
  grillesDansUnePageConforme: [...state.values()].filter(record => record.exact > 0).length,
  grillesSansPageConforme: [...state.values()].filter(record => !record.exact).length,
  grillesAvecUneOccurrenceDifferente: [...state.values()].filter(record => record.different > 0).length,
  grillesAvecUneOccurrenceInitialisable: [...state.values()].filter(record => record.initialized > 0).length,
  grillesAvecUneOccurrenceNonInitialisable: [...state.values()].filter(record => record.misconfigured > 0).length,
  grillesAvecToutesDonneesAffichees: [...state.values()].filter(record => record.present.every(Boolean)).length,
  selecteurs: [...state.values()].reduce((sum, record) => sum + record.present.length, 0),
  selecteursAvecDonneesAffichees: [...state.values()].reduce((sum, record) => sum + record.present.filter(Boolean).length, 0),
  selecteursAvecDonneesConformes: [...state.values()].reduce((sum, record) => sum + record.matching.filter(Boolean).length, 0),
  selecteursDontDonneesSourceVisibles: [...state.values()].reduce((sum, record) => sum + record.visible.filter(Boolean).length, 0)
}));
