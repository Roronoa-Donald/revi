/**
 * Chapitre 3 du cours « Cybersécurité » B2 — Sécurité des Réseaux, Filtrage & Architecture Périmétrique.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 3,
  title: 'Sécurité des Réseaux, Filtrage &amp; Architecture Périmétrique',
  short: 'Réseaux &amp; Pare-feu',
  toc: 'Pare-feu stateless et stateful (iptables/nftables), segmentation en DMZ, VPN (IPsec/WireGuard), audit de ports avec Nmap et attaques de couche 2 (ARP Poisoning).',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'L’infrastructure d’une PME connecte ses serveurs de production, sa messagerie, ses postes de travail ' +
    'et ses imprimantes sur un unique réseau plat <code>192.168.1.0/24</code> relié à une box Internet sans pare-feu dédié. ' +
    'Un ordinateur portable d’un visiteur branché sur une prise murale diffuse un malware qui contamine instantanément ' +
    'l’ensemble du parc en quelques minutes. ' +
    'Comment cloisonner les flux au moyen de zones démilitarisées (DMZ) et de VLANs ? ' +
    'Comment configurer un pare-feu Linux iptables avec suivi d’état (stateful inspection) ? ' +
    'Comment anticiper les attaques par scan de ports Nmap et empoisonnement ARP ? ' +
    'Ce module structure la défense périmétrique de vos réseaux.',

  objectives: [
    'distinguer le filtrage de paquets sans état (stateless) du filtrage avec suivi de connexion (stateful inspection) ;',
    'rédiger des règles de pare-feu robustes avec l’outil Linux iptables (chaînes INPUT, FORWARD, états ESTABLISHED/RELATED) ;',
    'concevoir une architecture réseau cloisonnée avec zone démilitarisée (DMZ) et sous-réseaux étanches ;',
    'analyser les résultats d’un scan de ports Nmap (SYN scan, connect scan, détection de versions et de failles) ;',
    'comprendre le mécanisme de l’usurpation d’adresse ARP (ARP Poisoning) et déployer les contre-mesures adaptées.'
  ],

  sections: [
    {
      title: 'Typologie des pare-feu : Stateless vs Stateful (Inspection d’état)',
      html: [
        '<p>Le pare-feu (firewall) est la sentinelle placée à la frontière des réseaux. On distingue deux générations principales de filtrage réseau :</p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4 class="card-title">1. Pare-feu sans état (Stateless Packet Filtering)</h4>',
        '    <p>Examine chaque paquet isolément en comparant ses en-têtes (IP source/destination, port, protocole TCP/UDP) ' +
        '    à une liste de règles ordonnées. Très rapide, mais incapable de savoir si un paquet entrant fait suite ' +
        '    à une requête sortante légitime initiée par un client interne.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4 class="card-title">2. Pare-feu avec suivi d’état (Stateful Inspection / SPI)</h4>',
        '    <p>Maintient en mémoire une table des connexions actives (table d’état). Il reconnaît automatiquement les paquets ' +
        '    appartenant à une session établie (<code>ESTABLISHED</code>) ou liée (<code>RELATED</code>), ce qui permet d’autoriser les réponses ' +
        '    sans ouvrir en grand les ports entrants.</p>',
        '  </div>',
        '</div>',

        box('info', 'Le pare-feu applicatif : WAF (Web Application Firewall)', [
          '<p>Tandis qu’un pare-feu réseau opère aux couches 3 (IP) et 4 (TCP/UDP), un <strong>WAF</strong> opère en couche 7 (HTTP/HTTPS). ' +
          'Il inspecte les paramètres d’URL, en-têtes HTTP, cookies et charges utiles JSON/XML pour bloquer en amont les injections SQL et attaques XSS.</p>'
        ].join('\n'))
      ].join('\n')
    },
    {
      title: 'Configuration de filtrage Linux avec iptables',
      html: [
        '<p>Sous Linux, le sous-système netfilter est historiquement piloté via <code>iptables</code> (et modernisé par <code>nftables</code>). ' +
        'La table <code>filter</code> comporte trois chaînes fondamentales :</p>',

        '<ul>',
        '  <li><code>INPUT</code> : Trafic destiné localement à la machine elle-même.</li>',
        '  <li><code>OUTPUT</code> : Trafic généré par la machine vers l’extérieur.</li>',
        '  <li><code>FORWARD</code> : Trafic traversant la machine (rôle de routeur / passerelle filtrante).</li>',
        '</ul>',

        '<pre><code># --- SCRIPT IPTABLES TYPE POUR UN SERVEUR WEB SÉCURISÉ ---' + '\n' +
        '# 1. Politique par défaut restrictive (Whitelist : tout fermer par défaut)' + '\n' +
        'iptables -P INPUT DROP' + '\n' +
        'iptables -P FORWARD DROP' + '\n' +
        'iptables -P OUTPUT ACCEPT' + '\n\n' +
        '# 2. Autoriser le trafic sur l’interface locale de bouclage (Loopback)' + '\n' +
        'iptables -A INPUT -i lo -j ACCEPT' + '\n\n' +
        '# 3. Autoriser les paquets des connexions déjà établies ou apparentées' + '\n' +
        'iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT' + '\n\n' +
        '# 4. Ouvrir sélectivement les ports des services publics autorisés' + '\n' +
        'iptables -A INPUT -p tcp --dport 22 -j ACCEPT   ; SSH (administration)' + '\n' +
        'iptables -A INPUT -p tcp --dport 80 -j ACCEPT   ; HTTP' + '\n' +
        'iptables -A INPUT -p tcp --dport 443 -j ACCEPT  ; HTTPS' + '\n' +
        '</code></pre>'
      ].join('\n')
    },
    {
      title: 'Architecture réseau en profondeur : DMZ, VLANs &amp; Tunnels VPN',
      html: [
        '<p>Le principe de défense en profondeur interdit de placer des serveurs accessibles depuis Internet dans le même réseau ' +
        'que les postes de travail ou les bases de données internes contenant des données confidentielles.</p>',

        '<table class="table">',
        '  <thead><tr><th>Zone réseau</th><th>Équipements hébergés</th><th>Flux autorisés</th></tr></thead>',
        '  <tbody>',
        '    <tr><td><strong>Zone Publique (Internet)</strong></td><td>Utilisateurs distants, clients web.</td><td>Accès entrant strictement limité aux ports 80/443 de la DMZ.</td></tr>',
        '    <tr><td><strong>Zone Démilitarisée (DMZ)</strong></td><td>Serveurs web, relais de messagerie, serveurs DNS publics.</td><td>Peut répondre à Internet ; ne peut JAMAIS initier de connexion vers le réseau interne.</td></tr>',
        '    <tr><td><strong>Réseau Interne (LAN)</strong></td><td>Postes des employés, stations de travail, imprimantes.</td><td>Peut initier des connexions vers Internet et la DMZ.</td></tr>',
        '    <tr><td><strong>Zone Sensible (Base de données)</strong></td><td>Bases SQL, annuaires LDAP/AD, serveurs de paie.</td><td>Accessible uniquement depuis les serveurs applicatifs de la DMZ sur un port précis.</td></tr>',
        '  </tbody>',
        '</table>',

        '<p>Pour interconnecter des sites distants ou des télétravailleurs en toute sécurité à travers Internet, ' +
        'on établit des tunnels <strong>VPN</strong> (Virtual Private Network) chiffrés avec <strong>IPsec</strong> ' +
        '(niveau couche réseau 3) ou <strong>WireGuard / OpenVPN</strong>.</p>'
      ].join('\n')
    },
    {
      title: 'Reconnaissance avec Nmap &amp; Attaques de niveau 2 (ARP Poisoning)',
      html: [
        '<p>Avant toute attaque, un intrus cartographie les cibles à l’aide d’un scanner de ports comme <strong>Nmap</strong>. ' +
        'Comprendre les sondes Nmap permet d’auditer son propre parc :</p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4 class="card-title">Techniques de scan Nmap</h4>',
        '    <ul>',
        '      <li><strong>SYN Stealth Scan (<code>-sS</code>) :</strong> Envoie un paquet TCP SYN. Si le serveur répond SYN-ACK, le port est OUVERT ; Nmap envoie immédiatement RST sans terminer le handshake à trois voies (furtif).</li>',
        '      <li><strong>Connect Scan (<code>-sT</code>) :</strong> Termine la connexion TCP complète (non furtif, journalisé).</li>',
        '      <li><strong>États de port :</strong> <i>Open</i> (service actif), <i>Closed</i> (port fermé répondant RST), <i>Filtered</i> (paquet bloqué par un pare-feu sans réponse).</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4 class="card-title">Empoisonnement de cache ARP (ARP Poisoning)</h4>',
        '    <p>Le protocole ARP associe une adresse IP à une adresse MAC sans aucune authentification. ' +
        '    Un attaquant sur le réseau local envoie des réponses ARP falsifiées non sollicitées (Gratuitous ARP) :</p>',
        '    <p><code>IP_passerelle est à MAC_attaquant</code></p>',
        '    <p>Les victimes redirigent tout leur trafic vers l’attaquant, qui intercepte les mots de passe et données en clair (Man-in-the-Middle).</p>',
        '    <p><strong>Contre-mesures :</strong> Inspection ARP dynamique (DAI sur commutateurs gérés), 802.1X, tables ARP statiques.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],

  questions: [
    {
      stem: 'Dans un pare-feu Linux iptables, quelle chaîne de la table filter inspecte les paquets qui traversent la machine d’une interface réseau à une autre ?',
      opts: [
        'FORWARD',
        'INPUT',
        'OUTPUT',
        'PREROUTING'
      ],
      correct: 0,
      exp: 'La chaîne FORWARD traite les paquets qui ne sont ni émis par la machine locale ni destinés à celle-ci, mais qui sont routés d’une interface à une autre.'
    },
    {
      stem: 'Pourquoi est-il crucial d’isoler les serveurs web publics dans une zone démilitarisée (DMZ) ?',
      opts: [
        'Pour empêcher un pirate qui compromettrait le serveur web d’accéder directement et sans entrave au réseau interne de l’entreprise',
        'Pour accélérer la vitesse de calcul du processeur du serveur web',
        'Parce que le protocole HTTPS ne peut pas fonctionner sur un réseau local standard',
        'Pour éviter d’avoir à installer des antivirus sur les postes de travail'
      ],
      correct: 0,
      exp: 'En cas de compromission d’un serveur en DMZ, la politique de filtrage interdit à la DMZ d’initier des connexions vers le réseau interne, limitant ainsi la propagation latérale de l’attaque.'
    },
    {
      stem: 'Lors d’un scan Nmap SYN (-sS), quelle réponse du serveur cible indique que le port testé est OUVERT ?',
      opts: [
        'Un paquet SYN-ACK',
        'Un paquet RST-ACK',
        'Une absence totale de réponse (timeout)',
        'Un paquet ICMP Port Unreachable'
      ],
      correct: 0,
      exp: 'Si le port est ouvert, la pile réseau du serveur accepte la négociation en répondant SYN-ACK. Nmap envoie alors un RST pour couper la connexion avant qu’elle ne soit loguée par l’application.'
    },
    {
      stem: 'Quel protocole de niveau 2 (Liaison) est dépourvu de mécanisme d’authentification, permettant l’attaque par empoisonnement de cache ARP (ARP Poisoning) ?',
      opts: [
        'ARP (Address Resolution Protocol)',
        'DNS (Domain Name System)',
        'BGP (Border Gateway Protocol)',
        'DHCP (Dynamic Host Configuration Protocol)'
      ],
      correct: 0,
      exp: 'Le protocole ARP accepte aveuglément les réponses d’association IP/MAC sans vérifier si elles correspondent à une requête préalable ni contrôler l’identité de l’émetteur.'
    }
  ],

  pitfalls: [
    'Configurer un pare-feu avec une politique par défaut permissive (ACCEPT) au lieu d’une politique restrictive (DROP).',
    'Ouvrir l’interface loopback (127.0.0.1) aux paquets provenant de l’extérieur sans filtrer l’adresse source.',
    'Autoriser la DMZ à initier des requêtes directes vers le réseau interne, ruinant tout l’intérêt du cloisonnement.',
    'Considérer que l’usage d’un VPN dispense de chiffrer les flux applicatifs internes sensibles.',
    'Négliger la sécurité physique et la couche 2 sous prétexte que le pare-feu périmétrique est inviolable.'
  ],

  methodTitle: 'Protocole en 4 étapes pour sécuriser l’architecture réseau d’un site',
  method: [
    'Segmenter physiquement ou logiquement (VLANs 802.1Q) : séparer postes utilisateurs, serveurs DMZ et bases de données.',
    'Appliquer la politique du moindre privilège sur le pare-feu : bloquer tout trafic par défaut et n’autoriser que les ports indispensables.',
    'Activer le suivi de connexion stateful : accepter systématiquement les paquets ESTABLISHED/RELATED pour fluidifier les flux légitimes.',
    'Durcir la couche 2 sur les commutateurs : activer la surveillance DHCP (Snooping) et l’inspection ARP dynamique (DAI).'
  ],

  summary: [
    'Les pare-feu stateful (SPI) inspectent la légitimité des paquets en fonction de l’état de la session (ESTABLISHED/RELATED).',
    'iptables organise ses règles dans les chaînes INPUT (local), OUTPUT (émis) et FORWARD (routé).',
    'La DMZ isole les serveurs publics d’Internet tout en protégeant le cœur du réseau interne.',
    'Nmap utilise le scan SYN furtif (-sS) pour détecter les ports ouverts sans finaliser la connexion TCP.',
    'L’ARP Poisoning exploite l’absence d’authentification d’ARP pour détourner le trafic local vers un pirate (MitM).'
  ],

  checklist: [
    'Je sais expliquer la différence entre un pare-feu stateless, stateful et un WAF.',
    'Je maîtrise la syntaxe des commandes iptables pour filtrer les ports entrants et sortants.',
    'Je comprends l’architecture de flux d’une zone démilitarisée (DMZ).',
    'Je sais interpréter les trois états fondamentaux d’un port Nmap (Open, Closed, Filtered).',
    'Je connais le mécanisme d’une attaque par empoisonnement ARP et ses parades au niveau commutateur.'
  ],

  notions: [
    'Pare-feu sans état (Stateless) vs avec état (Stateful)',
    'Table de connexion (conntrack)',
    'Pare-feu applicatif (WAF)',
    'Commandes Linux iptables (INPUT, FORWARD, OUTPUT)',
    'Zone démilitarisée (DMZ) et segmentation VLAN',
    'Réseau privé virtuel (VPN IPsec / WireGuard)',
    'Scanner de ports Nmap (SYN scan -sS)',
    'États de ports (Open, Closed, Filtered)',
    'Empoisonnement de cache ARP (ARP Poisoning)',
    'Inspection ARP dynamique (DAI)'
  ],

  mastery: [
    { cls: 'low', text: '&lt; 50 % — Revois les chaînes iptables et le fonctionnement d’une DMZ.' },
    { cls: 'mid', text: '50–69 % — Entraîne-toi sur les règles de filtrage stateful et le mécanisme du scan SYN Nmap.' },
    { cls: 'good', text: '70–89 % — Solide : tu maîtrises l’architecture périmétrique et la défense réseau.' },
    { cls: 'top', text: '≥ 95 % — Parfait : passe aux vulnérabilités applicatives et au Top 10 OWASP au module 4.' }
  ],

  flashcards: [
    { q: 'Quelle est la différence essentielle entre un pare-feu stateless et stateful ?', a: 'Le stateless inspecte chaque paquet isolément sans mémoire, tandis que le stateful suit les sessions dans une table d’état (ESTABLISHED, RELATED).' },
    { q: 'À quoi sert la chaîne FORWARD dans iptables ?', a: 'À filtrer les paquets réseau qui traversent la machine sans être destinés à la machine locale elle-même.' },
    { q: 'Pourquoi un serveur en DMZ ne doit-il jamais pouvoir initier de connexion vers le LAN interne ?', a: 'Pour empêcher un attaquant ayant piraté le serveur web de rebondir vers les données confidentielles du réseau interne.' },
    { q: 'Que fait l’option -sS dans la commande Nmap ?', a: 'Elle exécute un scan SYN furtif (half-open) sans terminer la poignée de main TCP à trois voies.' },
    { q: 'Comment fonctionne l’attaque par empoisonnement de table ARP (ARP Poisoning) ?', a: 'L’attaquant diffuse de fausses réponses ARP pour associer l’adresse IP de la passerelle légitime à sa propre adresse MAC matérielle.' },
    { q: 'Quelle contre-mesure matérielle sur les commutateurs bloque l’ARP Spoofing ?', a: 'L’inspection ARP dynamique (DAI - Dynamic ARP Inspection) adossée au DHCP Snooping.' }
  ]
};
