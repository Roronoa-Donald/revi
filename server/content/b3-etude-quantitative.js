/**
 * Contenu du cours « Étude Quantitative & Qualitative B3 » (dossier `b3-etude-quantitative/`).
 *
 * Les données de ce cours sont mises en page par `scripts/generate-courses.js`
 * (voir `scripts/course-kit.js`) : aucune page n'est écrite à la main ici, et
 * aucune page ne doit être éditée à la main dans le dossier b3-etude-quantitative/.
 */
'use strict';

const chapitres = [
  ...require('./b3-etude-quantitative/chapitres-1-3'),
  ...require('./b3-etude-quantitative/chapitres-4-6')
];

const pages = require('./b3-etude-quantitative/pages');

const course = {
  id: 'b3-etude-quantitative',
  slug: 'b3-etude-quantitative',
  brand: 'Étude Quantitative & Qualitative B3',
  brandIcon: 'chart',

  // Émeraude / Vert académique sobre conforme WCAG AA/AAA (6.38:1 / 10.45:1 sur blanc)
  accent: '#047857',
  accentDeep: '#064e3b',
  accentSoft: '#ecfdf5',
  accentBorder: '#a7f3d0',

  storeKey: 'b3etudequant:progress',

  title: 'Étude Quantitative &amp; Qualitative B3 — Méthodologie, Échantillonnage, Statistiques &amp; Mémoire',
  description:
    'Formation d’excellence en méthodologie de recherche appliquée et analyse des données pour le Bachelor 3 : ' +
    'fondements épistémologiques et cadrage conceptuel (positivisme déductif vs interprétativisme inductif, univers d’enquête, ' +
    'triangulation de Denzin), théorie mathématique de l’échantillonnage représentatif (formule de Cochran, marge d’erreur, ' +
    'correction pour population finie FPC, stratification proportionnelle et contrôle de conformité par quotas), ' +
    'conception scientifique de questionnaires et métrologie d’attitudes (échelles ordinales de Likert, différentiel d’Osgood, ' +
    'éradication des biais de formulation suggestifs et double détente, entonnoir de passation et pilotage du taux d’abandon drop-off), ' +
    'collecte qualitative immersive (typologie d’entretiens semi-directifs, techniques de relance neutre, animation de Focus Groups, ' +
    'régulation du leader d’opinion et coefficient de fiabilité inter-observateurs de Miles &amp; Huberman), ' +
    'statistique descriptive et inférentielle (indicateurs de tendance centrale et de dispersion, tableaux de contingence croisés, ' +
    'test d’indépendance du Chi-deux au seuil critique de 3.84, corrélation linéaire de Pearson et seuil de significativité p-valeur à 5%), ' +
    'et analyse qualitative de contenu selon Laurence Bardin (unités d’enregistrement, codage inductif/déductif, indice de similarité de Jaccard, ' +
    'et structuration formelle du mémoire professionnel de fin d’études selon les 6 piliers canoniques du guide officiel CDP Sup).',
  lead:
    'Maîtrisez la démarche scientifique complète, le dimensionnement statistique rigoureux, les enquêtes de terrain et la rédaction académique de niveau Bachelor 3. ' +
    'Six modules approfondis combinant formalisme théorique, 18 études de cas pratiques et méthodologiques et 48 QCM d’évaluation.',

  sources: 'le cours PRESENTATION DE COURS - ETUDE QUANTITATIVE ET QUALITATIVE.pptx, le Guide de Rédaction de Mémoire Professionnel (CDP Sup), les ouvrages d’Alan Bryman (Social Research Methods) et de Laurence Bardin (L’Analyse de Contenu)',

  chapters: chapitres.map(chapitre => ({ n: chapitre.n, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapitres);
  }
};

module.exports = course;
