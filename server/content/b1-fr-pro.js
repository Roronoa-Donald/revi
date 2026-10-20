/**
 * Contenu du cours « Français professionnel B1 ».
 *
 * Les données de ce cours sont mises en page par `scripts/generate-courses.js`
 * (voir `scripts/course-kit.js`) : aucune page n'est écrite à la main ici, et
 * aucune page ne doit être éditée à la main dans le dossier b1-fr-pro/.
 *
 * Le découpage suit les supports « Les fautes de français à éviter »
 * (Cours 0001 : pléonasmes, barbarismes, solécismes, fautes au bureau ;
 * Docteur SOLÉ, CDPS), « Compétences oratoires — Les registres de langue »
 * (Cours 002) et « La communication — Notions de base » (CDPS), complétés par
 * le chapitre « La lettre de motivation » du manuel de préparation à
 * l'embauche. Six chapitres qui s'exercent tous en Bash : chaque règle
 * (canaux, registres, fautes, lettre, accords) est simulée par un script qui
 * reproduit l'analyse exacte du support.
 */
'use strict';

const chapitres = [
  ...require('./b1-fr-pro/chapitres-1-3'),
  ...require('./b1-fr-pro/chapitres-4-6')
];

const pages = require('./b1-fr-pro/pages');

const course = {
  id: 'b1-fr-pro',
  slug: 'fr-pro',
  brand: 'Français professionnel B1',
  brandIcon: 'book',

  // Bleu du registre des cours : passe le contraste 4,5:1 sur blanc tel quel.
  accent: '#2563eb',
  accentDeep: '#1e40af',
  accentSoft: '#eff6ff',
  accentBorder: '#bfdbfe',

  storeKey: 'b1frpro:progress',

  title: 'Français professionnel B1 — communication, registres, lettre de motivation',
  description:
    'Cours complet de français professionnel niveau B1 : la communication (verbal, para-verbal, non-verbal, ' +
    'Mehrabian, Aristote), les registres de langue (familier, courant, soutenu), les fautes à éviter au bureau ' +
    '(date, etc., ci-joint, veuillez), les pléonasmes, barbarismes et solécismes, la lettre de motivation ' +
    '(neuf blocs, appel et politesse, corps en trois paragraphes) et la grammaire du passé composé. Chaque ' +
    'règle est scriptée en Bash et réellement exécutée dans la page.',
  lead:
    'Le français professionnel n\'est pas de la littérature : c\'est un outil — un message décodé (explicite ' +
    'et implicite), un registre choisi (familier, courant, soutenu), un courrier sans faute (ci-joint, ' +
    'veuillez), une lettre structurée (neuf blocs, trois paragraphes). Six chapitres pour ancrer chaque règle. ' +
    'Chaque mécanisme est d\'abord programmé et vérifié dans l\'atelier, puis rejoué tel quel sur les exemples ' +
    'des supports.',

  sources:
    'les supports « Les fautes de français à éviter » (Cours 0001, pléonasmes, barbarismes, solécismes, fautes ' +
    'au bureau — Docteur SOLÉ, CDPS), « Compétences oratoires — Les registres de langue » (Cours 002, CDPS), ' +
    '« La communication — Notions de base » (CDPS) et le chapitre « La lettre de motivation » du manuel de ' +
    'préparation à l\'embauche',

  chapters: chapitres.map(chapitre => ({ n: chapitre.n, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapitres);
  }
};

module.exports = course;
