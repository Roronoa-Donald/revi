'use strict';

const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');
const { Client } = require('pg');
const catalogue = require('../server/exercises');
const { runTests } = require('../server/exercises/runner');
const sqlEngine = require('../assets/js/engines/sql-wasm-engine');

const root = path.resolve(__dirname, '..');
const b2chapter1 = require('../server/content/sql/chapitre1');
const b2chapter4 = require('../server/content/sql/chapitre4');
const b2chapter5 = require('../server/content/sql/chapitre5');
const b2chapter6 = require('../server/content/sql/chapitre6');
const b3chapter1 = require('../server/content/b3-sql/chapitre1');
const b3chapter2 = require('../server/content/b3-sql/chapitre2');
const b3chapter3 = require('../server/content/b3-sql/chapitre3');
const b3chapter4 = require('../server/content/b3-sql/chapitre4');
const b3chapter5 = require('../server/content/b3-sql/chapitre5');
const b3chapter6 = require('../server/content/b3-sql/chapitre6');
const inactiveB2Chapter1 = require('../server/exercises/sql/chapitre1');
const inactiveChapter1 = require('../server/exercises/b3-sql/chapitre1');
const inactiveChapter3 = require('../server/exercises/b3-sql/chapitre3');
const inactiveChapter4 = require('../server/exercises/b3-sql/chapitre4');
const { isGradingSuspended } = require('../server/exercises/grading-policy');

function flashcard(chapter, pattern) {
  const result = chapter.flashcards.find(entry => pattern.test(entry.q));
  assert.ok(result, `Carte introuvable : ${pattern}`);
  return result;
}

function question(chapter, pattern) {
  const result = chapter.questions.find(entry => pattern.test(entry.stem));
  assert.ok(result, `Question introuvable : ${pattern}`);
  return result;
}

function sections(chapter) {
  return chapter.sections.map(section => section.html).join('\n');
}

function source(relative) {
  return fs.readFileSync(path.join(root, relative), 'utf8');
}

