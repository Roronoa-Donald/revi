/**
 * Pages « examens » et « exercices » du cours « Firewall & Sécurité Réseau B3 ».
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
    '  <h1>Examens Blancs &amp; Épreuves Corrigées de Sécurité Réseau &amp; Pare-feux B3</h1>',
    '  <p class="lead">Deux épreuves d’évaluation complètes conformes aux exigences professionnelles et académiques de niveau Bachelor 3 / Licence 3 (Support Caleb Benaja).</p>',
    '',
    '  <h2>Épreuve 1 : Contrôle Continu (CC) — Durée 1 h 30 (Barème sur 20 points)</h2>',
    box('standard', 'Sujet du Contrôle Continu — Fondements, Suivi d’État TCP, Table conntrack &amp; Politiques ACLs', [
      '<h4>Partie 1 : Fondements Théoriques &amp; Évolution des Pare-feux (6 points)</h4>',
      '<ol>',
      '  <li>Distinguez précisément le filtrage de paquets sans état (Stateless / Génération 1) du filtrage avec suivi d’état (Stateful Inspection / Génération 2). Expliquez pourquoi un pare-feu stateless est incapable de bloquer une attaque par injection de paquets ACK forgés simulant une session déjà ouverte. (3 pts)</li>',
      '  <li>Définissez les acronymes UTM (Unified Threat Management) et NGFW (Next-Generation Firewall). Précisez deux différences majeures entre une appliance UTM et un NGFW d’entreprise opérant en coupure de flux haute disponibilité. (3 pts)</li>',
      '</ol>',
      '<h4>Partie 2 : Mécanique de Suivi de Session TCP &amp; Détection d’Anomalies (7 points)</h4>',
      '<ol>',
      '  <li>Détaillez la succession des paquets et des drapeaux (flags) lors de l’établissement d’une connexion TCP à 3 voies (3-Way Handshake) selon la RFC 793. Indiquez l’état attribué à chaque étape par le module netfilter conntrack (NEW, ESTABLISHED). (3 pts)</li>',
      '  <li>Un analyseur réseau capte des paquets entrants avec les combinaisons de drapeaux suivantes :<br>' +
      '      a) <code>flags=FIN,PSH,URG</code><br>' +
      '      b) <code>flags=NONE</code> (aucun drapeau)<br>' +
      '      c) <code>flags=SYN,FIN</code>.<br>' +
      '      Identifiez la nature exacte de chaque sonde/attaque, le logiciel offensif classiquement employé (ex: options de scan Nmap) et expliquez pourquoi le pare-feu doit obligatoirement les DROP avec le statut <code>INVALID</code>. (4 pts)</li>',
      '</ol>',
      '<h4>Partie 3 : Politiques de Sécurité, Ordonnancement d’ACLs &amp; Rule Shadowing (7 points)</h4>',
      '<ol>',
      '  <li>Expliquez le principe d’évaluation <em>First-Match-Wins</em> et la règle de sécurité implicite <em>Default DROP</em> (ou White-listing). Pourquoi une règle permissive placée trop haut dans le jeu de règles représente-t-elle une faille critique ? (3 pts)</li>',
      '  <li>Soit la politique de filtrage suivante ordonnée de haut en bas :<br>' +
      '      - Règle 1 : <code>DENY TCP src=ANY dst=10.0.0.0/24 dport=ANY</code><br>' +
      '      - Règle 2 : <code>PERMIT TCP src=192.168.1.50 dst=10.0.0.10 dport=443</code><br>' +
      '      - Règle 3 : <code>DENY TCP src=192.168.1.0/24 dst=10.0.0.10 dport=22</code><br>' +
      '      Identifiez les anomalies de configuration dans ce jeu de règles (masquage de règle / Rule Shadowing et redondance). Proposez une réorganisation corrigée et optimale. (4 pts)</li>',
      '</ol>'
    ].join('\n')),
    '',
    box('solution', 'Corrigé type &amp; Barème détaillé du Contrôle Continu', [
      '<h4>Corrigé Partie 1 (6 points)</h4>',
      '<ul>',
      '  <li><strong>Stateless vs Stateful (3 pts) :</strong> Le filtrage stateless examine chaque paquet de manière totalement isolée en couches 3 et 4 (IP source/dest, port source/dest) sans mémoire du contexte. Le filtrage stateful maintient une table d’état en mémoire (table conntrack) mémorisant l’historique des échanges. Un pirate peut facilement envoyer un paquet TCP avec le drapeau ACK activé (ACK scan) vers un pare-feu stateless : le pare-feu pensant qu’il s’agit du retour d’une connexion initiée de l’intérieur laisse passer le paquet. Le pare-feu stateful vérifie sa table : aucune entrée correspondante n’existant, le paquet orphelin est rejeté avec l’état <code>INVALID</code>.</li>',
      '  <li><strong>UTM vs NGFW (3 pts) :</strong> L’UTM centralise sur une même boîte matérielle diverses briques hétérogènes (filtrage, antivirus, antispam, VPN) convenant idéalement aux PME mais avec des goulets d’étranglement de performances dès que tous les modules sont activés. Le NGFW (ex: Palo Alto Networks, Fortinet FortiGate haut débit) intègre de façon native et parallélisée un moteur d’inspection monocycle (Single-Pass Architecture), capable de décoder les applications de niveau 7 (App-ID), d’identifier les utilisateurs (User-ID) et d’analyser le contenu sans dégradation majeure de latence en cœur de réseau.</li>',
      '</ul>',
      '<h4>Corrigé Partie 2 (7 points)</h4>',
      '<ul>',
      '  <li><strong>Handshake 3-voies &amp; conntrack (3 pts) :</strong><br>' +
      '    1. Client -> Serveur : paquet avec drapeau <code>SYN</code>. Conntrack alloue l’entrée avec l’état <code>NEW</code> (phase SYN_SENT).<br>' +
      '    2. Serveur -> Client : réponse avec drapeaux <code>SYN,ACK</code>. Conntrack maintient <code>NEW</code> (phase SYN_RCVD).<br>' +
      '    3. Client -> Serveur : confirmation avec drapeau <code>ACK</code>. Conntrack bascule la session à l’état <code>ESTABLISHED</code>. Tout paquet DATA ultérieur est alors admis sous l’état <code>ESTABLISHED</code>.</li>',
      '  <li><strong>Identification des sondes furtives (4 pts) :</strong><br>' +
      '    a) <code>FIN,PSH,URG</code> : <strong>Xmas Tree Scan</strong> (Nmap option <code>-sX</code>). Fait clignoter le paquet comme un sapin de Noël pour forcer une réponse RST des ports fermés selon la RFC 793.<br>' +
      '    b) <code>flags=NONE</code> : <strong>Null Scan</strong> (Nmap option <code>-sN</code>). Aucun drapeau actif, interdit en fonctionnement normal.<br>' +
      '    c) <code>SYN,FIN</code> : <strong>SYN-FIN Anomaly</strong>. Combinaison paradoxale demandant d’ouvrir et de fermer la connexion simultanément, employée pour tromper les vieux moteurs d’inspection.<br>' +
      '    Ces paquets doivent tous être rejetés (DROP) avec le statut <code>INVALID</code> car ils violent les règles élémentaires du protocole TCP et dénotent une tentative hostile de cartographie réseau.</li>',
      '</ul>',
      '<h4>Corrigé Partie 3 (7 points)</h4>',
      '<ul>',
      '  <li><strong>First-Match-Wins &amp; Default DROP (3 pts) :</strong> Les règles sont lues séquentiellement de haut en bas ; la première correspondance met fin à l’évaluation. La politique Default DROP garantit que tout ce qui n’est pas explicitement autorisé est bloqué (principe du moindre privilège). Si une règle trop large (ex: PERMIT ANY) est placée en haut, aucune des restrictions placées plus bas ne s’appliquera, créant une faille béante.</li>',
      '  <li><strong>Détection d’anomalies et correction (4 pts) :</strong><br>' +
      '    - La Règle 1 bloque tout trafic TCP vers le sous-réseau <code>10.0.0.0/24</code>.<br>' +
      '    - Par conséquent, la Règle 2 (PERMIT vers 10.0.0.10:443) est <strong>masquée (Shadowed)</strong> par la Règle 1 : elle ne sera jamais exécutée car tout paquet vers 10.0.0.10 sera déjà bloqué par la Règle 1.<br>' +
      '    - La Règle 3 (DENY port 22) est <strong>redondante</strong> avec la Règle 1 car la Règle 1 bloque déjà tous les ports vers 10.0.0.0/24.<br>' +
      '    <strong>Ordre corrigé et assaini :</strong><br>' +
      '    1. <code>PERMIT TCP src=192.168.1.50 dst=10.0.0.10 dport=443</code> (Exception spécifique autorisée en premier)<br>' +
      '    2. <code>DENY TCP src=ANY dst=10.0.0.0/24 dport=ANY</code> (Règle générale de blocage du sous-réseau)<br>' +
      '    (La règle 3 est supprimée car superflue).</li>',
      '</ul>'
    ].join('\n')),
    '',
    '  <h2>Épreuve 2 : Examen Terminal (ET) — Durée 2 h 00 (Barème sur 20 points)</h2>',
    box('standard', 'Sujet de l’Examen Terminal — DMZ, Topologies Multi-Pare-feux, L7/DPI, Linux Netfilter &amp; SIEM', [
      '<h4>Partie 1 : Architecture DMZ, Topologies &amp; Matrice des Flux (7 points)</h4>',
      '<ol>',
      '  <li>Définissez le concept de Zone Démilitarisée (DMZ). Énoncez la règle d’or absolue concernant les flux initiés entre la DMZ et le réseau local interne LAN. Pourquoi cette règle est-elle vitale en cas de compromission d’un serveur web ? (3 pts)</li>',
      '  <li>Comparez une architecture à pare-feu unique à trois interfaces (Triple-Homed Screened Subnet) et une architecture à double pare-feu en cascade (Back-to-Back). Justifiez l’intérêt de choisir deux constructeurs différents (hétérogénéité) pour le pare-feu frontal et le pare-feu interne. (4 pts)</li>',
      '</ol>',
      '<h4>Partie 2 : Filtrage Applicatif L7, Inspection SNI &amp; Protection anti-DoS (6 points)</h4>',
      '<ol>',
      '  <li>Comment un pare-feu nouvelle génération inspecte-t-il les flux HTTPS chiffrés sans rupture de chiffrement (sans déchiffrement SSL man-in-the-middle) ? Expliquez le rôle du champ SNI (Server Name Indication) dans le handshake TLS. (3 pts)</li>',
      '  <li>Expliquez le fonctionnement du Deep Packet Inspection (DPI) pour intercepter une attaque par injection SQL (SQLi) ou Cross-Site Scripting (XSS). Donnez deux exemples de motifs de signatures recherchés dans la charge utile HTTP. (3 pts)</li>',
      '</ol>',
      '<h4>Partie 3 : Déploiement Linux Netfilter (iptables/nftables) &amp; Réponse SIEM (7 points)</h4>',
      '<ol>',
      '  <li>Écrivez les commandes complètes en syntaxe <code>iptables</code> pour :<br>' +
      '      a) Définir la politique par défaut de la chaîne INPUT à DROP.<br>' +
      '      b) Autoriser les connexions de retour déjà établies (état ESTABLISHED, RELATED).<br>' +
      '      c) Autoriser le trafic web entrant HTTPS (port 443) sur l’interface eth0. (3 pts)</li>',
      '  <li>Traduisez les mêmes règles de filtrage en syntaxe moderne <code>nftables</code>. (2 pts)</li>',
      '  <li>Expliquez l’intégration d’un pare-feu avec un outil de type Fail2ban ou un orchestrateur SOAR relié à un SIEM pour contrer les attaques par force brute SSH. (2 pts)</li>',
      '</ol>'
    ].join('\n')),
    '',
    box('solution', 'Corrigé type &amp; Barème détaillé de l’Examen Terminal', [
      '<h4>Corrigé Partie 1 (7 points)</h4>',
      '<ul>',
      '  <li><strong>DMZ &amp; Règle d’or (3 pts) :</strong> La DMZ est une zone réseau tampon isolée hébergeant les serveurs accessibles depuis Internet (serveur web, relais messagerie, DNS public). La règle d’or absolue : <strong>aucune connexion ne doit jamais pouvoir être initiée depuis la DMZ vers le réseau interne LAN</strong> (seules les réponses aux requêtes initiées par le LAN vers la DMZ sont permises). Si un pirate exploite une faille zero-day sur le serveur web en DMZ et obtient un shell distant, il se retrouve bloqué dans la DMZ et ne peut pas rebondir vers les postes de travail ou les contrôleurs de domaine Active Directory du LAN.</li>',
      '  <li><strong>Triple-Homed vs Back-to-Back hétérogène (4 pts) :</strong><br>' +
      '    - Triple-Homed : un seul boîtier avec 3 interfaces (LAN, WAN, DMZ). Économique et simple, mais présente un point unique de défaillance (SPOF) matériel et logiciel. Si le boîtier plante ou si une vulnérabilité critique touche son firmware, toute l’entreprise est compromise.<br>' +
      '    - Back-to-Back : deux pare-feux distincts encadrant la DMZ. Le pare-feu frontal filtre le trafic Internet vers la DMZ ; le pare-feu interne filtre le trafic DMZ vers le LAN.<br>' +
      '    - Intérêt de l’hétérogénéité : en choisissant deux fabricants différents (ex: Fortinet en frontal et Palo Alto ou Cisco en interne), si une vulnérabilité zero-day touche le premier équipement, elle n’affectera pas le second. Le pirate qui franchit le premier pare-feu doit trouver une seconde faille totalement différente pour atteindre le LAN (défense en profondeur maximale).</li>',
      '</ul>',
      '<h4>Corrigé Partie 2 (6 points)</h4>',
      '<ul>',
      '  <li><strong>Inspection SNI TLS (3 pts) :</strong> Lors de la négociation TLS (handshake), le client envoie un paquet en clair <em>Client Hello</em> avant que le canal chiffré ne soit établi. Ce paquet contient l’extension SNI (Server Name Indication) qui mentionne le nom de domaine complet (FQDN) du serveur distant visé (ex: <code>banque-phishing.evil</code>). Le NGFW lit cette information en clair, la confronte à sa base de données d’URL et de réputation catégorielle, et peut interrompre la connexion immédiatement (DROP ou TCP RST) avant même l’échange des clés de chiffrement.</li>',
      '  <li><strong>Deep Packet Inspection L7 (3 pts) :</strong> Le moteur DPI réassemble les segments TCP pour analyser la charge utile applicative HTTP (URL, paramètres GET, corps POST). Il compare le flux avec une base de signatures d’attaques et d’expressions régulières :<br>' +
      '    - Pour l’injection SQL : motifs <code>UNION SELECT</code>, <code>\' OR \'1\'=\'1</code>, <code>SLEEP(</code>, <code>DROP TABLE</code>.<br>' +
      '    - Pour le XSS : balises <code>&lt;script&gt;</code>, gestionnaires d’événements <code>onerror=</code>, protocole <code>javascript:</code>.<br>' +
      '    Dès qu’un motif suspect est identifié, la requête est rejetée avec un code HTTP 403 Forbidden et une alerte de sécurité est envoyée au SIEM.</li>',
      '</ul>',
      '<h4>Corrigé Partie 3 (7 points)</h4>',
      '<ul>',
      '  <li><strong>Commandes iptables (3 pts) :</strong><br>' +
      '    a) <code>iptables -P INPUT DROP</code><br>' +
      '    b) <code>iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT</code><br>' +
      '    c) <code>iptables -A INPUT -i eth0 -p tcp --dport 443 -j ACCEPT</code></li>',
      '  <li><strong>Commandes nftables (2 pts) :</strong><br>' +
      '    <code>nft add table inet filter</code><br>' +
      '    <code>nft add chain inet filter input { type filter hook input priority 0; policy drop; }</code><br>' +
      '    <code>nft add rule inet filter input ct state established,related accept</code><br>' +
      '    <code>nft add rule inet filter input iifname "eth0" tcp dport 443 accept</code></li>',
      '  <li><strong>Intégration SIEM &amp; Fail2ban (2 pts) :</strong> Les logs d’authentification (ex: <code>/var/log/auth.log</code>) sont analysés en temps réel. Lorsque Fail2ban détecte plus de 3 ou 5 échecs consécutifs depuis une même adresse IP dans une fenêtre de quelques minutes, il injecte dynamiquement une règle de bannissement dans netfilter (ex: <code>nft add element inet filter blacklist { IP }</code>). Le SIEM centralise ces événements pour corréler les attaques distribuées et ordonner le bannissement sur l’ensemble des pare-feux du parc informatique via des playbooks SOAR automatisés.</li>',
      '</ul>'
    ].join('\n')),
    '',
    chnav({ href: 'formules.html', label: 'Consulter le mémento des formules' }, { href: 'exercices.html', label: 'Accéder aux exercices pratiques' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/examens.html': {
      title: 'Examens blancs — ' + course.brand,
      description: 'Examens blancs corrigés et barème détaillé du cours Firewall & Sécurité Réseau B3 : Contrôle Continu et Examen Terminal.',
      active: 'examens',
      body
    }
  };
}

/* ======================== Catalogue des Exercices ======================== */

