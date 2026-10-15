/**
 * Exercices Chapitre 4 — Méthodes Agiles B3.
 * Spécification Agile & Estimation : User Stories, INVEST & Planning Poker.
 */
'use strict';

module.exports = [
  {
    id: 'ag3-c4-e1',
    chapter: 4,
    title: 'Validateur syntaxique de User Story et conformité INVEST',
    level: 'n1',
    language: 'python',
    goal: 'Vérifier la structure narrative formelle d’une User Story (En tant que, Je veux, Afin de) et la présence de critères d’acceptation.',
    brief: `<p>Une User Story bien formée suit le canevas de Mike Cohn : <em>« En tant que [persona], je veux [action], afin de [bénéfice métier] »</em>, complétée par des critères d'acceptation (Testable selon l'acronyme <strong>INVEST</strong>).<br><br>
Le script lit sur l'entrée standard des définitions de stories au format :<br>
<code>STORY_DEF id=&lt;nom&gt; persona=&lt;texte&gt; action=&lt;texte&gt; benefit=&lt;texte&gt; ac_count=&lt;int&gt;</code>.<br><br>
Règles de validation :<br>
1. <code>persona</code> ne doit pas valoir <code>NONE</code> ou être vide.<br>
2. <code>action</code> ne doit pas valoir <code>NONE</code> ou être vide.<br>
3. <code>benefit</code> ne doit pas valoir <code>NONE</code> ou être vide.<br>
4. Le nombre de critères d'acceptation (<code>ac_count</code>) doit être supérieur ou égal à 1 (garantissant la testabilité).<br><br>
Si toutes les conditions sont remplies : <code>status=VALID_STORY flaw=NONE</code>.<br>
Sinon : <code>status=INVALID_STORY</code> avec le premier défaut rencontré parmi : <code>MISSING_PERSONA</code>, <code>MISSING_ACTION</code>, <code>MISSING_BENEFIT</code>, <code>UNTESTABLE_ZERO_AC</code>.<br><br>
Pour chaque ligne, afficher :<br>
<code>STORY_AUDIT id={id} status={status} flaw={flaw}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : valider la structure de la User Story et le critère INVEST
`,
    hints: [
      'Tester dans l’ordre : persona == "NONE" ou vide, action == "NONE", benefit == "NONE", puis ac_count < 1.',
      'Afficher VALID_STORY si aucune erreur n’a été détectée.'
    ],
    examples: [
      {
        stdin: 'STORY_DEF id=US-1 persona=Client action=Payer_en_1_clic benefit=Gagner_du_temps ac_count=3',
        expected: 'STORY_AUDIT id=US-1 status=VALID_STORY flaw=NONE',
        note: 'User story complète avec 3 critères d’acceptation : valide.'
      }
    ],
    tests: [
      {
        label: 'Persona manquant ou non spécifié',
        stdin: 'STORY_DEF id=US-2 persona=NONE action=Exporter_PDF benefit=Archiver ac_count=2',
        expected: 'STORY_AUDIT id=US-2 status=INVALID_STORY flaw=MISSING_PERSONA'
      },
      {
        label: 'Aucun critère d’acceptation (non testable)',
        stdin: 'STORY_DEF id=US-3 persona=Admin action=Supprimer_compte benefit=Nettoyer_base ac_count=0',
        expected: 'STORY_AUDIT id=US-3 status=INVALID_STORY flaw=UNTESTABLE_ZERO_AC'
      },
      {
        label: 'Bénéfice métier absent',
        stdin: 'STORY_DEF id=US-4 persona=Acheteur action=Filtrer_prix benefit=NONE ac_count=1',
        expected: 'STORY_AUDIT id=US-4 status=INVALID_STORY flaw=MISSING_BENEFIT'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    if not lig.startswith('STORY_DEF'):
        continue
    tokens = lig.split()
    params = {}
    for tok in tokens[1:]:
        if '=' in tok:
            k, v = tok.split('=', 1)
            params[k] = v
            
    sid = params.get('id', 'US')
    p = params.get('persona', '')
    a = params.get('action', '')
    b = params.get('benefit', '')
    ac = int(params.get('ac_count', 0))
    
    if p == 'NONE' or not p:
        status = 'INVALID_STORY'
        flaw = 'MISSING_PERSONA'
    elif a == 'NONE' or not a:
        status = 'INVALID_STORY'
        flaw = 'MISSING_ACTION'
    elif b == 'NONE' or not b:
        status = 'INVALID_STORY'
        flaw = 'MISSING_BENEFIT'
    elif ac < 1:
        status = 'INVALID_STORY'
        flaw = 'UNTESTABLE_ZERO_AC'
    else:
        status = 'VALID_STORY'
        flaw = 'NONE'
        
    print(f"STORY_AUDIT id={sid} status={status} flaw={flaw}")
`
  },
  {
    id: 'ag3-c4-e2',
    chapter: 4,
    title: 'Consensus de Planning Poker et Suite de Fibonacci Modifiée',
    level: 'n2',
    language: 'python',
    goal: 'Analyser un tour de vote de Planning Poker, détecter la divergence et projeter l’estimation sur la suite de Fibonacci.',
    brief: `<p>Lors d'une session de <strong>Planning Poker</strong>, l'équipe estime l'effort relatif en Story Points selon la suite de Fibonacci modifiée standard : <code>[1, 2, 3, 5, 8, 13, 20, 40]</code>.<br><br>
Le script lit sur l'entrée standard des tours de vote au format :<br>
<code>POKER_VOTE id=&lt;nom&gt; votes=&lt;v1,v2,v3,...&gt;</code>.<br><br>
Règles d'évaluation :<br>
- <code>min_v = min(votes)</code>, <code>max_v = max(votes)</code>, <code>avg_v = sum(votes) / len(votes)</code>.<br>
- Si l'écart relatif <code>max_v - min_v &gt;= 8</code> ou si le ratio <code>max_v / min_v &gt;= 3.0</code> :<br>
  Le consensus est impossible sans débat : <code>decision=DEBATE_REQUIRED estimate=NONE</code>.<br>
- Sinon : consensus obtenu. L'estimation retenue est la valeur de Fibonacci <strong>la plus proche</strong> de <code>avg_v</code> (en cas d'équidistance parfaite, choisir la valeur supérieure).<br>
  <code>decision=CONSENSUS estimate={fib_valeur}</code>.<br><br>
Pour chaque vote, afficher :<br>
<code>POKER_RESULT id={id} min={min_v} max={max_v} avg={avg_rounded} decision={decision} estimate={estimate}</code><br>
(avec <code>avg_rounded = round(avg_v, 1)</code>).</p>`,
    starter: `import sys

FIBONACCI = [1, 2, 3, 5, 8, 13, 20, 40]
lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : analyser les votes du Planning Poker et déterminer l'estimation
`,
    hints: [
      'Convertir la chaîne de votes en liste d’entiers.',
      'Tester la condition de débat : (max_v - min_v >= 8) ou (max_v / min_v >= 3.0).',
      'Pour trouver le nombre de Fibonacci le plus proche, minimiser abs(f - avg_v).'
    ],
    examples: [
      {
        stdin: 'POKER_VOTE id=US-SEARCH votes=3,3,5,5,5',
        expected: 'POKER_RESULT id=US-SEARCH min=3 max=5 avg=4.2 decision=CONSENSUS estimate=5',
        note: 'Écart faible (5 - 3 = 2), moyenne 4.2 proche de 5 : consensus validé.'
      }
    ],
    tests: [
      {
        label: 'Forte divergence imposant un débat entre développeurs',
        stdin: 'POKER_VOTE id=US-ARCHI votes=2,3,5,13',
        expected: 'POKER_RESULT id=US-ARCHI min=2 max=13 avg=5.8 decision=DEBATE_REQUIRED estimate=NONE'
      },
      {
        label: 'Consensus unanime sur une tâche de 8 points',
        stdin: 'POKER_VOTE id=US-REPORT votes=8,8,8,8',
        expected: 'POKER_RESULT id=US-REPORT min=8 max=8 avg=8.0 decision=CONSENSUS estimate=8'
      },
      {
        label: 'Vote serré entre 1 et 2 points',
        stdin: 'POKER_VOTE id=US-FIX votes=1,1,2,2',
        expected: 'POKER_RESULT id=US-FIX min=1 max=2 avg=1.5 decision=CONSENSUS estimate=2'
      }
    ],
    solution: `import sys

FIBONACCI = [1, 2, 3, 5, 8, 13, 20, 40]
lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

def nearest_fib(val):
    best = FIBONACCI[0]
    best_dist = abs(val - best)
    for f in FIBONACCI[1:]:
        dist = abs(val - f)
        if dist < best_dist or (dist == best_dist and f > best):
            best = f
            best_dist = dist
    return best

for lig in lignes:
    if not lig.startswith('POKER_VOTE'):
        continue
    tokens = lig.split()
    params = {}
    for tok in tokens[1:]:
        if '=' in tok:
            k, v = tok.split('=', 1)
            params[k] = v
            
    pid = params.get('id', 'US')
    raw_v = params.get('votes', '1')
    votes = [int(x.strip()) for x in raw_v.split(',') if x.strip()]
    
    min_v = min(votes)
    max_v = max(votes)
    avg_v = sum(votes) / len(votes)
    avg_rnd = round(avg_v, 1)
    
    if (max_v - min_v >= 8) or (min_v > 0 and (max_v / min_v >= 3.0)):
        decision = 'DEBATE_REQUIRED'
        estimate = 'NONE'
    else:
        decision = 'CONSENSUS'
        estimate = str(nearest_fib(avg_v))
        
    print(f"POKER_RESULT id={pid} min={min_v} max={max_v} avg={avg_rnd} decision={decision} estimate={estimate}")
`
  },
  {
    id: 'ag3-c4-e3',
    chapter: 4,
    title: 'Parseur de Scénarios Gherkin / BDD (Given - When - Then)',
    level: 'n3',
    language: 'python',
    goal: 'Valider la structure séquentielle d’un scénario de comportement Gherkin (Étant donné, Quand, Alors).',
    brief: `<p>Dans le développement guidé par le comportement (<strong>Behavior-Driven Development - BDD</strong>), les critères d'acceptation sont formalisés sous la syntaxe Gherkin :<br>
- <code>GIVEN</code> (Contexte initial)<br>
- <code>WHEN</code> (Action déclenchante)<br>
- <code>THEN</code> (Résultat observable attendu)<br>
- <code>AND</code> (Extension d'une clause précédente).<br><br>
Règles de conformité séquentielle :<br>
1. Un scénario valide doit comporter <strong>au moins un GIVEN, au moins un WHEN, et au moins un THEN</strong>.<br>
2. La séquence doit respecter l'ordre chronologique : aucun <code>WHEN</code> ne peut apparaître avant le premier <code>GIVEN</code>, et aucun <code>THEN</code> ne peut apparaître avant le premier <code>WHEN</code>.<br>
3. Un mot-clé <code>AND</code> ne peut jamais être la toute première directive d'un scénario.<br><br>
Le script lit sur l'entrée standard des scénarios au format :<br>
<code>SCENARIO id=&lt;nom&gt; steps=&lt;STEP1,STEP2,STEP3,...&gt;</code>.<br><br>
Pour chaque scénario, afficher :<br>
<code>GHERKIN_AUDIT id={id} total_steps={count} status={VALID_BDD|INVALID_SEQUENCE}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : vérifier la validité séquentielle des étapes Gherkin
`,
    hints: [
      'Suivre l’état courant : avant_given, dans_given, dans_when, dans_then.',
      'S’assurer que l’on ne revient pas en arrière (ex: pas de GIVEN après WHEN ou THEN).'
    ],
    examples: [
      {
        stdin: 'SCENARIO id=LOGIN_SUCCESS steps=GIVEN,AND,WHEN,THEN',
        expected: 'GHERKIN_AUDIT id=LOGIN_SUCCESS total_steps=4 status=VALID_BDD',
        note: 'GIVEN suivi de AND, puis WHEN, puis THEN : séquence parfaitement conforme.'
      }
    ],
    tests: [
      {
        label: 'WHEN avant tout GIVEN (séquence invalide)',
        stdin: 'SCENARIO id=NO_CONTEXT steps=WHEN,THEN',
        expected: 'GHERKIN_AUDIT id=NO_CONTEXT total_steps=2 status=INVALID_SEQUENCE'
      },
      {
        label: 'AND placé en première position',
        stdin: 'SCENARIO id=LEADING_AND steps=AND,GIVEN,WHEN,THEN',
        expected: 'GHERKIN_AUDIT id=LEADING_AND total_steps=4 status=INVALID_SEQUENCE'
      },
      {
        label: 'GIVEN réintroduit après une étape THEN (retour en arrière interdit)',
        stdin: 'SCENARIO id=LOOPING steps=GIVEN,WHEN,THEN,GIVEN',
        expected: 'GHERKIN_AUDIT id=LOOPING total_steps=4 status=INVALID_SEQUENCE'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    if not lig.startswith('SCENARIO'):
        continue
    tokens = lig.split()
    params = {}
    for tok in tokens[1:]:
        if '=' in tok:
            k, v = tok.split('=', 1)
            params[k] = v
            
    sid = params.get('id', 'SCENARIO')
    raw_s = params.get('steps', '')
    steps = [x.strip().upper() for x in raw_s.split(',') if x.strip()]
    
    valid = True
    has_given = False
    has_when = False
    has_then = False
    phase = 0  # 0: start, 1: given, 2: when, 3: then
    
    for idx, st in enumerate(steps):
        if idx == 0 and st == 'AND':
            valid = False
            break
            
        if st == 'GIVEN':
            if phase > 1:
                valid = False
                break
            phase = 1
            has_given = True
        elif st == 'WHEN':
            if phase < 1 or phase > 2:
                valid = False
                break
            phase = 2
            has_when = True
        elif st == 'THEN':
            if phase < 2:
                valid = False
                break
            phase = 3
            has_then = True
        elif st == 'AND':
            if phase == 0:
                valid = False
                break
        else:
            valid = False
            break
            
    if not (has_given and has_when and has_then):
        valid = False
        
    status = 'VALID_BDD' if valid else 'INVALID_SEQUENCE'
    print(f"GHERKIN_AUDIT id={sid} total_steps={len(steps)} status={status}")
`
  }
];
