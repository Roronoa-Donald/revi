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
  situation: 'Lors de la mise en service d’un nouveau site d’entreprise, vous devez raccorder une arrivée fibre opérateur (WAN), un réseau bureautique interne (LAN) et une salle de serveurs isolée (interface optionnelle OPT) sur une appliance Netgate pfSense. Avant d’ouvrir le moindre flux, il faut comprendre comment pfSense traduit vos réglages WebGUI en règles du moteur Packet Filter (pf) de FreeBSD, découper proprement vos sous-réseaux CIDR et configurer les services DHCP et DNS Unbound.',
  objectives: [
    'expliquer l’architecture interne de pfSense et son articulation avec le noyau FreeBSD ;',
    'analyser le mécanisme d’interception des paquets par le sous-système réseau Packet Filter (pf) ;',
    'configurer et assigner les interfaces réseau physiques (WAN, LAN, OPT) et leurs passerelles par défaut ;',
    'calculer et valider les plans d’adressage IPv4/IPv6 en notation CIDR pour chaque zone réseau ;',
    'déployer et sécuriser le serveur DHCP interne et le résolveur DNS Unbound avec validation DNSSEC ;',
    'analyser et valider des plans d’adressage réseau CIDR, des directives natives pf.conf et des plages d’attribution DHCP.'
  ],
  sections: [
    {
      title: 'Architecture Système : Du Noyau FreeBSD au Moteur Packet Filter (pf)',
      html: [
        '<div class="box box--intuition">',
        '  <div class="box__title">Niveau 1 — Intuition : L’architecte (WebGUI) et le garde-frontière (noyau pf)</div>',
        '  <p>Imaginez pfSense comme un poste-frontière à deux niveaux : l’interface web (WebGUI) est le bureau de l’architecte qui rédige le règlement intérieur dans un classeur XML unique (<code>/cf/conf/config.xml</code>), tandis que le moteur <strong>Packet Filter (pf)</strong> logé au cœur du système FreeBSD est le garde-frontière qui inspecte chaque paquet réseau en temps réel à partir d’une consigne compilée (<code>/tmp/rules.debug</code>).</p>',
        '</div>',
        '<p>Netgate pfSense est une distribution pare-feu construite sur le système UNIX <strong>FreeBSD</strong>. Contrairement aux distributions Linux (qui s’appuient sur <em>Netfilter / iptables / nftables</em>), pfSense confie le filtrage des paquets au moteur <strong>Packet Filter (pf)</strong>, issu du projet OpenBSD.</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. La Couche Noyau (FreeBSD Kernel)</h4>',
        '    <p>Le noyau pilote directement les cartes réseau physiques ou virtuelles (pilotes Intel <code>igb</code>/<code>em</code> ou paravirtuel KVM/Proxmox <code>vtnet</code>) :</p>',
        '    <ul>',
        '      <li><strong>BPF (Berkeley Packet Filter) :</strong> interface de capture bas niveau intégrée au noyau permettant d’observer une copie des paquets bruts à des fins de diagnostic (utilisée par l’outil d’analyse <code>tcpdump</code>).</li>',
        '      <li><strong>Utilitaire pfctl :</strong> commande d’administration permettant d’activer le pare-feu (<code>pfctl -e</code>), de le désactiver (<code>pfctl -d</code>) ou de charger les règles en mémoire sans redémarrer (<code>pfctl -f /tmp/rules.debug</code>).</li>',
        '      <li><strong>Tampons mbuf (Memory Buffers) :</strong> petites zones de mémoire RAM réservées par le noyau FreeBSD pour stocker les paquets réseau en transit à très haute vitesse sans copie inutile.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. La Couche d’Orchestration pfSense</h4>',
        '    <p>L’interface d’administration graphique (WebGUI) écrite en PHP ne modifie jamais directement la mémoire du noyau. Elle maintient un fichier maître de configuration au format XML : <code>/cf/conf/config.xml</code>.</p>',
        '    <p>À chaque validation (« Apply Changes ») dans l’interface graphique :</p>',
        '    <ol>',
        '      <li>Le moteur PHP génère un fichier de règles texte temporaire <code>/tmp/rules.debug</code>.</li>',
        '      <li>La commande système <code>pfctl -f /tmp/rules.debug</code> est appelée en tâche de fond.</li>',
        '      <li>Le noyau vérifie la syntaxe et remplace atomiquement les tables de filtrage actives.</li>',
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
        '    <p>Interface raccordée à Internet (fibre opérateur ou routeur FAI). Elle porte l’adresse IP publique et la passerelle par défaut (Default Gateway). Par défaut, <strong>tout flux entrant non sollicité arrivant depuis Internet sur le WAN est bloqué</strong>.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>LAN (Local Area Network)</h4>',
        '    <p>Interface du réseau interne de confiance (ex. <code>192.168.1.1/24</code>). Par défaut, pfSense crée la règle <em>Default allow LAN to any</em> permettant aux postes du LAN d’accéder aux autres zones et à Internet.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>OPT (Optional Interfaces)</h4>',
        '    <p>Interfaces supplémentaires pour isoler une zone serveurs (DMZ, étudiée au Chapitre 4), un Wi-Fi invités ou un lien inter-sites. Contrairement au LAN, une interface OPT nouvellement activée ne contient <strong>aucune règle par défaut</strong> : tout paquet arrivant sur la patte OPT depuis les machines du segment OPT est bloqué (politique <em>Default Deny</em>).</p>',
        '  </div>',
        '</div>',
        box('warning', 'Protection Anti-Usurpation : RFC 1918 &amp; Block Bogon Networks', [
          '<p>Sur l’interface WAN, pfSense propose deux cases à cocher de sécurité indispensables :</p>',
          '<ul>',
          '  <li><strong>Block private networks (RFC 1918) :</strong> rejette tout paquet entrant sur le WAN dont l’adresse IP source appartient aux plages privées non routables sur Internet (<code>10.0.0.0/8</code>, <code>172.16.0.0/12</code>, <code>192.168.0.0/16</code>). À décocher uniquement en maquettage ou si le port WAN de pfSense est raccordé derrière une box opérateur en adressage privé (situation de double translation d’adresses ou <em>double NAT</em>, détaillée au Chapitre 3).</li>',
          '  <li><strong>Block bogon networks :</strong> bloque les plages d’adresses IP qui n’ont pas encore été attribuées par l’IANA (autorité mondiale de gestion des adresses IP), empêchant les paquets forgés avec des adresses sources fantômes.</li>',
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
        '    <p>Le démon DHCP historique <em>ISC DHCPD</em> (ou son successeur moderne <em>Kea DHCP</em> intégré aux versions récentes de pfSense) distribue automatiquement la configuration IP aux postes clients :</p>',
        '    <ul>',
        '      <li><strong>Plage d’adresses (Pool Range) :</strong> intervalle d’adresses IP attribuées dynamiquement (ex. <code>192.168.1.100</code> à <code>192.168.1.200</code>).</li>',
        '      <li><strong>Baux statiques (Static Mappings) :</strong> réservations permanentes associant l’adresse MAC d’un équipement à une IP fixe. Règle d’or : <em>les baux statiques doivent impérativement être choisis en dehors de la plage dynamique</em> pour éviter tout conflit.</li>',
        '      <li><strong>Options DHCP :</strong> distribution de la passerelle par défaut, du serveur DNS, du serveur d’horloge réseau (<strong>NTP</strong>, Network Time Protocol) ou des paramètres de démarrage réseau <strong>PXE/TFTP</strong> (options DHCP 66 et 67 indiquant l’adresse du serveur et le fichier d’amorçage).</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Le DNS Resolver (Unbound)</h4>',
        '    <p>Contrairement à un simple relais DNS (DNS Forwarder), <strong>Unbound</strong> est un résolveur récursif complet qui interroge directement la hiérarchie des serveurs racines et vérifie les signatures <strong>DNSSEC</strong> :</p>',
        '    <ul>',
        '      <li><strong>Validation DNSSEC :</strong> protège contre l’empoisonnement de cache DNS (<em>Cache Poisoning</em>, injection de fausses réponses IP) en vérifiant la signature cryptographique <strong>RRSIG</strong> (<em>Resource Record Signature</em>) attachée aux enregistrements DNS.</li>',
        '      <li><strong>DNS Query Forwarding (DoT) :</strong> option permettant de relayer les requêtes vers des résolveurs publics sécurisés (ex. Quad9 <code>9.9.9.9</code> ou Cloudflare <code>1.1.1.1</code>) via <strong>DoT (DNS over TLS)</strong> chiffré sur le port TCP <code>853</code>.</li>',
        '      <li><strong>Host Overrides :</strong> entrées DNS locales déclarées directement dans pfSense pour résoudre les noms des serveurs internes de l’entreprise.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Calcul de Plans d’Adressage CIDR (IPv4 / IPv6) & Syntaxe Native pf.conf',
      html: [
        '<div class="box box--intuition">',
        '  <div class="box__title">Niveau 1 — Intuition : Pourquoi découper en CIDR et comment lit le moteur pf ?</div>',
        '  <p>Attribuer une adresse IP à une interface pfSense (<code>192.168.1.1/24</code>) revient à définir à la fois l’adresse de la passerelle et la taille de la rue réseau qu’elle dessert (<code>/24</code> = 24 bits fixes pour identifier le réseau, 8 bits restants pour numéroter les machines). De même, chaque règle créée dans l’interface WebGUI est traduite en une phrase standardisée dans <code>/tmp/rules.debug</code> lue par le moteur <code>pf</code>.</p>',
        '</div>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. Calcul CIDR IPv4, RFC 3021 (/31) et IPv6 (/64)</h4>',
        '    <p>En IPv4 (32 bits), un préfixe <code>/n</code> laisse $h = 32 - n$ bits d’hôtes, soit $2^{32-n}$ adresses totales :</p>',
        '    <ul>',
        '      <li><strong>Sous-réseau standard ($n \le 30$) :</strong> la première adresse est l’adresse réseau (bits d’hôte à 0), la dernière est l’adresse de diffusion (<em>broadcast</em>, bits d’hôte à 1). Le nombre d’hôtes utilisables vaut $2^{32-n} - 2$ (ex. en <code>/29</code> : $2^3 = 8$ adresses totales, soit $8 - 2 = 6$ hôtes utilisables ; une interface pfSense ne doit jamais recevoir l’adresse réseau ni l’adresse de broadcast).</li>',
        '      <li><strong>Cas particuliers normés (RFC 3021 et /32) :</strong> sur un lien point-à-point inter-routeurs en <code>/31</code> (RFC 3021), il n’y a pas de broadcast : les <strong>2 adresses sont utilisables</strong>. En <code>/32</code>, le masque désigne <strong>1 hôte unique</strong> (route d’hôte).</li>',
        '      <li><strong>En IPv6 (128 bits) :</strong> chaque segment LAN/OPT reçoit un préfixe standard <code>/64</code> ($2^{64}$ adresses d’interface, sans broadcast, remplacé par le multicast ICMPv6 NDP).</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Grammaire d’une directive native pf.conf</h4>',
        '    <p>Dans <code>/tmp/rules.debug</code>, une règle de filtrage générée par pfSense suit la grammaire positionnelle d’OpenBSD Packet Filter :</p>',
        '    <pre><code>action direction [quick] on interface [proto protocole] from source to destination [port port_cible]</code></pre>',
        '    <ul>',
        '      <li><code>action</code> : <code>pass</code> (autoriser et créer une entrée d’état) ou <code>block</code> (rejeter).</li>',
        '      <li><code>direction</code> : <code>in</code> (paquet entrant sur l’interface) ou <code>out</code> (sortant).</li>',
        '      <li><code>on interface</code> : nom logique ou physique (<code>wan</code>, <code>lan</code>, <code>opt1</code>).</li>',
        '      <li><code>proto</code> : omis si <code>any</code> ; sinon <code>proto tcp</code>, <code>proto udp</code>, <code>proto icmp</code>.</li>',
        '      <li><code>port</code> : omis si <code>any</code> ou protocole sans port (ICMP) ; sinon <code>port 443</code>.</li>',
        '    </ul>',
        '    <p><strong>Exemple résolu :</strong> Autoriser sur <code>lan</code> le trafic TCP de <code>192.168.1.0/24</code> vers toute destination sur le port <code>443</code> s’écrit :<br><code>pass in on lan proto tcp from 192.168.1.0/24 to any port 443</code>.</p>',
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
    'pfSense repose sur le noyau FreeBSD et orchestre le moteur de filtrage Packet Filter (pf).',
    'La configuration complète est centralisée dans /cf/conf/config.xml et compilée à la volée dans /tmp/rules.debug.',
    'L’interface WAN bloque tout flux entrant par défaut et requiert l’activation des filtres RFC 1918 et Bogons.',
    'Une interface OPT nouvellement créée est hermétique et ne dispose d’aucune règle par défaut.',
    'Les baux DHCP statiques doivent impérativement être configurés en dehors de la plage d’attribution dynamique.',
    'Le résolveur Unbound offre une résolution récursive autonome avec authentification cryptographique DNSSEC.'
  ],
  checklist: [
    'Je sais expliquer l’architecture interne de pfSense (/cf/conf/config.xml) et son lien avec le noyau FreeBSD.',
    'Je comprends le mécanisme d’interception des paquets par pf et le rôle de pfctl -f /tmp/rules.debug.',
    'Je sais assigner les interfaces WAN, LAN et OPT et expliquer pourquoi OPT1 bloque tout flux entrant par défaut.',
    'Je sais calculer un plan d’adressage CIDR IPv4/IPv6 (adresse réseau, broadcast, hôtes utiles et cas RFC 3021 /31).',
    'Je maîtrise la séparation entre pool DHCP dynamique et baux statiques ainsi que la validation DNSSEC dans Unbound.',
    'Je sais traduire une règle WebGUI en directive native pf.conf (pass/block in on <iface> proto <p> from <src> to <dst>).'
  ],
  notions: [
    'Filtrage RFC 1918 & Bogons',
    'Noyau FreeBSD & Pilotes Réseau',
    'Moteur Packet Filter (pf)',
    'Utilitaire CLI pfctl',
    'Fichier Maître config.xml',
    'Interfaces WAN, LAN & OPT',
    'Adressage CIDR & RFC 1918 / Bogons',
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
        'Netfilter / iptables (noyau Linux)',
        'Packet Filter (pf, intégré au noyau FreeBSD)',
        'Unbound DNS Resolver',
        'ISC DHCPD / Kea'
      ],
      correct: 1,
      exp: 'pfSense s’appuie sur le moteur Packet Filter (pf) intégré au noyau FreeBSD, tandis que Netfilter/iptables relève du noyau Linux.'
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
      exp: 'Toute la configuration persistante de pfSense (interfaces, règles, certificats, services) est centralisée dans /cf/conf/config.xml, tandis que /tmp/rules.debug est le fichier temporaire généré pour pfctl.'
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
      exp: 'La commande pfctl -e (enable) active le moteur de filtrage pf dans le noyau, alors que pfctl -d (disable) le désactive.'
    },
    {
      stem: 'Quel est le comportement de filtrage par défaut d’une nouvelle interface optionnelle (OPT1) qui vient d’être activée sur pfSense ?',
      opts: [
        'Tout le trafic entrant sur l’interface OPT1 (émis par les machines du réseau OPT1) est autorisé vers Internet uniquement',
        'Aucune règle n’est créée par défaut : tout trafic arrivant sur l’interface OPT1 (émis par les hôtes du segment OPT1) est bloqué par la politique implicite Default Deny',
        'Le trafic entre OPT1 et LAN est autorisé, mais l’accès vers le WAN est bloqué',
        'L’interface OPT1 hérite automatiquement des règles de filtrage de l’interface LAN'
      ],
      correct: 1,
      exp: 'Contrairement à l’interface LAN qui reçoit la règle initiale « Default allow LAN to any », une interface OPT nouvellement créée possède une table de règles vide : tout paquet entrant sur la patte OPT1 depuis les hôtes du segment OPT1 est donc rejeté tant qu’aucune règle pass explicite n’y est ajoutée.'
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
      exp: 'Cette option protège le pare-feu contre l’usurpation d’adresses privées (RFC 1918 : 10/8, 172.16/12, 192.168/16) arrivant depuis l’extérieur sur le lien WAN.'
    },
    {
      stem: 'Où doivent être positionnées les adresses IP des réservations DHCP statiques (Static Mappings) ?',
      opts: [
        'Obligatoirement dans la plage du pool dynamique',
        'En dehors de la plage d’adresses du pool dynamique, mais dans le même sous-réseau CIDR que l’interface',
        'Dans un sous-réseau différent de l’interface',
        'Sur l’adresse IP de broadcast du réseau'
      ],
      correct: 1,
      exp: 'Pour éviter tout conflit d’attribution dans le serveur DHCP, les baux statiques doivent appartenir au sous-réseau de l’interface mais être situés hors de la plage dynamique.'
    },
    {
      stem: 'Quel est le rôle principal du service DNS Unbound dans pfSense ?',
      opts: [
        'Transférer les fichiers d’amorçage réseau par TFTP',
        'Résolveur DNS récursif local avec validation cryptographique DNSSEC (vérification des signatures RRSIG)',
        'Attribuer dynamiquement les adresses IP aux postes du LAN',
        'Synchroniser l’horloge système par NTP'
      ],
      correct: 1,
      exp: 'Unbound est un résolveur DNS récursif complet qui interroge les serveurs racines et valide les signatures DNSSEC (RRSIG) pour prévenir l’empoisonnement de cache.'
    },
    {
      stem: 'Quel protocole est utilisé par Unbound pour relayer des requêtes DNS chiffrées en TLS sur le port TCP 853 ?',
      opts: [
        'DHCP (Dynamic Host Configuration Protocol)',
        'DoT (DNS over TLS)',
        'BPF (Berkeley Packet Filter)',
        'NTP (Network Time Protocol)'
      ],
      correct: 1,
      exp: 'DNS over TLS (DoT) encapsule et chiffre les requêtes DNS dans un tunnel TLS sur le port TCP standard 853.'
    }
  ],
  flashcards: [
      { q: 'Qu’est-ce que « Noyau FreeBSD & Pilotes Réseau » ?', a: 'Noyau FreeBSD & Pilotes Réseau' },
      { q: 'Qu’est-ce que « Utilitaire CLI pfctl » ?', a: 'Utilitaire CLI pfctl : Utilitaire pfctl : commande d’administration permettant d’activer le pare-feu ( pfctl -e ), de le désactiver ( pfctl -d ) ou de charger les règles en mémoire sans redémarrer ( pfctl -f /tmp/rules.debug ).' },
      { q: 'Qu’est-ce que « Fichier Maître config.xml » ?', a: 'Fichier Maître config.xml' },
      { q: 'Qu’est-ce que « Interfaces WAN, LAN & OPT » ?', a: 'Interfaces WAN, LAN & OPT' },
      { q: 'Qu’est-ce que « Adressage CIDR & RFC 1918 / Bogons » ?', a: 'Adressage CIDR & RFC 1918 / Bogons' },
      { q: 'Qu’est-ce que « Pool DHCP & Baux Statiques » ?', a: 'Pool DHCP & Baux Statiques' },
      { q: 'Qu’est-ce que « Hiérarchie Floating vs Interface Rules » ?', a: 'Hiérarchie Floating vs Interface Rules' },
      { q: 'Qu’est-ce que « Politique Implicite Default Deny » ?', a: 'Politique Implicite Default Deny' },
      { q: 'Qu’est-ce que « Aliases Récursifs & Tables Radix » ?', a: 'Aliases Récursifs & Tables Radix' },
      { q: 'Qu’est-ce que « Stateful Inspection & State Table » ?', a: 'Stateful Inspection & State Table' },
      { q: 'Qu’est-ce que « Machine à États TCP (SYN_SENT, ESTABLISHED) » ?', a: 'Machine à États TCP (SYN_SENT, ESTABLISHED)' },
      { q: 'Qu’est-ce que « Commandes pfctl -ss et pfctl -k » ?', a: 'Commandes pfctl -ss et pfctl -k' },
      { q: 'Qu’est-ce que « Limiters Dummynet (Pipes & Queues) » ?', a: 'Limiters Dummynet (Pipes & Queues)' },
      { q: 'Qu’est-ce que « NAT Reflection » ?', a: 'NAT Reflection : Mécanisme permettant à un poste du réseau local d’accéder au serveur interne en utilisant son nom de domaine ou son IP publique sans quitter le pare-feu.' },
      { q: 'Qu’est-ce que « Virtual IPs (IP Alias, CARP, Proxy ARP) » ?', a: 'créer des adresses IP Virtuelles (Virtual IPs : IP Alias, CARP, Proxy ARP) sur les interfaces réseau ;' },
      { q: 'Qu’est-ce que « Gateway Groups (Tiers 1 & 2) » ?', a: 'Gateway Groups (Tiers 1 & 2)' },
      { q: 'Qu’est-ce que « En-tête 802.1Q & Champ VID (12 bits) » ?', a: 'En-tête 802.1Q & Champ VID (12 bits)' },
      { q: 'Qu’est-ce que « Lien Trunk & Démultiplexage FreeBSD » ?', a: 'Lien Trunk & Démultiplexage FreeBSD' },
      { q: 'Qu’est-ce que « Sous-Interfaces Logiques (parent.VID) » ?', a: 'Sous-Interfaces Logiques (parent.VID)' },
      { q: 'Qu’est-ce que « Architecture de DMZ Publique » ?', a: 'Architecture de DMZ Publique' },
      { q: 'Qu’est-ce que « Principe d’Interdiction d’Initiation DMZ → LAN » ?', a: 'Principe d’Interdiction d’Initiation DMZ → LAN' },
      { q: 'Qu’est-ce que « Attaque par Double Marquage (Double Tagging) » ?', a: 'Attaque par Double Marquage (Double Tagging)' },
      { q: 'Qu’est-ce que « Vulnérabilité du VLAN Natif non étiqueté » ?', a: 'Vulnérabilité du VLAN Natif non étiqueté' },
      { q: 'Qu’est-ce que « Durcissement de Couche 2 (DTP, Tag Native) » ?', a: 'Durcissement de Couche 2 (DTP, Tag Native)' },
      { q: 'Qu’est-ce que « PKI X.509 & Autorité de Certification (CA) » ?', a: 'PKI X.509 & Autorité de Certification (CA)' },
      { q: 'Qu’est-ce que « Certificate Revocation List (CRL) » ?', a: 'Certificate Revocation List (CRL) : Fichier signé par la CA recensant les numéros de série (Serial Numbers) des certificats invalidés avant leur date d’expiration.' },
      { q: 'Qu’est-ce que « OpenVPN (SSL/TLS + User Auth) » ?', a: 'OpenVPN (SSL/TLS + User Auth)' },
      { q: 'Qu’est-ce que « Protocole ESP (IP 50) & Chiffrement AES-GCM » ?', a: 'Protocole ESP (IP 50) & Chiffrement AES-GCM' },
      { q: 'Qu’est-ce que « Recommandations Cryptographiques ANSSI/NIST » ?', a: 'Recommandations Cryptographiques ANSSI/NIST' },
      { q: 'Qu’est-ce que « Clustering Actif / Passif Haute Disponibilité » ?', a: 'Clustering Actif / Passif Haute Disponibilité' },
      { q: 'Qu’est-ce que « Protocole CARP & Adresses IP Virtuelles (VIP) » ?', a: 'Protocole CARP & Adresses IP Virtuelles (VIP)' },
      { q: 'Qu’est-ce que « Identifiant VHID & MAC Virtuelle » ?', a: 'Identifiant VHID & MAC Virtuelle' },
      { q: 'Qu’est-ce que « Paramètres advbase & advskew » ?', a: 'Paramètres advbase & advskew' },
      { q: 'Qu’est-ce que « Protocole de Synchronisation d’États pfsync » ?', a: 'Protocole de Synchronisation d’États pfsync' },
      { q: 'Qu’est-ce que « Clonage de Configuration XMLRPC » ?', a: 'Clonage de Configuration XMLRPC' },
      { q: 'Qu’est-ce que « Moteurs IDS / IPS Snort & Suricata » ?', a: 'Moteurs IDS / IPS Snort & Suricata' },
      { q: 'Qu’est-ce que « Table pf snort2c & Pass List (Liste Blanche) » ?', a: 'Table pf snort2c & Pass List (Liste Blanche)' },
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
      a: 'Default allow LAN to any rule (autorise tout le trafic entrant sur la patte LAN depuis le réseau interne).'
    },
    {
      q: 'Quelle est la fonction de la règle « Block bogon networks » ?',
      a: 'Bloquer les paquets dont les adresses IP sources n’ont pas été allouées par l’IANA (adresses fantômes/illégitimes).'
    },
    {
      q: 'Pourquoi activer DNSSEC dans le résolveur Unbound ?',
      a: 'Pour authentifier cryptographiquement les réponses DNS (signatures RRSIG) et empêcher l’empoisonnement de cache.'
    },
    {
      q: 'Quel fichier XML centralise toute la configuration persistante de pfSense ?',
      a: '/cf/conf/config.xml (compilé ensuite en règles texte dans /tmp/rules.debug).'
    },
    {
      q: 'Quelle est la formule du nombre d’hôtes IPv4 utilisables en /n (n <= 30) et le cas RFC 3021 (/31) ?',
      a: '2^(32-n) - 2 hôtes utilisables pour n <= 30 (hors réseau et broadcast), et 2 hôtes utilisables sur un lien point-à-point /31 (RFC 3021).'
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
