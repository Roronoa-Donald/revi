'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const catalogue = require('../server/exercises');
const policy = require('../server/exercises/grading-policy');
const { runTests } = require('../server/exercises/runner');

test('le comparateur du site normalise les espaces par défaut, mais pas pour le cas Git sensible', async () => {
  const exercise = catalogue.getExercise('gh3-c1-e2');
  const exact = exercise.tests[1];
  assert.equal(exact.mode, 'exact');
  assert.equal(policy.isGradingSuspended(exercise.course, exercise.id), true);
  const changed = exact.expected.replace('z.lnk \n', 'z.lnk\n');
  assert.notEqual(changed, exact.expected);
  const execute = async () => ({ ok: true, status: 'success', stdout: changed });
  const run = item => runTests({ ...exercise, tests: [item], verifyFirstExample: false },
    '#!/usr/bin/env bash\n', { execute });
  const normal = await run({ ...exact, mode: undefined });
  assert.equal(normal.passed, 1);
  const strict = await run(exact);
  assert.equal(strict.passed, 0);
  assert.equal(strict.stop?.reason, 'wrong_output');
});
