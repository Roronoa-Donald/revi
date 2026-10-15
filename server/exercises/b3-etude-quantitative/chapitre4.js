/**
 * Exercices Chapitre 4 — Étude Quantitative & Qualitative B3.
 * Collecte Qualitative : Entretiens, Focus Groups & Observation.
 */
'use strict';

module.exports = [
  {
    id: 'eq3-c4-e1',
    chapter: 4,
    title: 'Validateur méthodologique de guide d’entretien semi-directif',
    level: 'n1',
    language: 'python',
    goal: 'Vérifier la structure canonique d’un guide d’entretien qualitatif (phases, équilibre ouvert/fermé, relances).',
    brief: '<p>Le script lit sur l\'entrée standard :<br>\n<code>GUIDE id=&lt;id&gt; phases=&lt;P1&gt;,&lt;P2&gt;,... questions=OUVERTE:&lt;No&gt;,FERMEE:&lt;Nf&gt; relances=&lt;Nr&gt;</code>.<br><br>\nRègles de validation méthodologique :<br>\n1. <code>Phases</code> : Doit comporter au moins une phase d\'accueil (<code>ACCUEIL</code> ou <code>INTRODUCTION</code>), au moins une phase thématique (contenant <code>THEME</code> ou <code>CORPS</code>), et une phase de conclusion (<code>CONCLUSION</code> ou <code>CLOTURE</code>). Si absent : défaut <code>PHASES_MANQUANTES</code>.<br>\n2. <code>Questions</code> : Le taux de questions ouvertes $TO = No / (No + Nf)$ doit être $\\ge 70.0\\%$. Si inférieur : défaut <code>TROP_DE_QUESTIONS_FERMEES</code>.<br>\n3. <code>Relances</code> : Le nombre de relances neutres prévues $Nr$ doit être $\\ge 2$. Si inférieur : défaut <code>MANQUE_DE_RELANCES</code>.<br><br>\nVerdict (ordre des défauts ci-dessus) :<br>\n- Si aucun défaut : <code>STATUT=GUIDE_SEMI_DIRECTIF_CONFORME</code><br>\n- Sinon : <code>STATUT=GUIDE_A_REVISER (DEFAUTS=[...])</code><br><br>\nAfficher :<br>\n<code>AUDIT_GUIDE: {id} -> {STATUT}</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : auditer la structure du guide d'entretien semi-directif
`,
    hints: [
      'Vérifier la présence des 3 types de phases requises.',
      'Calculer le ratio de questions ouvertes par rapport au total.'
    ],
    examples: [
      {
        stdin: 'GUIDE id=EntretienDSI phases=ACCUEIL,THEME1,THEME2,CONCLUSION questions=OUVERTE:8,FERMEE:2 relances=4',
        expected: 'AUDIT_GUIDE: EntretienDSI -> STATUT=GUIDE_SEMI_DIRECTIF_CONFORME',
        note: '3 phases présentes, 80% de questions ouvertes et 4 relances : parfait.'
      }
    ],
    tests: [
      {
        label: 'Guide avec trop de questions fermées de type questionnaire',
        stdin: 'GUIDE id=EntretienDev phases=INTRODUCTION,THEME_OUTILS,CLOTURE questions=OUVERTE:4,FERMEE:6 relances=3',
        expected: 'AUDIT_GUIDE: EntretienDev -> STATUT=GUIDE_A_REVISER (DEFAUTS=[TROP_DE_QUESTIONS_FERMEES])'
      },
      {
        label: 'Guide manquant de relances et de conclusion',
        stdin: 'GUIDE id=EntretienBrouillon phases=ACCUEIL,THEME_UNIQUE questions=OUVERTE:9,FERMEE:1 relances=1',
        expected: 'AUDIT_GUIDE: EntretienBrouillon -> STATUT=GUIDE_A_REVISER (DEFAUTS=[PHASES_MANQUANTES, MANQUE_DE_RELANCES])'
      },
      {
        label: 'Guide combinant tous les défauts',
        stdin: 'GUIDE id=MauvaisGuide phases=CORPS questions=OUVERTE:2,FERMEE:8 relances=0',
        expected: 'AUDIT_GUIDE: MauvaisGuide -> STATUT=GUIDE_A_REVISER (DEFAUTS=[PHASES_MANQUANTES, TROP_DE_QUESTIONS_FERMEES, MANQUE_DE_RELANCES])'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    m = re.search(r'id=([^\\s]+)\\s+phases=([^\\s]+)\\s+questions=([^\\s]+)\\s+relances=(\\d+)', lig)
    if not m:
        continue
    gid, phases_str, q_str, rel_str = m.groups()
    nr = int(rel_str)
    
    phases = [p.strip().upper() for p in phases_str.split(',')]
    has_accueil = any(p in ['ACCUEIL', 'INTRODUCTION'] for p in phases)
    has_theme = any('THEME' in p or 'CORPS' in p for p in phases)
    has_conclusion = any(p in ['CONCLUSION', 'CLOTURE'] for p in phases)
    
    q_dict = {}
    for item in q_str.split(','):
        if ':' in item:
            k, v = item.split(':')
            q_dict[k.strip().upper()] = int(v.strip())
            
    n_ouv = q_dict.get('OUVERTE', 0)
    n_fer = q_dict.get('FERMEE', 0)
    total_q = n_ouv + n_fer
    ratio_ouv = (n_ouv / total_q) if total_q > 0 else 0.0
    
    defauts = []
    
    # 1. Phases
    if not (has_accueil and has_theme and has_conclusion):
        defauts.append('PHASES_MANQUANTES')
        
    # 2. Questions fermées
    if ratio_ouv < 0.70:
        defauts.append('TROP_DE_QUESTIONS_FERMEES')
        
    # 3. Relances
    if nr < 2:
        defauts.append('MANQUE_DE_RELANCES')
        
    if not defauts:
        statut = 'STATUT=GUIDE_SEMI_DIRECTIF_CONFORME'
    else:
        statut = f"STATUT=GUIDE_A_REVISER (DEFAUTS=[{', '.join(defauts)}])"
        
    print(f"AUDIT_GUIDE: {gid} -> {statut}")
`
  },
  {
    id: 'eq3-c4-e2',
    chapter: 4,
    title: 'Analyseur d’interactions de Focus Group et équilibre du temps de parole',
    level: 'n2',
    language: 'python',
    goal: 'Mesurer la répartition des prises de parole lors d’une table ronde qualitative et détecter un éventuel biais de leader dominant.',
    brief: '<p>Le script lit sur l\'entrée standard :<br>\n<code>FOCUS_GROUP id=&lt;id&gt; duree_totale=&lt;D_min&gt; participants=&lt;Nom1&gt;:&lt;T1&gt;,&lt;Nom2&gt;:&lt;T2&gt;,...</code>.<br>\nOù chaque $T_i$ est la durée totale cumulée en minutes par chaque participant.<br><br>\nCalculs :<br>\n- Nombre de participants $P$.<br>\n- Temps total parlé : $T_{parle} = \\sum T_i$.<br>\n- Pour chaque participant : part relative du temps parlé $pct_i = (T_i / T_{parle}) \\times 100$ (1 décimale).<br>\n- Détection de monopole : si un participant a $pct_i &gt; 35.0\\%$, il est qualifié de leader dominant (le premier qui dépasse).<br><br>\nDiagnostic :<br>\n- Si un leader dominant est détecté :<br>\n  <code>DYNAMIQUE=BIAIS_DOMINANCE (LEADER={Nom} {pct:.1f}%)</code><br>\n- Sinon si $P \\ge 4$ :<br>\n  <code>DYNAMIQUE=EQUILIBREE_CONCERTATION_FLUIDE</code><br>\n- Sinon :<br>\n  <code>DYNAMIQUE=GROUPE_RESTREINT</code><br><br>\nAfficher :<br>\n<code>FOCUS_ANALYSE: {id} -> PARTICIPANTS={P} TEMPS_PARLE={T_parle}m/{duree_totale}m | {DYNAMIQUE}</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : analyser la distribution des prises de parole dans le focus group
`,
    hints: [
      'Calculer la part relative par rapport au temps parlé effectif.',
      'Vérifier le seuil de 35% pour détecter la captation de la parole.'
    ],
    examples: [
      {
        stdin: 'FOCUS_GROUP id=FG_DevOps duree_totale=90 participants=Alice:20,Bob:18,Chloe:22,David:20',
        expected: 'FOCUS_ANALYSE: FG_DevOps -> PARTICIPANTS=4 TEMPS_PARLE=80m/90m | DYNAMIQUE=EQUILIBREE_CONCERTATION_FLUIDE',
        note: '4 participants avec des temps répartis entre 18 et 22m : concertation parfaitement fluide.'
      }
    ],
    tests: [
      {
        label: 'Focus group avec leader dominant écrasant',
        stdin: 'FOCUS_GROUP id=FG_Direction duree_totale=100 participants=Manager:45,Ingenieur1:15,Ingenieur2:10,Technicien:10',
        expected: 'FOCUS_ANALYSE: FG_Direction -> PARTICIPANTS=4 TEMPS_PARLE=80m/100m | DYNAMIQUE=BIAIS_DOMINANCE (LEADER=Manager 56.2%)'
      },
      {
        label: 'Groupe restreint de 3 participants équilibrés',
        stdin: 'FOCUS_GROUP id=FG_Trio duree_totale=60 participants=Marc:15,Julie:15,Sophie:15',
        expected: 'FOCUS_ANALYSE: FG_Trio -> PARTICIPANTS=3 TEMPS_PARLE=45m/60m | DYNAMIQUE=GROUPE_RESTREINT'
      },
      {
        label: 'Grand groupe équilibré de 5 participants',
        stdin: 'FOCUS_GROUP id=FG_Usagers duree_totale=120 participants=P1:20,P2:20,P3:20,P4:20,P5:20',
        expected: 'FOCUS_ANALYSE: FG_Usagers -> PARTICIPANTS=5 TEMPS_PARLE=100m/120m | DYNAMIQUE=EQUILIBREE_CONCERTATION_FLUIDE'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    m = re.search(r'id=([^\\s]+)\\s+duree_totale=(\\d+)\\s+participants=([^\\s]+)', lig)
    if not m:
        continue
    fg_id, d_tot_str, parts_str = m.groups()
    d_tot = int(d_tot_str)
    
    parts = []
    for item in parts_str.split(','):
        if ':' in item:
            k, v = item.split(':')
            parts.append((k.strip(), int(v.strip())))
            
    p_cnt = len(parts)
    t_parle = sum(v for _, v in parts)
    
    leader_nom = None
    leader_pct = 0.0
    for nom, t in parts:
        pct = (t / t_parle * 100.0) if t_parle > 0 else 0.0
        if pct > 35.0:
            leader_nom = nom
            leader_pct = pct
            break
            
    if leader_nom:
        dyn = f"DYNAMIQUE=BIAIS_DOMINANCE (LEADER={leader_nom} {leader_pct:.1f}%)"
    elif p_cnt >= 4:
        dyn = "DYNAMIQUE=EQUILIBREE_CONCERTATION_FLUIDE"
    else:
        dyn = "DYNAMIQUE=GROUPE_RESTREINT"
        
    print(f"FOCUS_ANALYSE: {fg_id} -> PARTICIPANTS={p_cnt} TEMPS_PARLE={t_parle}m/{d_tot}m | {dyn}")
`
  },
  {
    id: 'eq3-c4-e3',
    chapter: 4,
    title: 'Grille d’observation comportementale et accord inter-observateurs',
    level: 'n3',
    language: 'python',
    goal: 'Calculer le coefficient d’accord brut entre deux observateurs indépendants codant une séquence comportementale in situ.',
    brief: '<p>Le script lit sur l\'entrée standard :<br>\n<code>OBSERVATION session=&lt;id&gt; obs1=&lt;c1,c2,...&gt; obs2=&lt;c1,c2,...&gt;</code>.<br>\nOù chaque séquence contient une série d\'occurrences codées (ex: O pour présence du comportement, N pour absence).<br><br>\nCalculs :<br>\n- Nombre total d\'unités observées : $U = \\text{len}(obs1)$ (obs1 et obs2 ont la même longueur).<br>\n- Nombre de concordances exactes : $A = \\sum (1 \\text{ si } obs1[i] == obs2[i])$.<br>\n- Taux d\'accord brut : $P_0 = (A / U) \\times 100$ (1 décimale).<br><br>\nDiagnostic de concordance (seuil méthodologique de Miles &amp; Huberman) :<br>\n- Si $P_0 \\ge 85.0\\%$ : <code>FIABILITE=EXCELLENTE_CONCORDANCE_FORTE</code><br>\n- Sinon si $P_0 \\ge 70.0\\%$ : <code>FIABILITE=ACCEPTABLE_CONCORDANCE_MODEREE</code><br>\n- Sinon : <code>FIABILITE=INSUFFISANTE_GRILLE_AMBIGUE (REVOIR_DEFINITIONS)</code><br><br>\nAfficher :<br>\n<code>ACCORD_OBSERVATEURS: {session} -> ACCORDS={A}/{U} ({P_0:.1f}%) | {FIABILITE}</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer le taux d'accord inter-observateurs et la fiabilité
`,
    hints: [
      'Comparer les symboles élément par élément aux mêmes indices.',
      'Calculer le ratio accords / total.'
    ],
    examples: [
      {
        stdin: 'OBSERVATION session=S1 obs1=O,N,O,O,N,O,N,O,O,N obs2=O,N,O,O,N,O,N,O,O,N',
        expected: 'ACCORD_OBSERVATEURS: S1 -> ACCORDS=10/10 (100.0%) | FIABILITE=EXCELLENTE_CONCORDANCE_FORTE',
        note: 'Accord parfait à 100% sur les 10 intervalles temporels.'
      }
    ],
    tests: [
      {
        label: 'Accord acceptable à 80%',
        stdin: 'OBSERVATION session=S2 obs1=O,N,O,O,N,O,N,O,O,N obs2=O,N,O,N,N,O,N,O,N,N',
        expected: 'ACCORD_OBSERVATEURS: S2 -> ACCORDS=8/10 (80.0%) | FIABILITE=ACCEPTABLE_CONCORDANCE_MODEREE'
      },
      {
        label: 'Grille ambiguë avec fort désaccord',
        stdin: 'OBSERVATION session=S3 obs1=O,O,O,O,O,N,N,N,N,N obs2=N,N,O,O,N,O,O,N,N,O',
        expected: 'ACCORD_OBSERVATEURS: S3 -> ACCORDS=4/10 (40.0%) | FIABILITE=INSUFFISANTE_GRILLE_AMBIGUE (REVOIR_DEFINITIONS)'
      },
      {
        label: 'Très bonne concordance à 90%',
        stdin: 'OBSERVATION session=S4 obs1=A,B,A,B,A,B,A,B,A,B obs2=A,B,A,B,A,B,A,B,A,A',
        expected: 'ACCORD_OBSERVATEURS: S4 -> ACCORDS=9/10 (90.0%) | FIABILITE=EXCELLENTE_CONCORDANCE_FORTE'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    m = re.search(r'session=([^\\s]+)\\s+obs1=([^\\s]+)\\s+obs2=([^\\s]+)', lig)
    if not m:
        continue
    sess, o1_str, o2_str = m.groups()
    
    o1 = [x.strip() for x in o1_str.split(',')]
    o2 = [x.strip() for x in o2_str.split(',')]
    
    u = min(len(o1), len(o2))
    if u == 0:
        continue
        
    accords = sum(1 for i in range(u) if o1[i] == o2[i])
    p0 = (accords / u) * 100.0
    
    if p0 >= 85.0:
        fiab = 'FIABILITE=EXCELLENTE_CONCORDANCE_FORTE'
    elif p0 >= 70.0:
        fiab = 'FIABILITE=ACCEPTABLE_CONCORDANCE_MODEREE'
    else:
        fiab = 'FIABILITE=INSUFFISANTE_GRILLE_AMBIGUE (REVOIR_DEFINITIONS)'
        
    print(f"ACCORD_OBSERVATEURS: {sess} -> ACCORDS={accords}/{u} ({p0:.1f}%) | {fiab}")
`
  }
];
