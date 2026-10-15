/**
 * server/exercises/b3-cloud-aws/chapitre3.js — Exercices du Chapitre 3
 * Chapitre 3 : Calcul & Conteneurs — EC2, EBS, ELB, Auto Scaling & Fargate
 */

module.exports = [
  {
    id: 'aws3-c3-e1',
    chapter: 3,
    title: 'Optimiseur de Coûts & Stratégie d\'Achat EC2 (On-Demand, Reserved, Spot)',
    level: 'n1',
    language: 'python',
    goal: 'Calculer le coût total et l\'économie réalisée en panachant les modèles d\'achat d\'instances EC2 pour une charge avec pic.',
    brief: `<p>Une architecture cloud moderne optimise ses coûts en combinant plusieurs modèles d\'achat EC2 :<br><br>
1. <strong>Charge de base stable (Baseline)</strong> :<br>
Tourne 100% du temps. Elle bénéficie d'instances réservées (Reserved Instances) ou d'un Savings Plan offrant un rabais contractuel (ex: 40%).<br>
<code>Cout_baseline = Baseline_instances * Heures * Taux_OnDemand * (1.0 - Rabais_Reserved / 100)</code>.<br><br>
2. <strong>Pic variable (Spike)</strong> :<br>
Charge additionnelle tolérante aux pannes couverte par des instances Spot avec un rabais agressif (ex: 70%).<br>
<code>Cout_spike = Spike_instances * Heures * Taux_OnDemand * (1.0 - Rabais_Spot / 100)</code>.<br><br>
3. <strong>Scénario de référence 100% On-Demand</strong> :<br>
<code>Cout_ref = (Baseline_instances + Spike_instances) * Heures * Taux_OnDemand</code>.<br><br>
Entrée STDIN :<br>
<code>EC2_COST BASELINE=&lt;n&gt; SPIKE=&lt;n&gt; HOURS=&lt;h&gt; RATE=&lt;$/h&gt; SPOT_DISC=&lt;pct&gt; RES_DISC=&lt;pct&gt;</code>.<br><br>
Sortie :<br>
<code>BUDGET: baseline_cost=&lt;b:.2f&gt;$ spike_cost=&lt;s:.2f&gt;$ total_cost=&lt;t:.2f&gt;$ savings_pct=&lt;p:.2f&gt;%</code>.</p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer l'optimisation des coûts EC2
`,
    hints: [
      "Analysez scrupuleusement le format d'entrée STDIN.",
      "Respectez la casse et les séparateurs attendus en sortie."
    ],
    examples: [
      {
        stdin: 'EC2_COST BASELINE=4 SPIKE=6 HOURS=720 RATE=0.10 SPOT_DISC=70 RES_DISC=40',
        expected: 'BUDGET: baseline_cost=172.80$ spike_cost=129.60$ total_cost=302.40$ savings_pct=58.00%',
        note: "Cas d'usage nominal."
      }
    ],
    tests: [
      {
        label: 'Petite flotte continue (2 baseline, 0 spike sur 1 mois)',
        stdin: 'EC2_COST BASELINE=2 SPIKE=0 HOURS=720 RATE=0.05 SPOT_DISC=70 RES_DISC=35',
        expected: 'BUDGET: baseline_cost=46.80$ spike_cost=0.00$ total_cost=46.80$ savings_pct=35.00%\n'
      },
      {
        label: 'Batch processing 100% Spot (0 baseline, 10 spike sur 24h)',
        stdin: 'EC2_COST BASELINE=0 SPIKE=10 HOURS=24 RATE=0.20 SPOT_DISC=75 RES_DISC=40',
        expected: 'BUDGET: baseline_cost=0.00$ spike_cost=12.00$ total_cost=12.00$ savings_pct=75.00%\n'
      },
      {
        label: 'Forte charge de production avec pic nocturne',
        stdin: 'EC2_COST BASELINE=10 SPIKE=20 HOURS=100 RATE=0.50 SPOT_DISC=65 RES_DISC=50',
        expected: 'BUDGET: baseline_cost=250.00$ spike_cost=350.00$ total_cost=600.00$ savings_pct=60.00%\n'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for ligne in lignes:
    if not ligne.startswith("EC2_COST "):
        continue
    tokens = ligne.split()
    params = {}
    for t in tokens[1:]:
        if "=" in t:
            k, v = t.split("=", 1)
            params[k.upper()] = v

    baseline = int(params.get("BASELINE", "0"))
    spike = int(params.get("SPIKE", "0"))
    hours = float(params.get("HOURS", "0"))
    rate = float(params.get("RATE", "0"))
    spot_disc = float(params.get("SPOT_DISC", "0"))
    res_disc = float(params.get("RES_DISC", "0"))

    cost_base = baseline * hours * rate * (1.0 - res_disc / 100.0)
    cost_spike = spike * hours * rate * (1.0 - spot_disc / 100.0)
    total_opt = cost_base + cost_spike

    ref_ondemand = (baseline + spike) * hours * rate
    savings_pct = ((ref_ondemand - total_opt) / ref_ondemand * 100.0) if ref_ondemand > 0 else 0.0

    print(f"BUDGET: baseline_cost={cost_base:.2f}$ spike_cost={cost_spike:.2f}$ total_cost={total_opt:.2f}$ savings_pct={savings_pct:.2f}%")
`
  },
  {
    id: 'aws3-c3-e2',
    chapter: 3,
    title: 'Dimensionneur de Volumes de Stockage EBS (gp3 vs io2 Block Express)',
    level: 'n2',
    language: 'python',
    goal: 'Valider et calculer les paramètres d\'un volume EBS en respectant les plafonds et ratios officiels d\'AWS.',
    brief: `<p>Amazon Elastic Block Store (EBS) propose différents types de volumes SSD :<br><br>
1. <strong>gp3 (General Purpose SSD)</strong> :<br>
- Taille : 1 GiB à 16 384 GiB.<br>
- Base incluse gratuite : 3 000 IOPS et 125 MB/s de débit.<br>
- Maximum provisionnable : 16 000 IOPS et 1 000 MB/s.<br>
- Règle de cohérence : le ratio max est de 500 IOPS par GiB.<br><br>
2. <strong>io2 Block Express (Provisioned IOPS SSD)</strong> :<br>
- Taille : 4 GiB à 65 536 GiB.<br>
- Maximum provisionnable : 256 000 IOPS et 4 000 MB/s.<br>
- Règle de cohérence : le ratio max est de 1 000 IOPS par GiB.<br><br>
Entrée STDIN :<br>
<code>EBS_CHECK TYPE=&lt;gp3|io2&gt; SIZE_GIB=&lt;n&gt; IOPS=&lt;n&gt; MBPS=&lt;n&gt;</code>.<br><br>
Sortie :<br>
Si conforme : <code>EBS_VERDICT: type=&lt;t&gt; size=&lt;s&gt;GiB iops=&lt;i&gt; mbps=&lt;m&gt; status=VALID</code>.<br>
Si non conforme : <code>EBS_VERDICT: type=&lt;t&gt; size=&lt;s&gt;GiB status=INVALID reason=&lt;BAD_SIZE|EXCEEDED_IOPS|EXCEEDED_MBPS|RATIO_IOPS_EXCEEDED&gt;</code>.</p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : vérifier le dimensionnement des volumes EBS
`,
    hints: [
      "Analysez scrupuleusement le format d'entrée STDIN.",
      "Respectez la casse et les séparateurs attendus en sortie."
    ],
    examples: [
      {
        stdin: 'EBS_CHECK TYPE=gp3 SIZE_GIB=100 IOPS=3000 MBPS=125',
        expected: 'EBS_VERDICT: type=gp3 size=100GiB iops=3000 mbps=125 status=VALID',
        note: "Cas d'usage nominal."
      }
    ],
    tests: [
      {
        label: 'Volume gp3 valide avec IOPS et débit augmentés',
        stdin: 'EBS_CHECK TYPE=gp3 SIZE_GIB=200 IOPS=10000 MBPS=500',
        expected: 'EBS_VERDICT: type=gp3 size=200GiB iops=10000 mbps=500 status=VALID\n'
      },
      {
        label: 'Erreur ratio IOPS/GiB dépassé sur gp3 (500 IOPS/GiB max)',
        stdin: 'EBS_CHECK TYPE=gp3 SIZE_GIB=10 IOPS=6000 MBPS=125',
        expected: 'EBS_VERDICT: type=gp3 size=10GiB status=INVALID reason=RATIO_IOPS_EXCEEDED\n'
      },
      {
        label: 'Erreur débit MBps supérieur au plafond de 1 000 MB/s pour gp3',
        stdin: 'EBS_CHECK TYPE=gp3 SIZE_GIB=500 IOPS=10000 MBPS=1200',
        expected: 'EBS_VERDICT: type=gp3 size=500GiB status=INVALID reason=EXCEEDED_MBPS\n'
      },
      {
        label: 'Volume io2 Block Express haute performance valide',
        stdin: 'EBS_CHECK TYPE=io2 SIZE_GIB=500 IOPS=64000 MBPS=2000',
        expected: 'EBS_VERDICT: type=io2 size=500GiB iops=64000 mbps=2000 status=VALID\n'
      },
      {
        label: 'Erreur taille minimale io2 (inférieure à 4 GiB)',
        stdin: 'EBS_CHECK TYPE=io2 SIZE_GIB=2 IOPS=1000 MBPS=125',
        expected: 'EBS_VERDICT: type=io2 size=2GiB status=INVALID reason=BAD_SIZE\n'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for ligne in lignes:
    if not ligne.startswith("EBS_CHECK "):
        continue
    tokens = ligne.split()
    params = {}
    for t in tokens[1:]:
        if "=" in t:
            k, v = t.split("=", 1)
            params[k.upper()] = v

    vol_type = params.get("TYPE", "gp3").lower()
    size_gib = int(params.get("SIZE_GIB", "0"))
    iops = int(params.get("IOPS", "0"))
    mbps = int(params.get("MBPS", "0"))

    if vol_type == "gp3":
        if not (1 <= size_gib <= 16384):
            print(f"EBS_VERDICT: type=gp3 size={size_gib}GiB status=INVALID reason=BAD_SIZE")
        elif iops > 16000:
            print(f"EBS_VERDICT: type=gp3 size={size_gib}GiB status=INVALID reason=EXCEEDED_IOPS")
        elif mbps > 1000:
            print(f"EBS_VERDICT: type=gp3 size={size_gib}GiB status=INVALID reason=EXCEEDED_MBPS")
        elif iops > size_gib * 500:
            print(f"EBS_VERDICT: type=gp3 size={size_gib}GiB status=INVALID reason=RATIO_IOPS_EXCEEDED")
        else:
            print(f"EBS_VERDICT: type=gp3 size={size_gib}GiB iops={iops} mbps={mbps} status=VALID")
    elif vol_type == "io2":
        if not (4 <= size_gib <= 65536):
            print(f"EBS_VERDICT: type=io2 size={size_gib}GiB status=INVALID reason=BAD_SIZE")
        elif iops > 256000:
            print(f"EBS_VERDICT: type=io2 size={size_gib}GiB status=INVALID reason=EXCEEDED_IOPS")
        elif mbps > 4000:
            print(f"EBS_VERDICT: type=io2 size={size_gib}GiB status=INVALID reason=EXCEEDED_MBPS")
        elif iops > size_gib * 1000:
            print(f"EBS_VERDICT: type=io2 size={size_gib}GiB status=INVALID reason=RATIO_IOPS_EXCEEDED")
        else:
            print(f"EBS_VERDICT: type=io2 size={size_gib}GiB iops={iops} mbps={mbps} status=VALID")
`
  },
  {
    id: 'aws3-c3-e3',
    chapter: 3,
    title: 'Simulateur d\'Auto Scaling Group & Répartition Équilibrée Multi-AZ',
    level: 'n3',
    language: 'python',
    goal: 'Simuler l\'algorithme de répartition équilibrée d\'un Auto Scaling Group lors d\'un événement de mise à l\'échelle (Scale Out ou Scale In).',
    brief: `<p>Un <strong>Auto Scaling Group (ASG)</strong> garantit que les instances sont toujours réparties le plus équitablement possible entre les Availability Zones (AZs) configurées :<br><br>
Algorithme de répartition :<br>
1. <strong>Scale Out (Ajout d'instances)</strong> :<br>
À chaque nouvelle instance à ajouter, l'ASG sélectionne la zone qui possède actuellement <strong>le moins d'instances</strong>. En cas d'égalité, il choisit la première zone par ordre alphabétique.<br>
2. <strong>Scale In (Suppression d'instances)</strong> :<br>
À chaque instance à supprimer, l'ASG sélectionne la zone qui possède <strong>le plus d'instances</strong>. En cas d'égalité, il choisit la première zone par ordre alphabétique.<br>
3. <strong>Bornes Min/Max</strong> : La capacité cible (Desired) ne peut pas descendre sous <code>MIN</code> ni dépasser <code>MAX</code> (tronquer si nécessaire).<br><br>
Entrée STDIN :<br>
<code>ASG_DISTRIB ZONES=&lt;az1:count,az2:count,...&gt; TARGET=&lt;n&gt; MIN=&lt;min&gt; MAX=&lt;max&gt;</code>.<br><br>
Sortie :<br>
<code>ASG_PLAN: target=&lt;t&gt; current=&lt;c&gt; delta=&lt;+n|-n|0&gt; final_distribution=&lt;az1:count,az2:count,...&gt;</code>.</p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : simuler la distribution équilibrée Multi-AZ
`,
    hints: [
      "Analysez scrupuleusement le format d'entrée STDIN.",
      "Respectez la casse et les séparateurs attendus en sortie."
    ],
    examples: [
      {
        stdin: 'ASG_DISTRIB ZONES=eu-west-3a:1,eu-west-3b:1,eu-west-3c:1 TARGET=6 MIN=2 MAX=10',
        expected: 'ASG_PLAN: target=6 current=3 delta=+3 final_distribution=eu-west-3a:2,eu-west-3b:2,eu-west-3c:2',
        note: "Cas d'usage nominal."
      }
    ],
    tests: [
      {
        label: 'Scale Out de 2 à 5 instances sur 3 zones déséquilibrées',
        stdin: 'ASG_DISTRIB ZONES=us-east-1a:1,us-east-1b:0,us-east-1c:1 TARGET=5 MIN=1 MAX=8',
        expected: 'ASG_PLAN: target=5 current=2 delta=+3 final_distribution=us-east-1a:2,us-east-1b:2,us-east-1c:1\n'
      },
      {
        label: 'Scale In de 7 à 3 instances',
        stdin: 'ASG_DISTRIB ZONES=eu-central-1a:3,eu-central-1b:2,eu-central-1c:2 TARGET=3 MIN=2 MAX=10',
        expected: 'ASG_PLAN: target=3 current=7 delta=-4 final_distribution=eu-central-1a:1,eu-central-1b:1,eu-central-1c:1\n'
      },
      {
        label: 'Target plafonné par MAX',
        stdin: 'ASG_DISTRIB ZONES=ap-southeast-1a:2,ap-southeast-1b:2 TARGET=12 MIN=2 MAX=6',
        expected: 'ASG_PLAN: target=6 current=4 delta=+2 final_distribution=ap-southeast-1a:3,ap-southeast-1b:3\n'
      },
      {
        label: 'Capacité déjà atteinte (delta = 0)',
        stdin: 'ASG_DISTRIB ZONES=eu-west-1a:2,eu-west-1b:2 TARGET=4 MIN=2 MAX=6',
        expected: 'ASG_PLAN: target=4 current=4 delta=0 final_distribution=eu-west-1a:2,eu-west-1b:2\n'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for ligne in lignes:
    if not ligne.startswith("ASG_DISTRIB "):
        continue
    tokens = ligne.split()
    params = {}
    for t in tokens[1:]:
        if "=" in t:
            k, v = t.split("=", 1)
            params[k.upper()] = v

    raw_zones = params.get("ZONES", "").split(",")
    zones = {}
    for rz in raw_zones:
        if ":" in rz:
            z, c = rz.split(":", 1)
            zones[z.strip()] = int(c.strip())

    target = int(params.get("TARGET", "0"))
    min_cap = int(params.get("MIN", "0"))
    max_cap = int(params.get("MAX", "999"))

    # Bornage
    clamped_target = max(min_cap, min(target, max_cap))
    current_count = sum(zones.values())
    delta = clamped_target - current_count

    if delta > 0:
        # Scale out
        for _ in range(delta):
            # Zone avec le moins d'instances (tri par count croissant puis nom)
            best_zone = sorted(zones.keys(), key=lambda z: (zones[z], z))[0]
            zones[best_zone] += 1
    elif delta < 0:
        # Scale in
        for _ in range(abs(delta)):
            # Zone avec le plus d'instances (tri par count décroissant puis nom croissant)
            best_zone = sorted(zones.keys(), key=lambda z: (-zones[z], z))[0]
            zones[best_zone] -= 1

    sign = f"+{delta}" if delta > 0 else (f"{delta}" if delta < 0 else "0")
    distrib_str = ",".join(f"{z}:{zones[z]}" for z in sorted(zones.keys()))

    print(f"ASG_PLAN: target={clamped_target} current={current_count} delta={sign} final_distribution={distrib_str}")
`
  }
];
