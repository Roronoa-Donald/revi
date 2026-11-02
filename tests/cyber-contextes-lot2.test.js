'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const parse5 = require('parse5');
const web = require('../server/content/cyber-securite-b2/chapitre4');
const passwords = require('../server/content/cyber-securite-b2/chapitre5');
const incidents = require('../server/content/cyber-securite-b2/chapitre6');
const exercises = require('../server/exercises/cyber-securite-b2');

test('F47 : Argon2id augmente le coût sans rendre les attaques impossibles', () => {
  const question = passwords.questions.find(item => /Argon2id/.test(item.stem));
  assert.match(question.opts[question.correct], /coût/i);
  assert.doesNotMatch(question.opts[question.correct], /paralys/i);
  assert.match(question.exp, /paramètres/i);
  const card = passwords.flashcards.find(item => /particularité d’Argon2id/.test(item.q));
  assert.match(card.a, /coût/i);
  assert.doesNotMatch(card.a, /paralys/i);
});

test('F56 : la révision 3 distingue réponse et préparation', () => {
  const section = incidents.sections.find(item => /Gestion des Incidents/.test(item.title)).html;
  for (const term of ['révision 3', '2025', 'Detect', 'Respond', 'Recover', 'Govern', 'Identify', 'Protect']) {
    assert.ok(section.includes(term), term);
  }
  const card = incidents.flashcards.find(item => /révision 3/i.test(item.q));
  assert.match(card.a, /Detect[^.]*Respond[^.]*Recover/);
  assert.doesNotMatch(incidents.summary.join(' '), /structure la réponse à incident en 6 phases/);
});

test('F59 et F190 : les contextes XSS et la portée de la grille sont explicites', () => {
  const section = web.sections.find(item => /Cross-Site Scripting/.test(item.title)).html;
  for (const term of ['texte HTML', 'attribut', 'URL', 'JavaScript', 'textContent', 'assainissement']) {
    assert.ok(section.includes(term), term);
  }
  const card = web.flashcards.find(item => /XSS.*contextes/i.test(item.q));
  assert.match(card.a, /traitements adaptés/i);
  assert.match(card.a, /URL/i);
  const exercise = exercises.find(item => item.id === 'cs2-c4-e2');
  assert.match(exercise.brief, /texte HTML/i);
  assert.match(exercise.brief, /ne (?:garantit|protège)/i);
  assert.doesNotMatch(exercise.title, /Neutralisateur|Sanitizer/i);
});

test('F190 : les résultats encodés restent du texte dans un fragment HTML', () => {
  const exercise = exercises.find(item => item.id === 'cs2-c4-e2');
  const blocks = exercise.starter.split(/(?=^\[Cas \d+ — )/m).slice(1);
  const inputs = [exercise.examples[0].stdin, ...blocks.map(block =>
    block.split('\n').find(line => line.startsWith('# Données : ')).slice('# Données : '.length))];
  const expected = [exercise.examples[0].expected, ...exercise.tests.map(item => item.expected)];
  const entities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;' };
  inputs.forEach((input, index) => {
    const encoded = input.replace(/[&<>"']/g, character => entities[character]);
    assert.equal(expected[index], encoded);
    const paragraph = parse5.parseFragment(`<p>${encoded}</p>`).childNodes[0];
    assert.equal(paragraph.childNodes.length, 1);
    assert.equal(paragraph.childNodes[0].nodeName, '#text');
    assert.equal(paragraph.childNodes[0].value, input);
    assert.ok(exercise.solution.includes(encoded));
  });
  const anchor = parse5.parseFragment('<a href="javascript:alert(1)">lien</a>').childNodes[0];
  assert.equal(anchor.attrs.find(attribute => attribute.name === 'href').value, 'javascript:alert(1)');
});
