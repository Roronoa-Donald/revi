/**
 * Chapitre 4 du cours « Algorithmique B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  "n": 4,
  "title": "Algorithmes Gloutons &amp; Théorie des Graphes",
  "short": "Graphes &amp; Algorithmes Gloutons",
  "toc": "Modélisation des graphes, représentations par listes et matrices d’adjacence, parcours en largeur (BFS) et profondeur (DFS), principe de choix glouton, arbre couvrant minimal (MST) et algorithme de Kruskal avec structure Union-Find.",
  "time": "≈ 2 h 45 de travail",
  "free": false,
  "lockLabel": "Réservé B3 et plus",
  "situation": "Réseaux de télécommunications, cartographie routière GPS, topologies de clusters distribués, dépendances de paquets logiciels ou réseaux sociaux : la majorité des problèmes complexes du monde réel se modélisent naturellement sous forme de graphes $G = (V, E)$. Comment concevoir un réseau optique reliant un ensemble de métropoles au coût minimal absolu de déploiement de fibre ? L’approche par force brute consistant à évaluer tous les arbres couvrants possibles se heurte à la formule de Cayley ($n^{n-2}$ arbres pour $n$ sommets), faisant exploser le calcul même pour 20 villes. Le paradigme glouton (Greedy Approach) démontre qu’en prenant à chaque étape le choix localement optimal, on peut converger avec une preuve mathématique rigoureuse vers l’optimum global. Ce chapitre étudie la théorie des graphes, les parcours d’exploration et l’algorithme de Kruskal avec la structure Union-Find.",
  "objectives": [
    "modéliser formellement des topologies sous forme de graphes orientés ou non orientés, pondérés ou non ;",
    "comparer les représentations en mémoire : matrice d’adjacence $O(|V|^2)$ vs liste d’adjacence $O(|V| + |E|)$ ;",
    "maîtriser le parcours en largeur (BFS) avec file FIFO pour trouver la plus courte distance en nombre d’arêtes ;",
    "maîtriser le parcours en profondeur (DFS) avec pile LIFO pour la détection de cycles et les composantes connexes ;",
    "comprendre le principe du choix glouton et la propriété de sous-structure optimale ;",
    "implémenter l’algorithme de Kruskal avec une structure de données Union-Find pour trouver l’Arbre Couvrant Minimal (MST)."
  ],
  "sections": [
    {
      "title": "Représentation des Graphes en Mémoire",
      "html": "<p>Un graphe $G = (V, E)$ est constitué d’un ensemble de sommets (vertices) $V$ et d’un ensemble d’arêtes ou arcs (edges) $E$. Selon la densité du graphe, le choix de la structure de données est déterminant :</p>\n<div class=\"grid grid-2\">\n  <div class=\"card\">\n    <h4>Matrice d’Adjacence</h4>\n    <ul>\n      <li>Matrice booléenne ou pondérée de dimensions $|V| \\times |V|$.</li>\n      <li><strong>Espace mémoire :</strong> $\\Theta(|V|^2)$, indépendant du nombre d’arêtes.</li>\n      <li><strong>Test d’adjacence $(u, v)$ :</strong> Temps immédiat $O(1)$.</li>\n      <li><strong>Itérer sur les voisins :</strong> Temps $\\Theta(|V|)$.</li>\n      <li>Idéal pour les <em>graphes denses</em> où $|E| \\approx |V|^2$.</li>\n    </ul>\n  </div>\n  <div class=\"card\">\n    <h4>Liste d’Adjacence</h4>\n    <ul>\n      <li>Tableau ou dictionnaire associant à chaque sommet la liste de ses voisins directs.</li>\n      <li><strong>Espace mémoire :</strong> $\\Theta(|V| + |E|)$.</li>\n      <li><strong>Test d’adjacence $(u, v)$ :</strong> Temps $O(\\text{deg}(u))$.</li>\n      <li><strong>Itérer sur les voisins :</strong> Temps $O(\\text{deg}(u))$.</li>\n      <li>Structure standard par excellence pour les <em>graphes creux</em> où $|E| \\ll |V|^2$.</li>\n    </ul>\n  </div>\n</div>"
    },
    {
      "title": "Parcours de Graphes : BFS vs DFS",
      "html": "<p>L’exploration exhaustive d’un graphe repose sur deux démarches fondamentales en complexité $O(|V| + |E|)$ :</p>\n<div class=\"grid grid-2\">\n  <div class=\"card\">\n    <h4>Parcours en Largeur (Breadth-First Search - BFS)</h4>\n    <p>Utilise une <strong>file FIFO</strong>. Explore d’abord tous les voisins à distance 1, puis à distance 2, etc.<br>    <strong>Propriété clé :</strong> Calcule la distance minimale en nombre d’arêtes depuis la source.<br>    Permet de trouver le plus court chemin dans tout graphe non pondéré.</p>\n  </div>\n  <div class=\"card\">\n    <h4>Parcours en Profondeur (Depth-First Search - DFS)</h4>\n    <p>Utilise une <strong>pile LIFO</strong> (ou récursion). S’enfonce le plus loin possible le long d’une branche avant de rebrousser chemin.<br>    <strong>Propriétés clés :</strong> Détection de cycles, calcul des composantes fortement connexes (Tarjan, Kosaraju) et tri topologique d’un DAG.</p>\n  </div>\n</div>"
    },
    {
      "title": "Arbre Couvrant Minimal (MST) et Algorithme de Kruskal",
      "html": "<p>Dans un graphe connexe non orienté pondéré, un <strong>Arbre Couvrant Minimal (Minimum Spanning Tree - MST)</strong> est un sous-graphe aciclique reliant l’ensemble des $|V|$ sommets avec exactement $|V| - 1$ arêtes, de manière à minimiser la somme des poids de ces arêtes.</p>\n  <div class=\"box box--standard\">\n    <div class=\"box__title\"><svg class=\"ic\" aria-hidden=\"true\" focusable=\"false\"><use href=\"/assets/img/ui-icons.svg#i-info\"></use></svg> L’Algorithme Glouton de Kruskal</div>\n<ol>\n  <li>Trier toutes les arêtes de $E$ par poids croissant.</li>\n  <li>Initialiser chaque sommet dans sa propre composante disjointe (forêt de $|V|$ arbres isolés).</li>\n  <li>Parcourir les arêtes triées : pour chaque arête $(u, v)$ de poids $w$ :<br>  - Si $u$ et $v$ appartiennent à des composantes distinctes : ajouter l’arête au MST et fusionner les deux composantes.<br>  - Sinon : rejeter l’arête car elle formerait un cycle.</li>\n  <li>S’arrêter dès que le MST contient $|V| - 1$ arêtes.</li>\n</ol>\n<p><strong>Structure Union-Find (Disjoint-Set) :</strong> avec la compression de chemin et l’union par rang, les opérations <code>find</code> et <code>union</code> s’exécutent en temps quasi constant $O(\\alpha(|V|))$ (où $\\alpha$ est la fonction inverse d’Ackermann, $\\alpha(n) \\le 4$ pour toute échelle réaliste).<br>La complexité totale de Kruskal est dominée par le tri initial : <strong>$O(|E| \\log |E|)$</strong>.</p>\n  </div>"
    }
  ],
  "methodTitle": "Protocole de Résolution de Problèmes sur les Graphes",
  "method": [
    "Choisir impérativement la liste d’adjacence pour modéliser le graphe afin d’éviter l’écueil quadratique O(|V|^2).",
    "Pour trouver un chemin le plus court non pondéré, utiliser sans hésitation BFS avec une file FIFO.",
    "Toujours marquer les sommets visités dans un ensemble ou un tableau booléen dès l’enfilement pour éviter les boucles infinies.",
    "Pour Kruskal, normaliser les arêtes (u < v) pour faciliter le dédoublonnage et le tri lexicographique.",
    "Implémenter Union-Find avec compression de chemin pour garantir un temps quasi constant lors des tests de cycle.",
    "Vérifier que le graphe est connexe avant d’affirmer qu’un arbre couvrant complet existe."
  ],
  "summary": [
    "Les listes d’adjacence sont la représentation optimale pour les graphes creux avec un espace en O(|V| + |E|).",
    "Le parcours BFS utilise une file FIFO et trouve le plus court chemin en nombre d’arêtes.",
    "Le parcours DFS utilise une pile LIFO et permet la détection de cycles et le tri topologique.",
    "Un algorithme glouton fait à chaque pas le choix localement optimal pour construire l’optimum global.",
    "L’algorithme de Kruskal construit l’Arbre Couvrant Minimal (MST) en triant les arêtes et en évitant les cycles.",
    "La structure Union-Find teste l’appartenance et fusionne des composantes en temps quasi constant O(alpha(n))."
  ],
  "checklist": [
    "Je sais convertir une liste d’arêtes en liste d’adjacence et en matrice.",
    "Je sais calculer le degré d’un sommet pour un graphe orienté (entrant/sortant) et non orienté.",
    "Je sais implémenter BFS avec deque en Python.",
    "Je sais reconstituer le chemin trouvé par BFS à l’aide du dictionnaire des précurseurs.",
    "Je connais le principe de la structure Union-Find (find et union).",
    "Je sais énoncer le théorème de Cayley donnant le nombre d’arbres couvrants (n^(n-2))."
  ],
  "notions": [
    "Graphe orienté vs non orienté et fonction de pondération",
    "Liste d’adjacence O(|V| + |E|) vs Matrice d’adjacence O(|V|^2)",
    "Parcours en largeur (BFS) et file FIFO",
    "Plus court chemin en nombre d’arêtes",
    "Parcours en profondeur (DFS) et pile LIFO",
    "Arbre Couvrant Minimal (MST - Minimum Spanning Tree)",
    "Algorithme glouton de Kruskal en O(|E| log |E|)",
    "Structure Union-Find avec compression de chemin"
  ],
  "pitfalls": [
    "Utiliser DFS pour chercher le plus court chemin dans un graphe : DFS peut explorer un chemin très long avant de trouver la cible.",
    "Oublier de vérifier si les deux sommets d’une arête sont déjà dans le même ensemble lors de Kruskal (création de cycle).",
    "Allouer une matrice d’adjacence de 100 000 x 100 000 sommets : cela saturerait instantanément la RAM (10 Go de mémoire).",
    "Confondre arête non orientée (symétrique u-v et v-u) et arc orienté (direction stricte u -> v)."
  ],
  "questions": [
    {
      "stem": "Combien d’arêtes comporte obligatoirement un arbre couvrant minimal d’un graphe connexe ayant 12 sommets ?",
      "opts": [
        "10 arêtes",
        "11 arêtes",
        "12 arêtes",
        "13 arêtes"
      ],
      "correct": 1,
      "exp": "Dans tout arbre à |V| sommets, le nombre d’arêtes est strictement égal à |V| - 1. Pour 12 sommets, un arbre couvrant compte obligatoirement 11 arêtes."
    },
    {
      "stem": "Quel est l’espace mémoire requis par une liste d’adjacence pour représenter un graphe à |V| sommets et |E| arêtes ?",
      "opts": [
        "O(1)",
        "O(|V|)",
        "O(|V| + |E|)",
        "O(|V|^2)"
      ],
      "correct": 2,
      "exp": "Une liste d’adjacence alloue une entrée pour chaque sommet et stocke chaque arête (une fois pour un graphe orienté, deux fois pour un non-orienté), soit un coût en O(|V| + |E|)."
    },
    {
      "stem": "Quel parcours garantit de trouver le chemin avec le nombre minimal d’arêtes entre deux sommets dans un graphe non pondéré ?",
      "opts": [
        "Parcours en profondeur (DFS)",
        "Parcours en largeur (BFS)",
        "Tri topologique",
        "Algorithme de Kruskal"
      ],
      "correct": 1,
      "exp": "Le parcours BFS explore les sommets par couches de distance croissante (0 arête, puis 1 arête, puis 2 arêtes...). Le premier chemin atteignant la cible est obligatoirement minimal."
    },
    {
      "stem": "Quelle est la complexité temporelle globale de l’algorithme de Kruskal sur un graphe G = (V, E) ?",
      "opts": [
        "O(|V|)",
        "O(|E| log |E|)",
        "O(|V|^3)",
        "O(2^{|V|})"
      ],
      "correct": 1,
      "exp": "Kruskal commence par trier toutes les arêtes par poids, ce qui coûte O(|E| log |E|). Les opérations Union-Find s’exécutant ensuite en O(|E| * alpha(|V|)), le tri domine la complexité."
    },
    {
      "stem": "Que se passe-t-il si l’on applique l’algorithme de Kruskal sur un graphe comportant deux composantes connexes disjointes ?",
      "opts": [
        "L’algorithme plante avec une erreur de division par zéro",
        "Il génère une forêt couvrante minimale (un arbre couvrant par composante)",
        "Il connecte artificiellement les deux composantes",
        "Il rejette toutes les arêtes"
      ],
      "correct": 1,
      "exp": "Kruskal va connecter tous les sommets connectables au sein de chaque composante, formant ainsi une forêt couvrante minimale (Minimum Spanning Forest) avec moins de |V|-1 arêtes."
    },
    {
      "stem": "Pourquoi l’optimisation de compression de chemin (Path Compression) est-elle cruciale dans Union-Find ?",
      "opts": [
        "Elle évite d’allouer de la mémoire",
        "Elle aplatit la structure arborescente pour que chaque nœud pointe directement vers la racine représentative",
        "Elle trie les sommets par ordre alphabétique",
        "Elle supprime les cycles du graphe"
      ],
      "correct": 1,
      "exp": "Lors de l’appel à find(x), la compression de chemin rattache tous les ancêtres traversés directement à la racine, réduisant la hauteur de l’arbre à presque 1 pour les accès ultérieurs."
    },
    {
      "stem": "Dans un graphe dense où |E| est proche de |V|^2, quelle structure de données peut s’avérer plus rapide pour tester l’existence d’une arête spécifique ?",
      "opts": [
        "La matrice d’adjacence",
        "La liste d’adjacence",
        "La pile LIFO",
        "L’arbre binaire de recherche"
      ],
      "correct": 0,
      "exp": "Une matrice d’adjacence permet de tester si (u, v) existe en un accès mémoire immédiat O(1), contre O(deg(u)) dans une liste d’adjacence."
    },
    {
      "stem": "Quel autre algorithme glouton célèbre résout le problème de l’arbre couvrant minimal en faisant croître un arbre unique depuis un sommet arbitraire ?",
      "opts": [
        "L’algorithme de Dijkstra",
        "L’algorithme de Prim",
        "L’algorithme de Bellman-Ford",
        "L’algorithme de Floyd-Warshall"
      ],
      "correct": 1,
      "exp": "L’algorithme de Prim résout le MST en partant d’un sommet initial et en ajoutant à chaque étape l’arête de poids minimal reliant l’arbre courant à un sommet extérieur."
    }
  ],
  "flashcards": [
    {
      "q": "Quelle est la différence d’espace mémoire entre une matrice d’adjacence et une liste d’adjacence ?",
      "a": "La matrice d’adjacence consomme toujours O(|V|^2) d’espace, tandis que la liste d’adjacence ne consomme que O(|V| + |E|)."
    },
    {
      "q": "Quel conteneur de données est utilisé par le parcours BFS et pourquoi ?",
      "a": "Une file FIFO (First In, First Out) pour explorer les sommets par cercles concentriques de distance croissante."
    },
    {
      "q": "Combien d’arêtes contient un arbre couvrant d’un graphe connexe de |V| sommets ?",
      "a": "Exactement |V| - 1 arêtes sans aucun cycle."
    },
    {
      "q": "Quel est le principe de l’algorithme de Kruskal ?",
      "a": "Trier toutes les arêtes par poids croissant et les ajouter une à une au MST si elles ne créent pas de cycle (contrôlé par Union-Find)."
    },
    {
      "q": "Quel est le rôle de la structure Union-Find ?",
      "a": "Maintenir des ensembles disjoints de sommets pour vérifier en temps quasi instantané O(alpha(n)) si deux sommets sont déjà connectés."
    },
    {
      "q": "Pourquoi dit-on que Kruskal est un algorithme glouton ?",
      "a": "Parce qu’il choisit à chaque étape l’arête disponible de poids minimal sans jamais remettre en cause ses choix passés."
    }
  ],
  "mastery": [
    {
      "cls": "low",
      "text": "Moins de 4/8 : Révisez la modélisation par liste d’adjacence et le parcours BFS."
    },
    {
      "cls": "medium",
      "text": "Entre 5/8 et 7/8 : Bonnes bases, revoyez le déroulement de Kruskal et le rôle d’Union-Find."
    },
    {
      "cls": "high",
      "text": "8/8 : Parfait ! La théorie des graphes et les algorithmes gloutons sont solidement acquis."
    }
  ]
};
