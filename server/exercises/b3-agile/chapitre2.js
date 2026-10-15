/**
 * Exercices Chapitre 2 — Méthodes Agiles B3.
 * Le Cadre Scrum : Rôles, Artefacts & Cérémonies.
 */
'use strict';

module.exports = [
  {
    id: 'ag3-c2-e1',
    chapter: 2,
    title: 'Validateur d’incrément de produit et Definition of Done (DoD)',
    level: 'n1',
    language: 'python',
    goal: 'Vérifier la conformité d’une User Story aux critères stricts de la Definition of Done avant livraison.',
    brief: `<p>Dans le cadre Scrum, un incrément ne peut être considéré comme terminé que s'il satisfait l'intégralité des critères de la <strong>Definition of Done (DoD)</strong> convenue par l'équipe.<br><br>
Le script lit sur l'entrée standard des vérifications au format :<br>
<code>DOD_CHECK item=&lt;nom&gt; tests=&lt;PASS|FAIL&gt; review=&lt;PASS|FAIL&gt; doc=&lt;PASS|FAIL&gt; staging=&lt;PASS|FAIL&gt;</code>.<br><br>
Règles :<br>
- Si tous les 4 critères sont <code>PASS</code> : <code>status=POTENTIALLY_SHIPPABLE missing=NONE</code><br>
- Sinon : <code>status=REJECTED</code> et <code>missing=&lt;critères_en_échec_séparés_par_virgule&gt;</code> (dans l'ordre : tests, review, doc, staging).<br><br>
Pour chaque ligne, afficher :<br>
<code>DOD_EVAL item={item} status={status} missing={missing}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : auditer la conformité à la Definition of Done
`,
    hints: [
      'Constituer une liste des critères qui valent FAIL.',
      'Si la liste est vide, status vaut POTENTIALLY_SHIPPABLE et missing vaut NONE.',
      'Sinon, joindre les noms des critères avec une virgule.'
    ],
    examples: [
      {
        stdin: 'DOD_CHECK item=US-101 tests=PASS review=PASS doc=PASS staging=PASS',
        expected: 'DOD_EVAL item=US-101 status=POTENTIALLY_SHIPPABLE missing=NONE',
        note: 'Tous les critères sont validés : incrément livrable.'
      }
    ],
    tests: [
      {
        label: 'Documentation et déploiement staging manquants',
        stdin: 'DOD_CHECK item=US-202 tests=PASS review=PASS doc=FAIL staging=FAIL',
        expected: 'DOD_EVAL item=US-202 status=REJECTED missing=doc,staging'
      },
      {
        label: 'Échec des tests automatisés',
        stdin: 'DOD_CHECK item=US-303 tests=FAIL review=PASS doc=PASS staging=PASS',
        expected: 'DOD_EVAL item=US-303 status=REJECTED missing=tests'
      },
      {
        label: 'Tous les critères en échec',
        stdin: 'DOD_CHECK item=US-404 tests=FAIL review=FAIL doc=FAIL staging=FAIL',
        expected: 'DOD_EVAL item=US-404 status=REJECTED missing=tests,review,doc,staging'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    if not lig.startswith('DOD_CHECK'):
        continue
    tokens = lig.split()
    params = {}
    for tok in tokens[1:]:
        if '=' in tok:
            k, v = tok.split('=', 1)
            params[k] = v
            
    item = params.get('item', 'US')
    c_tests = params.get('tests', 'FAIL')
    c_rev = params.get('review', 'FAIL')
    c_doc = params.get('doc', 'FAIL')
    c_stg = params.get('staging', 'FAIL')
    
    missing = []
    if c_tests != 'PASS':
        missing.append('tests')
    if c_rev != 'PASS':
        missing.append('review')
    if c_doc != 'PASS':
        missing.append('doc')
    if c_stg != 'PASS':
        missing.append('staging')
        
    if not missing:
        status = 'POTENTIALLY_SHIPPABLE'
        m_str = 'NONE'
    else:
        status = 'REJECTED'
        m_str = ','.join(missing)
        
    print(f"DOD_EVAL item={item} status={status} missing={m_str}")
`
  },
  {
    id: 'ag3-c2-e2',
    chapter: 2,
    title: 'Ordonnanceur de Product Backlog par ROI et Réduction de Risque',
    level: 'n2',
    language: 'python',
    goal: 'Classer les éléments du Product Backlog selon un ratio pondéré Valeur Métier / Effort de développement.',
    brief: `<p>Le <strong>Product Owner</strong> priorise continuellement le Product Backlog afin de maximiser le retour sur investissement (ROI) délivré aux utilisateurs à chaque Sprint.<br><br>
Le script lit sur l'entrée standard des éléments de backlog au format :<br>
<code>BACKLOG_ITEM id=&lt;nom&gt; value=&lt;int&gt; risk_bonus=&lt;int&gt; effort=&lt;int&gt;</code>.<br><br>
Calcul du score de priorité :<br>
- <code>score = round((value + risk_bonus) / effort, 2)</code><br><br>
Ordonnancement :<br>
Trier les éléments par <strong>score décroissant</strong>. En cas d'égalité stricte de score, trier par ordre alphabétique de l'identifiant <code>id</code>.<br><br>
Afficher pour chaque élément ordonné :<br>
<code>RANK rank={rang_1_based} id={id} score={score} effort={effort}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer le score de priorité et trier le backlog
`,
    hints: [
      'Calculer le score avec float(value + risk_bonus) / float(effort).',
      'Trier la liste avec la clé lambda x: (-x["score"], x["id"]).'
    ],
    examples: [
      {
        stdin: 'BACKLOG_ITEM id=US-LOGIN value=80 risk_bonus=20 effort=5\nBACKLOG_ITEM id=US-PAYMENT value=100 risk_bonus=50 effort=10',
        expected: 'RANK rank=1 id=US-LOGIN score=20.0 effort=5\nRANK rank=2 id=US-PAYMENT score=15.0 effort=10',
        note: 'US-LOGIN : score (80+20)/5 = 20.0 > US-PAYMENT (100+50)/10 = 15.0.'
      }
    ],
    tests: [
      {
        label: 'Trois éléments avec égalité départagée par l’identifiant',
        stdin: 'BACKLOG_ITEM id=US-EXPORT value=40 risk_bonus=10 effort=5\nBACKLOG_ITEM id=US-DASHBOARD value=40 risk_bonus=10 effort=5\nBACKLOG_ITEM id=US-AUTH value=90 risk_bonus=10 effort=5',
        expected: 'RANK rank=1 id=US-AUTH score=20.0 effort=5\nRANK rank=2 id=US-DASHBOARD score=10.0 effort=5\nRANK rank=3 id=US-EXPORT score=10.0 effort=5'
      },
      {
        label: 'Tâches techniques de réduction de dette',
        stdin: 'BACKLOG_ITEM id=TECH-CACHE value=20 risk_bonus=80 effort=8\nBACKLOG_ITEM id=UI-THEME value=30 risk_bonus=0 effort=6',
        expected: 'RANK rank=1 id=TECH-CACHE score=12.5 effort=8\nRANK rank=2 id=UI-THEME score=5.0 effort=6'
      },
      {
        label: 'Liste à élément unique',
        stdin: 'BACKLOG_ITEM id=SINGLE-ITEM value=100 risk_bonus=20 effort=3',
        expected: 'RANK rank=1 id=SINGLE-ITEM score=40.0 effort=3'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

items = []
for lig in lignes:
    if not lig.startswith('BACKLOG_ITEM'):
        continue
    tokens = lig.split()
    params = {}
    for tok in tokens[1:]:
        if '=' in tok:
            k, v = tok.split('=', 1)
            params[k] = v
            
    pid = params.get('id', 'US')
    val = float(params.get('value', 0))
    risk = float(params.get('risk_bonus', 0))
    eff = float(params.get('effort', 1))
    
    score = round((val + risk) / eff, 2)
    items.append({
        'id': pid,
        'score': score,
        'effort': int(eff)
    })

items.sort(key=lambda x: (-x['score'], x['id']))

for idx, it in enumerate(items, 1):
    print(f"RANK rank={idx} id={it['id']} score={it['score']} effort={it['effort']}")
`
  },
  {
    id: 'ag3-c2-e3',
    chapter: 2,
    title: 'Contrôleur de Timeboxing des événements Scrum selon le Scrum Guide',
    level: 'n3',
    language: 'python',
    goal: 'Vérifier la stricte conformité de la durée des réunions Scrum par rapport aux limites temporelles maximales officielles.',
    brief: `<p>Le <strong>Scrum Guide</strong> définit des boîtes de temps (timeboxes) maximales proportionnelles à la durée du Sprint (pour un Sprint de référence de 4 semaines, réduit proportionnellement pour 2 semaines) :<br>
- <code>DAILY</code> (Daily Scrum) : <strong>15 minutes maximum</strong>, quelle que soit la durée du sprint.<br>
- <code>PLANNING</code> (Sprint Planning) : <strong>2 heures par semaine de sprint</strong> (ex: 4h pour 2 sem, 8h pour 4 sem).<br>
- <code>REVIEW</code> (Sprint Review) : <strong>1 heure par semaine de sprint</strong> (ex: 2h pour 2 sem, 4h pour 4 sem).<br>
- <code>RETRO</code> (Sprint Retrospective) : <strong>45 minutes par semaine de sprint</strong> (ex: 90 min pour 2 sem, 180 min pour 4 sem).<br><br>
Le script lit sur l'entrée standard des événements au format :<br>
<code>CEREMONY type=&lt;DAILY|PLANNING|REVIEW|RETRO&gt; sprint_weeks=&lt;int&gt; actual_min=&lt;int&gt;</code>.<br><br>
Règles :<br>
- Calculer <code>allowed_min</code> selon le type et <code>sprint_weeks</code>.<br>
- Si <code>actual_min &lt;= allowed_min</code> : <code>status=COMPLIANT delta=0</code>.<br>
- Si <code>actual_min &gt; allowed_min</code> : <code>status=TIMEBOX_BREACH delta={actual_min - allowed_min}</code>.<br><br>
Pour chaque ligne, afficher :<br>
<code>TIMEBOX_AUDIT type={type} actual={actual_min}m max={allowed_min}m status={status} delta={delta}m</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : contrôler le respect des timeboxes Scrum
`,
    hints: [
      'Pour DAILY, max vaut toujours 15 minutes.',
      'Pour PLANNING, max vaut 120 * sprint_weeks.',
      'Pour REVIEW, max vaut 60 * sprint_weeks.',
      'Pour RETRO, max vaut 45 * sprint_weeks.'
    ],
    examples: [
      {
        stdin: 'CEREMONY type=DAILY sprint_weeks=2 actual_min=25',
        expected: 'TIMEBOX_AUDIT type=DAILY actual=25m max=15m status=TIMEBOX_BREACH delta=10m',
        note: 'Daily de 25 minutes dépassant la limite stricte de 15 min de 10 minutes.'
      }
    ],
    tests: [
      {
        label: 'Planning conforme pour un sprint de deux semaines',
        stdin: 'CEREMONY type=PLANNING sprint_weeks=2 actual_min=210',
        expected: 'TIMEBOX_AUDIT type=PLANNING actual=210m max=240m status=COMPLIANT delta=0m'
      },
      {
        label: 'Rétrospective dépassant la limite autorisée',
        stdin: 'CEREMONY type=RETRO sprint_weeks=2 actual_min=110',
        expected: 'TIMEBOX_AUDIT type=RETRO actual=110m max=90m status=TIMEBOX_BREACH delta=20m'
      },
      {
        label: 'Revue de sprint conforme de 4 semaines',
        stdin: 'CEREMONY type=REVIEW sprint_weeks=4 actual_min=240',
        expected: 'TIMEBOX_AUDIT type=REVIEW actual=240m max=240m status=COMPLIANT delta=0m'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    if not lig.startswith('CEREMONY'):
        continue
    tokens = lig.split()
    params = {}
    for tok in tokens[1:]:
        if '=' in tok:
            k, v = tok.split('=', 1)
            params[k] = v
            
    c_type = params.get('type', 'DAILY')
    weeks = int(params.get('sprint_weeks', 2))
    actual = int(params.get('actual_min', 15))
    
    if c_type == 'DAILY':
        allowed = 15
    elif c_type == 'PLANNING':
        allowed = 120 * weeks
    elif c_type == 'REVIEW':
        allowed = 60 * weeks
    elif c_type == 'RETRO':
        allowed = 45 * weeks
    else:
        allowed = 60
        
    if actual <= allowed:
        status = 'COMPLIANT'
        delta = 0
    else:
        status = 'TIMEBOX_BREACH'
        delta = actual - allowed
        
    print(f"TIMEBOX_AUDIT type={c_type} actual={actual}m max={allowed}m status={status} delta={delta}m")
`
  }
];
