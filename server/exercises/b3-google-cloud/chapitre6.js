/**
 * Exercices du Chapitre 6 : Observabilité (Operations Suite), FinOps & Infrastructure as Code (Terraform).
 * Préfixe : gcp3-c6-e
 */
'use strict';

module.exports = [
  {
    id: 'gcp3-c6-e1',
    chapter: 6,
    title: 'Interpréteur de Filtres Cloud Logging et Détection d\'Incidents',
    level: 'n1',
    language: 'python',
    goal: 'Filtrer des flux d\'événements Google Cloud Logging selon le type de ressource et le niveau de sévérité.',
    brief: `<p>Google Cloud Logging structure les événements avec un type de ressource et un niveau de gravité :<br>
Hiérarchie des sévérités :<br>
<code>DEBUG (0) &lt; INFO (1) &lt; NOTICE (2) &lt; WARNING (3) &lt; ERROR (4) &lt; CRITICAL (5)</code>.<br><br>
Format d'un log : <code>resource_type:severity:message</code> (ex: <code>gce_instance:ERROR:Disk quota exceeded</code>).<br><br>
Commande STDIN :<br>
<code>LOG_QUERY target_resource=&lt;res&gt; min_severity=&lt;sev&gt; logs=&lt;log1;log2;...&gt;</code>.<br>
Sortie :<br>
<code>LOG_RESULTS: resource=&lt;res&gt; min_sev=&lt;sev&gt; total=&lt;T&gt; matched=&lt;M&gt; critical_count=&lt;C&gt;</code>.</p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : implémenter le filtrage Cloud Logging
`,
    hints: [
      'Créez un dictionnaire associant chaque sévérité à son niveau numérique (DEBUG=0 ... CRITICAL=5).',
      'Un log correspond si log_resource == target_resource et log_sev_level >= min_sev_level.'
    ],
    examples: [
      {
        stdin: 'LOG_QUERY target_resource=gce_instance min_severity=WARNING logs=gce_instance:INFO:Boot ok;gce_instance:ERROR:Disk full;cloud_run:ERROR:Timeout;gce_instance:CRITICAL:Kernel panic',
        expected: 'LOG_RESULTS: resource=gce_instance min_sev=WARNING total=4 matched=2 critical_count=1',
        note: '2 logs GCE correspondent avec sévérité >= WARNING dont 1 critique.'
      }
    ],
    tests: [
      {
        label: 'Filtrage ne retenant aucun log correspondant',
        stdin: 'LOG_QUERY target_resource=cloud_run min_severity=ERROR logs=gce_instance:ERROR:Crash;cloud_run:INFO:Deploy success',
        expected: 'LOG_RESULTS: resource=cloud_run min_sev=ERROR total=2 matched=0 critical_count=0'
      },
      {
        label: 'Tous les logs correspondent pour sévérité minimale DEBUG',
        stdin: 'LOG_QUERY target_resource=gke_cluster min_severity=DEBUG logs=gke_cluster:DEBUG:Pod init;gke_cluster:INFO:Pod scheduled;gke_cluster:CRITICAL:Node down',
        expected: 'LOG_RESULTS: resource=gke_cluster min_sev=DEBUG total=3 matched=3 critical_count=1'
      }
    ],
    solution: `import sys

sev_levels = {
    'DEBUG': 0,
    'INFO': 1,
    'NOTICE': 2,
    'WARNING': 3,
    'ERROR': 4,
    'CRITICAL': 5
}

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for line in lignes:
    if 'logs=' in line:
        before_logs, raw_logs = line.split('logs=', 1)
    else:
        before_logs, raw_logs = line, ''

    params = {}
    for p in before_logs.strip().split():
        if '=' in p:
            k, v = p.split('=', 1)
            params[k] = v
            
    res_target = params.get('target_resource', '')
    min_sev_str = params.get('min_severity', '').upper()
    min_lvl = sev_levels.get(min_sev_str, 0)
    
    log_list = [l.strip() for l in raw_logs.split(';') if l.strip()]
    
    matched = 0
    crit_count = 0
    
    for l_entry in log_list:
        parts = l_entry.split(':', 2)
        if len(parts) >= 2:
            r_type, s_str = parts[0], parts[1].upper()
            s_lvl = sev_levels.get(s_str, 0)
            if r_type == res_target and s_lvl >= min_lvl:
                matched += 1
                if s_str == 'CRITICAL':
                    crit_count += 1
                    
    print(f"LOG_RESULTS: resource={res_target} min_sev={min_sev_str} total={len(log_list)} matched={matched} critical_count={crit_count}")
`
  },
  {
    id: 'gcp3-c6-e2',
    chapter: 6,
    title: 'Moteur d\'Alertes Budgétaires et Optimisation FinOps (CUD & SUD)',
    level: 'n2',
    language: 'python',
    goal: 'Calculer le coût net remisé avec les remises d\'engagement (CUD) et générer des alertes de budget GCP.',
    brief: `<p>Google Cloud propose deux mécanismes majeurs de réduction tarifaire Compute Engine :<br>
- <code>CUD (Committed Use Discount)</code> : engagement d'1 an (-37%) ou 3 ans (-55%).<br>
- <code>SUD (Sustained Use Discount)</code> : réduction automatique jusqu'à -20% si exécuté 100% du mois sans engagement.<br><br>
Règles de calcul (non cumulables, CUD prioritaire) :<br>
- Si <code>commit_years == 3</code> : <code>discount = 0.55</code>.<br>
- Sinon si <code>commit_years == 1</code> : <code>discount = 0.37</code>.<br>
- Sinon (commit_years == 0) : si <code>runtime_pct == 100</code> : <code>discount = 0.20</code> ; sinon <code>discount = 0.00</code>.<br><br>
Coût net : <code>net_cost = base_cost * (1 - discount)</code>.<br>
Alerte budgétaire face au seuil de référence :<br>
- Si <code>net_cost &gt; budget</code> : <code>alert=BUDGET_EXCEEDED</code><br>
- Si <code>net_cost &gt;= 0.90 * budget</code> : <code>alert=WARNING_90_PCT</code><br>
- Sinon : <code>alert=OK</code><br><br>
Commande STDIN : <code>FINOPS_EVAL base_cost=&lt;cost&gt; runtime_pct=&lt;pct&gt; commit_years=&lt;0|1|3&gt; budget=&lt;budget&gt;</code>.<br>
Sortie : <code>FINOPS: base=&lt;cost&gt; discount_pct=&lt;pct&gt; net_cost=&lt;net:.2f&gt; budget=&lt;budget&gt; alert=&lt;alert&gt;</code>.</p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : implémenter le calculateur FinOps CUD/SUD
`,
    hints: [
      'Calculez discount_pct (55, 37, 20 ou 0).',
      'Calculez net_cost = base * (1.0 - discount_pct / 100.0).',
      'Vérifiez net_cost > budget, puis net_cost >= 0.90 * budget, sinon OK.'
    ],
    examples: [
      {
        stdin: 'FINOPS_EVAL base_cost=1000 runtime_pct=100 commit_years=3 budget=600',
        expected: 'FINOPS: base=1000 discount_pct=55 net_cost=450.00 budget=600 alert=OK',
        note: 'Engagement 3 ans apportant 55% de remise : coût net de 450$ sous le budget de 600$.'
      }
    ],
    tests: [
      {
        label: 'Alerte dépassement de budget',
        stdin: 'FINOPS_EVAL base_cost=2000 runtime_pct=50 commit_years=0 budget=1500',
        expected: 'FINOPS: base=2000 discount_pct=0 net_cost=2000.00 budget=1500 alert=BUDGET_EXCEEDED'
      },
      {
        label: 'Alerte seuil 90% du budget atteint',
        stdin: 'FINOPS_EVAL base_cost=1000 runtime_pct=100 commit_years=1 budget=650',
        expected: 'FINOPS: base=1000 discount_pct=37 net_cost=630.00 budget=650 alert=WARNING_90_PCT'
      },
      {
        label: 'Remise automatique SUD sans engagement',
        stdin: 'FINOPS_EVAL base_cost=500 runtime_pct=100 commit_years=0 budget=450',
        expected: 'FINOPS: base=500 discount_pct=20 net_cost=400.00 budget=450 alert=OK'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for line in lignes:
    params = {}
    for p in line.strip().split():
        if '=' in p:
            k, v = p.split('=', 1)
            params[k] = v
            
    base = float(params['base_cost'])
    runtime = int(params['runtime_pct'])
    commits = int(params['commit_years'])
    budget = float(params['budget'])
    
    if commits == 3:
        disc = 55
    elif commits == 1:
        disc = 37
    elif runtime == 100:
        disc = 20
    else:
        disc = 0
        
    net = base * (1.0 - disc / 100.0)
    
    if net > budget:
        alert = 'BUDGET_EXCEEDED'
    elif net >= 0.90 * budget:
        alert = 'WARNING_90_PCT'
    else:
        alert = 'OK'
        
    print(f"FINOPS: base={int(base)} discount_pct={disc} net_cost={net:.2f} budget={int(budget)} alert={alert}")
`
  },
  {
    id: 'gcp3-c6-e3',
    chapter: 6,
    title: 'Linter et Validateur de Manifeste Terraform pour GCP',
    level: 'n3',
    language: 'python',
    goal: 'Auditer un extrait de code Terraform HCL pour Google Cloud et détecter les mauvaises pratiques de sécurité.',
    brief: `<p>Terraform automatise le déploiement déclaratif de ressources Google Cloud.<br><br>
Règles d'audit de sécurité et de conformité :<br>
1. <code>HARDCODED_SECRETS</code> : le code ne doit jamais contenir <code>credentials = file(...)</code> ou de chaînes de clé privée (utiliser Application Default Credentials ou Workload Identity).<br>
2. <code>MISSING_PROJECT</code> : toute ressource doit hériter d'un projet explicite ou du bloc provider.<br>
3. <code>OPEN_FIREWALL</code> : une règle pare-feu autorisant <code>0.0.0.0/0</code> sur le port <code>22</code> (SSH) ou <code>3389</code> (RDP) doit être rejetée.<br><br>
Commande STDIN : <code>TF_LINT res_type=&lt;type&gt; res_name=&lt;nom&gt; props=&lt;k1:v1,k2:v2,...&gt;</code>.<br>
Sorties :<br>
- Si valide : <code>TF_AUDIT: resource=&lt;type&gt;.&lt;name&gt; status=VALID_HCL security=COMPLIANT</code><br>
- Si secret en dur : <code>TF_AUDIT: resource=&lt;type&gt;.&lt;name&gt; status=REJECTED reason=HARDCODED_SECRETS</code><br>
- Si pare-feu trop ouvert : <code>TF_AUDIT: resource=&lt;type&gt;.&lt;name&gt; status=REJECTED reason=OPEN_INGRESS_MANAGEMENT_PORT port=&lt;p&gt;</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : implémenter le linter Terraform pour GCP
`,
    hints: [
      'Analysez chaque couple cle:valeur dans props.',
      'Si cle == "credentials" ou "file(" dans valeur -> HARDCODED_SECRETS.',
      'Si source_ranges == "0.0.0.0/0" et port in ("22", "3389") -> OPEN_INGRESS_MANAGEMENT_PORT.'
    ],
    examples: [
      {
        stdin: 'TF_LINT res_type=google_compute_instance res_name=web_vm props=machine_type:e2-medium,zone:europe-west9-a',
        expected: 'TF_AUDIT: resource=google_compute_instance.web_vm status=VALID_HCL security=COMPLIANT',
        note: 'Ressource Compute Engine Terraform valide et conforme.'
      }
    ],
    tests: [
      {
        label: 'Rejet clé de compte de service en dur dans le manifeste',
        stdin: 'TF_LINT res_type=provider res_name=google props=credentials:file(sa-key.json),project:demo-corp',
        expected: 'TF_AUDIT: resource=provider.google status=REJECTED reason=HARDCODED_SECRETS'
      },
      {
        label: 'Rejet règle de pare-feu ouvrant SSH 0.0.0.0/0 à tout Internet',
        stdin: 'TF_LINT res_type=google_compute_firewall res_name=allow_ssh props=source_ranges:0.0.0.0/0,ports:22',
        expected: 'TF_AUDIT: resource=google_compute_firewall.allow_ssh status=REJECTED reason=OPEN_INGRESS_MANAGEMENT_PORT port=22'
      },
      {
        label: 'Rejet règle pare-feu ouvrant RDP 3389 à tout Internet',
        stdin: 'TF_LINT res_type=google_compute_firewall res_name=allow_rdp props=source_ranges:0.0.0.0/0,ports:3389',
        expected: 'TF_AUDIT: resource=google_compute_firewall.allow_rdp status=REJECTED reason=OPEN_INGRESS_MANAGEMENT_PORT port=3389'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for line in lignes:
    params = {}
    for p in line.strip().split():
        if '=' in p:
            k, v = p.split('=', 1)
            params[k] = v
            
    r_type = params.get('res_type', '')
    r_name = params.get('res_name', '')
    raw_props = params.get('props', '')
    
    props = {}
    for prop in raw_props.split(','):
        if ':' in prop:
            pk, pv = prop.split(':', 1)
            props[pk.strip()] = pv.strip()
            
    res_label = f"{r_type}.{r_name}"
    
    # Check secrets
    has_hardcoded_secrets = False
    for pk, pv in props.items():
        if pk == 'credentials' or 'file(' in pv:
            has_hardcoded_secrets = True
            break
            
    if has_hardcoded_secrets:
        print(f"TF_AUDIT: resource={res_label} status=REJECTED reason=HARDCODED_SECRETS")
        continue
        
    # Check open firewall
    src_range = props.get('source_ranges', '')
    port = props.get('ports', '')
    if src_range == '0.0.0.0/0' and port in ('22', '3389'):
        print(f"TF_AUDIT: resource={res_label} status=REJECTED reason=OPEN_INGRESS_MANAGEMENT_PORT port={port}")
        continue
        
    print(f"TF_AUDIT: resource={res_label} status=VALID_HCL security=COMPLIANT")
`
  }
];
