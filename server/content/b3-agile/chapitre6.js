/**
 * Chapitre 6 du cours « Méthodes Agiles B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 6,
  title: 'Agilité à l’Échelle (Scaling), Approches Hybrides &amp; Gouvernance d’Entreprise',
  short: 'Scaling, Hybride &amp; Gouvernance',
  toc: 'Agilité multi-équipes, Scrum of Scrums, frameworks à l’échelle (SAFe, LeSS, Modèle Spotify), gestion des dépendances inter-équipes (PI Planning) et modèles hybrides.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B3 et plus',
  situation: 'Faire fonctionner une équipe Scrum de 7 développeurs est un défi maîtrisé ; synchroniser 50 équipes (soit 400 ingénieurs) travaillant simultanément sur un même système d’information bancaire, aéronautique ou e-commerce relève d’une complexité d’ingénierie radicalement différente. L’agilité à l’échelle (Scaling Agile) répond à cet impératif d’alignement stratégique sans détruire l’autonomie locale des équipes. Plusieurs modèles coexistent : le cadre structuré SAFe (Scaled Agile Framework) et son événement central de PI Planning, le minimalisme épuré de LeSS (Large-Scale Scrum), ou encore l’organisation matricielle popularisée par Spotify (Squads, Tribes, Chapters, Guilds). Par ailleurs, dans le monde réel des grandes entreprises, l’agilité pure cohabite souvent avec des contraintes d’achats, d’audit réglementaire et de sécurité prédictive, donnant naissance à des modèles Hybrides (Water-Scrum-Fall). L’ingénieur de niveau Bachelor 3 doit savoir cartographier et désamorcer les dépendances inter-équipes, évaluer la maturité organisationnelle et piloter la gouvernance agile globale.',
  objectives: [
    'analyser les blocages et surcoûts de communication liés au passage à l’échelle multi-équipes ;',
    'comprendre l’architecture et les cérémonies du framework SAFe (Agile Release Train, PI Planning, Program Board) ;',
    'comparer la philosophie décentralisée de LeSS avec l’organisation matricielle du modèle Spotify ;',
    'distinguer les rôles au sein du modèle Spotify (Squads, Tribes, Chapters, Guilds) et leur gouvernance hiérarchique ;',
    'analyser les mécanismes et compromis d’une approche Hybride (Water-Scrum-Fall) en grande organisation ;',
    'analyser et résoudre méthodologiquement des auditeurs de dépendances de PI Planning, des validateurs matriciels Spotify et des radars de maturité agile.'
  ],
  sections: [
    {
      title: 'Les Défis du Passage à l’Échelle : De la Squad Isolée au Multi-Équipes',
      html: [
        '<p>Lorsque la taille d’une organisation grandit, le nombre de canaux de communication potentiels entre collaborateurs explose selon la formule combinatoire <code>N(N - 1) / 2</code>. L’enjeu du scaling est de découpler les équipes pour préserver leur autonomie tout en synchronisant les livraisons :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. Les Goulots du Multi-Équipes</h4>',
        '    <ul>',
        '      <li><strong>Dépendances bloquantes inter-équipes</strong> : L’équipe Front est paralysée en attendant la livraison d’une API par l’équipe Back.</li>',
        '      <li><strong>Divergence architecturale</strong> : Chaque équipe réinvente ses propres briques techniques sans standard commun.</li>',
        '      <li><strong>Désalignement stratégique</strong> : Les équipes livrent vite, mais dans des directions décorrélées des objectifs de l’entreprise.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Le Mécanisme du Scrum of Scrums (SoS)</h4>',
        '    <p>La première réponse historique au scaling : une réunion courte et régulière réunissant un ambassadeur (souvent le Scrum Master ou un Tech Lead) de chaque équipe pour :</p>',
        '    <ul>',
        '      <li>Partager les avancées impactant les autres équipes.</li>',
        '      <li>Lever les points de friction et dépendances transversales.</li>',
        '      <li>Coordonner les déploiements sur les environnements partagés.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Les Grands Frameworks de Scaling : SAFe &amp; LeSS',
      html: [
        '<p>Pour organiser la synchronisation à grande échelle, deux visions contrastées s’affrontent sur le marché :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. SAFe (Scaled Agile Framework) : La Rigueur Structurée</h4>',
        '    <p>Conçu par Dean Leffingwell, SAFe est le framework d’entreprise le plus répandu dans les grands comptes (banque, défense, industrie) :</p>',
        '    <ul>',
        '      <li><strong>Agile Release Train (ART)</strong> : Regroupement synchronisé de 5 à 12 équipes (50 à 125 personnes) partageant une même mission de valeur.</li>',
        '      <li><strong>PI Planning (Program Increment)</strong> : Événement majeur de 2 jours où toutes les équipes de l’ART s’alignent ensemble sur un plan de 5 sprints (environ 10 semaines).</li>',
        '      <li><strong>Program Board</strong> : Tableau visuel mettant en évidence les fonctionnalités, les jalons et les fils rouges de dépendances inter-équipes critiques.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. LeSS (Large-Scale Scrum) : Le Minimalisme Radical</h4>',
        '    <p>Développé par Craig Larman et Bas Vodde, LeSS applique le principe : <em>« Plus de Scrum, pas plus de règles »</em> :</p>',
        '    <ul>',
        '      <li>Un <strong>seul Product Owner unique</strong> et un <strong>seul Product Backlog unique</strong> pour un ensemble de 2 à 8 équipes Scrum.</li>',
        '      <li>Pas de couches managériales supplémentaires : la coordination s’opère directement entre les développeurs lors d’un Sprint Planning partagé.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'L’Organisation Matricielle et Autonome : Le Modèle Spotify',
      html: [
        '<p>Présenté en 2012 par Henrik Kniberg et Anders Ivarsson, le <strong>Spotify Model</strong> structure l’organisation en matrice à double entrée : l’alignement produit d’une part, et la maîtrise technique d’autre part :</p>',
        '<table class="table">',
        '  <thead>',
        '    <tr><th>Entité Organisationnelle</th><th>Périmètre &amp; Vocation</th><th>Gouvernance &amp; Rôle Clé</th></tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr><td><strong>Squad</strong></td><td>Cellule autonome pluridisciplinaire (6 à 9 personnes) semblable à une mini-startup (conçoit, code, déploie).</td><td>Animée par un Product Owner et un Agile Coach.</td></tr>',
        '    <tr><td><strong>Tribe</strong></td><td>Fédération de Squads travaillant sur le même domaine fonctionnel (max 100 à 150 personnes, limite du nombre de Dunbar).</td><td>Coordonnée par un Tribe Lead.</td></tr>',
        '    <tr><td><strong>Chapter</strong></td><td>Ligne de compétence technique transverse au sein d’une même Tribe (ex: Chapter Développeurs Mobile iOS).</td><td><strong>Chapter Lead</strong> : Responsable managérial direct (Line Manager) des ingénieurs du chapitre.</td></tr>',
        '    <tr><td><strong>Guild</strong></td><td>Communauté d’intérêt transversale informelle libre à l’échelle de toute l’entreprise (ex: Guilde Rust, Guilde Accessibilité).</td><td>Animée par des coordinateurs volontaires.</td></tr>',
        '  </tbody>',
        '</table>',
        '<p><strong>L’Équilibre d’Or de Spotify :</strong> Forte autonomie locale combinée à un fort alignement stratégique global (<em>« High Autonomy, High Alignment »</em>).</p>'
      ].join('\n')
    },
    {
      title: 'Approches Hybrides (Water-Scrum-Fall) et Gouvernance Agile',
      html: [
        '<p>Dans les grandes entreprises, le dogmatisme de l’agilité pure se heurte souvent aux réalités contractuelles et réglementaires. Le modèle <strong>Water-Scrum-Fall</strong> est la configuration hybride la plus fréquente :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. L’Architecture du Water-Scrum-Fall</h4>',
        '    <ul>',
        '      <li><strong>Amont prédictif (Water)</strong> : Cadrage budgétaire annuel, validation juridique et cahier des charges d’appel d’offres par la direction.</li>',
        '      <li><strong>Cœur agile itératif (Scrum)</strong> : Les équipes de développement exécutent le projet par Sprints itératifs de 2 semaines avec backlog priorisé.</li>',
        '      <li><strong>Aval séquentiel (Fall)</strong> : Phases de tests de sécurité et homologation externe imposées par les autorités avant la mise en production annuelle.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Le Radar de Maturité d’Équipe (Agile Fluency)</h4>',
        '    <p>Pour mesurer la santé et la progression d’une équipe sans tomber dans le piège de la notation individuelle, on évalue 5 axes fondamentaux :</p>',
        '    <ul>',
        '      <li><strong>Culture</strong> : Sécurité psychologique, transparence et absence de blâme.</li>',
        '      <li><strong>Cadence</strong> : Respect strict du timeboxing et régularité des cycles.</li>',
        '      <li><strong>Qualité</strong> : Automatisation des tests (CI/CD) et rigueur de la DoD.</li>',
        '      <li><strong>Produit</strong> : Clarté de la vision PO et valeur utilisateur délivrée.</li>',
        '      <li><strong>Flux</strong> : Maîtrise des limites WIP et fluidité du Lead Time.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],
  methodTitle: 'Méthode d’Ingénierie : Cadrage et Résolution des Dépendances lors d’un PI Planning',
  method: [
    'Étape 1 : Présentation de la vision stratégique et des priorités business par le Product Management à l’ensemble du train ART.',
    'Étape 2 : Breakout par équipe : chaque Squad décompose les fonctionnalités du PI en stories et estime sa capacité pour chacun des 5 sprints.',
    'Étape 3 : Cartographie des dépendances sur le Program Board : relier les stories consommatrices aux fonctionnalités fournies par d’autres équipes.',
    'Étape 4 : Détection immédiate des inversions de dépendance (lorsqu’un fournisseur livre après le sprint où le client en a besoin).',
    'Étape 5 : Réajustement et négociation en direct entre Product Owners pour permuter les priorités de sprint et désamorcer les blocages.',
    'Étape 6 : Présentation finale des objectifs de PI et vote de confiance (Fist of Five) par l’ensemble des ingénieurs.'
  ],
  summary: [
    'Le passage à l’échelle multi-équipes impose de résoudre l’explosion des dépendances sans bureaucratie paralysante.',
    'Le framework SAFe structure l’alignement d’entreprises complexes autour de l’Agile Release Train et du PI Planning.',
    'LeSS privilégie la simplicité radicale avec un seul Product Owner et un seul Backlog partagé par plusieurs équipes.',
    'Le modèle Spotify combine autonomie locale (Squads, Tribes) et cohérence technique managériale (Chapters, Guilds).',
    'Dans le modèle Spotify, le Chapter Lead est le manager hiérarchique direct qui gère la montée en compétences des ingénieurs.',
    'Le modèle hybride Water-Scrum-Fall concilie le cadrage budgétaire d’entreprise avec la vélocité de sprints de développement.'
  ],
  checklist: [
    'Je sais expliquer les causes de l’explosion de la complexité lors du passage à l’échelle multi-équipes.',
    'Je comprends les concepts clés de SAFe : Agile Release Train, PI Planning et Program Board.',
    'Je sais distinguer l’approche lourde et outillée de SAFe de l’approche minimale de LeSS.',
    'Je maîtrise l’organisation matricielle de Spotify (Squad, Tribe, Chapter, Guild) et sais qui manage qui.',
    'Je sais analyser un cas de Water-Scrum-Fall et identifier les zones de tension et de compromis.',
    'Je sais diagnostiquer la maturité d’une équipe à l’aide d’un radar agile multidimensionnel.'
  ],
  notions: [
    'Scaling Agile & Scrum of Scrums (SoS)',
    'Scaled Agile Framework (SAFe)',
    'Agile Release Train (ART) & PI Planning',
    'Large-Scale Scrum (LeSS)',
    'Modèle Spotify (Squad, Tribe, Chapter, Guild)',
    'Matrice Autonomie vs Alignement',
    'Modèle Hybride Water-Scrum-Fall',
    'Radar de Maturité Agile (Agile Fluency)'
  ],
  pitfalls: [
    'Adopter un framework de scaling lourd comme SAFe alors qu’une seule équipe de 8 développeurs suffit largement.',
    'Penser que le modèle Spotify est une recette magique à copier-coller sans adapter la culture d’entreprise.',
    'Laisser les dépendances inter-équipes non résolues jusqu’à la fin du sprint au lieu de les négocier en amont au PI Planning.',
    'Confondre le Product Owner avec le manager hiérarchique dans une structure matricielle.'
  ],
  questions: [
    {
      stem: 'Dans le modèle d’organisation agile de Spotify, qui est le responsable hiérarchique (Line Manager) direct d’un ingénieur développeur ?',
      opts: [
        'Le Product Owner de sa Squad',
        'Le Chapter Lead de sa compétence technique',
        'Le Scrum Master de l’équipe',
        'Le Guild Coordinator'
      ],
      correct: 1,
      exp: 'Dans la matrice Spotify, le Chapter Lead gère le développement professionnel, les évaluations et la carrière des ingénieurs de son domaine technique.'
    },
    {
      stem: 'Dans le framework SAFe, qu’appelle-t-on le « Program Board » lors d’un PI Planning ?',
      opts: [
        'Une télévision diffusant les cours de la bourse',
        'Le tableau visuel synthétisant les fonctionnalités, les jalons et les fils de dépendances critiques entre toutes les équipes de l’ART',
        'La liste des employés en vacances',
        'Le relevé des factures du projet'
      ],
      correct: 1,
      exp: 'Le Program Board visualise les dépendances temporelles critiques entre squads sur les 5 sprints du Program Increment.'
    },
    {
      stem: 'Quelle est la différence philosophique fondamentale entre SAFe et LeSS pour le passage à l’échelle ?',
      opts: [
        'SAFe est gratuit et LeSS est payant',
        'SAFe propose un cadre complet et hautement structuré avec de multiples rôles d’entreprise, tandis que LeSS applique le minimalisme de Scrum avec un seul PO et un seul backlog pour plusieurs équipes',
        'LeSS utilise uniquement des ordinateurs portables',
        'SAFe n’utilise pas de sprints'
      ],
      correct: 1,
      exp: 'LeSS prône la désimplification organisationnelle avec un unique PO et un seul backlog, tandis que SAFe déploie une hiérarchie articulée (Team, Program, Solution, Portfolio).'
    },
    {
      stem: 'Dans le modèle Spotify, qu’est-ce qu’une « Guild » (Guilde) ?',
      opts: [
        'Une équipe secrète de hackeurs',
        'Une communauté d’intérêt informelle et volontaire à l’échelle de toute l’entreprise réunissant des passionnés d’un même sujet',
        'Le bureau du directeur général',
        'La salle de réunion où l’on signe les contrats'
      ],
      correct: 1,
      exp: 'Une Guilde est une communauté de pratique ouverte et transversale partageant des connaissances (ex: Guilde Architecture, Guilde Accessibilité).'
    },
    {
      stem: 'Que décrit le terme d’approche hybride « Water-Scrum-Fall » dans les grandes organisations ?',
      opts: [
        'Un projet qui tombe à l’eau à cause d’une inondation',
        'Une démarche combinant un cadrage initial séquentiel prédictif (Water), une exécution de développement par sprints itératifs (Scrum), et une recette/déploiement finale rigide (Fall)',
        'Une nouvelle méthode développée par Google',
        'Une méthodologie exclusivement réservée aux startups'
      ],
      correct: 1,
      exp: 'Le Water-Scrum-Fall est le compromis pragmatique le plus fréquent où l’amont (gouvernance/budget) et l’aval (sécurité/homologation) restent séquentiels autour de sprints agiles.'
    },
    {
      stem: 'Lors d’un PI Planning SAFe, que signale une dépendance où l’équipe cliente a besoin d’une API au Sprint 2, alors que l’équipe fournisseuse ne la planifie qu’au Sprint 4 ?',
      opts: [
        'Une parfaite synchronisation',
        'Une inversion critique de dépendance (blocage temporel) qui doit être renégociée immédiatement pendant le breakout',
        'Un gain de vélocité',
        'Une anomalie sans conséquence'
      ],
      correct: 1,
      exp: 'Si le composant est requis avant sa livraison par le fournisseur, le client sera bloqué : les PO doivent réaligner leurs priorités de sprint.'
    },
    {
      stem: 'Pourquoi le modèle de Spotify limite-t-il la taille d’une « Tribe » (Tribu) à environ 100 à 150 personnes ?',
      opts: [
        'Pour des raisons d’espace physique dans les bureaux',
        'En référence au « Nombre de Dunbar », seuil cognitif maximal au-delà duquel les humains ne peuvent plus maintenir de relations sociales directes et de confiance réciproque',
        'Pour payer moins d’impôts',
        'Parce que le logiciel Jira s’arrête à 150 utilisateurs'
      ],
      correct: 1,
      exp: 'Le nombre de Dunbar (150) est la limite anthropologique au-delà de laquelle la bureaucratie formelle devient inévitable sans structure sociale directe.'
    },
    {
      stem: 'Qu’est-ce que le « Scrum of Scrums » (SoS) ?',
      opts: [
        'Un tournoi de jeux vidéo entre développeurs',
        'Une courte réunion de synchronisation régulière entre ambassadeurs d’équipes Scrum distinctes pour coordonner les interfaces et lever les blocages transversaux',
        'Le diplôme le plus élevé de Scrum Master',
        'Un livre écrit par Jeff Sutherland'
      ],
      correct: 1,
      exp: 'Le Scrum of Scrums permet à des équipes travaillant sur un produit commun de synchroniser leurs livraisons et d’éliminer les dépendances bloquantes.'
    }
  ],
  flashcards: [
    {
      q: 'Qu’est-ce qu’un Agile Release Train (ART) dans SAFe ?',
      a: 'Une équipe d’équipes agiles (50 à 125 personnes) synchronisées sur une même cadence pour livrer de la valeur continue.'
    },
    {
      q: 'Quel est l’événement central de planification dans SAFe ?',
      a: 'Le PI Planning (Program Increment Planning), rituel de 2 jours réunissant toutes les équipes de l’ART.'
    },
    {
      q: 'Quelles sont les 4 structures clés du modèle Spotify ?',
      a: 'Squad (cellule pluridisciplinaire), Tribe (domaine métier), Chapter (compétence technique), et Guild (communauté transversale).'
    },
    {
      q: 'Qui manage hiérarchiquement un développeur chez Spotify ?',
      a: 'Le Chapter Lead, qui est son manager de compétences et de carrière.'
    },
    {
      q: 'Qu’est-ce que le Water-Scrum-Fall ?',
      a: 'Un modèle hybride associant un amont contractuel en cascade, un développement en sprints Scrum et un aval de recette/déploiement traditionnel.'
    },
    {
      q: 'Qu’est-ce que le nombre de Dunbar appliqué aux Tribus ?',
      a: 'La limite cognitive d’environ 150 personnes garantissant la confiance et l’absence de bureaucratie lourde au sein d’une organisation.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Incompréhension des enjeux du passage à l’échelle ou méconnaissance de la structure matricielle Spotify.'
    },
    {
      cls: 'medium',
      text: 'Bonne compréhension des mécanismes de SAFe (PI Planning), du modèle Spotify et des compromis du Water-Scrum-Fall.'
    },
    {
      cls: 'high',
      text: 'Capacité experte à orchestrer des dépendances multi-équipes à grande échelle, piloter une gouvernance hybride et auditer la maturité agile d’une entreprise.'
    }
  ]
};
