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
    "title": "La roue de la fête de fin d’année",
    "exampleTitle": "Exemple résolu — le stand de fléchettes du forum",
    "goal": "Contrôler une loi de probabilité discrète, calculer des probabilités d’événements et une espérance.",
    "brief": "<p><strong>Énoncé.</strong> Au stand de la fête de fin d’année de l’entreprise, chaque salarié fait tourner une roue équilibrée. Le gain X obtenu, en bons d’achat (en euros), suit la loi de probabilité :</p><table><tr><th>x<sub>i</sub></th><th>0</th><th>5</th><th>10</th><th>20</th></tr><tr><th>P(X = x<sub>i</sub>)</th><td>0,4</td><td>0,3</td><td>0,2</td><td>0,1</td></tr></table><p>Le billet d’accès au stand coûte 5 €.</p><ol><li>Que vaut la somme des probabilités de cette loi ? (contrôle de validité avant tout calcul)</li><li>Quelle est la probabilité de gagner quelque chose ?</li><li>Quelle est la probabilité de gagner au moins 10 € ?</li><li>Quel est le gain moyen E(X) attendu par salarié ?</li><li>En moyenne, le stand perd-il ou gagne-t-il de l’argent par joueur ? Répondez par un seul mot : gagne ou perd.</li></ol><p>Donnez les valeurs en décimal exact (5,5) ou en fraction réduite, la valeur seule, sans unité ni texte.</p>",
    "starter": "# Exercice — La roue de la fête de fin d’année\n# Lisez l’énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Réponse attendue : la valeur seule (décimal exact ou fraction réduite) ; un mot pour la question 5.\n\n[Question 1 — Somme des probabilités de la loi]\nA_COMPLETER\n\n[Question 2 — Probabilité de gagner quelque chose]\nA_COMPLETER\n\n[Question 3 — Probabilité de gagner au moins 10 €]\nA_COMPLETER\n\n[Question 4 — Gain moyen E(X)]\nA_COMPLETER\n\n[Question 5 — Le stand gagne ou perd (un mot)]\nA_COMPLETER\n",
    "hints": [
      "Avant tout calcul, contrôlez la loi : la somme des probabilités P(X = xᵢ) doit valoir exactement 1, sinon l’énoncé est inutilisable.",
      "« Gagner quelque chose » est le contraire du gain nul ; « au moins 10 € » regroupe les valeurs 10 et 20 de la loi.",
      "L’espérance E(X) = Σ xᵢ × P(X = xᵢ) est le gain moyen par tour de roue. Comparez-la au prix du billet : le stand encaisse 5 € et redistribue en moyenne E(X)."
    ],
    "examples": [
      {
        "stdin": "Au stand de fléchettes d’un forum associatif, le gain Y (en €) vaut 0, 2 ou 10 avec les probabilités 0,5 ; 0,3 ; 0,2. Le jeton coûte 3 €.\n\n1) Somme : 0,5 + 0,3 + 0,2 = 1 (loi valide).\n2) P(gagner) = 1 − 0,5 = 0,5.\n3) P(gain ≥ 10) = 0,2.\n4) E(Y) = 0×0,5 + 2×0,3 + 10×0,2 = 2,6 €.\n5) Le stand encaisse 3 € et redistribue 2,6 € en moyenne : il gagne 0,4 € par joueur.",
        "expected": "somme : 1 — P(gagner) : 0,5 — P(≥ 10) : 0,2 — E(Y) : 2,6 — le stand gagne",
        "note": "L’espérance est un gain moyen théorique : c’est en la comparant au prix du billet que l’on juge la rentabilité d’un stand."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Somme des probabilités de la loi",
        "stdin": "q:1",
        "expected": "1||1,0||100 %||100"
      },
      {
        "label": "Question 2 — Probabilité de gagner quelque chose",
        "stdin": "q:2",
        "expected": "0,6||3/5"
      },
      {
        "label": "Question 3 — Probabilité de gagner au moins 10 €",
        "stdin": "q:3",
        "expected": "0,3||3/10"
      },
      {
        "label": "Question 4 — Gain moyen E(X)",
        "stdin": "q:4",
        "expected": "5,5||11/2"
      },
      {
        "label": "Question 5 — Le stand gagne ou perd",
        "stdin": "q:5",
        "expected": "perd"
      }
    ],
    "solution": "[Question 1 — Somme des probabilités de la loi]\n1\n\n[Question 2 — Probabilité de gagner quelque chose]\n0,6\n\n[Question 3 — Probabilité de gagner au moins 10 €]\n0,3\n\n[Question 4 — Gain moyen E(X)]\n5,5\n\n[Question 5 — Le stand gagne ou perd (un mot)]\nperd",
    "takeaway": "1) Contrôle de la loi : 0,4 + 0,3 + 0,2 + 0,1 = 1 — la loi est valide, les calculs peuvent commencer.\n2) P(X ≠ 0) = 1 − P(X = 0) = 1 − 0,4 = 0,6 (soit 0,3 + 0,2 + 0,1 en additionnant les gains non nuls).\n3) P(X ≥ 10) = P(X = 10) + P(X = 20) = 0,2 + 0,1 = 0,3.\n4) E(X) = 0 × 0,4 + 5 × 0,3 + 10 × 0,2 + 20 × 0,1 = 0 + 1,5 + 2 + 2 = 5,5 € de bons d’achat redistribués en moyenne par joueur.\n5) Le stand encaisse 5 € et redistribue en moyenne 5,50 € : il perd 0,50 € par joueur. Réponse : perd.\nInterprétation : l’écart de 0,50 € par joueur est le prix de la convivialité offert par le comité — la fête est un cadeau, pas une recette."
  },
  {
    "id": "pb2-c3-e2",
    "chapter": 3,
    "level": "n2",
    "language": "analyse",
    "title": "Le ticket fidélité à gratter",
    "exampleTitle": "Exemple résolu — la loterie du supermarché",
    "goal": "Calculer espérance, variance et écart-type d’une loi discrète, puis utiliser la linéarité de l’espérance et de la variance.",
    "brief": "<p><strong>Énoncé.</strong> À chaque passage en caisse, les clients fidèles de la boutique reçoivent un ticket à gratter. La réduction X obtenue (en euros) suit la loi de probabilité :</p><table><tr><th>x<sub>i</sub></th><th>0</th><th>2</th><th>4</th><th>6</th></tr><tr><th>P(X = x<sub>i</sub>)</th><td>0,1</td><td>0,2</td><td>0,3</td><td>0,4</td></tr></table><p>Rappels : V(X) = E(X²) − E(X)² (formule de Kœnig–Huygens), E(aX) = a·E(X) et V(aX) = a²·V(X).</p><ol><li>Calculer l’espérance E(X) de la réduction.</li><li>Calculer E(X²), la moyenne des carrés.</li><li>En déduire la variance V(X).</li><li>Quel est l’écart-type σ(X) ?</li><li>Pour une opération promotionnelle, la boutique double toutes les réductions : Y = 2X. Que vaut E(Y) ?</li><li>Que vaut V(Y) ?</li></ol><p>Donnez les valeurs en décimal exact, la valeur seule, sans unité ni texte.</p>",
    "starter": "# Exercice — Le ticket fidélité à gratter\n# Lisez l’énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Réponse attendue : la valeur seule (décimal exact), sans unité.\n\n[Question 1 — Espérance E(X)]\nA_COMPLETER\n\n[Question 2 — Moyenne des carrés E(X²)]\nA_COMPLETER\n\n[Question 3 — Variance V(X)]\nA_COMPLETER\n\n[Question 4 — Écart-type σ(X)]\nA_COMPLETER\n\n[Question 5 — Espérance de Y = 2X]\nA_COMPLETER\n\n[Question 6 — Variance de Y = 2X]\nA_COMPLETER\n",
    "hints": [
      "Posez le tableau de calcul avec trois lignes utiles : xᵢ, xᵢ × pᵢ et xᵢ² × pᵢ — les deux sommes donnent directement E(X) et E(X²).",
      "La variance s’obtient ensuite par V(X) = E(X²) − E(X)², et l’écart-type est la racine carrée de la variance.",
      "Pour Y = 2X, la linéarité donne E(Y) = 2 × E(X) et V(Y) = 2² × V(X) : l’espérance est multipliée par le coefficient, la variance par son carré."
    ],
    "examples": [
      {
        "stdin": "Une loterie de supermarché offre Z = 1 € ou 3 € avec la probabilité 1/2 chacun.\n\n1) E(Z) = (1 + 3)/2 = 2.\n2) E(Z²) = (1² + 3²)/2 = 5.\n3) V(Z) = 5 − 2² = 1.\n4) σ(Z) = √1 = 1.\n5) Si les lots sont triplés (3Z) : E(3Z) = 6 et V(3Z) = 9 × 1 = 9.",
        "expected": "E(Z) = 2 — E(Z²) = 5 — V(Z) = 1 — σ(Z) = 1 — triplé : E = 6, V = 9",
        "note": "E(X²) est la moyenne des carrés, E(X)² le carré de la moyenne : la variance est leur écart, jamais leur somme."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Espérance E(X)",
        "stdin": "q:1",
        "expected": "4||4,0"
      },
      {
        "label": "Question 2 — Moyenne des carrés E(X²)",
        "stdin": "q:2",
        "expected": "20||20,0"
      },
      {
        "label": "Question 3 — Variance V(X)",
        "stdin": "q:3",
        "expected": "4||4,0"
      },
      {
        "label": "Question 4 — Écart-type σ(X)",
        "stdin": "q:4",
        "expected": "2||2,0"
      },
      {
        "label": "Question 5 — Espérance de Y = 2X",
        "stdin": "q:5",
        "expected": "8||8,0"
      },
      {
        "label": "Question 6 — Variance de Y = 2X",
        "stdin": "q:6",
        "expected": "16"
      }
    ],
    "solution": "[Question 1 — Espérance E(X)]\n4\n\n[Question 2 — Moyenne des carrés E(X²)]\n20\n\n[Question 3 — Variance V(X)]\n4\n\n[Question 4 — Écart-type σ(X)]\n2\n\n[Question 5 — Espérance de Y = 2X]\n8\n\n[Question 6 — Variance de Y = 2X]\n16",
    "takeaway": "1) E(X) = 0 × 0,1 + 2 × 0,2 + 4 × 0,3 + 6 × 0,4 = 0 + 0,4 + 1,2 + 2,4 = 4 €.\n2) E(X²) = 0² × 0,1 + 2² × 0,2 + 4² × 0,3 + 6² × 0,4 = 0 + 0,8 + 4,8 + 14,4 = 20.\n3) V(X) = E(X²) − E(X)² = 20 − 4² = 20 − 16 = 4.\n4) σ(X) = √V(X) = √4 = 2 €.\n5) Linéarité de l’espérance : E(Y) = E(2X) = 2 × E(X) = 2 × 4 = 8 €.\n6) Variance : V(Y) = V(2X) = 2² × V(X) = 4 × 4 = 16.\nContrôle de la loi : 0,1 + 0,2 + 0,3 + 0,4 = 1 (OK). Contrôle d’homogénéité : doubler les réductions double l’espérance (4 → 8) mais quadruple la variance (4 → 16) — la dispersion en euros carrés grandit plus vite que le gain moyen."
  },
  {
    "id": "pb2-c3-e3",
    "chapter": 3,
    "level": "n2",
    "language": "analyse",
    "title": "Le serveur et ses interventions quotidiennes",
    "exampleTitle": "Exemple résolu — les appels du standard d’hôtel",
    "goal": "Construire et lire la fonction de répartition F(x) = P(X ≤ x) d’une loi discrète et l’exploiter par complément.",
    "brief": "<p><strong>Énoncé.</strong> L’administrateur réseaux étudie X, le nombre d’interventions nécessaires par jour sur le serveur de l’entreprise. La loi de X est :</p><table><tr><th>x<sub>i</sub></th><th>0</th><th>1</th><th>2</th><th>3</th></tr><tr><th>P(X = x<sub>i</sub>)</th><td>0,1</td><td>0,4</td><td>0,3</td><td>0,2</td></tr></table><p>Rappels : la fonction de répartition cumule les probabilités, F(x) = P(X ≤ x) ; la probabilité « au moins » s’obtient par le complément, P(X ≥ x) = 1 − P(X ≤ x − 1).</p><ol><li>Calculer F(1) = P(X ≤ 1).</li><li>En déduire P(X ≥ 2).</li><li>Calculer F(2).</li><li>Retrouver la probabilité ponctuelle P(X = 2) par la différence F(2) − F(1).</li><li>Le contrat de maintenance prévoit une pénalité dès que le serveur demande au moins 3 interventions dans la journée : quelle est la probabilité d’une journée avec pénalité ?</li><li>Calculer l’espérance E(X) du nombre d’interventions par jour.</li></ol><p>Donnez les valeurs en décimal exact, la valeur seule, sans unité ni texte.</p>",
    "starter": "# Exercice — Le serveur et ses interventions quotidiennes\n# Lisez l’énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Réponse attendue : la valeur seule (décimal exact ou fraction réduite), sans unité.\n\n[Question 1 — Répartition F(1)]\nA_COMPLETER\n\n[Question 2 — Probabilité P(X ≥ 2)]\nA_COMPLETER\n\n[Question 3 — Répartition F(2)]\nA_COMPLETER\n\n[Question 4 — Probabilité ponctuelle P(X = 2)]\nA_COMPLETER\n\n[Question 5 — Probabilité d’une journée avec pénalité]\nA_COMPLETER\n\n[Question 6 — Espérance E(X)]\nA_COMPLETER\n",
    "hints": [
      "F(1) additionne les probabilités des valeurs 0 et 1 : la répartition est un cumul croissant, ligne par ligne du tableau.",
      "« Au moins 2 interventions » est le complément de « au plus 1 » : P(X ≥ 2) = 1 − F(1). La pénalité de « au moins 3 » se traite de la même façon à partir de F(2).",
      "La probabilité ponctuelle se retrouve par différence de deux répartitions consécutives. Contrôles finaux : F(3) doit valoir 1, et la somme des probabilités ponctuelles doit redonner 1."
    ],
    "examples": [
      {
        "stdin": "La nuit, X = nombre d’appels reçus par le standard d’un hôtel : 0 (p = 0,25), 1 (p = 0,25), 2 (p = 0,5).\n\n1) F(0) = 0,25.\n2) F(1) = 0,25 + 0,25 = 0,5.\n3) P(X ≥ 2) = 1 − F(1) = 0,5.\n4) P(X = 1) = F(1) − F(0) = 0,25.\n5) E(X) = 0×0,25 + 1×0,25 + 2×0,5 = 1,25.",
        "expected": "F(0) = 0,25 — F(1) = 0,5 — P(X ≥ 2) = 0,5 — P(X = 1) = 0,25 — E(X) = 1,25",
        "note": "La répartition cumule vers le haut : chaque F(x) s’obtient en ajoutant la probabilité de x au F précédent."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Répartition F(1)",
        "stdin": "q:1",
        "expected": "0,5||1/2"
      },
      {
        "label": "Question 2 — Probabilité P(X ≥ 2)",
        "stdin": "q:2",
        "expected": "0,5||1/2"
      },
      {
        "label": "Question 3 — Répartition F(2)",
        "stdin": "q:3",
        "expected": "0,8||4/5"
      },
      {
        "label": "Question 4 — Probabilité ponctuelle P(X = 2)",
        "stdin": "q:4",
        "expected": "0,3||3/10"
      },
      {
        "label": "Question 5 — Probabilité d’une journée avec pénalité",
        "stdin": "q:5",
        "expected": "0,2||1/5"
      },
      {
        "label": "Question 6 — Espérance E(X)",
        "stdin": "q:6",
        "expected": "1,6||8/5"
      }
    ],
    "solution": "[Question 1 — Répartition F(1)]\n0,5\n\n[Question 2 — Probabilité P(X ≥ 2)]\n0,5\n\n[Question 3 — Répartition F(2)]\n0,8\n\n[Question 4 — Probabilité ponctuelle P(X = 2)]\n0,3\n\n[Question 5 — Probabilité d’une journée avec pénalité]\n0,2\n\n[Question 6 — Espérance E(X)]\n1,6",
    "takeaway": "1) F(1) = P(X ≤ 1) = P(X = 0) + P(X = 1) = 0,1 + 0,4 = 0,5.\n2) P(X ≥ 2) = 1 − P(X ≤ 1) = 1 − 0,5 = 0,5.\n3) F(2) = F(1) + P(X = 2) = 0,5 + 0,3 = 0,8.\n4) P(X = 2) = F(2) − F(1) = 0,8 − 0,5 = 0,3 : on retrouve la valeur du tableau, la répartition et la loi racontent la même chose.\n5) Journée avec pénalité = « au moins 3 interventions » : P(X ≥ 3) = 1 − F(2) = 1 − 0,8 = 0,2. Une journée sur cinq en moyenne.\n6) E(X) = 0 × 0,1 + 1 × 0,4 + 2 × 0,3 + 3 × 0,2 = 0 + 0,4 + 0,6 + 0,6 = 1,6 intervention par jour en moyenne.\nContrôles : somme de la loi : 0,1 + 0,4 + 0,3 + 0,2 = 1 (OK) ; F(3) = 0,8 + 0,2 = 1 (OK) ; F(1) + P(X ≥ 2) = 0,5 + 0,5 = 1 (OK)."
  }
];
