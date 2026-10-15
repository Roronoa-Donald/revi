/**
 * Chapitre 5 du cours « UML B2 » — Diagramme d’Activités, Flux de Contrôle, Fork/Join &amp; Swimlanes.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 5,
  title: 'Diagramme d’Activités, Flux de Contrôle, Fork/Join &amp; Swimlanes',
  short: 'Diagramme d’Activités',
  toc: 'Formalisation des processus métier et algorithmes, nœuds d’action, décisions et fusions (losanges), parallélisme par barres Fork / Join, couloirs de responsabilités (swimlanes), flux d’objets et synchronisation des jetons (token semantics).',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Une chaîne logistique e-commerce souffre de ralentissements massifs et de commandes bloquées à l’entrepôt : ' +
    'les colis sont parfois conditionnés avant que le paiement ne soit validé, tandis que d’autres fois, ' +
    'l’expédition attend inutilement l’archivage comptable. ' +
    'Les équipes métier et les développeurs ne parviennent pas à s’accorder sur l’ordonnancement des tâches ' +
    'et les frontières de responsabilités entre le Système, les Magasiniers et les Transporteurs. ' +
    'Pour modéliser sans ambiguïté les flux de travail (workflows) séquentiels et concurrents, l’architecte déploie le diagramme d’activités UML 2.5. ' +
    'Ce module forme les étudiants à maîtriser la circulation des jetons d’activité, à synchroniser les branches parallèles ' +
    'via les barres Fork/Join et à partitionner le travail dans des couloirs de nage (swimlanes).',

  objectives: [
    'comprendre la sémantique formelle d’exécution par jetons (token semantics) d’un diagramme d’activités ;',
    'distinguer et représenter le nœud initial, les nœuds d’actions et les deux types de nœuds finaux (fin d’activité vs fin de flux) ;',
    'modéliser les branchements conditionnels via les nœuds de décision et de fusion (losanges) avec des gardes exclusives [condition] ;',
    'ordonnancer des tâches hautement concurrentes à l’aide des barres de séparation (Fork) et de synchronisation (Join) ;',
    'découper les processus métier en couloirs de responsabilités organisationnelles ou techniques (Swimlanes) ;',
    'intégrer des nœuds d’objets (Object Nodes) pour suivre les transformations de données au cours du flux de contrôle.'
  ],

  sections: [
    {
      title: 'Nœuds Fondamentaux et Sémantique des Jetons',
      html: [
        '<p>Le <strong>diagramme d’activités</strong> modélise le flux séquentiel et concurrent d’un processus métier ou d’un algorithme. ' +
        'Sa dynamique repose sur la notion formelle de <strong>jetons (tokens)</strong> circulant le long des transitions :</p>',

        '<ul>',
        '  <li><strong>Nœud initial (Initial Node) :</strong> Représenté par un <strong>disque noir plein</strong>. Il produit le jeton initial au lancement de l’activité.</li>',
        '  <li><strong>Nœud d’action (Action Node) :</strong> Rectangle à coins arrondis contenant la description de l’opération atomique exécutée (ex: <em>Prélever articles</em>). ' +
        'L’action consomme son jeton d’entrée, réalise son traitement, puis émet un jeton sur chacune de ses transitions sortantes.</li>',
        '  <li><strong>Nœud final d’activité (Activity Final Node) :</strong> Disque noir plein entouré d’un cercle concentrique (« œil de bœuf »). ' +
        'Dès qu’un jeton atteint ce nœud, <em>l’intégralité de l’activité s’arrête immédiatement</em> et tous les jetons résiduels sont détruits.</li>',
        '  <li><strong>Nœud final de flux (Flow Final Node) :</strong> Cercle blanc contenant une croix diagonale. ' +
        'Il détruit uniquement le jeton qui l’atteint sans interrompre les autres branches concurrentes actives du processus.</li>',
        '</ul>'
      ].join('\n')
    },
    {
      title: 'Décision, Fusion et Parallélisme (Fork / Join)',
      html: [
        '<p>Pour structurer l’aiguillage et la concurrence des flux, UML 2.5 définit des symboles géométriques précis :</p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4 class="card-title">Décision et Fusion (&loz; Losange)</h4>',
        '    <ul>',
        '      <li><strong>Nœud de décision :</strong> 1 entrée &rarr; <em>N</em> sorties. Chaque branche sortante est gardée par une condition entre crochets <code>[condition]</code>. Les gardes doivent être mutuellement exclusives (avec une clause <code>[else]</code>).</li>',
        '      <li><strong>Nœud de fusion (Merge) :</strong> <em>N</em> entrées &rarr; 1 sortie. Réunit plusieurs flux alternatifs sans attendre qu’ils soient tous complétés (dès qu’un jeton arrive, il passe).</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4 class="card-title">Bifurcation et Jonction (&HorizontalLine; Barre épaisse)</h4>',
        '    <ul>',
        '      <li><strong>Nœud Fork (Séparation) :</strong> 1 entrée &rarr; <em>N</em> sorties parallèles. Duplique le jeton entrant sur chaque branche sortante pour démarrer des tâches concurrentes.</li>',
        '      <li><strong>Nœud Join (Rendez-vous) :</strong> <em>N</em> entrées &rarr; 1 sortie. <strong>Barrière de synchronisation</strong> : attend impérativement qu’un jeton soit présent sur <em>chacune</em> des branches entrantes avant de libérer un unique jeton en sortie.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Couloirs de Responsabilités (Swimlanes) et Flux d’Objets',
      html: [
        '<p>Dans les processus d’entreprise complexes, il est crucial d’identifier <strong>qui</strong> réalise chaque action :</p>',
        '<ul>',
        '  <li><strong>Couloirs de responsabilités (Swimlanes / Partitions) :</strong> Le diagramme est divisé en colonnes verticales ou bandes horizontales. ' +
        'Chaque couloir porte le nom d’un acteur, d’un département ou d’un sous-système (ex: <em>Client</em>, <em>Entrepôt</em>, <em>Système Bancaire</em>). ' +
        'Une action placée dans un couloir relève de la responsabilité exclusive de cette entité.</li>',
        '  <li><strong>Flux d’objets (Object Flow) :</strong> Représenté par un rectangle d’état d’objet <code>Commande [Payée]</code> intercalé entre deux actions. ' +
        'Il matérialise la donnée ou l’entité physique produite par l’action source et consommée par l’action cible.</li>',
        '</ul>'
      ].join('\n')
    }
  ],

  methodTitle: 'Méthodologie de Modélisation de Processus Métier par Diagramme d’Activités',
  method: [
    'Étape 1 — Identifier les rôles et poser les Swimlanes : Déterminer tous les acteurs ou systèmes intervenants et tracer les colonnes correspondantes.',
    'Étape 2 — Positionner le nœud initial : Placer le disque noir de départ dans le couloir de l’acteur qui déclenche le processus.',
    'Étape 3 — Rédiger la chaîne séquentielle nominale : Poser les actions dans leurs couloirs respectifs en reliant les transitions directes.',
    'Étape 4 — Isoler les conditions et alternatives : Utiliser des losanges de décision avec des gardes [condition] exhaustives et exclusives, refermées par des losanges de fusion.',
    'Étape 5 — Identifier les tâches parallélisables : Insérer une barre de Fork pour lancer les tâches concurrentes, et une barre de Join pour les synchroniser avant l’étape suivante.',
    'Étape 6 — Choisir la bonne terminaison : Utiliser un nœud final d’activité (œil de bœuf) pour clore le processus, ou un final de flux (croix) pour éteindre une branche sans impacter les autres.',
    'Étape 7 — Valider la conservation des jetons : Vérifier mentalement qu’aucun jeton ne reste bloqué indéfiniment devant une barre Join orpheline.'
  ],

  summary: [
    'Le diagramme d’activités décrit les processus métier et la logique algorithmique par circulation de jetons.',
    'Les nœuds d’action sont rectangulaires à coins arrondis et exécutent une tâche élémentaire.',
    'Les losanges gèrent les flux alternatifs : Décision (1 entrée, N sorties gardées) et Fusion (N entrées, 1 sortie non bloquante).',
    'Les barres épaisses gèrent la concurrence : Fork (duplication de jetons en parallèle) et Join (barrière de synchronisation bloquante).',
    'Le nœud final d’activité stoppe tout le processus, tandis que le final de flux détruit uniquement le jeton local de sa branche.',
    'Les Swimlanes structurent le diagramme en couloirs assignant clairement les responsabilités opérationnelles.'
  ],

  checklist: [
    'Je connais la représentation du nœud initial (disque noir) et final d’activité (disque avec cercle concentrique).',
    'Je distingue un nœud de décision (losange) d’un nœud Fork (barre épaisse).',
    'Je sais qu’une barre Join attend tous les jetons entrants avant de continuer.',
    'Je sais rédiger des conditions de garde mutuellement exclusives avec une clause [else].',
    'Je sais utiliser les Swimlanes pour séparer les responsabilités entre acteurs et services techniques.',
    'Je sais choisir entre un nœud final de flux et un nœud final d’activité.'
  ],

  notions: [
    'Sémantique des jetons (Token semantics)',
    'Nœud initial et nœuds d’actions',
    'Final d’activité vs Final de flux',
    'Décision et Fusion (losanges)',
    'Gardes conditionnelles [condition]',
    'Bifurcation Fork et Jonction Join',
    'Couloirs de responsabilités (Swimlanes)',
    'Flux d’objets (Object Nodes)'
  ],

  pitfalls: [
    'Confondre un nœud de fusion (losange) avec un nœud de jonction (barre Join) : le losange ne synchronise pas, il transmet dès la première entrée.',
    'Oublier des conditions de garde sur un nœud de décision, ou définir des gardes non exclusives pouvant être vraies simultanément.',
    'Créer un blocage permanent en reliant à une même barre Join des branches qui ne peuvent pas être exécutées en même temps (ex: deux branches issues d’un losange de décision).',
    'Utiliser un nœud final d’activité (œil de bœuf) dans une sous-branche optionnelle : cela tue prématurément tout le processus global.',
    'Placer une action à cheval sur deux couloirs Swimlanes sans en définir la responsabilité.'
  ],

  questions: [
    {
      stem: 'Quel symbole représente un nœud de décision conditionnelle (embranchement if / else) dans un diagramme d’activités ?',
      opts: [
        'Un rectangle à coins arrondis',
        'Un losange avec une entrée et plusieurs sorties gardées',
        'Une barre noire épaisse horizontale',
        'Un cercle barré d’une croix'
      ],
      correct: 1,
      exp: 'En diagramme d’activités, le losange (decision node) aiguille un jeton entrant vers une seule de ses branches de sortie en fonction des conditions de garde [condition].'
    },
    {
      stem: 'Quel est le comportement exact d’un nœud de jonction Join (représenté par une barre épaisse) ?',
      opts: [
        'Il laisse passer le premier jeton arrivé et ignore les suivants',
        'Il attend qu’un jeton soit présent sur CHACUNE de ses transitions entrantes avant d’émettre un unique jeton en sortie',
        'Il duplique le jeton entrant vers toutes les sorties',
        'Il détruit l’intégralité de l’activité en cours'
      ],
      correct: 1,
      exp: 'Le nœud Join agit comme une barrière de synchronisation : il bloque tant que toutes les branches concurrentes entrantes n’ont pas produit leur jeton.'
    },
    {
      stem: 'Quelle est la différence fondamentale entre un «nœud final d’activité» et un «nœud final de flux» ?',
      opts: [
        'Le final d’activité détruit la base de données SQL, le final de flux ferme le réseau',
        'Le final d’activité stoppe immédiatement l’intégralité de l’activité et tue tous les jetons, tandis que le final de flux détruit uniquement le jeton qui l’atteint sans impacter les autres branches',
        'Il n’y a aucune différence, ce sont deux variantes cosmétiques',
        'Le final de flux ne peut être placé que dans une Swimlane administrateur'
      ],
      correct: 1,
      exp: 'Le final d’activité (disque cerclé) termine tout le processus. Le final de flux (cercle avec croix) détruit seulement son flux local sans stopper les branches parallèles.'
    },
    {
      stem: 'Comment s’appellent les colonnes ou compartiments utilisés pour partitionner un diagramme d’activités selon les acteurs ou services responsables ?',
      opts: ['Les Lifelines', 'Les Swimlanes (ou partitions)', 'Les Packages composites', 'Les Threads pools'],
      correct: 1,
      exp: 'Les Swimlanes (couloirs de nage ou partitions d’activité) permettent d’attribuer visuellement chaque tâche à un acteur, un service ou une entité organisationnelle précise.'
    },
    {
      stem: 'Que se passe-t-il si un modélisateur relie les deux sorties exclusives d’un losange de décision directement aux entrées d’une barre Join ?',
      opts: [
        'Le diagramme s’exécute deux fois plus vite',
        'Le système se bloque définitivement (Deadlock) car la barre Join attend deux jetons, alors qu’un seul ne sera jamais produit par le losange',
        'La barre Join se transforme automatiquement en nœud de fusion',
        'C’est la syntaxe recommandée par l’OMG'
      ],
      correct: 1,
      exp: 'Puisque la décision n’émet qu’un seul jeton sur l’une de ses branches, l’autre branche ne recevra jamais de jeton. La barre Join attendant toutes ses entrées sera bloquée à l’infini.'
    },
    {
      stem: 'Quel symbole représente l’état initial d’un diagramme d’activités ?',
      opts: [
        'Un cercle blanc vide',
        'Un disque noir plein',
        'Un losange jaune',
        'Un rectangle avec une flèche'
      ],
      correct: 1,
      exp: 'L’état initial est matérialisé par un disque noir plein, qui produit le premier jeton dès l’activation du diagramme.'
    },
    {
      stem: 'Quelle notation est utilisée pour encadrer une condition de garde sur une transition sortant d’un losange de décision ?',
      opts: [
        'Des parenthèses (condition)',
        'Des crochets [condition]',
        'Des accolades {condition}',
        'Des guillemets "condition"'
      ],
      correct: 1,
      exp: 'La syntaxe officielle OMG UML pour les conditions de garde sur les transitions est l’encadrement strict par des crochets, par exemple [solde &gt;= montant].'
    },
    {
      stem: 'Dans un diagramme d’activités, comment est modélisé un objet produit ou consommé par une action (flux d’objets) ?',
      opts: [
        'Par un rectangle classique portant le nom de l’objet et son état entre crochets (ex: Facture [Émise])',
        'Par une ligne brisée rouge',
        'Par un losange plein',
        'Par un point d’exclamation'
      ],
      correct: 0,
      exp: 'Un nœud d’objet (Object Node) est représenté par un rectangle portant le nom de la classe ou de la donnée avec son état éventuel spécifié entre crochets.'
    }
  ],

  flashcards: [
    {
      q: 'Qu’est-ce qui caractérise un nœud Join dans un diagramme d’activités ?',
      a: 'C’est une barre de synchronisation qui attend qu’un jeton soit présent sur chacune de ses transitions entrantes avant d’émettre son jeton en sortie.'
    },
    {
      q: 'Quelle est la différence entre un nœud de fusion (Merge) et un nœud de jonction (Join) ?',
      a: 'Le Merge (losange) laisse passer le jeton dès qu’une entrée arrive ; le Join (barre) bloque jusqu’à ce que toutes les entrées soient arrivées.'
    },
    {
      q: 'Que provoque l’arrivée d’un jeton sur un nœud final d’activité ?',
      a: 'L’arrêt immédiat et total de tout le processus et la destruction de tous les jetons actifs circulant dans le diagramme.'
    },
    {
      q: 'À quoi servent les Swimlanes (couloirs d’activité) ?',
      a: 'À partitionner le processus en couloirs pour assigner sans ambiguïté la responsabilité des actions aux différents acteurs ou sous-systèmes.'
    },
    {
      q: 'Pourquoi ne faut-il jamais relier les branches d’une décision vers un Join ?',
      a: 'Parce que la décision n’active qu’une seule branche, rendant la condition de synchronisation de la barre Join impossible à satisfaire (deadlock).'
    },
    {
      q: 'Quelle est la fonction d’un nœud Fork ?',
      a: 'Dupliquer un jeton d’entrée unique en plusieurs jetons parallèles pour lancer des flux d’exécution concurrents.'
    }
  ],

  mastery: [
    { cls: 'low', text: 'Moins de 4/8 : Révisez la distinction entre losange (décision/fusion) et barre épaisse (Fork/Join).' },
    { cls: 'mid', text: 'De 4 à 6/8 : Bonnes notions de base. Attention aux erreurs de synchronisation et d’interblocage sur les barres Join.' },
    { cls: 'good', text: '7/8 : Excellente maîtrise des flux de contrôle, du parallélisme et des Swimlanes.' },
    { cls: 'top', text: '8/8 : Parfait ! Vous maîtrisez les diagrammes d’activités et les processus concurrents au niveau expert.' }
  ]
};
