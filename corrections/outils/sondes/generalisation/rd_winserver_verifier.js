'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '../../../..');
const probe = path.join(root, 'corrections/outils/sondes/generalisation');
const results = path.join(root, 'corrections/resultats');
const manifestPath = path.join(probe, 'cas_rd_winserver.json');
const beforePath = path.join(results, 'rd_winserver-lot1-partie3-avant.json');
const afterPath = process.argv[2] ? path.resolve(process.argv[2]) : path.join(results, 'rd_winserver-lot1-partie3-apres.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const before = JSON.parse(fs.readFileSync(beforePath, 'utf8'));
const after = JSON.parse(fs.readFileSync(afterPath, 'utf8'));
const registry = require(path.join(root, 'server/exercises'));
const { MAX_TESTS } = require(path.join(root, 'server/exercises/runner'));
const digest = value => crypto.createHash('sha256').update(value).digest('hex');
const fileDigest = file => digest(fs.readFileSync(file));

assert.equal(before.phase, 'avant');
assert.equal(after.phase, 'apres');
assert.equal(before.mesure_complete, true);
assert.equal(after.mesure_complete, true);
assert.equal(after.versions.rapport_initial_sha256, fileDigest(beforePath));
assert.equal(before.versions.manifeste_sha256, fileDigest(manifestPath));
assert.equal(after.versions.manifeste_sha256, fileDigest(manifestPath));
assert.equal(before.versions.oracle_sha256, fileDigest(path.join(probe, 'rd_winserver.py')));
assert.equal(after.versions.oracle_sha256, before.versions.oracle_sha256);
assert.equal(after.versions.catalogue_sha256, fileDigest(path.join(root, 'server/exercises/rd_winserver.js')));
assert.equal(after.versions.runner_sha256, fileDigest(path.join(root, 'server/exercises/runner.js')));
assert.equal(before.versions.runner_sha256, after.versions.runner_sha256);
assert.equal(after.versions.banc_commun_sha256, fileDigest(path.join(probe, 'banc.py')));
assert.equal(after.versions.lanceur_commun_sha256, fileDigest(path.join(probe, 'rejouer.sh')));
assert.equal(before.versions.partie2_sha256, fileDigest(path.join(results, 'generalisation-non-evalues-lot1-partie2.tsv')));
assert.equal(after.versions.partie2_sha256, before.versions.partie2_sha256);
for (const report of [before, after]) {
  assert.equal(report.autocontroles.sources_stables, true);
  assert.equal(report.autocontroles.oracle_par_fiche, true);
  for (const key of ['reseau_separe', 'home_absent', 'variable_home_absente', 'oracle_absent', 'catalogue_absent']) {
    assert.equal(report.isolation[key], true);
  }
  assert.equal(report.isolation.pid1, 'bwrap');
}
assert.equal(before.autocontroles.rejet_ancien_test, true);

const definitions = [...manifest.exercices, ...manifest.domaines_finis];
assert.equal(manifest.exercices.length, 15);
assert.equal(manifest.domaines_finis.length, 2);
assert.equal(new Set(definitions.map(definition => definition.id)).size, 17);
const anciens = new Map(before.exercices.map(exercise => [exercise.id, exercise]));
const nouveaux = new Map(after.exercices.map(exercise => [exercise.id, exercise]));
assert.equal(anciens.size, 17);
assert.equal(nouveaux.size, 17);

let survivedBefore = 0;
let rejectedBefore = 0;
let rejectedAfter = 0;
let activeCross = 0;
let witnesses = 0;
let finiteWitnesses = 0;

for (const definition of definitions) {
  const exercise = registry.getExercise(definition.id);
  const initial = anciens.get(definition.id);
  const final = nouveaux.get(definition.id);
  assert(exercise && initial && final);
  assert.equal(exercise.language, 'powershell');
  assert.equal(exercise.course, 'rd_winserver');
  assert(exercise.tests.length <= MAX_TESTS);
  assert.deepEqual(exercise.tests.slice(0, initial.tests_initiaux.length), initial.tests_initiaux);
  assert.equal(digest(exercise.solution), initial.solution_sha256);
  assert.equal(final.solution_sha256, initial.solution_sha256);
  assert.equal(fileDigest(path.join(root, 'server/exercises', definition.source)), initial.source_sha256);
  assert.equal(final.source_sha256, initial.source_sha256);
  const client = registry.toClient(exercise);
  assert(!Object.hasOwn(client, 'tests') && !Object.hasOwn(client, 'solution'));

  const codes = [exercise.solution];
  for (const mutation of definition.mutants) {
    assert.equal(exercise.solution.split(mutation.ancien).length, 2);
    codes.push(exercise.solution.replace(mutation.ancien, mutation.nouveau));
  }
  assert.equal(new Set(codes.map(digest)).size, 3);
  const currentActive = exercise.tests.slice(0, MAX_TESTS);
  if (exercise.verifyFirstExample) currentActive.push(exercise.examples[0]);
  for (const report of [initial, final]) {
    assert.equal(report.corrige_accepte_temoins, true);
    assert.equal(report.temoins_croises, true);
    assert.equal(report.candidats.length, 3);
    for (const [index, candidate] of report.candidats.entries()) {
      assert.equal(candidate.code_sha256, digest(codes[index]));
      assert(candidate.cas.every(cell => cell.execution.etat === 'exécuté'));
    }
    const matrix = report.candidats.map(candidate => candidate.cas.filter(cell => cell.role === 'témoin'));
    assert.deepEqual(matrix[0].map(cell => cell.comparaison.etat), ['accepté', 'accepté']);
    assert.deepEqual(matrix[1].map(cell => cell.comparaison.etat), ['rejeté : mauvaise sortie', 'accepté']);
    assert.deepEqual(matrix[2].map(cell => cell.comparaison.etat), ['accepté', 'rejeté : mauvaise sortie']);
    assert.equal(report.candidats[0].actifs.etat, 'accepté');
  }
  for (const candidate of final.candidats) {
    const active = candidate.cas.filter(cell => cell.role === 'actif');
    assert.deepEqual(active.map(cell => cell.test), currentActive);
    assert.equal(candidate.actifs.total, currentActive.length);
    const firstRejected = active.findIndex(cell => cell.comparaison.etat === 'rejeté : mauvaise sortie');
    if (firstRejected < 0) {
      assert.equal(candidate.actifs.etat, 'accepté');
      assert.equal(candidate.actifs.passes, currentActive.length);
    } else {
      assert.equal(candidate.actifs.etat, 'rejeté : mauvaise sortie');
      assert.equal(candidate.actifs.stop.testIndex, firstRejected);
      assert.equal(candidate.actifs.passes, firstRejected);
    }
  }
  for (const [index, sample] of definition.cas.entries()) {
    const recorded = final.candidats[0].cas.filter(cell => cell.role === 'témoin')[index];
    assert.equal(recorded.test.stdin, sample.entree);
    assert.equal(recorded.test.expected, sample.attendu);
    assert(currentActive.some(test => test.stdin === sample.entree && test.expected === sample.attendu));
    if (final.domaine_fini) finiteWitnesses++;
    else witnesses++;
  }
  const matrix = final.candidats.slice(1).map(candidate => candidate.cas
    .filter(cell => cell.role === 'actif').map(cell => cell.comparaison.etat));
  assert(matrix[0].some((value, index) => value === 'rejeté : mauvaise sortie' && matrix[1][index] === 'accepté'));
  assert(matrix[1].some((value, index) => value === 'rejeté : mauvaise sortie' && matrix[0][index] === 'accepté'));
  activeCross++;
  for (const candidate of initial.candidats.slice(1)) {
    if (candidate.actifs.etat === 'accepté') survivedBefore++;
    else if (candidate.actifs.etat === 'rejeté : mauvaise sortie') rejectedBefore++;
    else throw new Error('Mutant initial non évalué');
  }
  for (const candidate of final.candidats.slice(1)) {
    assert.equal(candidate.actifs.etat, 'rejeté : mauvaise sortie');
    rejectedAfter++;
  }
  if (final.domaine_fini) {
    assert.equal(final.domaine_fini.toutes_deja_connues, true);
    assert.equal(exercise.verifyFirstExample, true);
  }
}

assert.equal(witnesses, 30);
assert.equal(finiteWitnesses, 4);
assert.equal(activeCross, 17);
assert.equal(survivedBefore + rejectedBefore, 34);
assert.equal(rejectedAfter, 34);
assert.equal(survivedBefore, before.compteurs['mutants_accepté']);
assert.equal(rejectedBefore, before.compteurs['mutants_rejeté : mauvaise sortie']);
assert.equal(rejectedAfter, after.compteurs['mutants_rejeté : mauvaise sortie']);
const untouched = registry.getExercise('ws2-c4-e3');
assert.equal(untouched.tests.length, 7);
assert.equal(untouched.verifyFirstExample, true);

console.log(`Fiches : ${definitions.length} ; témoins initialement inédits : ${witnesses} ; témoins connus (domaines finis) : ${finiteWitnesses}.`);
console.log(`Paires croisées actives : ${activeCross}/17 ; corrigés acceptés : 17/17.`);
console.log(`Mutants avant : ${rejectedBefore}/34 rejetés, ${survivedBefore}/34 acceptés ; après : ${rejectedAfter}/34 rejetés.`);
console.log('Hashes, cellules, ordre et arrêt du correcteur, exemples, plafond et projection client : cohérents.');
