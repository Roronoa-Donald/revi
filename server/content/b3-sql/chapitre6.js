/**
 * Chapitre 6 du cours « SQL Avancé B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 6,
  title: 'Partitionnement Déclaratif, Réplication WAL &amp; Haute Disponibilité (HA)',
  short: 'Partitionnement &amp; Réplication WAL',
  toc: 'Partitionnement déclaratif horizontal (Range, List, Hash), routage automatique des tuples, élagage de partitions (Partition Pruning statique et à l’exécution), architecture Write-Ahead Logging (WAL) et checkpoints, réplication physique en streaming synchrone et asynchrone, calcul de retard de réplication (LSN lag), et basculement haute disponibilité (Failover Patroni / repmgr).',
  time: '≈ 3 h 00 de travail',
  free: false,
  situation: 'Lorsqu’une table de base de données dépasse plusieurs dizaines ou centaines de millions de lignes et plusieurs téraoctets de données, les opérations d’indexation, de maintenance VACUUM et les scans séquentiels deviennent prohibitivement lents. En parallèle, les exigences de production imposent une disponibilité continue (99.99 %) et une tolérance totale aux pannes matérielles. Pour relever ce défi, PostgreSQL combine le partitionnement horizontal déclaratif — permettant de découper une table mère logique en partitions physiques autonomes et d’ignorer les segments non pertinents grâce au Partition Pruning — et le mécanisme de réplication physique en streaming basé sur le journal des transactions WAL (Write-Ahead Log). L’ingénieur de données doit maîtriser les stratégies de partitionnement (Range, List, Hash), le monitoring précis du lag LSN entre primaire et standby, et les compromis de consistance ACID en réplication synchrone versus asynchrone.',
  objectives: [
    'concevoir une architecture de partitionnement déclaratif horizontal (RANGE, LIST, HASH) avec table mère et sous-partitions ;',
    'comprendre et activer l’élagage de partitions (Partition Pruning) au niveau de l’optimiseur CBO et au runtime ;',
    'analyser la mécanique interne du journal des transactions WAL (Write-Ahead Logging) et le rôle des Checkpoints ;',
    'différencier la réplication physique en streaming asynchrone (performance) et synchrone (zéro perte RPO=0) ;',
    'calculer et auditer le retard de réplication (Replication Lag) à partir des Log Sequence Numbers (LSN en base 16) ;',
    'développer en Python 3 des routeurs de partitionnement, des optimiseurs de pruning et des calculateurs de décalage WAL LSN.'
  ],
  sections: [
    {
      title: 'Partitionnement Déclaratif Horizontal & Partition Pruning',
      html: [
        '<p>Depuis PostgreSQL 10+, le partitionnement déclaratif permet de diviser une table volumineuse en fragments physiques distincts tout en conservant une interface relationnelle unifiée pour les requêtes applicatives :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Les Trois Stratégies de Partitionnement</h4>',
        '    <ul>',
        '      <li><strong>RANGE (Intervalles) :</strong> Découpage par plages de valeurs continues (ex: par mois ou par an pour des données temporelles horodatées).</li>',
        '      <li><strong>LIST (Listes discrètes) :</strong> Découpage selon des valeurs discrètes explicites (ex: par pays ou par code devise).</li>',
        '      <li><strong>HASH (Hachage distribué) :</strong> Répartition pseudo-aléatoire et équilibrée à travers <code>N</code> compartiments selon une clé de hachage.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Syntaxe Déclarative Canonique</h4>',
        '    <pre><code>-- 1. Table mère partitionnée',
        'CREATE TABLE mesures_capteurs (',
        '    id BIGSERIAL,',
        '    date_mesure TIMESTAMPTZ NOT NULL,',
        '    valeur DOUBLE PRECISION',
        ') PARTITION BY RANGE (date_mesure);',
        '',
        '-- 2. Partitions filles physiques',
        'CREATE TABLE mesures_2024_01 PARTITION OF mesures_capteurs',
        '    FOR VALUES FROM (\'2024-01-01\') TO (\'2024-02-01\');',
        'CREATE TABLE mesures_2024_02 PARTITION OF mesures_capteurs',
        '    FOR VALUES FROM (\'2024-02-01\') TO (\'2024-03-01\');',
        'CREATE TABLE mesures_defaut PARTITION OF mesures_capteurs DEFAULT;</code></pre>',
        '  </div>',
        '</div>',
        '<div class="card">',
        '  <h4>Le Graal de la Performance : Le Partition Pruning</h4>',
        '  <p>Lorsqu’une requête SQL contient une clause <code>WHERE</code> filtrant sur la clé de partitionnement (ex: <code>WHERE date_mesure >= \'2024-02-01\' AND date_mesure &lt; \'2024-02-15\'</code>), le moteur PostgreSQL active le <strong>Partition Pruning</strong>. L’optimiseur élimine immédiatement toutes les partitions non concernées dès la compilation du plan, sans jamais lire leurs index ni leurs blocs sur disque. Cela divise le temps d’I/O par le nombre de partitions ignorées !</p>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Architecture Write-Ahead Logging (WAL) & Checkpoints',
      html: [
        '<p>Pour garantir la durabilité (le D de ACID) tout en maximisant le débit d’écriture, PostgreSQL utilise le principe fondamental du <strong>Write-Ahead Logging (WAL)</strong> :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Le Principe Fondamental du WAL</h4>',
        '    <ol>',
        '      <li>Toute modification physique d’un tuple est d’abord consignée séquentiellement dans le journal WAL avant d’être répercutée dans les pages de données du buffer pool.</li>',
        '      <li>L’écriture dans le WAL est strictement séquentielle (débit disque maximal, append-only).</li>',
        '      <li>Lors d’un <code>COMMIT</code>, seul le segment WAL nécessaire est synchronisé sur disque (<code>fsync</code>). Les blocs de données de table restent temporairement en mémoire (pages dites « sales » ou <em>dirty buffers</em>).</li>',
        '    </ol>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Checkpoints & Reprise sur Panne (Crash Recovery)</h4>',
        '    <p>À intervalles réguliers (déclenchés par <code>checkpoint_timeout</code> ou <code>max_wal_size</code>), le processus d’arrière-plan <em>Checkpointer</em> synchronise l’intégralité des blocs sales de la RAM vers les fichiers de table sur disque.</p>',
        '    <p>En cas de coupure de courant ou de crash serveur, le moteur redémarre au dernier <em>checkpoint</em> réussi et rejoue (<em>REDO log</em>) les enregistrements WAL postérieurs pour restaurer une consistance parfaite en quelques secondes.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Réplication en Streaming, Décalage LSN & Haute Disponibilité',
      html: [
        '<p>La <strong>Streaming Replication</strong> physique permet de maintenir une ou plusieurs répliques miroirs (nœuds <em>Standby</em>) en transférant en continu les segments WAL émis par le nœud primaire :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Réplication Asynchrone vs Synchrone</h4>',
        '    <ul>',
        '      <li><strong>Asynchrone :</strong> Le primaire valide le commit dès que le WAL local est écrit. Débit maximal, mais risque de perte de données en cas de crash brutal du primaire (RPO &gt; 0).</li>',
        '      <li><strong>Synchrone :</strong> Le primaire attend la confirmation qu’au moins une réplique standby a reçu et écrit le WAL (<code>synchronous_commit = on</code>). Zéro perte de données (RPO = 0), mais latence réseau accrue sur chaque commit.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Log Sequence Number (LSN) & Lag de Réplication</h4>',
        '    <p>Chaque position dans le flux WAL est identifiée de manière unique par un entier 64-bit représenté en hexadécimal, le <strong>LSN</strong> (ex: <code>0/16B3800</code>). Deux métriques clés mesurent la santé du cluster :</p>',
        '    <ul>',
        '      <li><strong>Lag d’écriture (Write Lag) :</strong> <code>pg_wal_lsn_diff(pg_current_wal_lsn(), write_lsn)</code> (en octets).</li>',
        '      <li><strong>Lag d’application (Replay Lag) :</strong> <code>pg_wal_lsn_diff(pg_current_wal_lsn(), replay_lsn)</code> mesurant les données reçues mais pas encore rejouées par la standby.</li>',
        '    </ul>',
        '  </div>',
        '</div>',
        box('tip', '<strong>Orchestration Haute Disponibilité :</strong> En production, la gestion automatique du basculement (Failover) et de l’élection d’un nouveau primaire est déléguée à des orchestrateurs spécialisés comme <strong>Patroni</strong> (utilisant un consensus distribué Raft/Etcd) ou <strong>repmgr</strong>, garantissant une reprise de service sous 10 à 30 secondes.')
      ].join('\n')
    }
  ],
  method: [
    '1. Évaluer la volumétrie prévisionnelle : envisager le partitionnement dès qu’une table dépasse 20 à 50 millions de lignes.',
    '2. Déterminer la clé de partitionnement : date chronologique pour RANGE, dimension géographique ou statut pour LIST.',
    '3. Créer systématiquement une partition DEFAULT pour intercepter et alerter sur les valeurs hors bornes.',
    '4. Vérifier avec EXPLAIN que le Partition Pruning élimine bien les partitions physiques sur les requêtes types.',
    '5. Configurer la réplication en streaming avec des Replication Slots pour éviter la suppression prématurée des segments WAL.',
    '6. Monitorer en continu le décalage LSN (replication lag) via pg_stat_replication et déclencher des alertes au-delà d’un seuil critique.'
  ],
  summary: [
    'Le partitionnement déclaratif découpe physiquement une table logique en fragments autonomes sans altérer le code SQL.',
    'Le Partition Pruning permet à l’optimiseur d’ignorer totalement la lecture des partitions dont les bornes ne satisfont pas la clause WHERE.',
    'Le Write-Ahead Log (WAL) garantit la durabilité ACID et la vitesse d’écriture en journalisant séquentiellement chaque mutation.',
    'Les Checkpoints vident régulièrement les pages modifiées de la mémoire vers le stockage de données définitif.',
    'La réplication physique transmet le flux WAL du primaire vers les standbys en mode asynchrone ou synchrone.',
    'Le lag de réplication se mesure par la différence numérique entre le LSN courant du primaire et le LSN rejoué par la standby.'
  ],
  checklist: [
    'La table volumineuse est-elle partitionnée par RANGE (temporel) ou LIST (catégoriel) selon son profil d’accès ?',
    'La partition DEFAULT est-elle déclarée pour éviter les erreurs d’insertion de clés inattendues ?',
    'Le plan d’exécution EXPLAIN confirme-t-il l’activité de Partition Pruning sur les requêtes filtrées ?',
    'Le paramètre max_wal_size et checkpoint_timeout sont-ils ajustés pour lisser les I/O du serveur ?',
    'Les répliques standby utilisent-elles un physical replication slot pour sécuriser la rétention des WAL ?',
    'Le décalage LSN en octets et le replay lag en secondes font-ils l’objet d’un monitoring Prometheus/Grafana dédié ?'
  ],
  notions: [
    'Partitionnement déclaratif (PARTITION BY RANGE, LIST, HASH)',
    'Élagage de partitions (Partition Pruning)',
    'Partition par défaut (DEFAULT)',
    'Write-Ahead Logging (WAL) & Segments WAL',
    'Checkpoints & Dirty Buffers',
    'Streaming Replication synchrone vs asynchrone',
    'Log Sequence Number (LSN) & pg_wal_lsn_diff()',
    'Haute Disponibilité (Patroni, repmgr, failover automatique)'
  ],
  pitfalls: [
    'Oublier de créer les partitions futures sur une table partitionnée par RANGE, provoquant l’échec des insertions au changement de mois.',
    'Filtrer avec une fonction non-immutable dans le WHERE, ce qui empêche le Partition Pruning à la compilation.',
    'Ne pas surveiller l’espace disque du WAL en présence d’un replication slot inactif, menant à la saturation complète du disque primaire.',
    'Confondre le lag de réception WAL (write_lsn) et le lag d’application des données (replay_lsn) sur la standby.'
  ],
  questions: [
    {
      stem: 'Quelle stratégie de partitionnement convient le mieux à une table de transactions bancaires conservant 10 ans d’historique ?',
      opts: [
        'PARTITION BY HASH sur le montant',
        'PARTITION BY RANGE sur la date de transaction (ex: mensuel)',
        'PARTITION BY LIST sur le nom du client',
        'Aucun partitionnement n’est possible sur des dates'
      ],
      correct: 1,
      exp: 'Le partitionnement par intervalle (RANGE) sur la date permet un élagage massif sur les requêtes temporelles et un archivage facile des vieux mois.'
    },
    {
      stem: 'Qu’est-ce que le Partition Pruning dans PostgreSQL ?',
      opts: [
        'La suppression définitive des anciennes partitions sur disque',
        'La capacité de l’optimiseur à exclure les partitions physiques hors périmètre lors de l’exécution d’une requête',
        'Le compactage des blocs mémoire dans le buffer pool',
        'La défragmentation automatique des index B-Tree'
      ],
      correct: 1,
      exp: 'Le Partition Pruning ignore les partitions dont les contraintes contredisent les critères de la clause WHERE de la requête.'
    },
    {
      stem: 'Pourquoi PostgreSQL écrit-il dans le WAL avant d’écrire dans les pages de table sur disque ?',
      opts: [
        'Parce que le WAL compresse les données',
        'Pour assurer la durabilité ACID grâce à des écritures séquentielles rapides, tout en différant les écritures aléatoires sur les tables',
        'Parce que les tables n’existent pas sur disque',
        'Pour chiffrer les données à la volée'
      ],
      correct: 1,
      exp: 'Le WAL garantit la persistance immédiate par écriture séquentielle append-only, permettant de repousser les écritures aléatoires au Checkpoint.'
    },
    {
      stem: 'Que se passe-t-il lors d’un Checkpoint dans PostgreSQL ?',
      opts: [
        'Toutes les connexions clientes sont déconnectées',
        'Les pages modifiées en mémoire (dirty buffers) sont écrites sur disque et synchronisées par fsync',
        'La base de données est basculée en lecture seule',
        'Toutes les tables sont vidées'
      ],
      correct: 1,
      exp: 'Le Checkpoint synchronise toutes les données modifiées en RAM avec les fichiers disque, bornant la durée de récupération en cas de crash.'
    },
    {
      stem: 'Quelle fonction PostgreSQL permet de calculer l’écart en octets entre deux Log Sequence Numbers (LSN) ?',
      opts: [
        'pg_wal_lsn_diff(lsn1, lsn2)',
        'pg_calculate_bytes(lsn1, lsn2)',
        'DIFF_LSN(lsn1, lsn2)',
        'SUBTRACT_WAL(lsn1, lsn2)'
      ],
      correct: 0,
      exp: 'pg_wal_lsn_diff() calcule la différence numérique exacte en octets entre deux positions LSN fournies au format hexadécimal.'
    },
    {
      stem: 'En réplication en streaming synchrone (synchronous_commit = on), quand le primaire valide-t-il un COMMIT ?',
      opts: [
        'Immédiatement après le calcul en RAM',
        'Après confirmation qu’au moins une réplique standby configurée a écrit le WAL sur son propre stockage',
        'Exactement 5 minutes après la requête',
        'Une fois par heure lors du checkpoint'
      ],
      correct: 1,
      exp: 'Le mode synchrone garantit un RPO de 0 en attendant l’acquittement physique de la réplique avant de confirmer la transaction au client.'
    },
    {
      stem: 'Quel risque majeur présente un physical replication slot laissé actif alors que le serveur standby associé est éteint ?',
      opts: [
        'Le serveur primaire redémarre en boucle',
        'Le primaire conserve tous les fichiers WAL sans jamais les recycler, provoquant une saturation critique du disque',
        'Les données de la table deviennent corrompues',
        'Les requêtes SELECT sont refusées'
      ],
      correct: 1,
      exp: 'Un replication slot orphelin empêche le primaire de nettoyer ses WAL, saturant l’espace disque jusqu’au blocage total de la base.'
    },
    {
      stem: 'Quel outil open source de haute disponibilité utilise un magasin de consensus distribué (comme Etcd) pour orchestrer le basculement automatique ?',
      opts: [
        'Patroni',
        'PgAdmin',
        'Cron',
        'Webpack'
      ],
      correct: 0,
      exp: 'Patroni est la solution de référence pour la haute disponibilité PostgreSQL, utilisant Etcd ou Consul pour le consensus et le failover sécurisé.'
    }
  ],
  flashcards: [
    {
      q: 'Quels sont les trois modes de partitionnement déclaratif dans PostgreSQL ?',
      a: 'RANGE (intervalles continus), LIST (valeurs discrètes explicites) et HASH (distribution par hachage).'
    },
    {
      q: 'Quel est le bénéfice principal du Partition Pruning ?',
      a: 'Éviter la lecture des partitions et index hors périmètre, réduisant drastiquement les I/O disque.'
    },
    {
      q: 'Que signifie l’acronyme WAL ?',
      a: 'Write-Ahead Logging : journalisation préalable séquentielle des transactions avant modification des tables.'
    },
    {
      q: 'Qu’est-ce qu’un LSN dans PostgreSQL ?',
      a: 'Un Log Sequence Number : entier 64-bit identifiant de façon unique une position physique dans le flux WAL.'
    },
    {
      q: 'Quelle est la différence entre réplication synchrone et asynchrone ?',
      a: 'Synchrone attend l’écriture sur la réplique (zéro perte, plus lent) ; asynchrone n’attend pas (rapide, risque de perte au crash).'
    },
    {
      q: 'Quel est le rôle d’un Replication Slot ?',
      a: 'Garantir que le primaire ne supprime aucun fichier WAL tant que la réplique ne les a pas consommés.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Difficultés à modéliser un partitionnement déclaratif ou confusion sur le fonctionnement du WAL.'
    },
    {
      cls: 'medium',
      text: 'Bonne maîtrise de la création de tables partitionnées, vérification du pruning et configuration de réplications basiques.'
    },
    {
      cls: 'high',
      text: 'Architecture de production résiliente : partitionnement multi-niveaux optimisé, monitoring fin du lag LSN et cluster HA orchestré.'
    }
  ]
};
