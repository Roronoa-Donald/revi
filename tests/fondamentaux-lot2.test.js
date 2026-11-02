'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const path = require('node:path');
const php = require('../server/content/php/chapitre3');
const merise = require('../server/content/b1-merise/chapitres-4-6').find(chapter => chapter.n === 5);
const meriseExercises = require('../server/exercises/b1-merise');
const algorithm = require('../server/content/b3-algo/chapitre6');

test('F44 : interface et propriétés sont situées depuis PHP 8.4', () => {
  const lesson = php.sections.find(section => /polymorphisme et interfaces/i.test(section.title)).html;
  const question = php.questions.find(item => /interface.*propriét/i.test(item.stem));
  assert.match(lesson, /8\.4[\s\S]*propriét/i);
  assert.ok(question);
  assert.match(question.opts[question.correct], /(?:get|lecture)/i);
  assert.match(question.exp, /8\.4/);
  const interpreter = path.join(__dirname, '../tools/php-cli/php');
  const execution = spawnSync(interpreter, ['-r', 'interface Contrat { public string $identifiant { get; } } class Client implements Contrat { public string $identifiant = "ok"; } echo PHP_VERSION_ID >= 80400 ? (new Client())->identifiant : "ancien";'], { encoding: 'utf8' });
  assert.equal(execution.status, 0, execution.stderr);
  assert.equal(execution.stdout, 'ok');
});

test('F45 : une clé étrangère peut cibler une clé unique et être composée', () => {
  const lesson = merise.sections.find(section => /Tables, clés et règles/i.test(section.title)).html;
  const question = merise.questions.find(item => /Une clé étrangère est/i.test(item.q));
  assert.match(lesson, /clé étrangère[\s\S]{0,300}unique/i);
  assert.match(lesson, /composé/i);
  assert.match(question.opts[question.correct], /unique/i);
  assert.doesNotMatch(question.opts[question.correct], /primaire.*autre table/i);
  const script = `import sqlite3
connection = sqlite3.connect(':memory:')
connection.execute('PRAGMA foreign_keys=ON')
connection.executescript('CREATE TABLE parent(id INTEGER PRIMARY KEY, code TEXT UNIQUE, zone TEXT, version INTEGER, UNIQUE(zone, version)); CREATE TABLE enfant(code TEXT REFERENCES parent(code), zone TEXT, version INTEGER, FOREIGN KEY(zone, version) REFERENCES parent(zone, version)); INSERT INTO parent VALUES (1,"alpha","nord",2); INSERT INTO enfant VALUES ("alpha","nord",2); INSERT INTO enfant VALUES ("alpha","nord",2);')
try:
    connection.execute('INSERT INTO enfant VALUES ("inconnu","nord",2)')
except sqlite3.IntegrityError:
    print('unique-composite-duplicates-ok; invalid-rejected')
else:
    raise AssertionError('foreign key constraint not enforced')`;
  const execution = spawnSync('python3', ['-c', script], { encoding: 'utf8' });
  assert.equal(execution.status, 0, execution.stderr);
  assert.match(execution.stdout, /unique-composite-duplicates-ok; invalid-rejected/);
});

test('F46 : la complexité concerne la programmation dynamique tabulaire', () => {
  const question = algorithm.questions.find(item => /complexité temporelle/i.test(item.stem) && /sac à dos/i.test(item.stem));
  assert.ok(question);
  assert.match(question.stem, /tabulaire/i);
  assert.match(question.stem, /entier/i);
  assert.match(question.opts[question.correct], /n\s*\*\s*W/i);
  assert.match(question.exp, /pseudo.polynomial/i);
  const objects = [[1, 3], [3, 5], [4, 7], [5, 9]];
  const capacity = 7;
  let previous = Array(capacity + 1).fill(0);
  let operations = 0;
  for (const [weight, value] of objects) {
    const current = previous.slice();
    for (let room = 1; room <= capacity; room += 1) {
      if (weight <= room) current[room] = Math.max(previous[room], previous[room - weight] + value);
      operations += 1;
    }
    previous = current;
  }
  const candidates = Array.from({ length: 2 ** objects.length }, (_, mask) => objects.reduce((result, [weight, value], index) => {
    if ((mask & (1 << index)) !== 0) return { weight: result.weight + weight, value: result.value + value };
    return result;
  }, { weight: 0, value: 0 }));
  assert.equal(previous[capacity], Math.max(...candidates.filter(item => item.weight <= capacity).map(item => item.value)));
  assert.equal(operations, objects.length * capacity);
});

