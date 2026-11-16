'use strict';

module.exports = [
  {
    "id": "aws3-c1-e1",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "Le lancement européen de la plateforme Verdolivr",
    "exampleTitle": "Exemple résolu — l'ouverture québécoise de l'épicerie Boréal",
    "goal": "Situer régions, zones de disponibilité et edge locations dans le choix d'une première infrastructure AWS.",
    "brief": "<p><strong>Énoncé.</strong> Verdolivr est une jeune entreprise lyonnaise qui prépare le lancement de sa plateforme de commande de paniers bio. Ses clients se trouvent à Lyon et à Paris. Avant l'ouverture du service, la cheffe technique prépare l'infrastructure AWS : choix de la région, répartition sur plusieurs zones de disponibilité et diffusion des photos des produits.</p><p>Rappels du cours : une région est un ensemble de zones de disponibilité ; chaque zone de disponibilité est composée d'un ou plusieurs centres de données physiques à l'alimentation, au réseau et à la connectivité redondants ; les edge locations sont des points de présence répartis dans le monde, utilisés par le réseau de diffusion de contenu (CDN) d'AWS.</p><p>La question 1 attend un code de région (par exemple us-east-1) ; la question 5 attend « oui » ou « non ».</p><ol><li>Quelle région AWS l'équipe doit-elle choisir pour héberger la plateforme au plus près de ses clients parisiens et lyonnais ?</li><li>Combien de zones de disponibilité le déploiement doit-il couvrir au minimum pour survivre à la panne d'une zone entière ?</li><li>Quel service AWS de diffusion de contenu sert les photos des produits depuis des edge locations au plus près des clients ?</li><li>De quoi chaque zone de disponibilité est-elle matériellement constituée ?</li><li>Le trafic réseau entre deux zones de disponibilité d'une même région traverse-t-il l'Internet public ?</li></ol>",
    "starter": "# Exercice — Le lancement européen de la plateforme Verdolivr\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Question 1 : le code de la région. Question 5 : oui ou non.\n\n[Question 1 — Région la plus proche des clients]\nA_COMPLETER\n\n[Question 2 — Nombre minimal de zones de disponibilité]\nA_COMPLETER\n\n[Question 3 — Service de diffusion depuis les edge locations]\nA_COMPLETER\n\n[Question 4 — Constitution matérielle d'une zone de disponibilité]\nA_COMPLETER\n\n[Question 5 — Le trafic inter-zones traverse-t-il l'Internet public ?]\nA_COMPLETER\n",
    "hints": [
      "Une région porte un code comme eu-west-3 ou ca-central-1 : retenez celle qui héberge un cluster au plus près des utilisateurs finaux.",
      "La haute disponibilité commence à deux zones de disponibilité : tant qu'une zone survit, le service reste accessible.",
      "1. Cherchez la région dont le code désigne Paris. 2. Une panne de zone ne doit pas arrêter le service. 3. Le CDN d'AWS s'appelle CloudFront. 4. Une zone = un ou plusieurs centres de données redondants. 5. Les liens entre zones d'une même région sont privés."
    ],
    "examples": [
      {
        "stdin": "L'épicerie en ligne Boréal ouvre son service à Montréal et prépare son infrastructure AWS.\n\n1) Région la plus proche des clients : ca-central-1 (Canada).\n2) Deux zones de disponibilité au minimum pour survivre à la panne d'une zone.\n3) Les photos des produits sont servies par CloudFront depuis des edge locations.\n4) Une zone de disponibilité = un ou plusieurs centres de données redondants.\n5) Le trafic entre deux zones d'une même région ne traverse pas l'Internet public.",
        "expected": "ca-central-1 — 2 zones — CloudFront — un ou plusieurs centres de données — pas d'Internet public",
        "note": "Les zones d'une même région sont interconnectées par des liens réseau privés : le trafic inter-zones ne sort jamais sur Internet."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Région la plus proche des clients",
        "stdin": "q:1",
        "expected": "eu-west-3||europe (paris)||europe paris||la région eu-west-3 (paris)||eu-west-3 paris"
      },
      {
        "label": "Question 2 — Nombre minimal de zones de disponibilité",
        "stdin": "q:2",
        "expected": "2||deux||2 zones||deux zones||2 zones de disponibilité"
      },
      {
        "label": "Question 3 — Service de diffusion depuis les edge locations",
        "stdin": "q:3",
        "expected": "cloudfront||amazon cloudfront||aws cloudfront||le cloudfront||cloudfront (le cdn d'aws)"
      },
      {
        "label": "Question 4 — Constitution matérielle d'une zone de disponibilité",
        "stdin": "q:4",
        "expected": "un ou plusieurs centres de données||un ou plusieurs centres de données redondants||un ou plusieurs data centers||plusieurs centres de données||des centres de données redondants"
      },
      {
        "label": "Question 5 — Le trafic inter-zones traverse-t-il l'Internet public ?",
        "stdin": "q:5",
        "expected": "non"
      }
    ],
    "solution": "[Question 1 — Région la plus proche des clients]\neu-west-3\n\n[Question 2 — Nombre minimal de zones de disponibilité]\n2\n\n[Question 3 — Service de diffusion depuis les edge locations]\ncloudfront\n\n[Question 4 — Constitution matérielle d'une zone de disponibilité]\nun ou plusieurs centres de données\n\n[Question 5 — Le trafic inter-zones traverse-t-il l'Internet public ?]\nnon",
    "takeaway": "1) Les clients sont à Paris et Lyon : la région Europe (Paris), de code eu-west-3, héberge l'infrastructure au plus proche d'eux.\n2) Pour survivre à la panne d'une zone entière, il faut couvrir au minimum 2 zones de disponibilité (déploiement multi-AZ).\n3) CloudFront, le réseau de diffusion de contenu d'AWS, sert les photos depuis des edge locations proches des clients.\n4) Une zone de disponibilité regroupe un ou plusieurs centres de données physiques dotés d'une alimentation, d'un réseau et d'une connectivité redondants.\n5) Non : les zones d'une même région sont reliées par des liens réseau privés ; le trafic inter-zones ne traverse pas l'Internet public.\nContrôle : région (eu-west-3), deux zones, CDN (CloudFront) : c'est le triptyque région / zone de disponibilité / edge location du chapitre 1."
  },
  {
    "id": "aws3-c1-e2",
    "chapter": 1,
    "level": "n2",
    "language": "analyse",
    "title": "L'audit de responsabilité partagée du site marchand Vitrio",
    "exampleTitle": "Exemple résolu — l'audit du média en ligne RégionSud",
    "goal": "Appliquer le modèle de responsabilité partagée pour attribuer chaque tâche de sécurité à AWS ou au client.",
    "brief": "<p><strong>Énoncé.</strong> Vitrio est un site marchand de décoration. Son architecture tourne sur des instances EC2 sous Amazon Linux, une base de données RDS MySQL, un bucket S3 qui stocke les photos des produits et des fonctions Lambda qui génèrent les vignettes. La nouvelle responsable sécurité passe l'infrastructure en revue et doit dire, pour chaque tâche, si elle incombe à <strong>AWS</strong> (sécurité DU cloud) ou à <strong>Vitrio</strong>, le client (sécurité DANS le cloud).</p><p>Rappel du cours : AWS répond du matériel physique, des hyperviseurs, des bâtiments et du réseau sous-jacent, ainsi que des services managés (OS et runtimes des services comme RDS ou Lambda) ; le client répond de ses données, de ses identités IAM, de la configuration de ses ressources et des patchs des OS invités de ses instances EC2.</p><p>Pour chaque tâche, répondez « AWS » ou « Vitrio ».</p><ol><li>Appliquer les correctifs de sécurité du système d'exploitation Amazon Linux des instances EC2.</li><li>Mettre à jour le système d'exploitation sous-jacent du serveur de la base RDS MySQL.</li><li>Sécuriser physiquement les centres de données (alimentation, gardiennage, réseau physique).</li><li>Maintenir à jour le runtime d'exécution des fonctions Lambda.</li><li>Configurer la politique d'accès du bucket S3 et son blocage d'accès public.</li><li>Gérer les utilisateurs, groupes et rôles IAM du compte de Vitrio.</li></ol>",
    "starter": "# Exercice — L'audit de responsabilité partagée du site marchand Vitrio\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Pour chaque tâche, répondez AWS ou Vitrio.\n\n[Question 1 — Correctifs de l'OS Amazon Linux des instances EC2]\nA_COMPLETER\n\n[Question 2 — Mise à jour de l'OS du serveur RDS MySQL]\nA_COMPLETER\n\n[Question 3 — Sécurité physique des centres de données]\nA_COMPLETER\n\n[Question 4 — Runtime d'exécution des fonctions Lambda]\nA_COMPLETER\n\n[Question 5 — Politique d'accès du bucket S3 et blocage public]\nA_COMPLETER\n\n[Question 6 — Utilisateurs, groupes et rôles IAM du compte]\nA_COMPLETER\n",
    "hints": [
      "Classez chaque tâche selon la couche : tout ce qui est sous la couche managée (matériel, hyperviseur, OS des services managés) relève d'AWS.",
      "Tout ce que le client configure lui-même (données, IAM, OS invité de ses EC2, politiques de ses buckets) relève de sa responsabilité.",
      "1. L'OS invité d'une instance EC2 appartient au client. 2. RDS est managé : AWS patche. 3. La sécurité physique est toujours AWS. 4. Le runtime Lambda est managé. 5. La configuration S3 est au client. 6. L'IAM est au client."
    ],
    "examples": [
      {
        "stdin": "Le média en ligne RégionSud exploite EC2, RDS PostgreSQL, S3 et Lambda.\n\n1) Patch de l'OS invité des instances EC2 : le média (le client).\n2) Sécurité des hyperviseurs : AWS.\n3) Chiffrement applicatif des données stockées dans S3 : le média (le client).\n4) Disponibilité du matériel sous le service managé RDS : AWS.\n5) Gestion des identités IAM : le média (le client).",
        "expected": "OS invité : client — hyperviseurs : AWS — chiffrement des données : client — matériel managé : AWS — IAM : client",
        "note": "AWS répond de tout ce qui se situe sous la couche managée ; le client répond de ses données, de son IAM et de la configuration de ses ressources."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Correctifs de l'OS Amazon Linux des instances EC2",
        "stdin": "q:1",
        "expected": "vitrio||le client||client||l'entreprise||vitrio (le client)"
      },
      {
        "label": "Question 2 — Mise à jour de l'OS du serveur RDS MySQL",
        "stdin": "q:2",
        "expected": "aws||amazon"
      },
      {
        "label": "Question 3 — Sécurité physique des centres de données",
        "stdin": "q:3",
        "expected": "aws||amazon"
      },
      {
        "label": "Question 4 — Runtime d'exécution des fonctions Lambda",
        "stdin": "q:4",
        "expected": "aws||amazon"
      },
      {
        "label": "Question 5 — Politique d'accès du bucket S3 et blocage public",
        "stdin": "q:5",
        "expected": "vitrio||le client||client||l'entreprise"
      },
      {
        "label": "Question 6 — Utilisateurs, groupes et rôles IAM du compte",
        "stdin": "q:6",
        "expected": "vitrio||le client||client||l'entreprise"
      }
    ],
    "solution": "[Question 1 — Correctifs de l'OS Amazon Linux des instances EC2]\nvitrio\n\n[Question 2 — Mise à jour de l'OS du serveur RDS MySQL]\naws\n\n[Question 3 — Sécurité physique des centres de données]\naws\n\n[Question 4 — Runtime d'exécution des fonctions Lambda]\naws\n\n[Question 5 — Politique d'accès du bucket S3 et blocage public]\nvitrio\n\n[Question 6 — Utilisateurs, groupes et rôles IAM du compte]\nvitrio",
    "takeaway": "1) L'OS invité d'une instance EC2 relève de la sécurité DANS le cloud : Vitrio applique elle-même les correctifs.\n2) RDS est un service managé : l'OS du serveur de base de données est patché par AWS.\n3) La sécurité physique des centres de données (bâtiments, alimentation, réseau) est de la responsabilité d'AWS.\n4) Le runtime des fonctions Lambda est maintenu par AWS : le client ne gère aucun serveur.\n5) La configuration du bucket S3 (politiques, blocage d'accès public) appartient au client.\n6) La gestion des identités IAM est toujours de la responsabilité du client.\nContrôle : AWS = infrastructure et services managés (questions 2, 3, 4) ; Vitrio = OS invité, configuration et IAM (questions 1, 5, 6)."
  },
  {
    "id": "aws3-c1-e3",
    "chapter": 1,
    "level": "n2",
    "language": "analyse",
    "title": "La disponibilité multi-AZ de la billetterie Skena",
    "exampleTitle": "Exemple résolu — la disponibilité de la visioconférence AlloSee",
    "goal": "Calculer la disponibilité d'une architecture en série et en parallèle (multi-AZ) et convertir un SLA en temps d'arrêt annuel.",
    "brief": "<p><strong>Énoncé.</strong> Skena vend des billets de concerts en ligne sur AWS. Son contrat avec les organisateurs promet un service hautement disponible. L'équipe technique décrit l'architecture : la couche application est déployée sur des instances EC2 en <strong>multi-AZ</strong> sur deux zones de disponibilité redondantes derrière un répartiteur de charge <strong>Application Load Balancer (ALB)</strong>, chaque zone offrant <strong>99,9 %</strong> de disponibilité ; la base de données <strong>Amazon RDS</strong>, elle, reste en <strong>zone unique</strong> à 99,9 %.</p><p>Rappels du cours : une année compte 8 760 heures, soit 525 600 minutes ; en série, les disponibilités se multiplient (A = A<sub>1</sub> × A<sub>2</sub>) ; en parallèle (redondance multi-AZ), les indisponibilités se multiplient (A = 1 − (1 − A<sub>1</sub>) × (1 − A<sub>2</sub>)).</p><p>Les questions 1 à 4 attendent un nombre ; les questions 5 et 6 attendent une réponse courte.</p><ol><li>Quel temps d'arrêt annuel maximal un SLA de 99,9 % autorise-t-il, en minutes (une décimale) ?</li><li>Quelle est la disponibilité de la couche application multi-AZ (deux zones à 99,9 % chacune), en pourcentage à quatre décimales ?</li><li>Quel temps d'arrêt annuel cette disponibilité autorise-t-elle, en minutes (deux décimales) ?</li><li>La chaîne bout en bout met la couche application multi-AZ en série avec la base en zone unique : quelle est la disponibilité de bout en bout, en pourcentage arrondi à deux décimales ?</li><li>Quel maillon limite désormais la disponibilité de bout en bout ?</li><li>Quel déploiement appliquer à la base de données pour la rendre tolérante à la panne d'une zone ?</li></ol>",
    "starter": "# Exercice — La disponibilité multi-AZ de la billetterie Skena\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 4 : le nombre seul. Questions 5 et 6 : réponse courte.\n\n[Question 1 — Temps d'arrêt annuel d'un SLA de 99,9 % (minutes)]\nA_COMPLETER\n\n[Question 2 — Disponibilité multi-AZ à deux zones (%)]\nA_COMPLETER\n\n[Question 3 — Temps d'arrêt annuel multi-AZ (minutes)]\nA_COMPLETER\n\n[Question 4 — Disponibilité de bout en bout (%)]\nA_COMPLETER\n\n[Question 5 — Maillon qui limite la disponibilité]\nA_COMPLETER\n\n[Question 6 — Déploiement à appliquer à la base de données]\nA_COMPLETER\n",
    "hints": [
      "Le temps d'arrêt annuel se calcule sur 525 600 minutes : arrêt = (1 − disponibilité) × 525 600.",
      "En parallèle, multipliez les indisponibilités : 0,001 × 0,001 ; en série, multipliez directement les disponibilités.",
      "1. Arrêt = 0,001 × 525 600. 2. Multi-AZ : 1 − (0,001)². 3. Arrêt multi-AZ = 0,000001 × 525 600. 4. Série : disponibilité application × disponibilité base. 5. et 6. Cherchez le composant resté sans redondance."
    ],
    "examples": [
      {
        "stdin": "La plateforme de visioconférence AlloSee déploie son application sur 2 zones à 99,5 % chacune,\nsa base de données restant en zone unique à 99,5 %.\n\n1) Arrêt annuel d'un SLA de 99,5 % : 525 600 × 0,005 = 2 628 minutes.\n2) Application multi-AZ : 1 − 0,005² = 99,9975 %.\n3) Chaîne série avec la base : 0,999975 × 0,995 = 99,50 %.\n4) Maillon faible : la base de données en zone unique.",
        "expected": "2 628 min — application multi-AZ 99,9975 % — chaîne 99,50 % — maillon faible : la base de données",
        "note": "La redondance de la couche application ne rattrape pas la zone unique de la base : le maillon le plus faible fixe la disponibilité de la chaîne."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Temps d'arrêt annuel d'un SLA de 99,9 % (minutes)",
        "stdin": "q:1",
        "expected": "525,6||525.6||525,6 minutes"
      },
      {
        "label": "Question 2 — Disponibilité multi-AZ à deux zones (%)",
        "stdin": "q:2",
        "expected": "99,9999||99.9999||99,9999 %||99,9999%"
      },
      {
        "label": "Question 3 — Temps d'arrêt annuel multi-AZ (minutes)",
        "stdin": "q:3",
        "expected": "0,53||0.53||0,5256||0.5256||0,53 minutes"
      },
      {
        "label": "Question 4 — Disponibilité de bout en bout (%)",
        "stdin": "q:4",
        "expected": "99,9||99.9||99,90||99.90||99,8999||99.8999||99,9 %||99,90 %"
      },
      {
        "label": "Question 5 — Maillon qui limite la disponibilité",
        "stdin": "q:5",
        "expected": "la base de données||la base||la base de données en zone unique||la base de données rds"
      },
      {
        "label": "Question 6 — Déploiement à appliquer à la base de données",
        "stdin": "q:6",
        "expected": "multi-az||multi az||multiaz||le multi-az||le déploiement multi-az||multi-az (rds)"
      }
    ],
    "solution": "[Question 1 — Temps d'arrêt annuel d'un SLA de 99,9 % (minutes)]\n525,6\n\n[Question 2 — Disponibilité multi-AZ à deux zones (%)]\n99,9999\n\n[Question 3 — Temps d'arrêt annuel multi-AZ (minutes)]\n0,53\n\n[Question 4 — Disponibilité de bout en bout (%)]\n99,9\n\n[Question 5 — Maillon qui limite la disponibilité]\nla base de données\n\n[Question 6 — Déploiement à appliquer à la base de données]\nmulti-az",
    "takeaway": "1) SLA de 99,9 % : arrêt = 0,001 × 525 600 = 525,6 minutes par an.\n2) Application multi-AZ : A = 1 − (1 − 0,999)² = 1 − 0,000001 = 0,999999, soit 99,9999 %.\n3) Arrêt correspondant : 0,000001 × 525 600 = 0,5256, soit 0,53 minute par an (environ 32 secondes).\n4) Chaîne série : 0,999999 × 0,999 = 0,998999001, soit 99,90 % arrondi à deux décimales.\n5) Le maillon faible est la base de données restée en zone unique : à 99,9 %, elle plafonne la chaîne.\n6) Il faut passer la base en déploiement multi-AZ : une instance de secours synchronisée dans une autre zone assure la bascule.\nContrôle : 525,6 min + le gain multi-AZ = 0,53 min ; la chaîne (99,90 %) ne dépasse pas le plus faible de ses maillons série."
  }
];
