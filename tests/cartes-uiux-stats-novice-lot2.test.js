'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const parse5 = require('parse5');
const kit = require('../scripts/course-kit');
const uiux = require('../server/content/uiux').render(kit);
const stats = require('../server/content/b1-stats').render(kit);
const uiuxChapter4 = require('../server/content/uiux/chapitre4');

const walk = node => [node, ...(node.childNodes || []).flatMap(walk)];
const visible = page => walk(parse5.parseFragment(page.body)).filter(node => node.nodeName === '#text')
  .map(node => node.value).join(' ').replace(/\s+/g, ' ');

test('les cartes UI/UX ne transforment pas des conventions en garanties universelles', () => {
  const cards = visible(uiux['chapitres/cartes.html']);
  assert.doesNotMatch(cards, /éliminant tout temps d’apprentissage|données chiffrées massives|infiniment plus vertueux|garantir harmonie et netteté|uniquement pour les micro.espacements/i);
  assert.match(cards, /(?:peut|peuvent)[^.]*faciliter/i);
  assert.match(cards, /quantitatif[^.]*données chiffrées/i);
  assert.match(cards, /prévention[^.]*erreurs[^.]*aider[^.]*corriger/i);
  const atelier = visible(uiux['atelier.html']);
  assert.doesNotMatch(atelier, /90\s*%|conventions spatiales universelles/i);
  const chapter = visible(uiux['chapitres/chapitre1.html']);
  assert.doesNotMatch(chapter, /sans effort d’apprentissage|conventions spatiales universelles|évite l’abandon de vos utilisateurs/i);
});

test('les deux QCM de grille 8pt interrogent une convention sans garantie de rendu', () => {
  const questions = uiuxChapter4.questions.slice(0, 2);
  for (const question of questions) {
    assert.doesNotMatch(question.opts[question.correct], /jamais|exclusivement|résolutions[^.]*divis/i);
    assert.doesNotMatch(question.exp, /jamais[^.]*flou|formellement autorisée/i);
  }
  assert.match(questions[0].opts[questions[0].correct], /cohér|espacement/i);
  assert.match(questions[1].opts[questions[1].correct], /convention|équipe|projet/i);
});

test('les cartes statistiques précisent les limites de l’écart interquartile et de r', () => {
  const cards = visible(stats['chapitres/cartes.html']);
  assert.doesNotMatch(cards, /insensible aux valeurs extrêmes|continu \(regroupé en classes\)/i);
  assert.match(cards, /(?:moins sensible|plus robuste)/i);
  assert.match(cards, /(?:écarts.types|σx)[^.]*nuls|(?:nuls|nul)[^.]*écart.type/i);
  assert.match(cards, /(?:suspect|atypique)[^.]*règle|règle[^.]*atypique/i);
  const correlation = visible(stats['chapitres/chapitre6.html']);
  assert.match(correlation, /(?:écart.type)[^.]*nul[^.]*indéfini/i);
  const boxplot = visible(stats['chapitres/chapitre5.html']);
  assert.match(boxplot, /(?:ne prouve pas|ne démontre pas)[^.]*erreur/i);
});
