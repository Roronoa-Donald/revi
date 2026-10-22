/**
 * Chapitre 1 du cours « Cloud Computing B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 1,
  title: 'Modèles NIST, Typologies de Services &amp; Caractéristiques Fondamentales',
  short: 'Modèles NIST &amp; Services',
  toc: 'Définition canonique du NIST SP 800-145, 5 caractéristiques essentielles, typologies IaaS, PaaS, SaaS, modèles de déploiement public, privé, hybride et communautaire.',
  time: '≈ 2 h 45 de travail',
  free: true,
  situation: 'Le Cloud Computing a révolutionné l’industrie informatique en substituant à l’acquisition de matériel physique coûteux (CAPEX) un modèle de consommation élastique à l’usage (OPEX). Cependant, la prolifération des offres commerciales crée une confusion récurrente entre simple hébergement virtualisé et véritable environnement Cloud. Pour concevoir, auditer et gouverner des systèmes d’information modernes, l’ingénieur informatique de Bachelor 3 doit maîtriser le cadre de référence mondial institué par le National Institute of Standards and Technology (NIST SP 800-145), comprendre la répartition exacte des responsabilités sur les couches IaaS, PaaS et SaaS, et arbitrer judicieusement entre déploiement public, privé, hybride ou communautaire.',
  objectives: [
    'définir rigoureusement les 5 caractéristiques essentielles du Cloud Computing selon le standard NIST SP 800-145 ;',
    'différencier les modèles de service IaaS, PaaS et SaaS et identifier la frontière de responsabilité client/fournisseur ;',
    'analyser les modèles de déploiement : Cloud public, privé on-premise, hybride interconnecté et communautaire ;',
    'évaluer l’élasticité dynamique, la mutualisation multi-tenant et la facturation mesurée à la seconde ;',
    'concevoir une grille d’audit d’éligibilité Cloud pour un parc applicatif d’entreprise ;',
    'automatiser la classification de services et l’audit NIST par des scripts Python dédiés.'
  ],
  sections: [
    {
      title: 'La Définition Fondatrice du NIST et les 5 Caractéristiques Essentielles',
      html: [
        '<p>Selon la publication spéciale <strong>NIST SP 800-145</strong>, le Cloud Computing est un modèle permettant un accès réseau omniprésent, pratique et à la demande à un ensemble partagé de ressources informatiques configurables (réseaux, serveurs, stockage, applications, services) pouvant être rapidement provisionnées et libérées avec un minimum d’effort de gestion ou d’interaction avec le fournisseur de services.</p>',
        '<div class="grid grid-3">',
        '  <div class="card">',
        '    <h4>1. On-Demand Self-Service</h4>',
        '    <p>L’utilisateur provisionne automatiquement des capacités informatiques (temps CPU, stockage, réseau) de manière unilatérale et programmatique (API, CLI, console web) sans intervention humaine du fournisseur.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Broad Network Access</h4>',
        '    <p>Les capacités sont accessibles via le réseau par le biais de mécanismes standards indépendants des plateformes clientes (navigateurs web, postes de travail, mobiles, passerelles IoT).</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>3. Resource Pooling</h4>',
        '    <p>Les ressources physiques et virtuelles du fournisseur sont mutualisées pour servir plusieurs consommateurs (modèle multi-tenant), avec allocation dynamique selon la demande et abstraction de la localisation physique.</p>',
        '  </div>',
        '</div>',
        '<div class="grid grid-2" style="margin-top:16px">',
        '  <div class="card">',
        '    <h4>4. Rapid Elasticity</h4>',
        '    <p>Les capacités peuvent être élastiquement allouées et libérées, de manière automatisée, pour monter ou descendre en charge (scale-out / scale-in) au rythme des besoins applicatifs, donnant l’illusion d’une capacité infinie.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>5. Measured Service</h4>',
        '    <p>Les systèmes contrôlent et optimisent automatiquement l’utilisation des ressources en exploitant une capacité de mesure adaptée au type de service (stockage, bande passante, temps de calcul, comptes actifs), garantissant transparence et facturation à l’usage.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Typologies de Services : IaaS, PaaS et SaaS',
      html: [
        '<p>L’abstraction matérielle s’organise selon trois modèles canoniques définissant le périmètre d’infogérance et la charge opérationnelle dévolue au client :</p>',
        '<div class="grid grid-3">',
        '  <div class="card">',
        '    <h4>IaaS (Infrastructure as a Service)</h4>',
        '    <p>Fourniture de ressources brutes : machines virtuelles, volumes blocs, réseaux virtuels (VPC/VNet).<br><strong>Le client administre :</strong> le système d’exploitation (OS), les patchs noyau, le middleware, le runtime, l’application et les données.<br><strong>Exemples :</strong> AWS EC2, Azure VM, GCP Compute Engine.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>PaaS (Platform as a Service)</h4>',
        '    <p>Mise à disposition d’un environnement d’exécution applicatif complet sans gestion d’infrastructure.<br><strong>Le client administre :</strong> son code applicatif et ses données métier.<br><strong>Le CSP administre :</strong> les serveurs physiques, l’hyperviseur, l’OS hôte/invité, les patchs et le runtime.<br><strong>Exemples :</strong> AWS Elastic Beanstalk, Heroku, Google App Engine.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>SaaS (Software as a Service)</h4>',
        '    <p>Logiciel complet clé en main accessible via un navigateur ou une API cliente.<br><strong>Le client administre :</strong> uniquement ses données, ses configurations fonctionnelles et ses utilisateurs (IAM).<br><strong>Le CSP administre :</strong> l’ensemble de la pile technique, de l’infrastructure physique jusqu’au code applicatif.<br><strong>Exemples :</strong> Microsoft 365, Salesforce, Google Workspace.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Modèles de Déploiement : Public, Privé, Hybride &amp; Communautaire',
      html: [
        '<p>Le modèle de déploiement définit la propriété de l’infrastructure, son périmètre d’accessibilité et ses garanties de gouvernance :</p>',
        '<ul>',
        '  <li><strong>Cloud Public :</strong> L’infrastructure est la propriété d’un fournisseur tiers (CSP hyperscaler), hébergée dans ses centres de données mondiaux et partagée entre de multiples organisations clientes (multi-tenant) via une isolation logique rigoureuse.</li>',
        '  <li><strong>Cloud Privé (On-Premise ou Hosted) :</strong> L’infrastructure est exploitée au bénéfice exclusif d’une seule organisation comprenant de multiples unités (business units). Elle offre une maîtrise absolue sur le matériel et la conformité, mais réclame des investissements CAPEX élevés et une équipe d’exploitation dédiée (OpenStack, VMware Cloud Foundation).</li>',
        '  <li><strong>Cloud Hybride :</strong> Composition de deux ou plusieurs infrastructures distinctes (privée et publique) qui restent des entités uniques liées par une technologie standardisée ou propriétaire permettant la portabilité des données et des applications (débordement de charge ou « cloud bursting », archivage légal local et calcul élastique public).</li>',
        '  <li><strong>Cloud Communautaire :</strong> Infrastructure partagée par plusieurs organisations ayant des missions ou des exigences communes (réglementation stricte, secteur de la santé, recherche académique, groupement bancaire).</li>',
        '</ul>'
      ].join('\n')
    }
  ],
  methodTitle: 'Méthodologie de Qualification d’un Service Cloud',
  method: [
    'Évaluer la conformité du service aux 5 caractéristiques cumulatives de la norme NIST SP 800-145.',
    'Identifier formellement le niveau d’abstraction requis (IaaS pour le contrôle du système, PaaS pour la vélocité de dev, SaaS pour le progiciel).',
    'Cartographier la frontière de responsabilité pour chaque couche : matériel, hyperviseur, OS, middleware, application, données.',
    'Vérifier les exigences d’isolation : colocation multi-tenant admissible ou isolation physique dédiée requise.',
    'Analyser les contraintes de latence réseau et de connectivité : liaison Internet publique, VPN IPsec chiffré ou lien dédié (Direct Connect / ExpressRoute).',
    'Formaliser la décision d’architecture dans un dossier de choix technique opposable aux audits de conformité.'
  ],
  summary: [
    'Le NIST SP 800-145 définit 5 caractéristiques obligatoires : libre-service à la demande, accès réseau universel, mutualisation des ressources, élasticité rapide et service mesuré.',
    'La chaîne IaaS -> PaaS -> SaaS transfère progressivement la maintenance technique vers le fournisseur Cloud.',
    'En IaaS, le client garde l’entière responsabilité du système d’exploitation invité et des patchs de sécurité.',
    'Dans tous les modèles de service sans exception (y compris en SaaS), la gouvernance des données et la gestion des identités restent à la charge du client.',
    'Le Cloud hybride combine la souveraineté locale des données critiques et l’élasticité de calcul du cloud public.'
  ],
  checklist: [
    'Je sais citer par cœur les 5 caractéristiques essentielles du NIST.',
    'Je sais expliquer pourquoi un hébergeur web classique sans API de provisionnement n’est pas un Cloud.',
    'Je connais la frontière exacte de responsabilité pour chaque composant en IaaS, PaaS et SaaS.',
    'Je sais distinguer un Cloud hybride d’un simple environnement multi-cloud.',
    'Je sais identifier les cas d’usage adaptés au Cloud communautaire.',
    'Je sais calculer l’impact du modèle multi-tenant sur l’isolation des données.'
  ],
  notions: [
    'Définition canonique NIST SP 800-145',
    'Libre-service à la demande (On-Demand Self-Service)',
    'Mutualisation des ressources (Resource Pooling)',
    'Élasticité dynamique (Rapid Elasticity)',
    'Infrastructure as a Service (IaaS)',
    'Platform as a Service (PaaS)',
    'Software as a Service (SaaS)',
    'Modèle multi-tenant et isolation logique'
  ],
  pitfalls: [
    'Confondre virtualisation classique et Cloud Computing : la virtualisation est une technologie habilitante, pas un service en libre-service élastique.',
    'Penser que le fournisseur gère la sécurité des données applicatives en IaaS.',
    'Négliger les coûts cachés de transfert de données sortantes (data egress fees) entre cloud public et privé dans un modèle hybride.',
    'Qualifier de Cloud privé un cluster de virtualisation statique sans portail de libre-service ni mesure de consommation.'
  ],
  questions: [
    {
      stem: 'Selon le standard NIST SP 800-145, quelle caractéristique garantit que l’utilisateur peut allouer des machines virtuelles sans intervention humaine du support technique ?',
      opts: [
        'On-Demand Self-Service',
        'Broad Network Access',
        'Resource Pooling',
        'Measured Service'
      ],
      correct: 0,
      exp: 'Le libre-service à la demande (On-Demand Self-Service) permet au consommateur de provisionner des capacités informatiques de manière autonome et automatique.'
    },
    {
      stem: 'Dans un modèle de service IaaS (Infrastructure as a Service), à qui incombe la responsabilité d’appliquer les correctifs de sécurité sur le système d’exploitation invité (ex: Ubuntu Server) ?',
      opts: [
        'Au fournisseur Cloud (CSP)',
        'Au client consommateur',
        'À l’éditeur du système d’exploitation exclusivement',
        'À la communauté open-source'
      ],
      correct: 1,
      exp: 'En IaaS, le fournisseur garantit l’hyperviseur et le matériel physique, mais le système d’exploitation invité installé dans la machine virtuelle relève exclusivement de la responsabilité du client.'
    },
    {
      stem: 'Quelle caractéristique du Cloud permet d’adapter automatiquement le nombre d’instances en fonction de l’augmentation ou de la diminution de la charge de trafic ?',
      opts: [
        'Resource Pooling',
        'Rapid Elasticity',
        'Broad Network Access',
        'High Availability'
      ],
      correct: 1,
      exp: 'L’élasticité rapide (Rapid Elasticity) est la capacité du système à allouer et libérer dynamiquement des ressources pour s’ajuster aux variations de charge.'
    },
    {
      stem: 'Quel modèle de service offre le niveau d’abstraction le plus élevé pour l’utilisateur, éliminant toute gestion du runtime et du serveur ?',
      opts: [
        'IaaS',
        'PaaS',
        'SaaS',
        'BaaS'
      ],
      correct: 2,
      exp: 'En SaaS (Software as a Service), le logiciel est consommé directement sans qu’aucun serveur, système d’exploitation ou runtime ne soit administré par le client.'
    },
    {
      stem: 'Comment qualifie-t-on une infrastructure Cloud partagée exclusivement entre plusieurs hôpitaux et centres de recherche médicale poursuivant des missions de santé communes ?',
      opts: [
        'Cloud Public',
        'Cloud Hybride',
        'Cloud Privé Dédié',
        'Cloud Communautaire'
      ],
      correct: 3,
      exp: 'Le Cloud communautaire fédère une infrastructure réservée à des organisations partageant des exigences réglementaires, fonctionnelles ou déontologiques similaires.'
    },
    {
      stem: 'Quelle couche reste TOUJOURS sous l’entière responsabilité du client, y compris dans le modèle SaaS le plus infogéré ?',
      opts: [
        'L’hyperviseur physique',
        'Le système d’exploitation de base',
        'La gouvernance des données et les droits d’accès utilisateurs',
        'Le pare-feu réseau de bordure du datacenter'
      ],
      correct: 2,
      exp: 'Même en SaaS, la protection des données, leur classification et la configuration des autorisations d’accès des utilisateurs (IAM) demeurent sous la stricte responsabilité légale et opérationnelle du client.'
    },
    {
      stem: 'Quelle technique permet à un fournisseur Cloud de faire cohabiter plusieurs clients sur les mêmes serveurs physiques tout en garantissant leur étanchéité ?',
      opts: [
        'L’isolation multi-tenant via virtualisation et réseaux logiques cloisonnés',
        'L’attribution d’adresses IP publiques partagées sans filtrage',
        'L’extinction séquentielle des machines virtuelles',
        'Le chiffrement des disques durs sans gestion de clés'
      ],
      correct: 0,
      exp: 'Le modèle multi-tenant repose sur une isolation logique stricte au niveau de l’hyperviseur, des espaces mémoire et des réseaux virtuels (VPC/VLAN) empêchant toute fuite inter-clients.'
    },
    {
      stem: 'Quelle architecture combine un datacenter privé d’entreprise et un cloud public pour absorber des pics de charge saisonniers ?',
      opts: [
        'Un Cloud Privé On-Premise pur',
        'Un Cloud Hybride avec débordement de charge (Cloud Bursting)',
        'Un Cloud Communautaire isolé',
        'Un hébergement mutualisé classique'
      ],
      correct: 1,
      exp: 'Le Cloud hybride articule ressources privées permanentes et extension élastique vers le Cloud public lors de fortes pointes de trafic (Cloud Bursting).'
    }
  ],
  flashcards: [
      { q: 'Qu’est-ce que « Définition canonique NIST SP 800-145 » ?', a: 'Définition canonique NIST SP 800-145' },
      { q: 'Qu’est-ce que « Libre-service à la demande (On-Demand Self-Service) » ?', a: 'Libre-service à la demande (On-Demand Self-Service)' },
      { q: 'Qu’est-ce que « Élasticité dynamique (Rapid Elasticity) » ?', a: 'Élasticité dynamique (Rapid Elasticity)' },
      { q: 'Qu’est-ce que « Infrastructure as a Service (IaaS) » ?', a: 'Infrastructure as a Service (IaaS)' },
      { q: 'Qu’est-ce que « Platform as a Service (PaaS) » ?', a: 'Platform as a Service (PaaS)' },
      { q: 'Qu’est-ce que « Software as a Service (SaaS) » ?', a: 'Software as a Service (SaaS)' },
      { q: 'Qu’est-ce que « Équivalences de services AWS, Azure et GCP » ?', a: 'Équivalences de services AWS, Azure et GCP' },
      { q: 'Qu’est-ce que « Point de Présence Edge et réseaux CDN » ?', a: 'Point de Présence Edge et réseaux CDN' },
      { q: 'Qu’est-ce que « Calcul de SLA composé en série (dépendance) » ?', a: 'Calcul de SLA composé en série (dépendance)' },
      { q: 'Qu’est-ce que « Calcul de SLA composé en parallèle (redondance) » ?', a: 'Calcul de SLA composé en parallèle (redondance)' },
      { q: 'Qu’est-ce que « Budget d’erreur et indisponibilité annuelle » ?', a: 'Budget d’erreur et indisponibilité annuelle' },
      { q: 'Qu’est-ce que « Objectif de temps de reprise (RTO) » ?', a: 'Objectif de temps de reprise (RTO)' },
      { q: 'Qu’est-ce que « Objectif de point de reprise (RPO) » ?', a: 'Objectif de point de reprise (RPO)' },
      { q: 'Qu’est-ce que « Hyperviseur Type 2 Hosted » ?', a: 'Hyperviseur Type 2 Hosted' },
      { q: 'Qu’est-ce que « Virtualisation assistée par le processeur (HVM) » ?', a: 'Virtualisation assistée par le processeur (HVM)' },
      { q: 'Qu’est-ce que « Paravirtualisation (PV) et Hypercalls » ?', a: 'Paravirtualisation (PV) et Hypercalls' },
      { q: 'Qu’est-ce que « Sur-allocation CPU (vCPU to pCPU Overcommitment) » ?', a: 'Sur-allocation CPU (vCPU to pCPU Overcommitment)' },
      { q: 'Qu’est-ce que « Sur-allocation mémoire et Memory Ballooning » ?', a: 'Sur-allocation mémoire et Memory Ballooning' },
      { q: 'Qu’est-ce que « Contention et phénomène du « Noisy Neighbor » » ?', a: 'Contention et phénomène du « Noisy Neighbor »' },
      { q: 'Qu’est-ce que « Dimensionnement transactionnel et facteur limitant » ?', a: 'Dimensionnement transactionnel et facteur limitant' },
      { q: 'Qu’est-ce que « Power Usage Effectiveness (PUE) » ?', a: 'Quelle formule définit rigoureusement le Power Usage Effectiveness (PUE) d’un centre de données ?' },
      { q: 'Qu’est-ce que « Data Center Infrastructure Efficiency (DCiE) » ?', a: 'Data Center Infrastructure Efficiency (DCiE)' },
      { q: 'Qu’est-ce que « Confinement d’allée chaude et allée froide » ?', a: 'Confinement d’allée chaude et allée froide' },
      { q: 'Qu’est-ce que « Refroidissement naturel (Free-Cooling) » ?', a: 'Refroidissement naturel (Free-Cooling) : Utilisation de l’air extérieur frais ou de l’eau de mer/rivière pour refroidir le datacenter sans enclencher de compresseurs frigorifiques énergivores pendant la majeure partie de l’année (très utilisé dans les pays nordiques).' },
      { q: 'Qu’est-ce que « Émissions Scope 1, Scope 2 et Scope 3 (GHG Protocol) » ?', a: 'Émissions Scope 1, Scope 2 et Scope 3 (GHG Protocol)' },
      { q: 'Qu’est-ce que « Intensité carbone du mix électrique (gCO2e/kWh) » ?', a: 'Intensité carbone du mix électrique (gCO2e/kWh)' },
      { q: 'Qu’est-ce que « Serveurs fantômes (Zombie Servers) » ?', a: 'Serveurs fantômes (Zombie Servers)' },
      { q: 'Qu’est-ce que « Modèle de responsabilité partagée (Shared Responsibility) » ?', a: 'Modèle de responsabilité partagée (Shared Responsibility)' },
      { q: 'Qu’est-ce que « Chiffrement au repos SSE-KMS et Customer Managed Keys (CMK) » ?', a: 'Chiffrement au repos SSE-KMS et Customer Managed Keys (CMK)' },
      { q: 'Qu’est-ce que « Règlement Général sur la Protection des Données (RGPD) » ?', a: 'Règlement Général sur la Protection des Données (RGPD)' },
      { q: 'Qu’est-ce que « CLOUD Act américain et extraterritorialité » ?', a: 'CLOUD Act américain et extraterritorialité' },
      { q: 'Qu’est-ce que « Référentiel de qualification SecNumCloud (ANSSI) » ?', a: 'Référentiel de qualification SecNumCloud (ANSSI)' },
      { q: 'Qu’est-ce que « Principe du moindre privilège et contrôle d’accès RBAC » ?', a: 'Principe du moindre privilège et contrôle d’accès RBAC' },
      { q: 'Qu’est-ce que « Total Cost of Ownership (TCO sur 3 ans) » ?', a: 'Total Cost of Ownership (TCO sur 3 ans)' },
      { q: 'Qu’est-ce que « Transformation de CAPEX en OPEX » ?', a: 'Transformation de CAPEX en OPEX' },
      { q: 'Qu’est-ce que « Discipline FinOps (Inform, Optimize, Operate) » ?', a: 'Discipline FinOps (Inform, Optimize, Operate)' },
      { q: 'Qu’est-ce que « Instances À la Demande (On-Demand) » ?', a: 'Instances À la Demande (On-Demand) : Facturation à la seconde sans aucun engagement de durée. Idéal pour les charges de travail courtes, les tests ponctuels et les pics de trafic imprévisibles, mais plein tarif catalogue.' },
      { q: 'Qu’est-ce que « Instances Réservées (RI) et Savings Plans » ?', a: 'Instances Réservées (RI) et Savings Plans' },
      { q: 'Qu’est-ce que « Instances Spot et gestion des interruptions » ?', a: 'Instances Spot et gestion des interruptions' },
      { q: 'Qu’est-ce que « Balisage des coûts (Tagging et Chargeback) » ?', a: 'Balisage des coûts (Tagging et Chargeback)' },
    {
      q: 'Quelles sont les 5 caractéristiques essentielles du Cloud selon le NIST SP 800-145 ?',
      a: '1. On-Demand Self-Service, 2. Broad Network Access, 3. Resource Pooling, 4. Rapid Elasticity, 5. Measured Service.'
    },
    {
      q: 'Quelle est la différence fondamentale entre IaaS et PaaS ?',
      a: 'En IaaS, le client installe, configure et patche le système d’exploitation (OS). En PaaS, l’OS et le runtime applicatif sont gérés par le fournisseur Cloud.'
    },
    {
      q: 'Qui est responsable des sauvegardes de données dans une solution SaaS ?',
      a: 'Le client reste le propriétaire et le responsable ultime de la politique de gouvernance et de rétention de ses données, même si le fournisseur assure la redondance d’infrastructure.'
    },
    {
      q: 'Qu’est-ce que le « Cloud Bursting » dans un modèle hybride ?',
      a: 'Technique où une application hébergée sur un cloud privé déborde automatiquement sur un cloud public pour absorber un pic temporaire de trafic.'
    },
    {
      q: 'Pourquoi la mutualisation des ressources (Resource Pooling) est-elle avantageuse économiquement ?',
      a: 'Elle permet au fournisseur de réaliser d’immenses économies d’échelle en lissant les pics de consommation de milliers de clients sur une infrastructure partagée.'
    },
    {
      q: 'Qu’est-ce que le modèle multi-tenant ?',
      a: 'Architecture logicielle ou d’infrastructure où une instance unique d’une ressource physique sert plusieurs clients (locataires) distincts en garantissant leur isolation logique absolue.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Moins de 4/8 : Révisez la définition officielle NIST SP 800-145 et la matrice de responsabilité IaaS/PaaS/SaaS.'
    },
    {
      cls: 'medium',
      text: 'Entre 5/8 et 7/8 : Bonnes connaissances générales, revoyez les subtilités du multi-tenant et des modèles hybrides.'
    },
    {
      cls: 'high',
      text: '8/8 : Excellent ! Vous maîtrisez parfaitement les fondements conceptuels et architecturaux du Cloud Computing.'
    }
  ]
};
