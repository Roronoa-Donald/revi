/**
 * Chapitre 2 du cours « Méthodes Agiles B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 2,
  title: 'Le Cadre Scrum : Rôles, Artefacts &amp; Cérémonies',
  short: 'Le Cadre Scrum',
  toc: 'Rôles Scrum (PO, SM, Developers), artefacts (Product Backlog, Sprint Backlog, Incrément, DoD), cérémonies (Planning, Daily, Review, Rétro) et timeboxing.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B3 et plus',
  situation: 'Scrum est aujourd’hui le cadre agile le plus déployé dans l’industrie du logiciel. Décrit dans le Scrum Guide officiel par Ken Schwaber et Jeff Sutherland, Scrum est défini comme un cadre léger aidant les personnes, les équipes et les organisations à générer de la valeur grâce à des solutions adaptatives pour des problèmes complexes. Loin d’être une méthodologie prescriptive lourde, Scrum repose sur un ensemble précis et non négociable de 3 rôles (responsabilités), 3 artefacts (chacun lié à un engagement formel) et 5 événements strictement bornés dans le temps (timeboxés). En troisième année de Bachelor, l’ingénieur doit dépasser les caricatures du « Scrum de façade » (Dark Scrum ou Zombie Scrum) pour comprendre la dynamique interne de l’auto-organisation, l’indépendance du Product Owner pour maximiser la valeur, la posture de leader serviteur du Scrum Master et la rigueur absolue de la Definition of Done.',
  objectives: [
    'définir avec précision les 3 responsabilités de l’équipe Scrum (Product Owner, Scrum Master, Developers) ;',
    'comprendre les 3 artefacts Scrum (Product Backlog, Sprint Backlog, Incrément) et leurs engagements respectifs ;',
    'appliquer les règles strictes de la Definition of Done (DoD) pour garantir la qualité livrable de chaque incrément ;',
    'animer et respecter le timeboxing officiel des 5 événements Scrum (Sprint, Planning, Daily, Review, Rétrospective) ;',
    'analyser les mécanismes d’auto-organisation et d’amélioration continue au sein d’une équipe pluridisciplinaire ;',
    'développer en Python 3 des auditeurs de Definition of Done, des ordonnanceurs de backlog par ROI et des contrôleurs de timeboxing.'
  ],
  sections: [
    {
      title: 'L’Équipe Scrum : Responsabilités et Séparation des Pouvoirs (PO, SM, Developers)',
      html: [
        '<p>L’équipe Scrum est une unité autonome, pluridisciplinaire et sans hiérarchie interne, composée idéalement de 10 personnes ou moins. Elle réunit trois rôles complémentaires assurant un équilibre sain des pouvoirs :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. Le Product Owner (PO) : Garant de la Valeur</h4>',
        '    <p>Le <strong>Product Owner</strong> est le propriétaire unique du Product Backlog. Il maximise la valeur du produit résultant du travail de l’équipe :</p>',
        '    <ul>',
        '      <li>Définit la vision du produit et l’Objectif de Produit (Product Goal).</li>',
        '      <li>Rédige et ordonnance les éléments du Product Backlog en fonction du ROI, des retours clients et des opportunités marché.</li>',
        '      <li>Prend les décisions finales sur le périmètre sans ingérence extérieure.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Le Scrum Master (SM) : Leader Serviteur &amp; Coach</h4>',
        '    <p>Le <strong>Scrum Master</strong> veille à l’efficacité de l’équipe et à l’adoption saine du cadre Scrum :</p>',
        '    <ul>',
        '      <li>Facilite les événements Scrum et garantit le respect des boîtes de temps.</li>',
        '      <li>Élimine les obstacles et blocages (impediments) qui freinent les développeurs.</li>',
        '      <li>Protège l’équipe des interférences extérieures et promeut l’auto-organisation.</li>',
        '      <li>Ne manage pas hiérarchiquement l’équipe : il agit comme un coach.</li>',
        '    </ul>',
        '  </div>',
        '</div>',
        '<p><strong>Les Développeurs (Developers)</strong> : Professionnels de l’équipe engagés à créer tout aspect d’un incrément utilisable à chaque Sprint. Ils sont responsables de la conception technique, de l’estimation de l’effort, du respect de la Definition of Done et de l’adaptation quotidienne de leur plan vers l’Objectif de Sprint.</p>'
      ].join('\n')
    },
    {
      title: 'Les 3 Artefacts et leurs Engagements Respectifs (Backlogs, Incrément &amp; DoD)',
      html: [
        '<p>Dans Scrum, chaque artefact est associé à un <strong>engagement formel</strong> apportant clarté et mesure objective de la progression empirique :</p>',
        '<table class="table">',
        '  <thead>',
        '    <tr><th>Artefact Scrum</th><th>Engagement Lié (Scrum Guide 2020)</th><th>Définition &amp; Rôle Opérationnel</th></tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr><td><strong>Product Backlog</strong></td><td><strong>Product Goal</strong> (Objectif de Produit)</td><td>Liste ordonnée et dynamique de tout ce qui pourrait être nécessaire dans le produit. Le Product Goal décrit l’état futur ciblé servant de cible à long terme.</td></tr>',
        '    <tr><td><strong>Sprint Backlog</strong></td><td><strong>Sprint Goal</strong> (Objectif de Sprint)</td><td>Ensemble des éléments du Product Backlog sélectionnés pour le Sprint, accompagnés du plan d’action concret pour les réaliser. Le Sprint Goal apporte cohérence et flexibilité.</td></tr>',
        '    <tr><td><strong>Incrément (Increment)</strong></td><td><strong>Definition of Done</strong> (DoD)</td><td>Un pas concret vers le Product Goal. L’Incrément doit être utilisable et potentiellement livrable dès la fin du Sprint, en conformité absolue avec la Definition of Done.</td></tr>',
        '  </tbody>',
        '</table>',
        '<div class="card">',
        '  <h4>La Rigueur de la Definition of Done (DoD)</h4>',
        '  <p>La <strong>Definition of Done</strong> est une entente formelle et partagée par toute l’équipe sur les standards de qualité exigés pour qu’un travail soit considéré comme terminé (ex: tests unitaires exécutés avec succès, revue de code par les pairs validée, documentation technique rédigée, absence de vulnérabilités statiques, déploiement automatisé validé sur staging). Si un élément ne satisfait pas la DoD, il ne peut <em>jamais</em> être mis en production ni présenté en revue comme terminé : il réintègre le Product Backlog.</p>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Les 5 Événements Scrum et la Règle du Timeboxing',
      html: [
        '<p>Tous les événements Scrum sont <strong>timeboxés</strong> (durée maximale prédéfinie) pour instaurer une régularité et éviter les dérives chronophages :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. Le Sprint (Conteneur de 1 à 4 semaines)</h4>',
        '    <p>Le cœur battant de Scrum. Sa durée est fixe et régulière. Un nouveau Sprint commence immédiatement après la clôture du précédent. Aucun changement n’est apporté qui compromettrait le Sprint Goal.</p>',
        '    <h4>2. Sprint Planning (4h max pour 2 sem.)</h4>',
        '    <p>L’équipe répond à trois questions fondamentales : <em>Pourquoi ce Sprint a-t-il de la valeur ? Que peut-on faire dans ce Sprint ? Comment le travail choisi sera-t-il réalisé ?</em></p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>3. Daily Scrum (15 minutes strictes)</h4>',
        '    <p>Réunion quotidienne des Developers pour inspecter la progression vers le Sprint Goal et adapter le plan d’action des prochaines 24 heures. Ce n’est pas une réunion de reporting au chef de projet, mais un alignement entre pairs.</p>',
        '    <h4>4. Sprint Review &amp; Retrospective</h4>',
        '    <p><strong>Review (2h max pour 2 sem.)</strong> : Démonstration de l’incrément terminé aux parties prenantes et adaptation du Product Backlog.<br>' +
        '    <strong>Rétrospective (1h30 max pour 2 sem.)</strong> : L’équipe inspecte ses fonctionnements internes (outils, processus, relations humaines) et définit au moins une action concrète d’amélioration pour le prochain Sprint.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Auto-organisation, Rétrospective et Amélioration Continue (Kaisen)',
      html: [
        '<p>L’efficacité d’une équipe Scrum repose sur l’<strong>auto-organisation (self-management)</strong> : les développeurs décident en interne de qui fait quoi, quand et comment, sans recevoir d’ordres unilatéraux de management.</p>',
        '<p>La <strong>Sprint Retrospective</strong> est le moteur de l’amélioration continue (principe Kaizen issu du Lean) :</p>',
        '<ul>',
        '  <li><strong>Directive première de Norman Kerth</strong> : <em>« Indépendamment de ce que nous découvrons, nous comprenons et croyons sincèrement que chacun a fait de son mieux, compte tenu de ce qu’il savait à ce moment-là, de ses compétences, des ressources disponibles et de la situation. »</em></li>',
        '  <li>L’équipe utilise des canevas visuels (Keep / Drop / Start, Speedboat, Glad / Sad / Mad) pour identifier les irritants sans recherche de coupable.</li>',
        '  <li>Une action d’amélioration SMART est obligatoirement inscrite dans le Sprint Backlog du Sprint suivant pour être mesurée et appliquée.</li>',
        '</ul>'
      ].join('\n')
    }
  ],
  methodTitle: 'Méthode d’Ingénierie : Lancement et Animation d’un Sprint Scrum de Bout en Bout',
  method: [
    'Étape 1 : Session de Backlog Refinement en amont du sprint pour clarifier les User Stories prioritaires avec le PO.',
    'Étape 2 : Conduire le Sprint Planning pour sélectionner les stories, définir collectivement le Sprint Goal et découper les tâches techniques.',
    'Étape 3 : Animer le Daily Scrum chaque matin en 15 minutes chrono face au Sprint Backlog pour lever les blocages opérationnels.',
    'Étape 4 : Développer les incréments en binômage ou revue de code en appliquant rigoureusement les critères de la Definition of Done.',
    'Étape 5 : Animer la Sprint Review avec les parties prenantes pour démontrer l’incrément fonctionnel et recueillir des retours d’expérience concrets.',
    'Étape 6 : Conduire la Sprint Retrospective pour identifier les pistes d’amélioration d’équipe et intégrer une action corrective immédiate au prochain sprint.'
  ],
  summary: [
    'L’équipe Scrum est pluridisciplinaire et auto-organisée, composée du Product Owner, du Scrum Master et des Developers.',
    'Le PO maximise la valeur et gère le Product Backlog ; le SM coache et élimine les blocages ; les Developers créent l’Incrément.',
    'Les 3 artefacts portent chacun un engagement : Product Goal pour le Product Backlog, Sprint Goal pour le Sprint Backlog, Definition of Done pour l’Incrément.',
    'La Definition of Done (DoD) est le contrat de qualité non négociable garantissant qu’un incrément est potentiellement livrable.',
    'Les 5 événements Scrum (Sprint, Planning, Daily, Review, Rétrospective) sont tous strictement timeboxés.',
    'Le Daily Scrum dure 15 minutes au maximum et sert à aligner les développeurs face au Sprint Goal, non à faire du reporting.'
  ],
  checklist: [
    'Je sais expliciter les responsabilités respectives du PO, du SM et des Developers.',
    'Je comprends pourquoi un Product Owner ne doit pas être le supérieur hiérarchique direct des développeurs.',
    'Je connais les 3 artefacts Scrum et leurs 3 engagements officiels (Product Goal, Sprint Goal, DoD).',
    'Je sais expliquer ce qu’est la Definition of Done et pourquoi un travail non Done ne peut pas être livré.',
    'Je maîtrise le rôle et la timebox officielle de chaque événement Scrum.',
    'Je sais animer une rétrospective sans blâme en appliquant la directive première de Kerth.'
  ],
  notions: [
    'Équipe Scrum (PO, SM, Developers)',
    'Product Backlog & Product Goal',
    'Sprint Backlog & Sprint Goal',
    'Incrément utilisable & Definition of Done (DoD)',
    'Événements timeboxés Scrum',
    'Sprint Planning (Capacité & Découpage)',
    'Daily Scrum (15 minutes d’alignement)',
    'Sprint Retrospective & Amélioration Kaizen'
  ],
  pitfalls: [
    'Transformer le Daily Scrum en séance de reporting individuel face au chef de projet plutôt qu’en alignement entre développeurs.',
    'Faire varier la durée des Sprints selon le volume de fonctionnalités restant à coder (le rythme régulier doit rester intangible).',
    'Accepter en revue ou en production un élément qui ne respecte pas l’intégralité des critères de la Definition of Done.',
    'Faire l’impasse sur la Sprint Retrospective sous prétexte d’urgence de livraison (ce qui tue la capacité d’adaptation de l’équipe).'
  ],
  questions: [
    {
      stem: 'Dans le cadre Scrum, qui est l’unique personne responsable de la priorisation et de la gestion du Product Backlog ?',
      opts: [
        'Le Scrum Master',
        'Le Product Owner',
        'Le Lead Developer',
        'Le client externe'
      ],
      correct: 1,
      exp: 'Le Product Owner est l’unique responsable de la gestion du Product Backlog et de la maximisation de la valeur du produit.'
    },
    {
      stem: 'Quel engagement est officiellement lié à l’artefact de l’Incrément dans le Scrum Guide ?',
      opts: [
        'Le Product Goal',
        'Le Sprint Goal',
        'La Definition of Done (DoD)',
        'Le cahier des charges fonctionnel'
      ],
      correct: 2,
      exp: 'L’Incrément est formellement lié à la Definition of Done : dès qu’un élément de backlog satisfait la DoD, un nouvel incrément naît.'
    },
    {
      stem: 'Quelle est la durée maximale autorisée pour le Daily Scrum, quelle que soit la durée du Sprint ?',
      opts: [
        '10 minutes',
        '15 minutes',
        '30 minutes',
        '1 heure'
      ],
      correct: 1,
      exp: 'Le Daily Scrum est un événement strictement timeboxé à 15 minutes au maximum chaque jour ouvrable.'
    },
    {
      stem: 'Que doit faire l’équipe Scrum si un élément sélectionné dans le Sprint n’est pas totalement terminé selon la DoD à la fin du Sprint ?',
      opts: [
        'Le déployer quand même en production et corriger les bugs plus tard',
        'Prolonger la durée du Sprint de quelques jours pour le terminer',
        'Ne pas le présenter en Review, ne pas le compter dans la vélocité et le réintégrer dans le Product Backlog',
        'Supprimer temporairement les critères DoD non satisfaits'
      ],
      correct: 2,
      exp: 'Un travail non conforme à la DoD ne peut ni être mis en production ni comptabilisé dans la vélocité. Le PO réévalue sa priorité dans le Product Backlog.'
    },
    {
      stem: 'Quel est l’objectif premier de la Sprint Retrospective ?',
      opts: [
        'Identifier le coupable des bugs du sprint pour lui infliger un avertissement',
        'Inspecter le déroulement du sprint passé (personnes, processus, outils) et planifier des améliorations concrètes',
        'Présenter la démo du logiciel aux utilisateurs finaux',
        'Négocier le salaire des développeurs'
      ],
      correct: 1,
      exp: 'La Rétrospective est dédiée à l’inspection et à l’adaptation de l’équipe sur ses relations humaines, ses processus et sa qualité technique.'
    },
    {
      stem: 'Dans Scrum, qui décide de la manière technique dont les éléments du Sprint Backlog seront réalisés ?',
      opts: [
        'Le Product Owner seul',
        'Le Scrum Master seul',
        'Les Développeurs (Developers) en auto-organisation',
        'La direction informatique (DSI)'
      ],
      correct: 2,
      exp: 'Les Developers sont des professionnels autonomes : ils décident de la conception, de l’architecture et du plan technique d’implémentation.'
    },
    {
      stem: 'Pour un Sprint standard de 2 semaines, quelle est la timebox maximale recommandée pour le Sprint Planning ?',
      opts: [
        '2 heures',
        '4 heures',
        '8 heures',
        'Une journée entière'
      ],
      correct: 1,
      exp: 'Le Planning est calibré sur 2 heures par semaine de sprint : pour un sprint de 2 semaines, la durée maximale est de 4 heures (8h pour 4 semaines).'
    },
    {
      stem: 'Pourquoi est-il fortement déconseillé qu’un Scrum Master soit également le manager hiérarchique direct des développeurs de l’équipe ?',
      opts: [
        'Parce que le Scrum Master n’a pas le droit d’avoir de compte e-mail',
        'Parce que cela crée un rapport d’autorité qui inhibe la transparence, la sécurité psychologique et la capacité à exprimer les difficultés lors des rétrospectives',
        'Parce que la loi du travail l’interdit',
        'Parce que le Scrum Master doit obligatoirement être un stagiaire'
      ],
      correct: 1,
      exp: 'Le Scrum Master est un leader serviteur et un facilitateur. Un lien hiérarchique direct détruit la confiance et la sécurité psychologique indispensables à l’empirisme.'
    }
  ],
  flashcards: [
    {
      q: 'Quels sont les 3 rôles de l’équipe Scrum ?',
      a: 'Le Product Owner, le Scrum Master et les Developers.'
    },
    {
      q: 'Quels sont les 3 artefacts Scrum et leurs engagements ?',
      a: 'Product Backlog (Product Goal), Sprint Backlog (Sprint Goal), et Incrément (Definition of Done).'
    },
    {
      q: 'Qu’est-ce que la Definition of Done (DoD) ?',
      a: 'Une entente formelle et partagée décrivant l’ensemble des critères de qualité requis pour qu’un travail soit considéré comme achevé.'
    },
    {
      q: 'Quelle est la durée maximale d’un Daily Scrum ?',
      a: '15 minutes strictes chaque jour pour les Developers.'
    },
    {
      q: 'Quelle est la différence entre Sprint Review et Sprint Retrospective ?',
      a: 'La Review inspecte le produit avec les parties prenantes ; la Rétrospective inspecte le fonctionnement interne de l’équipe.'
    },
    {
      q: 'Peut-on modifier la durée d’un Sprint en cours de route ?',
      a: 'Non, la cadence temporelle d’un Sprint est fixe pour garantir un rythme soutenable et des métriques de vélocité fiables.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Confusion entre les rôles Scrum ou assimilation du Daily Scrum à une réunion de reporting hiérarchique.'
    },
    {
      cls: 'medium',
      text: 'Bonne application des timeboxes d’événements, rédaction d’une DoD complète et respect de la dynamique d’équipe.'
    },
    {
      cls: 'high',
      text: 'Capacité experte à animer les rituels Scrum, posture mature de leader serviteur, élimination des dérives organisationnelles et facilitation de l’auto-organisation.'
    }
  ]
};
