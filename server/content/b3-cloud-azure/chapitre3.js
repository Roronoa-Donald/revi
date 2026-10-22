/**
 * Chapitre 3 du cours « Cloud Microsoft Azure B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 3,
  title: 'Calcul &amp; Virtualisation Azure (Azure Compute, VMSS &amp; PaaS)',
  short: 'Calcul, VMSS &amp; PaaS',
  toc: 'Machines virtuelles Azure IaaS, dimensionnement par familles et séries (B, D, E, F), disques managés (Standard HDD/SSD, Premium SSD, Ultra Disk), architectures de haute disponibilité (Availability Sets avec domaines de panne et de mise à jour, Availability Zones), calcul de SLA composite, groupes de machines identiques (VMSS) avec auto-scaling et cooldown, et hébergement PaaS managé Azure App Service avec slots de déploiement et swap zéro-downtime.',
  time: '≈ 2 h 45 de travail',
  free: false,
  situation: 'Dans un contexte de forte croissance où une application critique subit des pics de fréquentation imprévisibles, une machine virtuelle unique finit invariablement par saturer ou tomber en panne lors d\'une opération de maintenance matérielle. En tant qu\'ingénieur Cloud B3, vous devez sélectionner les séries de VM adaptées au ratio CPU/mémoire, concevoir des architectures résilientes combinant Availability Sets et Availability Zones pour garantir des SLAs allant jusqu\'à 99.99%, configurer l\'élasticité horizontale automatique avec Azure VMSS et exploiter les slots de staging Azure App Service pour des mises en production sans interruption de service.',
  objectives: [
    'dimensionner et sélectionner les séries de machines virtuelles Azure (B-series, D-series, E-series, F-series) ;',
    'comparer les performances et cas d\'usage des disques managés (Standard HDD, Standard SSD, Premium SSD, Ultra Disk) ;',
    'comprendre l\'architecture des Availability Sets (Fault Domains et Update Domains) et des Availability Zones ;',
    'calculer la disponibilité contractuelle (SLA) d\'une chaîne applicative multi-tiers en série ;',
    'implémenter l\'auto-scaling horizontal avec Azure VMSS (seuils CPU, métriques, pas de temps et cooldown) ;',
    'maîtriser le déploiement continu PaaS sur Azure App Service avec slots de déploiement (Staging/Production) et rollback automatisé.'
  ],
  sections: [
    {
      title: 'Machines Virtuelles Azure IaaS : Familles, Séries et Disques Managés',
      html: [
        '<p>Azure propose des centaines de gabarits (SKUs) de machines virtuelles réparties en familles spécialisées selon les exigences de calcul, de mémoire et de stockage :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Les Grandes Familles de Séries Azure</h4>',
        '    <ul>',
        '      <li><strong>B-series (Burstable) :</strong> processeurs à consommation de base économique accumulant des crédits CPU pour absorber des pointes soudaines (idéal dev/test, petits serveurs web).</li>',
        '      <li><strong>D-series (Usage général) :</strong> équilibre optimal entre vCPU et RAM (ratio 1:4), adapté à la majorité des applications d\'entreprise et serveurs applicatifs.</li>',
        '      <li><strong>E-series (Mémoire intensive) :</strong> ratio élevé vCPU/RAM (1:8), conçu pour les bases de données volumineuses en mémoire (SAP HANA, SQL Server, Redis).</li>',
        '      <li><strong>F-series (Calcul intensif) :</strong> ratio faible (1:2) avec fréquence d\'horloge processeur élevée, idéal pour l\'encodage vidéo et le calcul scientifique.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Types de Disques Managés (Managed Disks)</h4>',
        '    <ul>',
        '      <li><strong>Standard HDD :</strong> disques magnétiques mécaniques économiques pour archivage et sauvegardes peu consultées (jusqu\'à 500 IOPS).</li>',
        '      <li><strong>Standard SSD :</strong> stockage flash économique pour charges de travail légères et régulières (jusqu\'à 4 000 IOPS).</li>',
        '      <li><strong>Premium SSD (v1/v2) :</strong> stockage SSD haute performance à faible latence (millisecondes), requis pour prétendre aux SLAs Azure de production (jusqu\'à 20 000 IOPS).</li>',
        '      <li><strong>Ultra Disk :</strong> stockage extrême à latence inférieure à la milliseconde pour bases de données transactionnelles massives (jusqu\'à 160 000 IOPS).</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Haute Disponibilité : Availability Sets, Zones &amp; Calcul de SLA Composite',
      html: [
        '<p>Pour protéger les applications contre les pannes matérielles imprévues et les opérations de maintenance planifiée du matériel par Microsoft, Azure fournit deux mécanismes d\'isolation physique :</p>',
        '<table class="table">',
        '  <thead><tr><th>Mécanisme</th><th>Principe Physique</th><th>SLA Garanti</th><th>Protection Offerte</th></tr></thead>',
        '  <tbody>',
        '    <tr><td><strong>Availability Set (Ensemble de disponibilité)</strong></td><td>Répartit les VMs d\'un même niveau sur différents racks au sein d\'un même datacenter :<br>- <strong>Fault Domains (FD) :</strong> partagent l\'alimentation et les switchs réseau (jusqu\'à 3 FD).<br>- <strong>Update Domains (UD) :</strong> redémarrés séquentiellement lors des maintenances (jusqu\'à 20 UD).</td><td>99.95%</td><td>Pannes d\'un switch réseau ou d\'un bloc d\'alimentation de rack au sein d\'un datacenter.</td></tr>',
        '    <tr><td><strong>Availability Zones (Zones de disponibilité)</strong></td><td>Répartit les VMs sur 2 ou 3 datacenters géographiquement et physiquement distincts d\'une région, dotés de réseaux et générateurs séparés.</td><td>99.99%</td><td>Inondation, incendie ou coupure totale d\'un datacenter complet.</td></tr>',
        '  </tbody>',
        '</table>',
        box('standard', 'Calcul de la Disponibilité Composite Multi-Tiers', [
          '<p>Dans une architecture web classique à 3 niveaux (Front Web -&gt; API Métier -&gt; Base de Données), l\'indisponibilité de n\'importe quel niveau entraîne la rupture du service global. ' +
          'Le SLA combiné (composite) se calcule par le produit des disponibilités unitaires :<br>',
          '<code>SLA_composite = SLA_web &times; SLA_app &times; SLA_db</code></p>',
          '<p><em>Exemple concret :</em> Si le Web est à 99.99% (AZ), l\'App à 99.95% (ASet) et la DB à 99.99% (AZ) :<br>',
          '<code>SLA_composite = 0.9999 &times; 0.9995 &times; 0.9999 = 0.999300%</code>, soit environ 6.13 heures d\'interruption maximale tolérée par an.</p>'
        ])
      ].join('\n')
    },
    {
      title: 'Évolutivité avec VMSS et Déploiements Zéro-Downtime PaaS sur App Service',
      html: [
        '<p>L\'élasticité et la modernisation du cycle de déploiement reposent sur deux technologies complémentaires :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Virtual Machine Scale Sets (VMSS)</h4>',
        '    <ul>',
        '      <li><strong>Élasticité horizontale automatique :</strong> ajoute ou supprime des instances identiques de machines virtuelles derrière un répartiteur de charge (Azure Load Balancer).</li>',
        '      <li><strong>Règles métriques :</strong> seuil de scale-out (ex: CPU moyen &gt; 75% sur 5 min -&gt; +2 VMs) et seuil de scale-in (ex: CPU &lt; 25% -&gt; -1 VM).</li>',
        '      <li><strong>Cooldown (Refroidissement) :</strong> période tampon (ex: 5 min) après un changement d\'échelle empêchant de nouvelles modifications pour laisser le temps aux nouvelles VMs de démarrer et de traiter la charge.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Azure App Service &amp; Deployment Slots</h4>',
        '    <ul>',
        '      <li><strong>Hébergement PaaS Managé :</strong> exécution d\'applications Web (Node.js, Python, .NET, PHP, Java) sans aucune gestion du système d\'exploitation sous-jacent.</li>',
        '      <li><strong>Slots de déploiement (Staging / Production) :</strong> déploiement de la nouvelle version sur un slot Staging isolé avec sa propre URL de pré-production.</li>',
        '      <li><strong>Swap zéro-downtime :</strong> bascule instantanée au niveau du routage réseau après validation de la sonde de santé (health probe), avec rollback automatique en cas d\'erreur HTTP 5xx.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],
  method: [
    'Qualification de la charge et choix de la série de VM : analyser le profil de charge (mémoire intensive E-series, burstable B-series, ou équilibré D-series) et sélectionner un disque Premium SSD pour débloquer les garanties de SLA.',
    'Conception du plan de redondance et calcul du SLA : répartir les instances applicatives sur plusieurs Availability Zones ou au sein d\'un Availability Set, et calculer le SLA composite pour vérifier l\'alignement avec le contrat client.',
    'Configuration de l\'auto-scaling VMSS avec Cooldown : définir les seuils de déclenchement CPU et paramétrer un cooldown suffisant pour stabiliser la flotte et prévenir le phénomène de battement.',
    'Mise en place du cycle de swap de slots sur App Service : intégrer les sondes de santé HTTP sur le slot Staging et automatiser la bascule en production sans rupture de trafic pour les utilisateurs finaux.'
  ],
  summary: [
    'Les séries de machines virtuelles Azure répondent à des besoins ciblés : B-series (burstable), D-series (général), E-series (mémoire) et F-series (calcul).',
    'Les disques Premium SSD sont requis pour bénéficier des SLAs de production unitaire (99.9%).',
    'Les Availability Sets séparent les serveurs en Fault Domains (pannes physiques) et Update Domains (mises à jour de maintenance) pour offrir 99.95% de SLA.',
    'Les Availability Zones répartissent les VMs sur 3 datacenters indépendants d\'une région pour un SLA de 99.99%.',
    'Azure VMSS gère l\'élasticité horizontale avec des règles de scale-out/in et une temporisation de cooldown, tandis qu\'App Service permet le swap de slots sans downtime.'
  ],
  checklist: [
    'Savez-vous quelle série de VM sélectionner pour une base de données nécessitant 64 Go de RAM et 8 vCPUs ?',
    'Comprenez-vous la différence entre un Fault Domain et un Update Domain dans un Availability Set ?',
    'Savez-vous calculer le SLA résultant de la chaîne série Web (99.99%) + App (99.95%) + DB (99.99%) ?',
    'Pouvez-vous expliquer pourquoi un délai de cooldown est indispensable lors d\'une montée en charge VMSS ?',
    'Savez-vous comment fonctionne la bascule de slots de déploiement (Swap) sur Azure App Service ?'
  ],
  notions: [
    { term: 'Fault Domain (Domaine de panne)', def: 'Groupe de serveurs physiques partageant la même alimentation et le même commutateur réseau au sein d\'un datacenter.' },
    { term: 'Update Domain (Domaine de mise à jour)', def: 'Groupe logique de machines redémarrées simultanément lors d\'une opération de maintenance programmée de l\'hôte physique.' },
    { term: 'Composite SLA', def: 'Disponibilité globale résultant de la multiplication des SLAs de chaque composant d\'une architecture en série.' },
    { term: 'VMSS (Virtual Machine Scale Sets)', def: 'Service Azure de déploiement et de gestion automatisée d\'un pool élastique de machines virtuelles identiques.' },
    { term: 'Deployment Slot', def: 'Environnement d\'hébergement autonome (ex: Staging) au sein d\'un App Service permettant de tester une version avant la bascule en production.' }
  ],
  pitfalls: [
    'Utiliser un disque Standard HDD pour une machine virtuelle de production et s\'étonner de ne bénéficier que d\'un SLA de 95% sans compensation en cas de panne.',
    'Créer des machines virtuelles individuelles sans Availability Set ni Availability Zones et espérer une continuité de service lors des maintenances Azure.',
    'Configurer un seuil de scale-in VMSS trop agressif sans cooldown, provoquant la destruction immédiate de VMs venant à peine de démarrer.',
    'Croire que le slot Swap nécessite d\'interrompre les requêtes HTTP en cours : Azure redirige le routage réseau sans aucune déconnexion des sessions clientes existantes.'
  ],
  questions: [
    {
      stem: 'Quelle série de machines virtuelles Azure est spécifiquement optimisée pour les applications nécessitant un ratio très élevé de mémoire RAM par vCPU (ex: 1:8) ?',
      opts: ['Série F', 'Série E', 'Série B', 'Série A'],
      correct: 1,
      exp: 'La série E (Enterprise / Memory optimized) propose un ratio vCPU/RAM d\'environ 1:8, parfaitement adapté aux bases de données en mémoire comme SQL Server, PostgreSQL ou Redis.'
    },
    {
      stem: 'Quel est le nombre maximal habituel de Fault Domains (domaines de panne) configurables dans un Availability Set Azure ?',
      opts: ['1', '2 ou 3', '10', '20'],
      correct: 1,
      exp: 'Un Availability Set Azure supporte jusqu\'à 2 ou 3 Fault Domains (selon la région), répartissant les serveurs sur des racks physiques dotés d\'alimentations et de commutateurs séparés.'
    },
    {
      stem: 'Quel est le SLA contractuel garanti par Microsoft pour une machine virtuelle isolée (Single VM) dotée de disques managés Premium SSD ?',
      opts: ['95.0%', '99.0%', '99.5%', '99.9%'],
      correct: 3,
      exp: 'Une VM unique équipée exclusivement de disques managés Premium SSD bénéficie d\'un SLA de 99.9% (contre 99.5% avec des SSD Standard et 95.0% avec des disques HDD Standard).'
    },
    {
      stem: 'Soit une architecture composée d\'un serveur Web (SLA 99.9%) et d\'une base de données (SLA 99.9%). Quel est le SLA composite de cette application en série ?',
      opts: ['99.9%', '99.8001%', '100%', '99.0%'],
      correct: 1,
      exp: 'SLA = 0.999 * 0.999 = 0.998001, soit 99.8001% (environ 17.5 heures d\'indisponibilité maximale tolérée par an).'
    },
    {
      stem: 'Dans une règle d\'auto-scaling pour Azure VMSS, à quoi sert le paramètre de Cooldown (refroidissement) ?',
      opts: [
        'À faire chuter la température matérielle des processeurs du datacenter',
        'À empêcher de nouvelles opérations de mise à l\'échelle pendant un délai défini afin de laisser le temps aux nouvelles instances de traiter la charge',
        'À diviser la facture par deux pendant les heures creuses',
        'À forcer l\'arrêt automatique des VMs la nuit'
      ],
      correct: 1,
      exp: 'Le Cooldown bloque temporairement toute nouvelle évaluation de seuil d\'échelle après un scale-out ou scale-in pour laisser le temps aux serveurs nouvellement déployés d\'absorber le trafic sans battement.'
    },
    {
      stem: 'Quel est le bénéfice majeur d\'effectuer un Swap de slots de déploiement (Staging vers Production) sur Azure App Service ?',
      opts: [
        'La réinstallation complète de l\'OS Windows Server',
        'Une bascule sans interruption de service (zéro-downtime) et la possibilité de retour arrière instantané',
        'La suppression définitive de l\'ancienne version du code source',
        'Le passage automatique au forfait gratuit'
      ],
      correct: 1,
      exp: 'Le Swap réoriente le trafic réseau vers le slot Staging déjà préchauffé et validé sans aucune interruption de service, tout en conservant l\'ancienne version sur le slot de staging pour un rollback immédiat.'
    },
    {
      stem: 'Quelle famille de disques managés offre une latence inférieure à la milliseconde et jusqu\'à 160 000 IOPS pour les charges de travail transactionnelles extrêmes ?',
      opts: ['Standard HDD', 'Standard SSD', 'Premium SSD', 'Ultra Disk'],
      correct: 3,
      exp: 'Azure Ultra Disk offre les performances de stockage les plus élevées de la plateforme Azure, avec une latence sub-milliseconde paramétrable et jusqu\'à 160 000 IOPS.'
    },
    {
      stem: 'Quelle affirmation est exacte concernant les Update Domains dans un Availability Set ?',
      opts: [
        'Tous les Update Domains sont redémarrés simultanément lors des mises à jour Azure',
        'Un seul Update Domain est mis à jour et redémarré à la fois, garantissant qu\'au moins 80% des serveurs restent actifs',
        'Les Update Domains ne s\'appliquent qu\'aux disques durs',
        'Les Update Domains nécessitent une connexion VPN permanente'
      ],
      correct: 1,
      exp: 'Microsoft redémarre les Update Domains de manière strictement séquentielle (un seul à la fois) lors des opérations de mise à jour de la couche physique, assurant la disponibilité continue des autres serveurs du groupe.'
    }
  ],
  flashcards: [
    {
      q: 'Quelles sont les caractéristiques clés des séries B, D, E et F de machines virtuelles Azure ?',
      a: 'B : burstable économique ; D : équilibré usage général (ratio 1:4) ; E : mémoire intensive (ratio 1:8) ; F : calcul intensif (ratio 1:2).'
    },
    {
      q: 'Quelle est la différence entre un Fault Domain et un Update Domain dans un Availability Set ?',
      a: 'Fault Domain : isolation matérielle contre les pannes physiques (racks/alimentations) ; Update Domain : isolation logique pour les redémarrages séquentiels lors des maintenances de l\'hôte.'
    },
    {
      q: 'Quels sont les SLAs respectifs d\'une Single VM Premium SSD, d\'un Availability Set et d\'Availability Zones ?',
      a: 'Single VM Premium : 99.9% (≈ 8.76 h/an) ; Availability Set : 99.95% (≈ 4.38 h/an) ; Availability Zones : 99.99% (≈ 52.6 min/an).'
    },
    {
      q: 'Comment calcule-t-on le SLA composite d\'une architecture multi-tiers en série ?',
      a: 'En multipliant les probabilités de disponibilité de chaque niveau unitaire : SLA_composite = SLA_1 * SLA_2 * ... * SLA_n.'
    },
    {
      q: 'Pourquoi le paramètre de Cooldown est-il vital dans l\'auto-scaling d\'un Azure VMSS ?',
      a: 'Il temporise les nouvelles décisions d\'échelle après un ajout ou retrait pour laisser le temps aux instances de booter et traiter le trafic sans déclencher de battement (flapping).'
    },
    {
      q: 'Qu\'est-ce que le Slot Swap sur Azure App Service et quel est son atout ?',
      a: 'C\'est l\'échange instantané des adresses IP virtuelles entre les slots Staging et Production, permettant des mises en ligne zéro-downtime et un rollback immédiat.'
    }
  ],
  mastery: [
    {
      title: 'Sélection rigoureuse des gabarits VM par analyse de charges réelles',
      desc: 'Déterminer la famille de processeur et la taille idéale en mesurant les métriques IOPS et bande passante réseau d\'applications critiques.'
    },
    {
      title: 'Architecture haute disponibilité multi-zones et multi-régions',
      desc: 'Concevoir des architectures résilientes déployées sur 3 Availability Zones avec reprise d\'activité dans une région jumelée.'
    },
    {
      title: 'Automatisation de l\'élasticité horizontale VMSS',
      desc: 'Écrire des règles de dimensionnement dynamique fondées sur les métriques de files d\'attente ou de requêtes HTTP avec délais de refroidissement.'
    },
    {
      title: 'Mise en œuvre de pipelines de déploiement continu avec App Service Slots',
      desc: 'Intégrer GitHub Actions avec un slot Staging et conditionner le swap de production à la réussite de tests d\'intégration end-to-end.'
    },
    {
      title: 'Développement de simulateurs de haute disponibilité de manière méthodique',
      desc: 'Programmer des moteurs calculant les temps d\'arrêt prévisionnels, simulant l\'auto-scaling et orchestrant la bascule de slots avec rollback.'
    }
  ]
};
