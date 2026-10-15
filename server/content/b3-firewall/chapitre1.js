/**
 * Chapitre 1 du cours « Firewall & Sécurité Réseau B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 1,
  title: 'Fondements, Évolution des Pare-feux &amp; Filtrage Sans État (Stateless)',
  short: 'Fondements &amp; Filtrage Stateless',
  toc: 'Concepts de sécurité périmétrique, zones de confiance, filtrage de paquets statique L3/L4, en-têtes IP/TCP, règles Default DROP et limites du filtrage sans état.',
  time: '≈ 2 h 45 de travail',
  free: true,
  situation: 'Au sein d’une infrastructure d’entreprise interconnectée à Internet, tout équipement non protégé est soumis à un bombardement ininterrompu de sondes automatisées, de balayages de ports et de tentatives d’exploitation de failles. L’ingénieur réseau et sécurité de niveau Bachelor 3 est chargé de concevoir le périmètre de défense. Historiquement, les premiers routeurs filtrants s’appuyaient sur un filtrage de paquets élémentaire sans état (Stateless). Cependant, examiner chaque paquet de manière isolée sans conserver l’historique des connexions crée des failles béantes : un pirate peut injecter de faux paquets de réponse (ACK) pour traverser le pare-feu et cartographier les serveurs internes. Comprendre les fondements du filtrage L3/L4, l’anatomie des en-têtes et les faiblesses inhérentes aux pare-feux de 1re génération est indispensable pour appréhender les architectures de sécurité modernes.',
  objectives: [
    'définir les concepts clés de la sécurité périmétrique, le modèle de défense en profondeur et la cartographie des zones de confiance ;',
    'analyser la structure détaillée des en-têtes de paquets IPv4 et des segments TCP/UDP exploités lors du filtrage réseau ;',
    'maîtriser le principe de filtrage de paquets sans état (Stateless) et la formulation de règles d’accès élémentaires ;',
    'appliquer rigoureusement la politique de sécurité du moindre privilège et le refus implicite par défaut (Default DROP) ;',
    'identifier les failles majeures du filtrage sans état face aux attaques par usurpation (Spoofing) et injection de paquets forgés ;',
    'développer en Python 3 des classificateurs d’architectures pare-feu, des auditeurs d’isolation de zones et un moteur d’inspection stateless.'
  ],
  sections: [
    {
      title: 'Périmètre de Sécurité &amp; Cartographie des Zones de Confiance',
      html: [
        '<p>Un pare-feu (Firewall) est un dispositif matériel, logiciel ou virtuel intercalé entre deux ou plusieurs réseaux, chargé de contrôler et de filtrer l’ensemble des flux entrants et sortants conformément à une <strong>politique de sécurité prédéfinie (PSSI)</strong>.</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. Les Zones de Confiance</h4>',
        '    <ul>',
        '      <li><strong>Zone Interne (Trust / LAN) :</strong> Réseau des collaborateurs et postes de travail d’entreprise. Niveau de confiance le plus élevé.</li>',
        '      <li><strong>Zone Externe (Untrust / WAN) :</strong> Internet ou réseaux tiers non maîtrisés. Niveau de confiance nul ; zone hostile par définition.</li>',
        '      <li><strong>Zone Démilitarisée (DMZ) :</strong> Zone tampon hébergeant les serveurs publics (Web, Mail, DNS). Niveau de confiance intermédiaire.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Les Postures de Filtrage Fondamentales</h4>',
        '    <ul>',
        '      <li><strong>Politique Exclusive (Whitelisting / Default DROP) :</strong> Tout ce qui n’est pas formellement autorisé est strictement interdit. C’est la seule approche acceptable en sécurité professionnelle.</li>',
        '      <li><strong>Politique Inclusive (Blacklisting / Default ACCEPT) :</strong> Tout est autorisé par défaut sauf une liste noire de services. Approche hautement risquée et proscrite en entreprise.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Les Quatre Générations Technologiques de Pare-feux',
      html: [
        '<p>Depuis les années 1980, les technologies de pare-feux ont évolué en quatre ruptures majeures pour faire face à la sophistication des attaques :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Génération 1 : Filtrage de Paquets Sans État (Stateless)</h4>',
        '    <p>Opère en couches 3 (Réseau) et 4 (Transport) du modèle OSI. Analyse chaque paquet unitairement sans mémoire : IP source, IP destination, protocole, port source et port destination. Très rapide mais aveugle au contexte conversationnel.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Génération 2 : Inspection avec Suivi d’État (Stateful)</h4>',
        '    <p>Introduit la table d’état (conntrack). Surveille le cycle de vie complet des connexions TCP (SYN, SYN-ACK, ACK, FIN) et n’autorise les paquets entrants que s’ils correspondent à une session légitimement initiée.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Génération 3 : Gestion Unifiée des Menaces (UTM)</h4>',
        '    <p>Consolide sur une appliance unique le filtrage stateful, un proxy applicatif, un antivirus de flux, un antispam et un VPN IPSec/SSL. Idéal pour les PME mais sensible aux saturations de charge.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Génération 4 : Pare-feux Nouvelle Génération (NGFW)</h4>',
        '    <p>Inspection monocycle matérielle de couche 7 (DPI). Identification des applications réelles indépendamment des ports (App-ID), cartographie des identités utilisateurs (User-ID) et bac à sable (Sandboxing) anti-zero day avec IA.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Mécanique du Filtrage de Paquets Stateless &amp; Anatomie des En-têtes',
      html: [
        '<p>Le filtrage stateless inspecte les champs binaires standardisés des en-têtes protocolaires :</p>',
        '<table class="table">',
        '  <thead>',
        '    <tr><th>Champ inspecté</th><th>Couche OSI</th><th>Taille</th><th>Utilisation dans la règle de filtrage</th></tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr><td><code>IP Source (SIP)</code></td><td>Couche 3 (Réseau)</td><td>32 bits (IPv4)</td><td>Identifier l’émetteur ou restreindre à un sous-réseau autorisé (CIDR).</td></tr>',
        '    <tr><td><code>IP Destination (DIP)</code></td><td>Couche 3 (Réseau)</td><td>32 bits (IPv4)</td><td>Identifier l’hôte ou le serveur cible du flux.</td></tr>',
        '    <tr><td><code>Protocole IP (Proto)</code></td><td>Couche 3 (Réseau)</td><td>8 bits</td><td>Valeurs standard : 6 (TCP), 17 (UDP), 1 (ICMP).</td></tr>',
        '    <tr><td><code>Port Source (Sport)</code></td><td>Couche 4 (Transport)</td><td>16 bits</td><td>Généralement éphémère et aléatoire côté client (plage 1024-65535).</td></tr>',
        '    <tr><td><code>Port Destination (Dport)</code></td><td>Couche 4 (Transport)</td><td>16 bits</td><td>Identifie le service cible (22 SSH, 80 HTTP, 443 HTTPS, 53 DNS).</td></tr>',
        '    <tr><td><code>Drapeaux TCP (Flags)</code></td><td>Couche 4 (Transport)</td><td>6 à 9 bits</td><td>SYN, ACK, FIN, RST, PSH, URG : indicateurs d’état du protocole TCP.</td></tr>',
        '  </tbody>',
        '</table>',
        box('warning', 'La Vulnérabilité Critique du Filtrage Stateless aux Paquets ACK Forgés', [
          '<p>Pour permettre à un poste interne d’accéder au Web externe, un pare-feu stateless doit autoriser le trafic retour provenant des serveurs Internet. Comme il ne garde aucune mémoire de la session, la règle de retour autorise classiquement tout paquet externe ayant le port source 80 ou le drapeau ACK activé.</p>',
          '<p><strong>L’attaque :</strong> Un pirate distant forge des paquets TCP personnalisés avec le drapeau ACK activé (<code>nmap -sA</code> ou <code>scapy</code>) et cible directement des serveurs internes. Le pare-feu stateless constate que le drapeau ACK est présent, déduit à tort qu’il s’agit du retour légitime d’une requête interne, et laisse passer le paquet ! C’est cette faiblesse structurelle rédhibitoire qui a imposé l’avènement du filtrage stateful.</p>'
        ])
      ].join('\n')
    }
  ],
  methodTitle: 'Démarche d’Audit &amp; de Spécification d’un Périmètre Pare-feu',
  method: [
    '1. Identifier et cartographier les zones réseau de l’infrastructure (LAN bureautique, DMZ publique, WAN Internet, réseau d’administration).',
    '2. Établir l’inventaire exhaustif des flux métier légitimes nécessaires au fonctionnement des applications (IP sources, IP cibles, ports et protocoles).',
    '3. Appliquer la politique de sécurité Default DROP sur l’ensemble des interfaces d’entrée et de sortie.',
    '4. Spécifier les règles de filtrage autorisées (White-list) en privilégiant la granularité maximale (IP spécifiques plutôt que plages larges).',
    '5. Vérifier que les règles de filtrage stateless ne permettent aucun contournement par injection de drapeaux TCP ou usurpation d’adresse IP source.',
    '6. Journaliser systématiquement tous les paquets rejetés pour alimenter la surveillance de sécurité et la détection d’incidents.'
  ],
  summary: [
    'Le pare-feu est le pivot de la sécurité périmétrique d’entreprise, séparant les zones de confiance (LAN) des zones hostiles (WAN).',
    'La politique de sécurité professionnelle repose impérativement sur le Default DROP : tout flux non expressément autorisé est rejeté.',
    'Le filtrage stateless de 1re génération analyse les en-têtes L3/L4 (IP, ports, drapeaux) de chaque paquet de façon isolée.',
    'L’absence de mémoire d’état expose les pare-feux stateless aux injections de paquets ACK forgés et à l’usurpation IP.',
    'L’évolution vers les générations Stateful, UTM et NGFW répond à l’impératif de corrélation temporelle et d’inspection applicative L7.'
  ],
  checklist: [
    'Les concepts de sécurité périmétrique et de zones de confiance (LAN, DMZ, WAN) sont maîtrisés.',
    'Les 4 générations technologiques de pare-feux (Stateless, Stateful, UTM, NGFW) sont clairement différenciées.',
    'Les champs clés des en-têtes IPv4, TCP et UDP sont identifiés.',
    'Le principe du Default DROP (Whitelisting) est assimilé et justifié.',
    'La vulnérabilité des pare-feux stateless face aux paquets ACK forgés est comprise.',
    'Les 3 ateliers de programmation interactive en Python 3 (fw3-c1-e1 à fw3-c1-e3) sont validés.'
  ],
  notions: [
    'Sécurité périmétrique',
    'Zones de confiance',
    'Filtrage sans état (Stateless)',
    'En-têtes IPv4 et TCP/UDP',
    'Politique Default DROP',
    'Générations de pare-feux',
    'Appliance UTM vs NGFW',
    'Drapeaux TCP (SYN, ACK, FIN)'
  ],
  pitfalls: [
    'Confondre politique Default DROP (fermeture par défaut) et Default ACCEPT (ouverture par défaut hautement vulnérable).',
    'Croire qu’un pare-feu stateless peut différencier une réponse légitime d’un paquet ACK injecté par un attaquant.',
    'Sous-estimer les limites du filtrage L4 lorsque les applications malveillantes empruntent les ports autorisés 80 et 443.',
    'Autoriser des plages d’adresses ANY ANY sans restriction de ports sur des interfaces connectées à Internet.'
  ],
  questions: [
    {
      stem: 'Quelle est la principale caractéristique d’un pare-feu de 1re génération (Stateless Packet Filtering) ?',
      opts: [
        'Il analyse chaque paquet individuellement sans conserver d’historique ni de contexte de connexion',
        'Il déchiffre les sessions TLS HTTPS pour inspecter le contenu des pages web',
        'Il maintient une table des sessions actives conntrack en mémoire RAM',
        'Il bloque automatiquement les attaques par injection SQL via un moteur d’analyse comportementale'
      ],
      correct: 0,
      exp: 'Le pare-feu stateless filtre uniquement sur la base des en-têtes L3/L4 de chaque paquet pris isolément, sans conserver l’état des sessions.'
    },
    {
      stem: 'Pourquoi la politique de sécurité « Default DROP » est-elle recommandée par toutes les normes de cybersécurité ?',
      opts: [
        'Elle garantit que tout flux non expressément autorisé est bloqué, appliquant le principe du moindre privilège',
        'Elle améliore le débit réseau en supprimant le besoin d’écrire des règles de filtrage',
        'Elle autorise tous les paquets sortants sans aucune vérification d’adresse IP',
        'Elle désactive la journalisation des paquets suspects pour économiser le stockage'
      ],
      correct: 0,
      exp: 'La politique Default DROP (liste blanche) assure qu’aucun flux imprévu ou suspect ne peut traverser le pare-feu sans avoir été explicitement validé.'
    },
    {
      stem: 'Comment un attaquant peut-il contourner un pare-feu stateless autorisant le trafic web de retour ?',
      opts: [
        'En forgeant un paquet TCP avec le drapeau ACK activé pour faire croire au retour d’une session déjà établie',
        'En envoyant des paquets ICMP Echo Request avec une charge utile vide',
        'En modifiant l’adresse MAC de sa passerelle par défaut',
        'En envoyant un paquet avec le drapeau SYN pour forcer le serveur à réinitialiser son horloge'
      ],
      correct: 0,
      exp: 'Un pare-feu stateless ne sachant pas si une session a été réellement initiée, il laisse passer un paquet avec ACK actif s’il a une règle autorisant les retours.'
    },
    {
      stem: 'Quel champ de l’en-tête IP indique si le paquet transporte des données TCP, UDP ou ICMP ?',
      opts: [
        'Le champ Protocole (Protocol, 8 bits)',
        'Le champ Durée de vie (TTL, Time To Live)',
        'Le champ Version (4 bits)',
        'Le champ Somme de contrôle (Header Checksum)'
      ],
      correct: 0,
      exp: 'Le champ Protocole de l’en-tête IPv4 indique la nature du protocole encapsulé en couche supérieure (6 pour TCP, 17 pour UDP, 1 pour ICMP).'
    },
    {
      stem: 'Dans quelle plage numérique se situent généralement les ports éphémères attribués dynamiquement aux clients sortants ?',
      opts: [
        '1024 à 65535 (ou 49152 à 65535 selon les systèmes récents)',
        '0 à 1023 (ports bien connus ou well-known ports)',
        'Uniquement le port 80 et le port 443',
        'Exactement les ports multiples de 256'
      ],
      correct: 0,
      exp: 'Les ports 0 à 1023 sont réservés aux services système bien connus (serveurs), tandis que les clients utilisent des ports dynamiques éphémères supérieurs à 1023.'
    },
    {
      stem: 'Quelle est la différence fondamentale entre une appliance UTM et un pare-feu NGFW ?',
      opts: [
        'L’UTM regroupe plusieurs briques logicielles hétérogènes sur un même boîtier, tandis que le NGFW intègre nativement une inspection monocycle L7 haute performance',
        'L’UTM opère uniquement en couche 2, alors que le NGFW ne traite que la couche 3',
        'L’UTM est réservé aux datacenters bancaires et le NGFW aux particuliers',
        'L’UTM ne dispose d’aucun module antivirus ni de VPN'
      ],
      correct: 0,
      exp: 'L’UTM consolide plusieurs services de sécurité distincts (souvent juxtaposés), tandis que le NGFW dispose d’une architecture monocycle intégrée conçue pour les hauts débits.'
    },
    {
      stem: 'Dans une architecture réseau standard, quel niveau de confiance est attribué à la zone DMZ ?',
      opts: [
        'Un niveau de confiance intermédiaire entre le LAN hautement sécurisé et le WAN non sécurisé',
        'Le même niveau de confiance absolu que le LAN interne',
        'Un niveau de confiance nul, identique à Internet sans aucune règle de filtrage',
        'Un niveau de confiance supérieur à celui des postes d’administration'
      ],
      correct: 0,
      exp: 'La DMZ est une zone tampon de confiance intermédiaire hébergeant des serveurs exposés publiquement mais isolée des postes internes.'
    },
    {
      stem: 'Que se passe-t-il si un paquet entrant ne correspond à aucune règle explicite dans un pare-feu configuré en Default DROP ?',
      opts: [
        'Le paquet est rejeté silencieusement (DROP) ou avec un message d’erreur (REJECT)',
        'Le paquet est routé par défaut vers l’interface la plus rapide',
        'Le paquet est mis en attente indéfiniment dans une file tampon',
        'Le paquet est transmis au contrôleur de domaine pour vérification'
      ],
      correct: 0,
      exp: 'En politique Default DROP, l’absence de correspondance avec les règles permissives entraîne la destruction immédiate du paquet.'
    }
  ],
  flashcards: [
    {
      q: 'Qu’est-ce qu’un pare-feu stateless (sans état) ?',
      a: 'Un équipement filtrant chaque paquet de manière isolée sur ses en-têtes L3/L4 sans maintenir l’historique des sessions.'
    },
    {
      q: 'Quelle est la règle d’or de la politique « Default DROP » ?',
      a: 'Tout flux qui n’est pas explicitement autorisé par une règle de la liste blanche est rejeté par défaut.'
    },
    {
      q: 'Quels champs d’en-tête sont examinés par un filtre L3/L4 ?',
      a: 'IP source, IP destination, protocole de transport (TCP/UDP/ICMP), port source, port destination et drapeaux TCP.'
    },
    {
      q: 'Pourquoi le filtrage stateless est-il vulnérable aux paquets ACK forgés ?',
      a: 'Parce qu’il ne sait pas si un paquet ACK correspond à une connexion réellement initiée de l’intérieur et le laisse passer.'
    },
    {
      q: 'Qu’est-ce qui caractérise un pare-feu de 4e génération (NGFW) ?',
      a: 'L’inspection applicative de couche 7 (DPI/App-ID), l’identification des utilisateurs (User-ID) et l’analyse anti-zero day.'
    },
    {
      q: 'Quel est le rôle d’une zone DMZ dans l’infrastructure réseau ?',
      a: 'Isoler les serveurs exposés à Internet afin qu’une compromission ne permette pas d’accéder directement au réseau LAN interne.'
    }
  ],
  mastery: [
    { cls: 'low', text: 'Niveau initial : vous confondez encore filtrage avec et sans état, ou vous utilisez une politique Default ACCEPT permissive.' },
    { cls: 'medium', text: 'Niveau opérationnel : vous formulez des règles L3/L4 cohérentes en Default DROP et comprenez les risques des paquets forgés.' },
    { cls: 'high', text: 'Maîtrise B3 : vous concevez des architectures périmétriques étanches, auditez les zones de confiance et choisissez la génération de pare-feu adaptée.' }
  ]
};
