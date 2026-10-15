/**
 * Chapitre 3 du cours « pfSense & Routage B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 3,
  title: 'Translation d’Adresses (NAT), Redirections &amp; Routage Multi-WAN',
  short: 'NAT &amp; Routage Multi-WAN',
  toc: 'Port Forwarding (DNAT), 1:1 NAT, Outbound NAT hybride, IP virtuelles (VIPs), passerelles et Gateway Groups (Failover & Load Balancing).',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B3 et plus',
  situation: 'Dans un réseau professionnel, les adresses IPv4 publiques sont une ressource rare et coûteuse. Le pare-feu pfSense doit donc traduire les adresses privées internes (RFC 1918) pour leur permettre d’accéder à l’Internet public (SNAT) et permettre l’hébergement sécurisé de services internes via la redirection de ports (DNAT). De plus, pour garantir une haute disponibilité sans interruption de service face aux pannes des fournisseurs d’accès, l’infrastructure d’entreprise s’appuie sur le routage Multi-WAN : agrégation de liens en répartition de charge (Load Balancing) et basculement automatique instantané (Failover) orchestré par le démon de surveillance dpinger.',
  objectives: [
    'configurer les règles de redirection de ports (Port Forwarding / DNAT) et comprendre leur liaison avec les règles de filtrage WAN ;',
    'déployer le NAT 1:1 pour associer des adresses IP publiques dédiées à des serveurs critiques ;',
    'maîtriser le NAT sortant (Outbound NAT) dans ses modes Automatique et Hybride ;',
    'créer des adresses IP Virtuelles (Virtual IPs : IP Alias, CARP, Proxy ARP) sur les interfaces réseau ;',
    'configurer des passerelles multiples et les agréger au sein de Gateway Groups avec gestion des Tiers ;',
    'développer en Python 3 des simulateurs de DNAT, des moteurs de NAT sortant hybride et des ordonnanceurs Multi-WAN.'
  ],
  sections: [
    {
      title: 'Translation d’Adresses Entrante : Port Forwarding (DNAT) &amp; NAT 1:1',
      html: [
        '<p>Le <strong>Port Forwarding (DNAT - Destination NAT)</strong> permet d’exposer un serveur hébergé sur une adresse IP privée interne (LAN ou DMZ) derrière l’adresse IP publique unique de l’interface WAN du pare-feu.</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. Mécanisme du Port Forwarding</h4>',
        '    <p>Lorsqu’un paquet externe frappe l’interface WAN sur un port donné (ex: port 8080) :</p>',
        '    <ol>',
        '      <li>La table NAT réécrit l’en-tête IP : <code>dst_ip: WAN_IP &rarr; 192.168.1.50</code> et <code>dst_port: 8080 &rarr; 80</code>.</li>',
        '      <li><strong>La règle de filtrage WAN associée :</strong> La translation d’adresse ne dispense pas du filtrage ! Par défaut, pfSense crée automatiquement la règle de pare-feu correspondante sur l’interface WAN autorisant ce flux vers l’hôte interne (option <em>Filter rule association</em>).</li>',
        '      <li><strong>NAT Reflection :</strong> Mécanisme permettant à un poste du réseau local d’accéder au serveur interne en utilisant son nom de domaine ou son IP publique sans quitter le pare-feu.</li>',
        '    </ol>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Le NAT 1:1 (One-to-One)</h4>',
        '    <p>Le <strong>NAT 1:1</strong> établit une correspondance bidirectionnelle statique complète entre une adresse IP publique dédiée et une adresse IP privée interne :</p>',
        '    <ul>',
        '      <li>Tous les ports entrants non mappés spécifiquement sont acheminés vers ce serveur interne unique.</li>',
        '      <li>Tout le trafic sortant émis par ce serveur utilise systématiquement cette adresse IP publique dédiée comme IP source.</li>',
        '      <li>Idéal pour les serveurs de messagerie (SMTP), passerelles VPN tierces ou serveurs applicatifs dédiés possédant leur propre bloc public (/29 ou /28).</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'NAT Sortant (Outbound NAT) : Modes Automatique, Hybride &amp; IP Virtuelles',
      html: [
        '<p>L’<strong>Outbound NAT (SNAT - Source NAT)</strong> réécrit l’adresse IP source des paquets générés par les postes internes lorsqu’ils sortent vers Internet, remplaçant l’adresse privée par l’IP publique du WAN (Masquerading / PAT - Port Address Translation).</p>',
        '<div class="grid grid-3">',
        '  <div class="card">',
        '    <h4>Mode Automatique (Automatic)</h4>',
        '    <p>pfSense génère dynamiquement des règles de translation pour toutes les interfaces internes déclarées vers l’adresse IP principale du WAN. Simple et sans maintenance, mais totalement rigide.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Mode Hybride (Hybrid)</h4>',
        '    <p><strong>Le mode recommandé en production.</strong> Il conserve toutes les règles automatiques tout en permettant à l’administrateur d’insérer au sommet des règles manuelles prioritaires pour des cas d’usage spécifiques.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Mode Manuel Avancé (Manual)</h4>',
        '    <p>pfSense désactive la génération automatique : l’administrateur doit déclarer explicitement chaque règle de sortie. Offre un contrôle total mais exige une rigueur absolue lors de l’ajout d’interfaces.</p>',
        '  </div>',
        '</div>',
        box('standard', 'Les Types d’Adresses IP Virtuelles (Virtual IPs - VIPs)', [
          '<p>Pour utiliser des adresses IP publiques additionnelles fournies par le FAI sur une interface WAN, pfSense propose plusieurs types de VIPs :</p>',
          '<ul>',
          '  <li><strong>IP Alias :</strong> Type le plus courant pour lier une adresse IP supplémentaire au système d’exploitation. Répond aux requêtes ARP et permet à pfSense d’écouter sur cette IP.</li>',
          '  <li><strong>CARP (Common Address Redundancy Protocol) :</strong> Adresse IP partagée entre deux pare-feux en cluster haute disponibilité. Possède sa propre adresse MAC virtuelle (VHID).</li>',
          '  <li><strong>Proxy ARP :</strong> Permet au pare-feu de répondre aux requêtes ARP pour des adresses qui ne sont pas configurées directement sur les interfaces BSD.</li>',
          '  <li><strong>Other :</strong> Utilisé pour le routage de sous-réseaux publics complets routés sans annonce ARP sur le lien WAN.</li>',
          '</ul>'
        ])
      ].join('\n')
    },
    {
      title: 'Architecture Multi-WAN : Groupes de Passerelles, Tiers &amp; PBR',
      html: [
        '<p>Lorsque le pare-feu dispose de plusieurs connexions Internet (ex: WAN1 Fibre Optique et WAN2 4G/5G de secours), pfSense orchestre les flux à travers des <strong>Gateway Groups</strong> :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. Notion de Tiers dans les Gateway Groups</h4>',
        '    <p>Chaque passerelle membre du groupe se voit assigner un niveau de priorité (Tier) :</p>',
        '    <ul>',
        '      <li><strong>Load Balancing (Répartition de charge) :</strong> Les deux passerelles sont configurées sur le <strong>même Tier</strong> (ex: WAN1 = Tier 1, WAN2 = Tier 1). Les connexions sont distribuées selon le poids (Weight) de chaque liaison.</li>',
        '      <li><strong>Failover (Basculement automatique) :</strong> Les passerelles sont sur des <strong>Tiers différents</strong> (ex: WAN1 = Tier 1, WAN2 = Tier 2). Tout le trafic emprunte WAN1 ; si WAN1 tombe en panne, WAN2 prend immédiatement le relais.</li>',
        '    </ul>',
        '    <p>Le démon de surveillance <strong>dpinger</strong> envoie des sondes ICMP périodiques vers l’IP de monitoring (ex: <code>8.8.8.8</code> ou la passerelle du FAI) pour mesurer la latence RTT et le taux de perte de paquets.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Routage par Politique (Policy-Based Routing - PBR)</h4>',
        '    <p>Dans pfSense, le choix de la passerelle de sortie peut être forcé directement dans les règles de filtrage (champ <em>Gateway</em> sous les options avancées) :</p>',
        '    <p><strong>Cas concret :</strong> Forcer le trafic vidéo ou les postes invités à sortir exclusivement par le lien 4G secondaire pour préserver la bande passante de la fibre optique principale.</p>',
        '    <p><em>Règle d’or :</em> Toujours placer une règle autorisant le trafic inter-VLANs local (sans passerelle forcée) au-dessus des règles utilisant un Gateway Group pour ne pas casser la communication interne !</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],
  method: [
    'Étape 1 : Cartographier les flux exposés (DNAT) et les blocs d’adresses IP publiques additionnelles disponibles.',
    'Étape 2 : Configurer les règles de Port Forwarding en activant l’association automatique de la règle de filtrage WAN.',
    'Étape 3 : Basculer l’Outbound NAT en mode Hybride et déclarer les règles manuelles utilisant les VIPs dédiées.',
    'Étape 4 : Déclarer les passerelles WAN dans System > Routing et renseigner les IP de monitoring pour dpinger.',
    'Étape 5 : Créer le Gateway Group en assignant les Tiers selon la politique choisie (Failover vs Load Balancing).',
    'Étape 6 : Appliquer le Gateway Group via une règle de PBR en prenant soin d’exclure les sous-réseaux locaux RFC 1918.'
  ],
  summary: [
    'Le Port Forwarding (DNAT) redirige les ports externes du WAN vers les adresses IP et ports privés internes.',
    'Toute règle DNAT exige une règle de filtrage autorisant explicitement le passage des paquets sur le WAN.',
    'Le NAT 1:1 associe de manière bidirectionnelle et statique une adresse IP publique à un serveur interne unique.',
    'Le mode Hybrid Outbound NAT permet de concilier la simplicité des règles automatiques et la flexibilité de règles manuelles.',
    'Les Gateway Groups organisent la redondance Multi-WAN : mêmes Tiers pour le Load Balancing, Tiers différents pour le Failover.',
    'Le Policy-Based Routing (PBR) permet de router des flux applicatifs spécifiques sur des passerelles choisies.'
  ],
  checklist: [
    'Je sais créer une redirection de port DNAT et vérifier la règle de filtrage WAN associée.',
    'Je comprends la différence d’usage entre Port Forwarding et NAT 1:1.',
    'Je sais pourquoi le mode Hybrid Outbound NAT est recommandé en entreprise.',
    'Je sais configurer une adresse IP Virtuelle (VIP) de type IP Alias.',
    'Je maîtrise l’attribution des Tiers dans un Gateway Group pour réaliser du Failover ou du Load Balancing.',
    'Je sais pourquoi il faut exclure le trafic inter-VLANs avant d’appliquer une passerelle PBR.'
  ],
  notions: [
    'Port Forwarding (DNAT)',
    'NAT 1:1 (Bidirectionnel)',
    'NAT Reflection',
    'Outbound NAT (Modes Auto / Hybride)',
    'Virtual IPs (IP Alias, CARP, Proxy ARP)',
    'Passerelles & Démon dpinger',
    'Gateway Groups (Tiers 1 & 2)',
    'Policy-Based Routing (PBR)'
  ],
  pitfalls: [
    'Créer une règle de Port Forwarding sans autoriser le trafic dans les règles de filtrage WAN.',
    'Appliquer une passerelle PBR WAN sur une règle LAN sans exclure le trafic local RFC 1918, brisant les flux inter-VLANs.',
    'Configurer le même Tier dans un Gateway Group en croyant faire du Failover (cela fait du Load Balancing).',
    'Utiliser comme IP de monitoring dpinger une adresse qui ne répond pas aux pings ICMP, provoquant un basculement erroné.'
  ],
  questions: [
    {
      stem: 'Quel type de NAT est utilisé pour exposer un serveur Web interne (port 80) sur l’IP publique du WAN ?',
      opts: [
        'Outbound NAT (SNAT)',
        'Port Forwarding (DNAT)',
        'Carrier-Grade NAT (CGNAT)',
        'NAT Traversal'
      ],
      correct: 1,
      exp: 'Le Port Forwarding (Destination NAT) redirige les requêtes externes vers l’adresse IP privée et le port interne du serveur hébergé.'
    },
    {
      stem: 'Pourquoi une règle de filtrage WAN est-elle nécessaire lors de la création d’une redirection de port (DNAT) ?',
      opts: [
        'Pour chiffrer les données avec TLS',
        'Car le NAT réécrit uniquement les en-têtes IP ; le paquet doit obligatoirement être autorisé à franchir le pare-feu',
        'Pour empêcher le serveur DHCP d’écraser l’IP du serveur',
        'Elle n’est jamais requise dans pfSense'
      ],
      correct: 1,
      exp: 'Le NAT modifie les adresses mais n’autorise pas le passage : le moteur de filtrage exige une règle explicite autorisant le trafic vers l’hôte interne.'
    },
    {
      stem: 'Quel mode d’Outbound NAT est officiellement recommandé en environnement de production sous pfSense ?',
      opts: [
        'Désactivé (Disabled)',
        'Automatique (Automatic Outbound NAT)',
        'Hybride (Hybrid Outbound NAT rule generation)',
        'Proxy ARP obligatoire'
      ],
      correct: 2,
      exp: 'Le mode Hybride conserve la génération automatique pour les réseaux standards tout en autorisant l’ajout de règles manuelles prioritaires.'
    },
    {
      stem: 'Quel type d’adresse IP Virtuelle (VIP) est utilisé lorsqu’un bloc public doit être partagé entre deux nœuds en cluster haute disponibilité ?',
      opts: [
        'IP Alias simple',
        'CARP (Common Address Redundancy Protocol)',
        'Proxy ARP',
        'Other'
      ],
      correct: 1,
      exp: 'Les VIPs de type CARP disposent d’une adresse MAC virtuelle et synchronisent l’état actif/passif entre deux pare-feux redondants.'
    },
    {
      stem: 'Dans un Gateway Group pfSense, quelle configuration permet d’obtenir un équilibrage de charge (Load Balancing) entre deux liaisons WAN ?',
      opts: [
        'Affecter WAN1 au Tier 1 et WAN2 au Tier 2',
        'Affecter les deux passerelles au même niveau de priorité (Tier 1 et Tier 1)',
        'Désactiver la passerelle par défaut du système',
        'Créer un tunnel VPN entre les deux liens'
      ],
      correct: 1,
      exp: 'Lorsque deux ou plusieurs passerelles sont affectées au même Tier dans un Gateway Group, pfSense répartit les connexions en Round-Robin pondéré.'
    },
    {
      stem: 'Quel démon système sous pfSense est responsable de mesurer la latence et les pertes de paquets sur les passerelles WAN ?',
      opts: [
        'pingd',
        'dpinger',
        'fping',
        'netstat'
      ],
      correct: 1,
      exp: 'dpinger est le démon officiel de surveillance sous FreeBSD/pfSense qui teste périodiquement les passerelles et déclenche le basculement si les seuils sont dépassés.'
    },
    {
      stem: 'Qu’est-ce que le NAT Reflection ?',
      opts: [
        'Une attaque par réflexion DNS sur le port 53',
        'Un mécanisme permettant à un client interne d’accéder à un serveur local via son adresse IP publique externe',
        'Une sauvegarde miroir de la configuration pf.conf',
        'Un protocole de routage dynamique semblable à BGP'
      ],
      correct: 1,
      exp: 'Le NAT Reflection permet aux postes internes de joindre les serveurs locaux en utilisant le nom de domaine externe pointant vers l’IP WAN publique.'
    },
    {
      stem: 'Pourquoi doit-on exclure le trafic inter-VLANs local avant d’appliquer une règle de Policy-Based Routing (PBR) vers un Gateway Group ?',
      opts: [
        'Pour éviter la saturation de la table ARP',
        'Pour que les flux à destination d’autres sous-réseaux internes ne soient pas envoyés par erreur vers Internet',
        'Parce que le routeur FreeBSD ne supporte pas les VLANs',
        'Pour économiser des adresses DHCP'
      ],
      correct: 1,
      exp: 'Si la règle de PBR envoie tout le trafic vers la passerelle WAN par défaut, les paquets locaux destinés à une autre interface interne sortiront vers le FAI et seront perdus.'
    }
  ],
  flashcards: [
    {
      q: 'Quelle est la différence fondamentale entre DNAT et SNAT ?',
      a: 'Le DNAT (Port Forwarding) modifie l’adresse de destination (entrant) ; le SNAT (Outbound NAT) modifie l’adresse source (sortant).'
    },
    {
      q: 'À quoi sert le NAT 1:1 ?',
      a: 'À associer de manière bidirectionnelle et exclusive une adresse IP publique à une adresse IP privée interne.'
    },
    {
      q: 'Quels sont les avantages du mode Hybrid Outbound NAT ?',
      a: 'Il maintient les règles sortantes automatiques tout en permettant d’insérer des règles manuelles personnalisées prioritaires.'
    },
    {
      q: 'Comment configure-t-on un basculement de secours (Failover) dans un Gateway Group ?',
      a: 'En attribuant des Tiers différents aux passerelles (ex: WAN1 en Tier 1, WAN2 en Tier 2).'
    },
    {
      q: 'Quel démon mesure la santé des passerelles réseau dans pfSense ?',
      a: 'dpinger (mesure de la latence RTT et du pourcentage de paquets perdus).'
    },
    {
      q: 'Qu’est-ce que le Policy-Based Routing (PBR) ?',
      a: 'Le forçage de la passerelle de sortie au niveau d’une règle de filtrage spécifique plutôt que via la table de routage système.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Difficultés à configurer une redirection de port ou confusion entre les modes de NAT entrant et sortant.'
    },
    {
      cls: 'medium',
      text: 'Configuration autonome des règles DNAT/SNAT, création d’IP virtuelles et gestion d’un groupe Multi-WAN en basculement.'
    },
    {
      cls: 'high',
      text: 'Ingénierie avancée Multi-WAN avec Load Balancing pondéré, durcissement du PBR, gestion fine des déclencheurs dpinger et NAT 1:1.'
    }
  ]
};
