/**
 * Chapitre 2 du cours « Réseau LAN Avancé B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 2,
  title: 'Agrégation de Liaisons EtherChannel (LACP &amp; PAgP) &amp; Répartition de Charge',
  short: 'EtherChannel &amp; LACP',
  toc: 'Bundles de liens logiques Port-Channel, protocoles de négociation LACP (802.3ad/802.1AX) et PAgP, modes actif/passif, contraintes strictes de cohérence de configuration, et algorithmes de hachage de flux.',
  time: '≈ 2 h 45 de travail',
  free: false,
  situation: 'Dans un réseau local d’entreprise, la bande passante requise entre les commutateurs d’accès, de distribution et de cœur dépasse rapidement la capacité d’une seule liaison physique. Si un administrateur câble deux liaisons physiques en parallèle sans configuration spécifique, le protocole Spanning Tree en bloque immédiatement une pour éviter une boucle, laissant 50 % de la capacité inutilisée. La technologie EtherChannel permet de regrouper jusqu’à 8 liaisons physiques parallèles en un unique canal logique (Port-Channel), augmentant la bande passante globale tout en offrant une redondance instantanée en cas de coupure de câble. L’ingénieur réseau de niveau Bachelor 3 doit maîtriser la négociation standardisée IEEE LACP (Link Aggregation Control Protocol) vs Cisco PAgP, imposer une cohérence absolue des paramètres de ports membres et comprendre les fonctions mathématiques de hachage pour garantir une répartition de charge optimale.',
  objectives: [
    'comprendre le principe de l’agrégation de liens Ethernet et l’interaction avec le Spanning Tree ;',
    'comparer le protocole standard LACP (IEEE 802.3ad / 802.1AX) et le protocole propriétaire Cisco PAgP ;',
    'analyser la matrice des modes de négociation (active, passive, desirable, auto, on) ;',
    'identifier et auditer les exigences de compatibilité stricte des ports membres d’un bundle ;',
    'calculer la répartition de trafic selon les algorithmes de hachage (src-mac, dst-mac, src-dst-ip, ports TCP/UDP) ;',
    'analyser et résoudre méthodologiquement des simulateurs de négociation EtherChannel, des répartiteurs de hachage et des auditeurs de cohérence.'
  ],
  sections: [
    {
      title: 'Fondements de l’Agrégation de Liaisons & Rôle du Port-Channel',
      html: [
        '<p>L’agrégation de liaisons (EtherChannel) permet de regrouper de 2 à 8 liaisons Ethernet physiques en une interface logique unique désignée sous le nom de <strong>Port-Channel</strong>. Du point de vue du protocole Spanning Tree, l’ensemble du faisceau apparaît comme une seule et unique interface : <strong>aucun des liens physiques n’est bloqué</strong>, et la bande passante cumulée est immédiatement disponible.</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Avantages Techniques Majeurs</h4>',
        '    <ul>',
        '      <li><strong>Augmentation de la Bande Passante :</strong> Un bundle de 4 liaisons GigabitEthernet offre une capacité agrégée de 4 Gbps en Full Duplex.</li>',
        '      <li><strong>Tolérance aux Pannes Instantanée :</strong> Si une fibre optique ou un port physique est coupé, le trafic est redistribué sur les liaisons restantes en moins d’une seconde sans recalcul Spanning Tree.</li>',
        '      <li><strong>Stabilité Topologique :</strong> Le Spanning Tree n’observe aucun changement d’état (TCN - Topology Change Notification) tant qu’au moins un lien physique du bundle reste opérationnel.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Limites Fondamentales : Ce que l\'EtherChannel n\'est Pas</h4>',
        '    <p>Il est crucial de comprendre qu’un EtherChannel ne réalise pas de fragmentation de paquets au niveau bit : <strong>un flux réseau unique entre deux stations ne peut jamais dépasser la vitesse d’un seul lien physique</strong> (ex: un téléchargement de fichier unique restera plafonné à 1 Gbps sur un bundle de 4 x 1 Gbps).</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Protocoles de Négociation Dynamique : LACP vs PAgP & Modes',
      html: [
        '<p>Pour éviter les boucles en cas de mauvaise connectivité ou de câble croisé, les liaisons doivent négocier dynamiquement la formation du canal logique à l’aide d’un protocole d’agrégation :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. LACP (Link Aggregation Control Protocol)</h4>',
        '    <p>Standardisé par l’IEEE sous la norme <strong>802.3ad</strong> puis <strong>802.1AX</strong>. Utilisé dans tous les environnements hétérogènes multi-vendeurs :</p>',
        '    <ul>',
        '      <li><code>active</code> : Le port envoie activement des trames LACPDUs et sollicite l’agrégation.</li>',
        '      <li><code>passive</code> : Le port écoute et répond uniquement s’il reçoit des trames LACPDUs d’un voisin actif.</li>',
        '      <li><strong>Règle de succès :</strong> <code>active-active</code> (succès) ou <code>active-passive</code> (succès). La combinaison <code>passive-passive</code> échoue (aucun émetteur).</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. PAgP (Port Aggregation Protocol)</h4>',
        '    <p>Protocole propriétaire historique de Cisco :</p>',
        '    <ul>',
        '      <li><code>desirable</code> : Sollicite activement la négociation PAgP avec l’autre extrémité.</li>',
        '      <li><code>auto</code> : Répond uniquement aux sollicitations reçues.</li>',
        '      <li><strong>Règle de succès :</strong> <code>desirable-desirable</code> ou <code>desirable-auto</code>. La combinaison <code>auto-auto</code> échoue.</li>',
        '    </ul>',
        '  </div>',
        '</div>',
        box('warning', 'Le Mode Statique Sans Protocole (« channel-group 1 mode on »)', [
          '<p>Le mode <code>on</code> force l’agrégation des ports sans aucune trame de négociation. <strong>Cette configuration est fortement déconseillée en production</strong> : si l’un des câbles est débranché ou relié par erreur à un port tiers, le commutateur continuera d’acheminer du trafic sur ce lien, provoquant une perte de paquets massive ou une boucle de niveau 2 incontrôlable.</p>'
        ])
      ].join('\n')
    },
    {
      title: 'Cohérence Strict des Membres & Algorithmes de Hachage de Flux',
      html: [
        '<p>Pour qu’un port physique puisse être agrégé dans un Port-Channel, il doit respecter des critères de compatibilité stricts avec les autres membres du groupe :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Exigences de Cohérence des Membres</h4>',
        '    <ul>',
        '      <li><strong>Vitesse &amp; Duplex :</strong> Même débit physique (tous 1 Gbps ou tous 10 Gbps) et même duplex (Full obligatoire).</li>',
        '      <li><strong>Type de Commutation :</strong> Tous en mode <code>access</code> (sur le même VLAN) ou tous en mode <code>trunk</code>.</li>',
        '      <li><strong>Configuration Trunk :</strong> Même protocole d’encapsulation (802.1Q), même <strong>VLAN natif</strong> et même liste de VLANs autorisés (<code>allowed vlan</code>).</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Mécanismes de Hachage et Répartition de Charge</h4>',
        '    <p>Le commutateur sélectionne le lien physique sur lequel émettre chaque trame en calculant une fonction de hachage mathématique (typiquement un XOR binaire) sur les champs d’en-tête configurés :</p>',
        '    <ul>',
        '      <li><code>src-mac</code> ou <code>dst-mac</code> : Hachage sur l’adresse MAC source ou destination.</li>',
        '      <li><code>src-dst-ip</code> : Hachage combiné sur les adresses IP source et destination.</li>',
        '      <li><code>src-dst-mixed-ip-port</code> : Hachage complet combinant adresses IP et ports TCP/UDP pour une granularité maximale.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],
  method: [
    'Étape 1 : Vérifier la cohérence matérielle des interfaces physiques sélectionnées (même vitesse de ligne, même support cuivre ou fibre).',
    'Étape 2 : Configurer les interfaces membres avec les paramètres de couche 2 souhaités (mode trunk, VLAN natif, VLANs autorisés).',
    'Étape 3 : Affecter les interfaces au groupe d’agrégation en privilégiant le standard LACP avec le mode active (ex: channel-group 1 mode active).',
    'Étape 4 : Vérifier l’état opérationnel du bundle via la commande CLI show etherchannel summary (drapeaux SU et P requis).',
    'Étape 5 : Configurer l’algorithme d’équilibrage de charge approprié sur le commutateur (port-channel load-balance src-dst-ip).',
    'Étape 6 : Auditer la répartition effective des flux entre les liaisons physiques pour détecter d’éventuelles asymétries de charge.'
  ],
  summary: [
    'EtherChannel agrège jusqu’à 8 liaisons physiques en un Port-Channel logique unique perçu comme une seule interface par STP.',
    'LACP (IEEE 802.3ad / 802.1AX) est le standard ouvert universel utilisant les modes active et passive.',
    'PAgP est le protocole propriétaire Cisco utilisant les modes de négociation desirable et auto.',
    'Le mode forcé on est dangereux car il ne vérifie aucune cohérence de câblage à l’extrémité distante.',
    'Toute discordance de vitesse, duplex, mode de port ou VLAN natif provoque la désactivation immédiate du port membre.',
    'La répartition de charge s’effectue par hachage de flux (XOR) sur les adresses MAC, IP ou couples de ports TCP/UDP.'
  ],
  checklist: [
    'Je comprends l’intérêt d’un Port-Channel vis-à-vis du Spanning Tree pour éviter le blocage de liens redondants.',
    'Je maîtrise les combinaisons gagnantes et perdantes des modes LACP (active / passive).',
    'Je connais les différences fondamentales entre LACP (standard) et PAgP (propriétaire Cisco).',
    'Je sais identifier toutes les propriétés de configuration qui doivent être rigoureusement identiques sur les ports membres.',
    'Je sais expliquer pourquoi un transfert de fichier unique ne peut dépasser le débit d’un seul lien physique d’un bundle.',
    'Je sais choisir la méthode d’équilibrage de charge de hachage la plus adaptée à l’environnement applicatif.'
  ],
  notions: [
    'Agrégation de Liens (EtherChannel)',
    'Interface Logique Port-Channel',
    'Standard LACP (IEEE 802.3ad / 802.1AX)',
    'Protocole Propriétaire Cisco PAgP',
    'Modes Active, Passive, Desirable, Auto',
    'Cohérence de Configuration des Membres',
    'Algorithmes de Hachage de Flux (Load Balancing)',
    'Vérification CLI (show etherchannel summary)'
  ],
  pitfalls: [
    'Configurer les deux extrémités en mode passive en LACP, laissant le Port-Channel éternellement inactif.',
    'Avoir un VLAN natif différent entre un port membre et le Port-Channel, provoquant la suspension immédiate du membre.',
    'Croire qu’un EtherChannel 4 x 1 Gbps permet à un client unique de télécharger un fichier à 4 Gbps.',
    'Utiliser le hachage src-mac sur un commutateur relié à un routeur ou un pare-feu où toutes les trames entrantes partagent la même MAC source.'
  ],
  questions: [
    {
      stem: 'Quel est l’effet de la création d’un Port-Channel sur le comportement du protocole Spanning Tree ?',
      opts: [
        'STP bloque tous les liens physiques du bundle sauf un',
        'STP traite le faisceau comme un unique lien logique et ne bloque aucun des liens physiques membres',
        'STP est entièrement désactivé sur l’ensemble du commutateur',
        'STP convertit toutes les trames en paquets UDP'
      ],
      correct: 1,
      exp: 'Pour STP, le Port-Channel est perçu comme une seule interface logique à haut débit : aucun lien physique membre n’est bloqué.'
    },
    {
      stem: 'Quel standard ouvert international régit le protocole LACP (Link Aggregation Control Protocol) ?',
      opts: [
        'IEEE 802.1D',
        'IEEE 802.11ax',
        'IEEE 802.3ad / 802.1AX',
        'RFC 1918'
      ],
      correct: 2,
      exp: 'LACP est défini par la norme IEEE 802.3ad, ultérieurement reprise sous la dénomination IEEE 802.1AX.'
    },
    {
      stem: 'Quelle combinaison de modes LACP entre deux commutateurs interconnectés N’ABOUTIT PAS à la création d’un canal ?',
      opts: [
        'active et active',
        'active et passive',
        'passive et passive',
        'Toutes les combinaisons précédentes aboutissent'
      ],
      correct: 2,
      exp: 'En mode passive-passive, les deux extrémités attendent passivement de recevoir un paquet LACP sans jamais en émettre. Le canal ne monte jamais.'
    },
    {
      stem: 'Dans le protocole PAgP de Cisco, quels sont les deux modes configurables ?',
      opts: [
        'active et passive',
        'desirable et auto',
        'master et backup',
        'primary et secondary'
      ],
      correct: 1,
      exp: 'PAgP utilise les modes desirable (sollicite activement) et auto (répond passivement aux sollicitations).'
    },
    {
      stem: 'Pourquoi l’utilisation du mode forcé « mode on » est-elle risquée en environnement de production ?',
      opts: [
        'Parce qu’il consomme trop de puissance électrique',
        'Parce qu’il force l’agrégation sans vérifier la compatibilité ni le bon raccordement des câbles à l’extrémité distante',
        'Parce qu’il limite la vitesse à 10 Mbps',
        'Parce qu’il est incompatible avec les commutateurs modernes'
      ],
      correct: 1,
      exp: 'Le mode on n’échange aucune trame de contrôle. Si un câble est mal raccordé ou défectueux, il peut engendrer une boucle ou une perte de trafic silencieuse.'
    },
    {
      stem: 'Si un port membre d’un bundle présente un VLAN natif différent de celui configuré sur le Port-Channel, quelle est la conséquence ?',
      opts: [
        'Le Port-Channel adopte immédiatement le nouveau VLAN',
        'Le port membre est suspendu et placé en anomalie (err-disable / suspended)',
        'Le commutateur redémarre automatiquement',
        'Les trames sont encapsulées en IPv6'
      ],
      correct: 1,
      exp: 'La cohérence de configuration est stricte : toute discordance de VLAN natif provoque la suspension du port membre pour éviter les fuites inter-VLANs.'
    },
    {
      stem: 'Un client effectue un transfert de fichier unique vers un serveur à travers un EtherChannel composé de 4 liens à 1 Gbps. Quel débit maximal peut-il atteindre ?',
      opts: [
        '4 Gbps',
        '1 Gbps',
        '2 Gbps',
        '500 Mbps'
      ],
      correct: 1,
      exp: 'Un flux réseau unique suit le résultat d’une fonction de hachage et emprunte un seul lien physique physique à la fois : son débit reste borné à 1 Gbps.'
    },
    {
      stem: 'Dans la sortie de la commande « show etherchannel summary », quels drapeaux indiquent un Port-Channel de niveau 2 opérationnel et ses membres actifs ?',
      opts: [
        'D (Down) et S (Suspend)',
        'SU (Layer 2, In-use) et P (Bundled in port-channel)',
        'RU (Layer 3, Unused) et I (Individual)',
        'W (Waiting) et M (Master)'
      ],
      correct: 1,
      exp: 'Le drapeau S indique un canal de niveau 2 (Layer 2), U signifie en cours d’utilisation (In-use), et le drapeau P confirme que le port physique est agrégé dans le bundle.'
    }
  ],
  flashcards: [
    {
      q: 'Quel est l’avantage d’EtherChannel vis-à-vis du Spanning Tree ?',
      a: 'Il regroupe plusieurs liens physiques en un seul port logique, évitant ainsi que STP ne bloque les liens redondants.'
    },
    {
      q: 'Quel est le standard officiel de LACP ?',
      a: 'IEEE 802.3ad / IEEE 802.1AX.'
    },
    {
      q: 'Pourquoi la combinaison LACP passive / passive échoue-t-elle ?',
      a: 'Parce qu’aucun des deux équipements n’envoie de trames LACPDUs pour initier la négociation.'
    },
    {
      q: 'Quels paramètres doivent impérativement être identiques sur tous les ports membres d’un bundle ?',
      a: 'La vitesse, le mode duplex, le mode d’accès/trunk, le VLAN natif et la liste des VLANs autorisés.'
    },
    {
      q: 'Comment s’effectue la répartition de trafic dans un EtherChannel ?',
      a: 'Par calcul d’un hachage (XOR) sur les adresses MAC, IP ou ports TCP/UDP pour affecter chaque flux à un lien membre.'
    },
    {
      q: 'Un flux unique peut-il dépasser la vitesse d’un lien physique individuel ?',
      a: 'Non, chaque flux réseau individuel est assigné à une seule interface physique du bundle.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Difficultés à mémoriser les modes LACP/PAgP ou confusion sur le débit atteignable par un flux unique.'
    },
    {
      cls: 'medium',
      text: 'Bonne compréhension de la négociation LACP, configuration d’un Port-Channel et audit de la cohérence des membres.'
    },
    {
      cls: 'high',
      text: 'Maîtrise approfondie des algorithmes de hachage de flux, optimisation de l’équilibrage de charge et dépannage complexe d’EtherChannel multi-châssis.'
    }
  ]
};
