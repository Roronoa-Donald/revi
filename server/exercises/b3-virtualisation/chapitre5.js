/**
 * server/exercises/b3-virtualisation/chapitre5.js — Exercices du Chapitre 5
 * Chapitre 5 : Haute Disponibilité, Clustering & Mobilité (HA, DRS & vMotion)
 */
'use strict';

module.exports = [
  {
    id: 'vrt3-c5-e1',
    chapter: 5,
    title: 'Estimateur de Durée & Débit de Migration vMotion (Taille RAM & Dirty Rate)',
    level: 'n1',
    language: 'python',
    goal: 'Estimer la durée et le volume de données transférées lors d\'une migration à chaud vMotion selon la taille mémoire et le débit réseau.',
    brief: `<p>La technologie VMware vSphere vMotion transfère la mémoire vive d'une machine virtuelle en marche sans rupture de service :<br><br>
1. <strong>Débit réseau effectif vMotion</strong> :<br>
vMotion exploite 80% de la bande passante physique de l'interface réseau :<br>
<code>net_throughput_mbps = (NET_GBPS * 1024 * 0.8) / 8</code> (exprimé en Mo/s).<br><br>
2. <strong>Test de convergence</strong> :<br>
Si le rythme d'écriture mémoire de l'OS invité (<code>DIRTY_RATE_MBPS</code>) est supérieur ou égal au débit réseau disponible (<code>DIRTY_RATE_MBPS &ge; net_throughput_mbps</code>), la migration ne peut pas converger :<br>
Afficher <code>CONVERGENCE_FAILURE</code>.<br><br>
3. <strong>Volume transféré et durée de pré-copie</strong> :<br>
Volume mémoire nominal en Mo : <code>ram_mb = RAM_GB * 1024</code>.<br>
Volume cumulé intégrant les itérations de pré-copie :<br>
<code>total_transferred_mb = ram_mb * (1.0 + (DIRTY_RATE_MBPS / net_throughput_mbps))</code>.<br>
Durée totale de migration :<br>
<code>duration_s = total_transferred_mb / net_throughput_mbps</code>.<br><br>
4. <strong>Qualification opérationnelle</strong> :<br>
- Si <code>duration_s &le; 30.0</code> : <code>RAPIDE</code><br>
- Si <code>30.0 &lt; duration_s &le; 90.0</code> : <code>ACCEPTABLE</code><br>
- Sinon : <code>LENT</code><br><br>
Format d'entrée (sur STDIN) :<br>
Lignes : <code>VM=&lt;nom&gt; RAM_GB=&lt;n&gt; DIRTY_RATE_MBPS=&lt;n&gt; NET_GBPS=&lt;1|10|25&gt;</code>.<br><br>
Format de sortie :<br>
<code>VM:&lt;nom&gt; | NET:&lt;NET_GBPS&gt;Gbps | TRANSFERRED:&lt;total_transferred_mb:.1f&gt;MB | DURATION:&lt;duration_s:.1f&gt;s | STATUT:&lt;statut&gt;</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer la convergence et la durée de migration vMotion
`,
    hints: [
      "Calculez le débit réseau en Mo/s avec (NET_GBPS * 1024 * 0.8) / 8.",
      "Si DIRTY_RATE_MBPS >= net_throughput_mbps, affichez STATUT:CONVERGENCE_FAILURE."
    ],
    examples: [
      {
        stdin: 'VM=vm-web01 RAM_GB=16 DIRTY_RATE_MBPS=20 NET_GBPS=10\nVM=vm-db01 RAM_GB=64 DIRTY_RATE_MBPS=50 NET_GBPS=1\nVM=vm-cache RAM_GB=8 DIRTY_RATE_MBPS=150 NET_GBPS=1',
        expected: `VM:vm-web01 | NET:10Gbps | TRANSFERRED:16704.0MB | DURATION:16.3s | STATUT:RAPIDE
VM:vm-db01 | NET:1Gbps | TRANSFERRED:97536.0MB | DURATION:952.5s | STATUT:LENT
VM:vm-cache | NET:1Gbps | TRANSFERRED:0.0MB | DURATION:0.0s | STATUT:CONVERGENCE_FAILURE
`,
        note: 'Migration rapide sur lien 10G, migration lente sur lien 1G et échec de convergence.'
      }
    ],
    tests: [
      {
        label: 'Liaison 25G ultra-rapide et durée acceptable',
        stdin: 'VM=vm-big RAM_GB=32 DIRTY_RATE_MBPS=100 NET_GBPS=25\nVM=vm-mid RAM_GB=16 DIRTY_RATE_MBPS=80 NET_GBPS=10',
        expected: `VM:vm-big | NET:25Gbps | TRANSFERRED:34048.0MB | DURATION:13.3s | STATUT:RAPIDE
VM:vm-mid | NET:10Gbps | TRANSFERRED:17664.0MB | DURATION:17.2s | STATUT:RAPIDE
`
      },
      {
        label: 'Seuil limite de durée acceptable sur 60 secondes',
        stdin: 'VM=vm-heavy RAM_GB=48 DIRTY_RATE_MBPS=10 NET_GBPS=10',
        expected: 'VM:vm-heavy | NET:10Gbps | TRANSFERRED:49632.0MB | DURATION:48.5s | STATUT:ACCEPTABLE\n'
      }
    ],
    solution: `import sys

for line in sys.stdin:
    line = line.strip()
    if not line:
        continue
    parts = dict(p.split("=", 1) for p in line.split())
    vm = parts.get("VM", "vm")
    ram_gb = float(parts.get("RAM_GB", 8))
    dirty_rate = float(parts.get("DIRTY_RATE_MBPS", 10))
    net_gbps = float(parts.get("NET_GBPS", 10))

    net_throughput = (net_gbps * 1024.0 * 0.8) / 8.0

    if dirty_rate >= net_throughput:
        print(f"VM:{vm} | NET:{int(net_gbps)}Gbps | TRANSFERRED:0.0MB | DURATION:0.0s | STATUT:CONVERGENCE_FAILURE")
        continue

    ram_mb = ram_gb * 1024.0
    total_transferred = ram_mb * (1.0 + (dirty_rate / net_throughput))
    duration = total_transferred / net_throughput

    if duration <= 30.0:
        statut = "RAPIDE"
    elif duration <= 90.0:
        statut = "ACCEPTABLE"
    else:
        statut = "LENT"

    print(f"VM:{vm} | NET:{int(net_gbps)}Gbps | TRANSFERRED:{total_transferred:.1f}MB | DURATION:{duration:.1f}s | STATUT:{statut}")
`
  },
  {
    id: 'vrt3-c5-e2',
    chapter: 5,
    title: 'Calculateur d\'Admission Control vSphere HA (Pourcentage de Cluster Réservé)',
    level: 'n2',
    language: 'python',
    goal: 'Calculer la réserve obligatoire de ressources de haute disponibilité vSphere HA et valider le contrôle d\'admission.',
    brief: `<p>vSphere HA (High Availability) garantit la tolérance aux pannes matérielles en réservant un quota de capacité de secours :<br><br>
1. <strong>Pourcentage de réservation de cluster (HA Reserved %)</strong> :<br>
<code>reserved_pct = (FAILURES / HOSTS) * 100.0</code>.<br><br>
2. <strong>Capacités brutes et utilisables</strong> :<br>
- <code>total_cpu = HOSTS * CPU_GHZ</code><br>
- <code>total_ram = HOSTS * RAM_GB</code><br>
- <code>avail_cpu = total_cpu * (1.0 - reserved_pct / 100.0)</code><br>
- <code>avail_ram = total_ram * (1.0 - reserved_pct / 100.0)</code><br><br>
3. <strong>Contrôle d'admission</strong> :<br>
Si <code>VMS_CPU_GHZ &le; avail_cpu</code> ET <code>VMS_RAM_GB &le; avail_ram</code> :<br>
Statut <code>ADMISSION_PASSED</code>.<br>
Sinon :<br>
Statut <code>ADMISSION_FAILED</code>.<br><br>
Format d'entrée (sur STDIN) :<br>
Lignes : <code>HOSTS=&lt;nb&gt; CPU_GHZ=&lt;nb&gt; RAM_GB=&lt;nb&gt; FAILURES=&lt;1|2&gt; VMS_CPU=&lt;nb&gt; VMS_RAM=&lt;nb&gt;</code>.<br><br>
Format de sortie :<br>
<code>CLUSTER:&lt;HOSTS&gt;_HOSTS | HA_RESERVED:&lt;reserved_pct:.1f&gt;% | AVAIL_CPU:&lt;avail_cpu:.1f&gt;GHz | AVAIL_RAM:&lt;avail_ram:.1f&gt;GB | STATUS:&lt;status&gt;</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer les réserves HA et valider le contrôle d'admission
`,
    hints: [
      "Calculez le pourcentage réservé avec (FAILURES / HOSTS) * 100.0.",
      "Comparez la consommation des VMs à la capacité disponible après réserve."
    ],
    examples: [
      {
        stdin: 'HOSTS=4 CPU_GHZ=40 RAM_GB=128 FAILURES=1 VMS_CPU=100 VMS_RAM=300\nHOSTS=3 CPU_GHZ=50 RAM_GB=256 FAILURES=1 VMS_CPU=110 VMS_RAM=400',
        expected: `CLUSTER:4_HOSTS | HA_RESERVED:25.0% | AVAIL_CPU:120.0GHz | AVAIL_RAM:384.0GB | STATUS:ADMISSION_PASSED
CLUSTER:3_HOSTS | HA_RESERVED:33.3% | AVAIL_CPU:100.0GHz | AVAIL_RAM:512.0GB | STATUS:ADMISSION_FAILED
`,
        note: 'Cluster 4 hôtes tolérant 1 panne (25% réservé) vs cluster 3 hôtes échouant sur le CPU (110 GHz > 100 GHz).'
      }
    ],
    tests: [
      {
        label: 'Cluster 5 hôtes tolérant 2 pannes (40% réservé)',
        stdin: 'HOSTS=5 CPU_GHZ=60 RAM_GB=256 FAILURES=2 VMS_CPU=150 VMS_RAM=600\nHOSTS=6 CPU_GHZ=80 RAM_GB=512 FAILURES=1 VMS_CPU=450 VMS_RAM=2200',
        expected: `CLUSTER:5_HOSTS | HA_RESERVED:40.0% | AVAIL_CPU:180.0GHz | AVAIL_RAM:768.0GB | STATUS:ADMISSION_PASSED
CLUSTER:6_HOSTS | HA_RESERVED:16.7% | AVAIL_CPU:400.0GHz | AVAIL_RAM:2560.0GB | STATUS:ADMISSION_FAILED
`
      },
      {
        label: 'Capacité disponible tout juste égale à la demande',
        stdin: 'HOSTS=2 CPU_GHZ=50 RAM_GB=128 FAILURES=1 VMS_CPU=50 VMS_RAM=128',
        expected: 'CLUSTER:2_HOSTS | HA_RESERVED:50.0% | AVAIL_CPU:50.0GHz | AVAIL_RAM:128.0GB | STATUS:ADMISSION_PASSED\n'
      }
    ],
    solution: `import sys

for line in sys.stdin:
    line = line.strip()
    if not line:
        continue
    parts = dict(p.split("=", 1) for p in line.split())
    hosts = int(parts.get("HOSTS", 4))
    cpu_ghz = float(parts.get("CPU_GHZ", 40))
    ram_gb = float(parts.get("RAM_GB", 128))
    failures = int(parts.get("FAILURES", 1))
    vms_cpu = float(parts.get("VMS_CPU", 100))
    vms_ram = float(parts.get("VMS_RAM", 300))

    reserved_pct = (failures / hosts) * 100.0

    total_cpu = hosts * cpu_ghz
    total_ram = hosts * ram_gb

    avail_cpu = total_cpu * (1.0 - reserved_pct / 100.0)
    avail_ram = total_ram * (1.0 - reserved_pct / 100.0)

    if vms_cpu <= avail_cpu and vms_ram <= avail_ram:
        status = "ADMISSION_PASSED"
    else:
        status = "ADMISSION_FAILED"

    print(f"CLUSTER:{hosts}_HOSTS | HA_RESERVED:{reserved_pct:.1f}% | AVAIL_CPU:{avail_cpu:.1f}GHz | AVAIL_RAM:{avail_ram:.1f}GB | STATUS:{status}")
`
  },
  {
    id: 'vrt3-c5-e3',
    chapter: 5,
    title: 'Moteur de Recommandations DRS & Règles d\'Anti-Affinité',
    level: 'n3',
    language: 'python',
    goal: 'Détecter les violations de règles d\'anti-affinité et recommander des migrations DRS pour équilibrer la charge.',
    brief: `<p>vSphere DRS (Distributed Resource Scheduler) veille au respect des contraintes d'emplacement et à l'équilibrage du cluster :<br><br>
1. <strong>Règles d'anti-affinité</strong> :<br>
Une règle <code>ANTI_AFFINITY=VM1+VM2</code> impose que les deux VMs ne doivent jamais résider sur le même hôte.<br>
Si une violation est constatée (les deux VMs sont sur le même hôte <code>H_SRC</code>) :<br>
La deuxième VM (<code>VM2</code>) doit être migrée vers l'hôte actif disponible ayant l'utilisation CPU la plus faible.<br>
Sortie : <code>VIOLATION:ANTI_AFFINITY | ACTION:MIGRATE <VM2> FROM <H_SRC> TO <H_DST></code>.<br><br>
2. <strong>Équilibrage de charge (Load Balancing)</strong> :<br>
S'il n'y a aucune violation d'anti-affinité, calculer l'écart entre l'hôte le plus chargé et le moins chargé :<br>
<code>spread = max(CPU_PCT) - min(CPU_PCT)</code>.<br>
- Si <code>spread &gt; 30.0%</code> : <code>DESEQUILIBRE | SPREAD:&lt;spread:.1f&gt;% | ACTION:REBALANCE_NEEDED</code>.<br>
- Sinon : <code>EQUILIBRE | SPREAD:&lt;spread:.1f&gt;% | ACTION:NONE</code>.<br><br>
Format d'entrée (sur STDIN) :<br>
Ligne 1 : <code>HOSTS=&lt;h1:cpu,h2:cpu,...&gt;</code>.<br>
Ligne 2 : <code>VMS=&lt;vmA:h,vmB:h,...&gt;</code>.<br>
Ligne 3 : <code>ANTI_AFFINITY=&lt;vm1+vm2|NONE&gt;</code>.<br><br>
Format de sortie :<br>
Le statut et l'action recommandée selon les critères ci-dessus.</p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : analyser les règles d'anti-affinité et évaluer le déséquilibre de charge DRS
`,
    hints: [
      "Vérifiez d'abord si les deux VMs d'une règle d'anti-affinité sont hébergées sur le même nœud.",
      "Pour la cible de migration, choisissez l'hôte différent ayant le CPU le plus faible."
    ],
    examples: [
      {
        stdin: `HOSTS=esxi01:80,esxi02:30,esxi03:40
VMS=dc01:esxi01,dc02:esxi01,web:esxi02
ANTI_AFFINITY=dc01+dc02`,
        expected: 'VIOLATION:ANTI_AFFINITY | ACTION:MIGRATE dc02 FROM esxi01 TO esxi02\n',
        note: 'Violation de la règle dc01+dc02 hébergés tous deux sur esxi01 ; migration de dc02 vers l\'hôte le moins chargé (esxi02 à 30%).'
      }
    ],
    tests: [
      {
        label: 'Cluster équilibré sans violation',
        stdin: `HOSTS=esxi01:50,esxi02:45,esxi03:55
VMS=dc01:esxi01,dc02:esxi02
ANTI_AFFINITY=dc01+dc02`,
        expected: 'EQUILIBRE | SPREAD:10.0% | ACTION:NONE\n'
      },
      {
        label: 'Déséquilibre de charge supérieur à 30%',
        stdin: `HOSTS=esxi01:85,esxi02:25,esxi03:50
VMS=vm1:esxi01,vm2:esxi02
ANTI_AFFINITY=NONE`,
        expected: 'DESEQUILIBRE | SPREAD:60.0% | ACTION:REBALANCE_NEEDED\n'
      }
    ],
    solution: `import sys

lines = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]
if len(lines) < 3:
    sys.exit(0)

# Ligne 1 : HOSTS=esxi01:80,esxi02:30...
hosts_raw = lines[0].split("=", 1)[1]
hosts = {}
for item in hosts_raw.split(","):
    if ":" in item:
        h, cpu = item.split(":", 1)
        hosts[h.strip()] = float(cpu.strip())

# Ligne 2 : VMS=dc01:esxi01,dc02:esxi01...
vms_raw = lines[1].split("=", 1)[1]
vms = {}
for item in vms_raw.split(","):
    if ":" in item:
        v, h = item.split(":", 1)
        vms[v.strip()] = h.strip()

# Ligne 3 : ANTI_AFFINITY=dc01+dc02 ou NONE
rule_raw = lines[2].split("=", 1)[1].strip()

# 1. Vérifier l'anti-affinité
if rule_raw != "NONE" and "+" in rule_raw:
    vm1, vm2 = [x.strip() for x in rule_raw.split("+", 1)]
    if vm1 in vms and vm2 in vms and vms[vm1] == vms[vm2]:
        src_host = vms[vm2]
        other_hosts = [h for h in hosts if h != src_host]
        if other_hosts:
            dst_host = min(other_hosts, key=lambda h: hosts[h])
            print(f"VIOLATION:ANTI_AFFINITY | ACTION:MIGRATE {vm2} FROM {src_host} TO {dst_host}")
            sys.exit(0)

# 2. Vérifier l'équilibrage
cpu_vals = list(hosts.values())
spread = max(cpu_vals) - min(cpu_vals)

if spread > 30.0:
    print(f"DESEQUILIBRE | SPREAD:{spread:.1f}% | ACTION:REBALANCE_NEEDED")
else:
    print(f"EQUILIBRE | SPREAD:{spread:.1f}% | ACTION:NONE")
`
  }
];
