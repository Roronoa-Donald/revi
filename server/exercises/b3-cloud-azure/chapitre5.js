/**
 * Exercices du Chapitre 5 : Stockage Azure (Blob, Files, Disques) et Données Managées.
 * Préfixe : az3-c5-e
 */
'use strict';

module.exports = [
  {
    id: 'az3-c5-e1',
    chapter: 5,
    title: 'Simulateur de cycle de vie Azure Blob Storage',
    level: 'n1',
    language: 'python',
    goal: 'Appliquer des règles de gestion automatique du cycle de vie des données Blob Storage (Hot -> Cool -> Archive -> Delete) et mesurer les économies financières.',
    brief: `<p>Azure Blob Lifecycle Management permet de transférer automatiquement des données froides vers des paliers de stockage moins coûteux ou de les purger.<br><br>
Tarification de référence mensuelle par Go :<br>
- <code>HOT</code> : 0.0184 USD / Go<br>
- <code>COOL</code> : 0.0100 USD / Go<br>
- <code>ARCHIVE</code> : 0.00099 USD / Go<br>
- <code>DELETED</code> : 0.0000 USD / Go<br><br>
Format d'entrée :<br>
Ligne 1 : Déclaration de la politique de cycle de vie :<br>
<code>POLICY cool_days=&lt;int&gt; archive_days=&lt;int&gt; delete_days=&lt;int&gt;</code><br>
Lignes suivantes : Objets blobs à évaluer :<br>
<code>BLOB name=&lt;nom&gt; size_gb=&lt;int&gt; age_days=&lt;int&gt;</code><br><br>
Règles de transition (évaluation par ordre de priorité descendante) :<br>
- Si <code>age_days &gt;= delete_days</code> : palier <code>DELETED</code> (coût = 0.0000)<br>
- Sinon si <code>age_days &gt;= archive_days</code> : palier <code>ARCHIVE</code> (coût = <code>size_gb * 0.00099</code>)<br>
- Sinon si <code>age_days &gt;= cool_days</code> : palier <code>COOL</code> (coût = <code>size_gb * 0.0100</code>)<br>
- Sinon : palier <code>HOT</code> (coût = <code>size_gb * 0.0184</code>)<br><br>
Format de sortie attendu :<br>
Pour chaque blob :<br>
<code>BLOB &lt;nom&gt;: age=&lt;age_days&gt;d TARGET_TIER=&lt;TIER&gt; COST=$&lt;cost:.4f&gt;</code><br>
À la fin, afficher le récapitulatif comparatif (coût initial si tous en HOT vs coût optimisé) :<br>
<code>TOTAL_HOT=$&lt;total_hot:.2f&gt; TOTAL_OPTIMIZED=$&lt;total_opt:.2f&gt; SAVINGS=&lt;savings_pct:.1f&gt;%</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : appliquer la politique de cycle de vie et calculer les économies
`,
    hints: [
      'Vérifier les conditions d\'âge dans l\'ordre : delete_days, puis archive_days, puis cool_days.',
      'Calculer total_hot = somme(size_gb * 0.0184) pour mesurer le gain du Lifecycle Management.'
    ],
    examples: [
      {
        stdin: 'POLICY cool_days=30 archive_days=90 delete_days=365\nBLOB name=log-recent.csv size_gb=10 age_days=10\nBLOB name=backup-q1.bak size_gb=100 age_days=45\nBLOB name=archive-2023.tar size_gb=500 age_days=120\nBLOB name=temp-2022.tmp size_gb=50 age_days=400',
        expected: 'BLOB log-recent.csv: age=10d TARGET_TIER=HOT COST=$0.1840\nBLOB backup-q1.bak: age=45d TARGET_TIER=COOL COST=$1.0000\nBLOB archive-2023.tar: age=120d TARGET_TIER=ARCHIVE COST=$0.4950\nBLOB temp-2022.tmp: age=400d TARGET_TIER=DELETED COST=$0.0000\nTOTAL_HOT=$12.14 TOTAL_OPTIMIZED=$1.68 SAVINGS=86.2%',
        note: 'Migration vers Cool, Archive et suppression générant 86.2% d\'économies.'
      }
    ],
    tests: [
      {
        label: 'Cycle de vie complet avec Hot, Cool et Archive',
        stdin: 'POLICY cool_days=15 archive_days=60 delete_days=180\nBLOB name=app-events.json size_gb=5 age_days=5\nBLOB name=db-snapshot.dump size_gb=50 age_days=20\nBLOB name=old-logs.gz size_gb=200 age_days=90',
        expected: 'BLOB app-events.json: age=5d TARGET_TIER=HOT COST=$0.0920\nBLOB db-snapshot.dump: age=20d TARGET_TIER=COOL COST=$0.5000\nBLOB old-logs.gz: age=90d TARGET_TIER=ARCHIVE COST=$0.1980\nTOTAL_HOT=$4.69 TOTAL_OPTIMIZED=$0.79 SAVINGS=83.2%'
      },
      {
        label: 'Blobs récents restant tous en palier Hot',
        stdin: 'POLICY cool_days=30 archive_days=90 delete_days=180\nBLOB name=data1.parquet size_gb=20 age_days=5\nBLOB name=data2.parquet size_gb=30 age_days=15',
        expected: 'BLOB data1.parquet: age=5d TARGET_TIER=HOT COST=$0.3680\nBLOB data2.parquet: age=15d TARGET_TIER=HOT COST=$0.5520\nTOTAL_HOT=$0.92 TOTAL_OPTIMIZED=$0.92 SAVINGS=0.0%'
      }
    ],
    solution: `import sys

lines = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]
if not lines:
    sys.exit(0)

pol_line = lines[0]
if not pol_line.startswith("POLICY "):
    sys.exit(0)

pol_props = {}
for part in pol_line[len("POLICY "):].split():
    if "=" in part:
        k, v = part.split("=", 1)
        pol_props[k] = int(v)

c_days = pol_props.get("cool_days", 30)
a_days = pol_props.get("archive_days", 90)
d_days = pol_props.get("delete_days", 365)

total_hot = 0.0
total_opt = 0.0

for line in lines[1:]:
    if not line.startswith("BLOB "):
        continue
    props = {}
    for part in line[len("BLOB "):].split():
        if "=" in part:
            k, v = part.split("=", 1)
            props[k] = v
            
    name = props.get("name", "blob")
    size = float(props.get("size_gb", 0))
    age = int(props.get("age_days", 0))
    
    initial_cost = size * 0.0184
    total_hot += initial_cost
    
    if age >= d_days:
        tier = "DELETED"
        cost = 0.0
    elif age >= a_days:
        tier = "ARCHIVE"
        cost = size * 0.00099
    elif age >= c_days:
        tier = "COOL"
        cost = size * 0.0100
    else:
        tier = "HOT"
        cost = initial_cost
        
    total_opt += cost
    print(f"BLOB {name}: age={age}d TARGET_TIER={tier} COST=" + "$" + f"{cost:.4f}")

savings = ((total_hot - total_opt) / total_hot * 100.0) if total_hot > 0 else 0.0
print("TOTAL_HOT=" + "$" + f"{total_hot:.2f} TOTAL_OPTIMIZED=" + "$" + f"{total_opt:.2f} SAVINGS={savings:.1f}%")
`
  },
  {
    id: 'az3-c5-e2',
    chapter: 5,
    title: 'Validateur de requêtes avec jetons SAS',
    level: 'n2',
    language: 'python',
    goal: 'Valider la conformité d’appels API clients face aux permissions, plages horaires et protocoles imposés par un jeton de signature d’accès partagé (SAS).',
    brief: `<p>Les jetons de signature d'accès partagé (Azure SAS Tokens) délèguent un accès restreint aux ressources de stockage en précisant les permissions accordées, une fenêtre temporelle et un protocole strict.<br><br>
Format d'entrée :<br>
Ligne 1 : Configuration du jeton SAS :<br>
<code>SAS_CONFIG sp=&lt;perms&gt; st=&lt;int&gt; se=&lt;int&gt; spr=&lt;protocol&gt;</code><br>
- <code>sp</code> : permissions autorisées (sous-chaîne contenant <code>r</code>, <code>w</code>, <code>d</code>, <code>l</code>)<br>
- <code>st</code> : horodatage début de validité (entier)<br>
- <code>se</code> : horodatage fin de validité (entier)<br>
- <code>spr</code> : protocole imposé (<code>https</code> ou <code>https,http</code>)<br><br>
Lignes suivantes : Requêtes HTTP clientes :<br>
<code>REQUEST method=&lt;GET|PUT|DELETE|LIST&gt; time=&lt;int&gt; proto=&lt;http|https&gt;</code><br><br>
Correspondance des méthodes HTTP avec les permissions SAS :<br>
- <code>GET</code> requiert <code>r</code><br>
- <code>PUT</code> requiert <code>w</code><br>
- <code>DELETE</code> requiert <code>d</code><br>
- <code>LIST</code> requiert <code>l</code><br><br>
Ordre strict d'évaluation de la requête :<br>
1. Si <code>spr=https</code> et que la requête utilise <code>proto=http</code> :<br>
   <code>REQUEST &lt;method&gt; at &lt;time&gt;: DENIED (reason=PROTOCOL_VIOLATION)</code><br>
2. Si <code>time &lt; st</code> :<br>
   <code>REQUEST &lt;method&gt; at &lt;time&gt;: DENIED (reason=NOT_YET_VALID)</code><br>
3. Si <code>time &gt; se</code> :<br>
   <code>REQUEST &lt;method&gt; at &lt;time&gt;: DENIED (reason=EXPIRED)</code><br>
4. Si la permission requise n'est pas présente dans <code>sp</code> :<br>
   <code>REQUEST &lt;method&gt; at &lt;time&gt;: DENIED (reason=INSUFFICIENT_PERMISSIONS)</code><br>
5. Si tous les contrôles réussissent :<br>
   <code>REQUEST &lt;method&gt; at &lt;time&gt;: ALLOWED</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : implémenter la vérification des règles du jeton SAS
`,
    hints: [
      'Créer un dictionnaire associant chaque méthode HTTP à sa lettre de permission (GET: r, PUT: w, DELETE: d, LIST: l).',
      'Respecter l\'ordre prescrit des contrôles d\'erreur : protocole, puis anticipé, puis expiré, puis permissions.'
    ],
    examples: [
      {
        stdin: 'SAS_CONFIG sp=rw st=100 se=200 spr=https\nREQUEST method=GET time=150 proto=https\nREQUEST method=DELETE time=150 proto=https',
        expected: 'REQUEST GET at 150: ALLOWED\nREQUEST DELETE at 150: DENIED (reason=INSUFFICIENT_PERMISSIONS)',
        note: 'Lecture autorisée mais suppression interdite par le jeton SAS (permissions rw uniquement).'
      }
    ],
    tests: [
      {
        label: 'Vérification normale des permissions PUT et LIST',
        stdin: 'SAS_CONFIG sp=rwd st=50 se=150 spr=https\nREQUEST method=PUT time=100 proto=https\nREQUEST method=LIST time=100 proto=https',
        expected: 'REQUEST PUT at 100: ALLOWED\nREQUEST LIST at 100: DENIED (reason=INSUFFICIENT_PERMISSIONS)'
      },
      {
        label: 'Violations de protocole et fenêtres temporelles expirées ou anticipées',
        stdin: 'SAS_CONFIG sp=r st=100 se=200 spr=https\nREQUEST method=GET time=150 proto=http\nREQUEST method=GET time=80 proto=https\nREQUEST method=GET time=250 proto=https',
        expected: 'REQUEST GET at 150: DENIED (reason=PROTOCOL_VIOLATION)\nREQUEST GET at 80: DENIED (reason=NOT_YET_VALID)\nREQUEST GET at 250: DENIED (reason=EXPIRED)'
      },
      {
        label: 'Jeton avec protocole dual https et http et permission list',
        stdin: 'SAS_CONFIG sp=rl st=50 se=150 spr=https,http\nREQUEST method=LIST time=100 proto=http\nREQUEST method=PUT time=100 proto=http',
        expected: 'REQUEST LIST at 100: ALLOWED\nREQUEST PUT at 100: DENIED (reason=INSUFFICIENT_PERMISSIONS)'
      }
    ],
    solution: `import sys

METHOD_PERMS = {
    "GET": "r",
    "PUT": "w",
    "DELETE": "d",
    "LIST": "l"
}

lines = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]
if not lines:
    sys.exit(0)

cfg_line = lines[0]
if not cfg_line.startswith("SAS_CONFIG "):
    sys.exit(0)

cfg = {}
for part in cfg_line[len("SAS_CONFIG "):].split():
    if "=" in part:
        k, v = part.split("=", 1)
        cfg[k] = v

sp = cfg.get("sp", "")
st = int(cfg.get("st", 0))
se = int(cfg.get("se", 0))
spr = cfg.get("spr", "https")

for line in lines[1:]:
    if not line.startswith("REQUEST "):
        continue
    props = {}
    for part in line[len("REQUEST "):].split():
        if "=" in part:
            k, v = part.split("=", 1)
            props[k] = v
            
    method = props.get("method", "GET")
    req_time = int(props.get("time", 0))
    proto = props.get("proto", "http")
    
    # 1. Protocole
    if spr == "https" and proto != "https":
        print(f"REQUEST {method} at {req_time}: DENIED (reason=PROTOCOL_VIOLATION)")
        continue
        
    # 2. Heure de début
    if req_time < st:
        print(f"REQUEST {method} at {req_time}: DENIED (reason=NOT_YET_VALID)")
        continue
        
    # 3. Heure de fin
    if req_time > se:
        print(f"REQUEST {method} at {req_time}: DENIED (reason=EXPIRED)")
        continue
        
    # 4. Permission
    req_p = METHOD_PERMS.get(method)
    if not req_p or req_p not in sp:
        print(f"REQUEST {method} at {req_time}: DENIED (reason=INSUFFICIENT_PERMISSIONS)")
        continue
        
    print(f"REQUEST {method} at {req_time}: ALLOWED")
`
  },
  {
    id: 'az3-c5-e3',
    chapter: 5,
    title: 'Sélecteur d\'architecture de données Azure',
    level: 'n3',
    language: 'python',
    goal: 'Analyser les besoins fonctionnels et recommander le service de stockage ou de base de données managé Azure adéquat.',
    brief: `<p>Azure dispose d'une gamme diversifiée de services de données managés. Le choix dépend du modèle de données (relationnel, NoSQL, fichiers, objets) et des contraintes d'infrastructure.<br><br>
Matrice de décision Azure :<br>
- Si <code>model=RELATIONAL</code> :<br>
  <code>SERVICE=Azure_SQL_Database JUSTIFICATION="Moteur relationnel transactionnel ACID et compatibilité T-SQL"</code><br>
- Si <code>model=NOSQL_DOCUMENT</code> :<br>
  <code>SERVICE=Azure_Cosmos_DB JUSTIFICATION="Base NoSQL multi-modèle distribuée mondialement avec latence garantie &lt; 10ms"</code><br>
- Si <code>model=FILE_SMB</code> :<br>
  <code>SERVICE=Azure_Files JUSTIFICATION="Partage de fichiers partagé natif compatible SMB/NFS sans serveur dédié"</code><br>
- Si <code>model=UNSTRUCTURED_OBJECTS</code> :<br>
  <code>SERVICE=Azure_Blob_Storage JUSTIFICATION="Stockage objet massif hautement scalable avec gestion de cycle de vie et niveaux d'accès"</code><br><br>
Format d'entrée :<br>
<code>REQUIREMENT workload=&lt;nom&gt; model=&lt;MODEL&gt;</code><br><br>
Format de sortie attendu :<br>
<code>DECISION workload=&lt;nom&gt;: SERVICE=&lt;SERVICE&gt; JUSTIFICATION="&lt;JUSTIFICATION&gt;"</code><br>
(Si le modèle est inconnu : <code>DECISION workload=&lt;nom&gt;: SERVICE=UNKNOWN JUSTIFICATION="Modèle non supporté"</code>).</p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : implémenter la sélection architecturale Azure
`,
    hints: [
      'Associer chaque mot-clé de modèle de données aux caractéristiques techniques du service managé Azure.',
      'Soigner le formatage avec guillemets autour de la justification.'
    ],
    examples: [
      {
        stdin: 'REQUIREMENT workload=app-erp model=RELATIONAL\nREQUIREMENT workload=mobile-cart model=NOSQL_DOCUMENT',
        expected: 'DECISION workload=app-erp: SERVICE=Azure_SQL_Database JUSTIFICATION="Moteur relationnel transactionnel ACID et compatibilité T-SQL"\nDECISION workload=mobile-cart: SERVICE=Azure_Cosmos_DB JUSTIFICATION="Base NoSQL multi-modèle distribuée mondialement avec latence garantie < 10ms"',
        note: 'Sélection d\'Azure SQL pour l\'ERP et Cosmos DB pour le panier mobile.'
      }
    ],
    tests: [
      {
        label: 'Classification CRM relationnel et télémétrie IoT NoSQL',
        stdin: 'REQUIREMENT workload=crm-core model=RELATIONAL\nREQUIREMENT workload=iot-telemetry model=NOSQL_DOCUMENT',
        expected: 'DECISION workload=crm-core: SERVICE=Azure_SQL_Database JUSTIFICATION="Moteur relationnel transactionnel ACID et compatibilité T-SQL"\nDECISION workload=iot-telemetry: SERVICE=Azure_Cosmos_DB JUSTIFICATION="Base NoSQL multi-modèle distribuée mondialement avec latence garantie < 10ms"'
      },
      {
        label: 'Classification partage SMB et data lake Blob',
        stdin: 'REQUIREMENT workload=legacy-shares model=FILE_SMB\nREQUIREMENT workload=data-lake model=UNSTRUCTURED_OBJECTS',
        expected: 'DECISION workload=legacy-shares: SERVICE=Azure_Files JUSTIFICATION="Partage de fichiers partagé natif compatible SMB/NFS sans serveur dédié"\nDECISION workload=data-lake: SERVICE=Azure_Blob_Storage JUSTIFICATION="Stockage objet massif hautement scalable avec gestion de cycle de vie et niveaux d\'accès"'
      },
      {
        label: 'Cas de modèle inconnu',
        stdin: 'REQUIREMENT workload=blockchain model=LEDGER_GRAPH',
        expected: 'DECISION workload=blockchain: SERVICE=UNKNOWN JUSTIFICATION="Modèle non supporté"'
      }
    ],
    solution: `import sys

DATA_SERVICES = {
    "RELATIONAL": ("Azure_SQL_Database", "Moteur relationnel transactionnel ACID et compatibilité T-SQL"),
    "NOSQL_DOCUMENT": ("Azure_Cosmos_DB", "Base NoSQL multi-modèle distribuée mondialement avec latence garantie < 10ms"),
    "FILE_SMB": ("Azure_Files", "Partage de fichiers partagé natif compatible SMB/NFS sans serveur dédié"),
    "UNSTRUCTURED_OBJECTS": ("Azure_Blob_Storage", "Stockage objet massif hautement scalable avec gestion de cycle de vie et niveaux d'accès")
}

for line in sys.stdin.read().splitlines():
    line = line.strip()
    if not line or not line.startswith("REQUIREMENT "):
        continue
    props = {}
    for part in line[len("REQUIREMENT "):].split():
        if "=" in part:
            k, v = part.split("=", 1)
            props[k] = v
            
    name = props.get("workload", "unknown")
    model = props.get("model", "")
    
    if model in DATA_SERVICES:
        svc, just = DATA_SERVICES[model]
        print(f'DECISION workload={name}: SERVICE={svc} JUSTIFICATION="{just}"')
    else:
        print(f'DECISION workload={name}: SERVICE=UNKNOWN JUSTIFICATION="Modèle non supporté"')
`
  }
];
