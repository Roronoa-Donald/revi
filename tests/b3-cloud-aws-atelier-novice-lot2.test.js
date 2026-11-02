'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const parse5 = require('parse5');
const course = require('../server/content/b3-cloud-aws');
const kit = require('../scripts/course-kit');

const walk = node => [node, ...(node.childNodes || []).flatMap(walk)];
const text = node => node.nodeName === '#text' ? node.value : (node.childNodes || []).map(text).join('');
const attr = (node, name) => (node.attrs || []).find(attribute => attribute.name === name)?.value;

test('l’atelier AWS décrit une grille libre plutôt qu’une console Python ou un simulateur', () => {
  const page = course.render(kit)['atelier.html'];
  const document = parse5.parseFragment(page.body);
  const lab = walk(document).find(node => node.tagName === 'div' && attr(node, 'data-lab') !== undefined);
  const content = text(document).replace(/\s+/g, ' ');
  assert.ok(lab);
  assert.equal(attr(lab, 'data-language'), 'analyse');
  assert.equal(attr(lab, 'data-exercise'), undefined);
  assert.doesNotMatch(page.description + content, /console interactive Python|atelier de code interactif|simulateur d.auto scaling|calculateur d.adresses/i);
  assert.match(content, /ni exécut[ée]s? ni corrig[ée]s?/i);
  assert.match(content, /ne (?:se )?connecte pas (?:à|aux) AWS/i);
});

test('la page générée reprend la description et le statut de la grille libre', () => {
  const page = fs.readFileSync(path.join(__dirname, '../b3-cloud-aws/atelier.html'), 'utf8');
  const document = parse5.parse(page);
  const descriptions = walk(document).filter(node => node.tagName === 'meta' &&
    ['description', 'og:description'].includes(attr(node, 'name') || attr(node, 'property')));
  assert.equal(descriptions.length, 2);
  for (const description of descriptions) assert.doesNotMatch(attr(description, 'content'), /Python|console interactive/i);
  assert.match(text(document), /ni exécut[ée]s? ni corrig[ée]s?/i);
});
