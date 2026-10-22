'use strict';

module.exports = [
  {
    "id": "sup3-c4-e1",
    "chapter": 4,
    "title": "Parseur de Format d’Exposition Métrique Prometheus",
    "level": "n1",
    "language": "analyse",
    "goal": "Analyser une ligne d'échantillon de métrique Prometheus OpenMetrics et extraire son nom, ses labels et sa valeur numérique.",
    "brief": "<p>Prometheus collecte ses métriques sous forme de flux textuel structuré :<br><br>\nFormat d'un échantillon :<br>\n<code>metric_name{label1=\"val1\",label2=\"val2\"} 1234.56</code><br>\nou sans label :<br>\n<code>metric_name 1048576</code><br><br>\nDonnées du cas : <code>PROM_PARSE &lt;ligne_echantillon&gt;</code>.<br>\nRésultat d’analyse attendu : <code>METRIC: name=&lt;name&gt; labels=&lt;k1=v1,k2=v2|NONE&gt; value=&lt;val&gt;</code>.<br>\n(Les étiquettes sont triées par nom alphabétique en sortie).</p>",
    "starter": "# Grille d'analyse (sup3-c4-e1) — Parseur de Format d’Exposition Métrique Prometheus\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Métrique sans label mémoire vive libre]\n# Données : PROM_PARSE node_memory_MemFree_bytes 1048576\nA_COMPLETER\n\n[Cas 2 — Métrique avec valeur flottante et label unique]\n# Données : PROM_PARSE cpu_temperature_celsius{core=\"0\"} 45.5\nA_COMPLETER\n\n[Cas 3 — Métrique up avec instance et job]\n# Données : PROM_PARSE up{job=\"node-exporter\",instance=\"10.0.0.1:9100\"} 1\nA_COMPLETER\n",
    "hints": [
      "Utilisez une expression régulière pour séparer le nom, le bloc de labels entre accolades et la valeur.",
      "Triez les paires de labels par ordre alphabétique de leurs clés."
    ],
    "examples": [
      {
        "stdin": "PROM_PARSE http_requests_total{method=\"GET\",handler=\"/api\"} 1027",
        "expected": "METRIC: name=http_requests_total labels=handler=/api,method=GET value=1027",
        "note": "Extraction du nom de métrique et des deux labels triés par ordre alphabétique."
      }
    ],
    "tests": [
      {
        "label": "Métrique sans label mémoire vive libre",
        "stdin": "cas:1",
        "expected": "METRIC: name=node_memory_MemFree_bytes labels=NONE value=1048576\n"
      },
      {
        "label": "Métrique avec valeur flottante et label unique",
        "stdin": "cas:2",
        "expected": "METRIC: name=cpu_temperature_celsius labels=core=0 value=45.5\n"
      },
      {
        "label": "Métrique up avec instance et job",
        "stdin": "cas:3",
        "expected": "METRIC: name=up labels=instance=10.0.0.1:9100,job=node-exporter value=1\n"
      }
    ],
    "solution": "[Exemple]\nMETRIC: name=http_requests_total labels=handler=/api,method=GET value=1027\n\n[Cas 1 — Métrique sans label mémoire vive libre]\nMETRIC: name=node_memory_MemFree_bytes labels=NONE value=1048576\n\n\n[Cas 2 — Métrique avec valeur flottante et label unique]\nMETRIC: name=cpu_temperature_celsius labels=core=0 value=45.5\n\n\n[Cas 3 — Métrique up avec instance et job]\nMETRIC: name=up labels=instance=10.0.0.1:9100,job=node-exporter value=1"
  },
  {
    "id": "sup3-c4-e2",
    "chapter": 4,
    "title": "Moteur de Calcul PromQL rate() et Agrégation sum by()",
    "level": "n2",
    "language": "analyse",
    "goal": "Calculer le taux d'accroissement par seconde d'un compteur avec gestion des réinitialisations, puis agréger par étiquette.",
    "brief": "<p>En PromQL, <code>rate(v[interval])</code> calcule la dérivée par seconde :<br><br>\n1. <strong>Taux par seconde</strong> :<br>\nSi <code>final &gt;= init</code> : <code>delta = final - init</code>.<br>\nSi <code>final &lt; init</code> (redémarrage / compteur reset) : <code>delta = final</code>.<br>\n<code>taux = delta / interval</code>.<br><br>\n2. <strong>Agrégation sum by (LABEL)</strong> :<br>\nSomme des taux pour chaque valeur distincte de l'étiquette cible <code>GROUP</code>.<br><br>\nDonnées du cas : <code>PROMQL_RATE INTERVAL=&lt;sec&gt; GROUP=&lt;label&gt; SERIES=&lt;init:final:lbl=val,lbl=val&gt; [SERIES=...]</code>.<br>\nRésultat d’analyse attendu : <code>PROMQL: rates=[&lt;s1_taux:.2f&gt;,&lt;s2_taux:.2f&gt;] sum_by={&lt;val1&gt;:&lt;tot1:.2f&gt;,&lt;val2&gt;:&lt;tot2:.2f&gt;}</code> (clés de sum_by triées par ordre alphabétique).</p>",
    "starter": "# Grille d'analyse (sup3-c4-e2) — Moteur de Calcul PromQL rate() et Agrégation sum by()\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Deux séries de production sur intervalle 60 secondes]\n# Données : PROMQL_RATE INTERVAL=60 GROUP=env SERIES=120:180:env=prod,host=srv1 SERIES=200:320:env=prod,host=srv2\nA_COMPLETER\n\n[Cas 2 — Série unique avec réinitialisation de compteur]\n# Données : PROMQL_RATE INTERVAL=120 GROUP=service SERIES=500:200:service=payment\nA_COMPLETER\n\n[Cas 3 — Deux groupes distincts frontend et backend]\n# Données : PROMQL_RATE INTERVAL=100 GROUP=tier SERIES=100:300:tier=front SERIES=50:250:tier=back SERIES=0:100:tier=front\nA_COMPLETER\n",
    "hints": [
      "Isolez les paramètres INTERVAL, GROUP et chaque argument SERIES.",
      "Gérez le reset du compteur si final < init."
    ],
    "examples": [
      {
        "stdin": "PROMQL_RATE INTERVAL=300 GROUP=status SERIES=1000:2500:service=cart,status=200 SERIES=500:1100:service=auth,status=200 SERIES=10:70:service=cart,status=500",
        "expected": "PROMQL: rates=[5.00,2.00,0.20] sum_by={200:7.00,500:0.20}",
        "note": "Calcul des requêtes par seconde et somme groupée par code de statut HTTP."
      }
    ],
    "tests": [
      {
        "label": "Deux séries de production sur intervalle 60 secondes",
        "stdin": "cas:1",
        "expected": "PROMQL: rates=[1.00,2.00] sum_by={prod:3.00}\n"
      },
      {
        "label": "Série unique avec réinitialisation de compteur",
        "stdin": "cas:2",
        "expected": "PROMQL: rates=[1.67] sum_by={payment:1.67}\n"
      },
      {
        "label": "Deux groupes distincts frontend et backend",
        "stdin": "cas:3",
        "expected": "PROMQL: rates=[2.00,2.00,1.00] sum_by={back:2.00,front:3.00}\n"
      }
    ],
    "solution": "[Exemple]\nPROMQL: rates=[5.00,2.00,0.20] sum_by={200:7.00,500:0.20}\n\n[Cas 1 — Deux séries de production sur intervalle 60 secondes]\nPROMQL: rates=[1.00,2.00] sum_by={prod:3.00}\n\n\n[Cas 2 — Série unique avec réinitialisation de compteur]\nPROMQL: rates=[1.67] sum_by={payment:1.67}\n\n\n[Cas 3 — Deux groupes distincts frontend et backend]\nPROMQL: rates=[2.00,2.00,1.00] sum_by={back:2.00,front:3.00}"
  },
  {
    "id": "sup3-c4-e3",
    "chapter": 4,
    "title": "Routeur de Notifications Alertmanager (Grouping & Silences)",
    "level": "n3",
    "language": "analyse",
    "goal": "Filtrer les alertes actives via les silences et règles d'inhibition puis regrouper les notifications.",
    "brief": "<p>Alertmanager évite la surcharge d'alertes en combinant filtrage et groupement :<br><br>\n1. <strong>Silences</strong> : Si un silence actif <code>SILENCE=k=v</code> correspond à un label de l'alerte, celle-ci est ignorée.<br>\n2. <strong>Inhibition</strong> : Si <code>INHIBIT=src:tgt:equal_key</code> est défini, toute alerte <code>tgt</code> est supprimée s'il existe une alerte <code>src</code> active ayant la même valeur sur le label <code>equal_key</code>.<br>\n3. <strong>Groupement</strong> : Les alertes conservées sont regroupées par la valeur de l'étiquette <code>GROUP_BY</code>.<br><br>\nDonnées du cas : <code>ALERT_ROUTE GROUP_BY=&lt;key&gt; SILENCE=&lt;k=v|NONE&gt; INHIBIT=&lt;src:tgt:eq|NONE&gt; ALERTS=&lt;name1:k=v,k=v|name2:...&gt;</code>.<br>\nRésultat d’analyse attendu : Pour chaque groupe (dans l'ordre alphabétique des valeurs du label groupé) :<br>\n<code>ALERT_GROUP: key=&lt;val&gt; count=&lt;n&gt; alerts=&lt;nom1,nom2...&gt;</code> (si aucune alerte : <code>ALERT_GROUP: key=NONE count=0 alerts=NONE</code>).</p>",
    "starter": "# Grille d'analyse (sup3-c4-e3) — Routeur de Notifications Alertmanager (Grouping & Silences)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Deux alertes actives dans la même zone sans inhibition]\n# Données : ALERT_ROUTE GROUP_BY=zone SILENCE=NONE INHIBIT=NONE ALERTS=DBDown:alertname=DBDown,zone=eu-1|WebDown:alertname=WebDown,zone=eu-1\nA_COMPLETER\n\n[Cas 2 — Silence global éliminant toutes les alertes de test]\n# Données : ALERT_ROUTE GROUP_BY=env SILENCE=env=test INHIBIT=NONE ALERTS=TestAlert:alertname=TestAlert,env=test\nA_COMPLETER\n\n[Cas 3 — Deux clusters de production distincts]\n# Données : ALERT_ROUTE GROUP_BY=cluster SILENCE=NONE INHIBIT=NONE ALERTS=ApiSlow:alertname=ApiSlow,cluster=alpha|WorkerDown:alertname=WorkerDown,cluster=beta\nA_COMPLETER\n",
    "hints": [
      "Supprimez d'abord les alertes matchant le silence.",
      "Vérifiez ensuite si les alertes restantes sont inhibées par une alerte source active.",
      "Regroupez par la clef GROUP_BY et affichez chaque groupe."
    ],
    "examples": [
      {
        "stdin": "ALERT_ROUTE GROUP_BY=cluster SILENCE=cluster=dev INHIBIT=NodeDown:InstanceHighCpu:node ALERTS=NodeDown:alertname=NodeDown,node=srv1,cluster=prod|InstanceHighCpu:alertname=InstanceHighCpu,node=srv1,cluster=prod|DiskFull:alertname=DiskFull,node=srv2,cluster=dev",
        "expected": "ALERT_GROUP: key=prod count=1 alerts=NodeDown",
        "note": "DiskFull est sous silence (dev) et InstanceHighCpu est inhibé par NodeDown sur srv1."
      }
    ],
    "tests": [
      {
        "label": "Deux alertes actives dans la même zone sans inhibition",
        "stdin": "cas:1",
        "expected": "ALERT_GROUP: key=eu-1 count=2 alerts=DBDown,WebDown\n"
      },
      {
        "label": "Silence global éliminant toutes les alertes de test",
        "stdin": "cas:2",
        "expected": "ALERT_GROUP: key=NONE count=0 alerts=NONE\n"
      },
      {
        "label": "Deux clusters de production distincts",
        "stdin": "cas:3",
        "expected": "ALERT_GROUP: key=alpha count=1 alerts=ApiSlow\nALERT_GROUP: key=beta count=1 alerts=WorkerDown\n"
      }
    ],
    "solution": "[Exemple]\nALERT_GROUP: key=prod count=1 alerts=NodeDown\n\n[Cas 1 — Deux alertes actives dans la même zone sans inhibition]\nALERT_GROUP: key=eu-1 count=2 alerts=DBDown,WebDown\n\n\n[Cas 2 — Silence global éliminant toutes les alertes de test]\nALERT_GROUP: key=NONE count=0 alerts=NONE\n\n\n[Cas 3 — Deux clusters de production distincts]\nALERT_GROUP: key=alpha count=1 alerts=ApiSlow\nALERT_GROUP: key=beta count=1 alerts=WorkerDown"
  }
];
