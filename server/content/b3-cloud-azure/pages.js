/**
 * Assemblage des pages du cours « Cloud Microsoft Azure B3 ».
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
      lockLabel: 'Réservé B3 et plus',
      next: next
        ? { href: 'chapitre' + next.n + '.html', label: 'Module ' + next.n + ' — ' + next.title }
        : { href: '../atelier.html', label: 'Atelier de code' }
    });
  });

  for (const chapitre of chaptersWithNav) {
    const body = kit.chapter(course, chapitre);
    pages['chapitres/chapitre' + chapitre.n + '.html'] = {
      title: 'Module ' + chapitre.n + ' — ' + chapitre.title + ' | ' + course.brand,
      description: 'Module ' + chapitre.n + ' du cours Cloud Microsoft Azure B3 : ' + chapitre.toc +
        ' Notions clés, architectures Azure, ateliers de code interactifs, QCM corrigés.',
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
  Object.assign(pages, examensExercices.exercices(course, chapterList));

  return pages;
}

module.exports = { render };
