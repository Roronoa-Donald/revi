'use strict';

module.exports = [
  {
    "id": "sup3-c1-e1",
    "chapter": 1,
    "title": "Calculateur de Disponibilité SLA, MTBF et MTTR",
    "level": "n1",
    "language": "analyse",
    "goal": "Calculer les indicateurs fondamentaux de fiabilité et de maintenabilité opérationnelle : MTBF, MTTR et taux de disponibilité globale.",
    "brief": "<p>Pour cette grille, estimez le MTTR par indisponibilité totale divisée par nombre de pannes, et le MTBF par temps de fonctionnement divisé par nombre de pannes. Ces rapports dépendent de la définition des incidents et de la fenêtre observée. Si aucune panne n’est observée, les deux rapports sont <code>non_calculable</code> : ne les remplacez pas par zéro ou par la durée de la fenêtre.<br><br>\nDisponibilité = temps de fonctionnement / durée totale × 100. Données : <code>SLA_CALC TOTAL_HOURS=&lt;h&gt; OUTAGES=&lt;m1,m2,...|NONE&gt;</code> ; les coupures sont exprimées en minutes.<br>\nFormat : <code>SLA: uptime_hours=&lt;up:.2f&gt; downtime_hours=&lt;down:.2f&gt; failures=&lt;n&gt; mttr_hours=&lt;mttr:.2f|non_calculable&gt; mtbf_hours=&lt;mtbf:.2f|non_calculable&gt; availability=&lt;pct:.4f&gt;%</code>.</p>",
    "starter": "# Grille d'analyse (sup3-c1-e1) — Calculateur de Disponibilité SLA, MTBF et MTTR\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Mois parfait sans aucune panne]\n# Données : SLA_CALC TOTAL_HOURS=720 OUTAGES=NONE\nA_COMPLETER\n\n[Cas 2 — Trois pannes cumulées sur une semaine de 168h]\n# Données : SLA_CALC TOTAL_HOURS=168 OUTAGES=120,60,180\nA_COMPLETER\n\n[Cas 3 — Une seule coupure de 26 minutes sur une année complète (8760h)]\n# Données : SLA_CALC TOTAL_HOURS=8760 OUTAGES=26\nA_COMPLETER\n",
    "hints": [
      "Convertissez les minutes de coupure en heures en divisant par 60.0.",
      "Pour OUTAGES=NONE, indiquez non_calculable pour les deux rapports.",
      "Calculez MTBF = temps_fonctionnement / nb_pannes, MTTR = temps_arret / nb_pannes puis disponibilité = uptime / (uptime + downtime) * 100."
    ],
    "examples": [
      {
        "stdin": "SLA_CALC TOTAL_HOURS=720 OUTAGES=45,15",
        "expected": "SLA: uptime_hours=719.00 downtime_hours=1.00 failures=2 mttr_hours=0.50 mtbf_hours=359.50 availability=99.8611%",
        "note": "Cas d'usage nominal avec 2 pannes sur un mois de 720h."
      }
    ],
    "tests": [
      {
        "label": "Mois parfait sans aucune panne",
        "stdin": "cas:1",
        "expected": "SLA: uptime_hours=720.00 downtime_hours=0.00 failures=0 mttr_hours=non_calculable mtbf_hours=non_calculable availability=100.0000%\n"
      },
      {
        "label": "Trois pannes cumulées sur une semaine de 168h",
        "stdin": "cas:2",
        "expected": "SLA: uptime_hours=162.00 downtime_hours=6.00 failures=3 mttr_hours=2.00 mtbf_hours=54.00 availability=96.4286%\n"
      },
      {
        "label": "Une seule coupure de 26 minutes sur une année complète (8760h)",
        "stdin": "cas:3",
        "expected": "SLA: uptime_hours=8759.57 downtime_hours=0.43 failures=1 mttr_hours=0.43 mtbf_hours=8759.57 availability=99.9951%\n"
      }
    ],
    "solution": "[Exemple]\nSLA: uptime_hours=719.00 downtime_hours=1.00 failures=2 mttr_hours=0.50 mtbf_hours=359.50 availability=99.8611%\n\n[Cas 1 — Mois parfait sans aucune panne]\nSLA: uptime_hours=720.00 downtime_hours=0.00 failures=0 mttr_hours=non_calculable mtbf_hours=non_calculable availability=100.0000%\n\n\n[Cas 2 — Trois pannes cumulées sur une semaine de 168h]\nSLA: uptime_hours=162.00 downtime_hours=6.00 failures=3 mttr_hours=2.00 mtbf_hours=54.00 availability=96.4286%\n\n\n[Cas 3 — Une seule coupure de 26 minutes sur une année complète (8760h)]\nSLA: uptime_hours=8759.57 downtime_hours=0.43 failures=1 mttr_hours=0.43 mtbf_hours=8759.57 availability=99.9951%",
    "takeaway": "À retenir : Calculer les indicateurs fondamentaux de fiabilité et de maintenabilité opérationnelle : MTBF, MTTR et taux de disponibilité globale.\nRepère : Cas d'usage nominal avec 2 pannes sur un mois de 720h."
  },
  {
    "id": "sup3-c1-e2",
    "chapter": 1,
    "level": "n2",
    "language": "analyse",
    "title": "MTBF et MTTR du service de paiement PayFlux",
    "exampleTitle": "Exemple résolu — le service de suivi des colis ColiSuivi",
    "goal": "Calculer MTTR, MTBF et disponibilité d'un service à partir d'un journal d'incidents datés.",
    "brief": "<p><strong>Énoncé.</strong> L'équipe exploitation du prestataire de paiement PayFlux observe le service d'autorisation des transactions pendant le premier trimestre, soit <strong>90 jours = 129 600 minutes</strong>. Le journal des incidents du trimestre est le suivant :</p><table><tr><th>Incident</th><th>Date</th><th>Service touché</th><th>Durée d'indisponibilité</th></tr><tr><th>I-1042</th><td>3 janvier</td><td>autorisation des paiements</td><td>40 min</td></tr><tr><th>I-1051</th><td>21 janvier</td><td>autorisation des paiements</td><td>25 min</td></tr><tr><th>I-1063</th><td>9 février</td><td>autorisation des paiements</td><td>55 min</td></tr><tr><th>I-1077</th><td>2 mars</td><td>autorisation des paiements</td><td>30 min</td></tr></table><p>Rappels du cours : MTTR = durée totale d'indisponibilité / nombre de pannes ; MTBF = temps de fonctionnement / nombre de pannes ; disponibilité = temps de fonctionnement / durée totale × 100.</p><p>Répondez par le nombre seul.</p><ol><li>Combien de pannes le service a-t-il connues sur le trimestre ?</li><li>Quel est le temps de fonctionnement total, en minutes ?</li><li>Quel est le MTTR, en minutes ?</li><li>Quel est le MTBF, en minutes ?</li><li>Quelle est la disponibilité du trimestre, arrondie à 4 décimales (en pourcentage) ?</li></ol>",
    "starter": "# Exercice — MTBF et MTTR du service de paiement PayFlux\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Toutes les réponses sont des nombres seuls.\n\n[Question 1 — Nombre de pannes]\nA_COMPLETER\n\n[Question 2 — Temps de fonctionnement total (en minutes)]\nA_COMPLETER\n\n[Question 3 — MTTR (en minutes)]\nA_COMPLETER\n\n[Question 4 — MTBF (en minutes)]\nA_COMPLETER\n\n[Question 5 — Disponibilité du trimestre (en %, 4 décimales)]\nA_COMPLETER\n",
    "hints": [
      "Le temps de fonctionnement est la durée totale de la fenêtre moins la somme des indisponibilités.",
      "MTTR et MTBF se divisent tous deux par le nombre de pannes ; seule la grandeur divisée change : la coupure pour le MTTR, le fonctionnement pour le MTBF.",
      "1. Somme des coupures : 40 + 25 + 55 + 30. 2. Fonctionnement = 129 600 − coupure. 3. MTTR = coupure / 4. 4. MTBF = fonctionnement / 4. 5. Disponibilité = fonctionnement / 129 600 × 100."
    ],
    "examples": [
      {
        "stdin": "Le service de suivi des colis ColiSuivi est observé pendant 30 jours (43 200 minutes).\nTrois pannes : 60 minutes, 30 minutes et 30 minutes.\n\n1) Trois pannes.\n2) Fonctionnement : 43 200 − 120 = 43 080 minutes.\n3) MTTR : 120 / 3 = 40 minutes.\n4) MTBF : 43 080 / 3 = 14 360 minutes.\n5) Disponibilité : 43 080 / 43 200 × 100 = 99,7222 %.",
        "expected": "3 pannes — 43 080 minutes de fonctionnement — MTTR 40 minutes — MTBF 14 360 minutes — disponibilité 99,7222 %",
        "note": "La cohérence se vérifie toujours : MTBF + MTTR = durée totale / nombre de pannes, ici 14 360 + 40 = 14 400 = 43 200 / 3."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre de pannes",
        "stdin": "q:1",
        "expected": "4||quatre"
      },
      {
        "label": "Question 2 — Temps de fonctionnement total (en minutes)",
        "stdin": "q:2",
        "expected": "129450||129 450"
      },
      {
        "label": "Question 3 — MTTR (en minutes)",
        "stdin": "q:3",
        "expected": "37,5||37.5"
      },
      {
        "label": "Question 4 — MTBF (en minutes)",
        "stdin": "q:4",
        "expected": "32362,5||32 362,5||32362.5"
      },
      {
        "label": "Question 5 — Disponibilité du trimestre (en %, 4 décimales)",
        "stdin": "q:5",
        "expected": "99,8843||99.8843"
      }
    ],
    "solution": "[Question 1 — Nombre de pannes]\n4\n\n[Question 2 — Temps de fonctionnement total (en minutes)]\n129450\n\n[Question 3 — MTTR (en minutes)]\n37,5\n\n[Question 4 — MTBF (en minutes)]\n32362,5\n\n[Question 5 — Disponibilité du trimestre (en %, 4 décimales)]\n99,8843",
    "takeaway": "1) Le journal compte quatre incidents : I-1042, I-1051, I-1063 et I-1077.\n2) Coupure totale : 40 + 25 + 55 + 30 = 150 minutes ; fonctionnement : 129 600 − 150 = 129 450 minutes.\n3) MTTR : 150 / 4 = 37,5 minutes.\n4) MTBF : 129 450 / 4 = 32 362,5 minutes.\n5) Disponibilité : 129 450 / 129 600 × 100 = 99,8843 %.\nContrôle : MTBF + MTTR = 32 362,5 + 37,5 = 32 400 = 129 600 / 4 : la relation fondamentale entre les deux indicateurs est vérifiée."
  },
  {
    "id": "sup3-c1-e3",
    "chapter": 1,
    "title": "Auditeur de Respect SLO et Budget d’Erreur (Error Budget)",
    "level": "n3",
    "language": "analyse",
    "goal": "Vérifier la consommation du budget d'indisponibilité alloué par un objectif de niveau de service (SLO).",
    "brief": "<p>Dans cette grille SRE / DevOps, le budget d'erreur est la marge d'indisponibilité compatible avec un objectif de niveau de service (SLO). Un SLA est un accord de niveau de service, éventuellement contractuel : le dépassement d'un SLO ne prouve pas à lui seul une violation contractuelle. Source : <a href=\"https://sre.google/sre-book/service-level-objectives/\">Google SRE</a>, consultée le 30 octobre 2026.<br><br>\nOn suppose <code>SLO</code> compris entre 0 inclus et strictement inférieur à 100, <code>PERIOD_DAYS</code> positif, et des durées de coupures non négatives et sans chevauchement. Si SLO vaut 100, le budget autorisé est nul et le pourcentage est non défini : ce cas est hors de la grille.<br><br>\n1. <code>Minutes_totales = PERIOD_DAYS * 24 * 60</code>.<br>\n2. <code>Budget_autorisé_minutes = Minutes_totales * (1.0 - (SLO / 100.0))</code>.<br>\n3. <code>Budget_consommé_minutes = Somme(durées_coupures_minutes)</code>.<br>\n4. <code>Budget_restant_minutes = Budget_autorisé - Budget_consommé</code>.<br>\n5. <code>Pourcentage_consommé = (Budget_consommé / Budget_autorisé) * 100.0</code>.<br>\n6. Statut : <code>COMPLIANT</code> si consommé &lt;= autorisé, sinon <code>BREACHED</code>, par rapport au SLO de la grille.<br><br>\nDonnées du cas : <code>ERROR_BUDGET SLO=&lt;pct&gt; PERIOD_DAYS=&lt;j&gt; OUTAGES=&lt;m1,m2,...|NONE&gt;</code>.<br>\nRésultat d’analyse attendu : <code>BUDGET: period_days=&lt;j&gt; allowed_min=&lt;all:.1f&gt; consumed_min=&lt;cons:.1f&gt; remaining_min=&lt;rem:.1f&gt; consumed_pct=&lt;pct:.2f&gt;% status=&lt;COMPLIANT|BREACHED&gt;</code>.</p>",
    "starter": "# Grille d'analyse (sup3-c1-e3) — Auditeur de Respect SLO et Budget d’Erreur (Error Budget)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Dépassement du budget sur un mois à 99.95%]\n# Données : ERROR_BUDGET SLO=99.95 PERIOD_DAYS=30 OUTAGES=15,10\nA_COMPLETER\n\n[Cas 2 — Semaine parfaite sans coupure à 99.0%]\n# Données : ERROR_BUDGET SLO=99.0 PERIOD_DAYS=7 OUTAGES=NONE\nA_COMPLETER\n\n[Cas 3 — Budget exactement consommé à 100%]\n# Données : ERROR_BUDGET SLO=99.9 PERIOD_DAYS=10 OUTAGES=14.4\nA_COMPLETER\n",
    "hints": [
      "Calculez le nombre total de minutes sur la période.",
      "Arrondissez allowed_min, consumed_min et remaining_min à 1 décimale, consumed_pct à 2 décimales.",
      "Convertissez le pourcentage de SLO en budget d erreur mensuel (minutes totales * (1 - SLO)), puis comparez avec la consommation cumulée pour donner l état."
    ],
    "examples": [
      {
        "stdin": "ERROR_BUDGET SLO=99.9 PERIOD_DAYS=30 OUTAGES=12,18,5",
        "expected": "BUDGET: period_days=30 allowed_min=43.2 consumed_min=35.0 remaining_min=8.2 consumed_pct=81.02% status=COMPLIANT",
        "note": "35 minutes consommées sur 43.2 minutes autorisées : conforme."
      }
    ],
    "tests": [
      {
        "label": "Dépassement du budget sur un mois à 99.95%",
        "stdin": "cas:1",
        "expected": "BUDGET: period_days=30 allowed_min=21.6 consumed_min=25.0 remaining_min=-3.4 consumed_pct=115.74% status=BREACHED\n"
      },
      {
        "label": "Semaine parfaite sans coupure à 99.0%",
        "stdin": "cas:2",
        "expected": "BUDGET: period_days=7 allowed_min=100.8 consumed_min=0.0 remaining_min=100.8 consumed_pct=0.00% status=COMPLIANT\n"
      },
      {
        "label": "Budget exactement consommé à 100%",
        "stdin": "cas:3",
        "expected": "BUDGET: period_days=10 allowed_min=14.4 consumed_min=14.4 remaining_min=0.0 consumed_pct=100.00% status=COMPLIANT\n"
      }
    ],
    "solution": "[Exemple]\nBUDGET: period_days=30 allowed_min=43.2 consumed_min=35.0 remaining_min=8.2 consumed_pct=81.02% status=COMPLIANT\n\n[Cas 1 — Dépassement du budget sur un mois à 99.95%]\nBUDGET: period_days=30 allowed_min=21.6 consumed_min=25.0 remaining_min=-3.4 consumed_pct=115.74% status=BREACHED\n\n\n[Cas 2 — Semaine parfaite sans coupure à 99.0%]\nBUDGET: period_days=7 allowed_min=100.8 consumed_min=0.0 remaining_min=100.8 consumed_pct=0.00% status=COMPLIANT\n\n\n[Cas 3 — Budget exactement consommé à 100%]\nBUDGET: period_days=10 allowed_min=14.4 consumed_min=14.4 remaining_min=0.0 consumed_pct=100.00% status=COMPLIANT",
    "takeaway": "À retenir : Vérifier la consommation du budget d'indisponibilité alloué par un objectif de niveau de service (SLO).\nRepère : 35 minutes consommées sur 43.2 minutes autorisées : conforme."
  }
];
