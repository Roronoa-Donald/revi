'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const parse5 = require('parse5');
const catalogue = require('../server/exercises');
const { runTests } = require('../server/exercises/runner');
const { runAnalyse } = require('../server/services/execution/local-runner');

const text = node => node.nodeName === '#text' ? node.value : (node.childNodes || []).map(text).join(' ');
const normalize = value => value.replace(/\s+/gu, ' ').trim();
const cases = exercise => [...exercise.starter.matchAll(/\[Cas (\d+)[^\]]*\]([\s\S]*?)(?=\n\[Cas |$)/gu)]
  .map(match => ({ number: Number(match[1]), data: [...match[2].matchAll(/^# Données : (.*)$/gmu)].map(item => item[1]) }));
const execute = async ({ code, stdin }) => {
  const result = await runAnalyse(code, stdin);
  return { ok: result.ok, stdout: result.data.stdout };
};

test('les six alertes ciblées ne révèlent plus leurs attendus littéraux dans les champs publics', () => {
  const ids = ['erp2-c1-e2', 'ib2-c1-e3', 'az3-c1-e1', 'cr3-c1-e1', 'cr3-c1-e2', 'cr3-c1-e3'];
  for (const id of ids) {
    const exercise = catalogue.getExercise(id);
    const visible = catalogue.toClient(exercise);
    assert.equal(visible.language, 'analyse');
    assert.equal(Object.hasOwn(visible, 'tests'), false);
    assert.equal(Object.hasOwn(visible, 'solution'), false);
    assert.ok(visible.examples.every(example => Object.keys(example).every(key => key === 'stdin')));
    const fields = [text(parse5.parseFragment(visible.brief)), visible.starter, ...visible.hints];
    for (const expected of [...exercise.examples, ...exercise.tests].map(item => normalize(item.expected))) {
      for (const field of fields) assert.equal(normalize(field).includes(expected), false, id);
    }
  }
});

test('le TCO ERP est calculable à partir des six données de chaque cas', async () => {
  const exercise = catalogue.getExercise('erp2-c1-e3');
  const inputs = cases(exercise);
  assert.equal(inputs.length, exercise.tests.length);
  for (const item of inputs) {
    assert.equal(item.data.length, 6);
    const amounts = item.data.map(Number);
    assert.ok(amounts.every(Number.isFinite));
    const initial = amounts[0] + amounts[1] + amounts[2];
    const recurring = 5 * (amounts[3] + amounts[4] + amounts[5]);
    const expected = `Investissement initial: ${initial} EUR\nCout recurrent 5 ans: ${recurring} EUR\nTCO 5 ans: ${initial + recurring} EUR`;
    const scenario = exercise.tests.find(candidate => candidate.stdin === `cas:${item.number}`);
    assert.equal(scenario.expected, expected);
    const selected = { ...exercise, tests: [scenario] };
    assert.equal((await runTests(selected, exercise.solution, { execute })).passed, 1);
    const wrong = `[Cas ${item.number}]\n${expected.replace(`initial: ${initial}`, `initial: ${initial - 1}`)}`;
    assert.equal((await runTests(selected, wrong, { execute })).passed, 0);
  }
});

test('les calculs de la grille robotique suivent la division euclidienne annoncée', () => {
  const exercise = catalogue.getExercise('rb-c1-e2');
  for (const item of cases(exercise)) {
    const [left, right] = item.data[0].split(' ').map(Number);
    const lines = [`somme : ${left + right}`, `difference : ${left - right}`, `produit : ${left * right}`];
    if (right === 0) lines.push('division impossible');
    else {
      const quotient = Math.floor(left / right);
      lines.push(`quotient : ${quotient}`, `reste : ${left - quotient * right}`);
    }
    assert.equal(exercise.tests.find(candidate => candidate.stdin === `cas:${item.number}`).expected, lines.join('\n'));
  }
});

test('les grilles CIA distinguent somme fictive et décompte de composantes', () => {
  const risk = catalogue.getExercise('cy-c1-e1');
  for (const item of cases(risk)) {
    const count = Number(item.data[0]);
    assert.equal(item.data.length - 1, count);
    const expected = item.data.slice(1).map((line, index) => {
      const sum = line.split(' ').map(Number).reduce((total, number) => total + number, 0);
      return `actif ${index + 1} : ${sum <= 3 ? 'Faible' : sum <= 5 ? 'Moyenne' : 'Critique'}`;
    }).join('\n');
    assert.equal(risk.tests.find(candidate => candidate.stdin === `cas:${item.number}`).expected, expected);
  }
  const inventory = catalogue.getExercise('cy-c1-e2');
  for (const item of cases(inventory)) {
    const count = Number(item.data[0]);
    const incidents = item.data.slice(1).map(line => line.split(' '));
    assert.equal(incidents.length, count);
    const lines = incidents.map(([category, threat]) => `${category} : ${threat}`);
    lines.push(`bilan : composantes=${new Set(incidents.map(([category]) => category)).size} incidents=${count}`);
    assert.equal(inventory.tests.find(candidate => candidate.stdin === `cas:${item.number}`).expected, lines.join('\n'));
  }
  assert.match(inventory.brief, /ne démontre pas/);
});

test('les exemples de cryptographie et le nouveau cas affine ne réutilisent pas les réponses des cas', () => {
  const affine = catalogue.getExercise('cr3-c1-e1');
  assert.equal(affine.examples[0].stdin, 'CAESAR ENC k=3 text=BONJOUR');
  const caesar = [...'BONJOUR'].map(letter => String.fromCharCode(65 + (letter.charCodeAt(0) - 65 + 3) % 26)).join('');
  assert.equal(affine.examples[0].expected, `OUT: ${caesar}`);
  const cipher = cases(affine)[2].data[0].match(/text=(.*)$/u)[1];
  const inverse = Array.from({ length: 26 }, (_, index) => index).find(value => (5 * value) % 26 === 1);
  const plain = [...cipher].map(letter => String.fromCharCode(65 + ((inverse * (letter.charCodeAt(0) - 65 - 8)) % 26 + 26) % 26)).join('');
  assert.equal(affine.tests[2].expected, `OUT: ${plain}`);
  assert.ok(!affine.starter.includes('text=UCSPCZ'));
  const vigenere = catalogue.getExercise('cr3-c1-e2');
  assert.ok(vigenere.examples[0].stdin.includes('key=LUNE'));
  assert.match(vigenere.examples[0].note, /LUNE/);
  assert.ok(!vigenere.examples[0].stdin.includes('MESSAGE CONFIDENTIEL'));
});

test('les indices repris concernent bien 24 grilles formatives', () => {
  const ids = ['al-c1-e2', 'rb-c1-e2', 'cy-c1-e1', 'cy-c1-e2', 'cy-c1-e3', 'mr-c1-e3',
    'dr-c1-e1', 'dr-c1-e3', 'en-c1-e1', 'en-c1-e2', 'fr-c1-e1', 'fr-c1-e2',
    'bu-c1-e1', 'cc-c1-e1', 'ar-c1-e1', 'aw-c1-e1', 'aw-c1-e2', 'aw-c1-e3',
    'vt-c1-e1', 'pr-c1-e1', 'pr-c1-e2', 'pr-c1-e3', 'dr2-c1-e1', 'dr2-c1-e2'];
  for (const id of ids) {
    const exercise = catalogue.getExercise(id);
    assert.equal(exercise.language, 'analyse', id);
    assert.ok(exercise.hints.length >= 2, id);
    assert.ok(exercise.hints.slice(0, 2).every(hint => hint.trim().length > 0), id);
  }
});
