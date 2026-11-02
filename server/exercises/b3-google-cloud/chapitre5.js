'use strict';

module.exports = [
  {
    "id": "gcp3-c5-e1",
    "chapter": 5,
    "title": "Analyse du cycle de vie et des classes Cloud Storage",
    "level": "n1",
    "language": "analyse",
    "goal": "Évaluer une condition de cycle de vie sans assimiler une simulation à une transition réelle.",
    "brief": "<p>Pour cette grille, les quatre classes <code>STANDARD</code>, <code>NEARLINE</code>, <code>COLDLINE</code> et <code>ARCHIVE</code> sont utilisées dans des buckets non zonaux compatibles. Les durées minimales de facturation de Nearline, Coldline et Archive sont respectivement de 30, 90 et 365 jours ; ce ne sont pas automatiquement les seuils d’âge des règles.<br>\nLa classe <code>RAPID</code> est la cinquième classe : elle est réservée à Rapid Bucket zonal. L’action de cycle de vie <code>SetStorageClass</code> n’est pas prise en charge sur ces buckets et ne permet pas d’y faire transiter des objets depuis les autres classes via cette action.<br><br>\nPour <code>LIFECYCLE_EVAL bucket_type=&lt;NON_ZONAL|RAPID&gt; current_class=&lt;class&gt; age_days=&lt;N&gt; target_class=&lt;class&gt; min_age=&lt;M&gt;</code>, afficher <code>LIFECYCLE: current=&lt;cur&gt; target=&lt;target&gt; age=&lt;N&gt; action=&lt;action&gt; status=&lt;statut&gt;</code>.<br>\n- Si le bucket ou l’une des classes est Rapid : <code>action=NONE status=UNSUPPORTED_SET_STORAGE_CLASS</code>.<br>\n- Pour les transitions non zonales compatibles présentées ici, si <code>age_days &gt;= min_age</code> : <code>action=TRANSITION_ELIGIBLE status=CONDITION_MET</code> ; sinon : <code>action=NONE status=CONDITION_NOT_MET</code>.<br>\nCette grille ne vérifie ni les autres conditions ni les frais, et ne réalise pas de transition. Une règle de cycle de vie est exécutée de façon asynchrone ; une condition remplie ne prouve pas qu’une transition a déjà eu lieu. Sources : <a href=\"https://docs.cloud.google.com/storage/docs/storage-classes\">classes de stockage</a> et <a href=\"https://docs.cloud.google.com/storage/docs/rapid/rapid-bucket\">Rapid Bucket</a>.</p>",
    "starter": "# Grille d'analyse (gcp3-c5-e1) — Analyse du cycle de vie et des classes Cloud Storage\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Condition d âge non atteinte]\n# Données : LIFECYCLE_EVAL bucket_type=NON_ZONAL current_class=NEARLINE age_days=60 target_class=COLDLINE min_age=90\nA_COMPLETER\n\n[Cas 2 — Objet ancien admissible à une transition vers Archive]\n# Données : LIFECYCLE_EVAL bucket_type=NON_ZONAL current_class=COLDLINE age_days=400 target_class=ARCHIVE min_age=365\nA_COMPLETER\n\n[Cas 3 — Transition impossible depuis un bucket Rapid]\n# Données : LIFECYCLE_EVAL bucket_type=RAPID current_class=RAPID age_days=100 target_class=NEARLINE min_age=30\nA_COMPLETER\n\n[Cas 4 — Rapid ne constitue pas une cible de transition non zonale]\n# Données : LIFECYCLE_EVAL bucket_type=NON_ZONAL current_class=STANDARD age_days=100 target_class=RAPID min_age=30\nA_COMPLETER\n\n[Cas 5 — Condition satisfaite exactement au seuil]\n# Données : LIFECYCLE_EVAL bucket_type=NON_ZONAL current_class=STANDARD age_days=30 target_class=NEARLINE min_age=30\nA_COMPLETER\n",
    "hints": [
      "Écartez d’abord les scénarios Rapid pour SetStorageClass, puis comparez l’âge de l’objet au seuil de la règle.",
      "Une condition satisfaite indique une éligibilité dans la grille, pas une transition réellement exécutée."
    ],
    "examples": [
      {
        "stdin": "LIFECYCLE_EVAL bucket_type=NON_ZONAL current_class=STANDARD age_days=35 target_class=NEARLINE min_age=30",
        "expected": "LIFECYCLE: current=STANDARD target=NEARLINE age=35 action=TRANSITION_ELIGIBLE status=CONDITION_MET",
        "note": "La condition simulée est satisfaite ; aucune transition réelle n’est observée."
      }
    ],
    "tests": [
      {
        "label": "Condition d âge non atteinte",
        "stdin": "cas:1",
        "expected": "LIFECYCLE: current=NEARLINE target=COLDLINE age=60 action=NONE status=CONDITION_NOT_MET"
      },
      {
        "label": "Objet ancien admissible à une transition vers Archive",
        "stdin": "cas:2",
        "expected": "LIFECYCLE: current=COLDLINE target=ARCHIVE age=400 action=TRANSITION_ELIGIBLE status=CONDITION_MET"
      },
      {
        "label": "Transition impossible depuis un bucket Rapid",
        "stdin": "cas:3",
        "expected": "LIFECYCLE: current=RAPID target=NEARLINE age=100 action=NONE status=UNSUPPORTED_SET_STORAGE_CLASS"
      },
      {
        "label": "Rapid ne constitue pas une cible de transition non zonale",
        "stdin": "cas:4",
        "expected": "LIFECYCLE: current=STANDARD target=RAPID age=100 action=NONE status=UNSUPPORTED_SET_STORAGE_CLASS"
      },
      {
        "label": "Condition satisfaite exactement au seuil",
        "stdin": "cas:5",
        "expected": "LIFECYCLE: current=STANDARD target=NEARLINE age=30 action=TRANSITION_ELIGIBLE status=CONDITION_MET"
      }
    ],
    "solution": "[Exemple]\nLIFECYCLE: current=STANDARD target=NEARLINE age=35 action=TRANSITION_ELIGIBLE status=CONDITION_MET\n\n[Cas 1 — Condition d âge non atteinte]\nLIFECYCLE: current=NEARLINE target=COLDLINE age=60 action=NONE status=CONDITION_NOT_MET\n\n[Cas 2 — Objet ancien admissible à une transition vers Archive]\nLIFECYCLE: current=COLDLINE target=ARCHIVE age=400 action=TRANSITION_ELIGIBLE status=CONDITION_MET\n\n[Cas 3 — Transition impossible depuis un bucket Rapid]\nLIFECYCLE: current=RAPID target=NEARLINE age=100 action=NONE status=UNSUPPORTED_SET_STORAGE_CLASS\n\n[Cas 4 — Rapid ne constitue pas une cible de transition non zonale]\nLIFECYCLE: current=STANDARD target=RAPID age=100 action=NONE status=UNSUPPORTED_SET_STORAGE_CLASS\n\n[Cas 5 — Condition satisfaite exactement au seuil]\nLIFECYCLE: current=STANDARD target=NEARLINE age=30 action=TRANSITION_ELIGIBLE status=CONDITION_MET"
  },
  {
    "id": "gcp3-c5-e2",
    "chapter": 5,
    "title": "Sélecteur de données GCP et objectifs de disponibilité",
    "level": "n2",
    "language": "analyse",
    "goal": "Comparer des services candidats et conditionner les objectifs SLA à la configuration donnée.",
    "brief": "<p>Cette matrice pédagogique propose un service à étudier ; elle ne démontre pas qu’il est le seul choix adapté. Un objectif mensuel de disponibilité (SLO du SLA) ne garantit pas l’absence de panne et reste soumis aux conditions du contrat.<br><br>\nPour les cas relationnels, <code>SELECT_DB model=RELATIONAL choice=&lt;SQL|SPANNER&gt; ... eligible=&lt;YES|NO|UNKNOWN&gt;</code> désigne le service étudié. <code>eligible=YES</code> suppose ici que les conditions de couverture du SLA sont réunies ; en cas de données insuffisantes ou de non-couverture, afficher <code>slo_mensuel=NON_DETERMINE</code> plutôt qu’inventer un objectif.<br>\nCloud SQL : pour une instance HA admissible à cœurs dédiés, <code>edition=ENTERPRISE</code> donne <code>99.95%</code> et <code>edition=ENTERPRISE_PLUS</code> donne <code>99.99%</code>. Le SLA exclut notamment les instances à cœurs partagés et mono-zone ; son calcul est par instance et mois calendaire. Vérifier aussi moteur, maintenance et autres exclusions.<br>\nSpanner : une configuration <code>MULTI_REGION</code> ou <code>DUAL_REGION</code> admissible a un objectif de <code>99.999%</code> ; une configuration <code>REGIONAL</code> a un objectif de <code>99.99%</code> hors Stockholm et <code>99.95%</code> à Stockholm. Si la configuration ou la région nécessaire manque, l’objectif est non déterminé. Le calcul est mensuel par projet et région.<br>\nPour les autres modèles de cette grille, proposer Firestore pour <code>NOSQL_DOCUMENT</code>, Bigtable pour <code>NOSQL_WIDE_COLUMN</code>, ou Cloud Storage pour <code>OBJECT_STORAGE</code>.<br>\nRetourner <code>RECOMMENDATION: service=&lt;nom&gt; &lt;attributs...&gt;</code>. Références consultées le 30 octobre 2026 : <a href=\"https://cloud.google.com/sql/sla\">SLA Cloud SQL</a> et <a href=\"https://cloud.google.com/spanner/sla\">SLA Spanner</a>.</p>",
    "starter": "# Grille d'analyse (gcp3-c5-e2) — Sélecteur de données GCP et objectifs de disponibilité\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Cloud SQL Enterprise en haute disponibilité]\n# Données : SELECT_DB model=RELATIONAL scale=REGIONAL choice=SQL edition=ENTERPRISE availability=HA instance=DEDICATED eligible=YES\nA_COMPLETER\n\n[Cas 2 — Cloud SQL Enterprise Plus en haute disponibilité]\n# Données : SELECT_DB model=RELATIONAL scale=REGIONAL choice=SQL edition=ENTERPRISE_PLUS availability=HA instance=DEDICATED eligible=YES\nA_COMPLETER\n\n[Cas 3 — Couverture Cloud SQL absente ou inconnue]\n# Données : SELECT_DB model=RELATIONAL scale=REGIONAL choice=SQL edition=ENTERPRISE availability=HA instance=SHARED_CORE eligible=NO\n# Données : SELECT_DB model=RELATIONAL scale=REGIONAL choice=SQL edition=ENTERPRISE availability=SINGLE_ZONE instance=DEDICATED eligible=NO\n# Données : SELECT_DB model=RELATIONAL scale=REGIONAL choice=SQL edition=ENTERPRISE availability=HA instance=DEDICATED eligible=UNKNOWN\nA_COMPLETER\n\n[Cas 4 — Spanner régional hors Stockholm et birégional]\n# Données : SELECT_DB model=RELATIONAL choice=SPANNER config=REGIONAL region=PARIS eligible=YES\n# Données : SELECT_DB model=RELATIONAL choice=SPANNER config=DUAL_REGION eligible=YES\nA_COMPLETER\n\n[Cas 5 — Spanner régional à Stockholm]\n# Données : SELECT_DB model=RELATIONAL choice=SPANNER config=REGIONAL region=STOCKHOLM eligible=YES\nA_COMPLETER\n\n[Cas 6 — Configuration Spanner non précisée]\n# Données : SELECT_DB model=RELATIONAL choice=SPANNER config=UNKNOWN eligible=UNKNOWN\n# Données : SELECT_DB model=RELATIONAL choice=SPANNER config=REGIONAL region=UNKNOWN eligible=YES\nA_COMPLETER\n\n[Cas 7 — Trois modèles non relationnels]\n# Données : SELECT_DB model=NOSQL_WIDE_COLUMN\n# Données : SELECT_DB model=NOSQL_DOCUMENT\n# Données : SELECT_DB model=OBJECT_STORAGE\nA_COMPLETER\n",
    "hints": [
      "Ne déduisez pas le SLO de la seule échelle régionale ou mondiale : vérifiez l’édition, la haute disponibilité, la configuration et la couverture.",
      "Distinguez l’objectif contractuel mensuel d’une garantie de fonctionnement continu."
    ],
    "examples": [
      {
        "stdin": "SELECT_DB model=RELATIONAL scale=GLOBAL choice=SPANNER config=MULTI_REGION eligible=YES",
        "expected": "RECOMMENDATION: service=Cloud_Spanner type=NEW_SQL config=MULTI_REGION slo_mensuel=99.999%",
        "note": "Objectif mensuel de la configuration indiquée, sous réserve des conditions du SLA."
      }
    ],
    "tests": [
      {
        "label": "Cloud SQL Enterprise en haute disponibilité",
        "stdin": "cas:1",
        "expected": "RECOMMENDATION: service=Cloud_SQL type=RDBMS edition=ENTERPRISE availability=HA slo_mensuel=99.95%"
      },
      {
        "label": "Cloud SQL Enterprise Plus en haute disponibilité",
        "stdin": "cas:2",
        "expected": "RECOMMENDATION: service=Cloud_SQL type=RDBMS edition=ENTERPRISE_PLUS availability=HA slo_mensuel=99.99%"
      },
      {
        "label": "Couverture Cloud SQL absente ou inconnue",
        "stdin": "cas:3",
        "expected": "RECOMMENDATION: service=Cloud_SQL type=RDBMS edition=ENTERPRISE availability=HA slo_mensuel=NON_DETERMINE\nRECOMMENDATION: service=Cloud_SQL type=RDBMS edition=ENTERPRISE availability=SINGLE_ZONE slo_mensuel=NON_DETERMINE\nRECOMMENDATION: service=Cloud_SQL type=RDBMS edition=ENTERPRISE availability=HA slo_mensuel=NON_DETERMINE"
      },
      {
        "label": "Spanner régional hors Stockholm et birégional",
        "stdin": "cas:4",
        "expected": "RECOMMENDATION: service=Cloud_Spanner type=NEW_SQL config=REGIONAL region=PARIS slo_mensuel=99.99%\nRECOMMENDATION: service=Cloud_Spanner type=NEW_SQL config=DUAL_REGION slo_mensuel=99.999%"
      },
      {
        "label": "Spanner régional à Stockholm",
        "stdin": "cas:5",
        "expected": "RECOMMENDATION: service=Cloud_Spanner type=NEW_SQL config=REGIONAL region=STOCKHOLM slo_mensuel=99.95%"
      },
      {
        "label": "Configuration Spanner non précisée",
        "stdin": "cas:6",
        "expected": "RECOMMENDATION: service=Cloud_Spanner type=NEW_SQL config=UNKNOWN slo_mensuel=NON_DETERMINE\nRECOMMENDATION: service=Cloud_Spanner type=NEW_SQL config=REGIONAL region=UNKNOWN slo_mensuel=NON_DETERMINE"
      },
      {
        "label": "Trois modèles non relationnels",
        "stdin": "cas:7",
        "expected": "RECOMMENDATION: service=Cloud_Bigtable type=WIDE_COLUMN usecase=IOT_ANALYTICS\nRECOMMENDATION: service=Firestore type=DOCUMENT_DB latency=LOW\nRECOMMENDATION: service=Cloud_Storage type=BLOB_STORE"
      }
    ],
    "solution": "[Exemple]\nRECOMMENDATION: service=Cloud_Spanner type=NEW_SQL config=MULTI_REGION slo_mensuel=99.999%\n\n[Cas 1 — Cloud SQL Enterprise en haute disponibilité]\nRECOMMENDATION: service=Cloud_SQL type=RDBMS edition=ENTERPRISE availability=HA slo_mensuel=99.95%\n\n[Cas 2 — Cloud SQL Enterprise Plus en haute disponibilité]\nRECOMMENDATION: service=Cloud_SQL type=RDBMS edition=ENTERPRISE_PLUS availability=HA slo_mensuel=99.99%\n\n[Cas 3 — Couverture Cloud SQL absente ou inconnue]\nRECOMMENDATION: service=Cloud_SQL type=RDBMS edition=ENTERPRISE availability=HA slo_mensuel=NON_DETERMINE\nRECOMMENDATION: service=Cloud_SQL type=RDBMS edition=ENTERPRISE availability=SINGLE_ZONE slo_mensuel=NON_DETERMINE\nRECOMMENDATION: service=Cloud_SQL type=RDBMS edition=ENTERPRISE availability=HA slo_mensuel=NON_DETERMINE\n\n[Cas 4 — Spanner régional hors Stockholm et birégional]\nRECOMMENDATION: service=Cloud_Spanner type=NEW_SQL config=REGIONAL region=PARIS slo_mensuel=99.99%\nRECOMMENDATION: service=Cloud_Spanner type=NEW_SQL config=DUAL_REGION slo_mensuel=99.999%\n\n[Cas 5 — Spanner régional à Stockholm]\nRECOMMENDATION: service=Cloud_Spanner type=NEW_SQL config=REGIONAL region=STOCKHOLM slo_mensuel=99.95%\n\n[Cas 6 — Configuration Spanner non précisée]\nRECOMMENDATION: service=Cloud_Spanner type=NEW_SQL config=UNKNOWN slo_mensuel=NON_DETERMINE\nRECOMMENDATION: service=Cloud_Spanner type=NEW_SQL config=REGIONAL region=UNKNOWN slo_mensuel=NON_DETERMINE\n\n[Cas 7 — Trois modèles non relationnels]\nRECOMMENDATION: service=Cloud_Bigtable type=WIDE_COLUMN usecase=IOT_ANALYTICS\nRECOMMENDATION: service=Firestore type=DOCUMENT_DB latency=LOW\nRECOMMENDATION: service=Cloud_Storage type=BLOB_STORE"
  },
  {
    "id": "gcp3-c5-e3",
    "chapter": 5,
    "title": "Analyse de messages et de relivraison Pub/Sub",
    "level": "n3",
    "language": "analyse",
    "goal": "Distinguer acquittement observé, délai en cours et possibilité de relivraison.",
    "brief": "<p>Cette grille représente un abonnement Pub/Sub standard et un message encore retenu, sans simuler de file de lettres mortes ni de requête réelle.<br>\n<code>CREATE_SUB sub=&lt;nom&gt; ack_deadline=&lt;secondes&gt;</code> retourne <code>SUB_READY: name=&lt;nom&gt; ack_deadline=&lt;secondes&gt;s</code>.<br>\n<code>DELIVER_MSG sub=&lt;nom&gt; msg_id=&lt;id&gt; elapsed_time=&lt;secondes&gt; effective_deadline=&lt;secondes&gt; ack=&lt;YES|NO|NACK&gt;</code> décrit une observation. <code>effective_deadline</code> est le délai effectif fourni dans le cas, compte tenu d’une éventuelle prolongation ; <code>ack=YES</code> signifie qu’un acquittement a déjà été accepté, <code>ack=NO</code> qu’aucun n’est connu, et <code>ack=NACK</code> qu’un refus a été émis.<br>\nPour un abonnement connu, retourner <code>DELIVERY: sub=&lt;nom&gt; msg_id=&lt;id&gt; status=&lt;statut&gt; action=&lt;action&gt;</code> :<br>\n- acquittement accepté : <code>status=ACKNOWLEDGED action=NONE</code> ; cela ne prouve pas l’absence de doublons dans une livraison standard ;<br>\n- sans acquittement avant le délai effectif : <code>status=WAITING_FOR_ACK action=NONE</code> ;<br>\n- sans acquittement à partir du délai effectif : <code>status=DEADLINE_EXPIRED action=REDELIVERY_POSSIBLE</code> ;<br>\n- refus explicite : <code>status=NACKED action=REDELIVERY_POSSIBLE</code>.<br>\nSi l’abonnement est inconnu, retourner <code>DELIVERY: sub=&lt;nom&gt; status=ERROR_SUBSCRIPTION_NOT_FOUND</code>.<br><br>\nUne nouvelle tentative peut cibler le même client ou un autre ; elle n’est ni la preuve d’une panne ni une livraison immédiate garantie. La politique de retry, les prolongations, la rétention et une éventuelle file de lettres mortes influencent le parcours. Voir la <a href=\"https://docs.cloud.google.com/pubsub/docs/subscription-retry-policy\">politique de retry Pub/Sub</a>.</p>",
    "starter": "# Grille d'analyse (gcp3-c5-e3) — Analyse de messages et de relivraison Pub/Sub\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Prolongation du délai encore en cours]\n# Données : CREATE_SUB sub=analytics-sink ack_deadline=10\n# Données : DELIVER_MSG sub=analytics-sink msg_id=LOG-1 elapsed_time=14 effective_deadline=30 ack=NO\nA_COMPLETER\n\n[Cas 2 — Abonnement inconnu]\n# Données : DELIVER_MSG sub=unknown-sub msg_id=MSG-1 elapsed_time=5 effective_deadline=10 ack=NO\nA_COMPLETER\n\n[Cas 3 — Délai atteint sans acquittement connu]\n# Données : CREATE_SUB sub=analytics-sink ack_deadline=30\n# Données : DELIVER_MSG sub=analytics-sink msg_id=LOG-2 elapsed_time=30 effective_deadline=30 ack=NO\nA_COMPLETER\n\n[Cas 4 — Refus explicite du message]\n# Données : CREATE_SUB sub=analytics-sink ack_deadline=30\n# Données : DELIVER_MSG sub=analytics-sink msg_id=LOG-3 elapsed_time=3 effective_deadline=30 ack=NACK\nA_COMPLETER\n\n[Cas 5 — Acquittement explicitement accepté]\n# Données : CREATE_SUB sub=analytics-sink ack_deadline=30\n# Données : DELIVER_MSG sub=analytics-sink msg_id=LOG-4 elapsed_time=6 effective_deadline=30 ack=YES\nA_COMPLETER\n",
    "hints": [
      "Ne supposez jamais qu’un message est acquitté à partir du seul temps écoulé : l’état ack est fourni.",
      "Comparez elapsed_time au délai effectif, éventuellement prolongé ; une relivraison est possible, pas certaine."
    ],
    "examples": [
      {
        "stdin": "CREATE_SUB sub=order-processor ack_deadline=10\nDELIVER_MSG sub=order-processor msg_id=ORD-999 elapsed_time=6 effective_deadline=10 ack=YES\nDELIVER_MSG sub=order-processor msg_id=ORD-1000 elapsed_time=14 effective_deadline=10 ack=NO",
        "expected": "SUB_READY: name=order-processor ack_deadline=10s\nDELIVERY: sub=order-processor msg_id=ORD-999 status=ACKNOWLEDGED action=NONE\nDELIVERY: sub=order-processor msg_id=ORD-1000 status=DEADLINE_EXPIRED action=REDELIVERY_POSSIBLE",
        "note": "Le premier acquittement est connu ; une nouvelle tentative est possible pour le second message."
      }
    ],
    "tests": [
      {
        "label": "Prolongation du délai encore en cours",
        "stdin": "cas:1",
        "expected": "SUB_READY: name=analytics-sink ack_deadline=10s\nDELIVERY: sub=analytics-sink msg_id=LOG-1 status=WAITING_FOR_ACK action=NONE"
      },
      {
        "label": "Abonnement inconnu",
        "stdin": "cas:2",
        "expected": "DELIVERY: sub=unknown-sub status=ERROR_SUBSCRIPTION_NOT_FOUND"
      },
      {
        "label": "Délai atteint sans acquittement connu",
        "stdin": "cas:3",
        "expected": "SUB_READY: name=analytics-sink ack_deadline=30s\nDELIVERY: sub=analytics-sink msg_id=LOG-2 status=DEADLINE_EXPIRED action=REDELIVERY_POSSIBLE"
      },
      {
        "label": "Refus explicite du message",
        "stdin": "cas:4",
        "expected": "SUB_READY: name=analytics-sink ack_deadline=30s\nDELIVERY: sub=analytics-sink msg_id=LOG-3 status=NACKED action=REDELIVERY_POSSIBLE"
      },
      {
        "label": "Acquittement explicitement accepté",
        "stdin": "cas:5",
        "expected": "SUB_READY: name=analytics-sink ack_deadline=30s\nDELIVERY: sub=analytics-sink msg_id=LOG-4 status=ACKNOWLEDGED action=NONE"
      }
    ],
    "solution": "[Exemple]\nSUB_READY: name=order-processor ack_deadline=10s\nDELIVERY: sub=order-processor msg_id=ORD-999 status=ACKNOWLEDGED action=NONE\nDELIVERY: sub=order-processor msg_id=ORD-1000 status=DEADLINE_EXPIRED action=REDELIVERY_POSSIBLE\n\n[Cas 1 — Prolongation du délai encore en cours]\nSUB_READY: name=analytics-sink ack_deadline=10s\nDELIVERY: sub=analytics-sink msg_id=LOG-1 status=WAITING_FOR_ACK action=NONE\n\n[Cas 2 — Abonnement inconnu]\nDELIVERY: sub=unknown-sub status=ERROR_SUBSCRIPTION_NOT_FOUND\n\n[Cas 3 — Délai atteint sans acquittement connu]\nSUB_READY: name=analytics-sink ack_deadline=30s\nDELIVERY: sub=analytics-sink msg_id=LOG-2 status=DEADLINE_EXPIRED action=REDELIVERY_POSSIBLE\n\n[Cas 4 — Refus explicite du message]\nSUB_READY: name=analytics-sink ack_deadline=30s\nDELIVERY: sub=analytics-sink msg_id=LOG-3 status=NACKED action=REDELIVERY_POSSIBLE\n\n[Cas 5 — Acquittement explicitement accepté]\nSUB_READY: name=analytics-sink ack_deadline=30s\nDELIVERY: sub=analytics-sink msg_id=LOG-4 status=ACKNOWLEDGED action=NONE"
  }
];
