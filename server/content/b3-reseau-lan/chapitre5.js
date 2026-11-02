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
  situation: 'La couche d’accès d’un réseau local d’entreprise est exposée aux menaces internes et aux compromissions physiques. Tout collaborateur, prestataire ou intrus branchant une machine sur une prise murale RJ-45 ou une borne Wi-Fi peut tenter de saturer la table CAM du commutateur (MAC Flooding) pour provoquer la diffusion de certaines trames unicast vers des destinations inconnues et les intercepter dans leur VLAN, déployer un serveur DHCP pirate (Rogue DHCP) pour détourner la passerelle par défaut des utilisateurs, ou émettre des réponses ARP falsifiées (ARP Poisoning) pour réaliser une attaque d’homme du milieu (Man-In-The-Middle - MITM). L’ingénieur réseau et cybersécurité de niveau Bachelor 3 doit maîtriser les outils de durcissement de niveau 2 : configurer Port Security avec apprentissage dynamique Sticky MAC, activer DHCP Snooping avec ségrégation des ports de confiance, et associer l’inspection dynamique ARP (DAI) à IP Source Guard pour réduire les risques d’usurpation selon le contexte et la configuration.',
  objectives: [
    'comprendre les vecteurs d’attaques majeures de niveau 2 (MAC Flooding, Rogue DHCP, ARP Spoofing) ;',
    'configurer et auditer la fonctionnalité Port Security et ses modes de violation (protect, restrict, shutdown) ;',
    'déployer le mécanisme Sticky MAC pour l’apprentissage persistant des adresses d’accès autorisées ;',
    'mettre en œuvre DHCP Snooping avec distinction rigoureuse des ports trusted et untrusted ;',
    'analyser la base de données DHCP Snooping Binding Table et son exploitation par Dynamic ARP Inspection (DAI) ;',
    'analyser et résoudre méthodologiquement des simulateurs de violation de sécurité, des inspecteurs DHCP Snooping et des filtres DAI.'
  ],
  sections: [
    {
      title: 'Attaques Fondamentales de Niveau 2 : Saturation CAM & Serveurs DHCP Pirates',
      html: [
        '<p>Historiquement conçu sans préoccupation de sécurité cryptographique, le standard Ethernet considère que tout port physique connecté est légitime. Les attaquants exploitent cette confiance aveugle par deux techniques offensives classiques :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. Saturation de Table CAM (MAC Address Flooding)</h4>',
        '    <p>La table de commutation (Content Addressable Memory - CAM) possède une capacité finie, qui dépend du matériel. Un outil offensif (ex: <code>macof</code>) peut injecter de nombreuses trames Ethernet avec des adresses MAC sources forgées :</p>',
        '    <ul>',
        '      <li>La table CAM peut atteindre sa capacité ; le délai dépend du trafic, du matériel et des protections activées.</li>',
        '      <li>Si le commutateur ne peut plus apprendre de nouvelles adresses sources, les destinations correspondantes restent inconnues ; des destinations déjà apprises peuvent aussi le devenir lorsque leur entrée expire sans être réapprise.</li>',
        '      <li>Selon le matériel et sa configuration, les trames unicast vers ces destinations peuvent être diffusées sur les ports autorisés du même VLAN, sauf le port d’entrée. Les destinations encore connues restent généralement commutées vers leur port.</li>',
        '      <li>Port Security, correctement configuré, peut limiter le nombre d’adresses MAC autorisées par port et bloquer des trames provenant d’adresses non autorisées ou désactiver le port en violation. D’autres contrôles peuvent limiter la diffusion.</li>',
        '      <li>Si son port est autorisé dans le VLAN et reçoit ces copies, l’attaquant peut capturer certaines trames ; cela ne garantit ni l’accès à tous les flux ni leur lecture en clair. Un chiffrement correctement configuré, par exemple TLS, protège le contenu applicatif d’une simple capture ; certaines métadonnées restent visibles.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Serveur DHCP Pirate (Rogue DHCP Server)</h4>',
        '    <p>Lorsqu’un poste client démarre, il émet une diffusion <code>DHCPDISCOVER</code>. Un attaquant déployant un serveur DHCP pirate répond plus rapidement que le serveur officiel (<code>DHCPOFFER</code>) :</p>',
        '    <ul>',
        '      <li>Il fournit une adresse IP valide au client.</li>',
        '      <li>Il positionne sa propre machine comme <strong>passerelle par défaut</strong> et <strong>serveur DNS</strong>.</li>',
        '      <li>Le trafic passant par cette passerelle peut être intercepté ou modifié. Un chiffrement correctement authentifié, tel que TLS, protège le contenu applicatif sans masquer nécessairement toutes les métadonnées.</li>',
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
        '      <li><strong>Sticky MAC :</strong> Apprise dynamiquement et inscrite dans la configuration courante (<code>running-config</code>). Pour la conserver après redémarrage, sauvegarder cette configuration dans la <code>startup-config</code>, selon la plateforme.</li>',
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
          '<p>Lorsqu’un port passe en état <code>err-disable</code> suite à une violation en mode shutdown, diagnostiquer et corriger la cause avant réactivation. Selon la plateforme et sa configuration, l’administrateur peut intervenir manuellement (<code>shutdown</code> puis <code>no shutdown</code>) ou configurer la récupération temporisée, par exemple <code>errdisable recovery cause psecure-violation</code> avec un intervalle adapté.</p>'
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
        '    <p>Ces fonctions peuvent utiliser les liaisons DHCP Snooping et, selon leur configuration, des règles statiques :</p>',
        '    <ul>',
        '      <li><strong>Dynamic ARP Inspection (DAI) :</strong> Sur les ports non approuvés, vérifie les messages ARP à partir des liaisons DHCP Snooping ou d’une ACL ARP configurée pour les adresses statiques. Les messages refusés sont éliminés ; cette vérification réduit certains risques d’usurpation sans les supprimer tous.</li>',
        '      <li><strong>IP Source Guard (IPSG) :</strong> Sur une interface où il est activé, filtre les paquets selon les liaisons DHCP ou les liaisons statiques configurées. Une adresse source non autorisée peut être bloquée ; une adresse statique explicitement autorisée reste possible.</li>',
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
    'Le MAC Flooding tente de saturer la table CAM ; des trames unicast vers des destinations devenues inconnues peuvent être diffusées dans leur VLAN si les protections le permettent. Leur contenu n’est pas forcément lisible lorsqu’il est chiffré.',
    'Port Security limite le nombre d’adresses MAC par port ; le mode shutdown désactive le port en état err-disable en cas d’infraction.',
    'Le mécanisme Sticky MAC enregistre automatiquement l’adresse apprise dans la configuration courante du commutateur.',
    'DHCP Snooping sépare les ports de confiance (trusted) des ports utilisateurs (untrusted) pour neutraliser les serveurs pirates.',
    'La base de données DHCP Snooping Binding associe l’adresse MAC, l’IP attribuée, le VLAN et le port physique du client.',
    'DAI inspecte les messages ARP entrants sur les ports untrusted et peut utiliser les liaisons DHCP ou une ACL ARP applicable pour les valider.'
  ],
  checklist: [
    'Je sais expliquer pourquoi le MAC Flooding peut diffuser certaines trames unicast, mais ne rend pas tout le trafic lisible.',
    'Je connais la différence entre les trois modes de violation de Port Security (protect, restrict, shutdown).',
    'Je sais expliquer le fonctionnement et l’intérêt du mot-clé sticky dans la commande port-security mac-address.',
    'Je maîtrise la configuration de DHCP Snooping et la déclaration indispensable des ports de confiance (trusted).',
    'Je comprends comment Dynamic ARP Inspection (DAI) utilise les liaisons DHCP et, pour des hôtes statiques, une ACL ARP adaptée.',
    'Je sais comment IP Source Guard filtre les adresses sources selon les liaisons DHCP ou statiques autorisées.'
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
    'Activer Dynamic ARP Inspection (DAI) sans prévoir les liaisons DHCP ou les ACL ARP nécessaires : des messages ARP légitimes peuvent être rejetés et perturber certains hôtes.',
    'Choisir le mode « protect » au lieu de « shutdown » dans un environnement critique, laissant l’attaquant persister sans aucune alerte générée.',
    'Ne pas limiter le taux de requêtes ARP (ip arp inspection limit rate) sur les ports utilisateurs, exposant le CPU du commutateur à un déni de service.'
  ],
  questions: [
    {
      stem: 'Quel est l’objectif d’une attaque par saturation de table CAM (MAC Flooding) menée contre un commutateur ?',
      opts: [
        'Détruire physiquement les composants électroniques du commutateur',
        'Remplir la table CAM pour tenter de provoquer la diffusion de certaines trames unicast vers des destinations inconnues et éventuellement les intercepter dans le même VLAN',
        'Empêcher le commutateur de se synchroniser sur le serveur NTP',
        'Forcer la négociation du port en mode 10 Mbps half-duplex'
      ],
      correct: 1,
      exp: 'La saturation peut empêcher l’apprentissage de nouvelles adresses ; de nouvelles destinations restent alors inconnues, comme celles dont les entrées expirent sans être réapprises. Selon le commutateur et ses protections, leurs trames unicast peuvent être diffusées sur les ports autorisés du même VLAN. Les destinations encore connues restent généralement acheminées vers leur port et un chiffrement adapté protège le contenu d’une simple capture.'
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
      stem: 'Comment la technologie Dynamic ARP Inspection (DAI) contribue-t-elle à réduire les risques d’usurpation ARP ?',
      opts: [
        'En convertissant toutes les requêtes ARP en paquets DNS',
        'En validant les messages ARP des ports untrusted selon les liaisons DHCP ou une ACL ARP applicable',
        'En forçant le redémarrage du poste attaquant',
        'En désactivant le protocole IP sur le réseau'
      ],
      correct: 1,
      exp: 'DAI vérifie les messages ARP reçus sur les ports untrusted selon les liaisons DHCP et les ACL ARP configurées. Les messages non autorisés sont rejetés, mais cela ne supprime pas tous les risques.'
    },
    {
      stem: 'Quelle technologie permet de filtrer l’adresse IP source d’un port selon les liaisons autorisées ?',
      opts: [
        'PortFast',
        'IP Source Guard (IPSG)',
        'Root Guard',
        'CDP'
      ],
      correct: 1,
      exp: 'IP Source Guard filtre les paquets selon les liaisons DHCP ou les liaisons statiques configurées sur le port ; une adresse statique explicitement autorisée peut donc être utilisée.'
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
      a: 'Une attaque qui tente de remplir la table CAM : faute d’apprentissage, de nouvelles destinations restent inconnues et d’autres peuvent le devenir si leur entrée expire sans être réapprise. Certaines trames unicast qui leur sont destinées peuvent être diffusées dans leur VLAN selon les protections ; cela ne rend pas automatiquement lisible le contenu chiffré.'
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
      a: 'En validant les messages ARP reçus sur les ports untrusted selon les liaisons DHCP ou une ACL ARP applicable ; cela réduit certains risques sans tous les supprimer.'
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
