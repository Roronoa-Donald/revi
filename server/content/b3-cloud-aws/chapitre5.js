/**
 * server/content/b3-cloud-aws/chapitre5.js — Chapitre 5
 * Stockage & Données — Amazon S3, EFS, RDS & NoSQL DynamoDB
 */
'use strict';

module.exports = {
  n: 5,
  title: 'Stockage & Données — Amazon S3, EFS, RDS & NoSQL DynamoDB',
  short: 'Stockage S3, Bases RDS & DynamoDB',
  toc: 'Stockage objet S3, cycle de vie, S3 Block Public Access, EFS multi-AZ, bases relationnelles RDS & Aurora, et NoSQL DynamoDB (RCU/WCU).',
  time: '≈ 2 h 45',
  free: false,

  situation:
    'L\'architecture de votre plateforme web doit traiter des téraoctets de données non structurées, assurer la persistance partagée de médias, ' +
    'et gérer simultanément des transactions financières relationnelles critiques et un catalogue produit à très faible latence. ' +
    'Vous devez concevoir la stratégie de stockage hybride : compartiments Amazon S3 sécurisés avec règles de cycle de vie et Block Public Access, ' +
    'système de fichiers partagé Amazon EFS, cluster Amazon RDS PostgreSQL Multi-AZ avec répliques de lecture, et table Amazon DynamoDB dimensionnée en RCU/WCU.',

  objectives: [
    'Maîtriser le stockage objet Amazon S3 : classes de stockage (Standard, IA, Glacier Deep Archive), règles de cycle de vie et durabilité de 99.999999999%.',
    'Sécuriser les données S3 avec S3 Block Public Access, le versioning, les Bucket Policies et le chiffrement au repos AWS KMS.',
    'Distinguer le stockage bloc (EBS), le stockage fichier partagé (EFS) et le stockage objet (S3) selon leurs cas d\'usage.',
    'Concevoir des bases de données relationnelles Amazon RDS / Aurora (Multi-AZ vs Read Replicas) et dimensionner des tables NoSQL DynamoDB (RCU, WCU, modes de cohérence).'
  ],

  sections: [
    {
      title: 'Amazon S3 : Stockage Objet &amp; Classes de Stockage',
      html: [
        '<p>Amazon Simple Storage Service (S3) est le service de stockage objet distribué d\'AWS, conçu pour offrir une <strong>durabilité de 99.999999999% (11 neuf)</strong> en répliquant automatiquement les objets sur plusieurs centres de données physiques d\'une région :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Concepts Fondamentaux d\'Amazon S3</h4>',
        '    <ul>',
        '      <li><strong>Buckets (Compartiments) :</strong> conteneurs logiques racines de niveau mondial dont le nom doit être unique à l\'échelle planétaire.</li>',
        '      <li><strong>Objets &amp; Clés :</strong> un fichier est un objet constitué d\'une clé (chemin complet ex: <code>images/logo.png</code>), de données brutes (jusqu\'à 5 To par objet) et de métadonnées.</li>',
        '      <li><strong>Échelle illimitée :</strong> aucun provisionnement de capacité requis, volume total illimité avec paiement au gigaoctet réel.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>La Hiérarchie des Classes de Stockage</h4>',
        '    <ul>',
        '      <li><strong>S3 Standard :</strong> haute disponibilité (99.99%), accès ultra-rapide (ms) pour données fréquemment consultées.</li>',
        '      <li><strong>S3 Intelligent-Tiering :</strong> déplace automatiquement les objets entre tiers d\'accès fréquent et rare sans frais d\'extraction.</li>',
        '      <li><strong>S3 Standard-IA :</strong> coût de stockage réduit de 50%, facturation des frais d\'accès/extraction pour sauvegardes à consultation rare.</li>',
        '      <li><strong>S3 Glacier Flexible Retrieval :</strong> archivage à bas coût, récupération en quelques minutes ou 3 à 5 heures.</li>',
        '      <li><strong>S3 Glacier Deep Archive :</strong> classe la plus économique d\'AWS (~1 $/To/mois), récupération en 12 à 48 heures pour archivage légal long terme.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Sécurité S3 : Block Public Access, Versioning &amp; Chiffrement KMS',
      html: [
        '<p>Amazon S3 intègre de multiples verrous pour prévenir la fuite accidentelle de données d\'entreprise :</p>',
        '<div class="grid grid-3">',
        '  <div class="card">',
        '    <h4>S3 Block Public Access</h4>',
        '    <p>Garde-fou centralisé activé par défaut au niveau du compte et des buckets.</p>',
        '    <p>Bloque et ignore immédiatement toute ACL ou politique de compartiment (Bucket Policy) qui tenterait d\'accorder un accès anonyme ou public aux objets.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Versioning &amp; MFA Delete</h4>',
        '    <p>Conserve l\'historique complet de toutes les versions d\'un objet (créations, modifications, marqueurs de suppression).</p>',
        '    <p>Protège contre les suppressions accidentelles et les attaques de ransomwares. <em>MFA Delete</em> exige un code d\'authentification physique pour supprimer définitivement une version.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Chiffrement au Repos (SSE)</h4>',
        '    <p>Tout nouvel objet dans S3 est obligatoirement chiffré au repos :</p>',
        '    <ul>',
        '      <li><strong>SSE-S3 :</strong> clés gérées par S3 (AES-256), gratuit et transparent.</li>',
        '      <li><strong>SSE-KMS :</strong> clés gérées par AWS Key Management Service (audit CloudTrail et contrôle d\'accès granulaire).</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Système de Fichiers Partagé Amazon EFS (Elastic File System)',
      html: [
        '<p>Amazon EFS fournit un système de fichiers élastique sans serveur basé sur le protocole standard <strong>NFS v4</strong> :</p>',
        '<ul>',
        '  <li><strong>Accès concurrent multi-instances :</strong> contrairement à EBS qui est lié à une seule VM dans une seule AZ, EFS peut être monté simultanément sur des centaines d\'instances EC2 et conteneurs ECS/Fargate répartis sur plusieurs AZs.</li>',
        '  <li><strong>Croissance et décroissance automatique :</strong> s\'étend et se rétracte automatiquement à mesure que des fichiers sont ajoutés ou supprimés sans interruption.</li>',
        '  <li><strong>Cas d\'usage types :</strong> répertoires de médias partagés pour CMS (WordPress, Drupal), systèmes de gestion de contenu d\'entreprise et répertoires personnels de serveurs Linux.</li>',
        '</ul>'
      ].join('\n')
    },
    {
      title: 'Bases Relationnelles Amazon RDS &amp; Amazon Aurora',
      html: [
        '<p>Amazon Relational Database Service (RDS) automatise l\'administration des moteurs relationnels (PostgreSQL, MySQL, MariaDB, Oracle, SQL Server) :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Déploiement Multi-AZ (Haute Disponibilité)</h4>',
        '    <ul>',
        '      <li><strong>Réplication synchrone</strong> vers une instance Standby passive située dans une Availability Zone distincte.</li>',
        '      <li>En cas de défaillance matérielle ou de panne d\'AZ primaire, AWS bascule automatiquement (Failover) le point de terminaison DNS vers le Standby en 60 à 120 secondes sans perte de données.</li>',
        '      <li>L\'instance Standby ne traite aucune requête client (dédiée exclusivement à la reprise).</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Read Replicas (Montée en Charge Lecture)</h4>',
        '    <ul>',
        '      <li><strong>Réplication asynchrone</strong> vers jusqu\'à 15 instances de lecture dédiées (pouvant être situées dans d\'autres AZs ou d\'autres régions).</li>',
        '      <li>Déleste l\'instance primaire des requêtes de consultation lourdes (reporting, requêtes de recherche) pour préserver les performances d\'écriture.</li>',
        '    </ul>',
        '  </div>',
        '</div>',
        '<p style="margin-top:16px"><strong>Amazon Aurora :</strong> moteur relationnel propriétaire AWS compatible MySQL et PostgreSQL, offrant jusqu\'à 5 fois les performances de MySQL standard. Il s\'appuie sur un système de stockage cloud natif qui réplique automatiquement <strong>6 copies des données sur 3 Availability Zones</strong> avec basculement ultra-rapide (&lt; 30 secondes).</p>'
      ].join('\n')
    },
    {
      title: 'Bases NoSQL Managées : Amazon DynamoDB &amp; Capacité RCU/WCU',
      html: [
        '<p>Amazon DynamoDB est une base de données NoSQL clé-valeur et document entièrement gérée, offrant des temps de réponse inférieurs à 10 millisecondes à n\'importe quelle échelle :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Structure de Données &amp; Clés</h4>',
        '    <ul>',
        '      <li><strong>Partition Key (Clé de hachage) :</strong> détermine la partition physique où l\'élément est stocké.</li>',
        '      <li><strong>Sort Key (Clé de tri) :</strong> facultative, permet d\'indexer plusieurs éléments sous une même clé de partition (clé composite).</li>',
        '      <li>Schéma flexible : chaque élément peut posséder des attributs différents, sans contrainte de schéma rigide.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Dimensionnement RCU &amp; WCU</h4>',
        '    <ul>',
        '      <li><strong>RCU (Read Capacity Unit) :</strong> 1 RCU = 1 lecture fortement cohérente par seconde pour un item jusqu\'à 4 KB (ou 2 lectures éventuellement cohérentes).</li>',
        '      <li><strong>WCU (Write Capacity Unit) :</strong> 1 WCU = 1 écriture standard par seconde pour un item jusqu\'à 1 KB.</li>',
        '      <li><strong>Mode On-Demand :</strong> allocation et facturation automatique à la requête sans aucun provisionnement préalable, idéal pour les charges imprévisibles.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],

  methodTitle: 'Démarche de Sélection & Dimensionnement des Données',
  method: [
    'Classification des données : séparer les objets non structurés (fichiers, images, logs vers S3), le stockage bloc attaché (OS et I/O intensives vers EBS), les fichiers partagés (EFS) et les données structurées (RDS ou DynamoDB).',
    'Définition des règles de cycle de vie S3 : configurer des transitions automatiques vers S3 Standard-IA après 30 jours, vers Glacier Flexible après 90 jours et suppression des anciennes versions après 365 jours.',
    'Activation des protections de conformité : verrouiller l\'ensemble des compartiments avec S3 Block Public Access et exiger le chiffrement systématique par clé KMS managée.',
    'Arbitrage relationnel vs NoSQL : opter pour RDS Multi-AZ / Aurora si des requêtes SQL complexes et jointures ACID sont requises, ou pour DynamoDB pour des charges de microservices à volumétrie massive et latence sub-milliseconde.'
  ],

  summary: [
    'Amazon S3 fournit un stockage objet mondial hautement durable (99.999999999%), organisé en compartiments et objets avec hiérarchie de classes économiques (Standard, IA, Glacier).',
    'La sécurité S3 repose sur S3 Block Public Access, le versioning d\'objets contre les ransomwares et le chiffrement transparent SSE-S3 / SSE-KMS.',
    'Amazon EFS offre un système de fichiers partagé NFS v4 montable simultanément par des centaines d\'instances et conteneurs sur plusieurs zones de disponibilité.',
    'Amazon RDS garantit la haute disponibilité via la réplication synchrone Multi-AZ (basculement automatique) et la scalabilité des lectures via Read Replicas asynchrones.',
    'Amazon DynamoDB est une base NoSQL serverless ultra-rapide dimensionnée par unités de capacité de lecture (RCU) et d\'écriture (WCU) ou en mode On-Demand.'
  ],

  checklist: [
    'Savez-vous choisir la classe de stockage S3 optimale selon la fréquence d\'accès et les contraintes budgétaires ?',
    'Comprenez-vous le rôle des 4 options de S3 Block Public Access pour empêcher les fuites de données ?',
    'Distinguez-vous parfaitement les cas d\'usage d\'Amazon EBS (mono-AZ/bloc), Amazon EFS (multi-AZ/NFS) et Amazon S3 (régional/objet) ?',
    'Pouvez-vous expliquer la différence entre un déploiement RDS Multi-AZ et une réplique en lecture (Read Replica) ?',
    'Savez-vous calculer les RCU et WCU nécessaires pour une table DynamoDB selon la taille des éléments et le mode de cohérence ?'
  ],

  notions: [
    { term: 'Amazon S3', def: 'Simple Storage Service : service de stockage objet distribué mondial à durabilité extrême (11 neuf).' },
    { term: 'Durabilité 11 neuf (99.999999999%)', def: 'Probabilité théorique de ne perdre qu\'un seul objet sur 10 millions stockés sur une période de 10 000 ans.' },
    { term: 'S3 Block Public Access', def: 'Mécanisme centralisé neutralisant toute politique ou ACL rendant un compartiment ou objet S3 accessible publiquement.' },
    { term: 'Amazon EFS', def: 'Elastic File System : système de fichiers partagé NFS v4 multi-AZ pour instances Linux et conteneurs.' },
    { term: 'RDS Multi-AZ', def: 'Déploiement haute disponibilité avec réplication synchrone vers une instance passive Standby avec failover automatique.' },
    { term: 'Read Replica', def: 'Copie en lecture seule alimentée par réplication asynchrone pour délester l\'instance primaire des requêtes de consultation.' },
    { term: 'Amazon Aurora', def: 'Base de données relationnelle cloud native répliquant 6 copies sur 3 AZs avec jusqu\'à 5x les performances de MySQL.' },
    { term: 'Amazon DynamoDB', def: 'Base de données NoSQL gérée offrant des performances sub-millisecondes et un modèle de dimensionnement RCU/WCU.' }
  ],

  pitfalls: [
    'Créer un compartiment S3 avec un nom contenant des majuscules ou des underscores (le nom doit respecter strictement le format DNS minuscule).',
    'Penser qu\'un Standby RDS Multi-AZ peut être utilisé pour accélérer les requêtes de lecture de l\'application (seules les Read Replicas traitent des lectures).',
    'Sous-estimer les frais de récupération (retrieval fees) des classes S3 Standard-IA et Glacier lors de restaurations massives fréquentes.',
    'Oublier de provisionner suffisamment de WCU sur DynamoDB, entraînant des erreurs de dépassement de quota de débit (ProvisionedThroughputExceededException).'
  ],

  questions: [
    {
      stem: 'Quelle durabilité théorique des données Amazon S3 garantit-il en répliquant automatiquement chaque objet sur au moins 3 Availability Zones ?',
      opts: ['99.9%', '99.99%', '99.999999999% (11 neuf)', '100% sans exception'],
      correct: 2,
      exp: 'Amazon S3 Standard est conçu pour offrir une durabilité de 99.999999999% (11 neuf) sur un an en distribuant les copies d\'objets sur plusieurs centres de données indépendants.'
    },
    {
      stem: 'Quelle classe de stockage Amazon S3 offre le tarif au Go le plus bas pour des archives légales à long terme nécessitant un délai de récupération de 12 à 48 heures ?',
      opts: ['S3 Standard', 'S3 Standard-IA', 'S3 Glacier Flexible Retrieval', 'S3 Glacier Deep Archive'],
      correct: 3,
      exp: 'S3 Glacier Deep Archive est la classe de stockage la plus économique du cloud (~0.00099 $/Go/mois), idéale pour la conformité et la rétention réglementaire sur 7 à 10 ans.'
    },
    {
      stem: 'Quelle technologie de stockage AWS permet à des dizaines d\'instances EC2 réparties dans plusieurs Availability Zones d\'accéder simultanément au même système de fichiers partagé en NFS v4 ?',
      opts: ['Amazon EBS gp3', 'Amazon EFS (Elastic File System)', 'Instance Store local', 'Amazon S3 Glacier'],
      correct: 1,
      exp: 'Amazon EFS est un système de fichiers partagé basé sur le protocole NFS v4 qui peut être monté simultanément sur des centaines d\'instances réparties sur plusieurs AZs.'
    },
    {
      stem: 'Dans une architecture de base de données Amazon RDS PostgreSQL, quelle est la fonction principale d\'un déploiement Multi-AZ ?',
      opts: ['Doubler la vitesse d\'exécution des requêtes de lecture', 'Assurer la haute disponibilité et la reprise automatique après sinistre via une réplique synchrone Standby', 'Fournir un accès gratuit pour les développeurs', 'Compresser les tables volumineuses'],
      correct: 1,
      exp: 'Le déploiement Multi-AZ assure la haute disponibilité en maintenant une réplique synchrone passive dans une autre zone. En cas de panne de l\'instance primaire, le basculement est automatique.'
    },
    {
      stem: 'Combien de Read Capacity Units (RCU) sont nécessaires dans Amazon DynamoDB pour réaliser 100 lectures fortement cohérentes (Strongly Consistent) par seconde sur des éléments de 3.5 KB ?',
      opts: ['25 RCU', '50 RCU', '100 RCU', '200 RCU'],
      correct: 2,
      exp: 'Un élément de 3.5 KB tient dans un bloc de 4 KB (math.ceil(3.5/4) = 1). Pour une lecture fortement cohérente, 1 lecture = 1 RCU. Donc 100 lectures/sec * 1 RCU = 100 RCU.'
    },
    {
      stem: 'Quel mécanisme de sécurité Amazon S3 neutralise formellement toute tentative de rendre un bucket ou des objets publics, même si une politique permissive est appliquée ?',
      opts: ['AWS Shield', 'S3 Block Public Access', 'Amazon Inspector', 'AWS WAF'],
      correct: 1,
      exp: 'S3 Block Public Access fournit des paramètres centralisés appliqués au niveau du compte ou du bucket qui écrasent et ignorent toute règle permissive publique (ACL ou Bucket Policy).'
    },
    {
      stem: 'Quelle caractéristique distingue Amazon Aurora par rapport aux moteurs de bases de données RDS traditionnels (MySQL standard) ?',
      opts: ['Aurora stocke les données sur des disques magnétiques lents', 'Aurora réplique automatiquement 6 copies des données sur 3 Availability Zones et offre jusqu\'à 5 fois les performances de MySQL', 'Aurora ne supporte pas le langage SQL', 'Aurora n\'est disponible que dans une seule région'],
      correct: 1,
      exp: 'Amazon Aurora est un moteur cloud natif qui sépare le calcul et le stockage. Son système de stockage distribué réplique 6 copies des blocs sur 3 AZs avec un basculement ultra-rapide.'
    },
    {
      stem: 'Pour protéger les objets S3 contre les suppressions accidentelles et les ransomwares en conservant l\'historique des modifications, quelle fonctionnalité doit être activée ?',
      opts: ['S3 Transfer Acceleration', 'S3 Versioning', 'S3 Intelligent-Tiering', 'S3 Cross-Origin Resource Sharing (CORS)'],
      correct: 1,
      exp: 'Le versioning S3 conserve toutes les variantes d\'un objet (création, écrasement, suppression). Une suppression place simplement un Delete Marker, permettant de restaurer la version antérieure.'
    }
  ],

  flashcards: [
    {
      q: 'Quelle est la durabilité garantie par Amazon S3 Standard ?',
      a: '99.999999999% (11 neuf) par an grâce à la réplication multi-centres de données.'
    },
    {
      q: 'Quelle est la différence fondamentale entre EBS et EFS ?',
      a: 'EBS est un stockage bloc lié à une seule instance dans une seule AZ ; EFS est un stockage fichier NFS partagé multi-AZ.'
    },
    {
      q: 'À quoi sert le déploiement RDS Multi-AZ ?',
      a: 'À assurer la haute disponibilité via une réplique synchrone passive Standby avec basculement automatique en cas de panne.'
    },
    {
      q: 'Quelle est la différence entre RDS Multi-AZ et Read Replicas ?',
      a: 'Multi-AZ = réplication synchrone pour la résilience ; Read Replica = réplication asynchrone pour la scalabilité des lectures.'
    },
    {
      q: 'Comment se calcule 1 RCU dans Amazon DynamoDB ?',
      a: '1 RCU = 1 lecture fortement cohérente par seconde pour un élément jusqu\'à 4 KB (ou 2 lectures éventuellement cohérentes).'
    },
    {
      q: 'Quel est le rôle de S3 Block Public Access ?',
      a: 'Bloquer de manière centralisée toute tentative d\'accorder des permissions publiques anonymes sur un bucket ou un objet.'
    }
  ],

  mastery: [
    { cls: 'low', text: 'Score < 60 % : Notions de stockage et bases de données incomplètes. Relisez la différence entre EBS, EFS et S3.' },
    { cls: 'mid', text: 'Score 60-74 % : Bases acquises. Approfondissez les calculs de capacité DynamoDB (RCU/WCU) et les classes S3.' },
    { cls: 'mid', text: 'Score 75-84 % : Bonne maîtrise d\'ensemble. Entraînez-vous à dimensionner les tables DynamoDB dans l\'atelier.' },
    { cls: 'high', text: 'Score 85-94 % : Niveau solide. Vous maîtrisez les clusters Aurora et les politiques de cycle de vie S3.' },
    { cls: 'high', text: 'Score ≥ 95 % : Maîtrise d\'architecte données AWS. Prêt pour le serverless Lambda, SQS et CloudWatch du Module 6 !' }
  ]
};
