'use strict';

module.exports = [
  {
    "id": "vrt3-c6-e1",
    "chapter": 6,
    "title": "Parseur de Métadonnées XenServer / Citrix Hypervisor & Rôles Dom0 / DomU",
    "level": "n1",
    "language": "analyse",
    "goal": "Analyser les métadonnées d'un domaine XenServer (Citrix Hypervisor), qualifier les rôles Dom0/DomU et le mode de virtualisation.",
    "brief": "<p>L'architecture micro-noyau Xen distingue le domaine de contrôle (<code>Dom0</code>) des machines invitées (<code>DomU</code>) :<br><br>\n1. <strong>Règles architecturales</strong> :<br>\n- Si <code>DOMAIN_TYPE == \"DOM0\"</code> : Rôle <code>CONTROL_DOMAIN</code>, mode imposé <code>NATIVE</code> (accès matériel direct).<br>\n- Si <code>DOMAIN_TYPE == \"DOMU\"</code> : Rôle <code>GUEST_VM</code>, modes supportés : <code>PV</code> (paravirtualisation sans émulation) ou <code>HVM</code> (virtualisation assistée matériellement).<br>\n- Si une combinaison est incohérente (ex: Dom0 en mode PV/HVM ou DomU en mode NATIVE) : Statut <code>INVALID_XEN_TOPOLOGY</code>.<br><br>\n2. <strong>Identifiant UUID</strong> :<br>\nAfficher uniquement les 8 premiers caractères de l'UUID (préfixe court).<br><br>\nFormat d'entrée (sur STDIN) :<br>\nLignes : <code>UUID=&lt;uuid&gt; NAME=&lt;nom&gt; DOMAIN_TYPE=&lt;DOM0|DOMU&gt; VIRT_MODE=&lt;NATIVE|PV|HVM&gt; MEMORY_MB=&lt;nb&gt; VCPUS=&lt;nb&gt;</code>.<br><br>\nFormat de sortie :<br>\n<code>VM:&lt;nom&gt; | UUID:&lt;uuid[:8]&gt; | TYPE:&lt;DOM0|DOMU&gt; | MODE:&lt;mode&gt; | ROLE:&lt;role&gt; | RAM:&lt;MEMORY_MB&gt;MB | VCPUS:&lt;VCPUS&gt;</code><br>\n(ou <code>ERROR:INVALID_XEN_TOPOLOGY</code> en cas d'incohérence).</p>",
    "starter": "# Grille d'analyse (vrt3-c6-e1) — Parseur de Métadonnées XenServer / Citrix Hypervisor & Rôles Dom0 / DomU\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Incohérence architecturale Dom0 avec mode HVM]\n# Données : UUID=deadbeef-1111-2222-3333-444455556666 NAME=Bad-Dom0 DOMAIN_TYPE=DOM0 VIRT_MODE=HVM MEMORY_MB=2048 VCPUS=2\nA_COMPLETER\n\n[Cas 2 — Incohérence architecturale DomU avec mode NATIVE]\n# Données : UUID=cafebabe-1111-2222-3333-444455556666 NAME=Bad-DomU DOMAIN_TYPE=DOMU VIRT_MODE=NATIVE MEMORY_MB=4096 VCPUS=4\nA_COMPLETER\n",
    "hints": [
      "Dom0 a obligatoirement le rôle CONTROL_DOMAIN et le mode NATIVE.",
      "DomU a obligatoirement le rôle GUEST_VM et le mode PV ou HVM."
    ],
    "examples": [
      {
        "stdin": "UUID=a84f32c1-829d-43cb-b09e-128492049182 NAME=Control-Domain DOMAIN_TYPE=DOM0 VIRT_MODE=NATIVE MEMORY_MB=4096 VCPUS=4\nUUID=b95e41a2-918c-42ba-c18f-993849182931 NAME=Linux-Web01 DOMAIN_TYPE=DOMU VIRT_MODE=PV MEMORY_MB=8192 VCPUS=2\nUUID=c12a93e3-718a-41aa-d09a-449182930192 NAME=Win-Desktop DOMAIN_TYPE=DOMU VIRT_MODE=HVM MEMORY_MB=16384 VCPUS=8",
        "expected": "VM:Control-Domain | UUID:a84f32c1 | TYPE:DOM0 | MODE:NATIVE | ROLE:CONTROL_DOMAIN | RAM:4096MB | VCPUS:4\nVM:Linux-Web01 | UUID:b95e41a2 | TYPE:DOMU | MODE:PV | ROLE:GUEST_VM | RAM:8192MB | VCPUS:2\nVM:Win-Desktop | UUID:c12a93e3 | TYPE:DOMU | MODE:HVM | ROLE:GUEST_VM | RAM:16384MB | VCPUS:8\n",
        "note": "Domaine de contrôle Dom0, invité Linux paravirtualisé PV et invité Windows HVM."
      }
    ],
    "tests": [
      {
        "label": "Incohérence architecturale Dom0 avec mode HVM",
        "stdin": "cas:1",
        "expected": "ERROR:INVALID_XEN_TOPOLOGY\n"
      },
      {
        "label": "Incohérence architecturale DomU avec mode NATIVE",
        "stdin": "cas:2",
        "expected": "ERROR:INVALID_XEN_TOPOLOGY\n"
      }
    ],
    "solution": "[Exemple]\nVM:Control-Domain | UUID:a84f32c1 | TYPE:DOM0 | MODE:NATIVE | ROLE:CONTROL_DOMAIN | RAM:4096MB | VCPUS:4\nVM:Linux-Web01 | UUID:b95e41a2 | TYPE:DOMU | MODE:PV | ROLE:GUEST_VM | RAM:8192MB | VCPUS:2\nVM:Win-Desktop | UUID:c12a93e3 | TYPE:DOMU | MODE:HVM | ROLE:GUEST_VM | RAM:16384MB | VCPUS:8\n\n\n[Cas 1 — Incohérence architecturale Dom0 avec mode HVM]\nERROR:INVALID_XEN_TOPOLOGY\n\n\n[Cas 2 — Incohérence architecturale DomU avec mode NATIVE]\nERROR:INVALID_XEN_TOPOLOGY"
  },
  {
    "id": "vrt3-c6-e2",
    "chapter": 6,
    "title": "Dimensionneur de Catalogue VDI (Postes Virtuels, IOPS par Utilisateur, RAM & Stockage)",
    "level": "n2",
    "language": "analyse",
    "goal": "Dimensionner les ressources matérielles nécessaires (vCPUs, RAM, IOPS, Stockage) pour un catalogue de postes virtuels VDI.",
    "brief": "<p>Le dimensionnement d'un parc de bureaux virtuels (VDI Citrix Virtual Desktops ou VMware Horizon) s'appuie sur des profils types d'utilisateurs :<br><br>\n1. <strong>Profils de postes de travail</strong> :<br>\n- <code>TASK_WORKER</code> : 2 vCPUs, 4 Go RAM, 10 IOPS, disque clone lié 20 Go.<br>\n- <code>KNOWLEDGE_WORKER</code> : 4 vCPUs, 8 Go RAM, 25 IOPS, disque 40 Go.<br>\n- <code>POWER_USER</code> : 8 vCPUs, 16 Go RAM, 60 IOPS, disque 80 Go.<br><br>\n2. <strong>Calcul de simultanéité</strong> :<br>\nUtilisateurs actifs simultanés :<br>\n<code>active_users = int(USERS * (CONCURRENT_PCT / 100.0))</code>.<br><br>\n3. <strong>Besoins calculés</strong> :<br>\n- <code>total_vcpus = active_users * profil.vcpus</code>.<br>\n- <code>total_ram_gb = active_users * profil.ram</code>.<br>\n- <code>total_iops = active_users * profil.iops</code>.<br>\n- <code>total_storage_gb = USERS * profil.disk</code> (le stockage est réservé pour la totalité des utilisateurs inscrits).<br><br>\nFormat d'entrée (sur STDIN) :<br>\nLignes : <code>CATALOG=&lt;nom&gt; PROFILE=&lt;nom_profil&gt; USERS=&lt;nb&gt; CONCURRENT_PCT=&lt;pct&gt;</code>.<br><br>\nFormat de sortie :<br>\n<code>CATALOG:&lt;nom&gt; | ACTIVE:&lt;active_users&gt; | VCPUS:&lt;total_vcpus&gt; | RAM:&lt;total_ram_gb&gt;GB | IOPS:&lt;total_iops&gt; | STORAGE:&lt;total_storage_gb&gt;GB</code></p>",
    "starter": "# Grille d'analyse (vrt3-c6-e2) — Dimensionneur de Catalogue VDI (Postes Virtuels, IOPS par Utilisateur, RAM & Stockage)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Catalogue à 50% de simultanéité]\n# Données : CATALOG=Finance PROFILE=KNOWLEDGE_WORKER USERS=80 CONCURRENT_PCT=50.0\nA_COMPLETER\n\n[Cas 2 — Profil inconnu retournant une erreur]\n# Données : CATALOG=Custom PROFILE=UNKNOWN USERS=10 CONCURRENT_PCT=100.0\nA_COMPLETER\n",
    "hints": [
      "Associez à chaque profil ses caractéristiques (vcpus, ram, iops, disk).",
      "Le CPU, la RAM et les IOPS sont basés sur active_users, tandis que le stockage est calculé sur USERS total."
    ],
    "examples": [
      {
        "stdin": "CATALOG=CallCenter PROFILE=TASK_WORKER USERS=100 CONCURRENT_PCT=80.0\nCATALOG=Engineering PROFILE=POWER_USER USERS=20 CONCURRENT_PCT=100.0\nCATALOG=Sales PROFILE=KNOWLEDGE_WORKER USERS=50 CONCURRENT_PCT=60.0",
        "expected": "CATALOG:CallCenter | ACTIVE:80 | VCPUS:160 | RAM:320GB | IOPS:800 | STORAGE:2000GB\nCATALOG:Engineering | ACTIVE:20 | VCPUS:160 | RAM:320GB | IOPS:1200 | STORAGE:1600GB\nCATALOG:Sales | ACTIVE:30 | VCPUS:120 | RAM:240GB | IOPS:750 | STORAGE:2000GB\n",
        "note": "Catalogue centre d'appels, ingénierie avancée et équipe commerciale."
      }
    ],
    "tests": [
      {
        "label": "Catalogue à 50% de simultanéité",
        "stdin": "cas:1",
        "expected": "CATALOG:Finance | ACTIVE:40 | VCPUS:160 | RAM:320GB | IOPS:1000 | STORAGE:3200GB\n"
      },
      {
        "label": "Profil inconnu retournant une erreur",
        "stdin": "cas:2",
        "expected": "ERROR:UNKNOWN_VDI_PROFILE\n"
      }
    ],
    "solution": "[Exemple]\nCATALOG:CallCenter | ACTIVE:80 | VCPUS:160 | RAM:320GB | IOPS:800 | STORAGE:2000GB\nCATALOG:Engineering | ACTIVE:20 | VCPUS:160 | RAM:320GB | IOPS:1200 | STORAGE:1600GB\nCATALOG:Sales | ACTIVE:30 | VCPUS:120 | RAM:240GB | IOPS:750 | STORAGE:2000GB\n\n\n[Cas 1 — Catalogue à 50% de simultanéité]\nCATALOG:Finance | ACTIVE:40 | VCPUS:160 | RAM:320GB | IOPS:1000 | STORAGE:3200GB\n\n\n[Cas 2 — Profil inconnu retournant une erreur]\nERROR:UNKNOWN_VDI_PROFILE"
  },
  {
    "id": "vrt3-c6-e3",
    "chapter": 6,
    "title": "Calculateur de RPO/RTO & Volumétrie Sauvegarde Incrémentielle CBT (Changed Block Tracking)",
    "level": "n3",
    "language": "analyse",
    "goal": "Calculer la volumétrie d'une chaîne de sauvegarde CBT (Full + Incréments) et estimer le temps de restauration (RTO).",
    "brief": "<p>Les solutions de sauvegarde pour machines virtuelles exploitent l'API Changed Block Tracking (CBT) pour minimiser la volumétrie :<br><br>\n1. <strong>Taille de sauvegarde dédupliquée/compressée</strong> :<br>\n- Sauvegarde complète (Full) :<br>\n<code>full_gb = SIZE_GB / DEDUP_RATIO</code>.<br>\n- Incrément quotidien CBT (Changed Blocks) :<br>\n<code>inc_gb = (SIZE_GB * (DAILY_CHANGE_PCT / 100.0)) / DEDUP_RATIO</code>.<br><br>\n2. <strong>Volume total de la chaîne de sauvegarde</strong> :<br>\nPour une durée de rétention de <code>RETENTION_DAYS</code> jours (1 Full initial + <code>RETENTION_DAYS - 1</code> incréments) :<br>\n<code>total_chain_gb = full_gb + (RETENTION_DAYS - 1) * inc_gb</code>.<br><br>\n3. <strong>Temps de restauration complète (RTO)</strong> :<br>\nLe volume brut à réécrire sur le stockage est <code>SIZE_GB * 1024</code> Mo.<br>\nÀ une vitesse de restauration <code>RESTORE_MBPS</code> (en Mo/s) :<br>\n<code>rto_minutes = ((SIZE_GB * 1024) / RESTORE_MBPS) / 60.0</code>.<br><br>\nFormat d'entrée (sur STDIN) :<br>\nLignes : <code>VM=&lt;nom&gt; SIZE_GB=&lt;n&gt; DAILY_CHANGE_PCT=&lt;pct&gt; RETENTION_DAYS=&lt;nb&gt; DEDUP_RATIO=&lt;nb&gt; RESTORE_MBPS=&lt;nb&gt;</code>.<br><br>\nFormat de sortie :<br>\n<code>VM:&lt;nom&gt; | FULL:&lt;full_gb:.1f&gt;GB | INC:&lt;inc_gb:.1f&gt;GB | TOTAL_CHAIN:&lt;total_chain_gb:.1f&gt;GB | RTO:&lt;rto_minutes:.1f&gt;min</code></p>",
    "starter": "# Grille d'analyse (vrt3-c6-e3) — Calculateur de RPO/RTO & Volumétrie Sauvegarde Incrémentielle CBT (Changed Block Tracking)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — VM ultra-lourde 2 To et forte rétention 30 jours]\n# Données : VM=vm-fileserver SIZE_GB=2048 DAILY_CHANGE_PCT=3.0 RETENTION_DAYS=30 DEDUP_RATIO=2.0 RESTORE_MBPS=250\nA_COMPLETER\n\n[Cas 2 — Rétention d'un seul jour (Full seul)]\n# Données : VM=vm-single SIZE_GB=200 DAILY_CHANGE_PCT=10.0 RETENTION_DAYS=1 DEDUP_RATIO=2.0 RESTORE_MBPS=200\nA_COMPLETER\n",
    "hints": [
      "Appliquez le ratio de déduplication au Full et à chaque incrément CBT.",
      "Calculez le RTO en minutes à partir du volume brut en Mo et de la vitesse RESTORE_MBPS."
    ],
    "examples": [
      {
        "stdin": "VM=vm-database SIZE_GB=500 DAILY_CHANGE_PCT=5.0 RETENTION_DAYS=7 DEDUP_RATIO=2.0 RESTORE_MBPS=150\nVM=vm-app-server SIZE_GB=100 DAILY_CHANGE_PCT=2.0 RETENTION_DAYS=14 DEDUP_RATIO=2.5 RESTORE_MBPS=100",
        "expected": "VM:vm-database | FULL:250.0GB | INC:12.5GB | TOTAL_CHAIN:325.0GB | RTO:56.9min\nVM:vm-app-server | FULL:40.0GB | INC:0.8GB | TOTAL_CHAIN:50.4GB | RTO:17.1min\n",
        "note": "Base de données 500 Go sur 7 jours avec 5% de modifications quotidiennes vs serveur applicatif 100 Go sur 14 jours."
      }
    ],
    "tests": [
      {
        "label": "VM ultra-lourde 2 To et forte rétention 30 jours",
        "stdin": "cas:1",
        "expected": "VM:vm-fileserver | FULL:1024.0GB | INC:30.7GB | TOTAL_CHAIN:1914.9GB | RTO:139.8min\n"
      },
      {
        "label": "Rétention d'un seul jour (Full seul)",
        "stdin": "cas:2",
        "expected": "VM:vm-single | FULL:100.0GB | INC:10.0GB | TOTAL_CHAIN:100.0GB | RTO:17.1min\n"
      }
    ],
    "solution": "[Exemple]\nVM:vm-database | FULL:250.0GB | INC:12.5GB | TOTAL_CHAIN:325.0GB | RTO:56.9min\nVM:vm-app-server | FULL:40.0GB | INC:0.8GB | TOTAL_CHAIN:50.4GB | RTO:17.1min\n\n\n[Cas 1 — VM ultra-lourde 2 To et forte rétention 30 jours]\nVM:vm-fileserver | FULL:1024.0GB | INC:30.7GB | TOTAL_CHAIN:1914.9GB | RTO:139.8min\n\n\n[Cas 2 — Rétention d'un seul jour (Full seul)]\nVM:vm-single | FULL:100.0GB | INC:10.0GB | TOTAL_CHAIN:100.0GB | RTO:17.1min"
  }
];
