/**
 * Contenu du cours « Services Cloud AWS B3 » (dossier `b3-cloud-aws/`).
 *
 * Les données de ce cours sont mises en page par `scripts/generate-courses.js`
 * (voir `scripts/course-kit.js`) : aucune page n'est écrite à la main ici, et
 * aucune page ne doit être éditée à la main dans le dossier b3-cloud-aws/.
 */
'use strict';

const chapitres = [
  ...require('./b3-cloud-aws/chapitres-1-3'),
  ...require('./b3-cloud-aws/chapitres-4-6')
];

const pages = require('./b3-cloud-aws/pages');

const course = {
  id: 'b3-cloud-aws',
  slug: 'b3-cloud-aws',
  brand: 'Services Cloud AWS B3',
  brandIcon: 'cloud',

  // Palette Warm Amber / Rust / Deep Slate conforme WCAG AA/AAA (4.88:1 / 9.54:1 sur fond clair)
  accent: '#c2410c',
  accentDeep: '#7c2d12',
  accentSoft: '#fff7ed',
  accentBorder: '#fed7aa',

  storeKey: 'b3aws:progress',

  title: 'Services Cloud AWS B3 — Infrastructure Globale &amp; Well-Architected Framework, Sécurité IAM &amp; Gouvernance Multi-Comptes, Calcul EC2 &amp; EBS, Réseau Amazon VPC, Stockage S3 &amp; Bases RDS/DynamoDB, et Serverless Lambda &amp; Observabilité CloudWatch',
  description:
    'Formation d\'excellence en ingénierie et architecture Amazon Web Services pour le Bachelor 3 : ' +
    'infrastructure mondiale distribuée (Régions, Availability Zones indépendantes, Edge Locations CloudFront), modèle de responsabilité partagée (IaaS, PaaS, Serverless), outils d\'administration (Console, AWS CLI v2, CloudShell) et les 6 piliers du Well-Architected Framework, ' +
    'gestion des identités et des accès avec AWS IAM (utilisateurs, groupes, rôles temporaires STS, Instance Profiles pour EC2), syntaxe des politiques d\'autorisation JSON, moteur d\'évaluation strict (Default Deny, priorité absolue de l\'Explicit Deny), cycle de vie et rotation des clés d\'accès AKIA (90 jours), et gouvernance multi-comptes avec AWS Organizations et Service Control Policies (SCPs), ' +
    'calcul et conteneurs avec Amazon EC2 (familles General Purpose, Compute, Memory, Storage), modèles d\'achat et optimisation FinOps (On-Demand, Reserved Instances, Savings Plans, Spot), stockage bloc persistant Amazon EBS (volumes SSD gp3 et io2 Block Express, snapshots incrémentaux, chiffrement KMS), répartiteurs de charge Elastic Load Balancing (ALB couche 7 et NLB couche 4), groupes Auto Scaling multi-AZ équilibrés et conteneurs serverless AWS Fargate (ECS/EKS), ' +
    'réseau isolé Amazon VPC (adressage CIDR RFC 1918 de /16 à /28, les 5 adresses IP réservées par sous-réseau), sous-réseaux publics et privés multi-AZ, tables de routage avec passerelles Internet (IGW) et NAT Gateway managée, sécurité périmétrique combinée avec Security Groups avec état (stateful) et Network ACLs sans état (stateless avec ports éphémères), et interconnexions (VPC Peering, Transit Gateway, VPC Endpoints PrivateLink et Direct Connect), ' +
    'stockage objet distribué Amazon S3 (durabilité 11 neuf 99.999999999%, classes Standard, Intelligent-Tiering, Standard-IA, Glacier Deep Archive), politiques de cycle de vie et S3 Block Public Access, système de fichiers partagé NFS v4 Amazon EFS multi-AZ, bases de données relationnelles managées Amazon RDS (haute disponibilité Multi-AZ vs répliques en lecture Read Replicas) et Amazon Aurora à stockage distribué répliqué 6x, et base NoSQL Amazon DynamoDB (partition key, sort key, dimensionnement RCU/WCU et modes de cohérence), ' +
    'et enfin architecture serverless pilotée par les événements avec AWS Lambda (cold start, Provisioned Concurrency, facturation aux Go-secondes), découplage asynchrone avec files d\'attente Amazon SQS et Dead-Letter Queue (DLQ), notifications Pub/Sub Amazon SNS et patron Fan-out, observabilité centralisée avec Amazon CloudWatch (métriques, logs, alarmes), traçabilité d\'audit avec AWS CloudTrail et Infrastructure as Code avec AWS CloudFormation et CDK.',
  lead:
    'Maîtrisez l\'ingénierie et l\'architecture Amazon Web Services : infrastructure mondiale, IAM & politiques JSON, calcul EC2, réseau Amazon VPC, stockage S3, bases RDS/DynamoDB, serverless Lambda et CloudWatch. ' +
    'Six modules complets, 18 études de cas pratiques et méthodologiques et 48 QCM d\'évaluation.',

  sources: 'Supports de cours officiels Services Cloud AWS L3-ASI (Enseignant : AGOUTOCO-POKO Caleb Benaja, 2025/2026), Documentation officielle Amazon Web Services (AWS Architecture Center), Référentiels des certifications AWS Certified Cloud Practitioner (CLF-C02) et Solutions Architect - Associate (SAA-C03)',

  chapters: chapitres.map(chapitre => ({ n: chapitre.n, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapitres);
  }
};

module.exports = course;
