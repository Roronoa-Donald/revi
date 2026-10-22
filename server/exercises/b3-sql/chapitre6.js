'use strict';

module.exports = [
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
        "stdin": "CREATE TABLE mesures_iot (id INT, mois INT, valeur INT); INSERT INTO mesures_iot VALUES (1, 2, 100), (2, 3, 150), (3, 5, 200), (4, 11, 300);",
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
    "solution": "SELECT CASE WHEN mois <= 3 THEN 'p_q1' WHEN mois <= 6 THEN 'p_q2' WHEN mois <= 9 THEN 'p_q3' ELSE 'p_q4' END AS partition_cible, COUNT(*) AS nb_lignes, SUM(valeur) AS total_valeurs FROM mesures_iot GROUP BY partition_cible ORDER BY partition_cible ASC;"
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
        "stdin": "CREATE TABLE pg_stat_replication_sim (application_name TEXT, sent_lsn_mb INT, replay_lsn_mb INT, sync_state TEXT); INSERT INTO pg_stat_replication_sim VALUES ('replica_dc1', 5000, 5000, 'sync'), ('replica_dc2', 5000, 4850, 'async');",
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
    "solution": "SELECT application_name, sync_state, sent_lsn_mb - replay_lsn_mb AS lag_mb FROM pg_stat_replication_sim ORDER BY lag_mb DESC, application_name ASC;"
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
        "stdin": "CREATE TABLE cluster_nodes (node_name TEXT, role TEXT, healthy INT, received_lsn INT, priority INT); INSERT INTO cluster_nodes VALUES ('pg-1', 'PRIMARY', 0, 9000, 100), ('pg-2', 'REPLICA', 1, 8990, 90), ('pg-3', 'REPLICA', 1, 9000, 80);",
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
    "solution": "SELECT node_name, received_lsn, priority FROM cluster_nodes WHERE role = 'REPLICA' AND healthy = 1 ORDER BY received_lsn DESC, priority DESC LIMIT 1;"
  }
];
