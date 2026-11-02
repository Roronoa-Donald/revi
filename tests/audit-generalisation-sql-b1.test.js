'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const { ids, exploiter } = require('../corrections/outils/sondes/sql-b1-generalisation/exploiter');

const selfCheck = 'une requête adaptée aux jeux connus réussit les anciens tests mais échoue sur le parc inédit';

function entry(name) {
  return {
    nom: name, fichier: '/project/tests/sql-lot1-fresh.test.js', profondeur: 0, genre: 'test',
    verdict: 'pass', ignore: null, todo: null, type_erreur: null, message: null
  };
}

function report() {
  const tests = [...ids.map(id => entry(`${id} : témoin`)), entry(selfCheck)];
  return {
    format: 'revi-sql-b1-fresh-v1', node: 'v22.23.4',
    isolation: { pid1: 'bwrap', reseau_separe: true, variable_home_absente: true, repertoire_home_absent: true },
    empreintes: {}, resumes: [{ success: true, counts: { tests: tests.length, cancelled: 0 } }], tests
  };
}

test('les résultats individuels et les deux CREATE sont conservés', () => {
  const result = exploiter(report(), 0);
  assert.equal(result.infrastructure, null);
  assert.equal(result.exercices.filter(exercise => exercise.etat === 'réussi').length, 18);
  assert.deepEqual(result.exercices.filter(exercise => exercise.base_initiale_deja_connue).map(exercise => exercise.id),
    ['sq-c2-e1', 'sq-c2-e2']);
  assert.equal(result.tests_auxiliaires[0].etat, 'réussi');
});

test('un échec individuel ne contamine pas les autres fiches', () => {
  const input = report();
  Object.assign(input.tests[0], { verdict: 'fail', type_erreur: 'testCodeFailure', message: 'assertion échouée' });
  input.resumes[0].success = false;
  const result = exploiter(input, 1);
  assert.equal(result.infrastructure, null);
  assert.equal(result.exercices[0].etat, 'échoué');
  assert.equal(result.exercices[0].scenarios, null);
  assert.equal(result.exercices.filter(exercise => exercise.etat === 'réussi').length, 17);
});

test('SKIP et TODO ne deviennent jamais des réussites', () => {
  const input = report();
  input.tests[1].ignore = 'indisponible';
  input.tests[2].todo = 'à vérifier';
  const result = exploiter(input, 0);
  assert.equal(result.exercices[1].etat, 'non évalué');
  assert.equal(result.exercices[2].etat, 'non évalué');
  assert.equal(result.tests_ignores_ou_todo.length, 2);
});

test('un test absent ou dupliqué est signalé', () => {
  const input = report();
  input.tests.splice(1, 1);
  input.tests.push(entry(`${ids[0]} : doublon`));
  const result = exploiter(input, 0);
  assert.equal(result.exercices[0].etat, 'non évalué');
  assert.equal(result.exercices[1].etat, 'non évalué');
  assert.equal(result.anomalies.length, 2);
});

test('un autotest ignoré ou absent reste visible', () => {
  const ignored = report();
  ignored.tests.at(-1).ignore = true;
  assert.equal(exploiter(ignored, 0).tests_auxiliaires[0].etat, 'non évalué');
  const missing = report();
  missing.tests.pop();
  missing.resumes[0].counts.tests--;
  const result = exploiter(missing, 0);
  assert.equal(result.tests_auxiliaires[0].etat, 'non évalué');
  assert.match(result.tests_auxiliaires[0].raison, /absent/);
});

test('un échec de préparation ne devient pas un échec de corrigé', () => {
  const input = report();
  Object.assign(input.tests[0], { verdict: 'fail', type_erreur: 'hookFailed', message: 'préparation impossible' });
  input.resumes[0].success = false;
  const result = exploiter(input, 1);
  assert.match(result.infrastructure, /Interruption/);
  assert.equal(result.exercices.filter(exercise => exercise.etat === 'non évalué').length, 18);
});

test('un rapport incomplet ou une isolation non attestée échoue fermé', () => {
  const incomplete = exploiter(null, 2, 'banc indisponible');
  assert.equal(incomplete.infrastructure, 'banc indisponible');
  assert.equal(incomplete.exercices.filter(exercise => exercise.etat === 'non évalué').length, 18);
  const input = report();
  input.isolation.reseau_separe = false;
  assert.ok(exploiter(input, 0).infrastructure);
});

test('un code global incohérent ne valide aucun exercice', () => {
  const input = report();
  Object.assign(input.tests[0], { verdict: 'fail', type_erreur: 'testCodeFailure', message: 'échec' });
  const result = exploiter(input, 0);
  assert.ok(result.infrastructure);
  assert.equal(result.exercices.filter(exercise => exercise.etat === 'non évalué').length, 18);
});
