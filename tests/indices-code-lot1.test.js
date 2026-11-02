'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const parse5 = require('parse5');
const { getExercise } = require('../server/exercises');
const courseConfig = require('../server/exercises/course-config');

const exerciseIds = require('../corrections/fixtures/indices-code-lot1.json');

function walk(node, visit, insideCode = false) {
  const code = insideCode || node.tagName === 'code' || node.tagName === 'pre';
  visit(node, code);
  for (const child of node.childNodes || []) walk(child, visit, code);
}

function attribute(node, name) {
  return node.attrs?.find(item => item.name === name)?.value;
}

function textOf(node) {
  if (node.nodeName === '#text') return node.value;
  return (node.childNodes || []).map(textOf).join('');
}

test('Les indices de code conservent leur texte et leurs dollars restent hors du rendu mathématique', () => {
  const documents = new Map();
  let checked = 0;
  for (const id of exerciseIds) {
    const exercise = getExercise(id);
    assert.ok(exercise, id);
    const config = courseConfig[exercise.course];
    const file = path.join(__dirname, '..', config.dir, config.chapterDir, `chapitre${exercise.chapter}.html`);
    if (!documents.has(file)) documents.set(file, parse5.parse(fs.readFileSync(file, 'utf8')));
    let lab;
    walk(documents.get(file), node => { if (attribute(node, 'id') === id) lab = node; });
    assert.ok(lab, id);
    let hints;
    walk(lab, node => {
      if ((attribute(node, 'class') || '').split(/\s+/).includes('lab__hints')) hints = node;
    });
    assert.ok(hints, id);
    const items = [];
    walk(hints, node => { if (node.tagName === 'li') items.push(node); });
    assert.equal(items.length, exercise.hints.length, id);
    for (const [index, hint] of exercise.hints.entries()) {
      const parts = hint.split('`');
      const expected = parts.length % 2 ? parts.join('') : hint;
      assert.equal(textOf(items[index]), expected, `${id}, indice ${index + 1}`);
      walk(items[index], (node, insideCode) => {
        if (node.nodeName === '#text' && !insideCode) {
          const dollars = [...node.value].filter(character => character === '$').length;
          assert.ok(dollars < 2, `${id}, indice ${index + 1} : délimiteurs ambigus hors code`);
        }
      });
      checked++;
    }
  }
  assert.equal(documents.size, 21);
  assert.equal(checked, 66);
});
