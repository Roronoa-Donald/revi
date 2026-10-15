/**
 * Exercices du Chapitre 3 : Calcul & Virtualisation Azure (Azure Compute, VMSS & PaaS).
 * Préfixe : az3-c3-e
 */
'use strict';

module.exports = [
  {
    id: 'az3-c3-e1',
    chapter: 3,
    title: 'Dimensionneur de VM Azure et calcul de SLA combiné',
    level: 'n1',
    language: 'python',
    goal: 'Sélectionner la série de machines virtuelles Azure optimale et calculer le SLA composite d’une architecture multi-tiers.',
    brief: `<p>La conception d'une architecture résiliente sous Azure nécessite de sélectionner les séries de VM appropriées et d'évaluer la disponibilité globale (SLA) résultant de la composition des niveaux applicatifs (tiers).<br><br>
Règles de sélection des séries Azure :<br>
- Si <code>burst=true</code> : série <code>B-series</code> (Burstable économique)<br>
- Sinon, selon le ratio mémoire / vCPU (<code>ram_gb / vcpu</code>) :<br>
  - Si <code>ratio &gt;= 8.0</code> : série <code>E-series</code> (Optimisée en mémoire)<br>
  - Si <code>ratio &lt;= 2.0</code> : série <code>F-series</code> (Optimisée en calcul)<br>
  - Sinon : série <code>D-series</code> (Usage général)<br><br>
Disponibilité SLA unitaire selon la redondance et le disque :<br>
- Si <code>redundancy=AZONE</code> (Zones de disponibilité) : <code>99.99%</code><br>
- Si <code>redundancy=ASET</code> (Availability Set) : <code>99.95%</code><br>
- Si <code>redundancy=SINGLE</code> (VM unique) :<br>
  - <code>disk=SSD_PREM</code> : <code>99.90%</code><br>
  - <code>disk=SSD_STD</code> : <code>99.50%</code><br>
  - <code>disk=HDD_STD</code> : <code>95.00%</code><br><br>
Format d'entrée : chaque ligne déclare un tier applicatif :<br>
<code>TIER name=&lt;nom&gt; vcpu=&lt;int&gt; ram_gb=&lt;int&gt; burst=&lt;true|false&gt; disk=&lt;disque&gt; redundancy=&lt;redondance&gt;</code><br><br>
Format de sortie attendu :<br>
Pour chaque tier :<br>
<code>TIER &lt;nom&gt;: SERIES=&lt;SERIES&gt; SLA=&lt;sla_tier:.2f&gt;%</code><br>
À la fin de la lecture, calculer le SLA composite (produit des disponibilités de chaque tier) et l'indisponibilité annuelle estimée (sur une base de 8760 heures par an) :<br>
<code>COMPOSITE_SLA: &lt;composite:.4f&gt;% (downtime_year=&lt;downtime_hours:.2f&gt;h)</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : classifier les séries de VM et calculer le SLA composite
`,
    hints: [
      'Calculer ratio = ram_gb / vcpu si burst n\'est pas actif.',
      'Le SLA composite de tiers en série est le produit des probabilités : prod(SLA_i / 100) * 100.'
    ],
    examples: [
      {
        stdin: 'TIER name=web vcpu=2 ram_gb=8 burst=false disk=SSD_PREM redundancy=AZONE\nTIER name=db vcpu=4 ram_gb=32 burst=false disk=SSD_PREM redundancy=ASET',
        expected: 'TIER web: SERIES=D-series SLA=99.99%\nTIER db: SERIES=E-series SLA=99.95%\nCOMPOSITE_SLA: 99.9400% (downtime_year=5.26h)',
        note: 'Tier web en D-series avec AZone et Tier DB en E-series avec ASet.'
      }
    ],
    tests: [
      {
        label: 'Architecture multi-tiers Web, App et DB avec SLA combiné',
        stdin: 'TIER name=web vcpu=2 ram_gb=8 burst=false disk=SSD_PREM redundancy=AZONE\nTIER name=app vcpu=4 ram_gb=16 burst=false disk=SSD_PREM redundancy=AZONE\nTIER name=db vcpu=8 ram_gb=64 burst=false disk=SSD_PREM redundancy=ASET',
        expected: 'TIER web: SERIES=D-series SLA=99.99%\nTIER app: SERIES=D-series SLA=99.99%\nTIER db: SERIES=E-series SLA=99.95%\nCOMPOSITE_SLA: 99.9300% (downtime_year=6.13h)'
      },
      {
        label: 'Tier unique burstable avec disque SSD Standard',
        stdin: 'TIER name=dev vcpu=2 ram_gb=4 burst=true disk=SSD_STD redundancy=SINGLE',
        expected: 'TIER dev: SERIES=B-series SLA=99.50%\nCOMPOSITE_SLA: 99.5000% (downtime_year=43.80h)'
      },
      {
        label: 'Tier calcul intensif F-series avec HDD Standard',
        stdin: 'TIER name=batch vcpu=8 ram_gb=16 burst=false disk=HDD_STD redundancy=SINGLE',
        expected: 'TIER batch: SERIES=F-series SLA=95.00%\nCOMPOSITE_SLA: 95.0000% (downtime_year=438.00h)'
      }
    ],
    solution: `import sys

lines = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]
if not lines:
    sys.exit(0)

composite_prod = 1.0

for line in lines:
    if not line.startswith("TIER "):
        continue
    props = {}
    for part in line[5:].split():
        if "=" in part:
            k, v = part.split("=", 1)
            props[k] = v
            
    name = props.get("name", "unknown")
    vcpu = float(props.get("vcpu", 1))
    ram = float(props.get("ram_gb", 1))
    burst = props.get("burst", "false").lower() == "true"
    disk = props.get("disk", "SSD_PREM")
    red = props.get("redundancy", "SINGLE")
    
    # 1. Series
    if burst:
        series = "B-series"
    else:
        ratio = ram / vcpu
        if ratio >= 8.0:
            series = "E-series"
        elif ratio <= 2.0:
            series = "F-series"
        else:
            series = "D-series"
            
    # 2. SLA
    if red == "AZONE":
        sla = 99.99
    elif red == "ASET":
        sla = 99.95
    else:
        if disk == "HDD_STD":
            sla = 95.00
        elif disk == "SSD_STD":
            sla = 99.50
        else:
            sla = 99.90
            
    composite_prod *= (sla / 100.0)
    print(f"TIER {name}: SERIES={series} SLA={sla:.2f}%")

comp_pct = composite_prod * 100.0
downtime = 8760.0 * (1.0 - composite_prod)
print(f"COMPOSITE_SLA: {comp_pct:.4f}% (downtime_year={downtime:.2f}h)")
`
  },
  {
    id: 'az3-c3-e2',
    chapter: 3,
    title: 'Simulateur d\'Auto-scaling VMSS',
    level: 'n2',
    language: 'python',
    goal: 'Simuler le comportement d’un Virtual Machine Scale Set (VMSS) sous charge variable avec règles de mise à l’échelle et période de refroidissement.',
    brief: `<p>Un groupe de machines virtuelles identiques (Azure VMSS) adapte dynamiquement son effectif aux variations de charge CPU selon des règles de scale-out et scale-in, avec un délai de refroidissement (cooldown) pour éviter les oscillations rapides.<br><br>
Format d'entrée :<br>
Ligne 1 : Définition des paramètres d'auto-scaling :<br>
<code>CONFIG min=&lt;int&gt; max=&lt;int&gt; scale_out_cpu=&lt;int&gt; scale_in_cpu=&lt;int&gt; step=&lt;int&gt; cooldown=&lt;int&gt;</code><br>
Lignes suivantes : Mesures de charge collectées par pas de temps :<br>
<code>METRIC step=&lt;int&gt; cpu=&lt;int&gt;</code><br><br>
Règles du moteur VMSS :<br>
- Au démarrage, l'effectif initial est égal à <code>min</code>, et le compteur de cooldown est à 0.<br>
- Pour chaque métrique :<br>
  - Si le compteur de cooldown est strictement supérieur à 0 : l'action est <code>COOLDOWN_ACTIVE</code>, et le compteur est décrémenté de 1.<br>
  - Sinon :<br>
    - Si <code>cpu &gt;= scale_out_cpu</code> : tenter d'ajouter <code>step</code> instances sans dépasser <code>max</code>.<br>
      Si l'effectif augmente : action <code>SCALE_OUT</code> et le compteur de cooldown est réinitialisé à <code>cooldown</code>.<br>
      Si l'effectif était déjà à <code>max</code> : action <code>MAX_CAPACITY_REACHED</code>.<br>
    - Sinon si <code>cpu &lt;= scale_in_cpu</code> : tenter de retirer <code>step</code> instances sans descendre sous <code>min</code>.<br>
      Si l'effectif diminue : action <code>SCALE_IN</code> et le compteur de cooldown est réinitialisé à <code>cooldown</code>.<br>
      Si l'effectif était déjà à <code>min</code> : action <code>MIN_CAPACITY_REACHED</code>.<br>
    - Sinon : action <code>NONE</code>.<br><br>
Format de sortie pour chaque métrique :<br>
<code>STEP &lt;t&gt;: CPU=&lt;cpu&gt;% INSTANCES=&lt;count&gt; ACTION=&lt;ACTION&gt;</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : implémenter la machine à états de l'auto-scaling VMSS
`,
    hints: [
      'Gérer un compteur cooldown_timer qui bloque toute nouvelle mise à l\'échelle tant qu\'il est supérieur à 0.',
      'S\'assurer de borner le nombre d\'instances entre min et max.'
    ],
    examples: [
      {
        stdin: 'CONFIG min=2 max=6 scale_out_cpu=75 scale_in_cpu=25 step=2 cooldown=2\nMETRIC step=1 cpu=80\nMETRIC step=2 cpu=85\nMETRIC step=3 cpu=80\nMETRIC step=4 cpu=40',
        expected: 'STEP 1: CPU=80% INSTANCES=4 ACTION=SCALE_OUT\nSTEP 2: CPU=85% INSTANCES=4 ACTION=COOLDOWN_ACTIVE\nSTEP 3: CPU=80% INSTANCES=4 ACTION=COOLDOWN_ACTIVE\nSTEP 4: CPU=40% INSTANCES=4 ACTION=NONE',
        note: 'Scale-out à l\'étape 1 suivi de 2 étapes de cooldown effectives.'
      }
    ],
    tests: [
      {
        label: 'Scale-out puis période de refroidissement et maintien',
        stdin: 'CONFIG min=1 max=5 scale_out_cpu=70 scale_in_cpu=30 step=1 cooldown=1\nMETRIC step=1 cpu=75\nMETRIC step=2 cpu=75\nMETRIC step=3 cpu=20',
        expected: 'STEP 1: CPU=75% INSTANCES=2 ACTION=SCALE_OUT\nSTEP 2: CPU=75% INSTANCES=2 ACTION=COOLDOWN_ACTIVE\nSTEP 3: CPU=20% INSTANCES=1 ACTION=SCALE_IN'
      },
      {
        label: 'Scale-in vers minimum avec blocage de capacité',
        stdin: 'CONFIG min=2 max=4 scale_out_cpu=80 scale_in_cpu=20 step=1 cooldown=1\nMETRIC step=1 cpu=10\nMETRIC step=2 cpu=15',
        expected: 'STEP 1: CPU=10% INSTANCES=2 ACTION=MIN_CAPACITY_REACHED\nSTEP 2: CPU=15% INSTANCES=2 ACTION=MIN_CAPACITY_REACHED'
      },
      {
        label: 'Atteinte du palier max capacity',
        stdin: 'CONFIG min=2 max=3 scale_out_cpu=70 scale_in_cpu=30 step=1 cooldown=0\nMETRIC step=1 cpu=80\nMETRIC step=2 cpu=85',
        expected: 'STEP 1: CPU=80% INSTANCES=3 ACTION=SCALE_OUT\nSTEP 2: CPU=85% INSTANCES=3 ACTION=MAX_CAPACITY_REACHED'
      }
    ],
    solution: `import sys

lines = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]
if not lines:
    sys.exit(0)

first = lines[0]
if not first.startswith("CONFIG "):
    sys.exit(0)

cfg = {}
for part in first[len("CONFIG "):].split():
    if "=" in part:
        k, v = part.split("=", 1)
        cfg[k] = int(v)

min_inst = cfg.get("min", 1)
max_inst = cfg.get("max", 10)
so_cpu = cfg.get("scale_out_cpu", 75)
si_cpu = cfg.get("scale_in_cpu", 25)
step = cfg.get("step", 1)
cooldown_cfg = cfg.get("cooldown", 0)

current_inst = min_inst
cooldown_timer = 0

for line in lines[1:]:
    if not line.startswith("METRIC "):
        continue
    props = {}
    for part in line[len("METRIC "):].split():
        if "=" in part:
            k, v = part.split("=", 1)
            props[k] = int(v)
            
    t = props.get("step", 0)
    cpu = props.get("cpu", 0)
    
    if cooldown_timer > 0:
        action = "COOLDOWN_ACTIVE"
        cooldown_timer -= 1
    else:
        if cpu >= so_cpu:
            if current_inst < max_inst:
                current_inst = min(max_inst, current_inst + step)
                action = "SCALE_OUT"
                cooldown_timer = cooldown_cfg
            else:
                action = "MAX_CAPACITY_REACHED"
        elif cpu <= si_cpu:
            if current_inst > min_inst:
                current_inst = max(min_inst, current_inst - step)
                action = "SCALE_IN"
                cooldown_timer = cooldown_cfg
            else:
                action = "MIN_CAPACITY_REACHED"
        else:
            action = "NONE"
            
    print(f"STEP {t}: CPU={cpu}% INSTANCES={current_inst} ACTION={action}")
`
  },
  {
    id: 'az3-c3-e3',
    chapter: 3,
    title: 'Gestionnaire de déploiement Azure App Service & Slot Swap',
    level: 'n3',
    language: 'python',
    goal: 'Simuler le déploiement sur les slots de pré-production (Staging/Production) d’Azure App Service avec vérification de sonde de santé et retour arrière (rollback).',
    brief: `<p>Azure App Service permet les déploiements zéro-downtime grâce aux slots de déploiement. Avant de basculer (Swap) le trafic vers la nouvelle version, une sonde de santé (health check probe) valide l'intégrité de la pré-production (Staging).<br><br>
État initial :<br>
- Slot <code>Production</code> : version <code>v1.0.0</code>.<br>
- Slot <code>Staging</code> : version <code>none</code> (inactif).<br><br>
Commandes prises en charge :<br>
1. <code>DEPLOY_STAGE version=&lt;v&gt; probe=&lt;status_code&gt;</code><br>
   Déploie la version <code>v</code> sur le slot Staging avec le code de santé <code>status_code</code>.<br>
   Afficher : <code>STAGE_DEPLOYED: version=&lt;v&gt; probe=&lt;status_code&gt;</code><br><br>
2. <code>SWAP_SLOTS auto_rollback=&lt;true|false&gt;</code><br>
   Vérifie la sonde de santé du slot Staging :<br>
   - Si <code>probe == 200</code> :<br>
     La bascule s'effectue avec succès. La version de Staging devient celle de Production, et l'ancienne version de Production est basculée sur Staging.<br>
     Afficher : <code>SWAP_SUCCESS: prod=&lt;new_prod&gt; stage=&lt;new_stage&gt;</code><br>
   - Si <code>probe != 200</code> :<br>
     - Si <code>auto_rollback=true</code> : la bascule est annulée, Production reste inchangée et Staging est réinitialisé à <code>none</code>.<br>
       Afficher : <code>SWAP_ABORTED: probe_failed (status=&lt;status_code&gt;), rollback to &lt;current_prod&gt;</code><br>
     - Si <code>auto_rollback=false</code> : la bascule a lieu malgré l'anomalie.<br>
       Afficher : <code>SWAP_WARNING: degraded_deployment (status=&lt;status_code&gt;), prod=&lt;new_prod&gt;</code><br><br>
3. <code>STATUS</code><br>
   Afficher : <code>CURRENT_STATE: prod=&lt;current_prod&gt; stage=&lt;current_stage&gt;</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : implémenter le cycle de swap de slots Azure App Service
`,
    hints: [
      'Gérer deux variables d\'état prod_ver (initialement "v1.0.0") et stage_ver (initialement "none"), ainsi que stage_probe.',
      'Lors du swap réussi, échanger les valeurs de prod_ver et stage_ver.'
    ],
    examples: [
      {
        stdin: 'DEPLOY_STAGE version=v1.1.0 probe=200\nSWAP_SLOTS auto_rollback=true\nSTATUS',
        expected: 'STAGE_DEPLOYED: version=v1.1.0 probe=200\nSWAP_SUCCESS: prod=v1.1.0 stage=v1.0.0\nCURRENT_STATE: prod=v1.1.0 stage=v1.0.0',
        note: 'Déploiement sain en staging et swap sans interruption vers production.'
      }
    ],
    tests: [
      {
        label: 'Déploiement sain et bascule vers production',
        stdin: 'DEPLOY_STAGE version=v1.2.0-rc1 probe=200\nSWAP_SLOTS auto_rollback=true\nSTATUS',
        expected: 'STAGE_DEPLOYED: version=v1.2.0-rc1 probe=200\nSWAP_SUCCESS: prod=v1.2.0-rc1 stage=v1.0.0\nCURRENT_STATE: prod=v1.2.0-rc1 stage=v1.0.0'
      },
      {
        label: 'Échec de sonde avec auto-rollback activé',
        stdin: 'DEPLOY_STAGE version=v2.0.0-bug probe=500\nSWAP_SLOTS auto_rollback=true\nSTATUS',
        expected: 'STAGE_DEPLOYED: version=v2.0.0-bug probe=500\nSWAP_ABORTED: probe_failed (status=500), rollback to v1.0.0\nCURRENT_STATE: prod=v1.0.0 stage=none'
      },
      {
        label: 'Échec de sonde sans auto-rollback forçant le swap',
        stdin: 'DEPLOY_STAGE version=v1.2.0 probe=503\nSWAP_SLOTS auto_rollback=false\nSTATUS',
        expected: 'STAGE_DEPLOYED: version=v1.2.0 probe=503\nSWAP_WARNING: degraded_deployment (status=503), prod=v1.2.0\nCURRENT_STATE: prod=v1.2.0 stage=v1.0.0'
      }
    ],
    solution: `import sys

prod_ver = "v1.0.0"
stage_ver = "none"
stage_probe = 0

for line in sys.stdin.read().splitlines():
    line = line.strip()
    if not line:
        continue
    parts = line.split()
    cmd = parts[0]
    
    props = {}
    for p in parts[1:]:
        if "=" in p:
            k, v = p.split("=", 1)
            props[k] = v
            
    if cmd == "DEPLOY_STAGE":
        stage_ver = props.get("version", "none")
        stage_probe = int(props.get("probe", 200))
        print(f"STAGE_DEPLOYED: version={stage_ver} probe={stage_probe}")
        
    elif cmd == "SWAP_SLOTS":
        auto_rb = props.get("auto_rollback", "true").lower() == "true"
        if stage_probe == 200:
            old_prod = prod_ver
            prod_ver = stage_ver
            stage_ver = old_prod
            print(f"SWAP_SUCCESS: prod={prod_ver} stage={stage_ver}")
        else:
            if auto_rb:
                stage_ver = "none"
                print(f"SWAP_ABORTED: probe_failed (status={stage_probe}), rollback to {prod_ver}")
            else:
                old_prod = prod_ver
                prod_ver = stage_ver
                stage_ver = old_prod
                print(f"SWAP_WARNING: degraded_deployment (status={stage_probe}), prod={prod_ver}")
                
    elif cmd == "STATUS":
        print(f"CURRENT_STATE: prod={prod_ver} stage={stage_ver}")
`
  }
];
