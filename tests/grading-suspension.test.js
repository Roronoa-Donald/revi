'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const parse5 = require('parse5');
const jwt = require('jsonwebtoken');
const { buildApp } = require('../server/app');
const catalogue = require('../server/exercises');
const policy = require('../server/exercises/grading-policy');
const execution = require('../server/services/execution');
const budget = require('../server/services/execution/budget');

function elements(node, predicate, matches = []) {
  if (predicate(node)) matches.push(node);
  for (const child of node.childNodes || []) elements(child, predicate, matches);
  return matches;
}

function attribute(node, name) {
  return (node.attrs || []).find(item => item.name === name)?.value;
}

test('les exercices concernés affichent la suspension issue de la politique serveur', () => {
  const exercises = catalogue.listExercises().filter(exercise => policy.isGradingSuspended(exercise.course, exercise.id));
  assert.equal(exercises.length, 354);
  for (const exercise of exercises) {
    const file = path.join(__dirname, '..', exercise.course, 'chapitres', `chapitre${exercise.chapter}.html`);
    const document = parse5.parse(fs.readFileSync(file, 'utf8'));
    const labs = elements(document, node => attribute(node, 'data-exercise') === exercise.id);
    assert.equal(labs.length, 1, exercise.id);
    assert.equal(attribute(labs[0], 'data-grading-suspended'), '1', exercise.id);
    const badges = elements(labs[0], node => (attribute(node, 'class') || '').split(/\s+/).includes('lab__training'));
    assert.ok(badges.some(node => parse5.serialize(node).includes('Entraînement, non noté')), exercise.id);
    const notices = elements(labs[0], node => attribute(node, 'id') === `${exercise.id}-grading-notice`);
    assert.equal(notices.length, 1, exercise.id);
    assert.match(parse5.serialize(notices[0]), /correction automatique.*suspendue/i, exercise.id);
  }
});

test('le serveur refuse les soumissions suspendues sans exécution ni consommation de quota', async () => {
  process.env.JWT_SECRET = process.env.JWT_SECRET || 'secret-test-suspension';
  const token = jwt.sign({ userId: 'suspension-test' }, process.env.JWT_SECRET);
  const originalExecute = execution.execute;
  let calls = 0;
  execution.execute = async () => { calls++; throw new Error('exécution interdite'); };
  budget.reset();
  const app = buildApp({ logger: false });
  try {
    const exercises = catalogue.listExercises().filter(exercise => policy.isGradingSuspended(exercise.course, exercise.id));
    for (const [index, exercise] of exercises.entries()) {
      const response = await app.inject({
        method: 'POST',
        url: '/api/exercise/submit',
        remoteAddress: `10.10.${Math.floor(index / 250)}.${index % 250 + 1}`,
        cookies: { auth_token: token },
        payload: { exerciseId: exercise.id, code: 'solution' }
      });
      assert.equal(response.statusCode, 503, exercise.id);
      assert.equal(response.json().status, 'grading_suspended', exercise.id);
      assert.equal(response.json().error, policy.gradingSuspensionMessage(exercise.course, exercise.id), exercise.id);
      assert.equal(response.json().passed, undefined, exercise.id);
    }
    assert.equal(calls, 0);
    assert.equal(budget.snapshot('u:suspension-test').used, 0);
  } finally {
    execution.execute = originalExecute;
    budget.reset();
    await app.close();
  }
});

test('la suspension conserve le contrôle d’accès aux chapitres protégés', async () => {
  const app = buildApp({ logger: false });
  try {
    const response = await app.inject({
      method: 'POST',
      url: '/api/exercise/submit',
      payload: { exerciseId: 'csb2-c2-e1', code: 'solution' }
    });
    assert.equal(response.statusCode, 401);
  } finally {
    await app.close();
  }
});

test('la politique distingue le cours de la preuve de chaque exercice', () => {
  assert.equal(policy.isGradingSuspended('b1-python'), false);
  assert.equal(policy.isGradingSuspended('b1-python', 'py-c1-e1'), true);
  assert.equal(policy.isGradingSuspended('b1-git', 'gt-c1-e1'), false);
  const document = parse5.parse(fs.readFileSync(path.join(__dirname, '..', 'b1-git', 'chapitres', 'chapitre1.html'), 'utf8'));
  const labs = elements(document, node => attribute(node, 'data-exercise') === 'gt-c1-e1');
  assert.equal(labs.length, 1);
  assert.equal(attribute(labs[0], 'data-grading-suspended'), undefined);
});
