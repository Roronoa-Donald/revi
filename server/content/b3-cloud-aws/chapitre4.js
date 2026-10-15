/**
 * server/content/b3-cloud-aws/chapitre4.js — Chapitre 4
 * Réseau Avancé — Amazon VPC, Sous-réseaux, Routage & Pare-feux (SG / NACL)
 */
'use strict';

module.exports = {
  n: 4,
  title: 'Réseau Avancé — Amazon VPC, Sous-réseaux, Routage & Pare-feux (SG / NACL)',
  short: 'Réseau Amazon VPC & Sécurité',
  toc: 'Amazon VPC, sous-réseaux multi-AZ, adresses réservées, tables de routage, Internet & NAT Gateways, Security Groups et Network ACLs.',
  time: '≈ 2 h 45',
  free: false,

  situation:
    'Dans le cadre du déploiement d\'une architecture cloud d\'entreprise sécurisée, vous devez concevoir l\'infrastructure réseau Amazon Virtual Private Cloud (VPC). ' +
    'Votre mission comprend le découpage d\'un bloc CIDR /16 en sous-réseaux publics, applicatifs et bases de données répartis sur plusieurs zones de disponibilité, ' +
    'la configuration des tables de routage avec passerelles Internet et NAT managées, et le durcissement périmétrique en combinant Security Groups avec état et Network ACLs sans état.',

  objectives: [
    'Concevoir et découper un plan d\'adressage Amazon VPC en sous-réseaux multi-AZ en maîtrisant les 5 adresses IP réservées par sous-réseau.',
    'Configurer les tables de routage et différencier l\'Internet Gateway (sous-réseaux publics) de la NAT Gateway (sous-réseaux privés).',
    'Maîtriser et simuler le filtrage combiné des Security Groups (stateful) et des Network ACLs (stateless, règles numérotées et ports éphémères).',
    'Identifier les solutions d\'interconnexion réseau avancées : VPC Peering, AWS Transit Gateway, VPC Endpoints et Direct Connect.'
  ],

  sections: [
    {
      title: 'Amazon VPC : Blocs CIDR &amp; Sous-réseaux Multi-AZ',
      html: [
        '<p>Amazon Virtual Private Cloud (VPC) est votre réseau virtuel privé isolé au sein du cloud AWS, logiquement équivalent à un réseau d\'entreprise traditionnel :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Plages d\'Adresses CIDR (RFC 1918)</h4>',
        '    <ul>',
        '      <li>Un VPC est associé à un ou plusieurs blocs d\'adresses IPv4 privés (ex: <code>10.0.0.0/16</code> offrant 65 536 adresses).</li>',
        '      <li>Le masque autorisé par AWS est compris strictement entre <code>/16</code> (le plus grand) et <code>/28</code> (le plus petit : 16 adresses).</li>',
        '      <li>Un VPC est une ressource <strong>régionale</strong> ; les sous-réseaux découpés au sein du VPC sont quant à eux strictement confinés à une <strong>Availability Zone unique</strong>.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Les 5 Adresses IP Réservées par Sous-Réseau</h4>',
        '    <p>Dans chaque sous-réseau AWS, 5 adresses IP ne peuvent JAMAIS être attribuées à des instances :</p>',
        '    <ul>',
        '      <li><code>.0</code> : adresse réseau du sous-réseau.</li>',
        '      <li><code>.1</code> : routeur VPC par défaut (passerelle locale).</li>',
        '      <li><code>.2</code> : serveur DNS Amazon (Route 53 Resolver / AmazonProvidedDNS).</li>',
        '      <li><code>.3</code> : réservé par AWS pour extension future.</li>',
        '      <li>Dernière IP (ex: <code>.255</code> pour /24) : adresse de diffusion (broadcast).</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Routage VPC : Internet Gateway, NAT Gateway &amp; Tables de Routage',
      html: [
        '<p>Le trafic au sein d\'un VPC est guidé par des tables de routage associées à chaque sous-réseau :</p>',
        '<div class="grid grid-3">',
        '  <div class="card">',
        '    <h4>Tables de Routage (Route Tables)</h4>',
        '    <p>Chaque table contient une route locale implicite (ex: <code>10.0.0.0/16 &rarr; local</code>) permettant la communication privée entre tous les sous-réseaux du VPC.</p>',
        '    <p>Pour joindre l\'extérieur, une route par défaut <code>0.0.0.0/0</code> est ajoutée vers une cible réseau spécifique.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Internet Gateway (IGW)</h4>',
        '    <p>Passerelle redondante et managée hautement disponible attachée au VPC.</p>',
        '    <p>Un sous-réseau dont la table de routage pointe <code>0.0.0.0/0 &rarr; igw-xxxx</code> est qualifié de <strong>sous-réseau public</strong>. Ses instances ayant une IP publique peuvent échanger directement avec Internet.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>NAT Gateway Managée</h4>',
        '    <p>Déployée obligatoirement dans un sous-réseau public avec une Elastic IP.</p>',
        '    <p>Permet aux instances de <strong>sous-réseaux privés</strong> (route <code>0.0.0.0/0 &rarr; nat-xxxx</code>) d\'initier des connexions sortantes vers Internet (téléchargement de paquets, APIs) tout en bloquant toute intrusion entrante.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Sécurité Réseau : Security Groups (Stateful) vs Network ACLs (Stateless)',
      html: [
        '<p>La défense en profondeur au sein d\'un VPC combine deux lignes de filtrage distinctes :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Security Groups (SG) — Première Ligne (Instance)</h4>',
        '    <ul>',
        '      <li>Opère au niveau de l\'interface réseau élastique (ENI) de l\'instance.</li>',
        '      <li><strong>Avec état (Stateful) :</strong> si une connexion entrante est autorisée, le paquet retour sortant est automatiquement accepté, quel que soit le port éphémère.</li>',
        '      <li>Par défaut en entrée : <strong>tout est bloqué (Deny implicite)</strong>. On ne peut ajouter que des règles d\'autorisation (Allow).</li>',
        '      <li>Toutes les règles sont évaluées globalement.</li>',
        '      <li>Supporte le référencement d\'autres Security Groups comme source.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Network ACLs (NACL) — Seconde Ligne (Sous-Réseau)</h4>',
        '    <ul>',
        '      <li>Opère au niveau de la frontière du sous-réseau (Subnet boundary).</li>',
        '      <li><strong>Sans état (Stateless) :</strong> chaque paquet entrant et sortant est examiné isolément. Le trafic réponse doit obligatoirement être permis explicitement par les règles sortantes (ports éphémères 1024-65535).</li>',
        '      <li>Règles numérotées (1 à 32766) évaluées dans l\'ordre croissant : la première règle correspondante s\'applique immédiatement. Règle finale <code>*</code> par défaut en Deny.</li>',
        '      <li>Prend en charge les règles <strong>Allow</strong> et <strong>Deny</strong> explicites (idéal pour bloquer une IP attaquante spécifique).</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Interconnexion &amp; Passerelles Privées : Peering, Transit Gateway &amp; Endpoints',
      html: [
        '<p>Pour interconnecter plusieurs VPCs et raccorder le réseau sur site (On-Premises) :</p>',
        '<div class="grid grid-3">',
        '  <div class="card">',
        '    <h4>VPC Peering</h4>',
        '    <p>Connexion privée point-à-point entre deux VPCs sans passerelle ni passer par Internet public.</p>',
        '    <p>Attention : le peering est <strong>strictement non-transitif</strong> (si A est connecté à B et B à C, A ne peut pas communiquer avec C sans lien direct A-C).</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>AWS Transit Gateway</h4>',
        '    <p>Hub de routage réseau centralisé en topologie en étoile (Hub-and-Spoke).</p>',
        '    <p>Permet d\'interconnecter des milliers de VPCs et des réseaux sur site avec routage transitif simplifié et tables de routage partagées.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>VPC Endpoints (PrivateLink)</h4>',
        '    <p>Accès privé aux services AWS (S3, DynamoDB, SQS) sans sortir sur Internet ni traverser de NAT Gateway.</p>',
        '    <p>Deux types : <em>Gateway Endpoints</em> (gratuits, pour S3 et DynamoDB via tables de routage) et <em>Interface Endpoints</em> (cartes ENI privées via AWS PrivateLink).</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],

  methodTitle: 'Méthodologie de Conception d\'un VPC d\'Entreprise',
  method: [
    'Dimensionnement du bloc CIDR : sélectionner une plage privée RFC 1918 (ex: 10.0.0.0/16) qui ne chevauche pas les réseaux sur site de l\'entreprise.',
    'Architecture 3-tiers multi-AZ : découper le VPC en sous-réseaux Publics (ALB), Privés Applicatifs (instances EC2) et Privés Données (bases de données RDS) répartis sur au moins 2 AZs distinctes.',
    'Isolation du routage : déployer des passerelles NAT Gateway redondées dans les sous-réseaux publics et n\'associer de passerelle Internet qu\'aux sous-réseaux hébergeant des répartiteurs publics.',
    'Chaining des Security Groups : autoriser le trafic HTTP sur l\'ALB depuis Internet (0.0.0.0/0), autoriser le trafic sur les instances uniquement depuis le groupe de l\'ALB, et autoriser la base de données uniquement depuis le groupe applicatif.'
  ],

  summary: [
    'Amazon VPC fournit un réseau virtuel isolé au sein d\'une région AWS, découpé en sous-réseaux confinés à une Availability Zone unique.',
    'AWS réserve obligatoirement 5 adresses IP dans chaque sous-réseau (.0 réseau, .1 routeur, .2 DNS AWS, .3 futur, .255 broadcast).',
    'Un sous-réseau public achemine son trafic 0.0.0.0/0 vers une Internet Gateway, tandis qu\'un sous-réseau privé utilise une NAT Gateway pour ses flux sortants.',
    'Les Security Groups sont avec état (stateful) au niveau de l\'instance ; les Network ACLs sont sans état (stateless) avec règles numérotées au niveau du sous-réseau.',
    'AWS Transit Gateway simplifie l\'interconnexion complexe de multiples VPCs et sites distants en surmontant la non-transitivité du VPC Peering classique.'
  ],

  checklist: [
    'Savez-vous calculer le nombre exact d\'adresses assignables dans un sous-réseau /24 ou /28 en tenant compte des 5 IPs réservées AWS ?',
    'Comprenez-vous pourquoi une NAT Gateway doit obligatoirement être déployée dans un sous-réseau public pour fonctionner ?',
    'Savez-vous expliquer la différence de comportement entre un Security Group stateful et une Network ACL stateless sur le trafic retour ?',
    'Pouvez-vous justifier l\'intérêt du chaining de Security Groups par rapport à l\'utilisation d\'adresses IP statiques ?',
    'Connaissez-vous la distinction entre un Gateway Endpoint (S3/DynamoDB) et un Interface Endpoint PrivateLink ?'
  ],

  notions: [
    { term: 'Amazon VPC', def: 'Virtual Private Cloud : réseau virtuel isolé régional personnalisable dans le cloud AWS.' },
    { term: 'Adresses Réservées AWS', def: 'Les 5 premières et dernière adresses de tout sous-réseau (.0, .1, .2, .3, .255) réservées pour l\'infrastructure interne.' },
    { term: 'Internet Gateway (IGW)', def: 'Composant managé hautement disponible permettant la communication directe entre un VPC et l\'Internet public.' },
    { term: 'NAT Gateway', def: 'Passerelle de translation d\'adresses permettant aux instances privées d\'accéder à Internet sans être joignables de l\'extérieur.' },
    { term: 'Security Group', def: 'Pare-feu virtuel avec état (stateful) filtrant le trafic au niveau des interfaces réseau élastiques des instances.' },
    { term: 'Network ACL (NACL)', def: 'Pare-feu sans état (stateless) évaluant des règles numérotées par ordre croissant à la frontière du sous-réseau.' },
    { term: 'Ports Éphémères', def: 'Plage de ports clients (1024-65535) obligatoirement autorisée en sortie dans les NACLs pour recevoir les réponses TCP.' },
    { term: 'Transit Gateway', def: 'Hub de routage réseau centralisé en étoile reliant des milliers de VPCs et des réseaux sur site avec transitivité.' }
  ],

  pitfalls: [
    'Oublier de soustraire les 5 adresses IP réservées lors du calcul de dimensionnement des sous-réseaux VPC.',
    'Déployer une NAT Gateway dans un sous-réseau privé : elle ne pourra jamais communiquer avec l\'Internet public sans Internet Gateway dans son sous-réseau.',
    'Bloquer les ports éphémères sortants (1024-65535) dans une Network ACL, provoquant le blocage complet des réponses aux requêtes web des clients.',
    'Tenter d\'utiliser un VPC Peering pour faire du routage transitif entre trois VPCs sans établir de liens de peering directs pour chaque paire.'
  ],

  questions: [
    {
      stem: 'Combien d\'adresses IP utilisables pour des instances sont disponibles dans un sous-réseau AWS de masque /24 (256 adresses au total) ?',
      opts: ['256 adresses', '254 adresses', '251 adresses', '250 adresses'],
      correct: 2,
      exp: 'AWS réserve obligatoirement 5 adresses IP dans chaque sous-réseau (.0 réseau, .1 routeur VPC, .2 DNS, .3 réservé futur, .255 broadcast). Il reste donc 256 - 5 = 251 adresses utilisables.'
    },
    {
      stem: 'Dans quel type de sous-réseau une NAT Gateway doit-elle obligatoirement être déployée pour permettre aux serveurs privés de joindre Internet ?',
      opts: ['Dans un sous-réseau public possédant une route vers une Internet Gateway', 'Dans un sous-réseau privé isolé', 'Sur un serveur physique sur site', 'Dans une Edge Location CloudFront'],
      correct: 0,
      exp: 'Une NAT Gateway doit obligatoirement résider dans un sous-réseau public associé à une Elastic IP pour pouvoir relayer les flux vers l\'Internet Gateway du VPC.'
    },
    {
      stem: 'Pourquoi n\'est-il PAS nécessaire d\'autoriser explicitement les ports clients en sortie dans un Security Group lorsqu\'un flux entrant HTTP (port 80) est accepté ?',
      opts: ['Car le port 80 est gratuit', 'Car les Security Groups sont avec état (Stateful) : le trafic retour d\'une connexion acceptée est automatiquement autorisé', 'Car AWS désactive les pare-feux en sortie', 'Car l\'Internet Gateway gère le filtrage sortant'],
      correct: 1,
      exp: 'Les Security Groups sont Stateful : ils mémorisent l\'état des flux établis. Si le flux entrant est autorisé, le paquet retour vers le client est automatiquement permis.'
    },
    {
      stem: 'Comment les règles d\'une Network ACL (NACL) sont-elles évaluées par AWS lorsqu\'un paquet arrive à la frontière d\'un sous-réseau ?',
      opts: ['Toutes les règles sont évaluées ensemble de façon aléatoire', 'Par ordre croissant de numéro de règle (1, 100, 200...) : la première règle correspondante s\'applique immédiatement', 'Les règles Deny sont toujours prioritaires quel que soit leur numéro', 'Par ordre alphabétique de protocole'],
      correct: 1,
      exp: 'Les NACLs évaluent les règles dans l\'ordre strictement croissant de leur numéro. Dès qu\'une règle correspond au trafic (Allow ou Deny), la décision est prise et l\'évaluation s\'arrête.'
    },
    {
      stem: 'Pourquoi le VPC Peering classique entre VPC A, VPC B et VPC C ne permet-il pas à A de communiquer avec C si seuls les peerings A-B et B-C sont configurés ?',
      opts: ['Car le VPC Peering n\'est pas compatible avec IPv4', 'Car le routage par VPC Peering est strictement non-transitif : il n\'y a pas de routage par rebond via un VPC intermédiaire', 'Car B bloque le trafic par défaut', 'Car il faut redémarrer les VPCs'],
      correct: 1,
      exp: 'Le peering VPC ne supporte pas le routage transitif. Pour que A et C communiquent, il faut soit créer un peering direct A-C, soit utiliser une AWS Transit Gateway.'
    },
    {
      stem: 'Quelle adresse IP est automatiquement affectée au résolveur DNS AmazonProvidedDNS dans le sous-réseau 10.0.5.0/24 ?',
      opts: ['10.0.5.1', '10.0.5.2', '10.0.5.254', '169.254.169.254'],
      correct: 1,
      exp: 'Dans tout sous-réseau AWS, l\'adresse réseau + 2 (.2) est systématiquement réservée pour le serveur DNS interne fourni par Amazon (Route 53 Resolver).'
    },
    {
      stem: 'Quel service d\'interconnexion physique dédiée permet de relier un centre de données sur site à un VPC AWS avec une bande passante garantie de 1 à 100 Gbps ?',
      opts: ['AWS Direct Connect', 'VPC Peering', 'AWS Storage Gateway', 'Internet Gateway'],
      correct: 0,
      exp: 'AWS Direct Connect établit une liaison réseau en fibre dédiée privée entre les locaux d\'une entreprise et AWS, contournant entièrement l\'Internet public pour garantir performance et sécurité.'
    },
    {
      stem: 'Quelle est la taille minimale (le plus petit sous-réseau) autorisée par AWS lors de la création d\'un sous-réseau VPC ?',
      opts: ['/32 (1 adresse)', '/30 (4 adresses)', '/28 (16 adresses)', '/24 (256 adresses)'],
      correct: 2,
      exp: 'Le plus petit bloc CIDR autorisé par AWS pour un sous-réseau est /28 (16 adresses au total, dont 11 assignables à des interfaces après déduction des 5 IPs réservées).'
    }
  ],

  flashcards: [
    {
      q: 'Combien d\'adresses IP AWS réserve-t-il dans chaque sous-réseau VPC ?',
      a: '5 adresses : .0 (réseau), .1 (routeur VPC), .2 (DNS Amazon), .3 (réservé futur), et .255 (broadcast).'
    },
    {
      q: 'Quelle est la différence fondamentale entre Security Group et Network ACL ?',
      a: 'Security Group = avec état (stateful) au niveau de l\'instance ; Network ACL = sans état (stateless) au niveau du sous-réseau.'
    },
    {
      q: 'Quelle route qualifie un sous-réseau de public ?',
      a: 'Une route par défaut 0.0.0.0/0 pointant vers une Internet Gateway (igw-xxxx).'
    },
    {
      q: 'À quoi sert une NAT Gateway dans un Amazon VPC ?',
      a: 'À permettre aux instances des sous-réseaux privés d\'accéder à Internet en sortie sans accepter de connexions entrantes.'
    },
    {
      q: 'Qu\'est-ce que la non-transitivité du VPC Peering ?',
      a: 'Si A est appairé à B et B à C, A ne peut pas communiquer avec C via B sans établir un lien direct ou utiliser une Transit Gateway.'
    },
    {
      q: 'Pourquoi une NACL sortante doit-elle autoriser les ports éphémères (1024-65535) ?',
      a: 'Car étant sans état (stateless), la NACL ne mémorise pas la connexion entrante et doit explicitement autoriser le paquet réponse.'
    }
  ],

  mastery: [
    { cls: 'low', text: 'Score < 60 % : Adressage VPC et rôles des passerelles à revoir. Relisez la section sur les 5 adresses réservées et la NAT Gateway.' },
    { cls: 'mid', text: 'Score 60-74 % : Bases du réseau acquises. Approfondissez le fonctionnement stateless des Network ACLs.' },
    { cls: 'mid', text: 'Score 75-84 % : Bonne maîtrise d\'ensemble. Entraînez-vous à simuler le filtrage SG et NACL dans l\'atelier.' },
    { cls: 'high', text: 'Score 85-94 % : Niveau solide. Vous maîtrisez l\'architecture 3-tiers et les interconnexions Transit Gateway.' },
    { cls: 'high', text: 'Score ≥ 95 % : Maîtrise d\'architecte réseau AWS. Prêt pour le stockage S3 et les bases RDS/DynamoDB du Module 5 !' }
  ]
};
