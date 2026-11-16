'use strict';

module.exports = [
  {
    "id": "aws3-c3-e1",
    "chapter": 3,
    "level": "n1",
    "language": "analyse",
    "title": "Le dimensionnement des serveurs de Culinia",
    "exampleTitle": "Exemple résolu — le dimensionnement du service de cartes CartoPlus",
    "goal": "Choisir un type d'instance EC2 selon des contraintes de vCPU et de mémoire, puis chiffrer son coût mensuel.",
    "brief": "<p><strong>Énoncé.</strong> Culinia est une jeune entreprise d'abonnements de repas cuisinés. Son serveur d'application doit disposer d'<strong>au moins 4 vCPU</strong> et d'<strong>au moins 12 Go de mémoire</strong>. Le responsable technique relève, dans la grille tarifaire simplifiée de la région eu-west-3 (Linux, à la demande) :</p><table><tr><th>Type d'instance</th><th>vCPU</th><th>Mémoire (Go)</th><th>Prix horaire</th></tr><tr><th>t3.medium</th><td>2</td><td>4</td><td>0,042 €</td></tr><tr><th>t3.large</th><td>2</td><td>8</td><td>0,083 €</td></tr><tr><th>c5.xlarge</th><td>4</td><td>8</td><td>0,154 €</td></tr><tr><th>m5.xlarge</th><td>4</td><td>16</td><td>0,192 €</td></tr><tr><th>r5.xlarge</th><td>4</td><td>32</td><td>0,252 €</td></tr></table><p>Le serveur tournera sans interruption ; on retient <strong>730 heures par mois</strong>. Les questions 1 à 5 attendent un nombre (ou un type d'instance) ; la question 6 attend une réponse courte.</p><ol><li>Combien de types du tableau satisfont à la fois les 4 vCPU et les 12 Go de mémoire ?</li><li>Quel type retenir, parmi ceux qui satisfont les deux contraintes, pour le coût horaire le plus faible ?</li><li>Quel est le coût mensuel (730 h) du type retenu, en euros ?</li><li>Quel est le coût mensuel (730 h) du type le plus cher du tableau, en euros ?</li><li>Quelle économie mensuelle, en euros, entre le type le plus cher et le type retenu ?</li><li>À quelle spécialité correspond la famille « r » de r5.xlarge ?</li></ol>",
    "starter": "# Exercice — Le dimensionnement des serveurs de Culinia\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 et 3 à 5 : le nombre seul. Question 2 : le type d'instance.\n\n[Question 1 — Types satisfaisant les deux contraintes]\nA_COMPLETER\n\n[Question 2 — Type retenu au moindre coût]\nA_COMPLETER\n\n[Question 3 — Coût mensuel du type retenu (en €)]\nA_COMPLETER\n\n[Question 4 — Coût mensuel du type le plus cher (en €)]\nA_COMPLETER\n\n[Question 5 — Économie mensuelle (en €)]\nA_COMPLETER\n\n[Question 6 — Spécialité de la famille r]\nA_COMPLETER\n",
    "hints": [
      "Filtrez le tableau colonne par colonne : d'abord les lignes à 4 vCPU ou plus, puis celles à 12 Go de mémoire ou plus.",
      "Le coût mensuel d'une instance 24 h/24 vaut prix horaire × 730 ; l'économie est la différence des deux coûts mensuels.",
      "1. Barrez les lignes insuffisantes en vCPU puis en mémoire. 2. Parmi les restantes, prenez le prix horaire le plus bas. 3. 730 × 0,192. 4. 730 × 0,252. 5. Différence des deux lignes. 6. Relisez les familles : t, c, m, r."
    ],
    "examples": [
      {
        "stdin": "CartoPlus dimensionne son serveur de tuiles cartographiques : au moins 2 vCPU et 4 Go de mémoire.\nGrille : t3.small (2 vCPU, 2 Go, 0,021 €/h) — t3.medium (2, 4, 0,042 €/h) — c5.large (2, 4, 0,085 €/h) — m5.large (2, 8, 0,096 €/h).\n\n1) Types éligibles : t3.medium, c5.large, m5.large, soit 3.\n2) Le moins cher éligible : t3.medium.\n3) Coût mensuel : 730 × 0,042 = 30,66 €.\n4) La famille « c » (c5.large) est optimisée calcul.",
        "expected": "3 types éligibles — t3.medium retenu — 30,66 € par mois — famille c : optimisée calcul",
        "note": "On retient le plus petit type qui satisfait les deux contraintes : la marge de mémoire excédentaire ne se paie que si elle sert."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Types satisfaisant les deux contraintes",
        "stdin": "q:1",
        "expected": "2||deux"
      },
      {
        "label": "Question 2 — Type retenu au moindre coût",
        "stdin": "q:2",
        "expected": "m5.xlarge||m5 xlarge||le m5.xlarge"
      },
      {
        "label": "Question 3 — Coût mensuel du type retenu (en €)",
        "stdin": "q:3",
        "expected": "140,16||140.16||140,16 €||140,16 euros"
      },
      {
        "label": "Question 4 — Coût mensuel du type le plus cher (en €)",
        "stdin": "q:4",
        "expected": "183,96||183.96||183,96 €||183,96 euros"
      },
      {
        "label": "Question 5 — Économie mensuelle (en €)",
        "stdin": "q:5",
        "expected": "43,8||43.8||43,80||43.80||43,8 €||43,80 €"
      },
      {
        "label": "Question 6 — Spécialité de la famille r",
        "stdin": "q:6",
        "expected": "la mémoire||mémoire||optimisée mémoire||la mémoire (memory optimized)||memory optimized"
      }
    ],
    "solution": "[Question 1 — Types satisfaisant les deux contraintes]\n2\n\n[Question 2 — Type retenu au moindre coût]\nm5.xlarge\n\n[Question 3 — Coût mensuel du type retenu (en €)]\n140,16\n\n[Question 4 — Coût mensuel du type le plus cher (en €)]\n183,96\n\n[Question 5 — Économie mensuelle (en €)]\n43,8\n\n[Question 6 — Spécialité de la famille r]\nla mémoire",
    "takeaway": "1) Les contraintes (4 vCPU et 12 Go) ne sont satisfaites que par m5.xlarge (4 vCPU, 16 Go) et r5.xlarge (4 vCPU, 32 Go) : 2 types.\n2) Entre les deux, le moins cher à l'heure est m5.xlarge (0,192 €/h) : c'est le type retenu.\n3) Coût mensuel de m5.xlarge : 730 × 0,192 = 140,16 €.\n4) Le type le plus cher du tableau est r5.xlarge : 730 × 0,252 = 183,96 €.\n5) Économie mensuelle : 183,96 − 140,16 = 43,80 €.\n6) La famille « r » (comme r5.xlarge) est optimisée mémoire : elle convient aux charges gourmandes en RAM.\nContrôle : c5.xlarge a bien 4 vCPU mais seulement 8 Go : il est éliminé par la mémoire, comme t3.medium, t3.large et m5.large."
  },
  {
    "id": "aws3-c3-e2",
    "chapter": 3,
    "level": "n2",
    "language": "analyse",
    "title": "Les modèles d'achat EC2 de Diagora",
    "exampleTitle": "Exemple résolu — les modèles d'achat du studio StudioM",
    "goal": "Comparer les modèles d'achat EC2 (à la demande, réservé, Spot) et chiffrer les économies sur une charge réelle.",
    "brief": "<p><strong>Énoncé.</strong> Diagora édite une plateforme de formation en ligne. Sa grille tarifaire interne simplifiée indique, pour l'instance m5.large sous Linux : <strong>0,10 €/heure à la demande (On-Demand)</strong> ; <strong>instance réservée 1 an sans paiement anticipé : 40 % de remise</strong> ; <strong>Spot : 70 % de remise</strong>. Deux charges sont à couvrir ce mois-ci :</p><ul><li><strong>2 serveurs d'application</strong> qui tournent 24 h/24, 7 j/7, sans interruption possible ;</li><li><strong>1 charge de transcodage vidéo</strong> chaque nuit, <strong>200 heures par mois</strong>, tolérante aux interruptions (elle reprend là où elle s'était arrêtée).</li></ul><p>On retient <strong>730 heures par mois</strong>. Les questions 1 à 4 et 6 attendent un nombre ; la question 5 attend un nom de modèle.</p><ol><li>Quel est le prix horaire d'une instance réservée 1 an, en euros ?</li><li>Quel est le prix horaire d'une instance Spot, en euros ?</li><li>Quel est le coût mensuel d'un serveur d'application 24/7 à la demande, en euros ?</li><li>Quelle économie mensuelle, en euros, si les 2 serveurs stables passent en instances réservées ?</li><li>Quel modèle d'achat choisir pour la charge de transcodage vidéo, tolérante aux interruptions ?</li><li>Quel est le coût mensuel du transcodage (200 h) en Spot, en euros ?</li></ol>",
    "starter": "# Exercice — Les modèles d'achat EC2 de Diagora\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 4 et 6 : le nombre seul. Question 5 : le nom du modèle.\n\n[Question 1 — Prix horaire d'une instance réservée (en €)]\nA_COMPLETER\n\n[Question 2 — Prix horaire d'une instance Spot (en €)]\nA_COMPLETER\n\n[Question 3 — Coût mensuel à la demande d'un serveur 24/7 (en €)]\nA_COMPLETER\n\n[Question 4 — Économie mensuelle des 2 serveurs en réservé (en €)]\nA_COMPLETER\n\n[Question 5 — Modèle à choisir pour le transcodage]\nA_COMPLETER\n\n[Question 6 — Coût mensuel du transcodage en Spot (en €)]\nA_COMPLETER\n",
    "hints": [
      "Une remise de 40 % laisse 60 % du prix à payer ; une remise de 70 % en laisse 30 %.",
      "Le coût mensuel d'une charge continue vaut prix horaire × 730 ; l'économie se calcule serveur par serveur puis se multiplie par 2.",
      "1. 0,10 × 0,60. 2. 0,10 × 0,30. 3. 0,10 × 730. 4. Économie par serveur : (0,10 − 0,06) × 730, puis × 2. 5. Une charge interrompible accepte le modèle le moins cher. 6. 200 × prix Spot."
    ],
    "examples": [
      {
        "stdin": "StudioM fait tourner un serveur web 24/7 et une ferme de rendu 3D de 300 h par mois, sur c5.large à 0,085 €/h.\nRéservé 1 an : −30 % ; Spot : −60 %.\n\n1) Prix réservé : 0,085 × 0,70 = 0,0595 €/h.\n2) Prix Spot : 0,085 × 0,40 = 0,034 €/h.\n3) Serveur web 24/7 à la demande : 730 × 0,085 = 62,05 €.\n4) Ferme de rendu (interrompible) en Spot : 300 × 0,034 = 10,20 €.",
        "expected": "réservé 0,0595 €/h — spot 0,034 €/h — serveur stable 62,05 € — ferme de rendu 10,20 €",
        "note": "La charge stable paie l'engagement (réservé) ; la charge interrompible profite du Spot : chaque charge a son modèle d'achat."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Prix horaire d'une instance réservée (en €)",
        "stdin": "q:1",
        "expected": "0,06||0.06||0,06 €||0,060"
      },
      {
        "label": "Question 2 — Prix horaire d'une instance Spot (en €)",
        "stdin": "q:2",
        "expected": "0,03||0.03||0,03 €||0,030"
      },
      {
        "label": "Question 3 — Coût mensuel à la demande d'un serveur 24/7 (en €)",
        "stdin": "q:3",
        "expected": "73||73,00||73.00||73 €"
      },
      {
        "label": "Question 4 — Économie mensuelle des 2 serveurs en réservé (en €)",
        "stdin": "q:4",
        "expected": "58,4||58.4||58,40||58.40||58,4 €||58,40 €"
      },
      {
        "label": "Question 5 — Modèle à choisir pour le transcodage",
        "stdin": "q:5",
        "expected": "spot||le spot||les instances spot||instances spot"
      },
      {
        "label": "Question 6 — Coût mensuel du transcodage en Spot (en €)",
        "stdin": "q:6",
        "expected": "6||6,00||6.00||6 €||6,0"
      }
    ],
    "solution": "[Question 1 — Prix horaire d'une instance réservée (en €)]\n0,06\n\n[Question 2 — Prix horaire d'une instance Spot (en €)]\n0,03\n\n[Question 3 — Coût mensuel à la demande d'un serveur 24/7 (en €)]\n73\n\n[Question 4 — Économie mensuelle des 2 serveurs en réservé (en €)]\n58,4\n\n[Question 5 — Modèle à choisir pour le transcodage]\nspot\n\n[Question 6 — Coût mensuel du transcodage en Spot (en €)]\n6",
    "takeaway": "1) Réservé 1 an : 0,10 × (1 − 0,40) = 0,10 × 0,60 = 0,06 € par heure.\n2) Spot : 0,10 × (1 − 0,70) = 0,10 × 0,30 = 0,03 € par heure.\n3) Serveur 24/7 à la demande : 0,10 × 730 = 73,00 € par mois.\n4) En réservé, un serveur coûte 0,06 × 730 = 43,80 € : l'économie vaut 73,00 − 43,80 = 29,20 € par serveur, soit 58,40 € pour les deux.\n5) Le transcodage reprend après interruption : le modèle Spot convient (meilleur prix, interruption possible).\n6) Transcodage en Spot : 200 × 0,03 = 6,00 € par mois.\nContrôle : 2 serveurs réservés = 87,60 € + 6,00 € de Spot = 93,60 €, contre 146,00 + 6,00 € si tout restait à la demande."
  },
  {
    "id": "aws3-c3-e3",
    "chapter": 3,
    "level": "n3",
    "language": "analyse",
    "title": "L'architecture Auto Scaling des ventes privées Eclat",
    "exampleTitle": "Exemple résolu — l'Auto Scaling du service de billetterie FestiGo",
    "goal": "Raisonner sur un Auto Scaling Group multi-AZ derrière un ALB : capacités, panne de zone, health checks et choix de service.",
    "brief": "<p><strong>Énoncé.</strong> Eclat organise des ventes privées en ligne sur AWS : le trafic est calme la semaine et explose lors des opérations du vendredi. L'architecture : un <strong>Application Load Balancer (ALB)</strong> répartit le trafic HTTP sur un groupe <strong>EC2 Auto Scaling (ASG)</strong> déployé sur <strong>3 zones de disponibilité</strong> (eu-west-3a, eu-west-3b, eu-west-3c). Configuration de l'ASG : capacité minimale <strong>2</strong>, capacité souhaitée <strong>4</strong>, capacité maximale <strong>8</strong> ; politique de suivi de cible (target tracking) à <strong>60 % d'utilisation CPU</strong> ; les health checks de l'ALB signalent les instances défaillantes.</p><p>Les questions 1 à 3 attendent un nombre ; les questions 4 à 6 une réponse courte.</p><ol><li>Avec une capacité souhaitée de 4 instances réparties au mieux sur 3 zones, combien d'instances une zone peut-elle compter au maximum ?</li><li>Vendredi noir : l'ASG monte à sa capacité maximale. Combien d'instances tournent alors ?</li><li>La zone eu-west-3a tombe en panne ; elle hébergeait l'instance excédentaire (répartition 2/1/1). Combien d'instances restent immédiatement saines ?</li><li>Une instance renvoie des erreurs HTTP 500 que les health checks de l'ALB détectent : l'ASG la remplace-t-il automatiquement ?</li><li>Pour répartir le trafic HTTP entre les instances des trois zones d'une même région, faut-il choisir un Application Load Balancer ou Amazon CloudFront ?</li><li>La cible de 60 % CPU est dépassée (75 % en moyenne depuis plusieurs minutes) : l'ASG augmente-t-il ou diminue-t-il la capacité ?</li></ol>",
    "starter": "# Exercice — L'architecture Auto Scaling des ventes privées Eclat\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 3 : le nombre seul. Questions 4 à 6 : réponse courte.\n\n[Question 1 — Instances au maximum dans une zone (capacité 4 sur 3 zones)]\nA_COMPLETER\n\n[Question 2 — Instances à la capacité maximale]\nA_COMPLETER\n\n[Question 3 — Instances saines après la panne de la zone eu-west-3a]\nA_COMPLETER\n\n[Question 4 — Remplacement automatique d'une instance en erreur HTTP 500]\nA_COMPLETER\n\n[Question 5 — ALB ou CloudFront pour répartir le trafic intra-région ?]\nA_COMPLETER\n\n[Question 6 — L'ASG augmente-t-il ou diminue-t-il la capacité ?]\nA_COMPLETER\n",
    "hints": [
      "L'ASG équilibre les instances entre les zones : 4 instances sur 3 zones se répartissent 2/1/1.",
      "Les capacités de l'ASG se lisent ainsi : jamais moins que le minimum, jamais plus que le maximum, le souhaité au repos.",
      "1. Répartissez 4 en 3 parts. 2. Relisez la capacité maximale. 3. Comptez les instances hors zone a. 4. Que fait l'ASG d'une instance signalée défaillante ? 5. CloudFront sert le cache mondial ; la répartition intra-région est le rôle du répartiteur. 6. Comparez la moyenne observée à la cible."
    ],
    "examples": [
      {
        "stdin": "FestiGo dimensionne son ASG : min 1, desired 3, max 6, sur 2 zones (a et b), cible 50 % CPU, health checks ALB.\n\n1) 3 instances sur 2 zones : répartition 2/1, une zone compte au maximum 2 instances.\n2) Pic du samedi soir : montée à 6 instances (capacité maximale).\n3) La zone a tombe (elle hébergeait 2 instances) : 1 instance saine reste.\n4) Le trafic HTTP entre les zones d'une même région passe par l'ALB (CloudFront sert le cache mondial).",
        "expected": "répartition 2/1 — maximum 6 instances — 1 instance saine reste — répartition intra-région par l'ALB",
        "note": "L'ASG maintient la capacité souhaitée et remplace les instances défaillantes signalées par les health checks de l'ALB."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Instances au maximum dans une zone (capacité 4 sur 3 zones)",
        "stdin": "q:1",
        "expected": "2||deux||2 instances"
      },
      {
        "label": "Question 2 — Instances à la capacité maximale",
        "stdin": "q:2",
        "expected": "8||huit||8 instances"
      },
      {
        "label": "Question 3 — Instances saines après la panne de la zone eu-west-3a",
        "stdin": "q:3",
        "expected": "3||trois||3 instances"
      },
      {
        "label": "Question 4 — Remplacement automatique d'une instance en erreur HTTP 500",
        "stdin": "q:4",
        "expected": "oui"
      },
      {
        "label": "Question 5 — ALB ou CloudFront pour répartir le trafic intra-région ?",
        "stdin": "q:5",
        "expected": "l alb||un alb||l'application load balancer||application load balancer||alb||le application load balancer"
      },
      {
        "label": "Question 6 — L'ASG augmente-t-il ou diminue-t-il la capacité ?",
        "stdin": "q:6",
        "expected": "augmente||il augmente||augmenter||augmente la capacité||scale out"
      }
    ],
    "solution": "[Question 1 — Instances au maximum dans une zone (capacité 4 sur 3 zones)]\n2\n\n[Question 2 — Instances à la capacité maximale]\n8\n\n[Question 3 — Instances saines après la panne de la zone eu-west-3a]\n3\n\n[Question 4 — Remplacement automatique d'une instance en erreur HTTP 500]\noui\n\n[Question 5 — ALB ou CloudFront pour répartir le trafic intra-région ?]\nl alb\n\n[Question 6 — L'ASG augmente-t-il ou diminue-t-il la capacité ?]\naugmente",
    "takeaway": "1) 4 instances équilibrées sur 3 zones se répartissent 2/1/1 : une zone compte au maximum 2 instances.\n2) À la capacité maximale, l'ASG compte 8 instances.\n3) La zone eu-west-3a hébergeait 2 instances (répartition 2/1/1) ; il en reste immédiatement 3 de saines, puis l'ASG en relance pour revenir à 4.\n4) Oui : l'instance signalée défaillante par les health checks de l'ALB est terminée et remplacée par une instance saine.\n5) La répartition du trafic HTTP entre les instances d'une même région relève de l'Application Load Balancer ; CloudFront est un CDN qui sert le cache depuis les edge locations.\n6) À 75 % de CPU moyen contre une cible de 60 %, l'ASG augmente la capacité (scale out) pour ramener la métrique à la cible.\nContrôle : min 2 ≤ desired 4 ≤ max 8 ; après panne, 3 saines + relance = retour au souhaité 4."
  }
];
