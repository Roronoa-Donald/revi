/**
 * Contenu du cours « Droit B1 ».
 *
 * Les données de ce cours sont mises en page par `scripts/generate-courses.js`
 * (voir `scripts/course-kit.js`) : aucune page n'est écrite à la main ici, et
 * aucune page ne doit être éditée à la main dans le dossier b1-droit/.
 *
 * Le découpage suit le support « Introduction au Droit » (B1 IT, cdp MILILA,
 * 2026), réorganisé en six chapitres qui s'exercent tous en Bash : chaque
 * mécanisme (qualification d'une règle, hiérarchie des normes, juridictions,
 * personnalité, loi dans le temps, validité des contrats) est simulé par un
 * script qui reproduit le raisonnement exact du juriste.
 */
'use strict';

const chapitres = [
  ...require('./b1-droit/chapitres-1-3'),
  ...require('./b1-droit/chapitres-4-6')
];

const pages = require('./b1-droit/pages');

const course = {
  id: 'b1-droit',
  slug: 'dr',
  brand: 'Droit B1',
  brandIcon: 'scale',

  // Orange du registre des cours, assombri pour rester au-dessus de 4,5:1.
  accent: '#b45309',
  accentDeep: '#92400e',
  accentSoft: '#fef3e2',
  accentBorder: '#f3d5ae',

  storeKey: 'b1droit:progress',

  title: 'Droit B1 — règles, sources, juridictions, contrats',
  description:
    'Cours complet d\'introduction au droit niveau B1 : droit objectif et droits subjectifs, la règle de ' +
    'droit et ses sanctions, les branches du droit, les sources (loi, coutume, jurisprudence, doctrine), ' +
    'la hiérarchie des normes, l\'organisation judiciaire togolaise, la personnalité juridique, ' +
    'l\'application de la loi dans le temps, les contrats et la responsabilité. Chaque mécanisme est ' +
    'scripté en Bash et réellement exécuté dans la page.',
  lead:
    'Le droit organise la vie en société par des règles générales, obligatoires et coercitives — et par ' +
    'des prérogatives qu\'il reconnaît à chacun. Six chapitres pour apprendre à qualifier une règle, ' +
    'hiérarchiser les normes, router un dossier devant la bonne juridiction, dater la personnalité ' +
    'juridique, statuer dans le temps et valider un contrat. Chaque mécanisme est d\'abord programmé et ' +
    'vérifié dans l\'atelier, puis rejoué tel quel sur les exemples du support.',

  sources: 'le support « Introduction au Droit » (B1 IT, cdp MILILA 2026) et les travaux pratiques encadrés du module',

  chapters: chapitres.map(chapitre => ({ n: chapitre.n, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapitres);
  }
};

module.exports = course;
