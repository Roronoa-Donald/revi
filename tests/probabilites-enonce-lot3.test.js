'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const { getExercise, toClient } = require('../server/exercises');

test('la grille de probabilité demande une fraction réduite sans publier les réponses des cas', () => {
  const exercise = getExercise('pb2-c1-e1');
  const visible = toClient(exercise);
  assert.match(visible.brief, /fraction réduite/);
  assert.match(visible.brief, /dénominateur strictement positif/);
  for (const sample of [...exercise.examples, ...exercise.tests]) {
    assert.ok(!visible.brief.includes(sample.expected));
  }
  assert.match(visible.hints[0], /\?/);
  assert.ok(visible.examples.every(example => !Object.hasOwn(example, 'expected')));
});
