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
    const result = python(code, stdin);
    return {
      ok: result.status === 0,
      status: result.status === 0 ? 'success' : 'runtime_error',
      stdout: result.stdout || '',
      stderr: result.stderr || '',
      exitCode: result.status
    };
  }

  async function checked(item, code) {
    const report = await runTests(item, code, { execute });
    assert.equal(report.ok, true);
    assert.equal(report.total, item.tests.length);
    return report;
  }

  function checkExample(item, code) {
    const sample = item.examples[0];
    const result = python(code, sample.stdin);
    assert.equal(result.status, 0, result.error || result.stderr);
    assert.equal(result.stdout.trim(), sample.expected.trim());
  }

  test('F116 : reproductions historiques de récursion trop profonde', context => {
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
    assert.match(item.brief, /\|base\|\s*≤\s*100/);
    assert.match(item.brief, /0\s*≤\s*exposant\s*≤\s*200/);
    assert.match(item.brief, /\|a\|,\s*\|b\|\s*≤\s*1000000000000/);
    assert.match(item.brief, /limite.*récursion/i);
    assert.match(item.brief, /puissance nécessite au plus 201 appels imbriqués, le PGCD au plus 81/);
    assert.match(item.brief, /puissance au plus 401 chiffres/);
    assert.match(item.brief, /0\s*\*\*\s*0\s*==\s*1/);
    assert.match(item.brief, /pgcd\(0, 0\)\s*=\s*0/);
    assert.match(item.brief, /validation vérifie la méthode sur des cas limités/i);
    assert.match(item.brief, /(?:aucune|pas de) note.*relecture/i);
    assert.ok(item.tests.length <= MAX_TESTS);

    let largestExponent = 0;
    let largestBase = 0n;
    let largestOperand = 0n;
    for (const sample of [...item.examples, ...item.tests]) {
      const values = sample.stdin.trim().split(/\s+/).map(BigInt);
      assert.equal(values.length, 4);
      const [base, exponent, firstOperand, secondOperand] = values;
      const absolute = value => value < 0n ? -value : value;
      assert.ok(absolute(base) <= 100n);
      assert.ok(exponent >= 0n && exponent <= 200n);
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
    assert.equal(largestExponent, 200);
    assert.equal(largestBase, 100n);
    assert.equal(largestOperand, 1000000000000n);
  });

  test('F116 : corrigé récursif comparé à pow et math.gcd dans les bornes', context => {
    const item = exercise('algo-c9-e3');
    const code = `import ast
import math
import random
import sys
tree = ast.parse(${JSON.stringify(item.solution)})
functions = [node for node in tree.body if isinstance(node, ast.FunctionDef)]
assert {node.name for node in functions} == {'puissance', 'pgcd'}
for function in functions:
    assert not any(isinstance(node, (ast.For, ast.While)) for node in ast.walk(function))
    assert any(isinstance(node, ast.Call) and isinstance(node.func, ast.Name) and node.func.id == function.name for node in ast.walk(function))
namespace = {}
exec(compile(ast.Module(body=functions, type_ignores=[]), '<corrige>', 'exec'), namespace)
puissance, pgcd = namespace['puissance'], namespace['pgcd']
cases = [
    (100, 200, 956722026041, 591286729879),
    (-100, 199, -1000000000000, 1000000000000),
    (0, 0, 0, 0),
    (0, 200, -956722026041, 591286729879),
    (-1, 200, 0, -1000000000000),
]
for premier in (956722026041, -956722026041):
    for second in (591286729879, -591286729879):
        cases.append((100, 200, premier, second))
        cases.append((0, 0, second, premier))
generator = random.Random(116)
for indice in range(256):
    cases.append((generator.randint(-100, 100), generator.randint(0, 200),
                  generator.randint(-1000000000000, 1000000000000),
                  generator.randint(-1000000000000, 1000000000000)))
depth = {'puissance': 0, 'pgcd': 0}
maximum = {'puissance': 0, 'pgcd': 0}
def profile(frame, event, argument):
    name = frame.f_code.co_name
    if name in depth and event == 'call':
        depth[name] += 1
        maximum[name] = max(maximum[name], depth[name])
    elif name in depth and event == 'return':
        depth[name] -= 1
sys.setprofile(profile)
for base, exposant, premier, second in cases:
    assert puissance(base, exposant) == pow(base, exposant)
    assert pgcd(premier, second) == math.gcd(premier, second)
sys.setprofile(None)
assert maximum['puissance'] == 201
assert maximum['pgcd'] <= 81
assert len(str(100 ** 200)) == 401
print(f'{len(cases)} cas ; limite Python {sys.getrecursionlimit()} ; profondeurs {maximum["puissance"]}/{maximum["pgcd"]}')
`;
    const result = python(code);
    assert.equal(result.status, 0, result.error || result.stderr);
    assert.match(result.stdout, /^269 cas ; limite Python \d+ ; profondeurs 201\/\d+\n$/);
    context.diagnostic(result.stdout.trim());
  });

  test('F116 : exemple et sept tests passent par le correcteur', async () => {
    const item = exercise('algo-c9-e3');
    checkExample(item, item.solution);
    const report = await checked(item, item.solution);
    assert.equal(report.passed, item.tests.length);
    assert.equal(report.stop, null);
  });

  test('F117 : sorted interdit accepté par les sorties et limite annoncée', async context => {
    const item = exercise('algo-c9-e1');
    const alternative = `nombre = int(input())
valeurs = [int(input()) for indice in range(nombre)]
positions = sorted(enumerate(valeurs), key=lambda paire: paire[1])
deplacement = max((origine - indice for indice, (origine, valeur) in enumerate(positions)), default=0)
print(' '.join(str(valeur) for origine, valeur in positions))
print(min(nombre - 1, deplacement + 1) if nombre > 1 else 0)
`;
    assert.match(alternative, /\bsorted\(/);
    checkExample(item, alternative);
    const report = await checked(item, alternative);
    assert.equal(report.passed, item.tests.length);
    assert.equal(report.stop, null);
    context.diagnostic(`sorted() interdit : ${report.passed}/${report.total} tests acceptés`);
    assert.match(item.brief, /méthode des bulles/i);
    assert.match(item.brief, /validation vérifie la méthode sur des cas limités/i);
    assert.match(item.brief, /(?:aucune|pas de) note.*relecture/i);
    checkExample(item, item.solution);
    const correct = await checked(item, item.solution);
    assert.equal(correct.passed, item.tests.length);
    const wrong = item.solution.replace('passages += 1', 'passages += 2');
    assert.notEqual(wrong, item.solution);
    assert.equal((await checked(item, wrong)).stop.reason, 'wrong_output');
  });

  test('F118 : calcul sans fonctions accepté par les sorties et limite annoncée', async context => {
    const item = exercise('algo-c10-e3');
    const alternative = `nombre = int(input())
durees = [int(input()) for indice in range(nombre)]
total = sum(sum(durees[:indice]) for indice in range(nombre))
print(total)
print(f'{(total / nombre if nombre else 0):.2f}')
`;
    assert.doesNotMatch(alternative, /^\s*(?:async\s+)?def\s/m);
    checkExample(item, alternative);
    const report = await checked(item, alternative);
    assert.equal(report.passed, item.tests.length);
    assert.equal(report.stop, null);
    context.diagnostic(`calcul sans fonctions : ${report.passed}/${report.total} tests acceptés`);
    assert.match(item.brief, /lecture.*compréhension.*programme principal/i);
    assert.match(item.brief, /boucles de calcul.*fonctions/i);
    assert.match(item.brief, /validation vérifie la méthode sur des cas limités/i);
    assert.match(item.brief, /(?:aucune|pas de) note.*relecture/i);
    checkExample(item, item.solution);
    const correct = await checked(item, item.solution);
    assert.equal(correct.passed, item.tests.length);
    const wrong = item.solution.replace('return total', 'return total + 1');
    assert.notEqual(wrong, item.solution);
    assert.equal((await checked(item, wrong)).stop.reason, 'wrong_output');
  });

  test('F205 : sorted interdit passe les tests du tri par sélection', async context => {
    const item = exercise('algo-c6-e3');
    const alternative = `nombre = int(input())
valeurs = [int(input()) for indice in range(nombre)]
print(' '.join(str(valeur) for valeur in sorted(valeurs)))
`;
    assert.match(item.brief, /sans<\/strong> utiliser <code>sort\(\)<\/code> ni <code>sorted\(\)<\/code>/i);
    checkExample(item, alternative);
    const report = await checked(item, alternative);
    assert.equal(report.passed, item.tests.length);
    assert.equal(report.stop, null);
    context.diagnostic(`sorted() interdit : ${report.passed}/${report.total} tests acceptés`);
  });

  test('la recherche linéaire interdite passe les tests de recherche dichotomique', async context => {
    const item = exercise('algo-c9-e2');
    const alternative = `nombre = int(input())
valeurs = [int(input()) for indice in range(nombre)]
cible = int(input())
print(valeurs.index(cible) + 1 if cible in valeurs else 'absent')
`;
    assert.match(item.brief, /interdits.*index\(\).*in/i);
    checkExample(item, alternative);
    const report = await checked(item, alternative);
    assert.equal(report.passed, item.tests.length);
    assert.equal(report.stop, null);
    context.diagnostic(`in et index() interdits : ${report.passed}/${report.total} tests acceptés`);
  });

  test('deux variantes incorrectes sont rejetées pour chaque exercice suspendu', async context => {
    const cases = [
      {
        id: 'algo-c6-e3',
        mutations: [
          ['dernier passage omis', 'for debut in range(n - 1):', 'for debut in range(n - 2):'],
          ['minimum mal suivi', 'if tableau[i] < tableau[indice_min]:', 'if tableau[i] < tableau[debut]:']
        ]
      },
      {
        id: 'algo-c9-e1',
        mutations: [
          ['arrêt prématuré', '            a_trier = True', '            a_trier = False'],
          ['passage sans échange omis', 'passages += 1', 'passages += 1 if a_trier else 0']
        ]
      },
      {
        id: 'algo-c9-e2',
        mutations: [
          ['position décalée', 'position = milieu + 1', 'position = milieu'],
          ['valeur absente incorrecte', 'print("absent")', 'print("-1")']
        ]
      },
      {
        id: 'algo-c9-e3',
        mutations: [
          ['cas zéro puissance zéro faussé', 'if exposant == 0:\n        return 1', 'if exposant == 0:\n        return 0 if base == 0 else 1'],
          ['signe du PGCD ignoré', 'return abs(a)', 'return a']
        ]
      },
      {
        id: 'algo-c10-e3',
        mutations: [
          ['moyenne singleton faussée', '    return attente_totale(durees) / len(durees)', '    if len(durees) == 1:\n        return 1.0\n    return attente_totale(durees) / len(durees)'],
          ['moyenne faussée', 'return attente_totale(durees) / len(durees)', 'return attente_totale(durees) / (len(durees) + 1)']
        ]
      }
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
        const result = await checked(item, variant);
        assert.equal(result.stop?.reason, 'wrong_output', `${id} : ${label}`);
        const cases = [];
        for (const hidden of item.tests) {
          const report = await checked({ ...item, tests: [hidden], verifyFirstExample: false }, variant);
          assert.ok(report.stop === null || report.stop.reason === 'wrong_output', `${id} : ${label}`);
          cases.push(report.stop === null);
        }
        outcomes.push(cases);
        context.diagnostic(`${id} — ${label} : référence ${reference.passed}/${reference.total}, variante ${result.passed}/${result.total}, sortie incorrecte`);
      }
      const first = outcomes[0].findIndex((accepted, index) => !accepted && outcomes[1][index]);
      const second = outcomes[1].findIndex((accepted, index) => !accepted && outcomes[0][index]);
      assert.ok(first >= 0 && second >= 0 && first !== second, `${id} : témoins cachés croisés manquants`);
      context.diagnostic(`${id} — deux témoins cachés distincts et croisés : cas ${first + 1} et ${second + 1}`);
    }
  });
}
