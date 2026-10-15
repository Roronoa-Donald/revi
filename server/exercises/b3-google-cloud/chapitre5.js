/**
 * Exercices du Chapitre 5 : Stockage Distribué, Bases de Données & Pipeline Big Data.
 * Préfixe : gcp3-c5-e
 */
'use strict';

module.exports = [
  {
    id: 'gcp3-c5-e1',
    chapter: 5,
    title: 'Moteur de Transition de Cycle de Vie Cloud Storage (Lifecycle Management)',
    level: 'n1',
    language: 'python',
    goal: 'Simuler les règles d\'archivage et de transition automatique de classes d\'objets dans Google Cloud Storage.',
    brief: `<p>Google Cloud Storage propose 4 classes de stockage à coûts décroissants :<br>
- <code>STANDARD</code> : accès chaud fréquent (durée minimale 0 jour)<br>
- <code>NEARLINE</code> : consultation mensuelle (durée minimale 30 jours)<br>
- <code>COLDLINE</code> : consultation trimestrielle (durée minimale 90 jours)<br>
- <code>ARCHIVE</code> : archivage à long terme (durée minimale 365 jours)<br><br>
Commande STDIN :<br>
<code>LIFECYCLE_EVAL current_class=&lt;class&gt; age_days=&lt;N&gt; target_class=&lt;class&gt; min_age=&lt;M&gt;</code>.<br>
Sorties :<br>
- Si <code>age_days &gt;= min_age</code> :<br>
  <code>LIFECYCLE: current=&lt;cur&gt; target=&lt;target&gt; age=&lt;N&gt; action=TRANSITION_APPLIED status=SUCCESS</code><br>
- Sinon :<br>
  <code>LIFECYCLE: current=&lt;cur&gt; target=&lt;target&gt; age=&lt;N&gt; action=NONE status=CONDITION_NOT_MET</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : implémenter l'évaluation de cycle de vie Cloud Storage
`,
    hints: [
      'Comparez int(age_days) >= int(min_age).',
      'Affichez les sorties formatées avec statut SUCCESS ou CONDITION_NOT_MET.'
    ],
    examples: [
      {
        stdin: 'LIFECYCLE_EVAL current_class=STANDARD age_days=35 target_class=NEARLINE min_age=30',
        expected: 'LIFECYCLE: current=STANDARD target=NEARLINE age=35 action=TRANSITION_APPLIED status=SUCCESS',
        note: 'Objet âgé de 35 jours dépassant le seuil de 30 jours pour transition vers Nearline.'
      }
    ],
    tests: [
      {
        label: 'Condition d âge non atteinte',
        stdin: 'LIFECYCLE_EVAL current_class=NEARLINE age_days=60 target_class=COLDLINE min_age=90',
        expected: 'LIFECYCLE: current=NEARLINE target=COLDLINE age=60 action=NONE status=CONDITION_NOT_MET'
      },
      {
        label: 'Transition vers Archive pour objet ancien',
        stdin: 'LIFECYCLE_EVAL current_class=COLDLINE age_days=400 target_class=ARCHIVE min_age=365',
        expected: 'LIFECYCLE: current=COLDLINE target=ARCHIVE age=400 action=TRANSITION_APPLIED status=SUCCESS'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for line in lignes:
    params = {}
    for p in line.strip().split():
        if '=' in p:
            k, v = p.split('=', 1)
            params[k] = v
            
    cur = params['current_class'].upper()
    age = int(params['age_days'])
    target = params['target_class'].upper()
    min_age = int(params['min_age'])
    
    if age >= min_age:
        print(f"LIFECYCLE: current={cur} target={target} age={age} action=TRANSITION_APPLIED status=SUCCESS")
    else:
        print(f"LIFECYCLE: current={cur} target={target} age={age} action=NONE status=CONDITION_NOT_MET")
`
  },
  {
    id: 'gcp3-c5-e2',
    chapter: 5,
    title: 'Sélecteur d\'Architecture de Données GCP (Decision Matrix)',
    level: 'n2',
    language: 'python',
    goal: 'Déterminer le service de stockage ou de base de données Google Cloud optimal selon le modèle de données, l\'échelle et les contraintes de latence.',
    brief: `<p>Google Cloud propose une vaste gamme de moteurs de persistance de données :<br>
Matrice de décision :<br>
- <code>model=RELATIONAL scale=GLOBAL acid=STRICT</code> -&gt; <code>service=Cloud_Spanner type=NEW_SQL sla=99.999%</code><br>
- <code>model=RELATIONAL scale=REGIONAL</code> -&gt; <code>service=Cloud_SQL type=RDBMS sla=99.95%</code><br>
- <code>model=NOSQL_DOCUMENT</code> -&gt; <code>service=Firestore type=DOCUMENT_DB latency=LOW</code><br>
- <code>model=NOSQL_WIDE_COLUMN latency=SUB_MILLISECOND</code> -&gt; <code>service=Cloud_Bigtable type=WIDE_COLUMN usecase=IOT_ANALYTICS</code><br>
- <code>model=OBJECT_STORAGE</code> -&gt; <code>service=Cloud_Storage type=BLOB_STORE scale=EXABYTE</code><br><br>
Commande STDIN :<br>
<code>SELECT_DB model=&lt;model&gt; scale=&lt;scale&gt; latency=&lt;lat&gt; acid=&lt;acid&gt;</code>.<br>
Sortie :<br>
<code>RECOMMENDATION: service=&lt;name&gt; &lt;attributs...&gt;</code> (ou <code>RECOMMENDATION: status=UNKNOWN_COMBINATION</code>).</p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : implémenter la matrice de décision de stockage GCP
`,
    hints: [
      'Vérifiez d abord si model == "RELATIONAL" : différenciez selon scale == "GLOBAL" et acid == "STRICT" vs scale == "REGIONAL".',
      'Testez ensuite "NOSQL_DOCUMENT", "NOSQL_WIDE_COLUMN" et "OBJECT_STORAGE".'
    ],
    examples: [
      {
        stdin: 'SELECT_DB model=RELATIONAL scale=GLOBAL latency=STANDARD acid=STRICT',
        expected: 'RECOMMENDATION: service=Cloud_Spanner type=NEW_SQL sla=99.999%',
        note: 'Base NewSQL mondiale avec cohérence stricte ACID et haute disponibilité.'
      }
    ],
    tests: [
      {
        label: 'Base relationnelle régionale Cloud SQL',
        stdin: 'SELECT_DB model=RELATIONAL scale=REGIONAL latency=STANDARD acid=STRICT',
        expected: 'RECOMMENDATION: service=Cloud_SQL type=RDBMS sla=99.95%'
      },
      {
        label: 'Base NoSQL large-colonne ultra-faible latence Bigtable',
        stdin: 'SELECT_DB model=NOSQL_WIDE_COLUMN scale=REGIONAL latency=SUB_MILLISECOND acid=EVENTUAL',
        expected: 'RECOMMENDATION: service=Cloud_Bigtable type=WIDE_COLUMN usecase=IOT_ANALYTICS'
      },
      {
        label: 'Base documentaire NoSQL Firestore',
        stdin: 'SELECT_DB model=NOSQL_DOCUMENT scale=REGIONAL latency=LOW acid=STRICT',
        expected: 'RECOMMENDATION: service=Firestore type=DOCUMENT_DB latency=LOW'
      },
      {
        label: 'Stockage d objets non structurés Cloud Storage',
        stdin: 'SELECT_DB model=OBJECT_STORAGE scale=GLOBAL latency=STANDARD acid=STRICT',
        expected: 'RECOMMENDATION: service=Cloud_Storage type=BLOB_STORE scale=EXABYTE'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for line in lignes:
    params = {}
    for p in line.strip().split():
        if '=' in p:
            k, v = p.split('=', 1)
            params[k.upper()] = v.upper()
            
    m = params.get('MODEL', '')
    scale = params.get('SCALE', '')
    lat = params.get('LATENCY', '')
    acid = params.get('ACID', '')
    
    if m == 'RELATIONAL' and scale == 'GLOBAL' and acid == 'STRICT':
        print("RECOMMENDATION: service=Cloud_Spanner type=NEW_SQL sla=99.999%")
    elif m == 'RELATIONAL' and scale == 'REGIONAL':
        print("RECOMMENDATION: service=Cloud_SQL type=RDBMS sla=99.95%")
    elif m == 'NOSQL_DOCUMENT':
        print("RECOMMENDATION: service=Firestore type=DOCUMENT_DB latency=LOW")
    elif m == 'NOSQL_WIDE_COLUMN' and lat == 'SUB_MILLISECOND':
        print("RECOMMENDATION: service=Cloud_Bigtable type=WIDE_COLUMN usecase=IOT_ANALYTICS")
    elif m == 'OBJECT_STORAGE':
        print("RECOMMENDATION: service=Cloud_Storage type=BLOB_STORE scale=EXABYTE")
    else:
        print("RECOMMENDATION: status=UNKNOWN_COMBINATION")
`
  },
  {
    id: 'gcp3-c5-e3',
    chapter: 5,
    title: 'Simulateur de Pipeline d\'Ingestion Cloud Pub/Sub (Topics & Subscriptions)',
    level: 'n3',
    language: 'python',
    goal: 'Simuler le cycle de publication, de délivrance et d\'acquittement de messages dans Google Cloud Pub/Sub.',
    brief: `<p>Google Cloud Pub/Sub est le service d'ingestion et de messagerie asynchrone haute cadence mondial :<br><br>
Commandes lues sur STDIN :<br>
1. <code>CREATE_SUB sub=&lt;nom&gt; ack_deadline=&lt;sec&gt;</code> :<br>
   Enregistre un abonnement avec un délai maximal d'acquittement <code>ack_deadline</code> (ex: 10s).<br>
   Affiche <code>SUB_READY: name=&lt;nom&gt; ack_deadline=&lt;sec&gt;s</code>.<br>
2. <code>DELIVER_MSG sub=&lt;nom&gt; msg_id=&lt;id&gt; elapsed_time=&lt;sec&gt;</code> :<br>
   - Si <code>elapsed_time &lt;= ack_deadline</code> :<br>
     <code>DELIVERY: sub=&lt;nom&gt; msg_id=&lt;id&gt; status=ACKNOWLEDGED action=REMOVED_FROM_QUEUE</code><br>
   - Si <code>elapsed_time &gt; ack_deadline</code> :<br>
     <code>DELIVERY: sub=&lt;nom&gt; msg_id=&lt;id&gt; status=DEADLINE_EXCEEDED action=REDELIVERED_TO_CONSUMER</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : implémenter le gestionnaire Pub/Sub
`,
    hints: [
      'Stockez les abonnements dans un dictionnaire sub_name -> int(ack_deadline).',
      'Comparez int(elapsed_time) <= ack_deadline pour valider l acquittement.'
    ],
    examples: [
      {
        stdin: `CREATE_SUB sub=order-processor ack_deadline=10
DELIVER_MSG sub=order-processor msg_id=ORD-999 elapsed_time=6
DELIVER_MSG sub=order-processor msg_id=ORD-1000 elapsed_time=14`,
        expected: `SUB_READY: name=order-processor ack_deadline=10s
DELIVERY: sub=order-processor msg_id=ORD-999 status=ACKNOWLEDGED action=REMOVED_FROM_QUEUE
DELIVERY: sub=order-processor msg_id=ORD-1000 status=DEADLINE_EXCEEDED action=REDELIVERED_TO_CONSUMER`,
        note: 'Le message 999 est acquitté en 6s (conforme) ; le message 1000 dépasse la deadline (réexpédié).'
      }
    ],
    tests: [
      {
        label: 'Acquittement exact à la limite de la deadline',
        stdin: `CREATE_SUB sub=analytics-sink ack_deadline=30
DELIVER_MSG sub=analytics-sink msg_id=LOG-1 elapsed_time=30`,
        expected: `SUB_READY: name=analytics-sink ack_deadline=30s
DELIVERY: sub=analytics-sink msg_id=LOG-1 status=ACKNOWLEDGED action=REMOVED_FROM_QUEUE`
      },
      {
        label: 'Abonnement inconnu',
        stdin: 'DELIVER_MSG sub=unknown-sub msg_id=MSG-1 elapsed_time=5',
        expected: 'DELIVERY: sub=unknown-sub status=ERROR_SUBSCRIPTION_NOT_FOUND'
      }
    ],
    solution: `import sys

subs = {}
lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for line in lignes:
    parts = line.strip().split()
    cmd = parts[0]
    params = {}
    for p in parts[1:]:
        if '=' in p:
            k, v = p.split('=', 1)
            params[k] = v
            
    if cmd == 'CREATE_SUB':
        name = params['sub']
        deadline = int(params['ack_deadline'])
        subs[name] = deadline
        print(f"SUB_READY: name={name} ack_deadline={deadline}s")
        
    elif cmd == 'DELIVER_MSG':
        name = params['sub']
        msg_id = params['msg_id']
        elapsed = int(params['elapsed_time'])
        
        if name in subs:
            deadline = subs[name]
            if elapsed <= deadline:
                print(f"DELIVERY: sub={name} msg_id={msg_id} status=ACKNOWLEDGED action=REMOVED_FROM_QUEUE")
            else:
                print(f"DELIVERY: sub={name} msg_id={msg_id} status=DEADLINE_EXCEEDED action=REDELIVERED_TO_CONSUMER")
        else:
            print(f"DELIVERY: sub={name} status=ERROR_SUBSCRIPTION_NOT_FOUND")
`
  }
];
