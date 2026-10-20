/**
 * Pages « cartes » (flashcards) et « formules » (mémento) du cours « Firewall & Sécurité Réseau B3 ».
 */
'use strict';

const { crumb, cards } = require('../../../../scripts/course-kit');
const { chnav, disclaimer } = require('./helpers');

/* ======================== Cartes Flashcards ======================== */

function cartes(course, chapterList) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Cartes de révision' }
  ]);

  const modules = chapterList.map(ch => ({
    title: 'Module ' + ch.n + ' — ' + ch.short,
    items: ch.flashcards || []
  }));

  const body = [
    crumbs,
    '  <h1>Cartes de Révision &amp; Mémorisation Active en Sécurité Réseau &amp; Pare-feux</h1>',
    '  <p class="lead">36 fiches synthétiques pour ancrer les concepts fondamentaux : Générations de pare-feux, Suivi d’état TCP &amp; conntrack, Ordonnancement d’ACLs &amp; NAT, Architecture DMZ &amp; Bastions, Filtrage applicatif L7 &amp; DPI, Déploiement Linux iptables/nftables &amp; SIEM.</p>',
    '',
    cards(modules),
    '',
    chnav({ href: '../sommaire.html', label: 'Sommaire général' }, { href: 'formules.html', label: 'Consulter le mémento technique' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/cartes.html': {
      title: 'Cartes de révision — ' + course.brand,
      description: 'Flashcards de révision du cours Firewall & Sécurité Réseau B3 : définitions, règles et commandes clés des ' + chapterList.length + ' chapitres.',
      active: 'cartes',
      body
    }
  };
}

/* ======================== Formules & Mémento ======================== */

