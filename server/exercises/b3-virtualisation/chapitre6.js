/**
 * server/exercises/b3-virtualisation/chapitre6.js — Exercices du Chapitre 6
 * Chapitre 6 : Citrix Hypervisor, VDI, Automatisation & Sauvegardes Avancées
 */
'use strict';

module.exports = [
  {
    id: 'vrt3-c6-e1',
    chapter: 6,
    title: 'Parseur de Métadonnées XenServer / Citrix Hypervisor & Rôles Dom0 / DomU',
    level: 'n1',
    language: 'python',
    goal: 'Analyser les métadonnées d\'un domaine XenServer (Citrix Hypervisor), qualifier les rôles Dom0/DomU et le mode de virtualisation.',
    brief: `<p>L'architecture micro-noyau Xen distingue le domaine de contrôle (<code>Dom0</code>) des machines invitées (<code>DomU</code>) :<br><br>
1. <strong>Règles architecturales</strong> :<br>
- Si <code>DOMAIN_TYPE == "DOM0"</code> : Rôle <code>CONTROL_DOMAIN</code>, mode imposé <code>NATIVE</code> (accès matériel direct).<br>
- Si <code>DOMAIN_TYPE == "DOMU"</code> : Rôle <code>GUEST_VM</code>, modes supportés : <code>PV</code> (paravirtualisation sans émulation) ou <code>HVM</code> (virtualisation assistée matériellement).<br>
- Si une combinaison est incohérente (ex: Dom0 en mode PV/HVM ou DomU en mode NATIVE) : Statut <code>INVALID_XEN_TOPOLOGY</code>.<br><br>
2. <strong>Identifiant UUID</strong> :<br>
Afficher uniquement les 8 premiers caractères de l'UUID (préfixe court).<br><br>
Format d'entrée (sur STDIN) :<br>
Lignes : <code>UUID=&lt;uuid&gt; NAME=&lt;nom&gt; DOMAIN_TYPE=&lt;DOM0|DOMU&gt; VIRT_MODE=&lt;NATIVE|PV|HVM&gt; MEMORY_MB=&lt;nb&gt; VCPUS=&lt;nb&gt;</code>.<br><br>
Format de sortie :<br>
<code>VM:&lt;nom&gt; | UUID:&lt;uuid[:8]&gt; | TYPE:&lt;DOM0|DOMU&gt; | MODE:&lt;mode&gt; | ROLE:&lt;role&gt; | RAM:&lt;MEMORY_MB&gt;MB | VCPUS:&lt;VCPUS&gt;</code><br>
(ou <code>ERROR:INVALID_XEN_TOPOLOGY</code> en cas d'incohérence).</p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : analyser la topologie Xen, valider le rôle et extraire les paramètres
`,
    hints: [
      "Dom0 a obligatoirement le rôle CONTROL_DOMAIN et le mode NATIVE.",
      "DomU a obligatoirement le rôle GUEST_VM et le mode PV ou HVM."
    ],
    examples: [
      {
        stdin: 'UUID=a84f32c1-829d-43cb-b09e-128492049182 NAME=Control-Domain DOMAIN_TYPE=DOM0 VIRT_MODE=NATIVE MEMORY_MB=4096 VCPUS=4\nUUID=b95e41a2-918c-42ba-c18f-993849182931 NAME=Linux-Web01 DOMAIN_TYPE=DOMU VIRT_MODE=PV MEMORY_MB=8192 VCPUS=2\nUUID=c12a93e3-718a-41aa-d09a-449182930192 NAME=Win-Desktop DOMAIN_TYPE=DOMU VIRT_MODE=HVM MEMORY_MB=16384 VCPUS=8',
        expected: `VM:Control-Domain | UUID:a84f32c1 | TYPE:DOM0 | MODE:NATIVE | ROLE:CONTROL_DOMAIN | RAM:4096MB | VCPUS:4
VM:Linux-Web01 | UUID:b95e41a2 | TYPE:DOMU | MODE:PV | ROLE:GUEST_VM | RAM:8192MB | VCPUS:2
VM:Win-Desktop | UUID:c12a93e3 | TYPE:DOMU | MODE:HVM | ROLE:GUEST_VM | RAM:16384MB | VCPUS:8
`,
        note: 'Domaine de contrôle Dom0, invité Linux paravirtualisé PV et invité Windows HVM.'
      }
    ],
    tests: [
      {
        label: 'Incohérence architecturale Dom0 avec mode HVM',
        stdin: 'UUID=deadbeef-1111-2222-3333-444455556666 NAME=Bad-Dom0 DOMAIN_TYPE=DOM0 VIRT_MODE=HVM MEMORY_MB=2048 VCPUS=2',
        expected: 'ERROR:INVALID_XEN_TOPOLOGY\n'
      },
      {
        label: 'Incohérence architecturale DomU avec mode NATIVE',
        stdin: 'UUID=cafebabe-1111-2222-3333-444455556666 NAME=Bad-DomU DOMAIN_TYPE=DOMU VIRT_MODE=NATIVE MEMORY_MB=4096 VCPUS=4',
        expected: 'ERROR:INVALID_XEN_TOPOLOGY\n'
      }
    ],
    solution: `import sys

for line in sys.stdin:
    line = line.strip()
    if not line:
        continue
    parts = dict(p.split("=", 1) for p in line.split())
    uuid_val = parts.get("UUID", "uuid")[:8]
    name = parts.get("NAME", "vm")
    dom_type = parts.get("DOMAIN_TYPE", "DOMU").upper()
    mode = parts.get("VIRT_MODE", "HVM").upper()
    ram = int(parts.get("MEMORY_MB", 1024))
    vcpus = int(parts.get("VCPUS", 1))

    if dom_type == "DOM0":
        if mode != "NATIVE":
            print("ERROR:INVALID_XEN_TOPOLOGY")
            continue
        role = "CONTROL_DOMAIN"
    elif dom_type == "DOMU":
        if mode not in ["PV", "HVM"]:
            print("ERROR:INVALID_XEN_TOPOLOGY")
            continue
        role = "GUEST_VM"
    else:
        print("ERROR:INVALID_XEN_TOPOLOGY")
        continue

    print(f"VM:{name} | UUID:{uuid_val} | TYPE:{dom_type} | MODE:{mode} | ROLE:{role} | RAM:{ram}MB | VCPUS:{vcpus}")
`
  },
  {
    id: 'vrt3-c6-e2',
    chapter: 6,
    title: 'Dimensionneur de Catalogue VDI (Postes Virtuels, IOPS par Utilisateur, RAM & Stockage)',
    level: 'n2',
    language: 'python',
    goal: 'Dimensionner les ressources matérielles nécessaires (vCPUs, RAM, IOPS, Stockage) pour un catalogue de postes virtuels VDI.',
    brief: `<p>Le dimensionnement d'un parc de bureaux virtuels (VDI Citrix Virtual Desktops ou VMware Horizon) s'appuie sur des profils types d'utilisateurs :<br><br>
1. <strong>Profils de postes de travail</strong> :<br>
- <code>TASK_WORKER</code> : 2 vCPUs, 4 Go RAM, 10 IOPS, disque clone lié 20 Go.<br>
- <code>KNOWLEDGE_WORKER</code> : 4 vCPUs, 8 Go RAM, 25 IOPS, disque 40 Go.<br>
- <code>POWER_USER</code> : 8 vCPUs, 16 Go RAM, 60 IOPS, disque 80 Go.<br><br>
2. <strong>Calcul de simultanéité</strong> :<br>
Utilisateurs actifs simultanés :<br>
<code>active_users = int(USERS * (CONCURRENT_PCT / 100.0))</code>.<br><br>
3. <strong>Besoins calculés</strong> :<br>
- <code>total_vcpus = active_users * profil.vcpus</code>.<br>
- <code>total_ram_gb = active_users * profil.ram</code>.<br>
- <code>total_iops = active_users * profil.iops</code>.<br>
- <code>total_storage_gb = USERS * profil.disk</code> (le stockage est réservé pour la totalité des utilisateurs inscrits).<br><br>
Format d'entrée (sur STDIN) :<br>
Lignes : <code>CATALOG=&lt;nom&gt; PROFILE=&lt;nom_profil&gt; USERS=&lt;nb&gt; CONCURRENT_PCT=&lt;pct&gt;</code>.<br><br>
Format de sortie :<br>
<code>CATALOG:&lt;nom&gt; | ACTIVE:&lt;active_users&gt; | VCPUS:&lt;total_vcpus&gt; | RAM:&lt;total_ram_gb&gt;GB | IOPS:&lt;total_iops&gt; | STORAGE:&lt;total_storage_gb&gt;GB</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : implémenter les métriques des profils VDI et calculer les besoins de dimensionnement
`,
    hints: [
      "Associez à chaque profil ses caractéristiques (vcpus, ram, iops, disk).",
      "Le CPU, la RAM et les IOPS sont basés sur active_users, tandis que le stockage est calculé sur USERS total."
    ],
    examples: [
      {
        stdin: 'CATALOG=CallCenter PROFILE=TASK_WORKER USERS=100 CONCURRENT_PCT=80.0\nCATALOG=Engineering PROFILE=POWER_USER USERS=20 CONCURRENT_PCT=100.0\nCATALOG=Sales PROFILE=KNOWLEDGE_WORKER USERS=50 CONCURRENT_PCT=60.0',
        expected: `CATALOG:CallCenter | ACTIVE:80 | VCPUS:160 | RAM:320GB | IOPS:800 | STORAGE:2000GB
CATALOG:Engineering | ACTIVE:20 | VCPUS:160 | RAM:320GB | IOPS:1200 | STORAGE:1600GB
CATALOG:Sales | ACTIVE:30 | VCPUS:120 | RAM:240GB | IOPS:750 | STORAGE:2000GB
`,
        note: 'Catalogue centre d\'appels, ingénierie avancée et équipe commerciale.'
      }
    ],
    tests: [
      {
        label: 'Catalogue à 50% de simultanéité',
        stdin: 'CATALOG=Finance PROFILE=KNOWLEDGE_WORKER USERS=80 CONCURRENT_PCT=50.0',
        expected: 'CATALOG:Finance | ACTIVE:40 | VCPUS:160 | RAM:320GB | IOPS:1000 | STORAGE:3200GB\n'
      },
      {
        label: 'Profil inconnu retournant une erreur',
        stdin: 'CATALOG=Custom PROFILE=UNKNOWN USERS=10 CONCURRENT_PCT=100.0',
        expected: 'ERROR:UNKNOWN_VDI_PROFILE\n'
      }
    ],
    solution: `import sys

PROFILES = {
    "TASK_WORKER": {"vcpus": 2, "ram": 4, "iops": 10, "disk": 20},
    "KNOWLEDGE_WORKER": {"vcpus": 4, "ram": 8, "iops": 25, "disk": 40},
    "POWER_USER": {"vcpus": 8, "ram": 16, "iops": 60, "disk": 80}
}

for line in sys.stdin:
    line = line.strip()
    if not line:
        continue
    parts = dict(p.split("=", 1) for p in line.split())
    cat = parts.get("CATALOG", "cat")
    prof_name = parts.get("PROFILE", "TASK_WORKER").upper()
    users = int(parts.get("USERS", 10))
    concurrent_pct = float(parts.get("CONCURRENT_PCT", 100))

    if prof_name not in PROFILES:
        print("ERROR:UNKNOWN_VDI_PROFILE")
        continue

    prof = PROFILES[prof_name]
    active_users = int(users * (concurrent_pct / 100.0))

    total_vcpus = active_users * prof["vcpus"]
    total_ram = active_users * prof["ram"]
    total_iops = active_users * prof["iops"]
    total_storage = users * prof["disk"]

    print(f"CATALOG:{cat} | ACTIVE:{active_users} | VCPUS:{total_vcpus} | RAM:{total_ram}GB | IOPS:{total_iops} | STORAGE:{total_storage}GB")
`
  },
  {
    id: 'vrt3-c6-e3',
    chapter: 6,
    title: 'Calculateur de RPO/RTO & Volumétrie Sauvegarde Incrémentielle CBT (Changed Block Tracking)',
    level: 'n3',
    language: 'python',
    goal: 'Calculer la volumétrie d\'une chaîne de sauvegarde CBT (Full + Incréments) et estimer le temps de restauration (RTO).',
    brief: `<p>Les solutions de sauvegarde pour machines virtuelles exploitent l'API Changed Block Tracking (CBT) pour minimiser la volumétrie :<br><br>
1. <strong>Taille de sauvegarde dédupliquée/compressée</strong> :<br>
- Sauvegarde complète (Full) :<br>
<code>full_gb = SIZE_GB / DEDUP_RATIO</code>.<br>
- Incrément quotidien CBT (Changed Blocks) :<br>
<code>inc_gb = (SIZE_GB * (DAILY_CHANGE_PCT / 100.0)) / DEDUP_RATIO</code>.<br><br>
2. <strong>Volume total de la chaîne de sauvegarde</strong> :<br>
Pour une durée de rétention de <code>RETENTION_DAYS</code> jours (1 Full initial + <code>RETENTION_DAYS - 1</code> incréments) :<br>
<code>total_chain_gb = full_gb + (RETENTION_DAYS - 1) * inc_gb</code>.<br><br>
3. <strong>Temps de restauration complète (RTO)</strong> :<br>
Le volume brut à réécrire sur le stockage est <code>SIZE_GB * 1024</code> Mo.<br>
À une vitesse de restauration <code>RESTORE_MBPS</code> (en Mo/s) :<br>
<code>rto_minutes = ((SIZE_GB * 1024) / RESTORE_MBPS) / 60.0</code>.<br><br>
Format d'entrée (sur STDIN) :<br>
Lignes : <code>VM=&lt;nom&gt; SIZE_GB=&lt;n&gt; DAILY_CHANGE_PCT=&lt;pct&gt; RETENTION_DAYS=&lt;nb&gt; DEDUP_RATIO=&lt;nb&gt; RESTORE_MBPS=&lt;nb&gt;</code>.<br><br>
Format de sortie :<br>
<code>VM:&lt;nom&gt; | FULL:&lt;full_gb:.1f&gt;GB | INC:&lt;inc_gb:.1f&gt;GB | TOTAL_CHAIN:&lt;total_chain_gb:.1f&gt;GB | RTO:&lt;rto_minutes:.1f&gt;min</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer la volumétrie de la chaîne de sauvegarde et estimer le RTO de restauration
`,
    hints: [
      "Appliquez le ratio de déduplication au Full et à chaque incrément CBT.",
      "Calculez le RTO en minutes à partir du volume brut en Mo et de la vitesse RESTORE_MBPS."
    ],
    examples: [
      {
        stdin: 'VM=vm-database SIZE_GB=500 DAILY_CHANGE_PCT=5.0 RETENTION_DAYS=7 DEDUP_RATIO=2.0 RESTORE_MBPS=150\nVM=vm-app-server SIZE_GB=100 DAILY_CHANGE_PCT=2.0 RETENTION_DAYS=14 DEDUP_RATIO=2.5 RESTORE_MBPS=100',
        expected: `VM:vm-database | FULL:250.0GB | INC:12.5GB | TOTAL_CHAIN:325.0GB | RTO:56.9min
VM:vm-app-server | FULL:40.0GB | INC:0.8GB | TOTAL_CHAIN:50.4GB | RTO:17.1min
`,
        note: 'Base de données 500 Go sur 7 jours avec 5% de modifications quotidiennes vs serveur applicatif 100 Go sur 14 jours.'
      }
    ],
    tests: [
      {
        label: 'VM ultra-lourde 2 To et forte rétention 30 jours',
        stdin: 'VM=vm-fileserver SIZE_GB=2048 DAILY_CHANGE_PCT=3.0 RETENTION_DAYS=30 DEDUP_RATIO=2.0 RESTORE_MBPS=250',
        expected: 'VM:vm-fileserver | FULL:1024.0GB | INC:30.7GB | TOTAL_CHAIN:1914.9GB | RTO:139.8min\n'
      },
      {
        label: 'Rétention d\'un seul jour (Full seul)',
        stdin: 'VM=vm-single SIZE_GB=200 DAILY_CHANGE_PCT=10.0 RETENTION_DAYS=1 DEDUP_RATIO=2.0 RESTORE_MBPS=200',
        expected: 'VM:vm-single | FULL:100.0GB | INC:10.0GB | TOTAL_CHAIN:100.0GB | RTO:17.1min\n'
      }
    ],
    solution: `import sys

for line in sys.stdin:
    line = line.strip()
    if not line:
        continue
    parts = dict(p.split("=", 1) for p in line.split())
    vm = parts.get("VM", "vm")
    size_gb = float(parts.get("SIZE_GB", 100))
    daily_pct = float(parts.get("DAILY_CHANGE_PCT", 5))
    retention = int(parts.get("RETENTION_DAYS", 7))
    dedup = float(parts.get("DEDUP_RATIO", 2))
    restore_mbps = float(parts.get("RESTORE_MBPS", 100))

    full_gb = size_gb / dedup
    inc_gb = (size_gb * (daily_pct / 100.0)) / dedup

    total_chain_gb = full_gb + (retention - 1) * inc_gb

    total_mb = size_gb * 1024.0
    rto_seconds = total_mb / restore_mbps
    rto_minutes = rto_seconds / 60.0

    print(f"VM:{vm} | FULL:{full_gb:.1f}GB | INC:{inc_gb:.1f}GB | TOTAL_CHAIN:{total_chain_gb:.1f}GB | RTO:{rto_minutes:.1f}min")
`
  }
];
