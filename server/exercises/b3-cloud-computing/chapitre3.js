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
    "title": "Dimensionnement illustratif : moyenne et pointe",
    "level": "n3",
    "language": "analyse",
    "goal": "Estimer séparément la concurrence moyenne et une capacité de pointe sous des hypothèses explicites.",
    "brief": "<p>Ce modèle fictif suppose un régime moyen stable : une transaction occupe <code>ram_mb</code> pendant toute sa durée moyenne <code>duree_ms</code>, et le débit moyen d’entrée égale celui de sortie. La concurrence moyenne vaut <code>tps_moy × duree_ms / 1000</code> (loi de Little) ; elle ne permet pas de déduire la pointe. <code>pic_concurrent</code> et <code>tps_pic</code> sont des valeurs de pointe observées ou fournies séparément. On suppose le coût CPU et IOPS par transaction constant, les nœuds identiques, la charge bien répartie et aucune réserve de redondance.</p><p>La mémoire de base <code>base_mb</code> est consommée sur chaque nœud. Avec <code>K = cible_pct / 100</code>, le budget utile par nœud est <code>ram_max_gb × 1024 × K − base_mb</code> en Mo. S’il est nul ou négatif, afficher <code>SIZING: BASE_NON_ADMISSIBLE</code>. Si durée ou concurrence de pointe manque, afficher <code>SIZING: CONCURRENCE=INDETERMINEE | RAM=INDETERMINEE | INSTANCES=INDETERMINEES</code>.</p><p>Sinon, arrondir à l’entier supérieur : <code>CPU = tps_pic × cpu_ms / (cpu_max_ms × K)</code> ; <code>RAM_MOY = concurrence_moyenne × ram_mb / budget_utile</code> ; <code>RAM_PIC = pic_concurrent × ram_mb / budget_utile</code> ; <code>IOPS = tps_pic × iops_tx / (iops_max × K)</code>. Les exemples supposent une pointe au moins égale à la moyenne. L’estimation de pointe est le maximum de CPU, RAM_PIC et IOPS ; en cas d’égalité, retenir CPU puis RAM puis IOPS. Afficher <code>SIZING: CONC_MOY=&lt;2 décimales&gt; | CONC_PIC=&lt;pic&gt; | CPU=&lt;n&gt; | RAM_MOY=&lt;n&gt; | RAM_PIC=&lt;n&gt; | IOPS=&lt;n&gt; | INSTANCES_PIC=&lt;n&gt; | LIMITANT=&lt;nom&gt;</code>. Ce résultat théorique ne couvre pas la haute disponibilité, les files d’attente, les variations de charge ni une mesure réelle.</p>",
    "starter": "# Grille d’analyse (cc3-c3-e3) — Dimensionnement illustratif\n\n[Cas 1 — Pointe limitée par les entrées-sorties]\n# Données : CHARGE tps_moy=1000 tps_pic=2000 duree_ms=250 pic_concurrent=300 cpu_ms=2 ram_mb=8 iops_tx=10\n# Données : SPEC_NOEUD cpu_max_ms=8000 ram_max_gb=32 base_mb=1024 iops_max=4000 cible_pct=80\nA_COMPLETER\n\n[Cas 2 — Pointe limitée par la mémoire]\n# Données : CHARGE tps_moy=1000 tps_pic=1200 duree_ms=200 pic_concurrent=300 cpu_ms=3 ram_mb=128 iops_tx=2\n# Données : SPEC_NOEUD cpu_max_ms=4000 ram_max_gb=16 base_mb=1024 iops_max=5000 cible_pct=75\nA_COMPLETER\n\n[Cas 3 — Durée et concurrence absentes]\n# Données : CHARGE tps_moy=1000 tps_pic=1200 cpu_ms=3 ram_mb=128 iops_tx=2\n# Données : SPEC_NOEUD cpu_max_ms=4000 ram_max_gb=16 base_mb=1024 iops_max=5000 cible_pct=75\nA_COMPLETER\n\n[Cas 4 — Mémoire de base trop élevée]\n# Données : CHARGE tps_moy=500 tps_pic=600 duree_ms=200 pic_concurrent=160 cpu_ms=4 ram_mb=64 iops_tx=3\n# Données : SPEC_NOEUD cpu_max_ms=4000 ram_max_gb=2 base_mb=2048 iops_max=3000 cible_pct=80\nA_COMPLETER\n",
    "hints": [
      "Une durée en millisecondes se convertit en secondes ; le débit seul n’est pas une concurrence.",
      "Retirez la mémoire de base du budget de chaque nœud ; la pointe est une donnée distincte."
    ],
    "examples": [
      {
        "stdin": "CHARGE tps_moy=500 tps_pic=600 duree_ms=200 pic_concurrent=160 cpu_ms=4 ram_mb=64 iops_tx=3\nSPEC_NOEUD cpu_max_ms=4000 ram_max_gb=16 base_mb=1024 iops_max=3000 cible_pct=80",
        "expected": "SIZING: CONC_MOY=100.00 | CONC_PIC=160 | CPU=1 | RAM_MOY=1 | RAM_PIC=1 | IOPS=1 | INSTANCES_PIC=1 | LIMITANT=CPU",
        "note": "À débit moyen stable, 500 transactions/s pendant 0,2 s correspondent à 100 transactions simultanées en moyenne. La pointe est fournie séparément."
      }
    ],
    "tests": [
      {
        "label": "Pointe limitée par les entrées-sorties",
        "stdin": "cas:1",
        "expected": "SIZING: CONC_MOY=250.00 | CONC_PIC=300 | CPU=1 | RAM_MOY=1 | RAM_PIC=1 | IOPS=7 | INSTANCES_PIC=7 | LIMITANT=IOPS"
      },
      {
        "label": "Pointe limitée par la mémoire",
        "stdin": "cas:2",
        "expected": "SIZING: CONC_MOY=200.00 | CONC_PIC=300 | CPU=2 | RAM_MOY=3 | RAM_PIC=4 | IOPS=1 | INSTANCES_PIC=4 | LIMITANT=RAM"
      },
      {
        "label": "Durée et concurrence absentes",
        "stdin": "cas:3",
        "expected": "SIZING: CONCURRENCE=INDETERMINEE | RAM=INDETERMINEE | INSTANCES=INDETERMINEES"
      },
      {
        "label": "Mémoire de base trop élevée",
        "stdin": "cas:4",
        "expected": "SIZING: BASE_NON_ADMISSIBLE"
      }
    ],
    "solution": "[Exemple]\nSIZING: CONC_MOY=100.00 | CONC_PIC=160 | CPU=1 | RAM_MOY=1 | RAM_PIC=1 | IOPS=1 | INSTANCES_PIC=1 | LIMITANT=CPU\n\n[Cas 1 — Pointe limitée par les entrées-sorties]\nSIZING: CONC_MOY=250.00 | CONC_PIC=300 | CPU=1 | RAM_MOY=1 | RAM_PIC=1 | IOPS=7 | INSTANCES_PIC=7 | LIMITANT=IOPS\n\n[Cas 2 — Pointe limitée par la mémoire]\nSIZING: CONC_MOY=200.00 | CONC_PIC=300 | CPU=2 | RAM_MOY=3 | RAM_PIC=4 | IOPS=1 | INSTANCES_PIC=4 | LIMITANT=RAM\n\n[Cas 3 — Durée et concurrence absentes]\nSIZING: CONCURRENCE=INDETERMINEE | RAM=INDETERMINEE | INSTANCES=INDETERMINEES\n\n[Cas 4 — Mémoire de base trop élevée]\nSIZING: BASE_NON_ADMISSIBLE"
  }
];
