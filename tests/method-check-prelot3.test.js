'use strict';

const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const test = require('node:test');
const catalogue = require('../server/exercises');
const { methodExercises, buildMethodProbe, checkMethod } = require('../server/exercises/method-check');

function isolatedProbe(id, code, seed = '1234567890abcdef1234567890abcdef', stdin) {
  const probe = buildMethodProbe(id, code, seed, stdin);
  assert.ok(probe);
  const args = [
    '--die-with-parent', '--unshare-all', '--new-session', '--clearenv', '--cap-drop', 'ALL',
    '--ro-bind', '/usr', '/usr', '--symlink', 'usr/bin', '/bin', '--symlink', 'usr/lib', '/lib',
    '--symlink', 'usr/lib', '/lib64', '--dir', '/etc', '--ro-bind', '/etc/ld.so.cache', '/etc/ld.so.cache',
    '--proc', '/proc', '--dev', '/dev', '--tmpfs', '/tmp', '--chdir', '/tmp',
    '/usr/bin/python3', '-I', '-B', '-c', probe
  ];
  const result = spawnSync('/usr/bin/bwrap', args, { encoding: 'utf8', timeout: 10000, maxBuffer: 1024 * 1024 });
  assert.ifError(result.error);
  assert.equal(result.status, 0, result.stderr);
  return JSON.parse(result.stdout);
}

test('les quatre corrigés passent le contrôle de méthode sur vingt tirages isolés', () => {
  for (const id of methodExercises) {
    const item = catalogue.getExercise(id);
    for (let index = 0; index < 20; index++) {
      const seed = index.toString(16).padStart(32, '0');
      const report = isolatedProbe(id, item.solution, seed);
      assert.equal(report.status, 'verified', `${id}, ${seed} : ${JSON.stringify(report)}`);
      assert.equal(report.schema, 'revi-methode-v1');
      if (id === 'algo-c6-e3') assert.equal(report.counts.comparaisons, 15);
      if (id === 'algo-c9-e1') {
        assert.equal(report.counts.inverse.comparaisons, 10);
        assert.equal(report.counts.inverse.affectations, 20);
        assert.equal(report.counts.arret.comparaisons, 7);
        assert.equal(report.counts.arret.affectations, 2);
      }
      if (id === 'algo-c9-e3') {
        assert.ok(report.counts.appels_recursifs.puissance > 0);
        assert.ok(report.counts.appels_recursifs.pgcd > 0);
      }
      if (id === 'algo-c10-e3') {
        assert.ok(report.counts.appels.attente_totale > 0);
        assert.ok(report.counts.appels.temps_moyen > 0);
        assert.ok(report.counts.operations > 0);
      }
    }
  }
});

test('un tri par sélection équivalent avec échange conditionnel reste analysable', () => {
  const original = catalogue.getExercise('algo-c6-e3').solution;
  const alternative = original.replace(
    '    tableau[debut], tableau[indice_min] = tableau[indice_min], tableau[debut]',
    '    if indice_min != debut:\n        tableau[debut], tableau[indice_min] = tableau[indice_min], tableau[debut]'
  );
  assert.notEqual(original, alternative);
  assert.equal(isolatedProbe('algo-c6-e3', alternative).status, 'verified');
  const ties = original.replace('if tableau[i] < tableau[indice_min]:', 'if tableau[i] <= tableau[indice_min]:');
  assert.notEqual(original, ties);
  assert.equal(isolatedProbe('algo-c6-e3', ties, undefined, '5\n3\n1\n3\n1\n2').status, 'verified');
});

test('sorted et sort ne permettent pas de contourner les méthodes demandées', () => {
  const sorted = `n = int(input())
valeurs = [int(input()) for indice in range(n)]
print(' '.join(str(valeur) for valeur in sorted(valeurs)))
`;
  const sort = `n = int(input())
valeurs = [int(input()) for indice in range(n)]
valeurs.sort()
print(' '.join(str(valeur) for valeur in valeurs))
`;
  for (const id of ['algo-c6-e3', 'algo-c9-e1']) {
    assert.equal(isolatedProbe(id, sorted).status, 'not_evaluable');
    assert.equal(isolatedProbe(id, sort).status, 'not_evaluable');
  }
});

test('le tri par insertion ne se fait pas passer pour la sélection', () => {
  const insertion = `n = int(input())
valeurs = [int(input()) for indice in range(n)]
for indice in range(1, n):
    position = indice
    while position > 0 and valeurs[position - 1] > valeurs[position]:
        valeurs[position - 1], valeurs[position] = valeurs[position], valeurs[position - 1]
        position -= 1
print(' '.join(str(valeur) for valeur in valeurs))
`;
  assert.equal(isolatedProbe('algo-c6-e3', insertion).status, 'not_evaluable');
});

