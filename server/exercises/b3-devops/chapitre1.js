'use strict';

module.exports = [
  {
    "id": "do3-c1-e1",
    "chapter": 1,
    "title": "Évaluateur de maturité du modèle CALMS (DevOps Maturity Score)",
    "level": "n1",
    "language": "analyse",
    "goal": "Calculer le score de maturité DevOps d’une organisation selon les 5 piliers du modèle CALMS et identifier les axes d’amélioration prioritaires.",
    "brief": "<p>Analysez les paramètres du problème pour chaque cas..5&gt;</code>.<br>\nFormules :<br>\n- Moyenne globale = $\\sum score / 5.0$ (sur 5, arrondie à 2 décimales)<br>\n- Pourcentage = $(Moyenne / 5.0) \\times 100$ (arrondi à 1 décimale)<br>\n- Niveau de maturité :<br>\n  - Si $Moyenne \\ge 4.0$ : <code>NIVEAU=ELITE</code><br>\n  - Sinon si $Moyenne \\ge 2.5$ : <code>NIVEAU=EN_TRANSITION</code><br>\n  - Sinon : <code>NIVEAU=INITIAL</code><br>\n- Axes prioritaires : liste des piliers ayant un score strictement inférieur à 3 (ordonnés selon l'ordre standard <code>CULTURE</code>, <code>AUTOMATION</code>, <code>LEAN</code>, <code>MEASUREMENT</code>, <code>SHARING</code>), ou <code>AUCUN</code> si tous sont $\\ge 3$.<br><br>\nAfficher :<br>\n<code>MATURITE_CALMS: MOYENNE=&lt;moy:.2f&gt;/5 (&lt;pct:.1f&gt;%) | NIVEAU=&lt;NIVEAU&gt; | AXES_PRIORITAIRES=[&lt;axes&gt;]</code></p>",
    "starter": "# Grille d'analyse (do3-c1-e1) — Évaluateur de maturité du modèle CALMS (DevOps Maturity Score)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Organisation en début de transition avec faiblesses]\n# Données : CALMS pilier=CULTURE score=2\n# Données : CALMS pilier=AUTOMATION score=1\n# Données : CALMS pilier=LEAN score=3\n# Données : CALMS pilier=MEASUREMENT score=2\n# Données : CALMS pilier=SHARING score=3\nA_COMPLETER\n\n[Cas 2 — Bonne automatisation mais retard culturel]\n# Données : CALMS pilier=CULTURE score=2\n# Données : CALMS pilier=AUTOMATION score=4\n# Données : CALMS pilier=LEAN score=4\n# Données : CALMS pilier=MEASUREMENT score=3\n# Données : CALMS pilier=SHARING score=4\nA_COMPLETER\n\n[Cas 3 — Scores parfaits sur tous les axes]\n# Données : CALMS pilier=CULTURE score=5\n# Données : CALMS pilier=AUTOMATION score=5\n# Données : CALMS pilier=LEAN score=5\n# Données : CALMS pilier=MEASUREMENT score=5\n# Données : CALMS pilier=SHARING score=5\nA_COMPLETER\n",
    "hints": [
      "Garder l’ordre officiel CALMS (Culture, Automation, Lean, Measurement, Sharing) pour l’affichage des axes.",
      "Un score < 3 signale un goulet d’étranglement culturel ou technique."
    ],
    "examples": [
      {
        "stdin": "CALMS pilier=CULTURE score=4\nCALMS pilier=AUTOMATION score=5\nCALMS pilier=LEAN score=4\nCALMS pilier=MEASUREMENT score=4\nCALMS pilier=SHARING score=4",
        "expected": "MATURITE_CALMS: MOYENNE=4.20/5 (84.0%) | NIVEAU=ELITE | AXES_PRIORITAIRES=[AUCUN]",
        "note": "Tous les piliers sont solides (>= 3) et la moyenne dépasse 4.0 : niveau Élite."
      }
    ],
    "tests": [
      {
        "label": "Organisation en début de transition avec faiblesses",
        "stdin": "cas:1",
        "expected": "MATURITE_CALMS: MOYENNE=2.20/5 (44.0%) | NIVEAU=INITIAL | AXES_PRIORITAIRES=[CULTURE, AUTOMATION, MEASUREMENT]"
      },
      {
        "label": "Bonne automatisation mais retard culturel",
        "stdin": "cas:2",
        "expected": "MATURITE_CALMS: MOYENNE=3.40/5 (68.0%) | NIVEAU=EN_TRANSITION | AXES_PRIORITAIRES=[CULTURE]"
      },
      {
        "label": "Scores parfaits sur tous les axes",
        "stdin": "cas:3",
        "expected": "MATURITE_CALMS: MOYENNE=5.00/5 (100.0%) | NIVEAU=ELITE | AXES_PRIORITAIRES=[AUCUN]"
      }
    ],
    "solution": "[Exemple]\nMATURITE_CALMS: MOYENNE=4.20/5 (84.0%) | NIVEAU=ELITE | AXES_PRIORITAIRES=[AUCUN]\n\n[Cas 1 — Organisation en début de transition avec faiblesses]\nMATURITE_CALMS: MOYENNE=2.20/5 (44.0%) | NIVEAU=INITIAL | AXES_PRIORITAIRES=[CULTURE, AUTOMATION, MEASUREMENT]\n\n[Cas 2 — Bonne automatisation mais retard culturel]\nMATURITE_CALMS: MOYENNE=3.40/5 (68.0%) | NIVEAU=EN_TRANSITION | AXES_PRIORITAIRES=[CULTURE]\n\n[Cas 3 — Scores parfaits sur tous les axes]\nMATURITE_CALMS: MOYENNE=5.00/5 (100.0%) | NIVEAU=ELITE | AXES_PRIORITAIRES=[AUCUN]"
  },
  {
    "id": "do3-c1-e2",
    "chapter": 1,
    "title": "Calculateur des 4 Métriques DORA (DevOps Research & Assessment)",
    "level": "n2",
    "language": "analyse",
    "goal": "Classifier la performance de livraison logicielle d’une équipe selon les critères universels de la méthodologie DORA.",
    "brief": "<p>Analysez les paramètres du problème pour chaque cas.<br>\nDéfinitions :<br>\n- <code>DF</code> : Deployment Frequency (déploiements par jour)<br>\n- <code>LT</code> : Lead Time for Changes (délai commit vers prod en heures)<br>\n- <code>CFR</code> : Change Failure Rate (taux d'échec au déploiement en %)<br>\n- <code>MTTR</code> : Mean Time to Restore (temps de résolution d'incident en heures)<br><br>\nGrille de classification officielle DORA :<br>\n- <strong>ELITE</strong> : $DF \\ge 1.0$ ET $LT \\le 1.0$ ET $CFR \\le 5.0$ ET $MTTR \\le 1.0$<br>\n- <strong>HIGH</strong> : $DF \\ge 0.14$ ET $LT \\le 24.0$ ET $CFR \\le 15.0$ ET $MTTR \\le 24.0$<br>\n- <strong>MEDIUM</strong> : $DF \\ge 0.033$ ET $LT \\le 168.0$ ET $CFR \\le 30.0$ ET $MTTR \\le 168.0$<br>\n- <strong>LOW</strong> : toute équipe ne satisfaisant pas les seuils ci-dessus.<br><br>\nAfficher :<br>\n<code>DORA_REPORT: CLASSE=&lt;ELITE|HIGH|MEDIUM|LOW&gt; | DF=&lt;df:.2f&gt; dep/j | LT=&lt;lt:.1f&gt;h | CFR=&lt;cfr:.1f&gt;% | MTTR=&lt;mttr:.1f&gt;h</code></p>",
    "starter": "# Grille d'analyse (do3-c1-e2) — Calculateur des 4 Métriques DORA (DevOps Research & Assessment)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Équipe performante High niveau]\n# Données : DORA df_per_day=0.50 lt_hours=8.0 cfr_pct=10.0 mttr_hours=4.0\nA_COMPLETER\n\n[Cas 2 — Équipe intermédiaire Medium niveau]\n# Données : DORA df_per_day=0.10 lt_hours=48.0 cfr_pct=20.0 mttr_hours=72.0\nA_COMPLETER\n\n[Cas 3 — Déploiements manuels trimestriels à risque élevé Low]\n# Données : DORA df_per_day=0.01 lt_hours=720.0 cfr_pct=45.0 mttr_hours=200.0\nA_COMPLETER\n",
    "hints": [
      "Tester dans l’ordre d’exigence : Élite, puis High, puis Medium, sinon Low.",
      "Les équipes Élite déploient plusieurs fois par jour avec un lead time inférieur à une heure."
    ],
    "examples": [
      {
        "stdin": "DORA df_per_day=3.50 lt_hours=0.5 cfr_pct=2.0 mttr_hours=0.4",
        "expected": "DORA_REPORT: CLASSE=ELITE | DF=3.50 dep/j | LT=0.5h | CFR=2.0% | MTTR=0.4h",
        "note": "Tous les critères Élite sont satisfaits avec brio."
      }
    ],
    "tests": [
      {
        "label": "Équipe performante High niveau",
        "stdin": "cas:1",
        "expected": "DORA_REPORT: CLASSE=HIGH | DF=0.50 dep/j | LT=8.0h | CFR=10.0% | MTTR=4.0h"
      },
      {
        "label": "Équipe intermédiaire Medium niveau",
        "stdin": "cas:2",
        "expected": "DORA_REPORT: CLASSE=MEDIUM | DF=0.10 dep/j | LT=48.0h | CFR=20.0% | MTTR=72.0h"
      },
      {
        "label": "Déploiements manuels trimestriels à risque élevé Low",
        "stdin": "cas:3",
        "expected": "DORA_REPORT: CLASSE=LOW | DF=0.01 dep/j | LT=720.0h | CFR=45.0% | MTTR=200.0h"
      }
    ],
    "solution": "[Exemple]\nDORA_REPORT: CLASSE=ELITE | DF=3.50 dep/j | LT=0.5h | CFR=2.0% | MTTR=0.4h\n\n[Cas 1 — Équipe performante High niveau]\nDORA_REPORT: CLASSE=HIGH | DF=0.50 dep/j | LT=8.0h | CFR=10.0% | MTTR=4.0h\n\n[Cas 2 — Équipe intermédiaire Medium niveau]\nDORA_REPORT: CLASSE=MEDIUM | DF=0.10 dep/j | LT=48.0h | CFR=20.0% | MTTR=72.0h\n\n[Cas 3 — Déploiements manuels trimestriels à risque élevé Low]\nDORA_REPORT: CLASSE=LOW | DF=0.01 dep/j | LT=720.0h | CFR=45.0% | MTTR=200.0h"
  },
  {
    "id": "do3-c1-e3",
    "chapter": 1,
    "title": "Simulateur de flux tiré Kanban et limitation du travail en cours (WIP)",
    "level": "n3",
    "language": "analyse",
    "goal": "Appliquer les principes du Lean Manufacturing au flux logiciel en faisant respecter strictement les plafonds de WIP (Work In Progress) sur chaque colonne du tableau Kanban.",
    "brief": "<p>Analysez les données fournies pour chaque cas.<br><br>\nRègles :<br>\n- La colonne <code>DONE</code> n’a aucune limite de WIP.<br>\n- Pour déplacer une tâche vers une colonne cible : si le nombre actuel de tâches déjà dans cette colonne est <strong>strictement inférieur</strong> à la limite autorisée, le déplacement est <code>ACCEPTE</code> (la tâche quitte son ancienne colonne et entre dans la nouvelle).<br>\n- Si la colonne cible a déjà atteint sa limite WIP : le déplacement est <code>REJETE_WIP_SATURATION</code> et la tâche reste dans sa colonne actuelle.<br><br>\nAfficher pour chaque commande <code>MOVE</code> :<br>\n<code>KANBAN_MOVE: task=&lt;id&gt; to=&lt;to&gt; -&gt; &lt;ACCEPTE|REJETE_WIP_SATURATION&gt; (WIP_CIBLE=&lt;nouveau_total&gt;/&lt;limite&gt;)</code><br>\n(Note : pour DONE, afficher <code>(WIP_CIBLE=&lt;nouveau_total&gt;/ILLIMITE)</code>).</p>",
    "starter": "# Grille d'analyse (do3-c1-e3) — Simulateur de flux tiré Kanban et limitation du travail en cours (WIP)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Saturation immédiate de la colonne DEV]\n# Données : WIP_LIMITS dev=1 review=2 deploy=2\n# Données : TASK id=A col=DEV\n# Données : TASK id=B col=TODO\n# Données : MOVE id=B to=DEV\nA_COMPLETER\n\n[Cas 2 — Sortie vers DONE illimité]\n# Données : WIP_LIMITS dev=2 review=2 deploy=1\n# Données : TASK id=X col=DEPLOY\n# Données : MOVE id=X to=DONE\nA_COMPLETER\n\n[Cas 3 — Déplacement séquentiel multi-tâches respectant le flux]\n# Données : WIP_LIMITS dev=2 review=2 deploy=2\n# Données : TASK id=T1 col=DEV\n# Données : TASK id=T2 col=DEV\n# Données : MOVE id=T1 to=REVIEW\n# Données : MOVE id=T2 to=REVIEW\nA_COMPLETER\n",
    "hints": [
      "Limiter le WIP réduit le temps de cycle (Loi de Little : Lead Time = WIP / Throughput).",
      "Mettre à jour l’état de la tâche immédiatement en cas d’acceptation."
    ],
    "examples": [
      {
        "stdin": "WIP_LIMITS dev=2 review=1 deploy=1\nTASK id=T1 col=DEV\nTASK id=T2 col=REVIEW\nMOVE id=T1 to=REVIEW\nMOVE id=T2 to=DEPLOY\nMOVE id=T1 to=REVIEW",
        "expected": "KANBAN_MOVE: task=T1 to=REVIEW -> REJETE_WIP_SATURATION (WIP_CIBLE=1/1)\nKANBAN_MOVE: task=T2 to=DEPLOY -> ACCEPTE (WIP_CIBLE=1/1)\nKANBAN_MOVE: task=T1 to=REVIEW -> ACCEPTE (WIP_CIBLE=1/1)",
        "note": "T1 ne peut entrer en REVIEW car T2 y est déjà (limite 1). Dès que T2 avance en DEPLOY, T1 peut franchir REVIEW."
      }
    ],
    "tests": [
      {
        "label": "Saturation immédiate de la colonne DEV",
        "stdin": "cas:1",
        "expected": "KANBAN_MOVE: task=B to=DEV -> REJETE_WIP_SATURATION (WIP_CIBLE=1/1)"
      },
      {
        "label": "Sortie vers DONE illimité",
        "stdin": "cas:2",
        "expected": "KANBAN_MOVE: task=X to=DONE -> ACCEPTE (WIP_CIBLE=1/ILLIMITE)"
      },
      {
        "label": "Déplacement séquentiel multi-tâches respectant le flux",
        "stdin": "cas:3",
        "expected": "KANBAN_MOVE: task=T1 to=REVIEW -> ACCEPTE (WIP_CIBLE=1/2)\nKANBAN_MOVE: task=T2 to=REVIEW -> ACCEPTE (WIP_CIBLE=2/2)"
      }
    ],
    "solution": "[Exemple]\nKANBAN_MOVE: task=T1 to=REVIEW -> REJETE_WIP_SATURATION (WIP_CIBLE=1/1)\nKANBAN_MOVE: task=T2 to=DEPLOY -> ACCEPTE (WIP_CIBLE=1/1)\nKANBAN_MOVE: task=T1 to=REVIEW -> ACCEPTE (WIP_CIBLE=1/1)\n\n[Cas 1 — Saturation immédiate de la colonne DEV]\nKANBAN_MOVE: task=B to=DEV -> REJETE_WIP_SATURATION (WIP_CIBLE=1/1)\n\n[Cas 2 — Sortie vers DONE illimité]\nKANBAN_MOVE: task=X to=DONE -> ACCEPTE (WIP_CIBLE=1/ILLIMITE)\n\n[Cas 3 — Déplacement séquentiel multi-tâches respectant le flux]\nKANBAN_MOVE: task=T1 to=REVIEW -> ACCEPTE (WIP_CIBLE=1/2)\nKANBAN_MOVE: task=T2 to=REVIEW -> ACCEPTE (WIP_CIBLE=2/2)"
  }
];
