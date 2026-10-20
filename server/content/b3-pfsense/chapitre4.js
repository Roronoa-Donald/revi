/**
 * Chapitre 4 du cours « pfSense & Routage B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 4,
  title: 'Segmentation Réseau : VLANs 802.1Q &amp; DMZ Sécurisée',
  short: 'VLANs 802.1Q &amp; DMZ',
  toc: 'Trunk 802.1Q, sous-interfaces FreeBSD, matrices de flux inter-VLANs, DMZ étanche, isolation zéro confiance et parade au VLAN Hopping.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B3 et plus',
  situation: 'Un réseau plat non segmenté est une vulnérabilité critique majeure : un poste de travail compromis par un rançongiciel peut alors se propager librement à l’ensemble des serveurs internes de l’entreprise. Dans pfSense, la micro-segmentation logique par VLANs 802.1Q permet de démultiplier les domaines de diffusion sur un lien Trunk physique unique relié aux commutateurs d’accès. L’ingénieur sécurité doit maîtriser la création des sous-interfaces sous FreeBSD, formaliser une matrice de flux stricte interdisant tout rebond d’une DMZ publique vers les réseaux de confiance, et durcir l’infrastructure contre les attaques d’évasion de couche 2 telles que le Double Tagging (VLAN Hopping).',
  objectives: [
    'comprendre le mécanisme d’encapsulation de trames IEEE 802.1Q et le rôle du champ VLAN ID (VID) ;',
    'créer et assigner des sous-interfaces VLAN logiques (ex: em0.10, igb0.20) sous pfSense/FreeBSD ;',
    'concevoir une matrice de flux inter-VLANs zéro confiance régie par le principe du moindre privilège ;',
    'sécuriser de manière étanche une Zone Démilitarisée (DMZ) publique hébergeant des serveurs Web/Mail ;',
    'analyser les mécanismes d’attaque par VLAN Hopping et Double Tagging et déployer les contre-mesures ;',
    'développer en Python 3 des validateurs d’encapsulation 802.1Q, des contrôleurs de flux DMZ et des auditeurs de double marquage.'
  ],
  sections: [
    {
      title: 'Standard IEEE 802.1Q &amp; Sous-Interfaces Logiques FreeBSD',
      html: [
        '<p>Le protocole <strong>IEEE 802.1Q</strong> insère un champ d’étiquetage de 4 octets (Tag) au cœur de l’en-tête Ethernet standard (entre l’adresse MAC source et le champ EtherType) :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. Structure de l’En-tête 802.1Q (4 octets)</h4>',
        '    <ul>',
        '      <li><strong>TPID (Tag Protocol Identifier - 16 bits) :</strong> Valeur fixe <code>0x8100</code> indiquant la présence d’une trame étiquetée 802.1Q.</li>',
        '      <li><strong>PCP (Priority Code Point - 3 bits) :</strong> Niveau de priorité de qualité de service (CoS / IEEE 802.1p de 0 à 7).</li>',
        '      <li><strong>DEI (Drop Eligible Indicator - 1 bit) :</strong> Indicateur d’éligibilité à l’élimination en cas d’encombrement.</li>',
        '      <li><strong>VID (VLAN Identifier - 12 bits) :</strong> Identifiant numérique du sous-réseau logique (valeurs de 1 à 4094).</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Démultiplexage sous le Noyau FreeBSD</h4>',
        '    <p>Lorsque le lien physique (Trunk) relie le commutateur à la carte réseau de pfSense (ex: <code>igb0</code>) :</p>',
        '    <ol>',
        '      <li>Le pilote de la carte lit le VID de la trame entrante.</li>',
        '      <li>Le noyau FreeBSD achemine la charge utile vers la sous-interface virtuelle correspondante : <code>igb0.10</code> pour le VLAN 10, <code>igb0.20</code> pour le VLAN 20.</li>',
        '      <li>pfSense traite chaque sous-interface comme un port réseau totalement indépendant, avec son propre pare-feu, son serveur DHCP et sa passerelle.</li>',
        '    </ol>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Matrice de Flux Inter-VLANs &amp; Architecture de DMZ Publique',
      html: [
        '<p>La <strong>Zone Démilitarisée (DMZ)</strong> est un sous-réseau intermédiaire conçu pour héberger des services accessibles depuis l’extérieur (serveurs HTTP, mandataires inverses Nginx, relais SMTP, passerelles DNS publiques) tout en protégeant le cœur du réseau de l’entreprise (LAN).</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Règles d’Or d’une DMZ Étanche</h4>',
        '    <ul>',
        '      <li><strong>1. Accès Externe (WAN &rarr; DMZ) :</strong> Autorisé uniquement sur les ports des services applicatifs exposés (80, 443) via redirection de ports (DNAT).</li>',
        '      <li><strong>2. Accès Interne (LAN &rarr; DMZ) :</strong> Autorisé pour les équipes de développement et d’administration (SSH port 22, HTTPS).</li>',
        '      <li><strong>3. Interdiction Stricte d’Initiation (DMZ &rarr; LAN) :</strong> <em>Un serveur DMZ ne doit JAMAIS pouvoir initier une connexion vers le LAN.</em> En cas de compromission (ex: faille RCE sur le serveur Web), l’attaquant est confiné dans la DMZ et ne peut rebondir vers les postes de travail ou l’Active Directory.</li>',
        '      <li><strong>4. Réponses Autorisées (Flux Retour) :</strong> Les réponses des serveurs DMZ aux requêtes initiées par le LAN passent automatiquement grâce à la table d’états (Stateful Inspection).</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Exemple de Matrice de Sécurité</h4>',
        '    <table class="table">',
        '      <thead><tr><th>Source</th><th>Destination</th><th>Ports</th><th>Action</th></tr></thead>',
        '      <tbody>',
        '        <tr><td>WAN</td><td>DMZ (Web)</td><td>80, 443</td><td>PASS (DNAT)</td></tr>',
        '        <tr><td>LAN</td><td>DMZ</td><td>22, 443</td><td>PASS</td></tr>',
        '        <tr><td>DMZ</td><td>LAN</td><td>ALL</td><td><strong>BLOCK</strong></td></tr>',
        '        <tr><td>DMZ</td><td>WAN</td><td>53, 123</td><td>PASS (DNS/NTP)</td></tr>',
        '        <tr><td>DMZ</td><td>Base de Données</td><td>3306, 5432</td><td>PASS (Règle stricte)</td></tr>',
        '      </tbody>',
        '    </table>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Vulnérabilités de Couche 2 : Attaques VLAN Hopping &amp; Double Tagging',
      html: [
        '<p>Bien que la segmentation 802.1Q assure une isolation logique puissante, de mauvaises configurations de commutateurs permettent à des attaquants de s’affranchir des frontières du pare-feu via des attaques de <strong>VLAN Hopping</strong> :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. L’Attaque par Double Marquage (Double Tagging)</h4>',
        '    <p>Cette attaque exploite la gestion du <strong>VLAN natif</strong> (trames non étiquetées) sur les liaisons Trunk :</p>',
        '    <ol>',
        '      <li>L’attaquant émet une trame encapsulant deux étiquettes 802.1Q : un tag externe égal au <em>VLAN natif du trunk</em> (ex: VID 1) et un tag interne égal au <em>VLAN cible</em> (ex: VID 20 - DMZ ou Admin).</li>',
        '      <li>Le premier commutateur reçoit la trame, constate que le tag externe correspond à son VLAN natif, le dépouille (strip) et diffuse la trame sur le lien Trunk sans le ré-étiqueter.</li>',
        '      <li>Le second commutateur reçoit la trame qui ne possède plus que le tag interne (VID 20) : il la livre directement sur le port du VLAN cible, sans que le pare-feu n’ait pu inspecter le flux !</li>',
        '    </ol>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Contre-Mesures de Durcissement</h4>',
        '    <p>Pour éliminer définitivement le risque de Double Tagging :</p>',
        '    <ul>',
        '      <li><strong>Modifier le VLAN natif par défaut :</strong> Ne jamais laisser le VLAN 1 comme VLAN natif sur les Trunks ; assigner un VLAN factice dédié sans accès (ex: VLAN 999).</li>',
        '      <li><strong>Étiqueter le VLAN natif (Native VLAN Tagging) :</strong> Forcer le commutateur à étiqueter explicitement même les trames du VLAN natif (commande Cisco <code>vlan dot1q tag native</code>).</li>',
        '      <li><strong>Désactiver le protocole DTP (Dynamic Trunking Protocol) :</strong> Forcer tous les ports d’accès en mode statique (<code>switchport mode access</code>) pour empêcher l’usurpation de négociation trunk.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],
  method: [
    'Étape 1 : Définir le plan de VLANs (VID, nom, sous-réseau, niveau de confiance) en collaboration avec les équipes réseau.',
    'Étape 2 : Configurer le port de commutateur relié à pfSense en mode Trunk 802.1Q avec un VLAN natif isolé.',
    'Étape 3 : Créer les sous-interfaces VLAN dans Interfaces > VLANs de pfSense puis les assigner comme interfaces autonomes.',
    'Étape 4 : Définir les serveurs DHCP et les règles de base pour chaque zone VLAN.',
    'Étape 5 : Formaliser et implémenter la matrice de flux inter-VLANs (interdiction stricte DMZ vers LAN).',
    'Étape 6 : Auditer la configuration des commutateurs pour désactiver DTP et activer l’étiquetage du VLAN natif.'
  ],
  summary: [
    'La norme IEEE 802.1Q insère un en-tête de 4 octets avec un identifiant de VLAN (VID) sur 12 bits.',
    'FreeBSD associe chaque VID à une sous-interface logique dédiée (parent.VID).',
    'Chaque sous-interface VLAN est traitée par pfSense comme un domaine de sécurité et de diffusion indépendant.',
    'La règle d’or de la DMZ interdit strictement toute initiation de connexion de la DMZ vers le LAN.',
    'Les flux retour légitimes de la DMZ vers le LAN sont automatiquement gérés par la table d’états.',
    'L’attaque par Double Tagging s’appuie sur le stripping du VLAN natif et se neutralise par l’étiquetage systématique.'
  ],
  checklist: [
    'Je comprends la structure de l’en-tête 802.1Q et la plage de valeurs du champ VID (1 à 4094).',
    'Je sais créer et assigner une sous-interface VLAN sous pfSense.',
    'Je sais concevoir une matrice de flux inter-VLANs étanche.',
    'Je sais expliquer pourquoi une DMZ compromise ne peut pas rebondir vers le LAN grâce au filtrage d’état.',
    'Je comprends la cinématique d’une attaque par Double Tagging exploitant le VLAN natif.',
    'Je connais les trois contre-mesures de durcissement sur commutateur contre le VLAN Hopping.'
  ],
  notions: [
    'En-tête 802.1Q & Champ VID (12 bits)',
    'Lien Trunk & Démultiplexage FreeBSD',
    'Sous-Interfaces Logiques (parent.VID)',
    'Architecture de DMZ Publique',
    'Principe d’Interdiction d’Initiation DMZ &rarr; LAN',
    'Attaque par Double Marquage (Double Tagging)',
    'Vulnérabilité du VLAN Natif non étiqueté',
    'Durcissement de Couche 2 (DTP, Tag Native)'
  ],
  pitfalls: [
    'Oublier de bloquer explicitement le flux DMZ vers LAN et faire confiance au routage par défaut.',
    'Laisser le VLAN 1 par défaut comme VLAN natif sur les liens Trunk d’infrastructure.',
    'Conserver le protocole DTP actif sur les ports utilisateurs d’un commutateur d’accès.',
    'Créer des sous-interfaces VLAN dans pfSense sans avoir au préalable configuré le port du switch en Trunk 802.1Q.'
  ],
  questions: [
    {
      stem: 'Quelle est la taille en octets de l’en-tête d’étiquetage inséré par la norme IEEE 802.1Q dans une trame Ethernet ?',
      opts: [
        '2 octets',
        '4 octets',
        '8 octets',
        '16 octets'
      ],
      correct: 1,
      exp: 'L’en-tête 802.1Q comprend 4 octets : 2 octets pour le TPID (0x8100) et 2 octets pour le TCI (Priority, DEI et VLAN ID de 12 bits).'
    },
    {
      stem: 'Combien de VLANs distincts peuvent être théoriquement codés sur le champ VID de 12 bits de la norme 802.1Q ?',
      opts: [
        '256',
        '1024',
        '4096 (dont 4094 utilisables)',
        '65536'
      ],
      correct: 2,
      exp: 'Un champ de 12 bits permet 2^12 = 4096 valeurs (les identifiants 0 et 4095 étant réservés, 4094 VLANs sont exploitables).'
    },
    {
      stem: 'Comment une sous-interface VLAN est-elle nommée sous le noyau FreeBSD/pfSense pour la carte em0 sur le VLAN 30 ?',
      opts: [
        'vlan30@em0',
        'em0.30',
        'eth0:30',
        'trunk0-vlan30'
      ],
      correct: 1,
      exp: 'Sous FreeBSD/pfSense, la convention de nommage des sous-interfaces 802.1Q est <nom_interface_parente>.<vlan_id>, soit em0.30.'
    },
    {
      stem: 'Quelle règle de sécurité fondamentale régit l’accès entre une DMZ publique et le réseau interne (LAN) ?',
      opts: [
        'Le LAN ne peut jamais communiquer avec la DMZ',
        'La DMZ ne doit jamais pouvoir initier de nouvelle connexion vers le LAN',
        'Tout le trafic entre la DMZ et le LAN doit être non filtré pour la performance',
        'La DMZ doit partager le même serveur DHCP que le LAN'
      ],
      correct: 1,
      exp: 'Pour éviter qu’un pirate ayant compromis un serveur Web public ne pivote vers le système d’information interne, toute initiation DMZ vers LAN est bloquée.'
    },
    {
      stem: 'Comment un serveur Web situé en DMZ peut-il répondre aux requêtes HTTP formulées par un poste du réseau LAN ?',
      opts: [
        'En créant une règle autorisant tout le trafic de la DMZ vers le LAN',
        'Automatiquement grâce à la table d’états (Stateful Inspection) qui autorise les paquets retour',
        'En désactivant le pare-feu pfSense',
        'En utilisant le protocole RIP'
      ],
      correct: 1,
      exp: 'Le pare-feu à état conserve la trace de la session ouverte par le LAN et laisse passer les paquets réponses de la DMZ sans nécessiter de règle d’initiation.'
    },
    {
      stem: 'Quelle faille de configuration de commutateur est exploitée lors d’une attaque par Double Tagging (VLAN Hopping) ?',
      opts: [
        'L’absence de mot de passe administrateur',
        'Le stripping (retrait) du tag externe par le switch lorsque celui-ci correspond au VLAN natif non étiqueté du Trunk',
        'L’utilisation de câbles réseau trop longs',
        'Une saturation de la bande passante du pare-feu'
      ],
      correct: 1,
      exp: 'Le switch supprime le tag externe correspondant à son VLAN natif et envoie la trame sur le trunk avec le tag interne cible sans ré-inspection.'
    },
    {
      stem: 'Quelle est la première recommandation pour contrer l’attaque par Double Tagging sur un commutateur ?',
      opts: [
        'Remplacer tous les câbles RJ45 par de la fibre',
        'Définir un VLAN natif dédié et inutilisé (ex: VLAN 999) différent du VLAN 1 par défaut',
        'Augmenter le MTU à 9000 octets',
        'Bloquer les requêtes DNS sur le port 53'
      ],
      correct: 1,
      exp: 'Attribuer un VLAN natif fictif non affecté aux ports utilisateurs empêche les postes d’émettre des trames avec le tag externe natif requis pour l’attaque.'
    },
    {
      stem: 'Quel protocole propriétaire Cisco de négociation automatique de port Trunk doit être impérativement désactivé sur les ports utilisateurs ?',
      opts: [
        'CDP (Cisco Discovery Protocol)',
        'DTP (Dynamic Trunking Protocol)',
        'VTP (VLAN Trunking Protocol)',
        'HSRP'
      ],
      correct: 1,
      exp: 'DTP permet à un poste malveillant de négocier un lien Trunk avec le switch si le port est en mode dynamic auto/desirable, donnant accès à tous les VLANs.'
    }
  ],
  flashcards: [
    {
      q: 'Quelle est la fonction du champ VID de la norme IEEE 802.1Q ?',
      a: 'Identifier le VLAN auquel appartient la trame (12 bits, valeurs de 1 à 4094).'
    },
    {
      q: 'Comment s’appelle la liaison physique transportant plusieurs VLANs étiquetés ?',
      a: 'Un lien Trunk (ou lien agrégé 802.1Q).'
    },
    {
      q: 'Pourquoi la DMZ ne doit-elle pas pouvoir initier de flux vers le LAN ?',
      a: 'Pour empêcher un attaquant ayant compromis un serveur public exposé de pivoter vers le réseau interne de l’entreprise.'
    },
    {
      q: 'Qu’est-ce que le VLAN natif sur un port Trunk ?',
      a: 'Le VLAN transportant les trames non étiquetées (Untagged) sur la liaison Trunk.'
    },
    {
      q: 'Comment fonctionne l’attaque par Double Tagging ?',
      a: 'L’attaquant émet une trame avec deux tags : le tag externe (VLAN natif) est retiré par le premier switch, exposant le tag interne vers le VLAN cible.'
    },
    {
      q: 'Quelle contre-mesure élimine le risque d’attaque par Double Tagging ?',
      a: 'Configurer un VLAN natif dédié inutilisé (différent du VLAN 1) et forcer l’étiquetage du VLAN natif.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Difficultés à configurer les sous-interfaces 802.1Q ou mauvaise compréhension des flux autorisés dans une DMZ.'
    },
    {
      cls: 'medium',
      text: 'Segmentation correcte des réseaux d’entreprise, écriture rigoureuse de la matrice de flux DMZ et isolation inter-VLANs.'
    },
    {
      cls: 'high',
      text: 'Architecture de segmentation zéro confiance, durcissement de couche 2 contre le VLAN Hopping et conception de zones DMZ multi-niveaux.'
    }
  ]
};