function exercices(course, chapterList) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Exercices de programmation' }
  ]);

  const exercises = [
    { id: 'fw3-c1-e1', ch: 1, title: 'Classificateur de génération et d’architecture de pare-feu', level: 'n1', lang: 'Python', desc: 'Identifier la génération technologique (Stateless, Stateful, UTM, NGFW) selon les capacités d’inspection.' },
    { id: 'fw3-c1-e2', ch: 1, title: 'Auditeur de séparation des zones de confiance', level: 'n2', lang: 'Python', desc: 'Vérifier la conformité de l’isolation entre zones de confiance et d’exposition.' },
    { id: 'fw3-c1-e3', ch: 1, title: 'Moteur de filtrage de paquets sans état (Stateless)', level: 'n3', lang: 'Python', desc: 'Filtrer les paquets réseau en couches L3/L4 avec politique de refus implicite.' },

    { id: 'fw3-c2-e1', ch: 2, title: 'Machine à états TCP conntrack (NEW, ESTABLISHED, INVALID)', level: 'n1', lang: 'Python', desc: 'Simuler le moteur conntrack de suivi de sessions TCP selon la RFC 793.' },
    { id: 'fw3-c2-e2', ch: 2, title: 'Purge et gestion des délais d’expiration (Timeouts) conntrack', level: 'n2', lang: 'Python', desc: 'Gérer la durée de vie des entrées conntrack selon le protocole et leur inactivité.' },
    { id: 'fw3-c2-e3', ch: 2, title: 'Détecteur de balayages furtifs (Scans Xmas, Null, FIN & Syn-Fin)', level: 'n3', lang: 'Python', desc: 'Détecter les combinaisons illégales de drapeaux TCP exploitées par Nmap.' },

    { id: 'fw3-c3-e1', ch: 3, title: 'Moteur d’évaluation d’ACL First-Match-Wins avec Default DROP', level: 'n1', lang: 'Python', desc: 'Implémenter le moteur séquentiel d’évaluation des règles de filtrage avec refus par défaut.' },
    { id: 'fw3-c3-e2', ch: 3, title: 'Détecteur d’anomalies et masquage de règles (Rule Shadowing)', level: 'n2', lang: 'Python', desc: 'Analyser une politique de sécurité pour détecter les règles masquées ou redondantes.' },
    { id: 'fw3-c3-e3', ch: 3, title: 'Simulateur de translation d’adresses NAT (SNAT Masquerade & DNAT)', level: 'n3', lang: 'Python', desc: 'Simuler les translations SNAT sortantes et DNAT (Port Forwarding) entrantes.' },

    { id: 'fw3-c4-e1', ch: 4, title: 'Contrôleur de conformité des flux de sécurité DMZ', level: 'n1', lang: 'Python', desc: 'Vérifier la conformité des flux et interdire formellement toute initiation DMZ vers LAN.' },
    { id: 'fw3-c4-e2', ch: 4, title: 'Évaluateur d’architectures et topologies pare-feu', level: 'n2', lang: 'Python', desc: 'Classifier l’architecture (Dual-Homed, Triple-Homed, Back-to-Back) et calculer sa résilience.' },
    { id: 'fw3-c4-e3', ch: 4, title: 'Passerelle d’administration sécurisée et Bastion SSH / Jump Host', level: 'n3', lang: 'Python', desc: 'Valider les accès d’administration via un hôte bastion avec authentification MFA.' },

    { id: 'fw3-c5-e1', ch: 5, title: 'Filtrage de domaines DNS & inspection du SNI TLS', level: 'n1', lang: 'Python', desc: 'Classer les noms d’hôtes extraits de l’extension SNI TLS selon leur réputation.' },
    { id: 'fw3-c5-e2', ch: 5, title: 'Limiteur de débit et protection anti-DoS par fenêtre glissante', level: 'n2', lang: 'Python', desc: 'Implémenter un limiteur de débit par IP pour contrer les rafales de requêtes.' },
    { id: 'fw3-c5-e3', ch: 5, title: 'Moteur Deep Packet Inspection (DPI) et détection de signatures L7', level: 'n3', lang: 'Python', desc: 'Analyser la charge utile applicative pour détecter les injections SQL, XSS et path traversal.' },

    { id: 'fw3-c6-e1', ch: 6, title: 'Compilateur de règles vers les syntaxes iptables et nftables', level: 'n1', lang: 'Python', desc: 'Traduire une politique déclarative en commandes netfilter iptables et nftables.' },
    { id: 'fw3-c6-e2', ch: 6, title: 'Parseur et agrégateur statistique de journaux de pare-feu (Logs)', level: 'n2', lang: 'Python', desc: 'Analyser un flux de logs format syslog et extraire les métriques de sécurité essentielles.' },
    { id: 'fw3-c6-e3', ch: 6, title: 'Détecteur de force brute et bannissement dynamique (Fail2ban SIEM)', level: 'n3', lang: 'Python', desc: 'Surveiller les échecs d’authentification et déclencher le blocage dynamique de l’IP.' }
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
    '  <h1>Catalogue des 18 Ateliers Pratiques de Code Lab — Pare-feux &amp; Sécurité Réseau</h1>',
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
      description: 'Répertoire complet des 18 exercices de programmation en Python 3 du cours Firewall & Sécurité Réseau B3.',
      active: 'exercices',
      body
    }
  };
}

module.exports = { examens, exercices };
