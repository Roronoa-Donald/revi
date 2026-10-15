/**
 * Chapitre 2 du cours « Firewall & Sécurité Réseau B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 2,
  title: 'Filtrage Dynamique avec Suivi d’État (Stateful Inspection) &amp; Table Conntrack',
  short: 'Suivi d’État &amp; Table Conntrack',
  toc: 'Machine à états finis TCP (RFC 793), module netfilter conntrack, états NEW/ESTABLISHED/RELATED/INVALID, gestion des timeouts et détection des scans furtifs (Xmas, Null).',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B3 et plus',
  situation: 'Pour pallier les failles critiques du filtrage stateless, la 2e génération de pare-feux a introduit l’inspection dynamique avec suivi d’état (Stateful Packet Inspection). Plutôt que de traiter chaque paquet de manière aveugle, le pare-feu reconstruit la conversation réseau dans une table en mémoire vive appelée table de suivi des connexions (Connection Tracking ou conntrack). Lorsqu’un paquet arrive, le pare-feu vérifie s’il correspond à une session active légitimement initiée ou s’il respecte les transitions rigoureuses du protocole TCP (RFC 793). En tant qu’ingénieur sécurité B3, maîtriser la machine à états finis, le dimensionnement des tables en RAM, la purge des timeouts et la détection des paquets illégaux exploités par les attaquants (scans Xmas, Null ou désynchronisation conntrack) est indispensable pour protéger le réseau contre les attaques d’évasion.',
  objectives: [
    'maîtriser la machine à états finis du protocole TCP (handshake 3 voies, transfert de données, fermeture bidirectionnelle) ;',
    'comprendre le fonctionnement interne de la table de suivi des connexions conntrack sous Linux netfilter ;',
    'différencier précisément les 4 états logiques d’un paquet : NEW, ESTABLISHED, RELATED et INVALID ;',
    'configurer et auditer les délais d’expiration (timeouts) pour prévenir l’épuisement de la mémoire vive (RAM) ;',
    'détecter et neutraliser les balayages de ports furtifs et anomalies de drapeaux TCP (Xmas Tree, Null Scan, FIN Scan) ;',
    'développer en Python 3 des simulateurs de table conntrack, des gestionnaires de purge temporelle et des détecteurs d’anomalies.'
  ],
  sections: [
    {
      title: 'La Révolution du Stateful Inspection &amp; la Machine à États TCP',
      html: [
        '<p>L’inspection avec état repose sur l’observation continue du cycle de vie des sessions réseau. Pour le protocole TCP (défini par la <strong>RFC 793</strong>), le pare-feu suit la négociation à trois voies (3-Way Handshake) :</p>',
        '<div class="grid grid-3">',
        '  <div class="card">',
        '    <h4>1. Étape SYN (Initialisation)</h4>',
        '    <p>Le client envoie un paquet avec le drapeau <code>SYN</code>. Le pare-feu alloue une entrée temporaire dans sa table avec l’état <code>NEW</code> (phase SYN_SENT).</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Étape SYN-ACK (Réponse)</h4>',
        '    <p>Le serveur répond avec les drapeaux <code>SYN,ACK</code>. Le pare-feu vérifie la cohérence du numéro d’acquittement et maintient l’état <code>NEW</code> (phase SYN_RCVD).</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>3. Étape ACK (Validation)</h4>',
        '    <p>Le client confirme avec un <code>ACK</code>. Le handshake est conclu : la session bascule à l’état <code>ESTABLISHED</code>. Les échanges de données ultérieurs sont admis automatiquement.</p>',
        '  </div>',
        '</div>',
        '<p>Tout paquet reçu avec le drapeau ACK sans que le handshake préalable n’ait été enregistré dans la table est classifié <code>INVALID</code> et immédiatement rejeté (DROP), neutralisant totalement l’attaque par paquets ACK forgés.</p>'
      ].join('\n')
    },
    {
      title: 'Architecture &amp; États Logiques de la Table Netfilter Conntrack',
      html: [
        '<p>Le sous-système <strong>netfilter conntrack</strong> du noyau Linux associe à chaque flux un tuple bidirectionnel <code>(IP_src, IP_dst, Port_src, Port_dst, Proto)</code> et lui attribue un état logique :</p>',
        '<table class="table">',
        '  <thead>',
        '    <tr><th>État Conntrack</th><th>Définition &amp; Signification Technique</th><th>Comportement Pare-feu Standard</th></tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr><td><code>NEW</code></td><td>Premier paquet observant l’ouverture d’une nouvelle connexion valide (ex: TCP SYN ou premier paquet UDP sortant).</td><td>Évalué contre le jeu complet des règles d’accès (ACLs) pour décider de l’autorisation.</td></tr>',
        '    <tr><td><code>ESTABLISHED</code></td><td>Paquet appartenant à une session déjà validée et enregistrée dans les deux sens de communication.</td><td>Accepté immédiatement en tête de chaîne sans réévaluation des règles (gain de performance majeur).</td></tr>',
        '    <tr><td><code>RELATED</code></td><td>Paquet initiant une nouvelle connexion mais techniquement liée à une session existante (ex: canal de données passif FTP, messages d’erreur ICMP).</td><td>Accepté si la connexion parente est active (géré par des modules d’aide conntrack helpers).</td></tr>',
        '    <tr><td><code>INVALID</code></td><td>Paquet ne correspondant à aucune session connue ou présentant des drapeaux corrompus/contradictoires.</td><td>Rejeté impérativement (DROP) et journalisé pour analyse d’intrusion.</td></tr>',
        '  </tbody>',
        '</table>'
      ].join('\n')
    },
    {
      title: 'Gestion de la RAM, Timeouts &amp; Détection de Scans Furtifs',
      html: [
        '<p>Chaque entrée conntrack consomme environ 300 octets de mémoire noyau. Pour éviter le déni de service par saturation de la table (State Table Exhaustion), chaque protocole possède des délais de purge stricts :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Délais d’Expiration Standards</h4>',
        '    <ul>',
        '      <li><code>TCP:ESTABLISHED</code> : jusqu’à 432 000 s (5 jours par défaut) ou réduit à 3600 s en environnement durci.</li>',
        '      <li><code>TCP:SYN_SENT</code> : 60 à 120 s (si aucun SYN-ACK ne répond).</li>',
        '      <li><code>UDP:GENERIC</code> : 30 s (protocole sans connexion, état maintenu brièvement).</li>',
        '      <li><code>ICMP:ECHO</code> : 10 à 30 s (attente de la réponse Ping).</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Balayages Furtifs &amp; Drapeaux Illégaux</h4>',
        '    <ul>',
        '      <li><strong>Xmas Tree Scan :</strong> FIN, PSH et URG activés simultanément pour forcer une réponse RST des ports fermés (Nmap <code>-sX</code>).</li>',
        '      <li><strong>Null Scan :</strong> Aucun drapeau activé (flags = 0), violation directe de la RFC 793 (Nmap <code>-sN</code>).</li>',
        '      <li><strong>SYN-FIN Anomaly :</strong> SYN et FIN activés ensemble pour tromper les vieux moteurs d’inspection.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],
  methodTitle: 'Protocole de Durcissement &amp; Dimensionnement Conntrack',
  method: [
    '1. Dimensionner la capacité maximale de la table conntrack via <code>/proc/sys/net/netfilter/nf_conntrack_max</code> selon la RAM disponible (ex: 262 144 entrées pour 8 Go de RAM).',
    '2. Ajuster la taille de la table de hachage <code>nf_conntrack_buckets = nf_conntrack_max / 4</code> pour maintenir une chaîne de hachage courte et préserver la latence.',
    '3. Réduire les délais d’expiration agressifs (ex: baisser <code>nf_conntrack_tcp_timeout_established</code> de 432000s à 3600s) pour accélérer la libération des sessions mortes.',
    '4. Placer la règle d’acceptation conntrack <code>ESTABLISHED,RELATED</code> en toute première position des règles de filtrage.',
    '5. Ajouter une règle de blocage immédiat pour tout paquet classifié <code>INVALID</code>.',
    '6. Activer la protection anti-SYN flood (<code>net.ipv4.tcp_syncookies = 1</code>) pour résister aux attaques par inondation de requêtes d’ouverture.'
  ],
  summary: [
    'Le filtrage stateful surveille le contexte bidirectionnel de chaque session via une table d’état en mémoire RAM.',
    'Le handshake TCP à 3 voies (SYN -> SYN-ACK -> ACK) régit la transition logique de NEW vers ESTABLISHED.',
    'Les 4 états conntrack majeurs sont NEW (ouverture), ESTABLISHED (en cours), RELATED (associé) et INVALID (anormal).',
    'La gestion des timeouts évite la saturation de la table conntrack et protège contre les attaques DoS mémoire.',
    'Les combinaisons illégales de drapeaux TCP (scans Xmas, Null, SYN-FIN) doivent être bloquées avec le statut INVALID.'
  ],
  checklist: [
    'Le cycle de vie du 3-way handshake TCP selon la RFC 793 est parfaitement maîtrisé.',
    'Les 4 états conntrack (NEW, ESTABLISHED, RELATED, INVALID) sont compris et appliqués dans les règles.',
    'Le calcul de dimensionnement de la table conntrack et des buckets de hachage est assimilé.',
    'La gestion des timeouts par protocole (TCP, UDP, ICMP) est comprise.',
    'La détection des scans furtifs Nmap (Xmas, Null, FIN) est implémentée.',
    'Les 3 ateliers de programmation interactive en Python 3 (fw3-c2-e1 à fw3-c2-e3) sont validés.'
  ],
  notions: [
    'Stateful Packet Inspection',
    'Table de suivi conntrack',
    'Handshake TCP 3-voies',
    'États NEW et ESTABLISHED',
    'États RELATED et INVALID',
    'Timeouts de session',
    'Scans furtifs Xmas & Null',
    'Protection SYN Flood & Syncookies'
  ],
  pitfalls: [
    'Oublier d’autoriser l’état RELATED, ce qui bloque silencieusement les protocoles à canaux multiples comme FTP ou les messages ICMP Time Exceeded.',
    'Conserver le délai par défaut de 5 jours pour TCP_ESTABLISHED sur un serveur à très fort trafic, entraînant le crash de netfilter par saturation de la table.',
    'Ne pas rejeter explicitement l’état INVALID, laissant passer des paquets orphelins ou corrompus.',
    'Confondre le statut protocolaire d’un paquet TCP (champ Flags) et son état logique dans la table conntrack.'
  ],
  questions: [
    {
      stem: 'Quel événement déclenche le passage d’une session TCP à l’état conntrack ESTABLISHED ?',
      opts: [
        'La réception du paquet ACK final du client concluant le 3-Way Handshake',
        'L’émission du premier paquet SYN par le client',
        'La réception de la réponse SYN-ACK émise par le serveur',
        'La fermeture de la connexion par un paquet RST'
      ],
      correct: 0,
      exp: 'C’est la réception de l’ACK de confirmation confirmant que le client et le serveur sont synchronisés qui fait basculer la session en ESTABLISHED.'
    },
    {
      stem: 'Pourquoi place-t-on la règle autorisant l’état ESTABLISHED,RELATED en toute première ligne d’un pare-feu ?',
      opts: [
        'Pour optimiser les performances : plus de 90% des paquets en transit appartiennent à des sessions déjà validées et sont traités immédiatement',
        'Parce que le noyau Linux refuse de démarrer si cette règle n’est pas en position 1',
        'Pour permettre aux paquets SYN de traverser sans être filtrés',
        'Pour désactiver le chiffrement TLS sur les paquets de retour'
      ],
      correct: 0,
      exp: 'Placer cette règle en tête évite d’évaluer la liste complète des règles pour chaque paquet d’une session établie, ce qui réduit drastiquement l’utilisation du CPU.'
    },
    {
      stem: 'À quoi correspond l’état conntrack RELATED ?',
      opts: [
        'À une nouvelle connexion logiquement liée à une session existante (ex: canal de données passif FTP ou erreur ICMP)',
        'À une connexion suspecte qui doit être mise en quarantaine',
        'À un paquet ayant subi une altération de somme de contrôle (Checksum)',
        'À une session redirigée vers un proxy de cache web'
      ],
      correct: 0,
      exp: 'L’état RELATED identifie les flux secondaires associés à une connexion maître autorisée (géré par les helpers du noyau).'
    },
    {
      stem: 'Que se passe-t-il si la table conntrack d’un pare-feu atteint sa capacité maximale (nf_conntrack_max) ?',
      opts: [
        'Le pare-feu rejette les nouvelles connexions (« table full, dropping packet ») provoquant un déni de service global',
        'Le pare-feu bascule automatiquement en mode routage non filtré',
        'Le système redémarre instantanément sans sauvegarder les logs',
        'Les paquets sont compressés pour libérer de la mémoire'
      ],
      correct: 0,
      exp: 'Lorsque la table est saturée, le noyau ne peut plus allouer de mémoire pour de nouvelles sessions et rejette tous les paquets entrants non enregistrés.'
    },
    {
      stem: 'Quels drapeaux TCP sont simultanément activés dans un balayage de type Xmas Tree Scan ?',
      opts: [
        'FIN, PSH et URG',
        'SYN, ACK et RST',
        'Uniquement le drapeau ACK',
        'Tous les drapeaux à 0 (aucun drapeau)'
      ],
      correct: 0,
      exp: 'Le Xmas scan allume les drapeaux FIN, PSH et URG (comme les guirlandes d’un sapin de Noël) pour observer le comportement de la pile TCP cible selon la RFC 793.'
    },
    {
      stem: 'Quel est l’objectif de la commande sysctl net.ipv4.tcp_syncookies = 1 ?',
      opts: [
        'Mitiger les attaques SYN Flood en encodant les informations de session dans le numéro de séquence initial sans allouer d’état mémoire',
        'Autoriser le stockage de cookies HTTP dans le pare-feu',
        'Augmenter la taille du tampon d’émission des cartes réseau',
        'Forcer la déconnexion automatique des utilisateurs inactifs'
      ],
      correct: 0,
      exp: 'Les SYN Cookies permettent au serveur de répondre aux demandes d’ouverture TCP sans consommer de mémoire conntrack tant que le client n’a pas renvoyé l’ACK final.'
    },
    {
      stem: 'Comment le pare-feu stateful classe-t-il un paquet TCP contenant uniquement le drapeau FIN reçu en dehors de toute connexion active ?',
      opts: [
        'INVALID',
        'ESTABLISHED',
        'NEW',
        'RELATED'
      ],
      correct: 0,
      exp: 'Un paquet de fermeture reçu sans connexion préalable ne correspond à aucune session connue et doit être classé INVALID.'
    },
    {
      stem: 'Combien de mémoire vive consomme approximativement une entrée dans la table conntrack du noyau Linux ?',
      opts: [
        'Environ 300 octets',
        'Environ 4 mégaoctets',
        'Exactement 1 bit',
        'Plus de 64 kilo-octets'
      ],
      correct: 0,
      exp: 'Une entrée conntrack (structure nf_conn) occupe environ 300 octets de mémoire noyau non swappable.'
    }
  ],
  flashcards: [
    {
      q: 'Quel est le rôle fondamental de la table conntrack ?',
      a: 'Mémoriser l’état et les tuples d’adresses des sessions réseau actives pour autoriser automatiquement les flux de retour légitimes.'
    },
    {
      q: 'Quelles sont les 3 étapes du handshake TCP ?',
      a: '1. SYN (client vers serveur) -> 2. SYN-ACK (serveur vers client) -> 3. ACK (client vers serveur, session ESTABLISHED).'
    },
    {
      q: 'Que signifie l’état conntrack INVALID ?',
      a: 'Un paquet ne correspondant à aucune session connue ou présentant des combinaisons de drapeaux TCP anormales, destiné à être DROP.'
    },
    {
      q: 'Qu’est-ce qu’un Null Scan ?',
      a: 'Une sonde TCP Nmap (-sN) envoyant des paquets avec aucun drapeau activé (flags = 0), violant les spécifications de la RFC 793.'
    },
    {
      q: 'Quelle est la conséquence d’un dépassement de nf_conntrack_max ?',
      a: 'La table de session est saturée et le pare-feu rejette toutes les nouvelles tentatives de connexion réseau.'
    },
    {
      q: 'À quoi sert le délai de timeout pour TCP:ESTABLISHED ?',
      a: 'Purger les sessions inactives après une période définie pour libérer la mémoire vive du pare-feu.'
    }
  ],
  mastery: [
    { cls: 'low', text: 'Niveau initial : vous confondez les états conntrack et les drapeaux TCP, ou ignorez l’importance de l’état INVALID.' },
    { cls: 'medium', text: 'Niveau opérationnel : vous configurez les règles avec suivi d’état, optimisez l’ordre ESTABLISHED,RELATED et filtrez les scans furtifs.' },
    { cls: 'high', text: 'Maîtrise B3 : vous dimensionnez les buckets et timeouts conntrack pour des millions de sessions et durcissez la pile réseau face aux attaques d’évasion.' }
  ]
};
