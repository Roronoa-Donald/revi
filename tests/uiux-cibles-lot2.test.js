'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const chapter = require('../server/content/uiux/chapitre5');
const exercises = require('../server/exercises/uiux');

test('F17 : les critères WCAG et unités de plateforme sont distingués avec leurs exceptions', () => {
  const section = chapter.sections.find(item => /Cibles Tactiles/.test(item.title)).html;
  assert.match(section, /2\.5\.5[^.]*44\s*[x×]\s*44[^.]*pixels CSS[^.]*AAA/i);
  assert.match(section, /2\.5\.8[^.]*24\s*[x×]\s*24[^.]*pixels CSS[^.]*AA/i);
  assert.match(section, /exceptions/i);
  assert.match(section, /Android[^.]*48\s*[x×]\s*48\s*dp/i);
  assert.doesNotMatch(section, /dp\s*\(pixels\)/i);
  assert.match(section, /aucune taille ne garantit une utilisation sans erreur/i);
});

test('F17 : carte et QCM n’attribuent pas 48 pixels CSS au WCAG 2.5.5', () => {
  const card = chapter.flashcards.find(item => /taille minimale recommandée d’une cible tactile/i.test(item.q));
  assert.match(card.a, /2\.5\.5[^.]*44\s*[x×]\s*44[^.]*pixels CSS/i);
  assert.match(card.a, /Android[^.]*48\s*[x×]\s*48\s*dp/i);
  const question = chapter.questions.find(item => /WCAG 2\.5\.5/.test(item.stem));
  assert.ok(question);
  assert.match(question.opts[question.correct], /44\s*[x×]\s*44[^.]*pixels CSS/i);
  assert.match(question.exp, /exceptions/i);
});

test('F17 : la grille applique un seuil fictif de 48 pixels CSS, sans conclure à la conformité WCAG', () => {
  const exercise = exercises.find(item => item.id === 'ux2-c5-e2');
  assert.match(exercise.goal, /modèle/i);
  assert.match(exercise.brief, /48\s*pixels CSS/i);
  assert.match(exercise.brief, /ne permet pas[^.]*conformité WCAG/i);
  assert.doesNotMatch(exercise.goal, /conformité.*WCAG/i);
  const example = exercise.examples[0].expected.split('\n');
  assert.match(example[0], /48x48.*CONFORME/);
  assert.match(example[1], /24x24.*NON_CONFORME.*-24px largeur, -24px hauteur/);
  assert.match(example[2], /120x32.*NON_CONFORME.*-0px largeur, -16px hauteur/);
});

test('F17 : accueil et examen générés distinguent le référentiel et les unités', () => {
  for (const file of ['uiux/chapitres/chapitre5.html', 'uiux/chapitres/cartes.html', 'uiux/chapitres/simulateur-examen.html', 'uiux/index.html']) {
    const body = fs.readFileSync(file, 'utf8');
    assert.doesNotMatch(body, /48\s*x\s*48\s*px\s*\(Android\/WCAG\)/i);
  }
  assert.match(fs.readFileSync('uiux/chapitres/simulateur-examen.html', 'utf8'), /44\s*[x×]\s*44[^.]*pixels CSS/i);
});
