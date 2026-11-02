'use strict';

const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const test = require('node:test');
const jwt = require('jsonwebtoken');
const { buildApp } = require('../server/app');
const catalogue = require('../server/exercises');
const execution = require('../server/services/execution');
const budget = require('../server/services/execution/budget');
const { methodExercises } = require('../server/exercises/method-check');

function isolatedProvider(payload) {
  const child = spawnSync('/usr/bin/bwrap', [
    '--die-with-parent', '--unshare-all', '--new-session', '--clearenv', '--cap-drop', 'ALL',
    '--ro-bind', '/usr', '/usr', '--symlink', 'usr/bin', '/bin', '--symlink', 'usr/lib', '/lib',
    '--symlink', 'usr/lib', '/lib64', '--dir', '/etc', '--ro-bind', '/etc/ld.so.cache', '/etc/ld.so.cache',
    '--proc', '/proc', '--dev', '/dev', '--tmpfs', '/tmp', '--chdir', '/tmp',
    '/usr/bin/python3', '-I', '-B', '-c', payload.code
  ], { input: payload.stdin, encoding: 'utf8', timeout: 10000, maxBuffer: 1024 * 1024 });
  if (child.error) throw child.error;
  return { ok: child.status === 0, status: child.status === 0 ? 'success' : 'runtime_error',
    stdout: child.stdout || '', stderr: child.stderr || '', exitCode: child.status };
}

test('les quatre corrigés réussissent par l’API isolée et les échecs ne reçoivent pas de note', async () => {
  const names = ['JWT_SECRET', 'EXEC_DAILY_LIMIT_PER_USER', 'EXEC_DAILY_LIMIT_GLOBAL'];
  const previous = Object.fromEntries(names.map(name => [name, process.env[name]]));
  const original = execution.execute;
  process.env.JWT_SECRET = 'session-synthetique-prelot3-api';
  process.env.EXEC_DAILY_LIMIT_PER_USER = '1000';
  process.env.EXEC_DAILY_LIMIT_GLOBAL = '2000';
  budget.reset();
  let calls = 0;
  execution.execute = async payload => { calls++; return isolatedProvider(payload); };
  const app = buildApp({ logger: false });
  const token = jwt.sign({ userId: 'controle-api-methodes' }, process.env.JWT_SECRET);
  let request = 0;
  const submit = (exerciseId, code) => app.inject({
    method: 'POST', url: '/api/exercise/submit', remoteAddress: `10.43.0.${++request}`,
    cookies: { auth_token: token }, payload: { exerciseId, code }
  });
  try {
    for (const id of methodExercises) {
      const item = catalogue.getExercise(id);
      const before = calls;
      const response = await submit(id, item.solution);
      assert.equal(response.statusCode, 200, `${id}: ${response.body}`);
      const result = response.json();
      assert.ok(result.total >= 2, id);
      assert.equal(result.passed, result.total, id);
      assert.equal(result.stop, null, id);
      assert.equal(calls - before, result.total, id);
      assert.ok(result.results.every(entry => /^Test caché \d+$/.test(entry.label) && entry.ok), id);
    }

    const unevaluable = await submit(methodExercises[0], 'import os\nprint(1)');
    assert.equal(unevaluable.statusCode, 422);
    assert.equal(unevaluable.json().status, 'method_not_evaluable');
    assert.equal(unevaluable.json().passed, undefined);
    assert.equal(unevaluable.json().total, undefined);

    execution.execute = async () => ({ ok: true, status: 'success', stdout: '{}' });
    const unavailable = await submit(methodExercises[0], catalogue.getExercise(methodExercises[0]).solution);
    assert.equal(unavailable.statusCode, 503);
    assert.equal(unavailable.json().status, 'api_error');
    assert.equal(unavailable.json().passed, undefined);
    assert.equal(unavailable.json().total, undefined);
  } finally {
    execution.execute = original;
    budget.reset();
    await app.close();
    for (const [name, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[name];
      else process.env[name] = value;
    }
  }
});
