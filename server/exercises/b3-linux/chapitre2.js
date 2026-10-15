/**
 * Exercices Chapitre 2 — Linux Avancé B3.
 * Initialisation du Système & Gestionnaire de Services Systemd Avancé.
 */
'use strict';

module.exports = [
  {
    id: 'lx3-c2-e1',
    chapter: 2,
    title: 'Validateur d’unité de service Systemd ([Unit], [Service], [Install])',
    level: 'n1',
    language: 'python',
    goal: 'Vérifier la conformité syntaxique et la validité des directives d’un fichier de service Systemd.',
    brief: `<p>Sous Linux, <strong>Systemd</strong> (PID 1) orchestre le démarrage des démons via des fichiers déclaratifs d'unités (<code>.service</code>) placés dans <code>/etc/systemd/system/</code> ou <code>/lib/systemd/system/</code>.<br><br>
Règles de conformité strictes d'une unité de service :<br>
1. <code>ExecStart</code> est obligatoire et doit impérativement spécifier un <strong>chemin absolu</strong> (commençant par <code>/</code>). Un binaire relatif (ex: <code>python app.py</code>) est rejeté avec l'erreur <code>EXECSTART_RELATIF</code>.<br>
2. <code>Description</code> doit être non vide (sinon <code>DESCRIPTION_MANQUANTE</code>).<br>
3. <code>WantedBy</code> dans la section <code>[Install]</code> doit référencer une cible valide (ex: <code>multi-user.target</code>). S'il est vide ou absent, erreur <code>WANTEDBY_MANQUANT</code>.<br><br>
Le script lit sur l'entrée standard des définitions au format :<br>
<code>SERVICE_DEF name=&lt;nom&gt; desc=&lt;texte&gt; exec_start=&lt;commande&gt; wanted_by=&lt;target&gt;</code>.<br><br>
Pour chaque service, afficher :<br>
<code>SERVICE_VALIDATION name={name} valid={OUI|NON} error={OK|motif_erreur}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : valider les directives de service Systemd
`,
    hints: [
      'Vérifier les critères dans l’ordre : Description non vide, ExecStart commençant par "/", WantedBy non vide.',
      'Dès qu’une règle est violée, valid=NON avec l’erreur correspondante.'
    ],
    examples: [
      {
        stdin: 'SERVICE_DEF name=api.service desc="Backend API" exec_start=/usr/bin/python3 wanted_by=multi-user.target',
        expected: 'SERVICE_VALIDATION name=api.service valid=OUI error=OK',
        note: 'Toutes les directives sont valides et le chemin d’exécutable est absolu.'
      }
    ],
    tests: [
      {
        label: 'Rejet d’un exécutable avec chemin relatif',
        stdin: 'SERVICE_DEF name=worker.service desc="Taches asynchrones" exec_start=node wanted_by=multi-user.target',
        expected: 'SERVICE_VALIDATION name=worker.service valid=NON error=EXECSTART_RELATIF'
      },
      {
        label: 'Rejet pour description manquante ou WantedBy manquant',
        stdin: 'SERVICE_DEF name=audit.service desc=NONE exec_start=/opt/bin/agent wanted_by=multi-user.target\nSERVICE_DEF name=cron_job.service desc="Tache planifiee" exec_start=/bin/bash wanted_by=NONE',
        expected: 'SERVICE_VALIDATION name=audit.service valid=NON error=DESCRIPTION_MANQUANTE\nSERVICE_VALIDATION name=cron_job.service valid=NON error=WANTEDBY_MANQUANT'
      },
      {
        label: 'Service complexe valide avec arguments',
        stdin: 'SERVICE_DEF name=nginx.service desc="Serveur Web Nginx" exec_start=/usr/sbin/nginx wanted_by=multi-user.target',
        expected: 'SERVICE_VALIDATION name=nginx.service valid=OUI error=OK'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    if not lig.startswith('SERVICE_DEF'):
        continue
    tokens = lig.split()
    params = {}
    for tok in tokens[1:]:
        if '=' in tok:
            k, v = tok.split('=', 1)
            params[k] = v.strip('"')
            
    name = params.get('name', 'service')
    desc = params.get('desc', 'NONE')
    exec_start = params.get('exec_start', '')
    wanted_by = params.get('wanted_by', 'NONE')
    
    if not desc or desc == 'NONE':
        print(f"SERVICE_VALIDATION name={name} valid=NON error=DESCRIPTION_MANQUANTE")
    elif not exec_start.startswith('/'):
        print(f"SERVICE_VALIDATION name={name} valid=NON error=EXECSTART_RELATIF")
    elif not wanted_by or wanted_by == 'NONE':
        print(f"SERVICE_VALIDATION name={name} valid=NON error=WANTEDBY_MANQUANT")
    else:
        print(f"SERVICE_VALIDATION name={name} valid=OUI error=OK")
`
  },
  {
    id: 'lx3-c2-e2',
    chapter: 2,
    title: 'Résolveur de dépendances et détection de cycles Systemd',
    level: 'n2',
    language: 'python',
    goal: 'Analyser le graphe de dépendances d’unités et détecter les dépendances circulaires bloquantes (deadlocks).',
    brief: `<p>Systemd gère les dépendances entre unités via les directives <code>Requires=</code> (dépendance forte) et <code>Wants=</code> (dépendance faible). Si deux unités se requièrent mutuellement de manière circulaire, Systemd rencontre une dépendance cyclique et doit casser le lien ou échouer le démarrage.<br><br>
Le script lit sur l'entrée standard des déclarations de dépendances strictes :<br>
<code>UNIT_DEP name=&lt;nom&gt; requires=&lt;cible|NONE&gt;</code>.<br><br>
Règles :<br>
1. Auto-dépendance (A requiert A) : <code>cycle=OUI reason=AUTO_DEPENDANCE</code>.<br>
2. Cycle direct à deux unités (A requiert B et B requiert A) : <code>cycle=OUI reason=CYCLE_DIRECT</code>.<br>
3. Dépendance saine ou sans dépendance (NONE) : <code>cycle=NON reason=OK</code>.<br><br>
Pour chaque unité, afficher :<br>
<code>DEP_CHECK unit={name} cycle={OUI|NON} reason={OK|motif}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : construire le graphe et détecter les cycles Systemd
`,
    hints: [
      'Stocker l’association {nom: requires} dans un dictionnaire.',
      'Vérifier si requires == nom (auto-dépendance).',
      'Vérifier si target a pour requires le nom courant (cycle à deux).'
    ],
    examples: [
      {
        stdin: 'UNIT_DEP name=db.service requires=NONE\nUNIT_DEP name=web.service requires=db.service',
        expected: 'DEP_CHECK unit=db.service cycle=NON reason=OK\nDEP_CHECK unit=web.service cycle=NON reason=OK',
        note: 'Arborescence linéaire saine sans boucle.'
      }
    ],
    tests: [
      {
        label: 'Détection d’auto-dépendance',
        stdin: 'UNIT_DEP name=loop.service requires=loop.service',
        expected: 'DEP_CHECK unit=loop.service cycle=OUI reason=AUTO_DEPENDANCE'
      },
      {
        label: 'Détection de cycle direct croisé entre deux services',
        stdin: 'UNIT_DEP name=alpha.service requires=beta.service\nUNIT_DEP name=beta.service requires=alpha.service',
        expected: 'DEP_CHECK unit=alpha.service cycle=OUI reason=CYCLE_DIRECT\nDEP_CHECK unit=beta.service cycle=OUI reason=CYCLE_DIRECT'
      },
      {
        label: 'Chaîne saine à trois unités',
        stdin: 'UNIT_DEP name=redis.service requires=network.target\nUNIT_DEP name=network.target requires=NONE\nUNIT_DEP name=app.service requires=redis.service',
        expected: 'DEP_CHECK unit=redis.service cycle=NON reason=OK\nDEP_CHECK unit=network.target cycle=NON reason=OK\nDEP_CHECK unit=app.service cycle=NON reason=OK'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

graph = {}
order = []

for lig in lignes:
    if not lig.startswith('UNIT_DEP'):
        continue
    tokens = lig.split()
    params = {}
    for tok in tokens[1:]:
        if '=' in tok:
            k, v = tok.split('=', 1)
            params[k] = v
            
    name = params.get('name', '')
    req = params.get('requires', 'NONE')
    graph[name] = req
    order.append(name)

for u in order:
    req = graph.get(u, 'NONE')
    if req == u:
        print(f"DEP_CHECK unit={u} cycle=OUI reason=AUTO_DEPENDANCE")
    elif req in graph and graph[req] == u:
        print(f"DEP_CHECK unit={u} cycle=OUI reason=CYCLE_DIRECT")
    else:
        print(f"DEP_CHECK unit={u} cycle=NON reason=OK")
`
  },
  {
    id: 'lx3-c2-e3',
    chapter: 2,
    title: 'Parseur et filtreur d’événements Systemd Journald',
    level: 'n3',
    language: 'python',
    goal: 'Classer les journaux binaires Systemd Journald selon les priorités Syslog RFC 5424 et isoler les incidents critiques.',
    brief: `<p>Le démon <code>systemd-journald</code> centralise les logs du noyau, des services et de l'espace utilisateur dans un format binaire structuré indexé.<br><br>
Le script lit sur l'entrée standard des événements Journald au format :<br>
<code>JOURNAL id=&lt;id&gt; priority=&lt;0..7&gt; unit=&lt;service&gt; msg=&lt;message&gt;</code>.<br><br>
Échelle de sévérité Syslog (RFC 5424) :<br>
- 0 : <code>EMERGENCY</code><br>
- 1 : <code>ALERT</code><br>
- 2 : <code>CRITICAL</code><br>
- 3 : <code>ERROR</code><br>
- 4 : <code>WARNING</code><br>
- 5 : <code>NOTICE</code><br>
- 6 : <code>INFO</code><br>
- 7 : <code>DEBUG</code><br><br>
Critère d'alerte : si <code>priority &le; 3</code>, l'événement est considéré comme critique (<code>SEVERITY_ALERT=OUI</code>), sinon (<code>SEVERITY_ALERT=NON</code>).<br><br>
Pour chaque log, afficher :<br>
<code>JOURNAL_AUDIT id={id} unit={unit} level={LABEL} alert={SEVERITY_ALERT}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : décoder et filtrer les événements journald
`,
    hints: [
      'Utiliser une table de correspondance associant les entiers 0..7 à leur libellé.',
      'Comparer la priorité numérique pour déterminer le statut d’alerte.'
    ],
    examples: [
      {
        stdin: 'JOURNAL id=1 priority=6 unit=sshd.service msg="Server listening on port 22"',
        expected: 'JOURNAL_AUDIT id=1 unit=sshd.service level=INFO alert=NON',
        note: 'Priorité 6 (INFO), événement informatif standard.'
      }
    ],
    tests: [
      {
        label: 'Logs d’urgence et d’erreur critique (priority <= 3)',
        stdin: 'JOURNAL id=10 priority=0 unit=kernel msg="Kernel panic - not syncing"\nJOURNAL id=11 priority=3 unit=postgresql.service msg="Fatal connection error"',
        expected: 'JOURNAL_AUDIT id=10 unit=kernel level=EMERGENCY alert=OUI\nJOURNAL_AUDIT id=11 unit=postgresql.service level=ERROR alert=OUI'
      },
      {
        label: 'Avertissement et notification standard',
        stdin: 'JOURNAL id=20 priority=4 unit=diskmon.service msg="Disk usage above 80%"\nJOURNAL id=21 priority=5 unit=systemd msg="Started Apache Web Server"',
        expected: 'JOURNAL_AUDIT id=20 unit=diskmon.service level=WARNING alert=NON\nJOURNAL_AUDIT id=21 unit=systemd level=NOTICE alert=NON'
      },
      {
        label: 'Log de débogage (DEBUG)',
        stdin: 'JOURNAL id=30 priority=7 unit=app.service msg="Trace variable x=42"',
        expected: 'JOURNAL_AUDIT id=30 unit=app.service level=DEBUG alert=NON'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

LEVEL_MAP = {
    0: 'EMERGENCY',
    1: 'ALERT',
    2: 'CRITICAL',
    3: 'ERROR',
    4: 'WARNING',
    5: 'NOTICE',
    6: 'INFO',
    7: 'DEBUG'
}

for lig in lignes:
    if not lig.startswith('JOURNAL'):
        continue
    tokens = lig.split()
    params = {}
    for tok in tokens[1:]:
        if '=' in tok:
            k, v = tok.split('=', 1)
            params[k] = v.strip('"')
            
    jid = params.get('id', '0')
    prio = int(params.get('priority', 6))
    unit = params.get('unit', 'system')
    
    label = LEVEL_MAP.get(prio, 'INFO')
    alert = 'OUI' if prio <= 3 else 'NON'
    
    print(f"JOURNAL_AUDIT id={jid} unit={unit} level={label} alert={alert}")
`
  }
];
