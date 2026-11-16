'use strict';

module.exports = [
  {
    "id": "lx3-c1-e1",
    "chapter": 1,
    "title": "Parseur et auditeur de métriques de processus (/proc/[pid]/stat)",
    "level": "n1",
    "language": "shell",
    "goal": "Analyser les métriques d’état, de temps CPU et de mémoire résidente issues du pseudo-système de fichiers /proc.",
    "brief": "<p>Dans le noyau Linux, le pseudo-système de fichiers <code>/proc</code> expose directement en mémoire l'état interne des structures de données du noyau (notamment la structure <code>task_struct</code> pour chaque processus).<br><br>\nLe fichier <code>/proc/[pid]/stat</code> fournit sur une seule ligne les indicateurs vitaux d'exécution.<br><br>\nLe script Bash lit les paramètres sur l’entrée standard (stdin).<br><br>\nTable de correspondance de l'état :<br>\n- <code>R</code> &rarr; <code>RUNNING</code><br>\n- <code>S</code> &rarr; <code>SLEEPING</code><br>\n- <code>D</code> &rarr; <code>UNINTERRUPTIBLE_DISK</code><br>\n- <code>Z</code> &rarr; <code>ZOMBIE</code><br>\n- <code>T</code> &rarr; <code>STOPPED</code><br><br>\nCalculs à effectuer :<br>\n- <code>total_ticks = int(utime) + int(stime)</code><br>\n- <code>rss_kb = int(rss) * 4</code> (en considérant une taille standard de page mémoire de 4 Ko).<br><br>\nPour chaque ligne, afficher :<br>\n<code>STAT_AUDIT pid={pid} comm={comm} state_label={label} total_ticks={total_ticks} mem_kb={rss_kb}</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (lx3-c1-e1) — Parseur et auditeur de métriques de processus (/proc/[pid]/stat)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\n# Écrivez votre traitement Bash ci-dessous (affichage attendu sur stdout)\n",
    "hints": [
      "Extraire chaque champ clé-valeur avec des séparations d’espaces ou expressions régulières.",
      "Convertir utime, stime et rss en entiers avant d’effectuer les opérations arithmétiques.",
      "1. Extraire pid, comm, state, utime, stime et rss. 2. Traduire l’état via la table R, S, D, Z, T. 3. total_ticks = utime + stime ; mem_kb = rss × 4. 4. Afficher la ligne STAT_AUDIT."
    ],
    "examples": [
      {
        "stdin": "PROC_STAT pid=101 comm=nginx state=S ppid=1 utime=45 stime=15 rss=256",
        "expected": "STAT_AUDIT pid=101 comm=nginx state_label=SLEEPING total_ticks=60 mem_kb=1024",
        "note": "Processus en sommeil (S), total ticks = 45+15=60, mémoire = 256*4=1024 Ko."
      }
    ],
    "tests": [
      {
        "label": "Processus actif en cours d’exécution (R)",
        "stdin": "PROC_STAT pid=1250 comm=python3 state=R ppid=100 utime=320 stime=80 rss=1024\nPROC_STAT pid=2 comm=idle state=S ppid=1 utime=0 stime=0 rss=0",
        "expected": "STAT_AUDIT pid=1250 comm=python3 state_label=RUNNING total_ticks=400 mem_kb=4096\nSTAT_AUDIT pid=2 comm=idle state_label=SLEEPING total_ticks=0 mem_kb=0"
      },
      {
        "label": "Processus zombie (Z) et attente disque ininterruptible (D)",
        "stdin": "PROC_STAT pid=440 comm=defunct_job state=Z ppid=1 utime=5 stime=1 rss=0\nPROC_STAT pid=880 comm=dd_backup state=D ppid=500 utime=120 stime=300 rss=512",
        "expected": "STAT_AUDIT pid=440 comm=defunct_job state_label=ZOMBIE total_ticks=6 mem_kb=0\nSTAT_AUDIT pid=880 comm=dd_backup state_label=UNINTERRUPTIBLE_DISK total_ticks=420 mem_kb=2048"
      },
      {
        "label": "Processus stoppé par signal SIGSTOP (T)",
        "stdin": "PROC_STAT pid=999 comm=debugger state=T ppid=200 utime=10 stime=2 rss=128",
        "expected": "STAT_AUDIT pid=999 comm=debugger state_label=STOPPED total_ticks=12 mem_kb=512"
      },
      {
        "label": "Champs réordonnés, nom cité et plusieurs états",
        "stdin": "PROC_STAT rss=1 comm=\"worker x\" stime=2 pid=345 state=R utime=7 ppid=1\nPROC_STAT pid=346 comm=helper state=D ppid=1 utime=0 stime=1 rss=4",
        "expected": "STAT_AUDIT pid=345 comm=worker x state_label=RUNNING total_ticks=9 mem_kb=4\nSTAT_AUDIT pid=346 comm=helper state_label=UNINTERRUPTIBLE_DISK total_ticks=1 mem_kb=16"
      },
      {
        "label": "Temps système non nul et mémoire nulle",
        "stdin": "PROC_STAT pid=41 comm=batch state=R ppid=1 utime=7 stime=3 rss=0",
        "expected": "STAT_AUDIT pid=41 comm=batch state_label=RUNNING total_ticks=10 mem_kb=0"
      },
      {
        "label": "Mémoire non nulle et temps système nul",
        "stdin": "PROC_STAT pid=42 comm=idle state=S ppid=1 utime=7 stime=0 rss=3",
        "expected": "STAT_AUDIT pid=42 comm=idle state_label=SLEEPING total_ticks=7 mem_kb=12"
      }
    ],
    "solution": "#!/usr/bin/env bash\nset -eu\nexport LC_ALL=C\nawk '\nfunction read_fields(line, fields,    cursor, start, key, value, character, following) {\n  for (key in fields) delete fields[key]\n  cursor = 1\n  while (cursor <= length(line)) {\n    while (cursor <= length(line) && substr(line, cursor, 1) ~ /[[:space:]]/) cursor++\n    if (cursor > length(line)) break\n    start = cursor\n    while (cursor <= length(line) && substr(line, cursor, 1) !~ /[=[:space:]]/) cursor++\n    key = substr(line, start, cursor - start)\n    if (substr(line, cursor, 1) != \"=\") {\n      while (cursor <= length(line) && substr(line, cursor, 1) !~ /[[:space:]]/) cursor++\n      continue\n    }\n    cursor++\n    value = \"\"\n    if (substr(line, cursor, 1) == \"\\\"\") {\n      cursor++\n      while (cursor <= length(line)) {\n        character = substr(line, cursor++, 1)\n        if (character == \"\\\"\") break\n        following = substr(line, cursor, 1)\n        if (character == \"\\\\\" && (following == \"\\\"\" || following == \"\\\\\")) {\n          value = value following\n          cursor++\n        } else {\n          value = value character\n        }\n      }\n    } else {\n      start = cursor\n      while (cursor <= length(line) && substr(line, cursor, 1) !~ /[[:space:]]/) cursor++\n      value = substr(line, start, cursor - start)\n    }\n    fields[key] = value\n  }\n}\n\nBEGIN {\n  labels[\"R\"] = \"RUNNING\"; labels[\"S\"] = \"SLEEPING\"\n  labels[\"D\"] = \"UNINTERRUPTIBLE_DISK\"; labels[\"Z\"] = \"ZOMBIE\"; labels[\"T\"] = \"STOPPED\"\n}\n$1 == \"PROC_STAT\" {\n  read_fields($0, fields)\n  printf \"STAT_AUDIT pid=%s comm=%s state_label=%s total_ticks=%.0f mem_kb=%.0f\\n\", fields[\"pid\"], fields[\"comm\"], labels[fields[\"state\"]], fields[\"utime\"] + fields[\"stime\"], fields[\"rss\"] * 4\n}\n\n'\n",
    "takeaway": "Le pseudo-système /proc/<pid>/stat expose en temps réel état, temps CPU utilisateur/noyau et priorité interne du processus."
  },
  {
    "id": "lx3-c1-e2",
    "chapter": 1,
    "title": "Analyseur de cartographie de mémoire virtuelle (/proc/[pid]/maps)",
    "level": "n2",
    "language": "shell",
    "goal": "Analyser les plages d’adresses de mémoire virtuelle et détecter les violations du principe de sécurité W^X (Write XOR Execute).",
    "brief": "<p>Sous Linux, chaque processus dispose d'un espace d'adressage virtuel isolé divisé en segments (code, données, tas heap, pile stack, bibliothèques partagées mmap). Le fichier <code>/proc/[pid]/maps</code> détaille ces plages.<br><br>\nPour des raisons de sécurité (atténuation d'exploits de corruption de mémoire), le noyau moderne impose le principe <strong>W^X (Write XOR Execute)</strong> : une page de mémoire ne doit <strong>jamais être simultanément inscriptible (w) et exécutable (x)</strong>, car cela permet l'injection et l'exécution directe de shellcode.<br><br>\nLe script Bash lit les paramètres sur l’entrée standard (stdin).<br><br>\nCalculs :<br>\n- <code>size_kb = (int(end, 16) - int(start, 16)) // 1024</code><br>\n- Violation W^X : si <code>'w' in perms and 'x' in perms</code>, alors <code>wx_violation=OUI</code>, sinon <code>wx_violation=NON</code>.<br><br>\nPour chaque ligne, afficher :<br>\n<code>MAP_AUDIT pid={pid} path={pathname} size_kb={size_kb} wx_violation={wx_violation}</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (lx3-c1-e2) — Analyseur de cartographie de mémoire virtuelle (/proc/[pid]/maps)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\n# Écrivez votre traitement Bash ci-dessous (affichage attendu sur stdout)\n",
    "hints": [
      "Convertir les adresses hexadécimales en entiers avec int(val, 16).",
      "Calculer la taille en octets puis diviser par 1024 pour obtenir les kilo-octets.",
      "Vérifier si les caractères \"w\" et \"x\" sont tous deux présents dans la chaîne perms."
    ],
    "examples": [
      {
        "stdin": "VMMAP pid=42 start=00400000 end=00450000 perms=r-xp pathname=/usr/bin/app",
        "expected": "MAP_AUDIT pid=42 path=/usr/bin/app size_kb=320 wx_violation=NON",
        "note": "Plage de code en lecture/exécution (r-xp), taille 0x50000 = 327680 octets = 320 Ko, aucune violation."
      }
    ],
    "tests": [
      {
        "label": "Segment de données non exécutable et pile sécurisée",
        "stdin": "VMMAP pid=10 start=00600000 end=00610000 perms=rw-p pathname=[heap]\nVMMAP pid=10 start=7fff0000 end=7fff2000 perms=rw-p pathname=[stack]\nVMMAP pid=12 start=0 end=03ff perms=rwxp pathname=[boundary]",
        "expected": "MAP_AUDIT pid=10 path=[heap] size_kb=64 wx_violation=NON\nMAP_AUDIT pid=10 path=[stack] size_kb=8 wx_violation=NON\nMAP_AUDIT pid=12 path=[boundary] size_kb=0 wx_violation=OUI"
      },
      {
        "label": "Détection d’une violation critique W^X (page RWX inscriptible et exécutable)",
        "stdin": "VMMAP pid=777 start=10000000 end=10004000 perms=rwxp pathname=[jit_buffer]",
        "expected": "MAP_AUDIT pid=777 path=[jit_buffer] size_kb=16 wx_violation=OUI"
      },
      {
        "label": "Bibliothèque partagée en lecture seule",
        "stdin": "VMMAP pid=500 start=7f800000 end=7fa00000 perms=r--p pathname=/lib/x86_64-linux-gnu/libc.so",
        "expected": "MAP_AUDIT pid=500 path=/lib/x86_64-linux-gnu/libc.so size_kb=2048 wx_violation=NON"
      },
      {
        "label": "Bornes hexadécimales au-dessus de la précision flottante",
        "stdin": "VMMAP pid=13 start=ffffffffff700000 end=ffffffffff700400 perms=rw-p pathname=[high]\nVMMAP pid=14 start=0 end=FFFFFFFFFFFFFFFF perms=r-xp pathname=[wide]",
        "expected": "MAP_AUDIT pid=13 path=[high] size_kb=1 wx_violation=NON\nMAP_AUDIT pid=14 path=[wide] size_kb=18014398509481983 wx_violation=NON"
      },
      {
        "label": "Page alignée inscriptible sans exécution",
        "stdin": "VMMAP pid=81 start=0 end=0400 perms=rw-p pathname=[data]",
        "expected": "MAP_AUDIT pid=81 path=[data] size_kb=1 wx_violation=NON"
      },
      {
        "label": "Plage non alignée W et X",
        "stdin": "VMMAP pid=82 start=0 end=03ff perms=rwxp pathname=[jit]",
        "expected": "MAP_AUDIT pid=82 path=[jit] size_kb=0 wx_violation=OUI"
      }
    ],
    "solution": "#!/usr/bin/env bash\nset -eu\nexport LC_ALL=C\nawk '\nfunction read_fields(line, fields,    cursor, start, key, value, character, following) {\n  for (key in fields) delete fields[key]\n  cursor = 1\n  while (cursor <= length(line)) {\n    while (cursor <= length(line) && substr(line, cursor, 1) ~ /[[:space:]]/) cursor++\n    if (cursor > length(line)) break\n    start = cursor\n    while (cursor <= length(line) && substr(line, cursor, 1) !~ /[=[:space:]]/) cursor++\n    key = substr(line, start, cursor - start)\n    if (substr(line, cursor, 1) != \"=\") {\n      while (cursor <= length(line) && substr(line, cursor, 1) !~ /[[:space:]]/) cursor++\n      continue\n    }\n    cursor++\n    value = \"\"\n    if (substr(line, cursor, 1) == \"\\\"\") {\n      cursor++\n      while (cursor <= length(line)) {\n        character = substr(line, cursor++, 1)\n        if (character == \"\\\"\") break\n        following = substr(line, cursor, 1)\n        if (character == \"\\\\\" && (following == \"\\\"\" || following == \"\\\\\")) {\n          value = value following\n          cursor++\n        } else {\n          value = value character\n        }\n      }\n    } else {\n      start = cursor\n      while (cursor <= length(line) && substr(line, cursor, 1) !~ /[[:space:]]/) cursor++\n      value = substr(line, start, cursor - start)\n    }\n    fields[key] = value\n  }\n}\n\nfunction hex_value(character) {\n  return index(\"0123456789abcdef\", tolower(character)) - 1\n}\nfunction decimal_times_sixteen(decimal, digit,    result, carry, position, value) {\n  result = \"\"\n  carry = digit\n  for (position = length(decimal); position > 0; position--) {\n    value = (substr(decimal, position, 1) + 0) * 16 + carry\n    result = (value % 10) result\n    carry = int(value / 10)\n  }\n  while (carry > 0) {\n    result = (carry % 10) result\n    carry = int(carry / 10)\n  }\n  sub(/^0+/, \"\", result)\n  return result == \"\" ? \"0\" : result\n}\nfunction range_kib(start, end,    width, position, right, left, value, borrow, difference, remainder, quotient, result) {\n  sub(/^0[xX]/, \"\", start); sub(/^0[xX]/, \"\", end)\n  width = length(start) > length(end) ? length(start) : length(end)\n  difference = \"\"; borrow = 0\n  for (position = 0; position < width; position++) {\n    right = length(end) - position > 0 ? hex_value(substr(end, length(end) - position, 1)) : 0\n    left = length(start) - position > 0 ? hex_value(substr(start, length(start) - position, 1)) : 0\n    value = right - left - borrow\n    borrow = value < 0\n    if (borrow) value += 16\n    difference = substr(\"0123456789abcdef\", value + 1, 1) difference\n  }\n  result = \"0\"; remainder = 0\n  for (position = 1; position <= width; position++) {\n    remainder = remainder * 16 + hex_value(substr(difference, position, 1))\n    quotient = int(remainder / 1024)\n    remainder %= 1024\n    result = decimal_times_sixteen(result, quotient)\n  }\n  return result\n}\n$1 == \"VMMAP\" {\n  read_fields($0, fields)\n  violation = index(fields[\"perms\"], \"w\") && index(fields[\"perms\"], \"x\") ? \"OUI\" : \"NON\"\n  printf \"MAP_AUDIT pid=%s path=%s size_kb=%s wx_violation=%s\\n\", fields[\"pid\"], fields[\"pathname\"], range_kib(fields[\"start\"], fields[\"end\"]), violation\n}\n\n'\n",
    "takeaway": "Lire /proc/<pid>/maps révèle segments de code, tas, pile et bibliothèques partagées avec leurs permissions mémoire rwxp."
  },
  {
    "id": "lx3-c1-e3",
    "chapter": 1,
    "title": "Décodeur et profileur d’appels système (strace tracer)",
    "level": "n3",
    "language": "shell",
    "goal": "Analyser les traces d’appels système (syscalls) pour isoler les erreurs d’I/O et profiler la latence noyau.",
    "brief": "<p>L'utilitaire <code>strace</code> intercepte et enregistre les appels système (syscalls) effectués par un processus et les signaux reçus via l'API <code>ptrace(2)</code> du noyau Linux.<br><br>\nLe script Bash lit les paramètres sur l’entrée standard (stdin).<br><br>\nRègles d'analyse :<br>\n1. Si <code>ret</code> commence par <code>-</code> ou est égal à une constante d'erreur POSIX (ex: <code>ENOENT</code>, <code>EACCES</code>, <code>EPERM</code>, <code>EBADF</code>), le statut est <code>ERROR</code> et l'erreur est consignée.<br>\n2. Sinon, le statut est <code>SUCCESS</code> et le code d'erreur est <code>NONE</code>.<br>\n3. Latence : si <code>int(time_us) &gt; 5000</code>, classer comme <code>SLOW=OUI</code>, sinon <code>SLOW=NON</code>.<br><br>\nPour chaque appel, afficher :<br>\n<code>SYSCALL_PROFILE pid={pid} name={name} status={SUCCESS|ERROR} err={err} duration_us={time_us} slow={SLOW}</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (lx3-c1-e3) — Décodeur et profileur d’appels système (strace tracer)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\n# Écrivez votre traitement Bash ci-dessous (affichage attendu sur stdout)\n",
    "hints": [
      "Vérifier si le champ ret commence par \"-\" ou figure dans un ensemble d’erreurs POSIX.",
      "Convertir time_us en entier pour tester le seuil de 5000 microsecondes (5 ms).",
      "1. ret négatif ou constante POSIX : status=ERROR et err=ret ; sinon SUCCESS et err=NONE. 2. time_us > 5000 : slow=OUI, sinon NON. 3. Afficher la ligne SYSCALL_PROFILE."
    ],
    "examples": [
      {
        "stdin": "SYSCALL pid=101 name=openat args=\"AT_FDCWD,/etc/passwd,O_RDONLY\" ret=3 time_us=45",
        "expected": "SYSCALL_PROFILE pid=101 name=openat status=SUCCESS err=NONE duration_us=45 slow=NON",
        "note": "Appel système réussi retournant le descripteur de fichier 3, durée 45 µs."
      }
    ],
    "tests": [
      {
        "label": "Erreur de fichier introuvable (ENOENT ou code négatif)",
        "stdin": "SYSCALL pid=101 name=openat args=\"AT_FDCWD,/tmp/missing.txt,O_RDONLY\" ret=-ENOENT time_us=80\nSYSCALL pid=101 name=read args=\"3,buf,1024\" ret=-1 time_us=12\nSYSCALL pid=102 name=read args=\"4,buf,1\" ret=0 time_us=5000",
        "expected": "SYSCALL_PROFILE pid=101 name=openat status=ERROR err=-ENOENT duration_us=80 slow=NON\nSYSCALL_PROFILE pid=101 name=read status=ERROR err=-1 duration_us=12 slow=NON\nSYSCALL_PROFILE pid=102 name=read status=SUCCESS err=NONE duration_us=5000 slow=NON"
      },
      {
        "label": "Appel bloquant avec latence excessive (SLOW=OUI)",
        "stdin": "SYSCALL pid=202 name=epoll_wait args=\"4,events,64,-1\" ret=1 time_us=12000",
        "expected": "SYSCALL_PROFILE pid=202 name=epoll_wait status=SUCCESS err=NONE duration_us=12000 slow=OUI"
      },
      {
        "label": "Refus de permission (EACCES)",
        "stdin": "SYSCALL pid=303 name=write args=\"1,data,512\" ret=EACCES time_us=150",
        "expected": "SYSCALL_PROFILE pid=303 name=write status=ERROR err=EACCES duration_us=150 slow=NON"
      },
      {
        "label": "Seuil strict et autre constante d’erreur",
        "stdin": "SYSCALL pid=90 name=read args=\"5,buf,8\" ret=EAGAIN time_us=5001\nSYSCALL pid=91 name=write args=\"1,buf,8\" ret=42 time_us=4999",
        "expected": "SYSCALL_PROFILE pid=90 name=read status=ERROR err=EAGAIN duration_us=5001 slow=OUI\nSYSCALL_PROFILE pid=91 name=write status=SUCCESS err=NONE duration_us=4999 slow=NON"
      }
    ],
    "solution": "#!/usr/bin/env bash\nset -eu\nexport LC_ALL=C\nawk '\nfunction read_fields(line, fields,    cursor, start, key, value, character, following) {\n  for (key in fields) delete fields[key]\n  cursor = 1\n  while (cursor <= length(line)) {\n    while (cursor <= length(line) && substr(line, cursor, 1) ~ /[[:space:]]/) cursor++\n    if (cursor > length(line)) break\n    start = cursor\n    while (cursor <= length(line) && substr(line, cursor, 1) !~ /[=[:space:]]/) cursor++\n    key = substr(line, start, cursor - start)\n    if (substr(line, cursor, 1) != \"=\") {\n      while (cursor <= length(line) && substr(line, cursor, 1) !~ /[[:space:]]/) cursor++\n      continue\n    }\n    cursor++\n    value = \"\"\n    if (substr(line, cursor, 1) == \"\\\"\") {\n      cursor++\n      while (cursor <= length(line)) {\n        character = substr(line, cursor++, 1)\n        if (character == \"\\\"\") break\n        following = substr(line, cursor, 1)\n        if (character == \"\\\\\" && (following == \"\\\"\" || following == \"\\\\\")) {\n          value = value following\n          cursor++\n        } else {\n          value = value character\n        }\n      }\n    } else {\n      start = cursor\n      while (cursor <= length(line) && substr(line, cursor, 1) !~ /[[:space:]]/) cursor++\n      value = substr(line, start, cursor - start)\n    }\n    fields[key] = value\n  }\n}\n\n$1 == \"SYSCALL\" {\n  read_fields($0, fields)\n  failed = fields[\"ret\"] ~ /^-/ || fields[\"ret\"] ~ /^E[A-Z0-9_]+$/\n  status = failed ? \"ERROR\" : \"SUCCESS\"\n  error = failed ? fields[\"ret\"] : \"NONE\"\n  slow = fields[\"time_us\"] + 0 > 5000 ? \"OUI\" : \"NON\"\n  printf \"SYSCALL_PROFILE pid=%s name=%s status=%s err=%s duration_us=%s slow=%s\\n\", fields[\"pid\"], fields[\"name\"], status, error, fields[\"time_us\"], slow\n}\n\n'\n",
    "takeaway": "Analyser la trace strace permet de repérer rapidement appels système bloquants, fichiers manquants (ENOENT) ou erreurs d’accès."
  }
];
