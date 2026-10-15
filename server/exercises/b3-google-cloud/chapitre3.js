/**
 * Exercices du Chapitre 3 : Calcul & Virtualisation (Compute Engine, GKE, Cloud Run & App Engine).
 * Préfixe : gcp3-c3-e
 */
'use strict';

module.exports = [
  {
    id: 'gcp3-c3-e1',
    chapter: 3,
    title: 'Dimensionneur d\'Instances Compute Engine et Calcul de SLA Composite',
    level: 'n1',
    language: 'python',
    goal: 'Vérifier les caractéristiques des séries de VM Compute Engine et calculer le SLA de disponibilité.',
    brief: `<p>Google Compute Engine (GCE) propose différentes familles de machines virtuelles :<br>
Catalogue des séries standard :<br>
- <code>e2-micro</code> : vcpu=2, ram_gb=1, family=COST_OPTIMIZED<br>
- <code>e2-medium</code> : vcpu=2, ram_gb=4, family=COST_OPTIMIZED<br>
- <code>e2-standard-4</code> : vcpu=4, ram_gb=16, family=GENERAL_PURPOSE<br>
- <code>n2-standard-8</code> : vcpu=8, ram_gb=32, family=GENERAL_PURPOSE<br>
- <code>c2-standard-16</code> : vcpu=16, ram_gb=64, family=COMPUTE_OPTIMIZED<br><br>
SLA de disponibilité mensuel Compute Engine :<br>
- Déploiement mono-zone (Single-Zone VM) : <code>sla=99.5% max_downtime_monthly=216m</code><br>
- Déploiement multi-zones (Multi-Zone MIG / HA) : <code>sla=99.99% max_downtime_monthly=4.32m</code><br><br>
Commandes lues sur STDIN :<br>
1. <code>GCE_SIZE machine_type=&lt;type&gt;</code> :<br>
   <code>GCE: type=&lt;type&gt; vcpu=&lt;v&gt; ram_gb=&lt;r&gt; family=&lt;fam&gt;</code> (ou <code>GCE: type=&lt;type&gt; status=UNKNOWN</code>).<br>
2. <code>GCE_SLA multi_zone=&lt;true|false&gt;</code> :<br>
   <code>GCE_SLA: multi_zone=&lt;bool&gt; sla=&lt;sla&gt; max_downtime=&lt;time&gt;</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : implémenter le dimensionnement GCE et calcul SLA
`,
    hints: [
      'Structurez les machines dans un dictionnaire type -> (vcpu, ram, family).',
      'Branchez multi_zone == "true" vs "false" pour le calcul de SLA.'
    ],
    examples: [
      {
        stdin: `GCE_SIZE machine_type=e2-standard-4
GCE_SLA multi_zone=true`,
        expected: `GCE: type=e2-standard-4 vcpu=4 ram_gb=16 family=GENERAL_PURPOSE
GCE_SLA: multi_zone=true sla=99.99% max_downtime=4.32m`,
        note: 'Machine polyvalente 4 vCPU et SLA haute disponibilité multi-zones.'
      }
    ],
    tests: [
      {
        label: 'Machine optimisée pour le calcul intensif c2',
        stdin: 'GCE_SIZE machine_type=c2-standard-16',
        expected: 'GCE: type=c2-standard-16 vcpu=16 ram_gb=64 family=COMPUTE_OPTIMIZED'
      },
      {
        label: 'Machine inconnue',
        stdin: 'GCE_SIZE machine_type=quantum-turbo-99',
        expected: 'GCE: type=quantum-turbo-99 status=UNKNOWN'
      },
      {
        label: 'SLA mono-zone standard',
        stdin: 'GCE_SLA multi_zone=false',
        expected: 'GCE_SLA: multi_zone=false sla=99.5% max_downtime=216m'
      }
    ],
    solution: `import sys

catalog = {
    'e2-micro': (2, 1, 'COST_OPTIMIZED'),
    'e2-medium': (2, 4, 'COST_OPTIMIZED'),
    'e2-standard-4': (4, 16, 'GENERAL_PURPOSE'),
    'n2-standard-8': (8, 32, 'GENERAL_PURPOSE'),
    'c2-standard-16': (16, 64, 'COMPUTE_OPTIMIZED')
}

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for line in lignes:
    parts = line.strip().split()
    cmd = parts[0]
    params = {}
    for p in parts[1:]:
        if '=' in p:
            k, v = p.split('=', 1)
            params[k] = v
            
    if cmd == 'GCE_SIZE':
        m_type = params.get('machine_type', '')
        if m_type in catalog:
            vcpu, ram, fam = catalog[m_type]
            print(f"GCE: type={m_type} vcpu={vcpu} ram_gb={ram} family={fam}")
        else:
            print(f"GCE: type={m_type} status=UNKNOWN")
            
    elif cmd == 'GCE_SLA':
        mz = params.get('multi_zone', '').lower()
        if mz == 'true':
            print("GCE_SLA: multi_zone=true sla=99.99% max_downtime=4.32m")
        else:
            print("GCE_SLA: multi_zone=false sla=99.5% max_downtime=216m")
`
  },
  {
    id: 'gcp3-c3-e2',
    chapter: 3,
    title: 'Moteur d\'Auto-scaling pour Groupes d\'Instances Gérés (MIG)',
    level: 'n2',
    language: 'python',
    goal: 'Calculer la taille cible d\'un Managed Instance Group (MIG) selon la charge CPU cible et les limites d\'échelle.',
    brief: `<p>Un groupe d'instances géré (MIG) ajuste automatiquement le nombre d'instances selon la formule :<br>
<code>desired = math.ceil(current_instances * (current_cpu / target_cpu))</code>.<br>
La valeur calculée doit être bornée :<br>
- Si <code>desired &gt; max_instances</code> : <code>desired = max_instances</code>.<br>
- Si <code>desired &lt; min_instances</code> : <code>desired = min_instances</code>.<br><br>
Actions :<br>
- Si <code>desired &gt; current_instances</code> : <code>action=SCALE_UP</code><br>
- Si <code>desired &lt; current_instances</code> : <code>action=SCALE_DOWN</code><br>
- Si <code>desired == current_instances</code> : <code>action=NO_CHANGE</code><br><br>
Commande STDIN :<br>
<code>MIG_AUTOSCALE min=&lt;min&gt; max=&lt;max&gt; target_cpu=&lt;t&gt; current_instances=&lt;c&gt; current_cpu=&lt;cur_cpu&gt;</code>.<br>
Sortie :<br>
<code>MIG: current=&lt;c&gt; target_cpu=&lt;t&gt; current_cpu=&lt;cur_cpu&gt; desired=&lt;d&gt; action=&lt;action&gt;</code></p>`,
    starter: `import sys
import math

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : implémenter l'algorithme d'autoscaling MIG
`,
    hints: [
      'Convertissez target_cpu et current_cpu en float.',
      'Utilisez math.ceil(cur * (cur_cpu / target_cpu)) puis appliquez max(min_val, min(max_val, desired)).'
    ],
    examples: [
      {
        stdin: 'MIG_AUTOSCALE min=2 max=10 target_cpu=0.60 current_instances=3 current_cpu=0.85',
        expected: 'MIG: current=3 target_cpu=0.60 current_cpu=0.85 desired=5 action=SCALE_UP',
        note: '3 * (0.85 / 0.60) = 4.25 -> 5 instances, déclenchant un Scale-up.'
      }
    ],
    tests: [
      {
        label: 'Diminution de charge entraînant un Scale-down',
        stdin: 'MIG_AUTOSCALE min=2 max=10 target_cpu=0.60 current_instances=6 current_cpu=0.25',
        expected: 'MIG: current=6 target_cpu=0.60 current_cpu=0.25 desired=3 action=SCALE_DOWN'
      },
      {
        label: 'Plafonnement au maximum d instances autorisées',
        stdin: 'MIG_AUTOSCALE min=2 max=8 target_cpu=0.50 current_instances=6 current_cpu=0.95',
        expected: 'MIG: current=6 target_cpu=0.50 current_cpu=0.95 desired=8 action=SCALE_UP'
      },
      {
        label: 'Charge stable sans changement d échelle',
        stdin: 'MIG_AUTOSCALE min=2 max=10 target_cpu=0.70 current_instances=4 current_cpu=0.70',
        expected: 'MIG: current=4 target_cpu=0.70 current_cpu=0.70 desired=4 action=NO_CHANGE'
      }
    ],
    solution: `import sys
import math

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for line in lignes:
    params = {}
    for p in line.strip().split():
        if '=' in p:
            k, v = p.split('=', 1)
            params[k] = v
            
    min_inst = int(params['min'])
    max_inst = int(params['max'])
    target_cpu = float(params['target_cpu'])
    cur_inst = int(params['current_instances'])
    cur_cpu = float(params['current_cpu'])
    
    raw_desired = math.ceil(cur_inst * (cur_cpu / target_cpu))
    desired = max(min_inst, min(max_inst, raw_desired))
    
    if desired > cur_inst:
        action = 'SCALE_UP'
    elif desired < cur_inst:
        action = 'SCALE_DOWN'
    else:
        action = 'NO_CHANGE'
        
    print(f"MIG: current={cur_inst} target_cpu={target_cpu:.2f} current_cpu={cur_cpu:.2f} desired={desired} action={action}")
`
  },
  {
    id: 'gcp3-c3-e3',
    chapter: 3,
    title: 'Déployeur Serverless Cloud Run et Répartition de Trafic Multi-Révisions',
    level: 'n3',
    language: 'python',
    goal: 'Valider la répartition de trafic entre révisions Cloud Run et simuler le routage d\'une requête client.',
    brief: `<p>Google Cloud Run permet de répartir le trafic HTTP entre plusieurs révisions (Canary Release / Blue-Green) :<br><br>
Commandes lues sur STDIN :<br>
1. <code>VALIDATE_SPLIT revs=&lt;r1:p1,r2:p2,...&gt;</code> :<br>
   - Vérifie que la somme des pourcentages vaut exactement 100.<br>
   - Si valide : <code>SPLIT: status=VALID revs_count=&lt;N&gt; allocation=&lt;revs&gt;</code><br>
   - Si somme != 100 : <code>SPLIT: status=INVALID reason=SUM_MUST_BE_100 current_sum=&lt;S&gt;</code><br>
2. <code>ROUTE_REQUEST req_id=&lt;id&gt; revs=&lt;r1:p1,r2:p2,...&gt;</code> :<br>
   - Calcule <code>hash_val = sum(ord(c) for c in req_id) % 100</code>.<br>
   - Parcourt les révisions dans l'ordre de gauche à droite. La requête est attribuée à la première révision dont le cumul des pourcentages dépasse strictement <code>hash_val</code>.<br>
   - <code>ROUTE: req_id=&lt;id&gt; bucket=&lt;hash_val&gt; target_revision=&lt;rev&gt;</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : implémenter la validation et le routage Cloud Run
`,
    hints: [
      'Pour VALIDATE_SPLIT, découpez revs sur virgule puis chaque terme sur deux-points pour sommer int(p).',
      'Pour ROUTE_REQUEST, calculez hash_val et faites un parcours cumulatif : cumul += pct ; si hash_val < cumul: return rev.'
    ],
    examples: [
      {
        stdin: `VALIDATE_SPLIT revs=v1:80,v2:20
ROUTE_REQUEST req_id=REQ-1001 revs=v1:80,v2:20`,
        expected: `SPLIT: status=VALID revs_count=2 allocation=v1:80,v2:20
ROUTE: req_id=REQ-1001 bucket=71 target_revision=v1`,
        note: 'Routage déterministe avec Canary deployment 80/20.'
      }
    ],
    tests: [
      {
        label: 'Rejet somme de pourcentages différente de 100',
        stdin: 'VALIDATE_SPLIT revs=v1:70,v2:20',
        expected: 'SPLIT: status=INVALID reason=SUM_MUST_BE_100 current_sum=90'
      },
      {
        label: 'Routage tombant dans la seconde révision canary',
        stdin: 'ROUTE_REQUEST req_id=REQ-CANARY-XYZ revs=v1:10,v2:90',
        expected: 'ROUTE: req_id=REQ-CANARY-XYZ bucket=35 target_revision=v2'
      },
      {
        label: 'Répartition multi-révisions à 3 versions',
        stdin: `VALIDATE_SPLIT revs=v1:50,v2:30,v3:20
ROUTE_REQUEST req_id=USER-ABC revs=v1:50,v2:30,v3:20`,
        expected: `SPLIT: status=VALID revs_count=3 allocation=v1:50,v2:30,v3:20
ROUTE: req_id=USER-ABC bucket=62 target_revision=v2`
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for line in lignes:
    parts = line.strip().split()
    cmd = parts[0]
    params = {}
    for p in parts[1:]:
        if '=' in p:
            k, v = p.split('=', 1)
            params[k] = v
            
    raw_revs = params.get('revs', '')
    parsed = []
    total_pct = 0
    for r_entry in raw_revs.split(','):
        if ':' in r_entry:
            r_name, pct_str = r_entry.split(':', 1)
            p_val = int(pct_str)
            parsed.append((r_name, p_val))
            total_pct += p_val
            
    if cmd == 'VALIDATE_SPLIT':
        if total_pct == 100:
            print(f"SPLIT: status=VALID revs_count={len(parsed)} allocation={raw_revs}")
        else:
            print(f"SPLIT: status=INVALID reason=SUM_MUST_BE_100 current_sum={total_pct}")
            
    elif cmd == 'ROUTE_REQUEST':
        req_id = params.get('req_id', '')
        bucket = sum(ord(c) for c in req_id) % 100
        chosen = None
        cumul = 0
        for r_name, p_val in parsed:
            cumul += p_val
            if bucket < cumul:
                chosen = r_name
                break
        if not chosen and parsed:
            chosen = parsed[-1][0]
        print(f"ROUTE: req_id={req_id} bucket={bucket} target_revision={chosen}")
`
  }
];
