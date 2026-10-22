/**
 * Pages « examens » et « exercices » du cours « SQL Avancé B3 ».
 */
'use strict';

const { ic, crumb, box } = require('../../../../scripts/course-kit');
const { chnav, disclaimer } = require('./helpers');

/* ======================== Examens Blancs ======================== */

function examens(course) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Examens blancs' }
  ]);

  const body = [
    crumbs,
    '  <h1>Examens Blancs &amp; Épreuves Corrigées — SQL Avancé B3</h1>',
    '  <p class="lead">Deux épreuves d’évaluation complètes conformes aux exigences académiques et professionnelles de niveau Bachelor 3 en ingénierie des bases de données relationnelles, optimisation de requêtes et architecture de données haute scalabilité.</p>',
    '',
    '  <h2>Épreuve 1 : Contrôle Continu (CC) — Durée 1 h 30 (Barème sur 20 points)</h2>',
    box('standard', 'Sujet du Contrôle Continu — Transactions ACID, Indexation B-Tree &amp; Optimiseur CBO', [
      '<h4>Partie 1 : Transactions ACID, Journal WAL &amp; Niveaux d’Isolation (6 points)</h4>',
      '<ol>',
      '  <li>Détaillez les quatre propriétés ACID d’un système transactionnel. Expliquez comment le mécanisme de Write-Ahead Logging (WAL) garantit la Durabilité (D) et l’Atomicité (A) en cas de coupure de courant brutale du serveur de base de données. (3 pts)</li>',
      '  <li>Distinguez précisément les anomalies de concurrence : lecture sale (Dirty Read), lecture non répétable (Non-Repeatable Read) et lecture fantôme (Phantom Read). Pourquoi le niveau par défaut de PostgreSQL (Read Committed) suffit-il à la majorité des applications web sans bloquer les lectures concurrentes ? (3 pts)</li>',
      '</ol>',
      '<h4>Partie 2 : Structures Physiques d’Indexation B-Tree &amp; Maintenance (7 points)</h4>',
      '<ol>',
      '  <li>Décrivez la structure interne d’un index B-Tree sur disque (page racine, nœuds internes, pages feuilles). Pourquoi la profondeur d’un arbre B-Tree reste-t-elle généralement très faible (3 ou 4 niveaux) même pour des tables contenant plusieurs dizaines de millions de lignes ? (3 pts)</li>',
      '  <li>Qu’est-ce que le paramètre <code>fillfactor</code> sur un index B-Tree ? Dans quel scénario d’usage est-il pertinent de réduire le fillfactor à 80 % ou 70 % plutôt que de conserver la valeur par défaut de 90 % ? Quel est le risque associé à une valeur trop basse ? (4 pts)</li>',
      '</ol>',
      '<h4>Partie 3 : Interprétation d’un Plan d’Exécution EXPLAIN (7 points)</h4>',
      '<ol>',
      '  <li>Expliquez la différence entre un <code>Seq Scan</code>, un <code>Index Scan</code>, un <code>Bitmap Index Scan</code> et un <code>Index Only Scan</code>. Dans quel cas précis le moteur de PostgreSQL choisit-il un Bitmap Heap Scan plutôt qu’un Index Scan direct ? (4 pts)</li>',
      '  <li>Un développeur exécute <code>EXPLAIN ANALYZE</code> sur une requête et observe : <code>Seq Scan on commandes (cost=0.00..18450.00 rows=10 width=48) (actual time=0.045..124.321 rows=850000 loops=1)</code>. Identifiez l’anomalie majeure et détaillez la commande d’administration PostgreSQL requise pour corriger le plan. (3 pts)</li>',
      '</ol>'
    ].join('\n')),
    '',
    box('solution', 'Corrigé type &amp; Barème détaillé du Contrôle Continu', [
      '<h4>Corrigé Partie 1 (6 points)</h4>',
      '<ul>',
      '  <li><strong>Propriétés ACID et journal WAL (3 pts) :</strong> ' +
      '  <strong>A (Atomicité) :</strong> la transaction s\'exécute entièrement ou pas du tout (rollback). ' +
      '  <strong>C (Cohérence) :</strong> la base passe d\'un état valide à un autre en respectant toutes les contraintes d\'intégrité. ' +
      '  <strong>I (Isolation) :</strong> les transactions concurrentes ne s\'interfèrent pas. ' +
      '  <strong>D (Durabilité) :</strong> une fois validée (commit), les modifications persistent même après un crash. ' +
      '  Le Write-Ahead Logging (WAL) impose que toute modification de page de données soit d\'abord inscrite et synchronisée sur disque dans un journal séquentiel avant que la page en mémoire partagée (buffer pool) ne soit écrite. Lors d\'un redémarrage après crash (Crash Recovery), PostgreSQL rejoue le journal WAL (Redo) pour reconstituer les commits et annule les transactions inachevées (Undo).</li>',
      '  <li><strong>Anomalies de concurrence (3 pts) :</strong> ' +
      '  <em>Dirty Read :</em> une transaction lit des données modifiées par une autre transaction qui n\'a pas encore commité (et qui peut faire un rollback). ' +
      '  <em>Non-Repeatable Read :</em> une transaction relit la même ligne et constate qu\'une colonne a été modifiée par un tiers entre-temps. ' +
      '  <em>Phantom Read :</em> une transaction réexécute une requête à plage et observe de nouvelles lignes insérées répondant aux critères. ' +
      '  Sous Read Committed avec MVCC (Multi-Version Concurrency Control), chaque requête voit un instantané (snapshot) des données validées à la milliseconde de son démarrage : les lectures ne verrouillent jamais les écritures et les écritures ne bloquent jamais les lectures, offrant un débit maximal sans lecture sale.</li>',
      '</ul>',
      '<h4>Corrigé Partie 2 (7 points)</h4>',
      '<ul>',
      '  <li><strong>Arbre B-Tree et profondeur (3 pts) :</strong> Dans une page standard de 8 Ko (8 192 octets), chaque nœud peut contenir plusieurs centaines de clés (facteur de branchement ou fan-out $B \\approx 300$ à $500$). Avec un arbre de profondeur 3 ($B^3 = 300^3 = 27\\text{ millions}$), l\'index peut adresser 27 millions d\'enregistrements en seulement 3 lectures de blocs disques I/O. Cette faible hauteur garantit un accès direct en $O(\\log N)$ avec un temps de traversée constant inférieur à la milliseconde.</li>',
      '  <li><strong>Fill Factor (4 pts) :</strong> Le paramètre <code>fillfactor</code> (pourcentage de 10 à 100) détermine le taux de remplissage maximal d\'une page d\'index lors de sa création initiale. La valeur par défaut (90 %) réserve 10 % d\'espace libre par page. Sur une table soumise à des <code>UPDATE</code> ou des insertions aléatoires fréquentes, abaisser le fillfactor à 75 % permet d\'insérer de nouvelles clés directement dans la page existante sans provoquer de division de page (Page Split). Risque d\'une valeur trop basse : l\'index devient inutilement volumineux en mémoire et sur disque, augmentant le nombre de pages à parcourir pour les scans d\'index.</li>',
      '</ul>',
      '<h4>Corrigé Partie 3 (7 points)</h4>',
      '<ul>',
      '  <li><strong>Typologie des scans (4 pts) :</strong> ' +
      '  <em>Seq Scan :</em> parcours séquentiel intégral de tous les blocs de la table. ' +
      '  <em>Index Scan :</em> parcours de l\'arbre B-Tree pour trouver le tuple ID (TID), puis lecture directe aléatoire de la page de table correspondante. ' +
      '  <em>Index Only Scan :</em> toutes les colonnes demandées figurent dans l\'index (index couvrant) et la carte de visibilité (visibility map) confirme que la page est propre : aucune lecture de la table n\'est effectuée. ' +
      '  <em>Bitmap Index Scan :</em> l\'index est scanné pour construire un vecteur de bits (bitmap) des blocs disques contenant les lignes correspondantes. Le <em>Bitmap Heap Scan</em> lit ensuite ces blocs dans l\'ordre physique séquentiel du disque, transformant des accès aléatoires coûteux en une lecture quasi-séquentielle efficace lorsque la requête cible entre 2 % et 15 % de la table.</li>',
      '  <li><strong>Analyse de l\'écart de cardinalité (3 pts) :</strong> L\'optimiseur a estimé que la requête ne renverrait que 10 lignes (<code>rows=10</code>), justifiant un plan basé sur un Seq Scan ou sous-dimensionné, alors qu\'elle en produit en réalité 850 000 (<code>actual rows=850000</code>), provoquant une dérive catastrophique de plus de 85 000 fois. Cause : les statistiques de la table dans <code>pg_statistic</code> sont totalement obsolètes après des insertions massives récentes. Solution immédiate : exécuter <code>ANALYZE commandes;</code> (ou <code>VACUUM ANALYZE commandes;</code>) pour reconstruire les histogrammes de distribution.</li>',
      '</ul>'
    ].join('\n')),
    '',
    '  <h2>Épreuve 2 : Examen Final (EF) — Durée 2 h 00 (Barème sur 20 points)</h2>',
    box('standard', 'Sujet de l\'Examen Final — Algorithmes de Jointure, Fonctions Analytiques, Sécurité &amp; Partitionnement', [
      '<h4>Partie 1 : Algorithmes de Jointure &amp; Mémoire work_mem (5 points)</h4>',
      '<ol>',
      '  <li>Comparez en détail le fonctionnement et les prérequis des trois algorithmes de jointure du CBO : <code>Nested Loop Join</code>, <code>Hash Join</code> et <code>Merge Join</code>. (3 pts)</li>',
      '  <li>Que se produit-il lorsqu’un Hash Join ne parvient pas à faire tenir sa table de hachage (Hash Table) dans la mémoire allouée par le paramètre <code>work_mem</code> ? Quel impact sur les performances disque observe-t-on (Hash Batches / Spill to disk) ? (2 pts)</li>',
      '</ol>',
      '<h4>Partie 2 : Fonctions de Fenêtrage (Window Functions) &amp; CTEs Récursives (5 points)</h4>',
      '<ol>',
      '  <li>Distinguez précisément le résultat produit par <code>ROW_NUMBER()</code>, <code>RANK()</code> et <code>DENSE_RANK()</code> sur la série de salaires suivante : (5000, 4200, 4200, 3800). (2 pts)</li>',
      '  <li>Écrivez la structure conceptuelle d’une expression de table commune récursive (<code>WITH RECURSIVE</code>) pour calculer la hiérarchie complète d’un organigramme depuis le PDG jusqu’aux employés de terrain. Expliquez le rôle de l’ancre (Anchor Member) et du membre récursif (Recursive Member). (3 pts)</li>',
      '</ol>',
      '<h4>Partie 3 : Procédures PL/pgSQL &amp; Row-Level Security RLS (5 points)</h4>',
      '<ol>',
      '  <li>Dans le développement de procédures stockées sous PostgreSQL, pourquoi l’instruction <code>EXECUTE \'SELECT ... \' || user_input</code> constitue-t-elle une vulnérabilité critique ? Quelle syntaxe sécurisée utilisant la clause <code>USING</code> doit obligatoirement être substituée ? (2 pts)</li>',
      '  <li>Expliquez le fonctionnement de la sécurité au niveau des lignes (Row-Level Security - RLS). Comment configure-t-on une politique garantissant qu’un utilisateur SaaS d’un sous-domaine ne puisse manipuler que les enregistrements associés à son propre <code>tenant_id</code> ? (3 pts)</li>',
      '</ol>',
      '<h4>Partie 4 : Partitionnement Horizontal &amp; Haute Disponibilité (5 points)</h4>',
      '<ol>',
      '  <li>Détaillez le fonctionnement de l’élagage de partitions (Partition Pruning). Dans quelle phase (compilation de la requête vs exécution dynamique) s’opère-t-il lorsque la clause WHERE utilise respectivement une valeur constante ou une sous-requête ? (3 pts)</li>',
      '  <li>Comparez la réplication physique par transfert de journaux WAL (Streaming Replication) en mode synchrone (<code>synchronous_commit = on</code>) et asynchrone (<code>off</code>). Quel compromis d’ingénierie existe-t-il entre le RPO (Recovery Point Objective) et la latence d’écriture des transactions clientes ? (2 pts)</li>',
      '</ol>'
    ].join('\n')),
    '',
    box('solution', 'Corrigé type &amp; Barème détaillé de l\'Examen Final', [
      '<h4>Corrigé Partie 1 (5 points)</h4>',
      '<ul>',
      '  <li><strong>Algorithmes de jointure (3 pts) :</strong> ' +
      '  <em>Nested Loop :</em> pour chaque ligne de la table externe, le moteur scanne la table interne (optimal si la table externe est petite et que la table interne possède un index sur la clé de jointure). ' +
      '  <em>Hash Join :</em> le moteur charge en mémoire la plus petite relation (build table), construit une table de hachage en mémoire indexée sur la clé de jointure, puis parcourt en une seule passe la grande table (probe table). Prérequis : condition d\'égalité stricte (<code>=</code>). ' +
      '  <em>Merge Join :</em> les deux relations sont d\'abord triées sur la clé de jointure, puis parcourues simultanément en parallèle (comme deux listes chaînées triées, complexité $O(N + M)$). Prérequis : condition d\'égalité et entrées déjà triées.</li>',
      '  <li><strong>Dépassement de work_mem (2 pts) :</strong> Si la table de hachage dépasse l\'espace mémoire alloué par <code>work_mem</code>, l\'optimiseur ne peut pas effectuer le hachage en une seule passe (1-pass in-memory). Il bascule en hachage multi-passes (Multi-batch Hash Join) en écrivant temporairement des partitions sur le disque (spill to disk dans <code>pgsql_tmp</code>). Conséquence : effondrement des débits I/O et explosion du temps d\'exécution de la requête. Solution : augmenter localement <code>work_mem</code> pour la session.</li>',
      '</ul>',
      '<h4>Corrigé Partie 2 (5 points)</h4>',
      '<ul>',
      '  <li><strong>Fonctions de classement (2 pts) :</strong> Sur la série (5000, 4200, 4200, 3800) :<br>' +
      '  - <code>ROW_NUMBER()</code> : 1, 2, 3, 4 (chaque ligne reçoit un numéro distinct sans ambiguïté).<br>' +
      '  - <code>RANK()</code> : 1, 2, 2, 4 (les deux valeurs 4200 reçoivent le rang 2, le rang 3 est sauté, la suivante reçoit 4).<br>' +
      '  - <code>DENSE_RANK()</code> : 1, 2, 2, 3 (les deux valeurs 4200 reçoivent le rang 2, aucun rang n\'est sauté, la suivante reçoit 3).</li>',
      '  <li><strong>Structure de WITH RECURSIVE (3 pts) :</strong> La syntaxe se compose de deux parties unies par <code>UNION ALL</code> :<br>' +
      '  1. <em>Membre ancre (Non-recursive Term) :</em> requête initiale sélectionnant le point de départ de l\'arbre (ex: <code>SELECT id, nom, 1 AS level, ARRAY[id] FROM employes WHERE manager_id IS NULL</code>).<br>' +
      '  2. <em>Membre récursif (Recursive Term) :</em> requête joignant la CTE avec la table physique pour sélectionner les subordonnés directs (ex: <code>SELECT e.id, e.nom, cte.level + 1, cte.path || e.id FROM employes e JOIN cte ON e.manager_id = cte.id</code>). La récursion s\'arrête automatiquement dès qu\'une passe ne renvoie aucune nouvelle ligne.</li>',
      '</ul>',
      '<h4>Corrigé Partie 3 (5 points)</h4>',
      '<ul>',
      '  <li><strong>Injections SQL dynamiques et clause USING (2 pts) :</strong> La concaténation directe de chaînes permet à un attaquant d\'injecter des guillemets et des opérateurs malveillants (ex: <code>\' OR 1=1; DROP TABLE users; --</code>) modifiant la syntaxe de l\'arbre syntaxique SQL. La clause <code>USING</code> permet de passer les entrées utilisateurs sous forme de <strong>paramètres typés liés</strong> (ex: <code>EXECUTE \'SELECT * FROM users WHERE email = $1\' USING user_email;</code>) : la valeur injectée est traitée strictement comme une donnée littérale par le compilateur, rendant toute modification de structure de requête mathématiquement impossible.</li>',
      '  <li><strong>Row-Level Security RLS (3 pts) :</strong> On active d\'abord RLS sur la table cible : <code>ALTER TABLE documents ENABLE ROW LEVEL SECURITY;</code>. On crée ensuite une politique de sécurité :<br>' +
      '  <code>CREATE POLICY tenant_isolation_policy ON documents FOR ALL TO app_user USING (tenant_id = current_setting(\'app.current_tenant_id\')::uuid);</code><br>' +
      '  L\'application web injecte l\'identifiant du tenant au début de chaque session transactionnelle via <code>SET LOCAL app.current_tenant_id = \'tenant_123\';</code>. PostgreSQL filtre alors de manière totalement transparente toutes les opérations <code>SELECT</code>, <code>UPDATE</code> et <code>DELETE</code> au niveau du moteur : le code applicatif n\'a plus besoin d\'ajouter manuellement <code>WHERE tenant_id = ...</code> sur chaque requête.</li>',
      '</ul>',
      '<h4>Corrigé Partie 4 (5 points)</h4>',
      '<ul>',
      '  <li><strong>Élagage de partitions (3 pts) :</strong> L\'élagage de partitions analyse les contraintes de bornes des partitions pour exclure dès le début du plan celles qui ne peuvent contenir aucun enregistrement pertinent.<br>' +
      '  - <em>Élagage statique (au plan) :</em> lorsque le filtre utilise des littéraux constants connus lors de la compilation (ex: <code>WHERE annee = 2024</code>), l\'optimiseur retire immédiatement les sous-tables du plan généré.<br>' +
      '  - <em>Élagage dynamique (à l\'exécution) :</em> lorsque le filtre dépend d\'un paramètre lié (<code>$1</code>), d\'une sous-requête ou d\'une jointure avec une autre relation, l\'élagage s\'opère au runtime dès que la valeur est évaluée, évitant de scanner les tables physiques inutiles.</li>',
      '  <li><strong>Streaming Replication synchrone vs asynchrone (2 pts) :</strong> En mode <em>asynchrone</em>, le serveur primaire acquitte le COMMIT au client dès qu\'il a écrit le WAL localement sans attendre la transmission au réplica : latence minimale pour les utilisateurs, mais risque de perte de données (RPO &gt; 0) si le primaire crashe avant que le réplica n\'ait reçu les derniers blocs. En mode <em>synchrone</em> (<code>synchronous_commit = on</code> ou <code>remote_apply</code>), le COMMIT attend que le réplica secondaire confirme la réception et l\'écriture du WAL sur disque : garantie absolue de RPO = 0 (zéro perte de données), au prix d\'une augmentation de la latence de commit proportionnelle au temps d\'aller-retour réseau (RTT).</li>',
      '</ul>'
    ].join('\n')),
    '',
    chnav({ href: 'formules.html', label: 'Consulter le mémento technique' }, { href: 'exercices.html', label: 'Voir le catalogue des 18 exercices' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/examens.html': {
      title: 'Examens blancs — ' + course.brand,
      description: 'Épreuves d’examen blanc corrigées de niveau B3 en ingénierie SQL, transactions ACID, plans EXPLAIN, index B-Tree et partitionnement.',
      active: 'examens',
      body
    }
  };
}

