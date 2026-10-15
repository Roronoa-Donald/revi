/**
 * Exercices Chapitre 3 — Méthodes Agiles B3.
 * Kanban & Maîtrise des Flux : Visualisation, WIP & Métriques.
 */
'use strict';

module.exports = [
  {
    id: 'ag3-c3-e1',
    chapter: 3,
    title: 'Contrôleur de limites de travail en cours (WIP Limits)',
    level: 'n1',
    language: 'python',
    goal: 'Vérifier la stricte conformité des colonnes d’un tableau Kanban aux limites WIP pour éviter la surcharge cognitive.',
    brief: `<p>Le principe fondamental de la méthode Kanban est de <strong>limiter le travail en cours (WIP - Work In Progress)</strong> afin de favoriser l'écoulement continu (<em>« Stop starting, start finishing »</em>).<br><br>
Le script lit sur l'entrée standard des colonnes de tableau Kanban au format :<br>
<code>KANBAN_COL name=&lt;nom&gt; limit=&lt;int&gt; current=&lt;int&gt;</code>.<br><br>
Règles :<br>
- Si <code>current &gt; limit</code> : <code>status=OVER_WIP_ALERT delta=+{current - limit}</code> (alerte goulot/surcharge).<br>
- Si <code>current == limit</code> : <code>status=AT_CAPACITY delta=0</code>.<br>
- Si <code>current &lt; limit</code> : <code>status=AVAILABLE_SLOTS delta=-{limit - current}</code>.<br><br>
Pour chaque colonne, afficher :<br>
<code>WIP_REPORT col={name} current={current} limit={limit} status={status} delta={delta}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : contrôler les limites WIP de chaque colonne Kanban
`,
    hints: [
      'Comparer les entiers current et limit.',
      'Formater delta avec un signe "+" si current > limit, un signe "-" si current < limit, et 0 si égalité.'
    ],
    examples: [
      {
        stdin: 'KANBAN_COL name=IN_DEV limit=4 current=6',
        expected: 'WIP_REPORT col=IN_DEV current=6 limit=4 status=OVER_WIP_ALERT delta=+2',
        note: 'Dépassement de 2 cartes par rapport à la limite autorisée de 4.'
      }
    ],
    tests: [
      {
        label: 'Colonne exactement à pleine capacité',
        stdin: 'KANBAN_COL name=CODE_REVIEW limit=3 current=3',
        expected: 'WIP_REPORT col=CODE_REVIEW current=3 limit=3 status=AT_CAPACITY delta=0'
      },
      {
        label: 'Capacité disponible restante',
        stdin: 'KANBAN_COL name=TESTING limit=5 current=2',
        expected: 'WIP_REPORT col=TESTING current=2 limit=5 status=AVAILABLE_SLOTS delta=-3'
      },
      {
        label: 'Série de colonnes Kanban successives',
        stdin: 'KANBAN_COL name=ANALYSIS limit=2 current=1\nKANBAN_COL name=DEV limit=5 current=7\nKANBAN_COL name=DEPLOY limit=2 current=2',
        expected: 'WIP_REPORT col=ANALYSIS current=1 limit=2 status=AVAILABLE_SLOTS delta=-1\nWIP_REPORT col=DEV current=7 limit=5 status=OVER_WIP_ALERT delta=+2\nWIP_REPORT col=DEPLOY current=2 limit=2 status=AT_CAPACITY delta=0'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    if not lig.startswith('KANBAN_COL'):
        continue
    tokens = lig.split()
    params = {}
    for tok in tokens[1:]:
        if '=' in tok:
            k, v = tok.split('=', 1)
            params[k] = v
            
    col = params.get('name', 'COL')
    lim = int(params.get('limit', 1))
    cur = int(params.get('current', 0))
    
    if cur > lim:
        status = 'OVER_WIP_ALERT'
        delta = f"+{cur - lim}"
    elif cur == lim:
        status = 'AT_CAPACITY'
        delta = '0'
    else:
        status = 'AVAILABLE_SLOTS'
        delta = f"-{lim - cur}"
        
    print(f"WIP_REPORT col={col} current={cur} limit={lim} status={status} delta={delta}")
`
  },
  {
    id: 'ag3-c3-e2',
    chapter: 3,
    title: 'Calculateur de Lead Time, Cycle Time et Débit Moyen (Throughput)',
    level: 'n2',
    language: 'python',
    goal: 'Mesurer la performance d’écoulement d’un flux Kanban à travers le temps de traversée total et le temps de traitement actif.',
    brief: `<p>Dans les métriques Kanban et Lean :<br>
- <strong>Lead Time</strong> : Délai complet entre la demande du client (<code>t_created</code>) et la mise en production (<code>t_done</code>).<br>
  <code>lead_time = t_done - t_created</code>.<br>
- <strong>Cycle Time</strong> : Délai pendant lequel l'équipe a activement travaillé sur le ticket (<code>t_dev_start</code> à <code>t_done</code>).<br>
  <code>cycle_time = t_done - t_dev_start</code>.<br>
- <strong>Wait Time</strong> : Temps passé en attente dans le backlog avant prise en charge.<br>
  <code>wait_time = t_dev_start - t_created</code>.<br><br>
Le script lit sur l'entrée standard des tâches au format :<br>
<code>TASK_FLOW id=&lt;nom&gt; created=&lt;int&gt; started=&lt;int&gt; done=&lt;int&gt;</code>.<br><br>
Pour chaque tâche, afficher :<br>
<code>FLOW_METRICS id={id} lead_time={lt}d cycle_time={ct}d wait_time={wt}d</code><br><br>
En fin de script, afficher la moyenne du Cycle Time (arrondie à 1 décimale) :<br>
<code>AVERAGE_CYCLE_TIME mean={avg_ct}d</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer Lead Time, Cycle Time, Wait Time et moyenne
`,
    hints: [
      'Calculer lead_time = done - created, cycle_time = done - started, wait_time = started - created.',
      'Accumuler la somme des cycle_time et diviser par le nombre de tâches traitées.'
    ],
    examples: [
      {
        stdin: 'TASK_FLOW id=CARD-1 created=1 started=5 done=10',
        expected: 'FLOW_METRICS id=CARD-1 lead_time=9d cycle_time=5d wait_time=4d\nAVERAGE_CYCLE_TIME mean=5.0d',
        note: 'Lead time de 9 jours, Cycle time de 5 jours, Attente de 4 jours.'
      }
    ],
    tests: [
      {
        label: 'Trois tâches avec calcul de moyenne',
        stdin: 'TASK_FLOW id=C1 created=2 started=4 done=8\nTASK_FLOW id=C2 created=5 started=5 done=9\nTASK_FLOW id=C3 created=10 started=12 done=20',
        expected: 'FLOW_METRICS id=C1 lead_time=6d cycle_time=4d wait_time=2d\nFLOW_METRICS id=C2 lead_time=4d cycle_time=4d wait_time=0d\nFLOW_METRICS id=C3 lead_time=10d cycle_time=8d wait_time=2d\nAVERAGE_CYCLE_TIME mean=5.3d'
      },
      {
        label: 'Tâche prise en charge immédiatement sans attente',
        stdin: 'TASK_FLOW id=URGENT created=10 started=10 done=12',
        expected: 'FLOW_METRICS id=URGENT lead_time=2d cycle_time=2d wait_time=0d\nAVERAGE_CYCLE_TIME mean=2.0d'
      },
      {
        label: 'Longue période d’attente dans le backlog',
        stdin: 'TASK_FLOW id=BACKLOG_LONG created=1 started=30 done=35',
        expected: 'FLOW_METRICS id=BACKLOG_LONG lead_time=34d cycle_time=5d wait_time=29d\nAVERAGE_CYCLE_TIME mean=5.0d'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

ct_list = []

for lig in lignes:
    if not lig.startswith('TASK_FLOW'):
        continue
    tokens = lig.split()
    params = {}
    for tok in tokens[1:]:
        if '=' in tok:
            k, v = tok.split('=', 1)
            params[k] = v
            
    tid = params.get('id', 'CARD')
    t_c = int(params.get('created', 0))
    t_s = int(params.get('started', 0))
    t_d = int(params.get('done', 0))
    
    lt = t_d - t_c
    ct = t_d - t_s
    wt = t_s - t_c
    ct_list.append(ct)
    
    print(f"FLOW_METRICS id={tid} lead_time={lt}d cycle_time={ct}d wait_time={wt}d")

avg_ct = round(sum(ct_list) / len(ct_list), 1) if ct_list else 0.0
print(f"AVERAGE_CYCLE_TIME mean={avg_ct}d")
`
  },
  {
    id: 'ag3-c3-e3',
    chapter: 3,
    title: 'Simulateur de Loi de Little et Détection de Goulots d’Étranglement',
    level: 'n3',
    language: 'python',
    goal: 'Appliquer la Loi de Little (TH = WIP / CT) pour calculer le débit de chaque étape et identifier le goulot d’étranglement limitant le flux.',
    brief: `<p>D'après la <strong>Loi de Little</strong>, dans un système stable à l'équilibre :<br>
<code>WIP = Throughput &times; Cycle_Time</code>, soit <code>Throughput = WIP / Cycle_Time</code> (exprimé en unités par jour).<br><br>
Le script lit sur l'entrée standard les étapes d'une chaîne de valeur au format :<br>
<code>LITTLE_STAGE stage=&lt;nom&gt; wip=&lt;int&gt; avg_ct=&lt;float&gt;</code>.<br><br>
Calculs :<br>
- <code>throughput = round(wip / avg_ct, 2)</code><br><br>
Le <strong>goulot d'étranglement (bottleneck)</strong> de la chaîne est l'étape qui possède le <strong>débit (Throughput) minimal</strong>. C'est elle qui bride la cadence de l'ensemble du système.<br><br>
Pour chaque étape, afficher :<br>
<code>STAGE_RATE stage={stage} wip={wip} avg_ct={avg_ct} throughput={throughput} u/d</code><br><br>
En fin de script, afficher l'étape goulot identifiée et la cadence maximale du système :<br>
<code>SYSTEM_BOTTLENECK bottleneck={nom_goulot} system_max_throughput={min_th} u/d</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : appliquer la loi de Little et trouver le goulot
`,
    hints: [
      'Calculer throughput = round(wip / avg_ct, 2) pour chaque étape.',
      'Identifier l’étape qui a la valeur throughput la plus basse (ou premier en cas d’égalité).'
    ],
    examples: [
      {
        stdin: 'LITTLE_STAGE stage=SPEC wip=4 avg_ct=2.0\nLITTLE_STAGE stage=DEV wip=6 avg_ct=6.0\nLITTLE_STAGE stage=QA wip=2 avg_ct=1.0',
        expected: 'STAGE_RATE stage=SPEC wip=4 avg_ct=2.0 throughput=2.0 u/d\nSTAGE_RATE stage=DEV wip=6 avg_ct=6.0 throughput=1.0 u/d\nSTAGE_RATE stage=QA wip=2 avg_ct=1.0 throughput=2.0 u/d\nSYSTEM_BOTTLENECK bottleneck=DEV system_max_throughput=1.0 u/d',
        note: 'DEV a un débit de 1.0 unité/jour : c’est le goulot d’étranglement du système.'
      }
    ],
    tests: [
      {
        label: 'Goulot situé sur l’étape de test et recette',
        stdin: 'LITTLE_STAGE stage=CONCEPTION wip=5 avg_ct=1.5\nLITTLE_STAGE stage=CODE wip=10 avg_ct=3.0\nLITTLE_STAGE stage=TEST wip=2 avg_ct=4.0',
        expected: 'STAGE_RATE stage=CONCEPTION wip=5 avg_ct=1.5 throughput=3.33 u/d\nSTAGE_RATE stage=CODE wip=10 avg_ct=3.0 throughput=3.33 u/d\nSTAGE_RATE stage=TEST wip=2 avg_ct=4.0 throughput=0.5 u/d\nSYSTEM_BOTTLENECK bottleneck=TEST system_max_throughput=0.5 u/d'
      },
      {
        label: 'Deux étapes seulement',
        stdin: 'LITTLE_STAGE stage=DEV wip=8 avg_ct=2.0\nLITTLE_STAGE stage=REVIEW wip=2 avg_ct=2.0',
        expected: 'STAGE_RATE stage=DEV wip=8 avg_ct=2.0 throughput=4.0 u/d\nSTAGE_RATE stage=REVIEW wip=2 avg_ct=2.0 throughput=1.0 u/d\nSYSTEM_BOTTLENECK bottleneck=REVIEW system_max_throughput=1.0 u/d'
      },
      {
        label: 'Chaîne parfaitement équilibrée',
        stdin: 'LITTLE_STAGE stage=ETAPE_A wip=4 avg_ct=2.0\nLITTLE_STAGE stage=ETAPE_B wip=6 avg_ct=3.0',
        expected: 'STAGE_RATE stage=ETAPE_A wip=4 avg_ct=2.0 throughput=2.0 u/d\nSTAGE_RATE stage=ETAPE_B wip=6 avg_ct=3.0 throughput=2.0 u/d\nSYSTEM_BOTTLENECK bottleneck=ETAPE_A system_max_throughput=2.0 u/d'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

min_th = float('inf')
bottleneck_stage = ''

for lig in lignes:
    if not lig.startswith('LITTLE_STAGE'):
        continue
    tokens = lig.split()
    params = {}
    for tok in tokens[1:]:
        if '=' in tok:
            k, v = tok.split('=', 1)
            params[k] = v
            
    stg = params.get('stage', 'STAGE')
    wip = int(params.get('wip', 1))
    act = float(params.get('avg_ct', 1.0))
    
    th = round(wip / act, 2)
    print(f"STAGE_RATE stage={stg} wip={wip} avg_ct={act} throughput={th} u/d")
    
    if th < min_th:
        min_th = th
        bottleneck_stage = stg

print(f"SYSTEM_BOTTLENECK bottleneck={bottleneck_stage} system_max_throughput={min_th} u/d")
`
  }
];
