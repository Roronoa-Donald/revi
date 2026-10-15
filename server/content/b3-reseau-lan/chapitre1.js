/**
 * Chapitre 1 du cours « Réseau LAN Avancé B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 1,
  title: 'Spanning Tree Protocol Avancé (STP / RSTP / MSTP) &amp; Mécanismes de Protection',
  short: 'STP, RSTP &amp; Protections',
  toc: 'Boucles de commutation de niveau 2, élection Root Bridge, sélection Root Port et Designated Port, convergence RSTP 802.1w, instances MSTP 802.1s, BPDU Guard, Root Guard et Loop Guard.',
  time: '≈ 2 h 45 de travail',
  free: true,
  situation: 'Dans un réseau local d’entreprise (LAN) de campus, la redondance des liens physiques entre commutateurs est indispensable pour prévenir les ruptures de service. Cependant, cette topologie maillée engendre un risque catastrophique : les boucles de niveau 2, provoquant des tempêtes de diffusion (broadcast storms), des instabilités permanentes de tables CAM (MAC flapping) et la duplication incontrôlée de trames Ethernet. L’ingénieur réseau de niveau Bachelor 3 doit maîtriser l’évolution des protocoles de l’arbre couvrant (IEEE 802.1D classique, 802.1w Rapid Spanning Tree et 802.1s Multiple Spanning Tree), calculer précisément les élections de pont racine et de ports de transit, et déployer les mécanismes indispensables de durcissement (BPDU Guard, Root Guard et Loop Guard) pour bâtir un cœur de réseau parfaitement stable et sécurisé.',
  objectives: [
    'comprendre les mécanismes destructeurs des boucles de niveau 2 (tempête de broadcast, MAC flapping) ;',
    'analyser la structure du Bridge Identifier (BID 802.1t) et simuler l’élection déterministe du Root Bridge ;',
    'calculer la sélection des Root Ports, Designated Ports et Alternate/Backup Ports selon les métriques IEEE ;',
    'comparer les mécanismes de convergence de 802.1D et la poignée de main Proposal / Agreement de RSTP 802.1w ;',
    'configurer et optimiser les instances régionales Multiple Spanning Tree Protocol (MSTP 802.1s) ;',
    'développer en Python 3 des simulateurs d’élection STP, des calculateurs de chemin et des auditeurs de sécurité BPDU.'
  ],
  sections: [
    {
      title: 'Topologies Maillées & Vulnérabilités de Niveau 2 (La Nécessité du STP)',
      html: [
        '<p>Contrairement au protocole IPv4 ou IPv6 qui intègre un champ de durée de vie <em>TTL (Time-To-Live)</em> ou <em>Hop Limit</em> décrémenté par chaque routeur, <strong>l’en-tête Ethernet de niveau 2 ne possède aucun mécanisme de fin de vie</strong>. Par conséquent, toute trame de diffusion (Broadcast, Multicast ou unicast inconnu) injectée dans une boucle physique circule indéfiniment.</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Conséquences d\'une Boucle de Commutation Non Maîtrisée</h4>',
        '    <ul>',
        '      <li><strong>Broadcast Storm (Tempête de Diffusion) :</strong> Multiplication exponentielle des trames broadcast (ex: requêtes ARP), saturant 100 % de la bande passante des liaisons physiques en quelques secondes.</li>',
        '      <li><strong>MAC Address Flapping (Instabilité de Table CAM) :</strong> Le commutateur apprend la même adresse MAC alternativement sur deux ports distincts toutes les millisecondes, épuisant le CPU du plan de contrôle.</li>',
        '      <li><strong>Duplication Multiple de Trames :</strong> Les stations d’extrémité reçoivent des copies multiples d’un même paquet, provoquant des crashs applicatifs et des corruptions de flux TCP.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Le Rôle Fondamental du Spanning Tree Protocol</h4>',
        '    <p>Le Spanning Tree Protocol (STP) résout ce problème en découvrant dynamiquement la topologie réseau par échange de trames <strong>BPDU (Bridge Protocol Data Units)</strong>. Il calcule un arbre couvrant sans boucle en bloquant logiquement les ports redondants tout en maintenant les liens physiques prêts à reprendre le trafic en cas de panne.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Élection du Root Bridge & Détermination des Rôles de Ports',
      html: [
        '<p>L’algorithme Spanning Tree suit une cinématique déterministe en quatre étapes successives pour chaque topologie ou VLAN :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. Élection Unique du Root Bridge (Pont Racine)</h4>',
        '    <p>Le commutateur possédant le <strong>Bridge ID (BID)</strong> le plus bas est élu racine :</p>',
        '    <ul>',
        '      <li><strong>Bridge Priority (4 bits) :</strong> Multiples de 4096 (de 0 à 61440, valeur par défaut : <code>32768</code>).</li>',
        '      <li><strong>Extended System ID (12 bits) :</strong> VLAN ID correspondant (1 à 4094).</li>',
        '      <li><strong>Adresse MAC (48 bits) :</strong> Plus petite adresse physique utilisée comme critère ultime de départage.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Sélection du Root Port (RP) sur Chaque Commutateur Non-Racine</h4>',
        '    <p>Chaque switch élit un unique port racine orienté vers le Root Bridge selon les critères stricts suivants :</p>',
        '    <ol>',
        '      <li>Le coût de chemin cumulé vers la racine (<strong>Root Path Cost</strong>) le plus faible.</li>',
        '      <li>Le <strong>Bridge ID</strong> du commutateur voisin émetteur du BPDU le plus bas.</li>',
        '      <li>Le <strong>Port ID (PID)</strong> du voisin le plus bas (priorité de port + numéro de port).</li>',
        '    </ol>',
        '  </div>',
        '</div>',
        box('standard', 'Rôles et États de Ports dans IEEE 802.1w (RSTP)', [
          '<p>Le protocole rapide RSTP 802.1w simplifie la machine à états de 802.1D en trois états : <em>Discarding</em>, <em>Learning</em> et <em>Forwarding</em>. Les rôles de ports sont enrichis :</p>',
          '<ul>',
          '  <li><strong>Root Port (RP) :</strong> Port offrant le chemin le plus rapide vers le pont racine (Forwarding).</li>',
          '  <li><strong>Designated Port (DP) :</strong> Port responsable de l’acheminement du trafic sur un segment physique local (Forwarding). Tous les ports du Root Bridge sont Designated.</li>',
          '  <li><strong>Alternate Port (AP) :</strong> Port de secours prêt à remplacer instantanément le Root Port en cas de rupture de lien (Discarding).</li>',
          '  <li><strong>Backup Port (BP) :</strong> Port redondant sur un même segment partagé avec un Designated Port local (Discarding).</li>',
          '</ul>'
        ])
      ].join('\n')
    },
    {
      title: 'Mécanismes de Sécurisation & Durcissement STP de Niveau 2',
      html: [
        '<p>Pour empêcher qu’un équipement non autorisé, un câble mal branché ou une attaque malveillante ne déstabilise la topologie de l’arbre couvrant, des mécanismes de protection avancés doivent être configurés :</p>',
        '<div class="grid grid-3">',
        '  <div class="card">',
        '    <h4>BPDU Guard</h4>',
        '    <p>Activé sur tous les ports d’accès utilisateurs configurés en <em>PortFast</em>. Si un BPDU est détecté sur ce port (branchement d’un commutateur sauvage), le port est <strong>instantanément désactivé en état err-disable</strong> pour empêcher toute attaque sur la racine.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Root Guard</h4>',
        '    <p>Déployé sur les ports d’interconnexion où le pont racine ne doit jamais se trouver (ex: liaisons vers les commutateurs d’accès). Si un commutateur envoie un BPDU supérieur revendiquant le rôle de Root Bridge, le port passe en état <code>root-inconsistent</code> et bloque le trafic.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Loop Guard &amp; UDLD</h4>',
        '    <p>Protège contre les pannes matérielles de liaisons unidirectionnelles (ex: rupture de la fibre RX). Loop Guard empêche un port Alternate ou Root de devenir faussement Designated par absence de BPDUs en le maintenant en état <code>loop-inconsistent</code>.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],
  method: [
    'Étape 1 : Cartographier la topologie physique du LAN et identifier le commutateur cœur devant être élu Root Bridge principal.',
    'Étape 2 : Configurer explicitement la priorité STP du pont racine à 4096 (ou 0) et celle du pont de secours à 8192.',
    'Étape 3 : Calculer et vérifier les coûts de liaisons STP pour s’assurer que les liens à plus haut débit (10G/40G) sont privilégiés.',
    'Étape 4 : Activer le standard rapide RSTP (Rapid-PVST+ ou MSTP 802.1s) pour garantir une convergence sub-seconde.',
    'Étape 5 : Déployer PortFast et BPDU Guard de manière systématique sur l’ensemble des ports d’accès connectés aux postes de travail.',
    'Étape 6 : Activer Root Guard et Loop Guard sur les liaisons montantes critiques pour pérenniser l’arbre couvrant.'
  ],
  summary: [
    'Les boucles de niveau 2 engendrent des tempêtes de broadcast dévastatrices dues à l’absence de TTL dans la trame Ethernet.',
    'Le commutateur possédant le Bridge ID le plus bas (Priority + Extended System ID + MAC) est obligatoirement élu Root Bridge.',
    'Chaque commutateur non-racine élit un unique Root Port en évaluant le coût de chemin, puis le BID voisin et le PID voisin.',
    'RSTP 802.1w accélère la convergence grâce au mécanisme actif de négociation Proposal / Agreement en sautant les délais passifs.',
    'BPDU Guard place immédiatement en état err-disable tout port d’accès PortFast recevant une trame BPDU.',
    'Root Guard empêche les commutateurs non autorisés de détourner le rôle de Root Bridge en isolant le port en mode root-inconsistent.'
  ],
  checklist: [
    'Je sais expliquer pourquoi une boucle Ethernet est infinie en l’absence de champ TTL.',
    'Je maîtrise le découpage du BID en priorité de pont (4 bits), VLAN ID (12 bits) et adresse MAC (48 bits).',
    'Je sais départager deux chemins STP en comparant le coût cumulé, le BID de l’émetteur et le numéro de port.',
    'Je connais les 3 états (Discarding, Learning, Forwarding) et les 4 rôles de ports de RSTP 802.1w.',
    'Je sais configurer et auditer l’action de BPDU Guard en cas de raccordement d’un switch non autorisé.',
    'Je comprends l’utilité de Root Guard pour figer l’emplacement de la racine sur le commutateur de cœur.'
  ],
  notions: [
    'Boucles de Niveau 2 & Tempêtes de Broadcast',
    'Bridge ID (BID) & Extended System ID',
    'Élection Root Bridge STP',
    'Sélection Root Port & Designated Port',
    'Rapid Spanning Tree (RSTP 802.1w)',
    'Mécanisme Proposal / Agreement',
    'Protection BPDU Guard & err-disable',
    'Root Guard & Loop Guard'
  ],
  pitfalls: [
    'Laisser la priorité STP par défaut (32768) sur tous les switchs, laissant l’adresse MAC la plus ancienne choisir un switch d’accès obsolète comme Root Bridge.',
    'Activer PortFast sur un port interconnectant deux commutateurs, risquant d’engendrer une tempête de diffusion instantanée lors d’un changement de topologie.',
    'Oublier d’aligner les numéros de révision et les mappages VLAN-instance dans une région MSTP, provoquant un repli involontaire en mode compatibilité 802.1D.',
    'Confondre Root Guard (qui protège le rôle racine) et BPDU Guard (qui interdit toute trame BPDU sur les ports d’accès).'
  ],
  questions: [
    {
      stem: 'Pourquoi une boucle de commutation de niveau 2 est-elle plus destructrice qu’une boucle de routage de niveau 3 ?',
      opts: [
        'Parce que les trames Ethernet sont chiffrées par défaut',
        'Parce que l’en-tête Ethernet ne contient aucun champ de durée de vie (TTL) pour détruire les paquets en boucle',
        'Parce que le câble Ethernet s’échauffe physiquement sous l’effet des boucles',
        'Parce que les routeurs n’acceptent pas les adresses MAC impaires'
      ],
      correct: 1,
      exp: 'L’en-tête Ethernet 802.3 ne comporte aucun champ TTL. En cas de boucle physique sans STP, les trames tournent indéfiniment jusqu’à saturation totale des liaisons.'
    },
    {
      stem: 'Dans la norme IEEE 802.1t, comment la priorité de pont est-elle structurée sur les 2 octets de poids fort du BID ?',
      opts: [
        '16 bits continus de priorité sans distinction de VLAN',
        '4 bits de priorité (multiples de 4096) et 12 bits d’identifiant de système étendu (VLAN ID)',
        '8 bits de priorité et 8 bits d’adresse IP',
        '1 bit de polarité et 15 bits de numéro de port'
      ],
      correct: 1,
      exp: 'La norme 802.1t dédie 4 bits à la priorité (valeurs multiples de 4096 : 0, 4096, 8192, ..., 61440) et 12 bits au VLAN ID (Extended System ID).'
    },
    {
      stem: 'En cas d’égalité stricte de priorité totale entre deux commutateurs, quel critère physique détermine le Root Bridge ?',
      opts: [
        'L’adresse IP la plus élevée',
        'L’adresse MAC la plus basse numériquement',
        'Le nombre de ports physiques connectés',
        'La vitesse du processeur central'
      ],
      correct: 1,
      exp: 'En cas d’égalité de priorité, le commutateur dont l’adresse MAC est la plus basse (plus petite valeur hexadécimale) remporte l’élection de Root Bridge.'
    },
    {
      stem: 'Quel est le premier critère examiné par un commutateur non-racine pour sélectionner son Root Port ?',
      opts: [
        'Le Port ID le plus faible',
        'Le coût cumulé du chemin vers la racine (Root Path Cost) le plus bas',
        'Le Bridge ID du commutateur voisin le plus bas',
        'Le débit maximal de la carte mère'
      ],
      correct: 1,
      exp: 'Le commutateur compare en priorité le coût cumulé de la liaison vers le Root Bridge. Les autres critères (BID voisin, PID voisin) ne servent qu’en cas d’égalité de coût.'
    },
    {
      stem: 'Dans RSTP 802.1w, quel rôle de port correspond à un port de secours prêt à remplacer immédiatement le Root Port en cas de coupure ?',
      opts: [
        'Designated Port',
        'Alternate Port',
        'Backup Port',
        'Disabled Port'
      ],
      correct: 1,
      exp: 'L’Alternate Port est en attente (Discarding) et offre un chemin alternatif vers le Root Bridge, prêt à basculer immédiatement en état Forwarding.'
    },
    {
      stem: 'Comment le protocole RSTP 802.1w parvient-il à converger en quelques dizaines de millisecondes sans attendre les timers passifs ?',
      opts: [
        'En désactivant temporairement tous les VLANs du réseau',
        'Grâce au mécanisme de synchronisation active par poignée de main Proposal / Agreement sur liaisons point-à-point',
        'En forçant le redémarrage électrique de tous les commutateurs voisins',
        'En utilisant des paquets ICMP Echo réguliers'
      ],
      correct: 1,
      exp: 'RSTP utilise une poignée de main explicite Proposal / Agreement qui négocie directement la transition vers l’état Forwarding sans délai de minuterie.'
    },
    {
      stem: 'Quelle action la fonctionnalité BPDU Guard entreprend-elle si une trame BPDU est reçue sur un port configuré en PortFast ?',
      opts: [
        'Elle ignore simplement la trame BPDU',
        'Elle désactive immédiatement le port et le place en état err-disable',
        'Elle modifie la priorité du commutateur distant',
        'Elle route le paquet vers la passerelle par défaut'
      ],
      correct: 1,
      exp: 'BPDU Guard considère la réception d’un BPDU sur un port d’accès utilisateur comme une anomalie critique et désactive le port en état err-disable.'
    },
    {
      stem: 'Dans quel état un port protégé par Root Guard est-il placé s’il reçoit un BPDU revendiquant une priorité supérieure à celle de la racine actuelle ?',
      opts: [
        'Forwarding immédiat',
        'Root-inconsistent (blocage du trafic sur le port)',
        'Shutdown électrique',
        'Loop-free mirroring'
      ],
      correct: 1,
      exp: 'Root Guard protège la hiérarchie en basculant le port en état root-inconsistent (écoute bloquée) jusqu’à ce que les BPDUs illégitimes cessent d’être émis.'
    }
  ],
  flashcards: [
    {
      q: 'Pourquoi une trame Ethernet peut-elle boucler indéfiniment sans s’arrêter ?',
      a: 'Car l’en-tête Ethernet de niveau 2 ne possède aucun champ Time-To-Live (TTL).'
    },
    {
      q: 'Quels sont les deux composants du Bridge ID (BID) dans la norme 802.1t ?',
      a: 'La Bridge Priority (4 bits, multiple de 4096) combinée au VLAN ID (12 bits), suivie de l’adresse MAC (48 bits).'
    },
    {
      q: 'Quel commutateur est élu Root Bridge dans un réseau Spanning Tree ?',
      a: 'Celui qui possède le plus petit Bridge ID (priorité la plus basse, puis adresse MAC la plus basse).'
    },
    {
      q: 'Quels sont les trois critères successifs de sélection d’un Root Port ?',
      a: '1. Plus faible coût de chemin (Root Path Cost) ; 2. Plus petit BID voisin ; 3. Plus petit PID voisin.'
    },
    {
      q: 'Que fait la protection BPDU Guard sur un port d’accès ?',
      a: 'Elle coupe le port en état err-disable dès qu’une trame BPDU y est reçue.'
    },
    {
      q: 'Quelle est la différence fondamentale entre Alternate Port et Backup Port dans RSTP ?',
      a: 'L’Alternate Port offre un chemin alternatif vers la racine (remplace le RP) ; le Backup Port offre un chemin redondant sur le même segment (remplace un DP).'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Difficultés à calculer le BID complet ou confusion entre les rôles de Root Port et Designated Port.'
    },
    {
      cls: 'medium',
      text: 'Bonne maîtrise de l’élection Root Bridge, calcul des chemins STP et compréhension des protections BPDU Guard.'
    },
    {
      cls: 'high',
      text: 'Expertise totale de la convergence sub-seconde RSTP, découpage en instances MSTP et durcissement avancé contre les attaques de niveau 2.'
    }
  ]
};
