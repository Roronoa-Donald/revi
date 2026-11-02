'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

async function main() {
  const root = path.resolve(__dirname, '..', '..');
  const file = path.join(root, 'b1-sql/assets/js/sql-simulator.js');
  const simulator = fs.readFileSync(file, 'utf8');
  const match = simulator.match(/const PARC_SQL\s*=\s*(\[[\s\S]*?\]\.join\('\\n'\));/);
  if (!match) throw new Error('Base du simulateur introuvable');
  const initialSql = vm.runInNewContext(match[1], Object.create(null), { timeout: 1000 });
  const vendor = path.join(root, 'b1-sql/assets/vendor/sqljs');
  const initialize = require(path.join(vendor, 'sql-wasm.js'));
  const SQL = await initialize({ locateFile: fileName => path.join(vendor, fileName) });
  const database = new SQL.Database();
  database.exec(initialSql);
  const queries = [
    { id: 'bilan_reel', sql: 'SELECT COUNT(*) AS voitures, MIN(pxachat) AS minimum, MAX(pxachat) AS maximum, SUM(pxachat) AS budget, AVG(km) AS kilometrage_moyen FROM Voiture' },
    { id: 'alias_explicite', sql: 'SELECT V.immat FROM Voiture AS V LIMIT 1' },
    { id: 'exemple_jointure_chapitre4', sql: "SELECT M.codemarque, M.nommarque, V.immat FROM Marque M INNER JOIN Voiture V ON M.codemarque = V.codemarque WHERE V.immat LIKE '%AK'" },
    { id: 'exemple_update_chapitre6', sql: "UPDATE Voiture SET codemarque = 'TOY' WHERE marque = 'TOYOTA'" },
    { id: 'having_sans_group_by', sql: 'SELECT COUNT(*) AS total FROM Voiture HAVING COUNT(*) > 0' },
    { id: 'colonne_hors_group_by', sql: 'SELECT marque, immat FROM Voiture GROUP BY marque' },
    { id: 'update_sans_where', sql: "UPDATE Voiture SET moteur = 'DIESEL'" }
  ];
  const results = queries.map(({ id, sql }) => {
    try {
      const result = database.exec(sql)[0];
      return { id, sql, columns: result?.columns || [], rows: result?.values.length || 0,
        firstRows: (result?.values || []).slice(0, 3),
        ...(id === 'update_sans_where' ? { modifiedRows: database.getRowsModified() } : {}) };
    } catch (error) {
      return { id, sql, error: error.message };
    }
  });
  database.close();
  console.log(JSON.stringify({ engine: 'sql.js livré avec le cours, en mémoire',
    dataset: 'b1-sql/assets/js/sql-simulator.js:PARC_SQL', results }, null, 2));
}

main().catch(error => { console.error(error); process.exitCode = 1; });
