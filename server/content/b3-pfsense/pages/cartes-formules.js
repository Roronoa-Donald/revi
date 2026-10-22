/**
 * Pages « cartes » (flashcards) et « formules » (mémento) du cours « pfSense & Routage B3 ».
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
    '  <h1>Cartes de Révision &amp; Mémorisation Active — pfSense &amp; Routage B3</h1>',
    '  <p class="lead">36 fiches synthétiques pour ancrer les concepts fondamentaux : Moteur Packet Filter pf, Règles First-Match Wins, Tables d\'états, NAT Hybride, Multi-WAN, VLANs 802.1Q, Tunnels IPsec/OpenVPN, Clustering CARP et Détection IDS/IPS.</p>',
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
      description: 'Flashcards de révision du cours pfSense & Routage B3 : architecture pf, règles de filtrage, NAT, VLANs, VPN et CARP des ' + chapterList.length + ' chapitres.',
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
    '  <h1>Mémento Technique &amp; Guide Opérationnel — pfSense &amp; Routage B3</h1>',
    '  <p class="lead">Guide de référence des commandes CLI FreeBSD/pfSense, syntaxes de règles pf.conf, calculs de sous-réseaux, tables de routage et paramètres de haute disponibilité.</p>',
    '',
    '  <h2>1. Commandes d\'Administration CLI FreeBSD (pfctl &amp; Réseau)</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr><th>Commande CLI</th><th>Fonction / Rôle</th><th>Exemple d\'Utilisation</th></tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr><td><code>pfctl -e / -d</code></td><td>Active ou désactive le moteur de filtrage pf du noyau.</td><td><code>pfctl -e</code></td></tr>',
    '      <tr><td><code>pfctl -f /tmp/rules.debug</code></td><td>Charge et applique un nouveau fichier de règles pf.</td><td><code>pfctl -f /etc/pf.conf</code></td></tr>',
    '      <tr><td><code>pfctl -sr</code></td><td>Affichez les règles de filtrage actives en mémoire.</td><td><code>pfctl -sr | grep pass</code></td></tr>',
    '      <tr><td><code>pfctl -ss</code></td><td>Affichez l\'ensemble de la table d\'états (state table) active.</td><td><code>pfctl -ss | grep ESTABLISHED</code></td></tr>',
    '      <tr><td><code>pfctl -t &lt;table&gt; -T show</code></td><td>Liste le contenu d\'une table pf (ex: adresses bloquées).</td><td><code>pfctl -t snort2c -T show</code></td></tr>',
    '      <tr><td><code>pfctl -k &lt;ip&gt;</code></td><td>Tue (flush) immédiatement tous les états associés à une IP.</td><td><code>pfctl -k 192.168.1.50</code></td></tr>',
    '      <tr><td><code>ifconfig -a</code></td><td>Affichez les interfaces réseau physiques et virtuelles (VLAN, CARP).</td><td><code>ifconfig em0.10</code></td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>2. Cinématique de Filtrage &amp; Ordre d\'Évaluation pfSense</h2>',
    '  <div class="card">',
    '    <h4>L\'Axiome « First-Match Wins » dans l\'Interface Web pfSense</h4>',
    '    <p>Contrairement au fichier <code>pf.conf</code> OpenBSD natif où la dernière règle correspondante l\'emporte par défaut (Last-Match Wins), l\'interface web de pfSense compile toutes les règles générées avec le mot-clé <code>quick</code>. Par conséquent, <strong>la première règle qui correspond au paquet arrête immédiatement l\'évaluation</strong> (First-Match Wins).</p>',
    '    <p>Ordre de priorité d\'évaluation du trafic entrant sur une interface :</p>',
    '    <ol>',
    '      <li><strong>Table d\'États (State Table) :</strong> Si le paquet appartient à une session déjà ouverte (flux retour ou établi), il est immédiatement autorisé sans réévaluer la liste des règles.</li>',
    '      <li><strong>Règles Flottantes (Floating Rules) avec option « Quick » cochée.</strong></li>',
    '      <li><strong>Règles de Groupe d\'Interfaces</strong> (ex: OpenVPN, IPSec).</li>',
    '      <li><strong>Règles de l\'Interface Spécifique</strong> (ex: WAN, LAN, DMZ), évaluées de haut en bas.</li>',
    '      <li><strong>Règle Implicite Default Deny :</strong> Si aucune règle ne correspond, le paquet entrant est bloqué et enregistré dans les logs.</li>',
    '    </ol>',
    '  </div>',
    '',
    '  <h2>3. Typologie des Translations d\'Adresses (NAT)</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr><th>Type de NAT</th><th>Direction du Trafic</th><th>Cas d\'Usage Industriel</th></tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr><td><strong>Port Forwarding (DNAT)</strong></td><td>Externe (WAN) vers Interne (LAN/DMZ)</td><td>Exposition d\'un serveur Web (80/443), SSH (2222) ou mail interne.</td></tr>',
    '      <tr><td><strong>1:1 NAT (Bi-directionnel)</strong></td><td>Bidirectionnel statique</td><td>Association d\'une IP publique dédiée complète à un serveur interne unique.</td></tr>',
    '      <tr><td><strong>Outbound NAT Automatique</strong></td><td>Interne vers Externe (WAN)</td><td>Masquerading classique : toutes les machines privées partagent l\'IP de l\'interface WAN.</td></tr>',
    '      <tr><td><strong>Outbound NAT Hybride</strong></td><td>Interne vers Externe (WAN)</td><td>Règles manuelles prioritaires (ex: routage d\'un sous-réseau via une IP VIP spécifique) + règles auto.</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>4. Calculs de Haute Disponibilité CARP</h2>',
    '  <div class="card">',
    '    <h4>Fréquence des Annonces et Élection du Maître</h4>',
    '    <p>L\'intervalle d\'émission des annonces de redondance CARP est calculé par la formule officielle :</p>',
    '    <pre><code>Intervalle (secondes) = advbase + (advskew / 256.0)</code></pre>',
    '    <ul>',
    '      <li><code>advbase</code> : période de base en secondes (valeur par défaut : <code>1</code>).</li>',
    '      <li><code>advskew</code> : valeur de biais prioritaire comprise entre <code>0</code> et <code>254</code>.</li>',
    '      <li><strong>Règle d\'élection :</strong> Le pare-feu opérationnel ayant l\'intervalle le plus court (le plus petit <code>advskew</code>, typiquement <code>0</code> sur le Master et <code>100</code> sur le Backup) s\'impose comme <strong>MASTER</strong>.</li>',
    '      <li><strong>Basculement (Failover) :</strong> Le Backup devient Master s\'il ne reçoit plus d\'annonce du Master pendant <code>3 * Intervalle_Master</code>.</li>',
    '    </ul>',
    '  </div>',
    '',
    '  <h2>5. Matrice des Recommandations Cryptographiques VPN (ANSSI / NIST)</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr><th>Composant</th><th>Algorithmes Interdits (Obsolètes)</th><th>Algorithmes Recommandés (Production)</th></tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr><td>Chiffrement symétrique</td><td>DES, 3DES, RC4, Blowfish (64 bits)</td><td>AES-256-GCM, AES-128-GCM, ChaCha20-Poly1305</td></tr>',
    '      <tr><td>Hachage / Intégrité</td><td>MD5, SHA-1</td><td>SHA-256, SHA-384, SHA-512</td></tr>',
    '      <tr><td>Groupes Diffie-Hellman</td><td>Groupe 1 (768b), Groupe 2 (1024b), Groupe 5 (1536b)</td><td>Groupe 14 (MODP 2048b), Groupe 19 (ECP 256), Groupe 20 (ECP 384)</td></tr>',
    '      <tr><td>Certificats X.509 PKI</td><td>MD5withRSA, SHA1withRSA, RSA &lt; 2048b</td><td>RSA 4096 bits ou ECDSA P-256 / Ed25519</td></tr>',
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
      description: 'Aide-mémoire technique officiel du cours pfSense & Routage B3 : commandes pfctl, ordre des règles, NAT, CARP et cryptographie.',
      active: 'formules',
      body
    }
  };
}

module.exports = { cartes, formules };
