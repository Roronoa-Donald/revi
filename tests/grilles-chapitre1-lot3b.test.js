'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const parse5 = require('parse5');
const catalogue = require('../server/exercises');
const { runTests } = require('../server/exercises/runner');
const { runAnalyse } = require('../server/services/execution/local-runner');

const courses = ['RD-RO', 'Cyber securite B2'];
const exercises = catalogue.listExercises().filter(item => courses.includes(item.course) && item.chapter === 1);
const text = node => node.nodeName === '#text' ? node.value : (node.childNodes || []).map(text).join(' ');
const normalize = value => value.replace(/\s+/gu, ' ').trim();
const execute = async ({ code, stdin }) => {
  const result = await runAnalyse(code, stdin);
  return { ok: result.ok, stdout: result.data.stdout };
};

test('les huit grilles ne placent pas les attendus littéraux dans les éléments publics', () => {
  assert.equal(exercises.length, 8);
  for (const exercise of exercises) {
    const visible = catalogue.toClient(exercise);
    assert.equal(visible.language, 'analyse');
    assert.equal(Object.hasOwn(visible, 'tests'), false);
    assert.equal(Object.hasOwn(visible, 'solution'), false);
    assert.ok(visible.examples.every(example => Object.keys(example).every(key => key === 'stdin')));
    const fields = [text(parse5.parseFragment(visible.brief)), visible.starter, ...visible.hints];
    for (const expected of [...exercise.tests, ...exercise.examples].map(item => normalize(item.expected))) {
      for (const field of fields) assert.equal(normalize(field).includes(expected), false, `${exercise.id}: attendu littéral visible`);
    }
  }
});

test('chaque cas accepte le corrigé et rejette deux sorties incorrectes', async () => {
  for (const exercise of exercises) {
    for (const item of exercise.tests) {
      const selected = { ...exercise, tests: [item] };
      const expectedReport = await runTests(selected, exercise.solution, { execute });
      assert.equal(expectedReport.passed, 1, `${exercise.id} ${item.stdin}: corrigé refusé`);
      const caseNumber = item.stdin.match(/^cas:(\d+)$/)?.[1];
      assert.ok(caseNumber, `${exercise.id}: cas non reconnu`);
      for (const wrong of ['REPONSE INCORRECTE', 'INDETERMINE_INCORRECT']) {
        const report = await runTests(selected, `[Cas ${caseNumber}]\n${wrong}`, { execute });
        assert.equal(report.passed, 0, `${exercise.id} ${item.stdin}: variante acceptée`);
        assert.equal(report.stop?.reason, 'wrong_output');
      }
    }
  }
});
