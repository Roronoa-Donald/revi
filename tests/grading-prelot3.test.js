'use strict';

const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const path = require('node:path');
const test = require('node:test');
const { buildApp } = require('../server/app');
const catalogue = require('../server/exercises');
const policy = require('../server/exercises/grading-policy');
const execution = require('../server/services/execution');
const budget = require('../server/services/execution/budget');
const labs = require('../scripts/generate-code-labs');

test('la notation de code reste active pour 62 fiches initiales et quatre méthodes contrôlées', () => {
  const items = catalogue.listExercises();
  const code = items.filter(item => item.language !== 'analyse');
  const grids = items.filter(item => item.language === 'analyse');
  assert.equal(code.length, 420);
  assert.equal(grids.length, 830);
  assert.equal(code.filter(item => !policy.isGradingSuspended(item.course, item.id)).length, 66);
  assert.equal(code.filter(item => policy.isGradingSuspended(item.course, item.id)).length, 354);
  assert.equal(grids.filter(item => policy.isGradingSuspended(item.course, item.id)).length, 0);
  assert.equal(policy.isGradingSuspended('b1-python', 'nouvel-exercice'), true);
  assert.equal(policy.isGradingSuspended('b1-python', 'gt-c1-e1'), true);
});

test('toute modification de la fiche invalide sa preuve', () => {
  const exercise = catalogue.getExercise('gt-c1-e1');
  assert.equal(policy.isGradingSuspended(exercise.course, exercise.id), false);
  const original = exercise.solution;
  try {
    exercise.solution += '\n';
    assert.equal(policy.isGradingSuspended(exercise.course, exercise.id), true);
  } finally {
    exercise.solution = original;
  }
  assert.equal(policy.isGradingSuspended(exercise.course, exercise.id), false);
});

test('les exercices sans preuve montrent leur suspension dans le rendu', () => {
  const suspended = labs.renderSection('b1-python', 1);
  const approved = labs.renderSection('b1-git', 1);
  assert.match(suspended, /data-exercise="py-c1-e1"\s+data-grading-suspended="1"/);
  assert.match(suspended, /preuves de fiabilité des tests sont incomplètes ou périmées/);
  assert.doesNotMatch(approved, /data-grading-suspended="1"/);
});

test('les 289 fiches ont un inventaire individuel vérifié', () => {
  const script = path.join(__dirname, '../corrections/outils/verifier-preuves-prelot3.js');
  const report = execFileSync(process.execPath, [script], { encoding: 'utf8' }).trimEnd().split('\n');
  assert.equal(report.length, 290);
  assert.equal(report.slice(1).filter(line => line.split('\t')[2] === 'active').length, 62);
  assert.equal(report.slice(1).filter(line => line.split('\t')[2] === 'suspendue').length, 227);
});

test('l’API refuse une fiche sans preuve avant appel ou consommation du quota', async () => {
  const original = execution.execute;
  let calls = 0;
  execution.execute = async () => { calls++; throw new Error('Appel interdit'); };
  budget.reset();
  const app = buildApp({ logger: false });
  try {
    const response = await app.inject({
      method: 'POST', url: '/api/exercise/submit', remoteAddress: '10.41.0.1',
      payload: { exerciseId: 'py-c1-e1', code: 'print(0)' }
    });
    assert.equal(response.statusCode, 503);
    assert.equal(response.json().status, 'grading_suspended');
    assert.match(response.json().error, /preuves de fiabilité.*incomplètes ou périmées/);
    assert.equal(response.json().passed, undefined);
    assert.equal(calls, 0);
    assert.equal(budget.snapshot('ip:10.41.0.1').used, 0);
  } finally {
    execution.execute = original;
    budget.reset();
    await app.close();
  }
});
