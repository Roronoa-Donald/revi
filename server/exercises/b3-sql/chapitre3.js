'use strict';

module.exports = [
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
        "stdin": "CREATE TABLE pg_class_sim (relname TEXT, relpages INT, reltuples INT); INSERT INTO pg_class_sim VALUES ('factures', 100, 10000), ('agences', 2, 50);",
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
    "solution": "SELECT relname, ROUND(relpages * 1.0 + reltuples * 0.01, 2) AS cout_seq_scan FROM pg_class_sim ORDER BY cout_seq_scan ASC;"
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
        "stdin": "CREATE TABLE pg_stat_database_sim (datname TEXT, blks_hit INT, blks_read INT); INSERT INTO pg_stat_database_sim VALUES ('prod_erp', 9900, 100), ('reporting', 7500, 2500);",
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
    "solution": "SELECT datname, ROUND(blks_hit * 100.0 / (blks_hit + blks_read), 2) AS hit_ratio_pct FROM pg_stat_database_sim ORDER BY hit_ratio_pct DESC;"
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
        "stdin": "CREATE TABLE commandes (id INT, annee INT, client_id INT, montant INT); INSERT INTO commandes VALUES (1, 2024, 1, 10000), (2, 2025, 1, 25000), (3, 2025, 2, 15000);",
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
    "solution": "CREATE INDEX idx_cmd_annee_montant ON commandes(annee, montant);\nSELECT SUM(montant) AS total_2025 FROM commandes WHERE annee = 2025;"
  }
];
