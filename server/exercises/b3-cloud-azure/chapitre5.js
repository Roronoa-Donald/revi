'use strict';

module.exports = [
  {
    "id": "az3-c5-e1",
    "chapter": 5,
    "title": "Simulateur de cycle de vie Azure Blob Storage",
    "level": "n1",
    "language": "analyse",
    "goal": "Appliquer des règles de gestion automatique du cycle de vie des données Blob Storage (Hot -> Cool -> Archive -> Delete) et mesurer les économies financières.",
    "brief": "<p>Azure Blob Lifecycle Management permet de transférer automatiquement des données froides vers des paliers de stockage moins coûteux ou de les purger.<br><br>\nTarification de référence mensuelle par Go :<br>\n- <code>HOT</code> : 0.0184 USD / Go<br>\n- <code>COOL</code> : 0.0100 USD / Go<br>\n- <code>ARCHIVE</code> : 0.00099 USD / Go<br>\n- <code>DELETED</code> : 0.0000 USD / Go<br><br>\nFormat d'entrée :<br>\nLigne 1 : Déclaration de la politique de cycle de vie :<br>\n<code>POLICY cool_days=&lt;int&gt; archive_days=&lt;int&gt; delete_days=&lt;int&gt;</code><br>\nLignes suivantes : Objets blobs à évaluer :<br>\n<code>BLOB name=&lt;nom&gt; size_gb=&lt;int&gt; age_days=&lt;int&gt;</code><br><br>\nRègles de transition (évaluation par ordre de priorité descendante) :<br>\n- Si <code>age_days &gt;= delete_days</code> : palier <code>DELETED</code> (coût = 0.0000)<br>\n- Sinon si <code>age_days &gt;= archive_days</code> : palier <code>ARCHIVE</code> (coût = <code>size_gb * 0.00099</code>)<br>\n- Sinon si <code>age_days &gt;= cool_days</code> : palier <code>COOL</code> (coût = <code>size_gb * 0.0100</code>)<br>\n- Sinon : palier <code>HOT</code> (coût = <code>size_gb * 0.0184</code>)<br><br>\nFormat de sortie attendu :<br>\nPour chaque blob :<br>\n<code>BLOB &lt;nom&gt;: age=&lt;age_days&gt;d TARGET_TIER=&lt;TIER&gt; COST=$&lt;cost:.4f&gt;</code><br>\nÀ la fin, afficher le récapitulatif comparatif (coût initial si tous en HOT vs coût optimisé) :<br>\n<code>TOTAL_HOT=$&lt;total_hot:.2f&gt; TOTAL_OPTIMIZED=$&lt;total_opt:.2f&gt; SAVINGS=&lt;savings_pct:.1f&gt;%</code></p>",
    "starter": "# Grille d'analyse (az3-c5-e1) — Simulateur de cycle de vie Azure Blob Storage\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Cycle de vie complet avec Hot, Cool et Archive]\n# Données : POLICY cool_days=15 archive_days=60 delete_days=180\n# Données : BLOB name=app-events.json size_gb=5 age_days=5\n# Données : BLOB name=db-snapshot.dump size_gb=50 age_days=20\n# Données : BLOB name=old-logs.gz size_gb=200 age_days=90\nA_COMPLETER\n\n[Cas 2 — Blobs récents restant tous en palier Hot]\n# Données : POLICY cool_days=30 archive_days=90 delete_days=180\n# Données : BLOB name=data1.parquet size_gb=20 age_days=5\n# Données : BLOB name=data2.parquet size_gb=30 age_days=15\nA_COMPLETER\n",
    "hints": [
      "Vérifier les conditions d'âge dans l'ordre : delete_days, puis archive_days, puis cool_days.",
      "Calculer total_hot = somme(size_gb * 0.0184) pour mesurer le gain du Lifecycle Management."
    ],
    "examples": [
      {
        "stdin": "POLICY cool_days=30 archive_days=90 delete_days=365\nBLOB name=log-recent.csv size_gb=10 age_days=10\nBLOB name=backup-q1.bak size_gb=100 age_days=45\nBLOB name=archive-2023.tar size_gb=500 age_days=120\nBLOB name=temp-2022.tmp size_gb=50 age_days=400",
        "expected": "BLOB log-recent.csv: age=10d TARGET_TIER=HOT COST=$0.1840\nBLOB backup-q1.bak: age=45d TARGET_TIER=COOL COST=$1.0000\nBLOB archive-2023.tar: age=120d TARGET_TIER=ARCHIVE COST=$0.4950\nBLOB temp-2022.tmp: age=400d TARGET_TIER=DELETED COST=$0.0000\nTOTAL_HOT=$12.14 TOTAL_OPTIMIZED=$1.68 SAVINGS=86.2%",
        "note": "Migration vers Cool, Archive et suppression générant 86.2% d'économies."
      }
    ],
    "tests": [
      {
        "label": "Cycle de vie complet avec Hot, Cool et Archive",
        "stdin": "cas:1",
        "expected": "BLOB app-events.json: age=5d TARGET_TIER=HOT COST=$0.0920\nBLOB db-snapshot.dump: age=20d TARGET_TIER=COOL COST=$0.5000\nBLOB old-logs.gz: age=90d TARGET_TIER=ARCHIVE COST=$0.1980\nTOTAL_HOT=$4.69 TOTAL_OPTIMIZED=$0.79 SAVINGS=83.2%"
      },
      {
        "label": "Blobs récents restant tous en palier Hot",
        "stdin": "cas:2",
        "expected": "BLOB data1.parquet: age=5d TARGET_TIER=HOT COST=$0.3680\nBLOB data2.parquet: age=15d TARGET_TIER=HOT COST=$0.5520\nTOTAL_HOT=$0.92 TOTAL_OPTIMIZED=$0.92 SAVINGS=0.0%"
      }
    ],
    "solution": "[Exemple]\nBLOB log-recent.csv: age=10d TARGET_TIER=HOT COST=$0.1840\nBLOB backup-q1.bak: age=45d TARGET_TIER=COOL COST=$1.0000\nBLOB archive-2023.tar: age=120d TARGET_TIER=ARCHIVE COST=$0.4950\nBLOB temp-2022.tmp: age=400d TARGET_TIER=DELETED COST=$0.0000\nTOTAL_HOT=$12.14 TOTAL_OPTIMIZED=$1.68 SAVINGS=86.2%\n\n[Cas 1 — Cycle de vie complet avec Hot, Cool et Archive]\nBLOB app-events.json: age=5d TARGET_TIER=HOT COST=$0.0920\nBLOB db-snapshot.dump: age=20d TARGET_TIER=COOL COST=$0.5000\nBLOB old-logs.gz: age=90d TARGET_TIER=ARCHIVE COST=$0.1980\nTOTAL_HOT=$4.69 TOTAL_OPTIMIZED=$0.79 SAVINGS=83.2%\n\n[Cas 2 — Blobs récents restant tous en palier Hot]\nBLOB data1.parquet: age=5d TARGET_TIER=HOT COST=$0.3680\nBLOB data2.parquet: age=15d TARGET_TIER=HOT COST=$0.5520\nTOTAL_HOT=$0.92 TOTAL_OPTIMIZED=$0.92 SAVINGS=0.0%"
  },
  {
    "id": "az3-c5-e2",
    "chapter": 5,
    "title": "Validateur de requêtes avec jetons SAS",
    "level": "n2",
    "language": "analyse",
    "goal": "Valider la conformité d’appels API clients face aux permissions, plages horaires et protocoles imposés par un jeton de signature d’accès partagé (SAS).",
    "brief": "<p>Les jetons de signature d'accès partagé (Azure SAS Tokens) délèguent un accès restreint aux ressources de stockage en précisant les permissions accordées, une fenêtre temporelle et un protocole strict.<br><br>\nFormat d'entrée :<br>\nLigne 1 : Configuration du jeton SAS :<br>\n<code>SAS_CONFIG sp=&lt;perms&gt; st=&lt;int&gt; se=&lt;int&gt; spr=&lt;protocol&gt;</code><br>\n- <code>sp</code> : permissions autorisées (sous-chaîne contenant <code>r</code>, <code>w</code>, <code>d</code>, <code>l</code>)<br>\n- <code>st</code> : horodatage début de validité (entier)<br>\n- <code>se</code> : horodatage fin de validité (entier)<br>\n- <code>spr</code> : protocole imposé (<code>https</code> ou <code>https,http</code>)<br><br>\nLignes suivantes : Requêtes HTTP clientes :<br>\n<code>REQUEST method=&lt;GET|PUT|DELETE|LIST&gt; time=&lt;int&gt; proto=&lt;http|https&gt;</code><br><br>\nCorrespondance des méthodes HTTP avec les permissions SAS :<br>\n- <code>GET</code> requiert <code>r</code><br>\n- <code>PUT</code> requiert <code>w</code><br>\n- <code>DELETE</code> requiert <code>d</code><br>\n- <code>LIST</code> requiert <code>l</code><br><br>\nOrdre strict d'évaluation de la requête :<br>\n1. Si <code>spr=https</code> et que la requête utilise <code>proto=http</code> :<br>\n   <code>REQUEST &lt;method&gt; at &lt;time&gt;: DENIED (reason=PROTOCOL_VIOLATION)</code><br>\n2. Si <code>time &lt; st</code> :<br>\n   <code>REQUEST &lt;method&gt; at &lt;time&gt;: DENIED (reason=NOT_YET_VALID)</code><br>\n3. Si <code>time &gt; se</code> :<br>\n   <code>REQUEST &lt;method&gt; at &lt;time&gt;: DENIED (reason=EXPIRED)</code><br>\n4. Si la permission requise n'est pas présente dans <code>sp</code> :<br>\n   <code>REQUEST &lt;method&gt; at &lt;time&gt;: DENIED (reason=INSUFFICIENT_PERMISSIONS)</code><br>\n5. Si tous les contrôles réussissent :<br>\n   <code>REQUEST &lt;method&gt; at &lt;time&gt;: ALLOWED</code></p>",
    "starter": "# Grille d'analyse (az3-c5-e2) — Validateur de requêtes avec jetons SAS\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Vérification normale des permissions PUT et LIST]\n# Données : SAS_CONFIG sp=rwd st=50 se=150 spr=https\n# Données : REQUEST method=PUT time=100 proto=https\n# Données : REQUEST method=LIST time=100 proto=https\nA_COMPLETER\n\n[Cas 2 — Violations de protocole et fenêtres temporelles expirées ou anticipées]\n# Données : SAS_CONFIG sp=r st=100 se=200 spr=https\n# Données : REQUEST method=GET time=150 proto=http\n# Données : REQUEST method=GET time=80 proto=https\n# Données : REQUEST method=GET time=250 proto=https\nA_COMPLETER\n\n[Cas 3 — Jeton avec protocole dual https et http et permission list]\n# Données : SAS_CONFIG sp=rl st=50 se=150 spr=https,http\n# Données : REQUEST method=LIST time=100 proto=http\n# Données : REQUEST method=PUT time=100 proto=http\nA_COMPLETER\n",
    "hints": [
      "Créer un dictionnaire associant chaque méthode HTTP à sa lettre de permission (GET: r, PUT: w, DELETE: d, LIST: l).",
      "Respecter l'ordre prescrit des contrôles d'erreur : protocole, puis anticipé, puis expiré, puis permissions."
    ],
    "examples": [
      {
        "stdin": "SAS_CONFIG sp=rw st=100 se=200 spr=https\nREQUEST method=GET time=150 proto=https\nREQUEST method=DELETE time=150 proto=https",
        "expected": "REQUEST GET at 150: ALLOWED\nREQUEST DELETE at 150: DENIED (reason=INSUFFICIENT_PERMISSIONS)",
        "note": "Lecture autorisée mais suppression interdite par le jeton SAS (permissions rw uniquement)."
      }
    ],
    "tests": [
      {
        "label": "Vérification normale des permissions PUT et LIST",
        "stdin": "cas:1",
        "expected": "REQUEST PUT at 100: ALLOWED\nREQUEST LIST at 100: DENIED (reason=INSUFFICIENT_PERMISSIONS)"
      },
      {
        "label": "Violations de protocole et fenêtres temporelles expirées ou anticipées",
        "stdin": "cas:2",
        "expected": "REQUEST GET at 150: DENIED (reason=PROTOCOL_VIOLATION)\nREQUEST GET at 80: DENIED (reason=NOT_YET_VALID)\nREQUEST GET at 250: DENIED (reason=EXPIRED)"
      },
      {
        "label": "Jeton avec protocole dual https et http et permission list",
        "stdin": "cas:3",
        "expected": "REQUEST LIST at 100: ALLOWED\nREQUEST PUT at 100: DENIED (reason=INSUFFICIENT_PERMISSIONS)"
      }
    ],
    "solution": "[Exemple]\nREQUEST GET at 150: ALLOWED\nREQUEST DELETE at 150: DENIED (reason=INSUFFICIENT_PERMISSIONS)\n\n[Cas 1 — Vérification normale des permissions PUT et LIST]\nREQUEST PUT at 100: ALLOWED\nREQUEST LIST at 100: DENIED (reason=INSUFFICIENT_PERMISSIONS)\n\n[Cas 2 — Violations de protocole et fenêtres temporelles expirées ou anticipées]\nREQUEST GET at 150: DENIED (reason=PROTOCOL_VIOLATION)\nREQUEST GET at 80: DENIED (reason=NOT_YET_VALID)\nREQUEST GET at 250: DENIED (reason=EXPIRED)\n\n[Cas 3 — Jeton avec protocole dual https et http et permission list]\nREQUEST LIST at 100: ALLOWED\nREQUEST PUT at 100: DENIED (reason=INSUFFICIENT_PERMISSIONS)"
  },
  {
    "id": "az3-c5-e3",
    "chapter": 5,
    "title": "Sélecteur d'architecture de données Azure",
    "level": "n3",
    "language": "analyse",
    "goal": "Analyser les besoins fonctionnels et recommander le service de stockage ou de base de données managé Azure adéquat.",
    "brief": "<p>Azure dispose d'une gamme diversifiée de services de données managés. Le choix dépend du modèle de données (relationnel, NoSQL, fichiers, objets) et des contraintes d'infrastructure.<br><br>\nMatrice de décision Azure :<br>\n- Si <code>model=RELATIONAL</code> :<br>\n  <code>SERVICE=Azure_SQL_Database JUSTIFICATION=\"Moteur relationnel transactionnel ACID et compatibilité T-SQL\"</code><br>\n- Si <code>model=NOSQL_DOCUMENT</code> :<br>\n  <code>SERVICE=Azure_Cosmos_DB JUSTIFICATION=\"Base NoSQL multi-modèle distribuée mondialement avec latence garantie &lt; 10ms\"</code><br>\n- Si <code>model=FILE_SMB</code> :<br>\n  <code>SERVICE=Azure_Files JUSTIFICATION=\"Partage de fichiers partagé natif compatible SMB/NFS sans serveur dédié\"</code><br>\n- Si <code>model=UNSTRUCTURED_OBJECTS</code> :<br>\n  <code>SERVICE=Azure_Blob_Storage JUSTIFICATION=\"Stockage objet massif hautement scalable avec gestion de cycle de vie et niveaux d'accès\"</code><br><br>\nFormat d'entrée :<br>\n<code>REQUIREMENT workload=&lt;nom&gt; model=&lt;MODEL&gt;</code><br><br>\nFormat de sortie attendu :<br>\n<code>DECISION workload=&lt;nom&gt;: SERVICE=&lt;SERVICE&gt; JUSTIFICATION=\"&lt;JUSTIFICATION&gt;\"</code><br>\n(Si le modèle est inconnu : <code>DECISION workload=&lt;nom&gt;: SERVICE=UNKNOWN JUSTIFICATION=\"Modèle non supporté\"</code>).</p>",
    "starter": "# Grille d'analyse (az3-c5-e3) — Sélecteur d'architecture de données Azure\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Classification CRM relationnel et télémétrie IoT NoSQL]\n# Données : REQUIREMENT workload=crm-core model=RELATIONAL\n# Données : REQUIREMENT workload=iot-telemetry model=NOSQL_DOCUMENT\nA_COMPLETER\n\n[Cas 2 — Classification partage SMB et data lake Blob]\n# Données : REQUIREMENT workload=legacy-shares model=FILE_SMB\n# Données : REQUIREMENT workload=data-lake model=UNSTRUCTURED_OBJECTS\nA_COMPLETER\n\n[Cas 3 — Cas de modèle inconnu]\n# Données : REQUIREMENT workload=blockchain model=LEDGER_GRAPH\nA_COMPLETER\n",
    "hints": [
      "Associer chaque mot-clé de modèle de données aux caractéristiques techniques du service managé Azure.",
      "Soigner le formatage avec guillemets autour de la justification."
    ],
    "examples": [
      {
        "stdin": "REQUIREMENT workload=app-erp model=RELATIONAL\nREQUIREMENT workload=mobile-cart model=NOSQL_DOCUMENT",
        "expected": "DECISION workload=app-erp: SERVICE=Azure_SQL_Database JUSTIFICATION=\"Moteur relationnel transactionnel ACID et compatibilité T-SQL\"\nDECISION workload=mobile-cart: SERVICE=Azure_Cosmos_DB JUSTIFICATION=\"Base NoSQL multi-modèle distribuée mondialement avec latence garantie < 10ms\"",
        "note": "Sélection d'Azure SQL pour l'ERP et Cosmos DB pour le panier mobile."
      }
    ],
    "tests": [
      {
        "label": "Classification CRM relationnel et télémétrie IoT NoSQL",
        "stdin": "cas:1",
        "expected": "DECISION workload=crm-core: SERVICE=Azure_SQL_Database JUSTIFICATION=\"Moteur relationnel transactionnel ACID et compatibilité T-SQL\"\nDECISION workload=iot-telemetry: SERVICE=Azure_Cosmos_DB JUSTIFICATION=\"Base NoSQL multi-modèle distribuée mondialement avec latence garantie < 10ms\""
      },
      {
        "label": "Classification partage SMB et data lake Blob",
        "stdin": "cas:2",
        "expected": "DECISION workload=legacy-shares: SERVICE=Azure_Files JUSTIFICATION=\"Partage de fichiers partagé natif compatible SMB/NFS sans serveur dédié\"\nDECISION workload=data-lake: SERVICE=Azure_Blob_Storage JUSTIFICATION=\"Stockage objet massif hautement scalable avec gestion de cycle de vie et niveaux d'accès\""
      },
      {
        "label": "Cas de modèle inconnu",
        "stdin": "cas:3",
        "expected": "DECISION workload=blockchain: SERVICE=UNKNOWN JUSTIFICATION=\"Modèle non supporté\""
      }
    ],
    "solution": "[Exemple]\nDECISION workload=app-erp: SERVICE=Azure_SQL_Database JUSTIFICATION=\"Moteur relationnel transactionnel ACID et compatibilité T-SQL\"\nDECISION workload=mobile-cart: SERVICE=Azure_Cosmos_DB JUSTIFICATION=\"Base NoSQL multi-modèle distribuée mondialement avec latence garantie < 10ms\"\n\n[Cas 1 — Classification CRM relationnel et télémétrie IoT NoSQL]\nDECISION workload=crm-core: SERVICE=Azure_SQL_Database JUSTIFICATION=\"Moteur relationnel transactionnel ACID et compatibilité T-SQL\"\nDECISION workload=iot-telemetry: SERVICE=Azure_Cosmos_DB JUSTIFICATION=\"Base NoSQL multi-modèle distribuée mondialement avec latence garantie < 10ms\"\n\n[Cas 2 — Classification partage SMB et data lake Blob]\nDECISION workload=legacy-shares: SERVICE=Azure_Files JUSTIFICATION=\"Partage de fichiers partagé natif compatible SMB/NFS sans serveur dédié\"\nDECISION workload=data-lake: SERVICE=Azure_Blob_Storage JUSTIFICATION=\"Stockage objet massif hautement scalable avec gestion de cycle de vie et niveaux d'accès\"\n\n[Cas 3 — Cas de modèle inconnu]\nDECISION workload=blockchain: SERVICE=UNKNOWN JUSTIFICATION=\"Modèle non supporté\""
  }
];
