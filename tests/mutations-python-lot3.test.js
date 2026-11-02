'use strict';

const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const test = require('node:test');
const catalogue = require('../server/exercises');
const policy = require('../server/exercises/grading-policy');
const { runTests } = require('../server/exercises/runner');

async function provider({ code, stdin }) {
  const result = spawnSync('/usr/bin/bwrap', [
    '--die-with-parent', '--unshare-all', '--new-session', '--clearenv', '--cap-drop', 'ALL',
    '--ro-bind', '/usr', '/usr', '--symlink', 'usr/bin', '/bin', '--symlink', 'usr/lib', '/lib',
    '--symlink', 'usr/lib', '/lib64', '--dir', '/etc', '--ro-bind', '/etc/ld.so.cache', '/etc/ld.so.cache',
    '--proc', '/proc', '--dev', '/dev', '--tmpfs', '/tmp', '--chdir', '/tmp',
    '/usr/bin/python3', '-I', '-B', '-c', code
  ], { input: stdin, encoding: 'utf8', timeout: 5000, maxBuffer: 1024 * 1024 });
  if (result.error) throw result.error;
  return { ok: result.status === 0, status: result.status === 0 ? 'success' : 'runtime_error',
    stdout: result.stdout, stderr: result.stderr, exitCode: result.status };
}

test('la frontière d’une minute rejette une mutation acceptée par les anciens tests', async () => {
  const exercise = catalogue.getExercise('py-c1-e3');
  assert.equal(policy.isGradingSuspended(exercise.course, exercise.id), true);
  const mutant = exercise.solution.replace('(total % 3600) // 60', '(total % 3600) // 61');
  assert.notEqual(mutant, exercise.solution);
  const oldTests = exercise.tests.filter(item => item.stdin !== '60');
  const before = await runTests({ ...exercise, tests: oldTests }, mutant, { execute: provider });
  assert.equal(before.stop, null);
  assert.equal(before.passed, oldTests.length);
  const after = await runTests(exercise, mutant, { execute: provider });
  assert.equal(after.stop?.reason, 'wrong_output');
  const correct = await runTests(exercise, exercise.solution, { execute: provider });
  assert.equal(correct.stop, null);
  assert.equal(correct.passed, exercise.tests.length);
});
