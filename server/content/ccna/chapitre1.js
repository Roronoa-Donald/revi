/**
 * Chapitre 1 du cours « CCNA Réseau » B2 — Modèles OSI et TCP/IP, Encapsulation et En-têtes Réseau.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 1,
  title: 'Modèles OSI et TCP/IP, Encapsulation &amp; En-têtes Réseau',
  short: 'Modèles &amp; Encapsulation',
  toc: 'Architecture en 7 couches OSI vs 4 couches TCP/IP, unités de données (PDU), en-tête Ethernet II, adresses MAC, EtherType, processus d’encapsulation/désencapsulation et protocole ARP.',
  time: '≈ 2 h 45 de travail',
  free: true,

  situation:
    'Une entreprise internationale connecte ses nouveaux centres de données sur une dorsale hybride. ' +
    'Des dégradations de flux applicatifs et des pertes de paquets intermittentes sont observées entre les services web et les bases de données. ' +
    'Pour diagnostiquer avec précision les pannes sans accuser à tort les couches applicatives, les ingénieurs réseau doivent maîtriser ' +
    'l’architecture en couches, l’anatomie précise des unités de données de protocole (PDU), l’agencement des adresses physiques MAC et logiques IP, ' +
    'ainsi que les mécanismes d’encapsulation et de résolution ARP. ' +
    'Ce premier module établit le socle fondamental indispensable à l’obtention de la certification Cisco CCNA et à l’ingénierie réseau.',

  objectives: [
    'comparer de manière critique le modèle de référence OSI en 7 couches et le modèle TCP/IP en 4 couches ;',
    'identifier le nom et la fonction du PDU à chaque niveau de la pile protocolaire (Data, Segment, Paquet, Trame, Bits) ;',
    'décortiquer la structure d’une trame Ethernet II (MAC Destination, MAC Source, EtherType, Payload, FCS) ;',
    'distinguer les adresses MAC Unicast, Multicast et Broadcast au niveau binaire ;',
    'analyser le cycle complet d’encapsulation ascendante et de désencapsulation descendante ;',
    'maîtriser le fonctionnement du protocole ARP, la gestion du cache et la résolution d’adresses locales.'
  ],

  sections: [
    {
      title: 'Modèle OSI (7 couches) vs Modèle TCP/IP (4 couches)',
      html: [
        '<p>Pour structurer l’interopérabilité entre constructeurs et systèmes hétérogènes, deux modèles conceptuels coexistent dans les réseaux informatiques :</p>',
        '<ol>',
        '  <li><strong>Le Modèle de référence OSI (Open Systems Interconnection) :</strong> Élaboré par l’ISO, il décompose la communication en 7 couches formelles et indépendantes, de la couche physique jusqu’à l’application.</li>',
        '  <li><strong>Le Modèle TCP/IP (modèle Internet) :</strong> Conçu par le DARPA, orienté vers la mise en œuvre pratique, il regroupe les fonctions en 4 couches opérationnelles dominant l’ensemble d’Internet.</li>',
        '</ol>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4 class="card-title">Correspondance des Couches</h4>',
        '    <ul>',
        '      <li><strong>L7 (Application), L6 (Présentation), L5 (Session) :</strong> Fusionnées en Couche Application TCP/IP (HTTP, DNS, SSH, DHCP).</li>',
        '      <li><strong>L4 (Transport) :</strong> Couche Transport (TCP orienté connexion fiable, UDP orienté datagramme rapide).</li>',
        '      <li><strong>L3 (Réseau) :</strong> Couche Internet (IPv4, IPv6, ICMP, routage logique).</li>',
        '      <li><strong>L2 (Liaison de données) &amp; L1 (Physique) :</strong> Couche Accès Réseau (Ethernet IEEE 802.3, Wi-Fi 802.11, câbles cuivre et fibre optique).</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4 class="card-title">Bénéfices de l’Approche en Couches</h4>',
        '    <ul>',
        '      <li><strong>Encapsulation et modularité :</strong> Une couche supérieure consomme les services de la couche inférieure sans se soucier de son implémentation matérielle.</li>',
        '      <li><strong>Dépannage méthodique (Troubleshooting) :</strong> Approches Bottom-Up (de L1 vers L7) ou Top-Down (de L7 vers L1) préconisées par Cisco.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Unités de Données de Protocole (PDU) &amp; Processus d’Encapsulation',
      html: [
        '<p>Chaque couche ajoute ses propres métadonnées de contrôle sous forme d’un <strong>en-tête (header)</strong> lors de l’émission, ' +
        'transformant la donnée en une <strong>Protocol Data Unit (PDU)</strong> spécifique :</p>',

        '<table class="table">',
        '  <thead>',
        '    <tr><th>Couche</th><th>PDU</th><th>Adresses / Identifiants</th><th>Exemples d’En-têtes</th></tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr><td>Couche 7 (Application)</td><td><strong>Donnée (Data)</strong></td><td>Identifiant de session, URI</td><td>En-tête HTTP (Host, User-Agent)</td></tr>',
        '    <tr><td>Couche 4 (Transport)</td><td><strong>Segment (TCP) / Datagramme (UDP)</strong></td><td>Numéros de ports (0 à 65535)</td><td>Port source, Port dest, Sequence Number</td></tr>',
        '    <tr><td>Couche 3 (Réseau)</td><td><strong>Paquet (Packet)</strong></td><td>Adresses IP logiques (32 bits IPv4)</td><td>IP source, IP dest, TTL, Protocole L4</td></tr>',
        '    <tr><td>Couche 2 (Liaison)</td><td><strong>Trame (Frame)</strong></td><td>Adresses MAC physiques (48 bits)</td><td>MAC dest, MAC source, EtherType, FCS</td></tr>',
        '    <tr><td>Couche 1 (Physique)</td><td><strong>Bits</strong></td><td>Tension électrique, impulsions lumineuses</td><td>Codage Manchester, signaux NRZ</td></tr>',
        '  </tbody>',
        '</table>',

        '<p><strong>Le voyage d’un paquet :</strong> À la réception, l’équipement effectue la <strong>désencapsulation</strong> : ' +
        'la couche 2 vérifie la validité du FCS et de la MAC de destination, retire l’en-tête Ethernet et passe la charge utile (paquet) à la couche 3. ' +
        'La couche 3 vérifie l’IP de destination, décrémente le TTL, puis passe le segment à la couche 4 en fonction du champ protocole (TCP=6, UDP=17).</p>'
      ].join('\n')
    },
    {
      title: 'Anatomie de la Trame Ethernet II &amp; Adressage MAC',
      html: [
        '<p>La norme <strong>Ethernet II</strong> (DIX Ethernet) est le standard omniprésent sur les réseaux locaux filaires. ' +
        'Une trame Ethernet II classique comporte au minimum 64 octets et au maximum 1518 octets (hors préambule) :</p>',

        '<ul>',
        '  <li><strong>Préambule &amp; SFD (8 octets) :</strong> 7 octets de synchronisation (<code>0xAA</code>) + 1 octet Start Frame Delimiter (<code>0xAB</code>).</li>',
        '  <li><strong>MAC Destination (6 octets, 48 bits) :</strong> Adresse de la carte réseau (NIC) réceptrice.</li>',
        '  <li><strong>MAC Source (6 octets, 48 bits) :</strong> Adresse de la carte réseau émettrice.</li>',
        '  <li><strong>EtherType (2 octets) :</strong> Identifie le protocole encapsulé dans le payload (<code>0x0800</code> pour IPv4, <code>0x0806</code> pour ARP, <code>0x86DD</code> pour IPv6).</li>',
        '  <li><strong>Charge utile (Payload) :</strong> De 46 à 1500 octets (MTU standard). Si inférieur à 46 octets, un padding (bourrage) est ajouté.</li>',
        '  <li><strong>FCS (Frame Check Sequence, 4 octets) :</strong> Somme de contrôle CRC-32 pour détecter les erreurs de transmission sur le support physique.</li>',
        '</ul>',

        box('info', 'Typologie des Adresses MAC au niveau binaire', [
          '<p>Une adresse MAC s’écrit sous forme de 12 caractères hexadécimaux (ex: <code>00:1A:2B:3C:4D:5E</code>). Les 3 premiers octets représentent l’<strong>OUI</strong> (Organizationally Unique Identifier) attribué au constructeur par l’IEEE.</p>',
          '<ul>',
          '  <li><strong>Unicast :</strong> Bit de poids faible du premier octet à 0 (bit I/G = 0). Cible une interface matérielle unique.</li>',
          '  <li><strong>Multicast :</strong> Bit de poids faible du premier octet à 1 (bit I/G = 1). Exemples : <code>01:00:5E:...</code> (IPv4 multicast) ou <code>33:33:...</code> (IPv6 multicast).</li>',
          '  <li><strong>Broadcast (diffusion) :</strong> Tous les 48 bits à 1 (<code>FF:FF:FF:FF:FF:FF</code>). Reçue et traitée par l’ensemble des hôtes du domaine de diffusion.</li>',
          '</ul>'
        ].join('\n'))
      ].join('\n')
    },
    {
      title: 'Résolution d’Adresses avec le Protocole ARP',
      html: [
        '<p>Pour envoyer un paquet IP sur un réseau local, un terminal connaît l’adresse IP de destination mais ignore l’adresse MAC du destinataire. ' +
        'Le protocole <strong>ARP (Address Resolution Protocol)</strong> résout cette correspondance :</p>',

        '<ol>',
        '  <li><strong>Consultation de la table ARP locale :</strong> L’hôte émetteur vérifie si l’adresse IP figure déjà dans son cache ARP (<code>arp -a</code>). Si oui, la trame Ethernet est immédiatement construite.</li>',
        '  <li><strong>Émission d’une requête ARP Request :</strong> Si l’entrée est absente, l’hôte génère un paquet ARP encapsulé dans une trame Ethernet de <em>Broadcast</em> (MAC Destination <code>FF:FF:FF:FF:FF:FF</code>) demandant : <em>« Qui possède l’adresse IP X.X.X.X ? Répondez à MAC_SRC »</em>.</li>',
        '  <li><strong>Apprentissage passif par tous les hôtes :</strong> Tous les hôtes du segment reçoivent la trame et apprennent la correspondance IP-MAC de l’émetteur.</li>',
        '  <li><strong>Émission de la réponse ARP Reply :</strong> Seul l’hôte détenteur de l’IP répond en <em>Unicast</em> directement à l’émetteur avec son adresse MAC physique.</li>',
        '  <li><strong>Mise en cache dynamique :</strong> L’émetteur enregistre la MAC dans son cache ARP avec une durée de vie (TTL) typique de 300 secondes.</li>',
        '</ol>'
      ].join('\n')
    }
  ],

  methodTitle: 'Méthodologie d’Analyse Réseau &amp; Troubleshooting L1 à L3',
  method: [
    'Étape 1 — Analyse de la couche physique L1 : Vérifier la connectivité des câbles, la vitesse négociée et l’état du voyant de liaison (Link LED).',
    'Étape 2 — Contrôle de la liaison L2 : Inspecter l’adresse MAC émettrice, la MAC réceptrice et s’assurer de l’absence d’erreurs CRC (FCS) sur l’interface.',
    'Étape 3 — Vérification ARP : Consulter la table ARP (show ip arp) pour confirmer que l’adresse IP de la passerelle ou de l’hôte distant est bien résolue.',
    'Étape 4 — Contrôle de l’adressage L3 : Confirmer l’adresse IP, le masque et la route par défaut de la machine émettrice.',
    'Étape 5 — Validation de transport L4 : Vérifier que le port de destination est en écoute et non bloqué par un pare-feu intermédiaire.'
  ],

  summary: [
    'Le modèle OSI comporte 7 couches théoriques tandis que le modèle TCP/IP structure Internet en 4 couches pratiques.',
    'Chaque couche associe un PDU spécifique : Donnée en L7-L5, Segment en L4, Paquet en L3, Trame en L2 et Bits en L1.',
    'L’encapsulation ajoute des en-têtes du haut vers le bas ; la désencapsulation analyse et retire les en-têtes du bas vers le haut.',
    'La trame Ethernet II standard comporte une MAC destination (48 bits), une MAC source (48 bits), un EtherType (2 octets) et un FCS (4 octets).',
    'Le bit de poids faible du premier octet d’une adresse MAC distingue le trafic Unicast (0) du trafic Multicast/Broadcast (1).',
    'Le protocole ARP permet à un hôte de découvrir dynamiquement l’adresse MAC associée à une adresse IPv4 locale par diffusion broadcast puis réponse unicast.'
  ],

  checklist: [
    'Je connais par cœur les 7 couches du modèle OSI et leur correspondance avec les 4 couches TCP/IP.',
    'Je sais nommer le PDU exact manipulé à chaque couche (Donnée, Segment, Paquet, Trame, Bit).',
    'Je maîtrise la structure et la taille en octets des champs d’une trame Ethernet II.',
    'Je sais identifier si une adresse MAC est Unicast, Multicast ou Broadcast en inspectant son premier octet.',
    'Je peux expliquer le cycle complet d’une requête et d’une réponse ARP avec mise à jour du cache.'
  ],

  notions: [
    'Modèle OSI en 7 couches',
    'Modèle TCP/IP en 4 couches',
    'PDU (Data, Segment, Paquet, Trame)',
    'En-tête Ethernet II (14 octets)',
    'Adresses MAC (OUI et identifiant NIC)',
    'EtherType (0x0800, 0x0806, 0x86DD)',
    'Encapsulation et désencapsulation',
    'Résolution d’adresses ARP et cache'
  ],

  pitfalls: [
    'Confondre un paquet (couche 3 réseau, adresses IP) avec une trame (couche 2 liaison, adresses MAC).',
    'Oublier que la requête ARP est envoyée en broadcast (FF:FF:FF:FF:FF:FF) tandis que la réponse est en unicast.',
    'Penser que l’adresse MAC du destinataire final reste identique lorsque le paquet traverse un routeur : la MAC change à chaque saut L3.',
    'Négliger le champ EtherType lors de l’analyse de capture de paquets : il est indispensable pour router le payload vers la bonne pile L3.',
    'Confondre le bit I/G (Unicast vs Multicast) avec le bit U/L (Universellement administré vs Localement administré) de l’adresse MAC.'
  ],

  questions: [
    {
      stem: 'Quel est le nom correct de l’unité de données de protocole (PDU) manipulée au niveau de la couche 3 (Réseau) ?',
      opts: ['Le segment', 'Le paquet', 'La trame', 'Le datagramme physique'],
      correct: 1,
      exp: 'Au niveau de la couche 3 (Réseau / Internet), le PDU s’appelle un paquet (packet). En couche 4 on parle de segment (ou datagramme UDP), et en couche 2 de trame (frame).'
    },
    {
      stem: 'Quelle valeur hexadécimale contient le champ EtherType d’une trame Ethernet II transportant un paquet IPv4 ?',
      opts: ['0x0806', '0x86DD', '0x0800', '0x8100'],
      correct: 2,
      exp: 'La valeur standard de l’EtherType pour IPv4 est 0x0800. 0x0806 correspond au protocole ARP, 0x86DD à IPv6, et 0x8100 au balisage VLAN 802.1Q.'
    },
    {
      stem: 'Quelle adresse MAC correspond à une diffusion générale (Broadcast) de niveau 2 ?',
      opts: ['00:00:00:00:00:00', 'FF:FF:FF:FF:FF:FF', '01:00:5E:00:00:01', '33:33:00:00:00:01'],
      correct: 1,
      exp: 'L’adresse de diffusion générale Ethernet est FF:FF:FF:FF:FF:FF (les 48 bits fixés à 1). Elle est traitée par toutes les cartes réseau du même domaine de broadcast.'
    },
    {
      stem: 'Lorsqu’un paquet IP transite d’un réseau local vers Internet à travers une passerelle par défaut (routeur), quelles adresses sont modifiées dans la trame transmise sur le second lien ?',
      opts: [
        'Les adresses IP source et destination uniquement',
        'Les adresses MAC source et destination uniquement (hors NAT)',
        'Toutes les adresses IP et MAC sont impérativement conservées',
        'Seule l’adresse MAC source est modifiée'
      ],
      correct: 1,
      exp: 'Sur chaque lien de couche 2 traversé, le routeur réécrit les adresses MAC source (sa propre interface de sortie) et destination (prochain saut ou hôte). Les adresses IP d’origine restent inchangées (hors mécanisme spécifique de translation NAT).'
    },
    {
      stem: 'Comment est transmise une requête initiale ARP (ARP Request) sur le réseau local ?',
      opts: [
        'En diffusion générale Broadcast avec la MAC destination FF:FF:FF:FF:FF:FF',
        'En Unicast direct vers la passerelle par défaut',
        'En Multicast réservé 224.0.0.1',
        'En Anycast à travers le routeur le plus proche'
      ],
      correct: 0,
      exp: 'Puisque l’émetteur ignore l’adresse MAC de la cible, il transmet la requête en broadcast (FF:FF:FF:FF:FF:FF). Tous les hôtes reçoivent la requête, mais seule la machine possédant l’IP demandée répondra en unicast.'
    },
    {
      stem: 'Combien d’octets mesure l’en-tête Ethernet II standard (sans compter le préambule ni le FCS) ?',
      opts: ['14 octets', '20 octets', '12 octets', '32 octets'],
      correct: 0,
      exp: 'L’en-tête Ethernet II comprend 6 octets de MAC destination + 6 octets de MAC source + 2 octets d’EtherType, soit exactement 14 octets.'
    },
    {
      stem: 'À quelle couche du modèle OSI se situent les numéros de port (ex: port 80 pour HTTP, port 443 pour HTTPS) ?',
      opts: ['Couche 2 — Liaison de données', 'Couche 3 — Réseau', 'Couche 4 — Transport', 'Couche 7 — Application'],
      correct: 2,
      exp: 'Les numéros de port (TCP et UDP) sont définis au niveau de la couche 4 (Transport). Ils permettent de multiplexer et démultiplexer les flux applicatifs sur une même adresse IP.'
    },
    {
      stem: 'Que se passe-t-il si la charge utile (payload) d’une trame Ethernet II fait moins de 46 octets ?',
      opts: [
        'La trame est rejetée pour erreur de taille minimale',
        'Un bourrage (padding) d’octets à zéro est automatiquement ajouté pour atteindre 64 octets avec le FCS',
        'La carte réseau découpe la trame en demi-segments',
        'L’EtherType est remplacé par le code 0x0000'
      ],
      correct: 1,
      exp: 'Pour que la détection de collision CSMA/CD fonctionne sur Ethernet historique, la taille minimale d’une trame est de 64 octets. Si le payload fait moins de 46 octets, des octets de bourrage (padding) sont insérés.'
    }
  ],

  flashcards: [
    {
      q: 'Quels sont les PDU des couches 2, 3 et 4 du modèle OSI ?',
      a: 'Couche 2 : Trame (Frame). Couche 3 : Paquet (Packet). Couche 4 : Segment (TCP) ou Datagramme (UDP).'
    },
    {
      q: 'Quelle est la taille d’une adresse MAC et comment est-elle découpée ?',
      a: 'Une adresse MAC fait 48 bits (6 octets). Les 3 premiers octets représentent l’OUI attribué au constructeur, les 3 derniers le numéro de série unique attribué par le fabricant.'
    },
    {
      q: 'Quelles sont les valeurs clés du champ EtherType ?',
      a: '0x0800 pour IPv4, 0x0806 pour ARP, et 0x86DD pour IPv6.'
    },
    {
      q: 'Quelle est la différence entre une transmission Unicast, Multicast et Broadcast ?',
      a: 'Unicast s’adresse à une interface unique ; Multicast à un groupe d’interfaces abonnées ; Broadcast à l’ensemble des interfaces du domaine de diffusion.'
    },
    {
      q: 'Comment s’effectue la résolution d’adresse ARP ?',
      a: 'L’émetteur diffuse une requête ARP en broadcast (FF:FF:FF:FF:FF:FF). La cible concernée répond en unicast avec son adresse MAC, qui est alors stockée dans la table ARP locale.'
    },
    {
      q: 'Que fait un équipement lors du processus de désencapsulation ?',
      a: 'Il lit et vérifie l’en-tête de sa couche, le retire, puis transmet la charge utile (payload) à la couche supérieure appropriée identifiée par le champ de protocole.'
    }
  ],

  mastery: [
    { cls: 'low', text: 'Moins de 4/8 : Révisez la numérotation des 7 couches OSI, leurs PDU et la structure d’une trame Ethernet.' },
    { cls: 'mid', text: 'De 4 à 6/8 : Bonnes notions de base. Approfondissez le rôle des adresses MAC et le cycle de requête/réponse ARP.' },
    { cls: 'good', text: '7/8 : Excellente maîtrise des modèles de référence et des mécanismes d’encapsulation réseau.' },
    { cls: 'top', text: '8/8 : Parfaite compréhension du socle fondamental CCNA ! Vous êtes prêt pour le module d’adressage IPv4.' }
  ]
};
