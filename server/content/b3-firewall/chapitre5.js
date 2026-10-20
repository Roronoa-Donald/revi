/**
 * Chapitre 5 du cours « Firewall & Sécurité Réseau B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 5,
  title: 'Filtrage Applicatif L7, UTM &amp; Pare-feux Nouvelle Génération (NGFW)',
  short: 'Filtrage Applicatif L7 &amp; NGFW',
  toc: 'Limites du filtrage de port L4, identification applicative App-ID, inspection du champ SNI TLS, filtrage web catégoriel, protection anti-DoS par rate limiting et moteur DPI (Deep Packet Inspection).',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B3 et plus',
  situation: 'À l’ère du Web moderne où plus de 95% du trafic Internet mondial est chiffré en HTTPS (port 443) et où les applications contournent systématiquement les filtres traditionnels par tunneling HTTP, le filtrage classique par numéro de port (L4) est devenu obsolète. Un pare-feu qui autorise le port 443 laisse passer indistinctement une consultation d’annuaire légitime, un partage de fichiers non autorisé sur un compte cloud personnel, une session de jeu en ligne ou un canal de commande et contrôle (C2) de rançongiciel. Pour contrer cette évasion, les pare-feux nouvelle génération (NGFW) et appliances UTM opèrent en couche 7 (Application) du modèle OSI. Ils inspectent le champ SNI (Server Name Indication) dans le handshake TLS, déchiffrent ou analysent le contenu via Deep Packet Inspection (DPI) pour intercepter les attaques SQLi/XSS, et appliquent du Rate Limiting pour juguler les dénis de service.',
  objectives: [
    'comprendre l’obsolescence du filtrage de port L4 face au chiffrement HTTPS et au tunneling applicatif ;',
    'maîtriser le fonctionnement de l’inspection applicative L7 (App-ID) et de l’identification des utilisateurs (User-ID) ;',
    'analyser le champ SNI (Server Name Indication) dans le message TLS Client Hello pour le filtrage de domaines sans interception SSL ;',
    'mettre en œuvre des politiques de filtrage d’URL et de réputation catégorielle (malware, phishing, réseaux sociaux) ;',
    'concevoir un moteur de Deep Packet Inspection (DPI) capable de détecter les signatures d’injections SQL, XSS et traversées de répertoires ;',
    'développer en Python 3 des filtres SNI TLS, des limiteurs de débit anti-DoS et un moteur de détection de signatures L7.'
  ],
  sections: [
    {
      title: 'L’Obsolescence du Filtrage de Port L4 &amp; l’Approche App-ID / NGFW',
      html: [
        '<p>Historiquement, un pare-feu considérait qu’un paquet TCP à destination du port 80 était du trafic Web HTTP et que le port 443 était du Web sécurisé HTTPS. Cette hypothèse est aujourd’hui caduque :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Les Failles du Filtrage par Port L4</h4>',
        '    <ul>',
        '      <li><strong>Tunneling applicatif :</strong> N’importe quelle application (SSH, VPN Tor, jeux, transferts BitTorrent) peut encapsuler son trafic sur le port 443 pour franchir le pare-feu sans encombre.</li>',
        '      <li><strong>Ports dynamiques &amp; évasifs :</strong> Les outils de communication modernes (WebRTC, VoIP, messageries instantanées) négocient des ports dynamiquement.</li>',
        '      <li><strong>Chevauchement de risques :</strong> Autoriser le port 443 autorise aussi bien le portail RH de l’entreprise que des sites de phishing ou des plateformes de partage de données fuitées.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>La Réponse NGFW : App-ID &amp; User-ID</h4>',
        '    <ul>',
        '      <li><strong>App-ID :</strong> Le NGFW décode le protocole réel au-delà du numéro de port grâce à des signatures applicatives, des décodeurs protocolaires et des heuristiques comportementales.</li>',
        '      <li><strong>User-ID :</strong> Les règles ne sont plus liées à de simples adresses IP volatiles mais à des identités issues de l’annuaire d’entreprise (Active Directory, LDAP, SSO).</li>',
        '      <li><strong>Content-ID :</strong> Analyse continue des flux à la recherche de logiciels malveillants, virus, vulnérabilités et fuites de données sensibles (DLP).</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Inspection SNI (Server Name Indication) &amp; Filtrage Web Catégoriel',
      html: [
        '<p>Lorsque le trafic est chiffré en TLS/HTTPS, comment le pare-feu peut-il filtrer les sites web sans casser le chiffrement (ce qui pose des défis juridiques et techniques de certificats racines) ?</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Mécanique du SNI dans le Handshake TLS</h4>',
        '    <p>Au tout début de la connexion chiffrée, le navigateur client envoie un message en clair appelé <strong>Client Hello</strong>. Pour permettre au serveur d’héberger plusieurs sites web sur la même adresse IP (hébergement virtuel), le paquet inclut l’extension <strong>SNI (Server Name Indication)</strong> contenant le nom de domaine complet (FQDN) visé (ex: <code>banque-securisee.phishing.evil</code>).</p>',
        '    <p>Le pare-feu intercepte ce nom de domaine <em>avant</em> que la session ne devienne chiffrée.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Bases de Réputation Catégorielle</h4>',
        '    <p>Le nom de domaine extrait est confronté en temps réel à une base de réputation catégorielle :</p>',
        '    <ul>',
        '      <li><code>MALWARE / PHISHING :</code> Blocage systématique (DROP ou page de blocage de sécurité).</li>',
        '      <li><code>GAMBLING / ADULT :</code> Interdit selon la politique d’usage des ressources d’entreprise.</li>',
        '      <li><code>SOCIAL MEDIA / STREAMING :</code> Blocage ou limitation de bande passante (QoS).</li>',
        '      <li><code>BUSINESS / TECH :</code> Trafic autorisé sans restriction.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Deep Packet Inspection (DPI) &amp; Protection Anti-DoS par Rate Limiting',
      html: [
        '<p>L’inspection profonde des paquets (<strong>DPI</strong>) examine le contenu textuel ou binaire de la charge utile de niveau 7 :</p>',
        '<table class="table">',
        '  <thead>',
        '    <tr><th>Catégorie de Menace L7</th><th>Motifs &amp; Signatures Inspectés (DPI)</th><th>Comportement du Pare-feu / WAF</th></tr>',
        '  </thead>',
        '  <tbody>',
        "    <tr><td><code>Injection SQL (SQLi)</code></td><td><code>UNION SELECT</code>, <code>' OR '1'='1</code>, <code>SLEEP(</code>, <code>DROP TABLE</code></td><td>Rejet de la requête HTTP 403 Forbidden et log d’alerte SIEM immédiat.</td></tr>",
        '    <tr><td><code>Cross-Site Scripting (XSS)</code></td><td><code>&lt;script&gt;</code>, <code>javascript:</code>, <code>onerror=</code>, <code>onload=</code></td><td>Blocage de l’injection de scripts dans les formulaires et URLs.</td></tr>',
        '    <tr><td><code>Path Traversal</code></td><td><code>../</code>, <code>..%2f</code>, <code>..\\</code>, <code>/etc/passwd</code>, <code>win.ini</code></td><td>Interdiction d’accès aux fichiers système sous-jacents du serveur.</td></tr>',
        '  </tbody>',
        '</table>',
        box('warning', 'Mitigation des Attaques DoS par Rate Limiting en Fenêtre Glissante', [
          '<p>Les attaques par déni de service applicatif ou par force brute saturent les serveurs en générant des centaines de requêtes à la seconde. Le module de <strong>Rate Limiting</strong> applique un filtre par fenêtre glissante : chaque adresse IP source dispose d’un quota maximal de requêtes autorisées sur un intervalle temporel donné (ex: max 3 requêtes par tranche de 5 secondes). Dès que le seuil est franchi, les requêtes excédentaires sont silencieusement supprimées (DROPPED), protégeant l’infrastructure contre les pointes anormales de charge.</p>'
        ])
      ].join('\n')
    }
  ],
  methodTitle: 'Démarche de Déploiement &amp; de Durcissement d’un Pare-feu NGFW',
  method: [
    '1. Activer le moteur de décodage applicatif L7 (App-ID) pour identifier le trafic réel indépendamment des ports réseau.',
    '2. Intégrer l’annuaire d’entreprise (Active Directory, Azure AD/Entra ID) pour fonder les règles sur les groupes d’utilisateurs (User-ID).',
    '3. Configurer le filtrage web catégoriel basé sur l’inspection du Server Name Indication (SNI) des requêtes TLS.',
    '4. Activer les profils de sécurité anti-menaces : signatures d’attaques applicatives DPI (injections SQL, failles XSS, traversées de répertoires).',
    '5. Mettre en œuvre des seuils de Rate Limiting sur les points d’entrée publics pour neutraliser les inondations applicatives DoS.',
    '6. Mettre en place un déchiffrement SSL/TLS ciblé (SSL Forward Proxy) sur les flux sensibles après validation de conformité juridique (RGPD).'
  ],
  summary: [
    'Le filtrage par port L4 est devenu inefficace face au chiffrement généralisé HTTPS et au contournement par tunneling.',
    'Les NGFW s’appuient sur l’identification applicative (App-ID) et l’identité de l’utilisateur (User-ID) pour gouverner les flux.',
    'L’inspection du champ SNI TLS permet de catégoriser et de bloquer les domaines malveillants sans déchiffrer la charge utile.',
    'Le Deep Packet Inspection (DPI) analyse la charge utile L7 à la recherche de signatures d’attaques web (SQLi, XSS, Path Traversal).',
    'Le Rate Limiting par fenêtre glissante protège les serveurs contre les inondations de trafic et les attaques par force brute.'
  ],
  checklist: [
    'Les limites du filtrage de port L4 et les concepts clés du NGFW (App-ID, User-ID, Content-ID) sont assimilés.',
    'Le rôle de l’extension SNI TLS dans le handshake Client Hello est compris.',
    'La gestion des politiques de filtrage d’URL catégoriel est maîtrisée.',
    'Les signatures d’attaques applicatives L7 majeures (SQLi, XSS, Path Traversal) sont identifiées.',
    'Le mécanisme de Rate Limiting par fenêtre glissante est compris et formulé.',
    'Les 3 ateliers de programmation interactive en Python 3 (fw3-c5-e1 à fw3-c5-e3) sont validés.'
  ],
  notions: [
    'Pare-feu Nouvelle Génération (NGFW)',
    'Identification applicative (App-ID)',
    'Identité utilisateur (User-ID)',
    'Inspection SNI TLS',
    'Filtrage d’URL catégoriel',
    'Deep Packet Inspection (DPI)',
    'Signatures d’attaques L7 (SQLi/XSS)',
    'Rate Limiting &amp; Anti-DoS'
  ],
  pitfalls: [
    'Penser que le trafic chiffré HTTPS ne peut faire l’objet d’aucun contrôle sans déchiffrement complet (le champ SNI est en clair).',
    'Autoriser le port 443 sans inspection applicative, permettant aux rançongiciels d’exfiltrer des données ou de contacter des serveurs C2.',
    'Appliquer un Rate Limiting trop agressif qui bloque légitimement des utilisateurs partageant une même adresse IP de sortie (NAT d’entreprise).',
    'Confondre un pare-feu réseau classique L3/L4 et un Web Application Firewall (WAF) ou moteur DPI L7.'
  ],
  questions: [
    {
      stem: 'Pourquoi le filtrage basé uniquement sur les numéros de ports TCP/UDP (L4) est-il devenu insuffisant aujourd’hui ?',
      opts: [
        'Parce que la quasi-totalité du trafic web et des applications modernes passe par le port 443 chiffré en HTTPS pour contourner les blocages',
        'Parce que les routeurs ne savent plus lire les en-têtes TCP',
        'Parce que le protocole IPv4 a été totalement désactivé sur Internet',
        'Parce que les câbles Ethernet bloquent les numéros de ports supérieurs à 80'
      ],
      correct: 0,
      exp: 'Presque toutes les applications utilisent le port 443, rendant impossible la distinction entre un trafic légitime et une menace sur la seule base du port.'
    },
    {
      stem: 'Dans quel paquet de la négociation TLS le nom de domaine complet du serveur est-il transmis en clair via l’extension SNI ?',
      opts: [
        'Dans le message Client Hello envoyé par le navigateur client au tout début du handshake',
        'Dans le message Server Hello envoyé par le serveur à la fin',
        'Uniquement après l’échange complet des clés asymétriques',
        'Dans les paquets de données TCP ACK de fermeture'
      ],
      correct: 0,
      exp: 'Le champ SNI (Server Name Indication) est transmis en clair dans le Client Hello avant que le chiffrement de la session ne soit activé.'
    },
    {
      stem: 'Quel est l’avantage majeur de l’inspection SNI par rapport au déchiffrement SSL Man-in-the-Middle complet ?',
      opts: [
        'Elle ne nécessite aucun déploiement de certificat racine d’autorité sur les postes clients et préserve les performances du pare-feu',
        'Elle permet de modifier le contenu des pages web à la volée',
        'Elle empêche totalement les utilisateurs d’utiliser le protocole DNS',
        'Elle fonctionne même si le câble réseau est débranché'
      ],
      correct: 0,
      exp: 'L’inspection SNI lit simplement le nom de domaine en clair dans le handshake sans casser la chaîne cryptographique ni poser de contraintes de conformité RGPD.'
    },
    {
      stem: 'Quel type d’attaque applicative est caractérisé par la présence de motifs comme "UNION SELECT" ou "\' OR \'1\'=\'1" dans les requêtes HTTP ?',
      opts: [
        'Une injection SQL (SQLi)',
        'Une attaque par rebond ICMP Smurf',
        'Un empoisonnement de cache DNS',
        'Une attaque de force brute sur le protocole ARP'
      ],
      correct: 0,
      exp: 'Ces motifs exploitent des formulaires ou paramètres web mal échappés pour manipuler directement la base de données SQL sous-jacente.'
    },
    {
      stem: 'Quel mécanisme permet de neutraliser les attaques par inondation de requêtes en limitant le nombre d’appels par seconde pour chaque adresse IP ?',
      opts: [
        'Le Rate Limiting par fenêtre glissante (ou algorithme du seau à jetons / Token Bucket)',
        'L’augmentation indéfinie de la mémoire vive du serveur',
        'La réinitialisation quotidienne de la passerelle par défaut',
        'Le passage en mode duplex intégral sur le commutateur'
      ],
      correct: 0,
      exp: 'Le Rate Limiting plafonne le débit de requêtes autorisé par émetteur sur une période glissante pour contrer les dénis de service et attaques par force brute.'
    },
    {
      stem: 'Comment appelle-t-on la technologie NGFW capable d’associer les règles de sécurité à des identités nominatives d’utilisateurs plutôt qu’à des adresses IP ?',
      opts: [
        'User-ID',
        'App-ID',
        'MAC-Filtering',
        'Content-ID'
      ],
      correct: 0,
      exp: 'User-ID (Palo Alto / Fortinet) fait le lien dynamique entre l’adresse IP d’un terminal et le compte utilisateur authentifié dans l’annuaire d’entreprise.'
    },
    {
      stem: 'Quelle menace le Deep Packet Inspection (DPI) vise-t-il à neutraliser lorsqu’il détecte des chaînes telles que "../../../etc/passwd" ?',
      opts: [
        'Une attaque par traversée de répertoires (Path Traversal / Directory Traversal)',
        'Un déni de service distribué volumétrique UDP',
        'Une attaque de l’homme du milieu ARP Poisoning',
        'Une saturation de la bande passante par flux vidéo'
      ],
      correct: 0,
      exp: 'La présence de séquences "../" indique une tentative d’accès non autorisé à des fichiers système situés hors de la racine du serveur web.'
    },
    {
      stem: 'Qu’est-ce que l’App-ID dans l’architecture d’un pare-feu de nouvelle génération ?',
      opts: [
        'La capacité à identifier la nature exacte de l’application logicielle (ex: Facebook, Dropbox, BitTorrent) quel que soit le port utilisé',
        'Un numéro de série gravé sur la carte mère du pare-feu',
        'L’adresse IP publique allouée au serveur de messagerie',
        'Un protocole de routage dynamique propriétaire'
      ],
      correct: 0,
      exp: 'App-ID classe le flux selon l’application réelle sous-jacente par analyse de signature et décodage protocolaire de couche 7.'
    }
  ],
  flashcards: [
    {
      q: 'Pourquoi le filtrage de port L4 est-il devenu inefficace ?',
      a: 'Parce que les applications et menaces modernes s’encapsulent massivement dans le port 443 chiffré en HTTPS.'
    },
    {
      q: 'Qu’est-ce que l’extension SNI dans le protocole TLS ?',
      a: 'Le Server Name Indication, champ transmis en clair dans le Client Hello indiquant le nom de domaine visé.'
    },
    {
      q: 'Quel est l’intérêt du filtrage SNI sans déchiffrement ?',
      a: 'Bloquer les sites malveillants par catégorie de réputation sans installer de certificats ni impacter les performances.'
    },
    {
      q: 'Qu’est-ce que le Deep Packet Inspection (DPI) ?',
      a: 'L’analyse du contenu applicatif de niveau 7 à la recherche de signatures d’attaques (SQLi, XSS, exploits).'
    },
    {
      q: 'À quoi sert le Rate Limiting par fenêtre glissante ?',
      a: 'Limiter le quota de requêtes par IP sur une durée donnée pour bloquer les dénis de service et forces brutes.'
    },
    {
      q: 'Quelle est la différence entre App-ID et User-ID ?',
      a: 'App-ID identifie l’application réelle en transit ; User-ID identifie l’utilisateur métier authentifié.'
    }
  ],
  mastery: [
    { cls: 'low', text: 'Niveau initial : vous croyez encore que le port 443 garantit un trafic web légitime et ignorez le fonctionnement du SNI.' },
    { cls: 'medium', text: 'Niveau opérationnel : vous configurez des règles de filtrage SNI catégoriel et comprenez le principe des signatures DPI.' },
    { cls: 'high', text: 'Maîtrise B3 : vous concevez des politiques NGFW complètes articulant App-ID, User-ID, rate limiting anti-DoS et inspection DPI de pointe.' }
  ]
};
