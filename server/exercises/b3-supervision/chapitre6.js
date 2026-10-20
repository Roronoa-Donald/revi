'use strict';

module.exports = [
  {
    "id": "sup3-c6-e1",
    "chapter": 6,
    "title": "Détecteur de Flapping et Filtrage Anti-Fatigue d’Alertes",
    "level": "n1",
    "language": "analyse",
    "goal": "Calculer le taux d'oscillation d'un état de service pour suspendre les alertes intempestives en cas de flapping.",
    "brief": "<p>Le flapping se produit lorsqu'un service bascule à répétition entre les états <code>OK</code> et <code>CRITICAL</code>.<br><br>\nCalcul du taux d'oscillation sur $N$ observations ($N &gt;= 2$) :<br>\n- <code>transitions</code> : nombre de changements d'état entre observations consécutives (<code>state[i] != state[i-1]</code>).<br>\n- <code>oscillation_pct = (transitions / (N - 1)) * 100.0</code>.<br><br>\nRègles :<br>\n- Si <code>oscillation_pct &gt;= THRESHOLD</code> : <code>flapping=YES suppress=YES</code>.<br>\n- Sinon : <code>flapping=NO suppress=NO</code>.<br><br>\nEntrée STDIN : <code>FLAP_CHECK SERVICE=&lt;nom&gt; THRESHOLD=&lt;pct&gt; STATES=&lt;s1,s2,...&gt;</code>.<br>\nSortie : <code>FLAP_STATUS: service=&lt;nom&gt; checks=&lt;N&gt; transitions=&lt;t&gt; oscillation=&lt;osc_pct:.1f&gt;% flapping=&lt;YES|NO&gt; suppress=&lt;YES|NO&gt;</code>.</p>",
    "starter": "# Grille d'analyse (sup3-c6-e1) — Détecteur de Flapping et Filtrage Anti-Fatigue d’Alertes\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Une seule transition isolée sur 6 vérifications]\n# Données : FLAP_CHECK SERVICE=db-cluster THRESHOLD=30.0 STATES=OK,OK,OK,OK,OK,CRITICAL\nA_COMPLETER\n\n[Cas 2 — Service parfaitement stable sans transition]\n# Données : FLAP_CHECK SERVICE=dns-resolver THRESHOLD=20.0 STATES=OK,OK,OK\nA_COMPLETER\n\n[Cas 3 — Flapping modéré dépassant le seuil de 40%]\n# Données : FLAP_CHECK SERVICE=auth-proxy THRESHOLD=40.0 STATES=OK,CRITICAL,OK,OK,CRITICAL\nA_COMPLETER\n",
    "hints": [
      "Parcourez la liste des états de 1 à N-1 pour dénombrer les basculements.",
      "Divisez par (N - 1) pour obtenir le pourcentage d'oscillation."
    ],
    "examples": [
      {
        "stdin": "FLAP_CHECK SERVICE=api-gateway THRESHOLD=25.0 STATES=OK,CRITICAL,OK,CRITICAL,OK,CRITICAL",
        "expected": "FLAP_STATUS: service=api-gateway checks=6 transitions=5 oscillation=100.0% flapping=YES suppress=YES",
        "note": "5 transitions sur 5 intervalles possibles : 100% d'oscillation (flapping actif)."
      }
    ],
    "tests": [
      {
        "label": "Une seule transition isolée sur 6 vérifications",
        "stdin": "cas:1",
        "expected": "FLAP_STATUS: service=db-cluster checks=6 transitions=1 oscillation=20.0% flapping=NO suppress=NO\n"
      },
      {
        "label": "Service parfaitement stable sans transition",
        "stdin": "cas:2",
        "expected": "FLAP_STATUS: service=dns-resolver checks=3 transitions=0 oscillation=0.0% flapping=NO suppress=NO\n"
      },
      {
        "label": "Flapping modéré dépassant le seuil de 40%",
        "stdin": "cas:3",
        "expected": "FLAP_STATUS: service=auth-proxy checks=5 transitions=3 oscillation=75.0% flapping=YES suppress=YES\n"
      }
    ],
    "solution": "[Exemple]\nFLAP_STATUS: service=api-gateway checks=6 transitions=5 oscillation=100.0% flapping=YES suppress=YES\n\n[Cas 1 — Une seule transition isolée sur 6 vérifications]\nFLAP_STATUS: service=db-cluster checks=6 transitions=1 oscillation=20.0% flapping=NO suppress=NO\n\n\n[Cas 2 — Service parfaitement stable sans transition]\nFLAP_STATUS: service=dns-resolver checks=3 transitions=0 oscillation=0.0% flapping=NO suppress=NO\n\n\n[Cas 3 — Flapping modéré dépassant le seuil de 40%]\nFLAP_STATUS: service=auth-proxy checks=5 transitions=3 oscillation=75.0% flapping=YES suppress=YES"
  },
  {
    "id": "sup3-c6-e2",
    "chapter": 6,
    "title": "Capacity Planning et Prédiction Linéaire de Saturation Disque",
    "level": "n2",
    "language": "analyse",
    "goal": "Prédire par régression linéaire le nombre de jours restants avant saturation d'un volume de stockage.",
    "brief": "<p>La métrologie prédictive calcule la vitesse d'accroissement journalier d'une ressource :<br><br>\nPour $N$ mesures journalières $y_i$ aux indices $x_i = 0, 1, dots, N-1$ :<br>\n- <code>Pente a = Somme((x_i - x_mean) * (y_i - y_mean)) / Somme((x_i - x_mean)^2)</code>.<br>\n- Si <code>a &gt; 0.0001</code> :<br>\n  - <code>days_to_warn = ceil(max(0, (CAPACITY * WARN_PCT / 100.0) - current) / a)</code>.<br>\n  - <code>days_to_full = ceil(max(0, CAPACITY - current) / a)</code>.<br>\n- Sinon (croissance nulle ou décroissance) :<br>\n  - <code>days_to_warn = NONE</code> et <code>days_to_full = NONE</code>.<br><br>\nEntrée STDIN : <code>CAPACITY_PREDICT CAPACITY_GB=&lt;cap&gt; WARN_PCT=&lt;warn&gt; USAGE_GB=&lt;u1,u2,...&gt;</code>.<br>\nSortie : <code>CAPACITY: growth_gb_day=&lt;a:.2f&gt; current_gb=&lt;curr:.1f&gt; usage=&lt;curr_pct:.1f&gt;% days_to_warn=&lt;days_warn&gt; days_to_full=&lt;days_full&gt;</code>.</p>",
    "starter": "# Grille d'analyse (sup3-c6-e2) — Capacity Planning et Prédiction Linéaire de Saturation Disque\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Alerte immédiate car seuil 90% déjà atteint]\n# Données : CAPACITY_PREDICT CAPACITY_GB=500.0 WARN_PCT=90.0 USAGE_GB=440.0,445.0,450.0\nA_COMPLETER\n\n[Cas 2 — Consommation en baisse aucun risque de saturation]\n# Données : CAPACITY_PREDICT CAPACITY_GB=200.0 WARN_PCT=80.0 USAGE_GB=150.0,148.0,145.0\nA_COMPLETER\n\n[Cas 3 — Forte accélération sur 4 jours]\n# Données : CAPACITY_PREDICT CAPACITY_GB=100.0 WARN_PCT=80.0 USAGE_GB=40.0,50.0,60.0,70.0\nA_COMPLETER\n",
    "hints": [
      "Calculez la moyenne des x (indices 0 à N-1) et la moyenne des y (valeurs d'usage).",
      "Utilisez math.ceil pour arrondir les jours restants vers l'entier supérieur."
    ],
    "examples": [
      {
        "stdin": "CAPACITY_PREDICT CAPACITY_GB=1000.0 WARN_PCT=90.0 USAGE_GB=700.0,710.0,720.0,730.0,740.0",
        "expected": "CAPACITY: growth_gb_day=10.00 current_gb=740.0 usage=74.0% days_to_warn=16 days_to_full=26",
        "note": "Croissance de 10 Go/jour : alerte 900 Go dans 16 jours, plein dans 26 jours."
      }
    ],
    "tests": [
      {
        "label": "Alerte immédiate car seuil 90% déjà atteint",
        "stdin": "cas:1",
        "expected": "CAPACITY: growth_gb_day=5.00 current_gb=450.0 usage=90.0% days_to_warn=0 days_to_full=10\n"
      },
      {
        "label": "Consommation en baisse aucun risque de saturation",
        "stdin": "cas:2",
        "expected": "CAPACITY: growth_gb_day=0.00 current_gb=145.0 usage=72.5% days_to_warn=NONE days_to_full=NONE\n"
      },
      {
        "label": "Forte accélération sur 4 jours",
        "stdin": "cas:3",
        "expected": "CAPACITY: growth_gb_day=10.00 current_gb=70.0 usage=70.0% days_to_warn=1 days_to_full=3\n"
      }
    ],
    "solution": "[Exemple]\nCAPACITY: growth_gb_day=10.00 current_gb=740.0 usage=74.0% days_to_warn=16 days_to_full=26\n\n[Cas 1 — Alerte immédiate car seuil 90% déjà atteint]\nCAPACITY: growth_gb_day=5.00 current_gb=450.0 usage=90.0% days_to_warn=0 days_to_full=10\n\n\n[Cas 2 — Consommation en baisse aucun risque de saturation]\nCAPACITY: growth_gb_day=0.00 current_gb=145.0 usage=72.5% days_to_warn=NONE days_to_full=NONE\n\n\n[Cas 3 — Forte accélération sur 4 jours]\nCAPACITY: growth_gb_day=10.00 current_gb=70.0 usage=70.0% days_to_warn=1 days_to_full=3"
  },
  {
    "id": "sup3-c6-e3",
    "chapter": 6,
    "title": "Moteur d’Auto-Remédiation et Exécution de Runbooks",
    "level": "n3",
    "language": "analyse",
    "goal": "Déclencher automatiquement une action corrective de runbook selon l'incident tout en appliquant les garde-fous de réessais.",
    "brief": "<p>L'auto-remédiation (*Event-Driven Automation*) automatise la résolution d'incidents récurrents :<br><br>\nMatrice des Runbooks :<br>\n- <code>SERVICE_DEAD</code> : <code>action=restart_service</code>.<br>\n- <code>DISK_SPACE_LOW</code> : <code>action=purge_tmp_logs</code>.<br>\n- <code>HIGH_QUEUE_BACKLOG</code> : <code>action=scale_worker_pool</code>.<br>\n- Toute autre alerte : <code>action=NONE</code>.<br><br>\nGarde-fous opérationnels :<br>\n- Si <code>action == NONE</code> : <code>dispatched=NO escalate=YES reason=NO_RUNBOOK</code>.<br>\n- Sinon si <code>ATTEMPTS &gt;= MAX_RETRIES</code> : <code>dispatched=NO escalate=YES reason=MAX_RETRIES_EXCEEDED</code>.<br>\n- Sinon : <code>dispatched=YES escalate=NO reason=RUNBOOK_DISPATCHED</code>.<br><br>\nEntrée STDIN : <code>REMEDIATE INCIDENT=&lt;id&gt; ALERT=&lt;type&gt; HOST=&lt;host&gt; ATTEMPTS=&lt;n&gt; MAX_RETRIES=&lt;m&gt;</code>.<br>\nSortie : <code>REMEDIATION: incident=&lt;id&gt; action=&lt;action&gt; host=&lt;host&gt; dispatched=&lt;YES|NO&gt; escalate=&lt;YES|NO&gt; reason=&lt;reason&gt;</code>.</p>",
    "starter": "# Grille d'analyse (sup3-c6-e3) — Moteur d’Auto-Remédiation et Exécution de Runbooks\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Quota de réessais atteint escalade vers ingénieur]\n# Données : REMEDIATE INCIDENT=REM-402 ALERT=SERVICE_DEAD HOST=srv-web02 ATTEMPTS=3 MAX_RETRIES=3\nA_COMPLETER\n\n[Cas 2 — Alerte inconnue sans runbook associé]\n# Données : REMEDIATE INCIDENT=REM-403 ALERT=KERNEL_PANIC HOST=core-gw ATTEMPTS=0 MAX_RETRIES=3\nA_COMPLETER\n\n[Cas 3 — Purge des logs temporaires sur disque saturé]\n# Données : REMEDIATE INCIDENT=REM-404 ALERT=DISK_SPACE_LOW HOST=db-node01 ATTEMPTS=1 MAX_RETRIES=2\nA_COMPLETER\n",
    "hints": [
      "Vérifiez d'abord si l'alerte a un runbook associé.",
      "Si le nombre de tentatives ATTEMPTS est >= MAX_RETRIES, déclenchez l'escalade humaine."
    ],
    "examples": [
      {
        "stdin": "REMEDIATE INCIDENT=REM-401 ALERT=SERVICE_DEAD HOST=srv-web02 ATTEMPTS=0 MAX_RETRIES=3",
        "expected": "REMEDIATION: incident=REM-401 action=restart_service host=srv-web02 dispatched=YES escalate=NO reason=RUNBOOK_DISPATCHED",
        "note": "Première tentative : le redémarrage du service est déclenché."
      }
    ],
    "tests": [
      {
        "label": "Quota de réessais atteint escalade vers ingénieur",
        "stdin": "cas:1",
        "expected": "REMEDIATION: incident=REM-402 action=restart_service host=srv-web02 dispatched=NO escalate=YES reason=MAX_RETRIES_EXCEEDED\n"
      },
      {
        "label": "Alerte inconnue sans runbook associé",
        "stdin": "cas:2",
        "expected": "REMEDIATION: incident=REM-403 action=NONE host=core-gw dispatched=NO escalate=YES reason=NO_RUNBOOK\n"
      },
      {
        "label": "Purge des logs temporaires sur disque saturé",
        "stdin": "cas:3",
        "expected": "REMEDIATION: incident=REM-404 action=purge_tmp_logs host=db-node01 dispatched=YES escalate=NO reason=RUNBOOK_DISPATCHED\n"
      }
    ],
    "solution": "[Exemple]\nREMEDIATION: incident=REM-401 action=restart_service host=srv-web02 dispatched=YES escalate=NO reason=RUNBOOK_DISPATCHED\n\n[Cas 1 — Quota de réessais atteint escalade vers ingénieur]\nREMEDIATION: incident=REM-402 action=restart_service host=srv-web02 dispatched=NO escalate=YES reason=MAX_RETRIES_EXCEEDED\n\n\n[Cas 2 — Alerte inconnue sans runbook associé]\nREMEDIATION: incident=REM-403 action=NONE host=core-gw dispatched=NO escalate=YES reason=NO_RUNBOOK\n\n\n[Cas 3 — Purge des logs temporaires sur disque saturé]\nREMEDIATION: incident=REM-404 action=purge_tmp_logs host=db-node01 dispatched=YES escalate=NO reason=RUNBOOK_DISPATCHED"
  }
];
