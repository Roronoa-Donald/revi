/**
 * chapitre6.js — Études de cas du cours « b3-etude-quantitative ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    "id": "eq3-c6-e1",
    "chapter": 6,
    "level": "n1",
    "language": "analyse",
    "title": "Le codage des entretiens de Thomas sur le télétravail",
    "exampleTitle": "Exemple résolu — l'analyse des entretiens d'intégration d'Anaïs",
    "goal": "Appliquer la méthode de Bardin : phases, unités d'enregistrement, grille déductive ou inductive et fréquences de codes.",
    "brief": "<p><strong>Énoncé.</strong> Pour son mémoire, Thomas a mené 12 entretiens semi-directifs sur le télétravail dans un intégrateur informatique. Il applique l'analyse de contenu de Laurence Bardin : il commence par une lecture flottante de l'ensemble du corpus, puis découpe chaque retranscription en segments de texte auxquels il attribue un code thématique selon sa grille. Sa grille comporte trois thèmes. Le dépouillement des <strong>120 unités codées</strong> donne : « charge mentale » 60 unités, « outillage » 40 unités, « management à distance » 20 unités. Thomas hésitait entre une grille fermée construite à partir des modèles théoriques de la littérature et une grille ouverte dont les catégories auraient émergé des mots des enquêtés.</p><ol><li>Comment s'appelle la phase de Bardin où l'on découpe le texte en unités et où l'on attribue les codes ? (un mot)</li><li>Comment s'appelle le segment de texte unitaire qui reçoit un code ? (deux mots)</li><li>Comment qualifie-t-on une grille dont les catégories sont définies avant l'analyse, à partir de la théorie ? (un mot)</li><li>Comment qualifie-t-on une grille dont les catégories émergent du discours des acteurs (théorie ancrée) ? (un mot)</li><li>À quelle phase de Bardin appartient la lecture flottante du corpus ? (un mot, avec tiret)</li><li>Quel pourcentage des unités porte le code « charge mentale » ?</li></ol>",
    "starter": "# Exercice — Le codage des entretiens de Thomas sur le télétravail\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par des termes du cours ; la question 6 attend un nombre.\n\n[Question 1 — Phase du découpage et du codage (un mot)]\nA_COMPLETER\n\n[Question 2 — Segment de texte codé (deux mots)]\nA_COMPLETER\n\n[Question 3 — Grille issue de la théorie (un mot)]\nA_COMPLETER\n\n[Question 4 — Grille émergente du terrain (un mot)]\nA_COMPLETER\n\n[Question 5 — Phase de la lecture flottante (un mot, avec tiret)]\nA_COMPLETER\n\n[Question 6 — Part des unités « charge mentale » (en %)]\nA_COMPLETER\n",
    "hints": [
      "Bardin structure l'analyse en trois phases : pré-analyse (lecture flottante, constitution du corpus), exploitation du matériau (découpage et codage), traitement des résultats (fréquences et interprétation).",
      "L'unité d'enregistrement est la portion de texte (mot, proposition, phrase, paragraphe) qui reçoit une étiquette thématique.",
      "Une grille construite sur la théorie avant le terrain est déductive ; des catégories qui émergent des verbatims relèvent de l'inductif ; terminez par la part du code dominant : 60 unités sur 120."
    ],
    "examples": [
      {
        "stdin": "Anaïs analyse 10 entretiens sur l'intégration des nouveaux développeurs : lecture flottante d'abord, puis découpage en 80 unités codées (équipement 40, accueil 25, mentorat 15) ; elle avait construit ses catégories à partir du modèle d'onboarding de la littérature.\n\n1) Phase du découpage-codage : l'exploitation du matériau (le codage).\n2) Segment codé : l'unité d'enregistrement.\n3) Grille issue de la littérature : déductive.\n4) Grille émergente des discours : inductive.\n5) Lecture flottante : la pré-analyse.\n6) Part du code « équipement » : 40/80 = 50 %.",
        "expected": "codage — unité d'enregistrement — déductive — inductive — pré-analyse — 50 %",
        "note": "Déductif quand la théorie précède, inductif quand le terrain parle : la phase de codage transforme le texte en données dénombrables."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Phase du découpage et du codage",
        "stdin": "q:1",
        "expected": "codage||le codage||exploitation||exploitation du matériau"
      },
      {
        "label": "Question 2 — Segment de texte codé",
        "stdin": "q:2",
        "expected": "unité d'enregistrement||unité d’enregistrement||l'unité d'enregistrement||l’unité d’enregistrement"
      },
      {
        "label": "Question 3 — Grille issue de la théorie",
        "stdin": "q:3",
        "expected": "déductive||déductif||fermée||a priori"
      },
      {
        "label": "Question 4 — Grille émergente du terrain",
        "stdin": "q:4",
        "expected": "inductive||inductif||ouverte||émergente"
      },
      {
        "label": "Question 5 — Phase de la lecture flottante",
        "stdin": "q:5",
        "expected": "pré-analyse||la pré-analyse||préanalyse||pré analyse"
      },
      {
        "label": "Question 6 — Part des unités « charge mentale »",
        "stdin": "q:6",
        "expected": "50||50 %"
      }
    ],
    "solution": "[Question 1 — Phase du découpage et du codage (un mot)]\ncodage\n\n[Question 2 — Segment de texte codé (deux mots)]\nunité d'enregistrement\n\n[Question 3 — Grille issue de la théorie (un mot)]\ndéductive\n\n[Question 4 — Grille émergente du terrain (un mot)]\ninductive\n\n[Question 5 — Phase de la lecture flottante (un mot, avec tiret)]\npré-analyse\n\n[Question 6 — Part des unités « charge mentale » (en %)]\n50",
    "takeaway": "1) Découper le texte en unités et attribuer les codes : c'est l'exploitation du matériau, autrement dit le codage (deuxième phase de Bardin).\n2) Le segment unitaire codé est l'unité d'enregistrement (mot, proposition, phrase ou paragraphe).\n3) Une grille construite avant l'analyse à partir des modèles théoriques est déductive (grille fermée, a priori).\n4) Une grille dont les catégories émergent des mots des acteurs relève de l'inductif (grille ouverte, in vivo, théorie ancrée).\n5) La lecture flottante initiale organise le corpus : elle appartient à la pré-analyse (première phase).\n6) 60/120 × 100 = 50 % des unités portent le code « charge mentale », thème dominant de l'étude. Contrôle : 60 + 40 + 20 = 120."
  },
  {
    "id": "eq3-c6-e2",
    "chapter": 6,
    "level": "n2",
    "language": "analyse",
    "title": "Les co-occurrences du corpus de l'ONG DigitalSahel",
    "exampleTitle": "Exemple résolu — les co-occurrences de l'étude qualité de Velmatic",
    "goal": "Calculer des indices de Jaccard entre thèmes et interpréter la force de leur co-occurrence.",
    "brief": "<p><strong>Énoncé.</strong> L'ONG DigitalSahel a retranscrit des entretiens sur les freins à l'adoption du numérique, découpés en <strong>100 segments</strong>. Quatre thèmes y sont codés : le thème A « pression temporelle » apparaît dans <strong>20 segments</strong>, le thème B « contournement des règles » dans <strong>15 segments</strong>, et les deux ensemble dans <strong>10 segments</strong>. Le thème C « manque de formation » apparaît dans <strong>25 segments</strong>, le thème D « rotation des équipes » dans <strong>25 segments</strong>, et les deux ensemble dans <strong>10 segments</strong>.</p><p>Rappel du cours : J(A, B) = N(AB)/(N(A) + N(B) − N(AB)) ; J ≥ 0,60 = forte synergie ; 0,30 ≤ J < 0,60 = connexion modérée ; J < 0,30 = indépendance.</p><ol><li>Combien de segments contiennent A ou B (l'union) ?</li><li>Que vaut l'indice de Jaccard J(A, B) ?</li><li>Comment qualifie le cours une co-occurrence de J = 0,4 ? (deux mots)</li><li>Que vaut J(C, D) ?</li><li>Comment qualifie le cours une co-occurrence de J(C, D) ? (un mot)</li><li>Combien de segments contiennent A sans B ?</li></ol>",
    "starter": "# Exercice — Les co-occurrences du corpus de l'ONG DigitalSahel\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Les questions 1, 2, 4 et 6 attendent des nombres ; la question 4 à deux décimales.\n\n[Question 1 — Union des thèmes A et B]\nA_COMPLETER\n\n[Question 2 — Indice de Jaccard J(A, B)]\nA_COMPLETER\n\n[Question 3 — Qualification d'une co-occurrence de 0,4 (deux mots)]\nA_COMPLETER\n\n[Question 4 — Indice de Jaccard J(C, D)]\nA_COMPLETER\n\n[Question 5 — Qualification de la co-occurrence de C et D (un mot)]\nA_COMPLETER\n\n[Question 6 — Segments contenant A sans B]\nA_COMPLETER\n",
    "hints": [
      "L'union de deux thèmes vaut N(A) + N(B) − N(AB) : on retire les segments comptés deux fois.",
      "J vaut la co-occurrence divisée par l'union ; le seuil 0,60 sépare la forte synergie de la connexion modérée, le seuil 0,30 sépare la connexion modérée de l'indépendance.",
      "Les segments avec A mais sans B s'obtiennent par N(A) − N(AB) ; contrôlez chaque union avec les effectifs donnés."
    ],
    "examples": [
      {
        "stdin": "Velmatic analyse 60 segments d'entretiens qualité : le thème « stress » apparaît dans 20 segments, « surcharge d'équipe » dans 20, ensemble dans 15 ; le thème « pièces défectueuses » dans 12, « maintenance préventive » dans 6, ensemble dans 3.\n\n1) Union stress/surcharge : 20 + 20 − 15 = 25.\n2) J = 15/25 = 0,6.\n3) J = 0,6, soit au seuil : forte synergie.\n4) Union pièces/maintenance : 12 + 6 − 3 = 15, donc J = 3/15 = 0,2.\n5) J = 0,2 < 0,30 : indépendance.\n6) Segments avec stress sans surcharge : 20 − 15 = 5.",
        "expected": "25 — 0,6 — forte synergie — 0,2 — indépendance — 5",
        "note": "L'indice de Jaccard traduit la proximité de deux thèmes : co-occurrence divisée par union, lue aux seuils 0,30 et 0,60."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Union des thèmes A et B",
        "stdin": "q:1",
        "expected": "25"
      },
      {
        "label": "Question 2 — Indice de Jaccard J(A, B)",
        "stdin": "q:2",
        "expected": "0,4"
      },
      {
        "label": "Question 3 — Qualification d'une co-occurrence de 0,4",
        "stdin": "q:3",
        "expected": "connexion modérée||modérée"
      },
      {
        "label": "Question 4 — Indice de Jaccard J(C, D)",
        "stdin": "q:4",
        "expected": "0,25"
      },
      {
        "label": "Question 5 — Qualification de la co-occurrence de C et D",
        "stdin": "q:5",
        "expected": "indépendance||indépendants||indépendante"
      },
      {
        "label": "Question 6 — Segments contenant A sans B",
        "stdin": "q:6",
        "expected": "10"
      }
    ],
    "solution": "[Question 1 — Union des thèmes A et B]\n25\n\n[Question 2 — Indice de Jaccard J(A, B)]\n0,4\n\n[Question 3 — Qualification d'une co-occurrence de 0,4 (deux mots)]\nconnexion modérée\n\n[Question 4 — Indice de Jaccard J(C, D)]\n0,25\n\n[Question 5 — Qualification de la co-occurrence de C et D (un mot)]\nindépendance\n\n[Question 6 — Segments contenant A sans B]\n10",
    "takeaway": "1) Union : N(A) + N(B) − N(AB) = 20 + 15 − 10 = 25 segments.\n2) J(A, B) = 10/25 = 0,4.\n3) 0,30 ≤ 0,4 < 0,60 : connexion modérée — pression temporelle et contournement des règles sont liés dans des contextes spécifiques.\n4) Union de C et D : 25 + 25 − 10 = 40 ; J(C, D) = 10/40 = 0,25.\n5) 0,25 < 0,30 : indépendance — manque de formation et rotation des équipes coexistent sans association privilégiée.\n6) Segments avec A sans B : N(A) − N(AB) = 20 − 10 = 10."
  },
  {
    "id": "eq3-c6-e3",
    "chapter": 6,
    "level": "n3",
    "language": "analyse",
    "title": "La structure du mémoire de Sarah pour Vertex Advisory",
    "exampleTitle": "Exemple résolu — le plan du mémoire de Kader pour l'usine Solvart",
    "goal": "Vérifier la structure canonique d'un mémoire professionnel CDP Sup et calibrer ses sections.",
    "brief": "<p><strong>Énoncé.</strong> Sarah achève son mémoire de Bachelor 3 réalisé chez Vertex Advisory ; son plan comporte cinq chapitres : 1. Problématique et contexte ; 2. Revue de littérature ; 3. Cadre méthodologique ; 4. Résultats empiriques ; 5. Discussion et limites. Son directeur de mémoire lui demande de compléter le plan, puis de vérifier la volumétrie : le guide CDP Sup impose <strong>40 à 100 pages hors annexes</strong>, et le mémoire de Sarah en compte <strong>68</strong>. Sur les 80 pages d'un mémoire type, la revue de littérature doit représenter <strong>20 à 25 %</strong> du volume. Enfin, le directeur rappelle deux règles de rédaction : ne jamais mélanger les constats bruts avec leur interprétation, et ancrer chaque préconisation dans une preuve établie dans le corps du travail.</p><ol><li>Quel pilier canonique manque au plan de Sarah ? (un mot)</li><li>Quelle section confronte les résultats de terrain aux modèles théoriques de la revue de littérature ? (un mot)</li><li>Un mémoire professionnel compte entre 40 et combien de pages hors annexes ?</li><li>Le mémoire de Sarah (68 pages) respecte-t-il la volumétrie du guide ? (oui/non)</li><li>Comment s'appelle la sous-section qui explicite les biais et la portée des conclusions ? (un mot)</li><li>Sur un mémoire de 80 pages, combien de pages au minimum la revue de littérature doit-elle compter (20 %) ?</li><li>De quelle section chaque recommandation managériale doit-elle découler directement ? (un mot)</li></ol>",
    "starter": "# Exercice — La structure du mémoire de Sarah pour Vertex Advisory\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Les questions 3, 4 et 6 attendent un nombre ou oui/non ; les autres des termes du cours.\n\n[Question 1 — Pilier manquant du plan (un mot)]\nA_COMPLETER\n\n[Question 2 — Section qui confronte terrain et théorie (un mot)]\nA_COMPLETER\n\n[Question 3 — Nombre de pages maximal hors annexes]\nA_COMPLETER\n\n[Question 4 — Volumétrie de 68 pages respectée (oui/non)]\nA_COMPLETER\n\n[Question 5 — Sous-section des biais et de la portée (un mot)]\nA_COMPLETER\n\n[Question 6 — Nombre minimal de pages de revue pour 80 pages]\nA_COMPLETER\n\n[Question 7 — Section d'où découlent les recommandations (un mot)]\nA_COMPLETER\n",
    "hints": [
      "Le guide CDP Sup impose six piliers : problématique, revue de littérature, cadre méthodologique, résultats, discussion et limites, recommandations.",
      "La discussion est le pivot réflexif : elle confronte le terrain à la théorie ; les limites bornent honnêtement la portée de l'étude.",
      "Pour la volumétrie : calculez 20 % de 80 pages ; chaque recommandation doit s'appuyer sur une preuve empirique établie dans les résultats."
    ],
    "examples": [
      {
        "stdin": "Kader rédige son mémoire pour l'usine Solvart ; son plan : Problématique, Revue de littérature, Résultats empiriques, Discussion et limites, Recommandations. Son mémoire compte 90 pages ; sur un mémoire type de 60 pages, le cadre méthodologique doit peser 15 à 20 %.\n\n1) Pilier manquant : le cadre méthodologique.\n2) Section pivot confrontant terrain et théorie : la discussion.\n3) Volumétrie : 40 à 100 pages hors annexes.\n4) 90 pages : conforme (oui).\n5) Sous-section des biais : les limites.\n6) Minimum pour la méthodologie : 15 % de 60 = 9 pages.\n7) Les recommandations découlent des résultats.",
        "expected": "cadre méthodologique — discussion — 100 — oui — limites — 9 pages — résultats",
        "note": "Six piliers, une volumétrie, une frontière stricte entre constat et interprétation : la structure du mémoire est une exigence académique."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Pilier manquant du plan",
        "stdin": "q:1",
        "expected": "recommandations||les recommandations||préconisations||recommandations managériales||préconisations managériales"
      },
      {
        "label": "Question 2 — Section qui confronte terrain et théorie",
        "stdin": "q:2",
        "expected": "discussion||la discussion"
      },
      {
        "label": "Question 3 — Nombre de pages maximal hors annexes",
        "stdin": "q:3",
        "expected": "100||100 pages"
      },
      {
        "label": "Question 4 — Volumétrie de 68 pages respectée",
        "stdin": "q:4",
        "expected": "oui"
      },
      {
        "label": "Question 5 — Sous-section des biais et de la portée",
        "stdin": "q:5",
        "expected": "limites||les limites||limites méthodologiques"
      },
      {
        "label": "Question 6 — Nombre minimal de pages de revue pour 80 pages",
        "stdin": "q:6",
        "expected": "16||16 pages"
      },
      {
        "label": "Question 7 — Section d'où découlent les recommandations",
        "stdin": "q:7",
        "expected": "résultats||les résultats||résultats empiriques||les résultats empiriques||des résultats empiriques"
      }
    ],
    "solution": "[Question 1 — Pilier manquant du plan (un mot)]\nrecommandations\n\n[Question 2 — Section qui confronte terrain et théorie (un mot)]\ndiscussion\n\n[Question 3 — Nombre de pages maximal hors annexes]\n100\n\n[Question 4 — Volumétrie de 68 pages respectée (oui/non)]\noui\n\n[Question 5 — Sous-section des biais et de la portée (un mot)]\nlimites\n\n[Question 6 — Nombre minimal de pages de revue pour 80 pages]\n16\n\n[Question 7 — Section d'où découlent les recommandations (un mot)]\nrésultats",
    "takeaway": "1) Il manque le sixième pilier : les recommandations managériales et techniques (10 à 15 % du volume).\n2) La discussion confronte les résultats empiriques aux théories de la revue de littérature et explique les convergences et les écarts.\n3) Le guide fixe 40 à 100 pages hors annexes.\n4) 68 pages est compris entre 40 et 100 : oui, la volumétrie est conforme.\n5) La sous-section des limites (au sein de la discussion) détaille les biais d'échantillonnage, les limites méthodologiques et la transférabilité des conclusions.\n6) 20 % de 80 pages = 16 pages minimum pour la revue de littérature.\n7) Chaque recommandation doit découler directement des résultats : une préconisation non étayée par une preuve relève de l'opinion et décrédibilise le mémoire."
  }
];
