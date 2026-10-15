/**
 * Chapitre 6 du cours « UML B2 » — Machines à États, Composants &amp; Déploiement Physique.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 6,
  title: 'Machines à États, Composants &amp; Déploiement Physique',
  short: 'États, Composants &amp; Déploiement',
  toc: 'Cycle de vie événementiel (Statecharts de Harel), actions internes (entry, exit, do), pseudo-états et historique, architecture logicielle modulaire en diagramme de composants, interfaces requises/fournies (Lollipop &amp; Socket), et topologie d’infrastructure physique en diagramme de déploiement.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Lors de la mise en pré-production d’une solution IoT et bancaire critique, des régressions majeures éclatent : ' +
    'des terminaux de paiement restent bloqués dans des états incohérents lors de déconnexions réseau inopinées, ' +
    'et les équipes d’exploitation Cloud ne parviennent pas à déployer les microservices faute de spécification ' +
    'claire des dépendances entre composants logiciels et serveurs physiques. ' +
    'Pour maîtriser le cycle de vie réactif des objets et sécuriser l’architecture d’exécution de bout en bout, ' +
    'l’architecte formalise les machines à états-transitions, les contrats de composants et le plan de déploiement physique. ' +
    'Ce dernier module parachève la maîtrise d’UML 2.5 en reliant la dynamique fine des objets ' +
    'à l’architecture logicielle modulaire et à l’infrastructure matérielle réelle.',

  objectives: [
    'concevoir une machine à états finis (Statechart) pour modéliser le comportement réactif d’un objet ;',
    'distinguer avec rigueur la syntaxe d’une transition : événement [garde] / action ;',
    'différencier les actions internes atomiques (entry /, exit /) des activités continues interruptibles (do /) ;',
    'manipuler les pseudo-états (initial, choix, jonction, historique superficiel H et profond H*) ;',
    'modéliser des composants logiciels autonomes avec leurs ports et interfaces requises/fournies (notation Lollipop &amp; Socket) ;',
    'élaborer un diagramme de déploiement physique distinguant les nœuds matériels (&laquo;device&raquo;), les environnements d’exécution (&laquo;executionEnvironment&raquo;) et les artefacts logiciels (&laquo;artifact&raquo;).'
  ],

  sections: [
    {
      title: 'Machines à États-Transitions : Le Cycle de Vie Réactif',
      html: [
        '<p>Inspiré des <em>Statecharts</em> de David Harel, le <strong>diagramme d’états-transitions</strong> décrit ' +
        'comment un objet réactif change d’état en réponse à des stimuli (événements extérieurs) :</p>',

        '<ul>',
        '  <li><strong>État (State) :</strong> Rectangle à coins arrondis représentant une situation stable de l’objet pendant une durée mesurable (ex: <em>EnAttentePaiement</em>, <em>Connecté</em>).</li>',
        '  <li><strong>Syntaxe complète d’une transition :</strong><br>',
        '    <code>événement (paramètres) [gardeBooléenne] / actionExécutée</code><br>',
        '    La transition n’est franchie que si l’événement survient <strong>ET</strong> que la garde s’évalue à vrai.</li>',
        '  <li><strong>Compartiment interne d’actions :</strong><br>',
        '    - <code>entry / action</code> : action atomique exécutée immédiatement à l’entrée dans l’état.<br>',
        '    - <code>exit / action</code> : action atomique exécutée immédiatement avant de quitter l’état.<br>',
        '    - <code>do / activité</code> : travail continu en arrière-plan qui s’exécute tant qu’on réside dans l’état (interrompu si une transition sortante est tirée).</li>',
        '</ul>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4 class="card-title">Pseudo-États de Choix et Jonction</h4>',
        '    <ul>',
        '      <li><strong>Choix dynamique (Losange) :</strong> Évalue les gardes dynamiquement au moment de l’atteinte du pseudo-état.</li>',
        '      <li><strong>Jonction statique (Petit disque noir) :</strong> Fusionne ou sépare des segments de transition évalués statiquement avant franchissement.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4 class="card-title">Pseudo-États d’Historique (H et H*)</h4>',
        '    <ul>',
        '      <li><strong>Historique superficiel (H) :</strong> Mémorise le dernier sous-état actif de plus haut niveau au sein d’un état composite.</li>',
        '      <li><strong>Historique profond (H*) :</strong> Mémorise l’état actif à tous les niveaux de récursion imbriqués.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Diagramme de Composants : Interfaces Lollipop &amp; Socket',
      html: [
        '<p>Le <strong>diagramme de composants</strong> modélise l’architecture modulaire du logiciel. ' +
        'Un composant (<code>&laquo;component&raquo;</code>) représente une unité autonome de déploiement et de packaging ' +
        '(ex: une bibliothèque, un microservice, un module NPM, un bundle OSGi) :</p>',

        '<p>Les composants communiquent exclusivement à travers des contrats d’interface standardisés, représentés par la célèbre notation <strong>« Boule et Réceptacle » (Ball-and-Socket)</strong> :</p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4 class="card-title">Interface Fournie (&ndash;&ndash;&CircleTimes; Lollipop)</h4>',
        '    <p>Une tige terminée par un petit cercle plein (« sucette » / Lollipop). ' +
        'Indique le service ou l’API publique que le composant implémente et met à disposition des autres modules ' +
        '(ex: <code>IPaiementService</code>).</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4 class="card-title">Interface Requise (&ndash;&ndash;&LeftCeiling; Socket)</h4>',
        '    <p>Une tige terminée par un demi-cercle creux (« réceptacle » / Socket). ' +
        'Indique le service ou contrat dont le composant a impérativement besoin pour fonctionner ' +
        '(ex: <code>IBanquePasserelle</code>).</p>',
        '  </div>',
        '</div>',

        '<p>Lorsque le réceptacle d’un composant client s’emboîte parfaitement dans la sucette d’un composant fournisseur, ' +
        'on forme un <strong>connecteur d’assemblage</strong> garantissant le respect du principe de découplage.</p>'
      ].join('\n')
    },
    {
      title: 'Diagramme de Déploiement : Infrastructure Matérielle et Artefacts',
      html: [
        '<p>Le <strong>diagramme de déploiement</strong> décrit la topologie physique d’exécution du système en production. ' +
        'Il repose sur des boîtes tridimensionnelles (cubes en perspective) :</p>',

        '<ul>',
        '  <li><strong>Nœud matériel (&laquo;device&raquo;) :</strong> Équipement physique disposant de capacités de calcul (ex: <em>Serveur Dell PowerEdge</em>, <em>Smartphone Android</em>, <em>Routeur Cisco</em>).</li>',
        '  <li><strong>Environnement d’exécution (&laquo;executionEnvironment&raquo;) :</strong> Système d’exploitation, conteneur ou machine virtuelle hébergé au sein d’un device (ex: <em>Linux Ubuntu 24.04</em>, <em>Moteur Docker</em>, <em>JVM OpenJDK 21</em>).</li>',
        '  <li><strong>Artefact logiciel (&laquo;artifact&raquo;) :</strong> Représenté par un rectangle avec le stéréotype ou une icône de feuille cornée. ' +
        'C’est le livrable concret déployé sur le nœud (ex: <code>api-gateway.jar</code>, <code>frontend.docker.tar</code>, <code>schema.sql</code>).</li>',
        '  <li><strong>Canaux de communication :</strong> Lignes pleines reliant les nœuds physiques, annotées du protocole réseau utilisé (ex: <code>&laquo;HTTPS / TLS 1.3&raquo;</code>, <code>&laquo;TCP / JDBC port 5432&raquo;</code>).</li>',
        '</ul>'
      ].join('\n')
    }
  ],

  methodTitle: 'Méthodologie de Finalisation d’une Architecture Logicielle Complète',
  method: [
    'Étape 1 — Identifier les entités réactives à cycle de vie complexe : Isoler les objets dont le comportement dépend d’états successifs (Commandes, Sessions, Périphériques IoT).',
    'Étape 2 — Construire le Statechart : Poser l’état initial, les états nominaux, les états d’erreur et les états terminaux ; spécifier les triggers et les gardes [condition].',
    'Étape 3 — Définir les actions internes : Distinguer les actions entry/exit instantanées des activités do longues en tâche de fond.',
    'Étape 4 — Découper le logiciel en composants autonomes : Identifier les paquetages et regrouper les classes en modules cohérents faiblement couplés.',
    'Étape 5 — Déclarer les interfaces Lollipop et Socket : Formaliser chaque dépendance sous forme d’interface fournie ou requise pour chaque composant.',
    'Étape 6 — Mapper les composants en artefacts physiques : Spécifier le format des livrables (JAR, WAR, conteneurs, binaires compilés).',
    'Étape 7 — Concevoir la topologie de déploiement : Répartir les artefacts sur les nœuds matériels et d’exécution, en précisant les protocoles de communication sécurisés.'
  ],

  summary: [
    'Le diagramme d’états-transitions modélise les réactions d’un objet aux événements extérieurs selon la syntaxe événement [garde] / action.',
    'Les actions entry et exit sont atomiques et instantanées, tandis que l’activité do est continue et interruptible.',
    'Les pseudo-états d’historique (H superficiel et H* profond) permettent de reprendre le sous-état actif lors de la réactivation d’un état composite.',
    'Le diagramme de composants représente l’architecture modulaire logicielle.',
    'La notation Lollipop (sucette pleine) symbolise une interface fournie, et Socket (réceptacle creux) une interface requise.',
    'Le diagramme de déploiement décrit l’infrastructure physique : nœuds matériels, environnements d’exécution, protocoles réseau et artefacts logiciels.'
  ],

  checklist: [
    'Je sais rédiger la syntaxe normalisée d’une transition : événement [garde] / action.',
    'Je fais la différence entre entry / action, exit / action et do / activité.',
    'Je connais la différence entre historique superficiel H et historique profond H*.',
    'Je sais reconnaître et dessiner une interface fournie (Lollipop) et une interface requise (Socket).',
    'Je sais représenter un nœud physique en cube 3D (&laquo;device&raquo;) et un environnement d’exécution (&laquo;executionEnvironment&raquo;).',
    'Je sais modéliser un artefact déployé (&laquo;artifact&raquo;) et son protocole de communication.'
  ],

  notions: [
    'Machines à états finis (Statecharts)',
    'Syntaxe transition : événement [garde] / action',
    'Actions entry /, exit / et activités do /',
    'Pseudo-états (Choix, Jonction, Historique H/H*)',
    'Diagramme de composants (&laquo;component&raquo;)',
    'Interfaces Lollipop (fournies) et Socket (requises)',
    'Diagramme de déploiement (cubes 3D)',
    'Nœuds, environnements d’exécution et artefacts'
  ],

  pitfalls: [
    'Confondre un état (situation stable dans le temps) avec une action (opération instantanée).',
    'Oublier que l’activité do / est immédiatement interrompue dès qu’une transition sortante de l’état est déclenchée.',
    'Inverser les notations Lollipop et Socket : la sucette pleine donne le service (fournie), le réceptacle creux le consomme (requise).',
    'Dessiner des classes dans un diagramme de déploiement physique : on n’y déploie que des artefacts compilés concrets (&laquo;artifact&raquo;).',
    'Oublier de nommer le protocole de communication reliant deux nœuds de déploiement distants.'
  ],

  questions: [
    {
      stem: 'Quelle est la syntaxe complète et normalisée d’une transition dans un diagramme d’états-transitions UML ?',
      opts: [
        'action -&gt; état [événement]',
        'événement(paramètres) [garde] / action',
        '&laquo;transition&raquo; événement : action',
        'état_initial =&gt; état_final'
      ],
      correct: 1,
      exp: 'La syntaxe officielle est : événement(paramètres) [garde] / action. L’événement déclenche l’analyse, la garde valide la condition, et l’action s’exécute lors du tir.'
    },
    {
      stem: 'Quelle est la caractéristique fondamentale d’une activité déclarée avec le mot-clé «do /» au sein d’un état ?',
      opts: [
        'Elle s’exécute en une fraction de seconde de façon instantanée',
        'Elle s’exécute en continu tant que l’objet reste dans l’état et peut être interrompue dès qu’une transition sortante est tirée',
        'Elle est exécutée uniquement lorsque l’état est détruit',
        'Elle nécessite obligatoirement une connexion Internet'
      ],
      correct: 1,
      exp: 'L’activité «do /» représente un travail durable en tâche de fond qui se poursuit tant que l’état est actif, et qui est stoppé dès le déclenchement d’une transition sortante.'
    },
    {
      stem: 'Quelle est la différence entre l’historique superficiel (H) et l’historique profond (H*) dans un état composite ?',
      opts: [
        'H sauvegarde sur disque dur et H* en mémoire RAM',
        'H mémorise uniquement le sous-état immédiat de premier niveau, alors que H* rétablit récursivement tous les sous-états imbriqués au niveau le plus profond',
        'H ne fonctionne qu’une seule fois',
        'H* est réservé aux architectures microservices'
      ],
      correct: 1,
      exp: 'L’historique superficiel H ne restaure que le niveau direct au sein de l’état composite. L’historique profond H* plonge récursivement jusqu’au sous-état le plus imbriqué.'
    },
    {
      stem: 'Dans un diagramme de composants, comment est notée une «interface fournie» (service offert par le composant) ?',
      opts: [
        'Une tige terminée par un demi-cercle creux (Socket)',
        'Une tige terminée par un petit disque plein (Lollipop / sucette)',
        'Une flèche rouge clignotante',
        'Un losange noir plein'
      ],
      correct: 1,
      exp: 'La notation «Lollipop» (disque plein au bout d’une ligne) symbolise formellement une interface fournie par le composant (Provided Interface).'
    },
    {
      stem: 'Comment s’appelle l’assemblage où le réceptacle (Socket) d’un composant client vient s’emboîter dans la boule (Lollipop) d’un composant fournisseur ?',
      opts: [
        'Un connecteur d’assemblage (Assembly Connector)',
        'Un pont de routage VPN',
        'Une agrégation forte composite',
        'Une liaison de dépendance circulaire'
      ],
      correct: 0,
      exp: 'L’OMG nomme «connecteur d’assemblage» la liaison qui associe une interface requise (Socket) et une interface fournie compatible (Lollipop).'
    },
    {
      stem: 'Dans un diagramme de déploiement, comment représente-t-on graphiquement un nœud physique («device») ?',
      opts: [
        'Un cercle concentrique',
        'Un parallélépipède / cube en perspective tridimensionnelle portant le stéréotype «device»',
        'Un losange horizontal',
        'Un rectangle à coins arrondis'
      ],
      correct: 1,
      exp: 'Les nœuds de déploiement (matériels et environnements) sont formellement modélisés par des boîtes tridimensionnelles (cubes en perspective).'
    },
    {
      stem: 'Qu’est-ce qu’un «artefact» («artifact») dans un diagramme de déploiement ?',
      opts: [
        'Un bogue logiciel non résolu',
        'Un élément physique concret produit par le développement (fichier binaire, WAR, JAR, exécutable, conteneur) déployé sur un nœud',
        'Un câble réseau à fibre optique',
        'Une réunion de sprint Scrum'
      ],
      correct: 1,
      exp: 'Un artefact représente l’entité concrète issue de la compilation ou du packaging (JAR, DLL, image Docker, script) qui est matérialisée et exécutée sur un nœud.'
    },
    {
      stem: 'Quel stéréotype utilise-t-on pour désigner une machine virtuelle ou un runtime logiciel (ex: JVM, Docker Engine, Linux OS) hébergé dans un équipement physique ?',
      opts: [
        '«device»',
        '«executionEnvironment»',
        '«hardware»',
        '«storage»'
      ],
      correct: 1,
      exp: 'Le stéréotype officiel «executionEnvironment» caractérise un environnement logiciel d’exécution offrant des services de plateforme au sein d’un équipement physique.'
    }
  ],

  flashcards: [
    {
      q: 'Quelle est la syntaxe standard d’une transition dans un Statechart ?',
      a: 'événement(paramètres) [garde] / action. L’événement déclenche, la garde filtre, l’action s’exécute.'
    },
    {
      q: 'Quelle est la différence entre une action entry et une activité do ?',
      a: 'entry / s’exécute immédiatement de façon atomique à l’entrée de l’état ; do / s’exécute en continu en tâche de fond et peut être interrompue.'
    },
    {
      q: 'Que fait le pseudo-état d’historique profond H* ?',
      a: 'Il mémorise et rétablit récursivement l’état le plus profond actif lors de la dernière sortie de l’état composite.'
    },
    {
      q: 'Quelle est la distinction visuelle entre interface fournie et interface requise ?',
      a: 'Interface fournie : Lollipop (&ndash;&ndash;&CircleTimes; boule pleine). Interface requise : Socket (&ndash;&ndash;&LeftCeiling; réceptacle creux).'
    },
    {
      q: 'Comment représente-t-on un nœud matériel dans un diagramme de déploiement ?',
      a: 'Par un cube tridimensionnel en perspective portant le nom du nœud et le stéréotype &laquo;device&raquo;.'
    },
    {
      q: 'Qu’est-ce qu’un artefact (&laquo;artifact&raquo;) ?',
      a: 'Un élément physique livrable résultant de la fabrication du logiciel (ex: fichier JAR, script SQL, conteneur) déployé sur un nœud.'
    }
  ],

  mastery: [
    { cls: 'low', text: 'Moins de 4/8 : Révisez la syntaxe des transitions, les actions internes (entry/do) et les symboles Lollipop/Socket.' },
    { cls: 'mid', text: 'De 4 à 6/8 : Bonnes connaissances. Consolidez les diagrammes de déploiement et la modélisation des artefacts.' },
    { cls: 'good', text: '7/8 : Très bon niveau ! Vous maîtrisez les Statecharts complexes et l’architecture physique.' },
    { cls: 'top', text: '8/8 : Score maximal ! Vous maîtrisez l’intégralité du cycle de vie réactif, modulaire et physique en UML 2.5.' }
  ]
};
