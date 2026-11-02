'use strict';

if (require('./lot1-sandbox').runInsideIsolatedOrRegister(__filename)) {

const test = require('node:test');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const { getExercise } = require('../server/exercises');
const { runTests } = require('../server/exercises/runner');

async function runPython({ code, stdin }) {
  const result = spawnSync('/usr/bin/python3', ['-I', '-c', code], {
    input: stdin, encoding: 'utf8', timeout: 2000, maxBuffer: 1048576
  });
  return {
    ok: result.status === 0,
    status: result.status === 0 ? 'success' : 'runtime_error',
    stdout: result.stdout || '',
    stderr: result.stderr || ''
  };
}

async function checked(exercise, code) {
  return runTests(exercise, code, { execute: runPython });
}

test('F109 : format explicite et égalités du maximum', async () => {
  const exercise = getExercise('algo-c3-e2');
  assert.ok(exercise.brief.includes('Max : 9 (position 2)'));
  assert.equal((await checked(exercise, exercise.solution)).passed, exercise.tests.length);
  const equalities = exercise.solution.replaceAll('> maximum:', '>= maximum:');
  const missingFormat = exercise.solution.replace(
    'print("Max :", maximum, "(position", str(position) + ")")',
    'print(maximum, ":", position)'
  );
  for (const variant of [equalities, missingFormat]) {
    assert.notEqual(variant, exercise.solution);
    const report = await checked(exercise, variant);
    assert.equal(report.stop.reason, 'wrong_output');
  }
  const witness = await runPython({ code: exercise.solution, stdin: '-5\n-5\n-8\n' });
  assert.equal(witness.stdout.trim(), 'Max : -5 (position 1)');
});

test('F112 : domaine non vide, première valeur et nombres négatifs', async () => {
  const exercise = getExercise('algo-c6-e1');
  assert.ok(exercise.brief.includes('n ≥ 1'));
  assert.equal((await checked(exercise, exercise.solution)).passed, exercise.tests.length);
  const zeroMaximum = exercise.solution.replace('maximum = tableau[0]', 'maximum = 0');
  const omitFirst = exercise.solution.replace('for valeur in tableau:', 'for valeur in tableau[1:]:');
  for (const variant of [zeroMaximum, omitFirst]) {
    assert.notEqual(variant, exercise.solution);
    const report = await checked(exercise, variant);
    assert.equal(report.stop.reason, 'wrong_output');
  }
  const witness = await runPython({ code: exercise.solution, stdin: '1\n-9\n' });
  assert.equal(witness.stdout.trim(), '-9\n-9');
});

}
