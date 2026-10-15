// server/exercises/b3-sql/chapitre3.js
// Exercices du Module 3 : Analyse des Plans d'Exécution EXPLAIN (ANALYZE, BUFFERS) & Optimiseur CBO (idPrefix: sql3)

module.exports = [
  {
    id: 'sql3-c3-e1',
    chapter: 3,
    title: 'Parseur et estimateur de coût de plan d’exécution EXPLAIN',
    level: 'n1',
    language: 'python',
    goal: 'Analyser les lignes d’un plan d’exécution PostgreSQL pour extraire les nœuds d’accès et les métriques de coût.',
    brief:
      'Dans PostgreSQL, la commande `EXPLAIN` renvoie l’arbre des opérations planifiées par le Cost-Based Optimizer (CBO).\n' +
      'Chaque nœud de plan indique son algorithme et ses métriques standard :\n' +
      '`-> Node_Type on Target_Relation (cost=startup..total rows=N width=W)`\n' +
      '- `startup` : coût estimé pour produire la toute première ligne de résultat.\n' +
      '- `total` : coût total estimé pour consommer l’ensemble des lignes du nœud.\n' +
      '- `rows` : estimation du nombre de lignes produites.\n' +
      '- `width` : taille moyenne en octets de chaque tuple produit.\n\n' +
      'Entrée :\n' +
      'Des lignes de plan au format standard PostgreSQL (Seq Scan, Index Scan, Bitmap Heap Scan, etc.).\n\n' +
      'Sortie :\n' +
      '- Pour chaque nœud analysé :\n' +
      '  `NODE type=<NODE_TYPE> target=<TARGET> startup=<STARTUP> total=<TOTAL> rows=<ROWS> width=<WIDTH>`\n' +
      '- En fin de traitement : `SUMMARY nodes_count=<N> max_total_cost=<MAX_TOTAL>`',
    starter: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : parser les métriques de coût cost=.. rows=.. width=.. dans chaque nœud
`,
    hints: [
      'Utiliser une expression régulière pour capturer le type de nœud, la relation cible, ainsi que les champs cost, rows et width.',
      'Pattern type : r"(?:->\\s+)?([A-Za-z\\s]+?)(?:\\s+on\\s+([A-Za-z0-9_]+))?\\s+\\(cost=([0-9.]+)\\.\\.([0-9.]+)\\s+rows=([0-9]+)\\s+width=([0-9]+)\\)"',
      'Normaliser les espaces du type de nœud et convertir les coûts en flottants.'
    ],
    examples: [
      {
        stdin: '-> Seq Scan on utilisateurs (cost=0.00..450.50 rows=12000 width=36)\n-> Index Scan using idx_commandes on commandes (cost=0.42..8.44 rows=10 width=48)',
        expected: 'NODE type=Seq Scan target=utilisateurs startup=0.00 total=450.50 rows=12000 width=36\nNODE type=Index Scan target=commandes startup=0.42 total=8.44 rows=10 width=48\nSUMMARY nodes_count=2 max_total_cost=450.50',
        note: 'Deux nœuds parsés avec calcul du coût maximal.'
      }
    ],
    tests: [
      {
        label: 'Bitmap Heap Scan et Bitmap Index Scan',
        stdin: '-> Bitmap Heap Scan on factures (cost=12.50..128.00 rows=350 width=64)\n-> Bitmap Index Scan on idx_factures_date (cost=0.00..8.25 rows=350 width=0)',
        expected: 'NODE type=Bitmap Heap Scan target=factures startup=12.50 total=128.00 rows=350 width=64\nNODE type=Bitmap Index Scan target=idx_factures_date startup=0.00 total=8.25 rows=350 width=0\nSUMMARY nodes_count=2 max_total_cost=128.00'
      },
      {
        label: 'Nœud unique Index Only Scan',
        stdin: '-> Index Only Scan using idx_articles_prix on articles (cost=0.28..4.30 rows=5 width=12)',
        expected: 'NODE type=Index Only Scan target=articles startup=0.28 total=4.30 rows=5 width=12\nSUMMARY nodes_count=1 max_total_cost=4.30'
      },
      {
        label: 'Trois opérations chaînées',
        stdin: '-> Seq Scan on logs (cost=0.00..9800.00 rows=500000 width=80)\n-> Hash (cost=450.00..450.00 rows=12000 width=36)\n-> Nested Loop (cost=0.42..85.00 rows=15 width=116)',
        expected: 'NODE type=Seq Scan target=logs startup=0.00 total=9800.00 rows=500000 width=80\nNODE type=Hash target=none startup=450.00 total=450.00 rows=12000 width=36\nNODE type=Nested Loop target=none startup=0.42 total=85.00 rows=15 width=116\nSUMMARY nodes_count=3 max_total_cost=9800.00'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

nodes = []
max_cost = 0.0

for l in lignes:
    cost_m = re.search(r'\\(cost=([0-9.]+)\\.\\.([0-9.]+)\\s+rows=([0-9]+)\\s+width=([0-9]+)\\)', l)
    if not cost_m:
        continue
    startup = cost_m.group(1)
    total = cost_m.group(2)
    rows = cost_m.group(3)
    width = cost_m.group(4)

    prefix = l[:cost_m.start()].strip()
    if prefix.startswith('->'):
        prefix = prefix[2:].strip()

    target = 'none'
    if ' on ' in prefix:
        parts = prefix.split(' on ', 1)
        target = parts[1].strip()
        ntype_part = parts[0].strip()
        if ' using ' in ntype_part:
            ntype = ntype_part.split(' using ', 1)[0].strip()
        else:
            ntype = ntype_part
    else:
        ntype = prefix

    cost_val = float(total)
    if cost_val > max_cost:
        max_cost = cost_val

    nodes.append({
        'type': ntype,
        'target': target,
        'startup': startup,
        'total': total,
        'rows': rows,
        'width': width
    })
    print(f"NODE type={ntype} target={target} startup={startup} total={total} rows={rows} width={width}")

print(f"SUMMARY nodes_count={len(nodes)} max_total_cost={max_cost:.2f}")
`
  },
  {
    id: 'sql3-c3-e2',
    chapter: 3,
    title: 'Simulateur de sélection d’algorithme de jointure (Nested Loop vs Hash vs Merge)',
    level: 'n2',
    language: 'python',
    goal: 'Simuler le choix de l’optimiseur de requêtes pour sélectionner le meilleur algorithme de jointure.',
    brief:
      'Dans les SGBDR modernes, l’optimiseur CBO choisit entre trois algorithmes fondamentaux pour joindre deux relations $R$ (externe) et $S$ (interne) :\n' +
      '- `NESTED_LOOP` : optimal si l’une des tables est très petite ($N \\le 100$) et que la table interne dispose d’un index sur la clé de jointure, ou pour les jointures sans condition d’égalité.\n' +
      '- `MERGE_JOIN` : optimal si les deux relations sont déjà triées sur la condition de jointure (ou alimentées par un Index Scan B-Tree pré-trié) ; complexité $O(N + M)$.\n' +
      '- `HASH_JOIN` : optimal pour les tables moyennes à grandes non triées sur une condition d’égalité (`join_op=eq`), où la plus petite table tient dans la mémoire de travail `work_mem`.\n\n' +
      'Entrée :\n' +
      '`JOIN t1=<name> r1=<rows> indexed1=<true|false> sorted1=<true|false> t2=<name> r2=<rows> indexed2=<true|false> sorted2=<true|false> op=<eq|other>`\n\n' +
      'Sortie :\n' +
      '`JOIN_DECISION algo=<NESTED_LOOP|MERGE_JOIN|HASH_JOIN> outer_table=<t> inner_table=<t> complexity=<O(N*M)|O(N+M)|O(N*logM)> reason=<REASON>`',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : simuler la logique de décision de l'optimiseur de jointure
`,
    hints: [
      'Si op != eq : Hash Join et Merge Join sont impossibles -> forcer NESTED_LOOP.',
      'Si sorted1 == true et sorted2 == true et op == eq : recommander MERGE_JOIN.',
      'Si min(r1, r2) <= 100 et l’autre table a un index : recommander NESTED_LOOP.',
      'Sinon sur égalité op == eq : recommander HASH_JOIN (la plus petite table devient la build table inner).'
    ],
    examples: [
      {
        stdin: 'JOIN t1=clients r1=50 indexed1=true sorted1=false t2=commandes r2=100000 indexed2=true sorted2=false op=eq',
        expected: 'JOIN_DECISION algo=NESTED_LOOP outer_table=clients inner_table=commandes complexity=O(N*logM) reason=SMALL_OUTER_WITH_INNER_INDEX',
        note: 'Petite table clients (50 lignes) bouclant sur l’index de commandes.'
      }
    ],
    tests: [
      {
        label: 'Deux tables pré-triées sur égalité favorisant le Merge Join',
        stdin: 'JOIN t1=ventes_2025 r1=80000 indexed1=true sorted1=true t2=articles r2=15000 indexed2=true sorted2=true op=eq',
        expected: 'JOIN_DECISION algo=MERGE_JOIN outer_table=ventes_2025 inner_table=articles complexity=O(N+M) reason=BOTH_INPUTS_PRE_SORTED'
      },
      {
        label: 'Grandes tables non triées sur égalité favorisant le Hash Join',
        stdin: 'JOIN t1=logs r1=500000 indexed1=false sorted1=false t2=utilisateurs r2=20000 indexed2=true sorted2=false op=eq',
        expected: 'JOIN_DECISION algo=HASH_JOIN outer_table=logs inner_table=utilisateurs complexity=O(N+M) reason=HASH_TABLE_ON_SMALLER_RELATION'
      },
      {
        label: 'Jointure avec opérateur d inégalité',
        stdin: 'JOIN t1=plages r1=500 indexed1=false sorted1=false t2=tarifs r2=200 indexed2=false sorted2=false op=other',
        expected: 'JOIN_DECISION algo=NESTED_LOOP outer_table=tarifs inner_table=plages complexity=O(N*M) reason=NON_EQUALITY_PREDICATE'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for l in lignes:
    parts = l.split()
    if not parts or parts[0] != 'JOIN':
        continue
    args = {}
    for p in parts[1:]:
        if '=' in p:
            k, v = p.split('=', 1)
            args[k] = v

    t1 = args.get('t1', 't1')
    r1 = int(args.get('r1', '0'))
    idx1 = args.get('indexed1', 'false').lower() == 'true'
    srt1 = args.get('sorted1', 'false').lower() == 'true'

    t2 = args.get('t2', 't2')
    r2 = int(args.get('r2', '0'))
    idx2 = args.get('indexed2', 'false').lower() == 'true'
    srt2 = args.get('sorted2', 'false').lower() == 'true'

    op = args.get('op', 'eq')

    if op != 'eq':
        outer = t1 if r1 <= r2 else t2
        inner = t2 if r1 <= r2 else t1
        print(f"JOIN_DECISION algo=NESTED_LOOP outer_table={outer} inner_table={inner} complexity=O(N*M) reason=NON_EQUALITY_PREDICATE")
    elif srt1 and srt2:
        outer = t1 if r1 >= r2 else t2
        inner = t2 if r1 >= r2 else t1
        print(f"JOIN_DECISION algo=MERGE_JOIN outer_table={outer} inner_table={inner} complexity=O(N+M) reason=BOTH_INPUTS_PRE_SORTED")
    elif (r1 <= 100 and idx2) or (r2 <= 100 and idx1):
        if r1 <= 100 and idx2:
            outer = t1
            inner = t2
        else:
            outer = t2
            inner = t1
        print(f"JOIN_DECISION algo=NESTED_LOOP outer_table={outer} inner_table={inner} complexity=O(N*logM) reason=SMALL_OUTER_WITH_INNER_INDEX")
    else:
        # Hash Join: smaller table is build table (inner)
        if r1 >= r2:
            outer = t1
            inner = t2
        else:
            outer = t2
            inner = t1
        print(f"JOIN_DECISION algo=HASH_JOIN outer_table={outer} inner_table={inner} complexity=O(N+M) reason=HASH_TABLE_ON_SMALLER_RELATION")
`
  },
  {
    id: 'sql3-c3-e3',
    chapter: 3,
    title: 'Détecteur d’écart de cardinalité (Estimation vs Actual Rows)',
    level: 'n3',
    language: 'python',
    goal: 'Détecter les dérives majeures entre lignes estimées et lignes réelles dans un plan EXPLAIN ANALYZE et recommander les actions correctives.',
    brief:
      'L’optimiseur de requêtes se base sur les statistiques stockées dans `pg_statistic` (fréquences des valeurs les plus courantes MCV, histogrammes de distribution) pour choisir les plans d’exécution.\n' +
      'Si ces statistiques sont obsolètes, un écart colossal apparaît entre le nombre de lignes estimé (`est_rows`) et le nombre réel de lignes parcourues (`act_rows`).\n' +
      'Critères d’évaluation du ratio $R = \\max(\\text{est}, \\text{act}) / \\min(\\text{est}, \\text{act})$ (avec $\\min \\ge 1$) :\n' +
      '- Si $R < 2.0$ : `ACCURATE` (statistiques fidèles).\n' +
      '- Si $2.0 \\le R < 10.0$ : `MODERATE_DRIFT` (écart tolérable, surveillance).\n' +
      '- Si $R \\ge 10.0$ : `SEVERE_DRIFT` (alerte critique : l’optimiseur a pu choisir un Nested Loop désastreux au lieu d’un Hash Join).\n\n' +
      'Entrée :\n' +
      '`STAT_CHECK node=<name> table=<table> est_rows=<E> act_rows=<A>`\n\n' +
      'Sortie :\n' +
      '`DRIFT_ANALYSIS node=<name> table=<table> est=<E> act=<A> ratio=<R.2f> status=<ACCURATE|MODERATE_DRIFT|SEVERE_DRIFT> action=<NONE|MONITOR|RUN_ANALYZE_TABLE>`',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer le ratio d'écart de cardinalité et préconiser les actions de maintenance
`,
    hints: [
      'Calculer ratio = max(est, act) / max(1, min(est, act)).',
      'Classifier selon les seuils 2.0 et 10.0.',
      'Si SEVERE_DRIFT : action=RUN_ANALYZE_TABLE.'
    ],
    examples: [
      {
        stdin: 'STAT_CHECK node=seq_scan table=commandes est_rows=10 act_rows=8500',
        expected: 'DRIFT_ANALYSIS node=seq_scan table=commandes est=10 act=8500 ratio=850.00 status=SEVERE_DRIFT action=RUN_ANALYZE_TABLE',
        note: 'Ratio de 850 : statistiques totalement erronées nécessitant un ANALYZE.'
      }
    ],
    tests: [
      {
        label: 'Statistiques précises avec ratio inférieur à 2',
        stdin: 'STAT_CHECK node=idx_scan table=utilisateurs est_rows=1200 act_rows=1250',
        expected: 'DRIFT_ANALYSIS node=idx_scan table=utilisateurs est=1200 act=1250 ratio=1.04 status=ACCURATE action=NONE'
      },
      {
        label: 'Dérive modérée entre 2 et 10',
        stdin: 'STAT_CHECK node=bitmap_scan table=produits est_rows=400 act_rows=1500',
        expected: 'DRIFT_ANALYSIS node=bitmap_scan table=produits est=400 act=1500 ratio=3.75 status=MODERATE_DRIFT action=MONITOR'
      },
      {
        label: 'Sous-estimation critique (1 ligne estimée contre 1000 réelles)',
        stdin: 'STAT_CHECK node=nested_loop table=lignes_factures est_rows=1 act_rows=1200',
        expected: 'DRIFT_ANALYSIS node=nested_loop table=lignes_factures est=1 act=1200 ratio=1200.00 status=SEVERE_DRIFT action=RUN_ANALYZE_TABLE'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for l in lignes:
    parts = l.split()
    if not parts or parts[0] != 'STAT_CHECK':
        continue
    args = {}
    for p in parts[1:]:
        if '=' in p:
            k, v = p.split('=', 1)
            args[k] = v

    node = args.get('node', 'node')
    table = args.get('table', 'table')
    est = int(args.get('est_rows', '1'))
    act = int(args.get('act_rows', '1'))

    denom = max(1, min(est, act))
    numer = max(est, act)
    ratio = numer / float(denom)

    if ratio < 2.0:
        status = 'ACCURATE'
        action = 'NONE'
    elif ratio < 10.0:
        status = 'MODERATE_DRIFT'
        action = 'MONITOR'
    else:
        status = 'SEVERE_DRIFT'
        action = 'RUN_ANALYZE_TABLE'

    print(f"DRIFT_ANALYSIS node={node} table={table} est={est} act={act} ratio={ratio:.2f} status={status} action={action}")
`
  }
];
