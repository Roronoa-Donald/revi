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
    "title": "Barème pédagogique fictif : quatre mesures de livraison",
    "level": "n2",
    "language": "analyse",
    "goal": "Appliquer un barème pédagogique daté sans prétendre classifier officiellement une équipe.",
    "brief": "<p>Ce barème pédagogique fictif du 30 octobre 2026 sert uniquement à calculer un classement sur les quatre valeurs fournies : fréquence <code>DF</code> en déploiements/jour, délai <code>LT</code> en heures, taux <code>CFR</code> en pourcentage et temps moyen général de restauration <code>MTTR</code> en heures. Les seuils ci-dessous ne sont pas un classement officiel ni universel DORA. Le guide DORA consulté à cette date présente cinq métriques, dont le <em>Deployment Rework Rate</em> ; cette cinquième mesure n’est pas fournie ici. De plus, un MTTR général ne mesure pas nécessairement le rétablissement après un déploiement échoué.</p><p>Dans cet exercice seulement : <code>A</code> si DF ≥ 1, LT ≤ 1, CFR ≤ 5 et MTTR ≤ 1 ; sinon <code>B</code> si DF ≥ 0,14, LT ≤ 24, CFR ≤ 15 et MTTR ≤ 24 ; sinon <code>C</code> si DF ≥ 0,033, LT ≤ 168, CFR ≤ 30 et MTTR ≤ 168 ; sinon <code>D</code>. Ces valeurs ne suffisent pas à juger une équipe réelle.</p><p>Afficher <code>BAREME_PEDAGOGIQUE: CLASSE=&lt;A|B|C|D&gt; | DF=&lt;2 décimales&gt; dep/j | LT=&lt;1 décimale&gt;h | CFR=&lt;1 décimale&gt;% | MTTR=&lt;1 décimale&gt;h | CINQUIEME=NON_MESURE</code>.</p>",
    "starter": "# Grille d'analyse (do3-c1-e2) — Barème pédagogique fictif : quatre mesures de livraison\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Équipe performante High niveau]\n# Données : DORA df_per_day=0.50 lt_hours=8.0 cfr_pct=10.0 mttr_hours=4.0\nA_COMPLETER\n\n[Cas 2 — Équipe intermédiaire Medium niveau]\n# Données : DORA df_per_day=0.10 lt_hours=48.0 cfr_pct=20.0 mttr_hours=72.0\nA_COMPLETER\n\n[Cas 3 — Déploiements manuels trimestriels à risque élevé Low]\n# Données : DORA df_per_day=0.01 lt_hours=720.0 cfr_pct=45.0 mttr_hours=200.0\nA_COMPLETER\n",
    "hints": [
      "Appliquez les seuils fictifs dans l’ordre A, B, C, puis D.",
      "Ne confondez pas ce barème sur quatre données avec les cinq métriques actuelles DORA."
    ],
    "examples": [
      {
        "stdin": "DORA df_per_day=3.50 lt_hours=0.5 cfr_pct=2.0 mttr_hours=0.4",
        "expected": "BAREME_PEDAGOGIQUE: CLASSE=A | DF=3.50 dep/j | LT=0.5h | CFR=2.0% | MTTR=0.4h | CINQUIEME=NON_MESURE",
        "note": "Les valeurs satisfont les seuils A du barème fictif, sans classement réel."
      }
    ],
    "tests": [
      {
        "label": "Équipe performante High niveau",
        "stdin": "cas:1",
        "expected": "BAREME_PEDAGOGIQUE: CLASSE=B | DF=0.50 dep/j | LT=8.0h | CFR=10.0% | MTTR=4.0h | CINQUIEME=NON_MESURE"
      },
      {
        "label": "Équipe intermédiaire Medium niveau",
        "stdin": "cas:2",
        "expected": "BAREME_PEDAGOGIQUE: CLASSE=C | DF=0.10 dep/j | LT=48.0h | CFR=20.0% | MTTR=72.0h | CINQUIEME=NON_MESURE"
      },
      {
        "label": "Déploiements manuels trimestriels à risque élevé Low",
        "stdin": "cas:3",
        "expected": "BAREME_PEDAGOGIQUE: CLASSE=D | DF=0.01 dep/j | LT=720.0h | CFR=45.0% | MTTR=200.0h | CINQUIEME=NON_MESURE"
      }
    ],
    "solution": "[Exemple]\nBAREME_PEDAGOGIQUE: CLASSE=A | DF=3.50 dep/j | LT=0.5h | CFR=2.0% | MTTR=0.4h | CINQUIEME=NON_MESURE\n\n[Cas 1 — Équipe performante High niveau]\nBAREME_PEDAGOGIQUE: CLASSE=B | DF=0.50 dep/j | LT=8.0h | CFR=10.0% | MTTR=4.0h | CINQUIEME=NON_MESURE\n\n[Cas 2 — Équipe intermédiaire Medium niveau]\nBAREME_PEDAGOGIQUE: CLASSE=C | DF=0.10 dep/j | LT=48.0h | CFR=20.0% | MTTR=72.0h | CINQUIEME=NON_MESURE\n\n[Cas 3 — Déploiements manuels trimestriels à risque élevé Low]\nBAREME_PEDAGOGIQUE: CLASSE=D | DF=0.01 dep/j | LT=720.0h | CFR=45.0% | MTTR=200.0h | CINQUIEME=NON_MESURE"
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
