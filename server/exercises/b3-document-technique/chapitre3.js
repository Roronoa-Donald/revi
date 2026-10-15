/**
 * Exercices du Chapitre 3 : Architecture & Documentation Système (DAT & DEX).
 * Préfixe : dt3-c3-e
 */
'use strict';

module.exports = [
  {
    id: 'dt3-c3-e1',
    chapter: 3,
    title: 'Analyseur d’objectifs de reprise d’activité (RTO & RPO) dans un DEX',
    level: 'n1',
    language: 'python',
    goal: 'Confronter les temps estimés de reprise (RTO) et de perte de données (RPO) aux engagements contractuels d’un plan d’exploitation.',
    brief: '<p>Le script lit sur l\'entrée standard :<br>\n<code>RTO_RPO_AUDIT service=&lt;nom&gt; rto_estime_min=&lt;N&gt; rto_max_min=&lt;N&gt; rpo_estime_min=&lt;N&gt; rpo_max_min=&lt;N&gt;</code>.<br><br>\nCalculs :<br>\n- RTO : si $rto\\_estime \\le rto\\_max$, <code>RTO=[CONFORME]</code>. Sinon, $\\Delta = rto\\_estime - rto\\_max$, <code>RTO=[DEPASSEMENT_CRITIQUE (+&lt;\\Delta&gt;min)]</code>.<br>\n- RPO : si $rpo\\_estime \\le rpo\\_max$, <code>RPO=[CONFORME]</code>. Sinon, $\\Delta = rpo\\_estime - rpo\\_max$, <code>RPO=[DEPASSEMENT_CRITIQUE (+&lt;\\Delta&gt;min)]</code>.<br>\n- Verdict global :<br>\n  - Si RTO et RPO sont tous deux conformes : <code>VERDICT=CONFORME_PCA_VALIDE</code><br>\n  - Sinon : <code>VERDICT=NON_CONFORME_PCA_REJETE</code><br><br>\nAfficher :<br>\n<code>PCA_AUDIT: &lt;service&gt; -&gt; RTO=&lt;RTO_STATUS&gt; | RPO=&lt;RPO_STATUS&gt; | VERDICT=&lt;VERDICT&gt;</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : analyser RTO et RPO face aux seuils contractuels
`,
    hints: [
      'Convertir les valeurs en entiers pour faire les comparaisons.',
      'Calculer les dépassements positifs en minutes si les seuils sont enfreints.'
    ],
    examples: [
      {
        stdin: 'RTO_RPO_AUDIT service=Paiement rto_estime_min=15 rto_max_min=30 rpo_estime_min=5 rpo_max_min=10',
        expected: 'PCA_AUDIT: Paiement -> RTO=[CONFORME] | RPO=[CONFORME] | VERDICT=CONFORME_PCA_VALIDE',
        note: 'RTO et RPO respectés : PCA validé.'
      }
    ],
    tests: [
      {
        label: 'RTO dépassé et RPO conforme',
        stdin: 'RTO_RPO_AUDIT service=Catalogue rto_estime_min=45 rto_max_min=30 rpo_estime_min=10 rpo_max_min=60',
        expected: 'PCA_AUDIT: Catalogue -> RTO=[DEPASSEMENT_CRITIQUE (+15min)] | RPO=[CONFORME] | VERDICT=NON_CONFORME_PCA_REJETE'
      },
      {
        label: 'RPO dépassé avec perte de données critique',
        stdin: 'RTO_RPO_AUDIT service=Facturation rto_estime_min=20 rto_max_min=30 rpo_estime_min=120 rpo_max_min=60',
        expected: 'PCA_AUDIT: Facturation -> RTO=[CONFORME] | RPO=[DEPASSEMENT_CRITIQUE (+60min)] | VERDICT=NON_CONFORME_PCA_REJETE'
      },
      {
        label: 'Double dépassement RTO et RPO',
        stdin: 'RTO_RPO_AUDIT service=Messagerie rto_estime_min=180 rto_max_min=60 rpo_estime_min=240 rpo_max_min=120',
        expected: 'PCA_AUDIT: Messagerie -> RTO=[DEPASSEMENT_CRITIQUE (+120min)] | RPO=[DEPASSEMENT_CRITIQUE (+120min)] | VERDICT=NON_CONFORME_PCA_REJETE'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    m = re.search(r'service=([^\\s]+)\\s+rto_estime_min=(\\d+)\\s+rto_max_min=(\\d+)\\s+rpo_estime_min=(\\d+)\\s+rpo_max_min=(\\d+)', lig)
    if not m:
        continue
    srv = m.group(1)
    rto_est = int(m.group(2))
    rto_max = int(m.group(3))
    rpo_est = int(m.group(4))
    rpo_max = int(m.group(5))
    
    if rto_est <= rto_max:
        rto_st = '[CONFORME]'
    else:
        d_rto = rto_est - rto_max
        rto_st = f'[DEPASSEMENT_CRITIQUE (+{d_rto}min)]'
        
    if rpo_est <= rpo_max:
        rpo_st = '[CONFORME]'
    else:
        d_rpo = rpo_est - rpo_max
        rpo_st = f'[DEPASSEMENT_CRITIQUE (+{d_rpo}min)]'
        
    if rto_est <= rto_max and rpo_est <= rpo_max:
        verdict = 'CONFORME_PCA_VALIDE'
    else:
        verdict = 'NON_CONFORME_PCA_REJETE'
        
    print(f"PCA_AUDIT: {srv} -> RTO={rto_st} | RPO={rpo_st} | VERDICT={verdict}")
`
  },
  {
    id: 'dt3-c3-e2',
    chapter: 3,
    title: 'Ordonnanceur de procédure d’arrêt et de démarrage d’infrastructure (Runbook DEX)',
    level: 'n2',
    language: 'python',
    goal: 'Calculer la séquence d’exécution ordonnancée des couches de composants pour un démarrage propre ou un arrêt sécurisé.',
    brief: '<p>Le script lit sur l\'entrée standard :<br>\n<code>RUNBOOK action=&lt;DEMARRAGE|ARRET&gt; couches=&lt;c1,c2,c3,...&gt;</code>.<br><br>\nRègles d\'ordonnancement d\'un Runbook système :<br>\n- Lors d\'un <code>DEMARRAGE</code> : les services doivent démarrer dans l\'ordre de leurs dépendances amont vers aval (ordre direct de la liste déclarée : $c_1 \\rightarrow c_2 \\rightarrow \\dots \\rightarrow c_N$).<br>\n- Lors d\'un <code>ARRET</code> : les services doivent être éteints dans l\'ordre strictement inverse (ordre inverse de la liste : $c_N \\rightarrow \\dots \\rightarrow c_2 \\rightarrow c_1$) pour clore d\'abord les points d\'entrée publics avant de couper les bases de données sous-jacentes.<br><br>\nAfficher :<br>\n<code>RUNBOOK_SEQUENCE: ACTION=&lt;action&gt; -&gt; ETAPES=[&lt;c_seq_separees_par_fleche&gt;]</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : ordonnancer la séquence selon l'action
`,
    hints: [
      'Pour l’action ARRET, inverser la liste avec list(reversed(couches)) ou couches[::-1].',
      'Joindre les composants avec " -> ".'
    ],
    examples: [
      {
        stdin: 'RUNBOOK action=DEMARRAGE couches=BDD,API,WEB',
        expected: 'RUNBOOK_SEQUENCE: ACTION=DEMARRAGE -> ETAPES=[BDD -> API -> WEB]',
        note: 'Démarrage de la base vers le front-end.'
      }
    ],
    tests: [
      {
        label: 'Arrêt ordonné dans le sens inverse',
        stdin: 'RUNBOOK action=ARRET couches=BDD,API,WEB',
        expected: 'RUNBOOK_SEQUENCE: ACTION=ARRET -> ETAPES=[WEB -> API -> BDD]'
      },
      {
        label: 'Infrastructure complexe à 5 couches en démarrage',
        stdin: 'RUNBOOK action=DEMARRAGE couches=STORAGE,DB_SQL,CACHE_REDIS,BACKEND,INGRESS_LB',
        expected: 'RUNBOOK_SEQUENCE: ACTION=DEMARRAGE -> ETAPES=[STORAGE -> DB_SQL -> CACHE_REDIS -> BACKEND -> INGRESS_LB]'
      },
      {
        label: 'Infrastructure complexe à 5 couches en arrêt d’urgence',
        stdin: 'RUNBOOK action=ARRET couches=STORAGE,DB_SQL,CACHE_REDIS,BACKEND,INGRESS_LB',
        expected: 'RUNBOOK_SEQUENCE: ACTION=ARRET -> ETAPES=[INGRESS_LB -> BACKEND -> CACHE_REDIS -> DB_SQL -> STORAGE]'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    m_act = re.search(r'action=([^\\s]+)', lig)
    m_c = re.search(r'couches=([^\\s]+)', lig)
    if not (m_act and m_c):
        continue
    act = m_act.group(1).upper()
    couches = [x.strip() for x in m_c.group(1).split(',') if x.strip()]
    
    if act == 'ARRET':
        seq = list(reversed(couches))
    else:  # DEMARRAGE
        seq = list(couches)
        
    chaine = ' -> '.join(seq)
    print(f"RUNBOOK_SEQUENCE: ACTION={act} -> ETAPES=[{chaine}]")
`
  },
  {
    id: 'dt3-c3-e3',
    chapter: 3,
    title: 'Analyseur de procédure de bascule de secours PRA (Failover Downtime)',
    level: 'n3',
    language: 'python',
    goal: 'Calculer le temps total d’indisponibilité prévisionnel d’une bascule de secours et vérifier sa conformité au SLA admissible.',
    brief: '<p>Le script lit sur l\'entrée standard :<br>\n<code>PRA_FAILOVER nom=&lt;nom&gt; t_detect_s=&lt;N&gt; t_decision_s=&lt;N&gt; t_bascule_s=&lt;N&gt; t_verif_s=&lt;N&gt; sla_max_s=&lt;N&gt;</code>.<br><br>\nCalculs :<br>\n- Durée totale d\'interruption :<br>\n  $T_{total} = t_{detect} + t_{decision} + t_{bascule} + t_{verif}$ (en secondes)<br>\n- Marge par rapport au SLA :<br>\n  $Marge = sla_{max} - T_{total}$<br>\n- Statut d\'évaluation :<br>\n  - Si $T_{total} \\le sla_{max}$ : <code>STATUT=SUCCES_PRA (MARGE=+&lt;Marge&gt;s)</code><br>\n  - Sinon : $\\Delta = T_{total} - sla_{max}$, <code>STATUT=ECHEC_SLA_DEPASSE (RETARD=+&lt;\\Delta&gt;s)</code><br><br>\nAfficher :<br>\n<code>PRA_DIAGNOSTIC: &lt;nom&gt; -&gt; INDISPONIBILITE=&lt;T_total&gt;s (SLA_MAX=&lt;sla_max&gt;s) | STATUT=&lt;STATUT&gt;</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer la durée totale de bascule PRA et comparer au SLA
`,
    hints: [
      'Additionner les 4 temps en secondes.',
      'Comparer la somme au sla_max_s.'
    ],
    examples: [
      {
        stdin: 'PRA_FAILOVER nom=DC_Secours t_detect_s=30 t_decision_s=60 t_bascule_s=120 t_verif_s=30 sla_max_s=300',
        expected: 'PRA_DIAGNOSTIC: DC_Secours -> INDISPONIBILITE=240s (SLA_MAX=300s) | STATUT=SUCCES_PRA (MARGE=+60s)',
        note: 'Total 240s <= 300s : succès avec 60s de marge.'
      }
    ],
    tests: [
      {
        label: 'Bascule trop lente dépassant le SLA',
        stdin: 'PRA_FAILOVER nom=ZoneB_Failover t_detect_s=45 t_decision_s=120 t_bascule_s=180 t_verif_s=60 sla_max_s=300',
        expected: 'PRA_DIAGNOSTIC: ZoneB_Failover -> INDISPONIBILITE=405s (SLA_MAX=300s) | STATUT=ECHEC_SLA_DEPASSE (RETARD=+105s)'
      },
      {
        label: 'Bascule ultra-rapide automatisée',
        stdin: 'PRA_FAILOVER nom=DNS_GSLB t_detect_s=10 t_decision_s=5 t_bascule_s=30 t_verif_s=15 sla_max_s=120',
        expected: 'PRA_DIAGNOSTIC: DNS_GSLB -> INDISPONIBILITE=60s (SLA_MAX=120s) | STATUT=SUCCES_PRA (MARGE=+60s)'
      },
      {
        label: 'Bascule juste à la limite exacte du SLA',
        stdin: 'PRA_FAILOVER nom=BasculeLimite t_detect_s=50 t_decision_s=50 t_bascule_s=50 t_verif_s=50 sla_max_s=200',
        expected: 'PRA_DIAGNOSTIC: BasculeLimite -> INDISPONIBILITE=200s (SLA_MAX=200s) | STATUT=SUCCES_PRA (MARGE=+0s)'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    m = re.search(r'nom=([^\\s]+)\\s+t_detect_s=(\\d+)\\s+t_decision_s=(\\d+)\\s+t_bascule_s=(\\d+)\\s+t_verif_s=(\\d+)\\s+sla_max_s=(\\d+)', lig)
    if not m:
        continue
    nom = m.group(1)
    t1 = int(m.group(2))
    t2 = int(m.group(3))
    t3 = int(m.group(4))
    t4 = int(m.group(5))
    sla = int(m.group(6))
    
    total = t1 + t2 + t3 + t4
    
    if total <= sla:
        marge = sla - total
        statut = f"SUCCES_PRA (MARGE=+{marge}s)"
    else:
        retard = total - sla
        statut = f"ECHEC_SLA_DEPASSE (RETARD=+{retard}s)"
        
    print(f"PRA_DIAGNOSTIC: {nom} -> INDISPONIBILITE={total}s (SLA_MAX={sla}s) | STATUT={statut}")
`
  }
];
