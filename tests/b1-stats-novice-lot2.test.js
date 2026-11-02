'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const parse5 = require('parse5');
const course = require('../server/content/b1-stats');
const chapter = require('../server/content/b1-stats/chapitres-4-6').find(item => item.n === 4);
const pages = course.render(require('../scripts/course-kit'));
const cvSection = chapter.sections.find(item => /coefficient de variation/i.test(item.title));

function text(html) {
  return html.replace(/<[^>]+>/g, ' ')
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function page(name) {
  assert.ok(pages[name], `Page absente : ${name}`);
  return text(pages[name].body);
}

test('les CV du tableau sont exacts et comparés sans classification absolue', () => {
  assert.ok(cvSection);
  const rows = [...cvSection.html.matchAll(/<tr><td>([ABC])<\/td><td>([^<]+)<\/td><td>([^<]+)<\/td><td>([^<]+)<\/td><td>([^<]+)<\/td><\/tr>/g)];
  assert.equal(rows.length, 3);
  for (const row of rows) {
    const mean = Number.parseFloat(row[2].replace(/\s/g, '').replace(',', '.'));
    const deviation = Number.parseFloat(row[3].replace(/\s/g, '').replace(',', '.'));
    const displayed = Number.parseFloat(row[4].replace(',', '.'));
    assert.equal(displayed, 100 * deviation / mean, `CV de la série ${row[1]}`);
    assert.doesNotMatch(row[5], /(?:forte|très homogène)/i);
  }
  assert.match(text(cvSection.html), /B.{0,80}(?:9 fois|plus (?:élevé|grande)).{0,60}A/i);
  assert.match(text(cvSection.html), /(?:même CV|CV égaux)/i);
  assert.match(text(cvSection.html), /pas nécessairement la même distribution/i);
});

test('les conditions de validité et les limites du CV sont explicites', () => {
  const section = text(cvSection.html);
  assert.match(section, /moyenne.{0,35}positive/i);
  assert.match(section, /moyenne.{0,25}(?:nulle|égale à zéro).{0,70}(?:indéfini|impossible)/i);
  assert.match(section, /(?:proche|près) de zéro/i);
  assert.match(section, /moyenne négative/i);
  assert.match(section, /précision des mesures/i);
  assert.match(section, /zéro (?:naturel|pertinent|significatif)/i);
  assert.match(section, /rapports ont un sens/i);
  assert.match(section, /°C/);
  assert.match(section, /(?:écart-type|écart interquartile)/i);
  assert.match(cvSection.html, /https:\/\/www\.itl\.nist\.gov\/div898\/software\/dataplot\/refman2\/auxillar\/coefvari\.htm/);
  assert.notEqual(5 / 25, 5 / 298.15);
  const question = chapter.questions.find(item => /coefficient de variation/i.test(item.stem));
  assert.match(question.exp, /moyenne.{0,35}positive/i);
  assert.match(question.exp, /zéro (?:naturel|pertinent|significatif)/i);
});

test('aucun seuil de dispersion forte n’est présenté comme universel', () => {
  const surfaces = [
    text(JSON.stringify(chapter)),
    page('atelier.html'),
    page('chapitres/chapitre4.html'),
    page('chapitres/cartes.html'),
    page('chapitres/formules.html'),
    page('chapitres/simulateur-examen.html'),
    page('exercices/exercices.html')
  ];
  for (const surface of surfaces) {
    assert.doesNotMatch(surface, /CV\s*(?:>|supérieur à)\s*25\s*%/i);
    assert.doesNotMatch(surface, /variation supérieur à 25\s*%/i);
  }
  assert.match(text(cvSection.html), /(?:aucun|pas de) seuil universel/i);
  assert.match(page('atelier.html'), /(?:aucun|pas de) seuil universel/i);
  const card = chapter.flashcards.find(item => /CV/i.test(item.q));
  assert.match(text(card.a), /(?:aucun|pas de) seuil universel/i);
  assert.match(text(card.a), /contexte/i);
});

test('les corrigés comparent les valeurs sans interpréter les notes hors contexte', () => {
  const exam = page('chapitres/simulateur-examen.html');
  assert.match(exam, /37,9\s*%.{0,180}barème/i);
  assert.match(exam, /4,2\s*%.{0,60}34,2\s*%/i);
  assert.match(exam, /zéro (?:naturel|pertinent|significatif)/i);
  assert.doesNotMatch(exam, /37,9\s*%\s*:\s*dispersion forte/i);
});

test('l’atelier présente les limites de sécurité et de la correction automatique', () => {
  const atelier = page('atelier.html');
  assert.doesNotMatch(atelier, /aucun accès au système n’est possible|service d’exécution isolé|sans conséquence/i);
  assert.match(atelier, /(?:réponses|données).{0,80}(?:serveur|transmises)/i);
  assert.match(atelier, /(?:données personnelles|secrets)/i);
  assert.match(atelier, /correction automatique.{0,120}ne (?:prouve|garantit) pas.{0,60}(?:maîtrise|compréhension)/i);
  assert.doesNotMatch(atelier, /meilleure façon de vérifier que le cours est vraiment acquis/i);
});

test('la zone libre décrit une grille non exécutée et non corrigée', () => {
  const document = parse5.parseFragment(pages['atelier.html'].body);
  const descend = node => [node, ...(node.childNodes || []).flatMap(descend)];
  const lab = descend(document).find(node => node.tagName === 'div' &&
    (node.attrs || []).some(attribute => attribute.name === 'data-lab'));
  assert.ok(lab);
  const attributes = Object.fromEntries(lab.attrs.map(attribute => [attribute.name, attribute.value]));
  assert.equal(attributes['data-language'], 'analyse');
  assert.equal(attributes['data-exercise'], undefined);
  assert.equal(attributes['data-languages'], undefined);
  const visible = descend(lab).filter(node => node.nodeName === '#text').map(node => node.value).join(' ');
  assert.match(visible, /brouillon[^.]*ni exécuté ni corrigé/i);
  assert.doesNotMatch(visible, /script proposé|message que Python|programmez-la/i);
  const intro = page('atelier.html');
  assert.doesNotMatch(intro, /vrai interpréteur Python|Ctrl \+ Entrée.*script/i);
});
