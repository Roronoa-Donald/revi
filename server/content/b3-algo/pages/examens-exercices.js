/**
 * Pages « examens » et « exercices » du cours « Algorithmique B3 ».
 */
'use strict';

const { ic, crumb, box } = require('../../../../scripts/course-kit');
const { chnav, disclaimer } = require('./helpers');

/* ======================== Examens Blancs ======================== */

function examens(course) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Examens blancs' }
  ]);

  const body = [
    crumbs,
    '  <h1>Examens Blancs &amp; Épreuves Corrigées d’Algorithmique B3</h1>',
    '  <p class="lead">Deux épreuves d’évaluation complètes conformes aux standards universitaires de niveau Bachelor 3 / Licence 3 en informatique fondamentale.</p>',
    '',
    '  <h2>Épreuve 1 : Contrôle Continu (CC) — Durée 1 h 30 (Barème sur 20 points)</h2>',
    box('standard', 'Sujet du Contrôle Continu — Complexité, Théorème Maître, ABR &amp; Tas', [
      '<h4>Partie 1 : Notations Asymptotiques &amp; Théorème Maître (6 points)</h4>',
      '<ol>',
      '  <li>Soit un algorithme récursif de division pour régner vérifiant l’équation $T(n) = 4 \\cdot T(n / 2) + \\Theta(n)$. Déterminez sa complexité asymptotique $\\Theta$ en détaillant l’application du Théorème Maître. (3 pts)</li>',
      '  <li>Classez par ordre croissant de croissance asymptotique pour $n \\to \\infty$ les fonctions suivantes : $n^2$, $2^n$, $n \\log n$, $\\sqrt{n}$, $n!$, $\\log^2 n$. Justifiez brièvement. (3 pts)</li>',
      '</ol>',
      '<h4>Partie 2 : Arbres Binaires de Recherche (ABR) (7 points)</h4>',
      '<p>On insère successivement dans un ABR initialement vide la séquence de clés entières : <code>[40, 20, 60, 10, 30, 50, 70, 25]</code>.</p>',
      '<ol>',
      '  <li>Dessinez l’arbre obtenu et donnez la séquence de ses nœuds selon un parcours infixe (in-order). Quelle propriété fondamentale vérifie cette séquence ? (3 pts)</li>',
      '  <li>Décrivez l’opération de suppression du nœud de clé 20. Quel nœud devient le remplaçant dans la méthode standard du successeur in-order ? Donnez l’arbre résultant. (4 pts)</li>',
      '</ol>',
      '<h4>Partie 3 : Tas Binaire &amp; Tri par Tas (7 points)</h4>',
      '<p>Soit le tableau 1D : <code>A = [4, 10, 3, 5, 1, 9]</code>.</p>',
      '<ol>',
      '  <li>Expliquez pourquoi ce tableau ne vérifie pas la propriété de Tas-Max. À quel indice se situe la première violation parent/fils ? (2 pts)</li>',
      '  <li>Exécutez pas à pas l’algorithme de <em>Heapify</em> ascendant (tamisage de bas en haut). Donnez le tableau après construction du Tas-Max. (3 pts)</li>',
      '  <li>Combien d’échanges au total sont nécessaires pour extraire le maximum racine lors de la première étape de Heapsort ? (2 pts)</li>',
      '</ol>'
    ].join('\n')),
    '',
    box('solution', 'Corrigé type &amp; Barème détaillé du Contrôle Continu', [
      '<h4>Corrigé Partie 1 (6 points)</h4>',
      '<ul>',
      '  <li><strong>Théorème Maître (3 pts) :</strong> On a $a = 4$, $b = 2$, $d = 1$. L’exposant critique est $c = \\log_b(a) = \\log_2(4) = 2$. Comme $c = 2 &gt; d = 1$, nous sommes dans le <strong>Cas 1</strong> où le travail des feuilles domine le coût de découpage. Conclusion : $T(n) = \\Theta(n^{\\log_2 4}) = \\Theta(n^2)$.</li>',
      '  <li><strong>Classement asymptotique (3 pts) :</strong> $\\log^2 n \\prec \\sqrt{n} \\prec n \\log n \\prec n^2 \\prec 2^n \\prec n!$. Les logarithmes sont dominés par les puissances sous-linéaires, elles-mêmes dominées par les quasi-linéaires, puis quadratiques, exponentielles et enfin factorielles.</li>',
      '</ul>',
      '<h4>Corrigé Partie 2 (7 points)</h4>',
      '<ul>',
      '  <li><strong>ABR &amp; Infixe (3 pts) :</strong> Racine = 40. Fils gauche = 20 (qui a pour enfants 10 et 30, et 30 a 25 à gauche), fils droit = 60 (avec 50 et 70). Parcours infixe : <code>10, 20, 25, 30, 40, 50, 60, 70</code>. Propriété : la suite est strictement croissante, ce qui valide formellement la propriété d’ABR.</li>',
      '  <li><strong>Suppression du nœud 20 (4 pts) :</strong> Le nœud 20 possède deux enfants (10 à gauche, 30 à droite). Son successeur in-order est le minimum de son sous-arbre droit, soit 25. On remplace la valeur 20 par 25, puis on supprime la feuille 25 de l’ancien emplacement. L’arbre reste parfaitement équilibré pour l’infixe.</li>',
      '</ul>',
      '<h4>Corrigé Partie 3 (7 points)</h4>',
      '<ul>',
      '  <li><strong>Propriété de Tas (2 pts) :</strong> Indice 0 (valeur 4) a pour fils gauche 1 (10) et fils droit 2 (3). Comme $4 &lt; 10$, la condition $A[i] \\ge A[2i+1]$ est violée dès $i = 0$.</li>',
      '  <li><strong>Heapify pas à pas (3 pts) :</strong> Pour $n = 6$, on tamise depuis $i = (6//2)-1 = 2$ vers 0. $i=2$ (valeur 3) compare avec fils gauche $2\\cdot 2+1 = 5$ (valeur 9) : échange 3 et 9 $\\Rightarrow [4, 10, 9, 5, 1, 3]$. $i=1$ (10) avec 5 et 1 : pas de changement. $i=0$ (4) compare avec 10 et 9 : plus grand = 10, échange 4 et 10 $\\Rightarrow [10, 4, 9, 5, 1, 3]$. Puis tamisage descendant de 4 à l’indice 1 avec fils 5 et 1 : échange 4 et 5 $\\Rightarrow [10, 5, 9, 4, 1, 3]$. Le tas-max final est <code>[10, 5, 9, 4, 1, 3]</code>.</li>',
      '  <li><strong>Extraction (2 pts) :</strong> Échange racine 10 avec dernier élément 3 $\\Rightarrow [3, 5, 9, 4, 1, 10]$ (1 échange). Tamisage descendant de 3 sur la taille résiduelle 5 : comparé à 5 et 9, échange avec 9 (1 échange). Total = 2 échanges.</li>',
      '</ul>'
    ].join('\n')),
    '',
    '  <h2>Épreuve 2 : Examen Final (EF) — Durée 2 h 00 (Barème sur 20 points)</h2>',
    box('standard', 'Sujet de l’Examen Final — Graphes, Plus Courts Chemins &amp; Programmation Dynamique', [
      '<h4>Partie 1 : Théorie des Graphes &amp; Kruskal (6 points)</h4>',
      '<p>Soit un graphe non orienté connexe à 5 sommets $V = \\{A, B, C, D, E\\}$ et les arêtes pondérées :<br>' +
      '<code>(A-B: 3), (A-C: 1), (B-C: 4), (B-D: 2), (C-D: 5), (C-E: 6), (D-E: 2)</code>.</p>',
      '<ol>',
      '  <li>Déroulez l’algorithme de Kruskal avec la structure Union-Find. Indiquez précisément pour chaque arête examinée si elle est acceptée ou rejetée (en justifiant le cycle évité). (4 pts)</li>',
      '  <li>Quel est le poids total de l’arbre couvrant minimal (MST) obtenu ? Combien d’arêtes contient-il nécessairement ? (2 pts)</li>',
      '</ol>',
      '<h4>Partie 2 : Plus Courts Chemins &amp; Algorithme de Dijkstra (7 points)</h4>',
      '<p>Soit le graphe orienté à sommets $S = \\{S, A, B, C, T\\}$ avec la source $S$. Les arcs sont :<br>' +
      '<code>S-&gt;A: 4, S-&gt;B: 2, B-&gt;A: 1, B-&gt;C: 5, A-&gt;C: 1, A-&gt;T: 6, C-&gt;T: 2</code>.</p>',
      '<ol>',
      '  <li>Exécutez pas à pas l’algorithme de Dijkstra en détaillant l’état du tableau des distances et l’ensemble des sommets finalisés à chaque itération. (4 pts)</li>',
      '  <li>Reconstituez le plus court chemin pour atteindre la cible $T$ ainsi que son coût total. (2 pts)</li>',
      '  <li>Pourquoi l’algorithme de Dijkstra échouerait-il si l’arc $B \\to A$ avait un poids négatif de $-5$ ? Quel algorithme faudrait-il substituer ? (1 pt)</li>',
      '</ol>',
      '<h4>Partie 3 : Programmation Dynamique — Sac à Dos 0/1 (7 points)</h4>',
      '<p>On dispose d’un sac de capacité maximale $W = 7$ kg et de 4 objets :<br>' +
      '- Objet 1 : poids 2 kg, valeur 6 €<br>' +
      '- Objet 2 : poids 3 kg, valeur 10 €<br>' +
      '- Objet 3 : poids 4 kg, valeur 12 €<br>' +
      '- Objet 4 : poids 5 kg, valeur 16 €</p>',
      '<ol>',
      '  <li>Écrivez l’équation de récurrence de Bellman pour le calcul de $dp[i][w]$. Précisez les cas de base. (3 pts)</li>',
      '  <li>Remplissez la matrice $dp$ pour $i \\in [0..4]$ et $w \\in [0..7]$. Donnez la valeur maximale atteignable. (2 pts)</li>',
      '  <li>Reconstituez la combinaison exacte des objets sélectionnés pour obtenir cette valeur maximale. (2 pts)</li>',
      '</ol>'
    ].join('\n')),
    '',
    box('solution', 'Corrigé type &amp; Barème détaillé de l’Examen Final', [
      '<h4>Corrigé Partie 1 (6 points)</h4>',
      '<ul>',
      '  <li><strong>Kruskal (4 pts) :</strong> Tri des arêtes : (A-C: 1), (B-D: 2), (D-E: 2), (A-B: 3), (B-C: 4), (C-D: 5), (C-E: 6).<br>' +
      '    - A-C: 1 $\\to$ Acceptée. Ensembles : {A, C}, {B}, {D}, {E}.<br>' +
      '    - B-D: 2 $\\to$ Acceptée. Ensembles : {A, C}, {B, D}, {E}.<br>' +
      '    - D-E: 2 $\\to$ Acceptée. Ensembles : {A, C}, {B, D, E}.<br>' +
      '    - A-B: 3 $\\to$ Acceptée. Fusion {A, B, C, D, E} (1 seule composante).<br>' +
      '    - B-C: 4 $\\to$ Rejetée (cycle A-B-C-A).<br>' +
      '    - C-D: 5 et C-E: 6 $\\to$ Rejetées (tous les sommets déjà connectés).</li>',
      '  <li><strong>Bilan MST (2 pts) :</strong> Poids total = $1 + 2 + 2 + 3 = 8$. Dans un graphe à $|V| = 5$ sommets, un arbre couvrant contient obligatoirement $|V| - 1 = 4$ arêtes.</li>',
      '</ul>',
      '<h4>Corrigé Partie 2 (7 points)</h4>',
      '<ul>',
      '  <li><strong>Dijkstra pas à pas (4 pts) :</strong> Initialisation : $d[S]=0$, tous les autres $\\infty$. Sommets finalisés : $\\emptyset$.<br>' +
      '    - Étape 1 : min = S (0). Voisins : A (4), B (2). Finalisé : {S}.<br>' +
      '    - Étape 2 : min = B (2). Voisins : A via B ($2+1=3 &lt; 4$), C ($2+5=7$). Finalisé : {S, B}.<br>' +
      '    - Étape 3 : min = A (3). Voisins : C via A ($3+1=4 &lt; 7$), T ($3+6=9$). Finalisé : {S, B, A}.<br>' +
      '    - Étape 4 : min = C (4). Voisins : T via C ($4+2=6 &lt; 9$). Finalisé : {S, B, A, C}.<br>' +
      '    - Étape 5 : min = T (6). Finalisé : {S, B, A, C, T}.</li>',
      '  <li><strong>Chemin vers T (2 pts) :</strong> En remontant les prédécesseurs : $T \\leftarrow C \\leftarrow A \\leftarrow B \\leftarrow S$. Le chemin optimal est <code>S -&gt; B -&gt; A -&gt; C -&gt; T</code> pour une distance totale de 6.</li>',
      '  <li><strong>Limites de Dijkstra (1 pt) :</strong> Dijkstra repose sur le principe glouton qu’une distance finalisée ne peut plus décroître. Avec un poids négatif, relâcher un sommet ultérieur pourrait invalider les distances déjà fixées. Il faut utiliser l’algorithme de <strong>Bellman-Ford</strong> (complexité $O(|V|\\cdot|E|)$).</li>',
      '</ul>',
      '<h4>Corrigé Partie 3 (7 points)</h4>',
      '<ul>',
      '  <li><strong>Équation de Bellman (3 pts) :</strong> $dp[i][w] = dp[i-1][w]$ si $w &lt; p_i$. Sinon $dp[i][w] = \\max(dp[i-1][w], dp[i-1][w - p_i] + v_i)$. Cas de base : $dp[0][w] = 0$ pour tout $w \\in [0..W]$.</li>',
      '  <li><strong>Matrice DP (2 pts) :</strong> Pour $w=7$ : avec objet 1 (2kg, 6€) : 6. Avec objet 2 (3kg, 10€) : à $w=5$, $10+6=16$. Avec objet 3 (4kg, 12€) : à $w=7$, $\\max(16, dp[2][3]+12) = \\max(16, 10+12) = 22$. Avec objet 4 (5kg, 16€) : à $w=7$, $\\max(22, dp[3][2]+16) = \\max(22, 6+16) = 22$. Valeur maximale = <strong>22 €</strong>.</li>',
      '  <li><strong>Reconstruction (2 pts) :</strong> À $i=4, w=7$, $dp[4][7] == dp[3][7] = 22$ (on ne prend pas l’objet 4). À $i=3, w=7$, $dp[3][7] (22) \\neq dp[2][7] (16)$, donc on prend l’<strong>Objet 3</strong> (4kg, 12€). Capacité résiduelle : $7 - 4 = 3$ kg. À $i=2, w=3$, $dp[2][3] (10) \\neq dp[1][3] (6)$, donc on prend l’<strong>Objet 2</strong> (3kg, 10€). Capacité résiduelle : $3 - 3 = 0$ kg. Objets choisis : <strong>Objet 2 et Objet 3</strong> (Poids total = 7 kg, Valeur = 22 €).</li>',
      '</ul>'
    ].join('\n')),
    '',
    chnav({ href: 'formules.html', label: 'Mémento des formules' }, { href: 'exercices.html', label: 'Catalogue des 18 exercices' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/examens.html': {
      title: 'Examens blancs — ' + course.brand,
      description: 'Examens blancs d’Algorithmique B3 : Contrôle Continu et Examen Final avec énoncés, corrigés détaillés et barèmes.',
      active: 'examens',
      body
    }
  };
}

