/**
 * Chapitre 1 du cours « Algorithmique B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  "n": 1,
  "title": "Analyse de Complexité, Notations Asymptotiques &amp; Récursivité",
  "short": "Complexité &amp; Récursivité",
  "toc": "Notations asymptotiques O, Omega, Theta, calcul des opérations élémentaires, théorème maître de division pour régner, analyse spatiale de la pile d’appels récursive et détection de stack overflow.",
  "time": "≈ 2 h 45 de travail",
  "free": true,
  "situation": "En ingénierie logicielle d’envergure industrielle, le volume de données traitées peut exploser en passant d’un millier à plusieurs dizaines de millions d’enregistrements. Un algorithme qui s’exécute en quelques millisecondes sur la machine du développeur peut saturer le CPU pendant plusieurs jours s’il possède une complexité quadratique O(n^2), ou même provoquer un arrêt brutal de la JVM ou du runtime Python par dépassement de pile (Stack Overflow) en cas de récursion non maîtrisée. Ce premier chapitre d’Algorithmique B3 formalise les outils mathématiques d’analyse asymptotique : la caractérisation exacte du comportement limite par les notations de Landau (O, Omega, Theta), la résolution analytique systématique des récurrences par le Théorème Maître de division pour régner, et la mesure rigoureuse de l’empreinte mémoire de la pile d’exécution récursive.",
  "objectives": [
    "définir rigoureusement les notions mathématiques de grand O, grand Omega et grand Theta ;",
    "calculer la complexité asymptotique au pire des cas, au meilleur des cas et en moyenne ;",
    "appliquer le Théorème Maître (Master Theorem) pour résoudre toute relation de récurrence T(n) = a*T(n/b) + Theta(n^d) ;",
    "différencier la complexité temporelle de la complexité spatiale auxiliaire ;",
    "analyser le déroulement de la pile d’appels récursive et borner sa profondeur maximale ;",
    "instrumenter et benchmarkez des fonctions Python pour confronter théorie mathématique et temps CPU réel."
  ],
  "sections": [
    {
      "title": "Notations Asymptotiques et Mathématiques du Grand O",
      "html": "<p>L’analyse asymptotique étudie l’évolution des ressources (temps de calcul, mémoire) lorsque la taille de l’entrée $n$ tend vers l’infini ($n \\to +\\infty$). On néglige les constantes multiplicatives et les termes de bas degré pour ne retenir que l’ordre de grandeur dominant.</p>\n<div class=\"grid grid-3\">\n  <div class=\"card\">\n    <h4>Grand O : Majoration Asymptotique</h4>\n    <p><strong>$f(n) = O(g(n))$</strong> s’il existe des constantes $c &gt; 0$ et $n_0$ telles que :<br>    $\\forall n \\ge n_0, \\quad 0 \\le f(n) \\le c \\cdot g(n)$.<br>    Il quantifie le <em>pire des cas</em> (borne supérieure garantie).</p>\n  </div>\n  <div class=\"card\">\n    <h4>Grand $\\Omega$ : Minoration Asymptotique</h4>\n    <p><strong>$f(n) = \\Omega(g(n))$</strong> s’il existe des constantes $c &gt; 0$ et $n_0$ telles que :<br>    $\\forall n \\ge n_0, \\quad 0 \\le c \\cdot g(n) \\le f(n)$.<br>    Il quantifie la <em>borne inférieure</em> théorique.</p>\n  </div>\n  <div class=\"card\">\n    <h4>Grand $\\Theta$ : Encadrement Strict</h4>\n    <p><strong>$f(n) = \\Theta(g(n))$</strong> si et seulement si $f(n) = O(g(n))$ et $f(n) = \\Omega(g(n))$.<br>    Il caractérise l’ordre de grandeur <em>exact</em> de l’algorithme.</p>\n  </div>\n</div>\n<h4>Hiérarchie des classes de complexité fondamentales</h4>\n<p>Par ordre de croissance pour de grands $n$ :<br>$$O(1) \\prec O(\\log n) \\prec O(n) \\prec O(n \\log n) \\prec O(n^2) \\prec O(n^3) \\prec O(2^n) \\prec O(n!)$$</p>\n<p>Pour $n = 10^6$ éléments, un algorithme en $O(\\log_2 n)$ n’exécute qu’environ 20 opérations, alors qu’un algorithme en $O(n^2)$ exécute $10^{12}$ opérations (plusieurs heures de calcul sur un cœur moderne).</p>"
    },
    {
      "title": "Le Théorème Maître de Division pour Régner",
      "html": "<p>Le paradigme « Diviser pour Régner » (Divide and Conquer) résout un problème en le découpant en sous-problèmes plus petits de même nature, en les résolvant récursivement, puis en combinant leurs résultats. Le temps d’exécution satisfait la relation de récurrence :</p>\n<p>$$T(n) = a \\cdot T\\left(\\frac{n}{b}\\right) + \\Theta(n^d)$$</p>\n<p>où :</p>\n<ul>\n  <li><strong>$a \\ge 1$ :</strong> nombre de sous-problèmes résolus récursivement ;</li>\n  <li><strong>$b &gt; 1$ :</strong> facteur de division de la taille d’entrée à chaque niveau ;</li>\n  <li><strong>$\\Theta(n^d)$ :</strong> coût du travail de découpage et de combinaison à chaque étape (avec $d \\ge 0$).</li>\n</ul>\n  <div class=\"box box--standard\">\n    <div class=\"box__title\"><svg class=\"ic\" aria-hidden=\"true\" focusable=\"false\"><use href=\"/assets/img/ui-icons.svg#i-info\"></use></svg> Les Trois Cas du Théorème Maître</div>\n<p>On compare l’exposant critique de prolifération <strong>$c = \\log_b(a)$</strong> avec l’exposant de travail local <strong>$d$</strong> :</p>\n<ul>\n  <li><strong>Cas 1 ($c &gt; d$) :</strong> La prolifération des sous-problèmes l’emporte. Le coût est dominé par les feuilles de l’arbre récursif.<br>  $$T(n) = \\Theta\\left(n^{\\log_b a}\\right)$$<br>  <em>Exemple :</em> Multiplication de Karatsuba ($a=3, b=2, d=1 \\Rightarrow c = \\log_2 3 \\approx 1.585 &gt; 1 \\Rightarrow \\Theta(n^{1.58})$).</li>\n  <li><strong>Cas 2 ($c = d$) :</strong> Équilibre parfait entre division et combinaison à tous les niveaux de l’arbre.<br>  $$T(n) = \\Theta\\left(n^d \\log n\\right)$$<br>  <em>Exemple :</em> Tri Fusion (Mergesort) ($a=2, b=2, d=1 \\Rightarrow c = 1 = d \\Rightarrow \\Theta(n \\log n)$) ; Recherche dichotomique ($a=1, b=2, d=0 \\Rightarrow \\Theta(\\log n)$).</li>\n  <li><strong>Cas 3 ($c &lt; d$) :</strong> Le travail de découpage/combinaison à la racine domine la charge totale.<br>  $$T(n) = \\Theta\\left(n^d\\right)$$<br>  <em>Exemple :</em> Algorithme découpant en 2 problèmes de demi-taille avec prétraitement quadratique ($a=2, b=2, d=2 \\Rightarrow c=1 &lt; 2 \\Rightarrow \\Theta(n^2)$).</li>\n</ul>\n  </div>"
    },
    {
      "title": "Empreinte Spatiale et Gestion de la Pile Récursive",
      "html": "<p>Chaque appel de fonction empile un cadre de pile (<em>stack frame</em>) contenant ses paramètres, ses variables locales et l’adresse de retour. Si la profondeur de récursion devient trop grande, l’espace alloué à la pile d’exécution (généralement 1 Mo à 8 Mo selon le système) est saturé, déclenchant une exception irrécupérable de type <code>RecursionError</code> en Python ou <code>java.lang.StackOverflowError</code>.</p>\n<div class=\"grid grid-2\">\n  <div class=\"card\">\n    <h4>Récursion Linéaire</h4>\n    <p>Une fonction s’appelle une seule fois par niveau (ex: factorielle, recherche dichotomique).     La profondeur maximale de pile est $O(n)$ ou $O(\\log n)$.<br>    Peut souvent être optimisée par récursion terminale (<em>tail recursion</em>) ou transformée en simple boucle <code>while</code>.</p>\n  </div>\n  <div class=\"card\">\n    <h4>Récursion Arborescente</h4>\n    <p>Une fonction déclenche plusieurs sous-appels (ex: Fibonacci naïf $f(n) = f(n-1) + f(n-2)$).     Le nombre total d’appels explose exponentiellement en $O(2^n)$,     bien que la profondeur maximale de pile ne soit que de $O(n)$.<br>    Nécessite impérativement de la mémoïsation ou de la programmation dynamique.</p>\n  </div>\n</div>"
    }
  ],
  "methodTitle": "Protocole d’Analyse Formelle d’un Algorithme",
  "method": [
    "Identifier formellement le paramètre n représentatif de la taille de l’entrée (nombre d’éléments, nombre de bits, etc.).",
    "Déterminer l’opération fondamentale ou critique (comparaison de clés, écriture mémoire, produit arithmétique).",
    "Distinguer le pire des cas (worst-case), le meilleur des cas (best-case) et le cas moyen (average-case).",
    "Pour une relation récursive, formaliser T(n) sous la forme a*T(n/b) + f(n) et tester l’applicabilité du Théorème Maître.",
    "Calculer la profondeur maximale de récursion pour valider la complexité spatiale auxiliaire O(prof).",
    "Vérifier empiriquement l’analyse par un profilage en temps réel sur des jeux de données de taille n, 2n, 4n, 8n."
  ],
  "summary": [
    "Le grand O majore asymptotiquement le temps de calcul dans le pire des cas ; le grand Omega le minore ; le grand Theta donne l’ordre de grandeur exact.",
    "La hiérarchie des complexités place O(1) < O(log n) < O(n) < O(n log n) < O(n^2) < O(2^n) < O(n!).",
    "Le Théorème Maître résout les récurrences T(n) = a*T(n/b) + Theta(n^d) en comparant c = log_b(a) à d.",
    "Cas 1 (c > d) : Theta(n^c) dominé par les feuilles. Cas 2 (c == d) : Theta(n^d log n) à l’équilibre. Cas 3 (c < d) : Theta(n^d) dominé par la racine.",
    "La complexité spatiale auxiliaire d’un algorithme récursif est proportionnelle à la profondeur maximale de son arbre d’appels.",
    "Une récursion arborescente sans mémoïsation engendre une redondance massive et une complexité exponentielle."
  ],
  "checklist": [
    "Je sais énoncer les définitions formelles avec quantificateurs de O, Omega et Theta.",
    "Je sais identifier instantanément le cas du Théorème Maître pour le tri fusion et la recherche dichotomique.",
    "Je connais la valeur de log2(3) et log2(7) pour Karatsuba et Strassen.",
    "Je sais calculer la profondeur de pile atteinte par une fonction récursive.",
    "Je sais expliquer pourquoi un algorithme O(2^n) devient impraticable dès n >= 50.",
    "Je sais convertir une récursion linéaire en itération pour éviter tout Stack Overflow."
  ],
  "notions": [
    "Notation de Landau Grand O (borne supérieure)",
    "Notations Grand Omega (borne inférieure) et Grand Theta (encadrement)",
    "Hiérarchie des classes de complexité (O(1) à O(n!))",
    "Théorème Maître de division pour régner (Cas 1, 2 et 3)",
    "Exposant critique de prolifération c = log_b(a)",
    "Cadre de pile d’exécution (Stack Frame)",
    "Dépassement de pile (Stack Overflow)",
    "Complexité spatiale auxiliaire de la récursion"
  ],
  "pitfalls": [
    "Confondre pire des cas et grand O : grand O est un outil mathématique de majoration, le pire des cas est une configuration d’entrée.",
    "Appliquer le Théorème Maître quand b n’est pas constant ou quand a n’est pas constant.",
    "Oublier de compter la mémoire consommée par la pile récursive dans l’analyse spatiale d’un algorithme.",
    "Supposer qu’un algorithme O(n log n) est toujours plus rapide qu’un O(n^2) pour de très petites valeurs de n (ex: n < 10)."
  ],
  "questions": [
    {
      "stem": "Quelle est la complexité temporelle asymptotique au pire des cas de l’algorithme de tri fusion (Mergesort) sur un tableau de taille n ?",
      "opts": [
        "O(n)",
        "O(n log n)",
        "O(n^2)",
        "O(log n)"
      ],
      "correct": 1,
      "exp": "Le tri fusion découpe le tableau en 2 moitiés (a=2, b=2) et fusionne en O(n) (d=1). Par le Théorème Maître c = log2(2) = 1 = d, nous sommes au Cas 2 donnant Theta(n log n)."
    },
    {
      "stem": "Soit la relation T(n) = 3*T(n/2) + Theta(n). Quel cas du Théorème Maître s’applique ?",
      "opts": [
        "Cas 1 car log2(3) ≈ 1.58 > 1, donnant Theta(n^1.58)",
        "Cas 2 car le découpage est en 2",
        "Cas 3 car n domine",
        "Le théorème maître ne s’applique pas ici"
      ],
      "correct": 0,
      "exp": "Ici a=3, b=2, d=1. c = log2(3) ≈ 1.585. Comme c > d, nous sommes au Cas 1 : les feuilles dominent, donnant une complexité en Theta(n^{1.58})."
    },
    {
      "stem": "Si f(n) = 5*n^2 + 100*n + 42, quelle est la notation Theta exacte de f(n) ?",
      "opts": [
        "Theta(n)",
        "Theta(n^2)",
        "Theta(n^3)",
        "Theta(100n)"
      ],
      "correct": 1,
      "exp": "Pour n -> infini, le terme n^2 domine tous les autres et les constantes multiplicatives sont éliminées dans la définition de Theta. f(n) = Theta(n^2)."
    },
    {
      "stem": "Quelle est la profondeur maximale de pile atteinte par le calcul récursif naïf de Fibonacci fib(n) = fib(n-1) + fib(n-2) ?",
      "opts": [
        "O(1)",
        "O(log n)",
        "O(n)",
        "O(2^n)"
      ],
      "correct": 2,
      "exp": "Bien que le nombre d’appels totaux soit O(2^n), la pile d’appels explore une branche jusqu’à la feuille la plus profonde, qui atteint au maximum une profondeur n (branche gauche tout en fib(n-1))."
    },
    {
      "stem": "Que signifie formellement f(n) = Omega(g(n)) ?",
      "opts": [
        "f(n) est majorée par g(n)",
        "f(n) est minorée par c*g(n) pour n assez grand",
        "f(n) et g(n) sont strictement égales",
        "f(n) tend vers 0 plus vite que g(n)"
      ],
      "correct": 1,
      "exp": "Grand Omega fournit une minoration asymptotique : il existe c > 0 et n0 tels que pour tout n >= n0, f(n) >= c * g(n)."
    },
    {
      "stem": "Soit la relation T(n) = T(n/2) + Theta(1). Quelle est la complexité résultante ?",
      "opts": [
        "Theta(1)",
        "Theta(log n)",
        "Theta(n)",
        "Theta(n log n)"
      ],
      "correct": 1,
      "exp": "a=1, b=2, d=0. c = log2(1) = 0. Comme c = d = 0, le Cas 2 s’applique : Theta(n^0 log n) = Theta(log n). C’est la recherche dichotomique."
    },
    {
      "stem": "Dans quel scénario une fonction récursive linéaire provoque-t-elle un Stack Overflow ?",
      "opts": [
        "Quand elle s’exécute trop vite",
        "Quand la profondeur d’appels dépasse la limite allouée à la pile d’exécution (ex: n = 100 000 en Python)",
        "Quand elle utilise des variables globales",
        "Quand elle renvoie un entier négatif"
      ],
      "correct": 1,
      "exp": "Chaque appel empilant un cadre, une récursion de 100 000 niveaux dépasse largement la limite standard de la pile (par défaut 1 000 en Python, paramétrable via sys.setrecursionlimit)."
    },
    {
      "stem": "Quelle classe de complexité caractérise un algorithme dont le temps double chaque fois que l’on incrémente n de 1 ?",
      "opts": [
        "O(n^2)",
        "O(2^n)",
        "O(n!)",
        "O(n log n)"
      ],
      "correct": 1,
      "exp": "Si T(n+1) = 2 * T(n), par récurrence T(n) = T(0) * 2^n. Il s’agit de la complexité exponentielle O(2^n)."
    }
  ],
  "flashcards": [
    { "q": 'Qu’est-ce que « Notation de Landau Grand O (borne supérieure) » ?', "a": 'Notation de Landau Grand O (borne supérieure)' },
    { "q": 'Qu’est-ce que « Notations Grand Omega (borne inférieure) et Grand Theta (encadrement) » ?', "a": 'Notations Grand Omega (borne inférieure) et Grand Theta (encadrement)' },
    { "q": 'Qu’est-ce que « Hiérarchie des classes de complexité (O(1) à O(n!)) » ?', "a": 'Hiérarchie des classes de complexité (O(1) à O(n!))' },
    { "q": 'Qu’est-ce que « Théorème Maître de division pour régner (Cas 1, 2 et 3) » ?', "a": 'Théorème Maître de division pour régner (Cas 1, 2 et 3)' },
    { "q": 'Qu’est-ce que « Exposant critique de prolifération c = log_b(a) » ?', "a": 'On compare l’exposant critique de prolifération $c = \\log_b(a)$ avec l’exposant de travail local $d$ :' },
    { "q": 'Qu’est-ce que « Cadre de pile d’exécution (Stack Frame) » ?', "a": 'Cadre de pile d’exécution (Stack Frame)' },
    { "q": 'Qu’est-ce que « Dépassement de pile (Stack Overflow) » ?', "a": 'Dépassement de pile (Stack Overflow) : En ingénierie logicielle d’envergure industrielle, le volume de données traitées peut exploser en passant d’un millier à plusieurs dizaines de millions d’enregistrements. Un algorithme qui s’exécute en quelques millisecondes sur la machine du développeur peut saturer le CPU penda' },
    { "q": 'Qu’est-ce que « Complexité spatiale auxiliaire de la récursion » ?', "a": 'Complexité spatiale auxiliaire de la récursion' },
    {
      "q": "Quelle est la différence fondamentale entre O(g(n)) et Theta(g(n)) ?",
      "a": "O(g(n)) est une borne supérieure (majoration au pire des cas) alors que Theta(g(n)) est un encadrement strict (borne supérieure ET inférieure identiques)."
    },
    {
      "q": "Quelle est la formule générale de la récurrence de division pour régner pour le Théorème Maître ?",
      "a": "T(n) = a * T(n / b) + Theta(n^d) avec a >= 1 (nombre de sous-problèmes), b > 1 (facteur de réduction) et d >= 0 (coût local)."
    },
    {
      "q": "Quel cas du Théorème Maître s’applique si c = log_b(a) < d ?",
      "a": "Le Cas 3 : le coût de division/combinaison à la racine domine la charge totale, donnant T(n) = Theta(n^d)."
    },
    {
      "q": "Pourquoi la recherche dichotomique a-t-elle une complexité spatiale auxiliaire de O(1) en itératif et O(log n) en récursif ?",
      "a": "La version itérative n’utilise que deux pointeurs, tandis que la version récursive empile log2(n) cadres d’appels dans la pile d’exécution."
    },
    {
      "q": "Quel est l’ordre croissant des classes : O(n log n), O(2^n), O(log n), O(n^2), O(n) ?",
      "a": "O(log n) < O(n) < O(n log n) < O(n^2) < O(2^n)."
    },
    {
      "q": "Comment éliminer le risque de Stack Overflow dans une fonction récursive linéaire ?",
      "a": "En la transformant en boucle itérative (while) ou en exploitant l’optimisation de récursion terminale si le langage la supporte."
    }
  ],
  "mastery": [
    {
      "cls": "low",
      "text": "Moins de 4/8 : Révisez les définitions formelles du Grand O, de Landau et les cas du Théorème Maître."
    },
    {
      "cls": "medium",
      "text": "Entre 5/8 et 7/8 : Bonnes bases analytiques, revoyez l’analyse de récurrence et la gestion de la pile."
    },
    {
      "cls": "high",
      "text": "8/8 : Parfait ! L’analyse asymptotique et le Théorème Maître sont parfaitement maîtrisés."
    }
  ]
};
