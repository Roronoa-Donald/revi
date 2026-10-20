/**
 * chapitre3.js — Études de cas du cours « b3-document-technique ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    id: "dt3-c3-e1",
    chapter: 3,
    level: "n1",
    language: 'analyse',
    title: "Analyseur d’objectifs de reprise d’activité (RTO & RPO) dans un DEX",
    goal: "Confronter les temps estimés de reprise (RTO) et de perte de données (RPO) aux engagements contractuels d’un plan d’exploitation.",
    brief: "<p>Pour chaque cas d’application :<br>\n<code>RTO_RPO_AUDIT service=&lt;nom&gt; rto_estime_min=&lt;N&gt; rto_max_min=&lt;N&gt; rpo_estime_min=&lt;N&gt; rpo_max_min=&lt;N&gt;</code>.<br><br>\nCalculs :<br>\n- RTO : si $rto\\_estime \\le rto\\_max$, <code>RTO=[CONFORME]</code>. Sinon, $\\Delta = rto\\_estime - rto\\_max$, <code>RTO=[DEPASSEMENT_CRITIQUE (+&lt;\\Delta&gt;min)]</code>.<br>\n- RPO : si $rpo\\_estime \\le rpo\\_max$, <code>RPO=[CONFORME]</code>. Sinon, $\\Delta = rpo\\_estime - rpo\\_max$, <code>RPO=[DEPASSEMENT_CRITIQUE (+&lt;\\Delta&gt;min)]</code>.<br>\n- Verdict global :<br>\n  - Si RTO et RPO sont tous deux conformes : <code>VERDICT=CONFORME_PCA_VALIDE</code><br>\n  - Sinon : <code>VERDICT=NON_CONFORME_PCA_REJETE</code><br><br>\nAfficher :<br>\n<code>PCA_AUDIT: &lt;service&gt; -&gt; RTO=&lt;RTO_STATUS&gt; | RPO=&lt;RPO_STATUS&gt; | VERDICT=&lt;VERDICT&gt;</code></p>",
    starter: "# Grille d'analyse (dt3-c3-e1) — Analyseur d’objectifs de reprise d’activité (RTO & RPO) dans un DEX\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — RTO dépassé et RPO conforme]\n# Données : RTO_RPO_AUDIT service=Catalogue rto_estime_min=45 rto_max_min=30 rpo_estime_min=10 rpo_max_min=60\nA_COMPLETER\n\n[Cas 2 — RPO dépassé avec perte de données critique]\n# Données : RTO_RPO_AUDIT service=Facturation rto_estime_min=20 rto_max_min=30 rpo_estime_min=120 rpo_max_min=60\nA_COMPLETER\n\n[Cas 3 — Double dépassement RTO et RPO]\n# Données : RTO_RPO_AUDIT service=Messagerie rto_estime_min=180 rto_max_min=60 rpo_estime_min=240 rpo_max_min=120\nA_COMPLETER\n",
    hints: [
          "Convertir les valeurs en entiers pour faire les comparaisons.",
          "Calculer les dépassements positifs en minutes si les seuils sont enfreints."
    ],
    examples: [
          {
                "stdin": "RTO_RPO_AUDIT service=Paiement rto_estime_min=15 rto_max_min=30 rpo_estime_min=5 rpo_max_min=10",
                "expected": "PCA_AUDIT: Paiement -> RTO=[CONFORME] | RPO=[CONFORME] | VERDICT=CONFORME_PCA_VALIDE",
                "note": "RTO et RPO respectés : PCA validé."
          }
    ],
    tests: [
          {
                "label": "RTO dépassé et RPO conforme",
                "stdin": "cas:1",
                "expected": "PCA_AUDIT: Catalogue -> RTO=[DEPASSEMENT_CRITIQUE (+15min)] | RPO=[CONFORME] | VERDICT=NON_CONFORME_PCA_REJETE"
          },
          {
                "label": "RPO dépassé avec perte de données critique",
                "stdin": "cas:2",
                "expected": "PCA_AUDIT: Facturation -> RTO=[CONFORME] | RPO=[DEPASSEMENT_CRITIQUE (+60min)] | VERDICT=NON_CONFORME_PCA_REJETE"
          },
          {
                "label": "Double dépassement RTO et RPO",
                "stdin": "cas:3",
                "expected": "PCA_AUDIT: Messagerie -> RTO=[DEPASSEMENT_CRITIQUE (+120min)] | RPO=[DEPASSEMENT_CRITIQUE (+120min)] | VERDICT=NON_CONFORME_PCA_REJETE"
          }
    ],
    solution: "[Exemple]\nPCA_AUDIT: Paiement -> RTO=[CONFORME] | RPO=[CONFORME] | VERDICT=CONFORME_PCA_VALIDE\n\n[Cas 1 — RTO dépassé et RPO conforme]\nPCA_AUDIT: Catalogue -> RTO=[DEPASSEMENT_CRITIQUE (+15min)] | RPO=[CONFORME] | VERDICT=NON_CONFORME_PCA_REJETE\n\n[Cas 2 — RPO dépassé avec perte de données critique]\nPCA_AUDIT: Facturation -> RTO=[CONFORME] | RPO=[DEPASSEMENT_CRITIQUE (+60min)] | VERDICT=NON_CONFORME_PCA_REJETE\n\n[Cas 3 — Double dépassement RTO et RPO]\nPCA_AUDIT: Messagerie -> RTO=[DEPASSEMENT_CRITIQUE (+120min)] | RPO=[DEPASSEMENT_CRITIQUE (+120min)] | VERDICT=NON_CONFORME_PCA_REJETE\n"
  },
  {
    id: "dt3-c3-e2",
    chapter: 3,
    level: "n2",
    language: 'analyse',
    title: "Ordonnanceur de procédure d’arrêt et de démarrage d’infrastructure (Runbook DEX)",
    goal: "Calculer la séquence d’exécution ordonnancée des couches de composants pour un démarrage propre ou un arrêt sécurisé.",
    brief: "<p>Pour chaque cas d’application :<br>\n<code>RUNBOOK action=&lt;DEMARRAGE|ARRET&gt; couches=&lt;c1,c2,c3,...&gt;</code>.<br><br>\nRègles d'ordonnancement d'un Runbook système :<br>\n- Lors d'un <code>DEMARRAGE</code> : les services doivent démarrer dans l'ordre de leurs dépendances amont vers aval (ordre direct de la liste déclarée : $c_1 \\rightarrow c_2 \\rightarrow \\dots \\rightarrow c_N$).<br>\n- Lors d'un <code>ARRET</code> : les services doivent être éteints dans l'ordre strictement inverse (ordre inverse de la liste : $c_N \\rightarrow \\dots \\rightarrow c_2 \\rightarrow c_1$) pour clore d'abord les points d'entrée publics avant de couper les bases de données sous-jacentes.<br><br>\nAfficher :<br>\n<code>RUNBOOK_SEQUENCE: ACTION=&lt;action&gt; -&gt; ETAPES=[&lt;c_seq_separees_par_fleche&gt;]</code></p>",
    starter: "# Grille d'analyse (dt3-c3-e2) — Ordonnanceur de procédure d’arrêt et de démarrage d’infrastructure (Runbook DEX)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Arrêt ordonné dans le sens inverse]\n# Données : RUNBOOK action=ARRET couches=BDD,API,WEB\nA_COMPLETER\n\n[Cas 2 — Infrastructure complexe à 5 couches en démarrage]\n# Données : RUNBOOK action=DEMARRAGE couches=STORAGE,DB_SQL,CACHE_REDIS,BACKEND,INGRESS_LB\nA_COMPLETER\n\n[Cas 3 — Infrastructure complexe à 5 couches en arrêt d’urgence]\n# Données : RUNBOOK action=ARRET couches=STORAGE,DB_SQL,CACHE_REDIS,BACKEND,INGRESS_LB\nA_COMPLETER\n",
    hints: [
          "Pour l’action ARRET, inverser la liste avec list(reversed(couches)) ou couches[::-1].",
          "Joindre les composants avec \" -> \"."
    ],
    examples: [
          {
                "stdin": "RUNBOOK action=DEMARRAGE couches=BDD,API,WEB",
                "expected": "RUNBOOK_SEQUENCE: ACTION=DEMARRAGE -> ETAPES=[BDD -> API -> WEB]",
                "note": "Démarrage de la base vers le front-end."
          }
    ],
    tests: [
          {
                "label": "Arrêt ordonné dans le sens inverse",
                "stdin": "cas:1",
                "expected": "RUNBOOK_SEQUENCE: ACTION=ARRET -> ETAPES=[WEB -> API -> BDD]"
          },
          {
                "label": "Infrastructure complexe à 5 couches en démarrage",
                "stdin": "cas:2",
                "expected": "RUNBOOK_SEQUENCE: ACTION=DEMARRAGE -> ETAPES=[STORAGE -> DB_SQL -> CACHE_REDIS -> BACKEND -> INGRESS_LB]"
          },
          {
                "label": "Infrastructure complexe à 5 couches en arrêt d’urgence",
                "stdin": "cas:3",
                "expected": "RUNBOOK_SEQUENCE: ACTION=ARRET -> ETAPES=[INGRESS_LB -> BACKEND -> CACHE_REDIS -> DB_SQL -> STORAGE]"
          }
    ],
    solution: "[Exemple]\nRUNBOOK_SEQUENCE: ACTION=DEMARRAGE -> ETAPES=[BDD -> API -> WEB]\n\n[Cas 1 — Arrêt ordonné dans le sens inverse]\nRUNBOOK_SEQUENCE: ACTION=ARRET -> ETAPES=[WEB -> API -> BDD]\n\n[Cas 2 — Infrastructure complexe à 5 couches en démarrage]\nRUNBOOK_SEQUENCE: ACTION=DEMARRAGE -> ETAPES=[STORAGE -> DB_SQL -> CACHE_REDIS -> BACKEND -> INGRESS_LB]\n\n[Cas 3 — Infrastructure complexe à 5 couches en arrêt d’urgence]\nRUNBOOK_SEQUENCE: ACTION=ARRET -> ETAPES=[INGRESS_LB -> BACKEND -> CACHE_REDIS -> DB_SQL -> STORAGE]\n"
  },
  {
    id: "dt3-c3-e3",
    chapter: 3,
    level: "n3",
    language: 'analyse',
    title: "Analyseur de procédure de bascule de secours PRA (Failover Downtime)",
    goal: "Calculer le temps total d’indisponibilité prévisionnel d’une bascule de secours et vérifier sa conformité au SLA admissible.",
    brief: "<p>Pour chaque cas d’application :<br>\n<code>PRA_FAILOVER nom=&lt;nom&gt; t_detect_s=&lt;N&gt; t_decision_s=&lt;N&gt; t_bascule_s=&lt;N&gt; t_verif_s=&lt;N&gt; sla_max_s=&lt;N&gt;</code>.<br><br>\nCalculs :<br>\n- Durée totale d'interruption :<br>\n  $T_{total} = t_{detect} + t_{decision} + t_{bascule} + t_{verif}$ (en secondes)<br>\n- Marge par rapport au SLA :<br>\n  $Marge = sla_{max} - T_{total}$<br>\n- Statut d'évaluation :<br>\n  - Si $T_{total} \\le sla_{max}$ : <code>STATUT=SUCCES_PRA (MARGE=+&lt;Marge&gt;s)</code><br>\n  - Sinon : $\\Delta = T_{total} - sla_{max}$, <code>STATUT=ECHEC_SLA_DEPASSE (RETARD=+&lt;\\Delta&gt;s)</code><br><br>\nAfficher :<br>\n<code>PRA_DIAGNOSTIC: &lt;nom&gt; -&gt; INDISPONIBILITE=&lt;T_total&gt;s (SLA_MAX=&lt;sla_max&gt;s) | STATUT=&lt;STATUT&gt;</code></p>",
    starter: "# Grille d'analyse (dt3-c3-e3) — Analyseur de procédure de bascule de secours PRA (Failover Downtime)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Bascule trop lente dépassant le SLA]\n# Données : PRA_FAILOVER nom=ZoneB_Failover t_detect_s=45 t_decision_s=120 t_bascule_s=180 t_verif_s=60 sla_max_s=300\nA_COMPLETER\n\n[Cas 2 — Bascule ultra-rapide automatisée]\n# Données : PRA_FAILOVER nom=DNS_GSLB t_detect_s=10 t_decision_s=5 t_bascule_s=30 t_verif_s=15 sla_max_s=120\nA_COMPLETER\n\n[Cas 3 — Bascule juste à la limite exacte du SLA]\n# Données : PRA_FAILOVER nom=BasculeLimite t_detect_s=50 t_decision_s=50 t_bascule_s=50 t_verif_s=50 sla_max_s=200\nA_COMPLETER\n",
    hints: [
          "Additionner les 4 temps en secondes.",
          "Comparer la somme au sla_max_s."
    ],
    examples: [
          {
                "stdin": "PRA_FAILOVER nom=DC_Secours t_detect_s=30 t_decision_s=60 t_bascule_s=120 t_verif_s=30 sla_max_s=300",
                "expected": "PRA_DIAGNOSTIC: DC_Secours -> INDISPONIBILITE=240s (SLA_MAX=300s) | STATUT=SUCCES_PRA (MARGE=+60s)",
                "note": "Total 240s <= 300s : succès avec 60s de marge."
          }
    ],
    tests: [
          {
                "label": "Bascule trop lente dépassant le SLA",
                "stdin": "cas:1",
                "expected": "PRA_DIAGNOSTIC: ZoneB_Failover -> INDISPONIBILITE=405s (SLA_MAX=300s) | STATUT=ECHEC_SLA_DEPASSE (RETARD=+105s)"
          },
          {
                "label": "Bascule ultra-rapide automatisée",
                "stdin": "cas:2",
                "expected": "PRA_DIAGNOSTIC: DNS_GSLB -> INDISPONIBILITE=60s (SLA_MAX=120s) | STATUT=SUCCES_PRA (MARGE=+60s)"
          },
          {
                "label": "Bascule juste à la limite exacte du SLA",
                "stdin": "cas:3",
                "expected": "PRA_DIAGNOSTIC: BasculeLimite -> INDISPONIBILITE=200s (SLA_MAX=200s) | STATUT=SUCCES_PRA (MARGE=+0s)"
          }
    ],
    solution: "[Exemple]\nPRA_DIAGNOSTIC: DC_Secours -> INDISPONIBILITE=240s (SLA_MAX=300s) | STATUT=SUCCES_PRA (MARGE=+60s)\n\n[Cas 1 — Bascule trop lente dépassant le SLA]\nPRA_DIAGNOSTIC: ZoneB_Failover -> INDISPONIBILITE=405s (SLA_MAX=300s) | STATUT=ECHEC_SLA_DEPASSE (RETARD=+105s)\n\n[Cas 2 — Bascule ultra-rapide automatisée]\nPRA_DIAGNOSTIC: DNS_GSLB -> INDISPONIBILITE=60s (SLA_MAX=120s) | STATUT=SUCCES_PRA (MARGE=+60s)\n\n[Cas 3 — Bascule juste à la limite exacte du SLA]\nPRA_DIAGNOSTIC: BasculeLimite -> INDISPONIBILITE=200s (SLA_MAX=200s) | STATUT=SUCCES_PRA (MARGE=+0s)\n"
  }
];
