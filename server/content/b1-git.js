/**
 * Contenu du cours « Git B1 ».
 *
 * Les données de ce cours sont mises en page par `scripts/generate-courses.js`
 * (voir `scripts/course-kit.js`) : aucune page n'est écrite à la main ici, et
 * aucune page ne doit être éditée à la main dans le dossier b1-git/.
 *
 * Le découpage suit les supports « Aide-mémoire GitHub Git », « Travailler avec
 * Git au quotidien » (ENSICAEN) et les TP1-TP5 du dossier « cours B1 IT/Git »,
 * réorganisés en six chapitres qui s'exercent tous en Bash : chaque mécanisme de
 * Git (dépôt, index, branches, distant) est simulé par un script qui reproduit
 * l'effet exact des commandes.
 */
'use strict';

const chapitres = [
  ...require('./b1-git/chapitres-1-3'),
  ...require('./b1-git/chapitres-4-6')
];

const pages = require('./b1-git/pages');

const course = {
  id: 'b1-git',
  slug: 'gt',
  brand: 'Git B1',
  brandIcon: 'code',

  // Orange de la marque Git, assombri pour rester au-dessus de 4,5:1 sur blanc.
  accent: '#b45309',
  accentDeep: '#92400e',
  accentSoft: '#fef3e2',
  accentBorder: '#f3d5ae',

  storeKey: 'b1git:progress',

  title: 'Git B1 — versionner, brancher, collaborer',
  description:
    'Cours complet de Git niveau B1 : créer et configurer un dépôt, suivre l\'index et les commits, ' +
    'lire l\'historique et annuler proprement, travailler avec des branches et des fusions, ' +
    'synchroniser avec un dépôt distant, remiser et archiver. Chaque mécanisme de Git est scripté ' +
    'en Bash et réellement exécuté dans la page.',
  lead:
    'Git garde trois espaces — copie de travail, index, dépôt — et des commandes qui déplacent le ' +
    'travail de l\'un vers l\'autre. Six chapitres pour comprendre ces trajets : initialiser, ' +
    'committer, annuler, brancher, fusionner, pousser. Chaque mécanisme est d\'abord programmé et ' +
    'vérifié dans l\'atelier, puis rejoué tel quel dans un vrai terminal avec les vraies commandes.',

  sources: 'l\'« Aide-mémoire GitHub Git », le vade-mecum « Travailler avec Git au quotidien » (ENSICAEN) et les TP 1 à 5 du module Git',

  chapters: chapitres.map(chapitre => ({ n: chapitre.n, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapitres);
  }
};

module.exports = course;