/* ======================== Exercices Index ======================== */

function exercices(course) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Catalogue des exercices' }
  ]);

  const exercises = [
    { id: 'sql3-c1-e1', ch: 1, title: 'Détecteur d’anomalies de concurrence selon le niveau d’isolation ANSI SQL', level: 'n1', lang: 'SQL', desc: 'Évaluer la possibilité d’anomalies (Dirty Read, Non-Repeatable Read, Phantom Read) sous chaque niveau ANSI.' },
    { id: 'sql3-c1-e2', ch: 1, title: 'Simulateur de verrous partagés et exclusifs (S/X Locks) et détection de conflit', level: 'n2', lang: 'SQL', desc: 'Simuler l’octroi, les files d’attente et les promotions de verrous 2PL sur des ressources partagées.' },
    { id: 'sql3-c1-e3', ch: 1, title: 'Détecteur d’interblocage de transactions (Deadlock Graph Cycle Finder)', level: 'n3', lang: 'SQL', desc: 'Construire le graphe d’attente Wait-For Graph, détecter les cycles et sélectionner la victime à avorter.' },

    { id: 'sql3-c2-e1', ch: 2, title: 'Simulateur de recherche et traversée dans un arbre B-Tree indexé', level: 'n1', lang: 'SQL', desc: 'Traverser les nœuds internes d’un index B-Tree de la racine aux feuilles pour localiser une clé.' },
    { id: 'sql3-c2-e2', ch: 2, title: 'Calculateur d’empreinte mémoire d’index et facteur de blocage (Fill Factor)', level: 'n2', lang: 'SQL', desc: 'Estimer le nombre de pages et le volume en Mo d’un index B-Tree selon la taille des clés et le Fill Factor.' },
    { id: 'sql3-c2-e3', ch: 2, title: 'Sélecteur d’index optimal (Index Advisor) selon la typologie de prédicats', level: 'n3', lang: 'SQL', desc: 'Analyser les prédicats de requêtes et recommander le type d’index adapté (B-Tree, GIN, Hash, partiel).' },

    { id: 'sql3-c3-e1', ch: 3, title: 'Parseur et estimateur de coût de plan d’exécution EXPLAIN', level: 'n1', lang: 'SQL', desc: 'Extraire les métriques de coût (startup/total cost, rows, width) des nœuds d’un plan d’exécution PostgreSQL.' },
    { id: 'sql3-c3-e2', ch: 3, title: 'Simulateur de sélection d’algorithme de jointure (Nested Loop vs Hash vs Merge)', level: 'n2', lang: 'SQL', desc: 'Simuler le choix d’algorithme de jointure par l’optimiseur CBO selon la volumétrie et les index.' },
    { id: 'sql3-c3-e3', ch: 3, title: 'Détecteur d’écart de cardinalité (Estimation vs Actual Rows)', level: 'n3', lang: 'SQL', desc: 'Calculer les dérives statistiques entre lignes estimées et réelles dans un plan EXPLAIN ANALYZE.' },

    { id: 'sql3-c4-e1', ch: 4, title: 'Simulateur de fonctions de classement (ROW_NUMBER vs RANK vs DENSE_RANK)', level: 'n1', lang: 'SQL', desc: 'Appliquer les trois fonctions de classement standardisées SQL sur une série de valeurs avec ex-æquo.' },
    { id: 'sql3-c4-e2', ch: 4, title: 'Calculateur de moyennes et sommes glissantes avec clause d’encadrement', level: 'n2', lang: 'SQL', desc: 'Simuler l’agrégation fenêtrée avec la clause de cadrage ROWS BETWEEN k PRECEDING AND CURRENT ROW.' },
    { id: 'sql3-c4-e3', ch: 4, title: 'Moteur de résolution de hiérarchie arborescente par CTE récursive', level: 'n3', lang: 'SQL', desc: 'Calculer la profondeur, le chemin absolu et le nombre total de subordonnés via une CTE récursive simulée.' },

    { id: 'sql3-c5-e1', ch: 5, title: 'Simulateur de déclencheur d’audit d’historisation (Audit Trail Trigger)', level: 'n1', lang: 'SQL', desc: 'Simuler un trigger AFTER INSERT/UPDATE/DELETE alimentant une table de journalisation d’audit immuable.' },
    { id: 'sql3-c5-e2', ch: 5, title: 'Moteur d’évaluation de politiques de sécurité au niveau ligne (RLS)', level: 'n2', lang: 'SQL', desc: 'Filtrer les accès selon le tenant et le rôle utilisateur via PostgreSQL Row-Level Security.' },
    { id: 'sql3-c5-e3', ch: 5, title: 'Validateur de requêtes dynamiques et détecteur d’injections SQL (SQLi Sanitizer)', level: 'n3', lang: 'SQL', desc: 'Détecter les motifs d’injection SQL classiques et valider l’échappement des requêtes dynamiques.' },

    { id: 'sql3-c6-e1', ch: 6, title: 'Routeur de partitionnement déclaratif de table (Range & List)', level: 'n1', lang: 'SQL', desc: 'Acheminer les insertions de données vers la sous-table appropriée selon la stratégie de partitionnement.' },
    { id: 'sql3-c6-e2', ch: 6, title: 'Simulateur d’élagage de partitions (Partition Pruning Optimizer)', level: 'n2', lang: 'SQL', desc: 'Calculer les partitions éliminées et le gain d’I/O lors de l’exécution d’une requête filtrée.' },
    { id: 'sql3-c6-e3', ch: 6, title: 'Calculateur de lag de réplication WAL (Streaming Replication Lag)', level: 'n3', lang: 'SQL', desc: 'Calculer le retard de réplication en octets et en Ko à partir des numéros LSN du primaire et des réplicas.' }
  ];

  const cardsHtml = exercises.map(ex => [
    '    <article class="card card--exercise">',
    '      <div class="card__head">',
    '        <span class="badge badge--' + ex.level + '">' + (ex.level === 'n1' ? 'Fondamental' : ex.level === 'n2' ? 'Intermédiaire' : 'Avancé') + '</span>',
    '        <span class="card__num">Module ' + ex.ch + ' • ' + ex.id + '</span>',
    '      </div>',
    '      <h3 class="card__title"><a href="chapitres/chapitre' + ex.ch + '.html#' + ex.id + '">' + ex.title + '</a></h3>',
    '      <p class="card__desc">' + ex.desc + '</p>',
    '      <div class="card__foot">',
    '        <span class="card__time">' + ic('terminal') + ' Langage : ' + ex.lang + '</span>',
    '        <a class="btn btn--sm" href="chapitres/chapitre' + ex.ch + '.html#' + ex.id + '">Résoudre dans le module ' + ic('arrow-right') + '</a>',
    '      </div>',
    '    </article>'
  ].join('\n')).join('\n');

  const body = [
    crumbs,
    '  <h1>Catalogue des 18 Ateliers Pratiques de Code Lab — SQL Avancé B3</h1>',
    '  <p class="lead">18 ateliers de pratique interactive (SQL) intégrés directement dans les modules de cours, corrigés avec tests d’évaluation automatisés.</p>',
    '',
    '  <div class="grid grid--2">' + cardsHtml + '</div>',
    '',
    chnav({ href: 'examens.html', label: 'Revenir aux épreuves d’examen' }, { href: 'chapitres/chapitre1.html', label: 'Démarrer le module 1' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/exercices.html': {
      title: 'Catalogue des exercices — ' + course.brand,
      description: 'Répertoire complet des 18 exercices de programmation en Python 3 du cours SQL Avancé B3.',
      active: 'exercices',
      body
    }
  };
}

module.exports = { examens, exercices };
