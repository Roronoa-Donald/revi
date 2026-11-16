'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const jwt = require('jsonwebtoken');
const { buildApp } = require('../server/app');
const catalogue = require('../server/exercises');
const { runTests } = require('../server/exercises/runner');
const sqlEngine = require('../assets/js/engines/sql-wasm-engine');
const execution = require('../server/services/execution');
const budget = require('../server/services/execution/budget');

async function locallyGrade(item, code) {
  return runTests(item, code, { execute: async ({ code: source, stdin }) => {
    const result = await sqlEngine.execute(source, stdin, { timeoutMs: 10000 });
    return { ...result, ok: result.status === 'success' };
  } });
}

test('F170 : deux erreurs de bornes sont rejetées dans le modèle local', async () => {
  const item = catalogue.getExercise('sql3-c1-e2');
  assert.match(item.brief, /fictif|simplifié/i);
  assert.match(item.brief, /transactions en cours/i);
  const reference = await locallyGrade(item, item.solution);
  assert.equal(reference.passed, item.tests.length);
  assert.equal(reference.stop, null);
  for (const [before, after] of [['xmin < 50', 'xmin <= 50'], ['xmax >= 50', 'xmax > 50']]) {
    assert.equal(item.solution.split(before).length, 2);
    const changed = item.solution.replace(before, after);
    const report = await locallyGrade(item, changed);
    assert.equal(report.stop?.reason, 'wrong_output');
    assert.ok(report.passed < report.total);
  }
});

test('F170–F173 : les fiches SQL B3 sont notées localement en SQL WASM (0 appel externe) et restent fail-closed sur mutation', async () => {
  const previousSecret = process.env.JWT_SECRET;
  const original = execution.execute;
  process.env.JWT_SECRET = 'session-synthetique-prelot3-sql';
  let calls = 0;
  execution.execute = async () => { calls++; throw new Error('Appel inattendu'); };
  budget.reset();
  const app = buildApp({ logger: false });
  const token = jwt.sign({ userId: 'controle-sql-prelot3', level: 'b3', subscribed: true }, process.env.JWT_SECRET);
  try {
    // 1) En production : 0 suspension, la soumission exécute le SQL localement sans appeler le fournisseur distant.
    execution.execute = original;
    for (const id of ['sql3-c1-e1', 'sql3-c1-e2', 'sql3-c3-e3']) {
      const response = await app.inject({ method: 'POST', url: '/api/exercise/submit',
        cookies: { auth_token: token }, payload: { exerciseId: id, code: 'SELECT 1;' } });
      assert.equal(response.statusCode, 200, id);
      assert.equal(response.json().stop?.reason, 'wrong_output', id);
    }

    // 2) Fail-closed sur mutation d'une fiche : 503 grading_suspended et aucun appel moteur.
    execution.execute = async () => { calls++; throw new Error('Appel inattendu'); };
    for (const id of ['sql3-c1-e1', 'sql3-c1-e2', 'sql3-c3-e3']) {
      const ex = catalogue.getExercise(id);
      const saved = ex.solution;
      ex.solution = `${saved}\n-- mutation`;
      try {
        const response = await app.inject({ method: 'POST', url: '/api/exercise/submit',
          cookies: { auth_token: token }, payload: { exerciseId: id, code: 'SELECT 1' } });
        assert.equal(response.statusCode, 503, id);
        assert.equal(response.json().status, 'grading_suspended', id);
        assert.equal(response.json().passed, undefined, id);
        assert.equal(response.json().total, undefined, id);
      } finally {
        ex.solution = saved;
      }
    }
    assert.equal(calls, 0);
  } finally {
    execution.execute = original;
    budget.reset();
    await app.close();
    if (previousSecret === undefined) delete process.env.JWT_SECRET;
    else process.env.JWT_SECRET = previousSecret;
  }
});
