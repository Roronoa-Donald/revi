'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const childProcess = require('node:child_process');

const localRunner = require('../server/services/execution/local-runner');
const execution = require('../server/services/execution/index');

test('K1 — Suppression de l’exécution locale de shell et durcissement Fail-Closed', async (t) => {
  await t.test('canHandle(shell/bash/sh) vaut false et runShell n’existe plus', () => {
    assert.equal(localRunner.canHandle('shell'), false);
    assert.equal(localRunner.canHandle('bash'), false);
    assert.equal(localRunner.canHandle('sh'), false);
    assert.equal(localRunner.canHandle('csharp'), false);
    assert.equal(typeof localRunner.runShell, 'undefined');
  });

  await t.test('(a) Panne de Piston sur shell/csharp : aucun processus /bin/bash ou sh n’est lancé (espion child_process.spawn)', async () => {
    const spawned = [];
    const origSpawn = childProcess.spawn;
    childProcess.spawn = function (cmd, args, opts) {
      spawned.push({ cmd, args });
      return origSpawn.apply(this, arguments);
    };
    const prevPiston = process.env.PISTON_URL;
    process.env.PISTON_URL = 'http://127.0.0.1:1';
    try {
      await assert.rejects(
        () => execution.execute({ language: 'shell', code: 'echo PWNED', stdin: '' }, { allowLocal: true }),
        (err) => {
          const http = execution.errorToHttp(err);
          assert.match(http.message, /indisponible/i);
          return true;
        }
      );
      const bashCalls = spawned.filter(s => /bash|\bsh$/i.test(String(s.cmd)));
      assert.equal(bashCalls.length, 0, 'Aucun processus shell ne doit être lancé');
    } finally {
      childProcess.spawn = origSpawn;
      if (prevPiston === undefined) delete process.env.PISTON_URL;
      else process.env.PISTON_URL = prevPiston;
    }
  });

  await t.test('(b) Requête shell et csharp sans Piston configuré : renvoie l’erreur « indisponible », jamais de repli local', async () => {
    const prevPiston = process.env.PISTON_URL;
    const prevOanor = process.env.OANOR_API_KEY;
    delete process.env.PISTON_URL;
    delete process.env.OANOR_API_KEY;
    try {
      for (const lang of ['shell', 'csharp']) {
        await assert.rejects(
          () => execution.execute({ language: lang, code: 'echo test', stdin: '' }, { allowLocal: true }),
          (err) => {
            const http = execution.errorToHttp(err);
            assert.equal(http.statusCode, 503);
            assert.match(http.message, /indisponible/i);
            return true;
          }
        );
      }
    } finally {
      if (prevPiston !== undefined) process.env.PISTON_URL = prevPiston;
      if (prevOanor !== undefined) process.env.OANOR_API_KEY = prevOanor;
    }
  });

  await t.test('(c) Recherche textuelle : aucun spawn/exec de shell (/bin/bash, /bin/sh, exec, execSync) dans server/services/', () => {
    const servicesDir = path.resolve(__dirname, '../server/services');
    function walk(dir) {
      let results = [];
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) results = results.concat(walk(full));
        else if (entry.name.endsWith('.js')) results.push(full);
      }
      return results;
    }
    const files = walk(servicesDir);
    for (const file of files) {
      const content = fs.readFileSync(file, 'utf8');
      assert.doesNotMatch(content, /spawn\s*\(\s*['"`](?:\/bin\/)?(?:ba)?sh['"`]/i, `spawn shell interdit dans ${file}`);
      assert.doesNotMatch(content, /\bexecSync\s*\(/, `execSync interdit dans ${file}`);
      assert.doesNotMatch(content, /\bchild_process['"`]\)\.exec\b/, `child_process.exec interdit dans ${file}`);
    }
  });

  await t.test('(d) runSql : limite de lignes/mémoire et timeout sur requête WITH RECURSIVE infinie + plafonnement 64 Ko', async () => {
    const res = await localRunner.runSql(
      'WITH RECURSIVE cnt(x) AS (SELECT 1 UNION ALL SELECT x+1 FROM cnt) SELECT x FROM cnt;',
      ''
    );
    assert.equal(res.data.exit_code, 1);
    assert.match(res.data.stderr, /Limite mémoire\/lignes dépassée|Temps d’exécution/i);
    assert.ok(Buffer.byteLength(res.data.stdout, 'utf8') <= 65536);
  });
});
