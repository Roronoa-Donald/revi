'use strict';

const SQL3_EXERCISES = [
  {
    "id": "sql3-c1-e1",
    "chapter": 1,
    "level": "n1",
    "language": "sql",
    "title": "Audit des transactions non validées dans le journal WAL",
    "goal": "Identifier par requête SQL les transactions ouvertes sans événement COMMIT ni ROLLBACK.",
    "brief": "<p>La table <code>wal_journal(lsn INT, tx_id INT, op TEXT)</code> consigne les opérations du journal Write-Ahead Log (<code>BEGIN</code>, <code>UPDATE</code>, <code>COMMIT</code>, <code>ROLLBACK</code>). Écrivez une requête SQL qui retourne les <code>tx_id</code> distincts des transactions encore en vol (qui ne possèdent aucune ligne avec <code>op IN ('COMMIT', 'ROLLBACK')</code>), triés par <code>tx_id</code> croissant.</p>",
    "starter": "-- Sélectionnez les tx_id distincts n’ayant ni COMMIT ni ROLLBACK\nSELECT DISTINCT tx_id FROM wal_journal;",
    "hints": [
      "Utilisez une sous-requête : WHERE tx_id NOT IN (SELECT tx_id FROM wal_journal WHERE op IN ('COMMIT', 'ROLLBACK')).",
      "Ajoutez DISTINCT et ORDER BY tx_id ASC."
    ],
    "examples": [
      {
        "stdin": "CREATE TABLE wal_journal (lsn INT, tx_id INT, op TEXT); INSERT INTO wal_journal VALUES (1, 100, 'BEGIN'), (2, 100, 'UPDATE'), (3, 100, 'COMMIT'), (4, 101, 'BEGIN'), (5, 101, 'UPDATE');\n-- exemple",
        "expected": "+-------+\n| tx_id |\n+-------+\n| 101   |\n+-------+\n(1 ligne retournée)",
        "note": "Résultat de la requête SQL sur la base d’exemple."
      }
    ],
    "tests": [
      {
        "label": "Une transaction validée et une en vol",
        "stdin": "CREATE TABLE wal_journal (lsn INT, tx_id INT, op TEXT); INSERT INTO wal_journal VALUES (1, 100, 'BEGIN'), (2, 100, 'UPDATE'), (3, 100, 'COMMIT'), (4, 101, 'BEGIN'), (5, 101, 'UPDATE');",
        "expected": "+-------+\n| tx_id |\n+-------+\n| 101   |\n+-------+\n(1 ligne retournée)"
      },
      {
        "label": "Transactions avec ROLLBACK et en vol",
        "stdin": "CREATE TABLE wal_journal (lsn INT, tx_id INT, op TEXT); INSERT INTO wal_journal VALUES (1, 10, 'BEGIN'), (2, 10, 'ROLLBACK'), (3, 20, 'BEGIN'), (4, 30, 'BEGIN'), (5, 30, 'UPDATE');",
        "expected": "+-------+\n| tx_id |\n+-------+\n| 20    |\n| 30    |\n+-------+\n(2 lignes retournées)"
      },
      {
        "label": "Transaction unique non terminée",
        "stdin": "CREATE TABLE wal_journal (lsn INT, tx_id INT, op TEXT); INSERT INTO wal_journal VALUES (1, 1, 'BEGIN'), (2, 1, 'COMMIT'), (3, 500, 'BEGIN'), (4, 500, 'UPDATE');",
        "expected": "+-------+\n| tx_id |\n+-------+\n| 500   |\n+-------+\n(1 ligne retournée)"
      }
    ],
    "solution": "-- Corrigé officiel sql3-c1-e1\nSELECT DISTINCT tx_id FROM wal_journal WHERE tx_id NOT IN (SELECT tx_id FROM wal_journal WHERE op IN ('COMMIT', 'ROLLBACK')) ORDER BY tx_id ASC;"
  },
  {
    "id": "sql3-c1-e2",
    "chapter": 1,
    "level": "n2",
    "language": "sql",
    "title": "Visibilité MVCC des tuples selon le snapshot xmin / xmax",
    "goal": "Déterminer les versions de lignes visibles pour une transaction de snapshot donné.",
    "brief": "<p>Dans PostgreSQL (MVCC), chaque version de ligne possède <code>xmin</code> (transaction créatrice) et <code>xmax</code> (transaction de suppression, <code>0</code> si toujours active). Pour une transaction courante <code>snapshot_tx = 50</code>, sélectionnez <code>tuple_id</code> et <code>valeur</code> de la table <code>mvcc_tuples(tuple_id, xmin, xmax, valeur)</code> qui ont été créés avant le snapshot (<code>xmin &lt; 50</code>) et qui ne sont pas supprimés avant le snapshot (<code>xmax = 0 OR xmax &gt;= 50</code>), triés par <code>tuple_id</code> croissant.</p>",
    "starter": "-- Filtrez les tuples visibles au snapshot_tx = 50\nSELECT tuple_id, valeur FROM mvcc_tuples;",
    "hints": [
      "Un tuple est visible à tx=50 si xmin < 50 AND (xmax = 0 OR xmax >= 50).",
      "Triez par tuple_id ASC."
    ],
    "examples": [
      {
        "stdin": "CREATE TABLE mvcc_tuples (tuple_id INT, xmin INT, xmax INT, valeur TEXT); INSERT INTO mvcc_tuples VALUES (1, 10, 30, 'v1_supprimee'), (2, 30, 0, 'v2_visible'), (3, 60, 0, 'v3_future');\n-- exemple",
        "expected": "+----------+------------+\n| tuple_id | valeur     |\n+----------+------------+\n| 2        | v2_visible |\n+----------+------------+\n(1 ligne retournée)",
        "note": "Résultat de la requête SQL sur la base d’exemple."
      }
    ],
    "tests": [
      {
        "label": "Trois versions MVCC (supprimée, active, future)",
        "stdin": "CREATE TABLE mvcc_tuples (tuple_id INT, xmin INT, xmax INT, valeur TEXT); INSERT INTO mvcc_tuples VALUES (1, 10, 30, 'v1_supprimee'), (2, 30, 0, 'v2_visible'), (3, 60, 0, 'v3_future');",
        "expected": "+----------+------------+\n| tuple_id | valeur     |\n+----------+------------+\n| 2        | v2_visible |\n+----------+------------+\n(1 ligne retournée)"
      },
      {
        "label": "Tuple supprimé après le snapshot (xmax = 55)",
        "stdin": "CREATE TABLE mvcc_tuples (tuple_id INT, xmin INT, xmax INT, valeur TEXT); INSERT INTO mvcc_tuples VALUES (10, 20, 55, 'encore_visible'), (20, 49, 0, 'juste_avant'), (30, 50, 0, 'exclue');",
        "expected": "+----------+----------------+\n| tuple_id | valeur         |\n+----------+----------------+\n| 10       | encore_visible |\n| 20       | juste_avant    |\n+----------+----------------+\n(2 lignes retournées)"
      },
      {
        "label": "Deux tuples actifs et un supprimé",
        "stdin": "CREATE TABLE mvcc_tuples (tuple_id INT, xmin INT, xmax INT, valeur TEXT); INSERT INTO mvcc_tuples VALUES (1, 5, 0, 'A'), (2, 12, 0, 'B'), (3, 15, 25, 'C');",
        "expected": "+----------+--------+\n| tuple_id | valeur |\n+----------+--------+\n| 1        | A      |\n| 2        | B      |\n+----------+--------+\n(2 lignes retournées)"
      }
    ],
    "solution": "-- Corrigé officiel sql3-c1-e2\nSELECT tuple_id, valeur FROM mvcc_tuples WHERE xmin < 50 AND (xmax = 0 OR xmax >= 50) ORDER BY tuple_id ASC;"
  },
  {
    "id": "sql3-c1-e3",
    "chapter": 1,
    "level": "n3",
    "language": "sql",
    "title": "Détection de conflit de verrous (Lock Wait Graph)",
    "goal": "Joindre la table des verrous acquis et des verrous en attente pour identifier les blocages.",
    "brief": "<p>La table <code>pg_locks_sim(pid INT, ressource TEXT, accorde INT)</code> indique si un processus détient un verrou (<code>accorde = 1</code>) ou attend ce verrou (<code>accorde = 0</code>). Écrivez une auto-jointure qui affiche <code>attente.pid AS pid_bloque</code>, <code>detenteur.pid AS pid_bloqueur</code> et <code>attente.ressource</code> pour chaque couple où <code>attente.accorde = 0</code> et <code>detenteur.accorde = 1</code> sur la même <code>ressource</code>, triée par <code>pid_bloque</code> croissant.</p>",
    "starter": "-- Identifiez pid_bloque, pid_bloqueur et ressource par auto-jointure\nSELECT pid, ressource FROM pg_locks_sim;",
    "hints": [
      "Faites une jointure de pg_locks_sim a (en attente, a.accorde = 0) avec pg_locks_sim d (détenteur, d.accorde = 1) sur a.ressource = d.ressource.",
      "Renommez les colonnes AS pid_bloque, AS pid_bloqueur."
    ],
    "examples": [
      {
        "stdin": "CREATE TABLE pg_locks_sim (pid INT, ressource TEXT, accorde INT); INSERT INTO pg_locks_sim VALUES (101, 'ligne_42', 1), (102, 'ligne_42', 0), (103, 'ligne_99', 1);\n-- exemple",
        "expected": "+------------+--------------+-----------+\n| pid_bloque | pid_bloqueur | ressource |\n+------------+--------------+-----------+\n| 102        | 101          | ligne_42  |\n+------------+--------------+-----------+\n(1 ligne retournée)",
        "note": "Résultat de la requête SQL sur la base d’exemple."
      }
    ],
    "tests": [
      {
        "label": "Un processus bloqué sur ligne_42",
        "stdin": "CREATE TABLE pg_locks_sim (pid INT, ressource TEXT, accorde INT); INSERT INTO pg_locks_sim VALUES (101, 'ligne_42', 1), (102, 'ligne_42', 0), (103, 'ligne_99', 1);",
        "expected": "+------------+--------------+-----------+\n| pid_bloque | pid_bloqueur | ressource |\n+------------+--------------+-----------+\n| 102        | 101          | ligne_42  |\n+------------+--------------+-----------+\n(1 ligne retournée)"
      },
      {
        "label": "Chaîne de blocage à deux niveaux",
        "stdin": "CREATE TABLE pg_locks_sim (pid INT, ressource TEXT, accorde INT); INSERT INTO pg_locks_sim VALUES (10, 'table_cmd', 1), (20, 'table_cmd', 0), (20, 'table_stock', 1), (30, 'table_stock', 0);",
        "expected": "+------------+--------------+-------------+\n| pid_bloque | pid_bloqueur | ressource   |\n+------------+--------------+-------------+\n| 20         | 10           | table_cmd   |\n| 30         | 20           | table_stock |\n+------------+--------------+-------------+\n(2 lignes retournées)"
      },
      {
        "label": "Deux processus bloqués par le même détenteur",
        "stdin": "CREATE TABLE pg_locks_sim (pid INT, ressource TEXT, accorde INT); INSERT INTO pg_locks_sim VALUES (500, 'compte_1', 1), (501, 'compte_1', 0), (502, 'compte_1', 0);",
        "expected": "+------------+--------------+-----------+\n| pid_bloque | pid_bloqueur | ressource |\n+------------+--------------+-----------+\n| 501        | 500          | compte_1  |\n| 502        | 500          | compte_1  |\n+------------+--------------+-----------+\n(2 lignes retournées)"
      }
    ],
    "solution": "-- Corrigé officiel sql3-c1-e3\nSELECT a.pid AS pid_bloque, d.pid AS pid_bloqueur, a.ressource FROM pg_locks_sim a INNER JOIN pg_locks_sim d ON a.ressource = d.ressource WHERE a.accorde = 0 AND d.accorde = 1 ORDER BY pid_bloque ASC;"
  },
  {
    "id": "sql3-c2-e1",
    "chapter": 2,
    "level": "n1",
    "language": "sql",
    "title": "Calcul du ratio de sélectivité d’une colonne pour le choix d’un index",
    "goal": "Calculer la cardinalité distincte et la sélectivité d’une colonne.",
    "brief": "<p>Dans la table <code>commandes(id, code_pays, email_client)</code>, calculez le nombre total de lignes (<code>COUNT(*) AS total_lignes</code>), le nombre de pays distincts (<code>COUNT(DISTINCT code_pays) AS card_pays</code>) et le nombre d’emails distincts (<code>COUNT(DISTINCT email_client) AS card_email</code>).</p>",
    "starter": "-- Calculez total_lignes, card_pays et card_email\nSELECT COUNT(*) FROM commandes;",
    "hints": [
      "Utilisez COUNT(DISTINCT colonne) pour obtenir le nombre de valeurs uniques.",
      "Nommez les trois colonnes total_lignes, card_pays et card_email."
    ],
    "examples": [
      {
        "stdin": "CREATE TABLE commandes (id INT, code_pays TEXT, email_client TEXT); INSERT INTO commandes VALUES (1, 'TG', 'a@x.tg'), (2, 'TG', 'b@x.tg'), (3, 'SN', 'c@x.sn'), (4, 'TG', 'a@x.tg');\n-- exemple",
        "expected": "+--------------+-----------+------------+\n| total_lignes | card_pays | card_email |\n+--------------+-----------+------------+\n| 4            | 2         | 3          |\n+--------------+-----------+------------+\n(1 ligne retournée)",
        "note": "Résultat de la requête SQL sur la base d’exemple."
      }
    ],
    "tests": [
      {
        "label": "Quatre commandes sur deux pays",
        "stdin": "CREATE TABLE commandes (id INT, code_pays TEXT, email_client TEXT); INSERT INTO commandes VALUES (1, 'TG', 'a@x.tg'), (2, 'TG', 'b@x.tg'), (3, 'SN', 'c@x.sn'), (4, 'TG', 'a@x.tg');",
        "expected": "+--------------+-----------+------------+\n| total_lignes | card_pays | card_email |\n+--------------+-----------+------------+\n| 4            | 2         | 3          |\n+--------------+-----------+------------+\n(1 ligne retournée)"
      },
      {
        "label": "Emails tous uniques",
        "stdin": "CREATE TABLE commandes (id INT, code_pays TEXT, email_client TEXT); INSERT INTO commandes VALUES (1, 'CI', 'u1@ci.org'), (2, 'CI', 'u2@ci.org'), (3, 'BJ', 'u3@bj.org');",
        "expected": "+--------------+-----------+------------+\n| total_lignes | card_pays | card_email |\n+--------------+-----------+------------+\n| 3            | 2         | 3          |\n+--------------+-----------+------------+\n(1 ligne retournée)"
      },
      {
        "label": "Un seul pays",
        "stdin": "CREATE TABLE commandes (id INT, code_pays TEXT, email_client TEXT); INSERT INTO commandes VALUES (1, 'TG', 'koffi@tg.org'), (2, 'TG', 'koffi@tg.org');",
        "expected": "+--------------+-----------+------------+\n| total_lignes | card_pays | card_email |\n+--------------+-----------+------------+\n| 2            | 1         | 1          |\n+--------------+-----------+------------+\n(1 ligne retournée)"
      }
    ],
    "solution": "-- Corrigé officiel sql3-c2-e1\nSELECT COUNT(*) AS total_lignes, COUNT(DISTINCT code_pays) AS card_pays, COUNT(DISTINCT email_client) AS card_email FROM commandes;"
  },
  {
    "id": "sql3-c2-e2",
    "chapter": 2,
    "level": "n2",
    "language": "sql",
    "title": "Index partiel (CREATE INDEX ... WHERE) sur les commandes actives",
    "goal": "Créer un index partiel filtré pour réduire l’empreinte mémoire de l’index B-Tree.",
    "brief": "<p>Sur la table <code>commandes(id INT, client_id INT, statut TEXT, montant INT)</code>, créez un index partiel nommé <code>idx_cmd_en_cours</code> sur <code>(client_id)</code> filtré uniquement sur <code>WHERE statut = 'EN_COURS'</code>, puis sélectionnez <code>id</code> et <code>montant</code> des commandes de <code>client_id = 10</code> ayant <code>statut = 'EN_COURS'</code> triées par <code>id</code>.</p>",
    "starter": "-- Créez l’index partiel idx_cmd_en_cours puis interrogez la table\nSELECT id, montant FROM commandes;",
    "hints": [
      "SQLite et PostgreSQL supportent CREATE INDEX nom ON table(col) WHERE condition;",
      "Ajoutez ensuite la requête SELECT id, montant FROM commandes WHERE client_id = 10 AND statut = 'EN_COURS' ORDER BY id ASC;"
    ],
    "examples": [
      {
        "stdin": "CREATE TABLE commandes (id INT, client_id INT, statut TEXT, montant INT); INSERT INTO commandes VALUES (1, 10, 'ARCHIVEE', 5000), (2, 10, 'EN_COURS', 12000), (3, 20, 'EN_COURS', 8000);\n-- exemple",
        "expected": "Instruction exécutée avec succès (3 lignes modifiées).\n\n+----+---------+\n| id | montant |\n+----+---------+\n| 2  | 12000   |\n+----+---------+\n(1 ligne retournée)",
        "note": "Résultat de la requête SQL sur la base d’exemple."
      }
    ],
    "tests": [
      {
        "label": "Une commande en cours pour le client 10",
        "stdin": "CREATE TABLE commandes (id INT, client_id INT, statut TEXT, montant INT); INSERT INTO commandes VALUES (1, 10, 'ARCHIVEE', 5000), (2, 10, 'EN_COURS', 12000), (3, 20, 'EN_COURS', 8000);",
        "expected": "Instruction exécutée avec succès (3 lignes modifiées).\n\n+----+---------+\n| id | montant |\n+----+---------+\n| 2  | 12000   |\n+----+---------+\n(1 ligne retournée)"
      },
      {
        "label": "Deux commandes en cours pour le client 10",
        "stdin": "CREATE TABLE commandes (id INT, client_id INT, statut TEXT, montant INT); INSERT INTO commandes VALUES (10, 10, 'EN_COURS', 3000), (20, 10, 'EN_COURS', 7000), (30, 10, 'LIVREE', 9000);",
        "expected": "Instruction exécutée avec succès (3 lignes modifiées).\n\n+----+---------+\n| id | montant |\n+----+---------+\n| 10 | 3000    |\n| 20 | 7000    |\n+----+---------+\n(2 lignes retournées)"
      },
      {
        "label": "Commande en cours et commande archivée",
        "stdin": "CREATE TABLE commandes (id INT, client_id INT, statut TEXT, montant INT); INSERT INTO commandes VALUES (5, 10, 'EN_COURS', 45000), (6, 20, 'ARCHIVEE', 10000);",
        "expected": "Instruction exécutée avec succès (2 lignes modifiées).\n\n+----+---------+\n| id | montant |\n+----+---------+\n| 5  | 45000   |\n+----+---------+\n(1 ligne retournée)"
      }
    ],
    "solution": "-- Corrigé officiel sql3-c2-e2\nCREATE INDEX idx_cmd_en_cours ON commandes(client_id) WHERE statut = 'EN_COURS';\nSELECT id, montant FROM commandes WHERE client_id = 10 AND statut = 'EN_COURS' ORDER BY id ASC;"
  },
  {
    "id": "sql3-c2-e3",
    "chapter": 2,
    "level": "n3",
    "language": "sql",
    "title": "Estimation du taux de tuples morts (Dead Tuples / Bloat) pour VACUUM",
    "goal": "Identifier les tables nécessitant un VACUUM selon le seuil d’autovacuum PostgreSQL.",
    "brief": "<p>Dans PostgreSQL, l’autovacuum se déclenche lorsque <code>n_dead_tup &gt; 50 + 0.20 * n_live_tup</code>. À partir de la table de statistiques <code>pg_stat_user_tables_sim(relname TEXT, n_live_tup INT, n_dead_tup INT)</code>, affichez <code>relname</code>, <code>n_live_tup</code> et <code>n_dead_tup</code> des tables qui dépassent strictement ce seuil, triées par <code>n_dead_tup</code> décroissant.</p>",
    "starter": "-- Sélectionnez les tables où n_dead_tup > 50 + 0.20 * n_live_tup\nSELECT relname, n_live_tup, n_dead_tup FROM pg_stat_user_tables_sim;",
    "hints": [
      "Écrivez directement la formule dans WHERE : n_dead_tup > 50 + 0.20 * n_live_tup.",
      "Triez par n_dead_tup DESC."
    ],
    "examples": [
      {
        "stdin": "CREATE TABLE pg_stat_user_tables_sim (relname TEXT, n_live_tup INT, n_dead_tup INT); INSERT INTO pg_stat_user_tables_sim VALUES ('commandes', 1000, 300), ('clients', 1000, 100), ('sessions', 200, 120);\n-- exemple",
        "expected": "+-----------+------------+------------+\n| relname   | n_live_tup | n_dead_tup |\n+-----------+------------+------------+\n| commandes | 1000       | 300        |\n| sessions  | 200        | 120        |\n+-----------+------------+------------+\n(2 lignes retournées)",
        "note": "Résultat de la requête SQL sur la base d’exemple."
      }
    ],
    "tests": [
      {
        "label": "Deux tables au-dessus du seuil d’autovacuum",
        "stdin": "CREATE TABLE pg_stat_user_tables_sim (relname TEXT, n_live_tup INT, n_dead_tup INT); INSERT INTO pg_stat_user_tables_sim VALUES ('commandes', 1000, 300), ('clients', 1000, 100), ('sessions', 200, 120);",
        "expected": "+-----------+------------+------------+\n| relname   | n_live_tup | n_dead_tup |\n+-----------+------------+------------+\n| commandes | 1000       | 300        |\n| sessions  | 200        | 120        |\n+-----------+------------+------------+\n(2 lignes retournées)"
      },
      {
        "label": "Table fortement fragmentée",
        "stdin": "CREATE TABLE pg_stat_user_tables_sim (relname TEXT, n_live_tup INT, n_dead_tup INT); INSERT INTO pg_stat_user_tables_sim VALUES ('logs', 5000, 2000), ('pays', 50, 5);",
        "expected": "+---------+------------+------------+\n| relname | n_live_tup | n_dead_tup |\n+---------+------------+------------+\n| logs    | 5000       | 2000       |\n+---------+------------+------------+\n(1 ligne retournée)"
      },
      {
        "label": "Cas limite autour du seuil (100 vivants -> seuil 70)",
        "stdin": "CREATE TABLE pg_stat_user_tables_sim (relname TEXT, n_live_tup INT, n_dead_tup INT); INSERT INTO pg_stat_user_tables_sim VALUES ('t_exact', 100, 70), ('t_depasse', 100, 71);",
        "expected": "+-----------+------------+------------+\n| relname   | n_live_tup | n_dead_tup |\n+-----------+------------+------------+\n| t_depasse | 100        | 71         |\n+-----------+------------+------------+\n(1 ligne retournée)"
      }
    ],
    "solution": "-- Corrigé officiel sql3-c2-e3\nSELECT relname, n_live_tup, n_dead_tup FROM pg_stat_user_tables_sim WHERE n_dead_tup > 50 + 0.20 * n_live_tup ORDER BY n_dead_tup DESC;"
  },
  {
    "id": "sql3-c3-e1",
    "chapter": 3,
    "level": "n1",
    "language": "sql",
    "title": "Calcul du coût CBO d’un parcours séquentiel (Seq Scan)",
    "goal": "Appliquer la formule de coût de l’optimiseur PostgreSQL pour un Seq Scan.",
    "brief": "<p>L’optimiseur CBO estime le coût d’un <code>Seq Scan</code> par la formule : <code>cout_total = relpages * 1.0 + reltuples * 0.01</code>. À partir de la table catalogue <code>pg_class_sim(relname TEXT, relpages INT, reltuples INT)</code>, affichez <code>relname</code> et <code>ROUND(relpages * 1.0 + reltuples * 0.01, 2) AS cout_seq_scan</code>, triés par <code>cout_seq_scan</code> croissant.</p>",
    "starter": "-- Calculez cout_seq_scan pour chaque table de pg_class_sim\nSELECT relname FROM pg_class_sim;",
    "hints": [
      "Appliquez ROUND(relpages * 1.0 + reltuples * 0.01, 2) AS cout_seq_scan.",
      "Triez par cout_seq_scan ASC."
    ],
    "examples": [
      {
        "stdin": "CREATE TABLE pg_class_sim (relname TEXT, relpages INT, reltuples INT); INSERT INTO pg_class_sim VALUES ('factures', 100, 10000), ('agences', 2, 50);\n-- exemple",
        "expected": "+----------+---------------+\n| relname  | cout_seq_scan |\n+----------+---------------+\n| agences  | 2.5           |\n| factures | 200           |\n+----------+---------------+\n(2 lignes retournées)",
        "note": "Résultat de la requête SQL sur la base d’exemple."
      }
    ],
    "tests": [
      {
        "label": "Petite table et grande table",
        "stdin": "CREATE TABLE pg_class_sim (relname TEXT, relpages INT, reltuples INT); INSERT INTO pg_class_sim VALUES ('factures', 100, 10000), ('agences', 2, 50);",
        "expected": "+----------+---------------+\n| relname  | cout_seq_scan |\n+----------+---------------+\n| agences  | 2.5           |\n| factures | 200           |\n+----------+---------------+\n(2 lignes retournées)"
      },
      {
        "label": "Trois tables de tailles croissantes",
        "stdin": "CREATE TABLE pg_class_sim (relname TEXT, relpages INT, reltuples INT); INSERT INTO pg_class_sim VALUES ('t1', 10, 500), ('t2', 50, 4000), ('t3', 5, 100);",
        "expected": "+---------+---------------+\n| relname | cout_seq_scan |\n+---------+---------------+\n| t3      | 6             |\n| t1      | 15            |\n| t2      | 90            |\n+---------+---------------+\n(3 lignes retournées)"
      },
      {
        "label": "Table de 1000 pages",
        "stdin": "CREATE TABLE pg_class_sim (relname TEXT, relpages INT, reltuples INT); INSERT INTO pg_class_sim VALUES ('audit_log', 1000, 80000);",
        "expected": "+-----------+---------------+\n| relname   | cout_seq_scan |\n+-----------+---------------+\n| audit_log | 1800          |\n+-----------+---------------+\n(1 ligne retournée)"
      }
    ],
    "solution": "-- Corrigé officiel sql3-c3-e1\nSELECT relname, ROUND(relpages * 1.0 + reltuples * 0.01, 2) AS cout_seq_scan FROM pg_class_sim ORDER BY cout_seq_scan ASC;"
  },
  {
    "id": "sql3-c3-e2",
    "chapter": 3,
    "level": "n2",
    "language": "sql",
    "title": "Calcul du Cache Hit Ratio des tampons partagés (Shared Buffers)",
    "goal": "Évaluer l’efficacité du cache mémoire SGBD à partir de blks_hit et blks_read.",
    "brief": "<p>Dans la vue <code>pg_stat_database_sim(datname TEXT, blks_hit INT, blks_read INT)</code>, calculez le taux de succès du cache en pourcentage arrondi à 2 décimales : <code>ROUND(blks_hit * 100.0 / (blks_hit + blks_read), 2) AS hit_ratio_pct</code> pour chaque base, trié par <code>hit_ratio_pct</code> décroissant.</p>",
    "starter": "-- Calculez datname et hit_ratio_pct\nSELECT datname FROM pg_stat_database_sim;",
    "hints": [
      "Multipliez par 100.0 (flottant) avant de diviser par (blks_hit + blks_read).",
      "Enveloppez dans ROUND(..., 2) AS hit_ratio_pct."
    ],
    "examples": [
      {
        "stdin": "CREATE TABLE pg_stat_database_sim (datname TEXT, blks_hit INT, blks_read INT); INSERT INTO pg_stat_database_sim VALUES ('prod_erp', 9900, 100), ('reporting', 7500, 2500);\n-- exemple",
        "expected": "+-----------+---------------+\n| datname   | hit_ratio_pct |\n+-----------+---------------+\n| prod_erp  | 99            |\n| reporting | 75            |\n+-----------+---------------+\n(2 lignes retournées)",
        "note": "Résultat de la requête SQL sur la base d’exemple."
      }
    ],
    "tests": [
      {
        "label": "Base transactionnelle (99 %) et base reporting (75 %)",
        "stdin": "CREATE TABLE pg_stat_database_sim (datname TEXT, blks_hit INT, blks_read INT); INSERT INTO pg_stat_database_sim VALUES ('prod_erp', 9900, 100), ('reporting', 7500, 2500);",
        "expected": "+-----------+---------------+\n| datname   | hit_ratio_pct |\n+-----------+---------------+\n| prod_erp  | 99            |\n| reporting | 75            |\n+-----------+---------------+\n(2 lignes retournées)"
      },
      {
        "label": "Trois bases de données",
        "stdin": "CREATE TABLE pg_stat_database_sim (datname TEXT, blks_hit INT, blks_read INT); INSERT INTO pg_stat_database_sim VALUES ('db1', 950, 50), ('db2', 800, 200), ('db3', 999, 1);",
        "expected": "+---------+---------------+\n| datname | hit_ratio_pct |\n+---------+---------------+\n| db3     | 99.9          |\n| db1     | 95            |\n| db2     | 80            |\n+---------+---------------+\n(3 lignes retournées)"
      },
      {
        "label": "Cache froid à 50 %",
        "stdin": "CREATE TABLE pg_stat_database_sim (datname TEXT, blks_hit INT, blks_read INT); INSERT INTO pg_stat_database_sim VALUES ('test_db', 500, 500);",
        "expected": "+---------+---------------+\n| datname | hit_ratio_pct |\n+---------+---------------+\n| test_db | 50            |\n+---------+---------------+\n(1 ligne retournée)"
      }
    ],
    "solution": "-- Corrigé officiel sql3-c3-e2\nSELECT datname, ROUND(blks_hit * 100.0 / (blks_hit + blks_read), 2) AS hit_ratio_pct FROM pg_stat_database_sim ORDER BY hit_ratio_pct DESC;"
  },
  {
    "id": "sql3-c3-e3",
    "chapter": 3,
    "level": "n3",
    "language": "sql",
    "title": "Réécriture SARGable et index couvrant (Index-Only Scan)",
    "goal": "Créer un index couvrant et écrire une requête SARGable par intervalle.",
    "brief": "<p>Sur la table <code>commandes(id INT, annee INT, client_id INT, montant INT)</code>, créez un index couvrant <code>idx_cmd_annee_montant</code> sur <code>(annee, montant)</code>, puis calculez <code>SUM(montant) AS total_2025</code> pour <code>annee = 2025</code>.</p>",
    "starter": "-- Créez l’index couvrant idx_cmd_annee_montant puis calculez SUM(montant) AS total_2025\nSELECT SUM(montant) FROM commandes;",
    "hints": [
      "Créez d’abord CREATE INDEX idx_cmd_annee_montant ON commandes(annee, montant);",
      "Puis exécutez SELECT SUM(montant) AS total_2025 FROM commandes WHERE annee = 2025;"
    ],
    "examples": [
      {
        "stdin": "CREATE TABLE commandes (id INT, annee INT, client_id INT, montant INT); INSERT INTO commandes VALUES (1, 2024, 1, 10000), (2, 2025, 1, 25000), (3, 2025, 2, 15000);\n-- exemple",
        "expected": "Instruction exécutée avec succès (3 lignes modifiées).\n\n+------------+\n| total_2025 |\n+------------+\n| 40000      |\n+------------+\n(1 ligne retournée)",
        "note": "Résultat de la requête SQL sur la base d’exemple."
      }
    ],
    "tests": [
      {
        "label": "Deux commandes en 2025",
        "stdin": "CREATE TABLE commandes (id INT, annee INT, client_id INT, montant INT); INSERT INTO commandes VALUES (1, 2024, 1, 10000), (2, 2025, 1, 25000), (3, 2025, 2, 15000);",
        "expected": "Instruction exécutée avec succès (3 lignes modifiées).\n\n+------------+\n| total_2025 |\n+------------+\n| 40000      |\n+------------+\n(1 ligne retournée)"
      },
      {
        "label": "Trois années distinctes",
        "stdin": "CREATE TABLE commandes (id INT, annee INT, client_id INT, montant INT); INSERT INTO commandes VALUES (1, 2023, 1, 5000), (2, 2025, 2, 80000), (3, 2026, 3, 12000);",
        "expected": "Instruction exécutée avec succès (3 lignes modifiées).\n\n+------------+\n| total_2025 |\n+------------+\n| 80000      |\n+------------+\n(1 ligne retournée)"
      },
      {
        "label": "Trois commandes en 2025",
        "stdin": "CREATE TABLE commandes (id INT, annee INT, client_id INT, montant INT); INSERT INTO commandes VALUES (1, 2025, 1, 1000), (2, 2025, 2, 2000), (3, 2025, 3, 3000);",
        "expected": "Instruction exécutée avec succès (3 lignes modifiées).\n\n+------------+\n| total_2025 |\n+------------+\n| 6000       |\n+------------+\n(1 ligne retournée)"
      }
    ],
    "solution": "-- Corrigé officiel sql3-c3-e3\nCREATE INDEX idx_cmd_annee_montant ON commandes(annee, montant);\nSELECT SUM(montant) AS total_2025 FROM commandes WHERE annee = 2025;"
  },
  {
    "id": "sql3-c4-e1",
    "chapter": 4,
    "level": "n1",
    "language": "sql",
    "title": "Comparaison temporelle ligne à ligne avec LAG() OVER",
    "goal": "Utiliser la fonction de fenêtrage LAG() pour calculer l’écart avec la période précédente.",
    "brief": "<p>Dans la table <code>chiffre_affaires(mois INT, ca INT)</code>, affichez <code>mois</code>, <code>ca</code>, le CA du mois précédent (<code>LAG(ca, 1, 0) OVER (ORDER BY mois ASC) AS ca_precedent</code>) et la variation (<code>ca - LAG(ca, 1, 0) OVER (ORDER BY mois ASC) AS variation</code>), triés par <code>mois</code> croissant.</p>",
    "starter": "-- Utilisez LAG(ca, 1, 0) OVER (ORDER BY mois ASC)\nSELECT mois, ca FROM chiffre_affaires;",
    "hints": [
      "LAG(ca, 1, 0) renvoie la valeur de ca 1 ligne plus haut, ou 0 sur la toute première ligne.",
      "Calculez ca - LAG(ca, 1, 0) OVER (ORDER BY mois ASC) AS variation."
    ],
    "examples": [
      {
        "stdin": "CREATE TABLE chiffre_affaires (mois INT, ca INT); INSERT INTO chiffre_affaires VALUES (1, 100000), (2, 130000), (3, 115000);\n-- exemple",
        "expected": "+------+--------+--------------+-----------+\n| mois | ca     | ca_precedent | variation |\n+------+--------+--------------+-----------+\n| 1    | 100000 | 0            | 100000    |\n| 2    | 130000 | 100000       | 30000     |\n| 3    | 115000 | 130000       | -15000    |\n+------+--------+--------------+-----------+\n(3 lignes retournées)",
        "note": "Résultat de la requête SQL sur la base d’exemple."
      }
    ],
    "tests": [
      {
        "label": "Trois mois consécutifs",
        "stdin": "CREATE TABLE chiffre_affaires (mois INT, ca INT); INSERT INTO chiffre_affaires VALUES (1, 100000), (2, 130000), (3, 115000);",
        "expected": "+------+--------+--------------+-----------+\n| mois | ca     | ca_precedent | variation |\n+------+--------+--------------+-----------+\n| 1    | 100000 | 0            | 100000    |\n| 2    | 130000 | 100000       | 30000     |\n| 3    | 115000 | 130000       | -15000    |\n+------+--------+--------------+-----------+\n(3 lignes retournées)"
      },
      {
        "label": "Croissance continue sur quatre mois",
        "stdin": "CREATE TABLE chiffre_affaires (mois INT, ca INT); INSERT INTO chiffre_affaires VALUES (1, 50), (2, 75), (3, 100), (4, 150);",
        "expected": "+------+-----+--------------+-----------+\n| mois | ca  | ca_precedent | variation |\n+------+-----+--------------+-----------+\n| 1    | 50  | 0            | 50        |\n| 2    | 75  | 50           | 25        |\n| 3    | 100 | 75           | 25        |\n| 4    | 150 | 100          | 50        |\n+------+-----+--------------+-----------+\n(4 lignes retournées)"
      },
      {
        "label": "Deux mois",
        "stdin": "CREATE TABLE chiffre_affaires (mois INT, ca INT); INSERT INTO chiffre_affaires VALUES (1, 200000), (2, 180000);",
        "expected": "+------+--------+--------------+-----------+\n| mois | ca     | ca_precedent | variation |\n+------+--------+--------------+-----------+\n| 1    | 200000 | 0            | 200000    |\n| 2    | 180000 | 200000       | -20000    |\n+------+--------+--------------+-----------+\n(2 lignes retournées)"
      }
    ],
    "solution": "-- Corrigé officiel sql3-c4-e1\nSELECT mois, ca, LAG(ca, 1, 0) OVER (ORDER BY mois ASC) AS ca_precedent, ca - LAG(ca, 1, 0) OVER (ORDER BY mois ASC) AS variation FROM chiffre_affaires ORDER BY mois ASC;"
  },
  {
    "id": "sql3-c4-e2",
    "chapter": 4,
    "level": "n2",
    "language": "sql",
    "title": "Top-N par département avec DENSE_RANK() dans une CTE",
    "goal": "Extraire les 2 meilleurs salaires de chaque département sans trou de classement.",
    "brief": "<p>Dans la table <code>employes(nom, departement, salaire)</code>, utilisez une CTE calculant <code>DENSE_RANK() OVER (PARTITION BY departement ORDER BY salaire DESC) AS rang</code> pour afficher <code>departement</code>, <code>nom</code>, <code>salaire</code> et <code>rang</code> uniquement pour les employés classés aux rangs <code>1</code> ou <code>2</code> (<code>WHERE rang &lt;= 2</code>), triés par <code>departement</code> croissant, <code>rang</code> croissant et <code>nom</code> croissant.</p>",
    "starter": "-- Sélectionnez les rangs <= 2 par département avec DENSE_RANK()\nSELECT departement, nom, salaire FROM employes;",
    "hints": [
      "Une fonction de fenêtrage ne peut pas figurer directement dans WHERE : calculez-la dans une CTE WITH classement AS (...).",
      "Filtrez ensuite avec WHERE rang <= 2."
    ],
    "examples": [
      {
        "stdin": "CREATE TABLE employes (nom TEXT, departement TEXT, salaire INT); INSERT INTO employes VALUES ('Amina', 'IT', 500000), ('Koffi', 'IT', 400000), ('Yao', 'IT', 300000), ('Sena', 'RH', 450000);\n-- exemple",
        "expected": "+-------------+-------+---------+------+\n| departement | nom   | salaire | rang |\n+-------------+-------+---------+------+\n| IT          | Amina | 500000  | 1    |\n| IT          | Koffi | 400000  | 2    |\n| RH          | Sena  | 450000  | 1    |\n+-------------+-------+---------+------+\n(3 lignes retournées)",
        "note": "Résultat de la requête SQL sur la base d’exemple."
      }
    ],
    "tests": [
      {
        "label": "Trois employés en IT et un en RH",
        "stdin": "CREATE TABLE employes (nom TEXT, departement TEXT, salaire INT); INSERT INTO employes VALUES ('Amina', 'IT', 500000), ('Koffi', 'IT', 400000), ('Yao', 'IT', 300000), ('Sena', 'RH', 450000);",
        "expected": "+-------------+-------+---------+------+\n| departement | nom   | salaire | rang |\n+-------------+-------+---------+------+\n| IT          | Amina | 500000  | 1    |\n| IT          | Koffi | 400000  | 2    |\n| RH          | Sena  | 450000  | 1    |\n+-------------+-------+---------+------+\n(3 lignes retournées)"
      },
      {
        "label": "Ex-aequo au rang 1",
        "stdin": "CREATE TABLE employes (nom TEXT, departement TEXT, salaire INT); INSERT INTO employes VALUES ('Afi', 'Secu', 600000), ('Binta', 'Secu', 600000), ('Kodjo', 'Secu', 450000), ('Marc', 'Secu', 300000);",
        "expected": "+-------------+-------+---------+------+\n| departement | nom   | salaire | rang |\n+-------------+-------+---------+------+\n| Secu        | Afi   | 600000  | 1    |\n| Secu        | Binta | 600000  | 1    |\n| Secu        | Kodjo | 450000  | 2    |\n+-------------+-------+---------+------+\n(3 lignes retournées)"
      },
      {
        "label": "Deux départements",
        "stdin": "CREATE TABLE employes (nom TEXT, departement TEXT, salaire INT); INSERT INTO employes VALUES ('E1', 'A', 100), ('E2', 'A', 90), ('E3', 'A', 80), ('E4', 'B', 200);",
        "expected": "+-------------+-----+---------+------+\n| departement | nom | salaire | rang |\n+-------------+-----+---------+------+\n| A           | E1  | 100     | 1    |\n| A           | E2  | 90      | 2    |\n| B           | E4  | 200     | 1    |\n+-------------+-----+---------+------+\n(3 lignes retournées)"
      }
    ],
    "solution": "-- Corrigé officiel sql3-c4-e2\nWITH classement AS (\n  SELECT departement, nom, salaire, DENSE_RANK() OVER (PARTITION BY departement ORDER BY salaire DESC) AS rang\n  FROM employes\n)\nSELECT departement, nom, salaire, rang FROM classement WHERE rang <= 2 ORDER BY departement ASC, rang ASC, nom ASC;"
  },
  {
    "id": "sql3-c4-e3",
    "chapter": 4,
    "level": "n3",
    "language": "sql",
    "title": "Parcours d’arbre hiérarchique avec WITH RECURSIVE",
    "goal": "Écrire une CTE récursive pour calculer la profondeur hiérarchique d’un organigramme.",
    "brief": "<p>La table <code>organigramme(id INT, nom TEXT, manager_id INT)</code> représente la hiérarchie d’une entreprise (la racine a <code>manager_id IS NULL</code>). Écrivez une requête <code>WITH RECURSIVE hierarchie AS (...)</code> qui calcule pour chaque employé son <code>id</code>, son <code>nom</code> et son niveau hiérarchique <code>niveau</code> (<code>1</code> pour la racine, puis <code>h.niveau + 1</code> pour chaque subordonné), triée par <code>niveau</code> croissant puis <code>id</code> croissant.</p>",
    "starter": "-- Écrivez une CTE WITH RECURSIVE hierarchie(id, nom, niveau)\nSELECT id, nom FROM organigramme;",
    "hints": [
      "Le membre d’ancrage sélectionne la racine : SELECT id, nom, 1 FROM organigramme WHERE manager_id IS NULL.",
      "Après UNION ALL, joignez organigramme o à hierarchie h sur o.manager_id = h.id avec h.niveau + 1."
    ],
    "examples": [
      {
        "stdin": "CREATE TABLE organigramme (id INT, nom TEXT, manager_id INT); INSERT INTO organigramme VALUES (1, 'DG', NULL), (2, 'DSI', 1), (3, 'Admin Réseau', 2);\n-- exemple",
        "expected": "+----+--------------+--------+\n| id | nom          | niveau |\n+----+--------------+--------+\n| 1  | DG           | 1      |\n| 2  | DSI          | 2      |\n| 3  | Admin Réseau | 3      |\n+----+--------------+--------+\n(3 lignes retournées)",
        "note": "Résultat de la requête SQL sur la base d’exemple."
      }
    ],
    "tests": [
      {
        "label": "Hiérarchie à 3 niveaux",
        "stdin": "CREATE TABLE organigramme (id INT, nom TEXT, manager_id INT); INSERT INTO organigramme VALUES (1, 'DG', NULL), (2, 'DSI', 1), (3, 'Admin Réseau', 2);",
        "expected": "+----+--------------+--------+\n| id | nom          | niveau |\n+----+--------------+--------+\n| 1  | DG           | 1      |\n| 2  | DSI          | 2      |\n| 3  | Admin Réseau | 3      |\n+----+--------------+--------+\n(3 lignes retournées)"
      },
      {
        "label": "Arbre large à 2 branches",
        "stdin": "CREATE TABLE organigramme (id INT, nom TEXT, manager_id INT); INSERT INTO organigramme VALUES (1, 'PDG', NULL), (2, 'Dir Tech', 1), (3, 'Dir Fin', 1), (4, 'Dev Lead', 2), (5, 'Comptable', 3);",
        "expected": "+----+-----------+--------+\n| id | nom       | niveau |\n+----+-----------+--------+\n| 1  | PDG       | 1      |\n| 2  | Dir Tech  | 2      |\n| 3  | Dir Fin   | 2      |\n| 4  | Dev Lead  | 3      |\n| 5  | Comptable | 3      |\n+----+-----------+--------+\n(5 lignes retournées)"
      },
      {
        "label": "Racine et deux directeurs",
        "stdin": "CREATE TABLE organigramme (id INT, nom TEXT, manager_id INT); INSERT INTO organigramme VALUES (10, 'Recteur', NULL), (20, 'Doyen B1', 10), (30, 'Doyen B3', 10);",
        "expected": "+----+----------+--------+\n| id | nom      | niveau |\n+----+----------+--------+\n| 10 | Recteur  | 1      |\n| 20 | Doyen B1 | 2      |\n| 30 | Doyen B3 | 2      |\n+----+----------+--------+\n(3 lignes retournées)"
      }
    ],
    "solution": "-- Corrigé officiel sql3-c4-e3\nWITH RECURSIVE hierarchie(id, nom, niveau) AS (\n  SELECT id, nom, 1 FROM organigramme WHERE manager_id IS NULL\n  UNION ALL\n  SELECT o.id, o.nom, h.niveau + 1 FROM organigramme o INNER JOIN hierarchie h ON o.manager_id = h.id\n)\nSELECT id, nom, niveau FROM hierarchie ORDER BY niveau ASC, id ASC;"
  },
  {
    "id": "sql3-c5-e1",
    "chapter": 5,
    "level": "n1",
    "language": "sql",
    "title": "Déclencheur de protection contre les soldes négatifs (AFTER UPDATE + WHEN)",
    "goal": "Déclencher une alerte automatique sur condition métier dans un trigger SQL.",
    "brief": "<p>Soient <code>comptes(id INT, solde INT)</code> et <code>alertes_fraude(compte_id INT, montant_tente INT)</code>. Créez un trigger <code>trg_alerte_decouvert</code> qui, <code>AFTER UPDATE ON comptes WHEN NEW.solde &lt; 0</code>, insère <code>(NEW.id, NEW.solde)</code> dans <code>alertes_fraude</code>.</p>",
    "starter": "-- Créez le trigger conditionnel trg_alerte_decouvert avec WHEN NEW.solde < 0\nSELECT * FROM comptes;",
    "hints": [
      "Utilisez la clause WHEN NEW.solde < 0 avant BEGIN dans la définition du trigger.",
      "Insérez (NEW.id, NEW.solde) dans alertes_fraude."
    ],
    "examples": [
      {
        "stdin": "CREATE TABLE comptes (id INT, solde INT); CREATE TABLE alertes_fraude (compte_id INT, montant_tente INT); INSERT INTO comptes VALUES (1, 5000), (2, 10000);\n-- VERIFY:\nUPDATE comptes SET solde = -2000 WHERE id = 1; UPDATE comptes SET solde = 4000 WHERE id = 2; SELECT compte_id, montant_tente FROM alertes_fraude ORDER BY compte_id;\n-- exemple",
        "expected": "Instruction exécutée avec succès (2 lignes modifiées).\n\nInstruction exécutée avec succès (1 ligne modifiée).\n\nInstruction exécutée avec succès (1 ligne modifiée).\n\n+-----------+---------------+\n| compte_id | montant_tente |\n+-----------+---------------+\n| 1         | -2000         |\n+-----------+---------------+\n(1 ligne retournée)",
        "note": "Résultat de la requête SQL sur la base d’exemple."
      }
    ],
    "tests": [
      {
        "label": "Un passage à découvert détecté",
        "stdin": "CREATE TABLE comptes (id INT, solde INT); CREATE TABLE alertes_fraude (compte_id INT, montant_tente INT); INSERT INTO comptes VALUES (1, 5000), (2, 10000);\n-- VERIFY:\nUPDATE comptes SET solde = -2000 WHERE id = 1; UPDATE comptes SET solde = 4000 WHERE id = 2; SELECT compte_id, montant_tente FROM alertes_fraude ORDER BY compte_id;",
        "expected": "Instruction exécutée avec succès (2 lignes modifiées).\n\nInstruction exécutée avec succès (1 ligne modifiée).\n\nInstruction exécutée avec succès (1 ligne modifiée).\n\n+-----------+---------------+\n| compte_id | montant_tente |\n+-----------+---------------+\n| 1         | -2000         |\n+-----------+---------------+\n(1 ligne retournée)"
      },
      {
        "label": "Deux découverts détectés",
        "stdin": "CREATE TABLE comptes (id INT, solde INT); CREATE TABLE alertes_fraude (compte_id INT, montant_tente INT); INSERT INTO comptes VALUES (10, 1000), (20, 500);\n-- VERIFY:\nUPDATE comptes SET solde = solde - 1500; SELECT compte_id, montant_tente FROM alertes_fraude ORDER BY compte_id;",
        "expected": "Instruction exécutée avec succès (2 lignes modifiées).\n\nInstruction exécutée avec succès (2 lignes modifiées).\n\n+-----------+---------------+\n| compte_id | montant_tente |\n+-----------+---------------+\n| 10        | -500          |\n| 20        | -1000         |\n+-----------+---------------+\n(2 lignes retournées)"
      },
      {
        "label": "Solde nul non considéré comme découvert",
        "stdin": "CREATE TABLE comptes (id INT, solde INT); CREATE TABLE alertes_fraude (compte_id INT, montant_tente INT); INSERT INTO comptes VALUES (1, 1000), (2, 1000);\n-- VERIFY:\nUPDATE comptes SET solde = 0 WHERE id = 1; UPDATE comptes SET solde = -1 WHERE id = 2; SELECT compte_id, montant_tente FROM alertes_fraude ORDER BY compte_id;",
        "expected": "Instruction exécutée avec succès (2 lignes modifiées).\n\nInstruction exécutée avec succès (1 ligne modifiée).\n\nInstruction exécutée avec succès (1 ligne modifiée).\n\n+-----------+---------------+\n| compte_id | montant_tente |\n+-----------+---------------+\n| 2         | -1            |\n+-----------+---------------+\n(1 ligne retournée)"
      }
    ],
    "solution": "-- Corrigé officiel sql3-c5-e1\nCREATE TRIGGER trg_alerte_decouvert\nAFTER UPDATE ON comptes\nFOR EACH ROW\nWHEN NEW.solde < 0\nBEGIN\n  INSERT INTO alertes_fraude VALUES (NEW.id, NEW.solde);\nEND;"
  },
  {
    "id": "sql3-c5-e2",
    "chapter": 5,
    "level": "n2",
    "language": "sql",
    "title": "Isolation multi-locataires (Row-Level Security / Politique RLS)",
    "goal": "Simuler une politique d’isolation Row-Level Security filtrant selon le contexte de session.",
    "brief": "<p>Dans une architecture SaaS multi-tenant, la table <code>contexte_session(tenant_actif TEXT, role_actif TEXT)</code> contient 1 ligne décrivant l’utilisateur connecté, et la table <code>dossiers_patients(id INT, tenant_id TEXT, patient TEXT)</code> contient les données. Créez une vue sécurisée <code>v_dossiers_rls</code> qui renvoie <code>id</code>, <code>tenant_id</code> et <code>patient</code> uniquement lorsque <code>tenant_id = (SELECT tenant_actif FROM contexte_session)</code> OU lorsque <code>(SELECT role_actif FROM contexte_session) = 'SUPERADMIN'</code>.</p>",
    "starter": "-- Créez la vue v_dossiers_rls appliquant la politique RLS\nCREATE VIEW v_dossiers_rls AS SELECT id, tenant_id, patient FROM dossiers_patients WHERE 1 = 0;",
    "hints": [
      "Créez CREATE VIEW v_dossiers_rls AS SELECT id, tenant_id, patient FROM dossiers_patients WHERE ...",
      "Combinez les deux conditions avec OR."
    ],
    "examples": [
      {
        "stdin": "CREATE TABLE contexte_session (tenant_actif TEXT, role_actif TEXT); CREATE TABLE dossiers_patients (id INT, tenant_id TEXT, patient TEXT); INSERT INTO contexte_session VALUES ('clinique_a', 'MEDECIN'); INSERT INTO dossiers_patients VALUES (1, 'clinique_a', 'Koffi'), (2, 'clinique_b', 'Amina');\n-- VERIFY:\nSELECT id, tenant_id, patient FROM v_dossiers_rls ORDER BY id;\n-- exemple",
        "expected": "Instruction exécutée avec succès (2 lignes modifiées).\n\n+----+------------+---------+\n| id | tenant_id  | patient |\n+----+------------+---------+\n| 1  | clinique_a | Koffi   |\n+----+------------+---------+\n(1 ligne retournée)",
        "note": "Résultat de la requête SQL sur la base d’exemple."
      }
    ],
    "tests": [
      {
        "label": "Médecin de la clinique_a isolé sur son tenant",
        "stdin": "CREATE TABLE contexte_session (tenant_actif TEXT, role_actif TEXT); CREATE TABLE dossiers_patients (id INT, tenant_id TEXT, patient TEXT); INSERT INTO contexte_session VALUES ('clinique_a', 'MEDECIN'); INSERT INTO dossiers_patients VALUES (1, 'clinique_a', 'Koffi'), (2, 'clinique_b', 'Amina');\n-- VERIFY:\nSELECT id, tenant_id, patient FROM v_dossiers_rls ORDER BY id;",
        "expected": "Instruction exécutée avec succès (2 lignes modifiées).\n\n+----+------------+---------+\n| id | tenant_id  | patient |\n+----+------------+---------+\n| 1  | clinique_a | Koffi   |\n+----+------------+---------+\n(1 ligne retournée)"
      },
      {
        "label": "Superadmin accédant à tous les tenants",
        "stdin": "CREATE TABLE contexte_session (tenant_actif TEXT, role_actif TEXT); CREATE TABLE dossiers_patients (id INT, tenant_id TEXT, patient TEXT); INSERT INTO contexte_session VALUES ('aucun', 'SUPERADMIN'); INSERT INTO dossiers_patients VALUES (1, 'clinique_a', 'Koffi'), (2, 'clinique_b', 'Amina');\n-- VERIFY:\nSELECT id, tenant_id, patient FROM v_dossiers_rls ORDER BY id;",
        "expected": "Instruction exécutée avec succès (2 lignes modifiées).\n\n+----+------------+---------+\n| id | tenant_id  | patient |\n+----+------------+---------+\n| 1  | clinique_a | Koffi   |\n| 2  | clinique_b | Amina   |\n+----+------------+---------+\n(2 lignes retournées)"
      },
      {
        "label": "Clinique B avec deux dossiers",
        "stdin": "CREATE TABLE contexte_session (tenant_actif TEXT, role_actif TEXT); CREATE TABLE dossiers_patients (id INT, tenant_id TEXT, patient TEXT); INSERT INTO contexte_session VALUES ('clinique_b', 'INFIRMIER'); INSERT INTO dossiers_patients VALUES (1, 'clinique_a', 'Yao'), (2, 'clinique_b', 'Sena'), (3, 'clinique_b', 'Afi');\n-- VERIFY:\nSELECT id, tenant_id, patient FROM v_dossiers_rls ORDER BY id;",
        "expected": "Instruction exécutée avec succès (3 lignes modifiées).\n\n+----+------------+---------+\n| id | tenant_id  | patient |\n+----+------------+---------+\n| 2  | clinique_b | Sena    |\n| 3  | clinique_b | Afi     |\n+----+------------+---------+\n(2 lignes retournées)"
      }
    ],
    "solution": "-- Corrigé officiel sql3-c5-e2\nCREATE VIEW v_dossiers_rls AS\nSELECT id, tenant_id, patient FROM dossiers_patients\nWHERE tenant_id = (SELECT tenant_actif FROM contexte_session)\n   OR (SELECT role_actif FROM contexte_session) = 'SUPERADMIN';"
  },
  {
    "id": "sql3-c5-e3",
    "chapter": 5,
    "level": "n3",
    "language": "sql",
    "title": "Maintien automatique d’une table de matérialisation par Trigger",
    "goal": "Maintenir un compteur dénormalisé en temps réel à chaque insertion.",
    "brief": "<p>Soient <code>commandes(id INT, client_id INT, montant INT)</code> et la table de synthèse <code>stats_clients(client_id INT PRIMARY KEY, nb_cmd INT, cumul_montant INT)</code>. Créez un trigger <code>trg_maj_stats</code> qui, <code>AFTER INSERT ON commandes</code>, met à jour <code>stats_clients</code> (<code>SET nb_cmd = nb_cmd + 1, cumul_montant = cumul_montant + NEW.montant WHERE client_id = NEW.client_id</code>).</p>",
    "starter": "-- Créez le trigger trg_maj_stats AFTER INSERT ON commandes\nSELECT * FROM stats_clients;",
    "hints": [
      "Utilisez CREATE TRIGGER trg_maj_stats AFTER INSERT ON commandes FOR EACH ROW BEGIN ... END;",
      "Mettez à jour stats_clients avec NEW.montant et NEW.client_id."
    ],
    "examples": [
      {
        "stdin": "CREATE TABLE commandes (id INT, client_id INT, montant INT); CREATE TABLE stats_clients (client_id INT PRIMARY KEY, nb_cmd INT, cumul_montant INT); INSERT INTO stats_clients VALUES (1, 0, 0), (2, 1, 10000);\n-- VERIFY:\nINSERT INTO commandes VALUES (100, 1, 25000), (101, 2, 15000); SELECT client_id, nb_cmd, cumul_montant FROM stats_clients ORDER BY client_id;\n-- exemple",
        "expected": "Instruction exécutée avec succès (2 lignes modifiées).\n\nInstruction exécutée avec succès (2 lignes modifiées).\n\n+-----------+--------+---------------+\n| client_id | nb_cmd | cumul_montant |\n+-----------+--------+---------------+\n| 1         | 1      | 25000         |\n| 2         | 2      | 25000         |\n+-----------+--------+---------------+\n(2 lignes retournées)",
        "note": "Résultat de la requête SQL sur la base d’exemple."
      }
    ],
    "tests": [
      {
        "label": "Insertion d’une commande par client",
        "stdin": "CREATE TABLE commandes (id INT, client_id INT, montant INT); CREATE TABLE stats_clients (client_id INT PRIMARY KEY, nb_cmd INT, cumul_montant INT); INSERT INTO stats_clients VALUES (1, 0, 0), (2, 1, 10000);\n-- VERIFY:\nINSERT INTO commandes VALUES (100, 1, 25000), (101, 2, 15000); SELECT client_id, nb_cmd, cumul_montant FROM stats_clients ORDER BY client_id;",
        "expected": "Instruction exécutée avec succès (2 lignes modifiées).\n\nInstruction exécutée avec succès (2 lignes modifiées).\n\n+-----------+--------+---------------+\n| client_id | nb_cmd | cumul_montant |\n+-----------+--------+---------------+\n| 1         | 1      | 25000         |\n| 2         | 2      | 25000         |\n+-----------+--------+---------------+\n(2 lignes retournées)"
      },
      {
        "label": "Trois commandes pour le même client",
        "stdin": "CREATE TABLE commandes (id INT, client_id INT, montant INT); CREATE TABLE stats_clients (client_id INT PRIMARY KEY, nb_cmd INT, cumul_montant INT); INSERT INTO stats_clients VALUES (10, 0, 0);\n-- VERIFY:\nINSERT INTO commandes VALUES (1, 10, 5000), (2, 10, 7000), (3, 10, 8000); SELECT client_id, nb_cmd, cumul_montant FROM stats_clients ORDER BY client_id;",
        "expected": "Instruction exécutée avec succès (1 ligne modifiée).\n\nInstruction exécutée avec succès (3 lignes modifiées).\n\n+-----------+--------+---------------+\n| client_id | nb_cmd | cumul_montant |\n+-----------+--------+---------------+\n| 10        | 3      | 20000         |\n+-----------+--------+---------------+\n(1 ligne retournée)"
      },
      {
        "label": "Deux clients dont un sans nouvelle commande",
        "stdin": "CREATE TABLE commandes (id INT, client_id INT, montant INT); CREATE TABLE stats_clients (client_id INT PRIMARY KEY, nb_cmd INT, cumul_montant INT); INSERT INTO stats_clients VALUES (1, 2, 50000), (2, 0, 0);\n-- VERIFY:\nINSERT INTO commandes VALUES (1, 2, 12000); SELECT client_id, nb_cmd, cumul_montant FROM stats_clients ORDER BY client_id;",
        "expected": "Instruction exécutée avec succès (2 lignes modifiées).\n\nInstruction exécutée avec succès (1 ligne modifiée).\n\n+-----------+--------+---------------+\n| client_id | nb_cmd | cumul_montant |\n+-----------+--------+---------------+\n| 1         | 2      | 50000         |\n| 2         | 1      | 12000         |\n+-----------+--------+---------------+\n(2 lignes retournées)"
      }
    ],
    "solution": "-- Corrigé officiel sql3-c5-e3\nCREATE TRIGGER trg_maj_stats\nAFTER INSERT ON commandes\nFOR EACH ROW\nBEGIN\n  UPDATE stats_clients\n  SET nb_cmd = nb_cmd + 1, cumul_montant = cumul_montant + NEW.montant\n  WHERE client_id = NEW.client_id;\nEND;"
  },
  {
    "id": "sql3-c6-e1",
    "chapter": 6,
    "level": "n1",
    "language": "sql",
    "title": "Routage de partitions par intervalles de dates (Range Partitioning)",
    "goal": "Affecter et agréger les enregistrements par partition trimestrielle.",
    "brief": "<p>Dans la table <code>mesures_iot(id INT, mois INT, valeur INT)</code> où <code>mois</code> va de <code>1</code> à <code>12</code>, affichez le nom de la partition trimestrielle (<code>CASE WHEN mois &lt;= 3 THEN 'p_q1' WHEN mois &lt;= 6 THEN 'p_q2' WHEN mois &lt;= 9 THEN 'p_q3' ELSE 'p_q4' END AS partition_cible</code>), le nombre de lignes (<code>COUNT(*) AS nb_lignes</code>) et la somme des valeurs (<code>SUM(valeur) AS total_valeurs</code>), regroupés et triés par <code>partition_cible</code> croissante.</p>",
    "starter": "-- Regroupez les mesures par partition trimestrielle p_q1..p_q4\nSELECT mois, valeur FROM mesures_iot;",
    "hints": [
      "Utilisez l’expression CASE WHEN pour calculer partition_cible.",
      "Regroupez avec GROUP BY partition_cible ORDER BY partition_cible ASC."
    ],
    "examples": [
      {
        "stdin": "CREATE TABLE mesures_iot (id INT, mois INT, valeur INT); INSERT INTO mesures_iot VALUES (1, 2, 100), (2, 3, 150), (3, 5, 200), (4, 11, 300);\n-- exemple",
        "expected": "+-----------------+-----------+---------------+\n| partition_cible | nb_lignes | total_valeurs |\n+-----------------+-----------+---------------+\n| p_q1            | 2         | 250           |\n| p_q2            | 1         | 200           |\n| p_q4            | 1         | 300           |\n+-----------------+-----------+---------------+\n(3 lignes retournées)",
        "note": "Résultat de la requête SQL sur la base d’exemple."
      }
    ],
    "tests": [
      {
        "label": "Mesures réparties sur Q1, Q2 et Q4",
        "stdin": "CREATE TABLE mesures_iot (id INT, mois INT, valeur INT); INSERT INTO mesures_iot VALUES (1, 2, 100), (2, 3, 150), (3, 5, 200), (4, 11, 300);",
        "expected": "+-----------------+-----------+---------------+\n| partition_cible | nb_lignes | total_valeurs |\n+-----------------+-----------+---------------+\n| p_q1            | 2         | 250           |\n| p_q2            | 1         | 200           |\n| p_q4            | 1         | 300           |\n+-----------------+-----------+---------------+\n(3 lignes retournées)"
      },
      {
        "label": "Quatre trimestres complets",
        "stdin": "CREATE TABLE mesures_iot (id INT, mois INT, valeur INT); INSERT INTO mesures_iot VALUES (1, 1, 10), (2, 4, 20), (3, 7, 30), (4, 10, 40);",
        "expected": "+-----------------+-----------+---------------+\n| partition_cible | nb_lignes | total_valeurs |\n+-----------------+-----------+---------------+\n| p_q1            | 1         | 10            |\n| p_q2            | 1         | 20            |\n| p_q3            | 1         | 30            |\n| p_q4            | 1         | 40            |\n+-----------------+-----------+---------------+\n(4 lignes retournées)"
      },
      {
        "label": "Bornes exactes des trimestres (3, 6, 9, 12)",
        "stdin": "CREATE TABLE mesures_iot (id INT, mois INT, valeur INT); INSERT INTO mesures_iot VALUES (1, 3, 50), (2, 6, 60), (3, 9, 70), (4, 12, 80);",
        "expected": "+-----------------+-----------+---------------+\n| partition_cible | nb_lignes | total_valeurs |\n+-----------------+-----------+---------------+\n| p_q1            | 1         | 50            |\n| p_q2            | 1         | 60            |\n| p_q3            | 1         | 70            |\n| p_q4            | 1         | 80            |\n+-----------------+-----------+---------------+\n(4 lignes retournées)"
      }
    ],
    "solution": "-- Corrigé officiel sql3-c6-e1\nSELECT CASE WHEN mois <= 3 THEN 'p_q1' WHEN mois <= 6 THEN 'p_q2' WHEN mois <= 9 THEN 'p_q3' ELSE 'p_q4' END AS partition_cible, COUNT(*) AS nb_lignes, SUM(valeur) AS total_valeurs FROM mesures_iot GROUP BY partition_cible ORDER BY partition_cible ASC;"
  },
  {
    "id": "sql3-c6-e2",
    "chapter": 6,
    "level": "n2",
    "language": "sql",
    "title": "Surveillance du retard de réplication (Replication Lag LSN)",
    "goal": "Calculer le retard d’application WAL des réplicas et identifier les nœuds en alerte.",
    "brief": "<p>Dans la vue <code>pg_stat_replication_sim(application_name TEXT, sent_lsn_mb INT, replay_lsn_mb INT, sync_state TEXT)</code>, calculez le retard de réplication <code>sent_lsn_mb - replay_lsn_mb AS lag_mb</code> et affichez <code>application_name</code>, <code>sync_state</code> et <code>lag_mb</code> pour tous les réplicas, triés par <code>lag_mb</code> décroissant puis <code>application_name</code> croissant.</p>",
    "starter": "-- Calculez lag_mb = sent_lsn_mb - replay_lsn_mb pour chaque réplica\nSELECT application_name FROM pg_stat_replication_sim;",
    "hints": [
      "Soustrayez replay_lsn_mb de sent_lsn_mb et renommez la colonne AS lag_mb.",
      "Triez par lag_mb DESC, application_name ASC."
    ],
    "examples": [
      {
        "stdin": "CREATE TABLE pg_stat_replication_sim (application_name TEXT, sent_lsn_mb INT, replay_lsn_mb INT, sync_state TEXT); INSERT INTO pg_stat_replication_sim VALUES ('replica_dc1', 5000, 5000, 'sync'), ('replica_dc2', 5000, 4850, 'async');\n-- exemple",
        "expected": "+------------------+------------+--------+\n| application_name | sync_state | lag_mb |\n+------------------+------------+--------+\n| replica_dc2      | async      | 150    |\n| replica_dc1      | sync       | 0      |\n+------------------+------------+--------+\n(2 lignes retournées)",
        "note": "Résultat de la requête SQL sur la base d’exemple."
      }
    ],
    "tests": [
      {
        "label": "Un réplica synchrone à jour et un réplica asynchrone en retard",
        "stdin": "CREATE TABLE pg_stat_replication_sim (application_name TEXT, sent_lsn_mb INT, replay_lsn_mb INT, sync_state TEXT); INSERT INTO pg_stat_replication_sim VALUES ('replica_dc1', 5000, 5000, 'sync'), ('replica_dc2', 5000, 4850, 'async');",
        "expected": "+------------------+------------+--------+\n| application_name | sync_state | lag_mb |\n+------------------+------------+--------+\n| replica_dc2      | async      | 150    |\n| replica_dc1      | sync       | 0      |\n+------------------+------------+--------+\n(2 lignes retournées)"
      },
      {
        "label": "Trois réplicas",
        "stdin": "CREATE TABLE pg_stat_replication_sim (application_name TEXT, sent_lsn_mb INT, replay_lsn_mb INT, sync_state TEXT); INSERT INTO pg_stat_replication_sim VALUES ('standby_1', 1200, 1190, 'async'), ('standby_2', 1200, 1000, 'async'), ('standby_3', 1200, 1200, 'sync');",
        "expected": "+------------------+------------+--------+\n| application_name | sync_state | lag_mb |\n+------------------+------------+--------+\n| standby_2        | async      | 200    |\n| standby_1        | async      | 10     |\n| standby_3        | sync       | 0      |\n+------------------+------------+--------+\n(3 lignes retournées)"
      },
      {
        "label": "Aucun retard",
        "stdin": "CREATE TABLE pg_stat_replication_sim (application_name TEXT, sent_lsn_mb INT, replay_lsn_mb INT, sync_state TEXT); INSERT INTO pg_stat_replication_sim VALUES ('ha_node', 800, 800, 'sync');",
        "expected": "+------------------+------------+--------+\n| application_name | sync_state | lag_mb |\n+------------------+------------+--------+\n| ha_node          | sync       | 0      |\n+------------------+------------+--------+\n(1 ligne retournée)"
      }
    ],
    "solution": "-- Corrigé officiel sql3-c6-e2\nSELECT application_name, sync_state, sent_lsn_mb - replay_lsn_mb AS lag_mb FROM pg_stat_replication_sim ORDER BY lag_mb DESC, application_name ASC;"
  },
  {
    "id": "sql3-c6-e3",
    "chapter": 6,
    "level": "n3",
    "language": "sql",
    "title": "Élection du candidat de basculement automatique (Failover Patroni / HA)",
    "goal": "Sélectionner le meilleur réplica candidat à la promotion Primary selon santé et LSN.",
    "brief": "<p>Lors d’une panne du serveur primaire, Patroni élit parmi la table <code>cluster_nodes(node_name TEXT, role TEXT, healthy INT, received_lsn INT, priority INT)</code> le nœud qui vérifie <code>role = 'REPLICA' AND healthy = 1</code> ayant le plus grand <code>received_lsn</code> (et en cas d’égalité la plus grande <code>priority</code>). Écrivez la requête SQL qui retourne <code>node_name</code>, <code>received_lsn</code> et <code>priority</code> du seul meilleur candidat (<code>LIMIT 1</code>).</p>",
    "starter": "-- Sélectionnez le meilleur candidat REPLICA sain avec ORDER BY ... LIMIT 1\nSELECT node_name, received_lsn, priority FROM cluster_nodes;",
    "hints": [
      "Filtrez avec WHERE role = 'REPLICA' AND healthy = 1.",
      "Triez avec ORDER BY received_lsn DESC, priority DESC LIMIT 1."
    ],
    "examples": [
      {
        "stdin": "CREATE TABLE cluster_nodes (node_name TEXT, role TEXT, healthy INT, received_lsn INT, priority INT); INSERT INTO cluster_nodes VALUES ('pg-1', 'PRIMARY', 0, 9000, 100), ('pg-2', 'REPLICA', 1, 8990, 90), ('pg-3', 'REPLICA', 1, 9000, 80);\n-- exemple",
        "expected": "+-----------+--------------+----------+\n| node_name | received_lsn | priority |\n+-----------+--------------+----------+\n| pg-3      | 9000         | 80       |\n+-----------+--------------+----------+\n(1 ligne retournée)",
        "note": "Résultat de la requête SQL sur la base d’exemple."
      }
    ],
    "tests": [
      {
        "label": "Élection sur le LSN le plus avancé",
        "stdin": "CREATE TABLE cluster_nodes (node_name TEXT, role TEXT, healthy INT, received_lsn INT, priority INT); INSERT INTO cluster_nodes VALUES ('pg-1', 'PRIMARY', 0, 9000, 100), ('pg-2', 'REPLICA', 1, 8990, 90), ('pg-3', 'REPLICA', 1, 9000, 80);",
        "expected": "+-----------+--------------+----------+\n| node_name | received_lsn | priority |\n+-----------+--------------+----------+\n| pg-3      | 9000         | 80       |\n+-----------+--------------+----------+\n(1 ligne retournée)"
      },
      {
        "label": "Départage par priorité à LSN égal",
        "stdin": "CREATE TABLE cluster_nodes (node_name TEXT, role TEXT, healthy INT, received_lsn INT, priority INT); INSERT INTO cluster_nodes VALUES ('pg-2', 'REPLICA', 1, 5000, 50), ('pg-3', 'REPLICA', 1, 5000, 100), ('pg-4', 'REPLICA', 0, 5500, 200);",
        "expected": "+-----------+--------------+----------+\n| node_name | received_lsn | priority |\n+-----------+--------------+----------+\n| pg-3      | 5000         | 100      |\n+-----------+--------------+----------+\n(1 ligne retournée)"
      },
      {
        "label": "Seul réplica sain disponible",
        "stdin": "CREATE TABLE cluster_nodes (node_name TEXT, role TEXT, healthy INT, received_lsn INT, priority INT); INSERT INTO cluster_nodes VALUES ('pg-dr', 'REPLICA', 1, 4200, 10), ('pg-dead', 'REPLICA', 0, 4300, 99);",
        "expected": "+-----------+--------------+----------+\n| node_name | received_lsn | priority |\n+-----------+--------------+----------+\n| pg-dr     | 4200         | 10       |\n+-----------+--------------+----------+\n(1 ligne retournée)"
      }
    ],
    "solution": "-- Corrigé officiel sql3-c6-e3\nSELECT node_name, received_lsn, priority FROM cluster_nodes WHERE role = 'REPLICA' AND healthy = 1 ORDER BY received_lsn DESC, priority DESC LIMIT 1;"
  }
];

module.exports = SQL3_EXERCISES;
