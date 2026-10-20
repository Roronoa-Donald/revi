/**
 * chapitre1.js — Études de cas du cours « b3-agile ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    id: "ag3-c1-e1",
    chapter: 1,
    level: "n1",
    language: 'analyse',
    title: "Calculateur d’écart du Triangle de Fer (Périmètre, Coût, Délais)",
    goal: "Évaluer la dérive budgétaire et calendaire d’un projet traditionnel par rapport aux prévisions initiales.",
    brief: "<p>Le <strong>Triangle de Fer</strong> (ou triple contrainte) modélise l'équilibre fondamental de tout projet entre le <strong>périmètre (scope)</strong>, le <strong>coût (budget)</strong> et les <strong>délais (planning)</strong>.<br><br>\nPour chaque cas d’application des lignes au format :<br>\n<code>PROJECT_DELTA id=&lt;nom&gt; budget_spent=&lt;int&gt; budget_planned=&lt;int&gt; days_spent=&lt;int&gt; days_planned=&lt;int&gt;</code>.<br><br>\nRègles de calcul :<br>\n- <code>cost_variance_pct = round(((budget_spent - budget_planned) / budget_planned) * 100, 1)</code><br>\n- <code>time_variance_pct = round(((days_spent - days_planned) / days_planned) * 100, 1)</code><br>\n- Statut global :<br>\n  - Si <code>cost_variance_pct &gt; 15.0 and time_variance_pct &gt; 15.0</code> : <code>status=CRITICAL</code><br>\n  - Sinon si <code>cost_variance_pct &gt; 0.0 or time_variance_pct &gt; 0.0</code> : <code>status=OVERRUN</code><br>\n  - Sinon : <code>status=ON_TRACK</code><br><br>\nPour chaque projet, afficher :<br>\n<code>DELTA_REPORT id={id} cost_var={cost_variance_pct}% time_var={time_variance_pct}% status={status}</code></p>",
    starter: "# Grille d'analyse (ag3-c1-e1) — Calculateur d’écart du Triangle de Fer (Périmètre, Coût, Délais)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Projet parfaitement dans les clous ou en avance]\n# Données : PROJECT_DELTA id=CRM budget_spent=95000 budget_planned=100000 days_spent=120 days_planned=130\nA_COMPLETER\n\n[Cas 2 — Dépassement modéré de budget uniquement (OVERRUN)]\n# Données : PROJECT_DELTA id=ERP budget_spent=105000 budget_planned=100000 days_spent=80 days_planned=80\nA_COMPLETER\n\n[Cas 3 — Dépassement critique simultané sur les deux axes]\n# Données : PROJECT_DELTA id=APP_MOBILE budget_spent=130000 budget_planned=100000 days_spent=120 days_planned=100\nA_COMPLETER\n",
    hints: [
          "Calculer l’écart relatif en pourcentage avec ((réalisé - prévu) / prévu) * 100.",
          "Utiliser l’arrondi à une décimale pour formater à un chiffre après la virgule.",
          "Vérifier d’abord si les deux dépassements excèdent 15 % pour attribuer CRITICAL."
    ],
    examples: [
          {
                "stdin": "PROJECT_DELTA id=PORTAIL budget_spent=120000 budget_planned=100000 days_spent=180 days_planned=150",
                "expected": "DELTA_REPORT id=PORTAIL cost_var=20.0% time_var=20.0% status=CRITICAL",
                "note": "Dépassement de 20% sur le budget et les délais : statut critique."
          }
    ],
    tests: [
          {
                "label": "Projet parfaitement dans les clous ou en avance",
                "stdin": "cas:1",
                "expected": "DELTA_REPORT id=CRM cost_var=-5.0% time_var=-7.7% status=ON_TRACK"
          },
          {
                "label": "Dépassement modéré de budget uniquement (OVERRUN)",
                "stdin": "cas:2",
                "expected": "DELTA_REPORT id=ERP cost_var=5.0% time_var=0.0% status=OVERRUN"
          },
          {
                "label": "Dépassement critique simultané sur les deux axes",
                "stdin": "cas:3",
                "expected": "DELTA_REPORT id=APP_MOBILE cost_var=30.0% time_var=20.0% status=CRITICAL"
          }
    ],
    solution: "[Exemple]\nDELTA_REPORT id=PORTAIL cost_var=20.0% time_var=20.0% status=CRITICAL\n\n[Cas 1 — Projet parfaitement dans les clous ou en avance]\nDELTA_REPORT id=CRM cost_var=-5.0% time_var=-7.7% status=ON_TRACK\n\n[Cas 2 — Dépassement modéré de budget uniquement (OVERRUN)]\nDELTA_REPORT id=ERP cost_var=5.0% time_var=0.0% status=OVERRUN\n\n[Cas 3 — Dépassement critique simultané sur les deux axes]\nDELTA_REPORT id=APP_MOBILE cost_var=30.0% time_var=20.0% status=CRITICAL\n"
  },
  {
    id: "ag3-c1-e2",
    chapter: 1,
    level: "n2",
    language: 'analyse',
    title: "Calculateur de dates au plus tôt et durée totale d’un graphe PERT",
    goal: "Calculer la date de début au plus tôt (ES) et la fin au plus tôt (EF) de tâches ordonnancées dans un graphe PERT.",
    brief: "<p>La méthode <strong>PERT (Program Evaluation and Review Technique)</strong> modélise le réseau de dépendances d'un projet traditionnel sous forme de graphe orienté sans cycle (DAG).<br><br>\nChaque tâche possède une durée (<code>dur</code>) et d'éventuels prédécesseurs immédiats (<code>preds</code>).<br>\n- Date de début au plus tôt (Early Start - ES) : <code>ES = max(EF des prédécesseurs)</code> (ou <code>0</code> si aucun prédécesseur).<br>\n- Date de fin au plus tôt (Early Finish - EF) : <code>EF = ES + dur</code>.<br><br>\nPour chaque cas d’application des tâches au format :<br>\n<code>PERT_TASK id=&lt;nom&gt; dur=&lt;int&gt; preds=&lt;NONE|pred1,pred2,...&gt;</code>.<br>\n(Les tâches sont fournies dans l'ordre topologique).<br><br>\nPour chaque tâche, afficher :<br>\n<code>PERT_NODE id={id} es={es} ef={ef} dur={dur}</code><br><br>\nEn fin de cas, afficher la durée minimale incompressible du projet :<br>\n<code>PROJECT_SPAN duration={max_ef}</code></p>",
    starter: "# Grille d'analyse (ag3-c1-e2) — Calculateur de dates au plus tôt et durée totale d’un graphe PERT\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Chemins divergents puis convergents]\n# Données : PERT_TASK id=A dur=4 preds=NONE\n# Données : PERT_TASK id=B dur=6 preds=A\n# Données : PERT_TASK id=C dur=2 preds=A\n# Données : PERT_TASK id=D dur=5 preds=B,C\nA_COMPLETER\n\n[Cas 2 — Tâches parallèles démarrant à zéro]\n# Données : PERT_TASK id=T1 dur=10 preds=NONE\n# Données : PERT_TASK id=T2 dur=12 preds=NONE\n# Données : PERT_TASK id=T3 dur=4 preds=T1,T2\nA_COMPLETER\n\n[Cas 3 — Chaîne séquentielle simple]\n# Données : PERT_TASK id=X dur=3 preds=NONE\n# Données : PERT_TASK id=Y dur=7 preds=X\n# Données : PERT_TASK id=Z dur=2 preds=Y\nA_COMPLETER\n",
    hints: [
          "Gérer un dictionnaire ef_map associant l’identifiant de chaque tâche à sa date EF.",
          "Si preds == \"NONE\", ES vaut 0.",
          "Sinon, ES vaut le maximum des EF des tâches prédécesseurs référencées."
    ],
    examples: [
          {
                "stdin": "PERT_TASK id=A dur=5 preds=NONE\nPERT_TASK id=B dur=3 preds=A",
                "expected": "PERT_NODE id=A es=0 ef=5 dur=5\nPERT_NODE id=B es=5 ef=8 dur=3\nPROJECT_SPAN duration=8",
                "note": "Tâche A (0..5) puis tâche B (5..8), durée globale = 8 jours."
          }
    ],
    tests: [
          {
                "label": "Chemins divergents puis convergents",
                "stdin": "cas:1",
                "expected": "PERT_NODE id=A es=0 ef=4 dur=4\nPERT_NODE id=B es=4 ef=10 dur=6\nPERT_NODE id=C es=4 ef=6 dur=2\nPERT_NODE id=D es=10 ef=15 dur=5\nPROJECT_SPAN duration=15"
          },
          {
                "label": "Tâches parallèles démarrant à zéro",
                "stdin": "cas:2",
                "expected": "PERT_NODE id=T1 es=0 ef=10 dur=10\nPERT_NODE id=T2 es=0 ef=12 dur=12\nPERT_NODE id=T3 es=12 ef=16 dur=4\nPROJECT_SPAN duration=16"
          },
          {
                "label": "Chaîne séquentielle simple",
                "stdin": "cas:3",
                "expected": "PERT_NODE id=X es=0 ef=3 dur=3\nPERT_NODE id=Y es=3 ef=10 dur=7\nPERT_NODE id=Z es=10 ef=12 dur=2\nPROJECT_SPAN duration=12"
          }
    ],
    solution: "[Exemple]\nPERT_NODE id=A es=0 ef=5 dur=5\nPERT_NODE id=B es=5 ef=8 dur=3\nPROJECT_SPAN duration=8\n\n[Cas 1 — Chemins divergents puis convergents]\nPERT_NODE id=A es=0 ef=4 dur=4\nPERT_NODE id=B es=4 ef=10 dur=6\nPERT_NODE id=C es=4 ef=6 dur=2\nPERT_NODE id=D es=10 ef=15 dur=5\nPROJECT_SPAN duration=15\n\n[Cas 2 — Tâches parallèles démarrant à zéro]\nPERT_NODE id=T1 es=0 ef=10 dur=10\nPERT_NODE id=T2 es=0 ef=12 dur=12\nPERT_NODE id=T3 es=12 ef=16 dur=4\nPROJECT_SPAN duration=16\n\n[Cas 3 — Chaîne séquentielle simple]\nPERT_NODE id=X es=0 ef=3 dur=3\nPERT_NODE id=Y es=3 ef=10 dur=7\nPERT_NODE id=Z es=10 ef=12 dur=2\nPROJECT_SPAN duration=12\n"
  },
  {
    id: "ag3-c1-e3",
    chapter: 1,
    level: "n3",
    language: 'analyse',
    title: "Classificateur d’adéquation méthodologique (Waterfall vs Agile vs Hybride)",
    goal: "Orienter un projet vers le bon modèle d’organisation selon le niveau d’incertitude et les contraintes réglementaires.",
    brief: "<p>Le choix d'une démarche de gestion de projet (Cycle en cascade / Waterfall, Cycle en V, Scrum, Kanban, ou Hybride) découle de facteurs objectifs d'incertitude et de contraintes métier.<br><br>\nPour chaque cas d’application des decasions de projets au format :<br>\n<code>PROJECT_FIT id=&lt;nom&gt; req_stability=&lt;HIGH|LOW&gt; innov_rate=&lt;HIGH|LOW&gt; reg_constraint=&lt;STRICT|FLEX&gt; user_feedback=&lt;FREQUENT|RARE&gt;</code>.<br><br>\nMatrice décisionnelle :<br>\n- Si <code>reg_constraint == 'STRICT' and req_stability == 'HIGH' and innov_rate == 'LOW'</code> :<br>\n  <code>approach=WATERFALL rationale=PREDICTIVE_STABILITY</code><br>\n- Si <code>reg_constraint == 'FLEX' and req_stability == 'LOW' and innov_rate == 'HIGH' and user_feedback == 'FREQUENT'</code> :<br>\n  <code>approach=AGILE rationale=EMPIRICAL_ADAPTABILITY</code><br>\n- Sinon (exigences mixtes, contraintes fortes avec besoin d'itérations, etc.) :<br>\n  <code>approach=HYBRID rationale=GOVERNANCE_WITH_ITERATIONS</code><br><br>\nPour chaque ligne, afficher :<br>\n<code>FIT_RESULT id={id} approach={approach} rationale={rationale}</code></p>",
    starter: "# Grille d'analyse (ag3-c1-e3) — Classificateur d’adéquation méthodologique (Waterfall vs Agile vs Hybride)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Startup web en forte innovation avec feedback régulier]\n# Données : PROJECT_FIT id=FINTECH_APP req_stability=LOW innov_rate=HIGH reg_constraint=FLEX user_feedback=FREQUENT\nA_COMPLETER\n\n[Cas 2 — Projet bancaire mixte nécessitant cadrage global et sprints de livraison]\n# Données : PROJECT_FIT id=BANQUE_CORE req_stability=LOW innov_rate=HIGH reg_constraint=STRICT user_feedback=FREQUENT\nA_COMPLETER\n\n[Cas 3 — Migration d’infrastructure réseau classique]\n# Données : PROJECT_FIT id=INFRA_MIG req_stability=HIGH innov_rate=LOW reg_constraint=STRICT user_feedback=RARE\nA_COMPLETER\n",
    hints: [
          "Comparer les paramètres textuels avec les conditions de la matrice.",
          "Tester d’abord la condition stricte Waterfall, puis la condition stricte Agile (reg_constraint == \"FLEX\"), et affecter Hybride par défaut."
    ],
    examples: [
          {
                "stdin": "PROJECT_FIT id=FERROVIAIRE req_stability=HIGH innov_rate=LOW reg_constraint=STRICT user_feedback=RARE",
                "expected": "FIT_RESULT id=FERROVIAIRE approach=WATERFALL rationale=PREDICTIVE_STABILITY",
                "note": "Projet à contraintes réglementaires critiques et exigences figées : Waterfall prédictif."
          }
    ],
    tests: [
          {
                "label": "Startup web en forte innovation avec feedback régulier",
                "stdin": "cas:1",
                "expected": "FIT_RESULT id=FINTECH_APP approach=AGILE rationale=EMPIRICAL_ADAPTABILITY"
          },
          {
                "label": "Projet bancaire mixte nécessitant cadrage global et sprints de livraison",
                "stdin": "cas:2",
                "expected": "FIT_RESULT id=BANQUE_CORE approach=HYBRID rationale=GOVERNANCE_WITH_ITERATIONS"
          },
          {
                "label": "Migration d’infrastructure réseau classique",
                "stdin": "cas:3",
                "expected": "FIT_RESULT id=INFRA_MIG approach=WATERFALL rationale=PREDICTIVE_STABILITY"
          }
    ],
    solution: "[Exemple]\nFIT_RESULT id=FERROVIAIRE approach=WATERFALL rationale=PREDICTIVE_STABILITY\n\n[Cas 1 — Startup web en forte innovation avec feedback régulier]\nFIT_RESULT id=FINTECH_APP approach=AGILE rationale=EMPIRICAL_ADAPTABILITY\n\n[Cas 2 — Projet bancaire mixte nécessitant cadrage global et sprints de livraison]\nFIT_RESULT id=BANQUE_CORE approach=HYBRID rationale=GOVERNANCE_WITH_ITERATIONS\n\n[Cas 3 — Migration d’infrastructure réseau classique]\nFIT_RESULT id=INFRA_MIG approach=WATERFALL rationale=PREDICTIVE_STABILITY\n"
  }
];
