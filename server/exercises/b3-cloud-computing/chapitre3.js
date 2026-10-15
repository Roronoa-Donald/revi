/**
 * Exercices du chapitre 3 — Cloud Computing B3.
 * Technologies de Virtualisation, Hyperviseurs & Dimensionnement d'Instances.
 */
'use strict';

module.exports = [
  {
    id: 'cc3-c3-e1',
    chapter: 3,
    title: 'Classificateur d’hyperviseurs (Bare-Metal vs Hosted, HVM vs PV)',
    level: 'n1',
    language: 'python',
    goal: 'Identifier le type architectural d’hyperviseur et le mode d’émulation matérielle pour qualifier son overhead et son adéquation Cloud.',
    brief: '<p>Le script lit sur l\'entrée standard des déclarations :<br>\n<code>HYPERVISEUR nom=&lt;nom&gt; COUCHE=&lt;BARE_METAL|HOSTED&gt; ACCEL=&lt;OUI|NON&gt; OVERHEAD=&lt;pct&gt;</code>.<br>\nRègles de classification :<br>\n- <strong>Type architectural</strong> : <code>TYPE_1_BARE_METAL</code> si <code>COUCHE == BARE_METAL</code>, sinon <code>TYPE_2_HOSTED</code>.<br>\n- <strong>Mode d’exécution</strong> : <code>HVM</code> (Hardware Virtual Machine) si <code>ACCEL == OUI</code> (Intel VT-x / AMD-V actif), sinon <code>PV</code> (Paravirtualisation avec modification du noyau invité).<br>\n- <strong>Performance</strong> :<br>\n  - Si <code>OVERHEAD &lt;= 3.0</code> : <code>PERF=OPTIMALE</code><br>\n  - Sinon si <code>OVERHEAD &lt;= 8.0</code> : <code>PERF=BONNE</code><br>\n  - Sinon : <code>PERF=DEGRADEE</code><br><br>\nAfficher :<br>\n<code>HYPERVISEUR: &lt;nom&gt; -&gt; ARCH=&lt;TYPE&gt; | MODE=&lt;MODE&gt; | PERF=&lt;PERF&gt; (OVERHEAD=&lt;OVERHEAD:.1f&gt;%)</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : classifier les hyperviseurs
`,
    hints: [
      'Les hyperviseurs de Type 1 (ESXi, KVM, Xen) tournent directement sur le matériel.',
      'Le mode HVM exploite la virtualisation assistée par le processeur hôte.'
    ],
    examples: [
      {
        stdin: 'HYPERVISEUR nom=kvm_prod COUCHE=BARE_METAL ACCEL=OUI OVERHEAD=1.8\nHYPERVISEUR nom=virtualbox_dev COUCHE=HOSTED ACCEL=OUI OVERHEAD=9.2\nHYPERVISEUR nom=xen_legacy COUCHE=BARE_METAL ACCEL=NON OVERHEAD=4.5',
        expected: 'HYPERVISEUR: kvm_prod -> ARCH=TYPE_1_BARE_METAL | MODE=HVM | PERF=OPTIMALE (OVERHEAD=1.8%)\nHYPERVISEUR: virtualbox_dev -> ARCH=TYPE_2_HOSTED | MODE=HVM | PERF=DEGRADEE (OVERHEAD=9.2%)\nHYPERVISEUR: xen_legacy -> ARCH=TYPE_1_BARE_METAL | MODE=PV | PERF=BONNE (OVERHEAD=4.5%)',
        note: 'KVM bare-metal avec HVM offre les meilleures performances en production Cloud.'
      }
    ],
    tests: [
      {
        label: 'VMware ESXi Datacenter',
        stdin: 'HYPERVISEUR nom=esxi_cluster COUCHE=BARE_METAL ACCEL=OUI OVERHEAD=2.1',
        expected: 'HYPERVISEUR: esxi_cluster -> ARCH=TYPE_1_BARE_METAL | MODE=HVM | PERF=OPTIMALE (OVERHEAD=2.1%)'
      },
      {
        label: 'Poste de travail avec VMware Workstation',
        stdin: 'HYPERVISEUR nom=vm_workstation COUCHE=HOSTED ACCEL=OUI OVERHEAD=7.5',
        expected: 'HYPERVISEUR: vm_workstation -> ARCH=TYPE_2_HOSTED | MODE=HVM | PERF=BONNE (OVERHEAD=7.5%)'
      },
      {
        label: 'Vieux conteneur hébergé sans assistance CPU',
        stdin: 'HYPERVISEUR nom=vserver_old COUCHE=HOSTED ACCEL=NON OVERHEAD=12.0',
        expected: 'HYPERVISEUR: vserver_old -> ARCH=TYPE_2_HOSTED | MODE=PV | PERF=DEGRADEE (OVERHEAD=12.0%)'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    m = re.search(r'nom=([^\\s]+).*?COUCHE=([^\\s]+).*?ACCEL=([^\\s]+).*?OVERHEAD=([0-9.]+)', lig)
    if not m:
        continue
    nom, couche, accel, ovh = m.group(1), m.group(2), m.group(3), float(m.group(4))
    
    arch = 'TYPE_1_BARE_METAL' if couche == 'BARE_METAL' else 'TYPE_2_HOSTED'
    mode = 'HVM' if accel == 'OUI' else 'PV'
    
    if ovh <= 3.0:
        perf = 'OPTIMALE'
    elif ovh <= 8.0:
        perf = 'BONNE'
    else:
        perf = 'DEGRADEE'
        
    print(f"HYPERVISEUR: {nom} -> ARCH={arch} | MODE={mode} | PERF={perf} (OVERHEAD={ovh:.1f}%)")
`
  },
  {
    id: 'cc3-c3-e2',
    chapter: 3,
    title: 'Calculateur de consolidation et sur-allocation (Overcommitment)',
    level: 'n2',
    language: 'python',
    goal: 'Vérifier la faisabilité d’hébergement d’un lot de machines virtuelles sur un hôte physique selon les plafonds de sur-allocation vCPU et RAM.',
    brief: '<p>Le script lit la spécification de l’hôte physique puis la liste des VMs :<br>\n<code>HOTE pcpu=&lt;p&gt; ram_gb=&lt;r&gt; max_vcpu_ratio=&lt;m_v&gt; max_ram_ratio=&lt;m_r&gt;</code><br>\n<code>VM id=&lt;id&gt; vcpu=&lt;v&gt; ram_gb=&lt;rg&gt;</code> (plusieurs lignes).<br><br>\nCalculs :<br>\n- $VCPU_{total} = \\sum vcpu$<br>\n- $RAM_{total} = \\sum ram\\_gb$<br>\n- $Ratio_{vcpu} = VCPU_{total} / pcpu$<br>\n- $Ratio_{ram} = RAM_{total} / ram\\_gb$<br><br>\nVérification des contraintes :<br>\n- Si $Ratio_{vcpu} &gt; max\\_vcpu\\_ratio$ et $Ratio_{ram} &gt; max\\_ram\\_ratio$ : <code>STATUT=SURCHARGE (DEPASSEMENT=VCPU_ET_RAM)</code><br>\n- Si $Ratio_{vcpu} &gt; max\\_vcpu\\_ratio$ seul : <code>STATUT=SURCHARGE (DEPASSEMENT=VCPU)</code><br>\n- Si $Ratio_{ram} &gt; max\\_ram\\_ratio$ seul : <code>STATUT=SURCHARGE (DEPASSEMENT=RAM)</code><br>\n- Sinon : <code>STATUT=VALIDE</code><br><br>\nAfficher :<br>\n<code>CONSOLIDATION: VMS=&lt;nb&gt; | VCPU=&lt;VCPU_total&gt;/&lt;p&gt; (ratio=&lt;Ratio_vcpu:.2f&gt;/&lt;max_v:.2f&gt;) | RAM=&lt;RAM_total&gt;/&lt;r&gt;GB (ratio=&lt;Ratio_ram:.2f&gt;/&lt;max_r:.2f&gt;) | STATUT=&lt;STATUT&gt;</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : sommer les ressources et vérifier les ratios
`,
    hints: [
      'En virtualisation Cloud, un ratio vCPU:pCPU de 2:1 à 4:1 est courant, mais la RAM ne doit être que très modérément sur-allouée (1.0 à 1.25).',
      'Arrondir les ratios à 2 décimales pour l\'affichage.'
    ],
    examples: [
      {
        stdin: 'HOTE pcpu=16 ram_gb=64 max_vcpu_ratio=3.00 max_ram_ratio=1.20\nVM id=web1 vcpu=8 ram_gb=16\nVM id=web2 vcpu=8 ram_gb=16\nVM id=app1 vcpu=16 ram_gb=32',
        expected: 'CONSOLIDATION: VMS=3 | VCPU=32/16 (ratio=2.00/3.00) | RAM=64/64GB (ratio=1.00/1.20) | STATUT=VALIDE',
        note: 'Ratio CPU de 2.00 <= 3.00 et ratio RAM de 1.00 <= 1.20 : consolidation parfaitement recevable.'
      }
    ],
    tests: [
      {
        label: 'Surcharge exclusive sur la RAM',
        stdin: 'HOTE pcpu=16 ram_gb=64 max_vcpu_ratio=3.00 max_ram_ratio=1.10\nVM id=vm1 vcpu=16 ram_gb=40\nVM id=vm2 vcpu=16 ram_gb=40',
        expected: 'CONSOLIDATION: VMS=2 | VCPU=32/16 (ratio=2.00/3.00) | RAM=80/64GB (ratio=1.25/1.10) | STATUT=SURCHARGE (DEPASSEMENT=RAM)'
      },
      {
        label: 'Surcharge exclusive sur les vCPU',
        stdin: 'HOTE pcpu=8 ram_gb=128 max_vcpu_ratio=2.00 max_ram_ratio=1.20\nVM id=node1 vcpu=12 ram_gb=32\nVM id=node2 vcpu=12 ram_gb=32',
        expected: 'CONSOLIDATION: VMS=2 | VCPU=24/8 (ratio=3.00/2.00) | RAM=64/128GB (ratio=0.50/1.20) | STATUT=SURCHARGE (DEPASSEMENT=VCPU)'
      },
      {
        label: 'Double dépassement vCPU et RAM',
        stdin: 'HOTE pcpu=4 ram_gb=16 max_vcpu_ratio=2.00 max_ram_ratio=1.00\nVM id=heavy1 vcpu=8 ram_gb=12\nVM id=heavy2 vcpu=8 ram_gb=12',
        expected: 'CONSOLIDATION: VMS=2 | VCPU=16/4 (ratio=4.00/2.00) | RAM=24/16GB (ratio=1.50/1.00) | STATUT=SURCHARGE (DEPASSEMENT=VCPU_ET_RAM)'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

pcpu = 0
ram_gb = 0
max_vcpu_ratio = 1.0
max_ram_ratio = 1.0

vms = []

for lig in lignes:
    if lig.startswith('HOTE'):
        m = re.search(r'pcpu=(\\d+).*?ram_gb=(\\d+).*?max_vcpu_ratio=([0-9.]+).*?max_ram_ratio=([0-9.]+)', lig)
        if m:
            pcpu = int(m.group(1))
            ram_gb = int(m.group(2))
            max_vcpu_ratio = float(m.group(3))
            max_ram_ratio = float(m.group(4))
    elif lig.startswith('VM'):
        m = re.search(r'id=([^\\s]+).*?vcpu=(\\d+).*?ram_gb=(\\d+)', lig)
        if m:
            vms.append({
                'id': m.group(1),
                'vcpu': int(m.group(2)),
                'ram_gb': int(m.group(3))
            })

tot_vcpu = sum(v['vcpu'] for v in vms)
tot_ram = sum(v['ram_gb'] for v in vms)

r_vcpu = tot_vcpu / pcpu if pcpu else 0.0
r_ram = tot_ram / ram_gb if ram_gb else 0.0

dep_vcpu = r_vcpu > max_vcpu_ratio
dep_ram = r_ram > max_ram_ratio

if dep_vcpu and dep_ram:
    statut = 'SURCHARGE (DEPASSEMENT=VCPU_ET_RAM)'
elif dep_vcpu:
    statut = 'SURCHARGE (DEPASSEMENT=VCPU)'
elif dep_ram:
    statut = 'SURCHARGE (DEPASSEMENT=RAM)'
else:
    statut = 'VALIDE'

print(f"CONSOLIDATION: VMS={len(vms)} | VCPU={tot_vcpu}/{pcpu} (ratio={r_vcpu:.2f}/{max_vcpu_ratio:.2f}) | RAM={tot_ram}/{ram_gb}GB (ratio={r_ram:.2f}/{max_ram_ratio:.2f}) | STATUT={statut}")
`
  },
  {
    id: 'cc3-c3-e3',
    chapter: 3,
    title: 'Dimensionnement d’instances face à une charge crête transactionnelle',
    level: 'n3',
    language: 'python',
    goal: 'Calculer le nombre minimal d’instances Cloud nécessaires pour absorber un pic de transactions par seconde (TPS) selon les limites CPU, RAM et IOPS.',
    brief: '<p>Le script lit sur l\'entrée standard :<br>\n<code>CHARGE tps=&lt;tps&gt; cpu_ms=&lt;cpu_ms&gt; ram_mb=&lt;ram_mb&gt; iops=&lt;iops&gt;</code><br>\n<code>SPEC_NOEUD cpu_max_ms=&lt;cpu_max_ms&gt; ram_max_gb=&lt;ram_max_gb&gt; iops_max=&lt;iops_max&gt; marge_securite=&lt;pct&gt;</code>.<br><br>\nFormules :<br>\nLe coefficient de sécurité $K = marge\\_securite / 100.0$ (ex: 70% -&gt; 0.70).<br>\nBesoins globaux par seconde :<br>\n- $Besoin_{cpu} = tps \\times cpu\\_ms$ (en ms)<br>\n- $Besoin_{ram} = (tps \\times ram\\_mb) / 1024$ (en Go)<br>\n- $Besoin_{iops} = tps \\times iops$ (en opérations/sec)<br><br>\nInstances requises par critère (arrondi supérieur <code>math.ceil</code>) :<br>\n- $N_{cpu} = \\lceil Besoin_{cpu} / (cpu\\_max\\_ms \\times K) \\rceil$<br>\n- $N_{ram} = \\lceil Besoin_{ram} / (ram\\_max\\_gb \\times K) \\rceil$<br>\n- $N_{iops} = \\lceil Besoin_{iops} / (iops\\_max \\times K) \\rceil$<br><br>\nNombre final d\'instances : $N_{final} = \\max(N_{cpu}, N_{ram}, N_{iops})$.<br>\nFacteur limitant : le premier critère atteignant $N_{final}$ dans l\'ordre de priorité <code>CPU</code>, <code>RAM</code>, <code>IOPS</code>.<br><br>\nAfficher :<br>\n<code>SIZING: TPS=&lt;tps&gt; -&gt; INSTANCES=&lt;N_final&gt; (CPU=&lt;N_cpu&gt;, RAM=&lt;N_ram&gt;, IOPS=&lt;N_iops&gt;) | LIMITANT=&lt;LIMITANT&gt;</code></p>',
    starter: `import sys
import math

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer les instances requises pour chaque ressource
`,
    hints: [
      'Utiliser math.ceil pour obtenir un nombre entier d’instances suffisant.',
      'Ne pas oublier de diviser ram_mb par 1024 pour comparer avec ram_max_gb.'
    ],
    examples: [
      {
        stdin: 'CHARGE tps=500 cpu_ms=12 ram_mb=16 iops=4\nSPEC_NOEUD cpu_max_ms=4000 ram_max_gb=16 iops_max=3000 marge_securite=70',
        expected: 'SIZING: TPS=500 -> INSTANCES=3 (CPU=3, RAM=1, IOPS=1) | LIMITANT=CPU',
        note: 'CPU réclame 500 * 12 = 6000 ms/s. Chaque nœud à 70% délivre 2800 ms/s. ceil(6000/2800) = 3 instances.'
      }
    ],
    tests: [
      {
        label: 'Goulot d’étranglement sur les entrées-sorties disque IOPS',
        stdin: 'CHARGE tps=2000 cpu_ms=2 ram_mb=8 iops=10\nSPEC_NOEUD cpu_max_ms=8000 ram_max_gb=32 iops_max=4000 marge_securite=80',
        expected: 'SIZING: TPS=2000 -> INSTANCES=7 (CPU=1, RAM=1, IOPS=7) | LIMITANT=IOPS'
      },
      {
        label: 'Application gloutonne en mémoire vive RAM',
        stdin: 'CHARGE tps=1000 cpu_ms=3 ram_mb=128 iops=2\nSPEC_NOEUD cpu_max_ms=4000 ram_max_gb=16 iops_max=5000 marge_securite=75',
        expected: 'SIZING: TPS=1000 -> INSTANCES=11 (CPU=1, RAM=11, IOPS=1) | LIMITANT=RAM'
      },
      {
        label: 'Charge modérée sur nœud puissant',
        stdin: 'CHARGE tps=100 cpu_ms=10 ram_mb=32 iops=5\nSPEC_NOEUD cpu_max_ms=4000 ram_max_gb=16 iops_max=2000 marge_securite=80',
        expected: 'SIZING: TPS=100 -> INSTANCES=1 (CPU=1, RAM=1, IOPS=1) | LIMITANT=CPU'
      }
    ],
    solution: `import sys
import math
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

tps, cpu_ms, ram_mb, iops = 0, 0, 0, 0
cpu_max_ms, ram_max_gb, iops_max, marge = 1, 1, 1, 100

for lig in lignes:
    if lig.startswith('CHARGE'):
        m = re.search(r'tps=(\\d+).*?cpu_ms=(\\d+).*?ram_mb=(\\d+).*?iops=(\\d+)', lig)
        if m:
            tps, cpu_ms, ram_mb, iops = int(m.group(1)), int(m.group(2)), int(m.group(3)), int(m.group(4))
    elif lig.startswith('SPEC_NOEUD'):
        m = re.search(r'cpu_max_ms=(\\d+).*?ram_max_gb=(\\d+).*?iops_max=(\\d+).*?marge_securite=(\\d+)', lig)
        if m:
            cpu_max_ms = int(m.group(1))
            ram_max_gb = int(m.group(2))
            iops_max = int(m.group(3))
            marge = int(m.group(4))

k = marge / 100.0

besoin_cpu = tps * cpu_ms
besoin_ram = (tps * ram_mb) / 1024.0
besoin_iops = tps * iops

cap_cpu = cpu_max_ms * k
cap_ram = ram_max_gb * k
cap_iops = iops_max * k

n_cpu = max(1, math.ceil(besoin_cpu / cap_cpu))
n_ram = max(1, math.ceil(besoin_ram / cap_ram))
n_iops = max(1, math.ceil(besoin_iops / cap_iops))

n_final = max(n_cpu, n_ram, n_iops)

if n_final == n_cpu:
    limitant = 'CPU'
elif n_final == n_ram:
    limitant = 'RAM'
else:
    limitant = 'IOPS'

print(f"SIZING: TPS={tps} -> INSTANCES={n_final} (CPU={n_cpu}, RAM={n_ram}, IOPS={n_iops}) | LIMITANT={limitant}")
`
  }
];
