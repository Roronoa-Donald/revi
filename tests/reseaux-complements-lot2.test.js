'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const parse5 = require('parse5');
const early = require('../server/content/b1-reseaux/chapitres-1-3');
const later = require('../server/content/b1-reseaux/chapitres-4-6');
const ccnaIntro = require('../server/content/ccna/chapitre1');
const exercises = require('../server/exercises/b1-reseaux');
const lanExercises = require('../server/exercises/b3-reseau-lan');

function nodes(node) {
  return [node, ...(node.childNodes || []).flatMap(nodes)];
}

function content(node) {
  return nodes(node).filter(item => item.nodeName === '#text').map(item => item.value).join('').replace(/\s+/g, ' ');
}

function section(chapter, title) {
  const match = chapter.sections.find(item => title.test(item.title));
  assert.ok(match, `Section absente : ${title}`);
  return content(parse5.parseFragment(match.html));
}

function page(filename) {
  return content(parse5.parse(fs.readFileSync(path.join(__dirname, '..', filename), 'utf8')));
}

test('F40 : un WAN ne se définit ni par un seuil kilométrique ni par la location', () => {
  const chapter = early[0];
  const lesson = section(chapter, /familles de réseaux/i);
  const question = chapter.questions.find(item => /réseaux WAN/i.test(item.q));
  assert.match(lesson, /WAN.{0,300}(?:distance fixe|seuil kilométrique)/i);
  assert.match(lesson, /(?:location|louée).{0,100}(?:obligatoire|nécessaire)/i);
  assert.doesNotMatch(question.opts[question.correct], /plus de 100 km/i);
  assert.doesNotMatch(chapter.summary.join(' '), /plus de 100 km/i);
  assert.doesNotMatch(page('b1-reseaux/chapitres/formules.html'), /s'il emprunte des liaisons louées, c'est un WAN/i);
});

test('F120 : le blindage n’impose pas à lui seul une portée ou un débit supérieurs', () => {
  const chapter = early[1];
  const lesson = section(chapter, /supports/i);
  const item = chapter.questions.find(question => /interférences/i.test(question.q));
  const card = chapter.flashcards.find(candidate => /STP contre UTP/i.test(candidate.q));
  assert.match(lesson, /blindage.{0,180}(?:ne garantit|ne détermine pas)/i);
  assert.match(lesson, /catégorie du câble.{0,100}norme Ethernet/i);
  assert.match(lesson, /portée.{0,40}débit/i);
  assert.doesNotMatch(item.exp, /meilleure distance et vitesse/i);
  assert.match(card.a, /(?:ne garantit|ne détermine pas)/i);
});

test('F121 : l’anneau de la grille désigne explicitement un double anneau', () => {
  const exercise = exercises.find(item => item.id === 're-c2-e3');
  assert.match(exercise.brief, /anneau.{0,100}double anneau/i);
  assert.match(exercise.brief, /(?:reconfigur|raccord).{0,100}(?:coupure|panne)/i);
  assert.match(exercise.goal, /double anneau/i);
  assert.match(page('b1-reseaux/chapitres/chapitre2.html'), /double anneau/i);
});

test('F124 : une MAC peut être locale et les préfixes varient', () => {
  const chapter = later[1];
  const lesson = section(chapter, /MAC, IP, ARP/i);
  const exercise = exercises.find(item => item.id === 're-c5-e1');
  const card = chapter.flashcards.find(item => /Structure d'une MAC/i.test(item.q));
  assert.match(lesson, /(?:localement|locale).{0,100}(?:aléatoire|randomisée)/i);
  assert.match(lesson, /24.{0,100}28.{0,100}36 bits/i);
  assert.match(card.a, /(?:localement|locale)/i);
  assert.match(exercise.brief, /(?:forme|syntaxe).{0,100}(?:identité|unicité)/i);
  assert.doesNotMatch(page('b1-reseaux/chapitres/formules.html'), /6 OUI fabricant \+ 6 serie/i);
});

test('F124 : le doublon CCNA ne présente pas un suffixe comme numéro de série unique', () => {
  const lesson = section(ccnaIntro, /Anatomie de la Trame Ethernet/i);
  const card = ccnaIntro.flashcards.find(item => /taille d’une adresse MAC/i.test(item.q));
  assert.match(lesson, /(?:localement|locale).{0,100}(?:aléatoire|randomisée)/i);
  assert.match(card.a, /(?:localement|locale)/i);
  assert.doesNotMatch(card.a, /numéro de série unique/i);
  assert.match(page('ccna/chapitres/cartes.html'), /(?:localement|locale).{0,100}(?:aléatoire|randomisée)/i);
});

test('F124 : l’élection STP B3 suppose des identifiants distincts sans en faire une propriété physique', () => {
  const exercise = lanExercises.find(item => item.id === 'lan3-c1-e1');
  assert.doesNotMatch(exercise.brief, /identifiant physique unique/i);
  assert.match(exercise.brief, /(?:simulation|modèle).{0,120}(?:distinct|unique)/i);
});
