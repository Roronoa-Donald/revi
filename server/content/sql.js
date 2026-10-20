/**
 * Contenu du cours « SQL » B2 (dossier `sql/`).
 *
 * Les données de ce cours sont mises en page par `scripts/generate-courses.js`
 * (voir `scripts/course-kit.js`) : aucune page n'est écrite à la main ici, et
 * aucune page ne doit être éditée à la main dans le dossier sql/.
 */
'use strict';

const chapitres = [
  ...require('./sql/chapitres-1-3'),
  ...require('./sql/chapitres-4-6')
];

const pages = require('./sql/pages');

const course = {
  id: 'sql',
  slug: 'sql',
  brand: 'SQL B2',
  brandIcon: 'database',

  // Bleu 700 / Bleu 800 accessible conforme WCAG AA (6.55:1 / 8.52:1 sur blanc)
  accent: '#1d4ed8',
  accentDeep: '#1e40af',
  accentSoft: '#eff6ff',
  accentBorder: '#bfdbfe',

  storeKey: 'b2sql:progress',

  title: 'SQL B2 — Modélisation Relationnelle, Transactions ACID &amp; Optimisation de Requêtes',
  description:
    'Cours complet de SQL et Systèmes de Gestion de Bases de Données (SGBD) niveau B2 : ' +
    'modélisation relationnelle formelle, DDL et contraintes d’intégrité (PRIMARY KEY composite, FOREIGN KEY, CASCADE, CHECK), ' +
    'manipulation des données (DML), logique tri-valuée et traitement rigoureux des valeurs NULL (COALESCE, IFNULL), ' +
    'jointures avancées (INNER, LEFT, RIGHT, FULL, CROSS, SELF JOIN), sous-requêtes corrélées (EXISTS, NOT EXISTS) et expressions CASE WHEN, ' +
    'agrégation poussée (GROUP BY, HAVING) et fonctions analytiques de fenêtrage (OVER, ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD), ' +
    'transactions ACID, anomalies de concurrence, verrous partagés/exclusifs et détection de deadlocks, et ' +
    'programmabilité serveur (vues simples et matérialisées, triggers BEFORE/AFTER avec NEW et OLD) et optimisation par index B-Tree et analyse EXPLAIN.',
  lead:
    'Passez de la simple requête d’extraction à l’ingénierie des bases de données relationnelles. ' +
    'Six chapitres d’expertise technique pour concevoir des schémas irréprochables, orchestrer des transactions concurrentes sans faille ' +
    'et optimiser vos requêtes sur des volumes massifs.',

  sources: 'le cours de SGBD et SQL B2, la spécification ANSI/ISO SQL:2003, les documentations PostgreSQL et MySQL InnoDB, et les travaux d’Edgar F. Codd',

  chapters: chapitres.map(chapitre => ({ n: chapitre.n, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapitres);
  }
};

module.exports = course;
