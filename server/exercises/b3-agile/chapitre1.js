/**
 * Exercices Chapitre 1 — Méthodes Agiles B3.
 * Fondements de la Gestion de Projet : Du Cycle Prédictif au Manifeste Agile.
 */
'use strict';

module.exports = [
  {
    id: 'ag3-c1-e1',
    chapter: 1,
    title: 'Calculateur d’écart du Triangle de Fer (Périmètre, Coût, Délais)',
    level: 'n1',
    language: 'python',
    goal: 'Évaluer la dérive budgétaire et calendaire d’un projet traditionnel par rapport aux prévisions initiales.',
    brief: `<p>Le <strong>Triangle de Fer</strong> (ou triple contrainte) modélise l'équilibre fondamental de tout projet entre le <strong>périmètre (scope)</strong>, le <strong>coût (budget)</strong> et les <strong>délais (planning)</strong>.<br><br>
Le script lit sur l'entrée standard des lignes au format :<br>
<code>PROJECT_DELTA id=&lt;nom&gt; budget_spent=&lt;int&gt; budget_planned=&lt;int&gt; days_spent=&lt;int&gt; days_planned=&lt;int&gt;</code>.<br><br>
Règles de calcul :<br>
- <code>cost_variance_pct = round(((budget_spent - budget_planned) / budget_planned) * 100, 1)</code><br>
- <code>time_variance_pct = round(((days_spent - days_planned) / days_planned) * 100, 1)</code><br>
- Statut global :<br>
  - Si <code>cost_variance_pct &gt; 15.0 and time_variance_pct &gt; 15.0</code> : <code>status=CRITICAL</code><br>
  - Sinon si <code>cost_variance_pct &gt; 0.0 or time_variance_pct &gt; 0.0</code> : <code>status=OVERRUN</code><br>
  - Sinon : <code>status=ON_TRACK</code><br><br>
Pour chaque projet, afficher :<br>
<code>DELTA_REPORT id={id} cost_var={cost_variance_pct}% time_var={time_variance_pct}% status={status}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer les dérives de coût et de délai
`,
    hints: [
      'Calculer l’écart relatif en pourcentage avec ((réalisé - prévu) / prévu) * 100.',
      'Utiliser round(valeur, 1) pour formater à un chiffre après la virgule.',
      'Vérifier d’abord si les deux dépassements excèdent 15 % pour attribuer CRITICAL.'
    ],
    examples: [
      {
        stdin: 'PROJECT_DELTA id=PORTAIL budget_spent=120000 budget_planned=100000 days_spent=180 days_planned=150',
        expected: 'DELTA_REPORT id=PORTAIL cost_var=20.0% time_var=20.0% status=CRITICAL',
        note: 'Dépassement de 20% sur le budget et les délais : statut critique.'
      }
    ],
    tests: [
      {
        label: 'Projet parfaitement dans les clous ou en avance',
        stdin: 'PROJECT_DELTA id=CRM budget_spent=95000 budget_planned=100000 days_spent=120 days_planned=130',
        expected: 'DELTA_REPORT id=CRM cost_var=-5.0% time_var=-7.7% status=ON_TRACK'
      },
      {
        label: 'Dépassement modéré de budget uniquement (OVERRUN)',
        stdin: 'PROJECT_DELTA id=ERP budget_spent=105000 budget_planned=100000 days_spent=80 days_planned=80',
        expected: 'DELTA_REPORT id=ERP cost_var=5.0% time_var=0.0% status=OVERRUN'
      },
      {
        label: 'Dépassement critique simultané sur les deux axes',
        stdin: 'PROJECT_DELTA id=APP_MOBILE budget_spent=130000 budget_planned=100000 days_spent=120 days_planned=100',
        expected: 'DELTA_REPORT id=APP_MOBILE cost_var=30.0% time_var=20.0% status=CRITICAL'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    if not lig.startswith('PROJECT_DELTA'):
        continue
    tokens = lig.split()
    params = {}
    for tok in tokens[1:]:
        if '=' in tok:
            k, v = tok.split('=', 1)
            params[k] = v
            
    pid = params.get('id', 'PROJ')
    b_spent = float(params.get('budget_spent', 0))
    b_plan = float(params.get('budget_planned', 1))
    d_spent = float(params.get('days_spent', 0))
    d_plan = float(params.get('days_planned', 1))
    
    cost_var = round(((b_spent - b_plan) / b_plan) * 100, 1)
    time_var = round(((d_spent - d_plan) / d_plan) * 100, 1)
    
    if cost_var > 15.0 and time_var > 15.0:
        status = 'CRITICAL'
    elif cost_var > 0.0 or time_var > 0.0:
        status = 'OVERRUN'
    else:
        status = 'ON_TRACK'
        
    print(f"DELTA_REPORT id={pid} cost_var={cost_var}% time_var={time_var}% status={status}")
`
  },
  {
    id: 'ag3-c1-e2',
    chapter: 1,
    title: 'Calculateur de dates au plus tôt et durée totale d’un graphe PERT',
    level: 'n2',
    language: 'python',
    goal: 'Calculer la date de début au plus tôt (ES) et la fin au plus tôt (EF) de tâches ordonnancées dans un graphe PERT.',
    brief: `<p>La méthode <strong>PERT (Program Evaluation and Review Technique)</strong> modélise le réseau de dépendances d'un projet traditionnel sous forme de graphe orienté sans cycle (DAG).<br><br>
Chaque tâche possède une durée (<code>dur</code>) et d'éventuels prédécesseurs immédiats (<code>preds</code>).<br>
- Date de début au plus tôt (Early Start - ES) : <code>ES = max(EF des prédécesseurs)</code> (ou <code>0</code> si aucun prédécesseur).<br>
- Date de fin au plus tôt (Early Finish - EF) : <code>EF = ES + dur</code>.<br><br>
Le script lit sur l'entrée standard des tâches au format :<br>
<code>PERT_TASK id=&lt;nom&gt; dur=&lt;int&gt; preds=&lt;NONE|pred1,pred2,...&gt;</code>.<br>
(Les tâches sont fournies dans l'ordre topologique).<br><br>
Pour chaque tâche, afficher :<br>
<code>PERT_NODE id={id} es={es} ef={ef} dur={dur}</code><br><br>
En fin de script, afficher la durée minimale incompressible du projet :<br>
<code>PROJECT_SPAN duration={max_ef}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer les dates ES/EF et la durée totale du projet
`,
    hints: [
      'Gérer un dictionnaire ef_map associant l’identifiant de chaque tâche à sa date EF.',
      'Si preds == "NONE", ES vaut 0.',
      'Sinon, ES vaut le maximum des EF des tâches prédécesseurs référencées.'
    ],
    examples: [
      {
        stdin: 'PERT_TASK id=A dur=5 preds=NONE\nPERT_TASK id=B dur=3 preds=A',
        expected: 'PERT_NODE id=A es=0 ef=5 dur=5\nPERT_NODE id=B es=5 ef=8 dur=3\nPROJECT_SPAN duration=8',
        note: 'Tâche A (0..5) puis tâche B (5..8), durée globale = 8 jours.'
      }
    ],
    tests: [
      {
        label: 'Chemins divergents puis convergents',
        stdin: 'PERT_TASK id=A dur=4 preds=NONE\nPERT_TASK id=B dur=6 preds=A\nPERT_TASK id=C dur=2 preds=A\nPERT_TASK id=D dur=5 preds=B,C',
        expected: 'PERT_NODE id=A es=0 ef=4 dur=4\nPERT_NODE id=B es=4 ef=10 dur=6\nPERT_NODE id=C es=4 ef=6 dur=2\nPERT_NODE id=D es=10 ef=15 dur=5\nPROJECT_SPAN duration=15'
      },
      {
        label: 'Tâches parallèles démarrant à zéro',
        stdin: 'PERT_TASK id=T1 dur=10 preds=NONE\nPERT_TASK id=T2 dur=12 preds=NONE\nPERT_TASK id=T3 dur=4 preds=T1,T2',
        expected: 'PERT_NODE id=T1 es=0 ef=10 dur=10\nPERT_NODE id=T2 es=0 ef=12 dur=12\nPERT_NODE id=T3 es=12 ef=16 dur=4\nPROJECT_SPAN duration=16'
      },
      {
        label: 'Chaîne séquentielle simple',
        stdin: 'PERT_TASK id=X dur=3 preds=NONE\nPERT_TASK id=Y dur=7 preds=X\nPERT_TASK id=Z dur=2 preds=Y',
        expected: 'PERT_NODE id=X es=0 ef=3 dur=3\nPERT_NODE id=Y es=3 ef=10 dur=7\nPERT_NODE id=Z es=10 ef=12 dur=2\nPROJECT_SPAN duration=12'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

ef_map = {}
max_ef = 0

for lig in lignes:
    if not lig.startswith('PERT_TASK'):
        continue
    tokens = lig.split()
    params = {}
    for tok in tokens[1:]:
        if '=' in tok:
            k, v = tok.split('=', 1)
            params[k] = v
            
    tid = params.get('id', 'T')
    dur = int(params.get('dur', 0))
    preds_str = params.get('preds', 'NONE')
    
    if preds_str == 'NONE' or not preds_str:
        es = 0
    else:
        pred_list = [p.strip() for p in preds_str.split(',') if p.strip()]
        es = max(ef_map.get(p, 0) for p in pred_list)
        
    ef = es + dur
    ef_map[tid] = ef
    if ef > max_ef:
        max_ef = ef
        
    print(f"PERT_NODE id={tid} es={es} ef={ef} dur={dur}")

print(f"PROJECT_SPAN duration={max_ef}")
`
  },
  {
    id: 'ag3-c1-e3',
    chapter: 1,
    title: 'Classificateur d’adéquation méthodologique (Waterfall vs Agile vs Hybride)',
    level: 'n3',
    language: 'python',
    goal: 'Orienter un projet vers le bon modèle d’organisation selon le niveau d’incertitude et les contraintes réglementaires.',
    brief: `<p>Le choix d'une démarche de gestion de projet (Cycle en cascade / Waterfall, Cycle en V, Scrum, Kanban, ou Hybride) découle de facteurs objectifs d'incertitude et de contraintes métier.<br><br>
Le script lit sur l'entrée standard des descriptions de projets au format :<br>
<code>PROJECT_FIT id=&lt;nom&gt; req_stability=&lt;HIGH|LOW&gt; innov_rate=&lt;HIGH|LOW&gt; reg_constraint=&lt;STRICT|FLEX&gt; user_feedback=&lt;FREQUENT|RARE&gt;</code>.<br><br>
Matrice décisionnelle :<br>
- Si <code>reg_constraint == 'STRICT' and req_stability == 'HIGH' and innov_rate == 'LOW'</code> :<br>
  <code>approach=WATERFALL rationale=PREDICTIVE_STABILITY</code><br>
- Si <code>reg_constraint == 'FLEX' and req_stability == 'LOW' and innov_rate == 'HIGH' and user_feedback == 'FREQUENT'</code> :<br>
  <code>approach=AGILE rationale=EMPIRICAL_ADAPTABILITY</code><br>
- Sinon (exigences mixtes, contraintes fortes avec besoin d'itérations, etc.) :<br>
  <code>approach=HYBRID rationale=GOVERNANCE_WITH_ITERATIONS</code><br><br>
Pour chaque ligne, afficher :<br>
<code>FIT_RESULT id={id} approach={approach} rationale={rationale}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : classifier l'approche méthodologique recommandée
`,
    hints: [
      'Comparer les paramètres textuels avec les conditions de la matrice.',
      'Tester d’abord la condition stricte Waterfall, puis la condition stricte Agile (reg_constraint == "FLEX"), et affecter Hybride par défaut.'
    ],
    examples: [
      {
        stdin: 'PROJECT_FIT id=FERROVIAIRE req_stability=HIGH innov_rate=LOW reg_constraint=STRICT user_feedback=RARE',
        expected: 'FIT_RESULT id=FERROVIAIRE approach=WATERFALL rationale=PREDICTIVE_STABILITY',
        note: 'Projet à contraintes réglementaires critiques et exigences figées : Waterfall prédictif.'
      }
    ],
    tests: [
      {
        label: 'Startup web en forte innovation avec feedback régulier',
        stdin: 'PROJECT_FIT id=FINTECH_APP req_stability=LOW innov_rate=HIGH reg_constraint=FLEX user_feedback=FREQUENT',
        expected: 'FIT_RESULT id=FINTECH_APP approach=AGILE rationale=EMPIRICAL_ADAPTABILITY'
      },
      {
        label: 'Projet bancaire mixte nécessitant cadrage global et sprints de livraison',
        stdin: 'PROJECT_FIT id=BANQUE_CORE req_stability=LOW innov_rate=HIGH reg_constraint=STRICT user_feedback=FREQUENT',
        expected: 'FIT_RESULT id=BANQUE_CORE approach=HYBRID rationale=GOVERNANCE_WITH_ITERATIONS'
      },
      {
        label: 'Migration d’infrastructure réseau classique',
        stdin: 'PROJECT_FIT id=INFRA_MIG req_stability=HIGH innov_rate=LOW reg_constraint=STRICT user_feedback=RARE',
        expected: 'FIT_RESULT id=INFRA_MIG approach=WATERFALL rationale=PREDICTIVE_STABILITY'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    if not lig.startswith('PROJECT_FIT'):
        continue
    tokens = lig.split()
    params = {}
    for tok in tokens[1:]:
        if '=' in tok:
            k, v = tok.split('=', 1)
            params[k] = v
            
    pid = params.get('id', 'PROJ')
    req_s = params.get('req_stability', 'HIGH')
    innov = params.get('innov_rate', 'LOW')
    reg = params.get('reg_constraint', 'FLEX')
    feed = params.get('user_feedback', 'RARE')
    
    if reg == 'STRICT' and req_s == 'HIGH' and innov == 'LOW':
        approach = 'WATERFALL'
        rationale = 'PREDICTIVE_STABILITY'
    elif reg == 'FLEX' and req_s == 'LOW' and innov == 'HIGH' and feed == 'FREQUENT':
        approach = 'AGILE'
        rationale = 'EMPIRICAL_ADAPTABILITY'
    else:
        approach = 'HYBRID'
        rationale = 'GOVERNANCE_WITH_ITERATIONS'
        
    print(f"FIT_RESULT id={pid} approach={approach} rationale={rationale}")
`
  }
];
