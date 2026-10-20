/**
 * Contenu du cours « Bureautique B1 ».
 *
 * Les données de ce cours sont mises en page par `scripts/generate-courses.js`
 * (voir `scripts/course-kit.js`) : aucune page n'est écrite à la main ici, et
 * aucune page ne doit être éditée à la main dans le dossier b1-bureautique/.
 *
 * Le découpage suit les trois supports d'AHADJI Katé Kékéli (« Le logiciel de
 * traitement de texte Microsoft Office Word », « Le logiciel tableur Excel »,
 * « Initiation PowerPoint ») : deux chapitres Word, trois chapitres Excel,
 * un chapitre PowerPoint. Six chapitres qui s'exercent tous en Bash : chaque
 * règle (onglets, alignements, formules, conditionnelles, diaporama) est
 * simulée par un script qui reproduit l'analyse exacte du support.
 */
'use strict';

const chapitres = [
  ...require('./b1-bureautique/chapitres-1-3'),
  ...require('./b1-bureautique/chapitres-4-6')
];

const pages = require('./b1-bureautique/pages');

const course = {
  id: 'b1-bureautique',
  slug: 'bu',
  brand: 'Bureautique B1',
  brandIcon: 'chart',

  // Ambre du registre des cours, assombri pour rester au-dessus de 4,5:1 sur
  // blanc (l'ambre-500 #f59e0b tombe sous le seuil).
  accent: '#b45309',
  accentDeep: '#92400e',
  accentSoft: '#fffbeb',
  accentBorder: '#fde68a',

  storeKey: 'b1bureautique:progress',

  title: 'Bureautique B1 — Word, Excel, PowerPoint',
  description:
    'Cours complet de bureautique niveau B1 : Microsoft Word (ruban, modes d\'affichage, mise en forme ' +
    'des caractères et des paragraphes, mise en page, impression), Excel (classeur et feuilles, barres ' +
    'de la fenêtre, formules et fonctions statistiques, conditionnelles SI, NB.SI, SOMME.SI, RANG, ' +
    'fonctions de texte) et PowerPoint (modes d\'affichage, modèles, thèmes, diaporama et minutage). ' +
    'Chaque règle est scriptée en Bash et réellement exécutée dans la page.',
  lead:
    'La bureautique n\'est pas de la dactylographie : c\'est une discipline — sélectionner avant de mettre ' +
    'en forme, enregistrer avant de fermer, ouvrir une formule par le signe =, tester du palier le plus ' +
    'strict au plus large, projeter après avoir répété. Six chapitres pour ancrer chaque mécanisme : deux ' +
    'sur Word, trois sur Excel, un sur PowerPoint. Chacun est d\'abord programmé et vérifié dans l\'atelier, ' +
    'puis rejoué tel quel sur les exemples des supports.',

  sources:
    'les supports de cours « Microsoft Office Word », « Le logiciel tableur Excel » et « Initiation ' +
    'PowerPoint » (AHADJI Katé Kékéli)',

  chapters: chapitres.map(chapitre => ({ n: chapitre.n, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapitres);
  }
};

module.exports = course;
