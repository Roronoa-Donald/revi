/**
 * Chapitres 4 à 6 du cours d'Architecture des réseaux B1.
 *
 * Chapitre 4 : le modèle TCP/IP (quatre couches, three-way handshake, TCP contre UDP).
 * Chapitre 5 : l'adressage réseau (MAC, IP, ARP, masque, classes A-B-C).
 * Chapitre 6 : le sous-réseautage (emprunt de bits, nouveau masque, VLSM et CIDR).
 *
 * Chaque chapitre fournit la matière que `kit.chapter` met en page. Aucun titre
 * <h2> ici : la numérotation est ajoutée au rendu. Les ateliers de code (trois
 * exercices Bash par chapitre) sont injectés avant le QCM par
 * `scripts/generate-code-labs.js` à partir de `server/exercises/b1-reseaux.js`.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = [
  /* ==================== Chapitre 4 ==================== */
  {
    n: 4,
    title: 'Le modèle TCP/IP',
    short: 'TCP/IP',
    toc: 'Les quatre couches du modèle TCP/IP ; le three-way handshake de TCP ; choisir entre TCP fiable et UDP rapide.',
    time: '≈ 2 h de travail',

    situation:
      'Le modèle TCP/IP est celui qui fait tourner Internet : quatre couches, une poignée de protocoles, et ' +
      'une règle d\'or — TCP établit la connexion avant de parler, UDP envoie sans demander. Le chapitre ' +
      'explique les deux modèles et détaille le three-way handshake, séquence d\'ouverture de toute connexion TCP.',

    objectives: [
      'ranger les protocoles dans les quatre couches TCP/IP : accès réseau, internet, transport, application ;',
      'relier les couches TCP/IP aux couches OSI ;',
      'dérouler le three-way handshake : SYN, SYN-ACK, ACK ;',
      'choisir TCP ou UDP selon l\'exigence de fiabilité.'
    ],

    sections: [
      {
        title: 'Quatre couches, un modèle réel',
        html: [
          '<p>Le modèle <strong>TCP/IP</strong> regroupe les sept couches OSI en quatre : <strong>accès ' +
          'réseau</strong> (physique + liaison : Ethernet, câbles), <strong>internet</strong> (réseau : IP, ' +
          'routage), <strong>transport</strong> (TCP, UDP, ports) et <strong>application</strong> (session + ' +
          'présentation + application : HTTP, messagerie, FTP). C\'est le modèle des produits réels — OSI ' +
          'reste le référentiel de discussion.</p>',
          '<p>Le support rappelle les normes IEEE : <strong>802.3</strong> définit le contrôle d\'accès au ' +
          'support (MAC) de l\'Ethernet filaire — <strong>CSMA/CD</strong> — employé dans les réseaux locaux ' +
          'et certaines applications WAN ; <strong>802.11</strong> (avec <strong>CSMA/CA</strong>) définit les ' +
          'réseaux locaux sans fil, de la couche physique à la sous-couche MAC.</p>',
          box('mnemo', 'Mnémotechnique — « Accès, Internet, Transport, Application : AITA »', 'pin',
            '    <p>Les trois couches hautes d\'OSI fusionnent en une seule « application » ; les deux basses ' +
            'fusionnent en « accès réseau ». Le transport reste seul : c\'est lui qui choisit TCP ou UDP.</p>')
        ].join('\\n')
      },
      {
        title: 'Le three-way handshake et TCP contre UDP',
        html: [
          '<p><strong>TCP</strong> ouvre toute connexion en trois étapes : <strong>1. SYN</strong> — le client ' +
          'envoie un paquet SYN (synchronized) portant un numéro de séquence aléatoire A ; <strong>2. ' +
          'SYN-ACK</strong> — le serveur répond avec un ACK valant A + 1 et son propre numéro de séquence ' +
          'aléatoire B ; <strong>3. ACK</strong> — le client accuse réception avec B + 1. Les étapes 1-2 ' +
          'définissent la séquence client vers serveur, les étapes 2-3 la séquence inverse : la communication ' +
          '<strong>full-duplex</strong> est établie.</p>',
          '<p><strong>TCP</strong> convient aux transferts exigeant la fiabilité — courriels, pages web, ' +
          'transferts de fichiers : accusés de réception, réémission des pertes. <strong>UDP</strong> convient ' +
          'aux flux temps réel — voix, DNS, vidéo : plus rapide, sans accusé, tolérant aux pertes. Le ' +
          'professionnel choisit selon l\'exigence : un mot manquant dans un contrat est grave, une micro-' +
          'coupure dans un appel ne l\'est pas.</p>',
          box('pitfall', 'Confusions d\'examen', 'warning',
            '    <ul>\\n' +
            '      <li>Le SYN-ACK porte deux numéros : l\'acquittement (A + 1) et une nouvelle séquence (B).</li>\\n' +
            '      <li>Sans les trois étapes, pas de connexion TCP : SYN, SYN-ACK, ACK dans l\'ordre.</li>\\n' +
            '      <li>UDP n\'est pas « pire » que TCP : il est adapté aux flux temps réel.</li>\\n' +
            '      <li>CSMA/CD (Ethernet filaire, 802.3) et CSMA/CA (Wi-Fi, 802.11) ne sont pas interchangeables.</li>\\n' +
            '    </ul>')
        ].join('\\n')
      }
    ],

    questions: [
      { q: 'Les couches du modèle TCP/IP sont…', opts: ['7, comme OSI', '4 : accès, internet, transport, application', '3 : réseau, transport, application'], correct: 1, exp: 'AITA : accès réseau, internet, transport, application.' },
      { q: 'La couche internet de TCP/IP correspond à OSI…', opts: ['couche 2', 'couche 3', 'couche 7'], correct: 1, exp: 'La couche réseau d\'OSI : IP, routage.' },
      { q: 'La première étape du handshake est…', opts: ['ACK', 'SYN', 'SYN-ACK'], correct: 1, exp: 'SYN avec numéro de séquence aléatoire A.' },
      { q: 'Le SYN-ACK porte…', opts: ['A + 1 comme ACK et un séquence B', 'seulement B', 'seulement A + 1'], correct: 0, exp: 'Acquittement A + 1, nouveau numéro de séquence B.' },
      { q: 'Après le handshake, la communication est…', opts: ['half-duplex', 'full-duplex', 'fermée'], correct: 1, exp: 'Séquences définies dans les deux sens.' },
      { q: 'La voix sur IP utilise plutôt…', opts: ['TCP', 'UDP', 'FTP'], correct: 1, exp: 'UDP : rapidité, tolérance aux pertes.' },
      { q: 'Un courriel voyage en…', opts: ['UDP', 'TCP', 'ICMP'], correct: 1, exp: 'Fiabilité exigée : TCP avec accusés.' },
      { q: 'L\'Ethernet filaire (802.3) utilise…', opts: ['CSMA/CA', 'CSMA/CD', 'token'], correct: 1, exp: 'CSMA/CD ; le Wi-Fi 802.11 utilise CSMA/CA.' }
    ],

    pitfalls: [
      'Confondre les couches TCP/IP et OSI : 4 contre 7, les fusions se font en haut et en bas.',
      'Démarrer un handshake par SYN-ACK : l\'ordre est SYN, SYN-ACK, ACK.',
      'Choisir TCP pour la voix : le retard de réémission dégrade l\'appel.',
      'Oublier que UDP sert aussi au DNS : rapide ne veut pas dire jouet.'
    ],

    methodTitle: 'Méthode — choisir le transport en trois gestes',
    method: [
      'Évaluer le coût d\'une perte : contrat manquant (TCP) ou micro-coupure (UDP).',
      'Vérifier l\'exigence de temps réel : flux vivant, UDP ; fichier exact, TCP.',
      'Dérouler le handshake si TCP : SYN (A), SYN-ACK (A+1, B), ACK (B+1).'
    ],

    summary: [
      'Quatre couches : accès réseau, internet, transport, application.',
      'IEEE 802.3 : Ethernet filaire CSMA/CD ; 802.11 : Wi-Fi CSMA/CA.',
      'Handshake TCP : SYN (A), SYN-ACK (A+1, B), ACK (B+1) — full-duplex.',
      'TCP = fiable (courriels, web) ; UDP = rapide (voix, DNS).'
    ],

    checklist: [
      'Je sais ranger dix protocoles dans les quatre couches.',
      'Je sais relier chaque couche TCP/IP à ses couches OSI.',
      'Je sais dérouler le three-way handshake avec les numéros.',
      'Je sais justifier TCP ou UDP pour cinq services donnés.'
    ],

    notions: [
      '<strong>Accès réseau</strong> : physique + liaison — Ethernet, 802.3.',
      '<strong>Internet</strong> : couche réseau — IP, routage.',
      '<strong>Transport</strong> : TCP et UDP, ports.',
      '<strong>Application</strong> : HTTP, messagerie, FTP — fusion des couches 5-7.',
      '<strong>SYN</strong> : premier paquet, séquence aléatoire A.',
      '<strong>SYN-ACK</strong> : ACK = A + 1, séquence B.',
      '<strong>CSMA/CD</strong> : contrôle d\'accès Ethernet filaire (802.3).',
      '<strong>CSMA/CA</strong> : contrôle d\'accès Wi-Fi (802.11).'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — relis les quatre couches et les trois étapes du handshake.' },
      { cls: 'mid', text: '50–69 % — refais le classement des protocoles et les correspondances OSI.' },
      { cls: 'good', text: '70–89 % — bon niveau, cible les numéros de séquence du handshake.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché.' }
    ],

    flashcards: [
      { q: 'Les quatre couches TCP/IP ?', a: 'Accès réseau, internet, transport, application (AITA).' },
      { q: 'Le three-way handshake ?', a: 'SYN (séquence A), SYN-ACK (ACK = A+1, séquence B), ACK (B+1) : communication full-duplex établie.' },
      { q: 'TCP ou UDP pour la voix ?', a: 'UDP : rapidité avant tout, pertes tolérables. TCP réémettrait trop lentement.' },
      { q: 'CSMA/CD contre CSMA/CA ?', a: 'CD (détection de collision) : Ethernet filaire 802.3. CA (évitement) : Wi-Fi 802.11.' },
      { q: 'Correspondance TCP/IP - OSI ?', a: 'Accès réseau = OSI 1+2 ; internet = OSI 3 ; transport = OSI 4 ; application = OSI 5+6+7.' }
    ]
  },

  /* ==================== Chapitre 5 ==================== */
  {
    n: 5,
    title: 'L\'adressage réseau',
    short: 'Adressage',
    toc: 'L\'adresse MAC (48 bits, OUI, non routée) ; l\'adresse IP (réseau + hôte, IPv4/IPv6) ; ARP et le routage ; le masque ; les classes A, B, C.',
    time: '≈ 2 h de travail',

    situation:
      'Deux adresses identifient chaque machine : la MAC, numéro de série de la carte réseau, et l\'IP, adresse ' +
      'logique routable. Le support les fait collaborer — « l\'adresse IP dirige le paquet de réseau en réseau, ' +
      'la MAC de dispositif en dispositif » — puis introduit le masque et les classes A, B, C.',

    objectives: [
      'décrire l\'adresse MAC : 48 bits, OUI du fabricant, portée limitée au LAN ;',
      'décomposer l\'adresse IPv4 en partie réseau et partie hôte grâce au masque ;',
      'expliquer la coopération ARP (même réseau) et routage (réseaux distants) ;',
      'classifier une adresse par son premier octet : classes A, B, C, D, E.'
    ],

    sections: [
      {
        title: 'MAC, IP, ARP',
        html: [
          '<p>L\'<strong>adresse MAC</strong> (Media Access Control) opère en couche 2 : elle identifie ' +
          ' unique la carte réseau (NIC). Format : <strong>48 bits</strong>, soit 12 chiffres hexadécimaux ' +
          '(00:1A:2B:3C:4D:5E). Les 6 premiers chiffres (24 bits) forment l\'<strong>OUI</strong> ' +
          '(Organizationally Unique Identifier) du fabricant ; les 6 derniers sont le numéro de série du ' +
          'fabricant. Portée : le segment local uniquement — <strong>une MAC n\'est jamais routée au-delà ' +
          'd\'un routeur</strong>.</p>',
          '<p>L\'<strong>adresse IP</strong> opère en couche 3 : identité logique et routable. <strong>IPv4</strong> : ' +
          '32 bits en quatre octets décimaux (192.168.1.10), composée d\'une partie <strong>réseau</strong> et ' +
          'd\'une partie <strong>hôte</strong>, séparées par le masque ; dynamique (DHCP) ou statique. ' +
          '<strong>IPv6</strong> : 128 bits en huit groupes hexadécimaux, créée contre la pénurie d\'IPv4.</p>',
          '<p>La coopération : sur le <strong>même réseau</strong>, A résout l\'IP de B en MAC via ' +
          '<strong>ARP</strong> (Address Resolution Protocol) et envoie directement. À <strong>distance</strong>, ' +
          'A encapsule le paquet avec la MAC du routeur local ; le routeur désencapsule, lit l\'IP de C, ' +
          'consulte sa table de routage, et réencapsule vers la MAC du routeur suivant — et ainsi de suite.</p>',
          box('mnemo', 'Mnémotechnique — « IP navigue, MAC rame »', 'pin',
            '    <p>IP traverse les réseaux de routeur en routeur ; MAC ne rame que sur son segment local. ' +
            'ARP est le traducteur entre les deux.</p>')
        ].join('\\n')
      },
      {
        title: 'Masque et classes',
        html: [
          '<p>Le <strong>masque de sous-réseau</strong> répond à la question « où finit le réseau, où commence ' +
          'l\'hôte ? ». 32 bits comme l\'adresse : les bits à 1 marquent la partie réseau, les bits à 0 la ' +
          'partie hôte. Exemple : 255.255.255.0 — les 24 premiers bits (trois octets) sont réseau, le dernier ' +
          'octet identifie les machines.</p>',
          '<p>Les <strong>classes</strong> historiques, déterminées par les premiers bits du premier octet : ' +
          '<strong>A</strong> (1er bit 0, adresses 1 à 126, masque 255.0.0.0, ~16 millions d\'hôtes) ; ' +
          '<strong>B</strong> (10, 128 à 191, 255.255.0.0, ~65 000 hôtes) ; <strong>C</strong> (110, 192 à 223, ' +
          '255.255.255.0, 254 hôtes). Les classes <strong>D</strong> (224-239) servent au multicast, ' +
          '<strong>E</strong> (240-254) est expérimentale. 127 est la <strong>boucle locale</strong>.</p>',
          '<p>Ce système, remplacé par le <strong>CIDR</strong>, reste « essentiel à comprendre » selon le ' +
          'support — et c\'est lui qui rend le sous-réseautage lisible au chapitre suivant.</p>',
          box('pitfall', 'Confusions d\'examen', 'warning',
            '    <ul>\\n' +
            '      <li>Une MAC n\'est jamais routée : elle ne sort pas du LAN, contrairement à l\'IP.</li>\\n' +
            '      <li>Classe B : 128 à 191 — pas 127 (boucle locale) ni 192 (classe C).</li>\\n' +
            '      <li>Bits du masque : 1 = réseau, 0 = hôte — jamais l\'inverse.</li>\\n' +
            '      <li>ARP traduit IP en MAC sur le segment local ; à distance, c\'est la table de routage qui parle.</li>\\n' +
            '    </ul>')
        ].join('\\n')
      }
    ],

    questions: [
      { q: 'Une adresse MAC compte…', opts: ['32 bits', '48 bits (12 hexadécimaux)', '128 bits'], correct: 1, exp: '12 chiffres hexadécimaux : 6 OUI + 6 série.' },
      { q: 'L\'OUI d\'une MAC identifie…', opts: ['le réseau', 'le fabricant de la carte', 'l\'utilisateur'], correct: 1, exp: 'Organizationally Unique Identifier : 24 premiers bits.' },
      { q: 'Une MAC est routée…', opts: ['sur Internet', 'jamais au-delà d\'un routeur', 'dans toute l\'entreprise'], correct: 1, exp: 'Portée : le segment local uniquement.' },
      { q: 'IPv4 fait 32 bits, IPv6 fait…', opts: ['48 bits', '64 bits', '128 bits'], correct: 2, exp: 'Huit groupes hexadécimaux, contre la pénurie IPv4.' },
      { q: 'ARP sert à…', opts: ['router les paquets', 'traduire une IP en MAC locale', 'attribuer des IP'], correct: 1, exp: 'Address Resolution Protocol, sur le même réseau.' },
      { q: 'Dans 255.255.255.0, les bits à 0 marquent…', opts: ['le réseau', 'l\'hôte', 'la diffusion'], correct: 1, exp: '1 = réseau, 0 = hôte : ici le dernier octet.' },
      { q: 'L\'adresse 172.16.0.1 est de classe…', opts: ['A', 'B', 'C'], correct: 1, exp: 'Premier octet 172 : classe B (128-191).' },
      { q: 'La classe C offre environ…', opts: ['254 hôtes', '65 000 hôtes', '16 millions d\'hôtes'], correct: 0, exp: '255.255.255.0 : un octet d\'hôte, moins réseau et diffusion.' }
    ],

    pitfalls: [
      'Router une adresse MAC : elle s\'arrête au premier routeur.',
      'Ranger 127 en classe B : c\'est la boucle locale.',
      'Inverser réseau et hôte dans le masque.',
      'Oublier l\'étape ARP avant l\'envoi local : l\'IP seule ne suffit pas.'
    ],

    methodTitle: 'Méthode — lire une adresse en trois gestes',
    method: [
      'Regarder le premier octet : 1-126 (A), 128-191 (B), 192-223 (C), 224-239 (D), 240-254 (E).',
      'Appliquer le masque par défaut : /8, /16 ou /24 — séparer réseau et hôte.',
      'Décider du chemin : même réseau (ARP + MAC), réseau distant (MAC du routeur).'
    ],

    summary: [
      'MAC : 48 bits, OUI + série, couche 2, jamais routée.',
      'IP : 32 bits (IPv4) réseau + hôte ; IPv6 : 128 bits.',
      'ARP traduit IP en MAC localement ; le routeur enchaîne à distance.',
      'Masque : bits 1 = réseau, 0 = hôte. Classes A (1-126), B (128-191), C (192-223).'
    ],

    checklist: [
      'Je sais décomposer une MAC et nommer l\'OUI.',
      'Je sais séparer réseau et hôte avec un masque par défaut.',
      'Je sais dérouler un envoi local (ARP) et distant (routage).',
      'Je sais classifier dix adresses par leur premier octet.'
    ],

    notions: [
      '<strong>MAC</strong> : 48 bits hexadécimaux, identité physique de la carte.',
      '<strong>OUI</strong> : 24 premiers bits, fabricant de la carte.',
      '<strong>IPv4</strong> : 32 bits, quatre octets décimaux, réseau + hôte.',
      '<strong>IPv6</strong> : 128 bits, huit groupes hexadécimaux.',
      '<strong>ARP</strong> : traduction IP en MAC sur le segment local.',
      '<strong>Masque</strong> : 32 bits, 1 = réseau, 0 = hôte.',
      '<strong>Classe A</strong> : 1-126, /8, 16 millions d\'hôtes.',
      '<strong>Classe C</strong> : 192-223, /24, 254 hôtes.'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — relis MAC, IP et le tableau des classes.' },
      { cls: 'mid', text: '50–69 % — refais la classification par premier octet et les masques par défaut.' },
      { cls: 'good', text: '70–89 % — bon niveau, raconte le chemin complet d\'un paquet distant.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché.' }
    ],

    flashcards: [
      { q: 'Structure d\'une MAC ?', a: '48 bits = 12 chiffres hexadécimaux ; 6 premiers : OUI du fabricant, 6 derniers : numéro de série. Non routée.' },
      { q: 'Que fait ARP ?', a: 'Sur un même réseau, il traduit l\'adresse IP de destination en adresse MAC pour l\'encapsulation locale.' },
      { q: 'Rôle du masque ?', a: 'Séparer la partie réseau (bits à 1) de la partie hôte (bits à 0) d\'une adresse IP.' },
      { q: 'Plages des classes A, B, C ?', a: 'A : 1-126 (255.0.0.0) ; B : 128-191 (255.255.0.0) ; C : 192-223 (255.255.255.0).' },
      { q: 'La phrase-clé du support ?', a: '« L\'IP dirige le paquet de réseau en réseau, la MAC de dispositif en dispositif au sein de chaque segment. »' }
    ]
  },

  /* ==================== Chapitre 6 ==================== */
  {
    n: 6,
    title: 'Le sous-réseautage',
    short: 'Sous-réseaux',
    toc: 'Emprunter des bits à la partie hôte ; calculer le nouveau masque ; VLSM et CIDR : la fin des classes.',
    time: '≈ 2 h de travail',

    situation:
      'Un /24 offre 254 hôtes ; quatre bureaux de 30 postes ne peuvent pas partager le même identifiant réseau — ' +
      'et quatre classes C complètes gaspilleraient ~896 adresses. Le sous-réseautage « divise pour régner » : ' +
      'emprunter des bits, recalculer le masque, dimensionner chaque bloc — VLSM et CIDR en font le standard.',

    objectives: [
      'justifier le sous-réseautage : diviser un réseau sans gaspiller d\'adresses ;',
      'calculer sous-réseaux et hôtes valides après emprunt de bits ;',
      'convertir un emprunt en masque décimal et en notation CIDR ;',
      'dimensionner un plan VLSM : le plus petit bloc couvrant chaque besoin.'
    ],

    sections: [
      {
        title: 'Emprunter des bits',
        html: [
          '<p>Créer des sous-réseaux, c\'est <strong>emprunter des bits à la partie hôte</strong> en les mettant ' +
          'à 1 dans le masque. Les <strong>bits empruntés</strong> déterminent le nombre de sous-réseaux : ' +
          '2^emprunt (3 bits = 8 sous-réseaux). Les <strong>bits restants</strong> déterminent les hôtes valides ' +
          'de chaque sous-réseau : 2^(bits restants) - 2 (5 bits restants = 30 hôtes valides — l\'adresse réseau ' +
          'et l\'adresse de diffusion sont retirées).</p>',
          '<p>Le <strong>nouveau masque</strong> se lit sur le dernier octet : 3 bits empruntés donnent ' +
          '11100000, soit 128 + 64 + 32 = <strong>224</strong> — masque 255.255.255.224, ou <strong>/27</strong> ' +
          'en notation CIDR. Deux bits donnent 192 (/26), un bit 128 (/25), quatre bits 240 (/28).</p>',
          box('mnemo', 'Mnémotechnique — « chaque bit emprunté double les réseaux et divise les hôtes »', 'pin',
            '    <p>+1 bit emprunté : sous-réseaux x 2, hôtes valides environ / 2 (moins 2). Le masque monte ' +
            'en face : 128, 192, 224, 240, 248, 252.</p>')
        ].join('\\n')
      },
      {
        title: 'VLSM et CIDR',
        html: [
          '<p>Avec le découpage classique, tous les sous-réseaux d\'un réseau portaient le même masque : ' +
          'inefficace quand un bureau n\'a besoin que de 5 hôtes et un autre de 50. Le <strong>VLSM</strong> ' +
          '(Variable Length Subnet Masking) permet <strong>différents masques au sein du même réseau ' +
          'principal</strong> : /30 pour les liaisons point-à-point (2 hôtes), /26 pour les gros bureaux — ' +
          'efficacité maximale. Le routeur doit comprendre le masque de chaque sous-réseau.</p>',
          '<p>Le <strong>CIDR</strong> (Classless Inter-Domain Routing), adopté au début des années 90, rend ' +
          'obsolète le système de classes et standardise le VLSM. La <strong>notation CIDR</strong> écrit le ' +
          'nombre de bits réseau après un slash : 192.168.1.0/27 — ancienne classe C sous-réseautée ; 10.0.0.0/30 ' +
          '— liaison point-à-point. Le choix de la taille exacte optimise l\'espace d\'adressage global.</p>',
          box('pitfall', 'Confusions d\'examen', 'warning',
            '    <ul>\\n' +
            '      <li>Les hôtes valides retirent deux adresses : réseau et diffusion — 2^k - 2, jamais 2^k.</li>\\n' +
            '      <li>3 bits empruntés sur /24 donnent /27, pas /3 : on additionne au préfixe de départ.</li>\\n' +
            '      <li>/30 = 2 hôtes valides : c\'est le bloc des liaisons point-à-point.</li>\\n' +
            '      <li>Le VLSM exige que le routeur connaisse chaque masque : « diviser pour régner » se route.</li>\\n' +
            '    </ul>')
        ].join('\\n')
      }
    ],

    questions: [
      { q: 'Emprunter 3 bits à un /24 crée…', opts: ['3 sous-réseaux', '8 sous-réseaux', '30 sous-réseaux'], correct: 1, exp: '2^3 = 8 sous-réseaux possibles.' },
      { q: 'Avec 5 bits d\'hôte restants, un sous-réseau offre…', opts: ['32 hôtes', '30 hôtes', '5 hôtes'], correct: 1, exp: '2^5 - 2 : réseau et diffusion retirés.' },
      { q: 'Le masque 255.255.255.224 correspond à…', opts: ['/26', '/27', '/28'], correct: 1, exp: '11100000 = 224 : 3 bits empruntés, /27.' },
      { q: 'Emprunter 2 bits donne un dernier octet de…', opts: ['192', '224', '240'], correct: 0, exp: '11000000 = 128 + 64 = 192.' },
      { q: 'Le VLSM permet…', opts: ['un masque unique par réseau', 'des masques différents dans un même réseau', 'd\'ignorer le routage'], correct: 1, exp: 'Tailles variées : /30 pour les liaisons, /26 pour les bureaux.' },
      { q: 'Le CIDR a remplacé…', opts: ['le VLSM', 'le système de classes', 'DHCP'], correct: 1, exp: 'Routage sans classe : notation /n, fin des classes A-B-C.' },
      { q: 'Une liaison point-à-point se dimensionne en…', opts: ['/24', '/28', '/30'], correct: 2, exp: '2 hôtes valides : exactement deux routeurs.' },
      { q: '192.168.1.0/27 offre par sous-réseau…', opts: ['30 hôtes', '62 hôtes', '126 hôtes'], correct: 0, exp: '27 bits réseau, 5 bits hôte : 2^5 - 2 = 30.' }
    ],

    pitfalls: [
      'Oublier de retirer 2 aux hôtes : l\'adresse réseau et la diffusion ne sont pas attribuables.',
      'Calculer le masque sans convertir le binaire : 11100000 = 224, pas 223.',
      'Confondre nombre de sous-réseaux (2^emprunt) et hôtes par sous-réseau (2^restants - 2).',
      'Appliquer le même masque partout quand le VLSM est demandé.'
    ],

    methodTitle: 'Méthode — dimensionner un sous-réseau en trois gestes',
    method: [
      'Compter les hôtes nécessaires, ajouter le marge de croissance.',
      'Choisir k bits d\'hôte tel que 2^k - 2 couvre le besoin ; préfixe = 32 - k.',
      'Convertir le masque : bits à 1 = réseau — 128, 192, 224, 240, 248, 252, 254.'
    ],

    summary: [
      'Emprunt de bits : 2^emprunt sous-réseaux, 2^(restants) - 2 hôtes valides.',
      'Nouveau masque : dernier octet 128, 192, 224, 240, 248, 252 — /25 à /30.',
      'VLSM : masques différents dans un même réseau, efficacité maximale.',
      'CIDR : notation /n, fin des classes, standard de l\'adressage IPv4.'
    ],

    checklist: [
      'Je sais calculer sous-réseaux et hôtes valides après un emprunt.',
      'Je sais convertir un emprunt en masque décimal et en /n.',
      'Je sais justifier le VLSM sur un plan à besoins inégaux.',
      'Je sais choisir le bloc le plus petit couvrant un besoin.'
    ],

    notions: [
      '<strong>Sous-réseautage</strong> : diviser un réseau en empruntant des bits d\'hôte.',
      '<strong>Bits empruntés</strong> : déterminent 2^emprunt sous-réseaux.',
      '<strong>Hôtes valides</strong> : 2^k - 2 (réseau et diffusion exclus).',
      '<strong>/27</strong> : 255.255.255.224, 30 hôtes valides.',
      '<strong>/30</strong> : 255.255.255.252, 2 hôtes — liaison point-à-point.',
      '<strong>VLSM</strong> : masques de longueurs variables dans un même réseau.',
      '<strong>CIDR</strong> : routage sans classe, notation IP/n.',
      '<strong>Diffusion</strong> : dernière adresse du bloc, non attribuable.'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — relis l\'exemple de l\'emprunt de 3 bits du support.' },
      { cls: 'mid', text: '50–69 % — refais les conversions masque binaire/décimal/CIDR.' },
      { cls: 'good', text: '70–89 % — bon niveau, dimensionne un plan VLSM complet.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché.' }
    ],

    flashcards: [
      { q: '3 bits empruntés sur /24 ?', a: '8 sous-réseaux, 30 hôtes valides chacun, masque 255.255.255.224, notation /27.' },
      { q: 'Pourquoi 2^k - 2 ?', a: 'On retire l\'adresse du réseau (première) et celle de diffusion (dernière) des 2^k combinaisons.' },
      { q: 'Qu\'apporte le VLSM ?', a: 'Des masques différents dans un même réseau principal : /30 pour les liaisons, /26 pour les gros bureaux.' },
      { q: 'La notation CIDR ?', a: 'Adresse IP/nombre de bits réseau : 192.168.1.0/27 ; elle remplace les classes depuis les années 90.' },
      { q: 'Le masque /28 en décimal ?', a: '255.255.255.240 (4 bits empruntés : 128+64+32+16) — 14 hôtes valides.' }
    ]
  }
];
