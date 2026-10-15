/**
 * Pages « cartes » (flashcards) et « formules » (mémento) du cours « CCNA Réseau B2 ».
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
    '  <h1>Cartes de Révision &amp; Mémorisation Active Réseau CCNA</h1>',
    '  <p class="lead">36 fiches synthétiques pour ancrer les mécanismes fondamentaux : OSI, IPv4, VLSM, commutation CAM, convergence Spanning Tree, Cisco IOS, routage LPM et VLANs 802.1Q.</p>',
    '',
    cards(modules),
    '',
    chnav({ href: '../sommaire.html', label: 'Sommaire général' }, { href: 'formules.html', label: 'Consulter le mémento Réseau' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/cartes.html': {
      title: 'Cartes de révision — ' + course.brand,
      description: 'Flashcards de révision du cours CCNA Réseau B2 : notions clés des ' + chapterList.length + ' chapitres.',
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
    '  <h1>Mémento Réseau CCNA &amp; Synthèse Opérationnelle Cisco IOS</h1>',
    '  <p class="lead">Guide de référence rapide : correspondance des couches OSI, tableaux de masquage CIDR/Wildcard, coûts Spanning Tree, distances administratives et syntaxes de configuration Cisco IOS.</p>',
    '',
    '  <h2>1. Correspondance Modèle OSI vs TCP/IP &amp; PDUs</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr><th>Couche OSI</th><th>Couche TCP/IP</th><th>Nom du PDU</th><th>Adresses &amp; Protocoles Clés</th></tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr><td>L7 - Application / L6 / L5</td><td>Application</td><td>Données (Data)</td><td>HTTP/S (80/443), DNS (53), DHCP (67/68), SSH (22)</td></tr>',
    '      <tr><td>L4 - Transport</td><td>Transport</td><td>Segment (TCP) / Datagramme (UDP)</td><td>Ports source et destination (0-65535)</td></tr>',
    '      <tr><td>L3 - Réseau</td><td>Internet</td><td>Paquet (Packet)</td><td>Adresses IP logique source/destination, ICMP, ARP</td></tr>',
    '      <tr><td>L2 - Liaison de données</td><td>Accès Réseau</td><td>Trame (Frame)</td><td>Adresses MAC physiques (48 bits), EtherType, 802.1Q</td></tr>',
    '      <tr><td>L1 - Physique</td><td>Accès Réseau</td><td>Bits</td><td>Signaux électriques, optiques, RJ45, modulation</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>2. Table d’Adressage IPv4, Masques &amp; Wildcards</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr><th>Préfixe CIDR</th><th>Masque Décimal</th><th>Masque Générique (Wildcard)</th><th>Adresses Totales</th><th>Hôtes Exploitables</th><th>Usage Typique</th></tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr><td><code>/24</code></td><td>255.255.255.0</td><td>0.0.0.255</td><td>256</td><td>254</td><td>Réseau LAN standard</td></tr>',
    '      <tr><td><code>/25</code></td><td>255.255.255.128</td><td>0.0.0.127</td><td>128</td><td>126</td><td>Demi-classe C</td></tr>',
    '      <tr><td><code>/26</code></td><td>255.255.255.192</td><td>0.0.0.63</td><td>64</td><td>62</td><td>Sous-réseau département moyen</td></tr>',
    '      <tr><td><code>/27</code></td><td>255.255.255.224</td><td>0.0.0.31</td><td>32</td><td>30</td><td>Petit service / groupe d’utilisateurs</td></tr>',
    '      <tr><td><code>/28</code></td><td>255.255.255.240</td><td>0.0.0.15</td><td>16</td><td>14</td><td>Zone DMZ ou pool de serveurs</td></tr>',
    '      <tr><td><code>/29</code></td><td>255.255.255.248</td><td>0.0.0.7</td><td>8</td><td>6</td><td>Sous-réseau d’interconnexion multi-routeurs</td></tr>',
    '      <tr><td><code>/30</code></td><td>255.255.255.252</td><td>0.0.0.3</td><td>4</td><td>2</td><td>Lien point-à-point classique</td></tr>',
    '      <tr><td><code>/31</code></td><td>255.255.255.254</td><td>0.0.0.1</td><td>2</td><td>2</td><td>Lien point-à-point moderne (RFC 3021)</td></tr>',
    '      <tr><td><code>/32</code></td><td>255.255.255.255</td><td>0.0.0.0</td><td>1</td><td>1</td><td>Interface Loopback / adresse d’hôte unique</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>3. Spanning Tree Protocol (STP 802.1D / RSTP 802.1w)</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr><th>Débit de Lien</th><th>Coût STP Standard (802.1D-1998)</th><th>Coût RSTP Révisé (802.1w / 802.1D-2004)</th></tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr><td>10 Mbps (Ethernet)</td><td>100</td><td>2 000 000</td></tr>',
    '      <tr><td>100 Mbps (Fast Ethernet)</td><td>19</td><td>200 000</td></tr>',
    '      <tr><td>1 Gbps (Gigabit Ethernet)</td><td>4</td><td>20 000</td></tr>',
    '      <tr><td>10 Gbps (10 Gigabit)</td><td>2</td><td>2 000</td></tr>',
    '    </tbody>',
    '  </table>',
    '  <p><strong>Hiérarchie d’élection STP :</strong></p>',
    '  <ol>',
    '    <li><strong>Root Bridge :</strong> Plus faible Bridge ID (Priorité de 0 à 61440 par pas de 4096 + SysExtID + MAC la plus basse).</li>',
    '    <li><strong>Root Port (RP) sur non-racine :</strong> Port ayant le plus faible coût de chemin cumulé vers la racine (Root Path Cost).</li>',
    '    <li><strong>Designated Port (DP) par segment :</strong> Port du commutateur ayant le plus faible coût vers la racine. Tous les ports de la racine sont DP.</li>',
    '    <li><strong>Alternate/Blocking (BLK) :</strong> Tous les ports ni RP ni DP sont bloqués pour rompre la boucle.</li>',
    '  </ol>',
    '',
    '  <h2>4. Distances Administratives (AD) sous Cisco IOS</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr><th>Source de la Route</th><th>Distance Administrative par Défaut</th><th>Usage &amp; Caractéristique</th></tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr><td>Directement connectée (C)</td><td>0</td><td>Interface locale active avec IP assignée</td></tr>',
    '      <tr><td>Statique (S)</td><td>1</td><td>Route manuelle <code>ip route &lt;dest&gt; &lt;masque&gt; &lt;next-hop&gt;</code></td></tr>',
    '      <tr><td>EIGRP Résumé</td><td>5</td><td>Agrégation de routes interne</td></tr>',
    '      <tr><td>BGP Externe (eBGP)</td><td>20</td><td>Routage inter-systèmes autonomes</td></tr>',
    '      <tr><td>EIGRP Interne</td><td>90</td><td>Protocole à vecteur de distance avancé Cisco</td></tr>',
    '      <tr><td>OSPF (O)</td><td>110</td><td>Protocole à état de liens standardisé IETF</td></tr>',
    '      <tr><td>IS-IS</td><td>115</td><td>Protocole de routage pour opérateurs</td></tr>',
    '      <tr><td>RIP</td><td>120</td><td>Protocole historique à vecteur de distance (max 15 sauts)</td></tr>',
    '      <tr><td>EIGRP Externe</td><td>170</td><td>Routes redistribuées dans EIGRP</td></tr>',
    '      <tr><td>BGP Interne (iBGP)</td><td>200</td><td>Routage interne à l’AS</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>5. Commandes Fondamentales Cisco IOS</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr><th>Objectif</th><th>Commandes Cisco IOS</th></tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr><td>Sécurisation globale</td><td><code>service password-encryption<br>enable secret &lt;mot_de_passe&gt;<br>banner motd #Acces reserve au personnel autorise#</code></td></tr>',
    '      <tr><td>Accès distant SSH sécurisé</td><td><code>ip domain-name entreprise.local<br>crypto key generate rsa modulus 2048<br>ip ssh version 2<br>username admin secret &lt;pass&gt;<br>line vty 0 4<br>&nbsp;transport input ssh<br>&nbsp;login local</code></td></tr>',
    '      <tr><td>Configuration VLAN &amp; Trunk</td><td><code>vlan 10<br>&nbsp;name Direction<br>interface GigabitEthernet0/1<br>&nbsp;switchport mode trunk<br>&nbsp;switchport trunk native vlan 99<br>&nbsp;switchport trunk allowed vlan 10,20,99</code></td></tr>',
    '      <tr><td>Routage Inter-VLAN (ROAS)</td><td><code>interface GigabitEthernet0/0.10<br>&nbsp;encapsulation dot1Q 10<br>&nbsp;ip address 192.168.10.254 255.255.255.0</code></td></tr>',
    '      <tr><td>Route par défaut &amp; flottante</td><td><code>ip route 0.0.0.0 0.0.0.0 198.51.100.1<br>ip route 0.0.0.0 0.0.0.0 203.0.113.1 10</code></td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>6. Structure de la Balise IEEE 802.1Q (4 octets)</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr><th>Champ</th><th>Taille</th><th>Valeur / Rôle</th></tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr><td>TPID (Tag Protocol Identifier)</td><td>16 bits (2 octets)</td><td>Valeur fixe <code>0x8100</code> identifiant une trame 802.1Q balisée</td></tr>',
    '      <tr><td>PCP (Priority Code Point)</td><td>3 bits</td><td>Classe de service QoS (0: Best Effort, 5: Voix VoIP, 7: Contrôle réseau)</td></tr>',
    '      <tr><td>DEI (Drop Eligible Indicator)</td><td>1 bit</td><td>0 = paquets prioritaires maintenus, 1 = éligible au rejet en congestion</td></tr>',
    '      <tr><td>VID (VLAN Identifier)</td><td>12 bits</td><td>Numéro du VLAN de 1 à 4094 (1-1005 standard, 1006-4094 étendu)</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    chnav({ href: 'cartes.html', label: 'Flashcards de révision' }, { href: 'simulateur-examen.html', label: 'Passer l’examen blanc' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/formules.html': {
      title: 'Mémento &amp; Syntaxe — ' + course.brand,
      description: 'Mémento complet de référence réseau CCNA : tables OSI, CIDR, STP, distances administratives et commandes Cisco IOS.',
      active: 'formules',
      body
    }
  };
}

module.exports = { cartes, formules };
