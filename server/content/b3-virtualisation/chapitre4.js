/**
 * Module 4 — Réseau Virtuel, Commutation Standard & Distribuée (vSwitch & VDS)
 * Cours « Virtualisation Avancée B3 »
 */
'use strict';

module.exports = {
  n: 4,
  title: 'Réseau Virtuel, Commutation Standard & Distribuée (vSwitch & VDS)',
  short: 'Commutation vSwitch & VDS',
  toc: 'Commutateurs virtuels standards (VSS) vs commutateurs distribués (VDS), typologie des interfaces VMkernel et Port Groups, modes de tagging VLAN 802.1Q (VST, EST, VGT), durcissement de sécurité (Promiscuous, MAC Changes, Forged Transmits) et régulation de débit Traffic Shaping.',
  time: '≈ 2 h 45',
  free: false,

  situation:
    'Vous êtes responsable de l\'architecture réseau d\'un cluster d\'hyperviseurs hébergeant des environnements hautement cloisonnés (DMZ publique, base de données interne, stockage de sauvegarde). ' +
    'Vous migrez l\'infrastructure réseau de commutateurs standards (VSS) vers un commutateur distribué vSphere (VDS), ' +
    'structurez les Port Groups par VLANs 802.1Q en mode Virtual Switch Tagging (VST), ' +
    'durcissez les politiques de sécurité contre les attaques par usurpation d\'identité MAC et configurez la régulation de bande passante (Traffic Shaping) par algorithme Token Bucket pour protéger les liaisons de production.',

  objectives: [
    'Distinguer les architectures de commutation virtuelle Standard (VSS) et Distribuée (VDS) et comprendre la séparation entre Plan de Contrôle et Plan de Données.',
    'Maîtriser les rôles des interfaces VMkernel (Management, vMotion, vSAN, IP Storage) et des Port Groups dédiés aux machines virtuelles.',
    'Configurer et auditer les trois modes de marquage VLAN 802.1Q sous vSphere : VST (Virtual Switch Tagging), EST (External Switch Tagging) et VGT (Virtual Guest Tagging).',
    'Appliquer les règles de durcissement des Port Groups (Promiscuous, MAC changes, Forged transmits) et modéliser le lissage de trafic Traffic Shaping.'
  ],

  sections: [
    {
      title: 'Commutateurs Virtuels : vSwitch Standard (VSS) vs Distributed Switch (VDS)',
      html: [
        '<p>La connectivité réseau des machines virtuelles et des services internes de l\'hyperviseur est assurée par des commutateurs logiciels de niveau 2 (vSwitches) s\'exécutant dans le noyau VMkernel :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>vSwitch Standard (VSS)</h4>',
        '    <ul>',
        '      <li><strong>Administration locale :</strong> Configuré isolément sur chaque hôte ESXi via l\'interface locale ou vCenter.</li>',
        '      <li><strong>Plan de contrôle local :</strong> Plan de contrôle et plan de transfert de paquets résident sur l\'hôte physique.</li>',
        '      <li><strong>Inconvénient :</strong> Chaque nouveau Port Group ou VLAN doit être dupliqué manuellement sur l\'ensemble des hôtes du cluster, avec un risque élevé d\'incohérence.</li>',
        '      <li><strong>Usage :</strong> Déploiements autonomes, petits clusters de 2 à 3 nœuds, licence vSphere Standard.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>vSphere Distributed Switch (VDS)</h4>',
        '    <ul>',
        '      <li><strong>Plan de contrôle centralisé :</strong> La configuration réseau globale est pilotée au niveau du Datacenter dans vCenter Server.</li>',
        '      <li><strong>Plan de données distribué :</strong> Des modules logiciels masqués exécutent le transfert de trames dans le VMkernel de chaque hôte membre.</li>',
        '      <li><strong>Mobilité vMotion transparente :</strong> Maintient l\'état de la connexion réseau, les compteurs statistiques et les filtres de sécurité lors du déplacement d\'une VM.</li>',
        '      <li><strong>Fonctions avancées :</strong> Network I/O Control (NIOC), capture de trames distantes, NetFlow/IPFIX, LACP dynamique 802.3ad.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Typologie des Interfaces VMkernel & Port Groups de Machines Virtuelles',
      html: [
        '<p>Un commutateur virtuel gère deux catégories distinctes de points d\'accès réseau (ports virtuels) :</p>',
        '<table class="table">',
        '  <thead><tr><th>Catégorie de Port</th><th>Type d\'Interface</th><th>Rôle Opérationnel &amp; Bonnes Pratiques d\'Isolation</th></tr></thead>',
        '  <tbody>',
        '    <tr><td><strong>Port Groups VM (VM Port Group)</strong></td><td>Ports virtuels pour VM</td><td>Raccorde les cartes réseaux virtuelles (vNIC VMXNET3) des machines virtuelles pour leur fournir un accès réseau commuté.</td></tr>',
        '    <tr><td><strong>Management Network</strong></td><td>Interface VMkernel (vmk0)</td><td>Fournit une adresse IP à l\'hôte ESXi pour l\'administration vCenter, les sessions SSH et le client web d\'hôte.</td></tr>',
        '    <tr><td><strong>vMotion VMkernel</strong></td><td>Interface VMkernel (vmk1)</td><td>Canal isolé à très haut débit dédié au transfert de mémoire vive lors des migrations à chaud sans interruption.</td></tr>',
        '    <tr><td><strong>vSAN VMkernel</strong></td><td>Interface VMkernel (vmk2)</td><td>Réseau de synchronisation temps réel des objets de stockage distribués vSAN (recommandé 10G/25G dédié).</td></tr>',
        '    <tr><td><strong>IP Storage VMkernel</strong></td><td>Interface VMkernel (vmk3)</td><td>Liaison de transport bloc/fichier vers les baies de stockage iSCSI ou NFS avec Jumbo Frames MTU 9000.</td></tr>',
        '  </tbody>',
        '</table>'
      ].join('\n')
    },
    {
      title: 'Tagging & Isolation VLAN 802.1Q : VST, EST & VGT',
      html: [
        '<p>L\'isolation logique des flux réseau sur les liaisons montantes physiques (Uplinks) est assurée par le protocole de marquage de trames <strong>IEEE 802.1Q (VLAN)</strong>. VMware vSphere propose trois architectures de tagging distinctes :</p>',
        '<div class="grid grid-3">',
        '  <div class="card">',
        '    <h4>VST (Virtual Switch Tagging)</h4>',
        '    <p>Le vSwitch se charge de tout. Le Port Group est configuré avec un identifiant de VLAN précis (ex: VID 10, 20, 100).</p>',
        '    <ul>',
        '      <li>L\'uplink physique est configuré en mode <strong>Trunk</strong> sur le commutateur physique.</li>',
        '      <li>Le vSwitch ajoute le tag 802.1Q à la sortie et le retire avant de transmettre la trame à la VM.</li>',
        '      <li><strong>Mode par défaut et recommandé :</strong> L\'OS invité de la VM manipule des trames Ethernet standards sans aucune connaissance des VLANs.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>EST (External Switch Tagging)</h4>',
        '    <p>Le commutateur physique gère le tagging. Le Port Group vSphere a un VLAN ID configuré à <code>0</code> (ou aucun VLAN).</p>',
        '    <ul>',
        '      <li>Le port du commutateur physique est configuré en mode <strong>Access</strong> dans un VLAN dédié.</li>',
        '      <li>Le vSwitch ne voit que des trames déjà détaguées.</li>',
        '      <li>Inconvénient : Nécessite une carte réseau physique (uplink) distincte par VLAN, limitant la consolidation.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>VGT (Virtual Guest Tagging)</h4>',
        '    <p>Le système invité gère le tagging. Le Port Group vSphere est configuré avec l\'identifiant spécial <code>4095</code> (Trunk transparent).</p>',
        '    <ul>',
        '      <li>Le vSwitch laisse passer les étiquettes 802.1Q sans les inspecter ni les supprimer.</li>',
        '      <li>L\'OS invité (ex: routeur virtuel pfSense, pare-feu FortiGate-VM) tague lui-même ses sous-interfaces logiques.</li>',
        '      <li>Cas d\'usage : Équipements réseaux et appliances de sécurité virtuelles.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Sécurité des Port Groups & Régulation de Trafic (Traffic Shaping)',
      html: [
        '<p>Pour empêcher les attaques réseau internes au sein d\'un même hyperviseur, chaque Port Group dispose d\'un volet de <strong>sécurité de niveau 2</strong> comportant trois directives capitales :</p>',
        '<table class="table">',
        '  <thead><tr><th>Directive de Sécurité</th><th>Comportement si "Accept"</th><th>Risque Sécurité / Cyberattaque</th><th>Recommandation Durcie</th></tr></thead>',
        '  <tbody>',
        '    <tr><td><strong>Promiscuous Mode</strong></td><td>La vNIC reçoit tout le trafic du Port Group, y compris les trames destinées aux autres VM.</td><td>Écoute clandestine (sniffing) de mots de passe et données confidentielles en clair par une VM compromise.</td><td><strong>Reject</strong> (sauf sonde d\'intrusion IDS dédiée).</td></tr>',
        '    <tr><td><strong>MAC Address Changes</strong></td><td>La VM peut changer son adresse MAC interne au niveau de son OS après le démarrage.</td><td>Usurpation d\'identité réseau d\'une passerelle ou d\'un serveur légitime.</td><td><strong>Reject</strong></td></tr>',
        '    <tr><td><strong>Forged Transmits</strong></td><td>La VM peut envoyer des trames Ethernet dont l\'adresse MAC source est différente de sa vNIC.</td><td>Empoisonnement de table ARP (ARP Spoofing) et attaques Man-in-the-Middle (MitM).</td><td><strong>Reject</strong></td></tr>',
        '  </tbody>',
        '</table>',
        '<p>Le <strong>Traffic Shaping (régulation de trafic)</strong> met en œuvre un algorithme de seau à jetons (<em>Token Bucket</em>) pour limiter l\'impact des flux volumineux (sauvegardes, transferts de bases) sur le reste du réseau :</p>',
        '<ul>',
        '  <li><strong>Average Bandwidth (Débit Moyen) :</strong> Débit moyen permanent autorisé en kbps.</li>',
        '  <li><strong>Peak Bandwidth (Débit Crête) :</strong> Débit maximal temporaire autorisé pendant la durée de rafale en kbps.</li>',
        '  <li><strong>Burst Size (Taille de Rafale) :</strong> Volume maximal en kilo-octets (Ko) que la VM peut émettre à la vitesse crête avant d\'être bridée au débit moyen.</li>',
        '</ul>'
      ].join('\n')
    }
  ],

  methodTitle: 'Méthodologie d\'Ingénierie : Conception & Durcissement Réseau vSphere',
  method: [
    'Séparer physiquement ou logiquement les flux par VLANs dédiés : Management, vMotion, Stockage (iSCSI/NFS) et Réseau Utilisateurs/VM.',
    'Privilégier le mode VST (Virtual Switch Tagging) sur des commutateurs distribués (VDS) avec uplinks en agrégat LACP redondants.',
    'Auditer et durcir systématiquement les politiques de sécurité des Port Groups en basculant Promiscuous, MAC Changes et Forged Transmits sur Reject.',
    'Activer le Traffic Shaping ou les politiques NIOC (Network I/O Control) pour garantir des priorités de bande passante aux flux sensibles.'
  ],

  summary: [
    'Les commutateurs distribués VDS centralisent le plan de contrôle sur vCenter et maintiennent la cohérence des ports lors des vMotions.',
    'Les interfaces VMkernel assurent les services critiques de l\'hyperviseur : Management (vmk0), vMotion (vmk1), vSAN (vmk2) et Stockage IP (vmk3).',
    'Le mode VST (Virtual Switch Tagging) est le standard d\'entreprise : le vSwitch gère le balisage 802.1Q de façon transparente pour les machines virtuelles.',
    'Le mode VGT (VLAN 4095) est réservé aux pare-feux et routeurs virtuels capables d\'interpréter nativement les trames multi-VLANs.',
    'Le durcissement de sécurité niveau 2 (Rejet du mode Promiscuous, des changements MAC et des transmissions forgées) protège le cluster contre les attaques MitM et l\'ARP spoofing.'
  ],

  checklist: [
    'Les flux vMotion et de stockage transitent-ils sur des VLANs hermétiques non routés vers le réseau bureautique ?',
    'Les commutateurs physiques sont-ils configurés en mode Trunk 802.1Q pour accepter les trames VST du vSwitch ?',
    'Les 3 options de sécurité des Port Groups (Promiscuous, MAC Changes, Forged Transmits) sont-elles bien positionnées sur Reject ?',
    'L\'algorithme de Teaming (Load Balancing) est-il adapté à l\'infrastructure physique (Route based on originating virtual port ID par défaut) ?',
    'Le profil de Traffic Shaping est-il dimensionné avec une réserve de Burst suffisante pour absorber les pointes applicatives ?'
  ],

  notions: [
    { term: 'vSphere Distributed Switch (VDS)', def: 'Commutateur virtuel administré centralement par vCenter dont les plans de données sont répartis sur les hyperviseurs.' },
    { term: 'Port Group', def: 'Agrégat logique de ports virtuels partageant une même configuration de VLAN, de sécurité et d\'ordonnancement réseau.' },
    { term: 'Interface VMkernel', def: 'Point d\'accès réseau dédié à un service interne de l\'hyperviseur (Management, vMotion, vSAN, iSCSI, NFS).' },
    { term: 'VST (Virtual Switch Tagging)', def: 'Architecture où le commutateur virtuel insère et retire les étiquettes VLAN 802.1Q de façon transparente pour l\'OS invité.' },
    { term: 'VGT (Virtual Guest Tagging)', def: 'Configuration (VLAN 4095) où les trames balisées 802.1Q sont transmises directement à l\'OS invité sans modification.' },
    { term: 'Mode Promiscuous', def: 'Paramètre réseau permettant à une interface virtuelle de recevoir toutes les trames transitant sur le Port Group.' },
    { term: 'Forged Transmits', def: 'Attaque ou paramètre consistant à émettre des paquets réseau avec une adresse MAC source différente de celle attribuée à la vNIC.' },
    { term: 'Traffic Shaping', def: 'Mécanisme de régulation du débit réseau basé sur un algorithme Token Bucket défini par un débit moyen, un débit crête et une rafale.' }
  ],

  pitfalls: [
    {
      mistake: 'Laisser le mode Promiscuous sur Accept sur un Port Group hébergeant des machines de production.',
      why: 'Toute machine virtuelle compromise par un attaquant peut placer sa carte réseau en mode écoute et intercepter le trafic réseau des autres VM du même Port Group.',
      fix: 'Configurer systématiquement le mode Promiscuous sur Reject, sauf pour une appliance IDS/IPS dédiée à la surveillance.'
    },
    {
      mistake: 'Configurer le VLAN ID sur 4095 pour une machine virtuelle Windows standard.',
      why: 'La VM recevra des trames balisées 802.1Q qu\'un système d\'exploitation classique ne sait pas interpréter, provoquant une perte totale de connectivité réseau.',
      fix: 'Utiliser un VLAN ID standard (1-4094) correspondant au VLAN cible (mode VST).'
    },
    {
      mistake: 'Faire transiter le trafic vMotion en clair sur le même VLAN que les postes de travail utilisateurs.',
      why: 'Le trafic vMotion véhicule la mémoire vive brute des serveurs sans chiffrement par défaut, exposant les mots de passe et données en mémoire vive à des captures réseau.',
      fix: 'Isoler impérativement le trafic vMotion sur un VLAN dédié non routable et activer le chiffrement vMotion (Encrypted vMotion).'
    },
    {
      mistake: 'Configurer un agrégat de liens IP Hash (LACP) sur le vSwitch sans configurer le commutateur physique.',
      why: 'L\'hôte ESXi émettra des paquets avec des hachages incompatibles, provoquant des boucles réseau de niveau 2 ou des coupures de liens intermittentes.',
      fix: 'N\'activer le mode Route based on IP Hash que si un port-channel statique ou dynamique (LACP 802.3ad) est explicitement configuré sur le switch physique.'
    }
  ],

  questions: [
    {
      q: 'Quel est l\'avantage architectural majeur d\'un vSphere Distributed Switch (VDS) par rapport à un vSwitch Standard (VSS) ?',
      opts: [
        'La configuration réseau est centralisée dans vCenter et conserve l\'état des ports virtuels lors des migrations vMotion.',
        'Le VDS supprime complètement le besoin d\'avoir des câbles réseau physiques et des cartes Ethernet.',
        'Le VDS permet de transformer automatiquement les adresses IPv4 en adresses IPv6 sans routeur.',
        'Le VDS ne fonctionne qu\'avec des disques durs mécaniques de type SAS.'
      ],
      correct: 0,
      exp: 'Le commutateur distribué (VDS) sépare le plan de contrôle (centralisé sur vCenter) du plan de données (sur les VMkernels), maintenant la persistance des ports, des statistiques et des règles lors des vMotions.'
    },
    {
      q: 'Dans le mode de tagging VST (Virtual Switch Tagging), qui est chargé d\'insérer et de retirer les étiquettes VLAN 802.1Q ?',
      opts: [
        'Le commutateur virtuel (vSwitch) au niveau du Port Group.',
        'Le système d\'exploitation invité de chaque machine virtuelle.',
        'La carte graphique virtuelle émulée par l\'hyperviseur.',
        'Le serveur DNS de l\'Active Directory d\'entreprise.'
      ],
      correct: 0,
      exp: 'En mode VST (le plus répandu en Datacenter), le vSwitch tague les trames sortantes vers le commutateur physique et débalise les trames entrantes destinées aux VM de façon transparente pour l\'OS invité.'
    },
    {
      q: 'Quel identifiant de VLAN particulier doit être configuré sur un Port Group pour activer le mode VGT (Virtual Guest Tagging) ?',
      opts: [
        'VLAN ID 4095.',
        'VLAN ID 0.',
        'VLAN ID 1.',
        'VLAN ID 1024.'
      ],
      correct: 0,
      exp: 'Le VLAN ID 4095 indique au vSwitch de fonctionner en mode Trunk transparent vers la machine virtuelle, laissant l\'OS invité (ex: routeur pfSense) gérer lui-même le balisage de ses sous-interfaces 802.1Q.'
    },
    {
      q: 'Quelle directive de sécurité d\'un Port Group empêche une machine virtuelle d\'émettre des trames avec une adresse MAC source forgée (ARP spoofing) ?',
      opts: [
        'Forged Transmits (Transmissions forgées positionnées sur Reject).',
        'Promiscuous Mode positionné sur Accept.',
        'MAC Address Changes positionné sur Accept.',
        'Network I/O Control positionné sur Disabled.'
      ],
      correct: 0,
      exp: 'Positionner la directive Forged Transmits sur Reject bloque immédiatement toute trame dont l\'adresse MAC source ne correspond pas à l\'adresse MAC attribuée par l\'hyperviseur, protégeant contre l\'ARP spoofing.'
    },
    {
      q: 'Quelle interface VMkernel assure par défaut la communication entre l\'hyperviseur ESXi et la console de gestion vCenter Server ?',
      opts: [
        'L\'interface de management (généralement vmk0).',
        'L\'interface de vMotion (vmk1).',
        'Le contrôleur SCSI paravirtualisé PVSCSI.',
        'L\'interface de boucle locale 127.0.0.1.'
      ],
      correct: 0,
      exp: 'L\'interface VMkernel Management Network (vmk0 par défaut) porte l\'adresse IP de l\'hôte utilisée par vCenter Server pour piloter l\'agent vpxa et par les administrateurs pour joindre le client web ESXi Host Client.'
    },
    {
      q: 'Quels sont les trois paramètres d\'un profil de régulation de débit (Traffic Shaping) sur un vSwitch ?',
      opts: [
        'Average Bandwidth (débit moyen), Peak Bandwidth (débit crête) et Burst Size (taille de rafale).',
        'Adresse IP, masque de sous-réseau et passerelle par défaut.',
        'Latence minimale, gigue maximale et pourcentage de paquets perdus.',
        'Taille du cache L2, fréquence CPU et nombre de sockets virtuels.'
      ],
      correct: 0,
      exp: 'Le Traffic Shaping sous vSphere régule les flux selon l\'algorithme Token Bucket configuré par le débit moyen alloué (kbps), le débit maximal en pic (kbps) et la réserve de données émise à vitesse crête (Ko).'
    },
    {
      q: 'Pourquoi est-il crucial d\'isoler le trafic vMotion sur un VLAN ou un réseau dédié ?',
      opts: [
        'Parce que le transfert de mémoire vive n\'est pas chiffré par défaut et consomme une très large bande passante.',
        'Parce que vMotion utilise le protocole FTP qui est interdit sur les réseaux locaux.',
        'Parce que vMotion déconnecte physiquement les cartes réseaux physiques de l\'hôte.',
        'Parce que les trames vMotion détruisent les tables de routage OSPF du réseau.'
      ],
      correct: 0,
      exp: 'vMotion transfère la totalité des pages de mémoire vive de la VM en cours d\'exécution. Sans isolation, ce flux massif sature le réseau et expose les données confidentielles en mémoire à des interceptions.'
    },
    {
      q: 'Quelle méthode de répartition de charge (Load Balancing) de Port Group ne nécessite AUCUNE configuration sur le commutateur physique ?',
      opts: [
        'Route based on originating virtual port ID.',
        'Route based on IP hash avec agrégat LACP statique.',
        'LACP dynamique IEEE 802.3ad.',
        'BGP multipath routing.'
      ],
      correct: 0,
      exp: 'La méthode par défaut « Route based on originating virtual port ID » affecte statiquement une carte réseau physique (uplink) à chaque port virtuel de VM sans exiger de configuration de port-channel sur le switch physique.'
    }
  ],

  flashcards: [
    {
      q: 'Quelle est la différence fondamentale entre vSwitch Standard et Distributed ?',
      a: 'Le VSS est configuré individuellement sur chaque hôte, tandis que le VDS centralise le plan de contrôle sur vCenter avec un plan de données distribué.'
    },
    {
      q: 'Qu\'est-ce que le mode VST (Virtual Switch Tagging) ?',
      a: 'Architecture où le commutateur virtuel insère et retire les étiquettes VLAN 802.1Q de façon totalement transparente pour l\'OS invité.'
    },
    {
      q: 'Que permet le mode VGT (VLAN 4095) ?',
      a: 'Transmettre les trames étiquetées 802.1Q directement au système invité (ex: routeur ou pare-feu virtuel) pour qu\'il gère lui-même ses VLANs.'
    },
    {
      q: 'Pourquoi doit-on positionner Promiscuous Mode sur Reject ?',
      a: 'Pour empêcher une machine virtuelle compromise de capturer et d\'écouter le trafic réseau destiné aux autres machines du même Port Group.'
    },
    {
      q: 'Quel est le rôle de la politique Forged Transmits sur Reject ?',
      a: 'Bloquer toute trame émise dont l\'adresse MAC source diffère de celle assignée à la carte réseau virtuelle, empêchant l\'usurpation MAC et l\'ARP spoofing.'
    },
    {
      q: 'Comment fonctionne l\'algorithme Token Bucket du Traffic Shaping ?',
      a: 'Il permet des pointes temporaires au débit crête (Peak) tant que la réserve de rafale (Burst) n\'est pas épuisée, puis bride le flux au débit moyen (Average).'
    }
  ],

  mastery: [
    'Migrer sans coupure une infrastructure réseau d\'un vSwitch standard vers un commutateur distribué vSphere (VDS).',
    'Dimensionner et isoler les interfaces VMkernel critiques (Management, vMotion, vSAN, IP Storage).',
    'Configurer et dépanner les architectures de balisage VLAN 802.1Q (VST, EST, VGT).',
    'Appliquer la matrice de durcissement sécuritaire des Port Groups (Rejet Promiscuous, MAC Changes, Forged Transmits).',
    'Modéliser et ajuster les profils de Traffic Shaping pour garantir la qualité de service des flux applicatifs de production.'
  ]
};
