'use strict';

module.exports = [
  {
    "id": "sql3-c2-e1",
    "chapter": 2,
    "title": "Simulateur de recherche et traversée dans un arbre B-Tree indexé",
    "level": "n1",
    "language": "analyse",
    "goal": "Parcourir les nœuds d’un index B-Tree hiérarchique depuis la racine jusqu’à la page feuille pour localiser une clé.",
    "brief": "L’index B-Tree est la structure par défaut dans les SGBD relationnels (PostgreSQL, MySQL InnoDB, Oracle).\nChaque nœud interne contient $K$ clés triées séparant $K+1$ pointeurs vers des nœuds enfants :\n- Si `clé_cherchée < clé[0]`, on emprunte `enfant[0]`.\n- Si `clé[i] <= clé_cherchée < clé[i+1]`, on emprunte `enfant[i+1]`.\n- Si `clé_cherchée >= clé[K-1]`, on emprunte le dernier enfant `enfant[K]`.\nLorsque l’on atteint une feuille (`type=LEAF`), on vérifie si la clé y est présente.\n\nEntrée :\n- Des lignes décrivant les nœuds de l’arbre :\n  `NODE id=<node_id> type=<INTERNAL|LEAF> keys=<k1,k2,...> children=<c0,c1,...>` (les feuilles n’ont pas de children)\n- Une ligne de recherche : `SEARCH key=<int_key>`\n\nSortie :\n- `TRAVERSAL path=<node1->node2->...->leaf> depth=<N>`\n- `RESULT key=<K> found=<TRUE|FALSE> leaf=<leaf_id>`",
    "starter": "# Grille d'analyse (sql3-c2-e1) — Simulateur de recherche et traversée dans un arbre B-Tree indexé\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Clé inférieure à toutes les clés de la racine]\n# Données : NODE id=root type=INTERNAL keys=30,70 children=leaf_A,leaf_B,leaf_C\n# Données : NODE id=leaf_A type=LEAF keys=10,20\n# Données : NODE id=leaf_B type=LEAF keys=40,50,60\n# Données : NODE id=leaf_C type=LEAF keys=80,90\n# Données : SEARCH key=15\nA_COMPLETER\n\n[Cas 2 — Arbre à 3 niveaux de profondeur (racine, interne, feuille)]\n# Données : NODE id=root type=INTERNAL keys=100 children=L1_A,L1_B\n# Données : NODE id=L1_A type=INTERNAL keys=50 children=leaf_1,leaf_2\n# Données : NODE id=L1_B type=INTERNAL keys=150 children=leaf_3,leaf_4\n# Données : NODE id=leaf_1 type=LEAF keys=10,25\n# Données : NODE id=leaf_2 type=LEAF keys=60,75,90\n# Données : NODE id=leaf_3 type=LEAF keys=110,130\n# Données : NODE id=leaf_4 type=LEAF keys=160,200\n# Données : SEARCH key=75\nA_COMPLETER\n\n[Cas 3 — Clé supérieure à toutes les clés existantes]\n# Données : NODE id=root type=INTERNAL keys=10,20 children=P1,P2,P3\n# Données : NODE id=P1 type=LEAF keys=1,2\n# Données : NODE id=P2 type=LEAF keys=11,12\n# Données : NODE id=P3 type=LEAF keys=21,22\n# Données : SEARCH key=99\nA_COMPLETER\n",
    "hints": [
      "Stocker chaque nœud dans un dictionnaire avec ses clés triées d’entiers et sa liste d’enfants.",
      "Le premier nœud de type INTERNAL déclaré ou nommé root est la racine.",
      "À chaque étape, comparer la clé cible avec les clés du nœud pour déterminer l’indice de l’enfant suivant."
    ],
    "examples": [
      {
        "stdin": "NODE id=root type=INTERNAL keys=20,50 children=N1,N2,N3\nNODE id=N1 type=LEAF keys=5,10,15\nNODE id=N2 type=LEAF keys=25,35,42\nNODE id=N3 type=LEAF keys=55,60,70\nSEARCH key=35",
        "expected": "TRAVERSAL path=root->N2 depth=2\nRESULT key=35 found=TRUE leaf=N2",
        "note": "35 est compris entre 20 et 50, on descend dans N2 où 35 est présent."
      }
    ],
    "tests": [
      {
        "label": "Clé inférieure à toutes les clés de la racine",
        "stdin": "cas:1",
        "expected": "TRAVERSAL path=root->leaf_A depth=2\nRESULT key=15 found=FALSE leaf=leaf_A"
      },
      {
        "label": "Arbre à 3 niveaux de profondeur (racine, interne, feuille)",
        "stdin": "cas:2",
        "expected": "TRAVERSAL path=root->L1_A->leaf_2 depth=3\nRESULT key=75 found=TRUE leaf=leaf_2"
      },
      {
        "label": "Clé supérieure à toutes les clés existantes",
        "stdin": "cas:3",
        "expected": "TRAVERSAL path=root->P3 depth=2\nRESULT key=99 found=FALSE leaf=P3"
      }
    ],
    "solution": "[Exemple]\nTRAVERSAL path=root->N2 depth=2\nRESULT key=35 found=TRUE leaf=N2\n\n[Cas 1 — Clé inférieure à toutes les clés de la racine]\nTRAVERSAL path=root->leaf_A depth=2\nRESULT key=15 found=FALSE leaf=leaf_A\n\n[Cas 2 — Arbre à 3 niveaux de profondeur (racine, interne, feuille)]\nTRAVERSAL path=root->L1_A->leaf_2 depth=3\nRESULT key=75 found=TRUE leaf=leaf_2\n\n[Cas 3 — Clé supérieure à toutes les clés existantes]\nTRAVERSAL path=root->P3 depth=2\nRESULT key=99 found=FALSE leaf=P3"
  },
  {
    "id": "sql3-c2-e2",
    "chapter": 2,
    "title": "Calculateur d’empreinte mémoire d’index et facteur de blocage (Fill Factor)",
    "level": "n2",
    "language": "analyse",
    "goal": "Estimer le nombre de pages et la taille en Ko/Mo d’un index B-Tree en fonction du nombre de lignes, de la taille des clés et du Fill Factor.",
    "brief": "Dans PostgreSQL, une page de base de données fait par défaut 8 192 octets (8 Ko).\nChaque page comporte un en-tête fixe de 24 octets (PageHeaderData).\nChaque entrée d’index stocke un ItemId (4 octets) + un en-tête d’index (IndexTupleData, 8 octets) + la clé physique.\nL’espace utilisable par page pour les feuilles est limité par le `fill_factor` (ex: 90% pour réserver 10% d’espace aux insertions futures sans page split).\nFormule pour une feuille :\n- `taille_entree = 4 (ItemId) + 8 (en-tete) + key_bytes`\n- `espace_disponible = (8192 - 24) * (fill_factor / 100.0)`\n- `capacite_page = int(espace_disponible // taille_entree)`\n- `pages_feuilles = ceil(rows / capacite_page)`\n- En ajoutant les nœuds internes de l’arbre (estimés à environ 1,2% des pages feuilles supplémentaires) : `pages_totales = pages_feuilles + ceil(pages_feuilles * 0.012)`\n\nEntrée :\n`INDEX_CALC table=<nom> rows=<N> key_bytes=<B> fill_factor=<PCT>`\n\nSortie :\n`ESTIMATE table=<nom> entry_bytes=<B> page_capacity=<N> leaf_pages=<N> total_pages=<N> size_kb=<KB> size_mb=<MB.2f>`",
    "starter": "# Grille d'analyse (sql3-c2-e2) — Calculateur d’empreinte mémoire d’index et facteur de blocage (Fill Factor)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Index compact sur clé entière 4 octets avec fill_factor 100%]\n# Données : INDEX_CALC table=commandes rows=1000000 key_bytes=4 fill_factor=100\nA_COMPLETER\n\n[Cas 2 — Index lourd sur chaîne UUID de 32 octets avec fill_factor 70%]\n# Données : INDEX_CALC table=sessions rows=250000 key_bytes=32 fill_factor=70\nA_COMPLETER\n\n[Cas 3 — Petite table de 10 000 lignes]\n# Données : INDEX_CALC table=produits rows=10000 key_bytes=8 fill_factor=90\nA_COMPLETER\n",
    "hints": [
      "Appliquer les constantes de stockage de page PostgreSQL : 8192 octets par page, 24 octets de header.",
      "Chaque entrée consomme 4 + 8 + key_bytes octets.",
      "Utiliser math.ceil pour arrondir les nombres de pages vers l’entier supérieur.",
      "size_kb = total_pages * 8 ; size_mb = size_kb / 1024.0."
    ],
    "examples": [
      {
        "stdin": "INDEX_CALC table=utilisateurs rows=500000 key_bytes=16 fill_factor=90",
        "expected": "ESTIMATE table=utilisateurs entry_bytes=28 page_capacity=262 leaf_pages=1909 total_pages=1932 size_kb=15456 size_mb=15.09",
        "note": "500 000 lignes avec des clés de 16 octets à 90% de remplissage occupent ~15 Mo."
      }
    ],
    "tests": [
      {
        "label": "Index compact sur clé entière 4 octets avec fill_factor 100%",
        "stdin": "cas:1",
        "expected": "ESTIMATE table=commandes entry_bytes=16 page_capacity=510 leaf_pages=1961 total_pages=1985 size_kb=15880 size_mb=15.51"
      },
      {
        "label": "Index lourd sur chaîne UUID de 32 octets avec fill_factor 70%",
        "stdin": "cas:2",
        "expected": "ESTIMATE table=sessions entry_bytes=44 page_capacity=129 leaf_pages=1938 total_pages=1962 size_kb=15696 size_mb=15.33"
      },
      {
        "label": "Petite table de 10 000 lignes",
        "stdin": "cas:3",
        "expected": "ESTIMATE table=produits entry_bytes=20 page_capacity=367 leaf_pages=28 total_pages=29 size_kb=232 size_mb=0.23"
      }
    ],
    "solution": "[Exemple]\nESTIMATE table=utilisateurs entry_bytes=28 page_capacity=262 leaf_pages=1909 total_pages=1932 size_kb=15456 size_mb=15.09\n\n[Cas 1 — Index compact sur clé entière 4 octets avec fill_factor 100%]\nESTIMATE table=commandes entry_bytes=16 page_capacity=510 leaf_pages=1961 total_pages=1985 size_kb=15880 size_mb=15.51\n\n[Cas 2 — Index lourd sur chaîne UUID de 32 octets avec fill_factor 70%]\nESTIMATE table=sessions entry_bytes=44 page_capacity=129 leaf_pages=1938 total_pages=1962 size_kb=15696 size_mb=15.33\n\n[Cas 3 — Petite table de 10 000 lignes]\nESTIMATE table=produits entry_bytes=20 page_capacity=367 leaf_pages=28 total_pages=29 size_kb=232 size_mb=0.23"
  },
  {
    "id": "sql3-c2-e3",
    "chapter": 2,
    "title": "Sélecteur d’index optimal (Index Advisor) selon la typologie de prédicats",
    "level": "n3",
    "language": "analyse",
    "goal": "Analyser les prédicats d’une requête SQL et recommander l’index optimal (B-Tree composite, GIN, Hash ou partiel).",
    "brief": "Dans la conception de bases de données haute performance, choisir le bon type d’index est crucial :\n- `GIN` (Generalized Inverted Index) : recommandé pour les colonnes semi-structurées (`jsonb`, tableaux `array`, ou recherche plein texte `tsvector`).\n- `HASH` : recommandé uniquement pour les comparaisons d’égalité stricte sur clé unique (`eq`) sans recherche par intervalle.\n- `PARTIAL_BTREE` : recommandé lorsqu’un filtre WHERE porte sur un sous-ensemble très sélectif (ex: `deleted_at IS NULL` ou `status=active`).\n- `BTREE_COMPOSITE` : recommandé pour les requêtes combinant égalité et ordre ou intervalle (`range` / `order_by`). Règle d’or : colonnes d’égalité en premier, puis colonne de range ou de tri.\n\nEntrée :\n`ADVISE table=<table_name> col=<c1:type,c2:type> filter=<c1=eq,c2=range> order=<col|none> partial_filter=<cond|none>`\n\nSortie :\n`RECOMMENDATION table=<name> index_type=<GIN|HASH|PARTIAL_BTREE|BTREE_COMPOSITE> cols=<c1,c2> ddl=<CREATE INDEX ...>`",
    "starter": "# Grille d'analyse (sql3-c2-e3) — Sélecteur d’index optimal (Index Advisor) selon la typologie de prédicats\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Recommandation GIN sur colonne JSONB]\n# Données : ADVISE table=evenements col=payload:jsonb filter=payload=contains order=none partial_filter=none\nA_COMPLETER\n\n[Cas 2 — Recommandation d index partiel avec filtre WHERE]\n# Données : ADVISE table=utilisateurs col=email:text filter=email=eq order=none partial_filter=actif_is_true\nA_COMPLETER\n\n[Cas 3 — Index Hash sur égalité simple d un jeton de session]\n# Données : ADVISE table=sessions col=token:uuid filter=token=eq order=none partial_filter=none\nA_COMPLETER\n",
    "hints": [
      "Si une colonne est de type jsonb ou array, recommander systématiquement GIN.",
      "Si un partial_filter est présent non vide, recommander PARTIAL_BTREE avec clause WHERE.",
      "Si plusieurs colonnes sont filtrées ou triées, placer les colonnes en égalité en tête dans l’index composite.",
      "Générer l’instruction SQL DDL standard correspondante."
    ],
    "examples": [
      {
        "stdin": "ADVISE table=commandes col=client_id:int,date_cmd:timestamp filter=client_id=eq,date_cmd=range order=date_cmd partial_filter=none",
        "expected": "RECOMMENDATION table=commandes index_type=BTREE_COMPOSITE cols=client_id,date_cmd ddl=CREATE INDEX idx_commandes_client_id_date_cmd ON commandes (client_id, date_cmd)",
        "note": "Index B-Tree composite ordonné (égalité client_id d’abord, puis range date_cmd)."
      }
    ],
    "tests": [
      {
        "label": "Recommandation GIN sur colonne JSONB",
        "stdin": "cas:1",
        "expected": "RECOMMENDATION table=evenements index_type=GIN cols=payload ddl=CREATE INDEX idx_evenements_payload ON evenements USING gin (payload)"
      },
      {
        "label": "Recommandation d index partiel avec filtre WHERE",
        "stdin": "cas:2",
        "expected": "RECOMMENDATION table=utilisateurs index_type=PARTIAL_BTREE cols=email ddl=CREATE INDEX idx_utilisateurs_email ON utilisateurs (email) WHERE actif_is_true"
      },
      {
        "label": "Index Hash sur égalité simple d un jeton de session",
        "stdin": "cas:3",
        "expected": "RECOMMENDATION table=sessions index_type=HASH cols=token ddl=CREATE INDEX idx_sessions_token ON sessions USING hash (token)"
      }
    ],
    "solution": "[Exemple]\nRECOMMENDATION table=commandes index_type=BTREE_COMPOSITE cols=client_id,date_cmd ddl=CREATE INDEX idx_commandes_client_id_date_cmd ON commandes (client_id, date_cmd)\n\n[Cas 1 — Recommandation GIN sur colonne JSONB]\nRECOMMENDATION table=evenements index_type=GIN cols=payload ddl=CREATE INDEX idx_evenements_payload ON evenements USING gin (payload)\n\n[Cas 2 — Recommandation d index partiel avec filtre WHERE]\nRECOMMENDATION table=utilisateurs index_type=PARTIAL_BTREE cols=email ddl=CREATE INDEX idx_utilisateurs_email ON utilisateurs (email) WHERE actif_is_true\n\n[Cas 3 — Index Hash sur égalité simple d un jeton de session]\nRECOMMENDATION table=sessions index_type=HASH cols=token ddl=CREATE INDEX idx_sessions_token ON sessions USING hash (token)"
  }
];
