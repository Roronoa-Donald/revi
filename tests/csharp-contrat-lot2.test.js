'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { getExercise } = require('../server/exercises');

test('le contrat du prix C# précise la notation décimale', () => {
  const exercise = getExercise('csb2-c2-e2');
  assert.match(exercise.brief, /sans exposant ni séparateur de milliers/);
  assert.match(exercise.brief, /zéro initial est facultatif/);
  const page = fs.readFileSync(path.join(__dirname, '../csharp/chapitres/chapitre2.html'), 'utf8');
  assert.match(page, /sans exposant ni séparateur de milliers/);
});

test('le cumul C# est borné par l’environnement, pas par Int64', () => {
  const exercise = getExercise('csb2-c6-e1');
  assert.match(exercise.brief, /sans limite Int64, dans les limites de l.environnement d.exécution/);
  const page = fs.readFileSync(path.join(__dirname, '../csharp/chapitres/chapitre6.html'), 'utf8');
  assert.match(page, /sans limite Int64, dans les limites de l.environnement d.exécution/);
});
