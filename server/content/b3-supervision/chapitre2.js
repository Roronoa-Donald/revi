/**
 * server/content/b3-supervision/chapitre2.js — Chapitre 2
 * Architecture des Systèmes de Supervision & Protocoles de Collecte (SNMP & Syslog)
 */
'use strict';

module.exports = {
  n: 2,
  title: 'Architecture des Systèmes de Supervision & Protocoles de Collecte (SNMP & Syslog)',
  short: 'Architecture, SNMP & Syslog',
  toc: 'Modèles centralisés et distribués (proxies), protocoles SNMP v1/v2c/v3 (USM, MIB, OID, Traps/Informs) et normalisation des journaux Syslog RFC 5424.',
  time: '≈ 2 h 45',
  free: false,

  situation:
    'L\'infrastructure de votre organisation s\'étend sur trois sites géographiques distants reliés par des liaisons MPLS et VPN IPsec. ' +
    'Vous devez concevoir l\'architecture technique du système de supervision : implémenter une collecte distribuée avec relais pour soulager la bande passante inter-sites, ' +
    'sécuriser les échanges de télémétrie réseau en migrant les commutateurs et routeurs vers SNMPv3 USM avec authentification SHA et chiffrement AES, ' +
    'et normaliser la collecte centralisée des messages Syslog des pare-feux et serveurs Linux selon la norme RFC 5424.',

  objectives: [
    'Concevoir et dimensionner une architecture de supervision centralisée, distribuée (avec proxys collecteurs) ou hybride.',
    'Maîtriser le fonctionnement du protocole SNMP : arborescence MIB-2, notation OID, différence entre scrutation synchrone (Get/Walk) et alertes asynchrones (Traps/Informs).',
    'Configurer et auditer le modèle de sécurité SNMPv3 USM (niveaux noAuthNoPriv, authNoPriv et authPriv avec algorithmes SHA et AES).',
    'Analyser et décoder la structure des messages Syslog RFC 5424 (calcul de priorité PRI, Facility, Severity et horodatage ISO 8601).'
  ],

  sections: [
    {
      title: 'Composants & Topologies d\'Architecture de Supervision',
      html: [
        '<p>Un système de supervision robuste s\'articule autour de cinq briques techniques fondamentales :</p>',
        '<div class="grid grid-3">',
        '  <div class="card">',
        '    <h4>1. Moteur &amp; Collecteurs</h4>',
        '    <p>Le <strong>Serveur de supervision</strong> orchestre les ordonnancements de scrutation, évalue les seuils d\'alerte et gère l\'état de chaque équipement.</p>',
        '    <p>Des <strong>Collecteurs / Proxies</strong> déportés sur chaque réseau local effectuent les interrogations de proximité et compressent les flux vers le serveur central.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Sondes &amp; Agents</h4>',
        '    <p>Deux modes d\'interrogation coexistent :</p>',
        '    <ul>',
        '      <li><strong>Agentless (sans agent) :</strong> Sondes protocolaires réseau (Ping ICMP, requêtes SNMP, vérifications de ports TCP/UDP, bannières HTTP).</li>',
        '      <li><strong>Agent-based (avec agent) :</strong> Démon logiciel installé sur l\'OS client (Zabbix Agent, Node Exporter, NRPE) pour sonder le système en profondeur.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>3. Stockage, IHM &amp; Alerte</h4>',
        '    <p><strong>Stockage :</strong> Base de séries temporelles (TSDB) pour les métriques et moteur d\'indexation pour les logs.</p>',
        '    <p><strong>Tableau de bord :</strong> Console web d\'exploitation (Grafana, Zabbix UI) avec cartographie topologique et graphiques temps réel.</p>',
        '    <p><strong>Moteur d\'alerte :</strong> Déclenchement multicanal (Email, SMS, Slack, Webhook PagerDuty) avec gestion des escalades.</p>',
        '  </div>',
        '</div>',
        '<h4 style="margin-top: 1.5rem;">Modèles de Déploiement : Centralisé vs Distribué</h4>',
        '<p>Si une <strong>architecture centralisée</strong> suffit pour un réseau local unique, une <strong>architecture distribuée</strong> s\'impose dès que l\'infrastructure comporte plusieurs sites distants ou DMZ : les serveurs proxy locaux interrogent les équipements de leur sous-réseau en local (port UDP 161/162), mettent en mémoire tampon les données en cas de coupure du lien WAN, et transmettent un flux TCP unifié et chiffré vers le serveur maître.</p>'
      ].join('\n')
    },
    {
      title: 'Le Protocole SNMP : Arborescence MIB, OIDs &amp; Évolution Sécuritaire (v1, v2c, v3)',
      html: [
        '<p>Standardisé par l\'IETF, <strong>SNMP (Simple Network Management Protocol)</strong> est le protocole de référence pour superviser les matériels réseaux et serveurs physiques :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Arborescence MIB-2 &amp; Identifiants OID</h4>',
        '    <p>La <strong>MIB (Management Information Base)</strong> organise les données sous forme d\'un arbre hiérarchique normalisé. Chaque paramètre est identifié par un <strong>OID (Object Identifier)</strong> numérique :</p>',
        '    <ul>',
        '      <li><code>1.3.6.1.2.1.1.1</code> : <code>sysDescr</code> — Description du système d\'exploitation et du firmware.</li>',
        '      <li><code>1.3.6.1.2.1.1.3</code> : <code>sysUpTime</code> — Temps de fonctionnement depuis le dernier boot (en centièmes de seconde).</li>',
        '      <li><code>1.3.6.1.2.1.1.5</code> : <code>sysName</code> — Nom FQDN configuré sur la machine.</li>',
        '      <li><code>1.3.6.1.2.1.2.2.1.8.&lt;i&gt;</code> : <code>ifOperStatus</code> — État de l\'interface <code>i</code> (1=up, 2=down).</li>',
        '      <li><code>1.3.6.1.2.1.2.2.1.10.&lt;i&gt;</code> : <code>ifInOctets</code> — Compteur cumulé d\'octets reçus sur l\'interface <code>i</code>.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Évolution Sécuritaire : De SNMPv2c à SNMPv3 USM</h4>',
        '    <ul>',
        '      <li><strong>SNMPv1 &amp; SNMPv2c :</strong> Authentification rudimentaire par « chaîne de communauté » (ex: <code>public</code> en lecture, <code>private</code> en écriture) transmise en texte clair non chiffré sur le réseau (écoute passive triviale).</li>',
        '      <li><strong>SNMPv3 USM (User-based Security Model) :</strong> Gestion par utilisateurs et comptes nominatifs avec trois paliers de sécurité stricts :<br>',
        '      1. <code>noAuthNoPriv</code> : Ni authentification ni chiffrement (déconseillé).<br>',
        '      2. <code>authNoPriv</code> : Authentification cryptographique par hachage (HMAC-SHA ou MD5) garantissant l\'intégrité et l\'identité.<br>',
        '      3. <code>authPriv</code> : Authentification forte (SHA) ET chiffrement intégral de la charge utile (AES-128 / AES-256 ou DES).</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Normalisation de la Journalisation : Syslog RFC 5424',
      html: [
        '<p>Le protocole Syslog centralise les événements émis par les systèmes d\'exploitation, les démons et les pare-feux. La norme <strong>RFC 5424</strong> définit un format de trame universel :</p>',
        '<pre><code>&lt;PRI&gt;VERSION TIMESTAMP HOSTNAME APP-NAME PROCID MSGID [STRUCTURED-DATA] MSG</code></pre>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Décodage de la Priorité PRI</h4>',
        '    <p>La valeur numérique initiale <code>&lt;PRI&gt;</code> encode simultanément la source fonctionnelle et la gravité de l\'événement :</p>',
        '    <ul>',
        '      <li><code>PRI = Facility * 8 + Severity</code></li>',
        '      <li><code>Facility = PRI // 8</code> (0: kernel, 1: user, 3: daemon, 4: auth, 16..23: local0 à local7).</li>',
        '      <li><code>Severity = PRI % 8</code> (0: Emergency, 1: Alert, 2: Critical, 3: Error, 4: Warning, 5: Notice, 6: Informational, 7: Debug).</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Transport &amp; Sécurisation Syslog</h4>',
        '    <ul>',
        '      <li><strong>UDP 514 :</strong> Mode historique sans connexion, léger mais sans garantie de livraison (perte de paquets en cas de congestion réseau).</li>',
        '      <li><strong>TCP 514 / TLS 6514 :</strong> Mode connecté avec accusé de réception, chiffrement fort TLS et contrôle de flux garantissant la non-répudiation des traces d\'audit.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],

  methodTitle: 'Démarche d’Implémentation des Protocoles SNMP & Syslog',
  method: [
    'Définir le plan d\'adressage et d\'accès : configurer les ACL réseau autorisant exclusivement les flux UDP 161/162 vers les adresses IP du serveur de supervision.',
    'Déployer SNMPv3 avec modèle USM : bannir SNMPv1/v2c en clair et imposer le niveau authPriv avec authentification SHA-256 et chiffrement AES-256.',
    'Compiler et intégrer les MIB constructeurs : importer les fichiers MIB (Cisco, HP, Linux MIB-2) pour traduire les OID numériques en symboles lisibles.',
    'Centraliser les flux Syslog RFC 5424 : configurer Rsyslog/Syslog-ng pour acheminer les journaux vers TCP/TLS 6514 avec parsing strict du code PRI (Facility * 8 + Severity).'
  ],

  summary: [
    'SNMP (Simple Network Management Protocol) standardise la scrutation périodique (UDP 161) et la réception asynchrone d\'alertes traps (UDP 162).',
    'L\'arbre MIB (Management Information Base) et les OID hiérarchiques structurent l\'ensemble des métriques d\'un composant système ou réseau.',
    'SNMPv3 USM comble les failles d\'écoute et d\'usurpation des versions antérieures grâce aux modes noAuthNoPriv, authNoPriv et authPriv.',
    'Syslog RFC 5424 encode chaque message avec un entier PRI = Facility * 8 + Severity (0=Emergency à 7=Debug) pour classifier la criticité.',
    'La migration de Syslog vers TCP 514 ou TLS 6514 prévient les pertes de paquets inhérentes à UDP sous forte charge d\'incident.'
  ],

  checklist: [
    'Savez-vous distinguer les ports UDP 161 (polling Get/Walk) et UDP 162 (réception des Traps) ?',
    'Pouvez-vous déchiffrer un OID MIB-2 fondamental tel que 1.3.6.1.2.1.2.2.1.8 (ifOperStatus) ?',
    'Maîtrisez-vous la configuration du niveau de sécurité SNMPv3 authPriv combinant SHA et AES ?',
    'Savez-vous calculer la sévérité et la facility à partir du code PRI Syslog <34> (Facility 4, Severity 2) ?',
    'Pourquoi l\'utilisation de Syslog sur TCP ou TLS est-elle indispensable pour garantir l\'auditabilité des traces ?'
  ],

  notions: [
    { term: 'SNMP', def: 'Simple Network Management Protocol : protocole standardisé de scrutation et d\'alerte pour équipements réseaux et serveurs.' },
    { term: 'MIB', def: 'Management Information Base : base de données arborescente décrivant les variables gérées par un agent SNMP.' },
    { term: 'OID', def: 'Object Identifier : suite de nombres entiers identifiant de manière unique une variable au sein de la MIB.' },
    { term: 'SNMP Trap', def: 'Message d\'alerte asynchrone émis spontanément par un équipement vers le port 162/UDP du collecteur.' },
    { term: 'SNMPv3 USM', def: 'User-based Security Model : modèle de sécurité apportant authentification (SHA) et chiffrement (AES) aux trames SNMP.' },
    { term: 'Syslog RFC 5424', def: 'Norme universelle de journalisation horodatée encodant la source (Facility) et la gravité (Severity) dans un en-tête PRI.' }
  ],

  pitfalls: [
    'Conserver la communauté SNMP par défaut « public » ou « private » sur les équipements en production : faille majeure d\'information disclosure et d\'altération.',
    'Confondre le port de scrutation SNMP (161/UDP) et le port de réception des alertes traps (162/UDP).',
    'Oublier d\'ouvrir les flux UDP/TCP bidirectionnels sur les pare-feux internes pour les sondes de supervision.',
    'Utiliser le niveau noAuthNoPriv en SNMPv3 en pensant être sécurisé : ce mode ne fournit aucun chiffrement ni preuve d\'authenticité.'
  ],

  questions: [
    {
      stem: 'Sur quel port de transport et quel protocole un agent SNMP écoute-t-il les requêtes de scrutation Get / Walk envoyées par le serveur de supervision ?',
      opts: ['Port 161 en UDP', 'Port 162 en TCP', 'Port 514 en UDP', 'Port 10050 en TCP'],
      correct: 0,
      exp: 'Les requêtes de scrutation SNMP sont émises vers le port 161/UDP de l\'agent, tandis que les Traps spontanés sont envoyés au serveur sur le port 162/UDP.'
    },
    {
      stem: 'Quel niveau de sécurité SNMPv3 USM assure à la fois l\'authentification cryptographique par hachage ET le chiffrement symétrique des données (confidentialité) ?',
      opts: ['noAuthNoPriv', 'authNoPriv', 'authPriv', 'CommunityStringV2'],
      correct: 2,
      exp: 'Le niveau authPriv combine l\'authentification (SHA/MD5) et le chiffrement (AES/DES) pour garantir la confidentialité et l\'intégrité totale des échanges.'
    },
    {
      stem: 'Dans l\'arborescence MIB-2, à quoi correspond l\'OID standard 1.3.6.1.2.1.1.3.0 ?',
      opts: ['Au nom de machine sysName', 'À la description matérielle sysDescr', 'Au temps de fonctionnement sysUpTime', 'À l\'adresse IP de la passerelle'],
      correct: 2,
      exp: 'L\'OID 1.3.6.1.2.1.1.3.0 représente le sysUpTime, soit le temps écoulé depuis le dernier démarrage du système en centièmes de seconde (TimeTicks).'
    },
    {
      stem: 'Une trame Syslog RFC 5424 débute par la priorité <30>. Quels sont la Facility et la Severity correspondantes ?',
      opts: ['Facility 3 (daemon), Severity 6 (Informational)', 'Facility 3 (daemon), Severity 0 (Emergency)', 'Facility 4 (auth), Severity 2 (Critical)', 'Facility 30 (local), Severity 0 (Emergency)'],
      correct: 0,
      exp: 'Facility = 30 // 8 = 3 (daemon). Severity = 30 % 8 = 6 (Informational).'
    },
    {
      stem: 'Pourquoi une architecture de supervision distribuée utilise-t-elle des proxys locaux sur des sites distants ?',
      opts: ['Pour remplacer définitivement le serveur de supervision central', 'Pour exécuter les scrutations locales sans saturer le lien WAN et tamponner les données en cas de coupure', 'Pour supprimer l\'obligation d\'utiliser des adresses IP', 'Pour bloquer les alertes par email'],
      correct: 1,
      exp: 'Les proxys effectuent les interrogations localement, évitant des milliers de requêtes UDP sur le lien WAN, et conservent les métriques si la liaison internet est temporairement coupée.'
    },
    {
      stem: 'Quelle différence existe-t-il entre un SNMP Trap et un SNMP Inform ?',
      opts: ['Le Trap utilise TCP alors que l\'Inform utilise ICMP', 'L\'Inform exige un accusé de réception applicatif de la part du serveur, contrairement au Trap qui est non acquitté', 'Le Trap chiffre les données alors que l\'Inform est en clair', 'L\'Inform ne fonctionne que sous Linux'],
      correct: 1,
      exp: 'SNMP Inform (introduit en SNMPv2c/v3) fiabilise les alertes en exigeant une réponse de confirmation du gestionnaire, renvoyant l\'alerte en cas de non-réception.'
    },
    {
      stem: 'Dans la table Syslog, quelle sévérité correspond au code 0 ?',
      opts: ['Emergency (système inutilisable)', 'Debug (débogage détaillé)', 'Warning (avertissement)', 'Informational (information courante)'],
      correct: 0,
      exp: 'La sévérité 0 est Emergency, le niveau le plus critique signalant une panique totale du système d\'exploitation.'
    },
    {
      stem: 'Quel est l\'inconvénient majeur du transport Syslog historique sur UDP 514 ?',
      opts: ['Il consomme trop de bande passante', 'Il ne garantit pas la livraison des paquets et n\'offre aucun chiffrement en transit', 'Il nécessite une licence payante', 'Il est limité à 10 messages par heure'],
      correct: 1,
      exp: 'UDP est un protocole sans connexion : en cas de saturation réseau, des paquets de logs critiques peuvent être perdus sans qu\'aucun avertissement ne soit émis.'
    }
  ],

  flashcards: [
    {
      q: 'Quels ports UDP sont utilisés par SNMP pour la scrutation et les alertes ?',
      a: 'Port 161/UDP pour les requêtes Get/Walk vers l\'agent ; Port 162/UDP pour la réception des Traps/Informs sur le serveur.'
    },
    {
      q: 'Quels sont les 3 niveaux de sécurité de SNMPv3 USM ?',
      a: 'noAuthNoPriv (aucun), authNoPriv (authentification SHA/MD5), et authPriv (authentification SHA + chiffrement AES).'
    },
    {
      q: 'Quelle est la formule de calcul de la priorité Syslog PRI ?',
      a: 'PRI = Facility * 8 + Severity (Facility = PRI // 8 ; Severity = PRI % 8).'
    },
    {
      q: 'À quoi sert l\'OID 1.3.6.1.2.1.2.2.1.8.<idx> ?',
      a: 'À connaître l\'état opérationnel ifOperStatus d\'une interface réseau (1=up, 2=down).'
    },
    {
      q: 'Pourquoi privilégier Syslog sur TLS 6514 plutôt qu\'UDP 514 ?',
      a: 'Pour garantir la livraison avec accusé de réception TCP, le contrôle de flux et le chiffrement des traces d\'audit.'
    },
    {
      q: 'Quel est le rôle d\'un proxy collecteur dans une architecture distribuée ?',
      a: 'Sonder les équipements locaux, isoler le trafic sur le LAN, et relayer de façon compressée et tamponnée vers le serveur central.'
    }
  ],

  mastery: [
    { cls: 'low', text: 'Score < 60 % : Protocoles SNMP et calculs Syslog non maîtrisés. Révisez le modèle USM et la formule PRI.' },
    { cls: 'mid', text: 'Score 60-74 % : Bases acquises. Approfondissez les OIDs MIB-2 et le rôle des proxies distribués.' },
    { cls: 'mid', text: 'Score 75-84 % : Bonne compréhension. Entraînez-vous à valider les trames Syslog et SNMPv3 dans l\'atelier.' },
    { cls: 'high', text: 'Score 85-94 % : Très bon niveau. Vous maîtrisez l\'architecture de collecte et la sécurité des protocoles.' },
    { cls: 'high', text: 'Score ≥ 95 % : Maîtrise d\'architecte. Prêt pour la mise en œuvre pratique avec Zabbix et Nagios du Module 3 !' }
  ]
};
