/**
 * Chapitre 1 du cours « Cloud Microsoft Azure B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 1,
  title: 'Architecture Globale, Régions, Souscriptions &amp; Hiérarchie ARM',
  short: 'Architecture, Régions &amp; ARM',
  toc: 'Structure mondiale des datacenters Azure, Régions et Zones de Disponibilité (AZs 1, 2, 3), Paires Régionales, hiérarchie de gestion organisationnelle (Root Management Group, Abonnements, Resource Groups), conventions de nommage du Cloud Adoption Framework (CAF) et optimisation financière TCO / FinOps.',
  time: '≈ 2 h 45 de travail',
  free: true,
  situation: 'Dans une entreprise internationale migrant son système d\'information vers Microsoft Azure, le déploiement anarchique de machines virtuelles et de comptes de stockage sans structure hiérarchique entraîne rapidement des failles de conformité, des pannes régionales non couvertes par les SLAs et des dépassements budgétaires massifs. En tant qu\'architecte Cloud Azure B3, vous devez concevoir la hiérarchie organisationnelle ARM conforme aux bonnes pratiques du Cloud Adoption Framework, choisir rigoureusement les régions et zones de disponibilité en fonction des SLAs cibles (99.9% à 99.99%) et dimensionner les engagements financiers (Pay-As-You-Go vs Instances Réservées).',
  objectives: [
    'maîtriser l\'organisation physique et logique mondiale d\'Azure : Régions, Zones de Disponibilité (AZ) et Paires Régionales ;',
    'concevoir une hiérarchie de gouvernance Azure Resource Manager (ARM) robuste : Root Management Group, Management Groups, Subscriptions et Resource Groups ;',
    'appliquer les règles de normalisation de nommage et d\'étiquetage (Tags) définies par le Cloud Adoption Framework (CAF) de Microsoft ;',
    'calculer la disponibilité théorique des architectures et choisir la stratégie de réplication des données (LRS vs ZRS vs GRS) ;',
    'évaluer les coûts IaaS/PaaS (TCO / FinOps) et optimiser les dépenses via les Instances Réservées (RI sur 1 an ou 3 ans) ;',
    'implémenter en Python 3 des validateurs de hiérarchie CAF, des sélecteurs de résilience régionale et des estimateurs de budget.'
  ],
  sections: [
    {
      title: 'Organisation Mondiale d\'Azure : Datacenters, Régions, Zones de Disponibilité et Paires',
      html: [
        '<p>L\'infrastructure globale de Microsoft Azure repose sur plus de 60 régions réparties dans le monde entier, interconnectées par un réseau privé dédié en fibre optique à très haut débit et ultra-faible latence (Microsoft Dark Fiber Network) :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Régions et Zones de Disponibilité (AZs)</h4>',
        '    <ul>',
        '      <li><strong>Région Azure :</strong> zone géographique délimitée abritant un ou plusieurs datacenters reliés par un réseau régional à faible latence (ex. <code>France Central</code> à Paris, <code>West Europe</code> à Amsterdam, <code>North Europe</code> à Dublin).</li>',
        '      <li><strong>Zones de Disponibilité (AZ 1, 2, 3) :</strong> datacenters physiquement et géographiquement séparés au sein d\'une même région, disposant chacun de leurs propres sources d\'alimentation électrique, de leur propre refroidissement et de leur propre connectivité réseau indépendante.</li>',
        '      <li><strong>SLA 99.99% :</strong> le déploiement de machines virtuelles réparties sur au moins deux zones de disponibilité d\'une même région garantit un SLA contractuel de 99.99% (moins de 53 minutes d\'interruption tolérée par an).</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Paires Régionales &amp; Résilience Catastrophe (DR)</h4>',
        '    <ul>',
        '      <li><strong>Paires Régionales (Regional Pairs) :</strong> chaque région Azure est couplée à une autre région de la même zone géographique, distante d\'au moins 480 km (ex. <code>West Europe</code> &lt;-&gt; <code>North Europe</code>, <code>France Central</code> &lt;-&gt; <code>France South</code>).</li>',
        '      <li><strong>Mises à jour ordonnées :</strong> lors des opérations de maintenance de la plateforme Azure, Microsoft ne met jamais à jour les deux régions d\'une même paire simultanément, garantissant la continuité opérationnelle.</li>',
        '      <li><strong>Priorité de reprise :</strong> en cas de panne continentale généralisée, Azure priorise la restauration d\'au moins une région par paire régionale pour permettre aux entreprises de redémarrer leurs PRA.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Hiérarchie de Gestion Organisationnelle ARM (Azure Resource Manager)',
      html: [
        '<p>Azure Resource Manager (ARM) est la couche centrale de déploiement, de gestion et de contrôle de la plateforme Azure. Elle structure toutes les entités de l\'entreprise selon une hiérarchie stricte à 4 niveaux :</p>',
        '<table class="table">',
        '  <thead><tr><th>Niveau Hiérarchique</th><th>Rôle et Fonctions Clés</th><th>Héritage des Droits &amp; Politiques</th></tr></thead>',
        '  <tbody>',
        '    <tr><td><strong>1. Root Management Group</strong></td><td>Racine globale du tenant Entra ID. Tout abonnement existant ou nouvellement créé y est rattaché.</td><td>Toute politique Azure Policy ou attribution RBAC définie ici s\'applique à 100% des ressources de l\'entreprise.</td></tr>',
        '    <tr><td><strong>2. Management Groups (MG)</strong></td><td>Conteneurs intermédiaires organisés en arborescence (jusqu\'à 6 niveaux de profondeur) par environnement (Prod, Hors-Prod) ou unité opérationnelle (Finance, R&amp;D).</td><td>Permettent d\'appliquer des règles de conformité globale à plusieurs abonnements en une seule affectation.</td></tr>',
        '    <tr><td><strong>3. Subscriptions (Abonnements)</strong></td><td>Unité fondamentale de facturation, d\'isolation de sécurité et de limites de quotas (nombre de vCPUs max, adresses IP publiques).</td><td>Chaque ressource appartient obligatoirement à un et un seul abonnement.</td></tr>',
        '    <tr><td><strong>4. Resource Groups (RG)</strong></td><td>Conteneur logique regroupant des ressources partageant le même cycle de vie applicatif (VM, disque, interface réseau, IP).</td><td>Une ressource ne peut appartenir qu\'à un seul RG à un instant T mais peut être déplacée entre groupes.</td></tr>',
        '  </tbody>',
        '</table>'
      ].join('\n')
    },
    {
      title: 'Le Cloud Adoption Framework (CAF) : Conventions de Nommage, Tags &amp; FinOps',
      html: [
        '<p>Pour éviter le chaos opérationnel, le Cloud Adoption Framework (CAF) de Microsoft standardise la nomenclature des ressources et les leviers d\'optimisation budgétaire (FinOps) :</p>',
        box('standard', 'Gabarit de Nommage Normalisé CAF pour les Ressources Azure', [
          '<p>La syntaxe universelle recommandée par Microsoft adopte le format suivant :<br>',
          '<code>&lt;type_ressource&gt;-&lt;application/workload&gt;-&lt;environnement&gt;-&lt;region&gt;-&lt;instance&gt;</code></p>',
          '<ul>',
          '  <li><code>rg-erp-prod-we-01</code> : Groupe de ressources hébergeant l\'ERP de production sur West Europe, instance 01.</li>',
          '  <li><code>vm-web-dev-fc-02</code> : Machine virtuelle du front-end web en environnement de développement sur France Central, instance 02.</li>',
          '  <li><code>stbillstageuse01</code> : Compte de stockage (qui n\'accepte ni tirets ni majuscules, de 3 à 24 caractères alphanumériques).</li>',
          '</ul>'
        ]),
        box('standard', 'Optimisation FinOps : Pay-As-You-Go vs Instances Réservées (RI)', [
          '<p>Le modèle Pay-As-You-Go (à l\'usage sans engagement) offre une flexibilité totale mais présente le coût horaire le plus élevé. ' +
          'Pour les charges de travail stables (bases de données, serveurs applicatifs actifs 24/7), Azure propose les <strong>Reserved Instances (RI)</strong> :</p>',
          '<ul>',
          '  <li><strong>Engagement sur 1 an :</strong> environ 30% à 40% d\'économie sur la part calcul (Compute) de la machine virtuelle.</li>',
          '  <li><strong>Engagement sur 3 ans :</strong> jusqu\'à 60% à 72% d\'économie sur le calcul par rapport au tarif PAYG.</li>',
          '  <li><strong>Azure Hybrid Benefit (AHB) :</strong> permet de réutiliser des licences Windows Server ou SQL Server existantes dotées de la Software Assurance pour cumuler jusqu\'à 85% d\'économies totales.</li>',
          '</ul>'
        ])
      ].join('\n')
    }
  ],
  method: [
    'Cartographie de l\'organisation et création de la hiérarchie ARM : structurer le Root Management Group, créer les groupes intermédiaires (mg-core, mg-prod, mg-nonprod) et rattacher les abonnements dédiés pour séparer facturation et sécurité.',
    'Sélection de la région et validation des zones de disponibilité : vérifier la présence d\'au moins 3 Availability Zones dans la région cible (ex. francecentral ou westeurope) et identifier la région jumelée pour le plan de reprise d\'activité (PRA).',
    'Application stricte de la nomenclature CAF et politique de tags : imposer par Azure Policy la convention de nommage rg-<app>-<env>-<region>-<num> et le marquage obligatoire des tags Environment, CostCenter et Owner.',
    'Calcul de disponibilité SLA et arbitrage financier FinOps : calculer le SLA combiné de l\'architecture et identifier les serveurs éligibles aux réservations 1 an ou 3 ans pour maximiser le retour sur investissement.'
  ],
  summary: [
    'Une Région Azure est un ensemble de datacenters reliés par un réseau dédié ; une Zone de Disponibilité (AZ) est un datacenter isolé au sein de la région offrant un SLA de 99.99%.',
    'La Paire Régionale regroupe deux régions d\'une même zone géographique distantes d\'au moins 480 km pour garantir la reprise après sinistre (Disaster Recovery).',
    'La hiérarchie ARM comprend 4 niveaux : Root Management Group, Management Groups, Subscriptions (facturation/quotas) et Resource Groups (cycle de vie).',
    'Le Cloud Adoption Framework (CAF) normalise le nommage (type-app-env-region-num) et le balisage des ressources pour auditer et imputer les coûts.',
    'Les Instances Réservées (RI) Azure permettent de réduire les coûts de calcul de 35% (1 an) à 60% (3 ans) par rapport au modèle Pay-As-You-Go.'
  ],
  checklist: [
    'Savez-vous expliquer la différence entre LRS, ZRS et GRS en lien avec les zones et paires régionales ?',
    'Pouvez-vous citer les 4 niveaux hiérarchiques d\'Azure ARM et la portée d\'héritage des politiques ?',
    'Savez-vous décoder et composer un nom de ressource conforme au Cloud Adoption Framework (CAF) ?',
    'Connaissez-vous le SLA garanti pour des VMs réparties sur 2 Availability Zones (99.99%) ?',
    'Savez-vous calculer l\'économie apportée par une réservation 1 an ou 3 ans sur une flotte de calcul ?'
  ],
  notions: [
    { term: 'Availability Zone (AZ)', def: 'Datacenter physiquement indépendant au sein d\'une région Azure, doté de sa propre alimentation, refroidissement et réseau, permettant un SLA de 99.99%.' },
    { term: 'Paired Region', def: 'Région jumelée située à au moins 480 km dans la même géographie, recevant les réplications GRS et bénéficiant de mises à jour Azure séquentielles.' },
    { term: 'Management Group', def: 'Conteneur organisationnel ARM permettant d\'appliquer des politiques et des attributions RBAC à un ensemble d\'abonnements simultanément.' },
    { term: 'Cloud Adoption Framework (CAF)', def: 'Ensemble de bonnes pratiques et de normes publiées par Microsoft pour cadrer l\'architecture, le nommage et la gouvernance Cloud.' },
    { term: 'Reserved Instances (RI)', def: 'Engagement financier sur 1 an ou 3 ans réservant des capacités de calcul Azure en échange d\'une réduction tarifaire substantielle (35% à 60%).' }
  ],
  pitfalls: [
    'Confondre région et zone de disponibilité : une région contient plusieurs zones (AZs 1, 2, 3), mais toutes les régions Azure ne possèdent pas nécessairement de zones de disponibilité.',
    'Penser qu\'un Resource Group peut être imbriqué dans un autre Resource Group : la hiérarchie ARM interdit l\'imbrication de groupes de ressources.',
    'Supposer qu\'un Resource Group restreint l\'emplacement des ressources : une ressource peut être déployée dans une région différente de celle de son Resource Group (bien que cela soit déconseillé en gouvernance).',
    'Oublier que les remises Reserved Instances (RI) s\'appliquent uniquement au composant calcul (Compute de la VM), et jamais au stockage des disques managés ni à l\'egress réseau.'
  ],
  questions: [
    {
      stem: 'Quel SLA de disponibilité est garanti par Microsoft pour une architecture de machines virtuelles réparties sur au moins deux Zones de Disponibilité (Availability Zones) d\'une région ?',
      opts: ['99.0%', '99.5%', '99.95%', '99.99%'],
      correct: 3,
      exp: 'Le déploiement de VMs sur au moins deux Availability Zones distinctes d\'une même région bénéficie du SLA Azure le plus élevé pour le calcul IaaS : 99.99% (moins de 53 minutes d\'indisponibilité tolérée par an).'
    },
    {
      stem: 'Quelle distance minimale sépare généralement deux régions Azure au sein d\'une Paire Régionale (Paired Region) ?',
      opts: ['50 km', '100 km', '480 km (300 miles)', '2 000 km'],
      correct: 2,
      exp: 'Les régions jumelées (Paired Regions) sont distantes d\'au moins 480 kilomètres (300 miles) afin qu\'une catastrophe naturelle majeure (séisme, inondation, tempête) ne puisse pas impacter les deux datacenters simultanément.'
    },
    {
      stem: 'Dans la hiérarchie Azure Resource Manager (ARM), quel niveau constitue la frontière fondamentale de facturation et d\'attribution des quotas de calcul ?',
      opts: ['Le Tenant Entra ID', 'Le Management Group', 'L\'Abonnement (Subscription)', 'Le Resource Group'],
      correct: 2,
      exp: 'L\'Abonnement (Subscription) est l\'entité juridique et financière qui délimite la facturation mensuelle, les quotas de ressources (vCPUs max, adresses IP publiques) et les limites d\'administration.'
    },
    {
      stem: 'Selon les conventions du Cloud Adoption Framework (CAF), quel est le format recommandé pour un Resource Group de pré-production hébergeant l\'API en Europe de l\'Ouest ?',
      opts: [
        'rg-api-stage-we-01',
        'resourcegroup_api_preprod_westeurope',
        'API-STAGE-WESTEUROPE-GROUP',
        'my-rg-api-stage-01'
      ],
      correct: 0,
      exp: 'Le gabarit CAF prescrit rg-<app>-<env>-<region>-<instance> en minuscules séparé par des tirets, soit rg-api-stage-we-01.'
    },
    {
      stem: 'Quelle stratégie de réplication de stockage garantit une copie des données sur trois zones de disponibilité indépendantes au sein de la même région ?',
      opts: ['LRS (Locally Redundant Storage)', 'ZRS (Zone-Redundant Storage)', 'GRS (Geo-Redundant Storage)', 'RA-GRS'],
      correct: 1,
      exp: 'ZRS (Zone-Redundant Storage) écrit les données de manière synchrone sur 3 datacenters physiquement séparés (Availability Zones) de la région locale.'
    },
    {
      stem: 'Quel est l\'avantage d\'une politique d\'engagement Reserved Instances (RI) sur 3 ans sous Azure par rapport au tarif Pay-As-You-Go ?',
      opts: [
        'Augmentation de la vitesse CPU de 50%',
        'Réduction tarifaire pouvant atteindre environ 60% sur le coût du calcul',
        'Gratuité totale de la bande passante sortante Internet',
        'Disques SSD Premium illimités sans surcoût'
      ],
      correct: 1,
      exp: 'Les réservations d\'instances sur 3 ans permettent d\'obtenir jusqu\'à 60% à 72% d\'économies sur la composante calcul (vCPU/RAM) des machines virtuelles stables par rapport au tarif PAYG.'
    },
    {
      stem: 'Une ressource peut-elle appartenir simultanément à deux Resource Groups distincts ?',
      opts: [
        'Oui, si les deux groupes sont dans le même abonnement',
        'Oui, si elle utilise une étiquette (tag) partagée',
        'Non, chaque ressource appartient obligatoirement à un et un seul Resource Group à un instant donné',
        'Oui, uniquement pour les réseaux virtuels VNet'
      ],
      correct: 2,
      exp: 'Dans l\'architecture ARM, une ressource n\'appartient qu\'à un seul Resource Group. Elle peut en revanche interagir avec des ressources d\'autres groupes ou être déplacée vers un autre groupe.'
    },
    {
      stem: 'Quel composant de l\'infrastructure n\'est PAS couvert par la réduction tarifaire d\'une Instance Réservée (RI) Azure ?',
      opts: [
        'Les vCPUs de la machine virtuelle',
        'La mémoire RAM de la machine virtuelle',
        'Le stockage des disques managés (OS Disk et Data Disks)',
        'Le processeur sous système Linux'
      ],
      correct: 2,
      exp: 'Les Reserved Instances (RI) ne couvrent que le coût horaire de la puissance de calcul (vCPU et RAM) de la VM. Le stockage des disques managés attachés et l\'egress réseau continuent d\'être facturés selon leurs tarifs respectifs.'
    }
  ],
  flashcards: [
    {
      q: 'Qu\'est-ce qu\'une Zone de Disponibilité (Availability Zone) Azure et quel SLA garantit-elle ?',
      a: 'Un datacenter physiquement distinct au sein d\'une région, doté d\'une alimentation, d\'un refroidissement et d\'un réseau indépendants. Déployer sur au moins 2 AZs garantit un SLA de 99.99%.'
    },
    {
      q: 'Quelle est la distance minimale séparant deux régions d\'une Paire Régionale (Paired Region) ?',
      a: 'Au moins 480 kilomètres (300 miles), pour garantir qu\'une catastrophe naturelle n\'affecte pas simultanément le site de production et le site de reprise (DR).'
    },
    {
      q: 'Quels sont les 4 niveaux hiérarchiques de gestion organisationnelle sous Azure ARM ?',
      a: '1. Root Management Group -> 2. Management Groups (MG) -> 3. Subscriptions (Abonnements) -> 4. Resource Groups (Groupes de ressources).'
    },
    {
      q: 'Quel est le gabarit de nommage standard CAF pour un groupe de ressources Azure ?',
      a: 'rg-<app/workload>-<env>-<region_code>-<instance> (exemple : rg-erp-prod-we-01).'
    },
    {
      q: 'Quelle est la différence fondamentale entre la réplication LRS et ZRS pour Azure Storage ?',
      a: 'LRS conserve 3 copies dans un seul datacenter (vulnérable à la panne du bâtiment), tandis que ZRS réplique de manière synchrone sur 3 Availability Zones distinctes de la région.'
    },
    {
      q: 'Qu\'est-ce que le principe d\'Instances Réservées (RI) et quel est son impact financier ?',
      a: 'Un engagement sur 1 an ou 3 ans sur des capacités de calcul VM prévisibles, offrant entre 35% (1 an) et 60% (3 ans) d\'économie sur la part calcul par rapport au Pay-As-You-Go.'
    }
  ],
  mastery: [
    {
      title: 'Conception de hiérarchie ARM d\'entreprise multi-environnements',
      desc: 'Créer une arborescence complète de Management Groups isolant la Production, les Environnements de Recette et la Sandbox R&D sous le Root Management Group.'
    },
    {
      title: 'Matrice de résilience régionale et choix de stockage ZRS/GRS',
      desc: 'Dimensionner l\'infrastructure de données selon les contraintes de RPO (Recovery Point Objective) et RTO (Recovery Time Objective) du cahier des charges client.'
    },
    {
      title: 'Mise en œuvre du Cloud Adoption Framework (CAF)',
      desc: 'Standardiser les conventions de nommage et d\'étiquetage pour automatiser l\'imputation des coûts et l\'audit de conformité organisationnelle.'
    },
    {
      title: 'Optimisation FinOps par Reserved Instances et Azure Hybrid Benefit',
      desc: 'Calculer le TCO prévisionnel sur 3 ans et modéliser les économies d\'échelle entre PAYG, RI 1Y, RI 3Y et réutilisation de licences sur site.'
    },
    {
      title: 'Automatisation d\'audit d\'infrastructure en Python 3',
      desc: 'Développer des scripts d\'audit vérifiant la conformité des noms de ressources et simulant les calculs de coûts et de résilience régionale.'
    }
  ]
};
