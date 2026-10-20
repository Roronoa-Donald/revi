'use strict';

const fs = require('fs');
const path = require('path');
const { COURSES, COURSE_DIRS } = require('../server/courses');

console.log('=== AUDIT CANONIQUE DES COURS ===\n');

const stats = {
  totalCourses: COURSE_DIRS.length,
  byLevel: { b1: 0, b2: 0, b3: 0 },
  exerciseLanguages: {},
  coursesWithExercises: 0,
  coursesWithoutExercises: 0,
  problematicCourses: []
};

for (const id of COURSE_DIRS) {
  const meta = COURSES[id];
  stats.byLevel[meta.level] = (stats.byLevel[meta.level] || 0) + 1;

  // Check exercises
  let exFile = path.join(__dirname, '..', 'server', 'exercises', `${id}.js`);
  let exDir = path.join(__dirname, '..', 'server', 'exercises', id);
  let exercises = [];
  let exLanguage = 'none';

  if (fs.existsSync(exFile)) {
    try {
      exercises = require(exFile);
    } catch (e) {
      console.error(`Erreur require(${exFile}):`, e.message);
    }
  } else if (fs.existsSync(exDir)) {
    try {
      const files = fs.readdirSync(exDir).filter(f => f.endsWith('.js')).sort();
      for (const f of files) {
        const mod = require(path.join(exDir, f));
        if (Array.isArray(mod)) exercises.push(...mod);
      }
    } catch (e) {
      console.error(`Erreur scan(${exDir}):`, e.message);
    }
  }

  if (exercises.length > 0) {
    stats.coursesWithExercises++;
    const langs = [...new Set(exercises.map(e => e.language))];
    exLanguage = langs.join(', ');
    for (const l of langs) {
      stats.exerciseLanguages[l] = (stats.exerciseLanguages[l] || 0) + 1;
    }
  } else {
    stats.coursesWithoutExercises++;
  }

  // Check content
  let contentDir = path.join(__dirname, '..', 'server', 'content', id);
  let hasContent = fs.existsSync(contentDir);

  // Classify course
  console.log(`[${meta.level.toUpperCase()}] ${id.padEnd(25)} | Nom: ${meta.name.padEnd(35)} | Ex: ${exercises.length} (${exLanguage}) | Contenu: ${hasContent ? 'OK' : 'ABSENT'}`);
}

console.log('\n=== STATISTIQUES GLOBALES ===');
console.log('Total cours:', stats.totalCourses);
console.log('Par niveau:', stats.byLevel);
console.log('Cours avec exercices:', stats.coursesWithExercises);
console.log('Langages exercices:', stats.exerciseLanguages);
