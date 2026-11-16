/**
 * Exercices mis à jour — remédiation pédagogique
 */
'use strict';

module.exports = [
  {
    "id": "st-c1-e1",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "L'enquête du magasin de sport",
    "exampleTitle": "Exemple résolu — l'enquête de la boulangerie",
    "goal": "Identifier la population, le caractère, son type et les modalités d'une étude statistique réelle.",
    "brief": "<p><strong>Énoncé.</strong> Un magasin de sport souhaite mieux connaître sa clientèle. Il interroge <strong>25 clients</strong> sur la question suivante : « Quel sport pratiquez-vous le plus souvent ? ». Les réponses recensées sont :</p><table><tr><th>Sport pratiqué</th><th>Football</th><th>Basketball</th><th>Tennis</th><th>Natation</th><th>Course à pied</th></tr><tr><th>Nombre de réponses</th><td>9</td><td>5</td><td>4</td><td>4</td><td>3</td></tr></table><p>Répondez aux questions suivantes. Pour les questions fermées, répondez par le mot exact attendu ; pour la question 2, répondez de façon courte (par exemple « le sport pratiqué »).</p><ol><li>Combien d'individus ont été interrogés dans cette enquête ?</li><li>Quel est le caractère étudié sur chaque individu ?</li><li>Quel est le type de ce caractère : qualitatif, quantitatif discret ou quantitatif continu ?</li><li>Combien de modalités possède ce caractère ?</li><li>Quel est l'effectif de la modalité « football » ?</li></ol>",
    "starter": "# Exercice — L'enquête du magasin de sport\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Nombre d'individus interrogés]\nA_COMPLETER\n\n[Question 2 — Le caractère étudié]\nA_COMPLETER\n\n[Question 3 — Type du caractère]\nA_COMPLETER\n\n[Question 4 — Nombre de modalités]\nA_COMPLETER\n\n[Question 5 — Effectif de la modalité football]\nA_COMPLETER\n",
    "hints": [
      "L'individu n'est pas forcément une personne : c'est un élément de la population. Ici, chaque client interrogé compte pour un individu.",
      "Le caractère est ce que l'on observe sur chaque individu ; son type dépend de ce qu'on peut en faire : compter seulement (qualitatif), ou calculer (quantitatif).",
      "Les modalités sont les valeurs distinctes prises par le caractère : listez les sports proposés dans le tableau, puis lisez l'effectif du football."
    ],
    "examples": [
      {
        "stdin": "Une boulangerie interroge 15 clients : « Quelle viennoiserie préférez-vous ? ».\nCroissant : 6 réponses — Pain au chocolat : 5 — Pain aux raisins : 4.\n\n1) 15 individus interrogés.\n2) Le caractère étudié est la viennoiserie préférée.\n3) Le caractère est qualitatif (on ne calcule pas une moyenne de viennoiseries).\n4) Il possède 3 modalités : croissant, pain au chocolat, pain aux raisins.\n5) L'effectif de « croissant » est 6.",
        "expected": "15 — la viennoiserie préférée — qualitatif — 3 modalités — effectif du croissant : 6",
        "note": "Le caractère « viennoiserie préférée » n'est pas un nombre : il est qualitatif, seule l'enquête des effectifs a un sens."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre d'individus interrogés",
        "stdin": "q:1",
        "expected": "25"
      },
      {
        "label": "Question 2 — Le caractère étudié",
        "stdin": "q:2",
        "expected": "le sport pratiqué||sport pratiqué||le sport le plus souvent pratiqué||le sport pratique"
      },
      {
        "label": "Question 3 — Type du caractère",
        "stdin": "q:3",
        "expected": "qualitatif||qualitative"
      },
      {
        "label": "Question 4 — Nombre de modalités",
        "stdin": "q:4",
        "expected": "5"
      },
      {
        "label": "Question 5 — Effectif de la modalité football",
        "stdin": "q:5",
        "expected": "9"
      }
    ],
    "solution": "[Question 1 — Nombre d'individus interrogés]\n25\n\n[Question 2 — Le caractère étudié]\nle sport pratiqué\n\n[Question 3 — Type du caractère]\nqualitatif\n\n[Question 4 — Nombre de modalités]\n5\n\n[Question 5 — Effectif de la modalité football]\n9",
    "takeaway": "1) 25 clients ont été interrogés : l'effectif total de l'enquête est 25.\n2) Le caractère étudié est le sport le plus souvent pratiqué par le client.\n3) Les modalités (football, basketball, tennis, natation, course à pied) ne sont pas des nombres : le caractère est qualitatif. On ne peut que compter les effectifs, aucune moyenne n'a de sens.\n4) Le caractère prend 5 valeurs distinctes : il possède 5 modalités.\n5) L'effectif de la modalité « football » se lit dans le tableau : 9 clients.\nContrôle : 9 + 5 + 4 + 4 + 3 = 25, on retrouve bien l'effectif total."
  },
  {
    "id": "st-c1-e2",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "Les temps de trajet de l'assistante",
    "exampleTitle": "Exemple résolu — les livraisons du coursier",
    "goal": "Passer d'une série brute à la série ordonnée, lire l'effectif, les extrêmes et les valeurs distinctes.",
    "brief": "<p><strong>Énoncé.</strong> Chaque matin du mois de mars, une assistante de direction note le temps de trajet (en minutes) entre son domicile et son bureau. Sur <strong>8 jours</strong>, elle a relevé la série brute suivante :</p><p><code>42 — 35 — 42 — 28 — 35 — 42 — 31 — 35</code></p><p>Pour la question 2, écrivez la série ordonnée sur une seule ligne, valeurs séparées par des espaces.</p><ol><li>Quel est l'effectif total de la série ?</li><li>Donnez la série ordonnée par valeurs croissantes.</li><li>Quelle est la plus petite valeur de la série ?</li><li>Combien de valeurs distinctes (modalités) comporte cette série ?</li><li>Quel est l'effectif de la valeur 42 ?</li></ol>",
    "starter": "# Exercice — Les temps de trajet de l'assistante\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Effectif total]\nA_COMPLETER\n\n[Question 2 — Série ordonnée (valeurs séparées par des espaces)]\nA_COMPLETER\n\n[Question 3 — Plus petite valeur]\nA_COMPLETER\n\n[Question 4 — Nombre de valeurs distinctes]\nA_COMPLETER\n\n[Question 5 — Effectif de la valeur 42]\nA_COMPLETER\n",
    "hints": [
      "L'effectif total est le nombre de valeurs relevées, répétitions comprises.",
      "Pour ordonner : repérez d'abord le minimum, puis rangez chaque valeur par ordre croissant en gardant tous les doublons.",
      "Les valeurs distinctes sont les valeurs différentes une fois les doublons retirés ; comptez ensuite combien de fois 42 apparaît dans la série brute."
    ],
    "examples": [
      {
        "stdin": "Un coursier relève ses temps de livraison (en minutes) sur 5 jours :\n12 — 9 — 12 — 15 — 9\n\n1) Effectif total : 5 valeurs.\n2) Série ordonnée : 9 9 12 12 15.\n3) Plus petite valeur : 9.\n4) Valeurs distinctes : 9, 12, 15 — soit 3 modalités.\n5) L'effectif de la valeur 9 est 2.",
        "expected": "5 — série ordonnée : 9 9 12 12 15 — minimum : 9 — 3 modalités — effectif de 9 : 2",
        "note": "La série ordonnée conserve toutes les valeurs, y compris les répétitions : elle compte toujours autant de valeurs que la série brute."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Effectif total",
        "stdin": "q:1",
        "expected": "8"
      },
      {
        "label": "Question 2 — Série ordonnée",
        "stdin": "q:2",
        "expected": "28 31 35 35 35 42 42 42"
      },
      {
        "label": "Question 3 — Plus petite valeur",
        "stdin": "q:3",
        "expected": "28"
      },
      {
        "label": "Question 4 — Nombre de valeurs distinctes",
        "stdin": "q:4",
        "expected": "4"
      },
      {
        "label": "Question 5 — Effectif de la valeur 42",
        "stdin": "q:5",
        "expected": "3"
      }
    ],
    "solution": "[Question 1 — Effectif total]\n8\n\n[Question 2 — Série ordonnée (valeurs séparées par des espaces)]\n28 31 35 35 35 42 42 42\n\n[Question 3 — Plus petite valeur]\n28\n\n[Question 4 — Nombre de valeurs distinctes]\n4\n\n[Question 5 — Effectif de la valeur 42]\n3",
    "takeaway": "1) La série brute compte 8 valeurs : l'effectif total est N = 8.\n2) Série ordonnée : 28, 31, 35, 35, 35, 42, 42, 42.\n3) La plus petite valeur est 28 minutes.\n4) Les valeurs distinctes sont 28, 31, 35 et 42 : 4 modalités.\n5) La valeur 42 apparaît 3 fois dans la série brute : son effectif est 3.\nContrôle : 28 + 31 + 3×35 + 3×42 = 290, et la série brute somme aussi 42+35+42+28+35+42+31+35 = 290."
  },
  {
    "id": "st-c1-e3",
    "chapter": 1,
    "level": "n2",
    "language": "analyse",
    "title": "Le recrutement des agents de sécurité",
    "exampleTitle": "Exemple résolu — les prix d'une épicerie",
    "goal": "Découper un caractère continu en classes de même amplitude et manipuler bornes et centres de classes.",
    "brief": "<p><strong>Énoncé.</strong> Une société de sécurité privée organise une journée de recrutement. Les tailles des 20 candidats mesurés s'échelonnent de <strong>165 cm à 190 cm</strong>. Pour analyser cette série, le responsable des ressources humaines la regroupe en <strong>5 classes de même amplitude</strong> :</p><table><tr><th>Classe</th><th>[165 ; 170[</th><th>[170 ; 175[</th><th>[175 ; 180[</th><th>[180 ; 185[</th><th>[185 ; 190]</th></tr></table><p>Rappel du cours : une classe inclut sa borne inférieure et exclut sa borne supérieure, sauf la dernière classe, fermée sur le maximum.</p><ol><li>Quelle est l'amplitude commune de chaque classe (en cm) ?</li><li>Quel est le centre de la classe [165 ; 170[ ?</li><li>Quel est le centre de la classe [175 ; 180[ ?</li><li>À quelle classe appartient un candidat mesurant exactement 180 cm ?</li><li>À quelle classe appartient un candidat mesurant exactement 190 cm ?</li></ol>",
    "starter": "# Exercice — Le recrutement des agents de sécurité\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Pour les questions 4 et 5, écrivez la classe au format [180 ; 185[ .\n\n[Question 1 — Amplitude d'une classe]\nA_COMPLETER\n\n[Question 2 — Centre de la classe [165 ; 170[]\nA_COMPLETER\n\n[Question 3 — Centre de la classe [175 ; 180[]\nA_COMPLETER\n\n[Question 4 — Classe du candidat mesurant 180 cm]\nA_COMPLETER\n\n[Question 5 — Classe du candidat mesurant 190 cm]\nA_COMPLETER\n",
    "hints": [
      "L'amplitude commune se calcule comme l'étendue divisée par le nombre de classes : a = (max − min)/k.",
      "Le centre d'une classe est la demi-somme de ses deux bornes : c = (borne inférieure + borne supérieure)/2.",
      "Pour les bornes : une valeur égale à une borne intérieure appartient à la classe qui commence à cette borne ; la valeur maximale appartient à la dernière classe, fermée à droite."
    ],
    "examples": [
      {
        "stdin": "Une épicerie relève les prix de 60 articles, de 10 € à 30 €, regroupés en 4 classes :\n[10 ; 15[ — [15 ; 20[ — [20 ; 25[ — [25 ; 30]\n\n1) Amplitude : (30 − 10)/4 = 5 €.\n2) Centre de [10 ; 15[ : (10 + 15)/2 = 12,5 €.\n3) Un article à 15 € appartient à [15 ; 20[.\n4) Un article à 30 € appartient à [25 ; 30].",
        "expected": "amplitude : 5 € — centre de la 1re classe : 12,5 € — 15 € est dans [15 ; 20[ — 30 € est dans [25 ; 30]",
        "note": "Chaque valeur n'est comptée qu'une seule fois : les bornes intérieures partent vers la classe suivante, seule la dernière borne reste dans la dernière classe."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Amplitude d'une classe",
        "stdin": "q:1",
        "expected": "5"
      },
      {
        "label": "Question 2 — Centre de la classe [165 ; 170[",
        "stdin": "q:2",
        "expected": "167,5"
      },
      {
        "label": "Question 3 — Centre de la classe [175 ; 180[",
        "stdin": "q:3",
        "expected": "177,5"
      },
      {
        "label": "Question 4 — Classe du candidat mesurant 180 cm",
        "stdin": "q:4",
        "expected": "[180 ; 185["
      },
      {
        "label": "Question 5 — Classe du candidat mesurant 190 cm",
        "stdin": "q:5",
        "expected": "[185 ; 190]"
      }
    ],
    "solution": "[Question 1 — Amplitude d'une classe]\n5\n\n[Question 2 — Centre de la classe [165 ; 170[]\n167,5\n\n[Question 3 — Centre de la classe [175 ; 180[]\n177,5\n\n[Question 4 — Classe du candidat mesurant 180 cm]\n[180 ; 185[\n\n[Question 5 — Classe du candidat mesurant 190 cm]\n[185 ; 190]",
    "takeaway": "1) Amplitude : a = (190 − 165)/5 = 25/5 = 5 cm.\n2) Centre de [165 ; 170[ : (165 + 170)/2 = 335/2 = 167,5 cm.\n3) Centre de [175 ; 180[ : (175 + 180)/2 = 355/2 = 177,5 cm.\n4) 180 cm est une borne intérieure : elle appartient à la classe [180 ; 185[ (la classe [175 ; 180[ l'exclut).\n5) 190 cm est le maximum : il appartient à la dernière classe, fermée à droite, [185 ; 190].\nLes centres de classe seront les valeurs utilisées pour tous les calculs ultérieurs (moyenne, écart-type) sur série groupée."
  },
  {
    "id": "st-c2-e1",
    "chapter": 2,
    "level": "n1",
    "language": "analyse",
    "title": "La location de vélos en bord de mer",
    "exampleTitle": "Exemple résolu — les canoës du camping",
    "goal": "Construire le tableau des effectifs d'une série brute et calculer des fréquences en pourcentage.",
    "brief": "<p><strong>Énoncé.</strong> Sur dix jours de haute saison, un loueur de vélos note chaque soir le nombre de vélos sortis dans la journée :</p><p><code>12 — 15 — 12 — 18 — 12 — 15 — 20 — 12 — 15 — 9</code></p><ol><li>Quel est l'effectif total N (nombre de jours observés) ?</li><li>Quel est l'effectif de la modalité « 12 vélos » ?</li><li>Quelle est la fréquence de la modalité « 15 vélos », en pourcentage ?</li><li>Combien de modalités compte cette série ?</li><li>Quelle est la fréquence de la modalité « 12 vélos », en pourcentage ?</li></ol><p>Arrondissez les fréquences à l'unité si nécessaire.</p>",
    "starter": "# Exercice — La location de vélos en bord de mer\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Effectif total N]\nA_COMPLETER\n\n[Question 2 — Effectif de la modalité 12]\nA_COMPLETER\n\n[Question 3 — Fréquence en % de la modalité 15]\nA_COMPLETER\n\n[Question 4 — Nombre de modalités]\nA_COMPLETER\n\n[Question 5 — Fréquence en % de la modalité 12]\nA_COMPLETER\n",
    "hints": [
      "Construisez d'abord le tableau : une colonne par valeur distincte (9, 12, 15, 18, 20) et le nombre de jours correspondants.",
      "La fréquence d'une modalité est son effectif divisé par l'effectif total, multiplié par 100.",
      "Contrôle final : la somme de toutes les fréquences doit faire 100 %."
    ],
    "examples": [
      {
        "stdin": "Un camping note le nombre de canoës loués par jour sur 5 jours :\n10 — 10 — 20 — 30 — 30\n\nTableau : 10 → 2 jours ; 20 → 1 jour ; 30 → 2 jours (N = 5).\n1) Effectif total : 5.\n2) Effectif de la modalité 10 : 2.\n3) Fréquence de 10 : 2/5 × 100 = 40 %.\n4) Nombre de modalités : 3.",
        "expected": "N = 5 — effectif de 10 : 2 — fréquence de 10 : 40 % — 3 modalités",
        "note": "Le tableau des effectifs se construit en comptant les répétitions de chaque valeur distincte ; la somme des effectifs redonne N."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Effectif total N",
        "stdin": "q:1",
        "expected": "10"
      },
      {
        "label": "Question 2 — Effectif de la modalité 12",
        "stdin": "q:2",
        "expected": "4"
      },
      {
        "label": "Question 3 — Fréquence en % de la modalité 15",
        "stdin": "q:3",
        "expected": "30"
      },
      {
        "label": "Question 4 — Nombre de modalités",
        "stdin": "q:4",
        "expected": "5"
      },
      {
        "label": "Question 5 — Fréquence en % de la modalité 12",
        "stdin": "q:5",
        "expected": "40"
      }
    ],
    "solution": "[Question 1 — Effectif total N]\n10\n\n[Question 2 — Effectif de la modalité 12]\n4\n\n[Question 3 — Fréquence en % de la modalité 15]\n30\n\n[Question 4 — Nombre de modalités]\n5\n\n[Question 5 — Fréquence en % de la modalité 12]\n40",
    "takeaway": "Tableau des effectifs : 9 → 1 jour ; 12 → 4 jours ; 15 → 3 jours ; 18 → 1 jour ; 20 → 1 jour. Total : 1+4+3+1+1 = 10 (OK)\n1) N = 10 jours observés.\n2) La valeur 12 apparaît 4 fois : effectif 4.\n3) Fréquence de 15 : 3/10 × 100 = 30 %.\n4) Les valeurs distinctes sont 9, 12, 15, 18, 20 : 5 modalités.\n5) Fréquence de 12 : 4/10 × 100 = 40 %.\nContrôle : 10 % + 40 % + 30 % + 10 % + 10 % = 100 %."
  },
  {
    "id": "st-c2-e2",
    "chapter": 2,
    "level": "n2",
    "language": "analyse",
    "title": "Fréquences en pourcentage",
    "goal": "Convertir des effectifs en fréquences exprimées en pourcentage.",
    "brief": "<p>Dans cette étude, on considère un entier <code>n</code>, puis les <code>n</code> valeurs d’une série (une par ligne). Affichez, pour chaque modalité par ordre croissant, son pourcentage <code>100 × n<sub>i</sub> / N</code> arrondi à deux décimales, au format <code>valeur pourcentage</code>.</p>",
    "starter": "# Grille de calcul (st-c2-e2) — Fréquences en pourcentage\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Cinq valeurs, trois modalités]\n# Données : 5\n# Données : 1\n# Données : 2\n# Données : 2\n# Données : 3\n# Données : 3\nA_COMPLETER\n\n[Cas 2 — Une seule modalité]\n# Données : 2\n# Données : 7\n# Données : 7\nA_COMPLETER\n\n[Cas 3 — Quatre modalités équilibrées]\n# Données : 8\n# Données : 1\n# Données : 1\n# Données : 2\n# Données : 2\n# Données : 3\n# Données : 3\n# Données : 4\n# Données : 4\nA_COMPLETER\n",
    "hints": [
      "Le pourcentage est le quotient effectif / effectif total, multiplié par 100.",
      "Pour formater deux décimales : f\"{valeur:.2f}\".",
      "Sommez tous les effectifs pour obtenir N, calculez (n_i / N) * 100 pour chaque modalité puis vérifiez que le total avoisine 100.00."
    ],
    "examples": [
      {
        "stdin": "4\n1\n1\n1\n2",
        "expected": "1 75.00\n2 25.00",
        "note": "Trois valeurs sur quatre, puis une sur quatre."
      }
    ],
    "tests": [
      {
        "label": "Cinq valeurs, trois modalités",
        "stdin": "cas:1",
        "expected": "1 20.00\n2 40.00\n3 40.00"
      },
      {
        "label": "Une seule modalité",
        "stdin": "cas:2",
        "expected": "7 100.00"
      },
      {
        "label": "Quatre modalités équilibrées",
        "stdin": "cas:3",
        "expected": "1 25.00\n2 25.00\n3 25.00\n4 25.00"
      }
    ],
    "solution": "[Exemple]\n1 75.00\n2 25.00\n\n[Cas 1 — Cinq valeurs, trois modalités]\n1 20.00\n2 40.00\n3 40.00\n\n[Cas 2 — Une seule modalité]\n7 100.00\n\n[Cas 3 — Quatre modalités équilibrées]\n1 25.00\n2 25.00\n3 25.00\n4 25.00\n",
    "takeaway": "À retenir : Convertir des effectifs en fréquences exprimées en pourcentage.\nRepère : Trois valeurs sur quatre, puis une sur quatre."
  },
  {
    "id": "st-c2-e3",
    "chapter": 2,
    "level": "n2",
    "language": "analyse",
    "title": "Le standard téléphonique du SAV",
    "exampleTitle": "Exemple résolu — la file d'attente du guichet",
    "goal": "Interpréter des cumuls d'effectifs dans une situation de seuil et contrôler la somme des fréquences.",
    "brief": "<p><strong>Énoncé.</strong> Le responsable d'un service après-vente étudie la charge de son standard. Sur <strong>10 jours ouvrés</strong>, il relève le nombre d'appels reçus :</p><p><code>20 — 25 — 20 — 30 — 35 — 30 — 20 — 30 — 35 — 30</code></p><p>Le standard est considéré comme <strong>saturé</strong> à partir de 30 appels dans une journée.</p><ol><li>Quel est l'effectif total N ?</li><li>Quel est l'effectif cumulé croissant de la modalité 25 (jours avec au plus 25 appels) ?</li><li>Quel est l'effectif cumulé décroissant de la modalité 30 (jours avec au moins 30 appels) ?</li><li>Quelle est la fréquence, en pourcentage, des jours à 20 appels exactement ?</li><li>Quel pourcentage des jours le standard a-t-il été saturé ?</li></ol>",
    "starter": "# Exercice — Le standard téléphonique du SAV\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Effectif total N]\nA_COMPLETER\n\n[Question 2 — ECC de la modalité 25]\nA_COMPLETER\n\n[Question 3 — ECD de la modalité 30]\nA_COMPLETER\n\n[Question 4 — Fréquence en % des jours à 20 appels]\nA_COMPLETER\n\n[Question 5 — Pourcentage de jours saturés]\nA_COMPLETER\n",
    "hints": [
      "Construisez le tableau des effectifs : comptez les jours à 20, 25, 30 et 35 appels.",
      "« Au plus 25 » cumule les modalités inférieures ou égales à 25 ; « au moins 30 » cumule les modalités supérieures ou égales à 30.",
      "La saturation commence à 30 appels : additionnez les effectifs des modalités 30 et 35, puis divisez par N et multipliez par 100."
    ],
    "examples": [
      {
        "stdin": "Un guichet note les arrivées sur 5 matinées : 10 — 20 — 10 — 20 — 20.\nTableau : 10 → 2 matinées ; 20 → 3 matinées (N = 5).\n1) ECC de 10 : 2 matinées.\n2) ECD de 20 : 3 matinées.\n3) Fréquence de 10 : 2/5 × 100 = 40 %.\n4) Somme des fréquences : 40 % + 60 % = 100 %.",
        "expected": "N = 5 — ECC(10) = 2 — ECD(20) = 3 — fréquence de 10 : 40 % — somme : 100 %",
        "note": "Le contrôle final est systématique : la somme des fréquences de toutes les modalités vaut toujours 100 %."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Effectif total N",
        "stdin": "q:1",
        "expected": "10"
      },
      {
        "label": "Question 2 — ECC de la modalité 25",
        "stdin": "q:2",
        "expected": "4"
      },
      {
        "label": "Question 3 — ECD de la modalité 30",
        "stdin": "q:3",
        "expected": "6"
      },
      {
        "label": "Question 4 — Fréquence en % des jours à 20 appels",
        "stdin": "q:4",
        "expected": "30"
      },
      {
        "label": "Question 5 — Pourcentage de jours saturés",
        "stdin": "q:5",
        "expected": "60"
      }
    ],
    "solution": "[Question 1 — Effectif total N]\n10\n\n[Question 2 — ECC de la modalité 25]\n4\n\n[Question 3 — ECD de la modalité 30]\n6\n\n[Question 4 — Fréquence en % des jours à 20 appels]\n30\n\n[Question 5 — Pourcentage de jours saturés]\n60",
    "takeaway": "Tableau : 20 appels → 3 jours ; 25 appels → 1 jour ; 30 appels → 4 jours ; 35 appels → 2 jours. Total : 3+1+4+2 = 10 (OK)\n1) N = 10 jours.\n2) ECC de 25 : 3 + 1 = 4 jours avec au plus 25 appels.\n3) ECD de 30 : 4 + 2 = 6 jours avec au moins 30 appels.\n4) Fréquence de 20 : 3/10 × 100 = 30 %.\n5) Jours saturés (30 ou 35 appels) : 6/10 × 100 = 60 %.\nContrôle des fréquences : 30 % + 10 % + 40 % + 20 % = 100 %."
  },
  {
    "id": "st-c3-e1",
    "chapter": 3,
    "level": "n1",
    "language": "analyse",
    "title": "Moyenne d’une série",
    "goal": "Calculer la moyenne arithmétique d’une série brute.",
    "brief": "<p>Dans cette étude, on considère un entier <code>n</code>, puis les <code>n</code> valeurs d’une série (une par ligne). Affichez la moyenne, arrondie à deux décimales.</p>",
    "starter": "# Grille de calcul (st-c3-e1) — Moyenne d’une série\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Cinq valeurs consécutives]\n# Données : 5\n# Données : 1\n# Données : 2\n# Données : 3\n# Données : 4\n# Données : 5\nA_COMPLETER\n\n[Cas 2 — Série constante]\n# Données : 3\n# Données : 7\n# Données : 7\n# Données : 7\nA_COMPLETER\n\n[Cas 3 — Moyenne non entière]\n# Données : 4\n# Données : 10\n# Données : 11\n# Données : 12\n# Données : 13\nA_COMPLETER\n",
    "hints": [
      "La moyenne arithmétique est le quotient de la somme de toutes les valeurs par l’effectif total N : x̄ = (∑ x_i) / N.",
      "Exprimez le résultat sous forme d’un nombre décimal.",
      "Additionnez toutes les valeurs brutes (y compris les doublons), divisez par leur nombre exact et formater à deux décimales."
    ],
    "examples": [
      {
        "stdin": "4\n12\n8\n15\n9",
        "expected": "11.00",
        "note": "(12 + 8 + 15 + 9)/4 = 44/4 = 11."
      }
    ],
    "tests": [
      {
        "label": "Cinq valeurs consécutives",
        "stdin": "cas:1",
        "expected": "3.00"
      },
      {
        "label": "Série constante",
        "stdin": "cas:2",
        "expected": "7.00"
      },
      {
        "label": "Moyenne non entière",
        "stdin": "cas:3",
        "expected": "11.50"
      }
    ],
    "solution": "[Exemple]\n11.00\n\n[Cas 1 — Cinq valeurs consécutives]\n3.00\n\n[Cas 2 — Série constante]\n7.00\n\n[Cas 3 — Moyenne non entière]\n11.50\n",
    "takeaway": "À retenir : Calculer la moyenne arithmétique d’une série brute.\nRepère : (12 + 8 + 15 + 9)/4 = 44/4 = 11."
  },
  {
    "id": "st-c3-e2",
    "chapter": 3,
    "level": "n2",
    "language": "analyse",
    "title": "Moyenne pondérée",
    "goal": "Pondérer chaque modalité par son effectif, comme dans un tableau statistique.",
    "brief": "<p>Dans cette étude, on considère un entier <code>k</code>, puis <code>k</code> lignes de la forme <code>valeur effectif</code>. Affichez la moyenne pondérée, arrondie à deux décimales.</p>",
    "starter": "# Grille de calcul (st-c3-e2) — Moyenne pondérée\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Deux modalités]\n# Données : 2\n# Données : 10 1\n# Données : 20 3\nA_COMPLETER\n\n[Cas 2 — Effectifs unitaires]\n# Données : 4\n# Données : 0 1\n# Données : 1 1\n# Données : 2 1\n# Données : 3 1\nA_COMPLETER\n\n[Cas 3 — Poids croissants]\n# Données : 3\n# Données : 4 2\n# Données : 5 3\n# Données : 6 5\nA_COMPLETER\n",
    "hints": [
      "La moyenne pondérée est la somme des (valeur × effectif) divisée par la somme des effectifs.",
      "Les valeurs lues sont des chaînes : convertis-les avec int() ou float() avant de calculer.",
      "Divisez la somme des produits valeur * effectif par la somme des effectifs (et surtout pas par le nombre de lignes)."
    ],
    "examples": [
      {
        "stdin": "3\n1 2\n3 3\n5 5",
        "expected": "3.60",
        "note": "(1×2 + 3×3 + 5×5)/10 = 36/10 = 3,60."
      }
    ],
    "tests": [
      {
        "label": "Deux modalités",
        "stdin": "cas:1",
        "expected": "17.50"
      },
      {
        "label": "Effectifs unitaires",
        "stdin": "cas:2",
        "expected": "1.50"
      },
      {
        "label": "Poids croissants",
        "stdin": "cas:3",
        "expected": "5.30"
      }
    ],
    "solution": "[Exemple]\n3.60\n\n[Cas 1 — Deux modalités]\n17.50\n\n[Cas 2 — Effectifs unitaires]\n1.50\n\n[Cas 3 — Poids croissants]\n5.30\n",
    "takeaway": "À retenir : Pondérer chaque modalité par son effectif, comme dans un tableau statistique.\nRepère : (1×2 + 3×3 + 5×5)/10 = 36/10 = 3,60."
  },
  {
    "id": "st-c3-e3",
    "chapter": 3,
    "level": "n3",
    "language": "analyse",
    "title": "Médiane",
    "goal": "Appliquer la convention de rang r = (n + 1)/2, avec interpolation si nécessaire.",
    "brief": "<p>Dans cette étude, on considère un entier <code>n</code>, puis les <code>n</code> valeurs d’une série (une par ligne). Affichez la <strong>médiane</strong>, arrondie à deux décimales, avec la convention du cours : le rang de la médiane est <code>(n + 1)/2</code> dans la série ordonnée, avec interpolation linéaire si ce rang n’est pas entier.</p>",
    "starter": "# Grille de calcul (st-c3-e3) — Médiane\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Nombre pair de valeurs]\n# Données : 4\n# Données : 10\n# Données : 2\n# Données : 8\n# Données : 4\nA_COMPLETER\n\n[Cas 2 — Rang non entier]\n# Données : 6\n# Données : 1\n# Données : 2\n# Données : 3\n# Données : 4\n# Données : 5\n# Données : 6\nA_COMPLETER\n\n[Cas 3 — Trois valeurs]\n# Données : 3\n# Données : 5\n# Données : 1\n# Données : 9\nA_COMPLETER\n",
    "hints": [
      "Commencez par trier la série : sans cela, le rang n’a aucun sens.",
      "Si le rang r n’est pas entier, la valeur est x(bas) + (r − bas) × (x(bas+1) − x(bas)), où bas est la partie entière de r.",
      "Triez la série par ordre croissant : pour n impair prenez l élément au rang (n+1)/2, pour n pair faites la demi-somme des rangs n/2 et n/2+1."
    ],
    "examples": [
      {
        "stdin": "7\n3\n1\n4\n2\n6\n5\n7",
        "expected": "4.00",
        "note": "Sept valeurs triées : le rang 4 donne 4."
      }
    ],
    "tests": [
      {
        "label": "Nombre pair de valeurs",
        "stdin": "cas:1",
        "expected": "6.00"
      },
      {
        "label": "Rang non entier",
        "stdin": "cas:2",
        "expected": "3.50"
      },
      {
        "label": "Trois valeurs",
        "stdin": "cas:3",
        "expected": "5.00"
      }
    ],
    "solution": "[Exemple]\n4.00\n\n[Cas 1 — Nombre pair de valeurs]\n6.00\n\n[Cas 2 — Rang non entier]\n3.50\n\n[Cas 3 — Trois valeurs]\n5.00\n",
    "takeaway": "À retenir : Appliquer la convention de rang r = (n + 1)/2, avec interpolation si nécessaire.\nRepère : Sept valeurs triées : le rang 4 donne 4."
  },
  {
    "id": "st-c4-e1",
    "chapter": 4,
    "level": "n2",
    "language": "analyse",
    "title": "Variance d’une série",
    "goal": "Calculer une variance de population, en divisant par N.",
    "brief": "<p>Dans cette étude, on considère un entier <code>n</code>, puis les <code>n</code> valeurs d’une série (une par ligne). Affichez la <strong>variance</strong> arrondie à deux décimales, avec une division par N (variance de population).</p>",
    "starter": "# Grille de calcul (st-c4-e1) — Variance d’une série\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Quatre valeurs régulières]\n# Données : 4\n# Données : 1\n# Données : 2\n# Données : 3\n# Données : 4\nA_COMPLETER\n\n[Cas 2 — Série constante]\n# Données : 2\n# Données : 5\n# Données : 5\nA_COMPLETER\n\n[Cas 3 — Cinq valeurs espacées]\n# Données : 5\n# Données : 10\n# Données : 12\n# Données : 14\n# Données : 16\n# Données : 18\nA_COMPLETER\n",
    "hints": [
      "La variance est la moyenne des carrés des écarts à la moyenne.",
      "Calculez d’abord la moyenne, puis la somme des (x − moyenne)², puis divise par N.",
      "Calculez la moyenne x̄ d abord, puis la moyenne des carrés (x_i - x̄)^2 en divisant bien par N (variance de population)."
    ],
    "examples": [
      {
        "stdin": "3\n2\n4\n6",
        "expected": "2.67",
        "note": "Moyenne 4 ; écarts −2, 0, 2 ; moyenne des carrés 8/3 ≈ 2,67."
      }
    ],
    "tests": [
      {
        "label": "Quatre valeurs régulières",
        "stdin": "cas:1",
        "expected": "1.25"
      },
      {
        "label": "Série constante",
        "stdin": "cas:2",
        "expected": "0.00"
      },
      {
        "label": "Cinq valeurs espacées",
        "stdin": "cas:3",
        "expected": "8.00"
      }
    ],
    "solution": "[Exemple]\n2.67\n\n[Cas 1 — Quatre valeurs régulières]\n1.25\n\n[Cas 2 — Série constante]\n0.00\n\n[Cas 3 — Cinq valeurs espacées]\n8.00\n",
    "takeaway": "À retenir : Calculer une variance de population, en divisant par N.\nRepère : Moyenne 4 ; écarts −2, 0, 2 ; moyenne des carrés 8/3 ≈ 2,67."
  },
  {
    "id": "st-c4-e2",
    "chapter": 4,
    "level": "n3",
    "language": "analyse",
    "title": "Écart-type et coefficient de variation",
    "goal": "Passer de la variance à l’écart-type, puis à un indicateur sans unité.",
    "brief": "<p>Dans cette étude, on considère un entier <code>n</code>, puis les <code>n</code> valeurs d’une série (une par ligne). Affichez l’<strong>écart-type</strong> arrondi à deux décimales, puis le <strong>coefficient de variation</strong> en pourcentage (deux décimales), chacun sur sa ligne. La variance se divise par N.</p>",
    "starter": "# Grille de calcul (st-c4-e2) — Écart-type et coefficient de variation\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Quatre valeurs régulières]\n# Données : 4\n# Données : 1\n# Données : 2\n# Données : 3\n# Données : 4\nA_COMPLETER\n\n[Cas 2 — Série constante]\n# Données : 2\n# Données : 5\n# Données : 5\nA_COMPLETER\n\n[Cas 3 — Série homogène]\n# Données : 5\n# Données : 10\n# Données : 12\n# Données : 14\n# Données : 16\n# Données : 18\nA_COMPLETER\n",
    "hints": [
      "L’écart-type est la racine carrée de la variance : pense à importer math.",
      "Le coefficient de variation vaut σ divisé par la moyenne, multiplié par 100 pour l’exprimer en pourcentage.",
      "Tirez l écart-type σ = sqrt(variance) avant de calculer CV = (σ / x̄) * 100, et vérifiez que σ reste plus petit que l étendue."
    ],
    "examples": [
      {
        "stdin": "3\n2\n4\n6",
        "expected": "1.63\n40.82",
        "note": "σ ≈ 1,633 et CV ≈ 40,82 %."
      }
    ],
    "tests": [
      {
        "label": "Quatre valeurs régulières",
        "stdin": "cas:1",
        "expected": "1.12\n44.72"
      },
      {
        "label": "Série constante",
        "stdin": "cas:2",
        "expected": "0.00\n0.00"
      },
      {
        "label": "Série homogène",
        "stdin": "cas:3",
        "expected": "2.83\n20.20"
      }
    ],
    "solution": "[Exemple]\n1.63\n40.82\n\n[Cas 1 — Quatre valeurs régulières]\n1.12\n44.72\n\n[Cas 2 — Série constante]\n0.00\n0.00\n\n[Cas 3 — Série homogène]\n2.83\n20.20\n",
    "takeaway": "À retenir : Passer de la variance à l’écart-type, puis à un indicateur sans unité.\nRepère : σ ≈ 1,633 et CV ≈ 40,82 %."
  },
  {
    "id": "st-c4-e3",
    "chapter": 4,
    "level": "n3",
    "language": "analyse",
    "title": "Variance pondérée par la formule de König",
    "goal": "Calculer une variance à partir d’un tableau d’effectifs, en une seule passe.",
    "brief": "<p>Dans cette étude, on considère un entier <code>k</code>, puis <code>k</code> lignes de la forme <code>valeur effectif</code>. Affichez la <strong>variance</strong> arrondie à deux décimales, calculée par la formule de König : <code>V = Σ n<sub>i</sub>x<sub>i</sub>² / N − x̄²</code>.</p>",
    "starter": "# Grille de calcul (st-c4-e3) — Variance pondérée par la formule de König\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Deux modalités]\n# Données : 2\n# Données : 10 1\n# Données : 20 3\nA_COMPLETER\n\n[Cas 2 — Effectifs unitaires]\n# Données : 4\n# Données : 0 1\n# Données : 1 1\n# Données : 2 1\n# Données : 3 1\nA_COMPLETER\n\n[Cas 3 — Variance faible]\n# Données : 3\n# Données : 4 2\n# Données : 5 3\n# Données : 6 5\nA_COMPLETER\n",
    "hints": [
      "König demande deux quantités : la moyenne des carrés, et le carré de la moyenne.",
      "N est la somme des effectifs ; n’oubliez pas de retrancher le carré de la moyenne à la fin.",
      "Calculez E[X^2] = sum(n_i * x_i^2) / N puis retranchez x̄^2 : la différence doit être positive ou nulle."
    ],
    "examples": [
      {
        "stdin": "3\n1 2\n3 3\n5 5",
        "expected": "2.44",
        "note": "Moyenne 3,6 ; moyenne des carrés 15,4 ; 15,4 − 12,96 = 2,44."
      }
    ],
    "tests": [
      {
        "label": "Deux modalités",
        "stdin": "cas:1",
        "expected": "18.75"
      },
      {
        "label": "Effectifs unitaires",
        "stdin": "cas:2",
        "expected": "1.25"
      },
      {
        "label": "Variance faible",
        "stdin": "cas:3",
        "expected": "0.61"
      }
    ],
    "solution": "[Exemple]\n2.44\n\n[Cas 1 — Deux modalités]\n18.75\n\n[Cas 2 — Effectifs unitaires]\n1.25\n\n[Cas 3 — Variance faible]\n0.61\n",
    "takeaway": "À retenir : Calculer une variance à partir d’un tableau d’effectifs, en une seule passe.\nRepère : Moyenne 3,6 ; moyenne des carrés 15,4 ; 15,4 − 12,96 = 2,44."
  },
  {
    "id": "st-c5-e1",
    "chapter": 5,
    "level": "n2",
    "language": "analyse",
    "title": "Classes de même amplitude",
    "goal": "Découper un intervalle en classes égales pour construire un histogramme.",
    "brief": "<p>Dans cette étude, on considère une ligne <code>min max k</code> : les bornes de la série et le nombre de classes souhaité. Affichez les <code>k</code> classes de même amplitude, une par ligne, au format <code>borne_inférieure borne_supérieure</code> avec deux décimales.</p>",
    "starter": "# Grille de calcul (st-c5-e1) — Classes de même amplitude\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Cinq classes sur [0 ; 10]]\n# Données : 0 10 5\nA_COMPLETER\n\n[Cas 2 — Quatre classes décimales]\n# Données : 0 1 4\nA_COMPLETER\n\n[Cas 3 — Deux classes]\n# Données : 10 20 2\nA_COMPLETER\n",
    "hints": [
      "L’amplitude de chaque classe est (max − min) / k.",
      "La classe numéro i (en partant de 0) va de min + i × amplitude à min + (i + 1) × amplitude.",
      "La borne supérieure d une classe devient la borne inférieure de la suivante ; la dernière classe doit atteindre exactement le maximum."
    ],
    "examples": [
      {
        "stdin": "150 190 4",
        "expected": "150.00 160.00\n160.00 170.00\n170.00 180.00\n180.00 190.00",
        "note": "Amplitude 10 : quatre classes."
      }
    ],
    "tests": [
      {
        "label": "Cinq classes sur [0 ; 10]",
        "stdin": "cas:1",
        "expected": "0.00 2.00\n2.00 4.00\n4.00 6.00\n6.00 8.00\n8.00 10.00"
      },
      {
        "label": "Quatre classes décimales",
        "stdin": "cas:2",
        "expected": "0.00 0.25\n0.25 0.50\n0.50 0.75\n0.75 1.00"
      },
      {
        "label": "Deux classes",
        "stdin": "cas:3",
        "expected": "10.00 15.00\n15.00 20.00"
      }
    ],
    "solution": "[Exemple]\n150.00 160.00\n160.00 170.00\n170.00 180.00\n180.00 190.00\n\n[Cas 1 — Cinq classes sur [0 ; 10]]\n0.00 2.00\n2.00 4.00\n4.00 6.00\n6.00 8.00\n8.00 10.00\n\n[Cas 2 — Quatre classes décimales]\n0.00 0.25\n0.25 0.50\n0.50 0.75\n0.75 1.00\n\n[Cas 3 — Deux classes]\n10.00 15.00\n15.00 20.00\n",
    "takeaway": "À retenir : Découper un intervalle en classes égales pour construire un histogramme.\nRepère : Amplitude 10 : quatre classes."
  },
  {
    "id": "st-c5-e2",
    "chapter": 5,
    "level": "n3",
    "language": "analyse",
    "title": "Effectifs par classe",
    "goal": "Compter les valeurs de chaque classe d’un histogramme, avec la convention des bornes.",
    "brief": "<p>Dans cette étude, on considère une ligne <code>min max k</code>, avec <code>min &lt; max</code> et <code>k ≥ 1</code>, puis un entier <code>n ≥ 1</code>, puis les <code>n</code> valeurs de la série (une par ligne). Toutes les valeurs sont dans l’intervalle <code>[min ; max]</code>. Partagez cet intervalle en <code>k</code> classes de même largeur et affichez leurs effectifs, séparés par des espaces. Chaque classe inclut sa borne inférieure et exclut sa borne supérieure, sauf la dernière classe : la dernière classe inclut aussi <code>max</code>.</p>",
    "starter": "# Grille de calcul (st-c5-e2) — Effectifs par classe\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Quatre classes, une valeur chacune]\n# Données : 0 4 4\n# Données : 4\n# Données : 0\n# Données : 1\n# Données : 2\n# Données : 3\nA_COMPLETER\n\n[Cas 2 — Deux classes, effectifs inégaux]\n# Données : 0 10 2\n# Données : 6\n# Données : 0\n# Données : 4\n# Données : 5\n# Données : 9\n# Données : 2\n# Données : 3\nA_COMPLETER\n\n[Cas 3 — Classes de 5]\n# Données : 10 20 2\n# Données : 4\n# Données : 10\n# Données : 19\n# Données : 15\n# Données : 20\nA_COMPLETER\n",
    "hints": [
      "Calculez la largeur (max − min) / k et comptez chaque valeur dans une classe.",
      "Les classes sont fermées à gauche et ouvertes à droite, sauf la dernière qui inclut max.",
      "Les classes suivent [borne_inf ; borne_sup[ sauf la dernière qui est fermée [a ; max] pour inclure le maximum."
    ],
    "examples": [
      {
        "stdin": "150 190 4\n5\n152\n161\n171\n181\n175",
        "expected": "1 1 2 1",
        "note": "171 et 175 tombent dans [170 ; 180[."
      }
    ],
    "tests": [
      {
        "label": "Quatre classes, une valeur chacune",
        "stdin": "cas:1",
        "expected": "1 1 1 1"
      },
      {
        "label": "Deux classes, effectifs inégaux",
        "stdin": "cas:2",
        "expected": "4 2"
      },
      {
        "label": "Classes de 5",
        "stdin": "cas:3",
        "expected": "1 3"
      }
    ],
    "solution": "[Exemple]\n1 1 2 1\n\n[Cas 1 — Quatre classes, une valeur chacune]\n1 1 1 1\n\n[Cas 2 — Deux classes, effectifs inégaux]\n4 2\n\n[Cas 3 — Classes de 5]\n1 3\n",
    "takeaway": "À retenir : Compter les valeurs de chaque classe d’un histogramme, avec la convention des bornes.\nRepère : 171 et 175 tombent dans [170 ; 180[."
  },
  {
    "id": "st-c5-e3",
    "chapter": 5,
    "level": "n4",
    "language": "analyse",
    "title": "Les cinq valeurs d’une boîte à moustaches",
    "goal": "Résumer une série par minimum, Q1, médiane, Q3 et maximum.",
    "brief": "<p>Dans cette étude, on considère un entier <code>n</code>, puis les <code>n</code> valeurs d’une série (une par ligne). Indiquez les cinq valeurs de la boîte à moustaches — minimum, Q1, médiane, Q3, maximum — chacune arrondie à deux décimales et séparées par un espace. On utilise la convention de rang <code>r = (n + 1)·p</code> avec interpolation.</p>",
    "starter": "# Grille de calcul (st-c5-e3) — Les cinq valeurs d’une boîte à moustaches\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Cinq valeurs consécutives]\n# Données : 5\n# Données : 1\n# Données : 2\n# Données : 3\n# Données : 4\n# Données : 5\nA_COMPLETER\n\n[Cas 2 — Quatre valeurs]\n# Données : 4\n# Données : 1\n# Données : 2\n# Données : 3\n# Données : 4\nA_COMPLETER\n\n[Cas 3 — Série désordonnée]\n# Données : 6\n# Données : 5\n# Données : 3\n# Données : 8\n# Données : 1\n# Données : 9\n# Données : 2\nA_COMPLETER\n",
    "hints": [
      "Écrivez une seule fonction quantile(valeurs, p) et appelle-la trois fois : p = 0,25 ; 0,5 ; 0,75.",
      "Le minimum et le maximum sont la première et la dernière valeur de la série triée.",
      "Ordonnez la série puis extrayez min, Q1 (rang 0.25*(n-1) ou quart inférieur selon la méthode du cours), médiane, Q3 et max."
    ],
    "examples": [
      {
        "stdin": "10\n2\n4\n4\n5\n7\n8\n9\n11\n12\n15",
        "expected": "2.00 4.00 7.50 11.25 15.00",
        "note": "Médiane 7,5 ; Q1 = 4 ; Q3 = 11,25."
      }
    ],
    "tests": [
      {
        "label": "Cinq valeurs consécutives",
        "stdin": "cas:1",
        "expected": "1.00 1.50 3.00 4.50 5.00"
      },
      {
        "label": "Quatre valeurs",
        "stdin": "cas:2",
        "expected": "1.00 1.25 2.50 3.75 4.00"
      },
      {
        "label": "Série désordonnée",
        "stdin": "cas:3",
        "expected": "1.00 1.75 4.00 8.25 9.00"
      }
    ],
    "solution": "[Exemple]\n2.00 4.00 7.50 11.25 15.00\n\n[Cas 1 — Cinq valeurs consécutives]\n1.00 1.50 3.00 4.50 5.00\n\n[Cas 2 — Quatre valeurs]\n1.00 1.25 2.50 3.75 4.00\n\n[Cas 3 — Série désordonnée]\n1.00 1.75 4.00 8.25 9.00\n",
    "takeaway": "À retenir : Résumer une série par minimum, Q1, médiane, Q3 et maximum.\nRepère : Médiane 7,5 ; Q1 = 4 ; Q3 = 11,25."
  },
  {
    "id": "st-c6-e1",
    "chapter": 6,
    "level": "n3",
    "language": "analyse",
    "title": "Covariance",
    "goal": "Mesurer si deux caractères varient dans le même sens.",
    "brief": "<p>Dans cette étude, on considère un entier <code>n</code>, puis les <code>n</code> valeurs de <code>x</code> (une par ligne), puis les <code>n</code> valeurs de <code>y</code> (une par ligne). Affichez la <strong>covariance</strong> arrondie à quatre décimales.</p>",
    "starter": "# Grille de calcul (st-c6-e1) — Covariance\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Liaison positive]\n# Données : 4\n# Données : 1\n# Données : 2\n# Données : 3\n# Données : 4\n# Données : 2\n# Données : 4\n# Données : 6\n# Données : 8\nA_COMPLETER\n\n[Cas 2 — Liaison négative]\n# Données : 3\n# Données : 1\n# Données : 2\n# Données : 3\n# Données : 6\n# Données : 4\n# Données : 2\nA_COMPLETER\n\n[Cas 3 — Deux points]\n# Données : 2\n# Données : 0\n# Données : 10\n# Données : 0\n# Données : 10\nA_COMPLETER\n",
    "hints": [
      "La formule rapide évite de calculer chaque écart : cov = (1/n) × Σ xᵢyᵢ − x̄·ȳ.",
      "Les deux moyennes se calculent avant la covariance ; n’oubliez pas de les retrancher.",
      "Calculez Cov(X,Y) = (sum(x_i * y_i) / N) - x̄ * ȳ avec quatre décimales ; vérifiez si le signe correspond bien au sens d évolution."
    ],
    "examples": [
      {
        "stdin": "3\n1\n2\n3\n2\n4\n6",
        "expected": "1.3333",
        "note": "Moyennes 2 et 4 ; Σxy/n = 9,3333 ; cov = 1,3333."
      }
    ],
    "tests": [
      {
        "label": "Liaison positive",
        "stdin": "cas:1",
        "expected": "2.5000"
      },
      {
        "label": "Liaison négative",
        "stdin": "cas:2",
        "expected": "-1.3333"
      },
      {
        "label": "Deux points",
        "stdin": "cas:3",
        "expected": "25.0000"
      }
    ],
    "solution": "[Exemple]\n1.3333\n\n[Cas 1 — Liaison positive]\n2.5000\n\n[Cas 2 — Liaison négative]\n-1.3333\n\n[Cas 3 — Deux points]\n25.0000\n",
    "takeaway": "À retenir : Mesurer si deux caractères varient dans le même sens.\nRepère : Moyennes 2 et 4 ; Σxy/n = 9,3333 ; cov = 1,3333."
  },
  {
    "id": "st-c6-e2",
    "chapter": 6,
    "level": "n4",
    "language": "analyse",
    "title": "Coefficient de corrélation",
    "goal": "Chiffrer une liaison linéaire par un nombre sans unité, borné par −1 et 1.",
    "brief": "<p>Dans cette étude, on considère un entier <code>n</code>, puis les <code>n</code> valeurs de <code>x</code>, puis les <code>n</code> valeurs de <code>y</code>. Affichez le <strong>coefficient de corrélation linéaire</strong> <code>r = cov(x, y) / (σ<sub>x</sub> · σ<sub>y</sub>)</code> arrondi à quatre décimales. Les écarts-types sont de population (division par n).</p>",
    "starter": "# Grille de calcul (st-c6-e2) — Coefficient de corrélation\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Liaison forte non parfaite]\n# Données : 4\n# Données : 1\n# Données : 2\n# Données : 3\n# Données : 4\n# Données : 2\n# Données : 4\n# Données : 5\n# Données : 8\nA_COMPLETER\n\n[Cas 2 — Liaison négative]\n# Données : 3\n# Données : 1\n# Données : 2\n# Données : 3\n# Données : 5\n# Données : 2\n# Données : 4\nA_COMPLETER\n\n[Cas 3 — Liaison moyenne]\n# Données : 4\n# Données : 0\n# Données : 1\n# Données : 2\n# Données : 3\n# Données : 3\n# Données : 1\n# Données : 0\n# Données : 2\nA_COMPLETER\n",
    "hints": [
      "Calculez la covariance, puis les deux écarts-types avec la même division par n.",
      "r est le quotient de la covariance par le produit des deux écarts-types.",
      "Divisez la covariance par le produit σ_X * σ_Y (population) ; un coefficient r hors de [-1, 1] signale une erreur de formule."
    ],
    "examples": [
      {
        "stdin": "3\n1\n2\n3\n2\n4\n6",
        "expected": "1.0000",
        "note": "Points parfaitement alignés : r = 1."
      }
    ],
    "tests": [
      {
        "label": "Liaison forte non parfaite",
        "stdin": "cas:1",
        "expected": "0.9812"
      },
      {
        "label": "Liaison négative",
        "stdin": "cas:2",
        "expected": "-0.3273"
      },
      {
        "label": "Liaison moyenne",
        "stdin": "cas:3",
        "expected": "-0.4000"
      }
    ],
    "solution": "[Exemple]\n1.0000\n\n[Cas 1 — Liaison forte non parfaite]\n0.9812\n\n[Cas 2 — Liaison négative]\n-0.3273\n\n[Cas 3 — Liaison moyenne]\n-0.4000\n",
    "takeaway": "À retenir : Chiffrer une liaison linéaire par un nombre sans unité, borné par −1 et 1.\nRepère : Points parfaitement alignés : r = 1."
  },
  {
    "id": "st-c6-e3",
    "chapter": 6,
    "level": "n4",
    "language": "analyse",
    "title": "Droite des moindres carrés",
    "goal": "Ajuster y = a·x + b et contrôler que la droite passe par le point moyen.",
    "brief": "<p>Dans cette étude, on considère un entier <code>n</code>, puis les <code>n</code> valeurs de <code>x</code>, puis les <code>n</code> valeurs de <code>y</code>. Affichez la pente <code>a</code> puis l’ordonnée à l’origine <code>b</code> de la droite des moindres carrés, chacune sur sa ligne avec quatre décimales. On a <code>a = cov(x, y)/V(x)</code> et <code>b = ȳ − a·x̄</code>, avec des variances de population.</p>",
    "starter": "# Grille de calcul (st-c6-e3) — Droite des moindres carrés\n# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Droite décalée]\n# Données : 4\n# Données : 1\n# Données : 2\n# Données : 3\n# Données : 4\n# Données : 3\n# Données : 5\n# Données : 6\n# Données : 9\nA_COMPLETER\n\n[Cas 2 — Pente négative]\n# Données : 3\n# Données : 1\n# Données : 2\n# Données : 3\n# Données : 5\n# Données : 2\n# Données : 4\nA_COMPLETER\n\n[Cas 3 — Deux points]\n# Données : 2\n# Données : 0\n# Données : 10\n# Données : 0\n# Données : 10\nA_COMPLETER\n",
    "hints": [
      "Calculez d’abord la pente, avec la variance de x au dénominateur — jamais l’inverse.",
      "Contrôle final : a × x̄ + b doit redonner ȳ. Si ce n’est pas le cas, il y a une erreur de calcul.",
      "Calculez la pente a = Cov(X,Y) / Var(X), puis l ordonnée à l origine b = ȳ - a * x̄ avec quatre décimales."
    ],
    "examples": [
      {
        "stdin": "3\n1\n2\n3\n2\n4\n6",
        "expected": "2.0000\n0.0000",
        "note": "Points alignés sur y = 2x."
      }
    ],
    "tests": [
      {
        "label": "Droite décalée",
        "stdin": "cas:1",
        "expected": "1.9000\n1.0000"
      },
      {
        "label": "Pente négative",
        "stdin": "cas:2",
        "expected": "-0.5000\n4.6667"
      },
      {
        "label": "Deux points",
        "stdin": "cas:3",
        "expected": "1.0000\n0.0000"
      }
    ],
    "solution": "[Exemple]\n2.0000\n0.0000\n\n[Cas 1 — Droite décalée]\n1.9000\n1.0000\n\n[Cas 2 — Pente négative]\n-0.5000\n4.6667\n\n[Cas 3 — Deux points]\n1.0000\n0.0000\n",
    "takeaway": "À retenir : Ajuster y = a·x + b et contrôler que la droite passe par le point moyen.\nRepère : Points alignés sur y = 2x."
  }
];
