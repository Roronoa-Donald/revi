/**
 * Pages « cartes » (flashcards) et « formules » (mémento) du cours « Services Cloud AWS B3 ».
 */
'use strict';

const { crumb, cards } = require('../../../../scripts/course-kit');
const { chnav, disclaimer } = require('./helpers');

/* ======================== Cartes Flashcards ======================== */

function cartes(course, chapterList) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Cartes de révision' }
  ]);

  const modules = chapterList.map(ch => ({
    title: 'Module ' + ch.n + ' — ' + ch.short,
    items: ch.flashcards || []
  }));

  const body = [
    crumbs,
    '  <h1>Cartes de Révision &amp; Mémorisation Active — Services Cloud AWS B3</h1>',
    '  <p class="lead">36 fiches synthétiques pour ancrer les concepts fondamentaux de l\'architecture et de l\'ingénierie Amazon Web Services : Infrastructure globale (Régions, AZs, Edge Locations), Modèle de responsabilité partagée, IAM et politiques JSON, Rôles et gouvernance AWS Organizations/SCPs, Instances EC2 et modèles d\'achat (On-Demand/Reserved/Spot), Volumes EBS gp3/io2, Auto Scaling Groups et ALB, Réseau Amazon VPC et 5 IPs réservées, Security Groups avec état et Network ACLs sans état, Classes de stockage S3 et cycle de vie, Bases de données relationnelles RDS multi-AZ et Aurora, NoSQL DynamoDB avec RCU/WCU, Fonctions serverless AWS Lambda, Files d\'attente SQS et DLQ, et supervision avec Amazon CloudWatch et CloudTrail.</p>',
    '',
    cards(modules),
    '',
    chnav({ href: '../sommaire.html', label: 'Sommaire général' }, { href: 'formules.html', label: 'Consulter le mémento technique' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/cartes.html': {
      title: 'Cartes de révision — ' + course.brand,
      description: 'Flashcards de révision du cours Services Cloud AWS B3 : Infrastructure, IAM, EC2, VPC, S3, RDS, Lambda et CloudWatch.',
      active: 'cartes',
      body
    }
  };
}

/* ======================== Formules & Mémento ======================== */

