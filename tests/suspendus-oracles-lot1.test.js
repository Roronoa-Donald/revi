'use strict';

if (require('./lot1-sandbox').runInsideIsolatedOrRegister(__filename)) {

const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const path = require('node:path');
const test = require('node:test');
const linux = require('../server/exercises/b3-linux');
const github = require('../server/exercises/b3-github');
const witnesses = require('../corrections/outils/sondes/suspendus-oracles/temoins.json');

test('les témoins Linux B3 et GitHub B3 concordent avec des oracles indépendants', () => {
  const exercises = [...linux, ...github];
  assert.equal(exercises.length, 36);
  assert.deepEqual(Object.keys(witnesses).sort(), exercises.map(exercise => exercise.id).sort());
  const cases = exercises.flatMap(exercise => {
    const indexes = witnesses[exercise.id];
    assert.equal(indexes.length, 2, exercise.id);
    assert.notEqual(indexes[0], indexes[1], exercise.id);
    return indexes.map(index => {
      const sample = exercise.tests[index - 1];
      assert.ok(sample, `${exercise.id} : témoin absent`);
      return { id: exercise.id, index, origin: 'test_cache', test: sample };
    });
  });
  const script = path.resolve(__dirname, '../corrections/outils/sondes/suspendus-oracles/oracles.py');
  const result = spawnSync('/usr/bin/python3', ['-I', script], {
    input: JSON.stringify(cases), encoding: 'utf8', timeout: 30000, maxBuffer: 4 * 1024 * 1024,
    env: { PATH: '/usr/bin:/bin', LANG: 'C.UTF-8', REVI_AUDIT_NET_NS_HOTE: process.env.REVI_AUDIT_NET_NS_HOTE }
  });
  assert.equal(result.status, 0, result.stderr);
  const report = JSON.parse(result.stdout);
  assert.equal(report.schema, 'revi.oracles-independants.v1');
  assert.equal(report.resultats.length, 72);
  assert.ok(report.resultats.every(item => item.identique_apres_comparaison), 'un témoin diffère de son oracle');
});

}
