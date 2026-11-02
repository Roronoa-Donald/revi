'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { test } = require('node:test');

const projectFiles = [
  'assets/img/ui-icons.svg',
  'assets/js/code-lab.js',
  'assets/js/execution-router.js',
  'assets/js/engines/engine-interface.js',
  'assets/js/engines/javascript-worker.js',
  'assets/js/engines/pseudo-code-engine.js',
  'assets/js/engines/server-engine.js',
  'assets/js/engines/sql-wasm-engine.js',
  'assets/js/engines/sql-worker.js',
  'assets/js/engines/worker-runner.js',
  'b1-sql/assets/vendor/sqljs/sql-wasm.js',
  'b1-sql/assets/vendor/sqljs/sql-wasm.wasm',
  ...Array.from({ length: 6 }, (unused, index) => `b1-sql/chapitres/chapitre${index + 1}.html`),
  'scripts/build.js',
  'server/courses.js',
  'tests/sql-worker.test.js'
];
const newFiles = new Set(['assets/js/engines/sql-worker.js', 'tests/sql-worker.test.js']);
const dependencyFiles = [
  'node_modules/playwright-core/package.json',
  'node_modules/playwright-core/index.js',
  'node_modules/playwright-core/browsers.json',
  'node_modules/playwright-core/lib/coreBundle.js',
  'node_modules/playwright-core/lib/utilsBundle.js',
  'node_modules/playwright-core/lib/server/deviceDescriptorsSource.json',
  'node_modules/playwright-core/lib/server/chromium/appIcon.png'
];

function forbiddenSnapshotPath(relative) {
  return /(^|\/)(?:\.env(?:\.[^/]*)?|verification|\.git|\.ssh|\.gnupg|\.npmrc|\.pypirc)(?:\/|$)/i.test(relative) ||
    /(^|\/)[^/]*(?:secret|credential|private[-_]?key|token)[^/]*(?:\/|$)/i.test(relative) ||
    /\.(?:pem|key|p12|pfx)$/i.test(relative);
}

function copySnapshotFile(sourceRoot, targetRoot, relative) {
  if (path.isAbsolute(relative) || relative.split('/').includes('..') || forbiddenSnapshotPath(relative)) {
    throw new Error(`Chemin interdit dans l’instantané : ${relative}`);
  }
  let source = sourceRoot;
  for (const part of relative.split('/')) {
    source = path.join(source, part);
    if (fs.lstatSync(source).isSymbolicLink()) throw new Error(`Lien symbolique interdit : ${relative}`);
  }
  const descriptor = fs.openSync(source, fs.constants.O_RDONLY | fs.constants.O_NOFOLLOW);
  try {
    if (!fs.fstatSync(descriptor).isFile()) throw new Error(`Fichier ordinaire attendu : ${relative}`);
    const target = path.join(targetRoot, relative);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, fs.readFileSync(descriptor), { mode: 0o600 });
  } finally {
    fs.closeSync(descriptor);
  }
}

const landlockLauncher = String.raw`
import ctypes
import os
import resource
import sys

libc = ctypes.CDLL(None, use_errno=True)

def call(number, *args):
    result = libc.syscall(number, *args)
    if result < 0:
        code = ctypes.get_errno()
        raise OSError(code, os.strerror(code))
    return result

if call(444, 0, 0, 1) < 3:
    raise RuntimeError('Landlock ABI >= 3 nécessaire si bubblewrap imbriqué est interdit')

class Ruleset(ctypes.Structure):
    _fields_ = [('handled_access_fs', ctypes.c_uint64)]

class PathBeneath(ctypes.Structure):
    _fields_ = [('allowed_access', ctypes.c_uint64), ('parent_fd', ctypes.c_int32)]

all_access = (1 << 15) - 1
read_access = (1 << 0) | (1 << 2) | (1 << 3)
ruleset = Ruleset(all_access)
ruleset_fd = call(444, ctypes.byref(ruleset), ctypes.sizeof(ruleset), 0)

def allow(directory, access):
    descriptor = os.open(directory, os.O_PATH | os.O_CLOEXEC)
    try:
        rule = PathBeneath(access, descriptor)
        call(445, ruleset_fd, 1, ctypes.byref(rule), 0)
    finally:
        os.close(descriptor)

for directory in ('/usr', '/etc'):
    allow(directory, read_access)
allow('/proc', 1 << 3)
allow('/proc/self', read_access)
for filename in ('/proc/1/comm', '/proc/cpuinfo', '/proc/meminfo', '/proc/stat', '/proc/uptime', '/proc/loadavg'):
    if os.path.exists(filename):
        allow(filename, 1 << 2)
allow('/dev', all_access)
allow(sys.argv[1], read_access)
allow(sys.argv[2], all_access)
if libc.prctl(38, 1, 0, 0, 0) != 0:
    code = ctypes.get_errno()
    raise OSError(code, os.strerror(code))
call(446, ruleset_fd, 0)
os.close(ruleset_fd)
soft, hard = resource.getrlimit(resource.RLIMIT_DATA)
limit = min(805306368, hard) if hard != resource.RLIM_INFINITY else 805306368
resource.setrlimit(resource.RLIMIT_DATA, (limit, limit))
os.chdir(sys.argv[1])
os.execve('/usr/bin/node', ['/usr/bin/node', os.path.join(sys.argv[1], 'tests/sql-worker.test.js')], os.environ)
`;

