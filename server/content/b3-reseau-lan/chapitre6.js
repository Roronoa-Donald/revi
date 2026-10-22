/**
 * Chapitre 6 du cours « Réseau LAN Avancé B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 6,
  title: 'Qualité de Service LAN (QoS 802.1p / DSCP) &amp; Protocoles de Découverte (LLDP/CDP)',
  short: 'QoS LAN &amp; Protocoles LLDP/CDP',
  toc: 'Gestion de la congestion, marquage de niveau 2 (802.1p CoS) et niveau 3 (DiffServ DSCP), politiques de confiance (Trust Boundary), ordonnanceurs de files (Strict Priority, WRR, CBWFQ), détection précoce WRED, et protocoles de découverte LLDP (802.1AB) et Cisco CDP.',
  time: '≈ 2 h 45 de travail',
  free: false,
  situation: 'Sur les réseaux locaux de campus modernes, les flux applicatifs hétérogènes cohabitent sur la même infrastructure physique : transferts de fichiers massifs (sauvegardes, mises à jour logicielles), navigation web et flux temps réel hypersensibles à la gigue et à la latence (Voix sur IP - VoIP, visioconférence, flux industriels). En période de congestion sur un commutateur ou un lien d’agrégation, traiter tous les paquets sur le principe du premier arrivé, premier servi (Best Effort) provoque des coupures d’appels téléphoniques et des dégradations intolérables de la visioconférence. L’ingénieur réseau de niveau Bachelor 3 doit maîtriser l’architecture de Qualité de Service (QoS) : classifier et marquer les trames dès la frontière d’accès (Trust Boundary) en 802.1p CoS et DiffServ DSCP, configurer les ordonnanceurs de sortie (Strict Priority vs Weighted Round Robin) et exploiter les protocoles de découverte de voisins (IEEE 802.1AB LLDP et Cisco CDP) pour automatiser la détection et la configuration des téléphones IP et des équipements de supervision.',
  objectives: [
    'comprendre les quatre métriques fondamentales de la QoS (Bande passante, Délai, Gigue, Perte de paquets) ;',
    'analyser la correspondance entre le champ CoS (802.1p sur 3 bits) et le champ DSCP (DiffServ sur 6 bits) ;',
    'définir la frontière de confiance (Trust Boundary) et configurer les politiques de re-marquage d’accès ;',
    'comparer les ordonnanceurs de sortie matériels : Strict Priority (SP) et Weighted Round Robin (WRR) / DWRR ;',
    'analyser les mécanismes de prévention de congestion par rejet aléatoire précoce (WRED) ;',
    'analyser et résoudre méthodologiquement des convertisseurs de marquage CoS vers DSCP, des simulateurs d’ordonnanceurs de files et des parseurs TLV LLDP.'
  ],
  sections: [
    {
      title: 'Métriques de Qualité de Service & Modèles d’Architecture',
      html: [
        '<p>La Qualité de Service (QoS) désigne l’ensemble des mécanismes permettant d’accorder un traitement différencié aux flux réseau critiques lors des épisodes de saturation de bande passante. Quatre métriques gouvernent l’expérience utilisateur :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Les 4 Métriques Fondamentales</h4>',
        '    <ul>',
        '      <li><strong>Bande Passante (Bandwidth) :</strong> Volume de données transmis par seconde.</li>',
        '      <li><strong>Délai de Transmission (Delay / Latency) :</strong> Temps mis par un paquet pour voyager de la source à la destination (maximum recommandé pour la voix : $\\le 150\\text{ ms}$).</li>',
        '      <li><strong>Gigue (Jitter) :</strong> Variation du délai entre paquets successifs d’un même flux (maximum recommandé : $\\le 30\\text{ ms}$).</li>',
        '      <li><strong>Taux de Perte de Paquets (Packet Loss) :</strong> Pourcentage de paquets détruits en cas de débordement des mémoires tampons (tolérance voix : $\\le 1\\%$).</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Modèle Differentiated Services (DiffServ)</h4>',
        '    <p>Contrairement au modèle <em>IntServ</em> qui réservait des ressources de bout en bout via RSVP (trop lourd et peu scalable), l’industrie adopte universellement le modèle <strong>DiffServ</strong> :</p>',
        '    <ul>',
        '      <li>Chaque paquet est <strong>marqué</strong> au niveau de son en-tête à l’entrée du réseau.</li>',
        '      <li>Chaque commutateur ou routeur applique un comportement de traitement par saut (<strong>Per-Hop Behavior - PHB</strong>) en fonction de la valeur de ce marquage.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Marquage de Couche 2 (802.1p CoS) & Couche 3 (DiffServ DSCP)',
      html: [
        '<p>La classification et le marquage s’opèrent à deux niveaux protocolaires distincts :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. Couche 2 : Class of Service (802.1p CoS)</h4>',
        '    <p>Le champ <strong>PCP (Priority Code Point)</strong> ou <strong>CoS</strong> est codé sur 3 bits dans l’en-tête de tag VLAN 802.1Q (valeurs de 0 à 7) :</p>',
        '    <ul>',
        '      <li><code>CoS 0</code> : Best Effort (données ordinaires).</li>',
        '      <li><code>CoS 3</code> : Données critiques d’entreprise (Call Signaling, ERP).</li>',
        '      <li><code>CoS 5</code> : Voix sur IP (VoIP Bearer / RTP).</li>',
        '      <li><code>CoS 6/7</code> : Contrôle de routage et gestion réseau (OSPF, STP).</li>',
        '      <li><em>Limite :</em> Le tag CoS disparaît dès qu’un paquet franchit un routeur ou un lien non étiqueté.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Couche 3 : DiffServ Code Point (DSCP)</h4>',
        '    <p>Le champ <strong>DSCP</strong> utilise les 6 bits de poids fort de l’octet <em>DS Field / ToS</em> de l’en-tête IPv4 (ou Traffic Class en IPv6), offrant 64 valeurs possibles :</p>',
        '    <ul>',
        '      <li><strong>Default (DF / CS0) :</strong> Best Effort (valeur décimale 0).</li>',
        '      <li><strong>Expedited Forwarding (EF) :</strong> Valeur décimale <code>46</code> (binaire <code>101110</code>), réservée strictement à la voix (VoIP RTP) pour un traitement prioritaire absolu.</li>',
        '      <li><strong>Assured Forwarding (AFxy) :</strong> 4 classes de priorité ($x$) avec 3 probabilités de rejet ($y$) en cas de saturation (ex: AF31, AF32, AF33).</li>',
        '    </ul>',
        '  </div>',
        '</div>',
        box('standard', 'Frontière de Confiance (Trust Boundary)', [
          '<p>Par défaut, un commutateur d’accès ne doit <strong>jamais faire confiance aux marquages provenant des postes utilisateurs</strong> : un utilisateur malveillant pourrait marquer ses téléchargements en EF (46) pour saturer la file voix. Le commutateur écrase le marquage à 0 (Best Effort) à l’exception des ports connectés à des téléphones IP reconnus via CDP ou LLDP-MED (<code>mls qos trust cos</code> ou <code>mls qos trust device cisco-phone</code>).</p>'
        ])
      ].join('\n')
    },
    {
      title: 'Ordonnancement de Files & Protocoles de Découverte (LLDP / CDP)',
      html: [
        '<p>Lorsque le trafic converge vers une interface de sortie dont la capacité est temporairement saturée, les paquets sont stockés dans des mémoires tampons matérielles organisées en files d’attente (queues) :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Ordonnanceurs de Sortie Matériels</h4>',
        '    <ul>',
        '      <li><strong>Strict Priority (SP) :</strong> La file prioritaire (dédiée à la voix EF) est systématiquement servie en premier avant toutes les autres files. <em>Attention :</em> un limiteur de débit (Policer) doit obligatoirement encadrer cette file pour éviter d’affamer les files de données (Starvation).</li>',
        '      <li><strong>Weighted Round Robin (WRR) / DWRR :</strong> Les files secondaires se voient attribuer des poids relatifs (ex: 50 %, 30 %, 20 %) pour garantir qu’aucune application ne soit privée de bande passante.</li>',
        '      <li><strong>WRED (Weighted Random Early Detection) :</strong> Élimine préventivement des paquets TCP aléatoires dans les files avant la saturation complète pour forcer la réduction de fenêtre d’émission et éviter la synchronisation globale TCP.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Protocoles de Découverte de Voisins (LLDP &amp; CDP)</h4>',
        '    <p>Fonctionnent au niveau 2 sans nécessiter d’adresse IP configurée :</p>',
        '    <ul>',
        '      <li><strong>Cisco Discovery Protocol (CDP) :</strong> Protocole propriétaire historique diffusé périodiquement sur l’adresse multicast <code>01:00:0c:cc:cc:cc</code>.</li>',
        '      <li><strong>LLDP (IEEE 802.1AB) :</strong> Standard universel multi-constructeurs. Les informations sont structurées en blocs <strong>TLV (Type-Length-Value)</strong> obligatoires : Chassis ID, Port ID, Time-To-Live, et TLVs optionnels (nom du système, capacités de commutation/routage, port VLAN, négociation PoE avec LLDP-MED).</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],
  method: [
    'Étape 1 : Classifier les flux réseau d’entreprise en familles applicatives (Voix, Vidéo, Données critiques, Best Effort, Scavenger).',
    'Étape 2 : Établir la matrice de mappage standardisée entre les valeurs de couche 2 (802.1p CoS) et couche 3 (DiffServ DSCP).',
    'Étape 3 : Définir la frontière de confiance (Trust Boundary) sur les commutateurs d’accès et re-marquer les flux non approuvés.',
    'Étape 4 : Allouer une file à priorité stricte (Strict Priority Queue) bornée par un mécanisme de policing pour le trafic voix (DSCP EF / 46).',
    'Étape 5 : Configurer un ordonnanceur WRR ou CBWFQ pour répartir équitablement la bande passante restante sur les files secondaires.',
    'Étape 6 : Activer LLDP globalement (lldp run) et inspecter la topologie de câblage via show lldp neighbors detail.'
  ],
  summary: [
    'La QoS garantit la qualité des flux temps réel en intervenant sur les 4 métriques : débit, latence, gigue et perte de paquets.',
    'Le modèle DiffServ classe et marque les paquets aux frontières pour appliquer un traitement par saut (PHB).',
    'Le champ CoS (802.1p) code la priorité sur 3 bits (0 à 7) dans l’en-tête 802.1Q ; DSCP utilise 6 bits dans l’en-tête IP.',
    'La frontière de confiance (Trust Boundary) interdit aux utilisateurs d’auto-marquer illégitimement leur trafic.',
    'Strict Priority sert la file prioritaire en premier mais requiert un policing pour éviter l’assèchement des autres flux.',
    'LLDP (IEEE 802.1AB) est le protocole standardisé de découverte de topologie structuré en conteneurs TLVs.'
  ],
  checklist: [
    'Je connais les seuils critiques de tolérance de la voix sur IP pour le délai (150 ms) et la gigue (30 ms).',
    'Je maîtrise le découpage de l’octet DiffServ et la valeur numérique standard de la classe voix EF (46 / 101110).',
    'Je comprends l’intérêt d’une frontière de confiance pour prévenir les abus de marquage de priorité.',
    'Je sais expliquer la différence de fonctionnement entre un ordonnanceur Strict Priority et Weighted Round Robin.',
    'Je comprends le rôle de WRED pour éviter la synchronisation globale TCP lors des congestions.',
    'Je sais décoder la structure TLV d’une trame LLDP 802.1AB (Chassis ID, Port ID, TTL).'
  ],
  notions: [
    'Métriques QoS (Latence, Gigue, Packet Loss)',
    'Architecture Differentiated Services (DiffServ)',
    'Class of Service (802.1p CoS sur 3 bits)',
    'DiffServ Code Point (DSCP sur 6 bits)',
    'Frontière de Confiance (Trust Boundary)',
    'Ordonnanceur Strict Priority & WRR / DWRR',
    'Prévention de Congestion WRED',
    'Standard de Découverte LLDP (IEEE 802.1AB) & CDP'
  ],
  pitfalls: [
    'Faire confiance par défaut au marquage QoS sur tous les ports d’accès utilisateurs, permettant aux clients de saturer la file prioritaire.',
    'Déployer Strict Priority pour la voix sans aucun mécanisme de limitation de débit (Policing), risquant d’affamer tout le reste du réseau.',
    'Oublier que le marquage CoS de niveau 2 est irrémédiablement perdu dès qu’une trame franchit un routeur de niveau 3.',
    'Laisser le protocole CDP ou LLDP actif sur les ports d’accès orientés vers des zones publiques non sécurisées, offrant une cartographie complète de l’infrastructure aux intrus.'
  ],
  questions: [
    {
      stem: 'Quel délai de transmission unidirectionnel maximal est officiellement recommandé par l’UIT-T pour la voix sur IP (VoIP) ?',
      opts: [
        '10 secondes',
        '150 millisecondes',
        '1 milliseconde',
        '800 millisecondes'
      ],
      correct: 1,
      exp: 'La recommandation UIT-T G.114 préconise un délai aller simple inférieur ou égal à 150 ms pour maintenir une conversation téléphonique fluide sans écho perceptible.'
    },
    {
      stem: 'Sur combien de bits le champ Class of Service (CoS / 802.1p) est-il encodé dans le tag VLAN 802.1Q ?',
      opts: [
        '3 bits (8 valeurs possibles de 0 à 7)',
        '6 bits (64 valeurs possibles)',
        '8 bits (256 valeurs possibles)',
        '1 bit (0 ou 1)'
      ],
      correct: 0,
      exp: 'Le champ PCP/CoS est codé sur 3 bits dans l’en-tête 802.1Q, autorisant 8 niveaux de priorité distincts (de 0 à 7).'
    },
    {
      stem: 'Quelle valeur décimale standardisée correspond à la classe DSCP « Expedited Forwarding (EF) » réservée à la VoIP ?',
      opts: [
        '0',
        '46',
        '24',
        '63'
      ],
      correct: 1,
      exp: 'Expedited Forwarding (EF) est codé en binaire 101110, ce qui correspond à la valeur décimale 46.'
    },
    {
      stem: 'Pourquoi est-il crucial de positionner la frontière de confiance (Trust Boundary) sur le commutateur d’accès ?',
      opts: [
        'Pour empêcher les ordinateurs des utilisateurs d’attribuer arbitrairement un marquage prioritaire à leur trafic ordinaire',
        'Pour accélérer la vitesse de calcul du processeur',
        'Pour chiffrer les adresses MAC des stations',
        'Pour forcer les utilisateurs à payer un abonnement Internet plus cher'
      ],
      correct: 0,
      exp: 'La frontière de confiance protège le réseau contre les marquages frauduleux ou abusifs générés par des machines clientes non autorisées.'
    },
    {
      stem: 'Quel risque majeur l’ordonnanceur Strict Priority (SP) fait-il peser sur les files de données s’il n’est pas associé à un Policer ?',
      opts: [
        'Une surchauffe des câbles cuivre',
        'La famine (Starvation) des flux ordinaires si la file prioritaire est saturée en permanence',
        'La suppression de la table de routage',
        'Le redémarrage intempestif des commutateurs'
      ],
      correct: 1,
      exp: 'Strict Priority vide intégralement la file prioritaire avant d’examiner les autres files : si elle est saturée, les autres applications ne sont jamais transmises.'
    },
    {
      stem: 'Quel est l’objectif de l’algorithme WRED (Weighted Random Early Detection) dans la gestion des files d’attente ?',
      opts: [
        'Bloquer les adresses IP russes',
        'Détruire aléatoirement des paquets TCP avant saturation complète pour forcer la réduction de débit et éviter la synchronisation globale TCP',
        'Augmenter la taille des paquets pour remplir la bande passante',
        'Transformer les paquets TCP en requêtes HTTP'
      ],
      correct: 1,
      exp: 'WRED élimine préventivement quelques paquets TCP dans la file, incitant les émetteurs TCP à réduire leur fenêtre sans effondrer toutes les sessions simultanément.'
    },
    {
      stem: 'Quel standard IEEE ouvert et multi-constructeurs définit le protocole LLDP (Link Layer Discovery Protocol) ?',
      opts: [
        'IEEE 802.1D',
        'IEEE 802.1AB',
        'IEEE 802.3ad',
        'RFC 791'
      ],
      correct: 1,
      exp: 'Le protocole LLDP est spécifié par le standard international IEEE 802.1AB.'
    },
    {
      stem: 'Dans une trame LLDP 802.1AB, comment les informations échangées (nom d’équipement, port, capacités) sont-elles encapsulées ?',
      opts: [
        'En fichiers XML zippés',
        'Sous forme de blocs TLV (Type-Length-Value)',
        'En texte brut séparé par des virgules (CSV)',
        'En requêtes SQL'
      ],
      correct: 1,
      exp: 'LLDP utilise une structure modulaire en TLVs (Type-Length-Value), permettant à chaque constructeur d’insérer des attributs standardisés ou propriétaires.'
    }
  ],
  flashcards: [
    {
      q: 'Quelles sont les 4 métriques fondamentales de la QoS ?',
      a: 'Bande passante (débit), Délai (latence), Gigue (variation du délai), et Taux de perte de paquets.'
    },
    {
      q: 'Quelle est la différence de niveau entre CoS et DSCP ?',
      a: 'CoS (802.1p) opère au niveau 2 sur 3 bits dans le tag 802.1Q ; DSCP opère au niveau 3 sur 6 bits dans l’en-tête IP.'
    },
    {
      q: 'Quelle est la valeur de la classe DSCP EF pour la voix ?',
      a: 'Valeur décimale 46 (valeur binaire 101110).'
    },
    {
      q: 'Qu’est-ce que la frontière de confiance (Trust Boundary) ?',
      a: 'Le point d’entrée réseau à partir duquel les marquages QoS sont validés ou réécrits en Best Effort pour éviter les abus.'
    },
    {
      q: 'Pourquoi coupler un Policer à un ordonnanceur Strict Priority ?',
      a: 'Pour plafonner le débit de la file prioritaire et éviter d’affamer les autres files de trafic.'
    },
    {
      q: 'Quel est le standard de LLDP et comment structure-t-il ses données ?',
      a: 'IEEE 802.1AB, sous forme de blocs TLV (Type-Length-Value).'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Difficultés à différencier le marquage CoS de niveau 2 du DSCP de niveau 3 ou méconnaissance des métriques QoS.'
    },
    {
      cls: 'medium',
      text: 'Bonne compréhension de la frontière de confiance, configuration d’ordonnanceurs SP/WRR et utilisation de LLDP pour la découverte.'
    },
    {
      cls: 'high',
      text: 'Conception complète de politiques de QoS de campus, dimensionnement fin des files d’attente avec WRED et analyse avancée des TLVs LLDP-MED.'
    }
  ]
};
