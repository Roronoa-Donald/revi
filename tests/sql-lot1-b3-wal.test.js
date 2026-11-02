'use strict';

if (require('./lot1-sandbox').runInsideIsolatedOrRegister(__filename)) {

const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const test = require('node:test');
const sqlEngine = require('../assets/js/engines/sql-wasm-engine');
const catalogue = require('../server/exercises');

const exercise = catalogue.getExercise('sql3-c1-e1');
const scenarios = [
  {
    name: 'un COMMIT sans identifiant ne masque pas les autres transactions',
    schema: "CREATE TABLE wal_journal (lsn INT, tx_id INT, op TEXT); INSERT INTO wal_journal VALUES (1, 1777, 'BEGIN'), (2, NULL, 'COMMIT'), (3, 1888, 'BEGIN'), (4, 1888, 'ROLLBACK');",
    expected: [[1777]]
  },
  {
    name: 'une ligne sans identifiant ne crée pas une transaction identifiable',
    schema: "CREATE TABLE wal_journal (lsn INT, tx_id INT, op TEXT); INSERT INTO wal_journal VALUES (1, NULL, 'BEGIN'), (2, 2777, 'BEGIN'), (3, 2888, 'BEGIN'), (4, 2777, 'COMMIT');",
    expected: [[2888]]
  }
];

for (const scenario of scenarios) {
  test(`WAL : ${scenario.name}`, async () => {
    assert.ok([...exercise.examples, ...exercise.tests].every(item => item.stdin !== scenario.schema));
    const SQL = await sqlEngine.loadSqlJs();
    const database = new SQL.Database();
    try {
      database.exec(scenario.schema);
      const result = database.exec(exercise.solution);
      assert.equal(result.length, 1);
      assert.deepEqual(result[0].columns, ['tx_id']);
      assert.deepEqual(result[0].values, scenario.expected);
    } finally {
      database.close();
    }
  });
}

test('SQLite natif confirme les deux résultats sur les mêmes données', () => {
  const script = [
    'import json, sqlite3, sys',
    'payload = json.load(sys.stdin)',
    'results = []',
    'for scenario in payload["scenarios"]:',
    '    database = sqlite3.connect(":memory:")',
    '    database.executescript(scenario["schema"])',
    '    results.append(database.execute(payload["solution"]).fetchall())',
    '    database.close()',
    'print(json.dumps({"version": sqlite3.sqlite_version, "results": results}))'
  ].join('\n');
  const result = spawnSync('python3', ['-c', script], {
    input: JSON.stringify({ scenarios, solution: exercise.solution }), encoding: 'utf8', timeout: 10000, maxBuffer: 65536
  });
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(JSON.parse(result.stdout).results, scenarios.map(scenario => scenario.expected));
});

}
