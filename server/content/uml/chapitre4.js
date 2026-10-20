/**
 * Chapitre 4 du cours « UML B2 » — Diagramme de Séquence, Lignes de Vie &amp; Fragments Combinés.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 4,
  title: 'Diagramme de Séquence, Lignes de Vie &amp; Fragments Combinés',
  short: 'Diagramme de Séquence',
  toc: 'Modélisation des interactions temporelles, lignes de vie (lifelines), barres d’activation, typologie des messages (synchrones, asynchrones, retours), création/destruction d’objets, fragments combinés (alt, opt, loop, par) et détection des interblocages.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Au sein d’une architecture microservices de paiement instantané, des clients subissent des blocages inexpliqués : ' +
    'des transactions restent suspendues indéfiniment lors des pics de charge, provoquant des dépassements de délai et des pertes de paniers d’achat. ' +
    'L’investigation révèle que les services s’appellent mutuellement de manière synchrone en formant des dépendances circulaires masquées. ' +
    'Pour cartographier la dynamique temporelle, valider le parallélisme et prouver l’absence d’interblocage (deadlock), ' +
    'l’équipe recourt au diagramme de séquence UML 2.5. ' +
    'Ce module forme les étudiants à modéliser la chronologie exacte des échanges, à maîtriser la typologie des flèches de messages ' +
    'et à structurer la logique conditionnelle via les fragments combinés normalisés.',

  objectives: [
    'définir une ligne de vie (lifeline) avec sa syntaxe normalisée (nomInstance : TypeClassificateur) ;',
    'représenter les périodes d’activité d’un objet via les barres d’activation (execution specifications) ;',
    'distinguer et tracer les 4 types de flèches de messages (synchrone plein, asynchrone ouvert, retour tireté, création) ;',
    'modéliser la création dynamique d’un objet et sa destruction explicite avec la croix de terminaison (X) ;',
    'structurer les flux conditionnels et répétitifs à l’aide des fragments combinés alt, opt, loop et par ;',
    'analyser une séquence temporelle pour détecter les boucles de rétro-appel bloquantes et prévenir les deadlocks.'
  ],

  sections: [
    {
      title: 'Lignes de Vie, Barres d’Activation et Chronologie',
      html: [
        '<p>Le <strong>diagramme de séquence</strong> capture les interactions temporelles entre objets au cours d’un scénario précis. ' +
        'Le temps s’écoule conventionnellement de <strong>haut en bas</strong> :</p>',

        '<ul>',
        '  <li><strong>Ligne de vie (Lifeline) :</strong> Rectangle supérieur représentant l’objet ou le rôle, prolongé vers le bas par une ligne pointillée verticale. ' +
        'La syntaxe officielle est <code>nomInstance : Classe</code> (ou <code>:Classe</code> si l’instance est anonyme).</li>',
        '  <li><strong>Barre d’activation (Execution Specification) :</strong> Rectangle étroit superposé à la ligne de vie indiquant la période pendant laquelle l’objet exécute une action ou attend la réponse d’un appel synchrone.</li>',
        '  <li><strong>Création d’objet :</strong> Un message horizontal pointant directement sur le rectangle d’en-tête de la ligne de vie de l’objet nouvellement créé (annoté <code>&laquo;create&raquo;</code>).</li>',
        '  <li><strong>Destruction d’objet :</strong> Une grande croix <strong>X</strong> à l’extrémité de la ligne pointillée signifiant que l’objet a été libéré de la mémoire.</li>',
        '</ul>'
      ].join('\n')
    },
    {
      title: 'Typologie des Messages et Conventions Graphiques OMG',
      html: [
        '<p>Chaque type d’interaction possède une notation graphique rigoureuse dans la spécification UML 2.5 :</p>',

        '<table class="table">',
        '  <thead>',
        '    <tr>',
        '      <th>Type de message</th>',
        '      <th>Notation graphique</th>',
        '      <th>Sémantique temporelle</th>',
        '      <th>Exemple concret</th>',
        '    </tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr>',
        '      <td><strong>Synchrone</strong></td>',
        '      <td>Trait plein avec <strong>triangle noir plein</strong> fermé (&rarr;)</td>',
        '      <td>L’émetteur bloque son exécution et attend que le destinataire ait terminé le traitement.</td>',
        '      <td>Appel de méthode classique bloquant (ex: <code>calculerMontant()</code>).</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>Asynchrone</strong></td>',
        '      <td>Trait plein avec <strong>flèche simple ouverte</strong> (&rarr;)</td>',
        '      <td>L’émetteur envoie le message et poursuit immédiatement son travail sans bloquer.</td>',
        '      <td>Message MQ, événement Kafka, notification (ex: <code>notifierEmail()</code>).</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>Message de retour</strong></td>',
        '      <td>Trait tireté avec <strong>flèche simple ouverte</strong> (&dash;&dash;&gt;)</td>',
        '      <td>Retour de valeur de la méthode vers l’appelant, libérant la barre d’activation.</td>',
        '      <td>Renvoi du résultat calculé (ex: <code>solde = 250.00 &euro;</code>).</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>Message réflexif</strong></td>',
        '      <td>Flèche en boucle sur la même ligne de vie</td>',
        '      <td>Un objet invoque une méthode privée sur lui-même (auto-appel).</td>',
        '      <td>Traitement interne (ex: <code>validerFormatDate()</code>).</td>',
        '    </tr>',
        '  </tbody>',
        '</table>'
      ].join('\n')
    },
    {
      title: 'Fragments Combinés d’Interaction (Combined Fragments)',
      html: [
        '<p>Depuis UML 2.0, les organigrammes et conditions algorithmiques sont formalisés au sein ' +
        'de cadres rectangulaires appelés <strong>fragments combinés</strong>, identifiés par un opérateur d’interaction dans le coin supérieur gauche :</p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4 class="card-title">alt (Alternatives exclusives)</h4>',
        '    <p>Équivalent du <code>if ... else if ... else</code>. ' +
        'Le cadre est divisé en sous-compartiments horizontaux par des traits pointillés. ' +
        'Chaque compartiment est précédé d’une garde entre crochets <code>[condition]</code>. ' +
        'Seul le compartiment dont la garde s’évalue à vrai est exécuté.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4 class="card-title">opt (Comportement optionnel)</h4>',
        '    <p>Équivalent d’un <code>if</code> simple sans clause else. ' +
        'Comporte un seul compartiment avec une garde <code>[condition]</code>. ' +
        'Si la condition est fausse, le flux poursuit directement en aval sans rien exécuter dans le cadre.</p>',
        '  </div>',
        '</div>',

        '<div class="grid grid-2" style="margin-top: var(--space-4);">',
        '  <div class="card">',
        '    <h4 class="card-title">loop (Boucle d’itération)</h4>',
        '    <p>Répétition d’une séquence. La syntaxe permet de fixer des bornes <code>loop(min, max)</code> ' +
        'ou une condition booléenne d’arrêt <code>[tant que articlesRestants &gt; 0]</code>.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4 class="card-title">par (Exécution parallèle)</h4>',
        '    <p>Exécution concurrente. Les sous-compartiments séparés par des pointillés s’exécutent ' +
        'en parallèle sans ordre séquentiel prédéfini entre leurs messages respectifs.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],

  methodTitle: 'Méthodologie de Conception d’un Diagramme de Séquence Robuste',
  method: [
    'Étape 1 — Délimiter le scénario : Choisir un cas d’utilisation ou une branche précise (ex: scénario nominal de paiement par carte).',
    'Étape 2 — Aligner les lignes de vie : Positionner les objets de gauche à droite dans l’ordre naturel d’interaction (Acteur &rarr; IHM &rarr; Contrôleur &rarr; Métier &rarr; BDD/Tiers).',
    'Étape 3 — Choisir le bon type de message : Utiliser des flèches fermées pleines pour les appels de fonctions synchrones et des flèches ouvertes pour les événements asynchrones.',
    'Étape 4 — Matérialiser les retours et activations : Faire figurer les barres d’activation pour visualiser la durée de blocage et tracer les retours tiretés lorsque des valeurs sont produites.',
    'Étape 5 — Encadrer la logique avec les fragments normalisés : Utiliser alt pour les cas de succès/erreur, opt pour les options, et loop pour les traitements en lot.',
    'Étape 6 — Auditer la cohérence avec le modèle de classes : S’assurer que chaque message correspond exactement au nom d’une méthode publique déclarée dans la classe destinataire.'
  ],

  summary: [
    'Le diagramme de séquence modélise l’ordre chronologique des échanges de messages entre lignes de vie.',
    'Une ligne de vie représente un participant individuel (nom:Type) avec sa barre d’activation verticale.',
    'Les messages synchrones (flèche pleine fermée) bloquent l’émetteur, contrairement aux messages asynchrones (flèche ouverte simple).',
    'Les messages de retour utilisent un trait tireté avec flèche ouverte pour transmettre le résultat calculé.',
    'Les fragments combinés (alt, opt, loop, par) structurent la logique conditionnelle et concurrente directement sur le diagramme.',
    'La cohérence transversale exige que chaque message d’une séquence corresponde à une méthode définie dans le diagramme de classes.'
  ],

  checklist: [
    'Je sais tracer une ligne de vie avec la syntaxe normalisée nom:Type.',
    'Je distingue visuellement une flèche de message synchrone d’une flèche asynchrone.',
    'Je trace les messages de retour avec un trait tireté.',
    'Je sais découper un fragment alt en sous-compartiments avec leurs gardes entre crochets [condition].',
    'Je comprends l’usage d’un fragment opt pour une action conditionnelle sans alternative else.',
    'Je sais identifier un risque d’interblocage (deadlock) dans une suite d’appels synchrones croisés.'
  ],

  notions: [
    'Lignes de vie (Lifelines)',
    'Barres d’activation (Execution Specifications)',
    'Messages synchrones (flèche pleine fermée)',
    'Messages asynchrones (flèche ouverte)',
    'Messages de retour (trait tireté)',
    'Fragment combiné alt (alternatives)',
    'Fragment combiné opt (optionnel)',
    'Fragment combiné loop &amp; par'
  ],

  pitfalls: [
    'Dessiner une flèche pleine fermée pour un message asynchrone : cela induit en erreur sur le caractère bloquant de l’appel.',
    'Oublier les conditions de garde entre crochets [condition] dans les compartiments d’un fragment alt.',
    'Faire remonter le temps : dans un diagramme de séquence, le temps s’écoule strictement du haut vers le bas.',
    'Créer des dépendances synchrones circulaires (A appelle synchrone B qui rappelle synchrone A) : risque majeur de deadlock.',
    'Invoquer des messages qui n’existent pas dans les opérations de la classe réceptrice.'
  ],

  questions: [
    {
      stem: 'Comment est représenté graphiquement un appel de méthode synchrone (bloquant pour l’émetteur) en UML 2.5 ?',
      opts: [
        'Un trait plein avec une tête de flèche triangulaire noire pleine fermée',
        'Un trait tireté avec une flèche ouverte',
        'Une double ligne avec un cercle blanc',
        'Un trait ondulé rouge'
      ],
      correct: 0,
      exp: 'En UML 2.5, le message synchrone est impérativement représenté par un trait plein terminé par une tête de flèche triangulaire noire pleine fermée.'
    },
    {
      stem: 'Quelle flèche est utilisée pour représenter le retour d’une valeur de fonction (message de réponse) ?',
      opts: [
        'Un trait plein avec un triangle blanc creux',
        'Un trait tireté avec une tête de flèche ouverte simple',
        'Un trait plein avec un losange noir',
        'Une flèche pointant vers le haut'
      ],
      correct: 1,
      exp: 'Le message de retour (reply message) s’illustre formellement par un trait tireté muni d’une flèche ouverte simple pointant vers l’émetteur initial.'
    },
    {
      stem: 'Quel opérateur de fragment combiné correspond à une structure conditionnelle exclusive à plusieurs branches (if / else if / else) ?',
      opts: ['opt', 'loop', 'alt', 'par'],
      correct: 2,
      exp: 'L’opérateur «alt» (alternatives) divise un cadre en compartiments exclusifs séparés par des pointillés, chacun surveillé par une condition de garde.'
    },
    {
      stem: 'Quelle est la différence fondamentale entre les opérateurs de fragments «alt» et «opt» ?',
      opts: [
        'opt comporte obligatoirement un bloc else, pas alt',
        'alt gère des alternatives mutuellement exclusives (avec éventuellement else), alors que opt est un bloc conditionnel unique (if sans else)',
        'opt s’exécute toujours deux fois',
        'alt ne fonctionne qu’en multithreading'
      ],
      correct: 1,
      exp: 'L’opérateur «opt» (option) contient un unique sous-bloc exécuté seulement si sa garde est vraie ; «alt» définit plusieurs branches alternatives exclusives.'
    },
    {
      stem: 'Comment note-t-on graphiquement la destruction définitive d’un objet à la fin de sa ligne de vie ?',
      opts: [
        'Un point noir plein',
        'Une grande croix «X» marquant la fin de la ligne de vie',
        'Un point d’interrogation',
        'La mention «DELETE» en lettres grasses'
      ],
      correct: 1,
      exp: 'La fin de vie d’un objet et sa libération mémoire sont formellement symbolisées par une croix «X» sur sa ligne de vie (destruction occurrence).'
    },
    {
      stem: 'Quel opérateur de fragment combiné permet de spécifier que plusieurs groupes de messages s’exécutent de façon concurrente en parallèle ?',
      opts: ['loop', 'par', 'alt', 'seq'],
      correct: 1,
      exp: 'L’opérateur «par» (parallel) modélise la concurrence : les sous-compartiments s’exécutent en parallèle, les messages s’entremêlant de manière non déterministe.'
    },
    {
      stem: 'Dans quelle direction s’écoule conventionnellement le temps dans un diagramme de séquence UML ?',
      opts: [
        'De gauche à droite',
        'De bas en haut',
        'De haut en bas',
        'Dans le sens des aiguilles d’une montre'
      ],
      correct: 2,
      exp: 'L’axe vertical d’un diagramme de séquence représente la flèche du temps : la chronologie progresse strictement de haut en bas.'
    },
    {
      stem: 'Que désigne le phénomène d’«interblocage» (deadlock) observable dans les mauvaises modélisations de séquences ?',
      opts: [
        'Une ligne de vie qui n’a pas d’attributs',
        'Une situation où deux participants ou plus s’attendent mutuellement de manière synchrone, bloquant indéfiniment le système',
        'Un fragment alt avec trop de branches',
        'Un message asynchrone qui arrive trop vite'
      ],
      correct: 1,
      exp: 'Un deadlock survient lorsque le service A attend la réponse synchrone de B, tandis que B attend la réponse synchrone de A (attente circulaire bloquante).'
    }
  ],

  flashcards: [
    {
      q: 'Quelle est la différence visuelle entre message synchrone et message asynchrone ?',
      a: 'Le message synchrone a une flèche triangulaire noire pleine fermée ; le message asynchrone a une flèche simple ouverte.'
    },
    {
      q: 'Que représente la barre d’activation rectangulaire sur une ligne de vie ?',
      a: 'La durée pendant laquelle l’objet exécute une opération ou reste bloqué dans l’attente du retour d’un appel synchrone.'
    },
    {
      q: 'Quel fragment combiné correspond à une structure if/else ?',
      a: 'Le fragment «alt» (alternatives), divisé en compartiments par des pointillés, chacun doté d’une garde entre crochets [condition].'
    },
    {
      q: 'Quand utilise-t-on le fragment «opt» plutôt que «alt» ?',
      a: 'Quand il s’agit d’une séquence optionnelle simple soumise à condition (if sans clause alternative else).'
    },
    {
      q: 'Comment s’illustre la création d’un nouvel objet dans un diagramme de séquence ?',
      a: 'Par une flèche &laquo;create&raquo; pointant directement sur le rectangle d’en-tête de la ligne de vie de l’objet créé.'
    },
    {
      q: 'Quel fragment permet de modéliser des flux concurrents s’exécutant en parallèle ?',
      a: 'Le fragment «par» (parallèle), qui subdivise les sous-interactions exécutées en concurrence sans ordre séquentiel fixe.'
    }
  ],

  mastery: [
    { cls: 'low', text: 'Moins de 4/8 : Révisez la typologie des flèches (synchrone vs asynchrone) et la syntaxe des fragments alt/opt.' },
    { cls: 'mid', text: 'De 4 à 6/8 : Bonnes connaissances. Maîtrisez les barres d’activation et la détection des deadlocks synchrones.' },
    { cls: 'good', text: '7/8 : Excellente maîtrise de la modélisation temporelle et des diagrammes de séquence.' },
    { cls: 'top', text: '8/8 : Score parfait ! Vous maîtrisez les dynamiques temporelles et la concurrence au niveau expert.' }
  ]
};
