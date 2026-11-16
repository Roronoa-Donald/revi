/**
 * Exercices mis à jour — remédiation pédagogique
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
    "id": "ib2-c1-e3",
    "chapter": 1,
    "level": "n3",
    "language": "analyse",
    "title": "Complétude d’une fiche d’exigence",
    "goal": "Valider la structure et la complétude des attributs obligatoires d’une exigence logicielle.",
    "brief": "<p>Pour cette grille, une exigence documentée comporte 5 attributs obligatoires : <code>id</code>, <code>titre</code>, <code>description</code>, <code>source</code> et <code>priorite</code>. La priorité doit être l’une des trois valeurs : <code>Haute</code>, <code>Moyenne</code> ou <code>Basse</code>.</p><p>Examinez l’objet JSON fourni dans les données du cas et indiquez :<br>- Si valide : <code>VALIDE (&lt;id&gt;)</code><br>- Si un attribut obligatoire est absent ou vide : <code>ERREUR: Champ manquant &lt;nom_champ&gt;</code> (tester les champs dans l’ordre : id, titre, description, source, priorite)<br>- Si la priorité n’est pas l’une des 3 valeurs autorisées, utilisez <code>ERREUR: &lt;champ&gt; &lt;statut&gt;</code> avec le champ <code>Priorite</code> et le statut <code>invalide</code>.</p>",
    "starter": "# Grille d'analyse (ib2-c1-e3) — Complétude d’une fiche d’exigence\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Test 1]\n# Données : {\"id\": \"REQ-002\", \"titre\": \"\", \"description\": \"Export CSV\", \"source\": \"Finance\", \"priorite\": \"Moyenne\"}\nA_COMPLETER\n\n[Cas 2 — Test 2]\n# Données : {\"id\": \"REQ-003\", \"titre\": \"Audit logs\", \"description\": \"Archivage 1 an\", \"source\": \"Securite\", \"priorite\": \"Urgente\"}\nA_COMPLETER\n\n[Cas 3 — Test 3]\n# Données : {\"id\": \"REQ-004\", \"titre\": \"Recherche\", \"description\": \"Recherche floue\", \"source\": \"Produit\", \"priorite\": \"Basse\"}\nA_COMPLETER\n",
    "hints": [
      "Repérez les clés et leurs valeurs dans l’objet JSON de chaque cas.",
      "Vérifiez la présence et la non-vacuité de chaque champ dans la liste ordonnée [\"id\", \"titre\", \"description\", \"source\", \"priorite\"].",
      "Contrôlez la présence de tous les champs obligatoires de l exigence (ID, titre, priorité, critère d acceptation) avant de trancher VALIDE ou INVALIDE."
    ],
    "examples": [
      {
        "stdin": "{\"id\": \"REQ-001\", \"titre\": \"Connexion OAuth2\", \"description\": \"L utilisateur doit pouvoir se connecter via Google\", \"source\": \"DSI\", \"priorite\": \"Haute\"}",
        "expected": "VALIDE (REQ-001)",
        "note": "Tous les champs sont renseignés et la priorité est Haute."
      }
    ],
    "tests": [
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
    "solution": "[Exemple]\nVALIDE (REQ-001)\n\n[Cas 1 — Test 1]\nERREUR: Champ manquant titre\n\n[Cas 2 — Test 2]\nERREUR: Priorite invalide\n\n[Cas 3 — Test 3]\nVALIDE (REQ-004)\n",
    "takeaway": "À retenir : Valider la structure et la complétude des attributs obligatoires d’une exigence logicielle.\nRepère : Tous les champs sont renseignés et la priorité est Haute."
  },
  {
    "id": "ib2-c2-e1",
    "chapter": 2,
    "level": "n1",
    "language": "analyse",
    "title": "Fonctionnelle ou non fonctionnelle ? Le dossier patient de la clinique Sainte-Marie",
    "exampleTitle": "Exemple résolu — la réservation de terrains du complexe Azur",
    "goal": "Classer des exigences réelles en fonctionnelles ou non fonctionnelles et les qualifier avec la taxonomie FURPS+.",
    "brief": "<p><strong>Énoncé.</strong> La clinique Sainte-Marie, établissement de 60 lits à Lomé, remplace ses registres papier par un dossier patient informatisé. Le brouillon de spécification contient six exigences :</p><table><tr><th>Réf.</th><th>Énoncé de l'exigence</th></tr><tr><th>EX-01</th><td>Le médecin doit pouvoir enregistrer un diagnostic codé pour chaque consultation.</td></tr><tr><th>EX-02</th><td>Le système doit afficher un dossier patient en moins de 2 secondes pour 95 % des consultations.</td></tr><tr><th>EX-03</th><td>Le dossier patient doit être sauvegardé chaque nuit sur un site distant.</td></tr><tr><th>EX-04</th><td>L'infirmière doit pouvoir rechercher un patient à partir de son numéro de dossier.</td></tr><tr><th>EX-05</th><td>Le système doit être disponible 99,5 % du temps pendant les heures de consultation.</td></tr><tr><th>EX-06</th><td>Le logiciel doit être utilisable au chevet du patient sur tablette, sans formation spécifique.</td></tr></table><p>Rappel du cours : une exigence <strong>fonctionnelle</strong> décrit un service que le système doit rendre ; une exigence <strong>non fonctionnelle</strong> décrit une propriété de qualité (performance, fiabilité, utilisabilité...).</p><p>Pour les questions 2 et 3, répondez par : fonctionnelle ou non fonctionnelle.</p><ol><li>Combien d'exigences fonctionnelles compte ce brouillon ?</li><li>L'exigence EX-02 est-elle fonctionnelle ou non fonctionnelle ?</li><li>L'exigence EX-04 est-elle fonctionnelle ou non fonctionnelle ?</li><li>Dans la taxonomie FURPS+, quelle catégorie qualifie EX-02 (affichage en moins de 2 secondes) ?</li><li>Dans la taxonomie FURPS+, quelle catégorie qualifie EX-06 (utilisation sur tablette sans formation) ?</li></ol>",
    "starter": "# Exercice — Fonctionnelle ou non fonctionnelle ? Le dossier patient de la clinique Sainte-Marie\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 2 et 3 : fonctionnelle ou non fonctionnelle. Questions 4 et 5 : la catégorie FURPS+.\n\n[Question 1 — Nombre d'exigences fonctionnelles]\nA_COMPLETER\n\n[Question 2 — Nature de l'exigence EX-02]\nA_COMPLETER\n\n[Question 3 — Nature de l'exigence EX-04]\nA_COMPLETER\n\n[Question 4 — Catégorie FURPS+ de EX-02]\nA_COMPLETER\n\n[Question 5 — Catégorie FURPS+ de EX-06]\nA_COMPLETER\n",
    "hints": [
      "Demandez-vous si l'exigence décrit ce que le système fait (un service rendu à un utilisateur) ou comment il le fait (une qualité mesurable).",
      "Les services rendus (enregistrer, rechercher) sont fonctionnels ; les seuils chiffrés (temps, taux de disponibilité) et les conditions d'usage décrivent des propriétés de qualité.",
      "1. EX-01 et EX-04 décrivent des services : ce sont les deux exigences fonctionnelles. 2. EX-02 fixe un temps de réponse : non fonctionnelle, catégorie performance. 3. EX-06 décrit la facilité d'usage : non fonctionnelle, catégorie utilisabilité."
    ],
    "examples": [
      {
        "stdin": "Le complexe sportif Azur spécifie son portail de réservation de terrains :\n- R1 : l'adhérent doit pouvoir réserver un terrain de tennis en ligne.\n- R2 : la page de réservation doit s'afficher en moins de 3 secondes pour 9 requêtes sur 10.\n- R3 : la réservation doit rester possible même en cas de panne d'un serveur (sauvegarde quotidienne).\n\n1) R1 est fonctionnelle : elle décrit un service rendu.\n2) R2 est non fonctionnelle : c'est une exigence de performance.\n3) R3 est non fonctionnelle : c'est une exigence de fiabilité.",
        "expected": "R1 fonctionnelle — R2 non fonctionnelle (performance) — R3 non fonctionnelle (fiabilité)",
        "note": "Un service rendu à un utilisateur est fonctionnel ; tout seuil chiffré sur la manière de le rendre est non fonctionnel."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre d'exigences fonctionnelles",
        "stdin": "q:1",
        "expected": "2||deux"
      },
      {
        "label": "Question 2 — Nature de l'exigence EX-02",
        "stdin": "q:2",
        "expected": "non fonctionnelle||non fonctionnel||non-fonctionnelle"
      },
      {
        "label": "Question 3 — Nature de l'exigence EX-04",
        "stdin": "q:3",
        "expected": "fonctionnelle||fonctionnel"
      },
      {
        "label": "Question 4 — Catégorie FURPS+ de EX-02",
        "stdin": "q:4",
        "expected": "la performance||performance"
      },
      {
        "label": "Question 5 — Catégorie FURPS+ de EX-06",
        "stdin": "q:5",
        "expected": "l'utilisabilité||utilisabilité||l'utilisabilite||utilisabilite||l'ergonomie||ergonomie"
      }
    ],
    "solution": "[Question 1 — Nombre d'exigences fonctionnelles]\n2\n\n[Question 2 — Nature de l'exigence EX-02]\nnon fonctionnelle\n\n[Question 3 — Nature de l'exigence EX-04]\nfonctionnelle\n\n[Question 4 — Catégorie FURPS+ de EX-02]\nla performance\n\n[Question 5 — Catégorie FURPS+ de EX-06]\nl'utilisabilité",
    "takeaway": "1) EX-01 (enregistrer un diagnostic) et EX-04 (rechercher un patient) décrivent des services rendus : 2 exigences fonctionnelles. Les quatre autres décrivent des propriétés de qualité.\n2) EX-02 impose un temps d'affichage (moins de 2 secondes pour 95 % des consultations) : c'est une exigence non fonctionnelle.\n3) EX-04 décrit un service de recherche rendu à l'infirmière : c'est une exigence fonctionnelle.\n4) Le délai d'affichage relève de la catégorie performance de FURPS+.\n5) L'usage sans formation sur tablette relève de la catégorie utilisabilité de FURPS+.\nContrôle : 2 exigences fonctionnelles + 4 non fonctionnelles = 6 exigences du brouillon."
  },
  {
    "id": "ib2-c2-e2",
    "chapter": 2,
    "level": "n2",
    "language": "analyse",
    "title": "Mots vagues : la relecture du cahier des charges de LoméBus",
    "exampleTitle": "Exemple résolu — le logiciel de paie de Cotono",
    "goal": "Repérer les termes vagues non mesurables d'un cahier des charges et identifier les énoncés rendus vérifiables par un seuil chiffré.",
    "brief": "<p><strong>Énoncé.</strong> La régie de transport LoméBus fait relire trois exigences de sa future application de suivi des bus avant la signature du cahier des charges. La norme ISO/IEC/IEEE 29148 interdit les termes subjectifs non mesurables, notamment : <em>rapide</em>, <em>facile</em>, <em>convivial</em>, <em>efficace</em>, <em>flexible</em>, <em>robuste</em>, <em>intuitif</em>, <em>performant</em> et <em>optimal</em> (accords et pluriels compris).</p><p>Les trois exigences relues sont :</p><ul><li><strong>R-1</strong> : « L'application de suivi des bus doit être rapide et conviviale. »</li><li><strong>R-2</strong> : « La position d'un bus doit s'actualiser en moins de 10 secondes pour 95 % des requêtes. »</li><li><strong>R-3</strong> : « Le système doit rester robuste et optimal en cas d'affluence. »</li></ul><p>Pour les questions 2 et 4, citez les deux termes vagues séparés par une virgule, par ordre alphabétique.</p><ol><li>Combien d'exigences contiennent au moins un terme vague ?</li><li>Citez les deux termes vagues de R-1.</li><li>R-2 est-elle conforme ou ambiguë ?</li><li>Citez les deux termes vagues de R-3.</li><li>Quel seuil de temps, en secondes, rend R-2 vérifiable ?</li></ol>",
    "starter": "# Exercice — Mots vagues : la relecture du cahier des charges de LoméBus\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 2 et 4 : les deux termes vagues, par ordre alphabétique, séparés par une virgule.\n\n[Question 1 — Nombre d'exigences contenant un terme vague]\nA_COMPLETER\n\n[Question 2 — Termes vagues de R-1]\nA_COMPLETER\n\n[Question 3 — Statut de R-2 (conforme ou ambiguë)]\nA_COMPLETER\n\n[Question 4 — Termes vagues de R-3]\nA_COMPLETER\n\n[Question 5 — Seuil en secondes qui rend R-2 vérifiable]\nA_COMPLETER\n",
    "hints": [
      "Un terme est vague quand aucun test ne peut en démontrer le respect : « rapide » ne se vérifie pas, « en moins de 10 secondes » oui.",
      "Comparez chaque adjectif de l'exigence à la liste interdite du cours ; une exigence chiffrée avec un seuil et une condition de charge est conforme.",
      "1. R-1 contient rapide et conviviale ; R-3 contient robuste et optimal ; R-2 est chiffrée. 2. Deux exigences sont donc ambiguës. 3. Le seuil de R-2 se lit dans son énoncé : 10 secondes."
    ],
    "examples": [
      {
        "stdin": "Le logiciel de paie de Cotono relit deux exigences :\n- P-1 : « Le bulletin de paie doit être intuitif et performant. »\n- P-2 : « Le calcul d'un bulletin doit aboutir en moins de 4 secondes pour 99 % des bulletins. »\n\n1) P-1 contient deux termes vagues : intuitif et performant.\n2) P-2 est conforme : seuil chiffré (4 secondes) et condition de charge (99 %).",
        "expected": "P-1 ambiguë (intuitif, performant) — P-2 conforme (seuil de 4 secondes)",
        "note": "Remplacer un adjectif vague par un seuil, une unité et une condition de charge transforme un souhait invérifiable en exigence testable."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre d'exigences contenant un terme vague",
        "stdin": "q:1",
        "expected": "2||deux"
      },
      {
        "label": "Question 2 — Termes vagues de R-1",
        "stdin": "q:2",
        "expected": "conviviale, rapide||conviviale et rapide||rapide, conviviale"
      },
      {
        "label": "Question 3 — Statut de R-2 (conforme ou ambiguë)",
        "stdin": "q:3",
        "expected": "conforme"
      },
      {
        "label": "Question 4 — Termes vagues de R-3",
        "stdin": "q:4",
        "expected": "optimal, robuste||optimal et robuste||robuste, optimal"
      },
      {
        "label": "Question 5 — Seuil en secondes qui rend R-2 vérifiable",
        "stdin": "q:5",
        "expected": "10||10 secondes||dix"
      }
    ],
    "solution": "[Question 1 — Nombre d'exigences contenant un terme vague]\n2\n\n[Question 2 — Termes vagues de R-1]\nconviviale, rapide\n\n[Question 3 — Statut de R-2 (conforme ou ambiguë)]\nconforme\n\n[Question 4 — Termes vagues de R-3]\noptimal, robuste\n\n[Question 5 — Seuil en secondes qui rend R-2 vérifiable]\n10",
    "takeaway": "1) R-1 et R-3 contiennent chacune deux termes vagues : 2 exigences sont ambiguës.\n2) R-1 contient les termes vagues : conviviale, rapide (par ordre alphabétique).\n3) R-2 est conforme : aucun terme vague, un seuil chiffré (10 secondes) et une condition de charge (95 % des requêtes).\n4) R-3 contient les termes vagues : optimal, robuste (par ordre alphabétique).\n5) Le seuil de 10 secondes rend R-2 vérifiable : un test peut mesurer le délai d'actualisation et comparer au seuil.\nContrôle : R-1 et R-3 doivent être réécrites avec des seuils mesurables avant la signature du cahier des charges."
  },
  {
    "id": "ib2-c2-e3",
    "chapter": 2,
    "level": "n3",
    "language": "analyse",
    "title": "SMART : l'audit des exigences de performance de TogoCapital",
    "exampleTitle": "Exemple résolu — la boutique en ligne de VenteLibre",
    "goal": "Auditer la testabilité d'exigences de performance selon quatre critères : valeur cible positive, unité reconnue et percentile suffisant.",
    "brief": "<p><strong>Énoncé.</strong> La direction des systèmes d'information de la banque TogoCapital audite quatre exigences de performance de son application mobile, avant leur inscription dans la spécification. Chaque exigence est décrite par une <strong>métrique</strong>, une <strong>valeur cible</strong>, une <strong>unité</strong> et une <strong>condition de charge</strong>. Une exigence de performance est testable si et seulement si :</p><ul><li>la valeur cible est strictement positive ;</li><li>l'unité est <code>ms</code> ou <code>s</code> ;</li><li>le percentile de la condition de charge est supérieur ou égal à 90 %.</li></ul><p>Les quatre exigences auditées :</p><table><tr><th>Exigence</th><th>Métrique</th><th>Valeur</th><th>Unité</th><th>Condition</th></tr><tr><th>PERF-1</th><td>Ouverture d'une session</td><td>800</td><td>ms</td><td>95 % des connexions</td></tr><tr><th>PERF-2</th><td>Synchronisation des comptes</td><td>0</td><td>s</td><td>99 % des connexions</td></tr><tr><th>PERF-3</th><td>Affichage de l'historique</td><td>4</td><td>minutes</td><td>95 % des requêtes</td></tr><tr><th>PERF-4</th><td>Recherche d'une transaction</td><td>300</td><td>ms</td><td>75 % des requêtes</td></tr></table><p>Pour les questions 2 à 4, répondez par un seul mot : valeur, unité ou condition.</p><ol><li>Combien d'exigences sont testables telles quelles ?</li><li>PERF-2 échoue sur quel critère ?</li><li>PERF-3 échoue sur quel critère ?</li><li>PERF-4 échoue sur quel critère ?</li><li>Quel critère du sigle SMART est violé par une exigence sans seuil chiffré : Spécifique ou Mesurable ?</li></ol>",
    "starter": "# Exercice — SMART : l'audit des exigences de performance de TogoCapital\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 2 à 4 : un seul mot (valeur, unité ou condition). Question 5 : Spécifique ou Mesurable.\n\n[Question 1 — Nombre d'exigences testables]\nA_COMPLETER\n\n[Question 2 — Critère en échec pour PERF-2]\nA_COMPLETER\n\n[Question 3 — Critère en échec pour PERF-3]\nA_COMPLETER\n\n[Question 4 — Critère en échec pour PERF-4]\nA_COMPLETER\n\n[Question 5 — Critère SMART violé sans seuil chiffré]\nA_COMPLETER\n",
    "hints": [
      "Une exigence de performance testable précise toujours quoi mesurer, un seuil positif, une unité de temps reconnue et une condition de charge représentative.",
      "Vérifiez les trois critères dans l'ordre pour chaque ligne du tableau : valeur strictement positive, puis unité ms ou s, puis percentile d'au moins 90 %.",
      "1. PERF-1 : 800, ms, 95 % : testable. 2. PERF-2 : valeur 0, non strictement positive : c'est la valeur qui échoue. 3. PERF-3 : l'unité minutes n'est pas reconnue. 4. PERF-4 : 75 % est inférieur au seuil de 90 %. 5. Sans seuil chiffré, rien n'est mesurable."
    ],
    "examples": [
      {
        "stdin": "La boutique VenteLibre audite trois exigences de performance :\n- PA : affichage du panier, 250 ms, 90 % des pages vues ;\n- PB : paiement, -3 s, 99 % des commandes ;\n- PC : recherche, 2 s, 85 % des recherches.\n\n1) PA est testable : valeur positive, unité ms, percentile 90 %.\n2) PB échoue sur la valeur : -3 n'est pas strictement positive.\n3) PC échoue sur la condition : 85 % est inférieur à 90 %.",
        "expected": "PA testable — PB rejetée pour la valeur — PC rejetée pour la condition",
        "note": "La valeur, l'unité et le percentile se contrôlent séparément : c'est ce découpage qui rend l'audit d'exigences objectif."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre d'exigences testables",
        "stdin": "q:1",
        "expected": "1||une"
      },
      {
        "label": "Question 2 — Critère en échec pour PERF-2",
        "stdin": "q:2",
        "expected": "la valeur||valeur"
      },
      {
        "label": "Question 3 — Critère en échec pour PERF-3",
        "stdin": "q:3",
        "expected": "l'unité||l'unite||unite||unité"
      },
      {
        "label": "Question 4 — Critère en échec pour PERF-4",
        "stdin": "q:4",
        "expected": "la condition||condition"
      },
      {
        "label": "Question 5 — Critère SMART violé sans seuil chiffré",
        "stdin": "q:5",
        "expected": "Mesurable||mesurable"
      }
    ],
    "solution": "[Question 1 — Nombre d'exigences testables]\n1\n\n[Question 2 — Critère en échec pour PERF-2]\nla valeur\n\n[Question 3 — Critère en échec pour PERF-3]\nl'unité\n\n[Question 4 — Critère en échec pour PERF-4]\nla condition\n\n[Question 5 — Critère SMART violé sans seuil chiffré]\nMesurable",
    "takeaway": "1) Seule PERF-1 est testable : valeur 800 strictement positive, unité ms reconnue, percentile 95 % supérieur ou égal à 90 %.\n2) PERF-2 échoue sur la valeur : 0 n'est pas strictement positive.\n3) PERF-3 échoue sur l'unité : minutes ne fait pas partie des unités reconnues (ms ou s).\n4) PERF-4 échoue sur la condition : 75 % est inférieur au percentile minimal de 90 %.\n5) Sans seuil chiffré, le critère Mesurable de SMART est violé : aucun test ne peut démontrer le respect de l'exigence.\nContrôle : 1 exigence testable + 3 rejets (valeur, unité, condition) = 4 exigences auditées."
  },
  {
    "id": "ib2-c3-e1",
    "chapter": 3,
    "level": "n1",
    "language": "analyse",
    "title": "Choisir la technique d'élicitation : trois missions du cabinet Agritec",
    "exampleTitle": "Exemple résolu — deux missions du bureau EtudePlus",
    "goal": "Choisir la technique de recueil des exigences adaptée au contexte : dispersion des acteurs, savoir tacite, conflit ou besoin flou.",
    "brief": "<p><strong>Énoncé.</strong> Le cabinet d'analyse Agritec conduit trois missions de recueil des besoins :</p><ul><li><strong>Mission A — Coopérative cotonnière du Centre :</strong> 300 producteurs dispersés sur 12 préfectures ; la coopérative veut connaître leurs attentes générales sur un futur outil de gestion des ventes de coton.</li><li><strong>Mission B — Atelier de couture Kofi &amp; Fils :</strong> quatre couturières expertes calculent leurs devis « au feeling » et ne savent pas expliquer leur méthode ; leur savoir-faire est tacite.</li><li><strong>Mission C — Société TransSahel :</strong> la direction et les délégués du personnel s'opposent ouvertement sur les priorités du futur logiciel de notes de frais ; un arbitrage collectif est nécessaire.</li></ul><p>Techniques du cours : entretien individuel, questionnaire en ligne, observation terrain (shadowing), atelier animé (workshop JAD), prototypage exploratoire.</p><ol><li>Quelle technique recommander pour la mission A ?</li><li>Quelle technique recommander pour la mission B ?</li><li>Quelle technique recommander pour la mission C ?</li><li>Le président de TransSahel ne peut consacrer qu'une heure au projet : quelle technique individuelle utiliser avec lui ?</li><li>Pour faire préciser un besoin flou à l'aide d'un artefact manipulable dès les premières semaines, quelle technique mobiliser ?</li></ol>",
    "starter": "# Exercice — Choisir la technique d'élicitation : trois missions du cabinet Agritec\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par le nom de la technique (par exemple : entretien individuel).\n\n[Question 1 — Technique recommandée pour la mission A]\nA_COMPLETER\n\n[Question 2 — Technique recommandée pour la mission B]\nA_COMPLETER\n\n[Question 3 — Technique recommandée pour la mission C]\nA_COMPLETER\n\n[Question 4 — Technique individuelle pour le président de TransSahel]\nA_COMPLETER\n\n[Question 5 — Technique de l'artefact manipulable pour un besoin flou]\nA_COMPLETER\n",
    "hints": [
      "Le choix dépend de trois variables : le nombre et la dispersion des acteurs, la nature du savoir (explicite ou tacite) et le degré de conflit ou de flou.",
      "Un grand nombre d'acteurs dispersés appelle le questionnaire ; un savoir non verbalisable appelle l'observation ; un désaccord appelle l'atelier animé.",
      "1. Mission A : 300 producteurs dispersés : questionnaire en ligne. 2. Mission B : savoir-faire tacite : observation terrain. 3. Mission C : conflit à arbitrer : atelier animé. 4. Un dirigeant pressé : entretien individuel. 5. Un besoin flou à matérialiser : prototypage."
    ],
    "examples": [
      {
        "stdin": "Le bureau EtudePlus arbitre deux missions :\n- Mairie de Rivage : 250 familles usagers de la crèche, à interroger sur leurs horaires préférés ;\n- Boulangerie Aya : la boulangère seule sait régler les fours de nuit mais ne sait pas l'expliquer.\n\n1) Mairie : grand nombre d'usagers dispersés : questionnaire en ligne.\n2) Boulangerie : savoir-faire tacite : observation terrain (shadowing).",
        "expected": "Mairie : questionnaire en ligne — Boulangerie : observation terrain",
        "note": "Quand l'expert ne peut pas verbaliser sa pratique, on ne l'interroge pas : on l'observe en situation réelle."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Technique recommandée pour la mission A",
        "stdin": "q:1",
        "expected": "le questionnaire en ligne||questionnaire en ligne||le questionnaire||questionnaire||sondage en ligne"
      },
      {
        "label": "Question 2 — Technique recommandée pour la mission B",
        "stdin": "q:2",
        "expected": "l'observation terrain||observation terrain||le shadowing||shadowing||l'observation||observation"
      },
      {
        "label": "Question 3 — Technique recommandée pour la mission C",
        "stdin": "q:3",
        "expected": "l'atelier animé||atelier animé||le workshop||workshop||l'atelier anime JAD||atelier anime||JAD||workshop JAD"
      },
      {
        "label": "Question 4 — Technique individuelle pour le président de TransSahel",
        "stdin": "q:4",
        "expected": "l'entretien individuel||entretien individuel||l'entretien||entretien"
      },
      {
        "label": "Question 5 — Technique de l'artefact manipulable pour un besoin flou",
        "stdin": "q:5",
        "expected": "le prototypage||prototypage||le prototypage exploratoire||prototypage exploratoire||le prototype||prototype"
      }
    ],
    "solution": "[Question 1 — Technique recommandée pour la mission A]\nle questionnaire en ligne\n\n[Question 2 — Technique recommandée pour la mission B]\nl'observation terrain\n\n[Question 3 — Technique recommandée pour la mission C]\nl'atelier animé\n\n[Question 4 — Technique individuelle pour le président de TransSahel]\nl'entretien individuel\n\n[Question 5 — Technique de l'artefact manipulable pour un besoin flou]\nle prototypage",
    "takeaway": "1) Mission A : 300 producteurs dispersés sur 12 préfectures, attentes générales à recueillir : le questionnaire en ligne est la seule technique raisonnable en volume et en coût.\n2) Mission B : les couturières ne savent pas verbaliser leur méthode : l'observation terrain (shadowing) capture le savoir tacite.\n3) Mission C : direction et délégués en conflit ouvert : l'atelier animé (workshop JAD) permet la confrontation et l'arbitrage collectif.\n4) Pour une heure avec le président : l'entretien individuel, court et préparé.\n5) Pour matérialiser un besoin flou : le prototypage exploratoire, qui donne un artefact à manipuler et à critiquer.\nContrôle : chaque recommandation se justifie par le couple nombre d'acteurs / nature du savoir, jamais par la préférence de l'analyste."
  },
  {
    "id": "ib2-c3-e2",
    "chapter": 3,
    "level": "n2",
    "language": "analyse",
    "title": "Dépouiller le questionnaire des salariés de Novaterra",
    "exampleTitle": "Exemple résolu — l'enquête des lecteurs de la médiathèque de Rivage",
    "goal": "Dépouiller une enquête d'élicitation par questionnaire : effectifs, moyennes sur 5 et classement des fonctionnalités.",
    "brief": "<p><strong>Énoncé.</strong> La direction des ressources humaines de Novaterra a interrogé ses salariés, par questionnaire, sur quatre fonctionnalités proposées pour le futur intranet. Chaque répondant attribue une note de 1 à 5 à une fonctionnalité. Le dépouillement brut donne les notes suivantes :</p><table><tr><th>Fonctionnalité</th><th>Notes attribuées</th></tr><tr><th>Annuaire des services</th><td>5 ; 4 ; 4 ; 4 ; 3</td></tr><tr><th>Réservation des salles</th><td>4 ; 4 ; 3 ; 3 ; 2 ; 2</td></tr><tr><th>Menu de la cantine</th><td>5 ; 5 ; 4 ; 4 ; 4</td></tr><tr><th>Actualités de l'entreprise</th><td>3 ; 2 ; 2 ; 1</td></tr></table><p>La moyenne d'une fonctionnalité est la somme de ses notes divisée par son nombre de notes ; arrondissez au dixième si nécessaire.</p><ol><li>Combien de réponses ont été collectées au total ?</li><li>Quelle est la note moyenne du menu de la cantine ?</li><li>Quelle est la note moyenne de l'annuaire des services ?</li><li>Quelle fonctionnalité obtient la meilleure moyenne ?</li><li>Quelle fonctionnalité obtient la moins bonne moyenne ?</li></ol>",
    "starter": "# Exercice — Dépouiller le questionnaire des salariés de Novaterra\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 2 et 3 : la moyenne au dixième (par exemple 3,5). Questions 4 et 5 : le nom de la fonctionnalité.\n\n[Question 1 — Nombre total de réponses collectées]\nA_COMPLETER\n\n[Question 2 — Note moyenne du menu de la cantine]\nA_COMPLETER\n\n[Question 3 — Note moyenne de l'annuaire des services]\nA_COMPLETER\n\n[Question 4 — Fonctionnalité la mieux notée]\nA_COMPLETER\n\n[Question 5 — Fonctionnalité la moins bien notée]\nA_COMPLETER\n",
    "hints": [
      "Le dépouillement commence par les effectifs : comptez toutes les notes du tableau, toutes fonctionnalités confondues.",
      "La moyenne d'une fonctionnalité s'obtient en additionnant ses notes puis en divisant par son nombre de notes propre (qui varie d'une ligne à l'autre).",
      "1. Comptez : 5 + 6 + 5 + 4 = 20 réponses. 2. Cantine : (5 + 5 + 4 + 4 + 4)/5 = 22/5. 3. Annuaire : (5 + 4 + 4 + 4 + 3)/5 = 20/5. 4. Comparez les quatre moyennes pour classer. 5. La moins bonne moyenne se lit dans le même classement."
    ],
    "examples": [
      {
        "stdin": "La médiathèque de Rivage interroge ses lecteurs sur trois services :\n- Réservation en ligne : notes 5 ; 4 ; 4 (3 réponses) ;\n- Portail pour enfants : notes 5 ; 5 (2 réponses) ;\n- Impression à la demande : notes 2 ; 1 ; 2 (3 réponses).\n\n1) Total : 8 réponses.\n2) Réservation : 13/3 = 4,3.\n3) Portail enfants : 10/2 = 5,0 (meilleure moyenne).\n4) Impression : 5/3 = 1,7 (moins bonne moyenne).",
        "expected": "8 réponses — réservation 4,3 — portail enfants 5,0 (premier) — impression 1,7 (dernier)",
        "note": "Chaque fonctionnalité se moyenne sur son propre effectif : ne divisez jamais par le nombre total de répondants."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre total de réponses collectées",
        "stdin": "q:1",
        "expected": "20||vingt"
      },
      {
        "label": "Question 2 — Note moyenne du menu de la cantine",
        "stdin": "q:2",
        "expected": "4,4||4.4"
      },
      {
        "label": "Question 3 — Note moyenne de l'annuaire des services",
        "stdin": "q:3",
        "expected": "4,0||4.0||4"
      },
      {
        "label": "Question 4 — Fonctionnalité la mieux notée",
        "stdin": "q:4",
        "expected": "le menu de la cantine||menu de la cantine||la cantine||cantine"
      },
      {
        "label": "Question 5 — Fonctionnalité la moins bien notée",
        "stdin": "q:5",
        "expected": "les actualités de l'entreprise||actualités de l'entreprise||les actualites de l'entreprise||actualites de l'entreprise||les actualités||actualités"
      }
    ],
    "solution": "[Question 1 — Nombre total de réponses collectées]\n20\n\n[Question 2 — Note moyenne du menu de la cantine]\n4,4\n\n[Question 3 — Note moyenne de l'annuaire des services]\n4,0\n\n[Question 4 — Fonctionnalité la mieux notée]\nle menu de la cantine\n\n[Question 5 — Fonctionnalité la moins bien notée]\nles actualités de l'entreprise",
    "takeaway": "1) Effectif total : 5 (annuaire) + 6 (réservation) + 5 (cantine) + 4 (actualités) = 20 réponses.\n2) Menu de la cantine : (5 + 5 + 4 + 4 + 4)/5 = 22/5 = 4,4.\n3) Annuaire des services : (5 + 4 + 4 + 4 + 3)/5 = 20/5 = 4,0.\n4) Classement : cantine 4,4 ; annuaire 4,0 ; réservation 18/6 = 3,0 ; actualités 8/4 = 2,0. La mieux notée est le menu de la cantine.\n5) La moins bien notée est les actualités de l'entreprise (2,0).\nContrôle : la somme des moyennes pondérées par les effectifs redonne le total des notes : 22 + 20 + 18 + 8 = 68 points pour 20 réponses."
  },
  {
    "id": "ib2-c3-e3",
    "chapter": 3,
    "level": "n3",
    "language": "analyse",
    "title": "Personas : Abla la comptable et Marc le commercial",
    "exampleTitle": "Exemple résolu — le persona Germaine de la clinique du Golfe",
    "goal": "Vérifier la complétude d'un persona et mobiliser ses attributs : objectifs, frustrations, archétype.",
    "brief": "<p><strong>Énoncé.</strong> Pour l'application de gestion des notes de frais de la société TransSahel, l'analyste construit deux personas après une série d'entretiens.</p><p><strong>Persona 1 — Abla, comptable :</strong></p><ul><li>Objectifs : clôturer les notes de frais avant le 5 de chaque mois ; éviter les justificatifs papier perdus ; repérer les anomalies dès la saisie.</li><li>Frustrations : ressaisir les montants à la main ; relancer les managers par téléphone.</li></ul><p><strong>Persona 2 — Marc, commercial :</strong></p><ul><li>Objectifs : (aucun objectif formulé).</li><li>Frustrations : perdre du temps en fin de mois.</li></ul><p>Rappel du cours : un persona exploitable exige un nom, un rôle, <strong>au moins un objectif</strong> et <strong>au moins une frustration</strong> ; un persona est un archétype d'utilisateur, fictif mais réaliste, pas une personne réelle.</p><ol><li>Combien d'objectifs compte le persona d'Abla ?</li><li>Combien de frustrations compte le persona d'Abla ?</li><li>Le persona de Marc est-il complet ou incomplet ?</li><li>Quelle propriété lui manque-t-il ?</li><li>Un persona représente-t-il un utilisateur réel ou un archétype fictif ?</li></ol>",
    "starter": "# Exercice — Personas : Abla la comptable et Marc le commercial\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Question 4 : le nom de la propriété manquante.\n\n[Question 1 — Nombre d'objectifs du persona d'Abla]\nA_COMPLETER\n\n[Question 2 — Nombre de frustrations du persona d'Abla]\nA_COMPLETER\n\n[Question 3 — Statut du persona de Marc]\nA_COMPLETER\n\n[Question 4 — Propriété manquante du persona de Marc]\nA_COMPLETER\n\n[Question 5 — Nature d'un persona : utilisateur réel ou archétype fictif]\nA_COMPLETER\n",
    "hints": [
      "Un persona synthétise des comportements observés : ses objectifs disent ce que l'utilisateur cherche, ses frustrations ce qui le freine.",
      "Vérifiez les quatre propriétés dans l'ordre : nom, rôle, objectifs (au moins un), frustrations (au moins une).",
      "1. Comptez les objectifs d'Abla : clôturer, éviter, repérer. 2. Comptez ses frustrations : ressaisir, relancer. 3. Marc n'a formulé aucun objectif : son persona est incomplet. 4. La propriété manquante est donc les objectifs. 5. Un persona est un archétype fictif réaliste."
    ],
    "examples": [
      {
        "stdin": "Clinique du Golfe : persona Germaine, infirmière.\nObjectifs : préparer les tours de garde la veille ; éviter les doubles saisies de constantes.\nFrustrations : chercher les dossiers papier ; refaire les planning imprimés.\nSecond brouillon : persona « Kodjo », rôle vide, un objectif, une frustration.\n\n1) Germaine : 2 objectifs et 2 frustrations : persona complet.\n2) Kodjo : le rôle est vide : persona incomplet (propriété manquante : le rôle).",
        "expected": "Germaine complète (2 objectifs, 2 frustrations) — Kodjo incomplet (rôle manquant)",
        "note": "Le persona condense des dizaines d'entretiens en un portrait actionnable : chaque propriété manquante le rend inutilisable pour l'équipe."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre d'objectifs du persona d'Abla",
        "stdin": "q:1",
        "expected": "3||trois"
      },
      {
        "label": "Question 2 — Nombre de frustrations du persona d'Abla",
        "stdin": "q:2",
        "expected": "2||deux"
      },
      {
        "label": "Question 3 — Statut du persona de Marc",
        "stdin": "q:3",
        "expected": "incomplet||incomplète"
      },
      {
        "label": "Question 4 — Propriété manquante du persona de Marc",
        "stdin": "q:4",
        "expected": "les objectifs||objectifs||les objectifs formulés||au moins un objectif"
      },
      {
        "label": "Question 5 — Nature d'un persona : utilisateur réel ou archétype fictif",
        "stdin": "q:5",
        "expected": "un archétype fictif||archétype fictif||un archetype fictif||archetype fictif||un archétype||archétype"
      }
    ],
    "solution": "[Question 1 — Nombre d'objectifs du persona d'Abla]\n3\n\n[Question 2 — Nombre de frustrations du persona d'Abla]\n2\n\n[Question 3 — Statut du persona de Marc]\nincomplet\n\n[Question 4 — Propriété manquante du persona de Marc]\nles objectifs\n\n[Question 5 — Nature d'un persona : utilisateur réel ou archétype fictif]\nun archétype fictif",
    "takeaway": "1) Abla formule trois objectifs : clôturer avant le 5, éviter les justificatifs perdus, repérer les anomalies dès la saisie.\n2) Abla formule deux frustrations : ressaisir à la main, relancer par téléphone.\n3) Le persona de Marc est incomplet : il ne formule aucun objectif.\n4) La propriété manquante est les objectifs (au moins un objectif est exigé).\n5) Un persona est un archétype fictif, réaliste mais inventé, qui synthétise des comportements observés ; ce n'est jamais un utilisateur réel interrogé tel quel.\nContrôle : persona complet = nom + rôle + au moins un objectif + au moins une frustration ; Marc échoue sur le troisième terme."
  },
  {
    "id": "ib2-c4-e1",
    "chapter": 4,
    "level": "n1",
    "language": "analyse",
    "title": "User stories : le canevas Connextra d'EcoRide",
    "exampleTitle": "Exemple résolu — les stories de la médiathèque de Rivage",
    "goal": "Découper une user story selon le canevas Connextra : rôle, action et bénéfice, et repérer les stories non conformes.",
    "brief": "<p><strong>Énoncé.</strong> Pour l'application de covoiturage interne EcoRide (société Novaterra), l'équipe a rédigé trois user stories :</p><ul><li><strong>US-1</strong> : « En tant que salarié, je veux publier mon trajet domicile-travail, afin de partager mes frais de carburant. »</li><li><strong>US-2</strong> : « En tant que passagère, je veux réserver une place, afin d'arriver à l'heure au bureau. »</li><li><strong>US-3</strong> : « Je veux recevoir un SMS à chaque réservation de place. »</li></ul><p>Rappel du cours : le canevas canonique d'une user story s'écrit « <strong>En tant que</strong> rôle, <strong>je veux</strong> action, <strong>afin de</strong> bénéfice. »</p><ol><li>Quel est le rôle (le qui) de la US-1 ?</li><li>Quelle est l'action (le je veux) de la US-2 ?</li><li>Quel groupe de mots du canevas introduit le bénéfice ?</li><li>La US-3 respecte-t-elle le canevas Connextra ? Répondez par oui ou non.</li><li>Quelle composante du canevas manque à la US-3 ?</li></ol>",
    "starter": "# Exercice — User stories : le canevas Connextra d'EcoRide\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Question 4 : oui ou non. Question 5 : le rôle, l'action ou le bénéfice.\n\n[Question 1 — Rôle de la US-1]\nA_COMPLETER\n\n[Question 2 — Action de la US-2]\nA_COMPLETER\n\n[Question 3 — Mots du canevas qui introduisent le bénéfice]\nA_COMPLETER\n\n[Question 4 — La US-3 respecte-t-elle le canevas ?]\nA_COMPLETER\n\n[Question 5 — Composante manquante de la US-3]\nA_COMPLETER\n",
    "hints": [
      "Le canevas Connextra raconte une phrase à trois temps : qui agit (rôle), ce qu'il veut faire (action), ce qu'il y gagne (bénéfice).",
      "Repérez les trois marqueurs « En tant que », « je veux » et « afin de » ; le texte qui suit chaque marqueur donne la composante correspondante.",
      "1. US-1 : après « En tant que » vient le rôle. 2. US-2 : après « je veux » vient l'action. 3. Le bénéfice est introduit par « afin de ». 4. US-3 commence par « je veux » sans « En tant que » : elle est non conforme. 5. Le rôle manque."
    ],
    "examples": [
      {
        "stdin": "Médiathèque de Rivage, deux stories :\n- M-1 : « En tant qu'adhérent, je veux prolonger mon prêt en ligne, afin d'éviter les frais de retard. »\n- M-2 : « Je veux être notifié par courriel. »\n\n1) M-1 : rôle = adhérent ; action = prolonger mon prêt en ligne ; bénéfice = éviter les frais de retard (introduit par « afin de »).\n2) M-2 : non conforme, le rôle manque.",
        "expected": "M-1 conforme (adhérent / prolonger / éviter les frais) — M-2 non conforme : rôle manquant",
        "note": "Une story sans rôle ne dit pas pour qui le produit construit : le bénéfice devient invérifiable."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Rôle de la US-1",
        "stdin": "q:1",
        "expected": "le salarié||salarié||un salarié||l'employé||employé"
      },
      {
        "label": "Question 2 — Action de la US-2",
        "stdin": "q:2",
        "expected": "réserver une place||reserver une place||réserver une place dans un trajet||réserver une place de covoiturage"
      },
      {
        "label": "Question 3 — Mots du canevas qui introduisent le bénéfice",
        "stdin": "q:3",
        "expected": "afin de||afin de quel bénéfice||pour"
      },
      {
        "label": "Question 4 — La US-3 respecte-t-elle le canevas ?",
        "stdin": "q:4",
        "expected": "non||non, elle est non conforme||non conforme"
      },
      {
        "label": "Question 5 — Composante manquante de la US-3",
        "stdin": "q:5",
        "expected": "le rôle||rôle||le role||role||l'acteur||acteur"
      }
    ],
    "solution": "[Question 1 — Rôle de la US-1]\nle salarié\n\n[Question 2 — Action de la US-2]\nréserver une place\n\n[Question 3 — Mots du canevas qui introduisent le bénéfice]\nafin de\n\n[Question 4 — La US-3 respecte-t-elle le canevas ?]\nnon\n\n[Question 5 — Composante manquante de la US-3]\nle rôle",
    "takeaway": "1) Le rôle de la US-1 est le salarié ( « En tant que salarié » ).\n2) L'action de la US-2 est « réserver une place » (ce qui suit « je veux »).\n3) Le bénéfice est introduit par « afin de ».\n4) La US-3 ne respecte pas le canevas : elle commence directement par « je veux ».\n5) La composante manquante de la US-3 est le rôle : on ne sait pas pour quel utilisateur le SMS est prévu.\nContrôle : US-1 et US-2 portent les trois marqueurs (En tant que, je veux, afin de) ; US-3 n'en porte qu'un."
  },
  {
    "id": "ib2-c4-e2",
    "chapter": 4,
    "level": "n2",
    "language": "analyse",
    "title": "Priorisation MoSCoW d’un Backlog",
    "goal": "Calculer la répartition des points d’effort par catégorie MoSCoW dans un sprint ou une release.",
    "brief": "<p>La méthode <strong>MoSCoW</strong> classe les exigences en 4 catégories : <code>Must</code>, <code>Should</code>, <code>Could</code> et <code>Won't</code>.</p><p>À partir des données du cas :<br>- Première ligne : le nombre <code>N</code> d’exigences.<br>- Les <code>N</code> lignes suivantes : <code>ID;Titre;MoSCoW;Points</code> (Points est un entier &ge; 0).<br>Affichez un dictionnaire JSON avec les totaux par catégorie et le total général au format strict :<br><code>{\"Must\": X, \"Should\": Y, \"Could\": Z, \"Wont\": W, \"Total\": T}</code>.</p>",
    "starter": "# Grille d'analyse (ib2-c4-e2) — Priorisation MoSCoW d’un Backlog\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Test 1]\n# Données : REQ-01;Paiement;Must;8\n# Données : REQ-02;Remboursement;Must;5\nA_COMPLETER\n\n[Cas 2 — Test 2]\n# Données : US-10;Export;Could;3\n# Données : US-11;Audit;Wont;5\n# Données : US-12;SSO;Must;8\n# Données : US-13;PDF;Should;5\nA_COMPLETER\n\n[Cas 3 — Test 3]\n# Données : US-99;Refonte globale;Won't;13\nA_COMPLETER\n",
    "hints": [
      "Initialisez un dictionnaire avec {\"Must\": 0, \"Should\": 0, \"Could\": 0, \"Wont\": 0}.",
      "Attention à mapper \"Won't\" ou \"Wont\" vers la clé \"Wont\" dans la sortie JSON.",
      "Utilisez json.dumps(res) pour afficher le JSON sur une seule ligne."
    ],
    "examples": [
      {
        "stdin": "3\nUS-1;Connexion;Must;5\nUS-2;Filtres;Should;3\nUS-3;Theme sombre;Could;2",
        "expected": "{\"Must\": 5, \"Should\": 3, \"Could\": 2, \"Wont\": 0, \"Total\": 10}",
        "note": "Must: 5, Should: 3, Could: 2, Wont: 0, Total: 10 points."
      }
    ],
    "tests": [
      {
        "label": "Test 1",
        "stdin": "cas:1",
        "expected": "{\"Must\": 13, \"Should\": 0, \"Could\": 0, \"Wont\": 0, \"Total\": 13}"
      },
      {
        "label": "Test 2",
        "stdin": "cas:2",
        "expected": "{\"Must\": 8, \"Should\": 5, \"Could\": 3, \"Wont\": 5, \"Total\": 21}"
      },
      {
        "label": "Test 3",
        "stdin": "cas:3",
        "expected": "{\"Must\": 0, \"Should\": 0, \"Could\": 0, \"Wont\": 13, \"Total\": 13}"
      }
    ],
    "solution": "[Exemple]\n{\"Must\": 5, \"Should\": 3, \"Could\": 2, \"Wont\": 0, \"Total\": 10}\n\n[Cas 1 — Test 1]\n{\"Must\": 13, \"Should\": 0, \"Could\": 0, \"Wont\": 0, \"Total\": 13}\n\n[Cas 2 — Test 2]\n{\"Must\": 8, \"Should\": 5, \"Could\": 3, \"Wont\": 5, \"Total\": 21}\n\n[Cas 3 — Test 3]\n{\"Must\": 0, \"Should\": 0, \"Could\": 0, \"Wont\": 13, \"Total\": 13}\n",
    "takeaway": "À retenir : Calculer la répartition des points d’effort par catégorie MoSCoW dans un sprint ou une release.\nRepère : Must: 5, Should: 3, Could: 2, Wont: 0, Total: 10 points."
  },
  {
    "id": "ib2-c4-e3",
    "chapter": 4,
    "level": "n3",
    "language": "analyse",
    "title": "WSJF : chiffrer le coût du retard des fonctionnalités d'EcoRide",
    "exampleTitle": "Exemple résolu — les fonctionnalités logistiques de SaharaLog",
    "goal": "Calculer le coût du retard (CoD) et le score WSJF pour ordonnancer des fonctionnalités par valeur par unité de temps.",
    "brief": "<p><strong>Énoncé.</strong> Le comité produit de Novaterra priorise trois fonctionnalités d'EcoRide avec l'algorithme <strong>WSJF</strong> (Weighted Shortest Job First) issu de SAFe. Rappels :</p><ul><li><strong>CoD</strong> (coût du retard) = valeur métier + criticité temporelle + réduction de risque ;</li><li><strong>Score WSJF</strong> = CoD divisé par la taille du travail.</li></ul><p>Les estimations du comité :</p><table><tr><th>Fonctionnalité</th><th>Valeur métier</th><th>Criticité temporelle</th><th>Réduction de risque</th><th>Taille</th></tr><tr><th>F1</th><td>5</td><td>3</td><td>2</td><td>4</td></tr><tr><th>F2</th><td>8</td><td>5</td><td>3</td><td>4</td></tr><tr><th>F3</th><td>3</td><td>2</td><td>1</td><td>3</td></tr></table><p>Arrondissez les scores au dixième si nécessaire ; répondez par le nombre seul aux questions 1 à 3 et 6.</p><ol><li>Quel est le CoD de la fonctionnalité F2 ?</li><li>Quel est le score WSJF de F1 ?</li><li>Quel est le score WSJF de F2 ?</li><li>Quelle fonctionnalité le comité doit-il lancer en premier ?</li><li>Que désigne le sigle CoD en français ?</li><li>Quel est le score WSJF de F3 ?</li></ol>",
    "starter": "# Exercice — WSJF : chiffrer le coût du retard des fonctionnalités d'EcoRide\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 3 et 6 : le nombre seul. Question 4 : l'identifiant (F1, F2 ou F3).\n\n[Question 1 — CoD de la fonctionnalité F2]\nA_COMPLETER\n\n[Question 2 — Score WSJF de F1]\nA_COMPLETER\n\n[Question 3 — Score WSJF de F2]\nA_COMPLETER\n\n[Question 4 — Fonctionnalité à lancer en premier]\nA_COMPLETER\n\n[Question 5 — Signification française du sigle CoD]\nA_COMPLETER\n\n[Question 6 — Score WSJF de F3]\nA_COMPLETER\n",
    "hints": [
      "Le CoD additionne les trois composantes de valeur : métier, urgence et réduction de risque ; la taille ne compte pas dans le CoD.",
      "Le score WSJF divise le CoD par la taille : à valeur égale, la fonctionnalité la plus courte sort en tête.",
      "1. CoD de F2 : 8 + 5 + 3. 2. WSJF de F1 : (5 + 3 + 2)/4. 3. WSJF de F2 : 16/4. 4. Le plus grand score se lance en premier. 5. CoD = coût du retard. 6. WSJF de F3 : (3 + 2 + 1)/3."
    ],
    "examples": [
      {
        "stdin": "SaharaLog priorise ses fonctionnalités de suivi de flotte :\nG1 : valeur 6, criticité 4, risque 2, taille 3 ;\nG2 : valeur 3, criticité 1, risque 1, taille 2 ;\nG3 : valeur 9, criticité 6, risque 3, taille 6.\n\n1) CoD de G1 : 6 + 4 + 2 = 12 ; WSJF : 12/3 = 4,0.\n2) G2 : CoD 5 ; WSJF : 5/2 = 2,5.\n3) G3 : CoD 18 ; WSJF : 18/6 = 3,0.\n4) Ordre de lancement : G1 (4,0), puis G3 (3,0), puis G2 (2,5).",
        "expected": "G1 WSJF 4,0 (première) — G3 3,0 — G2 2,5 (dernière)",
        "note": "Le meilleur rapport valeur sur taille gagne, même si une autre fonctionnalité porte une valeur métier brute plus élevée."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — CoD de la fonctionnalité F2",
        "stdin": "q:1",
        "expected": "16"
      },
      {
        "label": "Question 2 — Score WSJF de F1",
        "stdin": "q:2",
        "expected": "2,5||2.5"
      },
      {
        "label": "Question 3 — Score WSJF de F2",
        "stdin": "q:3",
        "expected": "4,0||4.0||4"
      },
      {
        "label": "Question 4 — Fonctionnalité à lancer en premier",
        "stdin": "q:4",
        "expected": "F2||la fonctionnalité F2||le paiement intégré des frais"
      },
      {
        "label": "Question 5 — Signification française du sigle CoD",
        "stdin": "q:5",
        "expected": "le coût du retard||coût du retard||cout du retard||le cout du retard"
      },
      {
        "label": "Question 6 — Score WSJF de F3",
        "stdin": "q:6",
        "expected": "2,0||2.0||2"
      }
    ],
    "solution": "[Question 1 — CoD de la fonctionnalité F2]\n16\n\n[Question 2 — Score WSJF de F1]\n2,5\n\n[Question 3 — Score WSJF de F2]\n4,0\n\n[Question 4 — Fonctionnalité à lancer en premier]\nF2\n\n[Question 5 — Signification française du sigle CoD]\nle coût du retard\n\n[Question 6 — Score WSJF de F3]\n2,0",
    "takeaway": "1) CoD de F2 = 8 (valeur) + 5 (criticité) + 3 (risque) = 16.\n2) WSJF de F1 = (5 + 3 + 2)/4 = 10/4 = 2,5.\n3) WSJF de F2 = 16/4 = 4,0.\n4) F2 obtient le meilleur score (4,0 devant 2,5 et 2,0) : c'est elle qu'il faut lancer en premier.\n5) CoD signifie coût du retard (Cost of Delay).\n6) WSJF de F3 = (3 + 2 + 1)/3 = 6/3 = 2,0.\nContrôle : l'ordre WSJF est F2 (4,0), puis F1 (2,5), puis F3 (2,0) ; la somme des tailles vaut 4 + 4 + 3 = 11."
  },
  {
    "id": "ib2-c5-e1",
    "chapter": 5,
    "level": "n1",
    "language": "analyse",
    "title": "Codifier les exigences du SRS de TogoCapital",
    "exampleTitle": "Exemple résolu — la codification de l'assurance Sanavia",
    "goal": "Construire les identifiants normalisés DOMAINE-TYPE-Numéro d'un document de spécification (SRS).",
    "brief": "<p><strong>Énoncé.</strong> La direction des systèmes d'information de la banque TogoCapital rédige le SRS (Software Requirements Specification) de son application mobile, selon une codification inspirée de la norme ISO/IEC/IEEE 29148. Chaque exigence reçoit un identifiant au format <code>DOMAINE-TYPE-Numéro</code> :</p><ul><li>le domaine et le type sont convertis en majuscules ;</li><li>le type vaut <code>FR</code> (exigence fonctionnelle), <code>NFR</code> (exigence non fonctionnelle) ou <code>CON</code> (contrainte) ;</li><li>le numéro est complété par des zéros à gauche pour former toujours trois chiffres.</li></ul><p>Quatre exigences attendent leur identifiant :</p><table><tr><th>Domaine</th><th>Type</th><th>Numéro</th></tr><tr><th>auth</th><td>fr</td><td>7</td></tr><tr><th>pay</th><td>nfr</td><td>12</td></tr><tr><th>sec</th><td>con</td><td>3</td></tr><tr><th>loan</th><td>fr</td><td>104</td></tr></table><p>Répondez aux questions 1 à 4 par l'identifiant complet, au format AUTH-FR-007.</p><ol><li>Quel est l'identifiant de l'exigence (auth, fr, 7) ?</li><li>Quel est l'identifiant de l'exigence (pay, nfr, 12) ?</li><li>Quel est l'identifiant de l'exigence (sec, con, 3) ?</li><li>Quel est l'identifiant de l'exigence (loan, fr, 104) ?</li><li>Combien de chiffres le numéro comporte-t-il toujours dans un identifiant ?</li></ol>",
    "starter": "# Exercice — Codifier les exigences du SRS de TogoCapital\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 4 : l'identifiant complet au format AUTH-FR-007.\n\n[Question 1 — Identifiant de (auth, fr, 7)]\nA_COMPLETER\n\n[Question 2 — Identifiant de (pay, nfr, 12)]\nA_COMPLETER\n\n[Question 3 — Identifiant de (sec, con, 3)]\nA_COMPLETER\n\n[Question 4 — Identifiant de (loan, fr, 104)]\nA_COMPLETER\n\n[Question 5 — Nombre de chiffres du numéro]\nA_COMPLETER\n",
    "hints": [
      "L'identifiant se lit de gauche à droite : domaine en majuscules, tiret, type en majuscules, tiret, numéro sur trois chiffres.",
      "Le passage à trois chiffres se fait par des zéros à gauche : 7 devient 007, 12 devient 012 ; 104 en comporte déjà trois.",
      "1. auth devient AUTH, fr devient FR, 7 devient 007. 2. Répétez pour pay, nfr, 12. 3. Puis pour sec, con, 3. 4. loan, fr, 104 : aucun zéro à ajouter. 5. Le format impose toujours trois chiffres."
    ],
    "examples": [
      {
        "stdin": "L'assurance Sanavia codifie son SRS santé : DOMAINE-TYPE-Numéro,\nnuméro sur trois chiffres, domaine et type en majuscules.\n- (sante, nfr, 9) : SANTE-NFR-009 ;\n- (sinistre, fr, 42) : SINISTRE-FR-042 ;\n- (rgpd, con, 1) : RGPD-CON-001.\n\n1) Chaque identifiant convertit les minuscules en majuscules.\n2) Le numéro est complété de zéros : 9 donne 009, 1 donne 001.",
        "expected": "SANTE-NFR-009 — SINISTRE-FR-042 — RGPD-CON-001",
        "note": "Une codification stable et normalisée est la première condition de la traçabilité : chaque exigence reste adressable tout au long du projet."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Identifiant de (auth, fr, 7)",
        "stdin": "q:1",
        "expected": "AUTH-FR-007||auth-fr-007"
      },
      {
        "label": "Question 2 — Identifiant de (pay, nfr, 12)",
        "stdin": "q:2",
        "expected": "PAY-NFR-012||pay-nfr-012"
      },
      {
        "label": "Question 3 — Identifiant de (sec, con, 3)",
        "stdin": "q:3",
        "expected": "SEC-CON-003||sec-con-003"
      },
      {
        "label": "Question 4 — Identifiant de (loan, fr, 104)",
        "stdin": "q:4",
        "expected": "LOAN-FR-104||loan-fr-104"
      },
      {
        "label": "Question 5 — Nombre de chiffres du numéro",
        "stdin": "q:5",
        "expected": "3||trois||3 chiffres"
      }
    ],
    "solution": "[Question 1 — Identifiant de (auth, fr, 7)]\nAUTH-FR-007\n\n[Question 2 — Identifiant de (pay, nfr, 12)]\nPAY-NFR-012\n\n[Question 3 — Identifiant de (sec, con, 3)]\nSEC-CON-003\n\n[Question 4 — Identifiant de (loan, fr, 104)]\nLOAN-FR-104\n\n[Question 5 — Nombre de chiffres du numéro]\n3",
    "takeaway": "1) (auth, fr, 7) donne AUTH-FR-007 : domaine et type passent en majuscules, 7 est complété en 007.\n2) (pay, nfr, 12) donne PAY-NFR-012.\n3) (sec, con, 3) donne SEC-CON-003.\n4) (loan, fr, 104) donne LOAN-FR-104 : le numéro comporte déjà trois chiffres.\n5) Le numéro comporte toujours 3 chiffres, complétés par des zéros à gauche si nécessaire.\nContrôle : les quatre identifiants sont uniques et normalisés, prêts à être référencés dans la matrice de traçabilité."
  },
  {
    "id": "ib2-c5-e2",
    "chapter": 5,
    "level": "n2",
    "language": "analyse",
    "title": "L'audit de la matrice de traçabilité du dossier patient",
    "exampleTitle": "Exemple résolu — la RTM du logiciel de paie de Cotono",
    "goal": "Auditer une matrice de traçabilité des exigences : compter les liaisons non testées et les exigences orphelines de besoin métier.",
    "brief": "<p><strong>Énoncé.</strong> La clinique Sainte-Marie relit sa <strong>matrice de traçabilité des exigences</strong> (RTM) avant la recette du dossier patient informatisé. Chaque ligne relie un <strong>besoin métier</strong> (BRQ), une <strong>exigence système</strong> (SRQ) et un <strong>cas de test</strong> (TC). La valeur <code>AUCUN</code> signale une liaison manquante :</p><ul><li>une exigence système est <strong>non testée</strong> si son cas de test vaut <code>AUCUN</code> ;</li><li>une exigence système est <strong>sans besoin</strong> (orpheline) si son besoin métier vaut <code>AUCUN</code>.</li></ul><p>Les sept lignes de la matrice :</p><table><tr><th>Besoin métier</th><th>Exigence système</th><th>Cas de test</th></tr><tr><th>BRQ-01</th><td>SRQ-01</td><td>TC-01</td></tr><tr><th>BRQ-02</th><td>SRQ-02</td><td>TC-02</td></tr><tr><th>BRQ-03</th><td>SRQ-03</td><td>AUCUN</td></tr><tr><th>AUCUN</th><td>SRQ-04</td><td>TC-04</td></tr><tr><th>BRQ-04</th><td>SRQ-05</td><td>TC-03</td></tr><tr><th>BRQ-05</th><td>SRQ-06</td><td>AUCUN</td></tr><tr><th>AUCUN</th><td>SRQ-07</td><td>AUCUN</td></tr></table><ol><li>Combien de lignes compte la matrice ?</li><li>Combien d'exigences système sont non testées ?</li><li>Combien d'exigences système sont sans besoin métier ?</li><li>Combien de lignes sont parfaitement traçables (avec besoin métier et cas de test) ?</li><li>L'exigence SRQ-04 est-elle non testée ou sans besoin ?</li></ol>",
    "starter": "# Exercice — L'audit de la matrice de traçabilité du dossier patient\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par le nombre seul, sauf la question 5 (non testée ou sans besoin).\n\n[Question 1 — Nombre de lignes de la matrice]\nA_COMPLETER\n\n[Question 2 — Nombre d'exigences non testées]\nA_COMPLETER\n\n[Question 3 — Nombre d'exigences sans besoin métier]\nA_COMPLETER\n\n[Question 4 — Nombre de lignes parfaitement traçables]\nA_COMPLETER\n\n[Question 5 — Anomalie de SRQ-04]\nA_COMPLETER\n",
    "hints": [
      "La RTM répond à deux questions : chaque exigence sert-elle un besoin métier, et chaque exigence est-elle vérifiée par un test ?",
      "Parcourez la matrice colonne par colonne : TC à AUCUN signale une non-testée, BRQ à AUCUN signale une orpheline ; une ligne peut cumuler les deux.",
      "1. Comptez les lignes du tableau. 2. TC manquant : SRQ-03, SRQ-06, SRQ-07. 3. BRQ manquant : SRQ-04 et SRQ-07. 4. Lignes complètes : SRQ-01, SRQ-02, SRQ-05. 5. SRQ-04 possède un test (TC-04) mais aucun besoin."
    ],
    "examples": [
      {
        "stdin": "Le logiciel de paie de Cotono audite sa RTM (5 lignes) :\nBRQ-1/SRQ-1/TC-1 ; BRQ-2/SRQ-2/AUCUN ; AUCUN/SRQ-3/TC-3 ;\nBRQ-4/SRQ-4/TC-4 ; BRQ-5/SRQ-5/AUCUN.\n\n1) 5 lignes au total.\n2) Non testées (TC à AUCUN) : SRQ-2 et SRQ-5, soit 2.\n3) Sans besoin (BRQ à AUCUN) : SRQ-3, soit 1.\n4) Parfaitement traçables : 2 lignes (SRQ-1 et SRQ-4).",
        "expected": "5 lignes — 2 non testées — 1 sans besoin — 2 lignes complètes",
        "note": "Chaque colonne vide de la RTM est un risque : une exigence non testée ne sera pas vérifiée, une exigence orpheline ne sert aucun besoin."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre de lignes de la matrice",
        "stdin": "q:1",
        "expected": "7||sept"
      },
      {
        "label": "Question 2 — Nombre d'exigences non testées",
        "stdin": "q:2",
        "expected": "3||trois"
      },
      {
        "label": "Question 3 — Nombre d'exigences sans besoin métier",
        "stdin": "q:3",
        "expected": "2||deux"
      },
      {
        "label": "Question 4 — Nombre de lignes parfaitement traçables",
        "stdin": "q:4",
        "expected": "3||trois"
      },
      {
        "label": "Question 5 — Anomalie de SRQ-04",
        "stdin": "q:5",
        "expected": "sans besoin||elle est sans besoin||orpheline"
      }
    ],
    "solution": "[Question 1 — Nombre de lignes de la matrice]\n7\n\n[Question 2 — Nombre d'exigences non testées]\n3\n\n[Question 3 — Nombre d'exigences sans besoin métier]\n2\n\n[Question 4 — Nombre de lignes parfaitement traçables]\n3\n\n[Question 5 — Anomalie de SRQ-04]\nsans besoin",
    "takeaway": "1) La matrice compte 7 lignes, une par exigence système.\n2) Exigences non testées (TC à AUCUN) : SRQ-03, SRQ-06 et SRQ-07, soit 3.\n3) Exigences sans besoin métier (BRQ à AUCUN) : SRQ-04 et SRQ-07, soit 2.\n4) Lignes parfaitement traçables (BRQ et TC renseignés) : SRQ-01, SRQ-02 et SRQ-05, soit 3.\n5) SRQ-04 possède un cas de test (TC-04) mais aucun besoin métier : elle est sans besoin (orpheline).\nContrôle : 3 lignes complètes + 3 non testées + 2 sans besoin, en comptant SRQ-07 deux fois, redonne bien les 7 lignes : 3 + (3 + 2 - 1) = 7."
  },
  {
    "id": "ib2-c5-e3",
    "chapter": 5,
    "level": "n3",
    "language": "analyse",
    "title": "Parseur de critère d’acceptation Gherkin",
    "goal": "Structurer un critère d’acceptation Étant donné / Quand / Alors (Given / When / Then) en objet JSON.",
    "brief": "<p>En BDD (<em>Behavior-Driven Development</em>), analyse trois clauses avec ce <strong>parseur pédagogique volontairement limité</strong> :<br>Ligne 1 : <code>Etant donne &lt;contexte&gt;</code> ou <code>Étant donné &lt;contexte&gt;</code><br>Ligne 2 : <code>Quand &lt;evenement&gt;</code><br>Ligne 3 : <code>Alors &lt;resultat_attendu&gt;</code>.</p><p>La forme sans accents <code>Etant donne</code> est une tolérance de cet exercice. Le dialecte français officiel de Gherkin accepte aussi <code>Sachant que</code> : ce mot-clé est valide en Gherkin, mais ce parseur limité ne le prend pas en charge.</p><p>Pour les trois lignes d'un cas, retire le point final éventuel des contenus et affiche un dictionnaire JSON strict sur une ligne :<br><code>{\"contexte\": \"...\", \"evenement\": \"...\", \"resultat_attendu\": \"...\"}</code>.<br>Si une clause ne commence pas par l'une des formes prises en charge à sa ligne, affiche <code>ERREUR: Mot-cle non pris en charge par ce parseur</code>. Cette erreur décrit la limite du parseur, pas une invalidité générale du Gherkin.</p><p>Source consultée le 2026-10-30 : dialectes officiels de Cucumber, <code>https://github.com/cucumber/gherkin/blob/main/gherkin-languages.json</code>.</p>",
    "starter": "# Grille d'analyse (ib2-c5-e3) — Parseur de critère d’acceptation Gherkin\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Test 1]\n# Données : Etant donne un panier contenant 2 articles\n# Données : Quand l utilisateur clique sur Commander\n# Données : Alors la page de paiement s affiche\nA_COMPLETER\n\n[Cas 2 — Test 2]\n# Données : Sachant que le serveur tourne\n# Données : Quand une erreur 500 survient\n# Données : Alors une alerte est envoyee\nA_COMPLETER\n\n[Cas 3 — Test 3]\n# Données : Étant donné un mot de passe expire\n# Données : Quand l utilisateur saisit ses identifiants\n# Données : Alors un message invite au renouvellement.\nA_COMPLETER\n",
    "hints": [
      "Vérifiez que les lignes commencent respectivement par (etant donne / étant donné), (quand), (alors) ; Sachant que est valide en Gherkin mais hors du périmètre de ce parseur.",
      "Supprimez le préfixe et le point final éventuel.",
      "Affichez le résultat avec json.dumps(obj, ensure_ascii=False)."
    ],
    "examples": [
      {
        "stdin": "Etant donne un utilisateur connecte avec le solde 100€\nQuand il effectue un virement de 40€\nAlors son nouveau solde est de 60€.",
        "expected": "{\"contexte\": \"un utilisateur connecte avec le solde 100€\", \"evenement\": \"il effectue un virement de 40€\", \"resultat_attendu\": \"son nouveau solde est de 60€\"}",
        "note": "Le critère d’acceptation est structuré de façon non ambiguë et prêt pour l’automatisation."
      }
    ],
    "tests": [
      {
        "label": "Test 1",
        "stdin": "cas:1",
        "expected": "{\"contexte\": \"un panier contenant 2 articles\", \"evenement\": \"l utilisateur clique sur Commander\", \"resultat_attendu\": \"la page de paiement s affiche\"}"
      },
      {
        "label": "Test 2",
        "stdin": "cas:2",
        "expected": "ERREUR: Mot-cle non pris en charge par ce parseur"
      },
      {
        "label": "Test 3",
        "stdin": "cas:3",
        "expected": "{\"contexte\": \"un mot de passe expire\", \"evenement\": \"l utilisateur saisit ses identifiants\", \"resultat_attendu\": \"un message invite au renouvellement\"}"
      }
    ],
    "solution": "[Exemple]\n{\"contexte\": \"un utilisateur connecte avec le solde 100€\", \"evenement\": \"il effectue un virement de 40€\", \"resultat_attendu\": \"son nouveau solde est de 60€\"}\n\n[Cas 1 — Test 1]\n{\"contexte\": \"un panier contenant 2 articles\", \"evenement\": \"l utilisateur clique sur Commander\", \"resultat_attendu\": \"la page de paiement s affiche\"}\n\n[Cas 2 — Test 2]\nERREUR: Mot-cle non pris en charge par ce parseur\n\n[Cas 3 — Test 3]\n{\"contexte\": \"un mot de passe expire\", \"evenement\": \"l utilisateur saisit ses identifiants\", \"resultat_attendu\": \"un message invite au renouvellement\"}\n",
    "takeaway": "À retenir : Structurer un critère d’acceptation Étant donné / Quand / Alors (Given / When / Then) en objet JSON.\nRepère : Le critère d’acceptation est structuré de façon non ambiguë et prêt pour l’automatisation."
  },
  {
    "id": "ib2-c6-e1",
    "chapter": 6,
    "level": "n1",
    "language": "analyse",
    "title": "INVEST : deux user stories d'EcoRide passées au crible",
    "exampleTitle": "Exemple résolu — les stories de la médiathèque de Rivage",
    "goal": "Évaluer des user stories avec la grille INVEST et repérer les critères non satisfaits.",
    "brief": "<p><strong>Énoncé.</strong> L'équipe Scrum du projet EcoRide audite deux user stories de son backlog avec la grille <strong>INVEST</strong>. Chaque critère reçoit le verdict « conforme » ou « à revoir » :</p><ul><li><strong>US-21</strong> : « En tant que salarié, je veux saisir mon trajet quotidien, afin de trouver plus vite des covoitureurs. »</li><li><strong>US-22</strong> : « Refonte complète du module de réservation avec toutes les options possibles. »</li></ul><p>Le verdict de l'équipe :</p><table><tr><th>Critère INVEST</th><th>US-21</th><th>US-22</th></tr><tr><th>Indépendante</th><td>conforme</td><td>conforme</td></tr><tr><th>Négociable</th><td>conforme</td><td>à revoir (imposée par la direction, sans discussion possible)</td></tr><tr><th>Valeur</th><td>conforme</td><td>conforme</td></tr><tr><th>Estimable</th><td>conforme</td><td>à revoir (aucune donnée pour estimer)</td></tr><tr><th>Small</th><td>conforme</td><td>à revoir (une refonte complète ne tient pas dans un sprint)</td></tr><tr><th>Testable</th><td>conforme</td><td>à revoir (aucun critère d'acceptation)</td></tr></table><p>Pour les questions 3 et 4, répondez par la seule lettre du sigle INVEST.</p><ol><li>Quel est le score INVEST de la US-21, sur 6 ?</li><li>Quel est le score INVEST de la US-22, sur 6 ?</li><li>Quelle lettre de la grille vérifie que la story est suffisamment petite pour tenir dans un sprint ?</li><li>Quelle lettre de la grille exige des critères d'acceptation vérifiables ?</li><li>Que signifie la lettre N de INVEST ?</li></ol>",
    "starter": "# Exercice — INVEST : deux user stories d'EcoRide passées au crible\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 et 2 : le score sur 6. Questions 3 et 4 : la seule lettre. Question 5 : le mot.\n\n[Question 1 — Score INVEST de la US-21]\nA_COMPLETER\n\n[Question 2 — Score INVEST de la US-22]\nA_COMPLETER\n\n[Question 3 — Lettre qui vérifie la taille de la story]\nA_COMPLETER\n\n[Question 4 — Lettre qui exige des critères d'acceptation]\nA_COMPLETER\n\n[Question 5 — Signification de la lettre N]\nA_COMPLETER\n",
    "hints": [
      "INVEST signifie : Indépendante, Négociable, Valeur, Estimable, Small (suffisamment petite), Testable ; le score d'une story est le nombre de critères « conforme ».",
      "Pour la US-22, quatre critères sont à revoir : Négociable, Estimable, Small et Testable ; seuls Indépendante et Valeur restent conformes.",
      "1. US-21 : six verdicts conformes, score 6 sur 6. 2. US-22 : seuls Indépendante et Valeur sont conformes, score 2 sur 6. 3. La taille, c'est le S de Small. 4. La testabilité, c'est le T. 5. Le N signifie Négociable."
    ],
    "examples": [
      {
        "stdin": "La médiathèque de Rivage audite une story :\n« En tant qu'adhérent, je veux être notifié de la disponibilité d'un livre, afin de le réserver avant les autres. »\nVerdicts : Indépendante conforme, Négociable conforme, Valeur conforme, Estimable conforme, Small conforme, Testable à revoir (aucun délai de notification fixé).\n\n1) Score : 5 sur 6.\n2) Le seul critère à revoir est Testable : il manque un délai mesurable, par exemple « sous 5 minutes ».",
        "expected": "score 5/6 — seul critère à revoir : Testable",
        "note": "Une story presque conforme reste impropre à l'engagement en sprint : chaque critère INVEST manquant se paie pendant le développement."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Score INVEST de la US-21",
        "stdin": "q:1",
        "expected": "6||6 sur 6||six"
      },
      {
        "label": "Question 2 — Score INVEST de la US-22",
        "stdin": "q:2",
        "expected": "2||2 sur 6||deux"
      },
      {
        "label": "Question 3 — Lettre qui vérifie la taille de la story",
        "stdin": "q:3",
        "expected": "S||small||Small"
      },
      {
        "label": "Question 4 — Lettre qui exige des critères d'acceptation",
        "stdin": "q:4",
        "expected": "T||testable||Testable"
      },
      {
        "label": "Question 5 — Signification de la lettre N",
        "stdin": "q:5",
        "expected": "Négociable||négociable||negociable"
      }
    ],
    "solution": "[Question 1 — Score INVEST de la US-21]\n6\n\n[Question 2 — Score INVEST de la US-22]\n2\n\n[Question 3 — Lettre qui vérifie la taille de la story]\nS\n\n[Question 4 — Lettre qui exige des critères d'acceptation]\nT\n\n[Question 5 — Signification de la lettre N]\nNégociable",
    "takeaway": "1) La US-21 obtient 6 sur 6 : tous ses critères sont conformes.\n2) La US-22 n'est conforme que sur Indépendante et Valeur : son score est 2 sur 6.\n3) La lettre S (Small) vérifie que la story est suffisamment petite pour tenir dans un sprint.\n4) La lettre T (Testable) exige des critères d'acceptation vérifiables.\n5) La lettre N signifie Négociable : une story imposée sans discussion n'est pas négociable.\nContrôle : 6 critères évalués par story ; la US-22 cumule 4 critères à revoir (N, E, S, T) et 2 conformes (I, V)."
  },
  {
    "id": "ib2-c6-e2",
    "chapter": 6,
    "level": "n2",
    "language": "analyse",
    "title": "Analyse d'impact : la demande de changement d'EcoRide",
    "exampleTitle": "Exemple résolu — la demande de changement du logiciel de paie de Cotono",
    "goal": "Propager une modification d'exigence le long du graphe des dépendances pour identifier toutes les exigences impactées.",
    "brief": "<p><strong>Énoncé.</strong> La directrice des systèmes d'information de Novaterra demande de modifier l'exigence <strong>AUTH-1</strong> (authentification unique d'EcoRide). Avant d'accepter cette demande de changement, l'analyste dresse la liste des dépendances entre exigences, au format « source vers cible », où <strong>la cible dépend de la source</strong> :</p><table><tr><th>Dépendance</th><th>Lecture</th></tr><tr><th>AUTH-1 vers DASH-1</th><td>le tableau de bord DASH-1 dépend de l'authentification</td></tr><tr><th>AUTH-1 vers API-1</th><td>l'interface API-1 dépend de l'authentification</td></tr><tr><th>API-1 vers BILL-1</th><td>la facturation BILL-1 dépend de l'interface API-1</td></tr><tr><th>BILL-1 vers REP-1</th><td>le reporting REP-1 dépend de la facturation</td></tr><tr><th>DASH-1 vers REP-2</th><td>le reporting REP-2 dépend du tableau de bord</td></tr><tr><th>LOG-1 vers AUTH-1</th><td>l'authentification AUTH-1 dépend de la journalisation LOG-1</td></tr></table><p>Une exigence est impactée si elle est modifiée elle-même ou si elle dépend, directement ou indirectement, d'une exigence modifiée.</p><p>Pour les questions 3 et 4, répondez par oui ou non.</p><ol><li>Combien d'exigences sont impactées au total, AUTH-1 comprise ?</li><li>Combien d'exigences dépendent directement d'AUTH-1 ?</li><li>BILL-1 est-elle impactée par la modification ?</li><li>LOG-1 est-elle impactée par la modification ?</li><li>Quel comité, désigné par le sigle anglais CCB, statue sur cette demande de changement ? Donnez le sigle.</li></ol>",
    "starter": "# Exercice — Analyse d'impact : la demande de changement d'EcoRide\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 3 et 4 : oui ou non. Question 5 : le sigle (par exemple CCB).\n\n[Question 1 — Nombre total d'exigences impactées, AUTH-1 comprise]\nA_COMPLETER\n\n[Question 2 — Exigences dépendant directement d'AUTH-1]\nA_COMPLETER\n\n[Question 3 — BILL-1 est-elle impactée ?]\nA_COMPLETER\n\n[Question 4 — LOG-1 est-elle impactée ?]\nA_COMPLETER\n\n[Question 5 — Sigle du comité qui statue sur la demande]\nA_COMPLETER\n",
    "hints": [
      "Les dépendances se propagent de la source vers la cible : modifier AUTH-1 touche tout ce qui en dépend, puis tout ce qui dépend des dépendances.",
      "Attention au sens de chaque flèche : seule la cible subit la source. La ligne LOG-1 vers AUTH-1 place AUTH-1 du côté cible : modifier AUTH-1 ne remonte pas vers LOG-1.",
      "1. Partez d'AUTH-1 : DASH-1 et API-1 en dépendent directement. 2. De API-1 découle BILL-1, puis REP-1 ; de DASH-1 découle REP-2. 3. Comptez l'ensemble : AUTH-1, DASH-1, API-1, BILL-1, REP-1, REP-2. 4. LOG-1 n'apparaît jamais comme cible d'une chaîne partant d'AUTH-1 : elle est épargnée. 5. Le comité s'appelle la CCB."
    ],
    "examples": [
      {
        "stdin": "Le logiciel de paie de Cotono reçoit une demande de modification de PAIE-1.\nDépendances (la cible dépend de la source) :\nPAIE-1 vers BUL-1 ; PAIE-1 vers COMPTA-1 ; BUL-1 vers ARCH-1 ;\nRH-1 vers PAIE-1.\n\n1) Impact total : PAIE-1 (modifiée), BUL-1, COMPTA-1 (dépendances directes) et ARCH-1 (via BUL-1), soit 4 exigences.\n2) Deux exigences dépendent directement de PAIE-1 : BUL-1 et COMPTA-1.\n3) RH-1 n'est pas impactée : la ligne RH-1 vers PAIE-1 en fait une source, et une modification ne remonte jamais vers ses sources.",
        "expected": "4 exigences impactées — 2 dépendances directes — RH-1 épargnée",
        "note": "L'analyse d'impact suit le sens des flèches depuis l'exigence modifiée : jamais en sens inverse."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre total d'exigences impactées, AUTH-1 comprise",
        "stdin": "q:1",
        "expected": "6||six"
      },
      {
        "label": "Question 2 — Exigences dépendant directement d'AUTH-1",
        "stdin": "q:2",
        "expected": "2||deux"
      },
      {
        "label": "Question 3 — BILL-1 est-elle impactée ?",
        "stdin": "q:3",
        "expected": "oui"
      },
      {
        "label": "Question 4 — LOG-1 est-elle impactée ?",
        "stdin": "q:4",
        "expected": "non"
      },
      {
        "label": "Question 5 — Sigle du comité qui statue sur la demande",
        "stdin": "q:5",
        "expected": "CCB||la CCB||Change Control Board||ccb"
      }
    ],
    "solution": "[Question 1 — Nombre total d'exigences impactées, AUTH-1 comprise]\n6\n\n[Question 2 — Exigences dépendant directement d'AUTH-1]\n2\n\n[Question 3 — BILL-1 est-elle impactée ?]\noui\n\n[Question 4 — LOG-1 est-elle impactée ?]\nnon\n\n[Question 5 — Sigle du comité qui statue sur la demande]\nCCB",
    "takeaway": "1) Sont impactées : AUTH-1 (modifiée), DASH-1 et API-1 (dépendances directes), BILL-1 (via API-1), REP-1 (via BILL-1) et REP-2 (via DASH-1) : 6 exigences au total.\n2) Deux exigences dépendent directement d'AUTH-1 : DASH-1 et API-1.\n3) Oui, BILL-1 est impactée : elle dépend d'API-1, qui dépend d'AUTH-1 (propagation indirecte).\n4) Non, LOG-1 n'est pas impactée : la dépendance LOG-1 vers AUTH-1 fait de LOG-1 une source ; sa modification toucherait AUTH-1, mais l'inverse ne la touche pas.\n5) La demande est arbitrée par la CCB (Change Control Board), le comité de contrôle des changements.\nContrôle : 1 exigence modifiée + 2 dépendances directes + 3 dépendances indirectes = 6 exigences impactées."
  },
  {
    "id": "ib2-c6-e3",
    "chapter": 6,
    "level": "n3",
    "language": "analyse",
    "title": "Baseline V1.1 : le comparatif des référentiels d'EcoRide",
    "exampleTitle": "Exemple résolu — les baselines du logiciel de paie de Cotono",
    "goal": "Comparer deux baselines d'exigences pour chiffrer ajouts, modifications, suppressions et exigences inchangées.",
    "brief": "<p><strong>Énoncé.</strong> Au jalon de fin de recette de la version 1.0 d'EcoRide, l'équipe fige une nouvelle <strong>baseline</strong> du référentiel d'exigences : un instantané complet et nommé, qui servira de référence. Chaque exigence y est identifiée par son code et une empreinte qui résume son contenu. La baseline V1.0 (validée au cadrage) et la baseline V1.1 (fin de recette) se comparent ainsi :</p><table><tr><th>Baseline</th><th>Exigences (code : empreinte)</th></tr><tr><th>V1.0</th><td>REQ-1 : a1 ; REQ-2 : b2 ; REQ-3 : c3 ; REQ-4 : d4</td></tr><tr><th>V1.1</th><td>REQ-1 : a1 ; REQ-2 : b9 ; REQ-4 : d4 ; REQ-5 : e5</td></tr></table><p>Règles de comparaison :</p><ul><li>un <strong>ajout</strong> est un code présent en V1.1 et absent de V1.0 ;</li><li>une <strong>suppression</strong> est un code présent en V1.0 et absent de V1.1 ;</li><li>une <strong>modification</strong> est un code présent dans les deux baselines avec des empreintes différentes ;</li><li>une exigence est <strong>inchangée</strong> si son code et son empreinte sont identiques dans les deux baselines.</li></ul><ol><li>Combien d'exigences ont été ajoutées entre V1.0 et V1.1 ?</li><li>Combien d'exigences ont été modifiées ?</li><li>Combien d'exigences ont été supprimées ?</li><li>Combien d'exigences sont inchangées ?</li><li>Quel est le code de l'exigence ajoutée ?</li><li>Quel est le code de l'exigence supprimée ?</li></ol>",
    "starter": "# Exercice — Baseline V1.1 : le comparatif des référentiels d'EcoRide\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 4 : le nombre seul. Questions 5 et 6 : le code (par exemple REQ-1).\n\n[Question 1 — Nombre d'ajouts]\nA_COMPLETER\n\n[Question 2 — Nombre de modifications]\nA_COMPLETER\n\n[Question 3 — Nombre de suppressions]\nA_COMPLETER\n\n[Question 4 — Nombre d'exigences inchangées]\nA_COMPLETER\n\n[Question 5 — Code de l'exigence ajoutée]\nA_COMPLETER\n\n[Question 6 — Code de l'exigence supprimée]\nA_COMPLETER\n",
    "hints": [
      "Une baseline est une photographie figée du référentiel : on compare deux photographies code par code, puis empreinte par empreinte.",
      "Commencez par les codes présents d'un seul côté (ajouts et suppressions), puis comparez les empreintes des codes présents des deux côtés (modifications et inchangées).",
      "1. Codes de V1.1 absents de V1.0 : REQ-5. 2. Codes communs avec empreintes différentes : REQ-2 (b2 contre b9). 3. Codes de V1.0 absents de V1.1 : REQ-3. 4. Codes communs à empreintes identiques : REQ-1 et REQ-4. 5. et 6. reprennent les conclusions des points 1 et 3."
    ],
    "examples": [
      {
        "stdin": "Le logiciel de paie de Cotono compare deux baselines :\nV1. P-1 : x1 ; P-2 : x2 ; P-3 : x3\nV2. P-1 : x1 ; P-3 : x9 ; P-4 : x4 ; P-5 : x5\n\n1) Ajouts : P-4 et P-5, soit 2.\n2) Modifications : P-3 (x3 contre x9), soit 1.\n3) Suppressions : P-2, soit 1.\n4) Inchangées : P-1, soit 1.",
        "expected": "2 ajouts — 1 modification — 1 suppression — 1 inchangée",
        "note": "Le bilan d'une baseline se lit toujours dans le même ordre : ajouts, modifications, suppressions, inchangées ; leur somme redonne la taille des référentiels comparés."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre d'ajouts",
        "stdin": "q:1",
        "expected": "1||un"
      },
      {
        "label": "Question 2 — Nombre de modifications",
        "stdin": "q:2",
        "expected": "1||un"
      },
      {
        "label": "Question 3 — Nombre de suppressions",
        "stdin": "q:3",
        "expected": "1||un"
      },
      {
        "label": "Question 4 — Nombre d'exigences inchangées",
        "stdin": "q:4",
        "expected": "2||deux"
      },
      {
        "label": "Question 5 — Code de l'exigence ajoutée",
        "stdin": "q:5",
        "expected": "REQ-5||req-5"
      },
      {
        "label": "Question 6 — Code de l'exigence supprimée",
        "stdin": "q:6",
        "expected": "REQ-3||req-3"
      }
    ],
    "solution": "[Question 1 — Nombre d'ajouts]\n1\n\n[Question 2 — Nombre de modifications]\n1\n\n[Question 3 — Nombre de suppressions]\n1\n\n[Question 4 — Nombre d'exigences inchangées]\n2\n\n[Question 5 — Code de l'exigence ajoutée]\nREQ-5\n\n[Question 6 — Code de l'exigence supprimée]\nREQ-3",
    "takeaway": "1) Un seul ajout : REQ-5, présent en V1.1 et absent de V1.0.\n2) Une seule modification : REQ-2, présente dans les deux baselines avec des empreintes différentes (b2 puis b9).\n3) Une seule suppression : REQ-3, présent en V1.0 et absent de V1.1.\n4) Deux exigences inchangées : REQ-1 et REQ-4, mêmes codes et mêmes empreintes dans les deux baselines.\n5) L'exigence ajoutée est REQ-5.\n6) L'exigence supprimée est REQ-3.\nContrôle : V1.0 compte 4 exigences = 2 inchangées + 1 modifiée + 1 supprimée ; V1.1 compte aussi 4 exigences = 2 inchangées + 1 modifiée + 1 ajoutée."
  }
];
