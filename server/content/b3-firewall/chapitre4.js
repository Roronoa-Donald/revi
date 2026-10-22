/**
 * Chapitre 4 du cours « Firewall & Sécurité Réseau B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 4,
  title: 'Architectures Réseau Sécurisées, Zone Démilitarisée (DMZ) &amp; Bastions',
  short: 'Architectures DMZ &amp; Bastions',
  toc: 'Zone Démilitarisée (DMZ), règle cardinale inter-zones, topologies pare-feu (Dual-Homed, Triple-Homed, Back-to-Back en cascade), hôtes de rebond et bastions SSH d’administration.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B3 et plus',
  situation: 'Déployer un pare-feu sans concevoir une topologie réseau adaptée est illusoire : si tous les serveurs de l’entreprise cohabitent sur le même segment que les postes des collaborateurs, la moindre faille sur un site web public livre l’intégralité du système d’information aux attaquants. C’est pourquoi l’ingénierie réseau de niveau Bachelor 3 repose sur le cloisonnement en zones de sécurité et le concept fondamental de Zone Démilitarisée (DMZ). La règle cardinale de sécurité réseau interdit formellement à un serveur situé en DMZ d’initier une connexion vers le réseau interne LAN. De plus, selon le niveau d’exigence et le budget de l’organisation, l’architecture peut s’appuyer sur un pare-feu unique à trois interfaces (Triple-Homed) ou sur deux pare-feux distincts de constructeurs différents en cascade (Back-to-Back). Enfin, l’accès d’administration doit impérativement transiter par un bastion SSH durci.',
  objectives: [
    'concevoir une architecture réseau étanche articulant zones LAN, DMZ et WAN ;',
    'appliquer rigoureusement la règle d’or de la DMZ interdisant tout flux initié de la DMZ vers le LAN interne ;',
    'comparer les avantages et limites des topologies Dual-Homed, Triple-Homed et Back-to-Back ;',
    'justifier la défense en profondeur par l’hétérogénéité des constructeurs de pare-feux en cascade ;',
    'mettre en œuvre des passerelles d’administration sécurisées via des hôtes bastions (Jump Hosts) avec MFA ;',
    'analyser et résoudre méthodologiquement des auditeurs de conformité DMZ, des évaluateurs de résilience de topologie et des contrôleurs de bastion.'
  ],
  sections: [
    {
      title: 'Le Concept de Zone Démilitarisée (DMZ) &amp; la Règle Cardinal de Sécurité',
      html: [
        '<p>La <strong>Zone Démilitarisée (DMZ)</strong> est un sous-réseau tampon intermédiaire dédié à l’hébergement des services d’entreprise accessibles depuis l’extérieur (serveurs web, messagerie SMTP, DNS faisant autorité, proxies inverses) :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Objectif Stratégique</h4>',
        '    <p>Isoler les serveurs publics pour contenir toute intrusion. Si un attaquant exploite une vulnérabilité logicielle (ex: injection SQL ou exécution de code à distance) sur le serveur web en DMZ, il se retrouve confiné dans ce sous-réseau et ne peut pas accéder aux bases de données internes, aux contrôleurs de domaine Active Directory ni aux postes clients.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>La Règle d’Or Absolue</h4>',
        '    <p><strong>Aucune session ne doit jamais pouvoir être initiée depuis la DMZ vers le réseau interne LAN.</strong></p>',
        '    <p>Seuls les paquets de retour (état <code>ESTABLISHED</code>) répondant à des requêtes légitimement initiées par le LAN vers la DMZ sont admis. Toute tentative d’ouverture (<code>SYN</code>) depuis la DMZ vers le LAN déclenche une alerte de compromission critique.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Topologies Pare-feux : Dual-Homed, Triple-Homed &amp; Back-to-Back',
      html: [
        '<p>Le choix de l’implantation physique ou virtuelle des pare-feux conditionne la résilience globale du périmètre :</p>',
        '<div class="grid grid-3">',
        '  <div class="card">',
        '    <h4>1. Dual-Homed (2 interfaces)</h4>',
        '    <p>1 pare-feu reliant uniquement le LAN et le WAN. Pas de DMZ. Les serveurs sont soit exposés directement sur le LAN, soit hébergés chez un tiers. Résilience faible (4/10) : tout serveur interne compromis expose l’ensemble du réseau.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Triple-Homed (3 interfaces)</h4>',
        '    <p>1 pare-feu à trois pattes interconnectant LAN, DMZ et WAN. Économique et simple à maintenir. Résilience moyenne (7/10) : présente un point unique de défaillance matériel et logiciel (SPOF).</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>3. Back-to-Back (Cascade)</h4>',
        '    <p>2 pare-feux distincts encadrant la DMZ (« sandwich »). Le pare-feu externe filtre WAN -> DMZ ; le pare-feu interne filtre DMZ -> LAN. Résilience maximale (9/10) avec constructeurs hétérogènes.</p>',
        '  </div>',
        '</div>',
        box('standard', 'L’Atout Majeur de l’Hétérogénéité des Constructeurs en Back-to-Back', [
          '<p>En choisissant deux équipements de constructeurs concurrents (par exemple un pare-feu Fortinet FortiGate en frontal et un pare-feu Palo Alto Networks ou Cisco Secure Firewall en interne) :</p>',
          '<ul>',
          '  <li>Si une vulnérabilité zero-day non corrigée ou un bogue de firmware touche le premier pare-feu, le second équipement n’en est pas affecté.</li>',
          '  <li>L’attaquant doit réussir deux exploits techniques totalement indépendants sur deux systèmes d’exploitation différents pour atteindre le réseau cœur d’entreprise. C’est le sommet de la <strong>défense en profondeur</strong>.</li>',
          '</ul>'
        ])
      ].join('\n')
    },
    {
      title: 'Passerelles d’Administration Sécurisées : Bastions SSH &amp; Jump Hosts',
      html: [
        '<p>L’accès d’administration aux équipements et serveurs critiques (zone PROD) ne doit jamais être direct depuis les postes de travail bureautiques :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Architecture Bastion SSH (Jump Host)</h4>',
        '    <ul>',
        '      <li>Tout accès SSH (port 22) ou RDP (port 3389) direct du LAN vers la PROD est formellement bloqué par le pare-feu.</li>',
        '      <li>L’administrateur doit obligatoirement se connecter en premier lieu au <strong>Bastion d’administration</strong> situé dans une zone d’administration dédiée (ADM).</li>',
        '      <li>Le bastion exige une authentification forte multifacteur (MFA) et enregistre l’intégralité des frappes clavier et sessions pour traçabilité médico-légale.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Rebond Contrôlé vers la Production</h4>',
        '    <ul>',
        '      <li>Seul le bastion dispose de règles de filtrage lui permettant d’ouvrir une session SSH vers les serveurs de production.</li>',
        '      <li>Les clés privées SSH critiques restent stockées sur le bastion ou sur une clé de sécurité matérielle (FIDO2/YubiKey) et ne quittent jamais le périmètre d’administration.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],
  methodTitle: 'Démarche d’Ingénierie &amp; de Déploiement d’une Zone DMZ',
  method: [
    '1. Définir le plan d’adressage IP distinct pour chaque zone (ex: LAN 192.168.10.0/24, DMZ 172.16.50.0/24, ADM 10.100.0.0/24).',
    '2. Déclarer les interfaces physiques ou VLANs dédiés sur le pare-feu avec leurs profils de sécurité respectifs.',
    '3. Rédiger la politique WAN -> DMZ en limitant strictement l’accès aux ports de publication indispensables (80, 443, 53, 25).',
    '4. Rédiger la politique LAN -> DMZ pour permettre aux utilisateurs et services internes de consommer les applications de la DMZ.',
    '5. Interdire formellement et journaliser avec alerte critique toute tentative de connexion initiée depuis la DMZ vers le LAN.',
    '6. Déployer un Bastion SSH dans un segment d’administration étanche pour centraliser et tracer tous les accès aux serveurs.'
  ],
  summary: [
    'La DMZ isole les serveurs publics d’Internet du reste du réseau d’entreprise pour limiter l’impact d’une intrusion.',
    'Règle cardinale DMZ : aucune session ne doit être initiée de la DMZ vers le réseau interne LAN.',
    'L’architecture Triple-Homed est économique mais présente un point unique de défaillance (SPOF).',
    'L’architecture Back-to-Back à double pare-feu hétérogène offre la défense en profondeur la plus résiliente.',
    'Les bastions SSH (Jump Hosts) sécurisent l’administration des serveurs critiques avec MFA et audit de session.'
  ],
  checklist: [
    'Le rôle et la justification sécuritaire de la DMZ sont compris.',
    'La règle d’or interdisant les flux DMZ vers LAN est intégrée et respectée.',
    'Les trois topologies (Dual-Homed, Triple-Homed, Back-to-Back) sont maîtrisées.',
    'L’intérêt de l’hétérogénéité des constructeurs en cascade est assimilé.',
    'Le fonctionnement d’un Bastion SSH d’administration avec MFA est compris.',
    'Les 3 études de cas pratiques et méthodologiques (fw3-c4-e1 à fw3-c4-e3) sont validés.'
  ],
  notions: [
    'Zone Démilitarisée (DMZ)',
    'Règle d’or des flux DMZ vers LAN',
    'Topologie Dual-Homed',
    'Topologie Triple-Homed',
    'Architecture Back-to-Back',
    'Hétérogénéité des constructeurs',
    'Bastion d’administration (Jump Host)',
    'Authentification multifacteur (MFA)'
  ],
  pitfalls: [
    'Autoriser une connexion initiée par la DMZ vers le LAN sous prétexte qu’un serveur web doit interroger directement la base de données interne.',
    'Mettre tous les serveurs en DMZ sans distinguer les serveurs publics (web) des serveurs critiques (bases de données clients).',
    'Utiliser le même mot de passe d’administration sur le pare-feu frontal et le pare-feu interne.',
    'Permettre des accès SSH directs depuis les postes bureautiques vers la production sans passer par le bastion d’administration.'
  ],
  questions: [
    {
      stem: 'Quelle est la règle d’or absolue concernant les flux réseau entre la DMZ et le réseau local interne LAN ?',
      opts: [
        'Aucune connexion ne doit jamais être initiée depuis la DMZ vers le LAN',
        'Le LAN ne doit jamais pouvoir accéder à la DMZ',
        'Tous les flux entre DMZ et LAN doivent être configurés en protocole UDP',
        'Les serveurs DMZ doivent partager les mêmes adresses IP que les postes LAN'
      ],
      correct: 0,
      exp: 'Si un serveur web en DMZ est piraté, l’interdiction d’initier des flux vers le LAN l’empêche de pivoter vers le réseau interne d’entreprise.'
    },
    {
      stem: 'Quel est l’inconvénient principal d’une architecture pare-feu Triple-Homed (un seul boîtier à trois interfaces) ?',
      opts: [
        'Le pare-feu constitue un point unique de défaillance matériel et logiciel (SPOF)',
        'Elle ne permet pas de naviguer sur Internet en HTTPS',
        'Elle exige obligatoirement trois adresses IP publiques différentes',
        'Elle est incompatible avec le protocole TCP'
      ],
      correct: 0,
      exp: 'Si le boîtier unique tombe en panne ou subit une faille de sécurité majeure, l’ensemble des trois zones (LAN, DMZ, WAN) est impacté.'
    },
    {
      stem: 'Pourquoi recommande-t-on d’utiliser deux constructeurs différents dans une architecture pare-feu Back-to-Back en cascade ?',
      opts: [
        'Pour qu’une vulnérabilité zero-day touchant le pare-feu frontal n’impacte pas le pare-feu interne (défense en profondeur)',
        'Pour diviser par deux le coût des licences logicielles',
        'Pour doubler automatiquement la vitesse de transmission des câbles',
        'Pour éviter d’avoir à configurer des adresses IP privées'
      ],
      correct: 0,
      exp: 'L’hétérogénéité logicielle et matérielle empêche un pirate d’utiliser le même exploit pour franchir successivement les deux barrières défensives.'
    },
    {
      stem: 'Quel équipement doit-on intercaler pour administrer en toute sécurité des serveurs de production sans accès SSH direct depuis les postes de travail ?',
      opts: [
        'Un Bastion SSH (Jump Host) avec authentification forte et traçabilité des sessions',
        'Un commutateur non administrable de niveau 2',
        'Un point d’accès Wi-Fi ouvert',
        'Un répéteur Ethernet passif'
      ],
      correct: 0,
      exp: 'Le Bastion SSH centralise les accès d’administration, applique le MFA, isole la zone critique et enregistre les sessions pour audit.'
    },
    {
      stem: 'Dans quelle zone réseau doit idéalement être situé le serveur de base de données contenant les données sensibles de l’entreprise ?',
      opts: [
        'Dans une zone interne protégée (LAN ou zone BDD dédiée), jamais directement en DMZ publique',
        'Directement sur le routeur frontière Internet',
        'En DMZ publique avec le port 3306 exposé à tous les internautes',
        'Sur une clé USB branchée sur la passerelle'
      ],
      correct: 0,
      exp: 'La base de données critique doit être abritée au cœur du réseau interne ou dans un sous-réseau dédié ; seul le serveur applicatif autorisé peut y accéder.'
    },
    {
      stem: 'Quel protocole réseau est typiquement autorisé dans le sens WAN vers DMZ pour un serveur web public sécurisé ?',
      opts: [
        'TCP sur le port 443 (HTTPS)',
        'TCP sur le port 23 (Telnet)',
        'TCP sur le port 3389 (RDP direct)',
        'UDP sur le port 69 (TFTP)'
      ],
      correct: 0,
      exp: 'Le port 443 (HTTPS) est le standard sécurisé universellement ouvert vers les serveurs web situés en DMZ.'
    },
    {
      stem: 'Si un serveur web en DMZ doit envoyer des données vers une base de données du LAN, comment concevoir l’architecture conformément aux bonnes pratiques ?',
      opts: [
        'Le serveur web dépose les données sur une file de messages intermédiaire ou c’est un service interne du LAN qui vient régulièrement interroger la DMZ',
        'On désactive temporairement le pare-feu chaque nuit',
        'On ouvre tous les ports entre la DMZ et le LAN sans aucune restriction',
        'On installe un serveur DHCP sur le poste de l’administrateur'
      ],
      correct: 0,
      exp: 'Pour respecter la règle d’or, on privilégie l’interrogation initiée depuis le LAN vers la DMZ (Pull) ou une passerelle intermédiaire étanche.'
    },
    {
      stem: 'Dans une architecture Dual-Homed (pare-feu à 2 pattes), où se trouvent nécessairement les serveurs d’entreprise ?',
      opts: [
        'Directement sur le réseau local interne LAN (créant un risque majeur) ou externalisés chez un hébergeur',
        'Dans la zone DMZ dédiée intégrée au boîtier',
        'Dans le nuage sans aucune adresse IP',
        'Sur l’interface de bouclage local 127.0.0.1'
      ],
      correct: 0,
      exp: 'Le modèle Dual-Homed ne possédant que 2 interfaces (LAN et WAN), il ne dispose d’aucun troisième segment pour héberger une DMZ isolée.'
    }
  ],
  flashcards: [
    {
      q: 'Quel est le rôle principal d’une zone DMZ ?',
      a: 'Héberger les serveurs accessibles publiquement depuis Internet en les isolant hermétiquement du réseau interne d’entreprise.'
    },
    {
      q: 'Énoncez la règle d’or régissant les flux DMZ vers LAN.',
      a: 'Aucune session ne doit jamais pouvoir être initiée depuis la DMZ vers le réseau interne LAN.'
    },
    {
      q: 'Qu’est-ce qu’une topologie pare-feu Triple-Homed ?',
      a: 'Un équipement de filtrage unique disposant de 3 interfaces réseau connectées au LAN, à la DMZ et au WAN.'
    },
    {
      q: 'Pourquoi une architecture Back-to-Back à constructeurs hétérogènes est-elle plus résiliente ?',
      a: 'Parce qu’une vulnérabilité zero-day affectant le pare-feu frontal ne compromet pas le pare-feu interne de marque différente.'
    },
    {
      q: 'Quel est le rôle d’un Bastion SSH (Jump Host) ?',
      a: 'Filtrer, sécuriser avec MFA et tracer l’ensemble des accès d’administration vers les serveurs de production.'
    },
    {
      q: 'Quels sont les ports typiquement ouverts de l’Internet vers la DMZ ?',
      a: 'Les ports des services publics autorisés : 80 (HTTP), 443 (HTTPS), 25 (SMTP) et 53 (DNS).'
    }
  ],
  mastery: [
    { cls: 'low', text: 'Niveau initial : vous exposez des serveurs directement sur le LAN ou autorisez des connexions initiées de la DMZ vers le LAN.' },
    { cls: 'medium', text: 'Niveau opérationnel : vous concevez des zones DMZ étanches avec Triple-Homed et déployez des bastions pour l’administration.' },
    { cls: 'high', text: 'Maîtrise B3 : vous modélisez des architectures Back-to-Back hétérogènes haute disponibilité et garantissez une isolation multi-zones de niveau bancaire.' }
  ]
};
