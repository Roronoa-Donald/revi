/**
 * Chapitre 2 du cours « CCNA Réseau » B2 — Adressage IPv4, Masquage, CIDR et Découpage VLSM.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 2,
  title: 'Adressage IPv4, Masquage, CIDR &amp; Découpage VLSM',
  short: 'IPv4 &amp; VLSM',
  toc: 'Structure des adresses IPv4 (32 bits), classes historiques (A, B, C), plages privées RFC 1918, masques de sous-réseau, notation CIDR, masques génériques Wildcard et découpage hiérarchique VLSM sans gaspillage.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Une entreprise multisite en pleine croissance hérite d’un bloc d’adresses IP sous-dimensionné. ' +
    'Des conflits d’adresses et des pannes de connectivité surviennent régulièrement suite à un partitionnement statique inadapté. ' +
    'L’architecte réseau doit restructurer l’ensemble du plan d’adressage avec la méthode VLSM (Variable Length Subnet Masking), ' +
    'séparer les réseaux locaux utilisateurs, les zones de serveurs et les liaisons point-à-point sans gaspiller une seule adresse, ' +
    'tout en calculant rigoureusement les adresses réseau, de broadcast et les masques génériques pour les futures ACL de sécurité. ' +
    'Ce deuxième module forge les compétences de calcul d’adressage indispensables à tout ingénieur réseau certifié Cisco.',

  objectives: [
    'analyser la structure binaire d’une adresse IPv4 de 32 bits découpée en partie réseau et partie hôte ;',
    'distinguer les classes historiques d’adresses (A, B, C) et identifier sans hésiter les plages privées RFC 1918 ;',
    'convertir rapidement entre notation CIDR (/n), masque décimal pointé et masque inversé (Wildcard) ;',
    'déterminer l’adresse réseau, l’adresse de diffusion (broadcast) et la plage d’adresses hôtes valides d’un sous-réseau quelconque ;',
    'appliquer la méthode VLSM hiérarchique en ordonnançant les besoins pour optimiser l’espace sans chevauchement.'
  ],

  sections: [
    {
      title: 'Structure d’une Adresse IPv4 &amp; Classes d’Adresses',
      html: [
        '<p>Une adresse IPv4 est un identifiant logique de <strong>32 bits</strong>, classiquement représenté sous forme décimale pointée ' +
        'en 4 octets séparés par des points (ex: <code>192.168.1.10</code>). Elle est composée de deux parties :</p>',
        '<ul>',
        '  <li><strong>La partie réseau (Network ID) :</strong> Identifiez le réseau ou sous-réseau auquel appartient l’hôte.</li>',
        '  <li><strong>La partie hôte (Host ID) :</strong> Identifiez l’interface réseau spécifique au sein de ce sous-réseau.</li>',
        '</ul>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4 class="card-title">Classes Historiques (Classful)</h4>',
        '    <ul>',
        '      <li><strong>Classe A (1.0.0.0 à 126.255.255.255) :</strong> Masque par défaut <code>/8</code> (255.0.0.0). Plus de 16 millions d’hôtes.</li>',
        '      <li><strong>Classe B (128.0.0.0 à 191.255.255.255) :</strong> Masque par défaut <code>/16</code> (255.255.0.0). 65 534 hôtes.</li>',
        '      <li><strong>Classe C (192.0.0.0 à 223.255.255.255) :</strong> Masque par défaut <code>/24</code> (255.255.255.0). 254 hôtes.</li>',
        '      <li><strong>Classe D (224.0.0.0 à 239.255.255.255) :</strong> Trafic Multicast réservé.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4 class="card-title">Plages Privées (RFC 1918) &amp; Spéciales</h4>',
        '    <ul>',
        '      <li><strong>10.0.0.0/8 :</strong> 10.0.0.0 à 10.255.255.255 (Grande entreprise).</li>',
        '      <li><strong>172.16.0.0/12 :</strong> 172.16.0.0 à 172.31.255.255 (16 classes B).</li>',
        '      <li><strong>192.168.0.0/16 :</strong> 192.168.0.0 à 192.168.255.255 (256 classes C).</li>',
        '      <li><strong>127.0.0.0/8 :</strong> Boucle locale (Loopback / localhost).</li>',
        '      <li><strong>169.254.0.0/16 :</strong> Adressage automatique local (APIPA).</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Masques de Sous-Réseau, Notation CIDR &amp; Masques Génériques (Wildcards)',
      html: [
        '<p>Le <strong>masque de sous-réseau</strong> est une suite continue de <code>1</code> binaires pour la portion réseau, ' +
        'suivie de <code>0</code> binaires pour la portion hôte. La notation <strong>CIDR (Classless Inter-Domain Routing)</strong> ' +
        'indique simplement le nombre total de bits à 1 (ex: <code>/24</code> = 24 bits à 1 et 8 bits à 0).</p>',

        '<p>Le <strong>masque générique (Wildcard mask)</strong> est l’inverse bit à bit du masque de sous-réseau. ' +
        'Il s’obtient en soustrayant chaque octet du masque à 255 (ex: <code>255.255.255.255 - 255.255.255.224 = 0.0.0.31</code>). ' +
        'Cisco utilise le wildcard mask dans les déclarations de réseaux OSPF et dans les listes de contrôle d’accès (ACL).</p>',

        '<table class="table">',
        '  <thead>',
        '    <tr><th>Préfixe</th><th>Masque Décimal</th><th>Wildcard Mask</th><th>Nombre d’Hôtes Utiles</th><th>Usage Typique</th></tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr><td><code>/24</code></td><td>255.255.255.0</td><td>0.0.0.255</td><td>254 hôtes</td><td>Grand département / LAN</td></tr>',
        '    <tr><td><code>/26</code></td><td>255.255.255.192</td><td>0.0.0.63</td><td>62 hôtes</td><td>Service moyen (50 postes)</td></tr>',
        '    <tr><td><code>/27</code></td><td>255.255.255.224</td><td>0.0.0.31</td><td>30 hôtes</td><td>Équipe technique / pool dev</td></tr>',
        '    <tr><td><code>/28</code></td><td>255.255.255.240</td><td>0.0.0.15</td><td>14 hôtes</td><td>Sous-réseau serveurs internes</td></tr>',
        '    <tr><td><code>/29</code></td><td>255.255.255.248</td><td>0.0.0.7</td><td>6 hôtes</td><td>Interconnexion passerelles</td></tr>',
        '    <tr><td><code>/30</code></td><td>255.255.255.252</td><td>0.0.0.3</td><td>2 hôtes</td><td>Liaison point-à-point routeur</td></tr>',
        '    <tr><td><code>/31</code></td><td>255.255.255.254</td><td>0.0.0.1</td><td>2 hôtes (RFC 3021)</td><td>Lien point-à-point moderne sans broadcast</td></tr>',
        '    <tr><td><code>/32</code></td><td>255.255.255.255</td><td>0.0.0.0</td><td>1 hôte</td><td>Adresse d’hôte unique / Loopback</td></tr>',
        '  </tbody>',
        '</table>'
      ].join('\n')
    },
    {
      title: 'Calcul Pratique d’un Sous-Réseau : Réseau, Broadcast &amp; Plage',
      html: [
        '<p>Pour toute adresse IP et son masque (ex: <code>192.168.10.77/26</code>), les éléments clés se calculent ainsi :</p>',
        '<ol>',
        '  <li><strong>Nombre de bits d’hôte :</strong> <code>32 - 26 = 6 bits</code>.</li>',
        '  <li><strong>Taille du bloc (pas d’incrément) :</strong> <code>2^6 = 64 adresses</code> (ou <code>256 - 192 = 64</code> sur le 4e octet).</li>',
        '  <li><strong>Adresse réseau :</strong> Le multiple de 64 immédiatement inférieur ou égal à 77 est <strong>64</strong> -&gt; <code>192.168.10.64</code>.</li>',
        '  <li><strong>Adresse de broadcast :</strong> Prochain réseau (64 + 64 = 128) moins 1 -&gt; <code>192.168.10.127</code>.</li>',
        '  <li><strong>Premier hôte exploitable :</strong> Adresse réseau + 1 -&gt; <code>192.168.10.65</code>.</li>',
        '  <li><strong>Dernier hôte exploitable :</strong> Adresse broadcast - 1 -&gt; <code>192.168.10.126</code>.</li>',
        '  <li><strong>Nombre d’hôtes utiles :</strong> <code>2^6 - 2 = 62 hôtes</code>.</li>',
        '</ol>',

        box('warning', 'Pourquoi soustrait-on 2 adresses ?', [
          '<p>Dans un sous-réseau IPv4 classique (CIDR &lt;= 30), deux adresses sont strictement réservées et ne peuvent jamais être attribuées à une interface hôte :</p>',
          '<ul>',
          '  <li><strong>L’adresse réseau :</strong> où tous les bits d’hôte sont à 0, utilisée pour identifier le sous-réseau dans les tables de routage.</li>',
          '  <li><strong>L’adresse de diffusion (broadcast) :</strong> où tous les bits d’hôte sont à 1, utilisée pour contacter tous les hôtes du segment en une seule émission.</li>',
          '</ul>'
        ].join('\n'))
      ].join('\n')
    },
    {
      title: 'Méthodologie du Découpage Hiérarchique VLSM',
      html: [
        '<p>Le <strong>VLSM (Variable Length Subnet Masking)</strong> permet d’appliquer des masques de longueurs différentes à l’intérieur d’un même réseau mère, ' +
        'adaptant la taille exacte de chaque sous-réseau au nombre réel d’hôtes requis.</p>',

        '<p><strong>Règle d’or VLSM :</strong> L’attribution des sous-réseaux doit impérativement s’effectuer par <strong>ordre décroissant du nombre d’hôtes demandés</strong> :</p>',
        '<ol>',
        '  <li>Lister chaque besoin en nombre d’hôtes utiles.</li>',
        '  <li>Trier la liste de la plus forte demande à la plus faible.</li>',
        '  <li>Pour chaque besoin, trouver la plus petite puissance de 2 telle que <code>2^k - 2 &gt;= Hôtes</code>. Le masque est <code>/(32 - k)</code>.</li>',
        '  <li>Allouer le premier sous-réseau à partir de l’adresse de base du réseau mère.</li>',
        '  <li>Le sous-réseau suivant commence immédiatement à l’adresse de broadcast du précédent + 1, en respectant l’alignement naturel de son bloc.</li>',
        '</ol>'
      ].join('\n')
    }
  ],

  methodTitle: 'Algorithme Pas-à-Pas de Résolution VLSM',
  method: [
    'Étape 1 — Ordonnancement : Classer tous les sous-réseaux demandés par ordre strictement décroissant du nombre d’hôtes requis.',
    'Étape 2 — Dimensionnement binaire : Pour chaque sous-réseau, calculer k tel que 2^k - 2 >= Hôtes requis. Déduire le masque /n = /(32 - k).',
    'Étape 3 — Calcul du pas : Déterminer la taille du bloc = 2^k. Repérer sur quel octet porte la frontière du masque.',
    'Étape 4 — Allocation séquentielle : Attribuer le premier bloc à l’adresse réseau de départ. Calculer son broadcast (réseau + bloc - 1).',
    'Étape 5 — Enchaînement sans trou : Démarrer le sous-réseau suivant à l’adresse broadcast précédente + 1 et répéter jusqu’au dernier sous-réseau.'
  ],

  summary: [
    'Une adresse IPv4 fait 32 bits découpés en portion réseau et portion hôte par le masque de sous-réseau.',
    'La RFC 1918 réserve trois plages privées non routables sur Internet public : 10.0.0.0/8, 172.16.0.0/12 et 192.168.0.0/16.',
    'Le nombre d’hôtes utiles pour un masque /n est calculé par la formule 2^(32 - n) - 2.',
    'Le masque générique (Wildcard mask) est le complément à 255 de chaque octet du masque, utilisé notamment pour OSPF et les ACL.',
    'L’adresse réseau a tous ses bits d’hôte à 0 ; l’adresse de broadcast a tous ses bits d’hôte à 1.',
    'La méthode VLSM exige de traiter les besoins par taille décroissante pour éviter tout chevauchement et optimiser l’espace d’adressage.'
  ],

  checklist: [
    'Je connais par cœur les trois plages d’adresses privées de la RFC 1918.',
    'Je sais calculer instantanément le nombre d’hôtes utiles pour n’importe quel préfixe de /24 à /30.',
    'Je sais convertir un masque décimal en masque générique (Wildcard) par soustraction de 255.',
    'Je sais déterminer l’adresse réseau, de broadcast et la plage d’hôtes pour une adresse IP donnée.',
    'J’applique rigoureusement le tri décroissant des besoins pour construire un plan d’adressage VLSM.'
  ],

  notions: [
    'Adresse IPv4 32 bits',
    'Classes A, B, C et plages RFC 1918',
    'Masque de sous-réseau et notation CIDR',
    'Masque générique (Wildcard mask)',
    'Adresse réseau et adresse de broadcast',
    'Formule 2^(32 - n) - 2 hôtes utiles',
    'Découpage VLSM hiérarchique',
    'Liaisons point-à-point /30 et RFC 3021 /31'
  ],

  pitfalls: [
    'Attribuer accidentellement l’adresse réseau ou l’adresse de broadcast à une machine ou une interface routeur.',
    'Effectuer une allocation VLSM sans trier au préalable par ordre décroissant d’hôtes, provoquant des chevauchements d’adresses.',
    'Oublier de compter la passerelle par défaut (interface du routeur) dans le total des hôtes requis pour un sous-réseau.',
    'Confondre le masque décimal (ex: 255.255.255.248) avec le masque générique Wildcard (0.0.0.7).',
    'Penser qu’un masque /31 permet d’avoir 2 hôtes dans une topologie Ethernet partagée classique (le /31 est réservé aux liens point-à-point).'
  ],

  questions: [
    {
      stem: 'Combien d’adresses hôtes exploitables offre un sous-réseau configuré avec un masque de préfixe /27 ?',
      opts: ['32 hôtes', '30 hôtes', '62 hôtes', '14 hôtes'],
      correct: 1,
      exp: 'Pour un /27, il reste 32 - 27 = 5 bits d’hôte. Le nombre total d’adresses est 2^5 = 32, et le nombre d’adresses hôtes utiles est 2^5 - 2 = 30.'
    },
    {
      stem: 'Quelle est l’adresse de diffusion (broadcast) du sous-réseau contenant l’hôte 172.16.20.100/28 ?',
      opts: ['172.16.20.111', '172.16.20.112', '172.16.20.127', '172.16.20.255'],
      correct: 0,
      exp: 'Pour un /28, la taille du bloc est 2^(32-28) = 16. Les multiples de 16 autour de 100 sont 96 et 112. Le réseau est 172.16.20.96 et l’adresse de broadcast est 172.16.20.111 (96 + 16 - 1).'
    },
    {
      stem: 'Quel est le masque générique (Wildcard mask) correspondant au masque de sous-réseau 255.255.255.240 (/28) ?',
      opts: ['0.0.0.15', '0.0.0.31', '0.0.0.240', '255.255.255.15'],
      correct: 0,
      exp: 'Le masque générique s’obtient par soustraction octet par octet à 255 : (255-255).(255-255).(255-255).(255-240) = 0.0.0.15.'
    },
    {
      stem: 'Laquelle de ces adresses IPv4 appartient à une plage privée routable uniquement sur réseau d’entreprise selon la RFC 1918 ?',
      opts: ['172.32.1.5', '192.169.10.1', '172.25.100.50', '169.254.10.20'],
      correct: 2,
      exp: 'La plage privée de classe B s’étend de 172.16.0.0 à 172.31.255.255. L’adresse 172.25.100.50 s’y trouve. 172.32.x est publique, 192.169.x est publique, et 169.254.x est une adresse de lien local APIPA.'
    },
    {
      stem: 'Pourquoi est-il impératif de trier les besoins par nombre décroissant d’hôtes lors d’une allocation VLSM ?',
      opts: [
        'Pour des raisons purement esthétiques dans le tableur',
        'Pour éviter que les petits sous-réseaux ne fragmentent l’espace et brisent l’alignement des puissances de 2 des grands réseaux',
        'Parce que le routeur Cisco refuse d’enregistrer des routes avec des masques croissants',
        'Pour garantir que la passerelle ait toujours l’adresse .1'
      ],
      correct: 1,
      exp: 'Les sous-réseaux doivent être alignés sur des multiples de leur taille (puissances de 2). Commencer par les plus petits blocs fragmenterait l’espace et empêcherait d’allouer les blocs plus volumineux sans gaspiller de grandes plages d’adresses.'
    },
    {
      stem: 'Quel est le préfixe CIDR minimal permettant d’accueillir exactement 50 hôtes utiles sur un sous-réseau ?',
      opts: ['/27', '/26', '/25', '/24'],
      correct: 1,
      exp: '/27 offre 2^5 - 2 = 30 hôtes (insuffisant pour 50). /26 offre 2^6 - 2 = 62 hôtes (suffisant). Le préfixe minimal est donc /26.'
    },
    {
      stem: 'Quel est le premier hôte utilisable sur le sous-réseau 10.50.80.0/20 ?',
      opts: ['10.50.80.0', '10.50.80.1', '10.50.81.1', '10.50.0.1'],
      correct: 1,
      exp: 'Le premier hôte utilisable est toujours l’adresse réseau + 1, soit ici 10.50.80.1.'
    },
    {
      stem: 'Pour interconnecter deux routeurs sur une liaison point-à-point série ou Ethernet dédiée, quel masque standard optimise l’espace sans gaspiller d’adresses ?',
      opts: ['/28 (255.255.255.240)', '/29 (255.255.255.248)', '/30 (255.255.255.252)', '/32 (255.255.255.255)'],
      correct: 2,
      exp: 'Un masque /30 fournit un bloc de 4 adresses : 1 adresse réseau, 1 adresse broadcast et exactement 2 adresses hôtes exploitables, ce qui est parfait pour une liaison entre deux routeurs.'
    }
  ],

  flashcards: [
    {
      q: 'Quelles sont les trois plages d’adresses privées de la RFC 1918 ?',
      a: '10.0.0.0/8 (10.0.0.0 à 10.255.255.255), 172.16.0.0/12 (172.16.0.0 à 172.31.255.255) et 192.168.0.0/16 (192.168.0.0 à 192.168.255.255).'
    },
    {
      q: 'Comment calcule-t-on le nombre d’hôtes utiles d’un sous-réseau /n ?',
      a: 'Formule : 2^(32 - n) - 2 (on soustrait l’adresse réseau et l’adresse de broadcast).'
    },
    {
      q: 'Qu’est-ce qu’un masque générique (Wildcard mask) et comment le calcule-t-on ?',
      a: 'C’est l’inverse d’un masque de sous-réseau, utilisé dans OSPF et les ACL. On le calcule en soustrayant chaque octet du masque à 255 (ex: pour 255.255.255.0 -> 0.0.0.255).'
    },
    {
      q: 'Quelle est la règle d’or de la méthodologie VLSM ?',
      a: 'Trier impérativement tous les besoins par nombre d’hôtes décroissant avant d’attribuer les sous-réseaux de manière séquentielle.'
    },
    {
      q: 'Quelle est la particularité d’un sous-réseau /30 ?',
      a: 'Il contient 4 adresses au total, dont 2 hôtes utilisables. Il est la référence classique pour les liaisons point-à-point entre routeurs.'
    },
    {
      q: 'Qu’est-ce qu’une adresse APIPA (169.254.0.0/16) ?',
      a: 'Une adresse automatiquement auto-assignée par un poste client lorsque le serveur DHCP est injoignable sur le réseau local.'
    }
  ],

  mastery: [
    { cls: 'low', text: 'Moins de 4/8 : Entraînez-vous aux conversions de puissances de 2 et révisez les plages privées RFC 1918.' },
    { cls: 'mid', text: 'De 4 à 6/8 : Bonnes bases sur les masques. Renforcez le calcul des adresses de broadcast et des wildcards.' },
    { cls: 'good', text: '7/8 : Très bonne maîtrise du calcul de sous-réseau et de la logique VLSM.' },
    { cls: 'top', text: '8/8 : Expert en adressage IPv4 et VLSM ! Vous êtes prêt pour la commutation Ethernet et les tables CAM.' }
  ]
};
