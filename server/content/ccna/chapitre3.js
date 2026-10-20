/**
 * Chapitre 3 du cours « CCNA Réseau » B2 — Commutation Ethernet, Commutateurs L2, Tables CAM et STP.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 3,
  title: 'Commutation Ethernet L2, Tables CAM &amp; Spanning Tree (STP)',
  short: 'Commutation &amp; STP',
  toc: 'Fonctionnement interne des commutateurs (switches L2), apprentissage dynamique d’adresses MAC, table CAM, commutation (forwarding) vs inondation (flooding), et protocole Spanning Tree 802.1D / RSTP 802.1w pour prévenir les tempêtes de diffusion.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Lors d’une extension de câblage dans un campus universitaire, deux techniciens relient deux commutateurs par un second câble pour faire du secours. ' +
    'En quelques secondes, l’ensemble du réseau s’effondre : tous les voyants clignotent frénétiquement, les processeurs des switches montent à 100% ' +
    'et aucune machine ne parvient plus à communiquer. Une tempête de diffusion (broadcast storm) a paralysé l’infrastructure. ' +
    'L’équipe réseau doit analyser le fonctionnement de la table CAM, comprendre pourquoi les trames tournent en boucle indéfiniment sans TTL au niveau 2, ' +
    'et maîtriser le fonctionnement du protocole Spanning Tree (STP) pour calculer l’élection du Root Bridge et l’attribution des rôles de ports (RP, DP, BLK). ' +
    'Ce troisième module décortique le cœur de la commutation locale Ethernet.',

  objectives: [
    'comprendre le fonctionnement d’un commutateur de niveau 2 (Switch L2) et le rôle de la table CAM (MAC Address Table) ;',
    'analyser le processus d’apprentissage dynamique (Learning), de vieillissement (Aging) et de transmission (Forwarding/Flooding) ;',
    'distinguer les domaines de collision (par port de switch) des domaines de diffusion (par VLAN) ;',
    'identifier les dangers mortels des boucles de niveau 2 : tempête de diffusion, instabilité de table CAM et copies multiples de trames ;',
    'décortiquer le protocole Spanning Tree (STP 802.1D / 802.1w RSTP) : élection du Root Bridge par Bridge ID (Priorité + MAC) ;',
    'calculer les coûts de chemin et déterminer les rôles de ports (Root Port, Designated Port, Blocking Port).'
  ],

  sections: [
    {
      title: 'Fonctionnement d’un Switch L2 &amp; Table CAM',
      html: [
        '<p>Contrairement à un concentrateur (Hub) qui répète bêtement chaque signal électrique sur tous ses ports, ' +
        'un <strong>commutateur Ethernet (Switch L2)</strong> est un équipement intelligent qui opère au niveau de la couche 2 (Liaison de données). ' +
        'Il maintient en mémoire une table de correspondance appelée <strong>Table CAM (Content Addressable Memory)</strong> ' +
        'ou <em>MAC Address Table</em> associant chaque adresse MAC apprise au numéro de port physique sur lequel elle est connectée.</p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4 class="card-title">1. Apprentissage Dynamique (Learning)</h4>',
        '    <p>Chaque fois qu’une trame entre par un port, le commutateur examine son <strong>adresse MAC source</strong> :</p>',
        '    <ul>',
        '      <li>Si la MAC source est inconnue, il crée une entrée <code>MAC_SRC -&gt; Port</code> avec un compteur d’inactivité (Aging timer, défaut 300 s).</li>',
        '      <li>Si la MAC est déjà présente sur un autre port (déplacement d’hôte), il met à jour le port immédiatement.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4 class="card-title">2. Décision de Transmission (Forwarding)</h4>',
        '    <p>Le commutateur examine ensuite l’<strong>adresse MAC destination</strong> de la trame :</p>',
        '    <ul>',
        '      <li><strong>Unicast connue :</strong> Commutation directe vers le port de sortie enregistré (Forwarding).</li>',
        '      <li><strong>Unicast inconnue :</strong> Inondation sur tous les autres ports actifs (Unknown Unicast Flooding).</li>',
        '      <li><strong>Broadcast / Multicast :</strong> Inondation sur l’ensemble des ports sauf le port d’arrivée (Flooding).</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Domaines de Collision vs Domaines de Diffusion',
      html: [
        '<p>Une distinction fondamentale du programme CCNA concerne la segmentation des domaines :</p>',

        '<table class="table">',
        '  <thead>',
        '    <tr><th>Concept</th><th>Définition</th><th>Équipement de Segmentation</th></tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr>',
        '      <td><strong>Domaine de Collision</strong></td>',
        '      <td>Zone du réseau où deux équipements émettant simultanément provoquent une collision de signaux. ' +
        'En Full Duplex moderne sur switch, chaque port constitue son propre domaine de collision isolé (zéro collision).</td>',
        '      <td><strong>Commutateur (Switch)</strong> : chaque port est un domaine de collision distinct.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>Domaine de Diffusion (Broadcast Domain)</strong></td>',
        '      <td>Zone du réseau où une trame de diffusion (MAC <code>FF:FF:FF:FF:FF:FF</code>) émise par une machine est reçue par toutes les autres.</td>',
        '      <td><strong>Routeur (L3) ou VLAN</strong> : les commutateurs propagent le broadcast, les routeurs l’arrêtent.</td>',
        '    </tr>',
        '  </tbody>',
        '</table>'
      ].join('\n')
    },
    {
      title: 'Le Péril des Boucles de Niveau 2 &amp; Tempêtes de Diffusion',
      html: [
        '<p>Pour assurer la haute disponibilité, les ingénieurs réseau installent des liens physiques redondants entre commutateurs. ' +
        'Cependant, sans protocole de contrôle, ces boucles physiques entraînent des catastrophes instantanées :</p>',

        '<ul>',
        '  <li><strong>Absence de TTL en Couche 2 :</strong> L’en-tête Ethernet ne contient aucun champ Time-To-Live (contrairement au paquet IP). Une trame en boucle circule donc éternellement jusqu’à saturation des liens.</li>',
        '  <li><strong>Tempête de diffusion (Broadcast Storm) :</strong> Une simple requête ARP en broadcast est dupliquée et rebouclée indéfiniment par les switches, saturant la bande passante et figeant les équipements.</li>',
        '  <li><strong>Instabilité de la table CAM (MAC Flapping) :</strong> La même MAC source arrivant alternativement par plusieurs ports, le switch réécrit sans cesse sa table CAM, épuisant son processeur.</li>',
        '  <li><strong>Copies multiples de trames :</strong> Les machines clientes reçoivent des dizaines de copies de la même trame, causant des plantages applicatifs.</li>',
        '</ul>'
      ].join('\n')
    },
    {
      title: 'Le Protocole Spanning Tree (STP 802.1D &amp; 802.1w RSTP)',
      html: [
        '<p>Le protocole <strong>STP (Spanning Tree Protocol)</strong> résout ce dilemme : il permet d’avoir des câbles physiques redondants ' +
        'tout en bloquant logiquement certains ports pour créer une topologie arborescente sans boucle (Tree). ' +
        'En cas de coupure d’un lien actif, le port bloqué s’ouvre automatiquement pour rétablir la communication.</p>',

        '<p><strong>L’algorithme STP (STA) procède en 3 étapes d’élection :</strong></p>',

        '<ol>',
        '  <li><strong>Élection du Root Bridge (Commutateur Racine) :</strong><br>',
        '    Chaque switch possède un <strong>Bridge ID (BID)</strong> composé de :<br>',
        '    <code>Priorité (2 octets, multiple de 4096, défaut 32768) + MAC de base (6 octets)</code>.<br>',
        '    Le commutateur ayant le <strong>plus petit Bridge ID</strong> est élu Root Bridge. En cas d’égalité de priorité, l’adresse MAC la plus basse l’emporte.</li>',
        '  <li><strong>Élection des Root Ports (RP) sur les commutateurs non-racines :</strong><br>',
        '    Chaque switch non-racine élit exactement <strong>un seul Root Port</strong> : le port physique qui présente le plus faible coût cumulé vers la racine (Root Path Cost).</li>',
        '  <li><strong>Élection des Designated Ports (DP) par segment :</strong><br>',
        '    Sur chaque segment réseau reliant deux switches, un seul port est élu <strong>Designated Port</strong> (celui du switch ayant le plus faible coût vers la racine). Tous les ports du Root Bridge sont automatiquement DP.</li>',
        '  <li><strong>Blocage des ports restants (Blocking / Alternate) :</strong><br>',
        '    Tous les ports qui ne sont ni Root Port (RP) ni Designated Port (DP) sont placés en état <strong>Blocking (BLK)</strong>. Ils n’émettent ni ne relaient aucune trame de données, mais continuent d’écouter les trames BPDU (Bridge Protocol Data Units) pour détecter les pannes.</li>',
        '</ol>',

        box('info', 'Coûts de liens standard STP 802.1D vs RSTP', [
          '<p>Plus le lien est rapide, plus son coût est faible :</p>',
          '<ul>',
          '  <li>10 Mbps : Coût 100 (STP) / 2 000 000 (RSTP)</li>',
          '  <li>100 Mbps (FastEthernet) : Coût 19 (STP) / 200 000 (RSTP)</li>',
          '  <li>1 Gbps (GigabitEthernet) : Coût 4 (STP) / 20 000 (RSTP)</li>',
          '  <li>10 Gbps (TenGigabit) : Coût 2 (STP) / 2 000 (RSTP)</li>',
          '</ul>'
        ].join('\n'))
      ].join('\n')
    }
  ],

  methodTitle: 'Méthodologie de Calcul Manuel d’une Topologie Spanning Tree',
  method: [
    'Étape 1 — Identifier le Root Bridge : Comparer les Bridge IDs (Priorité puis MAC). Le commutateur avec le plus petit BID est la racine.',
    'Étape 2 — Activer les DP de la racine : Marquer tous les ports connectés du Root Bridge comme Designated Ports (DP, état Forwarding).',
    'Étape 3 — Élire les Root Ports (RP) : Pour chaque switch non-racine, additionner les coûts de liens vers la racine. Le port au coût minimal devient RP.',
    'Étape 4 — Élire les Designated Ports (DP) par segment : Sur chaque câble reliant deux non-racines, le port du switch le plus proche de la racine devient DP.',
    'Étape 5 — Bloquer les boucles : Placer tous les ports restants en état Alternate/Blocking (BLK). Vérifier que le graphe forme un arbre parfait.'
  ],

  summary: [
    'Le commutateur L2 apprend dynamiquement les adresses MAC sources entrantes et alimente sa table CAM.',
    'Le switch commute (forward) en unicast connu, et inonde (flood) en broadcast ou unicast inconnu.',
    'Chaque port d’un commutateur constitue un domaine de collision distinct en mode Full Duplex.',
    'L’absence de champ TTL dans la trame Ethernet transforme toute boucle physique L2 en tempête de diffusion paralysante.',
    'Le protocole STP 802.1D élit un Root Bridge (plus petit Bridge ID) et bloque logiquement les ports redondants.',
    'Sur chaque switch non-racine, le meilleur port vers la racine est le Root Port (RP) ; sur chaque câble, le port actif est le Designated Port (DP).'
  ],

  checklist: [
    'Je comprends parfaitement la différence entre apprentissage (source) et décision de commutation (destination).',
    'Je sais distinguer un domaine de collision d’un domaine de diffusion sur un schéma réseau.',
    'Je connais la composition d’un Bridge ID (Priorité de pont + adresse MAC de base).',
    'Je sais déterminer quel commutateur est élu Root Bridge sur une topologie donnée.',
    'Je sais attribuer avec certitude les rôles de ports STP (RP, DP, BLK) sur un réseau maillé.'
  ],

  notions: [
    'Commutateur L2 et table CAM',
    'Apprentissage dynamique (Learning)',
    'Commutation (Forwarding) vs Inondation (Flooding)',
    'Domaine de collision vs Domaine de diffusion',
    'Tempête de diffusion et absence de TTL Ethernet',
    'Spanning Tree Protocol (STP 802.1D / RSTP 802.1w)',
    'Bridge ID (Priorité + MAC) et élection du Root Bridge',
    'Rôles de ports STP : Root Port, Designated Port, Blocking'
  ],

  pitfalls: [
    'Croire que le commutateur apprend l’adresse MAC destination : l’apprentissage se fait UNIQUEMENT sur la MAC source entrante.',
    'Oublier que les trames Ethernet n’ont pas de champ TTL, ce qui rend les boucles L2 infinies et destructrices.',
    'Penser que le Root Bridge possède un port bloqué : tous les ports actifs du Root Bridge sont Designated (DP).',
    'Confondre un port Root Port (RP, présent sur switch non-racine vers la racine) avec un Designated Port (DP, présent sur chaque segment).',
    'Négliger les trames BPDU : même un port bloqué (BLK) continue de recevoir les BPDU pour surveiller l’état du réseau.'
  ],

  questions: [
    {
      stem: 'Sur quelle adresse figurant dans une trame Ethernet un commutateur s’appuie-t-il pour enrichir sa table CAM ?',
      opts: [
        'L’adresse MAC source de la trame entrante',
        'L’adresse MAC destination de la trame entrante',
        'L’adresse IP source contenue dans le payload',
        'L’adresse de broadcast FF:FF:FF:FF:FF:FF'
      ],
      correct: 0,
      exp: 'Le commutateur apprend la localisation des machines uniquement en observant l’adresse MAC source de chaque trame arrivant sur un port physique. L’adresse destination sert uniquement à décider où envoyer la trame.'
    },
    {
      stem: 'Quelle action immédiate réalise un commutateur lorsqu’il reçoit une trame unicast dont l’adresse MAC destination ne figure pas dans sa table CAM ?',
      opts: [
        'Il rejette immédiatement la trame (Drop)',
        'Il envoie une requête ICMP Destination Unreachable',
        'Il inonde la trame sur tous ses ports actifs sauf le port d’arrivée (Flooding)',
        'Il stocke la trame en mémoire tampon indéfiniment'
      ],
      correct: 2,
      exp: 'C’est le mécanisme d’Unknown Unicast Flooding : ne sachant pas sur quel port se trouve le destinataire, le commutateur duplique la trame sur l’ensemble des autres ports du même VLAN pour que l’hôte visé puisse la recevoir.'
    },
    {
      stem: 'Quel critère prioritaire départage deux commutateurs lors de l’élection du Root Bridge dans le protocole STP ?',
      opts: [
        'L’adresse IP de management la plus élevée',
        'La plus faible Bridge Priority configurée',
        'Le plus grand nombre de ports Gigabit connectés',
        'L’adresse MAC la plus élevée'
      ],
      correct: 1,
      exp: 'Le Root Bridge est le commutateur possédant le plus petit Bridge ID. Le premier élément comparé est la Bridge Priority (défaut 32768). En cas d’égalité stricte de priorité, l’adresse MAC la plus basse sert de départage.'
    },
    {
      stem: 'Sur un commutateur non-racine, combien de ports peuvent obtenir le rôle de Root Port (RP) pour une instance STP donnée ?',
      opts: ['Zéro', 'Exactement un seul port', 'Deux ports pour équilibrer la charge', 'Tous les ports connectés à la racine'],
      correct: 1,
      exp: 'Par définition de l’arbre couvrant Spanning Tree, chaque commutateur non-racine possède exactement un seul Root Port (RP), qui est le port offrant le plus faible coût de chemin cumulé vers le Root Bridge.'
    },
    {
      stem: 'Quel est le coût Spanning Tree standard (802.1D) associé à un lien Gigabit Ethernet (1000 Mbps) ?',
      opts: ['100', '19', '4', '2'],
      correct: 2,
      exp: 'Selon la norme STP 802.1D, un lien 10 Mbps a un coût de 100, un lien Fast Ethernet (100 Mbps) a un coût de 19, un lien Gigabit Ethernet a un coût de 4, et un lien 10 Gigabit a un coût de 2.'
    },
    {
      stem: 'Pourquoi une boucle physique sur un réseau de commutation L2 provoque-t-elle une tempête de diffusion alors qu’une boucle sur réseau IP L3 finit par s’arrêter ?',
      opts: [
        'Parce que les routeurs ont plus de mémoire que les commutateurs',
        'Parce que l’en-tête de trame Ethernet ne comporte aucun champ de durée de vie (TTL), contrairement au paquet IP',
        'Parce que le protocole ARP force la duplication infinie des trames',
        'Parce que les adresses MAC sont écrites en hexadécimal'
      ],
      correct: 1,
      exp: 'Le paquet IP contient un champ TTL (Time-To-Live) décrémenté par chaque routeur jusqu’à destruction du paquet à TTL=0. La trame Ethernet ne possède aucun TTL : sans STP, une trame Ethernet tourne indéfiniment en boucle.'
    },
    {
      stem: 'Quel est le rôle d’un port STP placé en état Blocking (Alternate) ?',
      opts: [
        'Il est électriquement éteint et désactivé',
        'Il ne transfère aucune donnée utilisateur mais continue d’écouter les BPDU pour réagir aux pannes',
        'Il transfère uniquement les trames de broadcast',
        'Il remplace la passerelle par défaut en mode secours actif'
      ],
      correct: 1,
      exp: 'Un port bloqué n’apprend pas les adresses MAC et ne transmet aucune trame utilisateur (rompant ainsi la boucle), mais il écoute en permanence les trames BPDU. Si la racine devient injoignable, il transite vers l’état Forwarding.'
    },
    {
      stem: 'Quels rôles de ports trouve-t-on sur le commutateur élu Root Bridge ?',
      opts: [
        'Un Root Port et plusieurs Designated Ports',
        'Uniquement des Blocking Ports',
        'Tous ses ports actifs sont Designated Ports (DP)',
        'Un Root Port et un Blocking Port'
      ],
      correct: 2,
      exp: 'Puisque le Root Bridge est la racine absolue de la topologie, son coût vers lui-même est 0. Sur chaque segment auquel il est connecté, il offre donc le meilleur chemin : tous ses ports actifs sont Designated Ports (DP).'
    }
  ],

  flashcards: [
    {
      q: 'Comment un commutateur remplit-il sa table CAM ?',
      a: 'En analysant l’adresse MAC source de chaque trame entrante et en l’associant au port physique d’arrivée avec un timer d’inactivité.'
    },
    {
      q: 'Quelle est la différence entre Forwarding et Flooding sur un switch ?',
      a: 'Le Forwarding transmet la trame sur un port unique ciblé (MAC destination connue). Le Flooding inonde la trame sur tous les autres ports (Broadcast, Multicast ou MAC inconnue).'
    },
    {
      q: 'Qu’est-ce qui compose le Bridge ID (BID) dans Spanning Tree ?',
      a: 'La Bridge Priority (valeur par défaut 32768, multiple de 4096) combinée à l’adresse MAC de base du commutateur.'
    },
    {
      q: 'Quel commutateur est élu Root Bridge dans STP ?',
      a: 'Le commutateur ayant le plus petit Bridge ID (plus faible priorité, puis plus faible adresse MAC en cas d’égalité).'
    },
    {
      q: 'Quels sont les trois rôles de ports fondamentaux dans STP 802.1D ?',
      a: 'Root Port (RP : meilleur port du switch vers la racine), Designated Port (DP : meilleur port du segment vers la racine) et Blocking (BLK : port bloqué pour éviter la boucle).'
    },
    {
      q: 'Pourquoi les boucles de niveau 2 sont-elles si destructrices ?',
      a: 'Parce que les trames Ethernet n’ont pas de TTL. Les trames de diffusion tournent indéfiniment en boucle, provoquant une tempête de broadcast et le gel du réseau.'
    }
  ],

  mastery: [
    { cls: 'low', text: 'Moins de 4/8 : Révisez la différence entre MAC source (apprentissage) et destination (commutation), ainsi que l’élection STP.' },
    { cls: 'mid', text: 'De 4 à 6/8 : Bonnes notions de base. Entraînez-vous au calcul des coûts de liens et des rôles de ports (RP, DP, BLK).' },
    { cls: 'good', text: '7/8 : Très solide compréhension de la commutation L2 et de la mécanique de convergence STP.' },
    { cls: 'top', text: '8/8 : Maîtrise parfaite de la commutation et du Spanning Tree ! Vous êtes prêt pour la configuration Cisco IOS.' }
  ]
};
