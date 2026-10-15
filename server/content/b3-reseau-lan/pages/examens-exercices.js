/**
 * Pages « examens » et « exercices » du cours « Réseau LAN Avancé B3 ».
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
    '  <h1>Examens Blancs &amp; Épreuves Corrigées — Réseau LAN Avancé B3</h1>',
    '  <p class="lead">Deux épreuves d’évaluation complètes conformes aux exigences académiques et professionnelles de niveau Bachelor 3 en ingénierie de commutation d\'entreprise, routage de campus et résilience de niveau 2/3.</p>',
    '',
    '  <h2>Épreuve 1 : Contrôle Continu (CC) — Durée 1 h 30 (Barème sur 20 points)</h2>',
    box('standard', 'Sujet du Contrôle Continu — Spanning Tree (STP/RSTP), EtherChannel LACP &amp; Redondance FHRP', [
      '<h4>Partie 1 : Spanning Tree Protocol et Convergence Sans Boucle (6 points)</h4>',
      '<ol>',
      '  <li>Détaillez la structure exacte du Bridge Identifier (BID) sur 8 octets selon la spécification IEEE 802.1t / 802.1w. Pourquoi la priorité de pont doit-elle obligatoirement être un multiple de 4096 ? En cas d\'égalité de priorité, quel critère physique garantit l\'unicité du Root Bridge ? (3 pts)</li>',
      '  <li>Expliquez les différences majeures entre le standard historique IEEE 802.1D (timers Hello, Forward Delay, Max Age) et le standard rapide IEEE 802.1w (RSTP). Comment le mécanisme de poignée de main « Proposal / Agreement » permet-il une convergence sub-seconde sans attendre l\'expiration de minuteries passives ? (3 pts)</li>',
      '</ol>',
      '<h4>Partie 2 : Agrégation de Liaisons EtherChannel LACP (7 points)</h4>',
      '<ol>',
      '  <li>Comparez le protocole standardisé LACP (IEEE 802.3ad / 802.1AX) et le protocole propriétaire Cisco PAgP. Dans quels modes respectifs (active, passive, desirable, auto) deux commutateurs voisins doivent-ils être configurés pour qu\'un canal Port-Channel monte avec succès ? Donnez une combinaison valide et une combinaison invalide. (3 pts)</li>',
      '  <li>Quelles exigences strictes de cohérence de configuration doivent être rigoureusement respectées par tous les ports membres d\'un bundle EtherChannel (vitesse, duplex, mode d\'accès/trunk, VLANs autorisés) ? Que se produit-il si un port physique membre présente un VLAN natif différent de celui du Port-Channel ? (4 pts)</li>',
      '</ol>',
      '<h4>Partie 3 : Protocoles FHRP de Redondance de Passerelle (7 points)</h4>',
      '<ol>',
      '  <li>Distinguez HSRP (v1/v2) et VRRP (v2/v3). Quelle est l\'adresse MAC virtuelle standard générée par VRRP pour un routeur virtuel ID 15 en IPv4 ? Quel rôle la commande <code>preempt</code> joue-t-elle lors du redémarrage du routeur primaire ? (3 pts)</li>',
      '  <li>Qu\'est-ce que l\'Object Tracking dans une architecture VRRP/HSRP ? Décrivez un scénario dans lequel la liaison montante (WAN) du routeur Master tombe en panne : comment le suivi de l\'état de l\'interface amont permet-il de décrémenter la priorité locale et de déclencher un basculement immédiat vers le routeur Backup ? (4 pts)</li>',
      '</ol>'
    ].join('\n')),
    '',
    box('solution', 'Corrigé type &amp; Barème détaillé du Contrôle Continu', [
      '<h4>Corrigé Partie 1 (6 points)</h4>',
      '<ul>',
      '  <li><strong>Structure du BID (3 pts) :</strong> Le BID se compose de 2 octets de priorité et 6 octets d\'adresse MAC. Pour supporter le protocole PVST+ et MSTP, les 16 bits de priorité ont été scindés par 802.1t en 4 bits de priorité de pont (Bridge Priority) et 12 bits d\'identifiant de système étendu (Extended System ID, représentant le VLAN ID de 1 à 4094). Puisque seuls les 4 bits de poids fort encodent la priorité, les valeurs possibles sont des multiples stricts de $2^{12} = 4096$ (0, 4096, 8192, ..., 61440). En cas d\'égalité de priorité totale, la valeur numérique la plus basse de l\'adresse MAC physique de la carte mère du switch départage définitivement l\'élection.</li>',
      '  <li><strong>Convergence RSTP 802.1w (3 pts) :</strong> Alors que 802.1D impose des délais fixes (2 x 15 s de Forward Delay pour passer de Blocking à Listening puis Learning et Forwarding, soit 30 à 50 s d\'interruption), RSTP 802.1w introduit une négociation active point-à-point. Dès l\'allumage d\'un lien entre deux commutateurs, le port désigné émet une trame BPDU avec le bit « Proposal ». Le switch voisin bloque temporairement ses ports non-edge (synchronisation), puis répond immédiatement par un BPDU « Agreement ». La liaison bascule alors instantanément à l\'état Forwarding en quelques dizaines de millisecondes.</li>',
      '</ul>',
      '<h4>Corrigé Partie 2 (7 points)</h4>',
      '<ul>',
      '  <li><strong>LACP vs PAgP et modes (3 pts) :</strong> LACP est le standard ouvert universel (IEEE 802.3ad / 802.1AX) utilisant les modes <code>active</code> (émetteur régulier de LACPDUs) et <code>passive</code> (répond uniquement s\'il reçoit des LACPDUs). PAgP est le protocole propriétaire Cisco utilisant <code>desirable</code> et <code>auto</code>. Pour former un canal, au moins une des extrémités doit solliciter activement la négociation. Combinaison valide : Switch-1 <code>active</code> + Switch-2 <code>passive</code> (ou <code>active</code> / <code>active</code>). Combinaison invalide : Switch-1 <code>passive</code> + Switch-2 <code>passive</code> (aucun des deux n\'émet de paquet LACP, le canal reste inactif).</li>',
      '  <li><strong>Cohérence de configuration d\'un Port-Channel (4 pts) :</strong> Tous les ports membres doivent posséder à l\'identique : même vitesse de transmission (ex: 1 Gbps), même mode duplex (Full), même mode de commutation (switchport mode access ou trunk), même VLAN natif et même liste de VLANs autorisés (allowed vlan). Si un membre présente une discordance (ex: VLAN natif différent), le protocole désactive ce port et le place en état suspendu (suspended ou err-disable), générant des messages syslog d\'incohérence pour éviter toute boucle de commutation ou fuite de trames entre VLANs.</li>',
      '</ul>',
      '<h4>Corrigé Partie 3 (7 points)</h4>',
      '<ul>',
      '  <li><strong>VRRP vs HSRP et préemption (3 pts) :</strong> HSRP est propriétaire Cisco alors que VRRP (RFC 5798) est le standard multi-constructeur. Pour VRRP IPv4 avec VRID 15 ($0F$ en hexadécimal), l\'adresse MAC virtuelle est <code>00:00:5E:00:01:0F</code> (le préfixe fixe étant <code>00:00:5E:00:01:XX</code>). Sans la directive <code>preempt</code>, si le routeur primaire redémarre après une panne, il reste en état Backup même avec une priorité supérieure à celle du routeur secondaire. L\'option <code>preempt</code> est indispensable pour qu\'il reprenne automatiquement son rôle de Master dès son retour en ligne.</li>',
      '  <li><strong>Object Tracking et basculement WAN (4 pts) :</strong> L\'Object Tracking surveille l\'état d\'un objet tiers (ex: état line-protocol d\'une interface WAN Gi0/0 ou sonde IP SLA vérifiant la connectivité Internet). Si la liaison WAN du routeur Master tombe, le processus de suivi décrémente immédiatement sa priorité VRRP/HSRP locale (ex: priorité initiale de 110 décrémentée de 20 devient 90). Le routeur Backup, ayant une priorité de 100 et l\'option <code>preempt</code> active, constate qu\'il a désormais une priorité strictement supérieure et prend instantanément le relais comme passerelle par défaut pour l\'ensemble des postes du réseau.</li>',
      '</ul>'
    ].join('\n')),
    '',
    '  <h2>Épreuve 2 : Examen Final (EF) — Durée 2 h 00 (Barème sur 20 points)</h2>',
    box('standard', 'Sujet de l\'Examen Final — OSPFv2, Sécurité de Niveau 2, QoS &amp; Architecture Haute Résilience', [
      '<h4>Partie 1 : Routage Intra-Domaine OSPFv2 et Typologie d\'Aires (5 points)</h4>',
      '<ol>',
      '  <li>Expliquez le calcul de coût standard OSPFv2 et le rôle de la commande <code>auto-cost reference-bandwidth</code>. Pourquoi la valeur par défaut de 100 Mbps pose-t-elle un problème d\'ingénierie majeur sur un réseau commuté moderne comportant des liaisons 1G, 10G et 100G ? (2 pts)</li>',
      '  <li>Distinguez les rôles et contenus des LSAs de Type 1 (Router LSA), Type 2 (Network LSA), Type 3 (Summary LSA) et Type 5 (AS External LSA). Dans quel type d\'aire OSPF (Stub, Totally Stubby, NSSA) les routes externes de Type 5 sont-elles filtrées et remplacées par une route par défaut injectée par l\'ABR ? (3 pts)</li>',
      '</ol>',
      '<h4>Partie 2 : Durcissement de la Couche d\'Accès LAN (5 points)</h4>',
      '<ol>',
      '  <li>Détaillez le fonctionnement combiné du DHCP Snooping et de l\'inspection dynamique ARP (Dynamic ARP Inspection - DAI). Pourquoi le DHCP Snooping est-il un prérequis absolu pour le fonctionnement de DAI ? Comment un pirate menant une attaque d\'ARP Poisoning est-il neutralisé ? (3 pts)</li>',
      '  <li>Comparez les trois modes de violation de la fonctionnalité Port Security sur un commutateur d\'accès : <code>protect</code>, <code>restrict</code> et <code>shutdown</code>. Lequel doit être obligatoirement déployé dans un environnement haute sécurité certifié ? (2 pts)</li>',
      '</ol>',
      '<h4>Partie 3 : Qualité de Service LAN et Ordonnancement de Files (5 points)</h4>',
      '<ol>',
      '  <li>Décrivez la correspondance entre le champ CoS (Class of Service, 802.1p sur 3 bits) de l\'en-tête Ethernet et le champ DSCP (Differentiated Services Code Point sur 6 bits) de l\'en-tête IPv4. Quelle valeur DSCP standard est attribuée au trafic de Voix sur IP (VoIP) pour garantir une priorité d\'acheminement maximale ? (2 pts)</li>',
      '  <li>Comparez les ordonnanceurs de sortie Strict Priority (SP) et Weighted Round Robin (WRR) / DWRR. Quel risque d\'assèchement (starvation) Strict Priority fait-il peser sur les flux de données classiques si le trafic temps réel est saturé ? Quelle parade technique applique-t-on ? (3 pts)</li>',
      '</ol>',
      '<h4>Partie 4 : Diagnostic et Résilience d\'une Infrastructure de Campus (5 points)</h4>',
      '<ol>',
      '  <li>Sur un commutateur de cœur de réseau, un administrateur observe une saturation à 100 % du CPU et des alertes <code>MAC flap detected</code> entre un port physique et un port-channel. Identifiez l\'anomalie de niveau 2, expliquez son mécanisme d\'amplification et détaillez les commandes d\'investigation et les mécanismes de protection (BPDU Guard, Loop Guard) à activer pour isoler la panne. (5 pts)</li>',
      '</ol>'
    ].join('\n')),
    '',
    box('solution', 'Corrigé type &amp; Barème détaillé de l\'Examen Final', [
      '<h4>Corrigé Partie 1 (5 points)</h4>',
      '<ul>',
      '  <li><strong>Calcul de coût OSPF et bande passante de référence (2 pts) :</strong> Le coût est calculé par la formule $Coût = \\frac{Bande\\_Passante\\_Reference}{Debit\\_Liaison}$. Avec la référence historique de 100 Mbps ($10^8$ bps), une liaison 100 Mbps a un coût de 1, une liaison 1 Gbps a un coût de $\\frac{100M}{1000M} = 0.1$ arrondi à 1, et une liaison 10 Gbps a également un coût de 1. OSPF devient incapable de différencier un lien 100 Mbps, 1G ou 10G. Il est obligatoire d\'ajuster la référence à au moins 100 Gbps ($10^5$ Mbps) via <code>auto-cost reference-bandwidth 100000</code> sur l\'ensemble des routeurs du domaine.</li>',
      '  <li><strong>Typologie des LSAs et aires spéciales (3 pts) :</strong> Le LSA Type 1 décrit les liens et états des routeurs au sein d\'une même aire. Le LSA Type 2 est émis par le DR pour décrire les routeurs connectés à un segment multi-accès. Le LSA Type 3 est émis par l\'ABR pour annoncer les préfixes d\'une aire vers les autres aires. Le LSA Type 5 est émis par l\'ASBR pour redistribuer des routes externes au domaine OSPF. Dans une aire <em>Stub</em>, les LSA Type 5 sont bloqués et remplacés par une route par défaut Type 3. Dans une aire <em>Totally Stubby</em> (spécificité Cisco), les Type 3 et Type 5 sont tous bloqués et remplacés par une unique route par défaut Type 3 générée par l\'ABR. Dans une aire <em>NSSA</em>, les routes externes sont injectées localement en Type 7 puis traduites en Type 5 par l\'ABR.</li>',
      '</ul>',
      '<h4>Corrigé Partie 2 (5 points)</h4>',
      '<ul>',
      '  <li><strong>DHCP Snooping, DAI et lutte anti-spoofing (3 pts) :</strong> Le DHCP Snooping intercepte les messages DHCP sur les ports non approuvés (untrusted) et construit dynamiquement une table d\'associations (DHCP Snooping Binding Table) associant l\'adresse MAC, l\'adresse IP attribuée, le bail, le VLAN et le port physique. Dynamic ARP Inspection (DAI) utilise directement cette base de données pour inspecter chaque trame ARP reçue sur un port untrusted : si l\'adresse IP source ou l\'adresse MAC de la requête ou réponse ARP ne correspond pas à l\'entrée validée dans la table de liaison, la trame ARP est immédiatement détruite (DROP) et l\'attaque de Man-In-The-Middle par usurpation ARP est totalement neutralisée.</li>',
      '  <li><strong>Modes de violation Port Security (2 pts) :</strong> En mode <code>protect</code>, les trames des adresses MAC inconnues sont jetées silencieusement sans notification. En mode <code>restrict</code>, les trames sont jetées, un compteur de violation s\'incrémente et un message syslog/trap SNMP est émis. En mode <code>shutdown</code>, dès qu\'une adresse MAC non autorisée émet une trame, le port est immédiatement désactivé administrativement et placé en état <code>err-disable</code>. Le mode <code>shutdown</code> est obligatoire en environnement haute sécurité car il coupe physiquement la connexion de l\'intrus et force une intervention d\'investigation.</li>',
      '</ul>',
      '<h4>Corrigé Partie 3 (5 points)</h4>',
      '<ul>',
      '  <li><strong>CoS vers DSCP et voix sur IP (2 pts) :</strong> Le champ CoS (802.1p) se trouve dans l\'en-tête de tag VLAN 802.1Q (3 bits, valeurs 0 à 7). Le champ DSCP se trouve dans l\'octet ToS / Traffic Class de l\'en-tête IP (6 bits, 64 valeurs possibles). La passerelle de campus mappe typiquement CoS 5 vers la classe DSCP Expedited Forwarding (EF, valeur binaire <code>101110</code>, valeur décimale <code>46</code>), garantissant un traitement prioritaire à faible latence et faible gigue sur l\'ensemble du transit réseau pour les flux voix (RTP).</li>',
      '  <li><strong>Ordonnanceurs Strict Priority vs WRR et famine (3 pts) :</strong> L\'ordonnanceur Strict Priority sert toujours la file prioritaire tant qu\'elle contient des paquets avant d\'examiner les files inférieures. Si un flux vidéo ou VoIP inonde la file prioritaire (ou lors d\'une attaque DoS), les files ordinaires (web, mails, sauvegardes) ne sont jamais servies : c\'est le phénomène de « famine » (starvation). Pour pallier ce risque, on combine une file à priorité stricte plafonnée par un mécanisme de limitation de débit (Policing) avec un ordonnanceur WRR (Weighted Round Robin) ou DWRR qui garantit un pourcentage garanti de bande passante aux files secondaires.</li>',
      '</ul>',
      '<h4>Corrigé Partie 4 (5 points)</h4>',
      '<ul>',
      '  <li><strong>Analyse de la boucle de commutation et remédiation (5 pts) :</strong> L\'alerte <code>MAC flap detected</code> indique qu\'une même adresse MAC est apprise alternativement sur deux ports différents à des intervalles de quelques millisecondes : c\'est le symptôme caractéristique d\'une <strong>boucle de commutation de niveau 2</strong> (boucle physique non bloquée par STP). La trame de broadcast tourne indéfiniment, provoquant une tempête de diffusion (broadcast storm) et saturant le plan de contrôle (CPU) par réapprentissage continu de la table CAM.<br>' +
      '  <em>Investigation :</em> exécuter <code>show mac address-table address &lt;mac&gt;</code>, <code>show spanning-tree detail</code> et <code>show cdp neighbors</code> pour localiser les deux ports en oscillation.<br>' +
      '  <em>Remédiation et durcissement :</em> s\'assurer que RSTP/MSTP est activé sur tous les VLANs ; activer <strong>BPDU Guard</strong> sur l\'ensemble des ports d\'accès (<code>spanning-tree portfast bpduguard default</code>) pour désactiver instantanément tout port recevant un BPDU non autorisé (switch pirate ou pontage sauvage par un utilisateur) ; activer <strong>Loop Guard</strong> sur les liaisons point-à-point pour empêcher les ports alternatifs/racines de devenir faussement désignés en cas de défaillance unidirectionnelle du lien physique.</li>',
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
      description: 'Épreuves d’examen blanc corrigées de niveau B3 en ingénierie de commutation, protocoles STP, EtherChannel, FHRP, OSPF et sécurité LAN.',
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
    { id: 'lan3-c1-e1', ch: 1, title: 'Simulateur d’élection de Root Bridge STP (Bridge ID & priorité)', level: 'n1', lang: 'Python', desc: 'Comparer les Bridge IDs (Priority + Extended System ID VLAN + MAC) et déterminer le Root Bridge.' },
    { id: 'lan3-c1-e2', ch: 1, title: 'Calculateur de sélection de Root Port et départage de chemin', level: 'n2', lang: 'Python', desc: 'Sélectionner le Root Port d’un commutateur en départageant selon le coût, le BID voisin et le PID.' },
    { id: 'lan3-c1-e3', ch: 1, title: 'Auditeur de mécanismes de protection STP (BPDU Guard & Root Guard)', level: 'n3', lang: 'Python', desc: 'Auditer l’arrivée de BPDUs sur les ports et déclencher l’isolation err-disable ou root-inconsistent.' },

    { id: 'lan3-c2-e1', ch: 2, title: 'Simulateur de négociation d’agrégation de liens EtherChannel (LACP & PAgP)', level: 'n1', lang: 'Python', desc: 'Valider la négociation dynamique d’un bundle EtherChannel selon les modes configurés des deux côtés.' },
    { id: 'lan3-c2-e2', ch: 2, title: 'Simulateur de distribution de charge et hachage EtherChannel', level: 'n2', lang: 'Python', desc: 'Calculer le hachage de flux et identifier le lien membre physique emprunté par chaque trame.' },
    { id: 'lan3-c2-e3', ch: 2, title: 'Auditeur de cohérence de configuration des membres Port-Channel', level: 'n3', lang: 'Python', desc: 'Contrôler la compatibilité stricte de vitesse, duplex, mode de port et VLANs des interfaces membres.' },

    { id: 'lan3-c3-e1', ch: 3, title: 'Simulateur d’élection de routeur maître VRRP v2/v3', level: 'n1', lang: 'Python', desc: 'Déterminer le Master d’un groupe VRRP et calculer l’adresse MAC virtuelle associée.' },
    { id: 'lan3-c3-e2', ch: 3, title: 'Moteur de suivi d’objets (Object Tracking) et basculement de passerelle', level: 'n2', lang: 'Python', desc: 'Simuler la décrémentation dynamique de priorité et le basculement preempt vers la passerelle de secours.' },
    { id: 'lan3-c3-e3', ch: 3, title: 'Simulateur d’équilibrage de charge de passerelle active GLBP', level: 'n3', lang: 'Python', desc: 'Modéliser la réponse aux requêtes ARP des clients selon la méthode GLBP sélectionnée.' },

    { id: 'lan3-c4-e1', ch: 4, title: 'Calculateur de coût Dijkstra OSPFv2 et sélection du meilleur chemin', level: 'n1', lang: 'Python', desc: 'Calculer le coût métrique d’interfaces et sélectionner le chemin de coût cumulé minimal.' },
    { id: 'lan3-c4-e2', ch: 4, title: 'Parseur de paquets de mise à jour LSDB OSPF (Types 1 à 7)', level: 'n2', lang: 'Python', desc: 'Analyser les entêtes LSA échangés et identifier leur type et leur portée de diffusion.' },
    { id: 'lan3-c4-e3', ch: 4, title: 'Simulateur de filtrage d’aires spéciales OSPF (Stub, Totally Stubby & NSSA)', level: 'n3', lang: 'Python', desc: 'Appliquer les règles de filtrage de LSAs et d’injection de route par défaut selon le type d’aire.' },

    { id: 'lan3-c5-e1', ch: 5, title: 'Simulateur de violation de sécurité de port (Port Security)', level: 'n1', lang: 'Python', desc: 'Contrôler la table d’adresses MAC d’un port d’accès et appliquer l’action de violation configurée.' },
    { id: 'lan3-c5-e2', ch: 5, title: 'Validateur d’inspection DHCP Snooping et base de liaisons', level: 'n2', lang: 'Python', desc: 'Filtrer les messages DHCP selon le statut trusted/untrusted du port et enregistrer les baux légitimes.' },
    { id: 'lan3-c5-e3', ch: 5, title: 'Simulateur d’inspection dynamique ARP (Dynamic ARP Inspection - DAI)', level: 'n3', lang: 'Python', desc: 'Valider les paquets ARP entrants en les comparant à la table de baux DHCP Snooping.' },

    { id: 'lan3-c6-e1', ch: 6, title: 'Convertisseur de marquage QoS 802.1p CoS vers DiffServ DSCP', level: 'n1', lang: 'Python', desc: 'Mapper les niveaux de priorité de niveau 2 (CoS) vers les classes standardisées DSCP de niveau 3.' },
    { id: 'lan3-c6-e2', ch: 6, title: 'Simulateur d’ordonnanceur de files d’attente (Strict Priority vs WRR)', level: 'n2', lang: 'Python', desc: 'Ordonnancer l’émission de paquets selon les algorithmes Strict Priority et Weighted Round Robin.' },
    { id: 'lan3-c6-e3', ch: 6, title: 'Parseur de trames de découverte de topologie LLDP (802.1AB)', level: 'n3', lang: 'Python', desc: 'Décoder les TLVs obligatoires d’un paquet LLDP et reconstituer l’identité de l’équipement voisin.' }
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
    '  <h1>Catalogue des 18 Ateliers Pratiques de Code Lab — Réseau LAN Avancé B3</h1>',
    '  <p class="lead">18 ateliers de programmation interactive en Python 3 intégrés directement dans les modules de cours, corrigés avec tests d’évaluation automatisés.</p>',
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
      description: 'Répertoire complet des 18 exercices de programmation en Python 3 du cours Réseau LAN Avancé B3.',
      active: 'exercices',
      body
    }
  };
}

module.exports = { examens, exercices };
