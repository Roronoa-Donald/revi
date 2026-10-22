/**
 * Chapitre 4 — Probabilités B2.
 * Mode d'évaluation mathématique structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    "id": "pb2-c4-e1",
    "chapter": 4,
    "level": "n2",
    "language": "analyse",
    "title": "Loi binomiale — probabilité",
    "goal": "Calculer P(X = k) pour X suivant une loi binomiale B(n, p).",
    "brief": "<p>Dans cette étude, on considère un entier <code>n</code>, un entier <code>k</code>, puis un décimal <code>p</code>. Indiquez <code>P(X = k) = C(n,k)·pᵏ·(1−p)ⁿ⁻ᵏ</code> arrondie à 4 décimales.</p>",
    "starter": "# Grille de calcul (pb2-c4-e1) — Loi binomiale — probabilité\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Un succès]\n# Données : 4\n# Données : 1\n# Données : 0.5\nA_COMPLETER\n\n[Cas 2 — Tous les succès]\n# Données : 3\n# Données : 3\n# Données : 0.5\nA_COMPLETER\n\n[Cas 3 — Aucun succès]\n# Données : 10\n# Données : 0\n# Données : 0.2\nA_COMPLETER\n",
    "hints": [
      "Le coefficient binomial se calcule avec comb(n, k) du module math.",
      "Multiplie-le par p ** k puis par (1 - p) ** (n - k), et formate le résultat sur 4 décimales."
    ],
    "examples": [
      {
        "stdin": "5\n2\n0.5",
        "expected": "0.3125",
        "note": "C(5,2)·0,5²·0,5³ = 10 × 0,03125."
      }
    ],
    "tests": [
      {
        "label": "Un succès",
        "stdin": "cas:1",
        "expected": "0.2500"
      },
      {
        "label": "Tous les succès",
        "stdin": "cas:2",
        "expected": "0.1250"
      },
      {
        "label": "Aucun succès",
        "stdin": "cas:3",
        "expected": "0.1074"
      }
    ],
    "solution": "[Exemple]\n0.3125\n\n[Cas 1 — Un succès]\n0.2500\n\n[Cas 2 — Tous les succès]\n0.1250\n\n[Cas 3 — Aucun succès]\n0.1074\n"
  },
  {
    "id": "pb2-c4-e2",
    "chapter": 4,
    "level": "n2",
    "language": "analyse",
    "title": "Loi binomiale — espérance et variance",
    "goal": "Retenir E(X) = np et V(X) = np(1−p) pour une loi binomiale.",
    "brief": "<p>Dans cette étude, on considère un entier <code>n</code> puis un décimal <code>p</code>. Indiquez l’<strong>espérance</strong> <code>E(X) = np</code> puis la <strong>variance</strong> <code>V(X) = np(1−p)</code>, chacune sur sa ligne, arrondies à 4 décimales et précédées de <code>E = </code> et <code>V = </code>.</p>",
    "starter": "# Grille de calcul (pb2-c4-e2) — Loi binomiale — espérance et variance\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Vingt épreuves]\n# Données : 20\n# Données : 0.3\nA_COMPLETER\n\n[Cas 2 — Cinq épreuves]\n# Données : 5\n# Données : 0.5\nA_COMPLETER\n\n[Cas 3 — Cent épreuves]\n# Données : 100\n# Données : 0.1\nA_COMPLETER\n",
    "hints": [
      "L’espérance d’une loi binomiale vaut simplement n·p.",
      "La variance vaut n·p·(1−p) : n’oublie pas le facteur (1−p)."
    ],
    "examples": [
      {
        "stdin": "10\n0.5",
        "expected": "E = 5.0000\nV = 2.5000",
        "note": "Dix épreuves équilibrées : E=5, V=2,5."
      }
    ],
    "tests": [
      {
        "label": "Vingt épreuves",
        "stdin": "cas:1",
        "expected": "E = 6.0000\nV = 4.2000"
      },
      {
        "label": "Cinq épreuves",
        "stdin": "cas:2",
        "expected": "E = 2.5000\nV = 1.2500"
      },
      {
        "label": "Cent épreuves",
        "stdin": "cas:3",
        "expected": "E = 10.0000\nV = 9.0000"
      }
    ],
    "solution": "[Exemple]\nE = 5.0000\nV = 2.5000\n\n[Cas 1 — Vingt épreuves]\nE = 6.0000\nV = 4.2000\n\n[Cas 2 — Cinq épreuves]\nE = 2.5000\nV = 1.2500\n\n[Cas 3 — Cent épreuves]\nE = 10.0000\nV = 9.0000\n"
  },
  {
    "id": "pb2-c4-e3",
    "chapter": 4,
    "level": "n3",
    "language": "analyse",
    "title": "Loi de Poisson",
    "goal": "Calculer P(X = k) pour X suivant une loi de Poisson de paramètre λ.",
    "brief": "<p>Dans cette étude, on considère un décimal <code>lambda</code> (λ) puis un entier <code>k</code>. Indiquez <code>P(X = k) = λᵏ · e^(−λ) / k!</code> arrondie à 4 décimales.</p>",
    "starter": "# Grille de calcul (pb2-c4-e3) — Loi de Poisson\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Aucun événement]\n# Données : 3\n# Données : 0\nA_COMPLETER\n\n[Cas 2 — Deux événements]\n# Données : 1\n# Données : 2\nA_COMPLETER\n\n[Cas 3 — Quatre événements]\n# Données : 4\n# Données : 4\nA_COMPLETER\n",
    "hints": [
      "La probabilité vaut (λ ** k) * exp(-λ) / factorial(k).",
      "Utilisez exp(-lam) plutôt que la constante e : c’est la fonction du module math."
    ],
    "examples": [
      {
        "stdin": "2\n1",
        "expected": "0.2707",
        "note": "λ=2 et k=1 : 2·e⁻² ≈ 0,2707."
      }
    ],
    "tests": [
      {
        "label": "Aucun événement",
        "stdin": "cas:1",
        "expected": "0.0498"
      },
      {
        "label": "Deux événements",
        "stdin": "cas:2",
        "expected": "0.1839"
      },
      {
        "label": "Quatre événements",
        "stdin": "cas:3",
        "expected": "0.1954"
      }
    ],
    "solution": "[Exemple]\n0.2707\n\n[Cas 1 — Aucun événement]\n0.0498\n\n[Cas 2 — Deux événements]\n0.1839\n\n[Cas 3 — Quatre événements]\n0.1954\n"
  }
];
