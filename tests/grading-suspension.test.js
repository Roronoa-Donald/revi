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

const labs = require('../scripts/generate-code-labs');

test('aucun exercice n’est suspendu en production et le rendu affiche la suspension dès qu’une preuve manque', () => {
  const all = catalogue.listExercises();
  const suspended = all.filter(exercise => policy.isGradingSuspended(exercise.course, exercise.id));
  assert.equal(suspended.length, 0);

  for (const id of ['py-c1-e1', 'csb2-c1-e1', 'dk2-c1-e1', 'sql2-c1-e1']) {
    const exercise = catalogue.getExercise(id);
    const file = path.join(__dirname, '..', exercise.course, 'chapitres', `chapitre${exercise.chapter}.html`);
    const document = parse5.parse(fs.readFileSync(file, 'utf8'));
    const cards = elements(document, node => attribute(node, 'data-exercise') === exercise.id);
    assert.equal(cards.length, 1, exercise.id);
    assert.equal(attribute(cards[0], 'data-grading-suspended'), undefined, exercise.id);
  }

  const target = catalogue.getExercise('py-c1-e1');
  const original = target.solution;
  let rendered = '';
  try {
    target.solution = `${original}\n# mutation non prouvée`;
    rendered = labs.renderSection(target.course, target.chapter);
  } finally {
    target.solution = original;
  }
  const document = parse5.parse(rendered);
  const cards = elements(document, node => attribute(node, 'data-exercise') === target.id);
  assert.equal(cards.length, 1);
  assert.equal(attribute(cards[0], 'data-grading-suspended'), '1');
  const badges = elements(cards[0], node => (attribute(node, 'class') || '').split(/\s+/).includes('lab__training'));
  assert.ok(badges.some(node => parse5.serialize(node).includes('Entraînement, non noté')));
  const notices = elements(cards[0], node => attribute(node, 'id') === `${target.id}-grading-notice`);
  assert.equal(notices.length, 1);
  assert.match(parse5.serialize(notices[0]), /correction automatique.*suspendue/i);
});

test('le serveur refuse les soumissions mutées (sans preuve valide) sans exécution ni consommation de quota', async () => {
  process.env.JWT_SECRET = process.env.JWT_SECRET || 'secret-test-suspension';
  const token = jwt.sign({ userId: 'suspension-test' }, process.env.JWT_SECRET);
  const originalExecute = execution.execute;
  let calls = 0;
  execution.execute = async () => { calls++; throw new Error('exécution interdite'); };
  budget.reset();
  const app = buildApp({ logger: false });
  const sampleIds = ['py-c1-e1', 'csb2-c1-e1', 'dk2-c1-e1', 'lx3-c1-e1', 'gh3-c1-e1', 'sq-c1-e1', 'sql2-c1-e1', 'sql3-c1-e1'];
  try {
    for (const [index, id] of sampleIds.entries()) {
      const exercise = catalogue.getExercise(id);
      const original = exercise.solution;
      try {
        exercise.solution = `${original}\n/* mutation non prouvée */`;
        const response = await app.inject({
          method: 'POST',
          url: '/api/exercise/submit',
          remoteAddress: `10.10.0.${index + 1}`,
          cookies: { auth_token: token },
          payload: { exerciseId: exercise.id, code: 'solution' }
        });
        assert.equal(response.statusCode, 503, exercise.id);
        assert.equal(response.json().status, 'grading_suspended', exercise.id);
        assert.equal(response.json().error, policy.gradingSuspensionMessage(exercise.course, exercise.id), exercise.id);
        assert.equal(response.json().passed, undefined, exercise.id);
      } finally {
        exercise.solution = original;
      }
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
  assert.equal(policy.isGradingSuspended('b1-python', 'py-c1-e1'), false);
  assert.equal(policy.isGradingSuspended('b1-python', 'gt-c1-e1'), true);
  assert.equal(policy.isGradingSuspended('b1-git', 'gt-c1-e1'), false);
  const document = parse5.parse(fs.readFileSync(path.join(__dirname, '..', 'b1-git', 'chapitres', 'chapitre1.html'), 'utf8'));
  const labsEl = elements(document, node => attribute(node, 'data-exercise') === 'gt-c1-e1');
  assert.equal(labsEl.length, 1);
  assert.equal(attribute(labsEl[0], 'data-grading-suspended'), undefined);
});
