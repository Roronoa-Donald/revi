'use strict';

if (require('./lot1-sandbox').runInsideIsolatedOrRegister(__filename)) {

const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const parse5 = require('parse5');
const sqlEngine = require('../assets/js/engines/sql-wasm-engine');
const { sqlTextContent } = require('../corrections/outils/texte-sql');

const source = fs.readFileSync(path.join(__dirname, '..', 'sql/cours_ecommerce_sql.html'), 'utf8');

function findNode(node, predicate) {
  if (predicate(node)) return node;
  for (const child of node.childNodes || []) {
    const found = findNode(child, predicate);
    if (found) return found;
  }
  return null;
}

function statement() {
  const document = parse5.parse(source);
  const answer = findNode(document, node => (node.attrs || []).some(attribute => attribute.name === 'id' && attribute.value === 'sol34'));
  assert.ok(answer);
  const code = findNode(answer, node => node.nodeName === 'code');
  assert.ok(code);
  return sqlTextContent(code).trim();
}

const schema = [
  'CREATE TABLE Categories(CategoryID INTEGER PRIMARY KEY, CategoryName TEXT NOT NULL);',
  'CREATE TABLE Products(ProductID INTEGER PRIMARY KEY, CategoryID INTEGER NOT NULL);',
  'CREATE TABLE OrderItems(ProductID INTEGER NOT NULL, Quantity INTEGER NOT NULL, UnitPrice INTEGER NOT NULL);',
  "INSERT INTO Categories VALUES(1,'Accessoires'),(2,'Audio'),(3,'Vide'),(4,'Accessoires');",
  'INSERT INTO Products VALUES(11,1),(12,2),(13,4);',
  'INSERT INTO OrderItems VALUES(11,2,25);'
].join('\n');

const expected = [['Accessoires', 0], ['Accessoires', 50], ['Audio', 0], ['Vide', 0]];

function sortRows(rows) {
  return rows.slice().sort((first, second) => first[0] < second[0] ? -1 : first[0] > second[0] ? 1 : first[1] - second[1]);
}

test('chiffre d’affaires : chaque catégorie est conservée, y compris les catégories sans vente', async () => {
  const SQL = await sqlEngine.loadSqlJs();
  const database = new SQL.Database();
  try {
    database.exec(schema);
    const result = database.exec(statement());
    assert.equal(result.length, 1);
    assert.deepEqual(result[0].columns, ['CategoryName', 'ChiffreAffaires']);
    assert.deepEqual(sortRows(result[0].values), expected);
  } finally {
    database.close();
  }
});

test('le même résultat est obtenu avec SQLite natif sur un schéma de démonstration indépendant', () => {
  const script = [
    'import json, sqlite3, sys',
    'payload = json.load(sys.stdin)',
    'db = sqlite3.connect(":memory:")',
    'db.executescript(payload["schema"])',
    'rows = db.execute(payload["sql"]).fetchall()',
    'print(json.dumps({"version": sqlite3.sqlite_version, "rows": rows}))'
  ].join('\n');
  const native = spawnSync('python3', ['-c', script], {
    input: JSON.stringify({ schema, sql: statement() }), encoding: 'utf8', timeout: 10000, maxBuffer: 65536
  });
  assert.equal(native.status, 0, native.stderr);
  assert.deepEqual(sortRows(JSON.parse(native.stdout).rows), expected);
});

}
