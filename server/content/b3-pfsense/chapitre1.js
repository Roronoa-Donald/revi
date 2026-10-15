/**
 * Chapitre 1 du cours « pfSense & Routage B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 1,
  title: 'Architecture pfSense, Moteur BSD Packet Filter &amp; Déploiement Réseau',
  short: 'Architecture pf &amp; Déploiement',
  toc: 'Noyau FreeBSD, moteur Packet Filter pf, interfaces physiques WAN/LAN/Opt, adressage CIDR, passerelles, services DHCP et DNS Resolver Unbound.',
  time: '≈ 2 h 45 de travail',
  free: true,
  situation: 'Dans une infrastructure informatique d’entreprise, le pare-feu constitue la première ligne de défense et le cœur d’acheminement des flux réseau. Dérivé du projet m0n0wall et propulsé par le système d’exploitation FreeBSD, Netgate pfSense s’appuie sur le moteur de filtrage Packet Filter (pf), réputé pour sa robustesse, sa vélocité et sa gestion native des états de connexion. L’ingénieur réseau et cybersécurité de niveau Bachelor 3 doit maîtriser l’architecture sous-jacente du noyau BSD, la cinématique d’interception des paquets sur les interfaces physiques (WAN, LAN, Optional), le calcul rigoureux des plans d’adressage CIDR, ainsi que la configuration des services d’infrastructure critiques (serveur DHCP, résolveur DNS Unbound durci avec DNSSEC) pour poser les fondations inébranlables d’un réseau sécurisé.',
  objectives: [
    'comprendre l’architecture interne de pfSense et son articulation avec le noyau FreeBSD ;',
    'analyser la cinématique d’interception des paquets par le sous-système réseau Packet Filter (pf) ;',
    'configurer et assigner les interfaces réseau physiques (WAN, LAN, OPT) et leurs passerelles par défaut ;',
    'calculer et valider les plans d’adressage IPv4/IPv6 en notation CIDR pour chaque zone réseau ;',
    'déployer et sécuriser le serveur DHCP interne et le résolveur DNS Unbound avec validation DNSSEC ;',
    'développer en Python 3 des validateurs d’adresses réseau CIDR, des convertisseurs WebGUI vers syntaxe pf.conf et des auditeurs de pools DHCP.'
  ],
  sections: [
    {
      title: 'Architecture Système : Du Noyau FreeBSD au Moteur Packet Filter (pf)',
      html: [
        '<p>Netgate pfSense est une distribution logicielle sécurisée construite sur une base <strong>FreeBSD</strong> allégée et durcie. Contrairement aux solutions sous Linux qui exploitent <em>Netfilter / iptables / nftables</em>, pfSense délègue l’intégralité de l’interception et du traitement des paquets au moteur <strong>Packet Filter (pf)</strong>, initialement conçu par Daniel Hartmeier pour le projet OpenBSD.</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. La Couche Noyau (FreeBSD Kernel)</h4>',
        '    <p>Le noyau assure la communication directe avec les contrôleurs d’interface réseau (cartes Intel <code>igb</code>, <code>em</code>, VirtIO <code>vtnet</code>, etc.). Le traitement des paquets s’opère au plus près du matériel :</p>',
        '    <ul>',
        '      <li><strong>Interceptions BPF (Berkeley Packet Filter) :</strong> Capture bas niveau des trames pour l’analyse (utilitaire <code>tcpdump</code>).</li>',
        '      <li><strong>Mécanisme pfctl :</strong> Outil de contrôle en ligne de commande permettant de manipuler directement les règles en mémoire du noyau sans redémarrage : <code>pfctl -e</code> (activation), <code>pfctl -f /tmp/rules.debug</code> (chargement des règles).</li>',
        '      <li><strong>Structure mbuf :</strong> Tampons de mémoire noyau alloués dynamiquement pour stocker les en-têtes et les charges utiles des paquets en transit.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. La Couche d’Orchestration pfSense</h4>',
        '    <p>L’interface d’administration graphique (WebGUI) écrite en PHP ne modifie jamais directement la mémoire du noyau. Elle maintient un fichier maître de configuration au format XML : <code>/cf/conf/config.xml</code>.</p>',
        '    <p>À chaque validation dans l’interface graphique :</p>',
        '    <ol>',
        '      <li>Le moteur PHP génère un fichier de règles texte temporaire <code>/tmp/rules.debug</code>.</li>',
        '      <li>La commande système <code>pfctl -f /tmp/rules.debug</code> est appelée en tâche de fond.</li>',
        '      <li>Le noyau valide la syntaxe et injecte atomiquement les nouvelles tables de filtrage.</li>',
        '    </ol>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Assignation des Interfaces Réseau & Modèle de Routage',
      html: [
        '<p>La topologie de base d’un pare-feu pfSense distingue trois grands types d’interfaces réseau logiques associées aux cartes physiques :</p>',
        '<div class="grid grid-3">',
        '  <div class="card">',
        '    <h4>WAN (Wide Area Network)</h4>',
        '    <p>Interface connectée au réseau public ou au routeur du FAI. Elle reçoit l’adresse IP publique (statique ou via DHCP) et héberge la passerelle par défaut (Default Gateway) vers Internet. Par défaut, <strong>tout flux entrant non sollicité sur le WAN est bloqué</strong>.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>LAN (Local Area Network)</h4>',
        '    <p>Interface du réseau d’entreprise interne de confiance (typiquement <code>192.168.1.1/24</code> ou <code>10.0.0.1/24</code>). Par défaut, pfSense y déploie une règle <em>Default allow LAN to any rule</em> permettant aux postes internes de naviguer librement.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>OPT (Optional Interfaces)</h4>',
        '    <p>Interfaces additionnelles (DMZ, Wi-Fi Invités, Réseau Serveurs, Liaisons Inter-sites). Contrairement au LAN, une interface OPT nouvellement créée ne possède <strong>aucune règle par défaut</strong> : elle est totalement hermétique jusqu’à configuration explicite.</p>',
        '  </div>',
        '</div>',
        box('warning', 'Protection Anti-Usurpation : RFC 1918 &amp; Block Bogon Networks', [
          '<p>Sur l’interface WAN, pfSense propose deux cases à cocher de sécurité indispensables :</p>',
          '<ul>',
          '  <li><strong>Block private networks (RFC 1918) :</strong> Rejette tout paquet arrivant sur le WAN dont l’adresse source est privée (<code>10.0.0.0/8</code>, <code>172.16.0.0/12</code>, <code>192.168.0.0/16</code>). À désactiver uniquement si pfSense est lui-même placé derrière une box opérateur en double NAT.</li>',
          '  <li><strong>Block bogon networks :</strong> Télécharge périodiquement et bloque les blocs d’adresses IP non attribués par l’IANA ou réservés, empêchant les attaques d’usurpation d’adresses inexistantes.</li>',
          '</ul>'
        ])
      ].join('\n')
    },
    {
      title: 'Services d’Infrastructure Indispensables : DHCP &amp; DNS Resolver Unbound',
      html: [
        '<p>Pour qu’un sous-réseau local fonctionne de manière autonome, pfSense intègre nativement les services d’infrastructure de couche applicative indispensables :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. Le Serveur DHCP (ISC DHCPD / Kea)</h4>',
        '    <p>pfSense distribue dynamiquement les paramètres de configuration IP aux postes clients de chaque interface locale :</p>',
        '    <ul>',
        '      <li><strong>Plage d’adresses (Pool Range) :</strong> Intervalle d’IP attribuées dynamiquement (ex: <code>192.168.1.100</code> à <code>192.168.1.200</code>).</li>',
        '      <li><strong>Baux statiques (Static Mappings) :</strong> Réservations permanentes liant une adresse MAC à une IP fixe. Règle d’or de configuration : <em>les baux statiques doivent impérativement être assignés en dehors du pool dynamique</em> pour éviter tout conflit d’adressage.</li>',
        '      <li><strong>Options avancées :</strong> Définition des passerelles, serveurs DNS, serveurs NTP et options PXE TFTP (option 66/67).</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Le DNS Resolver (Unbound)</h4>',
        '    <p>Contrairement à un simple relais DNS (DNS Forwarder), <strong>Unbound</strong> est un résolveur récursif complet qui interroge directement les serveurs racines (Root Servers) et applique la validation cryptographique <strong>DNSSEC</strong> pour garantir l’authenticité des réponses :</p>',
        '    <ul>',
        '      <li><strong>DNSSEC Validation :</strong> Bloque les attaques d’empoisonnement de cache (Cache Poisoning) en vérifiant les signatures RRSIG.</li>',
        '      <li><strong>DNS Query Forwarding :</strong> Option permettant de relayer les requêtes vers des DNS sécurisés tiers (ex: Quad9 <code>9.9.9.9</code> ou Cloudflare <code>1.1.1.1</code> via DoT - DNS over TLS sur le port 853).</li>',
        '      <li><strong>Host Overrides :</strong> Enregistrements DNS locaux permettant de résoudre les serveurs internes sans recourir à un serveur Active Directory externe.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],
  method: [
    'Étape 1 : Identifier les interfaces physiques détectées par le pilote FreeBSD (ifconfig) et planifier l’affectation WAN, LAN et OPT.',
    'Étape 2 : Calculer les plans d’adressage CIDR en réservant les adresses de réseau, de passerelle et de diffusion.',
    'Étape 3 : Configurer l’interface WAN avec sa passerelle par défaut et activer les protections RFC 1918 et Bogons selon la topologie.',
    'Étape 4 : Définir la plage du pool dynamique DHCP en réservant explicitement une zone d’adresses pour les baux statiques.',
    'Étape 5 : Activer le résolveur Unbound avec validation DNSSEC et configurer les relais chiffrés DoT si nécessaire.',
    'Étape 6 : Valider la syntaxe et charger les règles dans le noyau via pfctl avant d’ouvrir les accès réseau.'
  ],
  summary: [
    'pfSense repose sur le noyau FreeBSD et orchestre le moteur de filtrage à état Packet Filter (pf).',
    'La configuration complète est centralisée dans /cf/conf/config.xml et compilée à la volée dans /tmp/rules.debug.',
    'L’interface WAN bloque tout flux entrant par défaut et requiert l’activation des filtres RFC 1918 et Bogons.',
    'Une interface OPT nouvellement créée est hermétique et ne dispose d’aucune règle par défaut.',
    'Les baux DHCP statiques doivent impérativement être configurés en dehors de la plage d’attribution dynamique.',
    'Le résolveur Unbound offre une résolution récursive autonome avec authentification cryptographique DNSSEC.'
  ],
  checklist: [
    'Je comprends le rôle de pfctl dans la manipulation des règles et des tables du noyau FreeBSD.',
    'Je sais identifier le fichier de configuration maître /cf/conf/config.xml.',
    'Je sais calculer un sous-réseau CIDR, son masque, sa passerelle et son nombre d’hôtes utiles.',
    'Je sais pourquoi une interface OPT ne laisse passer aucun trafic à sa création.',
    'Je maîtrise la règle d’or de séparation entre pool DHCP dynamique et réservations statiques.',
    'Je sais expliquer la valeur ajoutée de la validation DNSSEC dans le résolveur Unbound.'
  ],
  notions: [
    'Noyau FreeBSD & Pilotes Réseau',
    'Moteur Packet Filter (pf)',
    'Utilitaire CLI pfctl',
    'Fichier Maître config.xml',
    'Interfaces WAN, LAN & OPT',
    'Filtrage RFC 1918 & Bogons',
    'Pool DHCP & Baux Statiques',
    'Résolveur DNS Unbound & DNSSEC'
  ],
  pitfalls: [
    'Placer des adresses de réservations DHCP statiques à l’intérieur du pool dynamique, provoquant des conflits d’attribution IP.',
    'Laisser cochée l’option « Block private networks » sur un WAN situé derrière une box opérateur en 192.168.1.0/24.',
    'Oublier de créer une règle d’autorisation sur une interface OPT nouvellement activée et s’étonner de l’absence de connectivité.',
    'Éditer directement /tmp/rules.debug à la main sans savoir que pfSense l’écrase à chaque modification graphique.'
  ],
  questions: [
    {
      stem: 'Quel moteur de filtrage noyau est utilisé sous pfSense pour inspecter les paquets ?',
      opts: [
        'Netfilter / iptables',
        'Packet Filter (pf)',
        'Windows Filtering Platform (WFP)',
        'eBPF / XDP'
      ],
      correct: 1,
      exp: 'pfSense s’appuie sur le moteur Packet Filter (pf) intégré au noyau FreeBSD, réputé pour sa gestion native des états et sa haute performance.'
    },
    {
      stem: 'Quel fichier maître stocke l’intégralité de la configuration persistante de pfSense ?',
      opts: [
        '/etc/pf.conf',
        '/var/log/filter.log',
        '/cf/conf/config.xml',
        '/tmp/rules.debug'
      ],
      correct: 2,
      exp: 'Toute la configuration de pfSense (interfaces, règles, certificats, paquets) est centralisée dans le fichier XML unique /cf/conf/config.xml.'
    },
    {
      stem: 'Quelle commande CLI permet d’activer le moteur de filtrage pf sous FreeBSD ?',
      opts: [
        'pfctl -e',
        'pfctl -d',
        'service firewall start',
        'systemctl enable iptables'
      ],
      correct: 0,
      exp: 'La commande pfctl -e (enable) active le moteur de filtrage pf dans le noyau.'
    },
    {
      stem: 'Par défaut, quelle est la politique de filtrage appliquée sur une interface OPT nouvellement activée ?',
      opts: [
        'Tout le trafic est autorisé vers Internet',
        'Tout le trafic entrant est bloqué (aucun flux autorisé)',
        'Seul le trafic Web (port 80 et 443) est autorisé',
        'Le trafic est routé sans inspection vers le LAN'
      ],
      correct: 1,
      exp: 'Contrairement au LAN qui dispose d’une règle par défaut, une interface OPT n’a aucune règle à la création : tout trafic est bloqué.'
    },
    {
      stem: 'Que réalise l’option « Block private networks » sur l’interface WAN ?',
      opts: [
        'Elle empêche les postes du LAN de communiquer entre eux',
        'Elle bloque tout paquet entrant sur le WAN ayant une adresse source privée RFC 1918',
        'Elle chiffre le trafic interne avec IPsec',
        'Elle interdit l’accès à l’interface d’administration Web'
      ],
      correct: 1,
      exp: 'Cette option protège le pare-feu contre l’usurpation d’adresses privées (RFC 1918) provenant d’Internet sur le lien public WAN.'
    },
    {
      stem: 'Où doivent être positionnées les adresses IP des réservations DHCP statiques (Static Mappings) ?',
      opts: [
        'Obligatoirement dans la plage du pool dynamique',
        'En dehors de la plage d’adresses du pool dynamique',
        'Dans un sous-réseau différent de l’interface',
        'Sur l’adresse IP de broadcast du réseau'
      ],
      correct: 1,
      exp: 'Pour éviter les conflits d’attribution IP dans ISC DHCPD, les baux statiques doivent impérativement être configurés hors du pool dynamique.'
    },
    {
      stem: 'Quel est le rôle principal du service DNS Unbound dans pfSense ?',
      opts: [
        'Transférer les fichiers par FTP sécurisé',
        'Résolveur DNS récursif local avec validation cryptographique DNSSEC',
        'Générer les certificats SSL du serveur Web',
        'Synchroniser l’horloge système par NTP'
      ],
      correct: 1,
      exp: 'Unbound est un résolveur DNS récursif performant assurant la résolution locale et la validation d’intégrité DNSSEC des enregistrements.'
    },
    {
      stem: 'Quel protocole est utilisé pour acheminer les requêtes DNS chiffrées vers des résolveurs publics sur le port 853 ?',
      opts: [
        'DoH (DNS over HTTPS)',
        'DoT (DNS over TLS)',
        'DNSSEC standard',
        'TFTP'
      ],
      correct: 1,
      exp: 'DNS over TLS (DoT) chiffre les requêtes et réponses DNS avec TLS sur le port TCP dédié 853.'
    }
  ],
  flashcards: [
    {
      q: 'Quel est le système d’exploitation hôte de Netgate pfSense ?',
      a: 'FreeBSD, un système d’exploitation UNIX libre et sécurisé.'
    },
    {
      q: 'Quel est le moteur de pare-feu au cœur de pfSense ?',
      a: 'Packet Filter (pf), développé à l’origine par le projet OpenBSD.'
    },
    {
      q: 'Quel outil CLI permet de recharger le fichier de règles pf dans le noyau ?',
      a: 'pfctl -f /tmp/rules.debug'
    },
    {
      q: 'Quelle est la règle par défaut sur une interface LAN fraîchement installée ?',
      a: 'Default allow LAN to any rule (autorise tout le trafic sortant depuis le sous-réseau LAN).'
    },
    {
      q: 'Quelle est la fonction de la règle « Block bogon networks » ?',
      a: 'Bloquer les paquets dont les adresses IP sources n’ont pas été allouées par l’IANA (adresses fantômes/illégitimes).'
    },
    {
      q: 'Pourquoi activer DNSSEC dans le résolveur Unbound ?',
      a: 'Pour authentifier cryptographiquement les réponses DNS et empêcher l’empoisonnement de cache (DNS Spoofing).'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Difficultés à distinguer le rôle du noyau FreeBSD du moteur pf ou erreurs dans les calculs de plages d’adresses CIDR.'
    },
    {
      cls: 'medium',
      text: 'Bonne compréhension de l’architecture pfSense, configuration opérationnelle des interfaces WAN/LAN et des services DHCP/DNS.'
    },
    {
      cls: 'high',
      text: 'Maîtrise complète du moteur pf, administration CLI via pfctl, durcissement DNSSEC et conception de topologies réseau d’entreprise résilientes.'
    }
  ]
};
