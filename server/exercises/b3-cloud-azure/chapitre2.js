/**
 * Exercices du Chapitre 2 : Identité Microsoft Entra ID (Azure AD), RBAC & Gouvernance.
 * Préfixe : az3-c2-e
 */
'use strict';

module.exports = [
  {
    id: 'az3-c2-e1',
    chapter: 2,
    title: 'Évaluateur de permissions Azure RBAC',
    level: 'n1',
    language: 'python',
    goal: 'Analyser une définition de rôle Azure RBAC et déterminer si des opérations administratives sont autorisées ou refusées.',
    brief: `<p>Azure RBAC (Role-Based Access Control) applique une logique d'autorisation stricte : une action est autorisée si elle correspond à au moins une directive dans <code>Actions</code> (supportant le caractère générique <code>*</code>) et ne correspond à <strong>aucune</strong> directive dans <code>NotActions</code>.<br><br>
Rôles Azure prédéfinis pris en charge :<br>
- <code>Owner</code> :<br>
  - Actions : <code>["*"]</code><br>
  - NotActions : <code>[]</code><br>
- <code>Contributor</code> :<br>
  - Actions : <code>["*"]</code><br>
  - NotActions : <code>["Microsoft.Authorization/*/Delete", "Microsoft.Authorization/*/Write", "Microsoft.Resources/subscriptions/resourceGroups/delete"]</code><br>
- <code>Reader</code> :<br>
  - Actions : <code>["*/read"]</code><br>
  - NotActions : <code>[]</code><br>
- <code>VM_Operator</code> :<br>
  - Actions : <code>["Microsoft.Compute/virtualMachines/start/*", "Microsoft.Compute/virtualMachines/restart/*", "Microsoft.Compute/virtualMachines/read"]</code><br>
  - NotActions : <code>["Microsoft.Compute/virtualMachines/delete"]</code><br><br>
Format d'entrée :<br>
La première ligne définit le rôle assigné :<br>
<code>ROLE &lt;nom_du_role&gt;</code><br>
Les lignes suivantes soumettent des opérations ARM à tester :<br>
<code>CHECK_ACTION &lt;action_path&gt;</code><br><br>
Pour chaque action :<br>
- Si l'action est autorisée : <code>ACTION &lt;action_path&gt; -&gt; ALLOWED</code><br>
- Si l'action est refusée : <code>ACTION &lt;action_path&gt; -&gt; DENIED</code><br>
- Si le rôle est inconnu au départ, afficher : <code>ROLE_ERROR: Unknown role '&lt;nom_du_role&gt;'</code> et arrêter.</p>`,
    starter: `import sys
import fnmatch

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : implémenter la vérification Azure RBAC avec wildcards
`,
    hints: [
      'Le module Python `fnmatch` permet d\'évaluer simplement les règles avec wildcards `*`.',
      'Penser à convertir en minuscules pour garantir l\'insensibilité à la casse.'
    ],
    examples: [
      {
        stdin: 'ROLE VM_Operator\nCHECK_ACTION Microsoft.Compute/virtualMachines/restart/action\nCHECK_ACTION Microsoft.Compute/virtualMachines/delete',
        expected: 'ACTION Microsoft.Compute/virtualMachines/restart/action -> ALLOWED\nACTION Microsoft.Compute/virtualMachines/delete -> DENIED',
        note: 'Le rôle VM_Operator autorise le redémarrage mais refuse la suppression.'
      }
    ],
    tests: [
      {
        label: 'Contrôle du rôle Reader sur actions read et write',
        stdin: 'ROLE Reader\nCHECK_ACTION Microsoft.Compute/virtualMachines/read\nCHECK_ACTION Microsoft.Storage/storageAccounts/read\nCHECK_ACTION Microsoft.Compute/virtualMachines/write',
        expected: 'ACTION Microsoft.Compute/virtualMachines/read -> ALLOWED\nACTION Microsoft.Storage/storageAccounts/read -> ALLOWED\nACTION Microsoft.Compute/virtualMachines/write -> DENIED'
      },
      {
        label: 'Contrôle du rôle Contributor avec exclusion NotActions',
        stdin: 'ROLE Contributor\nCHECK_ACTION Microsoft.Compute/virtualMachines/write\nCHECK_ACTION Microsoft.Authorization/roleAssignments/write\nCHECK_ACTION Microsoft.Resources/subscriptions/resourceGroups/delete',
        expected: 'ACTION Microsoft.Compute/virtualMachines/write -> ALLOWED\nACTION Microsoft.Authorization/roleAssignments/write -> DENIED\nACTION Microsoft.Resources/subscriptions/resourceGroups/delete -> DENIED'
      },
      {
        label: 'Contrôle du rôle Owner qui autorise tout',
        stdin: 'ROLE Owner\nCHECK_ACTION Microsoft.Authorization/roleAssignments/write\nCHECK_ACTION Microsoft.Compute/virtualMachines/delete',
        expected: 'ACTION Microsoft.Authorization/roleAssignments/write -> ALLOWED\nACTION Microsoft.Compute/virtualMachines/delete -> ALLOWED'
      },
      {
        label: 'Rôle inconnu',
        stdin: 'ROLE SuperAdmin\nCHECK_ACTION Microsoft.Compute/virtualMachines/read',
        expected: 'ROLE_ERROR: Unknown role \'SuperAdmin\''
      }
    ],
    solution: `import sys
import fnmatch

BUILTIN_ROLES = {
    "Owner": {
        "actions": ["*"],
        "not_actions": []
    },
    "Contributor": {
        "actions": ["*"],
        "not_actions": [
            "Microsoft.Authorization/*/Delete",
            "Microsoft.Authorization/*/Write",
            "Microsoft.Resources/subscriptions/resourceGroups/delete"
        ]
    },
    "Reader": {
        "actions": ["*/read"],
        "not_actions": []
    },
    "VM_Operator": {
        "actions": [
            "Microsoft.Compute/virtualMachines/start/*",
            "Microsoft.Compute/virtualMachines/restart/*",
            "Microsoft.Compute/virtualMachines/read"
        ],
        "not_actions": [
            "Microsoft.Compute/virtualMachines/delete"
        ]
    }
}

lines = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]
if not lines:
    sys.exit(0)

first = lines[0]
if not first.startswith("ROLE "):
    sys.exit(0)

role_name = first[5:].strip()
if role_name not in BUILTIN_ROLES:
    print(f"ROLE_ERROR: Unknown role '{role_name}'")
    sys.exit(0)

role_def = BUILTIN_ROLES[role_name]
actions = [a.lower() for a in role_def["actions"]]
not_actions = [na.lower() for na in role_def["not_actions"]]

for line in lines[1:]:
    if not line.startswith("CHECK_ACTION "):
        continue
    act = line[len("CHECK_ACTION "):].strip()
    act_lower = act.lower()
    
    # Doit matcher au moins une action
    matched_action = any(fnmatch.fnmatch(act_lower, p) for p in actions)
    
    # Ne doit matcher aucune not_action
    matched_not = any(fnmatch.fnmatch(act_lower, p) for p in not_actions)
    
    if matched_action and not matched_not:
        print(f"ACTION {act} -> ALLOWED")
    else:
        print(f"ACTION {act} -> DENIED")
`
  },
  {
    id: 'az3-c2-e2',
    chapter: 2,
    title: 'Auditeur de conformité Azure Policy',
    level: 'n2',
    language: 'python',
    goal: 'Auditer un ensemble de ressources Cloud Azure contre des règles de gouvernance déclaratives et détecter les non-conformités.',
    brief: `<p>Azure Policy permet d'imposer des normes de gouvernance organisationnelle au niveau des abonnements et groupes de ressources.<br><br>
Règles de conformité définies pour l'organisation :<br>
1. <code>allowedLocations</code> : la localisation géographique (<code>location</code>) doit obligatoirement être l'une des suivantes : <code>["westeurope", "northeurope", "francecentral"]</code>.<br>
   Violation : <code>DENY: Invalid location '&lt;loc&gt;'</code><br>
2. <code>requireTags</code> : la ressource doit obligatoirement inclure les deux tags <code>Environment</code> et <code>CostCenter</code>.<br>
   Pour chaque tag manquant : <code>AUDIT: Missing required tag '&lt;nom_tag&gt;'</code><br>
3. <code>disallowedSKUs</code> : les SKUs surdimensionnées ou hors catalogue ne sont pas autorisées : <code>["Standard_M128ms", "Standard_G5"]</code>.<br>
   Violation : <code>DENY: Disallowed SKU '&lt;sku&gt;'</code><br><br>
Format d'entrée : chaque ligne déclare une ressource sous la forme :<br>
<code>RESOURCE id=&lt;id&gt; type=&lt;type&gt; location=&lt;loc&gt; sku=&lt;sku&gt; tags=&lt;k1:v1,k2:v2&gt;</code> (si aucun tag : <code>tags=none</code>).<br><br>
Format de sortie attendu pour chaque ressource :<br>
- Si aucune violation :<br>
  <code>AUDIT id=&lt;id&gt; STATUS=COMPLIANT</code><br>
- Si des violations existent :<br>
  <code>AUDIT id=&lt;id&gt; STATUS=NON_COMPLIANT issues=[&lt;issue1&gt;; &lt;issue2&gt;]</code> (dans l'ordre de détection : location, SKU, puis tags manquants).</p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : analyser les ressources et relever les manquements Azure Policy
`,
    hints: [
      'Extraire chaque champ clé=valeur de la ligne de déclaration.',
      'Construire la liste des anomalies dans l\'ordre prescrit avant d\'émettre le diagnostic.'
    ],
    examples: [
      {
        stdin: 'RESOURCE id=vm-web-01 type=Microsoft.Compute/virtualMachines location=westeurope sku=Standard_D4s_v5 tags=Environment:prod,CostCenter:IT-401',
        expected: 'AUDIT id=vm-web-01 STATUS=COMPLIANT',
        note: 'Ressource entièrement conforme aux règles de localisation, SKU et tags.'
      }
    ],
    tests: [
      {
        label: 'Ressource valide et conforme sur France Central',
        stdin: 'RESOURCE id=vm-api-02 type=Microsoft.Compute/virtualMachines location=francecentral sku=Standard_B2s tags=Environment:dev,CostCenter:DEV-102',
        expected: 'AUDIT id=vm-api-02 STATUS=COMPLIANT'
      },
      {
        label: 'Localisation interdite et tags manquants',
        stdin: 'RESOURCE id=st-backup-01 type=Microsoft.Storage/storageAccounts location=eastus sku=Standard_LRS tags=Environment:test',
        expected: 'AUDIT id=st-backup-01 STATUS=NON_COMPLIANT issues=[DENY: Invalid location \'eastus\'; AUDIT: Missing required tag \'CostCenter\']'
      },
      {
        label: 'SKU interdite et aucun tag',
        stdin: 'RESOURCE id=vm-big-01 type=Microsoft.Compute/virtualMachines location=francecentral sku=Standard_M128ms tags=none',
        expected: 'AUDIT id=vm-big-01 STATUS=NON_COMPLIANT issues=[DENY: Disallowed SKU \'Standard_M128ms\'; AUDIT: Missing required tag \'Environment\'; AUDIT: Missing required tag \'CostCenter\']'
      },
      {
        label: 'Conformité sur North Europe avec SKU valide',
        stdin: 'RESOURCE id=sql-core-01 type=Microsoft.Sql/servers location=northeurope sku=GP_Gen5_4 tags=CostCenter:FIN-10,Environment:stage',
        expected: 'AUDIT id=sql-core-01 STATUS=COMPLIANT'
      }
    ],
    solution: `import sys

ALLOWED_LOCATIONS = {"westeurope", "northeurope", "francecentral"}
DISALLOWED_SKUS = {"Standard_M128ms", "Standard_G5"}

for line in sys.stdin.read().splitlines():
    line = line.strip()
    if not line or not line.startswith("RESOURCE "):
        continue
    
    parts = line[len("RESOURCE "):].split()
    props = {}
    for p in parts:
        if "=" in p:
            k, v = p.split("=", 1)
            props[k] = v
            
    res_id = props.get("id", "unknown")
    loc = props.get("location", "")
    sku = props.get("sku", "")
    raw_tags = props.get("tags", "")
    
    tags = {}
    if raw_tags and raw_tags != "none":
        for item in raw_tags.split(","):
            if ":" in item:
                tk, tv = item.split(":", 1)
                tags[tk.strip()] = tv.strip()
                
    issues = []
    # 1. Location
    if loc not in ALLOWED_LOCATIONS:
        issues.append(f"DENY: Invalid location '{loc}'")
        
    # 2. SKU
    if sku in DISALLOWED_SKUS:
        issues.append(f"DENY: Disallowed SKU '{sku}'")
        
    # 3. Tags
    for req_tag in ["Environment", "CostCenter"]:
        if req_tag not in tags:
            issues.append(f"AUDIT: Missing required tag '{req_tag}'")
            
    if not issues:
        print(f"AUDIT id={res_id} STATUS=COMPLIANT")
    else:
        issues_str = "; ".join(issues)
        print(f"AUDIT id={res_id} STATUS=NON_COMPLIANT issues=[{issues_str}]")
`
  },
  {
    id: 'az3-c2-e3',
    chapter: 2,
    title: 'Analyseur de sécurité Azure Key Vault & Expiration de secrets',
    level: 'n3',
    language: 'python',
    goal: 'Auditer les paramètres de sécurité d’un coffre-fort Azure Key Vault et évaluer l’état d’expiration de ses secrets et certificats.',
    brief: `<p>Azure Key Vault centralise la gestion des clés cryptographiques, secrets et certificats. La sécurisation du coffre exige l'activation de la suppression réversible (Soft-Delete) et de la protection contre la purge (Purge Protection).<br><br>
Format d'entrée :<br>
Ligne 1 : Configuration du coffre :<br>
<code>VAULT name=&lt;nom&gt; soft_delete=&lt;enabled|disabled&gt; purge_protection=&lt;enabled|disabled&gt; auth_mode=&lt;rbac|access_policies&gt; current_day=&lt;int&gt;</code><br>
Lignes suivantes : Déclaration des secrets :<br>
<code>SECRET name=&lt;nom&gt; expires_at=&lt;int&gt;</code> (si pas de date d'expiration : <code>expires_at=0</code>).<br><br>
Règles d'audit du coffre (VAULT) :<br>
- Si <code>soft_delete != enabled</code> : relever <code>CRITICAL: Soft-delete disabled</code><br>
- Si <code>purge_protection != enabled</code> : relever <code>WARNING: Purge protection disabled</code><br>
- Mode d'autorisation : afficher <code>AUTH=&lt;auth_mode.upper()&gt;</code><br>
Afficher :<br>
<code>VAULT_SECURITY name=&lt;nom&gt; AUTH=&lt;AUTH&gt; ISSUES=[&lt;issues&gt;]</code> (ou <code>ISSUES=[NONE]</code> si aucune anomalie).<br><br>
Règles d'audit des secrets (SECRET) :<br>
- Si <code>expires_at == 0</code> : <code>SECRET &lt;nom&gt; -&gt; STATUS=NO_EXPIRY_RISK</code><br>
- Si <code>expires_at &lt;= current_day</code> : <code>SECRET &lt;nom&gt; -&gt; STATUS=EXPIRED</code><br>
- Si <code>0 &lt; (expires_at - current_day) &lt;= 30</code> : <code>SECRET &lt;nom&gt; -&gt; STATUS=EXPIRING_SOON (days_left=&lt;N&gt;)</code><br>
- Sinon : <code>SECRET &lt;nom&gt; -&gt; STATUS=VALID (days_left=&lt;N&gt;)</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : auditer la configuration du Key Vault et l'état des secrets
`,
    hints: [
      'Parser la ligne VAULT pour récupérer current_day et les indicateurs de sécurité.',
      'Comparer expires_at à current_day pour chaque secret selon les 4 cas prescrits.'
    ],
    examples: [
      {
        stdin: 'VAULT name=kv-prod-we soft_delete=enabled purge_protection=enabled auth_mode=rbac current_day=100\nSECRET name=db-password expires_at=125\nSECRET name=api-key expires_at=0',
        expected: 'VAULT_SECURITY name=kv-prod-we AUTH=RBAC ISSUES=[NONE]\nSECRET db-password -> STATUS=EXPIRING_SOON (days_left=25)\nSECRET api-key -> STATUS=NO_EXPIRY_RISK',
        note: 'Coffre sécurisé, secret expirant dans 25 jours et secret sans date d\'expiration relevé.'
      }
    ],
    tests: [
      {
        label: 'Coffre hautement sécurisé avec secrets valides et expirant bientôt',
        stdin: 'VAULT name=kv-prod-we soft_delete=enabled purge_protection=enabled auth_mode=rbac current_day=100\nSECRET name=db-password expires_at=125\nSECRET name=api-key expires_at=0\nSECRET name=ssl-cert expires_at=200',
        expected: 'VAULT_SECURITY name=kv-prod-we AUTH=RBAC ISSUES=[NONE]\nSECRET db-password -> STATUS=EXPIRING_SOON (days_left=25)\nSECRET api-key -> STATUS=NO_EXPIRY_RISK\nSECRET ssl-cert -> STATUS=VALID (days_left=100)'
      },
      {
        label: 'Coffre vulnérable sans soft delete ni purge protection',
        stdin: 'VAULT name=kv-dev-test soft_delete=disabled purge_protection=disabled auth_mode=access_policies current_day=50\nSECRET name=token expires_at=45',
        expected: 'VAULT_SECURITY name=kv-dev-test AUTH=ACCESS_POLICIES ISSUES=[CRITICAL: Soft-delete disabled; WARNING: Purge protection disabled]\nSECRET token -> STATUS=EXPIRED'
      },
      {
        label: 'Secret expirant le jour même',
        stdin: 'VAULT name=kv-core soft_delete=enabled purge_protection=enabled auth_mode=rbac current_day=100\nSECRET name=today-secret expires_at=100',
        expected: 'VAULT_SECURITY name=kv-core AUTH=RBAC ISSUES=[NONE]\nSECRET today-secret -> STATUS=EXPIRED'
      }
    ],
    solution: `import sys

lines = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]
if not lines:
    sys.exit(0)

current_day = 0

for line in lines:
    if line.startswith("VAULT "):
        props = {}
        for part in line[len("VAULT "):].split():
            if "=" in part:
                k, v = part.split("=", 1)
                props[k] = v
        vname = props.get("name", "unknown")
        sd = props.get("soft_delete", "disabled")
        pp = props.get("purge_protection", "disabled")
        am = props.get("auth_mode", "rbac").upper()
        current_day = int(props.get("current_day", 0))
        
        issues = []
        if sd != "enabled":
            issues.append("CRITICAL: Soft-delete disabled")
        if pp != "enabled":
            issues.append("WARNING: Purge protection disabled")
            
        issues_str = "; ".join(issues) if issues else "NONE"
        print(f"VAULT_SECURITY name={vname} AUTH={am} ISSUES=[{issues_str}]")
        
    elif line.startswith("SECRET "):
        props = {}
        for part in line[len("SECRET "):].split():
            if "=" in part:
                k, v = part.split("=", 1)
                props[k] = v
        sname = props.get("name", "unknown")
        exp = int(props.get("expires_at", 0))
        
        if exp == 0:
            print(f"SECRET {sname} -> STATUS=NO_EXPIRY_RISK")
        elif exp <= current_day:
            print(f"SECRET {sname} -> STATUS=EXPIRED")
        elif 0 < (exp - current_day) <= 30:
            print(f"SECRET {sname} -> STATUS=EXPIRING_SOON (days_left={exp - current_day})")
        else:
            print(f"SECRET {sname} -> STATUS=VALID (days_left={exp - current_day})")
`
  }
];
