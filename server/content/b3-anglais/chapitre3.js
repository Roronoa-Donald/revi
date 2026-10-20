/**
 * Chapitre 3 du cours « Anglais B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 3,
  title: 'Communication Écrite Professionnelle : Emails, Bug Reports &amp; Escalades',
  short: 'Emails, Bug Reports &amp; Alertes',
  toc: 'Structure des emails techniques professionnels (clinique du mauvais email, registres formel et neutre, clarté des objets), rédaction de tickets d’anomalie exploitables (bug reports, étapes de reproduction, environnements et sévérités) et diffusion d’alertes d’escalade d’incidents critiques (incident broadcasts pour le management).',
  time: '≈ 2 h 45 de travail',
  free: false,
  situation: 'Lorsqu’un incident sévère frappe une plateforme de commerce ou une infrastructure de paiement en production, l’équipe d’astreinte doit communiquer immédiatement auprès de dizaines de collaborateurs répartis dans le monde. Un email confus portant un objet vague (« problem ») ou un ticket de bug incomplet (« login doesn’t work, fix it ») entraîne des allers-retours désastreux, augmente le temps moyen de résolution (MTTR) et entame la confiance de la direction. Un ingénieur système doit savoir structurer ses messages selon la règle des 3C (Clear, Concise, Actionable), adopter le registre approprié et formater des alertes d’escalade immédiatement exploitables.',
  objectives: [
    'diagnostiquer les défauts stylistiques et structurels d’un email technique mal rédigé et le réécrire selon les standards professionnels ;',
    'rédiger des objets d’emails précis incorporant la sévérité, l’environnement et le composant système concerné ;',
    'formaliser un rapport de bug complet avec étapes de reproduction numérotées, comportement attendu et observé ;',
    'construire un communiqué d’escalade d’incident critique (Executive Incident Broadcast) synthétisant le périmètre d’impact, le statut et les contournements ;',
    'développer en Python 3 des auditeurs de tonalité d’emails, des linters de structure de bug reports et des générateurs d’alertes de production.'
  ],
  sections: [
    {
      title: 'La Clinique des Mauvais Emails : Structure, Registre &amp; Clarté',
      html: [
        '<p>L’email professionnel est un document opérationnel dont l’objectif est de déclencher une action précise ou de partager un état sans ambiguïté :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Anatomie de l’Email Défaillant (The Sick Email)</h4>',
        '    <ul>',
        '      <li><strong>Objet flou :</strong> <code>Subject: hey</code> ou <code>help</code>. Ne donne aucune indication sur la criticité ou le service touché.</li>',
        '      <li><strong>Salutation déplacée :</strong> <code>Yo</code> ou <code>Hi guys</code> dans un échange formel ou inter-équipes.</li>',
        '      <li><strong>Corps imprécis et familier :</strong> <i>"The payment stuff is totally broken, fix it asap cause we gonna lose cash."</i> Utilisation d’argot (stuff, broken, gonna, asap).</li>',
        '      <li><strong>Clôture informelle :</strong> <code>thx</code> ou <code>bye</code> sans nom ni coordonnées de contact.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>L’Email Professionnel Rétabli (The Healthy Email)</h4>',
        '    <ul>',
        '      <li><strong>Objet descriptif :</strong> <code>URGENT: Take-ups Payment Gateway 500 Errors in Production</code>. Précise l’urgence, le système et le code HTTP.</li>',
        '      <li><strong>Salutation courtoise :</strong> <code>Hi Peter,</code> ou <code>Dear Infrastructure Team,</code>.</li>',
        '      <li><strong>Synthèse et impact chiffré :</strong> <i>"We are currently observing HTTP 500 errors on the checkout endpoint affecting approximately 15% of transactions since 14:15 UTC."</i></li>',
        '      <li><strong>Clôture professionnelle :</strong> <code>Best regards,</code> ou <code>Sincerely,</code> suivi de la signature de l’ingénieur.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Rédaction Rigoureuse de Bug Reports &amp; Tickets d’Anomalie',
      html: [
        '<p>Un rapport de bug (Jira, GitHub Issues, GitLab) doit permettre à un développeur de reproduire l’incident dans son environnement local sans poser la moindre question :</p>',
        '<table class="table">',
        '  <thead><tr><th>Champ Obligatoire</th><th>Rôle &amp; Bonnes Pratiques en Anglais</th><th>Exemple Concret</th></tr></thead>',
        '  <tbody>',
        '    <tr><td><strong>Title</strong></td><td>Résumé synthétique mentionnant l’action, le composant et l’effet constaté.</td><td><code>Checkout modal hangs indefinitely after clicking Pay with Card</code></td></tr>',
        '    <tr><td><strong>Environment</strong></td><td>Détail exact de la configuration client et serveur (OS, navigateur, commit git).</td><td><code>Production v2.4.1 — Chrome 121 on macOS 14.2 (Sonoma)</code></td></tr>',
        '    <tr><td><strong>Steps to Reproduce</strong></td><td>Liste ordonnée et numérotée (1., 2., 3.) des actions minimales pour déclencher le bogue.</td><td><code>1. Add item to cart; 2. Proceed to checkout; 3. Click Pay</code></td></tr>',
        '    <tr><td><strong>Expected Result</strong></td><td>Description claire du comportement nominal attendu par les spécifications.</td><td><code>Stripe processing spinner displays and confirmation receipt is returned</code></td></tr>',
        '    <tr><td><strong>Actual Result</strong></td><td>Description factuelle du comportement erroné constaté avec traces ou messages.</td><td><code>Modal freezes with no network activity; console logs Uncaught TypeError</code></td></tr>',
        '    <tr><td><strong>Severity</strong></td><td>Niveau d’impact technique : Critical, Major, Minor ou Trivial.</td><td><code>Major (blocking card checkout, PayPal fallback operates normally)</code></td></tr>',
        '  </tbody>',
        '</table>'
      ].join('\n')
    },
    {
      title: 'Escalade d’Incidents Critiques &amp; Bulletins Exécutifs',
      html: [
        '<p>Lors d’une panne majeure (SEV-1), la direction générale et les équipes support doivent être informées par des bulletins concis périodiques :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Structure d’un Incident Broadcast</h4>',
        '    <ul>',
        '      <li><strong>Subject Line :</strong> <code>[INCIDENT INC-402] SEV-1 Outage: AuthGateway (60% users affected)</code>.</li>',
        '      <li><strong>Current Status :</strong> qualification du stade de traitement (Active Mitigation, Root Cause Identified, Monitoring Recovery).</li>',
        '      <li><strong>Blast Radius (Impact) :</strong> pourcentage d’utilisateurs touchés, services dépendants dégradés et durée d’interruption cumulée.</li>',
        '      <li><strong>Workaround :</strong> solution de contournement opérationnelle disponible ou non pour les utilisateurs finaux.</li>',
        '      <li><strong>Next Communication ETA :</strong> engagement sur l’heure du prochain point de situation (ex. <i>"Next update in 30 minutes at 15:30 UTC"</i>).</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Vocabulaire Clé de la Gestion d’Incidents</h4>',
        '    <ul>',
        '      <li><strong>Blast Radius :</strong> rayon d’impact ou périmètre des services affectés par la panne.</li>',
        '      <li><strong>Degraded Performance :</strong> service partiellement fonctionnel mais présentant une latence anormale.</li>',
        '      <li><strong>Failover :</strong> basculement automatique ou manuel vers une infrastructure redondante de secours.</li>',
        '      <li><strong>Root Cause Analysis (RCA) :</strong> enquête approfondie post-incident pour identifier la cause racine systémique.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],
  method: [
    'Rédiger des objets d’emails structurés indiquant le niveau d’urgence, l’environnement et le composant système affecté.',
    'Bannir l’argot (gonna, stuff, asap) et employer des formules d’appel et de prise de congé conformes au registre professionnel.',
    'Exiger et fournir les 6 sections standard d’un ticket d’anomalie (Title, Env, Steps, Expected, Actual, Severity).',
    'Numéroter scrupuleusement les étapes de reproduction pour garantir que n’importe quel développeur puisse reproduire le bug.',
    'Diffuser des bulletins d’incident périodiques (Incident Broadcasts) avec périmètre d’impact chiffré, statut et solutions de contournement.'
  ],
  summary: [
    'L’email professionnel technique obéit à la règle des 3C : Clair, Concis et Actionnable.',
    'Un objet vague (ex. « help ») retarde la prise en charge des incidents et décrédibilise l’ingénieur.',
    'Un Bug Report rigoureux comporte des étapes numérotées, l’environnement et la distinction attendu/réel.',
    'Lors d’un incident critique, l’Incident Broadcast informe la direction avec le rayon d’impact (Blast Radius) et l’ETA.',
    'La présence d’une solution de contournement (Workaround) atténue immédiatement la sévérité perçue par le client.'
  ],
  checklist: [
    'Mon objet d’email comporte-t-il au moins 3 mots incluant la sévérité et le système cible ?',
    'Ai-je évité les abréviations familières (asap, thx, yo) dans mes communications professionnelles ?',
    'Mon ticket de bug comporte-t-il au moins deux étapes de reproduction numérotées distinctes ?',
    'Ai-je précisé la version du navigateur ou de l’OS dans le champ Environment ?',
    'Mon bulletin d’escalade indique-t-il si un contournement est disponible pour les utilisateurs ?'
  ],
  notions: [
    'Structure de l’email technique (Objet, Appel, Corps, Clôture)',
    'Registre formel vs familier en milieu professionnel',
    'Anatomie d’un Bug Report (Steps to Reproduce, Expected, Actual)',
    'Niveaux de sévérité (Critical, Major, Minor, Trivial)',
    'Incident Broadcast & Communication de crise',
    'Blast Radius & Périmètre de panne',
    'Solutions de contournement (Workaround)',
    'Next Communication ETA'
  ],
  pitfalls: [
    'Envoyer un email d’alerte avec un objet d’un seul mot (ex. « urgent ») sans mentionner le service affecté.',
    'Oublier d’indiquer les étapes de reproduction dans un ticket de bug, bloquant l’investigation de l’équipe de dev.',
    'Promettre une heure de résolution sans certitude au lieu de fournir une heure pour le prochain point de situation.',
    'Employer un ton accusateur ou agressif dans un email d’escalade inter-équipes.'
  ],
  questions: [
    {
      stem: 'Quel est le défaut principal de l’objet d’email « Subject: problem » envoyé à une équipe technique ?',
      opts: [
        'Il est écrit en minuscules sans ponctuation terminale.',
        'Il est trop vague, ne mentionne ni le composant affecté ni la sévérité et ne permet aucun tri opérationnel.',
        'Le mot « problem » est formellement interdit par les protocoles SMTP.',
        'Il devrait obligatoirement comporter au moins cinquante caractères.'
      ],
      correct: 1,
      exp: 'Un objet d’email technique doit impérativement préciser la sévérité, l’environnement et le composant (ex: URGENT: Production Payment API Outage).'
    },
    {
      stem: 'Quelle formule de salutation est la plus appropriée pour un premier email adressé au directeur technique d’un partenaire externe ?',
      opts: [
        'Yo mate,',
        'Dear Mr. Davis, ou Dear Technical Team,',
        'Hey dude,',
        'Sup folks,'
      ],
      correct: 1,
      exp: '« Dear Mr. Davis » ou « Dear Team » adopte le registre formel indispensable dans les correspondances d’affaires et partenariats extérieurs.'
    },
    {
      stem: 'Dans un rapport de bug (Bug Report), pourquoi la section « Steps to Reproduce » doit-elle être rédigée sous forme d’étapes numérotées ?',
      opts: [
        'Pour satisfaire aux contraintes d’indexation de la base de données SQL de Jira.',
        'Pour permettre à n’importe quel ingénieur d’exécuter pas à pas la séquence exacte et reproduire l’anomalie sans ambiguïté.',
        'Parce que les développeurs ne savent pas lire les paragraphes continus.',
        'C’est une exigence légale imposée par le RGPD.'
      ],
      correct: 1,
      exp: 'Les étapes numérotées fournissent une procédure reproductible et déterministe indispensable pour diagnostiquer et corriger un bogue.'
    },
    {
      stem: 'Que désigne l’expression « Blast Radius » lors de l’analyse d’un incident technique en production ?',
      opts: [
        'La distance physique entre deux centres de données géographiques.',
        'Le périmètre des services, données et utilisateurs impactés par la défaillance d’un composant.',
        'La vitesse de rotation des ventilateurs du serveur lors d’une surchauffe.',
        'Le coût financier total des réparations matérielles.'
      ],
      correct: 1,
      exp: 'Le « Blast Radius » (rayon d’impact) évalue l’étendue des dégâts ou des composants touchés par la propagation d’une panne.'
    },
    {
      stem: 'Parmi les expressions suivantes, laquelle relève de l’argot ou d’un registre familier à proscrire dans un bulletin d’incident ?',
      opts: [
        'The database cluster is experiencing high query latency.',
        'The auth stuff is completely broken, we gotta reboot it asap.',
        'The failover mechanism successfully redirected ingress traffic.',
        'Mitigation procedures are currently underway.'
      ],
      correct: 1,
      exp: '« stuff », « broken », « gotta » et « asap » sont des termes familiers et imprécis incompatibles avec un rapport d’incident professionnel.'
    },
    {
      stem: 'Dans un ticket d’anomalie, que doit contenir la rubrique « Actual Result » ?',
      opts: [
        'Le comportement que le logiciel aurait dû afficher selon le cahier des charges.',
        'La description factuelle exacte de ce qui s’est réellement produit, traces d’erreurs et captures à l’appui.',
        'La liste des développeurs ayant écrit la fonctionnalité incriminée.',
        'La date prévisionnelle de déploiement de la prochaine version.'
      ],
      correct: 1,
      exp: '« Actual Result » relate objectivement le résultat observé lors du test, par opposition à « Expected Result » (résultat souhaité).'
    },
    {
      stem: 'Quelle est la formulation la plus professionnelle pour clore un email technique formel ?',
      opts: [
        'Thx & cya,',
        'Best regards,',
        'Later,',
        'Cheers buddy,'
      ],
      correct: 1,
      exp: '« Best regards, » ou « Sincerely, » est la formule de politesse standard recommandée en anglais professionnel international.'
    },
    {
      stem: 'Lors de la diffusion d’un incident broadcast, quelle mention permet aux équipes support de guider immédiatement les usagers bloqués ?',
      opts: [
        'La signature cryptographique PGP du serveur de messagerie.',
        'La solution de contournement temporaire (Workaround), si elle existe.',
        'Le numéro de série de la carte mère défectueuse.',
        'L’adresse IP privée de l’ordinateur de l’administrateur.'
      ],
      correct: 1,
      exp: 'Un contournement opérationnel (Workaround) permet aux clients de continuer à opérer (ex: utiliser un mode dégradé ou une région secondaire) en attendant la résolution définitive.'
    }
  ],
  flashcards: [
    {
      q: 'Quels sont les trois critères d’un objet d’email technique professionnel ?',
      a: 'Préciser la sévérité (ex: URGENT, INFO), l’environnement (PROD, STAGING) et le composant système affecté (Payment API, Database Cluster).'
    },
    {
      q: 'Quelles sont les six rubriques indispensables d’un Bug Report ?',
      a: 'Title, Environment, Steps to Reproduce, Expected Result, Actual Result, Severity.'
    },
    {
      q: 'Que désigne le terme technique « Blast Radius » en gestion d’incidents ?',
      a: 'Le rayon d’impact : la proportion d’utilisateurs et l’ensemble des services et bases de données touchés par la panne d’un composant.'
    },
    {
      q: 'Pourquoi l’emploi d’abréviations comme « asap » ou « thx » est-il déconseillé dans un rapport d’incident ?',
      a: 'Ces abréviations relèvent du registre familier, traduisent un manque de rigueur et peuvent paraître cavalières ou agressives en communication inter-équipes.'
    },
    {
      q: 'Quelle est la différence entre Expected Result et Actual Result ?',
      a: 'Expected Result décrit le comportement conforme aux spécifications. Actual Result décrit le comportement erroné effectivement constaté lors de l’incident.'
    },
    {
      q: 'Qu’est-ce qu’un « Workaround » dans la gestion d’une panne ?',
      a: 'Une solution de contournement temporaire permettant d’atténuer l’impact opérationnel sans attendre la correction définitive de la cause racine.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Difficultés à structurer un email professionnel ou tickets de bug sans étapes de reproduction exploitables.'
    },
    {
      cls: 'medium',
      text: 'Bonne rédaction d’emails formels, respect des rubriques obligatoires de bug reports et clarté des statuts d’incident.'
    },
    {
      cls: 'high',
      text: 'Excellence en communication de crise : rédaction d’Incident Broadcasts exemplaires, maîtrise absolue des registres et formulation technique irréprochable.'
    }
  ]
};
