'use strict';

const fs = require('node:fs');
const vm = require('node:vm');

function extractFunction(source, name) {
  const marker = `function ${name}(`;
  const start = source.indexOf(marker);
  const end = source.indexOf('\n}\n', start);
  if (start < 0 || end < start || source.indexOf(marker, start + 1) !== -1) {
    throw new Error(`Fonction absente ou ambiguë : ${name}`);
  }
  return source.slice(start, end + 2);
}

const [executionSource, runnerSource] = process.argv.slice(2);
if (!executionSource || !runnerSource) throw new Error('Sources du comparateur requises');
const normalizeText = fs.readFileSync(executionSource, 'utf8');
const runnerText = fs.readFileSync(runnerSource, 'utf8');
const normalizeOutput = new vm.Script(`(${extractFunction(normalizeText, 'normalizeOutput')})`)
  .runInNewContext({}, { timeout: 1000 });
const matchOutputs = new vm.Script(`(${extractFunction(runnerText, 'matchOutputs')})`)
  .runInNewContext({ normalizeOutput }, { timeout: 1000 });
const input = JSON.parse(fs.readFileSync(0, 'utf8'));
const exercise = { language: 'shell' };
process.stdout.write(JSON.stringify({
  bytes_identiques: input.actual === input.expected,
  normalisation_identique: normalizeOutput(input.actual) === normalizeOutput(input.expected),
  moteur_mode_defaut: matchOutputs(input.actual, input.expected, {}, exercise),
  moteur_mode_exact: matchOutputs(input.actual, input.expected, { mode: 'exact' }, exercise),
}));
