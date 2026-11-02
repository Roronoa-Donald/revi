'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { getExercise } = require('../server/exercises');

test('le contrat C# précise l’arrondi des demi-centimes', () => {
  const exercise = getExercise('csb2-c2-e2');
  const rule = /au centime le plus proche ; en cas d.égalité, en s.éloignant de zéro/;
  assert.match(exercise.brief, rule);
  const page = fs.readFileSync(path.join(__dirname, '../csharp/chapitres/chapitre2.html'), 'utf8');
  assert.match(page, rule);
});

test('le banc C# couvre la troncature et les demi-centimes signés', () => {
  const exercise = getExercise('csb2-c2-e2');
  const rounding = exercise.tests.slice(0, 7).find(item => item.stdin.includes('0.126') && item.stdin.includes('-0.125'));
  assert.ok(rounding, 'Aucun test actif ne couvre les deux entrées');
  assert.match(rounding.stdin, /[^-]0\.125/);
  assert.match(rounding.expected, /Prix=0\.13/);
  assert.match(rounding.expected, /Prix=-0\.13/);
});

test('le banc C# couvre la borne maximale de decimal', () => {
  const exercise = getExercise('csb2-c2-e2');
  const maximum = '79228162514264337593543950335';
  const boundary = exercise.tests.slice(0, 7).find(item => item.stdin.includes(maximum));
  assert.ok(boundary, 'Aucun test actif ne couvre decimal.MaxValue');
  assert.match(boundary.expected, new RegExp(`Prix=${maximum}\\.00`));
});
