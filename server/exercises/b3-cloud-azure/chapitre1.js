/**
/**
 * Exercices du Chapitre 1 : Architecture globale, Régions, Souscriptions & Hiérarchie ARM.
 * Préfixe : az3-c1-e
 */
'use strict';

module.exports = [
  {
    id: 'az3-c1-e1',
    chapter: 1,
    title: 'Validateur de hiérarchie ARM & Conventions de nommage CAF',
    level: 'n1',
    language: 'python',
    goal: 'Valider la structure hiérarchique de gestion Azure (Root MG -> MG -> Subscription -> Resource Group) et vérifier la conformité du nommage CAF.',
    brief: `<p>Dans le Microsoft Cloud Adoption Framework (CAF), l'organisation des ressources repose sur une hiérarchie stricte à 4 niveaux :
<code>ManagementGroup_Parent / ManagementGroup_Child / Subscription / ResourceGroup</code>.<br><br>
Le script lit sur l'entrée standard des lignes au format :<br>
<code>HIERARCHY &lt;segment1&gt;/&lt;segment2&gt;/&lt;segment3&gt;/&lt;segment4&gt;</code><br><br>
Règles de validation :<br>
1. La chaîne doit comporter exactement 4 segments non vides séparés par <code>/</code>. Si ce n'est pas le cas :<br>
   <code>INVALID: reason=MALFORMED_HIERARCHY</code><br>
2. Le 4e segment correspond au Resource Group (RG). Il doit respecter le gabarit CAF suivant :<br>
   <code>rg-&lt;app&gt;-&lt;env&gt;-&lt;region&gt;-&lt;instance&gt;</code><br>
   - Préfixe : exactement <code>rg-</code><br>
   - <code>&lt;app&gt;</code> : chaîne alphanumérique non vide (lettres/chiffres)<br>
   - <code>&lt;env&gt;</code> : une valeur parmi <code>prod</code>, <code>dev</code>, <code>stage</code>, <code>test</code><br>
   - <code>&lt;region&gt;</code> : code région abrégé parmi <code>we</code> (West Europe), <code>ne</code> (North Europe), <code>fc</code> (France Central), <code>use</code> (East US)<br>
   - <code>&lt;instance&gt;</code> : exactement 2 chiffres décimaux (ex: <code>01</code>, <code>02</code>)<br>
3. Si le format du RG ne respecte pas ce gabarit :<br>
   <code>INVALID: rg=&lt;rg_name&gt; reason=NON_COMPLIANT_NAMING</code><br>
4. Si la hiérarchie et le nom du RG sont conformes :<br>
   <code>VALID: HIERARCHY depth=4 sub=&lt;segment3&gt; rg=&lt;rg_name&gt; status=COMPLIANT</code></p>`,
    starter: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : analyser la hiérarchie et valider la nomenclature CAF
`,
    hints: [
      'Utiliser split("/") sur le chemin de la hiérarchie pour vérifier qu\'il contient exactement 4 éléments.',
      'Valider le nom du groupe de ressources à l\'aide d\'une regex ou en découpant sur le tiret "-" : rg-<app>-<env>-<region>-<instance>.'
    ],
    examples: [
      {
        stdin: 'HIERARCHY mg-root/mg-core/sub-prod-01/rg-erp-prod-we-01',
        expected: 'VALID: HIERARCHY depth=4 sub=sub-prod-01 rg=rg-erp-prod-we-01 status=COMPLIANT',
        note: 'Hiérarchie standard 4 niveaux avec Resource Group conforme au CAF.'
      }
    ],
    tests: [
      {
        label: 'Hiérarchies conformes en production et dev',
        stdin: 'HIERARCHY mg-root/mg-prod/sub-corp-01/rg-web-prod-fc-01\nHIERARCHY mg-tenant/mg-dev/sub-sandbox-02/rg-api-dev-use-02',
        expected: 'VALID: HIERARCHY depth=4 sub=sub-corp-01 rg=rg-web-prod-fc-01 status=COMPLIANT\nVALID: HIERARCHY depth=4 sub=sub-sandbox-02 rg=rg-api-dev-use-02 status=COMPLIANT'
      },
      {
        label: 'Erreur de hiérarchie malformée',
        stdin: 'HIERARCHY mg-root/sub-prod-01/rg-web-prod-fc-01\nHIERARCHY mg-root/mg-core/sub-01/sub-02/rg-data-prod-we-01',
        expected: 'INVALID: reason=MALFORMED_HIERARCHY\nINVALID: reason=MALFORMED_HIERARCHY'
      },
      {
        label: 'Nom de Resource Group non conforme (env ou région invalide)',
        stdin: 'HIERARCHY mg-root/mg-prod/sub-01/rg-web-preprod-we-01\nHIERARCHY mg-root/mg-prod/sub-01/rg-db-prod-paris-01\nHIERARCHY mg-root/mg-prod/sub-01/my-resource-group',
        expected: 'INVALID: rg=rg-web-preprod-we-01 reason=NON_COMPLIANT_NAMING\nINVALID: rg=rg-db-prod-paris-01 reason=NON_COMPLIANT_NAMING\nINVALID: rg=my-resource-group reason=NON_COMPLIANT_NAMING'
      },
      {
        label: 'Segment vide dans la hiérarchie',
        stdin: 'HIERARCHY mg-root//sub-01/rg-app-test-ne-01',
        expected: 'INVALID: reason=MALFORMED_HIERARCHY'
      }
    ],
    solution: `import sys
import re

rg_pattern = re.compile(r"^rg-([a-zA-Z0-9]+)-(prod|dev|stage|test)-(we|ne|fc|use)-([0-9]{2})$")

for line in sys.stdin.read().splitlines():
    line = line.strip()
    if not line:
        continue
    if not line.startswith("HIERARCHY "):
        continue
    path = line[len("HIERARCHY "):].strip()
    parts = path.split("/")
    if len(parts) != 4 or any(len(p) == 0 for p in parts):
        print("INVALID: reason=MALFORMED_HIERARCHY")
        continue
    
    sub = parts[2]
    rg = parts[3]
    if rg_pattern.match(rg):
        print(f"VALID: HIERARCHY depth=4 sub={sub} rg={rg} status=COMPLIANT")
    else:
        print(f"INVALID: rg={rg} reason=NON_COMPLIANT_NAMING")
`
  },
  {
    id: 'az3-c1-e2',
    chapter: 1,
    title: 'Sélecteur de région, Zones de disponibilité et Paires géographiques',
    level: 'n2',
    language: 'python',
    goal: 'Analyser une cible de haute disponibilité (SLA) pour une région Azure et déterminer le niveau de résilience et la stratégie de réplication associés.',
    brief: `<p>Azure organise ses datacenters mondiaux en Régions, Zones de Disponibilité (AZ 1, 2, 3 avec datacenters indépendants) et Paires Régionales (séparées d'au moins 480 km pour la reprise après sinistre).<br><br>
Données de référence des régions Azure :<br>
- <code>westeurope</code> : paired=<code>northeurope</code>, zones=3<br>
- <code>northeurope</code> : paired=<code>westeurope</code>, zones=3<br>
- <code>francecentral</code> : paired=<code>francesouth</code>, zones=3<br>
- <code>eastus</code> : paired=<code>westus</code>, zones=3<br>
- <code>germanywestcentral</code> : paired=<code>germanynorth</code>, zones=3<br>
- <code>brazilsouth</code> : paired=<code>southcentralus</code>, zones=2<br><br>
Le script lit des requêtes au format :<br>
<code>REGION &lt;nom_region&gt; SLA &lt;valeur_sla&gt;</code> (ex: <code>99.9%</code>, <code>99.95%</code>, <code>99.99%</code>).<br><br>
Règles de décision :<br>
1. Si la région n'est pas dans le catalogue :<br>
   <code>REGION: &lt;nom_region&gt; -&gt; UNKNOWN_REGION</code><br>
2. Si le SLA cible est <code>99.99%</code> :<br>
   - Si la région possède au moins 3 zones de disponibilité (<code>zones &gt;= 3</code>) :<br>
     <code>REGION: &lt;nom_region&gt; -&gt; RESILIENCE=AZ_SUPPORTED (zones=&lt;zones&gt;) | PAIRED=&lt;paired&gt; | REPLICATION=ZRS_OR_GZRS</code><br>
   - Sinon :<br>
     <code>REGION: &lt;nom_region&gt; -&gt; INSUFFICIENT_ZONES (zones=&lt;zones&gt;) | TARGET_SLA_UNMET</code><br>
3. Si le SLA cible est <code>99.95%</code> :<br>
   <code>REGION: &lt;nom_region&gt; -&gt; RESILIENCE=AVAILABILITY_SETS | PAIRED=&lt;paired&gt; | REPLICATION=LRS_OR_GRS</code><br>
4. Si le SLA cible est inférieur ou égal à <code>99.9%</code> :<br>
   <code>REGION: &lt;nom_region&gt; -&gt; RESILIENCE=SINGLE_VM_PREMIUM | PAIRED=&lt;paired&gt; | REPLICATION=LRS</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : implémenter la matrice de résilience régionale
`,
    hints: [
      'Indexer les métadonnées régionales dans un dictionnaire Python.',
      'Tester la présence de la région avant d\'évaluer le seuil de SLA.'
    ],
    examples: [
      {
        stdin: 'REGION westeurope SLA 99.99%',
        expected: 'REGION: westeurope -> RESILIENCE=AZ_SUPPORTED (zones=3) | PAIRED=northeurope | REPLICATION=ZRS_OR_GZRS',
        note: 'West Europe dispose de 3 zones de disponibilité permettant d\'atteindre 99.99% de SLA.'
      }
    ],
    tests: [
      {
        label: 'SLA haute disponibilité 99.99% sur West Europe et France Central',
        stdin: 'REGION westeurope SLA 99.99%\nREGION francecentral SLA 99.99%',
        expected: 'REGION: westeurope -> RESILIENCE=AZ_SUPPORTED (zones=3) | PAIRED=northeurope | REPLICATION=ZRS_OR_GZRS\nREGION: francecentral -> RESILIENCE=AZ_SUPPORTED (zones=3) | PAIRED=francesouth | REPLICATION=ZRS_OR_GZRS'
      },
      {
        label: 'Région avec zones insuffisantes pour 99.99%',
        stdin: 'REGION brazilsouth SLA 99.99%',
        expected: 'REGION: brazilsouth -> INSUFFICIENT_ZONES (zones=2) | TARGET_SLA_UNMET'
      },
      {
        label: 'Paliers SLA 99.95% et 99.9% sur diverses régions',
        stdin: 'REGION northeurope SLA 99.95%\nREGION eastus SLA 99.9%\nREGION germanywestcentral SLA 99.95%',
        expected: 'REGION: northeurope -> RESILIENCE=AVAILABILITY_SETS | PAIRED=westeurope | REPLICATION=LRS_OR_GRS\nREGION: eastus -> RESILIENCE=SINGLE_VM_PREMIUM | PAIRED=westus | REPLICATION=LRS\nREGION: germanywestcentral -> RESILIENCE=AVAILABILITY_SETS | PAIRED=germanynorth | REPLICATION=LRS_OR_GRS'
      },
      {
        label: 'Région non répertoriée',
        stdin: 'REGION mars-central SLA 99.99%',
        expected: 'REGION: mars-central -> UNKNOWN_REGION'
      }
    ],
    solution: `import sys

REGIONS = {
    "westeurope": {"paired": "northeurope", "zones": 3},
    "northeurope": {"paired": "westeurope", "zones": 3},
    "francecentral": {"paired": "francesouth", "zones": 3},
    "eastus": {"paired": "westus", "zones": 3},
    "germanywestcentral": {"paired": "germanynorth", "zones": 3},
    "brazilsouth": {"paired": "southcentralus", "zones": 2}
}

for line in sys.stdin.read().splitlines():
    line = line.strip()
    if not line:
        continue
    parts = line.split()
    if len(parts) >= 4 and parts[0] == "REGION" and parts[2] == "SLA":
        reg = parts[1]
        sla_str = parts[3]
        if reg not in REGIONS:
            print(f"REGION: {reg} -> UNKNOWN_REGION")
            continue
        info = REGIONS[reg]
        paired = info["paired"]
        zones = info["zones"]
        
        sla_val = float(sla_str.replace("%", ""))
        if sla_val >= 99.99:
            if zones >= 3:
                print(f"REGION: {reg} -> RESILIENCE=AZ_SUPPORTED (zones={zones}) | PAIRED={paired} | REPLICATION=ZRS_OR_GZRS")
            else:
                print(f"REGION: {reg} -> INSUFFICIENT_ZONES (zones={zones}) | TARGET_SLA_UNMET")
        elif sla_val >= 99.95:
            print(f"REGION: {reg} -> RESILIENCE=AVAILABILITY_SETS | PAIRED={paired} | REPLICATION=LRS_OR_GRS")
        else:
            print(f"REGION: {reg} -> RESILIENCE=SINGLE_VM_PREMIUM | PAIRED={paired} | REPLICATION=LRS")
`
  },
  {
    id: 'az3-c1-e3',
    chapter: 1,
    title: 'Estimateur de coûts TCO et optimisation par Instances Réservées (RI)',
    level: 'n3',
    language: 'python',
    goal: 'Calculer le budget mensuel d’une flotte de machines virtuelles et disques managés, en simulant l’économie apportée par les réservations Azure (1 an ou 3 ans).',
    brief: `<p>La maîtrise financière (FinOps) sous Azure requiert d'optimiser l'engagement sur les capacités de calcul (Instances Réservées) tout en dimensionnant le stockage et les flux sortants (Egress).<br><br>
Base tarifaire mensuelle (730 heures par mois) :<br>
- VM Calcul (tarif Pay-As-You-Go) :<br>
  - <code>Standard_B2s</code> : 30.37 USD / mois par VM<br>
  - <code>Standard_D4s_v5</code> : 140.16 USD / mois par VM<br>
  - <code>Standard_E4s_v5</code> : 183.96 USD / mois par VM<br>
- Disques managés SSD Premium (tarif mensuel fixe par unité) :<br>
  - <code>P10</code> (128 Go) : 19.71 USD<br>
  - <code>P20</code> (512 Go) : 73.22 USD<br>
  - <code>P30</code> (1024 Go) : 135.17 USD<br>
- Bande passante sortante (Egress Internet) :<br>
  - Les 5 premiers Go du mois sont gratuits (0.00 USD).<br>
  - Tout Go supplémentaire est facturé à 0.087 USD / Go.<br>
- Remises sur le calcul des VMs par engagement Reserved Instances (RI) :<br>
  - <code>PAYG</code> : 0% de remise.<br>
  - <code>RI_1Y</code> : 35% de remise sur le coût du calcul VM.<br>
  - <code>RI_3Y</code> : 60% de remise sur le coût du calcul VM.<br>
  (Le stockage et l'egress ne bénéficient pas de la remise RI calcul).<br><br>
Format de la ligne d'entrée :<br>
<code>CALC sku=&lt;SKU&gt; qty=&lt;N&gt; disk=&lt;DISK&gt; egress_gb=&lt;GB&gt; commitment=&lt;PAYG|RI_1Y|RI_3Y&gt;</code><br><br>
Format de sortie attendu :<br>
<code>COST: VM=&lt;vm_cost:.2f&gt; DISK=&lt;disk_cost:.2f&gt; EGRESS=&lt;egress_cost:.2f&gt; TOTAL=&lt;total:.2f&gt; SAVINGS=&lt;savings:.2f&gt;</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer les coûts mensuels et l'économie apportée par les réservations
`,
    hints: [
      'Calculer d\'abord le coût de base des VMs sans remise (PAYG) : base_vm = qty * tarif_unitaire.',
      'La remise RI s\'applique uniquement à base_vm : savings = base_vm * discount_rate.',
      'Le coût effectif de la VM devient base_vm - savings.'
    ],
    examples: [
      {
        stdin: 'CALC sku=Standard_B2s qty=2 disk=P10 egress_gb=5 commitment=PAYG',
        expected: 'COST: VM=60.74 DISK=39.42 EGRESS=0.00 TOTAL=100.16 SAVINGS=0.00',
        note: '2 VMs B2s avec 2 disques P10 sans engagement et 5 Go egress gratuits.'
      }
    ],
    tests: [
      {
        label: 'Flotte PAYG standard 3 VMs B2s',
        stdin: 'CALC sku=Standard_B2s qty=3 disk=P10 egress_gb=10 commitment=PAYG',
        expected: 'COST: VM=91.11 DISK=59.13 EGRESS=0.43 TOTAL=150.68 SAVINGS=0.00'
      },
      {
        label: 'Engagement RI 1 an avec egress significatif',
        stdin: 'CALC sku=Standard_D4s_v5 qty=4 disk=P20 egress_gb=105 commitment=RI_1Y',
        expected: 'COST: VM=364.42 DISK=292.88 EGRESS=8.70 TOTAL=666.00 SAVINGS=196.22'
      },
      {
        label: 'Engagement RI 3 ans haute capacité mémoire',
        stdin: 'CALC sku=Standard_E4s_v5 qty=2 disk=P30 egress_gb=50 commitment=RI_3Y',
        expected: 'COST: VM=147.17 DISK=270.34 EGRESS=3.91 TOTAL=421.42 SAVINGS=220.75'
      },
      {
        label: 'Une seule VM B2s avec RI 3 ans sans egress',
        stdin: 'CALC sku=Standard_B2s qty=1 disk=P10 egress_gb=0 commitment=RI_3Y',
        expected: 'COST: VM=12.15 DISK=19.71 EGRESS=0.00 TOTAL=31.86 SAVINGS=18.22'
      }
    ],
    solution: `import sys

VM_PRICES = {
    "Standard_B2s": 30.37,
    "Standard_D4s_v5": 140.16,
    "Standard_E4s_v5": 183.96
}

DISK_PRICES = {
    "P10": 19.71,
    "P20": 73.22,
    "P30": 135.17
}

RI_DISCOUNTS = {
    "PAYG": 0.0,
    "RI_1Y": 0.35,
    "RI_3Y": 0.60
}

for line in sys.stdin.read().splitlines():
    line = line.strip()
    if not line or not line.startswith("CALC "):
        continue
    params = {}
    for part in line[5:].split():
        if "=" in part:
            k, v = part.split("=", 1)
            params[k] = v
            
    sku = params.get("sku")
    qty = int(params.get("qty", 1))
    disk = params.get("disk")
    egress_gb = float(params.get("egress_gb", 0))
    commitment = params.get("commitment", "PAYG")
    
    base_vm_unit = VM_PRICES.get(sku, 0.0)
    base_vm_total = base_vm_unit * qty
    discount = RI_DISCOUNTS.get(commitment, 0.0)
    savings = base_vm_total * discount
    vm_cost = base_vm_total - savings
    
    disk_unit = DISK_PRICES.get(disk, 0.0)
    disk_cost = disk_unit * qty
    
    billable_egress = max(0.0, egress_gb - 5.0)
    egress_cost = billable_egress * 0.087
    
    total = vm_cost + disk_cost + egress_cost
    print(f"COST: VM={vm_cost:.2f} DISK={disk_cost:.2f} EGRESS={egress_cost:.2f} TOTAL={total:.2f} SAVINGS={savings:.2f}")
`
  }
];
