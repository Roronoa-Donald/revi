'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const parse5 = require('parse5');
const course = require('../server/content/uiux');
const kit = require('../scripts/course-kit');
const registry = require('../server/exercises');
const { runTests } = require('../server/exercises/runner');
const { runAnalyse } = require('../server/services/execution/local-runner');

const pages = course.render(kit);
const grid = registry.getExercise('ux2-c3-e2');
const flatten = node => [node, ...(node.childNodes || []).flatMap(flatten)];
const visible = html => flatten(parse5.parseFragment(html))
  .filter(node => node.nodeName === '#text' && node.parentNode?.tagName !== 'script')
  .map(node => node.value).join(' ').replace(/\s+/g, ' ');

test('l’accueil et le catalogue annoncent des grilles et non du code Python exécutable', () => {
  const exercises = Array.from({ length: 6 }, (_, chapter) =>
    Array.from({ length: 3 }, (_, index) => registry.getExercise(`ux2-c${chapter + 1}-e${index + 1}`))).flat();
  assert.equal(exercises.length, 18);
  assert.ok(exercises.every(exercise => exercise.language === 'analyse'));
  for (const filename of ['index.html', 'atelier.html', 'exercices/exercices.html']) {
    const content = visible(pages[filename].body);
    assert.doesNotMatch(content, /interpréteur Python|ateliers de programmation Python|exercices de code exécutables|ateliers de programmation et de simulation exécutables/i);
    assert.match(content, /grilles|études de cas/i);
  }
  const atelier = parse5.parseFragment(pages['atelier.html'].body);
  const lab = flatten(atelier).find(node => node.tagName === 'div' &&
    (node.attrs || []).some(attribute => attribute.name === 'data-lab'));
  assert.ok(lab);
  const attrs = Object.fromEntries(lab.attrs.map(attribute => [attribute.name, attribute.value]));
  assert.equal(attrs['data-language'], 'analyse');
  assert.equal(attrs['data-exercise'], undefined);
  assert.match(visible(pages['atelier.html'].body), /brouillon[^.]*ni exécuté ni corrigé/i);
});

test('Miller et le groupement ne sont pas présentés comme une capacité universelle', () => {
  for (const filename of ['index.html', 'chapitres/chapitre3.html', 'chapitres/cartes.html', 'chapitres/formules.html', 'chapitres/simulateur-examen.html']) {
    const content = visible(pages[filename].body);
    assert.doesNotMatch(content, /capacité de mémoire de travail selon Miller|mémoire de travail[^.]*limitée à 7|mémoire de travail[^.]*ne peut retenir[^.]*5 à 9|Miller[^.]*a démontré[^.]*7|dépasse[^.]*capacité de mémoire de travail de Miller/i);
  }
  const chapter = visible(pages['chapitres/chapitre3.html'].body);
  assert.match(chapter, /Miller[^.]*repère historique/i);
  assert.match(chapter, /(?:dépend|varie)[^.]*tâche/i);
  assert.match(chapter, /(?:ne garantit pas|pas de garantie)/i);
  assert.ok(Math.abs(Math.log2(65) / Math.log2(3) - 3.8) < 0.1);
});

test('le modèle de Hick explicite un coefficient fictif et un seuil non cognitif', () => {
  assert.equal(grid.language, 'analyse');
  assert.match(grid.brief, /(?:fictif|fictive)/i);
  assert.match(grid.brief, /ne (?:mesure|prouve|diagnostique)/i);
  assert.doesNotMatch(JSON.stringify(grid), /CONFORME \(Miller\)|surcharge la mémoire|constante cognitive/i);
  const fitts = registry.getExercise('ux2-c3-e1');
  assert.doesNotMatch(fitts.brief, /constantes empiriques universelles/i);
});

test('chaque donnée affichée de la grille correspond aux calculs indépendants et au sélecteur', async () => {
  const blocks = grid.starter.split(/(?=^\[Cas \d+ — )/m).slice(1);
  assert.equal(blocks.length, grid.tests.length);
  blocks.forEach((block, index) => {
    const values = [...block.matchAll(/^# Données : (\d+)$/gm)].map(match => Number(match[1]));
    const expected = values.map(value => `OPTIONS: ${value} -> TEMPS: ${Math.round(150 * Math.log2(value + 1))} ms | ${value <= 7 ? 'DANS_SEUIL_FICTIF' : 'DEPASSE_SEUIL_FICTIF'}`).join('\n');
    assert.equal(grid.tests[index].expected, expected, `cas ${index + 1}`);
  });
  const execute = async ({ code, stdin }) => {
    const result = await runAnalyse(code, stdin);
    return { ok: result.ok, stdout: result.data.stdout };
  };
  const result = await runTests(grid, grid.solution, { execute });
  assert.equal(result.passed, result.total);
  for (const wrong of [
    grid.solution.replace('[Cas 2 — Seuil fictif à 7 et 8]\nOPTIONS: 7 -> TEMPS: 450 ms | DANS_SEUIL_FICTIF', '[Cas 2 — Seuil fictif à 7 et 8]\nOPTIONS: 7 -> TEMPS: 450 ms | DEPASSE_SEUIL_FICTIF'),
    grid.solution.replace('OPTIONS: 8 -> TEMPS: 475 ms | DEPASSE_SEUIL_FICTIF', 'OPTIONS: 8 -> TEMPS: 475 ms | DANS_SEUIL_FICTIF')
  ]) {
    assert.notEqual(wrong, grid.solution);
    const rejected = await runTests(grid, wrong, { execute });
    assert.equal(rejected.stop.reason, 'wrong_output');
  }
});

test('la grille 8pt fournit toutes les données et qualifie un modèle de projet', async () => {
  const exercise = registry.getExercise('ux2-c4-e1');
  assert.match(exercise.brief, /(?:modèle|convention)[^.]*projet/i);
  assert.match(exercise.brief, /(?:non négati(?:f|ve)|positif ou nul)/i);
  const cases = exercise.starter.split(/(?=^\[Cas \d+ — )/m).slice(1);
  assert.equal(cases.length, exercise.tests.length);
  cases.forEach((block, index) => {
    const values = [...block.matchAll(/^# Données : (\d+)$/gm)].map(match => Number(match[1]));
    const expected = values.map(value => {
      if (value % 8 === 0) return `${value}px -> CONFORME (Grille 8pt)`;
      if (value % 4 === 0) return `${value}px -> CONFORME (Demi-grille 4pt)`;
      return `${value}px -> NON_CONFORME (Correction: ${Math.floor((value + 4) / 8) * 8}px)`;
    }).join('\n');
    assert.equal(exercise.tests[index].expected, expected, `cas ${index + 1}`);
  });
  const execute = async ({ code, stdin }) => {
    const result = await runAnalyse(code, stdin);
    return { ok: result.ok, stdout: result.data.stdout };
  };
  const correct = await runTests(exercise, exercise.solution, { execute });
  assert.equal(correct.passed, correct.total);
  for (const wrong of [
    exercise.solution.replace('18px -> NON_CONFORME (Correction: 16px)', '18px -> NON_CONFORME (Correction: 24px)'),
    exercise.solution.replace('5px -> NON_CONFORME (Correction: 8px)', '5px -> NON_CONFORME (Correction: 0px)')
  ]) {
    assert.notEqual(wrong, exercise.solution);
    const result = await runTests(exercise, wrong, { execute });
    assert.equal(result.stop.reason, 'wrong_output');
  }
});
