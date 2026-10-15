/**
 * Chapitre 4 du cours « Méthodes Agiles B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 4,
  title: 'Spécification Agile &amp; Estimation : User Stories, INVEST &amp; Planning Poker',
  short: 'User Stories &amp; Planning Poker',
  toc: 'Format narratif des User Stories (3C), critères de qualité INVEST, critères d’acceptation BDD/Gherkin, Planning Poker, suite de Fibonacci et complexité relative.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B3 et plus',
  situation: 'Dans les démarches traditionnelles, la spécification des besoins prenait la forme de cahiers des charges fonctionnels de plusieurs centaines de pages, obsolètes avant même la première ligne de code. L’agilité a révolutionné l’ingénierie des exigences grâce aux User Stories, formalisées par le modèle des 3C de Ron Jeffries (Card, Conversation, Confirmation). Une User Story n’est pas une spécification exhaustive, mais une promesse de conversation entre le Product Owner et l’équipe technique. Parallèlement, l’estimation en heures ou jours-hommes a été abandonnée au profit de l’estimation relative en Story Points : estimer la taille et la complexité d’une tâche par comparaison avec une tâche de référence est scientifiquement plus précis et reproductible que prédire une durée absolue. En troisième année de Bachelor, l’ingénieur doit maîtriser la validation formelle INVEST, la rédaction de critères d’acceptation en syntaxe Gherkin (BDD) et l’animation du Planning Poker selon la suite de Fibonacci modifiée.',
  objectives: [
    'maîtriser le modèle des 3C (Card, Conversation, Confirmation) et le canevas narratif d’une User Story ;',
    'appliquer rigoureusement la grille d’évaluation INVEST (Bill Wake) pour qualifier une story ;',
    'maîtriser les techniques de découpage vertical des Epics volumineux (Workflow, Règles métier, Données) ;',
    'rédiger des critères d’acceptation vérifiables selon la syntaxe formelle BDD / Gherkin (Given, When, Then) ;',
    'comprendre le principe de l’estimation relative en Story Points et son découplage de la durée calendaire ;',
    'développer en Python 3 des validateurs syntaxiques INVEST, des moteurs de consensus Planning Poker et des analyseurs séquentiels Gherkin.'
  ],
  sections: [
    {
      title: 'L’Anatomie d’une User Story : Le Modèle des 3C et le Canevas Narratif',
      html: [
        '<p>Popularisé par Ron Jeffries, le modèle des <strong>3C</strong> définit la nature triadique d’une exigence agile :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. Les Trois Piliers « 3C »</h4>',
        '    <ul>',
        '      <li><strong>Card (La Carte)</strong> : L’invitation physique ou digitale résumant le besoin selon le canevas standard.</li>',
        '      <li><strong>Conversation (Le Dialogue)</strong> : L’échange verbal continu entre le PO, les développeurs, le designer et les testeurs pour explorer les cas limites, les maquettes et l’architecture.</li>',
        '      <li><strong>Confirmation (Les Critères)</strong> : Les critères d’acceptation formels définissant les conditions de succès vérifiables par des tests.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Le Canevas Standard de Mike Cohn</h4>',
        '    <p>Une User Story s’énonce toujours du point de vue de l’utilisateur final :</p>',
        '    <p><strong>En tant que</strong> <code>[persona / rôle utilisateur ciblé]</code>,<br>' +
        '    <strong>Je veux</strong> <code>[action / capacité logicielle attendue]</code>,<br>' +
        '    <strong>Afin de</strong> <code>[bénéfice métier / valeur ajoutée concrète]</code>.</p>',
        '    <p><em>Exemple :</em> En tant qu’abonné premium, je veux télécharger mes factures au format PDF en un clic, afin de simplifier ma déclaration fiscale.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Les Critères de Qualité INVEST (Bill Wake) &amp; Découpage des Epics',
      html: [
        '<p>Pour être qualifiée de prête à être développée (<em>Ready</em>), une User Story doit respecter les 6 critères de l’acronyme <strong>INVEST</strong> :</p>',
        '<table class="table">',
        '  <thead>',
        '    <tr><th>Critère</th><th>Exigence Méthodologique</th><th>Risque en cas de non-respect</th></tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr><td><strong>I - Independent</strong></td><td>La story doit pouvoir être développée et livrée sans bloquer ni être bloquée par une autre.</td><td>Création de cascades de dépendances bloquantes dans le sprint.</td></tr>',
        '    <tr><td><strong>N - Negotiable</strong></td><td>La story n’est pas un contrat figé ; les détails techniques sont ajustables en équipe.</td><td>Perte d’innovation et rigidité contractuelle.</td></tr>',
        '    <tr><td><strong>V - Valuable</strong></td><td>Elle apporte une valeur perceptible directe à l’utilisateur ou au métier (pas de pure story technique invisible).</td><td>Développement de fonctionnalités inutiles ou orphelines.</td></tr>',
        '    <tr><td><strong>E - Estimable</strong></td><td>L’équipe comprend le besoin suffisamment pour évaluer son effort en Story Points.</td><td>Impossibilité d’anticiper la vélocité et la charge de sprint.</td></tr>',
        '    <tr><td><strong>S - Small</strong></td><td>Elle doit être réalisable facilement au cours d’un seul Sprint (idéalement 1 à 3 jours de dev).</td><td>Tâches non terminées (Not Done) qui polluent les fins de sprint.</td></tr>',
        '    <tr><td><strong>T - Testable</strong></td><td>Elle possède des critères d’acceptation clairs permettant de vérifier automatiquement son succès.</td><td>Subjectivité lors de la recette et régressions en chaîne.</td></tr>',
        '  </tbody>',
        '</table>'
      ].join('\n')
    },
    {
      title: 'Critères d’Acceptation et Spécification par l’Exemple (BDD / Gherkin)',
      html: [
        '<p>Le développement guidé par le comportement (<strong>Behavior-Driven Development - BDD</strong>) formalise les critères d’acceptation sous forme de scénarios compréhensibles à la fois par le métier et directement exécutables par des frameworks d’automatisation (ex: Cucumber, Behave) grâce à la syntaxe <strong>Gherkin</strong> :</p>',
        '<div class="card">',
        '  <h4>Structure Séquentielle Gherkin</h4>',
        '  <pre><code>SCÉNARIO: Connexion réussie avec mot de passe valide\n  ÉTANT DONNÉ (GIVEN) un utilisateur enregistré avec l\'adresse "alice@domain.com"\n  ET (AND) un mot de passe configuré "Secret123!"\n  QUAND (WHEN) l\'utilisateur saisit ses identifiants et clique sur "Se connecter"\n  ALORS (THEN) la session est ouverte avec succès\n  ET (AND) l\'utilisateur est redirigé vers son tableau de bord personnel</code></pre>',
        '  <p><strong>Règle de rigueur :</strong> Le contexte initial (GIVEN) prépare l’état du système ; l’action déclenchante (WHEN) simule l’interaction de l’utilisateur ; le résultat attendu (THEN) formule l’assertion observable. L’enchaînement séquentiel doit être strictement respecté.</p>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'L’Estimation Relative : Story Points, Planning Poker et Suite de Fibonacci',
      html: [
        '<p>Estimer une tâche logicielle en heures absolues est notoirement imprécis : deux développeurs (junior et senior) ne mettront jamais le même temps, mais ils s’accorderont sur le fait que la fonctionnalité B est deux fois plus complexe que la fonctionnalité A. L’agilité utilise l’<strong>effort relatif en Story Points</strong> :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. La Suite de Fibonacci Modifiée</h4>',
        '    <p>L’échelle de référence universelle est : <code>[0, 1, 2, 3, 5, 8, 13, 20, 40, 100]</code>.</p>',
        '    <p>Cette progression non linéaire reflète la <em>loi de Weber-Fechner</em> en psychophysique : plus un objet est grand, plus l’incertitude augmente. Discuter pour savoir si une tâche vaut 20 ou 21 points est une perte de temps stérile ; passer de 13 à 20 exprime un saut réel d’inconnu.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Le Déroulement du Planning Poker</h4>',
        '    <ul>',
        '      <li>1. Le PO présente la User Story et répond aux questions techniques.</li>',
        '      <li>2. Chaque développeur choisit une carte secrète face cachée.</li>',
        '      <li>3. Révélation simultanée pour éviter tout biais d’ancrage ou influence hiérarchique.</li>',
        '      <li>4. Si consensus : la note est validée.</li>',
        '      <li>5. Si grand écart : le plus bas et le plus haut expliquent leurs arguments respectifs, puis un nouveau vote intervient.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],
  methodTitle: 'Méthode d’Ingénierie : Raffinement de Backlog et Estimation Collective en Planning Poker',
  method: [
    'Étape 1 : Préparer la session de Backlog Refinement avec le PO en sélectionnant les 5 à 10 stories prioritaires.',
    'Étape 2 : Pour chaque story, lire la description narrative et examiner les critères d’acceptation Gherkin.',
    'Étape 3 : Vérifier la conformité de la story aux critères INVEST ; si elle est trop volumineuse (Epics), la découper immédiatement.',
    'Étape 4 : Choisir ou rappeler une User Story de référence (Golden Story) valant 2 ou 3 Story Points.',
    'Étape 5 : Lancer le vote de Planning Poker à cartes cachées, révéler les cartes simultanément et analyser les écarts.',
    'Étape 6 : Faire débattre les estimations extrêmes pour révéler les risques ou simplifications, revoter et enregistrer le consensus final.'
  ],
  summary: [
    'Le modèle des 3C de Ron Jeffries réunit Card (résumé), Conversation (dialogue) et Confirmation (critères d’acceptation).',
    'Le canevas narratif s’articule toujours autour de : En tant que (persona), Je veux (action), Afin de (valeur).',
    'La grille INVEST (Independent, Negotiable, Valuable, Estimable, Small, Testable) garantit la qualité d’une story.',
    'Le BDD et la syntaxe Gherkin (Given, When, Then) transforment les critères d’acceptation en tests automatisables.',
    'L’estimation en Story Points est relative et découplée des heures réelles de chaque développeur.',
    'Le Planning Poker utilise la suite de Fibonacci modifiée et évite les biais cognitifs grâce au vote secret simultané.'
  ],
  checklist: [
    'Je sais rédiger une User Story conforme au canevas des 3C et de Mike Cohn.',
    'Je maîtrise les 6 critères INVEST et sais diagnostiquer une story défaillante.',
    'Je sais formuler des critères d’acceptation en syntaxe Gherkin (Given - When - Then).',
    'Je comprends l’intérêt de l’estimation relative en Story Points par rapport aux heures absolues.',
    'Je connais la suite de Fibonacci modifiée et la justification cognitive de ses écarts croissants.',
    'Je sais animer une session de Planning Poker et gérer les divergences d’estimations.'
  ],
  notions: [
    'Modèle des 3C (Card, Conversation, Confirmation)',
    'Canevas narratif User Story (En tant que, Je veux, Afin de)',
    'Critères INVEST de Bill Wake',
    'Spécification par l’Exemple & BDD',
    'Syntaxe formelle Gherkin (Given, When, Then, And)',
    'Estimation relative en Story Points',
    'Planning Poker & Vote simultané sans ancrage',
    'Suite de Fibonacci modifiée'
  ],
  pitfalls: [
    'Rédiger des User Stories purement techniques sans bénéfice métier (ex: « En tant que dev, je veux créer la table SQL »).',
    'Convertir directement et mathématiquement 1 Story Point en un nombre fixe d’heures (ex: « 1 point = 1 jour »).',
    'Faire la moyenne arithmétique mathématique lors d’un désaccord majeur au Planning Poker au lieu de faire débattre.',
    'Considérer la User Story comme un document contractuel figé sans avoir de conversation approfondie avec l’équipe.'
  ],
  questions: [
    {
      stem: 'Dans le modèle des 3C de Ron Jeffries, que représente le « C » de « Confirmation » ?',
      opts: [
        'La signature d’un bon de commande par la direction',
        'Les critères d’acceptation formels permettant de vérifier objectivement si la story est achevée et conforme',
        'Un e-mail de félicitations envoyé aux développeurs',
        'La confirmation de présence à la réunion'
      ],
      correct: 1,
      exp: 'Confirmation désigne les critères d’acceptation (critères de validation) vérifiant que le besoin exprimé fonctionne comme attendu.'
    },
    {
      stem: 'Dans la grille d’évaluation INVEST, que signifie le critère « Small » ?',
      opts: [
        'Le texte de la story ne doit pas dépasser 5 mots',
        'La story doit pouvoir être facilement conçue, codée et testée au cours d’un seul Sprint',
        'Elle doit être confiée au développeur le plus jeune',
        'Elle ne doit nécessiter aucune base de données'
      ],
      correct: 1,
      exp: 'Une story Small est suffisamment réduite pour être achevée intégralement dans le cadre d’un sprint sans déborder sur le suivant.'
    },
    {
      stem: 'Dans la syntaxe BDD / Gherkin, quel mot-clé introduit l’action déclenchante réalisée par l’utilisateur ?',
      opts: [
        'GIVEN (Étant donné)',
        'WHEN (Quand / Lorsque)',
        'THEN (Alors)',
        'AND (Et)'
      ],
      correct: 1,
      exp: 'WHEN décrit l’événement ou l’action stimulatrice (ex: « Quand l’utilisateur clique sur Valider »).'
    },
    {
      stem: 'Pourquoi le vote du Planning Poker est-il obligatoirement réalisé face cachée et révélé simultanément ?',
      opts: [
        'Pour éviter que les développeurs ne copient sur leurs voisins pendant l’examen',
        'Pour neutraliser les biais cognitifs d’ancrage et empêcher les développeurs expérimentés d’influencer les autres',
        'Parce que les cartes sont magiques',
        'Pour accélérer la réunion en interdisant toute discussion'
      ],
      correct: 1,
      exp: 'Le vote simultané élimine le biais d’ancrage psychologique : chacun exprime son estimation authentique sans autocensure.'
    },
    {
      stem: 'Pourquoi la suite de Fibonacci (1, 2, 3, 5, 8, 13, 20...) est-elle utilisée pour calibrer les Story Points plutôt qu’une échelle linéaire (1, 2, 3, 4, 5, 6...) ?',
      opts: [
        'Parce que Fibonacci était un grand informaticien',
        'Parce que l’incertitude grandit proportionnellement à la taille de la tâche, rendant illusoire toute précision fine sur les gros volumes',
        'Pour limiter le nombre de réunions',
        'Parce que les nombres pairs sont interdits en agile'
      ],
      correct: 1,
      exp: 'Les écarts exponentiels reflètent l’augmentation de l’incertitude : plus une tâche est volumineuse, plus les détails cachés sont imprévisibles.'
    },
    {
      stem: 'Quelle formulation est un exemple parfait d’anti-pattern dans la rédaction d’une User Story ?',
      opts: [
        'En tant que client, je veux consulter mon historique d’achats afin de retrouver mes factures passées',
        'En tant que développeur backend, je veux créer la table Postgres users afin d’avoir des colonnes en base',
        'En tant que gestionnaire de stock, je veux recevoir une alerte SMS en cas de rupture afin de réapprovisionner à temps',
        'En tant que visiteur anonyme, je veux réinitialiser mon mot de passe afin de récupérer l’accès à mon compte'
      ],
      correct: 1,
      exp: 'Une story technique centrée sur l’implémentation interne sans valeur métier ni persona utilisateur réel est un anti-pattern.'
    },
    {
      stem: 'Lors d’un tour de Planning Poker, deux développeurs votent 2 points et deux autres votent 13 points. Que doit faire le Scrum Master ?',
      opts: [
        'Calculer la moyenne : (2 + 2 + 13 + 13) / 4 = 7.5 et arrondir à 8 points',
        'Inviter le vote le plus bas et le vote le plus haut à expliquer leurs visions techniques respectives pour partager l’information avant un second vote',
        'Imposer la décision du Product Owner',
        'Annuler le projet'
      ],
      correct: 1,
      exp: 'L’intérêt du Planning Poker réside dans le débat : le vote bas a peut-être trouvé une bibliothèque existante, tandis que le vote haut a vu un piège architectural.'
    },
    {
      stem: 'Que désigne le terme « Epic » dans la hiérarchie du Product Backlog ?',
      opts: [
        'Une grande User Story trop volumineuse pour être réalisée en un seul sprint et qui doit être découpée en stories plus petites',
        'Un bug critique ayant causé une panne de serveur',
        'Un développeur d’élite ayant 20 ans d’expérience',
        'Le document d’architecture système'
      ],
      correct: 0,
      exp: 'Un Epic est un macro-besoin ou thème de haut niveau nécessitant d’être décomposé verticalement en plusieurs User Stories INVEST.'
    }
  ],
  flashcards: [
    {
      q: 'Quels sont les 3C du modèle de Ron Jeffries ?',
      a: 'Card (le support résumé), Conversation (l’échange verbal continu), et Confirmation (les critères d’acceptation).'
    },
    {
      q: 'Quel est le canevas standard d’une User Story ?',
      a: 'En tant que [rôle], je veux [action], afin de [bénéfice métier].'
    },
    {
      q: 'Que signifie l’acronyme INVEST ?',
      a: 'Independent, Negotiable, Valuable, Estimable, Small, et Testable.'
    },
    {
      q: 'Quels sont les mots-clés de la syntaxe BDD Gherkin ?',
      a: 'GIVEN (contexte initial), WHEN (action déclenchante), THEN (résultat attendu), et AND (liaison).'
    },
    {
      q: 'Pourquoi estime-t-on en Story Points plutôt qu’en heures ?',
      a: 'Parce que l’estimation relative de complexité est universelle et partagée, alors que le temps dépend de l’expérience de chaque individu.'
    },
    {
      q: 'Quelle est la règle d’or en cas de désaccord au Planning Poker ?',
      a: 'Faire expliquer leurs visions par l’estimation la plus basse et la plus haute, puis revoter pour converger vers un consensus éclairé.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Rédaction de stories purement techniques sans bénéfice métier ou assimilation des Story Points à des jours-hommes fixes.'
    },
    {
      cls: 'medium',
      text: 'Bonne application de la grille INVEST, critères d’acceptation Gherkin clairs et facilitation efficace du Planning Poker.'
    },
    {
      cls: 'high',
      text: 'Maîtrise experte du découpage vertical d’Epics complexes, déploiement du BDD à l’échelle et calibration fine de la complexité relative.'
    }
  ]
};
