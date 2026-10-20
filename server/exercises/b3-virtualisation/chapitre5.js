'use strict';

module.exports = [
  {
    "id": "vrt3-c5-e1",
    "chapter": 5,
    "title": "Estimateur de Durée & Débit de Migration vMotion (Taille RAM & Dirty Rate)",
    "level": "n1",
    "language": "analyse",
    "goal": "Estimer la durée et le volume de données transférées lors d'une migration à chaud vMotion selon la taille mémoire et le débit réseau.",
    "brief": "<p>La technologie VMware vSphere vMotion transfère la mémoire vive d'une machine virtuelle en marche sans rupture de service :<br><br>\n1. <strong>Débit réseau effectif vMotion</strong> :<br>\nvMotion exploite 80% de la bande passante physique de l'interface réseau :<br>\n<code>net_throughput_mbps = (NET_GBPS * 1024 * 0.8) / 8</code> (exprimé en Mo/s).<br><br>\n2. <strong>Test de convergence</strong> :<br>\nSi le rythme d'écriture mémoire de l'OS invité (<code>DIRTY_RATE_MBPS</code>) est supérieur ou égal au débit réseau disponible (<code>DIRTY_RATE_MBPS &ge; net_throughput_mbps</code>), la migration ne peut pas converger :<br>\nAfficher <code>CONVERGENCE_FAILURE</code>.<br><br>\n3. <strong>Volume transféré et durée de pré-copie</strong> :<br>\nVolume mémoire nominal en Mo : <code>ram_mb = RAM_GB * 1024</code>.<br>\nVolume cumulé intégrant les itérations de pré-copie :<br>\n<code>total_transferred_mb = ram_mb * (1.0 + (DIRTY_RATE_MBPS / net_throughput_mbps))</code>.<br>\nDurée totale de migration :<br>\n<code>duration_s = total_transferred_mb / net_throughput_mbps</code>.<br><br>\n4. <strong>Qualification opérationnelle</strong> :<br>\n- Si <code>duration_s &le; 30.0</code> : <code>RAPIDE</code><br>\n- Si <code>30.0 &lt; duration_s &le; 90.0</code> : <code>ACCEPTABLE</code><br>\n- Sinon : <code>LENT</code><br><br>\nFormat d'entrée (sur STDIN) :<br>\nLignes : <code>VM=&lt;nom&gt; RAM_GB=&lt;n&gt; DIRTY_RATE_MBPS=&lt;n&gt; NET_GBPS=&lt;1|10|25&gt;</code>.<br><br>\nFormat de sortie :<br>\n<code>VM:&lt;nom&gt; | NET:&lt;NET_GBPS&gt;Gbps | TRANSFERRED:&lt;total_transferred_mb:.1f&gt;MB | DURATION:&lt;duration_s:.1f&gt;s | STATUT:&lt;statut&gt;</code></p>",
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
    "brief": "<p>vSphere HA (High Availability) garantit la tolérance aux pannes matérielles en réservant un quota de capacité de secours :<br><br>\n1. <strong>Pourcentage de réservation de cluster (HA Reserved %)</strong> :<br>\n<code>reserved_pct = (FAILURES / HOSTS) * 100.0</code>.<br><br>\n2. <strong>Capacités brutes et utilisables</strong> :<br>\n- <code>total_cpu = HOSTS * CPU_GHZ</code><br>\n- <code>total_ram = HOSTS * RAM_GB</code><br>\n- <code>avail_cpu = total_cpu * (1.0 - reserved_pct / 100.0)</code><br>\n- <code>avail_ram = total_ram * (1.0 - reserved_pct / 100.0)</code><br><br>\n3. <strong>Contrôle d'admission</strong> :<br>\nSi <code>VMS_CPU_GHZ &le; avail_cpu</code> ET <code>VMS_RAM_GB &le; avail_ram</code> :<br>\nStatut <code>ADMISSION_PASSED</code>.<br>\nSinon :<br>\nStatut <code>ADMISSION_FAILED</code>.<br><br>\nFormat d'entrée (sur STDIN) :<br>\nLignes : <code>HOSTS=&lt;nb&gt; CPU_GHZ=&lt;nb&gt; RAM_GB=&lt;nb&gt; FAILURES=&lt;1|2&gt; VMS_CPU=&lt;nb&gt; VMS_RAM=&lt;nb&gt;</code>.<br><br>\nFormat de sortie :<br>\n<code>CLUSTER:&lt;HOSTS&gt;_HOSTS | HA_RESERVED:&lt;reserved_pct:.1f&gt;% | AVAIL_CPU:&lt;avail_cpu:.1f&gt;GHz | AVAIL_RAM:&lt;avail_ram:.1f&gt;GB | STATUS:&lt;status&gt;</code></p>",
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
    "brief": "<p>vSphere DRS (Distributed Resource Scheduler) veille au respect des contraintes d'emplacement et à l'équilibrage du cluster :<br><br>\n1. <strong>Règles d'anti-affinité</strong> :<br>\nUne règle <code>ANTI_AFFINITY=VM1+VM2</code> impose que les deux VMs ne doivent jamais résider sur le même hôte.<br>\nSi une violation est constatée (les deux VMs sont sur le même hôte <code>H_SRC</code>) :<br>\nLa deuxième VM (<code>VM2</code>) doit être migrée vers l'hôte actif disponible ayant l'utilisation CPU la plus faible.<br>\nSortie : <code>VIOLATION:ANTI_AFFINITY | ACTION:MIGRATE <VM2> FROM <H_SRC> TO <H_DST></code>.<br><br>\n2. <strong>Équilibrage de charge (Load Balancing)</strong> :<br>\nS'il n'y a aucune violation d'anti-affinité, calculer l'écart entre l'hôte le plus chargé et le moins chargé :<br>\n<code>spread = max(CPU_PCT) - min(CPU_PCT)</code>.<br>\n- Si <code>spread &gt; 30.0%</code> : <code>DESEQUILIBRE | SPREAD:&lt;spread:.1f&gt;% | ACTION:REBALANCE_NEEDED</code>.<br>\n- Sinon : <code>EQUILIBRE | SPREAD:&lt;spread:.1f&gt;% | ACTION:NONE</code>.<br><br>\nFormat d'entrée (sur STDIN) :<br>\nLigne 1 : <code>HOSTS=&lt;h1:cpu,h2:cpu,...&gt;</code>.<br>\nLigne 2 : <code>VMS=&lt;vmA:h,vmB:h,...&gt;</code>.<br>\nLigne 3 : <code>ANTI_AFFINITY=&lt;vm1+vm2|NONE&gt;</code>.<br><br>\nFormat de sortie :<br>\nLe statut et l'action recommandée selon les critères ci-dessus.</p>",
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
  }
];
