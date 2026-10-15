/**
 * Contenu du cours « Droit Informatique » B2 (dossier `droit/`).
 *
 * Les données de ce cours sont mises en page par `scripts/generate-courses.js`
 * (voir `scripts/course-kit.js`) : aucune page n'est écrite à la main ici, et
 * aucune page ne doit être éditée à la main dans le dossier droit/.
 */
'use strict';

const chapitres = [
  ...require('./droit/chapitres-1-3'),
  ...require('./droit/chapitres-4-6')
];

const pages = require('./droit/pages');

const course = {
  id: 'droit',
  slug: 'droit',
  brand: 'Droit Informatique B2',
  brandIcon: 'scale',

  // Ambre foncé conforme AA (≥ 4.5:1 sur blanc)
  accent: '#b45309',
  accentDeep: '#92400e',
  accentSoft: '#fef3e2',
  accentBorder: '#f3d5ae',

  storeKey: 'b2droit:progress',

  title: 'Droit informatique B2 — données personnelles, RGPD, sources et sanctions',
  description:
    'Cours complet de droit informatique niveau B2 : notions générales, données personnelles et ' +
    'sensibles, défis du numérique (Cambridge Analytica, régulation, addictions), sources normatives ' +
    'et supranationales, RGPD européen et cadre institutionnel togolais (IPDCP, articles 79, 86, 87, 93). ' +
    'Chaque notion est mise en œuvre dans un script Bash exécuté dans la page.',
  lead:
    'Le droit encadre les usages, la création et la gestion des technologies numériques. Six chapitres ' +
    'pour définir les règles, distinguer données personnelles et sensibles, analyser les grands scandales, ' +
    'classer les sources, appliquer le RGPD et calculer les peines applicables au Togo.',

  sources: 'le cours « Droit de l’informatique » (CDP B2 IT, MILILA P. 2026), le recueil de questions et les lois applicables (RGPD UE, loi togolaise n° 2019-014)',

  chapters: chapitres.map(chapitre => ({ n: chapitre.n, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapitres);
  }
};

module.exports = course;
