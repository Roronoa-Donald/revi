/**
 * Exercices du chapitre 6 — DevOps B3.
 * Observabilité, Monitoring & Ingénierie de la Fiabilité (SRE).
 */
'use strict';

module.exports = [
  {
    id: 'do3-c6-e1',
    chapter: 6,
    title: 'Calculateur des métriques d’incident SRE (MTBF, MTTR, MTTD & Disponibilité)',
    level: 'n1',
    language: 'python',
    goal: 'Mesurer la fiabilité opérationnelle d’un service en calculant les temps moyens de détection, de résolution et d’espacement des pannes.',
    brief: '<p>Le script lit sur l\'entrée standard :<br>\n<code>INCIDENT_LOG total_hours=&lt;T&gt; pannes=&lt;N&gt; total_downtime_h=&lt;D&gt; total_detection_h=&lt;Det&gt;</code>.<br><br>\nFormules standards SRE :<br>\n- Si $N &gt; 0$ :<br>\n  - Temps moyen de détection : $MTTD = Det / N$ (heures)<br>\n  - Temps moyen de réparation / résolution : $MTTR = D / N$ (heures)<br>\n  - Temps moyen entre deux pannes : $MTBF = (T - D) / N$ (heures de fonctionnement sain divisées par le nombre de pannes)<br>\n  - Disponibilité intrinsèque : $A = \\frac{MTBF}{MTBF + MTTR} \\times 100 = \\frac{T - D}{T} \\times 100$ (en %)<br>\n- Si $N == 0$ :<br>\n  - $MTTD = 0.0$, $MTTR = 0.0$, $MTBF = T$, $A = 100.0\\%$.<br><br>\nAfficher :<br>\n<code>SRE_METRICS: DISPO=&lt;A:.4f&gt;% | MTBF=&lt;MTBF:.1f&gt;h | MTTR=&lt;MTTR:.2f&gt;h | MTTD=&lt;MTTD:.2f&gt;h</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer MTBF, MTTR, MTTD et la disponibilité
`,
    hints: [
      'MTBF mesure la fiabilité (espacement des incidents), MTTR mesure la résilience de l’équipe.',
      'Arrondir Disponibilité à 4 décimales, MTBF à 1 décimale, MTTR et MTTD à 2 décimales.'
    ],
    examples: [
      {
        stdin: 'INCIDENT_LOG total_hours=720 pannes=3 total_downtime_h=1.5 total_detection_h=0.6',
        expected: 'SRE_METRICS: DISPO=99.7917% | MTBF=239.5h | MTTR=0.50h | MTTD=0.20h',
        note: 'Sur un mois de 720h avec 3 pannes (total 1.5h de coupure), MTTR=30min, MTTD=12min, MTBF=239.5h, dispo=99.7917%.'
      }
    ],
    tests: [
      {
        label: 'Mois parfait sans aucun incident',
        stdin: 'INCIDENT_LOG total_hours=720 pannes=0 total_downtime_h=0.0 total_detection_h=0.0',
        expected: 'SRE_METRICS: DISPO=100.0000% | MTBF=720.0h | MTTR=0.00h | MTTD=0.00h'
      },
      {
        label: 'Panne unique majeure de 4 heures',
        stdin: 'INCIDENT_LOG total_hours=1000 pannes=1 total_downtime_h=4.0 total_detection_h=1.0',
        expected: 'SRE_METRICS: DISPO=99.6000% | MTBF=996.0h | MTTR=4.00h | MTTD=1.00h'
      },
      {
        label: 'Multiples micro-coupures répétées',
        stdin: 'INCIDENT_LOG total_hours=500 pannes=5 total_downtime_h=2.5 total_detection_h=0.5',
        expected: 'SRE_METRICS: DISPO=99.5000% | MTBF=99.5h | MTTR=0.50h | MTTD=0.10h'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    m = re.search(r'total_hours=([0-9.]+).*?pannes=(\\d+).*?total_downtime_h=([0-9.]+).*?total_detection_h=([0-9.]+)', lig)
    if not m:
        continue
    t_tot = float(m.group(1))
    n = int(m.group(2))
    d_tot = float(m.group(3))
    det_tot = float(m.group(4))
    
    if n > 0:
        mttr = d_tot / n
        mttd = det_tot / n
        uptime = t_tot - d_tot
        mtbf = uptime / n
        dispo = (uptime / t_tot) * 100.0 if t_tot > 0 else 0.0
    else:
        mttr = 0.0
        mttd = 0.0
        mtbf = t_tot
        dispo = 100.0
        
    print(f"SRE_METRICS: DISPO={dispo:.4f}% | MTBF={mtbf:.1f}h | MTTR={mttr:.2f}h | MTTD={mttd:.2f}h")
`
  },
  {
    id: 'do3-c6-e2',
    chapter: 6,
    title: 'Auditeur de budget d’erreur SLO/SLI et gel des déploiements',
    level: 'n2',
    language: 'python',
    goal: 'Mesurer la consommation du budget d’erreur (Error Budget Burn Rate) sur une fenêtre glissante de 30 jours et déclencher l’arrêt des déploiements en cas d’épuisement.',
    brief: '<p>Une fenêtre glissante de 30 jours compte $30 \\times 24 \\times 3600 = 2\\,592\\,000$ secondes.<br>\nLe script lit sur l\'entrée standard :<br>\n<code>SLO_MONITOR slo_pct=&lt;val&gt; indispo_s=&lt;sec&gt;</code>.<br><br>\nFormules :<br>\n- $Budget\\_total = 2592000 \\times (1 - slo\\_pct / 100.0)$ (en secondes)<br>\n- $Taux\\_consommation (Burn) = (indispo\\_s / Budget\\_total) \\times 100.0$ (en %)<br>\n- $Budget\\_restant = Budget\\_total - indispo\\_s$ (en secondes, peut être négatif si dépassé)<br><br>\nDécision opérationnelle SRE :<br>\n- Si $indispo\\_s &gt; Budget\\_total$ :<br>\n  <code>ACTION=GEL_DEPLOIEMENTS_URGENCE (BUDGET_EPUISE)</code><br>\n- Sinon si $Burn \\ge 80.0\\%$ :<br>\n  <code>ACTION=ATTENTION_BUDGET_CRITIQUE</code><br>\n- Sinon :<br>\n  <code>ACTION=DEPLOIEMENTS_AUTORISES</code><br><br>\nAfficher :<br>\n<code>SLO_STATUS: BUDGET_TOTAL=&lt;b_tot:.1f&gt;s | CONSOMME=&lt;indispo_s:.1f&gt;s (&lt;burn:.1f&gt;%) | RESTANT=&lt;rest:.1f&gt;s | ACTION=&lt;ACTION&gt;</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer la consommation du budget d'erreur SLO
`,
    hints: [
      'Le budget d’erreur est la marge d’indisponibilité tolérée par contrat : tant qu’il est positif, l’équipe peut innover et déployer.',
      'Si le budget est épuisé, l’équipe stoppe les livraisons pour se consacrer 100% à la fiabilité.'
    ],
    examples: [
      {
        stdin: 'SLO_MONITOR slo_pct=99.9 indispo_s=500.0\nSLO_MONITOR slo_pct=99.9 indispo_s=2400.0\nSLO_MONITOR slo_pct=99.9 indispo_s=3000.0',
        expected: 'SLO_STATUS: BUDGET_TOTAL=2592.0s | CONSOMME=500.0s (19.3%) | RESTANT=2092.0s | ACTION=DEPLOIEMENTS_AUTORISES\nSLO_STATUS: BUDGET_TOTAL=2592.0s | CONSOMME=2400.0s (92.6%) | RESTANT=192.0s | ACTION=ATTENTION_BUDGET_CRITIQUE\nSLO_STATUS: BUDGET_TOTAL=2592.0s | CONSOMME=3000.0s (115.7%) | RESTANT=-408.0s | ACTION=GEL_DEPLOIEMENTS_URGENCE (BUDGET_EPUISE)',
        note: 'À 99.9%, le budget mensuel est de 2592s. Au-delà, les déploiements sont gelés.'
      }
    ],
    tests: [
      {
        label: 'Budget d’erreur intact 0 seconde perdue',
        stdin: 'SLO_MONITOR slo_pct=99.95 indispo_s=0.0',
        expected: 'SLO_STATUS: BUDGET_TOTAL=1296.0s | CONSOMME=0.0s (0.0%) | RESTANT=1296.0s | ACTION=DEPLOIEMENTS_AUTORISES'
      },
      {
        label: 'Dépassement sévère d’un SLO strict à 99.99%',
        stdin: 'SLO_MONITOR slo_pct=99.99 indispo_s=600.0',
        expected: 'SLO_STATUS: BUDGET_TOTAL=259.2s | CONSOMME=600.0s (231.5%) | RESTANT=-340.8s | ACTION=GEL_DEPLOIEMENTS_URGENCE (BUDGET_EPUISE)'
      },
      {
        label: 'Consommation juste au seuil d’alerte de 80%',
        stdin: 'SLO_MONITOR slo_pct=99.0 indispo_s=20736.0',
        expected: 'SLO_STATUS: BUDGET_TOTAL=25920.0s | CONSOMME=20736.0s (80.0%) | RESTANT=5184.0s | ACTION=ATTENTION_BUDGET_CRITIQUE'
      }
    ],
    solution: `import sys
import re

WINDOW_SEC = 2592000.0

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    m = re.search(r'slo_pct=([0-9.]+).*?indispo_s=([0-9.]+)', lig)
    if not m:
        continue
    slo = float(m.group(1))
    indispo = float(m.group(2))
    
    b_tot = WINDOW_SEC * (1.0 - slo / 100.0)
    burn = (indispo / b_tot) * 100.0 if b_tot > 0 else 0.0
    rest = b_tot - indispo
    
    if indispo > b_tot:
        action = 'GEL_DEPLOIEMENTS_URGENCE (BUDGET_EPUISE)'
    elif round(burn, 2) >= 80.0:
        action = 'ATTENTION_BUDGET_CRITIQUE'
    else:
        action = 'DEPLOIEMENTS_AUTORISES'
        
    print(f"SLO_STATUS: BUDGET_TOTAL={b_tot:.1f}s | CONSOMME={indispo:.1f}s ({burn:.1f}%) | RESTANT={rest:.1f}s | ACTION={action}")
`
  },
  {
    id: 'do3-c6-e3',
    chapter: 6,
    title: 'Détecteur d’instabilité et de tempête d’alertes Prometheus (Alert Flapping)',
    level: 'n3',
    language: 'python',
    goal: 'Analyser une séquence temporelle d’états d’alerte pour détecter les oscillations rapides (flapping) causées par un manque d’amortissement temporel.',
    brief: '<p>Le script lit sur l\'entrée standard :<br>\n<code>ALERT nom=&lt;nom&gt; etats=&lt;e1,e2,...&gt;</code>.<br>\nChaque état vaut soit <code>OK</code> soit <code>FIRING</code>.<br><br>\nCalculs :<br>\n- Compter le nombre de bascules (flaps) : chaque transition $e_i \\ne e_{i+1}$ pour $i \\in [0..N-2]$ incrémente le compteur de bascules.<br>\n- Noter l\'<code>ETAT_FINAL</code> (dernier élément de la séquence).<br><br>\nDiagnostic de stabilité :<br>\n- Si $bascules \\ge 3$ : l\'alerte est considérée comme instable.<br>\n  <code>DIAGNOSTIC=FLAPPING_INSTABILITE (RECOMMANDATION=AJOUTER_FOR_CLAUSE)</code><br>\n- Sinon :<br>\n  <code>DIAGNOSTIC=STABLE</code><br><br>\nAfficher :<br>\n<code>ALERT_DIAGNOSTIC: &lt;nom&gt; -&gt; BASCULES=&lt;N&gt; | ETAT_FINAL=&lt;OK|FIRING&gt; | DIAGNOSTIC=&lt;DIAGNOSTIC&gt;</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : compter les bascules et diagnostiquer le flapping
`,
    hints: [
      'Dans Prometheus, ajouter une clause "for: 5m" exige que la condition reste vraie 5 minutes avant d’émettre une alerte, supprimant le flapping.',
      'Comparer les éléments adjacents de la liste d’états.'
    ],
    examples: [
      {
        stdin: 'ALERT nom=high_cpu etats=OK,FIRING,OK,FIRING,OK\nALERT nom=disk_full etats=OK,OK,FIRING,FIRING',
        expected: 'ALERT_DIAGNOSTIC: high_cpu -> BASCULES=4 | ETAT_FINAL=OK | DIAGNOSTIC=FLAPPING_INSTABILITE (RECOMMANDATION=AJOUTER_FOR_CLAUSE)\nALERT_DIAGNOSTIC: disk_full -> BASCULES=1 | ETAT_FINAL=FIRING | DIAGNOSTIC=STABLE',
        note: 'high_cpu oscille 4 fois (flapping typique). disk_full ne bascule qu’une fois (passage sain à l’alerte).'
      }
    ],
    tests: [
      {
        label: 'Alerte oscillante au seuil critique de 3 bascules',
        stdin: 'ALERT nom=latency_spike etats=OK,FIRING,OK,FIRING',
        expected: 'ALERT_DIAGNOSTIC: latency_spike -> BASCULES=3 | ETAT_FINAL=FIRING | DIAGNOSTIC=FLAPPING_INSTABILITE (RECOMMANDATION=AJOUTER_FOR_CLAUSE)'
      },
      {
        label: 'Alerte permanente sans bascule',
        stdin: 'ALERT nom=service_down etats=FIRING,FIRING,FIRING',
        expected: 'ALERT_DIAGNOSTIC: service_down -> BASCULES=0 | ETAT_FINAL=FIRING | DIAGNOSTIC=STABLE'
      },
      {
        label: 'Alerte résolue proprement avec 2 bascules',
        stdin: 'ALERT nom=memory_leak etats=OK,FIRING,FIRING,OK',
        expected: 'ALERT_DIAGNOSTIC: memory_leak -> BASCULES=2 | ETAT_FINAL=OK | DIAGNOSTIC=STABLE'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    m = re.search(r'nom=([^\\s]+).*?etats=([^\\s]+)', lig)
    if not m:
        continue
    nom, e_str = m.group(1), m.group(2)
    etats = e_str.split(',')
    
    bascules = 0
    for i in range(len(etats) - 1):
        if etats[i] != etats[i + 1]:
            bascules += 1
            
    fin = etats[-1] if etats else 'OK'
    
    if bascules >= 3:
        diag = 'FLAPPING_INSTABILITE (RECOMMANDATION=AJOUTER_FOR_CLAUSE)'
    else:
        diag = 'STABLE'
        
    print(f"ALERT_DIAGNOSTIC: {nom} -> BASCULES={bascules} | ETAT_FINAL={fin} | DIAGNOSTIC={diag}")
`
  }
];
