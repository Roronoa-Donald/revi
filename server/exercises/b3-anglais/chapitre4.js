/**
 * Exercices du Chapitre 4 : Spoken English for Agile Teams — Standups, Retrospectives & SLA Metrics.
 * Préfixe : an3-c4-e
 */
'use strict';

module.exports = [
  {
    id: 'an3-c4-e1',
    chapter: 4,
    title: 'Parseur de compte-rendu de Stand-up Meeting Agile',
    level: 'n1',
    language: 'python',
    goal: 'Extraire les réalisations passées, les objectifs du jour et les blocages déclarés lors d’un Daily Standup meeting en anglais.',
    brief: `<p>Le stand-up meeting quotidien en méthode Agile repose sur 3 questions clés : <i>What did you do yesterday? What will you do today? Are there any blockers?</i><br>
Le script lit sur l'entrée standard des interventions au format :<br>
<code>STANDUP speaker=&lt;nom&gt; yesterday=&lt;texte&gt; today=&lt;texte&gt; blocker=&lt;texte&gt;</code>.<br><br>
Règles d'évaluation :<br>
- Si <code>blocker</code> vaut <code>none</code>, <code>no blockers</code> ou <code>all good</code> (insensible à la casse) :<br>
  Le statut est <code>ON_TRACK</code> et la valeur normalisée du bloqueur devient <code>NONE</code>.<br>
- Si un bloqueur réel est mentionné :<br>
  Le statut est <code>BLOCKED</code> et le texte du bloqueur est conservé.<br><br>
Afficher :<br>
<code>STANDUP_REPORT: &lt;nom&gt; -&gt; STATUS=&lt;STATUS&gt; | YESTERDAY="&lt;yesterday&gt;" | TODAY="&lt;today&gt;" | BLOCKER="&lt;blocker&gt;"</code></p>`,
    starter: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : analyser les interventions du daily standup
`,
    hints: [
      'Extraire les champs speaker, yesterday, today et blocker à l\'aide d\'expressions régulières.',
      'Tester si le bloqueur correspond à l\'un des termes de non-blocage (none, no blockers, all good).'
    ],
    examples: [
      {
        stdin: 'STANDUP speaker=Alice yesterday=Merged pull request 42 today=Writing unit tests for auth blocker=none',
        expected: 'STANDUP_REPORT: Alice -> STATUS=ON_TRACK | YESTERDAY="Merged pull request 42" | TODAY="Writing unit tests for auth" | BLOCKER="NONE"',
        note: 'Alice est débloquée et poursuit ses tests unitaires.'
      }
    ],
    tests: [
      {
        label: 'Développeur bloqué par les droits d’accès Cloud',
        stdin: 'STANDUP speaker=Bob yesterday=Refactored database schema today=Deploying migration to staging blocker=Waiting for AWS IAM permissions',
        expected: 'STANDUP_REPORT: Bob -> STATUS=BLOCKED | YESTERDAY="Refactored database schema" | TODAY="Deploying migration to staging" | BLOCKER="Waiting for AWS IAM permissions"'
      },
      {
        label: 'Statut sans bloqueur avec formulation no blockers',
        stdin: 'STANDUP speaker=Charlie yesterday=Investigated Redis latency today=Benchmarking cluster throughput blocker=No blockers',
        expected: 'STANDUP_REPORT: Charlie -> STATUS=ON_TRACK | YESTERDAY="Investigated Redis latency" | TODAY="Benchmarking cluster throughput" | BLOCKER="NONE"'
      },
      {
        label: 'Multiples intervenants lors de la mêlée',
        stdin: 'STANDUP speaker=David yesterday=Updated API docs today=Reviewing PRs blocker=all good\nSTANDUP speaker=Elena yesterday=Configured CI pipeline today=Adding Docker cache blocker=Docker daemon crashing on runner',
        expected: 'STANDUP_REPORT: David -> STATUS=ON_TRACK | YESTERDAY="Updated API docs" | TODAY="Reviewing PRs" | BLOCKER="NONE"\nSTANDUP_REPORT: Elena -> STATUS=BLOCKED | YESTERDAY="Configured CI pipeline" | TODAY="Adding Docker cache" | BLOCKER="Docker daemon crashing on runner"'
      },
      {
        label: 'Bloqueur sous forme de dépendance externe',
        stdin: 'STANDUP speaker=Fiona yesterday=Finished design mocks today=Slicing CSS layout blocker=Blocked by frontend team review',
        expected: 'STANDUP_REPORT: Fiona -> STATUS=BLOCKED | YESTERDAY="Finished design mocks" | TODAY="Slicing CSS layout" | BLOCKER="Blocked by frontend team review"'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

NO_BLOCK = {'none', 'no blockers', 'all good'}

for lig in lignes:
    m = re.match(r'STANDUP speaker=([^\\s]+) yesterday=(.*?) today=(.*?) blocker=(.*)', lig)
    if not m:
        continue
    speaker = m.group(1).strip()
    yest = m.group(2).strip()
    today = m.group(3).strip()
    block = m.group(4).strip()
    
    if block.lower() in NO_BLOCK:
        status = 'ON_TRACK'
        block_clean = 'NONE'
    else:
        status = 'BLOCKED'
        block_clean = block
        
    print(f'STANDUP_REPORT: {speaker} -> STATUS={status} | YESTERDAY="{yest}" | TODAY="{today}" | BLOCKER="{block_clean}"')
`
  },
  {
    id: 'an3-c4-e2',
    chapter: 4,
    title: 'Calculateur de conformité SLA, Uptime et pénalités',
    level: 'n2',
    language: 'python',
    goal: 'Calculer le temps d’indisponibilité autorisé par un contrat SLA en anglais, comparer avec le downtime réel et calculer les pénalités applicables.',
    brief: `<p>Dans les contrats de service internationaux (<i>Service Level Agreements</i>), le taux de disponibilité (ex: 99.9% <i>"three nines"</i>, 99.95%, 99.99%) détermine le temps de panne maximal toléré avant pénalités financières.<br>
Le script lit sur l'entrée standard des lignes au format :<br>
<code>SLA_RECORD client=&lt;nom&gt; target_pct=&lt;pct&gt; actual_down_min=&lt;min&gt; days=&lt;jours&gt; penalty_per_hour=&lt;usd&gt;</code>.<br><br>
Formules et calculs :<br>
1. <b>Minutes totales du mois</b> : <code>total_min = days * 24 * 60</code>.<br>
2. <b>Downtime autorisé en minutes</b> : <code>allowed_min = total_min * (100.0 - target_pct) / 100.0</code> (arrondi à 2 décimales).<br>
3. <b>Contrôle de dépassement</b> :<br>
   - Si <code>actual_down_min &lt;= allowed_min</code> :<br>
     <code>SLA_EVAL: &lt;client&gt; -&gt; STATUS=SLA_MET | ACTUAL=&lt;actual&gt;m | ALLOWED=&lt;allowed&gt;m | PENALTY=0 USD</code><br>
   - Si <code>actual_down_min &gt; allowed_min</code> :<br>
     Excédent en minutes : <code>excess_min = actual_down_min - allowed_min</code>.<br>
     Heures d'excédent facturables : arrondi supérieur à l'heure entière (<code>math.ceil(excess_min / 60.0)</code>).<br>
     Pénalité financière : <code>penalty = excess_hours * penalty_per_hour</code>.<br>
     <code>SLA_EVAL: &lt;client&gt; -&gt; STATUS=SLA_BREACHED | ACTUAL=&lt;actual&gt;m | ALLOWED=&lt;allowed&gt;m | PENALTY=&lt;penalty&gt; USD</code><br><br>
Les durées <code>ACTUAL</code> et <code>ALLOWED</code> doivent être formatées avec 2 décimales (ex: <code>43.20m</code>).</p>`,
    starter: `import sys
import math
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer l'indisponibilité autorisée et les pénalités de SLA
`,
    hints: [
      'Utiliser math.ceil pour convertir l\'excédent de minutes en heures pleines pénalisables.',
      'Formater les nombres à virgule avec :.2f.'
    ],
    examples: [
      {
        stdin: 'SLA_RECORD client=FinTechCorp target_pct=99.9 actual_down_min=30 days=30 penalty_per_hour=500',
        expected: 'SLA_EVAL: FinTechCorp -> STATUS=SLA_MET | ACTUAL=30.00m | ALLOWED=43.20m | PENALTY=0 USD',
        note: '30 jours à 99.9% autorisent 43.20 minutes de coupure. 30 minutes réelles respectent le contrat.'
      }
    ],
    tests: [
      {
        label: 'Dépassement de SLA de 4 nines (99.99%) sur 30 jours',
        stdin: 'SLA_RECORD client=HealthCloud target_pct=99.99 actual_down_min=120 days=30 penalty_per_hour=1000',
        expected: 'SLA_EVAL: HealthCloud -> STATUS=SLA_BREACHED | ACTUAL=120.00m | ALLOWED=4.32m | PENALTY=2000 USD'
      },
      {
        label: 'Mois de 31 jours avec respect strict du SLA',
        stdin: 'SLA_RECORD client=MediaStream target_pct=99.95 actual_down_min=15 days=31 penalty_per_hour=250',
        expected: 'SLA_EVAL: MediaStream -> STATUS=SLA_MET | ACTUAL=15.00m | ALLOWED=22.32m | PENALTY=0 USD'
      },
      {
        label: 'Multiples clients et dépassement d’une fraction d’heure',
        stdin: 'SLA_RECORD client=BankCorp target_pct=99.9 actual_down_min=50 days=30 penalty_per_hour=600\nSLA_RECORD client=RetailApp target_pct=99.5 actual_down_min=100 days=30 penalty_per_hour=150',
        expected: 'SLA_EVAL: BankCorp -> STATUS=SLA_BREACHED | ACTUAL=50.00m | ALLOWED=43.20m | PENALTY=600 USD\nSLA_EVAL: RetailApp -> STATUS=SLA_MET | ACTUAL=100.00m | ALLOWED=216.00m | PENALTY=0 USD'
      },
      {
        label: 'Excédent exact supérieur à 60 minutes engendrant 2 heures',
        stdin: 'SLA_RECORD client=LogisticsGlobal target_pct=99.9 actual_down_min=105 days=30 penalty_per_hour=400',
        expected: 'SLA_EVAL: LogisticsGlobal -> STATUS=SLA_BREACHED | ACTUAL=105.00m | ALLOWED=43.20m | PENALTY=800 USD'
      }
    ],
    solution: `import sys
import math
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    m_client = re.search(r'client=([^\\s]+)', lig)
    m_target = re.search(r'target_pct=([0-9.]+)', lig)
    m_actual = re.search(r'actual_down_min=([0-9.]+)', lig)
    m_days = re.search(r'days=([0-9]+)', lig)
    m_pen = re.search(r'penalty_per_hour=([0-9]+)', lig)
    
    if not (m_client and m_target and m_actual and m_days and m_pen):
        continue
        
    client = m_client.group(1)
    target = float(m_target.group(1))
    actual = float(m_actual.group(1))
    days = int(m_days.group(1))
    pen_rate = int(m_pen.group(1))
    
    total_min = days * 24 * 60
    allowed = total_min * (100.0 - target) / 100.0
    
    if actual <= allowed + 1e-9:
        status = 'SLA_MET'
        penalty = 0
    else:
        status = 'SLA_BREACHED'
        excess = actual - allowed
        hours = math.ceil(excess / 60.0)
        penalty = hours * pen_rate
        
    print(f'SLA_EVAL: {client} -> STATUS={status} | ACTUAL={actual:.2f}m | ALLOWED={allowed:.2f}m | PENALTY={penalty} USD')
`
  },
  {
    id: 'an3-c4-e3',
    chapter: 4,
    title: 'Extracteur de rétrospective agile : Sentiments et plan d’action',
    level: 'n3',
    language: 'python',
    goal: 'Compiler les retours d’une rétrospective de sprint en anglais, dénombrer les points positifs et les axes d’amélioration, et formaliser la liste ordonnée des actions assignées.',
    brief: `<p>À la fin de chaque itération (sprint), la rétrospective identifie ce qui a bien fonctionné (<i>What went well</i>), les difficultés rencontrées (<i>What could be improved</i>) et les actions concrètes à mener (<i>Action Items</i>).<br>
Le script lit sur l'entrée standard des retours au format :<br>
<code>RETRO_ENTRY type=&lt;GOOD|CHALLENGE|ACTION&gt; owner=&lt;nom&gt; text=&lt;contenu en anglais&gt;</code>.<br><br>
Règles de traitement :<br>
1. Compter le nombre total d'entrées de chaque type : <code>GOOD</code>, <code>CHALLENGE</code> et <code>ACTION</code>.<br>
2. Conserver les entrées de type <code>ACTION</code> dans leur ordre d'apparition et les formater :<br>
   <code>[ACTION #&lt;i&gt;] Owner: &lt;owner&gt; -&gt; &lt;text&gt;</code> (l'indice &lt;i&gt; commence à 1).<br><br>
Afficher :<br>
<code>RETRO_SUMMARY: POSITIVE=&lt;nb_good&gt; | CHALLENGES=&lt;nb_challenge&gt; | ACTIONS=&lt;nb_action&gt;</code><br>
Puis chaque ligne d'action formatée (s'il y en a).</p>`,
    starter: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : recenser les catégories de la rétrospective et formater les actions
`,
    hints: [
      'Garder une liste dédiée pour stocker les actions avec leur owner et text.',
      'Formater le sommaire avant d\'afficher la liste des actions.'
    ],
    examples: [
      {
        stdin: 'RETRO_ENTRY type=GOOD owner=Team text=Zero downtime during database migration\nRETRO_ENTRY type=CHALLENGE owner=Team text=Documentation PR was reviewed late\nRETRO_ENTRY type=ACTION owner=Sarah text=Automate doc linting in Github Actions',
        expected: 'RETRO_SUMMARY: POSITIVE=1 | CHALLENGES=1 | ACTIONS=1\n[ACTION #1] Owner: Sarah -> Automate doc linting in Github Actions',
        note: 'Une synthèse équilibrée et une action assignée à Sarah.'
      }
    ],
    tests: [
      {
        label: 'Rétrospective avec plusieurs actions concrètes',
        stdin: 'RETRO_ENTRY type=GOOD owner=DevOps text=CI pipeline build time dropped by 40%\nRETRO_ENTRY type=GOOD owner=QA text=Test coverage reached 85%\nRETRO_ENTRY type=CHALLENGE owner=SecOps text=Two secrets committed by mistake\nRETRO_ENTRY type=ACTION owner=Alex text=Deploy git-secrets pre-commit hook\nRETRO_ENTRY type=ACTION owner=Maria text=Rotate exposed staging API tokens',
        expected: 'RETRO_SUMMARY: POSITIVE=2 | CHALLENGES=1 | ACTIONS=2\n[ACTION #1] Owner: Alex -> Deploy git-secrets pre-commit hook\n[ACTION #2] Owner: Maria -> Rotate exposed staging API tokens'
      },
      {
        label: 'Rétrospective sans aucune action immédiate',
        stdin: 'RETRO_ENTRY type=GOOD owner=Frontend text=UI design system adopted by all pages\nRETRO_ENTRY type=CHALLENGE owner=Backend text=Redis cache missed too many sessions',
        expected: 'RETRO_SUMMARY: POSITIVE=1 | CHALLENGES=1 | ACTIONS=0'
      },
      {
        label: 'Multiples difficultés nécessitant plusieurs chantiers',
        stdin: 'RETRO_ENTRY type=CHALLENGE owner=All text=Sprint backlog was overcommitted\nRETRO_ENTRY type=CHALLENGE owner=All text=Standups exceeded 15 minutes\nRETRO_ENTRY type=ACTION owner=ScrumMaster text=Enforce 15-minute timebox on daily standup',
        expected: 'RETRO_SUMMARY: POSITIVE=0 | CHALLENGES=2 | ACTIONS=1\n[ACTION #1] Owner: ScrumMaster -> Enforce 15-minute timebox on daily standup'
      },
      {
        label: 'Succès uniquement',
        stdin: 'RETRO_ENTRY type=GOOD owner=Team text=All user stories delivered ahead of schedule',
        expected: 'RETRO_SUMMARY: POSITIVE=1 | CHALLENGES=0 | ACTIONS=0'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

c_good = 0
c_chal = 0
actions = []

for lig in lignes:
    m = re.match(r'RETRO_ENTRY type=([^\\s]+) owner=([^\\s]+) text=(.*)', lig)
    if not m:
        continue
    etype = m.group(1).upper()
    owner = m.group(2)
    text = m.group(3).strip()
    
    if etype == 'GOOD':
        c_good += 1
    elif etype == 'CHALLENGE':
        c_chal += 1
    elif etype == 'ACTION':
        actions.append((owner, text))

print(f'RETRO_SUMMARY: POSITIVE={c_good} | CHALLENGES={c_chal} | ACTIONS={len(actions)}')
for i, (owner, text) in enumerate(actions, start=1):
    print(f'[ACTION #{i}] Owner: {owner} -> {text}')
`
  }
];
