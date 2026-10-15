/**
 * server/exercises/b3-virtualisation/chapitre3.js — Exercices du Chapitre 3
 * Chapitre 3 : Stockage Virtuel & Systèmes de Fichiers (VMFS, vSAN, NFS/iSCSI)
 */
'use strict';

module.exports = [
  {
    id: 'vrt3-c3-e1',
    chapter: 3,
    title: 'Dimensionneur de Datastores VMFS & Provisionnement de Disques (Thin vs Thick)',
    level: 'n1',
    language: 'python',
    goal: 'Calculer la consommation logique et physique d\'un Datastore VMFS selon les types de provisionnement (Thick vs Thin).',
    brief: `<p>Sur un Datastore VMware VMFS, les disques virtuels (.vmdk) utilisent différentes stratégies de provisionnement :<br><br>
1. <strong>Types de disques</strong> :<br>
- <code>THICK_EAGER</code> ou <code>THICK_LAZY</code> : L'espace est alloué à 100% dès la création (consommation physique = taille déclarée).<br>
- <code>THIN</code> : Seul l'espace réellement écrit est consommé sur le Datastore (spécifié par <code>taille:THIN:pct</code>, où <code>pct</code> est le pourcentage consommé, ex: <code>100:THIN:25</code> consomme 25 Go physiques).<br><br>
2. <strong>Calculs sur le Datastore</strong> :<br>
- <code>log_gb</code> : Somme des tailles déclarées (nominales) de toutes les VMs.<br>
- <code>phy_gb</code> : Somme de l'espace physique réellement réservé.<br>
- <code>log_pct = (log_gb / DS_SIZE_GB) * 100.0</code>.<br>
- <code>phy_pct = (phy_gb / DS_SIZE_GB) * 100.0</code>.<br><br>
3. <strong>Statut de conformité du Datastore</strong> :<br>
- Si <code>phy_gb &gt; DS_SIZE_GB</code> : <code>OVERFLOW_PHYSIQUE</code> (espace disque insuffisant).<br>
- Si <code>phy_pct &gt; 80.0</code> : <code>ALERTE_SATURATION</code> (seuil d'alerte VMware de 80% dépassé).<br>
- Si <code>log_gb &gt; DS_SIZE_GB</code> et <code>phy_pct &le; 80.0</code> : <code>OVERCOMMITTED_OK</code> (surallocation saine).<br>
- Sinon : <code>NOMINAL</code>.<br><br>
Format d'entrée (sur STDIN) :<br>
Lignes : <code>DATASTORE=&lt;nom&gt; DS_SIZE_GB=&lt;n&gt; DISKS=&lt;vm1:taille:type[:pct],vm2:...&gt;</code>.<br><br>
Format de sortie :<br>
<code>DATASTORE:&lt;nom&gt; | LOGICAL:&lt;log_gb&gt;GB (&lt;log_pct:.1f&gt;%) | PHYSICAL:&lt;phy_gb:.1f&gt;GB (&lt;phy_pct:.1f&gt;%) | STATUT:&lt;statut&gt;</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : analyser le Datastore, calculer l'espace logique et physique et qualifier le statut
`,
    hints: [
      "Pour les disques THIN, multipliez la taille par (pct / 100.0) pour obtenir l'espace physique.",
      "Pour les disques THICK, l'espace physique est exactement égal à la taille déclarée."
    ],
    examples: [
      {
        stdin: 'DATASTORE=ds-san-01 DS_SIZE_GB=1000 DISKS=vm1:200:THICK_EAGER,vm2:300:THIN:30,vm3:400:THIN:20\nDATASTORE=ds-nfs-02 DS_SIZE_GB=500 DISKS=vm4:400:THICK_LAZY,vm5:200:THIN:50',
        expected: 'DATASTORE:ds-san-01 | LOGICAL:900GB (90.0%) | PHYSICAL:370.0GB (37.0%) | STATUT:NOMINAL\nDATASTORE:ds-nfs-02 | LOGICAL:600GB (120.0%) | PHYSICAL:500.0GB (100.0%) | STATUT:ALERTE_SATURATION\n',
        note: 'Datastore nominal sous 80% vs Datastore saturé à 100% avec surallocation logique.'
      }
    ],
    tests: [
      {
        label: 'Surallocation logique saine sous 80% physique',
        stdin: 'DATASTORE=ds-overcommit DS_SIZE_GB=1000 DISKS=vmA:600:THIN:25,vmB:600:THIN:25,vmC:400:THIN:20\nDATASTORE=ds-overflow DS_SIZE_GB=400 DISKS=vm1:300:THICK_EAGER,vm2:200:THICK_LAZY',
        expected: 'DATASTORE:ds-overcommit | LOGICAL:1600GB (160.0%) | PHYSICAL:380.0GB (38.0%) | STATUT:OVERCOMMITTED_OK\nDATASTORE:ds-overflow | LOGICAL:500GB (125.0%) | PHYSICAL:500.0GB (125.0%) | STATUT:OVERFLOW_PHYSIQUE\n'
      },
      {
        label: 'Datastore franchissant pile le seuil d\'alerte 80%',
        stdin: 'DATASTORE=ds-limit DS_SIZE_GB=1000 DISKS=vm1:820:THICK_EAGER',
        expected: 'DATASTORE:ds-limit | LOGICAL:820GB (82.0%) | PHYSICAL:820.0GB (82.0%) | STATUT:ALERTE_SATURATION\n'
      }
    ],
    solution: `import sys

for line in sys.stdin:
    line = line.strip()
    if not line:
        continue
    parts = dict(p.split("=", 1) for p in line.split())
    ds = parts.get("DATASTORE", "ds")
    ds_size = float(parts.get("DS_SIZE_GB", 1000))
    disks_str = parts.get("DISKS", "")

    log_gb = 0
    phy_gb = 0.0

    if disks_str:
        for d in disks_str.split(","):
            d = d.strip()
            if not d:
                continue
            seg = d.split(":")
            # format vm:taille:type[:pct]
            size = float(seg[1])
            disk_type = seg[2].upper()
            log_gb += int(size)

            if disk_type == "THIN":
                pct = float(seg[3]) if len(seg) > 3 else 100.0
                phy_gb += size * (pct / 100.0)
            else:
                phy_gb += size

    log_pct = (log_gb / ds_size) * 100.0
    phy_pct = (phy_gb / ds_size) * 100.0

    if phy_gb > ds_size:
        statut = "OVERFLOW_PHYSIQUE"
    elif phy_pct > 80.0:
        statut = "ALERTE_SATURATION"
    elif log_gb > ds_size and phy_pct <= 80.0:
        statut = "OVERCOMMITTED_OK"
    else:
        statut = "NOMINAL"

    print(f"DATASTORE:{ds} | LOGICAL:{log_gb}GB ({log_pct:.1f}%) | PHYSICAL:{phy_gb:.1f}GB ({phy_pct:.1f}%) | STATUT:{statut}")
`
  },
  {
    id: 'vrt3-c3-e2',
    chapter: 3,
    title: 'Calculateur de Capacité Utile vSAN & Politiques SPBM (FTT / RAID-1 / RAID-5)',
    level: 'n2',
    language: 'python',
    goal: 'Calculer la consommation brute et la capacité restante d\'un cluster vSAN selon les règles SPBM (Failures to Tolerate).',
    brief: `<p>VMware vSAN protège les machines virtuelles en appliquant des politiques de stockage SPBM avec facteurs d'amplification d'écriture :<br><br>
1. <strong>Politiques de protection (SPBM)</strong> :<br>
- <code>FTT=1_RAID1</code> (Miroir) : Multiplicateur = <code>2.00x</code> (min 3 hôtes).<br>
- <code>FTT=1_RAID5</code> (Érasure Coding 3+1) : Multiplicateur = <code>1.33x</code> (min 4 hôtes).<br>
- <code>FTT=2_RAID1</code> (Triple miroir) : Multiplicateur = <code>3.00x</code> (min 5 hôtes).<br>
- <code>FTT=2_RAID6</code> (Érasure Coding 4+2) : Multiplicateur = <code>1.50x</code> (min 6 hôtes).<br><br>
2. <strong>Espace de réserve opérationnelle (Slack Space)</strong> :<br>
vSAN réserve obligatoirement 20% de la capacité brute du cluster pour les opérations internes (rebuild en cas de panne) :<br>
<code>usable_limit_tb = RAW_CAPACITY_TB * 0.80</code>.<br><br>
3. <strong>Consommation et capacité restante</strong> :<br>
- <code>consumed_raw_tb = VM_DATA_TB * multiplier</code>.<br>
- <code>remaining_tb = usable_limit_tb - consumed_raw_tb</code>.<br><br>
4. <strong>Validation et statut</strong> :<br>
- Si <code>CLUSTER_HOSTS &lt; min_hosts</code> : <code>ERROR:INVALID_HOST_COUNT</code>.<br>
- Si <code>remaining_tb &lt; 0.0</code> : <code>CAPACITY_EXCEEDED</code>.<br>
- Si <code>consumed_raw_tb &gt; usable_limit_tb * 0.85</code> : <code>WARNING_SLACK</code>.<br>
- Sinon : <code>HEALTHY</code>.<br><br>
Format d'entrée (sur STDIN) :<br>
Lignes : <code>HOSTS=&lt;nb&gt; RAW_CAPACITY_TB=&lt;to&gt; POLICY=&lt;nom&gt; VM_DATA_TB=&lt;to&gt;</code>.<br><br>
Format de sortie :<br>
<code>POLICY:&lt;nom&gt; | MULTIPLIER:&lt;mult:.2f&gt;x | CONSUMED:&lt;consumed_raw_tb:.2f&gt;TB | REMAINING:&lt;remaining_tb:.2f&gt;TB | STATUT:&lt;statut&gt;</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : implémenter les multiplicateurs SPBM, le slack space 20% et le contrôle d'hôtes vSAN
`,
    hints: [
      "Vérifiez le nombre minimal d'hôtes requis par chaque politique avant les calculs.",
      "La réserve de Slack Space (20%) réduit la capacité utilisable à RAW_CAPACITY_TB * 0.80."
    ],
    examples: [
      {
        stdin: 'HOSTS=4 RAW_CAPACITY_TB=50.0 POLICY=FTT=1_RAID5 VM_DATA_TB=15.0\nHOSTS=3 RAW_CAPACITY_TB=60.0 POLICY=FTT=1_RAID1 VM_DATA_TB=20.0\nHOSTS=3 RAW_CAPACITY_TB=40.0 POLICY=FTT=1_RAID5 VM_DATA_TB=10.0',
        expected: `POLICY:FTT=1_RAID5 | MULTIPLIER:1.33x | CONSUMED:20.00TB | REMAINING:20.00TB | STATUT:HEALTHY
POLICY:FTT=1_RAID1 | MULTIPLIER:2.00x | CONSUMED:40.00TB | REMAINING:8.00TB | STATUT:HEALTHY
ERROR:INVALID_HOST_COUNT
`,
        note: 'vSAN RAID-5 sain sur 4 hôtes, RAID-1 en avertissement slack space et échec d\'hôtes insuffisants.'
      }
    ],
    tests: [
      {
        label: 'FTT=2 avec RAID-6 et dépassement de capacité',
        stdin: 'HOSTS=6 RAW_CAPACITY_TB=100.0 POLICY=FTT=2_RAID6 VM_DATA_TB=40.0\nHOSTS=6 RAW_CAPACITY_TB=80.0 POLICY=FTT=2_RAID1 VM_DATA_TB=25.0',
        expected: `POLICY:FTT=2_RAID6 | MULTIPLIER:1.50x | CONSUMED:60.00TB | REMAINING:20.00TB | STATUT:HEALTHY
POLICY:FTT=2_RAID1 | MULTIPLIER:3.00x | CONSUMED:75.00TB | REMAINING:-11.00TB | STATUT:CAPACITY_EXCEEDED
`
      },
      {
        label: 'Hôtes insuffisants pour FTT=2 RAID-6',
        stdin: 'HOSTS=5 RAW_CAPACITY_TB=100.0 POLICY=FTT=2_RAID6 VM_DATA_TB=20.0',
        expected: 'ERROR:INVALID_HOST_COUNT\n'
      }
    ],
    solution: `import sys

POLICIES = {
    "FTT=1_RAID1": (2.0, 3),
    "FTT=1_RAID5": (4.0 / 3.0, 4),
    "FTT=2_RAID1": (3.0, 5),
    "FTT=2_RAID6": (1.5, 6)
}

for line in sys.stdin:
    line = line.strip()
    if not line:
        continue
    parts = dict(p.split("=", 1) for p in line.split())
    hosts = int(parts.get("HOSTS", 3))
    raw_tb = float(parts.get("RAW_CAPACITY_TB", 50))
    policy = parts.get("POLICY", "FTT=1_RAID1")
    vm_tb = float(parts.get("VM_DATA_TB", 10))

    if policy not in POLICIES:
        print("ERROR:UNKNOWN_POLICY")
        continue

    mult, min_hosts = POLICIES[policy]
    if hosts < min_hosts:
        print("ERROR:INVALID_HOST_COUNT")
        continue

    usable_limit = raw_tb * 0.80
    consumed_raw = vm_tb * mult
    remaining = usable_limit - consumed_raw

    if remaining < 0.0:
        statut = "CAPACITY_EXCEEDED"
    elif consumed_raw > (usable_limit * 0.85):
        statut = "WARNING_SLACK"
    else:
        statut = "HEALTHY"

    print(f"POLICY:{policy} | MULTIPLIER:{mult:.2f}x | CONSUMED:{consumed_raw:.2f}TB | REMAINING:{remaining:.2f}TB | STATUT:{statut}")
`
  },
  {
    id: 'vrt3-c3-e3',
    chapter: 3,
    title: 'Moteur d\'Arbitrage Multipathing MPIO (Round Robin & Fixed)',
    level: 'n3',
    language: 'python',
    goal: 'Simuler l\'acheminement des requêtes I/O disque sur les chemins SAN selon les politiques multipathing MPIO (Round Robin et Fixed).',
    brief: `<p>Le plug-in natif de sélection de chemin VMware NMP (Native Multipathing) répartit les flux d'entrées/sorties sur les adaptateurs HBA/iSCSI :<br><br>
1. <strong>Politique <code>VMW_PSP_RR</code> (Round Robin)</strong> :<br>
Alterne équitablement les requêtes I/O entre tous les chemins actifs. Dès qu'un chemin traite <code>THRESHOLD</code> I/O (par défaut 1000, ou valeur configurée), le commutateur bascule sur le chemin actif suivant en anneau circulaire.<br><br>
2. <strong>Politique <code>VMW_PSP_FIXED</code></strong> :<br>
Envoie la totalité des I/O sur le chemin <code>PREFERRED</code>. Si ce chemin tombe en panne (événement <code>FAIL:&lt;path&gt;</code>), les I/O basculent sur le premier chemin alternatif actif. Dès que le chemin préféré se rétablit (<code>RECOVER:&lt;path&gt;</code>), le trafic y revient immédiatement (<em>Failback</em>).<br><br>
Format d'entrée (sur STDIN) :<br>
Ligne 1 : <code>POLICY=&lt;RR|FIXED&gt; PATHS=&lt;p1,p2,...&gt; PREFERRED=&lt;path&gt; THRESHOLD=&lt;nb&gt;</code>.<br>
Lignes suivantes : Événements <code>IO=&lt;nb&gt;</code>, <code>FAIL=&lt;path&gt;</code> ou <code>RECOVER=&lt;path&gt;</code>.<br><br>
Format de sortie :<br>
Pour chaque chemin, afficher le nombre total d'I/O reçues :<br>
<code>PATH:&lt;p1&gt;=&lt;total_io&gt; | PATH:&lt;p2&gt;=&lt;total_io&gt; | ... | CURRENT_ACTIVE:&lt;chemin_courant&gt;</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : implémenter la distribution des I/O selon les politiques Round Robin et Fixed
`,
    hints: [
      "En Round Robin, gérez un compteur d'I/O sur le chemin courant pour basculer dès que THRESHOLD est atteint.",
      "En cas d'événement FAIL, retirez le chemin des actifs ; s'il s'agissait du chemin courant, basculez vers le suivant."
    ],
    examples: [
      {
        stdin: `POLICY=RR PATHS=vmhba1:C0:T0:L0,vmhba2:C0:T0:L0 THRESHOLD=1000
IO=1000
IO=1000
IO=500`,
        expected: 'PATH:vmhba1:C0:T0:L0=1500 | PATH:vmhba2:C0:T0:L0=1000 | CURRENT_ACTIVE:vmhba1:C0:T0:L0\n',
        note: 'Round Robin alternant par tranche de 1000 I/O entre deux chemins.'
      }
    ],
    tests: [
      {
        label: 'Politique FIXED avec panne et rétablissement du chemin préféré',
        stdin: `POLICY=FIXED PATHS=hba1,hba2 PREFERRED=hba1 THRESHOLD=1000
IO=2000
FAIL=hba1
IO=1500
RECOVER=hba1
IO=500`,
        expected: 'PATH:hba1=2500 | PATH:hba2=1500 | CURRENT_ACTIVE:hba1\n'
      },
      {
        label: 'Round Robin avec panne d\'un chemin pendant le flux',
        stdin: `POLICY=RR PATHS=p1,p2,p3 THRESHOLD=100
IO=100
IO=100
FAIL=p3
IO=200`,
        expected: 'PATH:p1=200 | PATH:p2=200 | PATH:p3=0 | CURRENT_ACTIVE:p1\n'
      }
    ],
    solution: `import sys

lines = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]
if not lines:
    sys.exit(0)

header = dict(p.split("=", 1) for p in lines[0].split())
policy = header.get("POLICY", "RR").upper()
all_paths = [p.strip() for p in header.get("PATHS", "").split(",") if p.strip()]
preferred = header.get("PREFERRED", all_paths[0] if all_paths else "")
threshold = int(header.get("THRESHOLD", 1000))

active_paths = list(all_paths)
io_counts = {p: 0 for p in all_paths}

rr_idx = 0
current_path_io = 0

def get_current():
    if policy == "FIXED":
        if preferred in active_paths:
            return preferred
        return active_paths[0] if active_paths else None
    else:
        if not active_paths:
            return None
        return active_paths[rr_idx % len(active_paths)]

current = get_current()

for line in lines[1:]:
    if "=" not in line:
        continue
    k, v = line.split("=", 1)
    k, v = k.strip().upper(), v.strip()

    if k == "FAIL":
        if v in active_paths:
            active_paths.remove(v)
            if policy == "RR":
                if active_paths:
                    rr_idx = rr_idx % len(active_paths)
                current_path_io = 0
        current = get_current()

    elif k == "RECOVER":
        if v in all_paths and v not in active_paths:
            active_paths.append(v)
            active_paths.sort(key=lambda x: all_paths.index(x))
        current = get_current()

    elif k == "IO":
        nb = int(v)
        while nb > 0 and active_paths:
            current = get_current()
            if not current:
                break
            if policy == "FIXED":
                io_counts[current] += nb
                nb = 0
            else:
                # Round Robin
                allowed = threshold - current_path_io
                take = min(nb, allowed)
                io_counts[current] += take
                current_path_io += take
                nb -= take
                if current_path_io >= threshold:
                    current_path_io = 0
                    rr_idx = (rr_idx + 1) % len(active_paths)

current = get_current()
cur_str = current if current else "NONE"
out = " | ".join(f"PATH:{p}={io_counts[p]}" for p in all_paths)
print(f"{out} | CURRENT_ACTIVE:{cur_str}")
`
  }
];
