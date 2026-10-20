/**
 * Pages « examens » et « exercices » du cours « Services Cloud AWS B3 ».
 */
'use strict';

const { ic, crumb, box } = require('../../../../scripts/course-kit');
const { chnav, disclaimer } = require('./helpers');

/* ======================== Examens Blancs ======================== */

function examens(course) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Examens blancs' }
  ]);

  const body = [
    crumbs,
    '  <h1>Examens Blancs &amp; Épreuves Corrigées — Services Cloud AWS B3</h1>',
    '  <p class="lead">Deux épreuves académiques complètes d’architecture et d’ingénierie Cloud conformes au cursus Bachelor 3 (L3-ASI) et aux certifications professionnelles Amazon Web Services (AWS Certified Cloud Practitioner CLF-C02 &amp; Solutions Architect Associate SAA-C03) : gouvernance, IAM, EC2, VPC, S3, RDS, DynamoDB, Lambda, SQS et Well-Architected Framework.</p>',
    '',
    '  <h2>Épreuve 1 : Contrôle Continu (CC) — Durée 1 h 30 (Barème sur 20 points)</h2>',
    box('standard', 'Sujet du Contrôle Continu — Infrastructure Globale, IAM &amp; Calcul EC2', [
      '<h4>Partie 1 : Infrastructure Mondiale &amp; Modèle de Responsabilité Partagée (6 points)</h4>',
      '<ol>',
      '  <li>Définissez les notions de Région AWS, d\'Availability Zone (AZ) et d\'Edge Location. Pourquoi une région AWS comprend-elle toujours au minimum 3 AZs isolées ? (3 pts)</li>',
      '  <li>Dans le modèle de responsabilité partagée, qui d\'AWS ou du Client est responsable des opérations suivantes : (a) le remplacement d\'une barrette de RAM défaillante dans un centre de données, (b) l\'application des correctifs de sécurité de l\'OS d\'une instance EC2 Linux, (c) la configuration des règles de pare-feu d\'un Security Group, (d) les correctifs de l\'OS sous-jacent d\'une base de données Amazon RDS ? Justifiez chaque réponse. (3 pts)</li>',
      '</ol>',
      '<h4>Partie 2 : Sécurité IAM, Rôles &amp; Politiques JSON (7 points)</h4>',
      '<ol>',
      '  <li>Expliquez la différence fondamentale entre un utilisateur IAM (User), un groupe IAM et un rôle IAM (Role). Dans quelle situation un rôle IAM doit-il obligatoirement être utilisé à la place de clés d\'accès statiques ? (4 pts)</li>',
      '  <li>Décrivez l\'ordre d\'évaluation des politiques IAM par le moteur d\'autorisation d\'AWS. Que se passe-t-il si un utilisateur possède une politique avec <code>Effect: Allow</code> sur <code>s3:*</code> et une autre avec <code>Effect: Deny</code> sur <code>s3:DeleteBucket</code> ? (3 pts)</li>',
      '</ol>',
      '<h4>Partie 3 : Calcul Élastique &amp; Stockage Bloc avec EC2 et EBS (7 points)</h4>',
      '<ol>',
      '  <li>Comparez les 3 principaux modèles d\'achat d\'instances EC2 : On-Demand, Reserved Instances / Savings Plans et Spot Instances. Quelle stratégie d\'achat recommandez-vous pour un site e-commerce ayant un trafic plancher continu de 4 instances et des pics de 10 instances pendant les soldes ? (4 pts)</li>',
      '  <li>Présentez les différences entre les volumes EBS de type <code>gp3</code> (General Purpose SSD) et <code>io2</code> (Provisioned IOPS SSD). Pourquoi la séparation du volume de données et de l\'instance EC2 permet-elle une haute résilience ? (3 pts)</li>',
      '</ol>'
    ].join('\n')),
    '',
    box('solution', 'Corrigé type &amp; Barème détaillé du Contrôle Continu', [
      '<h4>Corrigé Partie 1 (6 points)</h4>',
      '<ul>',
      '  <li><strong>Infrastructure Globale (3 pts) :</strong> ' +
      '  - <em>Région :</em> Zone géographique autonome mondiale (ex: <code>eu-west-3</code> à Paris) hébergeant des centres de données. ' +
      '  - <em>Availability Zone (AZ) :</em> Ensemble d\'un ou plusieurs centres de données discrets équipés d\'alimentations, de refroidissements et de connexions physiques redondantes. Trois AZs au minimum garantissent qu\'un sinistre majeur (inondation, panne d\'alimentation) dans une zone ne bloque pas la disponibilité globale de l\'application via le basculement multi-AZ. ' +
      '  - <em>Edge Locations :</em> Points de présence mondiaux ultra-distribués pour le cache de contenu CDN CloudFront et la résolution DNS Route 53 à très faible latence.</li>',
      '  <li><strong>Modèle de Responsabilité Partagée (3 pts) :</strong> ' +
      '  - (a) Remplacement RAM physique : <strong>AWS</strong> (Sécurité DU Cloud, matériel sous-jacent). ' +
      '  - (b) Patchs OS invité EC2 : <strong>CLIENT</strong> (Sécurité DANS le Cloud, l\'instance IaaS est sous contrôle exclusif de l\'administrateur). ' +
      '  - (c) Configuration Security Group : <strong>CLIENT</strong> (Filtrage réseau applicatif configuré par l\'administrateur). ' +
      '  - (d) Patchs OS RDS : <strong>AWS</strong> (Service PaaS géré, AWS maintient le système d\'exploitation de l\'hôte de base de données).</li>',
      '</ul>',
      '<h4>Corrigé Partie 2 (7 points)</h4>',
      '<ul>',
      '  <li><strong>Composants IAM &amp; Rôles (4 pts) :</strong> ' +
      '  - <em>Utilisateur :</em> Identité permanente pour une personne ou un système spécifique avec identifiants propres (mot de passe ou Access Keys). ' +
      '  - <em>Groupe :</em> Collection d\'utilisateurs simplifiant l\'attribution collective de politiques. ' +
      '  - <em>Rôle :</em> Identité sans identifiant permanent, endossable temporairement par des utilisateurs, des applications ou des services AWS (Instance Profile sur EC2, rôle d\'exécution Lambda). ' +
      '  L\'utilisation d\'un rôle évite de stocker des clés d\'accès statiques dans le code ou les fichiers de configuration, éliminant le risque de fuite d\'identifiants sur GitHub.</li>',
      '  <li><strong>Évaluation des Politiques IAM (3 pts) :</strong> ' +
      '  L\'évaluation commence par un <em>Default Deny</em>. Si un <em>Explicit Deny</em> correspond à la requête, celle-ci est immédiatement et irrévocablement rejetée. ' +
      '  Ici, la déclaration <code>Deny: s3:DeleteBucket</code> l\'emporte sur <code>Allow: s3:*</code> : l\'utilisateur peut effectuer toutes les opérations S3 sauf la suppression de buckets.</li>',
      '</ul>',
      '<h4>Corrigé Partie 3 (7 points)</h4>',
      '<ul>',
      '  <li><strong>Modèles d\'Achat EC2 &amp; Stratégie (4 pts) :</strong> ' +
      '  - <em>On-Demand :</em> Paiement à la seconde sans engagement, idéal pour charges imprévisibles à court terme. ' +
      '  - <em>Reserved / Savings Plans :</em> Engagement 1 ou 3 ans avec remises massives (jusqu\'à 72%), optimal pour charge stable. ' +
      '  - <em>Spot Instances :</em> Surplus de calcul vendu aux enchères jusqu\'à 90% moins cher, interruptible avec préavis de 2 minutes. ' +
      '  <em>Stratégie recommandée :</em> 4 instances de base en Reserved Instances (1 ou 3 ans) pour minimiser les coûts prévisibles, complétées pendant les soldes par des instances On-Demand (pour le panier d\'achat critique) ou Spot (pour la consultation de catalogue tolérante aux pannes) pilotées par un Auto Scaling Group.</li>',
      '  <li><strong>Volumes EBS gp3 vs io2 (3 pts) :</strong> ' +
      '  - <code>gp3</code> offre un excellent rapport performance/prix avec 3 000 IOPS et 125 MB/s de base gratuits, modulables indépendamment du stockage. ' +
      '  - <code>io2</code> est conçu pour les charges de bases de données critiques avec une durabilité de 99.999% et jusqu\'à 256 000 IOPS. ' +
      '  La persistance EBS est découplée du cycle de vie de l\'instance : si l\'instance tombe en panne, le volume peut être rattaché immédiatement à une nouvelle VM sans perte de données.</li>',
      '</ul>'
    ].join('\n')),
    '',
    '  <h2>Épreuve 2 : Examen Final d\'Ingénierie — Durée 2 h 00 (Barème sur 20 points)</h2>',
    box('standard', 'Sujet de l\'Examen Final — Architecture Web Résiliente Multi-Tiers dans un Amazon VPC', [
      '<h4>Mise en Situation d\'Architecture</h4>',
      '<p>Vous êtes Ingénieur Cloud Architect pour une plateforme SaaS bancaire. Vous devez concevoir l\'infrastructure AWS dans la région Paris (<code>eu-west-3</code>) pour héberger une application web critique à fort trafic.</p>',
      '<h4>Partie 1 : Conception du Réseau Amazon VPC (6 points)</h4>',
      '<ol>',
      '  <li>Définissez le plan d\'adressage CIDR pour un VPC <code>10.0.0.0/16</code> réparti sur 2 Availability Zones (<code>eu-west-3a</code> et <code>eu-west-3b</code>). Vous devez créer : (a) un sous-réseau public par zone (/24), (b) un sous-réseau applicatif privé par zone (/24) et (c) un sous-réseau base de données isolé par zone (/24). Donnez les plages d\'adresses précises et indiquez le nombre d\'adresses IP assignables dans chaque sous-réseau. (3 pts)</li>',
      '  <li>Décrivez la configuration des tables de routage pour que les serveurs applicatifs privés puissent télécharger des mises à jour logicielles sur Internet sans jamais être directement joignables depuis l\'extérieur. Expliquez le rôle de la NAT Gateway et de l\'Internet Gateway. (3 pts)</li>',
      '</ol>',
      '<h4>Partie 2 : Sécurité Périmétrique &amp; Pare-feux (5 points)</h4>',
      '<ol>',
      '  <li>Concevez les règles de Security Groups pour une architecture 3-tiers (ALB public, Serveurs applicatifs EC2, Base de données RDS PostgreSQL). Comment configure-t-on les règles de sécurité pour que les instances EC2 n\'acceptent du trafic HTTP (port 8080) QUE depuis l\'ALB sans exposer d\'adresses IP statiques ? (3 pts)</li>',
      '  <li>Expliquez pourquoi une Network ACL (NACL) nécessite d\'autoriser les ports éphémères (1024-65535) en sortie pour permettre aux requêtes clientes de recevoir les réponses du serveur web, contrairement à un Security Group. (2 pts)</li>',
      '</ol>',
      '<h4>Partie 3 : Stockage S3, Bases de Données RDS &amp; Découplage Serverless (9 points)</h4>',
      '<ol>',
      '  <li>Comment garantit-on la haute disponibilité et la tolérance aux pannes d\'une base de données Amazon RDS PostgreSQL ? Comparez un déploiement Multi-AZ (réplication synchrone) avec des Read Replicas (réplication asynchrone). (3 pts)</li>',
      '  <li>Les relevés bancaires mensuels PDF sont stockés dans un bucket S3. Définissez une politique de cycle de vie (Lifecycle Policy) optimisée pour conserver les fichiers 90 jours en S3 Standard, les basculer en Glacier Flexible pendant 1 an, puis en Glacier Deep Archive pendant 7 ans avant suppression. Quel paramètre S3 empêche formellement toute fuite publique accidentelle de ces relevés ? (3 pts)</li>',
      '  <li>Pour absorber les pics de dépôts de transactions sans saturer la base de données relationnelle, vous insérez une file d\'attente Amazon SQS entre les microservices et un pool de fonctions AWS Lambda. Comment fonctionne le mécanisme de Dead-Letter Queue (DLQ) en cas de transaction malformée provoquant une erreur continue ? (3 pts)</li>',
      '</ol>'
    ].join('\n')),
    '',
    box('solution', 'Corrigé type &amp; Barème détaillé de l\'Examen Final', [
      '<h4>Corrigé Partie 1 : Réseau VPC (6 points)</h4>',
      '<ul>',
      '  <li><strong>Plan d\'adressage CIDR (3 pts) :</strong> ' +
      '  - <em>AZ eu-west-3a :</em> Public Subnet 1 = <code>10.0.1.0/24</code> ; App Subnet 1 = <code>10.0.2.0/24</code> ; DB Subnet 1 = <code>10.0.3.0/24</code>. ' +
      '  - <em>AZ eu-west-3b :</em> Public Subnet 2 = <code>10.0.11.0/24</code> ; App Subnet 2 = <code>10.0.12.0/24</code> ; DB Subnet 2 = <code>10.0.13.0/24</code>. ' +
      '  Pour chaque sous-réseau /24, le nombre total d\'IP est <code>2^(32-24) = 256</code>. AWS réservant obligatoirement 5 adresses (.0 réseau, .1 routeur VPC, .2 DNS AWS, .3 réservé futur, .255 broadcast), il y a exactement <strong>251 adresses IP assignables</strong> par sous-réseau.</li>',
      '  <li><strong>Routage Egress &amp; NAT (3 pts) :</strong> ' +
      '  - <em>Sous-réseaux publics :</em> Route Table avec <code>0.0.0.0/0 &rarr; igw-xxxx</code> (Internet Gateway). ' +
      '  - <em>Sous-réseaux applicatifs privés :</em> Route Table avec <code>0.0.0.0/0 &rarr; nat-xxxx</code> (NAT Gateway managée déployée dans un sous-réseau public). La NAT Gateway effectue une translation d\'adresses source (SNAT) permettant aux requêtes sortantes des VMs privées d\'accéder à Internet tout en bloquant toute tentative de connexion initiée depuis l\'extérieur. ' +
      '  - <em>Sous-réseaux bases de données :</em> Table de routage locale isolée (aucune route vers 0.0.0.0/0).</li>',
      '</ul>',
      '<h4>Corrigé Partie 2 : Sécurité Pare-feux (5 points)</h4>',
      '<ul>',
      '  <li><strong>Chaining de Security Groups (3 pts) :</strong> ' +
      '  Au lieu de filtrer par plage d\'adresses IP CIDR, AWS permet de référencer l\'identifiant d\'un autre Security Group dans le champ <em>Source</em> : ' +
      '  1. <code>SG-ALB</code> : Inbound 443 depuis <code>0.0.0.0/0</code>. ' +
      '  2. <code>SG-App</code> : Inbound 8080 avec Source = <code>sg-alb-xxxx</code>. Seul le trafic provenant d\'instances rattachées au groupe de l\'ALB est autorisé. ' +
      '  3. <code>SG-DB</code> : Inbound 5432 avec Source = <code>sg-app-xxxx</code>. Seuls les serveurs applicatifs autorisés peuvent contacter la base de données.</li>',
      '  <li><strong>Stateless NACL vs Stateful SG (2 pts) :</strong> ' +
      '  Les Security Groups sont <em>Stateful</em> : si le paquet entrant sur le port 443 est accepté, le paquet réponse sortant vers le port éphémère du client est automatiquement autorisé. ' +
      '  Les Network ACLs sont <em>Stateless</em> : elles évaluent chaque paquet isolément. Pour qu\'un client TCP reçoive la réponse HTML, la NACL sortante doit explicitement comporter une règle <code>Allow</code> sur les ports éphémères clients (1024-65535).</li>',
      '</ul>',
      '<h4>Corrigé Partie 3 : Données &amp; Découplage (9 points)</h4>',
      '<ul>',
      '  <li><strong>RDS Multi-AZ vs Read Replicas (3 pts) :</strong> ' +
      '  - <em>Multi-AZ :</em> Réplication synchrone vers une instance Standby dans une autre zone. Utilisé pour la <strong>haute disponibilité et reprise après sinistre</strong> (basculement automatique en cas de panne de l\'AZ primaire). La réplique passive ne traite aucune requête de lecture. ' +
      '  - <em>Read Replicas :</em> Réplication asynchrone vers jusqu\'à 15 instances de lecture. Utilisé pour <strong>la montée en charge des performances de lecture</strong> (Read scaling).</li>',
      '  <li><strong>Cycle de Vie S3 &amp; Block Public Access (3 pts) :</strong> ' +
      '  Politique S3 Lifecycle : Transition vers <code>GLACIER_FLEXIBLE</code> à J+90, puis vers <code>DEEP_ARCHIVE</code> à J+365, et <code>Expiration</code> (suppression définitive) à J+2920 (8 ans). ' +
      '  Le paramètre <strong>S3 Block Public Access</strong> (activé au niveau du compte ou du bucket avec ses 4 verrous activés) neutralise formellement toute tentative de rendre le bucket ou un objet public via des ACLs ou des politiques permissives.</li>',
      '  <li><strong>Découplage SQS &amp; Dead-Letter Queue (3 pts) :</strong> ' +
      '  Lorsqu\'une fonction Lambda échoue à traiter un message, celui-ci redevient visible dans la file SQS après expiration du <code>VisibilityTimeout</code>. Le compteur <code>ReceiveCount</code> du message est incrémenté. ' +
      '  Dès que <code>ReceiveCount &ge; maxReceiveCount</code> (ex: 3 tentatives infructueuses), le message est automatiquement évincé vers la Dead-Letter Queue (DLQ). Cela isole le message toxique (« poison pill »), empêche le blocage de la file d\'attente et permet aux ingénieurs d\'analyser l\'erreur ultérieurement.</li>',
      '</ul>'
    ].join('\n')),
    '',
    chnav({ href: 'formules.html', label: 'Consulter le mémento' }, { href: 'exercices.html', label: 'Accéder aux 18 ateliers de code' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/examens.html': {
      title: 'Examens blancs & corrigés — ' + course.brand,
      description: 'Épreuves officielles d’examen blanc et contrôles continus corrigés du cours Services Cloud AWS B3 : Architecture, IAM, Calcul, Réseau, Données et FinOps.',
      active: 'examens',
      body
    }
  };
}

