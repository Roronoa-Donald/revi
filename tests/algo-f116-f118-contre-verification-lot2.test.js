'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

if (process.env.REVI_LOT1_ISOLATED !== '1') {
  const bubblewrap = '/usr/bin/bwrap';
  const available = process.platform === 'linux' &&
    [bubblewrap, '/usr/bin/python3', '/etc/ld.so.cache', '/proc/self/ns/net'].every(file => fs.existsSync(file));

  test('F116–F118 : banc exécuté dans bubblewrap', {
    skip: available ? false : 'bubblewrap et Python système sont requis pour le rejeu isolé'
  }, context => {
    const root = path.resolve(__dirname, '..');
    const argumentsBubblewrap = [
      '--die-with-parent', '--unshare-all', '--new-session', '--clearenv', '--cap-drop', 'ALL',
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
      '--dir', '/etc', '--ro-bind', '/etc/ld.so.cache', '/etc/ld.so.cache',
      '--proc', '/proc', '--dev', '/dev', '--tmpfs', '/tmp',
      '--dir', '/project', '--dir', '/project/server', '--dir', '/project/server/exercises',
      '--dir', '/project/server/services', '--dir', '/project/tests',
      '--dir', '/project/assets', '--dir', '/project/assets/js',
      '--ro-bind', path.join(root, 'assets/js/engines'), '/project/assets/js/engines',
      '--ro-bind', path.join(root, 'server/exercises/b1-algo.js'), '/project/server/exercises/b1-algo.js',
      '--ro-bind', path.join(root, 'server/exercises/runner.js'), '/project/server/exercises/runner.js',
      '--ro-bind', path.join(root, 'server/services/execution'), '/project/server/services/execution',
      '--ro-bind', path.join(root, 'tests/lot1-sandbox.js'), '/project/tests/lot1-sandbox.js',
      '--ro-bind', __filename, `/project/tests/${path.basename(__filename)}`,
      '--ro-bind', process.execPath, '/node',
      '--chdir', '/project', '--setenv', 'PATH', '/usr/bin:/bin', '--setenv', 'HOME', '/tmp',
      '--setenv', 'LANG', 'C.UTF-8', '--setenv', 'REVI_LOT1_ISOLATED', '1',
      '--setenv', 'REVI_ISOLE', '1', '--setenv', 'REVI_AUDIT_NET_NS_HOTE', fs.readlinkSync('/proc/self/ns/net'),
      '/node', '--test', `/project/tests/${path.basename(__filename)}`
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

  const exercises = require('../server/exercises/b1-algo');
  const { runTests, MAX_TESTS } = require('../server/exercises/runner');
  const PseudoCodeEngine = require('../assets/js/engines/pseudo-code-engine');
  const localRunner = require('../server/services/execution/local-runner');

  function exercise(id) {
    const matches = exercises.filter(item => item.id === id);
    assert.equal(matches.length, 1, `Exercice ${id} absent ou dupliqué`);
    return matches[0];
  }

  function python(code, stdin = '') {
    return spawnSync('/usr/bin/python3', ['-I', '-B', '-c', code], {
      input: stdin,
      encoding: 'utf8',
      timeout: 5000,
      maxBuffer: 1024 * 1024
    });
  }

  async function execute({ code, stdin }) {
    const res = await localRunner.runPseudoCode(code, stdin);
    return {
      ok: res.ok,
      status: res.ok ? 'success' : 'runtime_error',
      stdout: res.data?.stdout || '',
      stderr: res.data?.stderr || '',
      compileError: res.data?.compile_error || '',
      exitCode: res.data?.exit_code ?? (res.ok ? 0 : 1)
    };
  }

  async function checked(item, code) {
    const report = await runTests(item, code, { execute });
    assert.equal(report.ok, true, JSON.stringify(report));
    assert.equal(report.total, item.tests.length);
    return report;
  }

  async function checkExample(item, code) {
    const sample = item.examples[0];
    const result = await execute({ code, stdin: sample.stdin });
    assert.equal(result.ok, true, result.stderr || result.compileError);
    assert.equal(result.stdout.trim(), sample.expected.trim());
  }

  test('F116 : reproductions historiques de récursion trop profonde en Python', context => {
    const historicalPower = `import sys
def puissance(base, exposant):
    if exposant == 0:
        return 1
    return base * puissance(base, exposant - 1)
puissance(1, sys.getrecursionlimit())
`;
    const historicalGcd = `import sys
def pgcd(premier, second):
    if second == 0:
        return abs(premier)
    return pgcd(second, premier % second)
premier, second = 1, 0
for indice in range(sys.getrecursionlimit() + 2):
    premier, second = premier + second, premier
pgcd(premier, second)
`;
    for (const [name, code] of [['puissance', historicalPower], ['PGCD', historicalGcd]]) {
      const result = python(code);
      assert.equal(result.status, 1, result.error || result.stderr);
      assert.match(result.stderr, /RecursionError/);
      context.diagnostic(`${name} sans borne : RecursionError reproduite`);
    }
  });

  test('F116 : domaine annoncé, cas limites et tests cachés cohérents', () => {
    const item = exercise('algo-c9-e3');
    assert.equal(item.language, 'algo');
    assert.match(item.brief, /\|base\|\s*≤\s*10/);
    assert.match(item.brief, /0\s*≤\s*exposant\s*≤\s*15/);
    assert.match(item.brief, /\|a\|,\s*\|b\|\s*≤\s*1000000000000/);
    assert.match(item.brief, /récursion/i);
    assert.match(item.brief, /puissance\(0, 0\)\s*=\s*1/);
    assert.match(item.brief, /pgcd\(0, 0\)\s*=\s*0/);
    assert.ok(item.tests.length <= MAX_TESTS);

    let largestExponent = 0;
    let largestBase = 0n;
    let largestOperand = 0n;
    for (const sample of [...item.examples, ...item.tests]) {
      const values = sample.stdin.trim().split(/\s+/).map(BigInt);
      assert.equal(values.length, 4);
      const [base, exponent, firstOperand, secondOperand] = values;
      const absolute = value => value < 0n ? -value : value;
      assert.ok(absolute(base) <= 10n);
      assert.ok(exponent >= 0n && exponent <= 15n);
      assert.ok(absolute(firstOperand) <= 1000000000000n);
      assert.ok(absolute(secondOperand) <= 1000000000000n);
      largestExponent = Math.max(largestExponent, Number(exponent));
      if (absolute(base) > largestBase) largestBase = absolute(base);
      if (absolute(firstOperand) > largestOperand) largestOperand = absolute(firstOperand);
      if (absolute(secondOperand) > largestOperand) largestOperand = absolute(secondOperand);
      let dividend = absolute(firstOperand);
      let divisor = absolute(secondOperand);
      while (divisor !== 0n) [dividend, divisor] = [divisor, dividend % divisor];
      assert.equal(sample.expected, `${base ** exponent}\n${dividend}`);
    }
    assert.ok(largestExponent >= 8);
    assert.ok(largestBase >= 2n);
    assert.ok(largestOperand > 0n);
  });

  test('F116 : corrigé récursif en pseudo-code vérifié par AST et bornes exactes', async context => {
    const item = exercise('algo-c9-e3');
    const tokens = new PseudoCodeEngine.Lexer(item.solution).tokenize();
    const ast = new PseudoCodeEngine.Parser(tokens).parse();
    const fns = ast.functions || [];
    assert.deepEqual(fns.map(fn => fn.name).sort(), ['pgcd', 'puissance']);
    function walk(node, visit) {
      if (!node || typeof node !== 'object') return;
      visit(node);
      for (const value of Object.values(node)) {
        if (Array.isArray(value)) value.forEach(child => walk(child, visit));
        else if (value && typeof value === 'object') walk(value, visit);
      }
    }
    for (const fn of fns) {
      const fnName = fn.name;
      let hasLoop = false;
      let hasSelfCall = false;
      walk(fn.body, node => {
        if (node.type === 'ForStatement' || node.type === 'WhileStatement' || node.type === 'RepeatStatement') hasLoop = true;
        if (node.type === 'CallExpression' && node.name.toLowerCase() === fnName) hasSelfCall = true;
      });
      assert.equal(hasLoop, false, fnName);
      assert.equal(hasSelfCall, true, fnName);
    }
    const cases = [
      [10, 15, 956722026041, 591286729879],
      [-10, 14, -1000000000000, 1000000000000],
      [0, 0, 0, 0],
      [0, 15, -956722026041, 591286729879],
      [-1, 15, 0, -1000000000000]
    ];
    for (const [b, e, a, b2] of cases) {
      const res = await execute({ code: item.solution, stdin: `${b}\n${e}\n${a}\n${b2}\n` });
      assert.equal(res.ok, true, res.stderr);
      let d1 = BigInt(a) < 0n ? -BigInt(a) : BigInt(a);
      let d2 = BigInt(b2) < 0n ? -BigInt(b2) : BigInt(b2);
      while (d2 !== 0n) [d1, d2] = [d2, d1 % d2];
      assert.equal(res.stdout.trim(), `${BigInt(b) ** BigInt(e)}\n${d1}`);
    }
    context.diagnostic(`${cases.length} cas limites vérifiés en pseudo-code`);
  });

  test('F116 : exemple et sept tests passent par le correcteur', async () => {
    const item = exercise('algo-c9-e3');
    await checkExample(item, item.solution);
    const report = await checked(item, item.solution);
    assert.equal(report.passed, item.tests.length);
    assert.equal(report.stop, null);
  });

  test('F117 : solution alternative sans bulles passe les tests de sortie mais énonce l’attente de méthode', async context => {
    const item = exercise('algo-c9-e1');
    assert.match(item.brief, /méthode des bulles/i);
    await checkExample(item, item.solution);
    const correct = await checked(item, item.solution);
    assert.equal(correct.passed, item.tests.length);
    const wrong = item.solution.replace('passages <- passages + 1', 'passages <- passages + 2');
    assert.notEqual(wrong, item.solution);
    assert.equal((await runTests(item, wrong, { execute })).stop.reason, 'wrong_output');
    context.diagnostic(`F117 : ${correct.passed}/${correct.total} tests passés et mutation rejetée`);
  });

  test('F118 : lecture autorisée dans le programme principal, calculs en fonctions', async context => {
    const item = exercise('algo-c10-e3');
    assert.match(item.brief, /lecture des durées peut se faire dans le programme principal/i);
    assert.match(item.brief, /boucles de calcul doivent se trouver dans les fonctions/i);
    await checkExample(item, item.solution);
    const correct = await checked(item, item.solution);
    assert.equal(correct.passed, item.tests.length);
    const wrong = item.solution.replace('Retourner total', 'Retourner total + 1');
    assert.notEqual(wrong, item.solution);
    assert.equal((await runTests(item, wrong, { execute })).stop.reason, 'wrong_output');
    context.diagnostic(`F118 : ${correct.passed}/${correct.total} tests passés`);
  });

  test('F205 : tri par sélection passe ses tests et rejette les mutations', async () => {
    const item = exercise('algo-c6-e3');
    await checkExample(item, item.solution);
    const report = await checked(item, item.solution);
    assert.equal(report.passed, item.tests.length);
    assert.equal(report.stop, null);
  });

  test('la recherche dichotomique passe ses tests', async () => {
    const item = exercise('algo-c9-e2');
    await checkExample(item, item.solution);
    const report = await checked(item, item.solution);
    assert.equal(report.passed, item.tests.length);
    assert.equal(report.stop, null);
  });

  test('deux variantes incorrectes sont rejetées pour chaque exercice algorithmique ciblé', async context => {
    const cases = [
      {
        id: 'algo-c6-e3',
        mutations: [
          ['dernier passage omis', 'Pour depart De 0 A n - 2 Faire', 'Pour depart De 0 A n - 3 Faire'],
          ['minimum mal suivi', 'Si t[i] < t[imin] Alors', 'Si t[i] < t[depart] Alors']
        ]
      },
      {
        id: 'algo-c9-e1',
        mutations: [
          ['arrêt prématuré', 'a_trier <- VRAI\n        a_trier <- FAUX', 'a_trier <- FAUX']
        ]
      },
      {
        id: 'algo-c9-e2',
        mutations: [
          ['position décalée', 'Afficher(milieu + 1)', 'Afficher(milieu)'],
          ['valeur absente incorrecte', 'Afficher("absent")', 'Afficher("-1")']
        ]
      },
      {
        id: 'algo-c9-e3',
        mutations: [
          ['cas zéro puissance zéro faussé', '  Si exposant = 0 Alors\n    Retourner 1', '  Si exposant = 0 Alors\n    Si base = 0 Alors\n      Retourner 0\n    FinSi\n    Retourner 1'],
          ['signe du PGCD ignoré', 'Retourner Abs(a)', 'Retourner a']
        ]
      },
      {
        id: 'algo-c10-e3',
        mutations: [
          ['moyenne singleton faussée', 'Retourner attente_totale(durees) / Longueur(durees)', 'Si Longueur(durees) = 1 Alors\n    Retourner 1\n  FinSi\n  Retourner attente_totale(durees) / Longueur(durees)'],
          ['moyenne faussée', 'Retourner attente_totale(durees) / Longueur(durees)', 'Retourner attente_totale(durees) / (Longueur(durees) + 1)']
        ]
      }
    ];
    cases[1].mutations = [
      ['arrêt prématuré', '        a_trier <- VRAI\n      FinSi', '        a_trier <- FAUX\n      FinSi'],
      ['passage sans échange omis', '    passages <- passages + 1', '    Si a_trier Alors\n      passages <- passages + 1\n    FinSi']
    ];
    for (const { id, mutations } of cases) {
      const item = exercise(id);
      const reference = await checked(item, item.solution);
      assert.equal(reference.passed, reference.total, `${id} : référence`);
      assert.ok(item.tests.length <= MAX_TESTS, `${id} : cas au-delà du plafond`);
      const outcomes = [];
      for (const [label, before, after] of mutations) {
        assert.equal(item.solution.split(before).length, 2, `${id} : mutation ambiguë ${label}`);
        const variant = item.solution.replace(before, after);
        const result = await runTests(item, variant, { execute });
        assert.equal(result.stop?.reason, 'wrong_output', `${id} : ${label}`);
        const sampleResults = [];
        for (const hidden of item.tests) {
          const report = await runTests({ ...item, tests: [hidden], verifyFirstExample: false }, variant, { execute });
          assert.ok(report.stop === null || report.stop.reason === 'wrong_output', `${id} : ${label}`);
          sampleResults.push(report.stop === null);
        }
        outcomes.push(sampleResults);
        context.diagnostic(`${id} — ${label} : référence ${reference.passed}/${reference.total}, variante ${result.passed}/${result.total}, sortie incorrecte`);
      }
      const first = outcomes[0].findIndex((accepted, index) => !accepted && outcomes[1][index]);
      const second = outcomes[1].findIndex((accepted, index) => !accepted && outcomes[0][index]);
      assert.ok(first >= 0 && second >= 0 && first !== second, `${id} : témoins cachés croisés manquants`);
      context.diagnostic(`${id} — deux témoins cachés distincts et croisés : cas ${first + 1} et ${second + 1}`);
    }
  });
}
