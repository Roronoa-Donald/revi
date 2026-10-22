/**
 * Chapitre 6 du cours « pfSense & Routage B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 6,
  title: 'Haute Disponibilité (CARP/pfsync) &amp; Détection d’Intrusion (Snort/Suricata)',
  short: 'Haute Disponibilité &amp; IDS/IPS',
  toc: 'Cluster actif/passif CARP (VIP, advbase, advskew), synchronisation d’états pfsync, XMLRPC, détection d’intrusion Snort/Suricata et blocage dynamique snort2c.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B3 et plus',
  situation: 'Dans les environnements critiques (hôpitaux, banques, industries, datacenters), la défaillance matérielle d’un pare-feu unique paralyse instantanément l’ensemble de l’activité économique de l’entreprise. Pour garantir un temps de disponibilité de 99,999 % (cinq 9), pfSense met en œuvre un cluster de haute disponibilité (HA) actif/passif s’appuyant sur le protocole CARP (Common Address Redundancy Protocol) et la synchronisation en temps réel de la table d’états par pfsync. Parallèlement, pour faire face aux menaces avancées et aux attaques par déni de service, le pare-feu s’arme de modules IDS/IPS (Snort ou Suricata) capables d’analyser les signatures de paquets en temps réel et de bloquer automatiquement les attaquants via l’injection dynamique dans les tables du noyau.',
  objectives: [
    'comprendre l’architecture de haute disponibilité (HA) et les exigences matérielles d’un cluster pfSense redondant ;',
    'analyser le protocole CARP, le rôle des adresses IP virtuelles (VIPs) et l’élection du Master via advbase et advskew ;',
    'configurer la synchronisation temps réel de la table d’états avec pfsync sur un lien dédié de heartbeat ;',
    'déployer la synchronisation de configuration XMLRPC (config.xml) entre le nœud primaire et secondaire ;',
    'installer et administrer les packages de détection et prévention d’intrusion (Snort ou Suricata) ;',
    'analyser et résoudre méthodologiquement des simulateurs d’élection CARP, des parseurs d’alertes IDS/IPS et des auditeurs de synchronisation pfsync/XMLRPC.'
  ],
  sections: [
    {
      title: 'Architecture de Clustering Actif/Passif : Protocole CARP &amp; Élection du Maître',
      html: [
        '<p>Le protocole <strong>CARP (Common Address Redundancy Protocol)</strong> est une alternative libre et ouverte à VRRP et HSRP, conçue par l’équipe OpenBSD pour éliminer les brevets restrictifs :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. Principes de Fonctionnement de CARP</h4>',
        '    <ul>',
        '      <li><strong>Adresse IP Virtuelle (VIP CARP) :</strong> Une adresse IP unique et partagée portée par l’interface réseau (ex: <code>192.168.1.254</code>). Les postes clients utilisent cette VIP comme passerelle par défaut.</li>',
        '      <li><strong>VHID (Virtual Host ID) :</strong> Identifiant numérique de groupe (de 1 à 255) associé à une adresse MAC virtuelle standardisée : <code>00:00:5e:00:01:&lt;VHID_HEX&gt;</code>.</li>',
        '      <li><strong>Annonces CARP :</strong> Diffusées en multicast (adresse IP <code>224.0.0.18</code>, protocole IP 112) pour signaler l’état de santé des nœuds.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Algorithme d’Élection et Formule advskew</h4>',
        '    <p>L’intervalle d’émission des annonces de chaque nœud est défini par :</p>',
        '    <pre><code>Intervalle = advbase + (advskew / 256.0)</code></pre>',
        '    <ul>',
        '      <li><code>advbase</code> : base temporelle en secondes (valeur par défaut : <code>1</code>).</li>',
        '      <li><code>advskew</code> : valeur de décalage comprise entre <code>0</code> et <code>254</code>.</li>',
        '      <li><strong>Règle d’élection :</strong> Le nœud diffusant au rythme le plus rapide (plus petit <code>advskew</code>, typiquement <code>0</code> sur le Primaire et <code>100</code> sur le Secondaire) devient le <strong>MASTER</strong>.</li>',
        '      <li>Si le Master disparaît pendant 3 intervalles consécutifs, le Backup prend le relais instantanément et émet un Gratuitous ARP (GARP).</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Continuité de Service Sans Coupure : pfsync &amp; Réplication XMLRPC',
      html: [
        '<p>Un simple basculement d’adresse IP (CARP) ne suffit pas : dans un pare-feu à état standard, toutes les connexions TCP actives (téléchargements, sessions SSH, flux VoIP) seraient réinitialisées (RST) après le failover car le pare-feu de secours n’en aurait pas connaissance. pfSense résout ce défi grâce à deux modules couplés :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. pfsync : Réplication d’États en Temps Réel</h4>',
        '    <p>Le protocole <strong>pfsync</strong> (protocole IP 240) transmet immédiatement toute création, modification ou clôture d’état de connexion du pare-feu Primaire vers le Secondaire :</p>',
        '    <ul>',
        '      <li><strong>Lien Dédié (Sync Interface) :</strong> Pour des raisons de performance et de sécurité, pfsync doit impérativement transiter sur un câble réseau physique direct ou un VLAN isolé non routable.</li>',
        '      <li><strong>Bénéfice :</strong> Au moment exact où le Secondaire devient MASTER, sa table d’états locale est déjà parfaitement identique à celle du Primaire. Le basculement est 100 % transparent et indolore pour les utilisateurs finaux (aucune coupure de session).</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. XMLRPC Sync : Clonage Automatisé de Configuration</h4>',
        '    <p>Pour éviter la fastidieuse double saisie des règles :</p>',
        '    <ul>',
        '      <li>Toute modification opérée sur le pare-feu Primaire (création d’une règle, d’un alias, d’un tunnel VPN) est transmise au Secondaire par un appel chiffré <strong>XMLRPC</strong> (port 443 sur l’interface Sync).</li>',
        '      <li>Le Secondaire recharge immédiatement son fichier de règles sans intervention humaine.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Détection &amp; Prévention d’Intrusion Réseau : Snort, Suricata &amp; Table snort2c',
      html: [
        '<p>Pour compléter le filtrage réseau de couche 3/4 par une inspection en profondeur des paquets applicatifs (DPI - Deep Packet Inspection de couche 7), pfSense propose l’intégration des moteurs <strong>Snort</strong> ou <strong>Suricata</strong> :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. Moteurs IDS vs IPS</h4>',
        '    <ul>',
        '      <li><strong>Mode IDS (Intrusion Detection System) :</strong> La sonde inspecte les flux en copie miroir et se contente de consigner les alertes dans les journaux système sans bloquer le trafic.</li>',
        '      <li><strong>Mode IPS (Intrusion Prevention System) :</strong> Lorsque l’option <em>Block offenders</em> est activée, toute violation de signature critique (Priorité 1) provoque le blocage immédiat et temporaire de l’adresse IP de l’attaquant.</li>',
        '      <li><strong>Flux de règles :</strong> Téléchargement automatisé des jeux de règles Snort VRT, Emerging Threats (ET Open/Pro) et Snort Community.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. La Table pf snort2c &amp; Pass Lists</h4>',
        '    <p>Lors d’un blocage automatique, le démon IDS injecte directement l’adresse IP incriminée dans une table noyau pf spéciale nommée <code>snort2c</code> (consultable via <code>pfctl -t snort2c -T show</code>).</p>',
        '    <p><strong>Configuration vitale de la Pass List (Liste Blanche) :</strong> Pour empêcher un déni de service causé par une usurpation d’adresse IP (IP Spoofing), la passerelle par défaut, les serveurs DNS internes et les postes d’administration doivent impérativement être ajoutés à la liste blanche pour ne jamais être insérés dans <code>snort2c</code>.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],
  method: [
    'Étape 1 : Réserver un lien physique dédié et non routable pour l’interface de synchronisation (Sync Interface) entre les nœuds.',
    'Étape 2 : Configurer les adresses IP Virtuelles (VIPs) de type CARP sur chaque interface (WAN, LAN, DMZ) avec un VHID unique.',
    'Étape 3 : Ajuster les paramètres advbase=1 et advskew (0 sur le Primaire, 100 sur le Secondaire) pour valider l’élection.',
    'Étape 4 : Activer pfsync sur l’interface Sync pour répliquer la table d’états en continu (IP 240).',
    'Étape 5 : Activer la synchronisation de configuration XMLRPC sur le Primaire pour répliquer automatiquement config.xml.',
    'Étape 6 : Installer Snort ou Suricata, configurer les flux de règles et renseigner rigoureusement la Pass List avant d’activer le blocage.'
  ],
  summary: [
    'Le protocole CARP partage une IP virtuelle (VIP) et une adresse MAC virtuelle standardisée entre deux nœuds.',
    'L’élection CARP repose sur le décalage advskew : le plus petit intervalle (advskew 0) définit le MASTER actif.',
    'pfsync réplique instantanément toutes les sessions de la table d’états pour garantir un basculement sans coupure.',
    'XMLRPC Sync propage automatiquement toute modification de configuration du pare-feu Primaire vers le Secondaire.',
    'Snort/Suricata inspectent les flux en DPI et injectent dynamiquement les IP malveillantes dans la table noyau snort2c.',
    'La Pass List est une sécurité vitale protégeant les passerelles et infrastructures clés contre les faux positifs.'
  ],
  checklist: [
    'Je comprends le rôle des paramètres advbase et advskew dans l’élection du Master CARP.',
    'Je sais expliquer pourquoi pfsync élimine les coupures de téléchargement lors d’un basculement de pare-feu.',
    'Je sais configurer la réplication de configuration XMLRPC.',
    'Je connais la différence de posture entre un mode IDS (alerte seule) et IPS (blocage actif).',
    'Je sais afficher le contenu de la table de blocage avec pfctl -t snort2c -T show.',
    'Je comprends le danger d’un déni de service auto-infligé en l’absence de Pass List Snort.'
  ],
  notions: [
    'Clustering Actif / Passif Haute Disponibilité',
    'Protocole CARP & Adresses IP Virtuelles (VIP)',
    'Identifiant VHID & MAC Virtuelle',
    'Paramètres advbase & advskew',
    'Protocole de Synchronisation d’États pfsync',
    'Clonage de Configuration XMLRPC',
    'Moteurs IDS / IPS Snort & Suricata',
    'Table pf snort2c & Pass List (Liste Blanche)'
  ],
  pitfalls: [
    'Faire transiter le trafic pfsync sur le réseau LAN utilisateur sans chiffrement ni isolation physique.',
    'Attribuer le même VHID à deux interfaces différentes sur le même domaine de diffusion.',
    'Activer le blocage automatique dans Snort sans avoir configuré au préalable la Pass List.',
    'Oublier d’aligner les interfaces réseau physiques ou virtIO entre les deux machines du cluster.'
  ],
  questions: [
    {
      stem: 'Quel protocole réseau ouvert est utilisé par pfSense pour partager une adresse IP virtuelle (VIP) en haute disponibilité ?',
      opts: [
        'HSRP (Hot Standby Router Protocol)',
        'CARP (Common Address Redundancy Protocol)',
        'VRRP propriétaire',
        'OSPF'
      ],
      correct: 1,
      exp: 'CARP est le standard libre développé sous BSD pour assurer la redondance d’adresses IP entre pare-feux sans brevets propriétaires.'
    },
    {
      stem: 'Dans la formule d’annonce CARP (advbase + advskew / 256), quel nœud est élu MASTER du cluster ?',
      opts: [
        'Le nœud ayant le plus grand advskew',
        'Le nœud ayant le plus petit advskew (annonce la plus rapide)',
        'Le nœud ayant la plus grande quantité de mémoire vive',
        'Le nœud désigné aléatoirement par le commutateur'
      ],
      correct: 1,
      exp: 'Le nœud émettant au rythme le plus rapide (plus petite valeur d’advskew, typiquement 0) s’impose comme Master auprès des autres.'
    },
    {
      stem: 'Quel protocole BSD est responsable de répliquer les sessions de la table d’états entre pare-feux en temps réel ?',
      opts: [
        'pfsync',
        'rsync',
        'syslog',
        'CARP'
      ],
      correct: 0,
      exp: 'pfsync synchronise les entrées de la State Table du noyau entre les deux pare-feux pour garantir un basculement sans rupture de session.'
    },
    {
      stem: 'Comment la synchronisation des règles et de la configuration s’opère-t-elle entre le nœud primaire et secondaire ?',
      opts: [
        'Par transfert FTP non chiffré',
        'Via des appels chiffrés XMLRPC sur l’interface dédiée',
        'Par copier-coller manuel obligatoire',
        'Via une base de données MySQL partagée'
      ],
      correct: 1,
      exp: 'XMLRPC Sync synchronise le fichier config.xml du pare-feu primaire vers le pare-feu secondaire lors de toute modification.'
    },
    {
      stem: 'Dans quelle table de filtrage du noyau pf les adresses IP bloquées par Snort ou Suricata sont-elles insérées dynamiquement ?',
      opts: [
        'blocked_ips',
        'snort2c',
        'bogons',
        'drop_table'
      ],
      correct: 1,
      exp: 'La table système pf snort2c stocke dynamiquement les adresses IP d’attaquants identifiées par l’IDS/IPS pour appliquer un DROP immédiat.'
    },
    {
      stem: 'Pourquoi est-il indispensable de configurer une Pass List (liste blanche) sur le module IDS/IPS Snort ?',
      opts: [
        'Pour accélérer la connexion Internet',
        'Pour empêcher le blocage accidentel des passerelles et serveurs DNS internes en cas d’usurpation d’adresse IP',
        'Pour contourner les limites de licence Snort',
        'Pour autoriser le téléchargement de vidéos'
      ],
      correct: 1,
      exp: 'Sans Pass List, un pirate pourrait forger des paquets malveillants avec l’adresse IP du routeur ou du DNS interne pour forcer pfSense à bloquer ses propres infrastructures clés.'
    },
    {
      stem: 'Quel protocole de transport réseau et quelle adresse multicast sont utilisés par les annonces CARP ?',
      opts: [
        'TCP sur port 443',
        'Protocole IP 112 sur l’adresse multicast 224.0.0.18',
        'UDP port 53',
        'ICMP Echo Request'
      ],
      correct: 1,
      exp: 'CARP utilise le protocole IP numéro 112 et diffuse ses annonces sur l’adresse multicast IPv4 réservée 224.0.0.18.'
    },
    {
      stem: 'Quelle commande CLI permet de vérifier le contenu de la table de blocage snort2c sous pfSense ?',
      opts: [
        'pfctl -s rules',
        'pfctl -t snort2c -T show',
        'cat /var/log/snort.log',
        'ifconfig carp0'
      ],
      correct: 1,
      exp: 'La commande pfctl -t snort2c -T show affiche la liste des adresses IP actuellement verrouillées dans la table noyau snort2c.'
    }
  ],
  flashcards: [
    {
      q: 'Qu’est-ce que le protocole CARP ?',
      a: 'Un protocole de redondance sous BSD permettant à plusieurs pare-feux de partager une adresse IP virtuelle (VIP) unique.'
    },
    {
      q: 'Quelle est la valeur d’advskew typique sur le pare-feu Master et sur le Backup ?',
      a: 'advskew = 0 sur le Master (priorité maximale) et advskew = 100 sur le Backup.'
    },
    {
      q: 'Quel est le rôle de pfsync dans un cluster pfSense ?',
      a: 'Répliquer en continu les états de connexion TCP/UDP entre les deux pare-feux pour éviter toute déconnexion lors du failover.'
    },
    {
      q: 'Qu’est-ce que XMLRPC Sync dans pfSense ?',
      a: 'Le mécanisme répliquant automatiquement la configuration (règles, alias, VPN) du Primaire vers le Secondaire.'
    },
    {
      q: 'Où sont stockées les IP bloquées par l’IPS Snort ?',
      a: 'Dans la table noyau pf nommée snort2c.'
    },
    {
      q: 'Pourquoi une interface réseau dédiée est-elle requise pour pfsync ?',
      a: 'Pour garantir des performances optimales sans saturer les autres liens et sécuriser la transmission non chiffrée des états.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Difficultés à appréhender le calcul des intervalles advskew ou méconnaissance du rôle conjoint de CARP et pfsync.'
    },
    {
      cls: 'medium',
      text: 'Configuration opérationnelle d’un cluster de haute disponibilité CARP, réplication pfsync et surveillance des alertes Snort.'
    },
    {
      cls: 'high',
      text: 'Architecture de résilience critique à tolérance de panne totale, tuning fin des seuils CARP/pfsync et orchestration IPS avec Pass Lists.'
    }
  ]
};
