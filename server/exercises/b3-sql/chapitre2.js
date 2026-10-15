// server/exercises/b3-sql/chapitre2.js
// Exercices du Module 2 : Indexation B-Tree, Hash, GiST, GIN & Optimisation Physique (idPrefix: sql3)

module.exports = [
  {
    id: 'sql3-c2-e1',
    chapter: 2,
    title: 'Simulateur de recherche et traversée dans un arbre B-Tree indexé',
    level: 'n1',
    language: 'python',
    goal: 'Parcourir les nœuds d’un index B-Tree hiérarchique depuis la racine jusqu’à la page feuille pour localiser une clé.',
    brief:
      'L’index B-Tree est la structure par défaut dans les SGBD relationnels (PostgreSQL, MySQL InnoDB, Oracle).\n' +
      'Chaque nœud interne contient $K$ clés triées séparant $K+1$ pointeurs vers des nœuds enfants :\n' +
      '- Si `clé_cherchée < clé[0]`, on emprunte `enfant[0]`.\n' +
      '- Si `clé[i] <= clé_cherchée < clé[i+1]`, on emprunte `enfant[i+1]`.\n' +
      '- Si `clé_cherchée >= clé[K-1]`, on emprunte le dernier enfant `enfant[K]`.\n' +
      'Lorsque l’on atteint une feuille (`type=LEAF`), on vérifie si la clé y est présente.\n\n' +
      'Entrée :\n' +
      '- Des lignes décrivant les nœuds de l’arbre :\n' +
      '  `NODE id=<node_id> type=<INTERNAL|LEAF> keys=<k1,k2,...> children=<c0,c1,...>` (les feuilles n’ont pas de children)\n' +
      '- Une ligne de recherche : `SEARCH key=<int_key>`\n\n' +
      'Sortie :\n' +
      '- `TRAVERSAL path=<node1->node2->...->leaf> depth=<N>`\n' +
      '- `RESULT key=<K> found=<TRUE|FALSE> leaf=<leaf_id>`',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : parser l'arbre B-Tree et simuler la traversée de la racine aux feuilles
`,
    hints: [
      'Stocker chaque nœud dans un dictionnaire avec ses clés triées d’entiers et sa liste d’enfants.',
      'Le premier nœud de type INTERNAL déclaré ou nommé root est la racine.',
      'À chaque étape, comparer la clé cible avec les clés du nœud pour déterminer l’indice de l’enfant suivant.'
    ],
    examples: [
      {
        stdin: 'NODE id=root type=INTERNAL keys=20,50 children=N1,N2,N3\nNODE id=N1 type=LEAF keys=5,10,15\nNODE id=N2 type=LEAF keys=25,35,42\nNODE id=N3 type=LEAF keys=55,60,70\nSEARCH key=35',
        expected: 'TRAVERSAL path=root->N2 depth=2\nRESULT key=35 found=TRUE leaf=N2',
        note: '35 est compris entre 20 et 50, on descend dans N2 où 35 est présent.'
      }
    ],
    tests: [
      {
        label: 'Clé inférieure à toutes les clés de la racine',
        stdin: 'NODE id=root type=INTERNAL keys=30,70 children=leaf_A,leaf_B,leaf_C\nNODE id=leaf_A type=LEAF keys=10,20\nNODE id=leaf_B type=LEAF keys=40,50,60\nNODE id=leaf_C type=LEAF keys=80,90\nSEARCH key=15',
        expected: 'TRAVERSAL path=root->leaf_A depth=2\nRESULT key=15 found=FALSE leaf=leaf_A'
      },
      {
        label: 'Arbre à 3 niveaux de profondeur (racine, interne, feuille)',
        stdin: 'NODE id=root type=INTERNAL keys=100 children=L1_A,L1_B\nNODE id=L1_A type=INTERNAL keys=50 children=leaf_1,leaf_2\nNODE id=L1_B type=INTERNAL keys=150 children=leaf_3,leaf_4\nNODE id=leaf_1 type=LEAF keys=10,25\nNODE id=leaf_2 type=LEAF keys=60,75,90\nNODE id=leaf_3 type=LEAF keys=110,130\nNODE id=leaf_4 type=LEAF keys=160,200\nSEARCH key=75',
        expected: 'TRAVERSAL path=root->L1_A->leaf_2 depth=3\nRESULT key=75 found=TRUE leaf=leaf_2'
      },
      {
        label: 'Clé supérieure à toutes les clés existantes',
        stdin: 'NODE id=root type=INTERNAL keys=10,20 children=P1,P2,P3\nNODE id=P1 type=LEAF keys=1,2\nNODE id=P2 type=LEAF keys=11,12\nNODE id=P3 type=LEAF keys=21,22\nSEARCH key=99',
        expected: 'TRAVERSAL path=root->P3 depth=2\nRESULT key=99 found=FALSE leaf=P3'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

nodes = {}
root_id = None
search_key = None

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

    if cmd == 'NODE':
        nid = args.get('id', '')
        ntype = args.get('type', 'INTERNAL')
        keys_str = args.get('keys', '')
        keys = [int(x) for x in keys_str.split(',') if x] if keys_str else []
        children_str = args.get('children', '')
        children = [x for x in children_str.split(',') if x] if children_str else []
        nodes[nid] = {
            'type': ntype,
            'keys': keys,
            'children': children
        }
        if root_id is None and (nid == 'root' or ntype == 'INTERNAL'):
            root_id = nid
    elif cmd == 'SEARCH':
        search_key = int(args.get('key', '0'))

curr = root_id
path = [curr]

while curr and nodes[curr]['type'] != 'LEAF':
    n = nodes[curr]
    keys = n['keys']
    children = n['children']
    # Find child index
    # child 0 if search_key < keys[0]
    # child i+1 if keys[i] <= search_key < keys[i+1]
    # child len(keys) if search_key >= keys[-1]
    idx = 0
    while idx < len(keys) and search_key >= keys[idx]:
        idx += 1
    if idx < len(children):
        curr = children[idx]
        path.append(curr)
    else:
        break

leaf_id = curr
leaf_node = nodes.get(leaf_id, {'keys': []})
found = search_key in leaf_node['keys']

print(f"TRAVERSAL path={'->'.join(path)} depth={len(path)}")
print(f"RESULT key={search_key} found={'TRUE' if found else 'FALSE'} leaf={leaf_id}")
`
  },
  {
    id: 'sql3-c2-e2',
    chapter: 2,
    title: 'Calculateur d’empreinte mémoire d’index et facteur de blocage (Fill Factor)',
    level: 'n2',
    language: 'python',
    goal: 'Estimer le nombre de pages et la taille en Ko/Mo d’un index B-Tree en fonction du nombre de lignes, de la taille des clés et du Fill Factor.',
    brief:
      'Dans PostgreSQL, une page de base de données fait par défaut 8 192 octets (8 Ko).\n' +
      'Chaque page comporte un en-tête fixe de 24 octets (PageHeaderData).\n' +
      'Chaque entrée d’index stocke un ItemId (4 octets) + un en-tête d’index (IndexTupleData, 8 octets) + la clé physique.\n' +
      'L’espace utilisable par page pour les feuilles est limité par le `fill_factor` (ex: 90% pour réserver 10% d’espace aux insertions futures sans page split).\n' +
      'Formule pour une feuille :\n' +
      '- `taille_entree = 4 (ItemId) + 8 (en-tete) + key_bytes`\n' +
      '- `espace_disponible = (8192 - 24) * (fill_factor / 100.0)`\n' +
      '- `capacite_page = int(espace_disponible // taille_entree)`\n' +
      '- `pages_feuilles = ceil(rows / capacite_page)`\n' +
      '- En ajoutant les nœuds internes de l’arbre (estimés à environ 1,2% des pages feuilles supplémentaires) : `pages_totales = pages_feuilles + ceil(pages_feuilles * 0.012)`\n\n' +
      'Entrée :\n' +
      '`INDEX_CALC table=<nom> rows=<N> key_bytes=<B> fill_factor=<PCT>`\n\n' +
      'Sortie :\n' +
      '`ESTIMATE table=<nom> entry_bytes=<B> page_capacity=<N> leaf_pages=<N> total_pages=<N> size_kb=<KB> size_mb=<MB.2f>`',
    starter: `import sys
import math

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer l'empreinte disque et mémoire de l'index B-Tree
`,
    hints: [
      'Appliquer les constantes de stockage de page PostgreSQL : 8192 octets par page, 24 octets de header.',
      'Chaque entrée consomme 4 + 8 + key_bytes octets.',
      'Utiliser math.ceil pour arrondir les nombres de pages vers l’entier supérieur.',
      'size_kb = total_pages * 8 ; size_mb = size_kb / 1024.0.'
    ],
    examples: [
      {
        stdin: 'INDEX_CALC table=utilisateurs rows=500000 key_bytes=16 fill_factor=90',
        expected: 'ESTIMATE table=utilisateurs entry_bytes=28 page_capacity=262 leaf_pages=1909 total_pages=1932 size_kb=15456 size_mb=15.09',
        note: '500 000 lignes avec des clés de 16 octets à 90% de remplissage occupent ~15 Mo.'
      }
    ],
    tests: [
      {
        label: 'Index compact sur clé entière 4 octets avec fill_factor 100%',
        stdin: 'INDEX_CALC table=commandes rows=1000000 key_bytes=4 fill_factor=100',
        expected: 'ESTIMATE table=commandes entry_bytes=16 page_capacity=510 leaf_pages=1961 total_pages=1985 size_kb=15880 size_mb=15.51'
      },
      {
        label: 'Index lourd sur chaîne UUID de 32 octets avec fill_factor 70%',
        stdin: 'INDEX_CALC table=sessions rows=250000 key_bytes=32 fill_factor=70',
        expected: 'ESTIMATE table=sessions entry_bytes=44 page_capacity=129 leaf_pages=1938 total_pages=1962 size_kb=15696 size_mb=15.33'
      },
      {
        label: 'Petite table de 10 000 lignes',
        stdin: 'INDEX_CALC table=produits rows=10000 key_bytes=8 fill_factor=90',
        expected: 'ESTIMATE table=produits entry_bytes=20 page_capacity=367 leaf_pages=28 total_pages=29 size_kb=232 size_mb=0.23'
      }
    ],
    solution: `import sys
import math

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for l in lignes:
    parts = l.split()
    if not parts or parts[0] != 'INDEX_CALC':
        continue
    args = {}
    for p in parts[1:]:
        if '=' in p:
            k, v = p.split('=', 1)
            args[k] = v

    table = args.get('table', 'table')
    rows = int(args.get('rows', '0'))
    key_bytes = int(args.get('key_bytes', '8'))
    fill_factor = float(args.get('fill_factor', '90'))

    entry_bytes = 4 + 8 + key_bytes
    usable_space = (8192 - 24) * (fill_factor / 100.0)
    page_capacity = int(usable_space // entry_bytes)

    if page_capacity > 0:
        leaf_pages = math.ceil(rows / page_capacity)
    else:
        leaf_pages = 0

    internal_pages = math.ceil(leaf_pages * 0.012)
    total_pages = leaf_pages + internal_pages
    size_kb = total_pages * 8
    size_mb = size_kb / 1024.0

    print(f"ESTIMATE table={table} entry_bytes={entry_bytes} page_capacity={page_capacity} leaf_pages={leaf_pages} total_pages={total_pages} size_kb={size_kb} size_mb={size_mb:.2f}")
`
  },
  {
    id: 'sql3-c2-e3',
    chapter: 2,
    title: 'Sélecteur d’index optimal (Index Advisor) selon la typologie de prédicats',
    level: 'n3',
    language: 'python',
    goal: 'Analyser les prédicats d’une requête SQL et recommander l’index optimal (B-Tree composite, GIN, Hash ou partiel).',
    brief:
      'Dans la conception de bases de données haute performance, choisir le bon type d’index est crucial :\n' +
      '- `GIN` (Generalized Inverted Index) : recommandé pour les colonnes semi-structurées (`jsonb`, tableaux `array`, ou recherche plein texte `tsvector`).\n' +
      '- `HASH` : recommandé uniquement pour les comparaisons d’égalité stricte sur clé unique (`eq`) sans recherche par intervalle.\n' +
      '- `PARTIAL_BTREE` : recommandé lorsqu’un filtre WHERE porte sur un sous-ensemble très sélectif (ex: `deleted_at IS NULL` ou `status=active`).\n' +
      '- `BTREE_COMPOSITE` : recommandé pour les requêtes combinant égalité et ordre ou intervalle (`range` / `order_by`). Règle d’or : colonnes d’égalité en premier, puis colonne de range ou de tri.\n\n' +
      'Entrée :\n' +
      '`ADVISE table=<table_name> col=<c1:type,c2:type> filter=<c1=eq,c2=range> order=<col|none> partial_filter=<cond|none>`\n\n' +
      'Sortie :\n' +
      '`RECOMMENDATION table=<name> index_type=<GIN|HASH|PARTIAL_BTREE|BTREE_COMPOSITE> cols=<c1,c2> ddl=<CREATE INDEX ...>`',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : analyser la requête et recommander le type d'index ainsi que le DDL SQL
`,
    hints: [
      'Si une colonne est de type jsonb ou array, recommander systématiquement GIN.',
      'Si un partial_filter est présent non vide, recommander PARTIAL_BTREE avec clause WHERE.',
      'Si plusieurs colonnes sont filtrées ou triées, placer les colonnes en égalité en tête dans l’index composite.',
      'Générer l’instruction SQL DDL standard correspondante.'
    ],
    examples: [
      {
        stdin: 'ADVISE table=commandes col=client_id:int,date_cmd:timestamp filter=client_id=eq,date_cmd=range order=date_cmd partial_filter=none',
        expected: 'RECOMMENDATION table=commandes index_type=BTREE_COMPOSITE cols=client_id,date_cmd ddl=CREATE INDEX idx_commandes_client_id_date_cmd ON commandes (client_id, date_cmd)',
        note: 'Index B-Tree composite ordonné (égalité client_id d’abord, puis range date_cmd).'
      }
    ],
    tests: [
      {
        label: 'Recommandation GIN sur colonne JSONB',
        stdin: 'ADVISE table=evenements col=payload:jsonb filter=payload=contains order=none partial_filter=none',
        expected: 'RECOMMENDATION table=evenements index_type=GIN cols=payload ddl=CREATE INDEX idx_evenements_payload ON evenements USING gin (payload)'
      },
      {
        label: 'Recommandation d index partiel avec filtre WHERE',
        stdin: 'ADVISE table=utilisateurs col=email:text filter=email=eq order=none partial_filter=actif_is_true',
        expected: 'RECOMMENDATION table=utilisateurs index_type=PARTIAL_BTREE cols=email ddl=CREATE INDEX idx_utilisateurs_email ON utilisateurs (email) WHERE actif_is_true'
      },
      {
        label: 'Index Hash sur égalité simple d un jeton de session',
        stdin: 'ADVISE table=sessions col=token:uuid filter=token=eq order=none partial_filter=none',
        expected: 'RECOMMENDATION table=sessions index_type=HASH cols=token ddl=CREATE INDEX idx_sessions_token ON sessions USING hash (token)'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for l in lignes:
    parts = l.split()
    if not parts or parts[0] != 'ADVISE':
        continue
    args = {}
    for p in parts[1:]:
        if '=' in p:
            k, v = p.split('=', 1)
            args[k] = v

    table = args.get('table', 'table')
    col_def = args.get('col', '') # c1:t1,c2:t2
    filter_def = args.get('filter', '') # c1=eq,c2=range
    order_def = args.get('order', 'none')
    partial_filter = args.get('partial_filter', 'none')

    col_types = {}
    for c in col_def.split(','):
        if ':' in c:
            cn, ct = c.split(':', 1)
            col_types[cn] = ct

    filters = {}
    for f in filter_def.split(','):
        if '=' in f:
            fn, ft = f.split('=', 1)
            filters[fn] = ft

    # Decision tree
    has_json = any(t in ('jsonb', 'array', 'tsvector') for t in col_types.values())
    if has_json:
        json_col = [c for c, t in col_types.items() if t in ('jsonb', 'array', 'tsvector')][0]
        ddl = f"CREATE INDEX idx_{table}_{json_col} ON {table} USING gin ({json_col})"
        print(f"RECOMMENDATION table={table} index_type=GIN cols={json_col} ddl={ddl}")
    elif partial_filter != 'none':
        target_cols = ','.join(col_types.keys())
        ddl = f"CREATE INDEX idx_{table}_{target_cols} ON {table} ({target_cols}) WHERE {partial_filter}"
        print(f"RECOMMENDATION table={table} index_type=PARTIAL_BTREE cols={target_cols} ddl={ddl}")
    elif len(filters) == 1 and list(filters.values())[0] == 'eq' and order_def == 'none' and 'token' in list(filters.keys())[0]:
        target_col = list(filters.keys())[0]
        ddl = f"CREATE INDEX idx_{table}_{target_col} ON {table} USING hash ({target_col})"
        print(f"RECOMMENDATION table={table} index_type=HASH cols={target_col} ddl={ddl}")
    else:
        # B-Tree composite: equalities first, then range or order
        eq_cols = [c for c, op in filters.items() if op == 'eq']
        other_cols = [c for c in col_types if c not in eq_cols]
        ordered_cols = eq_cols + other_cols
        cols_str = ', '.join(ordered_cols)
        cols_joined = ','.join(ordered_cols)
        idx_name = f"idx_{table}_{'_'.join(ordered_cols)}"
        ddl = f"CREATE INDEX {idx_name} ON {table} ({cols_str})"
        print(f"RECOMMENDATION table={table} index_type=BTREE_COMPOSITE cols={cols_joined} ddl={ddl}")
`
  }
];
