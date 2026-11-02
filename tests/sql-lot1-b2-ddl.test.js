'use strict';

if (require('./lot1-sandbox').runInsideIsolatedOrRegister(__filename)) {

const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const test = require('node:test');
const sqlEngine = require('../assets/js/engines/sql-wasm-engine');
const catalogue = require('../server/exercises');
const { runTests } = require('../server/exercises/runner');

const variants = {
  'sql2-c1-e1': [
    ['salaire sans borne inférieure', ' CHECK (salaire >= 100000)', ''],
    ['courriel non unique', 'email TEXT UNIQUE NOT NULL', 'email TEXT NOT NULL']
  ],
  'sql2-c1-e2': [
    ['clé étrangère omise', ' INT REFERENCES services(id)', ' INT'],
    ['longueur minimale injustifiée du titre', 'titre TEXT NOT NULL,', 'titre TEXT NOT NULL CHECK (LENGTH(titre) >= 3),']
  ],
  'sql2-c1-e3': [
    ['zéro heure refusé à tort', 'heures INT NOT NULL,', 'heures INT NOT NULL CHECK (heures > 0),'],
    ['un seul projet par employé', 'PRIMARY KEY (employe_id, projet_id)', 'PRIMARY KEY (employe_id, projet_id), UNIQUE (employe_id)']
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
      const full = await grade(exercise, variant);
      assert.equal(full.stop?.reason, 'wrong_output', `${exerciseId} : variante non rejetée par une sortie incorrecte`);
      assert.ok(exercise.tests.length >= 5, `${exerciseId} : deux vérifications spécifiques absentes`);
      const pair = exercise.tests.slice(-2);
      const reports = [];
      for (const entry of pair) {
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

test('les six cas ajoutés restent cachés et leurs résultats concordent avec SQLite natif', () => {
  const checks = [];
  const expected = [1, 1, 1, 1, 1, 2];
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
    '    sql = ""',
    '    rows = None',
    '    for line in check["verification"].splitlines(keepends=True):',
    '        sql += line',
    '        if sqlite3.complete_statement(sql):',
    '            cursor = db.execute(sql)',
    '            if cursor.description:',
    '                rows = cursor.fetchall()',
    '            sql = ""',
    '    if sql.strip(): raise RuntimeError("instruction de vérification incomplète")',
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
