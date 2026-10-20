'use strict';

module.exports = [
  {
    "id": "cc3-c3-e1",
    "chapter": 3,
    "title": "Classificateur d’hyperviseurs (Bare-Metal vs Hosted, HVM vs PV)",
    "level": "n1",
    "language": "analyse",
    "goal": "Identifier le type architectural d’hyperviseur et le mode d’émulation matérielle pour qualifier son overhead et son adéquation Cloud.",
    "brief": "<p>Analysez les paramètres du problème pour chaque cas.<br>\nRègles de classification :<br>\n- <strong>Type architectural</strong> : <code>TYPE_1_BARE_METAL</code> si <code>COUCHE == BARE_METAL</code>, sinon <code>TYPE_2_HOSTED</code>.<br>\n- <strong>Mode d’exécution</strong> : <code>HVM</code> (Hardware Virtual Machine) si <code>ACCEL == OUI</code> (Intel VT-x / AMD-V actif), sinon <code>PV</code> (Paravirtualisation avec modification du noyau invité).<br>\n- <strong>Performance</strong> :<br>\n  - Si <code>OVERHEAD &lt;= 3.0</code> : <code>PERF=OPTIMALE</code><br>\n  - Sinon si <code>OVERHEAD &lt;= 8.0</code> : <code>PERF=BONNE</code><br>\n  - Sinon : <code>PERF=DEGRADEE</code><br><br>\nAfficher :<br>\n<code>HYPERVISEUR: &lt;nom&gt; -&gt; ARCH=&lt;TYPE&gt; | MODE=&lt;MODE&gt; | PERF=&lt;PERF&gt; (OVERHEAD=&lt;OVERHEAD:.1f&gt;%)</code></p>",
    "starter": "# Grille d'analyse (cc3-c3-e1) — Classificateur d’hyperviseurs (Bare-Metal vs Hosted, HVM vs PV)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — VMware ESXi Datacenter]\n# Données : HYPERVISEUR nom=esxi_cluster COUCHE=BARE_METAL ACCEL=OUI OVERHEAD=2.1\nA_COMPLETER\n\n[Cas 2 — Poste de travail avec VMware Workstation]\n# Données : HYPERVISEUR nom=vm_workstation COUCHE=HOSTED ACCEL=OUI OVERHEAD=7.5\nA_COMPLETER\n\n[Cas 3 — Vieux conteneur hébergé sans assistance CPU]\n# Données : HYPERVISEUR nom=vserver_old COUCHE=HOSTED ACCEL=NON OVERHEAD=12.0\nA_COMPLETER\n",
    "hints": [
      "Les hyperviseurs de Type 1 (ESXi, KVM, Xen) tournent directement sur le matériel.",
      "Le mode HVM exploite la virtualisation assistée par le processeur hôte."
    ],
    "examples": [
      {
        "stdin": "HYPERVISEUR nom=kvm_prod COUCHE=BARE_METAL ACCEL=OUI OVERHEAD=1.8\nHYPERVISEUR nom=virtualbox_dev COUCHE=HOSTED ACCEL=OUI OVERHEAD=9.2\nHYPERVISEUR nom=xen_legacy COUCHE=BARE_METAL ACCEL=NON OVERHEAD=4.5",
        "expected": "HYPERVISEUR: kvm_prod -> ARCH=TYPE_1_BARE_METAL | MODE=HVM | PERF=OPTIMALE (OVERHEAD=1.8%)\nHYPERVISEUR: virtualbox_dev -> ARCH=TYPE_2_HOSTED | MODE=HVM | PERF=DEGRADEE (OVERHEAD=9.2%)\nHYPERVISEUR: xen_legacy -> ARCH=TYPE_1_BARE_METAL | MODE=PV | PERF=BONNE (OVERHEAD=4.5%)",
        "note": "KVM bare-metal avec HVM offre les meilleures performances en production Cloud."
      }
    ],
    "tests": [
      {
        "label": "VMware ESXi Datacenter",
        "stdin": "cas:1",
        "expected": "HYPERVISEUR: esxi_cluster -> ARCH=TYPE_1_BARE_METAL | MODE=HVM | PERF=OPTIMALE (OVERHEAD=2.1%)"
      },
      {
        "label": "Poste de travail avec VMware Workstation",
        "stdin": "cas:2",
        "expected": "HYPERVISEUR: vm_workstation -> ARCH=TYPE_2_HOSTED | MODE=HVM | PERF=BONNE (OVERHEAD=7.5%)"
      },
      {
        "label": "Vieux conteneur hébergé sans assistance CPU",
        "stdin": "cas:3",
        "expected": "HYPERVISEUR: vserver_old -> ARCH=TYPE_2_HOSTED | MODE=PV | PERF=DEGRADEE (OVERHEAD=12.0%)"
      }
    ],
    "solution": "[Exemple]\nHYPERVISEUR: kvm_prod -> ARCH=TYPE_1_BARE_METAL | MODE=HVM | PERF=OPTIMALE (OVERHEAD=1.8%)\nHYPERVISEUR: virtualbox_dev -> ARCH=TYPE_2_HOSTED | MODE=HVM | PERF=DEGRADEE (OVERHEAD=9.2%)\nHYPERVISEUR: xen_legacy -> ARCH=TYPE_1_BARE_METAL | MODE=PV | PERF=BONNE (OVERHEAD=4.5%)\n\n[Cas 1 — VMware ESXi Datacenter]\nHYPERVISEUR: esxi_cluster -> ARCH=TYPE_1_BARE_METAL | MODE=HVM | PERF=OPTIMALE (OVERHEAD=2.1%)\n\n[Cas 2 — Poste de travail avec VMware Workstation]\nHYPERVISEUR: vm_workstation -> ARCH=TYPE_2_HOSTED | MODE=HVM | PERF=BONNE (OVERHEAD=7.5%)\n\n[Cas 3 — Vieux conteneur hébergé sans assistance CPU]\nHYPERVISEUR: vserver_old -> ARCH=TYPE_2_HOSTED | MODE=PV | PERF=DEGRADEE (OVERHEAD=12.0%)"
  },
  {
    "id": "cc3-c3-e2",
    "chapter": 3,
    "title": "Calculateur de consolidation et sur-allocation (Overcommitment)",
    "level": "n2",
    "language": "analyse",
    "goal": "Vérifier la faisabilité d’hébergement d’un lot de machines virtuelles sur un hôte physique selon les plafonds de sur-allocation vCPU et RAM.",
    "brief": "<p>Analysez les données fournies pour chaque cas.<br><br>\nCalculs :<br>\n- $VCPU_{total} = \\sum vcpu$<br>\n- $RAM_{total} = \\sum ram\\_gb$<br>\n- $Ratio_{vcpu} = VCPU_{total} / pcpu$<br>\n- $Ratio_{ram} = RAM_{total} / ram\\_gb$<br><br>\nVérification des contraintes :<br>\n- Si $Ratio_{vcpu} &gt; max\\_vcpu\\_ratio$ et $Ratio_{ram} &gt; max\\_ram\\_ratio$ : <code>STATUT=SURCHARGE (DEPASSEMENT=VCPU_ET_RAM)</code><br>\n- Si $Ratio_{vcpu} &gt; max\\_vcpu\\_ratio$ seul : <code>STATUT=SURCHARGE (DEPASSEMENT=VCPU)</code><br>\n- Si $Ratio_{ram} &gt; max\\_ram\\_ratio$ seul : <code>STATUT=SURCHARGE (DEPASSEMENT=RAM)</code><br>\n- Sinon : <code>STATUT=VALIDE</code><br><br>\nAfficher :<br>\n<code>CONSOLIDATION: VMS=&lt;nb&gt; | VCPU=&lt;VCPU_total&gt;/&lt;p&gt; (ratio=&lt;Ratio_vcpu:.2f&gt;/&lt;max_v:.2f&gt;) | RAM=&lt;RAM_total&gt;/&lt;r&gt;GB (ratio=&lt;Ratio_ram:.2f&gt;/&lt;max_r:.2f&gt;) | STATUT=&lt;STATUT&gt;</code></p>",
    "starter": "# Grille d'analyse (cc3-c3-e2) — Calculateur de consolidation et sur-allocation (Overcommitment)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Surcharge exclusive sur la RAM]\n# Données : HOTE pcpu=16 ram_gb=64 max_vcpu_ratio=3.00 max_ram_ratio=1.10\n# Données : VM id=vm1 vcpu=16 ram_gb=40\n# Données : VM id=vm2 vcpu=16 ram_gb=40\nA_COMPLETER\n\n[Cas 2 — Surcharge exclusive sur les vCPU]\n# Données : HOTE pcpu=8 ram_gb=128 max_vcpu_ratio=2.00 max_ram_ratio=1.20\n# Données : VM id=node1 vcpu=12 ram_gb=32\n# Données : VM id=node2 vcpu=12 ram_gb=32\nA_COMPLETER\n\n[Cas 3 — Double dépassement vCPU et RAM]\n# Données : HOTE pcpu=4 ram_gb=16 max_vcpu_ratio=2.00 max_ram_ratio=1.00\n# Données : VM id=heavy1 vcpu=8 ram_gb=12\n# Données : VM id=heavy2 vcpu=8 ram_gb=12\nA_COMPLETER\n",
    "hints": [
      "En virtualisation Cloud, un ratio vCPU:pCPU de 2:1 à 4:1 est courant, mais la RAM ne doit être que très modérément sur-allouée (1.0 à 1.25).",
      "Arrondir les ratios à 2 décimales pour l'affichage."
    ],
    "examples": [
      {
        "stdin": "HOTE pcpu=16 ram_gb=64 max_vcpu_ratio=3.00 max_ram_ratio=1.20\nVM id=web1 vcpu=8 ram_gb=16\nVM id=web2 vcpu=8 ram_gb=16\nVM id=app1 vcpu=16 ram_gb=32",
        "expected": "CONSOLIDATION: VMS=3 | VCPU=32/16 (ratio=2.00/3.00) | RAM=64/64GB (ratio=1.00/1.20) | STATUT=VALIDE",
        "note": "Ratio CPU de 2.00 <= 3.00 et ratio RAM de 1.00 <= 1.20 : consolidation parfaitement recevable."
      }
    ],
    "tests": [
      {
        "label": "Surcharge exclusive sur la RAM",
        "stdin": "cas:1",
        "expected": "CONSOLIDATION: VMS=2 | VCPU=32/16 (ratio=2.00/3.00) | RAM=80/64GB (ratio=1.25/1.10) | STATUT=SURCHARGE (DEPASSEMENT=RAM)"
      },
      {
        "label": "Surcharge exclusive sur les vCPU",
        "stdin": "cas:2",
        "expected": "CONSOLIDATION: VMS=2 | VCPU=24/8 (ratio=3.00/2.00) | RAM=64/128GB (ratio=0.50/1.20) | STATUT=SURCHARGE (DEPASSEMENT=VCPU)"
      },
      {
        "label": "Double dépassement vCPU et RAM",
        "stdin": "cas:3",
        "expected": "CONSOLIDATION: VMS=2 | VCPU=16/4 (ratio=4.00/2.00) | RAM=24/16GB (ratio=1.50/1.00) | STATUT=SURCHARGE (DEPASSEMENT=VCPU_ET_RAM)"
      }
    ],
    "solution": "[Exemple]\nCONSOLIDATION: VMS=3 | VCPU=32/16 (ratio=2.00/3.00) | RAM=64/64GB (ratio=1.00/1.20) | STATUT=VALIDE\n\n[Cas 1 — Surcharge exclusive sur la RAM]\nCONSOLIDATION: VMS=2 | VCPU=32/16 (ratio=2.00/3.00) | RAM=80/64GB (ratio=1.25/1.10) | STATUT=SURCHARGE (DEPASSEMENT=RAM)\n\n[Cas 2 — Surcharge exclusive sur les vCPU]\nCONSOLIDATION: VMS=2 | VCPU=24/8 (ratio=3.00/2.00) | RAM=64/128GB (ratio=0.50/1.20) | STATUT=SURCHARGE (DEPASSEMENT=VCPU)\n\n[Cas 3 — Double dépassement vCPU et RAM]\nCONSOLIDATION: VMS=2 | VCPU=16/4 (ratio=4.00/2.00) | RAM=24/16GB (ratio=1.50/1.00) | STATUT=SURCHARGE (DEPASSEMENT=VCPU_ET_RAM)"
  },
  {
    "id": "cc3-c3-e3",
    "chapter": 3,
    "title": "Dimensionnement d’instances face à une charge crête transactionnelle",
    "level": "n3",
    "language": "analyse",
    "goal": "Calculer le nombre minimal d’instances Cloud nécessaires pour absorber un pic de transactions par seconde (TPS) selon les limites CPU, RAM et IOPS.",
    "brief": "<p>Analysez les paramètres du problème pour chaque cas.<br><br>\nFormules :<br>\nLe coefficient de sécurité $K = marge\\_securite / 100.0$ (ex: 70% -&gt; 0.70).<br>\nBesoins globaux par seconde :<br>\n- $Besoin_{cpu} = tps \\times cpu\\_ms$ (en ms)<br>\n- $Besoin_{ram} = (tps \\times ram\\_mb) / 1024$ (en Go)<br>\n- $Besoin_{iops} = tps \\times iops$ (en opérations/sec)<br><br>\nInstances requises par critère (arrondi supérieur <code>math.ceil</code>) :<br>\n- $N_{cpu} = \\lceil Besoin_{cpu} / (cpu\\_max\\_ms \\times K) \\rceil$<br>\n- $N_{ram} = \\lceil Besoin_{ram} / (ram\\_max\\_gb \\times K) \\rceil$<br>\n- $N_{iops} = \\lceil Besoin_{iops} / (iops\\_max \\times K) \\rceil$<br><br>\nNombre final d'instances : $N_{final} = \\max(N_{cpu}, N_{ram}, N_{iops})$.<br>\nFacteur limitant : le premier critère atteignant $N_{final}$ dans l'ordre de priorité <code>CPU</code>, <code>RAM</code>, <code>IOPS</code>.<br><br>\nAfficher :<br>\n<code>SIZING: TPS=&lt;tps&gt; -&gt; INSTANCES=&lt;N_final&gt; (CPU=&lt;N_cpu&gt;, RAM=&lt;N_ram&gt;, IOPS=&lt;N_iops&gt;) | LIMITANT=&lt;LIMITANT&gt;</code></p>",
    "starter": "# Grille d'analyse (cc3-c3-e3) — Dimensionnement d’instances face à une charge crête transactionnelle\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Goulot d’étranglement sur les entrées-sorties disque IOPS]\n# Données : CHARGE tps=2000 cpu_ms=2 ram_mb=8 iops=10\n# Données : SPEC_NOEUD cpu_max_ms=8000 ram_max_gb=32 iops_max=4000 marge_securite=80\nA_COMPLETER\n\n[Cas 2 — Application gloutonne en mémoire vive RAM]\n# Données : CHARGE tps=1000 cpu_ms=3 ram_mb=128 iops=2\n# Données : SPEC_NOEUD cpu_max_ms=4000 ram_max_gb=16 iops_max=5000 marge_securite=75\nA_COMPLETER\n\n[Cas 3 — Charge modérée sur nœud puissant]\n# Données : CHARGE tps=100 cpu_ms=10 ram_mb=32 iops=5\n# Données : SPEC_NOEUD cpu_max_ms=4000 ram_max_gb=16 iops_max=2000 marge_securite=80\nA_COMPLETER\n",
    "hints": [
      "Utiliser math.ceil pour obtenir un nombre entier d’instances suffisant.",
      "Ne pas oublier de diviser ram_mb par 1024 pour comparer avec ram_max_gb."
    ],
    "examples": [
      {
        "stdin": "CHARGE tps=500 cpu_ms=12 ram_mb=16 iops=4\nSPEC_NOEUD cpu_max_ms=4000 ram_max_gb=16 iops_max=3000 marge_securite=70",
        "expected": "SIZING: TPS=500 -> INSTANCES=3 (CPU=3, RAM=1, IOPS=1) | LIMITANT=CPU",
        "note": "CPU réclame 500 * 12 = 6000 ms/s. Chaque nœud à 70% délivre 2800 ms/s. ceil(6000/2800) = 3 instances."
      }
    ],
    "tests": [
      {
        "label": "Goulot d’étranglement sur les entrées-sorties disque IOPS",
        "stdin": "cas:1",
        "expected": "SIZING: TPS=2000 -> INSTANCES=7 (CPU=1, RAM=1, IOPS=7) | LIMITANT=IOPS"
      },
      {
        "label": "Application gloutonne en mémoire vive RAM",
        "stdin": "cas:2",
        "expected": "SIZING: TPS=1000 -> INSTANCES=11 (CPU=1, RAM=11, IOPS=1) | LIMITANT=RAM"
      },
      {
        "label": "Charge modérée sur nœud puissant",
        "stdin": "cas:3",
        "expected": "SIZING: TPS=100 -> INSTANCES=1 (CPU=1, RAM=1, IOPS=1) | LIMITANT=CPU"
      }
    ],
    "solution": "[Exemple]\nSIZING: TPS=500 -> INSTANCES=3 (CPU=3, RAM=1, IOPS=1) | LIMITANT=CPU\n\n[Cas 1 — Goulot d’étranglement sur les entrées-sorties disque IOPS]\nSIZING: TPS=2000 -> INSTANCES=7 (CPU=1, RAM=1, IOPS=7) | LIMITANT=IOPS\n\n[Cas 2 — Application gloutonne en mémoire vive RAM]\nSIZING: TPS=1000 -> INSTANCES=11 (CPU=1, RAM=11, IOPS=1) | LIMITANT=RAM\n\n[Cas 3 — Charge modérée sur nœud puissant]\nSIZING: TPS=100 -> INSTANCES=1 (CPU=1, RAM=1, IOPS=1) | LIMITANT=CPU"
  }
];
