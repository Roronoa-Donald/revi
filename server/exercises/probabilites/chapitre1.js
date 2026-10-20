/**
 * Chapitre 1 — Probabilités B2.
 * Mode d'évaluation mathématique structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    "id": "pb2-c1-e1",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "Probabilité d’un événement",
    "goal": "Calculer la probabilité d’un événement sur un univers fini équiprobable.",
    "brief": "<p>Dans cette étude, on considère deux entiers : <code>n</code> (nombre d’issues de l’univers) puis <code>k</code> (nombre de cas favorables). Sur un univers équiprobable, la probabilité vaut <code>k/n</code>. Calculez et indiquez cette probabilité sous forme de <strong>fraction réduite</strong> <code>p/q</code> (par exemple <code>1/2</code>).</p>",
    "starter": "# Grille de calcul (pb2-c1-e1) — Probabilité d’un événement\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Deux sur huit]\n# Données : 8\n# Données : 2\nA_COMPLETER\n\n[Cas 2 — Sept sur dix]\n# Données : 10\n# Données : 7\nA_COMPLETER\n\n[Cas 3 — Deux sur quatre]\n# Données : 4\n# Données : 2\nA_COMPLETER\n",
    "hints": [
      "Réduire une fraction demande de diviser numérateur et dénominateur par leur pgcd : gcd(k, n).",
      "Simplifiez la fraction jusqu'à obtenir des entiers premiers entre eux."
    ],
    "examples": [
      {
        "stdin": "6\n3",
        "expected": "1/2",
        "note": "Trois cas favorables sur six : la moitié."
      }
    ],
    "tests": [
      {
        "label": "Deux sur huit",
        "stdin": "cas:1",
        "expected": "1/4"
      },
      {
        "label": "Sept sur dix",
        "stdin": "cas:2",
        "expected": "7/10"
      },
      {
        "label": "Deux sur quatre",
        "stdin": "cas:3",
        "expected": "1/2"
      }
    ],
    "solution": "[Exemple]\n1/2\n\n[Cas 1 — Deux sur huit]\n1/4\n\n[Cas 2 — Sept sur dix]\n7/10\n\n[Cas 3 — Deux sur quatre]\n1/2\n"
  },
  {
    "id": "pb2-c1-e2",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "Formule de la réunion",
    "goal": "Appliquer la formule P(A∪B) = P(A) + P(B) − P(A∩B).",
    "brief": "<p>Dans cette étude, on considère trois nombres décimaux, un par ligne : <code>pA</code>, <code>pB</code> et <code>pAB</code> (probabilité de l’intersection). Indiquez <code>P(A∪B)</code> arrondie à 4 décimales.</p><p>Rappel : <code>P(A∪B) = P(A) + P(B) − P(A∩B)</code>.</p>",
    "starter": "# Grille de calcul (pb2-c1-e2) — Formule de la réunion\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Événements symétriques]\n# Données : 0.3\n# Données : 0.3\n# Données : 0.1\nA_COMPLETER\n\n[Cas 2 — Fort recouvrement]\n# Données : 0.9\n# Données : 0.8\n# Données : 0.75\nA_COMPLETER\n\n[Cas 3 — Intersection faible]\n# Données : 0.2\n# Données : 0.5\n# Données : 0.1\nA_COMPLETER\n",
    "hints": [
      "Additionne pA et pB, puis retranche une seule fois pAB : sans cela, on compte deux fois l’intersection.",
      "Arrondissez le résultat final à 4 décimales."
    ],
    "examples": [
      {
        "stdin": "0.5\n0.4\n0.2",
        "expected": "0.7000",
        "note": "0,5 + 0,4 − 0,2 = 0,7."
      }
    ],
    "tests": [
      {
        "label": "Événements symétriques",
        "stdin": "cas:1",
        "expected": "0.5000"
      },
      {
        "label": "Fort recouvrement",
        "stdin": "cas:2",
        "expected": "0.9500"
      },
      {
        "label": "Intersection faible",
        "stdin": "cas:3",
        "expected": "0.6000"
      }
    ],
    "solution": "[Exemple]\n0.7000\n\n[Cas 1 — Événements symétriques]\n0.5000\n\n[Cas 2 — Fort recouvrement]\n0.9500\n\n[Cas 3 — Intersection faible]\n0.6000\n"
  },
  {
    "id": "pb2-c1-e3",
    "chapter": 1,
    "level": "n2",
    "language": "analyse",
    "title": "Probabilité conditionnelle",
    "goal": "Calculer P(A|B) à partir de P(A∩B) et P(B).",
    "brief": "<p>Dans cette étude, on considère deux nombres décimaux : <code>pAB</code> (probabilité de <code>A∩B</code>) puis <code>pB</code> (probabilité de <code>B</code>). Indiquez <code>P(A|B) = P(A∩B)/P(B)</code> arrondie à 4 décimales.</p>",
    "starter": "# Grille de calcul (pb2-c1-e3) — Probabilité conditionnelle\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Univers réduit de moitié]\n# Données : 0.15\n# Données : 0.6\nA_COMPLETER\n\n[Cas 2 — Intersection forte]\n# Données : 0.4\n# Données : 0.8\nA_COMPLETER\n\n[Cas 3 — Petite intersection]\n# Données : 0.1\n# Données : 0.4\nA_COMPLETER\n",
    "hints": [
      "La probabilité conditionnelle est le rapport pAB / pB.",
      "Le dénominateur est la probabilité de la condition B : c’est elle qui réduit l’univers."
    ],
    "examples": [
      {
        "stdin": "0.2\n0.5",
        "expected": "0.4000",
        "note": "Deux chances sur cinq dans l’univers restreint."
      }
    ],
    "tests": [
      {
        "label": "Univers réduit de moitié",
        "stdin": "cas:1",
        "expected": "0.2500"
      },
      {
        "label": "Intersection forte",
        "stdin": "cas:2",
        "expected": "0.5000"
      },
      {
        "label": "Petite intersection",
        "stdin": "cas:3",
        "expected": "0.2500"
      }
    ],
    "solution": "[Exemple]\n0.4000\n\n[Cas 1 — Univers réduit de moitié]\n0.2500\n\n[Cas 2 — Intersection forte]\n0.5000\n\n[Cas 3 — Petite intersection]\n0.2500\n"
  }
];
