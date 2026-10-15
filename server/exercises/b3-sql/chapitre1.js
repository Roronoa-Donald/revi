// server/exercises/b3-sql/chapitre1.js
// Exercices du Module 1 : Transactions ACID, Verrous & Niveaux d'Isolation ANSI (idPrefix: sql3)

module.exports = [
  {
    id: 'sql3-c1-e1',
    chapter: 1,
    title: 'Détecteur d’anomalies de concurrence selon le niveau d’isolation ANSI SQL',
    level: 'n1',
    language: 'python',
    goal: 'Déterminer si une anomalie de concurrence (Dirty Read, Non-Repeatable Read, Phantom Read) est possible sous un niveau d’isolation ANSI SQL donné.',
    brief:
      'Dans un système de gestion de bases de données relationnelles (SGBDR), les 4 niveaux d’isolation standard ANSI SQL offrent des compromis distincts entre cohérence et performance :\n' +
      '- READ UNCOMMITTED : autorise Dirty Read, Non-Repeatable Read et Phantom Read.\n' +
      '- READ COMMITTED : empêche Dirty Read ; autorise Non-Repeatable Read et Phantom Read.\n' +
      '- REPEATABLE READ : empêche Dirty Read et Non-Repeatable Read ; autorise Phantom Read.\n' +
      '- SERIALIZABLE : empêche toutes les anomalies de concurrence (Dirty Read, Non-Repeatable Read, Phantom Read).\n\n' +
      'Entrée :\n' +
      '- Une ligne `ISOLATION <READ_UNCOMMITTED|READ_COMMITTED|REPEATABLE_READ|SERIALIZABLE>`\n' +
      '- Des lignes `CHECK anomaly=<DIRTY_READ|NON_REPEATABLE_READ|PHANTOM_READ>`\n\n' +
      'Sortie :\n' +
      '- Pour chaque vérification : `ANOMALY name=<NAME> allowed=<TRUE|FALSE> state=<PERMISSIBLE|PREVENTED>`\n' +
      '- Une ligne de bilan : `SUMMARY isolation=<LEVEL> total=<N> allowed=<N> prevented=<N>`',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : lire le niveau d'isolation et vérifier l'admissibilité de chaque anomalie
`,
    hints: [
      'Stocker la matrice d’admissibilité ANSI dans un dictionnaire associant chaque niveau à l’ensemble des anomalies permises.',
      'Parcourir les lignes commençant par CHECK et extraire la clé anomaly.',
      'Afficher TRUE/PERMISSIBLE si l’anomalie est possible, FALSE/PREVENTED sinon.'
    ],
    examples: [
      {
        stdin: 'ISOLATION READ_COMMITTED\nCHECK anomaly=DIRTY_READ\nCHECK anomaly=NON_REPEATABLE_READ\nCHECK anomaly=PHANTOM_READ',
        expected: 'ANOMALY name=DIRTY_READ allowed=FALSE state=PREVENTED\nANOMALY name=NON_REPEATABLE_READ allowed=TRUE state=PERMISSIBLE\nANOMALY name=PHANTOM_READ allowed=TRUE state=PERMISSIBLE\nSUMMARY isolation=READ_COMMITTED total=3 allowed=2 prevented=1',
        note: 'Sous READ COMMITTED, seule la lecture sale est prévenue.'
      }
    ],
    tests: [
      {
        label: 'Niveau SERIALIZABLE prévenant toutes les anomalies',
        stdin: 'ISOLATION SERIALIZABLE\nCHECK anomaly=DIRTY_READ\nCHECK anomaly=NON_REPEATABLE_READ\nCHECK anomaly=PHANTOM_READ',
        expected: 'ANOMALY name=DIRTY_READ allowed=FALSE state=PREVENTED\nANOMALY name=NON_REPEATABLE_READ allowed=FALSE state=PREVENTED\nANOMALY name=PHANTOM_READ allowed=FALSE state=PREVENTED\nSUMMARY isolation=SERIALIZABLE total=3 allowed=0 prevented=3'
      },
      {
        label: 'Niveau READ UNCOMMITTED autorisant toutes les anomalies',
        stdin: 'ISOLATION READ_UNCOMMITTED\nCHECK anomaly=DIRTY_READ\nCHECK anomaly=NON_REPEATABLE_READ\nCHECK anomaly=PHANTOM_READ',
        expected: 'ANOMALY name=DIRTY_READ allowed=TRUE state=PERMISSIBLE\nANOMALY name=NON_REPEATABLE_READ allowed=TRUE state=PERMISSIBLE\nANOMALY name=PHANTOM_READ allowed=TRUE state=PERMISSIBLE\nSUMMARY isolation=READ_UNCOMMITTED total=3 allowed=3 prevented=0'
      },
      {
        label: 'Niveau REPEATABLE READ prévenant Dirty Read et Non-Repeatable Read',
        stdin: 'ISOLATION REPEATABLE_READ\nCHECK anomaly=DIRTY_READ\nCHECK anomaly=NON_REPEATABLE_READ\nCHECK anomaly=PHANTOM_READ',
        expected: 'ANOMALY name=DIRTY_READ allowed=FALSE state=PREVENTED\nANOMALY name=NON_REPEATABLE_READ allowed=FALSE state=PREVENTED\nANOMALY name=PHANTOM_READ allowed=TRUE state=PERMISSIBLE\nSUMMARY isolation=REPEATABLE_READ total=3 allowed=1 prevented=2'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# Matrice standard ANSI SQL : anomalies autorisées par niveau
ANSI_MATRIX = {
    'READ_UNCOMMITTED': {'DIRTY_READ', 'NON_REPEATABLE_READ', 'PHANTOM_READ'},
    'READ_COMMITTED': {'NON_REPEATABLE_READ', 'PHANTOM_READ'},
    'REPEATABLE_READ': {'PHANTOM_READ'},
    'SERIALIZABLE': set()
}

isolation = 'READ_COMMITTED'
checks = []

for l in lignes:
    parts = l.split()
    if not parts:
        continue
    if parts[0] == 'ISOLATION':
        isolation = parts[1].strip()
    elif parts[0] == 'CHECK':
        for kv in parts[1:]:
            if kv.startswith('anomaly='):
                checks.append(kv.split('=', 1)[1].strip())

allowed_set = ANSI_MATRIX.get(isolation, set())
allowed_cnt = 0
prevented_cnt = 0

for anom in checks:
    is_allowed = anom in allowed_set
    if is_allowed:
        allowed_cnt += 1
        print(f"ANOMALY name={anom} allowed=TRUE state=PERMISSIBLE")
    else:
        prevented_cnt += 1
        print(f"ANOMALY name={anom} allowed=FALSE state=PREVENTED")

print(f"SUMMARY isolation={isolation} total={len(checks)} allowed={allowed_cnt} prevented={prevented_cnt}")
`
  },
  {
    id: 'sql3-c1-e2',
    chapter: 1,
    title: 'Simulateur de verrous partagés et exclusifs (S/X Locks) et détection de conflit',
    level: 'n2',
    language: 'python',
    goal: 'Simuler l’octroi et les conflits de verrous partagés (S) et exclusifs (X) sur des ressources de base de données.',
    brief:
      'Dans un moteur transactionnel 2PL (Two-Phase Locking) :\n' +
      '- Un verrou partagé `S` (Shared, lecture) est compatible avec d’autres verrous `S` sur la même ressource, mais incompatible avec un verrou `X`.\n' +
      '- Un verrou exclusif `X` (Exclusive, écriture) est incompatible avec tout autre verrou (`S` ou `X`) sur la même ressource détenu par une autre transaction.\n' +
      '- Si une demande est incompatible avec les verrous actuels, elle est mise en attente (`WAITING`).\n' +
      '- Lorsqu’une transaction libère (`RELEASE`) ses verrous sur une ressource, les requêtes en attente peuvent être octroyées.\n\n' +
      'Entrée :\n' +
      '- `ACQUIRE tx=<tx_id> res=<resource_id> mode=<S|X>`\n' +
      '- `RELEASE tx=<tx_id> res=<resource_id>`\n\n' +
      'Sortie :\n' +
      '- Pour chaque ACQUIRE : `LOCK tx=<tx_id> res=<res> mode=<mode> status=<GRANTED|WAITING>`\n' +
      '- Pour chaque RELEASE : `UNLOCKED tx=<tx_id> res=<res> count_released=<N>` et si une attente est débloquée : `PROMOTED tx=<tx_id> res=<res> mode=<mode>`\n' +
      '- Bilan : `LOCK_REPORT granted_active=<N> waiting_active=<N>`',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : simuler la matrice de compatibilité des verrous S/X et la file d'attente
`,
    hints: [
      'Maintenir pour chaque ressource la liste des verrous actifs : {res: [(tx, mode), ...]} et la file d’attente : {res: deque([(tx, mode), ...])}.',
      'Un mode S est accordé si aucun verrou X d’une autre tx n’est actif.',
      'Un mode X est accordé si aucun verrou (S ou X) d’une autre tx n’est actif.'
    ],
    examples: [
      {
        stdin: 'ACQUIRE tx=T1 res=table_users mode=S\nACQUIRE tx=T2 res=table_users mode=S\nACQUIRE tx=T3 res=table_users mode=X\nRELEASE tx=T1 res=table_users',
        expected: 'LOCK tx=T1 res=table_users mode=S status=GRANTED\nLOCK tx=T2 res=table_users mode=S status=GRANTED\nLOCK tx=T3 res=table_users mode=X status=WAITING\nUNLOCKED tx=T1 res=table_users count_released=1\nLOCK_REPORT granted_active=1 waiting_active=1',
        note: 'T3 attend car T2 détient toujours un verrou S sur table_users.'
      }
    ],
    tests: [
      {
        label: 'Verrou X exclusif bloquant un verrou S ultérieur puis promotion après release',
        stdin: 'ACQUIRE tx=T1 res=row_42 mode=X\nACQUIRE tx=T2 res=row_42 mode=S\nRELEASE tx=T1 res=row_42',
        expected: 'LOCK tx=T1 res=row_42 mode=X status=GRANTED\nLOCK tx=T2 res=row_42 mode=S status=WAITING\nUNLOCKED tx=T1 res=row_42 count_released=1\nPROMOTED tx=T2 res=row_42 mode=S\nLOCK_REPORT granted_active=1 waiting_active=0'
      },
      {
        label: 'Deux transactions indépendantes sur deux ressources distinctes',
        stdin: 'ACQUIRE tx=T1 res=res_A mode=X\nACQUIRE tx=T2 res=res_B mode=X',
        expected: 'LOCK tx=T1 res=res_A mode=X status=GRANTED\nLOCK tx=T2 res=res_B mode=X status=GRANTED\nLOCK_REPORT granted_active=2 waiting_active=0'
      },
      {
        label: 'Libération complète d une file d attente',
        stdin: 'ACQUIRE tx=T1 res=account_10 mode=X\nACQUIRE tx=T2 res=account_10 mode=X\nRELEASE tx=T1 res=account_10\nRELEASE tx=T2 res=account_10',
        expected: 'LOCK tx=T1 res=account_10 mode=X status=GRANTED\nLOCK tx=T2 res=account_10 mode=X status=WAITING\nUNLOCKED tx=T1 res=account_10 count_released=1\nPROMOTED tx=T2 res=account_10 mode=X\nUNLOCKED tx=T2 res=account_10 count_released=1\nLOCK_REPORT granted_active=0 waiting_active=0'
      }
    ],
    solution: `import sys
from collections import deque

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# res -> list of (tx, mode) granted
active_locks = {}
# res -> deque of (tx, mode) waiting
wait_queues = {}

def can_grant(res, tx, mode):
    curr = active_locks.get(res, [])
    if not curr:
        return True
    if mode == 'S':
        # Can grant S if all active locks are S (from any tx)
        return all(m == 'S' for (_, m) in curr)
    else: # mode == 'X'
        # Can grant X only if current lock holder is solely tx itself
        return all(t == tx for (t, _) in curr)

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

    if cmd == 'ACQUIRE':
        tx = args.get('tx', '')
        res = args.get('res', '')
        mode = args.get('mode', 'S')

        # If there is already a queue for this res and queue is not empty, must wait
        queue = wait_queues.get(res, deque())
        if len(queue) == 0 and can_grant(res, tx, mode):
            if res not in active_locks:
                active_locks[res] = []
            active_locks[res].append((tx, mode))
            print(f"LOCK tx={tx} res={res} mode={mode} status=GRANTED")
        else:
            if res not in wait_queues:
                wait_queues[res] = deque()
            wait_queues[res].append((tx, mode))
            print(f"LOCK tx={tx} res={res} mode={mode} status=WAITING")

    elif cmd == 'RELEASE':
        tx = args.get('tx', '')
        res = args.get('res', '')

        curr = active_locks.get(res, [])
        new_curr = [(t, m) for (t, m) in curr if t != tx]
        released = len(curr) - len(new_curr)
        active_locks[res] = new_curr
        print(f"UNLOCKED tx={tx} res={res} count_released={released}")

        # Check wait queue to promote waiting locks
        queue = wait_queues.get(res, deque())
        while queue:
            next_tx, next_mode = queue[0]
            if can_grant(res, next_tx, next_mode):
                queue.popleft()
                active_locks[res].append((next_tx, next_mode))
                print(f"PROMOTED tx={next_tx} res={res} mode={next_mode}")
                if next_mode == 'X':
                    break # Exclusive lock taken, cannot promote others
            else:
                break

total_granted = sum(len(v) for v in active_locks.values())
total_waiting = sum(len(v) for v in wait_queues.values())
print(f"LOCK_REPORT granted_active={total_granted} waiting_active={total_waiting}")
`
  },
  {
    id: 'sql3-c1-e3',
    chapter: 1,
    title: 'Détecteur d’interblocage de transactions (Deadlock Graph Cycle Finder)',
    level: 'n3',
    language: 'python',
    goal: 'Construire le graphe d’attente des transactions (Wait-For Graph) et détecter les cycles d’interblocage avec désignation de la victime à avorter.',
    brief:
      'Dans un système de gestion de bases de données, un interblocage (Deadlock) survient lorsqu’un ensemble de transactions forment un cycle d’attente mutuel circulaire (ex: T1 attend T2, et T2 attend T1).\n' +
      'Le SGBD construit un graphe d’attente orienté $G = (V, E)$ où un arc $T_A \\to T_B$ signifie que la transaction $T_A$ attend la libération d’une ressource détenue par $T_B$.\n' +
      'Pour résoudre le deadlock, le moteur détecte le premier cycle orienté et sélectionne la transaction « victime » ayant le timestamp de démarrage le plus récent (ou identifiant alphabétique le plus grand en cas d’égalité) pour la terminer par un ROLLBACK forcé.\n\n' +
      'Entrée :\n' +
      '- Des déclarations de transactions : `TX id=<T1> start=<timestamp_int>`\n' +
      '- Des dépendances d’attente : `WAIT tx=<T1> waits_for=<T2>`\n\n' +
      'Sortie :\n' +
      '- Si un cycle est détecté : `DEADLOCK_DETECTED cycle=<T1->T2->...->T1>`\n' +
      '- Victime désignée : `VICTIM_SELECTED tx=<VICTIM_ID> action=ROLLBACK reason=YOUNGEST_TRANSACTION`\n' +
      '- Si aucun cycle : `NO_DEADLOCK status=SAFE edges=<COUNT>`',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : construire le graphe Wait-For Graph, détecter le cycle et choisir la victime
`,
    hints: [
      'Construire une liste d’adjacence adj[u] = [v, ...] représentant u -> v (u attend v).',
      'Utiliser un algorithme DFS avec détection d’arcs retour (Back-edges) à l’aide des états VISITING / VISITED.',
      'Reconstituer le chemin du cycle dès qu’un arc retour est trouvé.',
      'Parmi les transactions appartenant au cycle, sélectionner celle ayant la valeur start la plus grande.'
    ],
    examples: [
      {
        stdin: 'TX id=T1 start=100\nTX id=T2 start=200\nWAIT tx=T1 waits_for=T2\nWAIT tx=T2 waits_for=T1',
        expected: 'DEADLOCK_DETECTED cycle=T1->T2->T1\nVICTIM_SELECTED tx=T2 action=ROLLBACK reason=YOUNGEST_TRANSACTION',
        note: 'T1 et T2 forment un cycle. T2 est plus jeune (start=200 > 100) et est avortée.'
      }
    ],
    tests: [
      {
        label: 'Graphe sans cycle en chaîne linéaire',
        stdin: 'TX id=T1 start=10\nTX id=T2 start=20\nTX id=T3 start=30\nWAIT tx=T1 waits_for=T2\nWAIT tx=T2 waits_for=T3',
        expected: 'NO_DEADLOCK status=SAFE edges=2'
      },
      {
        label: 'Cycle de 3 transactions T1 -> T2 -> T3 -> T1',
        stdin: 'TX id=T1 start=10\nTX id=T2 start=25\nTX id=T3 start=40\nWAIT tx=T1 waits_for=T2\nWAIT tx=T2 waits_for=T3\nWAIT tx=T3 waits_for=T1',
        expected: 'DEADLOCK_DETECTED cycle=T1->T2->T3->T1\nVICTIM_SELECTED tx=T3 action=ROLLBACK reason=YOUNGEST_TRANSACTION'
      },
      {
        label: 'Graphe avec cycle partiel entre T2 et T4',
        stdin: 'TX id=T1 start=100\nTX id=T2 start=200\nTX id=T3 start=300\nTX id=T4 start=400\nWAIT tx=T1 waits_for=T2\nWAIT tx=T2 waits_for=T4\nWAIT tx=T4 waits_for=T2',
        expected: 'DEADLOCK_DETECTED cycle=T2->T4->T2\nVICTIM_SELECTED tx=T4 action=ROLLBACK reason=YOUNGEST_TRANSACTION'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

tx_start = {}
adj = {}
edges_count = 0

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

    if cmd == 'TX':
        tid = args.get('id', '')
        start = int(args.get('start', '0'))
        tx_start[tid] = start
        if tid not in adj:
            adj[tid] = []
    elif cmd == 'WAIT':
        u = args.get('tx', '')
        v = args.get('waits_for', '')
        if u not in adj:
            adj[u] = []
        if v not in adj:
            adj[v] = []
        adj[u].append(v)
        edges_count += 1

# DFS cycle detection
# 0: UNVISITED, 1: VISITING, 2: VISITED
state = {u: 0 for u in adj}
parent = {}
cycle_nodes = []

def dfs(u, path):
    global cycle_nodes
    state[u] = 1 # VISITING
    path.append(u)

    # Sort neighbors for deterministic traversal
    for v in sorted(adj.get(u, [])):
        if state.get(v, 0) == 1: # Found cycle
            idx = path.index(v)
            cycle_nodes = path[idx:] + [v]
            return True
        elif state.get(v, 0) == 0:
            if dfs(v, path):
                return True

    path.pop()
    state[u] = 2 # VISITED
    return False

found_cycle = False
for node in sorted(adj.keys()):
    if state[node] == 0:
        if dfs(node, []):
            found_cycle = True
            break

if found_cycle and cycle_nodes:
    cycle_str = '->'.join(cycle_nodes)
    print(f"DEADLOCK_DETECTED cycle={cycle_str}")
    # Nodes in cycle (excluding the last duplicate for victim selection)
    unique_cycle = cycle_nodes[:-1]
    # Pick victim: highest start timestamp, tie-breaker highest tid
    victim = max(unique_cycle, key=lambda t: (tx_start.get(t, 0), t))
    print(f"VICTIM_SELECTED tx={victim} action=ROLLBACK reason=YOUNGEST_TRANSACTION")
else:
    print(f"NO_DEADLOCK status=SAFE edges={edges_count}")
`
  }
];
