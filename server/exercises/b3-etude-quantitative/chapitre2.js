/**
 * Exercices Chapitre 2 — Étude Quantitative & Qualitative B3.
 * Théorie de l’Échantillonnage & Dimensionnement Statistique.
 */
'use strict';

module.exports = [
  {
    id: 'eq3-c2-e1',
    chapter: 2,
    title: 'Calculateur de taille d’échantillon probabiliste (Formule de Cochran)',
    level: 'n1',
    language: 'python',
    goal: 'Calculer la taille minimale d’échantillon requise selon le niveau de confiance, la marge d’erreur et la taille de population.',
    brief: '<p>Le script lit sur l\'entrée standard :<br>\n<code>COCHRAN etude=&lt;nom&gt; confiance=&lt;90|95|99&gt; erreur=&lt;pct_erreur&gt; p=&lt;proportion&gt; [N=&lt;taille_pop&gt;]</code>.<br><br>\nParamètres statistiques :<br>\n- Coefficient $z$ selon le niveau de confiance :<br>\n  - 90% : $z = 1.645$<br>\n  - 95% : $z = 1.96$<br>\n  - 99% : $z = 2.576$<br>\n- Marge d\'erreur $e = \\text{erreur} / 100.0$ (ex: erreur=5 -&gt; $e = 0.05$).<br>\n- Proportion attendue $p$ (ex: 0.5 pour variabilité maximale).<br><br>\nFormule de Cochran (population infinie) :<br>\n$$n_0 = \\frac{z^2 \\cdot p \\cdot (1 - p)}{e^2}$$<br>\nCorrection pour population finie (si $N$ est spécifié et $N &gt; 0$) :<br>\n$$n = \\frac{n_0}{1 + \\frac{n_0 - 1}{N}}$$<br>\nSinon $n = n_0$.<br>\nLa taille requise est arrondie à l\'entier supérieur : $n_{final} = \\lceil n \\rceil$ (via <code>math.ceil</code>).<br><br>\nAfficher :<br>\n<code>ECHANTILLON: {etude} -> N_POP={N_ou_INFINI} | CONFIANCE={confiance}% ERREUR={erreur}% | TAILLE_REQUISE={n_final}</code></p>',
    starter: `import sys
import math

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer la taille d'échantillon par la formule de Cochran
`,
    hints: [
      'Gérer N comme optionnel (INFINI si absent ou égal à 0).',
      'Appliquer math.ceil sur le résultat final.'
    ],
    examples: [
      {
        stdin: 'COCHRAN etude=SondageNational confiance=95 erreur=5.0 p=0.5',
        expected: 'ECHANTILLON: SondageNational -> N_POP=INFINI | CONFIANCE=95% ERREUR=5.0% | TAILLE_REQUISE=385',
        note: 'Cas classique : confiance 95% et marge d’erreur 5% donne n0 = 384.16 -> 385 répondants.'
      }
    ],
    tests: [
      {
        label: 'Population finie N=1000 avec correction',
        stdin: 'COCHRAN etude=EnqueteEntreprise confiance=95 erreur=5.0 p=0.5 N=1000',
        expected: 'ECHANTILLON: EnqueteEntreprise -> N_POP=1000 | CONFIANCE=95% ERREUR=5.0% | TAILLE_REQUISE=278'
      },
      {
        label: 'Haute précision 99% avec erreur 3%',
        stdin: 'COCHRAN etude=ControleQualite confiance=99 erreur=3.0 p=0.5 N=5000',
        expected: 'ECHANTILLON: ControleQualite -> N_POP=5000 | CONFIANCE=99% ERREUR=3.0% | TAILLE_REQUISE=1347'
      },
      {
        label: 'Niveau 90% avec forte proportion connue p=0.8',
        stdin: 'COCHRAN etude=UsageMobile confiance=90 erreur=4.0 p=0.8',
        expected: 'ECHANTILLON: UsageMobile -> N_POP=INFINI | CONFIANCE=90% ERREUR=4.0% | TAILLE_REQUISE=271'
      }
    ],
    solution: `import sys
import math
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

Z_TABLE = {
    '90': 1.645,
    '95': 1.96,
    '99': 2.576
}

for lig in lignes:
    m_etude = re.search(r'etude=([^\\s]+)', lig)
    m_conf = re.search(r'confiance=([^\\s]+)', lig)
    m_err = re.search(r'erreur=([^\\s]+)', lig)
    m_p = re.search(r'p=([^\\s]+)', lig)
    m_N = re.search(r'\\bN=(\\d+)', lig)
    
    if not (m_etude and m_conf and m_err and m_p):
        continue
        
    etude = m_etude.group(1)
    conf = m_conf.group(1)
    err_pct = float(m_err.group(1))
    p = float(m_p.group(1))
    
    z = Z_TABLE.get(conf, 1.96)
    e = err_pct / 100.0
    
    n0 = (z**2 * p * (1.0 - p)) / (e**2)
    
    if m_N and int(m_N.group(1)) > 0:
        N = int(m_N.group(1))
        n_corr = n0 / (1.0 + (n0 - 1.0) / N)
        pop_str = str(N)
    else:
        n_corr = n0
        pop_str = 'INFINI'
        
    n_final = math.ceil(n_corr)
    
    print(f"ECHANTILLON: {etude} -> N_POP={pop_str} | CONFIANCE={conf}% ERREUR={err_pct:.1f}% | TAILLE_REQUISE={n_final}")
`
  },
  {
    id: 'eq3-c2-e2',
    chapter: 2,
    title: 'Échantillonnage stratifié proportionnel',
    level: 'n2',
    language: 'python',
    goal: 'Calculer la ventilation exacte des quotas de sondage par sous-population selon leur poids démographique réel.',
    brief: '<p>Le script lit sur l\'entrée standard :<br>\n<code>STRATIFIE etude=&lt;nom&gt; n=&lt;taille_echantillon&gt; strates=&lt;NOM1&gt;:&lt;N1&gt;,&lt;NOM2&gt;:&lt;N2&gt;,...</code>.<br><br>\nCalculs :<br>\n- Calculer la population totale mère : $N = \\sum N_i$.<br>\n- Pour chaque strate $i$ :<br>\n  - Poids relatif : $W_i = N_i / N$.<br>\n  - Effectif théorique à sonder : $n_i = \\text{round}(n \\times W_i)$.<br>\n  - Pourcentage dans l\'échantillon : $P_i = (n_i / n) \\times 100$ (1 décimale).<br><br>\nAfficher :<br>\n<code>STRATIFICATION: {etude} (N_TOTAL={N}, n_CIBLE={n})</code><br>\nPour chaque strate dans l\'ordre d\'apparition :<br>\n<code>  - {NOM_i}: N_pop={N_i} (W={W_i*100:.1f}%) -> n_sonde={n_i} ({P_i:.1f}%)</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer la répartition d'échantillonnage stratifié proportionnel
`,
    hints: [
      'Sommer tous les Ni pour obtenir la population mère totale N.',
      'Utiliser round() pour arrondir chaque effectif à sonder.'
    ],
    examples: [
      {
        stdin: 'STRATIFIE etude=SondageDSI n=200 strates=DEV:400,OPS:300,QA:200,DIR:100',
        expected: `STRATIFICATION: SondageDSI (N_TOTAL=1000, n_CIBLE=200)
  - DEV: N_pop=400 (W=40.0%) -> n_sonde=80 (40.0%)
  - OPS: N_pop=300 (W=30.0%) -> n_sonde=60 (30.0%)
  - QA: N_pop=200 (W=20.0%) -> n_sonde=40 (20.0%)
  - DIR: N_pop=100 (W=10.0%) -> n_sonde=20 (10.0%)`,
        note: 'La répartition est rigoureusement proportionnelle au poids de chaque strate.'
      }
    ],
    tests: [
      {
        label: 'Échantillonnage universitaire sur 3 facultés',
        stdin: 'STRATIFIE etude=CampusTech n=150 strates=INFO:600,RESEAUX:300,CYBER:100',
        expected: `STRATIFICATION: CampusTech (N_TOTAL=1000, n_CIBLE=150)
  - INFO: N_pop=600 (W=60.0%) -> n_sonde=90 (60.0%)
  - RESEAUX: N_pop=300 (W=30.0%) -> n_sonde=45 (30.0%)
  - CYBER: N_pop=100 (W=10.0%) -> n_sonde=15 (10.0%)`
      },
      {
        label: 'Échantillon médical avec effectifs variés',
        stdin: 'STRATIFIE etude=PersonnelSante n=100 strates=MEDECINS:50,INFIRMIERS:350,AIDES:600',
        expected: `STRATIFICATION: PersonnelSante (N_TOTAL=1000, n_CIBLE=100)
  - MEDECINS: N_pop=50 (W=5.0%) -> n_sonde=5 (5.0%)
  - INFIRMIERS: N_pop=350 (W=35.0%) -> n_sonde=35 (35.0%)
  - AIDES: N_pop=600 (W=60.0%) -> n_sonde=60 (60.0%)`
      },
      {
        label: 'Deux strates équilibrées',
        stdin: 'STRATIFIE etude=PariteEquipe n=80 strates=FEMMES:250,HOMMES:250',
        expected: `STRATIFICATION: PariteEquipe (N_TOTAL=500, n_CIBLE=80)
  - FEMMES: N_pop=250 (W=50.0%) -> n_sonde=40 (50.0%)
  - HOMMES: N_pop=250 (W=50.0%) -> n_sonde=40 (50.0%)`
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    m = re.search(r'etude=([^\\s]+)\\s+n=(\\d+)\\s+strates=([^\\s]+)', lig)
    if not m:
        continue
    etude, n_str, strats_str = m.groups()
    n = int(n_str)
    
    strats = []
    for item in strats_str.split(','):
        if ':' in item:
            k, v = item.split(':')
            strats.append((k.strip(), int(v.strip())))
            
    total_N = sum(v for _, v in strats)
    if total_N == 0:
        continue
        
    print(f"STRATIFICATION: {etude} (N_TOTAL={total_N}, n_CIBLE={n})")
    for nom, pop in strats:
        w = pop / total_N
        n_sonde = round(n * w)
        p_ech = (n_sonde / n * 100.0) if n > 0 else 0.0
        print(f"  - {nom}: N_pop={pop} (W={w*100.0:.1f}%) -> n_sonde={n_sonde} ({p_ech:.1f}%)")
`
  },
  {
    id: 'eq3-c2-e3',
    chapter: 2,
    title: 'Contrôleur de conformité et représentativité par quotas',
    level: 'n3',
    language: 'python',
    goal: 'Comparer la distribution d’un échantillon empirique aux quotas cibles de la population et détecter les biais de sélection.',
    brief: '<p>Le script lit sur l\'entrée standard :<br>\n<code>QUOTAS etude=&lt;nom&gt; cibles=&lt;C1&gt;:&lt;P1&gt;,&lt;C2&gt;:&lt;P2&gt;,... obs=&lt;C1&gt;:&lt;N1&gt;,&lt;C2&gt;:&lt;N2&gt;,...</code>.<br>\nOù les cibles sont des pourcentages théoriques et obs les effectifs observés.<br><br>\nCalculs :<br>\n- Calculer le total observé $T_{obs} = \\sum N_i$.<br>\n- Pour chaque catégorie $i$ :<br>\n  - Pourcentage observé : $P_{obs,i} = (N_i / T_{obs}) \\times 100$.<br>\n  - Écart absolu : $\\Delta_i = |P_{obs,i} - P_{cible,i}|$.<br>\n- Écart maximum : $\\Delta_{max} = \\max(\\Delta_i)$.<br><br>\nQualification du biais d\'échantillonnage :<br>\n- Si $\\Delta_{max} \\le 3.0\\%$ : <code>CONFORMITE=EXCELLENTE_REPRESENTATIF</code><br>\n- Sinon si $\\Delta_{max} \\le 6.0\\%$ : <code>CONFORMITE=ACCEPTABLE_BIAIS_LEGER</code><br>\n- Sinon : <code>CONFORMITE=REJET_BIAIS_CRITIQUE (REDRESSEMENT_REQUIS)</code><br><br>\nAfficher :<br>\n<code>AUDIT_QUOTAS: {etude} -> TOTAL_OBS={T_obs} | ECART_MAX={Delta_max:.1f}% | {CONFORMITE}</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : comparer la distribution observée aux quotas cibles
`,
    hints: [
      'Calculer le total observé pour obtenir les pourcentages réels.',
      'Comparer les écarts absolus avec les quotas cibles.'
    ],
    examples: [
      {
        stdin: 'QUOTAS etude=SondageSalaries cibles=JUNIOR:30.0,CONFIRME:50.0,SENIOR:20.0 obs=JUNIOR:140,CONFIRME:260,SENIOR:100',
        expected: 'AUDIT_QUOTAS: SondageSalaries -> TOTAL_OBS=500 | ECART_MAX=2.0% | CONFORMITE=EXCELLENTE_REPRESENTATIF',
        note: 'Écart max = 2.0% (Junior 28% vs 30%, Confirmé 52% vs 50%) : représentativité excellente.'
      }
    ],
    tests: [
      {
        label: 'Échantillon avec biais modéré acceptable',
        stdin: 'QUOTAS etude=PanelConsommateurs cibles=HOMMES:50.0,FEMMES:50.0 obs=HOMMES:275,FEMMES:225',
        expected: 'AUDIT_QUOTAS: PanelConsommateurs -> TOTAL_OBS=500 | ECART_MAX=5.0% | CONFORMITE=ACCEPTABLE_BIAIS_LEGER'
      },
      {
        label: 'Échantillon fortement biaisé rejeté',
        stdin: 'QUOTAS etude=EtudeJeunes cibles=ETUDIANT:40.0,ACTIF:40.0,CHOMEUR:20.0 obs=ETUDIANT:300,ACTIF:80,CHOMEUR:20',
        expected: 'AUDIT_QUOTAS: EtudeJeunes -> TOTAL_OBS=400 | ECART_MAX=35.0% | CONFORMITE=REJET_BIAIS_CRITIQUE (REDRESSEMENT_REQUIS)'
      },
      {
        label: 'Quotas strictement parfaits',
        stdin: 'QUOTAS etude=TestEquilibre cibles=A:25.0,B:25.0,C:25.0,D:25.0 obs=A:50,B:50,C:50,D:50',
        expected: 'AUDIT_QUOTAS: TestEquilibre -> TOTAL_OBS=200 | ECART_MAX=0.0% | CONFORMITE=EXCELLENTE_REPRESENTATIF'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    m = re.search(r'etude=([^\\s]+)\\s+cibles=([^\\s]+)\\s+obs=([^\\s]+)', lig)
    if not m:
        continue
    etude, cibles_str, obs_str = m.groups()
    
    cibles = {}
    for item in cibles_str.split(','):
        if ':' in item:
            k, v = item.split(':')
            cibles[k.strip()] = float(v.strip())
            
    obs = {}
    for item in obs_str.split(','):
        if ':' in item:
            k, v = item.split(':')
            obs[k.strip()] = int(v.strip())
            
    t_obs = sum(obs.values())
    if t_obs == 0:
        continue
        
    ecarts = []
    for k, p_cible in cibles.items():
        n_reel = obs.get(k, 0)
        p_reel = (n_reel / t_obs) * 100.0
        ecarts.append(abs(p_reel - p_cible))
        
    delta_max = max(ecarts) if ecarts else 0.0
    
    if delta_max <= 3.0:
        conf = 'CONFORMITE=EXCELLENTE_REPRESENTATIF'
    elif delta_max <= 6.0:
        conf = 'CONFORMITE=ACCEPTABLE_BIAIS_LEGER'
    else:
        conf = 'CONFORMITE=REJET_BIAIS_CRITIQUE (REDRESSEMENT_REQUIS)'
        
    print(f"AUDIT_QUOTAS: {etude} -> TOTAL_OBS={t_obs} | ECART_MAX={delta_max:.1f}% | {conf}")
`
  }
];
