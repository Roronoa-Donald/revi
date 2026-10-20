/**
 * Chapitre 2 — Probabilités B2.
 * Mode d'évaluation mathématique structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    "id": "pb2-c2-e1",
    "chapter": 2,
    "level": "n1",
    "language": "analyse",
    "title": "Arrangements",
    "goal": "Compter les arrangements de k objets parmi n : A(n,k) = n!/(n−k)!.",
    "brief": "<p>Dans cette étude, on considère deux entiers : <code>n</code> puis <code>k</code>. Indiquez le nombre d’<strong>arrangements</strong> <code>A(n,k) = n!/(n−k)!</code> (l’ordre compte, sans répétition).</p>",
    "starter": "# Grille de calcul (pb2-c2-e1) — Arrangements\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Petit arrangement]\n# Données : 4\n# Données : 2\nA_COMPLETER\n\n[Cas 2 — Six parmi trois]\n# Données : 6\n# Données : 3\nA_COMPLETER\n\n[Cas 3 — Deux parmi dix]\n# Données : 10\n# Données : 2\nA_COMPLETER\n",
    "hints": [
      "A(n,k) = n·(n−1)·…·(n−k+1) : c’est le quotient n! / (n−k)!.",
      "Effectuez le calcul arithmétique correspondant."
    ],
    "examples": [
      {
        "stdin": "5\n3",
        "expected": "60",
        "note": "5 × 4 × 3 = 60."
      }
    ],
    "tests": [
      {
        "label": "Petit arrangement",
        "stdin": "cas:1",
        "expected": "12"
      },
      {
        "label": "Six parmi trois",
        "stdin": "cas:2",
        "expected": "120"
      },
      {
        "label": "Deux parmi dix",
        "stdin": "cas:3",
        "expected": "90"
      }
    ],
    "solution": "[Exemple]\n60\n\n[Cas 1 — Petit arrangement]\n12\n\n[Cas 2 — Six parmi trois]\n120\n\n[Cas 3 — Deux parmi dix]\n90\n"
  },
  {
    "id": "pb2-c2-e2",
    "chapter": 2,
    "level": "n2",
    "language": "analyse",
    "title": "Combinaisons",
    "goal": "Compter les combinaisons de k objets parmi n : C(n,k) = n!/(k!(n−k)!).",
    "brief": "<p>Dans cette étude, on considère deux entiers : <code>n</code> puis <code>k</code>. Indiquez le nombre de <strong>combinaisons</strong> <code>C(n,k)</code> (l’ordre ne compte pas, sans répétition).</p>",
    "starter": "# Grille de calcul (pb2-c2-e2) — Combinaisons\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Six parmi trois]\n# Données : 6\n# Données : 3\nA_COMPLETER\n\n[Cas 2 — Tout l’ensemble]\n# Données : 4\n# Données : 4\nA_COMPLETER\n\n[Cas 3 — Cinq parmi dix]\n# Données : 10\n# Données : 5\nA_COMPLETER\n",
    "hints": [
      "Divise l’arrangement A(n,k) par k! pour oublier l’ordre : C(n,k) = A(n,k) / k!.",
      "Effectuez le calcul arithmétique correspondant."
    ],
    "examples": [
      {
        "stdin": "5\n2",
        "expected": "10",
        "note": "Dix façons de choisir 2 objets parmi 5."
      }
    ],
    "tests": [
      {
        "label": "Six parmi trois",
        "stdin": "cas:1",
        "expected": "20"
      },
      {
        "label": "Tout l’ensemble",
        "stdin": "cas:2",
        "expected": "1"
      },
      {
        "label": "Cinq parmi dix",
        "stdin": "cas:3",
        "expected": "252"
      }
    ],
    "solution": "[Exemple]\n10\n\n[Cas 1 — Six parmi trois]\n20\n\n[Cas 2 — Tout l’ensemble]\n1\n\n[Cas 3 — Cinq parmi dix]\n252\n"
  },
  {
    "id": "pb2-c2-e3",
    "chapter": 2,
    "level": "n3",
    "language": "analyse",
    "title": "Permutations avec répétition",
    "goal": "Compter les anagrammes distincts d’un mot : n!/(r₁!·r₂!·…).",
    "brief": "<p>Dans cette étude, on considère un mot (une ligne, sans espace). Indiquez le nombre d’<strong>anagrammes distincts</strong>, c’est-à-dire le nombre de permutations des lettres en tenant compte des répétitions : <code>n! / (r₁!·r₂!·…)</code> où chaque <code>rᵢ</code> est le nombre d’occurrences d’une lettre.</p>",
    "starter": "# Grille de calcul (pb2-c2-e3) — Permutations avec répétition\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Une lettre doublée]\n# Données : AAB\nA_COMPLETER\n\n[Cas 2 — Deux lettres doublées]\n# Données : AABB\nA_COMPLETER\n\n[Cas 3 — Quatre lettres distinctes]\n# Données : ABCD\nA_COMPLETER\n",
    "hints": [
      "Compte d’abord les occurrences de chaque lettre avec Counter(mot).",
      "Divise la factorielle de la longueur par le produit des factorielles de chaque effectif."
    ],
    "examples": [
      {
        "stdin": "ABC",
        "expected": "6",
        "note": "Trois lettres distinctes : 3! = 6 anagrammes."
      }
    ],
    "tests": [
      {
        "label": "Une lettre doublée",
        "stdin": "cas:1",
        "expected": "3"
      },
      {
        "label": "Deux lettres doublées",
        "stdin": "cas:2",
        "expected": "6"
      },
      {
        "label": "Quatre lettres distinctes",
        "stdin": "cas:3",
        "expected": "24"
      }
    ],
    "solution": "[Exemple]\n6\n\n[Cas 1 — Une lettre doublée]\n3\n\n[Cas 2 — Deux lettres doublées]\n6\n\n[Cas 3 — Quatre lettres distinctes]\n24\n"
  }
];
