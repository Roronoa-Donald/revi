/**
 * Chapitre 3 du cours « Méthodes Agiles B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 3,
  title: 'Kanban &amp; Maîtrise des Flux : Visualisation, WIP &amp; Métriques',
  short: 'Kanban &amp; Maîtrise des Flux',
  toc: 'Principes Kanban, tableau visuel, limitation du travail en cours (WIP Limits), goulots d’étranglement, Lead Time, Cycle Time et Loi de Little.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B3 et plus',
  situation: 'Issu du système de production Toyota (TPS) développé par Taiichi Ohno et adapté à l’ingénierie logicielle par David J. Anderson dans les années 2000, Kanban est une approche d’amélioration continue et d’organisation du travail en flux tiré (Pull System). Contrairement aux cycles cadencés de Scrum (itérations de durée fixe), Kanban visualise le cheminement des cartes de tâches à travers différentes étapes de valeur et focalise l’équipe sur la réduction du travail en cours (WIP - Work In Progress). En éliminant le multitâche destructeur et les temps d’attente dormants, Kanban permet d’atteindre une fluidité opérationnelle maximale. L’ingénieur de niveau Bachelor 3 doit maîtriser la modélisation mathématique du flux régie par la Loi de Little, savoir calculer le Lead Time et le Cycle Time, interpréter un Diagramme de Flux Cumulé (CFD) et identifier immédiatement les goulots d’étranglement dans une chaîne de valeur.',
  objectives: [
    'assimiler les origines Lean et les 6 pratiques fondamentales de la méthode Kanban ;',
    'concevoir un tableau Kanban à flux tiré en définissant des limites WIP adaptées par colonne ;',
    'distinguer avec rigueur le Lead Time, le Cycle Time et le temps d’attente (Wait Time) ;',
    'analyser un Diagramme de Flux Cumulé (Cumulative Flow Diagram - CFD) pour repérer les anomalies de cadence ;',
    'appliquer la Loi de Little ($TH = WIP / CT$) pour diagnostiquer la performance et la capacité du système ;',
    'analyser et résoudre méthodologiquement des contrôleurs de limites WIP, des calculateurs de métriques d’écoulement et des détecteurs de goulots d’étranglement.'
  ],
  sections: [
    {
      title: 'Les Origines Lean et les 6 Pratiques Fondamentales de la Méthode Kanban',
      html: [
        '<p>Kanban (littéralement « étiquette » ou « panneau visuel » en japonais) s’oppose au système traditionnel de <strong>flux poussé (Push)</strong>, où les tâches sont assignées de force aux collaborateurs sans considération de leur charge réelle. En <strong>flux tiré (Pull)</strong>, un développeur ne prend en charge une nouvelle carte que lorsqu’il a terminé la précédente et qu’une place se libère.</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. Les 4 Principes Fondateurs</h4>',
        '    <ul>',
        '      <li><strong>Commencer par ce que vous faites maintenant</strong> (respecter les rôles et processus existants).</li>',
        '      <li><strong>Accepter de poursuivre le changement par évolution</strong> (pas de révolution brutale déstabilisante).</li>',
        '      <li><strong>Respecter les processus, les rôles et les responsabilités actuels</strong>.</li>',
        '      <li><strong>Encourager les actes de leadership à tous les niveaux</strong> de l’organisation.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Les 6 Pratiques Essentielles</h4>',
        '    <ul>',
        '      <li>1. Visualiser le flux de travail (tableau physique ou digital).</li>',
        '      <li>2. Limiter le travail en cours (WIP Limits).</li>',
        '      <li>3. Mesurer et gérer le flux.</li>',
        '      <li>4. Rendre les politiques explicites (critères d’entrée et de sortie).</li>',
        '      <li>5. Mettre en œuvre des boucles de feedback régulières.</li>',
        '      <li>6. Améliorer de manière collaborative et évoluer scientifiquement.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Conception du Tableau Kanban et Rigueur des Limites WIP',
      html: [
        '<p>Le cœur opérationnel de Kanban réside dans le plafonnement strict du nombre de tickets autorisés simultanément dans chaque état grâce aux <strong>limites WIP (Work In Progress)</strong> :</p>',
        '<table class="table">',
        '  <thead>',
        '    <tr><th>Étape du Flux</th><th>Limite WIP Recommandée</th><th>Signification &amp; Règle d’Équipe</th></tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr><td><strong>Backlog Prêt</strong></td><td>Illimité ou seuil haut (ex: 20)</td><td>Tickets raffinés prêts à être tirés par les développeurs.</td></tr>',
        '    <tr><td><strong>Développement (Doing)</strong></td><td><code>Nombre de devs &times; 1</code> ou <code>1.5</code></td><td>Empêche chaque ingénieur d’ouvrir plusieurs chantiers en parallèle.</td></tr>',
        '    <tr><td><strong>Revue de Code (Peer Review)</strong></td><td>Seuil bas (ex: 2 ou 3)</td><td>Priorité absolue : relire le code des collègues avant de démarrer un nouveau ticket.</td></tr>',
        '    <tr><td><strong>Test &amp; Validation (QA)</strong></td><td>Calibré sur la capacité QA (ex: 2)</td><td>Évite l’accumulation de tickets non testés créant un effet d’entonnoir.</td></tr>',
        '    <tr><td><strong>Déployé en Production (Done)</strong></td><td>Sans limite</td><td>Cartes archivées apportant de la valeur aux utilisateurs.</td></tr>',
        '  </tbody>',
        '</table>',
        '<p><strong>L’Axiome d’Or de Kanban :</strong> <em>« Stop starting, start finishing »</em>. Lorsqu’une colonne atteint sa limite WIP, il est strictement interdit d’y injecter une nouvelle carte. Les équipiers disponibles doivent aller aider en aval à débloquer les cartes encombrant le tableau.</p>'
      ].join('\n')
    },
    {
      title: 'Métriques d’Écoulement : Lead Time, Cycle Time &amp; Diagramme CFD',
      html: [
        '<p>Pour mesurer objectivement la vitesse et la prévisibilité d’une équipe sans estimations subjectives, Kanban s’appuie sur les horodatages réels :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. Les Délais Clés</h4>',
        '    <p><strong>Lead Time (Temps de traversée)</strong> : Durée totale écoulée entre la demande du client (création du ticket) et sa mise à disposition en production.<br><code>Lead_Time = t_done - t_created</code></p>',
        '    <p><strong>Cycle Time (Temps de cycle)</strong> : Durée pendant laquelle l’équipe a activement travaillé sur le ticket.<br><code>Cycle_Time = t_done - t_started</code></p>',
        '    <p><strong>Throughput (Débit)</strong> : Nombre de cartes terminées par unité de temps (ex: 12 cartes par semaine).</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Le Diagramme de Flux Cumulé (CFD)</h4>',
        '    <p>Le <strong>Cumulative Flow Diagram (CFD)</strong> est l’outil d’analyse par excellence : il trace dans le temps le cumul des cartes passées par chaque étape :</p>',
        '    <ul>',
        '      <li><strong>Distance horizontale</strong> entre la courbe d’entrée et de sortie : Représente le <em>Lead Time moyen</em>.</li>',
        '      <li><strong>Distance verticale</strong> entre deux courbes : Représente le <em>WIP instantané</em> à cet instant.</li>',
        '      <li><strong>Pente constante parallèle</strong> : Flux stable et équilibré. Une bande qui s’élargit signale un goulot d’étranglement immédiat.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'La Loi de Little ($TH = WIP / CT$) et les Goulots d’Étranglement',
      html: [
        '<p>Formulée en 1961 par le mathématicien John Little dans le cadre de la théorie des files d’attente, la <strong>Loi de Little</strong> s’applique rigoureusement aux systèmes Kanban à l’équilibre :</p>',
        '<div class="card">',
        '  <h4>Équation Fondamentale de Little</h4>',
        '  <p style="font-size:1.15rem; text-align:center;"><strong>$WIP = Throughput \\\\times Cycle\_Time$</strong> &nbsp;&nbsp;&hArr;&nbsp;&nbsp; <strong>$Cycle\_Time = \\\\frac{WIP}{Throughput}$</strong></p>',
        '  <p><strong>Conséquence managériale cruciale :</strong> Pour réduire le délai de livraison (Cycle Time) d’une équipe, il existe deux leviers mathématiques :</p>',
        '  <ol>',
        '    <li>Augmenter le débit (Throughput), ce qui exige des embauches ou des automatisations lourdes.</li>',
        '    <li><strong>Réduire le travail en cours (WIP)</strong>, ce qui est gratuit, immédiat et sans coût structurel ! En divisant le WIP par deux, on divise mécaniquement le temps de traversée par deux.</li>',
        '  </ol>',
        '  <p><strong>La Théorie des Contraintes (Goldratt) :</strong> La cadence de production d’une chaîne globale est strictement bridée par l’étape qui possède le débit le plus faible (le <em>goulot d’étranglement</em>). Optimiser une étape qui n’est pas le goulot n’apporte aucun gain global et crée des stocks inutiles.</p>',
        '</div>'
      ].join('\n')
    }
  ],
  methodTitle: 'Méthode d’Ingénierie : Mise en Place et Optimisation d’un Flux Tiré Kanban',
  method: [
    'Étape 1 : Cartographier la chaîne de valeur actuelle (Value Stream Mapping) depuis l’idée jusqu’au déploiement.',
    'Étape 2 : Créer le tableau Kanban en matérialisant chaque étape réelle de transition de statut.',
    'Étape 3 : Définir des règles d’entrée et de sortie explicites (Definition of Ready / Done) pour chaque colonne.',
    'Étape 4 : Fixer des limites WIP conservatrices (ex: 2 cartes par développeur) sur les colonnes de réalisation et de revue.',
    'Étape 5 : Instaurer une routine d’alignement quotidien devant le tableau (Kanban Standup) en analysant les flux de droite à gauche.',
    'Étape 6 : Mesurer le Lead Time et le Throughput hebdomadaire, analyser le CFD et ajuster les limites WIP pour éliminer les goulots.'
  ],
  summary: [
    'Kanban repose sur le flux tiré (Pull) où le travail n’est engagé que lorsqu’une capacité se libère.',
    'Limiter le travail en cours (WIP) réduit le multitâche et fluidifie l’écoulement (Stop starting, start finishing).',
    'Le Lead Time mesure le temps total de traversée ; le Cycle Time mesure le temps de travail effectif.',
    'Le Diagramme de Flux Cumulé (CFD) visualise le WIP (écart vertical) et le temps de cycle moyen (écart horizontal).',
    'La Loi de Little ($Cycle\\_Time = WIP / Throughput$) démontre qu’abaisser le WIP réduit proportionnellement les délais.',
    'La performance globale du système est plafonnée par le débit de son étape goulot d’étranglement.'
  ],
  checklist: [
    'Je sais expliquer la différence entre un flux poussé (Push) et un flux tiré (Pull).',
    'Je comprends l’intérêt des limites WIP pour la concentration et la vélocité d’équipe.',
    'Je sais distinguer et calculer le Lead Time, le Cycle Time et le Wait Time.',
    'Je sais interpréter un Diagramme de Flux Cumulé (CFD) et repérer un étranglement.',
    'Je maîtrise la Loi de Little et sais en déduire les leviers d’optimisation du cycle de livraison.',
    'Je sais identifier le goulot d’étranglement d’une chaîne de valeur en comparant les débits d’étape.'
  ],
  notions: [
    'Flux poussé (Push) vs Flux tiré (Pull)',
    'Système Kanban & Cartes visuelles',
    'Limites de Travail en Cours (WIP Limits)',
    'Lead Time vs Cycle Time vs Wait Time',
    'Débit d’écoulement (Throughput)',
    'Diagramme de Flux Cumulé (CFD)',
    'Loi de Little ($WIP = TH \\\\times CT$)',
    'Théorie des Contraintes & Goulot d’Étranglement'
  ],
  pitfalls: [
    'Augmenter les limites WIP dès qu’un développeur s’ennuie plutôt que de l’inciter à aider sur les tâches en souffrance.',
    'Confondre le Lead Time client avec le Cycle Time technique des développeurs.',
    'Négliger les colonnes de file d’attente ou tampons (Buffers) qui masquent l’allongement des temps de pause.',
    'Créer un tableau Kanban purement passif sans appliquer la discipline du blocage des nouvelles tâches.'
  ],
  questions: [
    {
      stem: 'Quel est le principe d’un système en « flux tiré » (Pull System) dans la méthode Kanban ?',
      opts: [
        'Le manager assigne tous les lundis matin une liste de 10 tâches obligatoires à chaque collaborateur',
        'Une nouvelle tâche n’est engagée par un membre de l’équipe que lorsqu’une tâche précédente est terminée et qu’une capacité WIP est disponible',
        'Le client code lui-même les fonctionnalités en tirant la branche Git',
        'Toutes les tâches du backlog sont lancées simultanément en développement'
      ],
      correct: 1,
      exp: 'En flux tiré, l’opérateur tire une nouvelle tâche de la colonne amont uniquement lorsqu’il a libéré de la capacité en aval.'
    },
    {
      stem: 'Que stipule l’équation fondamentale de la Loi de Little dans un système Kanban stable ?',
      opts: [
        'WIP = Throughput x Cycle_Time',
        'WIP = Bugs / Développeurs',
        'Cycle_Time = Throughput x WIP',
        'Throughput = Coût x Délai'
      ],
      correct: 0,
      exp: 'La Loi de Little établit que WIP = Throughput x Cycle_Time, ce qui signifie que Cycle_Time = WIP / Throughput.'
    },
    {
      stem: 'D’après la Loi de Little, quel est le moyen le plus simple et direct de réduire le temps de cycle (Cycle Time) sans recruter de personnel ?',
      opts: [
        'Supprimer toutes les réunions de l’entreprise',
        'Réduire les limites de travail en cours (WIP) pour se concentrer sur la finition des tâches',
        'Augmenter le nombre d’heures de travail par semaine',
        'Doubler le nombre de tickets dans le backlog'
      ],
      correct: 1,
      exp: 'Puisque Cycle_Time = WIP / Throughput, abaisser le WIP à débit constant diminue mécaniquement et immédiatement le Cycle Time.'
    },
    {
      stem: 'Quelle est la différence fondamentale entre le Lead Time et le Cycle Time ?',
      opts: [
        'Le Lead Time est mesuré en heures et le Cycle Time en années',
        'Le Lead Time mesure la durée totale depuis la création de la demande par le client jusqu’à sa livraison, tandis que le Cycle Time mesure le temps effectif de développement',
        'Le Lead Time concerne les managers et le Cycle Time les stagiaires',
        'Il n’y a aucune différence, ce sont deux termes synonymes'
      ],
      correct: 1,
      exp: 'Lead Time = t_done - t_created (vision client globale). Cycle Time = t_done - t_started (vision réalisation technique).'
    },
    {
      stem: 'Sur un Diagramme de Flux Cumulé (CFD), que représente la distance horizontale entre la courbe de début et la courbe de fin ?',
      opts: [
        'Le budget total dépensé',
        'Le Lead Time moyen des éléments achevés',
        'Le nombre de réunions tenues',
        'Le nombre de développeurs présents'
      ],
      correct: 1,
      exp: 'La distance horizontale entre deux courbes de transitions d’états sur un CFD correspond au temps de traversée moyen (Lead Time).'
    },
    {
      stem: 'Sur un Diagramme de Flux Cumulé (CFD), que traduit une bande d’état qui s’élargit verticalement au fil du temps ?',
      opts: [
        'Une accélération fulgurante de l’équipe',
        'Une accumulation de travail en cours (WIP) et un goulot d’étranglement à cette étape',
        'Une diminution du nombre de bugs',
        'Une fermeture prochaine du projet'
      ],
      correct: 1,
      exp: 'L’élargissement vertical indique que le nombre de tickets accumulés dans cet état augmente : les tâches entrent plus vite qu’elles n’en sortent (engorgement).'
    },
    {
      stem: 'Quelle action une équipe Kanban doit-elle entreprendre si la colonne « Revue de Code » atteint sa limite maximale WIP de 3 cartes ?',
      opts: [
        'Créer une nouvelle colonne « Revue Urgente » pour contourner la règle',
        'Les développeurs cessent d’entamer de nouvelles fonctionnalités et se mobilisent pour relire et valider les 3 cartes en attente',
        'Supprimer la limite WIP du tableau',
        'Envoyer les cartes directement en production sans revue'
      ],
      correct: 1,
      exp: 'L’esprit de Kanban impose de stopper le flux amont pour aider à résorber le blocage aval : « Stop starting, start finishing ».'
    },
    {
      stem: 'Selon la Théorie des Contraintes, qu’advient-il si l’on optimise la productivité d’une étape qui n’est PAS le goulot d’étranglement ?',
      opts: [
        'Le débit global du système augmente proportionnellement',
        'Le débit global reste inchangé et l’on crée un empilement de stocks inutiles devant le goulot',
        'Le coût du projet est divisé par deux',
        'Le goulot disparaît spontanément'
      ],
      correct: 1,
      exp: 'La cadence du système tout entier est bridée par son goulot : accélérer une étape en amont ne fait qu’engorger davantage la file d’attente du goulot.'
    }
  ],
  flashcards: [
    {
      q: 'Qu’est-ce qu’un système en flux tiré (Pull) ?',
      a: 'Un mode d’organisation où une tâche n’est entamée que lorsqu’une capacité de traitement se libère en aval.'
    },
    {
      q: 'Quelle est la devise directrice de la méthode Kanban ?',
      a: '« Stop starting, start finishing » (Arrêter de commencer, commencer à terminer).'
    },
    {
      q: 'Énoncez la Loi de Little.',
      a: 'WIP = Throughput x Cycle Time, soit Cycle Time = WIP / Throughput.'
    },
    {
      q: 'Comment calcule-t-on le temps d’attente (Wait Time) ?',
      a: 'Wait Time = Lead Time - Cycle Time.'
    },
    {
      q: 'Que représente la distance verticale sur un CFD ?',
      a: 'Le nombre total d’éléments de travail en cours (WIP) à un instant donné.'
    },
    {
      q: 'Qu’est-ce qu’un goulot d’étranglement dans une chaîne de valeur ?',
      a: 'L’étape du processus qui possède le débit le plus faible et qui limite la capacité globale du système.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Utilisation d’un tableau Kanban sans respect des limites WIP ou confusion entre flux tiré et flux poussé.'
    },
    {
      cls: 'medium',
      text: 'Bonne configuration des limites WIP, distinction Lead Time / Cycle Time et application de la Loi de Little.'
    },
    {
      cls: 'high',
      text: 'Maîtrise experte de la modélisation mathématique des flux, interprétation poussée des CFD, élimination des goulots et optimisation Lean industrielle.'
    }
  ]
};
