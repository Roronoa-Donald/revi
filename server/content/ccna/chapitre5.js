/**
 * Chapitre 5 du cours « CCNA Réseau » B2 — Routage IPv4, Tables de Routage et Routes Statiques.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 5,
  title: 'Routage IPv4, Tables de Routage &amp; Routes Statiques',
  short: 'Routage &amp; Routes Statiques',
  toc: 'Fonctionnement du routage de niveau 3, lecture de la table de routage (show ip route), algorithme Longest Prefix Match (LPM), Distance Administrative (AD) et métrique, routes directement connectées, routes statiques, route par défaut (0.0.0.0/0), routes flottantes de secours et supernetting.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Un fournisseur de services héberge plusieurs filiales interconnectées par des liaisons télécoms louées et un accès Internet fibre. ' +
    'Lors d’un incident de coupure de fibre optique principale, le trafic vers le siège ne bascule pas sur le lien 4G de secours, ' +
    'et certains paquets destinés à des serveurs internes empruntent par erreur la passerelle Internet publique avant d’être détruits. ' +
    'Les ingénieurs réseau doivent décortiquer l’algorithme décisionnel de la table de routage Cisco, comprendre la suprématie absolue du ' +
    'Longest Prefix Match (LPM) sur la Distance Administrative, configurer des routes statiques précises, des routes de dernier recours (0.0.0.0/0) ' +
    'et déployer des routes statiques flottantes pour garantir la résilience des liens. ' +
    'Ce cinquième module aborde le cœur névralgique de l’acheminement des paquets IP.',

  objectives: [
    'comprendre le rôle fondamental d’un routeur L3 et le cycle de vie d’un paquet IP traversant plusieurs sous-réseaux ;',
    'interpréter avec précision la table de routage Cisco IOS issue de la commande « show ip route » (codes C, L, S, O, D) ;',
    'maîtriser l’algorithme Longest Prefix Match (LPM) pour prédire quelle route sera choisie face à des préfixes concurrents ;',
    'différencier la Distance Administrative (fiabilité de la source) de la métrique (coût du chemin) ;',
    'configurer des routes statiques complètes (via adresse de prochain saut ou interface de sortie) et des routes par défaut (0.0.0.0/0) ;',
    'concevoir une route statique flottante (Floating Static Route) avec Distance Administrative élevée pour le secours automatique ;',
    'agréger plusieurs sous-réseaux contigus en un unique préfixe résumé (Supernetting / Route Summarization).'
  ],

  sections: [
    {
      title: 'Principes du Routage L3 &amp; Lecture de « show ip route »',
      html: [
        '<p>Un <strong>routeur</strong> est un équipement de niveau 3 (Réseau) dont la mission est d’acheminer les paquets IP ' +
        'entre des réseaux logiques distincts. Pour chaque paquet reçu, il consulte sa <strong>table de routage (RIB / FIB)</strong> ' +
        'afin de déterminer l’interface de sortie et l’adresse du prochain saut (Next-Hop).</p>',

        '<p>La commande <code>show ip route</code> affiche les routes apprises, précédées d’un code identifiant leur origine :</p>',

        '<table class="table">',
        '  <thead>',
        '    <tr><th>Code</th><th>Origine</th><th>Distance Administrative</th><th>Exemple de Ligne Cisco IOS</th></tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr><td><code>C</code></td><td>Directement connectée</td><td>0</td><td><code>C 192.168.1.0/24 is directly connected, GigabitEthernet0/0</code></td></tr>',
        '    <tr><td><code>L</code></td><td>Hôte local (Local host)</td><td>0</td><td><code>L 192.168.1.254/32 is directly connected, GigabitEthernet0/0</code></td></tr>',
        '    <tr><td><code>S</code></td><td>Statique manuelle</td><td>1 (défaut)</td><td><code>S 10.0.0.0/8 [1/0] via 192.168.1.1</code></td></tr>',
        '    <tr><td><code>S*</code></td><td>Route par défaut / Candidat</td><td>1</td><td><code>S* 0.0.0.0/0 [1/0] via 198.51.100.254</code></td></tr>',
        '    <tr><td><code>O</code></td><td>OSPF dynamique</td><td>110</td><td><code>O 172.16.0.0/16 [110/20] via 10.1.1.2</code></td></tr>',
        '    <tr><td><code>D</code></td><td>EIGRP dynamique</td><td>90</td><td><code>D 10.20.0.0/16 [90/30720] via 10.1.1.2</code></td></tr>',
        '    <tr><td><code>B</code></td><td>BGP externe (eBGP)</td><td>20</td><td><code>B 203.0.113.0/24 [20/0] via 198.51.100.1</code></td></tr>',
        '  </tbody>',
        '</table>',

        '<p><strong>Structure de l’entrée <code>[AD/Métrique]</code> :</strong> Le premier nombre entre crochets représente la ' +
        '<strong>Distance Administrative</strong> (plus elle est petite, plus la source est jugée fiable). ' +
        'Le second nombre est la <strong>Métrique</strong> (coût calculé par le protocole pour atteindre la cible).</p>'
      ].join('\n')
    },
    {
      title: 'L’Algorithme Décisionnel : Longest Prefix Match (LPM)',
      html: [
        '<p>L’une des règles les plus importantes de la certification CCNA est l’ordre de priorité appliqué par le routeur lors du routage :</p>',

        '<ol>',
        '  <li><strong>Règle n°1 — Longest Prefix Match (LPM) :</strong><br>',
        '    Le routeur recherche toutes les routes dont le réseau englobe l’adresse IP destination du paquet. ' +
        '    Parmi les routes candidates, <strong>la route ayant le préfixe le plus long (le masque le plus spécifique) est OBLIGATOIREMENT choisie</strong>. ' +
        '    Cette règle l’emporte toujours, indépendamment de la Distance Administrative ou de la métrique !</li>',
        '  <li><strong>Règle n°2 — Distance Administrative (AD) :</strong><br>',
        '    Si deux routes candidates ont <strong>exactement la même longueur de préfixe</strong> (ex: deux routes vers <code>10.0.0.0/24</code>), ' +
        '    le routeur installe dans sa table de routage celle qui possède la plus petite Distance Administrative.</li>',
        '  <li><strong>Règle n°3 — Métrique la plus faible :</strong><br>',
        '    Si les deux routes proviennent du même protocole (même préfixe et même AD), la route ayant la plus petite métrique est préférée.</li>',
        '</ol>',

        box('warning', 'Exemple Piège Classique de Concours &amp; Certification', [
          '<p>Soit la table suivante :<br>',
          '1. <code>S 10.0.0.0/16 [1/0] via 192.168.1.1</code> (Route statique, AD=1)<br>',
          '2. <code>O 10.0.1.0/24 [110/20] via 192.168.2.1</code> (Route OSPF, AD=110)</p>',
          '<p>Un paquet arrive pour <strong>10.0.1.50</strong>. Quelle route est empruntée ?<br>',
          'Réponse : La route <strong>OSPF (/24)</strong> ! Même si son AD est de 110 contre 1 pour la statique, son masque de 24 bits est plus long que le masque de 16 bits. Le Longest Prefix Match a toujours la priorité absolue.</p>'
        ].join('\n'))
      ].join('\n')
    },
    {
      title: 'Configuration des Routes Statiques &amp; Route par Défaut',
      html: [
        '<p>Une route statique est configurée manuellement par l’administrateur avec la syntaxe globale :<br>',
        '<code>Router(config)# ip route &lt;reseau_destination&gt; &lt;masque&gt; &lt;next_hop_ip | interface_sortie&gt;</code></p>',

        '<ul>',
        '  <li><strong>Route vers prochain saut (Next-Hop IP) :</strong><br>',
        '    <code>R1(config)# ip route 192.168.20.0 255.255.255.0 10.0.0.2</code><br>',
        '    Recommandé sur les interfaces multi-accès Ethernet (évite les résolutions ARP abusives).</li>',
        '  <li><strong>Route directement connectée (Interface de sortie) :</strong><br>',
        '    <code>R1(config)# ip route 192.168.20.0 255.255.255.0 Serial0/0/0</code><br>',
        '    Adapté aux liaisons point-à-point série.</li>',
        '  <li><strong>Route entièrement spécifiée (Fully Specified Route) :</strong><br>',
        '    <code>R1(config)# ip route 192.168.20.0 255.255.255.0 GigabitEthernet0/1 10.0.0.2</code></li>',
        '  <li><strong>Route par défaut (Passerelle de dernier recours) :</strong><br>',
        '    <code>R1(config)# ip route 0.0.0.0 0.0.0.0 198.51.100.254</code><br>',
        '    Représentée par <code>0.0.0.0/0</code>, elle matche tous les paquets qui n’ont aucune route spécifique dans la table. C’est la passerelle vers Internet.</li>',
        '</ul>'
      ].join('\n')
    },
    {
      title: 'Routes Statiques Flottantes &amp; Supernetting',
      html: [
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4 class="card-title">Routes Statiques Flottantes (Secours)</h4>',
        '    <p>Une <strong>route statique flottante</strong> est configurée avec une Distance Administrative manuellement rehaussée ' +
        'pour être supérieure à celle de la liaison principale :</p>',
        '    <pre><code>! Lien principal fibre (AD 1 par defaut)\nip route 10.0.0.0 255.0.0.0 172.16.1.1\n! Lien 4G secours (AD forcee a 10)\nip route 10.0.0.0 255.0.0.0 172.16.2.1 10</code></pre>',
        '    <p>La route AD 10 reste dormante hors de la table de routage tant que le lien primaire fonctionne. En cas de coupure du lien primaire, elle s’injecte instantanément dans la table.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4 class="card-title">Supernetting (Résumé de Routes)</h4>',
        '    <p>Le <strong>supernetting</strong> permet d’agréger plusieurs sous-réseaux contigus en un unique préfixe résumé CIDR pour alléger la table :</p>',
        '    <p>Exemple : 4 réseaux /24 contigus :<br>',
        '    <code>192.168.0.0/24</code>, <code>192.168.1.0/24</code>, <code>192.168.2.0/24</code>, <code>192.168.3.0/24</code><br>',
        '    Tous partagent les 22 premiers bits binaires identiques.<br>',
        '    Leur résumé optimal est : <code>192.168.0.0/22</code> (masque 255.255.252.0).</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],

  methodTitle: 'Méthodologie d’Ingénierie &amp; Troubleshooting du Routage IP',
  method: [
    'Étape 1 — Inspection de la table : Lancer « show ip route » et vérifier la présence des réseaux directement connectés (C/L) et statiques (S).',
    'Étape 2 — Test LPM : Identifier le préfixe englobant le plus long pour l’adresse IP ciblée afin de connaître le prochain saut retenu.',
    'Étape 3 — Vérification du prochain saut : S’assurer que l’adresse IP du next-hop est bien joignable sur le lien local (vérifier « show ip arp »).',
    'Étape 4 — Contrôle de la route retour : S’assurer que le routeur distant dispose lui aussi d’une route valide pour retourner les paquets (routage bidirectionnel).',
    'Étape 5 — Validation de secours : Débrancher temporairement le lien primaire pour attester que la route statique flottante prend bien le relais.'
  ],

  summary: [
    'Le routeur L3 achemine les paquets IP en consultant sa table de routage (RIB/FIB).',
    'Chaque entrée de table comprend un code source (C, L, S, O, D), un préfixe et le couple [Distance Administrative / Métrique].',
    'L’algorithme Longest Prefix Match (LPM) donne la priorité absolue à la route ayant le masque le plus long (le plus spécifique).',
    'La Distance Administrative mesure la fiabilité de la source (Directe 0, Statique 1, EIGRP 90, OSPF 110, RIP 120).',
    'La route par défaut 0.0.0.0 0.0.0.0 permet d’acheminer tous les paquets vers Internet en l’absence de route plus spécifique.',
    'Une route statique flottante possède une AD supérieure à la route normale pour s’activer uniquement en cas de panne.',
    'Le supernetting agrège plusieurs sous-réseaux contigus en un préfixe résumé optimal pour réduire la taille des tables de routage.'
  ],

  checklist: [
    'Je sais lire et expliquer chaque champ d’une sortie « show ip route » sous Cisco IOS.',
    'J’applique sans hésitation l’algorithme Longest Prefix Match pour déterminer la route gagnante.',
    'Je connais par cœur les distances administratives des principales sources de routage (0, 1, 90, 110, 120).',
    'Je sais rédiger la commande exacte d’une route statique, d’une route par défaut et d’une route flottante.',
    'Je sais calculer le masque agrégé d’un ensemble de sous-réseaux contigus (Supernetting).'
  ],

  notions: [
    'Routage de niveau 3 et table de routage',
    'Commande « show ip route » et codes C, L, S, O',
    'Distance Administrative (AD) et métrique',
    'Algorithme Longest Prefix Match (LPM)',
    'Route statique (ip route) et next-hop',
    'Route par défaut (0.0.0.0/0)',
    'Route statique flottante (Floating Static Route)',
    'Résumé de routes et Supernetting CIDR'
  ],

  pitfalls: [
    'Penser que la Distance Administrative a la priorité sur la longueur du préfixe : le Longest Prefix Match l’emporte toujours.',
    'Oublier que le routage est bidirectionnel : envoyer un paquet avec succès ne sert à rien si le routeur de destination ne sait pas répondre.',
    'Utiliser uniquement l’interface de sortie sur un lien Ethernet multi-accès (provoque une tempête de requêtes ARP proxy).',
    'Configurer une route flottante avec une AD inférieure ou égale à la route principale, écrasant ainsi la route normale.',
    'Résumer des sous-réseaux non contigus ou inclure des réseaux tiers par erreur dans un calcul de supernetting.'
  ],

  questions: [
    {
      stem: 'Dans la sortie de « show ip route », que représente le premier chiffre entre crochets dans l’expression « [110/35] » ?',
      opts: [
        'Le nombre de sauts jusqu’au réseau cible',
        'La Distance Administrative (AD) mesurant la fiabilité du protocole',
        'La bande passante disponible en mégabits par seconde',
        'Le temps de convergence en millisecondes'
      ],
      correct: 1,
      exp: 'Dans l’affichage [110/35], 110 est la Distance Administrative (ici OSPF) et 35 est la métrique (coût du lien).'
    },
    {
      stem: 'Soit deux routes dans la table : 192.168.1.0/24 via 10.0.0.1 (AD 1) et 192.168.1.128/25 via 10.0.0.2 (AD 110). Vers quelle adresse IP un paquet destiné à 192.168.1.150 est-il acheminé ?',
      opts: [
        'Vers 10.0.0.1 car la Distance Administrative 1 est meilleure que 110',
        'Vers 10.0.0.2 car le préfixe /25 est plus spécifique (Longest Prefix Match)',
        'Le paquet est équilibré 50/50 entre les deux prochains sauts',
        'Le paquet est rejeté pour ambiguïté de routage'
      ],
      correct: 1,
      exp: 'L’algorithme Longest Prefix Match s’applique en premier : /25 est plus long que /24. La Distance Administrative ne sert qu’à départager des routes de même longueur de masque.'
    },
    {
      stem: 'Quelle est la syntaxe correcte pour configurer une route par défaut vers la passerelle 203.0.113.1 sous Cisco IOS ?',
      opts: [
        'ip route default 203.0.113.1',
        'ip route 0.0.0.0 0.0.0.0 203.0.113.1',
        'ip default-gateway 203.0.113.1',
        'ip route *.*.*.* 203.0.113.1'
      ],
      correct: 1,
      exp: 'La route par défaut sous Cisco IOS est définie par le préfixe 0.0.0.0 avec le masque 0.0.0.0, soit la commande « ip route 0.0.0.0 0.0.0.0 203.0.113.1 ».'
    },
    {
      stem: 'Quelle est la valeur de la Distance Administrative par défaut attribuée à une route directement connectée (C) ?',
      opts: ['0', '1', '90', '110'],
      correct: 0,
      exp: 'Une route directement connectée a une Distance Administrative de 0, ce qui en fait la source d’information la plus fiable possible.'
    },
    {
      stem: 'Comment qualifie-t-on une route statique configurée avec une Distance Administrative de 150 pour servir de secours à une route OSPF (AD 110) ?',
      opts: ['Une route par défaut', 'Une route statique flottante', 'Une route récursive', 'Une route Anycast'],
      correct: 1,
      exp: 'C’est une route statique flottante (Floating Static Route). Son AD supérieure à 110 la maintient inactive tant qu’OSPF fonctionne, et lui permet de s’injecter en cas de panne d’OSPF.'
    },
    {
      stem: 'Quel préfixe CIDR agrégé (Supernetting) résume au plus juste les deux sous-réseaux contigus 172.16.10.0/24 et 172.16.11.0/24 ?',
      opts: ['172.16.10.0/23', '172.16.0.0/16', '172.16.10.0/22', '172.16.8.0/21'],
      correct: 0,
      exp: 'En binaire, 10 vaut 00001010 et 11 vaut 00001011. Les 7 premiers bits du troisième octet sont identiques, ce qui donne 16 + 7 = 23 bits communs. Le résumé optimal est donc 172.16.10.0/23.'
    },
    {
      stem: 'Que se passe-t-il si un routeur reçoit un paquet destiné à une adresse IP pour laquelle aucune route spécifique n’existe et qu’aucune route par défaut n’est configurée ?',
      opts: [
        'Le routeur diffuse le paquet sur tous ses ports',
        'Le routeur détruit le paquet et renvoie un message ICMP Destination Unreachable à l’émetteur',
        'Le routeur met le paquet en attente pendant 30 secondes',
        'Le routeur renvoie le paquet à l’émetteur sans modification'
      ],
      correct: 1,
      exp: 'Sans route correspondante ni route par défaut (0.0.0.0/0), le paquet est silencieusement détruit et le routeur émet un message ICMP type 3 code 0 (Network Unreachable) vers l’adresse IP source.'
    },
    {
      stem: 'Quelle Distance Administrative possède une route apprise via le protocole EIGRP interne ?',
      opts: ['20', '90', '110', '120'],
      correct: 1,
      exp: 'EIGRP interne possède une Distance Administrative par défaut de 90. (OSPF est à 110, RIP à 120 et eBGP à 20).'
    }
  ],

  flashcards: [
    {
      q: 'Qu’est-ce que l’algorithme Longest Prefix Match (LPM) ?',
      a: 'L’algorithme qui impose au routeur de toujours sélectionner la route dont le masque de sous-réseau est le plus long (le plus spécifique) parmi toutes les routes correspondantes.'
    },
    {
      q: 'Quelle est la différence entre Distance Administrative (AD) et Métrique ?',
      a: 'L’AD mesure la fiabilité globale de la source d’information (0 à 255). La métrique mesure le coût du chemin calculé par un protocole donné (ex: coût OSPF, sauts RIP).'
    },
    {
      q: 'Quelles sont les Distances Administratives de Directe, Statique et OSPF ?',
      a: 'Directement connectée : 0 ; Statique : 1 ; OSPF : 110.'
    },
    {
      q: 'Quelle est la syntaxe d’une route par défaut sous Cisco IOS ?',
      a: 'ip route 0.0.0.0 0.0.0.0 <adresse_prochain_saut | interface>'
    },
    {
      q: 'Qu’est-ce qu’une route statique flottante ?',
      a: 'Une route statique configurée avec une Distance Administrative supérieure à la route primaire, s’activant uniquement lorsque le lien principal tombe en panne.'
    },
    {
      q: 'Qu’est-ce que le Supernetting (résumé de routes) ?',
      a: 'L’agrégation de plusieurs sous-réseaux contigus en un unique préfixe avec un masque plus court pour réduire la taille des tables de routage.'
    }
  ],

  mastery: [
    { cls: 'low', text: 'Moins de 4/8 : Révisez la différence entre Longest Prefix Match et Distance Administrative, ainsi que la syntaxe de ip route.' },
    { cls: 'mid', text: 'De 4 à 6/8 : Bonnes bases. Entraînez-vous à l’arbitrage de routes concurrentes et au calcul de supernetting.' },
    { cls: 'good', text: '7/8 : Très solide compréhension du routage IP, de la FIB et de la configuration des routes flottantes.' },
    { cls: 'top', text: '8/8 : Expert en routage IPv4 ! Vous êtes paré pour le dernier module : les VLANs et le Router-on-a-Stick.' }
  ]
};
