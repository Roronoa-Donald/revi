/**
 * Contenu du cours « Masterclass Apprendre à apprendre » B2 (dossier `masterclass-apprendre/`).
 *
 * Les données de ce cours sont mises en page par `scripts/generate-courses.js`
 * (voir `scripts/course-kit.js`) : aucune page n'est écrite à la main ici, et
 * aucune page ne doit être éditée à la main dans le dossier masterclass-apprendre/.
 */
'use strict';

const chapitres = [
  ...require('./masterclass-apprendre/chapitres-1-3'),
  ...require('./masterclass-apprendre/chapitres-4-6')
];

const pages = require('./masterclass-apprendre/pages');

const course = {
  id: 'masterclass-apprendre',
  slug: 'masterclass-apprendre',
  brand: 'Masterclass Apprendre à apprendre B2',
  brandIcon: 'graduation',

  // Fuchsia/Rose accessible conforme WCAG AA (6.04:1 sur blanc)
  accent: '#be185d',
  accentDeep: '#9d174d',
  accentSoft: '#fdf2f8',
  accentBorder: '#fbcfe8',

  storeKey: 'b2mc:progress',

  title: 'Masterclass Apprendre à apprendre B2 — Sciences Cognitives, Mémorisation & Pratique Délibérée',
  description:
    'Masterclass complète de sciences cognitives appliquées à l’ingénierie et au développement logiciel B2 : ' +
    'neurobiologie de la mémoire (Atkinson-Shiffrin, Sweller, consolidation synaptique), détection des illusions de compétence, ' +
    'rappel actif et protocole Feynman, courbe d’Ebbinghaus et algorithme SuperMemo SM-2, double codage de Paivio, ' +
    'méthode des Loci (palais mental), pratique délibérée d’Ericsson, règle des 85 % de Wilson, ' +
    'entrelacement conceptuel, métacognition de Flavell, chronobiologie ultradienne et score de Brier.',
  lead:
    'Apprenez deux fois plus vite avec deux fois moins d’efforts. Six chapitres exhaustifs adossés aux neurosciences ' +
    'modernes pour déconstruire les illusions de compétence, bâtir des palais mentaux inébranlables et programmer ' +
    'vos révisions avec la précision mathématique des algorithmes de répétition espacée.',

  sources: 'les publications scientifiques en neurosciences et sciences cognitives (Sweller, Ericsson, Ebbinghaus, Roediger, Paivio, Flavell, Wilson et al., Nature 2019)',

  chapters: chapitres.map(chapitre => ({ n: chapitre.n, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapitres);
  }
};

module.exports = course;
