'use strict';

module.exports = [
  {
    "id": "ws3-c6-e1",
    "chapter": 6,
    "title": "Analyseur syntaxique de commandes PowerShell d’administration Active Directory",
    "level": "n1",
    "language": "analyse",
    "goal": "Valider la présence des paramètres obligatoires dans les commandes PowerShell d’administration d’annuaire AD DS.",
    "brief": "L’administration automatisée d’un contrôleur de domaine s’appuie sur les cmdlets officielles du module ActiveDirectory :\n- `New-ADUser` : paramètres obligatoires = `-Name`, `-SamAccountName`.\n- `Set-ADUser` : paramètre obligatoire = `-Identity`.\n- `New-ADGroup` : paramètres obligatoires = `-GroupCategory`, `-GroupScope`, `-Name`.\n\nRègles de validation :\n1. Si la commande commence par l’une de ces 3 cmdlets, vérifier que tous les paramètres obligatoires sont présents.\n2. Si tous les paramètres obligatoires sont présents :\n   `CMD_STATUS cmdlet=<NAME> result=VALIDE params_count=<N>` (où N = nombre total de paramètres préfixés par `-`).\n3. Si au moins un paramètre obligatoire est absent :\n   `CMD_STATUS cmdlet=<NAME> result=INVALIDE manquant=<PARAM>` (le premier paramètre obligatoire manquant dans l’ordre alphabétique).\n\nEntrée :\n`POWERSHELL <CMDLET> -<PARAM1> <VAL1> -<PARAM2> <VAL2> ...` (1 ou plusieurs)\n\nRésultat d’analyse attendu :\n- Pour chaque ligne :\n  `CMD_STATUS cmdlet=<NAME> result=<VALIDE|INVALIDE> ...`\n- Bilan :\n  `SUMMARY total_cmds=<N> valides=<V> invalides=<I>`",
    "starter": "# Grille d'analyse (ws3-c6-e1) — Analyseur syntaxique de commandes PowerShell d’administration Active Directory\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Création de groupe avec paramètre obligatoire manquant]\n# Données : POWERSHELL New-ADGroup -Name \"GG_Marketing\" -GroupScope Global\nA_COMPLETER\n\n[Cas 2 — Toutes les commandes correctement paramétrées]\n# Données : POWERSHELL New-ADGroup -Name \"GG_Sec\" -GroupCategory Security -GroupScope Universal\n# Données : POWERSHELL Set-ADUser -Identity bob -Title \"Analyst\"\nA_COMPLETER\n\n[Cas 3 — New-ADUser omettant à la fois Name et SamAccountName]\n# Données : POWERSHELL New-ADUser -Enabled $true\nA_COMPLETER\n",
    "hints": [
      "Créer un dictionnaire listant les paramètres obligatoires pour chaque cmdlet.",
      "Extraire tous les jetons commençant par un tiret (-) pour former la liste des paramètres fournis.",
      "Comparer les ensembles de paramètres et ordonner les manquants par ordre alphabétique."
    ],
    "examples": [
      {
        "stdin": "POWERSHELL New-ADUser -Name \"Alice Smith\" -SamAccountName asmith -Enabled $true\nPOWERSHELL Set-ADUser -Department \"Finance\"",
        "expected": "CMD_STATUS cmdlet=New-ADUser result=VALIDE params_count=3\nCMD_STATUS cmdlet=Set-ADUser result=INVALIDE manquant=-Identity\nSUMMARY total_cmds=2 valides=1 invalides=1",
        "note": "New-ADUser a -Name et -SamAccountName (VALIDE). Set-ADUser omet son paramètre obligatoire -Identity (INVALIDE)."
      }
    ],
    "tests": [
      {
        "label": "Création de groupe avec paramètre obligatoire manquant",
        "stdin": "cas:1",
        "expected": "CMD_STATUS cmdlet=New-ADGroup result=INVALIDE manquant=-GroupCategory\nSUMMARY total_cmds=1 valides=0 invalides=1"
      },
      {
        "label": "Toutes les commandes correctement paramétrées",
        "stdin": "cas:2",
        "expected": "CMD_STATUS cmdlet=New-ADGroup result=VALIDE params_count=3\nCMD_STATUS cmdlet=Set-ADUser result=VALIDE params_count=2\nSUMMARY total_cmds=2 valides=2 invalides=0"
      },
      {
        "label": "New-ADUser omettant à la fois Name et SamAccountName",
        "stdin": "cas:3",
        "expected": "CMD_STATUS cmdlet=New-ADUser result=INVALIDE manquant=-Name\nSUMMARY total_cmds=1 valides=0 invalides=1"
      }
    ],
    "solution": "[Exemple]\nCMD_STATUS cmdlet=New-ADUser result=VALIDE params_count=3\nCMD_STATUS cmdlet=Set-ADUser result=INVALIDE manquant=-Identity\nSUMMARY total_cmds=2 valides=1 invalides=1\n\n[Cas 1 — Création de groupe avec paramètre obligatoire manquant]\nCMD_STATUS cmdlet=New-ADGroup result=INVALIDE manquant=-GroupCategory\nSUMMARY total_cmds=1 valides=0 invalides=1\n\n[Cas 2 — Toutes les commandes correctement paramétrées]\nCMD_STATUS cmdlet=New-ADGroup result=VALIDE params_count=3\nCMD_STATUS cmdlet=Set-ADUser result=VALIDE params_count=2\nSUMMARY total_cmds=2 valides=2 invalides=0\n\n[Cas 3 — New-ADUser omettant à la fois Name et SamAccountName]\nCMD_STATUS cmdlet=New-ADUser result=INVALIDE manquant=-Name\nSUMMARY total_cmds=1 valides=0 invalides=1"
  },
  {
    "id": "ws3-c6-e2",
    "chapter": 6,
    "title": "Calculateur de quorum de cluster de basculement (Failover Clustering)",
    "level": "n2",
    "language": "analyse",
    "goal": "Calculer la majorité absolue des voix et vérifier le maintien du quorum dans un cluster Windows Server en cas de panne de nœuds.",
    "brief": "Dans un cluster de basculement (WSFC - Windows Server Failover Clustering), le modèle de Quorum garantit la cohérence du cluster :\n- `NODE id=<NOM> vote=<0|1> status=<ONLINE|OFFLINE>` : chaque nœud ayant `vote=1` détient 1 voix.\n- `WITNESS type=<DISK|CLOUD|FILE_SHARE|NONE> status=<ONLINE|OFFLINE>` : si `type != NONE`, le témoin apporte 1 voix de départage.\n\nRègles de Quorum officielles Microsoft :\n1. Total des voix configurées : `total_votes = sum(votes des nœuds) + (1 si witness != NONE sinon 0)`.\n2. Majorité absolue requise : `required_majority = (total_votes // 2) + 1`.\n3. Voix actives : `active_votes = sum(voix des nœuds avec vote=1 et status=ONLINE) + (1 si witness != NONE et status=ONLINE sinon 0)`.\n4. État du cluster : si `active_votes >= required_majority` -> `QUORUM_OK` ; sinon -> `PERTE_QUORUM`.\n\nEntrée :\n`NODE id=<NOM> vote=<0|1> status=<ONLINE|OFFLINE>` (1 ou plusieurs)\n`WITNESS type=<DISK|CLOUD|FILE_SHARE|NONE> status=<ONLINE|OFFLINE>`\n\nRésultat d’analyse attendu :\n- Ligne d’analyse du quorum :\n  `QUORUM_ANALYSIS total_votes=<T> required_majority=<M> active_votes=<A> cluster_status=<QUORUM_OK|PERTE_QUORUM>`\n- Bilan de disponibilité :\n  `SUMMARY nodes_online=<N_ON> nodes_offline=<N_OFF> witness_status=<WITNESS_STATUT>`",
    "starter": "# Grille d'analyse (ws3-c6-e2) — Calculateur de quorum de cluster de basculement (Failover Clustering)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Perte de quorum suite à double panne de nœuds sans témoin]\n# Données : NODE id=S1 vote=1 status=ONLINE\n# Données : NODE id=S2 vote=1 status=OFFLINE\n# Données : NODE id=S3 vote=1 status=OFFLINE\n# Données : WITNESS type=NONE status=OFFLINE\nA_COMPLETER\n\n[Cas 2 — Cluster binaire avec témoin maintenant le quorum]\n# Données : NODE id=N1 vote=1 status=ONLINE\n# Données : NODE id=N2 vote=1 status=OFFLINE\n# Données : WITNESS type=DISK status=ONLINE\nA_COMPLETER\n\n[Cas 3 — Cluster avec un nœud sans droit de vote (vote=0)]\n# Données : NODE id=N1 vote=1 status=ONLINE\n# Données : NODE id=N2 vote=0 status=ONLINE\n# Données : NODE id=N3 vote=1 status=ONLINE\n# Données : WITNESS type=FILE_SHARE status=ONLINE\nA_COMPLETER\n",
    "hints": [
      "Compter les voix configurées (nœuds avec vote=1 + 1 si witness présent).",
      "Calculer la majorité avec total_votes // 2 + 1.",
      "Additionner les voix en ligne et comparer au seuil de majorité."
    ],
    "examples": [
      {
        "stdin": "NODE id=NODE-01 vote=1 status=ONLINE\nNODE id=NODE-02 vote=1 status=ONLINE\nNODE id=NODE-03 vote=1 status=OFFLINE\nWITNESS type=CLOUD status=ONLINE",
        "expected": "QUORUM_ANALYSIS total_votes=4 required_majority=3 active_votes=3 cluster_status=QUORUM_OK\nSUMMARY nodes_online=2 nodes_offline=1 witness_status=ONLINE",
        "note": "4 voix configurées (3 nœuds + 1 témoin). Majorité requise = 4//2 + 1 = 3 voix. 3 voix actives (2 nœuds + témoin) : le quorum est maintenu."
      }
    ],
    "tests": [
      {
        "label": "Perte de quorum suite à double panne de nœuds sans témoin",
        "stdin": "cas:1",
        "expected": "QUORUM_ANALYSIS total_votes=3 required_majority=2 active_votes=1 cluster_status=PERTE_QUORUM\nSUMMARY nodes_online=1 nodes_offline=2 witness_status=OFFLINE"
      },
      {
        "label": "Cluster binaire avec témoin maintenant le quorum",
        "stdin": "cas:2",
        "expected": "QUORUM_ANALYSIS total_votes=3 required_majority=2 active_votes=2 cluster_status=QUORUM_OK\nSUMMARY nodes_online=1 nodes_offline=1 witness_status=ONLINE"
      },
      {
        "label": "Cluster avec un nœud sans droit de vote (vote=0)",
        "stdin": "cas:3",
        "expected": "QUORUM_ANALYSIS total_votes=3 required_majority=2 active_votes=3 cluster_status=QUORUM_OK\nSUMMARY nodes_online=3 nodes_offline=0 witness_status=ONLINE"
      }
    ],
    "solution": "[Exemple]\nQUORUM_ANALYSIS total_votes=4 required_majority=3 active_votes=3 cluster_status=QUORUM_OK\nSUMMARY nodes_online=2 nodes_offline=1 witness_status=ONLINE\n\n[Cas 1 — Perte de quorum suite à double panne de nœuds sans témoin]\nQUORUM_ANALYSIS total_votes=3 required_majority=2 active_votes=1 cluster_status=PERTE_QUORUM\nSUMMARY nodes_online=1 nodes_offline=2 witness_status=OFFLINE\n\n[Cas 2 — Cluster binaire avec témoin maintenant le quorum]\nQUORUM_ANALYSIS total_votes=3 required_majority=2 active_votes=2 cluster_status=QUORUM_OK\nSUMMARY nodes_online=1 nodes_offline=1 witness_status=ONLINE\n\n[Cas 3 — Cluster avec un nœud sans droit de vote (vote=0)]\nQUORUM_ANALYSIS total_votes=3 required_majority=2 active_votes=3 cluster_status=QUORUM_OK\nSUMMARY nodes_online=3 nodes_offline=0 witness_status=ONLINE"
  },
  {
    "id": "ws3-c6-e3",
    "chapter": 6,
    "title": "Planificateur de sauvegardes Windows Server Backup (VSS Full vs Incremental)",
    "level": "n3",
    "language": "analyse",
    "goal": "Calculer la capacité de stockage cible pour un cycle de sauvegarde hebdomadaire (VSS Full + Incrémentales) avec overhead de 15%.",
    "brief": "Dans l’outil de sauvegarde Windows Server Backup (wbadmin), la volumétrie s’articule autour de clichés instantanés VSS :\n- Volume source : `SOURCE_VOL letter=<L> size_gb=<S> daily_change_gb=<C>`\n- Période de rétention : `POLICY retention_weeks=<W>`\n\nFormules de dimensionnement du stockage de sauvegarde :\n1. Cycle hebdomadaire (1 sauvegarde complète le jour 1 + 6 sauvegardes incrémentales) :\n   `cycle_hebdo_gb = size_gb + (6 * daily_change_gb)`\n2. Données brutes sur $W$ semaines de rétention :\n   `raw_backup_gb = W * cycle_hebdo_gb`\n3. Réserve de surcharge VSS (Overhead de +15%) :\n   `vss_overhead_15pct = round(raw_backup_gb * 0.15, 1)`\n4. Capacité cible recommandée finale :\n   `final_target_gb = round(raw_backup_gb * 1.15, 1)`\n\nEntrée :\n`SOURCE_VOL letter=<L> size_gb=<S> daily_change_gb=<C>`\n`POLICY retention_weeks=<W>`\n\nRésultat d’analyse attendu :\n- Profil du cycle hebdomadaire :\n  `VOL_PLAN letter=<L> full_backup_gb=<S> week_inc_gb=<6*C> cycle_hebdo_gb=<CYCLE>`\n- Dimensionnement de la cible de stockage :\n  `TARGET_STORAGE weeks=<W> raw_backup_gb=<RAW> vss_overhead_15pct=<OVERHEAD> final_target_gb=<FINAL>`\n- Bilan :\n  `SUMMARY retention_days=<7*W> storage_recommande_gb=<FINAL>`",
    "starter": "# Grille d'analyse (ws3-c6-e3) — Planificateur de sauvegardes Windows Server Backup (VSS Full vs Incremental)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Volume système de taille modeste avec 2 semaines de rétention]\n# Données : SOURCE_VOL letter=C size_gb=100 daily_change_gb=5\n# Données : POLICY retention_weeks=2\nA_COMPLETER\n\n[Cas 2 — Gros volume de fichiers avec forte variation quotidienne]\n# Données : SOURCE_VOL letter=E size_gb=2000 daily_change_gb=100\n# Données : POLICY retention_weeks=1\nA_COMPLETER\n\n[Cas 3 — Volume statique sans modification quotidienne (change=0)]\n# Données : SOURCE_VOL letter=Z size_gb=300 daily_change_gb=0\n# Données : POLICY retention_weeks=3\nA_COMPLETER\n",
    "hints": [
      "Calculer week_inc = 6 * daily_change_gb.",
      "Calculer cycle = size_gb + week_inc, puis multiplier par retention_weeks.",
      "Appliquer l’overhead de 15% et arrondir à 1 décimale."
    ],
    "examples": [
      {
        "stdin": "SOURCE_VOL letter=D size_gb=500 daily_change_gb=20\nPOLICY retention_weeks=4",
        "expected": "VOL_PLAN letter=D full_backup_gb=500 week_inc_gb=120 cycle_hebdo_gb=620\nTARGET_STORAGE weeks=4 raw_backup_gb=2480 vss_overhead_15pct=372.0 final_target_gb=2852.0\nSUMMARY retention_days=28 storage_recommande_gb=2852.0",
        "note": "1 semaine = 500 Go Full + 120 Go Incrémentales = 620 Go. 4 semaines = 2480 Go bruts. Avec 15% VSS = 2852.0 Go."
      }
    ],
    "tests": [
      {
        "label": "Volume système de taille modeste avec 2 semaines de rétention",
        "stdin": "cas:1",
        "expected": "VOL_PLAN letter=C full_backup_gb=100 week_inc_gb=30 cycle_hebdo_gb=130\nTARGET_STORAGE weeks=2 raw_backup_gb=260 vss_overhead_15pct=39.0 final_target_gb=299.0\nSUMMARY retention_days=14 storage_recommande_gb=299.0"
      },
      {
        "label": "Gros volume de fichiers avec forte variation quotidienne",
        "stdin": "cas:2",
        "expected": "VOL_PLAN letter=E full_backup_gb=2000 week_inc_gb=600 cycle_hebdo_gb=2600\nTARGET_STORAGE weeks=1 raw_backup_gb=2600 vss_overhead_15pct=390.0 final_target_gb=2990.0\nSUMMARY retention_days=7 storage_recommande_gb=2990.0"
      },
      {
        "label": "Volume statique sans modification quotidienne (change=0)",
        "stdin": "cas:3",
        "expected": "VOL_PLAN letter=Z full_backup_gb=300 week_inc_gb=0 cycle_hebdo_gb=300\nTARGET_STORAGE weeks=3 raw_backup_gb=900 vss_overhead_15pct=135.0 final_target_gb=1035.0\nSUMMARY retention_days=21 storage_recommande_gb=1035.0"
      }
    ],
    "solution": "[Exemple]\nVOL_PLAN letter=D full_backup_gb=500 week_inc_gb=120 cycle_hebdo_gb=620\nTARGET_STORAGE weeks=4 raw_backup_gb=2480 vss_overhead_15pct=372.0 final_target_gb=2852.0\nSUMMARY retention_days=28 storage_recommande_gb=2852.0\n\n[Cas 1 — Volume système de taille modeste avec 2 semaines de rétention]\nVOL_PLAN letter=C full_backup_gb=100 week_inc_gb=30 cycle_hebdo_gb=130\nTARGET_STORAGE weeks=2 raw_backup_gb=260 vss_overhead_15pct=39.0 final_target_gb=299.0\nSUMMARY retention_days=14 storage_recommande_gb=299.0\n\n[Cas 2 — Gros volume de fichiers avec forte variation quotidienne]\nVOL_PLAN letter=E full_backup_gb=2000 week_inc_gb=600 cycle_hebdo_gb=2600\nTARGET_STORAGE weeks=1 raw_backup_gb=2600 vss_overhead_15pct=390.0 final_target_gb=2990.0\nSUMMARY retention_days=7 storage_recommande_gb=2990.0\n\n[Cas 3 — Volume statique sans modification quotidienne (change=0)]\nVOL_PLAN letter=Z full_backup_gb=300 week_inc_gb=0 cycle_hebdo_gb=300\nTARGET_STORAGE weeks=3 raw_backup_gb=900 vss_overhead_15pct=135.0 final_target_gb=1035.0\nSUMMARY retention_days=21 storage_recommande_gb=1035.0"
  }
];
