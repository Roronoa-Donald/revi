'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const parse5 = require('parse5');
const { getExercise } = require('../server/exercises');

test('journald B3 précise la ligne d’entrée et conserve un HTML équilibré', () => {
  const brief = getExercise('lx3-c2-e3').brief;
  assert.match(brief, /JOURNAL id=&lt;id&gt; priority=&lt;0\.\.7&gt; unit=&lt;service&gt; msg=&lt;message&gt;/);
  const errors = [];
  parse5.parseFragment(brief, { onParseError: error => errors.push(error.code) });
  assert.deepEqual(errors, []);
  assert.equal((brief.match(/<code>/g) || []).length, (brief.match(/<\/code>/g) || []).length);
});

test('les exemples et tests C# placent new() après les autres contraintes', () => {
  const exercise = getExercise('csb2-c4-e3');
  for (const sample of [...exercise.examples, ...exercise.tests]) {
    const declaration = sample.stdin.split('\n')[0];
    const constraints = declaration.split(':')[1].split(',').map(value => value.trim());
    const position = constraints.indexOf('new()');
    if (position !== -1) assert.equal(position, constraints.length - 1, declaration);
  }
});
