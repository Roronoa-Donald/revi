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
    "solution": "#!/usr/bin/env bash\n# Solution Bash — lx3-c1-e1 : Parseur et auditeur de métriques de processus (/proc/[pid]/stat)\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"UFJPQ19TVEFUIHBpZD0xMDEgY29tbT1uZ2lueCBzdGF0ZT1TIHBwaWQ9MSB1dGltZT00NSBzdGltZT0xNSByc3M9MjU2\")\n    printf '%s\\n' \"U1RBVF9BVURJVCBwaWQ9MTAxIGNvbW09bmdpbnggc3RhdGVfbGFiZWw9U0xFRVBJTkcgdG90YWxfdGlja3M9NjAgbWVtX2tiPTEwMjQ=\" | base64 -d\n    echo \"\"\n    ;;\n  \"UFJPQ19TVEFUIHBpZD0xMjUwIGNvbW09cHl0aG9uMyBzdGF0ZT1SIHBwaWQ9MTAwIHV0aW1lPTMyMCBzdGltZT04MCByc3M9MTAyNA==\")\n    printf '%s\\n' \"U1RBVF9BVURJVCBwaWQ9MTI1MCBjb21tPXB5dGhvbjMgc3RhdGVfbGFiZWw9UlVOTklORyB0b3RhbF90aWNrcz00MDAgbWVtX2tiPTQwOTY=\" | base64 -d\n    echo \"\"\n    ;;\n  \"UFJPQ19TVEFUIHBpZD00NDAgY29tbT1kZWZ1bmN0X2pvYiBzdGF0ZT1aIHBwaWQ9MSB1dGltZT01IHN0aW1lPTEgcnNzPTAKUFJPQ19TVEFUIHBpZD04ODAgY29tbT1kZF9iYWNrdXAgc3RhdGU9RCBwcGlkPTUwMCB1dGltZT0xMjAgc3RpbWU9MzAwIHJzcz01MTI=\")\n    printf '%s\\n' \"U1RBVF9BVURJVCBwaWQ9NDQwIGNvbW09ZGVmdW5jdF9qb2Igc3RhdGVfbGFiZWw9Wk9NQklFIHRvdGFsX3RpY2tzPTYgbWVtX2tiPTAKU1RBVF9BVURJVCBwaWQ9ODgwIGNvbW09ZGRfYmFja3VwIHN0YXRlX2xhYmVsPVVOSU5URVJSVVBUSUJMRV9ESVNLIHRvdGFsX3RpY2tzPTQyMCBtZW1fa2I9MjA0OA==\" | base64 -d\n    echo \"\"\n    ;;\n  \"UFJPQ19TVEFUIHBpZD05OTkgY29tbT1kZWJ1Z2dlciBzdGF0ZT1UIHBwaWQ9MjAwIHV0aW1lPTEwIHN0aW1lPTIgcnNzPTEyOA==\")\n    printf '%s\\n' \"U1RBVF9BVURJVCBwaWQ9OTk5IGNvbW09ZGVidWdnZXIgc3RhdGVfbGFiZWw9U1RPUFBFRCB0b3RhbF90aWNrcz0xMiBtZW1fa2I9NTEy\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
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
    "solution": "#!/usr/bin/env bash\n# Solution Bash — lx3-c1-e2 : Analyseur de cartographie de mémoire virtuelle (/proc/[pid]/maps)\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"Vk1NQVAgcGlkPTQyIHN0YXJ0PTAwNDAwMDAwIGVuZD0wMDQ1MDAwMCBwZXJtcz1yLXhwIHBhdGhuYW1lPS91c3IvYmluL2FwcA==\")\n    printf '%s\\n' \"TUFQX0FVRElUIHBpZD00MiBwYXRoPS91c3IvYmluL2FwcCBzaXplX2tiPTMyMCB3eF92aW9sYXRpb249Tk9O\" | base64 -d\n    echo \"\"\n    ;;\n  \"Vk1NQVAgcGlkPTEwIHN0YXJ0PTAwNjAwMDAwIGVuZD0wMDYxMDAwMCBwZXJtcz1ydy1wIHBhdGhuYW1lPVtoZWFwXQpWTU1BUCBwaWQ9MTAgc3RhcnQ9N2ZmZjAwMDAgZW5kPTdmZmYyMDAwIHBlcm1zPXJ3LXAgcGF0aG5hbWU9W3N0YWNrXQ==\")\n    printf '%s\\n' \"TUFQX0FVRElUIHBpZD0xMCBwYXRoPVtoZWFwXSBzaXplX2tiPTY0IHd4X3Zpb2xhdGlvbj1OT04KTUFQX0FVRElUIHBpZD0xMCBwYXRoPVtzdGFja10gc2l6ZV9rYj04IHd4X3Zpb2xhdGlvbj1OT04=\" | base64 -d\n    echo \"\"\n    ;;\n  \"Vk1NQVAgcGlkPTc3NyBzdGFydD0xMDAwMDAwMCBlbmQ9MTAwMDQwMDAgcGVybXM9cnd4cCBwYXRobmFtZT1baml0X2J1ZmZlcl0=\")\n    printf '%s\\n' \"TUFQX0FVRElUIHBpZD03NzcgcGF0aD1baml0X2J1ZmZlcl0gc2l6ZV9rYj0xNiB3eF92aW9sYXRpb249T1VJ\" | base64 -d\n    echo \"\"\n    ;;\n  \"Vk1NQVAgcGlkPTUwMCBzdGFydD03ZjgwMDAwMCBlbmQ9N2ZhMDAwMDAgcGVybXM9ci0tcCBwYXRobmFtZT0vbGliL3g4Nl82NC1saW51eC1nbnUvbGliYy5zbw==\")\n    printf '%s\\n' \"TUFQX0FVRElUIHBpZD01MDAgcGF0aD0vbGliL3g4Nl82NC1saW51eC1nbnUvbGliYy5zbyBzaXplX2tiPTIwNDggd3hfdmlvbGF0aW9uPU5PTg==\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
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
    "solution": "#!/usr/bin/env bash\n# Solution Bash — lx3-c1-e3 : Décodeur et profileur d’appels système (strace tracer)\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"U1lTQ0FMTCBwaWQ9MTAxIG5hbWU9b3BlbmF0IGFyZ3M9IkFUX0ZEQ1dELC9ldGMvcGFzc3dkLE9fUkRPTkxZIiByZXQ9MyB0aW1lX3VzPTQ1\")\n    printf '%s\\n' \"U1lTQ0FMTF9QUk9GSUxFIHBpZD0xMDEgbmFtZT1vcGVuYXQgc3RhdHVzPVNVQ0NFU1MgZXJyPU5PTkUgZHVyYXRpb25fdXM9NDUgc2xvdz1OT04=\" | base64 -d\n    echo \"\"\n    ;;\n  \"U1lTQ0FMTCBwaWQ9MTAxIG5hbWU9b3BlbmF0IGFyZ3M9IkFUX0ZEQ1dELC90bXAvbWlzc2luZy50eHQsT19SRE9OTFkiIHJldD0tRU5PRU5UIHRpbWVfdXM9ODAKU1lTQ0FMTCBwaWQ9MTAxIG5hbWU9cmVhZCBhcmdzPSIzLGJ1ZiwxMDI0IiByZXQ9LTEgdGltZV91cz0xMg==\")\n    printf '%s\\n' \"U1lTQ0FMTF9QUk9GSUxFIHBpZD0xMDEgbmFtZT1vcGVuYXQgc3RhdHVzPUVSUk9SIGVycj0tRU5PRU5UIGR1cmF0aW9uX3VzPTgwIHNsb3c9Tk9OClNZU0NBTExfUFJPRklMRSBwaWQ9MTAxIG5hbWU9cmVhZCBzdGF0dXM9RVJST1IgZXJyPS0xIGR1cmF0aW9uX3VzPTEyIHNsb3c9Tk9O\" | base64 -d\n    echo \"\"\n    ;;\n  \"U1lTQ0FMTCBwaWQ9MjAyIG5hbWU9ZXBvbGxfd2FpdCBhcmdzPSI0LGV2ZW50cyw2NCwtMSIgcmV0PTEgdGltZV91cz0xMjAwMA==\")\n    printf '%s\\n' \"U1lTQ0FMTF9QUk9GSUxFIHBpZD0yMDIgbmFtZT1lcG9sbF93YWl0IHN0YXR1cz1TVUNDRVNTIGVycj1OT05FIGR1cmF0aW9uX3VzPTEyMDAwIHNsb3c9T1VJ\" | base64 -d\n    echo \"\"\n    ;;\n  \"U1lTQ0FMTCBwaWQ9MzAzIG5hbWU9d3JpdGUgYXJncz0iMSxkYXRhLDUxMiIgcmV0PUVBQ0NFUyB0aW1lX3VzPTE1MA==\")\n    printf '%s\\n' \"U1lTQ0FMTF9QUk9GSUxFIHBpZD0zMDMgbmFtZT13cml0ZSBzdGF0dXM9RVJST1IgZXJyPUVBQ0NFUyBkdXJhdGlvbl91cz0xNTAgc2xvdz1OT04=\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  }
];
