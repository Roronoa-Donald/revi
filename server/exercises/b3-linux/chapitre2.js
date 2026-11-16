'use strict';

module.exports = [
  {
    "id": "lx3-c2-e1",
    "chapter": 2,
    "title": "Validateur d’unité de service Systemd ([Unit], [Service], [Install])",
    "level": "n1",
    "language": "shell",
    "goal": "Vérifier la conformité syntaxique et la validité des directives d’un fichier de service Systemd.",
    "brief": "<p>Sous Linux, <strong>Systemd</strong> (PID 1) orchestre le démarrage des démons via des fichiers déclaratifs d'unités (<code>.service</code>) placés dans <code>/etc/systemd/system/</code> ou <code>/lib/systemd/system/</code>.<br><br>\nPour ce simulateur, contrôlez les champs dans cet ordre et affichez seulement la première erreur :<br>\n1. <code>Description</code> doit être renseignée (sinon <code>DESCRIPTION_MANQUANTE</code>).<br>\n2. <code>ExecStart</code> doit commencer par <code>/</code>, indiquant un chemin absolu (sinon <code>EXECSTART_RELATIF</code>).<br>\n3. <code>WantedBy</code> doit être renseigné (sinon <code>WANTEDBY_MANQUANT</code>).<br>\nDans les données de cet exercice, une valeur vide ou <code>NONE</code> représente un champ absent. Le simulateur ne vérifie ni l'existence du fichier exécutable ni celle de la cible, par exemple <code>multi-user.target</code>.<br><br>\nLe script Bash lit les paramètres sur l’entrée standard (stdin).<br><br>\nPour chaque service, afficher :<br>\n<code>SERVICE_VALIDATION name={name} valid={OUI|NON} error={OK|motif_erreur}</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (lx3-c2-e1) — Validateur d’unité de service Systemd ([Unit], [Service], [Install])\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\n# Écrivez votre traitement Bash ci-dessous (affichage attendu sur stdout)\n",
    "hints": [
      "Vérifier les critères dans l’ordre : Description non vide, ExecStart commençant par \"/\", WantedBy non vide.",
      "Dès qu’une règle est violée, valid=NON avec l’erreur correspondante.",
      "1. Description vide : DESCRIPTION_MANQUANTE. 2. ExecStart relatif : EXECSTART_RELATIF. 3. WantedBy absent : WANTEDBY_MANQUANT. 4. Aucune violation : valid=OUI et error=OK."
    ],
    "examples": [
      {
        "stdin": "SERVICE_DEF name=api.service desc=\"Backend API\" exec_start=/usr/bin/python3 wanted_by=multi-user.target",
        "expected": "SERVICE_VALIDATION name=api.service valid=OUI error=OK",
        "note": "Toutes les directives sont valides et le chemin d’exécutable est absolu."
      }
    ],
    "tests": [
      {
        "label": "Rejet d’un exécutable avec chemin relatif",
        "stdin": "SERVICE_DEF name=worker.service desc=\"Taches asynchrones\" exec_start=node wanted_by=multi-user.target\nSERVICE_DEF name=missing.service desc=NONE exec_start=relative wanted_by=NONE",
        "expected": "SERVICE_VALIDATION name=worker.service valid=NON error=EXECSTART_RELATIF\nSERVICE_VALIDATION name=missing.service valid=NON error=DESCRIPTION_MANQUANTE"
      },
      {
        "label": "Rejet pour description manquante ou WantedBy manquant",
        "stdin": "SERVICE_DEF name=audit.service desc=NONE exec_start=/opt/bin/agent wanted_by=multi-user.target\nSERVICE_DEF name=cron_job.service desc=\"Tache planifiee\" exec_start=/bin/bash wanted_by=NONE",
        "expected": "SERVICE_VALIDATION name=audit.service valid=NON error=DESCRIPTION_MANQUANTE\nSERVICE_VALIDATION name=cron_job.service valid=NON error=WANTEDBY_MANQUANT"
      },
      {
        "label": "Service complexe valide avec arguments",
        "stdin": "SERVICE_DEF name=nginx.service desc=\"Serveur Web Nginx\" exec_start=/usr/sbin/nginx wanted_by=multi-user.target",
        "expected": "SERVICE_VALIDATION name=nginx.service valid=OUI error=OK"
      },
      {
        "label": "Champs absents, vides, cités et priorité des contrôles",
        "stdin": "SERVICE_DEF name=empty.service desc=\"\" exec_start=/bin/true wanted_by=multi-user.target\nSERVICE_DEF name=relative.service desc=\"Worker with spaces\" wanted_by=multi-user.target\nSERVICE_DEF name=target.service desc=\"Hello\" exec_start=/bin/true wanted_by=\"\"\nSERVICE_DEF name=valid.service desc=\"Background worker\" exec_start=/opt/run wanted_by=unlisted.target",
        "expected": "SERVICE_VALIDATION name=empty.service valid=NON error=DESCRIPTION_MANQUANTE\nSERVICE_VALIDATION name=relative.service valid=NON error=EXECSTART_RELATIF\nSERVICE_VALIDATION name=target.service valid=NON error=WANTEDBY_MANQUANT\nSERVICE_VALIDATION name=valid.service valid=OUI error=OK"
      },
      {
        "label": "WantedBy absent malgré les autres champs valides",
        "stdin": "SERVICE_DEF name=cache.service desc=Cache exec_start=/bin/true wanted_by=NONE",
        "expected": "SERVICE_VALIDATION name=cache.service valid=NON error=WANTEDBY_MANQUANT"
      }
    ],
    "solution": "#!/usr/bin/env bash\nset -eu\nexport LC_ALL=C\nawk '\nfunction read_fields(line, fields,    cursor, start, key, value, character, following) {\n  for (key in fields) delete fields[key]\n  cursor = 1\n  while (cursor <= length(line)) {\n    while (cursor <= length(line) && substr(line, cursor, 1) ~ /[[:space:]]/) cursor++\n    if (cursor > length(line)) break\n    start = cursor\n    while (cursor <= length(line) && substr(line, cursor, 1) !~ /[=[:space:]]/) cursor++\n    key = substr(line, start, cursor - start)\n    if (substr(line, cursor, 1) != \"=\") {\n      while (cursor <= length(line) && substr(line, cursor, 1) !~ /[[:space:]]/) cursor++\n      continue\n    }\n    cursor++\n    value = \"\"\n    if (substr(line, cursor, 1) == \"\\\"\") {\n      cursor++\n      while (cursor <= length(line)) {\n        character = substr(line, cursor++, 1)\n        if (character == \"\\\"\") break\n        following = substr(line, cursor, 1)\n        if (character == \"\\\\\" && (following == \"\\\"\" || following == \"\\\\\")) {\n          value = value following\n          cursor++\n        } else {\n          value = value character\n        }\n      }\n    } else {\n      start = cursor\n      while (cursor <= length(line) && substr(line, cursor, 1) !~ /[[:space:]]/) cursor++\n      value = substr(line, start, cursor - start)\n    }\n    fields[key] = value\n  }\n}\n\n$1 == \"SERVICE_DEF\" {\n  read_fields($0, fields)\n  error = \"OK\"\n  if (fields[\"desc\"] == \"\" || fields[\"desc\"] == \"NONE\") error = \"DESCRIPTION_MANQUANTE\"\n  else if (substr(fields[\"exec_start\"], 1, 1) != \"/\") error = \"EXECSTART_RELATIF\"\n  else if (fields[\"wanted_by\"] == \"\" || fields[\"wanted_by\"] == \"NONE\") error = \"WANTEDBY_MANQUANT\"\n  valid = error == \"OK\" ? \"OUI\" : \"NON\"\n  printf \"SERVICE_VALIDATION name=%s valid=%s error=%s\\n\", fields[\"name\"], valid, error\n}\n\n'\n",
    "takeaway": "Une unité systemd structure métadonnées [Unit], cycle d’exécution [Service] (Type, ExecStart, Restart) et activation [Install]."
  },
  {
    "id": "lx3-c2-e2",
    "chapter": 2,
    "title": "Résolveur de dépendances et détection de cycles Systemd",
    "level": "n2",
    "language": "shell",
    "goal": "Analyser le graphe de dépendances d’unités et détecter les dépendances circulaires bloquantes (deadlocks).",
    "brief": "<p>Systemd gère les dépendances entre unités via les directives <code>Requires=</code> (dépendance forte) et <code>Wants=</code> (dépendance faible). Si deux unités se requièrent mutuellement de manière circulaire, Systemd rencontre une dépendance cyclique et doit casser le lien ou échouer le démarrage.<br><br>\nLe script Bash lit les paramètres sur l’entrée standard (stdin).<br><br>\nRègles :<br>\n1. Auto-dépendance (A requiert A) : <code>cycle=OUI reason=AUTO_DEPENDANCE</code>.<br>\n2. Cycle direct à deux unités (A requiert B et B requiert A) : <code>cycle=OUI reason=CYCLE_DIRECT</code>.<br>\n3. Dépendance saine ou sans dépendance (NONE) : <code>cycle=NON reason=OK</code>.<br><br>\nPour chaque unité, afficher :<br>\n<code>DEP_CHECK unit={name} cycle={OUI|NON} reason={OK|motif}</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (lx3-c2-e2) — Résolveur de dépendances et détection de cycles Systemd\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\n# Écrivez votre traitement Bash ci-dessous (affichage attendu sur stdout)\n",
    "hints": [
      "Stocker l’association {nom: requires} dans un dictionnaire.",
      "Vérifier si requires == nom (auto-dépendance).",
      "Vérifier si target a pour requires le nom courant (cycle à deux)."
    ],
    "examples": [
      {
        "stdin": "UNIT_DEP name=db.service requires=NONE\nUNIT_DEP name=web.service requires=db.service",
        "expected": "DEP_CHECK unit=db.service cycle=NON reason=OK\nDEP_CHECK unit=web.service cycle=NON reason=OK",
        "note": "Arborescence linéaire saine sans boucle."
      }
    ],
    "tests": [
      {
        "label": "Détection d’auto-dépendance",
        "stdin": "UNIT_DEP name=loop.service requires=loop.service\nUNIT_DEP name=isolated.service requires=NONE",
        "expected": "DEP_CHECK unit=loop.service cycle=OUI reason=AUTO_DEPENDANCE\nDEP_CHECK unit=isolated.service cycle=NON reason=OK"
      },
      {
        "label": "Détection de cycle direct croisé entre deux services",
        "stdin": "UNIT_DEP name=alpha.service requires=beta.service\nUNIT_DEP name=beta.service requires=alpha.service",
        "expected": "DEP_CHECK unit=alpha.service cycle=OUI reason=CYCLE_DIRECT\nDEP_CHECK unit=beta.service cycle=OUI reason=CYCLE_DIRECT"
      },
      {
        "label": "Chaîne saine à trois unités",
        "stdin": "UNIT_DEP name=redis.service requires=network.target\nUNIT_DEP name=network.target requires=NONE\nUNIT_DEP name=app.service requires=redis.service",
        "expected": "DEP_CHECK unit=redis.service cycle=NON reason=OK\nDEP_CHECK unit=network.target cycle=NON reason=OK\nDEP_CHECK unit=app.service cycle=NON reason=OK"
      },
      {
        "label": "Cycle croisé, auto-dépendance et dépendance non déclarée",
        "stdin": "UNIT_DEP name=beta2.service requires=alpha2.service\nUNIT_DEP name=alpha2.service requires=beta2.service\nUNIT_DEP name=itself.service requires=itself.service\nUNIT_DEP name=other.service requires=missing.service",
        "expected": "DEP_CHECK unit=beta2.service cycle=OUI reason=CYCLE_DIRECT\nDEP_CHECK unit=alpha2.service cycle=OUI reason=CYCLE_DIRECT\nDEP_CHECK unit=itself.service cycle=OUI reason=AUTO_DEPENDANCE\nDEP_CHECK unit=other.service cycle=NON reason=OK"
      }
    ],
    "solution": "#!/usr/bin/env bash\nset -eu\nexport LC_ALL=C\nawk '\nfunction read_fields(line, fields,    cursor, start, key, value, character, following) {\n  for (key in fields) delete fields[key]\n  cursor = 1\n  while (cursor <= length(line)) {\n    while (cursor <= length(line) && substr(line, cursor, 1) ~ /[[:space:]]/) cursor++\n    if (cursor > length(line)) break\n    start = cursor\n    while (cursor <= length(line) && substr(line, cursor, 1) !~ /[=[:space:]]/) cursor++\n    key = substr(line, start, cursor - start)\n    if (substr(line, cursor, 1) != \"=\") {\n      while (cursor <= length(line) && substr(line, cursor, 1) !~ /[[:space:]]/) cursor++\n      continue\n    }\n    cursor++\n    value = \"\"\n    if (substr(line, cursor, 1) == \"\\\"\") {\n      cursor++\n      while (cursor <= length(line)) {\n        character = substr(line, cursor++, 1)\n        if (character == \"\\\"\") break\n        following = substr(line, cursor, 1)\n        if (character == \"\\\\\" && (following == \"\\\"\" || following == \"\\\\\")) {\n          value = value following\n          cursor++\n        } else {\n          value = value character\n        }\n      }\n    } else {\n      start = cursor\n      while (cursor <= length(line) && substr(line, cursor, 1) !~ /[[:space:]]/) cursor++\n      value = substr(line, start, cursor - start)\n    }\n    fields[key] = value\n  }\n}\n\n$1 == \"UNIT_DEP\" {\n  read_fields($0, fields)\n  order[++count] = fields[\"name\"]\n  dependency[fields[\"name\"]] = fields[\"requires\"]\n}\nEND {\n  for (position = 1; position <= count; position++) {\n    name = order[position]; target = dependency[name]\n    reason = \"OK\"; cycle = \"NON\"\n    if (target != \"NONE\" && target == name) { reason = \"AUTO_DEPENDANCE\"; cycle = \"OUI\" }\n    else if (target != \"NONE\" && dependency[target] == name) { reason = \"CYCLE_DIRECT\"; cycle = \"OUI\" }\n    printf \"DEP_CHECK unit=%s cycle=%s reason=%s\\n\", name, cycle, reason\n  }\n}\n\n'\n",
    "takeaway": "Modéliser Wants/Requires/After sous forme de graphe orienté permet de vérifier l’ordre de démarrage et de prévenir les interblocages."
  },
  {
    "id": "lx3-c2-e3",
    "chapter": 2,
    "title": "Parseur et filtreur d’événements Systemd Journald",
    "level": "n3",
    "language": "shell",
    "goal": "Classer les journaux binaires Systemd Journald selon les priorités Syslog RFC 5424 et isoler les incidents critiques.",
    "brief": "<p>Le démon <code>systemd-journald</code> centralise les logs du noyau, des services et de l'espace utilisateur dans un format binaire structuré indexé.<br><br>\nLe script Bash lit sur l’entrée standard (stdin) zéro ou plusieurs lignes <code>JOURNAL id=&lt;id&gt; priority=&lt;0..7&gt; unit=&lt;service&gt; msg=&lt;message&gt;</code>.<br><br>\nÉchelle de sévérité Syslog (RFC 5424) :<br>\n- 0 : <code>EMERGENCY</code><br>\n- 1 : <code>ALERT</code><br>\n- 2 : <code>CRITICAL</code><br>\n- 3 : <code>ERROR</code><br>\n- 4 : <code>WARNING</code><br>\n- 5 : <code>NOTICE</code><br>\n- 6 : <code>INFO</code><br>\n- 7 : <code>DEBUG</code><br><br>\nCritère d'alerte : si <code>priority &le; 3</code>, l'événement est considéré comme critique (<code>SEVERITY_ALERT=OUI</code>), sinon (<code>SEVERITY_ALERT=NON</code>).<br><br>\nPour chaque log, afficher :<br>\n<code>JOURNAL_AUDIT id={id} unit={unit} level={LABEL} alert={SEVERITY_ALERT}</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (lx3-c2-e3) — Parseur et filtreur d’événements Systemd Journald\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\n# Écrivez votre traitement Bash ci-dessous (affichage attendu sur stdout)\n",
    "hints": [
      "Utiliser une table de correspondance associant les entiers 0..7 à leur libellé.",
      "Comparer la priorité numérique pour déterminer le statut d’alerte.",
      "1. Associer la priorité 0 à 7 à son libellé RFC 5424. 2. Priorité inférieure ou égale à 3 : alert=OUI, sinon NON. 3. Afficher la ligne JOURNAL_AUDIT."
    ],
    "examples": [
      {
        "stdin": "JOURNAL id=1 priority=6 unit=sshd.service msg=\"Server listening on port 22\"",
        "expected": "JOURNAL_AUDIT id=1 unit=sshd.service level=INFO alert=NON",
        "note": "Priorité 6 (INFO), événement informatif standard."
      }
    ],
    "tests": [
      {
        "label": "Logs d’urgence et d’erreur critique (priority <= 3)",
        "stdin": "JOURNAL id=10 priority=0 unit=kernel msg=\"Kernel panic - not syncing\"\nJOURNAL id=11 priority=3 unit=postgresql.service msg=\"Fatal connection error\"\nJOURNAL id=12 priority=1 unit=watchdog msg=\"Alert\"",
        "expected": "JOURNAL_AUDIT id=10 unit=kernel level=EMERGENCY alert=OUI\nJOURNAL_AUDIT id=11 unit=postgresql.service level=ERROR alert=OUI\nJOURNAL_AUDIT id=12 unit=watchdog level=ALERT alert=OUI"
      },
      {
        "label": "Avertissement et notification standard",
        "stdin": "JOURNAL id=20 priority=4 unit=diskmon.service msg=\"Disk usage above 80%\"\nJOURNAL id=21 priority=5 unit=systemd msg=\"Started Apache Web Server\"",
        "expected": "JOURNAL_AUDIT id=20 unit=diskmon.service level=WARNING alert=NON\nJOURNAL_AUDIT id=21 unit=systemd level=NOTICE alert=NON"
      },
      {
        "label": "Log de débogage (DEBUG)",
        "stdin": "JOURNAL id=30 priority=7 unit=app.service msg=\"Trace variable x=42\"",
        "expected": "JOURNAL_AUDIT id=30 unit=app.service level=DEBUG alert=NON"
      },
      {
        "label": "Échelle entière et voisinage du seuil",
        "stdin": "JOURNAL id=40 priority=2 unit=svc msg=\"critical\"\nJOURNAL id=41 priority=3 unit=svc msg=\"error\"\nJOURNAL id=42 priority=4 unit=svc msg=\"warning\"\nJOURNAL id=43 priority=6 unit=svc msg=\"info\"",
        "expected": "JOURNAL_AUDIT id=40 unit=svc level=CRITICAL alert=OUI\nJOURNAL_AUDIT id=41 unit=svc level=ERROR alert=OUI\nJOURNAL_AUDIT id=42 unit=svc level=WARNING alert=NON\nJOURNAL_AUDIT id=43 unit=svc level=INFO alert=NON"
      }
    ],
    "solution": "#!/usr/bin/env bash\nset -eu\nexport LC_ALL=C\nawk '\nfunction read_fields(line, fields,    cursor, start, key, value, character, following) {\n  for (key in fields) delete fields[key]\n  cursor = 1\n  while (cursor <= length(line)) {\n    while (cursor <= length(line) && substr(line, cursor, 1) ~ /[[:space:]]/) cursor++\n    if (cursor > length(line)) break\n    start = cursor\n    while (cursor <= length(line) && substr(line, cursor, 1) !~ /[=[:space:]]/) cursor++\n    key = substr(line, start, cursor - start)\n    if (substr(line, cursor, 1) != \"=\") {\n      while (cursor <= length(line) && substr(line, cursor, 1) !~ /[[:space:]]/) cursor++\n      continue\n    }\n    cursor++\n    value = \"\"\n    if (substr(line, cursor, 1) == \"\\\"\") {\n      cursor++\n      while (cursor <= length(line)) {\n        character = substr(line, cursor++, 1)\n        if (character == \"\\\"\") break\n        following = substr(line, cursor, 1)\n        if (character == \"\\\\\" && (following == \"\\\"\" || following == \"\\\\\")) {\n          value = value following\n          cursor++\n        } else {\n          value = value character\n        }\n      }\n    } else {\n      start = cursor\n      while (cursor <= length(line) && substr(line, cursor, 1) !~ /[[:space:]]/) cursor++\n      value = substr(line, start, cursor - start)\n    }\n    fields[key] = value\n  }\n}\n\nBEGIN {\n  labels[0] = \"EMERGENCY\"; labels[1] = \"ALERT\"; labels[2] = \"CRITICAL\"; labels[3] = \"ERROR\"\n  labels[4] = \"WARNING\"; labels[5] = \"NOTICE\"; labels[6] = \"INFO\"; labels[7] = \"DEBUG\"\n}\n$1 == \"JOURNAL\" {\n  read_fields($0, fields)\n  priority = fields[\"priority\"] + 0\n  alert = priority <= 3 ? \"OUI\" : \"NON\"\n  printf \"JOURNAL_AUDIT id=%s unit=%s level=%s alert=%s\\n\", fields[\"id\"], fields[\"unit\"], labels[priority], alert\n}\n\n'\n",
    "takeaway": "Filtrer journald par unité, priorité syslog et fenêtre temporelle accélère l’isolement des pannes de services au démarrage."
  }
];
