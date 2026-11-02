'use strict';

if (require('./lot1-sandbox').runInsideIsolatedOrRegister(__filename)) {

const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const parse5 = require('parse5');
const initSqlJs = require('../b1-sql/assets/vendor/sqljs/sql-wasm.js');
const course = require('../server/content/b1-sql');
const pages = require('../server/content/b1-sql/pages');
const kit = require('../scripts/course-kit');
const chapters = [
  ...require('../server/content/b1-sql/chapitres-1-3'),
  ...require('../server/content/b1-sql/chapitres-4-6')
];
const exercises = require('../server/exercises/b1-sql');

let SQL;

test.before(async () => {
  SQL = await initSqlJs({
    locateFile: name => path.join(__dirname, '../b1-sql/assets/vendor/sqljs', name)
  });
});

function database() {
  const db = new SQL.Database();
  db.exec(pages.PARC_SQL);
  return db;
}

function result(db, sql) {
  const statement = db.prepare(sql);
  try {
    const columns = statement.getColumnNames();
    const values = [];
    while (statement.step()) values.push(statement.get());
    return { columns, values };
  } finally {
    statement.free();
  }
}

function nodes(root, predicate) {
  return (predicate(root) ? [root] : []).concat(
    ...(root.childNodes || []).map(child => nodes(child, predicate))
  );
}

function text(root) {
  if (root.nodeName === '#text') return root.value;
  return (root.childNodes || []).map(text).join('');
}

test('F05 : les colonnes du premier SELECT correspondent au parc et à son résultat', () => {
  const db = database();
  try {
    const section = chapters[0].sections.find(item => item.title.includes('SELECT'));
    assert.match(section.html, /SELECT nommarque, paysmarque FROM Marque/);
    assert.deepEqual(result(db, 'SELECT nommarque, paysmarque FROM Marque ORDER BY nommarque LIMIT 3').values,
      [['BMW', 'ALLEMAGNE'], ['HYUNDAI', 'COREE DU SUD'], ['KIA', 'COREE DU SUD']]);
  } finally { db.close(); }
});

test('F06 et F79 : clés NOT NULL, référence contrôlée et date nullable', () => {
  const db = database();
  try {
    assert.equal(result(db, 'PRAGMA foreign_keys').values[0][0], 1);
    const columns = result(db, 'PRAGMA table_info(Voiture)').values;
    assert.equal(columns.find(column => column[1] === 'immat')[3], 1);
    assert.ok(columns.some(column => column[1] === 'codemarque'));
    assert.equal(result(db, 'SELECT COUNT(*) FROM Voiture V JOIN Marque M ON M.codemarque = V.codemarque').values[0][0], 23);
    assert.throws(() => db.run("INSERT INTO Voiture (immat, codemarque, marque, moteur, km, pxachat, nbreplace) VALUES (NULL, 'TOY', 'TOYOTA', 'DIESEL', 0, 1, 5)"), /NOT NULL/);
    assert.throws(() => db.run("INSERT INTO Voiture (immat, codemarque, marque, moteur, km, pxachat, nbreplace) VALUES ('TEST-1', 'XXX', 'TOYOTA', 'DIESEL', 0, 1, 5)"), /FOREIGN KEY/);
    assert.throws(() => db.run("INSERT INTO Voiture (immat, codemarque, marque, moteur, km, pxachat, nbreplace) VALUES ('TEST-2', 'BMW', 'TOYOTA', 'DIESEL', 0, 1, 5)"), /FOREIGN KEY/);
    db.run("INSERT INTO Voiture (immat, codemarque, marque, moteur, km, pxachat, nbreplace) VALUES ('TEST-3', 'TOY', 'TOYOTA', 'DIESEL', 0, 1, 5)");
    assert.deepEqual(result(db, "SELECT datecirc IS NULL FROM Voiture WHERE immat = 'TEST-3'").values, [[1]]);
  } finally { db.close(); }
});

test('schéma du parc : équipements, valeurs par défaut et associations contrôlées', () => {
  const db = database();
  try {
    const columns = result(db, 'PRAGMA table_info(Equipement)').values;
    assert.deepEqual(columns.map(column => column[1]), ['codeequipement', 'nomequipement', 'prix']);
    assert.equal(columns.find(column => column[1] === 'prix')[3], 0);
    assert.equal(columns.find(column => column[1] === 'prix')[4], '0');
    assert.equal(result(db, 'SELECT COUNT(*) FROM Equipement').values[0][0], 4);
    assert.equal(result(db, 'SELECT COUNT(*) FROM VoitureEquipement').values[0][0], 6);
    db.run("INSERT INTO Equipement (codeequipement, nomequipement) VALUES ('DEF', 'Exemple par défaut')");
    db.run("INSERT INTO Equipement (codeequipement, nomequipement, prix) VALUES ('VID', 'Prix inconnu', NULL)");
    assert.deepEqual(result(db, "SELECT codeequipement, prix FROM Equipement WHERE codeequipement IN ('DEF', 'VID') ORDER BY codeequipement").values,
      [['DEF', 0], ['VID', null]]);
    assert.throws(() => db.run("INSERT INTO VoitureEquipement VALUES ('TG-3733-AC', 'AIR')"), /UNIQUE/);
    assert.throws(() => db.run("INSERT INTO VoitureEquipement VALUES ('TG-3733-AC', 'ABSENT')"), /FOREIGN KEY/);
    assert.throws(() => db.run("INSERT INTO VoitureEquipement VALUES ('ABSENT', 'AIR')"), /FOREIGN KEY/);
    db.run("DELETE FROM Voiture WHERE immat = 'TG-3733-AC'");
    assert.equal(result(db, "SELECT COUNT(*) FROM VoitureEquipement WHERE immat = 'TG-3733-AC'").values[0][0], 0);
    assert.equal(result(db, "SELECT COUNT(*) FROM Equipement WHERE codeequipement = 'AIR'").values[0][0], 1);
    db.run("DELETE FROM Equipement WHERE codeequipement = 'GPS'");
    assert.equal(result(db, "SELECT COUNT(*) FROM VoitureEquipement WHERE codeequipement = 'GPS'").values[0][0], 0);
  } finally { db.close(); }
});

test('affinités SQLite : le schéma non STRICT ne valide pas les types et dates', () => {
  const db = database();
  try {
    db.run("INSERT INTO Voiture (immat, marque, codemarque, moteur, datecirc, km, pxachat, nbreplace) VALUES ('TEST-TYPE', 'TOYOTA', 'TOY', 'DIESEL', 'date invalide', 'inconnu', 'N/A', 5)");
    assert.deepEqual(result(db, "SELECT datecirc, typeof(km), typeof(pxachat) FROM Voiture WHERE immat = 'TEST-TYPE'").values,
      [['date invalide', 'text', 'text']]);
  } finally { db.close(); }
});

test('F07 : la zone libre annonce SQL et démarre sur le même parc que le simulateur', () => {
  const atelier = course.render(kit)['atelier.html'].body;
  const document = parse5.parseFragment(atelier);
  const starter = nodes(document, node => node.nodeName === 'script' &&
    (node.attrs || []).some(attr => attr.name === 'data-lab-starter'))[0];
  const lab = nodes(document, node => (node.attrs || []).some(attr => attr.name === 'data-lab'))[0];
  assert.ok(starter);
  assert.ok(lab);
  assert.doesNotMatch(atelier, /\bBash\b/);
  const setup = lab.attrs.find(attr => attr.name === 'data-stdin').value;
  assert.equal(setup, pages.PARC_SQL);
  const db = new SQL.Database();
  try {
    db.exec(setup);
    assert.deepEqual(result(db, text(starter)).values, [[23]]);
  } finally { db.close(); }
});

test('F35 : le premier indice aide sans donner la requête complète', () => {
  const exercise = exercises.find(item => item.id === 'sq-c1-e1');
  assert.doesNotMatch(exercise.hints[0], /SELECT\s+\*\s+FROM/i);
});

test('chaînes : la forme standard et la tolérance SQLite sont distinguées', () => {
  const question = chapters[2].questions.find(item => item.stem.includes('chaîne SQL'));
  assert.equal(question.opts[question.correct], "'DIESEL'");
  assert.match(question.exp, /compatibilité/);
  const db = database();
  try {
    assert.deepEqual(result(db, "SELECT 'DIESEL'").values, [['DIESEL']]);
    assert.deepEqual(result(db, 'SELECT "DIESEL"').values, [['DIESEL']]);
    assert.throws(() => result(db, 'SELECT `DIESEL`'), /no such column/i);
  } finally { db.close(); }
});

test('F60 : la carte distingue DEFAULT, NOT NULL et INTEGER PRIMARY KEY en SQLite', () => {
  const card = chapters[1].flashcards.find(item => item.q.includes('absente'));
  assert.match(card.a, /SQLite/);
  assert.match(card.a, /NOT NULL/);
  assert.match(card.a, /INTEGER PRIMARY KEY/);
  const db = new SQL.Database();
  try {
    db.exec("CREATE TABLE exemple (id INTEGER PRIMARY KEY, requis TEXT NOT NULL, optionnel TEXT DEFAULT 'x');");
    db.run("INSERT INTO exemple(requis) VALUES ('ok')");
    assert.deepEqual(result(db, 'SELECT id, optionnel FROM exemple').values, [[1, 'x']]);
    assert.throws(() => db.run('INSERT INTO exemple DEFAULT VALUES'), /NOT NULL/);
  } finally { db.close(); }
});

test('QCM et cartes : NULL, COUNT et DISTINCT sont vérifiés dans SQLite', () => {
  const db = database();
  try {
    db.run('CREATE TABLE dates_qcm (datecirc TEXT)');
    for (let index = 0; index < 34; index++) {
      db.run('INSERT INTO dates_qcm (datecirc) VALUES (?)', [index < 9 ? null : '2014-11-21']);
    }
    assert.deepEqual(result(db, 'SELECT COUNT(datecirc), COUNT(*) FROM dates_qcm').values, [[25, 34]]);
    assert.deepEqual(result(db, 'SELECT NULL = NULL, NULL == NULL, NULL IS NULL, NULL LIKE NULL').values, [[null, null, 1, null]]);
    const countries = result(db, 'SELECT DISTINCT paysmarque FROM Marque').values.map(row => row[0]).sort();
    assert.deepEqual(countries, ['ALLEMAGNE', 'COREE DU SUD', 'FRANCE', 'JAPON', 'ROYAUME-UNI']);
  } finally { db.close(); }
});

test('F78 et F224 : ON, USING, NATURAL et CROSS sont correctement présentés', () => {
  const chapter = chapters[3];
  const combined = chapter.sections.map(section => section.html).join('\n');
  assert.doesNotMatch(combined, /jointure sans <strong>ON<\/strong> n’existe pas/);
  assert.match(combined, /USING/);
  assert.match(combined, /NATURAL/);
  assert.match(combined, /CROSS JOIN/);
  assert.match(combined, /extension non portable/);
  const db = database();
  try {
    assert.equal(result(db, 'SELECT COUNT(*) FROM Voiture JOIN Marque USING (codemarque)').values[0][0], 23);
    assert.equal(result(db, 'SELECT COUNT(*) FROM Voiture NATURAL JOIN Marque').values[0][0], 23);
    assert.equal(result(db, 'SELECT COUNT(*) FROM Voiture CROSS JOIN Marque').values[0][0], 276);
    assert.equal(result(db, 'SELECT COUNT(*) FROM Voiture V CROSS JOIN Marque M ON V.codemarque = M.codemarque').values[0][0], 23);
    assert.equal(result(db, 'SELECT COUNT(*) FROM Voiture CROSS JOIN Marque USING (codemarque)').values[0][0], 23);
  } finally { db.close(); }
});

test('F80–F83 : GROUP BY, HAVING, UPDATE et ordre logique sont qualifiés', () => {
  const grouping = chapters[4];
  const groupQuestion = grouping.questions.find(item => item.stem.includes('immat') && item.stem.includes('GROUP BY'));
  assert.match(groupQuestion.exp, /SQLite/);
  const combined = grouping.sections.map(section => section.html).join('\n');
  assert.doesNotMatch(combined, /HAVING ne peut exister qu’après un GROUP BY/);
  assert.match(combined, /ordre logique/i);
  assert.match(combined, /optimiseur/i);
  assert.doesNotMatch(chapters[5].sections[0].html, /UPDATE sans WHERE est rejeté/);
  const db = database();
  try {
    assert.equal(result(db, 'SELECT marque, immat, COUNT(*) FROM Voiture GROUP BY marque').values.length, 12);
    assert.deepEqual(result(db, 'SELECT COUNT(*) FROM Voiture HAVING COUNT(*) > 0').values, [[23]]);
    assert.deepEqual(result(db, 'SELECT COUNT(*) FROM Voiture HAVING COUNT(*) > 23').values, []);
    assert.equal(result(db, 'SELECT immat FROM Voiture WHERE (SELECT COUNT(*) FROM Marque) > 0').values.length, 23);
    assert.throws(() => result(db, 'SELECT immat FROM Voiture WHERE COUNT(*) > 0'), /misuse of aggregate/i);
    db.run("UPDATE Voiture SET moteur = 'DIESEL'");
    assert.equal(db.getRowsModified(), 23);
  } finally { db.close(); }
});

test('F84 : ALTER est expliqué au chapitre 2 avant son exercice', () => {
  const combined = chapters[1].sections.map(section => section.html).join('\n');
  assert.match(combined, /ALTER TABLE Equipement ADD COLUMN garantie_mois INTEGER DEFAULT 12/);
  const db = database();
  try {
    db.exec('ALTER TABLE Equipement ADD COLUMN garantie_mois INTEGER DEFAULT 12;');
    assert.deepEqual(result(db, "SELECT codeequipement, garantie_mois FROM Equipement WHERE codeequipement = 'AIR'").values, [['AIR', 12]]);
  } finally { db.close(); }
});

}
