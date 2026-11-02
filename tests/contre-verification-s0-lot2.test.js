'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const acorn = require('acorn');
const parse5 = require('parse5');
const registry = require('../server/exercises');
const algo = require('../server/content/b3-algo/chapitre6');
const hacking = require('../server/content/b3-hacking/chapitre2');

const root = path.join(__dirname, '..');
const walk = node => {
  if (!node || typeof node !== 'object') return [];
  return [node, ...Object.entries(node).filter(([key]) => key !== 'parentNode')
    .flatMap(([, value]) => Array.isArray(value) ? value.flatMap(walk) : walk(value))];
};
const property = (node, name) => node.properties.find(item => (item.key.name || item.key.value) === name)?.value;
const question = (source, id) => walk(acorn.parse(source, { ecmaVersion: 'latest' }))
  .find(node => node.type === 'ObjectExpression' && property(node, 'id')?.value === id);

test('F57 : le QCM historique interroge un checkpoint de production sans mémoire', () => {
  const html = fs.readFileSync(path.join(root, 'rd_winserver/chapitres/qcm-100.html'), 'utf8');
  const document = parse5.parse(html);
  const scripts = walk(document).filter(node => node.nodeName === '#text').map(node => node.value);
  const source = scripts.find(text => text.includes('const ALL_QUESTIONS'));
  assert.ok(source);
  const item = question(source, 82);
  assert.ok(item);
  assert.match(property(item, 'q').value, /Hyper-V[^?]*production/i);
  const options = property(item, 'o').elements.map(option => option.value);
  assert.match(options[property(item, 'a').value], /sans[^.]*mémoire/i);
  assert.match(property(item, 'e').value, /standard[^.]*mémoire/i);
});

test('F13 : le QCM CCNA historique ne présente pas MD5 comme seul type de secret', () => {
  const source = fs.readFileSync(path.join(root, 'ccna/assets/js/exercises.js'), 'utf8');
  const item = question(source, 'm5q5');
  assert.ok(item);
  const options = property(item, 'options').elements.map(option => option.value);
  assert.match(options[property(item, 'correct').value], /(?:type|version|configuration)/i);
  assert.doesNotMatch(options[property(item, 'correct').value], /secret\s*=\s*MD5/i);
});

test('F19 : l’indice conserve le code historique mo et précise son interprétation en Mio', () => {
  const hints = registry.getExercise('ar-c1-e2').hints.join(' ');
  assert.match(hints, /mo[^.]*Mio/i);
  assert.doesNotMatch(hints, /convertir en Mo/i);
});

test('F46 : la carte précise la méthode et définit les paramètres de complexité', () => {
  const card = algo.flashcards.find(item => /complexité/i.test(item.q) && /sac à dos/i.test(item.q));
  assert.ok(card);
  assert.match(card.q, /tabulaire/i);
  assert.match(card.a, /W[^.]*capacité/i);
  assert.match(card.a, /n[^.]*objets/i);
  assert.match(card.a, /(?:pseudo.polynomial|pseudo.polynomiale)/i);
});

test('F73 : le piège CT ne promet pas une liste exhaustive de sous-domaines', () => {
  const item = hacking.pitfalls.find(value => /Certificate Transparency/i.test(value));
  assert.ok(item);
  assert.doesNotMatch(item, /listent tous les sous-domaines/i);
  assert.match(item, /sans lister tous les sous-domaines/i);
});
