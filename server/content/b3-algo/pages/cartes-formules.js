/**
 * Pages « cartes » (flashcards) et « formules » (mémento) du cours « Algorithmique B3 ».
 */
'use strict';

const { crumb, cards } = require('../../../../scripts/course-kit');
const { chnav, disclaimer } = require('./helpers');

/* ======================== Cartes Flashcards ======================== */

function cartes(course, chapterList) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Cartes de révision' }
  ]);

  const modules = chapterList.map(ch => ({
    title: 'Module ' + ch.n + ' — ' + ch.short,
    items: ch.flashcards || []
  }));

  const body = [
    crumbs,
    '  <h1>Cartes de Révision &amp; Mémorisation Active en Algorithmique</h1>',
    '  <p class="lead">36 fiches synthétiques pour ancrer durablement les concepts clés : Grand O &amp; Théorème Maître, ABR, Heapsort &amp; Tas, Graphes &amp; Kruskal, Dijkstra et Programmation Dynamique.</p>',
    '',
    cards(modules),
    '',
    chnav({ href: '../sommaire.html', label: 'Sommaire général' }, { href: 'formules.html', label: 'Consulter le mémento des formules' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/cartes.html': {
      title: 'Cartes de révision — ' + course.brand,
      description: 'Flashcards de révision du cours d’Algorithmique B3 : notions clés et définitions des ' + chapterList.length + ' chapitres.',
      active: 'cartes',
      body
    }
  };
}

/* ======================== Formules & Mémento ======================== */

