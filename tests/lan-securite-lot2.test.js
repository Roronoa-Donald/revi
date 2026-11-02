'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const chapter = require('../server/content/b3-reseau-lan/chapitre5');
const registry = require('../server/exercises/b3-reseau-lan');
const chapterExercises = require('../server/exercises/b3-reseau-lan/chapitre5');

test('F182 : les deux sources de la grille distinguent le scénario du rétablissement réel', () => {
  for (const catalogue of [registry, chapterExercises]) {
    const exercise = catalogue.find(item => item.id === 'lan3-c5-e1');
    assert.ok(exercise);
    assert.doesNotMatch(exercise.brief, /irrécupérable/i);
    assert.match(exercise.brief, /scénario[^.]*sans[^.]*rétablissement/i);
    assert.match(exercise.brief, /diagnostic[^.]*shutdown[^.]*no shutdown/i);
    assert.match(exercise.brief, /récupération automatique/i);
    assert.match(exercise.hints.join(' '), /mode shutdown/i);
  }
  assert.doesNotMatch(fs.readFileSync('b3-reseau-lan/chapitres/chapitre5.html', 'utf8'), /état d'erreur irrécupérable/i);
});

test('La conservation des adresses sticky est conditionnée à la sauvegarde de configuration', () => {
  const body = chapter.sections.map(section => section.html).join(' ');
  assert.match(body, /running-config/i);
  assert.match(body, /sauvegard[^.]*startup-config/i);
  assert.doesNotMatch(body, /running-config[^.]*pour persister après redémarrage/i);
});
