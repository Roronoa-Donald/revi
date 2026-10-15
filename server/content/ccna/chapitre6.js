/**
 * Chapitre 6 du cours « CCNA Réseau » B2 — VLANs, Trunking 802.1Q et Routage Inter-VLAN (ROAS).
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 6,
  title: 'VLANs, Trunking 802.1Q &amp; Routage Inter-VLAN (ROAS)',
  short: 'VLANs &amp; ROAS',
  toc: 'Segmentation logique par VLANs (1 à 4094), ports d’accès (Access) vs liens d’agrégation (Trunk), balise Ethernet IEEE 802.1Q (TPID, PCP, VID), VLAN natif, routage inter-VLAN avec Router-on-a-Stick (sous-interfaces dot1Q), et diagnostic d’anomalies de Trunk.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Une clinique médicale réaménage son réseau local. Les ordinateurs des salles d’attente, les postes administratifs et les équipements biomédicaux ' +
    'critiques sont tous branchés sur les mêmes commutateurs physiques sans isolation. ' +
    'Une infection par rançongiciel survenue sur un PC invité menace de se propager aux moniteurs de réanimation. ' +
    'L’équipe d’ingénierie réseau doit cloisonner immédiatement les flux en créant des réseaux locaux virtuels (VLANs), ' +
    'configurer des liens Trunk 802.1Q sécurisés entre les commutateurs d’étage et déployer un routeur configuré en Router-on-a-Stick (ROAS) ' +
    'avec des sous-interfaces étiquetées pour filtrer rigoureusement les communications inter-VLAN. ' +
    'Ce sixième module couronne le programme CCNA par la maîtrise de la segmentation et de l’interconnexion L2/L3.',

  objectives: [
    'comprendre les bénéfices fonctionnels et sécuritaires des VLANs (Virtual Local Area Networks) pour partitionner les domaines de diffusion ;',
    'distinguer les plages de numérotation de VLANs : standard (1 à 1005) et étendue (1006 à 4094) ;',
    'différencier un port en mode Access (non balisé) d’un port en mode Trunk (balisé 802.1Q) ;',
    'analyser la structure de la balise Ethernet IEEE 802.1Q de 4 octets (TPID, PCP CoS, DEI, VLAN ID) ;',
    'comprendre le rôle du VLAN natif, les risques du Native VLAN Mismatch et les bonnes pratiques de sécurité ;',
    'mettre en œuvre le routage inter-VLAN Router-on-a-Stick (ROAS) avec sous-interfaces routeur (encapsulation dot1Q) ;',
    'diagnostiquer et dépanner les problèmes de négociation DTP, de VLANs autorisés et de configuration Trunk.'
  ],

  sections: [
    {
      title: 'Segmentation Logique par VLANs (Virtual LANs)',
      html: [
        '<p>Sans VLAN, tous les ports d’un commutateur appartiennent au même domaine de diffusion (broadcast domain). ' +
        'Un <strong>VLAN (Virtual Local Area Network)</strong> permet de partitionner logiquement un commutateur physique en plusieurs commutateurs ' +
        'virtuels indépendants. Les machines d’un même VLAN peuvent communiquer entre elles en couche 2, mais le trafic entre deux VLANs différents ' +
        'est <strong>strictement impossible sans équipement de routage de couche 3</strong>.</p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4 class="card-title">Avantages Clés des VLANs</h4>',
        '    <ul>',
        '      <li><strong>Sécurité renforcée :</strong> Cloisonnement strict des flux sensibles (RH, direction, invités, biomédical).</li>',
        '      <li><strong>Réduction des domaines de diffusion :</strong> Le trafic broadcast (ARP, DHCP) est confiné à son propre VLAN, préservant la bande passante.</li>',
        '      <li><strong>Flexibilité géographique :</strong> Deux postes du même service peuvent être sur le même VLAN bien que connectés à des switches d’étages différents.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4 class="card-title">Plages de Numéros de VLANs</h4>',
        '    <ul>',
        '      <li><strong>VLAN 1 :</strong> VLAN par défaut Cisco (non supprimable, transporte CDP, VTP, STP).</li>',
        '      <li><strong>VLAN 2 à 1001 :</strong> Plage standard (création normale, stockée dans <code>vlan.dat</code> en mémoire flash).</li>',
        '      <li><strong>VLAN 1002 à 1005 :</strong> Réservés historiques pour Token Ring et FDDI.</li>',
        '      <li><strong>VLAN 1006 à 4094 :</strong> Plage étendue (Extended VLANs, stockée dans la running-config).</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Ports Access vs Liens Trunk &amp; Balise IEEE 802.1Q',
      html: [
        '<p>Sur un commutateur Cisco, un port Ethernet peut fonctionner selon deux modes fondamentaux :</p>',

        '<ul>',
        '  <li><strong>Port d’accès (Access Port) :</strong> Raccordé à un équipement terminal (PC, imprimante, serveur standard). Il n’appartient qu’à <strong>un seul VLAN de données</strong>. Les trames envoyées sur ce port sont ordinaires (untagged, non balisées).</li>',
        '  <li><strong>Lien Trunk (Agrégation 802.1Q) :</strong> Interconnecte deux switches ou un switch et un routeur. Il est capable de transporter le trafic de <strong>multiples VLANs simultanément</strong> sur un seul câble physique. Pour distinguer à quel VLAN appartient chaque trame, le switch insère une <strong>balise (tag) IEEE 802.1Q de 4 octets</strong>.</li>',
        '</ul>',

        '<table class="table">',
        '  <thead>',
        '    <tr><th>Champ de la Balise 802.1Q</th><th>Taille</th><th>Description Technique</th></tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr><td><strong>TPID (Tag Protocol Identifier)</strong></td><td>16 bits (2 octets)</td><td>Valeur fixe <code>0x8100</code> identifiant la présence d’une balise dot1Q.</td></tr>',
        '    <tr><td><strong>PCP (Priority Code Point)</strong></td><td>3 bits (valeurs 0 à 7)</td><td>Indicateur de classe de service QoS (CoS) pour prioriser la voix (5) ou la vidéo (4).</td></tr>',
        '    <tr><td><strong>DEI (Drop Eligible Indicator)</strong></td><td>1 bit (0 ou 1)</td><td>Indique si la trame peut être éliminée en priorité lors d’une congestion de buffer.</td></tr>',
        '    <tr><td><strong>VID (VLAN Identifier)</strong></td><td>12 bits (valeurs 1 à 4094)</td><td>Numéro d’identification du VLAN auquel appartient la trame.</td></tr>',
        '  </tbody>',
        '</table>',

        box('warning', 'Le VLAN Natif et le Piège du Native VLAN Mismatch', [
          '<p>Sur un lien Trunk 802.1Q, le <strong>VLAN natif</strong> est le seul VLAN dont les trames circulent <strong>sans aucune balise (untagged)</strong>. Par défaut sur Cisco, c’est le VLAN 1.</p>',
          '<p><strong>Règle de sécurité impérative :</strong> Les deux extrémités du lien Trunk doivent impérativement avoir le <strong>même VLAN natif configuré</strong>. ' +
          'En cas de discordance (<em>Native VLAN Mismatch</em>), le commutateur émet des alertes CDP constantes et le trafic d’un VLAN fuite accidentellement dans un autre VLAN, créant une faille de sécurité majeure et des boucles STP.</p>'
        ].join('\n'))
      ].join('\n')
    },
    {
      title: 'Configuration d’un Trunk 802.1Q sous Cisco IOS',
      html: [
        '<p>Pour configurer et durcir un lien Trunk entre deux commutateurs sous Cisco IOS :</p>',

        '<pre><code>Switch(config)# interface GigabitEthernet0/1\n' +
        'Switch(config-if)# switchport mode trunk\n' +
        'Switch(config-if)# switchport trunk native vlan 99\n' +
        'Switch(config-if)# switchport trunk allowed vlan 10,20,30,99\n' +
        'Switch(config-if)# switchport nonegotiate\n' +
        'Switch(config-if)# description LIEN-TRUNK-VERS-SW-CORE</code></pre>',

        '<ul>',
        '  <li><code>switchport trunk native vlan 99</code> : Déplace le VLAN natif hors du VLAN 1 par défaut pour neutraliser les attaques par double étiquetage (Double Tagging VLAN Hopping).</li>',
        '  <li><code>switchport trunk allowed vlan</code> : Liste explicitement les seuls VLANs autorisés à franchir le trunk, réduisant l’inondation inutile.</li>',
        '  <li><code>switchport nonegotiate</code> : Désactive le protocole DTP (Dynamic Trunking Protocol) pour figer le port en trunk permanent.</li>',
        '</ul>'
      ].join('\n')
    },
    {
      title: 'Routage Inter-VLAN : La Méthode Router-on-a-Stick (ROAS)',
      html: [
        '<p>Puisque chaque VLAN est un sous-réseau IP isolé, faire communiquer deux machines situées sur des VLANs différents (ex: VLAN 10 et VLAN 20) ' +
        'requiert un équipement de niveau 3. La solution classique et économique est le <strong>Router-on-a-Stick (ROAS)</strong> :</p>',

        '<p>Un unique câble physique relie le commutateur au routeur. Le port du commutateur est configuré en <strong>Trunk</strong>. ' +
        'L’interface physique du routeur est subdivisée logiquement en <strong>sous-interfaces (subinterfaces)</strong> virtuelles, ' +
        'chacune dédiée à un VLAN spécifique avec la commande <code>encapsulation dot1Q &lt;vlan_id&gt;</code> et portant l’adresse IP de la passerelle par défaut :</p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4 class="card-title">Configuration Switch (L2)</h4>',
        '    <pre><code>Switch(config)# interface Gi0/24\nSwitch(config-if)# switchport mode trunk\nSwitch(config-if)# switchport trunk allowed vlan 10,20\nSwitch(config-if)# no shutdown</code></pre>',
        '  </div>',
        '  <div class="card">',
        '    <h4 class="card-title">Configuration Routeur (L3 ROAS)</h4>',
        '    <pre><code>Router(config)# interface Gi0/0\nRouter(config-if)# no shutdown\nRouter(config-if)# exit\nRouter(config)# interface Gi0/0.10\nRouter(config-subif)# encapsulation dot1Q 10\nRouter(config-subif)# ip address 192.168.10.254 255.255.255.0\nRouter(config-subif)# exit\nRouter(config)# interface Gi0/0.20\nRouter(config-subif)# encapsulation dot1Q 20\nRouter(config-subif)# ip address 192.168.20.254 255.255.255.0</code></pre>',
        '  </div>',
        '</div>',

        '<p><strong>Cheminement d’un paquet Inter-VLAN :</strong></p>',
        '<ol>',
        '  <li>L’hôte A (192.168.10.1) envoie un paquet pour l’hôte B (192.168.20.1) à sa passerelle 192.168.10.254.</li>',
        '  <li>Le switch reçoit la trame sur le port access VLAN 10, lui ajoute la balise 802.1Q avec VID=10 et l’envoie sur le Trunk Gi0/24.</li>',
        '  <li>Le routeur reçoit la trame sur la sous-interface Gi0/0.10, retire la balise dot1Q, consulte sa table de routage, décrémente le TTL.</li>',
        '  <li>Le routeur détermine que le réseau 192.168.20.0/24 est accessible via Gi0/0.20. Il ré-encapsule le paquet avec une nouvelle balise VID=20 et la MAC de l’hôte B.</li>',
        '  <li>Le switch reçoit la trame balisée VID=20, retire la balise et la remet en clair sur le port access de l’hôte B.</li>',
        '</ol>'
      ].join('\n')
    }
  ],

  methodTitle: 'Méthodologie de Déploiement &amp; Dépannage des VLANs et du ROAS',
  method: [
    'Étape 1 — Création des VLANs : Déclarer chaque VLAN sur tous les commutateurs (vlan 10, name Ventes) et vérifier avec « show vlan brief ».',
    'Étape 2 — Affectation des ports Access : Configurer chaque port terminal avec « switchport mode access » et « switchport access vlan <id> ».',
    'Étape 3 — Mise en place des Trunks : Configurer les liaisons inter-switches en « switchport mode trunk », fixer le VLAN natif et vérifier avec « show interfaces trunk ».',
    'Étape 4 — Configuration ROAS : Activer l’interface physique du routeur (no shutdown), créer les sous-interfaces, lier l’encapsulation dot1Q et assigner les IPs de passerelle.',
    'Étape 5 — Test de connectivité : Vérifier le ping local au sein du même VLAN, puis tester le ping inter-VLAN vers la passerelle et vers un hôte d’un autre VLAN.'
  ],

  summary: [
    'Un VLAN partitionne logiquement un réseau L2 en domaines de diffusion indépendants et étanches.',
    'La communication entre deux VLANs différents exige impérativement un équipement de niveau 3 (routeur ou switch L3).',
    'Un port Access véhicule du trafic non balisé pour un seul VLAN ; un port Trunk achemine plusieurs VLANs grâce à la balise 802.1Q.',
    'La balise IEEE 802.1Q (4 octets) comprend le TPID (0x8100), le PCP (QoS 3 bits), le DEI (1 bit) et le VID (VLAN ID 12 bits de 1 à 4094).',
    'Le VLAN natif transite sans balise sur le lien Trunk ; les deux extrémités doivent obligatoirement partager le même VLAN natif.',
    'Le Router-on-a-Stick (ROAS) mutualise une interface routeur physique via des sous-interfaces logiques (encapsulation dot1Q) pour router entre VLANs.'
  ],

  checklist: [
    'Je connais la différence fonctionnelle entre un port Access et un port Trunk.',
    'Je maîtrise la structure et la signification des 4 champs de la balise IEEE 802.1Q.',
    'Je sais configurer et vérifier un lien Trunk sous Cisco IOS (show interfaces trunk).',
    'Je comprends les dangers d’un Native VLAN Mismatch et sais comment le corriger.',
    'Je suis capable d’écrire sans erreur la configuration complète d’un routeur en Router-on-a-Stick.'
  ],

  notions: [
    'VLANs (plages 1-1005 et 1006-4094)',
    'Ports Access vs Liens Trunk',
    'Balise IEEE 802.1Q (TPID, PCP, DEI, VID)',
    'VLAN natif et risques de Native VLAN Mismatch',
    'Sécurisation de Trunk (allowed vlan, nonegotiate)',
    'Routage Inter-VLAN Router-on-a-Stick (ROAS)',
    'Sous-interfaces routeur (encapsulation dot1Q)',
    'Commandes de vérification (show vlan brief, show interfaces trunk)'
  ],

  pitfalls: [
    'Oublier de créer le VLAN sur le commutateur (« vlan 10 ») : un port affecté à un VLAN inexistant reste inactif.',
    'Oublier de taper « no shutdown » sur l’interface physique principale du routeur supportant les sous-interfaces ROAS.',
    'Configurer l’adresse IP sur une sous-interface AVANT d’avoir saisi « encapsulation dot1Q <vlan> » (Cisco IOS refuse la commande).',
    'Avoir un Native VLAN Mismatch entre deux switches, provoquant des fuites de paquets et des alertes CDP en boucle.',
    'Oublier d’inclure le VLAN dans la liste « switchport trunk allowed vlan », bloquant silencieusement tout son trafic sur le trunk.'
  ],

  questions: [
    {
      stem: 'Combien de bits compte le champ VLAN Identifier (VID) dans l’en-tête de la balise IEEE 802.1Q, et combien de VLANs distincts permet-il d’adresser au maximum ?',
      opts: [
        '8 bits permettant 256 VLANs',
        '12 bits permettant 4096 VLANs (de 0 à 4095)',
        '16 bits permettant 65536 VLANs',
        '10 bits permettant 1024 VLANs'
      ],
      correct: 1,
      exp: 'Le champ VID de la balise 802.1Q fait 12 bits, ce qui autorise 2^12 = 4096 valeurs (de 0 à 4095). Les VLANs exploitables s’étendent de 1 à 4094 (0 et 4095 étant réservés).'
    },
    {
      stem: 'Quelle est la particularité fondamentale du VLAN natif sur une liaison Trunk IEEE 802.1Q ?',
      opts: [
        'Ses trames sont chiffrées en AES-256',
        'Ses trames circulent sur le trunk sans aucune balise 802.1Q (untagged)',
        'Il ne peut transporter que du trafic de gestion SSH',
        'Il est automatiquement désactivé si plus de 10 VLANs sont présents'
      ],
      correct: 1,
      exp: 'Sur un trunk 802.1Q, les trames appartenant au VLAN natif ne reçoivent aucune balise (untagged). Tous les autres VLANs reçoivent la balise 802.1Q de 4 octets.'
    },
    {
      stem: 'Sur un routeur configuré en Router-on-a-Stick, quelle commande doit être impérativement saisie sur la sous-interface AVANT de lui attribuer une adresse IP ?',
      opts: [
        'no switchport',
        'encapsulation dot1Q <vlan_id>',
        'ip routing',
        'switchport mode trunk'
      ],
      correct: 1,
      exp: 'Cisco IOS exige d’abord de définir le protocole d’encapsulation et le VLAN associé avec « encapsulation dot1Q <vlan_id> » avant d’autoriser la saisie de la commande « ip address » sur une sous-interface.'
    },
    {
      stem: 'Quelle commande permet de vérifier sur un commutateur Cisco la liste des ports d’accès et les VLANs auxquels ils sont assignés ?',
      opts: ['show ip route', 'show vlan brief', 'show mac address-table', 'show interfaces trunk'],
      correct: 1,
      exp: 'La commande « show vlan brief » fournit un tableau récapitulatif de tous les VLANs configurés avec leur nom, leur statut et la liste des interfaces d’accès membres.'
    },
    {
      stem: 'Que se passe-t-il si deux commutateurs reliés par un trunk ont un VLAN natif différent (ex: VLAN 1 d’un côté et VLAN 99 de l’autre) ?',
      opts: [
        'Le lien trunk s’éteint électriquement',
        'Un Native VLAN Mismatch survient : le trafic du VLAN 1 fuite dans le VLAN 99 et des alertes CDP d’erreur sont générées',
        'Les commutateurs négocient automatiquement le plus petit numéro sans conséquence',
        'Toutes les trames 802.1Q sont converties en trames IPv6'
      ],
      correct: 1,
      exp: 'C’est une anomalie grave : la trame non balisée émise sur le VLAN 1 est reçue sans étiquette par l’autre switch qui l’attribue à son propre VLAN natif (le 99). Cela cause des fuites de trafic entre VLANs et des dysfonctionnements Spanning Tree.'
    },
    {
      stem: 'Quel protocole propriétaire Cisco négocie automatiquement le mode Trunk ou Access entre deux ports de switches interconnectés ?',
      opts: ['VTP (VLAN Trunking Protocol)', 'DTP (Dynamic Trunking Protocol)', 'CDP (Cisco Discovery Protocol)', 'STP (Spanning Tree Protocol)'],
      correct: 1,
      exp: 'DTP (Dynamic Trunking Protocol) négocie automatiquement la mise en trunk ou access. En environnement sécurisé, les bonnes pratiques recommandent de désactiver DTP avec « switchport nonegotiate ».'
    },
    {
      stem: 'Quelle est la taille totale de l’en-tête de balisage IEEE 802.1Q inséré dans une trame Ethernet ?',
      opts: ['2 octets', '4 octets (32 bits)', '8 octets', '14 octets'],
      correct: 1,
      exp: 'La balise 802.1Q fait exactement 4 octets (32 bits) : 2 octets pour le TPID (0x8100) et 2 octets pour le champ TCI (PCP 3 bits + DEI 1 bit + VID 12 bits).'
    },
    {
      stem: 'Pourquoi est-il nécessaire d’activer la commande « no shutdown » sur l’interface physique principale (ex: GigabitEthernet0/0) d’un routeur dans une architecture Router-on-a-Stick ?',
      opts: [
        'Parce que si l’interface physique parent est éteinte, toutes ses sous-interfaces logiques sont obligatoirement inactives',
        'Pour lui attribuer une adresse IP par défaut',
        'Pour activer le serveur DHCP sur le routeur',
        'Pour désactiver le protocole Spanning Tree sur le routeur'
      ],
      correct: 0,
      exp: 'Les sous-interfaces héritent de l’état physique de l’interface mère. Si l’interface GigabitEthernet0/0 reste sous shutdown, aucune sous-interface (.10, .20) ne pourra émettre ou recevoir de trafic.'
    }
  ],

  flashcards: [
    {
      q: 'Quel est l’objectif principal d’un VLAN ?',
      a: 'Segmenter logiquement un commutateur physique en plusieurs domaines de diffusion étanches pour améliorer la sécurité et optimiser la bande passante.'
    },
    {
      q: 'Quelle est la différence entre un port Access et un port Trunk ?',
      a: 'Un port Access n’appartient qu’à un seul VLAN et transmet des trames non balisées aux terminaux. Un port Trunk transporte plusieurs VLANs simultanément avec une balise 802.1Q.'
    },
    {
      q: 'Quels sont les champs composant la balise IEEE 802.1Q de 4 octets ?',
      a: 'TPID (16 bits, 0x8100), PCP (3 bits pour la QoS), DEI (1 bit pour l’éligibilité au rejet) et VID (12 bits pour le numéro de VLAN de 1 à 4094).'
    },
    {
      q: 'Qu’est-ce que le VLAN natif sur un lien Trunk ?',
      a: 'Le seul VLAN dont les trames transitent sur le trunk sans aucune balise 802.1Q. Les deux switches doivent avoir le même VLAN natif.'
    },
    {
      q: 'Qu’est-ce que l’architecture Router-on-a-Stick (ROAS) ?',
      a: 'Une architecture où un lien Trunk unique relie le switch à une interface routeur découpée en sous-interfaces virtuelles (dot1Q) assurant le routage inter-VLAN.'
    },
    {
      q: 'Quelle commande sous-interface routeur associe un VLAN ID sous Cisco IOS ?',
      a: 'encapsulation dot1Q <vlan_id> (à saisir impérativement avant l’adresse IP).'
    }
  ],

  mastery: [
    { cls: 'low', text: 'Moins de 4/8 : Révisez la différence entre port Access et Trunk, ainsi que la configuration des sous-interfaces ROAS.' },
    { cls: 'mid', text: 'De 4 à 6/8 : Bonnes connaissances de base. Approfondissez la structure de la balise 802.1Q et la sécurité du VLAN natif.' },
    { cls: 'good', text: '7/8 : Excellente maîtrise de la segmentation VLAN et du routage inter-VLAN Router-on-a-Stick.' },
    { cls: 'top', text: '8/8 : Ingénieur Réseau CCNA accompli ! Félicitations pour la validation des 6 modules théoriques et pratiques.' }
  ]
};
