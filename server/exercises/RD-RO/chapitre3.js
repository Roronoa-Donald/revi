/**
 * Chapitre 3 — Recherche Opérationnelle B2.
 * Mode d'évaluation mathématique structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    "id": "ro2-c3-e1",
    "chapter": 3,
    "title": "Critère de Dantzig (Choix de la variable entrante)",
    "level": "n1",
    "language": "analyse",
    "goal": "Identifier la variable hors-base entrante selon la règle du plus grand coût réduit.",
    "brief": "<p>Dans un problème de maximisation, la ligne d’indicateurs (coûts réduits $\\bar{c}_j$) du tableau du simplexe guide l’amélioration de la solution :</p><ul>  <li>Si tous les $\\bar{c}_j \\le 0$, la solution de base courante est <strong>optimale</strong> ;</li>  <li>Sinon, la variable entrante est celle qui possède le coût réduit le plus strictement positif $\\max \\bar{c}_j$ (règle de Dantzig). En cas d’égalité, on choisit l’indice le plus petit (règle de Bland pour éviter le cyclage).</li></ul><p>Analysez les paramètres du problème pour chaque cas...</code>.<br>Si toutes les valeurs sont $\\le 0$, Indiquez : <code>OPTIMALITE_ATTEINTE</code>.<br>Sinon, Indiquez : <code>ENTRANTE: &lt;nom_variable&gt; COUT_REDUIT=&lt;valeur à 2 décimales&gt;</code>.</p>",
    "starter": "# Grille de calcul (ro2-c3-e1) — Critère de Dantzig (Choix de la variable entrante)\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Deux variables candidates positives]\n# Données : x1:3.5,x2:2.0,x3:5.8,s1:0.0\nA_COMPLETER\n\n[Cas 2 — Solution optimale (tous négatifs ou nuls)]\n# Données : x1:0.0,x2:-2.5,s1:-1.2,s2:0.0\nA_COMPLETER\n\n[Cas 3 — Égalité de coût réduit (règle de Bland du plus petit indice)]\n# Données : x1:4.0,x2:4.0,s1:0.0\nA_COMPLETER\n",
    "hints": [
      "Découpez par virgule puis chaque couple par deux-points.",
      "Cherche le maximum strictement positif. S’il n’y en a aucun, c’est optimal."
    ],
    "examples": [
      {
        "stdin": "x1:4.0,x2:6.0,s1:0.0,s2:0.0",
        "expected": "ENTRANTE: x2 COUT_REDUIT=6.00",
        "note": "x2 a le plus fort coût réduit positif (+6.0)."
      }
    ],
    "tests": [
      {
        "label": "Deux variables candidates positives",
        "stdin": "cas:1",
        "expected": "ENTRANTE: x3 COUT_REDUIT=5.80"
      },
      {
        "label": "Solution optimale (tous négatifs ou nuls)",
        "stdin": "cas:2",
        "expected": "OPTIMALITE_ATTEINTE"
      },
      {
        "label": "Égalité de coût réduit (règle de Bland du plus petit indice)",
        "stdin": "cas:3",
        "expected": "ENTRANTE: x1 COUT_REDUIT=4.00"
      }
    ],
    "solution": "[Exemple]\nENTRANTE: x2 COUT_REDUIT=6.00\n\n[Cas 1 — Deux variables candidates positives]\nENTRANTE: x3 COUT_REDUIT=5.80\n\n[Cas 2 — Solution optimale (tous négatifs ou nuls)]\nOPTIMALITE_ATTEINTE\n\n[Cas 3 — Égalité de coût réduit (règle de Bland du plus petit indice)]\nENTRANTE: x1 COUT_REDUIT=4.00\n"
  },
  {
    "id": "ro2-c3-e2",
    "chapter": 3,
    "title": "Règle du ratio minimum & variable sortante",
    "level": "n2",
    "language": "analyse",
    "goal": "Déterminer la variable de base sortante par le test du ratio minimum de Dantzig.",
    "brief": "<p>Une fois la colonne pivot $k$ choisie, la ligne sortante $r$ est déterminée par la règle du plus petit ratio strictement positif entre le second membre $b_i$ et l’élément de la colonne pivot $a_{ik}$ :<br>$$\\theta = \\min_{i \\mid a_{ik} > 0} \\left( \\frac{b_i}{a_{ik}} \\right)$$</p><p>Si aucun élément $a_{ik}$ n’est strictement positif ($a_{ik} \\le 0$ pour toute la colonne), la solution est <strong>non bornée</strong>.</p><p>Analysez les paramètres du problème pour chaque cas...;a1k,a2k,...</code>.<br>Si aucun $a_{ik} > 0$, Indiquez : <code>PROBLEME_NON_BORNE</code>.<br>Sinon, Indiquez : <code>SORTANTE: LIGNE_&lt;numéro 1-indexé&gt; MIN_RATIO=&lt;theta à 2 décimales&gt;</code>.<br>(En cas d’égalité de ratio, choisis la ligne de plus petit indice pour briser l’équi-départ).</p>",
    "starter": "# Grille de calcul (ro2-c3-e2) — Règle du ratio minimum & variable sortante\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Minimum en première ligne]\n# Données : 10,20,30;5,2,1\nA_COMPLETER\n\n[Cas 2 — Colonne pivot avec coefficients négatifs ou nuls]\n# Données : 15,25;0,-2\nA_COMPLETER\n\n[Cas 3 — Un seul coefficient strictement positif]\n# Données : 12,8,20;-3,4,-1\nA_COMPLETER\n",
    "hints": [
      "Ignore les lignes où aik <= 0.",
      "Parcourez les ratios et retiens le minimum strictement positif."
    ],
    "examples": [
      {
        "stdin": "18,42,24;2,3,4",
        "expected": "SORTANTE: LIGNE_3 MIN_RATIO=6.00",
        "note": "Ratios : L1=18/2=9.0, L2=42/3=14.0, L3=24/4=6.0. Le minimum est en Ligne 3."
      }
    ],
    "tests": [
      {
        "label": "Minimum en première ligne",
        "stdin": "cas:1",
        "expected": "SORTANTE: LIGNE_1 MIN_RATIO=2.00"
      },
      {
        "label": "Colonne pivot avec coefficients négatifs ou nuls",
        "stdin": "cas:2",
        "expected": "PROBLEME_NON_BORNE"
      },
      {
        "label": "Un seul coefficient strictement positif",
        "stdin": "cas:3",
        "expected": "SORTANTE: LIGNE_2 MIN_RATIO=2.00"
      }
    ],
    "solution": "[Exemple]\nSORTANTE: LIGNE_3 MIN_RATIO=6.00\n\n[Cas 1 — Minimum en première ligne]\nSORTANTE: LIGNE_1 MIN_RATIO=2.00\n\n[Cas 2 — Colonne pivot avec coefficients négatifs ou nuls]\nPROBLEME_NON_BORNE\n\n[Cas 3 — Un seul coefficient strictement positif]\nSORTANTE: LIGNE_2 MIN_RATIO=2.00\n"
  },
  {
    "id": "ro2-c3-e3",
    "chapter": 3,
    "title": "Opération de pivotage de Gauss-Jordan",
    "level": "n3",
    "language": "analyse",
    "goal": "Effectuer un pivot complet de Gauss-Jordan sur une matrice de simplexe.",
    "brief": "<p>Le pivot de Gauss-Jordan sur l’élément de pivot $(r, c)$ d’une matrice $M$ s’effectue en deux étapes :</p><ol>  <li>Normaliser la ligne de pivot $r$ en divisant chaque coefficient par le pivot $p = M[r][c]$ ;</li>  <li>Pour chaque autre ligne $i ≠ r$, éliminer le coefficient de la colonne $c$ en effectuant :<br>  $M[i][j] \\leftarrow M[i][j] - M[i][c] \\times M[r][j]$.</li></ol><p>Analysez les paramètres du problème pour chaque cas...|L2_coeff1,L2_coeff2,...|...</code><br>où $r, c$ sont les indices 1-indexés du pivot (ligne $r$, colonne $c$).<br>Indiquez chaque ligne de la matrice résultante séparée par <code> | </code> avec les coefficients arrondis à 2 décimales séparés par des virgules :<br><code>&lt;val11&gt;,&lt;val12&gt;,... | &lt;val21&gt;,&lt;val22&gt;,...</code>.</p>",
    "starter": "# Grille de calcul (ro2-c3-e3) — Opération de pivotage de Gauss-Jordan\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Matrice 2x3 avec pivot à 3.0]\n# Données : 1,2;1,3,9|2,1,8\nA_COMPLETER\n\n[Cas 2 — Pivot en deuxième ligne]\n# Données : 2,1;3,2,12|2,4,16\nA_COMPLETER\n\n[Cas 3 — Matrice 3x3 avec ligne identité]\n# Données : 2,2;1,2,5|0,4,8|2,1,6\nA_COMPLETER\n",
    "hints": [
      "Convertissez r et c en indices 0-indexés (r-1, c-1).",
      "Sauvegarde bien la ligne pivot normalisée avant de modifier les autres lignes."
    ],
    "examples": [
      {
        "stdin": "1,1;2,4,10|1,1,4",
        "expected": "1.00,2.00,5.00 | 0.00,-1.00,-1.00",
        "note": "Pivot à la ligne 1, colonne 1 (valeur 2). L1 devient L1/2 = [1, 2, 5]. L2 devient L2 - 1*L1 = [0, -1, -1]."
      }
    ],
    "tests": [
      {
        "label": "Matrice 2x3 avec pivot à 3.0",
        "stdin": "cas:1",
        "expected": "0.33,1.00,3.00 | 1.67,0.00,5.00"
      },
      {
        "label": "Pivot en deuxième ligne",
        "stdin": "cas:2",
        "expected": "0.00,-4.00,-12.00 | 1.00,2.00,8.00"
      },
      {
        "label": "Matrice 3x3 avec ligne identité",
        "stdin": "cas:3",
        "expected": "1.00,0.00,1.00 | 0.00,1.00,2.00 | 2.00,0.00,4.00"
      }
    ],
    "solution": "[Exemple]\n1.00,2.00,5.00 | 0.00,-1.00,-1.00\n\n[Cas 1 — Matrice 2x3 avec pivot à 3.0]\n0.33,1.00,3.00 | 1.67,0.00,5.00\n\n[Cas 2 — Pivot en deuxième ligne]\n0.00,-4.00,-12.00 | 1.00,2.00,8.00\n\n[Cas 3 — Matrice 3x3 avec ligne identité]\n1.00,0.00,1.00 | 0.00,1.00,2.00 | 2.00,0.00,4.00\n"
  }
];
