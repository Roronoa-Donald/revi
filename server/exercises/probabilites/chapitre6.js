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
    "title": "Le budget publicitaire de l’équipe marketing",
    "exampleTitle": "Exemple résolu — les photocopies du centre de documentation",
    "goal": "Majorer la probabilité de dépasser un seuil par l’inégalité de Markov et interpréter la borne obtenue.",
    "brief": "<p><strong>Énoncé.</strong> L’équipe marketing étudie X, le montant des dépenses quotidiennes en campagnes publicitaires, exprimé en centaines d’euros. X est une variable <strong>positive</strong> d’espérance <code>E(X) = 6</code> (soit 600 € en moyenne par jour). Sans connaître la loi exacte de X, on veut borner la probabilité que la journée soit très coûteuse.</p><p>Rappel (inégalité de Markov, pour X positive et a &gt; 0) : <code>P(X ≥ a) ≤ E(X)/a</code>.</p><ol><li>Majorer la probabilité que la journée coûte au moins 12 (centaines d’euros).</li><li>Majorer la probabilité que la journée coûte au moins 18.</li><li>Majorer la probabilité que la journée coûte au moins 30.</li><li>Majorer la probabilité que la journée coûte au moins 24.</li><li>Quand le seuil double (de 12 à 24), par quel facteur la borne de Markov est-elle divisée ?</li><li>L’inégalité de Markov fournit-elle la probabilité exacte de dépasser le seuil ? Répondez par un seul mot : majorant, minorant ou exacte.</li></ol><p>Donnez les probabilités en fraction réduite (1/3) ou en décimal exact (0,5), la valeur seule, sans texte.</p>",
    "starter": "# Exercice — Le budget publicitaire de l’équipe marketing\n# Lisez l’énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Réponse attendue : la valeur seule (fraction réduite ou décimal exact) ; un entier ou un mot sinon.\n\n[Question 1 — Borne pour un seuil de 12]\nA_COMPLETER\n\n[Question 2 — Borne pour un seuil de 18]\nA_COMPLETER\n\n[Question 3 — Borne pour un seuil de 30]\nA_COMPLETER\n\n[Question 4 — Borne pour un seuil de 24]\nA_COMPLETER\n\n[Question 5 — Facteur de division quand le seuil double]\nA_COMPLETER\n\n[Question 6 — Ce que fournit Markov (un mot)]\nA_COMPLETER\n",
    "hints": [
      "L’inégalité de Markov s’applique car X est positive : la borne s’écrit E(X)/a, avec E(X) = 6 et a le seuil envisagé.",
      "Chaque question remplace simplement a par sa valeur (12, 18, 30 puis 24) : la borne est une fraction que l’on réduit après division.",
      "Comparez les bornes obtenues pour les seuils 12 et 24 : leur rapport répond à la question 5. Markov ne donne jamais la valeur exacte, seulement une limite que la vraie probabilité ne peut pas dépasser."
    ],
    "examples": [
      {
        "stdin": "Le centre de documentation mesure Z, le coût quotidien de photocopies (en euros), variable positive d’espérance 15 €.\n\n1) P(Z ≥ 20) ≤ 15/20 = 0,75.\n2) P(Z ≥ 25) ≤ 15/25 = 0,6.\n3) P(Z ≥ 50) ≤ 15/50 = 0,3.\n4) P(Z ≥ 15) ≤ 15/15 = 1 : borne triviale, elle n’apprend rien.",
        "expected": "borne(20) = 0,75 — borne(25) = 0,6 — borne(50) = 0,3 — borne(15) = 1 (triviale)",
        "note": "Un seuil inférieur ou égal à l’espérance donne une borne supérieure à 1 : l’inégalité reste vraie mais n’apprend rien."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Borne pour un seuil de 12",
        "stdin": "q:1",
        "expected": "0,5||1/2||50 %||50"
      },
      {
        "label": "Question 2 — Borne pour un seuil de 18",
        "stdin": "q:2",
        "expected": "1/3"
      },
      {
        "label": "Question 3 — Borne pour un seuil de 30",
        "stdin": "q:3",
        "expected": "0,2||1/5||20 %||20"
      },
      {
        "label": "Question 4 — Borne pour un seuil de 24",
        "stdin": "q:4",
        "expected": "0,25||1/4||25 %||25"
      },
      {
        "label": "Question 5 — Facteur de division quand le seuil double",
        "stdin": "q:5",
        "expected": "2"
      },
      {
        "label": "Question 6 — Ce que fournit Markov",
        "stdin": "q:6",
        "expected": "majorant||un majorant"
      }
    ],
    "solution": "[Question 1 — Borne pour un seuil de 12]\n0,5\n\n[Question 2 — Borne pour un seuil de 18]\n1/3\n\n[Question 3 — Borne pour un seuil de 30]\n0,2\n\n[Question 4 — Borne pour un seuil de 24]\n0,25\n\n[Question 5 — Facteur de division quand le seuil double]\n2\n\n[Question 6 — Ce que fournit Markov (un mot)]\nmajorant",
    "takeaway": "1) P(X ≥ 12) ≤ E(X)/12 = 6/12 = 1/2 = 0,5.\n2) P(X ≥ 18) ≤ 6/18 = 1/3.\n3) P(X ≥ 30) ≤ 6/30 = 1/5 = 0,2.\n4) P(X ≥ 24) ≤ 6/24 = 1/4 = 0,25.\n5) Doubler le seuil (12 → 24) fait passer la borne de 0,5 à 0,25 : elle est divisée par 2, car le seuil a est au dénominateur.\n6) L’inégalité de Markov fournit un majorant : la vraie probabilité peut être bien plus petite, mais jamais plus grande que la borne.\nContrôle de cohérence : les bornes diminuent à mesure que le seuil s’éloigne de l’espérance (seuils croissants 12, 18, 24, 30 et bornes décroissantes 0,5 ; 1/3 ; 0,25 ; 0,2) — plus la journée envisagée est extrême, plus l’inégalité resserre la possibilité de la dépasser. Aucune loi de X n’a été nécessaire : c’est la force de Markov."
  },
  {
    "id": "pb2-c6-e2",
    "chapter": 6,
    "level": "n2",
    "language": "analyse",
    "title": "Le pesage des colis du centre logistique",
    "exampleTitle": "Exemple résolu — la durée de traitement des dossiers",
    "goal": "Majorer un écart à la moyenne par l’inégalité de Bienaymé-Tchebychev, minorer l’événement contraire et choisir la bonne inégalité.",
    "brief": "<p><strong>Énoncé.</strong> Sur le tapis d’un centre logistique, la masse X des colis (en kg) a pour espérance <code>E(X) = 10</code> et pour variance <code>V(X) = 4</code>. Sans connaître la loi de X, on veut borner la probabilité qu’un colis s’écarte fortement de la masse moyenne.</p><p>Rappel (inégalité de Bienaymé-Tchebychev, pour ε &gt; 0) : <code>P(|X − E(X)| ≥ ε) ≤ V(X)/ε²</code>.</p><ol><li>Majorer la probabilité qu’un colis s’écarte d’au moins 2 kg de la moyenne (ε = 2).</li><li>Majorer cette probabilité pour un écart d’au moins 4 kg (ε = 4).</li><li>Majorer cette probabilité pour un écart d’au moins 6 kg (ε = 6).</li><li>En déduire un minorant de la probabilité qu’un colis pèse entre 6 et 14 kg (écart à la moyenne strictement inférieur à 4 kg).</li><li>Quand ε passe de 2 à 4, par quel facteur la borne est-elle divisée ?</li><li>Pour majorer directement P(X ≥ 20), sans valeur absolue, quelle inégalité suffit ? Répondez par un seul mot.</li></ol><p>Donnez les probabilités en fraction réduite ou en décimal exact, la valeur seule, sans texte.</p>",
    "starter": "# Exercice — Le pesage des colis du centre logistique\n# Lisez l’énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Réponse attendue : la valeur seule (fraction réduite ou décimal exact) ; un entier ou un mot sinon.\n\n[Question 1 — Borne pour ε = 2 kg]\nA_COMPLETER\n\n[Question 2 — Borne pour ε = 4 kg]\nA_COMPLETER\n\n[Question 3 — Borne pour ε = 6 kg]\nA_COMPLETER\n\n[Question 4 — Minorant pour un colis entre 6 et 14 kg]\nA_COMPLETER\n\n[Question 5 — Facteur de division quand ε double]\nA_COMPLETER\n\n[Question 6 — Inégalité à utiliser (un mot)]\nA_COMPLETER\n",
    "hints": [
      "Tchebychev majore l’écart à la moyenne : la borne est V(X)/ε², avec V(X) = 4 et ε l’écart toléré en kg.",
      "Élevez ε au carré avant de diviser : pour ε = 2, 4 puis 6, les dénominateurs sont 4, 16 et 36. Une borne qui atteint 1 n’apprend rien (toute probabilité est au plus 1).",
      "L’événement contraire de « s’écarter d’au moins 4 kg » est « rester à moins de 4 kg de la moyenne », c’est-à-dire un colis entre 6 et 14 kg : minorez-le par 1 moins la borne. Le facteur de la question 5 se lit sur le passage de ε à ε²."
    ],
    "examples": [
      {
        "stdin": "La durée de traitement d’un dossier administratif (en jours) a E = 5 et V = 2.\n\n1) P(|X − 5| ≥ 2) ≤ 2/4 = 0,5.\n2) P(|X − 5| ≥ 4) ≤ 2/16 = 1/8.\n3) P(|X − 5| < 4) ≥ 1 − 1/8 = 7/8 : au moins 7 dossiers sur 8 sont traités entre 1 et 9 jours.",
        "expected": "borne(2) = 0,5 — borne(4) = 1/8 — minorant (entre 1 et 9 jours) = 7/8",
        "note": "Passer de ε à 2ε divise la borne par 4 : le seuil intervient au carré, contrairement à Markov."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Borne pour ε = 2 kg",
        "stdin": "q:1",
        "expected": "1||1,0||100 %||100"
      },
      {
        "label": "Question 2 — Borne pour ε = 4 kg",
        "stdin": "q:2",
        "expected": "1/4||0,25||25 %||25"
      },
      {
        "label": "Question 3 — Borne pour ε = 6 kg",
        "stdin": "q:3",
        "expected": "1/9"
      },
      {
        "label": "Question 4 — Minorant pour un colis entre 6 et 14 kg",
        "stdin": "q:4",
        "expected": "3/4||0,75||75 %||75"
      },
      {
        "label": "Question 5 — Facteur de division quand ε double",
        "stdin": "q:5",
        "expected": "4"
      },
      {
        "label": "Question 6 — Inégalité à utiliser",
        "stdin": "q:6",
        "expected": "markov||l’inegalite de markov||l’inégalité de markov"
      }
    ],
    "solution": "[Question 1 — Borne pour ε = 2 kg]\n1\n\n[Question 2 — Borne pour ε = 4 kg]\n1/4\n\n[Question 3 — Borne pour ε = 6 kg]\n1/9\n\n[Question 4 — Minorant pour un colis entre 6 et 14 kg]\n3/4\n\n[Question 5 — Facteur de division quand ε double]\n4\n\n[Question 6 — Inégalité à utiliser (un mot)]\nmarkov",
    "takeaway": "1) P(|X − 10| ≥ 2) ≤ V(X)/ε² = 4/4 = 1 : borne triviale — toute probabilité est au plus 1, cette question n’apprend rien (c’est le piège classique du cours).\n2) P(|X − 10| ≥ 4) ≤ 4/16 = 1/4 = 0,25.\n3) P(|X − 10| ≥ 6) ≤ 4/36 = 1/9.\n4) L’événement « entre 6 et 14 kg » est le contraire de « s’écarter d’au moins 4 kg » : P(6 ≤ X ≤ 14) ≥ 1 − 1/4 = 3/4 (au sens strict, P(|X − 10| < 4) ≥ 3/4). Au moins trois colis sur quatre pèsent entre 6 et 14 kg.\n5) La borne passe de 4/4 = 1 à 4/16 = 1/4 : doubler ε divise la borne par 2² = 4, car ε intervient au carré.\n6) Sans valeur absolue, pour majorer P(X ≥ 20) d’une variable positive, l’inégalité de Markov suffit : P(X ≥ 20) ≤ E(X)/20 = 10/20 = 0,5.\nContrôle : la borne se resserre quand l’écart toléré grandit (1, puis 1/4, puis 1/9) ; le minorant 3/4 et la borne 1/4 somment à 1, comme un événement et son contraire."
  },
  {
    "id": "pb2-c6-e3",
    "chapter": 6,
    "level": "n3",
    "language": "analyse",
    "title": "Le taux de conversion du site marchand",
    "exampleTitle": "Exemple résolu — la file d’attente du guichet",
    "goal": "Calculer espérance, variance et écarts-types d’une somme et d’une fréquence d’échantillon, puis approximer par le théorème central limite.",
    "brief": "<p><strong>Énoncé.</strong> Le site marchand reçoit <strong>100 visites</strong> indépendantes. Chaque visite aboutit à un achat avec la probabilité <code>p = 0,2</code>. On note S le nombre d’achats issus des 100 visites et F = S/100 la fréquence d’achats.</p><p>Rappels : chaque visite est une épreuve de Bernoulli, d’espérance p et de variance p(1−p) ; pour une somme S de n variables indépendantes de moyenne μ et d’écart-type σ : E(S) = nμ et σ(S) = σ√n ; pour la fréquence F = S/n : E(F) = μ et σ(F) = σ/√n. Théorème central limite : (S − nμ)/(σ√n) suit approximativement la loi normale centrée réduite. On donne <code>Φ(1) ≈ 0,84</code>.</p><ol><li>Quelle est l’espérance E(S) du nombre d’achats ?</li><li>Quelle est la variance V(S) ?</li><li>Quel est l’écart-type σ(S) ?</li><li>Quel est l’écart-type σ(F) de la fréquence d’achats ?</li><li>Par le théorème central limite, calculer P(S ≤ 24) après standardisation.</li><li>Quelle est la loi suivie approximativement par la variable standardisée (S − E(S))/σ(S) ? Répondez par un seul mot.</li></ol><p>Donnez les valeurs en décimal exact (0,04 par exemple), la valeur seule, sans texte.</p>",
    "starter": "# Exercice — Le taux de conversion du site marchand\n# Lisez l’énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Réponse attendue : la valeur seule (décimal exact) ; un mot pour la question 6.\n\n[Question 1 — Espérance E(S)]\nA_COMPLETER\n\n[Question 2 — Variance V(S)]\nA_COMPLETER\n\n[Question 3 — Écart-type σ(S)]\nA_COMPLETER\n\n[Question 4 — Écart-type de la fréquence σ(F)]\nA_COMPLETER\n\n[Question 5 — Probabilité approchée P(S ≤ 24)]\nA_COMPLETER\n\n[Question 6 — Loi de la variable standardisée (un mot)]\nA_COMPLETER\n",
    "hints": [
      "S suit une loi binomiale B(100 ; 0,2) : l’espérance np et la variance np(1−p) se calculent directement à partir de n et p.",
      "L’écart-type est la racine carrée de la variance — ici une racine carrée exacte. Pour la fréquence F = S/100, l’écart-type se déduit de celui de S en divisant par n = 100.",
      "Standardisez le seuil : écartez 24 de l’espérance de S, divisez par l’écart-type de S, puis lisez Φ(1). La loi limite du théorème central limite est celle de la variable standardisée."
    ],
    "examples": [
      {
        "stdin": "Un guichet observe 64 clients indépendants ; le temps d’attente de chacun a une moyenne μ = 10 min et un écart-type σ = 3 min. S = temps total d’attente, F = temps moyen d’attente par client.\n\n1) E(S) = 64 × 10 = 640 min.\n2) σ(S) = 3 × √64 = 3 × 8 = 24 min.\n3) σ(F) = 3/√64 = 3/8 = 0,375 min.\n4) P(S ≤ 664) : z = (664 − 640)/24 = 1, donc ≈ Φ(1) ≈ 0,84.",
        "expected": "E(S) = 640 — σ(S) = 24 — σ(F) = 0,375 — P(S ≤ 664) ≈ 0,84",
        "note": "La somme disperse (écart-type multiplié par √n), la moyenne resserre (écart-type divisé par √n) : deux phénomènes complémentaires."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Espérance E(S)",
        "stdin": "q:1",
        "expected": "20||20,0||20 achats"
      },
      {
        "label": "Question 2 — Variance V(S)",
        "stdin": "q:2",
        "expected": "16"
      },
      {
        "label": "Question 3 — Écart-type σ(S)",
        "stdin": "q:3",
        "expected": "4||4,0"
      },
      {
        "label": "Question 4 — Écart-type de la fréquence σ(F)",
        "stdin": "q:4",
        "expected": "0,04||1/25"
      },
      {
        "label": "Question 5 — Probabilité approchée P(S ≤ 24)",
        "stdin": "q:5",
        "expected": "0,84||84 %||84"
      },
      {
        "label": "Question 6 — Loi de la variable standardisée",
        "stdin": "q:6",
        "expected": "normale||loi normale||normale centree reduite||n 0,1"
      }
    ],
    "solution": "[Question 1 — Espérance E(S)]\n20\n\n[Question 2 — Variance V(S)]\n16\n\n[Question 3 — Écart-type σ(S)]\n4\n\n[Question 4 — Écart-type de la fréquence σ(F)]\n0,04\n\n[Question 5 — Probabilité approchée P(S ≤ 24)]\n0,84\n\n[Question 6 — Loi de la variable standardisée (un mot)]\nnormale",
    "takeaway": "1) E(S) = n × p = 100 × 0,2 = 20 achats attendus.\n2) V(S) = n × p × (1−p) = 100 × 0,2 × 0,8 = 16.\n3) σ(S) = √16 = 4 achats.\n4) F = S/100 : σ(F) = σ(S)/100 = 4/100 = 0,04 (soit 4 points de fréquence). On retrouve aussi σ(F) = √(p(1−p)/n) = √(0,16/100) = 0,4/10 = 0,04.\n5) Standardisation : z = (24 − 20)/4 = 1. Par le théorème central limite, P(S ≤ 24) ≈ Φ(1) ≈ 0,84.\n6) La variable standardisée (S − E(S))/σ(S) suit approximativement la loi normale (centrée réduite) : c’est la conclusion du théorème central limite.\nContrôle : la fréquence observée F a une espérance p = 0,2 (identique à la probabilité par visite) mais un écart-type de 0,04 : sur 100 visites, la fréquence d’achats fluctue typiquement entre 0,16 et 0,24 — c’est la loi des grands nombres qui garantit le resserrement quand n croît."
  }
];
