'use strict';

if (require('./lot1-sandbox').runInsideIsolatedOrRegister(__filename)) {

const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const exercises = require('../server/exercises');
const { runTests } = require('../server/exercises/runner');

function executeIsolated(code, stdin = '', direct = false) {
  let directory;
  let phase = 'création du répertoire';
  let failure;
  try {
    directory = fs.mkdtempSync(path.join(os.tmpdir(), 'linux-cas-lot1-'));
    const script = path.join(directory, 'main.sh');
    phase = 'écriture du script';
    fs.writeFileSync(script, code, { mode: 0o755 });
    phase = 'lancement du script';
    const result = spawnSync(direct ? script : '/bin/bash', direct ? [] : [script], {
      cwd: '/tmp', env: { PATH: '/usr/bin:/bin' }, input: stdin,
      encoding: 'utf8', timeout: 5000, maxBuffer: 1024 * 1024
    });
    const inputClosedOnExit = result.error?.code === 'EPIPE' &&
      Number.isInteger(result.status) && result.signal === null;
    if (result.error && result.error.code !== 'ENOENT' && !inputClosedOnExit) throw result.error;
    return {
      ok: result.status === 0,
      status: result.status === 0 ? 'success' : 'runtime_error',
      stdout: result.stdout,
      stderr: result.stderr || (inputClosedOnExit ? '' : result.error?.message) || '',
      exitCode: result.status
    };
  } catch (error) {
    failure = error;
    error.message = `${phase} : ${error.message}`;
    throw error;
  } finally {
    if (directory) {
      try {
        fs.rmSync(directory, { recursive: true, force: true });
      } catch (error) {
        if (failure) failure.message += ` ; nettoyage : ${error.code || error.message}`;
        else {
          error.message = `nettoyage du répertoire : ${error.message}`;
          throw error;
        }
      }
    }
  }
}

function expectOutput(code, stdin, expected, direct = false) {
  const result = executeIsolated(code, stdin, direct);
  assert.equal(result.ok, true, result.stderr);
  assert.equal(result.stdout, `${expected}\n`);
}

function getExercise(id) {
  const exercise = exercises.getExercise(id);
  assert.ok(exercise, id);
  return exercise;
}

test('les scripts sont exécutés sans home, sans réseau partagé et avec le projet en lecture seule', () => {
  const probe = 'test ! -e /home && test ! -w /work/server/exercises/b1-linux.js && ' +
    'test -w /tmp && test -z "${HOME+x}" && ' +
    'readlink /proc/self/ns/net && readlink /proc/self/ns/pid\n';
  const result = executeIsolated(probe);
  assert.equal(result.ok, true, result.stderr);
  const namespaces = result.stdout.trim().split('\n');
  assert.equal(namespaces.length, 2);
  assert.equal(namespaces[0], fs.readlinkSync('/proc/self/ns/net'));
  assert.notEqual(namespaces[0], process.env.REVI_AUDIT_NET_NS_HOTE);
  assert.equal(namespaces[1], fs.readlinkSync('/proc/self/ns/pid'));
  assert.equal(fs.readFileSync('/proc/1/comm', 'utf8').trim(), 'bwrap');
});

test('F71 : read conserve le dernier fragment malgré son statut de fin de fichier', () => {
  const single = executeIsolated('IFS= read -r ligne\netat=$?\nprintf "%s|%s\\n" "$etat" "$ligne"\n', 'dernier');
  assert.equal(single.ok, true, single.stderr);
  assert.equal(single.stdout, '1|dernier\n');
  const loop = executeIsolated('while IFS= read -r ligne || [ -n "$ligne" ]; do\n  printf "%s\\n" "$ligne"\ndone\n', 'premier\ndernier');
  assert.equal(loop.ok, true, loop.stderr);
  assert.equal(loop.stdout, 'premier\ndernier\n');
  const page = fs.readFileSync('/work/linux/chapitres/chapitre5.html', 'utf8');
  assert.match(page, /affecte les caractères déjà lus à la variable/);
  assert.doesNotMatch(page, /la dernière donnée est perdue/);
});

for (const id of ['lx-c3-e2', 'lx-c6-e1', 'lx-c4-e2', 'lx-c2-e3']) {
  test(`${id} : exemples et correcteur exécutent le corrigé général`, async () => {
    const exercise = getExercise(id);
    for (const example of exercise.examples) {
      expectOutput(exercise.solution, example.stdin, example.expected);
    }

    let calls = 0;
    const report = await runTests(exercise, exercise.solution, {
      execute: payload => {
        calls++;
        assert.equal(payload.language, 'shell');
        return executeIsolated(payload.code, payload.stdin);
      }
    });
    assert.equal(report.ok, true, JSON.stringify(report.error));
    assert.equal(report.stop, null, JSON.stringify(report.stop));
    assert.equal(report.passed, exercise.tests.length);
    assert.equal(calls, exercise.tests.length);
  });
}

test('F97 : seuil, nombre puis fichiers, unités, égalité et tri stable', () => {
  const exercise = getExercise('lx-c3-e2');
  assert.match(exercise.brief, /lit d'abord <strong>un seuil<\/strong>, puis <strong>n<\/strong>/);
  assert.equal(exercise.starter.split('\n')[0], 'read -r seuil');
  for (const entry of [...exercise.examples, ...exercise.tests]) {
    const [threshold, count, ...files] = entry.stdin.trimEnd().split('\n');
    assert.match(threshold, /^\d+[KM]?$/);
    assert.match(count, /^\d+$/);
    assert.equal(files.length, Number(count));
  }
  expectOutput(exercise.solution, '0\n0\n', 'total : 0 fichier(s)');
  expectOutput(exercise.solution,
    '1K\n5\npremier 1025\negal 1K\nsecond 1025\ngros 2K\npetit 1\n',
    'gros 2048\npremier 1025\nsecond 1025\ntotal : 3 fichier(s)');
});

test('F101 : le shebang est obligatoire même si le programme fonctionne sans lui', async () => {
  const exercise = getExercise('lx-c6-e1');
  const body = exercise.solution.slice(exercise.solution.indexOf('\n') + 1);
  for (const entry of exercise.tests) expectOutput(body, entry.stdin, entry.expected);

  const invalid = [
    body,
    `\n#!/bin/bash\n${body}`,
    `\uFEFF#!/bin/bash\n${body}`,
    `#!/bin/sh\n${body}`,
    `#!/bin/bash\r\n${body}`,
    `#!/bin/bash \n${body}`,
    `#!/bin/bash --noprofile\n${body}`,
    `#!/bin/bashx\n${body}`
  ];
  let calls = 0;
  for (const code of invalid) {
    const report = await runTests(exercise, code, {
      execute: payload => {
        calls++;
        return executeIsolated(payload.code, payload.stdin);
      }
    });
    assert.equal(report.passed, 0);
    assert.equal(report.stop.reason, 'invalid_source');
    assert.match(report.stop.userMessage, /première ligne.*#!\/bin\/bash/);
  }
  assert.equal(calls, 0);
});

test('F101 : le shebang fonctionne à l’exécution directe et ne suffit pas à valider la sortie', async () => {
  const exercise = getExercise('lx-c6-e1');
  const example = exercise.examples[0];
  expectOutput(exercise.solution, example.stdin, example.expected, true);
  const missingInterpreter = exercise.solution.replace('#!/bin/bash', '#!/bin/introuvable');
  assert.equal(executeIsolated(missingInterpreter, example.stdin, true).ok, false);

  let calls = 0;
  const report = await runTests(exercise, '#!/bin/bash\nprintf "incorrect\\n"\n', {
    execute: payload => {
      calls++;
      return executeIsolated(payload.code, payload.stdin);
    }
  });
  assert.equal(report.ok, true, JSON.stringify(report.error));
  assert.equal(calls, 1);
  assert.equal(report.passed, 0);
  assert.equal(report.stop.reason, 'wrong_output');
});

test('F101 : une entrée ignorée ne crée pas une panne de tube', async () => {
  const exercise = getExercise('lx-c6-e1');
  const input = 'x'.repeat(256 * 1024);
  const code = '#!/bin/bash\nexec 0<&-\nprintf "incorrect\\n"\n';
  const result = executeIsolated(code, input);
  assert.equal(result.ok, true, result.stderr);
  assert.equal(result.stdout, 'incorrect\n');
  const failed = executeIsolated('#!/bin/bash\nexec 0<&-\nprintf "échec\\n" >&2\nexit 7\n', input);
  assert.equal(failed.ok, false);
  assert.equal(failed.status, 'runtime_error');
  assert.equal(failed.exitCode, 7);
  assert.equal(failed.stderr, 'échec\n');

  const single = { ...exercise, tests: [{ ...exercise.tests[0], stdin: input }] };
  const report = await runTests(single, code, {
    execute: payload => executeIsolated(payload.code, payload.stdin)
  });
  assert.equal(report.ok, true, JSON.stringify(report.error));
  assert.equal(report.stop?.reason, 'wrong_output');
});

test('F101 : une panne de préparation conserve son code et son étape', async context => {
  const error = Object.assign(new Error('panne simulée'), { code: 'EIO' });
  context.mock.method(fs, 'mkdtempSync', () => { throw error; });
  const exercise = getExercise('lx-c6-e1');
  const report = await runTests(exercise, '#!/bin/bash\nprintf "incorrect\\n"\n', {
    execute: payload => executeIsolated(payload.code, payload.stdin)
  });
  assert.equal(report.ok, false);
  assert.equal(report.stop, null);
  assert.equal(report.error.code, 'EIO');
  assert.match(report.error.message, /création du répertoire : panne simulée/);
});

test('F101 : les autres exercices ne reçoivent pas de nouvelle contrainte de shebang', async () => {
  const exercise = getExercise('lx-c1-e1');
  let calls = 0;
  const report = await runTests(exercise, 'code sans shebang', {
    execute: async () => ({ ok: true, stdout: exercise.tests[calls++].expected })
  });
  assert.equal(calls, exercise.tests.length);
  assert.equal(report.passed, exercise.tests.length);
  assert.equal(report.stop, null);
});

function applyModification(droits, classe, action, lettres) {
  const result = [...droits];
  for (const [group, name] of ['u', 'g', 'o'].entries()) {
    if (!classe.includes('a') && !classe.includes(name)) continue;
    for (const [offset, permission] of ['r', 'w', 'x'].entries()) {
      if (lettres.includes(permission)) result[group * 3 + offset] = action === '+' ? permission : '-';
    }
  }
  return result.join('');
}

test('F103 : toutes les classes simples et combinées appliquent les droits demandés', () => {
  const exercise = getExercise('lx-c4-e2');
  const symbols = ['u', 'g', 'o', 'a'];
  const classes = [...symbols];
  for (const first of symbols) {
    for (const second of symbols) {
      classes.push(first + second);
      for (const third of symbols) classes.push(first + second + third);
    }
  }
  const cases = [];
  for (const classe of classes) {
    for (const action of ['+', '-']) {
      for (const lettres of ['r', 'w', 'x', 'rw', 'wx', 'rx', 'rwx', 'xwr', 'rr']) {
        const droits = 'r-x-w--wx';
        cases.push({
          input: `${droits} ${classe}${action}${lettres}`,
          expected: applyModification(droits, classe, action, lettres)
        });
      }
    }
  }
  for (let index = 0; index < cases.length; index += 160) {
    const batch = cases.slice(index, index + 160);
    const stdin = `${batch.length}\n${batch.map(entry => entry.input).join('\n')}\n`;
    expectOutput(exercise.solution, stdin, batch.map(entry => entry.expected).join('\n'));
  }
});

function chainInput(length, fileExists = true) {
  const links = Array.from({ length }, (_, index) =>
    `lien${index} ${index + 1 === length ? 'fichier' : `lien${index + 1}`}`);
  return [String(length), ...links, fileExists ? '1' : '0', ...(fileExists ? ['fichier'] : []), 'lien0', ''].join('\n');
}

test('F104 : fichiers déclarés, absences, boucle et chaînes longues', () => {
  const exercise = getExercise('lx-c2-e3');
  for (const [stdin, expected] of [
    ['0\n0\ninconnu\n', 'casse'],
    ['0\n1\nreel\nreel\n', 'reel'],
    ['0\n1\n-n\n-n\n', '-n'],
    ['1\nlien absent\n1\nreel\nlien\n', 'casse'],
    ['0\n0\n/bin/bash\n', 'casse'],
    ['2\na b\nb c\n2\nc\nautre\na\n', 'c'],
    ['1\nx x\n0\nx\n', 'boucle'],
    [chainInput(100), 'fichier'],
    [chainInput(100, false), 'casse'],
    [chainInput(101), 'fichier']
  ]) expectOutput(exercise.solution, stdin, expected);
});

test('F104 : les caractères spéciaux d’un nom restent des données', () => {
  const exercise = getExercise('lx-c2-e3');
  const name = '$(touch${IFS}/tmp/linux-cas-marker)';
  const code = `${exercise.solution}\nif [ -e /tmp/linux-cas-marker ]; then printf 'intrusion\\n'; fi\n`;
  const stdin = `1\n${name} fichier\n1\nfichier\n${name}\n`;
  expectOutput(code, stdin, 'fichier');
});

}
