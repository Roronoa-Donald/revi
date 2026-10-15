/**
 * Contenu du cours « Algèbre linéaire » (B1).
 *
 * Les données de ce cours sont mises en page par `scripts/generate-courses.js`
 * (voir `scripts/course-kit.js`) : aucune page n'est écrite à la main ici, et
 * aucune page ne doit être éditée à la main dans le dossier b1-algebre/.
 *
 * Le découpage suit le support officiel B1 (cours d'algèbre linéaire, tomes 1
 * et 2) : matrices, espaces vectoriels, applications linéaires, déterminants.
 */
'use strict';

const chapitres = [
  ...require('./b1-algebre/chapitres-1-3'),
  ...require('./b1-algebre/chapitres-4-6')
];

const pages = require('./b1-algebre/pages');

const course = {
  id: 'b1-algebre',
  slug: 'al',
  brand: 'Algèbre B1',
  brandIcon: 'i-calculator',

  // Accent indigo : 6.3:1 sur blanc, donc conforme en texte comme en fond de
  // bouton (texte blanc sur accent).
  accent: '#4f46e5',
  accentDeep: '#3730a3',
  accentSoft: '#eef1fd',
  accentBorder: '#c7cdf0',

  storeKey: 'b1al:progress',

  title: 'Algèbre linéaire — matrices, espaces vectoriels et déterminants',
  description:
    'Cours complet d’algèbre linéaire niveau B1 : vecteurs et matrices, produit, transposée, ' +
    'inverse et méthode de Gauss, espaces vectoriels, familles libres et rang, déterminants et ' +
    'valeurs propres. Théorie, exercices Python exécutés dans la page, QCM et examens blancs.',
  lead:
    'L’outil mathématique qui traverse toute l’informatique : un tableau de notes, une image, un ' +
    'système d’équations, un graphe ou une transformation 3D se décrivent tous par des matrices. ' +
    'Un parcours progressif, du vocabulaire jusqu’au calcul de déterminant, conçu pour viser la ' +
    'maîtrise exigée aux évaluations.',

  sources: 'les supports B1 d’algèbre linéaire (tomes 1 et 2) et les corrigés de CC1 et CC2',

  chapters: chapitres.map(chapitre => ({ n: chapitre.n, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapitres);
  }
};

module.exports = course;
