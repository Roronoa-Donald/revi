'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

if (process.env.INTEGRITE_CAS_LOT1_ISOLATED !== '1' && process.env.REVI_LOT1_ISOLATED !== '1') {
  const root = path.resolve(__dirname, '..');
  const powerShellCandidates = [
    process.env.POWERSHELL_DIR && path.join(process.env.POWERSHELL_DIR, 'pwsh'),
    ...(process.env.PATH || '').split(path.delimiter).map(directory => path.join(directory, 'pwsh'))
  ].filter(Boolean);
  const powerShell = powerShellCandidates.find(candidate => {
    try {
      fs.accessSync(candidate, fs.constants.X_OK);
      return true;
    } catch {
      return false;
    }
  });
  const available = process.platform === 'linux' && fs.existsSync('/usr/bin/bwrap') &&
    fs.existsSync('/usr/bin/python3');

  test('contre-vérification isolée des cas résiduels du lot 1', {
    skip: available ? false : 'bubblewrap et Python sont requis'
  }, context => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'integrite-cas-lot1-'));
    try {
      fs.writeFileSync(path.join(directory, 'passwd'),
        `sandbox:x:${process.getuid()}:${process.getgid()}:Sandbox:/tmp:/bin/sh\n`);
      fs.writeFileSync(path.join(directory, 'group'), `sandbox:x:${process.getgid()}:\n`);
      fs.writeFileSync(path.join(directory, 'nsswitch.conf'), 'passwd: files\ngroup: files\n');
      fs.writeFileSync(path.join(directory, 'os-release'), 'NAME=Sandbox\nID=linux\n');

      const arguments_ = [
        '--die-with-parent', '--unshare-net', '--unshare-pid', '--clearenv',
        '--ro-bind', '/usr', '/usr', '--symlink', 'usr/bin', '/bin',
        '--symlink', 'usr/lib', '/lib', '--symlink', 'usr/lib', '/lib64',
        '--dir', '/etc', '--ro-bind', '/etc/ld.so.cache', '/etc/ld.so.cache',
        '--ro-bind', path.join(directory, 'passwd'), '/etc/passwd',
        '--ro-bind', path.join(directory, 'group'), '/etc/group',
        '--ro-bind', path.join(directory, 'nsswitch.conf'), '/etc/nsswitch.conf',
        '--ro-bind', path.join(directory, 'os-release'), '/etc/os-release',
        '--proc', '/proc', '--dev', '/dev', '--tmpfs', '/tmp',
        '--dir', '/project', '--dir', '/project/tests', '--dir', '/project/server',
        '--dir', '/project/server/exercises', '--dir', '/project/server/exercises/rd_winserver',
        '--dir', '/project/server/exercises/api-rest-flask', '--dir', '/project/server/services',
        '--dir', '/project/rd_winserver', '--dir', '/project/rd_winserver/chapitres',
        '--dir', '/project/api-rest-flask', '--dir', '/project/api-rest-flask/chapitres',
        '--ro-bind', path.join(root, 'server/exercises/runner.js'), '/project/server/exercises/runner.js',
        '--ro-bind', path.join(root, 'server/services/execution'), '/project/server/services/execution',
        '--ro-bind', path.join(root, 'server/exercises/rd_winserver/chapitre4.js'),
        '/project/server/exercises/rd_winserver/chapitre4.js',
        '--ro-bind', path.join(root, 'server/exercises/api-rest-flask/chapitre4.js'),
        '/project/server/exercises/api-rest-flask/chapitre4.js',
        '--ro-bind', path.join(root, 'rd_winserver/chapitres/chapitre4.html'),
        '/project/rd_winserver/chapitres/chapitre4.html',
        '--ro-bind', path.join(root, 'api-rest-flask/chapitres/chapitre4.html'),
        '/project/api-rest-flask/chapitres/chapitre4.html',
        '--ro-bind', __filename, '/project/tests/integrite-cas-lot1.test.js',
        '--ro-bind', fs.realpathSync(process.execPath), '/usr/bin/node',
        '--chdir', '/project', '--setenv', 'PATH', '/usr/bin:/bin',
        '--setenv', 'HOME', '/tmp', '--setenv', 'LANG', 'C.UTF-8',
        '--setenv', 'INTEGRITE_CAS_LOT1_ISOLATED', '1',
        '--setenv', 'INTEGRITE_CAS_LOT1_HOST_NET', fs.readlinkSync('/proc/self/ns/net')
      ];
      if (powerShell) {
        arguments_.push('--dir', '/runtimes', '--ro-bind', path.dirname(fs.realpathSync(powerShell)),
          '/runtimes/powershell', '--setenv', 'INTEGRITE_CAS_LOT1_PWSH', '/runtimes/powershell/pwsh');
      }
      arguments_.push('/usr/bin/node', '--test', '/project/tests/integrite-cas-lot1.test.js');
      const result = spawnSync('/usr/bin/bwrap', arguments_, {
        encoding: 'utf8', timeout: 180000, maxBuffer: 8 * 1024 * 1024
      });
      assert.equal(result.status, 0, `${result.error || ''}\n${result.stdout}\n${result.stderr}`);
      context.diagnostic(result.stdout.trim());
    } finally {
      fs.rmSync(directory, { recursive: true, force: true });
    }
  });
} else {
  const hostNetwork = process.env.INTEGRITE_CAS_LOT1_HOST_NET || process.env.REVI_AUDIT_NET_NS_HOTE;
  assert.ok(hostNetwork);
  assert.notEqual(fs.readlinkSync('/proc/self/ns/net'), hostNetwork);
  assert.equal(fs.readFileSync('/proc/1/comm', 'utf8').trim(), 'bwrap');
  assert.equal(process.env.HOME, '/tmp');
  assert.equal(fs.existsSync('/home'), false);

  const { runTests, MAX_TESTS } = require('../server/exercises/runner');
  const windows = require('../server/exercises/rd_winserver/chapitre4')
    .find(exercise => exercise.id === 'ws2-c4-e3');
  const flask = require('../server/exercises/api-rest-flask/chapitre4')
    .find(exercise => exercise.id === 'fl2-c4-e1');
  const powerShellAvailable = Boolean(process.env.INTEGRITE_CAS_LOT1_PWSH);

  const windowsExpected = new Map([
    ['hebdomadaire', 'action : analyse des logs'],
    ['mensuelle', 'action : test de sauvegarde'],
    ['MENSUELLE', 'action : test de sauvegarde'],
    ['trimestrielle', 'action : test PRA'],
    ['annuelle', 'action : audit securite'],
    ['semestrielle', 'action : inconnue'],
    [' ', 'action : inconnue'],
    ['\n', 'action : inconnue'],
    ['hebdomadaire-plus', 'action : inconnue']
  ]);
  const flaskExpected = new Map([
    ['creation', '201 Created'],
    ['lecture', '200 OK'],
    ['succes', '200 OK'],
    ['suppression', '204 No Content'],
    ['introuvable', '404 Not Found'],
    ['invalide', '400 Bad Request'],
    ['non_autorise', '401 Unauthorized'],
    ['interdit', '403 Forbidden']
  ]);

  function executeIsolated({ language, code, stdin }) {
    const directory = fs.mkdtempSync('/tmp/integrite-execution-');
    const source = path.join(directory, language === 'powershell' ? 'main.ps1' : 'main.py');
    try {
      fs.writeFileSync(source, code);
      const binary = language === 'powershell' ? process.env.INTEGRITE_CAS_LOT1_PWSH : '/usr/bin/python3';
      const arguments_ = language === 'powershell'
        ? ['-NoLogo', '-NoProfile', '-NonInteractive', '-File', source]
        : [source];
      const result = spawnSync(binary, arguments_, {
        cwd: '/tmp', input: stdin, encoding: 'utf8', timeout: 10000, maxBuffer: 1024 * 1024,
        env: {
          HOME: '/tmp', LANG: 'C.UTF-8', PATH: '/usr/bin:/bin',
          PYTHONDONTWRITEBYTECODE: '1', POWERSHELL_TELEMETRY_OPTOUT: '1'
        }
      });
      if (result.error) throw result.error;
      return {
        ok: result.status === 0,
        status: result.status === 0 ? 'success' : 'runtime_error',
        stdout: result.stdout,
        stderr: result.stderr,
        exitCode: result.status
      };
    } finally {
      fs.rmSync(directory, { recursive: true, force: true });
    }
  }

  function assertReference(exercise, expected) {
    for (const entry of [...exercise.examples, ...exercise.tests]) {
      assert.equal(entry.expected, expected.get(entry.stdin), `${exercise.id} : ${JSON.stringify(entry.stdin)}`);
    }
    for (const [stdin, output] of expected) {
      const result = executeIsolated({ language: exercise.language, code: exercise.solution, stdin });
      assert.equal(result.ok, true, `${exercise.id} : ${result.stderr}`);
      assert.equal(result.stdout.replace(/\r\n/g, '\n').trimEnd(), output,
        `${exercise.id} : ${JSON.stringify(stdin)}`);
    }
  }

  function assertOriginalTests(exercise, original) {
    for (const entry of original) {
      assert.ok(exercise.tests.some(candidate =>
        candidate.label === entry.label && candidate.stdin === entry.stdin && candidate.expected === entry.expected),
      `${exercise.id} : test initial absent ou modifié : ${entry.label}`);
    }
    assert.ok(exercise.tests.length <= MAX_TESTS);
    assert.equal(new Set(exercise.tests.map(entry => entry.stdin)).size, exercise.tests.length);
    for (const entry of exercise.tests) {
      assert.ok(!exercise.examples.some(example => example.stdin === entry.stdin && example.expected === entry.expected),
        `${exercise.id} : un test recopie l’exemple visible`);
    }
  }

  function mutation(exercise, before, after) {
    assert.ok(exercise.solution.includes(before), `${exercise.id} : mutation introuvable`);
    return exercise.solution.replace(before, after);
  }

  test('sources et pages : énoncés, exemples et balisage concordent', () => {
    for (const [exercise, course] of [[windows, 'rd_winserver'], [flask, 'api-rest-flask']]) {
      const page = fs.readFileSync(`/project/${course}/chapitres/chapitre4.html`, 'utf8');
      assert.ok(page.includes(`data-exercise="${exercise.id}"`));
      assert.ok(page.includes(exercise.brief), `${exercise.id} : énoncé altéré dans la page`);
      assert.ok(page.includes(`data-stdin="${exercise.examples[0].stdin}"`));
      assert.ok(page.includes(`<pre>${exercise.examples[0].expected}</pre>`));
      assert.ok(!page.includes(exercise.solution.trim()));
    }
    assert.deepEqual([...windows.brief.matchAll(/<code>(.*?)<\/code>/g)].map(match => match[1]), [
      'hebdomadaire', 'mensuelle', 'trimestrielle', 'annuelle', 'action : analyse des logs',
      'action : test de sauvegarde', 'action : test PRA', 'action : audit securite', 'action : inconnue'
    ]);
    assert.match(windows.brief, /comparaison ne distingue pas les majuscules des minuscules/);
    assert.deepEqual([...flask.brief.matchAll(/<code>(.*?)<\/code>/g)].map(match => match[1]), [
      'creation', '201 Created', 'lecture', 'succes', '200 OK', 'suppression', '204 No Content',
      'introuvable', '404 Not Found', 'invalide', '400 Bad Request', 'non_autorise', '401 Unauthorized',
      'interdit', '403 Forbidden', '&lt;code&gt; &lt;libelle&gt;'
    ]);
    assert.equal((flask.brief.match(/<p>/g) || []).length, 2);
    assert.equal((flask.brief.match(/<\/p>/g) || []).length, 2);
  });

  test('ws2-c4-e3 : corrigé, exemple, tests et fréquences indépendantes', {
    skip: powerShellAvailable ? false : 'renseigner POWERSHELL_DIR pour exécuter PowerShell'
  }, () => assertReference(windows, windowsExpected));

  test('fl2-c4-e1 : corrigé, exemple, tests et huit scénarios annoncés', () => {
    assertReference(flask, flaskExpected);
  });

  for (const exercise of [windows, flask]) {
    test(`${exercise.id} : le correcteur accepte tous les tests du corrigé`, {
      skip: exercise.language !== 'powershell' || powerShellAvailable
        ? false : 'renseigner POWERSHELL_DIR pour exécuter PowerShell'
    }, async () => {
      let calls = 0;
      const report = await runTests(exercise, exercise.solution, {
        execute: payload => {
          calls++;
          return executeIsolated(payload);
        }
      });
      assert.equal(report.ok, true, JSON.stringify(report));
      assert.equal(report.stop, null, JSON.stringify(report));
      assert.equal(exercise.verifyFirstExample, true);
      assert.equal(report.total, exercise.tests.length + 1);
      assert.equal(report.passed, exercise.tests.length + 1);
      assert.equal(calls, exercise.tests.length + 1);
    });
  }

  test('ws2-c4-e3 : anciens tests conservés et limites notées', () => {
    assertOriginalTests(windows, [
      { label: 'Fréquence hebdomadaire', stdin: 'hebdomadaire', expected: 'action : analyse des logs' },
      { label: 'Fréquence trimestrielle', stdin: 'trimestrielle', expected: 'action : test PRA' },
      { label: 'Fréquence annuelle', stdin: 'annuelle', expected: 'action : audit securite' }
    ]);
    for (const input of ['MENSUELLE', 'semestrielle', ' ', 'hebdomadaire-plus']) {
      assert.ok(windows.tests.some(entry => entry.stdin === input), `Cas non noté : ${JSON.stringify(input)}`);
    }
  });

  test('fl2-c4-e1 : anciens tests conservés et scénarios supplémentaires notés', () => {
    assertOriginalTests(flask, [
      { label: 'Suppression sans contenu', stdin: 'suppression', expected: '204 No Content' },
      { label: 'Ressource inexistante', stdin: 'introuvable', expected: '404 Not Found' },
      { label: 'Payload de requête invalide', stdin: 'invalide', expected: '400 Bad Request' }
    ]);
    for (const input of ['lecture', 'succes', 'non_autorise', 'interdit']) {
      assert.ok(flask.tests.some(entry => entry.stdin === input), `Cas non noté : ${input}`);
    }
  });

  const windowsMutations = [
    ['mensuelle mal associée', '"mensuelle" { Write-Output "action : test de sauvegarde" }',
      '"mensuelle" { Write-Output "action : audit securite" }', 'MENSUELLE'],
    ['absence de branche par défaut', '    default { Write-Output "action : inconnue" }', '', 'semestrielle'],
    ['fréquence blanche ignorée', 'default { Write-Output "action : inconnue" }',
      'default { if (-not [string]::IsNullOrWhiteSpace($freq)) { Write-Output "action : inconnue" } }', ' '],
    ['préfixe reconnu à tort', '"hebdomadaire" { Write-Output "action : analyse des logs" }',
      '{ $_ -like "hebdomadaire*" } { Write-Output "action : analyse des logs" }', 'hebdomadaire-plus']
  ];
  const flaskMutations = [
    ['lecture associée à 204', "'lecture': '200 OK'", "'lecture': '204 No Content'", 'lecture'],
    ['succès associé à 201', "'succes': '200 OK'", "'succes': '201 Created'", 'succes'],
    ['401 remplacé par 403', "'non_autorise': '401 Unauthorized'", "'non_autorise': '403 Forbidden'", 'non_autorise'],
    ['403 remplacé par 401', "'interdit': '403 Forbidden'", "'interdit': '401 Unauthorized'", 'interdit']
  ];
  const originalInputs = new Map([
    [windows.id, new Set(['hebdomadaire', 'trimestrielle', 'annuelle'])],
    [flask.id, new Set(['suppression', 'introuvable', 'invalide'])]
  ]);

  for (const [exercise, mutations] of [[windows, windowsMutations], [flask, flaskMutations]]) {
    for (const [label, before, after, input] of mutations) {
      test(`${exercise.id} : rejette ${label}`, {
        skip: exercise.language !== 'powershell' || powerShellAvailable
          ? false : 'renseigner POWERSHELL_DIR pour exécuter PowerShell'
      }, async context => {
        const code = mutation(exercise, before, after);
        const previous = {
          ...exercise,
          tests: exercise.tests.filter(entry => originalInputs.get(exercise.id).has(entry.stdin)),
          verifyFirstExample: false
        };
        assert.equal(previous.tests.length, 3);
        const beforeReport = await runTests(previous, code, { execute: executeIsolated });
        assert.equal(beforeReport.ok, true, JSON.stringify(beforeReport));
        assert.equal(beforeReport.stop, null, JSON.stringify(beforeReport));
        assert.equal(beforeReport.passed, 3);
        const report = await runTests(exercise, code, { execute: executeIsolated });
        assert.equal(report.ok, true, JSON.stringify(report));
        assert.equal(report.stop?.reason, 'wrong_output', JSON.stringify(report));
        assert.equal(report.stop.input, input);
        context.diagnostic(`Avant : acceptée 3/3 ; après : rejetée sur ${JSON.stringify(input)}.`);
      });
    }
  }

  test('ws2-c4-e3 : diagnostic de la couverture de la fréquence mensuelle', {
    skip: powerShellAvailable ? false : 'renseigner POWERSHELL_DIR pour exécuter PowerShell'
  }, async context => {
    assert.equal(windows.examples[0].stdin, 'mensuelle');
    assert.equal(windows.examples[0].expected, 'action : test de sauvegarde');
    const code = mutation(windows, '"mensuelle" { Write-Output "action : test de sauvegarde" }',
      '{ $_ -ceq "MENSUELLE" } { Write-Output "action : test de sauvegarde" }');
    const output = executeIsolated({ language: windows.language, code, stdin: 'mensuelle' });
    assert.equal(output.ok, true, output.stderr);
    assert.equal(output.stdout.trim(), 'action : inconnue');
    const report = await runTests(windows, code, { execute: executeIsolated });
    assert.equal(report.ok, true, JSON.stringify(report));
    assert.equal(report.stop?.reason, 'wrong_output', JSON.stringify(report));
    assert.equal(report.stop.input, 'mensuelle');
    context.diagnostic('La variante incorrecte pour mensuelle est rejetée sur l’exemple affiché.');
  });

  test('fl2-c4-e1 : diagnostic de la couverture du scénario création', async context => {
    assert.equal(flask.examples[0].stdin, 'creation');
    assert.equal(flask.examples[0].expected, '201 Created');
    const code = mutation(flask, "'creation': '201 Created'", "'creation': '200 OK'");
    const output = executeIsolated({ language: flask.language, code, stdin: 'creation' });
    assert.equal(output.ok, true, output.stderr);
    assert.equal(output.stdout.trim(), '200 OK');
    const report = await runTests(flask, code, { execute: executeIsolated });
    assert.equal(report.ok, true, JSON.stringify(report));
    assert.equal(report.stop?.reason, 'wrong_output', JSON.stringify(report));
    assert.equal(report.stop.input, 'creation');
    context.diagnostic('La variante incorrecte pour création est rejetée sur l’exemple affiché.');
  });
}
