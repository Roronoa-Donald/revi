/**
 * chapitre3.js — Études de cas du cours « b3-etude-quantitative ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    "id": "eq3-c3-e1",
    "chapter": 3,
    "level": "n1",
    "language": "analyse",
    "title": "Le questionnaire de l'application de covoiturage MobiliX",
    "exampleTitle": "Exemple résolu — l'enquête de la médiathèque de Brancion",
    "goal": "Identifier les types de questions et d'échelles d'un questionnaire et calculer une proportion de réponses.",
    "brief": "<p><strong>Énoncé.</strong> La start-up MobiliX vient de lancer une application de covoiturage urbain. Pour mesurer la satisfaction de ses utilisateurs, elle prépare ce questionnaire, testé sur <strong>200 répondants</strong> :</p><p><code>Q1. « Utilisez-vous MobiliX au moins une fois par semaine ? » — Oui / Non</code></p><p><code>Q2. « Je suis satisfait de la rapidité de la mise en relation. » — échelle de 1 « Pas du tout d'accord » à 5 « Tout à fait d'accord »</code></p><p><code>Q3. « Quelle amélioration souhaiteriez-vous en priorité ? » — champ de texte libre</code></p><p>Sur les 200 répondants, <strong>80</strong> ont coché « Tout à fait d'accord » (5) à la question Q2. Avant la diffusion générale, l'équipe soumet le questionnaire à huit utilisateurs pour chronométrer la passation et corriger les ambiguïtés.</p><ol><li>Quel type d'échelle psychométrique la question Q2 utilise-t-elle ? (nom de l'échelle)</li><li>Un répondant coche 4 sur cette échelle : quel est le libellé de cette position ?</li><li>Quel est le type de la question Q1 ? (un mot)</li><li>Quel pourcentage des répondants a coché « Tout à fait d'accord » à Q2 ?</li><li>Quel est le type de la question Q3 ? (un mot)</li><li>Comment s'appelle la passation d'essai du questionnaire auprès des huit utilisateurs ? (un mot, avec tiret)</li></ol>",
    "starter": "# Exercice — Le questionnaire de l'application de covoiturage MobiliX\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par des termes du cours ; la question 4 attend un nombre.\n\n[Question 1 — Type d'échelle de Q2]\nA_COMPLETER\n\n[Question 2 — Libellé de la position 4]\nA_COMPLETER\n\n[Question 3 — Type de la question Q1 (un mot)]\nA_COMPLETER\n\n[Question 4 — Part des « Tout à fait d'accord » (en %)]\nA_COMPLETER\n\n[Question 5 — Type de la question Q3 (un mot)]\nA_COMPLETER\n\n[Question 6 — Passation d'essai avant diffusion (un mot)]\nA_COMPLETER\n",
    "hints": [
      "L'échelle de Likert mesure l'intensité d'un accord ou d'une satisfaction sur un nombre fixe de points, du désaccord total à l'adhésion complète.",
      "Une question fermée à deux modalités exclusives est dichotomique ; une question à champ libre est ouverte.",
      "Le pré-test (ou test pilote) se fait sur un petit groupe : il chronomètre la passation et débusque les ambiguïtés avant le grand envoi."
    ],
    "examples": [
      {
        "stdin": "La médiathèque de Brancion interroge 150 inscrits. Q1 : « Êtes-vous inscrit au club lecture ? » Oui/Non. Q2 : « L'accueil est efficace » (de 1 « Pas du tout d'accord » à 5 « Tout à fait d'accord »). Q3 : « Quel service développer ? » (texte libre). 30 inscrits cochent 5 à Q2 ; le questionnaire est essayé sur 6 inscrits avant l'envoi.\n\n1) Q2 = échelle de Likert.\n2) Cocher 4 = « Plutôt d'accord ».\n3) Q1 = question dichotomique (fermée).\n4) Part des « Tout à fait d'accord » : 30/150 = 20 %.\n5) Q3 = question ouverte.\n6) L'essai avant envoi = le pré-test.",
        "expected": "Likert — Plutôt d'accord — dichotomique — 20 % — ouverte — pré-test",
        "note": "Chaque format de question produit un type de donnée différent : binaire, ordinale ou verbatim ; le pré-test sécurise la passation avant le grand envoi."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Type d'échelle de Q2",
        "stdin": "q:1",
        "expected": "Likert||échelle de Likert||l'échelle de Likert||l’échelle de Likert"
      },
      {
        "label": "Question 2 — Libellé de la position 4",
        "stdin": "q:2",
        "expected": "Plutôt d'accord||Plutôt d’accord"
      },
      {
        "label": "Question 3 — Type de la question Q1",
        "stdin": "q:3",
        "expected": "dichotomique||fermée dichotomique||question dichotomique||fermée"
      },
      {
        "label": "Question 4 — Part des « Tout à fait d'accord »",
        "stdin": "q:4",
        "expected": "40||40 %"
      },
      {
        "label": "Question 5 — Type de la question Q3",
        "stdin": "q:5",
        "expected": "ouverte||question ouverte"
      },
      {
        "label": "Question 6 — Passation d'essai avant diffusion",
        "stdin": "q:6",
        "expected": "pré-test||le pré-test||prétest||pré test||pilote||test pilote"
      }
    ],
    "solution": "[Question 1 — Type d'échelle de Q2]\nLikert\n\n[Question 2 — Libellé de la position 4]\nPlutôt d'accord\n\n[Question 3 — Type de la question Q1 (un mot)]\ndichotomique\n\n[Question 4 — Part des « Tout à fait d'accord » (en %)]\n40\n\n[Question 5 — Type de la question Q3 (un mot)]\nouverte\n\n[Question 6 — Passation d'essai avant diffusion (un mot)]\npré-test",
    "takeaway": "1) Q2 mesure l'intensité de l'accord sur une échelle graduée de 1 à 5 : c'est une échelle de Likert.\n2) Le point 4 correspond à « Plutôt d'accord » (accord modéré ; le 5 vaut « Tout à fait d'accord »).\n3) Q1 offre deux modalités exclusives (Oui/Non) : question fermée dichotomique.\n4) 80/200 × 100 = 40 % des répondants cochent « Tout à fait d'accord ».\n5) Q3 laisse un champ de texte libre : question ouverte, à utiliser avec parcimonie et plutôt en fin de questionnaire.\n6) La passation d'essai auprès d'un petit groupe (5 à 15 personnes) est le pré-test : il mesure la durée de remplissage et corrige les incompréhensions avant le déploiement."
  },
  {
    "id": "eq3-c3-e2",
    "chapter": 3,
    "level": "n2",
    "language": "analyse",
    "title": "Les questions piégées de l'enquête du portail de Porte-Verte",
    "exampleTitle": "Exemple résolu — l'enquête formation du service RH d'Axiane",
    "goal": "Détecter les biais de formulation (suggestif, double détente, double négation) et calculer un taux d'abandon.",
    "brief": "<p><strong>Énoncé.</strong> La mairie de Porte-Verte prépare une enquête en ligne (CAWI) sur son nouveau portail de services. Un stagiaire propose trois questions ; la cheffe de projet les fait corriger :</p><p><code>Q1. « Ne pensez-vous pas que le nouveau portail est le plus efficace du marché ? »</code></p><p><code>Q2. « Trouvez-vous le portail rapide et sécurisé ? »</code></p><p><code>Q3. « N'est-il pas inexact que le portail n'ait jamais été en panne ? »</code></p><p>La campagne d'envoi donne : <strong>2 000 questionnaires envoyés, 640 ouverts, 480 initiés</strong> (questionnaire démarré) et <strong>300 complétés</strong>. Le taux d'abandon (drop-off) se calcule parmi les initiés : (Initiés − Complétés)/Initiés.</p><ol><li>Quel biais de formulation la question Q1 présente-t-elle ? (un mot)</li><li>Quel biais la question Q2 présente-t-elle ? (deux mots)</li><li>Quel biais la question Q3 présente-t-elle ? (deux mots)</li><li>Par combien de questions neutres distinctes faut-il remplacer Q2 ?</li><li>Quel est le taux d'abandon de l'enquête, en pourcentage ?</li><li>Ce taux dépasse-t-il le seuil critique de 30 % au-delà duquel un questionnaire est jugé trop long ou dysfonctionnel ? (oui/non)</li></ol>",
    "starter": "# Exercice — Les questions piégées de l'enquête du portail de Porte-Verte\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Les questions 4 et 5 attendent des nombres ; la question 5 à une décimale.\n\n[Question 1 — Biais de la question Q1 (un mot)]\nA_COMPLETER\n\n[Question 2 — Biais de la question Q2 (deux mots)]\nA_COMPLETER\n\n[Question 3 — Biais de la question Q3 (deux mots)]\nA_COMPLETER\n\n[Question 4 — Nombre de questions neutres pour remplacer Q2]\nA_COMPLETER\n\n[Question 5 — Taux d'abandon (en %)]\nA_COMPLETER\n\n[Question 6 — Au-delà du seuil critique de 30 % (oui/non)]\nA_COMPLETER\n",
    "hints": [
      "« Ne pensez-vous pas que... » pousse psychologiquement vers l'approbation : c'est le biais suggestif ; une question honnête reste neutre.",
      "Une question qui évalue deux attributs à la fois (« rapide ET sécurisé ») empêche toute nuance : il faut la scinder ; deux négations empilées saturent la compréhension.",
      "Le taux d'abandon se calcule parmi les personnes qui ont commencé le questionnaire : (480 − 300)/480 ; comparez ensuite au seuil de fatigue de 30 %."
    ],
    "examples": [
      {
        "stdin": "Le service RH d'Axiane teste son questionnaire de formation : « Notre formation n'est-elle pas excellente ? » ; « La formation est-elle utile et bien planifiée ? » ; « N'est-il pas faux que le formateur ne soit jamais absent ? ». Campagne : 1 000 envoyés, 400 initiés, 300 complétés.\n\n1) Biais 1 : suggestif.\n2) Biais 2 : double détente (deux attributs).\n3) Biais 3 : double négation.\n4) Scinder la question 2 en 2 questions.\n5) Drop-off : (400 − 300)/400 = 25 %.\n6) 25 % < 30 % : sous le seuil critique (non).",
        "expected": "suggestif — double détente — double négation — 2 questions — 25 % — non",
        "note": "Une formulation biaisée invalide toutes les statistiques qui en découlent ; le drop-off mesure la déperdition parmi ceux qui ont commencé."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Biais de la question Q1",
        "stdin": "q:1",
        "expected": "suggestif||suggestive||biais suggestif||question suggestive"
      },
      {
        "label": "Question 2 — Biais de la question Q2",
        "stdin": "q:2",
        "expected": "double détente||double-barrelled||double barrelled"
      },
      {
        "label": "Question 3 — Biais de la question Q3",
        "stdin": "q:3",
        "expected": "double négation||doubles négations||négation double"
      },
      {
        "label": "Question 4 — Nombre de questions neutres pour remplacer Q2",
        "stdin": "q:4",
        "expected": "2||2 questions||deux"
      },
      {
        "label": "Question 5 — Taux d'abandon",
        "stdin": "q:5",
        "expected": "37,5||37,5 %"
      },
      {
        "label": "Question 6 — Au-delà du seuil critique de 30 %",
        "stdin": "q:6",
        "expected": "oui"
      }
    ],
    "solution": "[Question 1 — Biais de la question Q1 (un mot)]\nsuggestif\n\n[Question 2 — Biais de la question Q2 (deux mots)]\ndouble détente\n\n[Question 3 — Biais de la question Q3 (deux mots)]\ndouble négation\n\n[Question 4 — Nombre de questions neutres pour remplacer Q2]\n2\n\n[Question 5 — Taux d'abandon (en %)]\n37,5\n\n[Question 6 — Au-delà du seuil critique de 30 % (oui/non)]\noui",
    "takeaway": "1) « Ne pensez-vous pas que... » oriente le répondant vers l'assentiment : biais suggestif (leading question). Reformulation neutre : « Quel est votre degré de satisfaction concernant l'efficacité du portail ? »\n2) « Rapide et sécurisé » évalue deux attributs distincts en une seule question : question à double détente (double-barrelled), impossible à honnêtement renseigner si l'un est bon et l'autre mauvais.\n3) Deux négations empilées (« n'est-il pas inexact... n'ait jamais ») : biais de double négation, à remplacer par une phrase affirmative directe.\n4) Il faut scinder Q2 en 2 questions indépendantes : une sur la rapidité, une sur la sécurité.\n5) Taux d'abandon : (480 − 300)/480 × 100 = 180/480 × 100 = 37,5 %.\n6) 37,5 % > 30 % : le questionnaire est jugé trop long ou dysfonctionnel ; il faut le raccourcir (durée cible sous les 7 à 10 minutes), afficher une barre de progression et placer les questions signalétiques à la fin. Contrôle des autres métriques : taux d'ouverture 640/2 000 = 32 %, taux de complétion final 300/2 000 = 15 %."
  },
  {
    "id": "eq3-c3-e3",
    "chapter": 3,
    "level": "n3",
    "language": "analyse",
    "title": "La mesure de la satisfaction du support de Logilane",
    "exampleTitle": "Exemple résolu — l'item de courtoisie de la clinique Saint-Aubin",
    "goal": "Exploiter une distribution de Likert : moyenne pondérée, médiane, mode, part de satisfaits et échelle d'Osgood.",
    "brief": "<p><strong>Énoncé.</strong> L'éditeur Logilane mesure la satisfaction de son support client avec l'item de Likert : « Je suis satisfait de la réactivité du support » (1 = Pas du tout d'accord, 2 = Plutôt pas d'accord, 3 = Neutre, 4 = Plutôt d'accord, 5 = Tout à fait d'accord). Sur <strong>200 clients interrogés</strong>, la distribution des réponses est :</p><table><tr><th>Point k</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr><tr><th>Effectif N(k)</th><td>20</td><td>40</td><td>40</td><td>60</td><td>40</td></tr></table><p>Le questionnaire mesure aussi la perception du délai de traitement avec une échelle bipolaire : 1 = « très lente », 5 = « très rapide ».</p><ol><li>Quelle est la moyenne pondérée de l'item (adhésion globale sur 5) ?</li><li>Quelle est la médiane de la distribution ?</li><li>Quel est le mode ?</li><li>Quel pourcentage de clients « satisfaits » (notes 4 ou 5) l'item recense-t-il ?</li><li>La moyenne obtenue traduit-elle une adhésion globalement positive, neutre ou négative ? (un mot)</li><li>Comment s'appelle l'échelle bipolaire qui gradue la perception entre deux adjectifs opposés (« très lente » / « très rapide ») ? (deux mots)</li></ol>",
    "starter": "# Exercice — La mesure de la satisfaction du support de Logilane\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Les questions 1 à 4 attendent des nombres ; les questions 5 et 6 des termes du cours.\n\n[Question 1 — Moyenne pondérée de l'item]\nA_COMPLETER\n\n[Question 2 — Médiane de la distribution]\nA_COMPLETER\n\n[Question 3 — Mode]\nA_COMPLETER\n\n[Question 4 — Part des clients satisfaits, notes 4 ou 5 (en %)]\nA_COMPLETER\n\n[Question 5 — Adhésion globale (un mot)]\nA_COMPLETER\n\n[Question 6 — Échelle bipolaire entre deux adjectifs opposés]\nA_COMPLETER\n",
    "hints": [
      "La moyenne pondérée d'un item de Likert vaut la somme des produits k × N(k) divisée par l'effectif total.",
      "Pour la médiane, cumulez les effectifs : 20 (jusqu'à 1), 60 (jusqu'à 2), 100 (jusqu'à 3), 160 (jusqu'à 4), 200 (jusqu'à 5) ; la moyenne des 100e et 101e réponses ordonnées donne la médiane.",
      "Le mode est le point d'effectif maximal ; les satisfaits sont les notes 4 ou 5 ; l'échelle entre deux adjectifs opposés porte le nom de son auteur, Osgood."
    ],
    "examples": [
      {
        "stdin": "La clinique Saint-Aubin mesure « Le personnel vous a traité avec courtoisie » (échelle de 1 à 5) auprès de 100 patients : 1 → 20, 2 → 30, 3 → 30, 4 → 10, 5 → 10.\n\n1) Moyenne : (20 + 60 + 90 + 40 + 50)/100 = 2,6 sur 5.\n2) Cumuls : 20, 50, 80, 90, 100 → les 50e et 51e valeurs valent 3 : médiane 3.\n3) Mode : 2 (30 réponses).\n4) Satisfaits (4 ou 5) : (10 + 10)/100 = 20 %.\n5) 2,6 < 3 : adhésion négative.\n6) Une échelle « très froid / très chaleureux » est un différentiel sémantique.",
        "expected": "2,6 — 3 — 2 — 20 % — négative — différentiel sémantique",
        "note": "Sur une échelle symétrique de 5 points, le 3 est le pivot : la moyenne situe l'adhésion, l'écart-type mesurerait le consensus."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Moyenne pondérée de l'item",
        "stdin": "q:1",
        "expected": "3,3"
      },
      {
        "label": "Question 2 — Médiane de la distribution",
        "stdin": "q:2",
        "expected": "3,5"
      },
      {
        "label": "Question 3 — Mode",
        "stdin": "q:3",
        "expected": "4"
      },
      {
        "label": "Question 4 — Part des clients satisfaits",
        "stdin": "q:4",
        "expected": "50||50 %"
      },
      {
        "label": "Question 5 — Adhésion globale",
        "stdin": "q:5",
        "expected": "positive"
      },
      {
        "label": "Question 6 — Échelle bipolaire entre deux adjectifs opposés",
        "stdin": "q:6",
        "expected": "différentiel sémantique||le différentiel sémantique||différentiel d'Osgood||différentiel d’Osgood"
      }
    ],
    "solution": "[Question 1 — Moyenne pondérée de l'item]\n3,3\n\n[Question 2 — Médiane de la distribution]\n3,5\n\n[Question 3 — Mode]\n4\n\n[Question 4 — Part des clients satisfaits, notes 4 ou 5 (en %)]\n50\n\n[Question 5 — Adhésion globale (un mot)]\npositive\n\n[Question 6 — Échelle bipolaire entre deux adjectifs opposés]\ndifférentiel sémantique",
    "takeaway": "Contrôle préalable : 20 + 40 + 40 + 60 + 40 = 200 réponses.\n1) Moyenne pondérée : (1×20 + 2×40 + 3×40 + 4×60 + 5×40)/200 = (20 + 80 + 120 + 240 + 200)/200 = 660/200 = 3,3 sur 5.\n2) Cumuls : 20 (jusqu'à 1), 60 (jusqu'à 2), 100 (jusqu'à 3), 160 (jusqu'à 4), 200 (jusqu'à 5). Les 100e et 101e réponses ordonnées valent 3 et 4 : médiane = (3 + 4)/2 = 3,5.\n3) Le mode est le point d'effectif maximal : 4 (« Plutôt d'accord », 60 réponses).\n4) Satisfaits (notes 4 ou 5) : (60 + 40)/200 = 100/200 = 50 %.\n5) 3,3 > 3 (point neutre de l'échelle symétrique) : adhésion globalement positive, mais modérée, puisque seule la moitié des clients se déclare satisfaite.\n6) Graduer une perception entre deux adjectifs opposés relève du différentiel sémantique (différentiel d'Osgood)."
  }
];
