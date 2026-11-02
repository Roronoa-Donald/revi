'use strict';

function bashSolution(program) {
  return String.raw`#!/usr/bin/env bash
set -eu
export LC_ALL=C
awk '
function read_fields(line, fields,    cursor, start, key, value, character, following) {
  for (key in fields) delete fields[key]
  cursor = 1
  while (cursor <= length(line)) {
    while (cursor <= length(line) && substr(line, cursor, 1) ~ /[[:space:]]/) cursor++
    if (cursor > length(line)) break
    start = cursor
    while (cursor <= length(line) && substr(line, cursor, 1) !~ /[=[:space:]]/) cursor++
    key = substr(line, start, cursor - start)
    if (substr(line, cursor, 1) != "=") {
      while (cursor <= length(line) && substr(line, cursor, 1) !~ /[[:space:]]/) cursor++
      continue
    }
    cursor++
    value = ""
    if (substr(line, cursor, 1) == "\"") {
      cursor++
      while (cursor <= length(line)) {
        character = substr(line, cursor++, 1)
        if (character == "\"") break
        following = substr(line, cursor, 1)
        if (character == "\\" && (following == "\"" || following == "\\")) {
          value = value following
          cursor++
        } else {
          value = value character
        }
      }
    } else {
      start = cursor
      while (cursor <= length(line) && substr(line, cursor, 1) !~ /[[:space:]]/) cursor++
      value = substr(line, start, cursor - start)
    }
    fields[key] = value
  }
}
${program}
'
`;
}