test('F10 : CHECK nullable, NOT NULL et réponse du QCM', () => {
  const card = flashcard(b2chapter1, /CHECK \(prix/i);
  const quiz = question(b2chapter1, /strictement positives/i);
  assert.match(card.a, /NULL/i);
  assert.match(card.a, /NOT NULL/i);
  assert.match(card.a, /NaN/i);
  assert.match(card.a, /fini|Infinity/i);
  assert.match(quiz.opts[quiz.correct], /NOT NULL.*CHECK/i);
  assert.match(quiz.exp, /NULL/i);
  assert.match(quiz.exp, /NOT NULL/i);
  assert.match(source('server/content/sql/pages/cartes-formules.js'), /CHECK.*NULL/i);
  for (const exercise of [catalogue.getExercise('sql2-c1-e1'), inactiveB2Chapter1.find(entry => entry.id === 'sql2-c1-e1')]) {
    assert.match(exercise.brief, /salaire[^.]*NULL/i);
    assert.match(exercise.brief, /CHECK/i);
  }
});

test('F11 : limites de caractères PostgreSQL et affinité SQLite', () => {
  const card = flashcard(b2chapter1, /CHAR\(10\).*VARCHAR\(10\)/i);
  for (const expression of [/PostgreSQL/i, /caractères/i, /encodage|octets/i, /SQLite/i]) {
    assert.match(card.a, expression);
  }
  assert.doesNotMatch(card.a, /toujours 10 octets/i);
  assert.match(sections(b2chapter1), /SQLite[^.]*VARCHAR/i);
});

test('F20 : UNION compare toute la ligne, profondeur variable et anti-cycle PostgreSQL', () => {
  const quiz = question(b3chapter4, /WITH RECURSIVE.*(?:boucle|cycle)/i);
  assert.match(quiz.stem, /niveau|profondeur/i);
  assert.match(quiz.opts[quiz.correct], /ANY|chemin/i);
  assert.match(quiz.exp, /UNION/i);
  assert.match(quiz.exp, /colonnes|ligne entière|ligne complète/i);
  assert.match(quiz.exp, /niveau|profondeur/i);
  assert.match(sections(b3chapter4), /SQLite/i);
  assert.match(sections(b3chapter4), /UNION[^.]*colonnes|UNION[^.]*ligne entière|UNION[^.]*ligne complète/i);
  assert.match(flashcard(b3chapter4, /éléments obligatoires.*CTE/i).a, /UNION ALL.*UNION|UNION.*UNION ALL/i);
  assert.match(flashcard(b3chapter4, /stopper une boucle/i).a, /UNION/i);
  const exam = source('server/content/b3-sql/pages/examens-exercices.js');
  assert.match(exam, /<code>UNION<\/code> ou <code>UNION ALL<\/code>/i);
  assert.match(exam, /NOT \(e\.id = ANY\(cte\.path\)\)/i);
  for (const exercise of [catalogue.getExercise('sql3-c4-e3'), inactiveChapter4.find(entry => entry.id === 'sql3-c4-e3')]) {
    assert.match(exercise.brief, /SQLite/i);
    assert.match(exercise.brief, /identifiants[^.]*uniques/i);
    assert.match(exercise.brief, /sans cycle/i);
    assert.match(exercise.brief, /UNION/i);
  }
});

test('F21 : les deux déclencheurs sont transactionnels avant le COMMIT', () => {
  const quiz = question(b3chapter5, /journaliser chaque ligne après/i);
  assert.match(quiz.opts[quiz.correct], /AFTER.*FOR EACH ROW/i);
  for (const expression of [/BEFORE/i, /AFTER/i, /rollback/i, /différée/i, /PostgreSQL/i]) {
    assert.match(quiz.exp, expression);
  }
  const card = flashcard(b3chapter5, /trigger BEFORE et AFTER/i);
  assert.match(card.a, /ROLLBACK/i);
  assert.match(card.a, /différée/i);
  assert.match(sections(b3chapter5), /BEFORE[^.]*ROLLBACK|ROLLBACK[^.]*BEFORE/i);
  assert.doesNotMatch(b3chapter5.summary.join(' '), /avant validation physique/i);
  const b2card = flashcard(b2chapter6, /trigger BEFORE.*trigger AFTER/i);
  assert.match(b2card.a, /ROLLBACK/i);
  assert.match(b2card.a, /SQLite|PostgreSQL/i);
  for (const id of ['sql2-c6-e2', 'sql3-c5-e1']) {
    assert.match(catalogue.getExercise(id).brief, /SQLite/i);
    assert.match(catalogue.getExercise(id).brief, /ROLLBACK/i);
  }
  assert.doesNotMatch(source('server/content/b3-sql/pages/examens-exercices.js'), /audit immuable/i);
  const course = require('../server/content/b3-sql');
  assert.doesNotMatch(course.description, /audit immuables/i);
  assert.match(course.description, /audit transactionnels/i);
});

test('F21 : exemple B2 exécuté et annulé avec SQLite natif', diagnostic => {
  const html = sections(b2chapter6);
  const match = html.match(/CREATE TRIGGER trg_audit_prix[\s\S]*?END;/);
  assert.ok(match, 'Exemple CREATE TRIGGER introuvable');
  const script = String.raw`
import json, sqlite3, sys
trigger = json.load(sys.stdin)['trigger']
database = sqlite3.connect(':memory:', isolation_level=None)
database.executescript('CREATE TABLE Produits (id INT, prix INT); CREATE TABLE HistoriquePrix (produit_id INT, ancien_prix INT, nouveau_prix INT, modifie_le TEXT); INSERT INTO Produits VALUES (1, 10);')
database.executescript(trigger)
database.execute('BEGIN')
database.execute('UPDATE Produits SET prix = 20 WHERE id = 1')
changed = database.execute('SELECT produit_id, ancien_prix, nouveau_prix FROM HistoriquePrix').fetchall()
database.execute('ROLLBACK')
after = database.execute('SELECT prix, (SELECT COUNT(*) FROM HistoriquePrix) FROM Produits').fetchone()
database.execute('BEGIN')
database.execute('UPDATE Produits SET prix = NULL WHERE id = 1')
null_change = database.execute('SELECT produit_id, ancien_prix, nouveau_prix FROM HistoriquePrix').fetchall()
database.execute('ROLLBACK')
print(json.dumps({'version': sqlite3.sqlite_version, 'changed': changed, 'after': after, 'null_change': null_change}))
`;
  const execution = spawnSync('python3', ['-c', script], {
    input: JSON.stringify({ trigger: match[0].replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&') }),
    encoding: 'utf8', timeout: 10000, maxBuffer: 65536
  });
  assert.equal(execution.status, 0, execution.stderr || execution.error?.message);
  const report = JSON.parse(execution.stdout);
  assert.deepEqual(report.changed, [[1, 10, 20]]);
  assert.deepEqual(report.after, [10, 0]);
  assert.deepEqual(report.null_change, [[1, 10, null]]);
  assert.match(html, /Exemple SQLite/i);
  diagnostic.diagnostic(JSON.stringify(report));
});

test('F21 : corrigé SQLite de l’examen B2 et limites de RAISE(ABORT)', diagnostic => {
  const pages = require('../server/content/sql/pages/examens-exercices');
  const course = require('../server/content/sql');
  const html = pages.examens(course)['chapitres/examens.html'].body;
  const match = html.match(/CREATE TRIGGER check_solde_before_update[\s\S]*?END;/);
  assert.ok(match, 'Corrigé du trigger BEFORE introuvable');
  assert.match(html, /SQLite/i);
  const script = String.raw`
import json, sqlite3, sys
trigger = json.load(sys.stdin)['trigger']
database = sqlite3.connect(':memory:', isolation_level=None)
database.executescript('CREATE TABLE ComptesBancaires (id INT, solde INT, decouvert_max INT); INSERT INTO ComptesBancaires VALUES (1, 10, 100);')
database.executescript(trigger)
database.execute('BEGIN')
database.execute('UPDATE ComptesBancaires SET solde = -100')
boundary = database.execute('SELECT solde FROM ComptesBancaires').fetchone()[0]
database.execute('UPDATE ComptesBancaires SET solde = 25')
error = None
try:
    database.execute('UPDATE ComptesBancaires SET solde = -101')
except sqlite3.IntegrityError as exception:
    error = str(exception)
after_abort = database.execute('SELECT solde FROM ComptesBancaires').fetchone()[0]
transaction_open = database.in_transaction
database.execute('ROLLBACK')
after_rollback = database.execute('SELECT solde FROM ComptesBancaires').fetchone()[0]
print(json.dumps({'version': sqlite3.sqlite_version, 'boundary': boundary, 'error': error, 'after_abort': after_abort, 'transaction_open': transaction_open, 'after_rollback': after_rollback}))
`;
  const execution = spawnSync('python3', ['-c', script], {
    input: JSON.stringify({ trigger: match[0].replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&') }),
    encoding: 'utf8', timeout: 10000, maxBuffer: 65536
  });
  assert.equal(execution.status, 0, execution.stderr || execution.error?.message);
  const report = JSON.parse(execution.stdout);
  assert.equal(report.boundary, -100);
  assert.equal(report.error, 'Depassement de decouvert interdit');
  assert.equal(report.after_abort, 25);
  assert.equal(report.transaction_open, true);
  assert.equal(report.after_rollback, 10);
  diagnostic.diagnostic(JSON.stringify(report));
});

test('F49 : verrou de ligne PostgreSQL et lecture ordinaire MVCC', () => {
  const card = flashcard(b2chapter5, /verrou partagé.*verrou exclusif/i);
  for (const expression of [/PostgreSQL/i, /ligne/i, /SELECT/i, /MVCC/i]) {
    assert.match(card.a, expression);
  }
  assert.doesNotMatch(card.a, /bloque tout autre accès/i);
  assert.match(sections(b2chapter5), /SELECT[^.]*MVCC|MVCC[^.]*SELECT/i);
  const reindex = sections(b3chapter2);
  assert.match(reindex, /SHARE[^.]*table/i);
  assert.match(reindex, /ACCESS EXCLUSIVE[^.]*index|index[^.]*ACCESS EXCLUSIVE/i);
  assert.doesNotMatch(reindex, /AccessExclusiveLock[^.]*sur la table/i);
});

test('F61 : AVG, COUNT(*) et array_agg PostgreSQL ne sont pas généralisés', () => {
  const card = flashcard(b2chapter4, /AVG\(note\)/i);
  for (const expression of [/15/, /COUNT\(\*\)/i, /array_agg/i, /PostgreSQL/i, /NULL/i]) {
    assert.match(card.a, expression);
  }
  assert.doesNotMatch(card.a, /les fonctions d’agrégation ignorent les NULL/i);
  const summary = b2chapter4.summary.find(entry => /COUNT/i.test(entry) && /SUM/i.test(entry));
  assert.match(summary, /COUNT\(\*\)/i);
});

async function grade(exercise, submitted) {
  return runTests(exercise, submitted, {
    execute: async ({ code, stdin }) => {
      const result = await sqlEngine.execute(code, stdin, { timeoutMs: 10000 });
      return { ...result, ok: result.status === 'success' };
    }
  });
}

test('F171 : ordre, table et index complet, sans exposer les tests cachés', async diagnostic => {
  const active = catalogue.getExercise('sql3-c3-e3');
  const inactive = inactiveChapter3.find(entry => entry.id === 'sql3-c3-e3');
  assert.ok(active);
  assert.ok(inactive);
  assert.equal(isGradingSuspended('b3-sql'), true);
  const client = catalogue.toClient(active);
  assert.equal(Object.hasOwn(client, 'tests'), false);
  assert.equal(Object.hasOwn(client, 'solution'), false);
  for (const [label, exercise] of [['catalogue actif', active], ['module historique', inactive]]) {
    const reference = await grade(exercise, exercise.solution);
    assert.equal(reference.stop, null, `${label} : solution de référence refusée`);
    const reversed = exercise.solution.replace('commandes(annee, montant)', 'commandes(montant, annee)');
    const partial = exercise.solution.replace('commandes(annee, montant);', 'commandes(annee, montant) WHERE annee = 2025;');
    assert.notEqual(reversed, exercise.solution);
    assert.notEqual(partial, exercise.solution);
    assert.equal((await grade(exercise, reversed)).stop?.reason, 'wrong_output', `${label} : ordre inversé accepté`);
    assert.equal((await grade(exercise, partial)).stop?.reason, 'wrong_output', `${label} : index partiel accepté`);
    assert.match(exercise.brief, /non partiel|complet/i);
    assert.match(exercise.brief, /SQLite/i);
    assert.match(exercise.brief, /sans garantir|pas garanti/i);
    assert.doesNotMatch(exercise.goal, /par intervalle/i);
  }
  assert.match(sections(b3chapter3), /visibility map|carte de visibilité/i);
  assert.doesNotMatch(sections(b3chapter3), /la table n’est jamais lue/i);
  assert.doesNotMatch(b3chapter2.summary.join(' '), /Index Only Scan sans toucher la table/i);
  assert.doesNotMatch(b3chapter2.situation, /garantir des temps|éliminant tout accès/i);
  assert.doesNotMatch(b3chapter2.checklist.join(' '), /déclencher un Index Only Scan/i);
  assert.doesNotMatch(b3chapter2.mastery.map(entry => entry.text).join(' '), /élimination des accès tables|maintenance non bloquante/i);
  diagnostic.diagnostic('Vérification locale sql.js uniquement ; la soumission distante reste suspendue.');
});

test('F171 : vérifications cachées effectivement rejouées en SQLite natif', diagnostic => {
  const active = catalogue.getExercise('sql3-c3-e3');
  const inactive = inactiveChapter3.find(entry => entry.id === 'sql3-c3-e3');
  const checks = [];
  for (const [label, exercise] of [['actif', active], ['historique', inactive]]) {
    const fixtures = exercise.tests.filter(entry => entry.stdin.includes('-- VERIFY:') && /pragma_index/i.test(entry.stdin));
    assert.ok(fixtures.length, `${label} : vérification de l’index absente`);
    for (const entry of fixtures) {
      const [setup, verification] = entry.stdin.split('-- VERIFY:');
      checks.push({
        label, setup, verification, reference: exercise.solution,
        inverse: exercise.solution.replace('commandes(annee, montant)', 'commandes(montant, annee)'),
        partiel: exercise.solution.replace('commandes(annee, montant);', 'commandes(annee, montant) WHERE annee = 2025;'),
        autre_table: exercise.solution.replace('ON commandes(annee, montant)', 'ON autre(annee, montant)')
      });
    }
  }
  const script = String.raw`
import json, sqlite3, sys
checks = json.load(sys.stdin)
results = []
for check in checks:
    entry = {'label': check['label']}
    for variant in ('reference', 'inverse', 'partiel', 'autre_table'):
        database = sqlite3.connect(':memory:')
        database.executescript('CREATE TABLE autre (annee INT, montant INT);')
        database.executescript(check['setup'])
        database.executescript(check[variant])
        entry[variant] = database.execute(check['verification']).fetchall()
        database.close()
    results.append(entry)
print(json.dumps({'version': sqlite3.sqlite_version, 'results': results}, ensure_ascii=False))
`;
  const execution = spawnSync('python3', ['-c', script], {
    input: JSON.stringify(checks), encoding: 'utf8', timeout: 10000, maxBuffer: 1048576
  });
  assert.equal(execution.status, 0, execution.stderr || execution.error?.message);
  const report = JSON.parse(execution.stdout);
  for (const label of ['actif', 'historique']) {
    const results = report.results.filter(entry => entry.label === label);
    assert.ok(results.some(entry => JSON.stringify(entry.reference) !== JSON.stringify(entry.inverse)), `${label} : ordre inversé indétectable`);
    assert.ok(results.some(entry => JSON.stringify(entry.reference) !== JSON.stringify(entry.partiel)), `${label} : index partiel indétectable`);
    assert.ok(results.some(entry => JSON.stringify(entry.reference) !== JSON.stringify(entry.autre_table)), `${label} : index sur une autre table indétectable`);
  }
  diagnostic.diagnostic(JSON.stringify(report));
});

test('F172 : modèle fictif et limites du snapshot dans les deux modules', () => {
  const active = catalogue.getExercise('sql3-c1-e2');
  const inactive = inactiveChapter1.find(entry => entry.id === 'sql3-c1-e2');
  for (const exercise of [active, inactive]) {
    assert.ok(exercise);
    assert.match(exercise.title, /fictif|simplifié/i);
    assert.match(exercise.brief, /fictif|simplifié/i);
    assert.match(exercise.brief, /en cours/i);
    assert.match(exercise.brief, /statut|état/i);
    assert.match(exercise.brief, /PostgreSQL/i);
  }
  assert.match(sections(b3chapter1), /snapshot[^.]*transactions en cours|instantané[^.]*transactions en cours/i);
  assert.match(sections(b3chapter1), /statut|état des transactions/i);
});

test('F173 : rejeu PostgreSQL et journal pédagogique ne prétendent pas à un UNDO global', () => {
  const lesson = sections(b3chapter1);
  const exam = source('server/content/b3-sql/pages/examens-exercices.js');
  assert.match(lesson, /non validées/i);
  assert.match(lesson, /rejou/i);
  assert.match(lesson, /visibilit/i);
  assert.match(lesson, /sans[^.]*UNDO global/i);
  assert.doesNotMatch(lesson, /REDO[^.]*rejoue les commits[^.]*UNDO/i);
  assert.match(exam, /non validées/i);
  assert.match(exam, /sans[^.]*UNDO global/i);
  const exercise = catalogue.getExercise('sql3-c1-e1');
  assert.match(exercise.brief, /fictif/i);
  assert.match(exercise.brief, /PostgreSQL/i);
});

test('F174 : durabilité conditionnelle, sauvegarde et réplication configurée', () => {
  const lesson = sections(b3chapter1);
  const b2card = flashcard(b2chapter5, /Durabilité/i);
  const b3replica = flashcard(b3chapter6, /réplication synchrone et asynchrone/i);
  const memo = source('server/content/b3-sql/pages/cartes-formules.js');
  const exam = source('server/content/b3-sql/pages/examens-exercices.js');
  for (const expression of [/synchronous_commit/i, /off/i, /sauvegard/i, /stockage/i, /réplic/i]) {
    assert.match(lesson, expression);
  }
  assert.match(b2card.a, /synchronous_commit/i);
  assert.match(b2card.a, /sauvegard/i);
  assert.match(b3replica.a, /synchronous_standby_names/i);
  assert.match(memo, /synchronous_standby_names/i);
  assert.match(exam, /synchronous_commit/i);
  assert.match(exam, /sauvegard/i);
  assert.doesNotMatch(exam, /garantit la Durabilité/i);
  assert.doesNotMatch(b3chapter1.checklist.join(' '), /sans perte de commit/i);
  assert.match(source('server/content/sql/pages/examens-exercices.js'), /synchronous_commit/i);
  assert.doesNotMatch(b3chapter6.objectives.join(' '), /zéro perte|RPO\s*=\s*0/i);
});

const sqliteProbe = String.raw`
import json
import os
import sqlite3
import tempfile

result = {'version': sqlite3.sqlite_version}
database = sqlite3.connect(':memory:', isolation_level=None)
database.execute('CREATE TABLE loose_price (price NUMERIC CHECK (price > 0))')
database.execute('CREATE TABLE strict_price (price NUMERIC NOT NULL CHECK (price > 0))')
database.execute('INSERT INTO loose_price VALUES (NULL)')
failures = []
for table, value in [('loose_price', -1), ('strict_price', None), ('strict_price', -1)]:
    try:
        database.execute('INSERT INTO ' + table + ' VALUES (?)', (value,))
        failures.append(False)
    except sqlite3.IntegrityError:
        failures.append(True)
database.execute('INSERT INTO strict_price VALUES (1)')
result['F10'] = [database.execute('SELECT COUNT(*) FROM loose_price WHERE price IS NULL').fetchone()[0], failures]
database.execute('CREATE TABLE strings (value VARCHAR(2))')
database.execute('INSERT INTO strings VALUES (?)', ('éab',))
result['F11'] = list(database.execute('SELECT value, LENGTH(value), LENGTH(CAST(value AS BLOB)) FROM strings').fetchone())
database.execute('CREATE TABLE notes (value INT)')
database.executemany('INSERT INTO notes VALUES (?)', [(10,), (20,), (None,)])
result['F61'] = list(database.execute('SELECT AVG(value), COUNT(value), COUNT(*) FROM notes').fetchone())
walk = '''WITH RECURSIVE edges(source, target) AS (VALUES (1, 2), (2, 1)),
walk(id) AS (SELECT 1 UNION SELECT target FROM edges JOIN walk ON source = id)
SELECT id FROM walk ORDER BY id'''
depth = '''WITH RECURSIVE edges(source, target) AS (VALUES (1, 2), (2, 1)),
walk(id, depth) AS (SELECT 1, 0 UNION SELECT target, depth + 1 FROM edges JOIN walk ON source = id WHERE depth < 4)
SELECT id, depth FROM walk ORDER BY depth'''
result['F20'] = {'nodes': database.execute(walk).fetchall(), 'depth': database.execute(depth).fetchall()}
database.execute('PRAGMA foreign_keys = ON')
database.execute('CREATE TABLE parents (id INT PRIMARY KEY)')
database.execute('CREATE TABLE children (id INT, parent_id INT REFERENCES parents(id) DEFERRABLE INITIALLY DEFERRED)')
database.execute('CREATE TABLE audit (phase TEXT)')
database.execute("CREATE TRIGGER log_before BEFORE INSERT ON children BEGIN INSERT INTO audit VALUES ('before'); END")
database.execute("CREATE TRIGGER log_after AFTER INSERT ON children BEGIN INSERT INTO audit VALUES ('after'); END")
database.execute('BEGIN')
database.execute('INSERT INTO children VALUES (1, 99)')
phases = [row[0] for row in database.execute('SELECT phase FROM audit ORDER BY phase')]
try:
    database.execute('COMMIT')
    commit_error = False
except sqlite3.IntegrityError:
    commit_error = True
still_in_transaction = database.in_transaction
database.execute('ROLLBACK')
result['F21'] = {'phases': phases, 'commit_error': commit_error, 'transaction_open': still_in_transaction,
                 'after_rollback': database.execute('SELECT COUNT(*) FROM audit').fetchone()[0]}
database.execute('CREATE TABLE commandes (annee INT, montant INT)')
database.execute('CREATE INDEX idx_cmd_annee_montant ON commandes(annee, montant)')
def info():
    return {'columns': [row[2] for row in database.execute("PRAGMA index_info('idx_cmd_annee_montant')")],
            'partial': database.execute("SELECT partial FROM pragma_index_list('commandes') WHERE name = 'idx_cmd_annee_montant'").fetchone()[0]}
right = info()
database.execute('DROP INDEX idx_cmd_annee_montant')
database.execute('CREATE INDEX idx_cmd_annee_montant ON commandes(montant, annee)')
reverse = info()
database.execute('DROP INDEX idx_cmd_annee_montant')
database.execute('CREATE INDEX idx_cmd_annee_montant ON commandes(annee, montant) WHERE annee = 2025')
partial = info()
result['F171'] = {'right': right, 'reverse': reverse, 'partial': partial}
directory = tempfile.mkdtemp(prefix='sql-lot2-sqlite-')
location = os.path.join(directory, 'locking.sqlite')
writer = sqlite3.connect(location, timeout=0.1, isolation_level=None)
reader = sqlite3.connect(location, timeout=0.1, isolation_level=None)
writer.execute('PRAGMA journal_mode=DELETE')
writer.execute('CREATE TABLE t (value INT)')
writer.execute('INSERT INTO t VALUES (10)')
writer.execute('BEGIN IMMEDIATE')
read_during_immediate = reader.execute('SELECT value FROM t').fetchone()[0]
writer.execute('ROLLBACK')
writer.execute('BEGIN EXCLUSIVE')
try:
    reader.execute('SELECT value FROM t').fetchall()
    blocked = False
except sqlite3.OperationalError as error:
    blocked = 'locked' in str(error).lower()
writer.execute('ROLLBACK')
result['F49'] = {'journal': 'DELETE', 'immediate_read': read_during_immediate, 'exclusive_blocked_read': blocked}
writer.close()
reader.close()
database.close()
print(json.dumps(result, ensure_ascii=False))
`;

test('Sondes SQLite natives : F10 F11 F20 F21 F49 F61 F171', diagnostic => {
  const execution = spawnSync('python3', ['-c', sqliteProbe], {
    encoding: 'utf8', timeout: 15000, maxBuffer: 1048576
  });
  assert.equal(execution.status, 0, execution.stderr || execution.error?.message);
  const result = JSON.parse(execution.stdout);
  assert.deepEqual(result.F10, [1, [true, true, true]]);
  assert.deepEqual(result.F11, ['éab', 3, 4]);
  assert.deepEqual(result.F61, [15, 2, 3]);
  assert.deepEqual(result.F20.nodes, [[1], [2]]);
  assert.deepEqual(result.F20.depth, [[1, 0], [2, 1], [1, 2], [2, 3], [1, 4]]);
  assert.deepEqual(result.F21, { phases: ['after', 'before'], commit_error: true, transaction_open: true, after_rollback: 0 });
  assert.deepEqual(result.F49, { journal: 'DELETE', immediate_read: 10, exclusive_blocked_read: true });
  assert.deepEqual(result.F171.right, { columns: ['annee', 'montant'], partial: 0 });
  assert.deepEqual(result.F171.reverse.columns, ['montant', 'annee']);
  assert.equal(result.F171.partial.partial, 1);
  diagnostic.diagnostic(JSON.stringify(result));
});

function runCommand(command, argumentsList, environment, timeout = 30000) {
  const result = spawnSync(command, argumentsList, {
    encoding: 'utf8', timeout, maxBuffer: 4 * 1024 * 1024, env: environment
  });
  assert.equal(result.status, 0, `${command} : ${result.error?.message || result.stderr || result.stdout}`);
  return result.stdout;
}

class PrivatePostgres {
  constructor() {
    this.directory = fs.mkdtempSync(path.join(os.tmpdir(), 'sql-lot2-postgres-'));
    this.data = path.join(this.directory, 'data');
    this.socket = path.join(this.directory, 'socket');
    this.log = path.join(this.directory, 'postgres.log');
    this.port = 55432;
    this.running = false;
    this.environment = { PATH: '/usr/bin:/bin', HOME: this.directory, LANG: 'C', LC_ALL: 'C' };
    fs.mkdirSync(this.socket, { mode: 0o700 });
  }

  initialize() {
    runCommand('initdb', ['-D', this.data, '--auth=trust', '--username=lot2', '--encoding=UTF8', '--no-locale'], this.environment);
  }

  start() {
    const options = `-k ${this.socket} -p ${this.port} -c listen_addresses='' -c unix_socket_permissions=0700 -c wal_writer_delay=10000ms`;
    runCommand('pg_ctl', ['-D', this.data, '-l', this.log, '-o', options, '-w', 'start'], this.environment);
    this.running = true;
  }

  stop(mode = 'fast') {
    if (!this.running) return;
    runCommand('pg_ctl', ['-D', this.data, '-m', mode, '-w', 'stop'], this.environment);
    this.running = false;
  }

  async connect() {
    const client = new Client({
      host: this.socket, port: this.port, user: 'lot2', password: '', database: 'postgres',
      ssl: false, options: '', connectionTimeoutMillis: 5000, application_name: 'sql-lot2'
    });
    client.on('error', () => {});
    await client.connect();
    return client;
  }
}

const recursiveNodes = `WITH RECURSIVE edges(source, target) AS (VALUES (1, 2), (2, 1)),
walk(id) AS (SELECT 1 UNION SELECT target FROM edges JOIN walk ON source = id)
SELECT id FROM walk ORDER BY id`;
const recursiveDepth = `WITH RECURSIVE edges(source, target) AS (VALUES (1, 2), (2, 1)),
walk(id, depth) AS (SELECT 1, 0 UNION SELECT target, depth + 1 FROM edges JOIN walk ON source = id WHERE depth < 4)
SELECT id, depth FROM walk ORDER BY depth`;

function lsnNumber(lsn) {
  const [high, low] = lsn.split('/');
  return (BigInt(`0x${high}`) << 32n) + BigInt(`0x${low}`);
}

test('Sondes PostgreSQL natives isolées', { timeout: 90000 }, async suite => {
  const postgres = new PrivatePostgres();
  try {
    postgres.initialize();
    postgres.start();
    const setup = await postgres.connect();
    const version = (await setup.query('SHOW server_version')).rows[0].server_version;
    const encoding = (await setup.query('SHOW server_encoding')).rows[0].server_encoding;
    assert.equal(encoding, 'UTF8');
    suite.diagnostic(`PostgreSQL ${version}, UTF8, cluster temporaire privé, socket Unix uniquement.`);
    await setup.end();

    await suite.test('F10 F11 F61 : contraintes, caractères et agrégats PostgreSQL', async diagnostic => {
      const client = await postgres.connect();
      try {
        await client.query('CREATE TABLE loose_price (price NUMERIC CHECK (price > 0))');
        await client.query('CREATE TABLE strict_price (price NUMERIC NOT NULL CHECK (price > 0))');
        await client.query('INSERT INTO loose_price VALUES (NULL)');
        await assert.rejects(client.query('INSERT INTO loose_price VALUES (-1)'), error => error.code === '23514');
        await assert.rejects(client.query('INSERT INTO strict_price VALUES (NULL)'), error => error.code === '23502');
        await assert.rejects(client.query('INSERT INTO strict_price VALUES (-1)'), error => error.code === '23514');
        await client.query('INSERT INTO strict_price VALUES (1)');
        await client.query("INSERT INTO strict_price VALUES ('NaN'), ('Infinity')");
        await client.query("CREATE TABLE finite_price (price NUMERIC NOT NULL CHECK (price > 0 AND price < 'Infinity'::numeric))");
        await assert.rejects(client.query("INSERT INTO finite_price VALUES ('NaN')"), error => error.code === '23514');
        await assert.rejects(client.query("INSERT INTO finite_price VALUES ('Infinity')"), error => error.code === '23514');
        await client.query('INSERT INTO finite_price VALUES (1)');
        await client.query('CREATE TABLE strings (value VARCHAR(2))');
        await client.query("INSERT INTO strings VALUES ('éa')");
        await assert.rejects(client.query("INSERT INTO strings VALUES ('éab')"), error => error.code === '22001');
        const string = (await client.query('SELECT value, length(value) AS chars, octet_length(value) AS bytes FROM strings')).rows[0];
        assert.deepEqual(string, { value: 'éa', chars: 2, bytes: 3 });
        const aggregate = (await client.query(`SELECT AVG(value)::float8 AS average, COUNT(value)::int AS nonnull,
          COUNT(*)::int AS total, array_agg(value ORDER BY id) AS collected
          FROM (VALUES (1, 10), (2, 20), (3, NULL)) AS notes(id, value)`)).rows[0];
        assert.deepEqual(aggregate, { average: 15, nonnull: 2, total: 3, collected: [10, 20, null] });
        diagnostic.diagnostic(`CHECK(NULL) accepté ; NaN et Infinity passent un simple CHECK (> 0), mais pas le contrôle PostgreSQL de finitude ; ${JSON.stringify(string)} ; ${JSON.stringify(aggregate)}.`);
      } finally {
        await client.end();
      }
    });

    await suite.test('F20 : UNION déduplique les lignes complètes, pas les seuls identifiants', async diagnostic => {
      const client = await postgres.connect();
      try {
        const nodes = (await client.query(recursiveNodes)).rows;
        const depths = (await client.query(recursiveDepth)).rows;
        assert.deepEqual(nodes, [{ id: 1 }, { id: 2 }]);
        assert.deepEqual(depths, [
          { id: 1, depth: 0 }, { id: 2, depth: 1 }, { id: 1, depth: 2 },
          { id: 2, depth: 3 }, { id: 1, depth: 4 }
        ]);
        await client.query('SET statement_timeout = 5000');
        const guarded = (await client.query(`WITH RECURSIVE edges(source, target) AS (VALUES (1, 2), (2, 1)),
          walk(id, path) AS (
            SELECT 1, ARRAY[1]
            UNION ALL
            SELECT edges.target, walk.path || edges.target FROM edges JOIN walk ON edges.source = walk.id
            WHERE NOT (edges.target = ANY(walk.path))
          ) SELECT id, path FROM walk ORDER BY id`)).rows;
        assert.deepEqual(guarded, [{ id: 1, path: [1] }, { id: 2, path: [1, 2] }]);
        await client.query('CREATE TEMP TABLE employes (id INT, nom TEXT, manager_id INT)');
        await client.query("INSERT INTO employes VALUES (1, 'Alice', NULL), (2, 'Benoît', 1), (3, 'Chloé', 2)");
        const lessonSql = sections(b3chapter4).match(/<pre><code>(WITH RECURSIVE hierarchie AS \([\s\S]*?SELECT \* FROM hierarchie ORDER BY niveau, id;)<\/code><\/pre>/i);
        assert.ok(lessonSql, 'Exemple récursif PostgreSQL du cours introuvable');
        const lessonRows = (await client.query(lessonSql[1])).rows.map(row => ({ id: row.id, level: row.niveau, path: row.chemin }));
        const expected = [
          { id: 1, level: 1, path: [1] }, { id: 2, level: 2, path: [1, 2] },
          { id: 3, level: 3, path: [1, 2, 3] }
        ];
        assert.deepEqual(lessonRows, expected);
        const exam = source('server/content/b3-sql/pages/examens-exercices.js');
        const anchor = exam.match(/<code>(SELECT id, nom, 1 AS level, ARRAY\[id\] AS path FROM employes WHERE manager_id IS NULL)<\/code>/i);
        const recursive = exam.match(/<code>(SELECT e\.id, e\.nom, cte\.level \+ 1, cte\.path \|\| e\.id FROM employes e JOIN cte ON e\.manager_id = cte\.id WHERE NOT \(e\.id = ANY\(cte\.path\)\))<\/code>/i);
        assert.ok(anchor && recursive, 'Exemple récursif PostgreSQL de l’examen introuvable');
        const examRows = (await client.query(`WITH RECURSIVE cte AS (${anchor[1]} UNION ALL ${recursive[1]}) SELECT id, level, path FROM cte ORDER BY id`)).rows;
        assert.deepEqual(examRows, expected);
        diagnostic.diagnostic(`Cycle fini sur id : ${JSON.stringify(nodes)} ; profondeur bornée : ${JSON.stringify(depths)} ; garde de chemin : ${JSON.stringify(guarded)} ; exemples extraits du cours et de l’examen : ${JSON.stringify(examRows)}.`);
      } finally {
        await client.end();
      }
    });

    await suite.test('F21 : BEFORE et AFTER s’exécutent avant une contrainte différée', async diagnostic => {
      const client = await postgres.connect();
      try {
        await client.query('CREATE TABLE trigger_parents (id INT PRIMARY KEY)');
        await client.query('CREATE TABLE trigger_children (id INT, parent_id INT REFERENCES trigger_parents(id) DEFERRABLE INITIALLY DEFERRED)');
        await client.query('CREATE TABLE trigger_audit (phase TEXT)');
        await client.query(`CREATE FUNCTION lot2_trigger_log() RETURNS trigger LANGUAGE plpgsql AS $$
          BEGIN INSERT INTO trigger_audit VALUES (TG_WHEN); RETURN NEW; END $$`);
        await client.query('CREATE TRIGGER lot2_before BEFORE INSERT ON trigger_children FOR EACH ROW EXECUTE FUNCTION lot2_trigger_log()');
        await client.query('CREATE TRIGGER lot2_after AFTER INSERT ON trigger_children FOR EACH ROW EXECUTE FUNCTION lot2_trigger_log()');
        await client.query('BEGIN');
        await client.query('INSERT INTO trigger_children VALUES (1, 99)');
        const phases = (await client.query('SELECT phase FROM trigger_audit ORDER BY phase')).rows.map(row => row.phase);
        assert.deepEqual(phases, ['AFTER', 'BEFORE']);
        await assert.rejects(client.query('COMMIT'), error => error.code === '23503');
        const after = (await client.query('SELECT COUNT(*)::int AS total FROM trigger_audit')).rows[0].total;
        assert.equal(after, 0);
        diagnostic.diagnostic(`Avant COMMIT : ${phases.join(', ')} ; COMMIT 23503 ; journal après échec : ${after}.`);
      } finally {
        await client.end();
      }
    });

    await suite.test('F49 : verrou de ligne, lecteur MVCC et verrou exclusif de table', async diagnostic => {
      const writer = await postgres.connect();
      const reader = await postgres.connect();
      try {
        await writer.query('CREATE TABLE lock_rows (id INT PRIMARY KEY, value INT)');
        await writer.query('INSERT INTO lock_rows VALUES (1, 10)');
        await writer.query('BEGIN');
        await writer.query('UPDATE lock_rows SET value = 20 WHERE id = 1');
        await reader.query("SET statement_timeout = '250ms'");
        const visible = (await reader.query('SELECT value FROM lock_rows WHERE id = 1')).rows[0].value;
        assert.equal(visible, 10);
        await assert.rejects(reader.query('UPDATE lock_rows SET value = 30 WHERE id = 1'), error => error.code === '57014');
        await writer.query('ROLLBACK');
        await writer.query('BEGIN');
        await writer.query('LOCK TABLE lock_rows IN ACCESS EXCLUSIVE MODE');
        await assert.rejects(reader.query('SELECT value FROM lock_rows'), error => error.code === '57014');
        await writer.query('ROLLBACK');
        await writer.query('CREATE INDEX lock_rows_value_idx ON lock_rows(value)');
        await writer.query('BEGIN');
        await writer.query('REINDEX INDEX lock_rows_value_idx');
        const locks = (await writer.query(`SELECT relation.relname, held.mode FROM pg_locks AS held
          JOIN pg_class AS relation ON relation.oid = held.relation
          WHERE held.pid = pg_backend_pid() AND relation.relname IN ('lock_rows', 'lock_rows_value_idx') AND held.granted`)).rows;
        assert.ok(locks.some(lock => lock.relname === 'lock_rows' && lock.mode === 'ShareLock'));
        assert.ok(locks.some(lock => lock.relname === 'lock_rows_value_idx' && lock.mode === 'AccessExclusiveLock'));
        await assert.rejects(reader.query('SELECT value FROM lock_rows'), error => error.code === '57014');
        await assert.rejects(reader.query('UPDATE lock_rows SET value = 30'), error => error.code === '57014');
        await writer.query('ROLLBACK');
        diagnostic.diagnostic(`UPDATE verrouille une ligne : SELECT voit ${visible}, UPDATE concurrent temporise ; REINDEX : ${JSON.stringify(locks)}, SELECT et UPDATE temporisent.`);
      } finally {
        await writer.end();
        await reader.end();
      }
    });

    await suite.test('F171 : index couvrant PostgreSQL, choix du plan et visibilité du tas', async diagnostic => {
      const client = await postgres.connect();
      try {
        await client.query('CREATE TABLE plan_rows (annee INT, montant INT)');
        await client.query('INSERT INTO plan_rows VALUES (2024, 10), (2025, 20), (2026, 30)');
        await client.query('CREATE INDEX plan_rows_annee_montant ON plan_rows(annee, montant)');
        await client.query('ANALYZE plan_rows');
        const regular = (await client.query('EXPLAIN (ANALYZE, FORMAT JSON) SELECT SUM(montant) FROM plan_rows WHERE annee = 2025')).rows[0]['QUERY PLAN'][0].Plan;
        assert.equal(regular.Plans[0]['Node Type'], 'Seq Scan');
        await client.query('SET enable_seqscan = off');
        const forced = (await client.query('EXPLAIN (ANALYZE, FORMAT JSON) SELECT SUM(montant) FROM plan_rows WHERE annee = 2025')).rows[0]['QUERY PLAN'][0].Plan;
        assert.equal(forced.Plans[0]['Node Type'], 'Index Only Scan');
        assert.ok(forced.Plans[0]['Heap Fetches'] > 0);
        diagnostic.diagnostic(`Index présent : plan naturel ${regular.Plans[0]['Node Type']} ; plan forcé ${forced.Plans[0]['Node Type']} avec Heap Fetches=${forced.Plans[0]['Heap Fetches']}.`);
      } finally {
        await client.end();
      }
    });

    await suite.test('F172 : transactions en cours et annulées dans les snapshots PostgreSQL', async diagnostic => {
      const writer = await postgres.connect();
      const reader = await postgres.connect();
      try {
        await writer.query('CREATE TABLE snapshot_rows (id INT PRIMARY KEY)');
        await writer.query('BEGIN');
        const pendingId = (await writer.query('SELECT pg_current_xact_id()::text AS xid')).rows[0].xid;
        await writer.query('INSERT INTO snapshot_rows VALUES (1)');
        await reader.query('SELECT pg_current_xact_id()');
        await reader.query('BEGIN ISOLATION LEVEL REPEATABLE READ');
        const snapshot = (await reader.query(`SELECT pg_current_snapshot()::text AS snapshot,
          pg_snapshot_xmax(pg_current_snapshot())::text AS xmax,
          pg_visible_in_snapshot($1::xid8, pg_current_snapshot()) AS visible,
          EXISTS (SELECT 1 FROM pg_snapshot_xip(pg_current_snapshot()) AS xid WHERE xid = $1::xid8) AS en_cours`, [pendingId])).rows[0];
        assert.ok(BigInt(pendingId) < BigInt(snapshot.xmax));
        assert.equal(snapshot.en_cours, true);
        assert.equal(snapshot.visible, false);
        assert.equal((await reader.query('SELECT COUNT(*)::int AS total FROM snapshot_rows')).rows[0].total, 0);
        await writer.query('COMMIT');
        assert.equal((await reader.query('SELECT COUNT(*)::int AS total FROM snapshot_rows')).rows[0].total, 0);
        await reader.query('COMMIT');
        assert.equal((await reader.query('SELECT COUNT(*)::int AS total FROM snapshot_rows')).rows[0].total, 1);
        await writer.query('BEGIN');
        const abortedId = (await writer.query('SELECT pg_current_xact_id()::text AS xid')).rows[0].xid;
        await writer.query('INSERT INTO snapshot_rows VALUES (2)');
        await writer.query('ROLLBACK');
        const aborted = (await reader.query(`SELECT pg_xact_status($1::xid8) AS statut,
          pg_visible_in_snapshot($1::xid8, pg_current_snapshot()) AS visible`, [abortedId])).rows[0];
        assert.deepEqual(aborted, { statut: 'aborted', visible: true });
        assert.equal((await reader.query('SELECT COUNT(*)::int AS total FROM snapshot_rows WHERE id = 2')).rows[0].total, 0);
        diagnostic.diagnostic(`xid ${pendingId} < xmax ${snapshot.xmax}, en cours et invisible ; après rollback : ${JSON.stringify(aborted)} mais ligne absente.`);
      } finally {
        await writer.end();
        await reader.end();
      }
    });

    await suite.test('F174 : synchronous_commit=off peut acquitter avant synchronisation', async diagnostic => {
      const client = await postgres.connect();
      try {
        assert.equal((await client.query('SHOW fsync')).rows[0].fsync, 'on');
        await client.query('CREATE TABLE async_commit_rows (id INT PRIMARY KEY)');
        await client.query('SET synchronous_commit = off');
        assert.equal((await client.query('SHOW synchronous_commit')).rows[0].synchronous_commit, 'off');
        let observed = false;
        let gap = 0;
        for (let index = 1; index <= 25 && !observed; index++) {
          await client.query('BEGIN');
          await client.query('INSERT INTO async_commit_rows VALUES ($1)', [index]);
          const marker = (await client.query('SELECT pg_current_wal_insert_lsn()::text AS lsn')).rows[0].lsn;
          await client.query('COMMIT');
          gap = Number((await client.query('SELECT pg_wal_lsn_diff($1::pg_lsn, pg_current_wal_flush_lsn()) AS gap', [marker])).rows[0].gap);
          observed = gap > 0;
        }
        diagnostic.diagnostic(`fsync=on, synchronous_commit=off ; WAL antérieur au COMMIT encore non synchronisé observé : ${observed}, écart=${gap} octets. L’absence d’écart ne prouverait pas une synchronisation garantie.`);
      } finally {
        await client.end();
      }
    });

    await suite.test('F173 : WAL non validé inclus dans la plage REDO après crash privé', async diagnostic => {
      const writer = await postgres.connect();
      const pending = await postgres.connect();
      try {
        await writer.query('CREATE TABLE crash_rows (label TEXT PRIMARY KEY)');
        await writer.query('CHECKPOINT');
        const start = (await writer.query('SELECT pg_current_wal_insert_lsn()::text AS lsn')).rows[0].lsn;
        await pending.query('BEGIN');
        const pendingId = (await pending.query('SELECT pg_current_xact_id()::text AS xid')).rows[0].xid;
        await pending.query("INSERT INTO crash_rows VALUES ('non_validee')");
        await writer.query("INSERT INTO crash_rows VALUES ('validee')");
        const end = (await writer.query('SELECT pg_current_wal_insert_lsn()::text AS lsn')).rows[0].lsn;
        await writer.end();
        postgres.stop('immediate');
        postgres.start();
        const observer = await postgres.connect();
        try {
          const rows = (await observer.query('SELECT label FROM crash_rows ORDER BY label')).rows;
          assert.deepEqual(rows, [{ label: 'validee' }]);
          const status = (await observer.query('SELECT pg_xact_status($1::xid8) AS statut', [pendingId])).rows[0].statut;
          assert.equal(status, 'aborted');
          const log = fs.readFileSync(postgres.log, 'utf8');
          const starts = [...log.matchAll(/redo starts at ([0-9A-F]+\/[0-9A-F]+)/gi)];
          const ends = [...log.matchAll(/redo done at ([0-9A-F]+\/[0-9A-F]+)/gi)];
          assert.ok(starts.length && ends.length, 'Plage REDO absente du journal PostgreSQL');
          const recoveryStart = starts.at(-1)[1];
          const recoveryEnd = ends.at(-1)[1];
          const dump = runCommand('pg_waldump', ['-p', path.join(postgres.data, 'pg_wal'), '-s', start, '-e', end, '-r', 'Heap'], postgres.environment);
          const entries = [...dump.matchAll(/tx:\s*(\d+),\s+lsn:\s*([0-9A-F]+\/[0-9A-F]+)/gi)];
          const record = entries.find(entry => entry[1] === pendingId);
          assert.ok(record, `Enregistrement Heap de la transaction ${pendingId} absent du WAL`);
          assert.ok(lsnNumber(record[2]) >= lsnNumber(recoveryStart));
          assert.ok(lsnNumber(record[2]) <= lsnNumber(recoveryEnd));
          diagnostic.diagnostic(`Transaction non validée ${pendingId}, Heap WAL ${record[2]} dans REDO ${recoveryStart}–${recoveryEnd} ; statut ${status}, ligne invisible ; ligne validée conservée.`);
        } finally {
          await observer.end();
        }
      } finally {
        await pending.end().catch(() => {});
      }
    });
  } finally {
    postgres.stop();
  }
});
