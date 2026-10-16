/**
 * Chapitre 2 — Recherche Opérationnelle B2.
 * Mode d'évaluation mathématique structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    "id": "ro2-c2-e1",
    "chapter": 2,
    "title": "Conversion en forme standard (Écart & Excès)",
    "level": "n1",
    "language": "analyse",
    "goal": "Transformer une inégalité de contrainte en équation standard par ajout de variable d’écart ou d’excès.",
    "brief": "<p>Pour préparer un programme linéaire à l’algorithme du simplexe, chaque contrainte d’inégalité doit être transformée en égalité avec second membre positif :</p><ul>  <li>Une contrainte $\\le$ reçoit une variable d’écart positive : $a_1 x_1 + a_2 x_2 + s_k = b$ ;</li>  <li>Une contrainte $\\ge$ reçoit une variable d’excès soustraite : $a_1 x_1 + a_2 x_2 - e_k = b$.</li></ul><p>Analysez les paramètres du problème pour chaque cas. <code>1</code>, <code>2</code>) ;<br>- <code>a1,a2</code> sont les coefficients de $x_1$ et $x_2$ ;<br>- <code>SENS</code> vaut <code>LE</code> (pour $\\le$) ou <code>GE</code> (pour $\\ge$) ;<br>- <code>b</code> est le second membre.</p><p>Indiquez l’équation résultante sous la forme canonique :<br>Pour <code>LE</code> : <code>&lt;a1&gt;*x1 + &lt;a2&gt;*x2 + s&lt;num&gt; = &lt;b&gt;</code>.<br>Pour <code>GE</code> : <code>&lt;a1&gt;*x1 + &lt;a2&gt;*x2 - e&lt;num&gt; = &lt;b&gt;</code>.<br>(Les nombres entiers ou flottants conservent leur écriture naturelle).</p>",
    "starter": "# Grille de calcul (ro2-c2-e1) — Conversion en forme standard (Écart & Excès)\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Contrainte <= standard]\n# Données : 2;2,5;LE;30\nA_COMPLETER\n\n[Cas 2 — Contrainte >= avec variable d excès]\n# Données : 1;1,3;GE;15\nA_COMPLETER\n\n[Cas 3 — Coefficients décimaux]\n# Données : 3;0.5,1.5;LE;12\nA_COMPLETER\n",
    "hints": [
      "Découpe la ligne par \";\".",
      "Selon que SENS == \"LE\" ou \"GE\", choisis \"+ s{num}\" ou \"- e{num}\"."
    ],
    "examples": [
      {
        "stdin": "1;3,4;LE;24",
        "expected": "3*x1 + 4*x2 + s1 = 24",
        "note": "Contrainte <= transformée avec la variable d’écart s1."
      }
    ],
    "tests": [
      {
        "label": "Contrainte <= standard",
        "stdin": "cas:1",
        "expected": "2*x1 + 5*x2 + s2 = 30"
      },
      {
        "label": "Contrainte >= avec variable d excès",
        "stdin": "cas:2",
        "expected": "1*x1 + 3*x2 - e1 = 15"
      },
      {
        "label": "Coefficients décimaux",
        "stdin": "cas:3",
        "expected": "0.5*x1 + 1.5*x2 + s3 = 12"
      }
    ],
    "solution": "[Exemple]\n3*x1 + 4*x2 + s1 = 24\n\n[Cas 1 — Contrainte <= standard]\n2*x1 + 5*x2 + s2 = 30\n\n[Cas 2 — Contrainte >= avec variable d excès]\n1*x1 + 3*x2 - e1 = 15\n\n[Cas 3 — Coefficients décimaux]\n0.5*x1 + 1.5*x2 + s3 = 12\n"
  },
  {
    "id": "ro2-c2-e2",
    "chapter": 2,
    "title": "Intersection de deux droites par la règle de Cramer",
    "level": "n2",
    "language": "analyse",
    "goal": "Calculer le point d’intersection de deux droites de frontière dans le plan.",
    "brief": "<p>Deux droites de contrainte du plan $(x_1, x_2)$ sont données sous forme d’équations :<br>$$a_1 x_1 + b_1 x_2 = c_1 \\quad \\text{et} \\quad a_2 x_1 + b_2 x_2 = c_2$$</p><p>Analysez les paramètres du problème pour chaque cas.<br>Calcule le déterminant du système $\\Delta = a_1 b_2 - a_2 b_1$.<br>Si $|\\Delta| < 10^{-6}$, les droites sont parallèles ou confondues, Indiquez :<br><code>PARALLELES DELTA=0.0</code>.<br>Sinon, applique la règle de Cramer :<br>$$x_1 = \\frac{c_1 b_2 - c_2 b_1}{\\Delta}, \\quad x_2 = \\frac{a_1 c_2 - a_2 c_1}{\\Delta}$$<br>Indiquez : <code>INTERSECTION x1=&lt;x1 à 2 décimales&gt; x2=&lt;x2 à 2 décimales&gt; DELTA=&lt;Delta à 2 décimales&gt;</code>.</p>",
    "starter": "# Grille de calcul (ro2-c2-e2) — Intersection de deux droites par la règle de Cramer\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Intersection nette à coordonnées entières]\n# Données : 3,1,15;1,2,10\nA_COMPLETER\n\n[Cas 2 — Droites parallèles (pentes identiques)]\n# Données : 2,4,12;1,2,9\nA_COMPLETER\n\n[Cas 3 — Intersection avec coordonnées décimales]\n# Données : 2,3,13;4,1,11\nA_COMPLETER\n",
    "hints": [
      "Calcule delta = a1 * b2 - a2 * b1.",
      "Si abs(delta) < 1e-6, affiche le cas des droites parallèles."
    ],
    "examples": [
      {
        "stdin": "2,1,10;1,2,8",
        "expected": "INTERSECTION x1=4.00 x2=2.00 DELTA=3.00",
        "note": "Delta = 2*2 - 1*1 = 3. x1 = (10*2 - 8*1)/3 = 4. x2 = (2*8 - 1*10)/3 = 2."
      }
    ],
    "tests": [
      {
        "label": "Intersection nette à coordonnées entières",
        "stdin": "cas:1",
        "expected": "INTERSECTION x1=4.00 x2=3.00 DELTA=5.00"
      },
      {
        "label": "Droites parallèles (pentes identiques)",
        "stdin": "cas:2",
        "expected": "PARALLELES DELTA=0.0"
      },
      {
        "label": "Intersection avec coordonnées décimales",
        "stdin": "cas:3",
        "expected": "INTERSECTION x1=2.00 x2=3.00 DELTA=-10.00"
      }
    ],
    "solution": "[Exemple]\nINTERSECTION x1=4.00 x2=2.00 DELTA=3.00\n\n[Cas 1 — Intersection nette à coordonnées entières]\nINTERSECTION x1=4.00 x2=3.00 DELTA=5.00\n\n[Cas 2 — Droites parallèles (pentes identiques)]\nPARALLELES DELTA=0.0\n\n[Cas 3 — Intersection avec coordonnées décimales]\nINTERSECTION x1=2.00 x2=3.00 DELTA=-10.00\n"
  },
  {
    "id": "ro2-c2-e3",
    "chapter": 2,
    "title": "Résolution graphique par évaluation des sommets",
    "level": "n3",
    "language": "analyse",
    "goal": "Identifier le sommet optimal maximisant la fonction objectif dans la région réalisable.",
    "brief": "<p>D’après le théorème fondamental de la programmation linéaire, si un programme linéaire admet une solution optimale finie, au moins un des <strong>sommets du polyèdre réalisable</strong> est optimal.</p><p>Analysez les paramètres du problème pour chaque cas...</code> contenant :</p><ul>  <li>Les coefficients de la fonction objectif MAX $Z = c_1 x_1 + c_2 x_2$ ;</li>  <li>Les contraintes $a_{i1} x_1 + a_{i2} x_2 \\le b_i$ séparées par <code>|</code> ;</li>  <li>Une liste de sommets candidats $(x_1, x_2)$ séparés par <code>|</code>.</li></ul><p>Filtre les sommets réalisables (vérifiant $x_1 \\ge 0$, $x_2 \\ge 0$ et toutes les contraintes $\\le$).<br>Sélectionne le sommet réalisable qui maximise $Z$ et Indiquez :<br><code>OPTIMUM: (x1=&lt;x1&gt;, x2=&lt;x2&gt;) Z=&lt;Z max à 1 décimale&gt;</code>.<br>Si aucun sommet n’est réalisable, Indiquez : <code>REGION_VIDE</code>.</p>",
    "starter": "# Grille de calcul (ro2-c2-e3) — Résolution graphique par évaluation des sommets\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Quatre sommets avec optimum intérieur]\n# Données : 4,3;1,1,8|2,1,12;0,0|6,0|0,8|4,4\nA_COMPLETER\n\n[Cas 2 — Optimum situé sur un axe]\n# Données : 10,2;1,1,5|3,1,9;0,0|3,0|0,5|2,3\nA_COMPLETER\n\n[Cas 3 — Tous les sommets proposés sont hors de la région réalisable]\n# Données : 5,5;1,1,4|2,1,6;10,10|5,5|0,8\nA_COMPLETER\n",
    "hints": [
      "Parse les contraintes dans une liste de tuples (a1, a2, b).",
      "Pour chaque sommet, vérifie qu'il satisfait chaque contrainte (avec marge EPS) et compare Z."
    ],
    "examples": [
      {
        "stdin": "3,5;2,1,16|1,2,11;0,0|8,0|0,5.5|7,2|9,1",
        "expected": "OPTIMUM: (x1=7.0, x2=2.0) Z=31.0",
        "note": "Sommets réalisables : (0,0)->Z=0, (8,0)->Z=24, (0,5.5)->Z=27.5, (7,2)->Z=31.0. Le point (9,1) viole la contrainte 1 (2*9+1=19 > 16)."
      }
    ],
    "tests": [
      {
        "label": "Quatre sommets avec optimum intérieur",
        "stdin": "cas:1",
        "expected": "OPTIMUM: (x1=4.0, x2=4.0) Z=28.0"
      },
      {
        "label": "Optimum situé sur un axe",
        "stdin": "cas:2",
        "expected": "OPTIMUM: (x1=3.0, x2=0.0) Z=30.0"
      },
      {
        "label": "Tous les sommets proposés sont hors de la région réalisable",
        "stdin": "cas:3",
        "expected": "REGION_VIDE"
      }
    ],
    "solution": "[Exemple]\nOPTIMUM: (x1=7.0, x2=2.0) Z=31.0\n\n[Cas 1 — Quatre sommets avec optimum intérieur]\nOPTIMUM: (x1=4.0, x2=4.0) Z=28.0\n\n[Cas 2 — Optimum situé sur un axe]\nOPTIMUM: (x1=3.0, x2=0.0) Z=30.0\n\n[Cas 3 — Tous les sommets proposés sont hors de la région réalisable]\nREGION_VIDE\n"
  }
];
