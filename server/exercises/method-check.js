'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { randomBytes } = require('node:crypto');
const { LIMITS } = require('../services/execution');

const methodExercises = Object.freeze(['algo-c6-e3', 'algo-c9-e1', 'algo-c9-e3', 'algo-c10-e3']);
const template = fs.readFileSync(path.join(__dirname, 'method-probe.py'), 'utf8');

function buildMethodProbe(exerciseId, code, seed = randomBytes(16).toString('hex'), stdin) {
  if (!methodExercises.includes(exerciseId) || typeof code !== 'string') throw new TypeError('Méthode inconnue.');
  if (!/^[a-f0-9]{32}$/.test(seed)) throw new TypeError('Graine invalide.');
  if (stdin !== undefined && typeof stdin !== 'string') throw new TypeError('Entrée invalide.');
  const source = Buffer.from(code, 'utf8').toString('base64');
  const input = Buffer.from(stdin || '', 'utf8').toString('base64');
  const probe = `REVI_EXERCISE=${JSON.stringify(exerciseId)}\nREVI_SOURCE=${JSON.stringify(source)}\n` +
    `REVI_SEED=${JSON.stringify(seed)}\nREVI_HAS_INPUT=${stdin === undefined ? 'False' : 'True'}\n` +
    `REVI_INPUT=${JSON.stringify(input)}\n${template}`;
  if (Buffer.byteLength(probe, 'utf8') > LIMITS.code) return null;
  return probe;
}

async function checkMethod(exerciseId, code, execute, stdin, seed) {
  const probe = buildMethodProbe(exerciseId, code, seed, stdin);
  if (!probe) return { status: 'not_evaluable' };
  const outcome = await execute({ language: 'python', code: probe, stdin: '' });
  if (!outcome.ok) return { status: 'unavailable' };
  let report;
  try { report = JSON.parse(outcome.stdout); }
  catch { return { status: 'unavailable' }; }
  if (report?.schema !== 'revi-methode-v1' || !['verified', 'not_evaluable'].includes(report.status)) {
    return { status: 'unavailable' };
  }
  if (report.status === 'verified' && stdin !== undefined && typeof report.output !== 'string') {
    return { status: 'unavailable' };
  }
  return report;
}

module.exports = { methodExercises, buildMethodProbe, checkMethod };
