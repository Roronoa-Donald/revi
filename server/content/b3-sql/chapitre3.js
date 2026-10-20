/**
 * Chapitre 3 du cours « SQL Avancé B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 3,
  title: 'Analyse des Plans d’Exécution EXPLAIN (ANALYZE, BUFFERS) &amp; Optimiseur CBO',
  short: 'Plans d’Exécution &amp; CBO',
  toc: 'Moteur d’optimisation par les coûts (Cost-Based Optimizer - CBO), commande EXPLAIN (ANALYZE, BUFFERS), nœuds d’accès physiques (Seq Scan, Index Scan, Bitmap Heap Scan), algorithmes de jointure (Nested Loop, Hash Join, Merge Join), statistiques pg_statistic et dérives de cardinalité.',
  time: '≈ 2 h 45 de travail',
  free: false,
  situation: 'Lorsqu’une requête SQL met 12 secondes à s’exécuter en production au lieu des 50 millisecondes attendues, tenter de deviner intuitivement ce qui se passe conduit souvent à de fausses pistes ou à l’ajout hasardeux d’index inutiles. Dans un SGBDR comme PostgreSQL, l’optimiseur de requêtes (Cost-Based Optimizer - CBO) compile chaque requête déclarative en un plan d’exécution physique composé d’un arbre d’opérateurs. L’ingénieur de données de niveau Bachelor 3 doit savoir lire, disséquer et interpréter un rapport d’exécution généré par la commande EXPLAIN (ANALYZE, BUFFERS). Il doit comprendre les métriques de coût abstrait (startup cost, total cost), distinguer les comportements I/O en cache mémoire et sur disque, maîtriser la sélection des algorithmes de jointure (Nested Loop vs Hash Join vs Merge Join) et détecter les dérives catastrophiques d’estimation de cardinalité causées par des statistiques obsolètes.',
  objectives: [
    'comprendre le fonctionnement interne de l’optimiseur par les coûts (CBO) et son modèle de pondération matérielle ;',
    'analyser la structure arborescente d’un rapport EXPLAIN (ANALYZE, BUFFERS, TIMING) ;',
    'différencier les nœuds d’accès aux relations : Seq Scan, Index Scan, Index Only Scan et Bitmap Index Scan ;',
    'comparer en profondeur les trois algorithmes de jointure : Nested Loop, Hash Join et Merge Join ;',
    'auditer la mémoire de travail (work_mem) et identifier les écritures temporaires sur disque (Hash Batches / Sort Spill) ;',
    'développer en Python 3 des parseurs de plans EXPLAIN, des simulateurs d’algorithmes de jointure et des détecteurs d’écarts de cardinalité.'
  ],
  sections: [
    {
      title: 'Le Moteur d’Optimisation CBO & La Commande EXPLAIN (ANALYZE, BUFFERS)',
      html: [
        '<p>Le SQL étant un langage déclaratif, l’utilisateur exprime <em>ce qu’il veut obtenir</em> et non <em>la méthode pour y parvenir</em>. L’optimiseur Cost-Based Optimizer (CBO) génère des centaines de plans d’exécution alternatifs et sélectionne celui dont le coût total estimé est le plus faible :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Les Options Cruciales de la Commande EXPLAIN</h4>',
        '    <ul>',
        '      <li><code>EXPLAIN &lt;sql&gt;</code> : Affiche uniquement les estimations théoriques calculées par le planificateur, sans exécuter la requête.</li>',
        '      <li><code>EXPLAIN (ANALYZE)</code> : <strong>Exécute réellement la requête</strong> et mesure les temps réels d’exécution (actual time en ms) et le nombre de lignes produites (actual rows).</li>',
        '      <li><code>EXPLAIN (ANALYZE, BUFFERS)</code> : Affiche en plus les blocs mémoire manipulés dans le buffer pool (<code>shared hit</code> = blocs en RAM, <code>read</code> = blocs lus sur disque, <code>dirtied</code> = blocs modifiés).</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Compréhension des Métriques de Coût PostgreSQL</h4>',
        '    <p>Chaque nœud de plan est annoté de la métrique officielle :</p>',
        '    <pre><code>(cost=startup_cost..total_cost rows=N width=W)</code></pre>',
        '    <ul>',
        '      <li><strong>startup_cost :</strong> Coût estimé avant que le premier tuple ne soit renvoyé (ex: 0.00 pour un Seq Scan, ou le temps de tri pour un Sort).</li>',
        '      <li><strong>total_cost :</strong> Coût cumulé pour traiter l’ensemble des lignes de ce nœud.</li>',
        '      <li><strong>rows :</strong> Nombre estimé de lignes produites à ce stade.</li>',
        '      <li><strong>width :</strong> Largeur moyenne en octets de chaque tuple retourné.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Nœuds d’Accès aux Tables & Algorithmes de Jointure CBO',
      html: [
        '<p>L’arbre du plan d’exécution se lit de l’intérieur vers l’extérieur (du nœud le plus indenté vers la racine). Le moteur choisit parmi quatre modes d’accès aux relations :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. Les Quatre Nœuds d’Accès Physiques</h4>',
        '    <ul>',
        '      <li><strong>Seq Scan (Sequential Scan) :</strong> Balaye séquentiellement chaque bloc de la table. Privilégié si la table est petite ou si la requête sélectionne plus de 15 à 20 % des enregistrements.</li>',
        '      <li><strong>Index Scan :</strong> Parcourt l’arbre B-Tree puis lit directement le bloc de données correspondant sur la table. Optimal pour une sélectivité très forte (quelques lignes).</li>',
        '      <li><strong>Bitmap Heap Scan :</strong> Construit un vecteur de bits des blocs contenant les résultats (Bitmap Index Scan) puis les lit dans l’ordre physique séquentiel du disque.</li>',
        '      <li><strong>Index Only Scan :</strong> Toutes les colonnes nécessaires sont stockées dans l’index couvrant : la table n’est jamais lue.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Les Trois Algorithmes de Jointure CBO</h4>',
        '    <ul>',
        '      <li><strong>Nested Loop Join :</strong> Pour chaque ligne de la table externe, le moteur consulte la table interne. Formidablement rapide si la table externe est petite et que la table interne est indexée.</li>',
        '      <li><strong>Hash Join :</strong> Construit une table de hachage en mémoire avec la plus petite relation (build table), puis scanne la grande table (probe table). Exige une égalité (<code>=</code>).</li>',
        '      <li><strong>Merge Join :</strong> Parcourt en parallèle deux relations déjà triées sur la clé de jointure en $O(N + M)$. Idéal pour joindre deux volumes massifs indexés.</li>',
        '    </ul>',
        '  </div>',
        '</div>',
        box('warning', 'Impact de la Mémoire work_mem sur les Hash Joins et Tris', [
          '<p>Le paramètre <code>work_mem</code> alloue la quantité de mémoire RAM disponible par opération de tri ou de hachage. Si une table de hachage ou un tri dépasse <code>work_mem</code>, le moteur est contraint d’écrire des partitions temporaires sur disque (<strong>spill to disk / external sort</strong>), ce qui dégrade les temps d’exécution d’un facteur 10 à 50.</p>'
        ])
      ].join('\n')
    },
    {
      title: 'Statistiques du Catalogue pg_statistic & Dérives de Cardinalité',
      html: [
        '<p>L’optimiseur calcule ses coûts en s’appuyant sur les métadonnées collectées par le démon <strong>Autovacuum / ANALYZE</strong> et stockées dans la vue système <code>pg_stats</code> :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Contenu des Statistiques Collectées</h4>',
        '    <ul>',
        '      <li><strong>n_distinct :</strong> Nombre estimé de valeurs distinctes dans la colonne (ou ratio négatif si proportionnel au nombre de lignes).</li>',
        '      <li><strong>most_common_vals (MCV) :</strong> Liste des valeurs les plus fréquemment observées.</li>',
        '      <li><strong>most_common_freqs (MCF) :</strong> Fréquences statistiques respectives des valeurs MCV.</li>',
        '      <li><strong>histogram_bounds :</strong> Bornes de l’histogramme d’équirépartition des autres valeurs.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Le Piège Mortel de la Dérive de Cardinalité</h4>',
        '    <p>Si une table subit des insertions massives sans qu’un <code>ANALYZE</code> ne soit exécuté, les statistiques restent obsolètes :</p>',
        '    <ul>',
        '      <li>Le CBO estime <code>rows=1</code> au lieu de <code>rows=500000</code>.</li>',
        '      <li>Pensant qu’il n’y a qu’une seule ligne, il sélectionne un <strong>Nested Loop Join catastrophique</strong> qui va boucler 500 000 fois au lieu d’exécuter un Hash Join.</li>',
        '      <li><strong>Remède immédiat :</strong> Exécuter <code>ANALYZE nom_de_table;</code> ou ajuster <code>default_statistics_target</code> de 100 à 500 pour affiner la précision.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],
  method: [
    'Étape 1 : Préfixer la requête problématique par EXPLAIN (ANALYZE, BUFFERS) dans un environnement de test ou hors pointe.',
    'Étape 2 : Repérer le nœud le plus consommateur en comparant le coût total et le temps d’exécution réel (actual time).',
    'Étape 3 : Inspecter les compteurs de blocs disques : un volume élevé de shared read trahit un manque d’index ou un buffer pool sous-dimensionné.',
    'Étape 4 : Comparer les lignes estimées (rows) et les lignes réelles (actual rows) : un écart supérieur à un facteur 10 signale des statistiques obsolètes.',
    'Étape 5 : Vérifier si des opérations de tri ou de Hash Join écrivent sur le disque (Sort Method: external merge disk) et ajuster work_mem si nécessaire.',
    'Étape 6 : Réactualiser les statistiques via ANALYZE et revérifier que le plan d’exécution bascule vers un algorithme optimal.'
  ],
  summary: [
    'L’optimiseur CBO génère et évalue plusieurs plans d’exécution pour choisir celui ayant le coût total estimé minimal.',
    'La commande EXPLAIN (ANALYZE, BUFFERS) fournit les temps réels d’exécution et les lectures de blocs disques en mémoire.',
    'Un Bitmap Heap Scan réorganise les accès aléatoires de l’index en un parcours séquentiel des blocs de la table.',
    'Nested Loop excelle avec une petite table externe et un index ; Hash Join et Merge Join traitent efficacement les grands volumes sur égalité.',
    'Un dépassement du paramètre work_mem provoque des écritures temporaires sur disque (spill to disk) qui effondrent les performances.',
    'Une dérive majeure entre lignes estimées et lignes réelles justifie une réactualisation immédiate des statistiques via ANALYZE.'
  ],
  checklist: [
    'Je comprends la différence fondamentale entre EXPLAIN simple et EXPLAIN ANALYZE.',
    'Je sais décoder les métriques (cost=startup..total rows=N width=W) d’un nœud de plan.',
    'Je connais les cas d’usage respectifs de Seq Scan, Index Scan, Bitmap Heap Scan et Index Only Scan.',
    'Je maîtrise le principe de fonctionnement de Nested Loop, Hash Join et Merge Join.',
    'Je sais identifier un tri sur disque (external merge disk) trahissant une insuffisance de work_mem.',
    'Je sais comment interpréter et corriger un écart de cardinalité critique via la commande ANALYZE.'
  ],
  notions: [
    'Cost-Based Optimizer (CBO)',
    'Commande EXPLAIN (ANALYZE, BUFFERS)',
    'Coût de Démarrage & Coût Total (Startup vs Total Cost)',
    'Nœuds d’Accès (Seq Scan, Index Scan, Bitmap Scan)',
    'Algorithmes de Jointure (Nested Loop, Hash Join, Merge Join)',
    'Mémoire work_mem & Spill to Disk',
    'Statistiques du Catalogue pg_statistic & MCV',
    'Dérives de Cardinalité & Commande ANALYZE'
  ],
  pitfalls: [
    'Exécuter un EXPLAIN ANALYZE sur un INSERT, UPDATE ou DELETE en production sans BEGIN ... ROLLBACK, modifiant réellement les données.',
    'Ajouter aveuglément un index sans analyser le plan d’exécution, alors que le problème provenait d’une estimation de cardinalité erronée.',
    'Augmenter globalement work_mem à des valeurs excessives (ex: 2 Go par connexion), risquant de saturer la RAM du serveur sous forte concurrence.',
    'Confondre le coût abstrait de l’optimiseur (en unités arbitraires) avec un temps d’exécution en millisecondes.'
  ],
  questions: [
    {
      stem: 'Quelle option de la commande EXPLAIN permet d’afficher les blocs de mémoire tampon (Buffer Pool) consultés et lus sur disque ?',
      opts: [
        'EXPLAIN (VERBOSE)',
        'EXPLAIN (BUFFERS)',
        'EXPLAIN (TIMING)',
        'EXPLAIN (MEMORY)'
      ],
      correct: 1,
      exp: 'L’option BUFFERS (utilisée conjointement avec ANALYZE) détaille les blocs partagés trouvés en cache (shared hit) ou lus sur disque (read).'
    },
    {
      stem: 'Dans la sortie « (cost=0.42..8.44 rows=10 width=48) », que représente la valeur 0.42 ?',
      opts: [
        'Le temps d’exécution en millisecondes',
        'Le coût estimé de démarrage (startup cost) avant de produire la première ligne',
        'Le nombre d’index utilisés',
        'Le pourcentage d’utilisation du processeur'
      ],
      correct: 1,
      exp: 'La première valeur du couple de coûts correspond au coût de démarrage (startup cost), c’est-à-dire le travail préalable requis pour renvoyer le premier tuple.'
    },
    {
      stem: 'Dans quel scénario l’optimiseur privilégie-t-il un algorithme de jointure Nested Loop Join ?',
      opts: [
        'Lorsque les deux tables contiennent plus de 10 millions de lignes sans aucun index',
        'Lorsque la table externe est très petite et que la table interne dispose d’un index performant sur la clé de jointure',
        'Uniquement sur les requêtes avec la clause GROUP BY',
        'Lorsque la mémoire work_mem est totalement saturée'
      ],
      correct: 1,
      exp: 'Nested Loop est optimal pour une petite relation externe bouclant sur un index sélectif de la table interne.'
    },
    {
      stem: 'Quel algorithme de jointure construit une table de hachage en mémoire à partir de la plus petite relation avant de scanner la seconde ?',
      opts: [
        'Merge Join',
        'Hash Join',
        'Nested Loop Join',
        'Cross Join'
      ],
      correct: 1,
      exp: 'Le Hash Join charge la relation la plus compacte (build table) dans une table de hachage en mémoire work_mem, puis scanne l’autre relation (probe table).'
    },
    {
      stem: 'Que signifie la mention « Sort Method: external merge Disk: 1840kB » dans un rapport EXPLAIN ANALYZE ?',
      opts: [
        'Le tri a été accéléré par le contrôleur RAID',
        'Le tri n’a pas pu tenir dans la mémoire work_mem et a dû déborder temporairement sur le disque',
        'Le disque dur est défectueux',
        'L’index est corrompu'
      ],
      correct: 1,
      exp: 'La mention external merge Disk indique un manque de work_mem : le moteur a écrit des fichiers temporaires sur disque pour trier les données.'
    },
    {
      stem: 'Quel nœud d’accès combine les résultats d’un ou plusieurs index sous la forme d’un vecteur de bits avant de lire la table physique ?',
      opts: [
        'Seq Scan',
        'Bitmap Heap Scan (alimenté par Bitmap Index Scan)',
        'Index Only Scan',
        'TID Scan'
      ],
      correct: 1,
      exp: 'Le Bitmap Heap Scan utilise un masque de bits produit par un Bitmap Index Scan pour lire les blocs physiques de table dans l’ordre séquentiel du disque.'
    },
    {
      stem: 'Quelle commande PostgreSQL permet de recalculer les statistiques de distribution des tables sans reconstruire les données ?',
      opts: [
        'REINDEX DATABASE',
        'VACUUM FULL',
        'ANALYZE',
        'CHECKPOINT'
      ],
      correct: 2,
      exp: 'La commande ANALYZE échantillonne les lignes des tables et met à jour les métadonnées de distribution stockées dans pg_statistic pour le CBO.'
    },
    {
      stem: 'Si un plan indique « rows=1 » alors que l’exécution réelle affiche « actual rows=500000 », quelle est la conséquence probable sur le choix de jointure ?',
      opts: [
        'Le CBO choisira à tort un Nested Loop inadapté au lieu d’un Hash Join ou Merge Join performant',
        'La requête sera automatiquement annulée',
        'Le serveur redémarrera',
        'Aucune conséquence, l’optimiseur s’adapte automatiquement au runtime'
      ],
      correct: 0,
      exp: 'Une sous-estimation massive de cardinalité conduit l’optimiseur à choisir un Nested Loop désastreux qui va boucler des centaines de milliers de fois.'
    }
  ],
  flashcards: [
    {
      q: 'Qu’est-ce que le CBO dans un SGBD relationnel ?',
      a: 'Le Cost-Based Optimizer : moteur calculant le coût théorique des différents plans possibles pour choisir le plus rapide.'
    },
    {
      q: 'Quelle est la différence entre EXPLAIN et EXPLAIN ANALYZE ?',
      a: 'EXPLAIN affiche uniquement les estimations théoriques ; EXPLAIN ANALYZE exécute réellement la requête et mesure les temps réels.'
    },
    {
      q: 'Quels sont les trois grands algorithmes de jointure ?',
      a: 'Nested Loop Join (boucle imbriquée), Hash Join (table de hachage) et Merge Join (fusion de flux triés).'
    },
    {
      q: 'Quel est le rôle du paramètre work_mem ?',
      a: 'Allouer la mémoire RAM maximale par opération de tri ou de hachage avant de basculer en écriture temporaire sur disque.'
    },
    {
      q: 'Pourquoi une mauvaise estimation de cardinalité dégrade-t-elle les requêtes ?',
      a: 'Parce que le CBO se base sur le nombre de lignes estimé pour choisir l’algorithme de jointure et les types de scans.'
    },
    {
      q: 'Comment forcer la mise à jour des statistiques de l’optimiseur ?',
      a: 'En exécutant la commande ANALYZE nom_de_table;.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Difficultés à lire un plan EXPLAIN ou confusion entre les métriques estimées et réelles.'
    },
    {
      cls: 'medium',
      text: 'Bonne compréhension des coûts de plans, identification des types de scans et choix d’algorithmes de jointure.'
    },
    {
      cls: 'high',
      text: 'Diagnostic expert de plans d’exécution complexes, optimisation fine de work_mem, élimination des dérives de cardinalité et tuning CBO avancé.'
    }
  ]
};
