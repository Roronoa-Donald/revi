'use strict';

const { createHash } = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const verifiedExercises = require('./grading-evidence.json');
const runtimeEvidence = require('./grading-runtime-evidence.json');

const suspendedCourses = Object.freeze(['csharp', 'docker', 'b3-linux', 'b3-github', 'b1-sql', 'sql', 'b3-sql']);
const suspendedExercises = Object.freeze({
  'algo-c9-e2': 'b1-algo'
});
const methodExercises = new Set(['algo-c6-e3', 'algo-c9-e1', 'algo-c9-e3', 'algo-c10-e3']);
const suspensionMessage = 'La correction automatique de ce cours est temporairement suspendue pendant la vérification des exercices.';
const exerciseSuspensionMessage = 'La correction automatique de cet exercice est temporairement suspendue : elle ne vérifie pas la méthode demandée.';
const evidenceSuspensionMessage = 'La correction automatique de cet exercice est temporairement suspendue : les preuves de fiabilité des tests sont incomplètes ou périmées.';

function exerciseFingerprint(exercise) {
  return createHash('sha256').update(JSON.stringify(exercise)).digest('hex');
}

function runtimeMatches(evidence) {
  const entries = Object.entries(evidence || {});
  if (!entries.length) return false;
  try {
    return entries.every(([relative, expected]) => /^[a-f0-9]{64}$/.test(expected) &&
      createHash('sha256').update(fs.readFileSync(path.resolve(__dirname, relative))).digest('hex') === expected);
  } catch {
    return false;
  }
}

function isGradingSuspended(course, exerciseId) {
  if (suspendedCourses.includes(course)) return true;
  if (typeof exerciseId !== 'string') return false;
  if (Object.hasOwn(suspendedExercises, exerciseId) && suspendedExercises[exerciseId] === course) return true;
  const exercise = require('./index').getExercise(exerciseId);
  if (!exercise || exercise.course !== course) return true;
  if (exercise.language === 'analyse') return false;
  return !Object.hasOwn(verifiedExercises, exerciseId) ||
    verifiedExercises[exerciseId] !== exerciseFingerprint(exercise) ||
    !runtimeMatches(runtimeEvidence.common) ||
    (methodExercises.has(exerciseId) && !runtimeMatches(runtimeEvidence.method));
}

function gradingSuspensionMessage(course, exerciseId) {
  if (suspendedCourses.includes(course)) return suspensionMessage;
  if (Object.hasOwn(suspendedExercises, exerciseId) && suspendedExercises[exerciseId] === course) {
    return exerciseSuspensionMessage;
  }
  return evidenceSuspensionMessage;
}

module.exports = { suspendedCourses, suspendedExercises, suspensionMessage, exerciseSuspensionMessage,
  evidenceSuspensionMessage, exerciseFingerprint, isGradingSuspended, gradingSuspensionMessage };
