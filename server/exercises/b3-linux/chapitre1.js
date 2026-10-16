'use strict';

module.exports = [
  {
    "id": "lx3-c1-e1",
    "chapter": 1,
    "title": "Parseur et auditeur de métriques de processus (/proc/[pid]/stat)",
    "level": "n1",
    "language": "analyse",
    "goal": "Analyser les métriques d’état, de temps CPU et de mémoire résidente issues du pseudo-système de fichiers /proc.",
    "brief": "<p>Dans le noyau Linux, le pseudo-système de fichiers <code>/proc</code> expose directement en mémoire l'état interne des structures de données du noyau (notamment la structure <code>task_struct</code> pour chaque processus).<br><br>\nLe fichier <code>/proc/[pid]/stat</code> fournit sur une seule ligne les indicateurs vitaux d'exécution.<br><br>\nAnalysez les paramètres du problème pour chaque cas.<br><br>\nTable de correspondance de l'état :<br>\n- <code>R</code> &rarr; <code>RUNNING</code><br>\n- <code>S</code> &rarr; <code>SLEEPING</code><br>\n- <code>D</code> &rarr; <code>UNINTERRUPTIBLE_DISK</code><br>\n- <code>Z</code> &rarr; <code>ZOMBIE</code><br>\n- <code>T</code> &rarr; <code>STOPPED</code><br><br>\nCalculs à effectuer :<br>\n- <code>total_ticks = int(utime) + int(stime)</code><br>\n- <code>rss_kb = int(rss) * 4</code> (en considérant une taille standard de page mémoire de 4 Ko).<br><br>\nPour chaque ligne, afficher :<br>\n<code>STAT_AUDIT pid={pid} comm={comm} state_label={label} total_ticks={total_ticks} mem_kb={rss_kb}</code></p>",
    "starter": "# Grille d'analyse (lx3-c1-e1) — Parseur et auditeur de métriques de processus (/proc/[pid]/stat)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Processus actif en cours d’exécution (R)]\n# Données : PROC_STAT pid=1250 comm=python3 state=R ppid=100 utime=320 stime=80 rss=1024\nA_COMPLETER\n\n[Cas 2 — Processus zombie (Z) et attente disque ininterruptible (D)]\n# Données : PROC_STAT pid=440 comm=defunct_job state=Z ppid=1 utime=5 stime=1 rss=0\n# Données : PROC_STAT pid=880 comm=dd_backup state=D ppid=500 utime=120 stime=300 rss=512\nA_COMPLETER\n\n[Cas 3 — Processus stoppé par signal SIGSTOP (T)]\n# Données : PROC_STAT pid=999 comm=debugger state=T ppid=200 utime=10 stime=2 rss=128\nA_COMPLETER\n",
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
        "stdin": "cas:1",
        "expected": "STAT_AUDIT pid=1250 comm=python3 state_label=RUNNING total_ticks=400 mem_kb=4096"
      },
      {
        "label": "Processus zombie (Z) et attente disque ininterruptible (D)",
        "stdin": "cas:2",
        "expected": "STAT_AUDIT pid=440 comm=defunct_job state_label=ZOMBIE total_ticks=6 mem_kb=0\nSTAT_AUDIT pid=880 comm=dd_backup state_label=UNINTERRUPTIBLE_DISK total_ticks=420 mem_kb=2048"
      },
      {
        "label": "Processus stoppé par signal SIGSTOP (T)",
        "stdin": "cas:3",
        "expected": "STAT_AUDIT pid=999 comm=debugger state_label=STOPPED total_ticks=12 mem_kb=512"
      }
    ],
    "solution": "[Exemple]\nSTAT_AUDIT pid=101 comm=nginx state_label=SLEEPING total_ticks=60 mem_kb=1024\n\n[Cas 1 — Processus actif en cours d’exécution (R)]\nSTAT_AUDIT pid=1250 comm=python3 state_label=RUNNING total_ticks=400 mem_kb=4096\n\n[Cas 2 — Processus zombie (Z) et attente disque ininterruptible (D)]\nSTAT_AUDIT pid=440 comm=defunct_job state_label=ZOMBIE total_ticks=6 mem_kb=0\nSTAT_AUDIT pid=880 comm=dd_backup state_label=UNINTERRUPTIBLE_DISK total_ticks=420 mem_kb=2048\n\n[Cas 3 — Processus stoppé par signal SIGSTOP (T)]\nSTAT_AUDIT pid=999 comm=debugger state_label=STOPPED total_ticks=12 mem_kb=512"
  },
  {
    "id": "lx3-c1-e2",
    "chapter": 1,
    "title": "Analyseur de cartographie de mémoire virtuelle (/proc/[pid]/maps)",
    "level": "n2",
    "language": "analyse",
    "goal": "Analyser les plages d’adresses de mémoire virtuelle et détecter les violations du principe de sécurité W^X (Write XOR Execute).",
    "brief": "<p>Sous Linux, chaque processus dispose d'un espace d'adressage virtuel isolé divisé en segments (code, données, tas heap, pile stack, bibliothèques partagées mmap). Le fichier <code>/proc/[pid]/maps</code> détaille ces plages.<br><br>\nPour des raisons de sécurité (atténuation d'exploits de corruption de mémoire), le noyau moderne impose le principe <strong>W^X (Write XOR Execute)</strong> : une page de mémoire ne doit <strong>jamais être simultanément inscriptible (w) et exécutable (x)</strong>, car cela permet l'injection et l'exécution directe de shellcode.<br><br>\nAnalysez les paramètres du problème pour chaque cas.<br><br>\nCalculs :<br>\n- <code>size_kb = (int(end, 16) - int(start, 16)) // 1024</code><br>\n- Violation W^X : si <code>'w' in perms and 'x' in perms</code>, alors <code>wx_violation=OUI</code>, sinon <code>wx_violation=NON</code>.<br><br>\nPour chaque ligne, afficher :<br>\n<code>MAP_AUDIT pid={pid} path={pathname} size_kb={size_kb} wx_violation={wx_violation}</code></p>",
    "starter": "# Grille d'analyse (lx3-c1-e2) — Analyseur de cartographie de mémoire virtuelle (/proc/[pid]/maps)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Segment de données non exécutable et pile sécurisée]\n# Données : VMMAP pid=10 start=00600000 end=00610000 perms=rw-p pathname=[heap]\n# Données : VMMAP pid=10 start=7fff0000 end=7fff2000 perms=rw-p pathname=[stack]\nA_COMPLETER\n\n[Cas 2 — Détection d’une violation critique W^X (page RWX inscriptible et exécutable)]\n# Données : VMMAP pid=777 start=10000000 end=10004000 perms=rwxp pathname=[jit_buffer]\nA_COMPLETER\n\n[Cas 3 — Bibliothèque partagée en lecture seule]\n# Données : VMMAP pid=500 start=7f800000 end=7fa00000 perms=r--p pathname=/lib/x86_64-linux-gnu/libc.so\nA_COMPLETER\n",
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
        "stdin": "cas:1",
        "expected": "MAP_AUDIT pid=10 path=[heap] size_kb=64 wx_violation=NON\nMAP_AUDIT pid=10 path=[stack] size_kb=8 wx_violation=NON"
      },
      {
        "label": "Détection d’une violation critique W^X (page RWX inscriptible et exécutable)",
        "stdin": "cas:2",
        "expected": "MAP_AUDIT pid=777 path=[jit_buffer] size_kb=16 wx_violation=OUI"
      },
      {
        "label": "Bibliothèque partagée en lecture seule",
        "stdin": "cas:3",
        "expected": "MAP_AUDIT pid=500 path=/lib/x86_64-linux-gnu/libc.so size_kb=2048 wx_violation=NON"
      }
    ],
    "solution": "[Exemple]\nMAP_AUDIT pid=42 path=/usr/bin/app size_kb=320 wx_violation=NON\n\n[Cas 1 — Segment de données non exécutable et pile sécurisée]\nMAP_AUDIT pid=10 path=[heap] size_kb=64 wx_violation=NON\nMAP_AUDIT pid=10 path=[stack] size_kb=8 wx_violation=NON\n\n[Cas 2 — Détection d’une violation critique W^X (page RWX inscriptible et exécutable)]\nMAP_AUDIT pid=777 path=[jit_buffer] size_kb=16 wx_violation=OUI\n\n[Cas 3 — Bibliothèque partagée en lecture seule]\nMAP_AUDIT pid=500 path=/lib/x86_64-linux-gnu/libc.so size_kb=2048 wx_violation=NON"
  },
  {
    "id": "lx3-c1-e3",
    "chapter": 1,
    "title": "Décodeur et profileur d’appels système (strace tracer)",
    "level": "n3",
    "language": "analyse",
    "goal": "Analyser les traces d’appels système (syscalls) pour isoler les erreurs d’I/O et profiler la latence noyau.",
    "brief": "<p>L'utilitaire <code>strace</code> intercepte et enregistre les appels système (syscalls) effectués par un processus et les signaux reçus via l'API <code>ptrace(2)</code> du noyau Linux.<br><br>\nAnalysez les paramètres du problème pour chaque cas.<br><br>\nRègles d'analyse :<br>\n1. Si <code>ret</code> commence par <code>-</code> ou est égal à une constante d'erreur POSIX (ex: <code>ENOENT</code>, <code>EACCES</code>, <code>EPERM</code>, <code>EBADF</code>), le statut est <code>ERROR</code> et l'erreur est consignée.<br>\n2. Sinon, le statut est <code>SUCCESS</code> et le code d'erreur est <code>NONE</code>.<br>\n3. Latence : si <code>int(time_us) &gt; 5000</code>, classer comme <code>SLOW=OUI</code>, sinon <code>SLOW=NON</code>.<br><br>\nPour chaque appel, afficher :<br>\n<code>SYSCALL_PROFILE pid={pid} name={name} status={SUCCESS|ERROR} err={err} duration_us={time_us} slow={SLOW}</code></p>",
    "starter": "# Grille d'analyse (lx3-c1-e3) — Décodeur et profileur d’appels système (strace tracer)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Erreur de fichier introuvable (ENOENT ou code négatif)]\n# Données : SYSCALL pid=101 name=openat args=\"AT_FDCWD,/tmp/missing.txt,O_RDONLY\" ret=-ENOENT time_us=80\n# Données : SYSCALL pid=101 name=read args=\"3,buf,1024\" ret=-1 time_us=12\nA_COMPLETER\n\n[Cas 2 — Appel bloquant avec latence excessive (SLOW=OUI)]\n# Données : SYSCALL pid=202 name=epoll_wait args=\"4,events,64,-1\" ret=1 time_us=12000\nA_COMPLETER\n\n[Cas 3 — Refus de permission (EACCES)]\n# Données : SYSCALL pid=303 name=write args=\"1,data,512\" ret=EACCES time_us=150\nA_COMPLETER\n",
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
        "stdin": "cas:1",
        "expected": "SYSCALL_PROFILE pid=101 name=openat status=ERROR err=-ENOENT duration_us=80 slow=NON\nSYSCALL_PROFILE pid=101 name=read status=ERROR err=-1 duration_us=12 slow=NON"
      },
      {
        "label": "Appel bloquant avec latence excessive (SLOW=OUI)",
        "stdin": "cas:2",
        "expected": "SYSCALL_PROFILE pid=202 name=epoll_wait status=SUCCESS err=NONE duration_us=12000 slow=OUI"
      },
      {
        "label": "Refus de permission (EACCES)",
        "stdin": "cas:3",
        "expected": "SYSCALL_PROFILE pid=303 name=write status=ERROR err=EACCES duration_us=150 slow=NON"
      }
    ],
    "solution": "[Exemple]\nSYSCALL_PROFILE pid=101 name=openat status=SUCCESS err=NONE duration_us=45 slow=NON\n\n[Cas 1 — Erreur de fichier introuvable (ENOENT ou code négatif)]\nSYSCALL_PROFILE pid=101 name=openat status=ERROR err=-ENOENT duration_us=80 slow=NON\nSYSCALL_PROFILE pid=101 name=read status=ERROR err=-1 duration_us=12 slow=NON\n\n[Cas 2 — Appel bloquant avec latence excessive (SLOW=OUI)]\nSYSCALL_PROFILE pid=202 name=epoll_wait status=SUCCESS err=NONE duration_us=12000 slow=OUI\n\n[Cas 3 — Refus de permission (EACCES)]\nSYSCALL_PROFILE pid=303 name=write status=ERROR err=EACCES duration_us=150 slow=NON"
  }
];
