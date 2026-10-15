// server/exercises/b3-windows-server/chapitre5.js
// Exercices du Module 5 : Virtualisation d'Entreprise Hyper-V (idPrefix: ws3)

module.exports = [
  {
    id: 'ws3-c5-e1',
    chapter: 5,
    title: 'Simulateur de commutation réseau Hyper-V (External, Internal, Private vSwitch)',
    level: 'n1',
    language: 'python',
    goal: 'Déterminer l’accessibilité réseau entre VMs, hôte physique et réseau externe selon le type de commutateur virtuel (vSwitch).',
    brief:
      'Dans Microsoft Hyper-V, les règles de connectivité pour chaque type de commutateur virtuel sont les suivantes :\n' +
      '- `EXTERNAL` : permet la communication entre les VMs rattachées, vers le réseau physique extérieur (`EXTERNAL_NET`), et vers l’hôte (`HOST`) si et seulement si `allow_host=TRUE`.\n' +
      '- `INTERNAL` : permet la communication entre les VMs rattachées et avec l’hôte (`HOST`). Bloqué vers `EXTERNAL_NET`.\n' +
      '- `PRIVATE` : permet la communication STRICTEMENT entre les VMs rattachées au même vSwitch. Bloqué vers `HOST` et vers `EXTERNAL_NET`.\n' +
      '- Deux VMs sur deux vSwitchs distincts ne peuvent jamais communiquer directement.\n\n' +
      'Entrée :\n' +
      '`VSWITCH name=<NOM> type=<EXTERNAL|INTERNAL|PRIVATE> allow_host=<TRUE|FALSE>`\n' +
      '`ATTACH vm=<VM> vswitch=<NOM>`\n' +
      '`PING from=<SRC> to=<DST>` (SRC et DST peuvent être un nom de VM, `HOST` ou `EXTERNAL_NET`)\n\n' +
      'Sortie :\n' +
      '- Pour chaque test PING :\n' +
      '  `PING_RESULT from=<SRC> to=<DST> status=<REUSSI|BLOQUE> motif=<OK|COMMUTATEURS_DIFFERENTS|TYPE_INTERNAL|TYPE_PRIVATE|HOST_ISOLE>`\n' +
      '- Bilan :\n' +
      '  `SUMMARY total_pings=<N> reussis=<R> bloques=<B>`',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : simuler la matrice de connectivité des vSwitchs Hyper-V
`,
    hints: [
      'Associer chaque VM à son commutateur virtuel et stocker les propriétés du vSwitch.',
      'Identifier si la source et la destination sont sur le même vSwitch.',
      'Vérifier les règles spécifiques pour HOST et EXTERNAL_NET.'
    ],
    examples: [
      {
        stdin:
          'VSWITCH name=vSwitch-LAN type=EXTERNAL allow_host=TRUE\n' +
          'ATTACH vm=VM1 vswitch=vSwitch-LAN\n' +
          'ATTACH vm=VM2 vswitch=vSwitch-LAN\n' +
          'PING from=VM1 to=VM2\n' +
          'PING from=VM1 to=EXTERNAL_NET',
        expected:
          'PING_RESULT from=VM1 to=VM2 status=REUSSI motif=OK\n' +
          'PING_RESULT from=VM1 to=EXTERNAL_NET status=REUSSI motif=OK\n' +
          'SUMMARY total_pings=2 reussis=2 bloques=0',
        note: 'Le vSwitch externe avec allow_host permet la communication inter-VM et vers le réseau extérieur.'
      }
    ],
    tests: [
      {
        label: 'Commutateur Privé bloquant l’accès vers l’hôte et l’extérieur',
        stdin:
          'VSWITCH name=vSwitch-Isole type=PRIVATE allow_host=FALSE\n' +
          'ATTACH vm=VM-DB vswitch=vSwitch-Isole\n' +
          'PING from=VM-DB to=HOST\n' +
          'PING from=VM-DB to=EXTERNAL_NET',
        expected:
          'PING_RESULT from=VM-DB to=HOST status=BLOQUE motif=TYPE_PRIVATE\n' +
          'PING_RESULT from=VM-DB to=EXTERNAL_NET status=BLOQUE motif=TYPE_PRIVATE\n' +
          'SUMMARY total_pings=2 reussis=0 bloques=2'
      },
      {
        label: 'Deux VMs rattachées à des vSwitchs différents',
        stdin:
          'VSWITCH name=SW1 type=INTERNAL allow_host=TRUE\n' +
          'VSWITCH name=SW2 type=INTERNAL allow_host=TRUE\n' +
          'ATTACH vm=VM-A vswitch=SW1\n' +
          'ATTACH vm=VM-B vswitch=SW2\n' +
          'PING from=VM-A to=VM-B',
        expected:
          'PING_RESULT from=VM-A to=VM-B status=BLOQUE motif=COMMUTATEURS_DIFFERENTS\n' +
          'SUMMARY total_pings=1 reussis=0 bloques=1'
      },
      {
        label: 'Commutateur Externe avec allow_host désactivé',
        stdin:
          'VSWITCH name=SW-Ext type=EXTERNAL allow_host=FALSE\n' +
          'ATTACH vm=VM-Web vswitch=SW-Ext\n' +
          'PING from=VM-Web to=HOST\n' +
          'PING from=VM-Web to=EXTERNAL_NET',
        expected:
          'PING_RESULT from=VM-Web to=HOST status=BLOQUE motif=HOST_ISOLE\n' +
          'PING_RESULT from=VM-Web to=EXTERNAL_NET status=REUSSI motif=OK\n' +
          'SUMMARY total_pings=2 reussis=1 bloques=1'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

vswitches = {}
vm_switch = {}
pings = []

for ligne in lignes:
    parts = ligne.split(' ')
    cmd = parts[0]
    pdict = {}
    for tok in parts[1:]:
        if '=' in tok:
            k, v = tok.split('=', 1)
            pdict[k] = v
            
    if cmd == 'VSWITCH':
        name = pdict.get('name', '')
        stype = pdict.get('type', 'EXTERNAL')
        allow = (pdict.get('allow_host', 'TRUE') == 'TRUE')
        vswitches[name] = {'type': stype, 'allow_host': allow}
    elif cmd == 'ATTACH':
        vm = pdict.get('vm', '')
        sw = pdict.get('vswitch', '')
        vm_switch[vm] = sw
    elif cmd == 'PING':
        src = pdict.get('from', '')
        dst = pdict.get('to', '')
        pings.append((src, dst))

c_ok = 0
c_bloq = 0

for src, dst in pings:
    # Cas 1 : communication VM vers VM
    if src in vm_switch and dst in vm_switch:
        sw_src = vm_switch[src]
        sw_dst = vm_switch[dst]
        if sw_src == sw_dst:
            print(f"PING_RESULT from={src} to={dst} status=REUSSI motif=OK")
            c_ok += 1
        else:
            print(f"PING_RESULT from={src} to={dst} status=BLOQUE motif=COMMUTATEURS_DIFFERENTS")
            c_bloq += 1
        continue
        
    # Cas 2 : VM vers EXTERNAL_NET ou HOST
    vm_name = src if src in vm_switch else (dst if dst in vm_switch else None)
    target = dst if vm_name == src else src
    
    if vm_name:
        sw_name = vm_switch[vm_name]
        sw_info = vswitches.get(sw_name, {'type': 'PRIVATE', 'allow_host': False})
        stype = sw_info['type']
        allow_host = sw_info['allow_host']
        
        if target == 'EXTERNAL_NET':
            if stype == 'EXTERNAL':
                print(f"PING_RESULT from={src} to={dst} status=REUSSI motif=OK")
                c_ok += 1
            elif stype == 'INTERNAL':
                print(f"PING_RESULT from={src} to={dst} status=BLOQUE motif=TYPE_INTERNAL")
                c_bloq += 1
            else:
                print(f"PING_RESULT from={src} to={dst} status=BLOQUE motif=TYPE_PRIVATE")
                c_bloq += 1
        elif target == 'HOST':
            if stype == 'EXTERNAL':
                if allow_host:
                    print(f"PING_RESULT from={src} to={dst} status=REUSSI motif=OK")
                    c_ok += 1
                else:
                    print(f"PING_RESULT from={src} to={dst} status=BLOQUE motif=HOST_ISOLE")
                    c_bloq += 1
            elif stype == 'INTERNAL':
                print(f"PING_RESULT from={src} to={dst} status=REUSSI motif=OK")
                c_ok += 1
            else:
                print(f"PING_RESULT from={src} to={dst} status=BLOQUE motif=TYPE_PRIVATE")
                c_bloq += 1

print(f"SUMMARY total_pings={len(pings)} reussis={c_ok} bloques={c_bloq}")
`
  },
  {
    id: 'ws3-c5-e2',
    chapter: 5,
    title: 'Calculateur d’allocation de Mémoire Dynamique Hyper-V',
    level: 'n2',
    language: 'python',
    goal: 'Calculer l’allocation de RAM par machine virtuelle en intégrant la demande courante, le tampon mémoire et la capacité physique de l’hôte.',
    brief:
      'Dans Hyper-V, la mémoire dynamique ajuste la RAM de chaque VM selon la formule officielle Microsoft :\n' +
      '- `target_ram = round(demand_mb * (1 + buffer_pct / 100))`\n' +
      '- Bornage contractuel : `allocated_mb = max(min_ram_mb, min(max_ram_mb, target_ram))`\n\n' +
      'Statuts de bornage de la VM :\n' +
      '- Si `target_ram > max_ram_mb` : `statut=PLAFOND_MAX`\n' +
      '- Si `target_ram < min_ram_mb` : `statut=SEUIL_MIN`\n' +
      '- Sinon : `statut=OPTIMAL`\n\n' +
      'Entrée :\n' +
      '`HOST ram_mb=<H>`\n' +
      '`VM name=<NOM> min_ram_mb=<MIN> max_ram_mb=<MAX> buffer_pct=<B> demand_mb=<D>` (1 ou plusieurs)\n\n' +
      'Sortie :\n' +
      '- Pour chaque VM (triée par nom alphabétique) :\n' +
      '  `VM_ALLOC name=<NOM> target_mb=<TARGET> allocated_mb=<ALLOC> status=<STATUT>`\n' +
      '- Bilan de l’hôte :\n' +
      '  `SUMMARY host_ram_mb=<H> total_allocated_mb=<TOT> pression_pct=<PCT>% statut=<SOUS_CONTROLE|SURALLOCATION>`\n' +
      '  (où pression_pct = round((total_allocated_mb / host_ram_mb) * 100, 1) ; statut=SOUS_CONTROLE si total <= host_ram_mb sinon SURALLOCATION).',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer l'allocation dynamique de RAM
`,
    hints: [
      'Calculer target = round(demand * (1 + buffer / 100)).',
      'Appliquer max(min, min(max, target)).',
      'Cumuler la mémoire allouée et comparer à la RAM hôte.'
    ],
    examples: [
      {
        stdin:
          'HOST ram_mb=16384\n' +
          'VM name=VM-Web min_ram_mb=2048 max_ram_mb=8192 buffer_pct=20 demand_mb=3000\n' +
          'VM name=VM-SQL min_ram_mb=4096 max_ram_mb=12288 buffer_pct=20 demand_mb=2000',
        expected:
          'VM_ALLOC name=VM-SQL target_mb=2400 allocated_mb=4096 status=SEUIL_MIN\n' +
          'VM_ALLOC name=VM-Web target_mb=3600 allocated_mb=3600 status=OPTIMAL\n' +
          'SUMMARY host_ram_mb=16384 total_allocated_mb=7696 pression_pct=47.0% statut=SOUS_CONTROLE',
        note: 'VM-SQL demande 2000 Mo + 20% = 2400 Mo, mais son minimum garanti est 4096 Mo (SEUIL_MIN). Total alloué = 7696 Mo sur 16384 Mo (47.0%, sous contrôle).'
      }
    ],
    tests: [
      {
        label: 'VM atteignant le plafond maximal configuré',
        stdin:
          'HOST ram_mb=32768\n' +
          'VM name=VM-App min_ram_mb=2048 max_ram_mb=4096 buffer_pct=25 demand_mb=5000',
        expected:
          'VM_ALLOC name=VM-App target_mb=6250 allocated_mb=4096 status=PLAFOND_MAX\n' +
          'SUMMARY host_ram_mb=32768 total_allocated_mb=4096 pression_pct=12.5% statut=SOUS_CONTROLE'
      },
      {
        label: 'Surallocation mémoire totale au-delà de la capacité physique hôte',
        stdin:
          'HOST ram_mb=8192\n' +
          'VM name=VM1 min_ram_mb=2048 max_ram_mb=8192 buffer_pct=10 demand_mb=5000\n' +
          'VM name=VM2 min_ram_mb=2048 max_ram_mb=8192 buffer_pct=10 demand_mb=5000',
        expected:
          'VM_ALLOC name=VM1 target_mb=5500 allocated_mb=5500 status=OPTIMAL\n' +
          'VM_ALLOC name=VM2 target_mb=5500 allocated_mb=5500 status=OPTIMAL\n' +
          'SUMMARY host_ram_mb=8192 total_allocated_mb=11000 pression_pct=134.3% statut=SURALLOCATION'
      },
      {
        label: 'Plusieurs VMs avec buffers à 0%',
        stdin:
          'HOST ram_mb=16384\n' +
          'VM name=VM-DC min_ram_mb=1024 max_ram_mb=2048 buffer_pct=0 demand_mb=1500',
        expected:
          'VM_ALLOC name=VM-DC target_mb=1500 allocated_mb=1500 status=OPTIMAL\n' +
          'SUMMARY host_ram_mb=16384 total_allocated_mb=1500 pression_pct=9.2% statut=SOUS_CONTROLE'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

host_ram = 0
vms = []

for ligne in lignes:
    parts = ligne.split(' ')
    cmd = parts[0]
    pdict = {}
    for tok in parts[1:]:
        if '=' in tok:
            k, v = tok.split('=', 1)
            pdict[k] = v
            
    if cmd == 'HOST':
        host_ram = int(pdict.get('ram_mb', 0))
    elif cmd == 'VM':
        name = pdict.get('name', '')
        min_r = int(pdict.get('min_ram_mb', 512))
        max_r = int(pdict.get('max_ram_mb', 4096))
        buf = int(pdict.get('buffer_pct', 20))
        dem = int(pdict.get('demand_mb', 1024))
        vms.append((name, min_r, max_r, buf, dem))

vms.sort(key=lambda x: x[0])

tot_allocated = 0

for name, min_r, max_r, buf, dem in vms:
    target = int(round(dem * (1.0 + (buf / 100.0))))
    if target > max_r:
        allocated = max_r
        status = 'PLAFOND_MAX'
    elif target < min_r:
        allocated = min_r
        status = 'SEUIL_MIN'
    else:
        allocated = target
        status = 'OPTIMAL'
        
    tot_allocated += allocated
    print(f"VM_ALLOC name={name} target_mb={target} allocated_mb={allocated} status={status}")

pct = round((tot_allocated / host_ram * 100.0), 1) if host_ram > 0 else 0.0
statut = "SOUS_CONTROLE" if tot_allocated <= host_ram else "SURALLOCATION"

print(f"SUMMARY host_ram_mb={host_ram} total_allocated_mb={tot_allocated} pression_pct={pct:.1f}% statut={statut}")
`
  },
  {
    id: 'ws3-c5-e3',
    chapter: 5,
    title: 'Gestionnaire d’arborescence de disques virtuels différentiels VHDX et Checkpoints',
    level: 'n3',
    language: 'python',
    goal: 'Calculer la taille cumulée d’une chaîne de disques virtuels différentiels (.avhdx) et simuler la fusion (Merge) d’un checkpoint.',
    brief:
      'Dans Hyper-V, les points de contrôle créent des disques différentiels dépendants du disque parent :\n' +
      '- `VHDX id=<ID> type=<BASE|DIFF> parent=<PARENT_ID|NONE> size_mb=<S>`\n' +
      '- `MERGE child=<CHILD_ID>` : opération de fusion d’un checkpoint différentiel dans son parent immédiat.\n\n' +
      'Règles lors d’une opération de fusion (`MERGE child=C`) :\n' +
      '1. Les données du disque différentiel `C` sont écrites dans son parent `P` : `parent.size_mb += child.size_mb`.\n' +
      '2. Le disque différentiel `C` est supprimé de la chaîne.\n' +
      '3. Tout éventuel disque sous-jacent qui avait `C` comme parent est rebranché pour pointer directement vers `P`.\n\n' +
      'Entrée :\n' +
      '`VHDX id=<ID> type=<BASE|DIFF> parent=<P|NONE> size_mb=<S>` (1 ou plusieurs)\n' +
      '`MERGE child=<ID>` (0 ou plusieurs)\n\n' +
      'Sortie :\n' +
      '- Pour chaque commande MERGE exécutée :\n' +
      '  `MERGE_EVENT child=<C> merged_into=<P> new_parent_size_mb=<S>`\n' +
      '- État final de tous les disques restants (ordonnés par ID croissant) :\n' +
      '  `DISK_STATE id=<ID> type=<BASE|DIFF> parent=<P|NONE> size_mb=<S>`\n' +
      '- Bilan :\n' +
      '  `SUMMARY total_disks=<N> total_chain_size_mb=<TOTAL>`',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : gérer l'arborescence VHDX et simuler la fusion des checkpoints
`,
    hints: [
      'Modéliser chaque disque avec un dictionnaire {type, parent, size_mb}.',
      'Lors de MERGE, trouver le parent, ajouter la taille de l’enfant, supprimer l’enfant.',
      'Rebrancher les enfants du disque supprimé sur le parent.'
    ],
    examples: [
      {
        stdin:
          'VHDX id=Base.vhdx type=BASE parent=NONE size_mb=20000\n' +
          'VHDX id=Snap1.avhdx type=DIFF parent=Base.vhdx size_mb=5000\n' +
          'VHDX id=Snap2.avhdx type=DIFF parent=Snap1.avhdx size_mb=2000\n' +
          'MERGE child=Snap1.avhdx',
        expected:
          'MERGE_EVENT child=Snap1.avhdx merged_into=Base.vhdx new_parent_size_mb=25000\n' +
          'DISK_STATE id=Base.vhdx type=BASE parent=NONE size_mb=25000\n' +
          'DISK_STATE id=Snap2.avhdx type=DIFF parent=Base.vhdx size_mb=2000\n' +
          'SUMMARY total_disks=2 total_chain_size_mb=27000',
        note: 'Snap1 fusionne dans Base.vhdx (20000 + 5000 = 25000 Mo). Snap2 est maintenant rattaché directement à Base.vhdx.'
      }
    ],
    tests: [
      {
        label: 'Fusion du dernier checkpoint de la chaîne',
        stdin:
          'VHDX id=OS.vhdx type=BASE parent=NONE size_mb=15000\n' +
          'VHDX id=Patch.avhdx type=DIFF parent=OS.vhdx size_mb=3000\n' +
          'MERGE child=Patch.avhdx',
        expected:
          'MERGE_EVENT child=Patch.avhdx merged_into=OS.vhdx new_parent_size_mb=18000\n' +
          'DISK_STATE id=OS.vhdx type=BASE parent=NONE size_mb=18000\n' +
          'SUMMARY total_disks=1 total_chain_size_mb=18000'
      },
      {
        label: 'Aucune opération de fusion (chaîne intacte)',
        stdin:
          'VHDX id=Disk0.vhdx type=BASE parent=NONE size_mb=10000\n' +
          'VHDX id=DiffA.avhdx type=DIFF parent=Disk0.vhdx size_mb=1200\n' +
          'VHDX id=DiffB.avhdx type=DIFF parent=Disk0.vhdx size_mb=1800',
        expected:
          'DISK_STATE id=DiffA.avhdx type=DIFF parent=Disk0.vhdx size_mb=1200\n' +
          'DISK_STATE id=DiffB.avhdx type=DIFF parent=Disk0.vhdx size_mb=1800\n' +
          'DISK_STATE id=Disk0.vhdx type=BASE parent=NONE size_mb=10000\n' +
          'SUMMARY total_disks=3 total_chain_size_mb=13000'
      },
      {
        label: 'Deux fusions successives sur une même arborescence',
        stdin:
          'VHDX id=Base.vhdx type=BASE parent=NONE size_mb=10000\n' +
          'VHDX id=C1.avhdx type=DIFF parent=Base.vhdx size_mb=2000\n' +
          'VHDX id=C2.avhdx type=DIFF parent=C1.avhdx size_mb=1000\n' +
          'MERGE child=C2.avhdx\n' +
          'MERGE child=C1.avhdx',
        expected:
          'MERGE_EVENT child=C2.avhdx merged_into=C1.avhdx new_parent_size_mb=3000\n' +
          'MERGE_EVENT child=C1.avhdx merged_into=Base.vhdx new_parent_size_mb=13000\n' +
          'DISK_STATE id=Base.vhdx type=BASE parent=NONE size_mb=13000\n' +
          'SUMMARY total_disks=1 total_chain_size_mb=13000'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

disks = {}
merges = []

for ligne in lignes:
    parts = ligne.split(' ')
    cmd = parts[0]
    pdict = {}
    for tok in parts[1:]:
        if '=' in tok:
            k, v = tok.split('=', 1)
            pdict[k] = v
            
    if cmd == 'VHDX':
        did = pdict.get('id', '')
        dtype = pdict.get('type', 'BASE')
        parent = pdict.get('parent', 'NONE')
        sz = int(pdict.get('size_mb', 0))
        disks[did] = {'type': dtype, 'parent': parent, 'size_mb': sz}
    elif cmd == 'MERGE':
        cid = pdict.get('child', '')
        merges.append(cid)

for child_id in merges:
    if child_id not in disks:
        continue
    child = disks[child_id]
    parent_id = child['parent']
    if parent_id in disks:
        disks[parent_id]['size_mb'] += child['size_mb']
        print(f"MERGE_EVENT child={child_id} merged_into={parent_id} new_parent_size_mb={disks[parent_id]['size_mb']}")
        # Rebrancher les éventuels petits-enfants
        for other_id, other in disks.items():
            if other['parent'] == child_id:
                other['parent'] = parent_id
        # Supprimer le disque enfant fusionné
        del disks[child_id]

total_size = 0
for did in sorted(disks.keys()):
    dinfo = disks[did]
    sz = dinfo['size_mb']
    total_size += sz
    print(f"DISK_STATE id={did} type={dinfo['type']} parent={dinfo['parent']} size_mb={sz}")

print(f"SUMMARY total_disks={len(disks)} total_chain_size_mb={total_size}")
`
  }
];
