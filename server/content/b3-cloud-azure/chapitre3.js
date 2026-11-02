/**
 * Chapitre 3 du cours « Cloud Microsoft Azure B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 3,
  title: 'Calcul &amp; Virtualisation Azure (Azure Compute, VMSS &amp; PaaS)',
  short: 'Calcul, VMSS &amp; PaaS',
  toc: 'Machines virtuelles Azure IaaS, dimensionnement par familles et séries (B, D, E, F), disques managés (Standard HDD/SSD, Premium SSD, Ultra Disk), architectures de haute disponibilité (Availability Sets avec domaines de panne et de mise à jour, Availability Zones), modèle théorique de disponibilité composite, groupes de machines identiques (VMSS) avec auto-scaling et cooldown, et hébergement PaaS managé Azure App Service avec slots de déploiement et préchauffage configurable avant swap.',
  time: '≈ 2 h 45 de travail',
  free: false,
  situation: 'Dans un contexte de forte croissance où une application critique subit des pics de fréquentation imprévisibles, une machine virtuelle unique peut saturer ou être indisponible lors d\'une maintenance. En tant qu\'ingénieur Cloud B3, vous devez sélectionner les séries de VM adaptées, concevoir une architecture résiliente en vérifiant les conditions de SLA, configurer l\'élasticité horizontale avec Azure VMSS et préparer les déploiements par slots App Service.',
  objectives: [
    'dimensionner et sélectionner les séries de machines virtuelles Azure (B-series, D-series, E-series, F-series) ;',
    'comparer les performances et cas d\'usage des disques managés (Standard HDD, Standard SSD, Premium SSD, Ultra Disk) ;',
    'comprendre l\'architecture des Availability Sets (Fault Domains et Update Domains) et des Availability Zones ;',
    'calculer une disponibilité théorique multi-tiers en explicitant ses hypothèses et la distinguer d\'un SLA contractuel ;',
    'implémenter l\'auto-scaling horizontal avec Azure VMSS (seuils CPU, métriques, pas de temps et cooldown) ;',
    'maîtriser les slots de déploiement App Service, le préchauffage configurable et les possibilités de retour arrière.'
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
        '      <li><strong>Premium SSD (v1/v2) :</strong> stockage SSD haute performance à faible latence ; les performances et les conditions de SLA dépendent de la configuration choisie.</li>',
        '      <li><strong>Ultra Disk :</strong> stockage extrême à latence inférieure à la milliseconde pour bases de données transactionnelles massives (jusqu\'à 160 000 IOPS).</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Haute Disponibilité : Availability Sets, Zones &amp; Modèle de Disponibilité Composite',
      html: [
        '<p>Azure fournit plusieurs mécanismes de résilience. Les pourcentages du tableau sont des valeurs hypothétiques pour les exercices, pas des SLA contractuels : vérifiez les conditions du service et de sa configuration.</p>',
        '<table class="table">',
        '  <thead><tr><th>Mécanisme</th><th>Principe Physique</th><th>Disponibilité hypothétique</th><th>Protection recherchée</th></tr></thead>',
        '  <tbody>',
        '    <tr><td><strong>Availability Set (Ensemble de disponibilité)</strong></td><td>Répartit les VMs d\'un même niveau sur différents racks au sein d\'un même datacenter :<br>- <strong>Fault Domains (FD) :</strong> partagent l\'alimentation et les switchs réseau (jusqu\'à 3 FD).<br>- <strong>Update Domains (UD) :</strong> redémarrés séquentiellement lors des maintenances (jusqu\'à 20 UD).</td><td>99.95%</td><td>Pannes d\'un switch réseau ou d\'un bloc d\'alimentation de rack au sein d\'un datacenter.</td></tr>',
        '    <tr><td><strong>Availability Zones (Zones de disponibilité)</strong></td><td>Répartit les VMs entre plusieurs zones d\'une région ; chaque zone regroupe un ou plusieurs datacenters et possède une infrastructure indépendante des autres.</td><td>99.99%</td><td>Réduction de l\'impact d\'une panne de zone selon l\'architecture déployée.</td></tr>',
        '  </tbody>',
        '</table>',
        box('standard', 'Modèle de Disponibilité Composite Multi-Tiers', [
          '<p>Modèle fictif : les trois niveaux sont tous nécessaires en série ; leurs disponibilités concernent la même période et leurs défaillances indépendantes ne partagent pas de cause commune. Sous ces hypothèses, on multiplie leurs probabilités de disponibilité :<br>',
          '<code>A_composite = A_web &times; A_app &times; A_db</code></p>',
          '<p><em>Exemple hypothétique :</em> pour Web = 99.99%, App = 99.95% et DB = 99.99% :<br>',
          '<code>A_composite = 0.9999 &times; 0.9995 &times; 0.9999 = 0.999300109995</code>, soit environ <strong>99.9300 %</strong> et 6.13 heures d\'indisponibilité théorique sur une année supposée de 8 760 heures.</p>',
          '<p>Ce résultat ne constitue pas un engagement contractuel : des dépendances communes, des périodes différentes ou les exclusions des SLA peuvent invalider le produit. Consultez les <a href="https://learn.microsoft.com/en-us/azure/reliability/concept-service-level-agreements">recommandations Microsoft sur les SLA</a> et analysez les modes de défaillance réels.</p>'
        ])
      ].join('\n')
    },
    {
      title: 'Évolutivité avec VMSS et Déploiements Contrôlés sur App Service',
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
        '      <li><strong>Préchauffage du swap :</strong> App Service interroge les instances du slot source ; le chemin par défaut est <code>/</code>. Par défaut, tous les codes HTTP sont acceptés, y compris 500 : cette réponse peut donc ne pas empêcher le swap.</li>',
        '      <li><strong>Contrôle configuré :</strong> <code>WEBSITE_SWAP_WARMUP_PING_PATH</code> choisit le chemin HTTP et <code>WEBSITE_SWAP_WARMUP_PING_STATUSES</code> les codes acceptés, par exemple <code>200,202</code>. Un code hors liste ne valide pas le préchauffage ; si celui-ci n\'aboutit pas, le swap échoue. Ce ping ne garantit pas à lui seul l\'intégrité fonctionnelle de l\'application.</li>',
        '      <li><strong>Retour arrière :</strong> après un échange, un nouveau swap des mêmes slots peut restaurer les versions précédentes ; ce n\'est pas un rollback automatique des données ou des effets externes. Les opérations longues sur les anciennes instances peuvent être interrompues lors de leur recyclage. Voir les <a href="https://learn.microsoft.com/en-us/azure/app-service/deploy-staging-slots">instructions Microsoft sur les slots</a>.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],
  method: [
    'Qualification de la charge et choix de la série de VM : analyser le profil de charge et le type de disque, puis vérifier les conditions de SLA de la configuration retenue.',
    'Conception du plan de redondance : examiner les SLA contractuels de chaque service et utiliser un modèle de disponibilité en série uniquement si ses hypothèses sont explicitées.',
    'Configuration de l\'auto-scaling VMSS avec Cooldown : définir les seuils de déclenchement CPU et paramétrer un cooldown suffisant pour stabiliser la flotte et prévenir le phénomène de battement.',
    'Mise en place du cycle de swap App Service : configurer le préchauffage, réaliser les tests applicatifs et prévoir la restauration ainsi que les effets des changements de données.'
  ],
  summary: [
    'Les séries de machines virtuelles Azure répondent à des besoins ciblés : B-series (burstable), D-series (général), E-series (mémoire) et F-series (calcul).',
    'Le type de disque et la configuration de la VM peuvent influer sur les conditions du SLA ; il faut consulter les engagements applicables.',
    'Les Availability Sets séparent les serveurs en Fault Domains (pannes physiques) et Update Domains (mises à jour de maintenance) ; le SLA dépend des conditions applicables.',
    'Les Availability Zones sont des groupes d\'un ou plusieurs datacenters ; répartir les VMs entre zones ne suffit pas à déterminer le SLA.',
    'Azure VMSS gère l\'élasticité horizontale, tandis que le préchauffage App Service accepte par défaut tout code HTTP, même 500.'
  ],
  checklist: [
    'Savez-vous quelle série de VM sélectionner pour une base de données nécessitant 64 Go de RAM et 8 vCPUs ?',
    'Comprenez-vous la différence entre un Fault Domain et un Update Domain dans un Availability Set ?',
    'Savez-vous calculer la disponibilité théorique de niveaux en série et expliciter les hypothèses d\'indépendance et de période ?',
    'Pouvez-vous expliquer pourquoi un délai de cooldown est indispensable lors d\'une montée en charge VMSS ?',
    'Savez-vous comment fonctionne la bascule de slots de déploiement (Swap) sur Azure App Service ?'
  ],
  notions: [
    { term: 'Fault Domain (Domaine de panne)', def: 'Groupe de serveurs physiques partageant la même alimentation et le même commutateur réseau au sein d\'un datacenter.' },
    { term: 'Update Domain (Domaine de mise à jour)', def: 'Groupe logique de machines redémarrées simultanément lors d\'une opération de maintenance programmée de l\'hôte physique.' },
    { term: 'Disponibilité composite (modèle)', def: 'Produit des disponibilités de composants tous nécessaires en série, sous hypothèse d\'indépendance et pour une même période ; ce résultat n\'est pas un SLA contractuel.' },
    { term: 'VMSS (Virtual Machine Scale Sets)', def: 'Service Azure de déploiement et de gestion automatisée d\'un pool élastique de machines virtuelles identiques.' },
    { term: 'Deployment Slot', def: 'Environnement d\'hébergement autonome (ex: Staging) au sein d\'un App Service permettant de tester une version avant la bascule en production.' }
  ],
  pitfalls: [
    'Supposer qu\'une famille de disques ou la répartition en zones suffit à garantir un SLA sans vérifier les conditions du service.',
    'Créer des machines virtuelles individuelles sans Availability Set ni Availability Zones et espérer une continuité de service lors des maintenances Azure.',
    'Configurer un seuil de scale-in VMSS trop agressif sans cooldown, provoquant la destruction immédiate de VMs venant à peine de démarrer.',
    'Supposer qu\'une réponse 500 bloque toujours le swap ou qu\'un retour arrière annule automatiquement les changements de données.'
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
      stem: 'Dans un modèle fictif, une VM est disponible à 99.9% sur une année de 8 760 heures. Quelle est son indisponibilité théorique ?',
      opts: ['8.76 heures', '43.8 heures', '52.6 heures', '876 heures'],
      correct: 0,
      exp: '(1 - 0.999) * 8 760 = 8.76 heures. Cette valeur est un résultat du modèle, pas une garantie contractuelle.'
    },
    {
      stem: 'Dans un modèle fictif en série, le Web et la base ont chacun une disponibilité de 99.9% sur la même période et des défaillances indépendantes. Quelle est la disponibilité composée ?',
      opts: ['99.9%', '99.8001%', '100%', '99.0%'],
      correct: 1,
      exp: '0.999 * 0.999 = 0.998001, soit 99.8001% et environ 17.5 heures théoriques par année de 8 760 heures. Ce calcul ne crée pas de SLA contractuel.'
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
      stem: 'Par défaut, que se passe-t-il si le préchauffage HTTP d\'un swap App Service reçoit un code 500 ?',
      opts: [
        'Le code 500 est accepté pour le préchauffage et peut ne pas empêcher le swap',
        'Le swap est toujours annulé et un rollback des données est automatique',
        'Le code 500 supprime le slot de staging',
        'Le code 500 impose un changement de forfait'
      ],
      correct: 0,
      exp: 'Par défaut tous les codes HTTP sont valides. Configurez WEBSITE_SWAP_WARMUP_PING_STATUSES, par exemple à 200,202 : un code hors liste ne valide pas le préchauffage et le swap échoue si celui-ci n\'aboutit pas.'
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
      q: 'Quelles disponibilités sont supposées dans les exemples fictifs Single VM, Availability Set et Availability Zones ?',
      a: 'Dans ce modèle uniquement : Single VM Premium 99.9%, Availability Set 99.95% et zones 99.99%. Ces nombres ne remplacent pas le SLA et les conditions du service réel.'
    },
    {
      q: 'Comment estime-t-on la disponibilité composite d\'une architecture multi-tiers en série ?',
      a: 'Si tous les niveaux sont nécessaires, si leurs défaillances sont indépendantes et si leurs disponibilités portent sur la même période, on multiplie leurs probabilités. Le résultat est théorique et non contractuel.'
    },
    {
      q: 'Pourquoi le paramètre de Cooldown est-il vital dans l\'auto-scaling d\'un Azure VMSS ?',
      a: 'Il temporise les nouvelles décisions d\'échelle après un ajout ou retrait pour laisser le temps aux instances de booter et traiter le trafic sans déclencher de battement (flapping).'
    },
    {
      q: 'Qu\'est-ce que le Slot Swap sur Azure App Service et quel est son atout ?',
      a: 'Le swap échange les slots après préchauffage. Par défaut, un code 500 est accepté ; les chemins et codes autorisés se configurent. Un nouveau swap peut restaurer les versions, sans annuler automatiquement les données modifiées.'
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
