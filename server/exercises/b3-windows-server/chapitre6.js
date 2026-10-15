// server/exercises/b3-windows-server/chapitre6.js
// Exercices du Module 6 : Administration Avancée PowerShell & Tolérance aux Pannes (idPrefix: ws3)

module.exports = [
  {
    id: 'ws3-c6-e1',
    chapter: 6,
    title: 'Analyseur syntaxique de commandes PowerShell d’administration Active Directory',
    level: 'n1',
    language: 'python',
    goal: 'Valider la présence des paramètres obligatoires dans les commandes PowerShell d’administration d’annuaire AD DS.',
    brief:
      'L’administration automatisée d’un contrôleur de domaine s’appuie sur les cmdlets officielles du module ActiveDirectory :\n' +
      '- `New-ADUser` : paramètres obligatoires = `-Name`, `-SamAccountName`.\n' +
      '- `Set-ADUser` : paramètre obligatoire = `-Identity`.\n' +
      '- `New-ADGroup` : paramètres obligatoires = `-GroupCategory`, `-GroupScope`, `-Name`.\n\n' +
      'Règles de validation :\n' +
      '1. Si la commande commence par l’une de ces 3 cmdlets, vérifier que tous les paramètres obligatoires sont présents.\n' +
      '2. Si tous les paramètres obligatoires sont présents :\n' +
      '   `CMD_STATUS cmdlet=<NAME> result=VALIDE params_count=<N>` (où N = nombre total de paramètres préfixés par `-`).\n' +
      '3. Si au moins un paramètre obligatoire est absent :\n' +
      '   `CMD_STATUS cmdlet=<NAME> result=INVALIDE manquant=<PARAM>` (le premier paramètre obligatoire manquant dans l’ordre alphabétique).\n\n' +
      'Entrée :\n' +
      '`POWERSHELL <CMDLET> -<PARAM1> <VAL1> -<PARAM2> <VAL2> ...` (1 ou plusieurs)\n\n' +
      'Sortie :\n' +
      '- Pour chaque ligne :\n' +
      '  `CMD_STATUS cmdlet=<NAME> result=<VALIDE|INVALIDE> ...`\n' +
      '- Bilan :\n' +
      '  `SUMMARY total_cmds=<N> valides=<V> invalides=<I>`',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : analyser la syntaxe des cmdlets PowerShell Active Directory
`,
    hints: [
      'Créer un dictionnaire listant les paramètres obligatoires pour chaque cmdlet.',
      'Extraire tous les jetons commençant par un tiret (-) pour former la liste des paramètres fournis.',
      'Comparer les ensembles de paramètres et ordonner les manquants par ordre alphabétique.'
    ],
    examples: [
      {
        stdin:
          'POWERSHELL New-ADUser -Name "Alice Smith" -SamAccountName asmith -Enabled $true\n' +
          'POWERSHELL Set-ADUser -Department "Finance"',
        expected:
          'CMD_STATUS cmdlet=New-ADUser result=VALIDE params_count=3\n' +
          'CMD_STATUS cmdlet=Set-ADUser result=INVALIDE manquant=-Identity\n' +
          'SUMMARY total_cmds=2 valides=1 invalides=1',
        note: 'New-ADUser a -Name et -SamAccountName (VALIDE). Set-ADUser omet son paramètre obligatoire -Identity (INVALIDE).'
      }
    ],
    tests: [
      {
        label: 'Création de groupe avec paramètre obligatoire manquant',
        stdin: 'POWERSHELL New-ADGroup -Name "GG_Marketing" -GroupScope Global',
        expected:
          'CMD_STATUS cmdlet=New-ADGroup result=INVALIDE manquant=-GroupCategory\n' +
          'SUMMARY total_cmds=1 valides=0 invalides=1'
      },
      {
        label: 'Toutes les commandes correctement paramétrées',
        stdin:
          'POWERSHELL New-ADGroup -Name "GG_Sec" -GroupCategory Security -GroupScope Universal\n' +
          'POWERSHELL Set-ADUser -Identity bob -Title "Analyst"',
        expected:
          'CMD_STATUS cmdlet=New-ADGroup result=VALIDE params_count=3\n' +
          'CMD_STATUS cmdlet=Set-ADUser result=VALIDE params_count=2\n' +
          'SUMMARY total_cmds=2 valides=2 invalides=0'
      },
      {
        label: 'New-ADUser omettant à la fois Name et SamAccountName',
        stdin: 'POWERSHELL New-ADUser -Enabled $true',
        expected:
          'CMD_STATUS cmdlet=New-ADUser result=INVALIDE manquant=-Name\n' +
          'SUMMARY total_cmds=1 valides=0 invalides=1'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

mandatory = {
    'New-ADUser': ['-Name', '-SamAccountName'],
    'Set-ADUser': ['-Identity'],
    'New-ADGroup': ['-GroupCategory', '-GroupScope', '-Name']
}

c_val = 0
c_inval = 0
total_cmds = 0

for ligne in lignes:
    if not ligne.startswith('POWERSHELL '):
        continue
    total_cmds += 1
    raw = ligne[len('POWERSHELL '):].strip()
    tokens = raw.split(' ')
    cmdlet = tokens[0]
    
    # Extraire les paramètres (mots commençant par -)
    params_found = set()
    for tok in tokens[1:]:
        if tok.startswith('-'):
            params_found.add(tok)
            
    req = mandatory.get(cmdlet, [])
    missing = [p for p in req if p not in params_found]
    missing.sort()
    
    if not missing:
        c_val += 1
        print(f"CMD_STATUS cmdlet={cmdlet} result=VALIDE params_count={len(params_found)}")
    else:
        c_inval += 1
        print(f"CMD_STATUS cmdlet={cmdlet} result=INVALIDE manquant={missing[0]}")

print(f"SUMMARY total_cmds={total_cmds} valides={c_val} invalides={c_inval}")
`
  },
  {
    id: 'ws3-c6-e2',
    chapter: 6,
    title: 'Calculateur de quorum de cluster de basculement (Failover Clustering)',
    level: 'n2',
    language: 'python',
    goal: 'Calculer la majorité absolue des voix et vérifier le maintien du quorum dans un cluster Windows Server en cas de panne de nœuds.',
    brief:
      'Dans un cluster de basculement (WSFC - Windows Server Failover Clustering), le modèle de Quorum garantit la cohérence du cluster :\n' +
      '- `NODE id=<NOM> vote=<0|1> status=<ONLINE|OFFLINE>` : chaque nœud ayant `vote=1` détient 1 voix.\n' +
      '- `WITNESS type=<DISK|CLOUD|FILE_SHARE|NONE> status=<ONLINE|OFFLINE>` : si `type != NONE`, le témoin apporte 1 voix de départage.\n\n' +
      'Règles de Quorum officielles Microsoft :\n' +
      '1. Total des voix configurées : `total_votes = sum(votes des nœuds) + (1 si witness != NONE sinon 0)`.\n' +
      '2. Majorité absolue requise : `required_majority = (total_votes // 2) + 1`.\n' +
      '3. Voix actives : `active_votes = sum(voix des nœuds avec vote=1 et status=ONLINE) + (1 si witness != NONE et status=ONLINE sinon 0)`.\n' +
      '4. État du cluster : si `active_votes >= required_majority` -> `QUORUM_OK` ; sinon -> `PERTE_QUORUM`.\n\n' +
      'Entrée :\n' +
      '`NODE id=<NOM> vote=<0|1> status=<ONLINE|OFFLINE>` (1 ou plusieurs)\n' +
      '`WITNESS type=<DISK|CLOUD|FILE_SHARE|NONE> status=<ONLINE|OFFLINE>`\n\n' +
      'Sortie :\n' +
      '- Ligne d’analyse du quorum :\n' +
      '  `QUORUM_ANALYSIS total_votes=<T> required_majority=<M> active_votes=<A> cluster_status=<QUORUM_OK|PERTE_QUORUM>`\n' +
      '- Bilan de disponibilité :\n' +
      '  `SUMMARY nodes_online=<N_ON> nodes_offline=<N_OFF> witness_status=<WITNESS_STATUT>`',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer le quorum et vérifier la majorité absolue
`,
    hints: [
      'Compter les voix configurées (nœuds avec vote=1 + 1 si witness présent).',
      'Calculer la majorité avec total_votes // 2 + 1.',
      'Additionner les voix en ligne et comparer au seuil de majorité.'
    ],
    examples: [
      {
        stdin:
          'NODE id=NODE-01 vote=1 status=ONLINE\n' +
          'NODE id=NODE-02 vote=1 status=ONLINE\n' +
          'NODE id=NODE-03 vote=1 status=OFFLINE\n' +
          'WITNESS type=CLOUD status=ONLINE',
        expected:
          'QUORUM_ANALYSIS total_votes=4 required_majority=3 active_votes=3 cluster_status=QUORUM_OK\n' +
          'SUMMARY nodes_online=2 nodes_offline=1 witness_status=ONLINE',
        note: '4 voix configurées (3 nœuds + 1 témoin). Majorité requise = 4//2 + 1 = 3 voix. 3 voix actives (2 nœuds + témoin) : le quorum est maintenu.'
      }
    ],
    tests: [
      {
        label: 'Perte de quorum suite à double panne de nœuds sans témoin',
        stdin:
          'NODE id=S1 vote=1 status=ONLINE\n' +
          'NODE id=S2 vote=1 status=OFFLINE\n' +
          'NODE id=S3 vote=1 status=OFFLINE\n' +
          'WITNESS type=NONE status=OFFLINE',
        expected:
          'QUORUM_ANALYSIS total_votes=3 required_majority=2 active_votes=1 cluster_status=PERTE_QUORUM\n' +
          'SUMMARY nodes_online=1 nodes_offline=2 witness_status=OFFLINE'
      },
      {
        label: 'Cluster binaire avec témoin maintenant le quorum',
        stdin:
          'NODE id=N1 vote=1 status=ONLINE\n' +
          'NODE id=N2 vote=1 status=OFFLINE\n' +
          'WITNESS type=DISK status=ONLINE',
        expected:
          'QUORUM_ANALYSIS total_votes=3 required_majority=2 active_votes=2 cluster_status=QUORUM_OK\n' +
          'SUMMARY nodes_online=1 nodes_offline=1 witness_status=ONLINE'
      },
      {
        label: 'Cluster avec un nœud sans droit de vote (vote=0)',
        stdin:
          'NODE id=N1 vote=1 status=ONLINE\n' +
          'NODE id=N2 vote=0 status=ONLINE\n' +
          'NODE id=N3 vote=1 status=ONLINE\n' +
          'WITNESS type=FILE_SHARE status=ONLINE',
        expected:
          'QUORUM_ANALYSIS total_votes=3 required_majority=2 active_votes=3 cluster_status=QUORUM_OK\n' +
          'SUMMARY nodes_online=3 nodes_offline=0 witness_status=ONLINE'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

nodes = []
witness_type = "NONE"
witness_status = "OFFLINE"

for ligne in lignes:
    parts = ligne.split(' ')
    cmd = parts[0]
    pdict = {}
    for tok in parts[1:]:
        if '=' in tok:
            k, v = tok.split('=', 1)
            pdict[k] = v
            
    if cmd == 'NODE':
        nid = pdict.get('id', '')
        vote = int(pdict.get('vote', 1))
        st = pdict.get('status', 'ONLINE')
        nodes.append((nid, vote, st))
    elif cmd == 'WITNESS':
        witness_type = pdict.get('type', 'NONE')
        witness_status = pdict.get('status', 'OFFLINE')

has_witness = (witness_type != 'NONE')
witness_vote = 1 if has_witness else 0

total_votes = sum(vote for _, vote, _ in nodes) + witness_vote
required_majority = (total_votes // 2) + 1

active_nodes = sum(vote for _, vote, st in nodes if st == 'ONLINE')
active_witness = 1 if (has_witness and witness_status == 'ONLINE') else 0
active_votes = active_nodes + active_witness

status = "QUORUM_OK" if active_votes >= required_majority else "PERTE_QUORUM"

print(f"QUORUM_ANALYSIS total_votes={total_votes} required_majority={required_majority} active_votes={active_votes} cluster_status={status}")

n_on = sum(1 for _, _, st in nodes if st == 'ONLINE')
n_off = sum(1 for _, _, st in nodes if st == 'OFFLINE')
print(f"SUMMARY nodes_online={n_on} nodes_offline={n_off} witness_status={witness_status}")
`
  },
  {
    id: 'ws3-c6-e3',
    chapter: 6,
    title: 'Planificateur de sauvegardes Windows Server Backup (VSS Full vs Incremental)',
    level: 'n3',
    language: 'python',
    goal: 'Calculer la capacité de stockage cible pour un cycle de sauvegarde hebdomadaire (VSS Full + Incrémentales) avec overhead de 15%.',
    brief:
      'Dans l’outil de sauvegarde Windows Server Backup (wbadmin), la volumétrie s’articule autour de clichés instantanés VSS :\n' +
      '- Volume source : `SOURCE_VOL letter=<L> size_gb=<S> daily_change_gb=<C>`\n' +
      '- Période de rétention : `POLICY retention_weeks=<W>`\n\n' +
      'Formules de dimensionnement du stockage de sauvegarde :\n' +
      '1. Cycle hebdomadaire (1 sauvegarde complète le jour 1 + 6 sauvegardes incrémentales) :\n' +
      '   `cycle_hebdo_gb = size_gb + (6 * daily_change_gb)`\n' +
      '2. Données brutes sur $W$ semaines de rétention :\n' +
      '   `raw_backup_gb = W * cycle_hebdo_gb`\n' +
      '3. Réserve de surcharge VSS (Overhead de +15%) :\n' +
      '   `vss_overhead_15pct = round(raw_backup_gb * 0.15, 1)`\n' +
      '4. Capacité cible recommandée finale :\n' +
      '   `final_target_gb = round(raw_backup_gb * 1.15, 1)`\n\n' +
      'Entrée :\n' +
      '`SOURCE_VOL letter=<L> size_gb=<S> daily_change_gb=<C>`\n' +
      '`POLICY retention_weeks=<W>`\n\n' +
      'Sortie :\n' +
      '- Profil du cycle hebdomadaire :\n' +
      '  `VOL_PLAN letter=<L> full_backup_gb=<S> week_inc_gb=<6*C> cycle_hebdo_gb=<CYCLE>`\n' +
      '- Dimensionnement de la cible de stockage :\n' +
      '  `TARGET_STORAGE weeks=<W> raw_backup_gb=<RAW> vss_overhead_15pct=<OVERHEAD> final_target_gb=<FINAL>`\n' +
      '- Bilan :\n' +
      '  `SUMMARY retention_days=<7*W> storage_recommande_gb=<FINAL>`',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer la volumétrie des sauvegardes et le stockage cible
`,
    hints: [
      'Calculer week_inc = 6 * daily_change_gb.',
      'Calculer cycle = size_gb + week_inc, puis multiplier par retention_weeks.',
      'Appliquer l’overhead de 15% et arrondir à 1 décimale.'
    ],
    examples: [
      {
        stdin:
          'SOURCE_VOL letter=D size_gb=500 daily_change_gb=20\n' +
          'POLICY retention_weeks=4',
        expected:
          'VOL_PLAN letter=D full_backup_gb=500 week_inc_gb=120 cycle_hebdo_gb=620\n' +
          'TARGET_STORAGE weeks=4 raw_backup_gb=2480 vss_overhead_15pct=372.0 final_target_gb=2852.0\n' +
          'SUMMARY retention_days=28 storage_recommande_gb=2852.0',
        note: '1 semaine = 500 Go Full + 120 Go Incrémentales = 620 Go. 4 semaines = 2480 Go bruts. Avec 15% VSS = 2852.0 Go.'
      }
    ],
    tests: [
      {
        label: 'Volume système de taille modeste avec 2 semaines de rétention',
        stdin:
          'SOURCE_VOL letter=C size_gb=100 daily_change_gb=5\n' +
          'POLICY retention_weeks=2',
        expected:
          'VOL_PLAN letter=C full_backup_gb=100 week_inc_gb=30 cycle_hebdo_gb=130\n' +
          'TARGET_STORAGE weeks=2 raw_backup_gb=260 vss_overhead_15pct=39.0 final_target_gb=299.0\n' +
          'SUMMARY retention_days=14 storage_recommande_gb=299.0'
      },
      {
        label: 'Gros volume de fichiers avec forte variation quotidienne',
        stdin:
          'SOURCE_VOL letter=E size_gb=2000 daily_change_gb=100\n' +
          'POLICY retention_weeks=1',
        expected:
          'VOL_PLAN letter=E full_backup_gb=2000 week_inc_gb=600 cycle_hebdo_gb=2600\n' +
          'TARGET_STORAGE weeks=1 raw_backup_gb=2600 vss_overhead_15pct=390.0 final_target_gb=2990.0\n' +
          'SUMMARY retention_days=7 storage_recommande_gb=2990.0'
      },
      {
        label: 'Volume statique sans modification quotidienne (change=0)',
        stdin:
          'SOURCE_VOL letter=Z size_gb=300 daily_change_gb=0\n' +
          'POLICY retention_weeks=3',
        expected:
          'VOL_PLAN letter=Z full_backup_gb=300 week_inc_gb=0 cycle_hebdo_gb=300\n' +
          'TARGET_STORAGE weeks=3 raw_backup_gb=900 vss_overhead_15pct=135.0 final_target_gb=1035.0\n' +
          'SUMMARY retention_days=21 storage_recommande_gb=1035.0'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

vol_letter = "C"
vol_size = 0
daily_change = 0
retention_weeks = 1

for ligne in lignes:
    parts = ligne.split(' ')
    cmd = parts[0]
    pdict = {}
    for tok in parts[1:]:
        if '=' in tok:
            k, v = tok.split('=', 1)
            pdict[k] = v
            
    if cmd == 'SOURCE_VOL':
        vol_letter = pdict.get('letter', 'C')
        vol_size = int(pdict.get('size_gb', 0))
        daily_change = int(pdict.get('daily_change_gb', 0))
    elif cmd == 'POLICY':
        retention_weeks = int(pdict.get('retention_weeks', 1))

week_inc = 6 * daily_change
cycle_hebdo = vol_size + week_inc
raw_backup = retention_weeks * cycle_hebdo
overhead = round(raw_backup * 0.15, 1)
final_target = round(raw_backup * 1.15, 1)
retention_days = 7 * retention_weeks

print(f"VOL_PLAN letter={vol_letter} full_backup_gb={vol_size} week_inc_gb={week_inc} cycle_hebdo_gb={cycle_hebdo}")
print(f"TARGET_STORAGE weeks={retention_weeks} raw_backup_gb={raw_backup} vss_overhead_15pct={overhead:.1f} final_target_gb={final_target:.1f}")
print(f"SUMMARY retention_days={retention_days} storage_recommande_gb={final_target:.1f}")
`
  }
];
