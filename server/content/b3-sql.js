/**
 * Contenu du cours « SQL Avancé B3 » (dossier `b3-sql/`).
 *
 * Les données de ce cours sont mises en page par `scripts/generate-courses.js`
 * (voir `scripts/course-kit.js`) : aucune page n'est écrite à la main ici, et
 * aucune page ne doit être éditée à la main dans le dossier b3-sql/.
 */
'use strict';

const chapitres = [
  ...require('./b3-sql/chapitres-1-3'),
  ...require('./b3-sql/chapitres-4-6')
];

const pages = require('./b3-sql/pages');

const course = {
  id: 'b3-sql',
  slug: 'b3-sql',
  brand: 'SQL Avancé B3',
  brandIcon: 'database',

  // Bleu Cobalt sobre conforme WCAG AA/AAA (8.44:1 / 15.68:1 sur blanc)
  accent: '#1e40af',
  accentDeep: '#172554',
  accentSoft: '#eff6ff',
  accentBorder: '#bfdbfe',

  storeKey: 'b3sql:progress',

  title: 'SQL Avancé B3 — Théorie Relationnelle, Transactions ACID, Indexation B-Tree/GIN/BRIN, Plans EXPLAIN CBO, Fenêtrage &amp; Partitionnement',
  description:
    'Formation d’excellence en ingénierie de bases de données relationnelles et optimisation SQL avancée pour le Bachelor 3 : ' +
    'théorie transactionnelle et isolation ACID (niveaux Read Committed, Repeatable Read, Serializable, anomalies ANSI de Dirty Read à Write Skew, verrouillage 2PL et détection de verrous mortels Deadlock), ' +
    'structures physiques de stockage et indexation de pointe (B-Tree n-aire, pages physiques et tuples Heap, Fill Factor, Index Coverage Index-Only Scan, index GIN inversés pour JSONB/Full-Text et index BRIN pour Big Data ordonné), ' +
    'analyse approfondie des plans d’exécution EXPLAIN (ANALYZE, BUFFERS) et optimiseur par les coûts CBO (nœuds Seq Scan, Index Scan, Bitmap Heap Scan, algorithmes de jointure Nested Loop, Hash Join, Merge Join, mémoire work_mem et dérives de cardinalité pg_statistic), ' +
    'fonctions de fenêtrage analytiques (clauses OVER avec PARTITION BY et ORDER BY, fonctions ROW_NUMBER, RANK, DENSE_RANK, décalages temporels LAG et LEAD, cadrage ROWS/RANGE BETWEEN et requêtes hiérarchiques récursives WITH RECURSIVE avec anti-boucle), ' +
    'programmation procédurale PL/pgSQL, déclencheurs (Triggers) d’audit immuables avec pseudo-variables NEW/OLD, sécurité au niveau de la ligne Row-Level Security (RLS) multi-tenant et défense absolue contre les injections SQL, ' +
    'et partitionnement déclaratif horizontal (stratégies RANGE, LIST, HASH, élagage Partition Pruning statique et dynamique, journalisation WAL Write-Ahead Logging, checkpoints, réplication en streaming synchrone/asynchrone, audit du lag LSN et haute disponibilité).',
  lead:
    'Maîtrisez l’ingénierie des bases de données de production : isolation ACID, indexation avancée B-Tree/GIN/BRIN, tuning EXPLAIN CBO, fenêtrage analytique, sécurité RLS et partitionnement scalable. ' +
    'Six modules approfondis combinant rigueur mathématique relationnelle, 18 ateliers de code interactifs en Python 3 et 48 QCM d’évaluation.',

  sources: 'Standards ANSI/ISO SQL:2016, Documentation officielle PostgreSQL 16, RFC et Guides d’optimisation DBA PostgreSQL',

  chapters: chapitres.map(chapitre => ({ n: chapitre.n, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapitres);
  }
};

module.exports = course;
