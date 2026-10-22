/**
 * Pages « examens » et « exercices » du cours « pfSense & Routage B3 ».
 */
'use strict';

const { ic, crumb, box } = require('../../../../scripts/course-kit');
const { chnav, disclaimer } = require('./helpers');

/* ======================== Examens Blancs ======================== */

function examens(course) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Examens blancs' }
  ]);

  const body = [
    crumbs,
    '  <h1>Examens Blancs &amp; Épreuves Corrigées — pfSense &amp; Routage B3</h1>',
    '  <p class="lead">Deux épreuves d’évaluation complètes conformes aux exigences académiques et professionnelles de niveau Bachelor 3 en ingénierie des réseaux et sécurité des périmètres pare-feu.</p>',
    '',
    '  <h2>Épreuve 1 : Contrôle Continu (CC) — Durée 1 h 30 (Barème sur 20 points)</h2>',
    box('standard', 'Sujet du Contrôle Continu — Architecture pf, Règles de Filtrage &amp; NAT', [
      '<h4>Partie 1 : Architecture du Moteur pf et Cinématique de Traitement (6 points)</h4>',
      '<ol>',
      '  <li>Décrivez le fonctionnement interne du moteur Packet Filter (pf) de FreeBSD. Quelle différence fondamentale existe-t-il entre la syntaxe native <code>pf.conf</code> (Last-Match Wins) et le comportement par défaut de l\'interface web pfSense ? Quel mot-clé technique est implicitement injecté dans chaque règle générée ? (3 pts)</li>',
      '  <li>Expliquez le rôle de la table d\'états (State Table). Comment un paquet retour d\'une session TCP initiée de l\'interne vers l\'externe est-il traité par le pare-feu sans nécessiter de règle autorisant le trafic entrant sur l\'interface WAN ? (3 pts)</li>',
      '</ol>',
      '<h4>Partie 2 : Aliases, Filtrage Avancé &amp; Limiteurs (7 points)</h4>',
      '<ol>',
      '  <li>Dans pfSense, quels sont les trois principaux types d\'Aliases (Host, Network, Port) et quel est l\'avantage en termes de performance et de maintenance par rapport à des règles unitaires dupliquées ? Comment pf optimise-t-il la recherche d\'adresses dans les tables en mémoire ? (3 pts)</li>',
      '  <li>Un administrateur souhaite limiter la bande passante descendante des invités à 5 Mbps tout en garantissant un délai minimal pour la voix sur IP (VoIP). Quels composants (Dummynet Pipes, Queues, Floating Rules) doit-il configurer dans <em>Firewall &gt; Traffic Shaper &gt; Limiters</em> ? (4 pts)</li>',
      '</ol>',
      '<h4>Partie 3 : Translation d\'Adresses (NAT) &amp; Redirection (7 points)</h4>',
      '<ol>',
      '  <li>Distinguez précisément le Port Forwarding (DNAT) et le NAT Sortant (SNAT/Masquerading). Pourquoi la création d\'une règle de Port Forwarding génère-t-elle automatiquement une règle de filtrage associée sur l\'interface WAN ? (3 pts)</li>',
      '  <li>Qu\'est-ce que le mode « Hybrid Outbound NAT » dans pfSense ? Donnez un scénario concret où le mode entièrement automatique est insuffisant et nécessite une règle hybride manuelle prioritaire. (4 pts)</li>',
      '</ol>'
    ].join('\n')),
    '',
    box('solution', 'Corrigé type &amp; Barème détaillé du Contrôle Continu', [
      '<h4>Corrigé Partie 1 (6 points)</h4>',
      '<ul>',
      '  <li><strong>Moteur pf et règle First-Match (3 pts) :</strong> Dans OpenBSD/FreeBSD natif, pf applique la stratégie « Last-Match Wins » : toutes les règles sont analysées et la dernière correspondante détermine l\'action, sauf si le mot-clé <code>quick</code> est spécifié. L\'interface graphique de pfSense génère automatiquement toutes ses règles avec le mot-clé <code>quick</code>, transformant le comportement en « First-Match Wins » (la première règle qui correspond arrête immédiatement l\'évaluation). Cela évite les effets de bord involontaires et permet une lecture intuitive de haut en bas.</li>',
      '  <li><strong>Table d\'états et flux retour (3 pts) :</strong> Lorsque le client LAN émet un paquet TCP SYN vers Internet, le pare-feu évalue les règles LAN, autorise la sortie et crée une entrée dans la table d\'états (State Table) mémorisant les 5 tuples (IP src, IP dst, port src, port dst, protocole) ainsi que les numéros de séquence TCP. Lorsque le serveur distant répond avec SYN-ACK sur le WAN, le paquet est intercepté par pf : la table d\'états trouve la session correspondante et autorise le paquet immédiatement sans évaluer la liste des règles de filtrage WAN.</li>',
      '</ul>',
      '<h4>Corrigé Partie 2 (7 points)</h4>',
      '<ul>',
      '  <li><strong>Aliases et tables en mémoire (3 pts) :</strong> Les Aliases permettent de regrouper sous un identifiant unique des adresses IP (Host), des sous-réseaux (Network) ou des ports TCP/UDP. Avantages : maintenance centralisée (modifier l\'alias met à jour toutes les règles associées) et compacité du jeu de règles. Au niveau du noyau BSD, pf compile les listes d\'IP sous forme de structures en arbre radix (tables pf), garantissant une recherche en $O(1)$ ou $O(\\log N)$ indépendamment du nombre d\'adresses.</li>',
      '  <li><strong>Traffic Shaper et Limiters (4 pts) :</strong> L\'administrateur crée deux pipes Dummynet : un Pipe de téléchargement à 5 Mbps et un Pipe d\'envoi à 1 Mbps. Il applique ensuite ces pipes via une règle de filtrage (ou Floating Rule avec direction In/Out) sur le sous-réseau Guest en spécifiant l\'assignation dans le volet <em>Advanced Options &gt; In / Out pipe</em>. Pour la VoIP, il configure une file enfant (Child Queue) Dummynet à poids prioritaire (Weight élevé) associée à une Floating Rule dédiée aux flux VoIP (RTP/SIP) pour garantir la bande passante requise sans gigue.</li>',
      '</ul>',
      '<h4>Corrigé Partie 3 (7 points)</h4>',
      '<ul>',
      '  <li><strong>DNAT vs SNAT (3 pts) :</strong> Le Port Forwarding (DNAT) modifie l\'adresse de destination du paquet arrivant sur le WAN pour le rediriger vers une IP privée interne. Le SNAT (Outbound NAT) modifie l\'adresse source d\'un paquet sortant du LAN pour remplacer l\'IP privée par l\'IP publique du WAN. Une règle de filtrage est obligatoire sur le WAN car le NAT ne fait que modifier les en-têtes IP ; le paquet entrant doit obligatoirement être explicitement autorisé par le moteur de filtrage pour atteindre l\'hôte interne.</li>',
      '  <li><strong>Hybrid Outbound NAT (4 pts) :</strong> En mode Automatique, pfSense applique une règle générique traduisant tous les réseaux locaux déclarés vers l\'IP principale du WAN. Le mode Hybride conserve cette génération automatique tout en permettant d\'insérer au-dessus des règles manuelles prioritaires. Cas d\'usage : une entreprise disposant d\'un bloc d\'adresses publiques (/29) et souhaitant que son serveur applicatif interne sorte avec une adresse IP virtuelle (Virtual IP) dédiée plutôt qu\'avec l\'IP partagée du pare-feu.</li>',
      '</ul>'
    ].join('\n')),
    '',
    '  <h2>Épreuve 2 : Examen Final (EF) — Durée 2 h 00 (Barème sur 20 points)</h2>',
    box('standard', 'Sujet de l\'Examen Final — Multi-WAN, VLANs 802.1Q, VPNs &amp; Haute Disponibilité CARP', [
      '<h4>Partie 1 : Architecture Multi-WAN et Routage par Politique (5 points)</h4>',
      '<ol>',
      '  <li>Expliquez le fonctionnement des Passerelles (Gateways) et Groupes de Passerelles (Gateway Groups) dans pfSense. Comment configure-t-on respectivement un scénario de basculement automatique (Failover) et un scénario de répartition de charge (Load Balancing) à l\'aide des Tiers (Tier 1, Tier 2) ? (3 pts)</li>',
      '  <li>Qu\'est-ce que le Policy-Based Routing (PBR) dans pfSense ? Pourquoi doit-on insérer une règle explicite excluant le trafic inter-VLANs local au-dessus d\'une règle utilisant une passerelle WAN par défaut ? (2 pts)</li>',
      '</ol>',
      '<h4>Partie 2 : Segmentation VLANs 802.1Q et Sécurisation DMZ (5 points)</h4>',
      '<ol>',
      '  <li>Détaillez le fonctionnement d\'un Trunk 802.1Q connectant un commutateur administrable à pfSense. Comment les trames étiquetées sont-elles démultiplexées au niveau du noyau FreeBSD (interfaces parentes vs sous-interfaces) ? (2 pts)</li>',
      '  <li>Définissez la matrice de flux standard d\'une DMZ hébergeant un serveur Web. Quelles règles strictes doivent être imposées pour interdire tout rebond malveillant d\'un serveur DMZ compromis vers les postes de travail du réseau LAN ? (3 pts)</li>',
      '</ol>',
      '<h4>Partie 3 : Tunnels VPN Sécurisés (OpenVPN &amp; IPsec IKEv2) (5 points)</h4>',
      '<ol>',
      '  <li>Comparez OpenVPN (mode SSL/TLS avec PKI X.509) et IPsec IKEv2. Dans quel contexte d\'entreprise privilégie-t-on un tunnel IPsec Site-à-Site plutôt qu\'OpenVPN ? (2 pts)</li>',
      '  <li>Détaillez la chaîne de confiance requise par pfSense pour valider la connexion d\'un client OpenVPN nomade (CA racine, certificat serveur, certificat client, CRL). Que se passe-t-il si un certificat volé n\'est pas publié dans la CRL ? (3 pts)</li>',
      '</ol>',
      '<h4>Partie 4 : Haute Disponibilité (CARP / pfsync) &amp; Détection d\'Intrusion (5 points)</h4>',
      '<ol>',
      '  <li>Expliquez le mécanisme d\'élection du pare-feu MASTER dans un cluster CARP à l\'aide des paramètres <code>advbase</code> et <code>advskew</code>. Comment le basculement d\'adresse IP virtuelle s\'opère-t-il sans perturber les téléchargements en cours grâce à <code>pfsync</code> ? (3 pts)</li>',
      '  <li>Comment le package Snort ou Suricata s\'intègre-t-il au moteur de filtrage de pfSense ? Quel est le rôle de la table pf <code>snort2c</code> et pourquoi la configuration d\'une liste blanche (Pass List) est-elle critique pour éviter les dénis de service auto-infligés ? (2 pts)</li>',
      '</ol>'
    ].join('\n')),
    '',
    box('solution', 'Corrigé type &amp; Barème détaillé de l\'Examen Final', [
      '<h4>Corrigé Partie 1 (5 points)</h4>',
      '<ul>',
      '  <li><strong>Gateway Groups et Tiers (3 pts) :</strong> Dans un Gateway Group, chaque passerelle se voit attribuer un niveau de priorité (Tier). Si les deux passerelles sont sur le même Tier (ex: WAN1 en Tier 1, WAN2 en Tier 1), pfSense applique du Load Balancing (Round-Robin pondéré selon le poids de connexion). Si les passerelles ont des Tiers différents (ex: WAN1 en Tier 1, WAN2 en Tier 2), pfSense applique du Failover : WAN1 achemine 100 % du trafic et WAN2 ne prend le relais que si le démon de surveillance dpinger détecte une perte de paquets ou une latence dépassant les seuils configurés.</li>',
      '  <li><strong>Policy-Based Routing et isolation inter-VLAN (2 pts) :</strong> Le PBR force les flux d\'une règle de filtrage à emprunter une passerelle spécifique (via le champ <em>Gateway</em> de la règle) au lieu de suivre la table de routage système. Si une règle LAN applique la passerelle <code>WAN_DHCP</code> sur tout le trafic vers <code>any</code>, les requêtes à destination d\'autres sous-réseaux locaux (ex: DMZ ou imprimantes) sont envoyées par erreur au FAI. Il faut donc placer au-dessus une règle autorisant le trafic vers les réseaux locaux (RFC 1918) avec le champ Gateway positionné sur <code>default</code>.</li>',
      '</ul>',
      '<h4>Corrigé Partie 2 (5 points)</h4>',
      '<ul>',
      '  <li><strong>Trunk 802.1Q et sous-interfaces (2 pts) :</strong> Le commutateur ajoute un en-tête 802.1Q de 4 octets contenant le VLAN ID (VID) à chaque trame transitant sur le lien Trunk. Le pilote réseau BSD de pfSense (ex: <code>igb0</code>) inspecte ce tag et route la trame dé-marquée vers la sous-interface logique dédiée (<code>igb0.10</code> pour le VLAN 10, <code>igb0.20</code> pour le VLAN 20), assurant un cloisonnement complet au niveau de la couche 2 et 3.</li>',
      '  <li><strong>Matrice de flux DMZ (3 pts) :</strong> Le LAN peut initier des connexions vers la DMZ (ex: administration SSH ou consultation HTTP). Les clients externes (WAN) peuvent accéder aux ports exposés de la DMZ (80, 443 via DNAT). En revanche, <strong>la DMZ a interdiction absolue d\'initier des flux vers le LAN</strong> (règle explicite <code>Block from DMZ to LAN</code> placée au sommet des règles de l\'interface DMZ). Les seules réponses autorisées de la DMZ vers le LAN sont les paquets retour des sessions préalablement ouvertes par le LAN, gérés automatiquement par la table d\'états.</li>',
      '</ul>',
      '<h4>Corrigé Partie 3 (5 points)</h4>',
      '<ul>',
      '  <li><strong>OpenVPN vs IPsec IKEv2 (2 pts) :</strong> OpenVPN fonctionne en mode utilisateur (espace applicatif) via des interfaces tun/tap et encapsule ses flux dans TCP ou UDP (port 1194). IPsec opère directement dans le noyau (ESP/AH, protocole IP 50/51) avec une accélération cryptographique matérielle native (AES-NI). Pour un tunnel Site-à-Site d\'entreprise à très haut débit entre deux agences ou datacenters, IPsec IKEv2 est privilégié pour sa performance maximale et sa standardisation stricte entre équipements multi-vendeurs (Cisco, Fortinet, pfSense).</li>',
      '  <li><strong>Chaîne de confiance PKI OpenVPN (3 pts) :</strong> Le serveur pfSense vérifie que le certificat présenté par le client est signé par son autorité de certification interne (CA), que la date courante est comprise dans sa période de validité et que son identifiant n\'est pas listé dans la CRL. Si un certificat privé d\'employé est dérobé et qu\'il n\'est pas révoqué dans la CRL, le pirate pourra s\'authentifier avec succès sur le réseau d\'entreprise, le serveur n\'ayant aucun moyen cryptographique de savoir que la clé a été compromise sans consultation de la CRL.</li>',
      '</ul>',
      '<h4>Corrigé Partie 4 (5 points)</h4>',
      '<ul>',
      '  <li><strong>Élection CARP et synchronisation pfsync (3 pts) :</strong> Les nœuds diffusent des annonces CARP toutes les <code>advbase + (advskew / 256)</code> secondes. Le Master possède <code>advskew=0</code> et transmet toutes les 1.000 s. Le Backup possède <code>advskew=100</code> (1.391 s). Si le Master ne transmet plus pendant 3 cycles, le Backup élit sa propre interface comme MASTER et émet des requêtes gratuitous ARP (GARP) pour mettre à jour la table CAM des switchs. Simultanément, <code>pfsync</code> réplique en temps réel sur une interface dédiée toutes les entrées de la table d\'états : ainsi, le Backup connaît déjà toutes les sessions TCP ouvertes, évitant toute coupure de connexion lors du basculement.</li>',
      '  <li><strong>Snort, table snort2c et liste blanche (2 pts) :</strong> Lorsque Snort détecte une signature malveillante de haute sévérité (Priorité 1), son démon injecte l\'adresse IP source attaquante dans la table noyau <code>snort2c</code> de pf, provoquant un rejet immédiat (DROP) de tout paquet futur provenant de cette adresse. Une Pass List (liste blanche) contenant les passerelles WAN, les serveurs DNS de l\'entreprise et les IP d\'administration est indispensable pour empêcher un attaquant d\'usurper l\'IP du routeur ou du DNS dans des requêtes falsifiées, ce qui conduirait le pare-feu à bloquer sa propre infrastructure vitale.</li>',
      '</ul>'
    ].join('\n')),
    '',
    chnav({ href: 'formules.html', label: 'Consulter le mémento technique' }, { href: 'exercices.html', label: 'Voir le catalogue des 18 exercices' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/examens.html': {
      title: 'Examens blancs — ' + course.brand,
      description: 'Épreuves d’examen blanc corrigées de niveau B3 en sécurité réseau, filtrage pfSense, VPN et haute disponibilité.',
      active: 'examens',
      body
    }
  };
}

