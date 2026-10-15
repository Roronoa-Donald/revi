/**
 * Exercices du Chapitre 5 : IT Support, Incident Management & Technical Translation.
 * Préfixe : an3-c5-e
 */
'use strict';

module.exports = [
  {
    id: 'an3-c5-e1',
    chapter: 5,
    title: 'Traducteur d’erreurs techniques en langage utilisateur bienveillant',
    level: 'n1',
    language: 'python',
    goal: 'Traduire un message d’erreur brut ou une trace d’exception en un message d’assistance client empathique, clair et compréhensible par un utilisateur non technicien.',
    brief: `<p>Afficher un code d'erreur brut comme <i>"Invalid or malformed claims in JWT payload"</i> ou <i>"NullPointerException at line 140"</i> désoriente l'utilisateur. En support client de niveau 1/2, l'ingénieur doit reformuler le problème avec clarté et empathie.<br>
Le script lit sur l'entrée standard des codes d'erreurs au format :<br>
<code>TRANSLATE_ERROR code=&lt;CODE&gt;</code>.<br><br>
Dictionnaire des correspondances officielles :<br>
- <code>ERR_AUTH_JWT_EXPIRED</code> : <code>"Your session has expired. Please sign in again to continue safely."</code><br>
- <code>ERR_DB_CONN_TIMEOUT</code> : <code>"We are having trouble reaching our database. Please wait a moment and refresh the page."</code><br>
- <code>ERR_PAYMENT_GATEWAY_502</code> : <code>"The payment processor is temporarily unavailable. No money has been charged from your card."</code><br>
- <code>ERR_RATE_LIMIT_EXCEEDED</code> : <code>"You have sent too many requests in a short time. Please take a break and retry in a few minutes."</code><br>
- <code>ERR_FILE_TOO_LARGE</code> : <code>"Your uploaded file exceeds the 10 MB limit. Please compress it before re-uploading."</code><br>
- <code>ERR_ACCOUNT_LOCKED</code> : <code>"Your account has been temporarily locked for security. Please reset your password or contact support."</code><br>
- Tout autre code non répertorié :<br>
  <code>"An unexpected issue occurred. Our engineering team has been notified. Please try again shortly."</code><br><br>
Afficher :<br>
<code>SUPPORT_MESSAGE: [&lt;CODE&gt;] -&gt; &lt;message_bienveillant&gt;</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : associer chaque code d'erreur technique à sa reformulation bienveillante
`,
    hints: [
      'Créer un dictionnaire associant les codes d\'erreur à leur message client.',
      'Utiliser dict.get(code, message_par_defaut) pour gérer les codes inconnus.'
    ],
    examples: [
      {
        stdin: 'TRANSLATE_ERROR code=ERR_AUTH_JWT_EXPIRED',
        expected: 'SUPPORT_MESSAGE: [ERR_AUTH_JWT_EXPIRED] -> "Your session has expired. Please sign in again to continue safely."',
        note: 'Traduction bienveillante d\'une expiration de token JWT.'
      }
    ],
    tests: [
      {
        label: 'Erreur de passerelle de paiement 502',
        stdin: 'TRANSLATE_ERROR code=ERR_PAYMENT_GATEWAY_502',
        expected: 'SUPPORT_MESSAGE: [ERR_PAYMENT_GATEWAY_502] -> "The payment processor is temporarily unavailable. No money has been charged from your card."'
      },
      {
        label: 'Erreur de dépassement de quota de requêtes',
        stdin: 'TRANSLATE_ERROR code=ERR_RATE_LIMIT_EXCEEDED',
        expected: 'SUPPORT_MESSAGE: [ERR_RATE_LIMIT_EXCEEDED] -> "You have sent too many requests in a short time. Please take a break and retry in a few minutes."'
      },
      {
        label: 'Code d’erreur interne inconnu',
        stdin: 'TRANSLATE_ERROR code=ERR_INTERNAL_CORRUPTED_CACHE_POINTER',
        expected: 'SUPPORT_MESSAGE: [ERR_INTERNAL_CORRUPTED_CACHE_POINTER] -> "An unexpected issue occurred. Our engineering team has been notified. Please try again shortly."'
      },
      {
        label: 'Fichier trop lourd et compte verrouillé',
        stdin: 'TRANSLATE_ERROR code=ERR_FILE_TOO_LARGE\nTRANSLATE_ERROR code=ERR_ACCOUNT_LOCKED',
        expected: 'SUPPORT_MESSAGE: [ERR_FILE_TOO_LARGE] -> "Your uploaded file exceeds the 10 MB limit. Please compress it before re-uploading."\nSUPPORT_MESSAGE: [ERR_ACCOUNT_LOCKED] -> "Your account has been temporarily locked for security. Please reset your password or contact support."'
      }
    ],
    solution: `import sys
import re

MESSAGES = {
    'ERR_AUTH_JWT_EXPIRED': '"Your session has expired. Please sign in again to continue safely."',
    'ERR_DB_CONN_TIMEOUT': '"We are having trouble reaching our database. Please wait a moment and refresh the page."',
    'ERR_PAYMENT_GATEWAY_502': '"The payment processor is temporarily unavailable. No money has been charged from your card."',
    'ERR_RATE_LIMIT_EXCEEDED': '"You have sent too many requests in a short time. Please take a break and retry in a few minutes."',
    'ERR_FILE_TOO_LARGE': '"Your uploaded file exceeds the 10 MB limit. Please compress it before re-uploading."',
    'ERR_ACCOUNT_LOCKED': '"Your account has been temporarily locked for security. Please reset your password or contact support."'
}
DEFAULT_MSG = '"An unexpected issue occurred. Our engineering team has been notified. Please try again shortly."'

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    m = re.search(r'code=([^\\s]+)', lig)
    if not m:
        continue
    code = m.group(1).strip()
    msg = MESSAGES.get(code, DEFAULT_MSG)
    print(f'SUPPORT_MESSAGE: [{code}] -> {msg}')
`
  },
  {
    id: 'an3-c5-e2',
    chapter: 5,
    title: 'Matrice de sévérité d’incident et calcul de SLA de réponse',
    level: 'n2',
    language: 'python',
    goal: 'Déterminer le niveau de sévérité ITIL (SEV-1 à SEV-4) d’un incident technique et fixer les délais maximaux de prise en charge et de résolution.',
    brief: `<p>Dans les centres d'opérations réseau (NOC) et équipes SRE internationales, la matrice de sévérité croise l'<b>Impact</b> sur le métier et l'<b>Urgence</b> technique pour fixer contractuellement les fenêtres de réponse.<br>
Le script lit sur l'entrée standard des signalements d'incidents :<br>
<code>INCIDENT_EVAL id=&lt;id&gt; impact=&lt;CRITICAL|MAJOR|MODERATE|LOW&gt; urgency=&lt;IMMEDIATE|HIGH|NORMAL|LOW&gt;</code>.<br><br>
Matrice ITIL de classification :<br>
- <b>SEV-1 (Critical Outage)</b> : Si <code>impact=CRITICAL</code> et <code>urgency=IMMEDIATE</code>.<br>
  SLA : <code>RESPONSE=15m | RESOLUTION=4h</code><br>
- <b>SEV-2 (Major Incident)</b> : Si l'une des combinaisons suivantes est vérifiée :<br>
  * <code>impact=CRITICAL</code> et <code>urgency=HIGH</code><br>
  * <code>impact=MAJOR</code> et (<code>urgency=IMMEDIATE</code> ou <code>urgency=HIGH</code>)<br>
  * <code>impact=MODERATE</code> et <code>urgency=IMMEDIATE</code><br>
  SLA : <code>RESPONSE=30m | RESOLUTION=8h</code><br>
- <b>SEV-3 (Minor Incident)</b> : Si l'une des combinaisons suivantes est vérifiée :<br>
  * <code>impact=MODERATE</code> et (<code>urgency=HIGH</code> ou <code>urgency=NORMAL</code>)<br>
  * <code>impact=MAJOR</code> et <code>urgency=NORMAL</code><br>
  * <code>impact=LOW</code> et <code>urgency=IMMEDIATE</code><br>
  SLA : <code>RESPONSE=2h | RESOLUTION=24h</code><br>
- <b>SEV-4 (Cosmetic / Low Impact)</b> : Dans toutes les autres situations.<br>
  SLA : <code>RESPONSE=8h | RESOLUTION=72h</code><br><br>
Afficher :<br>
<code>INCIDENT_CLASSIFICATION: &lt;id&gt; -&gt; LEVEL=&lt;LEVEL&gt; | SLA_RESPONSE=&lt;RESPONSE&gt; | SLA_RESOLUTION=&lt;RESOLUTION&gt;</code></p>`,
    starter: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : classifier chaque incident selon la matrice ITIL
`,
    hints: [
      'Tester les règles de sévérité dans l\'ordre décroissant de gravité (SEV-1, puis SEV-2, puis SEV-3, puis SEV-4).',
      'Normaliser les valeurs d\'impact et d\'urgence en majuscules.'
    ],
    examples: [
      {
        stdin: 'INCIDENT_EVAL id=INC-401 impact=CRITICAL urgency=IMMEDIATE',
        expected: 'INCIDENT_CLASSIFICATION: INC-401 -> LEVEL=SEV-1 (Critical Outage) | SLA_RESPONSE=15m | SLA_RESOLUTION=4h',
        note: 'Impact critique et urgence immédiate : incident majeur SEV-1.'
      }
    ],
    tests: [
      {
        label: 'Incident SEV-2 majeur (Impact Major et Urgence High)',
        stdin: 'INCIDENT_EVAL id=INC-402 impact=MAJOR urgency=HIGH',
        expected: 'INCIDENT_CLASSIFICATION: INC-402 -> LEVEL=SEV-2 (Major Incident) | SLA_RESPONSE=30m | SLA_RESOLUTION=8h'
      },
      {
        label: 'Incident SEV-3 mineur',
        stdin: 'INCIDENT_EVAL id=INC-403 impact=MODERATE urgency=NORMAL',
        expected: 'INCIDENT_CLASSIFICATION: INC-403 -> LEVEL=SEV-3 (Minor Incident) | SLA_RESPONSE=2h | SLA_RESOLUTION=24h'
      },
      {
        label: 'Incident SEV-4 cosmétique et basse priorité',
        stdin: 'INCIDENT_EVAL id=INC-404 impact=LOW urgency=LOW',
        expected: 'INCIDENT_CLASSIFICATION: INC-404 -> LEVEL=SEV-4 (Cosmetic / Low Impact) | SLA_RESPONSE=8h | SLA_RESOLUTION=72h'
      },
      {
        label: 'Multiples incidents traités simultanément',
        stdin: 'INCIDENT_EVAL id=INC-801 impact=MODERATE urgency=IMMEDIATE\nINCIDENT_EVAL id=INC-802 impact=LOW urgency=IMMEDIATE',
        expected: 'INCIDENT_CLASSIFICATION: INC-801 -> LEVEL=SEV-2 (Major Incident) | SLA_RESPONSE=30m | SLA_RESOLUTION=8h\nINCIDENT_CLASSIFICATION: INC-802 -> LEVEL=SEV-3 (Minor Incident) | SLA_RESPONSE=2h | SLA_RESOLUTION=24h'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    m_id = re.search(r'id=([^\\s]+)', lig)
    m_imp = re.search(r'impact=([^\\s]+)', lig)
    m_urg = re.search(r'urgency=([^\\s]+)', lig)
    if not (m_id and m_imp and m_urg):
        continue
        
    iid = m_id.group(1)
    imp = m_imp.group(1).upper()
    urg = m_urg.group(1).upper()
    
    if imp == 'CRITICAL' and urg == 'IMMEDIATE':
        level = 'SEV-1 (Critical Outage)'
        res = '15m'
        resol = '4h'
    elif (imp == 'CRITICAL' and urg == 'HIGH') or \\
         (imp == 'MAJOR' and urg in {'IMMEDIATE', 'HIGH'}) or \\
         (imp == 'MODERATE' and urg == 'IMMEDIATE'):
        level = 'SEV-2 (Major Incident)'
        res = '30m'
        resol = '8h'
    elif (imp == 'MODERATE' and urg in {'HIGH', 'NORMAL'}) or \\
         (imp == 'MAJOR' and urg == 'NORMAL') or \\
         (imp == 'LOW' and urg == 'IMMEDIATE'):
        level = 'SEV-3 (Minor Incident)'
        res = '2h'
        resol = '24h'
    else:
        level = 'SEV-4 (Cosmetic / Low Impact)'
        res = '8h'
        resol = '72h'
        
    print(f'INCIDENT_CLASSIFICATION: {iid} -> LEVEL={level} | SLA_RESPONSE={res} | SLA_RESOLUTION={resol}')
`
  },
  {
    id: 'an3-c5-e3',
    chapter: 5,
    title: 'Validateur de Post-Mortem Blameless et chaîne des 5 Pourquoi',
    level: 'n3',
    language: 'python',
    goal: 'Auditer un rapport post-mortem d’ingénierie (RCA) pour garantir l’absence de culpabilisation individuelle (blameless) et la présence d’une analyse systémique par les 5 Pourquoi.',
    brief: `<p>La culture d'ingénierie moderne (Google SRE, Netflix, AWS) prescrit des <i>Blameless Post-Mortems</i> : les pannes ne sont jamais imputées à une erreur humaine individuelle mais à un manque de garde-fous systémiques (manque de tests, d'alertes ou d'automatisation).<br>
Le script reçoit sur l'entrée standard les blocs d'un post-mortem :<br>
<code>POSTMORTEM id=&lt;id&gt; author=&lt;author&gt;</code><br>
<code>WHY_1: &lt;cause 1&gt;</code><br>
<code>WHY_2: &lt;cause 2&gt;</code><br>
<code>WHY_3: &lt;cause 3&gt;</code><br>
<code>WHY_4: &lt;cause 4&gt;</code><br>
<code>WHY_5: &lt;cause 5 racine&gt;</code><br>
<code>REMEDIATION: &lt;action corrective&gt;</code><br><br>
Règles d'audit :<br>
1. <b>Principe Blameless</b> : Aucun des champs <code>WHY_1</code> à <code>WHY_5</code> ni <code>REMEDIATION</code> ne doit contenir de vocabulaire de culpabilisation individuelle : <code>blame</code>, <code>fault</code>, <code>careless</code>, <code>lazy</code>, <code>fired</code>, <code>stupid</code> (insensible à la casse, mots entiers). Si présent : <code>REJECTED | REASON=BLAMELESS_VIOLATION_DETECTED</code>.<br>
2. <b>Chaîne causale complète</b> : Les 5 questions (<code>WHY_1</code> à <code>WHY_5</code>) doivent toutes être présentes et non vides. Si une est manquante : <code>REJECTED | REASON=INCOMPLETE_5_WHYS_CHAIN</code>.<br>
3. <b>Action corrective systémique</b> : Le champ <code>REMEDIATION</code> doit mentionner au moins un mot-clé de protection automatisée de l'infrastructure : <code>automate</code>, <code>test</code>, <code>lint</code>, <code>monitor</code>, <code>alert</code>, <code>circuit breaker</code>, <code>canary</code>, <code>safeguard</code>. Si absent : <code>REJECTED | REASON=NON_SYSTEMIC_REMEDIATION</code>.<br><br>
Afficher :<br>
- Si conforme : <code>POSTMORTEM_EVAL: &lt;id&gt; -&gt; STATUS=APPROVED | BLAMELESS=TRUE | DEPTH=5_WHYS</code><br>
- Si non conforme : <code>POSTMORTEM_EVAL: &lt;id&gt; -&gt; STATUS=REJECTED | REASON=&lt;motif&gt;</code></p>`,
    starter: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : vérifier le respect du principe blameless et la rigueur des 5 pourquoi
`,
    hints: [
      'Rassembler toutes les lignes de texte pour effectuer la recherche de mots de blâme en une passe.',
      'Vérifier que les clés WHY_1 à WHY_5 existent toutes dans le dictionnaire extrait.'
    ],
    examples: [
      {
        stdin: 'POSTMORTEM id=PM-101 author=DevOpsLead\nWHY_1: The payment service failed to process transactions\nWHY_2: The database connection pool was exhausted\nWHY_3: A slow query locked the table for forty seconds\nWHY_4: The query lacked an index on the user_id column\nWHY_5: Automated migration checks did not flag unindexed foreign keys\nREMEDIATION: Add automated lint step in CI pipeline to require indexes on foreign keys',
        expected: 'POSTMORTEM_EVAL: PM-101 -> STATUS=APPROVED | BLAMELESS=TRUE | DEPTH=5_WHYS',
        note: 'Analyse systémique rigoureuse débouchant sur un garde-fou automatisé en CI.'
      }
    ],
    tests: [
      {
        label: 'Violation du principe blameless avec désignation de coupable',
        stdin: 'POSTMORTEM id=PM-102 author=Manager\nWHY_1: Production crashed\nWHY_2: Wrong config uploaded\nWHY_3: The intern was careless\nWHY_4: Lack of training\nWHY_5: Onboarding was rushed\nREMEDIATION: Train developers',
        expected: 'POSTMORTEM_EVAL: PM-102 -> STATUS=REJECTED | REASON=BLAMELESS_VIOLATION_DETECTED'
      },
      {
        label: 'Chaîne des 5 pourquoi incomplète (arrêt au 3ème pourquoi)',
        stdin: 'POSTMORTEM id=PM-103 author=SRETeam\nWHY_1: Memory leak caused OOM kill\nWHY_2: Buffer was not freed in loop\nWHY_3: Garbage collector was overwhelmed\nREMEDIATION: Add alert when memory usage exceeds 80%',
        expected: 'POSTMORTEM_EVAL: PM-103 -> STATUS=REJECTED | REASON=INCOMPLETE_5_WHYS_CHAIN'
      },
      {
        label: 'Remédiation non systémique sans garde-fou technique',
        stdin: 'POSTMORTEM id=PM-104 author=TechLead\nWHY_1: API returned 500 errors\nWHY_2: Certificate expired\nWHY_3: Certificate was renewed manually\nWHY_4: Nobody tracked the calendar date\nWHY_5: Renewal was not managed by infrastructure as code\nREMEDIATION: Remind engineers to write dates in their paper notebook',
        expected: 'POSTMORTEM_EVAL: PM-104 -> STATUS=REJECTED | REASON=NON_SYSTEMIC_REMEDIATION'
      },
      {
        label: 'Post-mortem validé avec remédiation par circuit breaker',
        stdin: 'POSTMORTEM id=PM-105 author=LeadArchitect\nWHY_1: Downstream inventory service cascaded failure\nWHY_2: HTTP calls queued up indefinitely\nWHY_3: Connection timeout was set to infinite\nWHY_4: Default client settings were used\nWHY_5: No resilient design pattern was enforced across services\nREMEDIATION: Implement circuit breaker with strict 2-second timeout and canary testing',
        expected: 'POSTMORTEM_EVAL: PM-105 -> STATUS=APPROVED | BLAMELESS=TRUE | DEPTH=5_WHYS'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

data = {}
pm_id = None
for lig in lignes:
    if lig.startswith('POSTMORTEM '):
        m = re.search(r'id=([^\\s]+)', lig)
        if m:
            pm_id = m.group(1)
    else:
        m = re.match(r'^([A-Z0-9_]+):\s*(.*)', lig)
        if m:
            data[m.group(1)] = m.group(2).strip()

if not pm_id:
    sys.exit(0)

# 1. Blameless check
blame_words = {'blame', 'fault', 'careless', 'lazy', 'fired', 'stupid'}
full_text = ' '.join(data.values())
has_blame = any(re.search(rf'\\b{w}\\b', full_text, re.I) for w in blame_words)
if has_blame:
    print(f'POSTMORTEM_EVAL: {pm_id} -> STATUS=REJECTED | REASON=BLAMELESS_VIOLATION_DETECTED')
    sys.exit(0)

# 2. 5 Whys check
for i in range(1, 6):
    k = f'WHY_{i}'
    if k not in data or not data[k]:
        print(f'POSTMORTEM_EVAL: {pm_id} -> STATUS=REJECTED | REASON=INCOMPLETE_5_WHYS_CHAIN')
        sys.exit(0)

# 3. Systemic remediation check
remediation = data.get('REMEDIATION', '')
systemic_kws = ['automate', 'test', 'lint', 'monitor', 'alert', 'circuit breaker', 'canary', 'safeguard']
has_systemic = any(kw in remediation.lower() for kw in systemic_kws)
if not has_systemic:
    print(f'POSTMORTEM_EVAL: {pm_id} -> STATUS=REJECTED | REASON=NON_SYSTEMIC_REMEDIATION')
    sys.exit(0)

print(f'POSTMORTEM_EVAL: {pm_id} -> STATUS=APPROVED | BLAMELESS=TRUE | DEPTH=5_WHYS')
`
  }
];
