'use strict';

module.exports = [
  {
    "id": "az3-c6-e1",
    "chapter": 6,
    "level": "n1",
    "language": "analyse",
    "title": "Les premières requêtes KQL du support de Tic-Tac Web",
    "exampleTitle": "Exemple résolu — la supervision de la chaîne ClubAltitude",
    "goal": "Lire une requête KQL (Kusto) du service Log Analytics et identifier le rôle de chaque opérateur.",
    "brief": "<p><strong>Énoncé.</strong> Tic-Tac Web, agence digitale de 40 salariés, supervise l'application d'un client dans Azure Monitor. La responsable support interroge la table <code>AppRequests</code> (une ligne par requête HTTP reçue par l'application) avec la requête KQL suivante :</p><p><code>AppRequests<br>| where resultCode == 500<br>| summarize Total = count() by appName<br>| order by Total desc<br>| take 5</code></p><ol><li>Quel opérateur KQL filtre les lignes selon une condition ?</li><li>Que renvoie <code>summarize Total = count() by appName</code> ?</li><li>Que fait <code>order by Total desc</code> ?</li><li>Combien de lignes au maximum <code>take 5</code> renvoie-t-il ?</li><li>Quelles requêtes HTTP la condition <code>resultCode == 500</code> isole-t-elle ?</li></ol>",
    "starter": "# Exercice — Les premières requêtes KQL du support de Tic-Tac Web\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Question 1 : l'opérateur seul. Questions 2, 3 et 5 : répondez de façon courte.\n\n[Question 1 — Opérateur qui filtre les lignes selon une condition]\nA_COMPLETER\n\n[Question 2 — Ce que renvoie summarize Total = count() by appName]\nA_COMPLETER\n\n[Question 3 — Ce que fait order by Total desc]\nA_COMPLETER\n\n[Question 4 — Nombre maximum de lignes renvoyées par take 5]\nA_COMPLETER\n\n[Question 5 — Requêtes HTTP isolées par resultCode == 500]\nA_COMPLETER\n",
    "hints": [
      "Une requête KQL se lit comme une chaîne : chaque opérateur, séparé par une barre verticale, transforme la table produite par le précédent.",
      "where réduit la table, summarize agrège (compte) par groupe, order by trie, take limite le nombre de lignes.",
      "1. C'est le mot-clé de filtre. 2. count() compte, by appName groupe. 3. desc signifie décroissant. 4. Le chiffre de take est le plafond. 5. Le code HTTP 500 correspond à une famille d'erreurs connue."
    ],
    "examples": [
      {
        "stdin": "L'application de la chaîne de salles de sport ClubAltitude est supervisée avec :\n\nTraceLog\n| where severityLevel == 2\n| summarize Occurrences = count() by region\n| order by Occurrences asc\n| take 3\n\n1) where filtre les lignes : il ne garde que les traces de sévérité 2.\n2) summarize Occurrences = count() by region compte les lignes par région.\n3) order by Occurrences asc trie par ordre croissant.\n4) take 3 renvoie au maximum 3 lignes.\n5) severityLevel == 2 isole les traces d'erreur.",
        "expected": "where filtre — comptage par région — tri croissant — 3 lignes maximum — traces d'erreur",
        "note": "Chaque opérateur KQL reçoit la table du précédent et rend une table : l'ordre des opérateurs détermine donc le résultat."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Opérateur qui filtre les lignes selon une condition",
        "stdin": "q:1",
        "expected": "where||le where||l'opérateur where"
      },
      {
        "label": "Question 2 — Ce que renvoie summarize Total = count() by appName",
        "stdin": "q:2",
        "expected": "le nombre de requêtes par application||un comptage par application||le total groupé par application||le nombre de lignes par application||le nombre de requêtes groupées par application"
      },
      {
        "label": "Question 3 — Ce que fait order by Total desc",
        "stdin": "q:3",
        "expected": "un tri décroissant||tri décroissant||il trie les lignes par total décroissant||tri par ordre décroissant||trie par ordre décroissant"
      },
      {
        "label": "Question 4 — Nombre maximum de lignes renvoyées par take 5",
        "stdin": "q:4",
        "expected": "5||cinq"
      },
      {
        "label": "Question 5 — Requêtes HTTP isolées par resultCode == 500",
        "stdin": "q:5",
        "expected": "les erreurs serveur||erreurs serveur||les erreurs 500||les requêtes en erreur 500||le code http 500||les réponses http 500"
      }
    ],
    "solution": "[Question 1 — Opérateur qui filtre les lignes selon une condition]\nwhere\n\n[Question 2 — Ce que renvoie summarize Total = count() by appName]\nle nombre de requêtes par application\n\n[Question 3 — Ce que fait order by Total desc]\nun tri décroissant\n\n[Question 4 — Nombre maximum de lignes renvoyées par take 5]\n5\n\n[Question 5 — Requêtes HTTP isolées par resultCode == 500]\nles erreurs serveur",
    "takeaway": "1) L'opérateur where filtre les lignes selon une condition : il ne garde que celles qui la vérifient.\n2) summarize Total = count() by appName renvoie le nombre de requêtes (en erreur 500) groupées par application : une ligne par appName avec son total.\n3) order by Total desc trie les lignes par total décroissant (du plus grand au plus petit).\n4) take 5 renvoie au maximum 5 lignes.\n5) La condition resultCode == 500 isole les requêtes HTTP qui ont reçu le code 500 : les erreurs serveur.\nContrôle : la requête se lit « dans AppRequests, garde les erreurs 500, compte-les par application, trie du plus grand total au plus petit, garde les 5 premières lignes »."
  },
  {
    "id": "az3-c6-e2",
    "chapter": 6,
    "level": "n2",
    "language": "analyse",
    "title": "L'alerte CPU et le budget de la plateforme Mezzaluna",
    "exampleTitle": "Exemple résolu — l'alerte du serveur du musée Lumière",
    "goal": "Paramétrer une règle d'alerte Azure Monitor (seuil, fenêtre d'agrégation, groupe d'action) et un budget FinOps, puis vérifier leur déclenchement.",
    "brief": "<p><strong>Énoncé.</strong> Mezzaluna, groupe de 8 restaurants, exploite sa plateforme de réservation sur une machine virtuelle supervisée par Azure Monitor. La règle d'alerte configurée :</p><ul><li>signal : pourcentage UC (processeur) de la machine virtuelle ;</li><li>seuil : 80 % ;</li><li>fenêtre d'agrégation : moyenne sur 5 minutes ;</li><li>fréquence d'évaluation : toutes les minutes ;</li><li>groupe d'action : notification par SMS à l'agent d'astreinte.</li></ul><p>Côté FinOps, le budget mensuel est fixé à <strong>2 000 €</strong>, avec une alerte configurée à <strong>80 % du budget</strong>. Le 12 du mois, le coût cumulé de la plateforme atteint <strong>1 650 €</strong>.</p><ol><li>À quelle condition la règle d'alerte CPU se déclenche-t-elle ?</li><li>Quel montant, en euros, déclenche l'alerte budgétaire ?</li><li>Au 12 du mois, l'alerte budgétaire est-elle déjà déclenchée ?</li><li>Qui l'alerte notifie-t-elle grâce au groupe d'action ?</li><li>La fenêtre d'agrégation étant de 5 minutes et l'évaluation toutes les minutes, combien de mesures la fenêtre agrège-t-elle ?</li></ol>",
    "starter": "# Exercice — L'alerte CPU et le budget de la plateforme Mezzaluna\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Question 2 : le montant seul. Questions 1 et 4 : répondez de façon courte.\n\n[Question 1 — Condition de déclenchement de l'alerte CPU]\nA_COMPLETER\n\n[Question 2 — Montant déclenchant l'alerte budgétaire (en €)]\nA_COMPLETER\n\n[Question 3 — Alerte budgétaire déjà déclenchée au 12 du mois]\nA_COMPLETER\n\n[Question 4 — Destinataire de la notification via le groupe d'action]\nA_COMPLETER\n\n[Question 5 — Nombre de mesures agrégées dans la fenêtre de 5 minutes]\nA_COMPLETER\n",
    "hints": [
      "Le seuil porte sur la moyenne de la fenêtre d'agrégation, pas sur un pic instantané.",
      "L'alerte budgétaire se déclenche au franchissement d'un pourcentage du budget : multipliez le budget par ce pourcentage.",
      "1. Relisez signal, seuil et fenêtre. 2. Calculez 80 % de 2 000 €. 3. Comparez 1 650 € au seuil trouvé. 4. Le groupe d'action définit qui est prévenu. 5. Une évaluation par minute dans une fenêtre de 5 minutes."
    ],
    "examples": [
      {
        "stdin": "Le musée Lumière surveille son serveur de billetterie : seuil UC 75 %, fenêtre\nd'agrégation 15 minutes, évaluation toutes les 5 minutes, groupe d'action : courriel\nà l'exploitation. Budget mensuel 3 000 €, alerte à 90 %.\n\n1) L'alerte se déclenche quand la moyenne d'UC sur 15 minutes dépasse 75 %.\n2) L'alerte budgétaire se déclenche à 90 % de 3 000 €, soit 2 700 €.\n3) À 2 500 € consommés, l'alerte n'est pas encore déclenchée.\n4) Le groupe d'action envoie un courriel à l'exploitation.\n5) La fenêtre de 15 minutes évaluée toutes les 5 minutes agrège 3 mesures.",
        "expected": "moyenne UC > 75 % sur 15 minutes — seuil budgétaire : 2 700 € — 2 500 € : pas encore déclenchée — courriel à l'exploitation — 3 mesures",
        "note": "Le seuil d'alerte porte sur la moyenne de la fenêtre, pas sur un pic instantané : un pic isolé ne déclenche rien."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Condition de déclenchement de l'alerte CPU",
        "stdin": "q:1",
        "expected": "quand la moyenne du processeur sur 5 minutes dépasse 80 %||quand la moyenne du cpu sur 5 minutes depasse 80 %||moyenne cpu > 80 % pendant 5 minutes||cpu moyen > 80 % sur 5 minutes||quand le processeur moyen dépasse 80 % pendant 5 minutes"
      },
      {
        "label": "Question 2 — Montant déclenchant l'alerte budgétaire (en €)",
        "stdin": "q:2",
        "expected": "1600||1 600||1600 €||1 600 €"
      },
      {
        "label": "Question 3 — Alerte budgétaire déjà déclenchée au 12 du mois",
        "stdin": "q:3",
        "expected": "oui"
      },
      {
        "label": "Question 4 — Destinataire de la notification via le groupe d'action",
        "stdin": "q:4",
        "expected": "l'agent d'astreinte||l'astreinte||l'agent d'astreinte par sms||l'équipe d'astreinte"
      },
      {
        "label": "Question 5 — Nombre de mesures agrégées dans la fenêtre de 5 minutes",
        "stdin": "q:5",
        "expected": "5||cinq||5 mesures"
      }
    ],
    "solution": "[Question 1 — Condition de déclenchement de l'alerte CPU]\nquand la moyenne du processeur sur 5 minutes dépasse 80 %\n\n[Question 2 — Montant déclenchant l'alerte budgétaire (en €)]\n1600\n\n[Question 3 — Alerte budgétaire déjà déclenchée au 12 du mois]\noui\n\n[Question 4 — Destinataire de la notification via le groupe d'action]\nl'agent d'astreinte\n\n[Question 5 — Nombre de mesures agrégées dans la fenêtre de 5 minutes]\n5",
    "takeaway": "1) L'alerte se déclenche quand la moyenne du pourcentage UC sur 5 minutes dépasse 80 %.\n2) L'alerte budgétaire se déclenche à 80 % de 2 000 €, soit 1 600 €.\n3) Oui : au 12 du mois, 1 650 € sont déjà consommés, au-delà du seuil de 1 600 €.\n4) Le groupe d'action notifie l'agent d'astreinte, par SMS.\n5) Avec une évaluation par minute, la fenêtre de 5 minutes agrège 5 mesures.\nContrôle : 1 650 € représente 1 650/2 000 = 82,5 % du budget, au-delà des 80 % configurés."
  },
  {
    "id": "az3-c6-e3",
    "chapter": 6,
    "level": "n3",
    "language": "analyse",
    "title": "Le gabarit Bicep de la coopérative Ardoise",
    "exampleTitle": "Exemple résolu — le gabarit de l'association Vélocité",
    "goal": "Lire un fichier Bicep déclaratif (paramètre, ressource, référence SKU) et justifier les apports de l'Infrastructure as Code.",
    "brief": "<p><strong>Énoncé.</strong> Ardoise, coopérative d'artisans du bâtiment, a longtemps créé ses ressources Azure à la main, dans le portail. L'ingénieur cloud remplace désormais ces manipulations par un fichier Bicep versionné dans le dépôt Git, dont voici un extrait :</p><p><code>param location string = 'francecentral'<br><br>resource st 'Microsoft.Storage/storageAccounts@2023-05-01' = {<br>name: 'stoardoiseprod01'<br>location: location<br>sku: { name: 'Standard_LRS' }<br>}</code></p><ol><li>Que fait la première ligne du fichier : <code>param location string = 'francecentral'</code> ?</li><li>Que déclare le mot-clé <code>resource</code> dans ce fichier ?</li><li>Quelle option de réplication du stockage la référence <code>Standard_LRS</code> applique-t-elle ?</li><li>Si le déploiement est relancé à l'identique alors que le compte de stockage existe déjà, que fait l'outil ?</li><li>Quel apport majeur l'Infrastructure as Code offre-t-elle par rapport aux créations manuelles dans le portail ?</li></ol>",
    "starter": "# Exercice — Le gabarit Bicep de la coopérative Ardoise\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 4 : répondez de façon courte.\n\n[Question 1 — Rôle de la ligne param location string = 'francecentral']\nA_COMPLETER\n\n[Question 2 — Ce que déclare le mot-clé resource]\nA_COMPLETER\n\n[Question 3 — Réplication appliquée par la référence Standard_LRS]\nA_COMPLETER\n\n[Question 4 — Comportement d'un déploiement relancé à l'identique]\nA_COMPLETER\n\n[Question 5 — Apport majeur de l'Infrastructure as Code]\nA_COMPLETER\n",
    "hints": [
      "Un fichier Bicep est déclaratif : il décrit l'état souhaité des ressources, pas la suite de clics pour y parvenir.",
      "Le mot-clé param introduit un paramètre ; la valeur après le signe « = » est sa valeur par défaut.",
      "1. Lisez la première ligne : un nom, un type, une valeur par défaut. 2. resource introduit une ressource Azure. 3. LRS est un acronyme de réplication du cours. 4. Un déploiement déclaratif relancé ne duplique pas les ressources. 5. Pensez à ce que le versionnement dans Git apporte aux environnements."
    ],
    "examples": [
      {
        "stdin": "L'association Vélocité déploie son site par gabarit déclaratif :\n\nparam location string = 'northeurope'\nresource app 'Microsoft.Web/sites@2023-12-01' = {\nname: 'app-velocite-prod-01'\nlocation: location\n}\n\n1) La première ligne définit un paramètre avec la valeur par défaut northeurope.\n2) Le mot-clé resource déclare une ressource Azure, ici une application web.\n3) Relancé à l'identique, le déploiement met à jour la ressource existante : il est idempotent.\n4) Le principal apport : des environnements reproductibles, versionnés dans Git.",
        "expected": "paramètre northeurope par défaut — resource déclare une ressource Azure — relance : mise à jour de l'existant — apport : des environnements reproductibles",
        "note": "Un gabarit déclaratif décrit l'état souhaité : relancé tel quel, il rattrape les dérives sans dupliquer les ressources — c'est l'idempotence."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Rôle de la ligne param location string = 'francecentral'",
        "stdin": "q:1",
        "expected": "elle définit un paramètre avec une valeur par défaut||un paramètre avec francecentral en valeur par défaut||elle définit un paramètre location avec la valeur par défaut francecentral||elle déclare un paramètre et sa valeur par défaut"
      },
      {
        "label": "Question 2 — Ce que déclare le mot-clé resource",
        "stdin": "q:2",
        "expected": "une ressource azure à déployer||la déclaration d'une ressource azure||une ressource à déployer||la ressource à déployer"
      },
      {
        "label": "Question 3 — Réplication appliquée par la référence Standard_LRS",
        "stdin": "q:3",
        "expected": "lrs||la lrs||lrs (locally redundant storage)||locally redundant storage||trois copies dans un même datacenter"
      },
      {
        "label": "Question 4 — Comportement d'un déploiement relancé à l'identique",
        "stdin": "q:4",
        "expected": "il met à jour la ressource existante||il met a jour la ressource existante||met à jour la ressource existante||un déploiement idempotent||idempotent"
      },
      {
        "label": "Question 5 — Apport majeur de l'Infrastructure as Code",
        "stdin": "q:5",
        "expected": "des environnements reproductibles||la reproductibilité||reproductible||des environnements reproductibles et versionnés||des déploiements reproductibles et versionnés"
      }
    ],
    "solution": "[Question 1 — Rôle de la ligne param location string = 'francecentral']\nelle définit un paramètre avec une valeur par défaut\n\n[Question 2 — Ce que déclare le mot-clé resource]\nune ressource azure à déployer\n\n[Question 3 — Réplication appliquée par la référence Standard_LRS]\nlrs\n\n[Question 4 — Comportement d'un déploiement relancé à l'identique]\nil met à jour la ressource existante\n\n[Question 5 — Apport majeur de l'Infrastructure as Code]\ndes environnements reproductibles",
    "takeaway": "1) La première ligne définit un paramètre nommé location, de type chaîne, avec la valeur par défaut 'francecentral'.\n2) Le mot-clé resource déclare une ressource Azure à déployer : ici un compte de stockage Microsoft.Storage/storageAccounts.\n3) La référence Standard_LRS applique la réplication LRS (Locally Redundant Storage) : trois copies dans un même datacenter de la région.\n4) Relancé à l'identique, le déploiement met à jour la ressource existante sans en créer une seconde : le déploiement est idempotent.\n5) L'Infrastructure as Code rend les environnements reproductibles et versionnés : le même gabarit déploie des environnements identiques, et chaque évolution est suivie dans Git.\nContrôle : l'extrait combine un paramètre par défaut, une ressource typée avec sa version d'API et sa référence SKU — les trois briques d'un gabarit Bicep lisible."
  }
];
