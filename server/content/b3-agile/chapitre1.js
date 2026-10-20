/**
 * Chapitre 1 du cours « Méthodes Agiles B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 1,
  title: 'Fondements de la Gestion de Projet : Du Cycle Prédictif au Manifeste Agile',
  short: 'Du Prédictif au Manifeste Agile',
  toc: 'Triangle de fer (périmètre/coût/délai), cycle en cascade, cycle en V, réseau PERT et chemin critique, émergence de l’agilité, 4 valeurs et 12 principes du Manifeste de 2001.',
  time: '≈ 2 h 45 de travail',
  free: true,
  situation: 'Durant les premières décennies de l’ingénierie logicielle, les organisations ont calqué leurs méthodes de gestion de projet sur les industries du génie civil et de la manufacture : spécifications intégrales en amont, planification séquentielle rigide en cascade (Waterfall) et validation tardive lors des phases de recette. Pourtant, dans le monde informatique, le taux d’échec et de dépassement budgétaire des projets dépassait historiquement 70 % (Rapport Chaos du Standish Group), car les besoins des utilisateurs évoluent plus vite que le cycle de développement. En 2001, dix-sept pionniers du génie logiciel se sont réunis à Snowbird pour formaliser une rupture épistémologique : le Manifeste Agile. L’ingénieur de niveau Bachelor 3 doit maîtriser les principes de l’ordonnancement traditionnel (PERT, Gantt, chemin critique) pour dialoguer avec les directions de projet, tout en comprenant la supériorité du paradigme empirique agile (basé sur la transparence, l’inspection et l’adaptation continue) pour livrer de la valeur logicielle en environnement incertain.',
  objectives: [
    'analyser le Triangle de Fer (Périmètre, Coûts, Délais) et comprendre son inversion dans la démarche agile ;',
    'maîtriser le fonctionnement et les cas d’usage des cycles traditionnels (Cascade / Waterfall et Cycle en V) ;',
    'calculer les dates au plus tôt (ES), au plus tard (LF) et le chemin critique dans un graphe PERT ;',
    'expliciter les 4 valeurs cardinales et les 12 principes du Manifeste Agile de 2001 ;',
    'distinguer le contrôle prédictif du contrôle empirique (Transparence, Inspection, Adaptation) ;',
    'développer en Python 3 des calculateurs de dérives budgétaires/calendaires, des moteurs de résolution de chemin critique PERT et des classificateurs d’adéquation méthodologique.'
  ],
  sections: [
    {
      title: 'Le Triangle de Fer et les Limites des Modèles Prédictifs (Waterfall &amp; Cycle en V)',
      html: [
        '<p>Tout projet d’ingénierie est traditionnellement contraint par trois variables interdépendantes constituant le <strong>Triangle de Fer</strong> (triple contrainte) : le <strong>périmètre fonctionnel (Scope)</strong>, les <strong>coûts (Budget / Ressources)</strong>, et les <strong>délais (Planning / Time)</strong>, la qualité technique servant de pivot central.</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. L’Approche Traditionnelle en Cascade (Waterfall)</h4>',
        '    <p>Conçue par Winston Royce en 1970, la démarche <strong>Waterfall</strong> postule que chaque phase doit être entièrement achevée et validée avant que la suivante ne commence :</p>',
        '    <p><em>Expression des besoins &rarr; Conception &rarr; Développement &rarr; Tests &rarr; Déploiement &rarr; Maintenance</em>.</p>',
        '    <p><strong>Limites fondamentales :</strong> Les retours utilisateurs surviennent trop tard (lors de la livraison finale), le coût du changement est exponentiel, et les dérives budgétaires sont masquées jusqu’à l’échéance contractuelle.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Le Cycle en V</h4>',
        '    <p>Amélioration du modèle en cascade, le <strong>Cycle en V</strong> associe à chaque phase descendante de conception une phase ascendante de validation correspondante :</p>',
        '    <ul>',
        '      <li>Exigences métier &harr; Recette utilisateur (UAT)</li>',
        '      <li>Spécifications générales &harr; Tests système</li>',
        '      <li>Conception détaillée &harr; Tests d’intégration</li>',
        '      <li>Codage &harr; Tests unitaires</li>',
        '    </ul>',
        '    <p>Idéal pour les systèmes embarqués critiques et ferroviaires, il demeure néanmoins rigide face aux changements de marché.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Ordonnancement Séquentiel et Chemin Critique (Réseau PERT &amp; Diagramme de Gantt)',
      html: [
        '<p>Pour planifier et maîtriser les interdépendances temporelles des projets déterministes, deux outils fondamentaux sont utilisés par les gestionnaires de projet :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. La Méthode PERT (Graphe Orienté Sans Cycle - DAG)</h4>',
        '    <p>Le réseau <strong>PERT (Program Evaluation and Review Technique)</strong> modélise les tâches sous forme de réseau de sommets et d’arcs pondérés par la durée :</p>',
        '    <ul>',
        '      <li><strong>Date au plus tôt (Early Start - ES)</strong> : Date minimale à laquelle une tâche peut démarrer : <code>ES = max(EF des prédécesseurs)</code>.</li>',
        '      <li><strong>Date de fin au plus tôt (Early Finish - EF)</strong> : <code>EF = ES + Durée</code>.</li>',
        '      <li><strong>Chemin Critique (Critical Path)</strong> : La chaîne continue de tâches reliant le début à la fin du projet dont la durée totale est maximale. <em>Toute tâche sur le chemin critique a une marge libre et totale nulle</em> : le moindre retard décale l’ensemble du projet.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Le Diagramme de Gantt</h4>',
        '    <p>Inventé par Henry Gantt, ce graphique en barres horizontales positionne chaque tâche sur une échelle temporelle calendaire avec ses prédécesseurs et ses <strong>jalons (milestones)</strong> :</p>',
        '    <p>Un jalon est un point de contrôle clé à durée nulle (durée = 0) matérialisant une décision stratégique, la signature d’un accord client ou la livraison d’une version majeure.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'L’Émergence de l’Agilité : Les 4 Valeurs du Manifeste Agile (Snowbird 2001)',
      html: [
        '<p>En février 2001, dix-sept experts du développement logiciel (dont Kent Beck, Jeff Sutherland, Ken Schwaber, Martin Fowler et Alistair Cockburn) ont rédigé le <strong>Manifeste pour le développement agile de logiciels</strong> (<em>Agile Manifesto</em>) pour consacrer une inversion de paradigme :</p>',
        '<table class="table">',
        '  <thead>',
        '    <tr><th>Valeur Prioritaire Agile</th><th>Valeur Traditionnelle Secondaire</th><th>Justification Métier en Ingénierie Logicielle</th></tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr><td><strong>Les individus et leurs interactions</strong></td><td>plus que les processus et les outils</td><td>Aucun outil (Jira, Git, CI/CD) ne compensera un manque de communication directe au sein de l’équipe.</td></tr>',
        '    <tr><td><strong>Des logiciels opérationnels</strong></td><td>plus qu’une documentation exhaustive</td><td>La seule preuve concrète d’avancement réside dans un code testé, fonctionnel et déployé entre les mains de l’utilisateur.</td></tr>',
        '    <tr><td><strong>La collaboration avec les clients</strong></td><td>plus que la négociation contractuelle</td><td>Construire un produit réussi nécessite un dialogue continu et itératif, non une bataille juridique sur un cahier des charges.</td></tr>',
        '    <tr><td><strong>L’adaptation au changement</strong></td><td>plus que le suivi d’un plan</td><td>Un plan devient obsolète dès que l’environnement concurrentiel change ; l’équipe agile capitalise sur le changement comme avantage.</td></tr>',
        '  </tbody>',
        '</table>',
        '<p><em>« Bien que nous reconnaissions la valeur des éléments situés à droite, nous privilégions les éléments situés à gauche. »</em></p>'
      ].join('\n')
    },
    {
      title: 'Les 12 Principes Fondateurs et le Contrôle Empirique de Processus',
      html: [
        '<p>Les 4 valeurs reposent sur <strong>12 principes fondateurs</strong> qui définissent la philosophie opérationnelle de l’agilité :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. Les 3 Piliers du Contrôle Empirique</h4>',
        '    <p>Contrairement aux modèles prédictifs fondés sur l’illusion de la certitude, l’agilité s’appuie sur l’empirisme :</p>',
        '    <ul>',
        '      <li><strong>Transparence</strong> : Tous les aspects du travail (backlog, bugs, état d’avancement, métriques) doivent être visibles de tous les acteurs sans artifice.</li>',
        '      <li><strong>Inspection</strong> : Les artefacts et la progression doivent être évalués régulièrement pour détecter les écarts de trajectoire.</li>',
        '      <li><strong>Adaptation</strong> : Dès qu’un écart inacceptable est constaté, le processus ou le produit doit être ajusté immédiatement.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Principes Clés d’Exécution</h4>',
        '    <ul>',
        '      <li>Livrer fréquemment des logiciels fonctionnels avec des cycles de quelques semaines.</li>',
        '      <li>Accueillir positivement les changements de besoins, même tard dans le développement.</li>',
        '      <li>Faire collaborer quotidiennement développeurs et représentants du métier.</li>',
        '      <li>Maintenir un rythme soutenable indéfiniment (pas de crunch continu).</li>',
        '      <li>La simplicité : l’art de maximiser la quantité de travail <em>non fait</em>.</li>',
        '      <li>À intervalles réguliers, l’équipe réfléchit aux moyens de devenir plus efficace puis adapte son comportement.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],
  methodTitle: 'Méthode d’Ingénierie : Cadrage Initial et Choix d’une Trajectoire de Projet',
  method: [
    'Étape 1 : Cartographier les parties prenantes (Sponsor, Utilisateurs finaux, Développeurs, Régulateurs) et clarifier les objectifs stratégiques.',
    'Étape 2 : Évaluer le degré d’incertitude métier (stabilité des exigences) et le degré d’incertitude technique (technologies nouvelles vs éprouvées).',
    'Étape 3 : Identifier les contraintes réglementaires et contractuelles strictes (normes de sécurité, certifications médicales ou aéronautiques).',
    'Étape 4 : Déterminer la trajectoire méthodologique : Waterfall prédictif pour exigences stables et déterministes, Agile pour forte innovation et feedbacks fréquents, ou Hybride pour gouvernance structurée avec exécution itérative.',
    'Étape 5 : Formaliser la Charte de Projet (Project Charter) définissant la vision, le périmètre initial, les jalons clés et les rôles.',
    'Étape 6 : Mettre en place les outils d’observation partagée et définir le rythme des cycles d’inspection et d’adaptation.'
  ],
  summary: [
    'Le Triangle de Fer classique lie périmètre, coûts et délais ; l’agilité fixe le délai et le coût tout en faisant du périmètre la variable d’ajustement priorisée.',
    'Le modèle Waterfall est séquentiel et rigide ; le Cycle en V symétrise conception et tests de validation.',
    'Dans un réseau PERT, le chemin critique relie les tâches sans marge dont le moindre retard décale la date de fin globale du projet.',
    'Les 4 valeurs du Manifeste Agile de 2001 privilégient les individus, le logiciel opérationnel, la collaboration client et l’adaptation au changement.',
    'L’agilité repose sur le contrôle empirique articulé autour de trois piliers fondamentaux : Transparence, Inspection et Adaptation.',
    'Une approche Hybride est souvent optimale pour concilier la gouvernance globale d’entreprise avec la vélocité et l’autonomie d’équipes de développement itératives.'
  ],
  checklist: [
    'Je sais expliquer la triple contrainte du Triangle de Fer et la façon dont l’Agilité l’inverse.',
    'Je connais la structure et les limites du modèle en cascade (Waterfall) et du Cycle en V.',
    'Je sais calculer la date de début au plus tôt (ES) et la fin au plus tôt (EF) dans un réseau PERT.',
    'Je sais identifier le chemin critique et comprendre pourquoi ses marges temporelles sont nulles.',
    'Je peux citer et expliquer les 4 valeurs cardinales du Manifeste Agile de 2001.',
    'Je maîtrise les trois piliers du contrôle empirique (Transparence, Inspection, Adaptation).'
  ],
  notions: [
    'Triangle de Fer (Scope, Cost, Time)',
    'Modèle en Cascade (Waterfall)',
    'Cycle en V et validation symétrique',
    'Réseau PERT & Chemin Critique',
    'Diagramme de Gantt & Jalons (Milestones)',
    'Les 4 valeurs du Manifeste Agile (2001)',
    'Les 12 principes agiles fondateurs',
    'Contrôle empirique (Transparence, Inspection, Adaptation)'
  ],
  pitfalls: [
    'Confondre agilité et absence totale de planification (l’agilité planifie continuellement à chaque itération).',
    'Tenter d’appliquer un modèle Waterfall strict sur un produit innovant où les besoins réels ne sont découverts qu’à l’usage.',
    'Oublier de vérifier le chemin critique dans un projet traditionnel (optimiser une tâche non critique n’accélère en rien la livraison finale).',
    'Réduire l’agilité aux seuls outils logiciels (Jira, Trello) sans incarner la culture de collaboration et d’autonomie d’équipe.'
  ],
  questions: [
    {
      stem: 'Dans l’approche traditionnelle, comment le Triangle de Fer (Périmètre, Coûts, Délais) est-il traditionnellement contraint ?',
      opts: [
        'Le périmètre est fixe, les coûts et délais sont des variables d’ajustement qui dérivent souvent',
        'Les délais sont fixes et le périmètre est totalement libre',
        'Le budget est infini et le périmètre est nul',
        'Toutes les trois variables sont strictement impossibles à modifier'
      ],
      correct: 0,
      exp: 'En gestion prédictive traditionnelle, le périmètre est contractuellement figé au départ (cahier des charges), ce qui reporte toute la dérive sur les coûts et les délais.'
    },
    {
      stem: 'Dans un graphe d’ordonnancement PERT, quelle est la caractéristique fondamentale d’une tâche située sur le chemin critique ?',
      opts: [
        'Elle ne nécessite aucune ressource humaine',
        'Elle possède une marge totale et une marge libre strictement nulles',
        'Elle s’exécute toujours en moins d’une journée',
        'Elle n’a aucun prédécesseur'
      ],
      correct: 1,
      exp: 'Sur le chemin critique, la marge de battement est nulle (ES = LS et EF = LF) : tout retard sur cette tâche décale immédiatement la date d’achèvement du projet entier.'
    },
    {
      stem: 'Laquelle des propositions suivantes n’est PAS l’une des 4 valeurs fondamentales du Manifeste Agile de 2001 ?',
      opts: [
        'Des logiciels opérationnels plus qu’une documentation exhaustive',
        'Les individus et leurs interactions plus que les processus et les outils',
        'Le respect scrupuleux d’un plan initial plus que la flexibilité face aux imprévus',
        'La collaboration avec les clients plus que la négociation contractuelle'
      ],
      correct: 2,
      exp: 'La 4e valeur du Manifeste Agile est au contraire « L’adaptation au changement plus que le suivi d’un plan ».'
    },
    {
      stem: 'Quels sont les trois piliers théoriques du contrôle de processus empirique sur lesquels repose l’agilité ?',
      opts: [
        'Contrat, Audit, Pénalité',
        'Transparence, Inspection, Adaptation',
        'Hiérarchie, Documentation, Validation',
        'Rapidité, Automatisation, Rentabilité'
      ],
      correct: 1,
      exp: 'L’empirisme repose sur la Transparence (visibilité factuelle), l’Inspection (évaluation régulière) et l’Adaptation (ajustement immédiat des dérives).'
    },
    {
      stem: 'Dans le cycle en V, à quel niveau de conception les tests unitaires correspondent-ils directement ?',
      opts: [
        'Aux exigences métier globales',
        'À l’expression des besoins utilisateurs',
        'À la conception détaillée et au codage des modules',
        'À la recette finale en production'
      ],
      correct: 2,
      exp: 'Dans la branche ascendante du cycle en V, les tests unitaires valident directement les composants issus du codage et de la conception détaillée.'
    },
    {
      stem: 'Qu’est-ce qu’un « jalon » (milestone) dans un diagramme de Gantt ?',
      opts: [
        'Une phase de codage intensive de 3 semaines',
        'Un point de contrôle ou événement clé à durée nulle matérialisant une décision ou une validation majeure',
        'Une facture impayée',
        'Un ticket de bug bloquant'
      ],
      correct: 1,
      exp: 'Un jalon est un marqueur temporel de durée nulle (durée = 0) signalant la fin d’une étape importante, une recette ou une décision de comité.'
    },
    {
      stem: 'Pour quel profil de projet l’approche prédictive (Waterfall) demeure-t-elle la plus pertinente et justifiée ?',
      opts: [
        'Une application mobile grand public en constante évolution d’ergonomie',
        'Un projet hautement innovant avec des technologies inconnues de l’équipe',
        'Un projet aux exigences techniquement figées et soumises à des contraintes réglementaires et physiques strictes (ex: infrastructure lourde, matériel aéronautique certifié)',
        'Une startup cherchant son Product-Market Fit'
      ],
      correct: 2,
      exp: 'Lorsque le produit est parfaitement connu à l’avance, qu’il existe peu d’incertitude et que le coût du changement matériel est prohibitif, la démarche prédictive linéaire est adaptée.'
    },
    {
      stem: 'D’après le 10e principe du Manifeste Agile, comment la « simplicité » est-elle définie ?',
      opts: [
        'Écrire le moins de lignes de code possible par jour',
        'L’art de maximiser la quantité de travail que l’on décide de ne pas faire',
        'Supprimer tous les tests automatisés',
        'Ne jamais concevoir d’architecture'
      ],
      correct: 1,
      exp: 'Le principe 10 formule : « La simplicité — c’est-à-dire l’art de maximiser la quantité de travail non fait — est essentielle. »'
    }
  ],
  flashcards: [
    {
      q: 'Qu’est-ce que le Triangle de Fer d’un projet ?',
      a: 'Le modèle liant Périmètre (Scope), Coûts (Budget) et Délais (Planning), la Qualité servant de variable centrale.'
    },
    {
      q: 'Comment l’Agilité inverse-t-elle le Triangle de Fer ?',
      a: 'Les Délais et Coûts sont fixés (sprints et équipe stables), tandis que le Périmètre devient la variable priorisée selon la valeur.'
    },
    {
      q: 'Qu’est-ce que le chemin critique dans un réseau PERT ?',
      a: 'La suite continue de tâches sans marge dont la somme des durées représente la durée minimale incompressible du projet.'
    },
    {
      q: 'Quelles sont les 4 valeurs du Manifeste Agile de 2001 ?',
      a: 'Individus et interactions, Logiciel opérationnel, Collaboration client, et Adaptation au changement.'
    },
    {
      q: 'Quels sont les 3 piliers du contrôle empirique ?',
      a: 'Transparence, Inspection et Adaptation.'
    },
    {
      q: 'Quelle est la différence majeure entre Waterfall et Agile face au risque ?',
      a: 'Waterfall reporte la découverte des risques en fin de projet (recette) ; l’Agile confronte les risques à chaque itération courte.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Incompréhension des différences entre modèles prédictifs et agiles ou méconnaissance du Manifeste Agile de 2001.'
    },
    {
      cls: 'medium',
      text: 'Bonne maîtrise des 4 valeurs et 12 principes, calcul de chemin critique PERT et sélection méthodologique appropriée.'
    },
    {
      cls: 'high',
      text: 'Capacité experte à structurer le cadrage de projets complexes, articuler approches prédictives et empiriques, et concevoir des trajectoires hybrides industrielles.'
    }
  ]
};
