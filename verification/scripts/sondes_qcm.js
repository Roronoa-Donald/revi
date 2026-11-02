'use strict';

const path = require('node:path');

async function main() {
  const sqlDirectory = path.resolve(process.cwd(), 'b1-sql/assets/vendor/sqljs');
  const initialize = require(path.join(sqlDirectory, 'sql-wasm.js'));
  const SQL = await initialize({ locateFile: file => path.join(sqlDirectory, file) });
  const database = new SQL.Database();

  database.run('CREATE TABLE edges (source INTEGER, destination INTEGER)');
  database.run('INSERT INTO edges VALUES (1, 2), (2, 1)');
  const reachable = database.exec(`WITH RECURSIVE reachable(id) AS (
    VALUES (1)
    UNION
    SELECT edges.destination FROM edges JOIN reachable ON edges.source = reachable.id
  ) SELECT id FROM reachable ORDER BY id`)[0].values.map(row => row[0]);

  database.run('PRAGMA foreign_keys = ON');
  database.run('CREATE TABLE parents (id INTEGER PRIMARY KEY)');
  database.run('CREATE TABLE children (id INTEGER, parent_id INTEGER REFERENCES parents(id) DEFERRABLE INITIALLY DEFERRED)');
  database.run('CREATE TABLE audit (phase TEXT)');
  database.run("CREATE TRIGGER before_insert BEFORE INSERT ON children BEGIN INSERT INTO audit VALUES ('before'); END");
  database.run("CREATE TRIGGER after_insert AFTER INSERT ON children BEGIN INSERT INTO audit VALUES ('after'); END");
  database.run('BEGIN');
  database.run('INSERT INTO children VALUES (1, 42)');
  const triggersBeforeCommit = database.exec('SELECT phase FROM audit ORDER BY rowid')[0].values.map(row => row[0]);
  let commitError = '';
  try {
    database.run('COMMIT');
  } catch (error) {
    commitError = error.message;
    database.run('ROLLBACK');
  }
  const auditAfterRollback = database.exec('SELECT COUNT(*) FROM audit')[0].values[0][0];
  database.close();

  if (JSON.stringify(reachable) !== '[1,2]' || JSON.stringify(triggersBeforeCommit) !== '["before","after"]' || !commitError || auditAfterRollback !== 0) {
    throw new Error('Résultat inattendu : ne pas utiliser cette sonde comme preuve.');
  }

  console.log(JSON.stringify({
    engine: 'sql.js livré dans b1-sql/assets/vendor/sqljs',
    graph: 'arêtes synthétiques 1 → 2 et 2 → 1',
    recursiveUnionReachable: reachable,
    deferredForeignKey: { triggersBeforeCommit, commitError, auditRowsAfterRollback: auditAfterRollback },
    limitation: 'Exemple SQLite ; l’explication du QCM PostgreSQL est également confrontée à la documentation PostgreSQL.'
  }, null, 2));
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
