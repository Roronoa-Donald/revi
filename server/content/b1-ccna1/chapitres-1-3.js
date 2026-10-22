/**
 * Chapitres 1 à 3 du cours de CCNA 1 B1.
 *
 * Chapitre 1 : généralités sur les réseaux (composantes, supports, câblage
 *               paires torsadées et fibre optique, catégories).
 * Chapitre 2 : les modèles TCP/IP (4 et 5 couches) et OSI (7 couches).
 * Chapitre 3 : les réseaux locaux Ethernet (SOHO et entreprise, liaisons UTP,
 *               câble droit et croisé, trame 802.3, duplex intégral).
 *
 * Chaque chapitre fournit la matière que `kit.chapter` met en page. Aucun
 * titre <h2> ici : la numérotation est ajoutée au rendu. Les ateliers de code
 * (trois exercices Bash par chapitre) sont injectés avant le QCM par
 * `scripts/generate-code-labs.js` à partir de `server/exercises/b1-ccna1.js`.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = [
  /* ==================== Chapitre 1 ==================== */
  {
    n: 1,
    title: 'Généralités et composantes des réseaux',
    short: 'Généralités',
    toc: 'Qu\'est-ce qu\'un réseau ? Les composantes : terminaux, routeur, commutateurs L2/L3, ponts, concentrateurs, pare-feu, IDS/IPS ; câblage paires torsadées (types et catégories) et fibre optique.',
    time: '≈ 2 h de travail',
    free: true,

    situation:
      'Un réseau informatique est un ensemble de matériels reliés entre eux par des supports de transport et ' +
      'échangeant des informations sous forme de données numériques — des bits. Deux ordinateurs connectés ' +
      'forment déjà un réseau minimal. Avant de configurer quoi que ce soit, il faut nommer chaque boîte et ' +
      'chaque câble : c\'est le terrain de ce chapitre.',

    objectives: [
      'définir réseau et mise en réseau (networking) ;',
      'placer chaque composante : terminal, routeur, switch L2 et L3, pont, concentrateur, pare-feu, IDS/IPS ;',
      'distinguer les cinq types de paires torsadées (UTP, FTP, STP, SFTP, SSTP) ;',
      'choisir la catégorie de câble selon le débit : cat 5e (1 Gbit/s), cat 6a (10 Gbit/s) ;',
      'expliquer le principe de la fibre optique : réfraction, cœur, revêtement.'
    ],

    sections: [
      {
        title: 'Les composantes du réseau',
        html: [
          '<p>Le <strong>périphérique terminal</strong> (PC, imprimante, serveur) envoie et reçoit des ' +
          'données. Le <strong>routeur</strong> relie des réseaux distincts et choisit les chemins — c\'est ' +
          'la couche réseau. Le <strong>commutateur de couche 2</strong> (switch L2) commute les trames ' +
          'dans un même LAN ; le <strong>commutateur de couche 3</strong> (switch L3) ajoute le routage ' +
          'entre VLAN. Les générations anciennes survivent dans le vocabulaire : <strong>ponts</strong> ' +
          '(ancêtres du switch), <strong>concentrateurs</strong> (hubs, qui répètent les bits sans les ' +
          'comprendre).</p>',
          '<p>La sécurité s\'ajoute en couches : le <strong>pare-feu</strong> filtre le trafic selon des ' +
          'règles ; l\'<strong>IDS</strong> (détection d\'intrusion) surveille et alerte, en coupure ou sur ' +
          'un hôte, en temps réel ou a posteriori ; l\'<strong>IPS</strong> (prévention d\'intrusion) va plus ' +
          'loin et bloque le comportement malicieux — c\'est « la prochaine étape dans l\'évolution de l\'IDS ».</p>',
          box('mnemo', 'Mnémotechnique — « le hub répète, le switch comprend, le routeur décide, l\'IPS bloque »', 'pin',
            '    <p>Quatre boîtes, quatre degrés d\'intelligence : la hiérarchie du réseau en une phrase.</p>')
        ].join('\n')
      },
      {
        title: 'Paires torsadées : types et catégories',
        html: [
          box('situation', 'Signal physique : pourquoi du cuivre et pourquoi torsader les fils ?', 'globe',
            '    <p>Dans un câble réseau Ethernet, les bits (0 et 1) se déplacent sous forme de variations de tension électrique. ' +
            'Or, tout fil de cuivre agit comme une antenne : il capte les parasites électromagnétiques environnants ' +
            '(moteurs, néons, ascenseurs, câbles 230 V) et rayonne sur les fils voisins (phénomène de diaphonie ou <em>crosstalk</em>).</p>\n' +
            '    <p>L’astuce des ingénieurs réseau : <strong>enrouler les fils deux par deux en spirale (torsade)</strong>. ' +
            'Les perturbations extérieures frappent les deux fils de façon égale ; à l’arrivée, la carte réseau mesure ' +
            'la <em>différence</em> de tension entre les deux conducteurs, ce qui annule automatiquement le bruit parasite. ' +
            'Pour les très longues distances ou les débits extrêmes insensibles aux champs électromagnétiques, on remplace ' +
            'les électrons par des photons lumineux : c’est la fibre optique.</p>'),
          '<p>La <strong>paire torsadée</strong> — deux conducteurs enroulés en hélice pour minimiser les ' +
          'interférences électromagnétiques — est le support le plus répandu. Cinq types : ' +
          '<strong>UTP</strong> (non blindée, téléphonie et réseaux domestiques), <strong>FTP</strong> ' +
          '(écrantée : une feuille d\'aluminium autour de l\'ensemble des paires), <strong>STP</strong> ' +
          '(blindée : chaque paire entourée de sa couche conductrice, réseaux Token-Ring), <strong>SFTP</strong> ' +
          '(écrantée ET blindée, double écran commun), <strong>SSTP</strong> (super blindée : STP plus un ' +
          'écran commun sous la gaine).</p>',
          '<p>Les <strong>catégories</strong> (ANSI/TIA/EIA-568B) : cat 1 et 2 abandonnées (téléphonie, ' +
          'Token Ring 4 Mbit/s), cat 3 (16 MHz, téléphonie et 100BASE-T), cat 4 (20 MHz, vite remplacée), ' +
          'cat 5 (100 MHz), <strong>cat 5e</strong> (125 MHz, jusqu\'à 1 Gbit/s), <strong>cat 6</strong> ' +
          '(250 MHz), <strong>cat 6a</strong> (500 MHz, 10 Gbit/s, compatible PoE/PoE+), cat 7 (600 MHz, ' +
          '10 Gbit/s sur 100 m, blindage individuel et collectif).</p>',
          box('pitfall', 'Confusions d\'examen', 'warning',
            '    <ul>\n' +
            '      <li>FTP = écran commun (feuille d\'aluminium) ; STP = blindage par paire : deux blindages différents.</li>\n' +
            '      <li>Cat 5e porte le gigabit ; le 10 Gigabit exige cat 6a ou 7.</li>\n' +
            '      <li>Le hub (couche 1) ne cible personne ; le switch L2 transfère selon la MAC.</li>\n' +
            '      <li>L\'IDS alerte ; l\'IPS bloque : la différence est dans l\'action.</li>\n' +
            '    </ul>')
        ].join('\n')
      },
      {
        title: 'La fibre optique',
        html: [
          '<p>La <strong>fibre optique</strong> — fil de verre ou de plastique très fin — conduit la ' +
          'lumière et sert aux transmissions terrestres et océaniques. Principe : un <strong>laser</strong> ' +
          '(ou une DEL) transforme le signal électrique en lumière, la fibre la propage, une cellule ' +
          'photoélectrique la reconvertit en signal électrique. Physique : la <strong>réfraction</strong> — ' +
          'un faisceau qui frappe en biais la surface entre deux milieux se partage en partie réfléchie et ' +
          'partie réfractée ; l\'indice de réfraction divise la vitesse de la lumière dans le vide (299 792 ' +
          'km/s) par celle dans le matériau (55 à 60 % dans le verre).</p>',
          '<p>L\'<strong>atténuation</strong> — affaiblissement du signal (loi de Beer-Lambert, Ps = Pe·e^(-αL)) ' +
          '— est extrêmement faible : environ 0,2 dB/km vers 1550 nm, avec réamplification périodique par ' +
          'amplificateurs optiques sur les longues distances.</p>'
        ].join('\n')
      }
    ],

    questions: [
      { q: 'Deux ordinateurs connectés constituent…', opts: ['un WAN', 'un réseau minimal', 'un sous-réseau'], correct: 1, exp: 'Définition du support : deux ordinateurs connectés forment à eux seuls un réseau minimal.' },
      { q: 'Le commutateur de couche 3 sait…', opts: ['répéter les bits', 'commuter dans un VLAN', 'router entre VLAN'], correct: 2, exp: 'Le switch L3 ajoute le routage à la commutation L2.' },
      { q: 'L\'IPS se distingue de l\'IDS car il…', opts: ['alerte seulement', 'bloque les menaces', 'filtre les e-mails'], correct: 1, exp: 'L\'IPS répond aux menaces détectées : c\'est la prévention.' },
      { q: 'La paire STP est blindée…', opts: ['par feuille commune', 'par paire', 'par connecteur'], correct: 1, exp: 'STP : chaque paire entourée de sa couche conductrice (Token-Ring).' },
      { q: 'La feuille d\'aluminium autour de TOUTES les paires désigne…', opts: ['UTP', 'FTP', 'SSTP'], correct: 1, exp: 'FTP (F/UTP) : écran général entre gaine et groupement de paires.' },
      { q: 'Le 10 Gigabit exige au minimum…', opts: ['cat 5e', 'cat 6a', 'cat 3'], correct: 1, exp: 'Cat 6a : 500 MHz, 10 Gbit/s, compatible PoE/PoE+.' },
      { q: 'Dans la fibre, la lumière est reconvertie par…', opts: ['une cellule photoélectrique', 'un hub', 'un transfo'], correct: 0, exp: 'Laser → fibre → cellule photoélectrique : le cycle électrique-lumière-électrique.' },
      { q: 'L\'atténuation minimale de la silice est vers…', opts: ['850 nm', '1550 nm', '2900 nm'], correct: 1, exp: 'Proche infrarouge : ~0,2 dB/km, réamplification périodique au-delà.' }
    ],

    pitfalls: [
      'Donner un rôle de routage au switch L2 : il commute, il ne route pas.',
      'Confondre FTP (écran commun) et STP (blindage par paire).',
      'Poser du cat 3 pour du gigabit : cat 5e minimum.',
      'Attendre d\'un hub qu\'il cible le destinataire : il répète tout à tous.'
    ],

    methodTitle: 'Méthode — identifier un équipement en trois gestes',
    method: [
      'Regarder la couche : bits (hub, 1), trames (switch L2, 2), paquets (routeur, 3).',
      'Vérifier le média : paires torsadées (catégorie selon débit) ou fibre (distance, sécurité).',
      'Penser sécurité : pare-feu (filtre), IDS (alerte), IPS (bloque).'
    ],

    summary: [
      'Réseau : matériels reliés par des supports, échange de données numériques.',
      'Hub répète (couche 1), switch L2 commute, switch L3 route, routeur relie les réseaux.',
      'Cinq types de paires torsadées ; catégories de cat 3 (16 MHz) à cat 7 (600 MHz).',
      'Fibre : réfraction, atténuation ~0,2 dB/km, multimode et monomode.'
    ],

    checklist: [
      'Je sais classer les composantes et leurs couches.',
      'Je sais distinguer les cinq types de paires torsadées.',
      'Je sais conseiller une catégorie de câble selon le débit.',
      'Je sais expliquer le fonctionnement de la fibre optique.'
    ],

    notions: [
      '<strong>Réseau</strong> : ensemble d\'ordinateurs et périphériques interconnectés pour échanger.',
      '<strong>Switch L3</strong> : commutation + routage entre VLAN.',
      '<strong>IDS / IPS</strong> : détection (alerte) / prévention (blocage) d\'intrusion.',
      '<strong>UTP / FTP / STP / SFTP / SSTP</strong> : les cinq types de paires torsadées.',
      '<strong>Cat 5e</strong> : 125 MHz, jusqu\'à 1 Gbit/s.',
      '<strong>Cat 6a</strong> : 500 MHz, 10 Gbit/s.',
      '<strong>Réfraction</strong> : changement de direction entre deux milieux.',
      '<strong>Atténuation</strong> : affaiblissement exponentiel (Beer-Lambert).'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — relis les composantes et le tableau des catégories.' },
      { cls: 'mid', text: '50–69 % — refais le classement types de paires torsadées.' },
      { cls: 'good', text: '70–94 % — bon niveau, cible les cas IDS/IPS et L2/L3.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché.' }
    ],

    flashcards: [
      { q: 'Qu’est-ce que « Atténuation » ?', a: 'Atténuation : affaiblissement exponentiel (Beer-Lambert).' },
      { q: 'Qu’est-ce que « IEEE 802.3 » ?', a: 'IEEE 802.3 : la famille de normes Ethernet filaire.' },
      { q: 'Qu’est-ce que « RJ-45 » ?', a: 'RJ-45 : connecteur à 8 positions (broches).' },
      { q: 'Qu’est-ce que « En-tête IPv4 » ?', a: 'En-tête IPv4 : 20 octets, adresses 32 bits inchangées.' },
      { q: 'Qu’est-ce que « Routeur par défaut » ?', a: 'Routeur par défaut : destination des paquets hors du sous-réseau.' },
      { q: 'Qu’est-ce que « ARP » ?', a: "ARP : apprend la MAC d'un hôte IP du LAN." },
      { q: 'Qu’est-ce que « configure terminal » ?', a: 'configure terminal : passage au mode de configuration.' },
      { q: 'Qu’est-ce que « enable secret » ?', a: 'enable secret : mot de passe du mode enable, en global.' },
      { q: 'Qu’est-ce que « username nom secret motdepasse » ?', a: "username nom secret motdepasse : création d'un utilisateur local." },
      { q: 'Qu\'est-ce qu\'un réseau informatique ?', a: 'Ensemble de matériels reliés par des supports de transport et échangeant des données numériques (0 et 1).' },
      { q: 'Switch L2 contre switch L3 ?', a: 'L2 : commutation des trames dans un LAN. L3 : commutation PLUS routage entre VLAN.' },
      { q: 'IDS contre IPS ?', a: 'IDS : détecte et alerte. IPS : détecte ET bloque — la prochaine étape de l\'évolution.' },
      { q: 'Les cinq types de paires torsadées ?', a: 'UTP (rien), FTP (écran commun), STP (blindage par paire), SFTP (double écran), SSTP (super blindée).' },
      { q: 'Cat 5e et cat 6a ?', a: 'Cat 5e : 125 MHz, 1 Gbit/s. Cat 6a : 500 MHz, 10 Gbit/s (PoE/PoE+).' },
      { q: 'Le cycle de la fibre optique ?', a: 'Laser (électrique → lumière), propagation par réfraction, cellule photoélectrique (lumière → électrique).' }
    ]
  },

  /* ==================== Chapitre 2 ==================== */
  {
    n: 2,
    title: 'Les modèles TCP/IP et OSI',
    short: 'TCP/IP et OSI',
    toc: 'Le modèle TCP/IP à 4 couches et à 5 couches (d\'actualité) ; le modèle OSI en 7 couches, de la physique à l\'application ; les unités de données par couche.',
    time: '≈ 2 h de travail',

    situation:
      'Impossible de faire communiquer des machines de fabricants différents sans un accord : l\'ISO a bâti ' +
      'le modèle <strong>OSI</strong> en sept couches, référentiel de toutes les discussions. Mais c\'est le ' +
      '<strong>TCP/IP</strong> — à 4 couches, ou à 5 couches « modèle d\'actualité » — qui fait tourner les ' +
      'réseaux réels.',

    objectives: [
      'ranger les protocoles dans les 4 couches TCP/IP : accès réseau, internet, transport, application ;',
      'expliquer le modèle à 5 couches : la couche physique est séparée de l\'accès réseau ;',
      'réciter les 7 couches OSI avec leur rôle et leur unité de données ;',
      'associer équipements et couches : hub (1), switch (2), routeur (3).'
    ],

    sections: [
      {
        title: 'TCP/IP : 4 puis 5 couches',
        html: [
          '<p>Le modèle <strong>TCP/IP à 4 couches</strong> : <strong>accès réseau</strong> (Ethernet, ' +
          'câbles), <strong>internet</strong> (IP, routage), <strong>transport</strong> (TCP, UDP), ' +
          '<strong>application</strong>. Le modèle <strong>à 5 couches</strong> — « le modèle d\'actualité » ' +
          'selon le support — sépare la <strong>couche physique</strong> de la couche accès réseau : ' +
          'physique, liaison de données, réseau, transport, application.</p>',
          '<p>Ce découpage hérite d\'OSI : les couches hautes fusionnent en « application », la couche réseau ' +
          'devient « internet », et les deux basses se partagent entre « liaison de données » et « physique ».</p>',
          box('mnemo', 'Mnémotechnique — « TCP/IP 4 : AITA ; OSI 7 : PLR-TSPA »', 'pin',
            '    <p>Accès, Internet, Transport, Application pour TCP/IP ; Physique, Liaison, Réseau, ' +
            'Transport, Session, Présentation, Application pour OSI.</p>')
        ].join('\n')
      },
      {
        title: 'OSI : les sept couches',
        html: [
          '<p><strong>7-Application</strong> : point d\'accès aux services réseau (messagerie, transfert de ' +
          'fichiers) — le lien entre l\'utilisateur et la machine. <strong>6-Présentation</strong> : codage ' +
          'et décodage des données (ASCII, Unicode, HTML), représentation commune. <strong>5-Session</strong> : ' +
          'ouvre, gère et ferme les sessions, synchronise le dialogue (RPC, NetBIOS). <strong>4-Transport</strong> : ' +
          'découpe en segments, fiabilité (renvoi des données manquantes), contrôle de flux, ports. ' +
          '<strong>3-Réseau</strong> : adressage logique (IP), acheminements de réseau en réseau par ' +
          'routeurs — chaque segment devient un paquet. <strong>2-Liaison de données</strong> : méthodes de ' +
          'transmission dans un même LAN, détection d\'erreurs, Ethernet — chaque paquet devient une trame ' +
          '(en-tête + queue ajoutés). <strong>1-Physique</strong> : transmission des bits sur les supports ' +
          '(cuivre, fibre, ondes) — le hub vit ici.</p>',
          box('pitfall', 'Confusions d\'examen', 'warning',
            '    <ul>\n' +
            '      <li>La couche 6 code (ASCII) ; la couche 7 parle à l\'utilisateur : deux rôles distincts.</li>\n' +
            '      <li>Segment (4), paquet (3), trame (2), bits (1) : l\'unité trahit la couche.</li>\n' +
            '      <li>Le modèle d\'actualité est TCP/IP à 5 couches, pas à 4.</li>\n' +
            '      <li>Le hub est de couche 1 : il ne lit ni MAC ni IP.</li>\n' +
            '    </ul>')
        ].join('\n')
      }
    ],

    questions: [
      { q: 'Le modèle TCP/IP d\'actualité compte…', opts: ['4 couches', '5 couches', '7 couches'], correct: 1, exp: 'Le support : « le modèle TCP/IP à 5 couches est le modèle d\'actualité ».' },
      { q: 'La couche présentation OSI gère…', opts: ['le routage', 'le codage des données (ASCII…)', 'les sessions'], correct: 1, exp: 'Couche 6 : codage/décodage, représentation commune.' },
      { q: 'La couche session s\'occupe…', opts: ['des ouvertures et fermetures de sessions', 'des bits', 'des ports'], correct: 0, exp: 'RPC et NetBIOS vivent en couche 5.' },
      { q: 'La couche transport découpe les données en…', opts: ['paquets', 'segments', 'trames'], correct: 1, exp: 'Segments en 4 ; paquets en 3 ; trames en 2.' },
      { q: 'Chaque paquet devient une trame en couche…', opts: ['1', '2', '3'], correct: 1, exp: 'Liaison de données : en-tête + queue de trame ajoutés.' },
      { q: 'Le hub travaille en couche…', opts: ['1 physique', '2 liaison', '3 réseau'], correct: 0, exp: 'Il transmet sans cibler MAC ni IP.' },
      { q: 'L\'adressage logique (IP) est de la couche…', opts: ['2', '3', '4'], correct: 1, exp: 'Réseau : routeurs et protocoles de routage.' },
      { q: 'La couche application OSI est…', opts: ['la plus proche de l\'utilisateur', 'la couche des câbles', 'celle des ports'], correct: 0, exp: 'Couche 7 : messagerie, transfert de fichiers, pages web.' }
    ],

    pitfalls: [
      'Mettre « physique » dans le modèle TCP/IP à 4 couches : il n\'y est pas.',
      'Confondre segment (4) et paquet (3) : l\'unité suit la couche.',
      'Chercher le codage ASCII en couche 7 : c\'est la couche 6.',
      'Réciter OSI de haut en bas sans les numéros : l\'examen demande les deux sens.'
    ],

    methodTitle: 'Méthode — classer une tâche en trois gestes',
    method: [
      'Identifier l\'unité : bits, trame, paquet, segment, donnée — elle nomme la couche.',
      'Regarder le périmètre : même LAN (2), entre réseaux (3), bout en bout (4).',
      'Choisir le modèle : OSI 7 pour décrire, TCP/IP 5 pour pratiquer.'
    ],

    summary: [
      'TCP/IP 4 couches : accès réseau, internet, transport, application.',
      'TCP/IP 5 couches (actualité) : la physique est séparée.',
      'OSI 7 : application, présentation, session, transport, réseau, liaison, physique.',
      'Unités : bits, trame, paquet, segment — du câble vers l\'utilisateur.'
    ],

    checklist: [
      'Je sais réciter les deux modèles dans les deux sens.',
      'Je sais associer unité de données et couche.',
      'Je sais expliquer le rôle de chaque couche OSI.',
      'Je sais dire pourquoi TCP/IP 5 est le modèle d\'actualité.'
    ],

    notions: [
      '<strong>TCP/IP 4</strong> : accès réseau, internet, transport, application.',
      '<strong>TCP/IP 5</strong> : le modèle d\'actualité — physique séparée.',
      '<strong>Couche 6</strong> : présentation — codage ASCII, Unicode.',
      '<strong>Couche 5</strong> : session — RPC, NetBIOS, synchronisation.',
      '<strong>Couche 3</strong> : réseau — IP, routeurs, paquets.',
      '<strong>Couche 2</strong> : liaison — Ethernet, trames, switch.',
      '<strong>Couche 1</strong> : physique — bits, câbles, hub.',
      '<strong>Segment / paquet / trame</strong> : les unités des couches 4/3/2.'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — relis les sept couches et leurs unités.' },
      { cls: 'mid', text: '50–69 % — refais le classement des deux modèles TCP/IP.' },
      { cls: 'good', text: '70–94 % — bon niveau, cible les exemples de protocoles par couche.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché.' }
    ],

    flashcards: [
      { q: 'Les 4 couches TCP/IP ?', a: 'Accès réseau, internet, transport, application.' },
      { q: 'Pourquoi TCP/IP à 5 couches ?', a: 'Modèle d\'actualité : la couche physique est séparée de la couche d\'accès réseau.' },
      { q: 'Les 7 couches OSI ?', a: 'Application, présentation, session, transport, réseau, liaison de données, physique (7 → 1).' },
      { q: 'Que fait la couche 6 ?', a: 'Présentation : codage et décodage (ASCII, Unicode, HTML), représentation commune des données.' },
      { q: 'Segment, paquet, trame ?', a: 'Segment (couche 4), paquet (couche 3), trame (couche 2), bits (couche 1).' }
    ]
  },

  /* ==================== Chapitre 3 ==================== */
  {
    n: 3,
    title: 'Les réseaux locaux Ethernet',
    short: 'Ethernet LAN',
    toc: 'Ethernet (IEEE 802.3) ; réseaux SOHO et d\'entreprise ; liaisons UTP : câble droit et croisé, brochages 10/100/1000BASE-T ; la trame 802.3 ; envoi en duplex intégral.',
    time: '≈ 2 h de travail',

    situation:
      'Ethernet — la famille de normes <strong>IEEE 802.3</strong> — régit les réseaux locaux filaires : ' +
      'câblage, connecteurs, règles de protocole. Le support décompose la liaison UTP, les brochages droit ' +
      'et croisé, la trame 802.3 champ par champ, puis le chemin d\'une trame en duplex intégral.',

    objectives: [
      'décrire un LAN SOHO (un commutateur, ou un routeur sans fil unique) et un LAN d\'entreprise (un switch par étage) ;',
      'décomposer la liaison Ethernet : câble, connecteurs RJ-45, ports ;',
      'appliquer le brochage : câble droit (appareils différents), câble croisé (appareils similaires) ;',
      'citer les champs de la trame 802.3 avec leurs tailles ;',
      'dérouler le chemin d\'une trame PC1 → SW1 → SW2 → PC2.'
    ],

    sections: [
      {
        title: 'SOHO, entreprise et liaisons UTP',
        html: [
          '<p>Le <strong>LAN SOHO</strong> (Small Office Home Office) : un commutateur LAN Ethernet pour ' +
          'tous les nœuds (PC, imprimante, routeur vers l\'Internet) ; dans la réalité, un seul appareil ' +
          '« routeur sans fil » remplit les trois rôles (routeur, commutateur, point d\'accès). Le ' +
          '<strong>LAN d\'entreprise</strong> reproduit ce schéma à plus grande échelle : un commutateur et ' +
          'un point d\'accès par étage, dans la salle technique. Les normes sans fil commencent par ' +
          '<strong>802.11</strong> ; les normes Ethernet par <strong>802.3</strong>, de 10 Mbit/s à 400 Gbit/s.</p>',
          '<p>La <strong>liaison Ethernet</strong> = câble + connecteurs RJ-45 + ports. 10BASE-T et ' +
          '100BASE-T utilisent deux paires ; <strong>1000BASE-T</strong> en exige quatre. Les cartes ' +
          'réseau émettent sur les broches <strong>1 et 2</strong> et reçoivent sur <strong>3 et 6</strong> ; ' +
          'les commutateurs font le contraire. D\'où deux brochages : le <strong>câble droit</strong> ' +
          '(broche à broche, entre appareils différents — PC vers switch) et le <strong>câble croisé</strong> ' +
          '(paires croisées 1-2/3-6, entre appareils similaires — deux commutateurs). Le gigabit transmet ' +
          'et reçoit simultanément sur chaque paire (broches 4-5 et 7-8 ajoutées).</p>',
          box('mnemo', 'Mnémotechnique — « droit entre différents, croisé entre copains »', 'pin',
            '    <p>PC-switch : droit. Switch-switch, PC-PC : croisé. Le gigabit transmet dans les deux ' +
            'sens sur les quatre paires.</p>')
        ].join('\n')
      },
      {
        title: 'La trame 802.3 et le duplex intégral',
        html: [
          '<p>La <strong>trame Ethernet</strong> (802.3) : préambule (7 octets, synchronisation), SFD (1 ' +
          'octet, annonce l\'adresse MAC de destination), <strong>MAC destination</strong> (6), <strong>MAC ' +
          'source</strong> (6), type (2 — IPv4 ou IPv6), données et pad (46 à 1500 octets), <strong>FCS</strong> ' +
          '(4 — détection d\'erreurs par la carte réceptrice). Les données portent un paquet L3, avec un ' +
          'pad si la charge est inférieure à 46 octets.</p>',
          '<p>En <strong>duplex intégral</strong> (réseaux modernes à commutateurs), chaque liaison permet ' +
          'l\'émission et la réception simultanées — plus simple et plus rapide que le semi-duplex exigé ' +
          'par les anciens concentrateurs. Le chemin : PC1 construit et envoie la trame (sa MAC en source, ' +
          'celle de PC2 en destination) ; SW1 relaie de G0/1 vers SW2 ; SW2 livre de F0/2 vers PC2 ; PC2 ' +
          'reconnaît sa MAC et traite.</p>',
          box('pitfall', 'Confusions d\'examen', 'warning',
            '    <ul>\n' +
            '      <li>MAC destination et source : 6 octets chacune ; type : 2 ; FCS : 4.</li>\n' +
            '      <li>Les données font de 46 à 1500 octets : le pad comble le minimum.</li>\n' +
            '      <li>Le câble croisé relie deux appareils SIMILAIRES, pas deux appareils quelconques.</li>\n' +
            '      <li>Duplex intégral = émission et réception simultanées, possible grâce aux commutateurs.</li>\n' +
            '    </ul>')
        ].join('\n')
      }
    ],

    questions: [
      { q: 'Les normes Ethernet commencent par…', opts: ['802.11', '802.3', '802.15'], correct: 1, exp: 'IEEE 802.3 ; 802.11 désigne le sans-fil.' },
      { q: 'Un LAN SOHO typique d\'aujourd\'hui utilise…', opts: ['un switch par étage', 'un appareil « routeur sans fil » unique', 'un hub central'], correct: 1, exp: 'Un seul appareil remplit routeur, commutateur et point d\'accès.' },
      { q: 'Les cartes réseau émettent sur les broches…', opts: ['1 et 2', '3 et 6', '7 et 8'], correct: 0, exp: 'Émission 1-2, réception 3-6 ; les commutateurs font l\'inverse.' },
      { q: 'Entre deux commutateurs, on utilise…', opts: ['un câble droit', 'un câble croisé', 'du coaxial'], correct: 1, exp: 'Appareils similaires : paires croisées 1-2/3-6.' },
      { q: '1000BASE-T utilise…', opts: ['deux paires', 'quatre paires', 'une fibre'], correct: 1, exp: 'Quatre paires, transmission simultanée sur chaque paire.' },
      { q: 'La MAC de destination fait…', opts: ['4 octets', '6 octets', '8 octets'], correct: 1, exp: 'Comme la MAC source : 6 octets.' },
      { q: 'Le champ données de la trame 802.3 fait…', opts: ['1 à 46 octets', '46 à 1500 octets', '1500 à 9000 octets'], correct: 1, exp: 'Minimum 46 (pad sinon), maximum 1500.' },
      { q: 'Le FCS sert à…', opts: ['identifier le protocole', 'détecter les erreurs de transmission', 'synchroniser'], correct: 1, exp: '4 octets, vérifiés par la carte réceptrice.' }
    ],

    pitfalls: [
      'Relier deux commutateurs par un câble droit : brochage croisé exigé.',
      'Oublier le pad quand les données sont sous 46 octets.',
      'Confondre SFD (1 octet) et préambule (7 octets).',
      'Imaginer du semi-duplex derrière des commutateurs modernes : c\'est le règne des hubs.'
    ],

    methodTitle: 'Méthode — dérouler une trame en trois gestes',
    method: [
      'Lire la MAC destination : 6 octets, c\'est le destinataire voulu.',
      'Suivre les relais : chaque commutateur reçoit et retransmet vers l\'interface suivante.',
      'Vérifier au bout : le destinataire reconnaît sa MAC et traite la trame (FCS juste).'
    ],

    summary: [
      'Ethernet = IEEE 802.3, de 10 Mbit/s à 400 Gbit/s ; sans-fil = 802.11.',
      'Câble droit entre différents, croisé entre similaires ; gigabit sur 4 paires.',
      'Trame : préambule 7, SFD 1, MAC 6+6, type 2, données 46-1500, FCS 4.',
      'Duplex intégral : émission et réception simultanées sur chaque liaison.'
    ],

    checklist: [
      'Je sais décrire SOHO et entreprise.',
      'Je sais choisir droit ou croisé pour cinq liaisons.',
      'Je sais citer les champs de la trame avec leurs tailles.',
      'Je sais dérouler le chemin PC1 → SW1 → SW2 → PC2.'
    ],

    notions: [
      '<strong>IEEE 802.3</strong> : la famille de normes Ethernet filaire.',
      '<strong>SOHO</strong> : Small Office Home Office — petit LAN, souvent un seul appareil.',
      '<strong>Câble droit</strong> : broche à broche, entre appareils différents.',
      '<strong>Câble croisé</strong> : paires croisées, entre appareils similaires.',
      '<strong>RJ-45</strong> : connecteur à 8 positions (broches).',
      '<strong>Trame 802.3</strong> : préambule, SFD, MAC dest/src, type, données, FCS.',
      '<strong>FCS</strong> : 4 octets de détection d\'erreurs.',
      '<strong>Duplex intégral</strong> : émission et réception simultanées.'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — relis les brochages et le format de trame.' },
      { cls: 'mid', text: '50–69 % — refais les cas droit/croisé et les tailles de champs.' },
      { cls: 'good', text: '70–94 % — bon niveau, cible le chemin complet de la trame.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché.' }
    ],

    flashcards: [
      { q: 'Câble droit contre câble croisé ?', a: 'Droit : broche à broche, entre appareils DIFFÉRENTS (PC-switch). Croisé : paires 1-2/3-6 croisées, entre appareils SIMILAIRES (switch-switch).' },
      { q: 'Les champs de la trame 802.3 ?', a: 'Préambule 7, SFD 1, MAC destination 6, MAC source 6, type 2, données 46-1500, FCS 4.' },
      { q: '1000BASE-T ?', a: 'Quatre paires, émission et réception simultanées sur chaque paire (broches 4-5 et 7-8 ajoutées).' },
      { q: 'SOHO contre entreprise ?', a: 'SOHO : un commutateur (ou un routeur sans fil unique). Entreprise : un commutateur et un point d\'accès par étage.' },
      { q: 'Le chemin d\'une trame en duplex intégral ?', a: 'PC1 construit et envoie → SW1 relaie (G0/1) → SW2 livre (F0/2) → PC2 reconnaît sa MAC et traite.' }
    ]
  }
];
