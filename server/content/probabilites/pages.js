/**
 * Assemblage des pages du cours « Probabilités » B2.
 *
 * Les chapitres sont composés par `kit.chapter` à partir des données de
 * `chapitres-1-3.js` / `chapitres-4-6.js`. Les pages transverses vivent dans
 * des modules dédiés sous `pages/` pour garder chaque fichier lisible.
 */
'use strict';

const accueil = require('./pages/accueil');
const cartesFormules = require('./pages/cartes-formules');
const examensExercices = require('./pages/examens-exercices');

function render(kit, course, chapterList) {
  const pages = {};

  const chaptersWithNav = chapterList.map((chapitre, index) => {
    const next = chapterList[index + 1];
    return Object.assign({}, chapitre, {
      next: next
        ? { href: 'chapitre' + next.n + '.html', label: 'Chapitre ' + next.n + ' — ' + next.title }
        : { href: '../atelier.html', label: 'Atelier de code' }
    });
  });

  for (const chapitre of chaptersWithNav) {
    const body = kit.chapter(course, chapitre);
    pages['chapitres/chapitre' + chapitre.n + '.html'] = {
      title: 'Chapitre ' + chapitre.n + ' — ' + chapitre.title + ' | ' + course.brand,
      description: 'Chapitre ' + chapitre.n + ' du cours de probabilités B2 : ' + chapitre.toc +
        ' Théorie, exemples détaillés, exercices Python exécutables, QCM corrigés.',
      active: 'ch' + chapitre.n,
      dataChapter: chapitre.n,
      body
    };
  }

  Object.assign(pages, accueil.index(course, chapterList));
  Object.assign(pages, accueil.sommaire(course, chapterList));
  Object.assign(pages, accueil.atelier(course));
  Object.assign(pages, cartesFormules.cartes(course, chapterList));
  Object.assign(pages, cartesFormules.formules(course));
  Object.assign(pages, examensExercices.examens(course));
  Object.assign(pages, examensExercices.exercices(course));

  return pages;
}

module.exports = { render };
