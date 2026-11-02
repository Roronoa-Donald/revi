'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

async function main() {
  const project = process.argv[2] || process.cwd();
  const simulator = fs.readFileSync(path.join(project, 'b1-sql/assets/js/sql-simulator.js'), 'utf8');
  const match = simulator.match(/const PARC_SQL\s*=\s*(\[[\s\S]*?\]\.join\('\\n'\));/);
  if (!match) throw new Error('Base du simulateur introuvable');
  const initialSql = vm.runInNewContext(match[1], Object.create(null), { timeout: 1000 });
  const sqlPath = path.join(project, 'b1-sql/assets/vendor/sqljs');
  const initialize = require(path.join(sqlPath, 'sql-wasm.js'));
  const SQL = await initialize({ locateFile: file => path.join(sqlPath, file) });
  const database = new SQL.Database();
  database.exec(initialSql);
  const queries = [
    'SELECT * FROM Marque;',
    'SELECT nommarque, pays FROM Marque;',
    'SELECT moteur FROM Voiture;',
    'SELECT DISTINCT moteur FROM Voiture;',
    'SELECT * FROM Marque ORDER BY nommarque ASC;'
  ];
  const results = queries.map(query => {
    try {
      const result = database.exec(query)[0];
      return { query, columns: result?.columns || [], rows: result?.values.length || 0, firstRows: (result?.values || []).slice(0, 5) };
    } catch (error) { return { query, error: error.message }; }
  });
  database.run("INSERT INTO Voiture (immat, marque, moteur, km, pxachat, nbreplace) VALUES (NULL, 'TEST', 'ESSENCE', 0, 1, 5), (NULL, 'TEST', 'ESSENCE', 0, 1, 5)");
  const nullPrimaryKeys = database.exec('SELECT COUNT(*) FROM Voiture WHERE immat IS NULL')[0].values[0][0];
  const foreignKeyRows = database.exec('PRAGMA foreign_key_list(Voiture)');
  let analysisStarterError = '';
  try { database.exec('# Zone libre : appliquez la méthodologie du cours.'); } catch (error) { analysisStarterError = error.message; }
  database.close();
  console.log(JSON.stringify({ dataset: 'b1-sql/assets/js/sql-simulator.js:PARC_SQL', queries: results,
    nullPrimaryKeysAccepted: nullPrimaryKeys, foreignKeysDeclaredOnVoiture: foreignKeyRows.length,
    analysisStarterError }, null, 2));
}

main().catch(error => { console.error(error); process.exitCode = 1; });
