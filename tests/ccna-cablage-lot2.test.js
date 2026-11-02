'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const parse5 = require('parse5');
const early = require('../server/content/b1-ccna1/chapitres-1-3');
const late = require('../server/content/b1-ccna1/chapitres-4-6');
const exercises = require('../server/exercises/b1-ccna1');

function descendants(node) {
  return [node, ...(node.childNodes || []).flatMap(descendants)];
}

function text(node) {
  return descendants(node).filter(item => item.nodeName === '#text').map(item => item.value).join('').replace(/\s+/g, ' ');
}

function section(chapter, title) {
  const match = chapter.sections.find(item => title.test(item.title));
  assert.ok(match, `Section absente : ${title}`);
  return text(parse5.parseFragment(match.html));
}

function page(filename) {
  return text(parse5.parse(fs.readFileSync(path.join(__dirname, '..', filename), 'utf8')));
}

test('F127 : la catégorie 6 UTP peut porter 10GBASE-T sur une portée conditionnée', () => {
  const chapter = early[0];
  const lesson = section(chapter, /Paires torsadées/i);
  const question = chapter.questions.find(item => /10GBASE-T/i.test(item.q));
  assert.match(lesson, /10GBASE-T.{0,100}cat(?:égorie)? 6 UTP.{0,100}55 m/i);
  assert.match(lesson, /cat(?:égorie)? 6a.{0,100}100 m/i);
  assert.ok(question);
  assert.match(question.opts[question.correct], /55 m/i);
  assert.doesNotMatch(page('b1-ccna1/chapitres/formules.html'), /cat 6a pour le 10 G\./i);
});

test('F128 : sans Auto-MDIX, un PC et un routeur MDI demandent un croisement', () => {
  const chapter = early[2];
  const lesson = section(chapter, /liaisons UTP/i);
  const exercise = exercises.find(item => item.id === 'cc-c1-e2');
  assert.match(lesson, /PC.{0,80}routeur.{0,100}(?:croisé|croisement)/i);
  assert.match(lesson, /Auto-MDIX/i);
  assert.match(exercise.brief, /(?:sans|absence).{0,30}Auto-MDIX/i);
  assert.match(exercise.tests[0].expected, /pc-routeur : a revoir/i);
  assert.match(exercise.tests[0].expected, /conformes : 4\/5/i);
  assert.match(exercise.tests[2].expected, /conformes : 3\/4/i);
});

test('F129 : 100BASE-T4 et 100BASE-TX n’utilisent pas la même catégorie minimale', () => {
  const lesson = section(early[0], /Paires torsadées/i);
  const exercise = exercises.find(item => item.id === 'cc-c1-e3');
  assert.match(lesson, /100BASE-T4.{0,100}cat(?:égorie)? 3/i);
  assert.match(lesson, /100BASE-TX.{0,100}cat(?:égorie)? 5/i);
  assert.match(exercise.brief, /100BASE-TX/i);
  assert.match(exercise.tests[2].expected, /cafe : cat5/i);
  assert.match(exercise.tests[2].expected, /accueil : cat5/i);
});

test('F135 : la taille RSA est liée à la version IOS XE, pas à un minimum historique', () => {
  const chapter = late[2];
  const lesson = section(chapter, /Sécuriser la CLI/i);
  const card = chapter.flashcards.find(item => /checklist SSH/i.test(item.q));
  assert.match(lesson, /IOS XE.{0,30}17\.10.{0,100}2048 bits/i);
  assert.match(card.a, /2048 bits/i);
  assert.doesNotMatch(page('b1-ccna1/chapitres/formules.html'), /768 bits/i);
});

test('F136 : SSH peut utiliser une clé publique sans être limité au mot de passe', () => {
  const chapter = late[2];
  const lesson = section(chapter, /Sécuriser la CLI/i);
  const card = chapter.flashcards.find(item => /checklist SSH/i.test(item.q));
  assert.match(lesson, /authentification.{0,100}clé publique/i);
  assert.match(lesson, /login local.{0,100}(?:exemple|configuration)/i);
  assert.match(card.a, /clé publique/i);
  assert.doesNotMatch(page('b1-ccna1/chapitres/chapitre6.html'), /SSH.{0,60}exige un couple utilisateur\/mot de passe/i);
});

test('F128-F129 : les attendus des grilles suivent leurs hypothèses indépendamment', () => {
  const cable = exercises.find(item => item.id === 'cc-c1-e2');
  const category = exercises.find(item => item.id === 'cc-c1-e3');
  const interfaceTypes = {
    pc: 'MDI', routeur: 'MDI', r1: 'MDI', r2: 'MDI',
    switch: 'MDI-X', sw1: 'MDI-X', sw2: 'MDI-X'
  };
  const categoryByCode = { '100m': 'cat5', '1g': 'cat5e', '10g': 'cat6a' };
  const blocks = item => item.starter.split(/\[Cas \d+ — [^\]]+\]/).slice(1)
    .map(block => block.split('\n').filter(line => line.startsWith('# Données : '))
      .map(line => line.slice('# Données : '.length)).slice(1));
  const cableRecords = blocks(cable);
  cableRecords.push(cable.examples[0].stdin.trim().split('\n').slice(1));
  for (const [index, records] of cableRecords.entries()) {
    let validCount = 0;
    const result = records.map(record => {
      const [connection, proposed] = record.split(' ');
      const [first, second] = connection.split('-');
      assert.ok(interfaceTypes[first] && interfaceTypes[second], connection);
      const required = interfaceTypes[first] === interfaceTypes[second] ? 'croise' : 'droit';
      const valid = proposed === required;
      validCount += Number(valid);
      return `${connection} : ${valid ? 'conforme' : 'a revoir'}`;
    });
    result.push(`conformes : ${validCount}/${records.length}`);
    const expected = index < cable.tests.length ? cable.tests[index].expected : cable.examples[0].expected;
    assert.equal(result.join('\n'), expected);
  }
  const categoryRecords = blocks(category);
  categoryRecords.push(category.examples[0].stdin.trim().split('\n').slice(1));
  for (const [index, records] of categoryRecords.entries()) {
    let installed = 0;
    const result = records.map(record => {
      const [site, speed] = record.split(' ');
      const selected = categoryByCode[speed];
      assert.ok(selected, speed);
      installed += Number(selected === 'cat6a');
      return `${site} : ${selected}`;
    });
    result.push(`cat6a posees : ${installed}`);
    const expected = index < category.tests.length ? category.tests[index].expected : category.examples[0].expected;
    assert.equal(result.join('\n'), expected);
  }
});
