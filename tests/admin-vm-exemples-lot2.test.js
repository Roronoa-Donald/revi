'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { getExercise, toClient } = require('../server/exercises');
const { runTests } = require('../server/exercises/runner');

const affected = [
  'vm2-c1-e3', 'vm2-c2-e3', 'vm2-c4-e1', 'vm2-c4-e3',
  'vm2-c5-e1', 'vm2-c5-e2', 'vm2-c5-e3'
];

test('les sept exemples VM sont vérifiés explicitement, pas recopiés comme tests cachés', () => {
  for (const id of affected) {
    const exercise = getExercise(id);
    const example = exercise.examples[0];
    assert.equal(exercise.verifyFirstExample, true, id);
    assert.ok(exercise.tests.length >= 2, id);
    assert.ok(exercise.tests.every(entry => entry.stdin !== example.stdin), id);
    assert.equal(toClient(exercise).tests, undefined, id);
    assert.equal(toClient(exercise).examples[0].expected, example.expected, id);
  }
});

test('le moteur rejette une réponse correcte aux cas cachés mais fausse sur l’exemple', async () => {
  for (const id of affected) {
    const exercise = getExercise(id);
    const example = exercise.examples[0];
    const entries = new Map(exercise.tests.map(entry => [entry.stdin, entry.expected]));
    const seen = [];
    const report = await runTests(exercise, 'simulation', {
      execute: async ({ stdin }) => {
        seen.push(stdin);
        return { ok: true, status: 'success', stdout: stdin === example.stdin ? 'REPONSE_INCORRECTE' : entries.get(stdin), stderr: '', exitCode: 0 };
      }
    });
    assert.equal(report.stop.reason, 'wrong_output', id);
    assert.equal(report.stop.input, example.stdin, id);
    assert.equal(seen.length, exercise.tests.length + 1, id);
  }
});
