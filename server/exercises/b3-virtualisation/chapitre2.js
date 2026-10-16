'use strict';

module.exports = [
  {
    "id": "vrt3-c2-e1",
    "chapter": 2,
    "title": "Parseur de Fichier de Configuration VM .vmx & Validateur d'Options Matérielles",
    "level": "n1",
    "language": "analyse",
    "goal": "Parser la structure clé-valeur d'un fichier de description de machine virtuelle VMware (.vmx) et extraire les options matérielles.",
    "brief": "<p>Dans l'infrastructure VMware ESXi / Workstation, une machine virtuelle est définie par un fichier texte <code>.vmx</code> composé de paires <code>cle = \"valeur\"</code> :<br><br>\nChamps à extraire :<br>\n- <code>VM</code> : valeur de <code>displayName</code> (ou <code>\"VM-Inconnue\"</code> si absente).<br>\n- <code>OS</code> : valeur de <code>guestOS</code> (ou <code>\"other\"</code>).<br>\n- <code>VCPUS</code> : entier <code>numvcpus</code> (par défaut 1).<br>\n- <code>RAM</code> : entier <code>memsize</code> en Mo (par défaut 1024).<br>\n- <code>BOOT</code> : valeur de <code>firmware</code> (par défaut <code>\"bios\"</code>, en minuscules).<br>\n- <code>SECURE_BOOT</code> : <code>\"ENABLED\"</code> si <code>uefi.secureBoot.enabled = \"TRUE\"</code> (insensible à la casse), sinon <code>\"DISABLED\"</code>.<br>\n- <code>TOOLS_SYNC</code> : <code>\"YES\"</code> si <code>tools.syncTime = \"TRUE\"</code> (insensible à la casse), sinon <code>\"NO\"</code>.<br><br>\nFormat d'entrée (sur STDIN) :<br>\nUn bloc de fichier <code>.vmx</code> complet.<br><br>\nFormat de sortie :<br>\n<code>VM:<VM> | OS:<OS> | VCPUS:<VCPUS> | RAM:<RAM>MB | BOOT:<BOOT> | SECURE_BOOT:<SECURE_BOOT> | TOOLS_SYNC:<TOOLS_SYNC></code></p>",
    "starter": "# Grille d'analyse (vrt3-c2-e1) — Parseur de Fichier de Configuration VM .vmx & Validateur d'Options Matérielles\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Configuration minimale par défaut sans options avancées]\n# Données : displayName = \"SRV-LEGACY-DB\"\n# Données : guestOS = \"winnetenterprise-64\"\n# Données : memsize = \"4096\"\nA_COMPLETER\n\n[Cas 2 — VM sans nom explicite et minuscules dans les booléens]\n# Données : guestOS = \"ubuntu-64\"\n# Données : numvcpus = \"8\"\n# Données : memsize = \"16384\"\n# Données : firmware = \"EFI\"\n# Données : uefi.secureBoot.enabled = \"false\"\n# Données : tools.syncTime = \"true\"\nA_COMPLETER\n",
    "hints": [
      "Isolez les lignes avec clé = 'valeur' en retirant les guillemets et espaces superflus.",
      "Gérez les valeurs par défaut si une directive est absente du fichier .vmx."
    ],
    "examples": [
      {
        "stdin": "displayName = \"SRV-PROD-WEB01\"\nguestOS = \"rhel9-64\"\nnumvcpus = \"4\"\nmemsize = \"8192\"\nfirmware = \"efi\"\nuefi.secureBoot.enabled = \"TRUE\"\ntools.syncTime = \"TRUE\"\nethernet0.virtualDev = \"vmxnet3\"",
        "expected": "VM:SRV-PROD-WEB01 | OS:rhel9-64 | VCPUS:4 | RAM:8192MB | BOOT:efi | SECURE_BOOT:ENABLED | TOOLS_SYNC:YES\n",
        "note": "Configuration d'un serveur Linux RHEL sous UEFI avec Secure Boot et synchronisation horaire."
      }
    ],
    "tests": [
      {
        "label": "Configuration minimale par défaut sans options avancées",
        "stdin": "cas:1",
        "expected": "VM:SRV-LEGACY-DB | OS:winnetenterprise-64 | VCPUS:1 | RAM:4096MB | BOOT:bios | SECURE_BOOT:DISABLED | TOOLS_SYNC:NO\n"
      },
      {
        "label": "VM sans nom explicite et minuscules dans les booléens",
        "stdin": "cas:2",
        "expected": "VM:VM-Inconnue | OS:ubuntu-64 | VCPUS:8 | RAM:16384MB | BOOT:efi | SECURE_BOOT:DISABLED | TOOLS_SYNC:YES\n"
      }
    ],
    "solution": "[Exemple]\nVM:SRV-PROD-WEB01 | OS:rhel9-64 | VCPUS:4 | RAM:8192MB | BOOT:efi | SECURE_BOOT:ENABLED | TOOLS_SYNC:YES\n\n\n[Cas 1 — Configuration minimale par défaut sans options avancées]\nVM:SRV-LEGACY-DB | OS:winnetenterprise-64 | VCPUS:1 | RAM:4096MB | BOOT:bios | SECURE_BOOT:DISABLED | TOOLS_SYNC:NO\n\n\n[Cas 2 — VM sans nom explicite et minuscules dans les booléens]\nVM:VM-Inconnue | OS:ubuntu-64 | VCPUS:8 | RAM:16384MB | BOOT:efi | SECURE_BOOT:DISABLED | TOOLS_SYNC:YES"
  },
  {
    "id": "vrt3-c2-e2",
    "chapter": 2,
    "title": "Calculateur d'Espace Disque & Arborescence de Snapshots VM (Delta VMDKs)",
    "level": "n2",
    "language": "analyse",
    "goal": "Calculer la croissance d'espace disque cumulée d'une chaîne de snapshots et émettre une alerte de consolidation.",
    "brief": "<p>Chaque snapshot VMware crée un disque différentiel (delta <code>.vmdk</code>) qui enregistre les écritures et grossit au fil du temps :<br><br>\n1. <strong>Nombre de snapshots actifs</strong> :<br>\nLe champ <code>SNAPS</code> fournit la liste des âges (en jours) des snapshots actifs (ex: <code>3,7,12</code>), ou <code>NONE</code> s'il n'y a aucun snapshot.<br><br>\n2. <strong>Volume cumulé des fichiers deltas</strong> :<br>\n<code>total_delta_gb = sum(DAILY_GB * jours)</code> pour tous les snapshots.<br><br>\n3. <strong>Espace total consommé sur le Datastore</strong> :<br>\n<code>total_storage_gb = BASE_GB + total_delta_gb</code>.<br><br>\n4. <strong>Ratio d'expansion de stockage</strong> :<br>\n<code>ratio = total_storage_gb / BASE_GB</code>.<br><br>\n5. <strong>Alerte de consolidation</strong> :<br>\n- Si le nombre de snapshots est supérieur à 3, OU si <code>total_delta_gb &gt; BASE_GB * 0.5</code> : statut <code>ALERTE_CONSOLIDATION</code> (risque de saturation et dégradation des I/O).<br>\n- Sinon : statut <code>NOMINAL</code>.<br><br>\nFormat d'entrée (sur STDIN) :<br>\nLignes : <code>VM=&lt;nom&gt; BASE_GB=&lt;n&gt; DAILY_GB=&lt;n&gt; SNAPS=&lt;d1,d2,...|NONE&gt;</code>.<br><br>\nFormat de sortie :<br>\n<code>VM:&lt;nom&gt; | SNAPS:&lt;count&gt; | DELTA:&lt;total_delta_gb:.1f&gt;GB | TOTAL:&lt;total_storage_gb:.1f&gt;GB | RATIO:&lt;ratio:.2f&gt; | STATUT:&lt;statut&gt;</code></p>",
    "starter": "# Grille d'analyse (vrt3-c2-e2) — Calculateur d'Espace Disque & Arborescence de Snapshots VM (Delta VMDKs)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Dépassement du seuil de 50% de delta avec seulement 2 snapshots]\n# Données : VM=vm-bigdata BASE_GB=80 DAILY_GB=10.0 SNAPS=3,4\n# Données : VM=vm-mail BASE_GB=150 DAILY_GB=2.0 SNAPS=10,15,20\nA_COMPLETER\n\n[Cas 2 — Exactement 3 snapshots sous le seuil de 50%]\n# Données : VM=vm-erp BASE_GB=200 DAILY_GB=1.0 SNAPS=10,20,30\nA_COMPLETER\n",
    "hints": [
      "Traitez le cas SNAPS=NONE en comptant 0 snapshot et 0.0 Go de delta.",
      "Formatez le ratio d'expansion avec deux chiffres après la virgule."
    ],
    "examples": [
      {
        "stdin": "VM=vm-compta BASE_GB=100 DAILY_GB=2.0 SNAPS=2,5\nVM=vm-dev BASE_GB=50 DAILY_GB=5.0 SNAPS=3,8,12,20\nVM=vm-backup BASE_GB=200 DAILY_GB=1.0 SNAPS=NONE",
        "expected": "VM:vm-compta | SNAPS:2 | DELTA:14.0GB | TOTAL:114.0GB | RATIO:1.14 | STATUT:NOMINAL\nVM:vm-dev | SNAPS:4 | DELTA:215.0GB | TOTAL:265.0GB | RATIO:5.30 | STATUT:ALERTE_CONSOLIDATION\nVM:vm-backup | SNAPS:0 | DELTA:0.0GB | TOTAL:200.0GB | RATIO:1.00 | STATUT:NOMINAL\n",
        "note": "Chaîne de snapshots modérée, chaîne excessive (> 3 snapshots et > 50% delta) et VM sans snapshot."
      }
    ],
    "tests": [
      {
        "label": "Dépassement du seuil de 50% de delta avec seulement 2 snapshots",
        "stdin": "cas:1",
        "expected": "VM:vm-bigdata | SNAPS:2 | DELTA:70.0GB | TOTAL:150.0GB | RATIO:1.88 | STATUT:ALERTE_CONSOLIDATION\nVM:vm-mail | SNAPS:3 | DELTA:90.0GB | TOTAL:240.0GB | RATIO:1.60 | STATUT:ALERTE_CONSOLIDATION\n"
      },
      {
        "label": "Exactement 3 snapshots sous le seuil de 50%",
        "stdin": "cas:2",
        "expected": "VM:vm-erp | SNAPS:3 | DELTA:60.0GB | TOTAL:260.0GB | RATIO:1.30 | STATUT:NOMINAL\n"
      }
    ],
    "solution": "[Exemple]\nVM:vm-compta | SNAPS:2 | DELTA:14.0GB | TOTAL:114.0GB | RATIO:1.14 | STATUT:NOMINAL\nVM:vm-dev | SNAPS:4 | DELTA:215.0GB | TOTAL:265.0GB | RATIO:5.30 | STATUT:ALERTE_CONSOLIDATION\nVM:vm-backup | SNAPS:0 | DELTA:0.0GB | TOTAL:200.0GB | RATIO:1.00 | STATUT:NOMINAL\n\n\n[Cas 1 — Dépassement du seuil de 50% de delta avec seulement 2 snapshots]\nVM:vm-bigdata | SNAPS:2 | DELTA:70.0GB | TOTAL:150.0GB | RATIO:1.88 | STATUT:ALERTE_CONSOLIDATION\nVM:vm-mail | SNAPS:3 | DELTA:90.0GB | TOTAL:240.0GB | RATIO:1.60 | STATUT:ALERTE_CONSOLIDATION\n\n\n[Cas 2 — Exactement 3 snapshots sous le seuil de 50%]\nVM:vm-erp | SNAPS:3 | DELTA:60.0GB | TOTAL:260.0GB | RATIO:1.30 | STATUT:NOMINAL"
  },
  {
    "id": "vrt3-c2-e3",
    "chapter": 2,
    "title": "Ordonnanceur de Pools de Ressources vCenter (Shares, Reservations, Limits CPU)",
    "level": "n3",
    "language": "analyse",
    "goal": "Calculer la répartition des ressources CPU entre pools sous contention en respectant réservations, limites et shares.",
    "brief": "<p>Dans un cluster vSphere, les pools de ressources se partagent la capacité CPU du cluster selon trois mécanismes :<br><br>\n1. <strong>Capacité et Réservations</strong> :<br>\nLe cluster possède une capacité <code>CLUSTER_CAPACITY_MHZ</code>. Chaque pool dispose d'une réservation minimale garantie <code>RESERVED_MHZ</code>.<br>\nSi la somme des réservations de tous les pools dépasse la capacité, le contrôle d'admission échoue (<code>CLUSTER_OVERCOMMITTED</code>).<br><br>\n2. <strong>Distribution des Shares en situation de partage</strong> :<br>\nLa capacité non réservée restante est : <code>unreserved = CLUSTER_CAPACITY_MHZ - sum(RESERVED_MHZ)</code>.<br>\nPoids des parts (Shares) :<br>\n- <code>LOW</code> = 2000, <code>NORMAL</code> = 4000, <code>HIGH</code> = 8000 (ou valeur entière numérique directe).<br>\nChaque pool reçoit une part proportionnelle :<br>\n<code>part_mhz = (pool.shares / total_shares) * unreserved</code>.<br><br>\n3. <strong>Allocation totale et Limite</strong> :<br>\n<code>allocation = pool.reserved + part_mhz</code>.<br>\nSi <code>LIMIT_MHZ</code> est supérieur à zéro (limite active), l'allocation est plafonnée :<br>\n<code>allocation = min(allocation, pool.limit)</code>.<br><br>\nFormat d'entrée (sur STDIN) :<br>\nLigne 1 : <code>CLUSTER_CAPACITY_MHZ=&lt;total&gt;</code>.<br>\nLignes suivantes : <code>POOL=&lt;nom&gt; RESERVED_MHZ=&lt;r&gt; LIMIT_MHZ=&lt;l|-1&gt; SHARES=&lt;s|LOW|NORMAL|HIGH&gt;</code>.<br><br>\nFormat de sortie :<br>\nPour chaque pool :<br>\n<code>POOL:&lt;nom&gt; | RESERVED:&lt;r&gt;MHz | LIMIT:&lt;l_str&gt; | SHARES:&lt;s&gt; | ALLOCATED:&lt;allocated:.1f&gt;MHz</code><br>\n(Si le cluster est sur-réservé, afficher une seule ligne : <code>ERROR:CLUSTER_OVERCOMMITTED</code>).</p>",
    "starter": "# Grille d'analyse (vrt3-c2-e3) — Ordonnanceur de Pools de Ressources vCenter (Shares, Reservations, Limits CPU)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Cluster sur-réservé dépassant la capacité]\n# Données : CLUSTER_CAPACITY_MHZ=10000\n# Données : POOL=Pool-A RESERVED_MHZ=6000 LIMIT_MHZ=-1 SHARES=NORMAL\n# Données : POOL=Pool-B RESERVED_MHZ=5000 LIMIT_MHZ=-1 SHARES=NORMAL\nA_COMPLETER\n\n[Cas 2 — Pool plafonné par sa limite explicite]\n# Données : CLUSTER_CAPACITY_MHZ=10000\n# Données : POOL=Pool-Capped RESERVED_MHZ=1000 LIMIT_MHZ=3000 SHARES=HIGH\n# Données : POOL=Pool-Free RESERVED_MHZ=1000 LIMIT_MHZ=-1 SHARES=LOW\nA_COMPLETER\n",
    "hints": [
      "Convertissez les mots-clés LOW (2000), NORMAL (4000) et HIGH (8000) en valeurs entières.",
      "Affichez LIMIT:UNLIMITED si la limite vaut -1."
    ],
    "examples": [
      {
        "stdin": "CLUSTER_CAPACITY_MHZ=20000\nPOOL=Production RESERVED_MHZ=8000 LIMIT_MHZ=-1 SHARES=HIGH\nPOOL=Test-Dev RESERVED_MHZ=2000 LIMIT_MHZ=6000 SHARES=NORMAL\nPOOL=Staging RESERVED_MHZ=2000 LIMIT_MHZ=-1 SHARES=LOW",
        "expected": "POOL:Production | RESERVED:8000MHz | LIMIT:UNLIMITED | SHARES:8000 | ALLOCATED:12571.4MHz\nPOOL:Test-Dev | RESERVED:2000MHz | LIMIT:6000MHz | SHARES:4000 | ALLOCATED:4285.7MHz\nPOOL:Staging | RESERVED:2000MHz | LIMIT:UNLIMITED | SHARES:2000 | ALLOCATED:3142.9MHz\n",
        "note": "Capacité 20000 MHz partagée entre 3 pools avec pondérations HIGH (8000), NORMAL (4000) et LOW (2000)."
      }
    ],
    "tests": [
      {
        "label": "Cluster sur-réservé dépassant la capacité",
        "stdin": "cas:1",
        "expected": "ERROR:CLUSTER_OVERCOMMITTED\n"
      },
      {
        "label": "Pool plafonné par sa limite explicite",
        "stdin": "cas:2",
        "expected": "POOL:Pool-Capped | RESERVED:1000MHz | LIMIT:3000MHz | SHARES:8000 | ALLOCATED:3000.0MHz\nPOOL:Pool-Free | RESERVED:1000MHz | LIMIT:UNLIMITED | SHARES:2000 | ALLOCATED:2600.0MHz\n"
      }
    ],
    "solution": "[Exemple]\nPOOL:Production | RESERVED:8000MHz | LIMIT:UNLIMITED | SHARES:8000 | ALLOCATED:12571.4MHz\nPOOL:Test-Dev | RESERVED:2000MHz | LIMIT:6000MHz | SHARES:4000 | ALLOCATED:4285.7MHz\nPOOL:Staging | RESERVED:2000MHz | LIMIT:UNLIMITED | SHARES:2000 | ALLOCATED:3142.9MHz\n\n\n[Cas 1 — Cluster sur-réservé dépassant la capacité]\nERROR:CLUSTER_OVERCOMMITTED\n\n\n[Cas 2 — Pool plafonné par sa limite explicite]\nPOOL:Pool-Capped | RESERVED:1000MHz | LIMIT:3000MHz | SHARES:8000 | ALLOCATED:3000.0MHz\nPOOL:Pool-Free | RESERVED:1000MHz | LIMIT:UNLIMITED | SHARES:2000 | ALLOCATED:2600.0MHz"
  }
];
