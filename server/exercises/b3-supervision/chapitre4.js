'use strict';

module.exports = [
  {
    "id": "sup3-c4-e1",
    "chapter": 4,
    "level": "n1",
    "language": "analyse",
    "title": "Les quatre types de métriques de la plateforme StreamVOD",
    "exampleTitle": "Exemple résolu — les métriques de la boutique Vertigo",
    "goal": "Distinguer counter, gauge, histogram et summary dans un format d'exposition Prometheus.",
    "brief": "<p><strong>Énoncé.</strong> La plateforme de vidéo à la demande StreamVOD expose ses métriques au format Prometheus. Extrait du point d'exposition collecté par le serveur :</p><table><tr><th>Ligne d'exposition</th><th>TYPE déclaré</th></tr><tr><th>http_requests_total{handler=\"/api/play\"} 145203</th><td>counter</td></tr><tr><th>node_cpu_seconds_total{mode=\"idle\"} 9812442</th><td>counter</td></tr><tr><th>queue_waiting_jobs 17</th><td>gauge</td></tr><tr><th>transcode_duration_seconds_bucket{le=\"0.1\"} 1200</th><td>histogram</td></tr><tr><th>rpc_duration_seconds{quantile=\"0.95\"} 0.007</th><td>summary</td></tr></table><p>Rappels du cours : un counter ne fait que croître et compte des événements cumulés ; une gauge donne une valeur instantanée qui peut baisser ; un histogram répartit les observations dans des intervalles (buckets) ; un summary expose des quantiles calculés par l'application elle-même.</p><ol><li>Quel type de métrique ne fait que croître et compte des événements cumulés ?</li><li>Quel type de métrique donne une valeur instantanée qui peut baisser, comme les tâches en attente ?</li><li>Quel type de métrique répartit les observations dans des intervalles (buckets) ?</li><li>Quel type de métrique expose directement des quantiles calculés côté application ?</li><li>Dans la série http_requests_total{handler=\"/api/play\"}, que représente la partie handler=\"/api/play\" ?</li></ol>",
    "starter": "# Exercice — Les quatre types de métriques de la plateforme StreamVOD\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 4 : le nom du type. Question 5 : un court libellé.\n\n[Question 1 — Type de métrique toujours croissant]\nA_COMPLETER\n\n[Question 2 — Type de métrique à valeur instantanée]\nA_COMPLETER\n\n[Question 3 — Type de métrique à intervalles]\nA_COMPLETER\n\n[Question 4 — Type de métrique à quantiles]\nA_COMPLETER\n\n[Question 5 — Nature de handler=\"/api/play\"]\nA_COMPLETER\n",
    "hints": [
      "Un counter ne descend jamais, sauf remise à zéro au redémarrage du processus : on ne l'utilise jamais seul, toujours avec rate().",
      "Une gauge peut monter et descendre à chaque collecte : température, file d'attente, mémoire libre, taux de succès.",
      "1. Cherchez la métrique de requêtes cumulées. 2. Les tâches en attente forment une valeur instantanée. 3. Les buckets signalent l'histogram. 4. Le quantile 0.95 exposé signale le summary. 5. La partie entre accolades qualifie la série : c'est un label."
    ],
    "examples": [
      {
        "stdin": "La boutique en ligne Vertigo expose ses métriques Prometheus :\norders_total 8421 (counter)\ncache_hit_ratio 0.93 (gauge)\ncheckout_duration_seconds_bucket{le=\"0.5\"} 340 (histogram)\npayment_authorization_seconds{quantile=\"0.99\"} 0.412 (summary)\n\n1) orders_total : counter, il ne fait que croître.\n2) cache_hit_ratio : gauge, le taux de succès peut baisser.\n3) checkout_duration_seconds : histogram, les durées sont réparties par buckets.\n4) payment_authorization_seconds : summary, le quantile est calculé par l'application.\n5) Une accolade comme {code=\"200\", carrier=\"colissimo\"} porte des labels.",
        "expected": "orders_total : counter — cache_hit_ratio : gauge — checkout_duration_seconds : histogram — payment_authorization_seconds : summary — les accolades portent des labels",
        "note": "Le suffixe _total signale souvent un counter, _bucket signale un histogram, et un quantile exposé directement signale un summary."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Type de métrique toujours croissant",
        "stdin": "q:1",
        "expected": "counter||le counter||un counter||compteur||le compteur"
      },
      {
        "label": "Question 2 — Type de métrique à valeur instantanée",
        "stdin": "q:2",
        "expected": "gauge||la gauge||une gauge||jauge||la jauge"
      },
      {
        "label": "Question 3 — Type de métrique à intervalles",
        "stdin": "q:3",
        "expected": "histogram||l'histogramme||un histogramme||histogramme"
      },
      {
        "label": "Question 4 — Type de métrique à quantiles",
        "stdin": "q:4",
        "expected": "summary||le summary||un summary"
      },
      {
        "label": "Question 5 — Nature de handler=\"/api/play\"",
        "stdin": "q:5",
        "expected": "un label||label||une étiquette||un label (une étiquette)"
      }
    ],
    "solution": "[Question 1 — Type de métrique toujours croissant]\ncounter\n\n[Question 2 — Type de métrique à valeur instantanée]\ngauge\n\n[Question 3 — Type de métrique à intervalles]\nhistogram\n\n[Question 4 — Type de métrique à quantiles]\nsummary\n\n[Question 5 — Nature de handler=\"/api/play\"]\nun label",
    "takeaway": "1) http_requests_total est un counter : il cumule les requêtes traitées et ne diminue jamais, hormis la remise à zéro au redémarrage.\n2) queue_waiting_jobs est une gauge : le nombre de tâches en attente évolue librement, à la hausse comme à la baisse.\n3) transcode_duration_seconds est un histogram : les durées de transcodage sont comptées par intervalles, les fameux buckets.\n4) rpc_duration_seconds est un summary : l'application calcule elle-même le quantile 0.95 et l'expose directement.\n5) handler=\"/api/play\" est un label : il qualifie la série et permet de distinguer les requêtes par gestionnaire.\nContrôle : les quatre types du cours apparaissent chacun une fois dans l'extrait, et chaque série reste identifiable par son nom et ses labels."
  },
  {
    "id": "sup3-c4-e2",
    "chapter": 4,
    "level": "n2",
    "language": "analyse",
    "title": "Le rate() de l'API de suivi de colis LivraisonPlus",
    "exampleTitle": "Exemple résolu — le compteur de sessions du portail MairieConnect",
    "goal": "Calculer un rate() PromQL à partir d'un counter échantillonné sur une fenêtre, puis agréger deux instances.",
    "brief": "<p><strong>Énoncé.</strong> L'API de suivi de colis LivraisonPlus tourne sur deux instances derrière un répartiteur de charge. Le counter <code>http_requests_total</code> est relevé sur chaque instance à 12 h 00 puis à 12 h 05, soit une fenêtre de 5 minutes :</p><table><tr><th>Instance</th><th>Valeur à 12 h 00</th><th>Valeur à 12 h 05</th></tr><tr><th>api-1</th><td>118 250</td><td>121 450</td></tr><tr><th>api-2</th><td>54 100</td><td>55 300</td></tr></table><p>Rappels du cours : rate() = variation du counter sur la fenêtre divisée par la durée de la fenêtre en secondes ; aucune des deux instances n'a redémarré pendant la fenêtre ; le débit total de la plateforme s'obtient en sommant les rate() des instances.</p><ol><li>Quelle est la variation du counter de l'instance api-1 sur la fenêtre ?</li><li>Quelle est la durée de la fenêtre, en secondes ?</li><li>Quel est le rate() de l'instance api-1, arrondi à 2 décimales (en requêtes par seconde) ?</li><li>Quel est le rate() de l'instance api-2 (en requêtes par seconde) ?</li><li>Quel est le débit total de la plateforme, arrondi à 2 décimales (en requêtes par seconde) ?</li></ol>",
    "starter": "# Exercice — Le rate() de l'API de suivi de colis LivraisonPlus\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Toutes les réponses sont des nombres seuls.\n\n[Question 1 — Variation du counter de api-1]\nA_COMPLETER\n\n[Question 2 — Durée de la fenêtre (en secondes)]\nA_COMPLETER\n\n[Question 3 — rate() de api-1 (2 décimales)]\nA_COMPLETER\n\n[Question 4 — rate() de api-2]\nA_COMPLETER\n\n[Question 5 — Débit total de la plateforme (2 décimales)]\nA_COMPLETER\n",
    "hints": [
      "Le rate() se calcule sur une fenêtre : soustrayez la valeur de départ de la valeur d'arrivée ; en cas de redémarrage, la fonction compense la remise à zéro du counter.",
      "5 minutes = 300 secondes : c'est le diviseur commun des deux rate().",
      "1. Variation de api-1 : 121 450 − 118 250. 2. Convertissez 5 minutes en secondes. 3. Divisez la variation par 300. 4. Même calcul pour api-2. 5. Additionnez les deux rate()."
    ],
    "examples": [
      {
        "stdin": "Le portail MairieConnect expose le counter sessions_total.\nÀ 09 h 00, il vaut 20 000 ; à 09 h 02 (fenêtre de 2 minutes), il vaut 21 560.\n\n1) Variation : 21 560 − 20 000 = 1 560.\n2) Fenêtre : 2 minutes = 120 secondes.\n3) rate() : 1 560 / 120 = 13 sessions par seconde.",
        "expected": "variation 1 560 — fenêtre 120 secondes — rate() = 13 sessions par seconde",
        "note": "Un rate() s'exprime toujours en unités par seconde : la même variation sur une fenêtre plus courte donnerait un débit plus élevé."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Variation du counter de api-1",
        "stdin": "q:1",
        "expected": "3200||3 200"
      },
      {
        "label": "Question 2 — Durée de la fenêtre (en secondes)",
        "stdin": "q:2",
        "expected": "300||300 secondes||300 s"
      },
      {
        "label": "Question 3 — rate() de api-1 (2 décimales)",
        "stdin": "q:3",
        "expected": "10,67||10.67"
      },
      {
        "label": "Question 4 — rate() de api-2",
        "stdin": "q:4",
        "expected": "4||4,00||4.00"
      },
      {
        "label": "Question 5 — Débit total de la plateforme (2 décimales)",
        "stdin": "q:5",
        "expected": "14,67||14.67"
      }
    ],
    "solution": "[Question 1 — Variation du counter de api-1]\n3200\n\n[Question 2 — Durée de la fenêtre (en secondes)]\n300\n\n[Question 3 — rate() de api-1 (2 décimales)]\n10,67\n\n[Question 4 — rate() de api-2]\n4\n\n[Question 5 — Débit total de la plateforme (2 décimales)]\n14,67",
    "takeaway": "1) Variation de api-1 : 121 450 − 118 250 = 3 200 requêtes.\n2) La fenêtre de 5 minutes dure 300 secondes.\n3) rate() de api-1 : 3 200 / 300 = 10,67 requêtes par seconde.\n4) Variation de api-2 : 55 300 − 54 100 = 1 200 ; rate() : 1 200 / 300 = 4 requêtes par seconde.\n5) Débit total : 10,67 + 4 = 14,67 requêtes par seconde.\nContrôle : 14,67 requêtes par seconde sur 300 secondes représentent 4 400 requêtes, soit exactement 3 200 + 1 200 : les deux instances retrouvent leur trafic respectif."
  },
  {
    "id": "sup3-c4-e3",
    "chapter": 4,
    "level": "n3",
    "language": "analyse",
    "title": "Alertmanager : silences et routage pendant la migration de ShopExpress",
    "exampleTitle": "Exemple résolu — la fenêtre de maintenance des bases de données DataPort",
    "goal": "Appliquer les règles d'Alertmanager (silence, groupement, routage par sévérité) à une nuit de migration.",
    "brief": "<p><strong>Énoncé.</strong> ShopExpress migre son cluster européen dans la nuit du samedi 14 au dimanche 15 juin, fenêtre de maintenance de <strong>02 h 00 à 04 h 00</strong>. Configuration Alertmanager : les alertes portant le cluster <code>eu-west</code> sont <strong>mises en silence</strong> pendant toute la fenêtre ; le groupement est réalisé par cluster ; le routage envoie la sévérité <code>critical</code> vers l'astreinte (PagerDuty) et la sévérité <code>warning</code> vers le canal Slack du NOC. Alertes reçues pendant la fenêtre :</p><table><tr><th>Alerte</th><th>Nom (alertname)</th><th>Sévérité</th><th>Cluster</th><th>Heure</th></tr><tr><th>A</th><td>HighCPU</td><td>warning</td><td>eu-west</td><td>02 h 15</td></tr><tr><th>B</th><td>ServiceDown</td><td>critical</td><td>eu-west</td><td>02 h 30</td></tr><tr><th>C</th><td>HighCPU</td><td>warning</td><td>us-east</td><td>02 h 45</td></tr><tr><th>D</th><td>ServiceDown</td><td>critical</td><td>us-east</td><td>03 h 50</td></tr></table><ol><li>Quelles alertes le silence neutralise-t-il pendant la fenêtre ?</li><li>Combien de notifications arrivent sur le canal Slack du NOC pendant la fenêtre ?</li><li>Combien de notifications arrivent vers l'astreinte PagerDuty pendant la fenêtre ?</li><li>Le silence expire à 04 h 00 et l'alerte B est toujours active à 04 h 05 : sera-t-elle notifiée à l'astreinte ?</li><li>Les alertes C et D portent le même cluster mais aboutissent dans deux canaux différents : quel critère de routage les sépare ?</li></ol>",
    "starter": "# Exercice — Alertmanager : silences et routage pendant la migration de ShopExpress\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 et 5 : un court libellé. Questions 2 et 3 : le nombre. Question 4 : oui ou non.\n\n[Question 1 — Alertes neutralisées par le silence]\nA_COMPLETER\n\n[Question 2 — Notifications Slack pendant la fenêtre]\nA_COMPLETER\n\n[Question 3 — Notifications PagerDuty pendant la fenêtre]\nA_COMPLETER\n\n[Question 4 — L'alerte B sera-t-elle notifiée à 04 h 05 ?]\nA_COMPLETER\n\n[Question 5 — Critère de routage qui sépare C et D]\nA_COMPLETER\n",
    "hints": [
      "Un silence filtre toutes les alertes qui correspondent à ses critères (ici le cluster eu-west) pendant sa période de validité, quelle que soit leur sévérité.",
      "Une fois le silence expiré, les alertes toujours actives redeviennent notifiables : elles ne sont pas perdues.",
      "1. Repérez les alertes du cluster eu-west. 2. Les warning hors silence vont sur Slack. 3. Les critical hors silence vont vers l'astreinte. 4. Comparez l'heure au terme du silence. 5. Même cluster, même nom pour C et D : seule leur gravité diffère."
    ],
    "examples": [
      {
        "stdin": "DataPort ouvre une maintenance de ses bases de 22 h 00 à 23 h 30, avec un silence sur job=\"db\".\nAlertes reçues : HighLatency (warning, job=db) à 22 h 20 ; DiskFull (critical, job=web) à 22 h 40 ;\nHighLatency (warning, job=web) à 23 h 00.\n\n1) Seule l'alerte HighLatency de job=db est silencée.\n2) DiskFull, critical et hors silence, part vers l'astreinte.\n3) HighLatency de job=web, warning, arrive sur Slack.\n4) Le silence épargne les alertes des autres jobs : deux notifications partent pendant la fenêtre.",
        "expected": "DiskFull notifiée à l'astreinte — HighLatency job=web notifiée sur Slack — HighLatency job=db silencieuse pendant la fenêtre",
        "note": "Un silence est ciblé : il épargne les alertes qui ne correspondent pas à ses critères, même au cœur de la maintenance."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Alertes neutralisées par le silence",
        "stdin": "q:1",
        "expected": "A et B||les alertes A et B||A,B||A, B||A et B."
      },
      {
        "label": "Question 2 — Notifications Slack pendant la fenêtre",
        "stdin": "q:2",
        "expected": "1||une||une seule"
      },
      {
        "label": "Question 3 — Notifications PagerDuty pendant la fenêtre",
        "stdin": "q:3",
        "expected": "1||une||une seule"
      },
      {
        "label": "Question 4 — L'alerte B sera-t-elle notifiée à 04 h 05 ?",
        "stdin": "q:4",
        "expected": "oui||elle sera notifiée"
      },
      {
        "label": "Question 5 — Critère de routage qui sépare C et D",
        "stdin": "q:5",
        "expected": "la sévérité||sévérité||la severity||severity||la gravité"
      }
    ],
    "solution": "[Question 1 — Alertes neutralisées par le silence]\nA et B\n\n[Question 2 — Notifications Slack pendant la fenêtre]\n1\n\n[Question 3 — Notifications PagerDuty pendant la fenêtre]\n1\n\n[Question 4 — L'alerte B sera-t-elle notifiée à 04 h 05 ?]\noui\n\n[Question 5 — Critère de routage qui sépare C et D]\nla sévérité",
    "takeaway": "1) Le silence couvre le cluster eu-west pendant la fenêtre : il neutralise les alertes A (02 h 15) et B (02 h 30).\n2) Une seule notification Slack : l'alerte C, warning et hors silence (us-east).\n3) Une seule notification PagerDuty : l'alerte D, critical et hors silence (us-east).\n4) À 04 h 05, le silence a expiré et l'alerte B est toujours active : oui, elle sera notifiée à l'astreinte, avec sa sévérité critical.\n5) C et D partagent le même cluster et le même nom d'alerte : c'est la sévérité (warning contre critical) qui les route vers des canaux différents.\nContrôle : sur quatre alertes, deux sont silencées (A et B), une arrive sur Slack (C) et une vers l'astreinte (D) : chaque alerte a un et un seul destinataire pendant la fenêtre."
  }
];
