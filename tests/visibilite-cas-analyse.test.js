'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { casVisibles, casNotesVisibles } = require('../corrections/outils/visibilite-cas-analyse');
const catalogue = require('../server/exercises');
const { MAX_TESTS } = require('../server/exercises/runner');

test('les cas notés visibles sont distingués des réponses et des exemples', () => {
  const starter = [
    '[Cas 1 — Données]',
    '# Données : 2, 3',
    'A_COMPLETER',
    '[Cas 2 — Sans données]',
    'A_COMPLETER',
    '[Exemple]',
    '# Données : 5, 8',
    '[Cas 3 — Modèle]',
    '# Modèle : MAX Z = x1 + x2',
    'A_COMPLETER'
  ].join('\n');
  const exercise = { language: 'analyse', starter, tests: [
    { stdin: 'cas:1' }, { stdin: 'cas:2' }, { stdin: 'cas : 3' }, { stdin: 'cas:4' }
  ] };
  assert.deepEqual([...casVisibles(starter)], [1, 3]);
  assert.deepEqual(casNotesVisibles(exercise, 4), [1, 3]);
  assert.deepEqual(casNotesVisibles(exercise, 2), [1]);
  assert.deepEqual(casNotesVisibles({ ...exercise, language: 'python' }, 4), []);
});

test('les scénarios notés des grilles représentatives sont réellement visibles', () => {
  for (const id of ['ro2-c1-e1', 'al-c1-e1']) {
    const exercise = catalogue.getExercise(id);
    assert.ok(exercise, id);
    assert.ok(casNotesVisibles(exercise, MAX_TESTS).length >= 2, id);
  }
});