function formules(course) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Formules &amp; Mémento' }
  ]);

  const body = [
    crumbs,
    '  <h1>Mémento des Formules, Invariants &amp; Complexités Algorithmiques</h1>',
    '  <p class="lead">Guide de référence synthétique : notations asymptotiques, théorèmes de récurrence, structures arborescentes, invariants de graphes et équations de Bellman.</p>',
    '',
    '  <h2>1. Hiérarchie des Classes de Complexité Asymptotique</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr><th>Classe</th><th>Nom courant</th><th>Exemple d’algorithme typique</th><th>Comportement pour $N=10^6$</th></tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr><td><code>O(1)</code></td><td>Temps constant</td><td>Accès indexé à un tableau, opération de hachage idéale</td><td>Immédiat (&lt; 1 ns)</td></tr>',
    '      <tr><td><code>O(log n)</code></td><td>Logarithmique</td><td>Recherche dichotomique dans un tableau trié, recherche ABR équilibré</td><td>≈ 20 opérations</td></tr>',
    '      <tr><td><code>O(n)</code></td><td>Linéaire</td><td>Parcours de tableau, recherche séquentielle, recherche de max</td><td>$10^6$ opérations (≈ 1 ms)</td></tr>',
    '      <tr><td><code>O(n log n)</code></td><td>Quasi-linéaire</td><td>Tri fusion (Mergesort), Heapsort, Quicksort (cas moyen)</td><td>≈ $2 \\cdot 10^7$ opérations</td></tr>',
    '      <tr><td><code>O(n^2)</code></td><td>Quadratique</td><td>Tri par insertion, tri à bulles, boucles imbriquées</td><td>$10^{12}$ opérations (inaccessible)</td></tr>',
    '      <tr><td><code>O(2^n)</code></td><td>Exponentiel</td><td>Énumération des sous-ensembles, sac à dos par force brute</td><td>Incalculable pour $N &gt; 60$</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>2. Résolution par le Théorème Maître (Master Theorem)</h2>',
    '  <p>Pour une récurrence de la forme $T(n) = a \\cdot T(n/b) + \\Theta(n^d)$ avec $a \\ge 1, b &gt; 1, d \\ge 0$ et $c = \\log_b(a)$ :</p>',
    '  <table class="table">',
    '    <thead>',
    '      <tr><th>Cas</th><th>Condition sur $c = \\log_b(a)$ et $d$</th><th>Complexité globale $T(n)$</th><th>Exemple classique</th></tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr><td><strong>Cas 1</strong></td><td>$c &gt; d$ (feuilles dominantes)</td><td>$\\Theta(n^{\\log_b a})$</td><td>Karatsuba ($a=3, b=2, d=1 \\Rightarrow \\Theta(n^{1.58})$), Strassen ($a=7, b=2, d=2 \\Rightarrow \\Theta(n^{2.81})$)</td></tr>',
    '      <tr><td><strong>Cas 2</strong></td><td>$c = d$ (équilibre parfait)</td><td>$\\Theta(n^d \\log n)$</td><td>Tri fusion ($a=2, b=2, d=1 \\Rightarrow \\Theta(n \\log n)$), Recherche dicho ($a=1, b=2, d=0 \\Rightarrow \\Theta(\\log n)$)</td></tr>',
    '      <tr><td><strong>Cas 3</strong></td><td>$c &lt; d$ (racine dominante)</td><td>$\\Theta(n^d)$</td><td>Algorithme à travail extérieur prédominant ($a=2, b=2, d=2 \\Rightarrow \\Theta(n^2)$)</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>3. Structures de Données Avancées &amp; Coûts des Opérations</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr><th>Structure</th><th>Recherche</th><th>Insertion</th><th>Suppression</th><th>Espace mémoire</th></tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr><td><strong>Tableau non trié</strong></td><td>$O(n)$</td><td>$O(1)$ amorti</td><td>$O(n)$</td><td>$O(n)$</td></tr>',
    '      <tr><td><strong>Tableau trié</strong></td><td>$O(\\log n)$</td><td>$O(n)$</td><td>$O(n)$</td><td>$O(n)$</td></tr>',
    '      <tr><td><strong>ABR équilibré (AVL/Rouge-Noir)</strong></td><td>$O(\\log n)$</td><td>$O(\\log n)$</td><td>$O(\\log n)$</td><td>$O(n)$</td></tr>',
    '      <tr><td><strong>Tas Binaire (File de priorité)</strong></td><td>$O(n)$ ($O(1)$ pour le max)</td><td>$O(\\log n)$ (sift-up)</td><td>$O(\\log n)$ (sift-down)</td><td>$O(n)$ in-place</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>4. Algorithmes sur les Graphes</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr><th>Algorithme</th><th>Objectif</th><th>Type de graphe</th><th>Complexité temporelle</th></tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr><td><strong>BFS (Largeur)</strong></td><td>Plus court chemin non pondéré, connectivité</td><td>Orienté ou non, sans poids</td><td>$O(|V| + |E|)$</td></tr>',
    '      <tr><td><strong>DFS (Profondeur)</strong></td><td>Tri topologique, détection de cycles, composantes</td><td>Orienté ou non</td><td>$O(|V| + |E|)$</td></tr>',
    '      <tr><td><strong>Kruskal (MST)</strong></td><td>Arbre couvrant de poids minimum</td><td>Non orienté, pondéré (Union-Find)</td><td>$O(|E| \\log |E|)$</td></tr>',
    '      <tr><td><strong>Dijkstra</strong></td><td>Plus courts chemins depuis source unique</td><td>Pondéré avec poids strictement positifs $\\ge 0$</td><td>$O((|V| + |E|) \\log |V|)$</td></tr>',
    '      <tr><td><strong>Bellman-Ford</strong></td><td>Plus courts chemins et détection cycles négatifs</td><td>Pondéré avec poids quelconques</td><td>$O(|V| \\cdot |E|)$</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>5. Principes de Programmation Dynamique</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr><th>Problème</th><th>Sous-structure optimale</th><th>Équation de récurrence (Bellman)</th><th>Complexité</th></tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr><td><strong>Escalier / Fibonacci</strong></td><td>$dp[i]$ dépend des marches précédentes</td><td>$dp[i] = dp[i-1] + dp[i-2]$</td><td>Temps $O(n)$, Espace $O(1)$</td></tr>',
    '      <tr><td><strong>Sac à dos 0/1</strong></td><td>Choix binaire d’inclure ou rejeter l’objet $i$</td><td>$dp[i][w] = \\max(dp[i-1][w], dp[i-1][w-p_i] + v_i)$</td><td>Temps $O(n \\cdot W)$, Espace $O(n \\cdot W)$</td></tr>',
    '      <tr><td><strong>LCS (Sous-séquence)</strong></td><td>Alignement ou report du préfixe maximal</td><td>$dp[i][j] = dp[i-1][j-1]+1$ si $s_1[i]==s_2[j]$ sinon $\\max$</td><td>Temps $O(m \\cdot n)$, Espace $O(m \\cdot n)$</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    chnav({ href: 'cartes.html', label: 'Flashcards de révision' }, { href: 'examens.html', label: 'Passer aux examens blancs' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/formules.html': {
      title: 'Formules &amp; Mémento — ' + course.brand,
      description: 'Mémento d’Algorithmique B3 : notations asymptotiques, Théorème Maître, ABR, Heapsort, Kruskal, Dijkstra et programmation dynamique.',
      active: 'formules',
      body
    }
  };
}

module.exports = { cartes, formules };
