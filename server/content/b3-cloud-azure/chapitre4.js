/**
 * Chapitre 4 du cours « Cloud Microsoft Azure B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 4,
  title: 'Réseau Virtuel Azure (Azure Virtual Network - VNet &amp; Sécurité)',
  short: 'Réseau Virtuel VNet &amp; Sécurité',
  toc: 'Architecture réseau logiciel (SDN) sous Azure : Virtual Networks (VNet), découpage CIDR en sous-réseaux (Subnets), les 5 adresses IP réservées par Azure dans chaque subnet, groupes de sécurité réseau (NSG), priorité de filtrage des flux et règles par défaut, accès distant sécurisé sans IP publique avec Azure Bastion, interconnexion privée par VNet Peering, topologie d’entreprise Hub-and-Spoke et passerelles VPN / ExpressRoute.',
  time: '≈ 2 h 45 de travail',
  free: false,
  situation: 'Dans une entreprise déployant ses services applicatifs et ses bases de données sur Azure, exposer directement les machines virtuelles à Internet via des adresses IP publiques constitue un risque de sécurité critique. En tant qu\'ingénieur réseau Cloud B3, vous devez concevoir un plan d\'adressage IP rigoureux en tenant compte des 5 adresses réservées par Azure dans chaque sous-réseau, isoler les flux entrants et sortants grâce aux Network Security Groups (NSG), mettre en place une topologie sécurisée en étoile (Hub-and-Spoke) avec VNet Peering sans chevauchement CIDR, et sécuriser l\'administration RDP/SSH grâce à Azure Bastion.',
  objectives: [
    'concevoir et découper un réseau virtuel Azure (VNet) en sous-réseaux logiques étanches ;',
    'maîtriser le rôle précis des 5 adresses IP réservées par Azure dans chaque sous-réseau et calculer les plages utilisables ;',
    'configurer des Network Security Groups (NSG) et évaluer l\'ordre de priorité des règles personnalisées et règles par défaut ;',
    'sécuriser l\'administration des serveurs Linux/Windows sans adresse IP publique avec Azure Bastion ;',
    'interconnecter des réseaux virtuels via VNet Peering (local et global) et valider la non-collision des plages CIDR ;',
    'analyser et résoudre méthodologiquement des calculateurs de sous-réseaux Azure, des moteurs d\'évaluation de règles NSG et des validateurs de peering.'
  ],
  sections: [
    {
      title: 'Fondations SDN : Réseaux Virtuels Azure VNet et Adressage Réservé',
      html: [
        '<p>Un Azure Virtual Network (VNet) est une représentation logique et isolée de votre réseau privé dans le Cloud. Il permet aux machines virtuelles, conteneurs et bases de données de communiquer de manière sécurisée entre elles et avec l\'extérieur :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Structure d\'un VNet &amp; Sous-réseaux</h4>',
        '    <ul>',
        '      <li><strong>Espace d\'adressage CIDR :</strong> défini au niveau du VNet (ex: <code>10.0.0.0/16</code> pour 65 536 adresses) selon les plages privées RFC 1918.</li>',
        '      <li><strong>Segmentation en sous-réseaux :</strong> division logique par niveau applicatif (ex: <code>snet-web</code> en <code>10.0.1.0/24</code>, <code>snet-db</code> en <code>10.0.2.0/24</code>).</li>',
        '      <li><strong>Sous-réseaux dédiés Azure :</strong> certains services exigent des noms de sous-réseaux réservés stricts (ex: <code>GatewaySubnet</code> pour les passerelles VPN, <code>AzureBastionSubnet</code> pour Bastion, <code>AzureFirewallSubnet</code> pour le pare-feu).</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Les 5 Adresses IP Réservées par Azure</h4>',
        '    <ul>',
        '      <li><code>.0</code> : <strong>Network ID</strong> (adresse réseau).</li>',
        '      <li><code>.1</code> : <strong>Default Gateway</strong> (passerelle par défaut interne au VNet gérée par Azure).</li>',
        '      <li><code>.2</code> : <strong>DNS Resolver Primaire</strong> (résolveur DNS Azure routé en interne).</li>',
        '      <li><code>.3</code> : <strong>DNS Resolver Secondaire</strong> (redondance et allocation interne Azure).</li>',
        '      <li><code>.&lt;dernière&gt;</code> (ex: <code>.255</code>) : <strong>Broadcast</strong> (adresse de diffusion non utilisée mais réservée).</li>',
        '      <li><em>Conséquence :</em> un sous-réseau en <code>/24</code> (256 adresses théoriques) n\'offre que <strong>251 adresses IP exploitables</strong> pour les VMs (de .4 à .254).</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Sécurité Périmétrique : Network Security Groups (NSG) &amp; Azure Bastion',
      html: [
        '<p>Le contrôle des flux réseau à l\'intérieur du VNet s\'opère au niveau de chaque sous-réseau ou interface réseau (NIC) par les Network Security Groups :</p>',
        '<table class="table">',
        '  <thead><tr><th>Propriété de la Règle NSG</th><th>Valeurs Possibles</th><th>Rôle et Fonction</th></tr></thead>',
        '  <tbody>',
        '    <tr><td><strong>Priority (Priorité)</strong></td><td>Nombre entier de 100 à 4096</td><td>Détermine l\'ordre d\'évaluation. Le nombre le plus faible est évalué en premier. Dès qu\'une règle correspond au paquet, son action s\'applique immédiatement.</td></tr>',
        '    <tr><td><strong>Source / Destination</strong></td><td>IP, CIDR, Tag de service (Internet, VirtualNetwork)</td><td>Délimite l\'origine ou la cible du paquet. Le wildcard <code>*</code> correspond à toute source.</td></tr>',
        '    <tr><td><strong>Port &amp; Protocole</strong></td><td>Numéro de port (ex: 443, 22), TCP, UDP, ANY</td><td>Spécifie le port de destination et le protocole de couche 4.</td></tr>',
        '    <tr><td><strong>Action</strong></td><td>Allow ou Deny</td><td>Autorise ou rejette le paquet réseau.</td></tr>',
        '  </tbody>',
        '</table>',
        box('standard', 'Administration Sécurisée avec Azure Bastion', [
          '<p>Traditionnellement, l\'administration de serveurs distants s\'effectuait en attribuant une adresse IP publique à la VM et en ouvrant les ports RDP (3389) ou SSH (22) sur Internet, exposant les machines à des attaques de force brute massives. ' +
          '<strong>Azure Bastion</strong> résout ce risque :</p>',
          '<ul>',
          '  <li>Service PaaS managé déployé dans son sous-réseau dédié <code>AzureBastionSubnet</code>.</li>',
          '  <li>Permet aux administrateurs de se connecter en RDP/SSH directement depuis le portail Azure dans leur navigateur web via TLS/HTTPS sécurisé (port 443).</li>',
          '  <li>Les machines virtuelles cibles n\'ont besoin <strong>d\'aucune adresse IP publique</strong> et leurs ports 22/3389 restent totalement fermés à Internet.</li>',
          '</ul>'
        ])
      ].join('\n')
    },
    {
      title: 'Interconnexion Réseau d\'Entreprise : VNet Peering &amp; Topologie Hub-and-Spoke',
      html: [
        '<p>Pour interconnecter plusieurs réseaux virtuels au sein d\'une même région (VNet Peering local) ou entre régions différentes (Global VNet Peering) :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Principes du VNet Peering</h4>',
        '    <ul>',
        '      <li><strong>Performances natives :</strong> le trafic transite directement par le backbone privé de Microsoft sans traverser l\'Internet public, offrant la même latence qu\'au sein d\'un même réseau.</li>',
        '      <li><strong>Règle de non-chevauchement :</strong> deux VNets en peering ne peuvent posséder aucune plage d\'adresses IP qui se chevauche (Overlapping CIDRs strictement interdit).</li>',
        '      <li><strong>Non-transitif par défaut :</strong> si le VNet A est appairé au VNet B, et le VNet B au VNet C, le VNet A ne peut pas communiquer avec le VNet C sans passer par une passerelle ou un routeur intermédiaire.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Architecture Hub-and-Spoke</h4>',
        '    <ul>',
        '      <li><strong>VNet Hub (Central) :</strong> héberge les services partagés (Azure Firewall, passerelle VPN/ExpressRoute connectée au datacenter on-premise, DNS centralisé).</li>',
        '      <li><strong>VNets Spokes (Périphériques) :</strong> hébergent les environnements applicatifs (Spoke-Prod, Spoke-Dev) appairés exclusivement au Hub.</li>',
        '      <li><strong>Transit de passerelle :</strong> les Spokes activent <code>Use Remote Gateways</code> pour utiliser la passerelle VPN du Hub (qui active <code>Allow Gateway Transit</code>) sans dupliquer les coûts de passerelle.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],
  method: [
    'Élaboration du plan d\'adressage IP sans chevauchement : définir des plages CIDR RFC 1918 distinctes pour chaque VNet et dimensionner les sous-réseaux en retranchant les 5 adresses réservées par Azure.',
    'Déploiement des sous-réseaux système obligatoires : allouer GatewaySubnet (/27 minimum) pour les passerelles VPN et AzureBastionSubnet (/26 minimum) pour l\'administration sans IP publique.',
    'Configuration de la politique de filtrage NSG par couches : appliquer des règles NSG restrictives par défaut et n\'ouvrir que les ports strictement nécessaires avec des priorités basses (100-300).',
    'Établissement des peerings bidirectionnels avec transit de passerelle : créer les liaisons de peering entre le Hub et les Spokes en autorisant le transit de passerelle pour mutualiser l\'accès au réseau d\'entreprise.'
  ],
  summary: [
    'Un Azure VNet isole un réseau virtuel privé ; Azure réserve systématiquement 5 adresses IP (.0, .1, .2, .3, .255) dans chaque sous-réseau.',
    'Les sous-réseaux en /24 offrent exactement 251 adresses IP exploitables pour les machines virtuelles.',
    'Les Network Security Groups (NSG) filtrent le trafic selon la priorité des règles (100 à 4096), avec les règles par défaut 65000 (Allow VNet) et 65500 (Deny All).',
    'Azure Bastion fournit un accès d\'administration RDP/SSH sécurisé par navigateur web sans nécessiter d\'adresse IP publique sur les serveurs.',
    'Le VNet Peering interconnecte des réseaux virtuels privés via le backbone Microsoft sans transiter par Internet, sous condition de non-chevauchement des plages CIDR.'
  ],
  checklist: [
    'Savez-vous énumérer les 5 adresses IP réservées par Azure dans n\'importe quel sous-réseau ?',
    'Combien d\'adresses exploitables compte un sous-réseau /26 (64 adresses) sous Azure ?',
    'Comprenez-vous pourquoi une règle NSG de priorité 100 prévaut sur une règle de priorité 500 ?',
    'Savez-vous pourquoi Azure Bastion élimine le risque d\'attaques par force brute sur le port 22 ou 3389 ?',
    'Pouvez-vous expliquer pourquoi deux réseaux ayant le même CIDR (ex: 10.0.0.0/16) ne peuvent pas être appairés en VNet Peering ?'
  ],
  notions: [
    { term: 'Azure Virtual Network (VNet)', def: 'Réseau virtuel privé isolé sous Azure permettant la communication sécurisée entre ressources Cloud et sur site.' },
    { term: 'Adresses IP réservées Azure', def: 'Les 5 adresses IP (.0 réseau, .1 passerelle, .2 DNS primaire, .3 DNS secondaire, .dernière broadcast) confisquées par le SDN Azure dans chaque subnet.' },
    { term: 'Network Security Group (NSG)', def: 'Pare-feu de niveau 4 filtrant les paquets réseau par liste de contrôle d\'accès (ACL) ordonnée par priorité.' },
    { term: 'Azure Bastion', def: 'Passerelle PaaS managée permettant d\'administrer des machines virtuelles en RDP/SSH via le portail web (HTTPS) sans IP publique.' },
    { term: 'VNet Peering', def: 'Interconnexion directe à haute vitesse et faible latence entre deux réseaux virtuels via le réseau fédérateur privé de Microsoft.' }
  ],
  pitfalls: [
    'Oublier les 5 adresses IP réservées lors du dimensionnement d\'un petit sous-réseau en /29 (8 adresses théoriques mais seulement 3 adresses utilisables !).',
    'Attribuer des priorités trop proches (ex: 100, 101, 102) dans les règles NSG, empêchant l\'insertion future de nouvelles règles intermédiaires (préférer 100, 200, 300).',
    'Tenter d\'apparier en VNet Peering deux réseaux virtuels partageant un même espace d\'adressage CIDR : ARM rejette immédiatement la création.',
    'Croire que le peering est transitif par défaut : si A est appairé à B et B à C, A ne peut pas communiquer avec C sans passer par une passerelle de routage (NVA/Firewall).'
  ],
  questions: [
    {
      stem: 'Combien d\'adresses IP utilisables pour des machines virtuelles sont disponibles dans un sous-réseau Azure de masque /24 (256 adresses théoriques) ?',
      opts: ['256', '254', '251', '250'],
      correct: 2,
      exp: 'Azure réserve systématiquement 5 adresses IP dans chaque sous-réseau (.0, .1, .2, .3 et .255 en /24), ce qui laisse 256 - 5 = 251 adresses IP exploitables.'
    },
    {
      stem: 'À quoi sert l\'adresse IP finissant par .1 dans chaque sous-réseau Azure ?',
      opts: [
        'Adresse de diffusion (Broadcast)',
        'Passerelle par défaut (Default Gateway) gérée par Azure',
        'Résolveur DNS primaire',
        'Première machine virtuelle créée'
      ],
      correct: 1,
      exp: 'L\'adresse .1 est réservée par Azure pour faire office de Default Gateway (passerelle de routage par défaut) pour toutes les ressources du sous-réseau.'
    },
    {
      stem: 'Comment s\'effectue l\'évaluation de deux règles contradictoires au sein d\'un même Network Security Group (NSG) ?',
      opts: [
        'La règle Deny l\'emporte toujours sur la règle Allow',
        'La règle ayant le numéro de priorité le plus faible est évaluée en premier et s\'applique immédiatement',
        'La règle la plus récemment modifiée s\'applique',
        'Les deux règles fusionnent'
      ],
      correct: 1,
      exp: 'Les règles NSG sont traitées par ordre strictement croissant de priorité (100 à 4096). La première règle qui correspond aux critères du paquet s\'applique et arrête le processus d\'évaluation.'
    },
    {
      stem: 'Quelle est la priorité de la règle par défaut Inbound d\'un NSG qui bloque tout le trafic entrant non explicitement autorisé (DenyAllInBound) ?',
      opts: ['100', '1000', '65000', '65500'],
      correct: 3,
      exp: 'La règle par défaut DenyAllInBound possède la priorité 65500, garantissant qu\'elle s\'applique en toute fin de chaîne si aucune règle personnalisée précédente n\'a matché.'
    },
    {
      stem: 'Pourquoi Azure Bastion est-il considéré comme une pratique d\'excellence pour l\'administration de machines virtuelles ?',
      opts: [
        'Il augmente la mémoire RAM des serveurs de 50%',
        'Il permet la connexion RDP et SSH depuis un navigateur web via HTTPS sans attribuer d\'adresse IP publique à la VM',
        'Il supprime le besoin de mots de passe administrateur',
        'Il remplace le système d\'exploitation par Linux'
      ],
      correct: 1,
      exp: 'Azure Bastion établit une session RDP/SSH sécurisée au travers d\'une connexion web chiffrée (port 443), éliminant l\'exposition des ports 22 et 3389 sur Internet et évitant d\'assigner des IPs publiques aux serveurs.'
    },
    {
      stem: 'Quelle condition technique stricte est obligatoire pour pouvoir établir un VNet Peering entre deux réseaux virtuels Azure ?',
      opts: [
        'Les deux VNets doivent être situés dans le même pays',
        'Les espaces d\'adressage IP (CIDR) des deux VNets ne doivent comporter aucun chevauchement',
        'Les deux VNets doivent être gérés par le même abonnement',
        'Les machines doivent utiliser le même système d\'exploitation'
      ],
      correct: 1,
      exp: 'Le peering entre deux réseaux virtuels est strictement impossible si leurs plages d\'adresses IP (espaces d\'adressage CIDR) se chevauchent, afin d\'éviter toute collision de routage.'
    },
    {
      stem: 'Dans une architecture Hub-and-Spoke, quel paramètre de peering le VNet Spoke doit-il activer pour acheminer son trafic vers le réseau d\'entreprise via la passerelle du Hub ?',
      opts: ['Allow Gateway Transit', 'Use Remote Gateways', 'Enable Direct Route', 'Bypass Gateway'],
      correct: 1,
      exp: 'Le VNet Spoke active Use Remote Gateways pour transférer ses paquets via la passerelle VPN/ExpressRoute du Hub (sur lequel est activé Allow Gateway Transit).'
    },
    {
      stem: 'Quelle est la portée géographique du service Global VNet Peering sous Azure ?',
      opts: [
        'Uniquement entre deux datacenters de la même ville',
        'Entrez n\'importe quelles régions Azure à travers le monde entier via le réseau fédérateur privé de Microsoft',
        'Uniquement au sein de l\'Union Européenne',
        'Uniquement entre régions jumelées'
      ],
      correct: 1,
      exp: 'Global VNet Peering permet d\'interconnecter des VNets situés dans des régions Azure différentes (ex: France Central et East US) avec un chiffrement matériel natif sur le réseau privé Microsoft.'
    }
  ],
  flashcards: [
    {
      q: 'Quelles sont les 5 adresses IP réservées par Azure dans chaque sous-réseau ?',
      a: '.0 (Réseau), .1 (Passerelle par défaut), .2 (DNS primaire Azure), .3 (DNS secondaire Azure) et .dernière (Broadcast).'
    },
    {
      q: 'Combien d\'adresses utilisables offre un sous-réseau Azure /28 (16 adresses) ?',
      a: '16 - 5 = 11 adresses IP exploitables pour les machines virtuelles (de .4 à .14).'
    },
    {
      q: 'Dans quel ordre sont traitées les règles d\'un Network Security Group (NSG) ?',
      a: 'Par ordre croissant de priorité (de 100 à 4096). La première règle qui matche le paquet est appliquée immédiatement.'
    },
    {
      q: 'Quel risque critique Azure Bastion élimine-t-il sur les serveurs d\'entreprise ?',
      a: 'L\'exposition des ports RDP (3389) et SSH (22) sur Internet et les attaques par force brute associées, en encapsulant l\'administration dans du flux HTTPS (443).'
    },
    {
      q: 'Pourquoi deux réseaux virtuels ayant des plages IP qui se chevauchent ne peuvent-ils pas être appairés ?',
      a: 'Parce que les routeurs logiciels SDN d\'Azure ne pourraient pas déterminer vers quel réseau acheminer les paquets sans ambiguïté.'
    },
    {
      q: 'Comment fonctionne le transit de passerelle dans une topologie Hub-and-Spoke ?',
      a: 'Le Hub active "Allow Gateway Transit" et chaque Spoke active "Use Remote Gateways", permettant aux Spokes d\'utiliser la passerelle VPN centrale sans duplication.'
    }
  ],
  mastery: [
    {
      title: 'Conception de plan d\'adressage d\'entreprise multi-VNets',
      desc: 'Découper des espaces d\'adressage 10.x.0.0/16 en sous-réseaux étanches (Front, Métier, Data, DMZ) en intégrant les contraintes des 5 adresses réservées.'
    },
    {
      title: 'Matrice de sécurité NSG et Application Security Groups (ASG)',
      desc: 'Structurer des règles de pare-feu applicatif par étiquettes ASG pour sécuriser les flux inter-tiers sans multiplier les règles d\'IP manuelles.'
    },
    {
      title: 'Architecture Hub-and-Spoke sécurisée avec Azure Firewall',
      desc: 'Déployer un Hub centralisé avec Azure Firewall, tables de routage UDR (0.0.0.0/0 vers le pare-feu) et peerings avec transit de passerelle.'
    },
    {
      title: 'Déploiement zéro-exposition avec Azure Bastion et Private Endpoints',
      desc: 'Bannir totalement les adresses IP publiques et interconnecter les services PaaS (Azure SQL, Storage) via des points de terminaison privés dans le VNet.'
    },
    {
      title: 'Automatisation d\'évaluation réseau de manière méthodique',
      desc: 'Programmer des calculateurs de sous-réseaux CIDR, des simulateurs d\'évaluation de paquets par NSG et des vérificateurs de topologie peering.'
    }
  ]
};
