'use strict';

module.exports = [
  {
    "id": "vrt3-c1-e1",
    "chapter": 1,
    "title": "Calculateur de Ratio de Surallocation CPU (vCPU-to-pCPU Overcommitment)",
    "level": "n1",
    "language": "analyse",
    "goal": "Calculer le ratio de surallocation processeur d'un hôte de virtualisation et qualifier le niveau de risque de contention CPU.",
    "brief": "<p>En virtualisation de serveurs, les administrateurs allouent des processeurs virtuels (vCPUs) aux machines virtuelles en appliquant un ratio de surallocation (<em>CPU Overcommitment</em>) par rapport aux capacités physiques de l'hôte :<br><br>\n1. <strong>Cœurs physiques réels (pCPUs)</strong> :<br>\n<code>pcpu_cores = SOCKETS * CORES</code>.<br><br>\n2. <strong>Processeurs logiques (Threads d'exécution)</strong> :<br>\nSi Hyper-Threading (HT=1) est actif : <code>logical_cpus = pcpu_cores * 2</code>. Sinon (HT=0) : <code>logical_cpus = pcpu_cores</code>.<br><br>\n3. <strong>Ratios de surallocation</strong> :<br>\n- <code>ratio_cores = VCPUS / pcpu_cores</code><br>\n- <code>ratio_threads = VCPUS / logical_cpus</code><br><br>\n4. <strong>Qualification opérationnelle selon le ratio par thread (<code>ratio_threads</code>)</strong> :<br>\n- <code>ratio_threads &le; 1.0</code> : <code>CONSERVATEUR</code> (aucun surcoût, latence minimale garantie).<br>\n- <code>1.0 &lt; ratio_threads &le; 3.0</code> : <code>MODERE</code> (production standard équilibrée).<br>\n- <code>3.0 &lt; ratio_threads &le; 5.0</code> : <code>AGRESSIF</code> (forte densité, surveillance du CPU Ready requise).<br>\n- <code>ratio_threads &gt; 5.0</code> : <code>CRITIQUE</code> (saturation prévisible et contention CPU majeure).<br><br>\nFormat d'entrée (sur STDIN) :<br>\nLignes au format : <code>HOST=&lt;nom&gt; SOCKETS=&lt;nb&gt; CORES=&lt;nb&gt; HT=&lt;0|1&gt; VCPUS=&lt;nb&gt;</code>.<br><br>\nFormat de sortie :<br>\n<code>HOST:&lt;nom&gt; | PCPUS:&lt;pcpu_cores&gt; | THREADS:&lt;logical_cpus&gt; | RATIO_CORE:&lt;ratio_cores:.2f&gt;:1 | RATIO_THREAD:&lt;ratio_threads:.2f&gt;:1 | STATUT:&lt;statut&gt;</code></p>",
    "starter": "# Grille d'analyse (vrt3-c1-e1) — Calculateur de Ratio de Surallocation CPU (vCPU-to-pCPU Overcommitment)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Cluster d'infrastructures hétérogènes]\n# Données : HOST=hyperv-01 SOCKETS=4 CORES=12 HT=1 VCPUS=192\n# Données : HOST=kvm-lab SOCKETS=1 CORES=4 HT=1 VCPUS=48\n# Données : HOST=oracle-db SOCKETS=2 CORES=16 HT=1 VCPUS=24\nA_COMPLETER\n\n[Cas 2 — Cas limites aux bornes des seuils]\n# Données : HOST=border-3 SOCKETS=1 CORES=10 HT=1 VCPUS=60\n# Données : HOST=border-5 SOCKETS=1 CORES=10 HT=1 VCPUS=100\nA_COMPLETER\n",
    "hints": [
      "Calculez le nombre de cœurs par sockets * cores, puis multipliez par 2 si HT=1.",
      "Formatez les ratios avec deux décimales suivies de ':1' (ex: 2.50:1)."
    ],
    "examples": [
      {
        "stdin": "HOST=esxi-node01 SOCKETS=2 CORES=16 HT=1 VCPUS=64\nHOST=esxi-node02 SOCKETS=2 CORES=8 HT=0 VCPUS=72",
        "expected": "HOST:esxi-node01 | PCPUS:32 | THREADS:64 | RATIO_CORE:2.00:1 | RATIO_THREAD:1.00:1 | STATUT:CONSERVATEUR\nHOST:esxi-node02 | PCPUS:16 | THREADS:16 | RATIO_CORE:4.50:1 | RATIO_THREAD:4.50:1 | STATUT:AGRESSIF\n",
        "note": "Cas d'un nœud bi-socket avec Hyper-Threading et d'un nœud sans Hyper-Threading."
      }
    ],
    "tests": [
      {
        "label": "Cluster d'infrastructures hétérogènes",
        "stdin": "cas:1",
        "expected": "HOST:hyperv-01 | PCPUS:48 | THREADS:96 | RATIO_CORE:4.00:1 | RATIO_THREAD:2.00:1 | STATUT:MODERE\nHOST:kvm-lab | PCPUS:4 | THREADS:8 | RATIO_CORE:12.00:1 | RATIO_THREAD:6.00:1 | STATUT:CRITIQUE\nHOST:oracle-db | PCPUS:32 | THREADS:64 | RATIO_CORE:0.75:1 | RATIO_THREAD:0.38:1 | STATUT:CONSERVATEUR\n"
      },
      {
        "label": "Cas limites aux bornes des seuils",
        "stdin": "cas:2",
        "expected": "HOST:border-3 | PCPUS:10 | THREADS:20 | RATIO_CORE:6.00:1 | RATIO_THREAD:3.00:1 | STATUT:MODERE\nHOST:border-5 | PCPUS:10 | THREADS:20 | RATIO_CORE:10.00:1 | RATIO_THREAD:5.00:1 | STATUT:AGRESSIF\n"
      }
    ],
    "solution": "[Exemple]\nHOST:esxi-node01 | PCPUS:32 | THREADS:64 | RATIO_CORE:2.00:1 | RATIO_THREAD:1.00:1 | STATUT:CONSERVATEUR\nHOST:esxi-node02 | PCPUS:16 | THREADS:16 | RATIO_CORE:4.50:1 | RATIO_THREAD:4.50:1 | STATUT:AGRESSIF\n\n\n[Cas 1 — Cluster d'infrastructures hétérogènes]\nHOST:hyperv-01 | PCPUS:48 | THREADS:96 | RATIO_CORE:4.00:1 | RATIO_THREAD:2.00:1 | STATUT:MODERE\nHOST:kvm-lab | PCPUS:4 | THREADS:8 | RATIO_CORE:12.00:1 | RATIO_THREAD:6.00:1 | STATUT:CRITIQUE\nHOST:oracle-db | PCPUS:32 | THREADS:64 | RATIO_CORE:0.75:1 | RATIO_THREAD:0.38:1 | STATUT:CONSERVATEUR\n\n\n[Cas 2 — Cas limites aux bornes des seuils]\nHOST:border-3 | PCPUS:10 | THREADS:20 | RATIO_CORE:6.00:1 | RATIO_THREAD:3.00:1 | STATUT:MODERE\nHOST:border-5 | PCPUS:10 | THREADS:20 | RATIO_CORE:10.00:1 | RATIO_THREAD:5.00:1 | STATUT:AGRESSIF"
  },
  {
    "id": "vrt3-c1-e2",
    "chapter": 1,
    "title": "Estimateur de Mémoire Vive & Gestion des Mécanismes de Récupération (Ballooning, TPS, Swap)",
    "level": "n2",
    "language": "analyse",
    "goal": "Calculer la décomposition des mécanismes de réclamation mémoire (TPS, Ballooning, Compression, Swap) sous pression RAM.",
    "brief": "<p>Lorsqu'un hyperviseur subit une contention mémoire, il active en cascade plusieurs mécanismes d'arbitrage :<br><br>\n1. <strong>Transparent Page Sharing (TPS)</strong> : Déduplication des pages mémoire identiques.<br>\n<code>ram_apres_tps = VMS_GB * (1.0 - TPS_PCT / 100.0)</code>.<br><br>\n2. <strong>Déficit mémoire</strong> :<br>\n<code>deficit = max(0.0, ram_apres_tps - RAM_GB)</code>.<br><br>\n3. <strong>Memory Ballooning</strong> : Gonflage du pilote ballon dans l'OS invité, plafonné à la capacité disponible :<br>\n<code>balloon_used = min(deficit, BALLOON_GB)</code>.<br>\nLe restant à combler est : <code>remaining = deficit - balloon_used</code>.<br><br>\n4. <strong>Memory Compression</strong> : Compression rapide dans un cache RAM d'au plus 50% du restant, plafonnée à 10% de la RAM physique de l'hôte :<br>\n<code>compressed = min(remaining * 0.5, RAM_GB * 0.10)</code>.<br><br>\n5. <strong>Hypervisor Swapping</strong> : Écriture sur disque (.vswp) du résidu non compressible :<br>\n<code>swap = remaining - compressed</code>.<br><br>\n6. <strong>Statut de santé mémoire</strong> :<br>\n- Si <code>deficit == 0.0</code> : <code>NOMINAL</code><br>\n- Si <code>deficit &gt; 0.0</code> et <code>swap == 0.0</code> : <code>BALLOONING</code><br>\n- Si <code>swap &gt; 0.0</code> : <code>SATURATION_SWAP</code><br><br>\nFormat d'entrée (sur STDIN) :<br>\nLignes : <code>HOST=&lt;nom&gt; RAM_GB=&lt;nb&gt; VMS_GB=&lt;nb&gt; TPS_PCT=&lt;pct&gt; BALLOON_GB=&lt;nb&gt;</code>.<br><br>\nFormat de sortie :<br>\n<code>HOST:&lt;nom&gt; | DEFICIT:&lt;deficit:.1f&gt;GB | BALLOON:&lt;balloon_used:.1f&gt;GB | COMPRESSED:&lt;compressed:.1f&gt;GB | SWAP:&lt;swap:.1f&gt;GB | STATUT:&lt;statut&gt;</code></p>",
    "starter": "# Grille d'analyse (vrt3-c1-e2) — Estimateur de Mémoire Vive & Gestion des Mécanismes de Récupération (Ballooning, TPS, Swap)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Scénario sans pression et scénario extrême]\n# Données : HOST=srv-green RAM_GB=256 VMS_GB=220 TPS_PCT=15.0 BALLOON_GB=32\n# Données : HOST=srv-overcommit RAM_GB=32 VMS_GB=80 TPS_PCT=10.0 BALLOON_GB=10\nA_COMPLETER\n\n[Cas 2 — Compression partielle et seuils mémoire]\n# Données : HOST=srv-mid RAM_GB=64 VMS_GB=80 TPS_PCT=10.0 BALLOON_GB=5\nA_COMPLETER\n",
    "hints": [
      "Appliquez le gain TPS avant d'évaluer si un déficit existe par rapport à RAM_GB.",
      "Le swap sur fichier .vswp n'intervient que si le ballooning et la compression sont dépassés."
    ],
    "examples": [
      {
        "stdin": "HOST=srv-virt-01 RAM_GB=128 VMS_GB=160 TPS_PCT=10.0 BALLOON_GB=20\nHOST=srv-virt-02 RAM_GB=64 VMS_GB=100 TPS_PCT=5.0 BALLOON_GB=15",
        "expected": "HOST:srv-virt-01 | DEFICIT:16.0GB | BALLOON:16.0GB | COMPRESSED:0.0GB | SWAP:0.0GB | STATUT:BALLOONING\nHOST:srv-virt-02 | DEFICIT:31.0GB | BALLOON:15.0GB | COMPRESSED:6.4GB | SWAP:9.6GB | STATUT:SATURATION_SWAP\n",
        "note": "Cas nominal avec absorption totale par ballooning vs saturation nécessitant du swapping."
      }
    ],
    "tests": [
      {
        "label": "Scénario sans pression et scénario extrême",
        "stdin": "cas:1",
        "expected": "HOST:srv-green | DEFICIT:0.0GB | BALLOON:0.0GB | COMPRESSED:0.0GB | SWAP:0.0GB | STATUT:NOMINAL\nHOST:srv-overcommit | DEFICIT:40.0GB | BALLOON:10.0GB | COMPRESSED:3.2GB | SWAP:26.8GB | STATUT:SATURATION_SWAP\n"
      },
      {
        "label": "Compression partielle et seuils mémoire",
        "stdin": "cas:2",
        "expected": "HOST:srv-mid | DEFICIT:8.0GB | BALLOON:5.0GB | COMPRESSED:1.5GB | SWAP:1.5GB | STATUT:SATURATION_SWAP\n"
      }
    ],
    "solution": "[Exemple]\nHOST:srv-virt-01 | DEFICIT:16.0GB | BALLOON:16.0GB | COMPRESSED:0.0GB | SWAP:0.0GB | STATUT:BALLOONING\nHOST:srv-virt-02 | DEFICIT:31.0GB | BALLOON:15.0GB | COMPRESSED:6.4GB | SWAP:9.6GB | STATUT:SATURATION_SWAP\n\n\n[Cas 1 — Scénario sans pression et scénario extrême]\nHOST:srv-green | DEFICIT:0.0GB | BALLOON:0.0GB | COMPRESSED:0.0GB | SWAP:0.0GB | STATUT:NOMINAL\nHOST:srv-overcommit | DEFICIT:40.0GB | BALLOON:10.0GB | COMPRESSED:3.2GB | SWAP:26.8GB | STATUT:SATURATION_SWAP\n\n\n[Cas 2 — Compression partielle et seuils mémoire]\nHOST:srv-mid | DEFICIT:8.0GB | BALLOON:5.0GB | COMPRESSED:1.5GB | SWAP:1.5GB | STATUT:SATURATION_SWAP"
  },
  {
    "id": "vrt3-c1-e3",
    "chapter": 1,
    "title": "Comparateur de Performance I/O & Latence Hyperviseur (Type 1 vs Type 2 vs Conteneur)",
    "level": "n3",
    "language": "analyse",
    "goal": "Mesurer et qualifier l'efficience de débit IOPS et l'overhead de latence selon le type d'architecture de virtualisation.",
    "brief": "<p>L'évaluation des performances d'accès disques et réseau compare les métriques d'une solution de virtualisation à la référence physique (<em>Bare-Metal</em>) :<br><br>\n1. <strong>Taux d'efficience IOPS (%)</strong> :<br>\n<code>efficiency_pct = (VIRT_IOPS / BASE_IOPS) * 100.0</code>.<br><br>\n2. <strong>Surcoût de latence (Overhead Latency en %)</strong> :<br>\n<code>overhead_lat_pct = ((VIRT_LAT_US - BASE_LAT_US) / BASE_LAT_US) * 100.0</code>.<br><br>\n3. <strong>Évaluation opérationnelle (EVAL)</strong> :<br>\n- Si <code>efficiency_pct &ge; 95.0</code> et <code>overhead_lat_pct &le; 5.0</code> : <code>EXCELLENT</code>.<br>\n- Si <code>efficiency_pct &ge; 85.0</code> et <code>overhead_lat_pct &le; 25.0</code> : <code>ACCEPTABLE</code>.<br>\n- Sinon : <code>DEGRADE</code>.<br><br>\nFormat d'entrée (sur STDIN) :<br>\nLignes : <code>WORKLOAD=&lt;nom&gt; BASE_IOPS=&lt;n&gt; ARCH=&lt;TYPE_1|TYPE_2|CONTAINER&gt; VIRT_IOPS=&lt;n&gt; BASE_LAT_US=&lt;n&gt; VIRT_LAT_US=&lt;n&gt;</code>.<br><br>\nFormat de sortie :<br>\n<code>WORKLOAD:&lt;nom&gt; | ARCH:&lt;arch&gt; | EFFICIENCY:&lt;efficiency_pct:.1f&gt;% | OVERHEAD_LAT:+&lt;overhead_lat_pct:.1f&gt;% | EVAL:&lt;eval&gt;</code></p>",
    "starter": "# Grille d'analyse (vrt3-c1-e3) — Comparateur de Performance I/O & Latence Hyperviseur (Type 1 vs Type 2 vs Conteneur)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Zone de performance acceptable et dégradée]\n# Données : WORKLOAD=file-server BASE_IOPS=40000 ARCH=TYPE_1 VIRT_IOPS=36000 BASE_LAT_US=400 VIRT_LAT_US=480\n# Données : WORKLOAD=batch-etl BASE_IOPS=60000 ARCH=TYPE_2 VIRT_IOPS=45000 BASE_LAT_US=300 VIRT_LAT_US=420\nA_COMPLETER\n\n[Cas 2 — Conteneurs et latence quasi nulle]\n# Données : WORKLOAD=microservice BASE_IOPS=120000 ARCH=CONTAINER VIRT_IOPS=118000 BASE_LAT_US=100 VIRT_LAT_US=104\nA_COMPLETER\n",
    "hints": [
      "Calculez l'accroissement relatif de latence par rapport à la base : ((virt - base) / base) * 100.0.",
      "Affichez le signe '+' explicitement devant la valeur d'overhead de latence."
    ],
    "examples": [
      {
        "stdin": "WORKLOAD=db-oltp BASE_IOPS=100000 ARCH=TYPE_1 VIRT_IOPS=96000 BASE_LAT_US=200 VIRT_LAT_US=208\nWORKLOAD=web-nginx BASE_IOPS=50000 ARCH=CONTAINER VIRT_IOPS=49500 BASE_LAT_US=150 VIRT_LAT_US=153\nWORKLOAD=dev-lab BASE_IOPS=80000 ARCH=TYPE_2 VIRT_IOPS=62000 BASE_LAT_US=250 VIRT_LAT_US=350",
        "expected": "WORKLOAD:db-oltp | ARCH:TYPE_1 | EFFICIENCY:96.0% | OVERHEAD_LAT:+4.0% | EVAL:EXCELLENT\nWORKLOAD:web-nginx | ARCH:CONTAINER | EFFICIENCY:99.0% | OVERHEAD_LAT:+2.0% | EVAL:EXCELLENT\nWORKLOAD:dev-lab | ARCH:TYPE_2 | EFFICIENCY:77.5% | OVERHEAD_LAT:+40.0% | EVAL:DEGRADE\n",
        "note": "Comparatif d'un hyperviseur bare-metal Type 1, d'un conteneur et d'un hyperviseur hébergé Type 2."
      }
    ],
    "tests": [
      {
        "label": "Zone de performance acceptable et dégradée",
        "stdin": "cas:1",
        "expected": "WORKLOAD:file-server | ARCH:TYPE_1 | EFFICIENCY:90.0% | OVERHEAD_LAT:+20.0% | EVAL:ACCEPTABLE\nWORKLOAD:batch-etl | ARCH:TYPE_2 | EFFICIENCY:75.0% | OVERHEAD_LAT:+40.0% | EVAL:DEGRADE\n"
      },
      {
        "label": "Conteneurs et latence quasi nulle",
        "stdin": "cas:2",
        "expected": "WORKLOAD:microservice | ARCH:CONTAINER | EFFICIENCY:98.3% | OVERHEAD_LAT:+4.0% | EVAL:EXCELLENT\n"
      }
    ],
    "solution": "[Exemple]\nWORKLOAD:db-oltp | ARCH:TYPE_1 | EFFICIENCY:96.0% | OVERHEAD_LAT:+4.0% | EVAL:EXCELLENT\nWORKLOAD:web-nginx | ARCH:CONTAINER | EFFICIENCY:99.0% | OVERHEAD_LAT:+2.0% | EVAL:EXCELLENT\nWORKLOAD:dev-lab | ARCH:TYPE_2 | EFFICIENCY:77.5% | OVERHEAD_LAT:+40.0% | EVAL:DEGRADE\n\n\n[Cas 1 — Zone de performance acceptable et dégradée]\nWORKLOAD:file-server | ARCH:TYPE_1 | EFFICIENCY:90.0% | OVERHEAD_LAT:+20.0% | EVAL:ACCEPTABLE\nWORKLOAD:batch-etl | ARCH:TYPE_2 | EFFICIENCY:75.0% | OVERHEAD_LAT:+40.0% | EVAL:DEGRADE\n\n\n[Cas 2 — Conteneurs et latence quasi nulle]\nWORKLOAD:microservice | ARCH:CONTAINER | EFFICIENCY:98.3% | OVERHEAD_LAT:+4.0% | EVAL:EXCELLENT"
  }
];
