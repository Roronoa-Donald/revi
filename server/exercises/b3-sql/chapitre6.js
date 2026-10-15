// server/exercises/b3-sql/chapitre6.js
// Exercices du Module 6 : Partitionnement, Réplication & Haute Disponibilité (idPrefix: sql3)

module.exports = [
  {
    id: 'sql3-c6-e1',
    chapter: 6,
    title: 'Routeur de partitionnement déclaratif de table (Range & List)',
    level: 'n1',
    language: 'python',
    goal: 'Acheminer les insertions de données vers la partition physique appropriée selon la stratégie de partitionnement déclarative.',
    brief:
      'Dans PostgreSQL (à partir de la version 10), le partitionnement déclaratif horizontal divise une grande table logique en sous-tables physiques indépendantes :\n' +
      '- `RANGE` : la partition héberge un intervalle semi-ouvert $[\\text{from}, \\text{to}[$ (valeur $\\ge \\text{from}$ et $< \\text{to}$).\n' +
      '- `LIST` : la partition accepte un ensemble fini de valeurs littérales (ex: codes régions ou statuts).\n' +
      '- Si aucune partition ne correspond et qu’aucune partition par défaut n’existe : l’insertion échoue avec `NO_PARTITION_FOUND`.\n\n' +
      'Entrée :\n' +
      '- Définition de la stratégie : `STRATEGY type=<RANGE|LIST> col=<col_name>`\n' +
      '- Déclaration des partitions :\n' +
      '  Pour RANGE : `PARTITION name=<p_name> from=<val> to=<val>`\n' +
      '  Pour LIST : `PARTITION name=<p_name> values=<v1,v2,...>`\n' +
      '- Insertions : `INSERT id=<row_id> <col_name>=<val>`\n\n' +
      'Sortie :\n' +
      '- Pour chaque insertion : `ROUTED row_id=<ID> val=<V> partition=<PART_NAME|NONE> status=<SUCCESS|ERROR_NO_PARTITION>`\n' +
      '- Bilan : `ROUTER_SUMMARY total=<N> routed=<N> unrouted=<N>`',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : router chaque ligne vers la partition correspondante
`,
    hints: [
      'Pour RANGE : convertir les bornes et valeurs en entiers pour la comparaison from <= val < to.',
      'Pour LIST : vérifier si str(val) est dans la liste values.',
      'Afficher ERROR_NO_PARTITION si aucun match n’est trouvé.'
    ],
    examples: [
      {
        stdin: 'STRATEGY type=RANGE col=annee\nPARTITION name=p_2023 from=2023 to=2024\nPARTITION name=p_2024 from=2024 to=2025\nPARTITION name=p_2025 from=2025 to=2026\nINSERT id=1 annee=2024\nINSERT id=2 annee=2025\nINSERT id=3 annee=2020',
        expected: 'ROUTED row_id=1 val=2024 partition=p_2024 status=SUCCESS\nROUTED row_id=2 val=2025 partition=p_2025 status=SUCCESS\nROUTED row_id=3 val=2020 partition=NONE status=ERROR_NO_PARTITION\nROUTER_SUMMARY total=3 routed=2 unrouted=1',
        note: '2024 va dans p_2024 ; 2020 ne correspond à aucune partition déclarée.'
      }
    ],
    tests: [
      {
        label: 'Partitionnement par liste (LIST) géographique',
        stdin: 'STRATEGY type=LIST col=pays\nPARTITION name=p_europe values=FR,BE,DE,IT\nPARTITION name=p_amerique values=US,CA,MX\nINSERT id=10 pays=FR\nINSERT id=11 pays=JP',
        expected: 'ROUTED row_id=10 val=FR partition=p_europe status=SUCCESS\nROUTED row_id=11 val=JP partition=NONE status=ERROR_NO_PARTITION\nROUTER_SUMMARY total=2 routed=1 unrouted=1'
      },
      {
        label: 'Toutes les lignes routées avec succès dans un partitionnement par plage',
        stdin: 'STRATEGY type=RANGE col=mois\nPARTITION name=t1 from=1 to=4\nPARTITION name=t2 from=4 to=7\nINSERT id=101 mois=2\nINSERT id=102 mois=4\nINSERT id=103 mois=6',
        expected: 'ROUTED row_id=101 val=2 partition=t1 status=SUCCESS\nROUTED row_id=102 val=4 partition=t2 status=SUCCESS\nROUTED row_id=103 val=6 partition=t2 status=SUCCESS\nROUTER_SUMMARY total=3 routed=3 unrouted=0'
      },
      {
        label: 'Test de borne supérieure exclusive (valeur égale à to)',
        stdin: 'STRATEGY type=RANGE col=valeur\nPARTITION name=p_basse from=0 to=100\nINSERT id=1 valeur=100',
        expected: 'ROUTED row_id=1 val=100 partition=NONE status=ERROR_NO_PARTITION\nROUTER_SUMMARY total=1 routed=0 unrouted=1'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

strat_type = 'RANGE'
strat_col = 'annee'
range_parts = []
list_parts = []

inserts = []

for l in lignes:
    parts = l.split()
    if not parts:
        continue
    cmd = parts[0]
    args = {}
    for p in parts[1:]:
        if '=' in p:
            k, v = p.split('=', 1)
            args[k] = v

    if cmd == 'STRATEGY':
        strat_type = args.get('type', 'RANGE')
        strat_col = args.get('col', 'annee')
    elif cmd == 'PARTITION':
        pname = args.get('name', '')
        if strat_type == 'RANGE':
            pfrom = int(args.get('from', '0'))
            pto = int(args.get('to', '0'))
            range_parts.append((pname, pfrom, pto))
        else: # LIST
            vals = [x.strip() for x in args.get('values', '').split(',') if x.strip()]
            list_parts.append((pname, set(vals)))
    elif cmd == 'INSERT':
        rid = args.get('id', '0')
        raw_val = args.get(strat_col, '')
        inserts.append((rid, raw_val))

routed_cnt = 0
unrouted_cnt = 0

for rid, raw_val in inserts:
    matched = None
    if strat_type == 'RANGE':
        try:
            num_val = int(raw_val)
            for pname, pfrom, pto in range_parts:
                if pfrom <= num_val < pto:
                    matched = pname
                    break
        except ValueError:
            matched = None
    else: # LIST
        for pname, val_set in list_parts:
            if raw_val in val_set:
                matched = pname
                break

    if matched:
        routed_cnt += 1
        print(f"ROUTED row_id={rid} val={raw_val} partition={matched} status=SUCCESS")
    else:
        unrouted_cnt += 1
        print(f"ROUTED row_id={rid} val={raw_val} partition=NONE status=ERROR_NO_PARTITION")

print(f"ROUTER_SUMMARY total={len(inserts)} routed={routed_cnt} unrouted={unrouted_cnt}")
`
  },
  {
    id: 'sql3-c6-e2',
    chapter: 6,
    title: 'Simulateur d’élagage de partitions (Partition Pruning Optimizer)',
    level: 'n2',
    language: 'python',
    goal: 'Calculer les partitions éliminées (pruned) et le gain d’I/O lors de l’exécution d’une requête filtrée.',
    brief:
      'L’élagage de partitions (Partition Pruning) permet à l’optimiseur de ne scanner que les partitions physiques dont les bornes chevauchent le filtre WHERE, éliminant totalement les autres tables du plan d’exécution.\n' +
      'L’efficacité de l’élagage est mesurée par :\n' +
      '$$\\text{Efficacité} = \\frac{\\text{Partitions Élaguées}}{\\text{Total des Partitions}} \\times 100$$\n\n' +
      'Entrée :\n' +
      '- `PARTITIONS list=<p1:from-to,p2:from-to,...>`\n' +
      '- `QUERY id=<num> op=<eq|gte|lte|between> val1=<int> [val2=<int>]`\n\n' +
      'Sortie :\n' +
      '- Pour chaque requête :\n' +
      '  `PRUNING_EVAL query_id=<id> scanned=<p_list> pruned=<p_list> efficiency=<PCT.1f>%`\n' +
      '- Bilan : `PRUNING_REPORT queries=<N> avg_efficiency=<AVG_PCT.1f>%`',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer les partitions intersectant la condition WHERE et évaluer le gain
`,
    hints: [
      'Pour chaque partition [pfrom, pto[, tester l’intersection avec l’intervalle défini par le filtre.',
      'Pour eq val1 : tester pfrom <= val1 < pto.',
      'Pour gte val1 : tester pto > val1.',
      'Pour lte val1 : tester pfrom <= val1.',
      'Pour between val1 et val2 : tester (pfrom <= val2 et pto > val1).'
    ],
    examples: [
      {
        stdin: 'PARTITIONS list=p_2023:2023-2024,p_2024:2024-2025,p_2025:2025-2026\nQUERY id=1 op=eq val1=2024\nQUERY id=2 op=gte val1=2024',
        expected: 'PRUNING_EVAL query_id=1 scanned=p_2024 pruned=p_2023,p_2025 efficiency=66.7%\nPRUNING_EVAL query_id=2 scanned=p_2024,p_2025 pruned=p_2023 efficiency=33.3%\nPRUNING_REPORT queries=2 avg_efficiency=50.0%',
        note: 'La requête 1 élimine 2 partitions sur 3 (66.7% d’efficacité).'
      }
    ],
    tests: [
      {
        label: 'Filtre BETWEEN couvrant deux partitions consécutives',
        stdin: 'PARTITIONS list=p_q1:1-4,p_q2:4-7,p_q3:7-10,p_q4:10-13\nQUERY id=10 op=between val1=3 val2=5',
        expected: 'PRUNING_EVAL query_id=10 scanned=p_q1,p_q2 pruned=p_q3,p_q4 efficiency=50.0%\nPRUNING_REPORT queries=1 avg_efficiency=50.0%'
      },
      {
        label: 'Filtre inférieur ou égal (lte) élaguant les partitions futures',
        stdin: 'PARTITIONS list=p1:0-10,p2:10-20,p3:20-30\nQUERY id=20 op=lte val1=9',
        expected: 'PRUNING_EVAL query_id=20 scanned=p1 pruned=p2,p3 efficiency=66.7%\nPRUNING_REPORT queries=1 avg_efficiency=66.7%'
      },
      {
        label: 'Requête ne pouvant élaguer aucune partition (scan complet)',
        stdin: 'PARTITIONS list=p1:1-5,p2:5-10\nQUERY id=30 op=between val1=1 val2=10',
        expected: 'PRUNING_EVAL query_id=30 scanned=p1,p2 pruned=none efficiency=0.0%\nPRUNING_REPORT queries=1 avg_efficiency=0.0%'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

partitions = []
queries = []

for l in lignes:
    parts = l.split()
    if not parts:
        continue
    if parts[0] == 'PARTITIONS':
        for p in parts[1:]:
            if p.startswith('list='):
                items = p.split('=', 1)[1].split(',')
                for it in items:
                    if ':' in it:
                        pname, prange = it.split(':', 1)
                        pfrom, pto = prange.split('-')
                        partitions.append((pname, int(pfrom), int(pto)))
    elif parts[0] == 'QUERY':
        args = {}
        for p in parts[1:]:
            if '=' in p:
                k, v = p.split('=', 1)
                args[k] = v
        queries.append(args)

total_eff = 0.0

for q in queries:
    qid = q.get('id', '1')
    op = q.get('op', 'eq')
    v1 = int(q.get('val1', '0'))
    v2 = int(q.get('val2', '0'))

    scanned = []
    pruned = []

    for pname, pfrom, pto in partitions:
        match = False
        if op == 'eq':
            match = (pfrom <= v1 < pto)
        elif op == 'gte':
            match = (pto > v1)
        elif op == 'lte':
            match = (pfrom <= v1)
        elif op == 'between':
            match = not (pto <= v1 or pfrom > v2)

        if match:
            scanned.append(pname)
        else:
            pruned.append(pname)

    tot_p = len(partitions)
    eff = (len(pruned) / float(tot_p)) * 100.0 if tot_p > 0 else 0.0
    total_eff += eff

    scanned_str = ','.join(scanned) if scanned else 'none'
    pruned_str = ','.join(pruned) if pruned else 'none'

    print(f"PRUNING_EVAL query_id={qid} scanned={scanned_str} pruned={pruned_str} efficiency={eff:.1f}%")

avg_eff = total_eff / float(len(queries)) if queries else 0.0
print(f"PRUNING_REPORT queries={len(queries)} avg_efficiency={avg_eff:.1f}%")
`
  },
  {
    id: 'sql3-c6-e3',
    chapter: 6,
    title: 'Calculateur de lag de réplication WAL (Streaming Replication Lag)',
    level: 'n3',
    language: 'python',
    goal: 'Calculer le décalage de réplication en octets et en Ko entre le primaire et ses nœuds secondaires à partir de nombres LSN (Log Sequence Number).',
    brief:
      'Dans la réplication physique PostgreSQL (Streaming Replication), l’avancement des écritures dans le journal WAL est repéré par un `LSN` (Log Sequence Number) hexadécimal à deux composantes (ex: `16/B3C840`).\n' +
      'Conversion d’un LSN en entier 64 bits d’octets :\n' +
      '$$\\text{LSN\\_Bytes} = \\text{int}(X, 16) \\times 2^{32} + \\text{int}(Y, 16)$$\n' +
      'Le retard de réplication (Lag) est calculé par :\n' +
      '$$\\text{Lag\\_Bytes} = \\text{Primary\\_LSN} - \\text{Replica\\_LSN}$$\n' +
      '$$\\text{Lag\\_Ko} = \\frac{\\text{Lag\\_Bytes}}{1024.0}$$\n' +
      'Évaluation de la santé :\n' +
      '- Si `Lag_Bytes == 0` : `SYNCED` (parfaite synchronisation).\n' +
      '- Si `0 < Lag_Ko <= 64` : `HEALTHY_LAG` (retard opérationnel normal en réplication asynchrone).\n' +
      '- Si `Lag_Ko > 64` : `CRITICAL_LAG` (danger de perte de données en cas de failover, violation de RPO).\n\n' +
      'Entrée :\n' +
      '`REPLICA node=<name> mode=<sync|async> primary_lsn=<HEX/HEX> replay_lsn=<HEX/HEX>`\n\n' +
      'Sortie :\n' +
      '`LAG_STATUS node=<name> mode=<mode> lag_bytes=<BYTES> lag_kb=<KB.2f> health=<SYNCED|HEALTHY_LAG|CRITICAL_LAG>`\n' +
      '`CLUSTER_STATUS total_nodes=<N> max_lag_kb=<MAX.2f>`',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : convertir les LSNs hexadécimaux en octets et évaluer la santé de la réplication
`,
    hints: [
      'Découper le LSN sur le caractère "/" : high, low = lsn.split("/").',
      'Calculer lsn_val = int(high, 16) * (2**32) + int(low, 16).',
      'Calculer lag_bytes = primary_bytes - replay_bytes.',
      'Comparer lag_kb aux seuils 0 et 64 Ko.'
    ],
    examples: [
      {
        stdin: 'REPLICA node=standby_1 mode=async primary_lsn=0/16B3C840 replay_lsn=0/16B3A000\nREPLICA node=standby_2 mode=sync primary_lsn=0/16B3C840 replay_lsn=0/16B3C840',
        expected: 'LAG_STATUS node=standby_1 mode=async lag_bytes=10304 lag_kb=10.06 health=HEALTHY_LAG\nLAG_STATUS node=standby_2 mode=sync lag_bytes=0 lag_kb=0.00 health=SYNCED\nCLUSTER_STATUS total_nodes=2 max_lag_kb=10.06',
        note: 'standby_1 a un léger retard de 10 Ko (sain), standby_2 est parfaitement synchronisé.'
      }
    ],
    tests: [
      {
        label: 'Retard critique dépassant 64 Ko sur un réplica asynchrone',
        stdin: 'REPLICA node=standby_remote mode=async primary_lsn=0/20000000 replay_lsn=0/1FE00000',
        expected: 'LAG_STATUS node=standby_remote mode=async lag_bytes=2097152 lag_kb=2048.00 health=CRITICAL_LAG\nCLUSTER_STATUS total_nodes=1 max_lag_kb=2048.00'
      },
      {
        label: 'Tous les nœuds parfaitement synchronisés',
        stdin: 'REPLICA node=standby_ha1 mode=sync primary_lsn=1/00000000 replay_lsn=1/00000000\nREPLICA node=standby_ha2 mode=sync primary_lsn=1/00000000 replay_lsn=1/00000000',
        expected: 'LAG_STATUS node=standby_ha1 mode=sync lag_bytes=0 lag_kb=0.00 health=SYNCED\nLAG_STATUS node=standby_ha2 mode=sync lag_bytes=0 lag_kb=0.00 health=SYNCED\nCLUSTER_STATUS total_nodes=2 max_lag_kb=0.00'
      },
      {
        label: 'LSN traversant la frontière des 32 bits de poids fort',
        stdin: 'REPLICA node=standby_cross mode=async primary_lsn=2/00001000 replay_lsn=1/FFFF0000',
        expected: 'LAG_STATUS node=standby_cross mode=async lag_bytes=69632 lag_kb=68.00 health=CRITICAL_LAG\nCLUSTER_STATUS total_nodes=1 max_lag_kb=68.00'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

def lsn_to_bytes(lsn_str):
    if '/' not in lsn_str:
        return 0
    h_str, l_str = lsn_str.split('/', 1)
    high = int(h_str, 16)
    low = int(l_str, 16)
    return high * (2**32) + low

max_lag_kb = 0.0
count = 0

for l in lignes:
    parts = l.split()
    if not parts or parts[0] != 'REPLICA':
        continue
    count += 1
    args = {}
    for p in parts[1:]:
        if '=' in p:
            k, v = p.split('=', 1)
            args[k] = v

    node = args.get('node', 'node')
    mode = args.get('mode', 'async')
    p_lsn = args.get('primary_lsn', '0/0')
    r_lsn = args.get('replay_lsn', '0/0')

    p_bytes = lsn_to_bytes(p_lsn)
    r_bytes = lsn_to_bytes(r_lsn)

    lag_bytes = max(0, p_bytes - r_bytes)
    lag_kb = lag_bytes / 1024.0

    if lag_kb > max_lag_kb:
        max_lag_kb = lag_kb

    if lag_bytes == 0:
        health = 'SYNCED'
    elif lag_kb <= 64.0:
        health = 'HEALTHY_LAG'
    else:
        health = 'CRITICAL_LAG'

    print(f"LAG_STATUS node={node} mode={mode} lag_bytes={lag_bytes} lag_kb={lag_kb:.2f} health={health}")

print(f"CLUSTER_STATUS total_nodes={count} max_lag_kb={max_lag_kb:.2f}")
`
  }
];
