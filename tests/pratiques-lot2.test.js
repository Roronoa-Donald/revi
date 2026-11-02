'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const uiux = require('../server/content/uiux/chapitre2');
const rest = require('../server/content/b3-document-technique/chapitre4');
const agile = require('../server/content/b3-agile/chapitre4');
const devopsExercises = require('../server/exercises/b3-devops');
const linux = require('../server/content/b1-linux/chapitres-1-3').find(chapter => chapter.n === 1);

test('F65 : cinq participants ne garantissent pas 85 % de problèmes détectés', () => {
  const card = uiux.flashcards.find(item => /Nielsen/i.test(item.q));
  assert.match(card.a, /hypothès/i);
  assert.match(card.a, /(?:ne garantit pas|sans garantie)/i);
  assert.match(card.a, /85\s*%/);
  const question = uiux.questions.find(item => /Nielsen/i.test(item.stem));
  assert.match(question.opts[question.correct], /hypothès/i);
  assert.ok(Math.abs((1 - 0.69 ** 5) * 100 - 84.35964451) < 0.001);
});

test('F66 : le pluriel est une convention, non une contrainte REST', () => {
  const card = rest.flashcards.find(item => /URIs REST/i.test(item.q));
  assert.match(card.a, /convention/i);
  assert.match(card.a, /\/user/i);
  assert.match(card.a, /(?:pas une contrainte imposée|non impos)/i);
});

test('F70 : les story points dépendent du référentiel d’équipe', () => {
  const card = agile.flashcards.find(item => /Story Points plutôt qu/i.test(item.q));
  assert.match(card.a, /équipe/i);
  assert.match(card.a, /(?:pas univers|ne sont pas compar)/i);
  const lesson = agile.sections.find(section => /Estimation Relative/i.test(section.title)).html;
  assert.doesNotMatch(lesson, /échelle de référence universelle/i);
});

test('F168 : la grille DORA historique est un barème pédagogique daté', () => {
  const item = devopsExercises.find(exercise => exercise.id === 'do3-c1-e2');
  assert.match(item.brief, /barème pédagogique fictif/i);
  assert.match(item.brief, /2026/);
  assert.match(item.brief, /cinq métriques/i);
  assert.match(item.brief, /rework/i);
  assert.doesNotMatch(item.brief + item.goal, /grille de classification officielle|critères universels/i);
  assert.ok(item.tests.every(entry => /BAREME_PEDAGOGIQUE/.test(entry.expected)));
  const lesson = require('../server/content/b3-devops/chapitre5');
  const current = lesson.sections.find(section => /cinq métriques de performance DORA/i.test(section.title));
  assert.match(current.html, /Deployment Rework Rate/i);
  assert.match(current.html, /Failed Deployment Recovery Time/i);
});

test('F168 : les quatre valeurs et les seuils fictifs sont recalculés', async () => {
  const item = devopsExercises.find(exercise => exercise.id === 'do3-c1-e2');
  const blocks = item.starter.split(/(?=^\[Cas \d+ — )/m).slice(1);
  const cases = [item.examples[0].stdin, ...blocks];
  const expectedOutputs = [item.examples[0].expected, ...item.tests.map(entry => entry.expected)];
  for (const [index, input] of cases.entries()) {
    const values = Object.fromEntries([...input.matchAll(/([a-z_]+)=([\d.]+)/g)].map(match => [match[1], Number(match[2])]));
    const thresholds = [[1, 1, 5, 1], [0.14, 24, 15, 24], [0.033, 168, 30, 168]];
    const rank = thresholds.findIndex(([frequency, lead, failure, restore]) => values.df_per_day >= frequency && values.lt_hours <= lead && values.cfr_pct <= failure && values.mttr_hours <= restore);
    const category = rank < 0 ? 'D' : ['A', 'B', 'C'][rank];
    const expected = `BAREME_PEDAGOGIQUE: CLASSE=${category} | DF=${values.df_per_day.toFixed(2)} dep/j | LT=${values.lt_hours.toFixed(1)}h | CFR=${values.cfr_pct.toFixed(1)}% | MTTR=${values.mttr_hours.toFixed(1)}h | CINQUIEME=NON_MESURE`;
    assert.equal(expectedOutputs[index], expected, `cas ${index}`);
  }
  const { runTests } = require('../server/exercises/runner');
  const { execute } = require('../server/services/execution');
  const accepted = await runTests(item, item.solution, { execute });
  assert.equal(accepted.passed, item.tests.length);
  for (const index of [0, 1]) {
    const variant = item.tests.map((entry, caseIndex) => `[Cas ${caseIndex + 1}]\n${caseIndex === index ? 'REPONSE_INCORRECTE' : entry.expected}`).join('\n\n');
    const rejected = await runTests(item, variant, { execute });
    assert.equal(rejected.stop.reason, 'wrong_output');
    assert.equal(rejected.stop.testIndex, index);
  }
});

test('F34 : un premier pas guidé précède les notions avancées', () => {
  const section = linux.sections.find(item => /Avant les ateliers/i.test(item.title));
  assert.match(section.html, /pas à pas/i);
  assert.match(section.html, /read -r/);
  assert.match(section.html, /echo/);
  assert.match(section.html, /(?:plus tard|chapitre 6)/i);
  const { spawnSync } = require('node:child_process');
  const execution = spawnSync('/bin/bash', ['-c', 'read -r prenom\necho "Bonjour $prenom"'], { input: 'Awa\n', encoding: 'utf8' });
  assert.equal(execution.status, 0, execution.stderr);
  assert.equal(execution.stdout, 'Bonjour Awa\n');
});
