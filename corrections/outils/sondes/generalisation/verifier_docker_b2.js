'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '../../../..');
const reportPath = process.argv[2] || path.join(root, 'corrections/resultats/generalisation-docker-lot1-partie3.json');
const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, 'cas_docker_b2.json'), 'utf8'));
const catalogueSource = fs.readFileSync(path.join(root, 'server/exercises/docker.js'), 'utf8');
const catalogueMatch = /^const DK2_EXERCISES = (\[[\s\S]*?\n\]);/m.exec(catalogueSource);
assert.ok(catalogueMatch, 'tableau littéral du catalogue introuvable');
const catalogue = JSON.parse(catalogueMatch[1]);
const exercises = new Map(catalogue.map(exercise => [exercise.id, exercise]));
const definitions = new Map(manifest.exercices.map(exercise => [exercise.id, exercise]));
const digest = value => crypto.createHash('sha256').update(value).digest('hex');
const normalize = value => value.replace(/\r\n?/g, '\n').split('\n')
  .map(line => line.replace(/\s+$/u, '')).join('\n').replace(/^\n+|\n+$/g, '');

assert.ok(['réussi', 'incomplet ou défaut détecté'].includes(report.etat));
assert.equal(report.code_sortie, report.etat === 'réussi' ? 0 : 1);
assert.equal(report.sources_stables_pendant_execution, true);
assert.equal(report.perimetre.suspension_docker_maintenue, true);
assert.equal(report.perimetre.exclu_deja_evalue, 'dk2-c1-e1');
assert.equal(report.exercices.length, 17);
assert.equal(definitions.size, 17);
assert.equal(new Set(report.exercices.map(exercise => exercise.id)).size, 17);
assert.deepEqual(new Set(report.exercices.map(exercise => exercise.id)), new Set(definitions.keys()));
assert.ok(Object.values(report.autocontroles).every(Boolean));
for (const key of ['reseau_separe', 'home_absent', 'variable_home_absente', 'oracle_absent', 'catalogue_absent']) {
  assert.equal(report.isolation[key], true, key);
}
assert.equal(report.isolation.pid1, 'bwrap');
for (const [name, expected] of Object.entries(report.versions.sources_sha256)) {
  assert.equal(digest(fs.readFileSync(path.join(root, name))), expected, name);
}
assert.equal(digest(fs.readFileSync(path.join(__dirname, 'rejouer-docker-b2.sh'))), report.lanceur_sha256);

let executions = 0;
let mutantDifferences = 0;
let correctedDifferences = 0;
const defectiveExercises = [];
const seenInputs = new Set();
for (const row of report.exercices) {
  const exercise = exercises.get(row.id);
  const definition = definitions.get(row.id);
  assert.ok(exercise && definition, row.id);
  assert.equal(digest(exercise.solution), row.corrige_sha256, row.id);
  assert.equal(row.cas.length, 2, row.id);
  assert.equal(row.mutants.length, 2, row.id);
  const mutantDigests = new Set();
  for (const [index, item] of row.cas.entries()) {
    const fixture = definition.cas[index];
    assert.equal(item.numero, index + 1);
    assert.equal(item.entree, fixture.entree);
    assert.equal(item.attendu, fixture.attendu);
    assert.equal(item.raison, fixture.raison);
    assert.equal(digest(item.entree), item.entree_sha256);
    assert.equal(item.nouveaute_verifiee, true);
    assert.equal(item.attendu_oracle_verifie, true);
    assert.equal(item.corrige.code_sortie, 0);
    assert.equal(item.corrige.etat, item.corrige.sortie_normalisee === normalize(item.attendu) ? 'conforme' : 'différent');
    if (item.corrige.etat === 'différent') correctedDifferences++;
    assert.equal(item.corrige.attendu_normalise_sha256, digest(normalize(item.attendu)));
    const normalizedInput = item.entree.replace(/\s+/gu, ' ').trim();
    assert.ok(normalizedInput && !seenInputs.has(normalizedInput), row.id);
    seenInputs.add(normalizedInput);
    executions++;
  }
  const defective = row.cas.some(item => item.corrige.etat === 'différent');
  assert.equal(row.etat, defective ? 'échoué' : 'réussi', row.id);
  if (defective) defectiveExercises.push(row.id);
  for (const mutant of row.mutants) {
    assert.equal(mutant.etat, 'rejeté', row.id);
    assert.ok(mutant.description && mutant.original !== mutant.remplacement);
    assert.equal(exercise.solution.split(mutant.original).length, 2, row.id);
    const code = exercise.solution.replace(mutant.original, mutant.remplacement);
    assert.equal(digest(code), mutant.code_sha256, row.id);
    assert.notEqual(mutant.code_sha256, row.corrige_sha256, row.id);
    assert.ok(!mutantDigests.has(mutant.code_sha256), row.id);
    mutantDigests.add(mutant.code_sha256);
    assert.equal(mutant.cas.length, 2, row.id);
    const witnesses = [];
    for (const [index, item] of mutant.cas.entries()) {
      const expected = normalize(row.cas[index].attendu);
      assert.equal(item.numero, index + 1);
      assert.equal(item.code_sortie, 0);
      assert.equal(item.attendu_normalise_sha256, digest(expected));
      assert.equal(item.etat, item.sortie_normalisee === expected ? 'conforme' : 'différent');
      if (item.etat === 'différent') {
        mutantDifferences++;
        if (row.cas[index].corrige.etat === 'conforme') witnesses.push(index + 1);
      }
      executions++;
    }
    assert.deepEqual(mutant.cas_rejet_sur_corrige_conforme, witnesses, row.id);
    assert.ok(witnesses.length, `${row.id} : mutant ${mutant.numero} non rejeté sur un corrigé conforme`);
  }
}
assert.equal(executions, 102);
assert.equal(report.resume.executions_terminees, executions);
assert.equal(seenInputs.size, 34);
assert.equal(report.code_sortie, defectiveExercises.length ? 1 : 0);
console.log(`Preuves cohérentes : 17 exercices, 34 cas, 34 mutants, ${executions} exécutions ; ${correctedDifferences} sortie(s) corrigée(s) divergente(s), ${mutantDifferences} sortie(s) mutante(s) divergente(s).`);
if (defectiveExercises.length) console.log(`Exercices présentant une divergence : ${defectiveExercises.join(', ')}`);
