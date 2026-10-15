/**
 * Contenu du cours « Cybersécurité B1 ».
 *
 * Les données de ce cours sont mises en page par `scripts/generate-courses.js`
 * (voir `scripts/course-kit.js`) : aucune page n'est écrite à la main ici, et
 * aucune page ne doit être éditée à la main dans le dossier b1-cyber/.
 *
 * Le découpage suit le support « Introduction à la Cybersécurité B1 IT
 * 2024-2025 » (modules 1 à 7), réorganisé en six chapitres qui s'exercent tous
 * en Bash : chaque mécanisme (risque, triade CIA, contrôle d'accès, journaux,
 * réponse aux incidents, conformité) est simulé par un script qui reproduit
 * l'effet exact de l'analyse d'un analyste.
 */
'use strict';

const chapitres = [
  ...require('./b1-cyber/chapitres-1-3'),
  ...require('./b1-cyber/chapitres-4-6')
];

const pages = require('./b1-cyber/pages');

const course = {
  id: 'b1-cyber',
  slug: 'cy',
  brand: 'Cybersécurité B1',
  brandIcon: 'shield',

  // Teal de la marque du cours, assombri pour rester au-dessus de 4,5:1 sur blanc
  // (le teal-500 de la marque ne passe pas : 3,7:1).
  accent: '#0f766e',
  accentDeep: '#115e59',
  accentSoft: '#f0fdfa',
  accentBorder: '#99f6e4',

  storeKey: 'b1cyber:progress',

  title: 'Cybersécurité B1 — protéger, détecter, répondre',
  description:
    'Cours complet de cybersécurité niveau B1 : distinguer cybersécurité et sécurité informatique, ' +
    'calculer un risque, classer les menaces selon la triade CIA, comprendre l\'authentification et ' +
    'la cryptographie, appliquer les modèles de contrôle d\'accès, gérer les correctifs, répondre aux ' +
    'incidents et respecter les référentiels. Chaque mécanisme est scripté en Bash et réellement ' +
    'exécuté dans la page.',
  lead:
    'La cybersécurité tient dans trois questions : que protège-t-on (confidentialité, intégrité, ' +
    'disponibilité), contre qui (menaces, vulnérabilités), et comment (authentification, contrôle ' +
    'd\'accès, surveillance). Six chapitres pour répondre à ces questions avec des chiffres et des ' +
    'procédures, pas des impressions. Chaque mécanisme est d\'abord programmé et vérifié dans ' +
    'l\'atelier, puis rejoué tel quel dans un vrai terminal avec les vrais outils.',

  sources: 'le support « Introduction à la Cybersécurité B1 IT 2024-2025 » (modules 1 à 7)',

  chapters: chapitres.map(chapitre => ({ n: chapitre.n, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapitres);
  }
};

module.exports = course;
