'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const parse5 = require('parse5');
const catalogue = require('../server/exercises');
const chapitre = require('../server/exercises/ingenierie-besoin/chapitre1');
const { runTests } = require('../server/exercises/runner');
const { runAnalyse } = require('../server/services/execution/local-runner');

const exercise = catalogue.getExercise('ib2-c1-e3');
const required = ['id', 'titre', 'description', 'source', 'priorite'];
const walk = node => [node, ...(node.childNodes || []).flatMap(walk)];
const text = node => node.nodeName === '#text' ? node.value : (node.childNodes || []).map(text).join('');

test('la liste des attributs de l’énoncé correspond aux champs des données JSON', () => {
  const fields = walk(parse5.parseFragment(exercise.brief))
    .filter(node => node.tagName === 'code').slice(0, 5).map(text);
  assert.deepEqual(fields, required);
  const example = JSON.parse(exercise.examples[0].stdin);
  assert.deepEqual(Object.keys(example), required);
  assert.match(exercise.brief, /id, titre, description, source, priorite/);
  assert.equal(chapitre.find(item => item.id === exercise.id).brief, exercise.brief);
});

test('les trois cas affichés conduisent aux attendus par une vérification indépendante', async () => {
  const cases = exercise.starter.split('\n').filter(line => line.startsWith('# Données : '))
    .map(line => JSON.parse(line.slice('# Données : '.length)));
  assert.equal(cases.length, exercise.tests.length);
  const expected = input => {
    for (const field of required) {
      if (!Object.hasOwn(input, field) || input[field] === '') return `ERREUR: Champ manquant ${field}`;
    }
    if (!['Haute', 'Moyenne', 'Basse'].includes(input.priorite)) return 'ERREUR: Priorite invalide';
    return `VALIDE (${input.id})`;
  };
  for (const [index, input] of cases.entries()) assert.equal(exercise.tests[index].expected, expected(input));
  assert.equal(exercise.examples[0].expected, expected(JSON.parse(exercise.examples[0].stdin)));
  const execute = async ({ code, stdin }) => {
    const result = await runAnalyse(code, stdin);
    return { ok: result.ok, stdout: result.data.stdout };
  };
  const correct = await runTests(exercise, exercise.solution, { execute });
  assert.equal(correct.passed, correct.total);
  for (const wrong of [
    exercise.solution.replace('ERREUR: Champ manquant titre', 'ERREUR: Champ manquant description'),
    exercise.solution.replace('VALIDE (REQ-004)', 'ERREUR: Champ manquant description')
  ]) {
    assert.notEqual(wrong, exercise.solution);
    const result = await runTests(exercise, wrong, { execute });
    assert.equal(result.stop.reason, 'wrong_output');
  }
});