/* ======================== Catalogue des Exercices ======================== */

function exercices(course, chapterList) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Exercices pratiques' }
  ]);

  const rawExos = require('../../../exercises/b3-algo');

  const chaptersHtml = chapterList.map(ch => {
    const list = rawExos.filter(e => e.chapter === ch.n);
    const items = list.map(e => [
      '    <div class="card card--compact">',
      '      <div class="card__head">',
      '        <span class="badge badge--dark">' + e.id + '</span>',
      '        <span class="badge">' + e.level.toUpperCase() + '</span>',
      '      </div>',
      '      <h4 class="card__title">' + e.title + '</h4>',
      '      <p class="card__desc">' + e.goal + '</p>',
      '      <div class="card__foot">',
      '        <a class="btn btn--sm" href="chapitre' + ch.n + '.html#exo-' + e.id + '">' + ic('play') + ' Résoudre dans le cours</a>',
      '      </div>',
      '    </div>'
    ].join('\n')).join('\n');

    return [
      '  <h3>Module ' + ch.n + ' — ' + ch.title + '</h3>',
      '  <div class="grid grid-3">' + items + '</div>'
    ].join('\n');
  }).join('\n\n');

  const body = [
    crumbs,
    '  <h1>Catalogue des 18 Exercices de Code en Algorithmique B3</h1>',
    '  <p class="lead">Tous les ateliers pratiques de programmation Python 3 intégrés au cours, classés par niveau de difficulté progressive (Niveau 1 Fondamental, Niveau 2 Intermédiaire, Niveau 3 Avancé).</p>',
    '',
    chaptersHtml,
    '',
    chnav({ href: 'examens.html', label: 'Consulter les examens blancs' }, { href: 'chapitre1.html', label: 'Commencer par le premier exercice' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/exercices.html': {
      title: 'Exercices pratiques — ' + course.brand,
      description: 'Catalogue des 18 exercices de code du cours d’Algorithmique B3 avec objectifs et liens directs vers l’éditeur.',
      active: 'exercices',
      body
    }
  };
}

module.exports = { examens, exercices };
