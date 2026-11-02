'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const { getExercise } = require('../server/exercises');

function casesOf(exercise) {
  const cases = new Map();
  let current;
  for (const line of exercise.starter.split('\n')) {
    const header = /^\[Cas (\d+) — (.+)\]$/.exec(line);
    if (header) {
      current = { number: Number(header[1]), label: header[2], input: [] };
      assert.equal(cases.has(current.number), false);
      cases.set(current.number, current);
    } else if (current && line.startsWith('# Données : ')) {
      current.input.push(line.slice('# Données : '.length));
    }
  }
  return cases;
}

function assertGridMatches(exercise, solve) {
  const cases = casesOf(exercise);
  for (const example of exercise.examples) {
    assert.equal(solve(example.stdin), example.expected, `${exercise.id}, exemple`);
  }
  for (const entry of exercise.tests) {
    const selector = /^cas:(\d+)$/.exec(entry.stdin);
    assert.ok(selector);
    const selected = cases.get(Number(selector[1]));
    assert.ok(selected);
    assert.equal(entry.label, selected.label);
    const expected = solve(selected.input.join('\n'));
    assert.equal(entry.expected, expected, `${exercise.id}, ${entry.stdin}`);
    assert.ok(exercise.solution.includes(`[Cas ${selected.number} — ${selected.label}]\n${expected}\n`));
  }
  return cases;
}

test('Un système 2 × 2 présente deux lignes et ses solutions vérifient les coefficients', () => {
  const exercise = getExercise('al-c3-e3');
  assert.match(exercise.brief, /deux lignes/);
  assertGridMatches(exercise, input => {
    const rows = input.split('\n').map(line => line.trim().split(/\s+/).map(Number));
    assert.equal(rows.length, 2);
    assert.ok(rows.every(row => row.length === 3 && row.every(Number.isFinite)));
    const [[firstX, firstY, firstResult], [secondX, secondY, secondResult]] = rows;
    const determinant = firstX * secondY - firstY * secondX;
    assert.notEqual(determinant, 0);
    const x = (firstResult * secondY - firstY * secondResult) / determinant;
    const y = (firstX * secondResult - firstResult * secondX) / determinant;
    return `${x.toFixed(2)}\n${y.toFixed(2)}`;
  });
});

test('Les fréquences et le nombre de modalités correspondent aux données', () => {
  const exercise = getExercise('st-c2-e2');
  const cases = assertGridMatches(exercise, input => {
    const [count, ...values] = input.split('\n').map(Number);
    assert.equal(values.length, count);
    const frequencies = new Map();
    for (const value of values) frequencies.set(value, (frequencies.get(value) || 0) + 1);
    return [...frequencies].sort(([left], [right]) => left - right)
      .map(([value, frequency]) => `${value} ${(100 * frequency / count).toFixed(2)}`).join('\n');
  });
  assert.match(cases.get(1).label, /trois modalités/);
  assert.equal(new Set(cases.get(1).input.slice(1).map(Number)).size, 3);
});

test('Les classes ont même largeur et la dernière comprend la borne maximale', () => {
  const exercise = getExercise('st-c5-e2');
  assert.match(exercise.brief, /même largeur/);
  assert.match(exercise.brief, /dernière classe inclut/);
  const cases = assertGridMatches(exercise, input => {
    const [limits, countLine, ...valueLines] = input.split('\n');
    const [min, max, classCount] = limits.split(/\s+/).map(Number);
    const count = Number(countLine);
    const values = valueLines.map(Number);
    assert.ok(min < max && Number.isInteger(classCount) && classCount > 0);
    assert.equal(values.length, count);
    const classes = Array(classCount).fill(0);
    for (const value of values) {
      assert.ok(value >= min && value <= max);
      const index = Math.min(Math.floor((value - min) * classCount / (max - min)), classCount - 1);
      classes[index]++;
    }
    return classes.join(' ');
  });
  assert.match(cases.get(2).label, /effectifs inégaux/);
  const third = cases.get(3).input;
  const max = Number(third[0].split(/\s+/)[1]);
  assert.ok(third.slice(2).map(Number).includes(max));
});
