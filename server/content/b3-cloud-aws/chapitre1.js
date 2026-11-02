/**
 * server/content/b3-cloud-aws/chapitre1.js — Chapitre 1
 * Fondements d'AWS, Infrastructure Globale & Modèle de Responsabilité Partagée
 */
'use strict';

module.exports = {
  n: 1,
  title: 'Fondements d\'AWS, Infrastructure Globale & Modèle de Responsabilité Partagée',
  short: 'Fondements & Infrastructure AWS',
  toc: 'Infrastructure mondiale (Régions, AZs, Edge Locations), modèle de responsabilité partagée, outils CLI et AWS Well-Architected Framework.',
  time: '≈ 2 h 45',
  free: true,

  situation:
    'Vous intégrez l\'équipe Architecture & Cloud d\'une entreprise multinationale qui engage la migration de son système d\'information sur Amazon Web Services (AWS). ' +
    'Votre mission initiale consiste à cartographier l\'infrastructure mondiale cible, à déterminer avec précision la frontière des responsabilités de sécurité entre AWS et votre organisation, ' +
    'à configurer l\'environnement d\'administration via l\'AWS CLI v2 et à garantir l\'alignement des choix d\'architecture avec les six piliers du AWS Well-Architected Framework.',

  objectives: [
    'Comprendre l\'infrastructure mondiale d\'AWS : Régions géographiques, Availability Zones (AZs indépendantes) et Edge Locations pour CloudFront et Route 53.',
    'Maîtriser et appliquer le modèle de responsabilité partagée d\'AWS selon les modèles IaaS (EC2), PaaS (RDS) et Serverless (Lambda, S3).',
    'Installer, configurer et automatiser l\'administration via l\'AWS CLI v2 (profils nommés, variables d\'environnement, format de sortie).',
    'Identifier et implémenter les six piliers du AWS Well-Architected Framework pour concevoir des architectures fiables, sécurisées et optimisées en coût.'
  ],

  sections: [
    {
      title: 'Le Cloud Computing & les Avantages Stratégiques d\'AWS',
      html: [
        '<p>Amazon Web Services (AWS) est la plateforme cloud pionnière et leader mondial, offrant plus de 200 services complets depuis des centres de données distribués à l\'échelle planétaire.</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Les 6 Avantages Stratégiques du Cloud AWS</h4>',
        '    <ul>',
        '      <li><strong>Substitution des dépenses d\'investissement (CapEx) par des dépenses d\'exploitation (OpEx) :</strong> fin des achats massifs de serveurs physiques anticipés.</li>',
        '      <li><strong>Économies d\'échelle massives :</strong> AWS répercute ses baisses de coûts matériels sur le tarif unitaire des services.</li>',
        '      <li><strong>Fin de la conjecture des capacités :</strong> élasticité automatique à la hausse comme à la baisse selon la demande réelle.</li>',
        '      <li><strong>Agilité et vitesse accrue :</strong> mise à disposition d\'infrastructures complexes en quelques clics ou lignes de code.</li>',
        '      <li><strong>Concentration sur la valeur métier :</strong> suppression des corvées d\'administration de centres de données (racks, clim, câblage).</li>',
        '      <li><strong>Déploiement mondial en quelques minutes :</strong> accès immédiat à des dizaines de régions géographiques sans délai.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Les 3 Modèles de Service du Cloud</h4>',
        '    <ul>',
        '      <li><strong>IaaS (Infrastructure as a Service) :</strong> niveau de contrôle maximal sur les ressources informatiques (serveurs virtuels Amazon EC2, stockage bloc EBS, réseau VPC).</li>',
        '      <li><strong>PaaS (Platform as a Service) :</strong> abstraction de l\'OS et de la couche matérielle, l\'utilisateur se concentre sur le déploiement applicatif (AWS Elastic Beanstalk, Amazon RDS).</li>',
        '      <li><strong>SaaS (Software as a Service) :</strong> produit complet fourni et géré par le fournisseur (Amazon WorkSpaces, outils de messagerie).</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Infrastructure Mondiale : Régions, Availability Zones &amp; Edge Locations',
      html: [
        '<p>La résilience d\'AWS repose sur un découpage géographique hiérarchique hautement redondé :</p>',
        '<div class="grid grid-3">',
        '  <div class="card">',
        '    <h4>Régions AWS (Regions)</h4>',
        '    <p>Une Région est un emplacement physique distinct dans le monde où AWS regroupe des centres de données (ex: <code>eu-west-3</code> à Paris, <code>us-east-1</code> en Virginie du Nord, <code>af-south-1</code> au Cap).</p>',
        '    <p>Critères de choix d\'une région : conformité légale et souveraineté des données (RGPD), proximité des utilisateurs pour minimiser la latence, disponibilité des services et coûts horaires.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Availability Zones (AZs)</h4>',
        '    <p>Chaque Région comprend au minimum <strong>trois Availability Zones</strong> (ex: <code>eu-west-3a</code>, <code>eu-west-3b</code>, <code>eu-west-3c</code>).</p>',
        '    <p>Chaque AZ est composée d\'un ou plusieurs centres de données discrets équipés d\'alimentations, de refroidissements et de connexions physiques distincts, reliés par un réseau privé à très faible latence (&lt; 2 ms).</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Edge Locations &amp; CDN</h4>',
        '    <p>Plus de 400 points de présence (PoP) situés dans les grandes métropoles mondiales pour mettre en cache le contenu statique et dynamique au plus près des utilisateurs finaux via <strong>Amazon CloudFront</strong> et accélérer les requêtes DNS via <strong>Route 53</strong>.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Le Modèle de Responsabilité Partagée (Shared Responsibility Model)',
      html: [
        '<p>La sécurité dans le cloud est une responsabilité partagée entre AWS et le client. Cette frontière dépend directement du type de service souscrit :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Sécurité « DU » Cloud (Responsabilité d\'AWS)</h4>',
        '    <p>AWS est responsable de la protection de l\'infrastructure globale qui exécute l\'ensemble des services :</p>',
        '    <ul>',
        '      <li>Sécurité physique des centres de données (contrôle d\'accès biométrique, surveillance 24/7).</li>',
        '      <li>Matériel sous-jacent, disques durs, barrettes de RAM, processeurs physiques.</li>',
        '      <li>Réseau physique sous-jacent et commutateurs.</li>',
        '      <li>Couche d\'hyperviseur physique (Nitro System / Xen).</li>',
        '      <li>Mises à jour et correctifs de l\'OS pour les services managés (RDS, DynamoDB, Lambda).</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Sécurité « DANS » le Cloud (Responsabilité du Client)</h4>',
        '    <p>Le client est responsable de la sécurisation de tout ce qu\'il déploie sur la plateforme :</p>',
        '    <ul>',
        '      <li>Gestion des données clients et classification.</li>',
        '      <li>Chiffrement des données au repos (KMS) et en transit (TLS).</li>',
        '      <li>Gestion des identités et des accès (IAM, mots de passe, MFA, moindre privilège).</li>',
        '      <li>Configuration des pare-feux (Security Groups et Network ACLs).</li>',
        '      <li>Application des correctifs de l\'OS invité des machines virtuelles Amazon EC2.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Outils d\'Accès &amp; Administration : Console Web, AWS CLI v2 &amp; CloudShell',
      html: [
        '<p>AWS propose trois interfaces d\'administration complémentaires :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>AWS Management Console &amp; CloudShell</h4>',
        '    <ul>',
        '      <li><strong>Console Web :</strong> interface graphique intuitive idéale pour la découverte et la supervision visuelle.</li>',
        '      <li><strong>AWS CloudShell :</strong> terminal Linux dans le navigateur pré-authentifié avec 1 Go de stockage persistant gratuit et les outils CLI préinstallés.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>L\'AWS CLI v2 (Command Line Interface)</h4>',
        '    <p>Outil en ligne de commande permettant d\'automatiser l\'intégralité des interactions API d\'AWS :</p>',
        '    <pre><code># Initialisation des identifiants et de la région\naws configure\n# AWS Access Key ID [None]: AKIAIOSFODNN7EXAMPLE\n# AWS Secret Access Key [None]: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY\n# Default region name [None]: eu-west-3\n# Default output format [None]: json</code></pre>',
        '    <p>Les identifiants sont stockés dans <code>~/.aws/credentials</code> et les configurations régionales dans <code>~/.aws/config</code>.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Les 6 Piliers du AWS Well-Architected Framework',
      html: [
        '<p>Le Well-Architected Framework fournit une méthode cohérente pour évaluer les architectures et appliquer les meilleures pratiques de conception cloud :</p>',
        '<div class="grid grid-3">',
        '  <div class="card">',
        '    <h4>1. Excellence Opérationnelle</h4>',
        '    <p>Exécuter et surveiller les systèmes, apporter des améliorations continues aux processus et gérer les infrastructures comme du code (IaC).</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Sécurité</h4>',
        '    <p>Appliquer le principe du moindre privilège, chiffrer les données en transit et au repos, et automatiser la traçabilité des accès.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>3. Fiabilité</h4>',
        '    <p>Prévenir et récupérer automatiquement des défaillances via la redondance Multi-AZ, l\'auto-scaling et les tests de panne réguliers.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>4. Efficacité des Performances</h4>',
        '    <p>Choisir les types d\'instances adaptés à la charge (CPU, GPU, RAM, NVMe) et adopter des technologies serverless modernes.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>5. Optimisation des Coûts</h4>',
        '    <p>Éliminer les dépenses inutiles en dimensionnant au plus juste (Rightsizing) et en profitant des remises Spot et Reserved.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>6. Durabilité (Sustainability)</h4>',
        '    <p>Minimiser l\'empreinte environnementale des services en optimisant l\'efficacité énergétique du parc de calcul.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],

  methodTitle: 'Démarche d’Ingénierie & Cadrage Architectural AWS',
  method: [
    'Sélection de la Région AWS : valider les exigences de conformité légale (RGPD/Souveraineté des données), la latence réseau vers les utilisateurs et la disponibilité des services souhaités.',
    'Définition de la topologie de résilience : exiger un déploiement sur au minimum 2 voire 3 Availability Zones (Multi-AZ) pour éliminer tout point unique de défaillance (SPOF).',
    'Cartographie de la matrice de responsabilité : lister pour chaque composant (EC2, RDS, S3) les devoirs de maintenance incombant à l\'équipe interne (patchs OS, sauvegardes, chiffrement).',
    'Initialisation sécurisée de l\'AWS CLI : configurer des profils d\'accès dédiés (aws configure --profile prod) et bannir l\'utilisation de clés d\'accès permanentes pour le compte root.'
  ],

  summary: [
    'AWS propose une infrastructure mondiale organisée en Régions géographiques autonomes, composées chacune d\'au moins 3 Availability Zones physiquement isolées.',
    'Les Edge Locations d\'Amazon CloudFront et de Route 53 optimisent la diffusion de contenu et la résolution DNS à faible latence dans plus de 400 points de présence.',
    'Le modèle de responsabilité partagée confie à AWS la sécurité DU cloud (matériel, centres de données, hyperviseurs) et au client la sécurité DANS le cloud (données, IAM, OS EC2, pare-feux).',
    'L\'AWS CLI v2 permet d\'automatiser toutes les interactions API en stockant les identifiants dans ~/.aws/credentials et la configuration dans ~/.aws/config.',
    'Les 6 piliers du Well-Architected Framework (Excellence opérationnelle, Sécurité, Fiabilité, Efficacité des performances, Optimisation des coûts, Durabilité) guident toute conception cloud robuste.'
  ],

  checklist: [
    'Comprenez-vous la différence physique et logique entre une Région, une Availability Zone et une Edge Location ?',
    'Savez-vous délimiter qui d\'AWS ou du Client est responsable du patching de l\'OS d\'une VM EC2 par rapport à une base RDS ?',
    'Savez-vous configurer et manipuler l\'AWS CLI v2 avec plusieurs profils nommés (aws configure --profile) ?',
    'Pouvez-vous citer les six piliers du AWS Well-Architected Framework et donner un exemple de mise en œuvre pour chacun ?',
    'Savez-vous calculer la disponibilité globale en série et en parallèle d\'un système multi-zones ?'
  ],

  notions: [
    { term: 'Région AWS', def: 'Zone géographique autonome dans le monde hébergeant des centres de données hautement sécurisés (ex: eu-west-3 à Paris).' },
    { term: 'Availability Zone (AZ)', def: 'Ensemble d\'un ou plusieurs centres de données isolés au sein d\'une région, dotés d\'alimentations et de réseaux redondants.' },
    { term: 'Edge Location', def: 'Point de présence mondial ultra-distribué utilisé par CloudFront et Route 53 pour mettre en cache du contenu au plus près des utilisateurs.' },
    { term: 'Responsabilité Partagée', def: 'Modèle répartissant la sécurité : AWS protège l\'infrastructure DU cloud, le client protège les données et configurations DANS le cloud.' },
    { term: 'AWS CLI v2', def: 'Outil officiel en ligne de commande unifié permettant d\'automatiser et de piloter tous les services AWS via leurs API REST.' },
    { term: 'Well-Architected Framework', def: 'Guide architectural officiel d\'AWS structuré en 6 piliers pour concevoir des systèmes cloud sécurisés, résilients et économiques.' },
    { term: 'Amazon Nitro System', def: 'Hyperviseur matériel moderne d\'AWS déchargeant la virtualisation, le réseau et le stockage pour allouer 100% du CPU/RAM à l\'instance.' },
    { term: 'ARN (Amazon Resource Name)', def: 'Chaîne standardisée identifiant de manière univoque toute ressource à travers les comptes et régions d\'AWS.' }
  ],

  pitfalls: [
    'Confondre Availability Zone et Région : une région est une zone géographique globale, une AZ est un groupe de centres de données locaux au sein de cette région.',
    'Supposer qu\'AWS applique les correctifs de sécurité de l\'OS des machines virtuelles EC2 : c\'est une responsabilité exclusive du client (modèle IaaS).',
    'Utiliser les clés d\'accès du compte AWS root pour les opérations quotidiennes au lieu de créer des utilisateurs ou rôles IAM restreints.',
    'Stocker des clés d\'accès AWS (AccessKeyId et SecretAccessKey) en dur dans des scripts ou des dépôts de code GitHub publics.'
  ],

  questions: [
    {
      stem: 'Combien d\'Availability Zones (AZs) au minimum une région AWS contient-elle obligatoirement ?',
      opts: ['1 seule zone', '2 zones', 'Au moins 3 zones', '5 zones'],
      correct: 2,
      exp: 'Chaque région AWS contient au minimum 3 Availability Zones physiques distinctes afin de garantir la haute disponibilité et la tolérance aux pannes des applications multi-AZ.'
    },
    {
      stem: 'Dans le modèle de responsabilité partagée d\'AWS, qui est responsable de l\'application des correctifs de sécurité sur l\'OS d\'une instance EC2 ?',
      opts: ['AWS exclusivement', 'Le client exclusivement', 'Le fournisseur d\'accès Internet', 'Amazon EC2 Auto Scaling'],
      correct: 1,
      exp: 'Sur une instance IaaS comme EC2, le client a le contrôle total du système d\'exploitation invité : il est donc exclusivement responsable de ses mises à jour et correctifs de sécurité.'
    },
    {
      stem: 'Quel service mondial AWS utilise principalement le réseau des Edge Locations pour diffuser du contenu web avec une très faible latence ?',
      opts: ['Amazon EC2', 'Amazon CloudFront', 'Amazon EBS', 'AWS Storage Gateway'],
      correct: 1,
      exp: 'Amazon CloudFront est le réseau de diffusion de contenu (CDN) mondial d\'AWS qui s\'appuie sur plus de 400 Edge Locations pour mettre en cache les données au plus près des utilisateurs.'
    },
    {
      stem: 'Dans quel fichier local sont enregistrés par défaut les identifiants d\'authentification générés par la commande « aws configure » ?',
      opts: ['/etc/aws/auth.conf', '~/.aws/credentials', '~/.ssh/authorized_keys', '/var/log/aws.log'],
      correct: 1,
      exp: 'L\'AWS CLI enregistre les identifiants secrets (Access Key ID et Secret Access Key) dans le fichier sécurisé ~/.aws/credentials du répertoire personnel de l\'utilisateur.'
    },
    {
      stem: 'Lequel de ces principes N\'EST PAS l\'un des six piliers du AWS Well-Architected Framework ?',
      opts: ['Excellence opérationnelle', 'Verrouillage propriétaire (Vendor Lock-in)', 'Optimisation des coûts', 'Fiabilité'],
      correct: 1,
      exp: 'Les 6 piliers sont l\'Excellence opérationnelle, la Sécurité, la Fiabilité, l\'Efficacité des performances, l\'Optimisation des coûts et la Durabilité. Le verrouillage propriétaire n\'en fait évidemment pas partie.'
    },
    {
      stem: 'Pourquoi est-il formellement déconseillé d\'utiliser les identifiants du compte AWS Root au quotidien ?',
      opts: ['Car le compte Root ne peut pas démarrer d\'instances EC2', 'Car le compte Root possède des privilèges absolus et irrévocables qui augmentent considérablement le risque d\'impact en cas de compromission', 'Car le compte Root facture chaque clic de souris dans la console', 'Car le compte Root expire automatiquement après 24 heures'],
      correct: 1,
      exp: 'Le compte Root détient un accès irrévocable à toutes les ressources et facturations. Les bonnes pratiques exigent de verrouiller le compte Root avec du MFA et d\'utiliser des comptes IAM restreints.'
    },
    {
      stem: 'Que désigne l\'acronyme ARN dans l\'écosystème Amazon Web Services ?',
      opts: ['Amazon Routing Network', 'Amazon Resource Name', 'Automated Relay Node', 'Advanced Resilience Number'],
      correct: 1,
      exp: 'ARN signifie Amazon Resource Name. C\'est l\'identifiant unique universel permettant de désigner toute ressource dans AWS (ex: arn:aws:s3:::mon-bucket).'
    },
    {
      stem: 'Si un composant A a une disponibilité de 99% et un composant B a une disponibilité de 99%, quelle est la disponibilité globale s\'ils sont montés en série ?',
      opts: ['99.00%', '98.01%', '99.99%', '100%'],
      correct: 1,
      exp: 'En série, la disponibilité totale est le produit des disponibilités individuelles : 0.99 * 0.99 = 0.9801, soit 98.01%.'
    }
  ],

  flashcards: [
    {
      q: 'Qu\'est-ce qu\'une Région AWS ?',
      a: 'Un emplacement géographique autonome mondial regroupant au moins 3 Availability Zones isolées reliées par fibre privée.'
    },
    {
      q: 'Qu\'est-ce qu\'une Availability Zone (AZ) ?',
      a: 'Un ou plusieurs centres de données discrets au sein d\'une région, dotés d\'alimentations et de réseaux physiques redondants.'
    },
    {
      q: 'Quelle est la règle du modèle de responsabilité partagée ?',
      a: 'AWS est responsable de la sécurité DU cloud (matériel, hyperviseurs) ; le client est responsable de la sécurité DANS le cloud (données, IAM, OS EC2).'
    },
    {
      q: 'Quels sont les six piliers du Well-Architected Framework ?',
      a: 'Excellence opérationnelle, Sécurité, Fiabilité, Efficacité des performances, Optimisation des coûts, et Durabilité.'
    },
    {
      q: 'À quoi servent les Edge Locations dans AWS ?',
      a: 'Ce sont des points de présence locaux (PoP) pour mettre en cache du contenu CDN (CloudFront) et accélérer les requêtes DNS (Route 53).'
    },
    {
      q: 'Quelle commande initialise les identifiants de l\'AWS CLI v2 ?',
      a: '« aws configure » (stocke les clés dans ~/.aws/credentials et la région par défaut dans ~/.aws/config).'
    }
  ],

  mastery: [
    { cls: 'low', text: 'Score < 60 % : Notions d\'infrastructure et responsabilité partagée fragiles. Relisez la frontière IaaS/PaaS et refaites le QCM.' },
    { cls: 'mid', text: 'Score 60-74 % : Fondements compris. Approfondissez les calculs de disponibilité multi-AZ et les commandes CLI.' },
    { cls: 'mid', text: 'Score 75-84 % : Bonne maîtrise d\'ensemble. Entraînez-vous à valider les ARN et les profils CLI dans l\'atelier.' },
    { cls: 'high', text: 'Score 85-94 % : Niveau solide. Vous maîtrisez l\'infrastructure mondiale et les piliers du Well-Architected Framework.' },
    { cls: 'high', text: 'Score ≥ 95 % : Maîtrise d\'architecte. Prêt pour l\'étude des identités IAM et la gouvernance multi-comptes du Module 2 !' }
  ]
};
