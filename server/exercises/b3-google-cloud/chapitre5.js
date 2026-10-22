'use strict';

module.exports = [
  {
    "id": "gcp3-c5-e1",
    "chapter": 5,
    "title": "Moteur de Transition de Cycle de Vie Cloud Storage (Lifecycle Management)",
    "level": "n1",
    "language": "analyse",
    "goal": "Simuler les règles d'archivage et de transition automatique de classes d'objets dans Google Cloud Storage.",
    "brief": "<p>Google Cloud Storage propose 4 classes de stockage à coûts décroissants :<br>\n- <code>STANDARD</code> : accès chaud fréquent (durée minimale 0 jour)<br>\n- <code>NEARLINE</code> : consultation mensuelle (durée minimale 30 jours)<br>\n- <code>COLDLINE</code> : consultation trimestrielle (durée minimale 90 jours)<br>\n- <code>ARCHIVE</code> : archivage à long terme (durée minimale 365 jours)<br><br>\nParamètres soumis à l’analyse :<br>\n<code>LIFECYCLE_EVAL current_class=&lt;class&gt; age_days=&lt;N&gt; target_class=&lt;class&gt; min_age=&lt;M&gt;</code>.<br>\nRésultats d’analyse attendus :<br>\n- Si <code>age_days &gt;= min_age</code> :<br>\n  <code>LIFECYCLE: current=&lt;cur&gt; target=&lt;target&gt; age=&lt;N&gt; action=TRANSITION_APPLIED status=SUCCESS</code><br>\n- Sinon :<br>\n  <code>LIFECYCLE: current=&lt;cur&gt; target=&lt;target&gt; age=&lt;N&gt; action=NONE status=CONDITION_NOT_MET</code></p>",
    "starter": "# Grille d'analyse (gcp3-c5-e1) — Moteur de Transition de Cycle de Vie Cloud Storage (Lifecycle Management)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Condition d âge non atteinte]\n# Données : LIFECYCLE_EVAL current_class=NEARLINE age_days=60 target_class=COLDLINE min_age=90\nA_COMPLETER\n\n[Cas 2 — Transition vers Archive pour objet ancien]\n# Données : LIFECYCLE_EVAL current_class=COLDLINE age_days=400 target_class=ARCHIVE min_age=365\nA_COMPLETER\n",
    "hints": [
      "Comparez int(age_days) >= int(min_age).",
      "Affichez les sorties formatées avec statut SUCCESS ou CONDITION_NOT_MET."
    ],
    "examples": [
      {
        "stdin": "LIFECYCLE_EVAL current_class=STANDARD age_days=35 target_class=NEARLINE min_age=30",
        "expected": "LIFECYCLE: current=STANDARD target=NEARLINE age=35 action=TRANSITION_APPLIED status=SUCCESS",
        "note": "Objet âgé de 35 jours dépassant le seuil de 30 jours pour transition vers Nearline."
      }
    ],
    "tests": [
      {
        "label": "Condition d âge non atteinte",
        "stdin": "cas:1",
        "expected": "LIFECYCLE: current=NEARLINE target=COLDLINE age=60 action=NONE status=CONDITION_NOT_MET"
      },
      {
        "label": "Transition vers Archive pour objet ancien",
        "stdin": "cas:2",
        "expected": "LIFECYCLE: current=COLDLINE target=ARCHIVE age=400 action=TRANSITION_APPLIED status=SUCCESS"
      }
    ],
    "solution": "[Exemple]\nLIFECYCLE: current=STANDARD target=NEARLINE age=35 action=TRANSITION_APPLIED status=SUCCESS\n\n[Cas 1 — Condition d âge non atteinte]\nLIFECYCLE: current=NEARLINE target=COLDLINE age=60 action=NONE status=CONDITION_NOT_MET\n\n[Cas 2 — Transition vers Archive pour objet ancien]\nLIFECYCLE: current=COLDLINE target=ARCHIVE age=400 action=TRANSITION_APPLIED status=SUCCESS"
  },
  {
    "id": "gcp3-c5-e2",
    "chapter": 5,
    "title": "Sélecteur d'Architecture de Données GCP (Decision Matrix)",
    "level": "n2",
    "language": "analyse",
    "goal": "Déterminer le service de stockage ou de base de données Google Cloud optimal selon le modèle de données, l'échelle et les contraintes de latence.",
    "brief": "<p>Google Cloud propose une vaste gamme de moteurs de persistance de données :<br>\nMatrice de décision :<br>\n- <code>model=RELATIONAL scale=GLOBAL acid=STRICT</code> -&gt; <code>service=Cloud_Spanner type=NEW_SQL sla=99.999%</code><br>\n- <code>model=RELATIONAL scale=REGIONAL</code> -&gt; <code>service=Cloud_SQL type=RDBMS sla=99.95%</code><br>\n- <code>model=NOSQL_DOCUMENT</code> -&gt; <code>service=Firestore type=DOCUMENT_DB latency=LOW</code><br>\n- <code>model=NOSQL_WIDE_COLUMN latency=SUB_MILLISECOND</code> -&gt; <code>service=Cloud_Bigtable type=WIDE_COLUMN usecase=IOT_ANALYTICS</code><br>\n- <code>model=OBJECT_STORAGE</code> -&gt; <code>service=Cloud_Storage type=BLOB_STORE scale=EXABYTE</code><br><br>\nParamètres soumis à l’analyse :<br>\n<code>SELECT_DB model=&lt;model&gt; scale=&lt;scale&gt; latency=&lt;lat&gt; acid=&lt;acid&gt;</code>.<br>\nRésultat d’analyse attendu :<br>\n<code>RECOMMENDATION: service=&lt;name&gt; &lt;attributs...&gt;</code> (ou <code>RECOMMENDATION: status=UNKNOWN_COMBINATION</code>).</p>",
    "starter": "# Grille d'analyse (gcp3-c5-e2) — Sélecteur d'Architecture de Données GCP (Decision Matrix)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Base relationnelle régionale Cloud SQL]\n# Données : SELECT_DB model=RELATIONAL scale=REGIONAL latency=STANDARD acid=STRICT\nA_COMPLETER\n\n[Cas 2 — Base NoSQL large-colonne ultra-faible latence Bigtable]\n# Données : SELECT_DB model=NOSQL_WIDE_COLUMN scale=REGIONAL latency=SUB_MILLISECOND acid=EVENTUAL\nA_COMPLETER\n\n[Cas 3 — Base documentaire NoSQL Firestore]\n# Données : SELECT_DB model=NOSQL_DOCUMENT scale=REGIONAL latency=LOW acid=STRICT\nA_COMPLETER\n\n[Cas 4 — Stockage d objets non structurés Cloud Storage]\n# Données : SELECT_DB model=OBJECT_STORAGE scale=GLOBAL latency=STANDARD acid=STRICT\nA_COMPLETER\n",
    "hints": [
      "Vérifiez d abord si model == \"RELATIONAL\" : différenciez selon scale == \"GLOBAL\" et acid == \"STRICT\" vs scale == \"REGIONAL\".",
      "Testez ensuite \"NOSQL_DOCUMENT\", \"NOSQL_WIDE_COLUMN\" et \"OBJECT_STORAGE\"."
    ],
    "examples": [
      {
        "stdin": "SELECT_DB model=RELATIONAL scale=GLOBAL latency=STANDARD acid=STRICT",
        "expected": "RECOMMENDATION: service=Cloud_Spanner type=NEW_SQL sla=99.999%",
        "note": "Base NewSQL mondiale avec cohérence stricte ACID et haute disponibilité."
      }
    ],
    "tests": [
      {
        "label": "Base relationnelle régionale Cloud SQL",
        "stdin": "cas:1",
        "expected": "RECOMMENDATION: service=Cloud_SQL type=RDBMS sla=99.95%"
      },
      {
        "label": "Base NoSQL large-colonne ultra-faible latence Bigtable",
        "stdin": "cas:2",
        "expected": "RECOMMENDATION: service=Cloud_Bigtable type=WIDE_COLUMN usecase=IOT_ANALYTICS"
      },
      {
        "label": "Base documentaire NoSQL Firestore",
        "stdin": "cas:3",
        "expected": "RECOMMENDATION: service=Firestore type=DOCUMENT_DB latency=LOW"
      },
      {
        "label": "Stockage d objets non structurés Cloud Storage",
        "stdin": "cas:4",
        "expected": "RECOMMENDATION: service=Cloud_Storage type=BLOB_STORE scale=EXABYTE"
      }
    ],
    "solution": "[Exemple]\nRECOMMENDATION: service=Cloud_Spanner type=NEW_SQL sla=99.999%\n\n[Cas 1 — Base relationnelle régionale Cloud SQL]\nRECOMMENDATION: service=Cloud_SQL type=RDBMS sla=99.95%\n\n[Cas 2 — Base NoSQL large-colonne ultra-faible latence Bigtable]\nRECOMMENDATION: service=Cloud_Bigtable type=WIDE_COLUMN usecase=IOT_ANALYTICS\n\n[Cas 3 — Base documentaire NoSQL Firestore]\nRECOMMENDATION: service=Firestore type=DOCUMENT_DB latency=LOW\n\n[Cas 4 — Stockage d objets non structurés Cloud Storage]\nRECOMMENDATION: service=Cloud_Storage type=BLOB_STORE scale=EXABYTE"
  },
  {
    "id": "gcp3-c5-e3",
    "chapter": 5,
    "title": "Simulateur de Pipeline d'Ingestion Cloud Pub/Sub (Topics & Subscriptions)",
    "level": "n3",
    "language": "analyse",
    "goal": "Simuler le cycle de publication, de délivrance et d'acquittement de messages dans Google Cloud Pub/Sub.",
    "brief": "<p>Google Cloud Pub/Sub est le service d'ingestion et de messagerie asynchrone haute cadence mondial :<br><br>\nOpérations soumises à l’analyse :<br>\n1. <code>CREATE_SUB sub=&lt;nom&gt; ack_deadline=&lt;sec&gt;</code> :<br>\n   Enregistre un abonnement avec un délai maximal d'acquittement <code>ack_deadline</code> (ex: 10s).<br>\n   Indiquez <code>SUB_READY: name=&lt;nom&gt; ack_deadline=&lt;sec&gt;s</code>.<br>\n2. <code>DELIVER_MSG sub=&lt;nom&gt; msg_id=&lt;id&gt; elapsed_time=&lt;sec&gt;</code> :<br>\n   - Si <code>elapsed_time &lt;= ack_deadline</code> :<br>\n     <code>DELIVERY: sub=&lt;nom&gt; msg_id=&lt;id&gt; status=ACKNOWLEDGED action=REMOVED_FROM_QUEUE</code><br>\n   - Si <code>elapsed_time &gt; ack_deadline</code> :<br>\n     <code>DELIVERY: sub=&lt;nom&gt; msg_id=&lt;id&gt; status=DEADLINE_EXCEEDED action=REDELIVERED_TO_CONSUMER</code></p>",
    "starter": "# Grille d'analyse (gcp3-c5-e3) — Simulateur de Pipeline d'Ingestion Cloud Pub/Sub (Topics & Subscriptions)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Acquittement exact à la limite de la deadline]\n# Données : CREATE_SUB sub=analytics-sink ack_deadline=30\n# Données : DELIVER_MSG sub=analytics-sink msg_id=LOG-1 elapsed_time=30\nA_COMPLETER\n\n[Cas 2 — Abonnement inconnu]\n# Données : DELIVER_MSG sub=unknown-sub msg_id=MSG-1 elapsed_time=5\nA_COMPLETER\n",
    "hints": [
      "Stockez les abonnements dans un dictionnaire sub_name -> int(ack_deadline).",
      "Comparez int(elapsed_time) <= ack_deadline pour valider l acquittement."
    ],
    "examples": [
      {
        "stdin": "CREATE_SUB sub=order-processor ack_deadline=10\nDELIVER_MSG sub=order-processor msg_id=ORD-999 elapsed_time=6\nDELIVER_MSG sub=order-processor msg_id=ORD-1000 elapsed_time=14",
        "expected": "SUB_READY: name=order-processor ack_deadline=10s\nDELIVERY: sub=order-processor msg_id=ORD-999 status=ACKNOWLEDGED action=REMOVED_FROM_QUEUE\nDELIVERY: sub=order-processor msg_id=ORD-1000 status=DEADLINE_EXCEEDED action=REDELIVERED_TO_CONSUMER",
        "note": "Le message 999 est acquitté en 6s (conforme) ; le message 1000 dépasse la deadline (réexpédié)."
      }
    ],
    "tests": [
      {
        "label": "Acquittement exact à la limite de la deadline",
        "stdin": "cas:1",
        "expected": "SUB_READY: name=analytics-sink ack_deadline=30s\nDELIVERY: sub=analytics-sink msg_id=LOG-1 status=ACKNOWLEDGED action=REMOVED_FROM_QUEUE"
      },
      {
        "label": "Abonnement inconnu",
        "stdin": "cas:2",
        "expected": "DELIVERY: sub=unknown-sub status=ERROR_SUBSCRIPTION_NOT_FOUND"
      }
    ],
    "solution": "[Exemple]\nSUB_READY: name=order-processor ack_deadline=10s\nDELIVERY: sub=order-processor msg_id=ORD-999 status=ACKNOWLEDGED action=REMOVED_FROM_QUEUE\nDELIVERY: sub=order-processor msg_id=ORD-1000 status=DEADLINE_EXCEEDED action=REDELIVERED_TO_CONSUMER\n\n[Cas 1 — Acquittement exact à la limite de la deadline]\nSUB_READY: name=analytics-sink ack_deadline=30s\nDELIVERY: sub=analytics-sink msg_id=LOG-1 status=ACKNOWLEDGED action=REMOVED_FROM_QUEUE\n\n[Cas 2 — Abonnement inconnu]\nDELIVERY: sub=unknown-sub status=ERROR_SUBSCRIPTION_NOT_FOUND"
  }
];
