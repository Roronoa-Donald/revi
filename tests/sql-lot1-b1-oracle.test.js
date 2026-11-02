'use strict';

if (require('./lot1-sandbox').runInsideIsolatedOrRegister(__filename)) {

const assert = require('node:assert/strict');
const test = require('node:test');
const exercises = require('../server/exercises/b1-sql');
const plans = require('../corrections/outils/sondes/sql-b1-temoins/fixtures');
const { makeCase } = require('../corrections/outils/sondes/sql-b1-temoins/oracle');

test('les 18 fiches SQL B1 possèdent deux témoins modélisés', () => {
  assert.equal(exercises.length, 18);
  assert.deepEqual(Object.keys(plans).sort(), exercises.map(exercise => exercise.id).sort());
});

for (const exercise of exercises) {
  test(`${exercise.id} : les deux attendus concordent avec le modèle indépendant`, () => {
    const plan = plans[exercise.id];
    assert.equal(plan.cases.length, 2);
    for (const [index, definition] of plan.cases.entries()) {
      const model = makeCase(exercise.id, definition);
      const actual = exercise.tests[index];
      assert.equal(actual.label, model.label);
      assert.equal(actual.stdin, model.stdin);
      assert.equal(actual.expected, model.expected);
    }
  });
}

}
