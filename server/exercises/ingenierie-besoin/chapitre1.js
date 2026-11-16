/**
 * chapitre1.js — Études de cas du cours « ingenierie-besoin ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    "id": "ib2-c1-e1",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "Besoin ou solution ? Les verbatims du comité EcoRide",
    "exampleTitle": "Exemple résolu — le portail de la médiathèque de Rivage",
    "goal": "Distinguer le besoin métier (le quoi et le pourquoi) de la solution technique (le comment) dans des verbatims réels de lancement.",
    "brief": "<p><strong>Énoncé.</strong> La société Novaterra, entreprise de 380 salariés implantée à Lomé, veut réduire l'usage individuel de la voiture pour les trajets domicile-travail. Sa directrice des ressources humaines lance le projet <strong>EcoRide</strong>, une application de covoiturage interne. Lors du comité de lancement, cinq participants s'expriment ainsi :</p><table><tr><th>N°</th><th>Verbatim recueilli</th></tr><tr><th>1</th><td>« Je veux diminuer de 30 % les frais de déplacement remboursés aux salariés. » (directrice des ressources humaines)</td></tr><tr><th>2</th><td>« Nous développerons l'application en React Native avec une base PostgreSQL. » (chef de projet SI)</td></tr><tr><th>3</th><td>« Les salariés doivent trouver un covoitureur en moins de 24 heures. » (responsable qualité de vie au travail)</td></tr><tr><th>4</th><td>« Il faudra héberger l'application sur un cluster Kubernetes chez AWS. » (directrice des systèmes d'information)</td></tr><tr><th>5</th><td>« Je dois suivre chaque mois le nombre de kilomètres partagés. » (contrôleuse de gestion)</td></tr></table><p>Rappel du cours : un <strong>besoin</strong> décrit une finalité métier (le quoi, le pourquoi) ; une <strong>solution</strong> décrit un choix technique de réalisation (le comment).</p><p>Pour les questions 2 à 4, répondez par un seul mot : besoin ou solution.</p><ol><li>Combien de verbatims, parmi les cinq, expriment un besoin métier ?</li><li>Le verbatim 2 exprime-t-il un besoin ou une solution ?</li><li>Le verbatim 4 exprime-t-il un besoin ou une solution ?</li><li>Le verbatim 5 exprime-t-il un besoin ou une solution ?</li><li>Comment le cours nomme-t-il l'espace où vivent les besoins métier : l'espace du problème ou l'espace de la solution ?</li></ol>",
    "starter": "# Exercice — Besoin ou solution ? Les verbatims du comité EcoRide\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 2 à 4 : un seul mot (besoin ou solution).\n\n[Question 1 — Nombre de verbatims exprimant un besoin métier]\nA_COMPLETER\n\n[Question 2 — Nature du verbatim 2]\nA_COMPLETER\n\n[Question 3 — Nature du verbatim 4]\nA_COMPLETER\n\n[Question 4 — Nature du verbatim 5]\nA_COMPLETER\n\n[Question 5 — Nom de l'espace des besoins métier]\nA_COMPLETER\n",
    "hints": [
      "Un besoin décrit un objectif ou une douleur métier ; une solution nomme une technologie, un outil ou une architecture précise.",
      "Cherchez les indices : un chiffre d'affaires, un délai ou une règle de gestion visent un résultat, tandis qu'un nom de framework, de base de données ou de cloud est un choix d'implémentation.",
      "1. Les verbatims 1, 3 et 5 décrivent des finalités : ce sont des besoins. 2. Les verbatims 2 et 4 nomment des technologies : ce sont des solutions. 3. Comptez les besoins, puis rappelez que le besoin appartient à l'espace du problème."
    ],
    "examples": [
      {
        "stdin": "La médiathèque de Rivage lance son portail de réservation. Trois verbatims du comité :\n1. « Je veux que les adhérents réservent leurs livres sans se déplacer. » (directrice)\n2. « Nous utiliserons WordPress avec un plugin de réservation. » (webmaster)\n3. « Les adhérents doivent pouvoir emprunter jusqu'à cinq ouvrages. » (responsable des acquisitions)\n\n1) Deux verbatims expriment un besoin métier (les numéros 1 et 3).\n2) Le verbatim 2 est une solution : il nomme une technologie.\n3) Les besoins métier vivent dans l'espace du problème.",
        "expected": "2 besoins (verbatims 1 et 3) — le verbatim 2 est une solution — l'espace du problème",
        "note": "Compter les besoins revient à séparer la finalité métier du choix technique : une technologie citée signale toujours une solution."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre de verbatims exprimant un besoin métier",
        "stdin": "q:1",
        "expected": "3||trois"
      },
      {
        "label": "Question 2 — Nature du verbatim 2",
        "stdin": "q:2",
        "expected": "une solution||solution"
      },
      {
        "label": "Question 3 — Nature du verbatim 4",
        "stdin": "q:3",
        "expected": "une solution||solution"
      },
      {
        "label": "Question 4 — Nature du verbatim 5",
        "stdin": "q:4",
        "expected": "un besoin||besoin"
      },
      {
        "label": "Question 5 — Nom de l'espace des besoins métier",
        "stdin": "q:5",
        "expected": "l'espace du problème||espace du problème||l'espace du probleme||espace du probleme||probleme"
      }
    ],
    "solution": "[Question 1 — Nombre de verbatims exprimant un besoin métier]\n3\n\n[Question 2 — Nature du verbatim 2]\nune solution\n\n[Question 3 — Nature du verbatim 4]\nune solution\n\n[Question 4 — Nature du verbatim 5]\nun besoin\n\n[Question 5 — Nom de l'espace des besoins métier]\nl'espace du problème",
    "takeaway": "1) Les verbatims 1, 3 et 5 décrivent des finalités métier (réduire les frais, trouver un covoitureur sous 24 heures, suivre les kilomètres partagés) : 3 besoins.\n2) Le verbatim 2 nomme des technologies (React Native, PostgreSQL) : c'est une solution.\n3) Le verbatim 4 impose une infrastructure (Kubernetes, AWS) : c'est une solution.\n4) Le verbatim 5 exprime un besoin de pilotage (suivi mensuel des kilomètres partagés) : c'est un besoin.\n5) Les besoins métier vivent dans l'espace du problème ; les solutions techniques vivent dans l'espace de la solution.\nContrôle : 3 besoins + 2 solutions = 5 verbatims recensés."
  },
  {
    "id": "ib2-c1-e2",
    "chapter": 1,
    "level": "n2",
    "language": "analyse",
    "title": "La matrice Pouvoir/Intérêt de l'état civil de Sokodé",
    "exampleTitle": "Exemple résolu — la médiathèque de Rivage",
    "goal": "Positionner chaque partie prenante dans la matrice Pouvoir/Intérêt de Mendelow pour choisir la stratégie d'engagement adaptée.",
    "brief": "<p><strong>Énoncé.</strong> La mairie de Sokodé informatise son service d'état civil : les naissances, mariages et décès seront saisis dans une application unique. Avant le recueil des besoins, l'analyste recense cinq parties prenantes et note, sur une échelle de 1 à 10, leur <strong>pouvoir</strong> (capacité à influencer le projet) et leur <strong>intérêt</strong> (attention portée au projet) :</p><table><tr><th>Partie prenante</th><th>Pouvoir</th><th>Intérêt</th></tr><tr><th>Directeur général des services</th><td>9</td><td>8</td></tr><tr><th>Chef du service état civil</th><td>4</td><td>9</td></tr><tr><th>Régie financière municipale</th><td>8</td><td>3</td></tr><tr><th>Prestataire d'hébergement cloud</th><td>2</td><td>2</td></tr><tr><th>Association des usagers du centre-ville</th><td>3</td><td>7</td></tr></table><p>Stratégies de la matrice de Mendelow (seuil fixé à 7) :</p><ul><li>Pouvoir supérieur ou égal à 7 et Intérêt supérieur ou égal à 7 : <strong>gérer de près</strong> (acteur clé) ;</li><li>Pouvoir supérieur ou égal à 7 et Intérêt inférieur à 7 : <strong>garder satisfait</strong> ;</li><li>Pouvoir inférieur à 7 et Intérêt supérieur ou égal à 7 : <strong>garder informé</strong> ;</li><li>Pouvoir inférieur à 7 et Intérêt inférieur à 7 : <strong>surveiller avec un effort minimal</strong>.</li></ul><p>Pour les questions 1 à 4, répondez par la stratégie exacte ; pour la question 5, appliquez la même règle à une nouvelle partie prenante.</p><ol><li>Quelle stratégie pour le directeur général des services ?</li><li>Quelle stratégie pour le chef du service état civil ?</li><li>Quelle stratégie pour la régie financière municipale ?</li><li>Quelle stratégie pour le prestataire d'hébergement cloud ?</li><li>Une association de riverains obtiendrait un pouvoir de 6 et un intérêt de 9 : quelle stratégie appliquer ?</li></ol>",
    "starter": "# Exercice — La matrice Pouvoir/Intérêt de l'état civil de Sokodé\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par la stratégie exacte (gérer de près, garder satisfait, garder informé, surveiller).\n\n[Question 1 — Stratégie pour le directeur général des services]\nA_COMPLETER\n\n[Question 2 — Stratégie pour le chef du service état civil]\nA_COMPLETER\n\n[Question 3 — Stratégie pour la régie financière municipale]\nA_COMPLETER\n\n[Question 4 — Stratégie pour le prestataire d'hébergement cloud]\nA_COMPLETER\n\n[Question 5 — Stratégie pour l'association de riverains (pouvoir 6, intérêt 9)]\nA_COMPLETER\n",
    "hints": [
      "Le quadrant se lit sur le couple (pouvoir, intérêt) : c'est la comparaison de chaque note au seuil 7 qui décide, jamais une note seule.",
      "Comparez d'abord le pouvoir au seuil : s'il atteint 7, l'acteur est puissant et l'intérêt décide entre gérer de près et garder satisfait ; sinon, l'intérêt décide entre garder informé et surveiller.",
      "1. Directeur : 9 et 8, les deux au-dessus du seuil : gérer de près. 2. Chef du service : 4 et 9 : garder informé. 3. Régie financière : 8 et 3 : garder satisfait. 4. Prestataire : 2 et 2 : surveiller. 5. Riverains : 6 et 9 : garder informé."
    ],
    "examples": [
      {
        "stdin": "La médiathèque de Rivage recense trois parties prenantes :\n- conservatrice : pouvoir 9, intérêt 5 ;\n- président de l'association des amis : pouvoir 2, intérêt 8 ;\n- prestataire informatique : pouvoir 3, intérêt 3.\n\n1) Conservatrice : pouvoir 9 (au-dessus de 7), intérêt 5 (en dessous) : garder satisfait.\n2) Président : pouvoir 2, intérêt 8 : garder informé.\n3) Prestataire : 3 et 3 : surveiller avec un effort minimal.",
        "expected": "garder satisfait — garder informé — surveiller",
        "note": "Le seuil 7 sépare les quadrants : un acteur puissant mais peu intéressé se garde satisfait, pour éviter qu'il ne bloque le projet plus tard."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Stratégie pour le directeur général des services",
        "stdin": "q:1",
        "expected": "gérer de près||gerer de pres||gérer de pres||gerer de près"
      },
      {
        "label": "Question 2 — Stratégie pour le chef du service état civil",
        "stdin": "q:2",
        "expected": "garder informé||garder informe"
      },
      {
        "label": "Question 3 — Stratégie pour la régie financière municipale",
        "stdin": "q:3",
        "expected": "garder satisfait"
      },
      {
        "label": "Question 4 — Stratégie pour le prestataire d'hébergement cloud",
        "stdin": "q:4",
        "expected": "surveiller||surveiller avec un effort minimal||surveiller avec effort minimal"
      },
      {
        "label": "Question 5 — Stratégie pour l'association de riverains (pouvoir 6, intérêt 9)",
        "stdin": "q:5",
        "expected": "garder informé||garder informe"
      }
    ],
    "solution": "[Question 1 — Stratégie pour le directeur général des services]\ngérer de près\n\n[Question 2 — Stratégie pour le chef du service état civil]\ngarder informé\n\n[Question 3 — Stratégie pour la régie financière municipale]\ngarder satisfait\n\n[Question 4 — Stratégie pour le prestataire d'hébergement cloud]\nsurveiller\n\n[Question 5 — Stratégie pour l'association de riverains (pouvoir 6, intérêt 9)]\ngarder informé",
    "takeaway": "1) Directeur général des services : pouvoir 9 et intérêt 8, tous deux au-dessus du seuil 7 : acteur clé, à gérer de près.\n2) Chef du service état civil : pouvoir 4 (en dessous) et intérêt 9 (au-dessus) : à garder informé.\n3) Régie financière municipale : pouvoir 8 (au-dessus) et intérêt 3 (en dessous) : à garder satisfait.\n4) Prestataire d'hébergement cloud : pouvoir 2 et intérêt 2 : à surveiller avec un effort minimal.\n5) Association de riverains : pouvoir 6 (en dessous) et intérêt 9 (au-dessus) : à garder informé.\nContrôle : chaque stratégie découle du franchissement ou non du seuil 7 par chacune des deux notes."
  },
  {
    id: "ib2-c1-e3",
    chapter: 1,
    level: "n3",
    language: 'analyse',
    title: "Complétude d’une fiche d’exigence",
    goal: "Valider la structure et la complétude des attributs obligatoires d’une exigence logicielle.",
    brief: "<p>Pour cette grille, une exigence documentée comporte 5 attributs obligatoires : <code>id</code>, <code>titre</code>, <code>description</code>, <code>source</code> et <code>priorite</code>. La priorité doit être l’une des trois valeurs : <code>Haute</code>, <code>Moyenne</code> ou <code>Basse</code>.</p><p>Examinez l’objet JSON fourni dans les données du cas et indiquez :<br>- Si valide : <code>VALIDE (&lt;id&gt;)</code><br>- Si un attribut obligatoire est absent ou vide : <code>ERREUR: Champ manquant &lt;nom_champ&gt;</code> (tester les champs dans l’ordre : id, titre, description, source, priorite)<br>- Si la priorité n’est pas l’une des 3 valeurs autorisées, utilisez <code>ERREUR: &lt;champ&gt; &lt;statut&gt;</code> avec le champ <code>Priorite</code> et le statut <code>invalide</code>.</p>",
    starter: "# Grille d'analyse (ib2-c1-e3) — Complétude d’une fiche d’exigence\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Test 1]\n# Données : {\"id\": \"REQ-002\", \"titre\": \"\", \"description\": \"Export CSV\", \"source\": \"Finance\", \"priorite\": \"Moyenne\"}\nA_COMPLETER\n\n[Cas 2 — Test 2]\n# Données : {\"id\": \"REQ-003\", \"titre\": \"Audit logs\", \"description\": \"Archivage 1 an\", \"source\": \"Securite\", \"priorite\": \"Urgente\"}\nA_COMPLETER\n\n[Cas 3 — Test 3]\n# Données : {\"id\": \"REQ-004\", \"titre\": \"Recherche\", \"description\": \"Recherche floue\", \"source\": \"Produit\", \"priorite\": \"Basse\"}\nA_COMPLETER\n",
    hints: [
      "Repérez les clés et leurs valeurs dans l’objet JSON de chaque cas.",
      "Vérifiez la présence et la non-vacuité de chaque champ dans la liste ordonnée [\"id\", \"titre\", \"description\", \"source\", \"priorite\"].",
      "Contrôlez la présence de tous les champs obligatoires de l exigence (ID, titre, priorité, critère d acceptation) avant de trancher VALIDE ou INVALIDE."
    ],
    examples: [
          {
                "stdin": "{\"id\": \"REQ-001\", \"titre\": \"Connexion OAuth2\", \"description\": \"L utilisateur doit pouvoir se connecter via Google\", \"source\": \"DSI\", \"priorite\": \"Haute\"}",
                "expected": "VALIDE (REQ-001)",
                "note": "Tous les champs sont renseignés et la priorité est Haute."
          }
    ],
    tests: [
          {
                "label": "Test 1",
                "stdin": "cas:1",
                "expected": "ERREUR: Champ manquant titre"
          },
          {
                "label": "Test 2",
                "stdin": "cas:2",
                "expected": "ERREUR: Priorite invalide"
          },
          {
                "label": "Test 3",
                "stdin": "cas:3",
                "expected": "VALIDE (REQ-004)"
          }
    ],
    solution: "[Exemple]\nVALIDE (REQ-001)\n\n[Cas 1 — Test 1]\nERREUR: Champ manquant titre\n\n[Cas 2 — Test 2]\nERREUR: Priorite invalide\n\n[Cas 3 — Test 3]\nVALIDE (REQ-004)\n",
    takeaway: "À retenir : Valider la structure et la complétude des attributs obligatoires d’une exigence logicielle.\nRepère : Tous les champs sont renseignés et la priorité est Haute."
  }
];
