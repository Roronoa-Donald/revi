/**
 * Module 3 — Stockage Virtuel Datastores, VMFS-6 & Architectures Hyperconvergées vSAN
 * Cours « Virtualisation Avancée B3 »
 */
'use strict';

module.exports = {
  n: 3,
  title: 'Stockage Virtuel Datastores, VMFS-6 & Architectures Hyperconvergées vSAN',
  short: 'Stockage VMFS & vSAN',
  toc: 'Protocoles de stockage de Datacenter (iSCSI, Fibre Channel, NFS v4.1), système de fichiers clustered VMFS-6 et primitives VAAI (ATS, UNMAP), architectures hyperconvergées VMware vSAN (Disk Groups, cache NVMe), politiques SPBM (FTT, RAID-1, RAID-5/6, Slack Space 20%) et multipathing NMP.',
  time: '≈ 2 h 45',
  free: false,

  situation:
    'Vous êtes missionné pour concevoir l\'architecture de stockage partagé d\'un cluster de calcul hébergeant des bases de données de production et des centaines de serveurs virtualisés. ' +
    'Vous devez arbitrer entre un stockage SAN iSCSI optimisé par Jumbo Frames (MTU 9000), un système de fichiers en cluster VMFS-6 sécurisé par les primitives matérielles VAAI ATS, ' +
    'et un cluster hyperconvergé VMware vSAN tout-flash. Vous modélisez les politiques de stockage SPBM (FTT-1, FTT-2) ' +
    'et calculez rigoureusement l\'espace brut requis en intégrant la réserve indispensable de Slack Space pour garantir la résilience du cluster.',

  objectives: [
    'Comparer les protocoles de stockage d\'entreprise (iSCSI, Fibre Channel, NFS) et dimensionner les liaisons IP de stockage avec Jumbo Frames (MTU 9000).',
    'Comprendre l\'architecture distribuée de VMFS-6 et le rôle des primitives VAAI (Atomic Test and Set, XCOPY, UNMAP automatique).',
    'Configurer le multipathing VMware NMP et optimiser le débit par agrégation de chemins avec la politique Round Robin (PSP RR).',
    'Dimensionner une infrastructure hyperconvergée VMware vSAN, appliquer les politiques SPBM (RAID-1, RAID-5/6) et respecter le Slack Space de 20%.'
  ],

  sections: [
    {
      title: 'Protocoles de Stockage Datacenter : SAN Bloc (FC, iSCSI) vs NAS Fichier (NFS)',
      html: [
        '<p>Dans un environnement virtualisé d\'entreprise, les machines virtuelles ne résident pas sur les disques locaux isolés des serveurs, mais sur du <strong>stockage partagé</strong> accessible par l\'ensemble des nœuds du cluster pour autoriser la haute disponibilité et les migrations :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Stockage Bloc : SAN Fibre Channel &amp; iSCSI</h4>',
        '    <ul>',
        '      <li><strong>Présentation :</strong> La baie de stockage expose des LUNs (Logical Unit Numbers) brutes. L\'hyperviseur formate le LUN avec son propre système de fichiers clustered (VMFS).</li>',
        '      <li><strong>Fibre Channel (FC) :</strong> Protocole sans perte dédié sur réseau optique (8, 16, 32 Gbps) avec adaptateurs HBA matériels. Fiabilité maximale, coût élevé.</li>',
        '      <li><strong>iSCSI :</strong> Encapsule les commandes SCSI dans des paquets TCP/IP (port 3260). Utilise le réseau Ethernet standard avec cartes réseau 10G/25G et initiateur logiciel VMkernel.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Stockage Fichier : NAS NFS (v3 &amp; v4.1)</h4>',
        '    <ul>',
        '      <li><strong>Présentation :</strong> La baie NAS gère elle-même son système de fichiers (ZFS, WAFL) et expose des partages réseau montés par le VMkernel.</li>',
        '      <li><strong>Simplicité :</strong> Pas de formatage VMFS par l\'hôte ; les fichiers VMDK sont stockés directement sous forme de fichiers distants.</li>',
        '      <li><strong>NFS v4.1 :</strong> Apporte le support du multipathing matériel (Session Trunking) et de l\'authentification Kerberos sécurisée.</li>',
        '    </ul>',
        '  </div>',
        '</div>',
        '<p>Pour les réseaux de stockage IP (iSCSI et NFS), l\'activation des <strong>Jumbo Frames (MTU 9000 octets au lieu de 1500)</strong> de bout en bout (carte VMkernel, vSwitch, commutateurs physiques et contrôleurs de baie) est indispensable : elle divise par six le nombre d\'interruptions processeur par seconde et accroît le débit utile de 15% à 25%.</p>'
      ].join('\n')
    },
    {
      title: 'Système de Fichiers Clustered VMFS-6 & Primitives d\'Accélération VAAI',
      html: [
        '<p><strong>VMFS-6 (Virtual Machine File System)</strong> est un système de fichiers en cluster propriétaire développé par VMware, permettant à des dizaines de serveurs ESXi de lire et d\'écrire simultanément sur le même LUN SAN sans risquer de corrompre les données :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Mécanismes Clés de VMFS-6</h4>',
        '    <ul>',
        '      <li><strong>Allocation multi-extents :</strong> Supporte des datastores massifs jusqu\'à 64 To par LUN avec une taille de bloc unifiée de 1 Mo.</li>',
        '      <li><strong>Désallocation automatique UNMAP :</strong> Libère automatiquement les blocs d\'espace disque sur la baie sous-jacente lorsqu\'une VM ou un snapshot est supprimé.</li>',
        '      <li><strong>Snapshot SEsparse par défaut :</strong> Format de snapshot haute performance optimisé pour les disques de plus de 2 To.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Primitives Matérielles VAAI (vStorage APIs for Array Integration)</h4>',
        '    <ul>',
        '      <li><strong>ATS (Atomic Test and Set) :</strong> Remplace le verrouillage global SCSI (SCSI reservation) par un verrouillage ultra-fin bloc par bloc pour la mise à jour des métadonnées.</li>',
        '      <li><strong>XCOPY (Extended Copy) :</strong> Décharge le clonage et le déplacement de VMDK directement sur les contrôleurs de la baie de stockage sans solliciter le réseau ni le CPU ESXi.</li>',
        '      <li><strong>Write Same (Zeroing) :</strong> Ordonne à la baie d\'écrire des blocs de zéros à haute vitesse lors du provisionnement Thick Eager Zeroed.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Multipathing NMP & Politiques de Sélection de Chemin (PSP)',
      html: [
        '<p>Pour garantir la résilience et le débit d\'accès au stockage SAN, chaque hôte ESXi est relié à la baie via au moins deux contrôleurs physiques redondants (chemins multiples). Le sous-système <strong>NMP (Native Multipathing Plugin)</strong> gère le basculement et l\'équilibrage grâce aux modules <strong>PSP (Path Selection Plugin)</strong> :</p>',
        '<table class="table">',
        '  <thead><tr><th>Politique PSP</th><th>Comportement Opérationnel</th><th>Usage &amp; Recommandation</th></tr></thead>',
        '  <tbody>',
        '    <tr><td><strong>Round Robin (VMW_PSP_RR)</strong></td><td>Distribue les commandes d\'E/S successivement sur l\'ensemble des chemins actifs (toutes les 1000 E/S par défaut, ou 1 E/S en mode optimisé).</td><td><strong>Recommandé :</strong> Agrège la bande passante de plusieurs liens 10G/16G et offre une tolérance de panne immédiate.</td></tr>',
        '    <tr><td><strong>Fixed (VMW_PSP_FIXED)</strong></td><td>Utilise un chemin primaire désigné par l\'administrateur ; ne bascule sur le chemin secondaire qu\'en cas de coupure physique.</td><td>Adapté aux baies Actif/Passif traditionnelles sans ALUA.</td></tr>',
        '    <tr><td><strong>Most Recently Used (VMW_PSP_MRU)</strong></td><td>Conserve le chemin en cours d\'utilisation jusqu\'à ce qu\'une panne survienne, sans jamais revenir en arrière (pas de failback automatique).</td><td>Obligatoire sur les baies Actif/Passif asymétriques pour éviter le phénomène de ping-pong de LUN.</td></tr>',
        '  </tbody>',
        '</table>'
      ].join('\n')
    },
    {
      title: 'Architectures Hyperconvergées vSAN & Politiques SPBM (FTT, RAID-1, RAID-5/6)',
      html: [
        '<p><strong>VMware vSAN (Virtual SAN)</strong> remplace les baies de stockage externes traditionnelles par une architecture <strong>hyperconvergée (HCI)</strong> : les disques internes (SSD NVMe, SSD SAS) installés localement dans chaque serveur ESXi du cluster sont regroupés en un datastore partagé unique et distribué :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Structure des Disk Groups vSAN</h4>',
        '    <ul>',
        '      <li>Chaque hôte possède de 1 à 5 groupes de disques (Disk Groups).</li>',
        '      <li><strong>1 Disque de Cache (obligatoire) :</strong> SSD ultra-rapide ou NVMe (100% dédié aux écritures dans une architecture All-Flash).</li>',
        '      <li><strong>1 à 7 Disques de Capacité :</strong> Disques flash assurant la persistance des données.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Politiques SPBM &amp; Slack Space</h4>',
        '    <ul>',
        '      <li><strong>FTT=1_RAID1 (Miroir) :</strong> Multiplicateur 2.0x (min 3 hôtes). Tolère 1 panne de nœud.</li>',
        '      <li><strong>FTT=1_RAID5 (Erasure Coding 3+1) :</strong> Multiplicateur 1.33x (min 4 hôtes). Économise 33% d\'espace.</li>',
        '      <li><strong>FTT=2_RAID6 (Erasure Coding 4+2) :</strong> Multiplicateur 1.50x (min 6 hôtes). Tolère 2 pannes simultanées.</li>',
        '      <li><strong>Réserve Slack Space (20%) :</strong> Marge brute obligatoire pour permettre à vSAN de reconstruire automatiquement les composants en cas de panne d\'un disque ou d\'un serveur.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],

  methodTitle: 'Méthodologie d\'Ingénierie : Dimensionnement & Audit de Capacité vSAN',
  method: [
    'Calculer la capacité brute totale du cluster vSAN en sommant la capacité des disques de persistance de tous les nœuds.',
    'Retrancher immédiatement la réserve de Slack Space opérationnelle de 20% (Capacité_Utile = Capacité_Brute * 0.80).',
    'Identifier la politique SPBM requise pour chaque niveau de service applicatif (RAID-1 pour performances I/O, RAID-5/6 pour optimisation d\'espace).',
    'Multiplier le volume des données des VM par le facteur SPBM et vérifier que l\'espace consommé ne dépasse pas 85% de la limite utile.'
  ],

  summary: [
    'Le stockage partagé Datacenter repose sur les protocoles bloc (Fibre Channel, iSCSI) ou fichier (NFS v3/v4.1).',
    'Les Jumbo Frames (MTU 9000) sont indispensables sur les réseaux de stockage IP pour réduire les interruptions CPU et maximiser le débit.',
    'VMFS-6 permet l\'accès concurrent de plusieurs dizaines d\'hôtes ESXi grâce aux primitives matérielles VAAI comme ATS (verrouillage de bloc fin).',
    'Le multipathing Round Robin (PSP RR) agrège les débits de multiples liens de stockage et assure un basculement instantané.',
    'VMware vSAN regroupe les disques locaux en stockage distribué dont la capacité utile nette dépend des règles SPBM et du Slack Space de 20%.'
  ],

  checklist: [
    'La valeur de MTU 9000 est-elle configurée de bout en bout (VMkernel, vSwitch, switchs physiques et baie iSCSI/NFS) ?',
    'La primitive VAAI ATS est-elle prise en charge et active sur tous les LUNs de stockage VMFS-6 ?',
    'La politique de sélection de chemin NMP est-elle définie sur Round Robin pour répartir les E/S sur tous les liens ?',
    'Le cluster vSAN dispose-t-il du nombre minimal d\'hôtes physiques requis par la politique SPBM ciblée (min 4 pour RAID-5, min 6 pour RAID-6) ?',
    'L\'espace consommé sur le datastore vSAN reste-t-il en dessous du seuil d\'alerte de 80% pour préserver le Slack Space ?'
  ],

  notions: [
    { term: 'VMFS-6', def: 'Système de fichiers en cluster propriétaire VMware permettant l\'accès simultané multi-hôtes à un même LUN SAN.' },
    { term: 'VAAI (vStorage APIs for Array Integration)', def: 'Jeu de primitives matérielles déchargeant les opérations de verrouillage (ATS), copie (XCOPY) et mise à zéro sur la baie.' },
    { term: 'ATS (Atomic Test and Set)', def: 'Primitive SCSI VAAI permettant de verrouiller un secteur individuel de métadonnées sans bloquer l\'ensemble du LUN.' },
    { term: 'Jumbo Frames', def: 'Trames Ethernet dont la taille de charge utile (MTU) est portée à 9000 octets pour optimiser les flux de stockage IP.' },
    { term: 'Multipathing NMP', def: 'Sous-système de gestion des chemins multiples entre un hôte ESXi et une baie de stockage pour assurer redondance et débit.' },
    { term: 'VMware vSAN', def: 'Solution de stockage hyperconvergé agrégeant les disques flash locaux des serveurs ESXi en un datastore distribué unique.' },
    { term: 'SPBM (Storage Policy-Based Management)', def: 'Mécanisme vSphere appliquant des règles logiques de redondance (FTT, RAID) par machine virtuelle.' },
    { term: 'Slack Space vSAN', def: 'Réserve obligatoire de 20% de l\'espace brut d\'un cluster vSAN réservée aux opérations de reconstruction interne en cas de sinistre.' }
  ],

  pitfalls: [
    {
      mistake: 'Configurer le MTU à 9000 sur l\'interface VMkernel mais oublier de l\'activer sur le commutateur réseau physique.',
      why: 'Les paquets de plus de 1500 octets sont brutalement rejetés par le switch physique (drop de trames), coupant complètement l\'accès au stockage.',
      fix: 'Valider impérativement le MTU 9000 de bout en bout à l\'aide de la commande `vmkping -d -s 8972 <IP_Cible>`.'
    },
    {
      mistake: 'Saturer l\'espace d\'un cluster vSAN au-delà de 80% de sa capacité brute.',
      why: 'Si un disque ou un nœud tombe en panne, vSAN ne dispose plus de l\'espace nécessaire pour reconstruire les objets miroirs, entraînant une perte de données potentielle.',
      fix: 'Considérer 80% de la capacité brute comme la limite absolue de remplissage du cluster vSAN.'
    },
    {
      mistake: 'Appliquer une politique FTT=1 RAID-5 sur un cluster vSAN ne comportant que 3 hôtes physiques.',
      why: 'RAID-5 (Erasure Coding 3+1) exige un strict minimum de 4 hôtes distincts pour placer les 3 blocs de données et le bloc de parité sur des nœuds séparés.',
      fix: 'Utiliser FTT=1 RAID-1 (miroir) sur 3 nœuds, ou étendre le cluster à 4 hôtes minimum avant d\'activer le RAID-5.'
    },
    {
      mistake: 'Laisser la politique de multipathing sur Fixed avec un seul chemin actif sur une baie moderne Actif/Actif.',
      why: 'En cas de surcharge du lien, le second lien physique reste totalement inactif et la bande passante globale est divisée par deux.',
      fix: 'Configurer la politique Path Selection Plugin sur Round Robin (VMW_PSP_RR) pour agréger dynamiquement les flux.'
    }
  ],

  questions: [
    {
      q: 'Quel protocole de stockage utilise des adaptateurs matériels HBA dédiés et des câbles optiques sur un réseau de stockage dédié sans perte ?',
      opts: [
        'Fibre Channel (FC).',
        'NFS v3 sur réseau Ethernet partagé.',
        'iSCSI logiciel avec adresses IP publiques.',
        'SMB 3.0 sur port 445.'
      ],
      correct: 0,
      exp: 'Fibre Channel (FC) est un réseau SAN dédié à haute performance utilisant des adaptateurs de bus hôte (HBA) matériels et un protocole sans perte (Lossless) indépendant du réseau Ethernet standard.'
    },
    {
      q: 'Quelle primitive matérielle VAAI remplace le verrouillage global de LUN (SCSI reservation) par un verrouillage ultra-fin bloc par bloc ?',
      opts: [
        'ATS (Atomic Test and Set).',
        'XCOPY (Extended Copy).',
        'UNMAP (Block Space Reclamation).',
        'Write Same (Zeroing Offload).'
      ],
      correct: 0,
      exp: 'ATS (Atomic Test and Set) permet aux hôtes ESXi de modifier des métadonnées de datastore en verrouillant uniquement le secteur concerné plutôt que l\'intégralité du LUN, évitant les blocages d\'E/S.'
    },
    {
      q: 'Pourquoi configure-t-on un MTU de 9000 octets (Jumbo Frames) sur les interfaces réseau dédiées au stockage iSCSI ?',
      opts: [
        'Pour réduire le nombre de paquets par seconde, diminuant la charge CPU et augmentant le débit utile.',
        'Pour crypter automatiquement les échanges de trames avec l\'algorithme AES-256.',
        'Pour empêcher les attaques par déni de service SYN flood sur le port 3260.',
        'Pour permettre le routage des paquets sur Internet sans passerelle par défaut.'
      ],
      correct: 0,
      exp: 'Transporter 9000 octets par trame au lieu de 1500 réduit par six le nombre d\'en-têtes et d\'interruptions système traitées par les processeurs, optimisant considérablement le débit d\'E/S.'
    },
    {
      q: 'Combien d\'hôtes physiques distincts sont au minimum requis pour déployer la politique de stockage vSAN `FTT=1_RAID5` (Erasure Coding 3+1) ?',
      opts: [
        '4 hôtes minimum.',
        '2 hôtes avec un disque témoin externe.',
        '3 hôtes physiques.',
        '6 hôtes minimum.'
      ],
      correct: 0,
      exp: 'La règle vSAN FTT=1 RAID-5 distribue les blocs selon un schéma 3+1 (3 blocs de données et 1 bloc de parité). Chacun des 4 composants devant résider sur un hôte différent, 4 hôtes sont obligatoires.'
    },
    {
      q: 'Quel est le multiplicateur de consommation brute pour une machine virtuelle dont le disque utile fait 10 To sous la politique vSAN `FTT=1_RAID1` ?',
      opts: [
        '2.00x (soit 20 To bruts consommés).',
        '1.33x (soit 13.3 To bruts consommés).',
        '1.00x (aucun surcoût d\'espace).',
        '3.00x (soit 30 To bruts consommés).'
      ],
      correct: 0,
      exp: 'La politique FTT=1 RAID-1 applique un miroir classique à deux copies identiques (plus un témoin). Le volume brut consommé sur les disques est exactement le double du volume utile (multiplicateur 2.0x).'
    },
    {
      q: 'Pourquoi VMware impose-t-il une réserve opérationnelle de 20% (Slack Space) sur un cluster de stockage vSAN ?',
      opts: [
        'Pour permettre la reconstruction automatique des données en cas de défaillance d\'un hôte ou d\'un disque.',
        'Pour héberger les fichiers ISO d\'installation des systèmes d\'exploitation invités.',
        'Pour stocker les logs d\'audit de vCenter Server en cas de perte de connectivité.',
        'Pour allouer la mémoire swap de l\'hyperviseur sur les disques mécaniques.'
      ],
      correct: 0,
      exp: 'Le Slack Space de 20% garantit qu\'en cas de perte physique d\'un serveur ou d\'un disque de capacité, le cluster dispose de l\'espace libre nécessaire pour resynchroniser et restaurer le niveau de protection configuré.'
    },
    {
      q: 'Quelle politique de sélection de chemins NMP (PSP) distribue les E/S sur l\'ensemble des liens de stockage pour maximiser la bande passante ?',
      opts: [
        'Round Robin (VMW_PSP_RR).',
        'Fixed (VMW_PSP_FIXED).',
        'Most Recently Used (VMW_PSP_MRU).',
        'Single Path Direct.'
      ],
      correct: 0,
      exp: 'La politique Round Robin alterne les requêtes d\'E/S entre tous les chemins actifs disponibles vers la baie de stockage, assurant une répartition équitable de la charge et un basculement transparent.'
    },
    {
      q: 'Dans un groupe de disques (Disk Group) vSAN en architecture All-Flash, à quoi sert le disque dédié au cache ?',
      opts: [
        'À absorber 100% du tampon d\'écriture (Write Buffer) avant déchargement sur les disques de capacité.',
        'À stocker les copies de sauvegarde Veeam hebdomadaires.',
        'À faire office de mémoire vive RAM de substitution pour les machines virtuelles.',
        'À exécuter le micro-noyau VMkernel d\'ESXi sans clé USB.'
      ],
      correct: 0,
      exp: 'En architecture vSAN All-Flash, le cache est composé d\'un SSD haute endurance ou NVMe dédié à 100% au tampon d\'écriture rapide (Write Buffer), les lectures s\'effectuant directement sur les disques de capacité flash.'
    }
  ],

  flashcards: [
    {
      q: 'Quelle est la différence fondamentale entre stockage SAN et NAS ?',
      a: 'Le SAN présente des LUNs au niveau bloc formatées par l\'hôte (VMFS), tandis que le NAS présente des partages de fichiers distants (NFS).'
    },
    {
      q: 'Quel est l\'intérêt de la primitive VAAI ATS ?',
      a: 'Verrouiller un secteur ou un bloc spécifique de métadonnées sans verrouiller l\'ensemble du LUN SAN lors des accès concurrents.'
    },
    {
      q: 'Pourquoi active-t-on le MTU 9000 (Jumbo Frames) pour le stockage IP ?',
      a: 'Pour réduire par six les interruptions processeur, diminuer les en-têtes réseau et accroître le débit utile de 15% à 25%.'
    },
    {
      q: 'Quel est le rôle de la politique PSP Round Robin sous VMware NMP ?',
      a: 'Alterner et agréger les entrées/sorties sur l\'ensemble des chemins actifs reliant l\'hôte à la baie de stockage partagé.'
    },
    {
      q: 'Combien d\'hôtes minimum sont nécessaires pour la politique vSAN FTT=1 RAID-5 ?',
      a: '4 hôtes physiques minimum sont obligatoires pour distribuer les 3 blocs de données et le bloc de parité sur des nœuds distincts.'
    },
    {
      q: 'Qu\'est-ce que le Slack Space sur un cluster vSAN ?',
      a: 'Une réserve d\'espace brut de 20% indispensable pour permettre à vSAN de reconstruire automatiquement les composants en cas de panne matérielle.'
    }
  ],

  mastery: [
    'Dimensionner et valider les liaisons de stockage SAN iSCSI et Fibre Channel avec Jumbo Frames MTU 9000.',
    'Analyser le fonctionnement des primitives VAAI (ATS, XCOPY, UNMAP) sur les datastores VMFS-6.',
    'Configurer le multipathing NMP avec la politique Round Robin pour maximiser le débit des contrôleurs de baie.',
    'Dimensionner un cluster hyperconvergé VMware vSAN en appliquant les politiques SPBM adaptées (RAID-1 vs RAID-5/6).',
    'Surveiller et maintenir la réserve opérationnelle de 20% de Slack Space pour garantir la haute résilience de vSAN.'
  ]
};
