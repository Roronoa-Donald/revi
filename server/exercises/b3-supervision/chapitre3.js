'use strict';

module.exports = [
  {
    "id": "sup3-c3-e1",
    "chapter": 3,
    "title": "Analyseur de Sortie Plugin Nagios et Métriques Perfdata",
    "level": "n1",
    "language": "analyse",
    "goal": "Interpréter le code de retour d'un plugin Nagios et extraire les données de performance (perfdata) normalisées.",
    "brief": "<p>L'architecture de supervision Nagios/Centreon standardise la communication des plugins :<br><br>\n1. <strong>Code de retour</strong> :<br>\n- <code>0</code> : <code>OK</code><br>\n- <code>1</code> : <code>WARNING</code><br>\n- <code>2</code> : <code>CRITICAL</code><br>\n- <code>3</code> : <code>UNKNOWN</code><br><br>\n2. <strong>Structure de la sortie</strong> :<br>\n<code>MESSAGE_TEXT | PERFDATA</code> (le caractère tube sépare le message humain des métriques machine).<br>\nDans la section Perfdata, chaque métrique suit le format : <code>label=valeur[uom];[warn];[crit];[min];[max]</code>.<br><br>\nDonnées du cas : <code>NAGIOS_PLUGIN CODE=&lt;0..3&gt; OUTPUT=&lt;texte|perfdata&gt;</code>.<br>\nRésultat d’analyse attendu : <code>NAGIOS: status=&lt;OK|WARNING|CRITICAL|UNKNOWN&gt; message=&lt;msg&gt; metrics=&lt;label1=valeur1,label2=valeur2...|NONE&gt;</code>.</p>",
    "starter": "# Grille d'analyse (sup3-c3-e1) — Analyseur de Sortie Plugin Nagios et Métriques Perfdata\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Ping nominal OK avec deux métriques]\n# Données : NAGIOS_PLUGIN CODE=0 OUTPUT=PING OK - Packet loss = 0%, RTA = 1.25 ms|rta=1.25ms;200.00;500.00;0; pl=0%;40;80;0;100\nA_COMPLETER\n\n[Cas 2 — Erreur critique sans perfdata]\n# Données : NAGIOS_PLUGIN CODE=2 OUTPUT=CRITICAL - Socket connection timeout after 10 seconds\nA_COMPLETER\n\n[Cas 3 — Service inconnu UNKNOWN avec code 3]\n# Données : NAGIOS_PLUGIN CODE=3 OUTPUT=UNKNOWN - Invalid command line arguments\nA_COMPLETER\n",
    "hints": [
      "Isolez la section message et la section perfdata autour du caractère '|'.",
      "Pour chaque élément perfdata, extrayez la partie label=valeur (avant le premier point-virgule)."
    ],
    "examples": [
      {
        "stdin": "NAGIOS_PLUGIN CODE=1 OUTPUT=DISK WARNING - free space: / 15% (15GB/100GB)|/=85GB;80;90;0;100 /var=40GB;70;85;0;100",
        "expected": "NAGIOS: status=WARNING message=DISK WARNING - free space: / 15% (15GB/100GB) metrics=/=85GB,/var=40GB",
        "note": "Statut WARNING et extraction de deux partitions disques."
      }
    ],
    "tests": [
      {
        "label": "Ping nominal OK avec deux métriques",
        "stdin": "cas:1",
        "expected": "NAGIOS: status=OK message=PING OK - Packet loss = 0%, RTA = 1.25 ms metrics=rta=1.25ms,pl=0%\n"
      },
      {
        "label": "Erreur critique sans perfdata",
        "stdin": "cas:2",
        "expected": "NAGIOS: status=CRITICAL message=CRITICAL - Socket connection timeout after 10 seconds metrics=NONE\n"
      },
      {
        "label": "Service inconnu UNKNOWN avec code 3",
        "stdin": "cas:3",
        "expected": "NAGIOS: status=UNKNOWN message=UNKNOWN - Invalid command line arguments metrics=NONE\n"
      }
    ],
    "solution": "[Exemple]\nNAGIOS: status=WARNING message=DISK WARNING - free space: / 15% (15GB/100GB) metrics=/=85GB,/var=40GB\n\n[Cas 1 — Ping nominal OK avec deux métriques]\nNAGIOS: status=OK message=PING OK - Packet loss = 0%, RTA = 1.25 ms metrics=rta=1.25ms,pl=0%\n\n\n[Cas 2 — Erreur critique sans perfdata]\nNAGIOS: status=CRITICAL message=CRITICAL - Socket connection timeout after 10 seconds metrics=NONE\n\n\n[Cas 3 — Service inconnu UNKNOWN avec code 3]\nNAGIOS: status=UNKNOWN message=UNKNOWN - Invalid command line arguments metrics=NONE"
  },
  {
    "id": "sup3-c3-e2",
    "chapter": 3,
    "title": "Moteur d’Évaluation des Déclencheurs Zabbix (Triggers)",
    "level": "n2",
    "language": "analyse",
    "goal": "Évaluer une fonction temporelle de trigger Zabbix (avg, last, min, max) et calculer l'état d'alarme et son niveau de sévérité.",
    "brief": "<p>Dans Zabbix, un déclencheur calcule dynamiquement l'état d'un équipement à partir d'une suite de valeurs collectées :<br><br>\nFonctions supportées :<br>\n- <code>avg</code> : Moyenne arithmétique de la liste.<br>\n- <code>last</code> : Dernière valeur observée (dernier élément de la liste).<br>\n- <code>min</code> : Valeur minimale observée.<br>\n- <code>max</code> : Valeur maximale observée.<br><br>\nOpérateurs : <code>GT</code> (&gt;), <code>GTE</code> (&gt;=), <code>LT</code> (&lt;), <code>LTE</code> (&lt;=), <code>EQ</code> (==).<br><br>\nSévérité :<br>\n- Si l'alarme se déclenche (<code>fired=YES</code>) :<br>\n  - Si <code>computed &gt;= 90.0</code> : <code>DISASTER</code><br>\n  - Sinon si <code>computed &gt;= 75.0</code> : <code>HIGH</code><br>\n  - Sinon : <code>WARNING</code><br>\n- Si l'alarme ne se déclenche pas : <code>fired=NO</code> et <code>severity=OK</code>.<br><br>\nDonnées du cas : <code>ZABBIX_TRIGGER ITEM=&lt;clef&gt; FN=&lt;avg|last|min|max&gt; OP=&lt;GT|GTE|LT|LTE|EQ&gt; THRESHOLD=&lt;seuil&gt; VALUES=&lt;v1,v2,...&gt;</code>.<br>\nRésultat d’analyse attendu : <code>ZABBIX: item=&lt;ITEM&gt; computed=&lt;val:.2f&gt; fired=&lt;YES|NO&gt; severity=&lt;DISASTER|HIGH|WARNING|OK&gt;</code>.</p>",
    "starter": "# Grille d'analyse (sup3-c3-e2) — Moteur d’Évaluation des Déclencheurs Zabbix (Triggers)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Alerte DISASTER sur pic mémoire last >= 90]\n# Données : ZABBIX_TRIGGER ITEM=vm.memory.util FN=last OP=GTE THRESHOLD=90.0 VALUES=70.0,82.0,94.5\nA_COMPLETER\n\n[Cas 2 — Aucune alerte car min inférieur au seuil]\n# Données : ZABBIX_TRIGGER ITEM=net.if.in FN=min OP=GT THRESHOLD=50.0 VALUES=45.0,60.0,75.0\nA_COMPLETER\n\n[Cas 3 — Alerte WARNING modérée sous 75%]\n# Données : ZABBIX_TRIGGER ITEM=disk.space.used FN=max OP=GTE THRESHOLD=60.0 VALUES=55.0,65.0,70.0\nA_COMPLETER\n",
    "hints": [
      "Convertissez les valeurs d'historique en liste de floats.",
      "Calculez la métrique selon la fonction demandée puis appliquez l'opérateur de comparaison."
    ],
    "examples": [
      {
        "stdin": "ZABBIX_TRIGGER ITEM=system.cpu.load FN=avg OP=GT THRESHOLD=75.0 VALUES=65.0,72.5,80.0,85.5,92.0",
        "expected": "ZABBIX: item=system.cpu.load computed=79.00 fired=YES severity=HIGH",
        "note": "Moyenne égale à 79.00 > 75.0 déclenche une alerte HIGH."
      }
    ],
    "tests": [
      {
        "label": "Alerte DISASTER sur pic mémoire last >= 90",
        "stdin": "cas:1",
        "expected": "ZABBIX: item=vm.memory.util computed=94.50 fired=YES severity=DISASTER\n"
      },
      {
        "label": "Aucune alerte car min inférieur au seuil",
        "stdin": "cas:2",
        "expected": "ZABBIX: item=net.if.in computed=45.00 fired=NO severity=OK\n"
      },
      {
        "label": "Alerte WARNING modérée sous 75%",
        "stdin": "cas:3",
        "expected": "ZABBIX: item=disk.space.used computed=70.00 fired=YES severity=WARNING\n"
      }
    ],
    "solution": "[Exemple]\nZABBIX: item=system.cpu.load computed=79.00 fired=YES severity=HIGH\n\n[Cas 1 — Alerte DISASTER sur pic mémoire last >= 90]\nZABBIX: item=vm.memory.util computed=94.50 fired=YES severity=DISASTER\n\n\n[Cas 2 — Aucune alerte car min inférieur au seuil]\nZABBIX: item=net.if.in computed=45.00 fired=NO severity=OK\n\n\n[Cas 3 — Alerte WARNING modérée sous 75%]\nZABBIX: item=disk.space.used computed=70.00 fired=YES severity=WARNING"
  },
  {
    "id": "sup3-c3-e3",
    "chapter": 3,
    "title": "Moteur d’Escalade et Traitement des Acquittements d’Incidents",
    "level": "n3",
    "language": "analyse",
    "goal": "Ordonnancer les paliers d'escalade de notifications selon le temps d'indisponibilité non acquitté.",
    "brief": "<p>Pour garantir la prise en charge rapide des pannes, les systèmes de supervision automatisent l'escalade :<br><br>\nRègles temporelles d'escalade (si <code>ACK=NO</code>) :<br>\n- <code>DURATION_MIN &gt;= 30</code> : <code>STAGE=3 CHANNEL=SMS TARGET=manager-on-call</code>.<br>\n- <code>DURATION_MIN &gt;= 15</code> : <code>STAGE=2 CHANNEL=SLACK TARGET=#astreinte-infra</code>.<br>\n- Sinon (<code>DURATION_MIN &lt; 15</code>) : <code>STAGE=1 CHANNEL=EMAIL TARGET=noc-team@corp.local</code>.<br>\n- Dans ces cas, le statut vaut <code>ESCALATING</code>.<br><br>\nSi l'incident est acquitté (<code>ACK=YES</code>) :<br>\n- Les notifications automatiques sont immédiatement suspendues : <code>STAGE=0 CHANNEL=NONE TARGET=NONE status=PAUSED_ACKNOWLEDGED</code>.<br><br>\nDonnées du cas : <code>ALERT_ESCALATE INCIDENT=&lt;id&gt; DURATION_MIN=&lt;min&gt; ACK=&lt;YES|NO&gt;</code>.<br>\nRésultat d’analyse attendu : <code>ESCALATION: incident=&lt;id&gt; stage=&lt;STAGE&gt; channel=&lt;CHANNEL&gt; target=&lt;TARGET&gt; status=&lt;ESCALATING|PAUSED_ACKNOWLEDGED&gt;</code>.</p>",
    "starter": "# Grille d'analyse (sup3-c3-e3) — Moteur d’Escalade et Traitement des Acquittements d’Incidents\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Escalade maximale vers manager après 45 minutes sans réponse]\n# Données : ALERT_ESCALATE INCIDENT=INC-8903 DURATION_MIN=45 ACK=NO\nA_COMPLETER\n\n[Cas 2 — Notification initiale niveau 1 dans les premières minutes]\n# Données : ALERT_ESCALATE INCIDENT=INC-8901 DURATION_MIN=5 ACK=NO\nA_COMPLETER\n\n[Cas 3 — Incident acquitté par l exploitant suspension des alertes]\n# Données : ALERT_ESCALATE INCIDENT=INC-8904 DURATION_MIN=25 ACK=YES\nA_COMPLETER\n",
    "hints": [
      "Vérifiez d'abord si l'incident est acquitté (ACK=YES).",
      "Si non acquitté, testez les seuils de 30 minutes, puis 15 minutes, puis le palier initial."
    ],
    "examples": [
      {
        "stdin": "ALERT_ESCALATE INCIDENT=INC-8902 DURATION_MIN=20 ACK=NO",
        "expected": "ESCALATION: incident=INC-8902 stage=2 channel=SLACK target=#astreinte-infra status=ESCALATING",
        "note": "20 minutes non acquitté déclenche l'échelon 2 sur Slack."
      }
    ],
    "tests": [
      {
        "label": "Escalade maximale vers manager après 45 minutes sans réponse",
        "stdin": "cas:1",
        "expected": "ESCALATION: incident=INC-8903 stage=3 channel=SMS target=manager-on-call status=ESCALATING\n"
      },
      {
        "label": "Notification initiale niveau 1 dans les premières minutes",
        "stdin": "cas:2",
        "expected": "ESCALATION: incident=INC-8901 stage=1 channel=EMAIL target=noc-team@corp.local status=ESCALATING\n"
      },
      {
        "label": "Incident acquitté par l exploitant suspension des alertes",
        "stdin": "cas:3",
        "expected": "ESCALATION: incident=INC-8904 stage=0 channel=NONE target=NONE status=PAUSED_ACKNOWLEDGED\n"
      }
    ],
    "solution": "[Exemple]\nESCALATION: incident=INC-8902 stage=2 channel=SLACK target=#astreinte-infra status=ESCALATING\n\n[Cas 1 — Escalade maximale vers manager après 45 minutes sans réponse]\nESCALATION: incident=INC-8903 stage=3 channel=SMS target=manager-on-call status=ESCALATING\n\n\n[Cas 2 — Notification initiale niveau 1 dans les premières minutes]\nESCALATION: incident=INC-8901 stage=1 channel=EMAIL target=noc-team@corp.local status=ESCALATING\n\n\n[Cas 3 — Incident acquitté par l exploitant suspension des alertes]\nESCALATION: incident=INC-8904 stage=0 channel=NONE target=NONE status=PAUSED_ACKNOWLEDGED"
  }
];
