/**
 * Chapitre 4 du cours « Réseau LAN Avancé B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 4,
  title: 'Routage Intra-Domaine OSPFv2 Avancé, Aires Spéciales &amp; Analyse des LSAs',
  short: 'OSPFv2 &amp; Aires Spéciales',
  toc: 'Protocole à état de liens OSPFv2 (RFC 2328), calcul du plus court chemin par l’algorithme SPF de Dijkstra, bande passante de référence, typologie d’aires (Backbone, Stub, Totally Stubby, NSSA), et analyse détaillée des paquets LSA 1 à 7.',
  time: '≈ 2 h 45 de travail',
  free: false,
  situation: 'Lorsque l’infrastructure locale s’étend sur plusieurs bâtiments, étages ou datacenters, le routage statique et le simple routage inter-VLANs atteignent leurs limites opérationnelles. L’interconnexion des commutateurs de cœur et de distribution de niveau 3 requiert un protocole de routage dynamique à état de liens hautement scalable, convergent et standardisé : OSPFv2 (Open Shortest Path First, RFC 2328). Contrairement aux protocoles à vecteur de distance, chaque routeur OSPF dispose d’une vision complète et cartographiée de la topologie locale via sa base de données d’état de liens (LSDB) et calcule le chemin optimal via l’algorithme de Dijkstra. L’ingénieur réseau de niveau Bachelor 3 doit maîtriser le calcul des coûts métriques, structurer le réseau en aires hiérarchiques, optimiser la charge mémoire par des aires spéciales (Stub, Totally Stubby, NSSA) et disséquer les en-têtes des annonces LSA pour auditer le plan de contrôle de routage.',
  objectives: [
    'comprendre le fonctionnement d’un protocole à état de liens et le rôle de la base LSDB ;',
    'calculer les coûts métriques d’interfaces et comprendre l’ajustement de la bande passante de référence ;',
    'analyser le cycle de vie d’une adjacence OSPF et les rôles de Designated Router (DR) et BDR ;',
    'structurer une architecture hiérarchique multi-aires autour de l’Aire 0 (Backbone Area) ;',
    'différencier précisément les caractéristiques des aires Stub, Totally Stubby et NSSA ;',
    'analyser et résoudre méthodologiquement des calculateurs d’arbres SPF, des parseurs d’en-têtes LSA et des simulateurs de filtrage d’aires.'
  ],
  sections: [
    {
      title: 'Principes du Routage à État de Liens & Algorithme SPF de Dijkstra',
      html: [
        '<p>Dans OSPF, chaque équipement de niveau 3 ne se contente pas de relayer des tables de routage de proche en proche (comme RIP). Il sonde ses interfaces, découvre ses voisins par des paquets <em>Hello</em>, et diffuse des annonces d’état de liens <strong>LSA (Link-State Advertisements)</strong> inondées de manière fiable à l’ensemble du domaine.</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>La Base de Données LSDB &amp; L’Arbre SPF</h4>',
        '    <ul>',
        '      <li><strong>Base de Données d’État de Liens (LSDB) :</strong> Tous les routeurs d’une même aire possèdent une copie strictement identique de la LSDB, représentant le plan cartographique complet de l’infrastructure.</li>',
        '      <li><strong>Algorithme de Dijkstra (Shortest Path First - SPF) :</strong> Chaque routeur s’érige en racine de son propre arbre de calcul et détermine le chemin de coût cumulé le plus faible vers chaque sous-réseau de destination.</li>',
        '      <li><strong>Table de Routage Finale :</strong> Seuls les meilleurs chemins calculés sont injectés dans la table de routage IP (RIB).</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Calcul du Coût OSPF &amp; Bande Passante de Référence</h4>',
        '    <p>La métrique standard OSPF est un coût sans unité inversement proportionnel au débit :</p>',
        '    <pre><code>Coût = Bande_Passante_Reference / Bande_Passante_Interface</code></pre>',
        '    <p>La référence historique Cisco de <code>100 Mbps (10^8 bps)</code> affecte un coût de 1 aussi bien à une interface 100 Mbps qu’à une interface 1 Gbps ou 10 Gbps. Il est obligatoire de configurer <code>auto-cost reference-bandwidth 100000</code> pour distinguer 100M (coût 1000), 1G (coût 100) et 10G (coût 10).</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Adjacences OSPF, Élection DR/BDR & Typologie des LSAs',
      html: [
        '<p>Sur les réseaux locaux multi-accès (Ethernet broadcast), établir une adjacence pleine entre chaque paire de routeurs engendrerait $\\frac{N(N-1)}{2}$ sessions, saturant le réseau en paquets de synchronisation. OSPF élit deux routeurs clés :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Rôles DR (Designated Router) &amp; BDR (Backup DR)</h4>',
        '    <ul>',
        '      <li><strong>Designated Router (DR) :</strong> Point central de convergence : tous les autres routeurs (DROTHER) établissent une adjacence FULL uniquement avec le DR et le BDR, et communiquent via l’adresse multicast <code>224.0.0.6</code>.</li>',
        '      <li><strong>Backup Designated Router (BDR) :</strong> Écoute les échanges et prend instantanément le relais si le DR ne répond plus.</li>',
        '      <li><strong>Critères d’élection :</strong> 1. Priorité d’interface la plus haute (de 0 à 255, 0 = inéligible) ; 2. Router ID (RID) le plus élevé.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Matrice des Types de LSAs Principaux</h4>',
        '    <ul>',
        '      <li><strong>Type 1 (Router LSA) :</strong> Émis par chaque routeur pour décrire ses interfaces locales directes (portée : interne à l’aire).</li>',
        '      <li><strong>Type 2 (Network LSA) :</strong> Émis par le DR pour décrire la liste des routeurs raccordés au segment multi-accès (interne à l’aire).</li>',
        '      <li><strong>Type 3 (Summary LSA) :</strong> Émis par l’ABR (Area Border Router) pour annoncer les réseaux d’une aire vers les autres aires.</li>',
        '      <li><strong>Type 4 (ASBR Summary LSA) :</strong> Émis par l’ABR pour indiquer l’emplacement du routeur passerelle externe (ASBR).</li>',
        '      <li><strong>Type 5 (AS External LSA) :</strong> Émis par l’ASBR pour injecter des routes externes redistribuées (ex: routes Internet ou BGP).</li>',
        '      <li><strong>Type 7 (NSSA External LSA) :</strong> Émis dans une aire NSSA pour importer des routes externes sans utiliser de LSA Type 5.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Aires Hiérarchiques & Aires Spéciales (Stub, Totally Stubby, NSSA)',
      html: [
        '<p>Pour limiter la taille de la base LSDB et l’utilisation CPU sur les équipements périphériques, OSPF permet de subdiviser le domaine en zones géographiques et logiques :</p>',
        '<div class="grid grid-3">',
        '  <div class="card">',
        '    <h4>Aire Stub</h4>',
        '    <p>Bloque tous les LSA externes de Type 5 (et Type 4). L’ABR injecte automatiquement une route par défaut (LSA Type 3) pour sortir du domaine. Réduit significativement la table de routage.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Aire Totally Stubby</h4>',
        '    <p>Optimisation propriétaire Cisco : bloque les Type 5 ET les Type 3 (inter-aires). La table locale ne contient que les routes internes à l’aire et une unique route par défaut Type 3 vers l’ABR.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Aire NSSA (Not-So-Stubby Area)</h4>',
        '    <p>Permet à une aire Stub de connecter son propre ASBR externe. Les routes externes y circulent sous forme de LSA Type 7, puis sont converties en LSA Type 5 standard par l’ABR lors de l’injection dans l’Aire 0.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],
  method: [
    'Étape 1 : Choisir un Router ID (RID) unique pour chaque routeur (de préférence configuré explicitement sur une interface Loopback).',
    'Étape 2 : Harmoniser la bande passante de référence sur tous les équipements via la directive auto-cost reference-bandwidth.',
    'Étape 3 : Organiser le découpage hiérarchique avec une Aire 0 (Backbone) contiguë reliant tous les ABRs.',
    'Étape 4 : Déclarer les interfaces et masques génériques (wildcard mask) dans les processus OSPF respectifs.',
    'Étape 5 : Configurer les aires périphériques en Stub ou Totally Stubby pour alléger les tables des commutateurs d’accès.',
    'Étape 6 : Auditer les relations de voisinage via show ip ospf neighbor et inspecter la base de données via show ip ospf database.'
  ],
  summary: [
    'OSPFv2 est un protocole de routage à état de liens ouvert qui calcule le plus court chemin via l’algorithme de Dijkstra.',
    'Le coût métrique d’interface nécessite d’ajuster la bande passante de référence sur les réseaux 1G/10G/40G modernes.',
    'Sur un segment multi-accès, le DR et le BDR réduisent le nombre d’adjacences et centralisent les échanges de LSAs.',
    'L’Aire 0 (Backbone) est le cœur obligatoire assurant l’interconnexion de toutes les autres aires OSPF.',
    'Une aire Stub filtre les LSA Type 5 externes ; une aire Totally Stubby filtre en plus les LSA Type 3 inter-aires.',
    'Une aire NSSA permet d’importer des routes externes via des LSA Type 7 traduits en Type 5 par l’ABR.'
  ],
  checklist: [
    'Je comprends la différence fondamentale entre protocole à état de liens (OSPF) et vecteur de distance (RIP).',
    'Je sais calculer le coût OSPF d’une interface selon la formule officielle et régler la bande passante de référence.',
    'Je maîtrise le mécanisme d’élection du DR/BDR (priorité puis Router ID le plus élevé).',
    'Je connais la typologie et le rôle des LSAs 1, 2, 3, 4, 5 et 7.',
    'Je sais expliquer pourquoi une aire Totally Stubby est la plus compacte en termes de routes.',
    'Je sais interpréter les sorties des commandes show ip ospf neighbor et show ip ospf database.'
  ],
  notions: [
    'Protocole à État de Liens & Base LSDB',
    'Algorithme SPF de Dijkstra',
    'Bande Passante de Référence (auto-cost)',
    'Élection DR (Designated Router) & BDR',
    'Aire Backbone 0 & Routeurs ABR / ASBR',
    'Typologie des Paquets LSA 1 à 7',
    'Aires Spéciales (Stub, Totally Stubby)',
    'Aire NSSA & Traduction Type 7 vers Type 5'
  ],
  pitfalls: [
    'Oublier d’aligner la bande passante de référence sur tous les routeurs, aboutissant à des calculs de coûts incohérents et du routage asymétrique.',
    'Créer des aires disjointes non raccordées à l’Aire 0 sans tunnel virtuel (Virtual Link).',
    'Avoir des paramètres de minuteries Hello/Dead discordants entre deux voisins, empêchant toute adjacence OSPF.',
    'Confondre un ABR (connecté à plusieurs aires OSPF) et un ASBR (connecté à un domaine de routage externe).'
  ],
  questions: [
    {
      stem: 'Quel algorithme mathématique est exécuté par OSPF pour déterminer le plus court chemin vers chaque destination ?',
      opts: [
        'L’algorithme de Bellman-Ford',
        'L’algorithme SPF de Dijkstra',
        'L’algorithme de Floyd-Warshall',
        'L’algorithme de cryptographie RSA'
      ],
      correct: 1,
      exp: 'OSPF s’appuie sur l’algorithme de Dijkstra (Shortest Path First) pour calculer l’arbre des chemins de coût minimal.'
    },
    {
      stem: 'Quelle commande Cisco IOS permet d’ajuster la bande passante de référence pour distinguer les liens 1G et 10G ?',
      opts: [
        'bandwidth 10000000',
        'auto-cost reference-bandwidth 100000',
        'metric-type 1',
        'ospf cost 100'
      ],
      correct: 1,
      exp: 'La directive auto-cost reference-bandwidth permet de rehausser la référence (ex: 100000 pour 100 Gbps) pour discriminer les débits supérieurs à 100 Mbps.'
    },
    {
      stem: 'Sur un segment Ethernet multi-accès, avec qui les routeurs DROTHER établissent-ils une adjacence pleine (FULL) ?',
      opts: [
        'Avec tous les routeurs du segment indifféremment',
        'Uniquement avec le DR (Designated Router) et le BDR (Backup Designated Router)',
        'Uniquement avec la passerelle par défaut DHCP',
        'Avec aucun routeur (état 2-Way permanent)'
      ],
      correct: 1,
      exp: 'Les DROTHER ne s’adjugent en état FULL qu’avec le DR et le BDR. Entre deux DROTHER, l’état reste stabilisé en 2-Way.'
    },
    {
      stem: 'Quel type de paquet LSA est généré par un routeur ABR pour annoncer des réseaux d’une aire vers une autre aire ?',
      opts: [
        'LSA Type 1 (Router LSA)',
        'LSA Type 2 (Network LSA)',
        'LSA Type 3 (Summary LSA)',
        'LSA Type 5 (AS External LSA)'
      ],
      correct: 2,
      exp: 'Le LSA Type 3 (Summary LSA) résume et propage les préfixes inter-aires à travers l’Area Border Router (ABR).'
    },
    {
      stem: 'Dans quel type d’aire OSPF les LSA de Type 5 (routes externes) sont-ils bloqués et remplacés par une route par défaut Type 3 ?',
      opts: [
        'Aire Backbone (Aire 0)',
        'Aire Normale',
        'Aire Stub',
        'Aire Transit'
      ],
      correct: 2,
      exp: 'L’aire Stub filtre les LSA Type 5 et Type 4 externes pour alléger la table des routeurs locaux, les remplaçant par une route par défaut.'
    },
    {
      stem: 'Quelle est la particularité exclusive d’une aire « Totally Stubby » par rapport à une aire « Stub » standard ?',
      opts: [
        'Elle bloque également les LSA Type 3 inter-aires en ne conservant qu’une unique route par défaut vers l’ABR',
        'Elle désactive totalement le protocole OSPF',
        'Elle autorise les annonces BGP directes',
        'Elle ne permet pas d’avoir de switchs de niveau 3'
      ],
      correct: 0,
      exp: 'L’aire Totally Stubby (Cisco) bloque les Type 5 ET les Type 3 inter-aires : seule une route par défaut injectée par l’ABR subsiste.'
    },
    {
      stem: 'Quel type de LSA est utilisé pour transporter des routes externes à l’intérieur d’une aire NSSA (Not-So-Stubby Area) ?',
      opts: [
        'LSA Type 1',
        'LSA Type 5',
        'LSA Type 7',
        'LSA Type 9'
      ],
      correct: 2,
      exp: 'L’aire NSSA utilise des LSA Type 7 générés par son ASBR local. L’ABR traduit ensuite ces Type 7 en Type 5 vers l’Aire 0.'
    },
    {
      stem: 'À quelle adresse IPv4 multicast réservée les routeurs OSPF envoient-ils leurs paquets Hello pour découvrir leurs voisins ?',
      opts: [
        '224.0.0.1',
        '224.0.0.5',
        '224.0.0.6',
        '239.255.255.250'
      ],
      correct: 1,
      exp: 'L’adresse multicast 224.0.0.5 (All OSPF Routers) est utilisée par tous les routeurs OSPF pour échanger leurs paquets Hello.'
    }
  ],
  flashcards: [
    {
      q: 'Quel est l’algorithme au cœur d’OSPF pour le calcul des routes ?',
      a: 'L’algorithme Shortest Path First (SPF) de Dijkstra.'
    },
    {
      q: 'Quelle est la formule du coût d’interface OSPF ?',
      a: 'Coût = Bande Passante de Référence / Bande Passante de l’Interface.'
    },
    {
      q: 'Quel est le rôle du DR (Designated Router) sur un réseau Ethernet multi-accès ?',
      a: 'Centraliser les échanges d’annonces LSA et limiter le nombre d’adjacences OSPF sur le segment.'
    },
    {
      q: 'Quelle est la différence fondamentale entre un LSA Type 1 et un LSA Type 3 ?',
      a: 'Le Type 1 est généré par chaque routeur pour décrire son aire locale ; le Type 3 est émis par l’ABR pour propager les réseaux vers les autres aires.'
    },
    {
      q: 'Pourquoi configurer une aire en Totally Stubby ?',
      a: 'Pour éliminer tous les LSA externes (Type 5) et inter-aires (Type 3), minimisant l’occupation mémoire et le calcul CPU.'
    },
    {
      q: 'Comment les routes externes d’une aire NSSA sont-elles propagées dans l’Aire 0 ?',
      a: 'Elles sont injectées en LSA Type 7 dans la NSSA, puis l’ABR les convertit en LSA Type 5 standard pour l’Aire 0.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Difficultés à calculer le coût OSPF ou confusion entre les différents types de routeurs (ABR vs ASBR).'
    },
    {
      cls: 'medium',
      text: 'Bonne compréhension de la hiérarchie multi-aires OSPF, élection DR/BDR et typologie des LSAs 1 à 5.'
    },
    {
      cls: 'high',
      text: 'Maîtrise complète de l’optimisation par aires spéciales (Totally Stubby, NSSA), manipulation avancée de la métrique et diagnostic d’adjacence complexe.'
    }
  ]
};
