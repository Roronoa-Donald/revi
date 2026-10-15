/**
 * Chapitre 5 du cours « Windows Server B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 5,
  title: 'Virtualisation d’Entreprise Hyper-V, Commutateurs Virtuels &amp; Haute Disponibilité',
  short: 'Virtualisation Hyper-V &amp; Réseau',
  toc: 'Architecture de l’hyperviseur Type 1 Microsoft Hyper-V (micro-noyau, Root Partition vs Child Partitions, VMBus et VSP/VSC), machines virtuelles Génération 1 vs Génération 2 (UEFI, Secure Boot, contrôleurs SCSI), commutation réseau virtuelle (External, Internal, Private vSwitch et mode allow_host), allocation dynamique de la mémoire (Startup RAM, min/max et Memory Buffer), gestion des disques virtuels VHDX (dynamiques, fixes, différentiels), points de contrôle (Checkpoints Standard vs Production VSS, fusion de disques), et réplication Hyper-V Replica.',
  time: '≈ 2 h 45 de travail',
  free: false,
  situation: 'La virtualisation constitue le standard absolu de déploiement des infrastructures de serveurs modernes : elle permet d’optimiser l’empreinte matérielle, de réduire la consommation énergétique et d’isoler hermétiquement les services applicatifs. Au cœur de Windows Server, l’hyperviseur Type 1 natif Hyper-V offre des performances de niveau matériel (bare-metal) et une intégration étroite avec Active Directory et le stockage d’entreprise. Néanmoins, une mauvaise configuration de la topologie réseau des commutateurs virtuels (vSwitch), une surallocation incontrôlée de la mémoire vive ou l’accumulation désordonnée de points de contrôle (checkpoints/snapshots) non fusionnés sur des disques différentiels peuvent dégrader dramatiquement les performances d’E/S disques ou provoquer la rupture de services critiques. En niveau Bachelor 3, l’ingénieur système doit maîtriser l’architecture sous-jacente de l’hyperviseur, concevoir des réseaux virtuels étanches, régler la mémoire dynamique avec précision et assurer la résilience des disques VHDX.',
  objectives: [
    'assimiler l’architecture micro-noyau Type 1 d’Hyper-V (Root Partition de gestion, Child Partitions invitées, bus VMBus et pilotes synthétiques) ;',
    'comparer les machines virtuelles de Génération 1 (BIOS hérité, IDE) et de Génération 2 (UEFI x64, Secure Boot, démarrage PXE réseau natif, SCSI) ;',
    'concevoir une matrice de commutation réseau avec les commutateurs virtuels External, Internal et Private vSwitch et maîtriser l’option allow_host ;',
    'calculer et optimiser l’allocation de la mémoire dynamique (Startup RAM, seuils Min/Max, Memory Buffer en pourcentage et Smart Paging) ;',
    'administrer le cycle de vie des disques virtuels VHDX différentiels (.avhdx) et exécuter la fusion de points de contrôle (Checkpoints) sans perte de données ;',
    'implémenter en Python 3 des simulateurs de connectivité vSwitch, des moteurs d’allocation de mémoire dynamique et des gestionnaires d’arborescences VHDX.'
  ],
  sections: [
    {
      title: 'Architecture Interne de l’Hyperviseur Microsoft Hyper-V',
      html: [
        '<p>Contrairement aux hyperviseurs de Type 2 qui s’exécutent comme des applications au-dessus d’un OS hôte, Hyper-V est un <strong>hyperviseur de Type 1</strong> (bare-metal) qui s’installe directement entre le matériel physique et les systèmes d’exploitation :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Cloisonnement des Partitions et VMBus</h4>',
        '    <ul>',
        '      <li><strong>Partition Parente (Root Partition) :</strong> partition d’administration exécutant Windows Server. Elle contrôle l’hyperviseur via les APIs de virtualisation, héberge les pilotes matériels réels et instancie les fournisseurs de services virtuels (VSP - Virtualization Service Providers).</li>',
        '      <li><strong>Partitions Enfants (Child Partitions) :</strong> partitions isolées hébergeant les systèmes d’exploitation invités (VMs Windows, Linux). Elles accèdent aux périphériques via des clients de services virtuels (VSC - Virtualization Service Clients).</li>',
        '      <li><strong>Canal VMBus :</strong> bus de communication ultra-rapide en mémoire partagée reliant directement les VSC des VMs invitées aux VSP de la partition parente, évitant l’émulation matérielle lente.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>VMs Génération 1 vs Génération 2</h4>',
        '    <table class="table">',
        '      <thead><tr><th>Caractéristique</th><th>Génération 1</th><th>Génération 2</th></tr></thead>',
        '      <tbody>',
        '        <tr><td><strong>Microprogramme</strong></td><td>BIOS hérité (MBR)</td><td>UEFI x64 (GPT)</td></tr>',
        '        <tr><td><strong>Sécurité</strong></td><td>Non disponible</td><td>Secure Boot &amp; TPM virtuel (vTPM)</td></tr>',
        '        <tr><td><strong>Disque de démarrage</strong></td><td>Contrôleur IDE émulé</td><td>Contrôleur SCSI haute performance</td></tr>',
        '        <tr><td><strong>Démarrage réseau (PXE)</strong></td><td>Carte réseau héritée lente</td><td>Carte réseau synthétique VMBus</td></tr>',
        '        <tr><td><strong>Usage cible</strong></td><td>Vieux OS (Windows 7, 32-bit)</td><td>Tous les OS modernes (Windows 10/11, Server, Linux)</td></tr>',
        '      </tbody>',
        '    </table>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Commutateurs Réseau Virtuels (Virtual Switches)',
      html: [
        '<p>Le réseau dans Hyper-V est orchestré par des commutateurs virtuels de niveau 2 (vSwitch) configurables selon trois modes de connectivité étanches :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Les 3 Types de Commutateurs Virtuels</h4>',
        '    <ul>',
        '      <li><strong>Commutateur Externe (External vSwitch) :</strong> lié directement à une carte réseau physique (NIC) de l’hôte. Permet la communication entre VMs rattachées, vers le réseau physique de l’entreprise et vers Internet. L’option <em>Autoriser le système d’exploitation de gestion à partager cette carte réseau (allow_host)</em> détermine si l’hôte physique peut également utiliser ce vSwitch.</li>',
        '      <li><strong>Commutateur Interne (Internal vSwitch) :</strong> purement logiciel. Permet la communication entre les VMs rattachées et avec l’hôte physique via une carte virtuelle dédiée. <em>Aucun accès au réseau physique extérieur ni à Internet.</em></li>',
        '      <li><strong>Commutateur Privé (Private vSwitch) :</strong> strictement isolé. Permet la communication <em>uniquement entre les VMs rattachées sur ce même vSwitch</em>. Ni l’hôte physique ni le réseau extérieur n’y ont accès. Idéal pour les environnements de test malware ou DMZ étanche.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Fonctionnalités Réseau Avancées</h4>',
        '    <ul>',
        '      <li><strong>Isolation par VLANs (IEEE 802.1Q) :</strong> marquage de tags VLAN virtuels sur chaque carte réseau de VM pour segmenter les flux sans multiplier les commutateurs.</li>',
        '      <li><strong>Agrégation de liens (NIC Teaming / SET) :</strong> regroupement de plusieurs cartes réseau physiques en une seule interface logique pour offrir tolérance aux pannes et répartition de charge.</li>',
        '      <li><strong>Protection contre l’usurpation DHCP et Guard Router :</strong> blocage des baux DHCP non autorisés émis par des VMs invitées malveillantes.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Mémoire Dynamique, Disques VHDX & Points de Contrôle',
      html: [
        '<p>La gestion efficace des ressources matérielles sous Hyper-V s’articule autour de trois technologies indispensables à la densité de virtualisation :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Mémoire Dynamique (Dynamic Memory)</h4>',
        '    <p>Ajuste en temps réel la mémoire vive allouée à chaque machine invitée selon son besoin réel :</p>',
        '    <ul>',
        '      <li><strong>RAM de démarrage (Startup RAM) :</strong> mémoire initiale allouée pour exécuter le boot de l’OS.</li>',
        '      <li><strong>Mémoire Minimale / Maximale :</strong> bornes contractuelles strictes que l’hyperviseur ne dépasse jamais.</li>',
        '      <li><strong>Tampon mémoire (Buffer %) :</strong> réserve de sécurité maintenue au-dessus de la demande courante : $\\text{Target} = \\text{Demand} \\times (1 + \\text{Buffer}\\%)$. Valeur par défaut : 20 %.</li>',
        '      <li><strong>Poids de la mémoire (Memory Weight) :</strong> priorité d’arbitrage entre VMs lorsque la RAM physique de l’hôte est saturée.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Disques VHDX Différentiels & Checkpoints</h4>',
        '    <p>Les disques <strong>VHDX</strong> (jusqu’à 64 To) supportent trois formats : Fixe (taille allouée immédiatement), Dynamique (grandit avec l’usage) et <strong>Différentiel</strong> (stocke uniquement les blocs modifiés par rapport à un disque parent de base).</p>',
        '    <ul>',
        '      <li><strong>Points de contrôle Standard :</strong> capturent la mémoire vive et l’état du disque. Utilisés en laboratoire pour les tests de développement.</li>',
        '      <li><strong>Points de contrôle de Production :</strong> s’appuient sur VSS (Volume Shadow Copy) dans l’OS invité pour créer un snapshot cohérent au niveau applicatif (sans capturer la mémoire vive volatile). Recommandés en production.</li>',
        '      <li><strong>Fusion (Merge) :</strong> suppression d’un checkpoint qui réintègre définitivement les blocs différentiels (.avhdx) dans le disque VHDX parent.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],
  method: [
    'Choisir systématiquement la Génération 2 pour toute nouvelle machine virtuelle Windows Server ou Linux moderne (UEFI et Secure Boot).',
    'Créer un commutateur virtuel Externe dédié au trafic de production et un commutateur Interne ou Privé pour les flux de gestion ou de réplication.',
    'Désactiver l’option allow_host sur le vSwitch Externe lorsque des cartes réseau physiques indépendantes sont réservées à l’hôte d’administration.',
    'Configurer la mémoire dynamique en fixant une RAM minimale réaliste et un tampon de 20 % pour éviter les goulots d’étranglement applicatifs.',
    'Utiliser exclusivement des Points de contrôle de Production pour les serveurs hébergeant des bases de données SQL ou des contrôleurs Active Directory.',
    'Surveiller l’arborescence des disques différentiels .avhdx et fusionner les checkpoints obsolètes pour prévenir la saturation du volume de stockage.'
  ],
  summary: [
    'Hyper-V est un hyperviseur bare-metal de Type 1 isolant la partition de gestion parente (Root) des partitions invitées (Child) via le bus VMBus.',
    'Les VMs Génération 2 apportent l’UEFI x64, le démarrage sécurisé Secure Boot, le TPM virtuel et des contrôleurs SCSI synthétiques performants.',
    'Les 3 types de vSwitchs offrent des niveaux d’isolation stricts : Externe (LAN/Internet), Interne (VMs + hôte) et Privé (VMs uniquement).',
    'La mémoire dynamique régule la RAM allouée selon la formule officielle : $\\text{Target} = \\text{Demande} \\times (1 + \\text{Buffer}\\%)$ bornée par Min/Max.',
    'Les disques VHDX différentiels (.avhdx) enregistrent les deltas de modifications pour chaque point de contrôle créé.',
    'Les checkpoints de production exploitent VSS pour garantir la cohérence transactionnelle des bases de données lors des instantanés.'
  ],
  checklist: [
    'L’hôte physique supporte-t-il la virtualisation matérielle (Intel VT-x ou AMD-V) et SLAT validé dans le BIOS/UEFI ?',
    'Les machines virtuelles critiques de production sont-elles configurées en Génération 2 avec Secure Boot activé ?',
    'Le vSwitch de production est-il configuré selon la politique d’isolation requise (allow_host contrôlé) ?',
    'La mémoire dynamique possède-t-elle des plafonds Maximum RAM réalistes empêchant une VM de monopoliser toute la RAM physique ?',
    'Le type de checkpoint est-il configuré sur « Points de contrôle de production » dans les paramètres de la machine virtuelle ?',
    'Les disques virtuels sont-ils stockés sur un volume ReFS pour bénéficier de la vitesse de clonage de blocs (Block Cloning) ?'
  ],
  notions: [
    {
      name: 'Hyperviseur Type 1',
      desc: 'Logiciel de virtualisation s’exécutant directement sur le matériel physique (bare-metal) sans nécessiter de système d’exploitation hôte sous-jacent.'
    },
    {
      name: 'VMBus',
      desc: 'Canal de communication inter-partitions haute performance en mémoire partagée reliant les composants VSC invités aux VSP de l’hôte.'
    },
    {
      name: 'VM Génération 2',
      desc: 'Architecture de machine virtuelle moderne utilisant l’UEFI, le Secure Boot et des contrôleurs SCSI synthétiques sans émulation de composants hérités.'
    },
    {
      name: 'External vSwitch',
      desc: 'Commutateur virtuel Hyper-V relié à un adaptateur réseau physique permettant aux machines virtuelles d’accéder au réseau externe et à Internet.'
    },
    {
      name: 'Private vSwitch',
      desc: 'Commutateur virtuel totalement isolé autorisant la communication uniquement entre les machines virtuelles qui lui sont rattachées sur l’hôte.'
    },
    {
      name: 'Mémoire Dynamique',
      desc: 'Fonctionnalité régulant dynamiquement la mémoire RAM fournie à une VM entre une valeur minimale et maximale selon sa charge courante.'
    },
    {
      name: 'Disque VHDX Différentiel',
      desc: 'Disque virtuel contenant uniquement les blocs de données modifiés par rapport à un disque virtuel parent de référence.'
    },
    {
      name: 'Point de Contrôle de Production',
      desc: 'Instantané de machine virtuelle exploitant la technologie VSS dans l’OS invité pour capturer un état cohérent des données sans figer la mémoire vive.'
    }
  ],
  pitfalls: [
    {
      title: 'Conservation prolongée de multiples checkpoints',
      desc: 'Conserver des checkpoints pendant des semaines crée des chaînes de disques différentiels .avhdx volumineuses qui saturent le stockage et dégradent les E/S.'
    },
    {
      title: 'Confusion entre vSwitch Interne et vSwitch Privé',
      desc: 'Croire qu’un vSwitch Interne est isolé de l’hôte est une erreur : l’hôte physique y possède une carte réseau et peut écouter le trafic, contrairement au vSwitch Privé.'
    },
    {
      title: 'Usage de checkpoints Standard sur des contrôleurs AD',
      desc: 'Restaurer un checkpoint Standard sur un contrôleur de domaine provoque un retour arrière USN (USN Rollback) et corrompt la réplication de l’annuaire.'
    },
    {
      title: 'Sous-dimensionnement de la mémoire physique hôte',
      desc: 'Activer la mémoire dynamique sans surveiller la pression mémoire globale force l’hôte à utiliser le Smart Paging sur disque, effondrant les performances.'
    }
  ],
  questions: [
    {
      stem: 'Quel type d’hyperviseur Microsoft Hyper-V représente-t-il ?',
      opts: [
        'Un hyperviseur de Type 2 hébergé dans une application de bureau',
        'Un hyperviseur de Type 1 (bare-metal) exécuté directement sur le matériel',
        'Un émulateur logiciel de processeur 8-bit',
        'Une extension du navigateur Microsoft Edge'
      ],
      correct: 1,
      exp: 'Hyper-V est un hyperviseur bare-metal de Type 1 qui gère directement les processeurs et la mémoire sous les partitions Windows et invitées.'
    },
    {
      stem: 'Quelle caractéristique distingue fondamentalement une VM de Génération 2 d’une VM de Génération 1 ?',
      opts: [
        'L’obligation d’utiliser des disques durs au format FAT16',
        'Le microprogramme UEFI x64 avec support du démarrage sécurisé Secure Boot et disques SCSI',
        'L’absence de toute carte réseau',
        'La limitation de la mémoire vive à 512 Mo'
      ],
      correct: 1,
      exp: 'La Génération 2 abandonne les composants émulés (BIOS hérité, disques IDE) au profit de l’UEFI, du Secure Boot et de bus SCSI synthétiques rapides.'
    },
    {
      stem: 'Quel type de commutateur virtuel (vSwitch) interdit tout échange avec l’hôte physique et avec le réseau extérieur ?',
      opts: [
        'External vSwitch',
        'Internal vSwitch',
        'Private vSwitch',
        'Loopback vSwitch'
      ],
      correct: 2,
      exp: 'Le vSwitch Privé (Private) confine strictement la communication aux seules machines virtuelles qui y sont rattachées sur l’hôte physique.'
    },
    {
      stem: 'Dans la formule de calcul de la mémoire dynamique, à quoi correspond le Memory Buffer ?',
      opts: [
        'À la mémoire réservée pour la carte graphique de la VM',
        'À un pourcentage de marge de sécurité conservé au-dessus de la demande courante de la VM',
        'Au fichier d’échange swap sur le disque dur physique',
        'À la taille maximale du disque virtuel VHDX'
      ],
      correct: 1,
      exp: 'Le Memory Buffer (20 % par défaut) ajoute une marge de RAM au-dessus de la demande instantanée pour absorber les pics de charge subits.'
    },
    {
      stem: 'Pourquoi privilégier les points de contrôle de production (Production Checkpoints) en entreprise ?',
      opts: [
        'Parce qu’ils s’exécutent plus rapidement en mémoire vive',
        'Parce qu’ils s’appuient sur VSS dans l’invité pour garantir la cohérence applicative des bases de données',
        'Parce qu’ils suppriment automatiquement les virus informatiques',
        'Parce qu’ils sont gratuits contrairement aux points standards'
      ],
      correct: 1,
      exp: 'Les checkpoints de production utilisent VSS pour créer un état cohérent des bases de données sans geler l’état de mémoire volatile.'
    },
    {
      stem: 'Que se produit-il lors de la suppression d’un point de contrôle (checkpoint) dans Hyper-V ?',
      opts: [
        'Le disque virtuel d’origine est immédiatement formaté',
        'Les données du disque différentiel .avhdx sont fusionnées (Merge) dans le disque VHDX parent',
        'La machine virtuelle est déconnectée du réseau local',
        'L’hyperviseur doit être réinstallé'
      ],
      correct: 1,
      exp: 'La suppression d’un checkpoint déclenche une opération de fusion (Merge) qui réintègre les blocs modifiés du fichier .avhdx dans le parent.'
    },
    {
      stem: 'À quoi sert le composant VMBus dans l’architecture Hyper-V ?',
      opts: [
        'À alimenter électriquement le processeur de la carte mère',
        'À fournir un canal de communication haute performance en mémoire partagée entre les VSC et les VSP',
        'À synchroniser l’heure du BIOS avec Internet',
        'À imprimer des documents depuis la machine virtuelle'
      ],
      correct: 1,
      exp: 'Le VMBus est le bus logiciel haute vitesse reliant les pilotes synthétiques des VMs aux pilotes physiques de la partition racine.'
    },
    {
      stem: 'Quel format de disque virtuel permet de stocker des fichiers jusqu’à une taille maximale de 64 To avec protection contre les corruptions ?',
      opts: [
        'VHD',
        'VHDX',
        'VMDK',
        'ISO'
      ],
      correct: 1,
      exp: 'Le format VHDX introduit avec Windows Server 2012 supporte jusqu’à 64 To, des secteurs de 4 Ko et une journalisation protégée contre les coupures.'
    }
  ],
  flashcards: [
    {
      q: 'Quelles sont les deux partitions fondamentales de l’architecture Hyper-V ?',
      a: 'La partition parente d’administration (Root Partition) et les partitions invitées isolées (Child Partitions).'
    },
    {
      q: 'Quels sont les atouts des VMs de Génération 2 ?',
      a: 'Microprogramme UEFI x64, Secure Boot, contrôleurs SCSI natifs et démarrage réseau PXE performant sans matériel émulé.'
    },
    {
      q: 'Quels sont les trois types de commutateurs virtuels Hyper-V ?',
      a: 'External (accès LAN/Internet), Internal (VMs + hôte), Private (strictement inter-VMs).'
    },
    {
      q: 'Comment s’évalue la mémoire dynamique d’une VM ?',
      a: 'Target = Demande x (1 + Buffer%) bornée par les valeurs de mémoire minimale et maximale configurées.'
    },
    {
      q: 'Quelle est la différence entre checkpoints Standard et de Production ?',
      a: 'Les checkpoints Standard capturent l’état mémoire vive ; les checkpoints de Production utilisent VSS pour garantir la cohérence applicative.'
    },
    {
      q: 'Que réalise l’opération de fusion (Merge) d’un checkpoint ?',
      a: 'Elle réintègre les blocs du disque différentiel .avhdx dans le disque VHDX parent puis supprime le différentiel.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Difficultés à différencier les commutateurs virtuels ou incompréhension du fonctionnement des disques différentiels.'
    },
    {
      cls: 'medium',
      text: 'Bonne maîtrise d’Hyper-V : déploiement de VMs Génération 2, réglage fin de la mémoire dynamique et gestion propre des checkpoints.'
    },
    {
      cls: 'high',
      text: 'Excellence en virtualisation d’entreprise : architecture réseau résiliente (SET Teaming), stockage ReFS optimisé et haute disponibilité Replica.'
    }
  ]
};
