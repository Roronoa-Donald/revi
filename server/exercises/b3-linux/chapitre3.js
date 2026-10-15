/**
 * Exercices Chapitre 3 — Linux Avancé B3.
 * Gestion Avancée du Stockage : LVM, RAID Logiciel (mdadm) & Systèmes de Fichiers.
 */
'use strict';

module.exports = [
  {
    id: 'lx3-c3-e1',
    chapter: 3,
    title: 'Calculateur d’allocation LVM Physical Extents (PE) et dimensionnement VG',
    level: 'n1',
    language: 'python',
    goal: 'Calculer l’allocation exacte d’extents physiques (PE) dans un groupe de volumes LVM.',
    brief: `<p>Sous Linux, <strong>LVM (Logical Volume Manager)</strong> découpe les disques physiques (PV - Physical Volumes) en blocs de taille fixe appelés <strong>Physical Extents (PE)</strong> (généralement 4 Mo par défaut), qui sont ensuite alloués aux volumes logiques (LV - Logical Volumes).<br><br>
Le script lit sur l'entrée standard des requêtes d'allocation au format :<br>
<code>LVM_REQ vg=&lt;nom&gt; pe_size_mb=&lt;taille&gt; total_pv_gb=&lt;taille_pv&gt; lv_target_gb=&lt;taille_lv&gt;</code>.<br><br>
Formules :<br>
1. <code>total_pe = (total_pv_gb * 1024) // pe_size_mb</code>.<br>
2. <code>needed_pe = (lv_target_gb * 1024 + pe_size_mb - 1) // pe_size_mb</code> (arrondi supérieur strict).<br>
3. Évaluation :<br>
- Si <code>needed_pe &le; total_pe</code> : <code>status=ALLOCATED pe_count={needed_pe} remaining_pe={total_pe - needed_pe}</code><br>
- Sinon : <code>status=INSUFFICIENT_SPACE pe_count={needed_pe} deficit_pe={needed_pe - total_pe}</code><br><br>
Pour chaque ligne, afficher :<br>
<code>LVM_AUDIT vg={vg} status={status} pe_used={pe_count} pe_free_or_deficit={valeur}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer les allocations d'extents LVM
`,
    hints: [
      'Convertir les gigaoctets en mégaoctets en multipliant par 1024.',
      'Utiliser la division entière (A + B - 1) // B pour obtenir l’arrondi au plafond du nombre de PE.'
    ],
    examples: [
      {
        stdin: 'LVM_REQ vg=vg_data pe_size_mb=4 total_pv_gb=100 lv_target_gb=20',
        expected: 'LVM_AUDIT vg=vg_data status=ALLOCATED pe_used=5120 pe_free_or_deficit=20480',
        note: '100 Go = 25600 PE de 4 Mo. Pour 20 Go = 5120 PE requis. Reste 20480 PE libres.'
      }
    ],
    tests: [
      {
        label: 'Capacité insuffisante dans le Volume Group',
        stdin: 'LVM_REQ vg=vg_backup pe_size_mb=8 total_pv_gb=50 lv_target_gb=60',
        expected: 'LVM_AUDIT vg=vg_backup status=INSUFFICIENT_SPACE pe_used=7680 pe_free_or_deficit=1280'
      },
      {
        label: 'Allocation exacte sans reste (100% utilisé)',
        stdin: 'LVM_REQ vg=vg_system pe_size_mb=16 total_pv_gb=16 lv_target_gb=16',
        expected: 'LVM_AUDIT vg=vg_system status=ALLOCATED pe_used=1024 pe_free_or_deficit=0'
      },
      {
        label: 'Extents de taille personnalisée (32 Mo)',
        stdin: 'LVM_REQ vg=vg_vm pe_size_mb=32 total_pv_gb=200 lv_target_gb=50',
        expected: 'LVM_AUDIT vg=vg_vm status=ALLOCATED pe_used=1600 pe_free_or_deficit=4800'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    if not lig.startswith('LVM_REQ'):
        continue
    tokens = lig.split()
    params = {}
    for tok in tokens[1:]:
        if '=' in tok:
            k, v = tok.split('=', 1)
            params[k] = v
            
    vg = params.get('vg', 'vg')
    pe_size = int(params.get('pe_size_mb', 4))
    pv_gb = int(params.get('total_pv_gb', 0))
    lv_gb = int(params.get('lv_target_gb', 0))
    
    total_pe = (pv_gb * 1024) // pe_size
    needed_pe = (lv_gb * 1024 + pe_size - 1) // pe_size
    
    if needed_pe <= total_pe:
        status = 'ALLOCATED'
        diff = total_pe - needed_pe
    else:
        status = 'INSUFFICIENT_SPACE'
        diff = needed_pe - total_pe
        
    print(f"LVM_AUDIT vg={vg} status={status} pe_used={needed_pe} pe_free_or_deficit={diff}")
`
  },
  {
    id: 'lx3-c3-e2',
    chapter: 3,
    title: 'Simulateur d’état et de résilience de grappe RAID mdadm',
    level: 'n2',
    language: 'python',
    goal: 'Diagnostiquer la santé d’un volume RAID logiciel Linux (mdadm) et déclencher la reconstruction automatique avec disque spare.',
    brief: `<p>Le sous-système <code>mdadm</code> sous Linux gère les grappes RAID logicielles (RAID 1 miroir, RAID 5 parité simple, RAID 6 double parité).<br><br>
Tolérance aux pannes :<br>
- <code>RAID1</code> : tolère jusqu'à <code>(total - 1)</code> pannes. Dégradé si <code>failed &ge; 1</code> et <code>active &ge; 1</code> ; FAILED si <code>active == 0</code>.<br>
- <code>RAID5</code> : tolère 1 panne. OPTIMAL si <code>failed == 0</code> ; DEGRADED si <code>failed == 1</code> ; FAILED si <code>failed &ge; 2</code>.<br>
- <code>RAID6</code> : tolère 2 pannes. OPTIMAL si <code>failed == 0</code> ; DEGRADED si <code>1 &le; failed &le; 2</code> ; FAILED si <code>failed &ge; 3</code>.<br><br>
Actions :<br>
- Si l'état est <code>DEGRADED</code> et que des disques de réserve sont disponibles (<code>spares &gt; 0</code>), l'action est <code>REBUILD_SPARE</code>.<br>
- Si l'état est <code>DEGRADED</code> sans spare (<code>spares == 0</code>), l'action est <code>WARNING_NO_SPARE</code>.<br>
- Si l'état est <code>FAILED</code>, l'action est <code>CRITICAL_DATA_LOSS</code>.<br>
- Si l'état est <code>OPTIMAL</code>, l'action est <code>NONE</code>.<br><br>
Le script lit sur l'entrée standard des états au format :<br>
<code>RAID_CONF device=&lt;mdX&gt; level=&lt;RAID1|RAID5|RAID6&gt; total=&lt;t&gt; active=&lt;a&gt; failed=&lt;f&gt; spares=&lt;s&gt;</code>.<br><br>
Afficher pour chaque grappe :<br>
<code>RAID_DIAG dev={device} level={level} state={OPTIMAL|DEGRADED|FAILED} action={action}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : analyser l'état de la grappe RAID mdadm
`,
    hints: [
      'Calculer l’état de santé selon le niveau RAID et le nombre de disques défaillants (failed).',
      'Associer l’action adéquate selon la disponibilité des disques de rechange (spares).'
    ],
    examples: [
      {
        stdin: 'RAID_CONF device=md0 level=RAID5 total=4 active=3 failed=1 spares=1',
        expected: 'RAID_DIAG dev=md0 level=RAID5 state=DEGRADED action=REBUILD_SPARE',
        note: 'RAID 5 avec un disque en panne mais un spare disponible : état dégradé et reconstruction déclenchée.'
      }
    ],
    tests: [
      {
        label: 'RAID 5 optimal et RAID 5 en panne irréversible (2 disques HS)',
        stdin: 'RAID_CONF device=md1 level=RAID5 total=3 active=3 failed=0 spares=0\nRAID_CONF device=md2 level=RAID5 total=4 active=2 failed=2 spares=0',
        expected: 'RAID_DIAG dev=md1 level=RAID5 state=OPTIMAL action=NONE\nRAID_DIAG dev=md2 level=RAID5 state=FAILED action=CRITICAL_DATA_LOSS'
      },
      {
        label: 'RAID 6 avec double panne et tolérance active',
        stdin: 'RAID_CONF device=md3 level=RAID6 total=6 active=4 failed=2 spares=0',
        expected: 'RAID_DIAG dev=md3 level=RAID6 state=DEGRADED action=WARNING_NO_SPARE'
      },
      {
        label: 'RAID 1 miroir avec perte d’un disque et remplacement',
        stdin: 'RAID_CONF device=md4 level=RAID1 total=2 active=1 failed=1 spares=1',
        expected: 'RAID_DIAG dev=md4 level=RAID1 state=DEGRADED action=REBUILD_SPARE'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    if not lig.startswith('RAID_CONF'):
        continue
    tokens = lig.split()
    params = {}
    for tok in tokens[1:]:
        if '=' in tok:
            k, v = tok.split('=', 1)
            params[k] = v
            
    dev = params.get('device', 'md0')
    level = params.get('level', 'RAID5')
    total = int(params.get('total', 3))
    active = int(params.get('active', 3))
    failed = int(params.get('failed', 0))
    spares = int(params.get('spares', 0))
    
    state = 'OPTIMAL'
    if level == 'RAID1':
        if active == 0:
            state = 'FAILED'
        elif failed >= 1:
            state = 'DEGRADED'
    elif level == 'RAID5':
        if failed >= 2:
            state = 'FAILED'
        elif failed == 1:
            state = 'DEGRADED'
    elif level == 'RAID6':
        if failed >= 3:
            state = 'FAILED'
        elif failed >= 1:
            state = 'DEGRADED'
            
    if state == 'FAILED':
        action = 'CRITICAL_DATA_LOSS'
    elif state == 'DEGRADED':
        action = 'REBUILD_SPARE' if spares > 0 else 'WARNING_NO_SPARE'
    else:
        action = 'NONE'
        
    print(f"RAID_DIAG dev={dev} level={level} state={state} action={action}")
`
  },
  {
    id: 'lx3-c3-e3',
    chapter: 3,
    title: 'Analyseur de table d’inodes et détection de saturation de système de fichiers',
    level: 'n3',
    language: 'python',
    goal: 'Diagnostiquer la saturation de disques Linux en distinguant la pénurie d’espace bloc de l’épuisement d’inodes.',
    brief: `<p>Un système de fichiers Linux (ext4, XFS) peut devenir en lecture seule ou refuser toute écriture pour deux raisons distinctes :<br>
1. <strong>Saturation d’espace disque (Blocks Full)</strong> : les gigaoctets alloués sont pleins.<br>
2. <strong>Épuisement de la table d’inodes (Inodes Exhaustion)</strong> : le nombre maximal d’entrées de métadonnées est atteint suite à la création massive de millions de micro-fichiers, alors même qu’il reste de l’espace libre en gigaoctets !<br><br>
Le script lit sur l'entrée standard des métriques au format :<br>
<code>FS_METRICS mount=&lt;point&gt; blocks_total=&lt;bt&gt; blocks_used=&lt;bu&gt; inodes_total=&lt;it&gt; inodes_used=&lt;iu&gt;</code>.<br><br>
Règles :<br>
- <code>block_pct = (blocks_used * 100) // blocks_total</code><br>
- <code>inode_pct = (inodes_used * 100) // inodes_total</code><br>
Statut :<br>
- Si <code>inode_pct &ge; 90 and block_pct &lt; 60</code> : <code>status=ALERT diag=INODE_EXHAUSTION</code>.<br>
- Si <code>block_pct &ge; 90 and inode_pct &lt; 90</code> : <code>status=ALERT diag=DISK_SPACE_FULL</code>.<br>
- Si <code>block_pct &ge; 90 and inode_pct &ge; 90</code> : <code>status=CRITICAL diag=TOTAL_EXHAUSTION</code>.<br>
- Sinon : <code>status=HEALTHY diag=NORMAL</code>.<br><br>
Afficher pour chaque point de montage :<br>
<code>FS_STATUS mount={mount} block_pct={b}% inode_pct={i}% status={status} diag={diag}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : analyser l'utilisation des blocs et des inodes
`,
    hints: [
      'Calculer les pourcentages avec la division entière ou un arrondi entier.',
      'Vérifier les conditions d’épuisement asymétrique d’inodes (fréquent avec les sessions PHP ou spools mail).'
    ],
    examples: [
      {
        stdin: 'FS_METRICS mount=/var/spool blocks_total=10000 blocks_used=2000 inodes_total=50000 inodes_used=48000',
        expected: 'FS_STATUS mount=/var/spool block_pct=20% inode_pct=96% status=ALERT diag=INODE_EXHAUSTION',
        note: 'Seulement 20% d’espace disque utilisé mais 96% des inodes saturés.'
      }
    ],
    tests: [
      {
        label: 'Système de fichiers sain et disque plein standard',
        stdin: 'FS_METRICS mount=/ blocks_total=20000 blocks_used=8000 inodes_total=100000 inodes_used=30000\nFS_METRICS mount=/data blocks_total=50000 blocks_used=46000 inodes_total=100000 inodes_used=20000',
        expected: 'FS_STATUS mount=/ block_pct=40% inode_pct=30% status=HEALTHY diag=NORMAL\nFS_STATUS mount=/data block_pct=92% inode_pct=20% status=ALERT diag=DISK_SPACE_FULL'
      },
      {
        label: 'Saturation totale blocs et inodes simultanée',
        stdin: 'FS_METRICS mount=/var/log blocks_total=10000 blocks_used=9500 inodes_total=50000 inodes_used=47000',
        expected: 'FS_STATUS mount=/var/log block_pct=95% inode_pct=94% status=CRITICAL diag=TOTAL_EXHAUSTION'
      },
      {
        label: 'Partition système quasiment vide',
        stdin: 'FS_METRICS mount=/boot blocks_total=1000 blocks_used=150 inodes_total=10000 inodes_used=500',
        expected: 'FS_STATUS mount=/boot block_pct=15% inode_pct=5% status=HEALTHY diag=NORMAL'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    if not lig.startswith('FS_METRICS'):
        continue
    tokens = lig.split()
    params = {}
    for tok in tokens[1:]:
        if '=' in tok:
            k, v = tok.split('=', 1)
            params[k] = v
            
    mount = params.get('mount', '/')
    bt = int(params.get('blocks_total', 1))
    bu = int(params.get('blocks_used', 0))
    it = int(params.get('inodes_total', 1))
    iu = int(params.get('inodes_used', 0))
    
    b_pct = (bu * 100) // bt
    i_pct = (iu * 100) // it
    
    if b_pct >= 90 and i_pct >= 90:
        status = 'CRITICAL'
        diag = 'TOTAL_EXHAUSTION'
    elif i_pct >= 90 and b_pct < 60:
        status = 'ALERT'
        diag = 'INODE_EXHAUSTION'
    elif b_pct >= 90:
        status = 'ALERT'
        diag = 'DISK_SPACE_FULL'
    else:
        status = 'HEALTHY'
        diag = 'NORMAL'
        
    print(f"FS_STATUS mount={mount} block_pct={b_pct}% inode_pct={i_pct}% status={status} diag={diag}")
`
  }
];
