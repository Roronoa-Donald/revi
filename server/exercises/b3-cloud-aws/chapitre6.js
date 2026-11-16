'use strict';

module.exports = [
  {
    "id": "aws3-c6-e1",
    "chapter": 6,
    "level": "n1",
    "language": "analyse",
    "title": "La facture Lambda du service Vignetta",
    "exampleTitle": "Exemple résolu — la facture Lambda du service de transcription Dictao",
    "goal": "Calculer la facture d'une fonction Lambda : Go-secondes de calcul et facturation des requêtes.",
    "brief": "<p><strong>Énoncé.</strong> Vignetta exploite un service de partage d'images : à chaque photo importée, une fonction AWS Lambda génère une vignette. La fonction est configurée avec <strong>512 Mo de mémoire</strong> et s'exécute en moyenne <strong>300 ms</strong> par invocation. Le mois dernier, elle a été invoquée <strong>2 000 000 de fois</strong>.</p><p>Grille pédagogique simplifiée retenue pour l'exercice : <strong>0,20 € par million de requêtes</strong> et <strong>0,00001 € par Go-seconde</strong> de calcul (mémoire allouée × durée d'exécution).</p><p>Toutes les questions attendent un nombre (les questions 1 et 2 admettent une décimale).</p><ol><li>Combien de Go de mémoire la fonction alloue-t-elle à chaque invocation ?</li><li>Combien de Go-secondes consomme chaque invocation (mémoire × durée en secondes) ?</li><li>Combien de Go-secondes la fonction consomme-t-elle au total sur le mois ?</li><li>Quel est le coût de calcul du mois, en euros ?</li><li>Quel est le coût des requêtes du mois, en euros ?</li><li>Quel est le total de la facture Lambda du mois, en euros ?</li></ol>",
    "starter": "# Exercice — La facture Lambda du service Vignetta\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Toutes les réponses : le nombre seul.\n\n[Question 1 — Mémoire allouée par invocation (en Go)]\nA_COMPLETER\n\n[Question 2 — Go-secondes par invocation]\nA_COMPLETER\n\n[Question 3 — Go-secondes sur le mois]\nA_COMPLETER\n\n[Question 4 — Coût de calcul du mois (en €)]\nA_COMPLETER\n\n[Question 5 — Coût des requêtes du mois (en €)]\nA_COMPLETER\n\n[Question 6 — Total de la facture Lambda (en €)]\nA_COMPLETER\n",
    "hints": [
      "Convertissez la mémoire en Go (512 Mo = 0,5 Go) et la durée en secondes (300 ms = 0,3 s) avant tout calcul.",
      "Les Go-secondes du mois valent Go par invocation × nombre d'invocations ; les requêtes se facturent par million.",
      "1. 512 Mo en Go. 2. 0,5 × 0,3. 3. Multipliez par 2 000 000. 4. Multipliez par 0,00001. 5. 2 000 000 / 1 000 000 × 0,20. 6. Additionnez les deux coûts."
    ],
    "examples": [
      {
        "stdin": "Le service de transcription Dictao facture sa fonction Lambda : 256 Mo de mémoire,\n500 ms par exécution, 1 000 000 d'invocations dans le mois.\nGrille : 0,20 € par million de requêtes, 0,00001 € par Go-seconde.\n\n1) Mémoire : 256 Mo = 0,25 Go.\n2) Go-secondes par appel : 0,25 × 0,5 = 0,125.\n3) Total du mois : 0,125 × 1 000 000 = 125 000 Go-s.\n4) Calcul : 125 000 × 0,00001 = 1,25 €.\n5) Requêtes : 1 × 0,20 = 0,20 €.\n6) Total : 1,25 + 0,20 = 1,45 €.",
        "expected": "0,25 Go — 0,125 Go-s par appel — 125 000 Go-s — 1,25 € de calcul — 0,20 € de requêtes — total 1,45 €",
        "note": "Le coût Lambda se compose toujours des deux lignes : le calcul (Go-secondes) et les requêtes ; réduire la mémoire ou la durée agit sur la première."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Mémoire allouée par invocation (en Go)",
        "stdin": "q:1",
        "expected": "0,5||0.5||0,5 go"
      },
      {
        "label": "Question 2 — Go-secondes par invocation",
        "stdin": "q:2",
        "expected": "0,15||0.15||0,15 go-secondes"
      },
      {
        "label": "Question 3 — Go-secondes sur le mois",
        "stdin": "q:3",
        "expected": "300000||300 000||300000 go-secondes||300 000 go-secondes"
      },
      {
        "label": "Question 4 — Coût de calcul du mois (en €)",
        "stdin": "q:4",
        "expected": "3||3,00||3.00||3 €"
      },
      {
        "label": "Question 5 — Coût des requêtes du mois (en €)",
        "stdin": "q:5",
        "expected": "0,4||0.4||0,40||0.40||0,4 €||0,40 €"
      },
      {
        "label": "Question 6 — Total de la facture Lambda (en €)",
        "stdin": "q:6",
        "expected": "3,4||3.4||3,40||3.40||3,4 €||3,40 €"
      }
    ],
    "solution": "[Question 1 — Mémoire allouée par invocation (en Go)]\n0,5\n\n[Question 2 — Go-secondes par invocation]\n0,15\n\n[Question 3 — Go-secondes sur le mois]\n300000\n\n[Question 4 — Coût de calcul du mois (en €)]\n3\n\n[Question 5 — Coût des requêtes du mois (en €)]\n0,4\n\n[Question 6 — Total de la facture Lambda (en €)]\n3,4",
    "takeaway": "1) 512 Mo = 0,5 Go de mémoire allouée à chaque invocation.\n2) Go-secondes par invocation : 0,5 Go × 0,3 s = 0,15 Go-s.\n3) Total du mois : 0,15 × 2 000 000 = 300 000 Go-secondes.\n4) Coût de calcul : 300 000 × 0,00001 = 3,00 €.\n5) Coût des requêtes : 2 000 000 / 1 000 000 × 0,20 = 2 × 0,20 = 0,40 €.\n6) Total : 3,00 + 0,40 = 3,40 €.\nContrôle : 2 millions d'invocations à 300 ms pour 512 Mo : la ligne calcul (3,00 €) domine la ligne requêtes (0,40 €)."
  },
  {
    "id": "aws3-c6-e2",
    "chapter": 6,
    "level": "n2",
    "language": "analyse",
    "title": "Le découplage des commandes de l'épicerie Vitabio",
    "exampleTitle": "Exemple résolu — le découplage des paiements de la plateforme AlloResto",
    "goal": "Raisonner sur une file SQS : délai de visibilité, DLQ, choix Standard ou FIFO, et rôle de SNS.",
    "brief": "<p><strong>Énoncé.</strong> Vitabio est une épicerie en ligne. Le soir du restockage, les commandes affluent : pour éviter de perdre les commandes si les serveurs de traitement saturent, l'architecture découple les étapes. Le site web dépose chaque commande dans la file Amazon SQS « commandes » ; des serveurs consomment la file, génèrent la facture et préparent le colis. Les messages dont le traitement échoue partent dans la file lettres mortes « commandes-mortes », avec <strong>maxReceiveCount = 3</strong> ; le <strong>délai de visibilité</strong> est de <strong>60 secondes</strong>. À l'expédition, une notification doit partir simultanément au client (e-mail) et à l'entrepôt (webhook).</p><p>Rappel du cours : pendant le délai de visibilité, un message reçu n'est pas redélivré aux autres consommateurs ; au-delà de maxReceiveCount réceptions sans suppression, le message part dans la file lettres mortes (DLQ) ; les files Standard offrent un débit élevé sans garantie d'ordre, les files FIFO garantissent l'ordre et le traitement exactement unique ; SNS est le service de publication/abonnement pour notifier plusieurs destinataires.</p><p>Les questions 2, 3 et 6 attendent un nombre ou « oui/non » ; les autres une réponse courte.</p><ol><li>Quel service de file d'attente découple le site web des serveurs de traitement ?</li><li>Un message de commande échoue systématiquement : après combien de réceptions sans succès est-il déplacé vers la file lettres mortes ?</li><li>Pendant le délai de visibilité de 60 secondes, le message est-il visible pour les autres consommateurs ?</li><li>Pour notifier simultanément le client par e-mail et l'entrepôt par webhook, quel service de publication/abonnement utiliser ?</li><li>Quelle famille de files SQS garantit l'ordre et le traitement exactement unique des messages : Standard ou FIFO ?</li><li>Le traitement réel d'une commande prend 90 secondes alors que le délai de visibilité est de 60 secondes : faut-il augmenter le délai de visibilité ou le maxReceiveCount pour éviter les traitements en double ?</li></ol>",
    "starter": "# Exercice — Le découplage des commandes de l'épicerie Vitabio\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Question 2 : le nombre. Question 3 : oui ou non. Question 6 : le nom du paramètre.\n\n[Question 1 — Service de file d'attente du découplage]\nA_COMPLETER\n\n[Question 2 — Réceptions avant le passage en file lettres mortes]\nA_COMPLETER\n\n[Question 3 — Message visible par les autres pendant le délai ?]\nA_COMPLETER\n\n[Question 4 — Service de publication vers e-mail et webhook]\nA_COMPLETER\n\n[Question 5 — Famille de files garantissant ordre et unicité]\nA_COMPLETER\n\n[Question 6 — Paramètre à ajuster pour éviter les doublons]\nA_COMPLETER\n",
    "hints": [
      "La file absorbe les pics : le producteur dépose, les consommateurs traitent à leur rythme ; rien n'est perdu tant que le message vit dans la file.",
      "Un message non supprimé redevient visible à l'expiration du délai de visibilité : si le traitement dure plus longtemps, un autre consommateur le reprend.",
      "1. Le service de file d'attente managé d'AWS. 2. Relisez maxReceiveCount. 3. Que masque le délai de visibilité ? 4. Publication/abonnement vers plusieurs protocoles. 5. Standard ou FIFO ? 6. Comparez 90 s de traitement et 60 s de visibilité."
    ],
    "examples": [
      {
        "stdin": "La plateforme AlloResto découple ses paiements : le site dépose chaque paiement dans une file SQS,\nmaxReceiveCount = 4, délai de visibilité 120 s ; notification du client par e-mail et du comptoir par webhook.\n\n1) La file SQS absorbe les pics de commandes.\n2) Un paiement en échec part en file lettres mortes après 4 réceptions.\n3) Pendant 120 s, le message est invisible pour les autres consommateurs.\n4) Les notifications simultanées partent par SNS.\n5) Les paiements d'une même commande exigent une file FIFO.\n6) Traitement de 200 s contre 120 s de visibilité : augmenter le délai de visibilité.",
        "expected": "SQS pour la file — file lettres mortes après 4 réceptions — invisible pendant 120 s — SNS pour les notifications — FIFO pour l'ordre — visibilité à augmenter",
        "note": "Le délai de visibilité doit couvrir la durée réelle du traitement : trop court, le message est repris par un second consommateur et traité deux fois."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Service de file d'attente du découplage",
        "stdin": "q:1",
        "expected": "sqs||amazon sqs||la file sqs||aws sqs"
      },
      {
        "label": "Question 2 — Réceptions avant le passage en file lettres mortes",
        "stdin": "q:2",
        "expected": "3||trois||3 réceptions"
      },
      {
        "label": "Question 3 — Message visible par les autres pendant le délai ?",
        "stdin": "q:3",
        "expected": "non"
      },
      {
        "label": "Question 4 — Service de publication vers e-mail et webhook",
        "stdin": "q:4",
        "expected": "sns||amazon sns"
      },
      {
        "label": "Question 5 — Famille de files garantissant ordre et unicité",
        "stdin": "q:5",
        "expected": "fifo||la file fifo||les files fifo||fifo (first in first out)"
      },
      {
        "label": "Question 6 — Paramètre à ajuster pour éviter les doublons",
        "stdin": "q:6",
        "expected": "le délai de visibilité||délai de visibilité||le visibility timeout||visibility timeout"
      }
    ],
    "solution": "[Question 1 — Service de file d'attente du découplage]\nsqs\n\n[Question 2 — Réceptions avant le passage en file lettres mortes]\n3\n\n[Question 3 — Message visible par les autres pendant le délai ?]\nnon\n\n[Question 4 — Service de publication vers e-mail et webhook]\nsns\n\n[Question 5 — Famille de files garantissant ordre et unicité]\nfifo\n\n[Question 6 — Paramètre à ajuster pour éviter les doublons]\nle délai de visibilité",
    "takeaway": "1) Amazon SQS : la file d'attente managée découple le producteur (site web) des consommateurs (serveurs de traitement).\n2) Avec maxReceiveCount = 3, le message est déplacé vers la file lettres mortes après 3 réceptions sans suppression réussie.\n3) Non : pendant le délai de visibilité de 60 secondes, le message reçu est invisible pour les autres consommateurs.\n4) Amazon SNS : le service de publication/abonnement diffuse l'événement d'expédition vers l'e-mail du client et le webhook de l'entrepôt.\n5) La famille FIFO garantit l'ordre et le traitement exactement unique ; la famille Standard privilégie le débit.\n6) Il faut augmenter le délai de visibilité : 60 s ne couvrent pas un traitement de 90 s, le message serait redélivré et traité deux fois.\nContrôle : file (SQS) + lettres mortes (maxReceiveCount 3) + notifications (SNS) : le pic du soir est absorbé sans perte ni doublon."
  },
  {
    "id": "aws3-c6-e3",
    "chapter": 6,
    "level": "n3",
    "language": "analyse",
    "title": "La facture mensuelle du service de podcasts Streamly",
    "exampleTitle": "Exemple résolu — la facture du service de veille PresseLib",
    "goal": "Vérifier une facture mensuelle multi-services ligne par ligne, identifier la ligne dominante et arbitrer une alarme CloudWatch.",
    "brief": "<p><strong>Énoncé.</strong> Streamly exploite une plateforme de podcasts. Le directeur technique reconstitue la facture du mois à partir de la grille simplifiée suivante (730 heures dans le mois) :</p><table><tr><th>Ligne de coût</th><th>Détail</th></tr><tr><th>Instances EC2</th><td>2 instances m5.large, 24 h/24, à 0,10 €/h</td></tr><tr><th>Stockage S3 Standard</th><td>100 Go de podcasts à 0,023 €/Go</td></tr><tr><th>Requêtes AWS Lambda</th><td>3 millions de requêtes à 0,20 € par million</td></tr><tr><th>Transfert sortant vers Internet</th><td>50 Go à 0,09 €/Go</td></tr><tr><th>Application Load Balancer</th><td>coût fixe 730 h × 0,025 €/h (hors unités LCU)</td></tr></table><p>Une alarme CloudWatch surveille en parallèle la métrique de facturation estimée du compte, avec un seuil de <strong>200 €</strong>.</p><p>Les questions 1 à 3 et 5 attendent un nombre ; la question 4 un court libellé ; la question 6 « oui » ou « non ».</p><ol><li>Vérifiez la ligne EC2 : quel est son montant mensuel, en euros ?</li><li>Vérifiez la ligne S3 : quel est son montant mensuel, en euros ?</li><li>Quel est le total de la facture, en euros ?</li><li>Quelle ligne pèse le plus lourd dans la facture ?</li><li>Quelle part du total la ligne EC2 représente-t-elle, en pourcentage arrondi à l'unité ?</li><li>La facture calculée fait-elle passer l'alarme CloudWatch de seuil 200 € en état ALARM ?</li></ol>",
    "starter": "# Exercice — La facture mensuelle du service de podcasts Streamly\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 3 et 5 : le nombre seul. Question 6 : oui ou non.\n\n[Question 1 — Montant de la ligne EC2 (en €)]\nA_COMPLETER\n\n[Question 2 — Montant de la ligne S3 (en €)]\nA_COMPLETER\n\n[Question 3 — Total de la facture (en €)]\nA_COMPLETER\n\n[Question 4 — Ligne dominante de la facture]\nA_COMPLETER\n\n[Question 5 — Part de la ligne EC2 (en %)]\nA_COMPLETER\n\n[Question 6 — Alarme CloudWatch de seuil 200 € en état ALARM ?]\nA_COMPLETER\n",
    "hints": [
      "Calculez chaque ligne : EC2 = nombre d'instances × heures × prix ; S3 = Go × prix ; Lambda = millions × prix ; ALB = heures × prix fixe.",
      "Le total est la somme des cinq lignes ; la part d'une ligne vaut montant de la ligne divisé par le total, multiplié par 100.",
      "1. 2 × 730 × 0,10. 2. 100 × 0,023. 3. Ajoutez aussi 3 × 0,20, 50 × 0,09 et 730 × 0,025. 4. Comparez les montants. 5. Ligne EC2 / total × 100. 6. Comparez le total au seuil de l'alarme."
    ],
    "examples": [
      {
        "stdin": "Le service de veille PresseLib reconstitue sa facture (730 h) :\n1 instance EC2 à 0,10 €/h ; 200 Go S3 à 0,023 €/Go ; 1 million de requêtes Lambda à 0,20 €/M ;\n10 Go sortants à 0,09 €/Go ; ALB 730 h × 0,025 €/h. Alarme de facturation avec seuil de 90 €.\n\n1) EC2 : 730 × 0,10 = 73,00 €.\n2) S3 : 200 × 0,023 = 4,60 €.\n3) Lambda : 0,20 € ; transfert : 0,90 € ; ALB : 18,25 €.\n4) Total : 73,00 + 4,60 + 0,20 + 0,90 + 18,25 = 96,95 €.\n5) Part EC2 : 73 / 96,95 ≈ 75 %.\n6) 96,95 > 90 : l'alarme passe en état ALARM.",
        "expected": "total 96,95 € — ligne dominante EC2 (75 %) — seuil 90 € dépassé : alarme en état ALARM",
        "note": "L'alarme de facturation CloudWatch compare la métrique estimée au seuil : dépasser le seuil fait basculer l'état OK vers ALARM."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Montant de la ligne EC2 (en €)",
        "stdin": "q:1",
        "expected": "146||146,00||146.00||146 €"
      },
      {
        "label": "Question 2 — Montant de la ligne S3 (en €)",
        "stdin": "q:2",
        "expected": "2,3||2.3||2,30||2.30||2,3 €||2,30 €"
      },
      {
        "label": "Question 3 — Total de la facture (en €)",
        "stdin": "q:3",
        "expected": "171,65||171.65||171,65 €"
      },
      {
        "label": "Question 4 — Ligne dominante de la facture",
        "stdin": "q:4",
        "expected": "ec2||les instances ec2||la ligne ec2||l'instance ec2"
      },
      {
        "label": "Question 5 — Part de la ligne EC2 (en %)",
        "stdin": "q:5",
        "expected": "85||85 %||85%"
      },
      {
        "label": "Question 6 — Alarme CloudWatch de seuil 200 € en état ALARM ?",
        "stdin": "q:6",
        "expected": "non"
      }
    ],
    "solution": "[Question 1 — Montant de la ligne EC2 (en €)]\n146\n\n[Question 2 — Montant de la ligne S3 (en €)]\n2,3\n\n[Question 3 — Total de la facture (en €)]\n171,65\n\n[Question 4 — Ligne dominante de la facture]\nec2\n\n[Question 5 — Part de la ligne EC2 (en %)]\n85\n\n[Question 6 — Alarme CloudWatch de seuil 200 € en état ALARM ?]\nnon",
    "takeaway": "1) Ligne EC2 : 2 instances × 730 h × 0,10 € = 146,00 €.\n2) Ligne S3 : 100 Go × 0,023 € = 2,30 €.\n3) Autres lignes : Lambda 3 × 0,20 = 0,60 € ; transfert 50 × 0,09 = 4,50 € ; ALB 730 × 0,025 = 18,25 €. Total : 146,00 + 2,30 + 0,60 + 4,50 + 18,25 = 171,65 €.\n4) La ligne dominante est la ligne EC2 : 146,00 € à elle seule.\n5) Part de la ligne EC2 : 146,00 / 171,65 × 100 ≈ 85 %.\n6) Non : 171,65 € restent sous le seuil de 200 €, l'alarme reste en état OK.\nContrôle : 146,00 + 2,30 + 0,60 + 4,50 + 18,25 = 171,65 € ; pour réduire la facture, la ligne EC2 (85 % du total) est le premier levier : instances réservées pour une charge stable."
  }
];
