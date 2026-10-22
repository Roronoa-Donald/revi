/**
 * Chapitre 5 du cours « Algorithmique B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  "n": 5,
  "title": "Plus Courts Chemins &amp; Algorithme de Dijkstra",
  "short": "Plus Courts Chemins &amp; Dijkstra",
  "toc": "Problème des plus courts chemins à source unique (SSSP), opération fondamentale de relâchement d’arc (relaxation), algorithme de Dijkstra avec file de priorité min-heap, limitation stricte aux poids positifs et comparaison avec l’algorithme de Bellman-Ford face aux cycles absorbants.",
  "time": "≈ 2 h 45 de travail",
  "free": false,
  "lockLabel": "Réservé B3 et plus",
  "situation": "Des protocoles de routage Internet fondamentaux comme OSPF (Open Shortest Path First) et IS-IS jusqu’aux calculateurs d’itinéraires routiers GPS (OpenStreetMap, Google Maps), la recherche du plus court chemin dans un réseau pondéré est l’un des problèmes algorithmiques les plus exécutés au monde. Comment déterminer la route optimale entre une source et toutes les destinations dans un graphe de millions d’arcs en quelques fractions de seconde ? Publié en 1959 par Edsger W. Dijkstra, l’algorithme éponyme résout ce défi avec une élégance théorique fondée sur le principe glouton et l’opération élémentaire de relâchement d’arc (relaxation). Ce chapitre dissèque l’algorithme de Dijkstra, son implémentation optimale avec file de priorité min-heap, et analyse ses limites fondamentales face aux poids négatifs en introduisant l’algorithme de Bellman-Ford.",
  "objectives": [
    "formaliser le problème du plus court chemin à source unique (Single-Source Shortest Paths - SSSP) ;",
    "comprendre l’opération fondamentale de relâchement d’arc (Edge Relaxation) et la propriété de sous-chemin optimal ;",
    "implémenter l’algorithme de Dijkstra avec une file de priorité Tas-Min (heapq) en complexité $O((|V| + |E|) \\log |V|)$ ;",
    "reconstituer le chemin optimal complet grâce à la table des prédécesseurs ;",
    "démontrer pourquoi l’algorithme de Dijkstra échoue mathématiquement en présence d’arcs de poids négatif ;",
    "comprendre le fonctionnement de l’algorithme de Bellman-Ford et sa capacité à détecter les cycles absorbants."
  ],
  "sections": [
    {
      "title": "Le Problème SSSP et le Principe de Relâchement",
      "html": "<p>Soit un graphe orienté pondéré $G = (V, E)$ muni d’une fonction de poids $w : E \\to \\mathbb{R}$. Le coût d’un chemin $p = \\langle v_0, v_1, \\dots, v_k \\rangle$ est la somme des poids de ses arcs : $$w(p) = \\sum_{i=1}^k w(v_{i-1}, v_i)$$</p>\n<p>La <strong>distance minimale</strong> $\\delta(s, v)$ entre la source $s$ et un sommet $v$ est l’infimum des coûts de tous les chemins reliant $s$ à $v$.</p>\n  <div class=\"box box--standard\">\n    <div class=\"box__title\"><svg class=\"ic\" aria-hidden=\"true\" focusable=\"false\"><use href=\"/assets/img/ui-icons.svg#i-info\"></use></svg> L’Opération Fondamentale de Relâchement (Relaxation)</div>\n<p>Pour chaque sommet $v$, on maintient une estimation de sa distance minimale $d[v]$ (initialisée à $\\infty$, sauf $d[s] = 0$), et son prédécesseur $\\pi[v]$ sur le chemin courant.</p>\n<p>Le <strong>relâchement</strong> d’un arc $(u, v)$ de poids $w(u, v)$ consiste à tester si le passage par $u$ permet d’améliorer la distance connue vers $v$ :</p>\n<pre><code>si d[u] != inf et d[u] + w(u, v) &lt; d[v]:\n    d[v] = d[u] + w(u, v)\n    pi[v] = u</code></pre>\n<p>Cette opération est <em>monotone décroissante</em> : $d[v]$ ne fait que diminuer et ne peut jamais descendre en dessous de la distance optimale réelle $\\delta(s, v)$.</p>\n  </div>"
    },
    {
      "title": "L’Algorithme de Dijkstra avec File de Priorité",
      "html": "<p>L’algorithme de Dijkstra maintient un ensemble de sommets $S$ dont la distance minimale est définitivement établie. À chaque étape, il choisit de manière gloutonne le sommet $u ∉ S$ ayant la plus petite distance estimée $d[u]$ :</p>\n<ol>\n  <li><strong>Initialisation :</strong> $d[s] = 0$, $d[v] = \\infty$ pour tout $v ≠ s$. File de priorité $Q$ initialisée avec $(0, s)$.</li>\n  <li><strong>Boucle principale :</strong> Tant que la file $Q$ n’est pas vide :<br>  - Extraire le sommet $u$ ayant la distance $d[u]$ minimale.<br>  - Si $u$ a déjà été finalisé, ignorer.<br>  - Ajouter $u$ aux sommets finalisés.<br>  - Pour chaque voisin $v$ de $u$, relâcher l’arc $(u, v)$. Si la distance est améliorée, insérer $(d[v], v)$ dans la file de priorité $Q$.</li>\n</ol>\n<p><strong>Complexité :</strong> Avec un Tas Binaire (Min-Heap), l’extraction du minimum prend $O(\\log |V|)$ et chaque relâchement prend $O(\\log |V|)$. Pour $|V|$ sommets et $|E|$ arcs, la complexité totale est : <strong>$O((|V| + |E|) \\log |V|)$</strong>. Dans un réseau routier creux ($|E| = O(|V|)$), elle est quasi-linéaire en $O(|V| \\log |V|)$.</p>"
    },
    {
      "title": "Limites de Dijkstra et Algorithme de Bellman-Ford",
      "html": "<p>La preuve de correction de Dijkstra repose entièrement sur l’hypothèse que <strong>tous les poids sont positifs ou nuls ($w(e) \\ge 0$)</strong>. Dès qu’un arc a un poids négatif, cette garantie gloutonne s’effondre :</p>\n<div class=\"grid grid-2\">\n  <div class=\"card\">\n    <h4>Échec de Dijkstra sur Poids Négatifs</h4>\n    <p>Considérons le graphe : $S \\to A$ (poids 4), $S \\to B$ (poids 2), $B \\to A$ (poids -5).<br>    Dijkstra finalise $B$ (distance 2), puis finalise $A$ (distance 4). Il ne mettra jamais à jour $A$ via $B$     car $A$ est déjà marqué comme finalisé, alors que le chemin $S \\to B \\to A$ coûte $2 + (-5) = -3 &lt; 4$ !</p>\n  </div>\n  <div class=\"card\">\n    <h4>Algorithme de Bellman-Ford</h4>\n    <p>Bellman-Ford s’affranchit de cette restriction en relâchant <em>tous les arcs</em> de $E$ exactement $|V| - 1$ fois.<br>    <strong>Complexité :</strong> $O(|V| \\cdot |E|)$.<br>    <strong>Détection de cycles absorbants :</strong> Une $|V|$-ième passe de relâchement permet de détecter si un cycle négatif existe.</p>\n  </div>\n</div>"
    }
  ],
  "methodTitle": "Protocole d’Application des Algorithmes de Plus Court Chemin",
  "method": [
    "Vérifier d’abord si les poids des arcs sont strictement positifs : si oui, utiliser obligatoirement Dijkstra.",
    "Si des poids négatifs existent, écarter immédiatement Dijkstra et adopter Bellman-Ford.",
    "Utiliser le module standard heapq en Python pour implémenter la file de priorité sous forme de tuples (distance, sommet).",
    "Gérer un dictionnaire visited ou un ensemble de sommets traités pour éviter de retraiter les entrées périmées dans la file.",
    "Mettre à jour rigoureusement le dictionnaire des prédécesseurs parent[v] = u à chaque relâchement réussi.",
    "Pour reconstituer le chemin vers la destination, remonter la chaîne des prédécesseurs depuis la cible jusqu’à la source."
  ],
  "summary": [
    "Le problème SSSP cherche la distance minimale depuis une source vers tous les sommets accessibles d’un graphe.",
    "Le relâchement d’un arc (u, v) met à jour d[v] si d[u] + w(u, v) < d[v].",
    "L’algorithme de Dijkstra résout SSSP en O((|V| + |E|) log |V|) à l’aide d’une file de priorité Tas-Min.",
    "Dijkstra exige impérativement des poids positifs ou nuls sous peine de produire des résultats erronés.",
    "Bellman-Ford fonctionne avec des poids négatifs en temps O(|V| * |E|) et détecte les cycles absorbants.",
    "Un cycle absorbant (cycle négatif) fait tendre la distance minimale vers -l’infini, rendant le problème indéfini."
  ],
  "checklist": [
    "Je sais expliquer le fonctionnement d’une opération de relâchement.",
    "Je sais dérouler pas à pas l’algorithme de Dijkstra sur un graphe d’exemple.",
    "Je sais utiliser heapq pour manipuler la file de priorité en Python.",
    "Je sais reconstituer la chaîne de sommets menant à la cible avec le dictionnaire parent.",
    "Je sais construire un contre-exemple démontrant l’échec de Dijkstra sur des poids négatifs.",
    "Je comprends pourquoi Bellman-Ford exécute |V| - 1 passes de relaxation."
  ],
  "notions": [
    "Problème du plus court chemin à source unique (SSSP)",
    "Opération de relâchement d’arc (Edge Relaxation)",
    "Invariant de sous-chemin optimal",
    "Algorithme de Dijkstra avec file de priorité min-heap",
    "Complexité de Dijkstra en O((|V| + |E|) log |V|)",
    "Table des prédécesseurs et reconstruction de chemin",
    "Algorithme de Bellman-Ford en O(|V| * |E|)",
    "Détection de cycle absorbant (cycle négatif)"
  ],
  "pitfalls": [
    "Appliquer Dijkstra sur un graphe comportant des poids négatifs : l’algorithme termine mais produit des distances fausses.",
    "Oublier de vérifier si le sommet extrait de la file a déjà été finalisé (problème des doublons de clé dans heapq).",
    "Initialiser la distance de la source à float(\"inf\") au lieu de 0.",
    "Confondre le coût minimal d’un chemin avec le nombre d’arêtes (ce dernier ne s’applique qu’aux graphes non pondérés via BFS)."
  ],
  "questions": [
    {
      "stem": "Quelle est la complexité temporelle asymptotique de l’algorithme de Dijkstra utilisant un tas binaire (Min-Heap) ?",
      "opts": [
        "O(|V|^2)",
        "O((|V| + |E|) log |V|)",
        "O(|V| * |E|)",
        "O(|V|^3)"
      ],
      "correct": 1,
      "exp": "Chaque sommet est extrait du tas en O(log |V|) et chaque arc entraîne au maximum une insertion en O(log |V|), ce qui donne O((|V| + |E|) log |V|)."
    },
    {
      "stem": "Pourquoi l’algorithme de Dijkstra exige-t-il des poids strictement positifs ou nuls ?",
      "opts": [
        "Pour éviter la division par zéro",
        "Parce qu’il suppose qu’une fois la distance d’un sommet finalisée, elle ne pourra plus jamais être réduite",
        "Parce que les ordinateurs ne savent pas stocker d’entiers négatifs",
        "Pour limiter le nombre de sommets"
      ],
      "correct": 1,
      "exp": "Dijkstra est un algorithme glouton : dès qu’un sommet est extrait avec la distance minimale courante, il est figé définitivement. Un arc négatif ultérieur pourrait violer cette hypothèse."
    },
    {
      "stem": "Quelle est l’opération fondamentale exécutée pour chaque arc sortant dans Dijkstra et Bellman-Ford ?",
      "opts": [
        "La division euclidienne",
        "Le relâchement d’arc (relaxation)",
        "La compression de chemin",
        "La rotation AVL"
      ],
      "correct": 1,
      "exp": "Le relâchement (relaxation) consiste à tester si passer par l’arc courant permet de découvrir un chemin plus court vers le sommet d’arrivée."
    },
    {
      "stem": "Combien de passes de relaxation de tous les arcs l’algorithme de Bellman-Ford effectue-t-il au total ?",
      "opts": [
        "1 passe",
        "|V| passes",
        "|V| - 1 passes",
        "|E| passes"
      ],
      "correct": 2,
      "exp": "Dans un graphe sans cycle négatif, un plus court chemin simple comporte au maximum |V| - 1 arcs. Il suffit donc de relâcher tous les arcs |V| - 1 fois."
    },
    {
      "stem": "Comment détecte-t-on la présence d’un cycle absorbant (cycle négatif) avec Bellman-Ford ?",
      "opts": [
        "Si la file de priorité déborde",
        "Si une |V|-ième passe supplémentaire de relaxation parvient encore à réduire la distance d’au moins un sommet",
        "Si la somme des degrés est impaire",
        "Si le graphe est non orienté"
      ],
      "correct": 1,
      "exp": "Après |V|-1 passes, toutes les distances des chemins simples sont figées. Si un arc peut encore être relâché à la |V|-ième passe, c’est qu’il appartient à un cycle absorbant infini."
    },
    {
      "stem": "Quel protocole de routage réseau dynamique utilise directement l’algorithme de Dijkstra pour calculer les tables de routage ?",
      "opts": [
        "BGP",
        "RIP",
        "OSPF (Open Shortest Path First)",
        "DNS"
      ],
      "correct": 2,
      "exp": "Le protocole OSPF (ainsi que IS-IS) est un protocole à état de liens qui utilise l’algorithme de Dijkstra (SPF) pour déterminer le chemin de coût minimal à travers le réseau."
    },
    {
      "stem": "Que vaut la distance d[v] d’un sommet v inaccessible depuis la source s à la fin de l’algorithme de Dijkstra ?",
      "opts": [
        "0",
        "-1",
        "float(\"inf\")",
        "None"
      ],
      "correct": 2,
      "exp": "Initialisée à l’infini (float(\"inf\")), la distance d’un sommet qui ne reçoit aucun chemin depuis la source conserve sa valeur infinie."
    },
    {
      "stem": "Comment reconstitue-t-on le chemin optimal entre la source et la cible à partir du dictionnaire parent généré par Dijkstra ?",
      "opts": [
        "En partant de la source et en tirant au sort les voisins",
        "En partant de la cible et en remontant de parent en parent jusqu’à atteindre None à la source, puis en inversant la liste",
        "En triant les sommets par nom",
        "Ce n’est pas possible"
      ],
      "correct": 1,
      "exp": "Chaque sommet stocke son prédécesseur optimal. On remonte de la destination vers la source, puis on inverse la liste de sommets pour obtenir le chemin dans le bon sens."
    }
  ],
  "flashcards": [
    { "q": 'Qu’est-ce que « Problème du plus court chemin à source unique (SSSP) » ?', "a": 'Problème du plus court chemin à source unique (SSSP)' },
    { "q": 'Qu’est-ce que « Opération de relâchement d’arc (Edge Relaxation) » ?', "a": 'Opération de relâchement d’arc (Edge Relaxation)' },
    { "q": 'Qu’est-ce que « Invariant de sous-chemin optimal » ?', "a": 'Invariant de sous-chemin optimal' },
    { "q": 'Qu’est-ce que « Algorithme de Dijkstra avec file de priorité min-heap » ?', "a": 'Algorithme de Dijkstra avec file de priorité min-heap' },
    { "q": 'Qu’est-ce que « Table des prédécesseurs et reconstruction de chemin » ?', "a": 'Table des prédécesseurs et reconstruction de chemin' },
    { "q": 'Qu’est-ce que « Détection de cycle absorbant (cycle négatif) » ?', "a": 'Détection de cycle absorbant (cycle négatif)' },
    {
      "q": "En quoi consiste le relâchement d’un arc (u, v) avec poids w ?",
      "a": "À tester si d[u] + w < d[v], et si c’est le cas, à mettre à jour d[v] = d[u] + w et parent[v] = u."
    },
    {
      "q": "Quelle est la complexité de l’algorithme de Dijkstra avec un tas binaire ?",
      "a": "O((|V| + |E|) log |V|), ce qui est quasi-linéaire sur les graphes creux où |E| = O(|V|)."
    },
    {
      "q": "Pourquoi l’algorithme de Dijkstra échoue-t-il sur les graphes avec poids négatifs ?",
      "a": "Parce qu’il fige de manière irrévocable la distance d’un sommet extrait du tas, ce qui peut être invalidé par un arc négatif découvert ultérieurement."
    },
    {
      "q": "Quelle est la complexité de l’algorithme de Bellman-Ford ?",
      "a": "O(|V| * |E|), plus lent que Dijkstra mais capable de gérer les poids négatifs et détecter les cycles absorbants."
    },
    {
      "q": "Qu’est-ce qu’un cycle absorbant dans un graphe pondéré ?",
      "a": "Un cycle dont la somme des poids est négative, permettant de réduire indéfiniment la distance en tournant en boucle."
    },
    {
      "q": "Quel est le lien entre le problème SSSP et l’algorithme BFS ?",
      "a": "BFS est l’équivalent exact de Dijkstra dans le cas particulier où tous les arcs ont un poids uniforme égal à 1."
    }
  ],
  "mastery": [
    {
      "cls": "low",
      "text": "Moins de 4/8 : Révisez la notion de relâchement d’arc et les conditions d’application de Dijkstra."
    },
    {
      "cls": "medium",
      "text": "Entre 5/8 et 7/8 : Bonnes bases, revoyez la comparaison avec Bellman-Ford et la détection de cycles négatifs."
    },
    {
      "cls": "high",
      "text": "8/8 : Parfait ! Le calcul des plus courts chemins et l’algorithme de Dijkstra sont parfaitement dominés."
    }
  ]
};
