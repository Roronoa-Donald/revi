'use strict';

const fs = require('fs');
const path = require('path');
const project = process.argv[2] || process.cwd();
const output = process.argv[3] || path.join(project, 'verification', 'modes-analyse.csv');
const catalogue = require(path.join(project, 'server/exercises')).listExercises();
const groups = new Map();
for (const exercise of catalogue) {
  if (!groups.has(exercise.course)) groups.set(exercise.course, []);
  groups.get(exercise.course).push(exercise);
}
const text = value => String(value || '').replace(/<[^>]*>/g, ' ').replace(/&(?:nbsp|#160);/g, ' ').replace(/\s+/g, ' ').trim();
const term = /\b(?:programmation|scripts?|python|bash|exécut(?:é|er|ez|ion)|coder|code)\b/iu;
const csv = value => '"' + String(value).replace(/"/g, '""') + '"';
const rows = [['cours', 'mode_catalogue', 'exercices', 'sommaire', 'atelier', 'candidat_meta_atelier', 'indices_avec_termes_candidats']];
for (const [course, exercises] of groups) {
  if (!exercises.every(exercise => exercise.language === 'analyse')) continue;
  const location = path.join(project, course);
  const summary = ['sommaire.html', 'index.html'].find(file => fs.existsSync(path.join(location, file))) || '';
  const workshop = ['chapitres/exercices.html', 'exercices/exercices.html', 'exercices.html'].find(file => fs.existsSync(path.join(location, file))) || '';
  let meta = '';
  if (workshop) {
    const raw = fs.readFileSync(path.join(location, workshop), 'utf8');
    const match = raw.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
    if (match && term.test(text(match[1]))) meta = text(match[1]);
  }
  const hints = exercises.flatMap(exercise => (exercise.hints || []).filter(hint => term.test(text(hint))).map(() => exercise.id));
  rows.push([course, 'analyse', exercises.length, summary ? `${course}/${summary}` : 'introuvable', workshop ? `${course}/${workshop}` : 'introuvable', meta, hints.length]);
}
fs.writeFileSync(output, rows.map(row => row.map(csv).join(';')).join('\n') + '\n');
console.log(JSON.stringify({ courses: rows.length - 1, metadataCandidates: rows.slice(1).filter(row => row[5]).length, coursesWithHintCandidates: rows.slice(1).filter(row => row[6]).length, output }, null, 2));
