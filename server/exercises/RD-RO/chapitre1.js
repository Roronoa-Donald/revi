/**
 * Chapitre 1 — Recherche Opérationnelle B2.
 * Mode d'évaluation mathématique structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    "id": "ro2-c1-e1",
    "chapter": 1,
    "title": "Validation de fonction objectif & positivité",
    "level": "n1",
    "language": "analyse",
    "goal": "Vérifier la non-négativité des variables de décision et calculer la fonction objectif.",
    "brief": "<p>En programmation linéaire, toute variable de décision physique doit être non-négative ($x_j \\ge 0$). Analysez les paramètres du problème pour chaque cas.</li></ul><p>Si l’une des variables est strictement négative ($x_1 < 0$ ou $x_2 < 0$), Indiquez :<br><code>NON_VALIDE VIOLATION_SIGNE</code>.<br>Sinon, calcule $Z$ et Indiquez :<br><code>VALIDE Z=&lt;valeur arrondie à 1 décimale&gt;</code>.</p>",
    "starter": "# Grille de calcul (ro2-c1-e1) — Validation de fonction objectif & positivité\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Maximisation valide]\n# Données : MAX;25,30;2,3\nA_COMPLETER\n\n[Cas 2 — Minimisation avec zéro]\n# Données : MIN;10,8;0,7\nA_COMPLETER\n\n[Cas 3 — Violation de négativité sur x1]\n# Données : MAX;15,20;-2,5\nA_COMPLETER\n",
    "hints": [
      "Identifiez les coefficients donnés dans chaque cas.",
      "Vérifiez la cohérence mathématique des valeurs."
    ],
    "examples": [
      {
        "stdin": "MAX;15,20;4,5",
        "expected": "VALIDE Z=160.0",
        "note": "Z = 15*4 + 20*5 = 60 + 100 = 160.0 avec x1=4 >= 0 et x2=5 >= 0."
      }
    ],
    "tests": [
      {
        "label": "Maximisation valide",
        "stdin": "cas:1",
        "expected": "VALIDE Z=140.0"
      },
      {
        "label": "Minimisation avec zéro",
        "stdin": "cas:2",
        "expected": "VALIDE Z=56.0"
      },
      {
        "label": "Violation de négativité sur x1",
        "stdin": "cas:3",
        "expected": "NON_VALIDE VIOLATION_SIGNE"
      }
    ],
    "solution": "[Exemple]\nVALIDE Z=160.0\n\n[Cas 1 — Maximisation valide]\nVALIDE Z=140.0\n\n[Cas 2 — Minimisation avec zéro]\nVALIDE Z=56.0\n\n[Cas 3 — Violation de négativité sur x1]\nNON_VALIDE VIOLATION_SIGNE\n"
  },
  {
    "id": "ro2-c1-e2",
    "chapter": 1,
    "title": "Faisabilité de contraintes de ressources & écarts",
    "level": "n2",
    "language": "analyse",
    "goal": "Vérifier la faisabilité d’un plan de production et calculer les marges d’inactivité (slacks).",
    "brief": "<p>Un atelier dispose de deux ressources limitées $R_1$ et $R_2$ définies par des contraintes $\\le$ :<br>$$a_{11} x_1 + a_{12} x_2 \\le b_1 \\quad \\text{et} \\quad a_{21} x_1 + a_{22} x_2 \\le b_2$$</p><p>Analysez les paramètres du problème pour chaque cas.<br>Calcule la consommation de chaque ressource et l’écart $s_i = b_i - (a_{i1} x_1 + a_{i2} x_2)$.<br>Si $s_1 \\ge 0$ et $s_2 \\ge 0$, le point est réalisable, Indiquez :<br><code>REALISABLE s1=&lt;s1 à 1 décimale&gt; s2=&lt;s2 à 1 décimale&gt;</code>.<br>Sinon, liste la ou les contraintes violées séparées par un espace :<br><code>IRREALISABLE VIOLATION_R1</code> (si seulement $R_1$ est dépassée),<br><code>IRREALISABLE VIOLATION_R2</code> (si seulement $R_2$ est dépassée), ou<br><code>IRREALISABLE VIOLATION_R1 VIOLATION_R2</code> (si les deux sont dépassées).</p>",
    "starter": "# Grille de calcul (ro2-c1-e2) — Faisabilité de contraintes de ressources & écarts\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Plan pleinement réalisable avec marge]\n# Données : 2,2;3,1,12;1,4,14\nA_COMPLETER\n\n[Cas 2 — Saturation exacte sur une contrainte]\n# Données : 4,2;2,1,10;1,2,8\nA_COMPLETER\n\n[Cas 3 — Violation de la ressource R1]\n# Données : 5,2;2,1,10;1,2,12\nA_COMPLETER\n",
    "hints": [
      "Calcule conso1 = a11 * x1 + a12 * x2 puis s1 = b1 - conso1.",
      "Une contrainte est violée si son écart s est strictement négatif (arrondi à 1e-6 près pour éviter les approximations flottantes)."
    ],
    "examples": [
      {
        "stdin": "3,2;2,1,10;1,2,8",
        "expected": "REALISABLE s1=2.0 s2=1.0",
        "note": "R1 : 2*3 + 1*2 = 8 <= 10 (s1=2.0). R2 : 1*3 + 2*2 = 7 <= 8 (s2=1.0)."
      }
    ],
    "tests": [
      {
        "label": "Plan pleinement réalisable avec marge",
        "stdin": "cas:1",
        "expected": "REALISABLE s1=4.0 s2=4.0"
      },
      {
        "label": "Saturation exacte sur une contrainte",
        "stdin": "cas:2",
        "expected": "REALISABLE s1=0.0 s2=0.0"
      },
      {
        "label": "Violation de la ressource R1",
        "stdin": "cas:3",
        "expected": "IRREALISABLE VIOLATION_R1"
      }
    ],
    "solution": "[Exemple]\nREALISABLE s1=2.0 s2=1.0\n\n[Cas 1 — Plan pleinement réalisable avec marge]\nREALISABLE s1=4.0 s2=4.0\n\n[Cas 2 — Saturation exacte sur une contrainte]\nREALISABLE s1=0.0 s2=0.0\n\n[Cas 3 — Violation de la ressource R1]\nIRREALISABLE VIOLATION_R1\n"
  },
  {
    "id": "ro2-c1-e3",
    "chapter": 1,
    "title": "Arbitrage de mélange de coût minimal (Blending)",
    "level": "n3",
    "language": "analyse",
    "goal": "Sélectionner le plan de mélange réalisable de coût économique minimal.",
    "brief": "<p>Un problème de mélange cherche à minimiser le coût d’achat de deux ingrédients $x_1$ et $x_2$ :<br>$$MIN \\quad C = c_1 x_1 + c_2 x_2$$sous les exigences nutritionnelles minimales :<br>$$a_{11} x_1 + a_{12} x_2 \\ge b_1 \\quad \\text{et} \\quad a_{21} x_1 + a_{22} x_2 \\ge b_2$$avec $x_1, x_2 \\ge 0$.</p><p>Analysez les paramètres du problème pour chaque cas...</code> contenant plusieurs candidats séparés par <code>|</code>.<br>Filtre les candidats qui respectent les deux exigences nutritionnelles.<br>Parmi les réalisables, sélectionne celui qui minimise le coût total $C$ et Indiquez :<br><code>MEILLEUR: x1=&lt;x1&gt; x2=&lt;x2&gt; COUT=&lt;C à 1 décimale&gt;</code>.<br>Si aucun candidat n’est réalisable, Indiquez : <code>AUCUN_REALISABLE</code>.</p>",
    "starter": "# Grille de calcul (ro2-c1-e3) — Arbitrage de mélange de coût minimal (Blending)\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Trois candidats avec un vainqueur net]\n# Données : 5,8;1,2,20;2,1,15;10,6|8,5|12,4\nA_COMPLETER\n\n[Cas 2 — Candidats dont certains sont irréalisables]\n# Données : 3,2;2,1,10;1,3,12;2,2|4,3|1,1\nA_COMPLETER\n\n[Cas 3 — Aucun candidat ne satisfait les deux exigences]\n# Données : 10,15;2,3,50;3,1,40;5,5|10,2|2,8\nA_COMPLETER\n",
    "hints": [
      "Découpe les candidats avec split(\"|\") puis chaque paire avec split(\",\").",
      "Vérifie a11*x1 + a12*x2 >= b1 et a21*x1 + a22*x2 >= b2 avec une tolérance epsilon."
    ],
    "examples": [
      {
        "stdin": "4,6;0.2,0.5,10;0.4,0.2,12;20,15|25,10|10,20",
        "expected": "MEILLEUR: x1=25.0 x2=10.0 COUT=160.0",
        "note": "Pour (25,10) : 0.2*25+0.5*10=10>=10 et 0.4*25+0.2*10=12>=12. Coût = 4*25 + 6*10 = 160.0 (plus économique que (20,15) à 170.0)."
      }
    ],
    "tests": [
      {
        "label": "Trois candidats avec un vainqueur net",
        "stdin": "cas:1",
        "expected": "MEILLEUR: x1=12.0 x2=4.0 COUT=92.0"
      },
      {
        "label": "Candidats dont certains sont irréalisables",
        "stdin": "cas:2",
        "expected": "MEILLEUR: x1=4.0 x2=3.0 COUT=18.0"
      },
      {
        "label": "Aucun candidat ne satisfait les deux exigences",
        "stdin": "cas:3",
        "expected": "AUCUN_REALISABLE"
      }
    ],
    "solution": "[Exemple]\nMEILLEUR: x1=25.0 x2=10.0 COUT=160.0\n\n[Cas 1 — Trois candidats avec un vainqueur net]\nMEILLEUR: x1=12.0 x2=4.0 COUT=92.0\n\n[Cas 2 — Candidats dont certains sont irréalisables]\nMEILLEUR: x1=4.0 x2=3.0 COUT=18.0\n\n[Cas 3 — Aucun candidat ne satisfait les deux exigences]\nAUCUN_REALISABLE\n"
  }
];
