'use strict';

if (require('./lot1-sandbox').runInsideIsolatedOrRegister(__filename)) {

const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const test = require('node:test');
const sqlEngine = require('../assets/js/engines/sql-wasm-engine');
const catalogue = require('../server/exercises');
const { runTests } = require('../server/exercises/runner');

const variants = {
  'sql2-c6-e3': [
    ['ordre des colonnes inversé', 'journaux(service, niveau)', 'journaux(niveau, service)'],
    ['index partiel non demandé', 'journaux(service, niveau)', "journaux(service, niveau) WHERE service = 'auth'"]
  ],
  'sql3-c2-e2': [
    ['mauvaise colonne indexée', 'commandes(client_id) WHERE', 'commandes(montant) WHERE'],
    ['index non partiel', "commandes(client_id) WHERE statut = 'EN_COURS'", 'commandes(client_id)']
  ]
};

async function grade(exercise, code) {
  return runTests(exercise, code, {
    execute: async ({ code: submitted, stdin }) => {
      const output = await sqlEngine.execute(submitted, stdin, { timeoutMs: 10000 });
      return { ...output, ok: output.status === 'success' };
    }
  });
}

for (const [exerciseId, choices] of Object.entries(variants)) {
  for (const [index, [label, original, replacement]] of choices.entries()) {
    test(`${exerciseId} : rejet indépendant de « ${label} »`, async () => {
      const exercise = catalogue.getExercise(exerciseId);
      assert.ok(exercise.solution.includes(original));
      const variant = exercise.solution.replace(original, replacement);
      const baseline = await grade(exercise, exercise.solution);
      assert.equal(baseline.stop, null, `${exerciseId} : corrigé non accepté`);
      const historical = await grade({ ...exercise, tests: exercise.tests.slice(0, 3) }, variant);
      assert.equal(historical.stop, null, `${exerciseId} : la variante n'était pas acceptée par les anciens cas`);
      const full = await grade(exercise, variant);
      assert.equal(full.stop?.reason, 'wrong_output', `${exerciseId} : variante non rejetée par une sortie incorrecte`);
      assert.ok(exercise.tests.length >= 5, `${exerciseId} : deux vérifications spécifiques absentes`);
      const reports = [];
      for (const entry of exercise.tests.slice(-2)) {
        const isolated = { ...exercise, tests: [entry], verifyFirstExample: false };
        const reference = await grade(isolated, exercise.solution);
        assert.equal(reference.stop, null);
        reports.push(await grade(isolated, variant));
      }
      assert.equal(reports[index].stop?.reason, 'wrong_output');
      assert.equal(reports[1 - index].stop, null, 'les deux témoins doivent détecter des erreurs différentes');
    });
  }
}

test('les nouveaux contrôles d’index concordent avec SQLite natif et ne sont pas projetés au client', () => {
  const checks = [];
  const expected = ['service,niveau', 0, 'client_id', 1];
  for (const exerciseId of Object.keys(variants)) {
    const exercise = catalogue.getExercise(exerciseId);
    const client = catalogue.toClient(exercise);
    assert.equal(Object.hasOwn(client, 'tests'), false);
    assert.equal(Object.hasOwn(client, 'solution'), false);
    for (const entry of exercise.tests.slice(-2)) {
      assert.ok(exercise.examples.every(example => example.stdin !== entry.stdin));
      assert.equal(JSON.stringify(client).includes(entry.stdin), false);
      const [setup, verification] = entry.stdin.split('-- VERIFY:');
      checks.push({ id: exerciseId, setup, verification, solution: exercise.solution });
    }
  }
  const script = [
    'import json, sqlite3, sys',
    'checks = json.load(sys.stdin)',
    'results = []',
    'for check in checks:',
    '    db = sqlite3.connect(":memory:")',
    '    db.executescript(check["setup"])',
    '    db.executescript(check["solution"])',
    '    rows = db.execute(check["verification"]).fetchall()',
    '    results.append({"id": check["id"], "rows": rows})',
    '    db.close()',
    'print(json.dumps({"version": sqlite3.sqlite_version, "results": results}))'
  ].join('\n');
  const native = spawnSync('python3', ['-c', script], {
    input: JSON.stringify(checks), encoding: 'utf8', timeout: 10000, maxBuffer: 65536
  });
  assert.equal(native.status, 0, native.stderr);
  const results = JSON.parse(native.stdout).results;
  assert.equal(results.length, expected.length);
  for (const [index, entry] of results.entries()) assert.deepEqual(entry.rows, [[expected[index]]], entry.id);
});

}
