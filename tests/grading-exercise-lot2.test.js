'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const parse5 = require('parse5');
const jwt = require('jsonwebtoken');
const { buildApp } = require('../server/app');
const catalogue = require('../server/exercises');
const policy = require('../server/exercises/grading-policy');
const execution = require('../server/services/execution');
const budget = require('../server/services/execution/budget');
const labs = require('../scripts/generate-code-labs');

const targets = ['algo-c9-e2'];
const walk = node => [node, ...(node.childNodes || []).flatMap(walk)];
const attr = (node, name) => (node.attrs || []).find(attribute => attribute.name === name)?.value;

test('la recherche dichotomique est active en production mais échoue en fail-closed sur mutation', () => {
  assert.equal(policy.isGradingSuspended('b1-algo'), false);
  assert.equal(policy.isGradingSuspended(undefined), false);
  assert.equal(policy.isGradingSuspended('b1-algo', 'algo-c6-e2'), false);
  assert.equal(policy.isGradingSuspended('b1-python', 'algo-c9-e1'), true);
  for (const id of targets) {
    assert.equal(policy.isGradingSuspended('b1-algo', id), false, id);
    const exercise = catalogue.getExercise(id);
    const original = exercise.solution;
    try {
      exercise.solution = `${original}\n// mutation non prouvée`;
      assert.equal(policy.isGradingSuspended('b1-algo', id), true, id);
    } finally {
      exercise.solution = original;
    }
    assert.equal(policy.isGradingSuspended('b1-algo', id), false, id);
  }
});

test('chaque exercice actif n’est plus suspendu dans le HTML, et affiche la suspension s’il perd sa preuve', () => {
  for (const id of targets) {
    const exercise = catalogue.getExercise(id);
    const file = path.join(__dirname, '..', exercise.course, 'chapitres', `chapitre${exercise.chapter}.html`);
    const document = parse5.parse(fs.readFileSync(file, 'utf8'));
    const cards = walk(document).filter(node => attr(node, 'data-exercise') === id);
    assert.equal(cards.length, 1, id);
    assert.equal(attr(cards[0], 'data-grading-suspended'), undefined, id);

    const original = exercise.solution;
    let rendered = '';
    try {
      exercise.solution = `${original}\n// mutation`;
      rendered = labs.renderSection(exercise.course, exercise.chapter);
    } finally {
      exercise.solution = original;
    }
    const suspDoc = parse5.parse(rendered);
    const suspCards = walk(suspDoc).filter(node => attr(node, 'data-exercise') === id);
    assert.equal(attr(suspCards[0], 'data-grading-suspended'), '1', id);
    const notice = walk(suspCards[0]).find(node => attr(node, 'id') === `${id}-grading-notice`);
    assert.ok(notice, id);
    assert.match(parse5.serialize(notice), /correction automatique.*suspendue/i, id);
  }
});

test('l’API refuse la recherche dichotomique lorsqu’elle est mutée (sans preuve) sans exécution ni quota', async () => {
  const previousSecret = process.env.JWT_SECRET;
  process.env.JWT_SECRET = 'session-test-lot2';
  const token = jwt.sign({ userId: 'test-methodes-lot2' }, process.env.JWT_SECRET);
  const originalExecute = execution.execute;
  let calls = 0;
  execution.execute = async () => {
    calls++;
    return { ok: true, status: 'success', stdout: '' };
  };
  budget.reset();
  const app = buildApp({ logger: false });
  try {
    for (const [index, id] of targets.entries()) {
      const exercise = catalogue.getExercise(id);
      const original = exercise.solution;
      try {
        exercise.solution = `${original}\n// mutation`;
        const response = await app.inject({
          method: 'POST', url: '/api/exercise/submit', remoteAddress: `10.40.0.${index + 1}`,
          cookies: { auth_token: token }, payload: { exerciseId: id, code: 'Algorithme test' }
        });
        assert.equal(response.statusCode, 503, id);
        assert.equal(response.json().status, 'grading_suspended', id);
        assert.match(response.json().error, /correction automatique.*suspendue/i, id);
        assert.equal(response.json().passed, undefined, id);
      } finally {
        exercise.solution = original;
      }
    }
    assert.equal(calls, 0);
    assert.equal(budget.snapshot('u:test-methodes-lot2').used, 0);
  } finally {
    execution.execute = originalExecute;
    budget.reset();
    if (previousSecret === undefined) delete process.env.JWT_SECRET;
    else process.env.JWT_SECRET = previousSecret;
    await app.close();
  }
});
