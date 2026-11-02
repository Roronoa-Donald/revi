'use strict';

const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const test = require('node:test');
const { getExercise } = require('../server/exercises');
const { runTests } = require('../server/exercises/runner');
const execution = require('../server/services/execution');

async function submit(exercise, answer) {
  const report = await runTests(exercise, answer, {
    execute: payload => execution.execute(payload)
  });
  assert.equal(report.ok, true);
  return report;
}

async function compare(actual, expected) {
  const exercise = {
    language: 'analyse',
    tests: [{ stdin: 'cas:1', expected, comparator: 'fraction_reduite' }]
  };
  return (await submit(exercise, `[Cas 1]\n${actual}`)).passed === 1;
}

test('les variantes décimale et non réduite ne satisfont pas la consigne de fraction réduite', async () => {
  const exercise = getExercise('pb2-c1-e1');
  const expected = exercise.solution;
  assert.equal((await submit(exercise, expected)).passed, exercise.tests.length);
  for (const replacement of ['2/8', '0.25', '8/2']) {
    const answer = expected.replace('[Cas 1 — Deux sur huit]\n1/4', `[Cas 1 — Deux sur huit]\n${replacement}`);
    assert.notEqual(answer, expected);
    const report = await submit(exercise, answer);
    assert.equal(report.stop?.reason, 'wrong_output', replacement);
    assert.equal(report.stop?.testIndex, 0, replacement);
  }
});

test('la fraction réduite respecte la syntaxe, les signes et les grands entiers', async () => {
  for (const [actual, expected, valid] of [
    ['  +01 / 004 ', '1/4', true],
    ['2/8', '1/4', false],
    ['0.25', '1/4', false],
    ['1/4 texte', '1/4', false],
    ['1/0', '1/4', false],
    ['-1/-4', '1/4', false],
    ['0/1', '0/1', true],
    ['0/9', '0/1', false],
    ['1/1', '1/1', true],
    ['1\n/\n4', '1/4', false],
    ['9007199254740993/1', '9007199254740993/1', true],
    ['9007199254740993/1', '9007199254740992/1', false],
    ['1'.repeat(300) + '/1', '1/1', false]
  ]) {
    assert.equal(await compare(actual, expected), valid, `${actual} / ${expected}`);
  }
});

test('les bornes zéro et un figurent sans remplacer les cas initiaux', () => {
  const exercise = getExercise('pb2-c1-e1');
  assert.ok(exercise.tests.some(entry => entry.stdin === 'cas:1' && entry.expected === '1/4'));
  assert.ok(exercise.tests.some(entry => entry.stdin === 'cas:2' && entry.expected === '7/10'));
  assert.ok(exercise.tests.some(entry => entry.stdin === 'cas:3' && entry.expected === '1/2'));
  assert.ok(exercise.tests.some(entry => entry.stdin === 'cas:4' && entry.expected === '0/1'));
  assert.ok(exercise.tests.some(entry => entry.stdin === 'cas:5' && entry.expected === '1/1'));
  assert.ok(exercise.tests.every(entry => entry.comparator === 'fraction_reduite'));
});

test('les indices définissent le PGCD et conservent le vouvoiement', () => {
  const fraction = getExercise('pb2-c1-e1');
  const union = getExercise('pb2-c1-e2');
  assert.match(fraction.hints.join(' '), /plus grand diviseur commun \(PGCD\)/);
  assert.match(union.hints[0], /Additionnez/);
  assert.match(union.hints[0], /retranchez/);
});

test('contre-vérification des fractions par fractions.Fraction de Python', async context => {
  const values = [];
  for (let numerator = 0; numerator <= 12; numerator++) {
    for (let denominator = 1; denominator <= 12; denominator++) {
      values.push({ numerator, denominator });
    }
  }
  const program = [
    'import json, sys',
    'from fractions import Fraction',
    'values = json.load(sys.stdin)',
    'result = []',
    'for item in values:',
    '    fraction = Fraction(item["numerator"], item["denominator"])',
    '    expected = str(fraction.numerator) + "/" + str(fraction.denominator)',
    '    reduced = fraction.numerator == item["numerator"] and fraction.denominator == item["denominator"]',
    '    result.append({"expected": expected, "reduced": reduced})',
    'print(json.dumps(result))'
  ].join('\n');
  const result = spawnSync(process.env.PYTHON_BIN || 'python3', ['-c', program], {
    input: JSON.stringify(values), encoding: 'utf8', timeout: 10000
  });
  if (result.error?.code === 'ENOENT') return context.skip('Python indisponible pour la contre-vérification indépendante');
  assert.equal(result.status, 0, result.stderr);
  const independent = JSON.parse(result.stdout);
  assert.equal(independent.length, values.length);
  for (const [index, value] of values.entries()) {
    const actual = `${value.numerator}/${value.denominator}`;
    assert.equal(await compare(actual, independent[index].expected), independent[index].reduced, actual);
  }
  context.diagnostic(`${values.length} fractions comparées à fractions.Fraction.`);
});
