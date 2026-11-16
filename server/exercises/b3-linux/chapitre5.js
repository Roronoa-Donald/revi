'use strict';

module.exports = [
  {
    "id": "lx3-c5-e1",
    "chapter": 5,
    "title": "Validateur de topologie réseau virtuelle (veth pairs & Linux Bridge)",
    "level": "n1",
    "language": "shell",
    "goal": "Vérifier la cohérence de configuration des interfaces réseau virtuelles (veth) et des ponts sous Linux.",
    "brief": "<p>Sous Linux, la communication inter-conteneurs repose sur des paires d'interfaces virtuelles (<strong>veth pairs</strong>, sorte de câble réseau virtuel) connectées à un pont logiciel (<strong>Linux Bridge</strong>).<br><br>\nRègles de validation :<br>\n1. Un pont (<code>type=bridge</code>) ne peut pas être lui-même esclave d'un autre équipement (<code>master</code> doit valoir <code>NONE</code>). Sinon, erreur <code>BRIDGE_CANNOT_HAVE_MASTER</code>.<br>\n2. Une interface doit avoir son état activé (<code>state=UP</code>). Si <code>state=DOWN</code>, erreur <code>INTERFACE_DOWN</code>.<br>\n3. Une interface <code>veth</code> doit soit être rattachée à un pont maître (<code>master != NONE</code>), soit posséder une adresse IP (<code>ip != NONE</code>). Si les deux sont à <code>NONE</code>, erreur <code>VETH_UNATTACHED</code>.<br><br>\nLe script Bash lit les paramètres sur l’entrée standard (stdin).<br><br>\nPour chaque interface, afficher :<br>\n<code>NET_AUDIT iface={name} valid={OUI|NON} error={OK|motif}</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (lx3-c5-e1) — Validateur de topologie réseau virtuelle (veth pairs & Linux Bridge)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\n# Écrivez votre traitement Bash ci-dessous (affichage attendu sur stdout)\n",
    "hints": [
      "Tester les règles dans l’ordre : état UP, bridge sans master, veth avec master ou IP.",
      "Dès qu’une règle échoue, valid=NON avec l’erreur correspondante.",
      "1. Interface DOWN : INTERFACE_DOWN. 2. Pont avec master : BRIDGE_CANNOT_HAVE_MASTER. 3. Veth sans master ni IP : VETH_UNATTACHED. 4. Sinon valid=OUI et error=OK."
    ],
    "examples": [
      {
        "stdin": "NET_IFACE name=br0 type=bridge master=NONE ip=10.0.0.1/24 state=UP",
        "expected": "NET_AUDIT iface=br0 valid=OUI error=OK",
        "note": "Pont logiciel actif avec IP et sans maître : configuration conforme."
      }
    ],
    "tests": [
      {
        "label": "Rejet d’une interface éteinte (DOWN)",
        "stdin": "NET_IFACE name=veth_app type=veth master=br0 ip=NONE state=DOWN\nNET_IFACE name=veth_down type=veth master=NONE ip=NONE state=DOWN",
        "expected": "NET_AUDIT iface=veth_app valid=NON error=INTERFACE_DOWN\nNET_AUDIT iface=veth_down valid=NON error=INTERFACE_DOWN"
      },
      {
        "label": "Rejet d’un pont avec master et veth orpheline",
        "stdin": "NET_IFACE name=br1 type=bridge master=br0 ip=NONE state=UP\nNET_IFACE name=veth_orphan type=veth master=NONE ip=NONE state=UP",
        "expected": "NET_AUDIT iface=br1 valid=NON error=BRIDGE_CANNOT_HAVE_MASTER\nNET_AUDIT iface=veth_orphan valid=NON error=VETH_UNATTACHED"
      },
      {
        "label": "Veth autonome avec IP directe (mode point-à-point)",
        "stdin": "NET_IFACE name=veth0 type=veth master=NONE ip=192.168.100.2/30 state=UP",
        "expected": "NET_AUDIT iface=veth0 valid=OUI error=OK"
      },
      {
        "label": "Priorité des erreurs et configurations veth",
        "stdin": "NET_IFACE name=bridge_down type=bridge master=br0 ip=NONE state=DOWN\nNET_IFACE name=bridge_up type=bridge master=br0 ip=NONE state=UP\nNET_IFACE name=unattached type=veth master=NONE ip=NONE state=UP\nNET_IFACE name=attached type=veth master=br0 ip=NONE state=UP\nNET_IFACE name=addressed type=veth master=NONE ip=192.0.2.2/30 state=UP",
        "expected": "NET_AUDIT iface=bridge_down valid=NON error=INTERFACE_DOWN\nNET_AUDIT iface=bridge_up valid=NON error=BRIDGE_CANNOT_HAVE_MASTER\nNET_AUDIT iface=unattached valid=NON error=VETH_UNATTACHED\nNET_AUDIT iface=attached valid=OUI error=OK\nNET_AUDIT iface=addressed valid=OUI error=OK"
      }
    ],
    "solution": "#!/usr/bin/env bash\nset -eu\nexport LC_ALL=C\nawk '\nfunction read_fields(line, fields,    cursor, start, key, value, character, following) {\n  for (key in fields) delete fields[key]\n  cursor = 1\n  while (cursor <= length(line)) {\n    while (cursor <= length(line) && substr(line, cursor, 1) ~ /[[:space:]]/) cursor++\n    if (cursor > length(line)) break\n    start = cursor\n    while (cursor <= length(line) && substr(line, cursor, 1) !~ /[=[:space:]]/) cursor++\n    key = substr(line, start, cursor - start)\n    if (substr(line, cursor, 1) != \"=\") {\n      while (cursor <= length(line) && substr(line, cursor, 1) !~ /[[:space:]]/) cursor++\n      continue\n    }\n    cursor++\n    value = \"\"\n    if (substr(line, cursor, 1) == \"\\\"\") {\n      cursor++\n      while (cursor <= length(line)) {\n        character = substr(line, cursor++, 1)\n        if (character == \"\\\"\") break\n        following = substr(line, cursor, 1)\n        if (character == \"\\\\\" && (following == \"\\\"\" || following == \"\\\\\")) {\n          value = value following\n          cursor++\n        } else {\n          value = value character\n        }\n      }\n    } else {\n      start = cursor\n      while (cursor <= length(line) && substr(line, cursor, 1) !~ /[[:space:]]/) cursor++\n      value = substr(line, start, cursor - start)\n    }\n    fields[key] = value\n  }\n}\n\n$1 == \"NET_IFACE\" {\n  read_fields($0, fields)\n  error = \"OK\"\n  if (fields[\"state\"] != \"UP\") error = \"INTERFACE_DOWN\"\n  else if (fields[\"type\"] == \"bridge\" && fields[\"master\"] != \"NONE\") error = \"BRIDGE_CANNOT_HAVE_MASTER\"\n  else if (fields[\"type\"] == \"veth\" && fields[\"master\"] == \"NONE\" && fields[\"ip\"] == \"NONE\") error = \"VETH_UNATTACHED\"\n  valid = error == \"OK\" ? \"OUI\" : \"NON\"\n  printf \"NET_AUDIT iface=%s valid=%s error=%s\\n\", fields[\"name\"], valid, error\n}\n\n'\n",
    "takeaway": "Une paire veth relie un namespace réseau isolé à un Linux Bridge, permettant le routage et le filtrage comme sur un commutateur."
  },
  {
    "id": "lx3-c5-e2",
    "chapter": 5,
    "title": "Moteur d’évaluation de Policy-Based Routing (ip rule & multi-tables)",
    "level": "n2",
    "language": "shell",
    "goal": "Aiguiller les paquets réseau vers la bonne table de routage selon les règles de politique PBR (Policy Routing).",
    "brief": "<p>Sous Linux, la commande <code>ip rule</code> permet de router le trafic non seulement d'après l'adresse de destination (routage classique), mais également en fonction de l'adresse source ou du port applicatif vers des tables de routage indépendantes (Policy-Based Routing).<br><br>\nLe script Bash lit les données sur l’entrée standard (stdin).<br><br>\nPuis il lit des paquets à router :<br>\n<code>PACKET id=&lt;id&gt; src=&lt;ip&gt; dport=&lt;port&gt;</code>.<br><br>\nPrincipe First-Match-Wins : le paquet est évalué séquentiellement contre chaque règle dans l'ordre de priorité croissante. Dès qu'une règle correspond (adresse source identique ou ANY, et port identique ou ANY), le routage s'arrête et la table associée est retournée.<br><br>\nPour chaque paquet, afficher :<br>\n<code>ROUTE_MATCH packet={id} matched_prio={prio} table={nom_table}</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (lx3-c5-e2) — Moteur d’évaluation de Policy-Based Routing (ip rule & multi-tables)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\n# Écrivez votre traitement Bash ci-dessous (affichage attendu sur stdout)\n",
    "hints": [
      "Stocker les règles ordonnées par leur priorité numérique (prio).",
      "Tester chaque paquet contre les règles et stopper dès la première correspondance.",
      "1. Trier les règles par priorité croissante. 2. Pour chaque paquet, tester source et port (identiques ou ANY). 3. Première correspondance : afficher sa priorité et sa table, puis passer au paquet suivant."
    ],
    "examples": [
      {
        "stdin": "RULE prio=100 src=192.168.1.50 dport=ANY table=vpn_tunnel\nRULE prio=32766 src=ANY dport=ANY table=main\nPACKET id=1 src=192.168.1.50 dport=443",
        "expected": "ROUTE_MATCH packet=1 matched_prio=100 table=vpn_tunnel",
        "note": "Le paquet provient de l’IP 192.168.1.50 et correspond à la règle 100 routant vers vpn_tunnel."
      }
    ],
    "tests": [
      {
        "label": "Aiguillage selon le port de destination (trafic web vs standard)",
        "stdin": "RULE prio=200 src=ANY dport=80 table=proxy_table\nRULE prio=300 src=ANY dport=443 table=proxy_table\nRULE prio=32766 src=ANY dport=ANY table=main\nPACKET id=10 src=10.0.0.5 dport=80\nPACKET id=11 src=10.0.0.5 dport=22\nPACKET id=12 src=10.0.0.5 dport=443",
        "expected": "ROUTE_MATCH packet=10 matched_prio=200 table=proxy_table\nROUTE_MATCH packet=11 matched_prio=32766 table=main\nROUTE_MATCH packet=12 matched_prio=300 table=proxy_table"
      },
      {
        "label": "Aiguillage par IP source prioritaire sur la table par défaut",
        "stdin": "RULE prio=50 src=172.16.0.10 dport=ANY table=admin_gateway\nRULE prio=32766 src=ANY dport=ANY table=main\nPACKET id=20 src=172.16.0.10 dport=8080\nPACKET id=21 src=172.16.0.99 dport=8080",
        "expected": "ROUTE_MATCH packet=20 matched_prio=50 table=admin_gateway\nROUTE_MATCH packet=21 matched_prio=32766 table=main"
      },
      {
        "label": "Règle par défaut (catch-all) de priorité maximale",
        "stdin": "RULE prio=32766 src=ANY dport=ANY table=default_wan\nPACKET id=99 src=1.2.3.4 dport=53",
        "expected": "ROUTE_MATCH packet=99 matched_prio=32766 table=default_wan"
      },
      {
        "label": "Priorités non triées, égalité et absence de correspondance",
        "stdin": "RULE prio=80 src=ANY dport=443 table=web\nRULE prio=7 src=198.51.100.1 dport=443 table=secure\nRULE prio=7 src=198.51.100.1 dport=443 table=second\nPACKET id=31 src=198.51.100.1 dport=443\nPACKET id=32 src=198.51.100.2 dport=443\nPACKET id=33 src=198.51.100.1 dport=22",
        "expected": "ROUTE_MATCH packet=31 matched_prio=7 table=secure\nROUTE_MATCH packet=32 matched_prio=80 table=web\nROUTE_MATCH packet=33 matched_prio=NONE table=NONE"
      },
      {
        "label": "Priorités concurrentes avec source exacte",
        "stdin": "RULE prio=100 src=192.0.2.5 dport=443 table=slow\nRULE prio=10 src=192.0.2.5 dport=443 table=fast\nPACKET id=44 src=192.0.2.5 dport=443",
        "expected": "ROUTE_MATCH packet=44 matched_prio=10 table=fast"
      }
    ],
    "solution": "#!/usr/bin/env bash\nset -eu\nexport LC_ALL=C\nawk '\nfunction read_fields(line, fields,    cursor, start, key, value, character, following) {\n  for (key in fields) delete fields[key]\n  cursor = 1\n  while (cursor <= length(line)) {\n    while (cursor <= length(line) && substr(line, cursor, 1) ~ /[[:space:]]/) cursor++\n    if (cursor > length(line)) break\n    start = cursor\n    while (cursor <= length(line) && substr(line, cursor, 1) !~ /[=[:space:]]/) cursor++\n    key = substr(line, start, cursor - start)\n    if (substr(line, cursor, 1) != \"=\") {\n      while (cursor <= length(line) && substr(line, cursor, 1) !~ /[[:space:]]/) cursor++\n      continue\n    }\n    cursor++\n    value = \"\"\n    if (substr(line, cursor, 1) == \"\\\"\") {\n      cursor++\n      while (cursor <= length(line)) {\n        character = substr(line, cursor++, 1)\n        if (character == \"\\\"\") break\n        following = substr(line, cursor, 1)\n        if (character == \"\\\\\" && (following == \"\\\"\" || following == \"\\\\\")) {\n          value = value following\n          cursor++\n        } else {\n          value = value character\n        }\n      }\n    } else {\n      start = cursor\n      while (cursor <= length(line) && substr(line, cursor, 1) !~ /[[:space:]]/) cursor++\n      value = substr(line, start, cursor - start)\n    }\n    fields[key] = value\n  }\n}\n\n$1 == \"RULE\" {\n  read_fields($0, fields)\n  count++\n  priority[count] = fields[\"prio\"] + 0\n  source[count] = fields[\"src\"]; port[count] = fields[\"dport\"]; table[count] = fields[\"table\"]\n}\n$1 == \"PACKET\" {\n  read_fields($0, fields)\n  best = 0\n  for (position = 1; position <= count; position++) {\n    if ((source[position] == \"ANY\" || source[position] == fields[\"src\"]) && (port[position] == \"ANY\" || port[position] == fields[\"dport\"]) && (best == 0 || priority[position] < priority[best])) best = position\n  }\n  matched = best ? priority[best] : \"NONE\"\n  selected = best ? table[best] : \"NONE\"\n  printf \"ROUTE_MATCH packet=%s matched_prio=%s table=%s\\n\", fields[\"id\"], matched, selected\n}\n\n'\n",
    "takeaway": "Le Policy-Based Routing combine ip rule et plusieurs tables de routage pour aiguiller les paquets selon source, marque ou interface."
  },
  {
    "id": "lx3-c5-e3",
    "chapter": 5,
    "title": "Parseur et simulateur de résolution NSSwitch (/etc/nsswitch.conf)",
    "level": "n3",
    "language": "shell",
    "goal": "Simuler la séquence de résolution de noms d’hôtes selon la politique déclarative de nsswitch.conf.",
    "brief": "<p>Le fichier <code>/etc/nsswitch.conf</code> (Name Service Switch) régit l'ordre dans lequel la bibliothèque C (glibc) consulte les bases de données système (fichiers locaux <code>files</code> comme <code>/etc/hosts</code>, résolveur DNS <code>dns</code>, mDNS <code>mdns4</code>).<br><br>\nLe script Bash lit les données sur l’entrée standard (stdin).<br><br>\nPuis il lit des requêtes de résolution :<br>\n<code>QUERY_HOST name=&lt;fqdn&gt; in_files=&lt;OUI|NON&gt; in_dns=&lt;OUI|NON&gt; in_mdns=&lt;OUI|NON&gt;</code>.<br><br>\nRègles :<br>\n- Les sources déclarées dans <code>order</code> sont interrogées successivement de gauche à droite.<br>\n- Dès qu'une source répond <code>OUI</code>, la résolution s'arrête immédiatement : <code>resolved_by={source} status=SUCCESS</code>.<br>\n- Si aucune source ne répond <code>OUI</code> : <code>resolved_by=NONE status=NOT_FOUND</code>.<br><br>\nPour chaque requête, afficher :<br>\n<code>RESOLV_RESULT host={name} resolved_by={source} status={SUCCESS|NOT_FOUND}</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (lx3-c5-e3) — Parseur et simulateur de résolution NSSwitch (/etc/nsswitch.conf)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\n# Écrivez votre traitement Bash ci-dessous (affichage attendu sur stdout)\n",
    "hints": [
      "Découper la chaîne order avec split(\",\") pour obtenir la liste ordonnée des sources.",
      "Parcourir les sources dans l’ordre et vérifier si la présence est OUI.",
      "1. Parcourir les sources de order de gauche à droite. 2. Première source répondant OUI : resolved_by et SUCCESS, arrêt immédiat. 3. Aucune réponse : resolved_by=NONE et NOT_FOUND."
    ],
    "examples": [
      {
        "stdin": "CONF_NSSWITCH order=files,dns\nQUERY_HOST name=localhost in_files=OUI in_dns=NON in_mdns=NON",
        "expected": "RESOLV_RESULT host=localhost resolved_by=files status=SUCCESS",
        "note": "Présent dans /etc/hosts (files) : résolu en priorité par files."
      }
    ],
    "tests": [
      {
        "label": "Résolution par DNS distant lorsque le fichier local échoue",
        "stdin": "CONF_NSSWITCH order=files,dns\nQUERY_HOST name=api.github.com in_files=NON in_dns=OUI in_mdns=NON\nQUERY_HOST name=both.example in_files=OUI in_dns=OUI in_mdns=NON",
        "expected": "RESOLV_RESULT host=api.github.com resolved_by=dns status=SUCCESS\nRESOLV_RESULT host=both.example resolved_by=files status=SUCCESS"
      },
      {
        "label": "Hôte introuvable dans toutes les sources déclarées",
        "stdin": "CONF_NSSWITCH order=files,dns,mdns\nQUERY_HOST name=unknown.corp in_files=NON in_dns=NON in_mdns=NON",
        "expected": "RESOLV_RESULT host=unknown.corp resolved_by=NONE status=NOT_FOUND"
      },
      {
        "label": "Priorité inversée (dns avant files)",
        "stdin": "CONF_NSSWITCH order=dns,files\nQUERY_HOST name=internal.test in_files=OUI in_dns=OUI in_mdns=NON",
        "expected": "RESOLV_RESULT host=internal.test resolved_by=dns status=SUCCESS"
      },
      {
        "label": "Trois sources, première réponse et absence de réponse",
        "stdin": "CONF_NSSWITCH order=mdns,dns,files\nQUERY_HOST name=printer.local in_files=OUI in_dns=OUI in_mdns=OUI\nQUERY_HOST name=web.example in_files=OUI in_dns=OUI in_mdns=NON\nQUERY_HOST name=hosts.example in_files=OUI in_dns=NON in_mdns=NON\nQUERY_HOST name=missing.example in_files=NON in_dns=NON in_mdns=NON",
        "expected": "RESOLV_RESULT host=printer.local resolved_by=mdns status=SUCCESS\nRESOLV_RESULT host=web.example resolved_by=dns status=SUCCESS\nRESOLV_RESULT host=hosts.example resolved_by=files status=SUCCESS\nRESOLV_RESULT host=missing.example resolved_by=NONE status=NOT_FOUND"
      },
      {
        "label": "Réponse mDNS unique",
        "stdin": "CONF_NSSWITCH order=mdns,dns\nQUERY_HOST name=atelier.local in_files=NON in_dns=NON in_mdns=OUI",
        "expected": "RESOLV_RESULT host=atelier.local resolved_by=mdns status=SUCCESS"
      }
    ],
    "solution": "#!/usr/bin/env bash\nset -eu\nexport LC_ALL=C\nawk '\nfunction read_fields(line, fields,    cursor, start, key, value, character, following) {\n  for (key in fields) delete fields[key]\n  cursor = 1\n  while (cursor <= length(line)) {\n    while (cursor <= length(line) && substr(line, cursor, 1) ~ /[[:space:]]/) cursor++\n    if (cursor > length(line)) break\n    start = cursor\n    while (cursor <= length(line) && substr(line, cursor, 1) !~ /[=[:space:]]/) cursor++\n    key = substr(line, start, cursor - start)\n    if (substr(line, cursor, 1) != \"=\") {\n      while (cursor <= length(line) && substr(line, cursor, 1) !~ /[[:space:]]/) cursor++\n      continue\n    }\n    cursor++\n    value = \"\"\n    if (substr(line, cursor, 1) == \"\\\"\") {\n      cursor++\n      while (cursor <= length(line)) {\n        character = substr(line, cursor++, 1)\n        if (character == \"\\\"\") break\n        following = substr(line, cursor, 1)\n        if (character == \"\\\\\" && (following == \"\\\"\" || following == \"\\\\\")) {\n          value = value following\n          cursor++\n        } else {\n          value = value character\n        }\n      }\n    } else {\n      start = cursor\n      while (cursor <= length(line) && substr(line, cursor, 1) !~ /[[:space:]]/) cursor++\n      value = substr(line, start, cursor - start)\n    }\n    fields[key] = value\n  }\n}\n\n$1 == \"CONF_NSSWITCH\" {\n  read_fields($0, fields)\n  count = split(fields[\"order\"], sources, \",\")\n}\n$1 == \"QUERY_HOST\" {\n  read_fields($0, fields)\n  resolved = \"NONE\"; status = \"NOT_FOUND\"\n  for (position = 1; position <= count; position++) {\n    source = sources[position]\n    if (fields[\"in_\" source] == \"OUI\") { resolved = source; status = \"SUCCESS\"; break }\n  }\n  printf \"RESOLV_RESULT host=%s resolved_by=%s status=%s\\n\", fields[\"name\"], resolved, status\n}\n\n'\n",
    "takeaway": "Le fichier /etc/nsswitch.conf fixe l’ordre exact des sources consultées (files, dns, sss) pour résoudre comptes et noms d’hôtes."
  }
];
