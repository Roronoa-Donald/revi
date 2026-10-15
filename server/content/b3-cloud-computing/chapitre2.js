/**
 * Chapitre 2 du cours « Cloud Computing B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 2,
  title: 'Plateformes Cloud, Hyperscalers &amp; Architectures Haute Disponibilité',
  short: 'Plateformes &amp; Haute Disponibilité',
  toc: 'Cartographie comparative des hyperscalers (AWS, Azure, GCP), régions et zones de disponibilité (AZ), calculs de SLA composés en série et parallèle, résilience multi-cloud.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B3 et plus',
  situation: 'Le marché mondial du Cloud est dominé par trois géants hyperscalers : Amazon Web Services (AWS), Microsoft Azure et Google Cloud Platform (GCP). Bien que partageant des principes d’ingénierie similaires, chacun emploie une nomenclature propre et déploie des topologies d’infrastructure spécifiques articulées autour de Régions géographiques et de Zones de Disponibilité (AZ). Pour bâtir des systèmes résilients tolérants aux désastres majeurs, l’ingénieur Cloud doit savoir cartographier les services équivalents, dimensionner des architectures redondées, et calculer avec une rigueur mathématique le taux de disponibilité garanti par contrat (SLA composé) et son budget d’erreur annuel en minutes.',
  objectives: [
    'maîtriser la taxonomie comparative des services majeurs entre AWS, Azure et Google Cloud Platform ;',
    'comprendre l’architecture topologique physique globale : Régions, Zones de Disponibilité (AZ) et Edge Locations ;',
    'calculer analytiquement le SLA composé pour des composants montés en série (dépendance) et en parallèle (redondance) ;',
    'convertir un pourcentage de disponibilité contractuel en budget d’indisponibilité annuel maximal toléré (downtime) ;',
    'concevoir une stratégie de bascule automatique multi-régions (Active-Passive vs Active-Active) ;',
    'évaluer les compromis technico-économiques des architectures multi-cloud face au risque de vendor lock-in.'
  ],
  sections: [
    {
      title: 'Cartographie Comparative des Hyperscalers : AWS, Azure et GCP',
      html: [
        '<p>Chaque fournisseur propose des dizaines de services managés. La maîtrise du Cloud requiert une vision synoptique des équivalences fonctionnelles directes :</p>',
        '<div class="grid grid-3">',
        '  <div class="card">',
        '    <h4>Amazon Web Services (AWS)</h4>',
        '    <p>Pionnier historique (2006) et leader du marché.<br>',
        '    <strong>Compute :</strong> EC2, Lambda, ECS, EKS<br>',
        '    <strong>Stockage :</strong> S3, EBS, EFS<br>',
        '    <strong>Bases de données :</strong> RDS, DynamoDB, Aurora<br>',
        '    <strong>Réseau :</strong> VPC, Route 53, Direct Connect</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Microsoft Azure</h4>',
        '    <p>Leader du monde entreprise et des environnements hybrides.<br>',
        '    <strong>Compute :</strong> Virtual Machines, Azure Functions, AKS<br>',
        '    <strong>Stockage :</strong> Blob Storage, Azure Files, Managed Disks<br>',
        '    <strong>Bases de données :</strong> Azure SQL, Cosmos DB<br>',
        '    <strong>Réseau :</strong> Virtual Network (VNet), Azure DNS, ExpressRoute</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Google Cloud Platform (GCP)</h4>',
        '    <p>Spécialiste de la data, de l’intelligence artificielle et des conteneurs.<br>',
        '    <strong>Compute :</strong> Compute Engine, Cloud Functions, GKE<br>',
        '    <strong>Stockage :</strong> Cloud Storage, Persistent Disk<br>',
        '    <strong>Bases de données :</strong> Cloud SQL, Cloud Spanner, Bigtable<br>',
        '    <strong>Réseau :</strong> VPC Global, Cloud DNS, Cloud Interconnect</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Topologie Mondiale : Régions, Zones de Disponibilité et Réseau Edge',
      html: [
        '<p>Les hyperscalers déploient leur infrastructure physique selon une hiérarchie géographique stricte :</p>',
        '<ul>',
        '  <li><strong>Région Cloud :</strong> Zone géographique distincte (ex: <code>eu-west-3</code> Paris, <code>eu-west-1</code> Irlande) regroupant plusieurs centres de données isolés. Chaque région est totalement autonome pour garantir la souveraineté territoriale des données.</li>',
        '  <li><strong>Zone de Disponibilité (AZ - Availability Zone) :</strong> Un ou plusieurs centres de données distincts au sein d’une même région, distants de quelques kilomètres (moins de 100 km), disposant d’alimentations électriques, de climatisation et de raccordements réseau indépendants, interconnectés par des fibres optiques dédiées à très faible latence (&lt; 2 ms).</li>',
        '  <li><strong>Points de Présence Edge (PoP / Edge Locations) :</strong> Serveurs relais répartis dans les grandes métropoles mondiales pour mettre en cache les contenus statiques (CDN : CloudFront, Azure CDN, Cloud CDN) et protéger des attaques DDoS (AWS Shield, Cloud Armor).</li>',
        '</ul>'
      ].join('\n')
    },
    {
      title: 'Calcul Mathématique de SLA Composé et Budget d’Erreur',
      html: [
        '<p>Un contrat de niveau de service (Service Level Agreement - SLA) garantit contractuellement un pourcentage minimal de disponibilité. Lorsqu’une application chaîne plusieurs services, son SLA effectif se calcule par modélisation probabiliste :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Composants en Série (Dépendance stricte)</h4>',
        '    <p>Si le service A et le service B doivent tous deux fonctionner simultanément pour que l’application réponde, la disponibilité globale est le produit des disponibilités :<br>',
        '    $$SLA_{total} = SLA_1 \\times SLA_2 \\times \\dots \\times SLA_n$$<br>',
        '    <em>Propriété clé :</em> Le SLA résultant est <strong>toujours inférieur</strong> au plus faible composant.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Composants en Parallèle (Redondance active)</h4>',
        '    <p>Si deux serveurs identiques sont placés derrière un équilibreur de charge, le système ne tombe en panne que si les deux tombent en même temps :<br>',
        '    $$SLA_{total} = 1 - \\prod_{i=1}^n (1 - SLA_i)$$<br>',
        '    <em>Propriété clé :</em> Deux VM à 99.9% en parallèle atteignent 99.9999% de disponibilité.</p>',
        '  </div>',
        '</div>',
        '<div class="box box--standard" style="margin-top:16px">',
        '  <div class="box__title"><svg class="ic" aria-hidden=\"true\" focusable=\"false\"><use href=\"/assets/img/ui-icons.svg#i-info\"></use></svg> Calcul de l’Indisponibilité Annuelle (Downtime)</div>',
        '  <p>Sur une année civile de 365 jours ($365 \\times 24 \\times 60 = 525\\,600$ minutes) :<br>',
        '  $$Downtime_{minutes} = 525\\,600 \\times (1 - SLA_{total})$$<br>',
        '  - Pour 99.9% (trois neufs) : 8 heures 45 minutes par an.<br>',
        '  - Pour 99.99% (quatre neufs) : 52 minutes 34 secondes par an.<br>',
        '  - Pour 99.999% (cinq neufs) : seulement 5 minutes 15 secondes par an.</p>',
        '</div>'
      ].join('\n')
    }
  ],
  methodTitle: 'Protocole de Conception d’une Architecture Haute Disponibilité',
  method: [
    'Établir les exigences de service métier : RTO (Recovery Time Objective) et RPO (Recovery Point Objective).',
    'Décomposer la chaîne applicative en composants élémentaires (DNS, équilibreur, frontaux, API, bases, stockage).',
    'Identifier les points uniques de défaillance (Single Points of Failure - SPOF) et doubler les composants critiques.',
    'Répartir les instances applicatives sur un minimum de deux ou trois Zones de Disponibilité (multi-AZ).',
    'Calculer le SLA composé théorique et vérifier sa conformité avec les engagements clients.',
    'Simuler des pannes de zone entière via des tests d’ingénierie du chaos (Chaos Engineering) pour valider le basculement automatique.'
  ],
  summary: [
    'AWS, Azure et GCP offrent des services fonctionnellement équivalents sur le calcul, le stockage, les bases relationnelles et le serverless.',
    'Une Région est un territoire géographique contenant au moins trois Zones de Disponibilité (AZ) électriquement et physiquement isolées.',
    'En série, les SLA se multiplient, réduisant la disponibilité globale de l’ensemble.',
    'En parallèle, la redondance élimine la panne unique et élève la disponibilité vers les « quatre ou cinq neufs ».',
    'Un SLA de 99.99% n’autorise qu’un maximum de 52 minutes d’interruption sur l’ensemble de l’année.'
  ],
  checklist: [
    'Je connais les équivalences de nommage entre EC2/VM/Compute Engine et S3/Blob/Cloud Storage.',
    'Je sais expliquer la différence physique entre deux régions et deux AZ d’une même région.',
    'Je sais calculer à la main le SLA d’une chaîne web en série et en parallèle.',
    'Je sais convertir un SLA en minutes d’interruption annuelle autorisée.',
    'Je sais définir RTO (temps de reprise) et RPO (perte de données tolérée).',
    'Je comprends les enjeux du multi-cloud face au verrouillage propriétaire (vendor lock-in).'
  ],
  notions: [
    'Région Cloud et Zone de Disponibilité (AZ)',
    'Équivalences de services AWS, Azure et GCP',
    'Point de Présence Edge et réseaux CDN',
    'Calcul de SLA composé en série (dépendance)',
    'Calcul de SLA composé en parallèle (redondance)',
    'Budget d’erreur et indisponibilité annuelle',
    'Objectif de temps de reprise (RTO)',
    'Objectif de point de reprise (RPO)'
  ],
  pitfalls: [
    'Déployer toutes ses machines virtuelles dans une seule et unique AZ en pensant que le Cloud public garantit magiquement la résilience.',
    'Additionner les pourcentages de SLA au lieu de les multiplier dans une chaîne en série.',
    'Confondre réplication asynchrone (risque de perte de données RPO > 0) et réplication synchrone multi-AZ.',
    'Oublier le SLA de l’équilibreur de charge ou de la base de données dans le calcul du SLA de l’application.'
  ],
  questions: [
    {
      stem: 'Quel service de stockage objet chez Microsoft Azure correspond fonctionnellement à Amazon S3 sur AWS et à Cloud Storage sur GCP ?',
      opts: [
        'Azure Managed Disks',
        'Azure Blob Storage',
        'Azure Files',
        'Azure Table Storage'
      ],
      correct: 1,
      exp: 'Azure Blob Storage est la solution de stockage d’objets non structurés chez Microsoft, directement équivalente à AWS S3 et GCP Cloud Storage.'
    },
    {
      stem: 'Physiquement, que représente une Zone de Disponibilité (AZ - Availability Zone) au sein d’une Région Cloud ?',
      opts: [
        'Un simple rack de serveurs au sein d’une même salle',
        'Un ou plusieurs datacenters physiquement séparés, dotés d’alimentations électriques et de réseaux indépendants',
        'Une partition logique de réseau virtuel sans séparation physique',
        'Un serveur mandataire inverse de mise en cache'
      ],
      correct: 1,
      exp: 'Une AZ est composée d’un ou plusieurs datacenters physiquement isolés (alimentation, refroidissement, connectivité séparés) pour qu’un incident dans une zone n’affecte pas les autres.'
    },
    {
      stem: 'Si une application dépend successivement d’une passerelle API (SLA 99.9%) et d’une base de données (SLA 99.9%) en série, quel est le SLA composé global ?',
      opts: [
        '99.9%',
        '99.8001%',
        '99.99%',
        '99.95%'
      ],
      correct: 1,
      exp: 'En série, on multiplie les probabilités : 0.999 * 0.999 = 0.998001, soit un SLA composé de 99.8001% (inférieur au composant unitaire).'
    },
    {
      stem: 'Pour deux instances de calcul montées en parallèle derrière un équilibreur actif/passif avec un SLA de 99.9% chacune, quelle est la disponibilité théorique de ce cluster ?',
      opts: [
        '99.8001%',
        '99.9%',
        '99.9999%',
        '100.0%'
      ],
      correct: 2,
      exp: 'En parallèle, la formule est 1 - (1 - 0.999)^2 = 1 - (0.001)^2 = 1 - 0.000001 = 0.999999, soit 99.9999% de disponibilité.'
    },
    {
      stem: 'Quel est le temps maximal d’interruption annuel toléré (downtime) pour une application affichant un SLA contractuel de 99.99% (quatre neufs) ?',
      opts: [
        'Environ 8 heures 45 minutes',
        'Environ 52 minutes et 34 secondes',
        'Environ 5 minutes et 15 secondes',
        'Moins de 30 secondes'
      ],
      correct: 1,
      exp: '525 600 minutes * (1 - 0.9999) = 525 600 * 0.0001 = 52.56 minutes par an, soit 52 min et environ 34 s.'
    },
    {
      stem: 'Que désigne l’indicateur RTO (Recovery Time Objective) dans un plan de continuité d’activité Cloud (PCA) ?',
      opts: [
        'La quantité maximale de données que l’organisation accepte de perdre lors d’un crash',
        'La durée maximale admissible pour remettre en service l’application après un sinistre',
        'Le temps moyen écoulé entre deux pannes matérielles consécutives',
        'La latence réseau aller-retour entre deux régions'
      ],
      correct: 1,
      exp: 'Le RTO est la durée maximale admissible pour restaurer un système et ses applications après une panne majeure.'
    },
    {
      stem: 'Quel rôle jouent les Edge Locations (Points de Présence) dans les architectures Cloud modernes ?',
      opts: [
        'Héberger les bases de données transactionnelles principales',
        'Fournir des caches réseau de proximité (CDN) pour accélérer la diffusion de contenu et absorber les attaques DDoS',
        'Remplacer les régions pour le stockage de données de longue durée',
        'Compiler le code applicatif en continu'
      ],
      correct: 1,
      exp: 'Les Edge Locations rapprochent le contenu des utilisateurs finaux grâce au cache CDN et filtrent le trafic malveillant au plus près de la source.'
    },
    {
      stem: 'Dans une stratégie multi-cloud, quel est le principal avantage recherché par les grandes entreprises ?',
      opts: [
        'Réduire les coûts de développement à zéro',
        'Éviter le verrouillage auprès d’un unique fournisseur (vendor lock-in) et optimiser la résilience',
        'Supprimer la nécessité d’utiliser des adresses IP',
        'Éliminer toute responsabilité en matière de sécurité'
      ],
      correct: 1,
      exp: 'Le multi-cloud permet de mitiger les risques de dépendance technologique et commerciale exclusive vis-à-vis d’un seul géant du secteur.'
    }
  ],
  flashcards: [
    {
      q: 'Quel est l’équivalent d’AWS Lambda chez Microsoft Azure et Google Cloud ?',
      a: 'Azure Functions chez Microsoft Azure, et Cloud Functions chez Google Cloud Platform.'
    },
    {
      q: 'Comment calcule-t-on le SLA composé de composants dépendant les uns des autres en série ?',
      a: 'En multipliant leurs disponibilités individuelles : SLA_total = SLA_1 * SLA_2 * ... * SLA_n.'
    },
    {
      q: 'Combien de temps d’indisponibilité par an représente un SLA à « trois neufs » (99.9%) ?',
      a: 'Environ 8 heures et 45 minutes d’interruption sur 365 jours.'
    },
    {
      q: 'Quelle est la différence fondamentale entre RTO et RPO ?',
      a: 'Le RTO mesure le temps nécessaire pour redémarrer le service, tandis que le RPO mesure l’ancienneté maximale des données perdues.'
    },
    {
      q: 'Pourquoi une Région Cloud comporte-t-elle au minimum trois Zones de Disponibilité (AZ) ?',
      a: 'Pour assurer le maintien d’un quorum en cas de perte accidentelle d’une AZ et permettre les maintenances sans dégradation du service.'
    },
    {
      q: 'Quel est le risque majeur des architectures multi-cloud ?',
      a: 'Une complexité opérationnelle accrue, des coûts élevés de transfert de données sortantes (data egress) et la nécessité de compétences multiples.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Moins de 4/8 : Révisez la topologie des régions/AZ et les formules mathématiques de SLA série/parallèle.'
    },
    {
      cls: 'medium',
      text: 'Entre 5/8 et 7/8 : Bon niveau, consolidez la conversion du SLA en budget d’erreur annuel et les équivalences d’hyperscalers.'
    },
    {
      cls: 'high',
      text: '8/8 : Parfait ! Vous maîtrisez les architectures haute disponibilité et la résilience multi-cloud.'
    }
  ]
};
