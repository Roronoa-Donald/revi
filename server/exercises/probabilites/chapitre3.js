/**
 * Chapitre 3 — Probabilités B2.
 * Mode d'évaluation mathématique structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    "id": "pb2-c3-e1",
    "chapter": 3,
    "level": "n1",
    "language": "analyse",
    "title": "Espérance d’une loi discrète",
    "goal": "Calculer E(X) = Σ xᵢ · pᵢ pour une loi discrète donnée.",
    "brief": "<p>Dans cette étude, on considère un entier <code>n</code>, puis <code>n</code> lignes au format <code>valeur probabilité</code>. Indiquez l’<strong>espérance</strong> <code>E(X) = Σ xᵢ · pᵢ</code> arrondie à 4 décimales.</p>",
    "starter": "# Grille de calcul (pb2-c3-e1) — Espérance d’une loi discrète\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Trois valeurs]\n# Données : 3\n# Données : 1 0.2\n# Données : 2 0.3\n# Données : 3 0.5\nA_COMPLETER\n\n[Cas 2 — Valeur certaine]\n# Données : 1\n# Données : 5 1.0\nA_COMPLETER\n\n[Cas 3 — Valeurs opposées]\n# Données : 2\n# Données : -1 0.5\n# Données : 1 0.5\nA_COMPLETER\n",
    "hints": [
      "Chaque ligne contient une valeur et une probabilité : convertis la valeur avec float (une valeur négative est possible).",
      "Calculez la somme des produits valeur × probabilité et arrondissez l'espérance mathématique à 4 décimales."
    ],
    "examples": [
      {
        "stdin": "2\n0 0.5\n1 0.5",
        "expected": "0.5000",
        "note": "Pile ou face équilibré : espérance 0,5."
      }
    ],
    "tests": [
      {
        "label": "Trois valeurs",
        "stdin": "cas:1",
        "expected": "2.3000"
      },
      {
        "label": "Valeur certaine",
        "stdin": "cas:2",
        "expected": "5.0000"
      },
      {
        "label": "Valeurs opposées",
        "stdin": "cas:3",
        "expected": "0.0000"
      }
    ],
    "solution": "[Exemple]\n0.5000\n\n[Cas 1 — Trois valeurs]\n2.3000\n\n[Cas 2 — Valeur certaine]\n5.0000\n\n[Cas 3 — Valeurs opposées]\n0.0000\n"
  },
  {
    "id": "pb2-c3-e2",
    "chapter": 3,
    "level": "n2",
    "language": "analyse",
    "title": "Variance d’une loi discrète",
    "goal": "Calculer V(X) = E(X²) − E(X)² pour une loi discrète donnée.",
    "brief": "<p>Dans cette étude, on considère un entier <code>n</code>, puis <code>n</code> lignes <code>valeur probabilité</code>. Indiquez la <strong>variance</strong> <code>V(X) = E(X²) − E(X)²</code> arrondie à 4 décimales.</p>",
    "starter": "# Grille de calcul (pb2-c3-e2) — Variance d’une loi discrète\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Déséquilibré]\n# Données : 2\n# Données : 0 0.3\n# Données : 1 0.7\nA_COMPLETER\n\n[Cas 2 — Trois valeurs]\n# Données : 3\n# Données : 1 0.2\n# Données : 2 0.5\n# Données : 3 0.3\nA_COMPLETER\n\n[Cas 3 — Valeur certaine]\n# Données : 1\n# Données : 2 1.0\nA_COMPLETER\n",
    "hints": [
      "Calculez E(X) et E(X²) dans la même boucle : E(X²) = Σ xᵢ² · pᵢ.",
      "La variance est E(X²) − E(X)² ; attention, il faut élever E(X) au carré après l’avoir calculé."
    ],
    "examples": [
      {
        "stdin": "2\n0 0.5\n1 0.5",
        "expected": "0.2500",
        "note": "E(X)=0,5 et E(X²)=0,5, donc V=0,25."
      }
    ],
    "tests": [
      {
        "label": "Déséquilibré",
        "stdin": "cas:1",
        "expected": "0.2100"
      },
      {
        "label": "Trois valeurs",
        "stdin": "cas:2",
        "expected": "0.4900"
      },
      {
        "label": "Valeur certaine",
        "stdin": "cas:3",
        "expected": "0.0000"
      }
    ],
    "solution": "[Exemple]\n0.2500\n\n[Cas 1 — Déséquilibré]\n0.2100\n\n[Cas 2 — Trois valeurs]\n0.4900\n\n[Cas 3 — Valeur certaine]\n0.0000\n"
  },
  {
    "id": "pb2-c3-e3",
    "chapter": 3,
    "level": "n2",
    "language": "analyse",
    "title": "Fonction de répartition",
    "goal": "Calculer F(t) = P(X ≤ t) pour une loi discrète et un seuil donnés.",
    "brief": "<p>Dans cette étude, on considère un entier <code>n</code>, puis <code>n</code> lignes <code>valeur probabilité</code>, puis enfin un seuil <code>t</code>. Indiquez <code>F(t) = P(X ≤ t)</code> arrondie à 4 décimales (somme des probabilités des valeurs inférieures ou égales à <code>t</code>).</p>",
    "starter": "# Grille de calcul (pb2-c3-e3) — Fonction de répartition\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Seuil intermédiaire]\n# Données : 3\n# Données : 1 0.2\n# Données : 2 0.3\n# Données : 3 0.5\n# Données : 2\nA_COMPLETER\n\n[Cas 2 — Sous le minimum]\n# Données : 2\n# Données : 5 0.4\n# Données : 6 0.6\n# Données : 4\nA_COMPLETER\n\n[Cas 3 — Au-dessus du maximum]\n# Données : 2\n# Données : 5 0.4\n# Données : 6 0.6\n# Données : 10\nA_COMPLETER\n",
    "hints": [
      "Additionne les probabilités dont la valeur est inférieure ou égale au seuil t.",
      "Si aucune valeur n’est ≤ t, la répartition vaut 0 ; si toutes le sont, elle vaut 1."
    ],
    "examples": [
      {
        "stdin": "2\n0 0.3\n1 0.7\n0",
        "expected": "0.3000",
        "note": "P(X ≤ 0) = 0,3."
      }
    ],
    "tests": [
      {
        "label": "Seuil intermédiaire",
        "stdin": "cas:1",
        "expected": "0.5000"
      },
      {
        "label": "Sous le minimum",
        "stdin": "cas:2",
        "expected": "0.0000"
      },
      {
        "label": "Au-dessus du maximum",
        "stdin": "cas:3",
        "expected": "1.0000"
      }
    ],
    "solution": "[Exemple]\n0.3000\n\n[Cas 1 — Seuil intermédiaire]\n0.5000\n\n[Cas 2 — Sous le minimum]\n0.0000\n\n[Cas 3 — Au-dessus du maximum]\n1.0000\n"
  }
];
