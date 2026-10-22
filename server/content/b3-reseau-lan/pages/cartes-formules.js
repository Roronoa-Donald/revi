/**
 * Pages « cartes » (flashcards) et « formules » (mémento) du cours « Réseau LAN Avancé B3 ».
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
    '  <h1>Cartes de Révision &amp; Mémorisation Active — Réseau LAN Avancé B3</h1>',
    '  <p class="lead">36 fiches synthétiques pour ancrer les concepts fondamentaux : Spanning Tree STP/RSTP/MSTP, BPDU Guard, EtherChannel LACP, Redondance de Passerelle FHRP (HSRP, VRRP, GLBP), Routage OSPFv2, Durcissement d\'Accès (Port Security, DHCP Snooping, DAI) et Qualité de Service QoS 802.1p/DSCP.</p>',
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
      description: 'Flashcards de révision du cours Réseau LAN Avancé B3 : STP, EtherChannel, FHRP, OSPF, sécurité d\'accès et QoS des ' + chapterList.length + ' chapitres.',
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
    '  <h1>Mémento Technique &amp; Guide Opérationnel — Réseau LAN Avancé B3</h1>',
    '  <p class="lead">Guide de référence des commandes CLI de commutation, calculs de coûts STP, modes d\'agrégation EtherChannel, protocoles de redondance FHRP, métriques OSPF et règles de sécurité de niveau 2.</p>',
    '',
    '  <h2>1. Commandes d\'Administration CLI de Commutation &amp; Routage</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr><th>Commande CLI</th><th>Fonction / Rôle</th><th>Exemple d\'Utilisation</th></tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr><td><code>show spanning-tree</code></td><td>Affichez l\'état global du STP, le Root Bridge et les rôles de chaque port.</td><td><code>show spanning-tree vlan 10</code></td></tr>',
    '      <tr><td><code>show etherchannel summary</code></td><td>Indique l\'état des groupes d\'agrégation (Port-Channel) et les protocoles actifs.</td><td><code>show etherchannel 1 summary</code></td></tr>',
    '      <tr><td><code>show vrrp / show standby</code></td><td>Affichez l\'état du routeur virtuel (Master/Backup), la priorité et l\'IP virtuelle.</td><td><code>show standby brief</code></td></tr>',
    '      <tr><td><code>show ip ospf neighbor</code></td><td>Liste les voisins OSPF adjacents, leurs états (Full/2-Way) et les rôles DR/BDR.</td><td><code>show ip ospf neighbor</code></td></tr>',
    '      <tr><td><code>show port-security interface</code></td><td>Affichez le statut de sécurité du port, le quota d\'adresses MAC et les violations.</td><td><code>show port-security interface gi0/1</code></td></tr>',
    '      <tr><td><code>show ip dhcp snooping binding</code></td><td>Affichez la base de données des baux DHCP attribués aux ports non approuvés.</td><td><code>show ip dhcp snooping binding</code></td></tr>',
    '      <tr><td><code>show lldp neighbors detail</code></td><td>Donne les informations détaillées sur les commutateurs et routeurs voisins.</td><td><code>show lldp neighbors</code></td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>2. Élection et Coûts du Spanning Tree Protocol (STP / RSTP)</h2>',
    '  <div class="card">',
    '    <h4>Structure du Bridge ID (BID) &amp; Départage</h4>',
    '    <p>Le Bridge ID est encodé sur 8 octets selon la spécification IEEE 802.1t / 802.1w :</p>',
    '    <ul>',
    '      <li><strong>Bridge Priority (4 bits) :</strong> Multiples stricts de 4096 (de 0 à 61440, valeur par défaut : <code>32768</code>).</li>',
    '      <li><strong>Extended System ID (12 bits) :</strong> Identifiant du VLAN (de 1 à 4094).</li>',
    '      <li><strong>Adresse MAC du commutateur (48 bits) :</strong> Utilisée pour départager deux commutateurs ayant la même priorité totale.</li>',
    '    </ul>',
    '    <p><strong>Règle d\'or :</strong> Le commutateur ayant le plus petit BID devient le <strong>Root Bridge</strong> (commence par la priorité totale la plus basse, puis la plus petite adresse MAC).</p>',
    '  </div>',
    '',
    '  <h3>Tableau des Coûts de Liens STP (IEEE 802.1D vs IEEE 802.1D-2004 / 802.1w)</h3>',
    '  <table class="table">',
    '    <thead>',
    '      <tr><th>Débit de la Liaison</th><th>Coût Ancien (802.1D-1998, 16 bits)</th><th>Coût Nouveau (802.1D-2004 / RSTP, 32 bits)</th></tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr><td>10 Mbps</td><td>100</td><td>2 000 000</td></tr>',
    '      <tr><td>100 Mbps (FastEthernet)</td><td>19</td><td>200 000</td></tr>',
    '      <tr><td>1 Gbps (GigabitEthernet)</td><td>4</td><td>20 000</td></tr>',
    '      <tr><td>10 Gbps (TenGigabit)</td><td>2</td><td>2 000</td></tr>',
    '      <tr><td>40 Gbps</td><td>1</td><td>500</td></tr>',
    '      <tr><td>100 Gbps</td><td>1</td><td>200</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>3. Matrice des Protocoles d\'Agrégation EtherChannel</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr><th>Protocole</th><th>Standard / Propriétaire</th><th>Modes Configurables</th><th>Règle de Négociation Réussie</th></tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr><td><strong>LACP (Link Aggregation Control Protocol)</strong></td><td>Standard IEEE 802.3ad / 802.1AX</td><td><code>active</code>, <code>passive</code></td><td>Au moins un côté doit être configuré en <code>active</code> (active-active ou active-passive).</td></tr>',
    '      <tr><td><strong>PAgP (Port Aggregation Protocol)</strong></td><td>Propriétaire Cisco</td><td><code>desirable</code>, <code>auto</code></td><td>Au moins un côté doit être configuré en <code>desirable</code>.</td></tr>',
    '      <tr><td><strong>Statique (Force ON)</strong></td><td>Sans protocole de négociation</td><td><code>on</code></td><td>Les deux côtés doivent impérativement être configurés en <code>on</code> (risque de boucle si incohérence).</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>4. Protocoles FHRP de Redondance de Passerelle par Défaut</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr><th>Protocole</th><th>Standard / Type</th><th>Adresse MAC Virtuelle</th><th>Équilibrage de Charge</th></tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr><td><strong>HSRP v1</strong></td><td>Propriétaire Cisco</td><td><code>0000.0c07.acXX</code> (XX = groupe)</td><td>Actif / Passif (multigroup pour répartir les VLANs)</td></tr>',
    '      <tr><td><strong>HSRP v2</strong></td><td>Propriétaire Cisco</td><td><code>0000.0c9f.fXXX</code> (XXX = groupe)</td><td>Actif / Passif (supports jusqu\'à 4096 groupes)</td></tr>',
    '      <tr><td><strong>VRRP v2 / v3</strong></td><td>Standard ouvert (RFC 5798)</td><td><code>0000.5e00.01XX</code> (IPv4) / <code>0000.5e00.02XX</code> (IPv6)</td><td>Actif (Master) / Passif (Backup)</td></tr>',
    '      <tr><td><strong>GLBP</strong></td><td>Propriétaire Cisco</td><td><code>0007.b400.XXYY</code> (XX = groupe, YY = AVF)</td><td>Actif / Actif en natif (Round-Robin, Host-Dependent, Weighted)</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>5. Formules et Métriques OSPFv2 (RFC 2328)</h2>',
    '  <div class="card">',
    '    <h4>Calcul du Coût d\'Interface OSPF &amp; États d\'Adjacence</h4>',
    '    <p>La formule standard de calcul de coût pour chaque interface OSPF est :</p>',
    '    <pre><code>Coût OSPF = Bande_Passante_de_Référence / Bande_Passante_Interface</code></pre>',
    '    <p>Par défaut, la bande passante de référence Cisco est <code>100 Mbps (10^8 bps)</code>. Sur les réseaux modernes 1G/10G/40G, il est obligatoire d\'ajuster la référence : <code>auto-cost reference-bandwidth 100000</code> (100 Gbps).</p>',
    '    <p><strong>Cycle de vie d\'une adjacence OSPF :</strong> <code>Down</code> → <code>Init</code> → <code>2-Way</code> (élection DR/BDR) → <code>ExStart</code> → <code>Exchange</code> (échange de DBD) → <code>Loading</code> (LSR / LSU) → <code>Full</code> (base LSDB synchronisée).</p>',
    '  </div>',
    '',
    '  <h2>6. Sécurité de la Couche d\'Accès (Layer 2 Hardening)</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr><th>Mécanisme de Sécurité</th><th>Vecteur d\'Attaque Contré</th><th>Comportement par Défaut / Action</th></tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr><td><strong>Port Security</strong></td><td>Saturation de table CAM (MAC Flooding), usurpation d\'adresse MAC</td><td>Modes de violation : <code>protect</code> (bloque sans log), <code>restrict</code> (bloque et log), <code>shutdown</code> (désactive le port err-disable).</td></tr>',
    '      <tr><td><strong>DHCP Snooping</strong></td><td>Serveur DHCP pirate (Rogue DHCP), épuisement de pool (DHCP Starvation)</td><td>Ports <code>trusted</code> (vers serveurs/uplinks autorisés) vs <code>untrusted</code> (vers clients, inspection des messages DHCPACK/OFFER).</td></tr>',
    '      <tr><td><strong>Dynamic ARP Inspection (DAI)</strong></td><td>Usurpation ARP (ARP Poisoning / Man-In-The-Middle)</td><td>Valide les paquets ARP entrants sur ports untrusted en les comparant à la table DHCP Snooping Binding.</td></tr>',
    '      <tr><td><strong>BPDU Guard</strong></td><td>Injection illégitime de BPDUs STP sur port d\'accès utilisateur</td><td>Désactive immédiatement le port en état <code>err-disable</code> dès réception d\'une trame BPDU.</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    chnav({ href: 'cartes.html', label: 'Cartes flashcards' }, { href: 'examens.html', label: 'Passer les examens blancs' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/formules.html': {
      title: 'Mémento & Formules — ' + course.brand,
      description: 'Aide-mémoire technique officiel du cours Réseau LAN Avancé B3 : commandes CLI, STP, EtherChannel, FHRP, OSPF et sécurité niveau 2.',
      active: 'formules',
      body
    }
  };
}

module.exports = { cartes, formules };
