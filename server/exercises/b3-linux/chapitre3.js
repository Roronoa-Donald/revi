'use strict';

module.exports = [
  {
    "id": "lx3-c3-e1",
    "chapter": 3,
    "title": "Calculateur d’allocation LVM Physical Extents (PE) et dimensionnement VG",
    "level": "n1",
    "language": "shell",
    "goal": "Calculer l’allocation exacte d’extents physiques (PE) dans un groupe de volumes LVM.",
    "brief": "<p>Sous Linux, <strong>LVM (Logical Volume Manager)</strong> découpe les disques physiques (PV - Physical Volumes) en blocs de taille fixe appelés <strong>Physical Extents (PE)</strong> (généralement 4 Mo par défaut), qui sont ensuite alloués aux volumes logiques (LV - Logical Volumes).<br><br>\nLe script Bash lit les paramètres sur l’entrée standard (stdin).<br><br>\nFormules :<br>\n1. <code>total_pe = (total_pv_gb * 1024) // pe_size_mb</code>.<br>\n2. <code>needed_pe = (lv_target_gb * 1024 + pe_size_mb - 1) // pe_size_mb</code> (arrondi supérieur strict).<br>\n3. Évaluation :<br>\n- Si <code>needed_pe &le; total_pe</code> : <code>status=ALLOCATED pe_count={needed_pe} remaining_pe={total_pe - needed_pe}</code><br>\n- Sinon : <code>status=INSUFFICIENT_SPACE pe_count={needed_pe} deficit_pe={needed_pe - total_pe}</code><br><br>\nPour chaque ligne, afficher :<br>\n<code>LVM_AUDIT vg={vg} status={status} pe_used={pe_count} pe_free_or_deficit={valeur}</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (lx3-c3-e1) — Calculateur d’allocation LVM Physical Extents (PE) et dimensionnement VG\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\n# Écrivez votre traitement Bash ci-dessous (affichage attendu sur stdout)\n",
    "hints": [
      "Convertir les gigaoctets en mégaoctets en multipliant par 1024.",
      "Utiliser la division entière (A + B - 1) // B pour obtenir l’arrondi au plafond du nombre de PE.",
      "1. total_pe = total_pv_gb × 1024 divisé par pe_size_mb. 2. needed_pe = arrondi supérieur de lv_target_gb × 1024 / pe_size_mb. 3. Espace suffisant : ALLOCATED avec le restant, sinon INSUFFICIENT_SPACE avec le déficit."
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
    "solution": "#!/usr/bin/env bash\nset -eu\nexport LC_ALL=C\nawk '\nfunction read_fields(line, fields,    cursor, start, key, value, character, following) {\n  for (key in fields) delete fields[key]\n  cursor = 1\n  while (cursor <= length(line)) {\n    while (cursor <= length(line) && substr(line, cursor, 1) ~ /[[:space:]]/) cursor++\n    if (cursor > length(line)) break\n    start = cursor\n    while (cursor <= length(line) && substr(line, cursor, 1) !~ /[=[:space:]]/) cursor++\n    key = substr(line, start, cursor - start)\n    if (substr(line, cursor, 1) != \"=\") {\n      while (cursor <= length(line) && substr(line, cursor, 1) !~ /[[:space:]]/) cursor++\n      continue\n    }\n    cursor++\n    value = \"\"\n    if (substr(line, cursor, 1) == \"\\\"\") {\n      cursor++\n      while (cursor <= length(line)) {\n        character = substr(line, cursor++, 1)\n        if (character == \"\\\"\") break\n        following = substr(line, cursor, 1)\n        if (character == \"\\\\\" && (following == \"\\\"\" || following == \"\\\\\")) {\n          value = value following\n          cursor++\n        } else {\n          value = value character\n        }\n      }\n    } else {\n      start = cursor\n      while (cursor <= length(line) && substr(line, cursor, 1) !~ /[[:space:]]/) cursor++\n      value = substr(line, start, cursor - start)\n    }\n    fields[key] = value\n  }\n}\n\n$1 == \"LVM_REQ\" {\n  read_fields($0, fields)\n  size = fields[\"pe_size_mb\"] + 0\n  total = int(fields[\"total_pv_gb\"] * 1024 / size)\n  needed = int((fields[\"lv_target_gb\"] * 1024 + size - 1) / size)\n  status = needed <= total ? \"ALLOCATED\" : \"INSUFFICIENT_SPACE\"\n  difference = needed <= total ? total - needed : needed - total\n  printf \"LVM_AUDIT vg=%s status=%s pe_used=%.0f pe_free_or_deficit=%.0f\\n\", fields[\"vg\"], status, needed, difference\n}\n\n'\n",
    "takeaway": "Dans LVM, chaque Volume Logique consomme un nombre entier de Physical Extents alloués depuis le pool commun du Volume Group."
  },
  {
    "id": "lx3-c3-e2",
    "chapter": 3,
    "title": "Simulateur d’état et de résilience de grappe RAID mdadm",
    "level": "n2",
    "language": "shell",
    "goal": "Diagnostiquer la santé d’un volume RAID logiciel Linux (mdadm) et déclencher la reconstruction automatique avec disque spare.",
    "brief": "<p>Le sous-système <code>mdadm</code> sous Linux gère les grappes RAID logicielles (RAID 1 miroir, RAID 5 parité simple, RAID 6 double parité).<br><br>\nTolérance aux pannes :<br>\n- <code>RAID1</code> : tolère jusqu'à <code>(total - 1)</code> pannes. Dégradé si <code>failed &ge; 1</code> et <code>active &ge; 1</code> ; FAILED si <code>active == 0</code>.<br>\n- <code>RAID5</code> : tolère 1 panne. OPTIMAL si <code>failed == 0</code> ; DEGRADED si <code>failed == 1</code> ; FAILED si <code>failed &ge; 2</code>.<br>\n- <code>RAID6</code> : tolère 2 pannes. OPTIMAL si <code>failed == 0</code> ; DEGRADED si <code>1 &le; failed &le; 2</code> ; FAILED si <code>failed &ge; 3</code>.<br><br>\nActions :<br>\n- Si l'état est <code>DEGRADED</code> et que des disques de réserve sont disponibles (<code>spares &gt; 0</code>), l'action est <code>REBUILD_SPARE</code>.<br>\n- Si l'état est <code>DEGRADED</code> sans spare (<code>spares == 0</code>), l'action est <code>WARNING_NO_SPARE</code>.<br>\n- Si l'état est <code>FAILED</code>, l'action est <code>CRITICAL_DATA_LOSS</code>.<br>\n- Si l'état est <code>OPTIMAL</code>, l'action est <code>NONE</code>.<br><br>\nLe script Bash lit les paramètres sur l’entrée standard (stdin).<br><br>\nAfficher pour chaque grappe :<br>\n<code>RAID_DIAG dev={device} level={level} state={OPTIMAL|DEGRADED|FAILED} action={action}</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (lx3-c3-e2) — Simulateur d’état et de résilience de grappe RAID mdadm\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\n# Écrivez votre traitement Bash ci-dessous (affichage attendu sur stdout)\n",
    "hints": [
      "Calculer l’état de santé selon le niveau RAID et le nombre de disques défaillants (failed).",
      "Associer l’action adéquate selon la disponibilité des disques de rechange (spares).",
      "1. Déterminer OPTIMAL, DEGRADED ou FAILED selon le niveau RAID et les pannes. 2. DEGRADED avec spares : REBUILD_SPARE ; sans spares : WARNING_NO_SPARE. 3. FAILED : CRITICAL_DATA_LOSS ; OPTIMAL : NONE."
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
    "solution": "#!/usr/bin/env bash\nset -eu\nexport LC_ALL=C\nawk '\nfunction read_fields(line, fields,    cursor, start, key, value, character, following) {\n  for (key in fields) delete fields[key]\n  cursor = 1\n  while (cursor <= length(line)) {\n    while (cursor <= length(line) && substr(line, cursor, 1) ~ /[[:space:]]/) cursor++\n    if (cursor > length(line)) break\n    start = cursor\n    while (cursor <= length(line) && substr(line, cursor, 1) !~ /[=[:space:]]/) cursor++\n    key = substr(line, start, cursor - start)\n    if (substr(line, cursor, 1) != \"=\") {\n      while (cursor <= length(line) && substr(line, cursor, 1) !~ /[[:space:]]/) cursor++\n      continue\n    }\n    cursor++\n    value = \"\"\n    if (substr(line, cursor, 1) == \"\\\"\") {\n      cursor++\n      while (cursor <= length(line)) {\n        character = substr(line, cursor++, 1)\n        if (character == \"\\\"\") break\n        following = substr(line, cursor, 1)\n        if (character == \"\\\\\" && (following == \"\\\"\" || following == \"\\\\\")) {\n          value = value following\n          cursor++\n        } else {\n          value = value character\n        }\n      }\n    } else {\n      start = cursor\n      while (cursor <= length(line) && substr(line, cursor, 1) !~ /[[:space:]]/) cursor++\n      value = substr(line, start, cursor - start)\n    }\n    fields[key] = value\n  }\n}\n\n$1 == \"RAID_CONF\" {\n  read_fields($0, fields)\n  failed = fields[\"failed\"] + 0; active = fields[\"active\"] + 0\n  state = \"OPTIMAL\"\n  if (fields[\"level\"] == \"RAID1\") {\n    if (active == 0) state = \"FAILED\"\n    else if (failed > 0) state = \"DEGRADED\"\n  } else {\n    tolerance = fields[\"level\"] == \"RAID5\" ? 1 : 2\n    if (failed > tolerance) state = \"FAILED\"\n    else if (failed > 0) state = \"DEGRADED\"\n  }\n  action = \"NONE\"\n  if (state == \"FAILED\") action = \"CRITICAL_DATA_LOSS\"\n  else if (state == \"DEGRADED\") action = fields[\"spares\"] + 0 > 0 ? \"REBUILD_SPARE\" : \"WARNING_NO_SPARE\"\n  printf \"RAID_DIAG dev=%s level=%s state=%s action=%s\\n\", fields[\"device\"], fields[\"level\"], state, action\n}\n\n'\n",
    "takeaway": "Le niveau RAID mdadm détermine la tolérance aux pannes de disques et le basculement vers un disque de secours (hot spare)."
  },
  {
    "id": "lx3-c3-e3",
    "chapter": 3,
    "title": "Analyseur de table d’inodes et détection de saturation de système de fichiers",
    "level": "n3",
    "language": "shell",
    "goal": "Diagnostiquer la saturation de disques Linux en distinguant la pénurie d’espace bloc de l’épuisement d’inodes.",
    "brief": "<p>Un système de fichiers Linux (ext4, XFS) peut devenir en lecture seule ou refuser toute écriture pour deux raisons distinctes :<br>\n1. <strong>Saturation d’espace disque (Blocks Full)</strong> : les gigaoctets alloués sont pleins.<br>\n2. <strong>Épuisement de la table d’inodes (Inodes Exhaustion)</strong> : le nombre maximal d’entrées de métadonnées est atteint suite à la création massive de millions de micro-fichiers, alors même qu’il reste de l’espace libre en gigaoctets !<br><br>\nLe script Bash lit les paramètres sur l’entrée standard (stdin).<br><br>\nRègles :<br>\n- <code>block_pct = (blocks_used * 100) // blocks_total</code><br>\n- <code>inode_pct = (inodes_used * 100) // inodes_total</code><br>\nStatut :<br>\n- Si <code>inode_pct &ge; 90 and block_pct &lt; 60</code> : <code>status=ALERT diag=INODE_EXHAUSTION</code>.<br>\n- Si <code>block_pct &ge; 90 and inode_pct &lt; 90</code> : <code>status=ALERT diag=DISK_SPACE_FULL</code>.<br>\n- Si <code>block_pct &ge; 90 and inode_pct &ge; 90</code> : <code>status=CRITICAL diag=TOTAL_EXHAUSTION</code>.<br>\n- Sinon : <code>status=HEALTHY diag=NORMAL</code>.<br><br>\nAfficher pour chaque point de montage :<br>\n<code>FS_STATUS mount={mount} block_pct={b}% inode_pct={i}% status={status} diag={diag}</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (lx3-c3-e3) — Analyseur de table d’inodes et détection de saturation de système de fichiers\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\n# Écrivez votre traitement Bash ci-dessous (affichage attendu sur stdout)\n",
    "hints": [
      "Calculer les pourcentages avec la division entière ou un arrondi entier.",
      "Vérifier les conditions d’épuisement asymétrique d’inodes (fréquent avec les sessions PHP ou spools mail).",
      "1. Calculer block_pct et inode_pct en division entière. 2. Inodes ≥ 90% et blocs < 60% : INODE_EXHAUSTION. 3. Blocs ≥ 90% et inodes < 90% : DISK_SPACE_FULL. 4. Les deux ≥ 90% : TOTAL_EXHAUSTION ; sinon HEALTHY."
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
    "solution": "#!/usr/bin/env bash\nset -eu\nexport LC_ALL=C\nawk '\nfunction read_fields(line, fields,    cursor, start, key, value, character, following) {\n  for (key in fields) delete fields[key]\n  cursor = 1\n  while (cursor <= length(line)) {\n    while (cursor <= length(line) && substr(line, cursor, 1) ~ /[[:space:]]/) cursor++\n    if (cursor > length(line)) break\n    start = cursor\n    while (cursor <= length(line) && substr(line, cursor, 1) !~ /[=[:space:]]/) cursor++\n    key = substr(line, start, cursor - start)\n    if (substr(line, cursor, 1) != \"=\") {\n      while (cursor <= length(line) && substr(line, cursor, 1) !~ /[[:space:]]/) cursor++\n      continue\n    }\n    cursor++\n    value = \"\"\n    if (substr(line, cursor, 1) == \"\\\"\") {\n      cursor++\n      while (cursor <= length(line)) {\n        character = substr(line, cursor++, 1)\n        if (character == \"\\\"\") break\n        following = substr(line, cursor, 1)\n        if (character == \"\\\\\" && (following == \"\\\"\" || following == \"\\\\\")) {\n          value = value following\n          cursor++\n        } else {\n          value = value character\n        }\n      }\n    } else {\n      start = cursor\n      while (cursor <= length(line) && substr(line, cursor, 1) !~ /[[:space:]]/) cursor++\n      value = substr(line, start, cursor - start)\n    }\n    fields[key] = value\n  }\n}\n\n$1 == \"FS_METRICS\" {\n  read_fields($0, fields)\n  blocks = int(fields[\"blocks_used\"] * 100 / fields[\"blocks_total\"])\n  inodes = int(fields[\"inodes_used\"] * 100 / fields[\"inodes_total\"])\n  status = \"HEALTHY\"; diagnosis = \"NORMAL\"\n  if (blocks >= 90 && inodes >= 90) { status = \"CRITICAL\"; diagnosis = \"TOTAL_EXHAUSTION\" }\n  else if (inodes >= 90 && blocks < 60) { status = \"ALERT\"; diagnosis = \"INODE_EXHAUSTION\" }\n  else if (blocks >= 90 && inodes < 90) { status = \"ALERT\"; diagnosis = \"DISK_SPACE_FULL\" }\n  printf \"FS_STATUS mount=%s block_pct=%.0f%% inode_pct=%.0f%% status=%s diag=%s\\n\", fields[\"mount\"], blocks, inodes, status, diagnosis\n}\n\n'\n",
    "takeaway": "Un système de fichiers peut saturer sa table d’inodes à cause de millions de petits fichiers même si l’espace en blocs reste libre."
  }
];
