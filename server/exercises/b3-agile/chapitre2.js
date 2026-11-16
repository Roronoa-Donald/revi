/**
 * chapitre2.js — Études de cas du cours « b3-agile ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    "id": "ag3-c2-e1",
    "chapter": 2,
    "level": "n1",
    "language": "analyse",
    "title": "Le sprint 12 de l'équipe mobile de BankPlus",
    "exampleTitle": "Exemple résolu — le sprint 5 de l'équipe web d'AssurVie",
    "goal": "Distinguer les responsabilités du Product Owner, du Scrum Master et des développeurs, et appliquer la Definition of Done.",
    "brief": "<p><strong>Énoncé.</strong> L'équipe mobile de BankPlus développe l'application bancaire du groupe. Elle compte sept personnes : Sarah, <strong>Product Owner</strong> ; Marc, <strong>Scrum Master</strong> ; et cinq développeurs. Elle travaille en sprints de deux semaines et vient de terminer le sprint 12, engagé pour 34 points.</p><p>La <strong>Definition of Done</strong> (DoD) de l'équipe comporte cinq critères : code revu par un pair, tests unitaires écrits, tests d'acceptation passés, documentation mise à jour, déployé en environnement de recette. À la fin du sprint, l'état de la story « Virement instantané » (8 points) est le suivant :</p><table><tr><th>Critère de la DoD</th><th>Atteint ?</th></tr><tr><th>Code revu par un pair</th><td>Oui</td></tr><tr><th>Tests unitaires écrits</th><td>Oui</td></tr><tr><th>Tests d'acceptation passés</th><td>Non (2 tests en échec)</td></tr><tr><th>Documentation mise à jour</th><td>Oui</td></tr><tr><th>Déployé en environnement de recette</th><td>Non</td></tr></table><p>Pour les questions 4 et 5, répondez par oui ou non.</p><ol><li>Qui est seul responsable de l'ordonnancement du Product Backlog et de la maximisation de la valeur du produit ? Répondez par le nom du rôle.</li><li>Combien de critères de la DoD ne sont pas atteints pour la story « Virement instantané » ?</li><li>Quel événement Scrum permet d'inspecter l'incrément avec les parties prenantes en fin de sprint ? Répondez par son nom.</li><li>La story « Virement instantané » peut-elle être comptée comme terminée dans la vélocité du sprint 12 ?</li><li>Le rôle de Marc consiste-t-il à assigner chaque tâche aux développeurs au quotidien ?</li><li>Dans quel artefact les éléments sélectionnés pour le sprint en cours sont-ils consignés ? Répondez par son nom.</li></ol>",
    "starter": "# Exercice — Le sprint 12 de l'équipe mobile de BankPlus\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 4 et 5 : répondez par oui ou non.\n\n[Question 1 — Responsable de l'ordonnancement du Product Backlog]\nA_COMPLETER\n\n[Question 2 — Critères de la DoD non atteints]\nA_COMPLETER\n\n[Question 3 — Événement d'inspection de l'incrément avec les parties prenantes]\nA_COMPLETER\n\n[Question 4 — La story compte-t-elle dans la vélocité ?]\nA_COMPLETER\n\n[Question 5 — Marc assigne-t-il les tâches au quotidien ?]\nA_COMPLETER\n\n[Question 6 — Artefact des éléments sélectionnés pour le sprint]\nA_COMPLETER\n",
    "hints": [
      "Le Scrum Guide sépare les pouvoirs : le PO arbitre le quoi (valeur), les développeurs organisent le comment, le Scrum Master sert le processus.",
      "Une story n'est « terminée » que si elle satisfait toute la DoD, critère par critère : un seul échec suffit à l'exclure de la vélocité.",
      "1. Relisez la répartition des rôles : qui arbitre la valeur, qui sert le processus, qui construit l'incrément. 2. Comptez les lignes « Non » du tableau. 3. Cherchez l'événement de fin de sprint ouvert aux parties prenantes. 4. La DoD s'applique en entier ou pas du tout. 5. Le Scrum Master facilite et lève les obstacles, il ne dirige pas. 6. Cherchez l'artefact qui porte le nom du sprint."
    ],
    "examples": [
      {
        "stdin": "L'équipe web d'AssurVie (Léa PO, Tom SM, 4 développeurs) termine le sprint 5.\nSa DoD : tests passés, revue de code, démo validée par le PO.\nLa story « Devis en ligne » (5 points) satisfait les trois critères ; la story « Import CSV » (3 points) n'a pas eu sa démo.\n\n1) Léa, la Product Owner, ordonne le Product Backlog.\n2) « Devis en ligne » : 0 critère en échec.\n3) « Import CSV » : 1 critère en échec, elle ne compte pas dans la vélocité.\n4) Tom facilite les événements mais n'assigne pas les tâches.",
        "expected": "le PO ordonne le backlog — « Devis en ligne » terminée — « Import CSV » exclue de la vélocité — le SM n'assigne pas",
        "note": "Une story n'entre dans la vélocité que si elle satisfait toute la DoD, critère par critère."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Responsable de l'ordonnancement du Product Backlog",
        "stdin": "q:1",
        "expected": "product owner||le product owner||po"
      },
      {
        "label": "Question 2 — Critères de la DoD non atteints",
        "stdin": "q:2",
        "expected": "2||2 critères||deux"
      },
      {
        "label": "Question 3 — Événement d'inspection de l'incrément avec les parties prenantes",
        "stdin": "q:3",
        "expected": "la sprint review||sprint review||la revue de sprint||revue de sprint"
      },
      {
        "label": "Question 4 — La story compte-t-elle dans la vélocité ?",
        "stdin": "q:4",
        "expected": "non"
      },
      {
        "label": "Question 5 — Marc assigne-t-il les tâches au quotidien ?",
        "stdin": "q:5",
        "expected": "non"
      },
      {
        "label": "Question 6 — Artefact des éléments sélectionnés pour le sprint",
        "stdin": "q:6",
        "expected": "le sprint backlog||sprint backlog||le backlog de sprint"
      }
    ],
    "solution": "[Question 1 — Responsable de l'ordonnancement du Product Backlog]\nproduct owner\n\n[Question 2 — Critères de la DoD non atteints]\n2\n\n[Question 3 — Événement d'inspection de l'incrément avec les parties prenantes]\nla sprint review\n\n[Question 4 — La story compte-t-elle dans la vélocité ?]\nnon\n\n[Question 5 — Marc assigne-t-il les tâches au quotidien ?]\nnon\n\n[Question 6 — Artefact des éléments sélectionnés pour le sprint]\nle sprint backlog",
    "takeaway": "1) C'est le Product Owner (Sarah) : seul responsable de l'ordonnancement du Product Backlog et de la maximisation de la valeur.\n2) Deux critères échouent : tests d'acceptation (2 en échec) et déploiement en recette.\n3) La Sprint Review (revue de sprint) inspecte l'incrément avec les parties prenantes en fin de sprint.\n4) Non : deux critères de la DoD ne sont pas atteints, la story n'est pas « terminée » et sort de la vélocité du sprint 12.\n5) Non : le Scrum Master facilite le processus et lève les obstacles ; les développeurs s'organisent seuls (auto-organisation).\n6) Les éléments sélectionnés pour le sprint forment le Sprint Backlog, engagement des développeurs pour le sprint.\nContrôle : 3 critères atteints + 2 en échec = 5 critères, la totalité de la DoD."
  },
  {
    "id": "ag3-c2-e2",
    "chapter": 2,
    "level": "n2",
    "language": "analyse",
    "title": "La priorisation MoSCoW du backlog d'AssuranceDirect",
    "exampleTitle": "Exemple résolu — la priorisation de la plateforme Modulo",
    "goal": "Prioriser un Product Backlog avec la méthode MoSCoW et départager les candidats par le rapport valeur/effort.",
    "brief": "<p><strong>Énoncé.</strong> La Product Owner d'AssuranceDirect, application d'assurance en ligne, prépare la version 2.0. Elle a noté chaque élément du backlog avec une <strong>valeur métier</strong> (sur 100) et un <strong>effort</strong> estimé en story points, puis l'a classé selon la méthode <strong>MoSCoW</strong> : Must have (indispensable à la version), Should have (important mais négociable), Could have (souhaitable), Won't have (volontairement exclu de cette version).</p><table><tr><th>ID</th><th>Élément</th><th>Valeur</th><th>Effort (points)</th><th>Classe MoSCoW</th></tr><tr><th>ST-01</th><td>Déclaration de sinistre en ligne</td><td>90</td><td>9</td><td>Must</td></tr><tr><th>ST-02</th><td>Paiement en trois fois</td><td>72</td><td>8</td><td>Should</td></tr><tr><th>ST-03</th><td>Mode sombre de l'interface</td><td>18</td><td>3</td><td>Could</td></tr><tr><th>ST-04</th><td>Conformité RGPD du formulaire</td><td>95</td><td>5</td><td>Must</td></tr><tr><th>ST-05</th><td>Chatbot de premier contact</td><td>39</td><td>13</td><td>Won't</td></tr><tr><th>ST-06</th><td>Espace client hors ligne</td><td>56</td><td>8</td><td>Should</td></tr></table><p>Le rapport valeur/effort d'un élément s'obtient en divisant sa valeur métier par son effort. Pour les questions 3, 4 et 5, répondez par l'identifiant (par exemple ST-09).</p><ol><li>Combien d'éléments sont classés Must have ?</li><li>Quel est le rapport valeur/effort de ST-04 ?</li><li>Quel élément présente le meilleur rapport valeur/effort ?</li><li>Le sprint 8 offre une capacité de 22 points. La PO retient d'abord tous les Must have, puis le Should au meilleur rapport valeur/effort qui entre dans la capacité restante. Quel élément ajoute-t-elle ?</li><li>Quel élément la PO a-t-elle volontairement exclu de la version 2.0 ?</li><li>Quelle est la valeur métier totale des éléments Must have ?</li></ol>",
    "starter": "# Exercice — La priorisation MoSCoW du backlog d'AssuranceDirect\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 3, 4 et 5 : répondez par l'identifiant (par exemple ST-09).\n\n[Question 1 — Nombre d'éléments Must have]\nA_COMPLETER\n\n[Question 2 — Rapport valeur/effort de ST-04]\nA_COMPLETER\n\n[Question 3 — Meilleur rapport valeur/effort]\nA_COMPLETER\n\n[Question 4 — Should ajouté au sprint 8]\nA_COMPLETER\n\n[Question 5 — Élément exclu de la version 2.0]\nA_COMPLETER\n\n[Question 6 — Valeur métier totale des Must have]\nA_COMPLETER\n",
    "hints": [
      "La catégorie MoSCoW commande la priorité : un Must passe toujours avant un Should, même moins bien noté.",
      "Au sein d'une même catégorie, le rapport valeur/effort départage les candidats : valeur divisée par effort.",
      "1. Comptez les lignes Must du tableau. 2. Rapport de ST-04 : 95 / 5. 3. Calculez les six rapports et prenez le maximum. 4. Retirez d'abord l'effort des Must de la capacité, puis comparez les rapports des deux Should. 5. Cherchez la ligne Won't. 6. Additionnez les valeurs des Must."
    ],
    "examples": [
      {
        "stdin": "La plateforme de cours Modulo prépare une version. Backlog :\nEL-1 Notifications e-mail, valeur 60, effort 5, Must.\nEL-2 Recherche plein texte, valeur 48, effort 6, Should.\nEL-3 Thème personnalisable, valeur 10, effort 5, Could.\n\n1) Un seul Must : EL-1.\n2) Rapport de EL-1 : 60 / 5 = 12.\n3) Meilleur rapport : EL-1 (12, contre 8 pour EL-2 et 2 pour EL-3).\n4) Valeur totale des Must : 60.",
        "expected": "1 Must — rapport de EL-1 : 12 — meilleur rapport : EL-1 — valeur des Must : 60",
        "note": "Le rapport valeur/effort départage les éléments d'une même catégorie, mais un Must have reste prioritaire sur un Should, même mieux noté."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre d'éléments Must have",
        "stdin": "q:1",
        "expected": "2||2 éléments||deux"
      },
      {
        "label": "Question 2 — Rapport valeur/effort de ST-04",
        "stdin": "q:2",
        "expected": "19"
      },
      {
        "label": "Question 3 — Meilleur rapport valeur/effort",
        "stdin": "q:3",
        "expected": "st-04||ST-04"
      },
      {
        "label": "Question 4 — Should ajouté au sprint 8",
        "stdin": "q:4",
        "expected": "st-02||ST-02"
      },
      {
        "label": "Question 5 — Élément exclu de la version 2.0",
        "stdin": "q:5",
        "expected": "st-05||ST-05"
      },
      {
        "label": "Question 6 — Valeur métier totale des Must have",
        "stdin": "q:6",
        "expected": "185"
      }
    ],
    "solution": "[Question 1 — Nombre d'éléments Must have]\n2\n\n[Question 2 — Rapport valeur/effort de ST-04]\n19\n\n[Question 3 — Meilleur rapport valeur/effort]\nst-04\n\n[Question 4 — Should ajouté au sprint 8]\nst-02\n\n[Question 5 — Élément exclu de la version 2.0]\nst-05\n\n[Question 6 — Valeur métier totale des Must have]\n185",
    "takeaway": "1) Deux éléments sont classés Must : ST-01 et ST-04.\n2) Rapport de ST-04 : 95 / 5 = 19.\n3) Rapports : ST-01 : 10 ; ST-02 : 9 ; ST-03 : 6 ; ST-04 : 19 ; ST-05 : 3 ; ST-06 : 7. Le meilleur est ST-04 (19).\n4) Les Must pèsent 9 + 5 = 14 points ; il reste 22 − 14 = 8 points. Entre les Should, ST-02 (72/8 = 9) bat ST-06 (56/8 = 7) et son effort de 8 points entre exactement : la PO ajoute ST-02.\n5) ST-05 (chatbot) est classé Won't : volontairement exclu de la version 2.0.\n6) Valeur des Must : 90 + 95 = 185.\nContrôle : 14 points de Must + 8 points de ST-02 = 22 points, exactement la capacité du sprint 8."
  },
  {
    "id": "ag3-c2-e3",
    "chapter": 2,
    "level": "n3",
    "language": "analyse",
    "title": "L'audit des timeboxes du sprint 7 de MediaStream",
    "exampleTitle": "Exemple résolu — l'audit du sprint 3 de Cybershop",
    "goal": "Contrôler la durée des événements Scrum par rapport aux timeboxes maximales du Scrum Guide pour un sprint de deux semaines.",
    "brief": "<p><strong>Énoncé.</strong> MediaStream, plateforme de vidéo à la demande, organise ses développements en sprints de <strong>deux semaines</strong>. Un coach Scrum audite la tenue des événements du sprint 7 et relève :</p><table><tr><th>Événement</th><th>Durée relevée</th></tr><tr><th>Sprint Planning</th><td>3 h 30</td></tr><tr><th>Daily Scrum</th><td>20 minutes</td></tr><tr><th>Sprint Review</th><td>1 h 30</td></tr><tr><th>Sprint Retrospective</th><td>1 h 45</td></tr></table><p>Timeboxes maximales du cours pour un sprint de deux semaines : Sprint Planning <strong>4 heures</strong> ; Daily Scrum <strong>15 minutes</strong>, quelle que soit la durée du sprint ; Sprint Review <strong>2 heures</strong> ; Sprint Retrospective <strong>90 minutes</strong> (45 minutes par semaine de sprint).</p><p>Pour les questions 1 à 4, répondez par le mot : conforme ou dépassée.</p><ol><li>Le Sprint Planning respecte-t-il sa timebox ?</li><li>Le Daily Scrum respecte-t-il sa timebox ?</li><li>La Sprint Review respecte-t-elle sa timebox ?</li><li>La Sprint Retrospective respecte-t-elle sa timebox ?</li><li>De combien de minutes la cérémonie la plus hors timebox dépasse-t-elle sa limite ?</li><li>Le sprint 8 durera exceptionnellement quatre semaines. Quelle sera, en heures, la timebox maximale de sa Sprint Review ?</li></ol>",
    "starter": "# Exercice — L'audit des timeboxes du sprint 7 de MediaStream\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 4 : répondez par conforme ou dépassée.\n\n[Question 1 — Timebox du Sprint Planning]\nA_COMPLETER\n\n[Question 2 — Timebox du Daily Scrum]\nA_COMPLETER\n\n[Question 3 — Timebox de la Sprint Review]\nA_COMPLETER\n\n[Question 4 — Timebox de la Sprint Retrospective]\nA_COMPLETER\n\n[Question 5 — Dépassement maximal, en minutes]\nA_COMPLETER\n\n[Question 6 — Timebox de la Review d'un sprint de 4 semaines, en heures]\nA_COMPLETER\n",
    "hints": [
      "Une timebox est un maximum, pas une cible : atteindre exactement la limite reste conforme.",
      "Le Daily est le seul événement à timebox fixe (15 minutes) ; les autres se calculent au prorata des semaines de sprint.",
      "1. Planning : comparez 3 h 30 à 4 h. 2. Daily : 20 min contre 15 min. 3. Review : 1 h 30 contre 2 h. 4. Rétrospective : 1 h 45 = 105 min contre 90 min. 5. Cherchez le plus grand écart positif en minutes. 6. Review = 1 heure par semaine de sprint."
    ],
    "examples": [
      {
        "stdin": "Cybershop, sprint de 2 semaines, relève : Planning 4 h 30, Daily 15 min,\nReview 2 h, Rétrospective 80 min.\n\n1) Planning : 4 h 30 > 4 h : dépassée de 30 minutes.\n2) Daily : 15 min ≤ 15 min : conforme.\n3) Review : 2 h ≤ 2 h : conforme (à la limite exacte).\n4) Rétrospective : 80 min ≤ 90 min : conforme.\n5) Pour un sprint de 4 semaines, la Review monterait à 4 heures.",
        "expected": "Planning dépassée de 30 min — Daily, Review et Rétrospective conformes — Review d'un sprint de 4 semaines : 4 heures",
        "note": "Une timebox est un plafond, pas un objectif : tomber exactement sur la limite reste conforme."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Timebox du Sprint Planning",
        "stdin": "q:1",
        "expected": "conforme"
      },
      {
        "label": "Question 2 — Timebox du Daily Scrum",
        "stdin": "q:2",
        "expected": "dépassée||depassee"
      },
      {
        "label": "Question 3 — Timebox de la Sprint Review",
        "stdin": "q:3",
        "expected": "conforme"
      },
      {
        "label": "Question 4 — Timebox de la Sprint Retrospective",
        "stdin": "q:4",
        "expected": "dépassée||depassee"
      },
      {
        "label": "Question 5 — Dépassement maximal, en minutes",
        "stdin": "q:5",
        "expected": "15||15 minutes"
      },
      {
        "label": "Question 6 — Timebox de la Review d'un sprint de 4 semaines, en heures",
        "stdin": "q:6",
        "expected": "4||4 heures"
      }
    ],
    "solution": "[Question 1 — Timebox du Sprint Planning]\nconforme\n\n[Question 2 — Timebox du Daily Scrum]\ndépassée\n\n[Question 3 — Timebox de la Sprint Review]\nconforme\n\n[Question 4 — Timebox de la Sprint Retrospective]\ndépassée\n\n[Question 5 — Dépassement maximal, en minutes]\n15\n\n[Question 6 — Timebox de la Review d'un sprint de 4 semaines, en heures]\n4",
    "takeaway": "1) Sprint Planning : 3 h 30 ≤ 4 h : conforme.\n2) Daily Scrum : 20 min > 15 min : dépassée (de 5 minutes).\n3) Sprint Review : 1 h 30 ≤ 2 h : conforme.\n4) Sprint Retrospective : 1 h 45 = 105 min > 90 min : dépassée (de 15 minutes).\n5) Le plus grand dépassement est celui de la rétrospective : 105 − 90 = 15 minutes (contre 5 pour le Daily).\n6) La Sprint Review est timeboxée à 1 heure par semaine de sprint : 4 semaines donnent 4 heures.\nContrôle : seuls deux événements sur quatre respectent leur timebox ; la rétrospective, seule cérémonie dépassée de plus de 10 minutes, est la première à recadrer."
  }
];
