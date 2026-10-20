/**
 * Contenu du cours « Circuit logique & architecture des ordinateurs » B1.
 *
 * Les données de ce cours sont mises en page par `scripts/generate-courses.js`
 * (voir `scripts/course-kit.js`) : aucune page n'est écrite à la main ici, et
 * aucune page ne doit être éditée à la main dans le dossier b1-architecture/.
 *
 * Le découpage suit le support « Circuit logique & architecture des ordinateurs »
 * (Georges AYIVI-TOGBASSA, Novembre 2024, code B1COM0401, 32 h) : généralités
 * et unités, systèmes de numération, nombres signés et arithmétique binaire,
 * circuits logiques combinatoires, circuits séquentiels, architecture PC et
 * périphériques. Six chapitres qui s'exercent tous en Bash : chaque mécanisme
 * (conversions, compléments, portes, bascules, compteur, qualification) est
 * simulé par un script qui reproduit l'analyse exacte du support.
 */
'use strict';

const chapitres = [
  ...require('./b1-architecture/chapitres-1-3'),
  ...require('./b1-architecture/chapitres-4-6')
];

const pages = require('./b1-architecture/pages');

const course = {
  id: 'b1-architecture',
  slug: 'ar',
  brand: 'Architecture B1',
  brandIcon: 'cpu',
  accent: '#7c3aed',
  accentDeep: '#6d28d9',
  accentSoft: '#f5f3ff',
  accentBorder: '#ddd6fe',

  storeKey: 'b1architecture:progress',

  title: 'Circuit logique & architecture des ordinateurs',
  description:
    'Cours complet B1 : généralités sur l\'ordinateur et les unités de mesure (Ko, Mo, Go, MBps/Mbps), ' +
    'systèmes de numération et conversions (bases 2, 8, 10, 16, divisions successives, groupements, ' +
    'partie fractionnaire, BCD, ASCII), nombres signés (signe + valeur absolue, compléments à 1 et à 2, ' +
    'arithmétique binaire), circuits logiques combinatoires (huit portes, algèbre de Boole, Karnaugh, ' +
    'additionneur, comparateur, décodeur, multiplexeur), circuits séquentiels (bascules RS/D/JK, registre ' +
    'à décalage, compteur) et architecture PC (von Neumann, carte mère, périphériques, qualification ' +
    'd\'un poste). Chaque mécanisme est scripté en Bash et réellement exécuté dans la page.',

  lead:
    'L\'architecture des ordinateurs n\'est pas du vocabulaire à réciter : c\'est une discipline — convertir ' +
    'un nombre de base en base (divisions successives, groupements de bits), représenter un négatif ' +
    '(complément à 2), simplifier une fonction (Boole, Karnaugh), simuler une bascule ou un compteur ' +
    'front par front, qualifier un poste. Six chapitres pour ancrer chaque mécanisme. Chacun est d\'abord ' +
    'programmé et vérifié dans l\'atelier, puis rejoué tel quel sur les exercices du support.',

  sources:
    'le support « Circuit logique & architecture des ordinateurs » (Georges AYIVI-TOGBASSA, Novembre 2024, code B1COM0401)',

  chapters: chapitres.map(chapitre => ({ n: chapitre.n, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapitres);
  }
};

module.exports = course;
