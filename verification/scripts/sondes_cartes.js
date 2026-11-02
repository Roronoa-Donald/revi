'use strict';

const path = require('path');

async function main() {
  const sqlDirectory = path.resolve(process.cwd(), 'b1-sql/assets/vendor/sqljs');
  const initialize = require(path.join(sqlDirectory, 'sql-wasm.js'));
  const SQL = await initialize({ locateFile: file => path.join(sqlDirectory, file) });
  const database = new SQL.Database();

  database.run('CREATE TABLE notes (id INTEGER PRIMARY KEY, note INTEGER, obligatoire TEXT NOT NULL)');
  database.run("INSERT INTO notes (id, note, obligatoire) VALUES (1, 10, 'ok'), (2, 20, 'ok'), (3, NULL, 'ok')");
  const aggregates = database.exec('SELECT AVG(note), COUNT(note), COUNT(*) FROM notes')[0];
  let omissionError = '';
  try {
    database.run('INSERT INTO notes (id, note) VALUES (4, 5)');
  } catch (error) {
    omissionError = error.message;
  }
  database.run("INSERT INTO notes (note, obligatoire) VALUES (5, 'ok')");
  const generatedId = database.exec('SELECT id FROM notes WHERE note = 5')[0].values[0][0];
  database.close();

  console.log(JSON.stringify({
    engine: 'sql.js livré dans b1-sql/assets/vendor/sqljs',
    input: 'données synthétiques : notes 10, 20 et NULL',
    aggregates: Object.fromEntries(aggregates.columns.map((column, index) => [column, aggregates.values[0][index]])),
    omittedNotNullColumn: { rejected: Boolean(omissionError), error: omissionError },
    omittedIntegerPrimaryKey: { generatedId }
  }, null, 2));
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
