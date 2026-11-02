'use strict';

const fs = require('node:fs');
const { runTests, MAX_TESTS } = require('/project/server/exercises/runner');

function etat(report) {
  if (!report.ok || report.error) return 'non évalué';
  if (!report.stop && report.passed === report.total) return 'accepté';
  if (report.stop && report.stop.reason === 'wrong_output') return 'rejeté : mauvaise sortie';
  return 'non évalué';
}

function reponse(resultat) {
  if (resultat.etat !== 'exécuté') {
    throw new Error('Exécution isolée non évaluable');
  }
  return { ok: true, status: 'success', stdout: resultat.sortie, stderr: '', exitCode: 0 };
}

async function comparerCas(exercise, code, cas) {
  const fiche = { ...exercise, tests: [cas.test], verifyFirstExample: false };
  const report = await runTests(fiche, code, { execute: async () => reponse(cas.resultat) });
  return { etat: etat(report), stop: report.stop || null, error: report.error || null };
}

async function comparerActifs(exercise, code, cases) {
  const attendus = exercise.tests.slice(0, MAX_TESTS);
  if (exercise.verifyFirstExample === true) attendus.push(exercise.examples[0]);
  if (attendus.length !== cases.length) throw new Error('Nombre de tests actifs incohérent');
  let position = 0;
  const report = await runTests(exercise, code, {
    execute: async (request) => {
      const cas = cases[position];
      if (!cas || request.code !== code || request.language !== exercise.language ||
          request.stdin !== (attendus[position].stdin || '') ||
          JSON.stringify(cas.test) !== JSON.stringify(attendus[position])) {
        throw new Error('Ordre des tests actifs incohérent');
      }
      position++;
      return reponse(cas.resultat);
    }
  });
  return {
    etat: etat(report),
    passes: report.passed,
    total: report.total,
    appels: position,
    stop: report.stop || null,
    error: report.error || null
  };
}

async function main() {
  const data = JSON.parse(fs.readFileSync(0, 'utf8'));
  const resultats = [];
  for (const item of data.candidats) {
    const cas = [];
    for (const sample of item.cases) cas.push(await comparerCas(item.exercise, item.code, sample));
    resultats.push({
      id: item.exercise.id,
      candidat: item.candidat,
      cas,
      actifs: await comparerActifs(item.exercise, item.code, item.cases.slice(0, item.nombre_actifs))
    });
  }
  process.stdout.write(JSON.stringify({ max_tests: MAX_TESTS, resultats }));
}

main().catch(error => {
  process.stderr.write(`${error.message}\n`);
  process.exitCode = 1;
});
