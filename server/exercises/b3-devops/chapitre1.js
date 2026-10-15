/**
 * Exercices du chapitre 1 — DevOps B3.
 * Culture DevOps, Modèle CALMS & Métriques DORA.
 */
'use strict';

module.exports = [
  {
    id: 'do3-c1-e1',
    chapter: 1,
    title: 'Évaluateur de maturité du modèle CALMS (DevOps Maturity Score)',
    level: 'n1',
    language: 'python',
    goal: 'Calculer le score de maturité DevOps d’une organisation selon les 5 piliers du modèle CALMS et identifier les axes d’amélioration prioritaires.',
    brief: '<p>Le script lit sur l\'entrée standard les évaluations des 5 piliers CALMS :<br>\n<code>CALMS pilier=&lt;CULTURE|AUTOMATION|LEAN|MEASUREMENT|SHARING&gt; score=&lt;1..5&gt;</code>.<br>\nFormules :<br>\n- Moyenne globale = $\\sum score / 5.0$ (sur 5, arrondie à 2 décimales)<br>\n- Pourcentage = $(Moyenne / 5.0) \\times 100$ (arrondi à 1 décimale)<br>\n- Niveau de maturité :<br>\n  - Si $Moyenne \\ge 4.0$ : <code>NIVEAU=ELITE</code><br>\n  - Sinon si $Moyenne \\ge 2.5$ : <code>NIVEAU=EN_TRANSITION</code><br>\n  - Sinon : <code>NIVEAU=INITIAL</code><br>\n- Axes prioritaires : liste des piliers ayant un score strictement inférieur à 3 (ordonnés selon l\'ordre standard <code>CULTURE</code>, <code>AUTOMATION</code>, <code>LEAN</code>, <code>MEASUREMENT</code>, <code>SHARING</code>), ou <code>AUCUN</code> si tous sont $\\ge 3$.<br><br>\nAfficher :<br>\n<code>MATURITE_CALMS: MOYENNE=&lt;moy:.2f&gt;/5 (&lt;pct:.1f&gt;%) | NIVEAU=&lt;NIVEAU&gt; | AXES_PRIORITAIRES=[&lt;axes&gt;]</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer la moyenne CALMS et identifier les axes prioritaires
`,
    hints: [
      'Garder l’ordre officiel CALMS (Culture, Automation, Lean, Measurement, Sharing) pour l’affichage des axes.',
      'Un score < 3 signale un goulet d’étranglement culturel ou technique.'
    ],
    examples: [
      {
        stdin: 'CALMS pilier=CULTURE score=4\nCALMS pilier=AUTOMATION score=5\nCALMS pilier=LEAN score=4\nCALMS pilier=MEASUREMENT score=4\nCALMS pilier=SHARING score=4',
        expected: 'MATURITE_CALMS: MOYENNE=4.20/5 (84.0%) | NIVEAU=ELITE | AXES_PRIORITAIRES=[AUCUN]',
        note: 'Tous les piliers sont solides (>= 3) et la moyenne dépasse 4.0 : niveau Élite.'
      }
    ],
    tests: [
      {
        label: 'Organisation en début de transition avec faiblesses',
        stdin: 'CALMS pilier=CULTURE score=2\nCALMS pilier=AUTOMATION score=1\nCALMS pilier=LEAN score=3\nCALMS pilier=MEASUREMENT score=2\nCALMS pilier=SHARING score=3',
        expected: 'MATURITE_CALMS: MOYENNE=2.20/5 (44.0%) | NIVEAU=INITIAL | AXES_PRIORITAIRES=[CULTURE, AUTOMATION, MEASUREMENT]'
      },
      {
        label: 'Bonne automatisation mais retard culturel',
        stdin: 'CALMS pilier=CULTURE score=2\nCALMS pilier=AUTOMATION score=4\nCALMS pilier=LEAN score=4\nCALMS pilier=MEASUREMENT score=3\nCALMS pilier=SHARING score=4',
        expected: 'MATURITE_CALMS: MOYENNE=3.40/5 (68.0%) | NIVEAU=EN_TRANSITION | AXES_PRIORITAIRES=[CULTURE]'
      },
      {
        label: 'Scores parfaits sur tous les axes',
        stdin: 'CALMS pilier=CULTURE score=5\nCALMS pilier=AUTOMATION score=5\nCALMS pilier=LEAN score=5\nCALMS pilier=MEASUREMENT score=5\nCALMS pilier=SHARING score=5',
        expected: 'MATURITE_CALMS: MOYENNE=5.00/5 (100.0%) | NIVEAU=ELITE | AXES_PRIORITAIRES=[AUCUN]'
      }
    ],
    solution: `import sys
import re

ORDRE = ['CULTURE', 'AUTOMATION', 'LEAN', 'MEASUREMENT', 'SHARING']

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]
scores = {}

for lig in lignes:
    m = re.search(r'pilier=([^\\s]+).*?score=(\\d+)', lig)
    if m:
        scores[m.group(1)] = int(m.group(2))

tot = sum(scores.get(p, 0) for p in ORDRE)
moy = tot / 5.0
pct = (moy / 5.0) * 100.0

if moy >= 4.0:
    niveau = 'ELITE'
elif moy >= 2.5:
    niveau = 'EN_TRANSITION'
else:
    niveau = 'INITIAL'

prio = [p for p in ORDRE if scores.get(p, 0) < 3]
prio_str = 'AUCUN' if not prio else ', '.join(prio)

print(f"MATURITE_CALMS: MOYENNE={moy:.2f}/5 ({pct:.1f}%) | NIVEAU={niveau} | AXES_PRIORITAIRES=[{prio_str}]")
`
  },
  {
    id: 'do3-c1-e2',
    chapter: 1,
    title: 'Calculateur des 4 Métriques DORA (DevOps Research & Assessment)',
    level: 'n2',
    language: 'python',
    goal: 'Classifier la performance de livraison logicielle d’une équipe selon les critères universels de la méthodologie DORA.',
    brief: '<p>Le script lit sur l\'entrée standard les 4 indicateurs DORA :<br>\n<code>DORA df_per_day=&lt;val&gt; lt_hours=&lt;val&gt; cfr_pct=&lt;val&gt; mttr_hours=&lt;val&gt;</code>.<br>\nDéfinitions :<br>\n- <code>DF</code> : Deployment Frequency (déploiements par jour)<br>\n- <code>LT</code> : Lead Time for Changes (délai commit vers prod en heures)<br>\n- <code>CFR</code> : Change Failure Rate (taux d\'échec au déploiement en %)<br>\n- <code>MTTR</code> : Mean Time to Restore (temps de résolution d\'incident en heures)<br><br>\nGrille de classification officielle DORA :<br>\n- <strong>ELITE</strong> : $DF \\ge 1.0$ ET $LT \\le 1.0$ ET $CFR \\le 5.0$ ET $MTTR \\le 1.0$<br>\n- <strong>HIGH</strong> : $DF \\ge 0.14$ ET $LT \\le 24.0$ ET $CFR \\le 15.0$ ET $MTTR \\le 24.0$<br>\n- <strong>MEDIUM</strong> : $DF \\ge 0.033$ ET $LT \\le 168.0$ ET $CFR \\le 30.0$ ET $MTTR \\le 168.0$<br>\n- <strong>LOW</strong> : toute équipe ne satisfaisant pas les seuils ci-dessus.<br><br>\nAfficher :<br>\n<code>DORA_REPORT: CLASSE=&lt;ELITE|HIGH|MEDIUM|LOW&gt; | DF=&lt;df:.2f&gt; dep/j | LT=&lt;lt:.1f&gt;h | CFR=&lt;cfr:.1f&gt;% | MTTR=&lt;mttr:.1f&gt;h</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : analyser les 4 métriques DORA et classifier l'équipe
`,
    hints: [
      'Tester dans l’ordre d’exigence : Élite, puis High, puis Medium, sinon Low.',
      'Les équipes Élite déploient plusieurs fois par jour avec un lead time inférieur à une heure.'
    ],
    examples: [
      {
        stdin: 'DORA df_per_day=3.50 lt_hours=0.5 cfr_pct=2.0 mttr_hours=0.4',
        expected: 'DORA_REPORT: CLASSE=ELITE | DF=3.50 dep/j | LT=0.5h | CFR=2.0% | MTTR=0.4h',
        note: 'Tous les critères Élite sont satisfaits avec brio.'
      }
    ],
    tests: [
      {
        label: 'Équipe performante High niveau',
        stdin: 'DORA df_per_day=0.50 lt_hours=8.0 cfr_pct=10.0 mttr_hours=4.0',
        expected: 'DORA_REPORT: CLASSE=HIGH | DF=0.50 dep/j | LT=8.0h | CFR=10.0% | MTTR=4.0h'
      },
      {
        label: 'Équipe intermédiaire Medium niveau',
        stdin: 'DORA df_per_day=0.10 lt_hours=48.0 cfr_pct=20.0 mttr_hours=72.0',
        expected: 'DORA_REPORT: CLASSE=MEDIUM | DF=0.10 dep/j | LT=48.0h | CFR=20.0% | MTTR=72.0h'
      },
      {
        label: 'Déploiements manuels trimestriels à risque élevé Low',
        stdin: 'DORA df_per_day=0.01 lt_hours=720.0 cfr_pct=45.0 mttr_hours=200.0',
        expected: 'DORA_REPORT: CLASSE=LOW | DF=0.01 dep/j | LT=720.0h | CFR=45.0% | MTTR=200.0h'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    m = re.search(r'df_per_day=([0-9.]+).*?lt_hours=([0-9.]+).*?cfr_pct=([0-9.]+).*?mttr_hours=([0-9.]+)', lig)
    if not m:
        continue
    df, lt, cfr, mttr = float(m.group(1)), float(m.group(2)), float(m.group(3)), float(m.group(4))
    
    if df >= 1.0 and lt <= 1.0 and cfr <= 5.0 and mttr <= 1.0:
        classe = 'ELITE'
    elif df >= 0.14 and lt <= 24.0 and cfr <= 15.0 and mttr <= 24.0:
        classe = 'HIGH'
    elif df >= 0.033 and lt <= 168.0 and cfr <= 30.0 and mttr <= 168.0:
        classe = 'MEDIUM'
    else:
        classe = 'LOW'
        
    print(f"DORA_REPORT: CLASSE={classe} | DF={df:.2f} dep/j | LT={lt:.1f}h | CFR={cfr:.1f}% | MTTR={mttr:.1f}h")
`
  },
  {
    id: 'do3-c1-e3',
    chapter: 1,
    title: 'Simulateur de flux tiré Kanban et limitation du travail en cours (WIP)',
    level: 'n3',
    language: 'python',
    goal: 'Appliquer les principes du Lean Manufacturing au flux logiciel en faisant respecter strictement les plafonds de WIP (Work In Progress) sur chaque colonne du tableau Kanban.',
    brief: '<p>Le script lit les limites de capacité WIP, l’état initial des tâches, puis traite des requêtes de progression :<br>\n<code>WIP_LIMITS dev=&lt;lim_dev&gt; review=&lt;lim_rev&gt; deploy=&lt;lim_dep&gt;</code><br>\n<code>TASK id=&lt;id&gt; col=&lt;DEV|REVIEW|DEPLOY|DONE&gt;</code> (état courant des tâches actives)<br>\n<code>MOVE id=&lt;id&gt; to=&lt;DEV|REVIEW|DEPLOY|DONE&gt;</code> (tentative de déplacer une tâche).<br><br>\nRègles :<br>\n- La colonne <code>DONE</code> n’a aucune limite de WIP.<br>\n- Pour déplacer une tâche vers une colonne cible : si le nombre actuel de tâches déjà dans cette colonne est <strong>strictement inférieur</strong> à la limite autorisée, le déplacement est <code>ACCEPTE</code> (la tâche quitte son ancienne colonne et entre dans la nouvelle).<br>\n- Si la colonne cible a déjà atteint sa limite WIP : le déplacement est <code>REJETE_WIP_SATURATION</code> et la tâche reste dans sa colonne actuelle.<br><br>\nAfficher pour chaque commande <code>MOVE</code> :<br>\n<code>KANBAN_MOVE: task=&lt;id&gt; to=&lt;to&gt; -&gt; &lt;ACCEPTE|REJETE_WIP_SATURATION&gt; (WIP_CIBLE=&lt;nouveau_total&gt;/&lt;limite&gt;)</code><br>\n(Note : pour DONE, afficher <code>(WIP_CIBLE=&lt;nouveau_total&gt;/ILLIMITE)</code>).</p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : gérer les colonnes Kanban et faire respecter les limites WIP
`,
    hints: [
      'Limiter le WIP réduit le temps de cycle (Loi de Little : Lead Time = WIP / Throughput).',
      'Mettre à jour l’état de la tâche immédiatement en cas d’acceptation.'
    ],
    examples: [
      {
        stdin: 'WIP_LIMITS dev=2 review=1 deploy=1\nTASK id=T1 col=DEV\nTASK id=T2 col=REVIEW\nMOVE id=T1 to=REVIEW\nMOVE id=T2 to=DEPLOY\nMOVE id=T1 to=REVIEW',
        expected: 'KANBAN_MOVE: task=T1 to=REVIEW -> REJETE_WIP_SATURATION (WIP_CIBLE=1/1)\nKANBAN_MOVE: task=T2 to=DEPLOY -> ACCEPTE (WIP_CIBLE=1/1)\nKANBAN_MOVE: task=T1 to=REVIEW -> ACCEPTE (WIP_CIBLE=1/1)',
        note: 'T1 ne peut entrer en REVIEW car T2 y est déjà (limite 1). Dès que T2 avance en DEPLOY, T1 peut franchir REVIEW.'
      }
    ],
    tests: [
      {
        label: 'Saturation immédiate de la colonne DEV',
        stdin: 'WIP_LIMITS dev=1 review=2 deploy=2\nTASK id=A col=DEV\nTASK id=B col=TODO\nMOVE id=B to=DEV',
        expected: 'KANBAN_MOVE: task=B to=DEV -> REJETE_WIP_SATURATION (WIP_CIBLE=1/1)'
      },
      {
        label: 'Sortie vers DONE illimité',
        stdin: 'WIP_LIMITS dev=2 review=2 deploy=1\nTASK id=X col=DEPLOY\nMOVE id=X to=DONE',
        expected: 'KANBAN_MOVE: task=X to=DONE -> ACCEPTE (WIP_CIBLE=1/ILLIMITE)'
      },
      {
        label: 'Déplacement séquentiel multi-tâches respectant le flux',
        stdin: 'WIP_LIMITS dev=2 review=2 deploy=2\nTASK id=T1 col=DEV\nTASK id=T2 col=DEV\nMOVE id=T1 to=REVIEW\nMOVE id=T2 to=REVIEW',
        expected: 'KANBAN_MOVE: task=T1 to=REVIEW -> ACCEPTE (WIP_CIBLE=1/2)\nKANBAN_MOVE: task=T2 to=REVIEW -> ACCEPTE (WIP_CIBLE=2/2)'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

limits = {'DEV': 999, 'REVIEW': 999, 'DEPLOY': 999, 'DONE': 999999}
tasks = {}

for lig in lignes:
    if lig.startswith('WIP_LIMITS'):
        m = re.search(r'dev=(\\d+).*?review=(\\d+).*?deploy=(\\d+)', lig)
        if m:
            limits['DEV'] = int(m.group(1))
            limits['REVIEW'] = int(m.group(2))
            limits['DEPLOY'] = int(m.group(3))
    elif lig.startswith('TASK'):
        m = re.search(r'id=([^\\s]+).*?col=([^\\s]+)', lig)
        if m:
            tasks[m.group(1)] = m.group(2)
    elif lig.startswith('MOVE'):
        m = re.search(r'id=([^\\s]+).*?to=([^\\s]+)', lig)
        if not m:
            continue
        tid, to_col = m.group(1), m.group(2)
        
        cur_in_to = sum(1 for t, c in tasks.items() if c == to_col and t != tid)
        max_lim = limits.get(to_col, 999)
        
        lim_str = 'ILLIMITE' if to_col == 'DONE' else str(max_lim)
        
        if to_col == 'DONE' or cur_in_to < max_lim:
            tasks[tid] = to_col
            new_tot = cur_in_to + 1
            print(f"KANBAN_MOVE: task={tid} to={to_col} -> ACCEPTE (WIP_CIBLE={new_tot}/{lim_str})")
        else:
            print(f"KANBAN_MOVE: task={tid} to={to_col} -> REJETE_WIP_SATURATION (WIP_CIBLE={cur_in_to}/{lim_str})")
`
  }
];
