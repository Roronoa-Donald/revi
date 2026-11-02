'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { runTests } = require('../server/exercises/runner');
const { runAnalyse } = require('../server/services/execution/local-runner');

const execute = async ({ code, stdin }) => {
  const result = await runAnalyse(code, stdin);
  return { ok: result.ok, stdout: result.data.stdout };
};

test('le cadre juridique recommande une autorisation sans promettre une immunité', () => {
  const chapter = require('../server/content/b3-hacking/chapitre1');
  const legal = chapter.sections.find(section => section.title.includes('Juridique')).html;
  const question = chapter.questions.find(item => item.stem.includes('risque juridique'));
  const card = chapter.flashcards.find(item => item.q.includes('Quelle infraction pénale sanctionne'));
  assert.match(legal, /autorisation écrite préalable/i);
  assert.match(legal, /ne garantit pas à elle seule/i);
  assert.doesNotMatch(legal, /strictement obligatoire avant tout envoi de sonde/i);
  assert.doesNotMatch(legal, /sans autorisation préalable constituent des délits/i);
  assert.ok(question);
  assert.match(question.exp, /ne garantit pas à elle seule/i);
  assert.doesNotMatch(card.a, /3 à 5 ans|100 000 à 150 000/);
  assert.match(card.a, /circonstances/i);
  assert.match(chapter.pitfalls.join(' '), /autorisation préalable par écrit/i);
  assert.match(chapter.pitfalls.join(' '), /qualification pénale dépend des faits/i);
  assert.doesNotMatch(chapter.pitfalls.join(' '), /délit pénal art\. 323-1/i);
  const exam = fs.readFileSync(path.join(__dirname, '../b3-hacking/chapitres/examens.html'), 'utf8');
  assert.doesNotMatch(exam, /un ordre oral n.a aucune valeur exonératoire/i);
  assert.match(exam, /ne garantit pas à elle seule/i);
});

test('le budget SLO ne confond pas contrat et objectif et exclut la division par zéro', async () => {
  const item = require('../server/exercises/b3-supervision').find(entry => entry.id === 'sup3-c1-e3');
  const copy = require('../server/exercises/b3-supervision/chapitre1').find(entry => entry.id === item.id);
  assert.deepEqual(copy, item);
  assert.match(item.brief, /SLO.{0,70}strictement inférieur à 100/i);
  assert.match(item.brief, /SLA.{0,70}contractuel/i);
  assert.match(item.brief, /pourcentage.{0,70}non défini/i);
  assert.doesNotMatch(item.brief, /ou 0\.0% si autorisé est nul/i);
  const correct = await runTests(item, item.solution, { execute });
  assert.equal(correct.passed, 3);
  assert.equal(correct.total, 3);
  for (const mutant of [
    item.solution.replace('consumed_pct=115.74%', 'consumed_pct=0.00%'),
    item.solution.replace('remaining_min=0.0 consumed_pct=100.00% status=COMPLIANT', 'remaining_min=0.0 consumed_pct=100.00% status=BREACHED')
  ]) {
    const report = await runTests(item, mutant, { execute });
    assert.equal(report.total, 3);
    assert.ok(report.passed < report.total);
  }
});
