/**
 * Contenu du cours « Algorithmique B3 » (dossier `b3-algo/`).
 *
 * Les données de ce cours sont mises en page par `scripts/generate-courses.js`
 * (voir `scripts/course-kit.js`) : aucune page n'est écrite à la main ici, et
 * aucune page ne doit être éditée à la main dans le dossier b3-algo/.
 */
'use strict';

const chapitres = [
  ...require('./b3-algo/chapitres-1-3'),
  ...require('./b3-algo/chapitres-4-6')
];

const pages = require('./b3-algo/pages');

const course = {
  id: 'b3-algo',
  slug: 'b3-algo',
  brand: 'Algorithmique B3',
  brandIcon: 'code',

  // Bleu Royal / Indigo 700 / 900 accessible conforme WCAG AAA (7.18:1 / 10.9:1 sur blanc)
  accent: '#1d4ed8',
  accentDeep: '#1e3a8a',
  accentSoft: '#eff6ff',
  accentBorder: '#bfdbfe',

  storeKey: 'b3algo:progress',

  title: 'Algorithmique B3 — Complexité Asymptotique, ABR, Heapsort, Graphes, Dijkstra &amp; Programmation Dynamique',
  description:
    'Formation d’excellence en algorithmique avancée et structures de données pour le Bachelor 3 : ' +
    'analyse asymptotique formelle (Grand O, Omega, Theta), résolution de récurrences de division pour régner ' +
    'par le Théorème Maître (Master Theorem), gestion spatiale de la pile d’appels et prévention des Stack Overflow, ' +
    'arbres binaires de recherche (ABR), parcours infixes, insertions et suppressions avec successeur in-order, ' +
    'arbres équilibrés AVL, tas binaires (Max-Heap) en tableau 1D compact, opérations de tamisage sift-up et sift-down, ' +
    'construction linéaire Heapify en O(n), tri par tas (Heapsort) in-place en O(n log n), ' +
    'modélisation de graphes par listes et matrices d’adjacence, parcours BFS et DFS, arbres couvrants minimaux (MST) ' +
    'par l’algorithme glouton de Kruskal avec structure Union-Find (Disjoint-Set), ' +
    'plus courts chemins à source unique (SSSP) par l’algorithme de Dijkstra avec file de priorité min-heap, ' +
    'analyse des poids négatifs et détection de cycles absorbants avec Bellman-Ford, ' +
    'et programmation dynamique avancée : sous-structure optimale de Bellman, mémoïsation Top-Down vs tabulation Bottom-Up, ' +
    'résolution matricielle du problème du sac à dos 0/1 (Knapsack) et de la plus longue sous-séquence commune (LCS).',
  lead:
    'Maîtrisez les structures de données avancées, la théorie des graphes et les paradigmes d’optimisation algorithmique de niveau Bachelor 3. ' +
    'Six modules approfondis combinant formalisme mathématique, 18 ateliers de programmation interactive en Python 3 et 48 QCM d’évaluation.',

  sources: 'le cours magistral ALGO_B3, l’ouvrage de référence Introduction à l’Algorithmique (Cormen, Leiserson, Rivest, Stein - CLRS) et les standards académiques universitaires de Licence 3 Informatique',

  chapters: chapitres.map(chapitre => ({ n: chapitre.n, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapitres);
  }
};

module.exports = course;
