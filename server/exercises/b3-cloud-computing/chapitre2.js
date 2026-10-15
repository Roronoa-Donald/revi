/**
 * Exercices du chapitre 2 — Cloud Computing B3.
 * Plateformes Cloud & Architectures Haute Disponibilité (SLA, Multi-Cloud).
 */
'use strict';

module.exports = [
  {
    id: 'cc3-c2-e1',
    chapter: 2,
    title: 'Cartographe d’équivalences de services CSP (AWS, Azure, GCP)',
    level: 'n1',
    language: 'python',
    goal: 'Associer les dénominations commerciales des services entre les trois géants hyperscalers selon leur catégorie fonctionnelle.',
    brief: '<p>Le script lit sur l\'entrée standard des requêtes au format :<br>\n<code>MAPPING csp_src=&lt;AWS|Azure|GCP&gt; csp_dst=&lt;AWS|Azure|GCP&gt; service=&lt;nom&gt;</code>.<br>\nCatalogue officiel de correspondance :<br>\n- <code>COMPUTE</code> : AWS=<code>EC2</code>, Azure=<code>Virtual_Machines</code>, GCP=<code>Compute_Engine</code><br>\n- <code>STORAGE</code> : AWS=<code>S3</code>, Azure=<code>Blob_Storage</code>, GCP=<code>Cloud_Storage</code><br>\n- <code>RELATIONAL_DB</code> : AWS=<code>RDS</code>, Azure=<code>Azure_SQL</code>, GCP=<code>Cloud_SQL</code><br>\n- <code>SERVERLESS</code> : AWS=<code>Lambda</code>, Azure=<code>Azure_Functions</code>, GCP=<code>Cloud_Functions</code><br>\n- <code>CONTAINER_ORCH</code> : AWS=<code>EKS</code>, Azure=<code>AKS</code>, GCP=<code>GKE</code><br>\n- <code>MESSAGING</code> : AWS=<code>SQS</code>, Azure=<code>Service_Bus</code>, GCP=<code>Cloud_PubSub</code><br><br>\nSi le service source est répertorié :<br>\n<code>EQUIVALENCE: &lt;csp_src&gt;:&lt;service&gt; -&gt; &lt;csp_dst&gt;:&lt;nom_dst&gt; (CATEGORIE=&lt;CAT&gt;)</code><br>\nSinon :<br>\n<code>EQUIVALENCE: &lt;csp_src&gt;:&lt;service&gt; -&gt; INCONNU</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : mapper les services entre hyperscalers
`,
    hints: [
      'Stocker le tableau sous forme d’un dictionnaire indexé par catégorie.',
      'Comparer les noms de manière exacte (sensible à la casse).'
    ],
    examples: [
      {
        stdin: 'MAPPING csp_src=AWS csp_dst=GCP service=S3\nMAPPING csp_src=Azure csp_dst=AWS service=Virtual_Machines\nMAPPING csp_src=AWS csp_dst=Azure service=OpenSearch',
        expected: 'EQUIVALENCE: AWS:S3 -> GCP:Cloud_Storage (CATEGORIE=STORAGE)\nEQUIVALENCE: Azure:Virtual_Machines -> AWS:EC2 (CATEGORIE=COMPUTE)\nEQUIVALENCE: AWS:OpenSearch -> INCONNU',
        note: 'S3 correspond à Cloud Storage sous GCP, et Virtual Machines à EC2 sous AWS.'
      }
    ],
    tests: [
      {
        label: 'Fonctions Serverless AWS vers Azure',
        stdin: 'MAPPING csp_src=AWS csp_dst=Azure service=Lambda',
        expected: 'EQUIVALENCE: AWS:Lambda -> Azure:Azure_Functions (CATEGORIE=SERVERLESS)'
      },
      {
        label: 'Kubernetes managé GCP vers AWS',
        stdin: 'MAPPING csp_src=GCP csp_dst=AWS service=GKE',
        expected: 'EQUIVALENCE: GCP:GKE -> AWS:EKS (CATEGORIE=CONTAINER_ORCH)'
      },
      {
        label: 'Base de données managée Azure vers GCP',
        stdin: 'MAPPING csp_src=Azure csp_dst=GCP service=Azure_SQL',
        expected: 'EQUIVALENCE: Azure:Azure_SQL -> GCP:Cloud_SQL (CATEGORIE=RELATIONAL_DB)'
      }
    ],
    solution: `import sys
import re

CATALOGUE = {
    'COMPUTE': {'AWS': 'EC2', 'Azure': 'Virtual_Machines', 'GCP': 'Compute_Engine'},
    'STORAGE': {'AWS': 'S3', 'Azure': 'Blob_Storage', 'GCP': 'Cloud_Storage'},
    'RELATIONAL_DB': {'AWS': 'RDS', 'Azure': 'Azure_SQL', 'GCP': 'Cloud_SQL'},
    'SERVERLESS': {'AWS': 'Lambda', 'Azure': 'Azure_Functions', 'GCP': 'Cloud_Functions'},
    'CONTAINER_ORCH': {'AWS': 'EKS', 'Azure': 'AKS', 'GCP': 'GKE'},
    'MESSAGING': {'AWS': 'SQS', 'Azure': 'Service_Bus', 'GCP': 'Cloud_PubSub'}
}

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    m = re.search(r'csp_src=([^\\s]+).*?csp_dst=([^\\s]+).*?service=([^\\s]+)', lig)
    if not m:
        continue
    src, dst, serv = m.group(1), m.group(2), m.group(3)
    
    trouve = False
    for cat, mappings in CATALOGUE.items():
        if mappings.get(src) == serv:
            dst_serv = mappings.get(dst, 'INCONNU')
            print(f"EQUIVALENCE: {src}:{serv} -> {dst}:{dst_serv} (CATEGORIE={cat})")
            trouve = True
            break
    if not trouve:
        print(f"EQUIVALENCE: {src}:{serv} -> INCONNU")
`
  },
  {
    id: 'cc3-c2-e2',
    chapter: 2,
    title: 'Calculateur de SLA composé et budget d’erreur annuel',
    level: 'n2',
    language: 'python',
    goal: 'Calculer la disponibilité globale résultante d’une chaîne de services Cloud (série) ou de composants redondés (parallèle) et son indisponibilité annuelle.',
    brief: '<p>Le script lit sur l\'entrée standard des déclarations :<br>\n<code>CALCUL_SLA MODE=&lt;SERIE|PARALLELE&gt; SLAS=&lt;s1,s2,...&gt;</code>.<br>\nChaque SLA est exprimé en pourcentage (ex: <code>99.9,99.95</code>), converti en décimal $p_i = s_i / 100$.<br>\nFormules :<br>\n- <strong>SERIE</strong> (chaîne de dépendances directes) : $P_{total} = \\prod_{i} p_i$<br>\n- <strong>PARALLELE</strong> (redondance active / bascule automatique) : $P_{total} = 1 - \\prod_{i} (1 - p_i)$<br><br>\nCalcul de l’indisponibilité annuelle (base 365 jours = 525 600 minutes) :<br>\n$Downtime = 525600 \\times (1 - P_{total})$ (en minutes).<br>\nAfficher :<br>\n<code>SLA: MODE=&lt;MODE&gt; -&gt; DISPONIBILITE=&lt;pct:.4f&gt;% | INDISPONIBILITE=&lt;downtime:.2f&gt; min/an</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer le SLA composé et l'indisponibilité
`,
    hints: [
      'En série, le SLA global est toujours STRICTEMENT INFÉRIEUR au plus faible SLA unitaire.',
      'En parallèle, la redondance réduit drastiquement la probabilité de panne simultanée.'
    ],
    examples: [
      {
        stdin: 'CALCUL_SLA MODE=SERIE SLAS=99.9,99.95\nCALCUL_SLA MODE=PARALLELE SLAS=99.9,99.9',
        expected: 'SLA: MODE=SERIE -> DISPONIBILITE=99.8501% | INDISPONIBILITE=788.14 min/an\nSLA: MODE=PARALLELE -> DISPONIBILITE=99.9999% | INDISPONIBILITE=0.53 min/an',
        note: 'Une chaîne en série de deux services 3 neufs et 3.5 neufs tombe à 99.85%. Deux VM à 99.9% en parallèle montent à 99.9999% (moins d\'une minute d\'interruption).'
      }
    ],
    tests: [
      {
        label: 'Chaîne trois tiers Web-App-BDD en série',
        stdin: 'CALCUL_SLA MODE=SERIE SLAS=99.95,99.9,99.99',
        expected: 'SLA: MODE=SERIE -> DISPONIBILITE=99.8401% | INDISPONIBILITE=840.62 min/an'
      },
      {
        label: 'Deux passerelles API redondées en parallèle',
        stdin: 'CALCUL_SLA MODE=PARALLELE SLAS=99.95,99.95',
        expected: 'SLA: MODE=PARALLELE -> DISPONIBILITE=100.0000% | INDISPONIBILITE=0.13 min/an'
      },
      {
        label: 'Composant unique',
        stdin: 'CALCUL_SLA MODE=SERIE SLAS=99.99',
        expected: 'SLA: MODE=SERIE -> DISPONIBILITE=99.9900% | INDISPONIBILITE=52.56 min/an'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    m = re.search(r'MODE=([^\\s]+).*?SLAS=([^\\s]+)', lig)
    if not m:
        continue
    mode = m.group(1)
    slas = [float(x) / 100.0 for x in m.group(2).split(',')]
    
    if mode == 'SERIE':
        p_tot = 1.0
        for p in slas:
            p_tot *= p
    else:  # PARALLELE
        p_fail = 1.0
        for p in slas:
            p_fail *= (1.0 - p)
        p_tot = 1.0 - p_fail
        
    pct = p_tot * 100.0
    downtime_min = 525600.0 * (1.0 - p_tot)
    print(f"SLA: MODE={mode} -> DISPONIBILITE={pct:.4f}% | INDISPONIBILITE={downtime_min:.2f} min/an")
`
  },
  {
    id: 'cc3-c2-e3',
    chapter: 2,
    title: 'Simulateur de passerelle multi-cloud et routage dynamique',
    level: 'n3',
    language: 'python',
    goal: 'Aiguiller dynamiquement les flux applicatifs vers le meilleur point de terminaison Cloud sain selon la stratégie opérationnelle choisie.',
    brief: '<p>Le script enregistre d\'abord une série d\'endpoints, puis évalue les ordres de routage :<br>\n<code>ENDPOINT csp=&lt;nom&gt; latence=&lt;ms&gt; sante=&lt;UP|DOWN&gt; cout=&lt;usd&gt;</code><br>\n<code>ROUTE strategie=&lt;MIN_LATENCY|MIN_COST|FAILOVER&gt;</code>.<br><br>\nSeuls les endpoints avec <code>sante=UP</code> sont éligibles.<br>\nStratégies :<br>\n- <code>MIN_LATENCY</code> : l’endpoint sain avec la latence la plus faible. En cas d’égalité, départager par le coût le plus faible, puis l’ordre d’apparition.<br>\n- <code>MIN_COST</code> : l’endpoint sain avec le coût le plus faible. En cas d’égalité, départager par la latence la plus faible, puis l’ordre d’apparition.<br>\n- <code>FAILOVER</code> : choisir le premier endpoint sain rencontré dans l\'ordre de déclaration.<br><br>\nAfficher :<br>\n<code>ROUTAGE: STRATEGIE=&lt;strat&gt; -&gt; CSP_CHOISI=&lt;csp&gt; (latence=&lt;ms&gt;ms, cout=$&lt;cout:.4f&gt;)</code><br>\nOu si aucun endpoint n’est UP :<br>\n<code>ROUTAGE: STRATEGIE=&lt;strat&gt; -&gt; AUCUN_ENDPOINT_DISPONIBLE</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : enregistrer les endpoints et simuler le routage dynamique
`,
    hints: [
      'Garder la liste ordonnée des déclarations d’endpoints.',
      'Filtrer impérativement les hôtes DOWN avant d\'appliquer la stratégie.'
    ],
    examples: [
      {
        stdin: 'ENDPOINT csp=AWS_eu_west latence=28 sante=UP cout=0.0040\nENDPOINT csp=GCP_europe latence=19 sante=UP cout=0.0065\nENDPOINT csp=Azure_fr latence=15 sante=DOWN cout=0.0035\nROUTE strategie=MIN_LATENCY\nROUTE strategie=MIN_COST\nROUTE strategie=FAILOVER',
        expected: 'ROUTAGE: STRATEGIE=MIN_LATENCY -> CSP_CHOISI=GCP_europe (latence=19ms, cout=$0.0065)\nROUTAGE: STRATEGIE=MIN_COST -> CSP_CHOISI=AWS_eu_west (latence=28ms, cout=$0.0040)\nROUTAGE: STRATEGIE=FAILOVER -> CSP_CHOISI=AWS_eu_west (latence=28ms, cout=$0.0040)',
        note: 'Azure_fr est ignoré car en état DOWN. GCP l\'emporte en latence, AWS en coût.'
      }
    ],
    tests: [
      {
        label: 'Basculement après panne du nœud primaire',
        stdin: 'ENDPOINT csp=AWS_primary latence=10 sante=DOWN cout=0.0020\nENDPOINT csp=Azure_backup latence=25 sante=UP cout=0.0025\nROUTE strategie=FAILOVER',
        expected: 'ROUTAGE: STRATEGIE=FAILOVER -> CSP_CHOISI=Azure_backup (latence=25ms, cout=$0.0025)'
      },
      {
        label: 'Tous les nœuds hors service',
        stdin: 'ENDPOINT csp=AWS_dc1 latence=12 sante=DOWN cout=0.0020\nENDPOINT csp=GCP_dc2 latence=18 sante=DOWN cout=0.0030\nROUTE strategie=MIN_LATENCY',
        expected: 'ROUTAGE: STRATEGIE=MIN_LATENCY -> AUCUN_ENDPOINT_DISPONIBLE'
      },
      {
        label: 'Égalité de latence résolue par le coût',
        stdin: 'ENDPOINT csp=CSP_A latence=20 sante=UP cout=0.0050\nENDPOINT csp=CSP_B latence=20 sante=UP cout=0.0030\nROUTE strategie=MIN_LATENCY',
        expected: 'ROUTAGE: STRATEGIE=MIN_LATENCY -> CSP_CHOISI=CSP_B (latence=20ms, cout=$0.0030)'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

endpoints = []

for lig in lignes:
    if lig.startswith('ENDPOINT'):
        m = re.search(r'csp=([^\\s]+).*?latence=(\\d+).*?sante=([^\\s]+).*?cout=([0-9.]+)', lig)
        if m:
            endpoints.append({
                'csp': m.group(1),
                'latence': int(m.group(2)),
                'sante': m.group(3),
                'cout': float(m.group(4)),
                'idx': len(endpoints)
            })
    elif lig.startswith('ROUTE'):
        m = re.search(r'strategie=([^\\s]+)', lig)
        if not m:
            continue
        strat = m.group(1)
        up_nodes = [ep for ep in endpoints if ep['sante'] == 'UP']
        
        if not up_nodes:
            print(f"ROUTAGE: STRATEGIE={strat} -> AUCUN_ENDPOINT_DISPONIBLE")
            continue
            
        choisi = None
        if strat == 'MIN_LATENCY':
            choisi = min(up_nodes, key=lambda x: (x['latence'], x['cout'], x['idx']))
        elif strat == 'MIN_COST':
            choisi = min(up_nodes, key=lambda x: (x['cout'], x['latence'], x['idx']))
        elif strat == 'FAILOVER':
            choisi = min(up_nodes, key=lambda x: x['idx'])
            
        if choisi:
            print(f"ROUTAGE: STRATEGIE={strat} -> CSP_CHOISI={choisi['csp']} (latence={choisi['latence']}ms, cout=\${choisi['cout']:.4f})")
`
  }
];
