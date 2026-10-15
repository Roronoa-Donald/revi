/**
 * server/content/b3-cloud-aws/chapitre3.js — Chapitre 3
 * Calcul & Conteneurs — EC2, EBS, ELB, Auto Scaling & Fargate
 */
'use strict';

module.exports = {
  n: 3,
  title: 'Calcul & Conteneurs — EC2, EBS, ELB, Auto Scaling & Fargate',
  short: 'Calcul & Conteneurs AWS',
  toc: 'Instances EC2, familles de calcul, modèles d\'achat (Spot/Reserved), stockage EBS, Elastic Load Balancing, Auto Scaling et Fargate.',
  time: '≈ 2 h 45',
  free: false,

  situation:
    'Votre entreprise prépare le lancement d\'une nouvelle plateforme applicative à fort trafic. ' +
    'Vous devez concevoir une architecture de calcul hautement disponible et élastique : ' +
    'dimensionner les instances Amazon EC2 avec la stratégie d\'achat optimale (Reserved + Spot), configurer des volumes EBS gp3 performants, ' +
    'déployer un Application Load Balancer (ALB) répartissant le trafic sur plusieurs zones de disponibilité, et automatiser l\'élasticité via un Auto Scaling Group.',

  objectives: [
    'Identifier et sélectionner les familles d\'instances Amazon EC2 et optimiser les coûts via les modèles d\'achat (On-Demand, Reserved, Savings Plans, Spot).',
    'Dimensionner et administrer les volumes de stockage bloc Amazon EBS (gp3, io2), gérer les snapshots incrémentaux et le chiffrement.',
    'Déployer et configurer les répartiteurs de charge Elastic Load Balancing (ALB, NLB) avec leurs Target Groups et contrôles de santé.',
    'Configurer un Auto Scaling Group (ASG) avec Launch Template et politiques de Target Tracking pour garantir une haute disponibilité Multi-AZ équilibrée.'
  ],

  sections: [
    {
      title: 'Amazon EC2 : Familles de Calcul &amp; Modèles d\'Achat',
      html: [
        '<p>Amazon Elastic Compute Cloud (EC2) fournit une capacité de calcul redimensionnable dans le cloud sous forme de machines virtuelles sécurisées :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Les Familles d\'Instances EC2</h4>',
        '    <ul>',
        '      <li><strong>Usage général (General Purpose - T4g, M6i) :</strong> équilibre idéal entre calcul, mémoire et réseau pour les serveurs web et microservices.</li>',
        '      <li><strong>Optimisées pour le calcul (Compute - C6i, C7g) :</strong> forte puissance CPU pour le traitement batch, l\'encodage vidéo et le calcul scientifique.</li>',
        '      <li><strong>Optimisées pour la mémoire (Memory - R6i, X2gd) :</strong> volumétrie RAM élevée pour les bases de données en mémoire (Redis, SAP HANA).</li>',
        '      <li><strong>Optimisées pour le stockage (Storage - I3en, D3) :</strong> disques NVMe locaux ultra-rapides pour les entrepôts de données et clusters Elasticsearch.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Les 4 Modèles d\'Achat d\'Instances</h4>',
        '    <ul>',
        '      <li><strong>À la demande (On-Demand) :</strong> flexibilité totale, facturation à la seconde sans engagement. Idéal pour le développement et charges imprévisibles.</li>',
        '      <li><strong>Instances Réservées &amp; Savings Plans :</strong> engagement de 1 ou 3 ans en échange d\'une réduction jusqu\'à 72%. Optimal pour la charge socle continue.</li>',
        '      <li><strong>Instances Spot :</strong> surplus de capacité AWS vendu jusqu\'à 90% moins cher, mais interruptible avec un préavis de 2 minutes si AWS réclame la capacité.</li>',
        '      <li><strong>Hôtes Dédiés (Dedicated Hosts) :</strong> serveur physique complet dédié pour conformité réglementaire ou licences logicielles complexes (BYOL).</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Stockage Bloc Amazon EBS (Elastic Block Store) &amp; Snapshots',
      html: [
        '<p>Amazon EBS fournit des volumes de stockage bloc persistants rattachables aux instances EC2 au sein d\'une même Availability Zone :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Types de Volumes SSD &amp; Métriques Clés</h4>',
        '    <ul>',
        '      <li><strong>General Purpose SSD (gp3) :</strong> volume par défaut moderne. Offre 3 000 IOPS et 125 MB/s de base inclus sans frais, modulables jusqu\'à 16 000 IOPS et 1 000 MB/s indépendamment de la taille de stockage.</li>',
        '      <li><strong>Provisioned IOPS SSD (io2 Block Express) :</strong> performance extrême jusqu\'à 256 000 IOPS et 4 000 MB/s avec une durabilité de 99.999% pour bases de données critiques.</li>',
        '      <li><strong>Throughput Optimized HDD (st1) / Cold HDD (sc1) :</strong> stockage magnétique économique pour les charges séquentielles volumineuses (Big Data, logs).</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Snapshots Incrémentaux &amp; Chiffrement KMS</h4>',
        '    <ul>',
        '      <li><strong>Snapshots incrémentaux :</strong> sauvegardes point-in-time stockées de manière redondante dans Amazon S3. Seuls les blocs modifiés depuis le dernier snapshot sont sauvegardés et facturés.</li>',
        '      <li><strong>Chiffrement au repos :</strong> activable en un clic via <strong>AWS KMS</strong> (AES-256). Les données du volume, les I/O en transit vers l\'instance et tous les snapshots dérivés sont automatiquement chiffrés sans impact sur les performances.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Elastic Load Balancing (ELB) : ALB, NLB &amp; Health Checks',
      html: [
        '<p>Elastic Load Balancing distribue automatiquement le trafic entrant sur plusieurs cibles (instances EC2, conteneurs, adresses IP) réparties sur plusieurs AZs :</p>',
        '<div class="grid grid-3">',
        '  <div class="card">',
        '    <h4>Application Load Balancer (ALB)</h4>',
        '    <p>Opère au niveau de la <strong>couche 7 (HTTP/HTTPS)</strong> du modèle OSI.</p>',
        '    <p>Routage intelligent basé sur le chemin d\'URL (<code>/api/*</code> vs <code>/images/*</code>), les en-têtes HTTP, les cookies et les méthodes de requête. Supporte WebSockets et gère la terminaison SSL/TLS avec certificats AWS ACM gratuits.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Network Load Balancer (NLB)</h4>',
        '    <p>Opère au niveau de la <strong>couche 4 (TCP/UDP/TLS)</strong>.</p>',
        '    <p>Ultra-haute performance capable de traiter des millions de requêtes par seconde avec une latence ultra-faible (&lt; 1 ms). Fournit une adresse IP statique ou Elastic IP par Availability Zone.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Target Groups &amp; Health Checks</h4>',
        '    <p>Les cibles sont regroupées dans des Target Groups.</p>',
        '    <p>L\'équilibreur de charge sonde régulièrement chaque instance (Health Checks). Si une instance ne répond pas (ex: code HTTP 500 ou timeout), le trafic est immédiatement dérouté vers les instances saines restantes.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Auto Scaling Groups (ASG) &amp; Équilibre Multi-AZ',
      html: [
        '<p>Un <strong>Auto Scaling Group (ASG)</strong> ajuste automatiquement la taille de la flotte d\'instances pour répondre aux variations de charge tout en garantissant la résilience :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Paramètres de Capacité &amp; Launch Templates</h4>',
        '    <ul>',
        '      <li><strong>Capacité minimale (Min) :</strong> nombre d\'instances plancher garantissant le service même en creux de trafic.</li>',
        '      <li><strong>Capacité souhaitée (Desired) :</strong> nombre d\'instances actives en régime nominal.</li>',
        '      <li><strong>Capacité maximale (Max) :</strong> plafond d\'instances pour borner les coûts en cas de pic ou d\'attaque.</li>',
        '      <li><strong>Launch Template :</strong> modèle de lancement moderne définissant l\'AMI, le type d\'instance, le Security Group, l\'Instance Profile et le script de démarrage (User Data).</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Politiques d\'Échelle &amp; Répartition Multi-AZ</h4>',
        '    <ul>',
        '      <li><strong>Target Tracking Scaling :</strong> ajuste dynamiquement le nombre d\'instances pour maintenir une métrique cible (ex: maintenir l\'utilisation CPU globale à 50%).</li>',
        '      <li><strong>Step Scaling &amp; Simple Scaling :</strong> réagit par paliers en cas d\'alerte CloudWatch.</li>',
        '      <li><strong>Équilibrage Multi-AZ :</strong> l\'ASG distribue toujours les nouvelles instances dans la zone qui en compte le moins, garantissant une répartition géographique homogène.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Conteneurs Managés : Amazon ECS, EKS &amp; AWS Fargate',
      html: [
        '<p>Pour exécuter des applications conteneurisées Docker sans administrer manuellement de serveurs virtuels :</p>',
        '<div class="grid grid-3">',
        '  <div class="card">',
        '    <h4>Amazon ECS</h4>',
        '    <p>Service d\'orchestration de conteneurs hautement performant natif AWS, simple et profondément intégré avec IAM, VPC et CloudWatch.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Amazon EKS</h4>',
        '    <p>Service Kubernetes entièrement managé certifié conforme, garantissant la portabilité des charges de travail conteneurisées avec l\'écosystème open-source K8s.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>AWS Fargate (Serverless)</h4>',
        '    <p>Moteur d\'exécution serverless pour ECS et EKS. Vous définissez le CPU et la RAM de la tâche conteneur, AWS alloue l\'infrastructure sous-jacente sans aucune VM à gérer ni patcher.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],

  methodTitle: 'Démarche de Dimensionnement & Résilience de Calcul',
  method: [
    'Analyse du profil de charge : séparer la charge socle continue (à couvrir par des Savings Plans / Reserved Instances) des variations de trafic imprévisibles (gérées par l\'Auto Scaling).',
    'Création d\'un Launch Template standardisé : configurer l\'AMI durcie, le Security Group minimal, le rattachement d\'Instance Profile IAM et le script User Data automatisant l\'installation.',
    'Mise en place de l\'équilibreur de charge ALB multi-AZ : déclarer au minimum deux sous-réseaux publics dans des zones distinctes et paramétrer des sondes de santé HTTP précises.',
    'Configuration de l\'Auto Scaling Group : attacher le Target Group de l\'ALB, fixer les capacités Min/Desired/Max et activer une politique de mise à l\'échelle Target Tracking (CPU à 50%).'
  ],

  summary: [
    'Amazon EC2 propose des familles d\'instances adaptées (General Purpose, Compute, Memory, Storage) et des modèles d\'achat permettant d\'optimiser jusqu\'à 90% des coûts (Reserved, Spot).',
    'Amazon EBS fournit du stockage bloc persistant hautement disponible au sein d\'une AZ, avec les volumes gp3 (performances modulables) et des snapshots incrémentaux vers S3.',
    'L\'Application Load Balancer (ALB) opère en couche 7 (HTTP/HTTPS, routage d\'URL, SSL), tandis que le Network Load Balancer (NLB) traite des millions de requêtes en couche 4 à latence ultra-faible.',
    'L\'Auto Scaling Group (ASG) ajuste automatiquement le nombre d\'instances entre les bornes Min et Max, tout en assurant une répartition rigoureusement équilibrée entre les Availability Zones.',
    'AWS Fargate élimine la gestion de serveurs physiques en fournissant un moteur de calcul serverless pour conteneurs Docker sous Amazon ECS et EKS.'
  ],

  checklist: [
    'Savez-vous choisir le modèle d\'achat EC2 le plus économique selon la nature et la prévisibilité d\'une charge ?',
    'Comprenez-vous le fonctionnement des volumes EBS gp3 et le rôle des snapshots incrémentaux ?',
    'Distinguez-vous parfaitement les cas d\'usage d\'un Application Load Balancer (ALB) par rapport à un Network Load Balancer (NLB) ?',
    'Savez-vous comment un Auto Scaling Group réagit lors d\'un événement de mise à l\'échelle pour maintenir l\'équilibre Multi-AZ ?',
    'Pouvez-vous expliquer le concept de serverless containers apporté par AWS Fargate ?'
  ],

  notions: [
    { term: 'Amazon EC2', def: 'Elastic Compute Cloud : service de machines virtuelles sécurisées et redimensionnables dans le cloud AWS.' },
    { term: 'Spot Instance', def: 'Instance EC2 achetée avec jusqu\'à 90% de remise sur le surplus de capacité AWS, interruptible avec 2 minutes de préavis.' },
    { term: 'Amazon EBS', def: 'Elastic Block Store : volumes de stockage bloc montables sur une instance EC2 dans la même zone de disponibilité.' },
    { term: 'Volume gp3', def: 'Volume SSD standard offrant 3 000 IOPS et 125 MB/s inclus sans surcoût, extensibles indépendamment de la taille.' },
    { term: 'ALB (Application Load Balancer)', def: 'Répartiteur de charge couche 7 supportant le routage avancé basé sur le chemin d\'URL, les cookies et WebSockets.' },
    { term: 'Auto Scaling Group (ASG)', def: 'Groupe d\'instances EC2 ajustant automatiquement sa capacité pour maintenir la disponibilité et l\'équilibre zonal.' },
    { term: 'Target Tracking', def: 'Politique d\'auto-scaling maintenant une métrique cible (ex: utilisation CPU moyenne à 50%) en ajustant la flotte.' },
    { term: 'AWS Fargate', def: 'Moteur de calcul serverless exécutant des conteneurs Docker (ECS/EKS) sans provisionner ni administrer de serveurs EC2.' }
  ],

  pitfalls: [
    'Tenter de rattacher un volume EBS à une instance EC2 située dans une Availability Zone différente (EBS est lié à une seule AZ, sauf réplication via snapshot).',
    'Utiliser des instances Spot pour des bases de données d\'état critiques non répliquées qui ne peuvent pas tolérer une interruption abrupte.',
    'Oublier de configurer des Health Checks réalistes sur le Load Balancer, entraînant le maintien en ligne d\'instances défaillantes.',
    'Utiliser les anciennes Launch Configurations dépréciées au lieu des Launch Templates modernes recommandés par AWS.'
  ],

  questions: [
    {
      stem: 'Quel modèle d\'achat EC2 permet d\'obtenir jusqu\'à 90% de réduction par rapport au tarif On-Demand, sous réserve d\'accepter des interruptions potentielles avec 2 minutes de préavis ?',
      opts: ['Instances Réservées (Reserved Instances)', 'Savings Plans', 'Instances Spot', 'Hôtes Dédiés (Dedicated Hosts)'],
      correct: 2,
      exp: 'Les instances Spot exploitent le surplus de capacité matérielle inutilisée d\'AWS avec jusqu\'à 90% de rabais, mais AWS peut les réclamer avec un préavis d\'interruption de 2 minutes.'
    },
    {
      stem: 'Quelle caractéristique technique distingue les volumes EBS gp3 par rapport aux anciens volumes gp2 ?',
      opts: ['Les volumes gp3 ne peuvent pas être chiffrés', 'Les volumes gp3 permettent d\'augmenter les IOPS et le débit MB/s indépendamment de la taille du disque de stockage', 'Les volumes gp3 sont accessibles simultanément par 100 instances', 'Les volumes gp3 sont stockés sur bande magnétique'],
      correct: 1,
      exp: 'Contrairement à gp2 dont les performances dépendaient strictement du nombre de Go alloués, gp3 permet de provisionner les IOPS et le débit indépendamment de la capacité de stockage.'
    },
    {
      stem: 'À quelle couche du modèle OSI l\'Application Load Balancer (ALB) opère-t-il pour inspecter les requêtes HTTP/HTTPS ?',
      opts: ['Couche 2 (Liaison de données)', 'Couche 3 (Réseau)', 'Couche 4 (Transport)', 'Couche 7 (Application)'],
      correct: 3,
      exp: 'L\'Application Load Balancer opère au niveau de la couche 7 (Application), ce qui lui permet d\'inspecter les en-têtes HTTP, les URLs, les cookies et d\'effectuer des redirections intelligentes.'
    },
    {
      stem: 'Comment un Auto Scaling Group réagit-il lors d\'un événement de Scale Out pour maintenir une haute disponibilité optimale ?',
      opts: ['Il lance toutes les instances dans la première zone alphabétique', 'Il lance l\'instance dans l\'Availability Zone qui compte actuellement le moins d\'instances', 'Il supprime aléatoirement une instance dans une autre zone', 'Il attend que toutes les zones soient pleines'],
      correct: 1,
      exp: 'Pour garantir la tolérance aux pannes, l\'Auto Scaling Group veille à toujours équilibrer la flotte en allouant les nouvelles instances dans la zone de disponibilité la moins chargée.'
    },
    {
      stem: 'Quel service d\'orchestration AWS permet d\'exécuter des conteneurs Docker sans avoir à gérer, dimensionner ni patcher de machines virtuelles EC2 sous-jacentes ?',
      opts: ['Amazon EC2 Dedicated Hosts', 'AWS Fargate', 'Amazon EBS multi-attach', 'AWS Storage Gateway'],
      correct: 1,
      exp: 'AWS Fargate est une technologie de calcul serverless pour conteneurs (utilisable avec ECS et EKS) qui abstrait totalement l\'infrastructure et les serveurs sous-jacents.'
    },
    {
      stem: 'Quelle métrique un volume EBS gp3 inclut-il gratuitement de base, sans frais additionnels ?',
      opts: ['1 000 IOPS et 50 MB/s', '3 000 IOPS et 125 MB/s', '10 000 IOPS et 500 MB/s', '50 000 IOPS et 1 000 MB/s'],
      correct: 1,
      exp: 'Tout volume EBS gp3 inclut gratuitement 3 000 IOPS et 125 MB/s de débit de base, quelle que soit sa taille en GiB.'
    },
    {
      stem: 'Qu\'advient-il d\'une instance EC2 membre d\'un Auto Scaling Group qui échoue de manière répétée aux sondes de santé (Health Checks) de son Load Balancer ?',
      opts: ['L\'ASG ignore l\'échec', 'L\'ASG termine automatiquement l\'instance défaillante et lance une nouvelle instance saine de remplacement (Auto-healing)', 'L\'ASG arrête toutes les autres instances de la région', 'L\'ASG passe en mode dégradé manuel'],
      correct: 1,
      exp: 'L\'ASG intègre l\'auto-healing : dès qu\'une instance est déclarée Unhealthy par le Load Balancer, il la termine et en instancie une nouvelle pour préserver la capacité désirée.'
    },
    {
      stem: 'Pourquoi les snapshots Amazon EBS sont-ils qualifiés d\'incrémentaux ?',
      opts: ['Car chaque snapshot copie l\'intégralité du disque à chaque fois', 'Car seuls les blocs de données modifiés depuis le dernier snapshot sont enregistrés dans Amazon S3', 'Car leur prix augmente avec le temps', 'Car ils ne fonctionnent que sur des fichiers texte'],
      correct: 1,
      exp: 'Les snapshots EBS sont incrémentaux : seule la différence (les blocs modifiés depuis la sauvegarde précédente) est stockée dans S3, ce qui réduit considérablement les coûts et le temps de sauvegarde.'
    }
  ],

  flashcards: [
    {
      q: 'Qu\'est-ce qu\'une instance Spot dans Amazon EC2 ?',
      a: 'Une instance utilisant la capacité inutilisée d\'AWS avec jusqu\'à 90% de remise, interruptible avec 2 minutes de préavis.'
    },
    {
      q: 'Quelles sont les performances de base incluses d\'un volume EBS gp3 ?',
      a: '3 000 IOPS et 125 MB/s de débit inclus sans surcoût, modulables indépendamment de la taille de stockage.'
    },
    {
      q: 'Quelle est la différence majeure entre un ALB et un NLB ?',
      a: 'ALB opère en couche 7 (HTTP/HTTPS, routage par URL) ; NLB opère en couche 4 (TCP/UDP, latence ultra-faible, IP statique).'
    },
    {
      q: 'Quel est le rôle d\'un Launch Template pour un Auto Scaling Group ?',
      a: 'Définir la configuration de lancement des instances : AMI, type d\'instance, Security Group, rôle IAM et script User Data.'
    },
    {
      q: 'Comment un Auto Scaling Group équilibre-t-il les instances entre les AZs ?',
      a: 'Il lance les nouvelles instances dans l\'Availability Zone qui compte le moins d\'instances actives pour éviter tout SPOF.'
    },
    {
      q: 'Qu\'est-ce qu\'AWS Fargate ?',
      a: 'Un moteur de calcul serverless pour conteneurs (ECS/EKS) exécutant des applications Docker sans aucune machine virtuelle à gérer.'
    }
  ],

  mastery: [
    { cls: 'low', text: 'Score < 60 % : Notions de calcul et modèles d\'achat imprécis. Révisez les familles EC2 et les types EBS.' },
    { cls: 'mid', text: 'Score 60-74 % : Bases acquises. Approfondissez les différences architecturales entre ALB et NLB.' },
    { cls: 'mid', text: 'Score 75-84 % : Bonne maîtrise d\'ensemble. Entraînez-vous à simuler l\'équilibrage multi-AZ dans l\'atelier.' },
    { cls: 'high', text: 'Score 85-94 % : Niveau solide. Vous maîtrisez le dimensionnement EBS et les stratégies d\'auto-scaling.' },
    { cls: 'high', text: 'Score ≥ 95 % : Maîtrise d\'architecte calcul AWS. Prêt pour l\'ingénierie réseau Amazon VPC du Module 4 !' }
  ]
};
