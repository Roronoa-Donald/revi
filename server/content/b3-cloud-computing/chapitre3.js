/**
 * Chapitre 3 du cours « Cloud Computing B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 3,
  title: 'Technologies de Virtualisation, Hyperviseurs &amp; Dimensionnement',
  short: 'Virtualisation &amp; Dimensionnement',
  toc: 'Hyperviseurs Type 1 Bare-Metal vs Type 2 Hosted, virtualisation matérielle HVM vs paravirtualisation, ratios de sur-allocation (vCPU/RAM), dimensionnement d’instances face aux charges crêtes.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B3 et plus',
  situation: 'La virtualisation constitue le socle technologique fondamental sans lequel le Cloud Computing ne pourrait exister. C’est elle qui permet d’abstraire les composants matériels physiques (processeurs, mémoire vive, disques, cartes réseau) pour créer à la volée des machines virtuelles isolées et dynamiques. Toutefois, mal appréhendée, la virtualisation introduit des pertes de performances (overhead), des contentions d’accès aux ressources physiques et des goulots d’étranglement sévères lors de pics de trafic. L’ingénieur système et cloud de niveau B3 doit maîtriser les rouages internes des hyperviseurs de Type 1 et 2, calculer les limites saines de sur-allocation (overcommitment) et dimensionner rigoureusement ses instances face aux contraintes transactionnelles.',
  objectives: [
    'analyser le fonctionnement interne et les couches d’abstraction des hyperviseurs de Type 1 (Bare-Metal) et Type 2 (Hosted) ;',
    'différencier la virtualisation complète assistée matériellement (HVM) de la paravirtualisation (PV) et des conteneurs ;',
    'comprendre les mécanismes d’ordonnancement CPU (vCPU vers cœurs physiques pCPU) et de gestion mémoire (Memory Ballooning, KSM) ;',
    'calculer les ratios de consolidation et de sur-allocation admissible pour les processeurs et la mémoire vive ;',
    'dimensionner une flotte d’instances pour absorber une charge transactionnelle crête en calculant les limites CPU, RAM et IOPS ;',
    'prévenir les phénomènes de « noisy neighbor » et les contentions de ressources sur les hôtes mutualisés.'
  ],
  sections: [
    {
      title: 'Taxonomie des Hyperviseurs : Type 1 Bare-Metal vs Type 2 Hosted',
      html: [
        '<p>L’hyperviseur (ou Virtual Machine Monitor - VMM) gère l’allocation des ressources physiques et l’isolation des machines virtuelles. On distingue deux architectures fondamentales :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Hyperviseur de Type 1 (Bare-Metal / Natif)</h4>',
        '    <p>S’exécute directement sur le matériel nu (processeur, RAM, bus) sans système d’exploitation hôte intermédiaire.<br>',
        '    <strong>Avantages :</strong> Overhead ultra-faible (&lt; 2-3%), latence minimale, sécurité maximale.<br>',
        '    <strong>Exemples :</strong> KVM (intégré au noyau Linux), VMware ESXi, Citrix XenServer, Microsoft Hyper-V Core.<br>',
        '    <strong>Usage :</strong> Tous les datacenters de production Cloud mondiaux (AWS Nitro, Azure Hyper-V, GCP KVM).</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Hyperviseur de Type 2 (Hosted / Hébergé)</h4>',
        '    <p>S’exécute comme une application logicielle conventionnelle au-dessus d’un OS hôte complet (Windows, macOS, Linux).<br>',
        '    <strong>Inconvénients :</strong> Double ordonnanceur, overhead élevé (7% à 15%), latence accrue des entrées/sorties.<br>',
        '    <strong>Exemples :</strong> VirtualBox, VMware Workstation, VMware Fusion.<br>',
        '    <strong>Usage :</strong> Environnements de développement local, tests ponctuels sur poste de travail ingénieur.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Modes d’Émulation : HVM, Paravirtualisation (PV) et Conteneurs',
      html: [
        '<p>La manière dont les instructions processeur et les pilotes de périphériques sont traduits détermine directement la vitesse d’exécution :</p>',
        '<ul>',
        '  <li><strong>HVM (Hardware Virtual Machine) :</strong> Exploite les extensions matérielles des processeurs modernes (Intel VT-x / AMD-V) qui ajoutent un niveau de privilège sous le Ring 0 (« Ring -1 » ou mode VMX root). L’OS invité fonctionne sans aucune modification comme sur une machine physique dédiée.</li>',
        '  <li><strong>Paravirtualisation (PV) :</strong> L’OS invité est modifié pour avoir conscience qu’il tourne dans une machine virtuelle. Il communique avec l’hyperviseur via des appels système spécifiques (<em>hypercalls</em>), réduisant l’émulation logicielle des périphériques réseau et disque.</li>',
        '  <li><strong>Conteneurisation (OS-level Virtualization) :</strong> Ne virtualise pas le matériel, mais isole des processus applicatifs partageant le même noyau d’OS hôte via les <em>cgroups</em> (limitation des ressources CPU/RAM) et les <em>namespaces</em> (isolation des processus, réseaux et systèmes de fichiers). Démarrage instantané en millisecondes et zéro overhead d’hyperviseur.</li>',
        '</ul>'
      ].join('\n')
    },
    {
      title: 'Consolidation, Sur-Allocation (Overcommitment) &amp; Dimensionnement',
      html: [
        '<p>Pour rentabiliser les investissements matériels, les hébergeurs mutualisent les capacités en misant sur le fait que toutes les VMs n’exploitent pas 100% de leurs ressources en même temps :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Sur-Allocation CPU (vCPU to pCPU Ratio)</h4>',
        '    <p>On alloue plus de cœurs virtuels que de cœurs physiques réels :<br>',
        '    $$Ratio_{vCPU} = \\frac{\\sum vCPU}{pCPU}$$<br>',
        '    - Ratio standard admis en Cloud d’entreprise : 2:1 à 4:1.<br>',
        '    - Au-delà de 5:1 : risque critique de saturation CPU Ready Time (les VMs attendent pour exécuter un cycle CPU).</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Sur-Allocation Mémoire (RAM Overcommitment)</h4>',
        '    <p>La RAM ne pouvant être compressée indéfiniment sans impacter la réactivité, le sur-engagement mémoire doit rester très modéré :<br>',
        '    $$Ratio_{RAM} = \\frac{\\sum RAM_{allouée}}{RAM_{physique}}$$<br>',
        '    - Ratio sain : 1.0 à 1.25 maximum.<br>',
        '    - Exploite le <em>Memory Ballooning</em> (gonflement d’un pilote invité pour récupérer les pages inactives) et le dédoublonnage (KSM).</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],
  methodTitle: 'Protocole de Dimensionnement d’une Infrastructure Virtualisée',
  method: [
    'Caractériser le profil de charge de chaque service : intensif en calcul (CPU-bound), en mémoire (RAM-bound) ou en entrées/sorties (I/O-bound).',
    'Déterminer le nombre de transactions par seconde (TPS) attendu en régime nominal et en pic critique.',
    'Mesurer les métriques unitaires consommées par transaction : temps CPU (ms), mémoire allouée (Mo) et nombre d’IOPS disque.',
    'Appliquer une marge de sécurité opérationnelle de 20% à 30% (taux d’utilisation cible de 70% à 80% maximum).',
    'Calculer le nombre minimal d’instances requis pour chaque axe de ressource et retenir le facteur limitant.',
    'Configurer des politiques d’auto-scaling horizontal (HPA) basées sur des métriques réelles (CPU, latence, file de messages).'
  ],
  summary: [
    'Les hyperviseurs de Type 1 (Bare-Metal) exécutent les machines virtuelles directement sur le matériel avec un overhead négligeable.',
    'HVM tire parti des instructions CPU Intel VT-x/AMD-V pour exécuter des systèmes d’exploitation non modifiés en quasi-natif.',
    'La sur-allocation CPU (overcommitment) est courante (jusqu’à 3:1 ou 4:1), mais la sur-allocation RAM doit rester rigoureusement contenue pour éviter le swap disque.',
    'Le dimensionnement face à une charge crête transactionnelle exige de comparer les besoins CPU, RAM et IOPS pour identifier le facteur limitant.'
  ],
  checklist: [
    'Je sais expliquer la différence architecturale entre KVM/ESXi (Type 1) et VirtualBox (Type 2).',
    'Je comprends le rôle des extensions Intel VT-x et AMD-V dans la virtualisation HVM.',
    'Je sais calculer un ratio de consolidation vCPU:pCPU et vérifier son admissibilité.',
    'Je sais expliquer comment fonctionne le memory ballooning.',
    'Je sais dimensionner le nombre de nœuds nécessaires pour absorber un volume de transactions par seconde.',
    'Je connais la définition du CPU Ready Time et ses conséquences sur les performances.'
  ],
  notions: [
    'Hyperviseur Type 1 Bare-Metal',
    'Hyperviseur Type 2 Hosted',
    'Virtualisation assistée par le processeur (HVM)',
    'Paravirtualisation (PV) et Hypercalls',
    'Sur-allocation CPU (vCPU to pCPU Overcommitment)',
    'Sur-allocation mémoire et Memory Ballooning',
    'Contention et phénomène du « Noisy Neighbor »',
    'Dimensionnement transactionnel et facteur limitant'
  ],
  pitfalls: [
    'Sur-allouer la RAM au-delà de 1.30 sans surveiller les temps d’accès disque, causant des gels complets de machines virtuelles.',
    'Assigner 16 vCPU à une machine virtuelle sur un hôte à 16 cœurs, paralysant l’ordonnanceur SMP de l’hyperviseur.',
    'Croire que la conteneurisation Docker est un hyperviseur complet : elle partage le noyau de l’hôte.',
    'Dimensionner une application uniquement sur le critère CPU en ignorant les limites de débit disque IOPS.'
  ],
  questions: [
    {
      stem: 'Quel type d’hyperviseur s’exécute directement sur le matériel physique sans passer par un système d’exploitation hôte intermédiaire ?',
      opts: [
        'Hyperviseur de Type 2 (Hosted)',
        'Hyperviseur de Type 1 (Bare-Metal)',
        'Moteur de conteneurs Docker',
        'Émulateur d’architecture QEMU en mode utilisateur'
      ],
      correct: 1,
      exp: 'L’hyperviseur de Type 1 (Bare-Metal) est installé directement sur le matériel informatique physique, offrant un niveau de performance et de sécurité optimal.'
    },
    {
      stem: 'Quelle technologie matérielle permet aux processeurs modernes d’exécuter des machines virtuelles HVM avec un minimum d’émulation logicielle ?',
      opts: [
        'L’hyper-threading uniquement',
        'Les extensions Intel VT-x et AMD-V',
        'Le bus PCI Express 5.0',
        'Le protocole d’adressage IPv6'
      ],
      correct: 1,
      exp: 'Intel VT-x et AMD-V sont des instructions processeur dédiées qui créent un mode d’exécution racine sous le Ring 0 (VMX root) pour intercepter efficacement les opérations sensibles des invités.'
    },
    {
      stem: 'Sur un serveur hôte physique disposant de 16 cœurs physiques (pCPU), on déploie 12 VMs configurées avec 4 vCPU chacune. Quel est le ratio de sur-allocation CPU résultant ?',
      opts: [
        '1.50:1',
        '3.00:1',
        '0.33:1',
        '4.00:1'
      ],
      correct: 1,
      exp: 'Total vCPU alloués = 12 * 4 = 48 vCPU. Ratio = 48 / 16 = 3.00:1 (3 vCPU virtuels pour chaque cœur physique réel).'
    },
    {
      stem: 'Comment s’appelle la technique qui permet à l’hyperviseur de récupérer de la RAM inutilisée au sein d’une VM invité sans redémarrage ?',
      opts: [
        'Le Swapping disque brut',
        'Le Memory Ballooning',
        'L’Overclocking dynamique',
        'La pagination synchrone'
      ],
      correct: 1,
      exp: 'Le pilote de ballonnement (Memory Ballooning) gonfle artificiellement à l’intérieur de la VM pour contraindre son OS invité à libérer des pages mémoires inactives au profit de l’hyperviseur.'
    },
    {
      stem: 'Quelle métrique de l’hyperviseur indique qu’une machine virtuelle possède du travail à exécuter mais attend désespérément qu’un cœur physique se libère ?',
      opts: [
        'CPU Utilization',
        'CPU Ready Time (%RDY)',
        'Memory Footprint',
        'Disk IOPS'
      ],
      correct: 1,
      exp: 'Le CPU Ready Time (%RDY) mesure le pourcentage de temps pendant lequel une VM prête à exécuter des instructions est mise en attente par l’ordonnanceur faute de pCPU disponible.'
    },
    {
      stem: 'Si une charge transactionnelle crête réclame 5 instances pour le CPU, 2 instances pour la RAM et 8 instances pour absorber les IOPS disque, combien d’instances complètes faut-il allouer au minimum ?',
      opts: [
        '2 instances',
        '5 instances',
        '8 instances',
        '15 instances'
      ],
      correct: 2,
      exp: 'Il faut retenir le maximum des besoins, soit 8 instances. Le facteur limitant ici est le sous-système de disques IOPS.'
    },
    {
      stem: 'Comment qualifie-t-on le problème où une machine virtuelle voisine consomme de manière abusive les ressources partagées (CPU, bus disque), dégradant les autres VMs sur le même hôte ?',
      opts: [
        'Le problème du « Silent Partner »',
        'Le phénomène du « Noisy Neighbor » (voisin bruyant)',
        'L’attaque par rejeu temporel',
        'La rupture de quorum'
      ],
      correct: 1,
      exp: 'Le phénomène de « Noisy Neighbor » survient lorsqu’une VM monopolise les ressources physiques partagées au détriment des autres locataires de l’hôte physique.'
    },
    {
      stem: 'Quelle est la principale différence architecturale entre un conteneur et une machine virtuelle classique ?',
      opts: [
        'Le conteneur possède son propre hyperviseur Type 1 dédié',
        'Le conteneur partage le noyau du système d’exploitation hôte avec les autres conteneurs',
        'Le conteneur ne peut pas exécuter de code binaire',
        'Le conteneur ne supporte pas le réseau IP'
      ],
      correct: 1,
      exp: 'Les conteneurs partagent le noyau de l’OS hôte et isolent les processus via des mécanismes natifs (cgroups, namespaces), éliminant l’émulation matérielle d’une VM.'
    }
  ],
  flashcards: [
    {
      q: 'Qu’est-ce qui distingue un hyperviseur Type 1 d’un hyperviseur Type 2 ?',
      a: 'Le Type 1 s’exécute directement sur le matériel nu (bare-metal) avec un overhead minimal (< 2%), alors que le Type 2 tourne au-dessus d’un OS hôte conventionnel.'
    },
    {
      q: 'Quel est le ratio de sur-allocation vCPU:pCPU généralement recommandé en Cloud de production ?',
      a: 'Un ratio de 2:1 à 4:1 pour des charges courantes. Au-delà, le CPU Ready Time augmente et dégrade les performances.'
    },
    {
      q: 'Pourquoi la sur-allocation de mémoire RAM doit-elle rester très limitée (<= 1.25) ?',
      a: 'Parce que si la mémoire physique est saturée, l’hyperviseur doit swapper sur disque, ce qui effondre les performances applicatives par un facteur de 100 à 1 000.'
    },
    {
      q: 'Comment fonctionne le mode de virtualisation HVM ?',
      a: 'Il exploite les extensions processeur Intel VT-x ou AMD-V pour exécuter le système d’exploitation invité sans modification en quasi-natif.'
    },
    {
      q: 'Qu’est-ce que le CPU Ready Time (%RDY) ?',
      a: 'Le pourcentage de temps durant lequel une machine virtuelle prête à exécuter des instructions doit patienter car l’hyperviseur n’a aucun cœur physique libre à lui attribuer.'
    },
    {
      q: 'Lors du dimensionnement d’instances face à un pic, comment détermine-t-on le nombre final de nœuds ?',
      a: 'On calcule le nombre de nœuds requis séparément pour le CPU, la RAM et les IOPS, puis on retient la valeur maximale (le facteur limitant).'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Moins de 4/8 : Révisez la différence Type 1 vs Type 2 et les calculs de ratios de sur-allocation.'
    },
    {
      cls: 'medium',
      text: 'Entre 5/8 et 7/8 : Bonnes connaissances, perfectionnez le dimensionnement de flotte et la gestion de l’overhead.'
    },
    {
      cls: 'high',
      text: '8/8 : Parfait ! L’ingénierie de la virtualisation et le dimensionnement de serveurs sont parfaitement assimilés.'
    }
  ]
};
