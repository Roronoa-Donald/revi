/**
 * server/exercises/b3-virtualisation/chapitre2.js — Exercices du Chapitre 2
 * Chapitre 2 : Écosystème VMware vSphere & Hôtes ESXi
 */
'use strict';

module.exports = [
  {
    id: 'vrt3-c2-e1',
    chapter: 2,
    title: 'Parseur de Fichier de Configuration VM .vmx & Validateur d\'Options Matérielles',
    level: 'n1',
    language: 'python',
    goal: 'Parser la structure clé-valeur d\'un fichier de description de machine virtuelle VMware (.vmx) et extraire les options matérielles.',
    brief: `<p>Dans l'infrastructure VMware ESXi / Workstation, une machine virtuelle est définie par un fichier texte <code>.vmx</code> composé de paires <code>cle = "valeur"</code> :<br><br>
Champs à extraire :<br>
- <code>VM</code> : valeur de <code>displayName</code> (ou <code>"VM-Inconnue"</code> si absente).<br>
- <code>OS</code> : valeur de <code>guestOS</code> (ou <code>"other"</code>).<br>
- <code>VCPUS</code> : entier <code>numvcpus</code> (par défaut 1).<br>
- <code>RAM</code> : entier <code>memsize</code> en Mo (par défaut 1024).<br>
- <code>BOOT</code> : valeur de <code>firmware</code> (par défaut <code>"bios"</code>, en minuscules).<br>
- <code>SECURE_BOOT</code> : <code>"ENABLED"</code> si <code>uefi.secureBoot.enabled = "TRUE"</code> (insensible à la casse), sinon <code>"DISABLED"</code>.<br>
- <code>TOOLS_SYNC</code> : <code>"YES"</code> si <code>tools.syncTime = "TRUE"</code> (insensible à la casse), sinon <code>"NO"</code>.<br><br>
Format d'entrée (sur STDIN) :<br>
Un bloc de fichier <code>.vmx</code> complet.<br><br>
Format de sortie :<br>
<code>VM:<VM> | OS:<OS> | VCPUS:<VCPUS> | RAM:<RAM>MB | BOOT:<BOOT> | SECURE_BOOT:<SECURE_BOOT> | TOOLS_SYNC:<TOOLS_SYNC></code></p>`,
    starter: `import sys

texte = sys.stdin.read()

# À compléter : analyser le contenu .vmx et extraire les paramètres normalisés
`,
    hints: [
      "Isolez les lignes avec clé = 'valeur' en retirant les guillemets et espaces superflus.",
      "Gérez les valeurs par défaut si une directive est absente du fichier .vmx."
    ],
    examples: [
      {
        stdin: `displayName = "SRV-PROD-WEB01"
guestOS = "rhel9-64"
numvcpus = "4"
memsize = "8192"
firmware = "efi"
uefi.secureBoot.enabled = "TRUE"
tools.syncTime = "TRUE"
ethernet0.virtualDev = "vmxnet3"`,
        expected: 'VM:SRV-PROD-WEB01 | OS:rhel9-64 | VCPUS:4 | RAM:8192MB | BOOT:efi | SECURE_BOOT:ENABLED | TOOLS_SYNC:YES\n',
        note: 'Configuration d\'un serveur Linux RHEL sous UEFI avec Secure Boot et synchronisation horaire.'
      }
    ],
    tests: [
      {
        label: 'Configuration minimale par défaut sans options avancées',
        stdin: `displayName = "SRV-LEGACY-DB"
guestOS = "winnetenterprise-64"
memsize = "4096"`,
        expected: 'VM:SRV-LEGACY-DB | OS:winnetenterprise-64 | VCPUS:1 | RAM:4096MB | BOOT:bios | SECURE_BOOT:DISABLED | TOOLS_SYNC:NO\n'
      },
      {
        label: 'VM sans nom explicite et minuscules dans les booléens',
        stdin: `guestOS = "ubuntu-64"
numvcpus = "8"
memsize = "16384"
firmware = "EFI"
uefi.secureBoot.enabled = "false"
tools.syncTime = "true"`,
        expected: 'VM:VM-Inconnue | OS:ubuntu-64 | VCPUS:8 | RAM:16384MB | BOOT:efi | SECURE_BOOT:DISABLED | TOOLS_SYNC:YES\n'
      }
    ],
    solution: `import sys

conf = {}
for line in sys.stdin:
    line = line.strip()
    if not line or line.startswith("#"):
        continue
    if "=" in line:
        k, v = line.split("=", 1)
        k = k.strip()
        v = v.strip().strip('"').strip("'")
        conf[k] = v

vm = conf.get("displayName", "VM-Inconnue")
os_val = conf.get("guestOS", "other")
vcpus = int(conf.get("numvcpus", 1))
ram = int(conf.get("memsize", 1024))
boot = conf.get("firmware", "bios").lower()

sec_val = conf.get("uefi.secureBoot.enabled", "FALSE").upper()
secure_boot = "ENABLED" if sec_val == "TRUE" else "DISABLED"

tools_val = conf.get("tools.syncTime", "FALSE").upper()
tools_sync = "YES" if tools_val == "TRUE" else "NO"

print(f"VM:{vm} | OS:{os_val} | VCPUS:{vcpus} | RAM:{ram}MB | BOOT:{boot} | SECURE_BOOT:{secure_boot} | TOOLS_SYNC:{tools_sync}")
`
  },
  {
    id: 'vrt3-c2-e2',
    chapter: 2,
    title: 'Calculateur d\'Espace Disque & Arborescence de Snapshots VM (Delta VMDKs)',
    level: 'n2',
    language: 'python',
    goal: 'Calculer la croissance d\'espace disque cumulée d\'une chaîne de snapshots et émettre une alerte de consolidation.',
    brief: `<p>Chaque snapshot VMware crée un disque différentiel (delta <code>.vmdk</code>) qui enregistre les écritures et grossit au fil du temps :<br><br>
1. <strong>Nombre de snapshots actifs</strong> :<br>
Le champ <code>SNAPS</code> fournit la liste des âges (en jours) des snapshots actifs (ex: <code>3,7,12</code>), ou <code>NONE</code> s'il n'y a aucun snapshot.<br><br>
2. <strong>Volume cumulé des fichiers deltas</strong> :<br>
<code>total_delta_gb = sum(DAILY_GB * jours)</code> pour tous les snapshots.<br><br>
3. <strong>Espace total consommé sur le Datastore</strong> :<br>
<code>total_storage_gb = BASE_GB + total_delta_gb</code>.<br><br>
4. <strong>Ratio d'expansion de stockage</strong> :<br>
<code>ratio = total_storage_gb / BASE_GB</code>.<br><br>
5. <strong>Alerte de consolidation</strong> :<br>
- Si le nombre de snapshots est supérieur à 3, OU si <code>total_delta_gb &gt; BASE_GB * 0.5</code> : statut <code>ALERTE_CONSOLIDATION</code> (risque de saturation et dégradation des I/O).<br>
- Sinon : statut <code>NOMINAL</code>.<br><br>
Format d'entrée (sur STDIN) :<br>
Lignes : <code>VM=&lt;nom&gt; BASE_GB=&lt;n&gt; DAILY_GB=&lt;n&gt; SNAPS=&lt;d1,d2,...|NONE&gt;</code>.<br><br>
Format de sortie :<br>
<code>VM:&lt;nom&gt; | SNAPS:&lt;count&gt; | DELTA:&lt;total_delta_gb:.1f&gt;GB | TOTAL:&lt;total_storage_gb:.1f&gt;GB | RATIO:&lt;ratio:.2f&gt; | STATUT:&lt;statut&gt;</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer l'espace des disques deltas et évaluer le besoin de consolidation
`,
    hints: [
      "Traitez le cas SNAPS=NONE en comptant 0 snapshot et 0.0 Go de delta.",
      "Formatez le ratio d'expansion avec deux chiffres après la virgule."
    ],
    examples: [
      {
        stdin: 'VM=vm-compta BASE_GB=100 DAILY_GB=2.0 SNAPS=2,5\nVM=vm-dev BASE_GB=50 DAILY_GB=5.0 SNAPS=3,8,12,20\nVM=vm-backup BASE_GB=200 DAILY_GB=1.0 SNAPS=NONE',
        expected: 'VM:vm-compta | SNAPS:2 | DELTA:14.0GB | TOTAL:114.0GB | RATIO:1.14 | STATUT:NOMINAL\nVM:vm-dev | SNAPS:4 | DELTA:215.0GB | TOTAL:265.0GB | RATIO:5.30 | STATUT:ALERTE_CONSOLIDATION\nVM:vm-backup | SNAPS:0 | DELTA:0.0GB | TOTAL:200.0GB | RATIO:1.00 | STATUT:NOMINAL\n',
        note: 'Chaîne de snapshots modérée, chaîne excessive (> 3 snapshots et > 50% delta) et VM sans snapshot.'
      }
    ],
    tests: [
      {
        label: 'Dépassement du seuil de 50% de delta avec seulement 2 snapshots',
        stdin: 'VM=vm-bigdata BASE_GB=80 DAILY_GB=10.0 SNAPS=3,4\nVM=vm-mail BASE_GB=150 DAILY_GB=2.0 SNAPS=10,15,20',
        expected: 'VM:vm-bigdata | SNAPS:2 | DELTA:70.0GB | TOTAL:150.0GB | RATIO:1.88 | STATUT:ALERTE_CONSOLIDATION\nVM:vm-mail | SNAPS:3 | DELTA:90.0GB | TOTAL:240.0GB | RATIO:1.60 | STATUT:ALERTE_CONSOLIDATION\n'
      },
      {
        label: 'Exactement 3 snapshots sous le seuil de 50%',
        stdin: 'VM=vm-erp BASE_GB=200 DAILY_GB=1.0 SNAPS=10,20,30',
        expected: 'VM:vm-erp | SNAPS:3 | DELTA:60.0GB | TOTAL:260.0GB | RATIO:1.30 | STATUT:NOMINAL\n'
      }
    ],
    solution: `import sys

for line in sys.stdin:
    line = line.strip()
    if not line:
        continue
    parts = dict(p.split("=", 1) for p in line.split())
    vm = parts.get("VM", "vm")
    base_gb = float(parts.get("BASE_GB", 100))
    daily_gb = float(parts.get("DAILY_GB", 1))
    snaps_str = parts.get("SNAPS", "NONE")

    if snaps_str == "NONE" or not snaps_str.strip():
        count = 0
        total_delta = 0.0
    else:
        days = [float(d.strip()) for d in snaps_str.split(",") if d.strip()]
        count = len(days)
        total_delta = sum(daily_gb * d for d in days)

    total_storage = base_gb + total_delta
    ratio = total_storage / base_gb

    if count > 3 or total_delta > (base_gb * 0.5):
        statut = "ALERTE_CONSOLIDATION"
    else:
        statut = "NOMINAL"

    print(f"VM:{vm} | SNAPS:{count} | DELTA:{total_delta:.1f}GB | TOTAL:{total_storage:.1f}GB | RATIO:{ratio:.2f} | STATUT:{statut}")
`
  },
  {
    id: 'vrt3-c2-e3',
    chapter: 2,
    title: 'Ordonnanceur de Pools de Ressources vCenter (Shares, Reservations, Limits CPU)',
    level: 'n3',
    language: 'python',
    goal: 'Calculer la répartition des ressources CPU entre pools sous contention en respectant réservations, limites et shares.',
    brief: `<p>Dans un cluster vSphere, les pools de ressources se partagent la capacité CPU du cluster selon trois mécanismes :<br><br>
1. <strong>Capacité et Réservations</strong> :<br>
Le cluster possède une capacité <code>CLUSTER_CAPACITY_MHZ</code>. Chaque pool dispose d'une réservation minimale garantie <code>RESERVED_MHZ</code>.<br>
Si la somme des réservations de tous les pools dépasse la capacité, le contrôle d'admission échoue (<code>CLUSTER_OVERCOMMITTED</code>).<br><br>
2. <strong>Distribution des Shares en situation de partage</strong> :<br>
La capacité non réservée restante est : <code>unreserved = CLUSTER_CAPACITY_MHZ - sum(RESERVED_MHZ)</code>.<br>
Poids des parts (Shares) :<br>
- <code>LOW</code> = 2000, <code>NORMAL</code> = 4000, <code>HIGH</code> = 8000 (ou valeur entière numérique directe).<br>
Chaque pool reçoit une part proportionnelle :<br>
<code>part_mhz = (pool.shares / total_shares) * unreserved</code>.<br><br>
3. <strong>Allocation totale et Limite</strong> :<br>
<code>allocation = pool.reserved + part_mhz</code>.<br>
Si <code>LIMIT_MHZ</code> est supérieur à zéro (limite active), l'allocation est plafonnée :<br>
<code>allocation = min(allocation, pool.limit)</code>.<br><br>
Format d'entrée (sur STDIN) :<br>
Ligne 1 : <code>CLUSTER_CAPACITY_MHZ=&lt;total&gt;</code>.<br>
Lignes suivantes : <code>POOL=&lt;nom&gt; RESERVED_MHZ=&lt;r&gt; LIMIT_MHZ=&lt;l|-1&gt; SHARES=&lt;s|LOW|NORMAL|HIGH&gt;</code>.<br><br>
Format de sortie :<br>
Pour chaque pool :<br>
<code>POOL:&lt;nom&gt; | RESERVED:&lt;r&gt;MHz | LIMIT:&lt;l_str&gt; | SHARES:&lt;s&gt; | ALLOCATED:&lt;allocated:.1f&gt;MHz</code><br>
(Si le cluster est sur-réservé, afficher une seule ligne : <code>ERROR:CLUSTER_OVERCOMMITTED</code>).</p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : ordonnancer la capacité CPU du cluster entre les pools de ressources
`,
    hints: [
      "Convertissez les mots-clés LOW (2000), NORMAL (4000) et HIGH (8000) en valeurs entières.",
      "Affichez LIMIT:UNLIMITED si la limite vaut -1."
    ],
    examples: [
      {
        stdin: `CLUSTER_CAPACITY_MHZ=20000
POOL=Production RESERVED_MHZ=8000 LIMIT_MHZ=-1 SHARES=HIGH
POOL=Test-Dev RESERVED_MHZ=2000 LIMIT_MHZ=6000 SHARES=NORMAL
POOL=Staging RESERVED_MHZ=2000 LIMIT_MHZ=-1 SHARES=LOW`,
        expected: `POOL:Production | RESERVED:8000MHz | LIMIT:UNLIMITED | SHARES:8000 | ALLOCATED:12571.4MHz
POOL:Test-Dev | RESERVED:2000MHz | LIMIT:6000MHz | SHARES:4000 | ALLOCATED:4285.7MHz
POOL:Staging | RESERVED:2000MHz | LIMIT:UNLIMITED | SHARES:2000 | ALLOCATED:3142.9MHz
`,
        note: 'Capacité 20000 MHz partagée entre 3 pools avec pondérations HIGH (8000), NORMAL (4000) et LOW (2000).'
      }
    ],
    tests: [
      {
        label: 'Cluster sur-réservé dépassant la capacité',
        stdin: `CLUSTER_CAPACITY_MHZ=10000
POOL=Pool-A RESERVED_MHZ=6000 LIMIT_MHZ=-1 SHARES=NORMAL
POOL=Pool-B RESERVED_MHZ=5000 LIMIT_MHZ=-1 SHARES=NORMAL`,
        expected: 'ERROR:CLUSTER_OVERCOMMITTED\n'
      },
      {
        label: 'Pool plafonné par sa limite explicite',
        stdin: `CLUSTER_CAPACITY_MHZ=10000
POOL=Pool-Capped RESERVED_MHZ=1000 LIMIT_MHZ=3000 SHARES=HIGH
POOL=Pool-Free RESERVED_MHZ=1000 LIMIT_MHZ=-1 SHARES=LOW`,
        expected: `POOL:Pool-Capped | RESERVED:1000MHz | LIMIT:3000MHz | SHARES:8000 | ALLOCATED:3000.0MHz
POOL:Pool-Free | RESERVED:1000MHz | LIMIT:UNLIMITED | SHARES:2000 | ALLOCATED:2600.0MHz
`
      }
    ],
    solution: `import sys

lines = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]
if not lines:
    sys.exit(0)

first = dict(p.split("=", 1) for p in lines[0].split())
cluster_cap = float(first.get("CLUSTER_CAPACITY_MHZ", 10000))

pools = []
for line in lines[1:]:
    parts = dict(p.split("=", 1) for p in line.split())
    name = parts.get("POOL", "Pool")
    reserved = float(parts.get("RESERVED_MHZ", 0))
    limit_val = float(parts.get("LIMIT_MHZ", -1))
    shares_str = parts.get("SHARES", "NORMAL").upper()

    if shares_str == "LOW":
        shares = 2000
    elif shares_str == "NORMAL":
        shares = 4000
    elif shares_str == "HIGH":
        shares = 8000
    else:
        shares = int(shares_str)

    pools.append({
        "name": name,
        "reserved": reserved,
        "limit": limit_val,
        "shares": shares
    })

total_reserved = sum(p["reserved"] for p in pools)
if total_reserved > cluster_cap:
    print("ERROR:CLUSTER_OVERCOMMITTED")
    sys.exit(0)

unreserved = cluster_cap - total_reserved
total_shares = sum(p["shares"] for p in pools)

for p in pools:
    if total_shares > 0:
        share_part = (p["shares"] / total_shares) * unreserved
    else:
        share_part = 0.0

    allocated = p["reserved"] + share_part
    if p["limit"] > 0:
        allocated = min(allocated, p["limit"])

    limit_str = f"{int(p['limit'])}MHz" if p["limit"] > 0 else "UNLIMITED"
    print(f"POOL:{p['name']} | RESERVED:{int(p['reserved'])}MHz | LIMIT:{limit_str} | SHARES:{p['shares']} | ALLOCATED:{allocated:.1f}MHz")
`
  }
];
