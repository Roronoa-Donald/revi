'use strict';

const test = require('node:test');
const assert = require('node:assert');
const piston = require('../server/services/execution/piston');
const execution = require('../server/services/execution');

test('piston : configuration par PISTON_URL', () => {
  const oldUrl = process.env.PISTON_URL;
  delete process.env.PISTON_URL;
  assert.strictEqual(piston.isConfigured(), false);

  process.env.PISTON_URL = 'https://piston.example.com';
  assert.strictEqual(piston.isConfigured(), true);
  assert.strictEqual(piston.baseUrl(), 'https://piston.example.com');

  if (oldUrl) process.env.PISTON_URL = oldUrl;
  else delete process.env.PISTON_URL;
});

test('piston : résolution d’endpoint robuste', () => {
  const oldUrl = process.env.PISTON_URL;

  process.env.PISTON_URL = 'http://127.0.0.1:2000';
  assert.strictEqual(piston.endpointUrl('/execute'), 'http://127.0.0.1:2000/api/v2/execute');
  assert.strictEqual(piston.endpointUrl('runtimes'), 'http://127.0.0.1:2000/api/v2/runtimes');

  process.env.PISTON_URL = 'http://127.0.0.1:2000/api/v2';
  assert.strictEqual(piston.endpointUrl('/execute'), 'http://127.0.0.1:2000/api/v2/execute');

  process.env.PISTON_URL = 'https://emkc.org/api/v2/piston';
  assert.strictEqual(piston.endpointUrl('/execute'), 'https://emkc.org/api/v2/piston/execute');
  assert.strictEqual(piston.endpointUrl('/runtimes'), 'https://emkc.org/api/v2/piston/runtimes');

  if (oldUrl) process.env.PISTON_URL = oldUrl;
  else delete process.env.PISTON_URL;
});

test('piston : mapping des langages et fichiers', () => {
  assert.strictEqual(piston.PISTON_LANG_MAP.shell, 'bash');
  assert.strictEqual(piston.PISTON_LANG_MAP.cpp, 'c++');
  assert.strictEqual(piston.PISTON_LANG_MAP.sql, 'sqlite3');
  assert.strictEqual(piston.PISTON_LANG_MAP.powershell, 'powershell');
  assert.strictEqual(piston.LANG_EXT_MAP.c, 'c');
  assert.strictEqual(piston.LANG_EXT_MAP.java, 'java');
  assert.strictEqual(piston.LANG_EXT_MAP.powershell, 'ps1');
});

test('piston : sélection dynamique du provider', () => {
  const oldPiston = process.env.PISTON_URL;
  const oldOanor = process.env.OANOR_API_KEY;

  delete process.env.PISTON_URL;
  delete process.env.OANOR_API_KEY;
  // Ni l'un ni l'autre : repli oanor pour compatibilité des tests existants
  assert.strictEqual(execution.getProvider().PROVIDER_NAME, 'oanor');

  process.env.PISTON_URL = 'https://piston.example.com';
  assert.strictEqual(execution.getProvider().PROVIDER_NAME, 'piston');
  assert.strictEqual(execution.provider, 'piston');

  // Si les deux sont présents, Piston prime
  process.env.OANOR_API_KEY = 'cle_oanor';
  assert.strictEqual(execution.getProvider().PROVIDER_NAME, 'piston');

  delete process.env.PISTON_URL;
  assert.strictEqual(execution.getProvider().PROVIDER_NAME, 'oanor');

  if (oldPiston) process.env.PISTON_URL = oldPiston;
  else delete process.env.PISTON_URL;
  if (oldOanor) process.env.OANOR_API_KEY = oldOanor;
  else delete process.env.OANOR_API_KEY;
});

test('piston : normalisation d’une exécution réussie', () => {
  const normalized = execution.normalizeResponse({
    ok: true,
    httpStatus: 200,
    data: {
      language: 'python',
      version: '3.10.0',
      run: {
        stdout: 'Résultat 42\n',
        stderr: '',
        code: 0,
        signal: null,
        output: 'Résultat 42\n'
      }
    }
  }, 'piston');

  assert.strictEqual(normalized.provider, 'piston');
  assert.strictEqual(normalized.ok, true);
  assert.strictEqual(normalized.status, 'success');
  assert.strictEqual(normalized.stdout, 'Résultat 42\n');
  assert.strictEqual(normalized.exitCode, 0);
  assert.strictEqual(normalized.stderr, '');
});

test('piston : normalisation d’une erreur de compilation (C/C++/Java)', () => {
  const normalized = execution.normalizeResponse({
    ok: true,
    httpStatus: 200,
    data: {
      language: 'c',
      version: '10.2.0',
      compile: {
        stdout: '',
        stderr: 'main.c:2:1: error: expected identifier\n',
        code: 1,
        signal: null,
        output: 'main.c:2:1: error: expected identifier\n'
      }
    }
  }, 'piston');

  assert.strictEqual(normalized.provider, 'piston');
  assert.strictEqual(normalized.ok, false);
  assert.strictEqual(normalized.status, 'compile_error');
  assert.ok(normalized.compileError.includes('expected identifier'));
});

test('piston : normalisation d’une erreur d’exécution (code != 0)', () => {
  const normalized = execution.normalizeResponse({
    ok: true,
    httpStatus: 200,
    data: {
      language: 'bash',
      version: '5.2.0',
      run: {
        stdout: '',
        stderr: 'commande_inconnue: command not found\n',
        code: 127,
        signal: null,
        output: 'commande_inconnue: command not found\n'
      }
    }
  }, 'piston');

  assert.strictEqual(normalized.provider, 'piston');
  assert.strictEqual(normalized.ok, false);
  assert.strictEqual(normalized.status, 'runtime_error');
  assert.strictEqual(normalized.exitCode, 127);
  assert.ok(normalized.stderr.includes('command not found'));
});

test('piston : normalisation d’un timeout (SIGKILL)', () => {
  const normalized = execution.normalizeResponse({
    ok: true,
    httpStatus: 200,
    data: {
      language: 'python',
      version: '3.10.0',
      run: {
        stdout: '',
        stderr: '',
        code: null,
        signal: 'SIGKILL',
        output: 'Timed out'
      }
    }
  }, 'piston');

  assert.strictEqual(normalized.provider, 'piston');
  assert.strictEqual(normalized.ok, false);
  assert.strictEqual(normalized.status, 'runtime_error');
  assert.ok(normalized.stderr.includes('Timed out') || normalized.stderr.includes('SIGKILL'));
});

test('piston : message d’erreur API de l’instance (ex: whitelist ou non disponible)', () => {
  const normalized = execution.normalizeResponse({
    ok: true,
    httpStatus: 200,
    data: {
      message: 'Public Piston API is now whitelist only.'
    }
  }, 'piston');

  assert.strictEqual(normalized.status, 'api_error');
  assert.ok(normalized.userMessage.includes('whitelist only'));
});

test('piston : ne divulgue jamais les clés ou URLs privées dans la réponse', () => {
  process.env.PISTON_API_KEY = 'SECRET_PISTON_TOKEN_999';
  const normalized = execution.normalizeResponse({
    ok: true,
    httpStatus: 200,
    data: {
      language: 'bash',
      run: {
        stdout: 'ok\n',
        stderr: '',
        code: 0
      }
    }
  }, 'piston');

  const serialized = JSON.stringify(normalized);
  assert.ok(!serialized.includes('SECRET_PISTON_TOKEN_999'));
  delete process.env.PISTON_API_KEY;
});