if (process.env.REVI_SQL_WORKER_ISOLATED !== '1') {
  const root = fs.realpathSync(path.resolve(__dirname, '..'));
  const chromiumPath = process.env.CHROME_BIN || '/usr/bin/chromium';
  const outerIsolated = process.env.REVI_AUDIT_ISOLE === '1';

  test('régressions SQL et Chromium dans un instantané isolé', { timeout: 240000 }, context => {
    assert.equal(process.platform, 'linux', 'Linux est nécessaire');
    assert.ok(chromiumPath.startsWith('/usr/') && fs.existsSync(chromiumPath), 'Chromium dans /usr est nécessaire');
    const currentNetwork = fs.readlinkSync('/proc/self/ns/net');
    let hostNetwork = currentNetwork;
    if (outerIsolated) {
      hostNetwork = process.env.REVI_AUDIT_NET_NS_HOTE;
      assert.ok(hostNetwork, 'Espace réseau hôte non renseigné');
      assert.notEqual(currentNetwork, hostNetwork, 'La suite doit déjà être isolée du réseau hôte');
      assert.equal(fs.readFileSync('/proc/1/comm', 'utf8').trim(), 'bwrap');
      assert.equal(fs.existsSync('/home'), false);
    }

    if (fs.existsSync(path.join(root, '.git'))) {
      const excluded = [
        ':(exclude,glob)**/.env', ':(exclude,glob)**/.env.*',
        ':(exclude,glob)**/verification/**', ':(exclude,glob)**/*secret*',
        ':(exclude,glob)**/*credential*', ':(exclude,glob)**/*.pem',
        ':(exclude,glob)**/*.key', ':(exclude,glob)**/*.p12', ':(exclude,glob)**/*.pfx'
      ];
      const listed = spawnSync('/usr/bin/git', ['-C', root, 'ls-files', '-z', '--', ...projectFiles, ...excluded], {
        encoding: 'utf8',
        env: { PATH: '/usr/bin:/bin', LANG: 'C.UTF-8', GIT_CONFIG_NOSYSTEM: '1', GIT_CONFIG_GLOBAL: '/dev/null' }
      });
      assert.equal(listed.status, 0, `git ls-files a échoué : ${listed.stderr}`);
      const tracked = new Set(listed.stdout.split('\0').filter(Boolean));
      for (const relative of projectFiles) {
        assert.ok(tracked.has(relative) || newFiles.has(relative), `Fichier non suivi inattendu : ${relative}`);
      }
    } else {
      assert.ok(outerIsolated, 'Un dépôt Git ou une suite déjà isolée est nécessaire');
    }

    const temporary = fs.mkdtempSync('/tmp/revi-sql-worker-');
    const project = path.join(temporary, 'project');
    const scratch = path.join(temporary, 'scratch');
    const canary = path.join(temporary, 'private-canary');
    fs.mkdirSync(project);
    fs.mkdirSync(scratch);
    fs.writeFileSync(canary, 'canari factice, sans secret', { mode: 0o600 });

    try {
      for (const relative of [...projectFiles, ...dependencyFiles]) copySnapshotFile(root, project, relative);
      let canNest = fs.existsSync('/usr/bin/bwrap');
      if (outerIsolated && canNest) {
        const probe = spawnSync('/usr/bin/bwrap', [
          '--die-with-parent', '--unshare-all', '--clearenv', '--ro-bind', '/usr', '/usr',
          '--symlink', 'usr/bin', '/bin', '--symlink', 'usr/lib', '/lib',
          '--symlink', 'usr/lib', '/lib64', '--proc', '/proc', '--dev', '/dev',
          '--tmpfs', '/tmp', '/usr/bin/true'
        ], { env: { PATH: '/usr/bin:/bin', LANG: 'C.UTF-8' }, encoding: 'utf8', timeout: 10000 });
        canNest = probe.status === 0;
      }

      let result;
      let mode;
      if (canNest) {
        const simulateOuter = !outerIsolated && process.env.REVI_SQL_WORKER_TEST_NO_NESTING === '1';
        mode = simulateOuter ? 'suite bubblewrap sans imbrication' : 'bubblewrap';
        const passwd = `sandbox:x:${process.getuid()}:${process.getgid()}:Sandbox:/tmp:/bin/sh\n`;
        const isolationEnv = simulateOuter ? [
          '--setenv', 'REVI_AUDIT_ISOLE', '1', '--setenv', 'REVI_AUDIT_NET_NS_HOTE', hostNetwork,
          '--setenv', 'HOME', '/tmp'
        ] : [
          '--setenv', 'REVI_SQL_WORKER_ISOLATED', '1', '--setenv', 'REVI_SQL_WORKER_MODE', mode,
          '--setenv', 'REVI_SQL_WORKER_HOST_NET', hostNetwork, '--setenv', 'REVI_SQL_WORKER_CANARY', canary
        ];
        const args = [
          '--die-with-parent', '--unshare-all', '--clearenv',
          ...(simulateOuter ? ['--unshare-user', '--disable-userns'] : []),
          '--ro-bind', '/usr', '/usr', '--ro-bind', process.execPath, '/usr/bin/node',
          '--symlink', 'usr/bin', '/bin', '--symlink', 'usr/lib', '/lib',
          '--symlink', 'usr/lib', '/lib64',
          '--dir', '/etc', '--ro-bind', '/etc/ld.so.cache', '/etc/ld.so.cache',
          '--file', '0', '/etc/passwd', '--proc', '/proc', '--dev', '/dev', '--tmpfs', '/tmp',
          '--ro-bind', project, '/project', '--chdir', '/project',
          '--setenv', 'PATH', '/usr/bin:/bin', '--setenv', 'LANG', 'C.UTF-8',
          '--setenv', 'CHROME_BIN', chromiumPath, ...isolationEnv,
          '/usr/bin/prlimit', '--data=805306368:805306368', '--',
          '/usr/bin/node', '--test', '/project/tests/sql-worker.test.js'
        ];
        result = spawnSync('/usr/bin/bwrap', args, {
          input: passwd, encoding: 'utf8', timeout: 210000, maxBuffer: 4 * 1024 * 1024,
          env: simulateOuter ? { PATH: '/usr/bin:/bin', LANG: 'C.UTF-8', REVI_FAKE_SECRET: 'canari-factice' } :
            { PATH: '/usr/bin:/bin', LANG: 'C.UTF-8' }
        });
        if (simulateOuter && result.status === 0) {
          assert.match(result.stdout, /bubblewrap existant \+ Landlock/);
        }
      } else {
        assert.ok(outerIsolated, 'bubblewrap est nécessaire hors de la suite isolée');
        mode = 'bubblewrap existant + Landlock';
        const env = {
          PATH: '/usr/bin:/bin', LANG: 'C.UTF-8', TMPDIR: scratch, CHROME_BIN: chromiumPath,
          REVI_SQL_WORKER_ISOLATED: '1', REVI_SQL_WORKER_MODE: mode,
          REVI_SQL_WORKER_HOST_NET: hostNetwork, REVI_SQL_WORKER_CANARY: canary
        };
        result = spawnSync('/usr/bin/python3', ['-c', landlockLauncher, project, scratch], {
          cwd: project, env, encoding: 'utf8', timeout: 210000, maxBuffer: 4 * 1024 * 1024
        });
      }
      assert.equal(result.status, 0, `${result.error || ''}\n${result.stdout}\n${result.stderr}`);
      context.diagnostic(`Isolation : ${mode} ; instantané public minimal ; limite DATA par processus : 768 Mio`);
      context.diagnostic(result.stdout.trim());
    } finally {
      fs.rmSync(temporary, { recursive: true, force: true });
    }
  });
} else {
  assert.equal(process.env.HOME, undefined, 'HOME doit être absent');
  assert.equal(fs.existsSync('/home'), false, '/home ne doit pas être accessible');
  assert.equal(fs.readFileSync('/proc/1/comm', 'utf8').trim(), 'bwrap');
  assert.ok(process.env.REVI_SQL_WORKER_HOST_NET, 'Espace réseau hôte non renseigné');
  assert.notEqual(fs.readlinkSync('/proc/self/ns/net'), process.env.REVI_SQL_WORKER_HOST_NET);
  assert.throws(() => fs.readFileSync(process.env.REVI_SQL_WORKER_CANARY), error =>
    error.code === 'EACCES' || error.code === 'ENOENT');
  if (process.env.REVI_SQL_WORKER_MODE === 'bubblewrap existant + Landlock') {
    assert.throws(() => fs.readFileSync('/project/assets/js/code-lab.js'), error => error.code === 'EACCES');
    assert.throws(() => fs.readdirSync('/project'), error => error.code === 'EACCES');
    assert.throws(() => fs.readFileSync('/proc/1/environ'), error => error.code === 'EACCES');
    assert.throws(() => fs.readFileSync('/proc/1/root/project/assets/js/code-lab.js'), error => error.code === 'EACCES');
  } else {
    const pidOneEnvironment = fs.readFileSync('/proc/1/environ');
    assert.equal(pidOneEnvironment.includes(Buffer.from('HOME=')), false);
    assert.equal(pidOneEnvironment.includes(Buffer.from('REVI_FAKE_SECRET=')), false);
  }
  const sandboxRoot = path.resolve(__dirname, '..');
  for (const hidden of ['.env', 'verification', '.git']) {
    assert.equal(fs.existsSync(path.join(sandboxRoot, hidden)), false);
  }

  const { chromium } = require('playwright-core');
  const WorkerRunner = require('../assets/js/engines/worker-runner');
  const sqlEngine = require('../assets/js/engines/sql-wasm-engine');

  const infiniteQuery = 'WITH RECURSIVE compteur(valeur) AS ' +
    '(SELECT 1 UNION ALL SELECT valeur + 1 FROM compteur) SELECT SUM(valeur) FROM compteur;';
  const nativeParsingSql = [
    'CREATE TABLE "table;double" ("val;col" INTEGER);',
    'CREATE TABLE `table;accent` (`val;col` INTEGER);',
    'CREATE TABLE [table;crochet] ([val;col] INTEGER);',
    'CREATE TABLE journal (message TEXT);',
    'CREATE TRIGGER "trigger;multi" AFTER INSERT ON "table;double" BEGIN',
    "  INSERT INTO journal VALUES (CASE WHEN NEW.\"val;col\" = 7 THEN 'début;ok' ELSE 'autre' END);",
    "  INSERT INTO journal VALUES ('fin;ok');",
    'END;',
    'INSERT INTO "table;double" VALUES (7);',
    'INSERT INTO `table;accent` VALUES (8);',
    'INSERT INTO [table;crochet] VALUES (9);',
    '/* début; */ SELECT/* joint; */"val;col" AS "double;val" FROM "table;double";',
    'SELECT `val;col` AS `accent;val` FROM `table;accent`;',
    'SELECT [val;col] AS [crochet;val] FROM [table;crochet];',
    'SELECT-- commentaire adjacent;\n 42 AS commentaire;',
    'SELECT message FROM journal ORDER BY rowid;'
  ].join('\n');

  function checkNativeParsing(result) {
    assert.equal(result.status, 'success', result.stderr);
    assert.match(result.stdout, /double;val[\s\S]*\| 7\s*\|/);
    assert.match(result.stdout, /accent;val[\s\S]*\| 8\s*\|/);
    assert.match(result.stdout, /crochet;val[\s\S]*\| 9\s*\|/);
    assert.match(result.stdout, /commentaire[\s\S]*\| 42\s*\|/);
    assert.match(result.stdout, /début;ok[\s\S]*fin;ok/);
  }

  test('instantané : secrets et liens symboliques refusés', () => {
    const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'sql-snapshot-check-'));
    const source = path.join(temporary, 'source');
    const target = path.join(temporary, 'target');
    fs.mkdirSync(path.join(source, 'assets'), { recursive: true });
    fs.mkdirSync(target);
    fs.writeFileSync(path.join(source, '.env'), 'canari factice');
    fs.writeFileSync(path.join(source, 'outside'), 'canari factice');
    fs.symlinkSync(path.join(source, 'outside'), path.join(source, 'assets', 'linked.js'));
    try {
      for (const relative of ['.env', '.env.local', 'verification/fichier', 'assets/credentials.json', 'assets/private-key.pem']) {
        assert.throws(() => copySnapshotFile(source, target, relative), /interdit/);
      }
      assert.throws(() => copySnapshotFile(source, target, 'assets/linked.js'), /symbolique/);
      assert.deepEqual(fs.readdirSync(target), []);
    } finally {
      fs.rmSync(temporary, { recursive: true, force: true });
    }
  });

  test('sql.js : plafond mémoire irréversible et reprise après allocation refusée', { timeout: 35000 }, context => {
    const probe = String.raw`
      'use strict';
      const assert = require('node:assert/strict');
      const { spawnSync } = require('node:child_process');
      assert.equal(process.env.HOME, undefined);
      const limits = spawnSync('/usr/bin/prlimit', [
        '--pid', String(process.pid), '--data', '--as', '--noheadings', '--raw', '--output', 'RESOURCE,SOFT,HARD'
      ], { encoding: 'utf8' });
      assert.equal(limits.status, 0);
      assert.match(limits.stdout, /DATA\s+536870912\s+536870912/);
      assert.match(limits.stdout, /AS\s+68719476736\s+68719476736/);
      require(process.argv[1])().then(SQL => {
        const database = new SQL.Database();
        const scalar = sql => database.exec(sql)[0].values[0][0];
        const version = scalar('SELECT sqlite_version()');
        assert.equal(scalar('PRAGMA hard_heap_limit = 33554432'), 33554432);
        for (const candidate of [0, -1, 1000000000]) {
          assert.equal(scalar('PRAGMA hard_heap_limit = ' + candidate), 33554432);
        }
        assert.throws(() => database.exec('SELECT hex(zeroblob(50000000))'), /out of memory/i);
        assert.equal(scalar('SELECT 42'), 42);
        database.close();
        const next = new SQL.Database();
        assert.equal(next.exec('PRAGMA hard_heap_limit')[0].values[0][0], 33554432);
        next.close();
        console.log('SQLite ' + version + ' ; plafond 33554432 ; relèvements refusés ; OOM récupérable ; DATA 512 Mio ; AS 64 Gio');
      }).catch(error => { console.error(error); process.exitCode = 1; });
    `;
    const result = spawnSync('/usr/bin/prlimit', [
      '--data=536870912:536870912', '--as=68719476736:68719476736', '--',
      process.execPath, '--max-old-space-size=128', '-e', probe,
      path.join(sandboxRoot, 'b1-sql/assets/vendor/sqljs/sql-wasm.js')
    ], { encoding: 'utf8', timeout: 30000, env: { PATH: '/usr/bin:/bin', LANG: 'C.UTF-8' } });
    assert.equal(result.status, 0, `${result.error || ''}\n${result.stdout}\n${result.stderr}`);
    context.diagnostic(result.stdout.trim());
  });

  test('le build isolé inclut le worker et ses dépendances', { timeout: 20000 }, context => {
    const buildRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'sql-build-check-'));
    const buildFiles = projectFiles.filter(relative => relative.startsWith('assets/js/') ||
      relative.startsWith('b1-sql/assets/vendor/sqljs/') ||
      relative === 'scripts/build.js' || relative === 'server/courses.js');
    try {
      for (const relative of buildFiles) copySnapshotFile(sandboxRoot, buildRoot, relative);
      const result = spawnSync(process.execPath, ['scripts/build.js'], {
        cwd: buildRoot, env: { PATH: '/usr/bin:/bin', LANG: 'C.UTF-8' },
        encoding: 'utf8', timeout: 15000
      });
      assert.equal(result.status, 0, `${result.error || ''}\n${result.stdout}\n${result.stderr}`);
      for (const relative of [
        'assets/js/engines/sql-worker.js', 'assets/js/engines/sql-wasm-engine.js',
        'assets/js/engines/engine-interface.js', 'b1-sql/assets/vendor/sqljs/sql-wasm.js',
        'b1-sql/assets/vendor/sqljs/sql-wasm.wasm'
      ]) {
        assert.deepEqual(fs.readFileSync(path.join(buildRoot, 'dist', relative)),
          fs.readFileSync(path.join(buildRoot, relative)));
      }
      context.diagnostic('build minimal réussi ; worker, moteur et fichiers WebAssembly présents dans dist/');
    } finally {
      fs.rmSync(buildRoot, { recursive: true, force: true });
    }
  });

  async function withWorkerReplacement(WorkerClass, callback) {
    const originalWorker = global.Worker;
    global.Worker = WorkerClass;
    try {
      return await callback();
    } finally {
      if (originalWorker === undefined) delete global.Worker;
      else global.Worker = originalWorker;
    }
  }

  test('WorkerRunner distingue délai expiré et arrêt utilisateur', async () => {
    const workers = [];
    class IdleWorker {
      constructor() {
        this.terminations = 0;
        workers.push(this);
      }
      postMessage() {}
      terminate() { this.terminations++; }
    }
    await withWorkerReplacement(IdleWorker, async () => {
      const runner = new WorkerRunner('/idle.js', { providerName: 'Local', timeoutMs: 30 });
      const timeout = await runner.run({ code: '', options: {} });
      assert.equal(timeout.status, 'timeout');
      assert.equal(timeout.exitCode, 124);
      assert.equal(timeout.provenance, 'browser');
      assert.equal(workers[0].terminations, 1);
      assert.equal(runner.activeWorker, null);

      const pending = runner.run({ code: '', options: { timeoutMs: 1000 } });
      runner.terminate();
      const cancelled = await pending;
      assert.equal(cancelled.status, 'cancelled');
      assert.equal(cancelled.exitCode, 130);
      assert.equal(workers[1].terminations, 1);
    });
  });

  test('un message tardif ne termine pas le worker suivant', async () => {
    const workers = [];
    class IdleWorker {
      constructor() { workers.push(this); }
      postMessage() {}
      terminate() {}
    }
    await withWorkerReplacement(IdleWorker, async () => {
      const runner = new WorkerRunner('/idle.js', { timeoutMs: 1000 });
      const previous = runner.run({ code: 'précédent' });
      const current = runner.run({ code: 'courant' });
      assert.equal((await previous).status, 'cancelled');
      workers[0].onmessage({ data: { type: 'DONE', result: { status: 'success' } } });
      assert.equal(runner.activeWorker, workers[1]);
      runner.terminate();
      assert.equal((await current).status, 'cancelled');
    });
  });

  test('échec de transmission au worker : erreur locale et nettoyage', async () => {
    const workers = [];
    class BrokenWorker {
      constructor() {
        this.terminations = 0;
        workers.push(this);
      }
      postMessage() { throw new Error('transmission impossible'); }
      terminate() { this.terminations++; }
    }
    await withWorkerReplacement(BrokenWorker, async () => {
      const runner = new WorkerRunner('/broken.js', { timeoutMs: 1000 });
      const result = await runner.run({ code: 'exemple' });
      assert.equal(result.status, 'runtime_error');
      assert.match(result.stderr, /transmission impossible/);
      assert.equal(workers[0].terminations, 1);
      assert.equal(runner.activeWorker, null);
      assert.equal(runner.timeoutTimer, null);
    });
  });

  test('initialisation Node et requêtes SQL normales restent compatibles', async () => {
    const first = await sqlEngine.loadSqlJs();
    const second = await sqlEngine.loadSqlJs();
    assert.equal(first, second);
    const result = await sqlEngine.execute(
      'SELECT SUM(valeur) AS total FROM notes;',
      'CREATE TABLE notes(valeur INTEGER); INSERT INTO notes VALUES (10), (32);' +
        '\n-- VERIFY:\nSELECT COUNT(*) AS lignes FROM notes;',
      { timeoutMs: 5000 }
    );
    assert.equal(result.status, 'success');
    assert.match(result.stdout, /total[\s\S]*\| 42\s*\|/);
    assert.match(result.stdout, /lignes[\s\S]*\| 2\s*\|/);
    assert.equal(result.provenance, 'browser');
  });

  test('VALUES affiche les colonnes et les lignes produites', async context => {
    const result = await sqlEngine.execute('/* valeurs */ VALUES (42), (43);', '', { timeoutMs: 5000 });
    context.diagnostic(`VALUES : ${result.status} ; sortie ${JSON.stringify(result.stdout)}`);
    assert.equal(result.status, 'success', result.stderr);
    assert.match(result.stdout, /column1[\s\S]*\| 42\s*\|[\s\S]*\| 43\s*\|/);
  });

  test('INSERT RETURNING affiche les lignes et exécute la modification', async context => {
    const result = await sqlEngine.execute(
      'INSERT INTO notes(valeur) VALUES (42), (43) RETURNING valeur AS retour; ' +
        'SELECT COUNT(*) AS total FROM notes;',
      'CREATE TABLE notes(valeur INTEGER);',
      { timeoutMs: 5000 }
    );
    context.diagnostic(`INSERT RETURNING : ${result.status} ; sortie ${JSON.stringify(result.stdout)}`);
    assert.equal(result.status, 'success', result.stderr);
    assert.match(result.stdout, /retour[\s\S]*\| 42\s*\|[\s\S]*\| 43\s*\|/);
    assert.match(result.stdout, /total[\s\S]*\| 2\s*\|/);
  });

  test('les résultats sans ligne restent distincts des instructions sans colonne', async () => {
    const result = await sqlEngine.execute(
      'SELECT valeur FROM notes WHERE 0; ' +
        'INSERT INTO notes(valeur) SELECT 42 WHERE 0 RETURNING valeur; ' +
        'INSERT INTO notes(valeur) VALUES (7);',
      'CREATE TABLE notes(valeur INTEGER);',
      { timeoutMs: 5000 }
    );
    assert.equal(result.status, 'success', result.stderr);
    assert.equal((result.stdout.match(/0 résultat/g) || []).length, 2);
    assert.equal((result.stdout.match(/Requête exécutée avec 0 résultat/g) || []).length, 2);
    assert.match(result.stdout, /Instruction exécutée avec succès \(1 ligne modifiée\)/);
  });

  test('VALUES et RETURNING respectent les limites de lignes et de sortie cumulée', async () => {
    const setup = 'CREATE TABLE notes(valeur INTEGER);';
    for (const code of [
      'VALUES (1), (2), (3);',
      'INSERT INTO notes(valeur) VALUES (1), (2), (3) RETURNING valeur;'
    ]) {
      const result = await sqlEngine.execute(code, setup, { timeoutMs: 5000, maxRows: 2 });
      assert.equal(result.status, 'runtime_error');
      assert.match(result.stderr, /limite mémoire\/lignes/i);
      assert.equal(result.stdout, '');
    }
    const first = 'VALUES (hex(zeroblob(80)));';
    const second = 'INSERT INTO notes VALUES (1) RETURNING hex(zeroblob(80));';
    const options = { timeoutMs: 5000, maxOutputBytes: 1000 };
    assert.equal((await sqlEngine.execute(first, setup, options)).status, 'success');
    assert.equal((await sqlEngine.execute(second, setup, options)).status, 'success');
    const combined = await sqlEngine.execute(first + ' ' + second, setup, options);
    assert.equal(combined.status, 'runtime_error');
    assert.match(combined.stderr, /limite de sortie/i);
    assert.equal(combined.stdout, '');
  });

  test('métadonnées de colonnes indisponibles ou incohérentes : arrêt avant copie', async () => {
    const SQL = await sqlEngine.loadSqlJs();
    const columnCount = SQL._sqlite3_column_count;
    const iterateStatements = SQL.Database.prototype.iterateStatements;
    const iterators = [];
    const statements = [];
    let steps = 0;
    let copies = 0;
    SQL.Database.prototype.iterateStatements = function () {
      const iterator = iterateStatements.apply(this, arguments);
      const next = iterator.next;
      iterator.next = function () {
        const result = next.apply(this, arguments);
        if (!result.done) {
          const statement = result.value;
          const step = statement.step;
          const get = statement.get;
          statement.step = function () { steps++; return step.apply(this, arguments); };
          statement.get = function () { copies++; return get.apply(this, arguments); };
          statements.push(statement);
        }
        return result;
      };
      iterators.push(iterator);
      return iterator;
    };
    try {
      for (const unavailable of [undefined, () => -1, () => NaN]) {
        SQL._sqlite3_column_count = unavailable;
        for (const code of [
          'VALUES (42);',
          'INSERT INTO notes VALUES (42) RETURNING valeur;',
          'SELECT valeur FROM notes WHERE 0;',
          'CREATE TABLE autre(valeur);'
        ]) {
          const result = await sqlEngine.execute(code, 'CREATE TABLE notes(valeur);', { timeoutMs: 5000 });
          assert.equal(result.status, 'runtime_error');
          assert.match(result.stderr, /impossible de contrôler/i);
          assert.equal(result.stdout, '');
        }
      }
      assert.equal(steps, 0);
      assert.equal(copies, 0);
      let countCalls = 0;
      SQL._sqlite3_column_count = function (pointer) {
        countCalls++;
        return countCalls === 1 ? columnCount(pointer) : 0;
      };
      const changed = await sqlEngine.execute('VALUES (zeroblob(10000000));', '', { timeoutMs: 5000 });
      assert.equal(changed.status, 'runtime_error');
      assert.match(changed.stderr, /impossible de contrôler/i);
      assert.equal(steps, 1);
      assert.equal(copies, 0);
      assert.ok(iterators.every(iterator => iterator.fb === null));
      assert.ok(statements.every(statement => statement.Qa === 0));
    } finally {
      SQL._sqlite3_column_count = columnCount;
      SQL.Database.prototype.iterateStatements = iterateStatements;
    }
  });

  test('types, tailles et noms invalides : aucune copie de cellule', async () => {
    const SQL = await sqlEngine.loadSqlJs();
    const iterateStatements = SQL.Database.prototype.iterateStatements;
    const originals = {
      _sqlite3_column_type: SQL._sqlite3_column_type,
      _sqlite3_column_bytes: SQL._sqlite3_column_bytes,
      _sqlite3_column_double: SQL._sqlite3_column_double,
      _sqlite3_column_name: SQL._sqlite3_column_name
    };
    const iterators = [];
    const statements = [];
    let copies = 0;
    SQL.Database.prototype.iterateStatements = function () {
      const iterator = iterateStatements.apply(this, arguments);
      const next = iterator.next;
      iterator.next = function () {
        const result = next.apply(this, arguments);
        if (!result.done) {
          const statement = result.value;
          const get = statement.get;
          statement.get = function () { copies++; return get.apply(this, arguments); };
          statements.push(statement);
        }
        return result;
      };
      iterators.push(iterator);
      return iterator;
    };
    try {
      for (const scenario of [
        { name: '_sqlite3_column_type', value: 0, code: 'VALUES (zeroblob(10000000));' },
        { name: '_sqlite3_column_bytes', value: -1, code: 'VALUES (zeroblob(10000000));' },
        { name: '_sqlite3_column_double', value: '42', code: 'VALUES (42);' },
        { name: '_sqlite3_column_name', value: -1, code: 'VALUES (42);' }
      ]) {
        SQL[scenario.name] = () => scenario.value;
        const result = await sqlEngine.execute(scenario.code, '', { timeoutMs: 5000 });
        SQL[scenario.name] = originals[scenario.name];
        assert.equal(result.status, 'runtime_error');
        assert.match(result.stderr, /impossible de (?:contrôler|lire)/i);
        assert.equal(result.stdout, '');
      }
      assert.equal(copies, 0);
      assert.ok(iterators.every(iterator => iterator.fb === null));
      assert.ok(statements.every(statement => statement.Qa === 0));
    } finally {
      Object.assign(SQL, originals);
      SQL.Database.prototype.iterateStatements = iterateStatements;
    }
  });

  test('itérateur incompatible : aucune instruction préparée', async () => {
    const SQL = await sqlEngine.loadSqlJs();
    const iterateStatements = SQL.Database.prototype.iterateStatements;
    let database;
    let nextCalls = 0;
    SQL.Database.prototype.iterateStatements = function () {
      database = this;
      return { next() { nextCalls++; return { done: true }; } };
    };
    try {
      const result = await sqlEngine.execute('PRAGMA foreign_keys = ON;', '', { timeoutMs: 5000 });
      assert.equal(result.status, 'runtime_error');
      assert.match(result.stderr, /impossible de libérer/i);
      assert.equal(nextCalls, 0);
      assert.equal(database.db, null);
    } finally {
      SQL.Database.prototype.iterateStatements = iterateStatements;
    }
  });

  test('statement incompatible : échec fermé et base libérée', async () => {
    const SQL = await sqlEngine.loadSqlJs();
    const iterateStatements = SQL.Database.prototype.iterateStatements;
    let database;
    let iterator;
    let statement;
    SQL.Database.prototype.iterateStatements = function () {
      database = this;
      iterator = iterateStatements.apply(this, arguments);
      const next = iterator.next;
      iterator.next = function () {
        const result = next.apply(this, arguments);
        if (!result.done) {
          statement = result.value;
          statement.free = undefined;
        }
        return result;
      };
      return iterator;
    };
    try {
      const result = await sqlEngine.execute('VALUES (42);', '', { timeoutMs: 5000 });
      assert.equal(result.status, 'runtime_error');
      assert.match(result.stderr, /impossible de contrôler/i);
      assert.equal(iterator.fb, null);
      assert.equal(statement.Qa, 0);
      assert.equal(database.db, null);
    } finally {
      SQL.Database.prototype.iterateStatements = iterateStatements;
    }
  });

  test('le tampon de l’itérateur reste libéré sans son aideur minifié', async () => {
    const SQL = await sqlEngine.loadSqlJs();
    const iterateStatements = SQL.Database.prototype.iterateStatements;
    const columnCount = SQL._sqlite3_column_count;
    let iterator;
    let statement;
    SQL.Database.prototype.iterateStatements = function () {
      iterator = iterateStatements.apply(this, arguments);
      const next = iterator.next;
      iterator.next = function () {
        const result = next.apply(this, arguments);
        if (!result.done) statement = result.value;
        return result;
      };
      iterator.ob = undefined;
      return iterator;
    };
    SQL._sqlite3_column_count = undefined;
    try {
      const result = await sqlEngine.execute('VALUES (42);', '', { timeoutMs: 5000 });
      assert.equal(result.status, 'runtime_error');
      assert.match(result.stderr, /impossible de contrôler/i);
      assert.equal(iterator.fb, null);
      assert.equal(statement.Qa, 0);
    } finally {
      SQL._sqlite3_column_count = columnCount;
      SQL.Database.prototype.iterateStatements = iterateStatements;
      if (iterator && iterator.fb !== null) SQL._free(iterator.fb);
    }
  });

  test('le tampon reste libéré si _free n’est pas exposé', async () => {
    const SQL = await sqlEngine.loadSqlJs();
    const iterateStatements = SQL.Database.prototype.iterateStatements;
    const columnCount = SQL._sqlite3_column_count;
    const free = SQL._free;
    let iterator;
    let statement;
    SQL.Database.prototype.iterateStatements = function () {
      iterator = iterateStatements.apply(this, arguments);
      const next = iterator.next;
      iterator.next = function () {
        const result = next.apply(this, arguments);
        if (!result.done) statement = result.value;
        return result;
      };
      return iterator;
    };
    SQL._sqlite3_column_count = undefined;
    SQL._free = undefined;
    try {
      const result = await sqlEngine.execute('VALUES (42);', '', { timeoutMs: 5000 });
      assert.equal(result.status, 'runtime_error');
      assert.match(result.stderr, /impossible de contrôler/i);
      assert.equal(iterator.fb, null);
      assert.equal(statement.Qa, 0);
    } finally {
      SQL._sqlite3_column_count = columnCount;
      SQL._free = free;
      SQL.Database.prototype.iterateStatements = iterateStatements;
      if (iterator && iterator.fb !== null) free(iterator.fb);
    }
  });

  test('une erreur ne prépare pas la suite et libère les ressources même si la fermeture échoue', async context => {
    const SQL = await sqlEngine.loadSqlJs();
    const iterateStatements = SQL.Database.prototype.iterateStatements;
    const close = SQL.Database.prototype.close;
    let database;
    let iterator;
    let statement;
    let nextCalls = 0;
    SQL.Database.prototype.iterateStatements = function () {
      database = this;
      iterator = iterateStatements.apply(this, arguments);
      const next = iterator.next;
      iterator.next = function () {
        nextCalls++;
        const result = next.apply(this, arguments);
        if (!result.done && !statement) statement = result.value;
        return result;
      };
      return iterator;
    };
    SQL.Database.prototype.close = function () { throw new Error('fermeture simulée'); };
    try {
      const result = await sqlEngine.execute(
        'SELECT zeroblob(10000000) AS contenu; PRAGMA foreign_keys = ON;',
        'PRAGMA foreign_keys = OFF;',
        { timeoutMs: 5000 }
      );
      const foreignKeys = database.exec('PRAGMA foreign_keys;')[0].values[0][0];
      context.diagnostic(`fermeture en échec : next=${nextCalls} ; foreign_keys=${foreignKeys} ; ` +
        `tampon libéré=${iterator.fb === null} ; statement libéré=${statement.Qa === 0}`);
      assert.equal(result.status, 'runtime_error');
      assert.match(result.stderr, /fermeture simulée/);
      assert.equal(nextCalls, 1);
      assert.equal(foreignKeys, 0);
      assert.equal(iterator.fb, null);
      assert.equal(statement.Qa, 0);
    } finally {
      SQL.Database.prototype.iterateStatements = iterateStatements;
      SQL.Database.prototype.close = close;
      if (iterator && iterator.fb !== null) iterator.ob();
      if (database) close.call(database);
    }
  });

  test('une erreur de préparation libère l’itérateur et empêche la vérification suivante', async () => {
    const SQL = await sqlEngine.loadSqlJs();
    const iterateStatements = SQL.Database.prototype.iterateStatements;
    const iterators = [];
    let database;
    let statement;
    let nextCalls = 0;
    SQL.Database.prototype.iterateStatements = function () {
      database = this;
      const iterator = iterateStatements.apply(this, arguments);
      const next = iterator.next;
      iterator.next = function () {
        nextCalls++;
        const result = next.apply(this, arguments);
        if (!result.done) statement = result.value;
        return result;
      };
      iterators.push(iterator);
      return iterator;
    };
    try {
      const result = await sqlEngine.execute(
        'INSERT INTO notes VALUES (1); SELECT FROM; PRAGMA foreign_keys = ON;',
        'PRAGMA foreign_keys = OFF; CREATE TABLE notes(valeur);' +
          '\n-- VERIFY:\nPRAGMA foreign_keys = ON;',
        { timeoutMs: 5000 }
      );
      assert.equal(result.status, 'runtime_error');
      assert.equal(nextCalls, 2);
      assert.equal(iterators.length, 1);
      assert.equal(iterators[0].fb, null);
      assert.equal(statement.Qa, 0);
      assert.equal(database.db, null);
    } finally {
      SQL.Database.prototype.iterateStatements = iterateStatements;
    }
  });

  test('un échec de libération du statement ne relance pas l’itérateur', async () => {
    const SQL = await sqlEngine.loadSqlJs();
    const iterateStatements = SQL.Database.prototype.iterateStatements;
    let database;
    let iterator;
    let statement;
    let nextCalls = 0;
    SQL.Database.prototype.iterateStatements = function () {
      database = this;
      iterator = iterateStatements.apply(this, arguments);
      const next = iterator.next;
      iterator.next = function () {
        nextCalls++;
        const result = next.apply(this, arguments);
        if (!result.done) {
          statement = result.value;
          statement.free = function () { throw new Error('libération simulée'); };
        }
        return result;
      };
      return iterator;
    };
    try {
      const result = await sqlEngine.execute(
        'SELECT zeroblob(10000000); PRAGMA foreign_keys = ON;', '', { timeoutMs: 5000 }
      );
      assert.equal(result.status, 'runtime_error');
      assert.match(result.stderr, /libération simulée/);
      assert.equal(nextCalls, 1);
      assert.equal(iterator.fb, null);
      assert.equal(statement.Qa, 0);
      assert.equal(database.db, null);
    } finally {
      SQL.Database.prototype.iterateStatements = iterateStatements;
    }
  });

  test('analyse native : identifiants, commentaires, trigger et scripts séparés', async () => {
    checkNativeParsing(await sqlEngine.execute(nativeParsingSql, '', { timeoutMs: 5000 }));
    assert.deepEqual(sqlEngine.splitSql('SELECT 1; SELECT 2;'), ['SELECT 1', 'SELECT 2']);
    const independentSources = await sqlEngine.execute(
      '/* sans point-virgule final */ SELECT 42 AS premier',
      'CREATE TABLE notes(valeur); INSERT INTO notes VALUES (5);' +
        '\n-- VERIFY:\n/* test */ SELECT COUNT(*) AS total FROM notes;',
      { timeoutMs: 5000 }
    );
    assert.equal(independentSources.status, 'success', independentSources.stderr);
    assert.match(independentSources.stdout, /premier[\s\S]*\| 42\s*\|/);
    assert.match(independentSources.stdout, /total[\s\S]*\| 1\s*\|/);
    const separators = await sqlEngine.execute(';;; SELECT 1 AS premier;; SELECT 2 AS second;', '', { timeoutMs: 5000 });
    assert.equal(separators.status, 'success', separators.stderr);
    assert.match(separators.stdout, /premier[\s\S]*\| 1\s*\|/);
    assert.match(separators.stdout, /second[\s\S]*\| 2\s*\|/);
    const malformed = await sqlEngine.execute('SELECT 1; SELECT FROM;', '', { timeoutMs: 5000 });
    assert.equal(malformed.status, 'runtime_error');
    const afterError = await sqlEngine.execute('SELECT 42;', '', { timeoutMs: 5000 });
    assert.equal(afterError.status, 'success');
  });

  test('le délai interne du moteur SQL conserve le statut timeout', async () => {
    await sqlEngine.loadSqlJs();
    const originalNow = Date.now;
    let time = 0;
    Date.now = () => { time += 100; return time; };
    try {
      const result = await sqlEngine.execute('SELECT 1;', '', { timeoutMs: 10 });
      assert.equal(result.status, 'timeout');
      assert.equal(result.exitCode, 124);
      assert.match(result.stderr, /temps.*dépassé/i);
    } finally {
      Date.now = originalNow;
    }
  });

  test('un BLOB trop grand est rejeté avant sa copie JavaScript, y compris VALUES et RETURNING', async () => {
    const SQL = await sqlEngine.loadSqlJs();
    const iterateStatements = SQL.Database.prototype.iterateStatements;
    const iterators = [];
    let getCalls = 0;
    SQL.Database.prototype.iterateStatements = function () {
      const iterator = iterateStatements.apply(this, arguments);
      const next = iterator.next;
      iterator.next = function () {
        const step = next.apply(this, arguments);
        if (!step.done) {
          const get = step.value.get;
          step.value.get = function () {
            getCalls++;
            return get.apply(this, arguments);
          };
        }
        return step;
      };
      iterators.push(iterator);
      return iterator;
    };
    try {
      for (const code of [
        'SELECT zeroblob(10000000) AS contenu;',
        'VALUES (zeroblob(10000000));',
        'INSERT INTO notes VALUES (1) RETURNING zeroblob(10000000) AS contenu;'
      ]) {
        const result = await sqlEngine.execute(code, 'CREATE TABLE notes(valeur);', {
          timeoutMs: 5000, maxOutputBytes: Number.MAX_SAFE_INTEGER
        });
        assert.equal(result.status, 'runtime_error');
        assert.match(result.stderr, /limite de sortie/i);
        assert.equal(result.stdout, '');
      }
      assert.equal(getCalls, 0);
      assert.equal(iterators.length, 3);
      assert.ok(iterators.every(iterator => iterator.fb === null));
    } finally {
      SQL.Database.prototype.iterateStatements = iterateStatements;
    }
  });

  async function watchdog(promise, duration, message) {
    let timer;
    try {
      return await Promise.race([
        promise,
        new Promise((resolve, reject) => {
          timer = setTimeout(() => reject(new Error(message)), duration);
        })
      ]);
    } finally {
      clearTimeout(timer);
    }
  }

  test('Chromium : atelier SQL interrompable, page réactive et aucun repli serveur', {
    timeout: 120000
  }, async context => {
    const browser = await chromium.launch({
      executablePath: process.env.CHROME_BIN,
      headless: true,
      args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-background-networking']
    });
    const requests = [];
    const unexpectedRequests = [];
    let rejectWorkerScript = false;
    let rejectWasm = false;
    const origin = 'http://sql-worker.invalid';
    const root = path.resolve(__dirname, '..');
    const chapters = new Map();
    for (let number = 1; number <= 6; number++) {
      const source = fs.readFileSync(path.join(root, `b1-sql/chapitres/chapitre${number}.html`), 'utf8');
      const start = source.indexOf('<!-- code-labs:start -->');
      const end = source.indexOf('<!-- code-labs:end -->');
      assert.ok(start >= 0 && end > start, `Atelier généré absent du chapitre ${number}`);
      chapters.set(number, source.slice(start, end));
    }
    const html = '<!doctype html><html lang="fr"><head><meta charset="utf-8"></head><body>' +
      '<button id="pulse" onclick="window.__clicks++">Page active</button>' +
      '<div class="lab" data-lab data-language="sql">' +
      '<script type="text/plain" data-lab-starter>SELECT 1;</script></div>' +
      '<script src="/assets/js/code-lab.js"></script></body></html>';
    const instrumentation = '\n(function () {' +
      'var execute = self.SqlWasmEngine.execute;' +
      'self.SqlWasmEngine.execute = function (code, stdin, options) {' +
      'return self.SqlWasmEngine.loadSqlJs().then(function () {' +
      'self.postMessage({ type: "TEST_SQL_READY" });' +
      'return execute(code, stdin, options);' +
      '});' +
      '};' +
      '})();\n';

    try {
      const browserContext = await browser.newContext();
      await browserContext.addInitScript(() => {
        window.__sqlReadyCount = 0;
        window.__heartbeat = 0;
        window.__clicks = 0;
        setInterval(() => { window.__heartbeat++; }, 30);
        const NativeWorker = window.Worker;
        window.Worker = class extends NativeWorker {
          constructor(url, options) {
            super(url, options);
            this.addEventListener('message', event => {
              if (event.data && event.data.type === 'TEST_SQL_READY') window.__sqlReadyCount++;
            });
          }
        };
      });
      await browserContext.route('**/*', async route => {
        const request = route.request();
        const url = new URL(request.url());
        requests.push({ method: request.method(), url: url.href });
        if (url.origin !== origin) {
          unexpectedRequests.push(url.href);
          return route.abort();
        }
        if (url.pathname === '/cours/atelier.html') {
          return route.fulfill({ status: 200, contentType: 'text/html; charset=utf-8', body: html });
        }
        const chapter = /^\/cours\/chapitre([1-6])\.html$/.exec(url.pathname);
        if (chapter) {
          const body = '<!doctype html><html lang="fr"><head><meta charset="utf-8"></head><body>' +
            chapters.get(Number(chapter[1])) + '<script src="/assets/js/code-lab.js"></script></body></html>';
          return route.fulfill({ status: 200, contentType: 'text/html; charset=utf-8', body });
        }
        if (url.pathname === '/assets/vendor/monaco/vs/loader.js' || url.pathname === '/favicon.ico') {
          return route.abort();
        }
        if (url.pathname === '/assets/js/engines/sql-worker.js' && rejectWorkerScript) {
          return route.fulfill({ status: 404, contentType: 'text/plain', body: 'indisponible' });
        }
        if (url.pathname.endsWith('/sql-wasm.wasm') && rejectWasm) {
          return route.fulfill({ status: 503, contentType: 'text/plain', body: 'indisponible' });
        }
        if (url.pathname.startsWith('/assets/js/') ||
            url.pathname.startsWith('/b1-sql/assets/vendor/sqljs/') ||
            url.pathname === '/assets/img/ui-icons.svg') {
          const file = path.join(root, url.pathname);
          if (fs.existsSync(file) && fs.statSync(file).isFile()) {
            const type = url.pathname.endsWith('.wasm') ? 'application/wasm' :
              url.pathname.endsWith('.svg') ? 'image/svg+xml' : 'text/javascript';
            let body = fs.readFileSync(file);
            if (url.pathname === '/assets/js/engines/sql-worker.js') {
              body = Buffer.concat([body, Buffer.from(instrumentation)]);
            }
            return route.fulfill({ status: 200, contentType: type, body });
          }
        }
        unexpectedRequests.push(url.pathname);
        return route.abort();
      });

      const page = await browserContext.newPage();
      await page.goto(origin + '/cours/atelier.html');
      const lab = page.locator('[data-lab]');
      await lab.locator('.lab__fallback').waitFor();
      await page.waitForFunction(() => typeof window.ExecutionRouter === 'function');
      await page.evaluate(() => {
        window.__sqlOnPage = 0;
        const originalExecute = window.SqlWasmEngine.execute;
        window.SqlWasmEngine.execute = function () {
          window.__sqlOnPage++;
          return originalExecute.apply(this, arguments);
        };
      });

      async function outcome() {
        await page.waitForFunction(() => {
          const currentLab = document.querySelector('[data-lab]').__lab;
          return currentLab && !currentLab.running && currentLab.lastOutcome;
        });
        return lab.evaluate(element => element.__lab.lastOutcome);
      }

      await lab.locator('details.lab__stdin > summary').click();
      await lab.locator('[data-lab-stdin]').fill(
        'CREATE TABLE notes(valeur INTEGER); INSERT INTO notes VALUES (10), (32);' +
        '\n-- VERIFY:\nSELECT COUNT(*) AS lignes FROM notes;'
      );
      await lab.locator('.lab__fallback').fill('SELECT SUM(valeur) AS total FROM notes;');
      await lab.locator('[data-lab-run]').click();
      const valid = await outcome();
      assert.equal(valid.status, 'success');
      assert.match(valid.stdout, /total[\s\S]*\| 42\s*\|/);
      assert.match(valid.stdout, /lignes[\s\S]*\| 2\s*\|/);

      await lab.locator('[data-lab-stdin]').fill('');
      await lab.locator('.lab__fallback').fill(infiniteQuery);
      let previousReady = await page.evaluate(() => window.__sqlReadyCount);
      await page.evaluate(() => {
        setTimeout(() => document.querySelector('[data-lab-run]').click(), 0);
      });
      await watchdog(page.waitForFunction(count => window.__sqlReadyCount > count, previousReady),
        3500, 'Le worker SQL ne démarre pas ou la page est figée');
      const heartbeatBefore = await page.evaluate(() => window.__heartbeat);
      await new Promise(resolve => setTimeout(resolve, 350));
      await watchdog(page.locator('#pulse').click(), 1500, 'La page ne répond plus au clic');
      const responsive = await page.evaluate(() => ({ heartbeat: window.__heartbeat, clicks: window.__clicks }));
      assert.ok(responsive.heartbeat - heartbeatBefore >= 3, 'Les timers de la page doivent continuer');
      assert.equal(responsive.clicks, 1);
      const timedOut = await watchdog(outcome(), 9000, 'Le délai SQL ne termine pas le worker');
      assert.equal(timedOut.status, 'timeout');
      assert.equal(timedOut.exitCode, 124);
      assert.equal(timedOut.provenance, 'browser');

      previousReady = await page.evaluate(() => window.__sqlReadyCount);
      await lab.locator('[data-lab-run]').click();
      await watchdog(page.waitForFunction(count => window.__sqlReadyCount > count, previousReady),
        3500, 'Le worker SQL à annuler ne démarre pas');
      await lab.locator('[data-lab-stop]').click();
      const cancelled = await watchdog(outcome(), 2500, 'L’annulation SQL ne se termine pas');
      assert.equal(cancelled.status, 'cancelled');
      assert.equal(cancelled.exitCode, 130);

      await lab.locator('.lab__fallback').fill('SELECT 73 AS resultat;');
      await lab.locator('[data-lab-run]').click();
      const recovered = await outcome();
      assert.equal(recovered.status, 'success');
      assert.match(recovered.stdout, /resultat[\s\S]*\| 73\s*\|/);
      assert.equal(await page.evaluate(() => window.__sqlOnPage), 0);

      const nativeResult = await page.evaluate(async sql => {
        const router = new window.ExecutionRouter();
        return router.execute('sql', sql, '', { timeoutMs: 5000 });
      }, nativeParsingSql);
      checkNativeParsing(nativeResult);

      const returningResult = await page.evaluate(async () => {
        const router = new window.ExecutionRouter();
        return router.execute('sql',
          '/* valeurs */ VALUES (42); INSERT INTO notes VALUES (43) RETURNING valeur AS retour; ' +
            'UPDATE notes SET valeur = 0 WHERE 0 RETURNING valeur;',
          'CREATE TABLE notes(valeur INTEGER);', { timeoutMs: 5000 });
      });
      assert.equal(returningResult.status, 'success', returningResult.stderr);
      assert.match(returningResult.stdout, /column1[\s\S]*\| 42\s*\|/);
      assert.match(returningResult.stdout, /retour[\s\S]*\| 43\s*\|/);
      assert.match(returningResult.stdout, /0 résultat/);

      const returningLimits = await page.evaluate(async () => {
        const router = new window.ExecutionRouter();
        const setup = 'CREATE TABLE notes(valeur INTEGER);';
        const rows = await router.execute('sql',
          'INSERT INTO notes VALUES (1), (2), (3) RETURNING valeur;', setup,
          { timeoutMs: 5000, maxRows: 2 });
        const blob = await router.execute('sql',
          'INSERT INTO notes VALUES (1) RETURNING zeroblob(10000000) AS contenu;', setup,
          { timeoutMs: 5000, maxOutputBytes: Number.MAX_SAFE_INTEGER });
        return { rows, blob };
      });
      assert.equal(returningLimits.rows.status, 'runtime_error');
      assert.match(returningLimits.rows.stderr, /limite mémoire\/lignes/i);
      assert.equal(returningLimits.blob.status, 'runtime_error');
      assert.match(returningLimits.blob.stderr, /limite de sortie/i);
      assert.equal(returningLimits.blob.stdout, '');

      const heapCheck = await page.evaluate(async () => {
        const router = new window.ExecutionRouter();
        return router.execute('sql', 'PRAGMA hard_heap_limit = 0; PRAGMA hard_heap_limit = 1000000000; ' +
          'PRAGMA hard_heap_limit;', '', { timeoutMs: 5000 });
      });
      assert.equal(heapCheck.status, 'success');
      assert.equal((heapCheck.stdout.match(/33554432/g) || []).length, 3);

      for (const setup of [
        'PRAGMA hard_heap_limit = 0; PRAGMA hard_heap_limit = 1000000000;',
        '-- VERIFY:\nPRAGMA hard_heap_limit = 0; SELECT hex(zeroblob(50000000));'
      ]) {
        const hostile = await page.evaluate(async input => {
          const router = new window.ExecutionRouter();
          const code = input.startsWith('-- VERIFY:') ? 'SELECT 42;' : 'SELECT hex(zeroblob(50000000));';
          return router.execute('sql', code, input, { timeoutMs: 5000 });
        }, setup);
        assert.equal(hostile.status, 'runtime_error');
        assert.match(hostile.stderr, /out of memory/i);
      }

      const boundedCases = [
        'SELECT zeroblob(10000000) AS contenu;',
        Array(5).fill('SELECT hex(zeroblob(1500)) AS texte;').join('\n'),
        'WITH RECURSIVE lignes(n) AS (VALUES(1) UNION ALL SELECT n+1 FROM lignes WHERE n<20) ' +
          "SELECT CASE WHEN n=1 THEN hex(zeroblob(2500)) ELSE 'x' END AS texte FROM lignes;",
        "SELECT replace(hex(zeroblob(11000)), '00', 'é') AS texte;",
        'SELECT 1 AS "' + 'x'.repeat(120000) + '";'
      ];
      for (const sql of boundedCases) {
        const result = await page.evaluate(async code => {
          const router = new window.ExecutionRouter();
          return router.execute('sql', code, '', { timeoutMs: 5000, maxOutputBytes: Number.MAX_SAFE_INTEGER });
        }, sql);
        assert.equal(result.status, 'runtime_error');
        assert.match(result.stderr, /limite de sortie/i);
        assert.equal(result.stdout, '');
      }
      const blob = await page.evaluate(async () => {
        const router = new window.ExecutionRouter();
        return router.execute('sql', "SELECT x'000aff' AS contenu; SELECT 'é' AS texte;", '', { timeoutMs: 5000 });
      });
      assert.equal(blob.status, 'success');
      assert.match(blob.stdout, /0,10,255/);
      assert.match(blob.stdout, /é/);
      assert.ok(Buffer.byteLength(blob.stdout, 'utf8') <= 65536);

      const initialization = await page.evaluate(async () => {
        const first = await window.SqlWasmEngine.loadSqlJs();
        const second = await window.SqlWasmEngine.loadSqlJs();
        return { same: first === second, database: typeof first.Database };
      });
      assert.deepEqual(initialization, { same: true, database: 'function' });

      const noServer = await page.evaluate(async () => {
        const originalFetch = window.fetch;
        let fetchCalls = 0;
        window.fetch = function () { fetchCalls++; throw new Error('repli serveur interdit'); };
        window.__FORCE_SERVER_EXEC__ = true;
        try {
          const router = new window.ExecutionRouter();
          const result = await router.execute('sql', 'SELECT 5 AS valeur;', '', {
            timeoutMs: 5000, forceServer: true
          });
          return { result, fetchCalls };
        } finally {
          window.fetch = originalFetch;
          delete window.__FORCE_SERVER_EXEC__;
        }
      });
      assert.equal(noServer.result.status, 'success');
      assert.equal(noServer.fetchCalls, 0);

      const unavailable = await page.evaluate(async () => {
        const originalWorker = window.Worker;
        window.Worker = undefined;
        try {
          const router = new window.ExecutionRouter();
          return await router.execute('sql', 'SELECT 1;', '');
        } finally {
          window.Worker = originalWorker;
        }
      });
      assert.equal(unavailable.status, 'runtime_error');
      assert.equal(unavailable.provenance, 'browser');

      const constructorError = await page.evaluate(async () => {
        const originalWorker = window.Worker;
        window.Worker = function () { throw new Error('worker refusé'); };
        try {
          const router = new window.ExecutionRouter();
          return await router.execute('sql', 'SELECT 1;', '');
        } finally {
          window.Worker = originalWorker;
        }
      });
      assert.equal(constructorError.status, 'runtime_error');
      assert.match(constructorError.stderr, /worker refusé/);
      assert.equal(constructorError.provider, 'SQLite 3 (WebAssembly)');

      const cloneError = await page.evaluate(async () => {
        const router = new window.ExecutionRouter();
        return router.execute('sql', 'SELECT 1;', '', { timeoutMs: 3000, invalid: function () {} });
      });
      assert.equal(cloneError.status, 'runtime_error');
      assert.match(cloneError.stderr, /clon/i);

      rejectWorkerScript = true;
      const workerFailure = await page.evaluate(async () => {
        const router = new window.ExecutionRouter();
        return router.execute('sql', 'SELECT 1;', '', { timeoutMs: 3000 });
      });
      rejectWorkerScript = false;
      assert.equal(workerFailure.status, 'runtime_error');

      rejectWasm = true;
      const wasmFailure = await page.evaluate(async () => {
        const router = new window.ExecutionRouter();
        return router.execute('sql', 'SELECT 1;', '', { timeoutMs: 4000 });
      });
      rejectWasm = false;
      assert.equal(wasmFailure.status, 'runtime_error');
      assert.equal(wasmFailure.provenance, 'browser');

      const afterWasmFailure = await page.evaluate(async () => {
        const router = new window.ExecutionRouter();
        return router.execute('sql', 'SELECT 8 AS valeur;', '', { timeoutMs: 4000 });
      });
      assert.equal(afterWasmFailure.status, 'success');
      assert.match(afterWasmFailure.stdout, /\| 8\s*\|/);

      const concurrent = await page.evaluate(async query => {
        const router = new window.ExecutionRouter();
        const previous = router.execute('sql', query, '', { timeoutMs: 4000 });
        const current = router.execute('sql', query, '', { timeoutMs: 4000 });
        const previousResult = await previous;
        router.cancel();
        const currentResult = await current;
        return { previous: previousResult.status, current: currentResult.status };
      }, infiniteQuery);
      assert.deepEqual(concurrent, { previous: 'cancelled', current: 'cancelled' });

      for (const input of [
        'CREATE TABLE bloque AS ' + infiniteQuery,
        '-- VERIFY:\n' + infiniteQuery
      ]) {
        const readyBefore = await page.evaluate(() => window.__sqlReadyCount);
        const result = await page.evaluate(async setup => {
          const router = new window.ExecutionRouter();
          return router.execute('sql', 'SELECT 1;', setup, { timeoutMs: 1200 });
        }, input);
        assert.equal(result.status, 'timeout');
        assert.equal(result.exitCode, 124);
        assert.ok(await page.evaluate(() => window.__sqlReadyCount) > readyBefore);
      }

      const javascript = await page.evaluate(async () => {
        const router = new window.ExecutionRouter();
        return router.execute('javascript', 'console.log("toujours actif")', '', { timeoutMs: 3000 });
      });
      assert.equal(javascript.status, 'success');
      assert.match(javascript.stdout, /toujours actif/);
      const javascriptTimeout = await page.evaluate(async () => {
        const router = new window.ExecutionRouter();
        return router.execute('javascript', 'while (true) {}', '', { timeoutMs: 300 });
      });
      assert.equal(javascriptTimeout.status, 'timeout');
      assert.equal(javascriptTimeout.exitCode, 124);

      const uiExecutions = await page.evaluate(() => window.__sqlOnPage);
      assert.equal(uiExecutions, 0);
      await page.goto(origin + '/cours/chapitre1.html');
      const generatedLab = page.locator('[data-exercise="sq-c1-e1"]');
      await generatedLab.locator('.lab__fallback').waitFor();
      const expected = await generatedLab.locator('.lab__sample-part').nth(1).locator('pre').textContent();
      for (let attempt = 0; attempt < 2; attempt++) {
        await generatedLab.locator('.lab__fallback').fill('SELECT * FROM Voiture ORDER BY immat ASC;');
        await generatedLab.locator('[data-lab-run]').click();
        await page.waitForFunction(() => {
          const currentLab = document.querySelector('[data-exercise="sq-c1-e1"]').__lab;
          return currentLab && !currentLab.running && currentLab.lastOutcome;
        });
        const generatedResult = await generatedLab.evaluate(element => element.__lab.lastOutcome);
        assert.equal(generatedResult.status, 'success');
        assert.equal(generatedResult.stdout.trim(), expected.trim());
      }

      let starterCount = 0;
      let starterSuccess = 0;
      for (let number = 1; number <= 6; number++) {
        await page.goto(origin + `/cours/chapitre${number}.html`);
        const starters = await page.locator('[data-lab]').evaluateAll(elements => elements.map(element => ({
          id: element.getAttribute('data-exercise'),
          code: element.querySelector('[data-lab-starter]').textContent,
          stdin: element.getAttribute('data-stdin') || ''
        })));
        await page.waitForFunction(() => typeof window.ExecutionRouter === 'function');
        for (const starter of starters) {
          const baseline = await sqlEngine.execute(starter.code, starter.stdin, { timeoutMs: 5000 });
          const guarded = await page.evaluate(async input => {
            const router = new window.ExecutionRouter();
            return router.execute('sql', input.code, input.stdin, { timeoutMs: 5000 });
          }, starter);
          assert.equal(guarded.status, baseline.status, starter.id);
          assert.equal(guarded.stdout, baseline.stdout, starter.id);
          assert.equal(guarded.stderr, baseline.stderr, starter.id);
          starterCount++;
          if (guarded.status === 'success') starterSuccess++;
        }
      }
      assert.equal(starterCount, 18);

      assert.deepEqual(unexpectedRequests, []);
      assert.equal(requests.filter(request => new URL(request.url).pathname === '/api/execute').length, 0);
      assert.ok(requests.some(request => new URL(request.url).pathname.endsWith('/sql-wasm.wasm')));
      context.diagnostic(`SQL valide=${valid.status}; récursion=${timedOut.status}/${timedOut.exitCode}; ` +
        `arrêt=${cancelled.status}/${cancelled.exitCode}; battements=${responsive.heartbeat - heartbeatBefore}; ` +
        `appels SQL UI=${uiExecutions}; requêtes serveur=0; exercice généré exécuté deux fois; ` +
        `${starterCount} starters comparés (${starterSuccess} succès); 5 sorties hostiles bornées; ` +
        'parseur natif, VALUES et RETURNING vérifiés');
      await browserContext.close();
    } finally {
      await browser.close();
    }
  });

  test('Chromium : échec du chargement SQL sans repli serveur', { timeout: 30000 }, async context => {
    const browser = await chromium.launch({
      executablePath: process.env.CHROME_BIN,
      headless: true,
      args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-background-networking']
    });
    const origin = 'http://sql-bootstrap.invalid';
    const apiRequests = [];
    const unexpectedRequests = [];
    const html = '<!doctype html><html><head><meta charset="utf-8"></head><body>' +
      '<div class="lab" data-lab data-language="sql">' +
      '<script type="text/plain" data-lab-starter>SELECT 1;</script></div>' +
      '<script src="/assets/js/code-lab.js"></script></body></html>';
    try {
      const browserContext = await browser.newContext();
      await browserContext.route('**/*', async route => {
        const request = route.request();
        const url = new URL(request.url());
        if (url.origin !== origin) {
          unexpectedRequests.push(url.href);
          return route.abort();
        }
        if (url.pathname === '/cours/atelier.html') return route.fulfill({ status: 200, contentType: 'text/html', body: html });
        if (url.pathname === '/assets/js/engines/engine-interface.js') return route.fulfill({ status: 404, body: 'indisponible' });
        if (url.pathname === '/api/execute') {
          apiRequests.push(request.postDataJSON());
          return route.fulfill({ status: 200, json: { status: 'success', stdout: 'repli non SQL\n', stderr: '', exitCode: 0 } });
        }
        if (url.pathname === '/assets/vendor/monaco/vs/loader.js' || url.pathname === '/favicon.ico') return route.abort();
        const file = path.join(sandboxRoot, url.pathname);
        if ((url.pathname.startsWith('/assets/js/') || url.pathname === '/assets/img/ui-icons.svg') && fs.existsSync(file)) {
          return route.fulfill({ status: 200, body: fs.readFileSync(file),
            contentType: url.pathname.endsWith('.svg') ? 'image/svg+xml' : 'text/javascript' });
        }
        unexpectedRequests.push(url.pathname);
        return route.abort();
      });
      const page = await browserContext.newPage();
      await page.goto(origin + '/cours/atelier.html');
      const lab = page.locator('[data-lab]');
      await lab.locator('.lab__fallback').waitFor();
      await page.waitForFunction(() => document.querySelector('[data-lab]').__lab.router);
      await page.evaluate(() => { document.querySelector('[data-lab]').__lab.language = ' SQL '; });
      await lab.locator('[data-lab-run]').click();
      await page.waitForFunction(() => {
        const current = document.querySelector('[data-lab]').__lab;
        return !current.running && current.lastOutcome;
      });
      const failed = await lab.evaluate(element => element.__lab.lastOutcome);
      assert.equal(failed.status, 'runtime_error');
      assert.equal(failed.provenance, 'browser');
      assert.equal(failed.provider, 'SQLite 3 (WebAssembly)');
      assert.equal(apiRequests.length, 0);
      assert.equal(await lab.locator('[data-lab-provenance]').getAttribute('data-mode'), 'browser');

      await page.evaluate(() => { document.querySelector('[data-lab]').__lab.language = 'python'; });
      await lab.locator('.lab__fallback').fill('print(1)');
      await lab.locator('[data-lab-run]').click();
      await page.waitForFunction(() => {
        const current = document.querySelector('[data-lab]').__lab;
        return !current.running && current.lastOutcome && current.lastOutcome.status === 'success';
      });
      assert.equal(apiRequests.length, 1);
      assert.equal(apiRequests[0].language, 'python');
      assert.deepEqual(unexpectedRequests, []);
      context.diagnostic('script du routeur absent : erreur SQL locale, zéro appel SQL ; repli Python conservé');
      await browserContext.close();
    } finally {
      await browser.close();
    }
  });

  test('Chromium : arrêt avant chargement et reprise sans course obsolète', { timeout: 45000 }, async context => {
    const browser = await chromium.launch({
      executablePath: process.env.CHROME_BIN,
      headless: true,
      args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-background-networking']
    });
    const origin = 'http://sql-delay.invalid';
    const html = '<!doctype html><html><head><meta charset="utf-8"></head><body>' +
      '<div class="lab" data-lab data-language="sql">' +
      '<script type="text/plain" data-lab-starter>SELECT 1;</script></div>' +
      '<script src="/assets/js/code-lab.js"></script></body></html>';
    try {
      for (const retryBeforeLoad of [false, true]) {
        const browserContext = await browser.newContext();
        const apiRequests = [];
        const unexpectedRequests = [];
        let release;
        let markRequested;
        const gate = new Promise(resolve => { release = resolve; });
        const requested = new Promise(resolve => { markRequested = resolve; });
        await browserContext.addInitScript(() => {
          window.__workersStarted = 0;
          const NativeWorker = window.Worker;
          window.Worker = class extends NativeWorker {
            constructor(url, options) {
              super(url, options);
              window.__workersStarted++;
            }
          };
        });
        await browserContext.route('**/*', async route => {
          const request = route.request();
          const url = new URL(request.url());
          if (url.origin !== origin) {
            unexpectedRequests.push(url.href);
            return route.abort();
          }
          if (url.pathname === '/cours/atelier.html') return route.fulfill({ status: 200, contentType: 'text/html', body: html });
          if (url.pathname === '/api/execute') {
            apiRequests.push(request.url());
            return route.abort();
          }
          if (url.pathname === '/assets/vendor/monaco/vs/loader.js' || url.pathname === '/favicon.ico') return route.abort();
          if (url.pathname === '/assets/js/engines/engine-interface.js') {
            markRequested();
            await gate;
          }
          const file = path.join(sandboxRoot, url.pathname);
          if ((url.pathname.startsWith('/assets/js/') || url.pathname.startsWith('/b1-sql/assets/vendor/sqljs/') ||
              url.pathname === '/assets/img/ui-icons.svg') && fs.existsSync(file) && fs.statSync(file).isFile()) {
            const type = url.pathname.endsWith('.wasm') ? 'application/wasm' :
              url.pathname.endsWith('.svg') ? 'image/svg+xml' : 'text/javascript';
            return route.fulfill({ status: 200, contentType: type, body: fs.readFileSync(file) });
          }
          unexpectedRequests.push(url.pathname);
          return route.abort();
        });
        const page = await browserContext.newPage();
        await page.goto(origin + '/cours/atelier.html', { waitUntil: 'domcontentloaded' });
        await watchdog(requested, 5000, 'Le chargement retardé du routeur ne démarre pas');
        const lab = page.locator('[data-lab]');
        await lab.locator('.lab__fallback').waitFor();
        await lab.locator('.lab__fallback').fill(infiniteQuery);
        await lab.locator('[data-lab-run]').click();
        await lab.locator('[data-lab-stop]').click();
        const cancelled = await lab.evaluate(element => element.__lab.lastOutcome);
        assert.equal(cancelled.status, 'cancelled');
        assert.equal(cancelled.exitCode, 130);
        assert.equal(await page.evaluate(() => window.__workersStarted), 0);

        if (retryBeforeLoad) {
          await lab.locator('[data-lab-run]').click();
        }
        release();
        await page.waitForFunction(() => typeof window.ExecutionRouter === 'function');
        if (retryBeforeLoad) {
          await page.waitForFunction(() => window.__workersStarted === 1);
          await new Promise(resolve => setTimeout(resolve, 300));
          const state = await lab.evaluate(element => ({
            running: element.__lab.running,
            stopHidden: element.querySelector('[data-lab-stop]').hidden,
            runDisabled: element.querySelector('[data-lab-run]').disabled
          }));
          assert.deepEqual(state, { running: true, stopHidden: false, runDisabled: true });
          await lab.locator('[data-lab-stop]').click();
          assert.equal((await lab.evaluate(element => element.__lab.lastOutcome)).status, 'cancelled');
        } else {
          await new Promise(resolve => setTimeout(resolve, 300));
          assert.equal(await page.evaluate(() => window.__workersStarted), 0);
          assert.equal((await lab.evaluate(element => element.__lab.lastOutcome)).status, 'cancelled');
        }

        await lab.locator('.lab__fallback').fill('SELECT 9 AS resultat;');
        await lab.locator('[data-lab-run]').click();
        await page.waitForFunction(() => {
          const current = document.querySelector('[data-lab]').__lab;
          return !current.running && current.lastOutcome && current.lastOutcome.status === 'success';
        });
        const recovered = await lab.evaluate(element => element.__lab.lastOutcome);
        assert.match(recovered.stdout, /\| 9\s*\|/);
        assert.equal(await page.evaluate(() => window.__workersStarted), retryBeforeLoad ? 2 : 1);
        assert.deepEqual(apiRequests, []);
        assert.deepEqual(unexpectedRequests, []);
        await browserContext.close();
      }
      context.diagnostic('arrêt avant routeur : aucun worker tardif ; relance concurrente reste active ; reprise SQL réussie');
    } finally {
      await browser.close();
    }
  });
}
