/**
 * Pages « examens » et « exercices » du cours « CCNA Réseau B2 ».
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
    '  <h1>Examens Blancs &amp; Épreuves Corrigées Réseau CCNA B2</h1>',
    '  <p class="lead">Deux épreuves d’évaluation complètes conformes aux standards universitaires B2 et aux compétences clés de la certification Cisco CCNA, avec corrigés intégraux et barèmes précis.</p>',
    '',
    '  <h2>Épreuve 1 : Contrôle Continu (CC) — Durée 1 h 30 (Barème sur 20 points)</h2>',
    box('standard', 'Sujet du Contrôle Continu — Modèles Réseau, Adressage VLSM &amp; Commutation L2', [
      '<h4>Partie 1 : Architecture Réseau &amp; Modèle OSI (6 points)</h4>',
      '<ol>',
      '  <li>Décrivez le cycle d’encapsulation d’une requête HTTP émise par un poste client jusqu’à son émission sur le câble Ethernet. Précisez le nom du PDU et les adresses ajoutées à chaque couche (L7, L4, L3, L2). (3 pts)</li>',
      '  <li>Quel est le rôle exact du protocole ARP ? Pourquoi utilise-t-il une diffusion (broadcast) pour la requête et une transmission unicast pour la réponse ? (3 pts)</li>',
      '</ol>',
      '<h4>Partie 2 : Ingénierie d’Adressage IPv4 &amp; VLSM (8 points)</h4>',
      '<p>Une entreprise dispose du préfixe réseau <code>192.168.10.0/24</code>. Elle doit raccorder 4 services :</p>',
      '<ul>',
      '  <li>Service Développement : 55 postes clients</li>',
      '  <li>Service Commercial : 28 postes clients</li>',
      '  <li>Serveurs internes : 12 serveurs</li>',
      '  <li>Lien d’interconnexion point-à-point avec le routeur de secours : 2 adresses IP</li>',
      '</ul>',
      '<ol>',
      '  <li>Dans quel ordre impératif devez-vous attribuer les sous-réseaux pour respecter la méthodologie VLSM et éviter toute fragmentation ? Justifiez. (2 pts)</li>',
      '  <li>Pour chaque sous-réseau, donnez le masque en notation CIDR et décimale, l’adresse réseau, la première adresse hôte utilisable, la dernière adresse hôte utilisable et l’adresse de broadcast. (6 pts)</li>',
      '</ol>',
      '<h4>Partie 3 : Commutation L2 &amp; Spanning Tree Protocol (6 points)</h4>',
      '<ol>',
      '  <li>Expliquez comment un commutateur Ethernet alimente sa table CAM (MAC Address Table) et dans quelle circonstance il procède à une inondation (flooding). (3 pts)</li>',
      '  <li>Sur un réseau maillé de 3 commutateurs configurés avec la priorité STP par défaut (32768), quel commutateur est élu Root Bridge ? Quels rôles (RP, DP, BLK) reçoivent les ports des commutateurs non-racines ? (3 pts)</li>',
      '</ol>'
    ].join('\n')),
    '',
    box('solution', 'Corrigé type &amp; Barème détaillé du Contrôle Continu', [
      '<h4>Corrigé Partie 1 (6 points)</h4>',
      '<ul>',
      '  <li><strong>Cycle d’encapsulation (3 pts) :</strong><br>',
      '    L7 (Application) : Donnée <code>GET / HTTP/1.1</code>.<br>',
      '    L4 (Transport) : Encapsulation en segment TCP avec ajout du port source éphémère (ex: 49152) et port destination (80).<br>',
      '    L3 (Réseau) : Encapsulation en paquet IP avec ajout de l’IP source client et l’IP destination serveur.<br>',
      '    L2 (Liaison) : Encapsulation en trame Ethernet avec ajout de la MAC source client, la MAC destination de la passerelle par défaut (ou du serveur si local), l’EtherType <code>0x0800</code> et le FCS.</li>',
      '  <li><strong>Protocole ARP (3 pts) :</strong> Le protocole ARP associe une adresse IPv4 logique connue à une adresse MAC physique inconnue sur le même lien local. La requête est diffusée en broadcast (MAC <code>ff:ff:ff:ff:ff:ff</code>) car l’émetteur ignore qui détient cette IP. La réponse est transmise en unicast car la cible connaît déjà la MAC de l’émetteur extraite de l’en-tête de la requête.</li>',
      '</ul>',
      '<h4>Corrigé Partie 2 (8 points)</h4>',
      '<ul>',
      '  <li><strong>Ordonnancement VLSM (2 pts) :</strong> Les sous-réseaux doivent impérativement être triés par nombre d’hôtes requis décroissant : Développement (55) &gt; Commercial (28) &gt; Serveurs (12) &gt; Lien WAN (2). Ce tri garantit que les blocs de grande taille s’alignent sur leurs frontières binaires naturelles sans fragmenter l’espace mère.</li>',
      '  <li><strong>Table d’allocation (6 pts) :</strong><br>',
      '    1. <strong>Développement (55 hôtes) :</strong> Besoin <code>2^6 - 2 = 62 &gt;= 55</code> -&gt; <code>/26</code> (255.255.255.192).<br>',
      '    Réseau : <code>192.168.10.0/26</code> | Hôtes : <code>192.168.10.1</code> à <code>192.168.10.62</code> | Broadcast : <code>192.168.10.63</code>.<br>',
      '    2. <strong>Commercial (28 hôtes) :</strong> Besoin <code>2^5 - 2 = 30 &gt;= 28</code> -&gt; <code>/27</code> (255.255.255.224).<br>',
      '    Réseau : <code>192.168.10.64/27</code> | Hôtes : <code>192.168.10.65</code> à <code>192.168.10.94</code> | Broadcast : <code>192.168.10.95</code>.<br>',
      '    3. <strong>Serveurs (12 hôtes) :</strong> Besoin <code>2^4 - 2 = 14 &gt;= 12</code> -&gt; <code>/28</code> (255.255.255.240).<br>',
      '    Réseau : <code>192.168.10.96/28</code> | Hôtes : <code>192.168.10.97</code> à <code>192.168.10.110</code> | Broadcast : <code>192.168.10.111</code>.<br>',
      '    4. <strong>Lien WAN (2 hôtes) :</strong> Besoin <code>2^2 - 2 = 2</code> -&gt; <code>/30</code> (255.255.255.252).<br>',
      '    Réseau : <code>192.168.10.112/30</code> | Hôtes : <code>192.168.10.113</code> à <code>192.168.10.114</code> | Broadcast : <code>192.168.10.115</code>.</li>',
      '</ul>',
      '<h4>Corrigé Partie 3 (6 points)</h4>',
      '<ul>',
      '  <li><strong>Table CAM &amp; Flooding (3 pts) :</strong> Le switch inspecte la MAC source de chaque trame entrante et enregistre dans sa table CAM la correspondance MAC source &lt;-&gt; Port d’arrivée (apprentissage dynamique). Il inonde la trame sur tous ses ports actifs (sauf le port d’arrivée) si la MAC destination est en broadcast (<code>ff:ff:ff:ff:ff:ff</code>) ou si elle est inconnue de sa table CAM (unicast inconnu).</li>',
      '  <li><strong>Élection STP &amp; Rôles de ports (3 pts) :</strong> En cas d’égalité des priorités (32768), le switch élu Root Bridge est celui dont l’adresse MAC de base est la plus faible. Sur chaque switch non-racine, le port offrant le plus faible coût de chemin vers la racine devient Root Port (RP). Sur chaque segment reliant deux switchs, le côté le plus proche de la racine devient Designated Port (DP) ; le port opposé est bloqué (Blocking/Alternate BLK) pour couper la boucle.</li>',
      '</ul>'
    ].join('\n')),
    '',
    '  <h2>Épreuve 2 : Examen Final (EF) — Durée 2 h 00 (Barème sur 20 points)</h2>',
    box('standard', 'Sujet de l’Examen Final — Sécurisation Cisco IOS, Routage IP &amp; VLANs ROAS', [
      '<h4>Partie 1 : Configuration &amp; Durcissement Cisco IOS (5 points)</h4>',
      '<ol>',
      '  <li>Rédigez la séquence de commandes Cisco IOS permettant de : nommer le routeur <code>R-CAMPUS</code>, chiffrer les mots de passe locaux, configurer un mot de passe privilégié robuste haché <code>AdminC1sc0!</code>, et configurer une bannière légale avertissant de l’accès strictement réservé. (2.5 pts)</li>',
      '  <li>Configurez l’accès à distance sécurisé SSH version 2 sur les 5 lignes VTY (génération de clé RSA 2048 bits, domaine <code>campus.local</code>, désactivation formelle de Telnet). (2.5 pts)</li>',
      '</ol>',
      '<h4>Partie 2 : Routage IPv4 &amp; Sélection de Routes (8 points)</h4>',
      '<p>Soit la table de routage suivante sur un routeur Cisco :</p>',
      '<pre><code>C 10.0.1.0/24 is directly connected, GigabitEthernet0/0\nS 10.0.0.0/16 [1/0] via 172.16.1.1\nO 10.0.1.128/25 [110/20] via 192.168.1.1\nS 10.0.1.128/26 [1/0] via 172.16.2.1\nS* 0.0.0.0/0 [1/0] via 198.51.100.254</code></pre>',
      '<ol>',
      '  <li>Un paquet arrive avec l’IP destination <code>10.0.1.140</code>. Quelle route est sélectionnée ? Justifiez par le mécanisme de Longest Prefix Match (LPM). Pourquoi la route statique /16 n’est-elle pas choisie malgré son AD plus faible ? (4 pts)</li>',
      '  <li>Un paquet arrive pour l’IP <code>8.8.4.4</code>. Quelle route est empruntée ? (1 pt)</li>',
      '  <li>Expliquez le principe d’une route statique flottante et donnez la commande pour configurer une route de secours vers <code>10.0.0.0/16</code> via <code>172.16.99.1</code> avec une distance administrative de 150. (3 pts)</li>',
      '</ol>',
      '<h4>Partie 3 : VLANs, Trunking 802.1Q &amp; Router-on-a-Stick (7 points)</h4>',
      '<ol>',
      '  <li>Quelle est la différence fondamentale entre un port en mode <code>access</code> et un port en mode <code>trunk</code> ? Quel est le rôle du VLAN natif sur une liaison trunk 802.1Q ? (3 pts)</li>',
      '  <li>Sur un commutateur, le port <code>Gi0/1</code> est relié au port <code>Gi0/0</code> d’un routeur. Écrivez la configuration complète sur le routeur pour assurer le routage inter-VLAN entre le VLAN 10 (réseau <code>192.168.10.0/24</code>, passerelle en .254) et le VLAN 20 (réseau <code>192.168.20.0/24</code>, passerelle en .254) via des sous-interfaces. (4 pts)</li>',
      '</ol>'
    ].join('\n')),
    '',
    box('solution', 'Corrigé type &amp; Barème détaillé de l’Examen Final', [
      '<h4>Corrigé Partie 1 (5 points)</h4>',
      '<ul>',
      '  <li><strong>Durcissement de base (2.5 pts) :</strong><br>',
      '    <code>Router(config)# hostname R-CAMPUS<br>',
      '    R-CAMPUS(config)# service password-encryption<br>',
      '    R-CAMPUS(config)# enable secret AdminC1sc0!<br>',
      '    R-CAMPUS(config)# banner motd #ACCES STRICTEMENT RESERVE AUX ADMINISTRATEURS AUTORISES#</code></li>',
      '  <li><strong>Configuration SSH v2 (2.5 pts) :</strong><br>',
      '    <code>R-CAMPUS(config)# ip domain-name campus.local<br>',
      '    R-CAMPUS(config)# crypto key generate rsa modulus 2048<br>',
      '    R-CAMPUS(config)# ip ssh version 2<br>',
      '    R-CAMPUS(config)# username admin privilege 15 secret AdminPass!<br>',
      '    R-CAMPUS(config)# line vty 0 4<br>',
      '    R-CAMPUS(config-line)# transport input ssh<br>',
      '    R-CAMPUS(config-line)# login local</code></li>',
      '</ul>',
      '<h4>Corrigé Partie 2 (8 points)</h4>',
      '<ul>',
      '  <li><strong>Sélection LPM pour 10.0.1.140 (4 pts) :</strong><br>',
      '    L’adresse <code>10.0.1.140</code> appartient à :<br>',
      '    - <code>0.0.0.0/0</code> (longueur 0)<br>',
      '    - <code>10.0.0.0/16</code> (longueur 16)<br>',
      '    - <code>10.0.1.128/25</code> (longueur 25, plage .128 à .255)<br>',
      '    - <code>10.0.1.128/26</code> (longueur 26, plage .128 à .191)<br>',
      '    La route sélectionnée est <code>10.0.1.128/26 via 172.16.2.1</code> car son masque de 26 bits est le plus long (le plus spécifique). La Distance Administrative ne sert qu’à départager des routes ayant exactement le même masque : la longueur du préfixe a toujours la priorité absolue sur l’AD.</li>',
      '  <li><strong>Routage pour 8.8.4.4 (1 pt) :</strong> L’adresse ne correspond à aucun préfixe spécifique. Elle emprunte la route par défaut <code>S* 0.0.0.0/0 via 198.51.100.254</code>.</li>',
      '  <li><strong>Route flottante (3 pts) :</strong> Une route flottante est une route statique configurée avec une distance administrative supérieure à celle de la route principale (ou d’un protocole dynamique comme OSPF avec AD 110). Elle reste inactive dans la RIB tant que la route primaire est fonctionnelle, et s’active automatiquement en cas de rupture de la route principale.<br>',
      '    Commande : <code>ip route 10.0.0.0 255.255.0.0 172.16.99.1 150</code>.</li>',
      '</ul>',
      '<h4>Corrigé Partie 3 (7 points)</h4>',
      '<ul>',
      '  <li><strong>Access vs Trunk &amp; VLAN Natif (3 pts) :</strong> Un port <em>access</em> appartient à un unique VLAN et transmet des trames non étiquetées (untagged) aux terminaux. Un port <em>trunk</em> interconnecte des commutateurs ou routeurs et transporte le trafic de multiples VLANs en insérant une balise 802.1Q (4 octets). Le VLAN natif est le seul VLAN dont les trames circulent sur le trunk sans aucune balise 802.1Q (par défaut VLAN 1, à modifier impérativement pour la sécurité).</li>',
      '  <li><strong>Configuration Router-on-a-Stick (4 pts) :</strong><br>',
      '    <code>R-CAMPUS(config)# interface GigabitEthernet0/0<br>',
      '    R-CAMPUS(config-if)# no ip address<br>',
      '    R-CAMPUS(config-if)# no shutdown<br>',
      '    R-CAMPUS(config-if)# exit<br>',
      '    R-CAMPUS(config)# interface GigabitEthernet0/0.10<br>',
      '    R-CAMPUS(config-subif)# encapsulation dot1Q 10<br>',
      '    R-CAMPUS(config-subif)# ip address 192.168.10.254 255.255.255.0<br>',
      '    R-CAMPUS(config-subif)# exit<br>',
      '    R-CAMPUS(config)# interface GigabitEthernet0/0.20<br>',
      '    R-CAMPUS(config-subif)# encapsulation dot1Q 20<br>',
      '    R-CAMPUS(config-subif)# ip address 192.168.20.254 255.255.255.0<br>',
      '    R-CAMPUS(config-subif)# exit</code></li>',
      '</ul>'
    ].join('\n')),
    '',
    chnav({ href: 'formules.html', label: 'Consulter le mémento' }, { href: '../exercices/exercices.html', label: 'Accéder aux 18 exercices' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/simulateur-examen.html': {
      title: 'Examens Blancs Corrigés — ' + course.brand,
      description: 'Sujets d’examens complets (CC et examen final) de CCNA Réseau B2 avec corrigés détaillés et barèmes.',
      active: 'examens',
      body
    }
  };
}

/* ======================== Exercices Index ======================== */

