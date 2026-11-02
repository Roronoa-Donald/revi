'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const parse5 = require('parse5');

const descendants = node => [node, ...(node.childNodes || []).flatMap(descendants)];
function pageText(filename) {
  const source = fs.readFileSync(path.join(__dirname, '..', filename), 'utf8');
  return descendants(parse5.parse(source)).filter(node => node.nodeName === '#text')
    .map(node => node.value).join(' ').replace(/\s+/g, ' ');
}

test('La corrélation proche de zéro ne tranche pas à elle seule la causalité', () => {
  const text = pageText('b1-stats/atelier.html');
  assert.doesNotMatch(text, /corrélation proche de 0 interdit/i);
  assert.match(text, /corrélation proche de 0 ne permet pas de conclure[^.]{0,100}(?:absence|présence)/i);
});

test('Le calendrier des cartes reste un exemple sans garantie de mémorisation', () => {
  const text = pageText('b1-stats/chapitres/cartes.html');
  assert.doesNotMatch(text, /ancrer durablement/i);
  assert.match(text, /par exemple[^.]{0,100}J\+1/i);
  assert.match(text, /(?:ne garantit pas|sans garantir)[^.]{0,100}mémoris/i);
});