function formules(course) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Formules &amp; Mémento' }
  ]);

  const body = [
    crumbs,
    '  <h1>Mémento Technique &amp; Guide Opérationnel — Services Cloud AWS B3</h1>',
    '  <p class="lead">Synthèse condensée des commandes AWS CLI indispensables, structure des ARN, politiques IAM JSON, règles d\'adressage VPC, formules de dimensionnement S3/DynamoDB et piliers du Well-Architected Framework.</p>',
    '',
    '  <h2>1. Commandes Clés de l\'AWS CLI (v2)</h2>',
    '  <table class="table">',
    '    <thead><tr><th>Domaine</th><th>Commande AWS CLI</th><th>Description &amp; Action</th></tr></thead>',
    '    <tbody>',
    '      <tr><td><strong>Configuration</strong></td><td><code>aws configure</code></td><td>Définit Access Key ID, Secret Access Key, région par défaut (ex: <code>eu-west-3</code>) et format de sortie (<code>json</code>).</td></tr>',
    '      <tr><td><strong>Identité IAM</strong></td><td><code>aws sts get-caller-identity</code></td><td>Affichez l\'identifiant de compte, l\'ARN utilisateur ou le rôle IAM de la session courante.</td></tr>',
    '      <tr><td><strong>Calcul EC2</strong></td><td><code>aws ec2 describe-instances --filters "Name=instance-state-name,Values=running"</code></td><td>Liste toutes les instances EC2 actives avec leurs adresses IP privées et publiques.</td></tr>',
    '      <tr><td><strong>Calcul EC2</strong></td><td><code>aws ec2 run-instances --image-id ami-xxxx --instance-type t3.micro --key-name ma-cle</code></td><td>Démarre une nouvelle machine virtuelle EC2 avec son image AMI et sa paire de clés SSH.</td></tr>',
    '      <tr><td><strong>Stockage S3</strong></td><td><code>aws s3 ls</code> / <code>aws s3 sync ./dist s3://mon-bucket/</code></td><td>Liste les buckets ou synchronise une arborescence locale vers un compartiment de stockage S3.</td></tr>',
    '      <tr><td><strong>Réseau VPC</strong></td><td><code>aws ec2 describe-vpcs</code> / <code>describe-subnets</code></td><td>Inspecte les plages d\'adresses CIDR, tables de routage associées et passerelles Internet.</td></tr>',
    '      <tr><td><strong>Serverless</strong></td><td><code>aws lambda invoke --function-name TraiterCommande out.json</code></td><td>Invoque synchrone une fonction serverless et consigne le retour d\'exécution dans un fichier JSON.</td></tr>',
    '      <tr><td><strong>Supervision</strong></td><td><code>aws cloudwatch get-metric-statistics ...</code></td><td>Extrait les séries temporelles de métriques (CPUUtilization, NetworkIn, DiskReadBytes).</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>2. Structure Canonique d\'un ARN (Amazon Resource Name)</h2>',
    '  <p>L\'ARN identifie de manière univoque toute ressource à travers les régions et les comptes :</p>',
    '  <pre><code>arn:partition:service:region:account-id:resource-id\narn:partition:service:region:account-id:resourcetype/resource-id\narn:partition:service:region:account-id:resourcetype:resource-id</code></pre>',
    '  <ul>',
    '    <li><strong>partition :</strong> <code>aws</code> (commercial mondial), <code>aws-cn</code> (Chine), <code>aws-us-gov</code> (Gouvernement US).</li>',
    '    <li><strong>service :</strong> identifiant minuscule (<code>s3</code>, <code>ec2</code>, <code>iam</code>, <code>lambda</code>, <code>dynamodb</code>).</li>',
    '    <li><strong>region :</strong> vide pour les services globaux (S3, IAM, Route 53, CloudFront) ou code géographique (<code>eu-west-3</code> pour Paris, <code>us-east-1</code> pour N. Virginia).</li>',
    '    <li><strong>account-id :</strong> exactement 12 chiffres décimaux (ou vide pour S3).</li>',
    '  </ul>',
    '',
    '  <h2>3. Structure d\'une Politique IAM JSON &amp; Ordre d\'Évaluation</h2>',
    '  <pre><code>{\n  "Version": "2012-10-17",\n  "Statement": [\n    {\n      "Sid": "AllowS3ReadSpecificBucket",\n      "Effect": "Allow",\n      "Action": ["s3:GetObject", "s3:ListBucket"],\n      "Resource": [\n        "arn:aws:s3:::mon-bucket-prod",\n        "arn:aws:s3:::mon-bucket-prod/*"\n      ]\n    },\n    {\n      "Sid": "DenySensitiveBucketDelete",\n      "Effect": "Deny",\n      "Action": "s3:DeleteBucket",\n      "Resource": "*"\n    }\n  ]\n}</code></pre>',
    '  <p><strong>Règle d\'or :</strong> <em>Default Deny</em> &rarr; <em>Explicit Deny</em> (priorité absolue immuable) &rarr; <em>Explicit Allow</em> (si aucun Deny) &rarr; <em>Default Deny</em> final.</p>',
    '',
    '  <h2>4. Adressage VPC &amp; Les 5 Adresses IP Réservées par Sous-Réseau</h2>',
    '  <table class="table">',
    '    <thead><tr><th>Offset IP</th><th>Rôle &amp; Affectation AWS</th><th>Exemple (/24 : 10.0.1.0/24)</th></tr></thead>',
    '    <tbody>',
    '      <tr><td><code>.0</code></td><td>Adresse réseau du sous-réseau</td><td><code>10.0.1.0</code></td></tr>',
    '      <tr><td><code>.1</code></td><td>Passerelle par défaut VPC (Routeur virtuel)</td><td><code>10.0.1.1</code></td></tr>',
    '      <tr><td><code>.2</code></td><td>Résolveur DNS AmazonProvidedDNS (Route 53 Resolver)</td><td><code>10.0.1.2</code></td></tr>',
    '      <tr><td><code>.3</code></td><td>Réservé par AWS pour extension future</td><td><code>10.0.1.3</code></td></tr>',
    '      <tr><td><code>.255</code> (Dernière)</td><td>Adresse de diffusion (Broadcast réseau)</td><td><code>10.0.1.255</code></td></tr>',
    '    </tbody>',
    '  </table>',
    '  <p><strong>Formule :</strong> Nombre d\'adresses assignables à des interfaces réseau = <code>2^(32 - masque) - 5</code>.</p>',
    '',
    '  <h2>5. Comparatif des Pare-feux : Security Group vs Network ACL</h2>',
    '  <table class="table">',
    '    <thead><tr><th>Propriété</th><th>Security Group (SG)</th><th>Network ACL (NACL)</th></tr></thead>',
    '    <tbody>',
    '      <tr><td><strong>Niveau d\'action</strong></td><td>Interface réseau de l\'instance (ENI)</td><td>Sous-réseau (Subnet boundary)</td></tr>',
    '      <tr><td><strong>État de connexion</strong></td><td><strong>Avec état (Stateful)</strong> : retour sortant automatiquement autorisé</td><td><strong>Sans état (Stateless)</strong> : retour sortant doit être explicitement autorisé</td></tr>',
    '      <tr><td><strong>Types de règles</strong></td><td>Uniquement <strong>Allow</strong> (Refus implicite par défaut)</td><td>Règles <strong>Allow</strong> et <strong>Deny</strong> explicites</td></tr>',
    '      <tr><td><strong>Ordre d\'évaluation</strong></td><td>Toutes les règles sont évaluées globalement</td><td>Règles numérotées évaluées dans l\'ordre croissant (1..32766)</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>6. Classes de Stockage Amazon S3 &amp; Cycle de Vie</h2>',
    '  <table class="table">',
    '    <thead><tr><th>Classe S3</th><th>Disponibilité</th><th>Délai de récupération</th><th>Coût $/GiB/mois (indicatif)</th><th>Usage optimal</th></tr></thead>',
    '    <tbody>',
    '      <tr><td><strong>S3 Standard</strong></td><td>99.99%</td><td>Immédiat (ms)</td><td>~0.023 $</td><td>Données fréquemment consultées, sites web statiques.</td></tr>',
    '      <tr><td><strong>S3 Intelligent-Tiering</strong></td><td>99.9%</td><td>Immédiat (ms)</td><td>Variable (auto)</td><td>Données à fréquence d\'accès inconnue ou changeante.</td></tr>',
    '      <tr><td><strong>S3 Standard-IA</strong></td><td>99.9%</td><td>Immédiat (ms)</td><td>~0.0125 $ + frais récup.</td><td>Sauvegardes et données de reprise après sinistre.</td></tr>',
    '      <tr><td><strong>S3 Glacier Flexible</strong></td><td>99.9%</td><td>1-5 min / 3-5 h / 12 h</td><td>~0.0036 $ + frais récup.</td><td>Archivage réglementaire, sauvegardes trimestrielles.</td></tr>',
    '      <tr><td><strong>S3 Glacier Deep Archive</strong></td><td>99.9%</td><td>12 h / 48 h</td><td>~0.00099 $ + frais récup.</td><td>Archivage légal sur 7 à 10 ans sans accès immédiat.</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>7. Les 6 Piliers du AWS Well-Architected Framework</h2>',
    '  <ol>',
    '    <li><strong>Excellence opérationnelle :</strong> exécuter et surveiller les systèmes, automatiser les changements via l\'IaC et tirer les enseignements des incidents.</li>',
    '    <li><strong>Sécurité :</strong> protéger les données, les systèmes et les actifs via le principe du moindre privilège, le chiffrement généralisé et l\'audit continu.</li>',
    '    <li><strong>Fiabilité :</strong> prévenir et récupérer automatiquement des défaillances via la redondance Multi-AZ, l\'auto-scaling et les tests de panne réguliers.</li>',
    '    <li><strong>Efficacité des performances :</strong> sélectionner les types d\'instances adaptés (Compute/Memory/Storage), employer des architectures serverless et monitorer les métriques.</li>',
    '    <li><strong>Optimisation des coûts :</strong> éliminer les dépenses inutiles via les instances Spot/Reserved, le dimensionnement adapté (Rightsizing) et les politiques de cycle de vie S3.</li>',
    '    <li><strong>Durabilité (Sustainability) :</strong> minimiser l\'impact environnemental de l\'infrastructure en maximisant le taux d\'utilisation des ressources physiques sous-jacentes.</li>',
    '  </ol>',
    '',
    chnav({ href: 'cartes.html', label: 'Réviser avec les flashcards' }, { href: 'examens.html', label: 'Préparer les examens blancs' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/formules.html': {
      title: 'Mémento technique & syntaxes — ' + course.brand,
      description: 'Mémento complet du cours Services Cloud AWS B3 : Commandes CLI, ARN, politiques IAM, sous-réseaux VPC, classes S3 et Well-Architected Framework.',
      active: 'formules',
      body
    }
  };
}

module.exports = { cartes, formules };
