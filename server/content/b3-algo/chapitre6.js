/**
 * Chapitre 6 du cours « Algorithmique B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  "n": 6,
  "title": "Programmation Dynamique &amp; Optimisation Sous-Structurelle",
  "short": "Programmation Dynamique",
  "toc": "Principe d’optimalité de Bellman, sous-structure optimale, chevauchement de sous-problèmes, mémoïsation descendante (Top-Down) vs tabulation ascendante (Bottom-Up), résolution du problème du sac à dos 0/1 (Knapsack) et plus longue sous-séquence commune (LCS).",
  "time": "≈ 2 h 45 de travail",
  "free": false,
  "lockLabel": "Réservé B3 et plus",
  "situation": "Face à des problèmes d’optimisation combinatoire (sac à dos, alignement de séquences génomiques, multiplication de matrices chaînées), l’exploration naïve de l’espace des solutions mène à une impasse : un algorithme par force brute évalue un nombre exponentiel de configurations ($O(2^n)$ ou $O(n!)$), recalculant des millions de fois exactement les mêmes sous-problèmes identiques. Introduite par Richard Bellman dans les années 1950, la <strong>programmation dynamique</strong> (Dynamic Programming) est l’une des techniques les plus puissantes de l’algorithmique moderne : en stockant les solutions des sous-problèmes résolus dans une table pour ne jamais les recalculer, elle abaisse des complexités exponentielles insolubles à des complexités polynomiales ultra-rapides $O(n^2)$ ou $O(n \\cdot W)$. Ce dernier chapitre explore la modélisation rigoureuse d’équations de récurrence, les deux approches (Top-Down et Bottom-Up) et la reconstruction intégrale de solutions optimales.",
  "objectives": [
    "identifier les deux conditions indispensables à la programmation dynamique : sous-structure optimale et sous-problèmes chevauchants ;",
    "comparer la mémoïsation récursive descendante (Top-Down) et la tabulation itérative ascendante (Bottom-Up) ;",
    "formaliser l’équation de récurrence de Bellman pour un problème d’optimisation sous contrainte ;",
    "résoudre le problème classique du sac à dos 0/1 (Knapsack Problem) avec une matrice DP à deux dimensions ;",
    "implémenter l’algorithme de calcul de la Plus Longue Sous-Séquence Commune (LCS - Longest Common Subsequence) ;",
    "reconstruire la solution optimale en remontant le chemin de décisions dans la table DP."
  ],
  "sections": [
    {
      "title": "Fondements : Sous-Structure Optimale & Chevauchement",
      "html": "<p>Pour qu’un problème puisse être résolu par la programmation dynamique, il doit satisfaire deux critères théoriques fondamentaux :</p>\n<div class=\"grid grid-2\">\n  <div class=\"card\">\n    <h4>1. Sous-Structure Optimale (Optimal Substructure)</h4>\n    <p>Une solution optimale au problème global est composée de solutions optimales à ses sous-problèmes.<br>    <em>Exemple :</em> Si le plus court chemin de $A$ à $C$ passe par $B$, la portion $A \\to B$ est nécessairement le plus court chemin entre $A$ et $B$.</p>\n  </div>\n  <div class=\"card\">\n    <h4>2. Sous-Problèmes Chevauchants (Overlapping Subproblems)</h4>\n    <p>La décomposition récursive produit continuellement les <em>mêmes sous-problèmes</em> encore et encore.<br>    <em>Exemple :</em> Pour calculer $\\text{fib}(5)$, $\\text{fib}(3)$ est réévalué 2 fois, et $\\text{fib}(2)$ 3 fois. Sans mémoire, la complexité explose en $O(2^n)$.</p>\n  </div>\n</div>"
    },
    {
      "title": "Top-Down (Mémoïsation) vs Bottom-Up (Tabulation)",
      "html": "<p>Deux stratégies d’implémentation coexistent en programmation dynamique :</p>\n<div class=\"grid grid-2\">\n  <div class=\"card\">\n    <h4>Mémoïsation Descendante (Top-Down)</h4>\n    <ul>\n      <li>Structure récursive naturelle calquée sur l’énoncé mathématique.</li>\n      <li>On consulte un dictionnaire de cache (ou <code>@functools.lru_cache</code>). Si le résultat existe, on le renvoie immédiatement.</li>\n      <li>Ne calcule que les sous-problèmes strictement nécessaires à la réponse finale.</li>\n      <li><strong>Inconvénient :</strong> Consomme de l’espace sur la pile d’appels récursive.</li>\n    </ul>\n  </div>\n  <div class=\"card\">\n    <h4>Tabulation Ascendante (Bottom-Up)</h4>\n    <ul>\n      <li>Approche itérative sans récursion.</li>\n      <li>On initialise une table (tableau 1D ou matrice 2D) avec les cas de base ($i=0$).</li>\n      <li>On remplit les cases dans un ordre topologique strict jusqu’à atteindre la case finale $dp[n][W]$.</li>\n      <li><strong>Avantages :</strong> Aucun risque de Stack Overflow, excellente localité de cache CPU, optimisation spatiale possible (rolling array).</li>\n    </ul>\n  </div>\n</div>"
    },
    {
      "title": "Problème du Sac à Dos 0/1 (0/1 Knapsack)",
      "html": "<p>On dispose de $n$ objets. Chaque objet $i$ possède un poids $p_i$ et une valeur $v_i$. Le sac peut transporter au maximum une capacité $W$. Chaque objet peut être soit emporté ($1$), soit laissé ($0$).</p>\n  <div class=\"box box--standard\">\n    <div class=\"box__title\"><svg class=\"ic\" aria-hidden=\"true\" focusable=\"false\"><use href=\"/assets/img/ui-icons.svg#i-info\"></use></svg> Équation de Bellman pour le Sac à Dos 0/1</div>\n<p>Soit $dp[i][w]$ la valeur maximale pouvant être obtenue en choisissant parmi les $i$ premiers objets avec une capacité maximale résiduelle $w$ :</p>\n<p>$$dp[i][w] = \\begin{cases} dp[i-1][w] & \\text{si } w &lt; p_i \\quad (\\text{l’objet } i \\text{ est trop lourd}) \\\\ \\max\\left(dp[i-1][w], \\; dp[i-1][w - p_i] + v_i\\right) & \\text{si } w \\ge p_i \\end{cases}$$</p>\n<p><strong>Cas de base :</strong> $dp[0][w] = 0$ pour tout $w \\in [0..W]$ (aucun objet disponible), et $dp[i][0] = 0$ pour tout $i$ (capacité nulle).</p>\n<p><strong>Complexité :</strong> Temps $\\Theta(n \\cdot W)$ et espace $\\Theta(n \\cdot W)$. Cette complexité est dite <em>pseudo-polynomiale</em> car elle dépend de la valeur numérique de la capacité $W$.</p>\n  </div>\n<h4>Reconstruction de la Solution Optimale</h4>\n<p>Une fois la table remplie, la valeur maximale se trouve en $dp[n][W]$. Pour identifier quels objets ont été emportés, on remonte depuis $(n, W)$ :<br>- Si $dp[i][w] == dp[i-1][w]$ : l’objet $i$ n’a pas été sélectionné, on passe à $(i-1, w)$.<br>- Si $dp[i][w] \\neq dp[i-1][w]$ : l’objet $i$ a été emporté ! On l’ajoute à la liste et on passe à $(i-1, w - p_i)$."
    }
  ],
  "methodTitle": "Protocole de Conception d’un Algorithme Dynamique",
  "method": [
    "Caractériser formellement la structure d’une solution optimale sous forme de séquence de choix.",
    "Définir précisément la sémantique de l’état dp[...] (quelles sont les variables d’état nécessaires et suffisantes).",
    "Écrire la relation de récurrence (Bellman) liant l’état courant aux sous-états antérieurs.",
    "Identifier les cas de base indispensables (taille 0, capacité nulle, chaîne vide).",
    "Choisir le sens de remplissage de la table (de gauche à droite, de bas en haut) pour que les dépendances soient déjà calculées.",
    "Reconstituer la solution d’origine en remontant le tableau des décisions si les objets concrets sont demandés."
  ],
  "summary": [
    "La programmation dynamique résout les problèmes d’optimisation présentant sous-structure optimale et sous-problèmes chevauchants.",
    "La mémoïsation (Top-Down) met en cache les résultats récursifs ; la tabulation (Bottom-Up) remplit itérativement une table.",
    "Le problème du sac à dos 0/1 se résout en temps pseudo-polynomial O(n * W) grâce à une matrice DP 2D.",
    "L’alignement de chaînes et le problème LCS se résolvent en O(m * n) en comparant les caractères de fin.",
    "La reconstruction de la solution optimale s’effectue en remontant les états de la table DP depuis la case finale.",
    "L’optimisation spatiale permet souvent de réduire la mémoire de O(n * W) à O(W) en ne conservant que la ligne précédente."
  ],
  "checklist": [
    "Je sais expliquer pourquoi le problème du sac à dos naïf a une complexité exponentielle O(2^n).",
    "Je sais formuler l’équation de récurrence de Bellman pour le sac à dos 0/1.",
    "Je sais remplir à la main une table DP pour un problème d’escalier ou de sac à dos.",
    "Je sais reconstituer la liste des objets choisis en remontant la matrice.",
    "Je comprends pourquoi la complexité O(n * W) est qualifiée de pseudo-polynomiale.",
    "Je sais définir l’équation de récurrence du problème de la plus longue sous-séquence commune (LCS)."
  ],
  "notions": [
    "Principe d’optimalité de Bellman",
    "Propriété de sous-structure optimale",
    "Sous-problèmes chevauchants (Overlapping Subproblems)",
    "Mémoïsation descendante (Top-Down avec cache)",
    "Tabulation ascendante (Bottom-Up itérative)",
    "Problème du sac à dos 0/1 (0/1 Knapsack)",
    "Plus longue sous-séquence commune (LCS)",
    "Reconstruction de la solution optimale par rétro-propagation"
  ],
  "pitfalls": [
    "Confondre sous-séquence (éléments non contigus mais dans l’ordre) et sous-chaîne (éléments strictement contigus).",
    "Oublier de vérifier la contrainte de poids w >= p_i avant de soustraire p_i dans le sac à dos (risque d’indice négatif).",
    "Croire que la programmation dynamique s’applique à tous les problèmes : si la sous-structure n’est pas optimale (ex: plus long chemin sans cycle), DP échoue.",
    "Allouer une matrice DP 2D gigantesque quand seule la dernière ligne est nécessaire (oubli de l’optimisation de rolling array)."
  ],
  "questions": [
    {
      "stem": "Quelles sont les deux conditions fondamentales pour qu’un problème puisse être résolu efficacement par programmation dynamique ?",
      "opts": [
        "Sous-structure optimale et sous-problèmes chevauchants",
        "Graphe sans cycle et arêtes positives",
        "Données triées et division binaire",
        "Arbre binaire et fonction de hachage"
      ],
      "correct": 0,
      "exp": "La programmation dynamique exige formellement une sous-structure optimale (les solutions optimales locales forment la solution globale) et des sous-problèmes chevauchants (évitant le recalcul redondant)."
    },
    {
      "stem": "Quelle est la complexité temporelle asymptotique pour résoudre le problème du sac à dos 0/1 avec n objets et capacité W ?",
      "opts": [
        "O(2^n)",
        "O(n + W)",
        "O(n * W)",
        "O(n^2 * W^2)"
      ],
      "correct": 2,
      "exp": "La matrice DP comporte (n + 1) lignes et (W + 1) colonnes, et chaque cellule est calculée en temps constant O(1), donnant une complexité en Theta(n * W)."
    },
    {
      "stem": "Dans le problème de l’escalier où l’on peut gravir 1 ou 2 marches, que vaut dp[4] si dp[0]=1, dp[1]=1, dp[2]=2, dp[3]=3 ?",
      "opts": [
        "4",
        "5",
        "6",
        "8"
      ],
      "correct": 1,
      "exp": "L’équation est dp[i] = dp[i-1] + dp[i-2]. Donc dp[4] = dp[3] + dp[2] = 3 + 2 = 5."
    },
    {
      "stem": "Quelle est la différence fondamentale entre l’approche Top-Down (mémoïsation) et l’approche Bottom-Up (tabulation) ?",
      "opts": [
        "Top-Down est itératif et Bottom-Up est récursif",
        "Top-Down est récursif avec cache mémoire, alors que Bottom-Up remplit itérativement une table depuis les cas de base",
        "Top-Down ne fonctionne pas en Python",
        "Bottom-Up a une complexité exponentielle"
      ],
      "correct": 1,
      "exp": "Top-Down part du problème final et mémorise les résultats intermédiaires en récursion. Bottom-Up calcule les plus petits cas d’abord et progresse itérativement vers le résultat global."
    },
    {
      "stem": "Comment reconstruit-on la liste des objets emportés dans le sac à dos 0/1 après remplissage de la table DP ?",
      "opts": [
        "En prenant tous les objets de valeur maximale",
        "En remontant depuis dp[n][W] et en observant si dp[i][w] != dp[i-1][w] pour détecter que l’objet i a été inclus",
        "En effectuant un tri par tas des objets",
        "En appliquant l’algorithme de Dijkstra"
      ],
      "correct": 1,
      "exp": "Si dp[i][w] diffère de dp[i-1][w], c’est que le choix d’inclure l’objet i a produit un gain supérieur au fait de le rejeter. On retient l’objet i et on décrémente la capacité de son poids."
    },
    {
      "stem": "Quelle est la longueur de la plus longue sous-séquence commune (LCS) entre \"ABCD\" et \"ACDF\" ?",
      "opts": [
        "1",
        "2",
        "3 (\"ACD\")",
        "4"
      ],
      "correct": 2,
      "exp": "Les lettres A, C, D apparaissent dans cet ordre dans les deux chaînes, formant la sous-séquence commune maximale \"ACD\" de longueur 3."
    },
    {
      "stem": "Pourquoi qualifie-t-on la complexité O(n * W) du sac à dos de \"pseudo-polynomiale\" ?",
      "opts": [
        "Parce qu’elle est fausse en pratique",
        "Parce qu’elle est polynomiale en la valeur de W, mais exponentielle par rapport au nombre de bits nécessaires pour coder W",
        "Parce qu’elle utilise des nombres complexes",
        "Parce qu’elle n’est valable que pour n = 2"
      ],
      "correct": 1,
      "exp": "En théorie de la complexité, la taille de l’entrée d’un entier W est k = log2(W) bits. Le coût est donc en O(n * 2^k), ce qui est exponentiel en fonction de la taille de représentation de W."
    },
    {
      "stem": "Comment peut-on optimiser l’espace mémoire de la table du sac à dos 0/1 si seule la valeur maximale finale est demandée ?",
      "opts": [
        "En ne conservant que les deux dernières lignes (ou un seul tableau 1D parcouru de droite à gauche), réduisant l’espace à O(W)",
        "En compressant avec gzip",
        "En utilisant un graphe de flot",
        "Ce n’est pas possible"
      ],
      "correct": 0,
      "exp": "Comme dp[i][w] ne dépend que de la ligne immédiatement précédente dp[i-1], on peut n’allouer qu’un tableau 1D de taille W + 1 mis à jour de droite à gauche, réduisant la mémoire de O(n * W) à O(W)."
    }
  ],
  "flashcards": [
    {
      "q": "Quelles sont les deux propriétés indispensables pour appliquer la programmation dynamique ?",
      "a": "La sous-structure optimale et la présence de sous-problèmes chevauchants."
    },
    {
      "q": "Quelle est la différence entre mémoïsation (Top-Down) et tabulation (Bottom-Up) ?",
      "a": "La mémoïsation est récursive et stocke les résultats à la volée ; la tabulation est itérative et calcule tous les états depuis les cas de base."
    },
    {
      "q": "Quelle est l’équation de récurrence de Bellman pour le sac à dos 0/1 ?",
      "a": "dp[i][w] = max(dp[i-1][w], dp[i-1][w - p_i] + v_i) si w >= p_i sinon dp[i-1][w]."
    },
    {
      "q": "Quelle est la complexité temporelle et spatiale classique du sac à dos 0/1 ?",
      "a": "Theta(n * W) en temps et Theta(n * W) en mémoire (réductible à O(W) en mémoire)."
    },
    {
      "q": "Quelle est la différence entre sous-séquence et sous-chaîne ?",
      "a": "Les caractères d’une sous-séquence n’ont pas besoin d’être contigus (ex: \"ACE\" dans \"ABCDE\"), contrairement à une sous-chaîne qui doit être contiguë."
    },
    {
      "q": "Comment reconstruit-on les objets choisis à partir de la table du sac à dos ?",
      "a": "On remonte depuis dp[n][W] : si dp[i][w] != dp[i-1][w], l’objet i a été choisi, et on décrémente w de son poids p_i."
    }
  ],
  "mastery": [
    {
      "cls": "low",
      "text": "Moins de 4/8 : Révisez le principe de sous-structure optimale et la différence Top-Down vs Bottom-Up."
    },
    {
      "cls": "medium",
      "text": "Entre 5/8 et 7/8 : Bonnes bases, revoyez la reconstruction optimale du sac à dos 0/1 et de la LCS."
    },
    {
      "cls": "high",
      "text": "8/8 : Parfait ! Vous maîtrisez la programmation dynamique matricielle de niveau Bachelor 3."
    }
  ]
};