test('les quatre corrigés restent contrôlés sur chacun des exemples et tests actifs', () => {
  for (const id of methodExercises) {
    const item = catalogue.getExercise(id);
    for (const sample of [...item.tests, ...item.examples]) {
      const report = isolatedProbe(id, item.solution, undefined, sample.stdin);
      assert.equal(report.status, 'verified', `${id} : ${JSON.stringify(report)}`);
      assert.equal(report.output.trim(), sample.expected.trim(), id);
    }
  }
});

test('une méthode changée après le contrôle aléatoire est détectée sur les entrées actives', () => {
  const selection = catalogue.getExercise('algo-c6-e3').solution;
  const start = selection.indexOf('for debut in range(n - 1):');
  const end = selection.indexOf('\nprint(', start);
  const sort = selection.slice(start, end).split('\n').map(line => `    ${line}`).join('\n');
  const selective = selection.slice(0, start) + `if n == 6:\n${sort}\nelse:\n` +
    '    for indice in range(1, n):\n        position = indice\n' +
    '        while position > 0 and tableau[position - 1] > tableau[position]:\n' +
    '            tableau[position - 1], tableau[position] = tableau[position], tableau[position - 1]\n' +
    '            position -= 1\n' + selection.slice(end);
  assert.equal(isolatedProbe('algo-c6-e3', selective).status, 'verified');
  assert.equal(isolatedProbe('algo-c6-e3', selective, undefined, '4\n4\n3\n2\n1').status, 'not_evaluable');

  const recursion = catalogue.getExercise('algo-c9-e3').solution.replace(
    '    if exposant == 0:',
    '    if exposant >= 8:\n        return base ** exposant\n    if exposant == 0:'
  );
  assert.equal(isolatedProbe('algo-c9-e3', recursion).status, 'verified');
  assert.equal(isolatedProbe('algo-c9-e3', recursion, undefined, '3\n9\n84\n30').status, 'not_evaluable');
});

test('des appels récursifs morts ne prouvent pas la récursivité exécutée', () => {
  const fake = `def puissance(base, exposant):
    if False:
        return puissance(base, exposant - 1)
    return base ** exposant
def pgcd(a, b):
    if False:
        return pgcd(b, a % b)
    return a // 8
base = int(input())
exposant = int(input())
a = int(input())
b = int(input())
print(puissance(base, exposant))
print(pgcd(a, b))
`;
  assert.equal(isolatedProbe('algo-c9-e3', fake).status, 'not_evaluable');
});

test('des fonctions appelées mais sans effet sur les résultats ne suffisent pas', () => {
  const fake = `def attente_totale(durees):
    return sum(sum(durees[:indice]) for indice in range(len(durees)))
def temps_moyen(durees):
    return attente_totale(durees) / len(durees)
n = int(input())
durees = [int(input()) for indice in range(n)]
attente_totale(durees)
temps_moyen(durees)
total = sum(sum(durees[:indice]) for indice in range(n))
print(total)
print(f'{total / n:.2f}')
`;
  assert.equal(isolatedProbe('algo-c10-e3', fake).status, 'not_evaluable');
});

test('un calcul global déguisé par deux fonctions est non évaluable', () => {
  const fake = `def attente_totale(donnees):
    return total
def temps_moyen(donnees):
    return total / len(donnees)
n = int(input())
durees = [int(input()) for indice in range(n)]
total = sum(sum(durees[:indice]) for indice in range(n))
print(attente_totale(durees))
print(f'{temps_moyen(durees):.2f}')
`;
  assert.equal(isolatedProbe('algo-c10-e3', fake).status, 'not_evaluable');
});

test('l’analyse refuse les imports et les appels dynamiques', () => {
  for (const code of ["import os\nprint(1)", "print(eval('1'))", "print(__import__('os'))"]) {
    assert.equal(isolatedProbe('algo-c6-e3', code).status, 'not_evaluable');
  }
});

test('une panne, un résultat falsifié ou une source trop longue ne sont jamais une réussite', async () => {
  const item = catalogue.getExercise('algo-c6-e3');
  assert.equal((await checkMethod(item.id, item.solution, async () => ({ ok: false }))).status, 'unavailable');
  assert.equal((await checkMethod(item.id, item.solution, async () => ({ ok: true, stdout: '{}' }))).status, 'unavailable');
  let calls = 0;
  const report = await checkMethod(item.id, 'a'.repeat(60 * 1024), async () => { calls++; });
  assert.equal(report.status, 'not_evaluable');
  assert.equal(calls, 0);
});
