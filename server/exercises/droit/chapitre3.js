/**
 * chapitre3.js — Études de cas du cours « droit ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    "id": "dr2-c3-e1",
    "chapter": 3,
    "level": "n2",
    "language": "analyse",
    "title": "Les enseignements de l'affaire Cambridge Analytica",
    "exampleTitle": "Exemple résolu — l'application QuiZAmi",
    "goal": "Dater l'affaire, mesurer son ampleur et nommer les griefs juridiques du cours.",
    "brief": "<p><strong>Énoncé.</strong> De 2013 à 2014, le chercheur Aleksandr Kogan crée l'application « thisisyourdigitallife » : environ 270 000 utilisateurs rémunérés y répondent, et l'application récolte aussi les données de leurs amis. Le fichier cédé à Cambridge Analytica atteint ainsi jusqu'à <strong>87 millions de profils</strong>, utilisés pour profiler les électeurs américains de la campagne de 2016. En <strong>mars 2018</strong>, les révélations de la presse (The Observer, The Guardian) et du lanceur d'alerte Christopher Wylie éclatent au grand jour. En <strong>juillet 2019</strong>, la Federal Trade Commission inflige à Facebook une amende de <strong>5 milliards de dollars</strong> ; au Royaume-Uni, l'Information Commissioner's Office condamne à 500 000 livres, le maximum autorisé par la loi britannique de l'époque.</p><p>Rappel du cours : trois griefs se dégagent — l'utilisation non autorisée des données personnelles, la manipulation électorale par profilage, le non-respect de la transparence et du consentement.</p><p>Répondez par le nombre seul (par exemple 87) pour les questions chiffrées ; par le mot exact attendu pour les autres questions.</p><ol><li>En quelle année le scandale a-t-il été révélé ?</li><li>Combien de profils, au maximum, ont été collectés (en millions) ?</li><li>Comment se nomme le grief consistant à utiliser les données pour influencer une élection par profilage ?</li><li>Comment se nomme le grief consistant à utiliser les données sans l'accord des personnes ?</li><li>Quel est le montant de l'amende infligée à Facebook par la FTC, en milliards de dollars ?</li></ol>",
    "starter": "# Exercice — Les enseignements de l'affaire Cambridge Analytica\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions chiffrées : le nombre seul. Autres questions : le mot exact attendu.\n\n[Question 1 — Année de la révélation du scandale]\nA_COMPLETER\n\n[Question 2 — Profils collectés (en millions)]\nA_COMPLETER\n\n[Question 3 — Grief : influencer une élection]\nA_COMPLETER\n\n[Question 4 — Grief : données sans accord des personnes]\nA_COMPLETER\n\n[Question 5 — Amende de la FTC (en milliards de dollars)]\nA_COMPLETER\n",
    "hints": [
      "L'affaire illustre ce qu'un usage détourné des données peut faire à la vie démocratique : le droit du numérique protège aussi les élections.",
      "Cherchez chaque date et chaque montant dans l'énoncé : la révélation précède de quinze mois la sanction américaine.",
      "1. La révélation est le fait de presse de mars 2018. 2. Le maximum collecté est donné en millions de profils. 3. Le profilage à visée électorale porte un nom dans les griefs du cours. 4. L'usage sans accord se nomme par sa formule du cours. 5. L'amende américaine est en milliards de dollars."
    ],
    "examples": [
      {
        "stdin": "Une affaire analogue : l'application « QuiZAmi » a récolté 2 millions de profils sans accord des personnes pour cibler des publicités politiques ; révélée en 2021, elle a valu à son éditeur une amende de 3 millions d'euros.\n\n1) Année de la révélation : 2021.\n2) Profils collectés : 2 millions.\n3) Grief électoral : manipulation électorale par profilage.\n4) Grief d'usage : utilisation non autorisée des données.\n5) Amende : 3 millions d'euros.",
        "expected": "2021 — 2 millions de profils — manipulation électorale par profilage — utilisation non autorisée — amende de 3 millions d'euros",
        "note": "Une donnée cédée pour un usage devient un instrument de pouvoir : le droit du numérique ne protège pas seulement la vie privée, il protège la vie démocratique."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Année de la révélation du scandale",
        "stdin": "q:1",
        "expected": "2018"
      },
      {
        "label": "Question 2 — Profils collectés (en millions)",
        "stdin": "q:2",
        "expected": "87||87 millions||87 millions de profils"
      },
      {
        "label": "Question 3 — Grief : influencer une élection",
        "stdin": "q:3",
        "expected": "manipulation électorale||la manipulation électorale par profilage||manipulation électorale par profilage"
      },
      {
        "label": "Question 4 — Grief : données sans accord des personnes",
        "stdin": "q:4",
        "expected": "utilisation non autorisée||l'utilisation non autorisée||utilisation non autorisée des données"
      },
      {
        "label": "Question 5 — Amende de la FTC (en milliards de dollars)",
        "stdin": "q:5",
        "expected": "5||5 milliards||cinq milliards||5 milliards de dollars||cinq milliards de dollars"
      }
    ],
    "solution": "[Question 1 — Année de la révélation du scandale]\n2018\n\n[Question 2 — Profils collectés (en millions)]\n87\n\n[Question 3 — Grief : influencer une élection]\nmanipulation électorale\n\n[Question 4 — Grief : données sans accord des personnes]\nutilisation non autorisée\n\n[Question 5 — Amende de la FTC (en milliards de dollars)]\n5",
    "takeaway": "1) Les révélations de The Observer et The Guardian datent de mars 2018.\n2) Le fichier cédé atteignait jusqu'à 87 millions de profils.\n3) L'usage des données pour influencer l'élection de 2016 est la manipulation électorale par profilage.\n4) Prélever les données de personnes qui n'ont rien consenti est l'utilisation non autorisée.\n5) La FTC a infligé en juillet 2019 une amende de 5 milliards de dollars ; la condamnation britannique, 500 000 livres, était le plafond de la loi d'alors.\nContrôle : 87 millions de profils pour environ 270 000 répondants — plus de 300 personnes touchées pour un seul utilisateur actif, d'où l'ampleur du scandale."
  },
  {
    "id": "dr2-c3-e2",
    "chapter": 3,
    "level": "n1",
    "language": "analyse",
    "title": "La page d'information de la ville de Sokodé",
    "exampleTitle": "Exemple résolu — le forum du lycée des Palmiers",
    "goal": "Qualifier les contenus illicites d'une page réelle et rappeler la limite de la modération.",
    "brief": "<p><strong>Énoncé.</strong> La mairie de Sokodé anime une page d'information suivie par des milliers d'habitants. Samedi dernier, la page a enregistré trois incidents : (a) un compte anonyme publie trois messages appelant à la haine contre une communauté ; (b) une rumeur prétend que le pont de la route nationale s'est effondré pendant la nuit, information fausse qui affole les habitants ; (c) un commentaire anonyme accuse à tort le maire de détournement de crédits municipaux. L'avocat de la mairie rappelle qu'hors les cas prévus par la loi, le blocage et le filtrage des contenus constituent une restriction à la liberté d'expression.</p><p>Rappel du cours : les défis juridiques du numérique incluent le partage de discours de haine, la diffusion de fausses informations et les déclarations diffamatoires ; une régulation trop large servirait à étouffer la critique légitime.</p><p>Répondez par le mot exact attendu (deux à trois mots au plus).</p><ol><li>Les trois messages appelant à la haine contre une communauté posent quel défi ?</li><li>La rumeur du pont effondré pose quel défi ?</li><li>L'accusation mensongère contre le maire pose quel défi ?</li><li>Hors les cas prévus par la loi, le blocage systématique des contenus est-il permis ?</li><li>Quel droit fondamental est en tension avec la lutte contre ces contenus ?</li></ol>",
    "starter": "# Exercice — La page d'information de la ville de Sokodé\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par le mot exact attendu, en trois mots au plus.\n\n[Question 1 — Les messages contre une communauté]\nA_COMPLETER\n\n[Question 2 — La rumeur du pont effondré]\nA_COMPLETER\n\n[Question 3 — L'accusation mensongère contre le maire]\nA_COMPLETER\n\n[Question 4 — Le blocage systématique des contenus]\nA_COMPLETER\n\n[Question 5 — Droit en tension]\nA_COMPLETER\n",
    "hints": [
      "Chaque incident correspond à un défi nommé dans le cours : haine, fausses informations, diffamation.",
      "La modération vise les activités véritablement criminelles : au-delà, elle devient une restriction à un droit fondamental.",
      "1. Un appel à la haine contre un groupe est le défi nommé dans le cours. 2. Une information fausse diffusée en masse porte le nom du cours. 3. Une accusation mensongère contre une personne nommée se qualifie précisément. 4. Relisez la phrase de l'avocat. 5. Nommez le droit qui protège aussi la critique en ligne."
    ],
    "examples": [
      {
        "stdin": "Le forum du lycée des Palmiers a enregistré : un compte anonyme insultant une communauté religieuse ; une fausse alerte annonçant la fermeture de l'internat ; une élève accusée à tort de vol par un autre internaute.\n\n1) Contre la communauté : discours de haine.\n2) La fausse alerte : fausses informations.\n3) L'accusation : diffamation.\n4) Blocage systématique : non.\n5) Droit en tension : la liberté d'expression.",
        "expected": "discours de haine — fausses informations — diffamation — blocage : non — liberté d'expression",
        "note": "La bonne régulation vise les activités véritablement criminelles, pas l'expression légitime : modérer sans détruire la liberté d'expression."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Les messages contre une communauté",
        "stdin": "q:1",
        "expected": "discours de haine||le discours de haine||le partage de discours de haine"
      },
      {
        "label": "Question 2 — La rumeur du pont effondré",
        "stdin": "q:2",
        "expected": "fausses informations||la diffusion de fausses informations||fausses nouvelles||fake news"
      },
      {
        "label": "Question 3 — L'accusation mensongère contre le maire",
        "stdin": "q:3",
        "expected": "diffamation||la diffamation||les déclarations diffamatoires"
      },
      {
        "label": "Question 4 — Le blocage systématique des contenus",
        "stdin": "q:4",
        "expected": "non"
      },
      {
        "label": "Question 5 — Droit en tension",
        "stdin": "q:5",
        "expected": "la liberté d'expression||liberté d'expression||la liberté d'expression en ligne"
      }
    ],
    "solution": "[Question 1 — Les messages contre une communauté]\ndiscours de haine\n\n[Question 2 — La rumeur du pont effondré]\nfausses informations\n\n[Question 3 — L'accusation mensongère contre le maire]\ndiffamation\n\n[Question 4 — Le blocage systématique des contenus]\nnon\n\n[Question 5 — Droit en tension]\nla liberté d'expression",
    "takeaway": "1) Appeler à la haine contre une communauté relève du partage de discours de haine.\n2) La rumeur du pont effondré est une fausse information diffusée en ligne.\n3) Accuser à tort le maire, par un compte anonyme, est une déclaration diffamatoire.\n4) Non : hors les cas prévus par la loi, le blocage et le filtrage constituent une restriction à la liberté d'expression.\n5) Le droit en tension est la liberté d'expression — la même qui protège la critique légitime.\nContrôle : les trois défis du cours (haine, fausses informations, diffamation) se retrouvent un à un dans les incidents (a), (b) et (c)."
  },
  {
    "id": "dr2-c3-e3",
    "chapter": 3,
    "level": "n2",
    "language": "analyse",
    "title": "Le bilan de l'agence Vibration",
    "exampleTitle": "Exemple résolu — le bilan du centre d'appels TéléContact",
    "goal": "Nommer les dépendances numériques d'une enquête interne et en faire le bilan chiffré.",
    "brief": "<p><strong>Énoncé.</strong> L'agence de communication digitale Vibration, forte de 45 collaborateurs, mène le 3 avril 2025 une enquête interne sur le rapport de chacun à son téléphone. Un collaborateur pouvant citer plusieurs dépendances, le bilan recense : <strong>12 collaborateurs</strong> redoutent d'être séparés de leur téléphone ; <strong>9</strong> craignent de rater une information ; <strong>7</strong> sentent leur téléphone vibrer alors qu'il ne vibre pas ; <strong>5</strong> publient compulsivement leur image. Le médecin du travail s'inquiète : ces dépendances peuvent conduire à une incapacité à agir en cas de défaillance partielle ou totale des systèmes.</p><p>Rappel du cours : la nomophobie est la peur de se retrouver sans son téléphone ; le FOMO est la peur de rater une information ; le syndrome des vibrations fantômes fait croire que le téléphone vibre ; le selfitisme est le besoin compulsif de partager son image.</p><p>Répondez par le nombre seul pour les questions chiffrées ; par le mot exact attendu pour les autres questions.</p><ol><li>La peur d'être séparé de son téléphone porte quel nom ?</li><li>La peur de rater une information porte quel nom ?</li><li>Sentir des vibrations inexistantes porte quel nom ?</li><li>Le besoin compulsif de partager son image porte quel nom ?</li><li>Combien de collaborateurs déclarent la nomophobie ?</li><li>Combien de dépendances, en tout, l'enquête recense-t-elle ?</li></ol>",
    "starter": "# Exercice — Le bilan de l'agence Vibration\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions chiffrées : le nombre seul. Autres questions : le mot exact attendu.\n\n[Question 1 — Peur d'être séparé de son téléphone]\nA_COMPLETER\n\n[Question 2 — Peur de rater une information]\nA_COMPLETER\n\n[Question 3 — Vibrations ressenties sans vibration]\nA_COMPLETER\n\n[Question 4 — Besoin compulsif de partager son image]\nA_COMPLETER\n\n[Question 5 — Nomophobie déclarée (nombre de collaborateurs)]\nA_COMPLETER\n\n[Question 6 — Total des dépendances recensées]\nA_COMPLETER\n",
    "hints": [
      "Chaque dépendance du cours a un nom précis : nomophobie, FOMO, vibrations fantômes, selfitisme — les symptômes de l'énoncé s'y retrouvent un à un.",
      "Le total des dépendances s'obtient en additionnant les quatre effectifs, puisque un collaborateur peut en citer plusieurs.",
      "1. La peur de la séparation du téléphone se nomme dans le rappel. 2. La peur de manquer une information aussi. 3. La vibration imaginaire a son syndrome. 4. L'autoportrait partagé compulsivement a le sien. 5. Relisez l'effectif de la première ligne. 6. Additionnez 12, 9, 7 et 5."
    ],
    "examples": [
      {
        "stdin": "Le centre d'appels TéléContact (40 téléconseillers) recense : 15 nomophobie ; 8 FOMO ; 6 vibrations fantômes ; 3 selfitisme.\n\n1) La peur d'être séparé du téléphone : nomophobie.\n2) La peur de rater une information : FOMO.\n3) Les vibrations imaginaires : syndrome des vibrations fantômes.\n4) Le partage d'image compulsif : selfitisme.\n5) Nomophobie déclarée : 15.\n6) Total : 15 + 8 + 6 + 3 = 32.",
        "expected": "nomophobie — FOMO — vibrations fantômes — selfitisme — 15 nomophobes — 32 dépendances au total",
        "note": "Ces dépendances peuvent conduire à une incapacité à agir en cas de défaillance des systèmes : un défi pour les personnes comme pour l'entreprise."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Peur d'être séparé de son téléphone",
        "stdin": "q:1",
        "expected": "nomophobie||la nomophobie"
      },
      {
        "label": "Question 2 — Peur de rater une information",
        "stdin": "q:2",
        "expected": "FOMO||le FOMO||fomo||la peur de rater une information"
      },
      {
        "label": "Question 3 — Vibrations ressenties sans vibration",
        "stdin": "q:3",
        "expected": "syndrome des vibrations fantômes||le syndrome des vibrations fantômes||vibrations fantômes"
      },
      {
        "label": "Question 4 — Besoin compulsif de partager son image",
        "stdin": "q:4",
        "expected": "selfitisme||le selfitisme"
      },
      {
        "label": "Question 5 — Nomophobie déclarée (nombre de collaborateurs)",
        "stdin": "q:5",
        "expected": "12"
      },
      {
        "label": "Question 6 — Total des dépendances recensées",
        "stdin": "q:6",
        "expected": "33"
      }
    ],
    "solution": "[Question 1 — Peur d'être séparé de son téléphone]\nnomophobie\n\n[Question 2 — Peur de rater une information]\nFOMO\n\n[Question 3 — Vibrations ressenties sans vibration]\nsyndrome des vibrations fantômes\n\n[Question 4 — Besoin compulsif de partager son image]\nselfitisme\n\n[Question 5 — Nomophobie déclarée (nombre de collaborateurs)]\n12\n\n[Question 6 — Total des dépendances recensées]\n33",
    "takeaway": "1) La peur d'être séparé de son téléphone est la nomophobie.\n2) La peur de rater une information est le FOMO.\n3) Sentir son téléphone vibrer sans qu'il vibre est le syndrome des vibrations fantômes.\n4) Le besoin compulsif de partager son image est le selfitisme.\n5) La nomophobie est déclarée par 12 collaborateurs.\n6) Total : 12 + 9 + 7 + 5 = 33 dépendances recensées.\nContrôle : 33 dépendances pour 45 collaborateurs, soit près de trois quarts de l'effectif touché au moins une fois ; un collaborateur pouvant citer plusieurs dépendances, le total peut dépasser l'effectif."
  }
];