/* ======================== Exercices ======================== */

function exercices(course, chapterList) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Ateliers de code' }
  ]);

  const listHtml = chapterList.map(chapitre => [
    '  <h2>Module ' + chapitre.n + ' — ' + chapitre.title + '</h2>',
    '  <p class="lead">' + chapitre.toc + '</p>',
    '  <div class="grid grid-3">',
    '    <div class="card">',
    '      <span class="badge">Atelier 1</span>',
    '      <h4>Exercice ' + chapitre.n + '.1</h4>',
    '      <p>Prise en main progressive des notions fondamentales avec entrées/sorties standard et validation unitaire.</p>',
    '      <p><a class="btn" href="chapitre' + chapitre.n + '.html">Ouvrir dans le Chapitre ' + chapitre.n + '</a></p>',
    '    </div>',
    '    <div class="card">',
    '      <span class="badge">Atelier 2</span>',
    '      <h4>Exercice ' + chapitre.n + '.2</h4>',
    '      <p>Mise en pratique approfondie sur un cas d\'ingénierie représentatif d\'un déploiement de production.</p>',
    '      <p><a class="btn" href="chapitre' + chapitre.n + '.html">Ouvrir dans le Chapitre ' + chapitre.n + '</a></p>',
    '    </div>',
    '    <div class="card">',
    '      <span class="badge">Atelier 3</span>',
    '      <h4>Exercice ' + chapitre.n + '.3</h4>',
    '      <p>Défi avancé de niveau examen simulant un scénario complexe d\'automatisation ou d\'optimisation cloud.</p>',
    '      <p><a class="btn" href="chapitre' + chapitre.n + '.html">Ouvrir dans le Chapitre ' + chapitre.n + '</a></p>',
    '    </div>',
    '  </div>'
  ].join('\n')).join('\n\n');

  const body = [
    crumbs,
    '  <h1>Catalogue des 18 Ateliers de Code Interactifs — Services Cloud AWS B3</h1>',
    '  <p class="lead">L\'ensemble des 18 ateliers de programmation pratique en Python 3 intégrés au cours, avec éditeur Monaco, tests automatisés cachés, correction instantanée et aide intelligente du tuteur pédagogique.</p>',
    '',
    listHtml,
    '',
    chnav({ href: 'examens.html', label: 'Consulter les examens blancs' }, { href: '../atelier.html', label: 'Ouvrir le bac à sable libre' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/exercices.html': {
      title: 'Catalogue des exercices — ' + course.brand,
      description: 'Inventaire des 18 ateliers de code interactifs Python 3 du cours Services Cloud AWS B3.',
      active: 'exercices',
      body
    }
  };
}

module.exports = { examens, exercices };
