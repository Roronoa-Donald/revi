/**
 * Chapitre 2 du cours « SQL Avancé B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 2,
  title: 'Indexation B-Tree, Hash, GIN &amp; Optimisation Physique du Stockage',
  short: 'Indexation &amp; Stockage Physique',
  toc: 'Structures physiques de stockage, pages mémoire de 8 Ko, architecture interne des arbres B-Tree, index Hash, GiST et GIN, dimensionnement et Fill Factor, index couvrants (Covering Indexes) et maintenance REINDEX.',
  time: '≈ 2 h 45 de travail',
  free: false,
  situation: 'Sur une base de données de production atteignant des centaines de gigaoctets ou des téraoctets, exécuter un balayage séquentiel complet (Sequential Scan) pour retrouver quelques enregistrements parmi 50 millions de lignes immobilise le disque, sature le buffer pool et génère des temps de réponse inacceptables de plusieurs secondes. Pour garantir des temps d’accès sub-millisecondes, les moteurs relationnels s’appuient sur des structures d’indexation physique sophistiquées. L’ingénieur de données de niveau Bachelor 3 doit comprendre l’anatomie des blocs disques de 8 Ko, la traversée logarithmique des arbres équilibrés B-Tree, maîtriser les index spécialisés pour le JSONB et le texte intégral (GIN), dimensionner le facteur de remplissage (Fill Factor) pour prévenir la fragmentation et concevoir des index couvrants (Index-Only Scan) éliminant tout accès superflu à la table.',
  objectives: [
    'comprendre l’organisation physique des pages de 8 Ko dans PostgreSQL (PageHeader, ItemId, Tuples) ;',
    'analyser l’architecture interne des index B-Tree (nœuds racine, internes et feuilles, fan-out) ;',
    'dimensionner précisément l’empreinte disque et mémoire d’un index en fonction du Fill Factor ;',
    'comparer les familles d’index : B-Tree, Hash, GiST (géospatial) et GIN (JSONB, tableaux) ;',
    'concevoir des index partiels (Partial Indexes) et des index couvrants (Covering Indexes avec INCLUDE) ;',
    'développer en Python 3 des simulateurs de traversée B-Tree, des calculateurs d’empreinte mémoire et des conseillers d’indexation (Index Advisor).'
  ],
  sections: [
    {
      title: 'Organisation Physique des Pages Disques & Anatomie du B-Tree',
      html: [
        '<p>Dans PostgreSQL, la mémoire et le stockage persistant sont segmentés en blocs de taille fixe appelés <strong>pages</strong> (par défaut 8 192 octets soit 8 Ko). Une page de données ou d’index comporte une structure millimétrée :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Structure Interne d’une Page PostgreSQL (8 Ko)</h4>',
        '    <ul>',
        '      <li><strong>PageHeaderData (24 octets) :</strong> Méta-données fixes contenant le LSN du dernier WAL, les drapeaux et les pointeurs de décalage vers le début et la fin de l’espace libre.</li>',
        '      <li><strong>Tableaux des ItemId (4 octets par pointeur) :</strong> Liste croissant vers le bas des pointeurs physiques orientés vers les tuples réels.</li>',
        '      <li><strong>Espace Libre (Free Space) :</strong> Zone tampon centrale se réduisant à chaque insertion.</li>',
        '      <li><strong>Tuples / Entrées d’Index :</strong> Écrits depuis le bas de la page (offset 8192) en remontant vers le haut.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>L’Arbre Équilibré B-Tree (Bayer-McCreight)</h4>',
        '    <p>Le B-Tree est un arbre n-aire auto-équilibré où toutes les feuilles sont rigoureusement à la même profondeur :</p>',
        '    <ul>',
        '      <li><strong>Facteur de Branchement (Fan-Out) :</strong> Chaque page peut héberger 200 à 500 clés triées selon la taille des données.</li>',
        '      <li><strong>Traversée Logarithmique :</strong> Atteindre un enregistrement parmi 100 millions de lignes ne requiert que 3 ou 4 I/O de blocs ($O(\\log_B N)$).</li>',
        '      <li><strong>Feuilles Chaînées :</strong> Les pages feuilles sont reliées entre elles par des pointeurs doublement chaînés (Next/Prev), autorisant les balayages par plage ultra-rapides (<code>BETWEEN</code>, <code>&gt;=</code>).</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Typologie des Index : B-Tree, Hash, GIN &amp; GiST',
      html: [
        '<p>Bien que le B-Tree couvre 90 % des besoins relationnels, des types d’index spécialisés sont indispensables selon la nature des colonnes et des opérateurs :</p>',
        '<table class="table">',
        '  <thead><tr><th>Type d\'Index</th><th>Cas d\'Usage &amp; Opérateurs Supportés</th><th>Structure Physique</th><th>Avantages &amp; Limites</th></tr></thead>',
        '  <tbody>',
        '    <tr><td><strong>B-Tree</strong></td><td>Égalités et intervalles (<code>=</code>, <code>&lt;</code>, <code>&gt;</code>, <code>BETWEEN</code>, <code>ORDER BY</code>)</td><td>Arbre n-aire équilibré trié</td><td>Standard universel, supporte les index composites et couvrants.</td></tr>',
        '    <tr><td><strong>HASH</strong></td><td>Égalité stricte uniquement (<code>=</code>)</td><td>Table de hachage sur disque</td><td>Recherche $O(1)$ très compacte ; ne supporte aucun tri ni recherche d\'intervalle.</td></tr>',
        '    <tr><td><strong>GIN (Generalized Inverted Index)</strong></td><td>Documents JSONB (<code>?</code>, <code>@&gt;</code>), tableaux (<code>&&</code>), recherche plein texte</td><td>Index inversé associant chaque élément interne aux TIDs des lignes</td><td>Recherches multi-clés fulgurantes dans les données semi-structurées ; coût d\'écriture élevé.</td></tr>',
        '    <tr><td><strong>GiST (Generalized Search Tree)</strong></td><td>Données géospatiales PostGIS, plages de valeurs (<code>daterange</code>), géométrie</td><td>Arbre R-Tree hiérarchique englobant (Bounding Boxes)</td><td>Permet l\'indexation d\'objets multi-dimensionnels et les contraintes d\'exclusion sans chevauchement.</td></tr>',
        '  </tbody>',
        '</table>',
        box('standard', 'Index Couvrants (Covering Indexes) &amp; Index Only Scan', [
          '<p>Dans un <code>Index Scan</code> classique, le moteur parcourt l’arbre d’index pour récupérer le tuple ID (TID), puis doit lire le bloc de la table pour extraire les colonnes non indexées. Grâce à la clause <code>INCLUDE</code> (introduite dans PostgreSQL 11), on peut stocker des colonnes supplémentaires dans les feuilles de l’index sans les inclure dans l’arbre de tri :</p>',
          '<pre><code>CREATE INDEX idx_cmd_client_date ON commandes (client_id) INCLUDE (total_ttc, date_cmd);</code></pre>',
          '<p>Une requête interrogeant <code>client_id</code>, <code>total_ttc</code> et <code>date_cmd</code> réalise alors un <strong>Index Only Scan</strong> : elle lit 100 % des données dans l’index sans jamais toucher la table physique, divisant les I/O disque par dix.</p>'
        ])
      ].join('\n')
    },
    {
      title: 'Fill Factor, Fragmentation & Maintenance Physique (REINDEX)',
      html: [
        '<p>L’activité transactionnelle intensive (insertions, mises à jour et suppressions) altère l’organisation physique des index :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Le Paramètre Fill Factor &amp; Divisions de Pages (Page Splits)</h4>',
        '    <p>Lorsqu’une page feuille d’un index B-Tree est pleine à 100 % et qu’une nouvelle clé doit y être insérée :</p>',
        '    <ul>',
        '      <li>Le moteur déclenche un <strong>Page Split</strong> : allocation d’une nouvelle page de 8 Ko et copie de 50 % des clés vers celle-ci.</li>',
        '      <li>Cette opération engendre des écritures disque bloquantes et fragmente l’index (pages à moitié vides).</li>',
        '      <li><strong>Remède :</strong> Définir un <code>fillfactor = 80</code> ou <code>85</code> pour préserver de l’espace libre destiné aux insertions futures.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Reconstruction Concurrente via REINDEX CONCURRENTLY</h4>',
        '    <p>Au fil du temps, un index fragmenté (index bloat) consomme une mémoire RAM démesurée et ralentit les lectures :</p>',
        '    <ul>',
        '      <li>Un <code>REINDEX</code> standard pose un verrou exclusif <code>AccessExclusiveLock</code> qui bloque toutes les lectures et écritures sur la table.</li>',
        '      <li>La commande <code>REINDEX TABLE CONCURRENTLY &lt;nom&gt;;</code> reconstruit le nouvel index en tâche de fond en plusieurs passes sans interrompre la production.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],
  method: [
    'Étape 1 : Analyser les requêtes lentes du journal (slow query log ou pg_stat_statements) pour identifier les prédicats WHERE, JOIN et ORDER BY fréquents.',
    'Étape 2 : Vérifier la sélectivité des colonnes : ne jamais indexer une colonne à très faible cardinalité (ex: booléen ou statut binaire) avec un B-Tree complet.',
    'Étape 3 : Créer des index composites en respectant la règle d’or : colonnes d’égalité stricte en premier, suivies des colonnes d’intervalle ou de tri.',
    'Étape 4 : Déployer des index partiels (WHERE actif = true) sur les tables volumineuses pour réduire l’empreinte mémoire de 80 %.',
    'Étape 5 : Exploiter la clause INCLUDE pour concevoir des index couvrants permettant l’exécution en Index Only Scan.',
    'Étape 6 : Planifier périodiquement une maintenance des index fragmentés via REINDEX CONCURRENTLY lors des heures creuses.'
  ],
  summary: [
    'Le stockage PostgreSQL repose sur des pages de 8 Ko contenant un en-tête fixe, des ItemIds et des tuples.',
    'L’index B-Tree organise les clés dans un arbre n-aire équilibré assurant une traversée en temps logarithmique O(log N).',
    'L’index GIN est le choix indispensable pour indexer les documents semi-structurés JSONB, les tableaux et le texte intégral.',
    'Les index couvrants (clause INCLUDE) permettent au moteur de satisfaire la requête par un Index Only Scan sans toucher la table.',
    'Le paramètre fillfactor réserve de l’espace libre dans les pages d’index pour prévenir les coûteuses divisions de pages (Page Splits).',
    'La maintenance d’un index fragmenté s’opère sans verrouillage applicatif via la commande REINDEX CONCURRENTLY.'
  ],
  checklist: [
    'Je comprends la découpe interne d’une page PostgreSQL de 8 192 octets.',
    'Je sais expliquer pourquoi un arbre B-Tree n’a généralement que 3 à 4 niveaux de profondeur.',
    'Je maîtrise les cas d’usage distincts de B-Tree, HASH, GIN et GiST.',
    'Je sais concevoir un index couvrant avec la clause INCLUDE pour déclencher un Index Only Scan.',
    'Je comprends le rôle du Fill Factor dans la prévention des divisions de pages lors d’insertions massives.',
    'Je sais pourquoi REINDEX CONCURRENTLY est obligatoire sur une base en production 24/7.'
  ],
  notions: [
    'Pages Disques de 8 Ko & PageHeaderData',
    'Arbre Équilibré B-Tree & Fan-Out',
    'Index Hash & Accès O(1)',
    'Generalized Inverted Index (GIN) pour JSONB',
    'Index Couvrants & Clause INCLUDE',
    'Index Partiels (Partial Indexes)',
    'Divisions de Pages (Page Splits) & Fill Factor',
    'Maintenance Reindex Concurrently'
  ],
  pitfalls: [
    'Créer un index sur chaque colonne individuelle d’une table, provoquant un effondrement dramatique des performances d’INSERT et d’UPDATE.',
    'Inverser l’ordre des colonnes dans un index composite (placer la colonne d’intervalle avant la colonne d’égalité), empêchant l’index d’être pleinement exploité.',
    'Indexer une colonne JSONB avec un index B-Tree ordinaire plutôt qu’un index GIN, rendant impossible la recherche par clés internes.',
    'Oublier le mot-clé CONCURRENTLY lors d’un REINDEX en production, figeant l’ensemble de l’application sous un verrou exclusif.'
  ],
  questions: [
    {
      stem: 'Quelle est la taille physique par défaut d’une page de stockage dans PostgreSQL ?',
      opts: [
        '512 octets',
        '4 096 octets (4 Ko)',
        '8 192 octets (8 Ko)',
        '65 536 octets (64 Ko)'
      ],
      correct: 2,
      exp: 'PostgreSQL manipule toutes ses tables et index sous la forme de blocs disques standards de 8 192 octets (8 Ko).'
    },
    {
      stem: 'Quel type d’index est universellement recommandé pour indexer des champs semi-structurés de type JSONB dans PostgreSQL ?',
      opts: [
        'Index B-Tree classique',
        'Index HASH',
        'Index GIN (Generalized Inverted Index)',
        'Index BRIN'
      ],
      correct: 2,
      exp: 'L’index GIN décompose les clés et valeurs du document JSONB en index inversé, permettant des recherches instantanées avec l’opérateur @>.'
    },
    {
      stem: 'Quel est l’intérêt majeur de la clause INCLUDE lors de la création d’un index B-Tree ?',
      opts: [
        'Compresser l’index avec l’algorithme gzip',
        'Ajouter des colonnes de charge utile dans les pages feuilles pour permettre l’Index Only Scan sans modifier la structure de tri',
        'Empêcher les suppressions de lignes dans la table',
        'Traduire les colonnes en minuscules'
      ],
      correct: 1,
      exp: 'La clause INCLUDE intègre des données complémentaires dans les feuilles de l’index, permettant au moteur d’exécuter la requête sans accéder à la table.'
    },
    {
      stem: 'Que se produit-il lorsqu’une page feuille B-Tree atteint 100 % de sa capacité et reçoit une nouvelle clé ?',
      opts: [
        'Le serveur s’arrête immédiatement avec une erreur fatale',
        'Le moteur effectue une division de page (Page Split) en allouant une nouvelle page et en transférant 50 % des clés',
        'La clé la plus ancienne est automatiquement écrasée',
        'La clé est stockée dans un fichier texte temporaire'
      ],
      correct: 1,
      exp: 'Le Page Split sépare la page en deux pour insérer la nouvelle valeur, un mécanisme coûteux en I/O atténué par le paramètre fillfactor.'
    },
    {
      stem: 'Pour une requête filtrant sur « WHERE client_id = 42 AND date_cmd >= \'2025-01-01\' », quel ordre de colonnes dans l’index composite est optimal ?',
      opts: [
        '(date_cmd, client_id)',
        '(client_id, date_cmd)',
        'L’ordre n’a aucune importance dans un B-Tree',
        'Seul client_id doit être indexé'
      ],
      correct: 1,
      exp: 'Règle d’or : les colonnes à égalité stricte (client_id) doivent toujours être placées avant les colonnes à intervalle (date_cmd).'
    },
    {
      stem: 'Quelle commande PostgreSQL permet de reconstruire un index sans bloquer les opérations de lecture et d’écriture concurrentes ?',
      opts: [
        'REINDEX TABLE commandes;',
        'VACUUM FULL commandes;',
        'REINDEX TABLE CONCURRENTLY commandes;',
        'ALTER INDEX commandes RESTART;'
      ],
      correct: 2,
      exp: 'L’option CONCURRENTLY évite le verrou exclusif lourd et permet à la production de continuer pendant la reconstruction de l’index.'
    },
    {
      stem: 'Qu’est-ce qu’un index partiel (Partial Index) dans PostgreSQL ?',
      opts: [
        'Un index qui ne fonctionne que le matin',
        'Un index restreint à un sous-ensemble de lignes répondant à une clause WHERE définie lors de sa création',
        'Un index contenant uniquement la moitié des colonnes',
        'Un index stocké sur une clé USB'
      ],
      correct: 1,
      exp: 'Un index partiel (ex: CREATE INDEX ... WHERE actif = true) ne référence que les lignes pertinentes, économisant de la mémoire RAM et des I/O.'
    },
    {
      stem: 'Quelle est la complexité théorique de recherche d’une clé dans un index B-Tree contenant N enregistrements avec un facteur de branchement B ?',
      opts: [
        'O(N)',
        'O(1)',
        'O(log_B N)',
        'O(N^2)'
      ],
      correct: 2,
      exp: 'La traversée de l’arbre B-Tree s’effectue en temps logarithmique O(log_B N), ce qui représente un nombre d’I/O fixe minime.'
    }
  ],
  flashcards: [
    {
      q: 'Quelle est la taille d’une page standard dans PostgreSQL ?',
      a: '8 192 octets (8 Ko).'
    },
    {
      q: 'Quel est l’atout majeur de l’index B-Tree ?',
      a: 'Un arbre n-aire auto-équilibré garantissant un accès aux données en temps logarithmique O(log N) pour les égalités et les intervalles.'
    },
    {
      q: 'Pourquoi privilégier un index GIN sur une colonne JSONB ?',
      a: 'Parce qu’il décompose le document en index inversé, permettant des recherches rapides par clés et valeurs imbriquées.'
    },
    {
      q: 'Qu’est-ce qu’un Index Only Scan ?',
      a: 'Une exécution où toutes les données nécessaires sont lues directement dans l’index sans jamais accéder aux blocs de la table.'
    },
    {
      q: 'À quoi sert le paramètre fillfactor sur un index B-Tree ?',
      a: 'À réserver de l’espace libre dans les pages pour éviter les divisions de pages (Page Splits) lors d’insertions ultérieures.'
    },
    {
      q: 'Pourquoi exécuter REINDEX TABLE CONCURRENTLY en production ?',
      a: 'Pour éliminer la fragmentation de l’index sans bloquer les lectures ni les écritures des utilisateurs applicatifs.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Difficultés à identifier le bon type d’index ou confusion sur le fonctionnement des index composites.'
    },
    {
      cls: 'medium',
      text: 'Bonne compréhension des arbres B-Tree, dimensionnement avec Fill Factor et utilisation des index GIN pour le JSONB.'
    },
    {
      cls: 'high',
      text: 'Maîtrise approfondie des index couvrants (INCLUDE), élimination des accès tables via Index Only Scan et maintenance non bloquante en production.'
    }
  ]
};
