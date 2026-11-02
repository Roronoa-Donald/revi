'use strict';

const assert = require('node:assert/strict');
const path = require('node:path');
const test = require('node:test');
const parse5 = require('parse5');
const initSqlJs = require('../b1-sql/assets/vendor/sqljs/sql-wasm.js');
const course = require('../server/content/b3-sql');
const catalogue = require('../server/exercises');
const { isGradingSuspended } = require('../server/exercises/grading-policy');
const kit = require('../scripts/course-kit');

const pages = course.render(kit);
const walk = node => [node, ...(node.childNodes || []).flatMap(walk)];
const text = node => node.nodeName === '#text' ? node.value : (node.childNodes || []).map(text).join('');
const attr = (node, name) => (node.attrs || []).find(attribute => attribute.name === name)?.value;
const visible = page => walk(parse5.parseFragment(page.body)).filter(node => node.nodeName === '#text')
  .map(node => node.value).join(' ').replace(/\s+/g, ' ');

test('l’accueil décrit les véritables ateliers SQL et annonce la suspension', () => {
  const exercises = catalogue.listExercises().filter(exercise => exercise.course === course.id);
  assert.equal(exercises.length, 18);
  assert.ok(exercises.every(exercise => exercise.language === 'sql'));
  assert.equal(isGradingSuspended(course.id), true);
  const home = visible(pages['index.html']);
  assert.doesNotMatch(home, /ateliers[^.]{0,60}Python|défense absolue|intégralité des standards/i);
  assert.match(home, /18[^.]{0,60}SQL/i);
  assert.match(home, /correction automatique[^.]*suspendue/i);
  assert.doesNotMatch(course.description, /défense absolue/i);
});

test('le catalogue affiche les titres et objectifs actuels des 18 fiches', () => {
  const document = parse5.parseFragment(pages['chapitres/exercices.html'].body);
  const cards = walk(document).filter(node => node.tagName === 'article' &&
    (attr(node, 'class') || '').split(/\s+/).includes('card--exercise'));
  const exercises = catalogue.listExercises().filter(exercise => exercise.course === course.id);
  assert.equal(cards.length, exercises.length);
  for (const [index, exercise] of exercises.entries()) {
    const nodes = walk(cards[index]);
    const title = nodes.find(node => node.tagName === 'h3');
    const description = nodes.find(node => node.tagName === 'p' && attr(node, 'class') === 'card__desc');
    assert.equal(text(title).trim(), exercise.title, exercise.id);
    assert.equal(text(description).trim(), exercise.goal, exercise.id);
    assert.ok(nodes.some(node => node.tagName === 'a' && attr(node, 'href')?.endsWith(`#${exercise.id}`)));
  }
  assert.match(visible(pages['chapitres/exercices.html']), /correction automatique[^.]*suspendue/i);
});

test('l’éditeur libre propose une requête SQLite minimale au lieu d’une grille non SQL', async () => {
  const document = parse5.parseFragment(pages['atelier.html'].body);
  const lab = walk(document).find(node => node.tagName === 'div' && attr(node, 'data-lab') !== undefined);
  assert.ok(lab);
  assert.equal(attr(lab, 'data-language'), 'sql');
  const starter = walk(lab).find(node => node.tagName === 'script' && attr(node, 'data-lab-starter') !== undefined);
  assert.ok(starter);
  const SQL = await initSqlJs({ locateFile: file => path.join(__dirname, '../b1-sql/assets/vendor/sqljs', file) });
  const database = new SQL.Database();
  try {
    assert.equal(database.exec(text(starter))[0].values[0][0], 1);
  } finally {
    database.close();
  }
  const atelier = visible(pages['atelier.html']);
  assert.doesNotMatch(atelier, /Python 3|simulateur d.arbre B.Tree/i);
  assert.match(atelier, /service[^.]*configur/i);
  assert.match(atelier, /correction automatique[^.]*suspendue/i);
});
