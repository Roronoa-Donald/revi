'use strict';

module.exports = [
  {
    "id": "gcp3-c3-e1",
    "chapter": 3,
    "title": "Dimensionneur d'Instances Compute Engine et Calcul de SLA Composite",
    "level": "n1",
    "language": "analyse",
    "goal": "Vérifier les caractéristiques des séries de VM Compute Engine et calculer le SLA de disponibilité.",
    "brief": "<p>Google Compute Engine (GCE) propose différentes familles de machines virtuelles :<br>\nCatalogue des séries standard :<br>\n- <code>e2-micro</code> : vcpu=2, ram_gb=1, family=COST_OPTIMIZED<br>\n- <code>e2-medium</code> : vcpu=2, ram_gb=4, family=COST_OPTIMIZED<br>\n- <code>e2-standard-4</code> : vcpu=4, ram_gb=16, family=GENERAL_PURPOSE<br>\n- <code>n2-standard-8</code> : vcpu=8, ram_gb=32, family=GENERAL_PURPOSE<br>\n- <code>c2-standard-16</code> : vcpu=16, ram_gb=64, family=COMPUTE_OPTIMIZED<br><br>\nSLA de disponibilité mensuel Compute Engine :<br>\n- Déploiement mono-zone (Single-Zone VM) : <code>sla=99.5% max_downtime_monthly=216m</code><br>\n- Déploiement multi-zones (Multi-Zone MIG / HA) : <code>sla=99.99% max_downtime_monthly=4.32m</code><br><br>\nCommandes lues sur STDIN :<br>\n1. <code>GCE_SIZE machine_type=&lt;type&gt;</code> :<br>\n   <code>GCE: type=&lt;type&gt; vcpu=&lt;v&gt; ram_gb=&lt;r&gt; family=&lt;fam&gt;</code> (ou <code>GCE: type=&lt;type&gt; status=UNKNOWN</code>).<br>\n2. <code>GCE_SLA multi_zone=&lt;true|false&gt;</code> :<br>\n   <code>GCE_SLA: multi_zone=&lt;bool&gt; sla=&lt;sla&gt; max_downtime=&lt;time&gt;</code></p>",
    "starter": "# Grille d'analyse (gcp3-c3-e1) — Dimensionneur d'Instances Compute Engine et Calcul de SLA Composite\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Machine optimisée pour le calcul intensif c2]\n# Données : GCE_SIZE machine_type=c2-standard-16\nA_COMPLETER\n\n[Cas 2 — Machine inconnue]\n# Données : GCE_SIZE machine_type=quantum-turbo-99\nA_COMPLETER\n\n[Cas 3 — SLA mono-zone standard]\n# Données : GCE_SLA multi_zone=false\nA_COMPLETER\n",
    "hints": [
      "Structurez les machines dans un dictionnaire type -> (vcpu, ram, family).",
      "Branchez multi_zone == \"true\" vs \"false\" pour le calcul de SLA."
    ],
    "examples": [
      {
        "stdin": "GCE_SIZE machine_type=e2-standard-4\nGCE_SLA multi_zone=true",
        "expected": "GCE: type=e2-standard-4 vcpu=4 ram_gb=16 family=GENERAL_PURPOSE\nGCE_SLA: multi_zone=true sla=99.99% max_downtime=4.32m",
        "note": "Machine polyvalente 4 vCPU et SLA haute disponibilité multi-zones."
      }
    ],
    "tests": [
      {
        "label": "Machine optimisée pour le calcul intensif c2",
        "stdin": "cas:1",
        "expected": "GCE: type=c2-standard-16 vcpu=16 ram_gb=64 family=COMPUTE_OPTIMIZED"
      },
      {
        "label": "Machine inconnue",
        "stdin": "cas:2",
        "expected": "GCE: type=quantum-turbo-99 status=UNKNOWN"
      },
      {
        "label": "SLA mono-zone standard",
        "stdin": "cas:3",
        "expected": "GCE_SLA: multi_zone=false sla=99.5% max_downtime=216m"
      }
    ],
    "solution": "[Exemple]\nGCE: type=e2-standard-4 vcpu=4 ram_gb=16 family=GENERAL_PURPOSE\nGCE_SLA: multi_zone=true sla=99.99% max_downtime=4.32m\n\n[Cas 1 — Machine optimisée pour le calcul intensif c2]\nGCE: type=c2-standard-16 vcpu=16 ram_gb=64 family=COMPUTE_OPTIMIZED\n\n[Cas 2 — Machine inconnue]\nGCE: type=quantum-turbo-99 status=UNKNOWN\n\n[Cas 3 — SLA mono-zone standard]\nGCE_SLA: multi_zone=false sla=99.5% max_downtime=216m"
  },
  {
    "id": "gcp3-c3-e2",
    "chapter": 3,
    "title": "Moteur d'Auto-scaling pour Groupes d'Instances Gérés (MIG)",
    "level": "n2",
    "language": "analyse",
    "goal": "Calculer la taille cible d'un Managed Instance Group (MIG) selon la charge CPU cible et les limites d'échelle.",
    "brief": "<p>Un groupe d'instances géré (MIG) ajuste automatiquement le nombre d'instances selon la formule :<br>\n<code>desired = math.ceil(current_instances * (current_cpu / target_cpu))</code>.<br>\nLa valeur calculée doit être bornée :<br>\n- Si <code>desired &gt; max_instances</code> : <code>desired = max_instances</code>.<br>\n- Si <code>desired &lt; min_instances</code> : <code>desired = min_instances</code>.<br><br>\nActions :<br>\n- Si <code>desired &gt; current_instances</code> : <code>action=SCALE_UP</code><br>\n- Si <code>desired &lt; current_instances</code> : <code>action=SCALE_DOWN</code><br>\n- Si <code>desired == current_instances</code> : <code>action=NO_CHANGE</code><br><br>\nCommande STDIN :<br>\n<code>MIG_AUTOSCALE min=&lt;min&gt; max=&lt;max&gt; target_cpu=&lt;t&gt; current_instances=&lt;c&gt; current_cpu=&lt;cur_cpu&gt;</code>.<br>\nSortie :<br>\n<code>MIG: current=&lt;c&gt; target_cpu=&lt;t&gt; current_cpu=&lt;cur_cpu&gt; desired=&lt;d&gt; action=&lt;action&gt;</code></p>",
    "starter": "# Grille d'analyse (gcp3-c3-e2) — Moteur d'Auto-scaling pour Groupes d'Instances Gérés (MIG)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Diminution de charge entraînant un Scale-down]\n# Données : MIG_AUTOSCALE min=2 max=10 target_cpu=0.60 current_instances=6 current_cpu=0.25\nA_COMPLETER\n\n[Cas 2 — Plafonnement au maximum d instances autorisées]\n# Données : MIG_AUTOSCALE min=2 max=8 target_cpu=0.50 current_instances=6 current_cpu=0.95\nA_COMPLETER\n\n[Cas 3 — Charge stable sans changement d échelle]\n# Données : MIG_AUTOSCALE min=2 max=10 target_cpu=0.70 current_instances=4 current_cpu=0.70\nA_COMPLETER\n",
    "hints": [
      "Convertissez target_cpu et current_cpu en float.",
      "Utilisez math.ceil(cur * (cur_cpu / target_cpu)) puis appliquez max(min_val, min(max_val, desired))."
    ],
    "examples": [
      {
        "stdin": "MIG_AUTOSCALE min=2 max=10 target_cpu=0.60 current_instances=3 current_cpu=0.85",
        "expected": "MIG: current=3 target_cpu=0.60 current_cpu=0.85 desired=5 action=SCALE_UP",
        "note": "3 * (0.85 / 0.60) = 4.25 -> 5 instances, déclenchant un Scale-up."
      }
    ],
    "tests": [
      {
        "label": "Diminution de charge entraînant un Scale-down",
        "stdin": "cas:1",
        "expected": "MIG: current=6 target_cpu=0.60 current_cpu=0.25 desired=3 action=SCALE_DOWN"
      },
      {
        "label": "Plafonnement au maximum d instances autorisées",
        "stdin": "cas:2",
        "expected": "MIG: current=6 target_cpu=0.50 current_cpu=0.95 desired=8 action=SCALE_UP"
      },
      {
        "label": "Charge stable sans changement d échelle",
        "stdin": "cas:3",
        "expected": "MIG: current=4 target_cpu=0.70 current_cpu=0.70 desired=4 action=NO_CHANGE"
      }
    ],
    "solution": "[Exemple]\nMIG: current=3 target_cpu=0.60 current_cpu=0.85 desired=5 action=SCALE_UP\n\n[Cas 1 — Diminution de charge entraînant un Scale-down]\nMIG: current=6 target_cpu=0.60 current_cpu=0.25 desired=3 action=SCALE_DOWN\n\n[Cas 2 — Plafonnement au maximum d instances autorisées]\nMIG: current=6 target_cpu=0.50 current_cpu=0.95 desired=8 action=SCALE_UP\n\n[Cas 3 — Charge stable sans changement d échelle]\nMIG: current=4 target_cpu=0.70 current_cpu=0.70 desired=4 action=NO_CHANGE"
  },
  {
    "id": "gcp3-c3-e3",
    "chapter": 3,
    "title": "Déployeur Serverless Cloud Run et Répartition de Trafic Multi-Révisions",
    "level": "n3",
    "language": "analyse",
    "goal": "Valider la répartition de trafic entre révisions Cloud Run et simuler le routage d'une requête client.",
    "brief": "<p>Google Cloud Run permet de répartir le trafic HTTP entre plusieurs révisions (Canary Release / Blue-Green) :<br><br>\nCommandes lues sur STDIN :<br>\n1. <code>VALIDATE_SPLIT revs=&lt;r1:p1,r2:p2,...&gt;</code> :<br>\n   - Vérifie que la somme des pourcentages vaut exactement 100.<br>\n   - Si valide : <code>SPLIT: status=VALID revs_count=&lt;N&gt; allocation=&lt;revs&gt;</code><br>\n   - Si somme != 100 : <code>SPLIT: status=INVALID reason=SUM_MUST_BE_100 current_sum=&lt;S&gt;</code><br>\n2. <code>ROUTE_REQUEST req_id=&lt;id&gt; revs=&lt;r1:p1,r2:p2,...&gt;</code> :<br>\n   - Calcule <code>hash_val = sum(ord(c) for c in req_id) % 100</code>.<br>\n   - Parcourt les révisions dans l'ordre de gauche à droite. La requête est attribuée à la première révision dont le cumul des pourcentages dépasse strictement <code>hash_val</code>.<br>\n   - <code>ROUTE: req_id=&lt;id&gt; bucket=&lt;hash_val&gt; target_revision=&lt;rev&gt;</code></p>",
    "starter": "# Grille d'analyse (gcp3-c3-e3) — Déployeur Serverless Cloud Run et Répartition de Trafic Multi-Révisions\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Rejet somme de pourcentages différente de 100]\n# Données : VALIDATE_SPLIT revs=v1:70,v2:20\nA_COMPLETER\n\n[Cas 2 — Routage tombant dans la seconde révision canary]\n# Données : ROUTE_REQUEST req_id=REQ-CANARY-XYZ revs=v1:10,v2:90\nA_COMPLETER\n\n[Cas 3 — Répartition multi-révisions à 3 versions]\n# Données : VALIDATE_SPLIT revs=v1:50,v2:30,v3:20\n# Données : ROUTE_REQUEST req_id=USER-ABC revs=v1:50,v2:30,v3:20\nA_COMPLETER\n",
    "hints": [
      "La répartition de trafic Cloud Run Traffic Split affecte des pourcentages stricts entre les différentes révisions du conteneur.",
      "Vérifiez que la somme des quotas de trafic alloués aux révisions déployées atteint exactement 100%."
    ],
    "examples": [
      {
        "stdin": "VALIDATE_SPLIT revs=v1:80,v2:20\nROUTE_REQUEST req_id=REQ-1001 revs=v1:80,v2:20",
        "expected": "SPLIT: status=VALID revs_count=2 allocation=v1:80,v2:20\nROUTE: req_id=REQ-1001 bucket=71 target_revision=v1",
        "note": "Routage déterministe avec Canary deployment 80/20."
      }
    ],
    "tests": [
      {
        "label": "Rejet somme de pourcentages différente de 100",
        "stdin": "cas:1",
        "expected": "SPLIT: status=INVALID reason=SUM_MUST_BE_100 current_sum=90"
      },
      {
        "label": "Routage tombant dans la seconde révision canary",
        "stdin": "cas:2",
        "expected": "ROUTE: req_id=REQ-CANARY-XYZ bucket=35 target_revision=v2"
      },
      {
        "label": "Répartition multi-révisions à 3 versions",
        "stdin": "cas:3",
        "expected": "SPLIT: status=VALID revs_count=3 allocation=v1:50,v2:30,v3:20\nROUTE: req_id=USER-ABC bucket=62 target_revision=v2"
      }
    ],
    "solution": "[Exemple]\nSPLIT: status=VALID revs_count=2 allocation=v1:80,v2:20\nROUTE: req_id=REQ-1001 bucket=71 target_revision=v1\n\n[Cas 1 — Rejet somme de pourcentages différente de 100]\nSPLIT: status=INVALID reason=SUM_MUST_BE_100 current_sum=90\n\n[Cas 2 — Routage tombant dans la seconde révision canary]\nROUTE: req_id=REQ-CANARY-XYZ bucket=35 target_revision=v2\n\n[Cas 3 — Répartition multi-révisions à 3 versions]\nSPLIT: status=VALID revs_count=3 allocation=v1:50,v2:30,v3:20\nROUTE: req_id=USER-ABC bucket=62 target_revision=v2"
  }
];
