/**
 * Module 1 — Architectures d'Hyperviseurs Avancées & Dimensionnement Serveurs
 * Cours « Virtualisation Avancée B3 »
 */
'use strict';

module.exports = {
  n: 1,
  title: 'Architectures d\'Hyperviseurs Avancées & Dimensionnement Serveurs',
  short: 'Hyperviseurs & Dimensionnement',
  toc: 'Hyperviseurs Type-1 bare-metal (ESXi VMkernel, Xen Dom0/DomU, KVM), virtualisation assistée par le matériel (Intel VT-x/EPT, AMD-V/RVI), calculs stricts de ratios de surallocation vCPU:pCPU et RAM overcommit, optimisation topologique NUMA/vNUMA et formats de disques VMDK (Thin, Lazy, Eager Zeroed).',
  time: '≈ 2 h 45',
  free: true,

  situation:
    'Vous êtes recruté comme ingénieur d\'infrastructure cloud et datacenter pour concevoir le socle de virtualisation d\'un nouveau centre de données bancaire. ' +
    'Votre mission consiste à sélectionner et architecturer les hyperviseurs de production bare-metal (VMware ESXi et Citrix XenServer), ' +
    'à modéliser les capacités d\'accueil physiques des serveurs bi-sockets (ratios de surallocation processeur et mémoire vive) ' +
    'et à garantir des latences d\'accès mémoire minimales en alignant rigoureusement les machines virtuelles critiques sur la topologie NUMA matérielle.',

  objectives: [
    'Maîtriser les architectures internes des hyperviseurs de Type-1 bare-metal (micro-noyaux VMkernel, Domaine 0 Xen, KVM) et les extensions matérielles processeur (Intel VT-x, EPT, AMD-V).',
    'Calculer et réguler les ratios de surallocation processeur (vCPU:pCPU) et de surallocation mémoire vive selon la criticité des charges applicatives.',
    'Analyser les topologies multi-sockets NUMA et optimiser l\'allocation vNUMA pour éliminer les pénalités de latence mémoire inter-nœuds (UPI/QPI).',
    'Comparer les politiques de provisionnement de disques virtuels VMDK (Thin, Thick Lazy Zeroed, Thick Eager Zeroed) selon les exigences d\'I/O et de conformité.'
  ],

  sections: [
    {
      title: 'Architectures d\'Hyperviseurs : Type-1 (Bare-Metal) vs Type-2 & Extensions Processeur',
      html: [
        '<p>La virtualisation d\'infrastructure repose sur un composant logiciel fondamental appelé <strong>hyperviseur</strong> (ou Virtual Machine Monitor - VMM). En environnement d\'entreprise et de Datacenter, une distinction stricte sépare les hyperviseurs de Type-1 des hyperviseurs de Type-2 :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Hyperviseur Type-1 (Bare-Metal)</h4>',
        '    <ul>',
        '      <li><strong>Exécution directe :</strong> Installé directement sur le matériel physique nu (bare-metal), sans système d\'exploitation hôte intermédiaire.</li>',
        '      <li><strong>Micro-noyau dédié :</strong> Ordonnancement temps réel des vCPUs et gestion de la mémoire par un micro-noyau propriétaire (VMware VMkernel) ou assisté (Xen Dom0).</li>',
        '      <li><strong>Performance &amp; Sécurité :</strong> Latence minimale (&lt; 2%), empreinte disque et mémoire minuscule (&lt; 150 Mo pour ESXi), surface d\'attaque réduite.</li>',
        '      <li><strong>Exemples Datacenter :</strong> VMware ESXi, Citrix Hypervisor (XenServer), Proxmox VE / KVM, Microsoft Hyper-V.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Hyperviseur Type-2 (Hébergé)</h4>',
        '    <ul>',
        '      <li><strong>Couche applicative :</strong> S\'exécute comme une application logicielle au-dessus d\'un OS généraliste standard (Windows, Linux, macOS).</li>',
        '      <li><strong>Double couche de pilotes :</strong> Les entrées/sorties passent par les pilotes de l\'OS hôte, multipliant les changements de contexte (context switches).</li>',
        '      <li><strong>Usage restreint :</strong> Réservé aux postes de développement, tests individuels et démonstrations logicielles.</li>',
        '      <li><strong>Exemples postes clients :</strong> VMware Workstation / Fusion, Oracle VM VirtualBox, QEMU en mode émulation.</li>',
        '    </ul>',
        '  </div>',
        '</div>',
        '<p>La virtualisation moderne tire parti des <strong>extensions processeur d\'assistance matérielle</strong> (Hardware-Assisted Virtualization) :</p>',
        '<ul>',
        '  <li><strong>Virtualisation Processeur (Intel VT-x / AMD-V) :</strong> Introduit un mode d\'exécution privilégié <em>VMX Root</em> pour l\'hyperviseur et <em>VMX Non-Root</em> pour les systèmes invités, éliminant la traduction binaire logicielle coûteuse.</li>',
        '  <li><strong>Virtualisation Mémoire (Intel EPT / AMD RVI / NPT) :</strong> SLAT (Second Level Address Translation) géré matériellement par le contrôleur de mémoire du CPU (MMU matérielle), traduisant directement les adresses mémoires de l\'OS invité en adresses physiques de l\'hôte sans interception logicielle.</li>',
        '  <li><strong>Virtualisation E/S (Intel VT-d / AMD-Vi) :</strong> IOMMU permettant l\'accès direct aux périphériques PCI (PCI Passthrough / DirectPath I/O) et la protection d\'isolation d\'adresses DMA.</li>',
        '</ul>'
      ].join('\n')
    },
    {
      title: 'Dimensionnement Serveur : Ratios de Surallocation vCPU:pCPU & RAM Overcommit',
      html: [
        '<p>Le principal gain économique de la virtualisation provient de la <strong>consolidation</strong> et de la <strong>surallocation (Overcommitment)</strong> : attribuer aux machines virtuelles davantage de processeurs virtuels et de mémoire que ce que le serveur possède physiquement, en misant sur le fait que toutes les VM ne consomment pas leurs ressources maximales au même instant.</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Surallocation Processeur (vCPU:pCPU Ratio)</h4>',
        '    <p>Le ratio de surallocation CPU se calcule en divisant le nombre total de cœurs virtuels alloués à l\'ensemble des VM par le nombre de cœurs physiques réels (pCPU) de l\'hôte :</p>',
        '    <pre><code>Ratio_vCPU = Somme(vCPUs_VMs) / Total_pCPUs_physiques</code></pre>',
        '    <ul>',
        '      <li><strong>1:1 à 2:1 (Conservateur) :</strong> Bases de données critiques (Oracle, MS SQL, SAP HANA) ; aucun ralentissement toléré.</li>',
        '      <li><strong>3:1 à 4:1 (Nominal Datacenter) :</strong> Serveurs applicatifs d\'entreprise, web, microservices, messagerie.</li>',
        '      <li><strong>5:1 à 8:1 (Agressif / VDI) :</strong> Postes de travail virtuels bureautiques (utilisateurs Office, navigation web).</li>',
        '      <li><strong>Seuil critique (&gt; 6:1 serveur) :</strong> Risque d\'explosion du <em>CPU Ready Time (%RDY &gt; 5%)</em>, où les VM sont en attente d\'un cœur physique disponible pour exécuter leurs instructions.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Surallocation Mémoire (RAM Overcommit)</h4>',
        '    <p>Contrairement au CPU qui est partageable dans le temps, la RAM est une ressource spatiale. VMware ESXi utilise quatre techniques étagées pour gérer la surallocation mémoire :</p>',
        '    <ol>',
        '      <li><strong>TPS (Transparent Page Sharing) :</strong> Déduplication des pages mémoire identiques (désactivé par défaut entre VM distinctes pour des raisons de sécurité de canal auxiliaire).</li>',
        '      <li><strong>Ballooning (vmmemctl) :</strong> Pilote VMware Tools gonflant un ballon dans l\'OS invité pour forcer ce dernier à libérer ses caches et swapper localement.</li>',
        '      <li><strong>Compression mémoire :</strong> Compresse les pages éligibles dans un cache mémoire dédié avant de swapper sur disque.</li>',
        '      <li><strong>Hypervisor Swap (.vswp) :</strong> Écriture forcée des pages mémoire sur le datastore ; dégradation sévère des performances.</li>',
        '    </ol>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Topologies NUMA & vNUMA : Élimination des Latences Inter-Sockets',
      html: [
        '<p>Les serveurs modernes multiprocesseurs adoptent une architecture <strong>NUMA (Non-Uniform Memory Access)</strong>. Chaque processeur physique (socket) possède son propre contrôleur de mémoire local et ses banques de RAM associées (un <em>nœud NUMA</em>). Les sockets communiquent entre eux via des bus d\'interconnexion haute vitesse (Intel UPI - Ultra Path Interconnect, AMD Infinity Fabric) :</p>',
        '<table class="table">',
        '  <thead><tr><th>Zone d\'Accès Mémoire</th><th>Chemin Matériel Emprunté</th><th>Latence Relative</th><th>Conséquence Applicative</th></tr></thead>',
        '  <tbody>',
        '    <tr><td><strong>Accès NUMA Local</strong></td><td>CPU local &rarr; Contrôleur mémoire local &rarr; RAM locale</td><td>1.0x (Référence &approx; 60 ns)</td><td>Performances optimales, débit mémoire maximal.</td></tr>',
        '    <tr><td><strong>Accès NUMA Distant (Cross-Socket)</strong></td><td>CPU local &rarr; Bus UPI/QPI &rarr; Contrôleur distant &rarr; RAM distante</td><td>1.3x à 1.5x (&approx; 90-110 ns)</td><td>Pénalité de 30% à 50% de latence sur les E/S mémoire.</td></tr>',
        '  </tbody>',
        '</table>',
        '<p>Lorsqu\'une VM est créée avec une taille mémoire ou un nombre de vCPUs supérieur à la capacité d\'un seul nœud NUMA physique (on parle de <em>Wide VM</em>), l\'hyperviseur active la topologie <strong>vNUMA (Virtual NUMA)</strong> pour exposer à l\'OS invité une topologie multi-nœuds, permettant à l\'ordonnanceur invité (Linux kernel ou Windows Server) de placer ses threads au plus près de leur mémoire allouée.</p>'
      ].join('\n')
    },
    {
      title: 'Formats de Disques Virtuels VMDK : Thin vs Thick Provisioning',
      html: [
        '<p>Chaque disque dur virtuel est stocké sur un datastore sous la forme d\'un fichier <code>.vmdk</code> (descripteur ASCII) et d\'un fichier de données <code>-flat.vmdk</code>. Trois méthodes de provisionnement existent sous VMware vSphere :</p>',
        '<div class="grid grid-3">',
        '  <div class="card">',
        '    <h4>Thin Provisioning (Dynamique)</h4>',
        '    <p>Le fichier disque ne consomme initialement que l\'espace réellement écrit par l\'OS invité, et grossit dynamiquement jusqu\'au quota maximal.</p>',
        '    <ul>',
        '      <li><strong>Avantage :</strong> Économie maximale d\'espace de stockage.</li>',
        '      <li><strong>Inconvénient :</strong> Risque d\'épuisement de capacité globale du Datastore si toutes les VM écrivent simultanément ; légère latence lors de l\'allocation des nouveaux blocs.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Thick Lazy Zeroed</h4>',
        '    <p>L\'espace disque total est alloué et réservé immédiatement sur le datastore, mais les blocs ne sont mis à zéro qu\'à la première écriture par la VM.</p>',
        '    <ul>',
        '      <li><strong>Avantage :</strong> Création rapide, espace garanti sans surallocation cachée.</li>',
        '      <li><strong>Inconvénient :</strong> Pénalité de latence sur la première écriture de chaque bloc (écriture de zéros avant la donnée).</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Thick Eager Zeroed</h4>',
        '    <p>L\'intégralité de l\'espace disque est allouée et tous les blocs sont écrasés avec des zéros dès la création du disque virtuel.</p>',
        '    <ul>',
        '      <li><strong>Avantage :</strong> Performances d\'I/O optimales et prévisibles dès le premier octet.</li>',
        '      <li><strong>Obligatoire pour :</strong> vSphere Fault Tolerance (FT) et clusters de disques partagés (MSCS / WSFC).</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],

  methodTitle: 'Méthodologie d\'Ingénierie : Dimensionnement & Validation d\'un Hôte ESXi',
  method: [
    'Recenser les caractéristiques matérielles physiques du serveur hôte : nombre de sockets, cœurs par socket, cœurs totaux (sans Hyper-Threading pour le dimensionnement garanti) et RAM totale répartie par nœud NUMA.',
    'Inventorier les machines virtuelles à héberger (vCPUs et RAM allouée) et calculer les ratios de surallocation vCPU:pCPU et RAM overcommit.',
    'Vérifier que les ratios respectent les plafonds contractuels (ex: vCPU &le; 4.0:1 pour serveurs de production, RAM overcommit &le; 1.25:1 avec seuil d\'alerte ballooning).',
    'Confronter chaque VM critique (Wide VM) à la taille d\'un nœud NUMA physique pour éviter les traversées de bus UPI/QPI non maîtrisées.'
  ],

  summary: [
    'Les hyperviseurs Type-1 bare-metal s\'exécutent directement sur le matériel avec une empreinte minimale, offrant latence ultra-faible et haute résilience en Datacenter.',
    'L\'assistance matérielle (Intel VT-x/EPT, AMD-V/RVI) décharge la virtualisation du CPU et de la mémoire directement dans le silicium sans traduction logicielle.',
    'Le ratio de surallocation processeur (vCPU:pCPU) ne doit pas excéder 3:1 à 4:1 sur des serveurs applicatifs sous peine de provoquer un CPU Ready Time (%RDY) destructeur.',
    'L\'architecture NUMA exige de maintenir les machines virtuelles dans les frontières d\'un nœud local pour éviter une pénalité de latence mémoire de 30% à 50% sur les bus inter-sockets.',
    'Le provisionnement VMDK Thick Eager Zeroed garantit des I/O sans latence de mise à zéro initiale et constitue une exigence stricte pour vSphere Fault Tolerance.'
  ],

  checklist: [
    'Les extensions matérielles Intel VT-x/AMD-V et VT-d/AMD-Vi sont-elles activées dans le BIOS/UEFI du serveur ?',
    'Le ratio de surallocation processeur global de l\'hôte ou du cluster est-il calculé et inférieur au seuil contractuel ?',
    'Le dimensionnement mémoire des VM les plus consommatrices s\'inscrit-il dans la limite d\'un nœud NUMA physique ?',
    'Le format de disque VMDK est-il sélectionné selon le compromis performance/capacité (Thin vs Eager Zeroed) ?',
    'Les agents VMware Tools ou Citrix Guest Utilities sont-ils installés pour activer le pilote de ballooning mémoire ?'
  ],

  notions: [
    { term: 'Hyperviseur Type-1', def: 'Logiciel de virtualisation bare-metal s\'exécutant directement sur le matériel physique nu du serveur (ex: VMware ESXi, XenServer).' },
    { term: 'VMkernel', def: 'Micro-noyau d\'exploitation propriétaire de VMware ESXi assurant l\'ordonnancement CPU, la gestion mémoire et les accès réseau/stockage.' },
    { term: 'Intel VT-x / AMD-V', def: 'Extensions de virtualisation matérielle du processeur introduisant le mode d\'exécution privilégié VMX Root/Non-Root.' },
    { term: 'SLAT / EPT', def: 'Second Level Address Translation (Extended Page Tables) : virtualisation matérielle de la mémoire gérée par le contrôleur mémoire du CPU.' },
    { term: 'Ratio vCPU:pCPU', def: 'Rapport entre le nombre de processeurs virtuels alloués à l\'ensemble des VM et le nombre de cœurs physiques réels de l\'hôte.' },
    { term: 'NUMA (Non-Uniform Memory Access)', def: 'Architecture multiprocesseur où la mémoire physique est partitionnée en nœuds locaux rattachés directement à chaque socket.' },
    { term: 'CPU Ready Time (%RDY)', def: 'Pourcentage de temps pendant lequel une machine virtuelle prête à exécuter des instructions doit patienter qu\'un cœur physique se libère.' },
    { term: 'Thick Eager Zeroed', def: 'Format de disque virtuel VMDK où tous les blocs de données sont alloués et écrasés avec des zéros dès la création pour des performances maximales.' }
  ],

  pitfalls: [
    {
      mistake: 'Allouer trop de vCPUs à une machine virtuelle (sur-allocation de vCPUs par VM).',
      why: 'L\'ordonnanceur du VMkernel doit synchroniser l\'accès à autant de cœurs physiques que de vCPUs ; une VM à 8 vCPUs peu chargée subira plus de CPU Ready Time qu\'une VM bien taillée à 2 vCPUs.',
      fix: 'Dimensionner les VM au plus juste (commencer par 2 vCPUs) et n\'augmenter qu\'après analyse des compteurs de charge réels.'
    },
    {
      mistake: 'Ignorer la frontière NUMA lors de l\'allocation mémoire d\'une base de données critique.',
      why: 'Dépasser la mémoire d\'un socket contraint l\'hyperviseur à allouer de la mémoire sur le second socket, entraînant des traversées constantes du bus UPI à haute latence.',
      fix: 'Ajuster la RAM de la VM pour qu\'elle ne dépasse pas la RAM d\'un nœud NUMA, ou configurer explicitement les sockets virtuels vNUMA.'
    },
    {
      mistake: 'Utiliser du Thin Provisioning sans surveillance active de l\'espace disponible du Datastore.',
      why: 'Si plusieurs VM étendent simultanément leurs disques virtuels et saturent le datastore physique, toutes les VM hébergées sont suspendues brutalement par l\'hyperviseur.',
      fix: 'Configurer des alertes vCenter de seuil d\'espace disque à 75% et 85%, ou provisionner en Thick Lazy/Eager Zeroed.'
    },
    {
      mistake: 'Compter les threads Hyper-Threading (SMT) comme de véritables cœurs physiques de calcul.',
      why: 'Un thread Hyper-Threading n\'offre que 20% à 30% de capacité de calcul supplémentaire d\'un cœur physique complet ; baser le dimensionnement 1:1 sur les threads crée une sous-capacité masquée.',
      fix: 'Calculer le ratio de consolidation strict sur la base des cœurs physiques réels (pCPUs) sans doubler par l\'Hyper-Threading.'
    }
  ],

  questions: [
    {
      q: 'Quelle est la caractéristique fondamentale d\'un hyperviseur de Type-1 par rapport à un hyperviseur de Type-2 ?',
      opts: [
        'Il s\'exécute directement sur le matériel physique sans OS hôte sous-jacent.',
        'Il nécessite obligatoirement Windows Server pour gérer ses pilotes d\'E/S.',
        'Il ne permet de virtualiser que des conteneurs légers de type Docker.',
        'Il utilise exclusivement une émulation logicielle complète de processeur.'
      ],
      correct: 0,
      exp: 'L\'hyperviseur de Type-1 bare-metal (comme VMware ESXi ou XenServer) s\'installe directement sur le serveur physique nu et contrôle directement les ressources sans système d\'exploitation intermédiaire.'
    },
    {
      q: 'À quoi sert la technologie matérielle Intel EPT (Extended Page Tables) / AMD RVI ?',
      opts: [
        'À chiffrer les disques durs virtuels à la volée sur le contrôleur SAS.',
        'À assurer la traduction matérielle d\'adresses mémoire de l\'OS invité vers l\'hôte (SLAT).',
        'À émuler une carte graphique 3D dédiée pour chaque machine virtuelle.',
        'À fusionner les cartes réseaux physiques en un agrégat de liens 802.3ad.'
      ],
      correct: 1,
      exp: 'Intel EPT et AMD RVI (SLAT) fournissent une virtualisation matérielle de la mémoire (MMU) gérant la correspondance entre adresses mémoires virtuelles et physiques au niveau du processeur sans interception logicielle.'
    },
    {
      q: 'Sur un serveur hôte disposant de 32 cœurs physiques (pCPUs), quel ratio vCPU:pCPU obtient-on si l\'on héberge 20 VM dotées de 4 vCPUs chacune ?',
      opts: [
        '1.25 : 1',
        '2.50 : 1',
        '0.40 : 1',
        '4.00 : 1'
      ],
      correct: 1,
      exp: 'Total vCPUs alloués = 20 * 4 = 80 vCPUs. Ratio de surallocation = 80 / 32 = 2.50:1. C\'est un ratio modéré et sain pour des serveurs d\'entreprise.'
    },
    {
      q: 'Quel indicateur de performance vSphere signale qu\'un ratio de surallocation CPU devient critique et dégrade les VM ?',
      opts: [
        'Le temps d\'attente CPU Ready Time (%RDY) supérieur à 5%.',
        'Le temps de cache L3 supérieur à 10 microsecondes.',
        'Le taux de trames jumbo frames réseau supérieur à 9000 octets.',
        'Le nombre de paquets ICMP émis par la passerelle de management.'
      ],
      correct: 0,
      exp: 'Le CPU Ready Time (%RDY) mesure le pourcentage de temps où une VM est prête à exécuter des cycles d\'instructions mais doit attendre que le VMkernel lui alloue un cœur physique. Un %RDY > 5% dégrade sensiblement les performances.'
    },
    {
      q: 'Quelle est la conséquence si une machine virtuelle monopolise de la mémoire sur deux nœuds NUMA physiques distincts (accès cross-socket) ?',
      opts: [
        'L\'hyperviseur plante immédiatement avec un écran violet PSOD.',
        'Les accès mémoire distants traversent le bus inter-socket avec une latence accrue de 30% à 50%.',
        'Le disque dur virtuel est automatiquement converti en format Thin.',
        'L\'OS invité refuse de démarrer tant que le BIOS n\'est pas mis à jour.'
      ],
      correct: 1,
      exp: 'Lorsque la mémoire d\'une VM dépasse la capacité d\'un nœud NUMA local, les accès aux banques de mémoire du second socket traversent le bus d\'interconnexion (Intel UPI / AMD Infinity Fabric) avec une pénalité de latence mesurée de 30% à 50%.'
    },
    {
      q: 'Quelle est la première technique activée par VMware ESXi pour récupérer de la mémoire vive en situation de surallocation avant de swapper sur disque ?',
      opts: [
        'Le gonflage du pilote de Ballooning (vmmemctl) dans le système d\'exploitation invité.',
        'La suppression automatique des fichiers de snapshots différentiels.',
        'L\'arrêt forcé sans préavis des machines virtuelles les moins prioritaires.',
        'La réinitialisation des cartes réseaux virtuelles VMXNET3.'
      ],
      correct: 0,
      exp: 'Le mécanisme de Ballooning gonfle un faux pilote mémoire dans l\'OS invité, ce qui pousse l\'OS à vider ses propres caches disque et à libérer de la mémoire physique sans dégradation violente pour l\'hyperviseur.'
    },
    {
      q: 'Quel format de disque VMDK est obligatoirement requis par la fonctionnalité vSphere Fault Tolerance (FT) ?',
      opts: [
        'Thin Provisioning dynamique.',
        'Thick Provisioning Lazy Zeroed.',
        'Thick Provisioning Eager Zeroed.',
        'Raw Device Mapping (RDM) en mode virtuel.'
      ],
      correct: 2,
      exp: 'vSphere FT requiert impérativement des disques Thick Eager Zeroed afin de garantir que tous les blocs sont immédiatement réservés et mis à zéro, interdisant toute latence d\'allocation lors de la synchronisation Lockstep.'
    },
    {
      q: 'Pourquoi est-il déconseillé de dimensionner une VM avec 16 vCPUs si ses applications n\'en consomment que 2 ?',
      opts: [
        'L\'ordonnanceur du VMkernel doit co-ordonnancer les vCPUs, ce qui augmente le CPU Ready Time inutilement.',
        'Le fichier .vmx dépasse la taille maximale autorisée de 1 Mo.',
        'L\'interface réseau VMXNET3 cesse de négocier le débit 10 Gbps.',
        'Le système d\'exploitation invité se verrouille en mode sans échec.'
      ],
      correct: 0,
      exp: 'La co-ordonnancement (Co-scheduling) impose au VMkernel de trouver des cœurs physiques disponibles simultanément pour exécuter les vCPUs d\'une VM. Une VM surdimensionnée génère une contention artificielle et attend inutilement les cœurs.'
    }
  ],

  flashcards: [
    {
      q: 'Qu\'est-ce qu\'un hyperviseur Type-1 bare-metal ?',
      a: 'Un hyperviseur logiciel installé directement sur le matériel nu du serveur (ex: ESXi, XenServer), garantissant latence ultra-faible et haute résilience.'
    },
    {
      q: 'Quel est le rôle d\'Intel VT-x et AMD-V ?',
      a: 'Fournir une assistance matérielle au CPU pour l\'exécution des machines virtuelles via les modes VMX Root (hyperviseur) et VMX Non-Root (invités).'
    },
    {
      q: 'Comment se calcule le ratio de surallocation processeur vCPU:pCPU ?',
      a: 'Total des vCPUs alloués aux VM divisé par le nombre total de cœurs physiques réels (pCPUs) de l\'hôte serveur.'
    },
    {
      q: 'Qu\'est-ce que l\'architecture NUMA ?',
      a: 'Une architecture où la mémoire physique est partitionnée en nœuds locaux rattachés directement à chaque socket processeur, avec un temps d\'accès variable.'
    },
    {
      q: 'Quelle est la différence entre un disque Thin et Thick Eager Zeroed ?',
      a: 'Thin n\'alloue l\'espace disque qu\'au fur et à mesure des écritures réelles ; Thick Eager Zeroed réserve tout l\'espace et écrit des zéros dès sa création.'
    },
    {
      q: 'Quel seuil de CPU Ready Time (%RDY) indique une saturation CPU préjudiciable ?',
      a: 'Un CPU Ready Time supérieur à 5% par vCPU signale une dégradation mesurable des performances due à une contention processeur.'
    }
  ],

  mastery: [
    'Distinguer les hyperviseurs Type-1 bare-metal des Type-2 et identifier les technologies Intel VT-x/EPT et AMD-V/RVI.',
    'Calculer avec précision les ratios de surallocation processeur vCPU:pCPU et mémoire vive d\'un serveur.',
    'Interpréter les topologies multi-sockets NUMA et dimensionner les machines virtuelles pour rester dans un nœud local.',
    'Sélectionner judicieusement le format de disque virtuel VMDK (Thin, Lazy Zeroed, Eager Zeroed) selon la charge d\'E/S.',
    'Diagnostiquer les goulots d\'étranglement de surallocation (CPU Ready Time %RDY et Ballooning) et optimiser le placement vNUMA.'
  ]
};
