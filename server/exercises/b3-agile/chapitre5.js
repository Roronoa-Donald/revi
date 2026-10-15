/**
 * Exercices Chapitre 5 — Méthodes Agiles B3.
 * Planification de Release, Vélocité & Suivi de Projet (Burn-down / Burn-up).
 */
'use strict';

module.exports = [
  {
    id: 'ag3-c5-e1',
    chapter: 5,
    title: 'Calculateur de Vélocité moyenne et estimation d’atterrissage de Release',
    level: 'n1',
    language: 'python',
    goal: 'Calculer la vélocité moyenne d’une équipe sur les derniers sprints et estimer le nombre de sprints nécessaires pour terminer le backlog restant.',
    brief: `<p>La <strong>Vélocité</strong> mesure la quantité moyenne de Story Points achevés (conformes à la Definition of Done) par une équipe par Sprint.<br><br>
Le script lit sur l'entrée standard une commande au format :<br>
<code>RELEASE_PLAN history=&lt;s1,s2,s3,...&gt; backlog_pts=&lt;int&gt;</code>.<br><br>
Calculs :<br>
- <code>avg_velocity = round(sum(history) / len(history), 1)</code><br>
- Sprints restants requis : <code>sprints_needed = math.ceil(backlog_pts / avg_velocity)</code><br><br>
Afficher :<br>
<code>VELOCITY_REPORT history_count={n} avg_velocity={avg_velocity} remaining_pts={backlog_pts} sprints_needed={sprints_needed}</code></p>`,
    starter: `import sys
import math

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer la vélocité moyenne et les sprints requis
`,
    hints: [
      'Parser les points d’historique séparés par des virgules en entiers.',
      'Calculer avg_velocity = round(somme / nb, 1).',
      'Utiliser math.ceil(backlog / avg_velocity) pour arrondir au sprint supérieur entier.'
    ],
    examples: [
      {
        stdin: 'RELEASE_PLAN history=20,25,24 backlog_pts=60',
        expected: 'VELOCITY_REPORT history_count=3 avg_velocity=23.0 remaining_pts=60 sprints_needed=3',
        note: 'Vélocité moyenne = 69 / 3 = 23.0. 60 / 23 = 2.61 -> 3 sprints nécessaires.'
      }
    ],
    tests: [
      {
        label: 'Cinq sprints d’historique avec charge importante',
        stdin: 'RELEASE_PLAN history=30,32,28,34,31 backlog_pts=155',
        expected: 'VELOCITY_REPORT history_count=5 avg_velocity=31.0 remaining_pts=155 sprints_needed=5'
      },
      {
        label: 'Vélocité exactement multiple du backlog',
        stdin: 'RELEASE_PLAN history=20,20 backlog_pts=40',
        expected: 'VELOCITY_REPORT history_count=2 avg_velocity=20.0 remaining_pts=40 sprints_needed=2'
      },
      {
        label: 'Faible vélocité avec grand nombre de sprints requis',
        stdin: 'RELEASE_PLAN history=10,12,8 backlog_pts=85',
        expected: 'VELOCITY_REPORT history_count=3 avg_velocity=10.0 remaining_pts=85 sprints_needed=9'
      }
    ],
    solution: `import sys
import math

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    if not lig.startswith('RELEASE_PLAN'):
        continue
    tokens = lig.split()
    params = {}
    for tok in tokens[1:]:
        if '=' in tok:
            k, v = tok.split('=', 1)
            params[k] = v
            
    hist_raw = params.get('history', '10')
    backlog = int(params.get('backlog_pts', 0))
    hist = [int(x.strip()) for x in hist_raw.split(',') if x.strip()]
    
    avg_v = round(sum(hist) / len(hist), 1) if hist else 1.0
    sprints = math.ceil(backlog / avg_v) if avg_v > 0 else 0
    
    print(f"VELOCITY_REPORT history_count={len(hist)} avg_velocity={avg_v} remaining_pts={backlog} sprints_needed={sprints}")
`
  },
  {
    id: 'ag3-c5-e2',
    chapter: 5,
    title: 'Traceur de Sprint Burn-down et détection de Dérive de Périmètre (Scope Creep)',
    level: 'n2',
    language: 'python',
    goal: 'Analyser le reste à faire quotidien d’un Sprint, identifier le Scope Creep et évaluer l’avance ou le retard sur la trajectoire idéale.',
    brief: `<p>Le <strong>Sprint Burn-down chart</strong> trace jour après jour les Story Points restants par rapport à la pente idéale.<br><br>
Paramètres initiaux (Sprint de 10 jours ouvrés) :<br>
- <code>SPRINT_INIT initial_pts=&lt;int&gt; total_days=10</code>.<br>
Pente idéale quotidienne : <code>ideal_burn_per_day = initial_pts / 10.0</code>.<br>
Le reste idéal au jour <code>d</code> est <code>ideal_rem = round(initial_pts - (d * ideal_burn_per_day), 1)</code>.<br><br>
Pour chaque jour de relevé :<br>
<code>DAY_LOG day=&lt;int&gt; actual_rem=&lt;int&gt; added_pts=&lt;int&gt;</code>.<br><br>
Règles :<br>
- Si <code>added_pts &gt; 0</code> : <code>scope_creep=YES(+{added_pts}pts)</code>, sinon <code>scope_creep=NO</code>.<br>
- Si <code>actual_rem &gt; ideal_rem</code> : <code>trend=BEHIND</code>.<br>
- Si <code>actual_rem &lt;= ideal_rem</code> : <code>trend=ON_TRACK</code>.<br><br>
Pour chaque jour, afficher :<br>
<code>BURNDOWN_TRACK day={day} actual={actual_rem} ideal={ideal_rem} trend={trend} creep={scope_creep}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : analyser la trajectoire du Burn-down chart
`,
    hints: [
      'Récupérer initial_pts depuis la ligne SPRINT_INIT.',
      'Pour chaque jour d, ideal_rem = round(initial_pts - (d * (initial_pts / 10.0)), 1).'
    ],
    examples: [
      {
        stdin: 'SPRINT_INIT initial_pts=40 total_days=10\nDAY_LOG day=1 actual_rem=36 added_pts=0\nDAY_LOG day=2 actual_rem=34 added_pts=2',
        expected: 'BURNDOWN_TRACK day=1 actual=36 ideal=36.0 trend=ON_TRACK creep=NO\nBURNDOWN_TRACK day=2 actual=34 ideal=32.0 trend=BEHIND creep=YES(+2pts)',
        note: 'Jour 1 : 36 restant conforme à la ligne idéale 36.0. Jour 2 : 34 restant > idéal 32.0 avec ajout de 2 points.'
      }
    ],
    tests: [
      {
        label: 'Progression rapide en avance constante sur la ligne idéale',
        stdin: 'SPRINT_INIT initial_pts=50 total_days=10\nDAY_LOG day=3 actual_rem=30 added_pts=0\nDAY_LOG day=5 actual_rem=20 added_pts=0',
        expected: 'BURNDOWN_TRACK day=3 actual=30 ideal=35.0 trend=ON_TRACK creep=NO\nBURNDOWN_TRACK day=5 actual=20 ideal=25.0 trend=ON_TRACK creep=NO'
      },
      {
        label: 'Accumulation sévère de Scope Creep',
        stdin: 'SPRINT_INIT initial_pts=30 total_days=10\nDAY_LOG day=4 actual_rem=25 added_pts=5',
        expected: 'BURNDOWN_TRACK day=4 actual=25 ideal=18.0 trend=BEHIND creep=YES(+5pts)'
      },
      {
        label: 'Dernier jour du sprint avec achèvement complet',
        stdin: 'SPRINT_INIT initial_pts=20 total_days=10\nDAY_LOG day=10 actual_rem=0 added_pts=0',
        expected: 'BURNDOWN_TRACK day=10 actual=0 ideal=0.0 trend=ON_TRACK creep=NO'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

initial_pts = 0.0

for lig in lignes:
    if lig.startswith('SPRINT_INIT'):
        tokens = lig.split()
        for tok in tokens[1:]:
            if tok.startswith('initial_pts='):
                initial_pts = float(tok.split('=')[1])
        continue
        
    if not lig.startswith('DAY_LOG'):
        continue
        
    tokens = lig.split()
    params = {}
    for tok in tokens[1:]:
        if '=' in tok:
            k, v = tok.split('=', 1)
            params[k] = v
            
    day = int(params.get('day', 1))
    act = int(params.get('actual_rem', 0))
    add = int(params.get('added_pts', 0))
    
    ideal_rem = round(initial_pts - (day * (initial_pts / 10.0)), 1)
    creep = f"YES(+{add}pts)" if add > 0 else "NO"
    trend = "BEHIND" if act > ideal_rem else "ON_TRACK"
    
    print(f"BURNDOWN_TRACK day={day} actual={act} ideal={ideal_rem} trend={trend} creep={creep}")
`
  },
  {
    id: 'ag3-c5-e3',
    chapter: 5,
    title: 'Simulateur de Prévision Probabiliste de Release (Pessimiste, Médian, Optimiste)',
    level: 'n3',
    language: 'python',
    goal: 'Calculer la fourchette d’atterrissage d’une Release en intégrant les trois scénarios de vélocité de l’équipe.',
    brief: `<p>En gestion prévisionnelle agile, une date d'engagement unique est un anti-pattern. On modélise un cône d'incertitude à trois bornes :<br>
- <strong>Scénario Optimiste (Best case)</strong> : basé sur la vélocité maximale observée (<code>v_max</code>).<br>
- <strong>Scénario Médian (Expected case)</strong> : basé sur la vélocité médiane/moyenne (<code>v_med</code>).<br>
- <strong>Scénario Pessimiste (Worst case)</strong> : basé sur la vélocité minimale observée (<code>v_min</code>).<br><br>
Le script lit sur l'entrée standard des paramètres au format :<br>
<code>CONE_FORECAST release=&lt;nom&gt; backlog_pts=&lt;int&gt; v_min=&lt;int&gt; v_med=&lt;int&gt; v_max=&lt;int&gt;</code>.<br><br>
Calculs (en arrondissant chaque sprint nécessaire au plafond supérieur <code>math.ceil</code>) :<br>
- <code>sprints_best = math.ceil(backlog_pts / v_max)</code><br>
- <code>sprints_med = math.ceil(backlog_pts / v_med)</code><br>
- <code>sprints_worst = math.ceil(backlog_pts / v_min)</code><br><br>
Afficher :<br>
<code>FORECAST_RANGE release={release} best={sprints_best}sprints expected={sprints_med}sprints worst={sprints_worst}sprints spread={sprints_worst - sprints_best}sprints</code></p>`,
    starter: `import sys
import math

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer le cône d'incertitude de la Release
`,
    hints: [
      'Calculer les 3 valeurs avec math.ceil(backlog_pts / v).',
      'L’écart (spread) vaut sprints_worst - sprints_best.'
    ],
    examples: [
      {
        stdin: 'CONE_FORECAST release=V2.0 backlog_pts=100 v_min=15 v_med=22 v_max=30',
        expected: 'FORECAST_RANGE release=V2.0 best=4sprints expected=5sprints worst=7sprints spread=3sprints',
        note: 'Best: 100/30=4 sprints, Med: 100/22=5 sprints, Worst: 100/15=7 sprints. Spread: 7 - 4 = 3 sprints.'
      }
    ],
    tests: [
      {
        label: 'Vélocité stable avec faible dispersion',
        stdin: 'CONE_FORECAST release=PILOTE backlog_pts=60 v_min=18 v_med=20 v_max=22',
        expected: 'FORECAST_RANGE release=PILOTE best=3sprints expected=3sprints worst=4sprints spread=1sprints'
      },
      {
        label: 'Forte incertitude sur équipe nouvelle',
        stdin: 'CONE_FORECAST release=PROJET_X backlog_pts=120 v_min=10 v_med=25 v_max=40',
        expected: 'FORECAST_RANGE release=PROJET_X best=3sprints expected=5sprints worst=12sprints spread=9sprints'
      },
      {
        label: 'Petit backlog d’appoint',
        stdin: 'CONE_FORECAST release=HOTFIX_PACK backlog_pts=25 v_min=5 v_med=10 v_max=15',
        expected: 'FORECAST_RANGE release=HOTFIX_PACK best=2sprints expected=3sprints worst=5sprints spread=3sprints'
      }
    ],
    solution: `import sys
import math

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    if not lig.startswith('CONE_FORECAST'):
        continue
    tokens = lig.split()
    params = {}
    for tok in tokens[1:]:
        if '=' in tok:
            k, v = tok.split('=', 1)
            params[k] = v
            
    rel = params.get('release', 'REL')
    pts = int(params.get('backlog_pts', 1))
    vmin = int(params.get('v_min', 1))
    vmed = int(params.get('v_med', 1))
    vmax = int(params.get('v_max', 1))
    
    s_best = math.ceil(pts / vmax)
    s_med = math.ceil(pts / vmed)
    s_worst = math.ceil(pts / vmin)
    spread = s_worst - s_best
    
    print(f"FORECAST_RANGE release={rel} best={s_best}sprints expected={s_med}sprints worst={s_worst}sprints spread={spread}sprints")
`
  }
];
