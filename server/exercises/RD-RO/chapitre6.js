/**
 * Chapitre 6 — Recherche Opérationnelle B2.
 * Mode d'évaluation mathématique structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    "id": "ro2-c6-e1",
    "chapter": 6,
    "title": "Dates au plus tôt (Forward Pass PERT/CPM)",
    "level": "n1",
    "language": "analyse",
    "goal": "Calculer la date de début au plus tôt de chaque tâche et la durée totale du projet.",
    "brief": "<p>Dans un réseau d’ordonnancement sans cycle (DAG), la date de début au plus tôt $ES(i)$ d’une tâche $i$ est la date minimale à laquelle tous ses prédécesseurs immédiats sont achevés :<br>$$ES(i) = \\max_{p \\in Pred(i)} (ES(p) + d_p)$$<br>(avec $ES(racine) = 0$).</p><p>Analysez les paramètres du problème pour chaque cas...</code><br>où <code>preds</code> est une liste de noms séparés par des tirets (ex. <code>A-B</code>) ou <code>AUCUN</code>.<br>Indiquez :<br><code>DATES_ES: &lt;nom&gt;=&lt;ES&gt;,... DUREE_PROJET=&lt;Duree&gt;</code>.</p>",
    "starter": "# Grille de calcul (ro2-c6-e1) — Dates au plus tôt (Forward Pass PERT/CPM)\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Chaîne linéaire simple]\n# Données : A:AUCUN,4 | B:A,5 | C:B,6\nA_COMPLETER\n\n[Cas 2 — Deux branches parallèles convergeant vers une tâche]\n# Données : A:AUCUN,5 | B:AUCUN,8 | C:A-B,3\nA_COMPLETER\n\n[Cas 3 — Graphe à 5 nœuds]\n# Données : A:AUCUN,2 | B:A,3 | C:A,5 | D:B,4 | E:C-D,2\nA_COMPLETER\n",
    "hints": [
      "Parse chaque tâche dans un dictionnaire avec sa durée et ses prédécesseurs.",
      "Parcourez les tâches dans l'ordre de dépendance (ou itère jusqu'à stabilisation des dates ES)."
    ],
    "examples": [
      {
        "stdin": "A:AUCUN,3 | B:A,4 | C:A,2 | D:B-C,5",
        "expected": "DATES_ES: A=0,B=3,C=3,D=7 DUREE_PROJET=12",
        "note": "ES(A)=0. ES(B)=0+3=3. ES(C)=0+3=3. ES(D)=max(3+4, 3+2)=7. Fin D = 7+5=12."
      }
    ],
    "tests": [
      {
        "label": "Chaîne linéaire simple",
        "stdin": "cas:1",
        "expected": "DATES_ES: A=0,B=4,C=9 DUREE_PROJET=15"
      },
      {
        "label": "Deux branches parallèles convergeant vers une tâche",
        "stdin": "cas:2",
        "expected": "DATES_ES: A=0,B=0,C=8 DUREE_PROJET=11"
      },
      {
        "label": "Graphe à 5 nœuds",
        "stdin": "cas:3",
        "expected": "DATES_ES: A=0,B=2,C=2,D=5,E=9 DUREE_PROJET=11"
      }
    ],
    "solution": "[Exemple]\nDATES_ES: A=0,B=3,C=3,D=7 DUREE_PROJET=12\n\n[Cas 1 — Chaîne linéaire simple]\nDATES_ES: A=0,B=4,C=9 DUREE_PROJET=15\n\n[Cas 2 — Deux branches parallèles convergeant vers une tâche]\nDATES_ES: A=0,B=0,C=8 DUREE_PROJET=11\n\n[Cas 3 — Graphe à 5 nœuds]\nDATES_ES: A=0,B=2,C=2,D=5,E=9 DUREE_PROJET=11\n"
  },
  {
    "id": "ro2-c6-e2",
    "chapter": 6,
    "title": "Marges totales & Chemin critique",
    "level": "n2",
    "language": "analyse",
    "goal": "Calculer la marge totale de chaque tâche et identifier le chemin critique du projet.",
    "brief": "<p>La <strong>marge totale</strong> d’une tâche $i$ mesure le retard maximal qu’elle peut prendre sans retarder la date de fin globale du projet :<br>$$MT(i) = LF(i) - ES(i) - d_i$$où $ES$ est la date au plus tôt, $LF$ la date au plus tard d’achèvement, et $d_i$ la durée de la tâche.<br>Une tâche est dite <strong>critique</strong> si sa marge totale est nulle ($MT = 0$).</p><p>Analysez les paramètres du problème pour chaque cas...</code>.<br>Calculez la marge totale de chaque tâche.<br>Indiquez :<br><code>MARGES: nom=MT,... CRITIQUES: &lt;liste des tâches critiques séparées par des tirets&gt;</code>.</p>",
    "starter": "# Grille de calcul (ro2-c6-e2) — Marges totales & Chemin critique\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Toutes les tâches sont critiques (projet mono-branche)]\n# Données : A:0,4,4 | B:4,9,5 | C:9,12,3\nA_COMPLETER\n\n[Cas 2 — Deux tâches avec marge positive]\n# Données : A:0,5,5 | B:0,5,2 | C:2,8,3 | D:5,10,5\nA_COMPLETER\n\n[Cas 3 — Projet à 4 tâches avec bifurcation]\n# Données : X:0,2,2 | Y:2,6,4 | Z:2,6,1 | W:6,8,2\nA_COMPLETER\n",
    "hints": [
      "Pour chaque tâche, mt = lf - es - duree.",
      "Filtrez les tâches avec mt == 0 pour former la chaîne critique."
    ],
    "examples": [
      {
        "stdin": "A:0,3,3 | B:3,7,4 | C:3,7,2 | D:7,12,5",
        "expected": "MARGES: A=0,B=0,C=2,D=0 CRITIQUES: A-B-D",
        "note": "MT(A)=3-0-3=0, MT(B)=7-3-4=0, MT(C)=7-3-2=2, MT(D)=12-7-5=0. Tâches critiques : A, B, D."
      }
    ],
    "tests": [
      {
        "label": "Toutes les tâches sont critiques (projet mono-branche)",
        "stdin": "cas:1",
        "expected": "MARGES: A=0,B=0,C=0 CRITIQUES: A-B-C"
      },
      {
        "label": "Deux tâches avec marge positive",
        "stdin": "cas:2",
        "expected": "MARGES: A=0,B=3,C=3,D=0 CRITIQUES: A-D"
      },
      {
        "label": "Projet à 4 tâches avec bifurcation",
        "stdin": "cas:3",
        "expected": "MARGES: X=0,Y=0,Z=3,W=0 CRITIQUES: X-Y-W"
      }
    ],
    "solution": "[Exemple]\nMARGES: A=0,B=0,C=2,D=0 CRITIQUES: A-B-D\n\n[Cas 1 — Toutes les tâches sont critiques (projet mono-branche)]\nMARGES: A=0,B=0,C=0 CRITIQUES: A-B-C\n\n[Cas 2 — Deux tâches avec marge positive]\nMARGES: A=0,B=3,C=3,D=0 CRITIQUES: A-D\n\n[Cas 3 — Projet à 4 tâches avec bifurcation]\nMARGES: X=0,Y=0,Z=3,W=0 CRITIQUES: X-Y-W\n"
  },
  {
    "id": "ro2-c6-e3",
    "chapter": 6,
    "title": "Goulot d’étranglement de Ford-Fulkerson",
    "level": "n3",
    "language": "analyse",
    "goal": "Calculer la capacité résiduelle d’une chaîne augmentante et mettre à jour le flot dans un réseau.",
    "brief": "<p>Dans l’algorithme de Ford-Fulkerson pour la recherche du <strong>flot maximal</strong>, chaque arc $(u, v)$ possède une capacité $c(u, v)$ et un flot actuel $f(u, v)$. La capacité résiduelle est $r(u, v) = c(u, v) - f(u, v)$.</p><p>Pour une chaîne augmentante $P = (s, v_1, v_2, \\dots, t)$, la valeur maximale de flot que l’on peut pousser est déterminée par le <strong>goulot d’étranglement</strong> (bottleneck capacity) :<br>$$\\Delta = \\min_{(u, v) \\in P} r(u, v)$$</p><p>Analysez les paramètres du problème pour chaque cas... ; CHAINE: s-v1-v2-...-t</code>.<br>Calculez $\\Delta$ et les nouvelles capacités résiduelles des arcs de la chaîne.<br>Indiquez :<br><code>DELTA=&lt;Delta&gt; ARCS_MAJ: u1-v1=&lt;nouveau_flot&gt;,...</code>.</p>",
    "starter": "# Grille de calcul (ro2-c6-e3) — Goulot d’étranglement de Ford-Fulkerson\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Chaîne à trois arcs avec saturation exacte]\n# Données : s-1:15,5 | 1-2:10,2 | 2-t:8,4 ; CHAINE: s-1-2-t\nA_COMPLETER\n\n[Cas 2 — Chaîne saturée dès le premier arc]\n# Données : s-A:6,3 | A-t:12,1 ; CHAINE: s-A-t\nA_COMPLETER\n\n[Cas 3 — Graphe avec réseau maillé]\n# Données : s-u:20,10 | u-v:14,4 | v-t:18,12 ; CHAINE: s-u-v-t\nA_COMPLETER\n",
    "hints": [
      "Découpez par \";\" pour séparer le réseau de la chaîne à augmenter.",
      "Pour chaque arc consécutif de la chaîne, calcule r = cap - flot et trouve min(r)."
    ],
    "examples": [
      {
        "stdin": "s-a:10,2 | a-t:8,1 | s-b:5,0 | b-t:5,0 ; CHAINE: s-a-t",
        "expected": "DELTA=7 ARCS_MAJ: s-a=9,a-t=8",
        "note": "Sur la chaîne s-a-t : r(s-a) = 10 - 2 = 8, r(a-t) = 8 - 1 = 7. Delta = min(8, 7) = 7. Nouveaux flots : s-a = 2+7 = 9, a-t = 1+7 = 8."
      }
    ],
    "tests": [
      {
        "label": "Chaîne à trois arcs avec saturation exacte",
        "stdin": "cas:1",
        "expected": "DELTA=4 ARCS_MAJ: s-1=9,1-2=6,2-t=8"
      },
      {
        "label": "Chaîne saturée dès le premier arc",
        "stdin": "cas:2",
        "expected": "DELTA=3 ARCS_MAJ: s-A=6,A-t=4"
      },
      {
        "label": "Graphe avec réseau maillé",
        "stdin": "cas:3",
        "expected": "DELTA=6 ARCS_MAJ: s-u=16,u-v=10,v-t=18"
      }
    ],
    "solution": "[Exemple]\nDELTA=7 ARCS_MAJ: s-a=9,a-t=8\n\n[Cas 1 — Chaîne à trois arcs avec saturation exacte]\nDELTA=4 ARCS_MAJ: s-1=9,1-2=6,2-t=8\n\n[Cas 2 — Chaîne saturée dès le premier arc]\nDELTA=3 ARCS_MAJ: s-A=6,A-t=4\n\n[Cas 3 — Graphe avec réseau maillé]\nDELTA=6 ARCS_MAJ: s-u=16,u-v=10,v-t=18\n"
  }
];
