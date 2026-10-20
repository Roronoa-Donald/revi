/**
 * Chapitre 5 du cours « Réseau LAN Avancé B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 5,
  title: 'Sécurité de la Couche d’Accès (Port Security, DHCP Snooping &amp; DAI)',
  short: 'Sécurité LAN &amp; Durcissement',
  toc: 'Vecteurs d’attaque de niveau 2 (MAC Flooding, Rogue DHCP, ARP Spoofing), Port Security et modes de violation (protect, restrict, shutdown), DHCP Snooping et base de liaisons, Dynamic ARP Inspection (DAI) et IP Source Guard.',
  time: '≈ 2 h 45 de travail',
  free: false,
  situation: 'La couche d’accès d’un réseau local d’entreprise est le périmètre le plus vulnérable aux menaces internes et aux compromissions physiques. Tout collaborateur, prestataire ou intrus branchant une machine sur une prise murale RJ-45 ou une borne Wi-Fi peut tenter de saturer la table CAM du commutateur (MAC Flooding) pour transformer le switch en concentrateur (hub) passif et intercepter le trafic, déployer un serveur DHCP pirate (Rogue DHCP) pour détourner la passerelle par défaut des utilisateurs, ou émettre des réponses ARP falsifiées (ARP Poisoning) pour réaliser une attaque d’homme du milieu (Man-In-The-Middle - MITM). L’ingénieur réseau et cybersécurité de niveau Bachelor 3 doit maîtriser l’arsenal complet de durcissement de niveau 2 : configurer Port Security avec apprentissage dynamique Sticky MAC, activer DHCP Snooping avec ségrégation stricte des ports de confiance, et corréler l’inspection dynamique ARP (DAI) avec IP Source Guard pour neutraliser toute tentative d’usurpation.',
  objectives: [
    'comprendre les vecteurs d’attaques majeures de niveau 2 (MAC Flooding, Rogue DHCP, ARP Spoofing) ;',
    'configurer et auditer la fonctionnalité Port Security et ses modes de violation (protect, restrict, shutdown) ;',
    'déployer le mécanisme Sticky MAC pour l’apprentissage persistant des adresses d’accès autorisées ;',
    'mettre en œuvre DHCP Snooping avec distinction rigoureuse des ports trusted et untrusted ;',
    'analyser la base de données DHCP Snooping Binding Table et son exploitation par Dynamic ARP Inspection (DAI) ;',
    'développer en Python 3 des simulateurs de violation de sécurité, des inspecteurs DHCP Snooping et des filtres DAI.'
  ],
  sections: [
    {
      title: 'Attaques Fondamentales de Niveau 2 : Saturation CAM & Serveurs DHCP Pirates',
      html: [
        '<p>Historiquement conçu sans préoccupation de sécurité cryptographique, le standard Ethernet considère que tout port physique connecté est légitime. Les attaquants exploitent cette confiance aveugle par deux techniques offensives classiques :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. Saturation de Table CAM (MAC Address Flooding)</h4>',
        '    <p>La table de commutation (Content Addressable Memory - CAM) possède une mémoire finie (typiquement 8 000 à 32 000 entrées). Un outil offensif (ex: <code>macof</code>) injecte des dizaines de milliers de trames Ethernet forgées avec des adresses MAC sources aléatoires par seconde :</p>',
        '    <ul>',
        '      <li>La table CAM sature en quelques fractions de seconde.</li>',
        '      <li>Incapable d’apprendre les adresses légitimes, le commutateur passe en <strong>mode fail-open (Unicast Flooding)</strong> : il diffuse chaque trame reçue sur tous ses ports comme un simple hub.</li>',
        '      <li>L’attaquant positionné sur son port capture l’intégralité des flux du VLAN en clair.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Serveur DHCP Pirate (Rogue DHCP Server)</h4>',
        '    <p>Lorsqu’un poste client démarre, il émet une diffusion <code>DHCPDISCOVER</code>. Un attaquant déployant un serveur DHCP pirate répond plus rapidement que le serveur officiel (<code>DHCPOFFER</code>) :</p>',
        '    <ul>',
        '      <li>Il fournit une adresse IP valide au client.</li>',
        '      <li>Il positionne sa propre machine comme <strong>passerelle par défaut</strong> et <strong>serveur DNS</strong>.</li>',
        '      <li>Tout le trafic sortant du poste client est intercepté, analysé et modifié avant d’être relayé.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Port Security : Contrôle d’Accès Matériel & Modes de Violation',
      html: [
        '<p>La fonctionnalité <strong>Port Security</strong> permet de restreindre le nombre d’adresses MAC autorisées à émettre sur une interface d’accès et d’associer des adresses MAC matérielles spécifiques :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Apprentissage et Types d\'Adresses MAC</h4>',
        '    <ul>',
        '      <li><strong>Statique :</strong> Configurée manuellement par l’administrateur (<code>switchport port-security mac-address &lt;mac&gt;</code>).</li>',
        '      <li><strong>Dynamique :</strong> Apprise au vol par le commutateur et oubliée au redémarrage.</li>',
        '      <li><strong>Sticky MAC :</strong> Apprise dynamiquement sur la première trame reçue et automatiquement inscrite dans la configuration courante (<code>running-config</code>) pour persister après redémarrage.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Les Trois Modes de Violation</h4>',
        '    <table class="table">',
        '      <thead><tr><th>Mode</th><th>Trafic Inconnu</th><th>Notification Syslog / SNMP</th><th>État du Port</th></tr></thead>',
        '      <tbody>',
        '        <tr><td><code>protect</code></td><td>Détruit (Drop)</td><td>Non (silencieux)</td><td>Reste Up</td></tr>',
        '        <tr><td><code>restrict</code></td><td>Détruit (Drop)</td><td>Oui (compteur incrémenté)</td><td>Reste Up</td></tr>',
        '        <tr><td><code>shutdown</code></td><td>Détruit (Drop)</td><td>Oui (alerte critique)</td><td><strong>err-disable (désactivé)</strong></td></tr>',
        '      </tbody>',
        '    </table>',
        '  </div>',
        '</div>',
        box('standard', 'Rétablissement d\'un Port en état err-disable', [
          '<p>Lorsqu’un port passe en état <code>err-disable</code> suite à une violation en mode shutdown, il ne se réactive pas automatiquement par défaut. L’administrateur doit intervenir manuellement (<code>shutdown</code> puis <code>no shutdown</code>), ou activer le redémarrage temporisé automatique : <code>errdisable recovery cause psecure-violation</code> avec un intervalle configuré (ex: 300 secondes).</p>'
        ])
      ].join('\n')
    },
    {
      title: 'DHCP Snooping & Dynamic ARP Inspection (DAI)',
      html: [
        '<p>Pour contrer les attaques de type Rogue DHCP et Man-In-The-Middle par usurpation ARP (ARP Poisoning), les commutateurs combinent deux technologies complémentaires de filtrage dynamique :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. DHCP Snooping</h4>',
        '    <p>Agit comme un pare-feu applicatif de niveau 2 pour les messages DHCP :</p>',
        '    <ul>',
        '      <li><strong>Ports de Confiance (Trusted) :</strong> Reliés aux serveurs DHCP légitimes et liaisons montantes (uplinks). Les messages serveurs (DHCPOFFER, DHCPACK) y sont autorisés.</li>',
        '      <li><strong>Ports Non Approuvés (Untrusted) :</strong> Reliés aux utilisateurs. Tout message serveur émis depuis ces ports est <strong>immédiatement bloqué</strong>.</li>',
        '      <li><strong>DHCP Snooping Binding Table :</strong> Construit une table dynamique liant : <em>Adresse MAC</em>, <em>Adresse IP attribuée</em>, <em>Durée du bail</em>, <em>VLAN</em> et <em>Port physique</em>.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Dynamic ARP Inspection (DAI) &amp; IP Source Guard</h4>',
        '    <p>Exploite directement la base construite par le DHCP Snooping :</p>',
        '    <ul>',
        '      <li><strong>Dynamic ARP Inspection (DAI) :</strong> Intercepte toutes les requêtes et réponses ARP sur les ports untrusted. Si le couple IP/MAC ne figure pas dans la table DHCP Snooping, la trame ARP est détruite, neutralisant totalement l’usurpation de passerelle.</li>',
        '      <li><strong>IP Source Guard (IPSG) :</strong> Filtre tous les paquets IP au niveau matériel : si un utilisateur change manuellement son adresse IP sans passer par le DHCP légitime, le commutateur bloque immédiatement ses paquets.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],
  method: [
    'Étape 1 : Activer Port Security sur l’ensemble des ports d’accès utilisateurs en fixant la limite maximale à 1 ou 2 adresses MAC.',
    'Étape 2 : Configurer le mode de violation shutdown et activer l’apprentissage sticky pour pérenniser les affectations physiques.',
    'Étape 3 : Activer globalement la surveillance DHCP Snooping sur le commutateur et pour les VLANs utilisateurs concernés.',
    'Étape 4 : Déclarer explicitement les liaisons montantes (Trunks vers le cœur de réseau) et ports de serveurs en mode trusted (ip dhcp snooping trust).',
    'Étape 5 : Activer l’inspection dynamique ARP (ip arp inspection vlan &lt;id&gt;) sur les VLANs protégés par DHCP Snooping.',
    'Étape 6 : Activer IP Source Guard sur les ports d’accès pour interdire l’usurpation d’adresses IP statiques non autorisées.'
  ],
  summary: [
    'Le MAC Flooding vise à saturer la mémoire CAM du commutateur pour forcer la diffusion de toutes les trames en clair (hub).',
    'Port Security limite le nombre d’adresses MAC par port ; le mode shutdown désactive le port en état err-disable en cas d’infraction.',
    'Le mécanisme Sticky MAC enregistre automatiquement l’adresse apprise dans la configuration courante du commutateur.',
    'DHCP Snooping sépare les ports de confiance (trusted) des ports utilisateurs (untrusted) pour neutraliser les serveurs pirates.',
    'La base de données DHCP Snooping Binding associe l’adresse MAC, l’IP attribuée, le VLAN et le port physique du client.',
    'DAI inspecte les paquets ARP entrants sur les ports untrusted et bloque les réponses non validées par la base DHCP Snooping.'
  ],
  checklist: [
    'Je comprends comment une attaque par MAC Flooding transforme un commutateur en concentrateur.',
    'Je connais la différence entre les trois modes de violation de Port Security (protect, restrict, shutdown).',
    'Je sais expliquer le fonctionnement et l’intérêt du mot-clé sticky dans la commande port-security mac-address.',
    'Je maîtrise la configuration de DHCP Snooping et la déclaration indispensable des ports de confiance (trusted).',
    'Je comprends pourquoi Dynamic ARP Inspection (DAI) dépend directement de la base DHCP Snooping Binding Table.',
    'Je sais comment IP Source Guard bloque les tentatives de configuration d’IP statique illégitime sur un port utilisateur.'
  ],
  notions: [
    'Attaque MAC Address Flooding & Table CAM',
    'Serveur DHCP Pirate (Rogue DHCP)',
    'Port Security & Maximum MACs',
    'Modes de Violation (protect, restrict, shutdown)',
    'Apprentissage Sticky MAC',
    'DHCP Snooping (Ports Trusted vs Untrusted)',
    'DHCP Snooping Binding Database',
    'Dynamic ARP Inspection (DAI) & IP Source Guard'
  ],
  pitfalls: [
    'Oublier de configurer « ip dhcp snooping trust » sur la liaison montante vers le serveur DHCP, bloquant l’attribution de baux pour tous les clients du switch.',
    'Activer Dynamic ARP Inspection (DAI) sur un VLAN sans avoir préalablement peuplé la base DHCP Snooping (ou sans ACL ARP statique pour les serveurs en IP fixe), bloquant l’ensemble du trafic légitime.',
    'Choisir le mode « protect » au lieu de « shutdown » dans un environnement critique, laissant l’attaquant persister sans aucune alerte générée.',
    'Ne pas limiter le taux de requêtes ARP (ip arp inspection limit rate) sur les ports utilisateurs, exposant le CPU du commutateur à un déni de service.'
  ],
  questions: [
    {
      stem: 'Quel est l’objectif d’une attaque par saturation de table CAM (MAC Flooding) menée contre un commutateur ?',
      opts: [
        'Détruire physiquement les composants électroniques du commutateur',
        'Remplir la mémoire du switch pour forcer le basculement en diffusion générale (Unicast Flooding) et intercepter les trames des autres utilisateurs',
        'Empêcher le commutateur de se synchroniser sur le serveur NTP',
        'Forcer la négociation du port en mode 10 Mbps half-duplex'
      ],
      correct: 1,
      exp: 'En saturant la table CAM, le switch ne peut plus associer les MACs aux ports et diffuse chaque trame sur tous les ports du VLAN comme un hub.'
    },
    {
      stem: 'Quel mode de violation de Port Security désactive immédiatement le port physique et le place en état « err-disable » ?',
      opts: [
        'mode protect',
        'mode restrict',
        'mode shutdown',
        'mode bypass'
      ],
      correct: 2,
      exp: 'Le mode shutdown coupe administrativement le port (err-disable), incrémente le compteur de violation et émet une alerte syslog/SNMP.'
    },
    {
      stem: 'Quel est le rôle de l’option « sticky » dans la commande « switchport port-security mac-address sticky » ?',
      opts: [
        'Elle colle physiquement le connecteur RJ45 dans la prise',
        'Elle apprend dynamiquement la première adresse MAC reçue et l’enregistre dans la configuration courante running-config',
        'Elle réinitialise l’adresse MAC toutes les heures',
        'Elle chiffre les trames émises par cette adresse MAC'
      ],
      correct: 1,
      exp: 'L’apprentissage sticky convertit dynamiquement la première adresse MAC active apprise en entrée statique inscrite dans la configuration courante.'
    },
    {
      stem: 'Dans une architecture protégée par DHCP Snooping, sur quel type de port les réponses DHCPOFFER d’un serveur DHCP légitime doivent-elles transiter ?',
      opts: [
        'Un port Untrusted',
        'Un port Trusted (de confiance)',
        'Un port configuré en mode monitor',
        'Un port bloqué par le Spanning Tree'
      ],
      correct: 1,
      exp: 'Seuls les ports marqués comme Trusted sont autorisés à recevoir et relayer des messages DHCP émis par un serveur (DHCPOFFER, DHCPACK).'
    },
    {
      stem: 'Quelles informations sont consignées dans la base de données dynamique DHCP Snooping Binding Table ?',
      opts: [
        'Les mots de passe administrateurs des commutateurs',
        'L’adresse MAC du client, son adresse IP attribuée, le bail, le VLAN et le port physique d’attachement',
        'L’historique des sites web visités par l’utilisateur',
        'Les tables de routage OSPF complètes'
      ],
      correct: 1,
      exp: 'La table de liaison associe pour chaque poste : adresse MAC, adresse IP reçue par DHCP, durée du bail, VLAN d’appartenance et numéro de port physique.'
    },
    {
      stem: 'Comment la technologie Dynamic ARP Inspection (DAI) neutralise-t-elle les attaques d’usurpation de passerelle (ARP Poisoning) ?',
      opts: [
        'En convertissant toutes les requêtes ARP en paquets DNS',
        'En validant chaque paquet ARP reçu sur un port untrusted par comparaison stricte avec la base DHCP Snooping Binding',
        'En forçant le redémarrage du poste attaquant',
        'En désactivant le protocole IP sur le réseau'
      ],
      correct: 1,
      exp: 'DAI intercepte chaque trame ARP sur les ports untrusted : si l’adresse IP ou l’adresse MAC ne correspond pas à l’entrée validée dans la base DHCP Snooping, la trame est détruite.'
    },
    {
      stem: 'Quelle technologie de niveau 2 empêche un utilisateur d’utiliser une adresse IP statique configurée manuellement non attribuée par le DHCP ?',
      opts: [
        'PortFast',
        'IP Source Guard (IPSG)',
        'Root Guard',
        'CDP'
      ],
      correct: 1,
      exp: 'IP Source Guard applique un filtre matériel strict au niveau du port : seuls les paquets dont l’adresse IP source figure dans la table DHCP Snooping sont autorisés.'
    },
    {
      stem: 'Que se passe-t-il par défaut sous Cisco IOS lorsqu’un commutateur reçoit un paquet DHCP sur un port untrusted contenant l’option 82 alors qu’il n’est pas configuré comme relais de confiance ?',
      opts: [
        'Le paquet est relayé sans modification',
        'Le paquet est détruit (droppé) par mesure de sécurité',
        'Le serveur DHCP est éteint',
        'Le commutateur reboote'
      ],
      correct: 1,
      exp: 'Par défaut, un commutateur avec DHCP Snooping actif rejette les paquets DHCP contenant l’option 82 (relay agent information) arrivant sur un port untrusted.'
    }
  ],
  flashcards: [
    {
      q: 'Qu’est-ce que le MAC Address Flooding ?',
      a: 'Une attaque saturant la table CAM du switch pour le forcer à diffuser tout le trafic sur tous ses ports comme un hub.'
    },
    {
      q: 'Quels sont les trois modes de violation sous Port Security ?',
      a: 'protect (bloque sans log), restrict (bloque et log), shutdown (désactive le port en état err-disable).'
    },
    {
      q: 'Que fait l’instruction « sticky » sur un port sécurisé ?',
      a: 'Elle apprend l’adresse MAC active et l’inscrit automatiquement dans la configuration running-config.'
    },
    {
      q: 'Quel est le rôle de DHCP Snooping ?',
      a: 'Filtrer les messages DHCP pour bloquer les serveurs pirates et construire la base des baux valides (Binding Table).'
    },
    {
      q: 'Comment Dynamic ARP Inspection (DAI) protège-t-il contre l’ARP Poisoning ?',
      a: 'En vérifiant que l’association IP/MAC de chaque trame ARP correspond bien à la table DHCP Snooping Binding.'
    },
    {
      q: 'Quelle est la fonction d’IP Source Guard (IPSG) ?',
      a: 'Empêcher un utilisateur de s’attribuer manuellement une adresse IP fixe non attribuée par le serveur DHCP.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Difficultés à identifier les modes de violation de Port Security ou confusion entre DHCP Snooping et DAI.'
    },
    {
      cls: 'medium',
      text: 'Bonne compréhension des mécanismes de durcissement de niveau 2, configuration de Port Security et ports de confiance DHCP.'
    },
    {
      cls: 'high',
      text: 'Maîtrise complète de la chaîne de sécurité intégrée (Port Security Sticky, DHCP Snooping, DAI, IP Source Guard) et remédiation automatisée des err-disable.'
    }
  ]
};