function formules(course) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Formules &amp; Mémento' }
  ]);

  const body = [
    crumbs,
    '  <h1>Mémento Technique &amp; Aide-Mémoire Pare-feu &amp; Sécurité Périmétrique</h1>',
    '  <p class="lead">Guide de référence opérationnelle : états conntrack, matrice des flux de sécurité DMZ, syntaxe comparée iptables vs nftables, signatures d’attaques et paramètres de durcissement.</p>',
    '',
    '  <h2>1. Machine à États TCP &amp; Table de Suivi Netfilter Conntrack</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr><th>État conntrack</th><th>Drapeaux TCP (Flags)</th><th>Rôle &amp; Comportement Pare-feu</th><th>Délai Timeout défaut</th></tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr><td><code>NEW</code></td><td>SYN (ou premier paquet)</td><td>Initie la session. Alloue une entrée dans la table conntrack.</td><td>60 secondes (SYN_SENT)</td></tr>',
    '      <tr><td><code>ESTABLISHED</code></td><td>ACK après SYN-ACK, DATA</td><td>Session bilatérale validée par le handshake à 3 voies. Trafic légitime.</td><td>3600 à 432000 s</td></tr>',
    '      <tr><td><code>RELATED</code></td><td>Paquets secondaires liés</td><td>Connexion associée à une session existante (ex: canal de données FTP, erreurs ICMP).</td><td>Selon protocole maître</td></tr>',
    '      <tr><td><code>INVALID</code></td><td>Combinaison anormale</td><td>Paquet orphelin, hors session ou flags contradictoires (SYN+FIN, Null). À DROP impérativement.</td><td>Immédiat (aucun stockage)</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>2. Matrice d’Or de Sécurité des Flux Inter-Zones (Architecture DMZ)</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr><th>Flux Source -> Destination</th><th>Statut de Conformité</th><th>Ports &amp; Services Typiques</th><th>Justification Sécuritaire</th></tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr><td><code>WAN -&gt; DMZ</code></td><td>Autorisé et strictement filtré</td><td>80, 443 (Web), 25 (Mail), 53 (DNS)</td><td>Exposition contrôlée des services publics. Tout le reste est DROP.</td></tr>',
    '      <tr><td><code>LAN -&gt; DMZ</code></td><td>Autorisé pour administration</td><td>80, 443 (HTTP), 22 (SSH admin), 3306 (BDD)</td><td>Permet aux postes internes de consommer les serveurs et aux admins de gérer.</td></tr>',
    '      <tr><td><code>LAN -&gt; WAN</code></td><td>Autorisé avec SNAT/Proxy</td><td>80, 443, 53 via passerelle NAT</td><td>Navigation des employés, masquage de l’adressage IP privé interne.</td></tr>',
    '      <tr><td><code>DMZ -&gt; WAN</code></td><td>Restreint au strict nécessaire</td><td>80, 443 (mises à jour système), 53</td><td>Empêche la DMZ de servir de relais d’attaque ou de botnet vers Internet.</td></tr>',
    '      <tr><td><code>DMZ -&gt; LAN</code></td><td>STRICTEMENT INTERDIT (Règle d’Or)</td><td>AUCUN port initié</td><td>En cas de compromission d’un serveur DMZ, le pirate ne peut pas pivoter vers le réseau interne.</td></tr>',
    '      <tr><td><code>WAN -&gt; LAN</code></td><td>STRICTEMENT INTERDIT</td><td>AUCUN flux direct</td><td>Le réseau d’entreprise interne ne doit jamais être exposé directement sur le Net.</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>3. Syntaxe Comparée des Règles : iptables vs nftables</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr><th>Action de Sécurité</th><th>Syntaxe Linux héritée (iptables)</th><th>Syntaxe moderne Linux (nftables)</th></tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr><td>Politique par défaut DROP</td><td><code>iptables -P INPUT DROP</code></td><td><code>nft add chain inet filter input { type filter hook input priority 0; policy drop; }</code></td></tr>',
    '      <tr><td>Autoriser trafic déjà établi</td><td><code>iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT</code></td><td><code>nft add rule inet filter input ct state established,related accept</code></td></tr>',
    '      <tr><td>Autoriser HTTP/HTTPS entrant</td><td><code>iptables -A INPUT -p tcp -m multiport --dports 80,443 -j ACCEPT</code></td><td><code>nft add rule inet filter input tcp dport { 80, 443 } accept</code></td></tr>',
    '      <tr><td>Masquage SNAT sortant</td><td><code>iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE</code></td><td><code>nft add rule ip nat postrouting oifname "eth0" masquerade</code></td></tr>',
    '      <tr><td>Redirection DNAT (Port Forward)</td><td><code>iptables -t nat -A PREROUTING -p tcp --dport 80 -j DNAT --to 10.0.0.10:8080</code></td><td><code>nft add rule ip nat prerouting tcp dport 80 dnat to 10.0.0.10:8080</code></td></tr>',
    '      <tr><td>Blocage dynamique liste noire</td><td><code>iptables -A INPUT -s 198.51.100.5 -j DROP</code></td><td><code>nft add element inet filter blacklist { 198.51.100.5 }</code></td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>4. Signatures d’Anomalies Réseau et Attaques Applicatives L7 (DPI)</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr><th>Nom de l’Attaque / Sonde</th><th>Couche OSI</th><th>Signature / Motif Détecté</th><th>Action Pare-feu / WAF</th></tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr><td><code>Null Scan (Nmap -sN)</code></td><td>L4 (TCP)</td><td>Flags = 0 (aucun drapeau activé)</td><td>DROP immédiat + log d’alerte intrusion</td></tr>',
    '      <tr><td><code>Xmas Tree Scan (Nmap -sX)</code></td><td>L4 (TCP)</td><td>FIN, PSH, URG activés simultanément</td><td>DROP immédiat + blacklist IP</td></tr>',
    '      <tr><td><code>SYN Flood</code></td><td>L4 (TCP)</td><td>Rafale de SYN sans ACK (demi-ouvertures)</td><td>Activation SYN Cookies (syncookies=1) + Rate Limit</td></tr>',
    "      <tr><td><code>SQL Injection (SQLi)</code></td><td>L7 (Application)</td><td><code>UNION SELECT</code>, <code>' OR '1'='1</code>, <code>SLEEP(</code></td><td>Blocage requête HTTP 403 + Alerte SIEM</td></tr>",
    '      <tr><td><code>Cross-Site Scripting (XSS)</code></td><td>L7 (Application)</td><td><code>&lt;script&gt;</code>, <code>javascript:</code>, <code>onerror=</code></td><td>Désinfection ou rejet WAF L7</td></tr>',
    '      <tr><td><code>Path Traversal</code></td><td>L7 (Application)</td><td><code>../</code>, <code>..%2f</code>, <code>/etc/passwd</code></td><td>Rejet immédiat 403 Forbidden</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    chnav({ href: 'cartes.html', label: 'Revenir aux cartes de révision' }, { href: 'examens.html', label: 'Passer aux épreuves d’examen' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/formules.html': {
      title: 'Mémento technique — ' + course.brand,
      description: 'Mémento et fiches mémo des syntaxes iptables, nftables, états conntrack et matrice DMZ du cours Firewall B3.',
      active: 'formules',
      body
    }
  };
}

module.exports = { cartes, formules };
