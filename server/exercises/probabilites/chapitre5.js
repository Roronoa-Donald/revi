/**
 * Chapitre 5 — Probabilités B2.
 * Mode d'évaluation mathématique structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    "id": "pb2-c5-e1",
    "chapter": 5,
    "level": "n2",
    "language": "analyse",
    "title": "Loi uniforme continue",
    "goal": "Calculer P(X ≤ x) pour X uniforme sur [a, b].",
    "brief": "<p>Dans cette étude, on considère trois décimaux : <code>a</code>, <code>b</code> (bornes, avec <code>a &lt; b</code>) puis <code>x</code>. Pour une loi uniforme continue sur <code>[a, b]</code>, la fonction de répartition vaut <code>F(x) = (x−a)/(b−a)</code>, ramenée à 0 si <code>x &lt; a</code> et à 1 si <code>x &gt; b</code>. Indiquez <code>F(x)</code> avec 4 décimales.</p>",
    "starter": "# Grille de calcul (pb2-c5-e1) — Loi uniforme continue\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Milieu d’un autre intervalle]\n# Données : 1\n# Données : 5\n# Données : 3\nA_COMPLETER\n\n[Cas 2 — Sous la borne inférieure]\n# Données : 0\n# Données : 10\n# Données : 0\nA_COMPLETER\n\n[Cas 3 — Au-dessus de la borne supérieure]\n# Données : 0\n# Données : 10\n# Données : 12\nA_COMPLETER\n",
    "hints": [
      "Commence par « ramener » x dans l’intervalle : si x est sous a, le résultat vaut 0 ; au-dessus de b, il vaut 1.",
      "Au milieu, la répartition vaut (x - a) / (b - a)."
    ],
    "examples": [
      {
        "stdin": "0\n2\n1",
        "expected": "0.5000",
        "note": "Le point 1 est le milieu de [0, 2]."
      }
    ],
    "tests": [
      {
        "label": "Milieu d’un autre intervalle",
        "stdin": "cas:1",
        "expected": "0.5000"
      },
      {
        "label": "Sous la borne inférieure",
        "stdin": "cas:2",
        "expected": "0.0000"
      },
      {
        "label": "Au-dessus de la borne supérieure",
        "stdin": "cas:3",
        "expected": "1.0000"
      }
    ],
    "solution": "[Exemple]\n0.5000\n\n[Cas 1 — Milieu d’un autre intervalle]\n0.5000\n\n[Cas 2 — Sous la borne inférieure]\n0.0000\n\n[Cas 3 — Au-dessus de la borne supérieure]\n1.0000\n"
  },
  {
    "id": "pb2-c5-e2",
    "chapter": 5,
    "level": "n2",
    "language": "analyse",
    "title": "Loi exponentielle",
    "goal": "Calculer P(X ≥ x) = e^(−λx) pour une loi exponentielle.",
    "brief": "<p>Dans cette étude, on considère un décimal <code>lambda</code> (λ &gt; 0) puis un décimal <code>x</code> (positif). Indiquez la probabilité de dépassement <code>P(X ≥ x) = e^(−λx)</code> avec 4 décimales.</p>",
    "starter": "# Grille de calcul (pb2-c5-e2) — Loi exponentielle\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Deux fois un demi]\n# Données : 2\n# Données : 0.5\nA_COMPLETER\n\n[Cas 2 — Petit taux]\n# Données : 0.5\n# Données : 4\nA_COMPLETER\n\n[Cas 3 — Taux élevé]\n# Données : 3\n# Données : 2\nA_COMPLETER\n",
    "hints": [
      "La probabilité de dépassement de la loi exponentielle est exp(-lam * x).",
      "Une seule ligne suffit : le produit λ·x se calcule avant l’exponentielle."
    ],
    "examples": [
      {
        "stdin": "1\n1",
        "expected": "0.3679",
        "note": "e⁻¹ ≈ 0,3679."
      }
    ],
    "tests": [
      {
        "label": "Deux fois un demi",
        "stdin": "cas:1",
        "expected": "0.3679"
      },
      {
        "label": "Petit taux",
        "stdin": "cas:2",
        "expected": "0.1353"
      },
      {
        "label": "Taux élevé",
        "stdin": "cas:3",
        "expected": "0.0025"
      }
    ],
    "solution": "[Exemple]\n0.3679\n\n[Cas 1 — Deux fois un demi]\n0.3679\n\n[Cas 2 — Petit taux]\n0.1353\n\n[Cas 3 — Taux élevé]\n0.0025\n"
  },
  {
    "id": "pb2-c5-e3",
    "chapter": 5,
    "level": "n3",
    "language": "analyse",
    "title": "Loi normale centrée réduite",
    "goal": "Calculer Φ(z) = P(Z ≤ z) pour la loi normale centrée réduite.",
    "brief": "<p>Dans cette étude, on considère un décimal <code>z</code>. Indiquez la probabilité <code>Φ(z) = P(Z ≤ z)</code> de la loi normale centrée réduite, arrondie à 4 décimales. On la calcule par la fonction d’erreur : <code>Φ(z) = 0,5 · (1 + erf(z/√2))</code>.</p>",
    "starter": "# Grille de calcul (pb2-c5-e3) — Loi normale centrée réduite\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Quantile 1,96]\n# Données : 1.96\nA_COMPLETER\n\n[Cas 2 — Un écart-type en dessous]\n# Données : -1\nA_COMPLETER\n\n[Cas 3 — Deux écarts-types]\n# Données : 2\nA_COMPLETER\n",
    "hints": [
      "Effectuez le calcul arithmétique correspondant.",
      "La formule complète est 0.5 * (1 + erf(z / sqrt(2)))."
    ],
    "examples": [
      {
        "stdin": "0",
        "expected": "0.5000",
        "note": "Φ(0) = 0,5 par symétrie."
      }
    ],
    "tests": [
      {
        "label": "Quantile 1,96",
        "stdin": "cas:1",
        "expected": "0.9750"
      },
      {
        "label": "Un écart-type en dessous",
        "stdin": "cas:2",
        "expected": "0.1587"
      },
      {
        "label": "Deux écarts-types",
        "stdin": "cas:3",
        "expected": "0.9772"
      }
    ],
    "solution": "[Exemple]\n0.5000\n\n[Cas 1 — Quantile 1,96]\n0.9750\n\n[Cas 2 — Un écart-type en dessous]\n0.1587\n\n[Cas 3 — Deux écarts-types]\n0.9772\n"
  }
];
