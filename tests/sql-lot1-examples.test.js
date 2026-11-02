'use strict';

if (require('./lot1-sandbox').runInsideIsolatedOrRegister(__filename)) {

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const parse5 = require('parse5');
const sqlEngine = require('../assets/js/engines/sql-wasm-engine');
const { sqlTextContent } = require('../corrections/outils/texte-sql');
const course = require('../server/content/b1-sql');
const kit = require('../scripts/course-kit');
const exercises = require('../server/exercises/b1-sql');
const exerciseRegistry = require('../server/exercises');
const { PARC_SQL, MISSIONS, EXAMEN } = require('../b1-sql/assets/js/sql-simulator');

const rendered = course.render(kit);
let SQL;

test.before(async () => { SQL = await sqlEngine.loadSqlJs(); });

function text(node) {
  if (node.nodeName === '#text') return node.value;
  if (node.nodeName === 'br') return '\n';
  return (node.childNodes || []).map(text).join('');
}

function codeElements(page) {
  const result = [];
  function visit(node) {
    if (node.nodeName === 'code') result.push(text(node).trim());
    for (const child of node.childNodes || []) visit(child);
  }
  visit(parse5.parseFragment(rendered[page].body));
  return result;
}

function literalCodeElements(page) {
  const result = [];
  function literalText(node) {
    if (node.nodeName === '#text') return node.value;
    return (node.childNodes || []).map(literalText).join('');
  }
  function visit(node) {
    if (node.nodeName === 'code') result.push(literalText(node).trim());
    for (const child of node.childNodes || []) visit(child);
  }
  visit(parse5.parseFragment(rendered[page].body));
  return result;
}

function findCode(page, phrase) {
  const matches = codeElements(page).filter(code => code.includes(phrase));
  assert.equal(matches.length, 1, `${page} : ${phrase}`);
  return matches[0];
}

function database() {
  const db = new SQL.Database();
  db.exec(PARC_SQL);
  return db;
}

function execute(db, sql) {
  const results = [];
  for (const prepared of db.iterateStatements(sql)) {
    try {
      const columns = prepared.getColumnNames();
      const rows = [];
      while (prepared.step()) rows.push(prepared.get());
      if (columns.length) results.push({ columns, rows });
    } finally { prepared.free(); }
  }
  return results;
}

function sameRows(actual, expected) {
  const ordered = rows => rows.map(row => JSON.stringify(row)).sort();
  assert.deepEqual(ordered(actual), ordered(expected));
}

function sqlExampleCategory(page, statement) {
  const sql = statement.trim().replace(/;\s*$/, '');
  if (page === 'chapitres/chapitre6.html' && /^GRANT\s+ALL\s*,\s*GRANT\s+OPTION\s+ON\s+…$/i.test(sql)) {
    return 'erreur volontaire';
  }
  const mysql = /^(?:CREATE\s+USER|DROP\s+USER|GRANT|REVOKE)\b/i.test(sql) ||
    /^ALTER\s+TABLE\s+Voiture\s+MODIFY\b/i.test(sql);
  const notation = /^ALTER\s+TABLE\s+…\s+ADD\s+COLUMN$/i.test(sql) || /\[IDENTIFIED BY/i.test(sql) ||
    /^SELECT\s+colonnes\b/i.test(sql) || /^UPDATE\s+nom_table\b/i.test(sql) ||
    (page === 'chapitres/formules.html' && /^(?:UPDATE\s+table|DELETE\s+FROM\s+table|ALTER\s+TABLE\s+t|DROP\s+TABLE\s+t)\b/i.test(sql)) ||
    (page === 'chapitres/chapitre6.html' && /^GRANT\s+OPTION$/i.test(sql)) ||
    /^GRANT\s+ALL\s+PRIVILEGES\s+ON\s+(?:…|base\.\*)\s+TO\s+…\s+WITH\s+GRANT\s+OPTION$/i.test(sql);
  if (mysql && notation) return 'notation MySQL';
  if (mysql) return 'MySQL';
  if (notation) return 'notation';
  return null;
}

function initializationExamples() {
  const pages = Array.from({ length: 6 }, (unused, index) => `chapitres/chapitre${index + 1}.html`);
  pages.push('chapitres/simulateur-examen.html');
  const examples = [];
  for (const page of pages) {
    const source = fs.readFileSync(path.join(__dirname, '..', 'b1-sql', page), 'utf8');
    function visit(node) {
      if (node.nodeName === 'pre') {
        const sql = text(node).trim();
        if (/^(?:PRAGMA\s+foreign_keys\s*=\s*ON\s*;\s*)?CREATE\s+TABLE\s+Marque\s*\(/i.test(sql)) {
          examples.push({ page, sql });
        }
      }
      for (const child of node.childNodes || []) visit(child);
    }
    visit(parse5.parse(source));
  }
  return examples;
}

test('l’audit SQL conserve les retours visibles entre lignes d’une requête', () => {
  const source = fs.readFileSync(path.join(__dirname, '..', 'sql/modules/mod09-loops.html'), 'utf8');
  const matches = [];
  function visit(node) {
    if (node.nodeName === 'code') {
      const content = sqlTextContent(node).trim();
      if (content.startsWith('UPDATE Clients') && content.includes('remise = 10') && content.includes('actif = 1')) {
        matches.push(content);
      }
    }
    for (const child of node.childNodes || []) visit(child);
  }
  visit(parse5.parse(source));
  assert.equal(matches.length, 1);
  const db = new SQL.Database();
  try {
    db.run('CREATE TABLE Clients (actif INTEGER, remise INTEGER); INSERT INTO Clients VALUES (1, 0), (0, 0);');
    assert.doesNotThrow(() => execute(db, matches[0]));
    assert.equal(matches[0], 'UPDATE Clients\nSET remise = 10\nWHERE actif = 1');
    assert.deepEqual(execute(db, 'SELECT actif, remise FROM Clients ORDER BY actif')[0].rows, [[0, 0], [1, 10]]);
  } finally { db.close(); }
});

test('les 18 initialisations du parc nécessitent et acceptent une base vierge', diagnostic => {
  const examples = initializationExamples();
  assert.equal(examples.length, 18);
  const reference = database();
  try {
    const expectedBrands = execute(reference, 'PRAGMA table_info(Marque)')[0].rows;
    const expectedCars = execute(reference, 'PRAGMA table_info(Voiture)')[0].rows;
    for (const example of examples) {
      const occupied = database();
      try { assert.throws(() => execute(occupied, example.sql), /table Marque already exists/i, example.page); }
      finally { occupied.close(); }
      const empty = new SQL.Database();
      try {
        assert.doesNotThrow(() => execute(empty, example.sql), example.page);
        assert.deepEqual(execute(empty, 'PRAGMA table_info(Marque)')[0].rows, expectedBrands, example.page);
        const hasCars = execute(empty, "SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'Voiture'")[0].rows.length;
        if (hasCars) assert.deepEqual(execute(empty, 'PRAGMA table_info(Voiture)')[0].rows, expectedCars, example.page);
        assert.deepEqual(execute(empty, 'PRAGMA foreign_key_check')[0].rows, [], example.page);
      } finally { empty.close(); }
    }
  } finally { reference.close(); }
  diagnostic.diagnostic('18 erreurs « table déjà créée » reproduites sur le parc initial ; les 18 scripts réussissent sur base vierge, avec schéma et clés contrôlés.');
});

test('la vue mensuelle est interrogeable après sa création, sous deux moteurs SQLite', diagnostic => {
  const page = 'exercices/exercices.html';
  const createView = findCode(page, 'CREATE VIEW v_achats_mensuels');
  const selectView = findCode(page, 'SELECT mois, total FROM v_achats_mensuels');
  const direct = 'SELECT substr(datecirc, 1, 7) AS mois, SUM(pxachat) AS total FROM Voiture ' +
    'WHERE datecirc IS NOT NULL GROUP BY substr(datecirc, 1, 7) ORDER BY mois;';
  const db = database();
  try {
    assert.throws(() => execute(db, selectView), /no such table: v_achats_mensuels/i);
    const expected = execute(db, direct)[0];
    execute(db, createView);
    assert.deepEqual(execute(db, selectView)[0], expected);
    assert.ok(expected.rows.length > 0);
  } finally { db.close(); }
  const nativeScript = [
    'import json, sqlite3, sys',
    'data = json.load(sys.stdin)',
    'for sql in data["initializations"]:',
    '    connection = sqlite3.connect(":memory:")',
    '    connection.executescript(sql)',
    '    assert connection.execute("PRAGMA foreign_key_check").fetchall() == []',
    '    connection.close()',
    'connection = sqlite3.connect(":memory:")',
    'connection.executescript(data["park"])',
    'expected = connection.execute(data["direct"]).fetchall()',
    'connection.executescript(data["create"])',
    'assert connection.execute(data["select"]).fetchall() == expected',
    'print(json.dumps({"sqlite": sqlite3.sqlite_version, "initialisations": len(data["initializations"]), "viewRows": len(expected)}))'
  ].join('\n');
  const native = spawnSync(process.env.PYTHON_BIN || 'python3', ['-c', nativeScript], {
    input: JSON.stringify({ initializations: initializationExamples().map(example => example.sql),
      park: PARC_SQL, direct, create: createView, select: selectView }),
    encoding: 'utf8', timeout: 10000, maxBuffer: 1024 * 1024
  });
  assert.equal(native.status, 0, native.stderr || native.error?.message);
  const result = JSON.parse(native.stdout);
  assert.equal(result.initialisations, 18);
  assert.ok(result.viewRows > 0);
  diagnostic.diagnostic(`SQLite natif ${result.sqlite} confirme 18 initialisations et ${result.viewRows} lignes de la vue.`);
});

test('atelier : le résultat affiché par défaut est le parc complet de 23 voitures', () => {
  function scriptFrom(document) {
    const matches = [];
    function visit(node) {
      if (node.nodeName === 'textarea' && (node.attrs || []).some(attribute =>
        attribute.name === 'id' && attribute.value === 'sqlsim-query')) matches.push(text(node));
      for (const child of node.childNodes || []) visit(child);
    }
    visit(document);
    assert.equal(matches.length, 1);
    return matches[0];
  }

  const script = scriptFrom(parse5.parseFragment(rendered['atelier.html'].body));
  const generated = fs.readFileSync(path.join(__dirname, '../b1-sql/atelier.html'), 'utf8');
  assert.equal(scriptFrom(parse5.parse(generated)), script, 'atelier généré et source');
  assert.match(script, /-- Le parc au complet \(23 lignes\)/);

  const db = database();
  try {
    const results = execute(db, script);
    const park = execute(db, 'SELECT * FROM Voiture')[0];
    assert.equal(results.length, 2);
    assert.equal(park.rows.length, 23);
    assert.equal(results[1].rows.length, park.rows.length, 'le dernier SELECT doit retourner le parc entier');
    assert.deepEqual(results[1].columns, park.columns);
    sameRows(results[1].rows, park.rows);

    const counts = new Map();
    const brandIndex = park.columns.indexOf('marque');
    for (const row of park.rows) counts.set(row[brandIndex], (counts.get(row[brandIndex]) || 0) + 1);
    const expected = [...counts].sort((left, right) => right[1] - left[1] ||
      (left[0] < right[0] ? -1 : left[0] > right[0] ? 1 : 0));
    assert.deepEqual(results[0], { columns: ['marque', 'nb'], rows: expected });
  } finally { db.close(); }
});

test('MIN et MAX : l’exemple présenté comme requête est exécutable', () => {
  const example = findCode('chapitres/chapitre5.html', 'MIN(immat), MAX(datecirc)');
  const db = database();
  try {
    const results = execute(db, example);
    assert.equal(results.length, 1);
    assert.deepEqual(results[0].rows, [['TG-0020-AL', '2023-09-12']]);
  } finally { db.close(); }
});

test('les amorces SQL visibles s’exécutent sur leurs jeux d’exemple', diagnostic => {
  for (const exercise of exercises) {
    const db = new SQL.Database();
    try {
      db.exec(exercise.examples[0].stdin.split('-- VERIFY:')[0]);
      assert.ok(sqlEngine.splitSql(exercise.starter).length, `${exercise.id} : amorce vide`);
      assert.doesNotThrow(() => execute(db, exercise.starter), exercise.id);
    } finally { db.close(); }
  }
  diagnostic.diagnostic(`${exercises.length} amorces exécutées sur leurs jeux visibles ; leur réussite n’est pas évaluée ici.`);
});

test('les résultats affichés dans les chapitres correspondent aux requêtes', () => {
  const displayedRow = value => value.split('|').map(cell => cell.trim());
  const renderedRow = row => row.map(value => value === null ? 'NULL' : String(value));
  const db = database();
  try {
    const firstChapter = 'chapitres/chapitre1.html';
    const brands = execute(db, findCode(firstChapter, 'SELECT * FROM Marque ORDER BY nommarque ASC;'))[0];
    const displayed = findCode(firstChapter, 'codemarque | nommarque | paysmarque')
      .split('\n').slice(0, 4).map(displayedRow);
    assert.equal(brands.rows.length, 12);
    assert.deepEqual(displayed, [brands.columns, ...brands.rows.slice(0, 3).map(renderedRow)]);

    const secondChapter = 'chapitres/chapitre2.html';
    const inserted = execute(db, findCode(secondChapter, "VALUES ('TG-0001-TEST'"));
    assert.deepEqual(displayedRow(findCode(secondChapter, 'TG-0001-TEST | NULL')),
      renderedRow(inserted.at(-1).rows[0]));
    const altered = execute(db, findCode(secondChapter, 'ALTER TABLE Equipement ADD COLUMN garantie_mois INTEGER DEFAULT 12'));
    assert.deepEqual(displayedRow(findCode(secondChapter, 'AIR | 12')),
      renderedRow(altered.at(-1).rows[0]));
  } finally { db.close(); }
});

test('les exemples exclus distinguent notation, dialecte et erreur volontaire', () => {
  const secondChapter = 'chapitres/chapitre2.html';
  const sixthChapter = 'chapitres/chapitre6.html';
  assert.equal(sqlExampleCategory(secondChapter, findCode(secondChapter, 'ALTER TABLE … ADD COLUMN')), 'notation');
  assert.equal(sqlExampleCategory(sixthChapter, findCode(sixthChapter, 'UPDATE nom_table')), 'notation');
  assert.equal(sqlExampleCategory(sixthChapter, findCode(sixthChapter, 'ALTER TABLE Voiture MODIFY COLUMN km BIGINT')), 'MySQL');
  const fragments = codeElements(sixthChapter).filter(code => code === 'GRANT OPTION');
  assert.equal(fragments.length, 2);
  for (const fragment of fragments) assert.equal(sqlExampleCategory(sixthChapter, fragment), 'notation MySQL');
  assert.equal(sqlExampleCategory(sixthChapter, findCode(sixthChapter, 'GRANT ALL, GRANT OPTION ON …')), 'erreur volontaire');
});

test('le moteur SQLite analyse les points-virgules dans les noms, commentaires et triggers', () => {
  const db = new SQL.Database();
  try {
    const script = [
      'CREATE TABLE "table;nom" ("valeur;nom" INTEGER);',
      'CREATE TABLE journal (valeur INTEGER);',
      'CREATE TRIGGER journal_insert AFTER INSERT ON "table;nom" BEGIN',
      'INSERT INTO journal VALUES (NEW."valeur;nom");',
      'INSERT INTO journal VALUES (NEW."valeur;nom" + 1);',
      'END;',
      'INSERT INTO "table;nom" VALUES (4);',
      'SELECT-- commentaire avec ;',
      'valeur FROM journal ORDER BY valeur;'
    ].join('\n');
    assert.deepEqual(execute(db, script).at(-1).rows, [[4], [5]]);
  } finally { db.close(); }
});

test('une valeur liée ne devient pas du SQL et un identifiant ne se lie pas comme valeur', () => {
  const db = database();
  try {
    const value = "' OR 1=1 --";
    const concatenated = execute(db, `SELECT immat FROM Voiture WHERE marque = '${value}'`);
    assert.equal(concatenated[0].rows.length, 23);
    const parameterized = db.prepare('SELECT immat FROM Voiture WHERE marque = ?');
    try {
      parameterized.bind([value]);
      assert.equal(parameterized.step(), false);
    } finally { parameterized.free(); }
    assert.throws(() => db.prepare('SELECT * FROM ?'), /syntax error/i);
  } finally { db.close(); }
});

test('UPDATE : le modèle à adapter est séparé de l’exemple exécutable', () => {
  const page = 'chapitres/chapitre6.html';
  const model = findCode(page, 'UPDATE nom_table');
  const example = findCode(page, "UPDATE Voiture SET codemarque = 'TOY'");
  assert.notEqual(model, example);
  assert.doesNotMatch(example, /\bnom_table\b/);
  const db = database();
  try {
    execute(db, example);
    assert.equal(execute(db, "SELECT COUNT(*) FROM Voiture WHERE (marque = 'TOYOTA' AND codemarque <> 'TOY') OR (marque = 'BMW' AND codemarque <> 'BMW')")[0].rows[0][0], 0);
  } finally { db.close(); }
});

test('inventaire HTML : blocs <code> SQL reconnus et concrets dans sql.js', t => {
  const failures = [];
  const excluded = [];
  let blocks = 0;
  let statements = 0;
  for (const page of Object.keys(rendered)) {
    for (const code of codeElements(page)) {
      const parsed = sqlEngine.splitSql(code).filter(statement =>
        /^(?:SELECT|INSERT\s+INTO|UPDATE|DELETE\s+FROM|CREATE\s+(?:TABLE|VIEW|INDEX|USER)|ALTER\s+TABLE|DROP\s+(?:TABLE|USER)|PRAGMA|EXPLAIN|BEGIN|COMMIT|ROLLBACK|GRANT|REVOKE)\s*\S/i.test(statement)
      );
      if (!parsed.length) continue;
      const executable = parsed.filter(statement => {
        const category = sqlExampleCategory(page, statement);
        if (category) excluded.push({ page, category });
        return !category;
      });
      if (!executable.length) continue;
      const needsEmpty = executable.some(statement => /^CREATE\s+TABLE\s+Marque\b/i.test(statement));
      const db = needsEmpty ? new SQL.Database() : database();
      try {
        if (page === 'exercices/exercices.html' && /^SELECT mois, total FROM v_achats_mensuels/i.test(code)) {
          db.exec(findCode(page, 'CREATE VIEW v_achats_mensuels AS'));
        }
        if (page === 'exercices/exercices.html' && /^EXPLAIN QUERY PLAN/i.test(code)) {
          db.exec(findCode(page, 'CREATE INDEX idx_voiture_code'));
        }
        for (const statement of executable) {
          try { execute(db, statement); statements++; }
          catch (error) { failures.push(`${page}: ${statement.slice(0, 100)} — ${error.message}`); }
        }
        blocks++;
      } finally { db.close(); }
    }
  }
  const count = category => excluded.filter(item => item.category === category).length;
  t.diagnostic(`${blocks} blocs et ${statements} instructions SQLite exécutés ; ` +
    `${count('notation')} notations générales, ${count('notation MySQL')} fragments ou modèles MySQL, ` +
    `${count('erreur volontaire')} exemple volontairement incorrect et ${count('MySQL')} instructions MySQL non exécutées.`);
  assert.deepEqual(failures, []);
  assert.ok(blocks >= 40);
  assert.ok(statements >= 55);
});

test('requêtes pratiques : résultats complets, limites et états modifiés', () => {
  const code = codeElements('exercices/exercices.html');
  assert.equal(code.length, 18);
  const db = database();
  try {
    const cars = execute(db, 'SELECT immat, marque, codemarque, moteur, datecirc, km, pxachat, nbreplace FROM Voiture')[0].rows;
    const brands = execute(db, 'SELECT codemarque, nommarque, paysmarque FROM Marque')[0].rows;
    assert.equal(cars.length, 23);
    assert.equal(brands.length, 12);

    sameRows(execute(db, code[0])[0].rows, cars.filter(row => row[3] === 'DIESEL').map(row => [row[0], row[1]]));
    sameRows(execute(db, code[1])[0].rows, [...new Set(brands.map(row => row[2]))].map(country => [country]));
    const descendingDate = [...cars].sort((left, right) => right[4].localeCompare(left[4]) || left[0].localeCompare(right[0]));
    assert.deepEqual(execute(db, code[2])[0].rows, descendingDate.slice(0, 10));
    const inRange = cars.filter(row => row[6] >= 20000000 && row[6] <= 30000000);
    sameRows(execute(db, code[3])[0].rows, inRange);
    assert.ok(inRange.some(row => row[6] === 20000000));
    assert.ok(inRange.some(row => row[6] === 30000000));
    sameRows(execute(db, code[4])[0].rows, cars.map(row => [row[0], row[1]]));
    assert.deepEqual(execute(db, code[5])[0].rows, []);
    assert.deepEqual(execute(db, code[6])[0].rows, []);

    const motorGroups = new Map();
    for (const row of cars) {
      const group = motorGroups.get(row[3]) || [];
      group.push(row[6]);
      motorGroups.set(row[3], group);
    }
    const expectedGroups = [...motorGroups].map(([motor, prices]) =>
      [motor, prices.length, prices.reduce((sum, price) => sum + price, 0) / prices.length]);
    sameRows(execute(db, code[7])[0].rows, expectedGroups);
    assert.deepEqual(execute(db, code[8])[0].rows, [['TOYOTA', 195000000]]);
    const expensive = brands.filter(brand => cars.some(car => car[2] === brand[0] && car[6] > 30000000)).map(brand => [brand[1]]);
    sameRows(execute(db, code[9])[0].rows, expensive);
    sameRows(execute(db, code[10])[0].rows, brands.map(brand => [brand[1]]));
    assert.deepEqual(execute(db, code[11])[0].rows, []);

    assert.deepEqual(execute(db, code[12])[0].rows, [[600]]);
    assert.deepEqual(execute(db, "SELECT km FROM Voiture WHERE immat = 'TG-7854-Z'")[0].rows, [[500]]);
    execute(db, code[13]);
    assert.deepEqual(execute(db, "SELECT km FROM Voiture WHERE immat = 'TG-7854-Z'")[0].rows, [[600]]);
    execute(db, code[14]);
    const monthly = new Map();
    for (const row of cars) monthly.set(row[4].slice(0, 7), (monthly.get(row[4].slice(0, 7)) || 0) + row[6]);
    const expectedMonthly = [...monthly].sort(([left], [right]) => left.localeCompare(right));
    assert.deepEqual(execute(db, code[15])[0].rows, expectedMonthly);
    db.run("INSERT INTO Voiture (immat, marque, codemarque, moteur, datecirc, km, pxachat, nbreplace) VALUES ('TEST-NULL', 'TOYOTA', 'TOY', 'DIESEL', NULL, 0, 1, 5)");
    assert.deepEqual(execute(db, code[15])[0].rows, expectedMonthly);
    execute(db, code[16]);
    assert.ok(execute(db, "PRAGMA index_list('Voiture')")[0].rows.some(row => row[1] === 'idx_voiture_code'));
    assert.ok(execute(db, code[17])[0].rows.length > 0);

    db.run("INSERT INTO Marque (codemarque, nommarque, paysmarque) VALUES ('TES', 'EXEMPLE', 'TOGO')");
    assert.deepEqual(execute(db, code[5])[0].rows, [['EXEMPLE']]);
    assert.deepEqual(execute(db, code[6])[0].rows, [['EXEMPLE']]);
    assert.deepEqual(execute(db, code[11])[0].rows, [['EXEMPLE']]);
  } finally { db.close(); }
});

test('résultats annoncés dans les chapitres, clés et cas limites', () => {
  const db = database();
  try {
    const firstChapter = 'chapitres/chapitre1.html';
    const names = execute(db, findCode(firstChapter, 'SELECT nommarque, paysmarque FROM Marque;'))[0];
    assert.deepEqual(names.columns, ['nommarque', 'paysmarque']);
    assert.equal(names.rows.length, 12);
    assert.deepEqual(execute(db, 'SELECT codemarque, nommarque, paysmarque FROM Marque ORDER BY nommarque LIMIT 3')[0].rows,
      [['BMW', 'BMW', 'ALLEMAGNE'], ['HYU', 'HYUNDAI', 'COREE DU SUD'], ['KIA', 'KIA', 'COREE DU SUD']]);

    const insert = findCode('chapitres/chapitre2.html', "VALUES ('TG-0001-TEST'");
    assert.deepEqual(execute(db, insert).at(-1).rows, [['TG-0001-TEST', null]]);
    assert.throws(() => db.run("INSERT INTO Marque (codemarque, nommarque, paysmarque) VALUES (NULL, 'ERREUR', 'TOGO')"), /NOT NULL/);
    assert.throws(() => db.run("INSERT INTO Voiture (immat, marque, codemarque, moteur, km, pxachat, nbreplace) VALUES ('BAD', 'TOYOTA', 'BMW', 'DIESEL', 0, 1, 5)"), /FOREIGN KEY/);
    assert.throws(() => db.run("DELETE FROM Marque WHERE codemarque = 'TOY'"), /FOREIGN KEY/);
  } finally { db.close(); }

  const alterDb = database();
  try {
    const alter = findCode('chapitres/chapitre2.html', 'ALTER TABLE Equipement ADD COLUMN garantie_mois INTEGER DEFAULT 12');
    assert.deepEqual(execute(alterDb, alter).at(-1).rows, [['AIR', 12]]);
    alterDb.run("INSERT INTO Equipement (codeequipement, nomequipement, prix, garantie_mois) VALUES ('TES', 'Exemple', NULL, NULL)");
    assert.deepEqual(execute(alterDb, "SELECT codeequipement, garantie_mois FROM Equipement WHERE codeequipement IN ('AIR', 'TES') ORDER BY codeequipement")[0].rows,
      [['AIR', 12], ['TES', null]]);
    const addDrop = findCode('chapitres/chapitre6.html', 'ALTER TABLE Voiture ADD COLUMN commentaire TEXT');
    execute(alterDb, addDrop);
    assert.equal(execute(alterDb, 'PRAGMA table_info(Voiture)')[0].rows.some(row => row[1] === 'commentaire'), false);
    assert.throws(() => alterDb.run('ALTER TABLE Voiture MODIFY COLUMN km BIGINT'), /syntax error/i);
  } finally { alterDb.close(); }

  const joinDb = database();
  try {
    const joins = findCode('chapitres/chapitre4.html', 'FROM Voiture V JOIN Marque M USING (codemarque)');
    const results = execute(joinDb, joins);
    assert.deepEqual(results[0].rows, [['TG-0020-AL', 'TOYOTA'], ['TG-0020-AV', 'MITSUBISHI'], ['TG-0480-AV', 'BMW']]);
    assert.deepEqual(results[1].rows, [[23]]);
    assert.deepEqual(results[2].rows, [[276]]);
    joinDb.run("INSERT INTO Marque VALUES ('TES', 'EXEMPLE', 'TOGO')");
    assert.deepEqual(execute(joinDb, "SELECT COUNT(V.immat), COUNT(*) FROM Marque M LEFT JOIN Voiture V ON V.codemarque=M.codemarque WHERE M.codemarque='TES'")[0].rows, [[0, 1]]);
    assert.deepEqual(execute(joinDb, 'SELECT COUNT(*) FROM Voiture CROSS JOIN Marque')[0].rows, [[299]]);
    const bare = execute(joinDb, 'SELECT marque, immat, COUNT(*) FROM Voiture GROUP BY marque')[0].rows;
    assert.equal(bare.length, 12);
    for (const [brand, plate] of bare) {
      assert.deepEqual(execute(joinDb, `SELECT marque FROM Voiture WHERE immat = '${plate}'`)[0].rows, [[brand]]);
    }
    assert.deepEqual(execute(joinDb, 'SELECT COUNT(*) FROM Voiture HAVING COUNT(*) > 0')[0].rows, [[23]]);
    assert.deepEqual(execute(joinDb, 'SELECT COUNT(*) FROM Voiture HAVING COUNT(*) > 23')[0].rows, []);
  } finally { joinDb.close(); }
});

test('missions et sujet blanc : résultats de référence exécutés', () => {
  const db = database();
  try {
    const missionResults = new Map();
    for (const mission of MISSIONS) {
      const results = execute(db, mission.sql);
      const last = results.at(-1);
      assert.equal(last.rows.length, mission.expectRows, mission.id);
      if (mission.firstRow) assert.deepEqual(last.rows[0].map(String), mission.firstRow, mission.id);
      missionResults.set(mission.id, results);
    }
    assert.deepEqual(missionResults.get('m2')[0].rows, [
      ['TG-0020-AL', 'TOYOTA', 50000000], ['TG-4444-BC', 'PEUGEOT', 30000000]
    ]);
    sameRows(missionResults.get('m3')[0].rows, [['DIESEL'], ['ESSENCE'], ['HYBRIDE'], ['ELECTRIQUE']]);
    assert.deepEqual(missionResults.get('m3')[1].rows, [[12]]);
    assert.deepEqual(missionResults.get('m4')[0].rows, [
      ['TG-0020-AL', 'TOYOTA', 50000000], ['TG-0020-AV', 'MITSUBISHI', 50000000],
      ['TG-0480-AV', 'BMW', 50000000]
    ]);
    const japanese = [
      ['TG-0020-AL', 'TOYOTA'], ['TG-0020-AV', 'MITSUBISHI'], ['TG-1200-AK', 'SUZUKI'],
      ['TG-1420-AW', 'MAZDA'], ['TG-3733-AC', 'TOYOTA'], ['TG-5220-BA', 'NISSAN'],
      ['TG-5420-AF', 'SUZUKI'], ['TG-6666-BC', 'TOYOTA'], ['TG-9420-AF', 'TOYOTA'],
      ['TG-9420-AK', 'TOYOTA']
    ];
    assert.deepEqual(missionResults.get('m5')[0].rows, japanese.map(row => [...row, 'JAPON']));
    assert.deepEqual(missionResults.get('m6')[0].rows, []);
    assert.deepEqual(missionResults.get('m7')[0].rows, [
      ['JAPON', 305200000], ['ALLEMAGNE', 140600000], ['COREE DU SUD', 83000000],
      ['FRANCE', 65000000], ['ROYAUME-UNI', 20000000]
    ]);
    assert.deepEqual(missionResults.get('m8')[0].rows, [
      ['ESSENCE', 11, 30545454, 50000000], ['DIESEL', 6, 21100000, 50000000],
      ['ELECTRIQUE', 4, 26550000, 50000000]
    ]);
    assert.deepEqual(execute(db, EXAMEN.queries[0])[0].rows, [
      ['TG-7854-Z', 'MERCEDES BENZ', '2000-01-21'], ['TG-6733-AB', 'MERCEDES BENZ', '2002-01-21'],
      ['TG-6733-AC', 'MERCEDES BENZ', '2012-01-21'], ['TG-0020-AL', 'TOYOTA', '2014-11-21']
    ]);
    const averages = execute(db, EXAMEN.queries[1])[0].rows;
    assert.deepEqual(averages.map(row => [row[0], row[1], Math.round(row[2] / 10000) / 100]), [
      ['DIESEL', 6, 21.1], ['ELECTRIQUE', 4, 26.55], ['ESSENCE', 11, 30.55], ['HYBRIDE', 2, 22.5]
    ]);
    assert.deepEqual(execute(db, EXAMEN.queries[2])[0].rows, japanese);
    assert.deepEqual(execute(db, EXAMEN.queries[3])[0].rows, [['TOYOTA', 5], ['MERCEDES BENZ', 4]]);
    const displayed = literalCodeElements('chapitres/simulateur-examen.html');
    for (const [phrase, reference] of [
      ['SELECT immat, marque, datecirc FROM Voiture', EXAMEN.queries[0]],
      ['SELECT V.immat, V.marque FROM Voiture V', EXAMEN.queries[2]],
      ['SELECT marque, COUNT(*) AS nb FROM Voiture', EXAMEN.queries[3]]
    ]) {
      const visible = displayed.find(code => code.startsWith(phrase));
      assert.ok(visible, phrase);
      assert.deepEqual(execute(db, visible), execute(db, reference));
    }
    db.run("INSERT INTO Marque VALUES ('TES', 'EXEMPLE', 'TOGO')");
    assert.deepEqual(execute(db, MISSIONS.find(mission => mission.id === 'm6').sql)[0].rows, [['EXEMPLE', 'TOGO']]);
    db.run("UPDATE Voiture SET moteur = 'ELECTRIQUE' WHERE marque = 'TOYOTA'");
    assert.equal(db.getRowsModified(), 5);
    assert.deepEqual(execute(db, "SELECT COUNT(*) FROM Voiture WHERE marque = 'TOYOTA' AND moteur = 'ELECTRIQUE'")[0].rows, [[5]]);
    const exam = findCode('chapitres/simulateur-examen.html', 'CREATE TABLE Marque (');
    const empty = new SQL.Database();
    try {
      execute(empty, exam);
      assert.deepEqual(execute(empty, 'SELECT codemarque, nommarque, paysmarque FROM Marque')[0].rows, [['TOY', 'TOYOTA', 'JAPON']]);
      assert.deepEqual(execute(empty, 'PRAGMA table_info(Marque)')[0].rows, execute(db, 'PRAGMA table_info(Marque)')[0].rows);
    } finally { empty.close(); }
  } finally { db.close(); }
});

test('les jeux d’exercices sont autonomes et ne divulguent pas les tests cachés', diagnostic => {
  let total = 0;
  for (const exercise of exercises) {
    const client = exerciseRegistry.toClient(exerciseRegistry.getExercise(exercise.id));
    assert.equal(Object.hasOwn(client, 'tests'), false);
    assert.equal(Object.hasOwn(client, 'solution'), false);
    for (const sample of [...exercise.examples, ...exercise.tests]) {
      assert.ok(Buffer.byteLength(sample.stdin) <= 8 * 1024, exercise.id);
      const db = new SQL.Database();
      try { execute(db, sample.stdin.split('-- VERIFY:')[0]); } finally { db.close(); }
      total++;
    }
  }
  assert.equal(total, 111);
  diagnostic.diagnostic(`${total} jeux SQL autonomes ; les deux CREATE partent d’une base vide et ALTER d’un état antérieur.`);
});

test('les vérifications cachées diffèrent et les données varient hors transitions DDL', diagnostic => {
  const transitions = new Set(['sq-c2-e1', 'sq-c2-e2', 'sq-c2-e3']);
  function etatInitial(stdin) {
    const db = new SQL.Database();
    try {
      execute(db, stdin.split('-- VERIFY:')[0]);
      const tables = execute(db, "SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%' ORDER BY name")[0].rows;
      return JSON.stringify(tables.map(([nom]) => {
        const table = `"${nom.replace(/"/g, '""')}"`;
        return {
          nom,
          colonnes: execute(db, `PRAGMA table_info(${table})`)[0].rows,
          lignes: execute(db, `SELECT * FROM ${table}`)[0].rows.map(ligne => JSON.stringify(ligne)).sort()
        };
      }));
    } finally { db.close(); }
  }

  let nombre = 0;
  for (const exercise of exercises) {
    assert.ok(exercise.tests.length >= 2, exercise.id);
    assert.equal(new Set(exercise.tests.map(sample => sample.stdin)).size, exercise.tests.length, exercise.id);
    for (const sample of exercise.tests) {
      for (const example of exercise.examples) {
        assert.notEqual(sample.stdin, example.stdin, `${exercise.id} : entrée identique à l’exemple`);
        if (transitions.has(exercise.id)) {
          assert.notEqual(sample.expected, example.expected, `${exercise.id} : vérification identique à l’exemple`);
        } else {
          assert.notEqual(etatInitial(sample.stdin), etatInitial(example.stdin), `${exercise.id} : mêmes données que l’exemple`);
        }
      }
      nombre++;
    }
    if (!transitions.has(exercise.id)) {
      assert.equal(new Set(exercise.tests.map(sample => etatInitial(sample.stdin))).size, exercise.tests.length,
        `${exercise.id} : données cachées dupliquées`);
    }
  }
  assert.equal(nombre, 93);
  diagnostic.diagnostic(`${exercises.length} exercices, ${nombre} vérifications cachées ; CREATE et ALTER distinguent les vérifications, pas nécessairement les états initiaux.`);
});

test('l’exemple visible de sq-c1-e1 est un sous-ensemble du simulateur', () => {
  const exercise = exercises.find(item => item.id === 'sq-c1-e1');
  const example = new SQL.Database();
  const reference = database();
  try {
    execute(example, exercise.examples[0].stdin);
    for (const table of ['Marque', 'Voiture', 'Equipement', 'VoitureEquipement']) {
      const references = new Set(execute(reference, `SELECT * FROM ${table}`)[0].rows.map(ligne => JSON.stringify(ligne)));
      const lignes = execute(example, `SELECT * FROM ${table}`)[0].rows;
      assert.ok(lignes.length > 0, table);
      for (const ligne of lignes) assert.ok(references.has(JSON.stringify(ligne)), table);
    }
    assert.deepEqual(execute(example, 'SELECT immat FROM Voiture ORDER BY immat')[0].rows, [
      ['TG-0020-AV'], ['TG-0480-AV'], ['TG-3733-AC'], ['TG-4444-AL'], ['TG-7854-Z'], ['TG-9420-AF']
    ]);
  } finally {
    example.close();
    reference.close();
  }
});

test('F35 : le premier indice interroge les colonnes sans dicter la syntaxe', () => {
  const exercise = exercises.find(item => item.id === 'sq-c1-e1');
  const firstHint = exercise.hints[0];
  assert.match(firstHint, /\?$/);
  assert.match(firstHint, /colonnes/i);
  assert.doesNotMatch(firstHint, /\bSELECT\b|\bORDER\s+BY\b|\*/i);
});

test('les jeux utilisent les quatre tables du simulateur, hors états pédagogiques transitoires', diagnostic => {
  const reference = database();
  const tables = db => execute(db, "SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%' ORDER BY name")[0].rows;
  function schema(db, table) {
    const columns = execute(db, `PRAGMA table_info(${table})`)[0].rows;
    const foreignKeys = execute(db, `PRAGMA foreign_key_list(${table})`)[0].rows;
    const indexes = execute(db, `PRAGMA index_list(${table})`)[0].rows
      .filter(index => index[2] === 1)
      .map(index => {
        const indexName = String(index[1]).replace(/"/g, '""');
        const fields = execute(db, `PRAGMA index_info("${indexName}")`)[0].rows.map(field => field[2]);
        return { origin: index[3], partial: index[4], fields };
      })
      .sort((left, right) => JSON.stringify(left).localeCompare(JSON.stringify(right)));
    return { columns, foreignKeys, indexes };
  }

  try {
    const expected = {
      Marque: schema(reference, 'Marque'),
      Voiture: schema(reference, 'Voiture'),
      Equipement: schema(reference, 'Equipement'),
      VoitureEquipement: schema(reference, 'VoitureEquipement')
    };
    const referenceTables = [['Equipement'], ['Marque'], ['Voiture'], ['VoitureEquipement']];
    assert.deepEqual(tables(reference), referenceTables);
    assert.equal(exercises.length, 18);
    let fixtures = 0;
    for (const exercise of exercises) {
      const id = exercise.id;
      for (const sample of [...exercise.examples, ...exercise.tests]) {
        const db = new SQL.Database();
        try {
          db.exec(sample.stdin.split('-- VERIFY:')[0]);
          assert.equal(execute(db, 'PRAGMA foreign_keys')[0].rows[0][0], 1, id);
          const createdTable = id === 'sq-c2-e1' ? 'Marque' : id === 'sq-c2-e2' ? 'Equipement' : null;
          if (createdTable) {
            assert.deepEqual(tables(db), [], `${id} : base vide`);
            db.exec(exercise.solution);
            assert.deepEqual(tables(db), [[createdTable]], `${id} : table créée`);
            assert.deepEqual(schema(db, createdTable), expected[createdTable], `${id} : ${createdTable}`);
          } else {
            assert.deepEqual(tables(db), referenceTables, `${id} : tables`);
            if (id === 'sq-c2-e3') {
              assert.deepEqual(schema(db, 'Equipement'), {
                ...expected.Equipement,
                columns: expected.Equipement.columns.filter(column => column[1] !== 'prix')
              }, `${id} : Equipement avant ALTER`);
              db.exec(exercise.solution);
            }
            for (const table of Object.keys(expected)) {
              assert.deepEqual(schema(db, table), expected[table], `${id} : ${table}`);
            }
          }
          fixtures++;
        } finally { db.close(); }
      }
    }
    diagnostic.diagnostic(`${fixtures} jeux vérifiés ; CREATE sur base vide et ALTER contrôlé avant et après migration.`);
  } finally { reference.close(); }
});

test('corrigés compatibles exécutables sur la base initiale du simulateur', async diagnostic => {
  const compatibleIds = [
    'sq-c1-e1', 'sq-c1-e2', 'sq-c1-e3', 'sq-c3-e1', 'sq-c3-e2', 'sq-c3-e3',
    'sq-c4-e1', 'sq-c4-e2', 'sq-c4-e3', 'sq-c5-e1', 'sq-c5-e2', 'sq-c5-e3',
    'sq-c6-e1', 'sq-c6-e2', 'sq-c6-e3'
  ];
  for (const id of compatibleIds) {
    const exercise = exercises.find(item => item.id === id);
    assert.ok(exercise, id);
    const output = await sqlEngine.execute(exercise.solution, PARC_SQL, { timeoutMs: 10000 });
    assert.equal(output.status, 'success', `${id} : ${output.stderr}`);
  }
  diagnostic.diagnostic(`${compatibleIds.length} corrigés exécutés sur la base complète ; les deux CREATE et l’ALTER exigent leurs états initiaux particuliers.`);
});

test('la double jointure d’exemple retrouve les associations du simulateur', async () => {
  const exercise = exercises.find(item => item.id === 'sq-c4-e3');
  const output = await sqlEngine.execute(exercise.solution, PARC_SQL, { timeoutMs: 10000 });
  assert.equal(output.status, 'success', output.stderr);
  assert.equal(output.stdout.trim(), exercise.examples[0].expected.trim());
});

test('18 corrigés SQL : 18 exemples et 93 jeux cachés exécutés', async t => {
  let count = 0;
  for (const exercise of exercises) {
    for (const sample of [...exercise.examples, ...exercise.tests]) {
      const output = await sqlEngine.execute(exercise.solution, sample.stdin, { timeoutMs: 10000 });
      assert.equal(output.status, 'success', `${exercise.id}: ${output.stderr}`);
      assert.equal(output.stdout.trim(), sample.expected.trim(), exercise.id);
      count++;
    }
  }
  assert.equal(exercises.length, 18);
  assert.equal(count, 111);
  t.diagnostic(`${exercises.length} corrigés exécutés sur ${count} jeux, sorties exactes comparées.`);
});

test('contre-vérification SQLite natif, base en mémoire', t => {
  const script = [
    'import json, sqlite3, sys',
    'schema = json.load(sys.stdin)["schema"]',
    'db = sqlite3.connect(":memory:")',
    'db.executescript(schema)',
    'out = {"version": sqlite3.sqlite_version, "fk": db.execute("PRAGMA foreign_keys").fetchone()[0]}',
    'out["count"] = db.execute("SELECT COUNT(*) FROM Voiture JOIN Marque USING (codemarque)").fetchone()[0]',
    'out["having"] = db.execute("SELECT COUNT(*) FROM Voiture HAVING COUNT(*) > 0").fetchall()',
    'out["sum"] = db.execute("SELECT SUM(pxachat) FROM Voiture").fetchone()[0]',
    'try:',
    '    db.execute("INSERT INTO Voiture (immat,marque,codemarque,moteur,km,pxachat,nbreplace) VALUES (NULL,\'TOYOTA\',\'TOY\',\'DIESEL\',0,1,5)")',
    '    out["null_refused"] = False',
    'except sqlite3.IntegrityError: out["null_refused"] = True',
    'try:',
    '    db.execute("INSERT INTO Voiture (immat,marque,codemarque,moteur,km,pxachat,nbreplace) VALUES (\'TEST\',\'TOYOTA\',\'BMW\',\'DIESEL\',0,1,5)")',
    '    out["fk_refused"] = False',
    'except sqlite3.IntegrityError: out["fk_refused"] = True',
    'print(json.dumps(out))'
  ].join('\n');
  const child = spawnSync('python3', ['-c', script], { input: JSON.stringify({ schema: PARC_SQL }), encoding: 'utf8' });
  assert.equal(child.status, 0, child.stderr);
  const output = JSON.parse(child.stdout);
  assert.equal(output.fk, 1);
  assert.equal(output.count, 23);
  assert.deepEqual(output.having, [[23]]);
  assert.equal(output.sum, 613800000);
  assert.equal(output.null_refused, true);
  assert.equal(output.fk_refused, true);
  t.diagnostic(`SQLite natif ${output.version} : clés, jointure, HAVING et total vérifiés.`);
});

}
