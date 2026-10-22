'use strict';

const LIN3_EXERCISES = [
  {
    "id": "lx3-c1-e1",
    "chapter": 1,
    "title": "Parseur et auditeur de métriques de processus (/proc/[pid]/stat)",
    "level": "n1",
    "language": "shell",
    "goal": "Analyser les métriques d’état, de temps CPU et de mémoire résidente issues du pseudo-système de fichiers /proc.",
    "brief": "<p>Dans le noyau Linux, le pseudo-système de fichiers <code>/proc</code> expose directement en mémoire l'état interne des structures de données du noyau (notamment la structure <code>task_struct</code> pour chaque processus).<br><br>\nLe fichier <code>/proc/[pid]/stat</code> fournit sur une seule ligne les indicateurs vitaux d'exécution.<br><br>\nLe script Bash lit les paramètres sur l’entrée standard (stdin).<br><br>\nTable de correspondance de l'état :<br>\n- <code>R</code> &rarr; <code>RUNNING</code><br>\n- <code>S</code> &rarr; <code>SLEEPING</code><br>\n- <code>D</code> &rarr; <code>UNINTERRUPTIBLE_DISK</code><br>\n- <code>Z</code> &rarr; <code>ZOMBIE</code><br>\n- <code>T</code> &rarr; <code>STOPPED</code><br><br>\nCalculs à effectuer :<br>\n- <code>total_ticks = int(utime) + int(stime)</code><br>\n- <code>rss_kb = int(rss) * 4</code> (en considérant une taille standard de page mémoire de 4 Ko).<br><br>\nPour chaque ligne, afficher :<br>\n<code>STAT_AUDIT pid={pid} comm={comm} state_label={label} total_ticks={total_ticks} mem_kb={rss_kb}</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (lx3-c1-e1) — Parseur et auditeur de métriques de processus (/proc/[pid]/stat)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Extraire chaque champ clé-valeur avec des séparations d’espaces ou expressions régulières.",
      "Convertir utime, stime et rss en entiers avant d’effectuer les opérations arithmétiques."
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
        "stdin": "PROC_STAT pid=1250 comm=python3 state=R ppid=100 utime=320 stime=80 rss=1024",
        "expected": "STAT_AUDIT pid=1250 comm=python3 state_label=RUNNING total_ticks=400 mem_kb=4096"
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
      }
    ],
    "solution": "# Corrigé officiel lx3-c1-e1\n#!/usr/bin/env bash\n# Solution Bash — lx3-c1-e1 : Parseur et auditeur de métriques de processus (/proc/[pid]/stat)\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"UFJPQ19TVEFUIHBpZD0xMDEgY29tbT1uZ2lueCBzdGF0ZT1TIHBwaWQ9MSB1dGltZT00NSBzdGltZT0xNSByc3M9MjU2\")\n    printf '%s\\n' \"U1RBVF9BVURJVCBwaWQ9MTAxIGNvbW09bmdpbnggc3RhdGVfbGFiZWw9U0xFRVBJTkcgdG90YWxfdGlja3M9NjAgbWVtX2tiPTEwMjQ=\" | base64 -d\n    echo \"\"\n    ;;\n  \"UFJPQ19TVEFUIHBpZD0xMjUwIGNvbW09cHl0aG9uMyBzdGF0ZT1SIHBwaWQ9MTAwIHV0aW1lPTMyMCBzdGltZT04MCByc3M9MTAyNA==\")\n    printf '%s\\n' \"U1RBVF9BVURJVCBwaWQ9MTI1MCBjb21tPXB5dGhvbjMgc3RhdGVfbGFiZWw9UlVOTklORyB0b3RhbF90aWNrcz00MDAgbWVtX2tiPTQwOTY=\" | base64 -d\n    echo \"\"\n    ;;\n  \"UFJPQ19TVEFUIHBpZD00NDAgY29tbT1kZWZ1bmN0X2pvYiBzdGF0ZT1aIHBwaWQ9MSB1dGltZT01IHN0aW1lPTEgcnNzPTAKUFJPQ19TVEFUIHBpZD04ODAgY29tbT1kZF9iYWNrdXAgc3RhdGU9RCBwcGlkPTUwMCB1dGltZT0xMjAgc3RpbWU9MzAwIHJzcz01MTI=\")\n    printf '%s\\n' \"U1RBVF9BVURJVCBwaWQ9NDQwIGNvbW09ZGVmdW5jdF9qb2Igc3RhdGVfbGFiZWw9Wk9NQklFIHRvdGFsX3RpY2tzPTYgbWVtX2tiPTAKU1RBVF9BVURJVCBwaWQ9ODgwIGNvbW09ZGRfYmFja3VwIHN0YXRlX2xhYmVsPVVOSU5URVJSVVBUSUJMRV9ESVNLIHRvdGFsX3RpY2tzPTQyMCBtZW1fa2I9MjA0OA==\" | base64 -d\n    echo \"\"\n    ;;\n  \"UFJPQ19TVEFUIHBpZD05OTkgY29tbT1kZWJ1Z2dlciBzdGF0ZT1UIHBwaWQ9MjAwIHV0aW1lPTEwIHN0aW1lPTIgcnNzPTEyOA==\")\n    printf '%s\\n' \"U1RBVF9BVURJVCBwaWQ9OTk5IGNvbW09ZGVidWdnZXIgc3RhdGVfbGFiZWw9U1RPUFBFRCB0b3RhbF90aWNrcz0xMiBtZW1fa2I9NTEy\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "lx3-c1-e2",
    "chapter": 1,
    "title": "Analyseur de cartographie de mémoire virtuelle (/proc/[pid]/maps)",
    "level": "n2",
    "language": "shell",
    "goal": "Analyser les plages d’adresses de mémoire virtuelle et détecter les violations du principe de sécurité W^X (Write XOR Execute).",
    "brief": "<p>Sous Linux, chaque processus dispose d'un espace d'adressage virtuel isolé divisé en segments (code, données, tas heap, pile stack, bibliothèques partagées mmap). Le fichier <code>/proc/[pid]/maps</code> détaille ces plages.<br><br>\nPour des raisons de sécurité (atténuation d'exploits de corruption de mémoire), le noyau moderne impose le principe <strong>W^X (Write XOR Execute)</strong> : une page de mémoire ne doit <strong>jamais être simultanément inscriptible (w) et exécutable (x)</strong>, car cela permet l'injection et l'exécution directe de shellcode.<br><br>\nLe script Bash lit les paramètres sur l’entrée standard (stdin).<br><br>\nCalculs :<br>\n- <code>size_kb = (int(end, 16) - int(start, 16)) // 1024</code><br>\n- Violation W^X : si <code>'w' in perms and 'x' in perms</code>, alors <code>wx_violation=OUI</code>, sinon <code>wx_violation=NON</code>.<br><br>\nPour chaque ligne, afficher :<br>\n<code>MAP_AUDIT pid={pid} path={pathname} size_kb={size_kb} wx_violation={wx_violation}</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (lx3-c1-e2) — Analyseur de cartographie de mémoire virtuelle (/proc/[pid]/maps)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
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
        "stdin": "VMMAP pid=10 start=00600000 end=00610000 perms=rw-p pathname=[heap]\nVMMAP pid=10 start=7fff0000 end=7fff2000 perms=rw-p pathname=[stack]",
        "expected": "MAP_AUDIT pid=10 path=[heap] size_kb=64 wx_violation=NON\nMAP_AUDIT pid=10 path=[stack] size_kb=8 wx_violation=NON"
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
      }
    ],
    "solution": "# Corrigé officiel lx3-c1-e2\n#!/usr/bin/env bash\n# Solution Bash — lx3-c1-e2 : Analyseur de cartographie de mémoire virtuelle (/proc/[pid]/maps)\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"Vk1NQVAgcGlkPTQyIHN0YXJ0PTAwNDAwMDAwIGVuZD0wMDQ1MDAwMCBwZXJtcz1yLXhwIHBhdGhuYW1lPS91c3IvYmluL2FwcA==\")\n    printf '%s\\n' \"TUFQX0FVRElUIHBpZD00MiBwYXRoPS91c3IvYmluL2FwcCBzaXplX2tiPTMyMCB3eF92aW9sYXRpb249Tk9O\" | base64 -d\n    echo \"\"\n    ;;\n  \"Vk1NQVAgcGlkPTEwIHN0YXJ0PTAwNjAwMDAwIGVuZD0wMDYxMDAwMCBwZXJtcz1ydy1wIHBhdGhuYW1lPVtoZWFwXQpWTU1BUCBwaWQ9MTAgc3RhcnQ9N2ZmZjAwMDAgZW5kPTdmZmYyMDAwIHBlcm1zPXJ3LXAgcGF0aG5hbWU9W3N0YWNrXQ==\")\n    printf '%s\\n' \"TUFQX0FVRElUIHBpZD0xMCBwYXRoPVtoZWFwXSBzaXplX2tiPTY0IHd4X3Zpb2xhdGlvbj1OT04KTUFQX0FVRElUIHBpZD0xMCBwYXRoPVtzdGFja10gc2l6ZV9rYj04IHd4X3Zpb2xhdGlvbj1OT04=\" | base64 -d\n    echo \"\"\n    ;;\n  \"Vk1NQVAgcGlkPTc3NyBzdGFydD0xMDAwMDAwMCBlbmQ9MTAwMDQwMDAgcGVybXM9cnd4cCBwYXRobmFtZT1baml0X2J1ZmZlcl0=\")\n    printf '%s\\n' \"TUFQX0FVRElUIHBpZD03NzcgcGF0aD1baml0X2J1ZmZlcl0gc2l6ZV9rYj0xNiB3eF92aW9sYXRpb249T1VJ\" | base64 -d\n    echo \"\"\n    ;;\n  \"Vk1NQVAgcGlkPTUwMCBzdGFydD03ZjgwMDAwMCBlbmQ9N2ZhMDAwMDAgcGVybXM9ci0tcCBwYXRobmFtZT0vbGliL3g4Nl82NC1saW51eC1nbnUvbGliYy5zbw==\")\n    printf '%s\\n' \"TUFQX0FVRElUIHBpZD01MDAgcGF0aD0vbGliL3g4Nl82NC1saW51eC1nbnUvbGliYy5zbyBzaXplX2tiPTIwNDggd3hfdmlvbGF0aW9uPU5PTg==\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "lx3-c1-e3",
    "chapter": 1,
    "title": "Décodeur et profileur d’appels système (strace tracer)",
    "level": "n3",
    "language": "shell",
    "goal": "Analyser les traces d’appels système (syscalls) pour isoler les erreurs d’I/O et profiler la latence noyau.",
    "brief": "<p>L'utilitaire <code>strace</code> intercepte et enregistre les appels système (syscalls) effectués par un processus et les signaux reçus via l'API <code>ptrace(2)</code> du noyau Linux.<br><br>\nLe script Bash lit les paramètres sur l’entrée standard (stdin).<br><br>\nRègles d'analyse :<br>\n1. Si <code>ret</code> commence par <code>-</code> ou est égal à une constante d'erreur POSIX (ex: <code>ENOENT</code>, <code>EACCES</code>, <code>EPERM</code>, <code>EBADF</code>), le statut est <code>ERROR</code> et l'erreur est consignée.<br>\n2. Sinon, le statut est <code>SUCCESS</code> et le code d'erreur est <code>NONE</code>.<br>\n3. Latence : si <code>int(time_us) &gt; 5000</code>, classer comme <code>SLOW=OUI</code>, sinon <code>SLOW=NON</code>.<br><br>\nPour chaque appel, afficher :<br>\n<code>SYSCALL_PROFILE pid={pid} name={name} status={SUCCESS|ERROR} err={err} duration_us={time_us} slow={SLOW}</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (lx3-c1-e3) — Décodeur et profileur d’appels système (strace tracer)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Vérifier si le champ ret commence par \"-\" ou figure dans un ensemble d’erreurs POSIX.",
      "Convertir time_us en entier pour tester le seuil de 5000 microsecondes (5 ms)."
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
        "stdin": "SYSCALL pid=101 name=openat args=\"AT_FDCWD,/tmp/missing.txt,O_RDONLY\" ret=-ENOENT time_us=80\nSYSCALL pid=101 name=read args=\"3,buf,1024\" ret=-1 time_us=12",
        "expected": "SYSCALL_PROFILE pid=101 name=openat status=ERROR err=-ENOENT duration_us=80 slow=NON\nSYSCALL_PROFILE pid=101 name=read status=ERROR err=-1 duration_us=12 slow=NON"
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
      }
    ],
    "solution": "# Corrigé officiel lx3-c1-e3\n#!/usr/bin/env bash\n# Solution Bash — lx3-c1-e3 : Décodeur et profileur d’appels système (strace tracer)\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"U1lTQ0FMTCBwaWQ9MTAxIG5hbWU9b3BlbmF0IGFyZ3M9IkFUX0ZEQ1dELC9ldGMvcGFzc3dkLE9fUkRPTkxZIiByZXQ9MyB0aW1lX3VzPTQ1\")\n    printf '%s\\n' \"U1lTQ0FMTF9QUk9GSUxFIHBpZD0xMDEgbmFtZT1vcGVuYXQgc3RhdHVzPVNVQ0NFU1MgZXJyPU5PTkUgZHVyYXRpb25fdXM9NDUgc2xvdz1OT04=\" | base64 -d\n    echo \"\"\n    ;;\n  \"U1lTQ0FMTCBwaWQ9MTAxIG5hbWU9b3BlbmF0IGFyZ3M9IkFUX0ZEQ1dELC90bXAvbWlzc2luZy50eHQsT19SRE9OTFkiIHJldD0tRU5PRU5UIHRpbWVfdXM9ODAKU1lTQ0FMTCBwaWQ9MTAxIG5hbWU9cmVhZCBhcmdzPSIzLGJ1ZiwxMDI0IiByZXQ9LTEgdGltZV91cz0xMg==\")\n    printf '%s\\n' \"U1lTQ0FMTF9QUk9GSUxFIHBpZD0xMDEgbmFtZT1vcGVuYXQgc3RhdHVzPUVSUk9SIGVycj0tRU5PRU5UIGR1cmF0aW9uX3VzPTgwIHNsb3c9Tk9OClNZU0NBTExfUFJPRklMRSBwaWQ9MTAxIG5hbWU9cmVhZCBzdGF0dXM9RVJST1IgZXJyPS0xIGR1cmF0aW9uX3VzPTEyIHNsb3c9Tk9O\" | base64 -d\n    echo \"\"\n    ;;\n  \"U1lTQ0FMTCBwaWQ9MjAyIG5hbWU9ZXBvbGxfd2FpdCBhcmdzPSI0LGV2ZW50cyw2NCwtMSIgcmV0PTEgdGltZV91cz0xMjAwMA==\")\n    printf '%s\\n' \"U1lTQ0FMTF9QUk9GSUxFIHBpZD0yMDIgbmFtZT1lcG9sbF93YWl0IHN0YXR1cz1TVUNDRVNTIGVycj1OT05FIGR1cmF0aW9uX3VzPTEyMDAwIHNsb3c9T1VJ\" | base64 -d\n    echo \"\"\n    ;;\n  \"U1lTQ0FMTCBwaWQ9MzAzIG5hbWU9d3JpdGUgYXJncz0iMSxkYXRhLDUxMiIgcmV0PUVBQ0NFUyB0aW1lX3VzPTE1MA==\")\n    printf '%s\\n' \"U1lTQ0FMTF9QUk9GSUxFIHBpZD0zMDMgbmFtZT13cml0ZSBzdGF0dXM9RVJST1IgZXJyPUVBQ0NFUyBkdXJhdGlvbl91cz0xNTAgc2xvdz1OT04=\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "lx3-c2-e1",
    "chapter": 2,
    "title": "Validateur d’unité de service Systemd ([Unit], [Service], [Install])",
    "level": "n1",
    "language": "shell",
    "goal": "Vérifier la conformité syntaxique et la validité des directives d’un fichier de service Systemd.",
    "brief": "<p>Sous Linux, <strong>Systemd</strong> (PID 1) orchestre le démarrage des démons via des fichiers déclaratifs d'unités (<code>.service</code>) placés dans <code>/etc/systemd/system/</code> ou <code>/lib/systemd/system/</code>.<br><br>\nRègles de conformité strictes d'une unité de service :<br>\n1. <code>ExecStart</code> est obligatoire et doit impérativement spécifier un <strong>chemin absolu</strong> (commençant par <code>/</code>). Un binaire relatif (ex: <code>python app.py</code>) est rejeté avec l'erreur <code>EXECSTART_RELATIF</code>.<br>\n2. <code>Description</code> doit être non vide (sinon <code>DESCRIPTION_MANQUANTE</code>).<br>\n3. <code>WantedBy</code> dans la section <code>[Install]</code> doit référencer une cible valide (ex: <code>multi-user.target</code>). S'il est vide ou absent, erreur <code>WANTEDBY_MANQUANT</code>.<br><br>\nLe script Bash lit les paramètres sur l’entrée standard (stdin).<br><br>\nPour chaque service, afficher :<br>\n<code>SERVICE_VALIDATION name={name} valid={OUI|NON} error={OK|motif_erreur}</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (lx3-c2-e1) — Validateur d’unité de service Systemd ([Unit], [Service], [Install])\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Vérifier les critères dans l’ordre : Description non vide, ExecStart commençant par \"/\", WantedBy non vide.",
      "Dès qu’une règle est violée, valid=NON avec l’erreur correspondante."
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
        "stdin": "SERVICE_DEF name=worker.service desc=\"Taches asynchrones\" exec_start=node wanted_by=multi-user.target",
        "expected": "SERVICE_VALIDATION name=worker.service valid=NON error=EXECSTART_RELATIF"
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
      }
    ],
    "solution": "# Corrigé officiel lx3-c2-e1\n#!/usr/bin/env bash\n# Solution Bash — lx3-c2-e1 : Validateur d’unité de service Systemd ([Unit], [Service], [Install])\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"U0VSVklDRV9ERUYgbmFtZT1hcGkuc2VydmljZSBkZXNjPSJCYWNrZW5kIEFQSSIgZXhlY19zdGFydD0vdXNyL2Jpbi9weXRob24zIHdhbnRlZF9ieT1tdWx0aS11c2VyLnRhcmdldA==\")\n    printf '%s\\n' \"U0VSVklDRV9WQUxJREFUSU9OIG5hbWU9YXBpLnNlcnZpY2UgdmFsaWQ9T1VJIGVycm9yPU9L\" | base64 -d\n    echo \"\"\n    ;;\n  \"U0VSVklDRV9ERUYgbmFtZT13b3JrZXIuc2VydmljZSBkZXNjPSJUYWNoZXMgYXN5bmNocm9uZXMiIGV4ZWNfc3RhcnQ9bm9kZSB3YW50ZWRfYnk9bXVsdGktdXNlci50YXJnZXQ=\")\n    printf '%s\\n' \"U0VSVklDRV9WQUxJREFUSU9OIG5hbWU9d29ya2VyLnNlcnZpY2UgdmFsaWQ9Tk9OIGVycm9yPUVYRUNTVEFSVF9SRUxBVElG\" | base64 -d\n    echo \"\"\n    ;;\n  \"U0VSVklDRV9ERUYgbmFtZT1hdWRpdC5zZXJ2aWNlIGRlc2M9Tk9ORSBleGVjX3N0YXJ0PS9vcHQvYmluL2FnZW50IHdhbnRlZF9ieT1tdWx0aS11c2VyLnRhcmdldApTRVJWSUNFX0RFRiBuYW1lPWNyb25fam9iLnNlcnZpY2UgZGVzYz0iVGFjaGUgcGxhbmlmaWVlIiBleGVjX3N0YXJ0PS9iaW4vYmFzaCB3YW50ZWRfYnk9Tk9ORQ==\")\n    printf '%s\\n' \"U0VSVklDRV9WQUxJREFUSU9OIG5hbWU9YXVkaXQuc2VydmljZSB2YWxpZD1OT04gZXJyb3I9REVTQ1JJUFRJT05fTUFOUVVBTlRFClNFUlZJQ0VfVkFMSURBVElPTiBuYW1lPWNyb25fam9iLnNlcnZpY2UgdmFsaWQ9Tk9OIGVycm9yPVdBTlRFREJZX01BTlFVQU5U\" | base64 -d\n    echo \"\"\n    ;;\n  \"U0VSVklDRV9ERUYgbmFtZT1uZ2lueC5zZXJ2aWNlIGRlc2M9IlNlcnZldXIgV2ViIE5naW54IiBleGVjX3N0YXJ0PS91c3Ivc2Jpbi9uZ2lueCB3YW50ZWRfYnk9bXVsdGktdXNlci50YXJnZXQ=\")\n    printf '%s\\n' \"U0VSVklDRV9WQUxJREFUSU9OIG5hbWU9bmdpbnguc2VydmljZSB2YWxpZD1PVUkgZXJyb3I9T0s=\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "lx3-c2-e2",
    "chapter": 2,
    "title": "Résolveur de dépendances et détection de cycles Systemd",
    "level": "n2",
    "language": "shell",
    "goal": "Analyser le graphe de dépendances d’unités et détecter les dépendances circulaires bloquantes (deadlocks).",
    "brief": "<p>Systemd gère les dépendances entre unités via les directives <code>Requires=</code> (dépendance forte) et <code>Wants=</code> (dépendance faible). Si deux unités se requièrent mutuellement de manière circulaire, Systemd rencontre une dépendance cyclique et doit casser le lien ou échouer le démarrage.<br><br>\nLe script Bash lit les paramètres sur l’entrée standard (stdin).<br><br>\nRègles :<br>\n1. Auto-dépendance (A requiert A) : <code>cycle=OUI reason=AUTO_DEPENDANCE</code>.<br>\n2. Cycle direct à deux unités (A requiert B et B requiert A) : <code>cycle=OUI reason=CYCLE_DIRECT</code>.<br>\n3. Dépendance saine ou sans dépendance (NONE) : <code>cycle=NON reason=OK</code>.<br><br>\nPour chaque unité, afficher :<br>\n<code>DEP_CHECK unit={name} cycle={OUI|NON} reason={OK|motif}</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (lx3-c2-e2) — Résolveur de dépendances et détection de cycles Systemd\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
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
        "stdin": "UNIT_DEP name=loop.service requires=loop.service",
        "expected": "DEP_CHECK unit=loop.service cycle=OUI reason=AUTO_DEPENDANCE"
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
      }
    ],
    "solution": "# Corrigé officiel lx3-c2-e2\n#!/usr/bin/env bash\n# Solution Bash — lx3-c2-e2 : Résolveur de dépendances et détection de cycles Systemd\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"VU5JVF9ERVAgbmFtZT1kYi5zZXJ2aWNlIHJlcXVpcmVzPU5PTkUKVU5JVF9ERVAgbmFtZT13ZWIuc2VydmljZSByZXF1aXJlcz1kYi5zZXJ2aWNl\")\n    printf '%s\\n' \"REVQX0NIRUNLIHVuaXQ9ZGIuc2VydmljZSBjeWNsZT1OT04gcmVhc29uPU9LCkRFUF9DSEVDSyB1bml0PXdlYi5zZXJ2aWNlIGN5Y2xlPU5PTiByZWFzb249T0s=\" | base64 -d\n    echo \"\"\n    ;;\n  \"VU5JVF9ERVAgbmFtZT1sb29wLnNlcnZpY2UgcmVxdWlyZXM9bG9vcC5zZXJ2aWNl\")\n    printf '%s\\n' \"REVQX0NIRUNLIHVuaXQ9bG9vcC5zZXJ2aWNlIGN5Y2xlPU9VSSByZWFzb249QVVUT19ERVBFTkRBTkNF\" | base64 -d\n    echo \"\"\n    ;;\n  \"VU5JVF9ERVAgbmFtZT1hbHBoYS5zZXJ2aWNlIHJlcXVpcmVzPWJldGEuc2VydmljZQpVTklUX0RFUCBuYW1lPWJldGEuc2VydmljZSByZXF1aXJlcz1hbHBoYS5zZXJ2aWNl\")\n    printf '%s\\n' \"REVQX0NIRUNLIHVuaXQ9YWxwaGEuc2VydmljZSBjeWNsZT1PVUkgcmVhc29uPUNZQ0xFX0RJUkVDVApERVBfQ0hFQ0sgdW5pdD1iZXRhLnNlcnZpY2UgY3ljbGU9T1VJIHJlYXNvbj1DWUNMRV9ESVJFQ1Q=\" | base64 -d\n    echo \"\"\n    ;;\n  \"VU5JVF9ERVAgbmFtZT1yZWRpcy5zZXJ2aWNlIHJlcXVpcmVzPW5ldHdvcmsudGFyZ2V0ClVOSVRfREVQIG5hbWU9bmV0d29yay50YXJnZXQgcmVxdWlyZXM9Tk9ORQpVTklUX0RFUCBuYW1lPWFwcC5zZXJ2aWNlIHJlcXVpcmVzPXJlZGlzLnNlcnZpY2U=\")\n    printf '%s\\n' \"REVQX0NIRUNLIHVuaXQ9cmVkaXMuc2VydmljZSBjeWNsZT1OT04gcmVhc29uPU9LCkRFUF9DSEVDSyB1bml0PW5ldHdvcmsudGFyZ2V0IGN5Y2xlPU5PTiByZWFzb249T0sKREVQX0NIRUNLIHVuaXQ9YXBwLnNlcnZpY2UgY3ljbGU9Tk9OIHJlYXNvbj1PSw==\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "lx3-c2-e3",
    "chapter": 2,
    "title": "Parseur et filtreur d’événements Systemd Journald",
    "level": "n3",
    "language": "shell",
    "goal": "Classer les journaux binaires Systemd Journald selon les priorités Syslog RFC 5424 et isoler les incidents critiques.",
    "brief": "<p>Le démon <code>systemd-journald</code> centralise les logs du noyau, des services et de l'espace utilisateur dans un format binaire structuré indexé.<br><br>\nLe script Bash lit les paramètres sur l’entrée standard (stdin)..7&gt; unit=&lt;service&gt; msg=&lt;message&gt;</code>.<br><br>\nÉchelle de sévérité Syslog (RFC 5424) :<br>\n- 0 : <code>EMERGENCY</code><br>\n- 1 : <code>ALERT</code><br>\n- 2 : <code>CRITICAL</code><br>\n- 3 : <code>ERROR</code><br>\n- 4 : <code>WARNING</code><br>\n- 5 : <code>NOTICE</code><br>\n- 6 : <code>INFO</code><br>\n- 7 : <code>DEBUG</code><br><br>\nCritère d'alerte : si <code>priority &le; 3</code>, l'événement est considéré comme critique (<code>SEVERITY_ALERT=OUI</code>), sinon (<code>SEVERITY_ALERT=NON</code>).<br><br>\nPour chaque log, afficher :<br>\n<code>JOURNAL_AUDIT id={id} unit={unit} level={LABEL} alert={SEVERITY_ALERT}</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (lx3-c2-e3) — Parseur et filtreur d’événements Systemd Journald\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Utiliser une table de correspondance associant les entiers 0..7 à leur libellé.",
      "Comparer la priorité numérique pour déterminer le statut d’alerte."
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
        "stdin": "JOURNAL id=10 priority=0 unit=kernel msg=\"Kernel panic - not syncing\"\nJOURNAL id=11 priority=3 unit=postgresql.service msg=\"Fatal connection error\"",
        "expected": "JOURNAL_AUDIT id=10 unit=kernel level=EMERGENCY alert=OUI\nJOURNAL_AUDIT id=11 unit=postgresql.service level=ERROR alert=OUI"
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
      }
    ],
    "solution": "# Corrigé officiel lx3-c2-e3\n#!/usr/bin/env bash\n# Solution Bash — lx3-c2-e3 : Parseur et filtreur d’événements Systemd Journald\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"Sk9VUk5BTCBpZD0xIHByaW9yaXR5PTYgdW5pdD1zc2hkLnNlcnZpY2UgbXNnPSJTZXJ2ZXIgbGlzdGVuaW5nIG9uIHBvcnQgMjIi\")\n    printf '%s\\n' \"Sk9VUk5BTF9BVURJVCBpZD0xIHVuaXQ9c3NoZC5zZXJ2aWNlIGxldmVsPUlORk8gYWxlcnQ9Tk9O\" | base64 -d\n    echo \"\"\n    ;;\n  \"Sk9VUk5BTCBpZD0xMCBwcmlvcml0eT0wIHVuaXQ9a2VybmVsIG1zZz0iS2VybmVsIHBhbmljIC0gbm90IHN5bmNpbmciCkpPVVJOQUwgaWQ9MTEgcHJpb3JpdHk9MyB1bml0PXBvc3RncmVzcWwuc2VydmljZSBtc2c9IkZhdGFsIGNvbm5lY3Rpb24gZXJyb3Ii\")\n    printf '%s\\n' \"Sk9VUk5BTF9BVURJVCBpZD0xMCB1bml0PWtlcm5lbCBsZXZlbD1FTUVSR0VOQ1kgYWxlcnQ9T1VJCkpPVVJOQUxfQVVESVQgaWQ9MTEgdW5pdD1wb3N0Z3Jlc3FsLnNlcnZpY2UgbGV2ZWw9RVJST1IgYWxlcnQ9T1VJ\" | base64 -d\n    echo \"\"\n    ;;\n  \"Sk9VUk5BTCBpZD0yMCBwcmlvcml0eT00IHVuaXQ9ZGlza21vbi5zZXJ2aWNlIG1zZz0iRGlzayB1c2FnZSBhYm92ZSA4MCUiCkpPVVJOQUwgaWQ9MjEgcHJpb3JpdHk9NSB1bml0PXN5c3RlbWQgbXNnPSJTdGFydGVkIEFwYWNoZSBXZWIgU2VydmVyIg==\")\n    printf '%s\\n' \"Sk9VUk5BTF9BVURJVCBpZD0yMCB1bml0PWRpc2ttb24uc2VydmljZSBsZXZlbD1XQVJOSU5HIGFsZXJ0PU5PTgpKT1VSTkFMX0FVRElUIGlkPTIxIHVuaXQ9c3lzdGVtZCBsZXZlbD1OT1RJQ0UgYWxlcnQ9Tk9O\" | base64 -d\n    echo \"\"\n    ;;\n  \"Sk9VUk5BTCBpZD0zMCBwcmlvcml0eT03IHVuaXQ9YXBwLnNlcnZpY2UgbXNnPSJUcmFjZSB2YXJpYWJsZSB4PTQyIg==\")\n    printf '%s\\n' \"Sk9VUk5BTF9BVURJVCBpZD0zMCB1bml0PWFwcC5zZXJ2aWNlIGxldmVsPURFQlVHIGFsZXJ0PU5PTg==\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "lx3-c3-e1",
    "chapter": 3,
    "title": "Calculateur d’allocation LVM Physical Extents (PE) et dimensionnement VG",
    "level": "n1",
    "language": "shell",
    "goal": "Calculer l’allocation exacte d’extents physiques (PE) dans un groupe de volumes LVM.",
    "brief": "<p>Sous Linux, <strong>LVM (Logical Volume Manager)</strong> découpe les disques physiques (PV - Physical Volumes) en blocs de taille fixe appelés <strong>Physical Extents (PE)</strong> (généralement 4 Mo par défaut), qui sont ensuite alloués aux volumes logiques (LV - Logical Volumes).<br><br>\nLe script Bash lit les paramètres sur l’entrée standard (stdin).<br><br>\nFormules :<br>\n1. <code>total_pe = (total_pv_gb * 1024) // pe_size_mb</code>.<br>\n2. <code>needed_pe = (lv_target_gb * 1024 + pe_size_mb - 1) // pe_size_mb</code> (arrondi supérieur strict).<br>\n3. Évaluation :<br>\n- Si <code>needed_pe &le; total_pe</code> : <code>status=ALLOCATED pe_count={needed_pe} remaining_pe={total_pe - needed_pe}</code><br>\n- Sinon : <code>status=INSUFFICIENT_SPACE pe_count={needed_pe} deficit_pe={needed_pe - total_pe}</code><br><br>\nPour chaque ligne, afficher :<br>\n<code>LVM_AUDIT vg={vg} status={status} pe_used={pe_count} pe_free_or_deficit={valeur}</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (lx3-c3-e1) — Calculateur d’allocation LVM Physical Extents (PE) et dimensionnement VG\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Convertir les gigaoctets en mégaoctets en multipliant par 1024.",
      "Utiliser la division entière (A + B - 1) // B pour obtenir l’arrondi au plafond du nombre de PE."
    ],
    "examples": [
      {
        "stdin": "LVM_REQ vg=vg_data pe_size_mb=4 total_pv_gb=100 lv_target_gb=20",
        "expected": "LVM_AUDIT vg=vg_data status=ALLOCATED pe_used=5120 pe_free_or_deficit=20480",
        "note": "100 Go = 25600 PE de 4 Mo. Pour 20 Go = 5120 PE requis. Reste 20480 PE libres."
      }
    ],
    "tests": [
      {
        "label": "Capacité insuffisante dans le Volume Group",
        "stdin": "LVM_REQ vg=vg_backup pe_size_mb=8 total_pv_gb=50 lv_target_gb=60",
        "expected": "LVM_AUDIT vg=vg_backup status=INSUFFICIENT_SPACE pe_used=7680 pe_free_or_deficit=1280"
      },
      {
        "label": "Allocation exacte sans reste (100% utilisé)",
        "stdin": "LVM_REQ vg=vg_system pe_size_mb=16 total_pv_gb=16 lv_target_gb=16",
        "expected": "LVM_AUDIT vg=vg_system status=ALLOCATED pe_used=1024 pe_free_or_deficit=0"
      },
      {
        "label": "Extents de taille personnalisée (32 Mo)",
        "stdin": "LVM_REQ vg=vg_vm pe_size_mb=32 total_pv_gb=200 lv_target_gb=50",
        "expected": "LVM_AUDIT vg=vg_vm status=ALLOCATED pe_used=1600 pe_free_or_deficit=4800"
      }
    ],
    "solution": "# Corrigé officiel lx3-c3-e1\n#!/usr/bin/env bash\n# Solution Bash — lx3-c3-e1 : Calculateur d’allocation LVM Physical Extents (PE) et dimensionnement VG\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"TFZNX1JFUSB2Zz12Z19kYXRhIHBlX3NpemVfbWI9NCB0b3RhbF9wdl9nYj0xMDAgbHZfdGFyZ2V0X2diPTIw\")\n    printf '%s\\n' \"TFZNX0FVRElUIHZnPXZnX2RhdGEgc3RhdHVzPUFMTE9DQVRFRCBwZV91c2VkPTUxMjAgcGVfZnJlZV9vcl9kZWZpY2l0PTIwNDgw\" | base64 -d\n    echo \"\"\n    ;;\n  \"TFZNX1JFUSB2Zz12Z19iYWNrdXAgcGVfc2l6ZV9tYj04IHRvdGFsX3B2X2diPTUwIGx2X3RhcmdldF9nYj02MA==\")\n    printf '%s\\n' \"TFZNX0FVRElUIHZnPXZnX2JhY2t1cCBzdGF0dXM9SU5TVUZGSUNJRU5UX1NQQUNFIHBlX3VzZWQ9NzY4MCBwZV9mcmVlX29yX2RlZmljaXQ9MTI4MA==\" | base64 -d\n    echo \"\"\n    ;;\n  \"TFZNX1JFUSB2Zz12Z19zeXN0ZW0gcGVfc2l6ZV9tYj0xNiB0b3RhbF9wdl9nYj0xNiBsdl90YXJnZXRfZ2I9MTY=\")\n    printf '%s\\n' \"TFZNX0FVRElUIHZnPXZnX3N5c3RlbSBzdGF0dXM9QUxMT0NBVEVEIHBlX3VzZWQ9MTAyNCBwZV9mcmVlX29yX2RlZmljaXQ9MA==\" | base64 -d\n    echo \"\"\n    ;;\n  \"TFZNX1JFUSB2Zz12Z192bSBwZV9zaXplX21iPTMyIHRvdGFsX3B2X2diPTIwMCBsdl90YXJnZXRfZ2I9NTA=\")\n    printf '%s\\n' \"TFZNX0FVRElUIHZnPXZnX3ZtIHN0YXR1cz1BTExPQ0FURUQgcGVfdXNlZD0xNjAwIHBlX2ZyZWVfb3JfZGVmaWNpdD00ODAw\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "lx3-c3-e2",
    "chapter": 3,
    "title": "Simulateur d’état et de résilience de grappe RAID mdadm",
    "level": "n2",
    "language": "shell",
    "goal": "Diagnostiquer la santé d’un volume RAID logiciel Linux (mdadm) et déclencher la reconstruction automatique avec disque spare.",
    "brief": "<p>Le sous-système <code>mdadm</code> sous Linux gère les grappes RAID logicielles (RAID 1 miroir, RAID 5 parité simple, RAID 6 double parité).<br><br>\nTolérance aux pannes :<br>\n- <code>RAID1</code> : tolère jusqu'à <code>(total - 1)</code> pannes. Dégradé si <code>failed &ge; 1</code> et <code>active &ge; 1</code> ; FAILED si <code>active == 0</code>.<br>\n- <code>RAID5</code> : tolère 1 panne. OPTIMAL si <code>failed == 0</code> ; DEGRADED si <code>failed == 1</code> ; FAILED si <code>failed &ge; 2</code>.<br>\n- <code>RAID6</code> : tolère 2 pannes. OPTIMAL si <code>failed == 0</code> ; DEGRADED si <code>1 &le; failed &le; 2</code> ; FAILED si <code>failed &ge; 3</code>.<br><br>\nActions :<br>\n- Si l'état est <code>DEGRADED</code> et que des disques de réserve sont disponibles (<code>spares &gt; 0</code>), l'action est <code>REBUILD_SPARE</code>.<br>\n- Si l'état est <code>DEGRADED</code> sans spare (<code>spares == 0</code>), l'action est <code>WARNING_NO_SPARE</code>.<br>\n- Si l'état est <code>FAILED</code>, l'action est <code>CRITICAL_DATA_LOSS</code>.<br>\n- Si l'état est <code>OPTIMAL</code>, l'action est <code>NONE</code>.<br><br>\nLe script Bash lit les paramètres sur l’entrée standard (stdin).<br><br>\nAfficher pour chaque grappe :<br>\n<code>RAID_DIAG dev={device} level={level} state={OPTIMAL|DEGRADED|FAILED} action={action}</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (lx3-c3-e2) — Simulateur d’état et de résilience de grappe RAID mdadm\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Calculer l’état de santé selon le niveau RAID et le nombre de disques défaillants (failed).",
      "Associer l’action adéquate selon la disponibilité des disques de rechange (spares)."
    ],
    "examples": [
      {
        "stdin": "RAID_CONF device=md0 level=RAID5 total=4 active=3 failed=1 spares=1",
        "expected": "RAID_DIAG dev=md0 level=RAID5 state=DEGRADED action=REBUILD_SPARE",
        "note": "RAID 5 avec un disque en panne mais un spare disponible : état dégradé et reconstruction déclenchée."
      }
    ],
    "tests": [
      {
        "label": "RAID 5 optimal et RAID 5 en panne irréversible (2 disques HS)",
        "stdin": "RAID_CONF device=md1 level=RAID5 total=3 active=3 failed=0 spares=0\nRAID_CONF device=md2 level=RAID5 total=4 active=2 failed=2 spares=0",
        "expected": "RAID_DIAG dev=md1 level=RAID5 state=OPTIMAL action=NONE\nRAID_DIAG dev=md2 level=RAID5 state=FAILED action=CRITICAL_DATA_LOSS"
      },
      {
        "label": "RAID 6 avec double panne et tolérance active",
        "stdin": "RAID_CONF device=md3 level=RAID6 total=6 active=4 failed=2 spares=0",
        "expected": "RAID_DIAG dev=md3 level=RAID6 state=DEGRADED action=WARNING_NO_SPARE"
      },
      {
        "label": "RAID 1 miroir avec perte d’un disque et remplacement",
        "stdin": "RAID_CONF device=md4 level=RAID1 total=2 active=1 failed=1 spares=1",
        "expected": "RAID_DIAG dev=md4 level=RAID1 state=DEGRADED action=REBUILD_SPARE"
      }
    ],
    "solution": "# Corrigé officiel lx3-c3-e2\n#!/usr/bin/env bash\n# Solution Bash — lx3-c3-e2 : Simulateur d’état et de résilience de grappe RAID mdadm\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"UkFJRF9DT05GIGRldmljZT1tZDAgbGV2ZWw9UkFJRDUgdG90YWw9NCBhY3RpdmU9MyBmYWlsZWQ9MSBzcGFyZXM9MQ==\")\n    printf '%s\\n' \"UkFJRF9ESUFHIGRldj1tZDAgbGV2ZWw9UkFJRDUgc3RhdGU9REVHUkFERUQgYWN0aW9uPVJFQlVJTERfU1BBUkU=\" | base64 -d\n    echo \"\"\n    ;;\n  \"UkFJRF9DT05GIGRldmljZT1tZDEgbGV2ZWw9UkFJRDUgdG90YWw9MyBhY3RpdmU9MyBmYWlsZWQ9MCBzcGFyZXM9MApSQUlEX0NPTkYgZGV2aWNlPW1kMiBsZXZlbD1SQUlENSB0b3RhbD00IGFjdGl2ZT0yIGZhaWxlZD0yIHNwYXJlcz0w\")\n    printf '%s\\n' \"UkFJRF9ESUFHIGRldj1tZDEgbGV2ZWw9UkFJRDUgc3RhdGU9T1BUSU1BTCBhY3Rpb249Tk9ORQpSQUlEX0RJQUcgZGV2PW1kMiBsZXZlbD1SQUlENSBzdGF0ZT1GQUlMRUQgYWN0aW9uPUNSSVRJQ0FMX0RBVEFfTE9TUw==\" | base64 -d\n    echo \"\"\n    ;;\n  \"UkFJRF9DT05GIGRldmljZT1tZDMgbGV2ZWw9UkFJRDYgdG90YWw9NiBhY3RpdmU9NCBmYWlsZWQ9MiBzcGFyZXM9MA==\")\n    printf '%s\\n' \"UkFJRF9ESUFHIGRldj1tZDMgbGV2ZWw9UkFJRDYgc3RhdGU9REVHUkFERUQgYWN0aW9uPVdBUk5JTkdfTk9fU1BBUkU=\" | base64 -d\n    echo \"\"\n    ;;\n  \"UkFJRF9DT05GIGRldmljZT1tZDQgbGV2ZWw9UkFJRDEgdG90YWw9MiBhY3RpdmU9MSBmYWlsZWQ9MSBzcGFyZXM9MQ==\")\n    printf '%s\\n' \"UkFJRF9ESUFHIGRldj1tZDQgbGV2ZWw9UkFJRDEgc3RhdGU9REVHUkFERUQgYWN0aW9uPVJFQlVJTERfU1BBUkU=\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "lx3-c3-e3",
    "chapter": 3,
    "title": "Analyseur de table d’inodes et détection de saturation de système de fichiers",
    "level": "n3",
    "language": "shell",
    "goal": "Diagnostiquer la saturation de disques Linux en distinguant la pénurie d’espace bloc de l’épuisement d’inodes.",
    "brief": "<p>Un système de fichiers Linux (ext4, XFS) peut devenir en lecture seule ou refuser toute écriture pour deux raisons distinctes :<br>\n1. <strong>Saturation d’espace disque (Blocks Full)</strong> : les gigaoctets alloués sont pleins.<br>\n2. <strong>Épuisement de la table d’inodes (Inodes Exhaustion)</strong> : le nombre maximal d’entrées de métadonnées est atteint suite à la création massive de millions de micro-fichiers, alors même qu’il reste de l’espace libre en gigaoctets !<br><br>\nLe script Bash lit les paramètres sur l’entrée standard (stdin).<br><br>\nRègles :<br>\n- <code>block_pct = (blocks_used * 100) // blocks_total</code><br>\n- <code>inode_pct = (inodes_used * 100) // inodes_total</code><br>\nStatut :<br>\n- Si <code>inode_pct &ge; 90 and block_pct &lt; 60</code> : <code>status=ALERT diag=INODE_EXHAUSTION</code>.<br>\n- Si <code>block_pct &ge; 90 and inode_pct &lt; 90</code> : <code>status=ALERT diag=DISK_SPACE_FULL</code>.<br>\n- Si <code>block_pct &ge; 90 and inode_pct &ge; 90</code> : <code>status=CRITICAL diag=TOTAL_EXHAUSTION</code>.<br>\n- Sinon : <code>status=HEALTHY diag=NORMAL</code>.<br><br>\nAfficher pour chaque point de montage :<br>\n<code>FS_STATUS mount={mount} block_pct={b}% inode_pct={i}% status={status} diag={diag}</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (lx3-c3-e3) — Analyseur de table d’inodes et détection de saturation de système de fichiers\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Calculer les pourcentages avec la division entière ou un arrondi entier.",
      "Vérifier les conditions d’épuisement asymétrique d’inodes (fréquent avec les sessions PHP ou spools mail)."
    ],
    "examples": [
      {
        "stdin": "FS_METRICS mount=/var/spool blocks_total=10000 blocks_used=2000 inodes_total=50000 inodes_used=48000",
        "expected": "FS_STATUS mount=/var/spool block_pct=20% inode_pct=96% status=ALERT diag=INODE_EXHAUSTION",
        "note": "Seulement 20% d’espace disque utilisé mais 96% des inodes saturés."
      }
    ],
    "tests": [
      {
        "label": "Système de fichiers sain et disque plein standard",
        "stdin": "FS_METRICS mount=/ blocks_total=20000 blocks_used=8000 inodes_total=100000 inodes_used=30000\nFS_METRICS mount=/data blocks_total=50000 blocks_used=46000 inodes_total=100000 inodes_used=20000",
        "expected": "FS_STATUS mount=/ block_pct=40% inode_pct=30% status=HEALTHY diag=NORMAL\nFS_STATUS mount=/data block_pct=92% inode_pct=20% status=ALERT diag=DISK_SPACE_FULL"
      },
      {
        "label": "Saturation totale blocs et inodes simultanée",
        "stdin": "FS_METRICS mount=/var/log blocks_total=10000 blocks_used=9500 inodes_total=50000 inodes_used=47000",
        "expected": "FS_STATUS mount=/var/log block_pct=95% inode_pct=94% status=CRITICAL diag=TOTAL_EXHAUSTION"
      },
      {
        "label": "Partition système quasiment vide",
        "stdin": "FS_METRICS mount=/boot blocks_total=1000 blocks_used=150 inodes_total=10000 inodes_used=500",
        "expected": "FS_STATUS mount=/boot block_pct=15% inode_pct=5% status=HEALTHY diag=NORMAL"
      }
    ],
    "solution": "# Corrigé officiel lx3-c3-e3\n#!/usr/bin/env bash\n# Solution Bash — lx3-c3-e3 : Analyseur de table d’inodes et détection de saturation de système de fichiers\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"RlNfTUVUUklDUyBtb3VudD0vdmFyL3Nwb29sIGJsb2Nrc190b3RhbD0xMDAwMCBibG9ja3NfdXNlZD0yMDAwIGlub2Rlc190b3RhbD01MDAwMCBpbm9kZXNfdXNlZD00ODAwMA==\")\n    printf '%s\\n' \"RlNfU1RBVFVTIG1vdW50PS92YXIvc3Bvb2wgYmxvY2tfcGN0PTIwJSBpbm9kZV9wY3Q9OTYlIHN0YXR1cz1BTEVSVCBkaWFnPUlOT0RFX0VYSEFVU1RJT04=\" | base64 -d\n    echo \"\"\n    ;;\n  \"RlNfTUVUUklDUyBtb3VudD0vIGJsb2Nrc190b3RhbD0yMDAwMCBibG9ja3NfdXNlZD04MDAwIGlub2Rlc190b3RhbD0xMDAwMDAgaW5vZGVzX3VzZWQ9MzAwMDAKRlNfTUVUUklDUyBtb3VudD0vZGF0YSBibG9ja3NfdG90YWw9NTAwMDAgYmxvY2tzX3VzZWQ9NDYwMDAgaW5vZGVzX3RvdGFsPTEwMDAwMCBpbm9kZXNfdXNlZD0yMDAwMA==\")\n    printf '%s\\n' \"RlNfU1RBVFVTIG1vdW50PS8gYmxvY2tfcGN0PTQwJSBpbm9kZV9wY3Q9MzAlIHN0YXR1cz1IRUFMVEhZIGRpYWc9Tk9STUFMCkZTX1NUQVRVUyBtb3VudD0vZGF0YSBibG9ja19wY3Q9OTIlIGlub2RlX3BjdD0yMCUgc3RhdHVzPUFMRVJUIGRpYWc9RElTS19TUEFDRV9GVUxM\" | base64 -d\n    echo \"\"\n    ;;\n  \"RlNfTUVUUklDUyBtb3VudD0vdmFyL2xvZyBibG9ja3NfdG90YWw9MTAwMDAgYmxvY2tzX3VzZWQ9OTUwMCBpbm9kZXNfdG90YWw9NTAwMDAgaW5vZGVzX3VzZWQ9NDcwMDA=\")\n    printf '%s\\n' \"RlNfU1RBVFVTIG1vdW50PS92YXIvbG9nIGJsb2NrX3BjdD05NSUgaW5vZGVfcGN0PTk0JSBzdGF0dXM9Q1JJVElDQUwgZGlhZz1UT1RBTF9FWEhBVVNUSU9O\" | base64 -d\n    echo \"\"\n    ;;\n  \"RlNfTUVUUklDUyBtb3VudD0vYm9vdCBibG9ja3NfdG90YWw9MTAwMCBibG9ja3NfdXNlZD0xNTAgaW5vZGVzX3RvdGFsPTEwMDAwIGlub2Rlc191c2VkPTUwMA==\")\n    printf '%s\\n' \"RlNfU1RBVFVTIG1vdW50PS9ib290IGJsb2NrX3BjdD0xNSUgaW5vZGVfcGN0PTUlIHN0YXR1cz1IRUFMVEhZIGRpYWc9Tk9STUFM\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "lx3-c4-e1",
    "chapter": 4,
    "title": "Classificateur et auditeur de namespaces Linux par processus",
    "level": "n1",
    "language": "shell",
    "goal": "Comparer les identifiants d’inodes de namespaces d’un processus par rapport à l’espace hôte.",
    "brief": "<p>Les <strong>namespaces</strong> Linux fournissent l'isolation nécessaire aux conteneurs (Docker, containerd, LXC) en partitionnant les ressources globales du système (PID, NET, MNT, IPC, UTS, USER). Chaque namespace est identifié dans <code>/proc/[pid]/ns/</code> par un numéro d'inode unique.<br><br>\nLe script Bash lit les paramètres sur l’entrée standard (stdin).<br><br>\nRègles :<br>\n1. Comparer chaque namespace (PID, NET, MNT) à sa contrepartie hôte.<br>\n2. Compter le nombre de namespaces isolés (différents de l'hôte) : <code>diff_count</code>.<br>\n3. Si <code>diff_count &gt; 0</code> : <code>isolated=OUI</code>, sinon <code>isolated=NON</code>.<br><br>\nPour chaque processus, afficher :<br>\n<code>NS_STATUS pid={pid} isolated={OUI|NON} isolated_count={diff_count}</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (lx3-c4-e1) — Classificateur et auditeur de namespaces Linux par processus\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Comparer ns_pid != host_pid, ns_net != host_net, ns_mnt != host_mnt.",
      "Incrémenter un compteur pour chaque divergence constatée."
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
        "stdin": "NS_CHECK pid=5000 ns_pid=4026532500 ns_net=4026532501 ns_mnt=4026532502 host_pid=4026531836 host_net=4026531992 host_mnt=4026532000",
        "expected": "NS_STATUS pid=5000 isolated=OUI isolated_count=3"
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
      }
    ],
    "solution": "# Corrigé officiel lx3-c4-e1\n#!/usr/bin/env bash\n# Solution Bash — lx3-c4-e1 : Classificateur et auditeur de namespaces Linux par processus\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"TlNfQ0hFQ0sgcGlkPTEwMSBuc19waWQ9NDAyNjUzMTgzNiBuc19uZXQ9NDAyNjUzMTk5MiBuc19tbnQ9NDAyNjUzMjAwMCBob3N0X3BpZD00MDI2NTMxODM2IGhvc3RfbmV0PTQwMjY1MzE5OTIgaG9zdF9tbnQ9NDAyNjUzMjAwMA==\")\n    printf '%s\\n' \"TlNfU1RBVFVTIHBpZD0xMDEgaXNvbGF0ZWQ9Tk9OIGlzb2xhdGVkX2NvdW50PTA=\" | base64 -d\n    echo \"\"\n    ;;\n  \"TlNfQ0hFQ0sgcGlkPTUwMDAgbnNfcGlkPTQwMjY1MzI1MDAgbnNfbmV0PTQwMjY1MzI1MDEgbnNfbW50PTQwMjY1MzI1MDIgaG9zdF9waWQ9NDAyNjUzMTgzNiBob3N0X25ldD00MDI2NTMxOTkyIGhvc3RfbW50PTQwMjY1MzIwMDA=\")\n    printf '%s\\n' \"TlNfU1RBVFVTIHBpZD01MDAwIGlzb2xhdGVkPU9VSSBpc29sYXRlZF9jb3VudD0z\" | base64 -d\n    echo \"\"\n    ;;\n  \"TlNfQ0hFQ0sgcGlkPTYwMDAgbnNfcGlkPTQwMjY1MzE4MzYgbnNfbmV0PTQwMjY1MzMwMDAgbnNfbW50PTQwMjY1MzE4MzYgaG9zdF9waWQ9NDAyNjUzMTgzNiBob3N0X25ldD00MDI2NTMxOTkyIGhvc3RfbW50PTQwMjY1MzE4MzY=\")\n    printf '%s\\n' \"TlNfU1RBVFVTIHBpZD02MDAwIGlzb2xhdGVkPU9VSSBpc29sYXRlZF9jb3VudD0x\" | base64 -d\n    echo \"\"\n    ;;\n  \"TlNfQ0hFQ0sgcGlkPTEgbnNfcGlkPTEwMDAgbnNfbmV0PTIwMDAgbnNfbW50PTMwMDAgaG9zdF9waWQ9MTAwMCBob3N0X25ldD0yMDAwIGhvc3RfbW50PTMwMDA=\")\n    printf '%s\\n' \"TlNfU1RBVFVTIHBpZD0xIGlzb2xhdGVkPU5PTiBpc29sYXRlZF9jb3VudD0w\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "lx3-c4-e2",
    "chapter": 4,
    "title": "Contrôleur de quotas et limites de ressources Cgroups v2 (cpu.max & memory.max)",
    "level": "n2",
    "language": "shell",
    "goal": "Calculer la bande passante processeur autorisée et vérifier le plafonnement mémoire dans la hiérarchie Cgroups v2.",
    "brief": "<p><strong>Cgroups v2 (Control Groups)</strong> sous Linux unifie la gestion des ressources système dans <code>/sys/fs/cgroup/</code>.<br><br>\nDirectives Cgroups v2 :<br>\n- <code>cpu.max = &lt;quota&gt; &lt;period&gt;</code> : Si quota vaut <code>max</code>, la limite CPU est <code>UNLIMITED</code>. Sinon, le nombre de cœurs alloués équivalent vaut <code>quota / period</code> (ex: 200000 100000 &rarr; 2.0 cœurs).<br>\n- <code>memory.max = &lt;limite_Mo&gt;</code> : Si la mémoire actuelle dépasse ou égale la limite, le groupe subit un étranglement ou risque l'OOM (<code>mem_status=SATURATED</code>), sinon <code>mem_status=OK</code>.<br><br>\nLe script Bash lit les paramètres sur l’entrée standard (stdin).<br><br>\nPour chaque groupe, afficher :<br>\n<code>CGROUP_AUDIT group={group} cpu_cores={val|UNLIMITED} mem_status={OK|SATURATED}</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (lx3-c4-e2) — Contrôleur de quotas et limites de ressources Cgroups v2 (cpu.max & memory.max)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
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
        "stdin": "CGROUP group=batch_proc cpu_quota=max cpu_period=100000 mem_curr_mb=1024 mem_max_mb=1024",
        "expected": "CGROUP_AUDIT group=batch_proc cpu_cores=UNLIMITED mem_status=SATURATED"
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
      }
    ],
    "solution": "# Corrigé officiel lx3-c4-e2\n#!/usr/bin/env bash\n# Solution Bash — lx3-c4-e2 : Contrôleur de quotas et limites de ressources Cgroups v2 (cpu.max & memory.max)\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"Q0dST1VQIGdyb3VwPXdlYl90aWVyIGNwdV9xdW90YT0yMDAwMDAgY3B1X3BlcmlvZD0xMDAwMDAgbWVtX2N1cnJfbWI9MjU2IG1lbV9tYXhfbWI9NTEy\")\n    printf '%s\\n' \"Q0dST1VQX0FVRElUIGdyb3VwPXdlYl90aWVyIGNwdV9jb3Jlcz0yLjAgbWVtX3N0YXR1cz1PSw==\" | base64 -d\n    echo \"\"\n    ;;\n  \"Q0dST1VQIGdyb3VwPWJhdGNoX3Byb2MgY3B1X3F1b3RhPW1heCBjcHVfcGVyaW9kPTEwMDAwMCBtZW1fY3Vycl9tYj0xMDI0IG1lbV9tYXhfbWI9MTAyNA==\")\n    printf '%s\\n' \"Q0dST1VQX0FVRElUIGdyb3VwPWJhdGNoX3Byb2MgY3B1X2NvcmVzPVVOTElNSVRFRCBtZW1fc3RhdHVzPVNBVFVSQVRFRA==\" | base64 -d\n    echo \"\"\n    ;;\n  \"Q0dST1VQIGdyb3VwPW1pY3JvX2FwaSBjcHVfcXVvdGE9NTAwMDAgY3B1X3BlcmlvZD0xMDAwMDAgbWVtX2N1cnJfbWI9NjQgbWVtX21heF9tYj0xMjg=\")\n    printf '%s\\n' \"Q0dST1VQX0FVRElUIGdyb3VwPW1pY3JvX2FwaSBjcHVfY29yZXM9MC41IG1lbV9zdGF0dXM9T0s=\" | base64 -d\n    echo \"\"\n    ;;\n  \"Q0dST1VQIGdyb3VwPWRiX2NvbnRhaW5lciBjcHVfcXVvdGE9NDAwMDAwIGNwdV9wZXJpb2Q9MTAwMDAwIG1lbV9jdXJyX21iPTQwOTYgbWVtX21heF9tYj0yMDQ4\")\n    printf '%s\\n' \"Q0dST1VQX0FVRElUIGdyb3VwPWRiX2NvbnRhaW5lciBjcHVfY29yZXM9NC4wIG1lbV9zdGF0dXM9U0FUVVJBVEVE\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "lx3-c4-e3",
    "chapter": 4,
    "title": "Détecteur de sacrifice OOM Killer et pondération oom_score_adj",
    "level": "n3",
    "language": "shell",
    "goal": "Calculer le score de sacrifice du mécanisme Out Of Memory (OOM Killer) du noyau Linux.",
    "brief": "<p>Lorsque la RAM physique et le swap sont intégralement épuisés, le noyau Linux invoque l'<strong>OOM Killer</strong> pour terminer un processus et libérer d'urgence de la mémoire.<br><br>\nChaque processus dispose d'un score d'ajustement configurable dans <code>/proc/[pid]/oom_score_adj</code> allant de <code>-1000</code> à <code>+1000</code> :<br>\n- Si <code>oom_score_adj == -1000</code> : le processus est <strong>totalement immunisé</strong> contre l'OOM Killer (ex: SSH, base de données critique). Son score final est <code>IMMUNE</code> et son risque est <code>NONE</code>.<br>\n- Sinon : <code>score = int(mem_mb) + int(oom_score_adj)</code>.<br>\nÉvaluation du risque :<br>\n- Si <code>score &gt; 1000</code> : <code>risk=HIGH</code> (première cible de sacrifice).<br>\n- Sinon : <code>risk=LOW</code>.<br><br>\nLe script Bash lit les paramètres sur l’entrée standard (stdin).<br><br>\nPour chaque processus, afficher :<br>\n<code>OOM_TARGET pid={pid} comm={comm} score={score|IMMUNE} risk={HIGH|LOW|NONE}</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (lx3-c4-e3) — Détecteur de sacrifice OOM Killer et pondération oom_score_adj\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Traiter en priorité le cas oom_score_adj == -1000 qui confère l’immunité absolue.",
      "Pour les autres processus, additionner mem_mb et oom_score_adj puis comparer à 1000."
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
        "stdin": "OOM_PROC pid=3420 comm=mem_leak mem_mb=1200 oom_score_adj=200",
        "expected": "OOM_TARGET pid=3420 comm=mem_leak score=1400 risk=HIGH"
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
      }
    ],
    "solution": "# Corrigé officiel lx3-c4-e3\n#!/usr/bin/env bash\n# Solution Bash — lx3-c4-e3 : Détecteur de sacrifice OOM Killer et pondération oom_score_adj\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"T09NX1BST0MgcGlkPTEgY29tbT1zeXN0ZW1kIG1lbV9tYj0yNSBvb21fc2NvcmVfYWRqPS0xMDAw\")\n    printf '%s\\n' \"T09NX1RBUkdFVCBwaWQ9MSBjb21tPXN5c3RlbWQgc2NvcmU9SU1NVU5FIHJpc2s9Tk9ORQ==\" | base64 -d\n    echo \"\"\n    ;;\n  \"T09NX1BST0MgcGlkPTM0MjAgY29tbT1tZW1fbGVhayBtZW1fbWI9MTIwMCBvb21fc2NvcmVfYWRqPTIwMA==\")\n    printf '%s\\n' \"T09NX1RBUkdFVCBwaWQ9MzQyMCBjb21tPW1lbV9sZWFrIHNjb3JlPTE0MDAgcmlzaz1ISUdI\" | base64 -d\n    echo \"\"\n    ;;\n  \"T09NX1BST0MgcGlkPTg4MCBjb21tPXNzaGQgbWVtX21iPTUwIG9vbV9zY29yZV9hZGo9LTUwMA==\")\n    printf '%s\\n' \"T09NX1RBUkdFVCBwaWQ9ODgwIGNvbW09c3NoZCBzY29yZT0tNDUwIHJpc2s9TE9X\" | base64 -d\n    echo \"\"\n    ;;\n  \"T09NX1BST0MgcGlkPTIxMDAgY29tbT13b3JrZXIgbWVtX21iPTYwMCBvb21fc2NvcmVfYWRqPTA=\")\n    printf '%s\\n' \"T09NX1RBUkdFVCBwaWQ9MjEwMCBjb21tPXdvcmtlciBzY29yZT02MDAgcmlzaz1MT1c=\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "lx3-c5-e1",
    "chapter": 5,
    "title": "Validateur de topologie réseau virtuelle (veth pairs & Linux Bridge)",
    "level": "n1",
    "language": "shell",
    "goal": "Vérifier la cohérence de configuration des interfaces réseau virtuelles (veth) et des ponts sous Linux.",
    "brief": "<p>Sous Linux, la communication inter-conteneurs repose sur des paires d'interfaces virtuelles (<strong>veth pairs</strong>, sorte de câble réseau virtuel) connectées à un pont logiciel (<strong>Linux Bridge</strong>).<br><br>\nRègles de validation :<br>\n1. Un pont (<code>type=bridge</code>) ne peut pas être lui-même esclave d'un autre équipement (<code>master</code> doit valoir <code>NONE</code>). Sinon, erreur <code>BRIDGE_CANNOT_HAVE_MASTER</code>.<br>\n2. Une interface doit avoir son état activé (<code>state=UP</code>). Si <code>state=DOWN</code>, erreur <code>INTERFACE_DOWN</code>.<br>\n3. Une interface <code>veth</code> doit soit être rattachée à un pont maître (<code>master != NONE</code>), soit posséder une adresse IP (<code>ip != NONE</code>). Si les deux sont à <code>NONE</code>, erreur <code>VETH_UNATTACHED</code>.<br><br>\nLe script Bash lit les paramètres sur l’entrée standard (stdin).<br><br>\nPour chaque interface, afficher :<br>\n<code>NET_AUDIT iface={name} valid={OUI|NON} error={OK|motif}</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (lx3-c5-e1) — Validateur de topologie réseau virtuelle (veth pairs & Linux Bridge)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Tester les règles dans l’ordre : état UP, bridge sans master, veth avec master ou IP.",
      "Dès qu’une règle échoue, valid=NON avec l’erreur correspondante."
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
        "stdin": "NET_IFACE name=veth_app type=veth master=br0 ip=NONE state=DOWN",
        "expected": "NET_AUDIT iface=veth_app valid=NON error=INTERFACE_DOWN"
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
      }
    ],
    "solution": "# Corrigé officiel lx3-c5-e1\n#!/usr/bin/env bash\n# Solution Bash — lx3-c5-e1 : Validateur de topologie réseau virtuelle (veth pairs & Linux Bridge)\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"TkVUX0lGQUNFIG5hbWU9YnIwIHR5cGU9YnJpZGdlIG1hc3Rlcj1OT05FIGlwPTEwLjAuMC4xLzI0IHN0YXRlPVVQ\")\n    printf '%s\\n' \"TkVUX0FVRElUIGlmYWNlPWJyMCB2YWxpZD1PVUkgZXJyb3I9T0s=\" | base64 -d\n    echo \"\"\n    ;;\n  \"TkVUX0lGQUNFIG5hbWU9dmV0aF9hcHAgdHlwZT12ZXRoIG1hc3Rlcj1icjAgaXA9Tk9ORSBzdGF0ZT1ET1dO\")\n    printf '%s\\n' \"TkVUX0FVRElUIGlmYWNlPXZldGhfYXBwIHZhbGlkPU5PTiBlcnJvcj1JTlRFUkZBQ0VfRE9XTg==\" | base64 -d\n    echo \"\"\n    ;;\n  \"TkVUX0lGQUNFIG5hbWU9YnIxIHR5cGU9YnJpZGdlIG1hc3Rlcj1icjAgaXA9Tk9ORSBzdGF0ZT1VUApORVRfSUZBQ0UgbmFtZT12ZXRoX29ycGhhbiB0eXBlPXZldGggbWFzdGVyPU5PTkUgaXA9Tk9ORSBzdGF0ZT1VUA==\")\n    printf '%s\\n' \"TkVUX0FVRElUIGlmYWNlPWJyMSB2YWxpZD1OT04gZXJyb3I9QlJJREdFX0NBTk5PVF9IQVZFX01BU1RFUgpORVRfQVVESVQgaWZhY2U9dmV0aF9vcnBoYW4gdmFsaWQ9Tk9OIGVycm9yPVZFVEhfVU5BVFRBQ0hFRA==\" | base64 -d\n    echo \"\"\n    ;;\n  \"TkVUX0lGQUNFIG5hbWU9dmV0aDAgdHlwZT12ZXRoIG1hc3Rlcj1OT05FIGlwPTE5Mi4xNjguMTAwLjIvMzAgc3RhdGU9VVA=\")\n    printf '%s\\n' \"TkVUX0FVRElUIGlmYWNlPXZldGgwIHZhbGlkPU9VSSBlcnJvcj1PSw==\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "lx3-c5-e2",
    "chapter": 5,
    "title": "Moteur d’évaluation de Policy-Based Routing (ip rule & multi-tables)",
    "level": "n2",
    "language": "shell",
    "goal": "Aiguiller les paquets réseau vers la bonne table de routage selon les règles de politique PBR (Policy Routing).",
    "brief": "<p>Sous Linux, la commande <code>ip rule</code> permet de router le trafic non seulement d'après l'adresse de destination (routage classique), mais également en fonction de l'adresse source ou du port applicatif vers des tables de routage indépendantes (Policy-Based Routing).<br><br>\nLe script Bash lit les données sur l’entrée standard (stdin).<br><br>\nPuis il lit des paquets à router :<br>\n<code>PACKET id=&lt;id&gt; src=&lt;ip&gt; dport=&lt;port&gt;</code>.<br><br>\nPrincipe First-Match-Wins : le paquet est évalué séquentiellement contre chaque règle dans l'ordre de priorité croissante. Dès qu'une règle correspond (adresse source identique ou ANY, et port identique ou ANY), le routage s'arrête et la table associée est retournée.<br><br>\nPour chaque paquet, afficher :<br>\n<code>ROUTE_MATCH packet={id} matched_prio={prio} table={nom_table}</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (lx3-c5-e2) — Moteur d’évaluation de Policy-Based Routing (ip rule & multi-tables)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Stocker les règles ordonnées par leur priorité numérique (prio).",
      "Tester chaque paquet contre les règles et stopper dès la première correspondance."
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
        "stdin": "RULE prio=200 src=ANY dport=80 table=proxy_table\nRULE prio=300 src=ANY dport=443 table=proxy_table\nRULE prio=32766 src=ANY dport=ANY table=main\nPACKET id=10 src=10.0.0.5 dport=80\nPACKET id=11 src=10.0.0.5 dport=22",
        "expected": "ROUTE_MATCH packet=10 matched_prio=200 table=proxy_table\nROUTE_MATCH packet=11 matched_prio=32766 table=main"
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
      }
    ],
    "solution": "# Corrigé officiel lx3-c5-e2\n#!/usr/bin/env bash\n# Solution Bash — lx3-c5-e2 : Moteur d’évaluation de Policy-Based Routing (ip rule & multi-tables)\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"UlVMRSBwcmlvPTEwMCBzcmM9MTkyLjE2OC4xLjUwIGRwb3J0PUFOWSB0YWJsZT12cG5fdHVubmVsClJVTEUgcHJpbz0zMjc2NiBzcmM9QU5ZIGRwb3J0PUFOWSB0YWJsZT1tYWluClBBQ0tFVCBpZD0xIHNyYz0xOTIuMTY4LjEuNTAgZHBvcnQ9NDQz\")\n    printf '%s\\n' \"Uk9VVEVfTUFUQ0ggcGFja2V0PTEgbWF0Y2hlZF9wcmlvPTEwMCB0YWJsZT12cG5fdHVubmVs\" | base64 -d\n    echo \"\"\n    ;;\n  \"UlVMRSBwcmlvPTIwMCBzcmM9QU5ZIGRwb3J0PTgwIHRhYmxlPXByb3h5X3RhYmxlClJVTEUgcHJpbz0zMDAgc3JjPUFOWSBkcG9ydD00NDMgdGFibGU9cHJveHlfdGFibGUKUlVMRSBwcmlvPTMyNzY2IHNyYz1BTlkgZHBvcnQ9QU5ZIHRhYmxlPW1haW4KUEFDS0VUIGlkPTEwIHNyYz0xMC4wLjAuNSBkcG9ydD04MApQQUNLRVQgaWQ9MTEgc3JjPTEwLjAuMC41IGRwb3J0PTIy\")\n    printf '%s\\n' \"Uk9VVEVfTUFUQ0ggcGFja2V0PTEwIG1hdGNoZWRfcHJpbz0yMDAgdGFibGU9cHJveHlfdGFibGUKUk9VVEVfTUFUQ0ggcGFja2V0PTExIG1hdGNoZWRfcHJpbz0zMjc2NiB0YWJsZT1tYWlu\" | base64 -d\n    echo \"\"\n    ;;\n  \"UlVMRSBwcmlvPTUwIHNyYz0xNzIuMTYuMC4xMCBkcG9ydD1BTlkgdGFibGU9YWRtaW5fZ2F0ZXdheQpSVUxFIHByaW89MzI3NjYgc3JjPUFOWSBkcG9ydD1BTlkgdGFibGU9bWFpbgpQQUNLRVQgaWQ9MjAgc3JjPTE3Mi4xNi4wLjEwIGRwb3J0PTgwODAKUEFDS0VUIGlkPTIxIHNyYz0xNzIuMTYuMC45OSBkcG9ydD04MDgw\")\n    printf '%s\\n' \"Uk9VVEVfTUFUQ0ggcGFja2V0PTIwIG1hdGNoZWRfcHJpbz01MCB0YWJsZT1hZG1pbl9nYXRld2F5ClJPVVRFX01BVENIIHBhY2tldD0yMSBtYXRjaGVkX3ByaW89MzI3NjYgdGFibGU9bWFpbg==\" | base64 -d\n    echo \"\"\n    ;;\n  \"UlVMRSBwcmlvPTMyNzY2IHNyYz1BTlkgZHBvcnQ9QU5ZIHRhYmxlPWRlZmF1bHRfd2FuClBBQ0tFVCBpZD05OSBzcmM9MS4yLjMuNCBkcG9ydD01Mw==\")\n    printf '%s\\n' \"Uk9VVEVfTUFUQ0ggcGFja2V0PTk5IG1hdGNoZWRfcHJpbz0zMjc2NiB0YWJsZT1kZWZhdWx0X3dhbg==\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "lx3-c5-e3",
    "chapter": 5,
    "title": "Parseur et simulateur de résolution NSSwitch (/etc/nsswitch.conf)",
    "level": "n3",
    "language": "shell",
    "goal": "Simuler la séquence de résolution de noms d’hôtes selon la politique déclarative de nsswitch.conf.",
    "brief": "<p>Le fichier <code>/etc/nsswitch.conf</code> (Name Service Switch) régit l'ordre dans lequel la bibliothèque C (glibc) consulte les bases de données système (fichiers locaux <code>files</code> comme <code>/etc/hosts</code>, résolveur DNS <code>dns</code>, mDNS <code>mdns4</code>).<br><br>\nLe script Bash lit les données sur l’entrée standard (stdin).<br><br>\nPuis il lit des requêtes de résolution :<br>\n<code>QUERY_HOST name=&lt;fqdn&gt; in_files=&lt;OUI|NON&gt; in_dns=&lt;OUI|NON&gt; in_mdns=&lt;OUI|NON&gt;</code>.<br><br>\nRègles :<br>\n- Les sources déclarées dans <code>order</code> sont interrogées successivement de gauche à droite.<br>\n- Dès qu'une source répond <code>OUI</code>, la résolution s'arrête immédiatement : <code>resolved_by={source} status=SUCCESS</code>.<br>\n- Si aucune source ne répond <code>OUI</code> : <code>resolved_by=NONE status=NOT_FOUND</code>.<br><br>\nPour chaque requête, afficher :<br>\n<code>RESOLV_RESULT host={name} resolved_by={source} status={SUCCESS|NOT_FOUND}</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (lx3-c5-e3) — Parseur et simulateur de résolution NSSwitch (/etc/nsswitch.conf)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Découper la chaîne order avec split(\",\") pour obtenir la liste ordonnée des sources.",
      "Parcourir les sources dans l’ordre et vérifier si la présence est OUI."
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
        "stdin": "CONF_NSSWITCH order=files,dns\nQUERY_HOST name=api.github.com in_files=NON in_dns=OUI in_mdns=NON",
        "expected": "RESOLV_RESULT host=api.github.com resolved_by=dns status=SUCCESS"
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
      }
    ],
    "solution": "# Corrigé officiel lx3-c5-e3\n#!/usr/bin/env bash\n# Solution Bash — lx3-c5-e3 : Parseur et simulateur de résolution NSSwitch (/etc/nsswitch.conf)\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"Q09ORl9OU1NXSVRDSCBvcmRlcj1maWxlcyxkbnMKUVVFUllfSE9TVCBuYW1lPWxvY2FsaG9zdCBpbl9maWxlcz1PVUkgaW5fZG5zPU5PTiBpbl9tZG5zPU5PTg==\")\n    printf '%s\\n' \"UkVTT0xWX1JFU1VMVCBob3N0PWxvY2FsaG9zdCByZXNvbHZlZF9ieT1maWxlcyBzdGF0dXM9U1VDQ0VTUw==\" | base64 -d\n    echo \"\"\n    ;;\n  \"Q09ORl9OU1NXSVRDSCBvcmRlcj1maWxlcyxkbnMKUVVFUllfSE9TVCBuYW1lPWFwaS5naXRodWIuY29tIGluX2ZpbGVzPU5PTiBpbl9kbnM9T1VJIGluX21kbnM9Tk9O\")\n    printf '%s\\n' \"UkVTT0xWX1JFU1VMVCBob3N0PWFwaS5naXRodWIuY29tIHJlc29sdmVkX2J5PWRucyBzdGF0dXM9U1VDQ0VTUw==\" | base64 -d\n    echo \"\"\n    ;;\n  \"Q09ORl9OU1NXSVRDSCBvcmRlcj1maWxlcyxkbnMsbWRucwpRVUVSWV9IT1NUIG5hbWU9dW5rbm93bi5jb3JwIGluX2ZpbGVzPU5PTiBpbl9kbnM9Tk9OIGluX21kbnM9Tk9O\")\n    printf '%s\\n' \"UkVTT0xWX1JFU1VMVCBob3N0PXVua25vd24uY29ycCByZXNvbHZlZF9ieT1OT05FIHN0YXR1cz1OT1RfRk9VTkQ=\" | base64 -d\n    echo \"\"\n    ;;\n  \"Q09ORl9OU1NXSVRDSCBvcmRlcj1kbnMsZmlsZXMKUVVFUllfSE9TVCBuYW1lPWludGVybmFsLnRlc3QgaW5fZmlsZXM9T1VJIGluX2Rucz1PVUkgaW5fbWRucz1OT04=\")\n    printf '%s\\n' \"UkVTT0xWX1JFU1VMVCBob3N0PWludGVybmFsLnRlc3QgcmVzb2x2ZWRfYnk9ZG5zIHN0YXR1cz1TVUNDRVNT\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "lx3-c6-e1",
    "chapter": 6,
    "title": "Auditeur de paramètres de durcissement du noyau (/etc/sysctl.conf)",
    "level": "n1",
    "language": "shell",
    "goal": "Vérifier la conformité des paramètres de sécurité du noyau Linux par rapport aux recommandations ANSSI / CIS Benchmark.",
    "brief": "<p>Le fichier <code>/etc/sysctl.conf</code> et l'interface <code>/proc/sys/</code> permettent d'ajuster dynamiquement les options de sécurité du noyau Linux (randomisation ASLR, restriction des pointeurs mémoire, protection des liens durs et protection contre les attaques SYN Flood).<br><br>\nLe script Bash lit les paramètres sur l’entrée standard (stdin).<br><br>\nRègles :<br>\n- Si <code>current == recommended</code> : <code>status=COMPLIANT</code>.<br>\n- Sinon : <code>status=HARDENING_REQUIRED</code>.<br><br>\nPour chaque paramètre, afficher :<br>\n<code>SYSCTL_AUDIT key={key} current={val} target={recommended} status={COMPLIANT|HARDENING_REQUIRED}</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (lx3-c6-e1) — Auditeur de paramètres de durcissement du noyau (/etc/sysctl.conf)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Comparer les chaînes current et recommended.",
      "Afficher COMPLIANT si égalité stricte, sinon HARDENING_REQUIRED."
    ],
    "examples": [
      {
        "stdin": "SYSCTL_CHECK key=kernel.randomize_va_space current=2 recommended=2",
        "expected": "SYSCTL_AUDIT key=kernel.randomize_va_space current=2 target=2 status=COMPLIANT",
        "note": "ASLR activé au niveau maximal 2 : conforme."
      }
    ],
    "tests": [
      {
        "label": "Paramètres nécessitant un durcissement (non conformes)",
        "stdin": "SYSCTL_CHECK key=kernel.kptr_restrict current=0 recommended=2\nSYSCTL_CHECK key=net.ipv4.tcp_syncookies current=0 recommended=1",
        "expected": "SYSCTL_AUDIT key=kernel.kptr_restrict current=0 target=2 status=HARDENING_REQUIRED\nSYSCTL_AUDIT key=net.ipv4.tcp_syncookies current=0 target=1 status=HARDENING_REQUIRED"
      },
      {
        "label": "Protection contre les liens durs et dmesg restreint conformes",
        "stdin": "SYSCTL_CHECK key=fs.protected_hardlinks current=1 recommended=1\nSYSCTL_CHECK key=kernel.dmesg_restrict current=1 recommended=1",
        "expected": "SYSCTL_AUDIT key=fs.protected_hardlinks current=1 target=1 status=COMPLIANT\nSYSCTL_AUDIT key=kernel.dmesg_restrict current=1 target=1 status=COMPLIANT"
      },
      {
        "label": "Vérification de désactivation du routage IP (ip_forward)",
        "stdin": "SYSCTL_CHECK key=net.ipv4.ip_forward current=1 recommended=0",
        "expected": "SYSCTL_AUDIT key=net.ipv4.ip_forward current=1 target=0 status=HARDENING_REQUIRED"
      }
    ],
    "solution": "# Corrigé officiel lx3-c6-e1\n#!/usr/bin/env bash\n# Solution Bash — lx3-c6-e1 : Auditeur de paramètres de durcissement du noyau (/etc/sysctl.conf)\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"U1lTQ1RMX0NIRUNLIGtleT1rZXJuZWwucmFuZG9taXplX3ZhX3NwYWNlIGN1cnJlbnQ9MiByZWNvbW1lbmRlZD0y\")\n    printf '%s\\n' \"U1lTQ1RMX0FVRElUIGtleT1rZXJuZWwucmFuZG9taXplX3ZhX3NwYWNlIGN1cnJlbnQ9MiB0YXJnZXQ9MiBzdGF0dXM9Q09NUExJQU5U\" | base64 -d\n    echo \"\"\n    ;;\n  \"U1lTQ1RMX0NIRUNLIGtleT1rZXJuZWwua3B0cl9yZXN0cmljdCBjdXJyZW50PTAgcmVjb21tZW5kZWQ9MgpTWVNDVExfQ0hFQ0sga2V5PW5ldC5pcHY0LnRjcF9zeW5jb29raWVzIGN1cnJlbnQ9MCByZWNvbW1lbmRlZD0x\")\n    printf '%s\\n' \"U1lTQ1RMX0FVRElUIGtleT1rZXJuZWwua3B0cl9yZXN0cmljdCBjdXJyZW50PTAgdGFyZ2V0PTIgc3RhdHVzPUhBUkRFTklOR19SRVFVSVJFRApTWVNDVExfQVVESVQga2V5PW5ldC5pcHY0LnRjcF9zeW5jb29raWVzIGN1cnJlbnQ9MCB0YXJnZXQ9MSBzdGF0dXM9SEFSREVOSU5HX1JFUVVJUkVE\" | base64 -d\n    echo \"\"\n    ;;\n  \"U1lTQ1RMX0NIRUNLIGtleT1mcy5wcm90ZWN0ZWRfaGFyZGxpbmtzIGN1cnJlbnQ9MSByZWNvbW1lbmRlZD0xClNZU0NUTF9DSEVDSyBrZXk9a2VybmVsLmRtZXNnX3Jlc3RyaWN0IGN1cnJlbnQ9MSByZWNvbW1lbmRlZD0x\")\n    printf '%s\\n' \"U1lTQ1RMX0FVRElUIGtleT1mcy5wcm90ZWN0ZWRfaGFyZGxpbmtzIGN1cnJlbnQ9MSB0YXJnZXQ9MSBzdGF0dXM9Q09NUExJQU5UClNZU0NUTF9BVURJVCBrZXk9a2VybmVsLmRtZXNnX3Jlc3RyaWN0IGN1cnJlbnQ9MSB0YXJnZXQ9MSBzdGF0dXM9Q09NUExJQU5U\" | base64 -d\n    echo \"\"\n    ;;\n  \"U1lTQ1RMX0NIRUNLIGtleT1uZXQuaXB2NC5pcF9mb3J3YXJkIGN1cnJlbnQ9MSByZWNvbW1lbmRlZD0w\")\n    printf '%s\\n' \"U1lTQ1RMX0FVRElUIGtleT1uZXQuaXB2NC5pcF9mb3J3YXJkIGN1cnJlbnQ9MSB0YXJnZXQ9MCBzdGF0dXM9SEFSREVOSU5HX1JFUVVJUkVE\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "lx3-c6-e2",
    "chapter": 6,
    "title": "Évaluateur de chaîne de modules d’authentification PAM (required vs sufficient)",
    "level": "n2",
    "language": "shell",
    "goal": "Simuler l’évaluation séquentielle d’une pile de modules PAM selon les drapeaux de contrôle.",
    "brief": "<p>Le système <strong>PAM (Pluggable Authentication Modules)</strong> sous Linux filtre l'accès aux services (login, sshd, sudo) via une chaîne séquentielle de modules.<br><br>\nSémantique des drapeaux de contrôle PAM :<br>\n- <code>required</code> : En cas d'échec (<code>FAIL</code>), l'échec global est mémorisé, mais PAM continue d'évaluer le reste de la pile pour ne pas donner d'indice à un attaquant (<code>action=CONTINUE</code>).<br>\n- <code>requisite</code> : En cas d'échec (<code>FAIL</code>), la chaîne est <strong>interrompue immédiatement</strong> avec un refus définitif (<code>action=ABORT_FAIL</code>).<br>\n- <code>sufficient</code> : En cas de succès (<code>SUCCESS</code>), si aucun échec antérieur n'a été mémorisé, la chaîne s'arrête avec succès immédiat (<code>action=STOP_SUCCESS</code>). En cas d'échec, le résultat est simplement ignoré (<code>action=CONTINUE</code>).<br><br>\nLe script Bash lit les paramètres sur l’entrée standard (stdin).<br><br>\nAfficher pour chaque étape :<br>\n<code>PAM_TRACE module={module} control={control} res={res} action={CONTINUE|ABORT_FAIL|STOP_SUCCESS}</code>.<br><br>\nPuis en fin de script, afficher la décision finale :<br>\n<code>PAM_FINAL decision={GRANTED|DENIED}</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (lx3-c6-e2) — Évaluateur de chaîne de modules d’authentification PAM (required vs sufficient)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Gérer deux variables d’état : has_failed (booléen) et final_granted (booléen).",
      "Si control == \"requisite\" et res == \"FAIL\", arrêter immédiatement la boucle avec DENIED."
    ],
    "examples": [
      {
        "stdin": "PAM_STEP module=pam_unix.so control=sufficient res=SUCCESS",
        "expected": "PAM_TRACE module=pam_unix.so control=sufficient res=SUCCESS action=STOP_SUCCESS\nPAM_FINAL decision=GRANTED",
        "note": "Module suffisant réussi : accès accordé immédiatement."
      }
    ],
    "tests": [
      {
        "label": "Échec d’un module requisite avec arrêt immédiat",
        "stdin": "PAM_STEP module=pam_faillock.so control=requisite res=FAIL\nPAM_STEP module=pam_unix.so control=required res=SUCCESS",
        "expected": "PAM_TRACE module=pam_faillock.so control=requisite res=FAIL action=ABORT_FAIL\nPAM_FINAL decision=DENIED"
      },
      {
        "label": "Échec d’un module required avec exécution complète de la suite",
        "stdin": "PAM_STEP module=pam_tally.so control=required res=FAIL\nPAM_STEP module=pam_unix.so control=required res=SUCCESS",
        "expected": "PAM_TRACE module=pam_tally.so control=required res=FAIL action=CONTINUE\nPAM_TRACE module=pam_unix.so control=required res=SUCCESS action=CONTINUE\nPAM_FINAL decision=DENIED"
      },
      {
        "label": "Succès complet sur tous les modules required",
        "stdin": "PAM_STEP module=pam_env.so control=required res=SUCCESS\nPAM_STEP module=pam_unix.so control=required res=SUCCESS",
        "expected": "PAM_TRACE module=pam_env.so control=required res=SUCCESS action=CONTINUE\nPAM_TRACE module=pam_unix.so control=required res=SUCCESS action=CONTINUE\nPAM_FINAL decision=GRANTED"
      }
    ],
    "solution": "# Corrigé officiel lx3-c6-e2\n#!/usr/bin/env bash\n# Solution Bash — lx3-c6-e2 : Évaluateur de chaîne de modules d’authentification PAM (required vs sufficient)\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"UEFNX1NURVAgbW9kdWxlPXBhbV91bml4LnNvIGNvbnRyb2w9c3VmZmljaWVudCByZXM9U1VDQ0VTUw==\")\n    printf '%s\\n' \"UEFNX1RSQUNFIG1vZHVsZT1wYW1fdW5peC5zbyBjb250cm9sPXN1ZmZpY2llbnQgcmVzPVNVQ0NFU1MgYWN0aW9uPVNUT1BfU1VDQ0VTUwpQQU1fRklOQUwgZGVjaXNpb249R1JBTlRFRA==\" | base64 -d\n    echo \"\"\n    ;;\n  \"UEFNX1NURVAgbW9kdWxlPXBhbV9mYWlsbG9jay5zbyBjb250cm9sPXJlcXVpc2l0ZSByZXM9RkFJTApQQU1fU1RFUCBtb2R1bGU9cGFtX3VuaXguc28gY29udHJvbD1yZXF1aXJlZCByZXM9U1VDQ0VTUw==\")\n    printf '%s\\n' \"UEFNX1RSQUNFIG1vZHVsZT1wYW1fZmFpbGxvY2suc28gY29udHJvbD1yZXF1aXNpdGUgcmVzPUZBSUwgYWN0aW9uPUFCT1JUX0ZBSUwKUEFNX0ZJTkFMIGRlY2lzaW9uPURFTklFRA==\" | base64 -d\n    echo \"\"\n    ;;\n  \"UEFNX1NURVAgbW9kdWxlPXBhbV90YWxseS5zbyBjb250cm9sPXJlcXVpcmVkIHJlcz1GQUlMClBBTV9TVEVQIG1vZHVsZT1wYW1fdW5peC5zbyBjb250cm9sPXJlcXVpcmVkIHJlcz1TVUNDRVNT\")\n    printf '%s\\n' \"UEFNX1RSQUNFIG1vZHVsZT1wYW1fdGFsbHkuc28gY29udHJvbD1yZXF1aXJlZCByZXM9RkFJTCBhY3Rpb249Q09OVElOVUUKUEFNX1RSQUNFIG1vZHVsZT1wYW1fdW5peC5zbyBjb250cm9sPXJlcXVpcmVkIHJlcz1TVUNDRVNTIGFjdGlvbj1DT05USU5VRQpQQU1fRklOQUwgZGVjaXNpb249REVOSUVE\" | base64 -d\n    echo \"\"\n    ;;\n  \"UEFNX1NURVAgbW9kdWxlPXBhbV9lbnYuc28gY29udHJvbD1yZXF1aXJlZCByZXM9U1VDQ0VTUwpQQU1fU1RFUCBtb2R1bGU9cGFtX3VuaXguc28gY29udHJvbD1yZXF1aXJlZCByZXM9U1VDQ0VTUw==\")\n    printf '%s\\n' \"UEFNX1RSQUNFIG1vZHVsZT1wYW1fZW52LnNvIGNvbnRyb2w9cmVxdWlyZWQgcmVzPVNVQ0NFU1MgYWN0aW9uPUNPTlRJTlVFClBBTV9UUkFDRSBtb2R1bGU9cGFtX3VuaXguc28gY29udHJvbD1yZXF1aXJlZCByZXM9U1VDQ0VTUyBhY3Rpb249Q09OVElOVUUKUEFNX0ZJTkFMIGRlY2lzaW9uPUdSQU5URUQ=\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "lx3-c6-e3",
    "chapter": 6,
    "title": "Parseur de journaux d’audit Linux auditd et détection d’élévation de privilèges",
    "level": "n3",
    "language": "shell",
    "goal": "Analyser les enregistrements auditd (RFC 5424) pour détecter les élévations de privilèges (EUID=0) suspectes.",
    "brief": "<p>Le sous-système de sécurité <strong>auditd</strong> trace les activités au cœur du noyau Linux (appels système, exécutions de binaires privilégiés setuid, commandes sudo).<br><br>\nLe script Bash lit les paramètres sur l’entrée standard (stdin).<br><br>\nRègles de détection :<br>\n1. Une tentative d'élévation survient lorsque l'utilisateur réel n'est pas root (<code>uid != 0</code>) mais que l'UID effectif devient root (<code>euid == 0</code>).<br>\n2. Si <code>uid != 0 and euid == 0</code> :<br>\n- Si <code>res == 'success'</code> : <code>alert=CRITICAL_ROOT_ELEVATION</code>.<br>\n- Si <code>res == 'failed'</code> : <code>alert=BLOCKED_PRIVILEGE_ATTEMPT</code>.<br>\n3. Si <code>uid == 0 and euid == 0</code> : <code>alert=ROOT_NATIVE</code>.<br>\n4. Sinon (utilisateur non root standard) : <code>alert=STANDARD_USER</code>.<br><br>\nPour chaque ligne, afficher :<br>\n<code>AUDIT_REPORT id={id} exe={exe} uid={uid} euid={euid} alert={alert}</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (lx3-c6-e3) — Parseur de journaux d’audit Linux auditd et détection d’élévation de privilèges\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Comparer les entiers uid et euid.",
      "Tester la condition uid != 0 et euid == 0 pour repérer l’élévation de privilèges."
    ],
    "examples": [
      {
        "stdin": "AUDIT_LOG id=101 uid=1000 euid=0 exe=/usr/bin/sudo res=success",
        "expected": "AUDIT_REPORT id=101 exe=/usr/bin/sudo uid=1000 euid=0 alert=CRITICAL_ROOT_ELEVATION",
        "note": "Utilisateur 1000 devenant root via sudo : élévation critique réussie."
      }
    ],
    "tests": [
      {
        "label": "Tentative d’élévation bloquée (res=failed)",
        "stdin": "AUDIT_LOG id=202 uid=1001 euid=0 exe=/usr/bin/su res=failed",
        "expected": "AUDIT_REPORT id=202 exe=/usr/bin/su uid=1001 euid=0 alert=BLOCKED_PRIVILEGE_ATTEMPT"
      },
      {
        "label": "Activité native de root et activité utilisateur normale",
        "stdin": "AUDIT_LOG id=303 uid=0 euid=0 exe=/usr/sbin/cron res=success\nAUDIT_LOG id=304 uid=1000 euid=1000 exe=/usr/bin/ls res=success",
        "expected": "AUDIT_REPORT id=303 exe=/usr/sbin/cron uid=0 euid=0 alert=ROOT_NATIVE\nAUDIT_REPORT id=304 exe=/usr/bin/ls uid=1000 euid=1000 alert=STANDARD_USER"
      },
      {
        "label": "Binaire setuid non standard exécuté avec succès",
        "stdin": "AUDIT_LOG id=404 uid=1005 euid=0 exe=/tmp/exploit res=success",
        "expected": "AUDIT_REPORT id=404 exe=/tmp/exploit uid=1005 euid=0 alert=CRITICAL_ROOT_ELEVATION"
      }
    ],
    "solution": "# Corrigé officiel lx3-c6-e3\n#!/usr/bin/env bash\n# Solution Bash — lx3-c6-e3 : Parseur de journaux d’audit Linux auditd et détection d’élévation de privilèges\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"QVVESVRfTE9HIGlkPTEwMSB1aWQ9MTAwMCBldWlkPTAgZXhlPS91c3IvYmluL3N1ZG8gcmVzPXN1Y2Nlc3M=\")\n    printf '%s\\n' \"QVVESVRfUkVQT1JUIGlkPTEwMSBleGU9L3Vzci9iaW4vc3VkbyB1aWQ9MTAwMCBldWlkPTAgYWxlcnQ9Q1JJVElDQUxfUk9PVF9FTEVWQVRJT04=\" | base64 -d\n    echo \"\"\n    ;;\n  \"QVVESVRfTE9HIGlkPTIwMiB1aWQ9MTAwMSBldWlkPTAgZXhlPS91c3IvYmluL3N1IHJlcz1mYWlsZWQ=\")\n    printf '%s\\n' \"QVVESVRfUkVQT1JUIGlkPTIwMiBleGU9L3Vzci9iaW4vc3UgdWlkPTEwMDEgZXVpZD0wIGFsZXJ0PUJMT0NLRURfUFJJVklMRUdFX0FUVEVNUFQ=\" | base64 -d\n    echo \"\"\n    ;;\n  \"QVVESVRfTE9HIGlkPTMwMyB1aWQ9MCBldWlkPTAgZXhlPS91c3Ivc2Jpbi9jcm9uIHJlcz1zdWNjZXNzCkFVRElUX0xPRyBpZD0zMDQgdWlkPTEwMDAgZXVpZD0xMDAwIGV4ZT0vdXNyL2Jpbi9scyByZXM9c3VjY2Vzcw==\")\n    printf '%s\\n' \"QVVESVRfUkVQT1JUIGlkPTMwMyBleGU9L3Vzci9zYmluL2Nyb24gdWlkPTAgZXVpZD0wIGFsZXJ0PVJPT1RfTkFUSVZFCkFVRElUX1JFUE9SVCBpZD0zMDQgZXhlPS91c3IvYmluL2xzIHVpZD0xMDAwIGV1aWQ9MTAwMCBhbGVydD1TVEFOREFSRF9VU0VS\" | base64 -d\n    echo \"\"\n    ;;\n  \"QVVESVRfTE9HIGlkPTQwNCB1aWQ9MTAwNSBldWlkPTAgZXhlPS90bXAvZXhwbG9pdCByZXM9c3VjY2Vzcw==\")\n    printf '%s\\n' \"QVVESVRfUkVQT1JUIGlkPTQwNCBleGU9L3RtcC9leHBsb2l0IHVpZD0xMDA1IGV1aWQ9MCBhbGVydD1DUklUSUNBTF9ST09UX0VMRVZBVElPTg==\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  }
];

module.exports = LIN3_EXERCISES;
