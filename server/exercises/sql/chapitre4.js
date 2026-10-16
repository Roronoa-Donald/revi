'use strict';

module.exports = [
  {
    "id": "sql2-c4-e1",
    "chapter": 4,
    "title": "Moteur GROUP BY avec agrégation et clause HAVING",
    "level": "n1",
    "language": "analyse",
    "goal": "Agréger des salaires par département (COUNT, SUM, AVG) et filtrer les groupes avec HAVING.",
    "brief": "<p>Le script simule la requête :\n<code>SELECT dept, COUNT(*), SUM(salaire), ROUND(AVG(salaire), 2) FROM Employes GROUP BY dept HAVING SUM(salaire) &gt;= seuil ORDER BY dept</code>\n\nEntrée :\n- Ligne 1 : Le seuil minimal pour la clause <code>HAVING SUM(salaire) &gt;= seuil</code>.\n- Ligne 2 : Liste des employés <code>nom:dept:salaire</code> séparés par des virgules.\n\nSortie :\nPour chaque département satisfaisant la clause HAVING (triés par ordre alphabétique de département) :\n<code>&lt;dept&gt; | COUNT: &lt;N&gt; | SUM: &lt;Total&gt; | AVG: &lt;Moyenne.2f&gt;</code> (ou <code>AUCUN DEPARTEMENT</code>).</p>",
    "starter": "# Grille d'analyse (sql2-c4-e1) — Moteur GROUP BY avec agrégation et clause HAVING\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Tous les départements passent le seuil]\n# Données : 2000\n# Données : Alice:IT:3000,Bob:RH:2500,Claire:COMM:2200\nA_COMPLETER\n\n[Cas 2 — Aucun département ne passe le seuil]\n# Données : 10000\n# Données : Alice:IT:3000,Claire:IT:3000,Bob:RH:2000\nA_COMPLETER\n\n[Cas 3 — Département unique avec moyenne décimale]\n# Données : 4000\n# Données : A:DEV:2000,B:DEV:2500,C:DEV:2200\nA_COMPLETER\n",
    "hints": [
      "Utilise un dictionnaire avec le nom du département comme clé pour stocker la liste des salaires.",
      "Calcule le total (SUM), l effectif (COUNT) et la moyenne (AVG = SUM / COUNT).",
      "Filtre avec la condition sum >= seuil et trie les clés par ordre alphabétique."
    ],
    "examples": [
      {
        "stdin": "5000\nAlice:IT:3200,Bob:RH:2200,Claire:IT:2800,David:RH:2500,Eva:VENTES:6000",
        "expected": "IT | COUNT: 2 | SUM: 6000 | AVG: 3000.00\nVENTES | COUNT: 1 | SUM: 6000 | AVG: 6000.00",
        "note": "RH a une somme de 4700 < 5000, il est donc éliminé par la clause HAVING."
      }
    ],
    "tests": [
      {
        "label": "Tous les départements passent le seuil",
        "stdin": "cas:1",
        "expected": "COMM | COUNT: 1 | SUM: 2200 | AVG: 2200.00\nIT | COUNT: 1 | SUM: 3000 | AVG: 3000.00\nRH | COUNT: 1 | SUM: 2500 | AVG: 2500.00"
      },
      {
        "label": "Aucun département ne passe le seuil",
        "stdin": "cas:2",
        "expected": "AUCUN DEPARTEMENT"
      },
      {
        "label": "Département unique avec moyenne décimale",
        "stdin": "cas:3",
        "expected": "DEV | COUNT: 3 | SUM: 6700 | AVG: 2233.33"
      }
    ],
    "solution": "[Exemple]\nIT | COUNT: 2 | SUM: 6000 | AVG: 3000.00\nVENTES | COUNT: 1 | SUM: 6000 | AVG: 6000.00\n\n[Cas 1 — Tous les départements passent le seuil]\nCOMM | COUNT: 1 | SUM: 2200 | AVG: 2200.00\nIT | COUNT: 1 | SUM: 3000 | AVG: 3000.00\nRH | COUNT: 1 | SUM: 2500 | AVG: 2500.00\n\n[Cas 2 — Aucun département ne passe le seuil]\nAUCUN DEPARTEMENT\n\n[Cas 3 — Département unique avec moyenne décimale]\nDEV | COUNT: 3 | SUM: 6700 | AVG: 2233.33"
  },
  {
    "id": "sql2-c4-e2",
    "chapter": 4,
    "title": "Fonction de fenêtrage ROW_NUMBER() OVER (PARTITION BY ... ORDER BY ...)",
    "level": "n2",
    "language": "analyse",
    "goal": "Calculer les numéros de ligne partitionnés par catégorie et triés par score décroissant.",
    "brief": "<p>En SQL moderne, les fonctions de fenêtrage (Window Functions) calculent des valeurs relatives sans regrouper (aplatir) les lignes.\nLe script simule la fonction analytique :\n<code>ROW_NUMBER() OVER (PARTITION BY equipe ORDER BY score DESC, nom ASC)</code>\n\nEntrée :\nUne liste de membres <code>nom:equipe:score</code> séparés par des virgules.\n\nSortie :\nPour chaque membre (trié par équipe alphabétique, puis par row_number croissant) :\n<code>&lt;equipe&gt; | Rang: &lt;row_number&gt; | &lt;nom&gt; (&lt;score&gt;)</code>.</p>",
    "starter": "# Grille d'analyse (sql2-c4-e2) — Fonction de fenêtrage ROW_NUMBER() OVER (PARTITION BY ... ORDER BY ...)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Une seule équipe]\n# Données : Marc:DEV:50,Luc:DEV:85,Zoe:DEV:92\nA_COMPLETER\n\n[Cas 2 — Membres avec scores identiques]\n# Données : Paul:X:100,Alain:X:100,Benoit:X:100\nA_COMPLETER\n\n[Cas 3 — Plusieurs équipes distinctes de taille 1]\n# Données : A:T1:10,B:T2:20,C:T3:30\nA_COMPLETER\n",
    "hints": [
      "Regroupe les membres par équipe dans un dictionnaire.",
      "Pour chaque équipe, trie les membres par score décroissant (-score), puis nom alphabétique.",
      "Attribue un numéro 1, 2, 3... à chaque membre au sein de sa partition."
    ],
    "examples": [
      {
        "stdin": "Alice:A:95,Bob:B:80,Claire:A:98,David:B:80,Eva:A:90",
        "expected": "A | Rang: 1 | Claire (98)\nA | Rang: 2 | Alice (95)\nA | Rang: 3 | Eva (90)\nB | Rang: 1 | Bob (80)\nB | Rang: 2 | David (80)",
        "note": "Claire est première dans l'équipe A, Alice deuxième. Dans l'équipe B, Bob et David ont le même score, départagés par nom."
      }
    ],
    "tests": [
      {
        "label": "Une seule équipe",
        "stdin": "cas:1",
        "expected": "DEV | Rang: 1 | Zoe (92)\nDEV | Rang: 2 | Luc (85)\nDEV | Rang: 3 | Marc (50)"
      },
      {
        "label": "Membres avec scores identiques",
        "stdin": "cas:2",
        "expected": "X | Rang: 1 | Alain (100)\nX | Rang: 2 | Benoit (100)\nX | Rang: 3 | Paul (100)"
      },
      {
        "label": "Plusieurs équipes distinctes de taille 1",
        "stdin": "cas:3",
        "expected": "T1 | Rang: 1 | A (10)\nT2 | Rang: 1 | B (20)\nT3 | Rang: 1 | C (30)"
      }
    ],
    "solution": "[Exemple]\nA | Rang: 1 | Claire (98)\nA | Rang: 2 | Alice (95)\nA | Rang: 3 | Eva (90)\nB | Rang: 1 | Bob (80)\nB | Rang: 2 | David (80)\n\n[Cas 1 — Une seule équipe]\nDEV | Rang: 1 | Zoe (92)\nDEV | Rang: 2 | Luc (85)\nDEV | Rang: 3 | Marc (50)\n\n[Cas 2 — Membres avec scores identiques]\nX | Rang: 1 | Alain (100)\nX | Rang: 2 | Benoit (100)\nX | Rang: 3 | Paul (100)\n\n[Cas 3 — Plusieurs équipes distinctes de taille 1]\nT1 | Rang: 1 | A (10)\nT2 | Rang: 1 | B (20)\nT3 | Rang: 1 | C (30)"
  },
  {
    "id": "sql2-c4-e3",
    "chapter": 4,
    "title": "Fonction de décalage LAG() OVER (ORDER BY ...) et variation temporelle",
    "level": "n3",
    "language": "analyse",
    "goal": "Calculer la différence entre la valeur courante et la valeur précédente selon la fonction LAG().",
    "brief": "<p>La fonction <code>LAG(valeur, 1, defaut) OVER (ORDER BY date ASC)</code> permet d’accéder à la valeur de la ligne précédente pour calculer l’évolution relative (delta).\n\nEntrée :\nUne séquence chronologique de couples <code>date:valeur</code> séparés par des virgules (ex: <code>2026-01:100,2026-02:130,2026-03:110</code>).\n\nSortie :\nPour chaque date (dans l’ordre chronologique de l’entrée) :\n<code>&lt;date&gt; | Actuel: &lt;val&gt; | Precedent: &lt;lag_val&gt; | Delta: &lt;+delta/-delta/0&gt;</code>\n(Pour la toute première ligne, où il n’y a pas de ligne antérieure, <code>Precedent: NULL | Delta: NULL</code>).</p>",
    "starter": "# Grille d'analyse (sql2-c4-e3) — Fonction de décalage LAG() OVER (ORDER BY ...) et variation temporelle\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Progression continue positive]\n# Données : T1:10,T2:25,T3:40\nA_COMPLETER\n\n[Cas 2 — Baisse continue]\n# Données : M1:500,M2:420,M3:390\nA_COMPLETER\n\n[Cas 3 — Valeur unique]\n# Données : 2026-01:250\nA_COMPLETER\n",
    "hints": [
      "Garde une variable pour mémoriser la valeur de l étape précédente.",
      "Si c est la première ligne, affiche Precedent: NULL | Delta: NULL.",
      "Pour les lignes suivantes, préfixe les deltas positifs d un signe + (ex: +30) ou négatifs (-20)."
    ],
    "examples": [
      {
        "stdin": "2026-01:100,2026-02:130,2026-03:110,2026-04:110",
        "expected": "2026-01 | Actuel: 100 | Precedent: NULL | Delta: NULL\n2026-02 | Actuel: 130 | Precedent: 100 | Delta: +30\n2026-03 | Actuel: 110 | Precedent: 130 | Delta: -20\n2026-04 | Actuel: 110 | Precedent: 110 | Delta: 0",
        "note": "LAG() permet de comparer directement chaque valeur à celle de la période antérieure."
      }
    ],
    "tests": [
      {
        "label": "Progression continue positive",
        "stdin": "cas:1",
        "expected": "T1 | Actuel: 10 | Precedent: NULL | Delta: NULL\nT2 | Actuel: 25 | Precedent: 10 | Delta: +15\nT3 | Actuel: 40 | Precedent: 25 | Delta: +15"
      },
      {
        "label": "Baisse continue",
        "stdin": "cas:2",
        "expected": "M1 | Actuel: 500 | Precedent: NULL | Delta: NULL\nM2 | Actuel: 420 | Precedent: 500 | Delta: -80\nM3 | Actuel: 390 | Precedent: 420 | Delta: -30"
      },
      {
        "label": "Valeur unique",
        "stdin": "cas:3",
        "expected": "2026-01 | Actuel: 250 | Precedent: NULL | Delta: NULL"
      }
    ],
    "solution": "[Exemple]\n2026-01 | Actuel: 100 | Precedent: NULL | Delta: NULL\n2026-02 | Actuel: 130 | Precedent: 100 | Delta: +30\n2026-03 | Actuel: 110 | Precedent: 130 | Delta: -20\n2026-04 | Actuel: 110 | Precedent: 110 | Delta: 0\n\n[Cas 1 — Progression continue positive]\nT1 | Actuel: 10 | Precedent: NULL | Delta: NULL\nT2 | Actuel: 25 | Precedent: 10 | Delta: +15\nT3 | Actuel: 40 | Precedent: 25 | Delta: +15\n\n[Cas 2 — Baisse continue]\nM1 | Actuel: 500 | Precedent: NULL | Delta: NULL\nM2 | Actuel: 420 | Precedent: 500 | Delta: -80\nM3 | Actuel: 390 | Precedent: 420 | Delta: -30\n\n[Cas 3 — Valeur unique]\n2026-01 | Actuel: 250 | Precedent: NULL | Delta: NULL"
  }
];
