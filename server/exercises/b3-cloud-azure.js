'use strict';

module.exports = [
  {
    "id": "az3-c1-e1",
    "chapter": 1,
    "title": "Validateur de hiérarchie ARM & Conventions de nommage CAF",
    "level": "n1",
    "language": "analyse",
    "goal": "Valider la structure hiérarchique de gestion Azure (Root MG -> MG -> Subscription -> Resource Group) et vérifier la conformité du nommage CAF.",
    "brief": "<p>Dans le Microsoft Cloud Adoption Framework (CAF), l'organisation des ressources repose sur une hiérarchie stricte à 4 niveaux :\n<code>ManagementGroup_Parent / ManagementGroup_Child / Subscription / ResourceGroup</code>.<br><br>\nAnalysez les paramètres du problème pour chaque cas. La chaîne doit comporter exactement 4 segments non vides séparés par <code>/</code>. Si ce n'est pas le cas :<br>\n   <code>INVALID: reason=MALFORMED_HIERARCHY</code><br>\n2. Le 4e segment correspond au Resource Group (RG). Il doit respecter le gabarit CAF suivant :<br>\n   <code>rg-&lt;app&gt;-&lt;env&gt;-&lt;region&gt;-&lt;instance&gt;</code><br>\n   - Préfixe : exactement <code>rg-</code><br>\n   - <code>&lt;app&gt;</code> : chaîne alphanumérique non vide (lettres/chiffres)<br>\n   - <code>&lt;env&gt;</code> : une valeur parmi <code>prod</code>, <code>dev</code>, <code>stage</code>, <code>test</code><br>\n   - <code>&lt;region&gt;</code> : code région abrégé parmi <code>we</code> (West Europe), <code>ne</code> (North Europe), <code>fc</code> (France Central), <code>use</code> (East US)<br>\n   - <code>&lt;instance&gt;</code> : exactement 2 chiffres décimaux (ex: <code>01</code>, <code>02</code>)<br>\n3. Si le format du RG ne respecte pas ce gabarit :<br>\n   <code>INVALID: rg=&lt;rg_name&gt; reason=NON_COMPLIANT_NAMING</code><br>\n4. Si la hiérarchie et le nom du RG sont conformes :<br>\n   <code>VALID: HIERARCHY depth=4 sub=&lt;segment3&gt; rg=&lt;rg_name&gt; status=COMPLIANT</code></p>",
    "starter": "# Grille d'analyse (az3-c1-e1) — Validateur de hiérarchie ARM & Conventions de nommage CAF\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Hiérarchies conformes en production et dev]\n# Données : HIERARCHY mg-root/mg-prod/sub-corp-01/rg-web-prod-fc-01\n# Données : HIERARCHY mg-tenant/mg-dev/sub-sandbox-02/rg-api-dev-use-02\nA_COMPLETER\n\n[Cas 2 — Erreur de hiérarchie malformée]\n# Données : HIERARCHY mg-root/sub-prod-01/rg-web-prod-fc-01\n# Données : HIERARCHY mg-root/mg-core/sub-01/sub-02/rg-data-prod-we-01\nA_COMPLETER\n\n[Cas 3 — Nom de Resource Group non conforme (env ou région invalide)]\n# Données : HIERARCHY mg-root/mg-prod/sub-01/rg-web-preprod-we-01\n# Données : HIERARCHY mg-root/mg-prod/sub-01/rg-db-prod-paris-01\n# Données : HIERARCHY mg-root/mg-prod/sub-01/my-resource-group\nA_COMPLETER\n\n[Cas 4 — Segment vide dans la hiérarchie]\n# Données : HIERARCHY mg-root//sub-01/rg-app-test-ne-01\nA_COMPLETER\n",
    "hints": [
      "Utiliser l’extraction des champs sur le chemin de la hiérarchie pour vérifier qu'il contient exactement 4 éléments.",
      "Valider le nom du groupe de ressources à l'aide d'une regex ou en découpant sur le tiret \"-\" : rg-<app>-<env>-<region>-<instance>."
    ],
    "examples": [
      {
        "stdin": "HIERARCHY mg-root/mg-core/sub-prod-01/rg-erp-prod-we-01",
        "expected": "VALID: HIERARCHY depth=4 sub=sub-prod-01 rg=rg-erp-prod-we-01 status=COMPLIANT",
        "note": "Hiérarchie standard 4 niveaux avec Resource Group conforme au CAF."
      }
    ],
    "tests": [
      {
        "label": "Hiérarchies conformes en production et dev",
        "stdin": "cas:1",
        "expected": "VALID: HIERARCHY depth=4 sub=sub-corp-01 rg=rg-web-prod-fc-01 status=COMPLIANT\nVALID: HIERARCHY depth=4 sub=sub-sandbox-02 rg=rg-api-dev-use-02 status=COMPLIANT"
      },
      {
        "label": "Erreur de hiérarchie malformée",
        "stdin": "cas:2",
        "expected": "INVALID: reason=MALFORMED_HIERARCHY\nINVALID: reason=MALFORMED_HIERARCHY"
      },
      {
        "label": "Nom de Resource Group non conforme (env ou région invalide)",
        "stdin": "cas:3",
        "expected": "INVALID: rg=rg-web-preprod-we-01 reason=NON_COMPLIANT_NAMING\nINVALID: rg=rg-db-prod-paris-01 reason=NON_COMPLIANT_NAMING\nINVALID: rg=my-resource-group reason=NON_COMPLIANT_NAMING"
      },
      {
        "label": "Segment vide dans la hiérarchie",
        "stdin": "cas:4",
        "expected": "INVALID: reason=MALFORMED_HIERARCHY"
      }
    ],
    "solution": "[Exemple]\nVALID: HIERARCHY depth=4 sub=sub-prod-01 rg=rg-erp-prod-we-01 status=COMPLIANT\n\n[Cas 1 — Hiérarchies conformes en production et dev]\nVALID: HIERARCHY depth=4 sub=sub-corp-01 rg=rg-web-prod-fc-01 status=COMPLIANT\nVALID: HIERARCHY depth=4 sub=sub-sandbox-02 rg=rg-api-dev-use-02 status=COMPLIANT\n\n[Cas 2 — Erreur de hiérarchie malformée]\nINVALID: reason=MALFORMED_HIERARCHY\nINVALID: reason=MALFORMED_HIERARCHY\n\n[Cas 3 — Nom de Resource Group non conforme (env ou région invalide)]\nINVALID: rg=rg-web-preprod-we-01 reason=NON_COMPLIANT_NAMING\nINVALID: rg=rg-db-prod-paris-01 reason=NON_COMPLIANT_NAMING\nINVALID: rg=my-resource-group reason=NON_COMPLIANT_NAMING\n\n[Cas 4 — Segment vide dans la hiérarchie]\nINVALID: reason=MALFORMED_HIERARCHY"
  },
  {
    "id": "az3-c1-e2",
    "chapter": 1,
    "title": "Sélecteur de région, Zones de disponibilité et Paires géographiques",
    "level": "n2",
    "language": "analyse",
    "goal": "Analyser une cible de haute disponibilité (SLA) pour une région Azure et déterminer le niveau de résilience et la stratégie de réplication associés.",
    "brief": "<p>Azure organise ses datacenters mondiaux en Régions, Zones de Disponibilité (AZ 1, 2, 3 avec datacenters indépendants) et Paires Régionales (séparées d'au moins 480 km pour la reprise après sinistre).<br><br>\nDonnées de référence des régions Azure :<br>\n- <code>westeurope</code> : paired=<code>northeurope</code>, zones=3<br>\n- <code>northeurope</code> : paired=<code>westeurope</code>, zones=3<br>\n- <code>francecentral</code> : paired=<code>francesouth</code>, zones=3<br>\n- <code>eastus</code> : paired=<code>westus</code>, zones=3<br>\n- <code>germanywestcentral</code> : paired=<code>germanynorth</code>, zones=3<br>\n- <code>brazilsouth</code> : paired=<code>southcentralus</code>, zones=2<br><br>\nAnalysez les données fournies pour chaque cas.9%</code>, <code>99.95%</code>, <code>99.99%</code>).<br><br>\nRègles de décision :<br>\n1. Si la région n'est pas dans le catalogue :<br>\n   <code>REGION: &lt;nom_region&gt; -&gt; UNKNOWN_REGION</code><br>\n2. Si le SLA cible est <code>99.99%</code> :<br>\n   - Si la région possède au moins 3 zones de disponibilité (<code>zones &gt;= 3</code>) :<br>\n     <code>REGION: &lt;nom_region&gt; -&gt; RESILIENCE=AZ_SUPPORTED (zones=&lt;zones&gt;) | PAIRED=&lt;paired&gt; | REPLICATION=ZRS_OR_GZRS</code><br>\n   - Sinon :<br>\n     <code>REGION: &lt;nom_region&gt; -&gt; INSUFFICIENT_ZONES (zones=&lt;zones&gt;) | TARGET_SLA_UNMET</code><br>\n3. Si le SLA cible est <code>99.95%</code> :<br>\n   <code>REGION: &lt;nom_region&gt; -&gt; RESILIENCE=AVAILABILITY_SETS | PAIRED=&lt;paired&gt; | REPLICATION=LRS_OR_GRS</code><br>\n4. Si le SLA cible est inférieur ou égal à <code>99.9%</code> :<br>\n   <code>REGION: &lt;nom_region&gt; -&gt; RESILIENCE=SINGLE_VM_PREMIUM | PAIRED=&lt;paired&gt; | REPLICATION=LRS</code></p>",
    "starter": "# Grille d'analyse (az3-c1-e2) — Sélecteur de région, Zones de disponibilité et Paires géographiques\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — SLA haute disponibilité 99.99% sur West Europe et France Central]\n# Données : REGION westeurope SLA 99.99%\n# Données : REGION francecentral SLA 99.99%\nA_COMPLETER\n\n[Cas 2 — Région avec zones insuffisantes pour 99.99%]\n# Données : REGION brazilsouth SLA 99.99%\nA_COMPLETER\n\n[Cas 3 — Paliers SLA 99.95% et 99.9% sur diverses régions]\n# Données : REGION northeurope SLA 99.95%\n# Données : REGION eastus SLA 99.9%\n# Données : REGION germanywestcentral SLA 99.95%\nA_COMPLETER\n\n[Cas 4 — Région non répertoriée]\n# Données : REGION mars-central SLA 99.99%\nA_COMPLETER\n",
    "hints": [
      "Consultez la cartographie des régions Azure pour identifier les zones de disponibilité (Availability Zones) et régions appairées.",
      "Vérifiez la conformité du contrat de niveau de service (SLA) avec les exigences de redondance géographique."
    ],
    "examples": [
      {
        "stdin": "REGION westeurope SLA 99.99%",
        "expected": "REGION: westeurope -> RESILIENCE=AZ_SUPPORTED (zones=3) | PAIRED=northeurope | REPLICATION=ZRS_OR_GZRS",
        "note": "West Europe dispose de 3 zones de disponibilité permettant d'atteindre 99.99% de SLA."
      }
    ],
    "tests": [
      {
        "label": "SLA haute disponibilité 99.99% sur West Europe et France Central",
        "stdin": "cas:1",
        "expected": "REGION: westeurope -> RESILIENCE=AZ_SUPPORTED (zones=3) | PAIRED=northeurope | REPLICATION=ZRS_OR_GZRS\nREGION: francecentral -> RESILIENCE=AZ_SUPPORTED (zones=3) | PAIRED=francesouth | REPLICATION=ZRS_OR_GZRS"
      },
      {
        "label": "Région avec zones insuffisantes pour 99.99%",
        "stdin": "cas:2",
        "expected": "REGION: brazilsouth -> INSUFFICIENT_ZONES (zones=2) | TARGET_SLA_UNMET"
      },
      {
        "label": "Paliers SLA 99.95% et 99.9% sur diverses régions",
        "stdin": "cas:3",
        "expected": "REGION: northeurope -> RESILIENCE=AVAILABILITY_SETS | PAIRED=westeurope | REPLICATION=LRS_OR_GRS\nREGION: eastus -> RESILIENCE=SINGLE_VM_PREMIUM | PAIRED=westus | REPLICATION=LRS\nREGION: germanywestcentral -> RESILIENCE=AVAILABILITY_SETS | PAIRED=germanynorth | REPLICATION=LRS_OR_GRS"
      },
      {
        "label": "Région non répertoriée",
        "stdin": "cas:4",
        "expected": "REGION: mars-central -> UNKNOWN_REGION"
      }
    ],
    "solution": "[Exemple]\nREGION: westeurope -> RESILIENCE=AZ_SUPPORTED (zones=3) | PAIRED=northeurope | REPLICATION=ZRS_OR_GZRS\n\n[Cas 1 — SLA haute disponibilité 99.99% sur West Europe et France Central]\nREGION: westeurope -> RESILIENCE=AZ_SUPPORTED (zones=3) | PAIRED=northeurope | REPLICATION=ZRS_OR_GZRS\nREGION: francecentral -> RESILIENCE=AZ_SUPPORTED (zones=3) | PAIRED=francesouth | REPLICATION=ZRS_OR_GZRS\n\n[Cas 2 — Région avec zones insuffisantes pour 99.99%]\nREGION: brazilsouth -> INSUFFICIENT_ZONES (zones=2) | TARGET_SLA_UNMET\n\n[Cas 3 — Paliers SLA 99.95% et 99.9% sur diverses régions]\nREGION: northeurope -> RESILIENCE=AVAILABILITY_SETS | PAIRED=westeurope | REPLICATION=LRS_OR_GRS\nREGION: eastus -> RESILIENCE=SINGLE_VM_PREMIUM | PAIRED=westus | REPLICATION=LRS\nREGION: germanywestcentral -> RESILIENCE=AVAILABILITY_SETS | PAIRED=germanynorth | REPLICATION=LRS_OR_GRS\n\n[Cas 4 — Région non répertoriée]\nREGION: mars-central -> UNKNOWN_REGION"
  },
  {
    "id": "az3-c1-e3",
    "chapter": 1,
    "title": "Estimateur de coûts TCO et optimisation par Instances Réservées (RI)",
    "level": "n3",
    "language": "analyse",
    "goal": "Calculer le budget mensuel d’une flotte de machines virtuelles et disques managés, en simulant l’économie apportée par les réservations Azure (1 an ou 3 ans).",
    "brief": "<p>La maîtrise financière (FinOps) sous Azure requiert d'optimiser l'engagement sur les capacités de calcul (Instances Réservées) tout en dimensionnant le stockage et les flux sortants (Egress).<br><br>\nBase tarifaire mensuelle (730 heures par mois) :<br>\n- VM Calcul (tarif Pay-As-You-Go) :<br>\n  - <code>Standard_B2s</code> : 30.37 USD / mois par VM<br>\n  - <code>Standard_D4s_v5</code> : 140.16 USD / mois par VM<br>\n  - <code>Standard_E4s_v5</code> : 183.96 USD / mois par VM<br>\n- Disques managés SSD Premium (tarif mensuel fixe par unité) :<br>\n  - <code>P10</code> (128 Go) : 19.71 USD<br>\n  - <code>P20</code> (512 Go) : 73.22 USD<br>\n  - <code>P30</code> (1024 Go) : 135.17 USD<br>\n- Bande passante sortante (Egress Internet) :<br>\n  - Les 5 premiers Go du mois sont gratuits (0.00 USD).<br>\n  - Tout Go supplémentaire est facturé à 0.087 USD / Go.<br>\n- Remises sur le calcul des VMs par engagement Reserved Instances (RI) :<br>\n  - <code>PAYG</code> : 0% de remise.<br>\n  - <code>RI_1Y</code> : 35% de remise sur le coût du calcul VM.<br>\n  - <code>RI_3Y</code> : 60% de remise sur le coût du calcul VM.<br>\n  (Le stockage et l'egress ne bénéficient pas de la remise RI calcul).<br><br>\nFormat de la ligne d'entrée :<br>\n<code>CALC sku=&lt;SKU&gt; qty=&lt;N&gt; disk=&lt;DISK&gt; egress_gb=&lt;GB&gt; commitment=&lt;PAYG|RI_1Y|RI_3Y&gt;</code><br><br>\nFormat de sortie attendu :<br>\n<code>COST: VM=&lt;vm_cost:.2f&gt; DISK=&lt;disk_cost:.2f&gt; EGRESS=&lt;egress_cost:.2f&gt; TOTAL=&lt;total:.2f&gt; SAVINGS=&lt;savings:.2f&gt;</code></p>",
    "starter": "# Grille d'analyse (az3-c1-e3) — Estimateur de coûts TCO et optimisation par Instances Réservées (RI)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Flotte PAYG standard 3 VMs B2s]\n# Données : CALC sku=Standard_B2s qty=3 disk=P10 egress_gb=10 commitment=PAYG\nA_COMPLETER\n\n[Cas 2 — Engagement RI 1 an avec egress significatif]\n# Données : CALC sku=Standard_D4s_v5 qty=4 disk=P20 egress_gb=105 commitment=RI_1Y\nA_COMPLETER\n\n[Cas 3 — Engagement RI 3 ans haute capacité mémoire]\n# Données : CALC sku=Standard_E4s_v5 qty=2 disk=P30 egress_gb=50 commitment=RI_3Y\nA_COMPLETER\n\n[Cas 4 — Une seule VM B2s avec RI 3 ans sans egress]\n# Données : CALC sku=Standard_B2s qty=1 disk=P10 egress_gb=0 commitment=RI_3Y\nA_COMPLETER\n",
    "hints": [
      "Calculer d'abord le coût de base des VMs sans remise (PAYG) : base_vm = qty * tarif_unitaire.",
      "La remise RI s'applique uniquement à base_vm : savings = base_vm * discount_rate.",
      "Le coût effectif de la VM devient base_vm - savings."
    ],
    "examples": [
      {
        "stdin": "CALC sku=Standard_B2s qty=2 disk=P10 egress_gb=5 commitment=PAYG",
        "expected": "COST: VM=60.74 DISK=39.42 EGRESS=0.00 TOTAL=100.16 SAVINGS=0.00",
        "note": "2 VMs B2s avec 2 disques P10 sans engagement et 5 Go egress gratuits."
      }
    ],
    "tests": [
      {
        "label": "Flotte PAYG standard 3 VMs B2s",
        "stdin": "cas:1",
        "expected": "COST: VM=91.11 DISK=59.13 EGRESS=0.43 TOTAL=150.68 SAVINGS=0.00"
      },
      {
        "label": "Engagement RI 1 an avec egress significatif",
        "stdin": "cas:2",
        "expected": "COST: VM=364.42 DISK=292.88 EGRESS=8.70 TOTAL=666.00 SAVINGS=196.22"
      },
      {
        "label": "Engagement RI 3 ans haute capacité mémoire",
        "stdin": "cas:3",
        "expected": "COST: VM=147.17 DISK=270.34 EGRESS=3.91 TOTAL=421.42 SAVINGS=220.75"
      },
      {
        "label": "Une seule VM B2s avec RI 3 ans sans egress",
        "stdin": "cas:4",
        "expected": "COST: VM=12.15 DISK=19.71 EGRESS=0.00 TOTAL=31.86 SAVINGS=18.22"
      }
    ],
    "solution": "[Exemple]\nCOST: VM=60.74 DISK=39.42 EGRESS=0.00 TOTAL=100.16 SAVINGS=0.00\n\n[Cas 1 — Flotte PAYG standard 3 VMs B2s]\nCOST: VM=91.11 DISK=59.13 EGRESS=0.43 TOTAL=150.68 SAVINGS=0.00\n\n[Cas 2 — Engagement RI 1 an avec egress significatif]\nCOST: VM=364.42 DISK=292.88 EGRESS=8.70 TOTAL=666.00 SAVINGS=196.22\n\n[Cas 3 — Engagement RI 3 ans haute capacité mémoire]\nCOST: VM=147.17 DISK=270.34 EGRESS=3.91 TOTAL=421.42 SAVINGS=220.75\n\n[Cas 4 — Une seule VM B2s avec RI 3 ans sans egress]\nCOST: VM=12.15 DISK=19.71 EGRESS=0.00 TOTAL=31.86 SAVINGS=18.22"
  },
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
  },
  {
    "id": "az3-c3-e1",
    "chapter": 3,
    "title": "Dimensionneur de VM Azure et calcul de SLA combiné",
    "level": "n1",
    "language": "analyse",
    "goal": "Sélectionner la série de machines virtuelles Azure optimale et calculer le SLA composite d’une architecture multi-tiers.",
    "brief": "<p>La conception d'une architecture résiliente sous Azure nécessite de sélectionner les séries de VM appropriées et d'évaluer la disponibilité globale (SLA) résultant de la composition des niveaux applicatifs (tiers).<br><br>\nRègles de sélection des séries Azure :<br>\n- Si <code>burst=true</code> : série <code>B-series</code> (Burstable économique)<br>\n- Sinon, selon le ratio mémoire / vCPU (<code>ram_gb / vcpu</code>) :<br>\n  - Si <code>ratio &gt;= 8.0</code> : série <code>E-series</code> (Optimisée en mémoire)<br>\n  - Si <code>ratio &lt;= 2.0</code> : série <code>F-series</code> (Optimisée en calcul)<br>\n  - Sinon : série <code>D-series</code> (Usage général)<br><br>\nDisponibilité SLA unitaire selon la redondance et le disque :<br>\n- Si <code>redundancy=AZONE</code> (Zones de disponibilité) : <code>99.99%</code><br>\n- Si <code>redundancy=ASET</code> (Availability Set) : <code>99.95%</code><br>\n- Si <code>redundancy=SINGLE</code> (VM unique) :<br>\n  - <code>disk=SSD_PREM</code> : <code>99.90%</code><br>\n  - <code>disk=SSD_STD</code> : <code>99.50%</code><br>\n  - <code>disk=HDD_STD</code> : <code>95.00%</code><br><br>\nFormat d'entrée : chaque ligne déclare un tier applicatif :<br>\n<code>TIER name=&lt;nom&gt; vcpu=&lt;int&gt; ram_gb=&lt;int&gt; burst=&lt;true|false&gt; disk=&lt;disque&gt; redundancy=&lt;redondance&gt;</code><br><br>\nFormat de sortie attendu :<br>\nPour chaque tier :<br>\n<code>TIER &lt;nom&gt;: SERIES=&lt;SERIES&gt; SLA=&lt;sla_tier:.2f&gt;%</code><br>\nÀ la fin de la lecture, calculer le SLA composite (produit des disponibilités de chaque tier) et l'indisponibilité annuelle estimée (sur une base de 8760 heures par an) :<br>\n<code>COMPOSITE_SLA: &lt;composite:.4f&gt;% (downtime_year=&lt;downtime_hours:.2f&gt;h)</code></p>",
    "starter": "# Grille d'analyse (az3-c3-e1) — Dimensionneur de VM Azure et calcul de SLA combiné\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Architecture multi-tiers Web, App et DB avec SLA combiné]\n# Données : TIER name=web vcpu=2 ram_gb=8 burst=false disk=SSD_PREM redundancy=AZONE\n# Données : TIER name=app vcpu=4 ram_gb=16 burst=false disk=SSD_PREM redundancy=AZONE\n# Données : TIER name=db vcpu=8 ram_gb=64 burst=false disk=SSD_PREM redundancy=ASET\nA_COMPLETER\n\n[Cas 2 — Tier unique burstable avec disque SSD Standard]\n# Données : TIER name=dev vcpu=2 ram_gb=4 burst=true disk=SSD_STD redundancy=SINGLE\nA_COMPLETER\n\n[Cas 3 — Tier calcul intensif F-series avec HDD Standard]\n# Données : TIER name=batch vcpu=8 ram_gb=16 burst=false disk=HDD_STD redundancy=SINGLE\nA_COMPLETER\n",
    "hints": [
      "Calculer ratio = ram_gb / vcpu si burst n'est pas actif.",
      "Le SLA composite de tiers en série est le produit des probabilités : prod(SLA_i / 100) * 100."
    ],
    "examples": [
      {
        "stdin": "TIER name=web vcpu=2 ram_gb=8 burst=false disk=SSD_PREM redundancy=AZONE\nTIER name=db vcpu=4 ram_gb=32 burst=false disk=SSD_PREM redundancy=ASET",
        "expected": "TIER web: SERIES=D-series SLA=99.99%\nTIER db: SERIES=E-series SLA=99.95%\nCOMPOSITE_SLA: 99.9400% (downtime_year=5.26h)",
        "note": "Tier web en D-series avec AZone et Tier DB en E-series avec ASet."
      }
    ],
    "tests": [
      {
        "label": "Architecture multi-tiers Web, App et DB avec SLA combiné",
        "stdin": "cas:1",
        "expected": "TIER web: SERIES=D-series SLA=99.99%\nTIER app: SERIES=D-series SLA=99.99%\nTIER db: SERIES=E-series SLA=99.95%\nCOMPOSITE_SLA: 99.9300% (downtime_year=6.13h)"
      },
      {
        "label": "Tier unique burstable avec disque SSD Standard",
        "stdin": "cas:2",
        "expected": "TIER dev: SERIES=B-series SLA=99.50%\nCOMPOSITE_SLA: 99.5000% (downtime_year=43.80h)"
      },
      {
        "label": "Tier calcul intensif F-series avec HDD Standard",
        "stdin": "cas:3",
        "expected": "TIER batch: SERIES=F-series SLA=95.00%\nCOMPOSITE_SLA: 95.0000% (downtime_year=438.00h)"
      }
    ],
    "solution": "[Exemple]\nTIER web: SERIES=D-series SLA=99.99%\nTIER db: SERIES=E-series SLA=99.95%\nCOMPOSITE_SLA: 99.9400% (downtime_year=5.26h)\n\n[Cas 1 — Architecture multi-tiers Web, App et DB avec SLA combiné]\nTIER web: SERIES=D-series SLA=99.99%\nTIER app: SERIES=D-series SLA=99.99%\nTIER db: SERIES=E-series SLA=99.95%\nCOMPOSITE_SLA: 99.9300% (downtime_year=6.13h)\n\n[Cas 2 — Tier unique burstable avec disque SSD Standard]\nTIER dev: SERIES=B-series SLA=99.50%\nCOMPOSITE_SLA: 99.5000% (downtime_year=43.80h)\n\n[Cas 3 — Tier calcul intensif F-series avec HDD Standard]\nTIER batch: SERIES=F-series SLA=95.00%\nCOMPOSITE_SLA: 95.0000% (downtime_year=438.00h)"
  },
  {
    "id": "az3-c3-e2",
    "chapter": 3,
    "title": "Simulateur d'Auto-scaling VMSS",
    "level": "n2",
    "language": "analyse",
    "goal": "Simuler le comportement d’un Virtual Machine Scale Set (VMSS) sous charge variable avec règles de mise à l’échelle et période de refroidissement.",
    "brief": "<p>Un groupe de machines virtuelles identiques (Azure VMSS) adapte dynamiquement son effectif aux variations de charge CPU selon des règles de scale-out et scale-in, avec un délai de refroidissement (cooldown) pour éviter les oscillations rapides.<br><br>\nFormat d'entrée :<br>\nLigne 1 : Définition des paramètres d'auto-scaling :<br>\n<code>CONFIG min=&lt;int&gt; max=&lt;int&gt; scale_out_cpu=&lt;int&gt; scale_in_cpu=&lt;int&gt; step=&lt;int&gt; cooldown=&lt;int&gt;</code><br>\nLignes suivantes : Mesures de charge collectées par pas de temps :<br>\n<code>METRIC step=&lt;int&gt; cpu=&lt;int&gt;</code><br><br>\nRègles du moteur VMSS :<br>\n- Au démarrage, l'effectif initial est égal à <code>min</code>, et le compteur de cooldown est à 0.<br>\n- Pour chaque métrique :<br>\n  - Si le compteur de cooldown est strictement supérieur à 0 : l'action est <code>COOLDOWN_ACTIVE</code>, et le compteur est décrémenté de 1.<br>\n  - Sinon :<br>\n    - Si <code>cpu &gt;= scale_out_cpu</code> : tenter d'ajouter <code>step</code> instances sans dépasser <code>max</code>.<br>\n      Si l'effectif augmente : action <code>SCALE_OUT</code> et le compteur de cooldown est réinitialisé à <code>cooldown</code>.<br>\n      Si l'effectif était déjà à <code>max</code> : action <code>MAX_CAPACITY_REACHED</code>.<br>\n    - Sinon si <code>cpu &lt;= scale_in_cpu</code> : tenter de retirer <code>step</code> instances sans descendre sous <code>min</code>.<br>\n      Si l'effectif diminue : action <code>SCALE_IN</code> et le compteur de cooldown est réinitialisé à <code>cooldown</code>.<br>\n      Si l'effectif était déjà à <code>min</code> : action <code>MIN_CAPACITY_REACHED</code>.<br>\n    - Sinon : action <code>NONE</code>.<br><br>\nFormat de sortie pour chaque métrique :<br>\n<code>STEP &lt;t&gt;: CPU=&lt;cpu&gt;% INSTANCES=&lt;count&gt; ACTION=&lt;ACTION&gt;</code></p>",
    "starter": "# Grille d'analyse (az3-c3-e2) — Simulateur d'Auto-scaling VMSS\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Scale-out puis période de refroidissement et maintien]\n# Données : CONFIG min=1 max=5 scale_out_cpu=70 scale_in_cpu=30 step=1 cooldown=1\n# Données : METRIC step=1 cpu=75\n# Données : METRIC step=2 cpu=75\n# Données : METRIC step=3 cpu=20\nA_COMPLETER\n\n[Cas 2 — Scale-in vers minimum avec blocage de capacité]\n# Données : CONFIG min=2 max=4 scale_out_cpu=80 scale_in_cpu=20 step=1 cooldown=1\n# Données : METRIC step=1 cpu=10\n# Données : METRIC step=2 cpu=15\nA_COMPLETER\n\n[Cas 3 — Atteinte du palier max capacity]\n# Données : CONFIG min=2 max=3 scale_out_cpu=70 scale_in_cpu=30 step=1 cooldown=0\n# Données : METRIC step=1 cpu=80\n# Données : METRIC step=2 cpu=85\nA_COMPLETER\n",
    "hints": [
      "Gérer un compteur cooldown_timer qui bloque toute nouvelle mise à l'échelle tant qu'il est supérieur à 0.",
      "S'assurer de borner le nombre d'instances entre min et max."
    ],
    "examples": [
      {
        "stdin": "CONFIG min=2 max=6 scale_out_cpu=75 scale_in_cpu=25 step=2 cooldown=2\nMETRIC step=1 cpu=80\nMETRIC step=2 cpu=85\nMETRIC step=3 cpu=80\nMETRIC step=4 cpu=40",
        "expected": "STEP 1: CPU=80% INSTANCES=4 ACTION=SCALE_OUT\nSTEP 2: CPU=85% INSTANCES=4 ACTION=COOLDOWN_ACTIVE\nSTEP 3: CPU=80% INSTANCES=4 ACTION=COOLDOWN_ACTIVE\nSTEP 4: CPU=40% INSTANCES=4 ACTION=NONE",
        "note": "Scale-out à l'étape 1 suivi de 2 étapes de cooldown effectives."
      }
    ],
    "tests": [
      {
        "label": "Scale-out puis période de refroidissement et maintien",
        "stdin": "cas:1",
        "expected": "STEP 1: CPU=75% INSTANCES=2 ACTION=SCALE_OUT\nSTEP 2: CPU=75% INSTANCES=2 ACTION=COOLDOWN_ACTIVE\nSTEP 3: CPU=20% INSTANCES=1 ACTION=SCALE_IN"
      },
      {
        "label": "Scale-in vers minimum avec blocage de capacité",
        "stdin": "cas:2",
        "expected": "STEP 1: CPU=10% INSTANCES=2 ACTION=MIN_CAPACITY_REACHED\nSTEP 2: CPU=15% INSTANCES=2 ACTION=MIN_CAPACITY_REACHED"
      },
      {
        "label": "Atteinte du palier max capacity",
        "stdin": "cas:3",
        "expected": "STEP 1: CPU=80% INSTANCES=3 ACTION=SCALE_OUT\nSTEP 2: CPU=85% INSTANCES=3 ACTION=MAX_CAPACITY_REACHED"
      }
    ],
    "solution": "[Exemple]\nSTEP 1: CPU=80% INSTANCES=4 ACTION=SCALE_OUT\nSTEP 2: CPU=85% INSTANCES=4 ACTION=COOLDOWN_ACTIVE\nSTEP 3: CPU=80% INSTANCES=4 ACTION=COOLDOWN_ACTIVE\nSTEP 4: CPU=40% INSTANCES=4 ACTION=NONE\n\n[Cas 1 — Scale-out puis période de refroidissement et maintien]\nSTEP 1: CPU=75% INSTANCES=2 ACTION=SCALE_OUT\nSTEP 2: CPU=75% INSTANCES=2 ACTION=COOLDOWN_ACTIVE\nSTEP 3: CPU=20% INSTANCES=1 ACTION=SCALE_IN\n\n[Cas 2 — Scale-in vers minimum avec blocage de capacité]\nSTEP 1: CPU=10% INSTANCES=2 ACTION=MIN_CAPACITY_REACHED\nSTEP 2: CPU=15% INSTANCES=2 ACTION=MIN_CAPACITY_REACHED\n\n[Cas 3 — Atteinte du palier max capacity]\nSTEP 1: CPU=80% INSTANCES=3 ACTION=SCALE_OUT\nSTEP 2: CPU=85% INSTANCES=3 ACTION=MAX_CAPACITY_REACHED"
  },
  {
    "id": "az3-c3-e3",
    "chapter": 3,
    "title": "Gestionnaire de déploiement Azure App Service & Slot Swap",
    "level": "n3",
    "language": "analyse",
    "goal": "Simuler le déploiement sur les slots de pré-production (Staging/Production) d’Azure App Service avec vérification de sonde de santé et retour arrière (rollback).",
    "brief": "<p>Azure App Service permet les déploiements zéro-downtime grâce aux slots de déploiement. Avant de basculer (Swap) le trafic vers la nouvelle version, une sonde de santé (health check probe) valide l'intégrité de la pré-production (Staging).<br><br>\nÉtat initial :<br>\n- Slot <code>Production</code> : version <code>v1.0.0</code>.<br>\n- Slot <code>Staging</code> : version <code>none</code> (inactif).<br><br>\nCommandes prises en charge :<br>\n1. <code>DEPLOY_STAGE version=&lt;v&gt; probe=&lt;status_code&gt;</code><br>\n   Déploie la version <code>v</code> sur le slot Staging avec le code de santé <code>status_code</code>.<br>\n   Afficher : <code>STAGE_DEPLOYED: version=&lt;v&gt; probe=&lt;status_code&gt;</code><br><br>\n2. <code>SWAP_SLOTS auto_rollback=&lt;true|false&gt;</code><br>\n   Vérifiez la sonde de santé du slot Staging :<br>\n   - Si <code>probe == 200</code> :<br>\n     La bascule s'effectue avec succès. La version de Staging devient celle de Production, et l'ancienne version de Production est basculée sur Staging.<br>\n     Afficher : <code>SWAP_SUCCESS: prod=&lt;new_prod&gt; stage=&lt;new_stage&gt;</code><br>\n   - Si <code>probe != 200</code> :<br>\n     - Si <code>auto_rollback=true</code> : la bascule est annulée, Production reste inchangée et Staging est réinitialisé à <code>none</code>.<br>\n       Afficher : <code>SWAP_ABORTED: probe_failed (status=&lt;status_code&gt;), rollback to &lt;current_prod&gt;</code><br>\n     - Si <code>auto_rollback=false</code> : la bascule a lieu malgré l'anomalie.<br>\n       Afficher : <code>SWAP_WARNING: degraded_deployment (status=&lt;status_code&gt;), prod=&lt;new_prod&gt;</code><br><br>\n3. <code>STATUS</code><br>\n   Afficher : <code>CURRENT_STATE: prod=&lt;current_prod&gt; stage=&lt;current_stage&gt;</code></p>",
    "starter": "# Grille d'analyse (az3-c3-e3) — Gestionnaire de déploiement Azure App Service & Slot Swap\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Déploiement sain et bascule vers production]\n# Données : DEPLOY_STAGE version=v1.2.0-rc1 probe=200\n# Données : SWAP_SLOTS auto_rollback=true\n# Données : STATUS\nA_COMPLETER\n\n[Cas 2 — Échec de sonde avec auto-rollback activé]\n# Données : DEPLOY_STAGE version=v2.0.0-bug probe=500\n# Données : SWAP_SLOTS auto_rollback=true\n# Données : STATUS\nA_COMPLETER\n\n[Cas 3 — Échec de sonde sans auto-rollback forçant le swap]\n# Données : DEPLOY_STAGE version=v1.2.0 probe=503\n# Données : SWAP_SLOTS auto_rollback=false\n# Données : STATUS\nA_COMPLETER\n",
    "hints": [
      "Gérer deux variables d'état prod_ver (initialement \"v1.0.0\") et stage_ver (initialement \"none\"), ainsi que stage_probe.",
      "Lors du swap réussi, échanger les valeurs de prod_ver et stage_ver."
    ],
    "examples": [
      {
        "stdin": "DEPLOY_STAGE version=v1.1.0 probe=200\nSWAP_SLOTS auto_rollback=true\nSTATUS",
        "expected": "STAGE_DEPLOYED: version=v1.1.0 probe=200\nSWAP_SUCCESS: prod=v1.1.0 stage=v1.0.0\nCURRENT_STATE: prod=v1.1.0 stage=v1.0.0",
        "note": "Déploiement sain en staging et swap sans interruption vers production."
      }
    ],
    "tests": [
      {
        "label": "Déploiement sain et bascule vers production",
        "stdin": "cas:1",
        "expected": "STAGE_DEPLOYED: version=v1.2.0-rc1 probe=200\nSWAP_SUCCESS: prod=v1.2.0-rc1 stage=v1.0.0\nCURRENT_STATE: prod=v1.2.0-rc1 stage=v1.0.0"
      },
      {
        "label": "Échec de sonde avec auto-rollback activé",
        "stdin": "cas:2",
        "expected": "STAGE_DEPLOYED: version=v2.0.0-bug probe=500\nSWAP_ABORTED: probe_failed (status=500), rollback to v1.0.0\nCURRENT_STATE: prod=v1.0.0 stage=none"
      },
      {
        "label": "Échec de sonde sans auto-rollback forçant le swap",
        "stdin": "cas:3",
        "expected": "STAGE_DEPLOYED: version=v1.2.0 probe=503\nSWAP_WARNING: degraded_deployment (status=503), prod=v1.2.0\nCURRENT_STATE: prod=v1.2.0 stage=v1.0.0"
      }
    ],
    "solution": "[Exemple]\nSTAGE_DEPLOYED: version=v1.1.0 probe=200\nSWAP_SUCCESS: prod=v1.1.0 stage=v1.0.0\nCURRENT_STATE: prod=v1.1.0 stage=v1.0.0\n\n[Cas 1 — Déploiement sain et bascule vers production]\nSTAGE_DEPLOYED: version=v1.2.0-rc1 probe=200\nSWAP_SUCCESS: prod=v1.2.0-rc1 stage=v1.0.0\nCURRENT_STATE: prod=v1.2.0-rc1 stage=v1.0.0\n\n[Cas 2 — Échec de sonde avec auto-rollback activé]\nSTAGE_DEPLOYED: version=v2.0.0-bug probe=500\nSWAP_ABORTED: probe_failed (status=500), rollback to v1.0.0\nCURRENT_STATE: prod=v1.0.0 stage=none\n\n[Cas 3 — Échec de sonde sans auto-rollback forçant le swap]\nSTAGE_DEPLOYED: version=v1.2.0 probe=503\nSWAP_WARNING: degraded_deployment (status=503), prod=v1.2.0\nCURRENT_STATE: prod=v1.2.0 stage=v1.0.0"
  },
  {
    "id": "az3-c4-e1",
    "chapter": 4,
    "title": "Calculateur d'adressage Azure VNet & Adresses IP réservées",
    "level": "n1",
    "language": "analyse",
    "goal": "Calculer la plage d’adresses IP d’un sous-réseau Azure en déduisant les 5 adresses réservées par le système SDN d’Azure.",
    "brief": "<p>Dans chaque sous-réseau (Subnet) d'un VNet Azure, Microsoft réserve systématiquement <strong>5 adresses IP</strong> qui ne peuvent pas être assignées aux machines virtuelles ou ressources clientes :<br>\n- <code>.0</code> : Adresse réseau (Network ID)<br>\n- <code>.1</code> : Passerelle par défaut Azure (Default Gateway)<br>\n- <code>.2</code> : Résolveur DNS Azure primaire<br>\n- <code>.3</code> : Résolveur DNS Azure secondaire<br>\n- <code>.&lt;dernière&gt;</code> (ex: <code>.255</code> pour un /24) : Adresse de diffusion (Broadcast)<br><br>\nAinsi, la première IP assignable est <code>.4</code> et la dernière est <code>.&lt;dernière - 1&gt;</code>.<br>\nLe nombre d'IPs exploitables est donc <code>Total - 5</code>.<br><br>\nFormat d'entrée :<br>\n<code>SUBNET name=&lt;nom&gt; cidr=&lt;adresse/préfixe&gt;</code><br><br>\nFormat de sortie attendu :<br>\n<code>SUBNET &lt;nom&gt;: TOTAL=&lt;total&gt; USABLE=&lt;usable&gt; RESERVED=5 GATEWAY=&lt;gw_ip&gt; DNS1=&lt;dns1_ip&gt; RANGE=&lt;first_usable&gt;-&lt;last_usable&gt;</code></p>",
    "starter": "# Grille d'analyse (az3-c4-e1) — Calculateur d'adressage Azure VNet & Adresses IP réservées\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Sous-réseau de base de données /24 distinct]\n# Données : SUBNET name=snet-db cidr=10.0.10.0/24\nA_COMPLETER\n\n[Cas 2 — Petit sous-réseau AzureBastionSubnet en /26]\n# Données : SUBNET name=AzureBastionSubnet cidr=10.0.2.0/26\nA_COMPLETER\n\n[Cas 3 — Sous-réseau GatewaySubnet minimal en /27]\n# Données : SUBNET name=GatewaySubnet cidr=192.168.0.0/27\nA_COMPLETER\n",
    "hints": [
      "Utiliser le module Python `la notation CIDR du réseau`.",
      "L’IP de passerelle correspond à l’adresse réseau + 1 (.1), et la première IP assignable aux machines correspond à l’adresse réseau + 4 (.4)."
    ],
    "examples": [
      {
        "stdin": "SUBNET name=snet-web cidr=10.0.1.0/24",
        "expected": "SUBNET snet-web: TOTAL=256 USABLE=251 RESERVED=5 GATEWAY=10.0.1.1 DNS1=10.0.1.2 RANGE=10.0.1.4-10.0.1.254",
        "note": "Sous-réseau /24 classique avec 251 adresses exploitables."
      }
    ],
    "tests": [
      {
        "label": "Sous-réseau de base de données /24 distinct",
        "stdin": "cas:1",
        "expected": "SUBNET snet-db: TOTAL=256 USABLE=251 RESERVED=5 GATEWAY=10.0.10.1 DNS1=10.0.10.2 RANGE=10.0.10.4-10.0.10.254"
      },
      {
        "label": "Petit sous-réseau AzureBastionSubnet en /26",
        "stdin": "cas:2",
        "expected": "SUBNET AzureBastionSubnet: TOTAL=64 USABLE=59 RESERVED=5 GATEWAY=10.0.2.1 DNS1=10.0.2.2 RANGE=10.0.2.4-10.0.2.62"
      },
      {
        "label": "Sous-réseau GatewaySubnet minimal en /27",
        "stdin": "cas:3",
        "expected": "SUBNET GatewaySubnet: TOTAL=32 USABLE=27 RESERVED=5 GATEWAY=192.168.0.1 DNS1=192.168.0.2 RANGE=192.168.0.4-192.168.0.30"
      }
    ],
    "solution": "[Exemple]\nSUBNET snet-web: TOTAL=256 USABLE=251 RESERVED=5 GATEWAY=10.0.1.1 DNS1=10.0.1.2 RANGE=10.0.1.4-10.0.1.254\n\n[Cas 1 — Sous-réseau de base de données /24 distinct]\nSUBNET snet-db: TOTAL=256 USABLE=251 RESERVED=5 GATEWAY=10.0.10.1 DNS1=10.0.10.2 RANGE=10.0.10.4-10.0.10.254\n\n[Cas 2 — Petit sous-réseau AzureBastionSubnet en /26]\nSUBNET AzureBastionSubnet: TOTAL=64 USABLE=59 RESERVED=5 GATEWAY=10.0.2.1 DNS1=10.0.2.2 RANGE=10.0.2.4-10.0.2.62\n\n[Cas 3 — Sous-réseau GatewaySubnet minimal en /27]\nSUBNET GatewaySubnet: TOTAL=32 USABLE=27 RESERVED=5 GATEWAY=192.168.0.1 DNS1=192.168.0.2 RANGE=192.168.0.4-192.168.0.30"
  },
  {
    "id": "az3-c4-e2",
    "chapter": 4,
    "title": "Moteur d'évaluation de règles de sécurité NSG",
    "level": "n2",
    "language": "analyse",
    "goal": "Évaluer le traitement d’un paquet réseau entrant par un groupe de sécurité réseau (NSG) selon l’ordre de priorité des règles et les règles par défaut Azure.",
    "brief": "<p>Un groupe de sécurité réseau (NSG) filtre le trafic entrant et sortant. Les règles sont traitées par ordre croissant de priorité (de 100 à 4096). La première règle correspondant au paquet s'applique immédiatement.<br><br>\nRègles par défaut Azure (INBOUND) automatiques en fin de chaîne :<br>\n- Priorité <code>65000</code> : <code>AllowVNetInBound</code>, source=<code>VirtualNetwork</code>, port=<code>*</code>, proto=<code>ANY</code>, action=<code>ALLOW</code><br>\n- Priorité <code>65001</code> : <code>AllowAzureLoadBalancerInBound</code>, source=<code>AzureLoadBalancer</code>, port=<code>*</code>, proto=<code>ANY</code>, action=<code>ALLOW</code><br>\n- Priorité <code>65500</code> : <code>DenyAllInBound</code>, source=<code>*</code>, port=<code>*</code>, proto=<code>ANY</code>, action=<code>DENY</code><br><br>\nFormat d'entrée :<br>\nDéclaration de règles personnalisées :<br>\n<code>RULE prio=&lt;int&gt; name=&lt;nom&gt; direction=INBOUND source=&lt;SRC&gt; port=&lt;PORT&gt; proto=&lt;TCP|UDP|ANY&gt; action=&lt;ALLOW|DENY&gt;</code><br>\nPuis paquets à évaluer :<br>\n<code>TEST_PACKET source=&lt;SRC&gt; port=&lt;PORT&gt; proto=&lt;TCP|UDP&gt;</code><br><br>\nCritères de correspondance d'un paquet :<br>\n- <code>source</code> : matche si la règle a <code>*</code> ou la même valeur exacte.<br>\n- <code>port</code> : matche si la règle a <code>*</code> ou le même numéro de port.<br>\n- <code>proto</code> : matche si la règle a <code>ANY</code> ou le même protocole exact.<br><br>\nFormat de sortie attendu :<br>\n<code>PACKET: matched_rule=&lt;name&gt; (prio=&lt;prio&gt;) -&gt; RESULT=&lt;ALLOW|DENY&gt;</code></p>",
    "starter": "# Grille d'analyse (az3-c4-e2) — Moteur d'évaluation de règles de sécurité NSG\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Règles personnalisées DNS et Telnet]\n# Données : RULE prio=150 name=Allow-DNS direction=INBOUND source=CorpDNS port=53 proto=UDP action=ALLOW\n# Données : RULE prio=250 name=Deny-Telnet direction=INBOUND source=* port=23 proto=TCP action=DENY\n# Données : TEST_PACKET source=CorpDNS port=53 proto=UDP\n# Données : TEST_PACKET source=AnyHost port=23 proto=TCP\nA_COMPLETER\n\n[Cas 2 — Chute sur les règles par défaut Azure VNet et DenyAll]\n# Données : RULE prio=300 name=Allow-HTTPS direction=INBOUND source=Internet port=443 proto=TCP action=ALLOW\n# Données : TEST_PACKET source=VirtualNetwork port=3389 proto=TCP\n# Données : TEST_PACKET source=ExternalHacker port=4444 proto=UDP\nA_COMPLETER\n\n[Cas 3 — Règle par défaut AzureLoadBalancer]\n# Données : TEST_PACKET source=AzureLoadBalancer port=80 proto=TCP\nA_COMPLETER\n",
    "hints": [
      "Ajouter les 3 règles par défaut Azure dans la liste des règles avec leurs priorités 65000, 65001 et 65500.",
      "Trier l'ensemble des règles par priorité croissante et trouver la première règle correspondante."
    ],
    "examples": [
      {
        "stdin": "RULE prio=100 name=Allow-HTTP direction=INBOUND source=Internet port=80 proto=TCP action=ALLOW\nRULE prio=200 name=Deny-SSH direction=INBOUND source=* port=22 proto=TCP action=DENY\nTEST_PACKET source=Internet port=80 proto=TCP\nTEST_PACKET source=Internet port=22 proto=TCP",
        "expected": "PACKET: matched_rule=Allow-HTTP (prio=100) -> RESULT=ALLOW\nPACKET: matched_rule=Deny-SSH (prio=200) -> RESULT=DENY",
        "note": "Le port 80 est autorisé par la règle 100 et SSH 22 est bloqué par la règle 200."
      }
    ],
    "tests": [
      {
        "label": "Règles personnalisées DNS et Telnet",
        "stdin": "cas:1",
        "expected": "PACKET: matched_rule=Allow-DNS (prio=150) -> RESULT=ALLOW\nPACKET: matched_rule=Deny-Telnet (prio=250) -> RESULT=DENY"
      },
      {
        "label": "Chute sur les règles par défaut Azure VNet et DenyAll",
        "stdin": "cas:2",
        "expected": "PACKET: matched_rule=AllowVNetInBound (prio=65000) -> RESULT=ALLOW\nPACKET: matched_rule=DenyAllInBound (prio=65500) -> RESULT=DENY"
      },
      {
        "label": "Règle par défaut AzureLoadBalancer",
        "stdin": "cas:3",
        "expected": "PACKET: matched_rule=AllowAzureLoadBalancerInBound (prio=65001) -> RESULT=ALLOW"
      }
    ],
    "solution": "[Exemple]\nPACKET: matched_rule=Allow-HTTP (prio=100) -> RESULT=ALLOW\nPACKET: matched_rule=Deny-SSH (prio=200) -> RESULT=DENY\n\n[Cas 1 — Règles personnalisées DNS et Telnet]\nPACKET: matched_rule=Allow-DNS (prio=150) -> RESULT=ALLOW\nPACKET: matched_rule=Deny-Telnet (prio=250) -> RESULT=DENY\n\n[Cas 2 — Chute sur les règles par défaut Azure VNet et DenyAll]\nPACKET: matched_rule=AllowVNetInBound (prio=65000) -> RESULT=ALLOW\nPACKET: matched_rule=DenyAllInBound (prio=65500) -> RESULT=DENY\n\n[Cas 3 — Règle par défaut AzureLoadBalancer]\nPACKET: matched_rule=AllowAzureLoadBalancerInBound (prio=65001) -> RESULT=ALLOW"
  },
  {
    "id": "az3-c4-e3",
    "chapter": 4,
    "title": "Validateur de Peering VNet & Topologie Hub-and-Spoke",
    "level": "n3",
    "language": "analyse",
    "goal": "Vérifier la validité de liens d’interconnexion (VNet Peering) en détectant les chevauchements de plages CIDR et les incohérences de passerelles de transit.",
    "brief": "<p>L'interconnexion de réseaux virtuels par Peering Azure permet une communication privée à haute performance. Toutefois, Azure refuse catégoriquement l'établissement d'un peering si les plages d'adresses IP se chevauchent, ou si la configuration de passerelle est incohérente.<br><br>\nFormat d'entrée :<br>\n1. Déclaration des VNets :<br>\n   <code>VNET id=&lt;nom&gt; cidr=&lt;plage_ip&gt;</code><br>\n2. Demande d'établissement de Peering :<br>\n   <code>PEERING vnet1=&lt;nom1&gt; vnet2=&lt;nom2&gt; allow_gw_transit=&lt;true|false&gt; use_remote_gw=&lt;true|false&gt;</code><br><br>\nRègles de validation :<br>\n- Si l'un des deux VNets n'a pas été déclaré au préalable :<br>\n  <code>PEERING_ERROR: Unknown VNet in peering &lt;nom1&gt; &lt;-&gt; &lt;nom2&gt;</code><br>\n- Si les plages CIDR des deux réseaux se chevauchent :<br>\n  <code>PEERING_FAILED: Overlapping CIDR between &lt;nom1&gt; (&lt;cidr1&gt;) and &lt;nom2&gt; (&lt;cidr2&gt;)</code><br>\n- Si <code>allow_gw_transit=true</code> ET <code>use_remote_gw=true</code> simultanément :<br>\n  <code>PEERING_FAILED: Incompatible gateway flags on peering &lt;nom1&gt; &lt;-&gt; &lt;nom2&gt;</code><br>\n- Si toutes les conditions sont remplies :<br>\n  <code>PEERING_SUCCESS: &lt;nom1&gt; &lt;-&gt; &lt;nom2&gt; status=CONNECTED gateway_transit=&lt;ENABLED|DISABLED&gt;</code><br>\n  (avec <code>ENABLED</code> si au moins l'un des deux flags est à true, sinon <code>DISABLED</code>).</p>",
    "starter": "# Grille d'analyse (az3-c4-e3) — Validateur de Peering VNet & Topologie Hub-and-Spoke\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Peering valide entre VNet Core et VNet App sans transit]\n# Données : VNET id=vnet-core cidr=172.16.0.0/16\n# Données : VNET id=vnet-app cidr=172.17.0.0/16\n# Données : PEERING vnet1=vnet-core vnet2=vnet-app allow_gw_transit=false use_remote_gw=false\nA_COMPLETER\n\n[Cas 2 — Échec dû au chevauchement CIDR]\n# Données : VNET id=vnet-a cidr=10.0.0.0/16\n# Données : VNET id=vnet-b cidr=10.0.1.0/24\n# Données : PEERING vnet1=vnet-a vnet2=vnet-b allow_gw_transit=false use_remote_gw=false\nA_COMPLETER\n\n[Cas 3 — Conflit de flags de passerelle et VNet inconnu]\n# Données : VNET id=vnet-hub cidr=10.0.0.0/16\n# Données : VNET id=vnet-spoke2 cidr=10.2.0.0/16\n# Données : PEERING vnet1=vnet-hub vnet2=vnet-spoke2 allow_gw_transit=true use_remote_gw=true\n# Données : PEERING vnet1=vnet-hub vnet2=vnet-ghost allow_gw_transit=false use_remote_gw=false\nA_COMPLETER\n",
    "hints": [
      "Vérifiez si les deux plages d’adresses CIDR se chevauchent (intersection non vide).",
      "Vérifier que allow_gw_transit et use_remote_gw ne sont pas tous les deux actifs en même temps."
    ],
    "examples": [
      {
        "stdin": "VNET id=vnet-hub cidr=10.0.0.0/16\nVNET id=vnet-spoke1 cidr=10.1.0.0/16\nPEERING vnet1=vnet-hub vnet2=vnet-spoke1 allow_gw_transit=true use_remote_gw=false",
        "expected": "PEERING_SUCCESS: vnet-hub <-> vnet-spoke1 status=CONNECTED gateway_transit=ENABLED",
        "note": "Peering valide sans chevauchement avec passerelle de transit activée sur le Hub."
      }
    ],
    "tests": [
      {
        "label": "Peering valide entre VNet Core et VNet App sans transit",
        "stdin": "cas:1",
        "expected": "PEERING_SUCCESS: vnet-core <-> vnet-app status=CONNECTED gateway_transit=DISABLED"
      },
      {
        "label": "Échec dû au chevauchement CIDR",
        "stdin": "cas:2",
        "expected": "PEERING_FAILED: Overlapping CIDR between vnet-a (10.0.0.0/16) and vnet-b (10.0.1.0/24)"
      },
      {
        "label": "Conflit de flags de passerelle et VNet inconnu",
        "stdin": "cas:3",
        "expected": "PEERING_FAILED: Incompatible gateway flags on peering vnet-hub <-> vnet-spoke2\nPEERING_ERROR: Unknown VNet in peering vnet-hub <-> vnet-ghost"
      }
    ],
    "solution": "[Exemple]\nPEERING_SUCCESS: vnet-hub <-> vnet-spoke1 status=CONNECTED gateway_transit=ENABLED\n\n[Cas 1 — Peering valide entre VNet Core et VNet App sans transit]\nPEERING_SUCCESS: vnet-core <-> vnet-app status=CONNECTED gateway_transit=DISABLED\n\n[Cas 2 — Échec dû au chevauchement CIDR]\nPEERING_FAILED: Overlapping CIDR between vnet-a (10.0.0.0/16) and vnet-b (10.0.1.0/24)\n\n[Cas 3 — Conflit de flags de passerelle et VNet inconnu]\nPEERING_FAILED: Incompatible gateway flags on peering vnet-hub <-> vnet-spoke2\nPEERING_ERROR: Unknown VNet in peering vnet-hub <-> vnet-ghost"
  },
  {
    "id": "az3-c5-e1",
    "chapter": 5,
    "title": "Simulateur de cycle de vie Azure Blob Storage",
    "level": "n1",
    "language": "analyse",
    "goal": "Appliquer des règles de gestion automatique du cycle de vie des données Blob Storage (Hot -> Cool -> Archive -> Delete) et mesurer les économies financières.",
    "brief": "<p>Azure Blob Lifecycle Management permet de transférer automatiquement des données froides vers des paliers de stockage moins coûteux ou de les purger.<br><br>\nTarification de référence mensuelle par Go :<br>\n- <code>HOT</code> : 0.0184 USD / Go<br>\n- <code>COOL</code> : 0.0100 USD / Go<br>\n- <code>ARCHIVE</code> : 0.00099 USD / Go<br>\n- <code>DELETED</code> : 0.0000 USD / Go<br><br>\nFormat d'entrée :<br>\nLigne 1 : Déclaration de la politique de cycle de vie :<br>\n<code>POLICY cool_days=&lt;int&gt; archive_days=&lt;int&gt; delete_days=&lt;int&gt;</code><br>\nLignes suivantes : Objets blobs à évaluer :<br>\n<code>BLOB name=&lt;nom&gt; size_gb=&lt;int&gt; age_days=&lt;int&gt;</code><br><br>\nRègles de transition (évaluation par ordre de priorité descendante) :<br>\n- Si <code>age_days &gt;= delete_days</code> : palier <code>DELETED</code> (coût = 0.0000)<br>\n- Sinon si <code>age_days &gt;= archive_days</code> : palier <code>ARCHIVE</code> (coût = <code>size_gb * 0.00099</code>)<br>\n- Sinon si <code>age_days &gt;= cool_days</code> : palier <code>COOL</code> (coût = <code>size_gb * 0.0100</code>)<br>\n- Sinon : palier <code>HOT</code> (coût = <code>size_gb * 0.0184</code>)<br><br>\nFormat de sortie attendu :<br>\nPour chaque blob :<br>\n<code>BLOB &lt;nom&gt;: age=&lt;age_days&gt;d TARGET_TIER=&lt;TIER&gt; COST=$&lt;cost:.4f&gt;</code><br>\nÀ la fin, afficher le récapitulatif comparatif (coût initial si tous en HOT vs coût optimisé) :<br>\n<code>TOTAL_HOT=$&lt;total_hot:.2f&gt; TOTAL_OPTIMIZED=$&lt;total_opt:.2f&gt; SAVINGS=&lt;savings_pct:.1f&gt;%</code></p>",
    "starter": "# Grille d'analyse (az3-c5-e1) — Simulateur de cycle de vie Azure Blob Storage\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Cycle de vie complet avec Hot, Cool et Archive]\n# Données : POLICY cool_days=15 archive_days=60 delete_days=180\n# Données : BLOB name=app-events.json size_gb=5 age_days=5\n# Données : BLOB name=db-snapshot.dump size_gb=50 age_days=20\n# Données : BLOB name=old-logs.gz size_gb=200 age_days=90\nA_COMPLETER\n\n[Cas 2 — Blobs récents restant tous en palier Hot]\n# Données : POLICY cool_days=30 archive_days=90 delete_days=180\n# Données : BLOB name=data1.parquet size_gb=20 age_days=5\n# Données : BLOB name=data2.parquet size_gb=30 age_days=15\nA_COMPLETER\n",
    "hints": [
      "Vérifier les conditions d'âge dans l'ordre : delete_days, puis archive_days, puis cool_days.",
      "Calculer total_hot = somme(size_gb * 0.0184) pour mesurer le gain du Lifecycle Management."
    ],
    "examples": [
      {
        "stdin": "POLICY cool_days=30 archive_days=90 delete_days=365\nBLOB name=log-recent.csv size_gb=10 age_days=10\nBLOB name=backup-q1.bak size_gb=100 age_days=45\nBLOB name=archive-2023.tar size_gb=500 age_days=120\nBLOB name=temp-2022.tmp size_gb=50 age_days=400",
        "expected": "BLOB log-recent.csv: age=10d TARGET_TIER=HOT COST=$0.1840\nBLOB backup-q1.bak: age=45d TARGET_TIER=COOL COST=$1.0000\nBLOB archive-2023.tar: age=120d TARGET_TIER=ARCHIVE COST=$0.4950\nBLOB temp-2022.tmp: age=400d TARGET_TIER=DELETED COST=$0.0000\nTOTAL_HOT=$12.14 TOTAL_OPTIMIZED=$1.68 SAVINGS=86.2%",
        "note": "Migration vers Cool, Archive et suppression générant 86.2% d'économies."
      }
    ],
    "tests": [
      {
        "label": "Cycle de vie complet avec Hot, Cool et Archive",
        "stdin": "cas:1",
        "expected": "BLOB app-events.json: age=5d TARGET_TIER=HOT COST=$0.0920\nBLOB db-snapshot.dump: age=20d TARGET_TIER=COOL COST=$0.5000\nBLOB old-logs.gz: age=90d TARGET_TIER=ARCHIVE COST=$0.1980\nTOTAL_HOT=$4.69 TOTAL_OPTIMIZED=$0.79 SAVINGS=83.2%"
      },
      {
        "label": "Blobs récents restant tous en palier Hot",
        "stdin": "cas:2",
        "expected": "BLOB data1.parquet: age=5d TARGET_TIER=HOT COST=$0.3680\nBLOB data2.parquet: age=15d TARGET_TIER=HOT COST=$0.5520\nTOTAL_HOT=$0.92 TOTAL_OPTIMIZED=$0.92 SAVINGS=0.0%"
      }
    ],
    "solution": "[Exemple]\nBLOB log-recent.csv: age=10d TARGET_TIER=HOT COST=$0.1840\nBLOB backup-q1.bak: age=45d TARGET_TIER=COOL COST=$1.0000\nBLOB archive-2023.tar: age=120d TARGET_TIER=ARCHIVE COST=$0.4950\nBLOB temp-2022.tmp: age=400d TARGET_TIER=DELETED COST=$0.0000\nTOTAL_HOT=$12.14 TOTAL_OPTIMIZED=$1.68 SAVINGS=86.2%\n\n[Cas 1 — Cycle de vie complet avec Hot, Cool et Archive]\nBLOB app-events.json: age=5d TARGET_TIER=HOT COST=$0.0920\nBLOB db-snapshot.dump: age=20d TARGET_TIER=COOL COST=$0.5000\nBLOB old-logs.gz: age=90d TARGET_TIER=ARCHIVE COST=$0.1980\nTOTAL_HOT=$4.69 TOTAL_OPTIMIZED=$0.79 SAVINGS=83.2%\n\n[Cas 2 — Blobs récents restant tous en palier Hot]\nBLOB data1.parquet: age=5d TARGET_TIER=HOT COST=$0.3680\nBLOB data2.parquet: age=15d TARGET_TIER=HOT COST=$0.5520\nTOTAL_HOT=$0.92 TOTAL_OPTIMIZED=$0.92 SAVINGS=0.0%"
  },
  {
    "id": "az3-c5-e2",
    "chapter": 5,
    "title": "Validateur de requêtes avec jetons SAS",
    "level": "n2",
    "language": "analyse",
    "goal": "Valider la conformité d’appels API clients face aux permissions, plages horaires et protocoles imposés par un jeton de signature d’accès partagé (SAS).",
    "brief": "<p>Les jetons de signature d'accès partagé (Azure SAS Tokens) délèguent un accès restreint aux ressources de stockage en précisant les permissions accordées, une fenêtre temporelle et un protocole strict.<br><br>\nFormat d'entrée :<br>\nLigne 1 : Configuration du jeton SAS :<br>\n<code>SAS_CONFIG sp=&lt;perms&gt; st=&lt;int&gt; se=&lt;int&gt; spr=&lt;protocol&gt;</code><br>\n- <code>sp</code> : permissions autorisées (sous-chaîne contenant <code>r</code>, <code>w</code>, <code>d</code>, <code>l</code>)<br>\n- <code>st</code> : horodatage début de validité (entier)<br>\n- <code>se</code> : horodatage fin de validité (entier)<br>\n- <code>spr</code> : protocole imposé (<code>https</code> ou <code>https,http</code>)<br><br>\nLignes suivantes : Requêtes HTTP clientes :<br>\n<code>REQUEST method=&lt;GET|PUT|DELETE|LIST&gt; time=&lt;int&gt; proto=&lt;http|https&gt;</code><br><br>\nCorrespondance des méthodes HTTP avec les permissions SAS :<br>\n- <code>GET</code> requiert <code>r</code><br>\n- <code>PUT</code> requiert <code>w</code><br>\n- <code>DELETE</code> requiert <code>d</code><br>\n- <code>LIST</code> requiert <code>l</code><br><br>\nOrdre strict d'évaluation de la requête :<br>\n1. Si <code>spr=https</code> et que la requête utilise <code>proto=http</code> :<br>\n   <code>REQUEST &lt;method&gt; at &lt;time&gt;: DENIED (reason=PROTOCOL_VIOLATION)</code><br>\n2. Si <code>time &lt; st</code> :<br>\n   <code>REQUEST &lt;method&gt; at &lt;time&gt;: DENIED (reason=NOT_YET_VALID)</code><br>\n3. Si <code>time &gt; se</code> :<br>\n   <code>REQUEST &lt;method&gt; at &lt;time&gt;: DENIED (reason=EXPIRED)</code><br>\n4. Si la permission requise n'est pas présente dans <code>sp</code> :<br>\n   <code>REQUEST &lt;method&gt; at &lt;time&gt;: DENIED (reason=INSUFFICIENT_PERMISSIONS)</code><br>\n5. Si tous les contrôles réussissent :<br>\n   <code>REQUEST &lt;method&gt; at &lt;time&gt;: ALLOWED</code></p>",
    "starter": "# Grille d'analyse (az3-c5-e2) — Validateur de requêtes avec jetons SAS\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Vérification normale des permissions PUT et LIST]\n# Données : SAS_CONFIG sp=rwd st=50 se=150 spr=https\n# Données : REQUEST method=PUT time=100 proto=https\n# Données : REQUEST method=LIST time=100 proto=https\nA_COMPLETER\n\n[Cas 2 — Violations de protocole et fenêtres temporelles expirées ou anticipées]\n# Données : SAS_CONFIG sp=r st=100 se=200 spr=https\n# Données : REQUEST method=GET time=150 proto=http\n# Données : REQUEST method=GET time=80 proto=https\n# Données : REQUEST method=GET time=250 proto=https\nA_COMPLETER\n\n[Cas 3 — Jeton avec protocole dual https et http et permission list]\n# Données : SAS_CONFIG sp=rl st=50 se=150 spr=https,http\n# Données : REQUEST method=LIST time=100 proto=http\n# Données : REQUEST method=PUT time=100 proto=http\nA_COMPLETER\n",
    "hints": [
      "Créer un dictionnaire associant chaque méthode HTTP à sa lettre de permission (GET: r, PUT: w, DELETE: d, LIST: l).",
      "Respecter l'ordre prescrit des contrôles d'erreur : protocole, puis anticipé, puis expiré, puis permissions."
    ],
    "examples": [
      {
        "stdin": "SAS_CONFIG sp=rw st=100 se=200 spr=https\nREQUEST method=GET time=150 proto=https\nREQUEST method=DELETE time=150 proto=https",
        "expected": "REQUEST GET at 150: ALLOWED\nREQUEST DELETE at 150: DENIED (reason=INSUFFICIENT_PERMISSIONS)",
        "note": "Lecture autorisée mais suppression interdite par le jeton SAS (permissions rw uniquement)."
      }
    ],
    "tests": [
      {
        "label": "Vérification normale des permissions PUT et LIST",
        "stdin": "cas:1",
        "expected": "REQUEST PUT at 100: ALLOWED\nREQUEST LIST at 100: DENIED (reason=INSUFFICIENT_PERMISSIONS)"
      },
      {
        "label": "Violations de protocole et fenêtres temporelles expirées ou anticipées",
        "stdin": "cas:2",
        "expected": "REQUEST GET at 150: DENIED (reason=PROTOCOL_VIOLATION)\nREQUEST GET at 80: DENIED (reason=NOT_YET_VALID)\nREQUEST GET at 250: DENIED (reason=EXPIRED)"
      },
      {
        "label": "Jeton avec protocole dual https et http et permission list",
        "stdin": "cas:3",
        "expected": "REQUEST LIST at 100: ALLOWED\nREQUEST PUT at 100: DENIED (reason=INSUFFICIENT_PERMISSIONS)"
      }
    ],
    "solution": "[Exemple]\nREQUEST GET at 150: ALLOWED\nREQUEST DELETE at 150: DENIED (reason=INSUFFICIENT_PERMISSIONS)\n\n[Cas 1 — Vérification normale des permissions PUT et LIST]\nREQUEST PUT at 100: ALLOWED\nREQUEST LIST at 100: DENIED (reason=INSUFFICIENT_PERMISSIONS)\n\n[Cas 2 — Violations de protocole et fenêtres temporelles expirées ou anticipées]\nREQUEST GET at 150: DENIED (reason=PROTOCOL_VIOLATION)\nREQUEST GET at 80: DENIED (reason=NOT_YET_VALID)\nREQUEST GET at 250: DENIED (reason=EXPIRED)\n\n[Cas 3 — Jeton avec protocole dual https et http et permission list]\nREQUEST LIST at 100: ALLOWED\nREQUEST PUT at 100: DENIED (reason=INSUFFICIENT_PERMISSIONS)"
  },
  {
    "id": "az3-c5-e3",
    "chapter": 5,
    "title": "Sélecteur d'architecture de données Azure",
    "level": "n3",
    "language": "analyse",
    "goal": "Analyser les besoins fonctionnels et recommander le service de stockage ou de base de données managé Azure adéquat.",
    "brief": "<p>Azure dispose d'une gamme diversifiée de services de données managés. Le choix dépend du modèle de données (relationnel, NoSQL, fichiers, objets) et des contraintes d'infrastructure.<br><br>\nMatrice de décision Azure :<br>\n- Si <code>model=RELATIONAL</code> :<br>\n  <code>SERVICE=Azure_SQL_Database JUSTIFICATION=\"Moteur relationnel transactionnel ACID et compatibilité T-SQL\"</code><br>\n- Si <code>model=NOSQL_DOCUMENT</code> :<br>\n  <code>SERVICE=Azure_Cosmos_DB JUSTIFICATION=\"Base NoSQL multi-modèle distribuée mondialement avec latence garantie &lt; 10ms\"</code><br>\n- Si <code>model=FILE_SMB</code> :<br>\n  <code>SERVICE=Azure_Files JUSTIFICATION=\"Partage de fichiers partagé natif compatible SMB/NFS sans serveur dédié\"</code><br>\n- Si <code>model=UNSTRUCTURED_OBJECTS</code> :<br>\n  <code>SERVICE=Azure_Blob_Storage JUSTIFICATION=\"Stockage objet massif hautement scalable avec gestion de cycle de vie et niveaux d'accès\"</code><br><br>\nFormat d'entrée :<br>\n<code>REQUIREMENT workload=&lt;nom&gt; model=&lt;MODEL&gt;</code><br><br>\nFormat de sortie attendu :<br>\n<code>DECISION workload=&lt;nom&gt;: SERVICE=&lt;SERVICE&gt; JUSTIFICATION=\"&lt;JUSTIFICATION&gt;\"</code><br>\n(Si le modèle est inconnu : <code>DECISION workload=&lt;nom&gt;: SERVICE=UNKNOWN JUSTIFICATION=\"Modèle non supporté\"</code>).</p>",
    "starter": "# Grille d'analyse (az3-c5-e3) — Sélecteur d'architecture de données Azure\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Classification CRM relationnel et télémétrie IoT NoSQL]\n# Données : REQUIREMENT workload=crm-core model=RELATIONAL\n# Données : REQUIREMENT workload=iot-telemetry model=NOSQL_DOCUMENT\nA_COMPLETER\n\n[Cas 2 — Classification partage SMB et data lake Blob]\n# Données : REQUIREMENT workload=legacy-shares model=FILE_SMB\n# Données : REQUIREMENT workload=data-lake model=UNSTRUCTURED_OBJECTS\nA_COMPLETER\n\n[Cas 3 — Cas de modèle inconnu]\n# Données : REQUIREMENT workload=blockchain model=LEDGER_GRAPH\nA_COMPLETER\n",
    "hints": [
      "Associer chaque mot-clé de modèle de données aux caractéristiques techniques du service managé Azure.",
      "Soigner le formatage avec guillemets autour de la justification."
    ],
    "examples": [
      {
        "stdin": "REQUIREMENT workload=app-erp model=RELATIONAL\nREQUIREMENT workload=mobile-cart model=NOSQL_DOCUMENT",
        "expected": "DECISION workload=app-erp: SERVICE=Azure_SQL_Database JUSTIFICATION=\"Moteur relationnel transactionnel ACID et compatibilité T-SQL\"\nDECISION workload=mobile-cart: SERVICE=Azure_Cosmos_DB JUSTIFICATION=\"Base NoSQL multi-modèle distribuée mondialement avec latence garantie < 10ms\"",
        "note": "Sélection d'Azure SQL pour l'ERP et Cosmos DB pour le panier mobile."
      }
    ],
    "tests": [
      {
        "label": "Classification CRM relationnel et télémétrie IoT NoSQL",
        "stdin": "cas:1",
        "expected": "DECISION workload=crm-core: SERVICE=Azure_SQL_Database JUSTIFICATION=\"Moteur relationnel transactionnel ACID et compatibilité T-SQL\"\nDECISION workload=iot-telemetry: SERVICE=Azure_Cosmos_DB JUSTIFICATION=\"Base NoSQL multi-modèle distribuée mondialement avec latence garantie < 10ms\""
      },
      {
        "label": "Classification partage SMB et data lake Blob",
        "stdin": "cas:2",
        "expected": "DECISION workload=legacy-shares: SERVICE=Azure_Files JUSTIFICATION=\"Partage de fichiers partagé natif compatible SMB/NFS sans serveur dédié\"\nDECISION workload=data-lake: SERVICE=Azure_Blob_Storage JUSTIFICATION=\"Stockage objet massif hautement scalable avec gestion de cycle de vie et niveaux d'accès\""
      },
      {
        "label": "Cas de modèle inconnu",
        "stdin": "cas:3",
        "expected": "DECISION workload=blockchain: SERVICE=UNKNOWN JUSTIFICATION=\"Modèle non supporté\""
      }
    ],
    "solution": "[Exemple]\nDECISION workload=app-erp: SERVICE=Azure_SQL_Database JUSTIFICATION=\"Moteur relationnel transactionnel ACID et compatibilité T-SQL\"\nDECISION workload=mobile-cart: SERVICE=Azure_Cosmos_DB JUSTIFICATION=\"Base NoSQL multi-modèle distribuée mondialement avec latence garantie < 10ms\"\n\n[Cas 1 — Classification CRM relationnel et télémétrie IoT NoSQL]\nDECISION workload=crm-core: SERVICE=Azure_SQL_Database JUSTIFICATION=\"Moteur relationnel transactionnel ACID et compatibilité T-SQL\"\nDECISION workload=iot-telemetry: SERVICE=Azure_Cosmos_DB JUSTIFICATION=\"Base NoSQL multi-modèle distribuée mondialement avec latence garantie < 10ms\"\n\n[Cas 2 — Classification partage SMB et data lake Blob]\nDECISION workload=legacy-shares: SERVICE=Azure_Files JUSTIFICATION=\"Partage de fichiers partagé natif compatible SMB/NFS sans serveur dédié\"\nDECISION workload=data-lake: SERVICE=Azure_Blob_Storage JUSTIFICATION=\"Stockage objet massif hautement scalable avec gestion de cycle de vie et niveaux d'accès\"\n\n[Cas 3 — Cas de modèle inconnu]\nDECISION workload=blockchain: SERVICE=UNKNOWN JUSTIFICATION=\"Modèle non supporté\""
  },
  {
    "id": "az3-c6-e1",
    "chapter": 6,
    "title": "Interpréteur de requêtes Log Analytics KQL",
    "level": "n1",
    "language": "analyse",
    "goal": "Exécuter un pipeline de requêtes KQL (where, summarize, order by, take) sur un jeu de journaux d’événements Azure.",
    "brief": "<p>Le langage KQL (Kusto Query Language) est le standard d'interrogation analytique d'Azure Monitor, Log Analytics et Microsoft Sentinel.<br><br>\nFormat d'entrée :<br>\nUn flux d'événements Azure au format :<br>\n<code>EVENT rg=&lt;rg&gt; op=&lt;operation&gt; status=&lt;Success|Failed&gt; duration_ms=&lt;int&gt;</code><br>\nSuivi d'une instruction KQL sur la dernière ligne :<br>\n<code>KQL where status == \"&lt;Success|Failed&gt;\" | summarize count() by op | order by count_ desc | take &lt;N&gt;</code><br><br>\nComportement du moteur KQL :<br>\n1. Filtrer les événements où <code>status</code> correspond à la valeur demandée.<br>\n2. Agréger les occurrences par <code>op</code> (opération), produisant un champ <code>count_</code>.<br>\n3. Trier les résultats par <code>count_</code> décroissant (en cas d'égalité, tri alphabétique croissant sur <code>op</code>).<br>\n4. Conserver les <code>N</code> premières lignes (opérateur <code>take</code>).<br><br>\nFormat de sortie attendu :<br>\nEn-tête : <code>op | count_</code><br>\nChaque ligne : <code>&lt;op&gt; | &lt;count_&gt;</code><br>\n(Si aucun événement ne correspond : afficher uniquement l'en-tête).</p>",
    "starter": "# Grille d'analyse (az3-c6-e1) — Interpréteur de requêtes Log Analytics KQL\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Requête sur les opérations de sécurité en échec]\n# Données : EVENT rg=rg-sec op=RevokeKey status=Failed duration_ms=200\n# Données : EVENT rg=rg-sec op=RevokeKey status=Failed duration_ms=220\n# Données : EVENT rg=rg-sec op=RevokeKey status=Failed duration_ms=210\n# Données : EVENT rg=rg-sec op=RotateSecret status=Failed duration_ms=180\n# Données : KQL where status == \"Failed\" | summarize count() by op | order by count_ desc | take 2\nA_COMPLETER\n\n[Cas 2 — Requête sur les succès avec take 3]\n# Données : EVENT rg=rg-prod op=StartVM status=Success duration_ms=100\n# Données : EVENT rg=rg-prod op=StartVM status=Success duration_ms=120\n# Données : EVENT rg=rg-prod op=AttachDisk status=Success duration_ms=250\n# Données : EVENT rg=rg-prod op=CreateNic status=Success duration_ms=180\n# Données : KQL where status == \"Success\" | summarize count() by op | order by count_ desc | take 3\nA_COMPLETER\n\n[Cas 3 — Aucun événement ne correspondant au filtre]\n# Données : EVENT rg=rg-prod op=StartVM status=Success duration_ms=100\n# Données : KQL where status == \"Failed\" | summarize count() by op | order by count_ desc | take 5\nA_COMPLETER\n",
    "hints": [
      "Stocker les événements dans une liste de dictionnaires.",
      "Extraire le filtre status et la limite N depuis la ligne de commande KQL avec re ou split.",
      "Utiliser collections.Counter pour compter les opérations filtrées."
    ],
    "examples": [
      {
        "stdin": "EVENT rg=rg-prod op=RestartVM status=Failed duration_ms=450\nEVENT rg=rg-prod op=DeleteDisk status=Failed duration_ms=1200\nEVENT rg=rg-prod op=RestartVM status=Failed duration_ms=300\nEVENT rg=rg-dev op=RestartVM status=Success duration_ms=150\nKQL where status == \"Failed\" | summarize count() by op | order by count_ desc | take 2",
        "expected": "op | count_\nRestartVM | 2\nDeleteDisk | 1",
        "note": "Filtrage des événements en échec, agrégation par opération et sélection des 2 premières."
      }
    ],
    "tests": [
      {
        "label": "Requête sur les opérations de sécurité en échec",
        "stdin": "cas:1",
        "expected": "op | count_\nRevokeKey | 3\nRotateSecret | 1"
      },
      {
        "label": "Requête sur les succès avec take 3",
        "stdin": "cas:2",
        "expected": "op | count_\nStartVM | 2\nAttachDisk | 1\nCreateNic | 1"
      },
      {
        "label": "Aucun événement ne correspondant au filtre",
        "stdin": "cas:3",
        "expected": "op | count_"
      }
    ],
    "solution": "[Exemple]\nop | count_\nRestartVM | 2\nDeleteDisk | 1\n\n[Cas 1 — Requête sur les opérations de sécurité en échec]\nop | count_\nRevokeKey | 3\nRotateSecret | 1\n\n[Cas 2 — Requête sur les succès avec take 3]\nop | count_\nStartVM | 2\nAttachDisk | 1\nCreateNic | 1\n\n[Cas 3 — Aucun événement ne correspondant au filtre]\nop | count_"
  },
  {
    "id": "az3-c6-e2",
    "chapter": 6,
    "title": "Gestionnaire d'alertes Azure Monitor et suivi budgétaire",
    "level": "n2",
    "language": "analyse",
    "goal": "Évaluer en temps réel des règles d’alerte sur métriques d’infrastructure (CPU) et surveiller les seuils d’engagement budgétaire Cost Management.",
    "brief": "<p>Azure Monitor déclenche des alertes métriques pour automatiser les remédiations, tandis qu'Azure Cost Management avertit les équipes lorsque les dépenses réelles ou prévisionnelles franchissent des pourcentages clés du budget mensuel.<br><br>\nFormat d'entrée :<br>\n1. Définition du budget mensuel :<br>\n   <code>BUDGET amount=&lt;float&gt; currency=EUR</code><br>\n2. Déclaration des règles d'alerte :<br>\n   - <code>ALERT_RULE metric=CPU threshold=&lt;int&gt; severity=&lt;Sev0..Sev4&gt;</code><br>\n   - <code>ALERT_RULE metric=SPEND_ACTUAL threshold_pct=&lt;int&gt; severity=&lt;Sev0..Sev4&gt;</code><br>\n   - <code>ALERT_RULE metric=SPEND_FORECAST threshold_pct=&lt;int&gt; severity=&lt;Sev0..Sev4&gt;</code><br>\n3. Enregistrements télémétriques :<br>\n   <code>RECORD metric=&lt;METRIC&gt; value=&lt;float&gt;</code><br><br>\nRègles de déclenchement :<br>\n- Pour <code>CPU</code> :<br>\n  - Si <code>value &gt;= threshold</code> :<br>\n    <code>ALERT_FIRED: metric=CPU val=&lt;value:.1f&gt;% threshold=&lt;threshold&gt;% severity=&lt;SevX&gt; action=TRIGGER_ACTION_GROUP</code><br>\n  - Sinon : <code>ALERT_OK: metric=CPU val=&lt;value:.1f&gt;%</code><br>\n- Pour <code>SPEND_ACTUAL</code> :<br>\n  Le seuil en euros vaut <code>amount * (threshold_pct / 100)</code>.<br>\n  - Si <code>value &gt;= seuil_euros</code> :<br>\n    <code>ALERT_FIRED: metric=SPEND_ACTUAL val=&lt;value:.2f&gt;EUR threshold=&lt;seuil_euros:.2f&gt;EUR (pct=&lt;threshold_pct&gt;%) severity=&lt;SevX&gt; action=NOTIFY_FINOPS</code><br>\n  - Sinon : <code>ALERT_OK: metric=SPEND_ACTUAL val=&lt;value:.2f&gt;EUR</code><br>\n- Pour <code>SPEND_FORECAST</code> :<br>\n  Le seuil en euros vaut <code>amount * (threshold_pct / 100)</code>.<br>\n  - Si <code>value &gt;= seuil_euros</code> :<br>\n    <code>ALERT_FIRED: metric=SPEND_FORECAST val=&lt;value:.2f&gt;EUR threshold=&lt;seuil_euros:.2f&gt;EUR (pct=&lt;threshold_pct&gt;%) severity=&lt;SevX&gt; action=NOTIFY_FINOPS</code><br>\n  - Sinon : <code>ALERT_OK: metric=SPEND_FORECAST val=&lt;value:.2f&gt;EUR</code></p>",
    "starter": "# Grille d'analyse (az3-c6-e2) — Gestionnaire d'alertes Azure Monitor et suivi budgétaire\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — CPU au-dessus du seuil et dépense réelle sous le seuil]\n# Données : BUDGET amount=1200 currency=EUR\n# Données : ALERT_RULE metric=CPU threshold=75 severity=Sev1\n# Données : ALERT_RULE metric=SPEND_ACTUAL threshold_pct=85 severity=Sev2\n# Données : RECORD metric=CPU value=92.0\n# Données : RECORD metric=SPEND_ACTUAL value=800.0\nA_COMPLETER\n\n[Cas 2 — Dépassement prévisionnel 100% et dépense réelle à 90%]\n# Données : BUDGET amount=500 currency=EUR\n# Données : ALERT_RULE metric=SPEND_ACTUAL threshold_pct=90 severity=Sev1\n# Données : ALERT_RULE metric=SPEND_FORECAST threshold_pct=100 severity=Sev1\n# Données : RECORD metric=SPEND_ACTUAL value=460.0\n# Données : RECORD metric=SPEND_FORECAST value=550.0\nA_COMPLETER\n\n[Cas 3 — Toutes les métriques conformes sous les seuils]\n# Données : BUDGET amount=2000 currency=EUR\n# Données : ALERT_RULE metric=CPU threshold=90 severity=Sev0\n# Données : RECORD metric=CPU value=45.0\nA_COMPLETER\n",
    "hints": [
      "Calculer les seuils budgétaires effectifs en multipliant le montant du budget par threshold_pct / 100.",
      "Associer chaque métrique à sa sévérité et formater rigoureusement les messages d'alerte."
    ],
    "examples": [
      {
        "stdin": "BUDGET amount=1000 currency=EUR\nALERT_RULE metric=CPU threshold=80 severity=Sev1\nALERT_RULE metric=SPEND_ACTUAL threshold_pct=80 severity=Sev2\nRECORD metric=CPU value=85.5\nRECORD metric=SPEND_ACTUAL value=750.0",
        "expected": "ALERT_FIRED: metric=CPU val=85.5% threshold=80% severity=Sev1 action=TRIGGER_ACTION_GROUP\nALERT_OK: metric=SPEND_ACTUAL val=750.00EUR",
        "note": "Alerte CPU déclenchée à 85.5% et dépense sous le seuil des 80% (800 EUR)."
      }
    ],
    "tests": [
      {
        "label": "CPU au-dessus du seuil et dépense réelle sous le seuil",
        "stdin": "cas:1",
        "expected": "ALERT_FIRED: metric=CPU val=92.0% threshold=75% severity=Sev1 action=TRIGGER_ACTION_GROUP\nALERT_OK: metric=SPEND_ACTUAL val=800.00EUR"
      },
      {
        "label": "Dépassement prévisionnel 100% et dépense réelle à 90%",
        "stdin": "cas:2",
        "expected": "ALERT_FIRED: metric=SPEND_ACTUAL val=460.00EUR threshold=450.00EUR (pct=90%) severity=Sev1 action=NOTIFY_FINOPS\nALERT_FIRED: metric=SPEND_FORECAST val=550.00EUR threshold=500.00EUR (pct=100%) severity=Sev1 action=NOTIFY_FINOPS"
      },
      {
        "label": "Toutes les métriques conformes sous les seuils",
        "stdin": "cas:3",
        "expected": "ALERT_OK: metric=CPU val=45.0%"
      }
    ],
    "solution": "[Exemple]\nALERT_FIRED: metric=CPU val=85.5% threshold=80% severity=Sev1 action=TRIGGER_ACTION_GROUP\nALERT_OK: metric=SPEND_ACTUAL val=750.00EUR\n\n[Cas 1 — CPU au-dessus du seuil et dépense réelle sous le seuil]\nALERT_FIRED: metric=CPU val=92.0% threshold=75% severity=Sev1 action=TRIGGER_ACTION_GROUP\nALERT_OK: metric=SPEND_ACTUAL val=800.00EUR\n\n[Cas 2 — Dépassement prévisionnel 100% et dépense réelle à 90%]\nALERT_FIRED: metric=SPEND_ACTUAL val=460.00EUR threshold=450.00EUR (pct=90%) severity=Sev1 action=NOTIFY_FINOPS\nALERT_FIRED: metric=SPEND_FORECAST val=550.00EUR threshold=500.00EUR (pct=100%) severity=Sev1 action=NOTIFY_FINOPS\n\n[Cas 3 — Toutes les métriques conformes sous les seuils]\nALERT_OK: metric=CPU val=45.0%"
  },
  {
    "id": "az3-c6-e3",
    "chapter": 6,
    "title": "Linter et ordonnanceur de gabarit Bicep / ARM",
    "level": "n3",
    "language": "analyse",
    "goal": "Vérifier la validité des déclarations et dépendances (dependsOn) d’un gabarit d’Infrastructure as Code Azure et ordonnancer les déploiements.",
    "brief": "<p>Dans les modèles Azure Resource Manager (ARM) ou Bicep, la propriété <code>dependsOn</code> garantit que les ressources prérequises (ex: réseau, sous-réseau, carte réseau) sont déployées avant les ressources dépendantes (ex: machine virtuelle).<br><br>\nFormat d'entrée :<br>\n- Déclaration des paramètres :<br>\n  <code>PARAM name=&lt;nom&gt; type=&lt;string|int|bool&gt;</code><br>\n- Déclaration des ressources :<br>\n  <code>RESOURCE name=&lt;nom&gt; type=&lt;type&gt; dependsOn=[&lt;dep1&gt;,&lt;dep2&gt;]</code> (ou <code>dependsOn=[]</code>).<br><br>\nContrôles de cohérence :<br>\n1. Dépendance manquante : si une ressource mentionnée dans <code>dependsOn</code> n'est déclarée dans aucune ligne <code>RESOURCE</code> :<br>\n   <code>LINT_FAILED: Missing dependency '&lt;nom_dep&gt;' for resource '&lt;nom_res&gt;'</code><br>\n2. Dépendance circulaire : si le graphe des dépendances contient une boucle (ex: A dépend de B qui dépend de A) :<br>\n   <code>LINT_FAILED: Circular dependency detected involving '&lt;nom_res&gt;'</code><br>\n3. Si le gabarit est valide : déterminer l'ordre d'exécution (tri topologique déterministe où chaque ressource intervient après ses dépendances ; en cas d'indépendance mutuelle, tri alphabétique par nom de ressource) :<br>\n   <code>LINT_SUCCESS: resources_count=&lt;N&gt; params_count=&lt;M&gt; execution_order=[&lt;res1&gt;, &lt;res2&gt;, ...]</code></p>",
    "starter": "# Grille d'analyse (az3-c6-e3) — Linter et ordonnanceur de gabarit Bicep / ARM\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Gabarit conforme App Service Plan et WebApp]\n# Données : PARAM name=location type=string\n# Données : PARAM name=sku type=string\n# Données : RESOURCE name=appServicePlan type=Microsoft.Web/serverfarms dependsOn=[]\n# Données : RESOURCE name=webApp type=Microsoft.Web/sites dependsOn=[appServicePlan]\nA_COMPLETER\n\n[Cas 2 — Dépendance manquante non déclarée]\n# Données : RESOURCE name=vm01 type=Microsoft.Compute/virtualMachines dependsOn=[storageAccount01]\nA_COMPLETER\n\n[Cas 3 — Dépendance circulaire détectée entre deux ressources]\n# Données : RESOURCE name=resA type=TypeA dependsOn=[resB]\n# Données : RESOURCE name=resB type=TypeB dependsOn=[resA]\nA_COMPLETER\n\n[Cas 4 — Ressources indépendantes triées alphabétiquement]\n# Données : RESOURCE name=storage01 type=Microsoft.Storage/storageAccounts dependsOn=[]\n# Données : RESOURCE name=kv01 type=Microsoft.KeyVault/vaults dependsOn=[]\nA_COMPLETER\n",
    "hints": [
      "Construire le graphe des dépendances : chaque ressource possède une liste de prérequis.",
      "Utiliser l'algorithme de Kahn pour le tri topologique : extraire en priorité les ressources sans dépendances non satisfaites.",
      "Trier la file des ressources prêtes par ordre alphabétique pour assurer un résultat déterministe."
    ],
    "examples": [
      {
        "stdin": "PARAM name=env type=string\nRESOURCE name=vnet01 type=Microsoft.Network/virtualNetworks dependsOn=[]\nRESOURCE name=nic01 type=Microsoft.Network/networkInterfaces dependsOn=[vnet01]\nRESOURCE name=vm01 type=Microsoft.Compute/virtualMachines dependsOn=[nic01]",
        "expected": "LINT_SUCCESS: resources_count=3 params_count=1 execution_order=[vnet01, nic01, vm01]",
        "note": "Gabarit valide déployant dans l'ordre vnet01 puis nic01 puis vm01."
      }
    ],
    "tests": [
      {
        "label": "Gabarit conforme App Service Plan et WebApp",
        "stdin": "cas:1",
        "expected": "LINT_SUCCESS: resources_count=2 params_count=2 execution_order=[appServicePlan, webApp]"
      },
      {
        "label": "Dépendance manquante non déclarée",
        "stdin": "cas:2",
        "expected": "LINT_FAILED: Missing dependency 'storageAccount01' for resource 'vm01'"
      },
      {
        "label": "Dépendance circulaire détectée entre deux ressources",
        "stdin": "cas:3",
        "expected": "LINT_FAILED: Circular dependency detected involving 'resA'"
      },
      {
        "label": "Ressources indépendantes triées alphabétiquement",
        "stdin": "cas:4",
        "expected": "LINT_SUCCESS: resources_count=2 params_count=0 execution_order=[kv01, storage01]"
      }
    ],
    "solution": "[Exemple]\nLINT_SUCCESS: resources_count=3 params_count=1 execution_order=[vnet01, nic01, vm01]\n\n[Cas 1 — Gabarit conforme App Service Plan et WebApp]\nLINT_SUCCESS: resources_count=2 params_count=2 execution_order=[appServicePlan, webApp]\n\n[Cas 2 — Dépendance manquante non déclarée]\nLINT_FAILED: Missing dependency 'storageAccount01' for resource 'vm01'\n\n[Cas 3 — Dépendance circulaire détectée entre deux ressources]\nLINT_FAILED: Circular dependency detected involving 'resA'\n\n[Cas 4 — Ressources indépendantes triées alphabétiquement]\nLINT_SUCCESS: resources_count=2 params_count=0 execution_order=[kv01, storage01]"
  }
];
