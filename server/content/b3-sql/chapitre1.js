/**
 * Chapitre 1 du cours « SQL Avancé B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 1,
  title: 'Transactions ACID, Journalisation WAL &amp; Niveaux d’Isolation ANSI',
  short: 'Transactions ACID &amp; Isolation',
  toc: 'Propriétés ACID (Atomicité, Cohérence, Isolation, Durabilité), mécanisme Write-Ahead Logging (WAL), verrous partagés et exclusifs (S/X locks), interblocages (Deadlocks), 4 niveaux d’isolation ANSI SQL et contrôle de concurrence multiversion (MVCC).',
  time: '≈ 2 h 45 de travail',
  free: true,
  situation: 'Dans un système d’information moderne gérant des millions de transactions bancaires, de commandes e-commerce ou de dossiers médicaux, plusieurs milliers d’utilisateurs et de services accèdent simultanément aux mêmes tables. Sans garanties strictes de concurrence, des conflits destructeurs se produisent : débits bancaires partiels sur panne réseau, lectures de soldes non validés (Dirty Read), ou pertes irrémédiables de mises à jour (Lost Update). L’ingénieur de données de niveau Bachelor 3 doit maîtriser les fondements mathématiques et architecturaux des transactions ACID, comprendre le rôle vital du journal de réécriture en amont (Write-Ahead Logging - WAL) lors des récupérations après crash, configurer les 4 niveaux d’isolation ANSI SQL selon les compromis de performance, et analyser les graphes d’attente de verrous (Wait-For Graph) pour éradiquer les interblocages (deadlocks).',
  objectives: [
    'comprendre les quatre piliers fondamentaux ACID et leur implémentation physique dans le moteur SGBD ;',
    'analyser la cinématique du journal Write-Ahead Logging (WAL) et la récupération après panne (Crash Recovery) ;',
    'comparer les 4 niveaux d’isolation ANSI SQL et leurs protections contre les anomalies de concurrence ;',
    'maîtriser la matrice de compatibilité des verrous à deux phases (2PL) partagés (S) et exclusifs (X) ;',
    'détecter et résoudre les cycles d’interblocage (Deadlocks) par exploration de graphes orientés ;',
    'développer en Python 3 des simulateurs de niveaux d’isolation, des gestionnaires de verrous S/X et des détecteurs de cycles de transactions.'
  ],
  sections: [
    {
      title: 'Les Fondations ACID & Le Mécanisme de Journalisation WAL (Write-Ahead Logging)',
      html: [
        '<p>Une transaction est une unité logique de traitement composée d’une ou plusieurs instructions SQL exécutées de manière atomique (entre <code>BEGIN</code> et <code>COMMIT</code> ou <code>ROLLBACK</code>). Le standard relationnel repose sur quatre propriétés incontournables :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Les Quatre Propriétés ACID</h4>',
        '    <ul>',
        '      <li><strong>Atomicité (Atomicity) :</strong> Tout ou rien. Soit l’intégralité des opérations réussit, soit la base est restaurée dans son état initial sans effet de bord en cas d’erreur.</li>',
        '      <li><strong>Cohérence (Consistency) :</strong> La transaction fait passer la base d’un état intègre à un autre état intègre en respectant toutes les contraintes (clés étrangères, NOT NULL, CHECK, triggers).</li>',
        '      <li><strong>Isolation :</strong> Les opérations intermédiaires d’une transaction en cours sont invisibles aux transactions concurrentes selon le niveau d’isolation choisi.</li>',
        '      <li><strong>Durabilité (Durability) :</strong> Une fois le COMMIT acquitté au client, les modifications sont définitivement pérennisées sur disque, survivant à toute panne matérielle ultérieure.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Le Principe du Write-Ahead Logging (WAL)</h4>',
        '    <p>Écrire directement chaque page de données modifiée (8 Ko) de manière synchrone sur disque serait prohibitif pour les performances (accès I/O aléatoires dispersés). Les moteurs modernes (PostgreSQL, InnoDB) appliquent le protocole <strong>ARIES / WAL</strong> :</p>',
        '    <ol>',
        '      <li>Les modifications sont enregistrées séquentiellement dans des fichiers de journaux circulaires <code>pg_wal</code> (fichiers de 16 Mo).</li>',
        '      <li><strong>Règle d’or du WAL :</strong> Aucun bloc de données en mémoire tampon (Buffer Pool) n’est écrit sur disque avant que l’enregistrement WAL correspondant n’ait été synchronisé par un <code>fsync()</code>.</li>',
        '      <li>Lors d’un crash, le moteur exécute une passe <em>REDO</em> (rejoue les commits) puis une passe <em>UNDO</em> (annule les transactions inachevées).</li>',
        '    </ol>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Niveaux d’Isolation ANSI SQL & Anomalies de Concurrence',
      html: [
        '<p>Pour concilier intégrité stricte et parallélisme élevé, le standard ANSI SQL définit quatre niveaux d’isolation hiérarchiques caractérisés par les anomalies qu’ils autorisent ou préviennent :</p>',
        '<div class="grid grid-3">',
        '  <div class="card">',
        '    <h4>Lecture Sale (Dirty Read)</h4>',
        '    <p>La transaction T2 lit des données modifiées par T1 qui n’ont <strong>pas encore été validées</strong> par un COMMIT. Si T1 effectue ensuite un ROLLBACK, T2 aura basé ses calculs sur des données fantaisistes.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Lecture Non Répétable (Non-Repeatable Read)</h4>',
        '    <p>La transaction T1 lit une ligne, puis T2 modifie ou supprime cette ligne et valide. Lorsque T1 relit la même ligne au sein de la même transaction, <strong>les valeurs ont changé</strong>.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Lecture Fantôme (Phantom Read)</h4>',
        '    <p>La transaction T1 exécute une requête à plage (ex: <code>WHERE solde &gt; 1000</code>). T2 insère une nouvelle ligne répondant à ce critère et valide. Lorsque T1 réexécute sa requête, <strong>de nouvelles lignes apparaissent</strong>.</p>',
        '  </div>',
        '</div>',
        box('standard', 'Matrice Officielle de Conformité ANSI SQL', [
          '<table class="table">',
          '  <thead><tr><th>Niveau d’Isolation</th><th>Dirty Read</th><th>Non-Repeatable Read</th><th>Phantom Read</th></tr></thead>',
          '  <tbody>',
          '    <tr><td><strong>READ UNCOMMITTED</strong></td><td>Autorisé</td><td>Autorisé</td><td>Autorisé</td></tr>',
          '    <tr><td><strong>READ COMMITTED</strong> (Défaut PostgreSQL/Oracle)</td><td>Empêché</td><td>Autorisé</td><td>Autorisé</td></tr>',
          '    <tr><td><strong>REPEATABLE READ</strong> (Défaut MySQL InnoDB)</td><td>Empêché</td><td>Empêché</td><td>Autorisé (ANSI) / Empêché (PostgreSQL MVCC)</td></tr>',
          '    <tr><td><strong>SERIALIZABLE</strong></td><td>Empêché</td><td>Empêché</td><td>Empêché (Équivalence séquentielle stricte)</td></tr>',
          '  </tbody>',
          '</table>'
        ])
      ].join('\n')
    },
    {
      title: 'Verrouillage 2PL, Détection d’Interblocages (Deadlocks) & MVCC',
      html: [
        '<p>Pour arbitrer les accès concurrents, les SGBD exploitent le protocole de verrouillage à deux phases (Two-Phase Locking - 2PL) combiné au contrôle de concurrence multiversion (MVCC) :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Matrice des Verrous Partagés (S) &amp; Exclusifs (X)</h4>',
        '    <p>Les verrous protègent les données contre les écritures conflictuelles :</p>',
        '    <ul>',
        '      <li><strong>Verrou Partagé (S - Shared) :</strong> Posé par une lecture explicite (<code>SELECT ... FOR SHARE</code>). Plusieurs transactions peuvent détenir un verrou S simultanément sur la même ressource.</li>',
        '      <li><strong>Verrou Exclusif (X - Exclusive) :</strong> Posé par toute écriture (<code>UPDATE</code>, <code>DELETE</code>, <code>SELECT ... FOR UPDATE</code>). Incompatible avec tout autre verrou (S ou X).</li>',
        '      <li><strong>Protocole 2PL Strict :</strong> Tous les verrous acquis au cours d’une transaction sont conservés jusqu’à la fin définitive (COMMIT ou ROLLBACK) pour garantir la recouvrabilité.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Interblocages (Deadlocks) &amp; Graphe d\'Attente (Wait-For Graph)</h4>',
        '    <p>Un interblocage survient lorsque deux transactions ou plus se bloquent mutuellement (ex: T1 détient ressource A et attend ressource B détenue par T2, qui attend ressource A) :</p>',
        '    <ul>',
        '      <li>Le SGBD maintient un graphe orienté <strong>Wait-For Graph</strong> où chaque arc représente une attente.</li>',
        '      <li>Un démon en tâche de fond (<code>deadlock_timeout</code>, par défaut 1 seconde dans PostgreSQL) recherche les <strong>cycles orientés</strong> dans ce graphe.</li>',
        '      <li>Dès qu’un cycle est détecté, le moteur sélectionne une transaction victime (généralement la plus récente) et l’annule par un <code>ROLLBACK</code> avec code d’erreur <code>40P01</code>.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],
  method: [
    'Étape 1 : Analyser la criticité métier des flux pour choisir le niveau d’isolation minimal requis (Read Committed par défaut, Serializable pour la facturation).',
    'Étape 2 : Encadrer systématiquement les modifications multi-tables dans un bloc transactionnel explicite BEGIN ... COMMIT.',
    'Étape 3 : Poser des verrous pessimistes explicites (SELECT ... FOR UPDATE) lors des calculs conditionnels de stock ou de débit bancaire.',
    'Étape 4 : Ordonner les acquisitions de verrous dans le même ordre sur toutes les procédures applicatives pour prévenir les deadlocks.',
    'Étape 5 : Configurer le paramètre deadlock_timeout (ex: 1000ms) et surveiller les métriques de conflits via pg_stat_database.',
    'Étape 6 : Prévoir dans la couche applicative une stratégie de réessai automatique (Retry with Exponential Backoff) sur code d’erreur 40P01 / 40001.'
  ],
  summary: [
    'Les propriétés ACID garantissent l’atomicité, la cohérence, l’isolation et la durabilité des opérations sur la base.',
    'Le Write-Ahead Logging (WAL) sécurise les modifications de données de manière séquentielle avant toute écriture sur les tables.',
    'Les 4 niveaux d’isolation ANSI définissent les seuils de tolérance aux lectures sales, lectures non répétables et lectures fantômes.',
    'PostgreSQL combine l’isolation avec le mécanisme MVCC où les lectures ne bloquent jamais les écritures.',
    'Les verrous partagés (S) sont compatibles entre eux mais incompatibles avec les verrous exclusifs (X).',
    'Le moteur résout les interblocages (deadlocks) en détectant les cycles dans le graphe d’attente et en avortant une transaction victime.'
  ],
  checklist: [
    'Je sais expliciter les quatre garanties ACID et leur rôle dans la fiabilité des données.',
    'Je comprends pourquoi le mécanisme WAL permet une reprise après sinistre (Crash Recovery) sans perte de commit.',
    'Je maîtrise la matrice ANSI des anomalies de concurrence (Dirty Read, Non-Repeatable Read, Phantom Read).',
    'Je connais la compatibilité croisée entre les verrous S (Shared) et X (Exclusive).',
    'Je sais comment le SGBD détecte un cycle d’interblocage via le graphe Wait-For Graph.',
    'Je sais expliquer pourquoi PostgreSQL en niveau Read Committed n’autorise aucune lecture sale.'
  ],
  notions: [
    'Propriétés ACID Fondamentales',
    'Write-Ahead Logging (WAL) & ARIES',
    'Anomalies de Concurrence ANSI',
    '4 Niveaux d’Isolation (Read Committed, Serializable)',
    'Contrôle de Concurrence Multiversion (MVCC)',
    'Verrouillage à Deux Phases (2PL) S & X',
    'Graphe d’Attente (Wait-For Graph)',
    'Détection et Résolution de Deadlocks'
  ],
  pitfalls: [
    'Configurer le niveau d’isolation SERIALIZABLE sans implémenter de logique de retry applicatif en cas d’erreur de sérialisation 40001.',
    'Garder des transactions ouvertes inutilement longtemps (ex: attendre un appel API réseau externe dans une transaction), provoquant l’accumulation de deadlocks.',
    'Acquérir des verrous exclusifs dans des ordres différents selon les requêtes (ex: T1 verrouille A puis B, T2 verrouille B puis A), causant des deadlocks systématiques.',
    'Confondre un verrou logique au niveau ligne avec un verrou de table complet bloquant l’ensemble des utilisateurs.'
  ],
  questions: [
    {
      stem: 'Quel principe fondamental régit le mécanisme de Write-Ahead Logging (WAL) dans un moteur SGBD relationnel ?',
      opts: [
        'Écrire les données sur bande magnétique avant le disque dur',
        'Enregistrer et synchroniser toute modification dans le journal séquentiel avant d’écrire les pages de données sur disque',
        'Supprimer les tables temporaires toutes les 10 minutes',
        'Chiffrer les requêtes SQL avec une clé symétrique'
      ],
      correct: 1,
      exp: 'La règle d’or du WAL garantit qu’aucun bloc de données de table n’est écrit sur disque avant que l’enregistrement de journal WAL associé n’ait été persisté.'
    },
    {
      stem: 'Quelle anomalie de concurrence se produit lorsqu’une transaction lit des modifications effectuées par une autre transaction qui n’a pas encore commité ?',
      opts: [
        'Phantom Read (Lecture Fantôme)',
        'Dirty Read (Lecture Sale)',
        'Non-Repeatable Read (Lecture Non Répétable)',
        'Serialization Failure'
      ],
      correct: 1,
      exp: 'Le Dirty Read désigne la lecture de données non validées susceptibles d’être annulées par un ROLLBACK ultérieur.'
    },
    {
      stem: 'Quel est le niveau d’isolation par défaut de PostgreSQL pour chaque nouvelle session transactionnelle ?',
      opts: [
        'READ UNCOMMITTED',
        'READ COMMITTED',
        'REPEATABLE READ',
        'SERIALIZABLE'
      ],
      correct: 1,
      exp: 'PostgreSQL utilise par défaut READ COMMITTED, empêchant toute lecture sale grâce à des instantanés (snapshots) de requêtes.'
    },
    {
      stem: 'Dans la matrice de compatibilité des verrous 2PL, quelle affirmation est rigoureusement exacte ?',
      opts: [
        'Un verrou exclusif (X) est compatible avec un verrou partagé (S)',
        'Plusieurs transactions peuvent détenir simultanément un verrou partagé (S) sur la même ressource',
        'Deux verrous exclusifs (X) peuvent coexister sur la même ligne',
        'Un verrou partagé empêche toute autre lecture'
      ],
      correct: 1,
      exp: 'Les verrous partagés (S) sont conçus pour les lectures concurrentes : ils sont compatibles entre eux, mais bloquent toute demande de verrou exclusif (X).'
    },
    {
      stem: 'Comment le moteur de base de données modélise-t-il les blocages mutuels pour détecter un interblocage (Deadlock) ?',
      opts: [
        'Sous la forme d’un arbre binaire de recherche',
        'Sous la forme d’un graphe orienté d’attente (Wait-For Graph) où les cycles représentent les interblocages',
        'Par un comptage de mémoire RAM consommée',
        'Par une file d’attente FIFO sans priorité'
      ],
      correct: 1,
      exp: 'Le Wait-For Graph relie les transactions en attente de ressources. Un cycle orienté (ex: T1 attend T2 qui attend T1) signe un deadlock irréversible.'
    },
    {
      stem: 'Quel niveau d’isolation ANSI SQL garantit l’absence totale de toute anomalie de concurrence au prix d’échecs de sérialisation possibles ?',
      opts: [
        'READ UNCOMMITTED',
        'READ COMMITTED',
        'REPEATABLE READ',
        'SERIALIZABLE'
      ],
      correct: 3,
      exp: 'Le niveau SERIALIZABLE émule une exécution séquentielle stricte des transactions sans aucune anomalie de concurrence.'
    },
    {
      stem: 'Quelle instruction SQL permet d’acquérir un verrou exclusif pessimiste sur des lignes sélectionnées dès la lecture ?',
      opts: [
        'SELECT ... LOCK ALL',
        'SELECT ... FOR UPDATE',
        'SELECT ... WITH NO WAIT',
        'SELECT ... ISOLATE'
      ],
      correct: 1,
      exp: 'La clause FOR UPDATE verrouille les lignes lues en mode exclusif (X), empêchant toute autre transaction de les modifier ou de poser un verrou concurrent.'
    },
    {
      stem: 'Que signifie l’acronyme MVCC dans les moteurs transactionnels comme PostgreSQL ?',
      opts: [
        'Maximum Virtual Core Control',
        'Multi-Version Concurrency Control (Contrôle de Concurrence Multiversion)',
        'Master Volume Cache Check',
        'Minimal Value Commit Clause'
      ],
      correct: 1,
      exp: 'MVCC maintient plusieurs versions physiques d’un même enregistrement, permettant aux lectures de consulter des instantanés passés sans jamais bloquer les écritures.'
    }
  ],
  flashcards: [
      { q: 'Qu’est-ce que « Propriétés ACID Fondamentales » ?', a: 'Propriétés ACID Fondamentales' },
      { q: 'Qu’est-ce que « Write-Ahead Logging (WAL) & ARIES » ?', a: 'Write-Ahead Logging (WAL) & ARIES' },
      { q: 'Qu’est-ce que « Anomalies de Concurrence ANSI » ?', a: 'Anomalies de Concurrence ANSI' },
      { q: 'Qu’est-ce que « 4 Niveaux d’Isolation (Read Committed, Serializable) » ?', a: '4 Niveaux d’Isolation (Read Committed, Serializable)' },
      { q: 'Qu’est-ce que « Contrôle de Concurrence Multiversion (MVCC) » ?', a: 'Pour arbitrer les accès concurrents, les SGBD exploitent le protocole de verrouillage à deux phases (Two-Phase Locking - 2PL) combiné au contrôle de concurrence multiversion (MVCC) :' },
      { q: 'Qu’est-ce que « Graphe d’Attente (Wait-For Graph) » ?', a: 'Graphe d’Attente (Wait-For Graph)' },
      { q: 'Qu’est-ce que « Détection et Résolution de Deadlocks » ?', a: 'Détection et Résolution de Deadlocks' },
      { q: 'Qu’est-ce que « Pages Disques de 8 Ko & PageHeaderData » ?', a: 'Pages Disques de 8 Ko & PageHeaderData' },
      { q: 'Qu’est-ce que « Arbre Équilibré B-Tree & Fan-Out » ?', a: 'Arbre Équilibré B-Tree & Fan-Out' },
      { q: 'Qu’est-ce que « Index Hash & Accès O(1) » ?', a: 'Index Hash & Accès O(1) : Sur une base de données de production atteignant des centaines de gigaoctets ou des téraoctets, exécuter un balayage séquentiel complet (Sequential Scan) pour retrouver quelques enregistrements parmi 50 millions de lignes immobilise le disque, sature le buffer pool et génère des ' },
      { q: 'Qu’est-ce que « Generalized Inverted Index (GIN) pour JSONB » ?', a: 'Generalized Inverted Index (GIN) pour JSONB' },
      { q: 'Qu’est-ce que « Index Couvrants & Clause INCLUDE » ?', a: 'Les index couvrants (clause INCLUDE) permettent au moteur de satisfaire la requête par un Index Only Scan sans toucher la table.' },
      { q: 'Qu’est-ce que « Index Partiels (Partial Indexes) » ?', a: 'concevoir des index partiels (Partial Indexes) et des index couvrants (Covering Indexes avec INCLUDE) ;' },
      { q: 'Qu’est-ce que « Maintenance Reindex Concurrently » ?', a: 'Maintenance Reindex Concurrently' },
      { q: 'Qu’est-ce que « Commande EXPLAIN (ANALYZE, BUFFERS) » ?', a: 'Commande EXPLAIN (ANALYZE, BUFFERS) : Lorsqu’une requête SQL met 12 secondes à s’exécuter en production au lieu des 50 millisecondes attendues, tenter de deviner intuitivement ce qui se passe conduit souvent à de fausses pistes ou à l’ajout hasardeux d’index inutiles. Dans un SGBDR comme PostgreSQL, l’optimiseur de r' },
      { q: 'Qu’est-ce que « Coût de Démarrage & Coût Total (Startup vs Total Cost) » ?', a: 'Coût de Démarrage & Coût Total (Startup vs Total Cost)' },
      { q: 'Qu’est-ce que « Nœuds d’Accès (Seq Scan, Index Scan, Bitmap Scan) » ?', a: 'Nœuds d’Accès (Seq Scan, Index Scan, Bitmap Scan)' },
      { q: 'Qu’est-ce que « Mémoire work_mem & Spill to Disk » ?', a: 'Mémoire work_mem & Spill to Disk' },
      { q: 'Qu’est-ce que « Statistiques du Catalogue pg_statistic & MCV » ?', a: 'Statistiques du Catalogue pg_statistic & MCV' },
      { q: 'Qu’est-ce que « Dérives de Cardinalité & Commande ANALYZE » ?', a: 'Dérives de Cardinalité & Commande ANALYZE' },
      { q: 'Qu’est-ce que « Clause OVER() » ?', a: 'Clause OVER() : maîtriser la clause analytique OVER avec ses sous-clauses PARTITION BY et ORDER BY ;' },
      { q: 'Qu’est-ce que « ROW_NUMBER(), RANK(), DENSE_RANK() » ?', a: 'ROW_NUMBER(), RANK(), DENSE_RANK()' },
      { q: 'Qu’est-ce que « LAG() & LEAD() » ?', a: '1. Identifier si le problème nécessite une fonction de classement (ROW_NUMBER/RANK), une navigation séquentielle (LAG/LEAD) ou une hiérarchie (WITH RECURSIVE).' },
      { q: 'Qu’est-ce que « Cadres de fenêtre ROWS vs RANGE BETWEEN » ?', a: 'Cadres de fenêtre ROWS vs RANGE BETWEEN' },
      { q: 'Qu’est-ce que « Moyennes glissantes (Moving Averages) » ?', a: 'Moyennes glissantes (Moving Averages)' },
      { q: 'Qu’est-ce que « Common Table Expression récursive (WITH RECURSIVE) » ?', a: 'Common Table Expression récursive (WITH RECURSIVE)' },
      { q: 'Qu’est-ce que « Détection et rupture de cycles hiérarchiques » ?', a: 'Détection et rupture de cycles hiérarchiques' },
      { q: 'Qu’est-ce que « Langage PL/pgSQL (DECLARE, BEGIN, EXCEPTION) » ?', a: 'Langage PL/pgSQL (DECLARE, BEGIN, EXCEPTION)' },
      { q: 'Qu’est-ce que « Déclencheurs (Triggers) BEFORE vs AFTER » ?', a: 'Déclencheurs (Triggers) BEFORE vs AFTER' },
      { q: 'Qu’est-ce que « Pseudo-enregistrements NEW & OLD » ?', a: 'Pseudo-enregistrements NEW & OLD' },
      { q: 'Qu’est-ce que « Opération TG_OP & variable TG_TABLE_NAME » ?', a: 'Opération TG_OP & variable TG_TABLE_NAME' },
      { q: 'Qu’est-ce que « Tables d’audit immuables (Audit Logging) » ?', a: 'Tables d’audit immuables (Audit Logging)' },
      { q: 'Qu’est-ce que « Row-Level Security (RLS) & ALTER TABLE ... ENABLE RLS » ?', a: 'Row-Level Security (RLS) & ALTER TABLE ... ENABLE RLS' },
      { q: 'Qu’est-ce que « Politiques de sécurité (CREATE POLICY ... USING / WITH CHECK) » ?', a: 'Politiques de sécurité (CREATE POLICY ... USING / WITH CHECK)' },
      { q: 'Qu’est-ce que « Prévention des injections SQL & requêtes paramétrées (USING) » ?', a: 'Prévention des injections SQL & requêtes paramétrées (USING)' },
      { q: 'Qu’est-ce que « Élagage de partitions (Partition Pruning) » ?', a: 'comprendre et activer l’élagage de partitions (Partition Pruning) au niveau de l’optimiseur CBO et au runtime ;' },
      { q: 'Qu’est-ce que « Partition par défaut (DEFAULT) » ?', a: 'Partition par défaut (DEFAULT)' },
      { q: 'Qu’est-ce que « Write-Ahead Logging (WAL) & Segments WAL » ?', a: 'Write-Ahead Logging (WAL) & Segments WAL' },
      { q: 'Qu’est-ce que « Checkpoints & Dirty Buffers » ?', a: 'Checkpoints & Dirty Buffers' },
      { q: 'Qu’est-ce que « Streaming Replication synchrone vs asynchrone » ?', a: 'Streaming Replication synchrone vs asynchrone' },
      { q: 'Qu’est-ce que « Log Sequence Number (LSN) & pg_wal_lsn_diff() » ?', a: 'Log Sequence Number (LSN) & pg_wal_lsn_diff()' },
      { q: 'Qu’est-ce que « Haute Disponibilité (Patroni, repmgr, failover automatique) » ?', a: 'Haute Disponibilité (Patroni, repmgr, failover automatique)' },
    {
      q: 'Que garantit la propriété d’Atomicité (A) dans ACID ?',
      a: 'Que toutes les opérations de la transaction sont menées à terme, ou qu’aucune ne persiste en cas d’échec (tout ou rien).'
    },
    {
      q: 'Quel est l’impératif fondamental du Write-Ahead Logging (WAL) ?',
      a: 'Inscrire et synchroniser les modifications dans le journal WAL sur disque avant de modifier les pages de table correspondantes.'
    },
    {
      q: 'Qu’est-ce qu’une lecture non répétable (Non-Repeatable Read) ?',
      a: 'L’anomalie où une transaction relisant la même ligne constate que des colonnes ont été modifiées par une transaction tierce validée entre-temps.'
    },
    {
      q: 'Sous quel niveau d’isolation ANSI SQL la lecture sale (Dirty Read) est-elle autorisée ?',
      a: 'Uniquement sous READ UNCOMMITTED.'
    },
    {
      q: 'Quelle est la compatibilité entre un verrou partagé (S) et un verrou exclusif (X) ?',
      a: 'Ils sont totalement incompatibles : une demande X est mise en attente tant qu’un verrou S ou X existe sur la ressource.'
    },
    {
      q: 'Comment le SGBD résout-il un interblocage (Deadlock) détecté ?',
      a: 'En détectant un cycle dans le Wait-For Graph et en annulant (ROLLBACK) une transaction victime pour débloquer les autres.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Difficultés à distinguer les propriétés ACID ou confusion entre lecture sale et lecture fantôme.'
    },
    {
      cls: 'medium',
      text: 'Bonne compréhension des niveaux d’isolation ANSI, de la compatibilité des verrous S/X et du mécanisme WAL.'
    },
    {
      cls: 'high',
      text: 'Maîtrise complète de la concurrence MVCC, détection fine de deadlocks, verrouillage pessimiste fin et stratégies de retry haute résilience.'
    }
  ]
};
