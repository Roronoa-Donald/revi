/**
 * Contenu du cours « Programmation Web » (B1).
 *
 * Les données de ce cours sont mises en page par `scripts/generate-courses.js`
 * (voir `scripts/course-kit.js`) : aucune page n'est écrite à la main ici, et
 * aucune page ne doit être éditée à la main dans le dossier b1-prog-web/.
 *
 * Le découpage suit le support B1 (modules 01 à 04 : introduction au Web, HTML,
 * CSS, JavaScript), enrichi de deux chapitres qui manquaient au support mais
 * tombent à l'épreuve : formulaires et sécurité des entrées, puis mise en page
 * responsive.
 */
'use strict';

const chapitres = [
  ...require('./b1-prog-web/chapitres-1-3'),
  ...require('./b1-prog-web/chapitres-4-6')
];

const pages = require('./b1-prog-web/pages');

const course = {
  id: 'b1-prog-web',
  slug: 'web',
  brand: 'Prog. Web B1',
  brandIcon: 'globe',

  // Rouge brique : 5,9:1 sur blanc, donc conforme en texte comme en fond du
  // bouton principal (texte blanc sur accent).
  accent: '#b91c1c',
  accentDeep: '#991b1b',
  accentSoft: '#fdecec',
  accentBorder: '#f6c9c9',

  storeKey: 'b1web:progress',

  title: 'Programmation Web — du HTML au JavaScript',
  description:
    'Cours complet de programmation web niveau B1 : clients et serveurs, URL et HTTP, structure HTML ' +
    'sémantique, formulaires et validation, sécurité des entrées, sélecteurs CSS, cascade et modèle de ' +
    'boîte, flexbox, grille et responsive, DOM et événements. Théorie, exercices JavaScript exécutés dans ' +
    'la page, QCM et examens blancs.',
  lead:
    'Une page web se construit sur trois langages qui ne se remplacent pas : HTML pour le sens, CSS pour la ' +
    'présentation, JavaScript pour le comportement. Six chapitres pour les apprendre ensemble, en partant de ' +
    'ce qui se passe vraiment entre le clic sur une adresse et l’affichage du document — et en finissant par ' +
    'une page complète, interactive et accessible.',

  sources: 'les quatre modules du support B1 de programmation web (introduction au Web, HTML, CSS, JavaScript)',

  chapters: chapitres.map(chapitre => ({ n: chapitre.n, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapitres);
  }
};

module.exports = course;
