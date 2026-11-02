'use strict';

module.exports = [
  {
    "id": "az3-c1-e1",
    "chapter": 1,
    "title": "Analyse d’une hiérarchie et convention de nommage fictives",
    "level": "n1",
    "language": "analyse",
    "goal": "Appliquer à des chemins une convention fictive de hiérarchie et de nommage inspirée d’Azure.",
    "brief": "<p>Pour cet exercice, une convention fictive inspirée d’Azure utilise un chemin à quatre segments. Dans Azure, le nombre de groupes de gestion peut varier et la convention de nommage est à définir selon l’organisation :\n<code>ManagementGroup_Parent / ManagementGroup_Child / Subscription / ResourceGroup</code>.<br><br>\nAnalysez les paramètres du problème pour chaque cas. La chaîne doit comporter exactement 4 segments non vides séparés par <code>/</code>. Si ce n'est pas le cas, utilisez <code>INVALID: reason=&lt;motif&gt;</code> avec le motif <code>MALFORMED_HIERARCHY</code>.<br>\n2. Le 4e segment correspond au Resource Group (RG). Il doit respecter le gabarit fictif suivant :<br>\n   <code>rg-&lt;app&gt;-&lt;env&gt;-&lt;region&gt;-&lt;instance&gt;</code><br>\n   - Préfixe : exactement <code>rg-</code><br>\n   - <code>&lt;app&gt;</code> : chaîne alphanumérique non vide (lettres/chiffres)<br>\n   - <code>&lt;env&gt;</code> : une valeur parmi <code>prod</code>, <code>dev</code>, <code>stage</code>, <code>test</code><br>\n   - <code>&lt;region&gt;</code> : code région abrégé parmi <code>we</code> (West Europe), <code>ne</code> (North Europe), <code>fc</code> (France Central), <code>use</code> (East US)<br>\n   - <code>&lt;instance&gt;</code> : exactement 2 chiffres décimaux (ex: <code>01</code>, <code>02</code>)<br>\n3. Si le format du RG ne respecte pas ce gabarit :<br>\n   <code>INVALID: rg=&lt;rg_name&gt; reason=NON_COMPLIANT_NAMING</code><br>\n4. Si la hiérarchie et le nom du RG sont conformes :<br>\n   <code>VALID: HIERARCHY depth=4 sub=&lt;segment3&gt; rg=&lt;rg_name&gt; status=COMPLIANT</code></p>",
    "starter": "# Grille d'analyse (az3-c1-e1) — Validateur de hiérarchie ARM & Conventions de nommage CAF\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Série A]\n# Données : HIERARCHY mg-root/mg-prod/sub-corp-01/rg-web-prod-fc-01\n# Données : HIERARCHY mg-tenant/mg-dev/sub-sandbox-02/rg-api-dev-use-02\nA_COMPLETER\n\n[Cas 2 — Série B]\n# Données : HIERARCHY mg-root/sub-prod-01/rg-web-prod-fc-01\n# Données : HIERARCHY mg-root/mg-core/sub-01/sub-02/rg-data-prod-we-01\nA_COMPLETER\n\n[Cas 3 — Série C]\n# Données : HIERARCHY mg-root/mg-prod/sub-01/rg-web-preprod-we-01\n# Données : HIERARCHY mg-root/mg-prod/sub-01/rg-db-prod-paris-01\n# Données : HIERARCHY mg-root/mg-prod/sub-01/my-resource-group\nA_COMPLETER\n\n[Cas 4 — Série D]\n# Données : HIERARCHY mg-root//sub-01/rg-app-test-ne-01\nA_COMPLETER\n",
    "hints": [
      "Utiliser l’extraction des champs sur le chemin de la hiérarchie pour vérifier qu'il contient exactement 4 éléments.",
      "Valider le nom du groupe de ressources à l'aide d'une regex ou en découpant sur le tiret \"-\" : rg-<app>-<env>-<region>-<instance>."
    ],
    "examples": [
      {
        "stdin": "HIERARCHY mg-root/mg-core/sub-prod-01/rg-erp-prod-we-01",
        "expected": "VALID: HIERARCHY depth=4 sub=sub-prod-01 rg=rg-erp-prod-we-01 status=COMPLIANT",
        "note": "Chemin conforme à la convention fictive de cet exercice."
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
    "goal": "Appliquer une grille fictive de résilience et de réplication sans en déduire un SLA réel.",
    "brief": "<p>Une zone de disponibilité peut regrouper un ou plusieurs datacenters. Ce modèle fictif utilise des noms, nombres de zones et paires fournis uniquement pour l'exercice. Il ne permet pas de déduire ni de garantir un SLA : celui-ci dépend du service, de la configuration et des conditions applicables.<br><br>\nDonnées fictives pour cette grille, à ne pas utiliser comme inventaire Azure :<br>\n- <code>westeurope</code> : paired=<code>northeurope</code>, zones=3<br>\n- <code>northeurope</code> : paired=<code>westeurope</code>, zones=3<br>\n- <code>francecentral</code> : paired=<code>francesouth</code>, zones=3<br>\n- <code>eastus</code> : paired=<code>westus</code>, zones=3<br>\n- <code>germanywestcentral</code> : paired=<code>germanynorth</code>, zones=3<br>\n- <code>brazilsouth</code> : paired=<code>southcentralus</code>, zones=2<br><br>\nChaque cas indique une cible fictive (<code>99.9%</code>, <code>99.95%</code> ou <code>99.99%</code>). Les étiquettes <code>AZ_SUPPORTED</code> et <code>TARGET_SLA_UNMET</code> décrivent uniquement le résultat du modèle, et non un engagement réel.<br><br>\nRègles de décision :<br>\n1. Si la région n'est pas dans le catalogue :<br>\n   <code>REGION: &lt;nom_region&gt; -&gt; UNKNOWN_REGION</code><br>\n2. Si le SLA cible est <code>99.99%</code> :<br>\n   - Si la région possède au moins 3 zones de disponibilité (<code>zones &gt;= 3</code>) :<br>\n     <code>REGION: &lt;nom_region&gt; -&gt; RESILIENCE=AZ_SUPPORTED (zones=&lt;zones&gt;) | PAIRED=&lt;paired&gt; | REPLICATION=ZRS_OR_GZRS</code><br>\n   - Sinon :<br>\n     <code>REGION: &lt;nom_region&gt; -&gt; INSUFFICIENT_ZONES (zones=&lt;zones&gt;) | TARGET_SLA_UNMET</code><br>\n3. Si le SLA cible est <code>99.95%</code> :<br>\n   <code>REGION: &lt;nom_region&gt; -&gt; RESILIENCE=AVAILABILITY_SETS | PAIRED=&lt;paired&gt; | REPLICATION=LRS_OR_GRS</code><br>\n4. Si le SLA cible est inférieur ou égal à <code>99.9%</code> :<br>\n   <code>REGION: &lt;nom_region&gt; -&gt; RESILIENCE=SINGLE_VM_PREMIUM | PAIRED=&lt;paired&gt; | REPLICATION=LRS</code></p>",
    "starter": "# Grille d'analyse (az3-c1-e2) — Sélecteur de région, Zones de disponibilité et Paires géographiques (modèle fictif)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — SLA haute disponibilité 99.99% sur West Europe et France Central]\n# Données : REGION westeurope SLA 99.99%\n# Données : REGION francecentral SLA 99.99%\nA_COMPLETER\n\n[Cas 2 — Région avec zones insuffisantes pour 99.99%]\n# Données : REGION brazilsouth SLA 99.99%\nA_COMPLETER\n\n[Cas 3 — Paliers SLA 99.95% et 99.9% sur diverses régions]\n# Données : REGION northeurope SLA 99.95%\n# Données : REGION eastus SLA 99.9%\n# Données : REGION germanywestcentral SLA 99.95%\nA_COMPLETER\n\n[Cas 4 — Région non répertoriée]\n# Données : REGION mars-central SLA 99.99%\nA_COMPLETER\n",
    "hints": [
      "Utilisez exclusivement les nombres de zones et paires fictifs fournis dans le tableau.",
      "Appliquez les seuils du modèle sans conclure à un SLA réel ; vérifiez séparément les conditions du service."
    ],
    "examples": [
      {
        "stdin": "REGION westeurope SLA 99.99%",
        "expected": "REGION: westeurope -> RESILIENCE=AZ_SUPPORTED (zones=3) | PAIRED=northeurope | REPLICATION=ZRS_OR_GZRS",
        "note": "Dans ce modèle fictif, la grille associe trois zones à la cible 99.99% ; cela ne garantit aucun SLA réel."
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
    "brief": "<p>La maîtrise financière (FinOps) sous Azure requiert d'optimiser l'engagement sur les capacités de calcul (Instances Réservées) tout en dimensionnant le stockage et les flux sortants (Egress).<br><br>\nBarème fictif propre à cet exercice, pas des prix Azure actuels (730 heures par mois) :<br>\n- VM Calcul (tarif Pay-As-You-Go) :<br>\n  - <code>Standard_B2s</code> : 30.37 USD / mois par VM<br>\n  - <code>Standard_D4s_v5</code> : 140.16 USD / mois par VM<br>\n  - <code>Standard_E4s_v5</code> : 183.96 USD / mois par VM<br>\n- Disques managés SSD Premium (tarif mensuel fixe par unité) :<br>\n  - <code>P10</code> (128 Go) : 19.71 USD<br>\n  - <code>P20</code> (512 Go) : 73.22 USD<br>\n  - <code>P30</code> (1024 Go) : 135.17 USD<br>\n- Bande passante sortante (Egress Internet) :<br>\n  - Les 5 premiers Go du mois sont gratuits (0.00 USD).<br>\n  - Tout Go supplémentaire est facturé à 0.087 USD / Go.<br>\n- Remises sur le calcul des VMs par engagement Reserved Instances (RI) :<br>\n  - <code>PAYG</code> : 0% de remise.<br>\n  - <code>RI_1Y</code> : 35% de remise sur le coût du calcul VM.<br>\n  - <code>RI_3Y</code> : 60% de remise sur le coût du calcul VM.<br>\n  (Le stockage et l'egress ne bénéficient pas de la remise RI calcul).<br><br>\nFormat de la ligne d'entrée :<br>\n<code>CALC sku=&lt;SKU&gt; qty=&lt;N&gt; disk=&lt;DISK&gt; egress_gb=&lt;GB&gt; commitment=&lt;PAYG|RI_1Y|RI_3Y&gt;</code><br><br>\nFormat de sortie attendu :<br>\n<code>COST: VM=&lt;vm_cost:.2f&gt; DISK=&lt;disk_cost:.2f&gt; EGRESS=&lt;egress_cost:.2f&gt; TOTAL=&lt;total:.2f&gt; SAVINGS=&lt;savings:.2f&gt;</code></p>",
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
  }
];
