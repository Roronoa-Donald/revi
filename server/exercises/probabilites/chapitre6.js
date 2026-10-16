/**
 * Chapitre 6 — Probabilités B2.
 * Mode d'évaluation mathématique structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    "id": "pb2-c6-e1",
    "chapter": 6,
    "level": "n2",
    "language": "analyse",
    "title": "Inégalité de Markov",
    "goal": "Appliquer la borne de Markov P(X ≥ a) ≤ E(X)/a.",
    "brief": "<p>Dans cette étude, on considère deux décimaux : <code>esperance</code> (E(X), positive) puis <code>a</code> (a &gt; 0). Indiquez la borne de Markov <code>E(X)/a</code> arrondie à 4 décimales.</p>",
    "starter": "# Grille de calcul (pb2-c6-e1) — Inégalité de Markov\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Seuil plus grand]\n# Données : 6\n# Données : 10\nA_COMPLETER\n\n[Cas 2 — Grand seuil]\n# Données : 2\n# Données : 8\nA_COMPLETER\n\n[Cas 3 — Seuil modeste]\n# Données : 10\n# Données : 4\nA_COMPLETER\n",
    "hints": [
      "L’inégalité de Markov affirme P(X ≥ a) ≤ E(X)/a pour une variable positive.",
      "La « borne » demandée est donc le quotient de l’espérance par le seuil a."
    ],
    "examples": [
      {
        "stdin": "4\n8",
        "expected": "0.5000",
        "note": "E(X)/a = 4/8."
      }
    ],
    "tests": [
      {
        "label": "Seuil plus grand",
        "stdin": "cas:1",
        "expected": "0.6000"
      },
      {
        "label": "Grand seuil",
        "stdin": "cas:2",
        "expected": "0.2500"
      },
      {
        "label": "Seuil modeste",
        "stdin": "cas:3",
        "expected": "2.5000"
      }
    ],
    "solution": "[Exemple]\n0.5000\n\n[Cas 1 — Seuil plus grand]\n0.6000\n\n[Cas 2 — Grand seuil]\n0.2500\n\n[Cas 3 — Seuil modeste]\n2.5000\n"
  },
  {
    "id": "pb2-c6-e2",
    "chapter": 6,
    "level": "n2",
    "language": "analyse",
    "title": "Inégalité de Bienaymé-Tchebychev",
    "goal": "Appliquer la borne V(X)/ε² de l’inégalité de Tchebychev.",
    "brief": "<p>Dans cette étude, on considère deux décimaux : <code>variance</code> (V(X), positive) puis <code>epsilon</code> (ε &gt; 0). Indiquez la borne de Tchebychev <code>P(|X − E(X)| ≥ ε) ≤ V(X)/ε²</code>, arrondie à 4 décimales.</p>",
    "starter": "# Grille de calcul (pb2-c6-e2) — Inégalité de Bienaymé-Tchebychev\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Variance plus grande]\n# Données : 9\n# Données : 3\nA_COMPLETER\n\n[Cas 2 — Écart de deux]\n# Données : 1\n# Données : 2\nA_COMPLETER\n\n[Cas 3 — Écart serré]\n# Données : 5\n# Données : 2\nA_COMPLETER\n",
    "hints": [
      "La borne de Tchebychev est le quotient de la variance par le carré de l’écart ε.",
      "Pense à élever epsilon au carré : epsilon ** 2."
    ],
    "examples": [
      {
        "stdin": "4\n2",
        "expected": "1.0000",
        "note": "V/ε² = 4/4."
      }
    ],
    "tests": [
      {
        "label": "Variance plus grande",
        "stdin": "cas:1",
        "expected": "1.0000"
      },
      {
        "label": "Écart de deux",
        "stdin": "cas:2",
        "expected": "0.2500"
      },
      {
        "label": "Écart serré",
        "stdin": "cas:3",
        "expected": "1.2500"
      }
    ],
    "solution": "[Exemple]\n1.0000\n\n[Cas 1 — Variance plus grande]\n1.0000\n\n[Cas 2 — Écart de deux]\n0.2500\n\n[Cas 3 — Écart serré]\n1.2500\n"
  },
  {
    "id": "pb2-c6-e3",
    "chapter": 6,
    "level": "n3",
    "language": "analyse",
    "title": "Théorème central limite",
    "goal": "Approximer P(S ≤ x) par la loi normale après standardisation.",
    "brief": "<p>Dans cette étude, on considère quatre nombres, un par ligne : l’effectif <code>n</code>, la moyenne <code>mu</code> de chaque variable, son écart-type <code>sigma</code>, puis un seuil <code>x</code>. La somme <code>S</code> des <code>n</code> variables a pour moyenne <code>n·mu</code> et pour écart-type <code>sigma·√n</code>. Indiquez d’abord l’écart réduit <code>z = (x − n·mu)/(sigma·√n)</code> sur la ligne <code>z = …</code>, puis l’approximation <code>Φ(z)</code> sur la ligne <code>P = …</code>, chacune à 4 décimales.</p>",
    "starter": "# Grille de calcul (pb2-c6-e3) — Théorème central limite\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Trente-six variables]\n# Données : 36\n# Données : 10\n# Données : 2\n# Données : 372\nA_COMPLETER\n\n[Cas 2 — Vingt-cinq variables]\n# Données : 25\n# Données : 4\n# Données : 1\n# Données : 95\nA_COMPLETER\n\n[Cas 3 — Soixante-quatre variables]\n# Données : 64\n# Données : 1\n# Données : 2\n# Données : 64\nA_COMPLETER\n",
    "hints": [
      "La somme a pour moyenne n * mu et pour écart-type sigma * sqrt(n).",
      "Calcule z = (x - n * mu) / (sigma * sqrt(n)), puis Φ(z) = 0.5 * (1 + erf(z / sqrt(2)))."
    ],
    "examples": [
      {
        "stdin": "100\n0.5\n1\n55",
        "expected": "z = 0.5000\nP = 0.6915",
        "note": "Moyenne 50, écart-type 10 : z = 0,5."
      }
    ],
    "tests": [
      {
        "label": "Trente-six variables",
        "stdin": "cas:1",
        "expected": "z = 1.0000\nP = 0.8413"
      },
      {
        "label": "Vingt-cinq variables",
        "stdin": "cas:2",
        "expected": "z = -1.0000\nP = 0.1587"
      },
      {
        "label": "Soixante-quatre variables",
        "stdin": "cas:3",
        "expected": "z = 0.0000\nP = 0.5000"
      }
    ],
    "solution": "[Exemple]\nz = 0.5000\nP = 0.6915\n\n[Cas 1 — Trente-six variables]\nz = 1.0000\nP = 0.8413\n\n[Cas 2 — Vingt-cinq variables]\nz = -1.0000\nP = 0.1587\n\n[Cas 3 — Soixante-quatre variables]\nz = 0.0000\nP = 0.5000\n"
  }
];
