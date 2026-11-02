'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const parse5 = require('parse5');
const catalogue = require('../server/exercises');
const courseConfig = require('../server/exercises/course-config');
const { renderSection } = require('../scripts/generate-code-labs');

const notice = 'La validation compare vos réponses aux attendus des cas affichés ; elle ne vérifie pas votre capacité à traiter toutes les situations.';

function textContent(node) {
  if (node.nodeName === '#text') return node.value;
  return (node.childNodes || []).map(textContent).join('');
}

test('la portée formative est indiquée pour chaque chapitre d’études de cas', () => {
  const chapters = new Map();
  for (const exercise of catalogue.listExercises()) {
    const key = `${exercise.course}:${exercise.chapter}`;
    if (!chapters.has(key)) chapters.set(key, []);
    chapters.get(key).push(exercise);
  }
  let checkedExercises = 0;
  for (const exercises of chapters.values()) {
    if (!exercises.some(exercise => exercise.language === 'analyse')) continue;
    assert.ok(exercises.every(exercise => exercise.language === 'analyse'), 'Traiter explicitement les chapitres mixtes');
    const { course, chapter } = exercises[0];
    const generated = textContent(parse5.parseFragment(renderSection(course, chapter)));
    assert.ok(generated.includes(notice), `${course}, chapitre ${chapter} : avis absent de la source`);
    const config = courseConfig[course];
    const filename = path.join(__dirname, '..', config.dir, config.chapterDir, `chapitre${chapter}.html`);
    const page = textContent(parse5.parse(fs.readFileSync(filename, 'utf8')));
    assert.ok(page.includes(notice), `${course}, chapitre ${chapter} : avis absent de la page`);
    checkedExercises += exercises.length;
  }
  assert.equal(checkedExercises, catalogue.listExercises().filter(exercise => exercise.language === 'analyse').length);
  assert.ok(checkedExercises > 0);
});

test('les chapitres de programmation ne reçoivent pas l’avis réservé aux études de cas', () => {
  const generated = textContent(parse5.parseFragment(renderSection('b1-python', 1)));
  assert.ok(!generated.includes(notice));
});