function exercices(course, chapterList) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Exercices' }
  ]);

  const sectionsHtml = chapterList.map(ch => {
    return [
      '  <section class="card" style="margin-bottom: 1.5rem;">',
      '    <div class="card__head">',
      '      <span class="badge">Module ' + ch.n + '</span>',
      '      <span class="card__num">3 exercices de code</span>',
      '    </div>',
      '    <h3 class="card__title"><a href="../chapitres/chapitre' + ch.n + '.html#exercices">' + ch.title + '</a></h3>',
      '    <p class="card__desc">' + ch.toc + '</p>',
      '    <div class="card__foot">',
      '      <a class="btn btn--primary" href="../chapitres/chapitre' + ch.n + '.html#exercices">' + ic('play') + ' Pratiquer les exercices du module ' + ch.n + '</a>',
      '    </div>',
      '  </section>'
    ].join('\n');
  }).join('\n\n');

  const body = [
    crumbs,
    '  <h1>Exercices Pratiques &amp; Ateliers de Code Réseau CCNA</h1>',
    '  <p class="lead">18 fiches d’exercices pratiques réparties sur les 6 modules fondamentaux de la formation CCNA Réseau B2. Chaque exercice dispose de tests automatisés validant vos calculs et simulations.</p>',
    '',
    sectionsHtml,
    '',
    chnav({ href: '../chapitres/simulateur-examen.html', label: 'Consulter les examens' }, { href: '../atelier.html', label: 'Bac à sable réseau' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'exercices/exercices.html': {
      title: 'Catalogue des Exercices — ' + course.brand,
      description: 'Accès aux 18 exercices pratiques de programmation et simulation réseau CCNA B2.',
      active: 'exercices',
      body
    }
  };
}

module.exports = { examens, exercices };
