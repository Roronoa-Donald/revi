/**
 * Contenu du cours « Anglais des affaires B1 ».
 *
 * Les données de ce cours sont mises en page par `scripts/generate-courses.js`
 * (voir `scripts/course-kit.js`) : aucune page n'est écrite à la main ici, et
 * aucune page ne doit être éditée à la main dans le dossier b1-anglais/.
 *
 * Le découpage suit les supports « English for IT Professionals » (B1 IT,
 * Dorcas Tchogoue, sessions 1 à 4) — l'histoire de Leo du « Mysterious Email »
 * au test final — réorganisés en six chapitres qui s'exercent tous en Bash :
 * chaque mécanisme (registres, méthode CLEAR, structure de présentation, sons,
 * reductions, grammaire) est simulé par un script qui reproduit l'analyse
 * exacte du professionnel anglophone.
 */
'use strict';

const chapitres = [
  ...require('./b1-anglais/chapitres-1-3'),
  ...require('./b1-anglais/chapitres-4-6')
];

const pages = require('./b1-anglais/pages');

const course = {
  id: 'b1-anglais',
  slug: 'en',
  brand: 'Anglais des affaires B1',
  brandIcon: 'book',

  // Rouge du registre des cours, assombri pour rester au-dessus de 4,5:1 sur blanc
  // (le rouge-500 de la marque ne passe pas : 3,8:1).
  accent: '#dc2626',
  accentDeep: '#991b1b',
  accentSoft: '#fef2f2',
  accentBorder: '#fecaca',

  storeKey: 'b1anglais:progress',

  title: 'Anglais des affaires B1 — emails, présentations, prononciation',
  description:
    'Cours complet d\'anglais des affaires niveau B1 pour les professionnels de l\'informatique : le ' +
    'vocabulaire essentiel (deadline, stakeholder, budget, client/customer), les faux amis, l\'écriture ' +
    'd\'emails professionnels (méthode CLEAR, ton formel et semi-formel), les présentations orales ' +
    '(structure en trois parties, Grandma Rule), la prononciation (sons /θ/ et /h/, -ed endings, accent), ' +
    'les registres (gonna, wanna, gotta) et la grammaire des requêtes polies. Chaque mécanisme est scripté ' +
    'en Bash et réellement exécuté dans la page.',
  lead:
    'L\'anglais des affaires n\'est pas de la littérature : c\'est un outil — vocabulaire précis, emails ' +
    'structurés (CLEAR), présentations en trois parties, prononciation qui se fait comprendre. Six ' +
    'chapitres pour suivre Leo du « Mysterious Email » au test final. Chaque mécanisme est d\'abord ' +
    'programmé et vérifié dans l\'atelier, puis rejoué tel quel sur les exemples des supports.',

  sources: 'les supports « English for IT Professionals » (B1 IT, Dorcas Tchogoue, sessions 1 à 4)',

  chapters: chapitres.map(chapitre => ({ n: chapitre.n, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapitres);
  }
};

module.exports = course;
