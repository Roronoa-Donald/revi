/**
 * Contenu du cours « Ingénierie du besoin » B2 (dossier `ingenierie-besoin/`).
 *
 * Les données de ce cours sont mises en page par `scripts/generate-courses.js`
 * (voir `scripts/course-kit.js`) : aucune page n'est écrite à la main ici, et
 * aucune page ne doit être éditée à la main dans le dossier ingenierie-besoin/.
 */
'use strict';

const chapitres = [
  ...require('./ingenierie-besoin/chapitres-1-3'),
  ...require('./ingenierie-besoin/chapitres-4-6')
];

const pages = require('./ingenierie-besoin/pages');

const course = {
  id: 'ingenierie-besoin',
  slug: 'ingenierie-besoin',
  brand: 'Ingénierie du besoin B2',
  brandIcon: 'clipboard',

  // Violet officiel accessible conforme WCAG AA (5.70:1 sur blanc)
  accent: '#7c3aed',
  accentDeep: '#6d28d9',
  accentSoft: '#f5f3ff',
  accentBorder: '#ddd6fe',

  storeKey: 'b2ib:progress',

  title: 'Ingénierie du besoin B2 — Spécification d’Exigences, ISO 29148, Traçabilité RTM et BDD',
  description:
    'Cours complet d’ingénierie du besoin et des exigences niveau B2 : frontière problème/solution, ' +
    'parties prenantes et matrice de Mendelow, exigences fonctionnelles et non-fonctionnelles FURPS+, ' +
    'critères de qualité normatifs ISO/IEC/IEEE 29148, techniques d’élicitation (entretiens, shadowing, questionnaires Yamane, personas), ' +
    'modélisation agile Connextra, critères DoR/DoD, priorisation MoSCoW et WSJF, cahier des charges SRS, ' +
    'matrice de traçabilité RTM, syntaxe BDD Gherkin, revues INVEST, inspections Fagan et comités CCB.',
  lead:
    'Comprendre le problème réel avant de concevoir la solution. Six chapitres complets pour maîtriser ' +
    'le cycle de vie de l’ingénierie des exigences, structurer des spécifications logicielles infaillibles ' +
    'et garantir la traçabilité intégrale du besoin jusqu’aux tests automatisés.',

  sources: 'le cours officiel Ingénierie du besoin B2, la norme ISO/IEC/IEEE 29148, le modèle FURPS+, les standards IREB et les pratiques agiles de modélisation',

  chapters: chapitres.map(chapitre => ({ n: chapitre.n, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapitres);
  }
};

module.exports = course;
