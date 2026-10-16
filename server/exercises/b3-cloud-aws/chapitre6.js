'use strict';

module.exports = [
  {
    "id": "aws3-c6-e1",
    "chapter": 6,
    "title": "Calculateur de Coûts Serverless AWS Lambda (Go-secondes & Requêtes)",
    "level": "n1",
    "language": "analyse",
    "goal": "Calculer la facture mensuelle d'une fonction AWS Lambda selon sa mémoire allouée, sa durée d'exécution et le nombre d'invocations.",
    "brief": "<p>Le modèle de tarification d'<strong>AWS Lambda</strong> repose sur deux axes :<br><br>\n1. <strong>Coût des requêtes</strong> : 0.20 $ par million de requêtes (soit <code>0.0000002 $</code> par requête).<br>\n2. <strong>Coût de calcul (Go-secondes)</strong> :<br>\nLa mémoire (ex: 512 MB) est convertie en Go : <code>Go = Memory_MB / 1024.0</code>.<br>\nLa durée en ms est convertie en secondes : <code>Secondes = Duration_MS / 1000.0</code>.<br>\n<code>Go_Secondes = Requetes * Go * Secondes</code>.<br>\nTarif unitaire de calcul : <code>0.0000166667 $</code> par Go-seconde (architecture x86).<br><br>\n3. <strong>AWS Free Tier (Optionnel)</strong> :<br>\nSi <code>FREE_TIER=YES</code>, déduire chaque mois :<br>\n- 1 000 000 de requêtes gratuites (minimum facturé 0).<br>\n- 400 000 Go-secondes gratuites (minimum facturé 0).<br><br>\nEntrée STDIN :<br>\n<code>LAMBDA_COST REQS=&lt;n&gt; DURATION_MS=&lt;ms&gt; MEM_MB=&lt;mb&gt; FREE_TIER=&lt;YES|NO&gt;</code>.<br><br>\nSortie :<br>\n<code>LAMBDA_BILL: gb_seconds=&lt;gbs:.2f&gt; req_cost=&lt;rc:.4f&gt;$ compute_cost=&lt;cc:.4f&gt;$ total_cost=&lt;tot:.2f&gt;$</code>.</p>",
    "starter": "# Grille d'analyse (aws3-c6-e1) — Calculateur de Coûts Serverless AWS Lambda (Go-secondes & Requêtes)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Fonction avec AWS Free Tier déduit]\n# Données : LAMBDA_COST REQS=5000000 DURATION_MS=200 MEM_MB=512 FREE_TIER=YES\nA_COMPLETER\n\n[Cas 2 — Faible volume couvert à 100% par le Free Tier]\n# Données : LAMBDA_COST REQS=500000 DURATION_MS=100 MEM_MB=128 FREE_TIER=YES\nA_COMPLETER\n\n[Cas 3 — Micro-service intensif haute mémoire (2048 MB sans Free Tier)]\n# Données : LAMBDA_COST REQS=10000000 DURATION_MS=500 MEM_MB=2048 FREE_TIER=NO\nA_COMPLETER\n",
    "hints": [
      "Analysez scrupuleusement le format d'entrée STDIN.",
      "Respectez la casse et les séparateurs attendus en sortie."
    ],
    "examples": [
      {
        "stdin": "LAMBDA_COST REQS=5000000 DURATION_MS=200 MEM_MB=512 FREE_TIER=NO",
        "expected": "LAMBDA_BILL: gb_seconds=500000.00 req_cost=1.0000$ compute_cost=8.3334$ total_cost=9.33$",
        "note": "Cas d'usage nominal."
      }
    ],
    "tests": [
      {
        "label": "Fonction avec AWS Free Tier déduit",
        "stdin": "cas:1",
        "expected": "LAMBDA_BILL: gb_seconds=100000.00 req_cost=0.8000$ compute_cost=1.6667$ total_cost=2.47$\n"
      },
      {
        "label": "Faible volume couvert à 100% par le Free Tier",
        "stdin": "cas:2",
        "expected": "LAMBDA_BILL: gb_seconds=0.00 req_cost=0.0000$ compute_cost=0.0000$ total_cost=0.00$\n"
      },
      {
        "label": "Micro-service intensif haute mémoire (2048 MB sans Free Tier)",
        "stdin": "cas:3",
        "expected": "LAMBDA_BILL: gb_seconds=10000000.00 req_cost=2.0000$ compute_cost=166.6670$ total_cost=168.67$\n"
      }
    ],
    "solution": "[Exemple]\nLAMBDA_BILL: gb_seconds=500000.00 req_cost=1.0000$ compute_cost=8.3334$ total_cost=9.33$\n\n[Cas 1 — Fonction avec AWS Free Tier déduit]\nLAMBDA_BILL: gb_seconds=100000.00 req_cost=0.8000$ compute_cost=1.6667$ total_cost=2.47$\n\n\n[Cas 2 — Faible volume couvert à 100% par le Free Tier]\nLAMBDA_BILL: gb_seconds=0.00 req_cost=0.0000$ compute_cost=0.0000$ total_cost=0.00$\n\n\n[Cas 3 — Micro-service intensif haute mémoire (2048 MB sans Free Tier)]\nLAMBDA_BILL: gb_seconds=10000000.00 req_cost=2.0000$ compute_cost=166.6670$ total_cost=168.67$"
  },
  {
    "id": "aws3-c6-e2",
    "chapter": 6,
    "title": "Analyseur de Métriques & Détecteur d'Alarmes Amazon CloudWatch",
    "level": "n2",
    "language": "analyse",
    "goal": "Évaluer l'état d'une alarme CloudWatch (OK, ALARM, INSUFFICIENT_DATA) selon la règle des N points de données consécutifs.",
    "brief": "<p>Une <strong>alarme Amazon CloudWatch</strong> surveille une métrique (ex: CPUUtilization) :<br><br>\nRègles d'évaluation :<br>\n1. <code>OPERATOR</code> :<br>\n- <code>GREATER_EQUAL</code> : un point est en infraction si <code>valeur &gt;= THRESHOLD</code>.<br>\n- <code>LESS_EQUAL</code> : un point est en infraction si <code>valeur &lt;= THRESHOLD</code>.<br>\n2. <code>PERIODS</code> : Nombre de points consécutifs récents nécessaires pour déclencher l'alarme.<br>\n3. États de l'alarme :<br>\n- Si le nombre de points disponibles est inférieur à <code>PERIODS</code> -> <code>INSUFFICIENT_DATA</code>.<br>\n- Si les <code>PERIODS</code> derniers points sont TOUS en infraction -> <code>ALARM</code>.<br>\n- Sinon -> <code>OK</code>.<br><br>\nEntrée STDIN :<br>\n<code>CW_ALARM METRIC=&lt;nom&gt; THRESHOLD=&lt;t&gt; OP=&lt;GREATER_EQUAL|LESS_EQUAL&gt; PERIODS=&lt;n&gt; POINTS=&lt;p1,p2,...&gt;</code>.<br><br>\nSortie : <code>ALARM_VERDICT: metric=&lt;nom&gt; state=&lt;OK|ALARM|INSUFFICIENT_DATA&gt; evaluated_points=&lt;pts&gt;</code>.</p>",
    "starter": "# Grille d'analyse (aws3-c6-e2) — Analyseur de Métriques & Détecteur d'Alarmes Amazon CloudWatch\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Alarme en état OK (le dernier point est repassé sous le seuil)]\n# Données : CW_ALARM METRIC=CPUUtilization THRESHOLD=80.0 OP=GREATER_EQUAL PERIODS=3 POINTS=85.0,88.0,75.0\nA_COMPLETER\n\n[Cas 2 — Données insuffisantes (2 points disponibles pour une période de 3)]\n# Données : CW_ALARM METRIC=DatabaseConnections THRESHOLD=50.0 OP=GREATER_EQUAL PERIODS=3 POINTS=90.0,95.0\nA_COMPLETER\n\n[Cas 3 — Alarme sur seuil inférieur (Espace disque libre <= 10%)]\n# Données : CW_ALARM METRIC=FreeDiskSpace THRESHOLD=10.0 OP=LESS_EQUAL PERIODS=2 POINTS=12.0,8.5,7.0\nA_COMPLETER\n",
    "hints": [
      "Analysez scrupuleusement le format d'entrée STDIN.",
      "Respectez la casse et les séparateurs attendus en sortie."
    ],
    "examples": [
      {
        "stdin": "CW_ALARM METRIC=CPUUtilization THRESHOLD=80.0 OP=GREATER_EQUAL PERIODS=3 POINTS=45.0,78.0,85.0,88.0,92.0",
        "expected": "ALARM_VERDICT: metric=CPUUtilization state=ALARM evaluated_points=85.0,88.0,92.0",
        "note": "Cas d'usage nominal."
      }
    ],
    "tests": [
      {
        "label": "Alarme en état OK (le dernier point est repassé sous le seuil)",
        "stdin": "cas:1",
        "expected": "ALARM_VERDICT: metric=CPUUtilization state=OK evaluated_points=85.0,88.0,75.0\n"
      },
      {
        "label": "Données insuffisantes (2 points disponibles pour une période de 3)",
        "stdin": "cas:2",
        "expected": "ALARM_VERDICT: metric=DatabaseConnections state=INSUFFICIENT_DATA evaluated_points=90.0,95.0\n"
      },
      {
        "label": "Alarme sur seuil inférieur (Espace disque libre <= 10%)",
        "stdin": "cas:3",
        "expected": "ALARM_VERDICT: metric=FreeDiskSpace state=ALARM evaluated_points=8.5,7.0\n"
      }
    ],
    "solution": "[Exemple]\nALARM_VERDICT: metric=CPUUtilization state=ALARM evaluated_points=85.0,88.0,92.0\n\n[Cas 1 — Alarme en état OK (le dernier point est repassé sous le seuil)]\nALARM_VERDICT: metric=CPUUtilization state=OK evaluated_points=85.0,88.0,75.0\n\n\n[Cas 2 — Données insuffisantes (2 points disponibles pour une période de 3)]\nALARM_VERDICT: metric=DatabaseConnections state=INSUFFICIENT_DATA evaluated_points=90.0,95.0\n\n\n[Cas 3 — Alarme sur seuil inférieur (Espace disque libre <= 10%)]\nALARM_VERDICT: metric=FreeDiskSpace state=ALARM evaluated_points=8.5,7.0"
  },
  {
    "id": "aws3-c6-e3",
    "chapter": 6,
    "title": "Simulateur de File d'Attente Amazon SQS & Dead-Letter Queue (DLQ)",
    "level": "n3",
    "language": "analyse",
    "goal": "Simuler le traitement de messages SQS et l'isolation des messages en échec vers une Dead-Letter Queue (DLQ).",
    "brief": "<p>Amazon SQS permet de découpler les architectures asynchrones et gère les pannes avec une <strong>Dead-Letter Queue (DLQ)</strong> :<br><br>\nRègles de cycle de vie d'un message :<br>\n1. Chaque message possède un identifiant <code>id</code>, un compteur de tentatives <code>receive_count</code> et un statut de tentative de traitement <code>SUCCESS</code> ou <code>ERROR</code>.<br>\n2. Si le traitement est <code>SUCCESS</code> : le message est traité avec succès et supprimé de la file (<code>PROCESSED</code>).<br>\n3. Si le traitement est <code>ERROR</code> : le compteur <code>receive_count</code> est incrémenté de 1.<br>\n- Si le nouveau <code>receive_count &gt;= MAX_RECEIVES</code> : le message est transféré vers la Dead-Letter Queue (<code>SENT_TO_DLQ</code>).<br>\n- Sinon : le message reste dans la file principale pour une nouvelle tentative (<code>RETRY_IN_FLIGHT</code>).<br><br>\nEntrée STDIN :<br>\n<code>SQS_PROCESS MAX_RECEIVES=&lt;n&gt; MSGS=&lt;id:rec_count:status;...&gt;</code>.<br><br>\nSortie :<br>\n<code>SQS_SUMMARY: processed=&lt;p&gt; retry_in_flight=&lt;r&gt; dlq_count=&lt;d&gt; dlq_ids=&lt;id1,id2,...|NONE&gt;</code>.</p>",
    "starter": "# Grille d'analyse (aws3-c6-e3) — Simulateur de File d'Attente Amazon SQS & Dead-Letter Queue (DLQ)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Tous les messages traités avec succès]\n# Données : SQS_PROCESS MAX_RECEIVES=3 MSGS=msg-1:1:SUCCESS;msg-2:1:SUCCESS;msg-3:2:SUCCESS\nA_COMPLETER\n\n[Cas 2 — Deux messages transférés vers la DLQ]\n# Données : SQS_PROCESS MAX_RECEIVES=3 MSGS=order-1:2:ERROR;order-2:1:ERROR;order-3:3:ERROR\nA_COMPLETER\n\n[Cas 3 — Seuil strict de 1 tentative (échec immédiat en DLQ)]\n# Données : SQS_PROCESS MAX_RECEIVES=1 MSGS=job-a:0:ERROR;job-b:0:SUCCESS\nA_COMPLETER\n",
    "hints": [
      "Analysez scrupuleusement le format d'entrée STDIN.",
      "Respectez la casse et les séparateurs attendus en sortie."
    ],
    "examples": [
      {
        "stdin": "SQS_PROCESS MAX_RECEIVES=3 MSGS=m1:1:SUCCESS;m2:1:ERROR;m3:2:ERROR",
        "expected": "SQS_SUMMARY: processed=1 retry_in_flight=1 dlq_count=1 dlq_ids=m3",
        "note": "Cas d'usage nominal."
      }
    ],
    "tests": [
      {
        "label": "Tous les messages traités avec succès",
        "stdin": "cas:1",
        "expected": "SQS_SUMMARY: processed=3 retry_in_flight=0 dlq_count=0 dlq_ids=NONE\n"
      },
      {
        "label": "Deux messages transférés vers la DLQ",
        "stdin": "cas:2",
        "expected": "SQS_SUMMARY: processed=0 retry_in_flight=1 dlq_count=2 dlq_ids=order-1,order-3\n"
      },
      {
        "label": "Seuil strict de 1 tentative (échec immédiat en DLQ)",
        "stdin": "cas:3",
        "expected": "SQS_SUMMARY: processed=1 retry_in_flight=0 dlq_count=1 dlq_ids=job-a\n"
      }
    ],
    "solution": "[Exemple]\nSQS_SUMMARY: processed=1 retry_in_flight=1 dlq_count=1 dlq_ids=m3\n\n[Cas 1 — Tous les messages traités avec succès]\nSQS_SUMMARY: processed=3 retry_in_flight=0 dlq_count=0 dlq_ids=NONE\n\n\n[Cas 2 — Deux messages transférés vers la DLQ]\nSQS_SUMMARY: processed=0 retry_in_flight=1 dlq_count=2 dlq_ids=order-1,order-3\n\n\n[Cas 3 — Seuil strict de 1 tentative (échec immédiat en DLQ)]\nSQS_SUMMARY: processed=1 retry_in_flight=0 dlq_count=1 dlq_ids=job-a"
  }
];
