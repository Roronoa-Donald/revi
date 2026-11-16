'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const catalogue = require('../server/exercises');
const localRunner = require('../server/services/execution/local-runner');
const { methodExercises, buildMethodProbe, checkMethod } = require('../server/exercises/method-check');

async function algoExec({ code, stdin }) {
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

async function isolatedProbe(id, code, seed = '1234567890abcdef1234567890abcdef', stdin) {
  const probe = buildMethodProbe(id, code, seed, stdin);
  assert.ok(probe);
  return checkMethod(id, code, algoExec, stdin, seed);
}

test('les quatre corrigés passent le contrôle de méthode sur vingt tirages isolés', async () => {
  for (const id of methodExercises) {
    const item = catalogue.getExercise(id);
    for (let index = 0; index < 20; index++) {
      const seed = index.toString(16).padStart(32, '0');
      const report = await isolatedProbe(id, item.solution, seed);
      assert.equal(report.status, 'verified', `${id}, ${seed} : ${JSON.stringify(report)}`);
      assert.equal(report.schema, 'revi-methode-v2');
      if (id === 'algo-c6-e3') assert.equal(report.counts.comparaisons, 15);
      if (id === 'algo-c9-e1') {
        assert.equal(report.counts.inverse.comparaisons, 10);
        assert.equal(report.counts.inverse.affectations, 20);
        assert.equal(report.counts.arret.comparaisons, 4);
        assert.equal(report.counts.arret.affectations, 0);
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

test('un tri par sélection équivalent avec échange conditionnel reste analysable', async () => {
  const original = catalogue.getExercise('algo-c6-e3').solution;
  const alternative = original.replace(
    '    temp <- t[depart]\n    t[depart] <- t[imin]\n    t[imin] <- temp',
    '    Si imin <> depart Alors\n      temp <- t[depart]\n      t[depart] <- t[imin]\n      t[imin] <- temp\n    FinSi'
  );
  assert.notEqual(original, alternative);
  assert.equal((await isolatedProbe('algo-c6-e3', alternative)).status, 'verified');
  const ties = original.replace('Si t[i] < t[imin] Alors', 'Si t[i] <= t[imin] Alors');
  assert.notEqual(original, ties);
  assert.equal((await isolatedProbe('algo-c6-e3', ties, undefined, '5\n3\n1\n3\n1\n2')).status, 'verified');
});

test('Trier ou une fonction intégrée ne permet pas de contourner les méthodes demandées', async () => {
  const fakeBuiltin = `Début
  Lire n
  Tableau t[n] : Entiers
  Pour i De 0 A n - 1 Faire
    Lire t[i]
  FinPour
  Trier(t)
  Afficher(t[0])
Fin
`;
  for (const id of ['algo-c6-e3', 'algo-c9-e1']) {
    assert.equal((await isolatedProbe(id, fakeBuiltin)).status, 'not_evaluable');
  }
});

test('le tri par insertion ne se fait pas passer pour la sélection', async () => {
  const insertion = `Début
  Lire n
  Tableau t[n] : Entiers
  Pour i De 0 A n - 1 Faire
    Lire t[i]
  FinPour
  Pour i De 1 A n - 1 Faire
    pos <- i
    TantQue pos > 0 ET t[pos - 1] > t[pos] Faire
      tmp <- t[pos - 1]
      t[pos - 1] <- t[pos]
      t[pos] <- tmp
      pos <- pos - 1
    FinTantQue
  FinPour
  ligne <- ""
  Pour i De 0 A n - 1 Faire
    Si i > 0 Alors
      ligne <- ligne & " "
    FinSi
    ligne <- ligne & t[i]
  FinPour
  Afficher(ligne)
Fin
`;
  assert.equal((await isolatedProbe('algo-c6-e3', insertion)).status, 'not_evaluable');
});

test('les quatre corrigés restent contrôlés sur chacun des exemples et tests actifs', async () => {
  for (const id of methodExercises) {
    const item = catalogue.getExercise(id);
    for (const sample of [...item.tests, ...item.examples]) {
      const report = await isolatedProbe(id, item.solution, undefined, sample.stdin);
      assert.equal(report.status, 'verified', `${id} : ${JSON.stringify(report)}`);
      assert.equal(report.output.trim(), sample.expected.trim(), id);
    }
  }
});

test('une méthode changée après le contrôle aléatoire est détectée sur les entrées actives', async () => {
  const selection = catalogue.getExercise('algo-c6-e3').solution;
  const start = selection.indexOf('  Pour depart De 0 A n - 2 Faire');
  const end = selection.indexOf('\n  ligne <- ""', start);
  const block = selection.slice(start, end);
  const selective = selection.slice(0, start) + `  Si n = 6 Alors\n${block}\n  Sinon\n` +
    '    Pour i De 1 A n - 1 Faire\n      pos <- i\n' +
    '      TantQue pos > 0 ET t[pos - 1] > t[pos] Faire\n' +
    '        tmp <- t[pos - 1]\n        t[pos - 1] <- t[pos]\n        t[pos] <- tmp\n' +
    '        pos <- pos - 1\n      FinTantQue\n    FinPour\n  FinSi' + selection.slice(end);
  assert.equal((await isolatedProbe('algo-c6-e3', selective)).status, 'verified');
  assert.equal((await isolatedProbe('algo-c6-e3', selective, undefined, '4\n4\n3\n2\n1')).status, 'not_evaluable');

  const recursion = catalogue.getExercise('algo-c9-e3').solution.replace(
    '  Si exposant = 0 Alors',
    '  Si exposant >= 8 Alors\n    Retourner 1\n  FinSi\n  Si exposant = 0 Alors'
  );
  assert.equal((await isolatedProbe('algo-c9-e3', recursion)).status, 'verified');
  assert.equal((await isolatedProbe('algo-c9-e3', recursion, undefined, '3\n9\n84\n30')).status, 'not_evaluable');
});

test('des appels récursifs morts ne prouvent pas la récursivité exécutée', async () => {
  const fake = `Fonction puissance(base : Entier, exposant : Entier) : Entier
Début
  Si FAUX Alors
    Retourner puissance(base, exposant - 1)
  FinSi
  Retourner 1
FinFonction

Fonction pgcd(a : Entier, b : Entier) : Entier
Début
  Si FAUX Alors
    Retourner pgcd(b, a MOD b)
  FinSi
  Retourner a DIV 8
FinFonction

Début
  Lire base, exposant, a, b
  Afficher(puissance(base, exposant))
  Afficher(pgcd(a, b))
Fin
`;
  assert.equal((await isolatedProbe('algo-c9-e3', fake)).status, 'not_evaluable');
});

test('des fonctions appelées mais sans effet sur les résultats ne suffisent pas', async () => {
  const fake = `Fonction attente_totale(durees) : Entier
Début
  total <- 0
  ecoule <- 0
  Pour i De 0 A Longueur(durees) - 1 Faire
    total <- total + ecoule
    ecoule <- ecoule + durees[i]
  FinPour
  Retourner total
FinFonction

Fonction temps_moyen(durees) : Reel
Début
  Retourner attente_totale(durees) / Longueur(durees)
FinFonction

Début
  Lire n
  Tableau durees[n] : Entiers
  Pour i De 0 A n - 1 Faire
    Lire durees[i]
  FinPour
  rien1 <- attente_totale(durees)
  rien2 <- temps_moyen(durees)
  total <- 0
  ecoule <- 0
  Pour i De 0 A n - 1 Faire
    total <- total + ecoule
    ecoule <- ecoule + durees[i]
  FinPour
  Afficher(total)
  Afficher(Formater(total / n, 2))
Fin
`;
  assert.equal((await isolatedProbe('algo-c10-e3', fake)).status, 'not_evaluable');
});

test('un calcul global déguisé par deux fonctions est non évaluable', async () => {
  const fake = `Fonction attente_totale(donnees) : Entier
Début
  Retourner total
FinFonction

Fonction temps_moyen(donnees) : Reel
Début
  Retourner total / Longueur(donnees)
FinFonction

Début
  Lire n
  Tableau durees[n] : Entiers
  Pour i De 0 A n - 1 Faire
    Lire durees[i]
  FinPour
  total <- 0
  ecoule <- 0
  Pour i De 0 A n - 1 Faire
    total <- total + ecoule
    ecoule <- ecoule + durees[i]
  FinPour
  Afficher(attente_totale(durees))
  Afficher(Formater(temps_moyen(durees), 2))
Fin
`;
  assert.equal((await isolatedProbe('algo-c10-e3', fake)).status, 'not_evaluable');
});

test('l’analyse refuse la syntaxe Python et les codes invalides', async () => {
  for (const code of ["import os\nprint(1)", "print(eval('1'))", "def f(): pass"]) {
    assert.equal((await isolatedProbe('algo-c6-e3', code)).status, 'not_evaluable');
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
