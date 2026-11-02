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
    'appliquer une convention de nommage et d\'étiquetage (Tags) adaptée aux recommandations du Cloud Adoption Framework (CAF) ;',
    'calculer la disponibilité théorique des architectures et choisir la stratégie de réplication des données (LRS vs ZRS vs GRS) ;',
    'évaluer les coûts IaaS/PaaS (TCO / FinOps) et optimiser les dépenses via les Instances Réservées (RI sur 1 an ou 3 ans) ;',
    'analyser et résoudre méthodologiquement des validateurs de hiérarchie CAF, des sélecteurs de résilience régionale et des estimateurs de budget.'
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
        '      <li><strong>Zone de disponibilité (AZ) :</strong> regroupement logique d\'un ou plusieurs datacenters physiquement distincts dans une région, doté d\'une alimentation, d\'un refroidissement et d\'un réseau indépendants des autres zones.</li>',
        '      <li><strong>SLA :</strong> répartir les ressources entre des zones peut améliorer la résilience, mais ne garantit pas à lui seul un pourcentage. Le SLA dépend du service, de la configuration et des conditions contractuelles applicables. Voir la <a href="https://learn.microsoft.com/en-us/azure/reliability/availability-zones-overview">documentation Microsoft sur les zones</a>.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Paires Régionales &amp; Résilience Catastrophe (DR)</h4>',
        '    <ul>',
        '      <li><strong>Paires régionales :</strong> certaines régions sont associées, généralement dans une même géographie ; d\'autres ne sont pas jumelées. Le jumelage ne configure pas automatiquement la réplication ni le basculement.</li>',
        '      <li><strong>Mises à jour :</strong> Microsoft cherche à échelonner les mises à jour planifiées entre les régions jumelées ; cela ne garantit pas à lui seul la continuité du service.</li>',
        '      <li><strong>Priorité de reprise :</strong> lors d\'une panne touchant toute une géographie, une région de chaque paire est priorisée. Le plan de reprise reste à concevoir et à tester.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Hiérarchie de Gestion Organisationnelle ARM (Azure Resource Manager)',
      html: [
        '<p>Azure Resource Manager (ARM) est la couche de déploiement et de gestion. La hiérarchie suivante présente quatre types de périmètres, et non une chaîne obligatoirement limitée à quatre segments : plusieurs groupes de gestion peuvent être imbriqués, ou un abonnement peut être rattaché directement à la racine. Voir la <a href="https://learn.microsoft.com/en-us/azure/governance/management-groups/overview">documentation Microsoft</a>.</p>',
        '<table class="table">',
        '  <thead><tr><th>Niveau Hiérarchique</th><th>Rôle et Fonctions Clés</th><th>Héritage des Droits &amp; Politiques</th></tr></thead>',
        '  <tbody>',
        '    <tr><td><strong>1. Root Management Group</strong></td><td>Racine de la hiérarchie du tenant Entra ID ; les abonnements peuvent se trouver dans des groupes descendants.</td><td>Les affectations se propagent selon leur portée et les exclusions ou conditions applicables.</td></tr>',
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
        '<p>Le Cloud Adoption Framework (CAF) propose des recommandations pour définir une convention adaptée à l\'organisation. Le format ci-dessous est un exemple choisi pour le cours, pas une syntaxe universelle imposée par Azure :</p>',
        box('standard', 'Exemple de convention de nommage', [
          '<p>Une organisation peut retenir le format suivant :<br>',
          '<code>&lt;type_ressource&gt;-&lt;application/workload&gt;-&lt;environnement&gt;-&lt;region&gt;-&lt;instance&gt;</code></p>',
          '<ul>',
          '  <li><code>rg-erp-prod-we-01</code> : Groupe de ressources hébergeant l\'ERP de production sur West Europe, instance 01.</li>',
          '  <li><code>vm-web-dev-fc-02</code> : Machine virtuelle du front-end web en environnement de développement sur France Central, instance 02.</li>',
          '  <li><code>stbillstageuse01</code> : Compte de stockage (qui n\'accepte ni tirets ni majuscules, de 3 à 24 caractères alphanumériques).</li>',
          '</ul>'
        ]),
        box('standard', 'Optimisation FinOps : Pay-As-You-Go vs Instances Réservées (RI)', [
          '<p>Le modèle Pay-As-You-Go offre une tarification à l\'usage. Pour certaines charges stables, Azure propose des <strong>réservations</strong> : leur intérêt dépend du prix, de l\'utilisation effective et des conditions applicables.</p>',
          '<ul>',
          '  <li><strong>Engagement :</strong> une réservation peut porter sur un ou trois ans ; comparez le coût réel avec les prix et conditions en vigueur.</li>',
          '  <li><strong>Calcul VM :</strong> la remise applicable aux machines virtuelles ne rend pas gratuits les disques ou le réseau.</li>',
          '  <li><strong>Azure Hybrid Benefit :</strong> certaines licences admissibles peuvent apporter un avantage supplémentaire sous conditions.</li>',
          '</ul>'
        ])
      ].join('\n')
    }
  ],
  method: [
    'Cartographie de l\'organisation et création de la hiérarchie ARM : structurer le Root Management Group, créer les groupes intermédiaires (mg-core, mg-prod, mg-nonprod) et rattacher les abonnements dédiés pour séparer facturation et sécurité.',
    'Sélection de la région et validation des zones de disponibilité : vérifier les possibilités du service choisi et, le cas échéant, identifier la région jumelée et concevoir le plan de reprise d\'activité.',
    'Définition d\'une convention de nommage et de tags adaptée à l\'organisation ; appliquer les contrôles appropriés avec Azure Policy.',
    'Modélisation de la disponibilité et arbitrage financier FinOps : expliciter les hypothèses d\'un calcul de disponibilité en série, examiner séparément les SLA applicables et identifier les serveurs éligibles aux réservations 1 an ou 3 ans.'
  ],
  summary: [
    'Une région Azure regroupe des datacenters ; une zone de disponibilité regroupe un ou plusieurs datacenters et possède une infrastructure indépendante des autres zones. Le SLA dépend du service et de ses conditions.',
    'Une paire régionale associe certaines régions, généralement d\'une même géographie ; elle ne configure pas à elle seule la reprise après sinistre.',
    'La hiérarchie ARM comprend 4 niveaux : Root Management Group, Management Groups, Subscriptions (facturation/quotas) et Resource Groups (cycle de vie).',
    'Le Cloud Adoption Framework (CAF) aide à définir une convention de nommage et de balisage adaptée à l\'organisation.',
    'Les réservations peuvent réduire certains coûts de calcul ; les économies dépendent de l\'offre, des conditions et de l\'utilisation.'
  ],
  checklist: [
    'Savez-vous expliquer la différence entre LRS, ZRS et GRS en lien avec les zones et paires régionales ?',
    'Pouvez-vous distinguer les types de périmètres Azure et expliquer l\'héritage des politiques ?',
    'Savez-vous décoder et composer un nom de ressource selon une convention définie ?',
    'Savez-vous pourquoi la présence de deux zones ne suffit pas à déterminer le SLA applicable à des VMs ?',
    'Savez-vous calculer l\'économie apportée par une réservation 1 an ou 3 ans sur une flotte de calcul ?'
  ],
  notions: [
    { term: 'Availability Zone (AZ)', def: 'Regroupement d\'un ou plusieurs datacenters d\'une région, doté d\'une alimentation, d\'un refroidissement et d\'un réseau indépendants des autres zones ; le SLA dépend du service et de ses conditions.' },
    { term: 'Paired Region', def: 'Région associée à une autre région par Azure pour certaines fonctions de résilience ; le jumelage seul ne configure pas le plan de reprise.' },
    { term: 'Management Group', def: 'Conteneur organisationnel ARM permettant d\'appliquer des politiques et des attributions RBAC à un ensemble d\'abonnements simultanément.' },
    { term: 'Cloud Adoption Framework (CAF)', def: 'Ensemble de bonnes pratiques et de normes publiées par Microsoft pour cadrer l\'architecture, le nommage et la gouvernance Cloud.' },
    { term: 'Reserved Instances (RI)', def: 'Engagement d\'un ou trois ans pouvant réduire le prix de certains usages éligibles, selon les conditions et l\'utilisation.' }
  ],
  pitfalls: [
    'Confondre région et zone de disponibilité : une région contient plusieurs zones (AZs 1, 2, 3), mais toutes les régions Azure ne possèdent pas nécessairement de zones de disponibilité.',
    'Penser qu\'un Resource Group peut être imbriqué dans un autre Resource Group : la hiérarchie ARM interdit l\'imbrication de groupes de ressources.',
    'Supposer qu\'un Resource Group restreint l\'emplacement des ressources : une ressource peut être déployée dans une région différente de celle de son Resource Group (bien que cela soit déconseillé en gouvernance).',
    'Oublier que les remises Reserved Instances (RI) s\'appliquent uniquement au composant calcul (Compute de la VM), et jamais au stockage des disques managés ni à l\'egress réseau.'
  ],
  questions: [
    {
      stem: 'Que peut-on conclure du SLA à partir de la seule répartition de ressources sur deux zones de disponibilité Azure ?',
      opts: [
        'Le SLA dépend du service, de sa configuration et des conditions applicables',
        'Un SLA de 99.99% est garanti pour tous les services',
        'Chaque zone correspond forcément à un seul datacenter',
        'Aucun service ne peut avoir de SLA'
      ],
      correct: 0,
      exp: 'Deux zones peuvent améliorer la résilience, mais ne suffisent pas à établir un SLA : il faut consulter les conditions du service et de la configuration.'
    },
    {
      stem: 'Que garantit à elle seule l\'appartenance d\'une région Azure à une paire régionale ?',
      opts: ['La réplication automatique de toutes les ressources', 'Un basculement automatique pour toutes les applications', 'Ni réplication ni basculement automatique de toutes les ressources', 'L\'impossibilité d\'une panne affectant les deux régions'],
      correct: 2,
      exp: 'Le jumelage peut servir à certains services, mais ne configure ni réplication ni basculement pour toutes les ressources et n\'exclut pas une panne commune. Il faut concevoir et tester le plan de reprise.'
    },
    {
      stem: 'Dans la hiérarchie Azure Resource Manager (ARM), quel niveau constitue la frontière fondamentale de facturation et d\'attribution des quotas de calcul ?',
      opts: ['Le Tenant Entra ID', 'Le Management Group', 'L\'Abonnement (Subscription)', 'Le Resource Group'],
      correct: 2,
      exp: 'L\'abonnement sert de périmètre de gestion et de facturation et porte certains quotas. Le tenant organise les identités, le groupe de gestion agrège des abonnements et le groupe de ressources organise des ressources.'
    },
    {
      stem: 'Dans la convention fictive rg-application-environnement-région-instance du cours, quel nom correspond à une API stage en West Europe, instance 01 ?',
      opts: [
        'rg-api-stage-we-01',
        'resourcegroup_api_preprod_westeurope',
        'API-STAGE-WESTEUROPE-GROUP',
        'my-rg-api-stage-01'
      ],
      correct: 0,
      exp: 'Avec les éléments imposés par cette convention locale, le nom associe rg, api, stage, we et 01. Les trois autres propositions ne respectent pas cette convention ; d\'autres conventions peuvent être valides dans Azure.'
    },
    {
      stem: 'Quelle stratégie de réplication de stockage garantit une copie des données sur trois zones de disponibilité indépendantes au sein de la même région ?',
      opts: ['LRS (Locally Redundant Storage)', 'ZRS (Zone-Redundant Storage)', 'GRS (Geo-Redundant Storage)', 'RA-GRS'],
      correct: 1,
      exp: 'ZRS réplique de manière synchrone dans au moins trois zones de la région primaire. LRS reste dans un centre de données ; GRS et RA-GRS ajoutent une réplication géographique et ne désignent pas ce choix zonal.'
    },
    {
      stem: 'Quel est l\'avantage d\'une politique d\'engagement Reserved Instances (RI) sur 3 ans sous Azure par rapport au tarif Pay-As-You-Go ?',
      opts: [
        'Augmentation de la vitesse CPU de 50%',
        'Réduction possible sur le coût du calcul admissible, selon les conditions',
        'Gratuité totale de la bande passante sortante Internet',
        'Disques SSD Premium illimités sans surcoût'
      ],
      correct: 1,
      exp: 'Une réservation peut réduire le coût du calcul admissible selon l\'offre et l\'utilisation. Elle n\'accélère pas le processeur et ne rend gratuits ni la bande passante sortante ni les disques.'
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
      { q: "Quelle est l'utilité d'une paire régionale Azure pour la reprise après sinistre ?", a: "Elle associe deux régions généralement d'une même géographie pour faciliter la reprise ; cette association ne configure pas à elle seule la réplication ni le basculement automatique." },
      { q: "Quels trois éléments constituent une attribution Azure RBAC ?", a: "Un principal, une définition de rôle et un périmètre d'application (scope)." },
      { q: "Comment Actions et NotActions définissent-elles les droits d'un rôle Azure RBAC ?", a: "Actions autorise des opérations et NotActions en soustrait ; les deux acceptent des jokers, mais NotActions n'est pas un refus absolu face à d'autres rôles." },
      { q: "Qu’est-ce que « Access Tier (Palier d'accès) » ?", a: "Access Tier (Palier d'accès) : Niveau de stockage Blob (Hot, Cool, Cold, Archive) associant un coût de rétention par Go et un coût d'opération de lecture/écriture." },
      { q: "Comment choisir les paliers Azure Blob selon la fréquence d'accès ?", a: "Hot, Cool, Cold puis Archive ciblent des accès de plus en plus rares pour ajuster les coûts ; Smart peut automatiser les changements entre les paliers en ligne." },
      { q: "Quelles données Azure Monitor collecte-t-il pour l'observabilité ?", a: "Des métriques numériques horodatées, souvent proches du temps réel, et des journaux d'événements structurés, selon les sources configurées." },
      { q: "Que fait un groupe d'actions associé à une alerte Azure Monitor de sévérité Sev0 à Sev4 ?", a: "Il déclenche les notifications et les actions configurées, par exemple un courriel ou une remédiation automatisée." },
      { q: "À quoi sert KQL dans Azure Monitor et quels opérateurs composent ses requêtes ?", a: "Kusto Query Language interroge les journaux par pipeline, notamment avec where, summarize, project, order by et take." },
    {
      q: 'Qu\'est-ce qu\'une Zone de Disponibilité (Availability Zone) Azure et comment déterminer le SLA applicable ?',
      a: 'Une zone regroupe un ou plusieurs datacenters d\'une région et possède une alimentation, un refroidissement et un réseau indépendants des autres zones. Le SLA dépend du service, de sa configuration et des conditions contractuelles ; deux zones seules ne garantissent pas un taux.'
    },
    {
      q: 'Une paire régionale configure-t-elle automatiquement la reprise après sinistre ?',
      a: 'Non. Certaines régions sont jumelées, mais il faut configurer et tester la réplication et la reprise selon les services utilisés.'
    },
    {
      q: 'Comment s\'articulent groupes de gestion, abonnements et groupes de ressources ?',
      a: 'La racine peut contenir des groupes de gestion imbriqués ou des abonnements ; les abonnements contiennent des groupes de ressources. Le nombre de niveaux de groupes de gestion varie.'
    },
    {
      q: 'Quelle convention de nommage illustre le cours pour un groupe de ressources ?',
      a: 'Exemple local : rg-<app/workload>-<env>-<region_code>-<instance>. Une organisation peut définir une autre convention adaptée.'
    },
    {
      q: 'Quelle est la différence fondamentale entre la réplication LRS et ZRS pour Azure Storage ?',
      a: 'LRS conserve trois copies dans un centre de données ; ZRS réplique de manière synchrone dans au moins trois zones de disponibilité de la région primaire.'
    },
    {
      q: 'Qu\'est-ce que le principe d\'Instances Réservées (RI) et quel est son impact financier ?',
      a: 'Un engagement sur 1 an ou 3 ans pouvant réduire certains coûts de calcul, selon l\'offre et l\'utilisation réelle.'
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
      title: 'Automatisation d\'audit d\'infrastructure de manière méthodique',
      desc: 'Développer des scripts d\'audit vérifiant la conformité des noms de ressources et simulant les calculs de coûts et de résilience régionale.'
    }
  ]
};
