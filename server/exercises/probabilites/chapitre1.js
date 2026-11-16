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
    "brief": "<p>Dans cette étude, on considère deux entiers : <code>n</code> (nombre d’issues de l’univers, strictement positif) puis <code>k</code> (nombre de cas favorables, entre 0 et n inclus). Sur un univers équiprobable, la probabilité vaut <code>k/n</code>. Calculez et indiquez cette probabilité sous forme de <strong>fraction réduite</strong> <code>p/q</code>, avec un dénominateur strictement positif, y compris lorsque la probabilité est un nombre entier ou nul.</p>",
    "starter": "# Grille de calcul (pb2-c1-e1) — Probabilité d’un événement\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Deux sur huit]\n# Données : 8\n# Données : 2\nA_COMPLETER\n\n[Cas 2 — Sept sur dix]\n# Données : 10\n# Données : 7\nA_COMPLETER\n\n[Cas 3 — Deux sur quatre]\n# Données : 4\n# Données : 2\nA_COMPLETER\n\n[Cas 4 — Aucun cas favorable]\n# Données : 9\n# Données : 0\nA_COMPLETER\n\n[Cas 5 — Toutes les issues favorables]\n# Données : 9\n# Données : 9\nA_COMPLETER\n",
    "hints": [
      "Quel rapport relie les cas favorables au total des issues et comment le simplifier ?",
      "Pour réduire une fraction, divisez son numérateur et son dénominateur par leur plus grand diviseur commun (PGCD).",
      "Comptez les cas favorables et les cas possibles dans l univers fini, puis simplifiez irréductiblement la fraction (PGCD) sans convertir en décimal."
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
        "expected": "1/4",
        "comparator": "fraction_reduite"
      },
      {
        "label": "Sept sur dix",
        "stdin": "cas:2",
        "expected": "7/10",
        "comparator": "fraction_reduite"
      },
      {
        "label": "Deux sur quatre",
        "stdin": "cas:3",
        "expected": "1/2",
        "comparator": "fraction_reduite"
      },
      {
        "label": "Aucun cas favorable",
        "stdin": "cas:4",
        "expected": "0/1",
        "comparator": "fraction_reduite"
      },
      {
        "label": "Toutes les issues favorables",
        "stdin": "cas:5",
        "expected": "1/1",
        "comparator": "fraction_reduite"
      }
    ],
    "solution": "[Exemple]\n1/2\n\n[Cas 1 — Deux sur huit]\n1/4\n\n[Cas 2 — Sept sur dix]\n7/10\n\n[Cas 3 — Deux sur quatre]\n1/2\n\n[Cas 4 — Aucun cas favorable]\n0/1\n\n[Cas 5 — Toutes les issues favorables]\n1/1\n",
    "takeaway": "À retenir : Calculer la probabilité d’un événement sur un univers fini équiprobable.\nRepère : Trois cas favorables sur six : la moitié."
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
      "Additionnez pA et pB, puis retranchez une seule fois pAB : sans cela, on compte deux fois l’intersection.",
      "Arrondissez le résultat final à 4 décimales.",
      "Appliquez P(A U B) = P(A) + P(B) - P(A inter B) en veillant à formater le résultat à 4 décimales exactes."
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
    "solution": "[Exemple]\n0.7000\n\n[Cas 1 — Événements symétriques]\n0.5000\n\n[Cas 2 — Fort recouvrement]\n0.9500\n\n[Cas 3 — Intersection faible]\n0.6000\n",
    "takeaway": "À retenir : Appliquer la formule P(A∪B) = P(A) + P(B) − P(A∩B).\nRepère : 0,5 + 0,4 − 0,2 = 0,7."
  },
  {
    "id": "pb2-c1-e3",
    "chapter": 1,
    "level": "n2",
    "language": "analyse",
    "title": "Le tri des tickets du support informatique",
    "exampleTitle": "Exemple résolu — les imprimantes du parc",
    "goal": "Calculer deux probabilités conditionnelles de sens différents et tester l’indépendance de deux événements.",
    "brief": "<p><strong>Énoncé.</strong> Chaque matin, le support informatique ouvre les tickets reçus pendant la nuit et en traite un au hasard en priorité. On note <em>M</em> = « le ticket concerne la messagerie » et <em>U</em> = « le ticket est urgent ». Le tableau de bord de la semaine indique : <code>P(M) = 0,25</code>, <code>P(U) = 0,4</code> et <code>P(M ∩ U) = 0,1</code>.</p><ol><li>Quelle est la probabilité que le ticket concerne la messagerie, sachant qu’il est urgent ?</li><li>Quelle est la probabilité que le ticket soit urgent, sachant qu’il concerne la messagerie ?</li><li>Vérifier l’indépendance de M et U en comparant P(M ∩ U) au produit P(M) × P(U). M et U sont-ils indépendants ? Répondez par oui ou non.</li><li>Quelle est la probabilité que le ticket soit urgent ou concerne la messagerie ?</li><li>L’agent de garde affirme : « Savoir que le ticket est urgent ne change pas la probabilité qu’il concerne la messagerie. » Cette affirmation découle-t-elle des calculs précédents ? Répondez par oui ou non.</li></ol><p>Donnez les probabilités en décimal exact (0,4) ou en fraction réduite, la valeur seule, sans texte.</p>",
    "starter": "# Exercice — Le tri des tickets du support informatique\n# Lisez l’énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Réponse attendue : la valeur seule (décimal exact ou fraction réduite), sans texte.\n\n[Question 1 — Probabilité P(M | U)]\nA_COMPLETER\n\n[Question 2 — Probabilité P(U | M)]\nA_COMPLETER\n\n[Question 3 — M et U sont-ils indépendants (oui ou non)]\nA_COMPLETER\n\n[Question 4 — Probabilité P(M ∪ U)]\nA_COMPLETER\n\n[Question 5 — L’affirmation de l’agent (oui ou non)]\nA_COMPLETER\n",
    "hints": [
      "La probabilité conditionnelle se calcule par P(A | B) = P(A ∩ B)/P(B) : conditionner par B réduit l’univers à B, qui devient le dénominateur.",
      "P(M | U) et P(U | M) n’ont pas le même dénominateur : l’une divise par P(U), l’autre par P(M). Attention à ne pas les échanger.",
      "Pour l’indépendance, comparez P(M ∩ U) = 0,1 au produit P(M) × P(U). Si P(M | U) = P(M), la réalisation de U ne change rien à la probabilité de M : c’est exactement le sens de l’affirmation de l’agent."
    ],
    "examples": [
      {
        "stdin": "Dans le parc d’imprimantes : P(A) = 0,5 (l’imprimante est en réseau), P(B) = 0,5 (elle est couleur), P(A ∩ B) = 0,1.\n\n1) P(A | B) = 0,1/0,5 = 0,2.\n2) P(B | A) = 0,1/0,5 = 0,2.\n3) P(A) × P(B) = 0,25 ≠ 0,1 : les événements ne sont pas indépendants.\n4) P(A ∪ B) = 0,5 + 0,5 − 0,1 = 0,9.",
        "expected": "P(A|B) = 0,2 — P(B|A) = 0,2 — non indépendants (0,25 ≠ 0,1) — réunion : 0,9",
        "note": "Deux événements peuvent être liés sans être incompatibles : l’indépendance se teste par le produit P(A) × P(B), jamais à l’intuition."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Probabilité P(M | U)",
        "stdin": "q:1",
        "expected": "0,25||1/4"
      },
      {
        "label": "Question 2 — Probabilité P(U | M)",
        "stdin": "q:2",
        "expected": "0,4||2/5"
      },
      {
        "label": "Question 3 — M et U sont-ils indépendants",
        "stdin": "q:3",
        "expected": "oui"
      },
      {
        "label": "Question 4 — Probabilité P(M ∪ U)",
        "stdin": "q:4",
        "expected": "0,55||11/20"
      },
      {
        "label": "Question 5 — L’affirmation de l’agent",
        "stdin": "q:5",
        "expected": "oui"
      }
    ],
    "solution": "[Question 1 — Probabilité P(M | U)]\n0,25\n\n[Question 2 — Probabilité P(U | M)]\n0,4\n\n[Question 3 — M et U sont-ils indépendants (oui ou non)]\noui\n\n[Question 4 — Probabilité P(M ∪ U)]\n0,55\n\n[Question 5 — L’affirmation de l’agent (oui ou non)]\noui",
    "takeaway": "1) P(M | U) = P(M ∩ U)/P(U) = 0,1/0,4 = 0,25.\n2) P(U | M) = P(M ∩ U)/P(M) = 0,1/0,25 = 0,4.\n3) P(M) × P(U) = 0,25 × 0,4 = 0,1 = P(M ∩ U) : les événements M et U sont indépendants (oui).\n4) Réunion : P(M ∪ U) = 0,25 + 0,4 − 0,1 = 0,55.\n5) P(M | U) = 0,25 = P(M) : savoir que le ticket est urgent ne change pas la probabilité qu’il concerne la messagerie — l’affirmation est correcte (oui).\nContrôles : l’indépendance se lit aussi dans l’autre sens, P(U | M) = 0,4 = P(U) ; la réunion 0,55 et son contraire 0,45 somment à 1.\nAttention au piège du cours : P(M | U) et P(U | M) sont deux quantités différentes — ici elles n’ont d’ailleurs pas la même valeur (0,25 contre 0,4)."
  }
];
