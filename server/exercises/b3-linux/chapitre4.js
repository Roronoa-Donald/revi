'use strict';

module.exports = [
  {
    "id": "lx3-c4-e1",
    "chapter": 4,
    "title": "Classificateur et auditeur de namespaces Linux par processus",
    "level": "n1",
    "language": "shell",
    "goal": "Comparer les identifiants d’inodes de namespaces d’un processus par rapport à l’espace hôte.",
    "brief": "<p>Les <strong>namespaces</strong> Linux fournissent l'isolation nécessaire aux conteneurs (Docker, containerd, LXC) en partitionnant les ressources globales du système (PID, NET, MNT, IPC, UTS, USER). Chaque namespace est identifié dans <code>/proc/[pid]/ns/</code> par un numéro d'inode unique.<br><br>\nLe script Bash lit les paramètres sur l’entrée standard (stdin).<br><br>\nRègles :<br>\n1. Comparer chaque namespace (PID, NET, MNT) à sa contrepartie hôte.<br>\n2. Compter le nombre de namespaces isolés (différents de l'hôte) : <code>diff_count</code>.<br>\n3. Si <code>diff_count &gt; 0</code> : <code>isolated=OUI</code>, sinon <code>isolated=NON</code>.<br><br>\nPour chaque processus, afficher :<br>\n<code>NS_STATUS pid={pid} isolated={OUI|NON} isolated_count={diff_count}</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (lx3-c4-e1) — Classificateur et auditeur de namespaces Linux par processus\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\n# Écrivez votre traitement Bash ci-dessous (affichage attendu sur stdout)\n",
    "hints": [
      "Comparer ns_pid != host_pid, ns_net != host_net, ns_mnt != host_mnt.",
      "Incrémenter un compteur pour chaque divergence constatée.",
      "1. Comparer chaque numéro de namespace à sa contrepartie hôte. 2. Compter les divergences PID, NET et MNT. 3. Compteur positif : isolated=OUI, sinon NON. 4. Afficher la ligne NS_STATUS."
    ],
    "examples": [
      {
        "stdin": "NS_CHECK pid=101 ns_pid=4026531836 ns_net=4026531992 ns_mnt=4026532000 host_pid=4026531836 host_net=4026531992 host_mnt=4026532000",
        "expected": "NS_STATUS pid=101 isolated=NON isolated_count=0",
        "note": "Le processus partage tous les namespaces de l’hôte : il n’est pas conteneurisé."
      }
    ],
    "tests": [
      {
        "label": "Processus en conteneur complet avec isolation totale (3/3)",
        "stdin": "NS_CHECK pid=5000 ns_pid=4026532500 ns_net=4026532501 ns_mnt=4026532502 host_pid=4026531836 host_net=4026531992 host_mnt=4026532000\nNS_CHECK pid=5001 ns_pid=10 ns_net=20 ns_mnt=30 host_pid=10 host_net=20 host_mnt=30",
        "expected": "NS_STATUS pid=5000 isolated=OUI isolated_count=3\nNS_STATUS pid=5001 isolated=NON isolated_count=0"
      },
      {
        "label": "Processus avec isolation réseau uniquement (ex: conteneur host network)",
        "stdin": "NS_CHECK pid=6000 ns_pid=4026531836 ns_net=4026533000 ns_mnt=4026531836 host_pid=4026531836 host_net=4026531992 host_mnt=4026531836",
        "expected": "NS_STATUS pid=6000 isolated=OUI isolated_count=1"
      },
      {
        "label": "Processus système hôte standard",
        "stdin": "NS_CHECK pid=1 ns_pid=1000 ns_net=2000 ns_mnt=3000 host_pid=1000 host_net=2000 host_mnt=3000",
        "expected": "NS_STATUS pid=1 isolated=NON isolated_count=0"
      },
      {
        "label": "Une, deux et trois différences distinctes",
        "stdin": "NS_CHECK pid=70 ns_pid=1 ns_net=7 ns_mnt=9 host_pid=1 host_net=8 host_mnt=9\nNS_CHECK pid=71 ns_pid=4 ns_net=5 ns_mnt=6 host_pid=1 host_net=5 host_mnt=3\nNS_CHECK pid=72 ns_pid=4 ns_net=5 ns_mnt=6 host_pid=1 host_net=2 host_mnt=3",
        "expected": "NS_STATUS pid=70 isolated=OUI isolated_count=1\nNS_STATUS pid=71 isolated=OUI isolated_count=2\nNS_STATUS pid=72 isolated=OUI isolated_count=3"
      }
    ],
    "solution": "#!/usr/bin/env bash\nset -eu\nexport LC_ALL=C\nawk '\nfunction read_fields(line, fields,    cursor, start, key, value, character, following) {\n  for (key in fields) delete fields[key]\n  cursor = 1\n  while (cursor <= length(line)) {\n    while (cursor <= length(line) && substr(line, cursor, 1) ~ /[[:space:]]/) cursor++\n    if (cursor > length(line)) break\n    start = cursor\n    while (cursor <= length(line) && substr(line, cursor, 1) !~ /[=[:space:]]/) cursor++\n    key = substr(line, start, cursor - start)\n    if (substr(line, cursor, 1) != \"=\") {\n      while (cursor <= length(line) && substr(line, cursor, 1) !~ /[[:space:]]/) cursor++\n      continue\n    }\n    cursor++\n    value = \"\"\n    if (substr(line, cursor, 1) == \"\\\"\") {\n      cursor++\n      while (cursor <= length(line)) {\n        character = substr(line, cursor++, 1)\n        if (character == \"\\\"\") break\n        following = substr(line, cursor, 1)\n        if (character == \"\\\\\" && (following == \"\\\"\" || following == \"\\\\\")) {\n          value = value following\n          cursor++\n        } else {\n          value = value character\n        }\n      }\n    } else {\n      start = cursor\n      while (cursor <= length(line) && substr(line, cursor, 1) !~ /[[:space:]]/) cursor++\n      value = substr(line, start, cursor - start)\n    }\n    fields[key] = value\n  }\n}\n\n$1 == \"NS_CHECK\" {\n  read_fields($0, fields)\n  count = (fields[\"ns_pid\"] + 0 != fields[\"host_pid\"] + 0) + (fields[\"ns_net\"] + 0 != fields[\"host_net\"] + 0) + (fields[\"ns_mnt\"] + 0 != fields[\"host_mnt\"] + 0)\n  isolated = count > 0 ? \"OUI\" : \"NON\"\n  printf \"NS_STATUS pid=%s isolated=%s isolated_count=%d\\n\", fields[\"pid\"], isolated, count\n}\n\n'\n",
    "takeaway": "Les namespaces Linux (pid, net, mnt, ipc, uts, user) cloisonnent chaque vue système pour fonder l’isolation des conteneurs."
  },
  {
    "id": "lx3-c4-e2",
    "chapter": 4,
    "title": "Contrôleur de quotas et limites de ressources Cgroups v2 (cpu.max & memory.max)",
    "level": "n2",
    "language": "shell",
    "goal": "Calculer la bande passante processeur autorisée et vérifier le plafonnement mémoire dans la hiérarchie Cgroups v2.",
    "brief": "<p><strong>Cgroups v2 (Control Groups)</strong> sous Linux unifie la gestion des ressources système dans <code>/sys/fs/cgroup/</code>.<br><br>\nDirectives Cgroups v2 :<br>\n- <code>cpu.max = &lt;quota&gt; &lt;period&gt;</code> : Si quota vaut <code>max</code>, la limite CPU est <code>UNLIMITED</code>. Sinon, le nombre de cœurs alloués équivalent vaut <code>quota / period</code> (ex: 200000 100000 &rarr; 2.0 cœurs). Dans cet exercice, le quota est positif ou nul, la période strictement positive, et le résultat est affiché avec une décimale ; à mi-chemin, arrondissez au dixième supérieur (1.25 &rarr; 1.3).<br>\n- <code>memory.max = &lt;limite_Mo&gt;</code> : Si la mémoire actuelle dépasse ou égale la limite, le groupe subit un étranglement ou risque l'OOM (<code>mem_status=SATURATED</code>), sinon <code>mem_status=OK</code>.<br><br>\nLe script Bash lit les paramètres sur l’entrée standard (stdin).<br><br>\nPour chaque groupe, afficher :<br>\n<code>CGROUP_AUDIT group={group} cpu_cores={val|UNLIMITED} mem_status={OK|SATURATED}</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (lx3-c4-e2) — Contrôleur de quotas et limites de ressources Cgroups v2 (cpu.max & memory.max)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\n# Écrivez votre traitement Bash ci-dessous (affichage attendu sur stdout)\n",
    "hints": [
      "Si cpu_quota == \"max\", la valeur de cpu_cores est la chaîne \"UNLIMITED\".",
      "Sinon, calculer int(cpu_quota) / int(cpu_period) et formater avec un chiffre après la virgule (ex: 1.5, 2.0).",
      "Comparer mem_curr_mb >= mem_max_mb pour le statut mémoire."
    ],
    "examples": [
      {
        "stdin": "CGROUP group=web_tier cpu_quota=200000 cpu_period=100000 mem_curr_mb=256 mem_max_mb=512",
        "expected": "CGROUP_AUDIT group=web_tier cpu_cores=2.0 mem_status=OK",
        "note": "200000 / 100000 = 2.0 cœurs. Mémoire 256 < 512 Mo : statut OK."
      }
    ],
    "tests": [
      {
        "label": "Groupe sans limite CPU (max) et mémoire saturée",
        "stdin": "CGROUP group=batch_proc cpu_quota=max cpu_period=100000 mem_curr_mb=1024 mem_max_mb=1024\nCGROUP group=below cpu_quota=max cpu_period=100000 mem_curr_mb=1023 mem_max_mb=1024",
        "expected": "CGROUP_AUDIT group=batch_proc cpu_cores=UNLIMITED mem_status=SATURATED\nCGROUP_AUDIT group=below cpu_cores=UNLIMITED mem_status=OK"
      },
      {
        "label": "Demi-cœur alloué (0.5) et statut mémoire sain",
        "stdin": "CGROUP group=micro_api cpu_quota=50000 cpu_period=100000 mem_curr_mb=64 mem_max_mb=128",
        "expected": "CGROUP_AUDIT group=micro_api cpu_cores=0.5 mem_status=OK"
      },
      {
        "label": "Quatre cœurs alloués et dépassement mémoire",
        "stdin": "CGROUP group=db_container cpu_quota=400000 cpu_period=100000 mem_curr_mb=4096 mem_max_mb=2048",
        "expected": "CGROUP_AUDIT group=db_container cpu_cores=4.0 mem_status=SATURATED"
      },
      {
        "label": "Arrondi à une décimale et seuil mémoire inclusif",
        "stdin": "CGROUP group=down cpu_quota=124999 cpu_period=100000 mem_curr_mb=99 mem_max_mb=100\nCGROUP group=half cpu_quota=125000 cpu_period=100000 mem_curr_mb=100 mem_max_mb=100\nCGROUP group=small cpu_quota=5000 cpu_period=100000 mem_curr_mb=0 mem_max_mb=1",
        "expected": "CGROUP_AUDIT group=down cpu_cores=1.2 mem_status=OK\nCGROUP_AUDIT group=half cpu_cores=1.3 mem_status=SATURATED\nCGROUP_AUDIT group=small cpu_cores=0.1 mem_status=OK"
      },
      {
        "label": "Arrondi CPU à la demi-décimale sans saturation mémoire",
        "stdin": "CGROUP group=round cpu_quota=55000 cpu_period=100000 mem_curr_mb=1 mem_max_mb=100",
        "expected": "CGROUP_AUDIT group=round cpu_cores=0.6 mem_status=OK"
      }
    ],
    "solution": "#!/usr/bin/env bash\nset -eu\nexport LC_ALL=C\nawk '\nfunction read_fields(line, fields,    cursor, start, key, value, character, following) {\n  for (key in fields) delete fields[key]\n  cursor = 1\n  while (cursor <= length(line)) {\n    while (cursor <= length(line) && substr(line, cursor, 1) ~ /[[:space:]]/) cursor++\n    if (cursor > length(line)) break\n    start = cursor\n    while (cursor <= length(line) && substr(line, cursor, 1) !~ /[=[:space:]]/) cursor++\n    key = substr(line, start, cursor - start)\n    if (substr(line, cursor, 1) != \"=\") {\n      while (cursor <= length(line) && substr(line, cursor, 1) !~ /[[:space:]]/) cursor++\n      continue\n    }\n    cursor++\n    value = \"\"\n    if (substr(line, cursor, 1) == \"\\\"\") {\n      cursor++\n      while (cursor <= length(line)) {\n        character = substr(line, cursor++, 1)\n        if (character == \"\\\"\") break\n        following = substr(line, cursor, 1)\n        if (character == \"\\\\\" && (following == \"\\\"\" || following == \"\\\\\")) {\n          value = value following\n          cursor++\n        } else {\n          value = value character\n        }\n      }\n    } else {\n      start = cursor\n      while (cursor <= length(line) && substr(line, cursor, 1) !~ /[[:space:]]/) cursor++\n      value = substr(line, start, cursor - start)\n    }\n    fields[key] = value\n  }\n}\n\n$1 == \"CGROUP\" {\n  read_fields($0, fields)\n  if (fields[\"cpu_quota\"] == \"max\") cores = \"UNLIMITED\"\n  else {\n    tenths = int((fields[\"cpu_quota\"] * 10 + fields[\"cpu_period\"] / 2) / fields[\"cpu_period\"])\n    cores = sprintf(\"%.0f.%d\", int(tenths / 10), tenths % 10)\n  }\n  memory = fields[\"mem_curr_mb\"] + 0 >= fields[\"mem_max_mb\"] + 0 ? \"SATURATED\" : \"OK\"\n  printf \"CGROUP_AUDIT group=%s cpu_cores=%s mem_status=%s\\n\", fields[\"group\"], cores, memory\n}\n\n'\n",
    "takeaway": "Cgroups v2 borne strictement CPU (cpu.max) et RAM (memory.max) d’un groupe de processus pour éviter qu’un service n’affame l’hôte."
  },
  {
    "id": "lx3-c4-e3",
    "chapter": 4,
    "title": "Détecteur de sacrifice OOM Killer et pondération oom_score_adj",
    "level": "n3",
    "language": "shell",
    "goal": "Calculer le score de sacrifice du mécanisme Out Of Memory (OOM Killer) du noyau Linux.",
    "brief": "<p>Lorsque la RAM physique et le swap sont intégralement épuisés, le noyau Linux invoque l'<strong>OOM Killer</strong> pour terminer un processus et libérer d'urgence de la mémoire.<br><br>\nChaque processus dispose d'un score d'ajustement configurable dans <code>/proc/[pid]/oom_score_adj</code> allant de <code>-1000</code> à <code>+1000</code> :<br>\n- Si <code>oom_score_adj == -1000</code> : le processus est <strong>totalement immunisé</strong> contre l'OOM Killer (ex: SSH, base de données critique). Son score final est <code>IMMUNE</code> et son risque est <code>NONE</code>.<br>\n- Sinon : <code>score = int(mem_mb) + int(oom_score_adj)</code>.<br>\nÉvaluation du risque :<br>\n- Si <code>score &gt; 1000</code> : <code>risk=HIGH</code> (première cible de sacrifice).<br>\n- Sinon : <code>risk=LOW</code>.<br><br>\nLe script Bash lit les paramètres sur l’entrée standard (stdin).<br><br>\nPour chaque processus, afficher :<br>\n<code>OOM_TARGET pid={pid} comm={comm} score={score|IMMUNE} risk={HIGH|LOW|NONE}</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (lx3-c4-e3) — Détecteur de sacrifice OOM Killer et pondération oom_score_adj\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\n# Écrivez votre traitement Bash ci-dessous (affichage attendu sur stdout)\n",
    "hints": [
      "Traiter en priorité le cas oom_score_adj == -1000 qui confère l’immunité absolue.",
      "Pour les autres processus, additionner mem_mb et oom_score_adj puis comparer à 1000.",
      "1. Ajustement à -1000 : score=IMMUNE et risk=NONE. 2. Sinon score = mem_mb + oom_score_adj. 3. Score supérieur à 1000 : risk=HIGH ; sinon LOW. 4. Afficher la ligne OOM_TARGET."
    ],
    "examples": [
      {
        "stdin": "OOM_PROC pid=1 comm=systemd mem_mb=25 oom_score_adj=-1000",
        "expected": "OOM_TARGET pid=1 comm=systemd score=IMMUNE risk=NONE",
        "note": "PID 1 (systemd) a un ajustement de -1000 : il ne sera jamais ciblé par l’OOM Killer."
      }
    ],
    "tests": [
      {
        "label": "Processus consommateur à haut risque de sacrifice",
        "stdin": "OOM_PROC pid=3420 comm=mem_leak mem_mb=1200 oom_score_adj=200\nOOM_PROC pid=3421 comm=edge mem_mb=1000 oom_score_adj=0",
        "expected": "OOM_TARGET pid=3420 comm=mem_leak score=1400 risk=HIGH\nOOM_TARGET pid=3421 comm=edge score=1000 risk=LOW"
      },
      {
        "label": "Processus protégé avec score négatif sans être immunisé",
        "stdin": "OOM_PROC pid=880 comm=sshd mem_mb=50 oom_score_adj=-500",
        "expected": "OOM_TARGET pid=880 comm=sshd score=-450 risk=LOW"
      },
      {
        "label": "Processus standard modéré",
        "stdin": "OOM_PROC pid=2100 comm=worker mem_mb=600 oom_score_adj=0",
        "expected": "OOM_TARGET pid=2100 comm=worker score=600 risk=LOW"
      },
      {
        "label": "Immunité et valeurs autour de la borne",
        "stdin": "OOM_PROC pid=50 comm=protected mem_mb=5000 oom_score_adj=-1000\nOOM_PROC pid=51 comm=high mem_mb=1 oom_score_adj=1000\nOOM_PROC pid=52 comm=negative mem_mb=0 oom_score_adj=-999",
        "expected": "OOM_TARGET pid=50 comm=protected score=IMMUNE risk=NONE\nOOM_TARGET pid=51 comm=high score=1001 risk=HIGH\nOOM_TARGET pid=52 comm=negative score=-999 risk=LOW"
      }
    ],
    "solution": "#!/usr/bin/env bash\nset -eu\nexport LC_ALL=C\nawk '\nfunction read_fields(line, fields,    cursor, start, key, value, character, following) {\n  for (key in fields) delete fields[key]\n  cursor = 1\n  while (cursor <= length(line)) {\n    while (cursor <= length(line) && substr(line, cursor, 1) ~ /[[:space:]]/) cursor++\n    if (cursor > length(line)) break\n    start = cursor\n    while (cursor <= length(line) && substr(line, cursor, 1) !~ /[=[:space:]]/) cursor++\n    key = substr(line, start, cursor - start)\n    if (substr(line, cursor, 1) != \"=\") {\n      while (cursor <= length(line) && substr(line, cursor, 1) !~ /[[:space:]]/) cursor++\n      continue\n    }\n    cursor++\n    value = \"\"\n    if (substr(line, cursor, 1) == \"\\\"\") {\n      cursor++\n      while (cursor <= length(line)) {\n        character = substr(line, cursor++, 1)\n        if (character == \"\\\"\") break\n        following = substr(line, cursor, 1)\n        if (character == \"\\\\\" && (following == \"\\\"\" || following == \"\\\\\")) {\n          value = value following\n          cursor++\n        } else {\n          value = value character\n        }\n      }\n    } else {\n      start = cursor\n      while (cursor <= length(line) && substr(line, cursor, 1) !~ /[[:space:]]/) cursor++\n      value = substr(line, start, cursor - start)\n    }\n    fields[key] = value\n  }\n}\n\n$1 == \"OOM_PROC\" {\n  read_fields($0, fields)\n  adjustment = fields[\"oom_score_adj\"] + 0\n  if (adjustment == -1000) { score = \"IMMUNE\"; risk = \"NONE\" }\n  else {\n    score = fields[\"mem_mb\"] + adjustment\n    risk = score > 1000 ? \"HIGH\" : \"LOW\"\n  }\n  printf \"OOM_TARGET pid=%s comm=%s score=%s risk=%s\\n\", fields[\"pid\"], fields[\"comm\"], score, risk\n}\n\n'\n",
    "takeaway": "Sous pression mémoire critique, l’OOM Killer sélectionne sa victime selon sa consommation pondérée par oom_score_adj."
  }
];
