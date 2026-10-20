/**
 * Contenu du cours « Modélisation (MERISE) B1 ».
 *
 * Les données de ce cours sont mises en page par `scripts/generate-courses.js`
 * (voir `scripts/course-kit.js`) : aucune page n'est écrite à la main ici, et
 * aucune page ne doit être éditée à la main dans le dossier b1-merise/.
 *
 * Le découpage suit le support « Conception et modélisation des systèmes
 * d'information » (B1 IT, Simon Pierre EDOH), réorganisé en six chapitres qui
 * s'exercent tous en Bash : chaque mécanisme de la méthode (classement
 * donnée/information, niveaux, dictionnaire, DF, MCD, MLD, formes normales) est
 * simulé par un script qui reproduit l'analyse exacte de l'analyste.
 */
'use strict';

const chapitres = [
  ...require('./b1-merise/chapitres-1-3'),
  ...require('./b1-merise/chapitres-4-6')
];

const pages = require('./b1-merise/pages');

const course = {
  id: 'b1-merise',
  slug: 'mr',
  brand: 'Modélisation (MERISE) B1',
  brandIcon: 'database',

  // Teal du registre des cours, déjà conforme au contraste (le deep au-dessus).
  accent: '#0f766e',
  accentDeep: '#115e59',
  accentSoft: '#f0fdfa',
  accentBorder: '#99f6e4',

  storeKey: 'b1merise:progress',

  title: 'Modélisation (MERISE) B1 — analyser, modéliser, normaliser',
  description:
    'Cours complet de modélisation MERISE niveau B1 : le système d\'information dans l\'entreprise, la ' +
    'double démarche par niveaux et par étapes, le dictionnaire de données et les dépendances ' +
    'fonctionnelles, le modèle conceptuel des données (entités, associations, cardinalités), le passage ' +
    'au modèle logique relationnel et la normalisation 1FN-2FN-3FN. Chaque mécanisme est scripté en Bash ' +
    'et réellement exécuté dans la page.',
  lead:
    'MERISE sépare ce qui est enregistré (les données) de ce qui est fait (les traitements), et avance ' +
    'par niveaux : quoi (conceptuel), comment organiser (logique), comment réaliser (physique). Six ' +
    'chapitres pour passer du discours du client au schéma relationnel normalisé. Chaque mécanisme est ' +
    'd\'abord programmé et vérifié dans l\'atelier, puis rejoué tel quel sur les applications du support.',

  sources: 'le support « Conception et modélisation des systèmes d\'information » (B1 IT, S. P. EDOH) et l\'outil AnalyseSI',

  chapters: chapitres.map(chapitre => ({ n: chapitre.n, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapitres);
  }
};

module.exports = course;
