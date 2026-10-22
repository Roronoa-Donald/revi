/**
 * Chapitre 2 du cours « Git & GitHub B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 2,
  title: 'Stratégies de Fusion Avancées &amp; Rebase Interactif',
  short: 'Fusions Avancées &amp; Rebase',
  toc: 'Fast-Forward vs 3-Way Merge, calcul du Lowest Common Ancestor (LCA), stratégies recursive et ort, rebase interactif, squash et arbitrage formel des conflits.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B3 et plus',
  situation: 'Lorsqu’une équipe d’ingénieurs collabore sur un projet d’envergure, la convergence des branches de travail devient l’opération la plus critique et la plus source d’erreurs. Les fusions naïves sans maîtrise topologique engendrent un « historique en plat de spaghettis », rendant la traçabilité des bogues et les retours en arrière quasiment impossibles. En Bachelor 3, l’ingénieur doit maîtriser la mécanique topologique des fusions tridirectionnelles (3-Way Merge), le calcul algorithmique de l’ancêtre commun le plus proche (Lowest Common Ancestor - LCA), les subtilités du rebase interactif pour assainir les commits locaux avant livraison, et les techniques formelles de résolution de conflits sans perte d’intégrité.',
  objectives: [
    'comprendre la différence mathématique et topologique entre une fusion Fast-Forward et un 3-Way Merge ;',
    'analyser l’algorithme de recherche du Lowest Common Ancestor (LCA) au sein du graphe orienté acyclique (DAG) ;',
    'comparer les moteurs de fusion historiques de Git (recursive) et le moteur moderne par défaut (ORT - Ostensibly Recursive’s Twin) ;',
    'maîtriser le rebase interactif (git rebase -i) avec ses directives clés : pick, reword, edit, squash, fixup, drop ;',
    'appliquer rigoureusement la règle d’or du rebase pour préserver la cohérence des dépôts d’équipe distribués ;',
    'développer en Python 3 des classificateurs de stratégies de fusion, des simulateurs de rebase et des résolveurs de conflits tridirectionnels.'
  ],
  sections: [
    {
      title: 'Topologie des Fusions : Fast-Forward vs 3-Way Merge &amp; Lowest Common Ancestor',
      html: [
        '<p>L’intégration de branches dans Git ne se fait pas à l’aveugle : Git analyse les chemins reliant les branches au sein du graphe orienté acyclique (DAG).</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. La Fusion Linéaire (Fast-Forward)</h4>',
        '    <p>Une fusion <strong>Fast-Forward (avance rapide)</strong> est possible lorsque la branche courante (ex: <code>main</code>) n’a reçu aucun nouveau commit depuis le moment où la branche de fonctionnalité (ex: <code>feature</code>) a été créée.</p>',
        '    <p>Topologiquement, le pointeur de <code>main</code> est un ancêtre direct de <code>feature</code>. Git n’a aucun arbitrage à réaliser : il déplace simplement le pointeur de <code>main</code> pour l’aligner sur le commit de tête de <code>feature</code>. <strong>Aucun nouveau commit de fusion n’est créé.</strong></p>',
        '    <p>Pour forcer la création d’un commit de traçabilité même si un Fast-Forward est possible, on emploie le drapeau : <code>git merge --no-ff feature</code>.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. La Fusion Tridirectionnelle (3-Way Merge)</h4>',
        '    <p>Dès lors que les deux branches ont divergé (chacune possédant des commits spécifiques), un Fast-Forward est physiquement impossible.</p>',
        '    <p>Git doit trouver le <strong>Lowest Common Ancestor (LCA)</strong>, c’est-à-dire le dernier commit ancêtre commun le plus proche dans l’arbre. Git compare ensuite trois états :</p>',
        '    <ul>',
        '      <li>L’état de l’ancêtre commun (Base / LCA)</li>',
        '      <li>L’état de la branche cible (Ours / HEAD)</li>',
        '      <li>L’état de la branche source (Theirs / Feature)</li>',
        '    </ul>',
        '    <p>Le résultat génère un nouveau <strong>commit de fusion (merge commit)</strong> possédant exactement deux parents.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Les Moteurs de Fusion Git : De « recursive » à « ORT »',
      html: [
        '<p>Historiquement, Git utilisait la stratégie de fusion <code>recursive</code>. Cependant, dans les topologies complexes où deux branches ont divergé et se sont croisées plusieurs fois (fusions croisées ou criss-cross merges), il peut exister <strong>plusieurs LCA concurrents</strong>. La stratégie recursive devait alors synthétiser récursivement un ancêtre virtuel intermédiaire.</p>',
        box('standard', 'La Révolution du Moteur ORT (Git 2.33+)', [
          '<p>Depuis Git 2.33, le moteur par défaut est <strong>ORT (Ostensibly Recursive’s Twin)</strong> :</p>',
          '<ul>',
          '  <li><strong>Performances décuplées :</strong> Jusqu’à 500 fois plus rapide sur les dépôts massifs en éliminant les lectures inutiles sur le disque dur.</li>',
          '  <li><strong>Gestion parfaite des renommages :</strong> ORT détecte avec une précision mathématique les fichiers renommés et déplacés simultanément par les deux branches, évitant de faux conflits insolubles.</li>',
          '  <li><strong>Résolution de conflits en mémoire :</strong> ORT calcule le résultat directement en mémoire sans toucher à la copie de travail tant que la fusion n’est pas prête à être validée.</li>',
          '</ul>'
        ])
      ].join('\n')
    },
    {
      title: 'Le Rebase Interactif : Nettoyage d’Historique &amp; la Règle d’Or',
      html: [
        '<p>Alors que la fusion (<code>merge</code>) préserve fidèlement la vérité historique brute avec tous ses embranchements, le rebase (<code>git rebase</code>) réécrit l’histoire pour produire un <strong>historique parfaitement linéaire</strong>.</p>',
        '<p>La commande <code>git rebase -i HEAD~N</code> ouvre un éditeur interactif permettant de réordonner, combiner ou épurer les commits avant de proposer une Pull Request :</p>',
        '<table class="table">',
        '  <thead>',
        '    <tr><th>Action</th><th>Abréviation</th><th>Rôle Technique &amp; Comportement</th></tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr><td><code>pick</code></td><td><code>p</code></td><td>Conserve le commit tel quel dans l’historique réécrit.</td></tr>',
        '    <tr><td><code>reword</code></td><td><code>r</code></td><td>Conserve le contenu du commit mais permet d’éditer son message.</td></tr>',
        '    <tr><td><code>edit</code></td><td><code>e</code></td><td>Met en pause le rebase pour amender le contenu du commit (fichiers).</td></tr>',
        '    <tr><td><code>squash</code></td><td><code>s</code></td><td>Fond le commit dans le commit précédent et concatène les messages.</td></tr>',
        '    <tr><td><code>fixup</code></td><td><code>f</code></td><td>Fond le commit dans le précédent en éliminant silencieusement son message.</td></tr>',
        '    <tr><td><code>drop</code></td><td><code>d</code></td><td>Supprimez purement et simplement le commit de l’historique.</td></tr>',
        '  </tbody>',
        '</table>',
        box('danger', 'La Règle d’Or Absolue du Rebase', [
          '<p><strong>« Ne rebasez JAMAIS une branche publique partagée avec d’autres développeurs. »</strong></p>',
          '<p>Puisque le rebase réapplique chaque commit sur une nouvelle base, le parent de chaque commit change : <strong>tous les identifiants SHA-1/SHA-256 sont irrémédiablement modifiés</strong>. Si la branche est déjà présente sur GitHub, cela obligera un <code>git push --force</code> qui écrasera le travail des collaborateurs et sèmera la confusion.</p>'
        ])
      ].join('\n')
    },
    {
      title: 'Résolution Formelle des Conflits de Fusion Tridirectionnelle',
      html: [
        '<p>Un conflit survient lorsqu’une même ligne d’un même fichier a été modifiée de deux manières différentes dans la branche locale et dans la branche distante par rapport à l’ancêtre commun (LCA). Git suspend l’opération et insère des <strong>marqueurs de conflit</strong> :</p>',
        '<pre><code>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD (Notre version locale)\nconst PORT = 8080;\n=======\nconst PORT = 3000;\n&gt;&gt;&gt;&gt;&gt;&gt;&gt; feature/api-port (Version distante en cours de fusion)</code></pre>',
        '<p>L’ingénieur doit analyser le contexte, supprimer les marqueurs, conserver la valeur appropriée, indexer le fichier via <code>git add</code> puis finaliser la fusion via <code>git commit</code> (ou <code>git rebase --continue</code>).</p>'
      ].join('\n')
    }
  ],
  methodTitle: 'Méthode d’Ingénierie : Arbitrage &amp; Nettoyage d’une Branche Avant PR',
  method: [
    'Étape 1 : Mettre à jour la copie locale de la branche principale : git fetch origin main.',
    'Étape 2 : Lancer un rebase interactif local pour condenser les micro-commits de travail : git rebase -i HEAD~5.',
    'Étape 3 : Utiliser « fixup » sur les commits de corrections mineures (typos, lint) pour ne conserver que des commits atomiques.',
    'Étape 4 : Rebaser la branche de fonctionnalité sur la tête à jour de main : git rebase origin/main.',
    'Étape 5 : En cas de conflit, inspecter les deltas par rapport au LCA, éditer le code, git add puis git rebase --continue.',
    'Étape 6 : Vérifier la compilation et les tests unitaires avant de pousser la branche nettoyée sur GitHub.'
  ],
  summary: [
    'Fast-Forward avance le pointeur de branche sans créer de commit si l’historique est strictement linéaire.',
    'Le 3-Way Merge intervient dès qu’il y a divergence et crée un commit de fusion à 2 parents.',
    'L’algorithme LCA (Lowest Common Ancestor) est le pivot mathématique de la fusion tridirectionnelle.',
    'Le moteur ORT (Git 2.33+) remplace recursive : ultra-rapide et détection avancée des renommages.',
    'Le rebase interactif (git rebase -i) permet d’assainir l’historique local : pick, squash, fixup, reword.',
    'La règle d’or : ne jamais rebaser une branche publique déjà partagée avec l’équipe.',
    'Les conflits tridirectionnels résultent de modifications contradictoires par rapport à la base LCA.'
  ],
  checklist: [
    'Je sais expliquer quand un Fast-Forward est réalisable et pourquoi --no-ff force un commit de fusion.',
    'Je comprends le rôle du Lowest Common Ancestor (LCA) dans une fusion à 3 voies.',
    'Je connais les avantages du moteur de fusion ORT par rapport à recursive.',
    'Je maîtrise l’utilisation de git rebase -i et des directives squash et fixup.',
    'Je respecte scrupuleusement la règle d’or du rebase en environnement collaboratif.',
    'Je sais décoder et résoudre manuellement les marqueurs de conflits <<<<<<< et >>>>>>>.'
  ],
  notions: [
    'Fast-Forward (Avance rapide)',
    '3-Way Merge (Fusion tridirectionnelle)',
    'Lowest Common Ancestor (LCA)',
    'Stratégies Recursive &amp; ORT',
    'Rebase Interactif (git rebase -i)',
    'Directives squash &amp; fixup',
    'Règle d’or du rebase',
    'Marqueurs et arbitrage de conflits'
  ],
  pitfalls: [
    'Faire un git push --force sur la branche main après un rebase local (catastrophe d’équipe).',
    'Confondre squash (qui fusionne en conservant les messages) et fixup (qui élimine le message du commit fusionné).',
    'Oublier de supprimer les marqueurs de conflit (« <<<<<<< ») avant de commiter un fichier résolu.',
    'Penser que git merge modifie les hashes des commits fusionnés (seul git rebase réécrit les hashes).'
  ],
  questions: [
    {
      stem: 'Dans quelle situation topologique une fusion Fast-Forward est-elle possible ?',
      opts: [
        'Lorsque les deux branches ont créé des commits différents au même moment',
        'Lorsque la branche cible est un ancêtre direct de la branche source sans aucune divergence',
        'Uniquement lorsque tous les fichiers modifiés ont des extensions différentes',
        'Lorsque le dépôt est configuré avec le moteur de fusion ORT en mode multi-parents'
      ],
      correct: 1,
      exp: 'Le Fast-Forward n’est possible que si la branche réceptrice n’a pas divergé par rapport à l’ancêtre commun de la branche à intégrer. Git déplace simplement le pointeur vers l’amont.'
    },
    {
      stem: 'Combien de parents possède un commit généré par une fusion tridirectionnelle classique (3-Way Merge) ?',
      opts: [
        'Exactement 1 parent',
        'Exactement 2 parents',
        '3 parents (l’ancêtre commun et les deux têtes)',
        'Aucun parent (c’est un commit racine orphelin)'
      ],
      correct: 1,
      exp: 'Un commit de fusion standard à deux branches possède exactement deux parents : le commit HEAD courant et le commit de la branche intégrée.'
    },
    {
      stem: 'Quel est le rôle du Lowest Common Ancestor (LCA) lors d’une fusion à 3 voies ?',
      opts: [
        'Il sert de point de référence neutre pour comparer les deltas intervenus sur chacune des deux branches',
        'Il supprime automatiquement tous les conflits de code sans intervention humaine',
        'Il calcule l’empreinte SHA-256 finale du dépôt',
        'Il verrouille la branche distante pendant l’opération'
      ],
      correct: 0,
      exp: 'Le LCA est le dernier ancêtre commun le plus proche dans le DAG. Git compare les modifications de la branche locale par rapport au LCA et de la branche distante par rapport au LCA pour identifier les vrais conflits.'
    },
    {
      stem: 'Quelle directive de « git rebase -i » permet de fondre un commit dans le précédent en éliminant son message ?',
      opts: [
        'squash',
        'fixup',
        'reword',
        'drop'
      ],
      correct: 1,
      exp: 'La commande fixup fusionne les modifications dans le commit situé au-dessus de lui dans la liste tout en ignorant son message de commit, contrairement à squash qui ouvre un éditeur pour concaténer les messages.'
    },
    {
      stem: 'Pourquoi est-il formellement interdit de rebaser une branche publique partagée sur GitHub ?',
      opts: [
        'Parce que le rebase consomme trop de bande passante réseau',
        'Parce que le rebase modifie les hashes SHA de tous les commits rejoués, provoquant une divergence pour les pairs',
        'Parce que Git bloque automatiquement les commandes rebase sur les serveurs distants',
        'Parce que les fichiers binaires LFS sont supprimés lors du rebase'
      ],
      correct: 1,
      exp: 'Chaque commit rebasé reçoit un nouveau parent, donc un nouvel identifiant SHA. Pour les autres membres de l’équipe qui se basaient sur les anciens commits, l’historique est brisé et entre en conflit violent.'
    },
    {
      stem: 'Quel moteur de fusion est devenu le moteur officiel par défaut de Git depuis la version 2.33 ?',
      opts: [
        'octopus',
        'resolve',
        'ORT (Ostensibly Recursive’s Twin)',
        'subtree'
      ],
      correct: 2,
      exp: 'Le moteur ORT a succédé au moteur recursive historique. Il est infiniment plus rapide et gère de manière optimale les renommages de répertoires et fichiers.'
    },
    {
      stem: 'Que symbolise la section comprise entre « <<<<<<< HEAD » et « ======= » dans un fichier en conflit ?',
      opts: [
        'Le code tel qu’il existait dans l’ancêtre commun LCA',
        'La version présente sur la branche locale courante sur laquelle on se trouve',
        'La version distante provenant de la branche en cours de fusion',
        'Le code suggéré automatiquement par le serveur GitHub'
      ],
      correct: 1,
      exp: 'La partie supérieure (entre <<<<<<< HEAD et =======) représente la version du fichier présente sur la branche locale active (HEAD).'
    },
    {
      stem: 'Quelle commande permet de forcer la création d’un commit de fusion même si un Fast-Forward est réalisable ?',
      opts: [
        'git merge --ff-only',
        'git merge --no-ff',
        'git merge --squash',
        'git merge --rebase'
      ],
      correct: 1,
      exp: 'L’option --no-ff désactive le comportement par défaut d’avance rapide et force Git à créer un commit de fusion dédié, préservant la trace explicite de l’existence d’une branche de fonctionnalité.'
    }
  ],
  flashcards: [
    {
      q: 'Qu’est-ce qu’une fusion Fast-Forward dans Git ?',
      a: 'Un déplacement direct du pointeur de branche sans création de nouveau commit, possible uniquement lorsque l’historique entre les deux branches est strictement linéaire.'
    },
    {
      q: 'Qu’est-ce que le LCA (Lowest Common Ancestor) ?',
      a: 'Le dernier ancêtre commun le plus proche partagé par deux branches dans le graphe DAG, servant de point de base pour le 3-Way Merge.'
    },
    {
      q: 'Quelle est la différence fondamentale entre squash et fixup lors d’un rebase interactif ?',
      a: 'Squash fond le commit dans le précédent en concaténant les messages ; fixup fond le commit en supprimant purement et simplement son message de commit.'
    },
    {
      q: 'Pourquoi le moteur de fusion ORT surpasse-t-il l’ancien moteur recursive ?',
      a: 'ORT opère massivement en mémoire sans écritures disque superflues et résout avec une très haute fidélité les conflits complexes liés aux renommages et déplacements de fichiers.'
    },
    {
      q: 'Que fait la commande « git merge --abort » ?',
      a: 'Elle interrompt une fusion en cours de résolution de conflit et restaure la copie de travail à l’état exact précédant l’appel de git merge.'
    },
    {
      q: 'Quelle est la règle d’or du rebase Git ?',
      a: 'Ne jamais rebaser une branche publique partagée avec d’autres collaborateurs, sous peine de modifier tous les identifiants SHA et de corrompre leur historique.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Difficultés à identifier les conditions d’un Fast-Forward ou hésitations lors de la résolution de conflits tridirectionnels.'
    },
    {
      cls: 'medium',
      text: 'Bonne compréhension du LCA, maîtrise des commandes rebase interactives simples et respect rigoureux de la règle d’or.'
    },
    {
      cls: 'high',
      text: 'Excellente maîtrise topologique du DAG, utilisation avancée des directives de rebase interactif et arbitrage expert des fusions complexes avec le moteur ORT.'
    }
  ]
};
