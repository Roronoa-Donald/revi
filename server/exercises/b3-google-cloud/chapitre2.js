/**
 * Exercices du Chapitre 2 : Sécurité des Identités IAM, Comptes de Service & Stratégies d'Accès.
 * Préfixe : gcp3-c2-e
 */
'use strict';

module.exports = [
  {
    id: 'gcp3-c2-e1',
    chapter: 2,
    title: 'Évaluateur de Politiques et Liaisons IAM (Bindings & Least Privilege)',
    level: 'n1',
    language: 'python',
    goal: 'Analyser les liaisons de rôles IAM Google Cloud, vérifier les droits des membres et auditer la présence de rôles primitifs déconseillés.',
    brief: `<p>Google Cloud IAM associe des membres (principals) à des rôles selon des liaisons (bindings) :<br>
Classification des rôles :<br>
- Rôles primitifs historiques : <code>roles/viewer</code>, <code>roles/editor</code>, <code>roles/owner</code> (statut : <code>PRIMITIVE_DEPRECATED_FOR_PROD</code>).<br>
- Rôles prédéfinis : débutent par <code>roles/</code> et comportent un point (ex: <code>roles/storage.objectViewer</code>, <code>roles/compute.instanceAdmin.v1</code>) (statut : <code>PREDEFINED_RECOMMENDED</code>).<br><br>
Commandes lues sur STDIN :<br>
1. <code>BIND role=&lt;role&gt; member=&lt;type:id&gt;</code> :<br>
   Associe le membre au rôle et affiche :<br>
   <code>BIND_OK: role=&lt;role&gt; member=&lt;member&gt; type=&lt;status&gt;</code>.<br>
2. <code>CHECK_ROLE member=&lt;member&gt; role=&lt;role&gt;</code> :<br>
   - Si le membre possède le rôle : <code>ACCESS: GRANTED member=&lt;member&gt; role=&lt;role&gt;</code>.<br>
   - Sinon : <code>ACCESS: DENIED member=&lt;member&gt; role=&lt;role&gt;</code>.<br>
3. <code>AUDIT_PRIMITIVE_ROLES</code> :<br>
   - Si aucun membre n'a de rôle primitif : <code>AUDIT: OK (zero primitive roles in use)</code>.<br>
   - Sinon : <code>AUDIT: WARNING primitive_count=&lt;N&gt; members=&lt;m1,m2,...&gt;</code> (liste ordonnée).</p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : implémenter la gestion des bindings IAM et audit de moindre privilège
`,
    hints: [
      'Stockez les liaisons dans un ensemble ou un dictionnaire (role, member).',
      'Un rôle est primitif s il est exactement "roles/viewer", "roles/editor" ou "roles/owner".',
      'Triez la liste des membres dans l audit pour garantir une sortie déterministe.'
    ],
    examples: [
      {
        stdin: `BIND role=roles/storage.objectViewer member=user:alice@cloud.corp
CHECK_ROLE member=user:alice@cloud.corp role=roles/storage.objectViewer
AUDIT_PRIMITIVE_ROLES`,
        expected: `BIND_OK: role=roles/storage.objectViewer member=user:alice@cloud.corp type=PREDEFINED_RECOMMENDED
ACCESS: GRANTED member=user:alice@cloud.corp role=roles/storage.objectViewer
AUDIT: OK (zero primitive roles in use)`,
        note: 'Attribution conforme d un rôle prédéterminé respectant le moindre privilège.'
      }
    ],
    tests: [
      {
        label: 'Détection d accès refusé pour rôle non attribué',
        stdin: `BIND role=roles/compute.viewer member=user:bob@corp.com
CHECK_ROLE member=user:bob@corp.com role=roles/compute.admin`,
        expected: `BIND_OK: role=roles/compute.viewer member=user:bob@corp.com type=PREDEFINED_RECOMMENDED
ACCESS: DENIED member=user:bob@corp.com role=roles/compute.admin`
      },
      {
        label: 'Audit signalant des rôles primitifs dangereux en production',
        stdin: `BIND role=roles/editor member=user:dev@corp.com
BIND role=roles/owner member=serviceAccount:ci@proj.iam.gserviceaccount.com
AUDIT_PRIMITIVE_ROLES`,
        expected: `BIND_OK: role=roles/editor member=user:dev@corp.com type=PRIMITIVE_DEPRECATED_FOR_PROD
BIND_OK: role=roles/owner member=serviceAccount:ci@proj.iam.gserviceaccount.com type=PRIMITIVE_DEPRECATED_FOR_PROD
AUDIT: WARNING primitive_count=2 members=serviceAccount:ci@proj.iam.gserviceaccount.com,user:dev@corp.com`
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

bindings = set()
primitive_roles = {'roles/viewer', 'roles/editor', 'roles/owner'}

for line in lignes:
    parts = line.strip().split()
    cmd = parts[0]
    params = {}
    for p in parts[1:]:
        if '=' in p:
            k, v = p.split('=', 1)
            params[k] = v
            
    if cmd == 'BIND':
        role = params.get('role', '')
        member = params.get('member', '')
        bindings.add((role, member))
        status = 'PRIMITIVE_DEPRECATED_FOR_PROD' if role in primitive_roles else 'PREDEFINED_RECOMMENDED'
        print(f"BIND_OK: role={role} member={member} type={status}")
        
    elif cmd == 'CHECK_ROLE':
        member = params.get('member', '')
        role = params.get('role', '')
        if (role, member) in bindings:
            print(f"ACCESS: GRANTED member={member} role={role}")
        else:
            print(f"ACCESS: DENIED member={member} role={role}")
            
    elif cmd == 'AUDIT_PRIMITIVE_ROLES':
        bad_members = set()
        for r, m in bindings:
            if r in primitive_roles:
                bad_members.add(m)
        if not bad_members:
            print("AUDIT: OK (zero primitive roles in use)")
        else:
            sorted_m = sorted(bad_members)
            print(f"AUDIT: WARNING primitive_count={len(bad_members)} members={','.join(sorted_m)}")
`
  },
  {
    id: 'gcp3-c2-e2',
    chapter: 2,
    title: 'Générateur et Linter de Rôles Personnalisés (Custom Roles)',
    level: 'n2',
    language: 'python',
    goal: 'Valider la structure et la liste de permissions atomiques d\'un rôle IAM personnalisé Google Cloud.',
    brief: `<p>Un rôle personnalisé (Custom Role) GCP permet d'assembler des permissions atomiques précises.<br><br>
Règles de conformité :<br>
- <code>stage</code> doit appartenir à <code>ALPHA</code>, <code>BETA</code>, <code>GA</code>, <code>DEPRECATED</code>.<br>
- Chaque permission doit respecter le format standard à 3 segments : <code>&lt;service&gt;.&lt;resource&gt;.&lt;action&gt;</code> (ex: <code>compute.instances.create</code>, <code>storage.buckets.get</code>).<br>
- Les permissions d'administration d'organisation (ex: commençant par <code>resourcemanager.organizations.</code>) sont strictement interdites dans un projet.<br><br>
Commande STDIN :<br>
<code>CUSTOM_ROLE_LINT id=&lt;id&gt; stage=&lt;stage&gt; perms=&lt;p1,p2,...&gt;</code>.<br>
Sorties :<br>
- Si valide : <code>ROLE_LINT: id=&lt;id&gt; stage=&lt;stage&gt; perms_count=&lt;N&gt; status=VALID</code><br>
- Si stage invalide : <code>ROLE_LINT: id=&lt;id&gt; status=INVALID reason=INVALID_STAGE</code><br>
- Si permission mal formée (ne comporte pas exactement 2 points) : <code>ROLE_LINT: id=&lt;id&gt; status=INVALID reason=MALFORMED_PERMISSION perm=&lt;p&gt;</code><br>
- Si permission d'organisation interdite : <code>ROLE_LINT: id=&lt;id&gt; status=INVALID reason=FORBIDDEN_ORG_PERMISSION perm=&lt;p&gt;</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : implémenter le linter de Custom Roles IAM
`,
    hints: [
      'Validez d abord le stage dans ("ALPHA", "BETA", "GA", "DEPRECATED").',
      'Découpez les permissions sur la virgule et testez p.count(".") == 2 et non p.startswith("resourcemanager.organizations.").'
    ],
    examples: [
      {
        stdin: 'CUSTOM_ROLE_LINT id=devCustomStorage stage=GA perms=storage.buckets.get,storage.objects.list,storage.objects.get',
        expected: 'ROLE_LINT: id=devCustomStorage stage=GA perms_count=3 status=VALID',
        note: 'Rôle personnalisé conforme avec 3 permissions atomiques Cloud Storage.'
      }
    ],
    tests: [
      {
        label: 'Rejet stage invalide',
        stdin: 'CUSTOM_ROLE_LINT id=roleDev stage=PRODUCTION perms=compute.instances.get',
        expected: 'ROLE_LINT: id=roleDev status=INVALID reason=INVALID_STAGE'
      },
      {
        label: 'Rejet permission mal formée',
        stdin: 'CUSTOM_ROLE_LINT id=roleDev stage=GA perms=compute.instances,storage.buckets.get',
        expected: 'ROLE_LINT: id=roleDev status=INVALID reason=MALFORMED_PERMISSION perm=compute.instances'
      },
      {
        label: 'Rejet permission d organisation au niveau projet',
        stdin: 'CUSTOM_ROLE_LINT id=roleSec stage=BETA perms=compute.instances.list,resourcemanager.organizations.setIamPolicy',
        expected: 'ROLE_LINT: id=roleSec status=INVALID reason=FORBIDDEN_ORG_PERMISSION perm=resourcemanager.organizations.setIamPolicy'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]
valid_stages = {'ALPHA', 'BETA', 'GA', 'DEPRECATED'}

for line in lignes:
    params = {}
    for p in line.strip().split():
        if '=' in p:
            k, v = p.split('=', 1)
            params[k] = v
            
    r_id = params.get('id', '')
    stage = params.get('stage', '').upper()
    perms_str = params.get('perms', '')
    perms = [p.strip() for p in perms_str.split(',') if p.strip()]
    
    if stage not in valid_stages:
        print(f"ROLE_LINT: id={r_id} status=INVALID reason=INVALID_STAGE")
        continue
        
    invalid_reason = None
    invalid_perm = None
    
    for perm in perms:
        if perm.startswith('resourcemanager.organizations.'):
            invalid_reason = 'FORBIDDEN_ORG_PERMISSION'
            invalid_perm = perm
            break
        if perm.count('.') != 2 or any(len(part) == 0 for part in perm.split('.')):
            invalid_reason = 'MALFORMED_PERMISSION'
            invalid_perm = perm
            break
            
    if invalid_reason:
        print(f"ROLE_LINT: id={r_id} status=INVALID reason={invalid_reason} perm={invalid_perm}")
    else:
        print(f"ROLE_LINT: id={r_id} stage={stage} perms_count={len(perms)} status=VALID")
`
  },
  {
    id: 'gcp3-c2-e3',
    chapter: 2,
    title: 'Gouvernance des Comptes de Service et Rotation de Clés',
    level: 'n3',
    language: 'python',
    goal: 'Auditer l\'âge des clés de comptes de service Google Cloud et promouvoir les identités sans clé (Workload Identity).',
    brief: `<p>Dans Google Cloud, les comptes de service (Service Accounts - SA) permettent aux applications d'interagir avec les API :<br>
Nom de compte standard : <code>&lt;nom&gt;@&lt;projet&gt;.iam.gserviceaccount.com</code>.<br><br>
Types d'authentification :<br>
1. <code>WORKLOAD_IDENTITY</code> : identité fédérée sans clé JSON stockée (recommandation Google, risque = ZERO).<br>
2. Clé de compte de service utilisateur (User-Managed Key) : clé au format JSON exportable.<br>
   Règle de conformité de sécurité CIS GCP : rotation obligatoire tous les 90 jours maximum.<br>
   - Si <code>age_days &gt; 90</code> : <code>EXPIRED_REQUIRES_ROTATION</code><br>
   - Si <code>age_days &lt;= 90</code> : <code>ACTIVE_COMPLIANT</code><br><br>
Commandes lues sur STDIN :<br>
1. <code>AUDIT_SA email=&lt;sa_email&gt; auth_mode=WORKLOAD_IDENTITY</code> :<br>
   <code>SA_AUDIT: email=&lt;email&gt; mode=WORKLOAD_IDENTITY status=HIGHLY_SECURE risk=ZERO</code><br>
2. <code>AUDIT_SA email=&lt;sa_email&gt; auth_mode=SERVICE_ACCOUNT_KEY key_id=&lt;id&gt; age_days=&lt;N&gt;</code> :<br>
   <code>SA_AUDIT: email=&lt;email&gt; key_id=&lt;id&gt; age_days=&lt;N&gt; status=&lt;ACTIVE_COMPLIANT|EXPIRED_REQUIRES_ROTATION&gt;</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : implémenter l'audit de sécurité des comptes de service
`,
    hints: [
      'Branchez selon auth_mode == "WORKLOAD_IDENTITY" ou "SERVICE_ACCOUNT_KEY".',
      'Comparez int(age_days) <= 90 pour le statut de conformité.'
    ],
    examples: [
      {
        stdin: `AUDIT_SA email=gke-app@proj-prod.iam.gserviceaccount.com auth_mode=WORKLOAD_IDENTITY
AUDIT_SA email=legacy-app@proj-prod.iam.gserviceaccount.com auth_mode=SERVICE_ACCOUNT_KEY key_id=key-abc-123 age_days=45`,
        expected: `SA_AUDIT: email=gke-app@proj-prod.iam.gserviceaccount.com mode=WORKLOAD_IDENTITY status=HIGHLY_SECURE risk=ZERO
SA_AUDIT: email=legacy-app@proj-prod.iam.gserviceaccount.com key_id=key-abc-123 age_days=45 status=ACTIVE_COMPLIANT`,
        note: 'Comparatif d un compte fédéré sans clé et d un compte avec clé conforme récente.'
      }
    ],
    tests: [
      {
        label: 'Clé de compte de service expirée dépassant 90 jours',
        stdin: 'AUDIT_SA email=backup-sa@proj-prod.iam.gserviceaccount.com auth_mode=SERVICE_ACCOUNT_KEY key_id=key-xyz-999 age_days=120',
        expected: 'SA_AUDIT: email=backup-sa@proj-prod.iam.gserviceaccount.com key_id=key-xyz-999 age_days=120 status=EXPIRED_REQUIRES_ROTATION'
      },
      {
        label: 'Clé exactement au seuil de 90 jours',
        stdin: 'AUDIT_SA email=ci-runner@proj-prod.iam.gserviceaccount.com auth_mode=SERVICE_ACCOUNT_KEY key_id=key-limit-90 age_days=90',
        expected: 'SA_AUDIT: email=ci-runner@proj-prod.iam.gserviceaccount.com key_id=key-limit-90 age_days=90 status=ACTIVE_COMPLIANT'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for line in lignes:
    params = {}
    for p in line.strip().split():
        if '=' in p:
            k, v = p.split('=', 1)
            params[k] = v
            
    email = params.get('email', '')
    mode = params.get('auth_mode', '')
    
    if mode == 'WORKLOAD_IDENTITY':
        print(f"SA_AUDIT: email={email} mode=WORKLOAD_IDENTITY status=HIGHLY_SECURE risk=ZERO")
    elif mode == 'SERVICE_ACCOUNT_KEY':
        k_id = params.get('key_id', '')
        age = int(params.get('age_days', 0))
        status = 'ACTIVE_COMPLIANT' if age <= 90 else 'EXPIRED_REQUIRES_ROTATION'
        print(f"SA_AUDIT: email={email} key_id={k_id} age_days={age} status={status}")
`
  }
];
