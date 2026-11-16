/**
 * chapitre5.js — Études de cas du cours « b3-etude-quantitative ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    "id": "eq3-c5-e1",
    "chapter": 5,
    "level": "n1",
    "language": "analyse",
    "title": "Les temps de chargement de la boutique Alizéa",
    "exampleTitle": "Exemple résolu — les temps de réponse de l'API de paiement PayFlux",
    "goal": "Calculer moyenne, médiane, mode et étendue d'une série, choisir l'indicateur robuste et décider avec une p-valeur.",
    "brief": "<p><strong>Énoncé.</strong> La boutique en ligne Alizéa teste les temps de chargement de sa page d'accueil sur <strong>6 requêtes</strong> successives (en millisecondes) :</p><p><code>100 — 120 — 140 — 140 — 160 — 180</code></p><p>Le développeur prévoit d'ajouter une septième mesure effectuée lors d'un pic de trafic : <strong>1 000 ms</strong>. Par ailleurs, pour décider si la nouvelle version du site est plus rapide, il met en place un test d'hypothèses au seuil de 5 % ; à l'issue du test, le logiciel renvoie une p-valeur de <strong>0,03</strong>.</p><ol><li>Quelle est la moyenne des 6 temps de chargement (en ms) ?</li><li>Quelle est la médiane ?</li><li>Quel est le mode ?</li><li>Quelle est l'étendue de la série ?</li><li>Avec la valeur aberrante de 1 000 ms ajoutée, quel indicateur de tendance centrale reste stable : la moyenne ou la médiane ?</li><li>Au seuil de 5 %, avec une p-valeur p = 0,03, rejette-t-on l'hypothèse nulle H₀ ? (oui/non)</li></ol>",
    "starter": "# Exercice — Les temps de chargement de la boutique Alizéa\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Les questions 1 à 4 attendent des nombres (en ms) ; la question 6 attend oui ou non.\n\n[Question 1 — Moyenne des 6 temps (en ms)]\nA_COMPLETER\n\n[Question 2 — Médiane]\nA_COMPLETER\n\n[Question 3 — Mode]\nA_COMPLETER\n\n[Question 4 — Étendue]\nA_COMPLETER\n\n[Question 5 — Indicateur stable face à la valeur aberrante]\nA_COMPLETER\n\n[Question 6 — Rejette-t-on H₀ au seuil de 5 % (oui/non)]\nA_COMPLETER\n",
    "hints": [
      "La moyenne somme les valeurs et divise par leur nombre ; la médiane sépare la série ordonnée en deux moitiés égales.",
      "Le mode est la valeur la plus fréquente ; l'étendue est l'écart entre la plus grande et la plus petite valeur.",
      "Une valeur extrême tire la moyenne mais laisse la médiane en place ; une p-valeur inférieure au seuil de 5 % entraîne le rejet de H₀."
    ],
    "examples": [
      {
        "stdin": "L'API de paiement PayFlux est testée sur 5 appels (en ms) : 210 — 230 — 250 — 250 — 310. Un appel supplémentaire sous pic de charge atteint 2 000 ms ; le test de performance a un seuil de 5 % et p = 0,02.\n\n1) Moyenne : 1 250/5 = 250 ms.\n2) Médiane : 250 ms.\n3) Mode : 250 (deux occurrences).\n4) Étendue : 310 − 210 = 100 ms.\n5) Avec 2 000 ms, la médiane (250) reste stable, pas la moyenne.\n6) p = 0,02 < 0,05 : on rejette H₀.",
        "expected": "250 — 250 — 250 — 100 — médiane — oui",
        "note": "Face aux valeurs aberrantes, la médiane est l'indicateur robuste ; face aux tests, seule la comparaison p-valeur/seuil décide."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Moyenne des 6 temps",
        "stdin": "q:1",
        "expected": "140||140 ms"
      },
      {
        "label": "Question 2 — Médiane",
        "stdin": "q:2",
        "expected": "140||140 ms"
      },
      {
        "label": "Question 3 — Mode",
        "stdin": "q:3",
        "expected": "140||140 ms"
      },
      {
        "label": "Question 4 — Étendue",
        "stdin": "q:4",
        "expected": "80||80 ms"
      },
      {
        "label": "Question 5 — Indicateur stable face à la valeur aberrante",
        "stdin": "q:5",
        "expected": "médiane||la médiane"
      },
      {
        "label": "Question 6 — Rejette-t-on H₀ au seuil de 5 %",
        "stdin": "q:6",
        "expected": "oui"
      }
    ],
    "solution": "[Question 1 — Moyenne des 6 temps (en ms)]\n140\n\n[Question 2 — Médiane]\n140\n\n[Question 3 — Mode]\n140\n\n[Question 4 — Étendue]\n80\n\n[Question 5 — Indicateur stable face à la valeur aberrante]\nmédiane\n\n[Question 6 — Rejette-t-on H₀ au seuil de 5 % (oui/non)]\noui",
    "takeaway": "1) Moyenne : (100 + 120 + 140 + 140 + 160 + 180)/6 = 840/6 = 140 ms.\n2) Série déjà ordonnée, effectif pair : médiane = (140 + 140)/2 = 140 ms.\n3) La valeur 140 apparaît deux fois, les autres une seule : mode = 140 ms.\n4) Étendue : 180 − 100 = 80 ms.\n5) La médiane : la série à 7 valeurs ordonnées (100, 120, 140, 140, 160, 180, 1 000) a pour médiane la 4e valeur, 140, inchangée ; la moyenne grimpe à 1 840/7, soit environ 263 ms, tirée vers le haut par la valeur extrême.\n6) Oui : p = 0,03 < 0,05, on rejette H₀ au seuil de 5 % — sous H₀ et les hypothèses du modèle, une statistique au moins aussi extrême serait observée dans moins de 5 % des cas."
  },
  {
    "id": "eq3-c5-e2",
    "chapter": 5,
    "level": "n2",
    "language": "analyse",
    "title": "Formation sécurité et charte des mots de passe : le Chi-deux chez Orion SI",
    "exampleTitle": "Exemple résolu — offre et canal d'achat chez Togonet",
    "goal": "Mener un test d'indépendance du Chi-deux complet : effectifs théoriques, degrés de liberté, statistique, seuil et décision.",
    "brief": "<p><strong>Énoncé.</strong> L'ESN Orion SI étudie si le fait d'avoir suivi la formation sécurité est lié au respect de la charte des mots de passe. Sur <strong>100 salariés</strong>, le tableau de contingence croisé observé est :</p><table><tr><th></th><th>Charte respectée</th><th>Charte non respectée</th><th>Total</th></tr><tr><th>Formation suivie</th><td>30</td><td>20</td><td>50</td></tr><tr><th>Formation non suivie</th><td>20</td><td>30</td><td>50</td></tr><tr><th>Total</th><td>50</td><td>50</td><td>100</td></tr></table><p>Rappels du cours : effectif théorique E(i,j) = (Total ligne i × Total colonne j)/N ; χ² = Σ(O − E)²/E ; pour un tableau 2×2, ddl = (2 − 1) × (2 − 1) et la valeur critique au seuil α = 5 % est 3,84.</p><ol><li>Quel test faut-il utiliser pour étudier la liaison entre deux variables qualitatives ? (nom du test)</li><li>Quel est l'effectif théorique de la case « Formation suivie / Charte respectée » ?</li><li>Combien de degrés de liberté compte ce tableau 2×2 ?</li><li>Que vaut la statistique χ² ?</li><li>Quelle est la valeur critique au seuil de 5 % pour 1 degré de liberté ?</li><li>χ² dépasse-t-il la valeur critique : rejette-t-on l'hypothèse nulle H₀ d'indépendance ? (oui/non)</li><li>Ce résultat prouve-t-il que la formation cause le respect de la charte ? (oui/non)</li></ol>",
    "starter": "# Exercice — Formation sécurité et charte des mots de passe : le Chi-deux chez Orion SI\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Les questions 2 à 5 attendent des nombres ; la question 5 avec deux décimales.\n\n[Question 1 — Test adapté à deux variables qualitatives]\nA_COMPLETER\n\n[Question 2 — Effectif théorique de la case formation/Charte respectée]\nA_COMPLETER\n\n[Question 3 — Degrés de liberté du tableau 2×2]\nA_COMPLETER\n\n[Question 4 — Statistique χ²]\nA_COMPLETER\n\n[Question 5 — Valeur critique au seuil de 5 % et 1 ddl]\nA_COMPLETER\n\n[Question 6 — Rejette-t-on H₀ (oui/non)]\nA_COMPLETER\n\n[Question 7 — Le test prouve-t-il une causalité (oui/non)]\nA_COMPLETER\n",
    "hints": [
      "Le test du Chi-deux d'indépendance compare les effectifs observés aux effectifs théoriques attendus si les deux variables étaient indépendantes.",
      "Ici chaque total de ligne vaut 50, chaque total de colonne vaut 50 et N = 100 : tous les effectifs théoriques sont identiques.",
      "Avec des écarts de ±5 par rapport à l'effectif théorique, chaque case contribue pour 5²/E ; comparez enfin la statistique à 3,84 et rappelez qu'un test ne prouve pas une causalité."
    ],
    "examples": [
      {
        "stdin": "L'opérateur Togonet croise l'offre choisie (Fibre/Mobile) avec le canal d'achat (Boutique/Web) sur 200 clients : 100 par offre, 100 par canal. Observé : [Boutique, Fibre] = 60, [Web, Fibre] = 40, [Boutique, Mobile] = 40, [Web, Mobile] = 60.\n\n1) Test adapté : le Chi-deux d'indépendance.\n2) E(Boutique, Fibre) = 100 × 100/200 = 50.\n3) ddl = (2 − 1) × (2 − 1) = 1.\n4) Écarts de ±10 : χ² = 4 × 100/50 = 8.\n5) Valeur critique (5 %, 1 ddl) : 3,84.\n6) 8 > 3,84 : on rejette H₀.\n7) Causalité : non, corrélation n'est pas causalité.",
        "expected": "chi-deux — 50 — 1 — 8 — 3,84 — oui — non",
        "note": "Même logique à chaque fois : effectifs théoriques, statistique, comparaison au seuil, décision — et jamais de conclusion causale hâtive."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Test adapté à deux variables qualitatives",
        "stdin": "q:1",
        "expected": "chi-deux||chi deux||khi-deux||khi deux||chi2||khi2"
      },
      {
        "label": "Question 2 — Effectif théorique de la case formation/Charte respectée",
        "stdin": "q:2",
        "expected": "25"
      },
      {
        "label": "Question 3 — Degrés de liberté du tableau 2×2",
        "stdin": "q:3",
        "expected": "1||1 ddl"
      },
      {
        "label": "Question 4 — Statistique χ²",
        "stdin": "q:4",
        "expected": "4"
      },
      {
        "label": "Question 5 — Valeur critique au seuil de 5 % et 1 ddl",
        "stdin": "q:5",
        "expected": "3,84"
      },
      {
        "label": "Question 6 — Rejette-t-on H₀",
        "stdin": "q:6",
        "expected": "oui"
      },
      {
        "label": "Question 7 — Le test prouve-t-il une causalité",
        "stdin": "q:7",
        "expected": "non"
      }
    ],
    "solution": "[Question 1 — Test adapté à deux variables qualitatives]\nchi-deux\n\n[Question 2 — Effectif théorique de la case formation/Charte respectée]\n25\n\n[Question 3 — Degrés de liberté du tableau 2×2]\n1\n\n[Question 4 — Statistique χ²]\n4\n\n[Question 5 — Valeur critique au seuil de 5 % et 1 ddl]\n3,84\n\n[Question 6 — Rejette-t-on H₀ (oui/non)]\noui\n\n[Question 7 — Le test prouve-t-il une causalité (oui/non)]\nnon",
    "takeaway": "1) Croiser deux variables qualitatives catégorielles relève du test d'indépendance du Chi-deux.\n2) E = (Total ligne × Total colonne)/N = (50 × 50)/100 = 25. Les quatre cases ont le même effectif théorique, 25 : tous supérieurs ou égaux à 5, la règle de Cochran est respectée.\n3) ddl = (2 − 1) × (2 − 1) = 1.\n4) Écarts observés − théoriques : +5, −5, −5, +5. χ² = (5²/25) + (5²/25) + (5²/25) + (5²/25) = 25/25 × 4 = 4.\n5) La valeur critique du Chi-deux pour 1 ddl au seuil α = 5 % est 3,84.\n6) 4 > 3,84 : on rejette H₀ au seuil de 5 % (p < 0,05) : il existe une relation statistiquement significative entre le suivi de la formation et le respect de la charte.\n7) Non : le test établit une dépendance statistique, pas un lien de cause à effet — d'autres facteurs (ancienneté, sensibilisation générale...) peuvent expliquer la liaison."
  },
  {
    "id": "eq3-c5-e3",
    "chapter": 5,
    "level": "n3",
    "language": "analyse",
    "title": "Expérience et résolution d'incidents au Noc de TéliaNet",
    "exampleTitle": "Exemple résolu — surface et ventes des magasins de l'enseigne Cordie",
    "goal": "Calculer le coefficient de corrélation linéaire de Pearson et interpréter sa force sans conclure à la causalité.",
    "brief": "<p><strong>Énoncé.</strong> Le Noc de l'opérateur TéliaNet étudie le lien entre l'expérience (en années) et la performance de ses 5 ingénieurs de garde, notée sur un score de résolution d'incidents :</p><table><tr><th>Ingénieur</th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th></tr><tr><th>Expérience x (années)</th><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td></tr><tr><th>Score y</th><td>3</td><td>5</td><td>4</td><td>6</td><td>7</td></tr></table><p>Rappel du cours : r = Σ(x − x̄)(y − ȳ)/√(Σ(x − x̄)² × Σ(y − ȳ)²) ; |r| ≥ 0,70 = liaison forte ; 0,30 ≤ |r| < 0,70 = liaison modérée ; |r| < 0,30 = liaison négligeable.</p><ol><li>Quelle est la moyenne de x (années d'expérience) ?</li><li>Quelle est la moyenne de y (score) ?</li><li>Que vaut Σ(x − x̄)(y − ȳ), la somme des produits des écarts ?</li><li>Que vaut le coefficient de corrélation r ?</li><li>La relation est-elle forte, modérée ou négligeable ? (un mot)</li><li>Un r élevé prouve-t-il que l'expérience cause la performance ? (oui/non)</li></ol>",
    "starter": "# Exercice — Expérience et résolution d'incidents au Noc de TéliaNet\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Les questions 1 à 4 attendent des nombres ; la question 6 attend oui ou non.\n\n[Question 1 — Moyenne de x (années)]\nA_COMPLETER\n\n[Question 2 — Moyenne de y (score)]\nA_COMPLETER\n\n[Question 3 — Somme des produits des écarts]\nA_COMPLETER\n\n[Question 4 — Coefficient de corrélation r]\nA_COMPLETER\n\n[Question 5 — Force de la relation (un mot)]\nA_COMPLETER\n\n[Question 6 — r prouve-t-il une causalité (oui/non)]\nA_COMPLETER\n",
    "hints": [
      "Commencez par les deux moyennes, puis centrez chaque série : écarts de x et écarts de y pour chaque ingénieur.",
      "Calculez séparément la somme des produits des écarts, la somme des carrés des écarts de x et celle de y ; ici, les deux sommes de carrés valent 10.",
      "r vaut la somme des produits divisée par la racine du produit des sommes de carrés ; concluez sur la force avec le seuil 0,70 et rappelez que corrélation n'est pas causalité."
    ],
    "examples": [
      {
        "stdin": "L'enseigne Cordie croise la surface du rayon (x, centaines de m²) et les ventes hebdomadaires (y, k€) sur 5 magasins : x = 2, 4, 6, 8, 10 ; y = 4, 3, 5, 7, 6.\n\n1) Moyenne de x : 30/5 = 6.\n2) Moyenne de y : 25/5 = 5.\n3) Écarts de x : −4, −2, 0, 2, 4 ; écarts de y : −1, −2, 0, 2, 1 ; Σ(x−x̄)(y−ȳ) = 4 + 4 + 0 + 4 + 4 = 16.\n4) Σ(x−x̄)² = 40 et Σ(y−ȳ)² = 10, donc r = 16/√(40 × 10) = 16/20 = 0,8.\n5) 0,8 ≥ 0,70 : liaison forte.\n6) Causalité : non — l'emplacement ou le flux de clients peuvent tout expliquer.",
        "expected": "6 — 5 — 16 — 0,8 — forte — non",
        "note": "Le coefficient se calcule sur les séries centrées : la force se lit aux seuils 0,30 et 0,70, la causalité ne se déduit jamais du seul r."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Moyenne de x",
        "stdin": "q:1",
        "expected": "3||3 ans"
      },
      {
        "label": "Question 2 — Moyenne de y",
        "stdin": "q:2",
        "expected": "5"
      },
      {
        "label": "Question 3 — Somme des produits des écarts",
        "stdin": "q:3",
        "expected": "9"
      },
      {
        "label": "Question 4 — Coefficient de corrélation r",
        "stdin": "q:4",
        "expected": "0,9"
      },
      {
        "label": "Question 5 — Force de la relation",
        "stdin": "q:5",
        "expected": "forte"
      },
      {
        "label": "Question 6 — r prouve-t-il une causalité",
        "stdin": "q:6",
        "expected": "non"
      }
    ],
    "solution": "[Question 1 — Moyenne de x (années)]\n3\n\n[Question 2 — Moyenne de y (score)]\n5\n\n[Question 3 — Somme des produits des écarts]\n9\n\n[Question 4 — Coefficient de corrélation r]\n0,9\n\n[Question 5 — Force de la relation (un mot)]\nforte\n\n[Question 6 — r prouve-t-il une causalité (oui/non)]\nnon",
    "takeaway": "1) x̄ = (1 + 2 + 3 + 4 + 5)/5 = 15/5 = 3 années.\n2) ȳ = (3 + 5 + 4 + 6 + 7)/5 = 25/5 = 5.\n3) Écarts de x : −2, −1, 0, 1, 2 ; écarts de y : −2, 0, −1, 1, 2. Produits : 4, 0, 0, 1, 4, donc Σ(x − x̄)(y − ȳ) = 9.\n4) Σ(x − x̄)² = 4 + 1 + 0 + 1 + 4 = 10 ; Σ(y − ȳ)² = 4 + 0 + 1 + 1 + 4 = 10. r = 9/√(10 × 10) = 9/10 = 0,9.\n5) |0,9| ≥ 0,70 : relation linéaire forte (et positive : les deux variables croissent ensemble).\n6) Non : une corrélation élevée prouve une co-variation mathématique, jamais un lien causal — une variable confondante (formation initiale, motivation...) peut expliquer à la fois l'expérience et le score."
  }
];
