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
  }
];
