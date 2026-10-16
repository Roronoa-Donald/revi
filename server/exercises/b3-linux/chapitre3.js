'use strict';

module.exports = [
  {
    "id": "lx3-c3-e1",
    "chapter": 3,
    "title": "Calculateur d’allocation LVM Physical Extents (PE) et dimensionnement VG",
    "level": "n1",
    "language": "analyse",
    "goal": "Calculer l’allocation exacte d’extents physiques (PE) dans un groupe de volumes LVM.",
    "brief": "<p>Sous Linux, <strong>LVM (Logical Volume Manager)</strong> découpe les disques physiques (PV - Physical Volumes) en blocs de taille fixe appelés <strong>Physical Extents (PE)</strong> (généralement 4 Mo par défaut), qui sont ensuite alloués aux volumes logiques (LV - Logical Volumes).<br><br>\nAnalysez les paramètres du problème pour chaque cas.<br><br>\nFormules :<br>\n1. <code>total_pe = (total_pv_gb * 1024) // pe_size_mb</code>.<br>\n2. <code>needed_pe = (lv_target_gb * 1024 + pe_size_mb - 1) // pe_size_mb</code> (arrondi supérieur strict).<br>\n3. Évaluation :<br>\n- Si <code>needed_pe &le; total_pe</code> : <code>status=ALLOCATED pe_count={needed_pe} remaining_pe={total_pe - needed_pe}</code><br>\n- Sinon : <code>status=INSUFFICIENT_SPACE pe_count={needed_pe} deficit_pe={needed_pe - total_pe}</code><br><br>\nPour chaque ligne, afficher :<br>\n<code>LVM_AUDIT vg={vg} status={status} pe_used={pe_count} pe_free_or_deficit={valeur}</code></p>",
    "starter": "# Grille d'analyse (lx3-c3-e1) — Calculateur d’allocation LVM Physical Extents (PE) et dimensionnement VG\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Capacité insuffisante dans le Volume Group]\n# Données : LVM_REQ vg=vg_backup pe_size_mb=8 total_pv_gb=50 lv_target_gb=60\nA_COMPLETER\n\n[Cas 2 — Allocation exacte sans reste (100% utilisé)]\n# Données : LVM_REQ vg=vg_system pe_size_mb=16 total_pv_gb=16 lv_target_gb=16\nA_COMPLETER\n\n[Cas 3 — Extents de taille personnalisée (32 Mo)]\n# Données : LVM_REQ vg=vg_vm pe_size_mb=32 total_pv_gb=200 lv_target_gb=50\nA_COMPLETER\n",
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
        "stdin": "cas:1",
        "expected": "LVM_AUDIT vg=vg_backup status=INSUFFICIENT_SPACE pe_used=7680 pe_free_or_deficit=1280"
      },
      {
        "label": "Allocation exacte sans reste (100% utilisé)",
        "stdin": "cas:2",
        "expected": "LVM_AUDIT vg=vg_system status=ALLOCATED pe_used=1024 pe_free_or_deficit=0"
      },
      {
        "label": "Extents de taille personnalisée (32 Mo)",
        "stdin": "cas:3",
        "expected": "LVM_AUDIT vg=vg_vm status=ALLOCATED pe_used=1600 pe_free_or_deficit=4800"
      }
    ],
    "solution": "[Exemple]\nLVM_AUDIT vg=vg_data status=ALLOCATED pe_used=5120 pe_free_or_deficit=20480\n\n[Cas 1 — Capacité insuffisante dans le Volume Group]\nLVM_AUDIT vg=vg_backup status=INSUFFICIENT_SPACE pe_used=7680 pe_free_or_deficit=1280\n\n[Cas 2 — Allocation exacte sans reste (100% utilisé)]\nLVM_AUDIT vg=vg_system status=ALLOCATED pe_used=1024 pe_free_or_deficit=0\n\n[Cas 3 — Extents de taille personnalisée (32 Mo)]\nLVM_AUDIT vg=vg_vm status=ALLOCATED pe_used=1600 pe_free_or_deficit=4800"
  },
  {
    "id": "lx3-c3-e2",
    "chapter": 3,
    "title": "Simulateur d’état et de résilience de grappe RAID mdadm",
    "level": "n2",
    "language": "analyse",
    "goal": "Diagnostiquer la santé d’un volume RAID logiciel Linux (mdadm) et déclencher la reconstruction automatique avec disque spare.",
    "brief": "<p>Le sous-système <code>mdadm</code> sous Linux gère les grappes RAID logicielles (RAID 1 miroir, RAID 5 parité simple, RAID 6 double parité).<br><br>\nTolérance aux pannes :<br>\n- <code>RAID1</code> : tolère jusqu'à <code>(total - 1)</code> pannes. Dégradé si <code>failed &ge; 1</code> et <code>active &ge; 1</code> ; FAILED si <code>active == 0</code>.<br>\n- <code>RAID5</code> : tolère 1 panne. OPTIMAL si <code>failed == 0</code> ; DEGRADED si <code>failed == 1</code> ; FAILED si <code>failed &ge; 2</code>.<br>\n- <code>RAID6</code> : tolère 2 pannes. OPTIMAL si <code>failed == 0</code> ; DEGRADED si <code>1 &le; failed &le; 2</code> ; FAILED si <code>failed &ge; 3</code>.<br><br>\nActions :<br>\n- Si l'état est <code>DEGRADED</code> et que des disques de réserve sont disponibles (<code>spares &gt; 0</code>), l'action est <code>REBUILD_SPARE</code>.<br>\n- Si l'état est <code>DEGRADED</code> sans spare (<code>spares == 0</code>), l'action est <code>WARNING_NO_SPARE</code>.<br>\n- Si l'état est <code>FAILED</code>, l'action est <code>CRITICAL_DATA_LOSS</code>.<br>\n- Si l'état est <code>OPTIMAL</code>, l'action est <code>NONE</code>.<br><br>\nAnalysez les paramètres du problème pour chaque cas.<br><br>\nAfficher pour chaque grappe :<br>\n<code>RAID_DIAG dev={device} level={level} state={OPTIMAL|DEGRADED|FAILED} action={action}</code></p>",
    "starter": "# Grille d'analyse (lx3-c3-e2) — Simulateur d’état et de résilience de grappe RAID mdadm\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — RAID 5 optimal et RAID 5 en panne irréversible (2 disques HS)]\n# Données : RAID_CONF device=md1 level=RAID5 total=3 active=3 failed=0 spares=0\n# Données : RAID_CONF device=md2 level=RAID5 total=4 active=2 failed=2 spares=0\nA_COMPLETER\n\n[Cas 2 — RAID 6 avec double panne et tolérance active]\n# Données : RAID_CONF device=md3 level=RAID6 total=6 active=4 failed=2 spares=0\nA_COMPLETER\n\n[Cas 3 — RAID 1 miroir avec perte d’un disque et remplacement]\n# Données : RAID_CONF device=md4 level=RAID1 total=2 active=1 failed=1 spares=1\nA_COMPLETER\n",
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
        "stdin": "cas:1",
        "expected": "RAID_DIAG dev=md1 level=RAID5 state=OPTIMAL action=NONE\nRAID_DIAG dev=md2 level=RAID5 state=FAILED action=CRITICAL_DATA_LOSS"
      },
      {
        "label": "RAID 6 avec double panne et tolérance active",
        "stdin": "cas:2",
        "expected": "RAID_DIAG dev=md3 level=RAID6 state=DEGRADED action=WARNING_NO_SPARE"
      },
      {
        "label": "RAID 1 miroir avec perte d’un disque et remplacement",
        "stdin": "cas:3",
        "expected": "RAID_DIAG dev=md4 level=RAID1 state=DEGRADED action=REBUILD_SPARE"
      }
    ],
    "solution": "[Exemple]\nRAID_DIAG dev=md0 level=RAID5 state=DEGRADED action=REBUILD_SPARE\n\n[Cas 1 — RAID 5 optimal et RAID 5 en panne irréversible (2 disques HS)]\nRAID_DIAG dev=md1 level=RAID5 state=OPTIMAL action=NONE\nRAID_DIAG dev=md2 level=RAID5 state=FAILED action=CRITICAL_DATA_LOSS\n\n[Cas 2 — RAID 6 avec double panne et tolérance active]\nRAID_DIAG dev=md3 level=RAID6 state=DEGRADED action=WARNING_NO_SPARE\n\n[Cas 3 — RAID 1 miroir avec perte d’un disque et remplacement]\nRAID_DIAG dev=md4 level=RAID1 state=DEGRADED action=REBUILD_SPARE"
  },
  {
    "id": "lx3-c3-e3",
    "chapter": 3,
    "title": "Analyseur de table d’inodes et détection de saturation de système de fichiers",
    "level": "n3",
    "language": "analyse",
    "goal": "Diagnostiquer la saturation de disques Linux en distinguant la pénurie d’espace bloc de l’épuisement d’inodes.",
    "brief": "<p>Un système de fichiers Linux (ext4, XFS) peut devenir en lecture seule ou refuser toute écriture pour deux raisons distinctes :<br>\n1. <strong>Saturation d’espace disque (Blocks Full)</strong> : les gigaoctets alloués sont pleins.<br>\n2. <strong>Épuisement de la table d’inodes (Inodes Exhaustion)</strong> : le nombre maximal d’entrées de métadonnées est atteint suite à la création massive de millions de micro-fichiers, alors même qu’il reste de l’espace libre en gigaoctets !<br><br>\nAnalysez les paramètres du problème pour chaque cas.<br><br>\nRègles :<br>\n- <code>block_pct = (blocks_used * 100) // blocks_total</code><br>\n- <code>inode_pct = (inodes_used * 100) // inodes_total</code><br>\nStatut :<br>\n- Si <code>inode_pct &ge; 90 and block_pct &lt; 60</code> : <code>status=ALERT diag=INODE_EXHAUSTION</code>.<br>\n- Si <code>block_pct &ge; 90 and inode_pct &lt; 90</code> : <code>status=ALERT diag=DISK_SPACE_FULL</code>.<br>\n- Si <code>block_pct &ge; 90 and inode_pct &ge; 90</code> : <code>status=CRITICAL diag=TOTAL_EXHAUSTION</code>.<br>\n- Sinon : <code>status=HEALTHY diag=NORMAL</code>.<br><br>\nAfficher pour chaque point de montage :<br>\n<code>FS_STATUS mount={mount} block_pct={b}% inode_pct={i}% status={status} diag={diag}</code></p>",
    "starter": "# Grille d'analyse (lx3-c3-e3) — Analyseur de table d’inodes et détection de saturation de système de fichiers\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Système de fichiers sain et disque plein standard]\n# Données : FS_METRICS mount=/ blocks_total=20000 blocks_used=8000 inodes_total=100000 inodes_used=30000\n# Données : FS_METRICS mount=/data blocks_total=50000 blocks_used=46000 inodes_total=100000 inodes_used=20000\nA_COMPLETER\n\n[Cas 2 — Saturation totale blocs et inodes simultanée]\n# Données : FS_METRICS mount=/var/log blocks_total=10000 blocks_used=9500 inodes_total=50000 inodes_used=47000\nA_COMPLETER\n\n[Cas 3 — Partition système quasiment vide]\n# Données : FS_METRICS mount=/boot blocks_total=1000 blocks_used=150 inodes_total=10000 inodes_used=500\nA_COMPLETER\n",
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
        "stdin": "cas:1",
        "expected": "FS_STATUS mount=/ block_pct=40% inode_pct=30% status=HEALTHY diag=NORMAL\nFS_STATUS mount=/data block_pct=92% inode_pct=20% status=ALERT diag=DISK_SPACE_FULL"
      },
      {
        "label": "Saturation totale blocs et inodes simultanée",
        "stdin": "cas:2",
        "expected": "FS_STATUS mount=/var/log block_pct=95% inode_pct=94% status=CRITICAL diag=TOTAL_EXHAUSTION"
      },
      {
        "label": "Partition système quasiment vide",
        "stdin": "cas:3",
        "expected": "FS_STATUS mount=/boot block_pct=15% inode_pct=5% status=HEALTHY diag=NORMAL"
      }
    ],
    "solution": "[Exemple]\nFS_STATUS mount=/var/spool block_pct=20% inode_pct=96% status=ALERT diag=INODE_EXHAUSTION\n\n[Cas 1 — Système de fichiers sain et disque plein standard]\nFS_STATUS mount=/ block_pct=40% inode_pct=30% status=HEALTHY diag=NORMAL\nFS_STATUS mount=/data block_pct=92% inode_pct=20% status=ALERT diag=DISK_SPACE_FULL\n\n[Cas 2 — Saturation totale blocs et inodes simultanée]\nFS_STATUS mount=/var/log block_pct=95% inode_pct=94% status=CRITICAL diag=TOTAL_EXHAUSTION\n\n[Cas 3 — Partition système quasiment vide]\nFS_STATUS mount=/boot block_pct=15% inode_pct=5% status=HEALTHY diag=NORMAL"
  }
];
