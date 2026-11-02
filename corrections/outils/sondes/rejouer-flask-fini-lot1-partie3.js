'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const root = path.resolve(__dirname, '../../..');
const sources = [
  'server/exercises/index.js',
  'server/exercises/runner.js',
  'server/exercises/api-rest-flask.js',
  'server/exercises/api-rest-flask/chapitre4.js',
  'server/exercises/rd_winserver/chapitre4.js',
  'server/services/execution/index.js',
  'tests/integrite-cas-lot1.test.js',
  'api-rest-flask/chapitres/chapitre4.html',
  'rd_winserver/chapitres/chapitre4.html'
];
const fingerprint = () => Object.fromEntries(sources.map(file => [file,
  crypto.createHash('sha256').update(fs.readFileSync(path.join(root, file))).digest('hex')]));
const before = fingerprint();
const registered = require(path.join(root, 'server/exercises')).getExercise('fl2-c4-e1');
const direct = require(path.join(root, 'server/exercises/api-rest-flask/chapitre4')).find(item => item.id === 'fl2-c4-e1');
assert.ok(registered && direct);
assert.equal(JSON.stringify({ solution: registered.solution, tests: registered.tests, examples: registered.examples,
  verifyFirstExample: registered.verifyFirstExample }),
JSON.stringify({ solution: direct.solution, tests: direct.tests, examples: direct.examples,
  verifyFirstExample: direct.verifyFirstExample }));

const result = spawnSync(process.execPath, ['--test', path.join(root, 'tests/integrite-cas-lot1.test.js')], {
  cwd: root, env: process.env, encoding: 'utf8', timeout: 180000, maxBuffer: 8 * 1024 * 1024
});
process.stderr.write(result.stdout || '');
process.stderr.write(result.stderr || '');
const output = String(result.stdout || '').replace(/\\n/g, '\n');
const labels = ['lecture associée à 204', 'succès associé à 201', '401 remplacé par 403', '403 remplacé par 401'];
const checks = labels.map(label => {
  const title = `fl2-c4-e1 : rejette ${label}`;
  const line = output.split('\n').find(value => value.includes(` - ${title}`));
  return { label, reussi: Boolean(line && /\bok \d+ - /.test(line) && !/\bnot ok\b|# SKIP/.test(line)) };
});
const reference = /ok \d+ - fl2-c4-e1 : corrigé, exemple, tests et huit scénarios annoncés/.test(output);
const grader = /ok \d+ - fl2-c4-e1 : le correcteur accepte tous les tests du corrigé/.test(output);
const after = fingerprint();
const stable = JSON.stringify(before) === JSON.stringify(after);
const valid = result.status === 0 && !result.error && stable && reference && grader && checks.every(check => check.reussi);
process.stdout.write(`${JSON.stringify({
  etat: valid ? 'réussi' : 'non évalué',
  id: 'fl2-c4-e1',
  node: process.version,
  code_sortie_banc: result.status,
  confinement: 'Le test lance les candidats Python dans bubblewrap sans réseau de l’hôte.',
  sources_stables: stable,
  empreintes_sources: before,
  huit_scenarios_specifies_conformes: reference,
  corrige_accepte_par_correcteur: grader,
  variantes: checks,
  limites: [
    'Les huit scénarios spécifiés sont déjà présents dans les exemples ou les tests ; aucune paire d’entrées inédites n’est revendiquée.',
    'Les quatre variantes ne couvrent pas toutes les erreurs possibles.'
  ]
}, null, 2)}\n`);
if (!valid) process.exitCode = 1;
