'use strict';

module.exports = [
  {
    "id": "az3-c2-e1",
    "chapter": 2,
    "title": "Évaluateur de permissions Azure RBAC",
    "level": "n1",
    "language": "analyse",
    "goal": "Analyser une définition de rôle Azure RBAC et déterminer si des opérations administratives sont autorisées ou refusées.",
    "brief": "<p>Azure RBAC (Role-Based Access Control) applique une logique d'autorisation stricte : une action est autorisée si elle correspond à au moins une directive dans <code>Actions</code> (supportant le caractère générique <code>*</code>) et ne correspond à <strong>aucune</strong> directive dans <code>NotActions</code>.<br><br>\nRôles Azure prédéfinis pris en charge :<br>\n- <code>Owner</code> :<br>\n  - Actions : <code>[\"*\"]</code><br>\n  - NotActions : <code>[]</code><br>\n- <code>Contributor</code> :<br>\n  - Actions : <code>[\"*\"]</code><br>\n  - NotActions : <code>[\"Microsoft.Authorization/*/Delete\", \"Microsoft.Authorization/*/Write\", \"Microsoft.Resources/subscriptions/resourceGroups/delete\"]</code><br>\n- <code>Reader</code> :<br>\n  - Actions : <code>[\"*/read\"]</code><br>\n  - NotActions : <code>[]</code><br>\n- <code>VM_Operator</code> :<br>\n  - Actions : <code>[\"Microsoft.Compute/virtualMachines/start/*\", \"Microsoft.Compute/virtualMachines/restart/*\", \"Microsoft.Compute/virtualMachines/read\"]</code><br>\n  - NotActions : <code>[\"Microsoft.Compute/virtualMachines/delete\"]</code><br><br>\nFormat d'entrée :<br>\nLa première ligne définit le rôle assigné :<br>\n<code>ROLE &lt;nom_du_role&gt;</code><br>\nLes lignes suivantes soumettent des opérations ARM à tester :<br>\n<code>CHECK_ACTION &lt;action_path&gt;</code><br><br>\nPour chaque action :<br>\n- Si l'action est autorisée : <code>ACTION &lt;action_path&gt; -&gt; ALLOWED</code><br>\n- Si l'action est refusée : <code>ACTION &lt;action_path&gt; -&gt; DENIED</code><br>\n- Si le rôle est inconnu au départ, afficher : <code>ROLE_ERROR: Unknown role '&lt;nom_du_role&gt;'</code> et arrêter.</p>",
    "starter": "# Grille d'analyse (az3-c2-e1) — Évaluateur de permissions Azure RBAC\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Contrôle du rôle Reader sur actions read et write]\n# Données : ROLE Reader\n# Données : CHECK_ACTION Microsoft.Compute/virtualMachines/read\n# Données : CHECK_ACTION Microsoft.Storage/storageAccounts/read\n# Données : CHECK_ACTION Microsoft.Compute/virtualMachines/write\nA_COMPLETER\n\n[Cas 2 — Contrôle du rôle Contributor avec exclusion NotActions]\n# Données : ROLE Contributor\n# Données : CHECK_ACTION Microsoft.Compute/virtualMachines/write\n# Données : CHECK_ACTION Microsoft.Authorization/roleAssignments/write\n# Données : CHECK_ACTION Microsoft.Resources/subscriptions/resourceGroups/delete\nA_COMPLETER\n\n[Cas 3 — Contrôle du rôle Owner qui autorise tout]\n# Données : ROLE Owner\n# Données : CHECK_ACTION Microsoft.Authorization/roleAssignments/write\n# Données : CHECK_ACTION Microsoft.Compute/virtualMachines/delete\nA_COMPLETER\n\n[Cas 4 — Rôle inconnu]\n# Données : ROLE SuperAdmin\n# Données : CHECK_ACTION Microsoft.Compute/virtualMachines/read\nA_COMPLETER\n",
    "hints": [
      "Le module Python `fnmatch` permet d'évaluer simplement les règles avec wildcards `*`.",
      "Penser à convertir en minuscules pour garantir l'insensibilité à la casse."
    ],
    "examples": [
      {
        "stdin": "ROLE VM_Operator\nCHECK_ACTION Microsoft.Compute/virtualMachines/restart/action\nCHECK_ACTION Microsoft.Compute/virtualMachines/delete",
        "expected": "ACTION Microsoft.Compute/virtualMachines/restart/action -> ALLOWED\nACTION Microsoft.Compute/virtualMachines/delete -> DENIED",
        "note": "Le rôle VM_Operator autorise le redémarrage mais refuse la suppression."
      }
    ],
    "tests": [
      {
        "label": "Contrôle du rôle Reader sur actions read et write",
        "stdin": "cas:1",
        "expected": "ACTION Microsoft.Compute/virtualMachines/read -> ALLOWED\nACTION Microsoft.Storage/storageAccounts/read -> ALLOWED\nACTION Microsoft.Compute/virtualMachines/write -> DENIED"
      },
      {
        "label": "Contrôle du rôle Contributor avec exclusion NotActions",
        "stdin": "cas:2",
        "expected": "ACTION Microsoft.Compute/virtualMachines/write -> ALLOWED\nACTION Microsoft.Authorization/roleAssignments/write -> DENIED\nACTION Microsoft.Resources/subscriptions/resourceGroups/delete -> DENIED"
      },
      {
        "label": "Contrôle du rôle Owner qui autorise tout",
        "stdin": "cas:3",
        "expected": "ACTION Microsoft.Authorization/roleAssignments/write -> ALLOWED\nACTION Microsoft.Compute/virtualMachines/delete -> ALLOWED"
      },
      {
        "label": "Rôle inconnu",
        "stdin": "cas:4",
        "expected": "ROLE_ERROR: Unknown role 'SuperAdmin'"
      }
    ],
    "solution": "[Exemple]\nACTION Microsoft.Compute/virtualMachines/restart/action -> ALLOWED\nACTION Microsoft.Compute/virtualMachines/delete -> DENIED\n\n[Cas 1 — Contrôle du rôle Reader sur actions read et write]\nACTION Microsoft.Compute/virtualMachines/read -> ALLOWED\nACTION Microsoft.Storage/storageAccounts/read -> ALLOWED\nACTION Microsoft.Compute/virtualMachines/write -> DENIED\n\n[Cas 2 — Contrôle du rôle Contributor avec exclusion NotActions]\nACTION Microsoft.Compute/virtualMachines/write -> ALLOWED\nACTION Microsoft.Authorization/roleAssignments/write -> DENIED\nACTION Microsoft.Resources/subscriptions/resourceGroups/delete -> DENIED\n\n[Cas 3 — Contrôle du rôle Owner qui autorise tout]\nACTION Microsoft.Authorization/roleAssignments/write -> ALLOWED\nACTION Microsoft.Compute/virtualMachines/delete -> ALLOWED\n\n[Cas 4 — Rôle inconnu]\nROLE_ERROR: Unknown role 'SuperAdmin'"
  },
  {
    "id": "az3-c2-e2",
    "chapter": 2,
    "title": "Auditeur de conformité Azure Policy",
    "level": "n2",
    "language": "analyse",
    "goal": "Auditer un ensemble de ressources Cloud Azure contre des règles de gouvernance déclaratives et détecter les non-conformités.",
    "brief": "<p>Azure Policy permet d'imposer des normes de gouvernance organisationnelle au niveau des abonnements et groupes de ressources.<br><br>\nRègles de conformité définies pour l'organisation :<br>\n1. <code>allowedLocations</code> : la localisation géographique (<code>location</code>) doit obligatoirement être l'une des suivantes : <code>[\"westeurope\", \"northeurope\", \"francecentral\"]</code>.<br>\n   Violation : <code>DENY: Invalid location '&lt;loc&gt;'</code><br>\n2. <code>requireTags</code> : la ressource doit obligatoirement inclure les deux tags <code>Environment</code> et <code>CostCenter</code>.<br>\n   Pour chaque tag manquant : <code>AUDIT: Missing required tag '&lt;nom_tag&gt;'</code><br>\n3. <code>disallowedSKUs</code> : les SKUs surdimensionnées ou hors catalogue ne sont pas autorisées : <code>[\"Standard_M128ms\", \"Standard_G5\"]</code>.<br>\n   Violation : <code>DENY: Disallowed SKU '&lt;sku&gt;'</code><br><br>\nFormat d'entrée : chaque ligne déclare une ressource sous la forme :<br>\n<code>RESOURCE id=&lt;id&gt; type=&lt;type&gt; location=&lt;loc&gt; sku=&lt;sku&gt; tags=&lt;k1:v1,k2:v2&gt;</code> (si aucun tag : <code>tags=none</code>).<br><br>\nFormat de sortie attendu pour chaque ressource :<br>\n- Si aucune violation :<br>\n  <code>AUDIT id=&lt;id&gt; STATUS=COMPLIANT</code><br>\n- Si des violations existent :<br>\n  <code>AUDIT id=&lt;id&gt; STATUS=NON_COMPLIANT issues=[&lt;issue1&gt;; &lt;issue2&gt;]</code> (dans l'ordre de détection : location, SKU, puis tags manquants).</p>",
    "starter": "# Grille d'analyse (az3-c2-e2) — Auditeur de conformité Azure Policy\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Ressource valide et conforme sur France Central]\n# Données : RESOURCE id=vm-api-02 type=Microsoft.Compute/virtualMachines location=francecentral sku=Standard_B2s tags=Environment:dev,CostCenter:DEV-102\nA_COMPLETER\n\n[Cas 2 — Localisation interdite et tags manquants]\n# Données : RESOURCE id=st-backup-01 type=Microsoft.Storage/storageAccounts location=eastus sku=Standard_LRS tags=Environment:test\nA_COMPLETER\n\n[Cas 3 — SKU interdite et aucun tag]\n# Données : RESOURCE id=vm-big-01 type=Microsoft.Compute/virtualMachines location=francecentral sku=Standard_M128ms tags=none\nA_COMPLETER\n\n[Cas 4 — Conformité sur North Europe avec SKU valide]\n# Données : RESOURCE id=sql-core-01 type=Microsoft.Sql/servers location=northeurope sku=GP_Gen5_4 tags=CostCenter:FIN-10,Environment:stage\nA_COMPLETER\n",
    "hints": [
      "Extraire chaque champ clé=valeur de la ligne de déclaration.",
      "Construire la liste des anomalies dans l'ordre prescrit avant d'émettre le diagnostic."
    ],
    "examples": [
      {
        "stdin": "RESOURCE id=vm-web-01 type=Microsoft.Compute/virtualMachines location=westeurope sku=Standard_D4s_v5 tags=Environment:prod,CostCenter:IT-401",
        "expected": "AUDIT id=vm-web-01 STATUS=COMPLIANT",
        "note": "Ressource entièrement conforme aux règles de localisation, SKU et tags."
      }
    ],
    "tests": [
      {
        "label": "Ressource valide et conforme sur France Central",
        "stdin": "cas:1",
        "expected": "AUDIT id=vm-api-02 STATUS=COMPLIANT"
      },
      {
        "label": "Localisation interdite et tags manquants",
        "stdin": "cas:2",
        "expected": "AUDIT id=st-backup-01 STATUS=NON_COMPLIANT issues=[DENY: Invalid location 'eastus'; AUDIT: Missing required tag 'CostCenter']"
      },
      {
        "label": "SKU interdite et aucun tag",
        "stdin": "cas:3",
        "expected": "AUDIT id=vm-big-01 STATUS=NON_COMPLIANT issues=[DENY: Disallowed SKU 'Standard_M128ms'; AUDIT: Missing required tag 'Environment'; AUDIT: Missing required tag 'CostCenter']"
      },
      {
        "label": "Conformité sur North Europe avec SKU valide",
        "stdin": "cas:4",
        "expected": "AUDIT id=sql-core-01 STATUS=COMPLIANT"
      }
    ],
    "solution": "[Exemple]\nAUDIT id=vm-web-01 STATUS=COMPLIANT\n\n[Cas 1 — Ressource valide et conforme sur France Central]\nAUDIT id=vm-api-02 STATUS=COMPLIANT\n\n[Cas 2 — Localisation interdite et tags manquants]\nAUDIT id=st-backup-01 STATUS=NON_COMPLIANT issues=[DENY: Invalid location 'eastus'; AUDIT: Missing required tag 'CostCenter']\n\n[Cas 3 — SKU interdite et aucun tag]\nAUDIT id=vm-big-01 STATUS=NON_COMPLIANT issues=[DENY: Disallowed SKU 'Standard_M128ms'; AUDIT: Missing required tag 'Environment'; AUDIT: Missing required tag 'CostCenter']\n\n[Cas 4 — Conformité sur North Europe avec SKU valide]\nAUDIT id=sql-core-01 STATUS=COMPLIANT"
  },
  {
    "id": "az3-c2-e3",
    "chapter": 2,
    "title": "Analyseur de sécurité Azure Key Vault & Expiration de secrets",
    "level": "n3",
    "language": "analyse",
    "goal": "Auditer les paramètres de sécurité d’un coffre-fort Azure Key Vault et évaluer l’état d’expiration de ses secrets et certificats.",
    "brief": "<p>Azure Key Vault centralise la gestion des clés cryptographiques, secrets et certificats. La sécurisation du coffre exige l'activation de la suppression réversible (Soft-Delete) et de la protection contre la purge (Purge Protection).<br><br>\nFormat d'entrée :<br>\nLigne 1 : Configuration du coffre :<br>\n<code>VAULT name=&lt;nom&gt; soft_delete=&lt;enabled|disabled&gt; purge_protection=&lt;enabled|disabled&gt; auth_mode=&lt;rbac|access_policies&gt; current_day=&lt;int&gt;</code><br>\nLignes suivantes : Déclaration des secrets :<br>\n<code>SECRET name=&lt;nom&gt; expires_at=&lt;int&gt;</code> (si pas de date d'expiration : <code>expires_at=0</code>).<br><br>\nRègles d'audit du coffre (VAULT) :<br>\n- Si <code>soft_delete != enabled</code> : relever <code>CRITICAL: Soft-delete disabled</code><br>\n- Si <code>purge_protection != enabled</code> : relever <code>WARNING: Purge protection disabled</code><br>\n- Mode d'autorisation : afficher <code>AUTH=&lt;auth_mode.upper()&gt;</code><br>\nAfficher :<br>\n<code>VAULT_SECURITY name=&lt;nom&gt; AUTH=&lt;AUTH&gt; ISSUES=[&lt;issues&gt;]</code> (ou <code>ISSUES=[NONE]</code> si aucune anomalie).<br><br>\nRègles d'audit des secrets (SECRET) :<br>\n- Si <code>expires_at == 0</code> : <code>SECRET &lt;nom&gt; -&gt; STATUS=NO_EXPIRY_RISK</code><br>\n- Si <code>expires_at &lt;= current_day</code> : <code>SECRET &lt;nom&gt; -&gt; STATUS=EXPIRED</code><br>\n- Si <code>0 &lt; (expires_at - current_day) &lt;= 30</code> : <code>SECRET &lt;nom&gt; -&gt; STATUS=EXPIRING_SOON (days_left=&lt;N&gt;)</code><br>\n- Sinon : <code>SECRET &lt;nom&gt; -&gt; STATUS=VALID (days_left=&lt;N&gt;)</code></p>",
    "starter": "# Grille d'analyse (az3-c2-e3) — Analyseur de sécurité Azure Key Vault & Expiration de secrets\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Coffre hautement sécurisé avec secrets valides et expirant bientôt]\n# Données : VAULT name=kv-prod-we soft_delete=enabled purge_protection=enabled auth_mode=rbac current_day=100\n# Données : SECRET name=db-password expires_at=125\n# Données : SECRET name=api-key expires_at=0\n# Données : SECRET name=ssl-cert expires_at=200\nA_COMPLETER\n\n[Cas 2 — Coffre vulnérable sans soft delete ni purge protection]\n# Données : VAULT name=kv-dev-test soft_delete=disabled purge_protection=disabled auth_mode=access_policies current_day=50\n# Données : SECRET name=token expires_at=45\nA_COMPLETER\n\n[Cas 3 — Secret expirant le jour même]\n# Données : VAULT name=kv-core soft_delete=enabled purge_protection=enabled auth_mode=rbac current_day=100\n# Données : SECRET name=today-secret expires_at=100\nA_COMPLETER\n",
    "hints": [
      "Parser la ligne VAULT pour récupérer current_day et les indicateurs de sécurité.",
      "Comparer expires_at à current_day pour chaque secret selon les 4 cas prescrits."
    ],
    "examples": [
      {
        "stdin": "VAULT name=kv-prod-we soft_delete=enabled purge_protection=enabled auth_mode=rbac current_day=100\nSECRET name=db-password expires_at=125\nSECRET name=api-key expires_at=0",
        "expected": "VAULT_SECURITY name=kv-prod-we AUTH=RBAC ISSUES=[NONE]\nSECRET db-password -> STATUS=EXPIRING_SOON (days_left=25)\nSECRET api-key -> STATUS=NO_EXPIRY_RISK",
        "note": "Coffre sécurisé, secret expirant dans 25 jours et secret sans date d'expiration relevé."
      }
    ],
    "tests": [
      {
        "label": "Coffre hautement sécurisé avec secrets valides et expirant bientôt",
        "stdin": "cas:1",
        "expected": "VAULT_SECURITY name=kv-prod-we AUTH=RBAC ISSUES=[NONE]\nSECRET db-password -> STATUS=EXPIRING_SOON (days_left=25)\nSECRET api-key -> STATUS=NO_EXPIRY_RISK\nSECRET ssl-cert -> STATUS=VALID (days_left=100)"
      },
      {
        "label": "Coffre vulnérable sans soft delete ni purge protection",
        "stdin": "cas:2",
        "expected": "VAULT_SECURITY name=kv-dev-test AUTH=ACCESS_POLICIES ISSUES=[CRITICAL: Soft-delete disabled; WARNING: Purge protection disabled]\nSECRET token -> STATUS=EXPIRED"
      },
      {
        "label": "Secret expirant le jour même",
        "stdin": "cas:3",
        "expected": "VAULT_SECURITY name=kv-core AUTH=RBAC ISSUES=[NONE]\nSECRET today-secret -> STATUS=EXPIRED"
      }
    ],
    "solution": "[Exemple]\nVAULT_SECURITY name=kv-prod-we AUTH=RBAC ISSUES=[NONE]\nSECRET db-password -> STATUS=EXPIRING_SOON (days_left=25)\nSECRET api-key -> STATUS=NO_EXPIRY_RISK\n\n[Cas 1 — Coffre hautement sécurisé avec secrets valides et expirant bientôt]\nVAULT_SECURITY name=kv-prod-we AUTH=RBAC ISSUES=[NONE]\nSECRET db-password -> STATUS=EXPIRING_SOON (days_left=25)\nSECRET api-key -> STATUS=NO_EXPIRY_RISK\nSECRET ssl-cert -> STATUS=VALID (days_left=100)\n\n[Cas 2 — Coffre vulnérable sans soft delete ni purge protection]\nVAULT_SECURITY name=kv-dev-test AUTH=ACCESS_POLICIES ISSUES=[CRITICAL: Soft-delete disabled; WARNING: Purge protection disabled]\nSECRET token -> STATUS=EXPIRED\n\n[Cas 3 — Secret expirant le jour même]\nVAULT_SECURITY name=kv-core AUTH=RBAC ISSUES=[NONE]\nSECRET today-secret -> STATUS=EXPIRED"
  }
];
