'use strict';

if (require('./lot1-sandbox').runInsideIsolatedOrRegister(__filename)) {

const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const catalogue = require('../server/exercises');
const { runTests } = require('../server/exercises/runner');

function execute(code, stdin) {
  const result = spawnSync('/bin/bash', ['-c', code], {
    input: stdin, encoding: 'utf8', timeout: 5000, maxBuffer: 65536,
    env: { PATH: '/usr/bin:/bin', LANG: 'C.UTF-8' }, cwd: '/tmp'
  });
  return {
    ok: result.status === 0, status: result.status === 0 ? 'success' : 'runtime_error',
    stdout: result.stdout || '', stderr: result.stderr || result.error?.message || '', exitCode: result.status
  };
}

function runGit(directory, args) {
  const result = spawnSync('/usr/bin/git', args, {
    cwd: directory, encoding: 'utf8', timeout: 5000,
    env: { PATH: '/usr/bin:/bin', LANG: 'C.UTF-8', GIT_CONFIG_NOSYSTEM: '1', GIT_CONFIG_GLOBAL: '/dev/null' }
  });
  assert.equal(result.status, 0, result.stderr || result.error?.message);
  return result.stdout;
}

test('le maximum exige une série non vide et distingue les bornes négatives', async () => {
  const exercise = catalogue.getExercise('lx2-c5-e2');
  assert.match(exercise.brief, /n\s*≥\s*1/);
  for (const [input, expected] of [['1\n-7\n', 'max : -7\n'], ['3\n-9\n-2\n-5\n', 'max : -2\n']]) {
    const result = execute(exercise.solution, input);
    assert.equal(result.ok, true, result.stderr);
    assert.equal(result.stdout, expected);
  }
  const initialZero = exercise.solution.replace('read -r max', 'read -r premier\nmax=0\nif [ "$premier" -gt 0 ]; then max="$premier"; fi');
  const minimum = exercise.solution.replace('[ "$v" -gt "$max" ]', '[ "$v" -lt "$max" ]');
  for (const variant of [initialZero, minimum]) {
    assert.notEqual(variant, exercise.solution);
    const report = await runTests(exercise, variant, { execute: payload => execute(payload.code, payload.stdin) });
    assert.equal(report.stop?.reason, 'wrong_output', JSON.stringify(report));
  }
});

test('la simulation conserve simultanément index et modifications comme Git', async () => {
  const exercise = catalogue.getExercise('gt-c1-e3');
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'git-novice-lot1-'));
  try {
    runGit(directory, ['init', '-q']);
    fs.writeFileSync(path.join(directory, 'main.py'), 'première version\n');
    runGit(directory, ['add', 'main.py']);
    fs.appendFileSync(path.join(directory, 'main.py'), 'modification\n');
    assert.match(runGit(directory, ['status', '--porcelain=v1', '--', 'main.py']), /^AM main\.py\n$/);
    const input = '4\ncree main.py\nadd main.py\nmodifie main.py\nstatus\n';
    const result = execute(exercise.solution, input);
    assert.equal(result.ok, true, result.stderr);
    assert.equal(result.stdout, 'non suivis : 0\nmodifies : 1\nindexes : 1\n');
    runGit(directory, ['add', 'main.py']);
    assert.match(runGit(directory, ['status', '--porcelain=v1', '--', 'main.py']), /^A  main\.py\n$/);
    const refreshed = execute(exercise.solution, '5\ncree main.py\nadd main.py\nmodifie main.py\nadd main.py\nstatus\n');
    assert.equal(refreshed.stdout, 'non suivis : 0\nmodifies : 0\nindexes : 1\n');
    fs.writeFileSync(path.join(directory, 'notes.txt'), 'non suivi\n');
    fs.appendFileSync(path.join(directory, 'notes.txt'), 'modification\n');
    assert.match(runGit(directory, ['status', '--porcelain=v1', '--', 'notes.txt']), /^\?\? notes\.txt\n$/);
    const untracked = execute(exercise.solution, '3\ncree notes.txt\nmodifie notes.txt\nstatus\n');
    assert.equal(untracked.stdout, 'non suivis : 1\nmodifies : 0\nindexes : 0\n');
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
  const report = await runTests(exercise, exercise.solution, { execute: payload => execute(payload.code, payload.stdin) });
  assert.equal(report.stop, null, JSON.stringify(report));
  assert.equal(report.passed, exercise.tests.length);
});

test('les confusions entre catégories et fichiers non suivis sont rejetées', async () => {
  const exercise = catalogue.getExercise('gt-c1-e3');
  const exclusive = exercise.solution.replace('modifies=$((modifies + 1))', 'modifies=$((modifies + 1))\n      indexes=$((indexes - 1))');
  const modifiedUntracked = exercise.solution.replace(
    '[ "$courant" = "indexe" ] && [ "${modification[$fichier]:-0}" = "0" ]',
    '[ -n "$courant" ] && [ "${modification[$fichier]:-0}" = "0" ]'
  );
  for (const variant of [exclusive, modifiedUntracked]) {
    assert.notEqual(variant, exercise.solution);
    const report = await runTests(exercise, variant, { execute: payload => execute(payload.code, payload.stdin) });
    assert.equal(report.stop?.reason, 'wrong_output', JSON.stringify(report));
  }
});

}
