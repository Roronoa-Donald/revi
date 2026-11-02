'use strict';

const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const catalogue = require('../../server/exercises');
const { MAX_TESTS } = require('../../server/exercises/runner');
const { casNotesVisibles } = require('./visibilite-cas-analyse');

const hostNamespace = process.env.REVI_AUDIT_NET_NS_HOTE || '';
if (process.env.REVI_AUDIT_ISOLE !== '1' || !/^net:\[\d+\]$/.test(hostNamespace) ||
    fs.readFileSync('/proc/1/comm', 'utf8').trim() !== 'bwrap' ||
    fs.readlinkSync('/proc/self/ns/net') === hostNamespace) {
  throw new Error('L’analyse des programmes exige le confinement du lanceur d’audit.');
}

const exercises = catalogue.listExercises();
const fused = [];
const shellSyntax = [];
const insufficientCases = [];
const duplicateCases = [];
const excessCases = [];
const visibleAnalysisCases = [];

function normalizeInput(value) {
  return String(value ?? '').replace(/\n+$/, '').replace(/[\t \r]+$/gm, '');
}

for (const exercise of exercises) {
  const graded = exercise.tests.slice(0, MAX_TESTS).map(test => normalizeInput(test.stdin));
  const examples = new Set(exercise.examples.map(example => normalizeInput(example.stdin)));
  const independentFromExamples = new Set(graded.filter(input => !examples.has(input)));
  if (new Set(graded).size < graded.length) duplicateCases.push(exercise.id);
  if (independentFromExamples.size < 2) insufficientCases.push(exercise.id);
  if (exercise.tests.length > MAX_TESTS) {
    excessCases.push({ id: exercise.id, disponibles: exercise.tests.length, executesParDefaut: MAX_TESTS });
  }
  if (exercise.language === 'analyse') {
    const visible = casNotesVisibles(exercise, MAX_TESTS);
    const otherTests = exercise.tests.slice(0, MAX_TESTS).length - visible.length;
    if (visible.length) visibleAnalysisCases.push({ id: exercise.id, casVisibles: visible, autresTestsNonReperes: otherTests });
  }
  const implicatedTests = exercise.tests.filter(test => String(test.expected).includes('≠ : ')).length;
  const implicatedSolution = exercise.solution.includes('≠ : ');
  if (implicatedTests || implicatedSolution) {
    fused.push({ id: exercise.id, course: exercise.course, implicatedTests, implicatedSolution });
  }
  if (exercise.language === 'shell') {
    const syntax = spawnSync('/bin/bash', ['-n'], { input: exercise.solution, encoding: 'utf8', timeout: 3000, maxBuffer: 65536 });
    shellSyntax.push({ id: exercise.id, ok: syntax.status === 0 && !syntax.error, error: syntax.error?.message || (syntax.status === 0 ? null : String(syntax.stderr).slice(0, 250)) });
  }
}

const result = {
  catalogue: exercises.length,
  verificationMemorisation: {
    etat: 'non évalué',
    raison: 'Ce rapport structurel ne rejoue pas les corrigés ; consulter le banc indépendant et ses statuts par fiche.'
  },
  fusedExpectedLines: fused,
  bashSyntax: { checked: shellSyntax.length, errors: shellSyntax.filter(item => !item.ok) },
  hiddenCases: {
    maximumExecutesParDefaut: Math.max(...exercises.map(exercise =>
      Math.min(exercise.tests.length, MAX_TESTS) + (exercise.verifyFirstExample === true ? 1 : 0))),
    maximumTestsCachesParDefaut: MAX_TESTS,
    exemplesVisiblesNotes: exercises.filter(exercise => exercise.verifyFirstExample === true).map(exercise => exercise.id),
    moinsDeDeuxEntreesDistinctesDesExemples: insufficientCases,
    doublonsDansLesTestsExecutesParDefaut: duplicateCases,
    exercicesAvecTestsSupplementairesNonExecutesParDefaut: excessCases,
    donneesDeCasAnalyseVisiblesDansLeSquelette: visibleAnalysisCases
  },
  limites: [
    'Un succès du banc ne porte que sur les cas effectivement comparés et ne prouve pas une absence générale de mémorisation.',
    'La corruption de lignes détectée correspond au motif observé pour F179 ; ce contrôle ne démontre pas l’absence de toutes les autres fusions possibles.',
    'La distinction textuelle des entrées ne démontre ni leur indépendance pédagogique, ni la couverture des bornes.',
    'Pour les grilles d’analyse, les données d’un cas noté sont dites visibles si son en-tête et au moins une ligne de données commentée figurent dans le squelette. Cela ne signifie pas que sa réponse attendue est visible ; ce contrôle ne prouve pas non plus que les autres cas sont cachés.'
  ]
};
const anomalieStructurelle = Boolean(fused.length || result.bashSyntax.errors.length || insufficientCases.length || duplicateCases.length || excessCases.length || visibleAnalysisCases.some(item => item.autresTestsNonReperes < 2));
result.controleStructurel = { etat: anomalieStructurelle ? 'échoué' : 'réussi' };
console.log(JSON.stringify(result, null, 2));
process.exitCode = anomalieStructurelle || result.verificationMemorisation.etat !== 'réussi' ? 1 : 0;
