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
    "title": "La navette de l’accueil",
    "exampleTitle": "Exemple résolu — le tramway du quartier des bureaux",
    "goal": "Calculer des probabilités, une espérance et une variance pour une loi uniforme sur un intervalle.",
    "brief": "<p><strong>Énoncé.</strong> Une navette interne fait la liaison entre l’accueil et l’atelier toutes les 12 minutes. Un salarié qui se présente à l’arrêt ne consulte pas l’horaire : son temps d’attente X (en minutes) suit la <strong>loi uniforme</strong> sur l’intervalle [0 ; 12].</p><p>Rappels : pour une loi uniforme sur [a ; b], P(c ≤ X ≤ d) = (d − c)/(b − a), E(X) = (a + b)/2 et V(X) = (b − a)²/12.</p><ol><li>Quelle est la loi de X ? Répondez par un seul mot.</li><li>Quelle est la probabilité d’attendre au plus 3 minutes ?</li><li>Quelle est la probabilité d’attendre au moins 8 minutes ?</li><li>Quelle est la probabilité d’attendre entre 4 et 10 minutes ?</li><li>Quel est le temps d’attente moyen E(X) ?</li><li>Quelle est la variance V(X) de ce temps d’attente ?</li></ol><p>Donnez les probabilités en fraction réduite (1/4) ou en décimal exact (0,25), la valeur seule, sans texte.</p>",
    "starter": "# Exercice — La navette de l’accueil\n# Lisez l’énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Réponse attendue : la valeur seule (fraction réduite ou décimal exact) ; un mot pour la question 1.\n\n[Question 1 — Loi de X (un mot)]\nA_COMPLETER\n\n[Question 2 — Probabilité d’attendre au plus 3 minutes]\nA_COMPLETER\n\n[Question 3 — Probabilité d’attendre au moins 8 minutes]\nA_COMPLETER\n\n[Question 4 — Probabilité d’attendre entre 4 et 10 minutes]\nA_COMPLETER\n\n[Question 5 — Temps d’attente moyen E(X)]\nA_COMPLETER\n\n[Question 6 — Variance V(X)]\nA_COMPLETER\n",
    "hints": [
      "La loi uniforme répartit également la probabilité sur [0 ; 12] : la probabilité d’un intervalle est sa longueur divisée par la longueur totale.",
      "« Au plus 3 minutes » pèse l’intervalle [0 ; 3] ; « au moins 8 minutes » pèse [8 ; 12] ; « entre 4 et 10 » pèse [4 ; 10].",
      "L’espérance d’une loi uniforme est le milieu de l’intervalle [a ; b] ; la variance s’obtient par la formule du rappel avec la longueur totale de l’intervalle. Contrôle : chaque probabilité calculée doit rester entre 0 et 1."
    ],
    "examples": [
      {
        "stdin": "Un tramway dessert le quartier des bureaux toutes les 10 minutes ; temps d’attente T uniforme sur [0 ; 10].\n\n1) P(T ≤ 2,5) = 2,5/10 = 1/4.\n2) P(T ≥ 6) = (10 − 6)/10 = 4/10 = 2/5.\n3) P(3 ≤ T ≤ 7) = (7 − 3)/10 = 2/5.\n4) E(T) = (0 + 10)/2 = 5 minutes.\n5) V(T) = (10 − 0)²/12 = 100/12 = 25/3.",
        "expected": "P(T ≤ 2,5) = 1/4 — P(T ≥ 6) = 2/5 — P(3 ≤ T ≤ 7) = 2/5 — E(T) = 5 — V(T) = 25/3",
        "note": "Toute probabilité d’une loi uniforme est un rapport de longueurs : longueur de l’intervalle favorable sur longueur totale."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Loi de X",
        "stdin": "q:1",
        "expected": "uniforme||loi uniforme"
      },
      {
        "label": "Question 2 — Probabilité d’attendre au plus 3 minutes",
        "stdin": "q:2",
        "expected": "1/4||0,25"
      },
      {
        "label": "Question 3 — Probabilité d’attendre au moins 8 minutes",
        "stdin": "q:3",
        "expected": "1/3"
      },
      {
        "label": "Question 4 — Probabilité d’attendre entre 4 et 10 minutes",
        "stdin": "q:4",
        "expected": "1/2||0,5"
      },
      {
        "label": "Question 5 — Temps d’attente moyen E(X)",
        "stdin": "q:5",
        "expected": "6||6 minutes"
      },
      {
        "label": "Question 6 — Variance V(X)",
        "stdin": "q:6",
        "expected": "12"
      }
    ],
    "solution": "[Question 1 — Loi de X (un mot)]\nuniforme\n\n[Question 2 — Probabilité d’attendre au plus 3 minutes]\n1/4\n\n[Question 3 — Probabilité d’attendre au moins 8 minutes]\n1/3\n\n[Question 4 — Probabilité d’attendre entre 4 et 10 minutes]\n1/2\n\n[Question 5 — Temps d’attente moyen E(X)]\n6\n\n[Question 6 — Variance V(X)]\n12",
    "takeaway": "1) Le temps d’attente se répartit uniformément entre deux passages : X suit la loi uniforme sur [0 ; 12].\n2) P(X ≤ 3) = (3 − 0)/(12 − 0) = 3/12 = 1/4 = 0,25.\n3) P(X ≥ 8) = (12 − 8)/12 = 4/12 = 1/3.\n4) P(4 ≤ X ≤ 10) = (10 − 4)/12 = 6/12 = 1/2 = 0,5.\n5) E(X) = (0 + 12)/2 = 6 minutes : en arrivant sans regarder l’horaire, on attend en moyenne une demi-période.\n6) V(X) = (12 − 0)²/12 = 144/12 = 12.\nContrôles : les trois probabilités restent bien entre 0 et 1 ; P(X ≤ 3) + P(X ∈ ]3 ; 8[) + P(X ≥ 8) = 3/12 + 5/12 + 4/12 = 1 — les intervalles [0 ; 3], ]3 ; 8[ et [8 ; 12] recouvrent toute la plage d’attente."
  },
  {
    "id": "pb2-c5-e2",
    "chapter": 5,
    "level": "n2",
    "language": "analyse",
    "title": "La durée de vie des disques durs du serveur",
    "exampleTitle": "Exemple résolu — les ampoules du hall d’accueil",
    "goal": "Calculer survie et panne pour une loi exponentielle et exploiter la propriété « sans mémoire ».",
    "brief": "<p><strong>Énoncé.</strong> La durée de bon fonctionnement X d’un disque dur du serveur (en heures) suit la <strong>loi exponentielle</strong> de paramètre <code>λ = 0,5</code> par heure. Rappels : <code>P(X ≥ x) = e<sup>(−λx)</sup></code>, <code>P(X ≤ x) = 1 − e<sup>(−λx)</sup></code> et <code>E(X) = 1/λ</code>. On prendra <code>e<sup>(−1)</sup> = 0,368</code> et <code>e<sup>(−2)</sup> = 0,135</code> dans tous les calculs.</p><ol><li>Quelle est la loi de X ? Répondez par un seul mot.</li><li>Calculer la probabilité que le disque fonctionne encore au bout de 2 heures : P(X ≥ 2).</li><li>En déduire la probabilité qu’il tombe en panne avant 2 heures : P(X ≤ 2).</li><li>Calculer la probabilité qu’il fonctionne encore au bout de 4 heures : P(X ≥ 4).</li><li>Le disque a déjà tourné 2 heures sans panne. D’après la propriété « sans mémoire » de cette loi, que vaut la probabilité qu’il fonctionne encore au moins 2 heures de plus ?</li><li>Quelle est la durée de vie moyenne E(X) de ce type de disque, en heures ?</li></ol><p>Donnez les probabilités en décimal (au millième près, avec les valeurs fournies), la valeur seule ; la durée moyenne en heures, valeur seule.</p>",
    "starter": "# Exercice — La durée de vie des disques durs du serveur\n# Lisez l’énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Réponse attendue : la valeur seule (décimal au millième) ; un mot pour la question 1.\n\n[Question 1 — Loi de X (un mot)]\nA_COMPLETER\n\n[Question 2 — Probabilité P(X ≥ 2)]\nA_COMPLETER\n\n[Question 3 — Probabilité P(X ≤ 2)]\nA_COMPLETER\n\n[Question 4 — Probabilité P(X ≥ 4)]\nA_COMPLETER\n\n[Question 5 — Probabilité de survivre encore 2 heures de plus]\nA_COMPLETER\n\n[Question 6 — Durée de vie moyenne E(X) en heures]\nA_COMPLETER\n",
    "hints": [
      "La probabilité de survie au-delà de x heures est e^(−λx) : remplacez λ par 0,5 et x par la durée demandée pour identifier l’exposant (0,5 × 2 = 1, 0,5 × 4 = 2).",
      "« Panne avant 2 heures » et « survie au-delà de 2 heures » sont des événements contraires : leurs probabilités somment à 1.",
      "La loi est sans mémoire : savoir que le disque a déjà survécu ne change pas la loi du temps restant. Pour la durée de vie moyenne, appliquez E(X) = 1/λ."
    ],
    "examples": [
      {
        "stdin": "Les ampoules du hall d’accueil ont une durée de vie T exponentielle de paramètre λ = 0,25 par heure. On prendra e^(−0,5) = 0,607.\n\n1) P(T ≥ 2) = e^(−0,25×2) = e^(−0,5) = 0,607.\n2) P(T ≤ 2) = 1 − 0,607 = 0,393.\n3) E(T) = 1/0,25 = 4 heures.",
        "expected": "P(T ≥ 2) = 0,607 — P(T ≤ 2) = 0,393 — E(T) = 4 heures",
        "note": "Exponentielle : la probabilité de panne avant x et la survie au-delà de x se déduisent l’une de l’autre par le complément."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Loi de X",
        "stdin": "q:1",
        "expected": "exponentielle||loi exponentielle"
      },
      {
        "label": "Question 2 — Probabilité P(X ≥ 2)",
        "stdin": "q:2",
        "expected": "0,368||0,3679"
      },
      {
        "label": "Question 3 — Probabilité P(X ≤ 2)",
        "stdin": "q:3",
        "expected": "0,632||0,6321"
      },
      {
        "label": "Question 4 — Probabilité P(X ≥ 4)",
        "stdin": "q:4",
        "expected": "0,135||0,1353"
      },
      {
        "label": "Question 5 — Probabilité de survivre encore 2 heures de plus",
        "stdin": "q:5",
        "expected": "0,368||0,3679"
      },
      {
        "label": "Question 6 — Durée de vie moyenne E(X)",
        "stdin": "q:6",
        "expected": "2||2 heures"
      }
    ],
    "solution": "[Question 1 — Loi de X (un mot)]\nexponentielle\n\n[Question 2 — Probabilité P(X ≥ 2)]\n0,368\n\n[Question 3 — Probabilité P(X ≤ 2)]\n0,632\n\n[Question 4 — Probabilité P(X ≥ 4)]\n0,135\n\n[Question 5 — Probabilité de survivre encore 2 heures de plus]\n0,368\n\n[Question 6 — Durée de vie moyenne E(X) en heures]\n2",
    "takeaway": "1) La durée de vie suit la loi exponentielle de paramètre λ = 0,5.\n2) P(X ≥ 2) = e^(−0,5×2) = e^(−1) = 0,368.\n3) P(X ≤ 2) = 1 − P(X ≥ 2) = 1 − 0,368 = 0,632 : panne avant 2 heures et survie au-delà sont contraires.\n4) P(X ≥ 4) = e^(−0,5×4) = e^(−2) = 0,135.\n5) Sans mémoire : P(X ≥ 4 sachant X ≥ 2) = P(X ≥ 2) = e^(−1) = 0,368. Les 2 heures déjà survécues sont « oubliées » : la loi du temps restant est la même qu’au premier jour.\n6) E(X) = 1/λ = 1/0,5 = 2 heures de fonctionnement moyen.\nContrôle : P(X ≥ 2) + P(X ≤ 2) = 0,368 + 0,632 = 1 (OK). Lecture métier : plus un disque a tourné, plus sa probabilité de panne immédiate paraît grande — la loi exponentielle dément cette intuition, remplacer préventivement un disque sain de cette loi n’allonge pas l’espérance de service."
  },
  {
    "id": "pb2-c5-e3",
    "chapter": 5,
    "level": "n3",
    "language": "analyse",
    "title": "L’enquête de satisfaction client",
    "exampleTitle": "Exemple résolu — les notes d’un concours d’entrée",
    "goal": "Standardiser une loi normale, exploiter la symétrie et la règle empirique 68 / 95 / 99,7 %.",
    "brief": "<p><strong>Énoncé.</strong> Le service qualité d’un opérateur téléphonique mesure la satisfaction de ses clients par un score sur 100. Ce score X suit la <strong>loi normale</strong> de moyenne <code>μ = 70</code> et d’écart-type <code>σ = 5</code>.</p><p>Rappels : on standardise par <code>Z = (X − μ)/σ</code> ; la loi normale est symétrique autour de sa moyenne ; environ <strong>68 %</strong> des valeurs tombent dans [μ − σ ; μ + σ] et <strong>95 %</strong> dans [μ − 2σ ; μ + 2σ] ; on donne <code>Φ(1) ≈ 0,84</code>.</p><ol><li>Calculer le score standardisé Z d’un client qui a donné 75.</li><li>Calculer le score standardisé Z d’un client qui a donné 60.</li><li>Quelle est la probabilité qu’un client ait un score inférieur ou égal à 70 ?</li><li>Quelle proportion, en pourcentage, des clients a un score entre 65 et 75 ?</li><li>Quelle proportion, en pourcentage, des clients a un score entre 60 et 80 ?</li><li>Le seuil « client très satisfait » est fixé à 75 : quelle proportion, en pourcentage, des clients est très satisfaite ?</li></ol><p>Pour les questions 1 et 2, donnez la valeur signée seule (par exemple -1,5), sans lettre ni symbole ; les proportions en pourcentage, valeur seule (16 ou 16 %).</p>",
    "starter": "# Exercice — L’enquête de satisfaction client\n# Lisez l’énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Réponse attendue : la valeur seule (Z signé, probabilité ou pourcentage), sans texte.\n\n[Question 1 — Score standardisé Z pour 75]\nA_COMPLETER\n\n[Question 2 — Score standardisé Z pour 60]\nA_COMPLETER\n\n[Question 3 — Probabilité P(X ≤ 70)]\nA_COMPLETER\n\n[Question 4 — Proportion de scores entre 65 et 75 (en %)]\nA_COMPLETER\n\n[Question 5 — Proportion de scores entre 60 et 80 (en %)]\nA_COMPLETER\n\n[Question 6 — Proportion de clients très satisfaits (en %)]\nA_COMPLETER\n",
    "hints": [
      "La standardisation recentre puis réduit : Z = (X − 70)/5. Pour chaque score, calculez d’abord l’écart à la moyenne, puis divisez-le par 5.",
      "La moyenne 70 est aussi le centre de symétrie de la cloche : la moitié des clients est en dessous, la moitié au-dessus.",
      "Les intervalles [65 ; 75] et [60 ; 80] sont exactement les intervalles à ±1σ et ±2σ : la règle empirique donne directement les proportions. Pour le seuil de 75, P(X ≥ 75) = 1 − Φ(1)."
    ],
    "examples": [
      {
        "stdin": "Les notes d’un concours d’entrée suivent la loi normale N(μ = 50, σ = 10).\n\n1) Z d’une note de 60 : (60 − 50)/10 = 1.\n2) Z d’une note de 30 : (30 − 50)/10 = −2.\n3) P(note ≤ 50) = 0,5 (symétrie).\n4) Proportion entre 40 et 60 (±1σ) : 68 %.\n5) Avec Φ(1) ≈ 0,84 : P(note ≥ 60) = 1 − 0,84 = 0,16, soit 16 %.",
        "expected": "Z(60) = 1 — Z(30) = −2 — P(≤ 50) = 0,5 — 68 % entre 40 et 60 — 16 % au-dessus de 60",
        "note": "Standardiser ramène toute loi normale à N(0, 1) : un écart à la moyenne se mesure alors en nombres d’écarts-types."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Score standardisé Z pour 75",
        "stdin": "q:1",
        "expected": "1||+1||z=1||z = 1"
      },
      {
        "label": "Question 2 — Score standardisé Z pour 60",
        "stdin": "q:2",
        "expected": "-2||−2||z=-2||z = -2"
      },
      {
        "label": "Question 3 — Probabilité P(X ≤ 70)",
        "stdin": "q:3",
        "expected": "0,5||1/2||50 %||50"
      },
      {
        "label": "Question 4 — Proportion de scores entre 65 et 75 (en %)",
        "stdin": "q:4",
        "expected": "68||68 %||0,68"
      },
      {
        "label": "Question 5 — Proportion de scores entre 60 et 80 (en %)",
        "stdin": "q:5",
        "expected": "95||95 %||0,95"
      },
      {
        "label": "Question 6 — Proportion de clients très satisfaits (en %)",
        "stdin": "q:6",
        "expected": "16||16 %||0,16"
      }
    ],
    "solution": "[Question 1 — Score standardisé Z pour 75]\n1\n\n[Question 2 — Score standardisé Z pour 60]\n-2\n\n[Question 3 — Probabilité P(X ≤ 70)]\n0,5\n\n[Question 4 — Proportion de scores entre 65 et 75 (en %)]\n68\n\n[Question 5 — Proportion de scores entre 60 et 80 (en %)]\n95\n\n[Question 6 — Proportion de clients très satisfaits (en %)]\n16",
    "takeaway": "1) Z = (75 − 70)/5 = 5/5 = 1 : un client à 75 se situe à un écart-type au-dessus de la moyenne.\n2) Z = (60 − 70)/5 = −10/5 = −2 : deux écarts-types en dessous.\n3) 70 est la moyenne, donc le centre de symétrie : P(X ≤ 70) = 0,5.\n4) [65 ; 75] = [μ − σ ; μ + σ] : par la règle empirique, environ 68 % des clients y figurent.\n5) [60 ; 80] = [μ − 2σ ; μ + 2σ] : environ 95 % des clients.\n6) P(X ≥ 75) = P(Z ≥ 1) = 1 − Φ(1) = 1 − 0,84 = 0,16, soit 16 % de clients très satisfaits.\nContrôle : la moitié (50 %) au-dessus de 70, dont 68/2 = 34 % entre 70 et 75 — il reste 50 − 34 = 16 % au-dessus de 75 (OK). La règle empirique et la valeur Φ(1) racontent la même histoire."
  }
];
