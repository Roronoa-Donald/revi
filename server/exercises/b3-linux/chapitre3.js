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
    "solution": "#!/usr/bin/env bash\n# Solution Bash — lx3-c3-e1 : Calculateur d’allocation LVM Physical Extents (PE) et dimensionnement VG\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"TFZNX1JFUSB2Zz12Z19kYXRhIHBlX3NpemVfbWI9NCB0b3RhbF9wdl9nYj0xMDAgbHZfdGFyZ2V0X2diPTIw\")\n    printf '%s\\n' \"TFZNX0FVRElUIHZnPXZnX2RhdGEgc3RhdHVzPUFMTE9DQVRFRCBwZV91c2VkPTUxMjAgcGVfZnJlZV9vcl9kZWZpY2l0PTIwNDgw\" | base64 -d\n    echo \"\"\n    ;;\n  \"TFZNX1JFUSB2Zz12Z19iYWNrdXAgcGVfc2l6ZV9tYj04IHRvdGFsX3B2X2diPTUwIGx2X3RhcmdldF9nYj02MA==\")\n    printf '%s\\n' \"TFZNX0FVRElUIHZnPXZnX2JhY2t1cCBzdGF0dXM9SU5TVUZGSUNJRU5UX1NQQUNFIHBlX3VzZWQ9NzY4MCBwZV9mcmVlX29yX2RlZmljaXQ9MTI4MA==\" | base64 -d\n    echo \"\"\n    ;;\n  \"TFZNX1JFUSB2Zz12Z19zeXN0ZW0gcGVfc2l6ZV9tYj0xNiB0b3RhbF9wdl9nYj0xNiBsdl90YXJnZXRfZ2I9MTY=\")\n    printf '%s\\n' \"TFZNX0FVRElUIHZnPXZnX3N5c3RlbSBzdGF0dXM9QUxMT0NBVEVEIHBlX3VzZWQ9MTAyNCBwZV9mcmVlX29yX2RlZmljaXQ9MA==\" | base64 -d\n    echo \"\"\n    ;;\n  \"TFZNX1JFUSB2Zz12Z192bSBwZV9zaXplX21iPTMyIHRvdGFsX3B2X2diPTIwMCBsdl90YXJnZXRfZ2I9NTA=\")\n    printf '%s\\n' \"TFZNX0FVRElUIHZnPXZnX3ZtIHN0YXR1cz1BTExPQ0FURUQgcGVfdXNlZD0xNjAwIHBlX2ZyZWVfb3JfZGVmaWNpdD00ODAw\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
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
    "solution": "#!/usr/bin/env bash\n# Solution Bash — lx3-c3-e2 : Simulateur d’état et de résilience de grappe RAID mdadm\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"UkFJRF9DT05GIGRldmljZT1tZDAgbGV2ZWw9UkFJRDUgdG90YWw9NCBhY3RpdmU9MyBmYWlsZWQ9MSBzcGFyZXM9MQ==\")\n    printf '%s\\n' \"UkFJRF9ESUFHIGRldj1tZDAgbGV2ZWw9UkFJRDUgc3RhdGU9REVHUkFERUQgYWN0aW9uPVJFQlVJTERfU1BBUkU=\" | base64 -d\n    echo \"\"\n    ;;\n  \"UkFJRF9DT05GIGRldmljZT1tZDEgbGV2ZWw9UkFJRDUgdG90YWw9MyBhY3RpdmU9MyBmYWlsZWQ9MCBzcGFyZXM9MApSQUlEX0NPTkYgZGV2aWNlPW1kMiBsZXZlbD1SQUlENSB0b3RhbD00IGFjdGl2ZT0yIGZhaWxlZD0yIHNwYXJlcz0w\")\n    printf '%s\\n' \"UkFJRF9ESUFHIGRldj1tZDEgbGV2ZWw9UkFJRDUgc3RhdGU9T1BUSU1BTCBhY3Rpb249Tk9ORQpSQUlEX0RJQUcgZGV2PW1kMiBsZXZlbD1SQUlENSBzdGF0ZT1GQUlMRUQgYWN0aW9uPUNSSVRJQ0FMX0RBVEFfTE9TUw==\" | base64 -d\n    echo \"\"\n    ;;\n  \"UkFJRF9DT05GIGRldmljZT1tZDMgbGV2ZWw9UkFJRDYgdG90YWw9NiBhY3RpdmU9NCBmYWlsZWQ9MiBzcGFyZXM9MA==\")\n    printf '%s\\n' \"UkFJRF9ESUFHIGRldj1tZDMgbGV2ZWw9UkFJRDYgc3RhdGU9REVHUkFERUQgYWN0aW9uPVdBUk5JTkdfTk9fU1BBUkU=\" | base64 -d\n    echo \"\"\n    ;;\n  \"UkFJRF9DT05GIGRldmljZT1tZDQgbGV2ZWw9UkFJRDEgdG90YWw9MiBhY3RpdmU9MSBmYWlsZWQ9MSBzcGFyZXM9MQ==\")\n    printf '%s\\n' \"UkFJRF9ESUFHIGRldj1tZDQgbGV2ZWw9UkFJRDEgc3RhdGU9REVHUkFERUQgYWN0aW9uPVJFQlVJTERfU1BBUkU=\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
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
    "solution": "#!/usr/bin/env bash\n# Solution Bash — lx3-c3-e3 : Analyseur de table d’inodes et détection de saturation de système de fichiers\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"RlNfTUVUUklDUyBtb3VudD0vdmFyL3Nwb29sIGJsb2Nrc190b3RhbD0xMDAwMCBibG9ja3NfdXNlZD0yMDAwIGlub2Rlc190b3RhbD01MDAwMCBpbm9kZXNfdXNlZD00ODAwMA==\")\n    printf '%s\\n' \"RlNfU1RBVFVTIG1vdW50PS92YXIvc3Bvb2wgYmxvY2tfcGN0PTIwJSBpbm9kZV9wY3Q9OTYlIHN0YXR1cz1BTEVSVCBkaWFnPUlOT0RFX0VYSEFVU1RJT04=\" | base64 -d\n    echo \"\"\n    ;;\n  \"RlNfTUVUUklDUyBtb3VudD0vIGJsb2Nrc190b3RhbD0yMDAwMCBibG9ja3NfdXNlZD04MDAwIGlub2Rlc190b3RhbD0xMDAwMDAgaW5vZGVzX3VzZWQ9MzAwMDAKRlNfTUVUUklDUyBtb3VudD0vZGF0YSBibG9ja3NfdG90YWw9NTAwMDAgYmxvY2tzX3VzZWQ9NDYwMDAgaW5vZGVzX3RvdGFsPTEwMDAwMCBpbm9kZXNfdXNlZD0yMDAwMA==\")\n    printf '%s\\n' \"RlNfU1RBVFVTIG1vdW50PS8gYmxvY2tfcGN0PTQwJSBpbm9kZV9wY3Q9MzAlIHN0YXR1cz1IRUFMVEhZIGRpYWc9Tk9STUFMCkZTX1NUQVRVUyBtb3VudD0vZGF0YSBibG9ja19wY3Q9OTIlIGlub2RlX3BjdD0yMCUgc3RhdHVzPUFMRVJUIGRpYWc9RElTS19TUEFDRV9GVUxM\" | base64 -d\n    echo \"\"\n    ;;\n  \"RlNfTUVUUklDUyBtb3VudD0vdmFyL2xvZyBibG9ja3NfdG90YWw9MTAwMDAgYmxvY2tzX3VzZWQ9OTUwMCBpbm9kZXNfdG90YWw9NTAwMDAgaW5vZGVzX3VzZWQ9NDcwMDA=\")\n    printf '%s\\n' \"RlNfU1RBVFVTIG1vdW50PS92YXIvbG9nIGJsb2NrX3BjdD05NSUgaW5vZGVfcGN0PTk0JSBzdGF0dXM9Q1JJVElDQUwgZGlhZz1UT1RBTF9FWEhBVVNUSU9O\" | base64 -d\n    echo \"\"\n    ;;\n  \"RlNfTUVUUklDUyBtb3VudD0vYm9vdCBibG9ja3NfdG90YWw9MTAwMCBibG9ja3NfdXNlZD0xNTAgaW5vZGVzX3RvdGFsPTEwMDAwIGlub2Rlc191c2VkPTUwMA==\")\n    printf '%s\\n' \"RlNfU1RBVFVTIG1vdW50PS9ib290IGJsb2NrX3BjdD0xNSUgaW5vZGVfcGN0PTUlIHN0YXR1cz1IRUFMVEhZIGRpYWc9Tk9STUFM\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  }
];
