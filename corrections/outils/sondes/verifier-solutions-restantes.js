'use strict';

const catalogue = require('/project/server/exercises');
const original = require('./sonder-reponses-plausibles');
const independent = require('./sondes-sept-restants');

async function main() {
  const exercises = catalogue.listExercises().filter(exercise => ['java', 'powershell', 'csharp'].includes(exercise.language));
  const results = [];
  for (const exercise of exercises) {
    const evaluate = exercise.language === 'csharp' ? independent.evaluate : original.evaluate;
    results.push({ id: exercise.id, language: exercise.language, ...(await evaluate(exercise, exercise.solution)) });
  }
  const failed = results.filter(result => !result.executed || !result.accepted);
  console.log(JSON.stringify({
    selection: 'corrigés Java, PowerShell et C# ignorés par tests/exercise-solutions.test.js',
    exercises: results.length,
    executed: results.filter(result => result.executed).length,
    accepted: results.filter(result => result.executed && result.accepted).length,
    failed,
    results,
    limites: [
      'Le passage des tests existants ne prouve pas que les corrigés sont généraux ; les corrigés mémorisés restent signalés.',
      'Les exemples visibles ne sont pas testés séparément par ce complément.'
    ]
  }, null, 2));
  process.exitCode = failed.length || !exercises.length || results.length !== exercises.length ? 1 : 0;
}

main().catch(error => { console.error(error.stack || error.message); process.exitCode = 1; });
