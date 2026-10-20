'use strict';

module.exports = [
  {
    "id": "sql3-c1-e1",
    "chapter": 1,
    "title": "Détecteur d’anomalies de concurrence selon le niveau d’isolation ANSI SQL",
    "level": "n1",
    "language": "analyse",
    "goal": "Déterminer si une anomalie de concurrence (Dirty Read, Non-Repeatable Read, Phantom Read) est possible sous un niveau d’isolation ANSI SQL donné.",
    "brief": "Dans un système de gestion de bases de données relationnelles (SGBDR), les 4 niveaux d’isolation standard ANSI SQL offrent des compromis distincts entre cohérence et performance :\n- READ UNCOMMITTED : autorise Dirty Read, Non-Repeatable Read et Phantom Read.\n- READ COMMITTED : empêche Dirty Read ; autorise Non-Repeatable Read et Phantom Read.\n- REPEATABLE READ : empêche Dirty Read et Non-Repeatable Read ; autorise Phantom Read.\n- SERIALIZABLE : empêche toutes les anomalies de concurrence (Dirty Read, Non-Repeatable Read, Phantom Read).\n\nEntrée :\n- Une ligne `ISOLATION <READ_UNCOMMITTED|READ_COMMITTED|REPEATABLE_READ|SERIALIZABLE>`\n- Des lignes `CHECK anomaly=<DIRTY_READ|NON_REPEATABLE_READ|PHANTOM_READ>`\n\nSortie :\n- Pour chaque vérification : `ANOMALY name=<NAME> allowed=<TRUE|FALSE> state=<PERMISSIBLE|PREVENTED>`\n- Une ligne de bilan : `SUMMARY isolation=<LEVEL> total=<N> allowed=<N> prevented=<N>`",
    "starter": "# Grille d'analyse (sql3-c1-e1) — Détecteur d’anomalies de concurrence selon le niveau d’isolation ANSI SQL\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Niveau SERIALIZABLE prévenant toutes les anomalies]\n# Données : ISOLATION SERIALIZABLE\n# Données : CHECK anomaly=DIRTY_READ\n# Données : CHECK anomaly=NON_REPEATABLE_READ\n# Données : CHECK anomaly=PHANTOM_READ\nA_COMPLETER\n\n[Cas 2 — Niveau READ UNCOMMITTED autorisant toutes les anomalies]\n# Données : ISOLATION READ_UNCOMMITTED\n# Données : CHECK anomaly=DIRTY_READ\n# Données : CHECK anomaly=NON_REPEATABLE_READ\n# Données : CHECK anomaly=PHANTOM_READ\nA_COMPLETER\n\n[Cas 3 — Niveau REPEATABLE READ prévenant Dirty Read et Non-Repeatable Read]\n# Données : ISOLATION REPEATABLE_READ\n# Données : CHECK anomaly=DIRTY_READ\n# Données : CHECK anomaly=NON_REPEATABLE_READ\n# Données : CHECK anomaly=PHANTOM_READ\nA_COMPLETER\n",
    "hints": [
      "Stocker la matrice d’admissibilité ANSI dans un dictionnaire associant chaque niveau à l’ensemble des anomalies permises.",
      "Parcourir les lignes commençant par CHECK et extraire la clé anomaly.",
      "Afficher TRUE/PERMISSIBLE si l’anomalie est possible, FALSE/PREVENTED sinon."
    ],
    "examples": [
      {
        "stdin": "ISOLATION READ_COMMITTED\nCHECK anomaly=DIRTY_READ\nCHECK anomaly=NON_REPEATABLE_READ\nCHECK anomaly=PHANTOM_READ",
        "expected": "ANOMALY name=DIRTY_READ allowed=FALSE state=PREVENTED\nANOMALY name=NON_REPEATABLE_READ allowed=TRUE state=PERMISSIBLE\nANOMALY name=PHANTOM_READ allowed=TRUE state=PERMISSIBLE\nSUMMARY isolation=READ_COMMITTED total=3 allowed=2 prevented=1",
        "note": "Sous READ COMMITTED, seule la lecture sale est prévenue."
      }
    ],
    "tests": [
      {
        "label": "Niveau SERIALIZABLE prévenant toutes les anomalies",
        "stdin": "cas:1",
        "expected": "ANOMALY name=DIRTY_READ allowed=FALSE state=PREVENTED\nANOMALY name=NON_REPEATABLE_READ allowed=FALSE state=PREVENTED\nANOMALY name=PHANTOM_READ allowed=FALSE state=PREVENTED\nSUMMARY isolation=SERIALIZABLE total=3 allowed=0 prevented=3"
      },
      {
        "label": "Niveau READ UNCOMMITTED autorisant toutes les anomalies",
        "stdin": "cas:2",
        "expected": "ANOMALY name=DIRTY_READ allowed=TRUE state=PERMISSIBLE\nANOMALY name=NON_REPEATABLE_READ allowed=TRUE state=PERMISSIBLE\nANOMALY name=PHANTOM_READ allowed=TRUE state=PERMISSIBLE\nSUMMARY isolation=READ_UNCOMMITTED total=3 allowed=3 prevented=0"
      },
      {
        "label": "Niveau REPEATABLE READ prévenant Dirty Read et Non-Repeatable Read",
        "stdin": "cas:3",
        "expected": "ANOMALY name=DIRTY_READ allowed=FALSE state=PREVENTED\nANOMALY name=NON_REPEATABLE_READ allowed=FALSE state=PREVENTED\nANOMALY name=PHANTOM_READ allowed=TRUE state=PERMISSIBLE\nSUMMARY isolation=REPEATABLE_READ total=3 allowed=1 prevented=2"
      }
    ],
    "solution": "[Exemple]\nANOMALY name=DIRTY_READ allowed=FALSE state=PREVENTED\nANOMALY name=NON_REPEATABLE_READ allowed=TRUE state=PERMISSIBLE\nANOMALY name=PHANTOM_READ allowed=TRUE state=PERMISSIBLE\nSUMMARY isolation=READ_COMMITTED total=3 allowed=2 prevented=1\n\n[Cas 1 — Niveau SERIALIZABLE prévenant toutes les anomalies]\nANOMALY name=DIRTY_READ allowed=FALSE state=PREVENTED\nANOMALY name=NON_REPEATABLE_READ allowed=FALSE state=PREVENTED\nANOMALY name=PHANTOM_READ allowed=FALSE state=PREVENTED\nSUMMARY isolation=SERIALIZABLE total=3 allowed=0 prevented=3\n\n[Cas 2 — Niveau READ UNCOMMITTED autorisant toutes les anomalies]\nANOMALY name=DIRTY_READ allowed=TRUE state=PERMISSIBLE\nANOMALY name=NON_REPEATABLE_READ allowed=TRUE state=PERMISSIBLE\nANOMALY name=PHANTOM_READ allowed=TRUE state=PERMISSIBLE\nSUMMARY isolation=READ_UNCOMMITTED total=3 allowed=3 prevented=0\n\n[Cas 3 — Niveau REPEATABLE READ prévenant Dirty Read et Non-Repeatable Read]\nANOMALY name=DIRTY_READ allowed=FALSE state=PREVENTED\nANOMALY name=NON_REPEATABLE_READ allowed=FALSE state=PREVENTED\nANOMALY name=PHANTOM_READ allowed=TRUE state=PERMISSIBLE\nSUMMARY isolation=REPEATABLE_READ total=3 allowed=1 prevented=2"
  },
  {
    "id": "sql3-c1-e2",
    "chapter": 1,
    "title": "Simulateur de verrous partagés et exclusifs (S/X Locks) et détection de conflit",
    "level": "n2",
    "language": "analyse",
    "goal": "Simuler l’octroi et les conflits de verrous partagés (S) et exclusifs (X) sur des ressources de base de données.",
    "brief": "Dans un moteur transactionnel 2PL (Two-Phase Locking) :\n- Un verrou partagé `S` (Shared, lecture) est compatible avec d’autres verrous `S` sur la même ressource, mais incompatible avec un verrou `X`.\n- Un verrou exclusif `X` (Exclusive, écriture) est incompatible avec tout autre verrou (`S` ou `X`) sur la même ressource détenu par une autre transaction.\n- Si une demande est incompatible avec les verrous actuels, elle est mise en attente (`WAITING`).\n- Lorsqu’une transaction libère (`RELEASE`) ses verrous sur une ressource, les requêtes en attente peuvent être octroyées.\n\nEntrée :\n- `ACQUIRE tx=<tx_id> res=<resource_id> mode=<S|X>`\n- `RELEASE tx=<tx_id> res=<resource_id>`\n\nSortie :\n- Pour chaque ACQUIRE : `LOCK tx=<tx_id> res=<res> mode=<mode> status=<GRANTED|WAITING>`\n- Pour chaque RELEASE : `UNLOCKED tx=<tx_id> res=<res> count_released=<N>` et si une attente est débloquée : `PROMOTED tx=<tx_id> res=<res> mode=<mode>`\n- Bilan : `LOCK_REPORT granted_active=<N> waiting_active=<N>`",
    "starter": "# Grille d'analyse (sql3-c1-e2) — Simulateur de verrous partagés et exclusifs (S/X Locks) et détection de conflit\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Verrou X exclusif bloquant un verrou S ultérieur puis promotion après release]\n# Données : ACQUIRE tx=T1 res=row_42 mode=X\n# Données : ACQUIRE tx=T2 res=row_42 mode=S\n# Données : RELEASE tx=T1 res=row_42\nA_COMPLETER\n\n[Cas 2 — Deux transactions indépendantes sur deux ressources distinctes]\n# Données : ACQUIRE tx=T1 res=res_A mode=X\n# Données : ACQUIRE tx=T2 res=res_B mode=X\nA_COMPLETER\n\n[Cas 3 — Libération complète d une file d attente]\n# Données : ACQUIRE tx=T1 res=account_10 mode=X\n# Données : ACQUIRE tx=T2 res=account_10 mode=X\n# Données : RELEASE tx=T1 res=account_10\n# Données : RELEASE tx=T2 res=account_10\nA_COMPLETER\n",
    "hints": [
      "Maintenir pour chaque ressource la liste des verrous actifs : {res: [(tx, mode), ...]} et la file d’attente : {res: deque([(tx, mode), ...])}.",
      "Un mode S est accordé si aucun verrou X d’une autre tx n’est actif.",
      "Un mode X est accordé si aucun verrou (S ou X) d’une autre tx n’est actif."
    ],
    "examples": [
      {
        "stdin": "ACQUIRE tx=T1 res=table_users mode=S\nACQUIRE tx=T2 res=table_users mode=S\nACQUIRE tx=T3 res=table_users mode=X\nRELEASE tx=T1 res=table_users",
        "expected": "LOCK tx=T1 res=table_users mode=S status=GRANTED\nLOCK tx=T2 res=table_users mode=S status=GRANTED\nLOCK tx=T3 res=table_users mode=X status=WAITING\nUNLOCKED tx=T1 res=table_users count_released=1\nLOCK_REPORT granted_active=1 waiting_active=1",
        "note": "T3 attend car T2 détient toujours un verrou S sur table_users."
      }
    ],
    "tests": [
      {
        "label": "Verrou X exclusif bloquant un verrou S ultérieur puis promotion après release",
        "stdin": "cas:1",
        "expected": "LOCK tx=T1 res=row_42 mode=X status=GRANTED\nLOCK tx=T2 res=row_42 mode=S status=WAITING\nUNLOCKED tx=T1 res=row_42 count_released=1\nPROMOTED tx=T2 res=row_42 mode=S\nLOCK_REPORT granted_active=1 waiting_active=0"
      },
      {
        "label": "Deux transactions indépendantes sur deux ressources distinctes",
        "stdin": "cas:2",
        "expected": "LOCK tx=T1 res=res_A mode=X status=GRANTED\nLOCK tx=T2 res=res_B mode=X status=GRANTED\nLOCK_REPORT granted_active=2 waiting_active=0"
      },
      {
        "label": "Libération complète d une file d attente",
        "stdin": "cas:3",
        "expected": "LOCK tx=T1 res=account_10 mode=X status=GRANTED\nLOCK tx=T2 res=account_10 mode=X status=WAITING\nUNLOCKED tx=T1 res=account_10 count_released=1\nPROMOTED tx=T2 res=account_10 mode=X\nUNLOCKED tx=T2 res=account_10 count_released=1\nLOCK_REPORT granted_active=0 waiting_active=0"
      }
    ],
    "solution": "[Exemple]\nLOCK tx=T1 res=table_users mode=S status=GRANTED\nLOCK tx=T2 res=table_users mode=S status=GRANTED\nLOCK tx=T3 res=table_users mode=X status=WAITING\nUNLOCKED tx=T1 res=table_users count_released=1\nLOCK_REPORT granted_active=1 waiting_active=1\n\n[Cas 1 — Verrou X exclusif bloquant un verrou S ultérieur puis promotion après release]\nLOCK tx=T1 res=row_42 mode=X status=GRANTED\nLOCK tx=T2 res=row_42 mode=S status=WAITING\nUNLOCKED tx=T1 res=row_42 count_released=1\nPROMOTED tx=T2 res=row_42 mode=S\nLOCK_REPORT granted_active=1 waiting_active=0\n\n[Cas 2 — Deux transactions indépendantes sur deux ressources distinctes]\nLOCK tx=T1 res=res_A mode=X status=GRANTED\nLOCK tx=T2 res=res_B mode=X status=GRANTED\nLOCK_REPORT granted_active=2 waiting_active=0\n\n[Cas 3 — Libération complète d une file d attente]\nLOCK tx=T1 res=account_10 mode=X status=GRANTED\nLOCK tx=T2 res=account_10 mode=X status=WAITING\nUNLOCKED tx=T1 res=account_10 count_released=1\nPROMOTED tx=T2 res=account_10 mode=X\nUNLOCKED tx=T2 res=account_10 count_released=1\nLOCK_REPORT granted_active=0 waiting_active=0"
  },
  {
    "id": "sql3-c1-e3",
    "chapter": 1,
    "title": "Détecteur d’interblocage de transactions (Deadlock Graph Cycle Finder)",
    "level": "n3",
    "language": "analyse",
    "goal": "Construire le graphe d’attente des transactions (Wait-For Graph) et détecter les cycles d’interblocage avec désignation de la victime à avorter.",
    "brief": "Dans un système de gestion de bases de données, un interblocage (Deadlock) survient lorsqu’un ensemble de transactions forment un cycle d’attente mutuel circulaire (ex: T1 attend T2, et T2 attend T1).\nLe SGBD construit un graphe d’attente orienté $G = (V, E)$ où un arc $T_A \\to T_B$ signifie que la transaction $T_A$ attend la libération d’une ressource détenue par $T_B$.\nPour résoudre le deadlock, le moteur détecte le premier cycle orienté et sélectionne la transaction « victime » ayant le timestamp de démarrage le plus récent (ou identifiant alphabétique le plus grand en cas d’égalité) pour la terminer par un ROLLBACK forcé.\n\nEntrée :\n- Des déclarations de transactions : `TX id=<T1> start=<timestamp_int>`\n- Des dépendances d’attente : `WAIT tx=<T1> waits_for=<T2>`\n\nSortie :\n- Si un cycle est détecté : `DEADLOCK_DETECTED cycle=<T1->T2->...->T1>`\n- Victime désignée : `VICTIM_SELECTED tx=<VICTIM_ID> action=ROLLBACK reason=YOUNGEST_TRANSACTION`\n- Si aucun cycle : `NO_DEADLOCK status=SAFE edges=<COUNT>`",
    "starter": "# Grille d'analyse (sql3-c1-e3) — Détecteur d’interblocage de transactions (Deadlock Graph Cycle Finder)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Graphe sans cycle en chaîne linéaire]\n# Données : TX id=T1 start=10\n# Données : TX id=T2 start=20\n# Données : TX id=T3 start=30\n# Données : WAIT tx=T1 waits_for=T2\n# Données : WAIT tx=T2 waits_for=T3\nA_COMPLETER\n\n[Cas 2 — Cycle de 3 transactions T1 -> T2 -> T3 -> T1]\n# Données : TX id=T1 start=10\n# Données : TX id=T2 start=25\n# Données : TX id=T3 start=40\n# Données : WAIT tx=T1 waits_for=T2\n# Données : WAIT tx=T2 waits_for=T3\n# Données : WAIT tx=T3 waits_for=T1\nA_COMPLETER\n\n[Cas 3 — Graphe avec cycle partiel entre T2 et T4]\n# Données : TX id=T1 start=100\n# Données : TX id=T2 start=200\n# Données : TX id=T3 start=300\n# Données : TX id=T4 start=400\n# Données : WAIT tx=T1 waits_for=T2\n# Données : WAIT tx=T2 waits_for=T4\n# Données : WAIT tx=T4 waits_for=T2\nA_COMPLETER\n",
    "hints": [
      "Construire une liste d’adjacence adj[u] = [v, ...] représentant u -> v (u attend v).",
      "Utiliser un algorithme DFS avec détection d’arcs retour (Back-edges) à l’aide des états VISITING / VISITED.",
      "Reconstituer le chemin du cycle dès qu’un arc retour est trouvé.",
      "Parmi les transactions appartenant au cycle, sélectionner celle ayant la valeur start la plus grande."
    ],
    "examples": [
      {
        "stdin": "TX id=T1 start=100\nTX id=T2 start=200\nWAIT tx=T1 waits_for=T2\nWAIT tx=T2 waits_for=T1",
        "expected": "DEADLOCK_DETECTED cycle=T1->T2->T1\nVICTIM_SELECTED tx=T2 action=ROLLBACK reason=YOUNGEST_TRANSACTION",
        "note": "T1 et T2 forment un cycle. T2 est plus jeune (start=200 > 100) et est avortée."
      }
    ],
    "tests": [
      {
        "label": "Graphe sans cycle en chaîne linéaire",
        "stdin": "cas:1",
        "expected": "NO_DEADLOCK status=SAFE edges=2"
      },
      {
        "label": "Cycle de 3 transactions T1 -> T2 -> T3 -> T1",
        "stdin": "cas:2",
        "expected": "DEADLOCK_DETECTED cycle=T1->T2->T3->T1\nVICTIM_SELECTED tx=T3 action=ROLLBACK reason=YOUNGEST_TRANSACTION"
      },
      {
        "label": "Graphe avec cycle partiel entre T2 et T4",
        "stdin": "cas:3",
        "expected": "DEADLOCK_DETECTED cycle=T2->T4->T2\nVICTIM_SELECTED tx=T4 action=ROLLBACK reason=YOUNGEST_TRANSACTION"
      }
    ],
    "solution": "[Exemple]\nDEADLOCK_DETECTED cycle=T1->T2->T1\nVICTIM_SELECTED tx=T2 action=ROLLBACK reason=YOUNGEST_TRANSACTION\n\n[Cas 1 — Graphe sans cycle en chaîne linéaire]\nNO_DEADLOCK status=SAFE edges=2\n\n[Cas 2 — Cycle de 3 transactions T1 -> T2 -> T3 -> T1]\nDEADLOCK_DETECTED cycle=T1->T2->T3->T1\nVICTIM_SELECTED tx=T3 action=ROLLBACK reason=YOUNGEST_TRANSACTION\n\n[Cas 3 — Graphe avec cycle partiel entre T2 et T4]\nDEADLOCK_DETECTED cycle=T2->T4->T2\nVICTIM_SELECTED tx=T4 action=ROLLBACK reason=YOUNGEST_TRANSACTION"
  },
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
  },
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
  },
  {
    "id": "sql3-c4-e1",
    "chapter": 4,
    "title": "Simulateur de fonctions de classement (ROW_NUMBER vs RANK vs DENSE_RANK)",
    "level": "n1",
    "language": "analyse",
    "goal": "Appliquer et comparer les trois fonctions de classement standardisées SQL sur une série de valeurs avec ex-æquo.",
    "brief": "Dans la norme SQL analytique, les fonctions de classement ordonnent les lignes au sein d’une fenêtre de partition :\n- `ROW_NUMBER()` : attribue un entier consécutif unique strict ($1, 2, 3, \\dots$) sans aucun doublon.\n- `RANK()` : attribue le même rang aux lignes ex-æquo, puis saute les rangs suivants ($1, 2, 2, 4, 5, \\dots$).\n- `DENSE_RANK()` : attribue le même rang aux lignes ex-æquo, sans sauter de rang ($1, 2, 2, 3, 4, \\dots$).\n\nEntrée :\n`SERIE vals=<v1,v2,...>` (les valeurs sont ordonnées de manière décroissante)\n\nSortie :\n- Pour chaque élément :\n  `RANK_ROW val=<V> row_num=<N> rank=<R> dense_rank=<D>`\n- Bilan : `SUMMARY total_rows=<N> max_rank=<R> max_dense_rank=<D>`",
    "starter": "# Grille d'analyse (sql3-c4-e1) — Simulateur de fonctions de classement (ROW_NUMBER vs RANK vs DENSE_RANK)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Toutes les valeurs identiques (ex-æquo parfait)]\n# Données : SERIE vals=50,50,50,50\nA_COMPLETER\n\n[Cas 2 — Toutes les valeurs strictement distinctes]\n# Données : SERIE vals=30,25,20,15,10\nA_COMPLETER\n\n[Cas 3 — Multiples groupes d ex-æquo consécutifs]\n# Données : SERIE vals=80,80,60,60,60,40\nA_COMPLETER\n",
    "hints": [
      "Itérer sur la liste triée avec l’indice courant i (1-based pour row_number).",
      "Pour RANK : si val == val_precedente, conserver le même rank que le premier ex-æquo ; sinon rank = i.",
      "Pour DENSE_RANK : n’incrémenter le rang que lorsque la valeur change."
    ],
    "examples": [
      {
        "stdin": "SERIE vals=100,90,90,80,70",
        "expected": "RANK_ROW val=100 row_num=1 rank=1 dense_rank=1\nRANK_ROW val=90 row_num=2 rank=2 dense_rank=2\nRANK_ROW val=90 row_num=3 rank=2 dense_rank=2\nRANK_ROW val=80 row_num=4 rank=4 dense_rank=3\nRANK_ROW val=70 row_num=5 rank=5 dense_rank=4\nSUMMARY total_rows=5 max_rank=5 max_dense_rank=4",
        "note": "Les deux notes à 90 partagent le rang 2. RANK saute à 4, DENSE_RANK continue à 3."
      }
    ],
    "tests": [
      {
        "label": "Toutes les valeurs identiques (ex-æquo parfait)",
        "stdin": "cas:1",
        "expected": "RANK_ROW val=50 row_num=1 rank=1 dense_rank=1\nRANK_ROW val=50 row_num=2 rank=1 dense_rank=1\nRANK_ROW val=50 row_num=3 rank=1 dense_rank=1\nRANK_ROW val=50 row_num=4 rank=1 dense_rank=1\nSUMMARY total_rows=4 max_rank=1 max_dense_rank=1"
      },
      {
        "label": "Toutes les valeurs strictement distinctes",
        "stdin": "cas:2",
        "expected": "RANK_ROW val=30 row_num=1 rank=1 dense_rank=1\nRANK_ROW val=25 row_num=2 rank=2 dense_rank=2\nRANK_ROW val=20 row_num=3 rank=3 dense_rank=3\nRANK_ROW val=15 row_num=4 rank=4 dense_rank=4\nRANK_ROW val=10 row_num=5 rank=5 dense_rank=5\nSUMMARY total_rows=5 max_rank=5 max_dense_rank=5"
      },
      {
        "label": "Multiples groupes d ex-æquo consécutifs",
        "stdin": "cas:3",
        "expected": "RANK_ROW val=80 row_num=1 rank=1 dense_rank=1\nRANK_ROW val=80 row_num=2 rank=1 dense_rank=1\nRANK_ROW val=60 row_num=3 rank=3 dense_rank=2\nRANK_ROW val=60 row_num=4 rank=3 dense_rank=2\nRANK_ROW val=60 row_num=5 rank=3 dense_rank=2\nRANK_ROW val=40 row_num=6 rank=6 dense_rank=3\nSUMMARY total_rows=6 max_rank=6 max_dense_rank=3"
      }
    ],
    "solution": "[Exemple]\nRANK_ROW val=100 row_num=1 rank=1 dense_rank=1\nRANK_ROW val=90 row_num=2 rank=2 dense_rank=2\nRANK_ROW val=90 row_num=3 rank=2 dense_rank=2\nRANK_ROW val=80 row_num=4 rank=4 dense_rank=3\nRANK_ROW val=70 row_num=5 rank=5 dense_rank=4\nSUMMARY total_rows=5 max_rank=5 max_dense_rank=4\n\n[Cas 1 — Toutes les valeurs identiques (ex-æquo parfait)]\nRANK_ROW val=50 row_num=1 rank=1 dense_rank=1\nRANK_ROW val=50 row_num=2 rank=1 dense_rank=1\nRANK_ROW val=50 row_num=3 rank=1 dense_rank=1\nRANK_ROW val=50 row_num=4 rank=1 dense_rank=1\nSUMMARY total_rows=4 max_rank=1 max_dense_rank=1\n\n[Cas 2 — Toutes les valeurs strictement distinctes]\nRANK_ROW val=30 row_num=1 rank=1 dense_rank=1\nRANK_ROW val=25 row_num=2 rank=2 dense_rank=2\nRANK_ROW val=20 row_num=3 rank=3 dense_rank=3\nRANK_ROW val=15 row_num=4 rank=4 dense_rank=4\nRANK_ROW val=10 row_num=5 rank=5 dense_rank=5\nSUMMARY total_rows=5 max_rank=5 max_dense_rank=5\n\n[Cas 3 — Multiples groupes d ex-æquo consécutifs]\nRANK_ROW val=80 row_num=1 rank=1 dense_rank=1\nRANK_ROW val=80 row_num=2 rank=1 dense_rank=1\nRANK_ROW val=60 row_num=3 rank=3 dense_rank=2\nRANK_ROW val=60 row_num=4 rank=3 dense_rank=2\nRANK_ROW val=60 row_num=5 rank=3 dense_rank=2\nRANK_ROW val=40 row_num=6 rank=6 dense_rank=3\nSUMMARY total_rows=6 max_rank=6 max_dense_rank=3"
  },
  {
    "id": "sql3-c4-e2",
    "chapter": 4,
    "title": "Calculateur de moyennes et sommes glissantes avec clause d’encadrement",
    "level": "n2",
    "language": "analyse",
    "goal": "Simuler l’agrégation fenêtrée avec la clause de cadrage ROWS BETWEEN k PRECEDING AND CURRENT ROW.",
    "brief": "Dans la clause `OVER (ORDER BY date ROWS BETWEEN k PRECEDING AND CURRENT ROW)` :\n- Pour chaque ligne courante, la fenêtre d’agrégation englobe au maximum les $k$ lignes précédentes plus la ligne courante (soit jusqu’à $k+1$ éléments).\n- On calcule la somme cumulée de la fenêtre et la moyenne mobile arithmétique associée arrondie à 2 décimales.\n\nEntrée :\n- Une ligne définissant la taille de l’historique : `CONFIG preceding=<K>`\n- Des lignes de données : `ROW id=<step> val=<float_val>`\n\nSortie :\n- Pour chaque ligne : `WINDOW_AGG id=<step> val=<V.2f> sum=<SUM.2f> avg=<AVG.2f> window_size=<COUNT>`\n- En fin de série : `FINAL_METRIC total_rows=<N> last_avg=<LAST_AVG.2f>`",
    "starter": "# Grille d'analyse (sql3-c4-e2) — Calculateur de moyennes et sommes glissantes avec clause d’encadrement\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Fenêtre cumulée depuis le début (preceding infini / très grand)]\n# Données : CONFIG preceding=100\n# Données : ROW id=1 val=5\n# Données : ROW id=2 val=15\n# Données : ROW id=3 val=25\nA_COMPLETER\n\n[Cas 2 — Fenêtre de 1 ligne précédente (preceding=1)]\n# Données : CONFIG preceding=1\n# Données : ROW id=1 val=100\n# Données : ROW id=2 val=200\n# Données : ROW id=3 val=50\nA_COMPLETER\n\n[Cas 3 — Fenêtre stricte preceding=0 (uniquement current row)]\n# Données : CONFIG preceding=0\n# Données : ROW id=1 val=12.5\n# Données : ROW id=2 val=25.0\nA_COMPLETER\n",
    "hints": [
      "Une fonction de fenêtrage (OVER (...)) applique un calcul d’agrégation sur une partition sans regrouper les lignes.",
      "Définissez la fenêtre glissante (ROWS BETWEEN ... PRECEDING AND CURRENT ROW) pour calculer la moyenne mobile."
    ],
    "examples": [
      {
        "stdin": "CONFIG preceding=2\nROW id=1 val=10\nROW id=2 val=20\nROW id=3 val=30\nROW id=4 val=40",
        "expected": "WINDOW_AGG id=1 val=10.00 sum=10.00 avg=10.00 window_size=1\nWINDOW_AGG id=2 val=20.00 sum=30.00 avg=15.00 window_size=2\nWINDOW_AGG id=3 val=30.00 sum=60.00 avg=20.00 window_size=3\nWINDOW_AGG id=4 val=40.00 sum=90.00 avg=30.00 window_size=3\nFINAL_METRIC total_rows=4 last_avg=30.00",
        "note": "Pour l’id=4 avec preceding=2, la fenêtre contient [20, 30, 40] : somme=90, moyenne=30."
      }
    ],
    "tests": [
      {
        "label": "Fenêtre cumulée depuis le début (preceding infini / très grand)",
        "stdin": "cas:1",
        "expected": "WINDOW_AGG id=1 val=5.00 sum=5.00 avg=5.00 window_size=1\nWINDOW_AGG id=2 val=15.00 sum=20.00 avg=10.00 window_size=2\nWINDOW_AGG id=3 val=25.00 sum=45.00 avg=15.00 window_size=3\nFINAL_METRIC total_rows=3 last_avg=15.00"
      },
      {
        "label": "Fenêtre de 1 ligne précédente (preceding=1)",
        "stdin": "cas:2",
        "expected": "WINDOW_AGG id=1 val=100.00 sum=100.00 avg=100.00 window_size=1\nWINDOW_AGG id=2 val=200.00 sum=300.00 avg=150.00 window_size=2\nWINDOW_AGG id=3 val=50.00 sum=250.00 avg=125.00 window_size=2\nFINAL_METRIC total_rows=3 last_avg=125.00"
      },
      {
        "label": "Fenêtre stricte preceding=0 (uniquement current row)",
        "stdin": "cas:3",
        "expected": "WINDOW_AGG id=1 val=12.50 sum=12.50 avg=12.50 window_size=1\nWINDOW_AGG id=2 val=25.00 sum=25.00 avg=25.00 window_size=1\nFINAL_METRIC total_rows=2 last_avg=25.00"
      }
    ],
    "solution": "[Exemple]\nWINDOW_AGG id=1 val=10.00 sum=10.00 avg=10.00 window_size=1\nWINDOW_AGG id=2 val=20.00 sum=30.00 avg=15.00 window_size=2\nWINDOW_AGG id=3 val=30.00 sum=60.00 avg=20.00 window_size=3\nWINDOW_AGG id=4 val=40.00 sum=90.00 avg=30.00 window_size=3\nFINAL_METRIC total_rows=4 last_avg=30.00\n\n[Cas 1 — Fenêtre cumulée depuis le début (preceding infini / très grand)]\nWINDOW_AGG id=1 val=5.00 sum=5.00 avg=5.00 window_size=1\nWINDOW_AGG id=2 val=15.00 sum=20.00 avg=10.00 window_size=2\nWINDOW_AGG id=3 val=25.00 sum=45.00 avg=15.00 window_size=3\nFINAL_METRIC total_rows=3 last_avg=15.00\n\n[Cas 2 — Fenêtre de 1 ligne précédente (preceding=1)]\nWINDOW_AGG id=1 val=100.00 sum=100.00 avg=100.00 window_size=1\nWINDOW_AGG id=2 val=200.00 sum=300.00 avg=150.00 window_size=2\nWINDOW_AGG id=3 val=50.00 sum=250.00 avg=125.00 window_size=2\nFINAL_METRIC total_rows=3 last_avg=125.00\n\n[Cas 3 — Fenêtre stricte preceding=0 (uniquement current row)]\nWINDOW_AGG id=1 val=12.50 sum=12.50 avg=12.50 window_size=1\nWINDOW_AGG id=2 val=25.00 sum=25.00 avg=25.00 window_size=1\nFINAL_METRIC total_rows=2 last_avg=25.00"
  },
  {
    "id": "sql3-c4-e3",
    "chapter": 4,
    "title": "Moteur de résolution de hiérarchie arborescente par CTE récursive",
    "level": "n3",
    "language": "analyse",
    "goal": "Calculer la profondeur, le chemin absolu et le nombre total de subordonnés dans une structure hiérarchique via une CTE récursive simulée.",
    "brief": "Dans SQL standard, la syntaxe `WITH RECURSIVE` permet de parcourir des graphes et arbres hiérarchiques (ex: organigramme d’entreprise, nomenclature de pièces BOM) :\n- Nœud racine (Ancre récursive) : employé dont `manager_id=0` (niveau 1, chemin `/<nom>`).\n- Membre récursif : chaque subordonné direct d’un employé résolu hérite d’un `level = level_manager + 1` et d’un `path = path_manager / <nom>`.\n- Le moteur calcule également pour chaque nœud le nombre total de subordonnés (descendants directs et indirects).\n\nEntrée :\n`EMP id=<int> name=<nom> manager=<int>` (manager=0 pour le sommet de l’arbre)\n\nSortie :\n- Liste des employés triés par niveau puis par identifiant :\n  `HIERARCHY id=<id> name=<name> level=<L> path=<PATH> subordinates=<COUNT>`\n- Bilan de l’arbre : `TREE_REPORT max_depth=<D> total_nodes=<N>`",
    "starter": "# Grille d'analyse (sql3-c4-e3) — Moteur de résolution de hiérarchie arborescente par CTE récursive\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Organigramme avec plusieurs branches parallèles sous la racine]\n# Données : EMP id=1 name=CEO manager=0\n# Données : EMP id=2 name=VP_Sales manager=1\n# Données : EMP id=3 name=VP_Tech manager=1\n# Données : EMP id=4 name=Dev1 manager=3\n# Données : EMP id=5 name=Dev2 manager=3\nA_COMPLETER\n\n[Cas 2 — Nœud unique racine sans subordonné]\n# Données : EMP id=1 name=SoloConsultant manager=0\nA_COMPLETER\n\n[Cas 3 — Arbre de pièces industrielles (BOM)]\n# Données : EMP id=10 name=Voiture manager=0\n# Données : EMP id=20 name=Moteur manager=10\n# Données : EMP id=30 name=Piston manager=20\n# Données : EMP id=40 name=Chassis manager=10\nA_COMPLETER\n",
    "hints": [
      "Construire un dictionnaire des employés et un graphe direct manager -> [enfants].",
      "Identifier la racine (manager=0) pour initialiser la récursion (BFS ou DFS).",
      "Pour le compte des subordonnés, une fonction récursive d’exploration du sous-arbre permet de sommer tous les descendants."
    ],
    "examples": [
      {
        "stdin": "EMP id=1 name=CEO manager=0\nEMP id=2 name=CTO manager=1\nEMP id=3 name=DevLead manager=2\nEMP id=4 name=Dev1 manager=3",
        "expected": "HIERARCHY id=1 name=CEO level=1 path=/CEO subordinates=3\nHIERARCHY id=2 name=CTO level=2 path=/CEO/CTO subordinates=2\nHIERARCHY id=3 name=DevLead level=3 path=/CEO/CTO/DevLead subordinates=1\nHIERARCHY id=4 name=Dev1 level=4 path=/CEO/CTO/DevLead/Dev1 subordinates=0\nTREE_REPORT max_depth=4 total_nodes=4",
        "note": "Arbre à 4 niveaux : le CEO a 3 subordonnés au total."
      }
    ],
    "tests": [
      {
        "label": "Organigramme avec plusieurs branches parallèles sous la racine",
        "stdin": "cas:1",
        "expected": "HIERARCHY id=1 name=CEO level=1 path=/CEO subordinates=4\nHIERARCHY id=2 name=VP_Sales level=2 path=/CEO/VP_Sales subordinates=0\nHIERARCHY id=3 name=VP_Tech level=2 path=/CEO/VP_Tech subordinates=2\nHIERARCHY id=4 name=Dev1 level=3 path=/CEO/VP_Tech/Dev1 subordinates=0\nHIERARCHY id=5 name=Dev2 level=3 path=/CEO/VP_Tech/Dev2 subordinates=0\nTREE_REPORT max_depth=3 total_nodes=5"
      },
      {
        "label": "Nœud unique racine sans subordonné",
        "stdin": "cas:2",
        "expected": "HIERARCHY id=1 name=SoloConsultant level=1 path=/SoloConsultant subordinates=0\nTREE_REPORT max_depth=1 total_nodes=1"
      },
      {
        "label": "Arbre de pièces industrielles (BOM)",
        "stdin": "cas:3",
        "expected": "HIERARCHY id=10 name=Voiture level=1 path=/Voiture subordinates=3\nHIERARCHY id=20 name=Moteur level=2 path=/Voiture/Moteur subordinates=1\nHIERARCHY id=40 name=Chassis level=2 path=/Voiture/Chassis subordinates=0\nHIERARCHY id=30 name=Piston level=3 path=/Voiture/Moteur/Piston subordinates=0\nTREE_REPORT max_depth=3 total_nodes=4"
      }
    ],
    "solution": "[Exemple]\nHIERARCHY id=1 name=CEO level=1 path=/CEO subordinates=3\nHIERARCHY id=2 name=CTO level=2 path=/CEO/CTO subordinates=2\nHIERARCHY id=3 name=DevLead level=3 path=/CEO/CTO/DevLead subordinates=1\nHIERARCHY id=4 name=Dev1 level=4 path=/CEO/CTO/DevLead/Dev1 subordinates=0\nTREE_REPORT max_depth=4 total_nodes=4\n\n[Cas 1 — Organigramme avec plusieurs branches parallèles sous la racine]\nHIERARCHY id=1 name=CEO level=1 path=/CEO subordinates=4\nHIERARCHY id=2 name=VP_Sales level=2 path=/CEO/VP_Sales subordinates=0\nHIERARCHY id=3 name=VP_Tech level=2 path=/CEO/VP_Tech subordinates=2\nHIERARCHY id=4 name=Dev1 level=3 path=/CEO/VP_Tech/Dev1 subordinates=0\nHIERARCHY id=5 name=Dev2 level=3 path=/CEO/VP_Tech/Dev2 subordinates=0\nTREE_REPORT max_depth=3 total_nodes=5\n\n[Cas 2 — Nœud unique racine sans subordonné]\nHIERARCHY id=1 name=SoloConsultant level=1 path=/SoloConsultant subordinates=0\nTREE_REPORT max_depth=1 total_nodes=1\n\n[Cas 3 — Arbre de pièces industrielles (BOM)]\nHIERARCHY id=10 name=Voiture level=1 path=/Voiture subordinates=3\nHIERARCHY id=20 name=Moteur level=2 path=/Voiture/Moteur subordinates=1\nHIERARCHY id=40 name=Chassis level=2 path=/Voiture/Chassis subordinates=0\nHIERARCHY id=30 name=Piston level=3 path=/Voiture/Moteur/Piston subordinates=0\nTREE_REPORT max_depth=3 total_nodes=4"
  },
  {
    "id": "sql3-c5-e1",
    "chapter": 5,
    "title": "Simulateur de déclencheur d’audit d’historisation (Audit Trail Trigger)",
    "level": "n1",
    "language": "analyse",
    "goal": "Simuler le comportement d’un trigger AFTER INSERT/UPDATE/DELETE alimentant une table de journalisation d’audit.",
    "brief": "Dans les systèmes financiers et médicaux, les réglementations (RGPD, PCI-DSS, HDS) imposent une traçabilité immuable de chaque modification.\nUn déclencheur d’audit compare les variables d’état `OLD` et `NEW` :\n- Pour `INSERT` : enregistre `diff=INSERTED`.\n- Pour `DELETE` : enregistre `diff=DELETED`.\n- Pour `UPDATE` : compare les champs clés pour lister précisément les valeurs modifiées sous la forme `champ:old_val->new_val`.\n\nEntrée :\n`OP action=<INSERT|UPDATE|DELETE> table=<name> id=<row_id> user=<username> [old=<k:v,k:v>] [new=<k:v,k:v>]`\n\nSortie :\n- Pour chaque opération :\n  `AUDIT_ENTRY action=<ACT> table=<TBL> row_id=<ID> diff=<DIFF> user=<USR>`\n- Bilan : `AUDIT_SUMMARY total_events=<N> inserts=<N> updates=<N> deletes=<N>`",
    "starter": "# Grille d'analyse (sql3-c5-e1) — Simulateur de déclencheur d’audit d’historisation (Audit Trail Trigger)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Mise à jour de multiples champs simultanément]\n# Données : OP action=UPDATE table=produits id=42 user=gest_stock old=nom:Velo,prix:200,stock:10 new=nom:Velo,prix:250,stock:8\nA_COMPLETER\n\n[Cas 2 — Série de plusieurs insertions successives]\n# Données : OP action=INSERT table=logs id=1 user=cron new=lvl:info\n# Données : OP action=INSERT table=logs id=2 user=cron new=lvl:warn\nA_COMPLETER\n\n[Cas 3 — Mise à jour sans changement réel (valeurs identiques)]\n# Données : OP action=UPDATE table=clients id=100 user=app old=statut:actif new=statut:actif\nA_COMPLETER\n",
    "hints": [
      "Parser les champs old et new en dictionnaires pour l’action UPDATE.",
      "Identifier les clés pour lesquelles old[k] != new[k] et formater champ:old->new.",
      "Comptabiliser le nombre d’événements de chaque type."
    ],
    "examples": [
      {
        "stdin": "OP action=INSERT table=users id=10 user=admin new=email:a@b.com,role:user\nOP action=UPDATE table=users id=10 user=sec_admin old=email:a@b.com,role:user new=email:a@b.com,role:admin\nOP action=DELETE table=users id=10 user=admin old=email:a@b.com,role:admin",
        "expected": "AUDIT_ENTRY action=INSERT table=users row_id=10 diff=INSERTED user=admin\nAUDIT_ENTRY action=UPDATE table=users row_id=10 diff=role:user->admin user=sec_admin\nAUDIT_ENTRY action=DELETE table=users row_id=10 diff=DELETED user=admin\nAUDIT_SUMMARY total_events=3 inserts=1 updates=1 deletes=1",
        "note": "Le trigger trace la création, le changement de rôle et la suppression."
      }
    ],
    "tests": [
      {
        "label": "Mise à jour de multiples champs simultanément",
        "stdin": "cas:1",
        "expected": "AUDIT_ENTRY action=UPDATE table=produits row_id=42 diff=prix:200->250,stock:10->8 user=gest_stock\nAUDIT_SUMMARY total_events=1 inserts=0 updates=1 deletes=0"
      },
      {
        "label": "Série de plusieurs insertions successives",
        "stdin": "cas:2",
        "expected": "AUDIT_ENTRY action=INSERT table=logs row_id=1 diff=INSERTED user=cron\nAUDIT_ENTRY action=INSERT table=logs row_id=2 diff=INSERTED user=cron\nAUDIT_SUMMARY total_events=2 inserts=2 updates=0 deletes=0"
      },
      {
        "label": "Mise à jour sans changement réel (valeurs identiques)",
        "stdin": "cas:3",
        "expected": "AUDIT_ENTRY action=UPDATE table=clients row_id=100 diff=NO_CHANGE user=app\nAUDIT_SUMMARY total_events=1 inserts=0 updates=1 deletes=0"
      }
    ],
    "solution": "[Exemple]\nAUDIT_ENTRY action=INSERT table=users row_id=10 diff=INSERTED user=admin\nAUDIT_ENTRY action=UPDATE table=users row_id=10 diff=role:user->admin user=sec_admin\nAUDIT_ENTRY action=DELETE table=users row_id=10 diff=DELETED user=admin\nAUDIT_SUMMARY total_events=3 inserts=1 updates=1 deletes=1\n\n[Cas 1 — Mise à jour de multiples champs simultanément]\nAUDIT_ENTRY action=UPDATE table=produits row_id=42 diff=prix:200->250,stock:10->8 user=gest_stock\nAUDIT_SUMMARY total_events=1 inserts=0 updates=1 deletes=0\n\n[Cas 2 — Série de plusieurs insertions successives]\nAUDIT_ENTRY action=INSERT table=logs row_id=1 diff=INSERTED user=cron\nAUDIT_ENTRY action=INSERT table=logs row_id=2 diff=INSERTED user=cron\nAUDIT_SUMMARY total_events=2 inserts=2 updates=0 deletes=0\n\n[Cas 3 — Mise à jour sans changement réel (valeurs identiques)]\nAUDIT_ENTRY action=UPDATE table=clients row_id=100 diff=NO_CHANGE user=app\nAUDIT_SUMMARY total_events=1 inserts=0 updates=1 deletes=0"
  },
  {
    "id": "sql3-c5-e2",
    "chapter": 5,
    "title": "Moteur d’évaluation de politiques de sécurité au niveau ligne (Row-Level Security RLS)",
    "level": "n2",
    "language": "analyse",
    "goal": "Simuler le filtrage transparent des lignes en fonction du tenant et du rôle utilisateur via PostgreSQL Row-Level Security (RLS).",
    "brief": "Dans une architecture SaaS multi-locataire (multi-tenant) mutualisée, la sécurité au niveau des lignes (RLS) garantit qu’une session ne peut jamais lire ni modifier les données d’une autre organisation :\n- Chaque session déclare son identité : `SESSION tenant=<tenant_id> role=<admin|member>`.\n- Des documents sont enregistrés : `DOC id=<id> tenant=<tenant_id> title=<title>`.\n- Une politique RLS applique les règles suivantes lors d’une action (`SELECT`, `UPDATE`, `DELETE`) :\n  1. Si `doc.tenant == session.tenant` : l’accès est `ALLOWED`.\n  2. Si `doc.tenant != session.tenant` : l’accès est `DENIED` pour violation de frontière inter-tenant (isolation étanche).\n  3. Pour `DELETE` : nécessite en plus le rôle `admin` dans le tenant ; si le rôle est `member`, l’accès est `DENIED_INSUFFICIENT_ROLE`.\n\nEntrée :\n- `SESSION tenant=<T> role=<R>`\n- `DOC id=<id> tenant=<T> title=<title>`\n- `ACCESS action=<SELECT|UPDATE|DELETE> doc_id=<id>`\n\nSortie :\n- Pour chaque tentative : `RLS_CHECK action=<ACT> doc_id=<ID> status=<ALLOWED|DENIED> reason=<REASON>`\n- Bilan : `RLS_REPORT total_checks=<N> allowed=<N> denied=<N>`",
    "starter": "# Grille d'analyse (sql3-c5-e2) — Moteur d’évaluation de politiques de sécurité au niveau ligne (Row-Level Security RLS)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Administrateur de tenant effectuant une suppression légitime]\n# Données : SESSION tenant=corp_X role=admin\n# Données : DOC id=10 tenant=corp_X title=Rapport\n# Données : ACCESS action=DELETE doc_id=10\nA_COMPLETER\n\n[Cas 2 — Accès à un document inexistant]\n# Données : SESSION tenant=org_A role=member\n# Données : ACCESS action=SELECT doc_id=999\nA_COMPLETER\n\n[Cas 3 — Mises à jour autorisées et bloquées]\n# Données : SESSION tenant=alpha role=member\n# Données : DOC id=101 tenant=alpha title=Contrat\n# Données : DOC id=102 tenant=beta title=Contrat\n# Données : ACCESS action=UPDATE doc_id=101\n# Données : ACCESS action=UPDATE doc_id=102\nA_COMPLETER\n",
    "hints": [
      "Stocker les documents dans un dictionnaire documents[doc_id] = {tenant, title}.",
      "Comparer doc[tenant] avec session_tenant pour valider l’isolation multi-tenant.",
      "Vérifier le rôle pour les opérations destructrices comme DELETE."
    ],
    "examples": [
      {
        "stdin": "SESSION tenant=org_A role=member\nDOC id=1 tenant=org_A title=Bilan_A\nDOC id=2 tenant=org_B title=Bilan_B\nACCESS action=SELECT doc_id=1\nACCESS action=SELECT doc_id=2\nACCESS action=DELETE doc_id=1",
        "expected": "RLS_CHECK action=SELECT doc_id=1 status=ALLOWED reason=TENANT_MATCH\nRLS_CHECK action=SELECT doc_id=2 status=DENIED reason=CROSS_TENANT_VIOLATION\nRLS_CHECK action=DELETE doc_id=1 status=DENIED reason=INSUFFICIENT_ROLE\nRLS_REPORT total_checks=3 allowed=1 denied=2",
        "note": "Accès autorisé sur doc 1 pour SELECT, refusé sur doc 2 (cross-tenant), et refusé pour DELETE sans rôle admin."
      }
    ],
    "tests": [
      {
        "label": "Administrateur de tenant effectuant une suppression légitime",
        "stdin": "cas:1",
        "expected": "RLS_CHECK action=DELETE doc_id=10 status=ALLOWED reason=TENANT_MATCH_AND_ADMIN\nRLS_REPORT total_checks=1 allowed=1 denied=0"
      },
      {
        "label": "Accès à un document inexistant",
        "stdin": "cas:2",
        "expected": "RLS_CHECK action=SELECT doc_id=999 status=DENIED reason=DOCUMENT_NOT_FOUND\nRLS_REPORT total_checks=1 allowed=0 denied=1"
      },
      {
        "label": "Mises à jour autorisées et bloquées",
        "stdin": "cas:3",
        "expected": "RLS_CHECK action=UPDATE doc_id=101 status=ALLOWED reason=TENANT_MATCH\nRLS_CHECK action=UPDATE doc_id=102 status=DENIED reason=CROSS_TENANT_VIOLATION\nRLS_REPORT total_checks=2 allowed=1 denied=1"
      }
    ],
    "solution": "[Exemple]\nRLS_CHECK action=SELECT doc_id=1 status=ALLOWED reason=TENANT_MATCH\nRLS_CHECK action=SELECT doc_id=2 status=DENIED reason=CROSS_TENANT_VIOLATION\nRLS_CHECK action=DELETE doc_id=1 status=DENIED reason=INSUFFICIENT_ROLE\nRLS_REPORT total_checks=3 allowed=1 denied=2\n\n[Cas 1 — Administrateur de tenant effectuant une suppression légitime]\nRLS_CHECK action=DELETE doc_id=10 status=ALLOWED reason=TENANT_MATCH_AND_ADMIN\nRLS_REPORT total_checks=1 allowed=1 denied=0\n\n[Cas 2 — Accès à un document inexistant]\nRLS_CHECK action=SELECT doc_id=999 status=DENIED reason=DOCUMENT_NOT_FOUND\nRLS_REPORT total_checks=1 allowed=0 denied=1\n\n[Cas 3 — Mises à jour autorisées et bloquées]\nRLS_CHECK action=UPDATE doc_id=101 status=ALLOWED reason=TENANT_MATCH\nRLS_CHECK action=UPDATE doc_id=102 status=DENIED reason=CROSS_TENANT_VIOLATION\nRLS_REPORT total_checks=2 allowed=1 denied=1"
  },
  {
    "id": "sql3-c5-e3",
    "chapter": 5,
    "title": "Validateur de requêtes dynamiques et détecteur d’injections SQL (SQLi Sanitizer)",
    "level": "n3",
    "language": "analyse",
    "goal": "Analyser des paramètres de requêtes SQL dynamiques et neutraliser les vecteurs d’injection SQL classiques.",
    "brief": "Dans le code procédural PL/pgSQL, la concaténation directe de variables utilisateur dans des instructions `EXECUTE` engendre des failles critiques d’injection SQL (SQLi).\nLes signatures d’attaque typiques incluent :\n- Tautologies logiques contournant les filtres : `OR 1=1`, `OR '1'='1'`, `OR true`.\n- Concaténations de requêtes multiples (Piggybacked queries) : `; DROP TABLE`, `; TRUNCATE`, `; DELETE`.\n- Injections par union : `UNION SELECT`, `UNION ALL SELECT`.\n- Troncature de commentaires : `--`, `/*`.\n\nEntrée :\n`CHECK_SQL id=<num> input=\"<chaine_brute>\"`\n\nSortie :\n- Si une signature est détectée : `SQLI_ALERT id=<id> status=VULNERABLE threat=<TAUTOLOGY|PIGGYBACKED_DROP|UNION_INJECTION|COMMENT_BYPASS> action=BLOCK`\n- Si la chaîne est saine : `SQLI_ALERT id=<id> status=SECURE safe_value=<quote_literal_value> action=ALLOW`\n- Bilan : `SECURITY_AUDIT checked=<N> blocked=<N> allowed=<N>`",
    "starter": "# Grille d'analyse (sql3-c5-e3) — Validateur de requêtes dynamiques et détecteur d’injections SQL (SQLi Sanitizer)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Attaque par union pour extraction de schéma]\n# Données : CHECK_SQL id=10 input=\"1 UNION SELECT username, password FROM users\"\nA_COMPLETER\n\n[Cas 2 — Troncature par commentaire SQL double tiret]\n# Données : CHECK_SQL id=20 input=\"admin' -- bypass password check\"\nA_COMPLETER\n\n[Cas 3 — Entrée saine avec espaces et chiffres]\n# Données : CHECK_SQL id=30 input=\"Jean-Luc Dupont 2025\"\nA_COMPLETER\n",
    "hints": [
      "Rechercher les mots-clés dangereux en ignorant la casse (upper/lower).",
      "Identifier \"or 1=1\" ou \"or '1'='1'\" comme TAUTOLOGY.",
      "Identifier \"; drop\" ou \"; truncate\" comme PIGGYBACKED_DROP.",
      "Identifier \"union select\" comme UNION_INJECTION.",
      "Identifier \"--\" ou \"/*\" comme COMMENT_BYPASS."
    ],
    "examples": [
      {
        "stdin": "CHECK_SQL id=1 input=\"alice\"\nCHECK_SQL id=2 input=\"admin' OR '1'='1\"\nCHECK_SQL id=3 input=\"test'; DROP TABLE clients; --\"",
        "expected": "SQLI_ALERT id=1 status=SECURE safe_value='alice' action=ALLOW\nSQLI_ALERT id=2 status=VULNERABLE threat=TAUTOLOGY action=BLOCK\nSQLI_ALERT id=3 status=VULNERABLE threat=PIGGYBACKED_DROP action=BLOCK\nSECURITY_AUDIT checked=3 blocked=2 allowed=1",
        "note": "La saisie légitime est autorisée après échappement ; les deux attaques sont bloquées."
      }
    ],
    "tests": [
      {
        "label": "Attaque par union pour extraction de schéma",
        "stdin": "cas:1",
        "expected": "SQLI_ALERT id=10 status=VULNERABLE threat=UNION_INJECTION action=BLOCK\nSECURITY_AUDIT checked=1 blocked=1 allowed=0"
      },
      {
        "label": "Troncature par commentaire SQL double tiret",
        "stdin": "cas:2",
        "expected": "SQLI_ALERT id=20 status=VULNERABLE threat=COMMENT_BYPASS action=BLOCK\nSECURITY_AUDIT checked=1 blocked=1 allowed=0"
      },
      {
        "label": "Entrée saine avec espaces et chiffres",
        "stdin": "cas:3",
        "expected": "SQLI_ALERT id=30 status=SECURE safe_value='Jean-Luc Dupont 2025' action=ALLOW\nSECURITY_AUDIT checked=1 blocked=0 allowed=1"
      }
    ],
    "solution": "[Exemple]\nSQLI_ALERT id=1 status=SECURE safe_value='alice' action=ALLOW\nSQLI_ALERT id=2 status=VULNERABLE threat=TAUTOLOGY action=BLOCK\nSQLI_ALERT id=3 status=VULNERABLE threat=PIGGYBACKED_DROP action=BLOCK\nSECURITY_AUDIT checked=3 blocked=2 allowed=1\n\n[Cas 1 — Attaque par union pour extraction de schéma]\nSQLI_ALERT id=10 status=VULNERABLE threat=UNION_INJECTION action=BLOCK\nSECURITY_AUDIT checked=1 blocked=1 allowed=0\n\n[Cas 2 — Troncature par commentaire SQL double tiret]\nSQLI_ALERT id=20 status=VULNERABLE threat=COMMENT_BYPASS action=BLOCK\nSECURITY_AUDIT checked=1 blocked=1 allowed=0\n\n[Cas 3 — Entrée saine avec espaces et chiffres]\nSQLI_ALERT id=30 status=SECURE safe_value='Jean-Luc Dupont 2025' action=ALLOW\nSECURITY_AUDIT checked=1 blocked=0 allowed=1"
  },
  {
    "id": "sql3-c6-e1",
    "chapter": 6,
    "title": "Routeur de partitionnement déclaratif de table (Range & List)",
    "level": "n1",
    "language": "analyse",
    "goal": "Acheminer les insertions de données vers la partition physique appropriée selon la stratégie de partitionnement déclarative.",
    "brief": "Dans PostgreSQL (à partir de la version 10), le partitionnement déclaratif horizontal divise une grande table logique en sous-tables physiques indépendantes :\n- `RANGE` : la partition héberge un intervalle semi-ouvert $[\\text{from}, \\text{to}[$ (valeur $\\ge \\text{from}$ et $< \\text{to}$).\n- `LIST` : la partition accepte un ensemble fini de valeurs littérales (ex: codes régions ou statuts).\n- Si aucune partition ne correspond et qu’aucune partition par défaut n’existe : l’insertion échoue avec `NO_PARTITION_FOUND`.\n\nEntrée :\n- Définition de la stratégie : `STRATEGY type=<RANGE|LIST> col=<col_name>`\n- Déclaration des partitions :\n  Pour RANGE : `PARTITION name=<p_name> from=<val> to=<val>`\n  Pour LIST : `PARTITION name=<p_name> values=<v1,v2,...>`\n- Insertions : `INSERT id=<row_id> <col_name>=<val>`\n\nSortie :\n- Pour chaque insertion : `ROUTED row_id=<ID> val=<V> partition=<PART_NAME|NONE> status=<SUCCESS|ERROR_NO_PARTITION>`\n- Bilan : `ROUTER_SUMMARY total=<N> routed=<N> unrouted=<N>`",
    "starter": "# Grille d'analyse (sql3-c6-e1) — Routeur de partitionnement déclaratif de table (Range & List)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Partitionnement par liste (LIST) géographique]\n# Données : STRATEGY type=LIST col=pays\n# Données : PARTITION name=p_europe values=FR,BE,DE,IT\n# Données : PARTITION name=p_amerique values=US,CA,MX\n# Données : INSERT id=10 pays=FR\n# Données : INSERT id=11 pays=JP\nA_COMPLETER\n\n[Cas 2 — Toutes les lignes routées avec succès dans un partitionnement par plage]\n# Données : STRATEGY type=RANGE col=mois\n# Données : PARTITION name=t1 from=1 to=4\n# Données : PARTITION name=t2 from=4 to=7\n# Données : INSERT id=101 mois=2\n# Données : INSERT id=102 mois=4\n# Données : INSERT id=103 mois=6\nA_COMPLETER\n\n[Cas 3 — Test de borne supérieure exclusive (valeur égale à to)]\n# Données : STRATEGY type=RANGE col=valeur\n# Données : PARTITION name=p_basse from=0 to=100\n# Données : INSERT id=1 valeur=100\nA_COMPLETER\n",
    "hints": [
      "Pour RANGE : convertir les bornes et valeurs en entiers pour la comparaison from <= val < to.",
      "Pour LIST : vérifier si str(val) est dans la liste values.",
      "Afficher ERROR_NO_PARTITION si aucun match n’est trouvé."
    ],
    "examples": [
      {
        "stdin": "STRATEGY type=RANGE col=annee\nPARTITION name=p_2023 from=2023 to=2024\nPARTITION name=p_2024 from=2024 to=2025\nPARTITION name=p_2025 from=2025 to=2026\nINSERT id=1 annee=2024\nINSERT id=2 annee=2025\nINSERT id=3 annee=2020",
        "expected": "ROUTED row_id=1 val=2024 partition=p_2024 status=SUCCESS\nROUTED row_id=2 val=2025 partition=p_2025 status=SUCCESS\nROUTED row_id=3 val=2020 partition=NONE status=ERROR_NO_PARTITION\nROUTER_SUMMARY total=3 routed=2 unrouted=1",
        "note": "2024 va dans p_2024 ; 2020 ne correspond à aucune partition déclarée."
      }
    ],
    "tests": [
      {
        "label": "Partitionnement par liste (LIST) géographique",
        "stdin": "cas:1",
        "expected": "ROUTED row_id=10 val=FR partition=p_europe status=SUCCESS\nROUTED row_id=11 val=JP partition=NONE status=ERROR_NO_PARTITION\nROUTER_SUMMARY total=2 routed=1 unrouted=1"
      },
      {
        "label": "Toutes les lignes routées avec succès dans un partitionnement par plage",
        "stdin": "cas:2",
        "expected": "ROUTED row_id=101 val=2 partition=t1 status=SUCCESS\nROUTED row_id=102 val=4 partition=t2 status=SUCCESS\nROUTED row_id=103 val=6 partition=t2 status=SUCCESS\nROUTER_SUMMARY total=3 routed=3 unrouted=0"
      },
      {
        "label": "Test de borne supérieure exclusive (valeur égale à to)",
        "stdin": "cas:3",
        "expected": "ROUTED row_id=1 val=100 partition=NONE status=ERROR_NO_PARTITION\nROUTER_SUMMARY total=1 routed=0 unrouted=1"
      }
    ],
    "solution": "[Exemple]\nROUTED row_id=1 val=2024 partition=p_2024 status=SUCCESS\nROUTED row_id=2 val=2025 partition=p_2025 status=SUCCESS\nROUTED row_id=3 val=2020 partition=NONE status=ERROR_NO_PARTITION\nROUTER_SUMMARY total=3 routed=2 unrouted=1\n\n[Cas 1 — Partitionnement par liste (LIST) géographique]\nROUTED row_id=10 val=FR partition=p_europe status=SUCCESS\nROUTED row_id=11 val=JP partition=NONE status=ERROR_NO_PARTITION\nROUTER_SUMMARY total=2 routed=1 unrouted=1\n\n[Cas 2 — Toutes les lignes routées avec succès dans un partitionnement par plage]\nROUTED row_id=101 val=2 partition=t1 status=SUCCESS\nROUTED row_id=102 val=4 partition=t2 status=SUCCESS\nROUTED row_id=103 val=6 partition=t2 status=SUCCESS\nROUTER_SUMMARY total=3 routed=3 unrouted=0\n\n[Cas 3 — Test de borne supérieure exclusive (valeur égale à to)]\nROUTED row_id=1 val=100 partition=NONE status=ERROR_NO_PARTITION\nROUTER_SUMMARY total=1 routed=0 unrouted=1"
  },
  {
    "id": "sql3-c6-e2",
    "chapter": 6,
    "title": "Simulateur d’élagage de partitions (Partition Pruning Optimizer)",
    "level": "n2",
    "language": "analyse",
    "goal": "Calculer les partitions éliminées (pruned) et le gain d’I/O lors de l’exécution d’une requête filtrée.",
    "brief": "L’élagage de partitions (Partition Pruning) permet à l’optimiseur de ne scanner que les partitions physiques dont les bornes chevauchent le filtre WHERE, éliminant totalement les autres tables du plan d’exécution.\nL’efficacité de l’élagage est mesurée par :\n$$\\text{Efficacité} = \\frac{\\text{Partitions Élaguées}}{\\text{Total des Partitions}} \\times 100$$\n\nEntrée :\n- `PARTITIONS list=<p1:from-to,p2:from-to,...>`\n- `QUERY id=<num> op=<eq|gte|lte|between> val1=<int> [val2=<int>]`\n\nSortie :\n- Pour chaque requête :\n  `PRUNING_EVAL query_id=<id> scanned=<p_list> pruned=<p_list> efficiency=<PCT.1f>%`\n- Bilan : `PRUNING_REPORT queries=<N> avg_efficiency=<AVG_PCT.1f>%`",
    "starter": "# Grille d'analyse (sql3-c6-e2) — Simulateur d’élagage de partitions (Partition Pruning Optimizer)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Filtre BETWEEN couvrant deux partitions consécutives]\n# Données : PARTITIONS list=p_q1:1-4,p_q2:4-7,p_q3:7-10,p_q4:10-13\n# Données : QUERY id=10 op=between val1=3 val2=5\nA_COMPLETER\n\n[Cas 2 — Filtre inférieur ou égal (lte) élaguant les partitions futures]\n# Données : PARTITIONS list=p1:0-10,p2:10-20,p3:20-30\n# Données : QUERY id=20 op=lte val1=9\nA_COMPLETER\n\n[Cas 3 — Requête ne pouvant élaguer aucune partition (scan complet)]\n# Données : PARTITIONS list=p1:1-5,p2:5-10\n# Données : QUERY id=30 op=between val1=1 val2=10\nA_COMPLETER\n",
    "hints": [
      "Pour chaque partition [pfrom, pto[, tester l’intersection avec l’intervalle défini par le filtre.",
      "Pour eq val1 : tester pfrom <= val1 < pto.",
      "Pour gte val1 : tester pto > val1.",
      "Pour lte val1 : tester pfrom <= val1.",
      "Pour between val1 et val2 : tester (pfrom <= val2 et pto > val1)."
    ],
    "examples": [
      {
        "stdin": "PARTITIONS list=p_2023:2023-2024,p_2024:2024-2025,p_2025:2025-2026\nQUERY id=1 op=eq val1=2024\nQUERY id=2 op=gte val1=2024",
        "expected": "PRUNING_EVAL query_id=1 scanned=p_2024 pruned=p_2023,p_2025 efficiency=66.7%\nPRUNING_EVAL query_id=2 scanned=p_2024,p_2025 pruned=p_2023 efficiency=33.3%\nPRUNING_REPORT queries=2 avg_efficiency=50.0%",
        "note": "La requête 1 élimine 2 partitions sur 3 (66.7% d’efficacité)."
      }
    ],
    "tests": [
      {
        "label": "Filtre BETWEEN couvrant deux partitions consécutives",
        "stdin": "cas:1",
        "expected": "PRUNING_EVAL query_id=10 scanned=p_q1,p_q2 pruned=p_q3,p_q4 efficiency=50.0%\nPRUNING_REPORT queries=1 avg_efficiency=50.0%"
      },
      {
        "label": "Filtre inférieur ou égal (lte) élaguant les partitions futures",
        "stdin": "cas:2",
        "expected": "PRUNING_EVAL query_id=20 scanned=p1 pruned=p2,p3 efficiency=66.7%\nPRUNING_REPORT queries=1 avg_efficiency=66.7%"
      },
      {
        "label": "Requête ne pouvant élaguer aucune partition (scan complet)",
        "stdin": "cas:3",
        "expected": "PRUNING_EVAL query_id=30 scanned=p1,p2 pruned=none efficiency=0.0%\nPRUNING_REPORT queries=1 avg_efficiency=0.0%"
      }
    ],
    "solution": "[Exemple]\nPRUNING_EVAL query_id=1 scanned=p_2024 pruned=p_2023,p_2025 efficiency=66.7%\nPRUNING_EVAL query_id=2 scanned=p_2024,p_2025 pruned=p_2023 efficiency=33.3%\nPRUNING_REPORT queries=2 avg_efficiency=50.0%\n\n[Cas 1 — Filtre BETWEEN couvrant deux partitions consécutives]\nPRUNING_EVAL query_id=10 scanned=p_q1,p_q2 pruned=p_q3,p_q4 efficiency=50.0%\nPRUNING_REPORT queries=1 avg_efficiency=50.0%\n\n[Cas 2 — Filtre inférieur ou égal (lte) élaguant les partitions futures]\nPRUNING_EVAL query_id=20 scanned=p1 pruned=p2,p3 efficiency=66.7%\nPRUNING_REPORT queries=1 avg_efficiency=66.7%\n\n[Cas 3 — Requête ne pouvant élaguer aucune partition (scan complet)]\nPRUNING_EVAL query_id=30 scanned=p1,p2 pruned=none efficiency=0.0%\nPRUNING_REPORT queries=1 avg_efficiency=0.0%"
  },
  {
    "id": "sql3-c6-e3",
    "chapter": 6,
    "title": "Calculateur de lag de réplication WAL (Streaming Replication Lag)",
    "level": "n3",
    "language": "analyse",
    "goal": "Calculer le décalage de réplication en octets et en Ko entre le primaire et ses nœuds secondaires à partir de nombres LSN (Log Sequence Number).",
    "brief": "Dans la réplication physique PostgreSQL (Streaming Replication), l’avancement des écritures dans le journal WAL est repéré par un `LSN` (Log Sequence Number) hexadécimal à deux composantes (ex: `16/B3C840`).\nConversion d’un LSN en entier 64 bits d’octets :\n$$\\text{LSN\\_Bytes} = \\text{int}(X, 16) \\times 2^{32} + \\text{int}(Y, 16)$$\nLe retard de réplication (Lag) est calculé par :\n$$\\text{Lag\\_Bytes} = \\text{Primary\\_LSN} - \\text{Replica\\_LSN}$$\n$$\\text{Lag\\_Ko} = \\frac{\\text{Lag\\_Bytes}}{1024.0}$$\nÉvaluation de la santé :\n- Si `Lag_Bytes == 0` : `SYNCED` (parfaite synchronisation).\n- Si `0 < Lag_Ko <= 64` : `HEALTHY_LAG` (retard opérationnel normal en réplication asynchrone).\n- Si `Lag_Ko > 64` : `CRITICAL_LAG` (danger de perte de données en cas de failover, violation de RPO).\n\nEntrée :\n`REPLICA node=<name> mode=<sync|async> primary_lsn=<HEX/HEX> replay_lsn=<HEX/HEX>`\n\nSortie :\n`LAG_STATUS node=<name> mode=<mode> lag_bytes=<BYTES> lag_kb=<KB.2f> health=<SYNCED|HEALTHY_LAG|CRITICAL_LAG>`\n`CLUSTER_STATUS total_nodes=<N> max_lag_kb=<MAX.2f>`",
    "starter": "# Grille d'analyse (sql3-c6-e3) — Calculateur de lag de réplication WAL (Streaming Replication Lag)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Retard critique dépassant 64 Ko sur un réplica asynchrone]\n# Données : REPLICA node=standby_remote mode=async primary_lsn=0/20000000 replay_lsn=0/1FE00000\nA_COMPLETER\n\n[Cas 2 — Tous les nœuds parfaitement synchronisés]\n# Données : REPLICA node=standby_ha1 mode=sync primary_lsn=1/00000000 replay_lsn=1/00000000\n# Données : REPLICA node=standby_ha2 mode=sync primary_lsn=1/00000000 replay_lsn=1/00000000\nA_COMPLETER\n\n[Cas 3 — LSN traversant la frontière des 32 bits de poids fort]\n# Données : REPLICA node=standby_cross mode=async primary_lsn=2/00001000 replay_lsn=1/FFFF0000\nA_COMPLETER\n",
    "hints": [
      "Découper le LSN sur le caractère \"/\" : high, low = lsn.split(\"/\").",
      "Calculer lsn_val = int(high, 16) * (2**32) + int(low, 16).",
      "Calculer lag_bytes = primary_bytes - replay_bytes.",
      "Comparer lag_kb aux seuils 0 et 64 Ko."
    ],
    "examples": [
      {
        "stdin": "REPLICA node=standby_1 mode=async primary_lsn=0/16B3C840 replay_lsn=0/16B3A000\nREPLICA node=standby_2 mode=sync primary_lsn=0/16B3C840 replay_lsn=0/16B3C840",
        "expected": "LAG_STATUS node=standby_1 mode=async lag_bytes=10304 lag_kb=10.06 health=HEALTHY_LAG\nLAG_STATUS node=standby_2 mode=sync lag_bytes=0 lag_kb=0.00 health=SYNCED\nCLUSTER_STATUS total_nodes=2 max_lag_kb=10.06",
        "note": "standby_1 a un léger retard de 10 Ko (sain), standby_2 est parfaitement synchronisé."
      }
    ],
    "tests": [
      {
        "label": "Retard critique dépassant 64 Ko sur un réplica asynchrone",
        "stdin": "cas:1",
        "expected": "LAG_STATUS node=standby_remote mode=async lag_bytes=2097152 lag_kb=2048.00 health=CRITICAL_LAG\nCLUSTER_STATUS total_nodes=1 max_lag_kb=2048.00"
      },
      {
        "label": "Tous les nœuds parfaitement synchronisés",
        "stdin": "cas:2",
        "expected": "LAG_STATUS node=standby_ha1 mode=sync lag_bytes=0 lag_kb=0.00 health=SYNCED\nLAG_STATUS node=standby_ha2 mode=sync lag_bytes=0 lag_kb=0.00 health=SYNCED\nCLUSTER_STATUS total_nodes=2 max_lag_kb=0.00"
      },
      {
        "label": "LSN traversant la frontière des 32 bits de poids fort",
        "stdin": "cas:3",
        "expected": "LAG_STATUS node=standby_cross mode=async lag_bytes=69632 lag_kb=68.00 health=CRITICAL_LAG\nCLUSTER_STATUS total_nodes=1 max_lag_kb=68.00"
      }
    ],
    "solution": "[Exemple]\nLAG_STATUS node=standby_1 mode=async lag_bytes=10304 lag_kb=10.06 health=HEALTHY_LAG\nLAG_STATUS node=standby_2 mode=sync lag_bytes=0 lag_kb=0.00 health=SYNCED\nCLUSTER_STATUS total_nodes=2 max_lag_kb=10.06\n\n[Cas 1 — Retard critique dépassant 64 Ko sur un réplica asynchrone]\nLAG_STATUS node=standby_remote mode=async lag_bytes=2097152 lag_kb=2048.00 health=CRITICAL_LAG\nCLUSTER_STATUS total_nodes=1 max_lag_kb=2048.00\n\n[Cas 2 — Tous les nœuds parfaitement synchronisés]\nLAG_STATUS node=standby_ha1 mode=sync lag_bytes=0 lag_kb=0.00 health=SYNCED\nLAG_STATUS node=standby_ha2 mode=sync lag_bytes=0 lag_kb=0.00 health=SYNCED\nCLUSTER_STATUS total_nodes=2 max_lag_kb=0.00\n\n[Cas 3 — LSN traversant la frontière des 32 bits de poids fort]\nLAG_STATUS node=standby_cross mode=async lag_bytes=69632 lag_kb=68.00 health=CRITICAL_LAG\nCLUSTER_STATUS total_nodes=1 max_lag_kb=68.00"
  }
];
