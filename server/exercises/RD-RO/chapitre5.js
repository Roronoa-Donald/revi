'use strict';

module.exports = [
  {
    "id": "ro2-c5-e1",
    "chapter": 5,
    "title": "Méthode du Coin Nord-Ouest (Transport)",
    "level": "n1",
    "language": "analyse",
    "goal": "Construire une solution de base réalisable initiale par la règle du coin Nord-Ouest.",
    "brief": "<p>Dans un problème de transport équilibré (somme des offres = somme des demandes), la règle du <strong>Coin Nord-Ouest</strong> commence en haut à gauche $(i=0, j=0)$ :</p><ul>  <li>Alloue $x_{ij} = \\min(offre_i, demande_j)$ ;</li>  <li>Soustrait cette quantité de $offre_i$ et $demande_j$ ;</li>  <li>Si $offre_i = 0$, avance vers le bas ($i \\leftarrow i + 1$) ; si $demande_j = 0$, avance vers la droite ($j \\leftarrow j + 1$).</li></ul><p>Analysez les paramètres du problème pour chaque cas...;d1,d2,...;cout11,cout12,...|cout21,cout22,...|...</code>.<br>Calculez les flux non nuls alloués et le coût total de transport $C = \\sum x_{ij} \\times c_{ij}$.<br>Indiquez :<br><code>FLUX: (i,j)=qte,... COUT_TOTAL=&lt;C à 1 décimale&gt;</code><br>(les indices $i, j$ sont 1-indexés).</p>",
    "starter": "# Grille de calcul (ro2-c5-e1) — Méthode du Coin Nord-Ouest (Transport)\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Deux origines deux destinations]\n# Données : 25,25;30,20;2,4|3,5\nA_COMPLETER\n\n[Cas 2 — Trois origines deux destinations]\n# Données : 10,20,30;25,35;4,6|2,5|3,1\nA_COMPLETER\n\n[Cas 3 — Matrice 2x2 avec égalité parfaite sur la première case]\n# Données : 20,30;20,30;5,8|4,2\nA_COMPLETER\n",
    "hints": [
      "La méthode du coin Nord-Ouest initialise la matrice de transport en saturant d’abord la case (1, 1).",
      "À chaque étape, allouez min(offre restante, demande restante) et déplacez-vous vers la droite ou vers le bas selon la saturation."
    ],
    "examples": [
      {
        "stdin": "30,40;20,30,20;3,5,7|2,4,6",
        "expected": "FLUX: (1,1)=20.0,(1,2)=10.0,(2,2)=20.0,(2,3)=20.0 COUT_TOTAL=310.0",
        "note": "O1=30, D1=20 -> (1,1)=20. D1 est satisfaite. O1 restant=10, D2=30 -> (1,2)=10. O1 épuisée. O2=40, D2 restant=20 -> (2,2)=20. O2 restant=20, D3=20 -> (2,3)=20. Coût: 20*3 + 10*5 + 20*4 + 20*6 = 60+50+80+120 = 310.0."
      }
    ],
    "tests": [
      {
        "label": "Deux origines deux destinations",
        "stdin": "cas:1",
        "expected": "FLUX: (1,1)=25.0,(2,1)=5.0,(2,2)=20.0 COUT_TOTAL=165.0"
      },
      {
        "label": "Trois origines deux destinations",
        "stdin": "cas:2",
        "expected": "FLUX: (1,1)=10.0,(2,1)=15.0,(2,2)=5.0,(3,2)=30.0 COUT_TOTAL=125.0"
      },
      {
        "label": "Matrice 2x2 avec égalité parfaite sur la première case",
        "stdin": "cas:3",
        "expected": "FLUX: (1,1)=20.0,(2,2)=30.0 COUT_TOTAL=160.0"
      }
    ],
    "solution": "[Exemple]\nFLUX: (1,1)=20.0,(1,2)=10.0,(2,2)=20.0,(2,3)=20.0 COUT_TOTAL=310.0\n\n[Cas 1 — Deux origines deux destinations]\nFLUX: (1,1)=25.0,(2,1)=5.0,(2,2)=20.0 COUT_TOTAL=165.0\n\n[Cas 2 — Trois origines deux destinations]\nFLUX: (1,1)=10.0,(2,1)=15.0,(2,2)=5.0,(3,2)=30.0 COUT_TOTAL=125.0\n\n[Cas 3 — Matrice 2x2 avec égalité parfaite sur la première case]\nFLUX: (1,1)=20.0,(2,2)=30.0 COUT_TOTAL=160.0\n"
  },
  {
    "id": "ro2-c5-e2",
    "chapter": 5,
    "title": "Méthode du Moindre Coût (Transport économique)",
    "level": "n2",
    "language": "analyse",
    "goal": "Construire une solution initiale de transport par allocation gloutonne sur la case la moins chère.",
    "brief": "<p>Contrairement au Coin Nord-Ouest qui ignore les prix, la <strong>Méthode du Moindre Coût</strong> sélectionne à chaque étape la cellule $(i, j)$ encore active ayant le coût unitaire $c_{ij}$ le plus faible de toute la matrice :</p><ul>  <li>Alloue $q = \\min(offre_i, demande_j)$ à cette cellule ;</li>  <li>Met à jour l’offre et la demande restantes ;</li>  <li>Désactive la ligne $i$ (si $offre_i = 0$) ou la colonne $j$ (si $demande_j = 0$).</li></ul><p>Analysez les paramètres du problème pour chaque cas.<br>Indiquez : <code>MOINDRE_COUT: COUT_TOTAL=&lt;C à 1 décimale&gt;</code>.</p>",
    "starter": "# Grille de calcul (ro2-c5-e2) — Méthode du Moindre Coût (Transport économique)\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Matrice 2x2 contrastée]\n# Données : 30,20;25,25;4,2|3,5\nA_COMPLETER\n\n[Cas 2 — Matrice 2x2 avec coûts équilibrés]\n# Données : 40,40;30,50;1,3|2,1\nA_COMPLETER\n\n[Cas 3 — Avantage net sur la diagonale]\n# Données : 15,15;15,15;1,9|9,2\nA_COMPLETER\n",
    "hints": [
      "Repère les indices (i, j) non encore saturés avec le coût min.",
      "Soustrait q de l'offre i et de la demande j jusqu'à épuisement."
    ],
    "examples": [
      {
        "stdin": "20,30;25,25;3,5|2,4",
        "expected": "MOINDRE_COUT: COUT_TOTAL=170.0",
        "note": "Allocation : (2,1)=25 (coût 2), (2,2)=5 (coût 4), (1,2)=20 (coût 5). Coût total = 25*2 + 5*4 + 20*5 = 50 + 20 + 100 = 170.0."
      }
    ],
    "tests": [
      {
        "label": "Matrice 2x2 contrastée",
        "stdin": "cas:1",
        "expected": "MOINDRE_COUT: COUT_TOTAL=130.0"
      },
      {
        "label": "Matrice 2x2 avec coûts équilibrés",
        "stdin": "cas:2",
        "expected": "MOINDRE_COUT: COUT_TOTAL=100.0"
      },
      {
        "label": "Avantage net sur la diagonale",
        "stdin": "cas:3",
        "expected": "MOINDRE_COUT: COUT_TOTAL=45.0"
      }
    ],
    "solution": "[Exemple]\nMOINDRE_COUT: COUT_TOTAL=170.0\n\n[Cas 1 — Matrice 2x2 contrastée]\nMOINDRE_COUT: COUT_TOTAL=130.0\n\n[Cas 2 — Matrice 2x2 avec coûts équilibrés]\nMOINDRE_COUT: COUT_TOTAL=100.0\n\n[Cas 3 — Avantage net sur la diagonale]\nMOINDRE_COUT: COUT_TOTAL=45.0\n"
  },
  {
    "id": "ro2-c5-e3",
    "chapter": 5,
    "title": "Algorithme Hongrois (Affectation minimale)",
    "level": "n3",
    "language": "analyse",
    "goal": "Appliquer les étapes de réduction de matrice pour résoudre un problème d’affectation.",
    "brief": "<p>Le problème d’affectation consiste à attribuer $n$ personnes à $n$ tâches de façon bijective en minimisant la somme des coûts. L’<strong>algorithme de Kuhn-Munkres (Hongrois)</strong> débute par :</p><ol>  <li><strong>Réduction par ligne</strong> : soustraire le minimum de chaque ligne à tous ses éléments ;</li>  <li><strong>Réduction par colonne</strong> : soustraire le minimum de chaque colonne à tous ses éléments.</li></ol><p>Analysez les paramètres du problème pour chaque cas.<br>Effectue la réduction complète (lignes puis colonnes).<br>Pour toutes les permutations possibles de 3 affectations bijectives, trouve celle qui minimise la somme des coûts d’origine.<br>Indiquez : <code>COUT_MIN=&lt;valeur entière&gt; AFFECTATION=&lt;j1&gt;,&lt;j2&gt;,&lt;j3&gt;</code><br>où $j_k$ est la tâche (1-indexée) affectée à la personne $k$.</p>",
    "starter": "# Grille de calcul (ro2-c5-e3) — Algorithme Hongrois (Affectation minimale)\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Matrice 3x3 diagonale optimale]\n# Données : 4,8,9|6,3,7|8,5,2\nA_COMPLETER\n\n[Cas 2 — Matrice 3x3 avec permutation croisée]\n# Données : 15,10,9|9,15,10|10,12,8\nA_COMPLETER\n\n[Cas 3 — Coûts identiques sur plusieurs cases]\n# Données : 5,5,5|5,5,5|5,5,5\nA_COMPLETER\n",
    "hints": [
      "Pour une matrice 3x3, il y a exactement 3! = 6 permutations d'affectation.",
      "Évalue les 6 sommes des coûts d'origine pour trouver la bijection optimale."
    ],
    "examples": [
      {
        "stdin": "10,15,20|12,8,14|9,13,11",
        "expected": "COUT_MIN=29 AFFECTATION=1,2,3",
        "note": "Affectation : P1->T1 (10), P2->T2 (8), P3->T3 (11). Coût total = 10 + 8 + 11 = 29."
      }
    ],
    "tests": [
      {
        "label": "Matrice 3x3 diagonale optimale",
        "stdin": "cas:1",
        "expected": "COUT_MIN=9 AFFECTATION=1,2,3"
      },
      {
        "label": "Matrice 3x3 avec permutation croisée",
        "stdin": "cas:2",
        "expected": "COUT_MIN=27 AFFECTATION=2,1,3"
      },
      {
        "label": "Coûts identiques sur plusieurs cases",
        "stdin": "cas:3",
        "expected": "COUT_MIN=15 AFFECTATION=1,2,3"
      }
    ],
    "solution": "[Exemple]\nCOUT_MIN=29 AFFECTATION=1,2,3\n\n[Cas 1 — Matrice 3x3 diagonale optimale]\nCOUT_MIN=9 AFFECTATION=1,2,3\n\n[Cas 2 — Matrice 3x3 avec permutation croisée]\nCOUT_MIN=27 AFFECTATION=2,1,3\n\n[Cas 3 — Coûts identiques sur plusieurs cases]\nCOUT_MIN=15 AFFECTATION=1,2,3\n"
  }
];
