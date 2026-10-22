'use strict';

module.exports = [
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
        "stdin": "CREATE TABLE wal_journal (lsn INT, tx_id INT, op TEXT); INSERT INTO wal_journal VALUES (1, 100, 'BEGIN'), (2, 100, 'UPDATE'), (3, 100, 'COMMIT'), (4, 101, 'BEGIN'), (5, 101, 'UPDATE');",
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
    "solution": "SELECT DISTINCT tx_id FROM wal_journal WHERE tx_id NOT IN (SELECT tx_id FROM wal_journal WHERE op IN ('COMMIT', 'ROLLBACK')) ORDER BY tx_id ASC;"
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
        "stdin": "CREATE TABLE mvcc_tuples (tuple_id INT, xmin INT, xmax INT, valeur TEXT); INSERT INTO mvcc_tuples VALUES (1, 10, 30, 'v1_supprimee'), (2, 30, 0, 'v2_visible'), (3, 60, 0, 'v3_future');",
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
    "solution": "SELECT tuple_id, valeur FROM mvcc_tuples WHERE xmin < 50 AND (xmax = 0 OR xmax >= 50) ORDER BY tuple_id ASC;"
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
        "stdin": "CREATE TABLE pg_locks_sim (pid INT, ressource TEXT, accorde INT); INSERT INTO pg_locks_sim VALUES (101, 'ligne_42', 1), (102, 'ligne_42', 0), (103, 'ligne_99', 1);",
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
    "solution": "SELECT a.pid AS pid_bloque, d.pid AS pid_bloqueur, a.ressource FROM pg_locks_sim a INNER JOIN pg_locks_sim d ON a.ressource = d.ressource WHERE a.accorde = 0 AND d.accorde = 1 ORDER BY pid_bloque ASC;"
  }
];
