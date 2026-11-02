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

test('F129 : la convention imposée distingue une règle de grille des choix compatibles', async () => {
  const item = require('../server/exercises/b1-ccna1').find(entry => entry.id === 'cc-c1-e3');
  assert.match(item.brief, /convention (?:de|propre à) (?:la grille|cet exercice)/i);
  assert.match(item.brief, /100m.{0,45}cat5/i);
  assert.match(item.brief, /1g.{0,45}cat5e/i);
  assert.match(item.brief, /10g.{0,45}cat6a/i);
  assert.match(item.brief, /catégories supérieures.{0,70}(?:adaptées|convenir)/i);
  const report = await runTests(item, item.solution, { execute });
  assert.equal(report.passed, 3);
  assert.equal(report.total, 3);
  const alternative = item.solution.replace('cafe : cat5\n', 'cafe : cat5e\n');
  const rejected = await runTests(item, alternative, { execute });
  assert.equal(rejected.passed, 2);
  const page = fs.readFileSync(path.join(__dirname, '../b1-ccna1/chapitres/chapitre1.html'), 'utf8');
  assert.match(page, /convention (?:de|propre à) (?:la grille|cet exercice)/i);
});

test('F191 : les signatures sont des indices et ne concluent pas à une commande saine', async () => {
  const item = require('../server/exercises/b3-hacking').find(entry => entry.id === 'hk3-c6-e2');
  const copy = require('../server/exercises/b3-hacking/chapitre6').find(entry => entry.id === item.id);
  assert.deepEqual(copy, item);
  assert.match(item.brief, /ne (?:prouve|permet)[^.]{0,100}(?:innocuit|malveillan|risque)/i);
  assert.doesNotMatch(JSON.stringify(item), /malicious=(?:TRUE|FALSE)|signature=CLEAN|risk=(?:LOW|CRITICAL)/);
  assert.deepEqual(item.tests.map(entry => entry.expected), [
    'PERSIST_RESULT: type=SERVICE malicious=NON_EVALUE signature=NETCAT_REVERSE_SHELL risk=NON_EVALUE',
    'PERSIST_RESULT: type=CRON malicious=NON_EVALUE signature=DOWNLOAD_EXECUTE risk=NON_EVALUE',
    'PERSIST_RESULT: type=CRON malicious=NON_EVALUE signature=AUCUNE_CORRESPONDANCE risk=NON_EVALUE'
  ]);
  const report = await runTests(item, item.solution, { execute });
  assert.equal(report.passed, 3);
  assert.equal(report.total, 3);
  const unsafe = item.solution.replace(
    'malicious=NON_EVALUE signature=AUCUNE_CORRESPONDANCE risk=NON_EVALUE',
    'malicious=FALSE signature=CLEAN risk=LOW'
  );
  const rejected = await runTests(item, unsafe, { execute });
  assert.equal(rejected.passed, 2);
  const page = fs.readFileSync(path.join(__dirname, '../b3-hacking/chapitres/chapitre6.html'), 'utf8');
  assert.match(page, /signature=AUCUNE_CORRESPONDANCE/);
  assert.doesNotMatch(page, /signature=CLEAN/);
});
