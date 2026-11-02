'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const { getExercise } = require('../server/exercises');

test('les premiers indices repris posent une question et ne livrent pas la distinction LAN/WAN', () => {
  const ids = [
    'py-c1-e1', 'py-c1-e2', 'py-c1-e3',
    'c-c1-e1', 'c-c1-e2', 'c-c1-e3',
    'php-c1-e1', 'php-c1-e2', 'php-c1-e3',
    'web-c1-e1', 'web-c1-e2', 'web-c1-e3',
    'sq-c1-e2', 're-c1-e1', 're-c1-e2', 're-c1-e3', 'pb2-c1-e1'
  ];
  for (const id of ids) assert.match(getExercise(id).hints[0], /\?/, id);
  assert.doesNotMatch(getExercise('re-c1-e1').hints[0], /local donne|etendu donne|\bLAN\b|\bWAN\b/i);
});
