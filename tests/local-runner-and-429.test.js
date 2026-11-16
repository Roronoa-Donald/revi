'use strict';

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const jwt = require('jsonwebtoken');

process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-jwt-secret-local-runner-429';

const localRunner = require('../server/services/execution/local-runner');
const budget = require('../server/services/execution/budget');
const { buildApp } = require('../server/app');
const ExecutionInterface = require('../assets/js/engines/engine-interface');
const ServerEngine = require('../assets/js/engines/server-engine');

function makeUserCookie(userId = 606) {
  const token = jwt.sign({ userId, level: 'b2' }, process.env.JWT_SECRET);
  return { auth_token: token };
}

describe('Tâche 2.3 : Isolation worker_threads localRunner + séparation du budget externe', () => {
  test('une boucle infinie en pseudo-code (algo) est interrompue par timeout sans bloquer l’event loop Node', async () => {
    const infiniteAlgo = [
      'Algorithme Boucle',
      'Variables x : Entier',
      'Debut',
      '  x <- 1',
      '  TantQue x = 1 Faire',
      '    x <- 1',
      '  FinTantQue',
      'Fin'
    ].join('\n');

    let timerTicks = 0;
    const interval = setInterval(() => {
      timerTicks += 1;
    }, 40);

    const startedAt = Date.now();
    try {
      const res = await localRunner.run({
        language: 'algo',
        code: infiniteAlgo,
        stdin: '',
        timeoutMs: 350
      });
      const elapsed = Date.now() - startedAt;

      assert.ok(elapsed < 2500, `Le timeout aurait dû couper rapidement, écoulé: ${elapsed}ms`);
      assert.ok(elapsed < 120 || timerTicks >= 2, `L’event loop Node ne doit pas être bloqué (elapsed=${elapsed}ms, ticks=${timerTicks})`);
      assert.notEqual(res.data.exit_code, 0);
      assert.match(res.data.stderr, /boucle|délai|timeout/i);
    } finally {
      clearInterval(interval);
    }
  });

  test('une requête SQL récursive infinie est interrompue par timeout dans le worker SQL', async () => {
    const infiniteSql = 'WITH RECURSIVE cnt(x) AS (SELECT 1 UNION ALL SELECT x + 1 FROM cnt) SELECT MAX(x) FROM cnt;';

    let timerTicks = 0;
    const interval = setInterval(() => {
      timerTicks += 1;
    }, 40);

    const startedAt = Date.now();
    try {
      const res = await localRunner.run({
        language: 'sql',
        code: infiniteSql,
        stdin: '',
        timeoutMs: 350
      });
      const elapsed = Date.now() - startedAt;

      assert.ok(elapsed < 2500, `Le timeout SQL aurait dû couper rapidement, écoulé: ${elapsed}ms`);
      assert.ok(timerTicks >= 3, `L’event loop Node ne doit pas être bloqué (ticks=${timerTicks})`);
      assert.equal(res.data.status, 'timeout');
      assert.notEqual(res.data.exit_code, 0);
    } finally {
      clearInterval(interval);
    }
  });

  test('POST /api/exercise/submit sur un exercice local (algo) ne consomme pas le quota fournisseur externe', async (t) => {
    budget.reset();
    const app = buildApp({ logger: false });
    t.after(async () => {
      await app.close();
      budget.reset();
    });

    const userId = 606;
    const cookies = makeUserCookie(userId);
    const key = `user:${userId}`;
    const before = budget.snapshot(key).used;

    const res = await app.inject({
      method: 'POST',
      url: '/api/exercise/submit',
      cookies,
      payload: {
        exerciseId: 'al-c1-e1',
        code: 'Algorithme Test\nVariables a : Entier\nDebut\n  a <- 1\n  Ecrire(a)\nFin'
      }
    });

    assert.equal(res.statusCode, 200);
    const after = budget.snapshot(key).used;
    assert.equal(after, before, 'Un exercice local ne doit pas consommer le quota PISTON/OANOR');
  });
});

describe('Tâche 2.4 : Distinction HTTP 429 dans ServerEngine et ExecutionInterface', () => {
  test('ExecutionInterface.STATUS expose RATE_LIMITED et ServerEngine retourne RATE_LIMITED sur HTTP 429', async () => {
    assert.equal(ExecutionInterface.STATUS.RATE_LIMITED, 'rate_limited');

    const origFetch = global.fetch;
    global.fetch = async () => ({
      ok: false,
      status: 429,
      json: async () => ({
        error: 'Vous avez atteint votre nombre d’exécutions pour aujourd’hui.'
      })
    });

    try {
      const engine = new ServerEngine('/api/execute');
      const result = await engine.execute('python', 'print(1)', '');
      assert.equal(result.status, 'rate_limited');
      assert.match(result.userMessage, /atteint|aujourd’hui|limite/i);
      assert.match(result.stderr, /atteint|aujourd’hui|limite/i);
    } finally {
      global.fetch = origFetch;
    }
  });
});