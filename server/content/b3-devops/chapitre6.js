/**
 * Chapitre 6 du cours « DevOps B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 6,
  title: 'SRE (Site Reliability Engineering), SLI/SLO, Error Budgets &amp; Observabilité',
  short: 'SRE, SLI/SLO &amp; Observabilité',
  toc: 'Doctrine SRE de Google, gestion du Toil, dialectique SLI/SLO/SLA, politiques d’Error Budget, les 4 signaux dorés et amortissement de l’Alert Flapping.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B3 et plus',
  situation: 'Fixer un objectif de disponibilité de 100% est une illusion ruineuse : non seulement atteindre 100% d’uptime est physiquement impossible dans des systèmes distribués, mais cela paralyserait totalement l’innovation en interdisant toute modification logicielle. Fondée par Benjamin Treynor Sloss chez Google en 2003, la discipline du Site Reliability Engineering (SRE) réconcilie développement et exploitation par un arbitrage mathématique élégant : l’Error Budget (Budget d’Erreur). L’indisponibilité tolérée devient une ressource que l’équipe de développement peut dépenser pour innover et déployer vite. Dès lors que ce budget est menacé ou épuisé, les déploiements sont gelés au profit exclusif de la fiabilité. L’ingénieur DevOps B3 doit savoir formaliser les SLI et SLO, administrer les Error Budgets et instrumenter les 4 Signaux Dorés d’observabilité.',
  objectives: [
    'assimiler la doctrine fondatrice du Site Reliability Engineering (SRE) telle que théorisée chez Google ;',
    'distinguer avec une rigueur absolue les concepts de SLI (Indicateur), SLO (Objectif) et SLA (Accord contractuel) ;',
    'calculer, administrer et gouverner les Budgets d’Erreur (Error Budgets) et analyser leur vitesse de consommation (Burn Rate) ;',
    'limiter le travail répétitif sans valeur pérenne (Toil) à moins de 50% du temps des équipes de fiabilité ;',
    'instrumenter les 4 Signaux Dorés de l’observabilité : Latence, Trafic, Erreurs et Saturation ;',
    'analyser et résoudre méthodologiquement des analyseurs de conformité SLI/SLO, des régulateurs d’Error Budget et des détecteurs d’Alert Flapping.'
  ],
  sections: [
    {
      title: 'La Doctrine SRE : Quand l’Ingénierie Logicielle Repense l’Exploitation',
      html: [
        '<p>Selon la formule célèbre de Ben Treynor Sloss : <em>« SRE is what happens when you ask a software engineer to design an operations function »</em> (le SRE est ce qui se produit lorsque l’on demande à un ingénieur logiciel de concevoir une fonction d’exploitation). Le SRE applique les paradigmes du génie logiciel aux problèmes d’infrastructure et de production :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Élimination Systémique du « Toil »</h4>',
        '    <p>Le <strong>Toil</strong> désigne le travail opérationnel répétitif, manuel, dépourvu de valeur pérenne et croissant linéairement avec la taille du service (ex. redémarrage manuel de serveurs, création de comptes, rotations manuelles de certificats). La règle cardinale de Google impose de <strong>plafonner le Toil à un maximum strict de 50% du temps</strong> des ingénieurs SRE, les 50% restants étant obligatoirement consacrés à des projets d’ingénierie et d’automatisation durable.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>L’Axiome de l’Inévitabilité des Pannes</h4>',
        '    <p>Le SRE abandonne la quête utopique du zéro défaut. Les défaillances réseau, matérielles et logicielles sont considérées comme inhérentes à la complexité des systèmes distribués à grande échelle. L’enjeu n’est plus d’empêcher la panne à tout prix, mais de la rendre inoffensive en automatisant la résilience et le confinement.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'La Trinité de la Fiabilité : SLI, SLO et SLA',
      html: [
        '<p>Pour mesurer et négocier rationnellement la qualité de service, le SRE articule trois niveaux contractuels complémentaires :</p>',
        '<table class="table">',
        '  <thead>',
        '    <tr>',
        '      <th style="width:15%">Concept</th>',
        '      <th style="width:25%">Nature &amp; Rôle</th>',
        '      <th style="width:30%">Formule / Définition</th>',
        '      <th style="width:30%">Exemple Concret</th>',
        '    </tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr>',
        '      <td><strong>SLI</strong><br>(Service Level Indicator)</td>',
        '      <td>Métrique objective mesurée en temps réel.</td>',
        '      <td>Ratio des événements conformes divisé par le total des événements observés.</td>',
        '      <td>$$\\frac{\\text{Req HTTP } 2xx/3xx < 200\\,\\text{ms}}{\\text{Total Requêtes HTTP}} \\times 100$$</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>SLO</strong><br>(Service Level Objective)</td>',
        '      <td>Cible interne de fiabilité que l’équipe technique s’engage à tenir.</td>',
        '      <td>Seuil minimal requis sur une fenêtre glissante (ex. 30 jours calendaires).</td>',
        '      <td>$$SLI \\ge 99.9\\,\\%$$ sur 30 jours glissants (soit max 43 min 12 s d’indisponibilité).</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>SLA</strong><br>(Service Level Agreement)</td>',
        '      <td>Contrat légal et commercial liant l’entreprise à ses clients externes.</td>',
        '      <td>Seuil en-deçà duquel des pénalités financières ou remboursements s’appliquent.</td>',
        '      <td>$$99.5\\,\\%$$ annuel (marge de sécurité volontairement plus souple que le SLO interne).</td>',
        '    </tr>',
        '  </tbody>',
        '</table>',
        box('warning', 'La Règle d’Or du Différentiel SLO vs SLA', [
          '<p>Le SLO interne doit <strong>toujours être plus strict que le SLA externe</strong>. Si votre SLA contractuel est de 99.5%, fixez votre SLO interne à 99.9%. Cet écart forme un coussin de sécurité permettant à l’équipe SRE de détecter, contenir et réparer les anomalies en interne bien avant qu’elles n’engendrent des ruptures de contrat et des pénalités juridiques avec les clients.</p>'
        ].join('\n'))
      ].join('\n')
    },
    {
      title: 'Error Budgets &amp; Vitesse de Consommation (Burn Rate)',
      html: [
        '<p>L’<strong>Error Budget (Budget d’Erreur)</strong> découle directement du SLO :</p>',
        '$$\\text{Error Budget (\\%)} = 100\\,\\% - \\text{SLO (\\%)}$$',
        '<p>Pour un service dont le SLO est fixé à 99.9% sur une fenêtre de 30 jours (soit $30 \\times 24 \\times 3600 = 2\\,592\\,000$ secondes), le budget d’erreur total alloué vaut :</p>',
        '$$\\text{Budget Total} = 2\\,592\\,000 \\times (1 - 0.999) = 2\\,592\\,\\text{secondes (soit 43 minutes et 12 secondes)}$$',
        '<p>L’Error Budget n’est pas une tolérance passive au laxisme, mais une <strong>monnaie d’arbitrage régulatrice</strong> entre développeurs et SRE :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Budget Positif (&gt; 20% restant)</h4>',
        '    <p>L’équipe de développement dispose du champ libre pour innover : releases fréquentes, tests de nouvelles fonctionnalités, déploiements Canary agressifs et expérimentations architecturales.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Budget Épuisé (&le; 0% restant)</h4>',
        '    <p><strong>Gel strict des déploiements (Release Freeze).</strong> Les nouvelles fonctionnalités sont suspendues. 100% de la bande passante d’ingénierie est redirigée vers la fiabilisation du code, les tests et l’automatisation.</p>',
        '  </div>',
        '</div>',
        '<h4 style="margin-top:20px">Le Burn Rate (Taux de Consommation)</h4>',
        '<p>Le <strong>Burn Rate ($BR$)</strong> mesure la vitesse à laquelle l’Error Budget est consommé par rapport à la vitesse nominale :</p>',
        '<ul>',
        '  <li>$BR = 1$ : le service consomme exactement 100% de son budget sur la période nominale de 30 jours.</li>',
        '  <li>$BR = 14.4$ : le service consomme l’intégralité de son budget mensuel en seulement 2 jours (48 heures) ! C’est un signal d’alerte critique immédiat.</li>',
        '</ul>'
      ].join('\n')
    },
    {
      title: 'Observabilité : Les 4 Signaux Dorés &amp; Amortissement des Alertes (Flapping)',
      html: [
        '<p>Dans le livre SRE de Google, l’observabilité d’un service transactionnel s’articule autour des <strong>Quatre Signaux Dorés (The Four Golden Signals)</strong> :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. Latence (Latency)</h4>',
        '    <p>Temps d’exécution d’une requête. Il est impératif de distinguer la latence des requêtes réussies de celle des requêtes échouées (une erreur 500 retournée en 2 ms ne doit pas fausser la moyenne d’un calcul de 800 ms).</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Trafic (Traffic)</h4>',
        '    <p>Volume de demande adressée au système : requêtes HTTP par seconde, transactions de paiement ou connexions simultanées actives.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>3. Erreurs (Errors)</h4>',
        '    <p>Taux de requêtes qui échouent : codes HTTP 5xx explicites, réponses incorrectes ou violations de protocole applicatif.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>4. Saturation (Saturation)</h4>',
        '    <p>Degré de remplissage de la ressource la plus contrainte du système : pourcentage d’occupation mémoire, saturation de pool de threads ou bande passante I/O disque.</p>',
        '  </div>',
        '</div>',
        '<h4 style="margin-top:20px">L’Alert Flapping &amp; La Fatigue d’Alerte (Alert Fatigue)</h4>',
        '<p>Lorsqu’une métrique fluctue rapidement autour de son seuil critique (par exemple une utilisation CPU oscillant entre 89% et 91% toutes les dix secondes), l’alerte bascule convulsivement entre l’état <code>FIRING</code> et <code>RESOLVED</code>. Cette oscillation instable est qualifiée d’<strong>Alert Flapping</strong>.</p>',
        box('tip', 'La Clause « for » dans Prometheus', [
          '<p>Pour éradiquer le flapping et protéger les équipes d’astreinte contre la fatigue d’alerte, les règles Prometheus exigent une temporisation :</p>',
          '<pre><code>- alert: HighMemoryUsage\n  expr: node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes < 0.10\n  for: 5m\n  labels:\n    severity: warning</code></pre>',
          '<p>La clause <code>for: 5m</code> impose que la condition soit violée de manière ininterrompue durant 5 minutes consécutives avant de notifier l’astreinte, filtrant instantanément les micro-pics éphémères bénins.</p>'
        ].join('\n'))
      ].join('\n')
    }
  ],
  methodTitle: 'Démarche d’Ingénierie de Fiabilité SRE &amp; Gouvernance d’Error Budget',
  method: [
    'Identifier les parcours utilisateurs critiques et formaliser des indicateurs mesurables précis (SLI).',
    'Définir des objectifs de niveau de service (SLO) réalistes et exigeants sur des fenêtres glissantes de 30 jours.',
    'S’assurer que le SLO interne est strictement plus sévère que le SLA contractuel conclu avec les clients.',
    'Calculer l’Error Budget alloué et suivre en temps réel sa vitesse de consommation (Burn Rate).',
    'Appliquer la politique convenue : gel de release (Feature Freeze) dès que le budget restant devient critique.',
    'Instrumenter les 4 Signaux Dorés et configurer une clause for sur les alertes Prometheus pour éradiquer le flapping.'
  ],
  summary: [
    'Le SRE applique les paradigmes du génie logiciel aux opérations pour maîtriser la complexité.',
    'Le Toil (travail répétitif sans valeur durable) doit impérativement rester sous le plafond de 50% du temps.',
    'Le SLI est la métrique observée, le SLO l’objectif interne visé, le SLA le contrat commercial assorti de pénalités.',
    'L’Error Budget (100% - SLO) régule l’équilibre entre prise de risque d’innovation et fiabilisation du système.',
    'Les 4 Signaux Dorés (Latence, Trafic, Erreurs, Saturation) constituent la télémétrie cardinale.',
    'L’Alert Flapping fatigue les astreintes et se neutralise par l’amortissement temporel (clause for dans Prometheus).'
  ],
  checklist: [
    'Je sais citer la formule de Benjamin Treynor Sloss définissant le Site Reliability Engineering.',
    'Je sais identifier et quantifier le Toil opérationnel pour maintenir sa part sous les 50%.',
    'Je sais formuler un SLI, un SLO et un SLA pour un service web transactionnel.',
    'Je sais calculer la durée exacte d’un Error Budget sur une fenêtre de 30 jours calendaires.',
    'Je sais interpréter un indicateur de Burn Rate et appliquer les conséquences d’un épuisement de budget.',
    'Je sais paramétrer une alerte Prometheus avec la clause for pour éviter le flapping.'
  ],
  notions: [
    'Site Reliability Engineering (SRE)',
    'Élimination du Toil (&lt; 50% du temps)',
    'Indicateurs SLI vs Objectifs SLO',
    'Accords SLA &amp; Pénalités contractuelles',
    'Error Budgets &amp; Politiques de gel de release',
    'Burn Rate &amp; Vitesse de consommation',
    'Les 4 Signaux Dorés de Google',
    'Alert Flapping &amp; Temporisation Prometheus'
  ],
  pitfalls: [
    'Viser un objectif de disponibilité irréaliste de 100% qui paralyse l’innovation et coûte des budgets exponentiels sans bénéfice utilisateur.',
    'Négliger le Toil opérationnel jusqu’à ce qu’il absorbe plus de 50% du temps des équipes, étouffant toute capacité d’ingénierie durable.',
    'Fixer un SLO interne identique ou plus tolérant que le SLA contractuel client, supprimant tout coussin de détection d’anomalie préventive.',
    'Créer des règles d’alerte sans temporisation (for), provoquant des tempêtes d’Alert Flapping et une fatigue d’alerte toxique chez les astreintes.'
  ],
  questions: [
    {
      stem: 'Dans la doctrine SRE formalisée par Google, quelle proportion maximale du temps d’un ingénieur peut être légitimement consacrée au travail opérationnel répétitif (« Toil ») ?',
      opts: [
        '100%',
        '80%',
        '50% au maximum (les 50% restants étant consacrés à l’ingénierie et l’automatisation)',
        '0% (aucun travail opérationnel n’est permis)'
      ],
      correct: 2,
      exp: 'Google impose de plafonner le Toil à un maximum strict de 50%. Les ingénieurs SRE doivent consacrer au moins la moitié de leur temps à développer du code d’automatisation durable.'
    },
    {
      stem: 'Quelle distinction fondamentale sépare un SLO (Service Level Objective) d’un SLA (Service Level Agreement) ?',
      opts: [
        'Le SLO est un format de fichier texte tandis que le SLA est une base de données',
        'Le SLO est un objectif interne de fiabilité plus strict que le SLA, qui est quant à lui un contrat juridique assorti de pénalités financières envers les clients externes',
        'Le SLO est réservé au matériel physique et le SLA aux logiciels libres',
        'Il n’y a aucune différence, ce sont deux acronymes strictement synonymes'
      ],
      correct: 1,
      exp: 'Le SLO est la boussole interne de l’équipe d’ingénierie. Le SLA est le contrat d’engagement légal avec le client, volontairement plus souple pour intégrer une marge de sécurité.'
    },
    {
      stem: 'Si un service web applique un SLO de 99.9% de disponibilité sur un mois de 30 jours (2 592 000 secondes), quel est le volume de son Error Budget en secondes ?',
      opts: [
        '25 920 secondes',
        '2 592 secondes (soit 43 minutes et 12 secondes)',
        '259 secondes',
        '0 seconde'
      ],
      correct: 1,
      exp: 'Error Budget = 2 592 000 * (1 - 0.999) = 2 592 000 * 0.001 = 2 592 secondes (exactement 43 minutes et 12 secondes d’indisponibilité permise).'
    },
    {
      stem: 'Que doit décider l’équipe d’ingénierie lorsque l’Error Budget d’un service de production est intégralement consommé en milieu de mois ?',
      opts: [
        'Accélérer la cadence de mise en production de nouvelles fonctionnalités',
        'Appliquer une politique de gel des releases fonctionnelles (Release Freeze) et réorienter l’effort sur la fiabilisation et la résilience du système',
        'Supprimer la surveillance pour ne plus voir les erreurs',
        'Réduire artificiellement le SLO pour que le budget redevienne positif'
      ],
      correct: 1,
      exp: 'L’épuisement du budget d’erreur est un coupe-circuit organisationnel : le déploiement de fonctionnalités nouvelles est suspendu pour restaurer la stabilité du service.'
    },
    {
      stem: 'Quels sont les « Quatre Signaux Dorés » (Four Golden Signals) de l’observabilité selon Google SRE ?',
      opts: [
        'RAM, Disque, Clavier, Souris',
        'Latence, Trafic, Erreurs, Saturation',
        'Nombre de commits, Pull requests, Lignes de code, Heures de travail',
        'Température de la salle, Débit d’air, Pression atmosphérique, Voltage'
      ],
      correct: 1,
      exp: 'Les 4 signaux dorés (Latency, Traffic, Errors, Saturation) constituent la télémétrie minimale indispensable pour caractériser l’état de santé d’un système distribué.'
    },
    {
      stem: 'Qu’appelle-t-on l’« Alert Flapping » dans un système de monitoring et d’alerte ?',
      opts: [
        'L’envoi de notifications par SMS en cas de panne',
        'L’oscillation rapide d’une alerte entre les états actif (firing) et résolu (ok) en raison d’une métrique fluctuant autour du seuil critique',
        'L’absence totale de logs sur un serveur',
        'La panne simultanée de tous les routeurs d’un réseau'
      ],
      correct: 1,
      exp: 'L’Alert Flapping survient lorsqu’une valeur oscille autour de la frontière de déclenchement, saturant les canaux de notification et provoquant une fatigue d’alerte toxique.'
    },
    {
      stem: 'Quelle directive permet d’éradiquer l’Alert Flapping dans la définition d’une règle d’alerte sous Prometheus ?',
      opts: [
        'La directive « delay: infinite »',
        'La clause « for: <durée> » exigeant que la condition critique persiste de manière ininterrompue durant un délai minimal avant déclenchement',
        'L’augmentation du seuil de mémoire à 100%',
        'La suppression du serveur Alertmanager'
      ],
      correct: 1,
      exp: 'La clause `for: 5m` filtre les micro-variations passagères : l’alerte ne se déclenche que si le problème persiste au moins 5 minutes continues.'
    },
    {
      stem: 'Si un service a un Burn Rate de 14.4 sur son budget d’erreur mensuel, en combien de temps consommera-t-il la totalité de son budget de 30 jours ?',
      opts: [
        'En 30 jours',
        'En 2 jours (48 heures)',
        'En 14 heures',
        'En 6 mois'
      ],
      correct: 1,
      exp: 'Durée = 30 jours / 14.4 = 2.08 jours (environ 48 heures). Un Burn Rate de 14.4 signale une hémorragie critique de fiabilité exigeant une mobilisation d’urgence.'
    }
  ],
  flashcards: [
    {
      q: 'Quelle est la définition du SRE selon Ben Treynor Sloss ?',
      a: '« Ce qui se produit lorsque l’on demande à un ingénieur logiciel de concevoir une fonction d’exploitation » : gérer la production par le code et l’automatisation.'
    },
    {
      q: 'Qu’est-ce que le « Toil » en SRE et quelle est sa limite maximale ?',
      a: 'Le travail opérationnel répétitif, manuel et sans valeur durable. Il est strictement plafonné à 50% du temps des ingénieurs SRE chez Google.'
    },
    {
      q: 'Que désignent les acronymes SLI, SLO et SLA ?',
      a: 'SLI : Indicateur réel mesuré. SLO : Objectif interne de fiabilité visé. SLA : Accord contractuel externe avec pénalités financières.'
    },
    {
      q: 'Comment calcule-t-on l’Error Budget à partir du SLO ?',
      a: 'Error Budget (%) = 100% - SLO (%). En temps : Durée de la période × (1 - SLO).'
    },
    {
      q: 'Quels sont les Quatre Signaux Dorés (Golden Signals) de Google ?',
      a: '1. Latence (temps de réponse), 2. Trafic (demande), 3. Erreurs (taux d’échec), 4. Saturation (fraction des ressources consommée).'
    },
    {
      q: 'Comment remédie-t-on à l’Alert Flapping dans Prometheus ?',
      a: 'En configurant une clause `for: <durée>` (ex. `for: 5m`) pour exiger que l’anomalie soit continue et stable avant de notifier l’astreinte.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Moins de 4/8 : Révisez la distinction SLI/SLO/SLA, la définition du Toil et les 4 signaux dorés.'
    },
    {
      cls: 'medium',
      text: 'Entre 5/8 et 7/8 : Bon niveau, approfondissez le calcul des Error Budgets et la gestion du Burn Rate.'
    },
    {
      cls: 'high',
      text: '8/8 : Excellent ! Vous maîtrisez les principes d’ingénierie de fiabilité SRE et d’observabilité de niveau expert.'
    }
  ]
};
