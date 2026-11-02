'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const parse5 = require('parse5');
const chapter = require('../server/content/b3-reseau-lan/chapitre5');
const { runTests } = require('../server/exercises/runner');
const { runAnalyse } = require('../server/services/execution/local-runner');

const descendants = node => [node, ...(node.childNodes || []).flatMap(descendants)];
const plain = html => descendants(parse5.parseFragment(html)).filter(node => node.nodeName === '#text')
  .map(node => node.value).join(' ').replace(/\s+/g, ' ');
const execute = async ({ code, stdin }) => {
  const result = await runAnalyse(code, stdin);
  return { ok: result.ok, stdout: result.data.stdout };
};

test('DAI et IP Source Guard : les réponses incluent les règles statiques applicables', () => {
  const question = chapter.questions.find(item => /Dynamic ARP Inspection/.test(item.stem));
  const sourceGuard = chapter.questions.find(item => /quelle technologie.*filtrer.*adresse IP source/i.test(item.stem));
  const card = chapter.flashcards.find(item => /Dynamic ARP Inspection/.test(item.q));
  assert.ok(question && sourceGuard && card);
  assert.match(question.opts[question.correct] + ' ' + question.exp + ' ' + card.a, /ACL ARP/i);
  assert.match(sourceGuard.exp, /liaisons? statiques?/i);
  assert.match(chapter.summary.join(' ') + ' ' + chapter.checklist.join(' '), /ACL ARP/i);
  assert.doesNotMatch(chapter.pitfalls.join(' '), /bloquant l’ensemble du trafic légitime/i);
  const page = fs.readFileSync(path.join(__dirname, '../b3-reseau-lan/chapitres/chapitre5.html'), 'utf8');
  assert.match(plain(page), /ACL ARP/i);
});

test('La grille DAI sépare écart de liaison et preuve d’une attaque', async () => {
  const item = require('../server/exercises/b3-reseau-lan').find(entry => entry.id === 'lan3-c5-e3');
  const copy = require('../server/exercises/b3-reseau-lan/chapitre5').find(entry => entry.id === item.id);
  assert.deepEqual(copy, item);
  assert.match(item.brief, /(?:ne prouve pas|ne démontre pas)[^.]{0,80}(?:attaque|usurpation)/i);
  assert.match(item.brief, /(?:ACL ARP|règles statiques)/i);
  assert.doesNotMatch(JSON.stringify(item), /usurpation d'IP avérée|ARP_SPOOFING_DETECTED|intercepter tout le trafic/i);
  assert.match(item.tests[0].expected, /status=DENY action=DROP_ALERT reason=BINDING_MISMATCH/);
  const report = await runTests(item, item.solution, { execute });
  assert.equal(report.passed, 3);
  const mutant = item.solution.replaceAll('reason=BINDING_MISMATCH', 'reason=BINDING_MATCH');
  const rejected = await runTests(item, mutant, { execute });
  assert.ok(rejected.passed < rejected.total);
});
