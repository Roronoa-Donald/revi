/**
 * server/exercises/b3-virtualisation/chapitre1.js — Exercices du Chapitre 1
 * Chapitre 1 : Principes, Architectures & Hyperviseurs (Type 1 vs Type 2)
 */
'use strict';

module.exports = [
  {
    id: 'vrt3-c1-e1',
    chapter: 1,
    title: 'Calculateur de Ratio de Surallocation CPU (vCPU-to-pCPU Overcommitment)',
    level: 'n1',
    language: 'python',
    goal: 'Calculer le ratio de surallocation processeur d\'un hôte de virtualisation et qualifier le niveau de risque de contention CPU.',
    brief: `<p>En virtualisation de serveurs, les administrateurs allouent des processeurs virtuels (vCPUs) aux machines virtuelles en appliquant un ratio de surallocation (<em>CPU Overcommitment</em>) par rapport aux capacités physiques de l'hôte :<br><br>
1. <strong>Cœurs physiques réels (pCPUs)</strong> :<br>
<code>pcpu_cores = SOCKETS * CORES</code>.<br><br>
2. <strong>Processeurs logiques (Threads d'exécution)</strong> :<br>
Si Hyper-Threading (HT=1) est actif : <code>logical_cpus = pcpu_cores * 2</code>. Sinon (HT=0) : <code>logical_cpus = pcpu_cores</code>.<br><br>
3. <strong>Ratios de surallocation</strong> :<br>
- <code>ratio_cores = VCPUS / pcpu_cores</code><br>
- <code>ratio_threads = VCPUS / logical_cpus</code><br><br>
4. <strong>Qualification opérationnelle selon le ratio par thread (<code>ratio_threads</code>)</strong> :<br>
- <code>ratio_threads &le; 1.0</code> : <code>CONSERVATEUR</code> (aucun surcoût, latence minimale garantie).<br>
- <code>1.0 &lt; ratio_threads &le; 3.0</code> : <code>MODERE</code> (production standard équilibrée).<br>
- <code>3.0 &lt; ratio_threads &le; 5.0</code> : <code>AGRESSIF</code> (forte densité, surveillance du CPU Ready requise).<br>
- <code>ratio_threads &gt; 5.0</code> : <code>CRITIQUE</code> (saturation prévisible et contention CPU majeure).<br><br>
Format d'entrée (sur STDIN) :<br>
Lignes au format : <code>HOST=&lt;nom&gt; SOCKETS=&lt;nb&gt; CORES=&lt;nb&gt; HT=&lt;0|1&gt; VCPUS=&lt;nb&gt;</code>.<br><br>
Format de sortie :<br>
<code>HOST:&lt;nom&gt; | PCPUS:&lt;pcpu_cores&gt; | THREADS:&lt;logical_cpus&gt; | RATIO_CORE:&lt;ratio_cores:.2f&gt;:1 | RATIO_THREAD:&lt;ratio_threads:.2f&gt;:1 | STATUT:&lt;statut&gt;</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer les ratios de surallocation et qualifier le statut CPU
`,
    hints: [
      "Calculez le nombre de cœurs par sockets * cores, puis multipliez par 2 si HT=1.",
      "Formatez les ratios avec deux décimales suivies de ':1' (ex: 2.50:1)."
    ],
    examples: [
      {
        stdin: 'HOST=esxi-node01 SOCKETS=2 CORES=16 HT=1 VCPUS=64\nHOST=esxi-node02 SOCKETS=2 CORES=8 HT=0 VCPUS=72',
        expected: 'HOST:esxi-node01 | PCPUS:32 | THREADS:64 | RATIO_CORE:2.00:1 | RATIO_THREAD:1.00:1 | STATUT:CONSERVATEUR\nHOST:esxi-node02 | PCPUS:16 | THREADS:16 | RATIO_CORE:4.50:1 | RATIO_THREAD:4.50:1 | STATUT:AGRESSIF\n',
        note: 'Cas d\'un nœud bi-socket avec Hyper-Threading et d\'un nœud sans Hyper-Threading.'
      }
    ],
    tests: [
      {
        label: 'Cluster d\'infrastructures hétérogènes',
        stdin: 'HOST=hyperv-01 SOCKETS=4 CORES=12 HT=1 VCPUS=192\nHOST=kvm-lab SOCKETS=1 CORES=4 HT=1 VCPUS=48\nHOST=oracle-db SOCKETS=2 CORES=16 HT=1 VCPUS=24',
        expected: 'HOST:hyperv-01 | PCPUS:48 | THREADS:96 | RATIO_CORE:4.00:1 | RATIO_THREAD:2.00:1 | STATUT:MODERE\nHOST:kvm-lab | PCPUS:4 | THREADS:8 | RATIO_CORE:12.00:1 | RATIO_THREAD:6.00:1 | STATUT:CRITIQUE\nHOST:oracle-db | PCPUS:32 | THREADS:64 | RATIO_CORE:0.75:1 | RATIO_THREAD:0.38:1 | STATUT:CONSERVATEUR\n'
      },
      {
        label: 'Cas limites aux bornes des seuils',
        stdin: 'HOST=border-3 SOCKETS=1 CORES=10 HT=1 VCPUS=60\nHOST=border-5 SOCKETS=1 CORES=10 HT=1 VCPUS=100',
        expected: 'HOST:border-3 | PCPUS:10 | THREADS:20 | RATIO_CORE:6.00:1 | RATIO_THREAD:3.00:1 | STATUT:MODERE\nHOST:border-5 | PCPUS:10 | THREADS:20 | RATIO_CORE:10.00:1 | RATIO_THREAD:5.00:1 | STATUT:AGRESSIF\n'
      }
    ],
    solution: `import sys

for line in sys.stdin:
    line = line.strip()
    if not line:
        continue
    parts = dict(p.split("=", 1) for p in line.split())
    host = parts.get("HOST", "host")
    sockets = int(parts.get("SOCKETS", 1))
    cores = int(parts.get("CORES", 1))
    ht = int(parts.get("HT", 1))
    vcpus = int(parts.get("VCPUS", 1))

    pcpus = sockets * cores
    threads = pcpus * 2 if ht == 1 else pcpus

    ratio_core = vcpus / pcpus
    ratio_thread = vcpus / threads

    if ratio_thread <= 1.0:
        statut = "CONSERVATEUR"
    elif ratio_thread <= 3.0:
        statut = "MODERE"
    elif ratio_thread <= 5.0:
        statut = "AGRESSIF"
    else:
        statut = "CRITIQUE"

    print(f"HOST:{host} | PCPUS:{pcpus} | THREADS:{threads} | RATIO_CORE:{ratio_core:.2f}:1 | RATIO_THREAD:{ratio_thread:.2f}:1 | STATUT:{statut}")
`
  },
  {
    id: 'vrt3-c1-e2',
    chapter: 1,
    title: 'Estimateur de Mémoire Vive & Gestion des Mécanismes de Récupération (Ballooning, TPS, Swap)',
    level: 'n2',
    language: 'python',
    goal: 'Calculer la décomposition des mécanismes de réclamation mémoire (TPS, Ballooning, Compression, Swap) sous pression RAM.',
    brief: `<p>Lorsqu'un hyperviseur subit une contention mémoire, il active en cascade plusieurs mécanismes d'arbitrage :<br><br>
1. <strong>Transparent Page Sharing (TPS)</strong> : Déduplication des pages mémoire identiques.<br>
<code>ram_apres_tps = VMS_GB * (1.0 - TPS_PCT / 100.0)</code>.<br><br>
2. <strong>Déficit mémoire</strong> :<br>
<code>deficit = max(0.0, ram_apres_tps - RAM_GB)</code>.<br><br>
3. <strong>Memory Ballooning</strong> : Gonflage du pilote ballon dans l'OS invité, plafonné à la capacité disponible :<br>
<code>balloon_used = min(deficit, BALLOON_GB)</code>.<br>
Le restant à combler est : <code>remaining = deficit - balloon_used</code>.<br><br>
4. <strong>Memory Compression</strong> : Compression rapide dans un cache RAM d'au plus 50% du restant, plafonnée à 10% de la RAM physique de l'hôte :<br>
<code>compressed = min(remaining * 0.5, RAM_GB * 0.10)</code>.<br><br>
5. <strong>Hypervisor Swapping</strong> : Écriture sur disque (.vswp) du résidu non compressible :<br>
<code>swap = remaining - compressed</code>.<br><br>
6. <strong>Statut de santé mémoire</strong> :<br>
- Si <code>deficit == 0.0</code> : <code>NOMINAL</code><br>
- Si <code>deficit &gt; 0.0</code> et <code>swap == 0.0</code> : <code>BALLOONING</code><br>
- Si <code>swap &gt; 0.0</code> : <code>SATURATION_SWAP</code><br><br>
Format d'entrée (sur STDIN) :<br>
Lignes : <code>HOST=&lt;nom&gt; RAM_GB=&lt;nb&gt; VMS_GB=&lt;nb&gt; TPS_PCT=&lt;pct&gt; BALLOON_GB=&lt;nb&gt;</code>.<br><br>
Format de sortie :<br>
<code>HOST:&lt;nom&gt; | DEFICIT:&lt;deficit:.1f&gt;GB | BALLOON:&lt;balloon_used:.1f&gt;GB | COMPRESSED:&lt;compressed:.1f&gt;GB | SWAP:&lt;swap:.1f&gt;GB | STATUT:&lt;statut&gt;</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : implémenter la chaîne de réclamation mémoire TPS, Ballooning, Compression et Swap
`,
    hints: [
      "Appliquez le gain TPS avant d'évaluer si un déficit existe par rapport à RAM_GB.",
      "Le swap sur fichier .vswp n'intervient que si le ballooning et la compression sont dépassés."
    ],
    examples: [
      {
        stdin: 'HOST=srv-virt-01 RAM_GB=128 VMS_GB=160 TPS_PCT=10.0 BALLOON_GB=20\nHOST=srv-virt-02 RAM_GB=64 VMS_GB=100 TPS_PCT=5.0 BALLOON_GB=15',
        expected: 'HOST:srv-virt-01 | DEFICIT:16.0GB | BALLOON:16.0GB | COMPRESSED:0.0GB | SWAP:0.0GB | STATUT:BALLOONING\nHOST:srv-virt-02 | DEFICIT:31.0GB | BALLOON:15.0GB | COMPRESSED:6.4GB | SWAP:9.6GB | STATUT:SATURATION_SWAP\n',
        note: 'Cas nominal avec absorption totale par ballooning vs saturation nécessitant du swapping.'
      }
    ],
    tests: [
      {
        label: 'Scénario sans pression et scénario extrême',
        stdin: 'HOST=srv-green RAM_GB=256 VMS_GB=220 TPS_PCT=15.0 BALLOON_GB=32\nHOST=srv-overcommit RAM_GB=32 VMS_GB=80 TPS_PCT=10.0 BALLOON_GB=10',
        expected: 'HOST:srv-green | DEFICIT:0.0GB | BALLOON:0.0GB | COMPRESSED:0.0GB | SWAP:0.0GB | STATUT:NOMINAL\nHOST:srv-overcommit | DEFICIT:40.0GB | BALLOON:10.0GB | COMPRESSED:3.2GB | SWAP:26.8GB | STATUT:SATURATION_SWAP\n'
      },
      {
        label: 'Compression partielle et seuils mémoire',
        stdin: 'HOST=srv-mid RAM_GB=64 VMS_GB=80 TPS_PCT=10.0 BALLOON_GB=5',
        expected: 'HOST:srv-mid | DEFICIT:8.0GB | BALLOON:5.0GB | COMPRESSED:1.5GB | SWAP:1.5GB | STATUT:SATURATION_SWAP\n'
      }
    ],
    solution: `import sys

for line in sys.stdin:
    line = line.strip()
    if not line:
        continue
    parts = dict(p.split("=", 1) for p in line.split())
    host = parts.get("HOST", "host")
    ram_gb = float(parts.get("RAM_GB", 64))
    vms_gb = float(parts.get("VMS_GB", 64))
    tps_pct = float(parts.get("TPS_PCT", 0))
    balloon_gb = float(parts.get("BALLOON_GB", 0))

    ram_after_tps = vms_gb * (1.0 - tps_pct / 100.0)
    deficit = max(0.0, ram_after_tps - ram_gb)

    balloon_used = min(deficit, balloon_gb)
    remaining = deficit - balloon_used

    compressed = min(remaining * 0.5, ram_gb * 0.10)
    swap = remaining - compressed

    if deficit == 0.0:
        statut = "NOMINAL"
    elif swap == 0.0:
        statut = "BALLOONING"
    else:
        statut = "SATURATION_SWAP"

    print(f"HOST:{host} | DEFICIT:{deficit:.1f}GB | BALLOON:{balloon_used:.1f}GB | COMPRESSED:{compressed:.1f}GB | SWAP:{swap:.1f}GB | STATUT:{statut}")
`
  },
  {
    id: 'vrt3-c1-e3',
    chapter: 1,
    title: 'Comparateur de Performance I/O & Latence Hyperviseur (Type 1 vs Type 2 vs Conteneur)',
    level: 'n3',
    language: 'python',
    goal: 'Mesurer et qualifier l\'efficience de débit IOPS et l\'overhead de latence selon le type d\'architecture de virtualisation.',
    brief: `<p>L'évaluation des performances d'accès disques et réseau compare les métriques d'une solution de virtualisation à la référence physique (<em>Bare-Metal</em>) :<br><br>
1. <strong>Taux d'efficience IOPS (%)</strong> :<br>
<code>efficiency_pct = (VIRT_IOPS / BASE_IOPS) * 100.0</code>.<br><br>
2. <strong>Surcoût de latence (Overhead Latency en %)</strong> :<br>
<code>overhead_lat_pct = ((VIRT_LAT_US - BASE_LAT_US) / BASE_LAT_US) * 100.0</code>.<br><br>
3. <strong>Évaluation opérationnelle (EVAL)</strong> :<br>
- Si <code>efficiency_pct &ge; 95.0</code> et <code>overhead_lat_pct &le; 5.0</code> : <code>EXCELLENT</code>.<br>
- Si <code>efficiency_pct &ge; 85.0</code> et <code>overhead_lat_pct &le; 25.0</code> : <code>ACCEPTABLE</code>.<br>
- Sinon : <code>DEGRADE</code>.<br><br>
Format d'entrée (sur STDIN) :<br>
Lignes : <code>WORKLOAD=&lt;nom&gt; BASE_IOPS=&lt;n&gt; ARCH=&lt;TYPE_1|TYPE_2|CONTAINER&gt; VIRT_IOPS=&lt;n&gt; BASE_LAT_US=&lt;n&gt; VIRT_LAT_US=&lt;n&gt;</code>.<br><br>
Format de sortie :<br>
<code>WORKLOAD:&lt;nom&gt; | ARCH:&lt;arch&gt; | EFFICIENCY:&lt;efficiency_pct:.1f&gt;% | OVERHEAD_LAT:+&lt;overhead_lat_pct:.1f&gt;% | EVAL:&lt;eval&gt;</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer l'efficience IOPS et le surcoût de latence pour évaluer l'architecture
`,
    hints: [
      "Calculez l'accroissement relatif de latence par rapport à la base : ((virt - base) / base) * 100.0.",
      "Affichez le signe '+' explicitement devant la valeur d'overhead de latence."
    ],
    examples: [
      {
        stdin: 'WORKLOAD=db-oltp BASE_IOPS=100000 ARCH=TYPE_1 VIRT_IOPS=96000 BASE_LAT_US=200 VIRT_LAT_US=208\nWORKLOAD=web-nginx BASE_IOPS=50000 ARCH=CONTAINER VIRT_IOPS=49500 BASE_LAT_US=150 VIRT_LAT_US=153\nWORKLOAD=dev-lab BASE_IOPS=80000 ARCH=TYPE_2 VIRT_IOPS=62000 BASE_LAT_US=250 VIRT_LAT_US=350',
        expected: 'WORKLOAD:db-oltp | ARCH:TYPE_1 | EFFICIENCY:96.0% | OVERHEAD_LAT:+4.0% | EVAL:EXCELLENT\nWORKLOAD:web-nginx | ARCH:CONTAINER | EFFICIENCY:99.0% | OVERHEAD_LAT:+2.0% | EVAL:EXCELLENT\nWORKLOAD:dev-lab | ARCH:TYPE_2 | EFFICIENCY:77.5% | OVERHEAD_LAT:+40.0% | EVAL:DEGRADE\n',
        note: 'Comparatif d\'un hyperviseur bare-metal Type 1, d\'un conteneur et d\'un hyperviseur hébergé Type 2.'
      }
    ],
    tests: [
      {
        label: 'Zone de performance acceptable et dégradée',
        stdin: 'WORKLOAD=file-server BASE_IOPS=40000 ARCH=TYPE_1 VIRT_IOPS=36000 BASE_LAT_US=400 VIRT_LAT_US=480\nWORKLOAD=batch-etl BASE_IOPS=60000 ARCH=TYPE_2 VIRT_IOPS=45000 BASE_LAT_US=300 VIRT_LAT_US=420',
        expected: 'WORKLOAD:file-server | ARCH:TYPE_1 | EFFICIENCY:90.0% | OVERHEAD_LAT:+20.0% | EVAL:ACCEPTABLE\nWORKLOAD:batch-etl | ARCH:TYPE_2 | EFFICIENCY:75.0% | OVERHEAD_LAT:+40.0% | EVAL:DEGRADE\n'
      },
      {
        label: 'Conteneurs et latence quasi nulle',
        stdin: 'WORKLOAD=microservice BASE_IOPS=120000 ARCH=CONTAINER VIRT_IOPS=118000 BASE_LAT_US=100 VIRT_LAT_US=104',
        expected: 'WORKLOAD:microservice | ARCH:CONTAINER | EFFICIENCY:98.3% | OVERHEAD_LAT:+4.0% | EVAL:EXCELLENT\n'
      }
    ],
    solution: `import sys

for line in sys.stdin:
    line = line.strip()
    if not line:
        continue
    parts = dict(p.split("=", 1) for p in line.split())
    workload = parts.get("WORKLOAD", "bench")
    base_iops = float(parts.get("BASE_IOPS", 1))
    arch = parts.get("ARCH", "TYPE_1")
    virt_iops = float(parts.get("VIRT_IOPS", 1))
    base_lat = float(parts.get("BASE_LAT_US", 1))
    virt_lat = float(parts.get("VIRT_LAT_US", 1))

    efficiency = (virt_iops / base_iops) * 100.0
    overhead_lat = ((virt_lat - base_lat) / base_lat) * 100.0

    if efficiency >= 95.0 and overhead_lat <= 5.0:
        eval_res = "EXCELLENT"
    elif efficiency >= 85.0 and overhead_lat <= 25.0:
        eval_res = "ACCEPTABLE"
    else:
        eval_res = "DEGRADE"

    print(f"WORKLOAD:{workload} | ARCH:{arch} | EFFICIENCY:{efficiency:.1f}% | OVERHEAD_LAT:+{overhead_lat:.1f}% | EVAL:{eval_res}")
`
  }
];
