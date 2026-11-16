/**
 * chapitre1.js — Études de cas du cours « b3-agile ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    "id": "ag3-c1-e1",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "Le dépassement du projet ERP de Textilia",
    "exampleTitle": "Exemple résolu — le portail des médiathèques de Rivage",
    "goal": "Mesurer la dérive budgétaire et calendaire d'un projet prédictif à l'aide du triangle de fer.",
    "brief": "<p><strong>Énoncé.</strong> Textilia, entreprise industrielle de 450 salariés spécialisée dans les tissus techniques, a lancé il y a un an le déploiement d'un ERP en cycle en cascade. Le contrat de cadrage signé au départ portait trois engagements : un <strong>périmètre</strong> de 120 exigences validées, un <strong>budget</strong> de 240 000 € et un <strong>délai</strong> de 40 semaines.</p><p>Le projet vient de se terminer et le bilan présenté au comité de direction est le suivant :</p><table><tr><th>Indicateur</th><th>Engagé</th><th>Réalisé</th></tr><tr><th>Budget</th><td>240 000 €</td><td>312 000 €</td></tr><tr><th>Délai</th><td>40 semaines</td><td>52 semaines</td></tr><tr><th>Périmètre livré</th><td>120 exigences</td><td>96 exigences</td></tr></table><p>Répondez par le nombre seul, sans unité ni symbole (par exemple 72000), sauf pour la question 5 qui appelle un mot.</p><ol><li>Quel est l'écart budgétaire absolu du projet, en euros ?</li><li>Quel est l'écart budgétaire relatif, en pourcentage du budget engagé (arrondi à l'unité) ?</li><li>Quelle est la dérive calendaire, en semaines ?</li><li>Combien d'exigences du périmètre engagé n'ont pas été livrées ?</li><li>En méthode prédictive, quel sommet du triangle de fer le cahier des charges fige-t-il dès la phase de cadrage, ce qui reporte les dérives sur les deux autres sommets ?</li></ol>",
    "starter": "# Exercice — Le dépassement du projet ERP de Textilia\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 4 : le nombre seul, sans unité ni symbole. Question 5 : un mot.\n\n[Question 1 — Écart budgétaire absolu (en €)]\nA_COMPLETER\n\n[Question 2 — Écart budgétaire relatif (en %)]\nA_COMPLETER\n\n[Question 3 — Dérive calendaire (en semaines)]\nA_COMPLETER\n\n[Question 4 — Exigences non livrées]\nA_COMPLETER\n\n[Question 5 — Sommet du triangle de fer figé en méthode prédictive]\nA_COMPLETER\n",
    "hints": [
      "Le triangle de fer relie périmètre, coût et délai : quand l'un des trois bouge, la dérive se reporte sur les deux autres.",
      "L'écart relatif s'obtient en divisant l'écart absolu par la valeur engagée, puis en multipliant par 100.",
      "1. Écart budgétaire = réalisé − engagé. 2. Pourcentage = écart / engagé × 100. 3. Dérive calendaire = semaines réelles − semaines prévues. 4. Exigences manquantes = engagées − livrées. 5. Demandez-vous quel sommet est contractualisé avant tout développement."
    ],
    "examples": [
      {
        "stdin": "La ville de Rivage a déployé un portail des médiathèques en cycle en cascade.\nEngagé : 150 000 €, 30 semaines, 60 exigences.\nRéalisé : 180 000 €, 36 semaines, 54 exigences livrées.\n\n1) Écart budgétaire : 180 000 − 150 000 = 30 000 €.\n2) Écart relatif : 30 000 / 150 000 × 100 = 20 %.\n3) Dérive calendaire : 36 − 30 = 6 semaines.\n4) Exigences non livrées : 60 − 54 = 6.\n5) Le périmètre était figé par le cahier des charges.",
        "expected": "écart budgétaire 30 000 € — 20 % — 6 semaines de dérive — 6 exigences non livrées — le périmètre figé",
        "note": "Le contrat ayant figé le périmètre, les dérives se sont reportées sur le budget et le délai : c'est la limite du triangle de fer prédictif."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Écart budgétaire absolu (en €)",
        "stdin": "q:1",
        "expected": "72000||72 000"
      },
      {
        "label": "Question 2 — Écart budgétaire relatif (en %)",
        "stdin": "q:2",
        "expected": "30||30 %||30%"
      },
      {
        "label": "Question 3 — Dérive calendaire (en semaines)",
        "stdin": "q:3",
        "expected": "12||12 semaines"
      },
      {
        "label": "Question 4 — Exigences non livrées",
        "stdin": "q:4",
        "expected": "24||24 exigences"
      },
      {
        "label": "Question 5 — Sommet du triangle de fer figé en méthode prédictive",
        "stdin": "q:5",
        "expected": "le périmètre||périmètre||le scope||scope"
      }
    ],
    "solution": "[Question 1 — Écart budgétaire absolu (en €)]\n72000\n\n[Question 2 — Écart budgétaire relatif (en %)]\n30\n\n[Question 3 — Dérive calendaire (en semaines)]\n12\n\n[Question 4 — Exigences non livrées]\n24\n\n[Question 5 — Sommet du triangle de fer figé en méthode prédictive]\nle périmètre",
    "takeaway": "1) Écart budgétaire : 312 000 − 240 000 = 72 000 €.\n2) Écart relatif : 72 000 / 240 000 × 100 = 30 % du budget engagé.\n3) Dérive calendaire : 52 − 40 = 12 semaines.\n4) Exigences non livrées : 120 − 96 = 24.\n5) En cycle en cascade, le cahier des charges fige le périmètre : les dérives se reportent alors sur le coût et le délai.\nContrôle : 96 exigences livrées + 24 non livrées = 120 exigences engagées ; 40 semaines + 12 = 52 semaines réelles."
  },
  {
    "id": "ag3-c1-e2",
    "chapter": 1,
    "level": "n2",
    "language": "analyse",
    "title": "Le réseau PERT du portail de réservation de TransVoyages",
    "exampleTitle": "Exemple résolu — le réseau PERT de l'application AquaFit",
    "goal": "Calculer les dates au plus tôt (ES et EF) des tâches d'un réseau PERT et déterminer le chemin critique.",
    "brief": "<p><strong>Énoncé.</strong> TransVoyages, compagnie de bus interurbains, refond son portail de réservation en ligne avec une démarche séquentielle. Avant de lancer le développement, la cheffe de projet construit le réseau PERT du projet, qui compte cinq tâches :</p><table><tr><th>Tâche</th><th>Description</th><th>Durée (jours)</th><th>Prédécesseurs</th></tr><tr><th>A</th><td>Cadrage et cahier des charges</td><td>5</td><td>—</td></tr><tr><th>B</th><td>Conception de la base de données</td><td>8</td><td>A</td></tr><tr><th>C</th><td>Développement de l'interface</td><td>12</td><td>A</td></tr><tr><th>D</th><td>Intégration du module de paiement</td><td>6</td><td>B</td></tr><tr><th>E</th><td>Recette fonctionnelle</td><td>4</td><td>C, D</td></tr></table><p>Rappel : la date de début au plus tôt (ES) d'une tâche sans prédécesseur vaut 0 ; sinon ES = maximum des dates de fin au plus tôt (EF) de ses prédécesseurs, et EF = ES + durée.</p><p>Répondez par le nombre seul en jours ; pour la question 5, écrivez la séquence des tâches au format A,B,D,E.</p><ol><li>Quelle est la date de fin au plus tôt (EF) de la tâche A ?</li><li>Quelle est la date de début au plus tôt (ES) de la tâche D ?</li><li>Quelle est la date de début au plus tôt (ES) de la tâche E ?</li><li>Quelle est la durée minimale du projet, en jours ?</li><li>Quel est le chemin critique du projet ?</li></ol>",
    "starter": "# Exercice — Le réseau PERT du portail de réservation de TransVoyages\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 4 : le nombre seul. Question 5 : la séquence au format A,B,D,E.\n\n[Question 1 — Date de fin au plus tôt (EF) de la tâche A]\nA_COMPLETER\n\n[Question 2 — Date de début au plus tôt (ES) de la tâche D]\nA_COMPLETER\n\n[Question 3 — Date de début au plus tôt (ES) de la tâche E]\nA_COMPLETER\n\n[Question 4 — Durée minimale du projet (en jours)]\nA_COMPLETER\n\n[Question 5 — Chemin critique]\nA_COMPLETER\n",
    "hints": [
      "Parcourez le réseau dans l'ordre : une tâche ne démarre au plus tôt que lorsque tous ses prédécesseurs sont terminés.",
      "Pour une tâche à plusieurs prédécesseurs, ES est le maximum des EF de ces prédécesseurs, pas leur moyenne ni leur somme.",
      "1. A : ES = 0, EF = 0 + 5. 2. B et C démarrent à l'EF de A. 3. D démarre à l'EF de B. 4. E démarre au plus grand des EF de C et D. 5. La durée du projet est l'EF de E ; le chemin critique remonte de E vers les tâches sans marge."
    ],
    "examples": [
      {
        "stdin": "AquaFit lance une application de suivi de piscine. Réseau PERT :\nX Cadrage (4 jours, sans prédécesseur), Y Maquettes (7 jours, après X),\nZ API (3 jours, après X), W Tests (5 jours, après Y et Z).\n\n1) X : ES = 0, EF = 4.\n2) Y : ES = 4, EF = 11 ; Z : ES = 4, EF = 7.\n3) W : ES = max(11, 7) = 11, EF = 16.\n4) Durée minimale : 16 jours.\n5) Chemin critique : X,Y,W (Y finit plus tard que Z).",
        "expected": "EF de X : 4 — W démarre à 11 — durée minimale : 16 jours — chemin critique X,Y,W",
        "note": "Le chemin critique passe par les tâches sans marge : ici Y, car son EF (11) est supérieur à celui de Z (7)."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Date de fin au plus tôt (EF) de la tâche A",
        "stdin": "q:1",
        "expected": "5||5 jours"
      },
      {
        "label": "Question 2 — Date de début au plus tôt (ES) de la tâche D",
        "stdin": "q:2",
        "expected": "13||13 jours"
      },
      {
        "label": "Question 3 — Date de début au plus tôt (ES) de la tâche E",
        "stdin": "q:3",
        "expected": "19||19 jours"
      },
      {
        "label": "Question 4 — Durée minimale du projet (en jours)",
        "stdin": "q:4",
        "expected": "23||23 jours"
      },
      {
        "label": "Question 5 — Chemin critique",
        "stdin": "q:5",
        "expected": "A,B,D,E||A, B, D, E||A-B-D-E||A→B→D→E"
      }
    ],
    "solution": "[Question 1 — Date de fin au plus tôt (EF) de la tâche A]\n5\n\n[Question 2 — Date de début au plus tôt (ES) de la tâche D]\n13\n\n[Question 3 — Date de début au plus tôt (ES) de la tâche E]\n19\n\n[Question 4 — Durée minimale du projet (en jours)]\n23\n\n[Question 5 — Chemin critique]\nA,B,D,E",
    "takeaway": "1) A n'a pas de prédécesseur : ES = 0, donc EF = 0 + 5 = 5.\n2) B démarre à l'EF de A : ES = 5, EF = 5 + 8 = 13. D démarre à l'EF de B : ES = 13.\n3) C démarre aussi à 5 et finit à 17 ; D finit à 13 + 6 = 19. E démarre au maximum des deux : ES = max(17, 19) = 19.\n4) E dure 4 jours : EF = 19 + 4 = 23. La durée minimale du projet est de 23 jours.\n5) Chemin critique : A, B, D, E (5 + 8 + 6 + 4 = 23). La branche C dispose de 2 jours de marge (E démarre à 19 alors que C finit à 17).\nContrôle : la somme des durées du chemin critique (5 + 8 + 6 + 4 = 23) est égale à la durée minimale du projet."
  },
  {
    "id": "ag3-c1-e3",
    "chapter": 1,
    "level": "n3",
    "language": "analyse",
    "title": "Trois clients, trois démarches : les arbitrages de l'agence Novacode",
    "exampleTitle": "Exemple résolu — les arbitrages du cabinet Alizeo",
    "goal": "Choisir une démarche de gestion (cascade, Scrum ou hybride) selon l'incertitude et les contraintes, et mobiliser le Manifeste Agile.",
    "brief": "<p><strong>Énoncé.</strong> L'agence numérique Novacode reçoit trois clients et doit recommander, pour chacun, une démarche de gestion de projet : la <strong>cascade</strong> (cycle prédictif complet), <strong>Scrum</strong> (cycle adaptatif empirique) ou une démarche <strong>hybride</strong> (cadrage global, puis exécution en sprints).</p><ul><li><strong>Projet 1 — TelcoPlus, opérateur télécom :</strong> refonte du système de facturation. Les exigences sont figées et validées par le régulateur, la documentation d'audit doit être complète et le périmètre ne bougera pas.</li><li><strong>Projet 2 — FitJourney, startup :</strong> application de coaching sportif. Le marché est incertain, les utilisateurs seront interrogés chaque semaine et le produit devra changer de cap rapidement.</li><li><strong>Projet 3 — NordFinance, banque :</strong> refonte du SI avec un cœur bancaire soumis à la conformité (stable et documenté) et, à côté, des parcours clients innovants à tester par itérations courtes.</li></ul><p>Pour les questions 1 à 3, répondez par un seul mot : cascade, scrum ou hybride. Pour les questions 4 à 6, répondez de façon courte.</p><ol><li>Quelle démarche recommander pour le projet 1 (TelcoPlus) ?</li><li>Quelle démarche recommander pour le projet 2 (FitJourney) ?</li><li>Quelle démarche recommander pour le projet 3 (NordFinance) ?</li><li>Le Manifeste Agile de 2001 valorise « les individus et leurs interactions » plutôt que quoi ?</li><li>Combien de valeurs compte le Manifeste Agile ?</li><li>Selon le Manifeste Agile, quelle est la mesure première du progrès d'un projet ?</li></ol>",
    "starter": "# Exercice — Trois clients, trois démarches : les arbitrages de l'agence Novacode\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 3 : un seul mot (cascade, scrum ou hybride).\n\n[Question 1 — Démarche recommandée pour TelcoPlus]\nA_COMPLETER\n\n[Question 2 — Démarche recommandée pour FitJourney]\nA_COMPLETER\n\n[Question 3 — Démarche recommandée pour NordFinance]\nA_COMPLETER\n\n[Question 4 — Ce que le Manifeste dévalorise face aux individus et leurs interactions]\nA_COMPLETER\n\n[Question 5 — Nombre de valeurs du Manifeste Agile]\nA_COMPLETER\n\n[Question 6 — Mesure première du progrès selon le Manifeste]\nA_COMPLETER\n",
    "hints": [
      "Classez chaque projet sur deux axes : la stabilité des exigences (figées ou à découvrir) et la contrainte de gouvernance (documentation imposée ou non).",
      "Exigences stables et documentation imposée conduisent au prédictif ; incertitude et feedback hebdomadaire conduisent à l'adaptatif ; le mélange des deux appelle l'hybride.",
      "1. Classez chaque projet : exigences stables et documentation imposée orientent vers le prédictif, incertitude et feedback fréquent vers l'adaptatif, le mélange des deux vers le compromis. 2. Relisez la première valeur du Manifeste pour la question 4. 3. Comptez les phrases du Manifeste qui valorisent quelque chose plutôt qu'autre chose. 4. La mesure du progrès porte sur ce que l'on peut livrer et utiliser."
    ],
    "examples": [
      {
        "stdin": "Le cabinet Alizeo arbitre deux projets.\nProjet A : site vitrine d'un notaire, maquette validée, livraison en une seule fois, exigences stables.\nProjet B : plateforme de covoiturage d'entreprise, budget annuel imposé par la direction financière mais produit à découvrir par itérations.\n\n1) Projet A : cascade (exigences stables, une livraison).\n2) Projet B : hybride (gouvernance prédictive + découverte itérative).\n3) Le Manifeste valorise le logiciel fonctionnel plutôt qu'une documentation exhaustive.\n4) Il compte 4 valeurs.",
        "expected": "A : cascade — B : hybride — 4 valeurs — mesure du progrès : le logiciel fonctionnel",
        "note": "L'hybride conserve un cadrage global (budget, jalons) tout en réservant la découverte du besoin à des itérations courtes."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Démarche recommandée pour TelcoPlus",
        "stdin": "q:1",
        "expected": "cascade||waterfall||le cycle en cascade||cycle en cascade"
      },
      {
        "label": "Question 2 — Démarche recommandée pour FitJourney",
        "stdin": "q:2",
        "expected": "scrum||agile"
      },
      {
        "label": "Question 3 — Démarche recommandée pour NordFinance",
        "stdin": "q:3",
        "expected": "hybride||l'hybride||l’hybride||une démarche hybride||water-scrum-fall"
      },
      {
        "label": "Question 4 — Ce que le Manifeste dévalorise face aux individus et leurs interactions",
        "stdin": "q:4",
        "expected": "les processus et les outils||processus et les outils||des processus et des outils"
      },
      {
        "label": "Question 5 — Nombre de valeurs du Manifeste Agile",
        "stdin": "q:5",
        "expected": "4||quatre"
      },
      {
        "label": "Question 6 — Mesure première du progrès selon le Manifeste",
        "stdin": "q:6",
        "expected": "le logiciel fonctionnel||logiciel fonctionnel||des logiciels fonctionnels"
      }
    ],
    "solution": "[Question 1 — Démarche recommandée pour TelcoPlus]\ncascade\n\n[Question 2 — Démarche recommandée pour FitJourney]\nscrum\n\n[Question 3 — Démarche recommandée pour NordFinance]\nhybride\n\n[Question 4 — Ce que le Manifeste dévalorise face aux individus et leurs interactions]\nles processus et les outils\n\n[Question 5 — Nombre de valeurs du Manifeste Agile]\n4\n\n[Question 6 — Mesure première du progrès selon le Manifeste]\nle logiciel fonctionnel",
    "takeaway": "1) TelcoPlus : exigences figées par le régulateur et documentation d'audit imposée, le prédictif suffit : cascade.\n2) FitJourney : marché incertain et retours utilisateurs hebdomadaires, l'adaptatif s'impose : Scrum.\n3) NordFinance : cœur bancaire stable et conforme (amont prédictif) + parcours innovants à itérer : démarche hybride.\n4) Le Manifeste valorise « les individus et leurs interactions » plus que « les processus et les outils ».\n5) Le Manifeste Agile compte 4 valeurs (et 12 principes).\n6) La mesure première du progrès est le logiciel fonctionnel.\nContrôle : chaque recommandation se justifie par le couple incertitude du besoin / contrainte de gouvernance, jamais par goût personnel."
  }
];
