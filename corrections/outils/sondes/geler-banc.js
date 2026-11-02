'use strict';

const fs = require('node:fs');
const catalogue = require('/project/server/exercises');
const { proposals, changeSection } = require('./sonder-reponses-plausibles');
const { fixtures } = require('./sondes-sept-restants');
const sample = JSON.parse(fs.readFileSync('/project/corrections/fixtures/echantillons-identifiants.json', 'utf8'));

const exercises = [];
for (const [family, selection] of Object.entries(sample.families)) {
  for (const entry of selection.exercises_20) {
    const exercise = catalogue.getExercise(entry.id);
    if (!exercise || !proposals[entry.id]) continue;
    exercises.push({
      id: exercise.id,
      family,
      language: exercise.language,
      provenance: '173-sondes-originales',
      variants: proposals[entry.id].map(proposal => ({
        description: proposal.description,
        code: changeSection(exercise.solution, proposal)
      }))
    });
  }
}
for (const fixture of fixtures) {
  const exercise = catalogue.getExercise(fixture.id);
  if (!exercise) throw new Error(`Exercice absent : ${fixture.id}`);
  exercises.push({
    id: exercise.id,
    family: fixture.family,
    language: exercise.language,
    provenance: 'sept-sondes-avec-temoin',
    independentReference: fixture.baseline,
    variants: fixture.variants.map(variant => ({
      description: variant.description,
      code: variant.code,
      witness: { input: variant.input, expected: variant.expected }
    }))
  });
}
const ids = new Set(exercises.map(exercise => exercise.id));
if (ids.size !== 180 || exercises.length !== 180 || exercises.some(exercise => exercise.variants.length !== 2)) {
  throw new Error('Le banc attendu doit contenir 180 exercices distincts et deux variantes chacun.');
}
console.log(JSON.stringify({
  source: 'reparation-k20@463e40b',
  sourceScripts: ['sonder-reponses-plausibles.js', 'sondes-sept-restants.js'],
  exercises
}, null, 2));
