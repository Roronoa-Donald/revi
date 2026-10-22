/**
 * Chapitre 2 du cours « pfSense & Routage B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 2,
  title: 'Règles de Pare-Feu, Aliases, États de Connexion (Stateful) &amp; Limiteurs',
  short: 'Règles pf, Aliases &amp; États',
  toc: 'Cinématique d’évaluation First-Match Wins, mot-clé quick, Aliases (Host/Network/Port), table d’états pfctl, règles flottantes et limiteurs Dummynet.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B3 et plus',
  situation: 'Le filtrage de paquets moderne ne se résume pas à l’ouverture statique de ports. Dans pfSense, chaque règle est soumise à un ordre d’évaluation strict, géré par le compilateur interne du moteur pf. L’ingénieur sécurité doit maîtriser la cinématique séquentielle « First-Match Wins » imposée par le mot-clé quick, concevoir des jeux de règles modulaires et maintenables grâce aux Aliases récursifs, superviser la table d’états (State Table) pour traquer les connexions orphelines ou les attaques par saturation SYN Flood, et façonner le trafic réseau à l’aide des pipes Dummynet pour garantir la qualité de service (QoS) des applications métiers critiques.',
  objectives: [
    'maîtriser la cinématique de traitement des règles dans l’interface web pfSense et la portée du mot-clé quick ;',
    'concevoir, organiser et hiérarchiser les règles sur les interfaces physiques, groupes et règles flottantes ;',
    'créer des Aliases récursifs (Host, Network, Port, URL Table) et comprendre leur compilation en tables radix ;',
    'analyser le cycle de vie des sessions dans la table d’états pf (SYN_SENT, ESTABLISHED, FIN_WAIT) ;',
    'auditer et purger les connexions en mémoire vive à l’aide des commandes CLI pfctl ;',
    'analyser et résoudre méthodologiquement des résolveurs d’Aliases récursifs, des moteurs d’évaluation First-Match et des parseurs de table d’états.'
  ],
  sections: [
    {
      title: 'Cinématique d’Évaluation des Règles : De la Théorie pf au « First-Match Wins »',
      html: [
        '<p>L’une des subtilités majeures de pfSense réside dans la différence entre le comportement natif du fichier <code>pf.conf</code> OpenBSD et l’implémentation choisie par Netgate pour son interface d’administration graphique.</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. La Règle Historique OpenBSD : Last-Match Wins</h4>',
        '    <p>En syntaxe brute <code>pf.conf</code>, un paquet traverse la totalité du jeu de règles. Si plusieurs règles correspondent, <strong>la dernière règle correspondante l’emporte</strong> :</p>',
        '    <pre><code>block in all\npass in proto tcp to port 80\nblock in proto tcp to port 80 # &lt;-- C’est cette règle qui s’applique !</code></pre>',
        '    <p>Pour forcer l’application immédiate d’une règle sans continuer la lecture, il faut insérer explicitement le mot-clé <code>quick</code> :</p>',
        '    <pre><code>pass in quick proto tcp to port 80 # &lt;-- Arrêt immédiat de l’évaluation</code></pre>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Le Choix Ergonomique de pfSense : First-Match Wins</h4>',
        '    <p>Dans l’interface WebGUI de pfSense, <strong>toutes les règles standard sont automatiquement générées avec le mot-clé <code>quick</code></strong>.</p>',
        '    <p>Conséquences opérationnelles pour l’administrateur :</p>',
        '    <ul>',
        '      <li>Les règles sont évaluées de <strong>haut en bas</strong>.</li>',
        '      <li>Dès qu’un paquet correspond aux critères d’une règle, l’action (<code>Pass</code>, <code>Block</code> ou <code>Reject</code>) est exécutée sur-le-champ.</li>',
        '      <li>Aucune règle située plus bas dans la liste ne sera examinée.</li>',
        '      <li>Les règles les plus spécifiques doivent <strong>toujours être placées au-dessus</strong> des règles génériques.</li>',
        '    </ul>',
        '  </div>',
        '</div>',
        box('standard', 'Hiérarchie Globale des Règles dans pfSense', [
          '<p>Lorsqu’un paquet pénètre sur une interface, l’ordre d’évaluation traverse les onglets suivants :</p>',
          '<ol>',
          '  <li><strong>Floating Rules (Règles Flottantes) :</strong> Règles globales applicables à plusieurs interfaces simultanément, évaluées en premier (si l’option « Quick » est cochée).</li>',
          '  <li><strong>Interface Groups :</strong> Règles s’appliquant à des familles d’interfaces (ex: tous les tunnels OpenVPN ou IPsec).</li>',
          '  <li><strong>Interface Rules :</strong> Règles spécifiques de l’interface réceptrice (WAN, LAN, DMZ), lues de haut en bas.</li>',
          '  <li><strong>Règle Implicite Default Deny :</strong> Si le paquet ne correspond à aucune règle, pfSense applique un blocage silencieux (<code>block drop in all</code>).</li>',
          '</ol>'
        ])
      ].join('\n')
    },
    {
      title: 'Gestion Modulaire des Aliases &amp; Tables Radix pf',
      html: [
        '<p>Pour éviter la duplication des règles de pare-feu et faciliter la maintenance, pfSense propose le mécanisme d’<strong>Aliases</strong> (<em>Firewall &gt; Aliases</em>). Un alias est une étiquette textuelle représentant un ensemble d’objets réseau.</p>',
        '<div class="grid grid-3">',
        '  <div class="card">',
        '    <h4>Host Aliases</h4>',
        '    <p>Regroupement d’adresses IP uniques (ex: <code>SRV_AD = 192.168.1.10, 192.168.1.11</code>). Un alias peut inclure un autre alias (imbrication récursive).</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Network Aliases</h4>',
        '    <p>Regroupement de sous-réseaux en notation CIDR (ex: <code>RESEAUX_ADMIN = 10.0.10.0/24, 10.0.20.0/24</code>) pour appliquer des politiques de sécurité par zone.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Port Aliases</h4>',
        '    <p>Regroupement de ports de services ou plages de ports (ex: <code>WEB_PORTS = 80, 443, 8080, 8443</code>), simplifiant grandement les règles d’exposition.</p>',
        '  </div>',
        '</div>',
        '<p>Au niveau bas niveau, pf traduit chaque alias contenant des adresses IP en une <strong>table pf</strong> stockée dans une structure en arbre radix optimisée. La recherche d’une adresse IP dans une table comprenant 100 000 entrées s’exécute ainsi en temps quasi-instantané $O(1)$, sans dégrader le débit du pare-feu.</p>'
      ].join('\n')
    },
    {
      title: 'Inspection Stateful &amp; Façonnement du Trafic (Limiters Dummynet)',
      html: [
        '<p>pfSense est un pare-feu à état (<strong>Stateful Inspection</strong>). Lorsqu’une règle autorise une nouvelle connexion (action <code>Pass</code>), le moteur pf alloue une structure dans sa <strong>Table d’États (State Table)</strong> :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. Cycle de Vie d’une Connexion TCP dans la State Table</h4>',
        '    <ul>',
        '      <li><strong>SYN_SENT :</strong> Le client a émis le SYN, pf mémorise le numéro de séquence initial et attend la réponse du serveur distant.</li>',
        '      <li><strong>ESTABLISHED :</strong> Le handshake à 3 voies (SYN, SYN-ACK, ACK) est validé. Tous les paquets aller-retour de cette session passent désormais sans consulter la liste des règles de filtrage.</li>',
        '      <li><strong>FIN_WAIT / CLOSED :</strong> Fermeture de la connexion par émission de FIN/RST. L’entrée reste temporairement en mémoire puis est purgée après expiration du timeout TCP.</li>',
        '    </ul>',
        '    <p>Commandes CLI de supervision : <code>pfctl -ss</code> (lister les états), <code>pfctl -si</code> (statistiques d’états), <code>pfctl -k &lt;ip&gt;</code> (fermeture forcée d’une session compromise).</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Limiters &amp; Traffic Shaping (Dummynet)</h4>',
        '    <p>Le module de contrôle de flux Dummynet permet de brider ou réserver la bande passante sans complexité :</p>',
        '    <ul>',
        '      <li><strong>Pipe :</strong> Canal virtuel définissant un débit maximal (ex: 10 Mbps) et un délai optionnel.</li>',
        '      <li><strong>Queue :</strong> Sous-canal associé à un Pipe doté d’un poids de priorité (Weight) pour ordonnancer les paquets.</li>',
        '      <li><strong>Application :</strong> Les pipes sont assignés directement dans les paramètres avancés d’une règle de pare-feu (champs <em>In / Out pipe</em>).</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],
  method: [
    'Étape 1 : Cartographier les flux autorisés et définir les Aliases requis pour les hôtes, sous-réseaux et groupes de ports.',
    'Étape 2 : Créer les règles de blocage explicites les plus prioritaires au sommet de la liste d’interface.',
    'Étape 3 : Insérer les règles d’autorisation spécifiques (Pass) en exploitant les Aliases créés.',
    'Étape 4 : Vérifier que la règle Default Deny bloque bien tout paquet non explicitement ciblé.',
    'Étape 5 : Superviser la table d’états (pfctl -ss) pour contrôler l’établissement correct des flux TCP.',
    'Étape 6 : Attacher les Limiters Dummynet dans les options avancées des règles pour réguler la bande passante.'
  ],
  summary: [
    'Dans pfSense, le mot-clé quick est injecté sur chaque règle, imposant l’évaluation First-Match Wins de haut en bas.',
    'Les Floating Rules s’évaluent avant les règles d’interface si l’option Quick est cochée.',
    'Les Aliases évitent la duplication de règles et sont compilés en tables radix pour une recherche en O(1).',
    'La State Table mémorise les sessions autorisées, permettant aux flux retour de passer sans règle WAN additionnelle.',
    'Les états TCP transitent de SYN_SENT à ESTABLISHED puis FIN_WAIT/CLOSED avant purge.',
    'Le moteur Dummynet permet de façonner le trafic via des Pipes et Queues directement associés aux règles de filtrage.'
  ],
  checklist: [
    'Je comprends la différence fondamentale entre Last-Match Wins (OpenBSD brut) et First-Match Wins (pfSense WebGUI).',
    'Je sais pourquoi une règle spécifique doit impérativement précéder une règle générique.',
    'Je sais créer et imbriquer récursivement des Aliases de type Host, Network et Port.',
    'Je sais interpréter une sortie de la commande pfctl -ss et détecter un état SYN_SENT orphelin.',
    'Je sais comment fermer immédiatement les connexions d’une IP compromise avec pfctl -k.',
    'Je sais comment configurer un Limiter Dummynet pour plafonner un débit utilisateur.'
  ],
  notions: [
    'First-Match Wins & Mot-Clé Quick',
    'Hiérarchie Floating vs Interface Rules',
    'Politique Implicite Default Deny',
    'Aliases Récursifs & Tables Radix',
    'Stateful Inspection & State Table',
    'Machine à États TCP (SYN_SENT, ESTABLISHED)',
    'Commandes pfctl -ss et pfctl -k',
    'Limiters Dummynet (Pipes & Queues)'
  ],
  pitfalls: [
    'Placer une règle large (Pass any to any) au-dessus de règles d’interdiction, annulant tout effet de filtrage.',
    'Créer des références cycliques d’Aliases imbriqués (A contient B qui contient A).',
    'Croire qu’une règle Floating sans l’option Quick prime toujours sur les règles d’interface.',
    'Oublier que les paquets retour d’une connexion établie ne re-testent pas la liste des règles de filtrage.'
  ],
  questions: [
    {
      stem: 'Quel mot-clé est automatiquement injecté par pfSense dans les règles créées via la WebGUI ?',
      opts: [
        'keep state',
        'quick',
        'log',
        'scrub'
      ],
      correct: 1,
      exp: 'pfSense ajoute le mot-clé quick à toutes les règles d’interface, ce qui interrompt immédiatement l’évaluation dès la première règle correspondante (First-Match Wins).'
    },
    {
      stem: 'Dans quelle direction sont évaluées les règles de filtrage dans pfSense ?',
      opts: [
        'De bas en haut (la dernière l’emporte)',
        'De haut en bas (la première qui correspond l’emporte)',
        'Par ordre alphabétique du nom de la règle',
        'Aléatoirement selon la charge CPU'
      ],
      correct: 1,
      exp: 'En raison du mot-clé quick, les règles sont lues de haut en bas : la première règle valide s’applique immédiatement.'
    },
    {
      stem: 'Dans quelle catégorie de règles place-t-on une politique de sécurité s’appliquant à toutes les interfaces simultanément ?',
      opts: [
        'Interface LAN',
        'Floating Rules (Règles Flottantes)',
        'Interface WAN',
        'Passerelles par défaut'
      ],
      correct: 1,
      exp: 'Les Floating Rules permettent de créer des règles globales couvrant plusieurs interfaces en une seule déclaration.'
    },
    {
      stem: 'Quelle structure de données le moteur pf utilise-t-il pour stocker les tables d’adresses IP d’un alias ?',
      opts: [
        'Une liste simplement chaînée',
        'Un arbre radix (Radix Tree)',
        'Un tableau statique non indexé',
        'Une file FIFO'
      ],
      correct: 1,
      exp: 'Les tables pf exploitent un arbre radix, offrant une recherche d’adresse IP et de sous-réseau en temps O(1) ou O(log N).'
    },
    {
      stem: 'Comment appelle-t-on l’état TCP dans la table d’états lorsque la connexion est totalement établie entre deux hôtes ?',
      opts: [
        'SYN_SENT',
        'ESTABLISHED',
        'TIME_WAIT',
        'LISTEN'
      ],
      correct: 1,
      exp: 'L’état ESTABLISHED signale que le handshake à 3 voies TCP est complété et que le trafic bidirectionnel est fluide.'
    },
    {
      stem: 'Quelle commande CLI FreeBSD permet d’afficher toutes les connexions actives dans la table d’états pf ?',
      opts: [
        'pfctl -sr',
        'pfctl -ss',
        'pfctl -sa',
        'netstat -rn'
      ],
      correct: 1,
      exp: 'La commande pfctl -ss (show states) affiche l’ensemble des sessions mémorisées dans la table d’états du noyau.'
    },
    {
      stem: 'Quel utilitaire noyau sous-jacent est utilisé par pfSense pour le module de limitation de débit (Limiters) ?',
      opts: [
        'Traffic Control (tc)',
        'Dummynet',
        'CBQ natif uniquement',
        'Netem'
      ],
      correct: 1,
      exp: 'Sous FreeBSD/pfSense, les Limiters reposent sur le sous-système de simulation réseau et de contrôle de trafic Dummynet.'
    },
    {
      stem: 'Pourquoi est-il crucial de positionner les règles spécifiques au-dessus des règles génériques dans pfSense ?',
      opts: [
        'Pour économiser la mémoire RAM',
        'Car le principe First-Match Wins masquerait la règle spécifique si une règle générique la précédait',
        'Parce que pfSense refuse de compiler les règles sinon',
        'Pour accélérer les requêtes DHCP'
      ],
      correct: 1,
      exp: 'Si une règle générique (ex: allow any to any) est placée au sommet, elle correspondra à tous les paquets et empêchera les règles de restriction plus bas d’être lues.'
    }
  ],
  flashcards: [
    {
      q: 'Qu’est-ce que le principe First-Match Wins dans pfSense ?',
      a: 'L’évaluation s’arrête dès la première règle correspondante (de haut en bas) grâce au mot-clé quick implicite.'
    },
    {
      q: 'Quelle est la différence entre l’action Block et Reject ?',
      a: 'Block détruit le paquet silencieusement (DROP) ; Reject renvoie un message d’erreur ICMP ou un TCP RST à l’émetteur.'
    },
    {
      q: 'Qu’est-ce qu’une Floating Rule dans pfSense ?',
      a: 'Une règle transversale capable de s’appliquer à plusieurs interfaces (WAN, LAN, DMZ) en entrée ou sortie.'
    },
    {
      q: 'Quels sont les trois principaux types d’Aliases dans pfSense ?',
      a: 'Host (adresses IP uniques), Network (blocs CIDR) et Port (numéros ou plages de ports).'
    },
    {
      q: 'Quel est l’intérêt de la State Table pour les flux retour ?',
      a: 'Autoriser automatiquement les réponses aux sessions légitimes initiées de l’interne sans ouvrir de port sur le WAN.'
    },
    {
      q: 'Quelle commande CLI permet de tuer tous les états associés à une IP suspecte ?',
      a: 'pfctl -k <adresse_ip>'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Difficultés à ordonner les règles de filtrage ou incompréhension de l’impact du mot-clé quick sur le First-Match.'
    },
    {
      cls: 'medium',
      text: 'Création méthodique de jeux de règles d’interface, utilisation des Aliases et analyse de la table d’états pfctl.'
    },
    {
      cls: 'high',
      text: 'Conception d’architectures de filtrage complexes, mise en œuvre de Floating Rules, optimisation de tables radix et QoS par Dummynet.'
    }
  ]
};