test('F158 : une association plusieurs-à-plusieurs sans attribut demande une table', () => {
  const item = meriseExercises.find(exercise => exercise.id === 'mr-c5-e1');
  assert.match(item.brief, /cardinalit/i);
  assert.match(item.brief, /sans attribut/i);
  assert.match(item.starter, /SUIVRE assoc n n non/);
  assert.ok(item.tests.some(entry => /SUIVRE : TABLE_LIAISON/i.test(entry.expected)));
  assert.ok(item.tests.some(entry => /CLE_MIGREE/i.test(entry.expected)));
  assert.doesNotMatch(item.brief, /sans données portées[^.]*n.en devient pas/i);
});

test('F159 : les éléments ne sont pas préclassés et la justification est demandée', () => {
  const item = meriseExercises.find(exercise => exercise.id === 'mr-c1-e1');
  assert.match(item.brief, /justifi/i);
  assert.match(item.brief, /(?:à part|séparément|non évaluée)/i);
  assert.match(item.starter, /# Données : 12000/);
  assert.doesNotMatch(item.starter, /# Données : [di] /);
  assert.ok(item.tests.some(entry => /12000 : donnee/i.test(entry.expected)));
});

test('F158 : chaque maximum conduit au résultat attendu, indépendamment des attributs', () => {
  const item = meriseExercises.find(exercise => exercise.id === 'mr-c5-e1');
  const blocks = item.starter.split(/(?=^\[Cas \d+ — )/m).slice(1);
  assert.equal(blocks.length, item.tests.length);
  for (const [index, block] of blocks.entries()) {
    const input = block.split('\n').filter(line => line.startsWith('# Données : '))
      .map(line => line.slice('# Données : '.length));
    const expected = input.map(line => {
      const [name, nature, firstMaximum, secondMaximum] = line.split(' ');
      if (nature === 'entite') return `${name} : TABLE`;
      const category = firstMaximum === 'n' && secondMaximum === 'n' ? 'TABLE_LIAISON'
        : firstMaximum === '1' && secondMaximum === '1' ? 'CHOIX_1_1' : 'CLE_MIGREE';
      return `${name} : ${category}`;
    }).join('\n');
    assert.equal(item.tests[index].expected, expected);
    assert.ok(item.solution.includes(expected));
  }
});

test('F158 : une liaison n–n sans attribut représente plusieurs couples valides', () => {
  const script = `import sqlite3
connection = sqlite3.connect(':memory:')
connection.execute('PRAGMA foreign_keys=ON')
connection.executescript('CREATE TABLE etudiant(id INTEGER PRIMARY KEY); CREATE TABLE cours(id INTEGER PRIMARY KEY); CREATE TABLE suivre(etudiant INTEGER REFERENCES etudiant(id), cours INTEGER REFERENCES cours(id), PRIMARY KEY(etudiant,cours)); INSERT INTO etudiant VALUES(1),(2); INSERT INTO cours VALUES(10),(20); INSERT INTO suivre VALUES(1,10),(1,20),(2,10);')
assert connection.execute('SELECT COUNT(*) FROM suivre').fetchone()[0] == 3
try:
    connection.execute('INSERT INTO suivre VALUES (1,10)')
except sqlite3.IntegrityError:
    print('three-pairs; duplicate-rejected')
else:
    raise AssertionError('duplicate pair accepted')`;
  const execution = spawnSync('python3', ['-c', script], { encoding: 'utf8' });
  assert.equal(execution.status, 0, execution.stderr);
  assert.match(execution.stdout, /three-pairs; duplicate-rejected/);
});

test('F158/F159 : les projections ne renvoient ni les tests ni les corrigés', () => {
  const { getExercise, toClient } = require('../server/exercises');
  for (const id of ['mr-c1-e1', 'mr-c5-e1']) {
    const item = getExercise(id);
    const publicItem = toClient(item);
    assert.equal('tests' in publicItem, false);
    assert.equal('solution' in publicItem, false);
    for (const entry of item.tests) assert.doesNotMatch(JSON.stringify(publicItem), new RegExp(entry.expected.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
});

test('F158/F159 : le moteur accepte les résolutions et refuse deux variantes incorrectes', async () => {
  const { runTests } = require('../server/exercises/runner');
  const { execute } = require('../server/services/execution');
  for (const id of ['mr-c1-e1', 'mr-c5-e1']) {
    const item = meriseExercises.find(exercise => exercise.id === id);
    const accepted = await runTests(item, item.solution, { execute });
    assert.equal(accepted.passed, item.tests.length, id);
    for (const index of [0, 1]) {
      const variant = item.tests.map((entry, caseIndex) => `[Cas ${caseIndex + 1}]\n${caseIndex === index ? 'REPONSE_INCORRECTE' : entry.expected}`).join('\n\n');
      const rejected = await runTests(item, variant, { execute });
      assert.equal(rejected.stop.reason, 'wrong_output', id);
      assert.equal(rejected.stop.testIndex, index, id);
    }
  }
});
