'use strict';

module.exports = [
  {
    "id": "vrt3-c1-e1",
    "chapter": 1,
    "title": "Calculateur de Ratio de Surallocation CPU (vCPU-to-pCPU Overcommitment)",
    "level": "n1",
    "language": "analyse",
    "goal": "Calculer le ratio de surallocation processeur d'un hôte de virtualisation et qualifier le niveau de risque de contention CPU.",
    "brief": "<p>En virtualisation de serveurs, les administrateurs allouent des processeurs virtuels (vCPUs) aux machines virtuelles en appliquant un ratio de surallocation (<em>CPU Overcommitment</em>) par rapport aux capacités physiques de l'hôte :<br><br>\n1. <strong>Cœurs physiques réels (pCPUs)</strong> :<br>\n<code>pcpu_cores = SOCKETS * CORES</code>.<br><br>\n2. <strong>Processeurs logiques (Threads d'exécution)</strong> :<br>\nSi Hyper-Threading (HT=1) est actif : <code>logical_cpus = pcpu_cores * 2</code>. Sinon (HT=0) : <code>logical_cpus = pcpu_cores</code>.<br><br>\n3. <strong>Ratios de surallocation</strong> :<br>\n- <code>ratio_cores = VCPUS / pcpu_cores</code><br>\n- <code>ratio_threads = VCPUS / logical_cpus</code><br><br>\n4. <strong>Qualification opérationnelle selon le ratio par thread (<code>ratio_threads</code>)</strong> :<br>\n- <code>ratio_threads &le; 1.0</code> : <code>CONSERVATEUR</code> (aucun surcoût, latence minimale garantie).<br>\n- <code>1.0 &lt; ratio_threads &le; 3.0</code> : <code>MODERE</code> (production standard équilibrée).<br>\n- <code>3.0 &lt; ratio_threads &le; 5.0</code> : <code>AGRESSIF</code> (forte densité, surveillance du CPU Ready requise).<br>\n- <code>ratio_threads &gt; 5.0</code> : <code>CRITIQUE</code> (saturation prévisible et contention CPU majeure).<br><br>\nFormat d'entrée (les données d’entrée) :<br>\nLignes au format : <code>HOST=&lt;nom&gt; SOCKETS=&lt;nb&gt; CORES=&lt;nb&gt; HT=&lt;0|1&gt; VCPUS=&lt;nb&gt;</code>.<br><br>\nFormat de sortie :<br>\n<code>HOST:&lt;nom&gt; | PCPUS:&lt;pcpu_cores&gt; | THREADS:&lt;logical_cpus&gt; | RATIO_CORE:&lt;ratio_cores:.2f&gt;:1 | RATIO_THREAD:&lt;ratio_threads:.2f&gt;:1 | STATUT:&lt;statut&gt;</code></p>",
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
    "brief": "<p>Lorsqu'un hyperviseur subit une contention mémoire, il active en cascade plusieurs mécanismes d'arbitrage :<br><br>\n1. <strong>Transparent Page Sharing (TPS)</strong> : Déduplication des pages mémoire identiques.<br>\n<code>ram_apres_tps = VMS_GB * (1.0 - TPS_PCT / 100.0)</code>.<br><br>\n2. <strong>Déficit mémoire</strong> :<br>\n<code>deficit = max(0.0, ram_apres_tps - RAM_GB)</code>.<br><br>\n3. <strong>Memory Ballooning</strong> : Gonflage du pilote ballon dans l'OS invité, plafonné à la capacité disponible :<br>\n<code>balloon_used = min(deficit, BALLOON_GB)</code>.<br>\nLe restant à combler est : <code>remaining = deficit - balloon_used</code>.<br><br>\n4. <strong>Memory Compression</strong> : Compression rapide dans un cache RAM d'au plus 50% du restant, plafonnée à 10% de la RAM physique de l'hôte :<br>\n<code>compressed = min(remaining * 0.5, RAM_GB * 0.10)</code>.<br><br>\n5. <strong>Hypervisor Swapping</strong> : Écriture sur disque (.vswp) du résidu non compressible :<br>\n<code>swap = remaining - compressed</code>.<br><br>\n6. <strong>Statut de santé mémoire</strong> :<br>\n- Si <code>deficit == 0.0</code> : <code>NOMINAL</code><br>\n- Si <code>deficit &gt; 0.0</code> et <code>swap == 0.0</code> : <code>BALLOONING</code><br>\n- Si <code>swap &gt; 0.0</code> : <code>SATURATION_SWAP</code><br><br>\nFormat d'entrée (les données d’entrée) :<br>\nLignes : <code>HOST=&lt;nom&gt; RAM_GB=&lt;nb&gt; VMS_GB=&lt;nb&gt; TPS_PCT=&lt;pct&gt; BALLOON_GB=&lt;nb&gt;</code>.<br><br>\nFormat de sortie :<br>\n<code>HOST:&lt;nom&gt; | DEFICIT:&lt;deficit:.1f&gt;GB | BALLOON:&lt;balloon_used:.1f&gt;GB | COMPRESSED:&lt;compressed:.1f&gt;GB | SWAP:&lt;swap:.1f&gt;GB | STATUT:&lt;statut&gt;</code></p>",
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
    "brief": "<p>L'évaluation des performances d'accès disques et réseau compare les métriques d'une solution de virtualisation à la référence physique (<em>Bare-Metal</em>) :<br><br>\n1. <strong>Taux d'efficience IOPS (%)</strong> :<br>\n<code>efficiency_pct = (VIRT_IOPS / BASE_IOPS) * 100.0</code>.<br><br>\n2. <strong>Surcoût de latence (Overhead Latency en %)</strong> :<br>\n<code>overhead_lat_pct = ((VIRT_LAT_US - BASE_LAT_US) / BASE_LAT_US) * 100.0</code>.<br><br>\n3. <strong>Évaluation opérationnelle (EVAL)</strong> :<br>\n- Si <code>efficiency_pct &ge; 95.0</code> et <code>overhead_lat_pct &le; 5.0</code> : <code>EXCELLENT</code>.<br>\n- Si <code>efficiency_pct &ge; 85.0</code> et <code>overhead_lat_pct &le; 25.0</code> : <code>ACCEPTABLE</code>.<br>\n- Sinon : <code>DEGRADE</code>.<br><br>\nFormat d'entrée (les données d’entrée) :<br>\nLignes : <code>WORKLOAD=&lt;nom&gt; BASE_IOPS=&lt;n&gt; ARCH=&lt;TYPE_1|TYPE_2|CONTAINER&gt; VIRT_IOPS=&lt;n&gt; BASE_LAT_US=&lt;n&gt; VIRT_LAT_US=&lt;n&gt;</code>.<br><br>\nFormat de sortie :<br>\n<code>WORKLOAD:&lt;nom&gt; | ARCH:&lt;arch&gt; | EFFICIENCY:&lt;efficiency_pct:.1f&gt;% | OVERHEAD_LAT:+&lt;overhead_lat_pct:.1f&gt;% | EVAL:&lt;eval&gt;</code></p>",
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
  },
  {
    "id": "vrt3-c2-e1",
    "chapter": 2,
    "title": "Parseur de Fichier de Configuration VM .vmx & Validateur d'Options Matérielles",
    "level": "n1",
    "language": "analyse",
    "goal": "Parser la structure clé-valeur d'un fichier de description de machine virtuelle VMware (.vmx) et extraire les options matérielles.",
    "brief": "<p>Dans l'infrastructure VMware ESXi / Workstation, une machine virtuelle est définie par un fichier texte <code>.vmx</code> composé de paires <code>cle = \"valeur\"</code> :<br><br>\nChamps à extraire :<br>\n- <code>VM</code> : valeur de <code>displayName</code> (ou <code>\"VM-Inconnue\"</code> si absente).<br>\n- <code>OS</code> : valeur de <code>guestOS</code> (ou <code>\"other\"</code>).<br>\n- <code>VCPUS</code> : entier <code>numvcpus</code> (par défaut 1).<br>\n- <code>RAM</code> : entier <code>memsize</code> en Mo (par défaut 1024).<br>\n- <code>BOOT</code> : valeur de <code>firmware</code> (par défaut <code>\"bios\"</code>, en minuscules).<br>\n- <code>SECURE_BOOT</code> : <code>\"ENABLED\"</code> si <code>uefi.secureBoot.enabled = \"TRUE\"</code> (insensible à la casse), sinon <code>\"DISABLED\"</code>.<br>\n- <code>TOOLS_SYNC</code> : <code>\"YES\"</code> si <code>tools.syncTime = \"TRUE\"</code> (insensible à la casse), sinon <code>\"NO\"</code>.<br><br>\nFormat d'entrée (les données d’entrée) :<br>\nUn bloc de fichier <code>.vmx</code> complet.<br><br>\nFormat de sortie :<br>\n<code>VM:<VM> | OS:<OS> | VCPUS:<VCPUS> | RAM:<RAM>MB | BOOT:<BOOT> | SECURE_BOOT:<SECURE_BOOT> | TOOLS_SYNC:<TOOLS_SYNC></code></p>",
    "starter": "# Grille d'analyse (vrt3-c2-e1) — Parseur de Fichier de Configuration VM .vmx & Validateur d'Options Matérielles\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Configuration minimale par défaut sans options avancées]\n# Données : displayName = \"SRV-LEGACY-DB\"\n# Données : guestOS = \"winnetenterprise-64\"\n# Données : memsize = \"4096\"\nA_COMPLETER\n\n[Cas 2 — VM sans nom explicite et minuscules dans les booléens]\n# Données : guestOS = \"ubuntu-64\"\n# Données : numvcpus = \"8\"\n# Données : memsize = \"16384\"\n# Données : firmware = \"EFI\"\n# Données : uefi.secureBoot.enabled = \"false\"\n# Données : tools.syncTime = \"true\"\nA_COMPLETER\n",
    "hints": [
      "Isolez les lignes avec clé = 'valeur' en retirant les guillemets et espaces superflus.",
      "Gérez les valeurs par défaut si une directive est absente du fichier .vmx."
    ],
    "examples": [
      {
        "stdin": "displayName = \"SRV-PROD-WEB01\"\nguestOS = \"rhel9-64\"\nnumvcpus = \"4\"\nmemsize = \"8192\"\nfirmware = \"efi\"\nuefi.secureBoot.enabled = \"TRUE\"\ntools.syncTime = \"TRUE\"\nethernet0.virtualDev = \"vmxnet3\"",
        "expected": "VM:SRV-PROD-WEB01 | OS:rhel9-64 | VCPUS:4 | RAM:8192MB | BOOT:efi | SECURE_BOOT:ENABLED | TOOLS_SYNC:YES\n",
        "note": "Configuration d'un serveur Linux RHEL sous UEFI avec Secure Boot et synchronisation horaire."
      }
    ],
    "tests": [
      {
        "label": "Configuration minimale par défaut sans options avancées",
        "stdin": "cas:1",
        "expected": "VM:SRV-LEGACY-DB | OS:winnetenterprise-64 | VCPUS:1 | RAM:4096MB | BOOT:bios | SECURE_BOOT:DISABLED | TOOLS_SYNC:NO\n"
      },
      {
        "label": "VM sans nom explicite et minuscules dans les booléens",
        "stdin": "cas:2",
        "expected": "VM:VM-Inconnue | OS:ubuntu-64 | VCPUS:8 | RAM:16384MB | BOOT:efi | SECURE_BOOT:DISABLED | TOOLS_SYNC:YES\n"
      }
    ],
    "solution": "[Exemple]\nVM:SRV-PROD-WEB01 | OS:rhel9-64 | VCPUS:4 | RAM:8192MB | BOOT:efi | SECURE_BOOT:ENABLED | TOOLS_SYNC:YES\n\n\n[Cas 1 — Configuration minimale par défaut sans options avancées]\nVM:SRV-LEGACY-DB | OS:winnetenterprise-64 | VCPUS:1 | RAM:4096MB | BOOT:bios | SECURE_BOOT:DISABLED | TOOLS_SYNC:NO\n\n\n[Cas 2 — VM sans nom explicite et minuscules dans les booléens]\nVM:VM-Inconnue | OS:ubuntu-64 | VCPUS:8 | RAM:16384MB | BOOT:efi | SECURE_BOOT:DISABLED | TOOLS_SYNC:YES"
  },
  {
    "id": "vrt3-c2-e2",
    "chapter": 2,
    "title": "Calculateur d'Espace Disque & Arborescence de Snapshots VM (Delta VMDKs)",
    "level": "n2",
    "language": "analyse",
    "goal": "Calculer la croissance d'espace disque cumulée d'une chaîne de snapshots et émettre une alerte de consolidation.",
    "brief": "<p>Chaque snapshot VMware crée un disque différentiel (delta <code>.vmdk</code>) qui enregistre les écritures et grossit au fil du temps :<br><br>\n1. <strong>Nombre de snapshots actifs</strong> :<br>\nLe champ <code>SNAPS</code> fournit la liste des âges (en jours) des snapshots actifs (ex: <code>3,7,12</code>), ou <code>NONE</code> s'il n'y a aucun snapshot.<br><br>\n2. <strong>Volume cumulé des fichiers deltas</strong> :<br>\n<code>total_delta_gb = sum(DAILY_GB * jours)</code> pour tous les snapshots.<br><br>\n3. <strong>Espace total consommé sur le Datastore</strong> :<br>\n<code>total_storage_gb = BASE_GB + total_delta_gb</code>.<br><br>\n4. <strong>Ratio d'expansion de stockage</strong> :<br>\n<code>ratio = total_storage_gb / BASE_GB</code>.<br><br>\n5. <strong>Alerte de consolidation</strong> :<br>\n- Si le nombre de snapshots est supérieur à 3, OU si <code>total_delta_gb &gt; BASE_GB * 0.5</code> : statut <code>ALERTE_CONSOLIDATION</code> (risque de saturation et dégradation des I/O).<br>\n- Sinon : statut <code>NOMINAL</code>.<br><br>\nFormat d'entrée (les données d’entrée) :<br>\nLignes : <code>VM=&lt;nom&gt; BASE_GB=&lt;n&gt; DAILY_GB=&lt;n&gt; SNAPS=&lt;d1,d2,...|NONE&gt;</code>.<br><br>\nFormat de sortie :<br>\n<code>VM:&lt;nom&gt; | SNAPS:&lt;count&gt; | DELTA:&lt;total_delta_gb:.1f&gt;GB | TOTAL:&lt;total_storage_gb:.1f&gt;GB | RATIO:&lt;ratio:.2f&gt; | STATUT:&lt;statut&gt;</code></p>",
    "starter": "# Grille d'analyse (vrt3-c2-e2) — Calculateur d'Espace Disque & Arborescence de Snapshots VM (Delta VMDKs)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Dépassement du seuil de 50% de delta avec seulement 2 snapshots]\n# Données : VM=vm-bigdata BASE_GB=80 DAILY_GB=10.0 SNAPS=3,4\n# Données : VM=vm-mail BASE_GB=150 DAILY_GB=2.0 SNAPS=10,15,20\nA_COMPLETER\n\n[Cas 2 — Exactement 3 snapshots sous le seuil de 50%]\n# Données : VM=vm-erp BASE_GB=200 DAILY_GB=1.0 SNAPS=10,20,30\nA_COMPLETER\n",
    "hints": [
      "Traitez le cas SNAPS=NONE en comptant 0 snapshot et 0.0 Go de delta.",
      "Formatez le ratio d'expansion avec deux chiffres après la virgule."
    ],
    "examples": [
      {
        "stdin": "VM=vm-compta BASE_GB=100 DAILY_GB=2.0 SNAPS=2,5\nVM=vm-dev BASE_GB=50 DAILY_GB=5.0 SNAPS=3,8,12,20\nVM=vm-backup BASE_GB=200 DAILY_GB=1.0 SNAPS=NONE",
        "expected": "VM:vm-compta | SNAPS:2 | DELTA:14.0GB | TOTAL:114.0GB | RATIO:1.14 | STATUT:NOMINAL\nVM:vm-dev | SNAPS:4 | DELTA:215.0GB | TOTAL:265.0GB | RATIO:5.30 | STATUT:ALERTE_CONSOLIDATION\nVM:vm-backup | SNAPS:0 | DELTA:0.0GB | TOTAL:200.0GB | RATIO:1.00 | STATUT:NOMINAL\n",
        "note": "Chaîne de snapshots modérée, chaîne excessive (> 3 snapshots et > 50% delta) et VM sans snapshot."
      }
    ],
    "tests": [
      {
        "label": "Dépassement du seuil de 50% de delta avec seulement 2 snapshots",
        "stdin": "cas:1",
        "expected": "VM:vm-bigdata | SNAPS:2 | DELTA:70.0GB | TOTAL:150.0GB | RATIO:1.88 | STATUT:ALERTE_CONSOLIDATION\nVM:vm-mail | SNAPS:3 | DELTA:90.0GB | TOTAL:240.0GB | RATIO:1.60 | STATUT:ALERTE_CONSOLIDATION\n"
      },
      {
        "label": "Exactement 3 snapshots sous le seuil de 50%",
        "stdin": "cas:2",
        "expected": "VM:vm-erp | SNAPS:3 | DELTA:60.0GB | TOTAL:260.0GB | RATIO:1.30 | STATUT:NOMINAL\n"
      }
    ],
    "solution": "[Exemple]\nVM:vm-compta | SNAPS:2 | DELTA:14.0GB | TOTAL:114.0GB | RATIO:1.14 | STATUT:NOMINAL\nVM:vm-dev | SNAPS:4 | DELTA:215.0GB | TOTAL:265.0GB | RATIO:5.30 | STATUT:ALERTE_CONSOLIDATION\nVM:vm-backup | SNAPS:0 | DELTA:0.0GB | TOTAL:200.0GB | RATIO:1.00 | STATUT:NOMINAL\n\n\n[Cas 1 — Dépassement du seuil de 50% de delta avec seulement 2 snapshots]\nVM:vm-bigdata | SNAPS:2 | DELTA:70.0GB | TOTAL:150.0GB | RATIO:1.88 | STATUT:ALERTE_CONSOLIDATION\nVM:vm-mail | SNAPS:3 | DELTA:90.0GB | TOTAL:240.0GB | RATIO:1.60 | STATUT:ALERTE_CONSOLIDATION\n\n\n[Cas 2 — Exactement 3 snapshots sous le seuil de 50%]\nVM:vm-erp | SNAPS:3 | DELTA:60.0GB | TOTAL:260.0GB | RATIO:1.30 | STATUT:NOMINAL"
  },
  {
    "id": "vrt3-c2-e3",
    "chapter": 2,
    "title": "Ordonnanceur de Pools de Ressources vCenter (Shares, Reservations, Limits CPU)",
    "level": "n3",
    "language": "analyse",
    "goal": "Calculer la répartition des ressources CPU entre pools sous contention en respectant réservations, limites et shares.",
    "brief": "<p>Dans un cluster vSphere, les pools de ressources se partagent la capacité CPU du cluster selon trois mécanismes :<br><br>\n1. <strong>Capacité et Réservations</strong> :<br>\nLe cluster possède une capacité <code>CLUSTER_CAPACITY_MHZ</code>. Chaque pool dispose d'une réservation minimale garantie <code>RESERVED_MHZ</code>.<br>\nSi la somme des réservations de tous les pools dépasse la capacité, le contrôle d'admission échoue (<code>CLUSTER_OVERCOMMITTED</code>).<br><br>\n2. <strong>Distribution des Shares en situation de partage</strong> :<br>\nLa capacité non réservée restante est : <code>unreserved = CLUSTER_CAPACITY_MHZ - sum(RESERVED_MHZ)</code>.<br>\nPoids des parts (Shares) :<br>\n- <code>LOW</code> = 2000, <code>NORMAL</code> = 4000, <code>HIGH</code> = 8000 (ou valeur entière numérique directe).<br>\nChaque pool reçoit une part proportionnelle :<br>\n<code>part_mhz = (pool.shares / total_shares) * unreserved</code>.<br><br>\n3. <strong>Allocation totale et Limite</strong> :<br>\n<code>allocation = pool.reserved + part_mhz</code>.<br>\nSi <code>LIMIT_MHZ</code> est supérieur à zéro (limite active), l'allocation est plafonnée :<br>\n<code>allocation = min(allocation, pool.limit)</code>.<br><br>\nFormat d'entrée (les données d’entrée) :<br>\nLigne 1 : <code>CLUSTER_CAPACITY_MHZ=&lt;total&gt;</code>.<br>\nLignes suivantes : <code>POOL=&lt;nom&gt; RESERVED_MHZ=&lt;r&gt; LIMIT_MHZ=&lt;l|-1&gt; SHARES=&lt;s|LOW|NORMAL|HIGH&gt;</code>.<br><br>\nFormat de sortie :<br>\nPour chaque pool :<br>\n<code>POOL:&lt;nom&gt; | RESERVED:&lt;r&gt;MHz | LIMIT:&lt;l_str&gt; | SHARES:&lt;s&gt; | ALLOCATED:&lt;allocated:.1f&gt;MHz</code><br>\n(Si le cluster est sur-réservé, afficher une seule ligne : <code>ERROR:CLUSTER_OVERCOMMITTED</code>).</p>",
    "starter": "# Grille d'analyse (vrt3-c2-e3) — Ordonnanceur de Pools de Ressources vCenter (Shares, Reservations, Limits CPU)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Cluster sur-réservé dépassant la capacité]\n# Données : CLUSTER_CAPACITY_MHZ=10000\n# Données : POOL=Pool-A RESERVED_MHZ=6000 LIMIT_MHZ=-1 SHARES=NORMAL\n# Données : POOL=Pool-B RESERVED_MHZ=5000 LIMIT_MHZ=-1 SHARES=NORMAL\nA_COMPLETER\n\n[Cas 2 — Pool plafonné par sa limite explicite]\n# Données : CLUSTER_CAPACITY_MHZ=10000\n# Données : POOL=Pool-Capped RESERVED_MHZ=1000 LIMIT_MHZ=3000 SHARES=HIGH\n# Données : POOL=Pool-Free RESERVED_MHZ=1000 LIMIT_MHZ=-1 SHARES=LOW\nA_COMPLETER\n",
    "hints": [
      "Convertissez les mots-clés LOW (2000), NORMAL (4000) et HIGH (8000) en valeurs entières.",
      "Affichez LIMIT:UNLIMITED si la limite vaut -1."
    ],
    "examples": [
      {
        "stdin": "CLUSTER_CAPACITY_MHZ=20000\nPOOL=Production RESERVED_MHZ=8000 LIMIT_MHZ=-1 SHARES=HIGH\nPOOL=Test-Dev RESERVED_MHZ=2000 LIMIT_MHZ=6000 SHARES=NORMAL\nPOOL=Staging RESERVED_MHZ=2000 LIMIT_MHZ=-1 SHARES=LOW",
        "expected": "POOL:Production | RESERVED:8000MHz | LIMIT:UNLIMITED | SHARES:8000 | ALLOCATED:12571.4MHz\nPOOL:Test-Dev | RESERVED:2000MHz | LIMIT:6000MHz | SHARES:4000 | ALLOCATED:4285.7MHz\nPOOL:Staging | RESERVED:2000MHz | LIMIT:UNLIMITED | SHARES:2000 | ALLOCATED:3142.9MHz\n",
        "note": "Capacité 20000 MHz partagée entre 3 pools avec pondérations HIGH (8000), NORMAL (4000) et LOW (2000)."
      }
    ],
    "tests": [
      {
        "label": "Cluster sur-réservé dépassant la capacité",
        "stdin": "cas:1",
        "expected": "ERROR:CLUSTER_OVERCOMMITTED\n"
      },
      {
        "label": "Pool plafonné par sa limite explicite",
        "stdin": "cas:2",
        "expected": "POOL:Pool-Capped | RESERVED:1000MHz | LIMIT:3000MHz | SHARES:8000 | ALLOCATED:3000.0MHz\nPOOL:Pool-Free | RESERVED:1000MHz | LIMIT:UNLIMITED | SHARES:2000 | ALLOCATED:2600.0MHz\n"
      }
    ],
    "solution": "[Exemple]\nPOOL:Production | RESERVED:8000MHz | LIMIT:UNLIMITED | SHARES:8000 | ALLOCATED:12571.4MHz\nPOOL:Test-Dev | RESERVED:2000MHz | LIMIT:6000MHz | SHARES:4000 | ALLOCATED:4285.7MHz\nPOOL:Staging | RESERVED:2000MHz | LIMIT:UNLIMITED | SHARES:2000 | ALLOCATED:3142.9MHz\n\n\n[Cas 1 — Cluster sur-réservé dépassant la capacité]\nERROR:CLUSTER_OVERCOMMITTED\n\n\n[Cas 2 — Pool plafonné par sa limite explicite]\nPOOL:Pool-Capped | RESERVED:1000MHz | LIMIT:3000MHz | SHARES:8000 | ALLOCATED:3000.0MHz\nPOOL:Pool-Free | RESERVED:1000MHz | LIMIT:UNLIMITED | SHARES:2000 | ALLOCATED:2600.0MHz"
  },
  {
    "id": "vrt3-c3-e1",
    "chapter": 3,
    "title": "Dimensionneur de Datastores VMFS & Provisionnement de Disques (Thin vs Thick)",
    "level": "n1",
    "language": "analyse",
    "goal": "Calculer la consommation logique et physique d'un Datastore VMFS selon les types de provisionnement (Thick vs Thin).",
    "brief": "<p>Sur un Datastore VMware VMFS, les disques virtuels (.vmdk) utilisent différentes stratégies de provisionnement :<br><br>\n1. <strong>Types de disques</strong> :<br>\n- <code>THICK_EAGER</code> ou <code>THICK_LAZY</code> : L'espace est alloué à 100% dès la création (consommation physique = taille déclarée).<br>\n- <code>THIN</code> : Seul l'espace réellement écrit est consommé sur le Datastore (spécifié par <code>taille:THIN:pct</code>, où <code>pct</code> est le pourcentage consommé, ex: <code>100:THIN:25</code> consomme 25 Go physiques).<br><br>\n2. <strong>Calculs sur le Datastore</strong> :<br>\n- <code>log_gb</code> : Somme des tailles déclarées (nominales) de toutes les VMs.<br>\n- <code>phy_gb</code> : Somme de l'espace physique réellement réservé.<br>\n- <code>log_pct = (log_gb / DS_SIZE_GB) * 100.0</code>.<br>\n- <code>phy_pct = (phy_gb / DS_SIZE_GB) * 100.0</code>.<br><br>\n3. <strong>Statut de conformité du Datastore</strong> :<br>\n- Si <code>phy_gb &gt; DS_SIZE_GB</code> : <code>OVERFLOW_PHYSIQUE</code> (espace disque insuffisant).<br>\n- Si <code>phy_pct &gt; 80.0</code> : <code>ALERTE_SATURATION</code> (seuil d'alerte VMware de 80% dépassé).<br>\n- Si <code>log_gb &gt; DS_SIZE_GB</code> et <code>phy_pct &le; 80.0</code> : <code>OVERCOMMITTED_OK</code> (surallocation saine).<br>\n- Sinon : <code>NOMINAL</code>.<br><br>\nFormat d'entrée (les données d’entrée) :<br>\nLignes : <code>DATASTORE=&lt;nom&gt; DS_SIZE_GB=&lt;n&gt; DISKS=&lt;vm1:taille:type[:pct],vm2:...&gt;</code>.<br><br>\nFormat de sortie :<br>\n<code>DATASTORE:&lt;nom&gt; | LOGICAL:&lt;log_gb&gt;GB (&lt;log_pct:.1f&gt;%) | PHYSICAL:&lt;phy_gb:.1f&gt;GB (&lt;phy_pct:.1f&gt;%) | STATUT:&lt;statut&gt;</code></p>",
    "starter": "# Grille d'analyse (vrt3-c3-e1) — Dimensionneur de Datastores VMFS & Provisionnement de Disques (Thin vs Thick)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Surallocation logique saine sous 80% physique]\n# Données : DATASTORE=ds-overcommit DS_SIZE_GB=1000 DISKS=vmA:600:THIN:25,vmB:600:THIN:25,vmC:400:THIN:20\n# Données : DATASTORE=ds-overflow DS_SIZE_GB=400 DISKS=vm1:300:THICK_EAGER,vm2:200:THICK_LAZY\nA_COMPLETER\n\n[Cas 2 — Datastore franchissant pile le seuil d'alerte 80%]\n# Données : DATASTORE=ds-limit DS_SIZE_GB=1000 DISKS=vm1:820:THICK_EAGER\nA_COMPLETER\n",
    "hints": [
      "Pour les disques THIN, multipliez la taille par (pct / 100.0) pour obtenir l'espace physique.",
      "Pour les disques THICK, l'espace physique est exactement égal à la taille déclarée."
    ],
    "examples": [
      {
        "stdin": "DATASTORE=ds-san-01 DS_SIZE_GB=1000 DISKS=vm1:200:THICK_EAGER,vm2:300:THIN:30,vm3:400:THIN:20\nDATASTORE=ds-nfs-02 DS_SIZE_GB=500 DISKS=vm4:400:THICK_LAZY,vm5:200:THIN:50",
        "expected": "DATASTORE:ds-san-01 | LOGICAL:900GB (90.0%) | PHYSICAL:370.0GB (37.0%) | STATUT:NOMINAL\nDATASTORE:ds-nfs-02 | LOGICAL:600GB (120.0%) | PHYSICAL:500.0GB (100.0%) | STATUT:ALERTE_SATURATION\n",
        "note": "Datastore nominal sous 80% vs Datastore saturé à 100% avec surallocation logique."
      }
    ],
    "tests": [
      {
        "label": "Surallocation logique saine sous 80% physique",
        "stdin": "cas:1",
        "expected": "DATASTORE:ds-overcommit | LOGICAL:1600GB (160.0%) | PHYSICAL:380.0GB (38.0%) | STATUT:OVERCOMMITTED_OK\nDATASTORE:ds-overflow | LOGICAL:500GB (125.0%) | PHYSICAL:500.0GB (125.0%) | STATUT:OVERFLOW_PHYSIQUE\n"
      },
      {
        "label": "Datastore franchissant pile le seuil d'alerte 80%",
        "stdin": "cas:2",
        "expected": "DATASTORE:ds-limit | LOGICAL:820GB (82.0%) | PHYSICAL:820.0GB (82.0%) | STATUT:ALERTE_SATURATION\n"
      }
    ],
    "solution": "[Exemple]\nDATASTORE:ds-san-01 | LOGICAL:900GB (90.0%) | PHYSICAL:370.0GB (37.0%) | STATUT:NOMINAL\nDATASTORE:ds-nfs-02 | LOGICAL:600GB (120.0%) | PHYSICAL:500.0GB (100.0%) | STATUT:ALERTE_SATURATION\n\n\n[Cas 1 — Surallocation logique saine sous 80% physique]\nDATASTORE:ds-overcommit | LOGICAL:1600GB (160.0%) | PHYSICAL:380.0GB (38.0%) | STATUT:OVERCOMMITTED_OK\nDATASTORE:ds-overflow | LOGICAL:500GB (125.0%) | PHYSICAL:500.0GB (125.0%) | STATUT:OVERFLOW_PHYSIQUE\n\n\n[Cas 2 — Datastore franchissant pile le seuil d'alerte 80%]\nDATASTORE:ds-limit | LOGICAL:820GB (82.0%) | PHYSICAL:820.0GB (82.0%) | STATUT:ALERTE_SATURATION"
  },
  {
    "id": "vrt3-c3-e2",
    "chapter": 3,
    "title": "Calculateur de Capacité Utile vSAN & Politiques SPBM (FTT / RAID-1 / RAID-5)",
    "level": "n2",
    "language": "analyse",
    "goal": "Calculer la consommation brute et la capacité restante d'un cluster vSAN selon les règles SPBM (Failures to Tolerate).",
    "brief": "<p>VMware vSAN protège les machines virtuelles en appliquant des politiques de stockage SPBM avec facteurs d'amplification d'écriture :<br><br>\n1. <strong>Politiques de protection (SPBM)</strong> :<br>\n- <code>FTT=1_RAID1</code> (Miroir) : Multiplicateur = <code>2.00x</code> (min 3 hôtes).<br>\n- <code>FTT=1_RAID5</code> (Érasure Coding 3+1) : Multiplicateur = <code>1.33x</code> (min 4 hôtes).<br>\n- <code>FTT=2_RAID1</code> (Triple miroir) : Multiplicateur = <code>3.00x</code> (min 5 hôtes).<br>\n- <code>FTT=2_RAID6</code> (Érasure Coding 4+2) : Multiplicateur = <code>1.50x</code> (min 6 hôtes).<br><br>\n2. <strong>Espace de réserve opérationnelle (Slack Space)</strong> :<br>\nvSAN réserve obligatoirement 20% de la capacité brute du cluster pour les opérations internes (rebuild en cas de panne) :<br>\n<code>usable_limit_tb = RAW_CAPACITY_TB * 0.80</code>.<br><br>\n3. <strong>Consommation et capacité restante</strong> :<br>\n- <code>consumed_raw_tb = VM_DATA_TB * multiplier</code>.<br>\n- <code>remaining_tb = usable_limit_tb - consumed_raw_tb</code>.<br><br>\n4. <strong>Validation et statut</strong> :<br>\n- Si <code>CLUSTER_HOSTS &lt; min_hosts</code> : <code>ERROR:INVALID_HOST_COUNT</code>.<br>\n- Si <code>remaining_tb &lt; 0.0</code> : <code>CAPACITY_EXCEEDED</code>.<br>\n- Si <code>consumed_raw_tb &gt; usable_limit_tb * 0.85</code> : <code>WARNING_SLACK</code>.<br>\n- Sinon : <code>HEALTHY</code>.<br><br>\nFormat d'entrée (les données d’entrée) :<br>\nLignes : <code>HOSTS=&lt;nb&gt; RAW_CAPACITY_TB=&lt;to&gt; POLICY=&lt;nom&gt; VM_DATA_TB=&lt;to&gt;</code>.<br><br>\nFormat de sortie :<br>\n<code>POLICY:&lt;nom&gt; | MULTIPLIER:&lt;mult:.2f&gt;x | CONSUMED:&lt;consumed_raw_tb:.2f&gt;TB | REMAINING:&lt;remaining_tb:.2f&gt;TB | STATUT:&lt;statut&gt;</code></p>",
    "starter": "# Grille d'analyse (vrt3-c3-e2) — Calculateur de Capacité Utile vSAN & Politiques SPBM (FTT / RAID-1 / RAID-5)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — FTT=2 avec RAID-6 et dépassement de capacité]\n# Données : HOSTS=6 RAW_CAPACITY_TB=100.0 POLICY=FTT=2_RAID6 VM_DATA_TB=40.0\n# Données : HOSTS=6 RAW_CAPACITY_TB=80.0 POLICY=FTT=2_RAID1 VM_DATA_TB=25.0\nA_COMPLETER\n\n[Cas 2 — Hôtes insuffisants pour FTT=2 RAID-6]\n# Données : HOSTS=5 RAW_CAPACITY_TB=100.0 POLICY=FTT=2_RAID6 VM_DATA_TB=20.0\nA_COMPLETER\n",
    "hints": [
      "Vérifiez le nombre minimal d'hôtes requis par chaque politique avant les calculs.",
      "La réserve de Slack Space (20%) réduit la capacité utilisable à RAW_CAPACITY_TB * 0.80."
    ],
    "examples": [
      {
        "stdin": "HOSTS=4 RAW_CAPACITY_TB=50.0 POLICY=FTT=1_RAID5 VM_DATA_TB=15.0\nHOSTS=3 RAW_CAPACITY_TB=60.0 POLICY=FTT=1_RAID1 VM_DATA_TB=20.0\nHOSTS=3 RAW_CAPACITY_TB=40.0 POLICY=FTT=1_RAID5 VM_DATA_TB=10.0",
        "expected": "POLICY:FTT=1_RAID5 | MULTIPLIER:1.33x | CONSUMED:20.00TB | REMAINING:20.00TB | STATUT:HEALTHY\nPOLICY:FTT=1_RAID1 | MULTIPLIER:2.00x | CONSUMED:40.00TB | REMAINING:8.00TB | STATUT:HEALTHY\nERROR:INVALID_HOST_COUNT\n",
        "note": "vSAN RAID-5 sain sur 4 hôtes, RAID-1 en avertissement slack space et échec d'hôtes insuffisants."
      }
    ],
    "tests": [
      {
        "label": "FTT=2 avec RAID-6 et dépassement de capacité",
        "stdin": "cas:1",
        "expected": "POLICY:FTT=2_RAID6 | MULTIPLIER:1.50x | CONSUMED:60.00TB | REMAINING:20.00TB | STATUT:HEALTHY\nPOLICY:FTT=2_RAID1 | MULTIPLIER:3.00x | CONSUMED:75.00TB | REMAINING:-11.00TB | STATUT:CAPACITY_EXCEEDED\n"
      },
      {
        "label": "Hôtes insuffisants pour FTT=2 RAID-6",
        "stdin": "cas:2",
        "expected": "ERROR:INVALID_HOST_COUNT\n"
      }
    ],
    "solution": "[Exemple]\nPOLICY:FTT=1_RAID5 | MULTIPLIER:1.33x | CONSUMED:20.00TB | REMAINING:20.00TB | STATUT:HEALTHY\nPOLICY:FTT=1_RAID1 | MULTIPLIER:2.00x | CONSUMED:40.00TB | REMAINING:8.00TB | STATUT:HEALTHY\nERROR:INVALID_HOST_COUNT\n\n\n[Cas 1 — FTT=2 avec RAID-6 et dépassement de capacité]\nPOLICY:FTT=2_RAID6 | MULTIPLIER:1.50x | CONSUMED:60.00TB | REMAINING:20.00TB | STATUT:HEALTHY\nPOLICY:FTT=2_RAID1 | MULTIPLIER:3.00x | CONSUMED:75.00TB | REMAINING:-11.00TB | STATUT:CAPACITY_EXCEEDED\n\n\n[Cas 2 — Hôtes insuffisants pour FTT=2 RAID-6]\nERROR:INVALID_HOST_COUNT"
  },
  {
    "id": "vrt3-c3-e3",
    "chapter": 3,
    "title": "Moteur d'Arbitrage Multipathing MPIO (Round Robin & Fixed)",
    "level": "n3",
    "language": "analyse",
    "goal": "Simuler l'acheminement des requêtes I/O disque sur les chemins SAN selon les politiques multipathing MPIO (Round Robin et Fixed).",
    "brief": "<p>Le plug-in natif de sélection de chemin VMware NMP (Native Multipathing) répartit les flux d'entrées/sorties sur les adaptateurs HBA/iSCSI :<br><br>\n1. <strong>Politique <code>VMW_PSP_RR</code> (Round Robin)</strong> :<br>\nAlterne équitablement les requêtes I/O entre tous les chemins actifs. Dès qu'un chemin traite <code>THRESHOLD</code> I/O (par défaut 1000, ou valeur configurée), le commutateur bascule sur le chemin actif suivant en anneau circulaire.<br><br>\n2. <strong>Politique <code>VMW_PSP_FIXED</code></strong> :<br>\nEnvoie la totalité des I/O sur le chemin <code>PREFERRED</code>. Si ce chemin tombe en panne (événement <code>FAIL:&lt;path&gt;</code>), les I/O basculent sur le premier chemin alternatif actif. Dès que le chemin préféré se rétablit (<code>RECOVER:&lt;path&gt;</code>), le trafic y revient immédiatement (<em>Failback</em>).<br><br>\nFormat d'entrée (les données d’entrée) :<br>\nLigne 1 : <code>POLICY=&lt;RR|FIXED&gt; PATHS=&lt;p1,p2,...&gt; PREFERRED=&lt;path&gt; THRESHOLD=&lt;nb&gt;</code>.<br>\nLignes suivantes : Événements <code>IO=&lt;nb&gt;</code>, <code>FAIL=&lt;path&gt;</code> ou <code>RECOVER=&lt;path&gt;</code>.<br><br>\nFormat de sortie :<br>\nPour chaque chemin, afficher le nombre total d'I/O reçues :<br>\n<code>PATH:&lt;p1&gt;=&lt;total_io&gt; | PATH:&lt;p2&gt;=&lt;total_io&gt; | ... | CURRENT_ACTIVE:&lt;chemin_courant&gt;</code></p>",
    "starter": "# Grille d'analyse (vrt3-c3-e3) — Moteur d'Arbitrage Multipathing MPIO (Round Robin & Fixed)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Politique FIXED avec panne et rétablissement du chemin préféré]\n# Données : POLICY=FIXED PATHS=hba1,hba2 PREFERRED=hba1 THRESHOLD=1000\n# Données : IO=2000\n# Données : FAIL=hba1\n# Données : IO=1500\n# Données : RECOVER=hba1\n# Données : IO=500\nA_COMPLETER\n\n[Cas 2 — Round Robin avec panne d'un chemin pendant le flux]\n# Données : POLICY=RR PATHS=p1,p2,p3 THRESHOLD=100\n# Données : IO=100\n# Données : IO=100\n# Données : FAIL=p3\n# Données : IO=200\nA_COMPLETER\n",
    "hints": [
      "En Round Robin, gérez un compteur d'I/O sur le chemin courant pour basculer dès que THRESHOLD est atteint.",
      "En cas d'événement FAIL, retirez le chemin des actifs ; s'il s'agissait du chemin courant, basculez vers le suivant."
    ],
    "examples": [
      {
        "stdin": "POLICY=RR PATHS=vmhba1:C0:T0:L0,vmhba2:C0:T0:L0 THRESHOLD=1000\nIO=1000\nIO=1000\nIO=500",
        "expected": "PATH:vmhba1:C0:T0:L0=1500 | PATH:vmhba2:C0:T0:L0=1000 | CURRENT_ACTIVE:vmhba1:C0:T0:L0\n",
        "note": "Round Robin alternant par tranche de 1000 I/O entre deux chemins."
      }
    ],
    "tests": [
      {
        "label": "Politique FIXED avec panne et rétablissement du chemin préféré",
        "stdin": "cas:1",
        "expected": "PATH:hba1=2500 | PATH:hba2=1500 | CURRENT_ACTIVE:hba1\n"
      },
      {
        "label": "Round Robin avec panne d'un chemin pendant le flux",
        "stdin": "cas:2",
        "expected": "PATH:p1=200 | PATH:p2=200 | PATH:p3=0 | CURRENT_ACTIVE:p1\n"
      }
    ],
    "solution": "[Exemple]\nPATH:vmhba1:C0:T0:L0=1500 | PATH:vmhba2:C0:T0:L0=1000 | CURRENT_ACTIVE:vmhba1:C0:T0:L0\n\n\n[Cas 1 — Politique FIXED avec panne et rétablissement du chemin préféré]\nPATH:hba1=2500 | PATH:hba2=1500 | CURRENT_ACTIVE:hba1\n\n\n[Cas 2 — Round Robin avec panne d'un chemin pendant le flux]\nPATH:p1=200 | PATH:p2=200 | PATH:p3=0 | CURRENT_ACTIVE:p1"
  },
  {
    "id": "vrt3-c4-e1",
    "chapter": 4,
    "title": "Validateur de Configuration vSwitch & Modes de Balisage VLAN (VST, EST, VGT)",
    "level": "n1",
    "language": "analyse",
    "goal": "Qualifier le mode de balisage VLAN (VST, EST, VGT) et valider la redondance des uplinks sur un Port Group vSwitch.",
    "brief": "<p>Sur un commutateur virtuel VMware vSwitch (Standard ou Distribué), le routage des trames 802.1Q dépend de l'identifiant VLAN configuré :<br><br>\n1. <strong>Modes de balisage VLAN</strong> :<br>\n- <code>VLAN_ID == 0</code> : Mode <code>EST</code> (<em>External Switch Tagging</em>, le commutateur physique externe gère le VLAN).<br>\n- <code>1 &le; VLAN_ID &le; 4094</code> : Mode <code>VST</code> (<em>Virtual Switch Tagging</em>, le vSwitch insère et retire le tag 802.1Q).<br>\n- <code>VLAN_ID == 4095</code> : Mode <code>VGT</code> (<em>Virtual Guest Tagging</em>, trunking direct jusqu'à l'OS de la machine virtuelle).<br>\n- Autre valeur : <code>INVALID_VLAN</code>.<br><br>\n2. <strong>Support des trames Jumbo</strong> :<br>\n- Si <code>MTU &ge; 9000</code> : <code>JUMBO_ENABLED</code>.<br>\n- Sinon : <code>STANDARD_MTU</code>.<br><br>\n3. <strong>Redondance des adaptateurs physiques (Uplinks)</strong> :<br>\n- Si la liste <code>UPLINKS</code> contient 2 cartes ou plus : <code>REDUNDANT</code>.<br>\n- Sinon : <code>SINGLE_UPLINK_WARNING</code>.<br><br>\nFormat d'entrée (les données d’entrée) :<br>\nLignes : <code>PG=&lt;nom&gt; VLAN=&lt;id&gt; UPLINKS=&lt;vmnic0,vmnic1,...&gt; MTU=&lt;1500|9000&gt;</code>.<br><br>\nFormat de sortie :<br>\n<code>PG:&lt;nom&gt; | VLAN:&lt;id&gt; | MODE:&lt;mode&gt; | FRAMES:&lt;frames&gt; | REDUNDANCY:&lt;red&gt;</code></p>",
    "starter": "# Grille d'analyse (vrt3-c4-e1) — Validateur de Configuration vSwitch & Modes de Balisage VLAN (VST, EST, VGT)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — VLAN ID invalide et MTU supérieure à 9000]\n# Données : PG=Storage-iSCSI VLAN=50 UPLINKS=vmnic1,vmnic2 MTU=9000\n# Données : PG=Bad-VLAN VLAN=5000 UPLINKS=vmnic0 MTU=1500\nA_COMPLETER\n\n[Cas 2 — VLAN limite 4094 en mode VST]\n# Données : PG=Guest-Trunk VLAN=4094 UPLINKS=vmnic0,vmnic1,vmnic2 MTU=1500\nA_COMPLETER\n",
    "hints": [
      "Vérifiez les valeurs réservées 0 (EST) et 4095 (VGT).",
      "Comptez le nombre de cartes dans la chaîne séparée par des virgules pour évaluer la redondance."
    ],
    "examples": [
      {
        "stdin": "PG=VM-Network VLAN=10 UPLINKS=vmnic0,vmnic1 MTU=1500\nPG=Management VLAN=0 UPLINKS=vmnic0 MTU=1500\nPG=vMotion-IP VLAN=4095 UPLINKS=vmnic2,vmnic3 MTU=9000",
        "expected": "PG:VM-Network | VLAN:10 | MODE:VST | FRAMES:STANDARD_MTU | REDUNDANCY:REDUNDANT\nPG:Management | VLAN:0 | MODE:EST | FRAMES:STANDARD_MTU | REDUNDANCY:SINGLE_UPLINK_WARNING\nPG:vMotion-IP | VLAN:4095 | MODE:VGT | FRAMES:JUMBO_ENABLED | REDUNDANCY:REDUNDANT\n",
        "note": "Validation des 3 modes VLAN canoniques VST, EST et VGT avec Jumbo Frames."
      }
    ],
    "tests": [
      {
        "label": "VLAN ID invalide et MTU supérieure à 9000",
        "stdin": "cas:1",
        "expected": "PG:Storage-iSCSI | VLAN:50 | MODE:VST | FRAMES:JUMBO_ENABLED | REDUNDANCY:REDUNDANT\nPG:Bad-VLAN | VLAN:5000 | MODE:INVALID_VLAN | FRAMES:STANDARD_MTU | REDUNDANCY:SINGLE_UPLINK_WARNING\n"
      },
      {
        "label": "VLAN limite 4094 en mode VST",
        "stdin": "cas:2",
        "expected": "PG:Guest-Trunk | VLAN:4094 | MODE:VST | FRAMES:STANDARD_MTU | REDUNDANCY:REDUNDANT\n"
      }
    ],
    "solution": "[Exemple]\nPG:VM-Network | VLAN:10 | MODE:VST | FRAMES:STANDARD_MTU | REDUNDANCY:REDUNDANT\nPG:Management | VLAN:0 | MODE:EST | FRAMES:STANDARD_MTU | REDUNDANCY:SINGLE_UPLINK_WARNING\nPG:vMotion-IP | VLAN:4095 | MODE:VGT | FRAMES:JUMBO_ENABLED | REDUNDANCY:REDUNDANT\n\n\n[Cas 1 — VLAN ID invalide et MTU supérieure à 9000]\nPG:Storage-iSCSI | VLAN:50 | MODE:VST | FRAMES:JUMBO_ENABLED | REDUNDANCY:REDUNDANT\nPG:Bad-VLAN | VLAN:5000 | MODE:INVALID_VLAN | FRAMES:STANDARD_MTU | REDUNDANCY:SINGLE_UPLINK_WARNING\n\n\n[Cas 2 — VLAN limite 4094 en mode VST]\nPG:Guest-Trunk | VLAN:4094 | MODE:VST | FRAMES:STANDARD_MTU | REDUNDANCY:REDUNDANT"
  },
  {
    "id": "vrt3-c4-e2",
    "chapter": 4,
    "title": "Simulateur de Politiques de Sécurité vSwitch (Promiscuous, MAC Changes, Forged Transmits)",
    "level": "n2",
    "language": "analyse",
    "goal": "Calculer le score de durcissement sécuritaire d'un vSwitch et filtrer les actions réseau non autorisées.",
    "brief": "<p>Les politiques de sécurité de niveau 2 sur un commutateur virtuel régulent les comportements des cartes vNIC :<br><br>\n1. <strong>Paramètres de sécurité (REJECT par défaut)</strong> :<br>\n- <code>PROMISC</code> (Mode promiscuous) : autorise ou refuse l'écoute de tout le trafic du vSwitch.<br>\n- <code>MAC_CHANGE</code> : autorise ou refuse la modification de l'adresse MAC par l'OS invité.<br>\n- <code>FORGED_TX</code> : autorise ou refuse l'émission de trames dont la MAC source est falsifiée.<br><br>\n2. <strong>Score de durcissement (Hardening Score sur 100%)</strong> :<br>\nChaque paramètre configuré à <code>REJECT</code> rapporte 33.33 points (soit 100% si tous à REJECT, 66.7% si deux, 33.3% si un, 0.0% si aucun).<br>\nStatut :<br>\n- <code>HARDENED</code> si score &ge; 99.0%<br>\n- <code>PERMISSIVE</code> si 50.0% &le; score &lt; 99.0%<br>\n- <code>VULNERABLE</code> si score &lt; 50.0%<br><br>\n3. <strong>Filtrage des actions</strong> :<br>\nPour une action donnée :<br>\n- <code>SNIFF</code> : <code>PERMITTED</code> si PROMISC=ACCEPT sinon <code>BLOCKED</code>.<br>\n- <code>RECV_NEW_MAC</code> : <code>PERMITTED</code> si MAC_CHANGE=ACCEPT sinon <code>BLOCKED</code>.<br>\n- <code>SEND_SPOOFED_MAC</code> : <code>PERMITTED</code> si FORGED_TX=ACCEPT sinon <code>BLOCKED</code>.<br><br>\nFormat d'entrée (les données d’entrée) :<br>\nLignes : <code>PG=&lt;nom&gt; PROMISC=&lt;ACCEPT|REJECT&gt; MAC_CHANGE=&lt;ACCEPT|REJECT&gt; FORGED_TX=&lt;ACCEPT|REJECT&gt; ACTIONS=&lt;a1,a2,...&gt;</code>.<br><br>\nFormat de sortie :<br>\n<code>PG:&lt;nom&gt; | HARDENING:&lt;score:.1f&gt;% (&lt;statut&gt;) | RESULTS:&lt;action1&gt;=&lt;PERMITTED|BLOCKED&gt;,&lt;action2&gt;=...</code></p>",
    "starter": "# Grille d'analyse (vrt3-c4-e2) — Simulateur de Politiques de Sécurité vSwitch (Promiscuous, MAC Changes, Forged Transmits)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Configuration intermédiaire permise]\n# Données : PG=Proxy-Net PROMISC=REJECT MAC_CHANGE=ACCEPT FORGED_TX=REJECT ACTIONS=SNIFF,RECV_NEW_MAC\nA_COMPLETER\n\n[Cas 2 — Toutes les options permissives à 0% de durcissement]\n# Données : PG=Zero-Sec PROMISC=ACCEPT MAC_CHANGE=ACCEPT FORGED_TX=ACCEPT ACTIONS=SEND_SPOOFED_MAC\nA_COMPLETER\n",
    "hints": [
      "Calculez le score en accordant (100.0 / 3.0) pour chaque règle configurée à REJECT.",
      "Vérifiez pour chaque action si la règle correspondante est à ACCEPT (PERMITTED) ou REJECT (BLOCKED)."
    ],
    "examples": [
      {
        "stdin": "PG=Secured-LAN PROMISC=REJECT MAC_CHANGE=REJECT FORGED_TX=REJECT ACTIONS=SNIFF,SEND_SPOOFED_MAC\nPG=Lab-Monitor PROMISC=ACCEPT MAC_CHANGE=ACCEPT FORGED_TX=REJECT ACTIONS=SNIFF,RECV_NEW_MAC,SEND_SPOOFED_MAC",
        "expected": "PG:Secured-LAN | HARDENING:100.0% (HARDENED) | RESULTS:SNIFF=BLOCKED,SEND_SPOOFED_MAC=BLOCKED\nPG:Lab-Monitor | HARDENING:33.3% (VULNERABLE) | RESULTS:SNIFF=PERMITTED,RECV_NEW_MAC=PERMITTED,SEND_SPOOFED_MAC=BLOCKED\n",
        "note": "Port Group entièrement durci vs Port Group permissif pour sonde d'écoute."
      }
    ],
    "tests": [
      {
        "label": "Configuration intermédiaire permise",
        "stdin": "cas:1",
        "expected": "PG:Proxy-Net | HARDENING:66.7% (PERMISSIVE) | RESULTS:SNIFF=BLOCKED,RECV_NEW_MAC=PERMITTED\n"
      },
      {
        "label": "Toutes les options permissives à 0% de durcissement",
        "stdin": "cas:2",
        "expected": "PG:Zero-Sec | HARDENING:0.0% (VULNERABLE) | RESULTS:SEND_SPOOFED_MAC=PERMITTED\n"
      }
    ],
    "solution": "[Exemple]\nPG:Secured-LAN | HARDENING:100.0% (HARDENED) | RESULTS:SNIFF=BLOCKED,SEND_SPOOFED_MAC=BLOCKED\nPG:Lab-Monitor | HARDENING:33.3% (VULNERABLE) | RESULTS:SNIFF=PERMITTED,RECV_NEW_MAC=PERMITTED,SEND_SPOOFED_MAC=BLOCKED\n\n\n[Cas 1 — Configuration intermédiaire permise]\nPG:Proxy-Net | HARDENING:66.7% (PERMISSIVE) | RESULTS:SNIFF=BLOCKED,RECV_NEW_MAC=PERMITTED\n\n\n[Cas 2 — Toutes les options permissives à 0% de durcissement]\nPG:Zero-Sec | HARDENING:0.0% (VULNERABLE) | RESULTS:SEND_SPOOFED_MAC=PERMITTED"
  },
  {
    "id": "vrt3-c4-e3",
    "chapter": 4,
    "title": "Calculateur de Régulation de Trafic Réseau (Traffic Shaping : Average, Peak, Burst Size)",
    "level": "n3",
    "language": "analyse",
    "goal": "Modéliser l'algorithme de lissage de trafic réseau (Token Bucket) et calculer la durée de transfert et le débit effectif.",
    "brief": "<p>Le Traffic Shaping sur un vSwitch régule la bande passante selon un algorithme de seau à jetons (Token Bucket) :<br><br>\n1. <strong>Paramètres du profil de régulation</strong> :<br>\n- <code>AVG_KBPS</code> : Débit moyen permanent alloué (en kbps).<br>\n- <code>PEAK_KBPS</code> : Débit maximal autorisé en période de pic (en kbps).<br>\n- <code>BURST_KB</code> : Capacité maximale du tampon de rafale (en Ko).<br><br>\n2. <strong>Calculs pour un transfert de <code>TRANSFER_MB</code> Mo</strong> :<br>\n- Volume total en kilobits : <code>total_kbits = TRANSFER_MB * 8000.0</code> (unité réseau : 1 Mo = 1 000 Ko = 8 000 kb).<br>\n- Capacité de rafale en kilobits : <code>burst_kbits = min(total_kbits, BURST_KB * 8.0)</code>.<br>\n- Durée de la phase de rafale : <code>burst_time_s = burst_kbits / PEAK_KBPS</code>.<br>\n- Volume restant à écouler au débit moyen : <code>remaining_kbits = total_kbits - burst_kbits</code>.<br>\n- Durée de la phase moyenne : <code>avg_time_s = remaining_kbits / AVG_KBPS</code>.<br>\n- Durée totale du transfert : <code>total_time_s = burst_time_s + avg_time_s</code>.<br>\n- Débit moyen effectif global : <code>effective_rate_kbps = total_kbits / total_time_s</code>.<br><br>\nFormat d'entrée (les données d’entrée) :<br>\nLignes : <code>PROFILE=&lt;nom&gt; AVG_KBPS=&lt;n&gt; PEAK_KBPS=&lt;n&gt; BURST_KB=&lt;n&gt; TRANSFER_MB=&lt;n&gt;</code>.<br><br>\nFormat de sortie :<br>\n<code>PROFILE:&lt;nom&gt; | BURST_TIME:&lt;burst_time_s:.2f&gt;s | TOTAL_TIME:&lt;total_time_s:.2f&gt;s | EFFECTIVE_RATE:&lt;effective_rate_kbps:.1f&gt;kbps</code></p>",
    "starter": "# Grille d'analyse (vrt3-c4-e3) — Calculateur de Régulation de Trafic Réseau (Traffic Shaping : Average, Peak, Burst Size)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Transfert très court entièrement contenu dans la rafale]\n# Données : PROFILE=Quick-Burst AVG_KBPS=5000 PEAK_KBPS=20000 BURST_KB=4000 TRANSFER_MB=1\nA_COMPLETER\n\n[Cas 2 — Très gros transfert dominé par le débit moyen]\n# Données : PROFILE=Heavy-Transfer AVG_KBPS=20000 PEAK_KBPS=80000 BURST_KB=10000 TRANSFER_MB=200\nA_COMPLETER\n",
    "hints": [
      "Convertissez les Mo en kilobits réseau : total_kbits = TRANSFER_MB * 8000.0.",
      "La rafale n'absorbe qu'au plus min(total_kbits, BURST_KB * 8.0) avant retour au débit moyen."
    ],
    "examples": [
      {
        "stdin": "PROFILE=Web-Policy AVG_KBPS=10000 PEAK_KBPS=40000 BURST_KB=5000 TRANSFER_MB=10\nPROFILE=DB-Replication AVG_KBPS=50000 PEAK_KBPS=100000 BURST_KB=10000 TRANSFER_MB=50",
        "expected": "PROFILE:Web-Policy | BURST_TIME:1.00s | TOTAL_TIME:5.00s | EFFECTIVE_RATE:16000.0kbps\nPROFILE:DB-Replication | BURST_TIME:0.80s | TOTAL_TIME:7.20s | EFFECTIVE_RATE:55555.6kbps\n",
        "note": "Calcul pour 10 Mo avec rafale 5 Mo vs 50 Mo avec rafale 10 Mo."
      }
    ],
    "tests": [
      {
        "label": "Transfert très court entièrement contenu dans la rafale",
        "stdin": "cas:1",
        "expected": "PROFILE:Quick-Burst | BURST_TIME:0.40s | TOTAL_TIME:0.40s | EFFECTIVE_RATE:20000.0kbps\n"
      },
      {
        "label": "Très gros transfert dominé par le débit moyen",
        "stdin": "cas:2",
        "expected": "PROFILE:Heavy-Transfer | BURST_TIME:1.00s | TOTAL_TIME:77.00s | EFFECTIVE_RATE:20779.2kbps\n"
      }
    ],
    "solution": "[Exemple]\nPROFILE:Web-Policy | BURST_TIME:1.00s | TOTAL_TIME:5.00s | EFFECTIVE_RATE:16000.0kbps\nPROFILE:DB-Replication | BURST_TIME:0.80s | TOTAL_TIME:7.20s | EFFECTIVE_RATE:55555.6kbps\n\n\n[Cas 1 — Transfert très court entièrement contenu dans la rafale]\nPROFILE:Quick-Burst | BURST_TIME:0.40s | TOTAL_TIME:0.40s | EFFECTIVE_RATE:20000.0kbps\n\n\n[Cas 2 — Très gros transfert dominé par le débit moyen]\nPROFILE:Heavy-Transfer | BURST_TIME:1.00s | TOTAL_TIME:77.00s | EFFECTIVE_RATE:20779.2kbps"
  },
  {
    "id": "vrt3-c5-e1",
    "chapter": 5,
    "title": "Estimateur de Durée & Débit de Migration vMotion (Taille RAM & Dirty Rate)",
    "level": "n1",
    "language": "analyse",
    "goal": "Estimer la durée et le volume de données transférées lors d'une migration à chaud vMotion selon la taille mémoire et le débit réseau.",
    "brief": "<p>La technologie VMware vSphere vMotion transfère la mémoire vive d'une machine virtuelle en marche sans rupture de service :<br><br>\n1. <strong>Débit réseau effectif vMotion</strong> :<br>\nvMotion exploite 80% de la bande passante physique de l'interface réseau :<br>\n<code>net_throughput_mbps = (NET_GBPS * 1024 * 0.8) / 8</code> (exprimé en Mo/s).<br><br>\n2. <strong>Test de convergence</strong> :<br>\nSi le rythme d'écriture mémoire de l'OS invité (<code>DIRTY_RATE_MBPS</code>) est supérieur ou égal au débit réseau disponible (<code>DIRTY_RATE_MBPS &ge; net_throughput_mbps</code>), la migration ne peut pas converger :<br>\nAfficher <code>CONVERGENCE_FAILURE</code>.<br><br>\n3. <strong>Volume transféré et durée de pré-copie</strong> :<br>\nVolume mémoire nominal en Mo : <code>ram_mb = RAM_GB * 1024</code>.<br>\nVolume cumulé intégrant les itérations de pré-copie :<br>\n<code>total_transferred_mb = ram_mb * (1.0 + (DIRTY_RATE_MBPS / net_throughput_mbps))</code>.<br>\nDurée totale de migration :<br>\n<code>duration_s = total_transferred_mb / net_throughput_mbps</code>.<br><br>\n4. <strong>Qualification opérationnelle</strong> :<br>\n- Si <code>duration_s &le; 30.0</code> : <code>RAPIDE</code><br>\n- Si <code>30.0 &lt; duration_s &le; 90.0</code> : <code>ACCEPTABLE</code><br>\n- Sinon : <code>LENT</code><br><br>\nFormat d'entrée (les données d’entrée) :<br>\nLignes : <code>VM=&lt;nom&gt; RAM_GB=&lt;n&gt; DIRTY_RATE_MBPS=&lt;n&gt; NET_GBPS=&lt;1|10|25&gt;</code>.<br><br>\nFormat de sortie :<br>\n<code>VM:&lt;nom&gt; | NET:&lt;NET_GBPS&gt;Gbps | TRANSFERRED:&lt;total_transferred_mb:.1f&gt;MB | DURATION:&lt;duration_s:.1f&gt;s | STATUT:&lt;statut&gt;</code></p>",
    "starter": "# Grille d'analyse (vrt3-c5-e1) — Estimateur de Durée & Débit de Migration vMotion (Taille RAM & Dirty Rate)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Liaison 25G ultra-rapide et durée acceptable]\n# Données : VM=vm-big RAM_GB=32 DIRTY_RATE_MBPS=100 NET_GBPS=25\n# Données : VM=vm-mid RAM_GB=16 DIRTY_RATE_MBPS=80 NET_GBPS=10\nA_COMPLETER\n\n[Cas 2 — Seuil limite de durée acceptable sur 60 secondes]\n# Données : VM=vm-heavy RAM_GB=48 DIRTY_RATE_MBPS=10 NET_GBPS=10\nA_COMPLETER\n",
    "hints": [
      "Calculez le débit réseau en Mo/s avec (NET_GBPS * 1024 * 0.8) / 8.",
      "Si DIRTY_RATE_MBPS >= net_throughput_mbps, affichez STATUT:CONVERGENCE_FAILURE."
    ],
    "examples": [
      {
        "stdin": "VM=vm-web01 RAM_GB=16 DIRTY_RATE_MBPS=20 NET_GBPS=10\nVM=vm-db01 RAM_GB=64 DIRTY_RATE_MBPS=50 NET_GBPS=1\nVM=vm-cache RAM_GB=8 DIRTY_RATE_MBPS=150 NET_GBPS=1",
        "expected": "VM:vm-web01 | NET:10Gbps | TRANSFERRED:16704.0MB | DURATION:16.3s | STATUT:RAPIDE\nVM:vm-db01 | NET:1Gbps | TRANSFERRED:97536.0MB | DURATION:952.5s | STATUT:LENT\nVM:vm-cache | NET:1Gbps | TRANSFERRED:0.0MB | DURATION:0.0s | STATUT:CONVERGENCE_FAILURE\n",
        "note": "Migration rapide sur lien 10G, migration lente sur lien 1G et échec de convergence."
      }
    ],
    "tests": [
      {
        "label": "Liaison 25G ultra-rapide et durée acceptable",
        "stdin": "cas:1",
        "expected": "VM:vm-big | NET:25Gbps | TRANSFERRED:34048.0MB | DURATION:13.3s | STATUT:RAPIDE\nVM:vm-mid | NET:10Gbps | TRANSFERRED:17664.0MB | DURATION:17.2s | STATUT:RAPIDE\n"
      },
      {
        "label": "Seuil limite de durée acceptable sur 60 secondes",
        "stdin": "cas:2",
        "expected": "VM:vm-heavy | NET:10Gbps | TRANSFERRED:49632.0MB | DURATION:48.5s | STATUT:ACCEPTABLE\n"
      }
    ],
    "solution": "[Exemple]\nVM:vm-web01 | NET:10Gbps | TRANSFERRED:16704.0MB | DURATION:16.3s | STATUT:RAPIDE\nVM:vm-db01 | NET:1Gbps | TRANSFERRED:97536.0MB | DURATION:952.5s | STATUT:LENT\nVM:vm-cache | NET:1Gbps | TRANSFERRED:0.0MB | DURATION:0.0s | STATUT:CONVERGENCE_FAILURE\n\n\n[Cas 1 — Liaison 25G ultra-rapide et durée acceptable]\nVM:vm-big | NET:25Gbps | TRANSFERRED:34048.0MB | DURATION:13.3s | STATUT:RAPIDE\nVM:vm-mid | NET:10Gbps | TRANSFERRED:17664.0MB | DURATION:17.2s | STATUT:RAPIDE\n\n\n[Cas 2 — Seuil limite de durée acceptable sur 60 secondes]\nVM:vm-heavy | NET:10Gbps | TRANSFERRED:49632.0MB | DURATION:48.5s | STATUT:ACCEPTABLE"
  },
  {
    "id": "vrt3-c5-e2",
    "chapter": 5,
    "title": "Calculateur d'Admission Control vSphere HA (Pourcentage de Cluster Réservé)",
    "level": "n2",
    "language": "analyse",
    "goal": "Calculer la réserve obligatoire de ressources de haute disponibilité vSphere HA et valider le contrôle d'admission.",
    "brief": "<p>vSphere HA (High Availability) garantit la tolérance aux pannes matérielles en réservant un quota de capacité de secours :<br><br>\n1. <strong>Pourcentage de réservation de cluster (HA Reserved %)</strong> :<br>\n<code>reserved_pct = (FAILURES / HOSTS) * 100.0</code>.<br><br>\n2. <strong>Capacités brutes et utilisables</strong> :<br>\n- <code>total_cpu = HOSTS * CPU_GHZ</code><br>\n- <code>total_ram = HOSTS * RAM_GB</code><br>\n- <code>avail_cpu = total_cpu * (1.0 - reserved_pct / 100.0)</code><br>\n- <code>avail_ram = total_ram * (1.0 - reserved_pct / 100.0)</code><br><br>\n3. <strong>Contrôle d'admission</strong> :<br>\nSi <code>VMS_CPU_GHZ &le; avail_cpu</code> ET <code>VMS_RAM_GB &le; avail_ram</code> :<br>\nStatut <code>ADMISSION_PASSED</code>.<br>\nSinon :<br>\nStatut <code>ADMISSION_FAILED</code>.<br><br>\nFormat d'entrée (les données d’entrée) :<br>\nLignes : <code>HOSTS=&lt;nb&gt; CPU_GHZ=&lt;nb&gt; RAM_GB=&lt;nb&gt; FAILURES=&lt;1|2&gt; VMS_CPU=&lt;nb&gt; VMS_RAM=&lt;nb&gt;</code>.<br><br>\nFormat de sortie :<br>\n<code>CLUSTER:&lt;HOSTS&gt;_HOSTS | HA_RESERVED:&lt;reserved_pct:.1f&gt;% | AVAIL_CPU:&lt;avail_cpu:.1f&gt;GHz | AVAIL_RAM:&lt;avail_ram:.1f&gt;GB | STATUS:&lt;status&gt;</code></p>",
    "starter": "# Grille d'analyse (vrt3-c5-e2) — Calculateur d'Admission Control vSphere HA (Pourcentage de Cluster Réservé)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Cluster 5 hôtes tolérant 2 pannes (40% réservé)]\n# Données : HOSTS=5 CPU_GHZ=60 RAM_GB=256 FAILURES=2 VMS_CPU=150 VMS_RAM=600\n# Données : HOSTS=6 CPU_GHZ=80 RAM_GB=512 FAILURES=1 VMS_CPU=450 VMS_RAM=2200\nA_COMPLETER\n\n[Cas 2 — Capacité disponible tout juste égale à la demande]\n# Données : HOSTS=2 CPU_GHZ=50 RAM_GB=128 FAILURES=1 VMS_CPU=50 VMS_RAM=128\nA_COMPLETER\n",
    "hints": [
      "Calculez le pourcentage réservé avec (FAILURES / HOSTS) * 100.0.",
      "Comparez la consommation des VMs à la capacité disponible après réserve."
    ],
    "examples": [
      {
        "stdin": "HOSTS=4 CPU_GHZ=40 RAM_GB=128 FAILURES=1 VMS_CPU=100 VMS_RAM=300\nHOSTS=3 CPU_GHZ=50 RAM_GB=256 FAILURES=1 VMS_CPU=110 VMS_RAM=400",
        "expected": "CLUSTER:4_HOSTS | HA_RESERVED:25.0% | AVAIL_CPU:120.0GHz | AVAIL_RAM:384.0GB | STATUS:ADMISSION_PASSED\nCLUSTER:3_HOSTS | HA_RESERVED:33.3% | AVAIL_CPU:100.0GHz | AVAIL_RAM:512.0GB | STATUS:ADMISSION_FAILED\n",
        "note": "Cluster 4 hôtes tolérant 1 panne (25% réservé) vs cluster 3 hôtes échouant sur le CPU (110 GHz > 100 GHz)."
      }
    ],
    "tests": [
      {
        "label": "Cluster 5 hôtes tolérant 2 pannes (40% réservé)",
        "stdin": "cas:1",
        "expected": "CLUSTER:5_HOSTS | HA_RESERVED:40.0% | AVAIL_CPU:180.0GHz | AVAIL_RAM:768.0GB | STATUS:ADMISSION_PASSED\nCLUSTER:6_HOSTS | HA_RESERVED:16.7% | AVAIL_CPU:400.0GHz | AVAIL_RAM:2560.0GB | STATUS:ADMISSION_FAILED\n"
      },
      {
        "label": "Capacité disponible tout juste égale à la demande",
        "stdin": "cas:2",
        "expected": "CLUSTER:2_HOSTS | HA_RESERVED:50.0% | AVAIL_CPU:50.0GHz | AVAIL_RAM:128.0GB | STATUS:ADMISSION_PASSED\n"
      }
    ],
    "solution": "[Exemple]\nCLUSTER:4_HOSTS | HA_RESERVED:25.0% | AVAIL_CPU:120.0GHz | AVAIL_RAM:384.0GB | STATUS:ADMISSION_PASSED\nCLUSTER:3_HOSTS | HA_RESERVED:33.3% | AVAIL_CPU:100.0GHz | AVAIL_RAM:512.0GB | STATUS:ADMISSION_FAILED\n\n\n[Cas 1 — Cluster 5 hôtes tolérant 2 pannes (40% réservé)]\nCLUSTER:5_HOSTS | HA_RESERVED:40.0% | AVAIL_CPU:180.0GHz | AVAIL_RAM:768.0GB | STATUS:ADMISSION_PASSED\nCLUSTER:6_HOSTS | HA_RESERVED:16.7% | AVAIL_CPU:400.0GHz | AVAIL_RAM:2560.0GB | STATUS:ADMISSION_FAILED\n\n\n[Cas 2 — Capacité disponible tout juste égale à la demande]\nCLUSTER:2_HOSTS | HA_RESERVED:50.0% | AVAIL_CPU:50.0GHz | AVAIL_RAM:128.0GB | STATUS:ADMISSION_PASSED"
  },
  {
    "id": "vrt3-c5-e3",
    "chapter": 5,
    "title": "Moteur de Recommandations DRS & Règles d'Anti-Affinité",
    "level": "n3",
    "language": "analyse",
    "goal": "Détecter les violations de règles d'anti-affinité et recommander des migrations DRS pour équilibrer la charge.",
    "brief": "<p>vSphere DRS (Distributed Resource Scheduler) veille au respect des contraintes d'emplacement et à l'équilibrage du cluster :<br><br>\n1. <strong>Règles d'anti-affinité</strong> :<br>\nUne règle <code>ANTI_AFFINITY=VM1+VM2</code> impose que les deux VMs ne doivent jamais résider sur le même hôte.<br>\nSi une violation est constatée (les deux VMs sont sur le même hôte <code>H_SRC</code>) :<br>\nLa deuxième VM (<code>VM2</code>) doit être migrée vers l'hôte actif disponible ayant l'utilisation CPU la plus faible.<br>\nRésultat d’analyse attendu : <code>VIOLATION:ANTI_AFFINITY | ACTION:MIGRATE <VM2> FROM <H_SRC> TO <H_DST></code>.<br><br>\n2. <strong>Équilibrage de charge (Load Balancing)</strong> :<br>\nS'il n'y a aucune violation d'anti-affinité, calculer l'écart entre l'hôte le plus chargé et le moins chargé :<br>\n<code>spread = max(CPU_PCT) - min(CPU_PCT)</code>.<br>\n- Si <code>spread &gt; 30.0%</code> : <code>DESEQUILIBRE | SPREAD:&lt;spread:.1f&gt;% | ACTION:REBALANCE_NEEDED</code>.<br>\n- Sinon : <code>EQUILIBRE | SPREAD:&lt;spread:.1f&gt;% | ACTION:NONE</code>.<br><br>\nFormat d'entrée (les données d’entrée) :<br>\nLigne 1 : <code>HOSTS=&lt;h1:cpu,h2:cpu,...&gt;</code>.<br>\nLigne 2 : <code>VMS=&lt;vmA:h,vmB:h,...&gt;</code>.<br>\nLigne 3 : <code>ANTI_AFFINITY=&lt;vm1+vm2|NONE&gt;</code>.<br><br>\nFormat de sortie :<br>\nLe statut et l'action recommandée selon les critères ci-dessus.</p>",
    "starter": "# Grille d'analyse (vrt3-c5-e3) — Moteur de Recommandations DRS & Règles d'Anti-Affinité\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Cluster équilibré sans violation]\n# Données : HOSTS=esxi01:50,esxi02:45,esxi03:55\n# Données : VMS=dc01:esxi01,dc02:esxi02\n# Données : ANTI_AFFINITY=dc01+dc02\nA_COMPLETER\n\n[Cas 2 — Déséquilibre de charge supérieur à 30%]\n# Données : HOSTS=esxi01:85,esxi02:25,esxi03:50\n# Données : VMS=vm1:esxi01,vm2:esxi02\n# Données : ANTI_AFFINITY=NONE\nA_COMPLETER\n",
    "hints": [
      "Vérifiez d'abord si les deux VMs d'une règle d'anti-affinité sont hébergées sur le même nœud.",
      "Pour la cible de migration, choisissez l'hôte différent ayant le CPU le plus faible."
    ],
    "examples": [
      {
        "stdin": "HOSTS=esxi01:80,esxi02:30,esxi03:40\nVMS=dc01:esxi01,dc02:esxi01,web:esxi02\nANTI_AFFINITY=dc01+dc02",
        "expected": "VIOLATION:ANTI_AFFINITY | ACTION:MIGRATE dc02 FROM esxi01 TO esxi02\n",
        "note": "Violation de la règle dc01+dc02 hébergés tous deux sur esxi01 ; migration de dc02 vers l'hôte le moins chargé (esxi02 à 30%)."
      }
    ],
    "tests": [
      {
        "label": "Cluster équilibré sans violation",
        "stdin": "cas:1",
        "expected": "EQUILIBRE | SPREAD:10.0% | ACTION:NONE\n"
      },
      {
        "label": "Déséquilibre de charge supérieur à 30%",
        "stdin": "cas:2",
        "expected": "DESEQUILIBRE | SPREAD:60.0% | ACTION:REBALANCE_NEEDED\n"
      }
    ],
    "solution": "[Exemple]\nVIOLATION:ANTI_AFFINITY | ACTION:MIGRATE dc02 FROM esxi01 TO esxi02\n\n\n[Cas 1 — Cluster équilibré sans violation]\nEQUILIBRE | SPREAD:10.0% | ACTION:NONE\n\n\n[Cas 2 — Déséquilibre de charge supérieur à 30%]\nDESEQUILIBRE | SPREAD:60.0% | ACTION:REBALANCE_NEEDED"
  },
  {
    "id": "vrt3-c6-e1",
    "chapter": 6,
    "title": "Parseur de Métadonnées XenServer / Citrix Hypervisor & Rôles Dom0 / DomU",
    "level": "n1",
    "language": "analyse",
    "goal": "Analyser les métadonnées d'un domaine XenServer (Citrix Hypervisor), qualifier les rôles Dom0/DomU et le mode de virtualisation.",
    "brief": "<p>L'architecture micro-noyau Xen distingue le domaine de contrôle (<code>Dom0</code>) des machines invitées (<code>DomU</code>) :<br><br>\n1. <strong>Règles architecturales</strong> :<br>\n- Si <code>DOMAIN_TYPE == \"DOM0\"</code> : Rôle <code>CONTROL_DOMAIN</code>, mode imposé <code>NATIVE</code> (accès matériel direct).<br>\n- Si <code>DOMAIN_TYPE == \"DOMU\"</code> : Rôle <code>GUEST_VM</code>, modes supportés : <code>PV</code> (paravirtualisation sans émulation) ou <code>HVM</code> (virtualisation assistée matériellement).<br>\n- Si une combinaison est incohérente (ex: Dom0 en mode PV/HVM ou DomU en mode NATIVE) : Statut <code>INVALID_XEN_TOPOLOGY</code>.<br><br>\n2. <strong>Identifiant UUID</strong> :<br>\nAfficher uniquement les 8 premiers caractères de l'UUID (préfixe court).<br><br>\nFormat d'entrée (les données d’entrée) :<br>\nLignes : <code>UUID=&lt;uuid&gt; NAME=&lt;nom&gt; DOMAIN_TYPE=&lt;DOM0|DOMU&gt; VIRT_MODE=&lt;NATIVE|PV|HVM&gt; MEMORY_MB=&lt;nb&gt; VCPUS=&lt;nb&gt;</code>.<br><br>\nFormat de sortie :<br>\n<code>VM:&lt;nom&gt; | UUID:&lt;uuid[:8]&gt; | TYPE:&lt;DOM0|DOMU&gt; | MODE:&lt;mode&gt; | ROLE:&lt;role&gt; | RAM:&lt;MEMORY_MB&gt;MB | VCPUS:&lt;VCPUS&gt;</code><br>\n(ou <code>ERROR:INVALID_XEN_TOPOLOGY</code> en cas d'incohérence).</p>",
    "starter": "# Grille d'analyse (vrt3-c6-e1) — Parseur de Métadonnées XenServer / Citrix Hypervisor & Rôles Dom0 / DomU\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Incohérence architecturale Dom0 avec mode HVM]\n# Données : UUID=deadbeef-1111-2222-3333-444455556666 NAME=Bad-Dom0 DOMAIN_TYPE=DOM0 VIRT_MODE=HVM MEMORY_MB=2048 VCPUS=2\nA_COMPLETER\n\n[Cas 2 — Incohérence architecturale DomU avec mode NATIVE]\n# Données : UUID=cafebabe-1111-2222-3333-444455556666 NAME=Bad-DomU DOMAIN_TYPE=DOMU VIRT_MODE=NATIVE MEMORY_MB=4096 VCPUS=4\nA_COMPLETER\n",
    "hints": [
      "Dom0 a obligatoirement le rôle CONTROL_DOMAIN et le mode NATIVE.",
      "DomU a obligatoirement le rôle GUEST_VM et le mode PV ou HVM."
    ],
    "examples": [
      {
        "stdin": "UUID=a84f32c1-829d-43cb-b09e-128492049182 NAME=Control-Domain DOMAIN_TYPE=DOM0 VIRT_MODE=NATIVE MEMORY_MB=4096 VCPUS=4\nUUID=b95e41a2-918c-42ba-c18f-993849182931 NAME=Linux-Web01 DOMAIN_TYPE=DOMU VIRT_MODE=PV MEMORY_MB=8192 VCPUS=2\nUUID=c12a93e3-718a-41aa-d09a-449182930192 NAME=Win-Desktop DOMAIN_TYPE=DOMU VIRT_MODE=HVM MEMORY_MB=16384 VCPUS=8",
        "expected": "VM:Control-Domain | UUID:a84f32c1 | TYPE:DOM0 | MODE:NATIVE | ROLE:CONTROL_DOMAIN | RAM:4096MB | VCPUS:4\nVM:Linux-Web01 | UUID:b95e41a2 | TYPE:DOMU | MODE:PV | ROLE:GUEST_VM | RAM:8192MB | VCPUS:2\nVM:Win-Desktop | UUID:c12a93e3 | TYPE:DOMU | MODE:HVM | ROLE:GUEST_VM | RAM:16384MB | VCPUS:8\n",
        "note": "Domaine de contrôle Dom0, invité Linux paravirtualisé PV et invité Windows HVM."
      }
    ],
    "tests": [
      {
        "label": "Incohérence architecturale Dom0 avec mode HVM",
        "stdin": "cas:1",
        "expected": "ERROR:INVALID_XEN_TOPOLOGY\n"
      },
      {
        "label": "Incohérence architecturale DomU avec mode NATIVE",
        "stdin": "cas:2",
        "expected": "ERROR:INVALID_XEN_TOPOLOGY\n"
      }
    ],
    "solution": "[Exemple]\nVM:Control-Domain | UUID:a84f32c1 | TYPE:DOM0 | MODE:NATIVE | ROLE:CONTROL_DOMAIN | RAM:4096MB | VCPUS:4\nVM:Linux-Web01 | UUID:b95e41a2 | TYPE:DOMU | MODE:PV | ROLE:GUEST_VM | RAM:8192MB | VCPUS:2\nVM:Win-Desktop | UUID:c12a93e3 | TYPE:DOMU | MODE:HVM | ROLE:GUEST_VM | RAM:16384MB | VCPUS:8\n\n\n[Cas 1 — Incohérence architecturale Dom0 avec mode HVM]\nERROR:INVALID_XEN_TOPOLOGY\n\n\n[Cas 2 — Incohérence architecturale DomU avec mode NATIVE]\nERROR:INVALID_XEN_TOPOLOGY"
  },
  {
    "id": "vrt3-c6-e2",
    "chapter": 6,
    "title": "Dimensionneur de Catalogue VDI (Postes Virtuels, IOPS par Utilisateur, RAM & Stockage)",
    "level": "n2",
    "language": "analyse",
    "goal": "Dimensionner les ressources matérielles nécessaires (vCPUs, RAM, IOPS, Stockage) pour un catalogue de postes virtuels VDI.",
    "brief": "<p>Le dimensionnement d'un parc de bureaux virtuels (VDI Citrix Virtual Desktops ou VMware Horizon) s'appuie sur des profils types d'utilisateurs :<br><br>\n1. <strong>Profils de postes de travail</strong> :<br>\n- <code>TASK_WORKER</code> : 2 vCPUs, 4 Go RAM, 10 IOPS, disque clone lié 20 Go.<br>\n- <code>KNOWLEDGE_WORKER</code> : 4 vCPUs, 8 Go RAM, 25 IOPS, disque 40 Go.<br>\n- <code>POWER_USER</code> : 8 vCPUs, 16 Go RAM, 60 IOPS, disque 80 Go.<br><br>\n2. <strong>Calcul de simultanéité</strong> :<br>\nUtilisateurs actifs simultanés :<br>\n<code>active_users = int(USERS * (CONCURRENT_PCT / 100.0))</code>.<br><br>\n3. <strong>Besoins calculés</strong> :<br>\n- <code>total_vcpus = active_users * profil.vcpus</code>.<br>\n- <code>total_ram_gb = active_users * profil.ram</code>.<br>\n- <code>total_iops = active_users * profil.iops</code>.<br>\n- <code>total_storage_gb = USERS * profil.disk</code> (le stockage est réservé pour la totalité des utilisateurs inscrits).<br><br>\nFormat d'entrée (les données d’entrée) :<br>\nLignes : <code>CATALOG=&lt;nom&gt; PROFILE=&lt;nom_profil&gt; USERS=&lt;nb&gt; CONCURRENT_PCT=&lt;pct&gt;</code>.<br><br>\nFormat de sortie :<br>\n<code>CATALOG:&lt;nom&gt; | ACTIVE:&lt;active_users&gt; | VCPUS:&lt;total_vcpus&gt; | RAM:&lt;total_ram_gb&gt;GB | IOPS:&lt;total_iops&gt; | STORAGE:&lt;total_storage_gb&gt;GB</code></p>",
    "starter": "# Grille d'analyse (vrt3-c6-e2) — Dimensionneur de Catalogue VDI (Postes Virtuels, IOPS par Utilisateur, RAM & Stockage)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Catalogue à 50% de simultanéité]\n# Données : CATALOG=Finance PROFILE=KNOWLEDGE_WORKER USERS=80 CONCURRENT_PCT=50.0\nA_COMPLETER\n\n[Cas 2 — Profil inconnu retournant une erreur]\n# Données : CATALOG=Custom PROFILE=UNKNOWN USERS=10 CONCURRENT_PCT=100.0\nA_COMPLETER\n",
    "hints": [
      "Associez à chaque profil ses caractéristiques (vcpus, ram, iops, disk).",
      "Le CPU, la RAM et les IOPS sont basés sur active_users, tandis que le stockage est calculé sur USERS total."
    ],
    "examples": [
      {
        "stdin": "CATALOG=CallCenter PROFILE=TASK_WORKER USERS=100 CONCURRENT_PCT=80.0\nCATALOG=Engineering PROFILE=POWER_USER USERS=20 CONCURRENT_PCT=100.0\nCATALOG=Sales PROFILE=KNOWLEDGE_WORKER USERS=50 CONCURRENT_PCT=60.0",
        "expected": "CATALOG:CallCenter | ACTIVE:80 | VCPUS:160 | RAM:320GB | IOPS:800 | STORAGE:2000GB\nCATALOG:Engineering | ACTIVE:20 | VCPUS:160 | RAM:320GB | IOPS:1200 | STORAGE:1600GB\nCATALOG:Sales | ACTIVE:30 | VCPUS:120 | RAM:240GB | IOPS:750 | STORAGE:2000GB\n",
        "note": "Catalogue centre d'appels, ingénierie avancée et équipe commerciale."
      }
    ],
    "tests": [
      {
        "label": "Catalogue à 50% de simultanéité",
        "stdin": "cas:1",
        "expected": "CATALOG:Finance | ACTIVE:40 | VCPUS:160 | RAM:320GB | IOPS:1000 | STORAGE:3200GB\n"
      },
      {
        "label": "Profil inconnu retournant une erreur",
        "stdin": "cas:2",
        "expected": "ERROR:UNKNOWN_VDI_PROFILE\n"
      }
    ],
    "solution": "[Exemple]\nCATALOG:CallCenter | ACTIVE:80 | VCPUS:160 | RAM:320GB | IOPS:800 | STORAGE:2000GB\nCATALOG:Engineering | ACTIVE:20 | VCPUS:160 | RAM:320GB | IOPS:1200 | STORAGE:1600GB\nCATALOG:Sales | ACTIVE:30 | VCPUS:120 | RAM:240GB | IOPS:750 | STORAGE:2000GB\n\n\n[Cas 1 — Catalogue à 50% de simultanéité]\nCATALOG:Finance | ACTIVE:40 | VCPUS:160 | RAM:320GB | IOPS:1000 | STORAGE:3200GB\n\n\n[Cas 2 — Profil inconnu retournant une erreur]\nERROR:UNKNOWN_VDI_PROFILE"
  },
  {
    "id": "vrt3-c6-e3",
    "chapter": 6,
    "title": "Calculateur de RPO/RTO & Volumétrie Sauvegarde Incrémentielle CBT (Changed Block Tracking)",
    "level": "n3",
    "language": "analyse",
    "goal": "Calculer la volumétrie d'une chaîne de sauvegarde CBT (Full + Incréments) et estimer le temps de restauration (RTO).",
    "brief": "<p>Les solutions de sauvegarde pour machines virtuelles exploitent l'API Changed Block Tracking (CBT) pour minimiser la volumétrie :<br><br>\n1. <strong>Taille de sauvegarde dédupliquée/compressée</strong> :<br>\n- Sauvegarde complète (Full) :<br>\n<code>full_gb = SIZE_GB / DEDUP_RATIO</code>.<br>\n- Incrément quotidien CBT (Changed Blocks) :<br>\n<code>inc_gb = (SIZE_GB * (DAILY_CHANGE_PCT / 100.0)) / DEDUP_RATIO</code>.<br><br>\n2. <strong>Volume total de la chaîne de sauvegarde</strong> :<br>\nPour une durée de rétention de <code>RETENTION_DAYS</code> jours (1 Full initial + <code>RETENTION_DAYS - 1</code> incréments) :<br>\n<code>total_chain_gb = full_gb + (RETENTION_DAYS - 1) * inc_gb</code>.<br><br>\n3. <strong>Temps de restauration complète (RTO)</strong> :<br>\nLe volume brut à réécrire sur le stockage est <code>SIZE_GB * 1024</code> Mo.<br>\nÀ une vitesse de restauration <code>RESTORE_MBPS</code> (en Mo/s) :<br>\n<code>rto_minutes = ((SIZE_GB * 1024) / RESTORE_MBPS) / 60.0</code>.<br><br>\nFormat d'entrée (les données d’entrée) :<br>\nLignes : <code>VM=&lt;nom&gt; SIZE_GB=&lt;n&gt; DAILY_CHANGE_PCT=&lt;pct&gt; RETENTION_DAYS=&lt;nb&gt; DEDUP_RATIO=&lt;nb&gt; RESTORE_MBPS=&lt;nb&gt;</code>.<br><br>\nFormat de sortie :<br>\n<code>VM:&lt;nom&gt; | FULL:&lt;full_gb:.1f&gt;GB | INC:&lt;inc_gb:.1f&gt;GB | TOTAL_CHAIN:&lt;total_chain_gb:.1f&gt;GB | RTO:&lt;rto_minutes:.1f&gt;min</code></p>",
    "starter": "# Grille d'analyse (vrt3-c6-e3) — Calculateur de RPO/RTO & Volumétrie Sauvegarde Incrémentielle CBT (Changed Block Tracking)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — VM ultra-lourde 2 To et forte rétention 30 jours]\n# Données : VM=vm-fileserver SIZE_GB=2048 DAILY_CHANGE_PCT=3.0 RETENTION_DAYS=30 DEDUP_RATIO=2.0 RESTORE_MBPS=250\nA_COMPLETER\n\n[Cas 2 — Rétention d'un seul jour (Full seul)]\n# Données : VM=vm-single SIZE_GB=200 DAILY_CHANGE_PCT=10.0 RETENTION_DAYS=1 DEDUP_RATIO=2.0 RESTORE_MBPS=200\nA_COMPLETER\n",
    "hints": [
      "Appliquez le ratio de déduplication au Full et à chaque incrément CBT.",
      "Calculez le RTO en minutes à partir du volume brut en Mo et de la vitesse RESTORE_MBPS."
    ],
    "examples": [
      {
        "stdin": "VM=vm-database SIZE_GB=500 DAILY_CHANGE_PCT=5.0 RETENTION_DAYS=7 DEDUP_RATIO=2.0 RESTORE_MBPS=150\nVM=vm-app-server SIZE_GB=100 DAILY_CHANGE_PCT=2.0 RETENTION_DAYS=14 DEDUP_RATIO=2.5 RESTORE_MBPS=100",
        "expected": "VM:vm-database | FULL:250.0GB | INC:12.5GB | TOTAL_CHAIN:325.0GB | RTO:56.9min\nVM:vm-app-server | FULL:40.0GB | INC:0.8GB | TOTAL_CHAIN:50.4GB | RTO:17.1min\n",
        "note": "Base de données 500 Go sur 7 jours avec 5% de modifications quotidiennes vs serveur applicatif 100 Go sur 14 jours."
      }
    ],
    "tests": [
      {
        "label": "VM ultra-lourde 2 To et forte rétention 30 jours",
        "stdin": "cas:1",
        "expected": "VM:vm-fileserver | FULL:1024.0GB | INC:30.7GB | TOTAL_CHAIN:1914.9GB | RTO:139.8min\n"
      },
      {
        "label": "Rétention d'un seul jour (Full seul)",
        "stdin": "cas:2",
        "expected": "VM:vm-single | FULL:100.0GB | INC:10.0GB | TOTAL_CHAIN:100.0GB | RTO:17.1min\n"
      }
    ],
    "solution": "[Exemple]\nVM:vm-database | FULL:250.0GB | INC:12.5GB | TOTAL_CHAIN:325.0GB | RTO:56.9min\nVM:vm-app-server | FULL:40.0GB | INC:0.8GB | TOTAL_CHAIN:50.4GB | RTO:17.1min\n\n\n[Cas 1 — VM ultra-lourde 2 To et forte rétention 30 jours]\nVM:vm-fileserver | FULL:1024.0GB | INC:30.7GB | TOTAL_CHAIN:1914.9GB | RTO:139.8min\n\n\n[Cas 2 — Rétention d'un seul jour (Full seul)]\nVM:vm-single | FULL:100.0GB | INC:10.0GB | TOTAL_CHAIN:100.0GB | RTO:17.1min"
  }
];
