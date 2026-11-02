'use strict';

const fs = require('node:fs');
const assert = require('node:assert/strict');
const { runTests } = require('/project/server/exercises/runner');

async function grade(row) {
  const exercise = {
    language: row.language,
    tests: [row.sample],
    verifyFirstExample: false,
    requiredShebang: row.requiredShebang || undefined
  };
  const report = await runTests(exercise, row.code, {
    execute: async () => ({ ok: true, status: 'success', stdout: row.stdout, stderr: '', exitCode: 0 })
  });
  if (!report.ok || report.error) return 'non_evalue';
  if (!report.stop && report.passed === 1 && report.total === 1) return 'accepte';
  if (report.stop && report.stop.reason === 'wrong_output') return 'mauvaise_sortie';
  if (report.stop && report.stop.reason === 'invalid_source') return 'source_invalide';
  return 'non_evalue';
}

async function main() {
  const base = { language: 'shell', code: 'echo a', sample: { stdin: '', expected: 'a' }, stdout: 'a\n' };
  assert.equal(await grade(base), 'accepte');
  assert.equal(await grade({ ...base, sample: { ...base.sample, mode: 'exact' } }), 'mauvaise_sortie');
  assert.equal(await grade({ ...base, requiredShebang: '#!/bin/bash' }), 'source_invalide');
  const data = JSON.parse(fs.readFileSync(0, 'utf8'));
  const states = [];
  for (const row of data.rows) {
    const exercise = data.exercises[row.exercise];
    const candidate = row.candidate < 0 ? exercise.solution : exercise.variants[row.candidate];
    states.push(await grade({
      language: exercise.language,
      code: candidate.code,
      requiredShebang: exercise.requiredShebang,
      sample: exercise.cases[row.case].sample,
      stdout: row.stdout
    }));
  }
  process.stdout.write(JSON.stringify({ selftests: 'reussis', states }));
}

main().catch(() => { process.stderr.write('Comparaison impossible.\n'); process.exitCode = 1; });
