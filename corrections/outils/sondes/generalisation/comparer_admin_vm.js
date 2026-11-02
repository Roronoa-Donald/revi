'use strict';

const fs = require('node:fs');
const { runTests, MAX_TESTS } = require('/project/server/exercises/runner');

function classer(rapport) {
  if (!rapport.ok) return 'non évalué';
  if (!rapport.stop) return 'accepté';
  return rapport.stop.reason === 'wrong_output' ? 'rejeté' : 'non évalué';
}

function resultatExecution(execution) {
  if (!execution || execution.etat !== 'exécuté') {
    return { ok: false, status: 'non_evalue', stdout: execution?.sortie || '', stderr: execution?.stderr || '' };
  }
  return { ok: true, status: 'success', stdout: execution.sortie, stderr: '' };
}

async function comparerCas(exercice, candidat, test) {
  const execution = candidat.executions[test.stdin];
  const fiche = { ...exercice, tests: [test], verifyFirstExample: false };
  const rapport = await runTests(fiche, candidat.code, {
    execute: async () => resultatExecution(execution), maxTests: 1
  });
  return {
    label: test.label || null,
    entree: test.stdin,
    attendu: test.expected,
    execution,
    etat: classer(rapport),
    raison: rapport.stop?.reason || rapport.error?.code || null
  };
}

async function comparerCandidat(exercice, definition, candidat) {
  const actifs = exercice.tests.slice(0, MAX_TESTS);
  if (exercice.verifyFirstExample === true) actifs.push({ ...exercice.examples[0], label: 'Exemple affiché' });
  const casActifs = [];
  for (const test of actifs) casActifs.push(await comparerCas(exercice, candidat, test));
  const temoins = [];
  for (const [index, cas] of definition.cas.entries()) {
    temoins.push(await comparerCas(exercice, candidat, { label: `Témoin ${index + 1}`, stdin: cas.entree, expected: cas.attendu }));
  }
  const complementaires = [];
  for (const [index, cas] of (definition.cas_complementaires || []).entries()) {
    complementaires.push(await comparerCas(exercice, candidat, { label: `Complément ${index + 1}`, stdin: cas.entree, expected: cas.attendu }));
  }
  const domaine = [];
  for (const [index, cas] of (definition.cas_domaine || []).entries()) {
    domaine.push(await comparerCas(exercice, candidat, { label: `Domaine ${index + 1}`, stdin: cas.entree, expected: cas.attendu }));
  }
  const rapport = await runTests(exercice, candidat.code, {
    execute: async ({ stdin }) => resultatExecution(candidat.executions[stdin])
  });
  return {
    nom: candidat.nom,
    nature: candidat.nature,
    erreur: candidat.erreur || null,
    complementaire: candidat.complementaire || false,
    code_sha256: candidat.code_sha256,
    actifs: { etat: classer(rapport), passes: rapport.passed, total: rapport.total, stop: rapport.stop, cas: casActifs },
    temoins,
    cas_complementaires: complementaires,
    cas_domaine: domaine
  };
}

async function principal() {
  const donnees = JSON.parse(fs.readFileSync(0, 'utf8'));
  const exercices = [];
  for (const entree of donnees.exercices) {
    const candidats = [];
    for (const candidat of entree.candidats) {
      candidats.push(await comparerCandidat(entree.exercice, entree.definition, candidat));
    }
    exercices.push({ id: entree.exercice.id, candidats });
  }
  process.stdout.write(JSON.stringify({ max_tests: MAX_TESTS, exercices }));
}

principal().catch(error => {
  process.stderr.write(`${error.stack || error.message}\n`);
  process.exitCode = 2;
});
