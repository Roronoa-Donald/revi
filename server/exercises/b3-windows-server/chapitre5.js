'use strict';

module.exports = [
  {
    "id": "ws3-c5-e1",
    "chapter": 5,
    "title": "Simulateur de commutation réseau Hyper-V (External, Internal, Private vSwitch)",
    "level": "n1",
    "language": "analyse",
    "goal": "Déterminer l’accessibilité réseau entre VMs, hôte physique et réseau externe selon le type de commutateur virtuel (vSwitch).",
    "brief": "Dans Microsoft Hyper-V, les règles de connectivité pour chaque type de commutateur virtuel sont les suivantes :\n- `EXTERNAL` : permet la communication entre les VMs rattachées, vers le réseau physique extérieur (`EXTERNAL_NET`), et vers l’hôte (`HOST`) si et seulement si `allow_host=TRUE`.\n- `INTERNAL` : permet la communication entre les VMs rattachées et avec l’hôte (`HOST`). Bloqué vers `EXTERNAL_NET`.\n- `PRIVATE` : permet la communication STRICTEMENT entre les VMs rattachées au même vSwitch. Bloqué vers `HOST` et vers `EXTERNAL_NET`.\n- Deux VMs sur deux vSwitchs distincts ne peuvent jamais communiquer directement.\n\nEntrée :\n`VSWITCH name=<NOM> type=<EXTERNAL|INTERNAL|PRIVATE> allow_host=<TRUE|FALSE>`\n`ATTACH vm=<VM> vswitch=<NOM>`\n`PING from=<SRC> to=<DST>` (SRC et DST peuvent être un nom de VM, `HOST` ou `EXTERNAL_NET`)\n\nRésultat d’analyse attendu :\n- Pour chaque test PING :\n  `PING_RESULT from=<SRC> to=<DST> status=<REUSSI|BLOQUE> motif=<OK|COMMUTATEURS_DIFFERENTS|TYPE_INTERNAL|TYPE_PRIVATE|HOST_ISOLE>`\n- Bilan :\n  `SUMMARY total_pings=<N> reussis=<R> bloques=<B>`",
    "starter": "# Grille d'analyse (ws3-c5-e1) — Simulateur de commutation réseau Hyper-V (External, Internal, Private vSwitch)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Commutateur Privé bloquant l’accès vers l’hôte et l’extérieur]\n# Données : VSWITCH name=vSwitch-Isole type=PRIVATE allow_host=FALSE\n# Données : ATTACH vm=VM-DB vswitch=vSwitch-Isole\n# Données : PING from=VM-DB to=HOST\n# Données : PING from=VM-DB to=EXTERNAL_NET\nA_COMPLETER\n\n[Cas 2 — Deux VMs rattachées à des vSwitchs différents]\n# Données : VSWITCH name=SW1 type=INTERNAL allow_host=TRUE\n# Données : VSWITCH name=SW2 type=INTERNAL allow_host=TRUE\n# Données : ATTACH vm=VM-A vswitch=SW1\n# Données : ATTACH vm=VM-B vswitch=SW2\n# Données : PING from=VM-A to=VM-B\nA_COMPLETER\n\n[Cas 3 — Commutateur Externe avec allow_host désactivé]\n# Données : VSWITCH name=SW-Ext type=EXTERNAL allow_host=FALSE\n# Données : ATTACH vm=VM-Web vswitch=SW-Ext\n# Données : PING from=VM-Web to=HOST\n# Données : PING from=VM-Web to=EXTERNAL_NET\nA_COMPLETER\n",
    "hints": [
      "Associer chaque VM à son commutateur virtuel et stocker les propriétés du vSwitch.",
      "Identifier si la source et la destination sont sur le même vSwitch.",
      "Vérifier les règles spécifiques pour HOST et EXTERNAL_NET."
    ],
    "examples": [
      {
        "stdin": "VSWITCH name=vSwitch-LAN type=EXTERNAL allow_host=TRUE\nATTACH vm=VM1 vswitch=vSwitch-LAN\nATTACH vm=VM2 vswitch=vSwitch-LAN\nPING from=VM1 to=VM2\nPING from=VM1 to=EXTERNAL_NET",
        "expected": "PING_RESULT from=VM1 to=VM2 status=REUSSI motif=OK\nPING_RESULT from=VM1 to=EXTERNAL_NET status=REUSSI motif=OK\nSUMMARY total_pings=2 reussis=2 bloques=0",
        "note": "Le vSwitch externe avec allow_host permet la communication inter-VM et vers le réseau extérieur."
      }
    ],
    "tests": [
      {
        "label": "Commutateur Privé bloquant l’accès vers l’hôte et l’extérieur",
        "stdin": "cas:1",
        "expected": "PING_RESULT from=VM-DB to=HOST status=BLOQUE motif=TYPE_PRIVATE\nPING_RESULT from=VM-DB to=EXTERNAL_NET status=BLOQUE motif=TYPE_PRIVATE\nSUMMARY total_pings=2 reussis=0 bloques=2"
      },
      {
        "label": "Deux VMs rattachées à des vSwitchs différents",
        "stdin": "cas:2",
        "expected": "PING_RESULT from=VM-A to=VM-B status=BLOQUE motif=COMMUTATEURS_DIFFERENTS\nSUMMARY total_pings=1 reussis=0 bloques=1"
      },
      {
        "label": "Commutateur Externe avec allow_host désactivé",
        "stdin": "cas:3",
        "expected": "PING_RESULT from=VM-Web to=HOST status=BLOQUE motif=HOST_ISOLE\nPING_RESULT from=VM-Web to=EXTERNAL_NET status=REUSSI motif=OK\nSUMMARY total_pings=2 reussis=1 bloques=1"
      }
    ],
    "solution": "[Exemple]\nPING_RESULT from=VM1 to=VM2 status=REUSSI motif=OK\nPING_RESULT from=VM1 to=EXTERNAL_NET status=REUSSI motif=OK\nSUMMARY total_pings=2 reussis=2 bloques=0\n\n[Cas 1 — Commutateur Privé bloquant l’accès vers l’hôte et l’extérieur]\nPING_RESULT from=VM-DB to=HOST status=BLOQUE motif=TYPE_PRIVATE\nPING_RESULT from=VM-DB to=EXTERNAL_NET status=BLOQUE motif=TYPE_PRIVATE\nSUMMARY total_pings=2 reussis=0 bloques=2\n\n[Cas 2 — Deux VMs rattachées à des vSwitchs différents]\nPING_RESULT from=VM-A to=VM-B status=BLOQUE motif=COMMUTATEURS_DIFFERENTS\nSUMMARY total_pings=1 reussis=0 bloques=1\n\n[Cas 3 — Commutateur Externe avec allow_host désactivé]\nPING_RESULT from=VM-Web to=HOST status=BLOQUE motif=HOST_ISOLE\nPING_RESULT from=VM-Web to=EXTERNAL_NET status=REUSSI motif=OK\nSUMMARY total_pings=2 reussis=1 bloques=1"
  },
  {
    "id": "ws3-c5-e2",
    "chapter": 5,
    "title": "Calculateur d’allocation de Mémoire Dynamique Hyper-V",
    "level": "n2",
    "language": "analyse",
    "goal": "Calculer l’allocation de RAM par machine virtuelle en intégrant la demande courante, le tampon mémoire et la capacité physique de l’hôte.",
    "brief": "Dans Hyper-V, la mémoire dynamique ajuste la RAM de chaque VM selon la formule officielle Microsoft :\n- `target_ram = round(demand_mb * (1 + buffer_pct / 100))`\n- Bornage contractuel : `allocated_mb = max(min_ram_mb, min(max_ram_mb, target_ram))`\n\nStatuts de bornage de la VM :\n- Si `target_ram > max_ram_mb` : `statut=PLAFOND_MAX`\n- Si `target_ram < min_ram_mb` : `statut=SEUIL_MIN`\n- Sinon : `statut=OPTIMAL`\n\nEntrée :\n`HOST ram_mb=<H>`\n`VM name=<NOM> min_ram_mb=<MIN> max_ram_mb=<MAX> buffer_pct=<B> demand_mb=<D>` (1 ou plusieurs)\n\nRésultat d’analyse attendu :\n- Pour chaque VM (triée par nom alphabétique) :\n  `VM_ALLOC name=<NOM> target_mb=<TARGET> allocated_mb=<ALLOC> status=<STATUT>`\n- Bilan de l’hôte :\n  `SUMMARY host_ram_mb=<H> total_allocated_mb=<TOT> pression_pct=<PCT>% statut=<SOUS_CONTROLE|SURALLOCATION>`\n  (où pression_pct = round((total_allocated_mb / host_ram_mb) * 100, 1) ; statut=SOUS_CONTROLE si total <= host_ram_mb sinon SURALLOCATION).",
    "starter": "# Grille d'analyse (ws3-c5-e2) — Calculateur d’allocation de Mémoire Dynamique Hyper-V\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — VM atteignant le plafond maximal configuré]\n# Données : HOST ram_mb=32768\n# Données : VM name=VM-App min_ram_mb=2048 max_ram_mb=4096 buffer_pct=25 demand_mb=5000\nA_COMPLETER\n\n[Cas 2 — Surallocation mémoire totale au-delà de la capacité physique hôte]\n# Données : HOST ram_mb=8192\n# Données : VM name=VM1 min_ram_mb=2048 max_ram_mb=8192 buffer_pct=10 demand_mb=5000\n# Données : VM name=VM2 min_ram_mb=2048 max_ram_mb=8192 buffer_pct=10 demand_mb=5000\nA_COMPLETER\n\n[Cas 3 — Plusieurs VMs avec buffers à 0%]\n# Données : HOST ram_mb=16384\n# Données : VM name=VM-DC min_ram_mb=1024 max_ram_mb=2048 buffer_pct=0 demand_mb=1500\nA_COMPLETER\n",
    "hints": [
      "Calculer target = round(demand * (1 + buffer / 100)).",
      "Appliquer max(min, min(max, target)).",
      "Cumuler la mémoire allouée et comparer à la RAM hôte."
    ],
    "examples": [
      {
        "stdin": "HOST ram_mb=16384\nVM name=VM-Web min_ram_mb=2048 max_ram_mb=8192 buffer_pct=20 demand_mb=3000\nVM name=VM-SQL min_ram_mb=4096 max_ram_mb=12288 buffer_pct=20 demand_mb=2000",
        "expected": "VM_ALLOC name=VM-SQL target_mb=2400 allocated_mb=4096 status=SEUIL_MIN\nVM_ALLOC name=VM-Web target_mb=3600 allocated_mb=3600 status=OPTIMAL\nSUMMARY host_ram_mb=16384 total_allocated_mb=7696 pression_pct=47.0% statut=SOUS_CONTROLE",
        "note": "VM-SQL demande 2000 Mo + 20% = 2400 Mo, mais son minimum garanti est 4096 Mo (SEUIL_MIN). Total alloué = 7696 Mo sur 16384 Mo (47.0%, sous contrôle)."
      }
    ],
    "tests": [
      {
        "label": "VM atteignant le plafond maximal configuré",
        "stdin": "cas:1",
        "expected": "VM_ALLOC name=VM-App target_mb=6250 allocated_mb=4096 status=PLAFOND_MAX\nSUMMARY host_ram_mb=32768 total_allocated_mb=4096 pression_pct=12.5% statut=SOUS_CONTROLE"
      },
      {
        "label": "Surallocation mémoire totale au-delà de la capacité physique hôte",
        "stdin": "cas:2",
        "expected": "VM_ALLOC name=VM1 target_mb=5500 allocated_mb=5500 status=OPTIMAL\nVM_ALLOC name=VM2 target_mb=5500 allocated_mb=5500 status=OPTIMAL\nSUMMARY host_ram_mb=8192 total_allocated_mb=11000 pression_pct=134.3% statut=SURALLOCATION"
      },
      {
        "label": "Plusieurs VMs avec buffers à 0%",
        "stdin": "cas:3",
        "expected": "VM_ALLOC name=VM-DC target_mb=1500 allocated_mb=1500 status=OPTIMAL\nSUMMARY host_ram_mb=16384 total_allocated_mb=1500 pression_pct=9.2% statut=SOUS_CONTROLE"
      }
    ],
    "solution": "[Exemple]\nVM_ALLOC name=VM-SQL target_mb=2400 allocated_mb=4096 status=SEUIL_MIN\nVM_ALLOC name=VM-Web target_mb=3600 allocated_mb=3600 status=OPTIMAL\nSUMMARY host_ram_mb=16384 total_allocated_mb=7696 pression_pct=47.0% statut=SOUS_CONTROLE\n\n[Cas 1 — VM atteignant le plafond maximal configuré]\nVM_ALLOC name=VM-App target_mb=6250 allocated_mb=4096 status=PLAFOND_MAX\nSUMMARY host_ram_mb=32768 total_allocated_mb=4096 pression_pct=12.5% statut=SOUS_CONTROLE\n\n[Cas 2 — Surallocation mémoire totale au-delà de la capacité physique hôte]\nVM_ALLOC name=VM1 target_mb=5500 allocated_mb=5500 status=OPTIMAL\nVM_ALLOC name=VM2 target_mb=5500 allocated_mb=5500 status=OPTIMAL\nSUMMARY host_ram_mb=8192 total_allocated_mb=11000 pression_pct=134.3% statut=SURALLOCATION\n\n[Cas 3 — Plusieurs VMs avec buffers à 0%]\nVM_ALLOC name=VM-DC target_mb=1500 allocated_mb=1500 status=OPTIMAL\nSUMMARY host_ram_mb=16384 total_allocated_mb=1500 pression_pct=9.2% statut=SOUS_CONTROLE"
  },
  {
    "id": "ws3-c5-e3",
    "chapter": 5,
    "title": "Gestionnaire d’arborescence de disques virtuels différentiels VHDX et Checkpoints",
    "level": "n3",
    "language": "analyse",
    "goal": "Calculer la taille cumulée d’une chaîne de disques virtuels différentiels (.avhdx) et simuler la fusion (Merge) d’un checkpoint.",
    "brief": "Dans Hyper-V, les points de contrôle créent des disques différentiels dépendants du disque parent :\n- `VHDX id=<ID> type=<BASE|DIFF> parent=<PARENT_ID|NONE> size_mb=<S>`\n- `MERGE child=<CHILD_ID>` : opération de fusion d’un checkpoint différentiel dans son parent immédiat.\n\nRègles lors d’une opération de fusion (`MERGE child=C`) :\n1. Les données du disque différentiel `C` sont écrites dans son parent `P` : `parent.size_mb += child.size_mb`.\n2. Le disque différentiel `C` est supprimé de la chaîne.\n3. Tout éventuel disque sous-jacent qui avait `C` comme parent est rebranché pour pointer directement vers `P`.\n\nEntrée :\n`VHDX id=<ID> type=<BASE|DIFF> parent=<P|NONE> size_mb=<S>` (1 ou plusieurs)\n`MERGE child=<ID>` (0 ou plusieurs)\n\nRésultat d’analyse attendu :\n- Pour chaque commande MERGE exécutée :\n  `MERGE_EVENT child=<C> merged_into=<P> new_parent_size_mb=<S>`\n- État final de tous les disques restants (ordonnés par ID croissant) :\n  `DISK_STATE id=<ID> type=<BASE|DIFF> parent=<P|NONE> size_mb=<S>`\n- Bilan :\n  `SUMMARY total_disks=<N> total_chain_size_mb=<TOTAL>`",
    "starter": "# Grille d'analyse (ws3-c5-e3) — Gestionnaire d’arborescence de disques virtuels différentiels VHDX et Checkpoints\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Fusion du dernier checkpoint de la chaîne]\n# Données : VHDX id=OS.vhdx type=BASE parent=NONE size_mb=15000\n# Données : VHDX id=Patch.avhdx type=DIFF parent=OS.vhdx size_mb=3000\n# Données : MERGE child=Patch.avhdx\nA_COMPLETER\n\n[Cas 2 — Aucune opération de fusion (chaîne intacte)]\n# Données : VHDX id=Disk0.vhdx type=BASE parent=NONE size_mb=10000\n# Données : VHDX id=DiffA.avhdx type=DIFF parent=Disk0.vhdx size_mb=1200\n# Données : VHDX id=DiffB.avhdx type=DIFF parent=Disk0.vhdx size_mb=1800\nA_COMPLETER\n\n[Cas 3 — Deux fusions successives sur une même arborescence]\n# Données : VHDX id=Base.vhdx type=BASE parent=NONE size_mb=10000\n# Données : VHDX id=C1.avhdx type=DIFF parent=Base.vhdx size_mb=2000\n# Données : VHDX id=C2.avhdx type=DIFF parent=C1.avhdx size_mb=1000\n# Données : MERGE child=C2.avhdx\n# Données : MERGE child=C1.avhdx\nA_COMPLETER\n",
    "hints": [
      "Modéliser chaque disque avec un dictionnaire {type, parent, size_mb}.",
      "Lors de MERGE, trouver le parent, ajouter la taille de l’enfant, supprimer l’enfant.",
      "Rebrancher les enfants du disque supprimé sur le parent."
    ],
    "examples": [
      {
        "stdin": "VHDX id=Base.vhdx type=BASE parent=NONE size_mb=20000\nVHDX id=Snap1.avhdx type=DIFF parent=Base.vhdx size_mb=5000\nVHDX id=Snap2.avhdx type=DIFF parent=Snap1.avhdx size_mb=2000\nMERGE child=Snap1.avhdx",
        "expected": "MERGE_EVENT child=Snap1.avhdx merged_into=Base.vhdx new_parent_size_mb=25000\nDISK_STATE id=Base.vhdx type=BASE parent=NONE size_mb=25000\nDISK_STATE id=Snap2.avhdx type=DIFF parent=Base.vhdx size_mb=2000\nSUMMARY total_disks=2 total_chain_size_mb=27000",
        "note": "Snap1 fusionne dans Base.vhdx (20000 + 5000 = 25000 Mo). Snap2 est maintenant rattaché directement à Base.vhdx."
      }
    ],
    "tests": [
      {
        "label": "Fusion du dernier checkpoint de la chaîne",
        "stdin": "cas:1",
        "expected": "MERGE_EVENT child=Patch.avhdx merged_into=OS.vhdx new_parent_size_mb=18000\nDISK_STATE id=OS.vhdx type=BASE parent=NONE size_mb=18000\nSUMMARY total_disks=1 total_chain_size_mb=18000"
      },
      {
        "label": "Aucune opération de fusion (chaîne intacte)",
        "stdin": "cas:2",
        "expected": "DISK_STATE id=DiffA.avhdx type=DIFF parent=Disk0.vhdx size_mb=1200\nDISK_STATE id=DiffB.avhdx type=DIFF parent=Disk0.vhdx size_mb=1800\nDISK_STATE id=Disk0.vhdx type=BASE parent=NONE size_mb=10000\nSUMMARY total_disks=3 total_chain_size_mb=13000"
      },
      {
        "label": "Deux fusions successives sur une même arborescence",
        "stdin": "cas:3",
        "expected": "MERGE_EVENT child=C2.avhdx merged_into=C1.avhdx new_parent_size_mb=3000\nMERGE_EVENT child=C1.avhdx merged_into=Base.vhdx new_parent_size_mb=13000\nDISK_STATE id=Base.vhdx type=BASE parent=NONE size_mb=13000\nSUMMARY total_disks=1 total_chain_size_mb=13000"
      }
    ],
    "solution": "[Exemple]\nMERGE_EVENT child=Snap1.avhdx merged_into=Base.vhdx new_parent_size_mb=25000\nDISK_STATE id=Base.vhdx type=BASE parent=NONE size_mb=25000\nDISK_STATE id=Snap2.avhdx type=DIFF parent=Base.vhdx size_mb=2000\nSUMMARY total_disks=2 total_chain_size_mb=27000\n\n[Cas 1 — Fusion du dernier checkpoint de la chaîne]\nMERGE_EVENT child=Patch.avhdx merged_into=OS.vhdx new_parent_size_mb=18000\nDISK_STATE id=OS.vhdx type=BASE parent=NONE size_mb=18000\nSUMMARY total_disks=1 total_chain_size_mb=18000\n\n[Cas 2 — Aucune opération de fusion (chaîne intacte)]\nDISK_STATE id=DiffA.avhdx type=DIFF parent=Disk0.vhdx size_mb=1200\nDISK_STATE id=DiffB.avhdx type=DIFF parent=Disk0.vhdx size_mb=1800\nDISK_STATE id=Disk0.vhdx type=BASE parent=NONE size_mb=10000\nSUMMARY total_disks=3 total_chain_size_mb=13000\n\n[Cas 3 — Deux fusions successives sur une même arborescence]\nMERGE_EVENT child=C2.avhdx merged_into=C1.avhdx new_parent_size_mb=3000\nMERGE_EVENT child=C1.avhdx merged_into=Base.vhdx new_parent_size_mb=13000\nDISK_STATE id=Base.vhdx type=BASE parent=NONE size_mb=13000\nSUMMARY total_disks=1 total_chain_size_mb=13000"
  }
];
