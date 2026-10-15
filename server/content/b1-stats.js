/**
 * Contenu du cours « Statistique descriptive » (B1).
 *
 * Les données de ce cours sont mises en page par `scripts/generate-courses.js`
 * (voir `scripts/course-kit.js`) : aucune page n'est écrite à la main ici, et
 * aucune page ne doit être éditée à la main dans le dossier b1-stats/.
 *
 * Le découpage suit le support B1 (cours de statistiques descriptives, série
 * d'exercices du Collège de Paris) : vocabulaire, tableaux et cumuls, tendance
 * centrale, dispersion, représentations graphiques, corrélation et régression.
 */
'use strict';

const chapitres = [
  ...require('./b1-stats/chapitres-1-3'),
  ...require('./b1-stats/chapitres-4-6')
];

const pages = require('./b1-stats/pages');

const course = {
  id: 'b1-stats',
  slug: 'st',
  brand: 'Statistiques B1',
  brandIcon: 'i-chart',

  // Accent émeraude assombri : 5,4:1 sur blanc, donc conforme en texte comme en
  // fond du bouton principal (texte blanc sur accent).
  accent: '#047857',
  accentDeep: '#065f46',
  accentSoft: '#e9f7f1',
  accentBorder: '#c2e8d8',

  storeKey: 'b1st:progress',

  title: 'Statistique descriptive — décrire une population',
  description:
    'Cours complet de statistique descriptive niveau B1 : vocabulaire et séries statistiques, effectifs, ' +
    'fréquences et cumuls, tendance centrale, dispersion, représentations graphiques, corrélation et ' +
    'régression. Théorie, exercices Python exécutés dans la page, QCM et examens blancs.',
  lead:
    'Un tableau de notes, un sondage, un relevé de température : la statistique descriptive apprend à ' +
    'résumer une masse de données par quelques nombres qui disent la vérité. Moyenne, médiane, écart-type, ' +
    'coefficient de variation, coefficient de corrélation : six chapitres pour les calculer, les interpréter ' +
    'et savoir lequel choisir.',

  sources: 'le support B1 de statistique descriptive et les séries d’exercices du Collège de Paris',

  chapters: chapitres.map(chapitre => ({ n: chapitre.n, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapitres);
  }
};

module.exports = course;
