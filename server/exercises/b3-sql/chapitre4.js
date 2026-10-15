// server/exercises/b3-sql/chapitre4.js
// Exercices du Module 4 : Fonctions de Fenêtrage (Window Functions) & CTEs Récursives (idPrefix: sql3)

module.exports = [
  {
    id: 'sql3-c4-e1',
    chapter: 4,
    title: 'Simulateur de fonctions de classement (ROW_NUMBER vs RANK vs DENSE_RANK)',
    level: 'n1',
    language: 'python',
    goal: 'Appliquer et comparer les trois fonctions de classement standardisées SQL sur une série de valeurs avec ex-æquo.',
    brief:
      'Dans la norme SQL analytique, les fonctions de classement ordonnent les lignes au sein d’une fenêtre de partition :\n' +
      '- `ROW_NUMBER()` : attribue un entier consécutif unique strict ($1, 2, 3, \\dots$) sans aucun doublon.\n' +
      '- `RANK()` : attribue le même rang aux lignes ex-æquo, puis saute les rangs suivants ($1, 2, 2, 4, 5, \\dots$).\n' +
      '- `DENSE_RANK()` : attribue le même rang aux lignes ex-æquo, sans sauter de rang ($1, 2, 2, 3, 4, \\dots$).\n\n' +
      'Entrée :\n' +
      '`SERIE vals=<v1,v2,...>` (les valeurs sont ordonnées de manière décroissante)\n\n' +
      'Sortie :\n' +
      '- Pour chaque élément :\n' +
      '  `RANK_ROW val=<V> row_num=<N> rank=<R> dense_rank=<D>`\n' +
      '- Bilan : `SUMMARY total_rows=<N> max_rank=<R> max_dense_rank=<D>`',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer ROW_NUMBER, RANK et DENSE_RANK pour chaque valeur
`,
    hints: [
      'Itérer sur la liste triée avec l’indice courant i (1-based pour row_number).',
      'Pour RANK : si val == val_precedente, conserver le même rank que le premier ex-æquo ; sinon rank = i.',
      'Pour DENSE_RANK : n’incrémenter le rang que lorsque la valeur change.'
    ],
    examples: [
      {
        stdin: 'SERIE vals=100,90,90,80,70',
        expected: 'RANK_ROW val=100 row_num=1 rank=1 dense_rank=1\nRANK_ROW val=90 row_num=2 rank=2 dense_rank=2\nRANK_ROW val=90 row_num=3 rank=2 dense_rank=2\nRANK_ROW val=80 row_num=4 rank=4 dense_rank=3\nRANK_ROW val=70 row_num=5 rank=5 dense_rank=4\nSUMMARY total_rows=5 max_rank=5 max_dense_rank=4',
        note: 'Les deux notes à 90 partagent le rang 2. RANK saute à 4, DENSE_RANK continue à 3.'
      }
    ],
    tests: [
      {
        label: 'Toutes les valeurs identiques (ex-æquo parfait)',
        stdin: 'SERIE vals=50,50,50,50',
        expected: 'RANK_ROW val=50 row_num=1 rank=1 dense_rank=1\nRANK_ROW val=50 row_num=2 rank=1 dense_rank=1\nRANK_ROW val=50 row_num=3 rank=1 dense_rank=1\nRANK_ROW val=50 row_num=4 rank=1 dense_rank=1\nSUMMARY total_rows=4 max_rank=1 max_dense_rank=1'
      },
      {
        label: 'Toutes les valeurs strictement distinctes',
        stdin: 'SERIE vals=30,25,20,15,10',
        expected: 'RANK_ROW val=30 row_num=1 rank=1 dense_rank=1\nRANK_ROW val=25 row_num=2 rank=2 dense_rank=2\nRANK_ROW val=20 row_num=3 rank=3 dense_rank=3\nRANK_ROW val=15 row_num=4 rank=4 dense_rank=4\nRANK_ROW val=10 row_num=5 rank=5 dense_rank=5\nSUMMARY total_rows=5 max_rank=5 max_dense_rank=5'
      },
      {
        label: 'Multiples groupes d ex-æquo consécutifs',
        stdin: 'SERIE vals=80,80,60,60,60,40',
        expected: 'RANK_ROW val=80 row_num=1 rank=1 dense_rank=1\nRANK_ROW val=80 row_num=2 rank=1 dense_rank=1\nRANK_ROW val=60 row_num=3 rank=3 dense_rank=2\nRANK_ROW val=60 row_num=4 rank=3 dense_rank=2\nRANK_ROW val=60 row_num=5 rank=3 dense_rank=2\nRANK_ROW val=40 row_num=6 rank=6 dense_rank=3\nSUMMARY total_rows=6 max_rank=6 max_dense_rank=3'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for l in lignes:
    parts = l.split()
    if not parts or parts[0] != 'SERIE':
        continue
    for p in parts[1:]:
        if p.startswith('vals='):
            vals_str = p.split('=', 1)[1]
            vals = [int(x) for x in vals_str.split(',') if x]

            row_num = 0
            curr_rank = 1
            curr_dense = 1
            prev_val = None

            max_rank = 1
            max_dense = 1

            for i, v in enumerate(vals, start=1):
                row_num = i
                if prev_val is None:
                    curr_rank = 1
                    curr_dense = 1
                elif v == prev_val:
                    # Keep same rank and dense_rank
                    pass
                else:
                    curr_rank = i
                    curr_dense += 1

                prev_val = v
                if curr_rank > max_rank:
                    max_rank = curr_rank
                if curr_dense > max_dense:
                    max_dense = curr_dense

                print(f"RANK_ROW val={v} row_num={row_num} rank={curr_rank} dense_rank={curr_dense}")

            print(f"SUMMARY total_rows={len(vals)} max_rank={max_rank} max_dense_rank={max_dense}")
`
  },
  {
    id: 'sql3-c4-e2',
    chapter: 4,
    title: 'Calculateur de moyennes et sommes glissantes avec clause d’encadrement',
    level: 'n2',
    language: 'python',
    goal: 'Simuler l’agrégation fenêtrée avec la clause de cadrage ROWS BETWEEN k PRECEDING AND CURRENT ROW.',
    brief:
      'Dans la clause `OVER (ORDER BY date ROWS BETWEEN k PRECEDING AND CURRENT ROW)` :\n' +
      '- Pour chaque ligne courante, la fenêtre d’agrégation englobe au maximum les $k$ lignes précédentes plus la ligne courante (soit jusqu’à $k+1$ éléments).\n' +
      '- On calcule la somme cumulée de la fenêtre et la moyenne mobile arithmétique associée arrondie à 2 décimales.\n\n' +
      'Entrée :\n' +
      '- Une ligne définissant la taille de l’historique : `CONFIG preceding=<K>`\n' +
      '- Des lignes de données : `ROW id=<step> val=<float_val>`\n\n' +
      'Sortie :\n' +
      '- Pour chaque ligne : `WINDOW_AGG id=<step> val=<V.2f> sum=<SUM.2f> avg=<AVG.2f> window_size=<COUNT>`\n' +
      '- En fin de série : `FINAL_METRIC total_rows=<N> last_avg=<LAST_AVG.2f>`',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : implémenter la fenêtre glissante ROWS BETWEEN k PRECEDING AND CURRENT ROW
`,
    hints: [
      'Maintenir une liste ou deque des k+1 dernières valeurs observées.',
      'Pour chaque ligne, sommer les éléments de la fenêtre et diviser par len(fenetre).',
      'Formater avec :.2f pour les sommes et moyennes.'
    ],
    examples: [
      {
        stdin: 'CONFIG preceding=2\nROW id=1 val=10\nROW id=2 val=20\nROW id=3 val=30\nROW id=4 val=40',
        expected: 'WINDOW_AGG id=1 val=10.00 sum=10.00 avg=10.00 window_size=1\nWINDOW_AGG id=2 val=20.00 sum=30.00 avg=15.00 window_size=2\nWINDOW_AGG id=3 val=30.00 sum=60.00 avg=20.00 window_size=3\nWINDOW_AGG id=4 val=40.00 sum=90.00 avg=30.00 window_size=3\nFINAL_METRIC total_rows=4 last_avg=30.00',
        note: 'Pour l’id=4 avec preceding=2, la fenêtre contient [20, 30, 40] : somme=90, moyenne=30.'
      }
    ],
    tests: [
      {
        label: 'Fenêtre cumulée depuis le début (preceding infini / très grand)',
        stdin: 'CONFIG preceding=100\nROW id=1 val=5\nROW id=2 val=15\nROW id=3 val=25',
        expected: 'WINDOW_AGG id=1 val=5.00 sum=5.00 avg=5.00 window_size=1\nWINDOW_AGG id=2 val=15.00 sum=20.00 avg=10.00 window_size=2\nWINDOW_AGG id=3 val=25.00 sum=45.00 avg=15.00 window_size=3\nFINAL_METRIC total_rows=3 last_avg=15.00'
      },
      {
        label: 'Fenêtre de 1 ligne précédente (preceding=1)',
        stdin: 'CONFIG preceding=1\nROW id=1 val=100\nROW id=2 val=200\nROW id=3 val=50',
        expected: 'WINDOW_AGG id=1 val=100.00 sum=100.00 avg=100.00 window_size=1\nWINDOW_AGG id=2 val=200.00 sum=300.00 avg=150.00 window_size=2\nWINDOW_AGG id=3 val=50.00 sum=250.00 avg=125.00 window_size=2\nFINAL_METRIC total_rows=3 last_avg=125.00'
      },
      {
        label: 'Fenêtre stricte preceding=0 (uniquement current row)',
        stdin: 'CONFIG preceding=0\nROW id=1 val=12.5\nROW id=2 val=25.0',
        expected: 'WINDOW_AGG id=1 val=12.50 sum=12.50 avg=12.50 window_size=1\nWINDOW_AGG id=2 val=25.00 sum=25.00 avg=25.00 window_size=1\nFINAL_METRIC total_rows=2 last_avg=25.00'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

k = 1
rows = []

for l in lignes:
    parts = l.split()
    if not parts:
        continue
    if parts[0] == 'CONFIG':
        for p in parts[1:]:
            if p.startswith('preceding='):
                k = int(p.split('=', 1)[1])
    elif parts[0] == 'ROW':
        args = {}
        for p in parts[1:]:
            if '=' in p:
                k_arg, v_arg = p.split('=', 1)
                args[k_arg] = v_arg
        rid = args.get('id', '')
        rval = float(args.get('val', '0.0'))
        rows.append((rid, rval))

history = []
last_avg = 0.0

for rid, val in rows:
    history.append(val)
    # Window is last k+1 elements
    window = history[-(k + 1):]
    w_sum = sum(window)
    w_avg = w_sum / float(len(window))
    last_avg = w_avg
    print(f"WINDOW_AGG id={rid} val={val:.2f} sum={w_sum:.2f} avg={w_avg:.2f} window_size={len(window)}")

print(f"FINAL_METRIC total_rows={len(rows)} last_avg={last_avg:.2f}")
`
  },
  {
    id: 'sql3-c4-e3',
    chapter: 4,
    title: 'Moteur de résolution de hiérarchie arborescente par CTE récursive',
    level: 'n3',
    language: 'python',
    goal: 'Calculer la profondeur, le chemin absolu et le nombre total de subordonnés dans une structure hiérarchique via une CTE récursive simulée.',
    brief:
      'Dans SQL standard, la syntaxe `WITH RECURSIVE` permet de parcourir des graphes et arbres hiérarchiques (ex: organigramme d’entreprise, nomenclature de pièces BOM) :\n' +
      '- Nœud racine (Ancre récursive) : employé dont `manager_id=0` (niveau 1, chemin `/<nom>`).\n' +
      '- Membre récursif : chaque subordonné direct d’un employé résolu hérite d’un `level = level_manager + 1` et d’un `path = path_manager / <nom>`.\n' +
      '- Le moteur calcule également pour chaque nœud le nombre total de subordonnés (descendants directs et indirects).\n\n' +
      'Entrée :\n' +
      '`EMP id=<int> name=<nom> manager=<int>` (manager=0 pour le sommet de l’arbre)\n\n' +
      'Sortie :\n' +
      '- Liste des employés triés par niveau puis par identifiant :\n' +
      '  `HIERARCHY id=<id> name=<name> level=<L> path=<PATH> subordinates=<COUNT>`\n' +
      '- Bilan de l’arbre : `TREE_REPORT max_depth=<D> total_nodes=<N>`',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : simuler la récursion CTE pour calculer les niveaux, chemins et descendants
`,
    hints: [
      'Construire un dictionnaire des employés et un graphe direct manager -> [enfants].',
      'Identifier la racine (manager=0) pour initialiser la récursion (BFS ou DFS).',
      'Pour le compte des subordonnés, une fonction récursive d’exploration du sous-arbre permet de sommer tous les descendants.'
    ],
    examples: [
      {
        stdin: 'EMP id=1 name=CEO manager=0\nEMP id=2 name=CTO manager=1\nEMP id=3 name=DevLead manager=2\nEMP id=4 name=Dev1 manager=3',
        expected: 'HIERARCHY id=1 name=CEO level=1 path=/CEO subordinates=3\nHIERARCHY id=2 name=CTO level=2 path=/CEO/CTO subordinates=2\nHIERARCHY id=3 name=DevLead level=3 path=/CEO/CTO/DevLead subordinates=1\nHIERARCHY id=4 name=Dev1 level=4 path=/CEO/CTO/DevLead/Dev1 subordinates=0\nTREE_REPORT max_depth=4 total_nodes=4',
        note: 'Arbre à 4 niveaux : le CEO a 3 subordonnés au total.'
      }
    ],
    tests: [
      {
        label: 'Organigramme avec plusieurs branches parallèles sous la racine',
        stdin: 'EMP id=1 name=CEO manager=0\nEMP id=2 name=VP_Sales manager=1\nEMP id=3 name=VP_Tech manager=1\nEMP id=4 name=Dev1 manager=3\nEMP id=5 name=Dev2 manager=3',
        expected: 'HIERARCHY id=1 name=CEO level=1 path=/CEO subordinates=4\nHIERARCHY id=2 name=VP_Sales level=2 path=/CEO/VP_Sales subordinates=0\nHIERARCHY id=3 name=VP_Tech level=2 path=/CEO/VP_Tech subordinates=2\nHIERARCHY id=4 name=Dev1 level=3 path=/CEO/VP_Tech/Dev1 subordinates=0\nHIERARCHY id=5 name=Dev2 level=3 path=/CEO/VP_Tech/Dev2 subordinates=0\nTREE_REPORT max_depth=3 total_nodes=5'
      },
      {
        label: 'Nœud unique racine sans subordonné',
        stdin: 'EMP id=1 name=SoloConsultant manager=0',
        expected: 'HIERARCHY id=1 name=SoloConsultant level=1 path=/SoloConsultant subordinates=0\nTREE_REPORT max_depth=1 total_nodes=1'
      },
      {
        label: 'Arbre de pièces industrielles (BOM)',
        stdin: 'EMP id=10 name=Voiture manager=0\nEMP id=20 name=Moteur manager=10\nEMP id=30 name=Piston manager=20\nEMP id=40 name=Chassis manager=10',
        expected: 'HIERARCHY id=10 name=Voiture level=1 path=/Voiture subordinates=3\nEMP_SORT_NEXT\nHIERARCHY id=20 name=Moteur level=2 path=/Voiture/Moteur subordinates=1\nHIERARCHY id=40 name=Chassis level=2 path=/Voiture/Chassis subordinates=0\nHIERARCHY id=30 name=Piston level=3 path=/Voiture/Moteur/Piston subordinates=0\nTREE_REPORT max_depth=3 total_nodes=4'.replace('EMP_SORT_NEXT\n', '')
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

employees = {}
children = {}

for l in lignes:
    parts = l.split()
    if not parts or parts[0] != 'EMP':
        continue
    args = {}
    for p in parts[1:]:
        if '=' in p:
            k, v = p.split('=', 1)
            args[k] = v

    eid = int(args.get('id', '0'))
    name = args.get('name', '')
    mgr = int(args.get('manager', '0'))

    employees[eid] = {'name': name, 'manager': mgr}
    if mgr not in children:
        children[mgr] = []
    children[mgr].append(eid)
    if eid not in children:
        children[eid] = []

# Subordinates counter (recursive DFS)
def count_subs(u):
    cnt = 0
    for child in children.get(u, []):
        cnt += 1 + count_subs(child)
    return cnt

# Find roots
roots = [eid for eid, data in employees.items() if data['manager'] == 0]

resolved = []
# BFS / recursive resolution
def traverse(u, level, path_str):
    resolved.append({
        'id': u,
        'name': employees[u]['name'],
        'level': level,
        'path': path_str,
        'subordinates': count_subs(u)
    })
    for child in sorted(children.get(u, [])):
        traverse(child, level + 1, f"{path_str}/{employees[child]['name']}")

for r in sorted(roots):
    traverse(r, 1, f"/{employees[r]['name']}")

# Sort resolved by level then id
resolved.sort(key=lambda x: (x['level'], x['id']))

max_depth = 0
for emp in resolved:
    if emp['level'] > max_depth:
        max_depth = emp['level']
    print(f"HIERARCHY id={emp['id']} name={emp['name']} level={emp['level']} path={emp['path']} subordinates={emp['subordinates']}")

print(f"TREE_REPORT max_depth={max_depth} total_nodes={len(resolved)}")
`
  }
];
