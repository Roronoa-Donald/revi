'use strict';

module.exports = [
  {
    "id": "vrt3-c3-e1",
    "chapter": 3,
    "title": "Dimensionneur de Datastores VMFS & Provisionnement de Disques (Thin vs Thick)",
    "level": "n1",
    "language": "analyse",
    "goal": "Calculer la consommation logique et physique d'un Datastore VMFS selon les types de provisionnement (Thick vs Thin).",
    "brief": "<p>Sur un Datastore VMware VMFS, les disques virtuels (.vmdk) utilisent différentes stratégies de provisionnement :<br><br>\n1. <strong>Types de disques</strong> :<br>\n- <code>THICK_EAGER</code> ou <code>THICK_LAZY</code> : L'espace est alloué à 100% dès la création (consommation physique = taille déclarée).<br>\n- <code>THIN</code> : Seul l'espace réellement écrit est consommé sur le Datastore (spécifié par <code>taille:THIN:pct</code>, où <code>pct</code> est le pourcentage consommé, ex: <code>100:THIN:25</code> consomme 25 Go physiques).<br><br>\n2. <strong>Calculs sur le Datastore</strong> :<br>\n- <code>log_gb</code> : Somme des tailles déclarées (nominales) de toutes les VMs.<br>\n- <code>phy_gb</code> : Somme de l'espace physique réellement réservé.<br>\n- <code>log_pct = (log_gb / DS_SIZE_GB) * 100.0</code>.<br>\n- <code>phy_pct = (phy_gb / DS_SIZE_GB) * 100.0</code>.<br><br>\n3. <strong>Statut de conformité du Datastore</strong> :<br>\n- Si <code>phy_gb &gt; DS_SIZE_GB</code> : <code>OVERFLOW_PHYSIQUE</code> (espace disque insuffisant).<br>\n- Si <code>phy_pct &gt; 80.0</code> : <code>ALERTE_SATURATION</code> (seuil d'alerte VMware de 80% dépassé).<br>\n- Si <code>log_gb &gt; DS_SIZE_GB</code> et <code>phy_pct &le; 80.0</code> : <code>OVERCOMMITTED_OK</code> (surallocation saine).<br>\n- Sinon : <code>NOMINAL</code>.<br><br>\nFormat d'entrée (sur STDIN) :<br>\nLignes : <code>DATASTORE=&lt;nom&gt; DS_SIZE_GB=&lt;n&gt; DISKS=&lt;vm1:taille:type[:pct],vm2:...&gt;</code>.<br><br>\nFormat de sortie :<br>\n<code>DATASTORE:&lt;nom&gt; | LOGICAL:&lt;log_gb&gt;GB (&lt;log_pct:.1f&gt;%) | PHYSICAL:&lt;phy_gb:.1f&gt;GB (&lt;phy_pct:.1f&gt;%) | STATUT:&lt;statut&gt;</code></p>",
    "starter": "# Grille d'analyse (vrt3-c3-e1) — Dimensionneur de Datastores VMFS & Provisionnement de Disques (Thin vs Thick)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Surallocation logique saine sous 80% physique]\n# Données : DATASTORE=ds-overcommit DS_SIZE_GB=1000 DISKS=vmA:600:THIN:25,vmB:600:THIN:25,vmC:400:THIN:20\n# Données : DATASTORE=ds-overflow DS_SIZE_GB=400 DISKS=vm1:300:THICK_EAGER,vm2:200:THICK_LAZY\nA_COMPLETER\n\n[Cas 2 — Datastore franchissant pile le seuil d'alerte 80%]\n# Données : DATASTORE=ds-limit DS_SIZE_GB=1000 DISKS=vm1:820:THICK_EAGER\nA_COMPLETER\n",
    "hints": [
      "Pour les disques THIN, multipliez la taille par (pct / 100.0) pour obtenir l'espace physique.",
      "Pour les disques THICK, l'espace physique est exactement égal à la taille déclarée."
    ],
    "examples": [
      {
        "stdin": "DATASTORE=ds-san-01 DS_SIZE_GB=1000 DISKS=vm1:200:THICK_EAGER,vm2:300:THIN:30,vm3:400:THIN:20\nDATASTORE=ds-nfs-02 DS_SIZE_GB=500 DISKS=vm4:400:THICK_LAZY,vm5:200:THIN:50",
        "expected": "DATASTORE:ds-san-01 | LOGICAL:900GB (90.0%) | PHYSICAL:370.0GB (37.0%) | STATUT:NOMINAL\nDATASTORE:ds-nfs-02 | LOGICAL:600GB (120.0%) | PHYSICAL:500.0GB (100.0%) | STATUT:ALERTE_SATURATION\n",
        "note": "Datastore nominal sous 80% vs Datastore saturé à 100% avec surallocation logique."
      }
    ],
    "tests": [
      {
        "label": "Surallocation logique saine sous 80% physique",
        "stdin": "cas:1",
        "expected": "DATASTORE:ds-overcommit | LOGICAL:1600GB (160.0%) | PHYSICAL:380.0GB (38.0%) | STATUT:OVERCOMMITTED_OK\nDATASTORE:ds-overflow | LOGICAL:500GB (125.0%) | PHYSICAL:500.0GB (125.0%) | STATUT:OVERFLOW_PHYSIQUE\n"
      },
      {
        "label": "Datastore franchissant pile le seuil d'alerte 80%",
        "stdin": "cas:2",
        "expected": "DATASTORE:ds-limit | LOGICAL:820GB (82.0%) | PHYSICAL:820.0GB (82.0%) | STATUT:ALERTE_SATURATION\n"
      }
    ],
    "solution": "[Exemple]\nDATASTORE:ds-san-01 | LOGICAL:900GB (90.0%) | PHYSICAL:370.0GB (37.0%) | STATUT:NOMINAL\nDATASTORE:ds-nfs-02 | LOGICAL:600GB (120.0%) | PHYSICAL:500.0GB (100.0%) | STATUT:ALERTE_SATURATION\n\n\n[Cas 1 — Surallocation logique saine sous 80% physique]\nDATASTORE:ds-overcommit | LOGICAL:1600GB (160.0%) | PHYSICAL:380.0GB (38.0%) | STATUT:OVERCOMMITTED_OK\nDATASTORE:ds-overflow | LOGICAL:500GB (125.0%) | PHYSICAL:500.0GB (125.0%) | STATUT:OVERFLOW_PHYSIQUE\n\n\n[Cas 2 — Datastore franchissant pile le seuil d'alerte 80%]\nDATASTORE:ds-limit | LOGICAL:820GB (82.0%) | PHYSICAL:820.0GB (82.0%) | STATUT:ALERTE_SATURATION"
  },
  {
    "id": "vrt3-c3-e2",
    "chapter": 3,
    "title": "Calculateur de Capacité Utile vSAN & Politiques SPBM (FTT / RAID-1 / RAID-5)",
    "level": "n2",
    "language": "analyse",
    "goal": "Calculer la consommation brute et la capacité restante d'un cluster vSAN selon les règles SPBM (Failures to Tolerate).",
    "brief": "<p>VMware vSAN protège les machines virtuelles en appliquant des politiques de stockage SPBM avec facteurs d'amplification d'écriture :<br><br>\n1. <strong>Politiques de protection (SPBM)</strong> :<br>\n- <code>FTT=1_RAID1</code> (Miroir) : Multiplicateur = <code>2.00x</code> (min 3 hôtes).<br>\n- <code>FTT=1_RAID5</code> (Érasure Coding 3+1) : Multiplicateur = <code>1.33x</code> (min 4 hôtes).<br>\n- <code>FTT=2_RAID1</code> (Triple miroir) : Multiplicateur = <code>3.00x</code> (min 5 hôtes).<br>\n- <code>FTT=2_RAID6</code> (Érasure Coding 4+2) : Multiplicateur = <code>1.50x</code> (min 6 hôtes).<br><br>\n2. <strong>Espace de réserve opérationnelle (Slack Space)</strong> :<br>\nvSAN réserve obligatoirement 20% de la capacité brute du cluster pour les opérations internes (rebuild en cas de panne) :<br>\n<code>usable_limit_tb = RAW_CAPACITY_TB * 0.80</code>.<br><br>\n3. <strong>Consommation et capacité restante</strong> :<br>\n- <code>consumed_raw_tb = VM_DATA_TB * multiplier</code>.<br>\n- <code>remaining_tb = usable_limit_tb - consumed_raw_tb</code>.<br><br>\n4. <strong>Validation et statut</strong> :<br>\n- Si <code>CLUSTER_HOSTS &lt; min_hosts</code> : <code>ERROR:INVALID_HOST_COUNT</code>.<br>\n- Si <code>remaining_tb &lt; 0.0</code> : <code>CAPACITY_EXCEEDED</code>.<br>\n- Si <code>consumed_raw_tb &gt; usable_limit_tb * 0.85</code> : <code>WARNING_SLACK</code>.<br>\n- Sinon : <code>HEALTHY</code>.<br><br>\nFormat d'entrée (sur STDIN) :<br>\nLignes : <code>HOSTS=&lt;nb&gt; RAW_CAPACITY_TB=&lt;to&gt; POLICY=&lt;nom&gt; VM_DATA_TB=&lt;to&gt;</code>.<br><br>\nFormat de sortie :<br>\n<code>POLICY:&lt;nom&gt; | MULTIPLIER:&lt;mult:.2f&gt;x | CONSUMED:&lt;consumed_raw_tb:.2f&gt;TB | REMAINING:&lt;remaining_tb:.2f&gt;TB | STATUT:&lt;statut&gt;</code></p>",
    "starter": "# Grille d'analyse (vrt3-c3-e2) — Calculateur de Capacité Utile vSAN & Politiques SPBM (FTT / RAID-1 / RAID-5)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — FTT=2 avec RAID-6 et dépassement de capacité]\n# Données : HOSTS=6 RAW_CAPACITY_TB=100.0 POLICY=FTT=2_RAID6 VM_DATA_TB=40.0\n# Données : HOSTS=6 RAW_CAPACITY_TB=80.0 POLICY=FTT=2_RAID1 VM_DATA_TB=25.0\nA_COMPLETER\n\n[Cas 2 — Hôtes insuffisants pour FTT=2 RAID-6]\n# Données : HOSTS=5 RAW_CAPACITY_TB=100.0 POLICY=FTT=2_RAID6 VM_DATA_TB=20.0\nA_COMPLETER\n",
    "hints": [
      "Vérifiez le nombre minimal d'hôtes requis par chaque politique avant les calculs.",
      "La réserve de Slack Space (20%) réduit la capacité utilisable à RAW_CAPACITY_TB * 0.80."
    ],
    "examples": [
      {
        "stdin": "HOSTS=4 RAW_CAPACITY_TB=50.0 POLICY=FTT=1_RAID5 VM_DATA_TB=15.0\nHOSTS=3 RAW_CAPACITY_TB=60.0 POLICY=FTT=1_RAID1 VM_DATA_TB=20.0\nHOSTS=3 RAW_CAPACITY_TB=40.0 POLICY=FTT=1_RAID5 VM_DATA_TB=10.0",
        "expected": "POLICY:FTT=1_RAID5 | MULTIPLIER:1.33x | CONSUMED:20.00TB | REMAINING:20.00TB | STATUT:HEALTHY\nPOLICY:FTT=1_RAID1 | MULTIPLIER:2.00x | CONSUMED:40.00TB | REMAINING:8.00TB | STATUT:HEALTHY\nERROR:INVALID_HOST_COUNT\n",
        "note": "vSAN RAID-5 sain sur 4 hôtes, RAID-1 en avertissement slack space et échec d'hôtes insuffisants."
      }
    ],
    "tests": [
      {
        "label": "FTT=2 avec RAID-6 et dépassement de capacité",
        "stdin": "cas:1",
        "expected": "POLICY:FTT=2_RAID6 | MULTIPLIER:1.50x | CONSUMED:60.00TB | REMAINING:20.00TB | STATUT:HEALTHY\nPOLICY:FTT=2_RAID1 | MULTIPLIER:3.00x | CONSUMED:75.00TB | REMAINING:-11.00TB | STATUT:CAPACITY_EXCEEDED\n"
      },
      {
        "label": "Hôtes insuffisants pour FTT=2 RAID-6",
        "stdin": "cas:2",
        "expected": "ERROR:INVALID_HOST_COUNT\n"
      }
    ],
    "solution": "[Exemple]\nPOLICY:FTT=1_RAID5 | MULTIPLIER:1.33x | CONSUMED:20.00TB | REMAINING:20.00TB | STATUT:HEALTHY\nPOLICY:FTT=1_RAID1 | MULTIPLIER:2.00x | CONSUMED:40.00TB | REMAINING:8.00TB | STATUT:HEALTHY\nERROR:INVALID_HOST_COUNT\n\n\n[Cas 1 — FTT=2 avec RAID-6 et dépassement de capacité]\nPOLICY:FTT=2_RAID6 | MULTIPLIER:1.50x | CONSUMED:60.00TB | REMAINING:20.00TB | STATUT:HEALTHY\nPOLICY:FTT=2_RAID1 | MULTIPLIER:3.00x | CONSUMED:75.00TB | REMAINING:-11.00TB | STATUT:CAPACITY_EXCEEDED\n\n\n[Cas 2 — Hôtes insuffisants pour FTT=2 RAID-6]\nERROR:INVALID_HOST_COUNT"
  },
  {
    "id": "vrt3-c3-e3",
    "chapter": 3,
    "title": "Moteur d'Arbitrage Multipathing MPIO (Round Robin & Fixed)",
    "level": "n3",
    "language": "analyse",
    "goal": "Simuler l'acheminement des requêtes I/O disque sur les chemins SAN selon les politiques multipathing MPIO (Round Robin et Fixed).",
    "brief": "<p>Le plug-in natif de sélection de chemin VMware NMP (Native Multipathing) répartit les flux d'entrées/sorties sur les adaptateurs HBA/iSCSI :<br><br>\n1. <strong>Politique <code>VMW_PSP_RR</code> (Round Robin)</strong> :<br>\nAlterne équitablement les requêtes I/O entre tous les chemins actifs. Dès qu'un chemin traite <code>THRESHOLD</code> I/O (par défaut 1000, ou valeur configurée), le commutateur bascule sur le chemin actif suivant en anneau circulaire.<br><br>\n2. <strong>Politique <code>VMW_PSP_FIXED</code></strong> :<br>\nEnvoie la totalité des I/O sur le chemin <code>PREFERRED</code>. Si ce chemin tombe en panne (événement <code>FAIL:&lt;path&gt;</code>), les I/O basculent sur le premier chemin alternatif actif. Dès que le chemin préféré se rétablit (<code>RECOVER:&lt;path&gt;</code>), le trafic y revient immédiatement (<em>Failback</em>).<br><br>\nFormat d'entrée (sur STDIN) :<br>\nLigne 1 : <code>POLICY=&lt;RR|FIXED&gt; PATHS=&lt;p1,p2,...&gt; PREFERRED=&lt;path&gt; THRESHOLD=&lt;nb&gt;</code>.<br>\nLignes suivantes : Événements <code>IO=&lt;nb&gt;</code>, <code>FAIL=&lt;path&gt;</code> ou <code>RECOVER=&lt;path&gt;</code>.<br><br>\nFormat de sortie :<br>\nPour chaque chemin, afficher le nombre total d'I/O reçues :<br>\n<code>PATH:&lt;p1&gt;=&lt;total_io&gt; | PATH:&lt;p2&gt;=&lt;total_io&gt; | ... | CURRENT_ACTIVE:&lt;chemin_courant&gt;</code></p>",
    "starter": "# Grille d'analyse (vrt3-c3-e3) — Moteur d'Arbitrage Multipathing MPIO (Round Robin & Fixed)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Politique FIXED avec panne et rétablissement du chemin préféré]\n# Données : POLICY=FIXED PATHS=hba1,hba2 PREFERRED=hba1 THRESHOLD=1000\n# Données : IO=2000\n# Données : FAIL=hba1\n# Données : IO=1500\n# Données : RECOVER=hba1\n# Données : IO=500\nA_COMPLETER\n\n[Cas 2 — Round Robin avec panne d'un chemin pendant le flux]\n# Données : POLICY=RR PATHS=p1,p2,p3 THRESHOLD=100\n# Données : IO=100\n# Données : IO=100\n# Données : FAIL=p3\n# Données : IO=200\nA_COMPLETER\n",
    "hints": [
      "En Round Robin, gérez un compteur d'I/O sur le chemin courant pour basculer dès que THRESHOLD est atteint.",
      "En cas d'événement FAIL, retirez le chemin des actifs ; s'il s'agissait du chemin courant, basculez vers le suivant."
    ],
    "examples": [
      {
        "stdin": "POLICY=RR PATHS=vmhba1:C0:T0:L0,vmhba2:C0:T0:L0 THRESHOLD=1000\nIO=1000\nIO=1000\nIO=500",
        "expected": "PATH:vmhba1:C0:T0:L0=1500 | PATH:vmhba2:C0:T0:L0=1000 | CURRENT_ACTIVE:vmhba1:C0:T0:L0\n",
        "note": "Round Robin alternant par tranche de 1000 I/O entre deux chemins."
      }
    ],
    "tests": [
      {
        "label": "Politique FIXED avec panne et rétablissement du chemin préféré",
        "stdin": "cas:1",
        "expected": "PATH:hba1=2500 | PATH:hba2=1500 | CURRENT_ACTIVE:hba1\n"
      },
      {
        "label": "Round Robin avec panne d'un chemin pendant le flux",
        "stdin": "cas:2",
        "expected": "PATH:p1=200 | PATH:p2=200 | PATH:p3=0 | CURRENT_ACTIVE:p1\n"
      }
    ],
    "solution": "[Exemple]\nPATH:vmhba1:C0:T0:L0=1500 | PATH:vmhba2:C0:T0:L0=1000 | CURRENT_ACTIVE:vmhba1:C0:T0:L0\n\n\n[Cas 1 — Politique FIXED avec panne et rétablissement du chemin préféré]\nPATH:hba1=2500 | PATH:hba2=1500 | CURRENT_ACTIVE:hba1\n\n\n[Cas 2 — Round Robin avec panne d'un chemin pendant le flux]\nPATH:p1=200 | PATH:p2=200 | PATH:p3=0 | CURRENT_ACTIVE:p1"
  }
];
