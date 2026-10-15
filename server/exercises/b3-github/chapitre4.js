/**
 * Exercices Chapitre 4 — Git & GitHub B3.
 * Workflows Collaboratifs en Entreprise & Gouvernance GitHub.
 */
'use strict';

module.exports = [
  {
    id: 'gh3-c4-e1',
    chapter: 4,
    title: 'Validateur de conformité de workflow de branches (Git Flow vs GitHub Flow)',
    level: 'n1',
    language: 'python',
    goal: 'Auditer la création d’une branche et ses opérations selon les règles de gouvernance de Git Flow ou GitHub Flow.',
    brief: `<p>En entreprise, la gestion des branches doit suivre des règles strictes pour garantir la stabilité de la production :<br><br>
Règles du modèle <strong>GIT_FLOW</strong> :<br>
- Les branches <code>feature/*</code> doivent obligatoirement être créées à partir de <code>develop</code>.<br>
- Les branches <code>release/*</code> doivent partir de <code>develop</code>.<br>
- Les branches <code>hotfix/*</code> doivent partir de <code>main</code>.<br>
- Tout push direct (<code>direct_push=OUI</code>) sur <code>main</code> ou <code>develop</code> est formellement interdit (<code>VIOLATION_DIRECT_PUSH_PROTECTED_BRANCH</code>).<br><br>
Règles du modèle <strong>GITHUB_FLOW</strong> :<br>
- Toutes les branches de fonctionnalités/correctifs partent de <code>main</code>.<br>
- Tout push direct sur <code>main</code> est interdit.<br><br>
Le script lit sur l'entrée standard des événements d'embranchement :<br>
<code>BRANCH_EVENT wf=&lt;GIT_FLOW|GITHUB_FLOW&gt; branch=&lt;nom&gt; base=&lt;base_branch&gt; direct_push=&lt;OUI|NON&gt;</code>.<br><br>
Pour chaque ligne, afficher :<br>
<code>AUDIT branch={branch} status={CONFORME | motif_violation}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : auditer les branches selon les règles de workflow
`,
    hints: [
      'Vérifier d’abord l’interdiction de push direct sur les branches protégées.',
      'Tester la conformité de la branche de départ (base) selon le préfixe du nom de branche.'
    ],
    examples: [
      {
        stdin: 'BRANCH_EVENT wf=GIT_FLOW branch=feature/auth base=develop direct_push=NON\nBRANCH_EVENT wf=GIT_FLOW branch=feature/auth base=main direct_push=NON',
        expected: 'AUDIT branch=feature/auth status=CONFORME\nAUDIT branch=feature/auth status=BRANCHE_BASE_INVALIDE_ATTENDU_DEVELOP',
        note: 'Dans Git Flow, une feature doit partir de develop, pas de main.'
      }
    ],
    tests: [
      {
        label: 'Push direct proscrit sur branche protégée',
        stdin: 'BRANCH_EVENT wf=GIT_FLOW branch=main base=main direct_push=OUI\nBRANCH_EVENT wf=GITHUB_FLOW branch=main base=main direct_push=OUI',
        expected: 'AUDIT branch=main status=VIOLATION_DIRECT_PUSH_PROTECTED_BRANCH\nAUDIT branch=main status=VIOLATION_DIRECT_PUSH_PROTECTED_BRANCH'
      },
      {
        label: 'Conformité hotfix et release dans Git Flow',
        stdin: 'BRANCH_EVENT wf=GIT_FLOW branch=hotfix/patch-1 base=main direct_push=NON\nBRANCH_EVENT wf=GIT_FLOW branch=hotfix/patch-2 base=develop direct_push=NON\nBRANCH_EVENT wf=GIT_FLOW branch=release/v1.0 base=develop direct_push=NON',
        expected: 'AUDIT branch=hotfix/patch-1 status=CONFORME\nAUDIT branch=hotfix/patch-2 status=BRANCHE_BASE_INVALIDE_ATTENDU_MAIN\nAUDIT branch=release/v1.0 status=CONFORME'
      },
      {
        label: 'GitHub Flow avec branche dérivée de main',
        stdin: 'BRANCH_EVENT wf=GITHUB_FLOW branch=feat-login base=main direct_push=NON\nBRANCH_EVENT wf=GITHUB_FLOW branch=feat-login base=develop direct_push=NON',
        expected: 'AUDIT branch=feat-login status=CONFORME\nAUDIT branch=feat-login status=BRANCHE_BASE_INVALIDE_ATTENDU_MAIN'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    m = re.search(r'wf=([^\\s]+)\\s+branch=([^\\s]+)\\s+base=([^\\s]+)\\s+direct_push=([^\\s]+)', lig)
    if not m:
        continue
    wf, branch, base, dpush = m.groups()
    
    if dpush == 'OUI':
        if (wf == 'GIT_FLOW' and branch in ('main', 'develop')) or (wf == 'GITHUB_FLOW' and branch == 'main'):
            print(f"AUDIT branch={branch} status=VIOLATION_DIRECT_PUSH_PROTECTED_BRANCH")
            continue
            
    if wf == 'GIT_FLOW':
        if branch.startswith('feature/'):
            status = 'CONFORME' if base == 'develop' else 'BRANCHE_BASE_INVALIDE_ATTENDU_DEVELOP'
        elif branch.startswith('release/'):
            status = 'CONFORME' if base == 'develop' else 'BRANCHE_BASE_INVALIDE_ATTENDU_DEVELOP'
        elif branch.startswith('hotfix/'):
            status = 'CONFORME' if base == 'main' else 'BRANCHE_BASE_INVALIDE_ATTENDU_MAIN'
        else:
            status = 'CONFORME'
    elif wf == 'GITHUB_FLOW':
        status = 'CONFORME' if base == 'main' else 'BRANCHE_BASE_INVALIDE_ATTENDU_MAIN'
    else:
        status = 'CONFORME'
        
    print(f"AUDIT branch={branch} status={status}")
`
  },
  {
    id: 'gh3-c4-e2',
    chapter: 4,
    title: 'Contrôleur de règles de protection de branches (Branch Protection Rules)',
    level: 'n2',
    language: 'python',
    goal: 'Appliquer les critères de fusion de Pull Request (approbations requises, statuts CI, signature GPG).',
    brief: `<p>Sur GitHub Enterprise, les branches de production sont verrouillées par des <strong>Branch Protection Rules</strong>.<br><br>
Critères nécessaires pour autoriser la fusion (Merge) dans <code>main</code> :<br>
1. <code>approvals &gt;= min_approvals</code> (nombre d'approbations de relecteurs humains requises, ex: 2).<br>
2. <code>ci_status == 'PASS'</code> (les pipelines d'intégration continue doivent impérativement être au vert).<br>
3. Si <code>require_signed == 'OUI'</code> : le commit doit obligatoirement être signé cryptographiquement (<code>gpg_signed == 'OUI'</code>).<br>
4. Si <code>linear_history == 'OUI'</code> : le type de merge demandé ne doit pas être <code>MERGE_COMMIT</code> (doit être <code>SQUASH</code> ou <code>REBASE</code>).<br><br>
Le script lit la configuration puis les requêtes de fusion :<br>
<code>CONFIG min_approvals=&lt;n&gt; require_signed=&lt;OUI|NON&gt; linear_history=&lt;OUI|NON&gt;</code><br>
<code>MERGE_REQ pr=&lt;id&gt; approvals=&lt;n&gt; ci_status=&lt;PASS|FAIL&gt; gpg_signed=&lt;OUI|NON&gt; merge_type=&lt;MERGE_COMMIT|SQUASH|REBASE&gt;</code>.<br><br>
Pour chaque PR, afficher :<br>
<code>PR_MERGE pr={id} status={AUTHORIZED|BLOCKED} reason={OK|motif_du_premier_blocage}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : évaluer les règles de protection de branche GitHub
`,
    hints: [
      'Vérifier les critères dans l’ordre de la spécification : approvals, ci_status, signature, historique linéaire.',
      'Dès qu’un critère échoue, le statut est BLOCKED.'
    ],
    examples: [
      {
        stdin: 'CONFIG min_approvals=2 require_signed=OUI linear_history=OUI\nMERGE_REQ pr=42 approvals=2 ci_status=PASS gpg_signed=OUI merge_type=SQUASH',
        expected: 'PR_MERGE pr=42 status=AUTHORIZED reason=OK',
        note: 'Tous les critères de protection sont satisfaits.'
      }
    ],
    tests: [
      {
        label: 'Rejet pour approbations insuffisantes ou CI en échec',
        stdin: 'CONFIG min_approvals=2 require_signed=NON linear_history=NON\nMERGE_REQ pr=10 approvals=1 ci_status=PASS gpg_signed=NON merge_type=MERGE_COMMIT\nMERGE_REQ pr=11 approvals=2 ci_status=FAIL gpg_signed=NON merge_type=MERGE_COMMIT',
        expected: 'PR_MERGE pr=10 status=BLOCKED reason=APPROVALS_INSUFFISANTS\nPR_MERGE pr=11 status=BLOCKED reason=CI_CHECKS_FAILED'
      },
      {
        label: 'Rejet pour signature GPG manquante',
        stdin: 'CONFIG min_approvals=1 require_signed=OUI linear_history=NON\nMERGE_REQ pr=20 approvals=1 ci_status=PASS gpg_signed=NON merge_type=MERGE_COMMIT',
        expected: 'PR_MERGE pr=20 status=BLOCKED reason=SIGNATURE_GPG_REQUISE'
      },
      {
        label: 'Rejet pour merge commit sur branche à historique linéaire strict',
        stdin: 'CONFIG min_approvals=1 require_signed=NON linear_history=OUI\nMERGE_REQ pr=30 approvals=1 ci_status=PASS gpg_signed=NON merge_type=MERGE_COMMIT\nMERGE_REQ pr=31 approvals=1 ci_status=PASS gpg_signed=NON merge_type=REBASE',
        expected: 'PR_MERGE pr=30 status=BLOCKED reason=HISTORIQUE_LINEAIRE_EXIGE\nPR_MERGE pr=31 status=AUTHORIZED reason=OK'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

min_app = 1
req_signed = 'NON'
lin_hist = 'NON'

for lig in lignes:
    if lig.startswith('CONFIG'):
        m = re.search(r'min_approvals=([^\\s]+)\\s+require_signed=([^\\s]+)\\s+linear_history=([^\\s]+)', lig)
        if m:
            min_app = int(m.group(1))
            req_signed = m.group(2)
            lin_hist = m.group(3)
    elif lig.startswith('MERGE_REQ'):
        m = re.search(r'pr=([^\\s]+)\\s+approvals=([^\\s]+)\\s+ci_status=([^\\s]+)\\s+gpg_signed=([^\\s]+)\\s+merge_type=([^\\s]+)', lig)
        if not m:
            continue
        pr_id, app_str, ci, gpg, mtype = m.groups()
        apps = int(app_str)
        
        if apps < min_app:
            status = 'BLOCKED'
            reason = 'APPROVALS_INSUFFISANTS'
        elif ci != 'PASS':
            status = 'BLOCKED'
            reason = 'CI_CHECKS_FAILED'
        elif req_signed == 'OUI' and gpg != 'OUI':
            status = 'BLOCKED'
            reason = 'SIGNATURE_GPG_REQUISE'
        elif lin_hist == 'OUI' and mtype == 'MERGE_COMMIT':
            status = 'BLOCKED'
            reason = 'HISTORIQUE_LINEAIRE_EXIGE'
        else:
            status = 'AUTHORIZED'
            reason = 'OK'
            
        print(f"PR_MERGE pr={pr_id} status={status} reason={reason}")
`
  },
  {
    id: 'gh3-c4-e3',
    chapter: 4,
    title: 'Analyseur sémantique de commits selon Conventional Commits',
    level: 'n3',
    language: 'python',
    goal: 'Vérifier la conformité des messages de commit selon la spécification formelle Conventional Commits 1.0.0.',
    brief: `<p>La norme <strong>Conventional Commits</strong> structure les messages pour automatiser le versionnage sémantique (SemVer) et la génération de CHANGELOG.<br><br>
Format standard :<br>
<code>&lt;type&gt;[scope optionnel][!]: &lt;description&gt;</code><br><br>
Règles de validation :<br>
1. <code>type</code> doit appartenir à la liste autorisée : <code>feat, fix, docs, refactor, test, chore, perf, ci</code>.<br>
2. Le <code>scope</code> (si présent) doit être entouré de parenthèses : ex: <code>feat(api): ...</code>.<br>
3. Le caractère <code>!</code> avant le deux-points ou la présence de <code>BREAKING CHANGE</code> dans le message indique une rupture de compatibilité (<code>BREAKING=OUI</code>).<br>
4. Le séparateur obligatoire est deux-points suivi d'un espace <code>": "</code>.<br>
5. La <code>description</code> ne doit pas être vide.<br><br>
Le script lit sur l'entrée standard des messages au format :<br>
<code>COMMIT_MSG id=&lt;id&gt; msg=&lt;texte_du_message&gt;</code>.<br><br>
Pour chaque message, afficher :<br>
- Si conforme : <code>CONVENTIONAL_AUDIT id={id} valid=OUI type={type} scope={scope|NONE} breaking={OUI|NON}</code><br>
- Si non conforme : <code>CONVENTIONAL_AUDIT id={id} valid=NON error={TYPE_INCONNU|FORMAT_INVALIDE|DESCRIPTION_VIDE}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : valider le format Conventional Commits
`,
    hints: [
      'Utiliser une regex : r"^([a-z]+)(?:\\(([a-zA-Z0-9_-]+)\\))?(!)?:\s+(.+)$"',
      'Vérifier si le type extrait est dans les types autorisés.'
    ],
    examples: [
      {
        stdin: 'COMMIT_MSG id=1 msg=feat(auth): ajout authentification JWT\nCOMMIT_MSG id=2 msg=fix!: correction faille critique',
        expected: 'CONVENTIONAL_AUDIT id=1 valid=OUI type=feat scope=auth breaking=NON\nCONVENTIONAL_AUDIT id=2 valid=OUI type=fix scope=NONE breaking=OUI',
        note: 'Validation du format avec et sans scope, détection de breaking change.'
      }
    ],
    tests: [
      {
        label: 'Message sans scope et type inconnu',
        stdin: 'COMMIT_MSG id=10 msg=docs: mise a jour du README\nCOMMIT_MSG id=11 msg=update: modifications diverses',
        expected: 'CONVENTIONAL_AUDIT id=10 valid=OUI type=docs scope=NONE breaking=NON\nCONVENTIONAL_AUDIT id=11 valid=NON error=TYPE_INCONNU'
      },
      {
        label: 'Format invalide sans espace après deux-points ou sans séparateur',
        stdin: 'COMMIT_MSG id=20 msg=feat:nospace\nCOMMIT_MSG id=21 msg=juste un message sans type',
        expected: 'CONVENTIONAL_AUDIT id=20 valid=NON error=FORMAT_INVALIDE\nCONVENTIONAL_AUDIT id=21 valid=NON error=FORMAT_INVALIDE'
      },
      {
        label: 'Breaking change via mention textuelle BREAKING CHANGE',
        stdin: 'COMMIT_MSG id=30 msg=refactor(core): refonte complete du routeur BREAKING CHANGE',
        expected: 'CONVENTIONAL_AUDIT id=30 valid=OUI type=refactor scope=core breaking=OUI'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

ALLOWED_TYPES = {'feat', 'fix', 'docs', 'refactor', 'test', 'chore', 'perf', 'ci'}

for lig in lignes:
    if 'msg=' not in lig:
        continue
    parts = lig.split('msg=', 1)
    meta = parts[0].strip()
    msg = parts[1].strip()
    
    cid = meta.replace('COMMIT_MSG', '').replace('id=', '').strip()
    
    if ': ' not in msg:
        print(f"CONVENTIONAL_AUDIT id={cid} valid=NON error=FORMAT_INVALIDE")
        continue
        
    prefix, desc = msg.split(': ', 1)
    if not desc or not desc.strip():
        print(f"CONVENTIONAL_AUDIT id={cid} valid=NON error=DESCRIPTION_VIDE")
        continue
        
    prefix = prefix.strip()
    is_breaking = 'OUI' if ('!' in prefix or 'BREAKING CHANGE' in msg) else 'NON'
    if prefix.endswith('!'):
        prefix = prefix[:-1]
        
    scope_val = 'NONE'
    if '(' in prefix and prefix.endswith(')'):
        ctype, scope_part = prefix.split('(', 1)
        scope_val = scope_part[:-1]
    else:
        ctype = prefix
        
    if ctype not in ALLOWED_TYPES:
        print(f"CONVENTIONAL_AUDIT id={cid} valid=NON error=TYPE_INCONNU")
        continue
        
    print(f"CONVENTIONAL_AUDIT id={cid} valid=OUI type={ctype} scope={scope_val} breaking={is_breaking}")
`
  }
];