const LIN3_SOLUTIONS = {
  'lx3-c1-e1': bashSolution(String.raw`
BEGIN {
  labels["R"] = "RUNNING"; labels["S"] = "SLEEPING"
  labels["D"] = "UNINTERRUPTIBLE_DISK"; labels["Z"] = "ZOMBIE"; labels["T"] = "STOPPED"
}
$1 == "PROC_STAT" {
  read_fields($0, fields)
  printf "STAT_AUDIT pid=%s comm=%s state_label=%s total_ticks=%.0f mem_kb=%.0f\n", fields["pid"], fields["comm"], labels[fields["state"]], fields["utime"] + fields["stime"], fields["rss"] * 4
}
`),
  'lx3-c1-e2': bashSolution(String.raw`
function hex_value(character) {
  return index("0123456789abcdef", tolower(character)) - 1
}
function decimal_times_sixteen(decimal, digit,    result, carry, position, value) {
  result = ""
  carry = digit
  for (position = length(decimal); position > 0; position--) {
    value = (substr(decimal, position, 1) + 0) * 16 + carry
    result = (value % 10) result
    carry = int(value / 10)
  }
  while (carry > 0) {
    result = (carry % 10) result
    carry = int(carry / 10)
  }
  sub(/^0+/, "", result)
  return result == "" ? "0" : result
}
function range_kib(start, end,    width, position, right, left, value, borrow, difference, remainder, quotient, result) {
  sub(/^0[xX]/, "", start); sub(/^0[xX]/, "", end)
  width = length(start) > length(end) ? length(start) : length(end)
  difference = ""; borrow = 0
  for (position = 0; position < width; position++) {
    right = length(end) - position > 0 ? hex_value(substr(end, length(end) - position, 1)) : 0
    left = length(start) - position > 0 ? hex_value(substr(start, length(start) - position, 1)) : 0
    value = right - left - borrow
    borrow = value < 0
    if (borrow) value += 16
    difference = substr("0123456789abcdef", value + 1, 1) difference
  }
  result = "0"; remainder = 0
  for (position = 1; position <= width; position++) {
    remainder = remainder * 16 + hex_value(substr(difference, position, 1))
    quotient = int(remainder / 1024)
    remainder %= 1024
    result = decimal_times_sixteen(result, quotient)
  }
  return result
}
$1 == "VMMAP" {
  read_fields($0, fields)
  violation = index(fields["perms"], "w") && index(fields["perms"], "x") ? "OUI" : "NON"
  printf "MAP_AUDIT pid=%s path=%s size_kb=%s wx_violation=%s\n", fields["pid"], fields["pathname"], range_kib(fields["start"], fields["end"]), violation
}
`),
  'lx3-c1-e3': bashSolution(String.raw`
$1 == "SYSCALL" {
  read_fields($0, fields)
  failed = fields["ret"] ~ /^-/ || fields["ret"] ~ /^E[A-Z0-9_]+$/
  status = failed ? "ERROR" : "SUCCESS"
  error = failed ? fields["ret"] : "NONE"
  slow = fields["time_us"] + 0 > 5000 ? "OUI" : "NON"
  printf "SYSCALL_PROFILE pid=%s name=%s status=%s err=%s duration_us=%s slow=%s\n", fields["pid"], fields["name"], status, error, fields["time_us"], slow
}
`),
  'lx3-c2-e1': bashSolution(String.raw`
$1 == "SERVICE_DEF" {
  read_fields($0, fields)
  error = "OK"
  if (fields["desc"] == "" || fields["desc"] == "NONE") error = "DESCRIPTION_MANQUANTE"
  else if (substr(fields["exec_start"], 1, 1) != "/") error = "EXECSTART_RELATIF"
  else if (fields["wanted_by"] == "" || fields["wanted_by"] == "NONE") error = "WANTEDBY_MANQUANT"
  valid = error == "OK" ? "OUI" : "NON"
  printf "SERVICE_VALIDATION name=%s valid=%s error=%s\n", fields["name"], valid, error
}
`),
  'lx3-c2-e2': bashSolution(String.raw`
$1 == "UNIT_DEP" {
  read_fields($0, fields)
  order[++count] = fields["name"]
  dependency[fields["name"]] = fields["requires"]
}
END {
  for (position = 1; position <= count; position++) {
    name = order[position]; target = dependency[name]
    reason = "OK"; cycle = "NON"
    if (target != "NONE" && target == name) { reason = "AUTO_DEPENDANCE"; cycle = "OUI" }
    else if (target != "NONE" && dependency[target] == name) { reason = "CYCLE_DIRECT"; cycle = "OUI" }
    printf "DEP_CHECK unit=%s cycle=%s reason=%s\n", name, cycle, reason
  }
}
`),
  'lx3-c2-e3': bashSolution(String.raw`
BEGIN {
  labels[0] = "EMERGENCY"; labels[1] = "ALERT"; labels[2] = "CRITICAL"; labels[3] = "ERROR"
  labels[4] = "WARNING"; labels[5] = "NOTICE"; labels[6] = "INFO"; labels[7] = "DEBUG"
}
$1 == "JOURNAL" {
  read_fields($0, fields)
  priority = fields["priority"] + 0
  alert = priority <= 3 ? "OUI" : "NON"
  printf "JOURNAL_AUDIT id=%s unit=%s level=%s alert=%s\n", fields["id"], fields["unit"], labels[priority], alert
}
`),
  'lx3-c3-e1': bashSolution(String.raw`
$1 == "LVM_REQ" {
  read_fields($0, fields)
  size = fields["pe_size_mb"] + 0
  total = int(fields["total_pv_gb"] * 1024 / size)
  needed = int((fields["lv_target_gb"] * 1024 + size - 1) / size)
  status = needed <= total ? "ALLOCATED" : "INSUFFICIENT_SPACE"
  difference = needed <= total ? total - needed : needed - total
  printf "LVM_AUDIT vg=%s status=%s pe_used=%.0f pe_free_or_deficit=%.0f\n", fields["vg"], status, needed, difference
}
`),
  'lx3-c3-e2': bashSolution(String.raw`
$1 == "RAID_CONF" {
  read_fields($0, fields)
  failed = fields["failed"] + 0; active = fields["active"] + 0
  state = "OPTIMAL"
  if (fields["level"] == "RAID1") {
    if (active == 0) state = "FAILED"
    else if (failed > 0) state = "DEGRADED"
  } else {
    tolerance = fields["level"] == "RAID5" ? 1 : 2
    if (failed > tolerance) state = "FAILED"
    else if (failed > 0) state = "DEGRADED"
  }
  action = "NONE"
  if (state == "FAILED") action = "CRITICAL_DATA_LOSS"
  else if (state == "DEGRADED") action = fields["spares"] + 0 > 0 ? "REBUILD_SPARE" : "WARNING_NO_SPARE"
  printf "RAID_DIAG dev=%s level=%s state=%s action=%s\n", fields["device"], fields["level"], state, action
}
`),
  'lx3-c3-e3': bashSolution(String.raw`
$1 == "FS_METRICS" {
  read_fields($0, fields)
  blocks = int(fields["blocks_used"] * 100 / fields["blocks_total"])
  inodes = int(fields["inodes_used"] * 100 / fields["inodes_total"])
  status = "HEALTHY"; diagnosis = "NORMAL"
  if (blocks >= 90 && inodes >= 90) { status = "CRITICAL"; diagnosis = "TOTAL_EXHAUSTION" }
  else if (inodes >= 90 && blocks < 60) { status = "ALERT"; diagnosis = "INODE_EXHAUSTION" }
  else if (blocks >= 90 && inodes < 90) { status = "ALERT"; diagnosis = "DISK_SPACE_FULL" }
  printf "FS_STATUS mount=%s block_pct=%.0f%% inode_pct=%.0f%% status=%s diag=%s\n", fields["mount"], blocks, inodes, status, diagnosis
}
`),
  'lx3-c4-e1': bashSolution(String.raw`
$1 == "NS_CHECK" {
  read_fields($0, fields)
  count = (fields["ns_pid"] + 0 != fields["host_pid"] + 0) + (fields["ns_net"] + 0 != fields["host_net"] + 0) + (fields["ns_mnt"] + 0 != fields["host_mnt"] + 0)
  isolated = count > 0 ? "OUI" : "NON"
  printf "NS_STATUS pid=%s isolated=%s isolated_count=%d\n", fields["pid"], isolated, count
}
`),
  'lx3-c4-e2': bashSolution(String.raw`
$1 == "CGROUP" {
  read_fields($0, fields)
  if (fields["cpu_quota"] == "max") cores = "UNLIMITED"
  else {
    tenths = int((fields["cpu_quota"] * 10 + fields["cpu_period"] / 2) / fields["cpu_period"])
    cores = sprintf("%.0f.%d", int(tenths / 10), tenths % 10)
  }
  memory = fields["mem_curr_mb"] + 0 >= fields["mem_max_mb"] + 0 ? "SATURATED" : "OK"
  printf "CGROUP_AUDIT group=%s cpu_cores=%s mem_status=%s\n", fields["group"], cores, memory
}
`),
  'lx3-c4-e3': bashSolution(String.raw`
$1 == "OOM_PROC" {
  read_fields($0, fields)
  adjustment = fields["oom_score_adj"] + 0
  if (adjustment == -1000) { score = "IMMUNE"; risk = "NONE" }
  else {
    score = fields["mem_mb"] + adjustment
    risk = score > 1000 ? "HIGH" : "LOW"
  }
  printf "OOM_TARGET pid=%s comm=%s score=%s risk=%s\n", fields["pid"], fields["comm"], score, risk
}
`),
  'lx3-c5-e1': bashSolution(String.raw`
$1 == "NET_IFACE" {
  read_fields($0, fields)
  error = "OK"
  if (fields["state"] != "UP") error = "INTERFACE_DOWN"
  else if (fields["type"] == "bridge" && fields["master"] != "NONE") error = "BRIDGE_CANNOT_HAVE_MASTER"
  else if (fields["type"] == "veth" && fields["master"] == "NONE" && fields["ip"] == "NONE") error = "VETH_UNATTACHED"
  valid = error == "OK" ? "OUI" : "NON"
  printf "NET_AUDIT iface=%s valid=%s error=%s\n", fields["name"], valid, error
}
`),
  'lx3-c5-e2': bashSolution(String.raw`
$1 == "RULE" {
  read_fields($0, fields)
  count++
  priority[count] = fields["prio"] + 0
  source[count] = fields["src"]; port[count] = fields["dport"]; table[count] = fields["table"]
}
$1 == "PACKET" {
  read_fields($0, fields)
  best = 0
  for (position = 1; position <= count; position++) {
    if ((source[position] == "ANY" || source[position] == fields["src"]) && (port[position] == "ANY" || port[position] == fields["dport"]) && (best == 0 || priority[position] < priority[best])) best = position
  }
  matched = best ? priority[best] : "NONE"
  selected = best ? table[best] : "NONE"
  printf "ROUTE_MATCH packet=%s matched_prio=%s table=%s\n", fields["id"], matched, selected
}
`),
  'lx3-c5-e3': bashSolution(String.raw`
$1 == "CONF_NSSWITCH" {
  read_fields($0, fields)
  count = split(fields["order"], sources, ",")
}
$1 == "QUERY_HOST" {
  read_fields($0, fields)
  resolved = "NONE"; status = "NOT_FOUND"
  for (position = 1; position <= count; position++) {
    source = sources[position]
    if (fields["in_" source] == "OUI") { resolved = source; status = "SUCCESS"; break }
  }
  printf "RESOLV_RESULT host=%s resolved_by=%s status=%s\n", fields["name"], resolved, status
}
`),
  'lx3-c6-e1': bashSolution(String.raw`
$1 == "SYSCTL_CHECK" {
  read_fields($0, fields)
  status = ("value:" fields["current"] == "value:" fields["recommended"]) ? "COMPLIANT" : "HARDENING_REQUIRED"
  printf "SYSCTL_AUDIT key=%s current=%s target=%s status=%s\n", fields["key"], fields["current"], fields["recommended"], status
}
`),
  'lx3-c6-e2': bashSolution(String.raw`
$1 == "PAM_STEP" && !stopped {
  read_fields($0, fields)
  control = fields["control"]; result = fields["res"]; action = "CONTINUE"
  if (control == "required" && result == "FAIL") failed = 1
  if (control == "requisite" && result == "FAIL") { failed = 1; stopped = 1; action = "ABORT_FAIL" }
  if (result == "SUCCESS") {
    succeeded = 1
    if (control == "sufficient" && !failed) { stopped = 1; action = "STOP_SUCCESS" }
  }
  printf "PAM_TRACE module=%s control=%s res=%s action=%s\n", fields["module"], control, result, action
}
END {
  decision = succeeded && !failed ? "GRANTED" : "DENIED"
  printf "PAM_FINAL decision=%s\n", decision
}
`),
  'lx3-c6-e3': bashSolution(String.raw`
$1 == "AUDIT_LOG" {
  read_fields($0, fields)
  uid = fields["uid"] + 0; euid = fields["euid"] + 0
  if (uid != 0 && euid == 0) alert = fields["res"] == "success" ? "CRITICAL_ROOT_ELEVATION" : "BLOCKED_PRIVILEGE_ATTEMPT"
  else if (uid == 0 && euid == 0) alert = "ROOT_NATIVE"
  else alert = "STANDARD_USER"
  printf "AUDIT_REPORT id=%s exe=%s uid=%s euid=%s alert=%s\n", fields["id"], fields["exe"], fields["uid"], fields["euid"], alert
}
`)
};

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
    "solution": LIN3_SOLUTIONS["lx3-c1-e1"]
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
    "solution": LIN3_SOLUTIONS["lx3-c1-e2"]
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
    "solution": LIN3_SOLUTIONS["lx3-c1-e3"]
  },
  {
    "id": "lx3-c2-e1",
    "chapter": 2,
    "title": "Validateur d’unité de service Systemd ([Unit], [Service], [Install])",
    "level": "n1",
    "language": "shell",
    "goal": "Vérifier la conformité syntaxique et la validité des directives d’un fichier de service Systemd.",
    "brief": "<p>Sous Linux, <strong>Systemd</strong> (PID 1) orchestre le démarrage des démons via des fichiers déclaratifs d'unités (<code>.service</code>) placés dans <code>/etc/systemd/system/</code> ou <code>/lib/systemd/system/</code>.<br><br>\nPour ce simulateur, contrôlez les champs dans cet ordre et affichez seulement la première erreur :<br>\n1. <code>Description</code> doit être renseignée (sinon <code>DESCRIPTION_MANQUANTE</code>).<br>\n2. <code>ExecStart</code> doit commencer par <code>/</code>, indiquant un chemin absolu (sinon <code>EXECSTART_RELATIF</code>).<br>\n3. <code>WantedBy</code> doit être renseigné (sinon <code>WANTEDBY_MANQUANT</code>).<br>\nDans les données de cet exercice, une valeur vide ou <code>NONE</code> représente un champ absent. Le simulateur ne vérifie ni l'existence du fichier exécutable ni celle de la cible, par exemple <code>multi-user.target</code>.<br><br>\nLe script Bash lit les paramètres sur l’entrée standard (stdin).<br><br>\nPour chaque service, afficher :<br>\n<code>SERVICE_VALIDATION name={name} valid={OUI|NON} error={OK|motif_erreur}</code></p>",
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
    "solution": LIN3_SOLUTIONS["lx3-c2-e1"]
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
    "solution": LIN3_SOLUTIONS["lx3-c2-e2"]
  },
  {
    "id": "lx3-c2-e3",
    "chapter": 2,
    "title": "Parseur et filtreur d’événements Systemd Journald",
    "level": "n3",
    "language": "shell",
    "goal": "Classer les journaux binaires Systemd Journald selon les priorités Syslog RFC 5424 et isoler les incidents critiques.",
    "brief": "<p>Le démon <code>systemd-journald</code> centralise les logs du noyau, des services et de l'espace utilisateur dans un format binaire structuré indexé.<br><br>\nLe script Bash lit sur l’entrée standard (stdin) zéro ou plusieurs lignes <code>JOURNAL id=&lt;id&gt; priority=&lt;0..7&gt; unit=&lt;service&gt; msg=&lt;message&gt;</code>.<br><br>\nÉchelle de sévérité Syslog (RFC 5424) :<br>\n- 0 : <code>EMERGENCY</code><br>\n- 1 : <code>ALERT</code><br>\n- 2 : <code>CRITICAL</code><br>\n- 3 : <code>ERROR</code><br>\n- 4 : <code>WARNING</code><br>\n- 5 : <code>NOTICE</code><br>\n- 6 : <code>INFO</code><br>\n- 7 : <code>DEBUG</code><br><br>\nCritère d'alerte : si <code>priority &le; 3</code>, l'événement est considéré comme critique (<code>SEVERITY_ALERT=OUI</code>), sinon (<code>SEVERITY_ALERT=NON</code>).<br><br>\nPour chaque log, afficher :<br>\n<code>JOURNAL_AUDIT id={id} unit={unit} level={LABEL} alert={SEVERITY_ALERT}</code></p>",
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
    "solution": LIN3_SOLUTIONS["lx3-c2-e3"]
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
        "stdin": "LVM_REQ vg=vg_backup pe_size_mb=8 total_pv_gb=50 lv_target_gb=60\nLVM_REQ vg=zero pe_size_mb=8 total_pv_gb=0 lv_target_gb=0",
        "expected": "LVM_AUDIT vg=vg_backup status=INSUFFICIENT_SPACE pe_used=7680 pe_free_or_deficit=1280\nLVM_AUDIT vg=zero status=ALLOCATED pe_used=0 pe_free_or_deficit=0"
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
      },
      {
        "label": "Arrondi supérieur, déficit d’un extent et égalité",
        "stdin": "LVM_REQ vg=thin pe_size_mb=3 total_pv_gb=1 lv_target_gb=1\nLVM_REQ vg=five pe_size_mb=5 total_pv_gb=2 lv_target_gb=1\nLVM_REQ vg=full pe_size_mb=4 total_pv_gb=2 lv_target_gb=2",
        "expected": "LVM_AUDIT vg=thin status=INSUFFICIENT_SPACE pe_used=342 pe_free_or_deficit=1\nLVM_AUDIT vg=five status=ALLOCATED pe_used=205 pe_free_or_deficit=204\nLVM_AUDIT vg=full status=ALLOCATED pe_used=512 pe_free_or_deficit=0"
      },
      {
        "label": "Allocation exacte avec taille de PE supérieure au LV",
        "stdin": "LVM_REQ vg=large_pe pe_size_mb=2048 total_pv_gb=2 lv_target_gb=1",
        "expected": "LVM_AUDIT vg=large_pe status=ALLOCATED pe_used=1 pe_free_or_deficit=0"
      }
    ],
    "solution": LIN3_SOLUTIONS["lx3-c3-e1"]
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
        "stdin": "RAID_CONF device=md1 level=RAID5 total=3 active=3 failed=0 spares=0\nRAID_CONF device=md2 level=RAID5 total=4 active=2 failed=2 spares=0\nRAID_CONF device=md10 level=RAID1 total=2 active=0 failed=2 spares=1",
        "expected": "RAID_DIAG dev=md1 level=RAID5 state=OPTIMAL action=NONE\nRAID_DIAG dev=md2 level=RAID5 state=FAILED action=CRITICAL_DATA_LOSS\nRAID_DIAG dev=md10 level=RAID1 state=FAILED action=CRITICAL_DATA_LOSS"
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
      },
      {
        "label": "Limites de tolérance RAID 1, 5 et 6",
        "stdin": "RAID_CONF device=md11 level=RAID5 total=4 active=3 failed=1 spares=0\nRAID_CONF device=md12 level=RAID6 total=6 active=4 failed=2 spares=1\nRAID_CONF device=md13 level=RAID6 total=6 active=3 failed=3 spares=0\nRAID_CONF device=md14 level=RAID1 total=3 active=3 failed=0 spares=0",
        "expected": "RAID_DIAG dev=md11 level=RAID5 state=DEGRADED action=WARNING_NO_SPARE\nRAID_DIAG dev=md12 level=RAID6 state=DEGRADED action=REBUILD_SPARE\nRAID_DIAG dev=md13 level=RAID6 state=FAILED action=CRITICAL_DATA_LOSS\nRAID_DIAG dev=md14 level=RAID1 state=OPTIMAL action=NONE"
      },
      {
        "label": "RAID5 à la limite avec réserve",
        "stdin": "RAID_CONF device=md21 level=RAID5 total=4 active=3 failed=1 spares=1",
        "expected": "RAID_DIAG dev=md21 level=RAID5 state=DEGRADED action=REBUILD_SPARE"
      },
      {
        "label": "RAID6 sous sa limite sans réserve",
        "stdin": "RAID_CONF device=md22 level=RAID6 total=6 active=5 failed=1 spares=0",
        "expected": "RAID_DIAG dev=md22 level=RAID6 state=DEGRADED action=WARNING_NO_SPARE"
      }
    ],
    "solution": LIN3_SOLUTIONS["lx3-c3-e2"]
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
        "stdin": "FS_METRICS mount=/ blocks_total=20000 blocks_used=8000 inodes_total=100000 inodes_used=30000\nFS_METRICS mount=/data blocks_total=50000 blocks_used=46000 inodes_total=100000 inodes_used=20000\nFS_METRICS mount=/middle blocks_total=100 blocks_used=60 inodes_total=100 inodes_used=90",
        "expected": "FS_STATUS mount=/ block_pct=40% inode_pct=30% status=HEALTHY diag=NORMAL\nFS_STATUS mount=/data block_pct=92% inode_pct=20% status=ALERT diag=DISK_SPACE_FULL\nFS_STATUS mount=/middle block_pct=60% inode_pct=90% status=HEALTHY diag=NORMAL"
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
      },
      {
        "label": "Voisins de 60 % et 90 %, avec division entière",
        "stdin": "FS_METRICS mount=/inode blocks_total=100 blocks_used=59 inodes_total=100 inodes_used=90\nFS_METRICS mount=/disk blocks_total=100 blocks_used=90 inodes_total=100 inodes_used=89\nFS_METRICS mount=/both blocks_total=100 blocks_used=90 inodes_total=100 inodes_used=90\nFS_METRICS mount=/floor blocks_total=1000 blocks_used=899 inodes_total=1000 inodes_used=899",
        "expected": "FS_STATUS mount=/inode block_pct=59% inode_pct=90% status=ALERT diag=INODE_EXHAUSTION\nFS_STATUS mount=/disk block_pct=90% inode_pct=89% status=ALERT diag=DISK_SPACE_FULL\nFS_STATUS mount=/both block_pct=90% inode_pct=90% status=CRITICAL diag=TOTAL_EXHAUSTION\nFS_STATUS mount=/floor block_pct=89% inode_pct=89% status=HEALTHY diag=NORMAL"
      }
    ],
    "solution": LIN3_SOLUTIONS["lx3-c3-e3"]
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
    "solution": LIN3_SOLUTIONS["lx3-c4-e1"]
  },
  {
    "id": "lx3-c4-e2",
    "chapter": 4,
    "title": "Contrôleur de quotas et limites de ressources Cgroups v2 (cpu.max & memory.max)",
    "level": "n2",
    "language": "shell",
    "goal": "Calculer la bande passante processeur autorisée et vérifier le plafonnement mémoire dans la hiérarchie Cgroups v2.",
    "brief": "<p><strong>Cgroups v2 (Control Groups)</strong> sous Linux unifie la gestion des ressources système dans <code>/sys/fs/cgroup/</code>.<br><br>\nDirectives Cgroups v2 :<br>\n- <code>cpu.max = &lt;quota&gt; &lt;period&gt;</code> : Si quota vaut <code>max</code>, la limite CPU est <code>UNLIMITED</code>. Sinon, le nombre de cœurs alloués équivalent vaut <code>quota / period</code> (ex: 200000 100000 &rarr; 2.0 cœurs). Dans cet exercice, le quota est positif ou nul, la période strictement positive, et le résultat est affiché avec une décimale ; à mi-chemin, arrondissez au dixième supérieur (1.25 &rarr; 1.3).<br>\n- <code>memory.max = &lt;limite_Mo&gt;</code> : Si la mémoire actuelle dépasse ou égale la limite, le groupe subit un étranglement ou risque l'OOM (<code>mem_status=SATURATED</code>), sinon <code>mem_status=OK</code>.<br><br>\nLe script Bash lit les paramètres sur l’entrée standard (stdin).<br><br>\nPour chaque groupe, afficher :<br>\n<code>CGROUP_AUDIT group={group} cpu_cores={val|UNLIMITED} mem_status={OK|SATURATED}</code></p>",
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
    "solution": LIN3_SOLUTIONS["lx3-c4-e2"]
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
    "solution": LIN3_SOLUTIONS["lx3-c4-e3"]
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
    "solution": LIN3_SOLUTIONS["lx3-c5-e1"]
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
    "solution": LIN3_SOLUTIONS["lx3-c5-e2"]
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
    "solution": LIN3_SOLUTIONS["lx3-c5-e3"]
  },
  {
    "id": "lx3-c6-e1",
    "chapter": 6,
    "title": "Auditeur de paramètres de durcissement du noyau (/etc/sysctl.conf)",
    "level": "n1",
    "language": "shell",
    "goal": "Vérifier la conformité des paramètres de sécurité du noyau Linux par rapport aux recommandations ANSSI / CIS Benchmark.",
    "brief": "<p>Le fichier <code>/etc/sysctl.conf</code> et l'interface <code>/proc/sys/</code> permettent d'ajuster dynamiquement les options de sécurité du noyau Linux (randomisation ASLR, restriction des pointeurs mémoire, protection des liens durs et protection contre les attaques SYN Flood).<br><br>\nLe script Bash lit les paramètres sur l’entrée standard (stdin).<br><br>\nRègles :<br>\n- Comparez <code>current</code> et <code>recommended</code> comme des chaînes, en respectant la casse et les zéros initiaux : <code>01</code> diffère de <code>1</code>.<br>\n- Si les deux chaînes sont identiques : <code>status=COMPLIANT</code>.<br>\n- Sinon : <code>status=HARDENING_REQUIRED</code>.<br><br>\nPour chaque paramètre, afficher :<br>\n<code>SYSCTL_AUDIT key={key} current={val} target={recommended} status={COMPLIANT|HARDENING_REQUIRED}</code></p>",
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
        "stdin": "SYSCTL_CHECK key=kernel.kptr_restrict current=0 recommended=2\nSYSCTL_CHECK key=net.ipv4.tcp_syncookies current=0 recommended=1\nSYSCTL_CHECK key=kernel.leading_zero current=01 recommended=1",
        "expected": "SYSCTL_AUDIT key=kernel.kptr_restrict current=0 target=2 status=HARDENING_REQUIRED\nSYSCTL_AUDIT key=net.ipv4.tcp_syncookies current=0 target=1 status=HARDENING_REQUIRED\nSYSCTL_AUDIT key=kernel.leading_zero current=01 target=1 status=HARDENING_REQUIRED"
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
      },
      {
        "label": "Égalité textuelle stricte et respect de la casse",
        "stdin": "SYSCTL_CHECK key=demo.case current=enabled recommended=ENABLED\nSYSCTL_CHECK key=demo.same current=enabled recommended=enabled\nSYSCTL_CHECK key=demo.zero current=0 recommended=00",
        "expected": "SYSCTL_AUDIT key=demo.case current=enabled target=ENABLED status=HARDENING_REQUIRED\nSYSCTL_AUDIT key=demo.same current=enabled target=enabled status=COMPLIANT\nSYSCTL_AUDIT key=demo.zero current=0 target=00 status=HARDENING_REQUIRED"
      },
      {
        "label": "Comparaison textuelle sensible à la casse",
        "stdin": "SYSCTL_CHECK key=demo.mode current=enabled recommended=ENABLED",
        "expected": "SYSCTL_AUDIT key=demo.mode current=enabled target=ENABLED status=HARDENING_REQUIRED"
      }
    ],
    "solution": LIN3_SOLUTIONS["lx3-c6-e1"]
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
        "stdin": "PAM_STEP module=pam_tally.so control=required res=FAIL\nPAM_STEP module=pam_unix.so control=required res=SUCCESS\nPAM_STEP module=pam_totp.so control=sufficient res=SUCCESS",
        "expected": "PAM_TRACE module=pam_tally.so control=required res=FAIL action=CONTINUE\nPAM_TRACE module=pam_unix.so control=required res=SUCCESS action=CONTINUE\nPAM_TRACE module=pam_totp.so control=sufficient res=SUCCESS action=CONTINUE\nPAM_FINAL decision=DENIED"
      },
      {
        "label": "Succès complet sur tous les modules required",
        "stdin": "PAM_STEP module=pam_env.so control=required res=SUCCESS\nPAM_STEP module=pam_unix.so control=required res=SUCCESS",
        "expected": "PAM_TRACE module=pam_env.so control=required res=SUCCESS action=CONTINUE\nPAM_TRACE module=pam_unix.so control=required res=SUCCESS action=CONTINUE\nPAM_FINAL decision=GRANTED"
      },
      {
        "label": "Aucun module suffisant ne réussit",
        "stdin": "PAM_STEP module=shadow.so control=sufficient res=FAIL\nPAM_STEP module=token.so control=sufficient res=FAIL",
        "expected": "PAM_TRACE module=shadow.so control=sufficient res=FAIL action=CONTINUE\nPAM_TRACE module=token.so control=sufficient res=FAIL action=CONTINUE\nPAM_FINAL decision=DENIED"
      }
    ],
    "solution": LIN3_SOLUTIONS["lx3-c6-e2"]
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
        "stdin": "AUDIT_LOG id=202 uid=1001 euid=0 exe=/usr/bin/su res=failed\nAUDIT_LOG id=203 uid=0 euid=0 exe=/usr/bin/tool res=failed",
        "expected": "AUDIT_REPORT id=202 exe=/usr/bin/su uid=1001 euid=0 alert=BLOCKED_PRIVILEGE_ATTEMPT\nAUDIT_REPORT id=203 exe=/usr/bin/tool uid=0 euid=0 alert=ROOT_NATIVE"
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
      },
      {
        "label": "Branches du modèle et comparaison des identifiants",
        "stdin": "AUDIT_LOG id=51 uid=1000 euid=0 exe=/usr/bin/sudo res=success\nAUDIT_LOG id=52 uid=1000 euid=0 exe=/usr/bin/su res=failed\nAUDIT_LOG id=53 uid=0 euid=0 exe=/usr/bin/id res=success\nAUDIT_LOG id=54 uid=0 euid=1000 exe=/usr/bin/id res=success",
        "expected": "AUDIT_REPORT id=51 exe=/usr/bin/sudo uid=1000 euid=0 alert=CRITICAL_ROOT_ELEVATION\nAUDIT_REPORT id=52 exe=/usr/bin/su uid=1000 euid=0 alert=BLOCKED_PRIVILEGE_ATTEMPT\nAUDIT_REPORT id=53 exe=/usr/bin/id uid=0 euid=0 alert=ROOT_NATIVE\nAUDIT_REPORT id=54 exe=/usr/bin/id uid=0 euid=1000 alert=STANDARD_USER"
      }
    ],
    "solution": LIN3_SOLUTIONS["lx3-c6-e3"]
  }
];

module.exports = LIN3_EXERCISES;
