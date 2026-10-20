'use strict';

module.exports = [
  {
    "id": "aws3-c3-e1",
    "chapter": 3,
    "title": "Optimiseur de Coûts & Stratégie d'Achat EC2 (On-Demand, Reserved, Spot)",
    "level": "n1",
    "language": "analyse",
    "goal": "Calculer le coût total et l'économie réalisée en panachant les modèles d'achat d'instances EC2 pour une charge avec pic.",
    "brief": "<p>Une architecture cloud moderne optimise ses coûts en combinant plusieurs modèles d'achat EC2 :<br><br>\n1. <strong>Charge de base stable (Baseline)</strong> :<br>\nTourne 100% du temps. Elle bénéficie d'instances réservées (Reserved Instances) ou d'un Savings Plan offrant un rabais contractuel (ex: 40%).<br>\n<code>Cout_baseline = Baseline_instances * Heures * Taux_OnDemand * (1.0 - Rabais_Reserved / 100)</code>.<br><br>\n2. <strong>Pic variable (Spike)</strong> :<br>\nCharge additionnelle tolérante aux pannes couverte par des instances Spot avec un rabais agressif (ex: 70%).<br>\n<code>Cout_spike = Spike_instances * Heures * Taux_OnDemand * (1.0 - Rabais_Spot / 100)</code>.<br><br>\n3. <strong>Scénario de référence 100% On-Demand</strong> :<br>\n<code>Cout_ref = (Baseline_instances + Spike_instances) * Heures * Taux_OnDemand</code>.<br><br>\nEntrée STDIN :<br>\n<code>EC2_COST BASELINE=&lt;n&gt; SPIKE=&lt;n&gt; HOURS=&lt;h&gt; RATE=&lt;$/h&gt; SPOT_DISC=&lt;pct&gt; RES_DISC=&lt;pct&gt;</code>.<br><br>\nSortie :<br>\n<code>BUDGET: baseline_cost=&lt;b:.2f&gt;$ spike_cost=&lt;s:.2f&gt;$ total_cost=&lt;t:.2f&gt;$ savings_pct=&lt;p:.2f&gt;%</code>.</p>",
    "starter": "# Grille d'analyse (aws3-c3-e1) — Optimiseur de Coûts & Stratégie d'Achat EC2 (On-Demand, Reserved, Spot)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Petite flotte continue (2 baseline, 0 spike sur 1 mois)]\n# Données : EC2_COST BASELINE=2 SPIKE=0 HOURS=720 RATE=0.05 SPOT_DISC=70 RES_DISC=35\nA_COMPLETER\n\n[Cas 2 — Batch processing 100% Spot (0 baseline, 10 spike sur 24h)]\n# Données : EC2_COST BASELINE=0 SPIKE=10 HOURS=24 RATE=0.20 SPOT_DISC=75 RES_DISC=40\nA_COMPLETER\n\n[Cas 3 — Forte charge de production avec pic nocturne]\n# Données : EC2_COST BASELINE=10 SPIKE=20 HOURS=100 RATE=0.50 SPOT_DISC=65 RES_DISC=50\nA_COMPLETER\n",
    "hints": [
      "Analysez scrupuleusement le format d'entrée STDIN.",
      "Respectez la casse et les séparateurs attendus en sortie."
    ],
    "examples": [
      {
        "stdin": "EC2_COST BASELINE=4 SPIKE=6 HOURS=720 RATE=0.10 SPOT_DISC=70 RES_DISC=40",
        "expected": "BUDGET: baseline_cost=172.80$ spike_cost=129.60$ total_cost=302.40$ savings_pct=58.00%",
        "note": "Cas d'usage nominal."
      }
    ],
    "tests": [
      {
        "label": "Petite flotte continue (2 baseline, 0 spike sur 1 mois)",
        "stdin": "cas:1",
        "expected": "BUDGET: baseline_cost=46.80$ spike_cost=0.00$ total_cost=46.80$ savings_pct=35.00%\n"
      },
      {
        "label": "Batch processing 100% Spot (0 baseline, 10 spike sur 24h)",
        "stdin": "cas:2",
        "expected": "BUDGET: baseline_cost=0.00$ spike_cost=12.00$ total_cost=12.00$ savings_pct=75.00%\n"
      },
      {
        "label": "Forte charge de production avec pic nocturne",
        "stdin": "cas:3",
        "expected": "BUDGET: baseline_cost=250.00$ spike_cost=350.00$ total_cost=600.00$ savings_pct=60.00%\n"
      }
    ],
    "solution": "[Exemple]\nBUDGET: baseline_cost=172.80$ spike_cost=129.60$ total_cost=302.40$ savings_pct=58.00%\n\n[Cas 1 — Petite flotte continue (2 baseline, 0 spike sur 1 mois)]\nBUDGET: baseline_cost=46.80$ spike_cost=0.00$ total_cost=46.80$ savings_pct=35.00%\n\n\n[Cas 2 — Batch processing 100% Spot (0 baseline, 10 spike sur 24h)]\nBUDGET: baseline_cost=0.00$ spike_cost=12.00$ total_cost=12.00$ savings_pct=75.00%\n\n\n[Cas 3 — Forte charge de production avec pic nocturne]\nBUDGET: baseline_cost=250.00$ spike_cost=350.00$ total_cost=600.00$ savings_pct=60.00%"
  },
  {
    "id": "aws3-c3-e2",
    "chapter": 3,
    "title": "Dimensionneur de Volumes de Stockage EBS (gp3 vs io2 Block Express)",
    "level": "n2",
    "language": "analyse",
    "goal": "Valider et calculer les paramètres d'un volume EBS en respectant les plafonds et ratios officiels d'AWS.",
    "brief": "<p>Amazon Elastic Block Store (EBS) propose différents types de volumes SSD :<br><br>\n1. <strong>gp3 (General Purpose SSD)</strong> :<br>\n- Taille : 1 GiB à 16 384 GiB.<br>\n- Base incluse gratuite : 3 000 IOPS et 125 MB/s de débit.<br>\n- Maximum provisionnable : 16 000 IOPS et 1 000 MB/s.<br>\n- Règle de cohérence : le ratio max est de 500 IOPS par GiB.<br><br>\n2. <strong>io2 Block Express (Provisioned IOPS SSD)</strong> :<br>\n- Taille : 4 GiB à 65 536 GiB.<br>\n- Maximum provisionnable : 256 000 IOPS et 4 000 MB/s.<br>\n- Règle de cohérence : le ratio max est de 1 000 IOPS par GiB.<br><br>\nEntrée STDIN :<br>\n<code>EBS_CHECK TYPE=&lt;gp3|io2&gt; SIZE_GIB=&lt;n&gt; IOPS=&lt;n&gt; MBPS=&lt;n&gt;</code>.<br><br>\nSortie :<br>\nSi conforme : <code>EBS_VERDICT: type=&lt;t&gt; size=&lt;s&gt;GiB iops=&lt;i&gt; mbps=&lt;m&gt; status=VALID</code>.<br>\nSi non conforme : <code>EBS_VERDICT: type=&lt;t&gt; size=&lt;s&gt;GiB status=INVALID reason=&lt;BAD_SIZE|EXCEEDED_IOPS|EXCEEDED_MBPS|RATIO_IOPS_EXCEEDED&gt;</code>.</p>",
    "starter": "# Grille d'analyse (aws3-c3-e2) — Dimensionneur de Volumes de Stockage EBS (gp3 vs io2 Block Express)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Volume gp3 valide avec IOPS et débit augmentés]\n# Données : EBS_CHECK TYPE=gp3 SIZE_GIB=200 IOPS=10000 MBPS=500\nA_COMPLETER\n\n[Cas 2 — Erreur ratio IOPS/GiB dépassé sur gp3 (500 IOPS/GiB max)]\n# Données : EBS_CHECK TYPE=gp3 SIZE_GIB=10 IOPS=6000 MBPS=125\nA_COMPLETER\n\n[Cas 3 — Erreur débit MBps supérieur au plafond de 1 000 MB/s pour gp3]\n# Données : EBS_CHECK TYPE=gp3 SIZE_GIB=500 IOPS=10000 MBPS=1200\nA_COMPLETER\n\n[Cas 4 — Volume io2 Block Express haute performance valide]\n# Données : EBS_CHECK TYPE=io2 SIZE_GIB=500 IOPS=64000 MBPS=2000\nA_COMPLETER\n\n[Cas 5 — Erreur taille minimale io2 (inférieure à 4 GiB)]\n# Données : EBS_CHECK TYPE=io2 SIZE_GIB=2 IOPS=1000 MBPS=125\nA_COMPLETER\n",
    "hints": [
      "Analysez scrupuleusement le format d'entrée STDIN.",
      "Respectez la casse et les séparateurs attendus en sortie."
    ],
    "examples": [
      {
        "stdin": "EBS_CHECK TYPE=gp3 SIZE_GIB=100 IOPS=3000 MBPS=125",
        "expected": "EBS_VERDICT: type=gp3 size=100GiB iops=3000 mbps=125 status=VALID",
        "note": "Cas d'usage nominal."
      }
    ],
    "tests": [
      {
        "label": "Volume gp3 valide avec IOPS et débit augmentés",
        "stdin": "cas:1",
        "expected": "EBS_VERDICT: type=gp3 size=200GiB iops=10000 mbps=500 status=VALID\n"
      },
      {
        "label": "Erreur ratio IOPS/GiB dépassé sur gp3 (500 IOPS/GiB max)",
        "stdin": "cas:2",
        "expected": "EBS_VERDICT: type=gp3 size=10GiB status=INVALID reason=RATIO_IOPS_EXCEEDED\n"
      },
      {
        "label": "Erreur débit MBps supérieur au plafond de 1 000 MB/s pour gp3",
        "stdin": "cas:3",
        "expected": "EBS_VERDICT: type=gp3 size=500GiB status=INVALID reason=EXCEEDED_MBPS\n"
      },
      {
        "label": "Volume io2 Block Express haute performance valide",
        "stdin": "cas:4",
        "expected": "EBS_VERDICT: type=io2 size=500GiB iops=64000 mbps=2000 status=VALID\n"
      },
      {
        "label": "Erreur taille minimale io2 (inférieure à 4 GiB)",
        "stdin": "cas:5",
        "expected": "EBS_VERDICT: type=io2 size=2GiB status=INVALID reason=BAD_SIZE\n"
      }
    ],
    "solution": "[Exemple]\nEBS_VERDICT: type=gp3 size=100GiB iops=3000 mbps=125 status=VALID\n\n[Cas 1 — Volume gp3 valide avec IOPS et débit augmentés]\nEBS_VERDICT: type=gp3 size=200GiB iops=10000 mbps=500 status=VALID\n\n\n[Cas 2 — Erreur ratio IOPS/GiB dépassé sur gp3 (500 IOPS/GiB max)]\nEBS_VERDICT: type=gp3 size=10GiB status=INVALID reason=RATIO_IOPS_EXCEEDED\n\n\n[Cas 3 — Erreur débit MBps supérieur au plafond de 1 000 MB/s pour gp3]\nEBS_VERDICT: type=gp3 size=500GiB status=INVALID reason=EXCEEDED_MBPS\n\n\n[Cas 4 — Volume io2 Block Express haute performance valide]\nEBS_VERDICT: type=io2 size=500GiB iops=64000 mbps=2000 status=VALID\n\n\n[Cas 5 — Erreur taille minimale io2 (inférieure à 4 GiB)]\nEBS_VERDICT: type=io2 size=2GiB status=INVALID reason=BAD_SIZE"
  },
  {
    "id": "aws3-c3-e3",
    "chapter": 3,
    "title": "Simulateur d'Auto Scaling Group & Répartition Équilibrée Multi-AZ",
    "level": "n3",
    "language": "analyse",
    "goal": "Simuler l'algorithme de répartition équilibrée d'un Auto Scaling Group lors d'un événement de mise à l'échelle (Scale Out ou Scale In).",
    "brief": "<p>Un <strong>Auto Scaling Group (ASG)</strong> garantit que les instances sont toujours réparties le plus équitablement possible entre les Availability Zones (AZs) configurées :<br><br>\nAlgorithme de répartition :<br>\n1. <strong>Scale Out (Ajout d'instances)</strong> :<br>\nÀ chaque nouvelle instance à ajouter, l'ASG sélectionne la zone qui possède actuellement <strong>le moins d'instances</strong>. En cas d'égalité, il choisit la première zone par ordre alphabétique.<br>\n2. <strong>Scale In (Suppression d'instances)</strong> :<br>\nÀ chaque instance à supprimer, l'ASG sélectionne la zone qui possède <strong>le plus d'instances</strong>. En cas d'égalité, il choisit la première zone par ordre alphabétique.<br>\n3. <strong>Bornes Min/Max</strong> : La capacité cible (Desired) ne peut pas descendre sous <code>MIN</code> ni dépasser <code>MAX</code> (tronquer si nécessaire).<br><br>\nEntrée STDIN :<br>\n<code>ASG_DISTRIB ZONES=&lt;az1:count,az2:count,...&gt; TARGET=&lt;n&gt; MIN=&lt;min&gt; MAX=&lt;max&gt;</code>.<br><br>\nSortie :<br>\n<code>ASG_PLAN: target=&lt;t&gt; current=&lt;c&gt; delta=&lt;+n|-n|0&gt; final_distribution=&lt;az1:count,az2:count,...&gt;</code>.</p>",
    "starter": "# Grille d'analyse (aws3-c3-e3) — Simulateur d'Auto Scaling Group & Répartition Équilibrée Multi-AZ\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Scale Out de 2 à 5 instances sur 3 zones déséquilibrées]\n# Données : ASG_DISTRIB ZONES=us-east-1a:1,us-east-1b:0,us-east-1c:1 TARGET=5 MIN=1 MAX=8\nA_COMPLETER\n\n[Cas 2 — Scale In de 7 à 3 instances]\n# Données : ASG_DISTRIB ZONES=eu-central-1a:3,eu-central-1b:2,eu-central-1c:2 TARGET=3 MIN=2 MAX=10\nA_COMPLETER\n\n[Cas 3 — Target plafonné par MAX]\n# Données : ASG_DISTRIB ZONES=ap-southeast-1a:2,ap-southeast-1b:2 TARGET=12 MIN=2 MAX=6\nA_COMPLETER\n\n[Cas 4 — Capacité déjà atteinte (delta = 0)]\n# Données : ASG_DISTRIB ZONES=eu-west-1a:2,eu-west-1b:2 TARGET=4 MIN=2 MAX=6\nA_COMPLETER\n",
    "hints": [
      "Analysez scrupuleusement le format d'entrée STDIN.",
      "Respectez la casse et les séparateurs attendus en sortie."
    ],
    "examples": [
      {
        "stdin": "ASG_DISTRIB ZONES=eu-west-3a:1,eu-west-3b:1,eu-west-3c:1 TARGET=6 MIN=2 MAX=10",
        "expected": "ASG_PLAN: target=6 current=3 delta=+3 final_distribution=eu-west-3a:2,eu-west-3b:2,eu-west-3c:2",
        "note": "Cas d'usage nominal."
      }
    ],
    "tests": [
      {
        "label": "Scale Out de 2 à 5 instances sur 3 zones déséquilibrées",
        "stdin": "cas:1",
        "expected": "ASG_PLAN: target=5 current=2 delta=+3 final_distribution=us-east-1a:2,us-east-1b:2,us-east-1c:1\n"
      },
      {
        "label": "Scale In de 7 à 3 instances",
        "stdin": "cas:2",
        "expected": "ASG_PLAN: target=3 current=7 delta=-4 final_distribution=eu-central-1a:1,eu-central-1b:1,eu-central-1c:1\n"
      },
      {
        "label": "Target plafonné par MAX",
        "stdin": "cas:3",
        "expected": "ASG_PLAN: target=6 current=4 delta=+2 final_distribution=ap-southeast-1a:3,ap-southeast-1b:3\n"
      },
      {
        "label": "Capacité déjà atteinte (delta = 0)",
        "stdin": "cas:4",
        "expected": "ASG_PLAN: target=4 current=4 delta=0 final_distribution=eu-west-1a:2,eu-west-1b:2\n"
      }
    ],
    "solution": "[Exemple]\nASG_PLAN: target=6 current=3 delta=+3 final_distribution=eu-west-3a:2,eu-west-3b:2,eu-west-3c:2\n\n[Cas 1 — Scale Out de 2 à 5 instances sur 3 zones déséquilibrées]\nASG_PLAN: target=5 current=2 delta=+3 final_distribution=us-east-1a:2,us-east-1b:2,us-east-1c:1\n\n\n[Cas 2 — Scale In de 7 à 3 instances]\nASG_PLAN: target=3 current=7 delta=-4 final_distribution=eu-central-1a:1,eu-central-1b:1,eu-central-1c:1\n\n\n[Cas 3 — Target plafonné par MAX]\nASG_PLAN: target=6 current=4 delta=+2 final_distribution=ap-southeast-1a:3,ap-southeast-1b:3\n\n\n[Cas 4 — Capacité déjà atteinte (delta = 0)]\nASG_PLAN: target=4 current=4 delta=0 final_distribution=eu-west-1a:2,eu-west-1b:2"
  }
];
