/**
 * Exercices Chapitre 1 — Linux Avancé B3.
 * Noyau Linux, Pseudo-Systèmes de Fichiers (/proc, /sys) & Appels Système (Syscalls).
 */
'use strict';

module.exports = [
  {
    id: 'lx3-c1-e1',
    chapter: 1,
    title: 'Parseur et auditeur de métriques de processus (/proc/[pid]/stat)',
    level: 'n1',
    language: 'python',
    goal: 'Analyser les métriques d’état, de temps CPU et de mémoire résidente issues du pseudo-système de fichiers /proc.',
    brief: `<p>Dans le noyau Linux, le pseudo-système de fichiers <code>/proc</code> expose directement en mémoire l'état interne des structures de données du noyau (notamment la structure <code>task_struct</code> pour chaque processus).<br><br>
Le fichier <code>/proc/[pid]/stat</code> fournit sur une seule ligne les indicateurs vitaux d'exécution.<br><br>
Le script lit sur l'entrée standard des lignes au format :<br>
<code>PROC_STAT pid=&lt;id&gt; comm=&lt;nom&gt; state=&lt;R|S|D|Z|T&gt; ppid=&lt;ppid&gt; utime=&lt;ticks&gt; stime=&lt;ticks&gt; rss=&lt;pages&gt;</code>.<br><br>
Table de correspondance de l'état :<br>
- <code>R</code> &rarr; <code>RUNNING</code><br>
- <code>S</code> &rarr; <code>SLEEPING</code><br>
- <code>D</code> &rarr; <code>UNINTERRUPTIBLE_DISK</code><br>
- <code>Z</code> &rarr; <code>ZOMBIE</code><br>
- <code>T</code> &rarr; <code>STOPPED</code><br><br>
Calculs à effectuer :<br>
- <code>total_ticks = int(utime) + int(stime)</code><br>
- <code>rss_kb = int(rss) * 4</code> (en considérant une taille standard de page mémoire de 4 Ko).<br><br>
Pour chaque ligne, afficher :<br>
<code>STAT_AUDIT pid={pid} comm={comm} state_label={label} total_ticks={total_ticks} mem_kb={rss_kb}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : parser les métriques /proc/[pid]/stat
`,
    hints: [
      'Extraire chaque champ clé-valeur avec des séparations d’espaces ou expressions régulières.',
      'Convertir utime, stime et rss en entiers avant d’effectuer les opérations arithmétiques.'
    ],
    examples: [
      {
        stdin: 'PROC_STAT pid=101 comm=nginx state=S ppid=1 utime=45 stime=15 rss=256',
        expected: 'STAT_AUDIT pid=101 comm=nginx state_label=SLEEPING total_ticks=60 mem_kb=1024',
        note: 'Processus en sommeil (S), total ticks = 45+15=60, mémoire = 256*4=1024 Ko.'
      }
    ],
    tests: [
      {
        label: 'Processus actif en cours d’exécution (R)',
        stdin: 'PROC_STAT pid=1250 comm=python3 state=R ppid=100 utime=320 stime=80 rss=1024',
        expected: 'STAT_AUDIT pid=1250 comm=python3 state_label=RUNNING total_ticks=400 mem_kb=4096'
      },
      {
        label: 'Processus zombie (Z) et attente disque ininterruptible (D)',
        stdin: 'PROC_STAT pid=440 comm=defunct_job state=Z ppid=1 utime=5 stime=1 rss=0\nPROC_STAT pid=880 comm=dd_backup state=D ppid=500 utime=120 stime=300 rss=512',
        expected: 'STAT_AUDIT pid=440 comm=defunct_job state_label=ZOMBIE total_ticks=6 mem_kb=0\nSTAT_AUDIT pid=880 comm=dd_backup state_label=UNINTERRUPTIBLE_DISK total_ticks=420 mem_kb=2048'
      },
      {
        label: 'Processus stoppé par signal SIGSTOP (T)',
        stdin: 'PROC_STAT pid=999 comm=debugger state=T ppid=200 utime=10 stime=2 rss=128',
        expected: 'STAT_AUDIT pid=999 comm=debugger state_label=STOPPED total_ticks=12 mem_kb=512'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

STATE_MAP = {
    'R': 'RUNNING',
    'S': 'SLEEPING',
    'D': 'UNINTERRUPTIBLE_DISK',
    'Z': 'ZOMBIE',
    'T': 'STOPPED'
}

for lig in lignes:
    if not lig.startswith('PROC_STAT'):
        continue
    tokens = lig.split()
    params = {}
    for tok in tokens[1:]:
        if '=' in tok:
            k, v = tok.split('=', 1)
            params[k] = v
            
    pid = params.get('pid', '0')
    comm = params.get('comm', 'unknown')
    raw_state = params.get('state', 'S')
    state_label = STATE_MAP.get(raw_state, 'UNKNOWN')
    
    utime = int(params.get('utime', 0))
    stime = int(params.get('stime', 0))
    rss = int(params.get('rss', 0))
    
    total_ticks = utime + stime
    mem_kb = rss * 4
    
    print(f"STAT_AUDIT pid={pid} comm={comm} state_label={state_label} total_ticks={total_ticks} mem_kb={mem_kb}")
`
  },
  {
    id: 'lx3-c1-e2',
    chapter: 1,
    title: 'Analyseur de cartographie de mémoire virtuelle (/proc/[pid]/maps)',
    level: 'n2',
    language: 'python',
    goal: 'Analyser les plages d’adresses de mémoire virtuelle et détecter les violations du principe de sécurité W^X (Write XOR Execute).',
    brief: `<p>Sous Linux, chaque processus dispose d'un espace d'adressage virtuel isolé divisé en segments (code, données, tas heap, pile stack, bibliothèques partagées mmap). Le fichier <code>/proc/[pid]/maps</code> détaille ces plages.<br><br>
Pour des raisons de sécurité (atténuation d'exploits de corruption de mémoire), le noyau moderne impose le principe <strong>W^X (Write XOR Execute)</strong> : une page de mémoire ne doit <strong>jamais être simultanément inscriptible (w) et exécutable (x)</strong>, car cela permet l'injection et l'exécution directe de shellcode.<br><br>
Le script lit sur l'entrée standard des descriptions au format :<br>
<code>VMMAP pid=&lt;id&gt; start=&lt;hex&gt; end=&lt;hex&gt; perms=&lt;rwxp&gt; pathname=&lt;nom&gt;</code>.<br><br>
Calculs :<br>
- <code>size_kb = (int(end, 16) - int(start, 16)) // 1024</code><br>
- Violation W^X : si <code>'w' in perms and 'x' in perms</code>, alors <code>wx_violation=OUI</code>, sinon <code>wx_violation=NON</code>.<br><br>
Pour chaque ligne, afficher :<br>
<code>MAP_AUDIT pid={pid} path={pathname} size_kb={size_kb} wx_violation={wx_violation}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : analyser les plages mémoire et vérifier W^X
`,
    hints: [
      'Convertir les adresses hexadécimales en entiers avec int(val, 16).',
      'Calculer la taille en octets puis diviser par 1024 pour obtenir les kilo-octets.',
      'Vérifier si les caractères "w" et "x" sont tous deux présents dans la chaîne perms.'
    ],
    examples: [
      {
        stdin: 'VMMAP pid=42 start=00400000 end=00450000 perms=r-xp pathname=/usr/bin/app',
        expected: 'MAP_AUDIT pid=42 path=/usr/bin/app size_kb=320 wx_violation=NON',
        note: 'Plage de code en lecture/exécution (r-xp), taille 0x50000 = 327680 octets = 320 Ko, aucune violation.'
      }
    ],
    tests: [
      {
        label: 'Segment de données non exécutable et pile sécurisée',
        stdin: 'VMMAP pid=10 start=00600000 end=00610000 perms=rw-p pathname=[heap]\nVMMAP pid=10 start=7fff0000 end=7fff2000 perms=rw-p pathname=[stack]',
        expected: 'MAP_AUDIT pid=10 path=[heap] size_kb=64 wx_violation=NON\nMAP_AUDIT pid=10 path=[stack] size_kb=8 wx_violation=NON'
      },
      {
        label: 'Détection d’une violation critique W^X (page RWX inscriptible et exécutable)',
        stdin: 'VMMAP pid=777 start=10000000 end=10004000 perms=rwxp pathname=[jit_buffer]',
        expected: 'MAP_AUDIT pid=777 path=[jit_buffer] size_kb=16 wx_violation=OUI'
      },
      {
        label: 'Bibliothèque partagée en lecture seule',
        stdin: 'VMMAP pid=500 start=7f800000 end=7fa00000 perms=r--p pathname=/lib/x86_64-linux-gnu/libc.so',
        expected: 'MAP_AUDIT pid=500 path=/lib/x86_64-linux-gnu/libc.so size_kb=2048 wx_violation=NON'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    if not lig.startswith('VMMAP'):
        continue
    tokens = lig.split()
    params = {}
    for tok in tokens[1:]:
        if '=' in tok:
            k, v = tok.split('=', 1)
            params[k] = v
            
    pid = params.get('pid', '0')
    start_hex = params.get('start', '0')
    end_hex = params.get('end', '0')
    perms = params.get('perms', '---p')
    pathname = params.get('pathname', '[anon]')
    
    start_int = int(start_hex, 16)
    end_int = int(end_hex, 16)
    size_kb = (end_int - start_int) // 1024
    
    wx_violation = 'OUI' if ('w' in perms and 'x' in perms) else 'NON'
    
    print(f"MAP_AUDIT pid={pid} path={pathname} size_kb={size_kb} wx_violation={wx_violation}")
`
  },
  {
    id: 'lx3-c1-e3',
    chapter: 1,
    title: 'Décodeur et profileur d’appels système (strace tracer)',
    level: 'n3',
    language: 'python',
    goal: 'Analyser les traces d’appels système (syscalls) pour isoler les erreurs d’I/O et profiler la latence noyau.',
    brief: `<p>L'utilitaire <code>strace</code> intercepte et enregistre les appels système (syscalls) effectués par un processus et les signaux reçus via l'API <code>ptrace(2)</code> du noyau Linux.<br><br>
Le script lit sur l'entrée standard des événements d'appels système au format :<br>
<code>SYSCALL pid=&lt;id&gt; name=&lt;nom&gt; args=&lt;arguments&gt; ret=&lt;valeur&gt; time_us=&lt;duree_microsecondes&gt;</code>.<br><br>
Règles d'analyse :<br>
1. Si <code>ret</code> commence par <code>-</code> ou est égal à une constante d'erreur POSIX (ex: <code>ENOENT</code>, <code>EACCES</code>, <code>EPERM</code>, <code>EBADF</code>), le statut est <code>ERROR</code> et l'erreur est consignée.<br>
2. Sinon, le statut est <code>SUCCESS</code> et le code d'erreur est <code>NONE</code>.<br>
3. Latence : si <code>int(time_us) &gt; 5000</code>, classer comme <code>SLOW=OUI</code>, sinon <code>SLOW=NON</code>.<br><br>
Pour chaque appel, afficher :<br>
<code>SYSCALL_PROFILE pid={pid} name={name} status={SUCCESS|ERROR} err={err} duration_us={time_us} slow={SLOW}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : profiler les appels système et détecter les erreurs
`,
    hints: [
      'Vérifier si le champ ret commence par "-" ou figure dans un ensemble d’erreurs POSIX.',
      'Convertir time_us en entier pour tester le seuil de 5000 microsecondes (5 ms).'
    ],
    examples: [
      {
        stdin: 'SYSCALL pid=101 name=openat args="AT_FDCWD,/etc/passwd,O_RDONLY" ret=3 time_us=45',
        expected: 'SYSCALL_PROFILE pid=101 name=openat status=SUCCESS err=NONE duration_us=45 slow=NON',
        note: 'Appel système réussi retournant le descripteur de fichier 3, durée 45 µs.'
      }
    ],
    tests: [
      {
        label: 'Erreur de fichier introuvable (ENOENT ou code négatif)',
        stdin: 'SYSCALL pid=101 name=openat args="AT_FDCWD,/tmp/missing.txt,O_RDONLY" ret=-ENOENT time_us=80\nSYSCALL pid=101 name=read args="3,buf,1024" ret=-1 time_us=12',
        expected: 'SYSCALL_PROFILE pid=101 name=openat status=ERROR err=-ENOENT duration_us=80 slow=NON\nSYSCALL_PROFILE pid=101 name=read status=ERROR err=-1 duration_us=12 slow=NON'
      },
      {
        label: 'Appel bloquant avec latence excessive (SLOW=OUI)',
        stdin: 'SYSCALL pid=202 name=epoll_wait args="4,events,64,-1" ret=1 time_us=12000',
        expected: 'SYSCALL_PROFILE pid=202 name=epoll_wait status=SUCCESS err=NONE duration_us=12000 slow=OUI'
      },
      {
        label: 'Refus de permission (EACCES)',
        stdin: 'SYSCALL pid=303 name=write args="1,data,512" ret=EACCES time_us=150',
        expected: 'SYSCALL_PROFILE pid=303 name=write status=ERROR err=EACCES duration_us=150 slow=NON'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

KNOWN_ERRORS = {'ENOENT', 'EACCES', 'EPERM', 'EBADF', 'EINVAL', 'ENOMEM', 'EAGAIN', 'EBUSY'}

for lig in lignes:
    if not lig.startswith('SYSCALL'):
        continue
    tokens = lig.split()
    params = {}
    for tok in tokens[1:]:
        if '=' in tok:
            k, v = tok.split('=', 1)
            params[k] = v.strip('"')
            
    pid = params.get('pid', '0')
    name = params.get('name', 'unknown')
    ret = params.get('ret', '0')
    time_us = int(params.get('time_us', 0))
    
    is_error = False
    err_code = 'NONE'
    
    if ret.startswith('-'):
        is_error = True
        err_code = ret
    elif ret in KNOWN_ERRORS:
        is_error = True
        err_code = ret
        
    status = 'ERROR' if is_error else 'SUCCESS'
    slow = 'OUI' if time_us > 5000 else 'NON'
    
    print(f"SYSCALL_PROFILE pid={pid} name={name} status={status} err={err_code} duration_us={time_us} slow={slow}")
`
  }
];