/* ======================== Exercices Index ======================== */

function exercices(course) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Catalogue des exercices' }
  ]);

  const exercises = [
    { id: 'pf3-c1-e1', ch: 1, title: 'Calculateur de sous-réseaux et validation d’adresses CIDR', level: 'n1', lang: 'Étude de cas', desc: 'Calculer l’adresse réseau, le masque et la plage d’adresses utilisables d’une interface pfSense.' },
    { id: 'pf3-c1-e2', ch: 1, title: 'Convertisseur de règles d’interface WebGUI vers syntaxe pf.conf', level: 'n2', lang: 'Étude de cas', desc: 'Traduire les paramètres de filtrage de l’interface web pfSense en directives réelles du moteur pf.' },
    { id: 'pf3-c1-e3', ch: 1, title: 'Auditeur de configuration de pool DHCP et réservations statiques', level: 'n3', lang: 'Étude de cas', desc: 'Contrôler la validité de la plage DHCP et détecter les collisions avec les baux statiques.' },

    { id: 'pf3-c2-e1', ch: 2, title: 'Résolveur d’Aliases pfSense récursif (Host, Network, Port)', level: 'n1', lang: 'Étude de cas', desc: 'Déployer la résolution imbriquée d’Aliases pour générer les listes d’adresses finales.' },
    { id: 'pf3-c2-e2', ch: 2, title: 'Moteur d’évaluation de filtrage First-Match Wins', level: 'n2', lang: 'Étude de cas', desc: 'Appliquer l’évaluation séquentielle ordonnée des règles pfSense avec politique Default Deny.' },
    { id: 'pf3-c2-e3', ch: 2, title: 'Parseur de table d’états pfctl et détection d’attaques SYN_SENT', level: 'n3', lang: 'Étude de cas', desc: 'Auditer les sessions actives dans la table d’états et identifier les anomalies de connexion semi-ouvertes.' },

    { id: 'pf3-c3-e1', ch: 3, title: 'Simulateur de redirection de ports (Port Forwarding / DNAT)', level: 'n1', lang: 'Étude de cas', desc: 'Appliquer les règles de NAT entrant (DNAT) pour rediriger les requêtes vers les serveurs internes.' },
    { id: 'pf3-c3-e2', ch: 3, title: 'Moteur de NAT sortant hybride (Outbound NAT) et IP virtuelles', level: 'n2', lang: 'Étude de cas', desc: 'Mettre en œuvre les règles manuelles prioritaires de translation sortante avec pool de VIPs.' },
    { id: 'pf3-c3-e3', ch: 3, title: 'Ordonnanceur Multi-WAN Gateway Groups (Load Balancing & Failover)', level: 'n3', lang: 'Étude de cas', desc: 'Simuler le basculement dynamique et la répartition de charge entre liaisons WAN selon la santé des liens.' },

    { id: 'pf3-c4-e1', ch: 4, title: 'Validateur d’encapsulation 802.1Q et calcul de sous-interfaces VLAN', level: 'n1', lang: 'Étude de cas', desc: 'Valider les trames 802.1Q et les mapper vers la sous-interface pfSense correspondante.' },
    { id: 'pf3-c4-e2', ch: 4, title: 'Contrôleur de matrice de flux inter-VLANs et filtrage DMZ', level: 'n2', lang: 'Étude de cas', desc: 'Simuler le pare-feu à état entre zones réseau et bloquer l’initiation illégitime DMZ vers LAN.' },
    { id: 'pf3-c4-e3', ch: 4, title: 'Auditeur de fuite d’isolation réseau (VLAN Hopping & Double Tagging)', level: 'n3', lang: 'Étude de cas', desc: 'Détecter les attaques par double étiquetage 802.1Q visant à contourner l’isolation VLAN.' },

    { id: 'pf3-c5-e1', ch: 5, title: 'Validateur de certificat X.509 et chaîne de confiance PKI OpenVPN', level: 'n1', lang: 'Étude de cas', desc: 'Vérifier la validité cryptographique et l’état de révocation des certificats pour OpenVPN.' },
    { id: 'pf3-c5-e2', ch: 5, title: 'Validateur de proposition cryptographique IPsec (IKEv2 & ESP)', level: 'n2', lang: 'Étude de cas', desc: 'Auditer la conformité ANSSI/NIST des propositions IKEv2 Phase 1 et Phase 2 dans pfSense.' },
    { id: 'pf3-c5-e3', ch: 5, title: 'Calculateur de routage de tunnel VPN (Split Tunneling vs Full Tunneling)', level: 'n3', lang: 'Étude de cas', desc: 'Déterminer la passerelle de sortie selon la configuration VPN Full ou Split Tunnel.' },

    { id: 'pf3-c6-e1', ch: 6, title: 'Simulateur d’élection de maître CARP (Common Address Redundancy Protocol)', level: 'n1', lang: 'Étude de cas', desc: 'Simuler l’élection du pare-feu MASTER dans un cluster pfSense en comparant les paramètres advskew.' },
    { id: 'pf3-c6-e2', ch: 6, title: 'Parseur d’alertes IDS/IPS Snort/Suricata et blocage IP dynamique', level: 'n2', lang: 'Étude de cas', desc: 'Analyser les alertes Snort dans pfSense et alimenter dynamiquement la table de blocage snort2c.' },
    { id: 'pf3-c6-e3', ch: 6, title: 'Auditeur de synchronisation d’états pfsync et dérive de configuration XMLRPC', level: 'n3', lang: 'Étude de cas', desc: 'Contrôler la cohérence de la table d’états pfsync et détecter la dérive de configuration XMLRPC.' }
  ];

  const cardsHtml = exercises.map(ex => [
    '    <article class="card card--exercise">',
    '      <div class="card__head">',
    '        <span class="badge badge--' + ex.level + '">' + (ex.level === 'n1' ? 'Fondamental' : ex.level === 'n2' ? 'Intermédiaire' : 'Avancé') + '</span>',
    '        <span class="card__num">Module ' + ex.ch + ' • ' + ex.id + '</span>',
    '      </div>',
    '      <h3 class="card__title"><a href="chapitres/chapitre' + ex.ch + '.html#' + ex.id + '">' + ex.title + '</a></h3>',
    '      <p class="card__desc">' + ex.desc + '</p>',
    '      <div class="card__foot">',
    '        <span class="card__time">' + ic('terminal') + ' Langage : ' + ex.lang + '</span>',
    '        <a class="btn btn--sm" href="chapitres/chapitre' + ex.ch + '.html#' + ex.id + '">Résoudre dans le module ' + ic('arrow-right') + '</a>',
    '      </div>',
    '    </article>'
  ].join('\n')).join('\n');

  const body = [
    crumbs,
    '  <h1>Catalogue des 18 Ateliers Pratiques de Code Lab — pfSense &amp; Routage B3</h1>',
    '  <p class="lead">18 études de cas pratiques d’ingénierie et d’audit pfSense intégrés directement dans les modules de cours, corrigés avec tests d’évaluation automatisés.</p>',
    '',
    '  <div class="grid grid--2">' + cardsHtml + '</div>',
    '',
    chnav({ href: 'examens.html', label: 'Revenir aux épreuves d’examen' }, { href: 'chapitres/chapitre1.html', label: 'Démarrer le module 1' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/exercices.html': {
      title: 'Catalogue des exercices — ' + course.brand,
      description: 'Répertoire complet des 18 exercices de programmation de manière méthodique du cours pfSense & Routage B3.',
      active: 'exercices',
      body
    }
  };
}

module.exports = { examens, exercices };
