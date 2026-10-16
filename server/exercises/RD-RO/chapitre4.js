/**
 * Chapitre 4 — Recherche Opérationnelle B2.
 * Mode d'évaluation mathématique structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    "id": "ro2-c4-e1",
    "chapter": 4,
    "title": "Construction du problème Dual canonique",
    "level": "n1",
    "language": "analyse",
    "goal": "Transposer un programme primal MAX en son programme dual MIN symétrique.",
    "brief": "<p>À tout programme primal sous forme canonique :<br>$$\\text{MAX } Z = c_1 x_1 + c_2 x_2 \\quad \\text{sous } A x \\le b, \\quad x \\ge 0$$correspond un programme dual associé :<br>$$\\text{MIN } W = b_1 y_1 + b_2 y_2 \\quad \\text{sous } A^T y \\ge c, \\quad y \\ge 0$$</p><p>Analysez les paramètres du problème pour chaque cas.<br>Génère et Indiquez le programme dual sur deux lignes :<br>Ligne 1 : <code>MIN W=&lt;b1&gt;*y1 + &lt;b2&gt;*y2</code><br>Ligne 2 : <code>CONTRAINTES: &lt;a11&gt;*y1 + &lt;a21&gt;*y2 &gt;= &lt;c1&gt; | &lt;a12&gt;*y1 + &lt;a22&gt;*y2 &gt;= &lt;c2&gt;</code>.<br>(Les coefficients conservent leur format naturel).</p>",
    "starter": "# Grille de calcul (ro2-c4-e1) — Construction du problème Dual canonique\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Primal standard 2 variables 2 contraintes]\n# Données : 4,6;2,1,10;1,3,15\nA_COMPLETER\n\n[Cas 2 — Coefficients décimaux]\n# Données : 1.5,2.5;0.5,1.0,4;1.0,0.5,5\nA_COMPLETER\n\n[Cas 3 — Primal avec coefficients dissymétriques]\n# Données : 10,20;4,2,40;1,5,30\nA_COMPLETER\n",
    "hints": [
      "Remarque la transposition : la première contrainte duale utilise a11 et a21 (première colonne de A).",
      "La fonction objectif duale utilise les seconds membres b1 et b2 du primal."
    ],
    "examples": [
      {
        "stdin": "3,5;1,2,6;3,1,9",
        "expected": "MIN W=6*y1 + 9*y2\nCONTRAINTES: 1*y1 + 3*y2 >= 3 | 2*y1 + 1*y2 >= 5",
        "note": "Objectif MIN W = 6*y1 + 9*y2. Transposée de [[1,2],[3,1]] = [[1,3],[2,1]]."
      }
    ],
    "tests": [
      {
        "label": "Primal standard 2 variables 2 contraintes",
        "stdin": "cas:1",
        "expected": "MIN W=10*y1 + 15*y2\nCONTRAINTES: 2*y1 + 1*y2 >= 4 | 1*y1 + 3*y2 >= 6"
      },
      {
        "label": "Coefficients décimaux",
        "stdin": "cas:2",
        "expected": "MIN W=4*y1 + 5*y2\nCONTRAINTES: 0.5*y1 + 1.0*y2 >= 1.5 | 1.0*y1 + 0.5*y2 >= 2.5"
      },
      {
        "label": "Primal avec coefficients dissymétriques",
        "stdin": "cas:3",
        "expected": "MIN W=40*y1 + 30*y2\nCONTRAINTES: 4*y1 + 1*y2 >= 10 | 2*y1 + 5*y2 >= 20"
      }
    ],
    "solution": "[Exemple]\nMIN W=6*y1 + 9*y2\nCONTRAINTES: 1*y1 + 3*y2 >= 3 | 2*y1 + 1*y2 >= 5\n\n[Cas 1 — Primal standard 2 variables 2 contraintes]\nMIN W=10*y1 + 15*y2\nCONTRAINTES: 2*y1 + 1*y2 >= 4 | 1*y1 + 3*y2 >= 6\n\n[Cas 2 — Coefficients décimaux]\nMIN W=4*y1 + 5*y2\nCONTRAINTES: 0.5*y1 + 1.0*y2 >= 1.5 | 1.0*y1 + 0.5*y2 >= 2.5\n\n[Cas 3 — Primal avec coefficients dissymétriques]\nMIN W=40*y1 + 30*y2\nCONTRAINTES: 4*y1 + 1*y2 >= 10 | 2*y1 + 5*y2 >= 20\n"
  },
  {
    "id": "ro2-c4-e2",
    "chapter": 4,
    "title": "Théorème fort de la dualité & Gap de dualité",
    "level": "n2",
    "language": "analyse",
    "goal": "Vérifier l’égalité des optimums primal et dual et calculer le gap de dualité.",
    "brief": "<p>D’après le <strong>théorème fort de la dualité</strong>, si le problème primal admet une solution optimale $x^*$, alors le problème dual admet une solution optimale $y^*$ telle que :<br>$$Z(x^*) = c^T x^* = b^T y^* = W(y^*)$$<br>Si les points testés ne sont pas encore optimaux, le <em>théorème faible</em> garantit que $Z(x) \\le W(y)$, l’écart $W(y) - Z(x) \\ge 0$ formant le <strong>gap de dualité</strong>.</p><p>Analysez les paramètres du problème pour chaque cas.<br>Calcule $Z = c_1 x_1 + c_2 x_2$, $W = b_1 y_1 + b_2 y_2$ et l’écart $gap = W - Z$.<br>Si $|gap| < 10^{-5}$, Indiquez :<br><code>OPTIMUM_ATTEINT Z=W=&lt;valeur à 2 décimales&gt; GAP=0.00</code>.<br>Sinon, Indiquez :<br><code>NON_OPTIMAL Z=&lt;Z à 2 décimales&gt; W=&lt;W à 2 décimales&gt; GAP=&lt;gap à 2 décimales&gt;</code>.</p>",
    "starter": "# Grille de calcul (ro2-c4-e2) — Théorème fort de la dualité & Gap de dualité\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Optimum parfait sans gap (Z = W)]\n# Données : 3,5;7,2;16,11;0.333333,2.333333\nA_COMPLETER\n\n[Cas 2 — Points sous-optimaux avec gap net]\n# Données : 2,3;2,1;10,8;1.5,1.0\nA_COMPLETER\n\n[Cas 3 — Autre optimum parfait]\n# Données : 10,12;5,5;50,30;1.0,2.0\nA_COMPLETER\n",
    "hints": [
      "Calcule z = c1*x1 + c2*x2 et w = b1*y1 + b2*y2.",
      "Si abs(w - z) < 1e-5, le gap est nul et l’optimum est prouvé."
    ],
    "examples": [
      {
        "stdin": "3,5;4,2;16,11;0.33,2.33",
        "expected": "NON_OPTIMAL Z=22.00 W=30.91 GAP=8.91",
        "note": "Z = 3*4 + 5*2 = 22.0. W = 16*0.33 + 11*2.33 = 30.91. Gap de dualité = 8.91."
      }
    ],
    "tests": [
      {
        "label": "Optimum parfait sans gap (Z = W)",
        "stdin": "cas:1",
        "expected": "OPTIMUM_ATTEINT Z=W=31.00 GAP=0.00"
      },
      {
        "label": "Points sous-optimaux avec gap net",
        "stdin": "cas:2",
        "expected": "NON_OPTIMAL Z=7.00 W=23.00 GAP=16.00"
      },
      {
        "label": "Autre optimum parfait",
        "stdin": "cas:3",
        "expected": "OPTIMUM_ATTEINT Z=W=110.00 GAP=0.00"
      }
    ],
    "solution": "[Exemple]\nNON_OPTIMAL Z=22.00 W=30.91 GAP=8.91\n\n[Cas 1 — Optimum parfait sans gap (Z = W)]\nOPTIMUM_ATTEINT Z=W=31.00 GAP=0.00\n\n[Cas 2 — Points sous-optimaux avec gap net]\nNON_OPTIMAL Z=7.00 W=23.00 GAP=16.00\n\n[Cas 3 — Autre optimum parfait]\nOPTIMUM_ATTEINT Z=W=110.00 GAP=0.00\n"
  },
  {
    "id": "ro2-c4-e3",
    "chapter": 4,
    "title": "Théorème des écarts complémentaires (Slackness)",
    "level": "n3",
    "language": "analyse",
    "goal": "Vérifier les conditions d’écarts complémentaires entre solutions primale et duale.",
    "brief": "<p>Le théorème des écarts complémentaires (Karush-Kuhn-Tucker) stipule qu’à l’optimum :</p><ul>  <li>Pour toute contrainte de ressource $i$ : $y_i^* \\times s_i^* = 0$.<br>  (Si une ressource est excédentaire $s_i > 0$, son prix d’ombre est nul $y_i = 0$ ; si $y_i > 0$, la ressource est saturée $s_i = 0$).</li>  <li>Pour toute variable de décision $j$ : $x_j^* \\times e_j^* = 0$ (où $e_j$ est l’écart sur la contrainte duale).</li></ul><p>Analysez les paramètres du problème pour chaque cas...;y1,y2,...</code> représentant les écarts primaux $s_i$ et les variables duales associées $y_i$.<br>Pour chaque couple $(s_i, y_i)$, vérifie si $s_i \\times y_i = 0$ (avec tolérance $10^{-5}$).<br>Si toutes les conditions sont respectées, Indiquez :<br><code>COMPLEMENTARITE_VERIFIEE</code>.<br>Sinon, liste les indices des contraintes en violation :<br><code>VIOLATION_CONTRAINTE_&lt;i&gt;</code> (séparés par un espace).</p>",
    "starter": "# Grille de calcul (ro2-c4-e3) — Théorème des écarts complémentaires (Slackness)\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Toutes les conditions respectées]\n# Données : 0.0,0.0,2.0,0.0;3.0,1.5,0.0,4.2\nA_COMPLETER\n\n[Cas 2 — Violation sur la deuxième contrainte]\n# Données : 0.0,3.0,0.0;2.0,1.0,4.0\nA_COMPLETER\n\n[Cas 3 — Violations multiples (contraintes 1 et 3)]\n# Données : 1.5,0.0,2.0;2.0,0.0,1.0\nA_COMPLETER\n",
    "hints": [
      "Découpe par \";\" puis sépare les valeurs s et y.",
      "Une violation apparaît si abs(s * y) > 1e-5."
    ],
    "examples": [
      {
        "stdin": "0.0,4.5,0.0;1.2,0.0,3.5",
        "expected": "COMPLEMENTARITE_VERIFIEE",
        "note": "C1: 0*1.2=0, C2: 4.5*0=0, C3: 0*3.5=0. Tout est nul."
      }
    ],
    "tests": [
      {
        "label": "Toutes les conditions respectées",
        "stdin": "cas:1",
        "expected": "COMPLEMENTARITE_VERIFIEE"
      },
      {
        "label": "Violation sur la deuxième contrainte",
        "stdin": "cas:2",
        "expected": "VIOLATION_CONTRAINTE_2"
      },
      {
        "label": "Violations multiples (contraintes 1 et 3)",
        "stdin": "cas:3",
        "expected": "VIOLATION_CONTRAINTE_1 VIOLATION_CONTRAINTE_3"
      }
    ],
    "solution": "[Exemple]\nCOMPLEMENTARITE_VERIFIEE\n\n[Cas 1 — Toutes les conditions respectées]\nCOMPLEMENTARITE_VERIFIEE\n\n[Cas 2 — Violation sur la deuxième contrainte]\nVIOLATION_CONTRAINTE_2\n\n[Cas 3 — Violations multiples (contraintes 1 et 3)]\nVIOLATION_CONTRAINTE_1 VIOLATION_CONTRAINTE_3\n"
  }
];
