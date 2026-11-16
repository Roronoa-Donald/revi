'use strict';

module.exports = [
  {
    "id": "aws3-c5-e1",
    "chapter": 5,
    "level": "n1",
    "language": "analyse",
    "title": "La facture S3 de l'agence photographique GrandAngle",
    "exampleTitle": "Exemple résolu — la facture S3 du podcast OndeBasse",
    "goal": "Calculer une facture S3 : stockage par classe, requêtes et économie apportée par une règle de cycle de vie.",
    "brief": "<p><strong>Énoncé.</strong> GrandAngle est une agence photographique qui stocke ses reportages sur Amazon S3. Ce mois-ci, elle conserve <strong>2 000 Go</strong> de photos de production dans la classe <strong>S3 Standard</strong> (facturée <strong>0,023 € par Go et par mois</strong>) et <strong>1 000 Go</strong> d'archives dans <strong>S3 Glacier Flexible Retrieval</strong> (facturée <strong>0,0036 € par Go et par mois</strong>). L'activité du mois a généré <strong>200 000 requêtes PUT</strong> (à <strong>0,005 € pour 1 000 requêtes</strong>) et <strong>2 000 000 de requêtes GET</strong> (à <strong>0,0004 € pour 1 000 requêtes</strong>).</p><p>L'agence envisage en outre une règle de cycle de vie qui déplacerait <strong>500 Go</strong> de la classe Standard vers Glacier.</p><p>Toutes les questions attendent un montant en euros (le nombre seul suffit).</p><ol><li>Quel est le coût mensuel du stockage S3 Standard (2 000 Go) ?</li><li>Quel est le coût mensuel du stockage Glacier (1 000 Go) ?</li><li>Quel est le coût des requêtes PUT du mois ?</li><li>Quel est le coût des requêtes GET du mois ?</li><li>Quel est le total de la facture S3 du mois ?</li><li>Quelle économie mensuelle, en euros, la règle de cycle de vie (500 Go de Standard vers Glacier) apporterait-elle ?</li></ol>",
    "starter": "# Exercice — La facture S3 de l'agence photographique GrandAngle\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Toutes les réponses : le montant en euros, le nombre seul suffit.\n\n[Question 1 — Coût mensuel du stockage Standard (en €)]\nA_COMPLETER\n\n[Question 2 — Coût mensuel du stockage Glacier (en €)]\nA_COMPLETER\n\n[Question 3 — Coût des requêtes PUT (en €)]\nA_COMPLETER\n\n[Question 4 — Coût des requêtes GET (en €)]\nA_COMPLETER\n\n[Question 5 — Total de la facture S3 (en €)]\nA_COMPLETER\n\n[Question 6 — Économie de la règle de cycle de vie (en €)]\nA_COMPLETER\n",
    "hints": [
      "Le stockage se facture Go par Go : volume × prix unitaire ; les requêtes se facturent par tranche de 1 000.",
      "L'économie de cycle de vie porte sur la différence de prix entre les deux classes, multipliée par le volume déplacé.",
      "1. 2 000 × 0,023. 2. 1 000 × 0,0036. 3. 200 000 / 1 000 × 0,005. 4. 2 000 000 / 1 000 × 0,0004. 5. Additionnez les quatre lignes. 6. 500 × (0,023 − 0,0036)."
    ],
    "examples": [
      {
        "stdin": "Le podcast OndeBasse stocke 500 Go d'épisodes en S3 Standard (0,023 €/Go) et 2 000 Go d'archives en Glacier (0,0036 €/Go).\nCe mois : 100 000 PUT (0,005 €/1 000) et 1 000 000 GET (0,0004 €/1 000).\n\n1) Standard : 500 × 0,023 = 11,50 €.\n2) Glacier : 2 000 × 0,0036 = 7,20 €.\n3) PUT : 100 × 0,005 = 0,50 €.\n4) GET : 1 000 × 0,0004 = 0,40 €.\n5) Total : 11,50 + 7,20 + 0,50 + 0,40 = 19,60 €.\n6) Cycle de vie de 100 Go vers Glacier : 100 × 0,0194 = 1,94 € d'économie.",
        "expected": "11,50 € — 7,20 € — 0,50 € — 0,40 € — total 19,60 € — cycle de vie : 1,94 € d'économie",
        "note": "La classe Glacier coûte environ six fois moins cher que Standard : déplacer les archives est le premier levier d'économie S3."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Coût mensuel du stockage Standard (en €)",
        "stdin": "q:1",
        "expected": "46||46,00||46.00||46 €"
      },
      {
        "label": "Question 2 — Coût mensuel du stockage Glacier (en €)",
        "stdin": "q:2",
        "expected": "3,6||3.6||3,60||3.60||3,6 €||3,60 €"
      },
      {
        "label": "Question 3 — Coût des requêtes PUT (en €)",
        "stdin": "q:3",
        "expected": "1||1,00||1.00||1 €"
      },
      {
        "label": "Question 4 — Coût des requêtes GET (en €)",
        "stdin": "q:4",
        "expected": "0,8||0.8||0,80||0.80||0,8 €||0,80 €"
      },
      {
        "label": "Question 5 — Total de la facture S3 (en €)",
        "stdin": "q:5",
        "expected": "51,4||51.4||51,40||51.40||51,4 €||51,40 €"
      },
      {
        "label": "Question 6 — Économie de la règle de cycle de vie (en €)",
        "stdin": "q:6",
        "expected": "9,7||9.7||9,70||9.70||9,7 €||9,70 €"
      }
    ],
    "solution": "[Question 1 — Coût mensuel du stockage Standard (en €)]\n46\n\n[Question 2 — Coût mensuel du stockage Glacier (en €)]\n3,6\n\n[Question 3 — Coût des requêtes PUT (en €)]\n1\n\n[Question 4 — Coût des requêtes GET (en €)]\n0,8\n\n[Question 5 — Total de la facture S3 (en €)]\n51,4\n\n[Question 6 — Économie de la règle de cycle de vie (en €)]\n9,7",
    "takeaway": "1) Stockage Standard : 2 000 × 0,023 = 46,00 € par mois.\n2) Stockage Glacier : 1 000 × 0,0036 = 3,60 € par mois.\n3) Requêtes PUT : 200 000 / 1 000 × 0,005 = 200 × 0,005 = 1,00 €.\n4) Requêtes GET : 2 000 000 / 1 000 × 0,0004 = 2 000 × 0,0004 = 0,80 €.\n5) Total : 46,00 + 3,60 + 1,00 + 0,80 = 51,40 €.\n6) Économie de cycle de vie : 500 × (0,023 − 0,0036) = 500 × 0,0194 = 9,70 € par mois.\nContrôle : la ligne dominante est le stockage Standard ; la règle de cycle de vie ramènerait la facture à 51,40 − 9,70 = 41,70 €."
  },
  {
    "id": "aws3-c5-e2",
    "chapter": 5,
    "level": "n2",
    "language": "analyse",
    "title": "La base de données du comparateur Assurio",
    "exampleTitle": "Exemple résolu — la base du site de petites annonces Kazar",
    "goal": "Choisir entre RDS multi-AZ et read replica selon l'objectif (disponibilité ou délestage des lectures) et chiffrer le coût.",
    "brief": "<p><strong>Énoncé.</strong> Assurio édite un comparateur d'assurances. Sa base MySQL tourne sur Amazon RDS avec une instance db.t3.medium facturée <strong>0,10 € par heure</strong> (grille simplifiée) ; on retient <strong>730 heures par mois</strong>. La charge mesurée se répartit en <strong>70 % de lectures</strong> et 30 % d'écritures. L'équipe hésite entre deux options :</p><ul><li><strong>multi-AZ</strong> : une instance de secours synchronisée dans une autre zone de disponibilité, avec bascule automatique en cas de panne ; l'instance de secours double la partie instance de la facture ;</li><li><strong>read replica</strong> : une copie asynchrone de la base, dédiée aux requêtes de lecture ; l'application doit cibler explicitement son point de terminaison pour les lectures.</li></ul><p>Les questions 3 et 4 attendent un montant ; les autres une réponse courte. La question 5 attend « oui » ou « non ».</p><ol><li>Quel est l'objectif premier d'un déploiement multi-AZ : haute disponibilité ou répartition des lectures ?</li><li>Quel est l'objectif premier d'un read replica ?</li><li>Quel est le coût mensuel (730 h) de l'instance en mono-AZ, en euros ?</li><li>Quel est le coût mensuel en multi-AZ, en euros, sachant que l'instance de secours double la partie instance ?</li><li>En multi-AZ classique, l'instance de secours peut-elle servir des requêtes de lecture ?</li><li>Pour absorber les 70 % de lectures, quelle option Assurio doit-elle ajouter : multi-AZ ou read replica ?</li></ol>",
    "starter": "# Exercice — La base de données du comparateur Assurio\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 3 et 4 : le montant en euros. Question 5 : oui ou non.\n\n[Question 1 — Objectif premier du multi-AZ]\nA_COMPLETER\n\n[Question 2 — Objectif premier du read replica]\nA_COMPLETER\n\n[Question 3 — Coût mensuel en mono-AZ (en €)]\nA_COMPLETER\n\n[Question 4 — Coût mensuel en multi-AZ (en €)]\nA_COMPLETER\n\n[Question 5 — L'instance de secours peut-elle servir les lectures ?]\nA_COMPLETER\n\n[Question 6 — Option pour absorber les 70 % de lectures]\nA_COMPLETER\n",
    "hints": [
      "Le multi-AZ répond à la question « que se passe-t-il si ma zone tombe ? » ; le read replica répond à « mes lectures saturent-elles ma base ? ».",
      "En multi-AZ, la facture d'instance double ; l'économie de lecture, elle, passe par un point de terminaison supplémentaire.",
      "1. Pensez bascule automatique. 2. Pensez décharger les SELECT. 3. 730 × 0,10. 4. Doublez la ligne précédente. 5. La secours est-elle exposée ? 6. 70 % de la charge est de la lecture."
    ],
    "examples": [
      {
        "stdin": "Le site de petites annonces Kazar fait tourner une base db.t3.medium à 0,08 €/h (730 h/mois).\nSa charge : 80 % de lectures.\n\n1) Mono-AZ : 730 × 0,08 = 58,40 € par mois.\n2) Multi-AZ (secours qui double l'instance) : 116,80 € par mois.\n3) La secours multi-AZ ne sert aucune lecture.\n4) Pour les 80 % de lectures : ajouter un read replica.",
        "expected": "mono-AZ 58,40 € — multi-AZ 116,80 € — secours non lisible — délestage des lectures par un read replica",
        "note": "Multi-AZ achète de la disponibilité ; read replica achète de la capacité de lecture : les deux répondent à des besoins différents."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Objectif premier du multi-AZ",
        "stdin": "q:1",
        "expected": "haute disponibilité||la haute disponibilité||haute disponibilite"
      },
      {
        "label": "Question 2 — Objectif premier du read replica",
        "stdin": "q:2",
        "expected": "le délestage des lectures||délestage des lectures||la répartition des lectures||répartition des lectures||decharger les lectures||le délestage de la charge de lecture"
      },
      {
        "label": "Question 3 — Coût mensuel en mono-AZ (en €)",
        "stdin": "q:3",
        "expected": "73||73,00||73.00||73 €"
      },
      {
        "label": "Question 4 — Coût mensuel en multi-AZ (en €)",
        "stdin": "q:4",
        "expected": "146||146,00||146.00||146 €"
      },
      {
        "label": "Question 5 — L'instance de secours peut-elle servir les lectures ?",
        "stdin": "q:5",
        "expected": "non"
      },
      {
        "label": "Question 6 — Option pour absorber les 70 % de lectures",
        "stdin": "q:6",
        "expected": "read replica||un read replica||le read replica||une réplique de lecture||réplique de lecture"
      }
    ],
    "solution": "[Question 1 — Objectif premier du multi-AZ]\nhaute disponibilité\n\n[Question 2 — Objectif premier du read replica]\nle délestage des lectures\n\n[Question 3 — Coût mensuel en mono-AZ (en €)]\n73\n\n[Question 4 — Coût mensuel en multi-AZ (en €)]\n146\n\n[Question 5 — L'instance de secours peut-elle servir les lectures ?]\nnon\n\n[Question 6 — Option pour absorber les 70 % de lectures]\nread replica",
    "takeaway": "1) L'objectif premier du multi-AZ est la haute disponibilité : l'instance de secours assure une bascule automatique en cas de panne de la zone principale.\n2) L'objectif premier d'un read replica est le délestage des lectures : les requêtes de lecture sont envoyées sur la copie.\n3) Mono-AZ : 730 × 0,10 = 73,00 € par mois.\n4) Multi-AZ : l'instance de secours double la partie instance : 2 × 73,00 = 146,00 € par mois.\n5) Non : en multi-AZ classique, l'instance de secours est passive, elle ne sert aucune requête de lecture.\n6) Les 70 % de lectures relèvent d'un read replica : l'application y enverra ses SELECT.\nContrôle : multi-AZ = 146,00 € pour la disponibilité ; le read replica s'y ajoute si la charge de lecture sature la base."
  },
  {
    "id": "aws3-c5-e3",
    "chapter": 5,
    "level": "n3",
    "language": "analyse",
    "title": "La capacité provisionnée de la table DynamoDB de Notifly",
    "exampleTitle": "Exemple résolu — la table de suivi des colis de Colivie",
    "goal": "Calculer la consommation en RCU et WCU d'une table DynamoDB en capacité provisionnée.",
    "brief": "<p><strong>Énoncé.</strong> Notifly gère les préférences de notification de ses 10 millions d'utilisateurs dans une table DynamoDB fonctionnant en <strong>capacité provisionnée</strong> : <strong>5 unités de lecture (RCU)</strong> et <strong>10 unités d'écriture (WCU)</strong>. Les éléments de la table pèsent entre 1 et 12 Ko.</p><p>Rappels du cours : <strong>1 WCU</strong> autorise 1 écriture par seconde d'un élément d'au plus 1 Ko (au-delà, on arrondit au Ko supérieur) ; <strong>1 RCU</strong> autorise 1 lecture fortement cohérente par seconde d'un élément d'au plus 4 Ko (au-delà, on arrondit au multiple de 4 Ko supérieur) ; une lecture faiblement cohérente consomme la moitié d'une lecture fortement cohérente.</p><p>Toutes les questions attendent un nombre.</p><ol><li>Combien de lectures fortement cohérentes par seconde d'un élément de 4 Ko la table autorise-t-elle ?</li><li>Combien de lectures faiblement cohérentes par seconde du même élément de 4 Ko la table autorise-t-elle ?</li><li>Combien de RCU consomme une lecture fortement cohérente d'un élément de 8 Ko ?</li><li>Combien de WCU consomme l'écriture d'un élément de 2,5 Ko ?</li><li>Avec 10 WCU, combien d'écritures par seconde d'éléments de 1 Ko la table autorise-t-elle ?</li><li>Combien de RCU consomme une lecture fortement cohérente d'un élément de 12 Ko ?</li></ol>",
    "starter": "# Exercice — La capacité provisionnée de la table DynamoDB de Notifly\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Toutes les réponses : le nombre seul.\n\n[Question 1 — Lectures fortement cohérentes par seconde (élément de 4 Ko)]\nA_COMPLETER\n\n[Question 2 — Lectures faiblement cohérentes par seconde (élément de 4 Ko)]\nA_COMPLETER\n\n[Question 3 — RCU d'une lecture fortement cohérente d'un élément de 8 Ko]\nA_COMPLETER\n\n[Question 4 — WCU de l'écriture d'un élément de 2,5 Ko]\nA_COMPLETER\n\n[Question 5 — Écritures par seconde d'éléments de 1 Ko]\nA_COMPLETER\n\n[Question 6 — RCU d'une lecture fortement cohérente d'un élément de 12 Ko]\nA_COMPLETER\n",
    "hints": [
      "Pour lire, découpez la taille de l'élément en tranches de 4 Ko arrondies vers le haut ; pour écrire, en tranches de 1 Ko arrondies vers le haut.",
      "La lecture faiblement cohérente coûte moitié prix : une même table en sert deux fois plus.",
      "1. 4 Ko tient dans 1 RCU. 2. La cohérence finale divise par 2. 3. 8 Ko = 2 tranches de 4 Ko. 4. 2,5 Ko s'arrondit à 3 Ko. 5. 1 Ko = 1 WCU. 6. 12 Ko = 3 tranches de 4 Ko."
    ],
    "examples": [
      {
        "stdin": "La table de suivi des colis de Colivie est provisionnée à 8 RCU et 20 WCU.\n\n1) Un élément de 3 Ko se lit fortement cohérent pour 1 RCU (3 ≤ 4).\n2) Un élément de 6 Ko en coûte 2 (6 dépasse 4, on arrondit à 8 : 2 tranches).\n3) Écrire un élément de 1,2 Ko consomme 2 WCU (arrondi à 2 Ko).\n4) Avec 8 RCU, la table sert 16 lectures faiblement cohérentes par seconde d'éléments de 4 Ko.",
        "expected": "3 Ko : 1 RCU — 6 Ko : 2 RCU — écriture 1,2 Ko : 2 WCU — 16 lectures faibles par seconde",
        "note": "Les arrondis se font toujours vers le haut : un élément de 4,1 Ko lit pour 2 RCU, un élément de 0,5 Ko écrit pour 1 WCU."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Lectures fortement cohérentes par seconde (élément de 4 Ko)",
        "stdin": "q:1",
        "expected": "5||cinq||5 lectures"
      },
      {
        "label": "Question 2 — Lectures faiblement cohérentes par seconde (élément de 4 Ko)",
        "stdin": "q:2",
        "expected": "10||dix||10 lectures"
      },
      {
        "label": "Question 3 — RCU d'une lecture fortement cohérente d'un élément de 8 Ko",
        "stdin": "q:3",
        "expected": "2||deux||2 rcu"
      },
      {
        "label": "Question 4 — WCU de l'écriture d'un élément de 2,5 Ko",
        "stdin": "q:4",
        "expected": "3||trois||3 wcu"
      },
      {
        "label": "Question 5 — Écritures par seconde d'éléments de 1 Ko",
        "stdin": "q:5",
        "expected": "10||dix||10 écritures"
      },
      {
        "label": "Question 6 — RCU d'une lecture fortement cohérente d'un élément de 12 Ko",
        "stdin": "q:6",
        "expected": "3||trois||3 rcu"
      }
    ],
    "solution": "[Question 1 — Lectures fortement cohérentes par seconde (élément de 4 Ko)]\n5\n\n[Question 2 — Lectures faiblement cohérentes par seconde (élément de 4 Ko)]\n10\n\n[Question 3 — RCU d'une lecture fortement cohérente d'un élément de 8 Ko]\n2\n\n[Question 4 — WCU de l'écriture d'un élément de 2,5 Ko]\n3\n\n[Question 5 — Écritures par seconde d'éléments de 1 Ko]\n10\n\n[Question 6 — RCU d'une lecture fortement cohérente d'un élément de 12 Ko]\n3",
    "takeaway": "1) Un élément de 4 Ko tient exactement dans 1 RCU : avec 5 RCU, la table sert 5 lectures fortement cohérentes par seconde.\n2) La lecture faiblement cohérente coûte 0,5 RCU : 5 / 0,5 = 10 lectures faiblement cohérentes par seconde.\n3) 8 Ko dépasse 4 Ko : arrondi à 8, soit 2 tranches de 4 Ko, donc 2 RCU par lecture.\n4) 2,5 Ko s'arrondit au Ko supérieur : 3 Ko, donc 3 WCU par écriture.\n5) Un élément de 1 Ko consomme exactement 1 WCU : avec 10 WCU, 10 écritures par seconde.\n6) 12 Ko = 3 tranches de 4 Ko exactement : 3 RCU par lecture fortement cohérente.\nContrôle : 5 RCU = 5 lectures fortes ou 10 faibles d'éléments de 4 Ko ; 10 WCU = 10 écritures de 1 Ko : chaque unité se paie par tranche arrondie vers le haut."
  }
];
