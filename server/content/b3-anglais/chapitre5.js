/**
 * Chapitre 5 du cours « Anglais B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 5,
  title: 'Support Utilisateur, Gestion d’Incidents &amp; Post-Mortems Blameless',
  short: 'Support, Incidents &amp; 5-Whys',
  toc: 'Communication en support utilisateur de niveau 1/2 (« The Story of the Perfect System That Nobody Could Use », vulgarisation du jargon technique et posture d’empathie), matrice de sévérité ITIL (croisement de l’impact et de l’urgence, SEV-1 à SEV-4, SLAs de prise en charge et de résolution) et rédaction de rapports post-mortem sans culpabilisation (culture Blameless et méthode des 5 Pourquoi).',
  time: '≈ 2 h 45 de travail',
  free: false,
  situation: 'Lors d’une panne logicielle complexe, les utilisateurs finals et les clients non techniciens sont désemparés. Leur renvoyer une trace d’exception brute (« Invalid claims in JWT payload » ou « NullPointerException at line 84 ») engendre de la frustration, dégrade l’image de l’entreprise et submerge le service client de réclamations agressives. En outre, au sein de l’équipe d’ingénierie, identifier la cause d’une panne en blâmant un individu (« John forgot to renew the cert ») détruit la sécurité psychologique et masque les carences architecturales. L’ingénieur B3 doit maîtriser l’art de la traduction technique bienveillante, appliquer la matrice de sévérité ITIL et mener des analyses post-incident (Post-Mortems) rigoureuses et exemptes de tout blâme (Blameless).',
  objectives: [
    'traduire des messages d’erreurs techniques cryptiques en consignes utilisateur bienveillantes, claires et dénuées de jargon ;',
    'appliquer la matrice de sévérité ITIL pour classifier un incident de SEV-1 à SEV-4 selon son impact métier et son urgence opérationnelle ;',
    'calculer et faire respecter les fenêtres de réponse et de résolution contractuelles associées à chaque niveau de sévérité ;',
    'conduire une analyse causale approfondie selon la méthode des 5 Pourquoi (5-Whys Root Cause Analysis) ;',
    'rédiger un post-mortem d’ingénierie conforme aux principes Blameless, en substituant le blâme individuel par des garde-fous techniques automatisés ;',
    'analyser et résoudre méthodologiquement des traducteurs d’erreurs, des matrices d’évaluation ITIL et des validateurs de post-mortems.'
  ],
  sections: [
    {
      title: 'Le Support Client : Traduire le Jargon Technique en Langage Empathique',
      html: [
        '<p>L’histoire du <i>"Système parfait que personne ne pouvait utiliser"</i> illustre le gouffre qui sépare parfois l’ingénieur système de l’utilisateur métier :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Messages Bruts Incompréhensibles</h4>',
        '    <ul>',
        '      <li><i>"Invalid or malformed claims in JWT payload."</i> -> L’utilisateur pense : <i>"Mon mot de passe est faux ?"</i></li>',
        '      <li><i>"Fatal 502: Upstream socket connection pool exhausted."</i> -> L’utilisateur s’inquiète : <i>"Est-ce que ma carte bancaire a été débitée deux fois ?"</i></li>',
        '      <li><i>"Sanitize your inputs to prevent persistent XSS."</i> -> Formule incompréhensible pour un néophyte.</li>',
        '      <li><i>"Null reference at PaymentWorker.cs line 124."</i> -> Trace de débogage interne exposée inutilement.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Reformulations Empathiques et Actionnables</h4>',
        '    <ul>',
        '      <li><i>"Your session has expired for security reasons. Please sign in again to continue safely."</i> (Rassurant et clair).</li>',
        '      <li><i>"The payment gateway is momentarily unavailable. No money has been charged from your account. Please retry in a few moments."</i> (Désamorce l’anxiété financière).</li>',
        '      <li><i>"Your password must not contain special characters such as &lt; or &gt;."</i> (Consigne d’action immédiate).</li>',
        '      <li><i>"We are having trouble saving your profile right now. Our technical team has been notified and is working on a fix."</i></li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Matrice de Sévérité ITIL &amp; Fenêtres de Réponse Opérationnelle',
      html: [
        '<p>Dans un centre opérationnel (NOC / SRE), la qualification d’un incident découle du croisement objectif de deux variables : l’<b>Impact</b> (périmètre des utilisateurs affectés) et l’<b>Urgence</b> (rapidité d’aggravation) :</p>',
        '<table class="table">',
        '  <thead><tr><th>Niveau de Sévérité</th><th>Définition &amp; Critères</th><th>SLA Prise en Charge</th><th>SLA Résolution Cible</th></tr></thead>',
        '  <tbody>',
        '    <tr><td><strong>SEV-1 (Critical Outage)</strong></td><td>Interruption totale d’un service cœur de métier, impactant plus de 50% des usagers sans contournement possible.</td><td>15 minutes</td><td>4 heures</td></tr>',
        '    <tr><td><strong>SEV-2 (Major Incident)</strong></td><td>Dégradation sévère d’un flux critique ou indisponibilité totale avec solution de contournement partielle.</td><td>30 minutes</td><td>8 heures</td></tr>',
        '    <tr><td><strong>SEV-3 (Minor Incident)</strong></td><td>Comportement erroné sur une fonctionnalité non critique ou impactant un groupe restreint d’usagers.</td><td>2 heures</td><td>24 heures</td></tr>',
        '    <tr><td><strong>SEV-4 (Cosmetic / Low)</strong></td><td>Anomalie cosmétique, faute de frappe d’interface ou question d’assistance sans impact opérationnel.</td><td>8 heures</td><td>72 heures</td></tr>',
        '  </tbody>',
        '</table>'
      ].join('\n')
    },
    {
      title: 'Post-Mortems Blameless &amp; la Méthode des 5 Pourquoi (5-Whys)',
      html: [
        '<p>La culture d’ingénierie contemporaine (Google Site Reliability Engineering, AWS) bannit le blâme individuel pour se concentrer exclusivement sur la résilience systémique :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Le Postulat Fondamental de la Culture Blameless</h4>',
        '    <p>L’erreur humaine n’est jamais la <em>cause racine</em> d’une panne ; elle n’en est que le <em>symptôme</em>. Si un ingénieur peut détruire une base de données en production par une simple faute de frappe ou omettre le renouvellement d’un certificat, c’est le système qui est défaillant en permettant qu’une action humaine isolée ait de telles conséquences :</p>',
        '    <ul>',
        '      <li><strong>Non :</strong> <i>"John committed a syntax error because he was careless."</i></li>',
        '      <li><strong>Oui :</strong> <i>"The continuous integration pipeline lacked automated linting and syntax validation to catch syntax errors before production deployment."</i></li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Exemple d’Enchaînement des 5 Pourquoi (5-Whys)</h4>',
        '    <ol>',
        '      <li><strong>Pourquoi l’API a-t-elle cessé de répondre ?</strong><br>Le pool de connexions à la base de données PostgreSQL a été saturé.</li>',
        '      <li><strong>Pourquoi le pool a-t-il été saturé ?</strong><br>Une requête de recherche utilisateur a bloqué la table pendant 45 secondes.</li>',
        '      <li><strong>Pourquoi la requête a-t-elle bloqué la table ?</strong><br>La colonne <code>user_email</code> ne possédait pas d’index B-Tree.</li>',
        '      <li><strong>Pourquoi l’index était-il manquant ?</strong><br>La migration a été rédigée à la main sans revue de schéma de base de données.</li>',
        '      <li><strong>Cause racine systémique :</strong><br>Le pipeline CI ne comportait aucun linter automatisé rejetant les migrations de schéma sans indexation des clés étrangères.</li>',
        '    </ol>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],
  method: [
    'Dépouiller systématiquement les messages d’erreur de tout jargon ou trace de pile avant de communiquer avec un utilisateur.',
    'Rassurer immédiatement sur la sécurité des fonds et l’intégrité des données dès le premier message de support.',
    'Évaluer objectivement l’impact métier et l’urgence pour assigner la sévérité exacte (SEV-1 à SEV-4) selon la grille ITIL.',
    'Bannir formellement les noms d’ingénieurs et les accusations personnelles lors de la rédaction d’un post-mortem.',
    'Approfondir la cause racine avec les 5 Pourquoi jusqu’à identifier un garde-fou automatisé absent (test, linter, alerte).'
  ],
  summary: [
    'Le support client exige une vulgarisation empathique : expliquer le problème sans condescendance et donner une action claire.',
    'La matrice de sévérité ITIL fixe les priorités d’intervention et les fenêtres de réponse contractuelles.',
    'Un incident SEV-1 exige une prise en charge sous 15 minutes et une résolution ou mitigation sous 4 heures.',
    'La culture Blameless considère que les pannes révèlent des failles systémiques de conception et non des fautes individuelles.',
    'La méthode des 5 Pourquoi remonte du symptôme immédiat jusqu’à la cause racine organisationnelle et technique.'
  ],
  checklist: [
    'Mes réponses de support rassurent-elles l’utilisateur avant d’expliquer la procédure ?',
    'Ai-je classifié l’incident selon la matrice ITIL en croisant impact et urgence ?',
    'Le rapport post-mortem est-il exempt de tout mot de blâme individuel (fault, careless, lazy) ?',
    'La chaîne des 5 Pourquoi comporte-t-elle bien cinq niveaux d’interrogation successifs ?',
    'La section Remediation propose-t-elle un garde-fou technique automatisé (CI, tests, alertes) ?'
  ],
  notions: [
    'Vulgarisation & Empathie en support technique',
    'Matrice de sévérité ITIL (SEV-1 à SEV-4)',
    'SLAs de prise en charge et de résolution',
    'Site Reliability Engineering (SRE)',
    'Culture Blameless & Sécurité psychologique',
    'Méthode des 5 Pourquoi (5-Whys)',
    'Root Cause Analysis (RCA)',
    'Garde-fous systémiques et remédiation automatisée'
  ],
  pitfalls: [
    'Exposer des traces d’exceptions (stack traces) à des utilisateurs non techniciens, créant anxiété et incompréhension.',
    'Surévaluer ou sous-évaluer un incident sans se référer à la grille objective d’impact et d’urgence ITIL.',
    'Conclure un post-mortem en désignant une erreur humaine sans interroger l’absence de garde-fou technique.',
    'Arrêter la chaîne des 5 Pourquoi au deuxième ou troisième niveau, masquant la véritable cause racine systémique.'
  ],
  questions: [
    {
      stem: 'Face à un utilisateur paniqué demandant si son paiement a été débité suite à une erreur HTTP 502, quelle est la réponse de support la plus professionnelle ?',
      opts: [
        'Read the status codes, 502 means bad gateway on upstream Nginx.',
        'The payment server is momentarily unavailable. No money has been charged from your card. Please wait a moment and retry.',
        'It is not our problem, your bank rejected the transaction.',
        'Our microservice crashed because of a null pointer exception.'
      ],
      correct: 1,
      exp: 'Cette réponse élimine immédiatement l’angoisse financière (« No money has been charged »), évite tout jargon et donne une consigne claire.'
    },
    {
      stem: 'Quel est l’objectif premier d’un Post-Mortem Blameless dans la culture SRE (Site Reliability Engineering) ?',
      opts: [
        'Identifier l’ingénieur fautif pour lui infliger une sanction financière.',
        'Comprendre les défaillances systémiques de l’infrastructure et mettre en place des garde-fous automatisés pour empêcher que l’incident ne se reproduise.',
        'Rédiger un communiqué de presse pour accuser un fournisseur de matériel.',
        'Archiver les logs dans un format propriétaire inaccessible.'
      ],
      correct: 1,
      exp: 'L’approche blameless vise à renforcer la résilience globale du système en corrigeant les failles d’automatisation, sans désigner de coupable humain.'
    },
    {
      stem: 'Selon la matrice de sévérité ITIL, quelle classification correspond à une panne totale du système d’authentification touchant l’ensemble des clients en pleine journée ?',
      opts: [
        'SEV-4 (Cosmetic)',
        'SEV-3 (Minor Incident)',
        'SEV-2 (Major Incident)',
        'SEV-1 (Critical Outage)'
      ],
      correct: 3,
      exp: 'Une panne complète d’un service vital sans solution de contournement immédiate relève du niveau critique SEV-1.'
    },
    {
      stem: 'Dans la méthode des 5 Pourquoi (5-Whys), pourquoi répète-t-on la question « Pourquoi ? » à cinq reprises ?',
      opts: [
        'C’est une obligation imposée par le protocole TCP/IP.',
        'Pour dépasser le symptôme superficiel immédiat et remonter jusqu’à la cause racine systémique et organisationnelle.',
        'Pour épuiser psychologiquement les membres de l’équipe d’astreinte.',
        'Pour faire correspondre le rapport aux cinq jours ouvrés de la semaine.'
      ],
      correct: 1,
      exp: 'Poser 5 fois la question permet d’explorer la chaîne causale en profondeur jusqu’à identifier l’absence d’un garde-fou technique ou procédural.'
    },
    {
      stem: 'Quelle formulation dans un rapport post-mortem enfreint directement le principe Blameless ?',
      opts: [
        'The deployment script lacked validation checks for unquoted variables.',
        'The database migration was slow due to a missing table index.',
        'Alice was careless and made a stupid mistake by pushing bad code.',
        'Monitoring thresholds were set too high to trigger an early alert.'
      ],
      correct: 2,
      exp: 'Accuser personnellement Alice (« was careless », « stupid mistake ») est une violation directe et toxique de la culture blameless.'
    },
    {
      stem: 'Quel est le délai cible de prise en charge (Response SLA) généralement associé à un incident critique de niveau SEV-1 ?',
      opts: [
        '15 minutes',
        '24 heures',
        '3 jours ouvrés',
        '1 semaine'
      ],
      correct: 0,
      exp: 'Un incident SEV-1 exige une mobilisation immédiate de l’Incident Commander et de l’astreinte sous 15 minutes maximum.'
    },
    {
      stem: 'Dans un contexte de support client, comment appelle-t-on l’action d’expliquer un problème technique complexe en termes compréhensibles pour un usager ordinaire ?',
      opts: [
        'Obfuscation',
        'Plain English Translation (Vulgarisation / Empathie)',
        'Reverse Engineering',
        'Data Scraping'
      ],
      correct: 1,
      exp: 'Le « Plain English Translation » consiste à reformuler sans condescendance le fonctionnement du système dans la langue courante de l’usager.'
    },
    {
      stem: 'Quelle est la dernière étape incontournable de tout post-mortem réussi ?',
      opts: [
        'Supprimer tous les tickets de bug précédents.',
        'Définir des actions correctives concrètes (Action Items), assignées à des responsables et vérifiées en production.',
        'Organiser une fête pour célébrer la fin de la panne.',
        'Recommencer l’analyse depuis le début.'
      ],
      correct: 1,
      exp: 'Sans plan d’action correctif mesurable (tests ajoutés, alertes affinées, automatisation créée), un post-mortem reste lettre morte.'
    }
  ],
  flashcards: [
    {
      q: 'Quelle est la règle d’or pour traduire un message d’erreur en support client ?',
      a: 'Faire preuve d’empathie, rassurer sur l’intégrité des données ou des paiements, éliminer le jargon technique et donner une consigne d’action claire.'
    },
    {
      q: 'Quelles sont les deux dimensions croisées par la matrice de sévérité ITIL ?',
      a: 'L’Impact (volume et périmètre des utilisateurs et services touchés) et l’Urgence (rapidité d’aggravation ou sensibilité financière).'
    },
    {
      q: 'Qu’est-ce qu’un incident de niveau SEV-1 ?',
      a: 'Une panne critique totale interrompant un service cœur d’infrastructure sans contournement possible (prise en charge sous 15 min).'
    },
    {
      q: 'Pourquoi les post-mortems doivent-ils être « Blameless » ?',
      a: 'Parce que blâmer les individus masque les faiblesses structurelles de l’infrastructure. L’erreur humaine est le symptôme d’un manque de garde-fous automatisés.'
    },
    {
      q: 'En quoi consiste la méthode des 5 Pourquoi (5-Whys) ?',
      a: 'À remonter itérativement la chaîne causale d’un incident en posant cinq fois la question « Pourquoi ? » jusqu’à révéler la cause racine systémique.'
    },
    {
      q: 'Quelle est la conclusion opérationnelle indispensable d’un rapport post-mortem ?',
      a: 'Des actions correctives concrètes (Action Items) automatisées (tests CI, linters, alertes, canaries) assignées à des porteurs identifiés.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Difficultés à éliminer le jargon en support client ou tendance à imputer les pannes à des fautes humaines individuelles.'
    },
    {
      cls: 'medium',
      text: 'Bonne application de la matrice ITIL, communication empathique rassurante et respect de la structure des 5 Pourquoi.'
    },
    {
      cls: 'high',
      text: 'Excellence en gouvernance SRE : conduite de post-mortems blameless rigoureux, définition de remédiations systémiques et maîtrise du support opérationnel.'
    }
  ]
};
