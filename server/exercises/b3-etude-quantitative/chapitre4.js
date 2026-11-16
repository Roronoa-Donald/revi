/**
 * chapitre4.js — Études de cas du cours « b3-etude-quantitative ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    "id": "eq3-c4-e1",
    "chapter": 4,
    "level": "n1",
    "language": "analyse",
    "title": "Le guide d'entretien de Yasmine sur la migration Kubernetes",
    "exampleTitle": "Exemple résolu — les entretiens de Marc sur l'externalisation du support",
    "goal": "Identifier la structure d'un entretien semi-directif, les relances neutres et les règles déontologiques de la collecte qualitative.",
    "brief": "<p><strong>Énoncé.</strong> Pour son mémoire de Bachelor 3, Yasmine étudie le vécu de la migration vers Kubernetes chez MeridiInvest, une banque d'investissement. Elle rédige un guide comportant quatre thèmes obligatoires (trajectoire, difficultés techniques, relations d'équipe, outils), mais laisse l'ordre des sous-questions souple pour suivre le fil de la pensée de l'enquêté. En ouverture de chaque séance, elle présente les objectifs, garantit l'anonymat strict et demande l'autorisation d'enregistrer. Quand un développeur dit « la migration était complexe », elle se contente de répéter « complexe ? » sur un ton interrogatif. Elle prévoit <strong>8 entretiens de 45 minutes</strong>, tous retranscrits intégralement, mot à mot.</p><ol><li>Quel type d'entretien Yasmine conduit-elle ? (un mot, avec tiret)</li><li>Comment s'appelle la relance qui répète le dernier mot prononcé sur un ton interrogatif ? (un mot)</li><li>En phase d'accueil, quelle autorisation Yasmine doit-elle recueillir pour l'enregistrement ? (un mot)</li><li>Un focus group réunit entre 6 et combien de participants ?</li><li>Comment s'appelle la retranscription intégrale, mot à mot, des enregistrements ? (un mot)</li><li>Quelle sera la durée totale des 8 entretiens, en minutes ?</li></ol>",
    "starter": "# Exercice — Le guide d'entretien de Yasmine sur la migration Kubernetes\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par des termes du cours ; les questions 4 et 6 attendent des nombres.\n\n[Question 1 — Type d'entretien (un mot, avec tiret)]\nA_COMPLETER\n\n[Question 2 — Relance qui répète le dernier mot (un mot)]\nA_COMPLETER\n\n[Question 3 — Autorisation d'enregistrement (un mot)]\nA_COMPLETER\n\n[Question 4 — Nombre maximal de participants d'un focus group]\nA_COMPLETER\n\n[Question 5 — Retranscription intégrale mot à mot (un mot)]\nA_COMPLETER\n\n[Question 6 — Durée totale des entretiens (en minutes)]\nA_COMPLETER\n",
    "hints": [
      "L'entretien semi-directif impose les thèmes (le guide) mais laisse libre le cheminement : il se distingue du directif (questions fixes) et du non directif (récit libre).",
      "Les relances neutres n'introduisent aucun vocabulaire nouveau : écho, demande d'illustration, clarification, silence attentif.",
      "La retranscription intégrale des enregistrements s'appelle le verbatim ; multipliez le nombre d'entretiens par leur durée pour la dernière question."
    ],
    "examples": [
      {
        "stdin": "Marc étudie l'externalisation du support IT de son entreprise : guide de 3 thèmes, ordre souple, 6 entretiens de 40 minutes, anonymat et autorisation d'enregistrement en ouverture ; il retranscrit tout mot à mot.\n\n1) Type d'entretien : semi-directif.\n2) Répéter le dernier mot sur un ton interrogatif : la relance en écho.\n3) Autorisation d'enregistrement : le consentement (éclairé).\n4) Un focus group réunit 6 à 10 participants.\n5) La transcription mot à mot : le verbatim.\n6) Durée totale : 6 × 40 = 240 minutes.",
        "expected": "semi-directif — écho — consentement — 10 — verbatim — 240 minutes",
        "note": "Le semi-directif combine la rigueur du guide et la liberté du récit ; la déontologie (anonymat, consentement) conditionne la sincérité du discours."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Type d'entretien",
        "stdin": "q:1",
        "expected": "semi-directif||semi directif||entretien semi-directif||entretien semi directif||semidirectif"
      },
      {
        "label": "Question 2 — Relance qui répète le dernier mot",
        "stdin": "q:2",
        "expected": "écho||relance en écho||miroir"
      },
      {
        "label": "Question 3 — Autorisation d'enregistrement",
        "stdin": "q:3",
        "expected": "consentement||le consentement||consentement éclairé||le consentement éclairé"
      },
      {
        "label": "Question 4 — Nombre maximal de participants d'un focus group",
        "stdin": "q:4",
        "expected": "10||10 participants"
      },
      {
        "label": "Question 5 — Retranscription intégrale mot à mot",
        "stdin": "q:5",
        "expected": "verbatim||le verbatim"
      },
      {
        "label": "Question 6 — Durée totale des entretiens",
        "stdin": "q:6",
        "expected": "360||360 minutes"
      }
    ],
    "solution": "[Question 1 — Type d'entretien (un mot, avec tiret)]\nsemi-directif\n\n[Question 2 — Relance qui répète le dernier mot (un mot)]\nécho\n\n[Question 3 — Autorisation d'enregistrement (un mot)]\nconsentement\n\n[Question 4 — Nombre maximal de participants d'un focus group]\n10\n\n[Question 5 — Retranscription intégrale mot à mot (un mot)]\nverbatim\n\n[Question 6 — Durée totale des entretiens (en minutes)]\n360",
    "takeaway": "1) Guide de thèmes obligatoires mais ordre souple : entretien semi-directif, le format de référence du mémoire professionnel.\n2) Répéter « complexe ? » sans rien ajouter : c'est la relance en écho (ou miroir), qui approfondit sans jamais orienter.\n3) L'autorisation d'enregistrement s'inscrit dans le consentement éclairé, garanti en ouverture avec l'anonymat strict et le cadre non évaluatif.\n4) Un focus group réunit 6 à 10 participants : assez pour la dynamique collective, assez peu pour que chacun s'exprime en profondeur.\n5) La retranscription intégrale mot à mot est le verbatim, matière première de l'analyse de contenu.\n6) Durée totale : 8 × 45 = 360 minutes de collecte, hors temps de retranscription."
  },
  {
    "id": "eq3-c4-e2",
    "chapter": 4,
    "level": "n2",
    "language": "analyse",
    "title": "Le focus group sur l'outil collaboratif TeamSphere",
    "exampleTitle": "Exemple résolu — l'atelier cantine de l'entreprise Vorhees",
    "goal": "Analyser la répartition du temps de parole d'un focus group et le biais de dominance associé.",
    "brief": "<p><strong>Énoncé.</strong> L'assurance Malteo réunit un focus group de <strong>8 participants</strong> pendant <strong>90 minutes</strong> pour tester son nouvel outil collaboratif TeamSphere. Le modérateur relève le temps de parole de chacun :</p><table><tr><th>Participant</th><th>Karim (chef de projet)</th><th>Léa</th><th>Marc</th><th>Nina</th><th>4 participants discrets</th></tr><tr><th>Temps de parole (min)</th><td>36</td><td>15</td><td>12</td><td>9</td><td>18 au total</td></tr></table><p>Rappel du cours : au-delà de 35 % du temps total accaparé par une personne, on parle de leader dominant, avec un risque de conformisme pour le reste du groupe (effet Asch). Par ailleurs, une ergonome de Malteo passe trois semaines intégrée dans une équipe de développeurs, comme développeuse, pour observer les usages réels de l'outil.</p><ol><li>Quelle part du temps de parole total Karim accapare-t-il, en pourcentage ?</li><li>Au-delà de quel pourcentage du temps total une personne devient-elle un leader dominant ?</li><li>Karim est-il un leader dominant au sens du cours ? (oui/non)</li><li>Quel risque de biais son comportement fait-il courir aux autres participants ? (un mot)</li><li>Quelle est la durée moyenne de parole de chacun des 4 participants discrets, en minutes ?</li><li>La posture de l'ergonome, intégrée à l'équipe comme développeuse, s'appelle l'observation ... (un mot)</li></ol>",
    "starter": "# Exercice — Le focus group sur l'outil collaboratif TeamSphere\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Les questions 1, 2 et 5 attendent des nombres (la 5 à une décimale).\n\n[Question 1 — Part du temps de parole de Karim (en %)]\nA_COMPLETER\n\n[Question 2 — Seuil de leader dominant (en %)]\nA_COMPLETER\n\n[Question 3 — Karim est-il un leader dominant (oui/non)]\nA_COMPLETER\n\n[Question 4 — Risque de biais pour les autres (un mot)]\nA_COMPLETER\n\n[Question 5 — Durée moyenne de parole des 4 discrets (en minutes)]\nA_COMPLETER\n\n[Question 6 — Observation ... (un mot)]\nA_COMPLETER\n",
    "hints": [
      "La part de parole d'un participant vaut son temps divisé par le temps total du groupe, multiplié par 100.",
      "Le cours fixe le seuil de domination à 35 % du temps total ; au-delà, les autres participants s'autocensurent par conformisme.",
      "Pour la moyenne, partagez les 18 minutes restantes entre les 4 participants discrets ; l'ergonome intégrée à l'équipe comme développeuse pratique l'observation participante."
    ],
    "examples": [
      {
        "stdin": "Chez Vorhees, un atelier de 6 personnes dure 60 minutes : Nadia (manager) parle 27 minutes, les 5 autres se partagent les 33 minutes restantes. Une assistante observe les pauses en restant assise au fond de la salle, sans participer.\n\n1) Part de Nadia : 27/60 = 45 %.\n2) Seuil de leader dominant : 35 %.\n3) 45 % > 35 % : oui, leader dominant.\n4) Risque : le conformisme (effet Asch).\n5) Moyenne des 5 autres : 33/5 = 6,6 minutes.\n6) L'assistante extérieure silencieuse : observation non participante.",
        "expected": "45 % — 35 % — oui — conformisme — 6,6 min — non participante",
        "note": "Le modérateur doit redistribuer la parole : solliciter nommément les discrets, sinon le groupe s'aligne sur le dominant et masque les dissensus."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Part du temps de parole de Karim",
        "stdin": "q:1",
        "expected": "40||40 %"
      },
      {
        "label": "Question 2 — Seuil de leader dominant",
        "stdin": "q:2",
        "expected": "35||35 %"
      },
      {
        "label": "Question 3 — Karim est-il un leader dominant",
        "stdin": "q:3",
        "expected": "oui"
      },
      {
        "label": "Question 4 — Risque de biais pour les autres",
        "stdin": "q:4",
        "expected": "conformisme||effet Asch||Asch||de conformisme"
      },
      {
        "label": "Question 5 — Durée moyenne de parole des 4 discrets",
        "stdin": "q:5",
        "expected": "4,5||4,5 minutes"
      },
      {
        "label": "Question 6 — Observation ...",
        "stdin": "q:6",
        "expected": "participante||observation participante||l'observation participante||l’observation participante"
      }
    ],
    "solution": "[Question 1 — Part du temps de parole de Karim (en %)]\n40\n\n[Question 2 — Seuil de leader dominant (en %)]\n35\n\n[Question 3 — Karim est-il un leader dominant (oui/non)]\noui\n\n[Question 4 — Risque de biais pour les autres (un mot)]\nconformisme\n\n[Question 5 — Durée moyenne de parole des 4 discrets (en minutes)]\n4,5\n\n[Question 6 — Observation ... (un mot)]\nparticipante",
    "takeaway": "Contrôle : 36 + 15 + 12 + 9 + 18 = 90 minutes.\n1) Part de Karim : 36/90 × 100 = 40 % du temps de parole.\n2) Le seuil du cours est 35 % du temps total.\n3) 40 % > 35 % : oui, Karim est un leader dominant.\n4) Les autres participants risquent de s'aligner sur lui par conformisme (effet Asch) : le modérateur doit redistribuer la parole vers les silencieux.\n5) Les 4 participants discrets se partagent 18 minutes : 18/4 = 4,5 minutes chacun en moyenne.\n6) Intégrée à l'équipe comme développeuse pour observer de l'intérieur : observation participante (par opposition à l'observation non participante du témoin extérieur muni d'une grille)."
  },
  {
    id: "eq3-c4-e3",
    chapter: 4,
    level: "n3",
    language: 'analyse',
    title: "Grille d’observation comportementale et accord inter-observateurs",
    goal: "Calculer l’accord brut et le kappa de Cohen non pondéré, puis en identifier les limites.",
    brief: "<p>Deux observateurs indépendants codent les mêmes unités selon deux catégories : O (présence) et N (absence). Pour chaque cas :<br>\n<code>OBSERVATION session=&lt;id&gt; OO=&lt;nombre&gt; ON=&lt;nombre&gt; NO=&lt;nombre&gt; NN=&lt;nombre&gt;</code>.<br>\nLa première lettre désigne le codage de l’observateur 1 (ligne), la seconde celui de l’observateur 2 (colonne). Les quatre effectifs sont entiers, positifs ou nuls, et leur somme $U$ est strictement positive.<br><br>\nCalculs :<br>\n- Accords $A = OO + NN$ et accord brut $P_0 = A / U$.<br>\n- Accord attendu à partir des marges : $P_e = [(OO+ON)(OO+NO) + (NO+NN)(ON+NN)] / U^2$.<br>\n- Si $P_e &lt; 1$, kappa non pondéré $\\kappa = (P_0 - P_e)/(1 - P_e)$ ; si $P_e = 1$, il est <code>INDEFINI</code>.<br>\n- Afficher $P_0$ et $P_e$ en pourcentage à une décimale, et le kappa à trois décimales.<br><br>\nUn accord brut élevé ne garantit ni objectivité ni absence d’ambiguïté. Le kappa dépend des marges et ne remplace pas l’examen des désaccords.<br><br>\nAfficher :<br>\n<code>ACCORD_OBSERVATEURS: {session} -> ACCORDS={A}/{U} ({P_0:.1f}%) | PE={P_e:.1f}% | KAPPA={kappa}</code></p>",
    starter: "# Grille d'analyse (eq3-c4-e3) — Grille d’observation comportementale et accord inter-observateurs\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Accord brut de 80%]\n# Données : OBSERVATION session=S2 OO=6 ON=1 NO=1 NN=2\nA_COMPLETER\n\n[Cas 2 — Accord brut de 90% et catégories rares]\n# Données : OBSERVATION session=S3 OO=90 ON=5 NO=5 NN=0\nA_COMPLETER\n\n[Cas 3 — Accord attendu égal à 100%]\n# Données : OBSERVATION session=S4 OO=10 ON=0 NO=0 NN=0\nA_COMPLETER\n",
    hints: [
      "Construire les marges du tableau et additionner les deux produits des proportions marginales correspondantes.",
      "Comparer l’accord brut à l’accord attendu ; si ce dernier vaut 1, le dénominateur du kappa est nul.",
      "Calculez Po (proportion d accords observés), puis Pe à partir des produits de fréquences marginales des deux observateurs, enfin kappa = (Po - Pe) / (1 - Pe)."
    ],
    examples: [
          {
                "stdin": "OBSERVATION session=S1 OO=4 ON=1 NO=1 NN=4",
                "expected": "ACCORD_OBSERVATEURS: S1 -> ACCORDS=8/10 (80.0%) | PE=50.0% | KAPPA=0.600",
                "note": "L’accord brut est de 80% ; les deux marges équilibrées donnent un accord attendu de 50%."
          }
    ],
    tests: [
          {
                "label": "Accord brut de 80%",
                "stdin": "cas:1",
                "expected": "ACCORD_OBSERVATEURS: S2 -> ACCORDS=8/10 (80.0%) | PE=58.0% | KAPPA=0.524"
          },
          {
                "label": "Accord brut de 90% et catégories rares",
                "stdin": "cas:2",
                "expected": "ACCORD_OBSERVATEURS: S3 -> ACCORDS=90/100 (90.0%) | PE=90.5% | KAPPA=-0.053"
          },
          {
                "label": "Accord attendu égal à 100%",
                "stdin": "cas:3",
                "expected": "ACCORD_OBSERVATEURS: S4 -> ACCORDS=10/10 (100.0%) | PE=100.0% | KAPPA=INDEFINI"
          }
    ],
    solution: "[Exemple]\nACCORD_OBSERVATEURS: S1 -> ACCORDS=8/10 (80.0%) | PE=50.0% | KAPPA=0.600\n\n[Cas 1 — Accord brut de 80%]\nACCORD_OBSERVATEURS: S2 -> ACCORDS=8/10 (80.0%) | PE=58.0% | KAPPA=0.524\n\n[Cas 2 — Accord brut de 90% et catégories rares]\nACCORD_OBSERVATEURS: S3 -> ACCORDS=90/100 (90.0%) | PE=90.5% | KAPPA=-0.053\n\n[Cas 3 — Accord attendu égal à 100%]\nACCORD_OBSERVATEURS: S4 -> ACCORDS=10/10 (100.0%) | PE=100.0% | KAPPA=INDEFINI\n",
    takeaway: "À retenir : Calculer l’accord brut et le kappa de Cohen non pondéré, puis en identifier les limites.\nRepère : L’accord brut est de 80% ; les deux marges équilibrées donnent un accord attendu de 50%."
  }
];
