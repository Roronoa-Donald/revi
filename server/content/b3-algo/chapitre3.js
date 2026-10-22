/**
 * Chapitre 3 du cours « Algorithmique B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  "n": 3,
  "title": "Files de Priorité, Tas Binaires &amp; Tri par Tas (Heapsort)",
  "short": "Tas Binaires &amp; Heapsort",
  "toc": "Structure de tas binaire (Heap), stockage compact en tableau 1D, tamisage ascendant (sift-up) et descendant (sift-down), files de priorité, algorithme Heapify en temps linéaire O(n) et tri par tas (Heapsort) in-place en O(n log n).",
  "time": "≈ 2 h 45 de travail",
  "free": false,
  "lockLabel": "Réservé B3 et plus",
  "situation": "Dans de nombreux systèmes d’exploitation et moteurs temps réel (planificateurs de processus CFS, gestionnaires d’événements discrets, algorithmes de routage réseau), les éléments ne doivent pas être traités dans l’ordre strict de leur arrivée (FIFO), mais selon un niveau d’urgence ou de priorité. Maintenir une liste triée rend l’insertion coûteuse en O(n), tandis qu’une liste non triée rend l’extraction du maximum lente en O(n). Le tas binaire (Binary Heap) résout ce problème avec une élégance structurelle remarquable : un arbre binaire presque complet encodé directement dans un tableau 1D sans aucun pointeur explicite. Ce chapitre étudie la mécanique du tamisage, la construction du tas en temps linéaire O(n), et le tri par tas (Heapsort) qui garantit une complexité optimale en O(n log n) in-place sans mémoire auxiliaire.",
  "objectives": [
    "comprendre la structure d’un arbre binaire presque complet et son encodage arithmétique en tableau 1D ;",
    "définir l’invariant de Tas-Max (Max-Heap) et de Tas-Min (Min-Heap) ;",
    "implémenter les opérations primitives de tamisage : sift-up (ascendant) et sift-down (descendant) ;",
    "concevoir une file de priorité complète offrant insertion et extraction du maximum en O(log n) ;",
    "démontrer pourquoi la construction de tas (Heapify) s’exécute en temps linéaire O(n) et non O(n log n) ;",
    "maîtriser le tri par tas (Heapsort) in-place et quantifier rigoureusement ses permutations."
  ],
  "sections": [
    {
      "title": "Représentation Tabulaire d’un Tas Binaire",
      "html": "<p>Un <strong>tas binaire</strong> est un arbre binaire presque complet : tous les niveaux sont entièrement remplis, sauf éventuellement le dernier qui est rempli de gauche à droite sans trou. Cette régularité permet de stocker l’arbre dans un simple <strong>tableau 1D</strong> indexé à partir de 0.</p>\n<div class=\"grid grid-3\">\n  <div class=\"card\">\n    <h4>Parent d’un nœud</h4>\n    <p>Pour un nœud à l’indice $i &gt; 0$ :<br>    $$\\text{parent}(i) = \\left\\lfloor \\frac{i - 1}{2} \\right\\rfloor$$</p>\n  </div>\n  <div class=\"card\">\n    <h4>Fils gauche</h4>\n    <p>Pour un nœud à l’indice $i$ :<br>    $$\\text{gauche}(i) = 2i + 1$$<br>    (existe si $2i + 1 &lt; n$).</p>\n  </div>\n  <div class=\"card\">\n    <h4>Fils droit</h4>\n    <p>Pour un nœud à l’indice $i$ :<br>    $$\\text{droite}(i) = 2i + 2$$<br>    (existe si $2i + 2 &lt; n$).</p>\n  </div>\n</div>\n<h4>Invariant du Tas-Max</h4>\n<p>Pour tout indice $i &gt; 0$, la clé du parent est supérieure ou égale à celle de ses enfants :<br>$$A[\\text{parent}(i)] \\ge A[i]$$</p>\n<p>Conséquence immédiate : la <strong>racine</strong> située à l’indice 0 détient toujours l’élément maximal du tas, accessible en temps constant $O(1)$.</p>"
    },
    {
      "title": "Tamisage et Opérations sur File de Priorité",
      "html": "<p>Le maintien de l’invariant de tas repose sur deux mouvements fondamentaux :</p>\n<div class=\"grid grid-2\">\n  <div class=\"card\">\n    <h4>Tamisage Ascendant (Sift-Up / Percole-Up)</h4>\n    <p>Lors d’une insertion, on ajoute le nouvel élément à la fin du tableau (indice $n$).     Tant qu’il est plus grand que son parent, on l’échange avec lui en remontant vers la racine.<br>    Complexité : $O(h) = O(\\log n)$ comparaisons et échanges.</p>\n  </div>\n  <div class=\"card\">\n    <h4>Tamisage Descendant (Sift-Down / Percole-Down)</h4>\n    <p>Lors de l’extraction du maximum, on retire $A[0]$, on place le dernier élément $A[n-1]$ à la racine,     puis on le compare à ses deux enfants. On l’échange avec le plus grand des deux tant qu’il est inférieur.<br>    Complexité : $O(h) = O(\\log n)$.</p>\n  </div>\n</div>\n  <div class=\"box box--standard\">\n    <div class=\"box__title\"><svg class=\"ic\" aria-hidden=\"true\" focusable=\"false\"><use href=\"/assets/img/ui-icons.svg#i-info\"></use></svg> Heapify Linéaire en O(n)</div>\n<p>Pour transformer un tableau arbitraire de taille $n$ en un tas-max, on applique <code>sift-down</code> sur tous les nœuds internes de bas en haut, de l’indice $\\lfloor n/2 \\rfloor - 1$ jusqu’à 0.</p>\n<p>Bien qu’un nœud puisse descendre de $\\log n$ niveaux, la majorité des nœuds se situent près des feuilles (où la hauteur résiduelle est faible). La somme géométrique converge :</p>\n<p>$$\\sum_{h=0}^{\\lfloor \\log n \\rfloor} \\frac{n}{2^{h+1}} \\cdot O(h) = O(n)$$</p>\n<p>La construction complète d’un tas se fait donc en temps <strong>linéaire $O(n)$</strong>, ce qui est strictement plus rapide que $n$ insertions successives ($O(n \\log n)$).</p>\n  </div>"
    },
    {
      "title": "Tri par Tas in-place (Heapsort)",
      "html": "<p>L’algorithme Heapsort exploite la structure de tas pour trier un tableau directement en place, sans aucune mémoire auxiliaire ($O(1)$ espace mémoire) :</p>\n<ol>\n  <li><strong>Phase 1 : Construction du tas (Heapify)</strong> : transformation du tableau en Tas-Max en $O(n)$.</li>\n  <li><strong>Phase 2 : Extraction et réduction</strong> : pour $i$ allant de $n-1$ jusqu’à 1 :<br>  - Échanger le maximum $A[0]$ avec le dernier élément non trié $A[i]$ (qui se retrouve à sa place définitive) ;<br>  - Appliquer <code>sift-down</code> sur la racine pour restaurer le tas sur le sous-tableau réduit de taille $i$.</li>\n</ol>\n<p>Complexité globale garantie : <strong>$O(n \\log n)$</strong> dans le meilleur des cas, en moyenne et au pire des cas. Contrairement à Quicksort, Heapsort ne souffre d’aucun pire cas quadratique en $O(n^2)$.</p>"
    }
  ],
  "methodTitle": "Protocole de Gestion d’un Tas Binaire",
  "method": [
    "Calculer systématiquement les indices parent (i-1)//2 et enfants 2*i+1, 2*i+2 avec des opérations entières rapides.",
    "Toujours vérifier que l’indice de l’enfant ne dépasse pas la taille active n du tas avant d’y accéder.",
    "Pour le sift-down, toujours identifier d’abord le plus grand des deux enfants avant de comparer avec le parent.",
    "Ne pas utiliser n insertions successives pour créer un tas : utiliser l’algorithme de Heapify ascendant en O(n).",
    "Dans Heapsort, décrémenter la taille active du tas à chaque itération pour figer les maxima extraits en fin de tableau."
  ],
  "summary": [
    "Un tas binaire est un arbre binaire presque complet stocké sans pointeur dans un tableau 1D.",
    "L’invariant de Tas-Max impose que chaque parent soit supérieur ou égal à ses enfants ; la racine détient le maximum.",
    "L’insertion utilise le tamisage ascendant (sift-up) en O(log n).",
    "L’extraction du maximum utilise le tamisage descendant (sift-down) en O(log n).",
    "La construction d’un tas à partir d’un tableau non ordonné (Heapify) se fait en temps linéaire O(n).",
    "Heapsort trie un tableau en place avec une complexité garantie en O(n log n) et un coût spatial auxiliaire O(1)."
  ],
  "checklist": [
    "Je sais calculer l’indice du père et des deux fils d’un nœud dans un tableau 1D.",
    "Je sais détecter si un tableau satisfait la propriété de Tas-Max.",
    "Je sais dérouler les permutations de sift-up et sift-down sur un exemple.",
    "Je sais expliquer pourquoi Heapify s’exécute en O(n) et non O(n log n).",
    "Je sais décrire le fonctionnement complet de Heapsort in-place.",
    "Je connais la différence entre Tas-Max (extraction de max) et Tas-Min (Dijkstra)."
  ],
  "notions": [
    "Tas binaire presque complet (Binary Heap)",
    "Représentation compacte en tableau 1D (parent, fils)",
    "Invariant de Tas-Max (racine = maximum en O(1))",
    "Tamisage ascendant (sift-up) pour insertion en O(log n)",
    "Tamisage descendant (sift-down) pour extraction en O(log n)",
    "Construction de tas linéaire Heapify en O(n)",
    "Tri par tas (Heapsort) in-place en O(n log n)",
    "File de priorité à clé dynamique (Priority Queue)"
  ],
  "pitfalls": [
    "Confondre un tas binaire avec un ABR : dans un tas, il n’y a pas de relation d’ordre entre le fils gauche et le fils droit.",
    "Oublier de vérifier l’existence du fils droit (2*i + 2 < n) avant de le comparer au fils gauche.",
    "Vouloir chercher un élément arbitraire dans un tas : c’est une opération en O(n) car le tas n’est pas totalement ordonné.",
    "Confondre l’indice du premier nœud non-feuille : pour une taille n, les feuilles commencent dès l’indice floor(n/2)."
  ],
  "questions": [
    {
      "stem": "Dans un tas binaire indexé à 0, quel est l’indice du parent du nœud situé à l’indice 6 ?",
      "opts": [
        "2",
        "3",
        "1",
        "5"
      ],
      "correct": 0,
      "exp": "La formule du parent est (i - 1) // 2. Pour i = 6, (6 - 1) // 2 = 5 // 2 = 2."
    },
    {
      "stem": "Quelle est la complexité temporelle asymptotique pour construire un tas-max à partir d’un tableau non ordonné de n éléments avec Heapify ?",
      "opts": [
        "O(1)",
        "O(log n)",
        "O(n)",
        "O(n log n)"
      ],
      "correct": 2,
      "exp": "Grâce au tamisage descendant de bas en haut (Bottom-up Heapify), la somme géométrique des hauteurs converge vers une complexité linéaire O(n)."
    },
    {
      "stem": "Où se situe le minimum absolu dans un Tas-Max ?",
      "opts": [
        "À la racine indice 0",
        "Nécessairement parmi les feuilles de l’arbre (indices >= n // 2)",
        "Au dernier indice n - 1 obligatoirement",
        "Au fils gauche de la racine"
      ],
      "correct": 1,
      "exp": "Dans un Tas-Max, chaque parent est supérieur à ses descendants. Le minimum ne peut donc pas avoir d’enfants et se trouve obligatoirement parmi les feuilles."
    },
    {
      "stem": "Quelle est la complexité spatiale auxiliaire de l’algorithme Heapsort ?",
      "opts": [
        "O(1)",
        "O(log n)",
        "O(n)",
        "O(n^2)"
      ],
      "correct": 0,
      "exp": "Heapsort effectue tous les tamisages et permutations directement dans le tableau d’origine (in-place), sans allouer de mémoire auxiliaire : complexité spatiale O(1)."
    },
    {
      "stem": "Dans un tableau [90, 50, 70, 40, 60], pourquoi ce tableau ne forme-t-il PAS un Tas-Max valide ?",
      "opts": [
        "90 n’est pas le maximum",
        "Le nœud 50 à l’indice 1 a pour fils droit 60 à l’indice 4, violant 50 >= 60",
        "70 est plus grand que 50",
        "Il manque des éléments"
      ],
      "correct": 1,
      "exp": "À l’indice 1 (valeur 50), son fils droit est à l’indice 2*1 + 2 = 4 (valeur 60). Comme 50 < 60, l’invariant de Tas-Max est violé."
    },
    {
      "stem": "Combien d’échanges au maximum effectue l’opération d’insertion (sift-up) dans un tas contenant 1000 éléments ?",
      "opts": [
        "1 échange",
        "Environ 10 échanges",
        "Environ 500 échanges",
        "1000 échanges"
      ],
      "correct": 1,
      "exp": "La hauteur d’un tas à 1000 éléments est floor(log2(1000)) = 9. L’élément peut au maximum remonter de la feuille à la racine, soit environ 9 à 10 échanges."
    },
    {
      "stem": "Quelle structure de données est couramment utilisée pour implémenter une file de priorité efficace dans les bibliothèques standards (comme heapq en Python) ?",
      "opts": [
        "Une table de hachage",
        "Un tas binaire (Heap)",
        "Une liste simplement chaînée",
        "Une pile LIFO"
      ],
      "correct": 1,
      "exp": "Les modules standard comme heapq en Python ou PriorityQueue en Java utilisent des tas binaires sous forme de tableau 1D."
    },
    {
      "stem": "Quelle propriété de stabilité possède l’algorithme de tri par tas (Heapsort) ?",
      "opts": [
        "Il est stable",
        "Il n’est pas stable car les échanges à longue distance peuvent inverser l’ordre d’éléments égaux",
        "Il est stable uniquement si le tableau est trié à l’envers",
        "Il est récursif pur"
      ],
      "correct": 1,
      "exp": "Heapsort n’est pas un tri stable : les permutations entre la racine et les éléments de queue déplacent des clés égales sans préserver leur ordre initial."
    }
  ],
  "flashcards": [
    { "q": 'Qu’est-ce que « Tas binaire presque complet (Binary Heap) » ?', "a": 'Tas binaire presque complet (Binary Heap)' },
    { "q": 'Qu’est-ce que « Représentation compacte en tableau 1D (parent, fils) » ?', "a": 'Représentation compacte en tableau 1D (parent, fils)' },
    { "q": 'Qu’est-ce que « Invariant de Tas-Max (racine = maximum en O(1)) » ?', "a": 'Invariant de Tas-Max (racine = maximum en O(1))' },
    { "q": 'Qu’est-ce que « Tamisage ascendant (sift-up) pour insertion en O(log n) » ?', "a": 'Tamisage ascendant (sift-up) pour insertion en O(log n)' },
    { "q": 'Qu’est-ce que « Tamisage descendant (sift-down) pour extraction en O(log n) » ?', "a": 'Tamisage descendant (sift-down) pour extraction en O(log n)' },
    { "q": 'Qu’est-ce que « Tri par tas (Heapsort) in-place en O(n log n) » ?', "a": 'Tri par tas (Heapsort) in-place en O(n log n)' },
    { "q": 'Qu’est-ce que « File de priorité à clé dynamique (Priority Queue) » ?', "a": 'File de priorité à clé dynamique (Priority Queue)' },
    {
      "q": "Comment accède-t-on au fils gauche et au fils droit d’un nœud à l’indice i dans un tas binaire ?",
      "a": "Fils gauche : 2*i + 1. Fils droit : 2*i + 2 (dans un tableau indexé à 0)."
    },
    {
      "q": "Quel est l’invariant fondamental d’un Tas-Max ?",
      "a": "Pour tout nœud i > 0, A[parent(i)] >= A[i]. La valeur maximale réside toujours à la racine A[0]."
    },
    {
      "q": "Quelle est la différence d’application entre sift-up et sift-down ?",
      "a": "Sift-up (remontée) s’applique lors d’une insertion en fin de tas. Sift-down (descente) s’applique lors de l’extraction du maximum."
    },
    {
      "q": "Quelle est la complexité temporelle de la construction d’un tas (Heapify) ?",
      "a": "O(n) en temps linéaire grâce au tamisage descendant de bas en haut (contre O(n log n) pour n insertions)."
    },
    {
      "q": "Pourquoi Heapsort est-il avantageux par rapport au Quicksort dans les systèmes critiques ?",
      "a": "Heapsort garantit un pire cas en O(n log n) et une mémoire O(1), alors que Quicksort peut chuter à O(n^2) sur un mauvais pivot."
    },
    {
      "q": "Pourquoi ne peut-on pas chercher une clé arbitraire en O(log n) dans un tas ?",
      "a": "Parce que le tas n’impose aucun ordre entre les deux sous-arbres gauche et droit, imposant un parcours complet en O(n)."
    }
  ],
  "mastery": [
    {
      "cls": "low",
      "text": "Moins de 4/8 : Révisez l’indexation 1D des tas et l’invariant de Tas-Max."
    },
    {
      "cls": "medium",
      "text": "Entre 5/8 et 7/8 : Bonnes bases, revoyez le fonctionnement in-place de Heapsort et la preuve de Heapify en O(n)."
    },
    {
      "cls": "high",
      "text": "8/8 : Parfait ! La mécanique des tas binaires et le tri par tas sont maîtrisés à 100%."
    }
  ]
};
