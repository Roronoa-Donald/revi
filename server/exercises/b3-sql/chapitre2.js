'use strict';

module.exports = [
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
        "stdin": "CREATE TABLE commandes (id INT, code_pays TEXT, email_client TEXT); INSERT INTO commandes VALUES (1, 'TG', 'a@x.tg'), (2, 'TG', 'b@x.tg'), (3, 'SN', 'c@x.sn'), (4, 'TG', 'a@x.tg');",
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
    "solution": "SELECT COUNT(*) AS total_lignes, COUNT(DISTINCT code_pays) AS card_pays, COUNT(DISTINCT email_client) AS card_email FROM commandes;"
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
        "stdin": "CREATE TABLE commandes (id INT, client_id INT, statut TEXT, montant INT); INSERT INTO commandes VALUES (1, 10, 'ARCHIVEE', 5000), (2, 10, 'EN_COURS', 12000), (3, 20, 'EN_COURS', 8000);",
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
    "solution": "CREATE INDEX idx_cmd_en_cours ON commandes(client_id) WHERE statut = 'EN_COURS';\nSELECT id, montant FROM commandes WHERE client_id = 10 AND statut = 'EN_COURS' ORDER BY id ASC;"
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
        "stdin": "CREATE TABLE pg_stat_user_tables_sim (relname TEXT, n_live_tup INT, n_dead_tup INT); INSERT INTO pg_stat_user_tables_sim VALUES ('commandes', 1000, 300), ('clients', 1000, 100), ('sessions', 200, 120);",
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
    "solution": "SELECT relname, n_live_tup, n_dead_tup FROM pg_stat_user_tables_sim WHERE n_dead_tup > 50 + 0.20 * n_live_tup ORDER BY n_dead_tup DESC;"
  }
];
