'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const parse5 = require('parse5');
const foundations = require('../server/content/b3-supervision/chapitre1');
const protocols = require('../server/content/b3-supervision/chapitre2');
const exercises = require('../server/exercises/b3-supervision/chapitre1');

const root = path.resolve(__dirname, '..');

function descendants(node) {
  return [node, ...(node.childNodes || []).flatMap(descendants)];
}

function text(node) {
  return descendants(node).filter(child => child.nodeName === '#text').map(child => child.value).join('').replace(/\s+/g, ' ');
}

function page(filename) {
  return text(parse5.parse(fs.readFileSync(path.join(root, filename), 'utf8')));
}

function section(chapter, expression) {
  const item = chapter.sections.find(candidate => expression.test(candidate.title));
  assert.ok(item, `Section absente : ${expression}`);
  return text(parse5.parseFragment(item.html));
}

function question(chapter, expression) {
  const item = chapter.questions.find(candidate => expression.test(candidate.stem || candidate.q));
  assert.ok(item, `Question absente : ${expression}`);
  assert.ok(Number.isInteger(item.correct) && item.correct >= 0 && item.correct < item.opts.length);
  return item;
}

function card(chapter, expression) {
  const item = chapter.flashcards.find(candidate => expression.test(candidate.q));
  assert.ok(item, `Carte absente : ${expression}`);
  return item.a;
}

test('F150 : TCP seul et TLS protègent différemment les journaux Syslog', () => {
  const lesson = section(protocols, /journalisation.*Syslog/i);
  const item = question(protocols, /TCP 514.*TLS 6514/i);
  const answer = card(protocols, /Syslog sur TLS 6514/i);
  assert.match(lesson, /TCP 514.{0,100}(?:sans TLS|non chiffré)/is);
  assert.match(lesson, /TLS 6514.{0,140}(?:confidentialité|chiffre)/is);
  assert.match(lesson, /(?:ne garantit pas|ne suffit pas).{0,80}non-répudiation/is);
  assert.match(lesson, /(?:ne garantit pas|ne suffit pas).{0,80}(?:enregistrement|livraison)/is);
  assert.match(lesson, /RFC 5425.{0,60}RFC 9662.{0,30}2024/i);
  assert.match(item.opts[item.correct], /TLS.{0,80}(?:chiffre|confidentialité)/i);
  assert.doesNotMatch(answer, /garantir la livraison/i);
  assert.match(page('b3-supervision/chapitres/formules.html'), /TCP 514.{0,100}(?:sans TLS|non chiffré)/i);
});

test('F151 : sysUpTime mesure le temps depuis la réinitialisation de la gestion réseau', () => {
  const lesson = protocols.sections.map(item => text(parse5.parseFragment(item.html))).join(' ');
  const item = question(protocols, /1\.3\.6\.1\.2\.1\.1\.3\.0/);
  assert.match(lesson, /sysUpTime.{0,160}(?:gestion réseau|gestion SNMP)/i);
  assert.match(lesson, /(?:réinitialis|relanc)/i);
  assert.match(lesson, /(?:modulo|boucl|débord).{0,60}(?:2\^32|497)/i);
  assert.match(item.exp, /(?:gestion réseau|gestion SNMP)/i);
  assert.doesNotMatch(item.exp, /depuis le dernier démarrage du système/i);
  assert.match(page('b3-supervision/chapitres/formules.html'), /sysUpTime.{0,100}(?:gestion réseau|gestion SNMP)/i);
});

test('F152 : aucune panne ne produit ni MTTR nul ni MTBF égal à la période', () => {
  const lesson = section(foundations, /indicateurs de fiabilité/i);
  const exercise = exercises.find(item => item.id === 'sup3-c1-e1');
  const noOutage = exercise.tests.find(item => /sans aucune panne/i.test(item.label));
  assert.match(lesson, /aucune panne.{0,160}(?:non calculable|indéterminé)/is);
  assert.match(exercise.brief, /aucune panne.{0,160}non_calculable/is);
  assert.match(noOutage.expected, /failures=0 mttr_hours=non_calculable mtbf_hours=non_calculable/);
  assert.match(exercise.solution, /failures=0 mttr_hours=non_calculable mtbf_hours=non_calculable/);
  assert.doesNotMatch(page('b3-supervision/chapitres/chapitre1.html'), /mttr_hours=0\.00 mtbf_hours=720\.00/);
  assert.match(page('b3-supervision/chapitres/formules.html'), /(?:0 panne|aucune panne).{0,120}non calculable/i);
  const downtimeHours = (45 + 15) / 60;
  assert.equal(downtimeHours / 2, 0.5);
  assert.equal((720 - downtimeHours) / 2, 359.5);
  assert.match(exercise.examples[0].expected, /mttr_hours=0\.50 mtbf_hours=359\.50/);
});
