'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const chapter = require('../server/content/infographie/chapitre4');
const exercises = require('../server/exercises/infographie');

test('F50 : le QCM distingue faces triangulées, points et lignes', () => {
  const question = chapter.questions.find(item => /triangles/.test(item.stem));
  assert.doesNotMatch(question.stem, /exclusivement/i);
  assert.match(question.opts[question.correct], /non alignés/i);
  assert.match(question.exp, /points et.*lignes/i);
  assert.match(question.exp, /alignés/i);
});

test('F50 : une normale unitaire suppose trois sommets non alignés', () => {
  const lesson = chapter.sections[0].html;
  assert.match(lesson, /non alignés/i);
  assert.match(lesson, /nulle[^.]*normale/i);
  assert.match(exercises.find(item => item.id === 'ig2-c4-e1').brief, /non alignés/i);
  const cross = (first, second) => [first[1] * second[2] - first[2] * second[1], first[2] * second[0] - first[0] * second[2], first[0] * second[1] - first[1] * second[0]];
  assert.deepEqual(cross([1, 1, 1], [2, 2, 2]), [0, 0, 0]);
  assert.deepEqual(cross([1, 0, 0], [0, 1, 0]), [0, 0, 1]);
});
