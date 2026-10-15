/**
 * server/exercises/b3-supervision/chapitre3.js — Exercices du Chapitre 3
 * Chapitre 3 : Supervision Systèmes & Réseaux avec Zabbix & Nagios
 */

module.exports = [
  {
    id: 'sup3-c3-e1',
    chapter: 3,
    title: 'Analyseur de Sortie Plugin Nagios et Métriques Perfdata',
    level: 'n1',
    language: 'python',
    goal: 'Interpréter le code de retour d\'un plugin Nagios et extraire les données de performance (perfdata) normalisées.',
    brief: `<p>L'architecture de supervision Nagios/Centreon standardise la communication des plugins :<br><br>
1. <strong>Code de retour</strong> :<br>
- <code>0</code> : <code>OK</code><br>
- <code>1</code> : <code>WARNING</code><br>
- <code>2</code> : <code>CRITICAL</code><br>
- <code>3</code> : <code>UNKNOWN</code><br><br>
2. <strong>Structure de la sortie</strong> :<br>
<code>MESSAGE_TEXT | PERFDATA</code> (le caractère tube sépare le message humain des métriques machine).<br>
Dans la section Perfdata, chaque métrique suit le format : <code>label=valeur[uom];[warn];[crit];[min];[max]</code>.<br><br>
Entrée STDIN : <code>NAGIOS_PLUGIN CODE=&lt;0..3&gt; OUTPUT=&lt;texte|perfdata&gt;</code>.<br>
Sortie : <code>NAGIOS: status=&lt;OK|WARNING|CRITICAL|UNKNOWN&gt; message=&lt;msg&gt; metrics=&lt;label1=valeur1,label2=valeur2...|NONE&gt;</code>.</p>`,
    starter: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : décoder le code de statut Nagios et extraire le message et les métriques
`,
    hints: [
      "Isolez la section message et la section perfdata autour du caractère '|'.",
      "Pour chaque élément perfdata, extrayez la partie label=valeur (avant le premier point-virgule)."
    ],
    examples: [
      {
        stdin: 'NAGIOS_PLUGIN CODE=1 OUTPUT=DISK WARNING - free space: / 15% (15GB/100GB)|/=85GB;80;90;0;100 /var=40GB;70;85;0;100',
        expected: 'NAGIOS: status=WARNING message=DISK WARNING - free space: / 15% (15GB/100GB) metrics=/=85GB,/var=40GB',
        note: "Statut WARNING et extraction de deux partitions disques."
      }
    ],
    tests: [
      {
        label: 'Ping nominal OK avec deux métriques',
        stdin: 'NAGIOS_PLUGIN CODE=0 OUTPUT=PING OK - Packet loss = 0%, RTA = 1.25 ms|rta=1.25ms;200.00;500.00;0; pl=0%;40;80;0;100',
        expected: 'NAGIOS: status=OK message=PING OK - Packet loss = 0%, RTA = 1.25 ms metrics=rta=1.25ms,pl=0%\n'
      },
      {
        label: 'Erreur critique sans perfdata',
        stdin: 'NAGIOS_PLUGIN CODE=2 OUTPUT=CRITICAL - Socket connection timeout after 10 seconds',
        expected: 'NAGIOS: status=CRITICAL message=CRITICAL - Socket connection timeout after 10 seconds metrics=NONE\n'
      },
      {
        label: 'Service inconnu UNKNOWN avec code 3',
        stdin: 'NAGIOS_PLUGIN CODE=3 OUTPUT=UNKNOWN - Invalid command line arguments',
        expected: 'NAGIOS: status=UNKNOWN message=UNKNOWN - Invalid command line arguments metrics=NONE\n'
      }
    ],
    solution: `import sys
import re

STATUS_MAP = {
    "0": "OK",
    "1": "WARNING",
    "2": "CRITICAL",
    "3": "UNKNOWN"
}

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for ligne in lignes:
    if not ligne.startswith("NAGIOS_PLUGIN "):
        continue
    content = ligne.split("NAGIOS_PLUGIN ", 1)[1].strip()
    m_code = re.search(r'CODE=(\\d+)', content)
    m_out = re.search(r'OUTPUT=(.*)', content)

    if not m_code or not m_out:
        continue

    code_str = m_code.group(1)
    status = STATUS_MAP.get(code_str, "UNKNOWN")
    raw_output = m_out.group(1).strip()

    if "|" in raw_output:
        msg_part, perf_part = raw_output.split("|", 1)
    else:
        msg_part, perf_part = raw_output, ""

    message = msg_part.strip()
    metrics_list = []

    if perf_part.strip():
        tokens = perf_part.strip().split()
        for tok in tokens:
            cleaned = tok.split(";")[0].strip()
            if "=" in cleaned:
                metrics_list.append(cleaned)

    metrics_str = ",".join(metrics_list) if metrics_list else "NONE"
    print(f"NAGIOS: status={status} message={message} metrics={metrics_str}")
`
  },
  {
    id: 'sup3-c3-e2',
    chapter: 3,
    title: 'Moteur d’Évaluation des Déclencheurs Zabbix (Triggers)',
    level: 'n2',
    language: 'python',
    goal: 'Évaluer une fonction temporelle de trigger Zabbix (avg, last, min, max) et calculer l\'état d\'alarme et son niveau de sévérité.',
    brief: `<p>Dans Zabbix, un déclencheur calcule dynamiquement l'état d'un équipement à partir d'une suite de valeurs collectées :<br><br>
Fonctions supportées :<br>
- <code>avg</code> : Moyenne arithmétique de la liste.<br>
- <code>last</code> : Dernière valeur observée (dernier élément de la liste).<br>
- <code>min</code> : Valeur minimale observée.<br>
- <code>max</code> : Valeur maximale observée.<br><br>
Opérateurs : <code>GT</code> (&gt;), <code>GTE</code> (&gt;=), <code>LT</code> (&lt;), <code>LTE</code> (&lt;=), <code>EQ</code> (==).<br><br>
Sévérité :<br>
- Si l'alarme se déclenche (<code>fired=YES</code>) :<br>
  - Si <code>computed &gt;= 90.0</code> : <code>DISASTER</code><br>
  - Sinon si <code>computed &gt;= 75.0</code> : <code>HIGH</code><br>
  - Sinon : <code>WARNING</code><br>
- Si l'alarme ne se déclenche pas : <code>fired=NO</code> et <code>severity=OK</code>.<br><br>
Entrée STDIN : <code>ZABBIX_TRIGGER ITEM=&lt;clef&gt; FN=&lt;avg|last|min|max&gt; OP=&lt;GT|GTE|LT|LTE|EQ&gt; THRESHOLD=&lt;seuil&gt; VALUES=&lt;v1,v2,...&gt;</code>.<br>
Sortie : <code>ZABBIX: item=&lt;ITEM&gt; computed=&lt;val:.2f&gt; fired=&lt;YES|NO&gt; severity=&lt;DISASTER|HIGH|WARNING|OK&gt;</code>.</p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer la fonction statistique, évaluer l'opérateur et déduire la sévérité
`,
    hints: [
      "Convertissez les valeurs d'historique en liste de floats.",
      "Calculez la métrique selon la fonction demandée puis appliquez l'opérateur de comparaison."
    ],
    examples: [
      {
        stdin: 'ZABBIX_TRIGGER ITEM=system.cpu.load FN=avg OP=GT THRESHOLD=75.0 VALUES=65.0,72.5,80.0,85.5,92.0',
        expected: 'ZABBIX: item=system.cpu.load computed=79.00 fired=YES severity=HIGH',
        note: "Moyenne égale à 79.00 > 75.0 déclenche une alerte HIGH."
      }
    ],
    tests: [
      {
        label: 'Alerte DISASTER sur pic mémoire last >= 90',
        stdin: 'ZABBIX_TRIGGER ITEM=vm.memory.util FN=last OP=GTE THRESHOLD=90.0 VALUES=70.0,82.0,94.5',
        expected: 'ZABBIX: item=vm.memory.util computed=94.50 fired=YES severity=DISASTER\n'
      },
      {
        label: 'Aucune alerte car min inférieur au seuil',
        stdin: 'ZABBIX_TRIGGER ITEM=net.if.in FN=min OP=GT THRESHOLD=50.0 VALUES=45.0,60.0,75.0',
        expected: 'ZABBIX: item=net.if.in computed=45.00 fired=NO severity=OK\n'
      },
      {
        label: 'Alerte WARNING modérée sous 75%',
        stdin: 'ZABBIX_TRIGGER ITEM=disk.space.used FN=max OP=GTE THRESHOLD=60.0 VALUES=55.0,65.0,70.0',
        expected: 'ZABBIX: item=disk.space.used computed=70.00 fired=YES severity=WARNING\n'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for ligne in lignes:
    if not ligne.startswith("ZABBIX_TRIGGER "):
        continue
    parts = ligne.split("ZABBIX_TRIGGER ", 1)[1].strip().split()
    params = {}
    for p in parts:
        if "=" in p:
            k, v = p.split("=", 1)
            params[k] = v

    item = params.get("ITEM", "unknown")
    fn = params.get("FN", "last").lower()
    op = params.get("OP", "GT").upper()
    threshold = float(params.get("THRESHOLD", "0.0"))
    values = [float(x.strip()) for x in params.get("VALUES", "0").split(",") if x.strip()]

    if not values:
        continue

    if fn == "avg":
        computed = sum(values) / len(values)
    elif fn == "last":
        computed = values[-1]
    elif fn == "min":
        computed = min(values)
    elif fn == "max":
        computed = max(values)
    else:
        computed = values[-1]

    fired = False
    if op == "GT":
        fired = computed > threshold
    elif op == "GTE":
        fired = computed >= threshold
    elif op == "LT":
        fired = computed < threshold
    elif op == "LTE":
        fired = computed <= threshold
    elif op == "EQ":
        fired = computed == threshold

    if fired:
        fired_str = "YES"
        if computed >= 90.0:
            sev = "DISASTER"
        elif computed >= 75.0:
            sev = "HIGH"
        else:
            sev = "WARNING"
    else:
        fired_str = "NO"
        sev = "OK"

    print(f"ZABBIX: item={item} computed={computed:.2f} fired={fired_str} severity={sev}")
`
  },
  {
    id: 'sup3-c3-e3',
    chapter: 3,
    title: 'Moteur d’Escalade et Traitement des Acquittements d’Incidents',
    level: 'n3',
    language: 'python',
    goal: 'Ordonnancer les paliers d\'escalade de notifications selon le temps d\'indisponibilité non acquitté.',
    brief: `<p>Pour garantir la prise en charge rapide des pannes, les systèmes de supervision automatisent l'escalade :<br><br>
Règles temporelles d'escalade (si <code>ACK=NO</code>) :<br>
- <code>DURATION_MIN &gt;= 30</code> : <code>STAGE=3 CHANNEL=SMS TARGET=manager-on-call</code>.<br>
- <code>DURATION_MIN &gt;= 15</code> : <code>STAGE=2 CHANNEL=SLACK TARGET=#astreinte-infra</code>.<br>
- Sinon (<code>DURATION_MIN &lt; 15</code>) : <code>STAGE=1 CHANNEL=EMAIL TARGET=noc-team@corp.local</code>.<br>
- Dans ces cas, le statut vaut <code>ESCALATING</code>.<br><br>
Si l'incident est acquitté (<code>ACK=YES</code>) :<br>
- Les notifications automatiques sont immédiatement suspendues : <code>STAGE=0 CHANNEL=NONE TARGET=NONE status=PAUSED_ACKNOWLEDGED</code>.<br><br>
Entrée STDIN : <code>ALERT_ESCALATE INCIDENT=&lt;id&gt; DURATION_MIN=&lt;min&gt; ACK=&lt;YES|NO&gt;</code>.<br>
Sortie : <code>ESCALATION: incident=&lt;id&gt; stage=&lt;STAGE&gt; channel=&lt;CHANNEL&gt; target=&lt;TARGET&gt; status=&lt;ESCALATING|PAUSED_ACKNOWLEDGED&gt;</code>.</p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : déterminer l'échelon d'escalade et le statut de notification
`,
    hints: [
      "Vérifiez d'abord si l'incident est acquitté (ACK=YES).",
      "Si non acquitté, testez les seuils de 30 minutes, puis 15 minutes, puis le palier initial."
    ],
    examples: [
      {
        stdin: 'ALERT_ESCALATE INCIDENT=INC-8902 DURATION_MIN=20 ACK=NO',
        expected: 'ESCALATION: incident=INC-8902 stage=2 channel=SLACK target=#astreinte-infra status=ESCALATING',
        note: "20 minutes non acquitté déclenche l'échelon 2 sur Slack."
      }
    ],
    tests: [
      {
        label: 'Escalade maximale vers manager après 45 minutes sans réponse',
        stdin: 'ALERT_ESCALATE INCIDENT=INC-8903 DURATION_MIN=45 ACK=NO',
        expected: 'ESCALATION: incident=INC-8903 stage=3 channel=SMS target=manager-on-call status=ESCALATING\n'
      },
      {
        label: 'Notification initiale niveau 1 dans les premières minutes',
        stdin: 'ALERT_ESCALATE INCIDENT=INC-8901 DURATION_MIN=5 ACK=NO',
        expected: 'ESCALATION: incident=INC-8901 stage=1 channel=EMAIL target=noc-team@corp.local status=ESCALATING\n'
      },
      {
        label: 'Incident acquitté par l exploitant suspension des alertes',
        stdin: 'ALERT_ESCALATE INCIDENT=INC-8904 DURATION_MIN=25 ACK=YES',
        expected: 'ESCALATION: incident=INC-8904 stage=0 channel=NONE target=NONE status=PAUSED_ACKNOWLEDGED\n'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for ligne in lignes:
    if not ligne.startswith("ALERT_ESCALATE "):
        continue
    parts = ligne.split("ALERT_ESCALATE ", 1)[1].strip().split()
    params = {}
    for p in parts:
        if "=" in p:
            k, v = p.split("=", 1)
            params[k] = v

    inc_id = params.get("INCIDENT", "unknown")
    duration = int(params.get("DURATION_MIN", "0"))
    ack = params.get("ACK", "NO").upper() == "YES"

    if ack:
        stage = 0
        channel = "NONE"
        target = "NONE"
        status = "PAUSED_ACKNOWLEDGED"
    else:
        status = "ESCALATING"
        if duration >= 30:
            stage = 3
            channel = "SMS"
            target = "manager-on-call"
        elif duration >= 15:
            stage = 2
            channel = "SLACK"
            target = "#astreinte-infra"
        else:
            stage = 1
            channel = "EMAIL"
            target = "noc-team@corp.local"

    print(f"ESCALATION: incident={inc_id} stage={stage} channel={channel} target={target} status={status}")
`
  }
];
