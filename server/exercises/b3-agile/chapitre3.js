/**
 * chapitre3.js — Études de cas du cours « b3-agile ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    id: "ag3-c3-e1",
    chapter: 3,
    level: "n1",
    language: 'analyse',
    title: "Contrôleur de limites de travail en cours (WIP Limits)",
    goal: "Vérifier la stricte conformité des colonnes d’un tableau Kanban aux limites WIP pour éviter la surcharge cognitive.",
    brief: "<p>Le principe fondamental de la méthode Kanban est de <strong>limiter le travail en cours (WIP - Work In Progress)</strong> afin de favoriser l'écoulement continu (<em>« Stop starting, start finishing »</em>).<br><br>\nPour chaque cas d’application des colonnes de tableau Kanban au format :<br>\n<code>KANBAN_COL name=&lt;nom&gt; limit=&lt;int&gt; current=&lt;int&gt;</code>.<br><br>\nRègles :<br>\n- Si <code>current &gt; limit</code> : <code>status=OVER_WIP_ALERT delta=+{current - limit}</code> (alerte goulot/surcharge).<br>\n- Si <code>current == limit</code> : <code>status=AT_CAPACITY delta=0</code>.<br>\n- Si <code>current &lt; limit</code> : <code>status=AVAILABLE_SLOTS delta=-{limit - current}</code>.<br><br>\nPour chaque colonne, afficher :<br>\n<code>WIP_REPORT col={name} current={current} limit={limit} status={status} delta={delta}</code></p>",
    starter: "# Grille d'analyse (ag3-c3-e1) — Contrôleur de limites de travail en cours (WIP Limits)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Colonne exactement à pleine capacité]\n# Données : KANBAN_COL name=CODE_REVIEW limit=3 current=3\nA_COMPLETER\n\n[Cas 2 — Capacité disponible restante]\n# Données : KANBAN_COL name=TESTING limit=5 current=2\nA_COMPLETER\n\n[Cas 3 — Série de colonnes Kanban successives]\n# Données : KANBAN_COL name=ANALYSIS limit=2 current=1\n# Données : KANBAN_COL name=DEV limit=5 current=7\n# Données : KANBAN_COL name=DEPLOY limit=2 current=2\nA_COMPLETER\n",
    hints: [
          "Comparer les entiers current et limit.",
          "Formater delta avec un signe \"+\" si current > limit, un signe \"-\" si current < limit, et 0 si égalité."
    ],
    examples: [
          {
                "stdin": "KANBAN_COL name=IN_DEV limit=4 current=6",
                "expected": "WIP_REPORT col=IN_DEV current=6 limit=4 status=OVER_WIP_ALERT delta=+2",
                "note": "Dépassement de 2 cartes par rapport à la limite autorisée de 4."
          }
    ],
    tests: [
          {
                "label": "Colonne exactement à pleine capacité",
                "stdin": "cas:1",
                "expected": "WIP_REPORT col=CODE_REVIEW current=3 limit=3 status=AT_CAPACITY delta=0"
          },
          {
                "label": "Capacité disponible restante",
                "stdin": "cas:2",
                "expected": "WIP_REPORT col=TESTING current=2 limit=5 status=AVAILABLE_SLOTS delta=-3"
          },
          {
                "label": "Série de colonnes Kanban successives",
                "stdin": "cas:3",
                "expected": "WIP_REPORT col=ANALYSIS current=1 limit=2 status=AVAILABLE_SLOTS delta=-1\nWIP_REPORT col=DEV current=7 limit=5 status=OVER_WIP_ALERT delta=+2\nWIP_REPORT col=DEPLOY current=2 limit=2 status=AT_CAPACITY delta=0"
          }
    ],
    solution: "[Exemple]\nWIP_REPORT col=IN_DEV current=6 limit=4 status=OVER_WIP_ALERT delta=+2\n\n[Cas 1 — Colonne exactement à pleine capacité]\nWIP_REPORT col=CODE_REVIEW current=3 limit=3 status=AT_CAPACITY delta=0\n\n[Cas 2 — Capacité disponible restante]\nWIP_REPORT col=TESTING current=2 limit=5 status=AVAILABLE_SLOTS delta=-3\n\n[Cas 3 — Série de colonnes Kanban successives]\nWIP_REPORT col=ANALYSIS current=1 limit=2 status=AVAILABLE_SLOTS delta=-1\nWIP_REPORT col=DEV current=7 limit=5 status=OVER_WIP_ALERT delta=+2\nWIP_REPORT col=DEPLOY current=2 limit=2 status=AT_CAPACITY delta=0\n"
  },
  {
    id: "ag3-c3-e2",
    chapter: 3,
    level: "n2",
    language: 'analyse',
    title: "Calculateur de Lead Time, Cycle Time et Débit Moyen (Throughput)",
    goal: "Mesurer la performance d’écoulement d’un flux Kanban à travers le temps de traversée total et le temps de traitement actif.",
    brief: "<p>Dans les métriques Kanban et Lean :<br>\n- <strong>Lead Time</strong> : Délai complet entre la demande du client (<code>t_created</code>) et la mise en production (<code>t_done</code>).<br>\n  <code>lead_time = t_done - t_created</code>.<br>\n- <strong>Cycle Time</strong> : Délai pendant lequel l'équipe a activement travaillé sur le ticket (<code>t_dev_start</code> à <code>t_done</code>).<br>\n  <code>cycle_time = t_done - t_dev_start</code>.<br>\n- <strong>Wait Time</strong> : Temps passé en attente dans le backlog avant prise en charge.<br>\n  <code>wait_time = t_dev_start - t_created</code>.<br><br>\nPour chaque cas d’application des tâches au format :<br>\n<code>TASK_FLOW id=&lt;nom&gt; created=&lt;int&gt; started=&lt;int&gt; done=&lt;int&gt;</code>.<br><br>\nPour chaque tâche, afficher :<br>\n<code>FLOW_METRICS id={id} lead_time={lt}d cycle_time={ct}d wait_time={wt}d</code><br><br>\nEn fin de cas, afficher la moyenne du Cycle Time (arrondie à 1 décimale) :<br>\n<code>AVERAGE_CYCLE_TIME mean={avg_ct}d</code></p>",
    starter: "# Grille d'analyse (ag3-c3-e2) — Calculateur de Lead Time, Cycle Time et Débit Moyen (Throughput)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Trois tâches avec calcul de moyenne]\n# Données : TASK_FLOW id=C1 created=2 started=4 done=8\n# Données : TASK_FLOW id=C2 created=5 started=5 done=9\n# Données : TASK_FLOW id=C3 created=10 started=12 done=20\nA_COMPLETER\n\n[Cas 2 — Tâche prise en charge immédiatement sans attente]\n# Données : TASK_FLOW id=URGENT created=10 started=10 done=12\nA_COMPLETER\n\n[Cas 3 — Longue période d’attente dans le backlog]\n# Données : TASK_FLOW id=BACKLOG_LONG created=1 started=30 done=35\nA_COMPLETER\n",
    hints: [
          "Calculer lead_time = done - created, cycle_time = done - started, wait_time = started - created.",
          "Accumuler la somme des cycle_time et diviser par le nombre de tâches traitées."
    ],
    examples: [
          {
                "stdin": "TASK_FLOW id=CARD-1 created=1 started=5 done=10",
                "expected": "FLOW_METRICS id=CARD-1 lead_time=9d cycle_time=5d wait_time=4d\nAVERAGE_CYCLE_TIME mean=5.0d",
                "note": "Lead time de 9 jours, Cycle time de 5 jours, Attente de 4 jours."
          }
    ],
    tests: [
          {
                "label": "Trois tâches avec calcul de moyenne",
                "stdin": "cas:1",
                "expected": "FLOW_METRICS id=C1 lead_time=6d cycle_time=4d wait_time=2d\nFLOW_METRICS id=C2 lead_time=4d cycle_time=4d wait_time=0d\nFLOW_METRICS id=C3 lead_time=10d cycle_time=8d wait_time=2d\nAVERAGE_CYCLE_TIME mean=5.3d"
          },
          {
                "label": "Tâche prise en charge immédiatement sans attente",
                "stdin": "cas:2",
                "expected": "FLOW_METRICS id=URGENT lead_time=2d cycle_time=2d wait_time=0d\nAVERAGE_CYCLE_TIME mean=2.0d"
          },
          {
                "label": "Longue période d’attente dans le backlog",
                "stdin": "cas:3",
                "expected": "FLOW_METRICS id=BACKLOG_LONG lead_time=34d cycle_time=5d wait_time=29d\nAVERAGE_CYCLE_TIME mean=5.0d"
          }
    ],
    solution: "[Exemple]\nFLOW_METRICS id=CARD-1 lead_time=9d cycle_time=5d wait_time=4d\nAVERAGE_CYCLE_TIME mean=5.0d\n\n[Cas 1 — Trois tâches avec calcul de moyenne]\nFLOW_METRICS id=C1 lead_time=6d cycle_time=4d wait_time=2d\nFLOW_METRICS id=C2 lead_time=4d cycle_time=4d wait_time=0d\nFLOW_METRICS id=C3 lead_time=10d cycle_time=8d wait_time=2d\nAVERAGE_CYCLE_TIME mean=5.3d\n\n[Cas 2 — Tâche prise en charge immédiatement sans attente]\nFLOW_METRICS id=URGENT lead_time=2d cycle_time=2d wait_time=0d\nAVERAGE_CYCLE_TIME mean=2.0d\n\n[Cas 3 — Longue période d’attente dans le backlog]\nFLOW_METRICS id=BACKLOG_LONG lead_time=34d cycle_time=5d wait_time=29d\nAVERAGE_CYCLE_TIME mean=5.0d\n"
  },
  {
    id: "ag3-c3-e3",
    chapter: 3,
    level: "n3",
    language: 'analyse',
    title: "Simulateur de Loi de Little et Détection de Goulots d’Étranglement",
    goal: "Appliquer la Loi de Little (TH = WIP / CT) pour calculer le débit de chaque étape et identifier le goulot d’étranglement limitant le flux.",
    brief: "<p>D'après la <strong>Loi de Little</strong>, dans un système stable à l'équilibre :<br>\n<code>WIP = Throughput &times; Cycle_Time</code>, soit <code>Throughput = WIP / Cycle_Time</code> (exprimé en unités par jour).<br><br>\nPour chaque cas d’application les étapes d'une chaîne de valeur au format :<br>\n<code>LITTLE_STAGE stage=&lt;nom&gt; wip=&lt;int&gt; avg_ct=&lt;float&gt;</code>.<br><br>\nCalculs :<br>\n- <code>throughput = round(wip / avg_ct, 2)</code><br><br>\nLe <strong>goulot d'étranglement (bottleneck)</strong> de la chaîne est l'étape qui possède le <strong>débit (Throughput) minimal</strong>. C'est elle qui bride la cadence de l'ensemble du système.<br><br>\nPour chaque étape, afficher :<br>\n<code>STAGE_RATE stage={stage} wip={wip} avg_ct={avg_ct} throughput={throughput} u/d</code><br><br>\nEn fin de cas, afficher l'étape goulot identifiée et la cadence maximale du système :<br>\n<code>SYSTEM_BOTTLENECK bottleneck={nom_goulot} system_max_throughput={min_th} u/d</code></p>",
    starter: "# Grille d'analyse (ag3-c3-e3) — Simulateur de Loi de Little et Détection de Goulots d’Étranglement\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Goulot situé sur l’étape de test et recette]\n# Données : LITTLE_STAGE stage=CONCEPTION wip=5 avg_ct=1.5\n# Données : LITTLE_STAGE stage=CODE wip=10 avg_ct=3.0\n# Données : LITTLE_STAGE stage=TEST wip=2 avg_ct=4.0\nA_COMPLETER\n\n[Cas 2 — Deux étapes seulement]\n# Données : LITTLE_STAGE stage=DEV wip=8 avg_ct=2.0\n# Données : LITTLE_STAGE stage=REVIEW wip=2 avg_ct=2.0\nA_COMPLETER\n\n[Cas 3 — Chaîne parfaitement équilibrée]\n# Données : LITTLE_STAGE stage=ETAPE_A wip=4 avg_ct=2.0\n# Données : LITTLE_STAGE stage=ETAPE_B wip=6 avg_ct=3.0\nA_COMPLETER\n",
    hints: [
          "Calculer throughput = round(wip / avg_ct, 2) pour chaque étape.",
          "Identifier l’étape qui a la valeur throughput la plus basse (ou premier en cas d’égalité)."
    ],
    examples: [
          {
                "stdin": "LITTLE_STAGE stage=SPEC wip=4 avg_ct=2.0\nLITTLE_STAGE stage=DEV wip=6 avg_ct=6.0\nLITTLE_STAGE stage=QA wip=2 avg_ct=1.0",
                "expected": "STAGE_RATE stage=SPEC wip=4 avg_ct=2.0 throughput=2.0 u/d\nSTAGE_RATE stage=DEV wip=6 avg_ct=6.0 throughput=1.0 u/d\nSTAGE_RATE stage=QA wip=2 avg_ct=1.0 throughput=2.0 u/d\nSYSTEM_BOTTLENECK bottleneck=DEV system_max_throughput=1.0 u/d",
                "note": "DEV a un débit de 1.0 unité/jour : c’est le goulot d’étranglement du système."
          }
    ],
    tests: [
          {
                "label": "Goulot situé sur l’étape de test et recette",
                "stdin": "cas:1",
                "expected": "STAGE_RATE stage=CONCEPTION wip=5 avg_ct=1.5 throughput=3.33 u/d\nSTAGE_RATE stage=CODE wip=10 avg_ct=3.0 throughput=3.33 u/d\nSTAGE_RATE stage=TEST wip=2 avg_ct=4.0 throughput=0.5 u/d\nSYSTEM_BOTTLENECK bottleneck=TEST system_max_throughput=0.5 u/d"
          },
          {
                "label": "Deux étapes seulement",
                "stdin": "cas:2",
                "expected": "STAGE_RATE stage=DEV wip=8 avg_ct=2.0 throughput=4.0 u/d\nSTAGE_RATE stage=REVIEW wip=2 avg_ct=2.0 throughput=1.0 u/d\nSYSTEM_BOTTLENECK bottleneck=REVIEW system_max_throughput=1.0 u/d"
          },
          {
                "label": "Chaîne parfaitement équilibrée",
                "stdin": "cas:3",
                "expected": "STAGE_RATE stage=ETAPE_A wip=4 avg_ct=2.0 throughput=2.0 u/d\nSTAGE_RATE stage=ETAPE_B wip=6 avg_ct=3.0 throughput=2.0 u/d\nSYSTEM_BOTTLENECK bottleneck=ETAPE_A system_max_throughput=2.0 u/d"
          }
    ],
    solution: "[Exemple]\nSTAGE_RATE stage=SPEC wip=4 avg_ct=2.0 throughput=2.0 u/d\nSTAGE_RATE stage=DEV wip=6 avg_ct=6.0 throughput=1.0 u/d\nSTAGE_RATE stage=QA wip=2 avg_ct=1.0 throughput=2.0 u/d\nSYSTEM_BOTTLENECK bottleneck=DEV system_max_throughput=1.0 u/d\n\n[Cas 1 — Goulot situé sur l’étape de test et recette]\nSTAGE_RATE stage=CONCEPTION wip=5 avg_ct=1.5 throughput=3.33 u/d\nSTAGE_RATE stage=CODE wip=10 avg_ct=3.0 throughput=3.33 u/d\nSTAGE_RATE stage=TEST wip=2 avg_ct=4.0 throughput=0.5 u/d\nSYSTEM_BOTTLENECK bottleneck=TEST system_max_throughput=0.5 u/d\n\n[Cas 2 — Deux étapes seulement]\nSTAGE_RATE stage=DEV wip=8 avg_ct=2.0 throughput=4.0 u/d\nSTAGE_RATE stage=REVIEW wip=2 avg_ct=2.0 throughput=1.0 u/d\nSYSTEM_BOTTLENECK bottleneck=REVIEW system_max_throughput=1.0 u/d\n\n[Cas 3 — Chaîne parfaitement équilibrée]\nSTAGE_RATE stage=ETAPE_A wip=4 avg_ct=2.0 throughput=2.0 u/d\nSTAGE_RATE stage=ETAPE_B wip=6 avg_ct=3.0 throughput=2.0 u/d\nSYSTEM_BOTTLENECK bottleneck=ETAPE_A system_max_throughput=2.0 u/d\n"
  }
];
