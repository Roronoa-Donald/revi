/**
 * server/exercises/b3-cloud-aws/chapitre6.js — Exercices du Chapitre 6
 * Chapitre 6 : Serverless, Observabilité, Supervision & Automatisation (Lambda, CloudWatch, SQS, SNS)
 */

module.exports = [
  {
    id: 'aws3-c6-e1',
    chapter: 6,
    title: 'Calculateur de Coûts Serverless AWS Lambda (Go-secondes & Requêtes)',
    level: 'n1',
    language: 'python',
    goal: 'Calculer la facture mensuelle d\'une fonction AWS Lambda selon sa mémoire allouée, sa durée d\'exécution et le nombre d\'invocations.',
    brief: `<p>Le modèle de tarification d\'<strong>AWS Lambda</strong> repose sur deux axes :<br><br>
1. <strong>Coût des requêtes</strong> : 0.20 $ par million de requêtes (soit <code>0.0000002 $</code> par requête).<br>
2. <strong>Coût de calcul (Go-secondes)</strong> :<br>
La mémoire (ex: 512 MB) est convertie en Go : <code>Go = Memory_MB / 1024.0</code>.<br>
La durée en ms est convertie en secondes : <code>Secondes = Duration_MS / 1000.0</code>.<br>
<code>Go_Secondes = Requetes * Go * Secondes</code>.<br>
Tarif unitaire de calcul : <code>0.0000166667 $</code> par Go-seconde (architecture x86).<br><br>
3. <strong>AWS Free Tier (Optionnel)</strong> :<br>
Si <code>FREE_TIER=YES</code>, déduire chaque mois :<br>
- 1 000 000 de requêtes gratuites (minimum facturé 0).<br>
- 400 000 Go-secondes gratuites (minimum facturé 0).<br><br>
Entrée STDIN :<br>
<code>LAMBDA_COST REQS=&lt;n&gt; DURATION_MS=&lt;ms&gt; MEM_MB=&lt;mb&gt; FREE_TIER=&lt;YES|NO&gt;</code>.<br><br>
Sortie :<br>
<code>LAMBDA_BILL: gb_seconds=&lt;gbs:.2f&gt; req_cost=&lt;rc:.4f&gt;$ compute_cost=&lt;cc:.4f&gt;$ total_cost=&lt;tot:.2f&gt;$</code>.</p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer la facturation AWS Lambda
`,
    hints: [
      "Analysez scrupuleusement le format d'entrée STDIN.",
      "Respectez la casse et les séparateurs attendus en sortie."
    ],
    examples: [
      {
        stdin: 'LAMBDA_COST REQS=5000000 DURATION_MS=200 MEM_MB=512 FREE_TIER=NO',
        expected: 'LAMBDA_BILL: gb_seconds=500000.00 req_cost=1.0000$ compute_cost=8.3334$ total_cost=9.33$',
        note: "Cas d'usage nominal."
      }
    ],
    tests: [
      {
        label: 'Fonction avec AWS Free Tier déduit',
        stdin: 'LAMBDA_COST REQS=5000000 DURATION_MS=200 MEM_MB=512 FREE_TIER=YES',
        expected: 'LAMBDA_BILL: gb_seconds=100000.00 req_cost=0.8000$ compute_cost=1.6667$ total_cost=2.47$\n'
      },
      {
        label: 'Faible volume couvert à 100% par le Free Tier',
        stdin: 'LAMBDA_COST REQS=500000 DURATION_MS=100 MEM_MB=128 FREE_TIER=YES',
        expected: 'LAMBDA_BILL: gb_seconds=0.00 req_cost=0.0000$ compute_cost=0.0000$ total_cost=0.00$\n'
      },
      {
        label: 'Micro-service intensif haute mémoire (2048 MB sans Free Tier)',
        stdin: 'LAMBDA_COST REQS=10000000 DURATION_MS=500 MEM_MB=2048 FREE_TIER=NO',
        expected: 'LAMBDA_BILL: gb_seconds=10000000.00 req_cost=2.0000$ compute_cost=166.6670$ total_cost=168.67$\n'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

REQ_PRICE = 0.20 / 1000000.0
COMPUTE_PRICE = 0.0000166667

for ligne in lignes:
    if not ligne.startswith("LAMBDA_COST "):
        continue
    tokens = ligne.split()
    params = {}
    for t in tokens[1:]:
        if "=" in t:
            k, v = t.split("=", 1)
            params[k.upper()] = v

    reqs = int(params.get("REQS", "0"))
    dur_ms = float(params.get("DURATION_MS", "0"))
    mem_mb = float(params.get("MEM_MB", "128"))
    free_tier = params.get("FREE_TIER", "NO").upper() == "YES"

    raw_gbs = reqs * (mem_mb / 1024.0) * (dur_ms / 1000.0)

    billable_reqs = reqs
    billable_gbs = raw_gbs

    if free_tier:
        billable_reqs = max(0, reqs - 1000000)
        billable_gbs = max(0.0, raw_gbs - 400000.0)

    req_cost = billable_reqs * REQ_PRICE
    compute_cost = billable_gbs * COMPUTE_PRICE
    total_cost = req_cost + compute_cost

    print(f"LAMBDA_BILL: gb_seconds={billable_gbs:.2f} req_cost={req_cost:.4f}$ compute_cost={compute_cost:.4f}$ total_cost={total_cost:.2f}$")
`
  },
  {
    id: 'aws3-c6-e2',
    chapter: 6,
    title: 'Analyseur de Métriques & Détecteur d\'Alarmes Amazon CloudWatch',
    level: 'n2',
    language: 'python',
    goal: 'Évaluer l\'état d\'une alarme CloudWatch (OK, ALARM, INSUFFICIENT_DATA) selon la règle des N points de données consécutifs.',
    brief: `<p>Une <strong>alarme Amazon CloudWatch</strong> surveille une métrique (ex: CPUUtilization) :<br><br>
Règles d'évaluation :<br>
1. <code>OPERATOR</code> :<br>
- <code>GREATER_EQUAL</code> : un point est en infraction si <code>valeur &gt;= THRESHOLD</code>.<br>
- <code>LESS_EQUAL</code> : un point est en infraction si <code>valeur &lt;= THRESHOLD</code>.<br>
2. <code>PERIODS</code> : Nombre de points consécutifs récents nécessaires pour déclencher l'alarme.<br>
3. États de l'alarme :<br>
- Si le nombre de points disponibles est inférieur à <code>PERIODS</code> -> <code>INSUFFICIENT_DATA</code>.<br>
- Si les <code>PERIODS</code> derniers points sont TOUS en infraction -> <code>ALARM</code>.<br>
- Sinon -> <code>OK</code>.<br><br>
Entrée STDIN :<br>
<code>CW_ALARM METRIC=&lt;nom&gt; THRESHOLD=&lt;t&gt; OP=&lt;GREATER_EQUAL|LESS_EQUAL&gt; PERIODS=&lt;n&gt; POINTS=&lt;p1,p2,...&gt;</code>.<br><br>
Sortie : <code>ALARM_VERDICT: metric=&lt;nom&gt; state=&lt;OK|ALARM|INSUFFICIENT_DATA&gt; evaluated_points=&lt;pts&gt;</code>.</p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : évaluer l'état de l'alarme CloudWatch
`,
    hints: [
      "Analysez scrupuleusement le format d'entrée STDIN.",
      "Respectez la casse et les séparateurs attendus en sortie."
    ],
    examples: [
      {
        stdin: 'CW_ALARM METRIC=CPUUtilization THRESHOLD=80.0 OP=GREATER_EQUAL PERIODS=3 POINTS=45.0,78.0,85.0,88.0,92.0',
        expected: 'ALARM_VERDICT: metric=CPUUtilization state=ALARM evaluated_points=85.0,88.0,92.0',
        note: "Cas d'usage nominal."
      }
    ],
    tests: [
      {
        label: 'Alarme en état OK (le dernier point est repassé sous le seuil)',
        stdin: 'CW_ALARM METRIC=CPUUtilization THRESHOLD=80.0 OP=GREATER_EQUAL PERIODS=3 POINTS=85.0,88.0,75.0',
        expected: 'ALARM_VERDICT: metric=CPUUtilization state=OK evaluated_points=85.0,88.0,75.0\n'
      },
      {
        label: 'Données insuffisantes (2 points disponibles pour une période de 3)',
        stdin: 'CW_ALARM METRIC=DatabaseConnections THRESHOLD=50.0 OP=GREATER_EQUAL PERIODS=3 POINTS=90.0,95.0',
        expected: 'ALARM_VERDICT: metric=DatabaseConnections state=INSUFFICIENT_DATA evaluated_points=90.0,95.0\n'
      },
      {
        label: 'Alarme sur seuil inférieur (Espace disque libre <= 10%)',
        stdin: 'CW_ALARM METRIC=FreeDiskSpace THRESHOLD=10.0 OP=LESS_EQUAL PERIODS=2 POINTS=12.0,8.5,7.0',
        expected: 'ALARM_VERDICT: metric=FreeDiskSpace state=ALARM evaluated_points=8.5,7.0\n'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for ligne in lignes:
    if not ligne.startswith("CW_ALARM "):
        continue
    tokens = ligne.split()
    params = {}
    for t in tokens[1:]:
        if "=" in t:
            k, v = t.split("=", 1)
            params[k.upper()] = v

    metric = params.get("METRIC", "")
    threshold = float(params.get("THRESHOLD", "0.0"))
    op = params.get("OP", "GREATER_EQUAL").upper()
    periods = int(params.get("PERIODS", "1"))
    points = [float(x) for x in params.get("POINTS", "").split(",") if x.strip()]

    if len(points) < periods:
        state = "INSUFFICIENT_DATA"
        eval_pts = points
    else:
        eval_pts = points[-periods:]
        if op == "GREATER_EQUAL":
            breached = all(p >= threshold for p in eval_pts)
        else:  # LESS_EQUAL
            breached = all(p <= threshold for p in eval_pts)

        state = "ALARM" if breached else "OK"

    pts_str = ",".join(str(p) for p in eval_pts)
    print(f"ALARM_VERDICT: metric={metric} state={state} evaluated_points={pts_str}")
`
  },
  {
    id: 'aws3-c6-e3',
    chapter: 6,
    title: 'Simulateur de File d\'Attente Amazon SQS & Dead-Letter Queue (DLQ)',
    level: 'n3',
    language: 'python',
    goal: 'Simuler le traitement de messages SQS et l\'isolation des messages en échec vers une Dead-Letter Queue (DLQ).',
    brief: `<p>Amazon SQS permet de découpler les architectures asynchrones et gère les pannes avec une <strong>Dead-Letter Queue (DLQ)</strong> :<br><br>
Règles de cycle de vie d'un message :<br>
1. Chaque message possède un identifiant <code>id</code>, un compteur de tentatives <code>receive_count</code> et un statut de tentative de traitement <code>SUCCESS</code> ou <code>ERROR</code>.<br>
2. Si le traitement est <code>SUCCESS</code> : le message est traité avec succès et supprimé de la file (<code>PROCESSED</code>).<br>
3. Si le traitement est <code>ERROR</code> : le compteur <code>receive_count</code> est incrémenté de 1.<br>
- Si le nouveau <code>receive_count &gt;= MAX_RECEIVES</code> : le message est transféré vers la Dead-Letter Queue (<code>SENT_TO_DLQ</code>).<br>
- Sinon : le message reste dans la file principale pour une nouvelle tentative (<code>RETRY_IN_FLIGHT</code>).<br><br>
Entrée STDIN :<br>
<code>SQS_PROCESS MAX_RECEIVES=&lt;n&gt; MSGS=&lt;id:rec_count:status;...&gt;</code>.<br><br>
Sortie :<br>
<code>SQS_SUMMARY: processed=&lt;p&gt; retry_in_flight=&lt;r&gt; dlq_count=&lt;d&gt; dlq_ids=&lt;id1,id2,...|NONE&gt;</code>.</p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : simuler le traitement SQS et le routage DLQ
`,
    hints: [
      "Analysez scrupuleusement le format d'entrée STDIN.",
      "Respectez la casse et les séparateurs attendus en sortie."
    ],
    examples: [
      {
        stdin: 'SQS_PROCESS MAX_RECEIVES=3 MSGS=m1:1:SUCCESS;m2:1:ERROR;m3:2:ERROR',
        expected: 'SQS_SUMMARY: processed=1 retry_in_flight=1 dlq_count=1 dlq_ids=m3',
        note: "Cas d'usage nominal."
      }
    ],
    tests: [
      {
        label: 'Tous les messages traités avec succès',
        stdin: 'SQS_PROCESS MAX_RECEIVES=3 MSGS=msg-1:1:SUCCESS;msg-2:1:SUCCESS;msg-3:2:SUCCESS',
        expected: 'SQS_SUMMARY: processed=3 retry_in_flight=0 dlq_count=0 dlq_ids=NONE\n'
      },
      {
        label: 'Deux messages transférés vers la DLQ',
        stdin: 'SQS_PROCESS MAX_RECEIVES=3 MSGS=order-1:2:ERROR;order-2:1:ERROR;order-3:3:ERROR',
        expected: 'SQS_SUMMARY: processed=0 retry_in_flight=1 dlq_count=2 dlq_ids=order-1,order-3\n'
      },
      {
        label: 'Seuil strict de 1 tentative (échec immédiat en DLQ)',
        stdin: 'SQS_PROCESS MAX_RECEIVES=1 MSGS=job-a:0:ERROR;job-b:0:SUCCESS',
        expected: 'SQS_SUMMARY: processed=1 retry_in_flight=0 dlq_count=1 dlq_ids=job-a\n'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for ligne in lignes:
    if not ligne.startswith("SQS_PROCESS "):
        continue
    tokens = ligne.split()
    params = {}
    for t in tokens[1:]:
        if "=" in t:
            k, v = t.split("=", 1)
            params[k.upper()] = v

    max_receives = int(params.get("MAX_RECEIVES", "3"))
    raw_msgs = params.get("MSGS", "").split(";")

    processed = 0
    retry = 0
    dlq_list = []

    for item in raw_msgs:
        if not item or ":" not in item:
            continue
        msg_id, count_str, status = item.split(":", 2)
        count = int(count_str)
        status = status.strip().upper()

        if status == "SUCCESS":
            processed += 1
        else:  # ERROR
            new_count = count + 1
            if new_count >= max_receives:
                dlq_list.append(msg_id.strip())
            else:
                retry += 1

    dlq_ids_str = ",".join(dlq_list) if dlq_list else "NONE"
    print(f"SQS_SUMMARY: processed={processed} retry_in_flight={retry} dlq_count={len(dlq_list)} dlq_ids={dlq_ids_str}")
`
  }
];
