/**
 * server/exercises/b3-cloud-aws/chapitre2.js — Exercices du Chapitre 2
 * Chapitre 2 : Sécurité des Identités IAM, Politiques JSON & Gouvernance Multi-Comptes
 */

module.exports = [
  {
    id: 'aws3-c2-e1',
    chapter: 2,
    title: 'Moteur d\'Évaluation de Politiques IAM JSON (Deny / Allow / Default Deny)',
    level: 'n1',
    language: 'python',
    goal: 'Implémenter l\'algorithme d\'évaluation officiel des politiques d\'autorisation IAM d\'AWS.',
    brief: `<p>Dans AWS IAM, chaque requête API est évaluée selon un ordre strict :<br><br>
1. <strong>Default Deny</strong> : Par défaut, toute requête est refusée.<br>
2. <strong>Explicit Deny prioritaire</strong> : Si au moins une déclaration applicable comporte <code>Effect: Deny</code>, la décision finale est <code>DENY</code>, quoi qu'il arrive.<br>
3. <strong>Explicit Allow</strong> : Si aucune déclaration ne refuse la requête et qu'au moins une déclaration comporte <code>Effect: Allow</code>, la décision est <code>ALLOW</code>.<br>
4. <strong>Refus implicite</strong> : Si aucune déclaration ne s'applique, la décision finale reste <code>DENY</code>.<br><br>
Les actions supportent le préfixe avec joker (ex: <code>s3:Get*</code> correspond à <code>s3:GetObject</code>, <code>s3:GetBucketLocation</code> ; <code>*</code> correspond à tout).<br><br>
Format d'entrée STDIN :<br>
<code>ACTION=&lt;action_demandée&gt; STATEMENTS=&lt;Effect:Action_pattern;Effect:Action_pattern;...&gt;</code><br><br>
Sortie : <code>IAM_EVAL: action=&lt;act&gt; decision=&lt;ALLOW|DENY&gt; reason=&lt;EXPLICIT_DENY|EXPLICIT_ALLOW|DEFAULT_DENY&gt;</code>.</p>`,
    starter: `import sys
import fnmatch

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : évaluer les autorisations IAM
`,
    hints: [
      "Analysez scrupuleusement le format d'entrée STDIN.",
      "Respectez la casse et les séparateurs attendus en sortie."
    ],
    examples: [
      {
        stdin: 'ACTION=s3:GetObject STATEMENTS=Allow:s3:Get*;Deny:s3:PutObject',
        expected: 'IAM_EVAL: action=s3:GetObject decision=ALLOW reason=EXPLICIT_ALLOW',
        note: "Cas d'usage nominal."
      }
    ],
    tests: [
      {
        label: 'Deny explicite prioritaire sur un Allow générique',
        stdin: 'ACTION=s3:DeleteBucket STATEMENTS=Allow:s3:*;Deny:s3:DeleteBucket',
        expected: 'IAM_EVAL: action=s3:DeleteBucket decision=DENY reason=EXPLICIT_DENY\n'
      },
      {
        label: 'Refus par défaut (aucune politique correspondante)',
        stdin: 'ACTION=ec2:RunInstances STATEMENTS=Allow:s3:GetObject;Allow:s3:ListBucket',
        expected: 'IAM_EVAL: action=ec2:RunInstances decision=DENY reason=DEFAULT_DENY\n'
      },
      {
        label: 'Allow complet avec joker universel (*)',
        stdin: 'ACTION=iam:CreateUser STATEMENTS=Allow:*',
        expected: 'IAM_EVAL: action=iam:CreateUser decision=ALLOW reason=EXPLICIT_ALLOW\n'
      },
      {
        label: 'Deny avec joker sur les suppressions',
        stdin: 'ACTION=dynamodb:DeleteItem STATEMENTS=Allow:dynamodb:*;Deny:*:Delete*',
        expected: 'IAM_EVAL: action=dynamodb:DeleteItem decision=DENY reason=EXPLICIT_DENY\n'
      }
    ],
    solution: `import sys
import fnmatch

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for ligne in lignes:
    if not ligne.startswith("ACTION="):
        continue
    tokens = ligne.split()
    params = {}
    for t in tokens:
        if "=" in t:
            k, v = t.split("=", 1)
            params[k.upper()] = v

    action = params.get("ACTION", "")
    statements_raw = params.get("STATEMENTS", "").split(";")

    explicit_deny = False
    explicit_allow = False

    for stmt in statements_raw:
        if not stmt or ":" not in stmt:
            continue
        parts = stmt.split(":", 1)
        effect = parts[0].strip().title()
        pattern = parts[1].strip()

        if fnmatch.fnmatch(action, pattern):
            if effect == "Deny":
                explicit_deny = True
                break
            elif effect == "Allow":
                explicit_allow = True

    if explicit_deny:
        print(f"IAM_EVAL: action={action} decision=DENY reason=EXPLICIT_DENY")
    elif explicit_allow:
        print(f"IAM_EVAL: action={action} decision=ALLOW reason=EXPLICIT_ALLOW")
    else:
        print(f"IAM_EVAL: action={action} decision=DENY reason=DEFAULT_DENY")
`
  },
  {
    id: 'aws3-c2-e2',
    chapter: 2,
    title: 'Auditeur de Clés d\'Accès IAM & Détecteur d\'Inactivité / Rotation',
    level: 'n2',
    language: 'python',
    goal: 'Auditer le rapport d\'identifiants IAM (Credential Report) et identifier les clés compromises, inactives ou périmées.',
    brief: `<p>Les bonnes pratiques de sécurité AWS exigent une rotation régulière des clés d'accès programmatiques (Access Keys) :<br><br>
Règles d'audit d'une clé :<br>
1. <strong>Format valide</strong> : Une clé d'accès IAM permanente commence obligatoirement par le préfixe <code>AKIA</code> et comporte exactement 20 caractères alphanumériques majuscules.<br>
Si ce n'est pas le cas -> <code>ALERT_MALFORMED_KEY</code>.<br>
2. <strong>Statut inactif</strong> : Si <code>STATUS=Inactive</code> -> <code>NOTICE_KEY_INACTIVE</code> (ne pose pas de risque immédiat mais doit être supprimée).<br>
3. <strong>Périmètre d'âge (Rotation)</strong> :<br>
- Si <code>STATUS=Active</code> et <code>AGE_DAYS &gt; 90</code> -> <code>ALERT_ROTATION_REQUIRED</code> (dépassement du seuil de 90 jours préconisé par AWS).<br>
- Si <code>STATUS=Active</code> et <code>AGE_DAYS &lt;= 90</code> -> <code>KEY_COMPLIANT</code>.<br><br>
Entrée STDIN : <code>KEY_AUDIT USER=&lt;username&gt; KEY_ID=&lt;key&gt; STATUS=&lt;Active|Inactive&gt; AGE_DAYS=&lt;n&gt;</code>.<br>
Sortie : <code>AUDIT: user=&lt;u&gt; key=&lt;k&gt; status=&lt;s&gt; age_days=&lt;n&gt; verdict=&lt;VERDICT&gt;</code>.</p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : auditer les clés d'accès IAM
`,
    hints: [
      "Analysez scrupuleusement le format d'entrée STDIN.",
      "Respectez la casse et les séparateurs attendus en sortie."
    ],
    examples: [
      {
        stdin: 'KEY_AUDIT USER=dev-alice KEY_ID=AKIAIOSFODNN7EXAMPLE STATUS=Active AGE_DAYS=45',
        expected: 'AUDIT: user=dev-alice key=AKIAIOSFODNN7EXAMPLE status=Active age_days=45 verdict=KEY_COMPLIANT',
        note: "Cas d'usage nominal."
      }
    ],
    tests: [
      {
        label: 'Clé active ayant dépassé 90 jours (120 jours)',
        stdin: 'KEY_AUDIT USER=admin-bob KEY_ID=AKIA1122334455667788 STATUS=Active AGE_DAYS=120',
        expected: 'AUDIT: user=admin-bob key=AKIA1122334455667788 status=Active age_days=120 verdict=ALERT_ROTATION_REQUIRED\n'
      },
      {
        label: 'Clé inactive conservée (40 jours)',
        stdin: 'KEY_AUDIT USER=svc-app KEY_ID=AKIA9988776655443322 STATUS=Inactive AGE_DAYS=40',
        expected: 'AUDIT: user=svc-app key=AKIA9988776655443322 status=Inactive age_days=40 verdict=NOTICE_KEY_INACTIVE\n'
      },
      {
        label: 'Clé malformée (préfixe invalide)',
        stdin: 'KEY_AUDIT USER=hacker KEY_ID=ASIA1122334455667788 STATUS=Active AGE_DAYS=10',
        expected: 'AUDIT: user=hacker key=ASIA1122334455667788 status=Active age_days=10 verdict=ALERT_MALFORMED_KEY\n'
      },
      {
        label: 'Clé exactement au seuil limite de 90 jours',
        stdin: 'KEY_AUDIT USER=ops-charlie KEY_ID=AKIAABCDEF0123456789 STATUS=Active AGE_DAYS=90',
        expected: 'AUDIT: user=ops-charlie key=AKIAABCDEF0123456789 status=Active age_days=90 verdict=KEY_COMPLIANT\n'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for ligne in lignes:
    if not ligne.startswith("KEY_AUDIT "):
        continue
    tokens = ligne.split()
    params = {}
    for t in tokens[1:]:
        if "=" in t:
            k, v = t.split("=", 1)
            params[k.upper()] = v

    user = params.get("USER", "")
    key_id = params.get("KEY_ID", "")
    status = params.get("STATUS", "Active")
    age_days = int(params.get("AGE_DAYS", "0"))

    # Vérification format
    if not (key_id.startswith("AKIA") and len(key_id) == 20 and key_id.isalnum()):
        verdict = "ALERT_MALFORMED_KEY"
    elif status == "Inactive":
        verdict = "NOTICE_KEY_INACTIVE"
    elif age_days > 90:
        verdict = "ALERT_ROTATION_REQUIRED"
    else:
        verdict = "KEY_COMPLIANT"

    print(f"AUDIT: user={user} key={key_id} status={status} age_days={age_days} verdict={verdict}")
`
  },
  {
    id: 'aws3-c2-e3',
    chapter: 2,
    title: 'Évaluateur de Politiques de Contrôle des Services AWS Organizations (SCP)',
    level: 'n2',
    language: 'python',
    goal: 'Vérifier si une action est autorisée à travers l\'arborescence hiérarchique d\'unités organisationnelles (OUs) avec des SCPs.',
    brief: `<p>Les <strong>Service Control Policies (SCPs)</strong> dans AWS Organizations définissent les garde-fous maximaux pour les comptes membres :<br><br>
Règles d'évaluation des SCPs :<br>
1. Les SCPs ne confèrent pas de droits, elles définissent une <strong>limite supérieure</strong> de permissions.<br>
2. Pour qu'une action soit autorisée sur un compte cible :<br>
- Aucun niveau de l'arborescence (du Root jusqu'au compte) ne doit comporter de <code>Deny</code> explicite sur l'action.<br>
- CHAQUE niveau traversé (Root, OUs intermédiaires, Compte) doit explicitement comporter un <code>Allow</code> sur l'action (politique <code>FullAWSAccess</code> par défaut).<br>
3. Si un seul niveau bloque l'action (absence d'Allow ou présence d'un Deny), l'action est interdite (<code>BLOCKED</code>).<br><br>
Entrée STDIN :<br>
<code>SCP_CHECK ACTION=&lt;action&gt; HIERARCHY=&lt;Niveau1:Allow/Deny;Niveau2:Allow/Deny;...&gt;</code>.<br><br>
Sortie : Si autorisée : <code>SCP_RESULT: action=&lt;act&gt; status=ALLOWED</code>.<br>
Si bloquée : <code>SCP_RESULT: action=&lt;act&gt; status=BLOCKED blocked_by=&lt;Niveau&gt; reason=&lt;EXPLICIT_DENY|NO_ALLOW_FOUND&gt;</code>.</p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : vérifier l'autorisation à travers la hiérarchie SCP
`,
    hints: [
      "Analysez scrupuleusement le format d'entrée STDIN.",
      "Respectez la casse et les séparateurs attendus en sortie."
    ],
    examples: [
      {
        stdin: 'SCP_CHECK ACTION=ec2:StopInstances HIERARCHY=Root:Allow;CoreOU:Allow;Account:Allow',
        expected: 'SCP_RESULT: action=ec2:StopInstances status=ALLOWED',
        note: "Cas d'usage nominal."
      }
    ],
    tests: [
      {
        label: 'Blocage par Deny explicite au niveau de l OU Core',
        stdin: 'SCP_CHECK ACTION=s3:DeleteBucket HIERARCHY=Root:Allow;CoreOU:Deny;Account:Allow',
        expected: 'SCP_RESULT: action=s3:DeleteBucket status=BLOCKED blocked_by=CoreOU reason=EXPLICIT_DENY\n'
      },
      {
        label: 'Blocage par absence d Allow au niveau Root',
        stdin: 'SCP_CHECK ACTION=dynamodb:PutItem HIERARCHY=Root:None;AppOU:Allow;Account:Allow',
        expected: 'SCP_RESULT: action=dynamodb:PutItem status=BLOCKED blocked_by=Root reason=NO_ALLOW_FOUND\n'
      },
      {
        label: 'Blocage par Deny sur le compte final',
        stdin: 'SCP_CHECK ACTION=iam:CreateUser HIERARCHY=Root:Allow;DevOU:Allow;Account:Deny',
        expected: 'SCP_RESULT: action=iam:CreateUser status=BLOCKED blocked_by=Account reason=EXPLICIT_DENY\n'
      },
      {
        label: 'Arborescence à 4 niveaux validée',
        stdin: 'SCP_CHECK ACTION=ec2:RunInstances HIERARCHY=Root:Allow;EuropeOU:Allow;ProdOU:Allow;Account:Allow',
        expected: 'SCP_RESULT: action=ec2:RunInstances status=ALLOWED\n'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for ligne in lignes:
    if not ligne.startswith("SCP_CHECK "):
        continue
    tokens = ligne.split()
    params = {}
    for t in tokens[1:]:
        if "=" in t:
            k, v = t.split("=", 1)
            params[k.upper()] = v

    action = params.get("ACTION", "")
    hierarchy = params.get("HIERARCHY", "").split(";")

    allowed = True
    blocked_level = ""
    blocked_reason = ""

    for item in hierarchy:
        if not item or ":" not in item:
            continue
        level, effect = item.split(":", 1)
        level = level.strip()
        effect = effect.strip().title()

        if effect == "Deny":
            allowed = False
            blocked_level = level
            blocked_reason = "EXPLICIT_DENY"
            break
        elif effect != "Allow":
            allowed = False
            blocked_level = level
            blocked_reason = "NO_ALLOW_FOUND"
            break

    if allowed:
        print(f"SCP_RESULT: action={action} status=ALLOWED")
    else:
        print(f"SCP_RESULT: action={action} status=BLOCKED blocked_by={blocked_level} reason={blocked_reason}")
`
  }
];
