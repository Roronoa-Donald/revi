/**
 * Chapitre 3 du cours « Réseau LAN Avancé B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 3,
  title: 'Protocoles de Redondance de Passerelle FHRP (HSRP, VRRP &amp; GLBP)',
  short: 'Redondance FHRP (VRRP &amp; HSRP)',
  toc: 'Point de défaillance unique (SPOF) de passerelle, HSRP v1/v2 de Cisco, standard ouvert VRRP v2/v3 (RFC 5798), adresses IP et MAC virtuelles, préemption, suivi d’objets (Object Tracking IP SLA) et équilibrage multi-actif GLBP.',
  time: '≈ 2 h 45 de travail',
  free: false,
  situation: 'Sur un réseau local d’entreprise, les postes clients, serveurs et équipements terminaux sont configurés avec une unique adresse IP de passerelle par défaut (Default Gateway) statique ou attribuée par DHCP. Si le routeur ou le commutateur de niveau 3 hébergeant cette passerelle subit une panne matérielle ou une coupure de liaison amont, l’ensemble des communications vers les autres sous-réseaux et Internet s’interrompt immédiatement : c’est le problème classique du point unique de défaillance (Single Point of Failure - SPOF). Les protocoles de redondance de premier saut (First Hop Redundancy Protocols - FHRP) permettent à plusieurs routeurs physiques de partager une adresse IP et une adresse MAC virtuelles uniques. L’ingénieur réseau de niveau Bachelor 3 doit maîtriser le protocole propriétaire Cisco HSRP, le standard universel VRRP (RFC 5798), concevoir des mécanismes de basculement transparents grâce au suivi d’objets (Object Tracking) et déployer GLBP pour distribuer activement la charge sur plusieurs passerelles.',
  objectives: [
    'comprendre la problématique du Single Point of Failure (SPOF) pour la passerelle par défaut ;',
    'analyser le principe de fonctionnement d’un routeur virtuel (VIP, VMAC, messages d’état Hello) ;',
    'comparer en détail Cisco HSRP (v1 et v2) et le standard universel VRRP (v2 et v3, RFC 5798) ;',
    'configurer et auditer les mécanismes d’élection de priorité et de préemption (preempt) ;',
    'déployer l’Object Tracking (IP SLA et interface) pour déclencher un basculement dynamique sur rupture de lien WAN ;',
    'développer en Python 3 des simulateurs d’élection VRRP, des moteurs de suivi d’objets et des répartiteurs GLBP.'
  ],
  sections: [
    {
      title: 'Problématique du Single Point of Failure (SPOF) & Modèle du Routeur Virtuel',
      html: [
        '<p>Dans une pile TCP/IP standard, un hôte terminal ne peut acheminer du trafic hors de son sous-réseau local que s’il dispose d’une passerelle par défaut. Les mécanismes de routage dynamique (comme OSPF ou BGP) ne s’exécutent pas sur les postes de travail utilisateurs pour des raisons de sécurité et de complexité. La défaillance de la passerelle isole donc totalement l’hôte.</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Le Concept de Routeur Virtuel (Virtual Router)</h4>',
        '    <p>Les protocoles FHRP regroupent deux ou plusieurs routeurs physiques au sein d’un <strong>groupe de redondance virtuel</strong> :</p>',
        '    <ul>',
        '      <li><strong>Adresse IP Virtuelle (VIP) :</strong> Adresse IP unique configurée comme passerelle par défaut sur tous les clients du LAN.</li>',
        '      <li><strong>Adresse MAC Virtuelle (VMAC) :</strong> Adresse MAC standardisée générée par le protocole et associée à la VIP lors des réponses ARP.</li>',
        '      <li><strong>Rôle Actif / Maître :</strong> Un seul routeur physique traite et achemine le trafic à un instant donné.</li>',
        '      <li><strong>Rôle Veille / Secours :</strong> Les autres routeurs surveillent la santé du maître et reprennent instantanément la VIP et la VMAC en cas de panne.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>La Transparence Totale pour les Postes Clients</h4>',
        '    <p>Lors d’un basculement, le routeur de secours émet une trame <strong>Gratuitous ARP (GARP)</strong> sur le réseau local. Les commutateurs d’accès mettent à jour leur table CAM pour rediriger les trames destinées à la VMAC vers le nouveau port physique, <em>sans que les ordinateurs clients n’aient besoin de modifier leur cache ARP ni de redémarrer</em>.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Comparatif Rigoureux : HSRP (Cisco) vs VRRP (RFC 5798)',
      html: [
        '<p>Bien que reposant sur une philosophie similaire, HSRP et VRRP présentent des différences techniques substantielles en termes d’encapsulation, d’adresses MAC et de standardisation :</p>',
        '<table class="table">',
        '  <thead>',
        '    <tr><th>Caractéristique</th><th>HSRP v1 (Cisco)</th><th>HSRP v2 (Cisco)</th><th>VRRP v2 (RFC 3768)</th><th>VRRP v3 (RFC 5798)</th></tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr><td>Statut</td><td>Propriétaire Cisco</td><td>Propriétaire Cisco</td><td>Standard IETF ouvert</td><td>Standard IETF ouvert</td></tr>',
        '    <tr><td>Support IP</td><td>IPv4 uniquement</td><td>IPv4 et IPv6</td><td>IPv4 uniquement</td><td>IPv4 et IPv6</td></tr>',
        '    <tr><td>Rôles</td><td>Active / Standby</td><td>Active / Standby</td><td>Master / Backup</td><td>Master / Backup</td></tr>',
        '    <tr><td>Format MAC Virtuelle</td><td><code>0000.0c07.acXX</code></td><td><code>0000.0c9f.fXXX</code></td><td><code>0000.5e00.01XX</code></td><td><code>0000.5e00.01XX</code> (v4) / <code>0000.5e00.02XX</code> (v6)</td></tr>',
        '    <tr><td>Transport / Multicast</td><td>UDP 1985 / <code>224.0.0.2</code></td><td>UDP 1985 / <code>224.0.0.102</code></td><td>Protocole IP 112 / <code>224.0.0.18</code></td><td>Protocole IP 112 / <code>224.0.0.18</code> / <code>FF02::12</code></td></tr>',
        '    <tr><td>Timers par Défaut</td><td>Hello : 3 s, Hold : 10 s</td><td>Hello : 3 s, Hold : 10 s</td><td>Advertisement : 1 s, Master Down : ~3.6 s</td><td>Advertisement : 1 s (ou sub-seconde)</td></tr>',
        '  </tbody>',
        '</table>',
        box('standard', 'Règle Fondamentale de la Préemption (Preemption)', [
          '<p>Par défaut dans HSRP, la préemption est <strong>désactivée</strong> : si le routeur primaire redémarre après une panne, il reste en état Standby même avec une priorité supérieure. Dans VRRP, la préemption est <strong>activée par défaut</strong>. Pour garantir qu’un équipement de cœur surdimensionné reprenne son rôle de passerelle nominale dès son rétablissement, il est impératif de configurer la directive <code>standby preempt</code> ou <code>vrrp preempt</code>.</p>'
        ])
      ].join('\n')
    },
    {
      title: 'Object Tracking & Équilibrage Actif-Actif GLBP',
      html: [
        '<p>Pour que la haute disponibilité ne soit pas tributaire de la seule panne matérielle du routeur mais tienne compte de l’état réel de la connectivité réseau globale :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. Suivi d\'Objets (Object Tracking)</h4>',
        '    <p>Un routeur peut être parfaitement allumé sur le LAN tout en ayant son interface WAN coupée (problème du « black hole »). Le suivi d’objets surveille :</p>',
        '    <ul>',
        '      <li>L’état physique et protocolaire de l’interface montante (ex: <code>track 10 interface Gi0/0 line-protocol</code>).</li>',
        '      <li>Une sonde <strong>IP SLA</strong> mesurant la connectivité réelle (ping ICMP régulier vers <code>8.8.8.8</code> ou la passerelle du FAI).</li>',
        '      <li><strong>Action :</strong> Décrémentation automatique de la priorité locale (ex: de 110 à 90) pour permettre au Backup de préempter immédiatement.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Gateway Load Balancing Protocol (GLBP)</h4>',
        '    <p>Contrairement à HSRP/VRRP où le routeur secondaire reste inactif, GLBP (Cisco) permet à tous les routeurs d’acheminer simultanément du trafic :</p>',
        '    <ul>',
        '      <li>Un <strong>AVG (Active Virtual Gateway)</strong> répond à toutes les requêtes ARP des clients.</li>',
        '      <li>Plusieurs <strong>AVF (Active Virtual Forwarders)</strong> possèdent chacun leur propre adresse MAC virtuelle.</li>',
        '      <li>L’AVG distribue les requêtes ARP selon une politique au choix : <em>Round-Robin</em> (chacun son tour), <em>Host-Dependent</em> (même AVF pour un client donné) ou <em>Weighted</em> (selon la puissance respective des routeurs).</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],
  method: [
    'Étape 1 : Définir le schéma d’adressage du groupe FHRP en choisissant l’adresse IP virtuelle (VIP) dans le sous-réseau du VLAN.',
    'Étape 2 : Configurer le routeur primaire avec une priorité élevée (ex: priority 110) et activer la préemption (preempt).',
    'Étape 3 : Configurer le routeur secondaire avec une priorité inférieure (ex: priority 100) et la même IP virtuelle.',
    'Étape 4 : Définir un objet de suivi (Object Tracking) lié à l’interface WAN montante avec une décrémentation de priorité suffisante (ex: decrement 20).',
    'Étape 5 : Réduire les minuteries Hello/Hold pour obtenir une convergence rapide en moins d’une seconde (sub-second timers).',
    'Étape 6 : Tester la simulation de panne en coupant l’interface WAN du primaire et vérifier la transition immédiate de l’état Backup à Master.'
  ],
  summary: [
    'Les protocoles FHRP éliminent le SPOF de la passerelle par défaut en créant un routeur virtuel partagé.',
    'HSRP est le protocole historique propriétaire Cisco alors que VRRP (RFC 5798) est le standard ouvert multi-constructeurs.',
    'L’adresse MAC virtuelle VRRP suit le format 00:00:5E:00:01:XX où XX est le Virtual Router ID en hexadécimal.',
    'La préemption est nécessaire pour qu’un routeur primaire reprenne son rôle de passerelle après redémarrage.',
    'L’Object Tracking décrémente la priorité locale en cas de perte de liaison WAN pour déclencher un basculement préventif.',
    'GLBP réalise un équilibrage de charge actif-actif natif en distribuant différentes adresses MAC virtuelles via l’AVG.'
  ],
  checklist: [
    'Je comprends pourquoi un poste client ne peut pas router sans passerelle par défaut fonctionnelle.',
    'Je sais calculer l’adresse MAC virtuelle exacte générée par un groupe VRRP IPv4 ou IPv6.',
    'Je maîtrise l’effet de la commande preempt lors du rétablissement d’un équipement primaire.',
    'Je sais concevoir un scénario de suivi d’objet (Object Tracking) avec sonde IP SLA pour prévenir les black holes.',
    'Je connais les différences clés entre le rôle AVG (contrôle ARP) et les rôles AVF (acheminement) dans GLBP.',
    'Je sais diagnostiquer l’état d’un groupe FHRP via les commandes CLI show standby ou show vrrp.'
  ],
  notions: [
    'Point Unique de Défaillance (SPOF)',
    'Routeur Virtuel (VIP & VMAC)',
    'Cisco HSRP (Hot Standby Router Protocol)',
    'Standard VRRP v2 / v3 (RFC 5798)',
    'Mécanisme de Préemption (Preemption)',
    'Object Tracking & Sondes IP SLA',
    'Basculement Transparent via Gratuitous ARP',
    'Cisco GLBP (Active Virtual Forwarders)'
  ],
  pitfalls: [
    'Oublier d’activer la préemption sur le routeur primaire sous HSRP, laissant le secondaire moins puissant gérer tout le trafic indéfiniment.',
    'Définir une valeur de décrémentation dans l’Object Tracking insuffisante (ex: décrémenter de 5 alors que l’écart de priorité est de 10), empêchant le basculement.',
    'Configurer deux groupes FHRP différents sur le même VLAN avec le même Virtual Router ID, créant un conflit d’adresse MAC virtuelle.',
    'Bloquer le trafic multicast (224.0.0.18 pour VRRP ou 224.0.0.102 pour HSRP v2) par une règle d’ACL sur les interfaces d’interconnexion.'
  ],
  questions: [
    {
      stem: 'Quel est le rôle fondamental d’un protocole FHRP sur un réseau local ?',
      opts: [
        'Attribuer dynamiquement des adresses IP par DHCP',
        'Fournir une passerelle par défaut redondante et hautement disponible pour les postes clients',
        'Chiffrer les trames Ethernet avec WPA3',
        'Accélérer la vitesse des ventilateurs des commutateurs'
      ],
      correct: 1,
      exp: 'Les FHRP éliminent le point unique de défaillance de la passerelle en partageant une IP virtuelle entre plusieurs routeurs physiques.'
    },
    {
      stem: 'Quelle est la norme standard internationale ouverte régissant le protocole VRRP ?',
      opts: [
        'IEEE 802.1Q',
        'RFC 5798',
        'RFC 1918',
        'IEEE 802.3ad'
      ],
      correct: 1,
      exp: 'VRRP v3 (supportant IPv4 et IPv6) est spécifié par la RFC 5798 de l’IETF (succédant à la RFC 3768 pour VRRP v2).'
    },
    {
      stem: 'Quelle est l’adresse MAC virtuelle IPv4 générée par un groupe VRRP ayant le Virtual Router ID (VRID) 10 ?',
      opts: [
        '00:00:5E:00:01:0A',
        '00:00:0C:07:AC:0A',
        'FF:FF:FF:00:01:10',
        '00:00:5E:00:02:10'
      ],
      correct: 0,
      exp: 'Le préfixe standard VRRP IPv4 est 00:00:5E:00:01:XX où XX est le VRID en hexadécimal (10 en décimal = 0A en hexadécimal).'
    },
    {
      stem: 'Dans un groupe VRRP, que se produit-il si un routeur de priorité 120 redémarre alors qu’un routeur de priorité 100 est actuellement Master ?',
      opts: [
        'Le routeur 120 reste en veille car la préemption est désactivée par défaut dans VRRP',
        'Le routeur 120 reprend immédiatement le rôle de Master car la préemption est activée par défaut dans VRRP',
        'Le routeur 120 s’éteint automatiquement',
        'Le réseau est bloqué pendant 10 minutes'
      ],
      correct: 1,
      exp: 'Contrairement à HSRP, VRRP active la préemption par défaut : le routeur ayant la priorité la plus élevée redevient Master dès qu’il est en ligne.'
    },
    {
      stem: 'Quel est l’objectif principal de l’Object Tracking associé à un protocole FHRP ?',
      opts: [
        'Compter le nombre de paquets vidéo en transit',
        'Surveiller l’état d’une interface amont ou d’une sonde IP SLA pour décrémenter la priorité en cas de coupure externe',
        'Synchroniser les mots de passe des utilisateurs',
        'Enregistrer les adresses MAC dans une base SQL'
      ],
      correct: 1,
      exp: 'L’Object Tracking surveille les liaisons externes pour abaisser dynamiquement la priorité locale et transférer le rôle Master au routeur de secours.'
    },
    {
      stem: 'Quelle trame spéciale le nouveau routeur Master émet-il sur le LAN lors d’un basculement pour actualiser les tables CAM des commutateurs ?',
      opts: [
        'Une trame BPDU RSTP',
        'Une trame Gratuitous ARP (GARP)',
        'Un paquet ICMP Redirect',
        'Une trame LLDP'
      ],
      correct: 1,
      exp: 'Le Gratuitous ARP permet à tous les commutateurs d’apprendre immédiatement que la MAC virtuelle est désormais joignable sur le nouveau port.'
    },
    {
      stem: 'Dans le protocole GLBP de Cisco, quel rôle est chargé de répondre aux requêtes ARP des clients pour répartir la charge ?',
      opts: [
        'L’Active Virtual Forwarder (AVF)',
        'L’Active Virtual Gateway (AVG)',
        'Le Root Bridge Spanning Tree',
        'Le serveur DHCP local'
      ],
      correct: 1,
      exp: 'L’AVG (Active Virtual Gateway) intercepte les requêtes ARP des clients et distribue à tour de rôle les adresses MAC virtuelles des différents AVF.'
    },
    {
      stem: 'Quel protocole de couche réseau transport et adresse multicast VRRP utilise-t-il pour ses annonces d’état en IPv4 ?',
      opts: [
        'UDP port 1985 sur 224.0.0.2',
        'Protocole IP 112 sur l’adresse multicast 224.0.0.18',
        'TCP port 80 sur 224.0.0.1',
        'ICMP sur l’adresse de diffusion 255.255.255.255'
      ],
      correct: 1,
      exp: 'VRRP encapsule ses paquets directement dans IP avec le numéro de protocole 112 et émet vers l’adresse de multicast réservée 224.0.0.18.'
    }
  ],
  flashcards: [
    {
      q: 'Qu’est-ce qu’un protocole FHRP ?',
      a: 'First Hop Redundancy Protocol : protocole assurant la redondance transparente de la passerelle par défaut d’un sous-réseau.'
    },
    {
      q: 'Quelle est la différence fondamentale entre HSRP et VRRP ?',
      a: 'HSRP est propriétaire Cisco ; VRRP est le standard ouvert universel de l’IETF (RFC 5798).'
    },
    {
      q: 'Quel est le format de l’adresse MAC virtuelle sous VRRP IPv4 ?',
      a: '00:00:5E:00:01:XX, où XX représente le Virtual Router ID (VRID) en hexadécimal.'
    },
    {
      q: 'À quoi sert l’instruction preempt dans un groupe de redondance ?',
      a: 'À permettre au routeur de priorité supérieure de reprendre automatiquement le rôle Master lorsqu’il redevient opérationnel.'
    },
    {
      q: 'Comment l’Object Tracking évite-t-il le piège du « black hole » ?',
      a: 'En surveillant la liaison WAN externe et en abaissant la priorité locale pour forcer le basculement si l’accès extérieur est coupé.'
    },
    {
      q: 'Comment GLBP réalise-t-il l’équilibrage de charge entre plusieurs passerelles ?',
      a: 'L’AVG répond aux requêtes ARP des postes en attribuant des adresses MAC virtuelles différentes associées aux différents AVFs.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Difficultés à identifier le rôle d’un routeur virtuel ou calcul erroné de l’adresse MAC virtuelle VRRP.'
    },
    {
      cls: 'medium',
      text: 'Bonne compréhension des mécanismes d’élection HSRP/VRRP, de la préemption et configuration opérationnelle d’un groupe de redondance.'
    },
    {
      cls: 'high',
      text: 'Conception avancée d’architectures haute disponibilité avec Object Tracking, sondes IP SLA et équilibrage multi-actif GLBP.'
    }
  ]
};
