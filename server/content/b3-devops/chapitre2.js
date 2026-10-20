/**
 * Chapitre 2 du cours « DevOps B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 2,
  title: 'Intégration Continue (CI), Stratégies de Branchement &amp; Automatisation des Tests',
  short: 'Intégration Continue &amp; Tests',
  toc: 'Fondements de l’Intégration Continue, Trunk-Based Development vs GitFlow, conformité SemVer 2.0.0, pyramide des tests et détection des Flaky Tests.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B3 et plus',
  situation: 'Dans un projet d’envergure réunissant des dizaines de développeurs, l’intégration tardive des fonctionnalités développées en parallèle provoque systématiquement « l’enfer des fusions » (Merge Hell) : branches Git divergentes pendant plusieurs semaines, conflits insolubles, régressions massives et instabilité chronique du tronc principal. Pour garantir un flux de livraison continu et fiable, l’ingénieur DevOps doit implémenter un pipeline d’Intégration Continue (CI) d’élite : standardiser les conventions de versioning sémantique (SemVer 2.0.0), privilégier le Trunk-Based Development pour minimiser le coût d’intégration, structurer la pyramide des tests automatisés (unitaires, composants, intégration) et éradiquer méthodiquement les tests instables (Flaky Tests) qui corrompent la confiance des équipes.',
  objectives: [
    'assimiler les principes fondateurs de l’Intégration Continue selon Martin Fowler et Jez Humble ;',
    'comparer de manière critique les stratégies de branchement GitFlow et Trunk-Based Development ;',
    'appliquer rigoureusement la norme Semantic Versioning (SemVer 2.0.0) et analyser l’impact des ruptures d’API ;',
    'dimensionner et organiser la pyramide des tests logiciels pour optimiser la rapidité du retour d’information ;',
    'identifier, isoler et corriger les tests instables (Flaky Tests) dans un pipeline distribué ;',
    'développer en Python 3 des analyseurs d’étapes CI, de conformité SemVer et de matrices d’instabilité de tests.'
  ],
  sections: [
    {
      title: 'L’Intégration Continue (CI) : Philosophie &amp; Règles d’Or',
      html: [
        '<p>L’<strong>Intégration Continue (Continuous Integration)</strong> est une pratique de développement logiciel formalisée par Martin Fowler et Kent Beck, dans laquelle les membres d’une équipe intègrent leur travail fréquemment (au minimum une fois par jour et idéalement plusieurs fois par jour) sur une branche partagée (le tronc commun). Chaque intégration est automatiquement vérifiée par un serveur de build indépendant exécutant les étapes de compilation, d’analyse statique et de tests automatisés.</p>',
        '<div class="grid grid-3">',
        '  <div class="card">',
        '    <h4>1. Commit Fréquent sur le Tronc</h4>',
        '    <p>Chaque développeur pousse ses modifications au moins une fois par jour sur la branche principale. Travailler sur des branches isolées pendant des semaines est l’antithèse de l’intégration continue.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Feedback en Moins de 10 Minutes</h4>',
        '    <p>Le pipeline de validation CI doit retourner son verdict en moins de dix minutes. Un retour trop lent pousse les développeurs à changer de contexte, brisant la concentration et différant les corrections.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>3. Règle du Tronc Vert (Stop the Line)</h4>',
        '    <p>Si le build ou un test échoue sur le tronc (build rouge), la correction de cette rupture devient la priorité absolue de toute l’équipe. Aucun nouveau commit fonctionnel n’est toléré avant réparation.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Stratégies de Branchement Git : Trunk-Based vs GitFlow',
      html: [
        '<p>Le choix de la stratégie de branchement détermine la fréquence d’intégration et le risque de dérive du code source :</p>',
        '<table class="table">',
        '  <thead>',
        '    <tr>',
        '      <th style="width:20%">Critère</th>',
        '      <th style="width:40%">GitFlow (Traditionnel)</th>',
        '      <th style="width:40%">Trunk-Based Development (DevOps d’Élite)</th>',
        '    </tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr>',
        '      <td><strong>Structure de branches</strong></td>',
        '      <td>Multiples branches à longue durée de vie : <code>main</code>, <code>develop</code>, <code>release/*</code>, <code>feature/*</code>, <code>hotfix/*</code>.</td>',
        '      <td>Une seule branche active principale (<code>main</code> ou <code>trunk</code>) et de très courtes branches de travail éphémères (&lt; 24h).</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>Durée de vie des branches</strong></td>',
        '      <td>Plusieurs jours, semaines voire mois.</td>',
        '      <td>Quelques heures (moins d’une journée de travail).</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>Complexité des merges</strong></td>',
        '      <td>Élevée : risques majeurs de conflits massifs lors de la fusion sur <code>develop</code> ou <code>main</code>.</td>',
        '      <td>Minimale : fusions minuscules et continues, conflits résolus en quelques secondes.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>Gestion des features incomplètes</strong></td>',
        '      <td>Conservées sur leur branche jusqu’à finalisation complète.</td>',
        '      <td>Fusionnées directement sur le tronc mais masquées derrière des <strong>Feature Flags</strong>.</td>',
        '    </tr>',
        '  </tbody>',
        '</table>',
        box('standard', 'Le Choix des Équipes Performantes', [
          '<p>Le rapport annuel State of DevOps (DORA) démontre de manière récurrente que les équipes adoptant le <strong>Trunk-Based Development</strong> affichent une fréquence de déploiement nettement supérieure et un taux d’échec des changements (CFR) considérablement inférieur à celles utilisant GitFlow.</p>'
        ].join('\n'))
      ].join('\n')
    },
    {
      title: 'Semantic Versioning (SemVer 2.0.0) : La Rigueur Contractuelle',
      html: [
        '<p>Pour orchestrer les dépendances logicielles sans régression, la spécification <strong>SemVer 2.0.0</strong> définit une convention universelle structurée sous la forme <code>MAJOR.MINOR.PATCH</code> :</p>',
        '<div class="grid grid-3">',
        '  <div class="card">',
        '    <h4>MAJOR (X.0.0)</h4>',
        '    <p>Incrémenté lorsqu’une modification introduit une <strong>rupture de compatibilité descendante (Breaking Change)</strong> dans l’API publique. Les applications consommatrices doivent obligatoirement adapter leur code.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>MINOR (X.Y.0)</h4>',
        '    <p>Incrémenté lors de l’ajout de nouvelles fonctionnalités tout en garantissant une <strong>stricte rétrocompatibilité</strong>. Aucun code client existant ne doit être brisé.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>PATCH (X.Y.Z)</h4>',
        '    <p>Incrémenté exclusivement lors de <strong>corrections de bogues rétrocompatibles</strong>. Le comportement contractuel initial est restauré sans altérer les interfaces.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'La Pyramide des Tests &amp; La Chasse aux Tests Instables (Flaky Tests)',
      html: [
        '<p>La pyramide des tests de Mike Cohn fournit le modèle architectural pour concevoir une suite de tests rapide, fiable et économique :</p>',
        '<div class="grid grid-3">',
        '  <div class="card">',
        '    <h4>Tests Unitaires (70% du volume)</h4>',
        '    <p>Ultra-rapides (millisecondes), exécutés en mémoire pure sans base de données ni réseau. Isolent une fonction ou classe unique. Coût de maintenance infime.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Tests d’Intégration (20% du volume)</h4>',
        '    <p>Vérifient les interactions réelles entre composants (accès base de données, client HTTP, sérialisation). Légèrement plus lents (secondes), indispensables.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Tests End-to-End E2E (10% du volume)</h4>',
        '    <p>Traversent l’application complète via l’interface utilisateur ou l’API publique. Lourds, fragiles face aux variations de timing, très coûteux en exécution.</p>',
        '  </div>',
        '</div>',
        '<h4 style="margin-top:20px">Le Fléau des Tests Instables (Flaky Tests)</h4>',
        '<p>Un <strong>Flaky Test</strong> est un test automatisé qui produit des résultats variables (réussite ou échec intermittent) pour un même code source sans modification. Leurs origines sont bien identifiées :</p>',
        '<ul>',
        '  <li><strong>Conditions de course (Race Conditions) :</strong> dépendances temporelles aléatoires (<code>sleep(2)</code> au lieu d’attente explicite de signaux) ;</li>',
        '  <li><strong>Ordre d’exécution et état partagé :</strong> tests qui polluent une base de données sans nettoyage (tearDown déficient) ;</li>',
        '  <li><strong>Dépendances externes réseau :</strong> requêtes directes vers des services tiers non bouchonnés (mocks/stubs).</li>',
        '</ul>',
        box('warning', 'Conséquence Psychologique des Flaky Tests', [
          '<p>Les tests instables détruisent le principe fondamental du « Tronc Vert ». Lorsqu’un échec est attribué d’office à un « bogue de test passager » et qu’on relance le pipeline jusqu’à ce qu’il passe, les véritables régressions se faufilent en production sans être détectées. La règle d’or : tout test instable doit être <strong>immédiatement mis en quarantaine</strong> hors du chemin critique du build.</p>'
        ].join('\n'))
      ].join('\n')
    }
  ],
  methodTitle: 'Protocole de Conception d’un Pipeline d’Intégration Continue (CI)',
  method: [
    'Standardiser les conventions de commits et adopter le Trunk-Based Development avec branches éphémères.',
    'Configurer un agent de build automatisé déclenché sur chaque événement push ou pull request.',
    'Structurer la pyramide de tests : base massive de tests unitaires rapides, tests d’intégration, et sommet E2E ciblé.',
    'Optimiser l’exécution parallèle des jobs pour garantir un feedback complet en moins de 10 minutes.',
    'Formaliser les incréments de versions contractuelles selon la norme Semantic Versioning (SemVer 2.0.0).',
    'Détecter et isoler immédiatement les tests instables (Flaky Tests) dans une suite de quarantaine non bloquante.'
  ],
  summary: [
    'L’Intégration Continue (CI) exige des fusions quotidiennes sur le tronc commun et une validation automatisée.',
    'Le Trunk-Based Development surpasse GitFlow en éliminant les fusions douloureuses et les branches à longue durée de vie.',
    'SemVer 2.0.0 gouverne la compatibilité : MAJOR pour rupture d’API, MINOR pour ajout rétrocompatible, PATCH pour correctif.',
    'La pyramide des tests de Mike Cohn préconise 70% de tests unitaires rapides pour une rétroaction immédiate.',
    'Les Flaky Tests dégradent la confiance et doivent être traités sans délai pour préserver la règle du Tronc Vert.'
  ],
  checklist: [
    'Je sais expliciter les conditions impératives d’une véritable pratique d’Intégration Continue.',
    'Je sais argumenter les bénéfices du Trunk-Based Development par rapport à GitFlow.',
    'Je sais déterminer l’incrément SemVer adéquat pour toute modification d’interface logicielle.',
    'Je connais les ratios recommandés de la pyramide des tests logiciels.',
    'Je sais diagnostiquer les causes courantes de flakiness (conditions de course, état partagé, réseau).',
    'Je sais concevoir un workflow d’isolation et de réhabilitation pour un test instable.'
  ],
  notions: [
    'Principes de l’Intégration Continue (CI)',
    'Trunk-Based Development vs GitFlow',
    'Semantic Versioning (SemVer 2.0.0)',
    'Breaking Changes &amp; Rétrocompatibilité',
    'Pyramide des tests (Mike Cohn)',
    'Tests Unitaires, Intégration, E2E',
    'Tests instables (Flaky Tests)',
    'Mise en quarantaine &amp; Règle du Tronc Vert'
  ],
  pitfalls: [
    'Conserver des branches Git de fonctionnalités isolées pendant des semaines en prétendant pratiquer l’Intégration Continue.',
    'Relancer en boucle un pipeline de tests défaillant au lieu d’isoler immédiatement un test instable (Flaky Test) en quarantaine.',
    'Incrémenter une version MINOR ou PATCH lors de la modification cassante d’un paramètre d’API publique, brisant le contrat SemVer.',
    'Inverser la pyramide des tests en automatisant quasi-exclusivement des tests End-to-End ultra-lents et fragiles au détriment des tests unitaires.'
  ],
  questions: [
    {
      stem: 'Quel est l’intervalle temporel maximal préconisé pour intégrer son code sur le tronc dans une véritable démarche d’Intégration Continue ?',
      opts: [
        'Une fois par mois à la fin du sprint',
        'Au minimum une fois par jour (idéalement plusieurs fois par jour)',
        'Uniquement lorsque la fonctionnalité complète est recettée par le client',
        'À chaque fin de trimestre'
      ],
      correct: 1,
      exp: 'L’Intégration Continue exige des commits fréquents (au moins quotidiens) sur la branche commune pour éviter l’accumulation de divergences et le merge hell.'
    },
    {
      stem: 'Quelle caractéristique distingue le Trunk-Based Development de la stratégie GitFlow classique ?',
      opts: [
        'L’absence totale de système de contrôle de version',
        'L’utilisation d’une branche principale unique avec des branches de travail très courtes (moins de 24h) et des Feature Flags',
        'L’interdiction formelle d’exécuter des tests automatisés',
        'La conservation de branches de fonctionnalités pendant au moins six mois'
      ],
      correct: 1,
      exp: 'Le Trunk-Based Development s’appuie sur des branches éphémères fusionnées rapidement sur le tronc principal, les fonctionnalités en cours de développement étant neutralisées via des Feature Flags.'
    },
    {
      stem: 'Selon la spécification SemVer 2.0.0, quelle composante doit être incrémentée lors de la suppression d’un paramètre obligatoire dans une route d’API publique ?',
      opts: [
        'PATCH',
        'MINOR',
        'MAJOR',
        'BUILD'
      ],
      correct: 2,
      exp: 'Supprimer ou modifier un paramètre dans une API publique rompt la compatibilité ascendante pour les clients existants (Breaking Change) : la version MAJOR doit être incrémentée.'
    },
    {
      stem: 'Quelle est la répartition approximative recommandée des types de tests dans la pyramide des tests de Mike Cohn ?',
      opts: [
        '70% E2E, 20% Intégration, 10% Unitaires',
        '70% Unitaires, 20% Intégration, 10% E2E / UI',
        '33% de chaque type à parts strictement égales',
        '90% manuels, 10% automatisés'
      ],
      correct: 1,
      exp: 'La pyramide préconise une large base de tests unitaires rapides et isolés (≈70%), complétée par des tests d’intégration (≈20%) et un sommet réduit de tests E2E coûteux (≈10%).'
    },
    {
      stem: 'Qu’est-ce qu’un « Flaky Test » dans un pipeline d’automatisation ?',
      opts: [
        'Un test écrit en langage Perl déprécié',
        'Un test qui réussit ou échoue de manière intermittente sur un même code source sans modification',
        'Un test qui prend systématiquement plus d’une heure à s’exécuter',
        'Un test unitaire qui ne teste aucune assertion'
      ],
      correct: 1,
      exp: 'Un Flaky Test est instable : pour un même commit immuable, il passe ou échoue aléatoirement, souvent à cause de conditions de course (timing) ou d’état externe partagé.'
    },
    {
      stem: 'Quelle est la réaction appropriée lorsqu’un test est identifié comme « Flaky » sur le pipeline de CI principal ?',
      opts: [
        'Relancer en boucle le pipeline jusqu’à ce qu’il devienne vert par hasard',
        'Mettre immédiatement le test en quarantaine hors du build bloquant et planifier sa correction',
        'Supprimer la suite de tests complète du projet',
        'Désactiver la vérification des tests sur la branche de production'
      ],
      correct: 1,
      exp: 'La quarantaine évite de bloquer abusivement les déploiements légitimes tout en éliminant l’accoutumance toxique aux faux positifs qui décrédibilise l’outillage CI.'
    },
    {
      stem: 'Si une librairie passe de la version 1.4.2 à 1.5.0, quel type d’évolution ce changement représente-t-il obligatoirement selon SemVer ?',
      opts: [
        'Une refonte totale avec rupture de contrat',
        'L’ajout d’une nouvelle fonctionnalité rétrocompatible sans breaking change',
        'Uniquement la correction d’un bogue de sécurité critique',
        'Une version de pré-développement instable'
      ],
      correct: 1,
      exp: 'L’incrément MINOR (1.4.2 -> 1.5.0) certifie contractuellement l’ajout de nouvelles capacités logicielles tout en maintenant une compatibilité ascendante absolue.'
    },
    {
      stem: 'Quel est le seuil de temps recommandé pour qu’un pipeline d’intégration continue retourne son feedback aux développeurs ?',
      opts: [
        'Moins de 10 minutes',
        'Environ 4 heures (pendant la pause déjeuner)',
        '24 heures (la nuit suivante)',
        'Une semaine'
      ],
      correct: 0,
      exp: 'Un retour rapide en moins de 10 minutes permet au développeur de corriger immédiatement le bogue tant que le contexte mental du code modifié est encore parfaitement frais.'
    }
  ],
  flashcards: [
    {
      q: 'Quel est le principe fondamental de l’Intégration Continue (CI) ?',
      a: 'Intégrer le code fréquemment (au moins une fois par jour) sur un tronc commun et vérifier automatiquement chaque intégration par un build et des tests.'
    },
    {
      q: 'Quelles sont les composantes de la numérotation SemVer (MAJOR.MINOR.PATCH) ?',
      a: 'MAJOR : rupture de compatibilité (breaking change). MINOR : ajout de fonctionnalité rétrocompatible. PATCH : correction de bogue rétrocompatible.'
    },
    {
      q: 'Pourquoi le Trunk-Based Development est-il privilégié face à GitFlow dans les équipes performantes ?',
      a: 'Il supprime les branches longues divergentes, élimine les conflits de fusion massifs et accélère drastiquement la fréquence de livraison en production.'
    },
    {
      q: 'Quelle est la répartition de la Pyramide des Tests de Mike Cohn ?',
      a: 'Base large de tests unitaires rapides (≈70%), couche médiane de tests d’intégration (≈20%) et sommet étroit de tests End-to-End (≈10%).'
    },
    {
      q: 'Pourquoi les Flaky Tests sont-ils particulièrement dangereux pour une équipe ?',
      a: 'Ils sapent la confiance envers la suite de tests automatisée, conduisant les développeurs à ignorer les alertes et à laisser passer de réelles régressions critiques.'
    },
    {
      q: 'Qu’est-ce que la règle « Stop the Line » (Andon Cord) appliquée à la CI ?',
      a: 'Lorsqu’un commit brise le build sur la branche principale, toute livraison nouvelle est suspendue jusqu’à ce que le tronc soit réparé en priorité absolue.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Moins de 4/8 : Révisez la définition de la CI, les règles de SemVer 2.0.0 et la pyramide des tests.'
    },
    {
      cls: 'medium',
      text: 'Entre 5/8 et 7/8 : Bon niveau, revoyez les causes de flakiness et les nuances de Trunk-Based Development.'
    },
    {
      cls: 'high',
      text: '8/8 : Excellent ! Vous maîtrisez parfaitement les principes d’intégration continue et de qualification logicielle.'
    }
  ]
};
