/**
 * Chapitre 4 du cours « Google Cloud Platform B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 4,
  title: 'Réseau Virtuel VPC, Routage, Sécurité & Répartiteurs de Charge',
  short: 'Réseau VPC &amp; Load Balancing',
  toc: 'Virtual Private Cloud (VPC) mondial et mode sous-réseaux personnalisé (Custom Subnet Mode), plan d\'adressage CIDR et les 4 adresses IP réservées par Google, passerelle Cloud NAT, règles de pare-feu VPC avec état (priorités et Network Tags), interconnexions (VPC Peering, Cloud VPN, Cloud Interconnect) et répartiteurs de charge mondiaux Anycast (Global External HTTP(S) Load Balancer, URL Maps, Cloud Armor et Cloud CDN).',
  time: '≈ 2 h 45 de travail',
  free: false,
  situation: 'Contrairement aux datacenters traditionnels ou à d\'autres fournisseurs de cloud où les réseaux virtuels sont cantonnés à une seule région géographique, Google Cloud repose sur un réseau logiciel mondial (SDN Andromeda). Un VPC Google Cloud s\'étend nativement à travers le monde entier. Cette puissance architecturale exige cependant une rigueur absolue dans la conception des plans d\'adressage CIDR, l\'application des règles de pare-feu et la configuration des répartiteurs de charge Anycast. En tant qu\'ingénieur réseau Cloud B3, vous devez concevoir des topologies VPC résilientes et sécurisées, calculer les plages d\'adresses avec précision et acheminer le trafic mondial avec Cloud Load Balancing.',
  objectives: [
    'comprendre l\'architecture mondiale d\'un VPC Google Cloud (réseau global à sous-réseaux régionaux) ;',
    'concevoir un plan d\'adressage CIDR en mode personnalisé et calculer les 4 adresses IP réservées par sous-réseau ;',
    'configurer la passerelle Cloud NAT pour permettre les sorties Internet des VMs privées sans IP publique ;',
    'maîtriser les règles de pare-feu VPC avec état : priorités de 0 à 65535, protocoles, ports et ciblage par Network Tags ;',
    'différencier les interconnexions réseau : VPC Peering, Cloud VPN IPsec et Cloud Interconnect dédié ;',
    'développer en Python 3 des calculateurs de sous-réseaux VPC, des évaluateurs de pare-feu et des simulateurs de répartiteurs de charge Anycast.'
  ],
  sections: [
    {
      title: 'Architecture du VPC Google Cloud : Réseau Global &amp; Sous-Réseaux Régionaux',
      html: [
        '<p>Le réseau VPC (Virtual Private Cloud) de Google Cloud est une abstraction logicielle bâtie sur le SDN mondial de Google (Andromeda). Contrairement aux clouds traditionnels où un VPC est enfermé dans une région, <strong>un VPC Google Cloud est mondial</strong> :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Modes de Création d\'un VPC</h4>',
        '    <ul>',
        '      <li><strong>Mode Automatique (Auto Mode) :</strong> crée automatiquement un sous-réseau avec un préfixe <code>/20</code> prédéfini dans chaque région du monde. Pratique pour les tests, mais <span style="color:#b91c1c;font-weight:700;">PROSCRIT EN PRODUCTION</span> en raison de chevauchements d\'adresses potentiels.</li>',
        '      <li><strong>Mode Personnalisé (Custom Mode) :</strong> aucun sous-réseau par défaut. L\'architecte contrôle totalement la création de chaque sous-réseau régional et choisit ses plages d\'adresses IP privées (RFC 1918 : <code>10.0.0.0/8</code>, <code>172.16.0.0/12</code>, <code>192.168.0.0/16</code>).</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Les 4 Adresses IP Réservées par Google</h4>',
        '    <p>Chaque sous-réseau VPC réserve obligatoirement 4 adresses IP non attribuables aux machines :</p>',
        '    <ul>',
        '      <li><code>.0</code> : Adresse réseau (Network)</li>',
        '      <li><code>.1</code> : Passerelle par défaut du sous-réseau (Default Gateway)</li>',
        '      <li><code>.2</code> : Réservé par Google (serveur DNS interne)</li>',
        '      <li><code>.255</code> (dernière du bloc) : Réservé par Google (diffusion/broadcast)</li>',
        '    </ul>',
        '    <p><strong>Formule des adresses utilisables :</strong> <code>2^(32 - prefix) - 4</code>.</p>',
        '  </div>',
        '</div>',
        box('standard', 'Cloud NAT : Sortie Internet Sécurisée sans IP Publique', [
          '<p>Par défaut, une VM sans adresse IP externe ne peut pas accéder à Internet pour télécharger des mises à jour d\'OS ou des packages. Assigner une IP publique à chaque VM expose le serveur à des scans malveillants. <strong>Cloud NAT</strong> est un service managé hautement disponible qui permet aux instances privées d\'émettre du trafic vers Internet (requêtes sortantes) tout en bloquant strictement toute connexion initiée depuis l\'extérieur.</p>'
        ])
      ].join('\n')
    },
    {
      title: 'Règles de Pare-Feu VPC (Firewall Rules) : Priorités &amp; Tags Réseau',
      html: [
        '<p>Le pare-feu Google Cloud est distribué au niveau du noyau de l\'hyperviseur sur chaque VM. Il est <strong>avec état (stateful)</strong> : si un paquet entrant est autorisé, le trafic de réponse retour est automatiquement autorisé quelle que soit la règle de sortie :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Composants d\'une Règle de Pare-feu</h4>',
        '    <ul>',
        '      <li><strong>Direction :</strong> <code>INGRESS</code> (flux entrant) ou <code>EGRESS</code> (flux sortant).</li>',
        '      <li><strong>Priorité :</strong> entier de <code>0</code> à <code>65535</code>. La priorité la plus faible est évaluée en premier (la règle 100 l\'emporte sur la règle 1000).</li>',
        '      <li><strong>Action :</strong> <code>ALLOW</code> ou <code>DENY</code>. Dès qu\'une règle correspond, l\'évaluation s\'arrête.</li>',
        '      <li><strong>Cibles (Targets) :</strong> <em>Toutes les instances</em>, <em>Network Tags</em> (ex: <code>http-server</code>) ou <em>Comptes de service</em> (recommandé pour une sécurité basée sur l\'identité).</li>',
        '      <li><strong>Filtres :</strong> plages IP sources (CIDR), protocoles (TCP, UDP, ICMP) et ports.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Règles Implicites par Défaut</h4>',
        '    <p>Tout VPC contient deux règles implicites immuables de priorité <code>65535</code> :</p>',
        '    <ul>',
        '      <li><strong>Allow Egress (65535) :</strong> tout le trafic sortant est autorisé par défaut vers toutes les destinations.</li>',
        '      <li><strong>Deny Ingress (65535) :</strong> tout le trafic entrant est bloqué par défaut.</li>',
        '    </ul>',
        '    <p>Pour autoriser un flux entrant (ex: HTTPS sur le port 443), vous devez obligatoirement créer une règle explicite de priorité &lt; 65535.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Interconnexions Réseau : VPC Peering, Cloud VPN &amp; Interconnect',
      html: [
        '<p>Pour interconnecter plusieurs VPC Google Cloud ou raccorder l\'infrastructure Cloud aux datacenters sur site (on-premises), Google propose trois solutions :</p>',
        '<div class="grid grid-3">',
        '  <div class="card">',
        '    <h4>VPC Network Peering</h4>',
        '    <ul>',
        '      <li>Relie deux réseaux VPC (même projet ou projets différents/organisations différentes).</li>',
        '      <li>Trafic routé sur le réseau privé Google en gigabits sans latence de passerelle.</li>',
        '      <li><strong>Non transitif :</strong> si A est appairé avec B et B avec C, A ne communique pas avec C.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Cloud VPN (IPsec)</h4>',
        '    <ul>',
        '      <li>Tunnels chiffrés IPsec IKEv2 sur l\'Internet public.</li>',
        '      <li><strong>HA VPN :</strong> haute disponibilité avec SLA 99.99%, utilise deux interfaces et <strong>Cloud Router</strong> avec le protocole dynamique BGP.</li>',
        '      <li>Débit jusqu\'à 3 Gbps par tunnel.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Cloud Interconnect</h4>',
        '    <ul>',
        '      <li>Liaison physique filaire directe dédiée entre le datacenter de l\'entreprise et un PoP Google.</li>',
        '      <li><strong>Dedicated :</strong> circuits 10 Gbps ou 100 Gbps.</li>',
        '      <li><strong>Partner :</strong> souscription via un opérateur télécom (Orange, Equinix) de 50 Mbps à 10 Gbps.</li>',
        '      <li>Idéal pour les transferts de téraoctets critiques sans passer par Internet.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Cloud Load Balancing : Architecture Anycast Mondiale &amp; URL Maps',
      html: [
        '<p>Le répartiteur de charge externe de Google Cloud (Global External HTTP(S) Load Balancer) est une prouesse d\'ingénierie basée sur le système Maglev de Google :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Routage Mondial Anycast</h4>',
        '    <ul>',
        '      <li>Une <strong>adresse IP publique unique</strong> (IPv4 et IPv6) annoncée mondialement par BGP sur tous les PoP edge de Google.</li>',
        '      <li>L\'utilisateur est connecté au PoP le plus proche géographiquement. Le handshake TCP et la terminaison TLS s\'effectuent à la périphérie (Edge).</li>',
        '      <li>Le trafic est ensuite acheminé vers le backend régional le plus proche disposant de capacité disponible via la fibre privée Google.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Chaîne de Composants du Load Balancer</h4>',
        '    <ol>',
        '      <li><strong>Global Forwarding Rule :</strong> intercepte le trafic sur l\'IP Anycast (ports 80 / 443).</li>',
        '      <li><strong>Target HTTP(S) Proxy :</strong> déchiffre le TLS avec les certificats SSL managés par Google.</li>',
        '      <li><strong>URL Map :</strong> table de routage qui analyse l\'hôte (<code>Host</code>) et le chemin (<code>Path</code>) de la requête.</li>',
        '      <li><strong>Backend Service :</strong> supervise les groupes de serveurs (MIG ou NEG Cloud Run) via un Health Check et répartit les requêtes.</li>',
        '    </ol>',
        '  </div>',
        '</div>',
        box('tip', 'Protection Périmétrique avec Cloud Armor', [
          '<p>Directement branché sur le Global HTTP(S) Load Balancer, <strong>Google Cloud Armor</strong> protège les applications contre les attaques DDoS massives (absorbant des dizaines de millions de requêtes par seconde) et intègre un Web Application Firewall (WAF) avec les règles gérées de l\'OWASP Top 10 (injections SQL, XSS, bots).</p>'
        ])
      ].join('\n')
    }
  ],
  method: [
    'Conception du plan d\'adressage VPC en mode personnalisé : bannir le mode automatique, définir des plages IP privées RFC 1918 non chevauchantes et intégrer les 4 adresses réservées par sous-réseau.',
    'Sécurisation des accès Internet via Cloud NAT : déployer des VMs sans adresses IP externes et configurer Cloud NAT sur le routeur régional Cloud Router pour les sorties.',
    'Stratégie de filtrage de pare-feu basée sur les Network Tags : créer des règles d\'autorisation de priorité stricte ciblant des étiquettes sémantiques plutôt que des adresses IP individuelles volatiles.',
    'Mise en œuvre du Load Balancing Anycast avec URL Map : configurer la terminaison TLS edge, segmenter les chemins applicatifs (/api/* vers le backend API) et activer la protection Cloud Armor.'
  ],
  summary: [
    'Un réseau VPC Google Cloud est mondial par défaut, composé de sous-réseaux régionaux indépendants.',
    'Chaque sous-réseau réserve 4 adresses IP (.0, .1, .2 et .255), ramenant le nombre d\'hôtes disponibles à 2^(32-prefix) - 4.',
    'Cloud NAT permet aux instances privées d\'accéder à Internet en toute sécurité sans exposer d\'adresses IP publiques.',
    'Les règles de pare-feu VPC sont avec état, ordonnées par priorité de 0 à 65535, et bloquent les entrées par défaut via la règle 65535.',
    'Le Global External HTTP(S) Load Balancer utilise une IP Anycast mondiale pour terminer le trafic au plus près des utilisateurs et le router via une URL Map.'
  ],
  checklist: [
    'Savez-vous calculer les adresses utilisables d\'un sous-réseau en excluant les 4 IP réservées par Google ?',
    'Comprenez-vous pourquoi le mode VPC personnalisé (Custom Mode) est obligatoire en entreprise ?',
    'Savez-vous expliquer le fonctionnement d\'une règle de pare-feu avec état (Stateful) ?',
    'Connaissez-vous l\'ordre d\'évaluation des priorités de pare-feu (0 est plus prioritaire que 1000) ?',
    'Pouvez-vous décrire le rôle de l\'IP Anycast et de l\'URL Map dans un répartiteur de charge Cloud Load Balancing ?'
  ],
  notions: [
    { term: 'Virtual Private Cloud (VPC)', def: 'Réseau virtuel privé mondial logiciel (SDN) fournissant connectivité et isolation aux ressources Google Cloud.' },
    { term: 'Cloud NAT', def: 'Service managé fournissant la traduction d\'adresses réseau pour permettre aux instances privées d\'émettre vers Internet sans IP externe.' },
    { term: 'Règle de Pare-feu VPC', def: 'Règle de filtrage distribuée avec état contrôlant le trafic entrant et sortant selon les priorités, protocoles, ports et tags.' },
    { term: 'VPC Network Peering', def: 'Interconnexion privée directe et non transitive reliant deux réseaux VPC distincts à très haute vitesse sans passerelle.' },
    { term: 'URL Map', def: 'Composant de routage du Load Balancer Google Cloud acheminant le trafic vers différents services backend selon l\'hôte et le chemin HTTP.' }
  ],
  pitfalls: [
    'Créer un VPC en mode automatique en entreprise : les sous-réseaux par défaut dans toutes les régions finissent par entrer en conflit avec les réseaux sur site lors d\'un VPN.',
    'Assigner des adresses IP publiques externes à des bases de données ou des serveurs d\'application internes au lieu d\'utiliser des sous-réseaux privés avec Cloud NAT.',
    'Créer une règle de pare-feu trop permissive avec source 0.0.0.0/0 sur le port SSH 22 ou RDP 3389, exposant les VMs à des attaques par force brute immédiates.',
    'Penser que le VPC Peering est transitif (croire que si A est lié à B et B à C, alors A accède à C sans lien direct).'
  ],
  questions: [
    {
      stem: 'Combien d\'adresses IP sont utilisables pour assigner à des machines virtuelles dans un sous-réseau Google Cloud VPC avec un masque /24 (256 adresses totales) ?',
      opts: ['256', '254', '252', '250'],
      correct: 2,
      exp: 'Google Cloud réserve obligatoirement 4 adresses IP par sous-réseau (.0 réseau, .1 passerelle, .2 DNS interne, .255 broadcast). Il reste donc 256 - 4 = 252 adresses IP assignables.'
    },
    {
      stem: 'Dans le pare-feu Google Cloud VPC, entre une règle A de priorité 100 qui refuse le port 22 et une règle B de priorité 1000 qui autorise tous les ports, quelle règle s\'applique pour le port 22 ?',
      opts: ['La règle B (1000) car elle est plus permissive', 'La règle A (100) car les priorités les plus petites sont évaluées en premier', 'Les deux règles s\'annulent', 'La règle la plus récente créée'],
      correct: 1,
      exp: 'Dans Google Cloud, les priorités de pare-feu vont de 0 à 65535, et les chiffres les plus petits sont les plus prioritaires. La règle de priorité 100 s\'applique donc avant celle de priorité 1000.'
    },
    {
      stem: 'Quel service managé permet à des machines virtuelles sans adresse IP publique d\'accéder à Internet pour télécharger des mises à jour de sécurité ?',
      opts: ['Cloud Interconnect', 'Cloud NAT', 'Cloud CDN', 'Cloud Armor'],
      correct: 1,
      exp: 'Cloud NAT fournit la traduction d\'adresses réseau sortante sécurisée sans attribuer d\'adresses IP externes aux VMs, empêchant toute intrusion directe depuis l\'extérieur.'
    },
    {
      stem: 'Dans un Global External HTTP(S) Load Balancer Google Cloud, quel composant inspecte le chemin de la requête (/api/* ou /images/*) pour router vers le bon backend ?',
      opts: ['La Global Forwarding Rule', 'Le Target HTTPS Proxy', 'L\'URL Map', 'Le Cloud Router'],
      correct: 2,
      exp: 'L\'URL Map est la table de correspondance qui analyse les noms d\'hôtes et les préfixes d\'URL pour acheminer les flux vers les différents Backend Services.'
    },
    {
      stem: 'Deux réseaux VPC A et B sont interconnectés par VPC Peering. B est également interconnecté par VPC Peering avec C. A peut-il communiquer avec C sans lien supplémentaire ?',
      opts: ['Oui, le peering est toujours transitif', 'Non, le VPC Peering n\'est pas transitif dans Google Cloud', 'Oui, uniquement si le protocole BGP est activé', 'Oui, si les deux VPC sont dans la même région'],
      correct: 1,
      exp: 'Le VPC Network Peering dans Google Cloud est strictement non transitif : pour que A communique avec C, un lien de peering direct entre A et C doit être explicitement créé.'
    }
  ],
  flashcards: [
    {
      q: 'Quelle est la portée géographique d\'un réseau VPC Google Cloud ?',
      a: 'Un VPC Google Cloud est mondial, composé de sous-réseaux régionaux indépendants.'
    },
    {
      q: 'Combien d\'adresses IP sont réservées dans un sous-réseau VPC GCP et lesquelles ?',
      a: '4 adresses : .0 (réseau), .1 (passerelle), .2 (DNS Google), .255 (diffusion).'
    },
    {
      q: 'Quel est le rôle de Cloud NAT ?',
      a: 'Permettre aux VMs privées sans IP publique d\'émettre vers Internet de façon sécurisée.'
    },
    {
      q: 'Comment sont ordonnées les règles de pare-feu VPC dans Google Cloud ?',
      a: 'Par priorité de 0 à 65535 ; la règle avec le nombre le plus petit s\'applique en premier.'
    },
    {
      q: 'Qu\'est-ce que le routage Anycast dans Cloud Load Balancing ?',
      a: 'Une seule IP publique mondiale annoncée sur tous les PoP edge pour terminer les connexions au plus près de l\'utilisateur.'
    },
    {
      q: 'Quelle est la limitation majeure du VPC Network Peering ?',
      a: 'Il est strictement non transitif : l\'appairage de A avec B et de B avec C ne connecte pas A à C.'
    }
  ],
  mastery: [
    {
      title: 'Conception de topologies VPC mondiales personnalisées',
      desc: 'Définir des plans d\'adressage CIDR étanches et calculer les adresses disponibles en tenant compte des réservations.'
    },
    {
      title: 'Sécurisation périmétrique et pare-feu distribué',
      desc: 'Écrire des règles de pare-feu basées sur les priorités et les Network Tags pour verrouiller les flux d\'infrastructure.'
    },
    {
      title: 'Configuration de sorties Internet sécurisées via Cloud NAT',
      desc: 'Déployer Cloud Router et Cloud NAT pour éliminer les IP publiques superflues sur les serveurs applicatifs.'
    },
    {
      title: 'Déploiement de répartiteurs de charge Anycast et URL Maps',
      desc: 'Concevoir des architectures de routage HTTP(S) mondial avec certificats managés et dissociation des backends.'
    },
    {
      title: 'Interconnexion de réseaux hybrides et Cloud VPN HA',
      desc: 'Configurer des tunnels IPsec redondants avec BGP dynamique pour garantir une connectivité d\'entreprise résiliente.'
    }
  ]
};
