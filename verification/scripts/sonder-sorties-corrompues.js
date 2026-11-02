'use strict';

const catalogue = require('/project/server/exercises');
const execution = require('/project/server/services/execution');
const local = require('/project/server/services/execution/local-runner');
const { runTests } = require('/project/server/exercises/runner');

async function evaluate(exercise, submission) {
  const result = await runTests(exercise, submission, {
    execute: async payload => execution.normalizeResponse(await local.runAnalyse(payload.code, payload.stdin), 'local')
  });
  return {
    executed: !result.error,
    accepted: result.ok && result.passed === result.total && !result.stop,
    passed: result.passed,
    total: result.total,
    reason: result.error ? result.error.code : (result.stop ? result.stop.reason : null)
  };
}

async function main() {
  const affected = catalogue.listExercises().filter(exercise => exercise.language === 'analyse' && exercise.solution.includes('≠ : '));
  const results = [];
  for (const exercise of affected) {
    const occurrenceCount = exercise.solution.split('≠ : ').length - 1;
    if (occurrenceCount !== 1) throw new Error(`Nombre de corruptions inattendu : ${exercise.id}`);
    const position = exercise.solution.indexOf('≠ : ');
    const headers = [...exercise.solution.slice(0, position).matchAll(/^\[Cas\s+(\d+)\b[^\]]*\]/gim)];
    const caseNumber = headers.at(-1)?.[1];
    const expression = new RegExp(`^\\[Cas\\s+${caseNumber}\\b[^\\]]*\\]`, 'im');
    const starterHeader = expression.exec(exercise.starter);
    if (!starterHeader) throw new Error(`Cas absent : ${exercise.id}`);
    const starterTail = exercise.starter.slice(starterHeader.index + starterHeader[0].length);
    const nextCase = starterTail.search(/^\[Cas\s+\d+\b/im);
    const starterCase = nextCase < 0 ? starterTail : starterTail.slice(0, nextCase);
    if (!/^# Données : e(?:\s|:|=|,|$)/im.test(starterCase)) throw new Error(`Entrée e absente : ${exercise.id}`);
    const baseline = await evaluate(exercise, exercise.solution);
    const corrected = await evaluate(exercise, exercise.solution.replace('≠ : ', '\ne : '));
    results.push({ id: exercise.id, course: exercise.course, caseNumber: Number(caseNumber), baseline, corrected });
  }
  process.stdout.write(JSON.stringify({ description: 'Sortie nominale comparée à la séparation des lignes pour les réponses d et e', results }, null, 2) + '\n');
}

main().catch(error => {
  process.stderr.write(error.message + '\n');
  process.exitCode = 1;
});
