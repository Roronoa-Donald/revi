/**
 * server/exercises/b3-supervision/chapitre4.js — Exercices du Chapitre 4
 * Chapitre 4 : Métrologie & Observabilité Moderne avec Prometheus & Grafana
 */

module.exports = [
  {
    id: 'sup3-c4-e1',
    chapter: 4,
    title: 'Parseur de Format d’Exposition Métrique Prometheus',
    level: 'n1',
    language: 'python',
    goal: 'Analyser une ligne d\'échantillon de métrique Prometheus OpenMetrics et extraire son nom, ses labels et sa valeur numérique.',
    brief: `<p>Prometheus collecte ses métriques sous forme de flux textuel structuré :<br><br>
Format d'un échantillon :<br>
<code>metric_name{label1="val1",label2="val2"} 1234.56</code><br>
ou sans label :<br>
<code>metric_name 1048576</code><br><br>
Entrée STDIN : <code>PROM_PARSE &lt;ligne_echantillon&gt;</code>.<br>
Sortie : <code>METRIC: name=&lt;name&gt; labels=&lt;k1=v1,k2=v2|NONE&gt; value=&lt;val&gt;</code>.<br>
(Les étiquettes sont triées par nom alphabétique en sortie).</p>`,
    starter: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : parser l'échantillon Prometheus et formater la sortie
`,
    hints: [
      "Utilisez une expression régulière pour séparer le nom, le bloc de labels entre accolades et la valeur.",
      "Triez les paires de labels par ordre alphabétique de leurs clés."
    ],
    examples: [
      {
        stdin: 'PROM_PARSE http_requests_total{method="GET",handler="/api"} 1027',
        expected: 'METRIC: name=http_requests_total labels=handler=/api,method=GET value=1027',
        note: "Extraction du nom de métrique et des deux labels triés par ordre alphabétique."
      }
    ],
    tests: [
      {
        label: 'Métrique sans label mémoire vive libre',
        stdin: 'PROM_PARSE node_memory_MemFree_bytes 1048576',
        expected: 'METRIC: name=node_memory_MemFree_bytes labels=NONE value=1048576\n'
      },
      {
        label: 'Métrique avec valeur flottante et label unique',
        stdin: 'PROM_PARSE cpu_temperature_celsius{core="0"} 45.5',
        expected: 'METRIC: name=cpu_temperature_celsius labels=core=0 value=45.5\n'
      },
      {
        label: 'Métrique up avec instance et job',
        stdin: 'PROM_PARSE up{job="node-exporter",instance="10.0.0.1:9100"} 1',
        expected: 'METRIC: name=up labels=instance=10.0.0.1:9100,job=node-exporter value=1\n'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for ligne in lignes:
    if not ligne.startswith("PROM_PARSE "):
        continue
    sample = ligne.split("PROM_PARSE ", 1)[1].strip()

    m = re.match(r'^([a-zA-Z_:][a-zA-Z0-9_:]*)(?:\\{([^}]*)\\})?\\s+([+-]?[0-9]*\\.?[0-9]+(?:[eE][+-]?[0-9]+)?)$', sample)
    if not m:
        continue

    m_name = m.group(1)
    raw_labels = m.group(2)
    val = m.group(3)

    if raw_labels and raw_labels.strip():
        pairs = re.findall(r'([a-zA-Z_][a-zA-Z0-9_]*)\\s*=\\s*"([^"]*)"', raw_labels)
        pairs.sort(key=lambda x: x[0])
        labels_str = ",".join(f"{k}={v}" for k, v in pairs)
    else:
        labels_str = "NONE"

    print(f"METRIC: name={m_name} labels={labels_str} value={val}")
`
  },
  {
    id: 'sup3-c4-e2',
    chapter: 4,
    title: 'Moteur de Calcul PromQL rate() et Agrégation sum by()',
    level: 'n2',
    language: 'python',
    goal: 'Calculer le taux d\'accroissement par seconde d\'un compteur avec gestion des réinitialisations, puis agréger par étiquette.',
    brief: `<p>En PromQL, <code>rate(v[interval])</code> calcule la dérivée par seconde :<br><br>
1. <strong>Taux par seconde</strong> :<br>
Si <code>final &gt;= init</code> : <code>delta = final - init</code>.<br>
Si <code>final &lt; init</code> (redémarrage / compteur reset) : <code>delta = final</code>.<br>
<code>taux = delta / interval</code>.<br><br>
2. <strong>Agrégation sum by (LABEL)</strong> :<br>
Somme des taux pour chaque valeur distincte de l'étiquette cible <code>GROUP</code>.<br><br>
Entrée STDIN : <code>PROMQL_RATE INTERVAL=&lt;sec&gt; GROUP=&lt;label&gt; SERIES=&lt;init:final:lbl=val,lbl=val&gt; [SERIES=...]</code>.<br>
Sortie : <code>PROMQL: rates=[&lt;s1_taux:.2f&gt;,&lt;s2_taux:.2f&gt;] sum_by={&lt;val1&gt;:&lt;tot1:.2f&gt;,&lt;val2&gt;:&lt;tot2:.2f&gt;}</code> (clés de sum_by triées par ordre alphabétique).</p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer les taux individuels et la somme groupée par label
`,
    hints: [
      "Isolez les paramètres INTERVAL, GROUP et chaque argument SERIES.",
      "Gérez le reset du compteur si final < init."
    ],
    examples: [
      {
        stdin: 'PROMQL_RATE INTERVAL=300 GROUP=status SERIES=1000:2500:service=cart,status=200 SERIES=500:1100:service=auth,status=200 SERIES=10:70:service=cart,status=500',
        expected: 'PROMQL: rates=[5.00,2.00,0.20] sum_by={200:7.00,500:0.20}',
        note: "Calcul des requêtes par seconde et somme groupée par code de statut HTTP."
      }
    ],
    tests: [
      {
        label: 'Deux séries de production sur intervalle 60 secondes',
        stdin: 'PROMQL_RATE INTERVAL=60 GROUP=env SERIES=120:180:env=prod,host=srv1 SERIES=200:320:env=prod,host=srv2',
        expected: 'PROMQL: rates=[1.00,2.00] sum_by={prod:3.00}\n'
      },
      {
        label: 'Série unique avec réinitialisation de compteur',
        stdin: 'PROMQL_RATE INTERVAL=120 GROUP=service SERIES=500:200:service=payment',
        expected: 'PROMQL: rates=[1.67] sum_by={payment:1.67}\n'
      },
      {
        label: 'Deux groupes distincts frontend et backend',
        stdin: 'PROMQL_RATE INTERVAL=100 GROUP=tier SERIES=100:300:tier=front SERIES=50:250:tier=back SERIES=0:100:tier=front',
        expected: 'PROMQL: rates=[2.00,2.00,1.00] sum_by={back:2.00,front:3.00}\n'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for ligne in lignes:
    if not ligne.startswith("PROMQL_RATE "):
        continue
    parts = ligne.split("PROMQL_RATE ", 1)[1].strip().split()
    interval = 60.0
    group_key = "status"
    series_tokens = []

    for p in parts:
        if p.startswith("INTERVAL="):
            interval = float(p.split("=", 1)[1])
        elif p.startswith("GROUP="):
            group_key = p.split("=", 1)[1]
        elif p.startswith("SERIES="):
            series_tokens.append(p.split("=", 1)[1])

    rates = []
    sums = {}

    for s in series_tokens:
        s_parts = s.split(":", 2)
        init_val = float(s_parts[0])
        final_val = float(s_parts[1])
        raw_labels = s_parts[2] if len(s_parts) > 2 else ""

        delta = final_val if final_val < init_val else (final_val - init_val)
        rate = delta / interval if interval > 0 else 0.0
        rates.append(f"{rate:.2f}")

        # extraction du label cible
        grp_val = "unknown"
        for item in raw_labels.split(","):
            if "=" in item:
                k, v = item.split("=", 1)
                if k == group_key:
                    grp_val = v
                    break

        sums[grp_val] = sums.get(grp_val, 0.0) + rate

    rates_str = f"[{','.join(rates)}]"
    sum_items = [f"{k}:{sums[k]:.2f}" for k in sorted(sums.keys())]
    sum_str = f"{{{','.join(sum_items)}}}"

    print(f"PROMQL: rates={rates_str} sum_by={sum_str}")
`
  },
  {
    id: 'sup3-c4-e3',
    chapter: 4,
    title: 'Routeur de Notifications Alertmanager (Grouping & Silences)',
    level: 'n3',
    language: 'python',
    goal: 'Filtrer les alertes actives via les silences et règles d\'inhibition puis regrouper les notifications.',
    brief: `<p>Alertmanager évite la surcharge d'alertes en combinant filtrage et groupement :<br><br>
1. <strong>Silences</strong> : Si un silence actif <code>SILENCE=k=v</code> correspond à un label de l'alerte, celle-ci est ignorée.<br>
2. <strong>Inhibition</strong> : Si <code>INHIBIT=src:tgt:equal_key</code> est défini, toute alerte <code>tgt</code> est supprimée s'il existe une alerte <code>src</code> active ayant la même valeur sur le label <code>equal_key</code>.<br>
3. <strong>Groupement</strong> : Les alertes conservées sont regroupées par la valeur de l'étiquette <code>GROUP_BY</code>.<br><br>
Entrée STDIN : <code>ALERT_ROUTE GROUP_BY=&lt;key&gt; SILENCE=&lt;k=v|NONE&gt; INHIBIT=&lt;src:tgt:eq|NONE&gt; ALERTS=&lt;name1:k=v,k=v|name2:...&gt;</code>.<br>
Sortie : Pour chaque groupe (dans l'ordre alphabétique des valeurs du label groupé) :<br>
<code>ALERT_GROUP: key=&lt;val&gt; count=&lt;n&gt; alerts=&lt;nom1,nom2...&gt;</code> (si aucune alerte : <code>ALERT_GROUP: key=NONE count=0 alerts=NONE</code>).</p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : appliquer les règles de silence, d'inhibition et de regroupement
`,
    hints: [
      "Supprimez d'abord les alertes matchant le silence.",
      "Vérifiez ensuite si les alertes restantes sont inhibées par une alerte source active.",
      "Regroupez par la clef GROUP_BY et affichez chaque groupe."
    ],
    examples: [
      {
        stdin: 'ALERT_ROUTE GROUP_BY=cluster SILENCE=cluster=dev INHIBIT=NodeDown:InstanceHighCpu:node ALERTS=NodeDown:alertname=NodeDown,node=srv1,cluster=prod|InstanceHighCpu:alertname=InstanceHighCpu,node=srv1,cluster=prod|DiskFull:alertname=DiskFull,node=srv2,cluster=dev',
        expected: 'ALERT_GROUP: key=prod count=1 alerts=NodeDown',
        note: "DiskFull est sous silence (dev) et InstanceHighCpu est inhibé par NodeDown sur srv1."
      }
    ],
    tests: [
      {
        label: 'Deux alertes actives dans la même zone sans inhibition',
        stdin: 'ALERT_ROUTE GROUP_BY=zone SILENCE=NONE INHIBIT=NONE ALERTS=DBDown:alertname=DBDown,zone=eu-1|WebDown:alertname=WebDown,zone=eu-1',
        expected: 'ALERT_GROUP: key=eu-1 count=2 alerts=DBDown,WebDown\n'
      },
      {
        label: 'Silence global éliminant toutes les alertes de test',
        stdin: 'ALERT_ROUTE GROUP_BY=env SILENCE=env=test INHIBIT=NONE ALERTS=TestAlert:alertname=TestAlert,env=test',
        expected: 'ALERT_GROUP: key=NONE count=0 alerts=NONE\n'
      },
      {
        label: 'Deux clusters de production distincts',
        stdin: 'ALERT_ROUTE GROUP_BY=cluster SILENCE=NONE INHIBIT=NONE ALERTS=ApiSlow:alertname=ApiSlow,cluster=alpha|WorkerDown:alertname=WorkerDown,cluster=beta',
        expected: 'ALERT_GROUP: key=alpha count=1 alerts=ApiSlow\nALERT_GROUP: key=beta count=1 alerts=WorkerDown\n'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for ligne in lignes:
    if not ligne.startswith("ALERT_ROUTE "):
        continue
    parts = ligne.split("ALERT_ROUTE ", 1)[1].strip().split()
    params = {}
    for p in parts:
        if "=" in p:
            k, v = p.split("=", 1)
            params[k] = v

    group_by = params.get("GROUP_BY", "cluster")
    silence_str = params.get("SILENCE", "NONE")
    inhibit_str = params.get("INHIBIT", "NONE")
    raw_alerts = params.get("ALERTS", "")

    # Parsing des alertes
    alert_list = []
    if raw_alerts:
        for a_token in raw_alerts.split("|"):
            if not a_token.strip():
                continue
            colon_idx = a_token.find(":")
            if colon_idx != -1:
                name = a_token[:colon_idx].strip()
                labels_raw = a_token[colon_idx + 1:].strip()
            else:
                name = a_token.strip()
                labels_raw = ""
            lbls = {}
            for item in labels_raw.split(","):
                if "=" in item:
                    k, v = item.split("=", 1)
                    lbls[k.strip()] = v.strip()
            alert_list.append({"name": name, "labels": lbls})

    # 1. Silences
    survived_silence = []
    if silence_str != "NONE" and "=" in silence_str:
        s_k, s_v = silence_str.split("=", 1)
        for a in alert_list:
            if a["labels"].get(s_k) != s_v:
                survived_silence.append(a)
    else:
        survived_silence = alert_list

    # 2. Inhibition
    survived_inhibit = []
    if inhibit_str != "NONE" and ":" in inhibit_str:
        src_alert, tgt_alert, eq_key = inhibit_str.split(":", 2)
        # vérifier alertes sources actives
        src_eq_values = set()
        for a in survived_silence:
            if a["name"] == src_alert and eq_key in a["labels"]:
                src_eq_values.add(a["labels"][eq_key])

        for a in survived_silence:
            if a["name"] == tgt_alert and a["labels"].get(eq_key) in src_eq_values:
                continue # inhibé !
            survived_inhibit.append(a)
    else:
        survived_inhibit = survived_silence

    # 3. Groupement
    groups = {}
    for a in survived_inhibit:
        g_val = a["labels"].get(group_by, "unknown")
        if g_val not in groups:
            groups[g_val] = []
        groups[g_val].append(a["name"])

    if not groups:
        print("ALERT_GROUP: key=NONE count=0 alerts=NONE")
    else:
        for g_val in sorted(groups.keys()):
            names = groups[g_val]
            print(f"ALERT_GROUP: key={g_val} count={len(names)} alerts={','.join(names)}")
`
  }
];
