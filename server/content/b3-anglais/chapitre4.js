/**
 * Chapitre 4 du cours « Anglais B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 4,
  title: 'Anglais Participatif en Équipe Agile : Standups, Rétrospectives &amp; SLAs',
  short: 'Équipe Agile, Standups &amp; SLAs',
  toc: 'Intervention orale dans les rituels agiles en anglais (Daily Standup meetings avec Yesterday, Today, Blockers et interruptions courtoises), calculs mathématiques et contractuels de disponibilité de service (SLAs à 3 ou 4 nines, MTBF, MTTR, pénalités financières) et conduite de rétrospectives d’itération (sprint retrospectives, sentiments et plans d’action).',
  time: '≈ 2 h 45 de travail',
  free: false,
  situation: 'Dans un squad de développement ou une équipe d’exploitation SRE internationale, le rituel du matin (Daily Standup) ne dure que 15 minutes et impose à chaque ingénieur de résumer ses avancées de manière synthétique et énergique en anglais. Être incapable d’exprimer clairement un blocage technique (« I am blocked by... ») ou hésiter sur la négociation des métriques de disponibilité d’un contrat client (confondre 99.9% et 99.99% d’uptime représente une différence de plusieurs heures de panne par mois) paralyse la dynamique d’équipe et expose l’entreprise à des pénalités financières majeures.',
  objectives: [
    'intervenir avec aisance et concision lors d’un Daily Standup meeting en articulant réalisations passées, priorités du jour et obstacles ;',
    'employer des formules d’interruption courtoise et de relance constructive en réunion technique (« Could I just jump in? », « If I could add to that... ») ;',
    'calculer mathématiquement le temps d’indisponibilité mensuel toléré selon le taux de SLA et déterminer les pénalités contractuelles ;',
    'animer une rétrospective de sprint en anglais en catégorisant les retours positifs, les freins rencontrés et les plans d’action formalisés ;',
    'analyser et résoudre méthodologiquement des parseurs de compte-rendus de standup, des calculateurs de conformité de SLA et des agrégateurs de rétrospectives.'
  ],
  sections: [
    {
      title: 'Le Daily Standup Meeting en Anglais : Clarté, Rythme &amp; Efficacité',
      html: [
        '<p>Le Daily Standup (ou Daily Scrum) est une synchronisation quotidienne minutée (timebox de 15 minutes) reposant sur trois questions rituelles :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Les Trois Questions Cardinales du Standup</h4>',
        '    <ul>',
        '      <li><strong>1. What did you accomplish yesterday?</strong><br>Exemples : <i>"Yesterday, I wrapped up the Terraform module for VPC peering."</i>, <i>"I pushed the fix for database deadlocks and opened a pull request."</i></li>',
        '      <li><strong>2. What will you work on today?</strong><br>Exemples : <i>"Today, I plan to deploy the ingress controller to staging."</i>, <i>"I’m pairing with David to investigate Redis cache misses."</i></li>',
        '      <li><strong>3. Are there any blockers or impediments?</strong><br>Exemples : <i>"No blockers on my end, all good."</i>, <i>"I am currently blocked by missing IAM credentials on the AWS staging account."</i></li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Formules d’Interaction et d’Interruption Courtoise</h4>',
        '    <ul>',
        '      <li><strong>Intervenir poliment :</strong> <i>"Could I just jump in here for a second?"</i>, <i>"Sorry to interrupt, but regarding the database migration..."</i></li>',
        '      <li><strong>Demander des éclaircissements :</strong> <i>"Could you clarify what you mean by latency spike?"</i>, <i>"Are we targeting Europe or US-East for this deployment?"</i></li>',
        '      <li><strong>Proposer une entraide post-standup :</strong> <i>"Let’s take this offline after the standup."</i>, <i>"I can pair with you right after this meeting to unblock the build."</i></li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Contrats de Service (SLAs) : Métriques de Disponibilité &amp; Pénalités',
      html: [
        '<p>Dans les contrats de Cloud ou d’infogérance internationaux, le Service Level Agreement formalise les objectifs de qualité de service et les conséquences de leur non-respect :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Métriques Fondamentales de Fiabilité</h4>',
        '    <ul>',
        '      <li><strong>MTBF (Mean Time Between Failures) :</strong> temps moyen écoulé entre deux pannes consécutives. Mesure la fiabilité intrinsèque de l’architecture.</li>',
        '      <li><strong>MTTR (Mean Time to Repair / Recover) :</strong> temps moyen nécessaire pour diagnostiquer, corriger et restaurer le service après un incident. Mesure l’efficacité opérationnelle de l’équipe SRE.</li>',
        '      <li><strong>Service Credits :</strong> pénalités financières accordées au client sous forme d’avoirs sur facture en cas de manquement au taux de disponibilité contractuel.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Calcul Mathématique du Temps de Panne Toléré</h4>',
        '    <p>Pour un mois de 30 jours ($30 \\times 24 \\times 60 = 43\\,200$ minutes) :</p>',
        '    <ul>',
        '      <li><strong>99.9% Uptime (Three Nines) :</strong> $43\\,200 \\times 0.001 = 43.2$ minutes de panne tolérées par mois.</li>',
        '      <li><strong>99.95% Uptime :</strong> $43\\,200 \\times 0.0005 = 21.6$ minutes de panne autorisées.</li>',
        '      <li><strong>99.99% Uptime (Four Nines) :</strong> $43\\,200 \\times 0.0001 = 4.32$ minutes de panne autorisées (environ 4 min 19 s).</li>',
        '      <li><strong>Règle contractuelle :</strong> Toute fraction d’heure de dépassement au-delà de la tolérance déclenche une pénalité financière horaire pleine (arrondi supérieur plafond).</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Rétrospectives de Sprint : Célébrations, Freins &amp; Plans d’Action',
      html: [
        '<p>La rétrospective agile réunit l’équipe à chaque fin d’itération pour inspecter et adapter les processus de travail :</p>',
        '<table class="table">',
        '  <thead><tr><th>Catégorie de Retour</th><th>Expression Anglophone Usuelle</th><th>Exemple d’Échange en Équipe</th></tr></thead>',
        '  <tbody>',
        '    <tr><td><strong>What Went Well (Succès)</strong></td><td><i>"Kudos to...", "We successfully managed to..."</i></td><td><i>"Kudos to the DevOps team: the new container build caching halved our CI pipeline execution time."</i></td></tr>',
        '    <tr><td><strong>What Didn’t Go Well (Freins)</strong></td><td><i>"We struggled with...", "A major pain point was..."</i></td><td><i>"A major pain point this sprint was the unmocked third-party payment sandbox, which broke integration tests."</i></td></tr>',
        '    <tr><td><strong>Action Items (Actions)</strong></td><td><i>"Action item: [Owner] will [Verb]..."</i></td><td><i>"Action item: Maria will set up an in-memory mock server for payment webhooks before the next sprint planning."</i></td></tr>',
        '  </tbody>',
        '</table>'
      ].join('\n')
    }
  ],
  method: [
    'Préparer son intervention de daily standup en structurant ses 3 points (Yesterday, Today, Blockers) en moins de 90 secondes.',
    'Formuler explicitement toute dépendance bloquante en indiquant l’équipe ou la ressource attendue.',
    'Utiliser des formules d’interruption courtoise (« Could I jump in? ») pour recadrer un débat technique hors sujet.',
    'Calculer le temps de panne mensuel toléré à partir du taux de SLA pour évaluer l’impact d’une fenêtre de maintenance.',
    'Assigner chaque point d’amélioration de rétrospective (Action Item) à un responsable unique identifié.'
  ],
  summary: [
    'Le Daily Standup meeting répond aux questions Yesterday, Today et Blockers dans une limite stricte de 15 minutes.',
    'L’expression « Let’s take this offline » évite de dériver sur des détails techniques complexes en séance plénière.',
    'Le taux de disponibilité SLA fixe mathématiquement le downtime toléré (ex. 43.2 min/mois pour 99.9%).',
    'Le MTBF évalue la fiabilité de l’architecture et le MTTR mesure la vitesse de restauration par l’équipe d’astreinte.',
    'Une rétrospective de sprint réussie débouche sur des Action Items mesurables dotés d’un porteur (Owner) attitré.'
  ],
  checklist: [
    'Mon intervention de standup prend-elle moins de 90 secondes ?',
    'Ai-je signalé mes bloqueurs avec précision sans accuser personnellement mes collègues ?',
    'Sais-je calculer le downtime mensuel toléré pour un contrat à 99.95% ?',
    'Ai-je proposé de « take offline » une discussion technique qui s’éternise ?',
    'Nos retours de rétrospective sont-ils traduits en actions concrètes avec un Owner désigné ?'
  ],
  notions: [
    'Rituel du Daily Standup (Yesterday, Today, Blockers)',
    'Gestion du temps (Timeboxing de 15 minutes)',
    'Formules d’interruption courtoise en anglais',
    'Service Level Agreement (SLA)',
    'MTBF (Mean Time Between Failures)',
    'MTTR (Mean Time to Repair / Recover)',
    'Service Credits & Pénalités contractuelles',
    'Sprint Retrospectives & Action Items'
  ],
  pitfalls: [
    'Transformer le Daily Standup en séance de débogage technique approfondie au lieu de « take offline » le sujet.',
    'Omettre de signaler un bloqueur par timidité, retardant l’ensemble de la livraison du sprint.',
    'Confondre 99.9% et 99.99% d’uptime, sous-estimant d’un facteur 10 la sévérité des exigences de résilience.',
    'Clore une rétrospective de sprint sans attribuer de responsable aux actions décidées.'
  ],
  questions: [
    {
      stem: 'Dans un Daily Standup meeting agile, quelle est la façon la plus claire et professionnelle d’annoncer que l’on est bloqué par une attente de validation ?',
      opts: [
        'I cannot do anything because others are very slow.',
        'I am currently blocked by pending code reviews on pull request 42.',
        'The project is totally stopped on my computer.',
        'Nobody cares about my tickets today.'
      ],
      correct: 1,
      exp: '« I am currently blocked by pending code reviews on PR 42 » formule le blocage avec précision, objectivité et sans agressivité.'
    },
    {
      stem: 'Que signifie l’expression « Let’s take this offline » prononcée au cours d’un Daily Standup meeting ?',
      opts: [
        'Il faut débrancher le routeur Ethernet immédiatement.',
        'Cette discussion technique détaillée dépasse le cadre des 15 minutes et doit se poursuivre entre les personnes concernées après la réunion.',
        'Le projet est annulé et l’équipe est renvoyée chez elle.',
        'Il faut éteindre tous les serveurs de production.'
      ],
      correct: 1,
      exp: '« Take this offline » est l’expression consacrée pour sortir un débat technique trop long de la réunion collective et le traiter en petit comité.'
    },
    {
      stem: 'Combien de temps de coupure cumulé maximal par mois de 30 jours (43 200 minutes) un contrat garantissant 99.9% de disponibilité autorise-t-il ?',
      opts: [
        '4.32 minutes',
        '43.2 minutes',
        '432 minutes (~7 heures)',
        '120 minutes'
      ],
      correct: 1,
      exp: '43 200 minutes x (100 - 99.9)% = 43 200 x 0.001 = 43.2 minutes de temps de panne tolérées.'
    },
    {
      stem: 'Que mesure l’indicateur MTTR (Mean Time to Repair / Recover) dans une équipe SRE ?',
      opts: [
        'Le temps moyen écoulé entre deux réunions d’équipe.',
        'Le temps moyen nécessaire pour remettre un service en état nominal après la survenue d’un incident.',
        'Le salaire horaire moyen des développeurs seniors.',
        'Le nombre de commits fusionnés chaque semaine.'
      ],
      correct: 1,
      exp: 'Le MTTR mesure la rapidité avec laquelle l’équipe diagnostique, mitige et résout une défaillance de production.'
    },
    {
      stem: 'Quelle phrase en anglais est la plus appropriée pour interrompre poliment un collègue lors d’un débat technique en visioconférence ?',
      opts: [
        'Shut up, I want to talk right now.',
        'Could I just jump in here for a moment?',
        'You are completely wrong, listen to me.',
        'Stop talking about that.'
      ],
      correct: 1,
      exp: '« Could I just jump in here for a moment? » ou « If I could add to that... » sont les formules d’interruption courtoises standards.'
    },
    {
      stem: 'Dans une rétrospective de sprint, quelle composante transforme un constat négatif en progrès tangible pour l’itération suivante ?',
      opts: [
        'L’attribution d’un blâme public au responsable.',
        'La définition d’un Action Item clair, daté et attribué à un responsable unique (Owner).',
        'L’allongement de la durée de la réunion de deux heures.',
        'La suppression définitive de la fonctionnalité incriminée.'
      ],
      correct: 1,
      exp: 'Un Action Item clair et assigné à un porteur désigné (Owner) est l’élément indispensable pour concrétiser l’amélioration continue.'
    },
    {
      stem: 'Que désignent les « Service Credits » dans la gestion d’un contrat de fournisseur Cloud international ?',
      opts: [
        'Des jetons de jeu vidéo offerts aux ingénieurs.',
        'Des déductions financières ou avoirs appliqués sur la facture du client suite à un dépassement de SLA.',
        'Des points de fidélité permettant de commander du matériel de bureau.',
        'Des certificats d’assiduité délivrés par le fournisseur.'
      ],
      correct: 1,
      exp: 'Les Service Credits représentent la compensation financière contractuelle due par le fournisseur de service en cas de non-respect du taux d’uptime garanti.'
    },
    {
      stem: 'Que signifie l’expression « What will you wrap up today? » formulée par un Scrum Master lors du standup ?',
      opts: [
        'Qu’allez-vous emballer dans un carton d’expédition ?',
        'Quelle tâche ou fonctionnalité prévoyez-vous de finaliser aujourd’hui ?',
        'Quel sandwich allez-vous commander pour le déjeuner ?',
        'Quelle réunion allez-vous annuler dans l’après-midi ?'
      ],
      correct: 1,
      exp: 'Le verbe à particule « to wrap up » signifie finaliser, conclure ou terminer une tâche en cours.'
    }
  ],
  flashcards: [
    {
      q: 'Quelles sont les trois questions fondamentales d’un Daily Standup meeting ?',
      a: 'What did you do yesterday? What will you do today? Are there any blockers?'
    },
    {
      q: 'Que signifie « Let’s take this offline » en réunion technique ?',
      a: 'Poursuivre cette discussion spécifique en aparté après la réunion collective pour ne pas dépasser le temps alloué (timebox).'
    },
    {
      q: 'Quelle est la tolérance de panne mensuelle (30 jours) pour un SLA à « three nines » (99.9%) ?',
      a: '43.2 minutes de temps d’indisponibilité cumulé maximal autorisé.'
    },
    {
      q: 'Quelle est la différence entre MTBF et MTTR ?',
      a: 'MTBF (Mean Time Between Failures) mesure le temps moyen entre deux pannes (fiabilité). MTTR (Mean Time to Repair) mesure le temps moyen de résolution d’une panne (résilience).'
    },
    {
      q: 'Comment formule-t-on une interruption polie en anglais ?',
      a: '« Could I just jump in here for a second? » ou « If I could add to that... »'
    },
    {
      q: 'Qu’est-ce qu’un « Action Item » lors d’une rétrospective agile ?',
      a: 'Une tâche concrète d’amélioration, avec un livrable précis et un responsable désigné (Owner) pour la prochaine itération.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Difficultés à formuler ses points de standup en anglais ou erreurs dans le calcul mathématique de disponibilité SLA.'
    },
    {
      cls: 'medium',
      text: 'Interventions fluides en standup, interruptions courtoises adaptées et calcul exact des pénalités contractuelles.'
    },
    {
      cls: 'high',
      text: 'Leadership agile remarquable : animation dynamique de rétrospectives, maîtrise des métriques MTBF/MTTR et négociation de SLA.'
    }
  ]
};
