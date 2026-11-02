'use strict';

const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const parse5 = require('parse5');
const config = require('../../server/exercises/course-config');
const catalogue = require('../../server/exercises');
const policy = require('../../server/exercises/grading-policy');

const root = path.resolve(__dirname, '../..');
const attr = (node, name) => (node.attrs || []).find(item => item.name === name)?.value;
const hasClass = (node, name) => (attr(node, 'class') || '').split(/\s+/).includes(name);
const nodes = (node, predicate, found = []) => {
  if (predicate(node)) found.push(node);
  for (const child of node.childNodes || []) nodes(child, predicate, found);
  return found;
};
const text = node => node.nodeName === '#text' ? node.value :
  (node.childNodes || []).map(text).join(' ');
const normalize = value => value.replace(/\s+/gu, ' ').trim();
const digest = value => crypto.createHash('sha256').update(value).digest('hex');
const all = catalogue.listExercises();
const courses = [];

for (const [course, courseConfig] of Object.entries(config)) {
  const relative = path.join(courseConfig.dir, courseConfig.chapterDir, 'chapitre1.html');
  const source = fs.readFileSync(path.join(root, relative), 'utf8');
  const document = parse5.parse(source);
  const objectives = nodes(document, node => hasClass(node, 'box--objectifs'));
  const questions = nodes(document, node => hasClass(node, 'q')).map(question => {
    const options = nodes(question, node => node.tagName === 'button' && hasClass(node, 'opt'));
    const correct = options.filter(option => attr(option, 'data-correct') === '1');
    const labels = options.map(option => normalize(text(option)));
    const explanations = nodes(question, node => hasClass(node, 'q__exp'));
    return {
      options: options.length,
      correctes_marquees: correct.length,
      libelles_dupliques: new Set(labels).size !== labels.length,
      explication_non_vide: explanations.some(node => normalize(text(node)).length > 0)
    };
  });
  const exercises = all.filter(item => item.course === course && item.chapter === 1).map(exercise => {
    const brief = normalize(text(parse5.parseFragment(exercise.brief)));
    const expected = [...exercise.examples, ...exercise.tests]
      .map(item => normalize(item.expected || ''))
      .filter(value => value.length > 0);
    return {
      id: exercise.id,
      langue: exercise.language,
      suspension: policy.isGradingSuspended(exercise.course, exercise.id),
      nombre_indices: exercise.hints.length,
      premier_indice_question: exercise.hints[0]?.includes('?') || false,
      attendus_litteraux_dans_enonce: exercise.language === 'analyse'
        ? expected.filter(value => brief.includes(value)).length : null
    };
  });
  courses.push({
    cours: course,
    page: relative,
    page_sha256: digest(source),
    objectifs: objectives.flatMap(box => nodes(box, node => node.tagName === 'li').map(node => normalize(text(node)))),
    qcm_nombre: questions.length,
    qcm_une_marque: questions.filter(question => question.correctes_marquees === 1).length,
    qcm_sans_explication: questions.filter(question => !question.explication_non_vide).length,
    qcm_options_dupliquees: questions.filter(question => question.libelles_dupliques).length,
    exercices: exercises,
    statut_pedagogique: 'non évalué'
  });
}

console.log(JSON.stringify({
  schema: 'revi.lot3.chapitres1.inventaire.v1',
  limites: [
    'L’inventaire structurel ne vérifie ni les prérequis, ni l’alignement pédagogique, ni la validité des réponses.',
    'La présence d’un point d’interrogation ne prouve pas la qualité d’un indice.',
    'Une correspondance littérale peut être un libellé générique et une absence ne prouve pas l’absence de révélation.'
  ],
  cours: courses
}, null, 2));
