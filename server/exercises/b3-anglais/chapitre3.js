/**
 * Exercices du Chapitre 3 : Professional Written Communication — Emails, Bug Reports & Alerts.
 * Préfixe : an3-c3-e
 */
'use strict';

module.exports = [
  {
    id: 'an3-c3-e1',
    chapter: 3,
    title: 'Analyseur de registre et tonalité d’emails IT professionnels',
    level: 'n1',
    language: 'python',
    goal: 'Auditer la structure, la formule d’appel, le sujet et le vocabulaire d’un email technique anglophone selon les standards de l’industrie.',
    brief: `<p>Dans les échanges avec des équipes internationales et des clients, un email vague ou rédigé dans un registre familier nuit à la crédibilité technique et ralentit la résolution des incidents.<br>
Le script lit sur l'entrée standard les composantes d'un email au format :<br>
<code>SUBJECT: &lt;objet&gt;</code><br>
<code>GREETING: &lt;salutation&gt;</code><br>
<code>BODY: &lt;corps&gt;</code><br>
<code>CLOSING: &lt;formule de politesse&gt;</code><br><br>
Règles d'audit :<br>
1. <b>Sujet (Subject)</b> : Les objets vagues d'un seul mot (comme <i>"hey"</i>, <i>"problem"</i>, <i>"help"</i>, <i>"urgent"</i>) sont rejetés. Le sujet doit comporter au moins 3 mots et mentionner un composant système ou une sévérité (ex: <code>PROD</code>, <code>API</code>, <code>PAYMENT</code>, <code>DATABASE</code>, <code>AUTH</code>, <code>500</code>, <code>URGENT:</code>). Si ce n'est pas le cas : ajouter <code>VAGUE_SUBJECT</code>.<br>
2. <b>Salutation (Greeting)</b> : Les termes ultra-familiers (<i>"hey"</i>, <i>"yo"</i>, <i>"sup"</i>, <i>"hi guys"</i>) ajoutent <code>INFORMAL_GREETING</code>. Les formules acceptables débutent par <code>Hi &lt;Name&gt;</code>, <code>Hello &lt;Name&gt;</code> ou <code>Dear &lt;Team&gt;</code>.<br>
3. <b>Argot & Langage relâché dans le corps (Body)</b> : Présence de mots tels que <code>asap</code>, <code>gonna</code>, <code>wanna</code>, <code>stuff</code>, <code>broken</code> (insensible à la casse, mots entiers). Si au moins un est présent : ajouter <code>SLANG_IN_BODY</code>.<br>
4. <b>Clôture (Closing)</b> : Les formules professionnelles sont <code>Best regards</code>, <code>Regards</code>, <code>Sincerely</code>, <code>Thank you</code>. Des termes tels que <code>thx</code>, <code>bye</code>, <code>cheers</code> ou l'absence de formule ajoutent <code>UNPROFESSIONAL_CLOSING</code>.<br><br>
Détermination du registre :<br>
- Si 0 défaut : <code>REGISTER=PROFESSIONAL</code><br>
- Si 1 défaut : <code>REGISTER=ACCEPTABLE</code><br>
- Si 2 défauts ou plus : <code>REGISTER=UNPROFESSIONAL</code><br><br>
Afficher :<br>
<code>EMAIL_AUDIT: REGISTER=&lt;REGISTER&gt; | DEFECTS=&lt;nb&gt; | ISSUES=&lt;issue1,issue2,...&gt;</code> (ou <code>ISSUES=NONE</code> si 0 défaut, triées alphabétiquement).</p>`,
    starter: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : analyser les 4 composantes de l'email et calculer le score
`,
    hints: [
      'Extraire les 4 champs via un dictionnaire en repérant les préfixes SUBJECT:, GREETING:, BODY:, CLOSING:.',
      'Vérifier les mots interdits avec re.search(r"\\b...\\b", body, re.IGNORECASE).'
    ],
    examples: [
      {
        stdin: 'SUBJECT: URGENT: Payment API failing with Error 500\nGREETING: Hi Peter,\nBODY: The payment webhook gateway returned 500 errors for ten minutes.\nCLOSING: Best regards,',
        expected: 'EMAIL_AUDIT: REGISTER=PROFESSIONAL | DEFECTS=0 | ISSUES=NONE',
        note: 'Email clair, précis, formule d\'appel professionnelle et absence d\'argot.'
      }
    ],
    tests: [
      {
        label: 'Email malade typique avec 4 défauts critiques',
        stdin: 'SUBJECT: hey\nGREETING: Yo,\nBODY: The login stuff is broken, fix it asap cause we gonna lose money.\nCLOSING: thx',
        expected: 'EMAIL_AUDIT: REGISTER=UNPROFESSIONAL | DEFECTS=4 | ISSUES=INFORMAL_GREETING,SLANG_IN_BODY,UNPROFESSIONAL_CLOSING,VAGUE_SUBJECT'
      },
      {
        label: 'Email acceptable avec seulement une salutation informelle',
        stdin: 'SUBJECT: PROD: Latency spike on User Database\nGREETING: Hey,\nBODY: We noticed a query latency spike following the latest migration.\nCLOSING: Regards,',
        expected: 'EMAIL_AUDIT: REGISTER=ACCEPTABLE | DEFECTS=1 | ISSUES=INFORMAL_GREETING'
      },
      {
        label: 'Email avec sujet trop court et argot dans le corps',
        stdin: 'SUBJECT: Quick help\nGREETING: Hello Sarah,\nBODY: I wanna ask about the staging credentials.\nCLOSING: Sincerely,',
        expected: 'EMAIL_AUDIT: REGISTER=UNPROFESSIONAL | DEFECTS=2 | ISSUES=SLANG_IN_BODY,VAGUE_SUBJECT'
      },
      {
        label: 'Email formel adressé à une équipe',
        stdin: 'SUBJECT: Scheduled Maintenance: Core Router Upgrade on Saturday\nGREETING: Dear Infrastructure Team,\nBODY: Please find attached the maintenance schedule for the core router migration.\nCLOSING: Thank you,',
        expected: 'EMAIL_AUDIT: REGISTER=PROFESSIONAL | DEFECTS=0 | ISSUES=NONE'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

email_data = {}
for lig in lignes:
    if lig.startswith('SUBJECT:'):
        email_data['SUBJECT'] = lig[len('SUBJECT:'):].strip()
    elif lig.startswith('GREETING:'):
        email_data['GREETING'] = lig[len('GREETING:'):].strip()
    elif lig.startswith('BODY:'):
        email_data['BODY'] = lig[len('BODY:'):].strip()
    elif lig.startswith('CLOSING:'):
        email_data['CLOSING'] = lig[len('CLOSING:'):].strip()

subject = email_data.get('SUBJECT', '')
greeting = email_data.get('GREETING', '')
body = email_data.get('BODY', '')
closing = email_data.get('CLOSING', '')

issues = []

# 1. Subject check
words = subject.split()
sys_keywords = {'PROD', 'API', 'PAYMENT', 'DATABASE', 'AUTH', '500', 'URGENT:', 'MAINTENANCE', 'UPGRADE', 'ROUTER'}
has_sys = any(k.upper() in subject.upper() for k in sys_keywords)
if len(words) < 3 or not has_sys or subject.lower() in {'hey', 'problem', 'help', 'urgent'}:
    issues.append('VAGUE_SUBJECT')

# 2. Greeting check
informal_greetings = {'hey', 'yo', 'sup', 'hi guys'}
if greeting.rstrip(',').strip().lower() in informal_greetings:
    issues.append('INFORMAL_GREETING')

# 3. Slang in body
slang_pattern = r'\\b(asap|gonna|wanna|stuff|broken)\\b'
if re.search(slang_pattern, body, re.I):
    issues.append('SLANG_IN_BODY')

# 4. Closing check
prof_closings = {'best regards', 'regards', 'sincerely', 'thank you'}
closing_clean = closing.rstrip(',').strip().lower()
if closing_clean not in prof_closings:
    issues.append('UNPROFESSIONAL_CLOSING')

defects = len(issues)
if defects == 0:
    reg = 'PROFESSIONAL'
    issues_str = 'NONE'
elif defects == 1:
    reg = 'ACCEPTABLE'
    issues.sort()
    issues_str = ','.join(issues)
else:
    reg = 'UNPROFESSIONAL'
    issues.sort()
    issues_str = ','.join(issues)

print(f'EMAIL_AUDIT: REGISTER={reg} | DEFECTS={defects} | ISSUES={issues_str}')
`
  },
  {
    id: 'an3-c3-e2',
    chapter: 3,
    title: 'Validateur de structure de rapport de bug technique',
    level: 'n2',
    language: 'python',
    goal: 'Vérifier la conformité d’un ticket d’anomalie rédigé en anglais pour s’assurer qu’il contient les sections obligatoires requises par l’équipe de développement.',
    brief: `<p>Un rapport de bug (<i>Bug Report</i>) doit permettre une reproduction immédiate sans allers-retours inutiles.<br>
Le script lit sur l'entrée standard un ensemble de champs au format :<br>
<code>&lt;CHAMP&gt;: &lt;valeur&gt;</code>.<br><br>
Champs obligatoires requis :<br>
1. <code>TITLE</code> : intitulé clair du bug (au moins 4 mots).<br>
2. <code>ENVIRONMENT</code> : environnement d'exécution (ex: OS, navigateur ou cluster).<br>
3. <code>STEPS</code> : étapes de reproduction. Doit comporter au moins deux étapes numérotées distinctes séparées par un point-virgule ou retour à la ligne (ex: <code>1. Login; 2. Click Pay</code>).<br>
4. <code>EXPECTED</code> : comportement attendu.<br>
5. <code>ACTUAL</code> : comportement réel observé.<br>
6. <code>SEVERITY</code> : doit valoir exactement <code>CRITICAL</code>, <code>MAJOR</code>, <code>MINOR</code> ou <code>TRIVIAL</code>.<br><br>
Règles de validation :<br>
- Si un champ obligatoire est manquant, ajouter son nom dans la liste des anomalies.<br>
- Si le champ <code>SEVERITY</code> est présent mais non valide, ajouter <code>INVALID_SEVERITY</code>.<br>
- Si <code>STEPS</code> est présent mais ne contient pas au moins deux étapes numérotées (recherche de <code>1.</code> et <code>2.</code>), ajouter <code>INSUFFICIENT_STEPS</code>.<br>
- Si <code>TITLE</code> est présent mais fait moins de 4 mots, ajouter <code>VAGUE_TITLE</code>.<br><br>
Afficher :<br>
- Si aucune anomalie :<br>
  <code>BUG_REPORT_STATUS: READY_FOR_TRIAGE | SEVERITY=&lt;SEVERITY&gt;</code><br>
- Si anomalies :<br>
  <code>BUG_REPORT_STATUS: REJECTED | ISSUES=&lt;anomalie1,anomalie2,...&gt;</code> (triées alphabétiquement).</p>`,
    starter: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : vérifier les champs obligatoires du rapport d'anomalie
`,
    hints: [
      'Stocker les champs dans un dictionnaire avec la clé en majuscules.',
      'Vérifier la présence des séquences "1." et "2." dans le texte des STEPS.'
    ],
    examples: [
      {
        stdin: 'TITLE: Payment modal freezes on checkout click\nENVIRONMENT: Production Chrome 120 macOS 14\nSTEPS: 1. Add item to cart; 2. Click checkout button\nEXPECTED: Modal displays Stripe payment fields\nACTUAL: Modal spins indefinitely with no network call\nSEVERITY: CRITICAL',
        expected: 'BUG_REPORT_STATUS: READY_FOR_TRIAGE | SEVERITY: CRITICAL',
        note: 'Toutes les rubriques requises sont complètes et conformes.'
      }
    ],
    tests: [
      {
        label: 'Rapport incomplet sans environnement ni étapes suffisantes',
        stdin: 'TITLE: Crash button\nSTEPS: Just clicked it\nEXPECTED: Working fine\nACTUAL: App closes\nSEVERITY: MAJOR',
        expected: 'BUG_REPORT_STATUS: REJECTED | ISSUES=ENVIRONMENT,INSUFFICIENT_STEPS,VAGUE_TITLE'
      },
      {
        label: 'Sévérité invalide et comportement attendu manquant',
        stdin: 'TITLE: User profile avatar fails to upload on mobile\nENVIRONMENT: iOS 17 Safari\nSTEPS: 1. Tap upload; 2. Select PNG photo\nACTUAL: Red toast error displayed\nSEVERITY: HIGH_PRIORITY',
        expected: 'BUG_REPORT_STATUS: REJECTED | ISSUES=EXPECTED,INVALID_SEVERITY'
      },
      {
        label: 'Rapport complet mineur bien documenté',
        stdin: 'TITLE: Typo in French translation of settings header\nENVIRONMENT: Staging Ubuntu Firefox 119\nSTEPS: 1. Open settings; 2. Switch language to French\nEXPECTED: Label displays Préférences\nACTUAL: Label displays Prefrences\nSEVERITY: MINOR',
        expected: 'BUG_REPORT_STATUS: READY_FOR_TRIAGE | SEVERITY: MINOR'
      },
      {
        label: 'Aucun champ présent dans le rapport',
        stdin: 'This is not formatted as key value pairs',
        expected: 'BUG_REPORT_STATUS: REJECTED | ISSUES=ACTUAL,ENVIRONMENT,EXPECTED,SEVERITY,STEPS,TITLE'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

fields = {}
for lig in lignes:
    m = re.match(r'^([A-Z_]+):\s*(.*)', lig)
    if m:
        fields[m.group(1)] = m.group(2).strip()

required = ['TITLE', 'ENVIRONMENT', 'STEPS', 'EXPECTED', 'ACTUAL', 'SEVERITY']
valid_severities = {'CRITICAL', 'MAJOR', 'MINOR', 'TRIVIAL'}

issues = []

for req in required:
    if req not in fields or not fields[req]:
        issues.append(req)

if 'SEVERITY' in fields and fields['SEVERITY']:
    if fields['SEVERITY'] not in valid_severities:
        issues.append('INVALID_SEVERITY')

if 'TITLE' in fields and fields['TITLE']:
    if len(fields['TITLE'].split()) < 4:
        issues.append('VAGUE_TITLE')

if 'STEPS' in fields and fields['STEPS']:
    steps_text = fields['STEPS']
    if '1.' not in steps_text or '2.' not in steps_text:
        issues.append('INSUFFICIENT_STEPS')

if not issues:
    print(f"BUG_REPORT_STATUS: READY_FOR_TRIAGE | SEVERITY: {fields['SEVERITY']}")
else:
    issues.sort()
    print(f"BUG_REPORT_STATUS: REJECTED | ISSUES={','.join(issues)}")
`
  },
  {
    id: 'an3-c3-e3',
    chapter: 3,
    title: 'Générateur d’alerte d’escalade d’incident pour le management',
    level: 'n3',
    language: 'python',
    goal: 'Générer un communiqué d’escalade d’incident critique (Executive Incident Broadcast) formaté en anglais pour les parties prenantes.',
    brief: `<p>Lors d'une panne majeure en production, l'équipe d'astreinte (SRE / Incident Commander) doit publier un bulletin d'incident synthétique et standardisé à destination des directeurs et partenaires internationaux.<br>
Le script lit sur l'entrée standard une ligne au format :<br>
<code>INCIDENT_DATA id=&lt;id&gt; service=&lt;srv&gt; impact_pct=&lt;pct&gt; downtime_min=&lt;min&gt; eta_min=&lt;eta&gt; workaround=&lt;yes|no&gt;</code>.<br><br>
Règles de génération :<br>
- <b>Objet (SUBJECT)</b> : <code>[INCIDENT &lt;id&gt;] SEV-1 Outage: &lt;service&gt; (&lt;impact_pct&gt;% users affected)</code><br>
- <b>Statut (STATUS)</b> :<br>
  * Si <code>eta_min == 0</code> : <code>RESOLVED_MONITORING</code><br>
  * Si <code>eta_min &lt;= 30</code> : <code>ACTIVE_MITIGATION_IN_PROGRESS</code><br>
  * Si <code>eta_min &gt; 30</code> : <code>CRITICAL_EXECUTIVE_ESCALATION</code><br>
- <b>Impact (IMPACT)</b> : <code>&lt;service&gt; degraded for &lt;downtime_min&gt; minutes</code><br>
- <b>ETA Résolution (ETA_RESOLUTION)</b> : <code>&lt;eta_min&gt; minutes</code> (ou <code>Immediate / Stable</code> si eta_min vaut 0)<br>
- <b>Contournement (WORKAROUND)</b> :<br>
  * Si <code>workaround=yes</code> : <code>Available - traffic redirected to secondary region</code><br>
  * Si <code>workaround=no</code> : <code>None available - full engineering mobilization</code><br><br>
Format attendu :<br>
<code>--- INCIDENT BROADCAST ---</code><br>
<code>SUBJECT: ...</code><br>
<code>STATUS: ...</code><br>
<code>IMPACT: ...</code><br>
<code>ETA_RESOLUTION: ...</code><br>
<code>WORKAROUND: ...</code><br>
<code>--- END BROADCAST ---</code></p>`,
    starter: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : extraire les métriques et générer le bulletin d'escalade
`,
    hints: [
      'Extraire les paramètres via des regex : r"(\\w+)=([^\\s]+)".',
      'Convertir les valeurs numériques d\'impact, downtime et eta en entiers.'
    ],
    examples: [
      {
        stdin: 'INCIDENT_DATA id=INC-8902 service=CheckoutAPI impact_pct=85 downtime_min=42 eta_min=20 workaround=yes',
        expected: '--- INCIDENT BROADCAST ---\nSUBJECT: [INCIDENT INC-8902] SEV-1 Outage: CheckoutAPI (85% users affected)\nSTATUS: ACTIVE_MITIGATION_IN_PROGRESS\nIMPACT: CheckoutAPI degraded for 42 minutes\nETA_RESOLUTION: 20 minutes\nWORKAROUND: Available - traffic redirected to secondary region\n--- END BROADCAST ---',
        note: 'Incident avec mitigation en cours et contournement actif vers la région secondaire.'
      }
    ],
    tests: [
      {
        label: 'Incident résolu avec ETA à 0',
        stdin: 'INCIDENT_DATA id=INC-7010 service=AuthGateway impact_pct=10 downtime_min=15 eta_min=0 workaround=no',
        expected: '--- INCIDENT BROADCAST ---\nSUBJECT: [INCIDENT INC-7010] SEV-1 Outage: AuthGateway (10% users affected)\nSTATUS: RESOLVED_MONITORING\nIMPACT: AuthGateway degraded for 15 minutes\nETA_RESOLUTION: Immediate / Stable\nWORKAROUND: None available - full engineering mobilization\n--- END BROADCAST ---'
      },
      {
        label: 'Escalade critique sans contournement avec ETA supérieure à 30 min',
        stdin: 'INCIDENT_DATA id=INC-9999 service=PostgresMaster impact_pct=100 downtime_min=65 eta_min=45 workaround=no',
        expected: '--- INCIDENT BROADCAST ---\nSUBJECT: [INCIDENT INC-9999] SEV-1 Outage: PostgresMaster (100% users affected)\nSTATUS: CRITICAL_EXECUTIVE_ESCALATION\nIMPACT: PostgresMaster degraded for 65 minutes\nETA_RESOLUTION: 45 minutes\nWORKAROUND: None available - full engineering mobilization\n--- END BROADCAST ---'
      },
      {
        label: 'Deux incidents consécutifs',
        stdin: 'INCIDENT_DATA id=INC-1100 service=SearchEngine impact_pct=40 downtime_min=25 eta_min=15 workaround=yes\nINCIDENT_DATA id=INC-1101 service=BillingEngine impact_pct=95 downtime_min=50 eta_min=60 workaround=no',
        expected: '--- INCIDENT BROADCAST ---\nSUBJECT: [INCIDENT INC-1100] SEV-1 Outage: SearchEngine (40% users affected)\nSTATUS: ACTIVE_MITIGATION_IN_PROGRESS\nIMPACT: SearchEngine degraded for 25 minutes\nETA_RESOLUTION: 15 minutes\nWORKAROUND: Available - traffic redirected to secondary region\n--- END BROADCAST ---\n--- INCIDENT BROADCAST ---\nSUBJECT: [INCIDENT INC-1101] SEV-1 Outage: BillingEngine (95% users affected)\nSTATUS: CRITICAL_EXECUTIVE_ESCALATION\nIMPACT: BillingEngine degraded for 50 minutes\nETA_RESOLUTION: 60 minutes\nWORKAROUND: None available - full engineering mobilization\n--- END BROADCAST ---'
      },
      {
        label: 'ETA limite exacte à 30 minutes',
        stdin: 'INCIDENT_DATA id=INC-3300 service=QueueBroker impact_pct=50 downtime_min=30 eta_min=30 workaround=yes',
        expected: '--- INCIDENT BROADCAST ---\nSUBJECT: [INCIDENT INC-3300] SEV-1 Outage: QueueBroker (50% users affected)\nSTATUS: ACTIVE_MITIGATION_IN_PROGRESS\nIMPACT: QueueBroker degraded for 30 minutes\nETA_RESOLUTION: 30 minutes\nWORKAROUND: Available - traffic redirected to secondary region\n--- END BROADCAST ---'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    m_id = re.search(r'id=([^\\s]+)', lig)
    m_srv = re.search(r'service=([^\\s]+)', lig)
    m_pct = re.search(r'impact_pct=([^\\s]+)', lig)
    m_down = re.search(r'downtime_min=([^\\s]+)', lig)
    m_eta = re.search(r'eta_min=([^\\s]+)', lig)
    m_work = re.search(r'workaround=([^\\s]+)', lig)
    
    if not (m_id and m_srv and m_pct and m_down and m_eta and m_work):
        continue
        
    inc_id = m_id.group(1)
    srv = m_srv.group(1)
    pct = m_pct.group(1)
    down = m_down.group(1)
    eta = int(m_eta.group(1))
    work = m_work.group(1).lower()
    
    if eta == 0:
        status = 'RESOLVED_MONITORING'
        eta_str = 'Immediate / Stable'
    elif eta <= 30:
        status = 'ACTIVE_MITIGATION_IN_PROGRESS'
        eta_str = f'{eta} minutes'
    else:
        status = 'CRITICAL_EXECUTIVE_ESCALATION'
        eta_str = f'{eta} minutes'
        
    if work == 'yes':
        work_str = 'Available - traffic redirected to secondary region'
    else:
        work_str = 'None available - full engineering mobilization'
        
    print('--- INCIDENT BROADCAST ---')
    print(f'SUBJECT: [INCIDENT {inc_id}] SEV-1 Outage: {srv} ({pct}% users affected)')
    print(f'STATUS: {status}')
    print(f'IMPACT: {srv} degraded for {down} minutes')
    print(f'ETA_RESOLUTION: {eta_str}')
    print(f'WORKAROUND: {work_str}')
    print('--- END BROADCAST ---')
`
  }
];
