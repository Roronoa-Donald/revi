/**
 * Chapitre 5 du cours « Linux Avancé B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 5,
  title: 'Réseau Avancé Linux : Namespaces, Bridges &amp; Policy Routing',
  short: 'Réseau Avancé &amp; Policy Routing',
  toc: 'Interfaces virtuelles (veth pairs, Linux bridge, tap/tun), iproute2, routage par règles et politiques multiples (PBR, ip rule), et séquence de résolution NSSwitch.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B3 et plus',
  situation: 'Dans les architectures de serveurs modernes, l’environnement réseau dépasse largement une unique carte physique connectée à un switch local. L’hébergement de conteneurs, les passerelles VPN multi-fournisseurs (Multi-WAN) et les réseaux superposés (Overlay Networks VXLAN/Geneve) imposent une virtualisation complète de la pile réseau au cœur du noyau Linux. L’ingénieur de niveau Bachelor 3 doit savoir concevoir des topologies virtuelles complexes combinant ponts logiciels (Linux Bridges) et câbles virtuels (veth pairs), maîtriser la suite d’outils iproute2 (remplaçant les vieux outils obsolètes ifconfig et route), déployer du routage basé sur les politiques (Policy-Based Routing - PBR) via ip rule pour aiguiller le trafic selon la source ou le port applicatif, et comprendre l’ordre de résolution des noms d’hôtes dans /etc/nsswitch.conf.',
  objectives: [
    'concevoir des architectures réseau virtuelles complètes interconnectant des namespaces isolés avec des paires veth et des ponts Linux ;',
    'maîtriser la suite d’administration réseau moderne iproute2 (ip link, ip addr, ip route, ip rule) ;',
    'comprendre le routage par politiques (Policy-Based Routing) et la gestion de tables de routage alternatives multiples ;',
    'configurer des règles d’aiguillage PBR basées sur l’adresse IP source, l’interface d’entrée ou le marquage pare-feu (fwmark) ;',
    'analyser la séquence de résolution de noms d’hôtes orchestrée par le commutateur de services de noms (NSSwitch) ;',
    'développer en Python 3 des validateurs de topologie réseau, des moteurs d’évaluation PBR et des simulateurs de résolution nsswitch.conf.'
  ],
  sections: [
    {
      title: 'Interfaces Virtuelles &amp; Interconnexion de Namespaces (veth &amp; bridge)',
      html: [
        '<p>Dans un environnement virtualisé ou conteneurisé sous Linux, le réseau est bâti avec des briques logicielles émulées par le noyau :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. Les Paires veth (Virtual Ethernet)</h4>',
        '    <p>Une <strong>paire veth</strong> est un câble réseau virtuel bidirectionnel doté de deux interfaces terminales (ex: <code>veth_host</code> et <code>veth_cnt</code>).</p>',
        '    <p>Tout paquet injecté par une extrémité émerge instantanément par l’autre. En déplaçant l’une des interfaces dans le namespace réseau d’un conteneur via <code>ip link set veth_cnt netns &lt;PID&gt;</code>, on établit la passerelle de communication avec l’hôte physique.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Le Pont Logiciel Linux (Bridge)</h4>',
        '    <p>Un <strong>pont Linux (bridge)</strong> opère comme un commutateur Ethernet de niveau 2 émulé dans le noyau (similaire à un switch matériel). Il apprend les adresses MAC et commute les trames entre toutes les interfaces esclaves qui lui sont rattachées.</p>',
        '    <p>La commande de création standard est :<br><code>ip link add name br0 type bridge &amp;&amp; ip link set br0 up</code>.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'La Suite iproute2 : L’Outillage Moderne du Réseau Linux',
      html: [
        '<p>Depuis plus d’une décennie, les commandes historiques <code>ifconfig</code>, <code>route</code> et <code>arp</code> (issues du paquet net-tools) sont officiellement <strong>obsolètes</strong> et incapables de gérer les namespaces ou les tables multiples. La suite <strong>iproute2</strong> dialogue directement avec le noyau via l’interface de socket Netlink :</p>',
        '<table class="table">',
        '  <thead>',
        '    <tr><th>Action Réseau</th><th>Commande Obsolète (À Proscrire)</th><th>Commande Moderne iproute2</th></tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr><td>Afficher les interfaces et MAC</td><td><code>ifconfig -a</code></td><td><code>ip link show</code></td></tr>',
        '    <tr><td>Assigner une adresse IP CIDR</td><td><code>ifconfig eth0 10.0.0.1 netmask 255.255.255.0</code></td><td><code>ip addr add 10.0.0.1/24 dev eth0</code></td></tr>',
        '    <tr><td>Consulter la table de routage</td><td><code>route -n</code> ou <code>netstat -rn</code></td><td><code>ip route show</code></td></tr>',
        '    <tr><td>Afficher le cache de voisins ARP</td><td><code>arp -n</code></td><td><code>ip neigh show</code></td></tr>',
        '    <tr><td>Créer une interface de tunnel veth</td><td>Impossible sans outils tiers</td><td><code>ip link add v0 type veth peer name v1</code></td></tr>',
        '  </tbody>',
        '</table>'
      ].join('\n')
    },
    {
      title: 'Routage par Politiques (PBR) &amp; Tables de Routage Multiples',
      html: [
        '<p>Le routage IP standard est strictement déterminé par l’adresse de destination (Destination Routing). Dans un serveur hébergeant plusieurs connexions Internet (Multi-WAN) ou des tunnels VPN, on doit acheminer les paquets selon l’<strong>adresse IP source</strong> ou le type de service : c’est le <strong>Policy-Based Routing (PBR)</strong>.</p>',
        box('standard', 'Architecture de la Routing Policy Database (RPDB)', [
          '<p>Linux consulte la base RPDB gérée via la commande <code>ip rule</code> par ordre de priorité croissante (de 0 à 32767). Dès qu’une règle correspond, le noyau utilise la table de routage indiquée :</p>',
          '<pre><code># 1. Creer une regle aiguillant une IP source vers une table dediee\nip rule add from 192.168.10.50 table 100 priority 100\n\n# 2. Definir la passerelle par defaut de cette table 100\nip route add default via 10.0.0.1 dev tun0 table 100\n\n# 3. Rafraichir le cache de routage du noyau\nip route flush cache</code></pre>',
          '<p>Les tables de routage peuvent être nommées de façon lisible dans le fichier <code>/etc/iproute2/rt_tables</code> (ex: <code>100 vpn_traffic</code>).</p>'
        ])
      ].join('\n')
    },
    {
      title: 'Architecture de Résolution de Noms : NSSwitch (/etc/nsswitch.conf)',
      html: [
        '<p>Lorsqu’une application appelle <code>getaddrinfo()</code> ou <code>gethostbyname()</code>, la bibliothèque glibc consulte le fichier de configuration <strong><code>/etc/nsswitch.conf</code></strong> pour déterminer l’ordre des sources :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Ordre Standard de Résolution</h4>',
        '    <pre><code># /etc/nsswitch.conf\nhosts: files dns myhostname</code></pre>',
        '    <ul>',
        '      <li><code>files</code> : Lit en priorité le fichier statique local <code>/etc/hosts</code>.</li>',
        '      <li><code>dns</code> : Interroge les serveurs DNS distants spécifiés dans <code>/etc/resolv.conf</code> (ou systemd-resolved).</li>',
        '      <li><code>myhostname</code> : Résout automatiquement le nom d’hôte local de la machine.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Critères de Continuité d’Évaluation</h4>',
        '    <p>Chaque source retourne un statut (<code>SUCCESS</code>, <code>NOTFOUND</code>, <code>UNAVAIL</code>, <code>TRYAGAIN</code>).</p>',
        '    <p>Par défaut, l’évaluation s’arrête dès le premier <code>SUCCESS</code>. Si une source répond <code>NOTFOUND</code>, glibc passe automatiquement à la source suivante de la liste.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],
  methodTitle: 'Méthode d’Ingénierie : Mise en Place d’un Réseau Isolé pour Conteneur avec Bridge',
  method: [
    'Étape 1 : Créer le pont virtuel Linux : ip link add name br0 type bridge && ip link set br0 up.',
    'Étape 2 : Assigner une passerelle IP au pont : ip addr add 172.20.0.1/24 dev br0.',
    'Étape 3 : Créer la paire d’interfaces veth : ip link add veth_host type veth peer name veth_cnt.',
    'Étape 4 : Rapprocher une extrémité sur le pont : ip link set veth_host master br0 && ip link set veth_host up.',
    'Étape 5 : Injecter l’autre extrémité dans le namespace du conteneur : ip link set veth_cnt netns <PID_CONTENEUR>.',
    'Étape 6 : Dans le conteneur, renommer l’interface en eth0, attribuer l’IP (172.20.0.10/24) et ajouter la route par défaut via 172.20.0.1.'
  ],
  summary: [
    'Une paire veth agit comme un câble Ethernet virtuel reliant deux espaces ou namespaces distincts.',
    'Un pont Linux (bridge) émule un switch de niveau 2 commutant les trames entre interfaces virtuelles esclaves.',
    'La suite iproute2 remplace totalement les vieux outils net-tools obsolètes (ifconfig, route, arp).',
    'Le routage classique ne tient compte que de la destination ; le Policy-Based Routing (PBR) aiguille selon la source ou le port.',
    'ip rule gère la base RPDB par ordre de priorité croissante pour sélectionner des tables de routage indépendantes.',
    '/etc/nsswitch.conf orchestre l’ordre de consultation des bases de noms (files /etc/hosts puis serveurs DNS).',
    'L’interconnexion de conteneurs sous Linux repose sur l’assemblage élégant de ces primitives noyau fondamentales.'
  ],
  checklist: [
    'Je sais expliquer le fonctionnement d’une paire veth et d’un pont logiciel Linux bridge.',
    'Je maîtrise les commandes essentielles de la suite iproute2 (ip link, ip addr, ip route, ip rule).',
    'Je comprends l’intérêt du Policy-Based Routing pour les architectures Multi-WAN et VPN.',
    'Je sais écrire une règle ip rule avec table alternative et niveau de priorité.',
    'Je connais la structure et l’ordre de résolution du fichier /etc/nsswitch.conf.',
    'Je sais comment interconnecter un namespace conteneur isolé avec le réseau physique de l’hôte.'
  ],
  notions: [
    'Interfaces virtuelles veth pairs',
    'Pont logiciel Linux (Bridge L2)',
    'Suite réseau iproute2 & sockets Netlink',
    'Policy-Based Routing (PBR / Routage par règles)',
    'Routing Policy Database (RPDB & ip rule)',
    'Tables de routage alternatives multiples',
    'Name Service Switch (NSSwitch /etc/nsswitch.conf)',
    'Interconnexion inter-namespaces réseau'
  ],
  pitfalls: [
    'Utiliser ifconfig ou route dans des scripts d’automatisation modernes (ils ignorent les tables multiples et namespaces).',
    'Oublier d’activer le pont avec ip link set br0 up (les interfaces esclaves ne recevront aucun paquet).',
    'Oublier de purger le cache de routage après une modification de politique via ip route flush cache.',
    'Créer des règles ip rule de même priorité avec des critères contradictoires (ordre d’évaluation indéterminé).'
  ],
  questions: [
    {
      stem: 'Quel composant réseau virtuel Linux fonctionne comme un câble Ethernet virtuel reliant deux namespaces ?',
      opts: [
        'Une interface loopback lo',
        'Une paire d’interfaces virtuelles veth (veth pair)',
        'Un disque LVM',
        'Un socket Unix'
      ],
      correct: 1,
      exp: 'Une paire veth est constituée de deux interfaces liées : tout paquet entrant par une extrémité ressort instantanément par l’autre, reliant physiquement deux namespaces distincts.'
    },
    {
      stem: 'Quelle commande moderne de la suite iproute2 remplace la commande obsolète « ifconfig eth0 192.168.1.10 netmask 255.255.255.0 » ?',
      opts: [
        'ip netmask set 192.168.1.10/24 dev eth0',
        'ip addr add 192.168.1.10/24 dev eth0',
        'ip link ip 192.168.1.10/24 dev eth0',
        'route add 192.168.1.10/24 dev eth0'
      ],
      correct: 1,
      exp: 'ip addr add <IP/CIDR> dev <interface> est la syntaxe standard et universelle de la suite iproute2 pour configurer une adresse IP.'
    },
    {
      stem: 'Quelle est la différence fondamentale entre le routage IP classique et le Policy-Based Routing (PBR) ?',
      opts: [
        'Le routage classique utilise le Wi-Fi et PBR utilise la fibre',
        'Le routage classique ne regarde que l’IP destination, alors que le PBR peut aiguiller les paquets selon l’IP source, le port ou l’interface vers des tables multiples',
        'Le PBR ne fonctionne que sur les conteneurs Docker',
        'Le routage classique nécessite obligatoirement BGP'
      ],
      correct: 1,
      exp: 'Le Policy-Based Routing (PBR) permet de choisir la table de routage et la passerelle en fonction de critères multiples (adresse source, port, protocole), surpassant le routage traditionnel basé sur la seule destination.'
    },
    {
      stem: 'Quelle commande permet de consulter les règles de politiques de routage ordonnées par priorité sous Linux ?',
      opts: [
        'ip rule show',
        'iptables -L',
        'route print',
        'cat /proc/net/routes'
      ],
      correct: 0,
      exp: 'ip rule show (ou ip rule list) affiche la table RPDB avec les priorités numériques et les tables de routage associées.'
    },
    {
      stem: 'Dans quel fichier système l’ordre de résolution des noms d’hôtes (files vs dns) est-il formellement déclaré ?',
      opts: [
        '/etc/resolv.conf',
        '/etc/hosts',
        '/etc/nsswitch.conf',
        '/etc/network/interfaces'
      ],
      correct: 2,
      exp: '/etc/nsswitch.conf (Name Service Switch) spécifie l’ordre dans lequel la glibc consulte les différentes sources (ex: hosts: files dns).'
    },
    {
      stem: 'À quelle couche du modèle OSI un pont logiciel Linux (Linux Bridge) opère-t-il ?',
      opts: [
        'Couche 1 (Physique)',
        'Couche 2 (Liaison de données / Ethernet)',
        'Couche 3 (Réseau / IP)',
        'Couche 7 (Application)'
      ],
      correct: 1,
      exp: 'Un pont Linux fonctionne comme un switch Ethernet en couche 2 (Liaison) : il commute les trames d’après leur adresse MAC.'
    },
    {
      stem: 'Pourquoi est-il nécessaire d’exécuter « ip route flush cache » après avoir modifié des règles de routage sous Linux ?',
      opts: [
        'Pour vider la mémoire tampon du disque dur',
        'Pour purger le cache de routage du noyau et forcer la réévaluation immédiate des nouvelles politiques',
        'Pour redémarrer le démon DNS',
        'Pour supprimer les adresses IP statiques'
      ],
      correct: 1,
      exp: 'Le noyau met en cache les décisions de routage pour accélérer le débit. Purger le cache garantit que les nouveaux flux empruntent immédiatement les règles modifiées.'
    },
    {
      stem: 'Comment déplacer une interface réseau virtuelle « veth1 » dans le namespace réseau d’un processus ayant le PID 4200 ?',
      opts: [
        'ip link set veth1 netns 4200',
        'mv /sys/class/net/veth1 /proc/4200/',
        'nsenter -t 4200 move veth1',
        'ip route move veth1 to 4200'
      ],
      correct: 0,
      exp: 'ip link set <iface> netns <PID> transfère immédiatement l’interface dans le namespace réseau du processus spécifié.'
    }
  ],
  flashcards: [
    {
      q: 'Qu’est-ce qu’une paire veth sous Linux ?',
      a: 'Un câble virtuel Ethernet bidirectionnel reliant deux namespaces réseau distincts à travers deux interfaces virtuelles appairées.'
    },
    {
      q: 'Quel est le rôle d’un pont logiciel Linux bridge ?',
      a: 'Émuler un commutateur Ethernet de couche 2 commutant les trames entre plusieurs interfaces virtuelles esclaves.'
    },
    {
      q: 'Pourquoi les commandes net-tools (ifconfig, route) sont-elles obsolètes ?',
      a: 'Parce qu’elles ne supportent ni les namespaces, ni les tables de routage multiples, ni les primitives réseau modernes de netlink.'
    },
    {
      q: 'Qu’est-ce que le Policy-Based Routing (PBR) ?',
      a: 'Un mécanisme d’aiguillage réseau utilisant des critères variés (IP source, port, protocole) via ip rule pour choisir une table de routage spécifique.'
    },
    {
      q: 'À quoi sert le fichier /etc/nsswitch.conf ?',
      a: 'À définir l’ordre dans lequel le système consulte les sources de données (fichiers locaux, DNS, LDAP) pour résoudre hôtes et utilisateurs.'
    },
    {
      q: 'Quelle commande affiche la base des règles de routage PBR ?',
      a: 'ip rule show, listant les règles par ordre de priorité croissante.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Utilisation persistante de ifconfig/route ou incompréhension du fonctionnement des paires veth.'
    },
    {
      cls: 'medium',
      text: 'Bonne maîtrise de la suite iproute2, création de bridges et configuration de règles PBR simples.'
    },
    {
      cls: 'high',
      text: 'Conception experte de topologies réseau de conteneurs, routage multi-tables complexe et maîtrise approfondie des interactions Netlink/NSSwitch.'
    }
  ]
};
