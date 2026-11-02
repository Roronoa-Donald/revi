'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

if (process.env.REVI_LOT1_ISOLATED !== '1') {
  const bubblewrap = '/usr/bin/bwrap';
  const available = process.platform === 'linux' && fs.existsSync(bubblewrap) &&
    fs.existsSync('/proc/self/ns/net');

  test('F97, F99 et F104 : banc exécuté dans bubblewrap', {
    skip: available ? false : 'bubblewrap et les espaces de noms Linux sont requis'
  }, context => {
    const root = path.resolve(__dirname, '..');
    const argumentsBubblewrap = [
      '--die-with-parent', '--unshare-net', '--unshare-pid', '--clearenv',
      '--ro-bind', '/usr', '/usr'
    ];
    for (const systemPath of ['/bin', '/lib', '/lib64']) {
      if (!fs.existsSync(systemPath)) continue;
      const stat = fs.lstatSync(systemPath);
      argumentsBubblewrap.push(...(stat.isSymbolicLink()
        ? ['--symlink', fs.readlinkSync(systemPath), systemPath]
        : ['--ro-bind', systemPath, systemPath]));
    }
    argumentsBubblewrap.push(
      '--proc', '/proc', '--dev', '/dev', '--tmpfs', '/tmp',
      '--dir', '/work', '--dir', '/work/server', '--dir', '/work/server/services', '--dir', '/work/tests',
      '--ro-bind', path.join(root, 'server/exercises'), '/work/server/exercises',
      '--ro-bind', path.join(root, 'server/services/execution'), '/work/server/services/execution',
      '--ro-bind', path.join(root, 'tests/lot1-sandbox.js'), '/work/tests/lot1-sandbox.js',
      '--ro-bind', __filename, `/work/tests/${path.basename(__filename)}`,
      '--ro-bind', process.execPath, '/node',
      '--chdir', '/work', '--setenv', 'PATH', '/usr/bin:/bin',
      '--setenv', 'REVI_LOT1_ISOLATED', '1',
      '--setenv', 'REVI_AUDIT_NET_NS_HOTE', fs.readlinkSync('/proc/self/ns/net'),
      '/node', '--test', `/work/tests/${path.basename(__filename)}`
    );
    const result = spawnSync(bubblewrap, argumentsBubblewrap, {
      encoding: 'utf8', timeout: 90000, maxBuffer: 4 * 1024 * 1024
    });
    if (result.error) throw result.error;
    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
    context.diagnostic(result.stdout.trim());
  });
} else {
  require('./lot1-sandbox').runInsideIsolatedOrRegister(__filename);

  const catalogue = require('../server/exercises/b1-linux');
  const { runTests, MAX_TESTS } = require('../server/exercises/runner');

  function getExercise(id) {
    const exercise = catalogue.find(item => item.id === id);
    assert.ok(exercise, id);
    return exercise;
  }

  function execute(code, stdin) {
    const result = spawnSync('/bin/bash', ['-c', code], {
      cwd: '/tmp', env: { PATH: '/usr/bin:/bin' }, input: stdin,
      encoding: 'utf8', timeout: 5000, maxBuffer: 1024 * 1024
    });
    if (result.error) throw result.error;
    return {
      ok: result.status === 0,
      status: result.status === 0 ? 'success' : 'runtime_error',
      stdout: result.stdout,
      stderr: result.stderr,
      exitCode: result.status
    };
  }

  function expectOutput(exercise, stdin, expected) {
    const result = execute(exercise.solution, stdin);
    assert.equal(result.ok, true, result.stderr);
    assert.equal(result.stderr, '');
    assert.equal(result.stdout, `${expected}\n`);
  }

  function chainInput(length, destination = 'fichier', exists = true) {
    const links = Array.from({ length }, (_, index) =>
      `lien${index} ${index === length - 1 ? destination : `lien${index + 1}`}`);
    return [String(length), ...links, exists ? '1' : '0',
      ...(exists ? [destination] : []), 'lien0', ''].join('\n');
  }

  test('isolation : pas de home ni de réseau partagé, sources en lecture seule', () => {
    const result = execute(
      'test ! -e /home && test ! -w /work/server/exercises/b1-linux.js && ' +
      'test -w /tmp && test -z "${HOME+x}" && printf isolation-ok', ''
    );
    assert.equal(result.ok, true, result.stderr);
    assert.equal(result.stdout, 'isolation-ok');
  });

  test('F97 : seuil 08K, taille 09K, égalité et ordre stable', () => {
    const exercise = getExercise('lx-c3-e2');
    expectOutput(exercise, '08K\n4\npetit 1K\negal 008K\ngrand 09K\naussi 9K\n',
      'grand 9216\naussi 9216\ntotal : 2 fichier(s)');
  });

  test('F97 : zéro, octets décimaux et nombre de fichiers avec zéro initial', () => {
    const exercise = getExercise('lx-c3-e2');
    expectOutput(exercise, '0\n0\n', 'total : 0 fichier(s)');
    expectOutput(exercise,
      '0008\n08\negal 0008\nneuf 0009\nzero 0\nautre 009\nhuit 08\npetit 1\ngrand 10\nneuf2 9\n',
      'grand 10\nneuf 9\nautre 9\nneuf2 9\ntotal : 4 fichier(s)');
    expectOutput(exercise, '0008M\n2\negal 8M\ngrand 09M\n',
      'grand 9437184\ntotal : 1 fichier(s)');
  });

  test('F97 : borne positive de 64 bits après conversion', () => {
    const exercise = getExercise('lx-c3-e2');
    assert.match(exercise.brief, /9223372036854775807/);
    expectOutput(exercise,
      '9223372036854774783\n2\nlimite 9007199254740991K\nmax 9223372036854775807\n',
      'max 9223372036854775807\nlimite 9223372036854774784\ntotal : 2 fichier(s)');
    expectOutput(exercise, '9223372036854775807\n1\nmax 9223372036854775807\n',
      'total : 0 fichier(s)');
    expectOutput(exercise, '9223372036853727231\n1\nlimite 8796093022207M\n',
      'limite 9223372036853727232\ntotal : 1 fichier(s)');
  });

  test('F99 : le contrat décrit les champs, pas l’inaccessibilité du compte', () => {
    const exercise = getExercise('lx-c5-e3');
    const text = [exercise.goal, exercise.brief, ...exercise.hints].join(' ');
    assert.match(text, /d'autres méthodes de connexion peuvent rester possibles/i);
    assert.match(text, /commençant par <code>!<\/code>/);
    assert.doesNotMatch(text, /authentification impossible|compte désactivé|compte normal/i);
    assert.match(text, /mdp_bloques/);
    assert.match(text, /champs_vides/);
  });

  test('F99 : zéro, champs vides, étoile et préfixes !', () => {
    const exercise = getExercise('lx-c5-e3');
    expectOutput(exercise, '0\n', 'total : 0\nmdp_bloques : 0\nchamps_vides : 0\naucun');
    expectOutput(exercise,
      '7\nalice:!hash\nbob:*\ncarole:!!\ndavid:!\nraf:!$6$sel$hash\neve:\nnoel:$6$sel$hash\n',
      'total : 7\nmdp_bloques : 5\nchamps_vides : 1\neve');
    expectOutput(exercise, '4\na:\nb:x\nc:\nd:*NP*\n',
      'total : 4\nmdp_bloques : 0\nchamps_vides : 2\na\nc');
    expectOutput(exercise, '08\na:!\nb:*\nc:\nd:x\ne:!!\nf:hash\ng:!hachage\nh:\n',
      'total : 8\nmdp_bloques : 4\nchamps_vides : 2\nc\nh');
  });

  test('F104 : lien et destination sont nommés sans limite arbitraire', () => {
    const exercise = getExercise('lx-c2-e3');
    assert.match(exercise.brief, /<code>lien destination<\/code>/);
    assert.match(exercise.brief, /ln -s destination lien/);
    assert.doesNotMatch(exercise.brief, /100 sauts/);
  });

  test('F104 : chaînes saines de 100 et 101 liens et destination absente', () => {
    const exercise = getExercise('lx-c2-e3');
    expectOutput(exercise, chainInput(100), 'fichier');
    expectOutput(exercise, chainInput(101), 'fichier');
    expectOutput(exercise, chainInput(101, 'absent', false), 'casse');
    expectOutput(exercise, '0\n1\nreel\nreel\n', 'reel');
    expectOutput(exercise, '0\n0\ninconnu\n', 'casse');
  });

  test('F104 : cycles courts et cycle après plus de 100 liens', () => {
    const exercise = getExercise('lx-c2-e3');
    expectOutput(exercise, '1\nsoi soi\n0\nsoi\n', 'boucle');
    expectOutput(exercise, '3\na b\nb c\nc b\n0\na\n', 'boucle');
    const links = Array.from({ length: 102 }, (_, index) =>
      `lien${index} ${index === 101 ? 'lien20' : `lien${index + 1}`}`);
    expectOutput(exercise, `102\n${links.join('\n')}\n0\nlien0\n`, 'boucle');
  });

  test('F104 : noms particuliers traités comme des données', () => {
    const exercise = getExercise('lx-c2-e3');
    for (const name of ['-n', 'a]b', 'a=b', 'a?b', 'a*b', 'a\\b', '$(printf${IFS}intrusion>&2)']) {
      expectOutput(exercise, `1\n${name} fichier\n1\nfichier\n${name}\n`, 'fichier');
      expectOutput(exercise, `1\nalias ${name}\n1\n${name}\nalias\n`, name);
    }
  });

  test('les exemples et tous les tests cachés utilisent les vrais corrigés', async () => {
    for (const id of ['lx-c3-e2', 'lx-c5-e3', 'lx-c2-e3']) {
      const exercise = getExercise(id);
      assert.ok(exercise.tests.length <= MAX_TESTS, id);
      for (const example of exercise.examples) expectOutput(exercise, example.stdin, example.expected);
      const report = await runTests(exercise, exercise.solution, {
        execute: payload => {
          assert.equal(payload.language, 'shell');
          return execute(payload.code, payload.stdin);
        }
      });
      assert.equal(report.ok, true, JSON.stringify(report.error));
      assert.equal(report.stop, null, JSON.stringify(report.stop));
      assert.equal(report.passed, exercise.tests.length, id);
    }
  });

  test('F97 : le correcteur rejette la conversion qui réintroduit l’octal', async () => {
    const exercise = getExercise('lx-c3-e2');
    const defective = exercise.solution.replace('10#$valeur', '$valeur');
    assert.notEqual(defective, exercise.solution);
    const report = await runTests(exercise, defective, {
      execute: payload => execute(payload.code, payload.stdin)
    });
    assert.equal(report.ok, true);
    assert.ok(report.passed < report.total);
  });

  test('F104 : le correcteur rejette la limite fictive de 100 liens', async () => {
    const exercise = getExercise('lx-c2-e3');
    const defective = `read -r n
declare -A liens
for ((i=0; i<n; i++)); do
  read -r lien destination
  liens["$lien"]="$destination"
done
read -r m
declare -A fichiers
for ((i=0; i<m; i++)); do
  read -r fichier
  fichiers["$fichier"]=1
done
read -r courant
sauts=0
while [ -n "\${liens[$courant]+x}" ]; do
  courant="\${liens[$courant]}"
  sauts=$((sauts + 1))
  if [ "$sauts" -gt 100 ]; then echo boucle; exit 0; fi
done
if [ -n "\${fichiers[$courant]+x}" ]; then printf '%s\\n' "$courant"; else echo casse; fi
`;
    const report = await runTests(exercise, defective, {
      execute: payload => execute(payload.code, payload.stdin)
    });
    assert.equal(report.ok, true);
    assert.equal(report.stop?.reason, 'wrong_output');
    assert.ok(report.passed < report.total);
  });
}
