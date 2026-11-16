'use strict';

if (require('./lot1-sandbox').runInsideIsolatedOrRegister(__filename)) {

const test = require('node:test');
const assert = require('node:assert/strict');
const { getExercise } = require('../server/exercises');
const { runTests } = require('../server/exercises/runner');
const localRunner = require('../server/services/execution/local-runner');

async function runAlgo({ code, stdin }) {
  const res = await localRunner.runPseudoCode(code, stdin);
  return {
    ok: res.ok,
    status: res.ok ? 'success' : 'runtime_error',
    stdout: res.data?.stdout || '',
    stderr: res.data?.stderr || '',
    compileError: res.data?.compile_error || ''
  };
}

async function checked(exercise, code) {
  return runTests(exercise, code, { execute: runAlgo });
}

test('F109 : format explicite et égalités du maximum', async () => {
  const exercise = getExercise('algo-c3-e2');
  assert.equal(exercise.language, 'algo');
  assert.ok(exercise.brief.includes('Max : 9 (position 2)'));
  assert.equal((await checked(exercise, exercise.solution)).passed, exercise.tests.length);
  const equalities = exercise.solution.replaceAll('> maximum', '>= maximum');
  const missingFormat = exercise.solution.replace(
    'Afficher("Max : " & maximum & " (position " & position & ")")',
    'Afficher(maximum & " : " & position)'
  );
  for (const variant of [equalities, missingFormat]) {
    assert.notEqual(variant, exercise.solution);
    const report = await checked(exercise, variant);
    assert.equal(report.stop.reason, 'wrong_output');
  }
  const witness = await runAlgo({ code: exercise.solution, stdin: '-5\n-5\n-8\n' });
  assert.equal(witness.stdout.trim(), 'Max : -5 (position 1)');
});

test('F112 : domaine non vide, première valeur et nombres négatifs', async () => {
  const exercise = getExercise('algo-c6-e1');
  assert.equal(exercise.language, 'algo');
  assert.ok(exercise.brief.includes('n ≥ 1'));
  assert.equal((await checked(exercise, exercise.solution)).passed, exercise.tests.length);
  const zeroMaximum = exercise.solution.replace('maximum <- t[0]', 'maximum <- 0');
  const omitFirst = exercise.solution.replace(
    '  Pour i De 0 A n - 1 Faire\n    somme <- somme + t[i]',
    '  Pour i De 1 A n - 1 Faire\n    somme <- somme + t[i]'
  );
  for (const variant of [zeroMaximum, omitFirst]) {
    assert.notEqual(variant, exercise.solution);
    const report = await checked(exercise, variant);
    assert.equal(report.stop.reason, 'wrong_output');
  }
  const witness = await runAlgo({ code: exercise.solution, stdin: '1\n-9\n' });
  assert.equal(witness.stdout.trim(), '-9\n-9');
});

}
