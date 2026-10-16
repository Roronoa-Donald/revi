'use strict';

module.exports = [
  {
    "id": "sql3-c3-e1",
    "chapter": 3,
    "title": "Parseur et estimateur de coût de plan d’exécution EXPLAIN",
    "level": "n1",
    "language": "analyse",
    "goal": "Analyser les lignes d’un plan d’exécution PostgreSQL pour extraire les nœuds d’accès et les métriques de coût.",
    "brief": "Dans PostgreSQL, la commande `EXPLAIN` renvoie l’arbre des opérations planifiées par le Cost-Based Optimizer (CBO).\nChaque nœud de plan indique son algorithme et ses métriques standard :\n`-> Node_Type on Target_Relation (cost=startup..total rows=N width=W)`\n- `startup` : coût estimé pour produire la toute première ligne de résultat.\n- `total` : coût total estimé pour consommer l’ensemble des lignes du nœud.\n- `rows` : estimation du nombre de lignes produites.\n- `width` : taille moyenne en octets de chaque tuple produit.\n\nEntrée :\nDes lignes de plan au format standard PostgreSQL (Seq Scan, Index Scan, Bitmap Heap Scan, etc.).\n\nSortie :\n- Pour chaque nœud analysé :\n  `NODE type=<NODE_TYPE> target=<TARGET> startup=<STARTUP> total=<TOTAL> rows=<ROWS> width=<WIDTH>`\n- En fin de traitement : `SUMMARY nodes_count=<N> max_total_cost=<MAX_TOTAL>`",
    "starter": "# Grille d'analyse (sql3-c3-e1) — Parseur et estimateur de coût de plan d’exécution EXPLAIN\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Bitmap Heap Scan et Bitmap Index Scan]\n# Données : -> Bitmap Heap Scan on factures (cost=12.50..128.00 rows=350 width=64)\n# Données : -> Bitmap Index Scan on idx_factures_date (cost=0.00..8.25 rows=350 width=0)\nA_COMPLETER\n\n[Cas 2 — Nœud unique Index Only Scan]\n# Données : -> Index Only Scan using idx_articles_prix on articles (cost=0.28..4.30 rows=5 width=12)\nA_COMPLETER\n\n[Cas 3 — Trois opérations chaînées]\n# Données : -> Seq Scan on logs (cost=0.00..9800.00 rows=500000 width=80)\n# Données : -> Hash (cost=450.00..450.00 rows=12000 width=36)\n# Données : -> Nested Loop (cost=0.42..85.00 rows=15 width=116)\nA_COMPLETER\n",
    "hints": [
      "Utiliser une expression régulière pour capturer le type de nœud, la relation cible, ainsi que les champs cost, rows et width.",
      "Pattern type : r\"(?:->\\s+)?([A-Za-z\\s]+?)(?:\\s+on\\s+([A-Za-z0-9_]+))?\\s+\\(cost=([0-9.]+)\\.\\.([0-9.]+)\\s+rows=([0-9]+)\\s+width=([0-9]+)\\)\"",
      "Normaliser les espaces du type de nœud et convertir les coûts en flottants."
    ],
    "examples": [
      {
        "stdin": "-> Seq Scan on utilisateurs (cost=0.00..450.50 rows=12000 width=36)\n-> Index Scan using idx_commandes on commandes (cost=0.42..8.44 rows=10 width=48)",
        "expected": "NODE type=Seq Scan target=utilisateurs startup=0.00 total=450.50 rows=12000 width=36\nNODE type=Index Scan target=commandes startup=0.42 total=8.44 rows=10 width=48\nSUMMARY nodes_count=2 max_total_cost=450.50",
        "note": "Deux nœuds parsés avec calcul du coût maximal."
      }
    ],
    "tests": [
      {
        "label": "Bitmap Heap Scan et Bitmap Index Scan",
        "stdin": "cas:1",
        "expected": "NODE type=Bitmap Heap Scan target=factures startup=12.50 total=128.00 rows=350 width=64\nNODE type=Bitmap Index Scan target=idx_factures_date startup=0.00 total=8.25 rows=350 width=0\nSUMMARY nodes_count=2 max_total_cost=128.00"
      },
      {
        "label": "Nœud unique Index Only Scan",
        "stdin": "cas:2",
        "expected": "NODE type=Index Only Scan target=articles startup=0.28 total=4.30 rows=5 width=12\nSUMMARY nodes_count=1 max_total_cost=4.30"
      },
      {
        "label": "Trois opérations chaînées",
        "stdin": "cas:3",
        "expected": "NODE type=Seq Scan target=logs startup=0.00 total=9800.00 rows=500000 width=80\nNODE type=Hash target=none startup=450.00 total=450.00 rows=12000 width=36\nNODE type=Nested Loop target=none startup=0.42 total=85.00 rows=15 width=116\nSUMMARY nodes_count=3 max_total_cost=9800.00"
      }
    ],
    "solution": "[Exemple]\nNODE type=Seq Scan target=utilisateurs startup=0.00 total=450.50 rows=12000 width=36\nNODE type=Index Scan target=commandes startup=0.42 total=8.44 rows=10 width=48\nSUMMARY nodes_count=2 max_total_cost=450.50\n\n[Cas 1 — Bitmap Heap Scan et Bitmap Index Scan]\nNODE type=Bitmap Heap Scan target=factures startup=12.50 total=128.00 rows=350 width=64\nNODE type=Bitmap Index Scan target=idx_factures_date startup=0.00 total=8.25 rows=350 width=0\nSUMMARY nodes_count=2 max_total_cost=128.00\n\n[Cas 2 — Nœud unique Index Only Scan]\nNODE type=Index Only Scan target=articles startup=0.28 total=4.30 rows=5 width=12\nSUMMARY nodes_count=1 max_total_cost=4.30\n\n[Cas 3 — Trois opérations chaînées]\nNODE type=Seq Scan target=logs startup=0.00 total=9800.00 rows=500000 width=80\nNODE type=Hash target=none startup=450.00 total=450.00 rows=12000 width=36\nNODE type=Nested Loop target=none startup=0.42 total=85.00 rows=15 width=116\nSUMMARY nodes_count=3 max_total_cost=9800.00"
  },
  {
    "id": "sql3-c3-e2",
    "chapter": 3,
    "title": "Simulateur de sélection d’algorithme de jointure (Nested Loop vs Hash vs Merge)",
    "level": "n2",
    "language": "analyse",
    "goal": "Simuler le choix de l’optimiseur de requêtes pour sélectionner le meilleur algorithme de jointure.",
    "brief": "Dans les SGBDR modernes, l’optimiseur CBO choisit entre trois algorithmes fondamentaux pour joindre deux relations $R$ (externe) et $S$ (interne) :\n- `NESTED_LOOP` : optimal si l’une des tables est très petite ($N \\le 100$) et que la table interne dispose d’un index sur la clé de jointure, ou pour les jointures sans condition d’égalité.\n- `MERGE_JOIN` : optimal si les deux relations sont déjà triées sur la condition de jointure (ou alimentées par un Index Scan B-Tree pré-trié) ; complexité $O(N + M)$.\n- `HASH_JOIN` : optimal pour les tables moyennes à grandes non triées sur une condition d’égalité (`join_op=eq`), où la plus petite table tient dans la mémoire de travail `work_mem`.\n\nEntrée :\n`JOIN t1=<name> r1=<rows> indexed1=<true|false> sorted1=<true|false> t2=<name> r2=<rows> indexed2=<true|false> sorted2=<true|false> op=<eq|other>`\n\nSortie :\n`JOIN_DECISION algo=<NESTED_LOOP|MERGE_JOIN|HASH_JOIN> outer_table=<t> inner_table=<t> complexity=<O(N*M)|O(N+M)|O(N*logM)> reason=<REASON>`",
    "starter": "# Grille d'analyse (sql3-c3-e2) — Simulateur de sélection d’algorithme de jointure (Nested Loop vs Hash vs Merge)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Deux tables pré-triées sur égalité favorisant le Merge Join]\n# Données : JOIN t1=ventes_2025 r1=80000 indexed1=true sorted1=true t2=articles r2=15000 indexed2=true sorted2=true op=eq\nA_COMPLETER\n\n[Cas 2 — Grandes tables non triées sur égalité favorisant le Hash Join]\n# Données : JOIN t1=logs r1=500000 indexed1=false sorted1=false t2=utilisateurs r2=20000 indexed2=true sorted2=false op=eq\nA_COMPLETER\n\n[Cas 3 — Jointure avec opérateur d inégalité]\n# Données : JOIN t1=plages r1=500 indexed1=false sorted1=false t2=tarifs r2=200 indexed2=false sorted2=false op=other\nA_COMPLETER\n",
    "hints": [
      "Si op != eq : Hash Join et Merge Join sont impossibles -> forcer NESTED_LOOP.",
      "Si sorted1 == true et sorted2 == true et op == eq : recommander MERGE_JOIN.",
      "Si min(r1, r2) <= 100 et l’autre table a un index : recommander NESTED_LOOP.",
      "Sinon sur égalité op == eq : recommander HASH_JOIN (la plus petite table devient la build table inner)."
    ],
    "examples": [
      {
        "stdin": "JOIN t1=clients r1=50 indexed1=true sorted1=false t2=commandes r2=100000 indexed2=true sorted2=false op=eq",
        "expected": "JOIN_DECISION algo=NESTED_LOOP outer_table=clients inner_table=commandes complexity=O(N*logM) reason=SMALL_OUTER_WITH_INNER_INDEX",
        "note": "Petite table clients (50 lignes) bouclant sur l’index de commandes."
      }
    ],
    "tests": [
      {
        "label": "Deux tables pré-triées sur égalité favorisant le Merge Join",
        "stdin": "cas:1",
        "expected": "JOIN_DECISION algo=MERGE_JOIN outer_table=ventes_2025 inner_table=articles complexity=O(N+M) reason=BOTH_INPUTS_PRE_SORTED"
      },
      {
        "label": "Grandes tables non triées sur égalité favorisant le Hash Join",
        "stdin": "cas:2",
        "expected": "JOIN_DECISION algo=HASH_JOIN outer_table=logs inner_table=utilisateurs complexity=O(N+M) reason=HASH_TABLE_ON_SMALLER_RELATION"
      },
      {
        "label": "Jointure avec opérateur d inégalité",
        "stdin": "cas:3",
        "expected": "JOIN_DECISION algo=NESTED_LOOP outer_table=tarifs inner_table=plages complexity=O(N*M) reason=NON_EQUALITY_PREDICATE"
      }
    ],
    "solution": "[Exemple]\nJOIN_DECISION algo=NESTED_LOOP outer_table=clients inner_table=commandes complexity=O(N*logM) reason=SMALL_OUTER_WITH_INNER_INDEX\n\n[Cas 1 — Deux tables pré-triées sur égalité favorisant le Merge Join]\nJOIN_DECISION algo=MERGE_JOIN outer_table=ventes_2025 inner_table=articles complexity=O(N+M) reason=BOTH_INPUTS_PRE_SORTED\n\n[Cas 2 — Grandes tables non triées sur égalité favorisant le Hash Join]\nJOIN_DECISION algo=HASH_JOIN outer_table=logs inner_table=utilisateurs complexity=O(N+M) reason=HASH_TABLE_ON_SMALLER_RELATION\n\n[Cas 3 — Jointure avec opérateur d inégalité]\nJOIN_DECISION algo=NESTED_LOOP outer_table=tarifs inner_table=plages complexity=O(N*M) reason=NON_EQUALITY_PREDICATE"
  },
  {
    "id": "sql3-c3-e3",
    "chapter": 3,
    "title": "Détecteur d’écart de cardinalité (Estimation vs Actual Rows)",
    "level": "n3",
    "language": "analyse",
    "goal": "Détecter les dérives majeures entre lignes estimées et lignes réelles dans un plan EXPLAIN ANALYZE et recommander les actions correctives.",
    "brief": "L’optimiseur de requêtes se base sur les statistiques stockées dans `pg_statistic` (fréquences des valeurs les plus courantes MCV, histogrammes de distribution) pour choisir les plans d’exécution.\nSi ces statistiques sont obsolètes, un écart colossal apparaît entre le nombre de lignes estimé (`est_rows`) et le nombre réel de lignes parcourues (`act_rows`).\nCritères d’évaluation du ratio $R = \\max(\\text{est}, \\text{act}) / \\min(\\text{est}, \\text{act})$ (avec $\\min \\ge 1$) :\n- Si $R < 2.0$ : `ACCURATE` (statistiques fidèles).\n- Si $2.0 \\le R < 10.0$ : `MODERATE_DRIFT` (écart tolérable, surveillance).\n- Si $R \\ge 10.0$ : `SEVERE_DRIFT` (alerte critique : l’optimiseur a pu choisir un Nested Loop désastreux au lieu d’un Hash Join).\n\nEntrée :\n`STAT_CHECK node=<name> table=<table> est_rows=<E> act_rows=<A>`\n\nSortie :\n`DRIFT_ANALYSIS node=<name> table=<table> est=<E> act=<A> ratio=<R.2f> status=<ACCURATE|MODERATE_DRIFT|SEVERE_DRIFT> action=<NONE|MONITOR|RUN_ANALYZE_TABLE>`",
    "starter": "# Grille d'analyse (sql3-c3-e3) — Détecteur d’écart de cardinalité (Estimation vs Actual Rows)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Statistiques précises avec ratio inférieur à 2]\n# Données : STAT_CHECK node=idx_scan table=utilisateurs est_rows=1200 act_rows=1250\nA_COMPLETER\n\n[Cas 2 — Dérive modérée entre 2 et 10]\n# Données : STAT_CHECK node=bitmap_scan table=produits est_rows=400 act_rows=1500\nA_COMPLETER\n\n[Cas 3 — Sous-estimation critique (1 ligne estimée contre 1000 réelles)]\n# Données : STAT_CHECK node=nested_loop table=lignes_factures est_rows=1 act_rows=1200\nA_COMPLETER\n",
    "hints": [
      "Calculer ratio = max(est, act) / max(1, min(est, act)).",
      "Classifier selon les seuils 2.0 et 10.0.",
      "Si SEVERE_DRIFT : action=RUN_ANALYZE_TABLE."
    ],
    "examples": [
      {
        "stdin": "STAT_CHECK node=seq_scan table=commandes est_rows=10 act_rows=8500",
        "expected": "DRIFT_ANALYSIS node=seq_scan table=commandes est=10 act=8500 ratio=850.00 status=SEVERE_DRIFT action=RUN_ANALYZE_TABLE",
        "note": "Ratio de 850 : statistiques totalement erronées nécessitant un ANALYZE."
      }
    ],
    "tests": [
      {
        "label": "Statistiques précises avec ratio inférieur à 2",
        "stdin": "cas:1",
        "expected": "DRIFT_ANALYSIS node=idx_scan table=utilisateurs est=1200 act=1250 ratio=1.04 status=ACCURATE action=NONE"
      },
      {
        "label": "Dérive modérée entre 2 et 10",
        "stdin": "cas:2",
        "expected": "DRIFT_ANALYSIS node=bitmap_scan table=produits est=400 act=1500 ratio=3.75 status=MODERATE_DRIFT action=MONITOR"
      },
      {
        "label": "Sous-estimation critique (1 ligne estimée contre 1000 réelles)",
        "stdin": "cas:3",
        "expected": "DRIFT_ANALYSIS node=nested_loop table=lignes_factures est=1 act=1200 ratio=1200.00 status=SEVERE_DRIFT action=RUN_ANALYZE_TABLE"
      }
    ],
    "solution": "[Exemple]\nDRIFT_ANALYSIS node=seq_scan table=commandes est=10 act=8500 ratio=850.00 status=SEVERE_DRIFT action=RUN_ANALYZE_TABLE\n\n[Cas 1 — Statistiques précises avec ratio inférieur à 2]\nDRIFT_ANALYSIS node=idx_scan table=utilisateurs est=1200 act=1250 ratio=1.04 status=ACCURATE action=NONE\n\n[Cas 2 — Dérive modérée entre 2 et 10]\nDRIFT_ANALYSIS node=bitmap_scan table=produits est=400 act=1500 ratio=3.75 status=MODERATE_DRIFT action=MONITOR\n\n[Cas 3 — Sous-estimation critique (1 ligne estimée contre 1000 réelles)]\nDRIFT_ANALYSIS node=nested_loop table=lignes_factures est=1 act=1200 ratio=1200.00 status=SEVERE_DRIFT action=RUN_ANALYZE_TABLE"
  }
];
