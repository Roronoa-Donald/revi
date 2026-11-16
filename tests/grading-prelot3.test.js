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

test('la notation de code est active pour 100 % du catalogue vérifié (0 suspendu)', () => {
  const items = catalogue.listExercises();
  const code = items.filter(item => item.language !== 'analyse');
  const grids = items.filter(item => item.language === 'analyse');
  assert.equal(code.length, 420);
  assert.equal(grids.length, 848);
  assert.equal(code.filter(item => !policy.isGradingSuspended(item.course, item.id)).length, 420);
  assert.equal(code.filter(item => policy.isGradingSuspended(item.course, item.id)).length, 0);
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
  const approved = labs.renderSection('b1-python', 1);
  assert.doesNotMatch(approved, /data-grading-suspended="1"/);

  const exercise = catalogue.getExercise('py-c1-e1');
  const original = exercise.solution;
  let rendered = '';
  try {
    exercise.solution = `${original}\n# mutation non prouvée`;
    rendered = labs.renderSection('b1-python', 1);
  } finally {
    exercise.solution = original;
  }
  assert.match(rendered, /data-exercise="py-c1-e1"\s+data-grading-suspended="1"/);
  assert.match(rendered, /preuves de fiabilité des tests sont incomplètes ou périmées/);
});

test('les 420 fiches de code et les empreintes runtime ont une preuve à jour', () => {
  const evidence = require('../server/exercises/grading-evidence.json');
  const runtimeEvidence = require('../server/exercises/grading-runtime-evidence.json');
  const code = catalogue.listExercises().filter(item => item.language !== 'analyse');
  assert.equal(Object.keys(evidence).length, 420);
  assert.equal(code.length, 420);
  for (const ex of code) {
    assert.equal(evidence[ex.id], policy.exerciseFingerprint(ex), ex.id);
    assert.equal(policy.isGradingSuspended(ex.course, ex.id), false, ex.id);
  }
  assert.ok(runtimeEvidence.common && Object.keys(runtimeEvidence.common).length > 0);
  assert.ok(runtimeEvidence.method && Object.keys(runtimeEvidence.method).length > 0);
});

test('l’API refuse une fiche sans preuve (mutée) avant appel ou consommation du quota', async () => {
  const original = execution.execute;
  let calls = 0;
  execution.execute = async () => { calls++; throw new Error('Appel interdit'); };
  budget.reset();
  const exercise = catalogue.getExercise('py-c1-e1');
  const originalSolution = exercise.solution;
  const app = buildApp({ logger: false });
  try {
    exercise.solution = `${originalSolution}\n# mutation non prouvée`;
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
    exercise.solution = originalSolution;
    execution.execute = original;
    budget.reset();
    await app.close();
  }
});
