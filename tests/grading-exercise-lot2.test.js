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

const targets = ['algo-c9-e2'];
const walk = node => [node, ...(node.childNodes || []).flatMap(walk)];
const attr = (node, name) => (node.attrs || []).find(attribute => attribute.name === name)?.value;

test('la recherche dichotomique reste suspendue tant que sa méthode n’est pas contrôlée', () => {
  assert.equal(policy.isGradingSuspended('b1-algo'), false);
  assert.equal(policy.isGradingSuspended(undefined), false);
  assert.equal(policy.isGradingSuspended('b1-algo', 'algo-c6-e2'), true);
  assert.equal(policy.isGradingSuspended('b1-python', 'algo-c9-e1'), true);
  for (const id of targets) assert.equal(policy.isGradingSuspended('b1-algo', id), true, id);
});

test('chaque exercice suspendu affiche la raison et désactive la validation', () => {
  for (const id of targets) {
    const exercise = catalogue.getExercise(id);
    const file = path.join(__dirname, '..', exercise.course, 'chapitres', `chapitre${exercise.chapter}.html`);
    const document = parse5.parse(fs.readFileSync(file, 'utf8'));
    const labs = walk(document).filter(node => attr(node, 'data-exercise') === id);
    assert.equal(labs.length, 1, id);
    assert.equal(attr(labs[0], 'data-grading-suspended'), '1', id);
    const notice = walk(labs[0]).find(node => attr(node, 'id') === `${id}-grading-notice`);
    assert.ok(notice, id);
    assert.match(parse5.serialize(notice), /correction automatique.*suspendue.*méthode/i, id);
  }
});

test('l’API refuse la recherche dichotomique sans exécution ni quota', async () => {
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
      const response = await app.inject({
        method: 'POST', url: '/api/exercise/submit', remoteAddress: `10.40.0.${index + 1}`,
        cookies: { auth_token: token }, payload: { exerciseId: id, code: 'print(0)' }
      });
      assert.equal(response.statusCode, 503, id);
      assert.equal(response.json().status, 'grading_suspended', id);
      assert.match(response.json().error, /correction automatique.*suspendue.*méthode/i, id);
      assert.equal(response.json().passed, undefined, id);
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
