'use strict';

module.exports = [
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
    "brief": "<p>Azure App Service permet les déploiements zéro-downtime grâce aux slots de déploiement. Avant de basculer (Swap) le trafic vers la nouvelle version, une sonde de santé (health check probe) valide l'intégrité de la pré-production (Staging).<br><br>\nÉtat initial :<br>\n- Slot <code>Production</code> : version <code>v1.0.0</code>.<br>\n- Slot <code>Staging</code> : version <code>none</code> (inactif).<br><br>\nCommandes prises en charge :<br>\n1. <code>DEPLOY_STAGE version=&lt;v&gt; probe=&lt;status_code&gt;</code><br>\n   Déploie la version <code>v</code> sur le slot Staging avec le code de santé <code>status_code</code>.<br>\n   Afficher : <code>STAGE_DEPLOYED: version=&lt;v&gt; probe=&lt;status_code&gt;</code><br><br>\n2. <code>SWAP_SLOTS auto_rollback=&lt;true|false&gt;</code><br>\n   Vérifie la sonde de santé du slot Staging :<br>\n   - Si <code>probe == 200</code> :<br>\n     La bascule s'effectue avec succès. La version de Staging devient celle de Production, et l'ancienne version de Production est basculée sur Staging.<br>\n     Afficher : <code>SWAP_SUCCESS: prod=&lt;new_prod&gt; stage=&lt;new_stage&gt;</code><br>\n   - Si <code>probe != 200</code> :<br>\n     - Si <code>auto_rollback=true</code> : la bascule est annulée, Production reste inchangée et Staging est réinitialisé à <code>none</code>.<br>\n       Afficher : <code>SWAP_ABORTED: probe_failed (status=&lt;status_code&gt;), rollback to &lt;current_prod&gt;</code><br>\n     - Si <code>auto_rollback=false</code> : la bascule a lieu malgré l'anomalie.<br>\n       Afficher : <code>SWAP_WARNING: degraded_deployment (status=&lt;status_code&gt;), prod=&lt;new_prod&gt;</code><br><br>\n3. <code>STATUS</code><br>\n   Afficher : <code>CURRENT_STATE: prod=&lt;current_prod&gt; stage=&lt;current_stage&gt;</code></p>",
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
  }
];
