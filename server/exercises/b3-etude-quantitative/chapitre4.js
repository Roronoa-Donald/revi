/**
 * chapitre4.js — Études de cas du cours « b3-etude-quantitative ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    id: "eq3-c4-e1",
    chapter: 4,
    level: "n1",
    language: 'analyse',
    title: "Validateur méthodologique de guide d’entretien semi-directif",
    goal: "Vérifier la structure canonique d’un guide d’entretien qualitatif (phases, équilibre ouvert/fermé, relances).",
    brief: "<p>Pour chaque cas d’application :<br>\n<code>GUIDE id=&lt;id&gt; phases=&lt;P1&gt;,&lt;P2&gt;,... questions=OUVERTE:&lt;No&gt;,FERMEE:&lt;Nf&gt; relances=&lt;Nr&gt;</code>.<br><br>\nRègles de validation méthodologique :<br>\n1. <code>Phases</code> : Doit comporter au moins une phase d'accueil (<code>ACCUEIL</code> ou <code>INTRODUCTION</code>), au moins une phase thématique (contenant <code>THEME</code> ou <code>CORPS</code>), et une phase de conclusion (<code>CONCLUSION</code> ou <code>CLOTURE</code>). Si absent : défaut <code>PHASES_MANQUANTES</code>.<br>\n2. <code>Questions</code> : Le taux de questions ouvertes $TO = No / (No + Nf)$ doit être $\\ge 70.0\\%$. Si inférieur : défaut <code>TROP_DE_QUESTIONS_FERMEES</code>.<br>\n3. <code>Relances</code> : Le nombre de relances neutres prévues $Nr$ doit être $\\ge 2$. Si inférieur : défaut <code>MANQUE_DE_RELANCES</code>.<br><br>\nVerdict (ordre des défauts ci-dessus) :<br>\n- Si aucun défaut : <code>STATUT=GUIDE_SEMI_DIRECTIF_CONFORME</code><br>\n- Sinon : <code>STATUT=GUIDE_A_REVISER (DEFAUTS=[...])</code><br><br>\nAfficher :<br>\n<code>AUDIT_GUIDE: {id} -> {STATUT}</code></p>",
    starter: "# Grille d'analyse (eq3-c4-e1) — Validateur méthodologique de guide d’entretien semi-directif\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Guide avec trop de questions fermées de type questionnaire]\n# Données : GUIDE id=EntretienDev phases=INTRODUCTION,THEME_OUTILS,CLOTURE questions=OUVERTE:4,FERMEE:6 relances=3\nA_COMPLETER\n\n[Cas 2 — Guide manquant de relances et de conclusion]\n# Données : GUIDE id=EntretienBrouillon phases=ACCUEIL,THEME_UNIQUE questions=OUVERTE:9,FERMEE:1 relances=1\nA_COMPLETER\n\n[Cas 3 — Guide combinant tous les défauts]\n# Données : GUIDE id=MauvaisGuide phases=CORPS questions=OUVERTE:2,FERMEE:8 relances=0\nA_COMPLETER\n",
    hints: [
          "Vérifier la présence des 3 types de phases requises.",
          "Calculer le ratio de questions ouvertes par rapport au total."
    ],
    examples: [
          {
                "stdin": "GUIDE id=EntretienDSI phases=ACCUEIL,THEME1,THEME2,CONCLUSION questions=OUVERTE:8,FERMEE:2 relances=4",
                "expected": "AUDIT_GUIDE: EntretienDSI -> STATUT=GUIDE_SEMI_DIRECTIF_CONFORME",
                "note": "3 phases présentes, 80% de questions ouvertes et 4 relances : parfait."
          }
    ],
    tests: [
          {
                "label": "Guide avec trop de questions fermées de type questionnaire",
                "stdin": "cas:1",
                "expected": "AUDIT_GUIDE: EntretienDev -> STATUT=GUIDE_A_REVISER (DEFAUTS=[TROP_DE_QUESTIONS_FERMEES])"
          },
          {
                "label": "Guide manquant de relances et de conclusion",
                "stdin": "cas:2",
                "expected": "AUDIT_GUIDE: EntretienBrouillon -> STATUT=GUIDE_A_REVISER (DEFAUTS=[PHASES_MANQUANTES, MANQUE_DE_RELANCES])"
          },
          {
                "label": "Guide combinant tous les défauts",
                "stdin": "cas:3",
                "expected": "AUDIT_GUIDE: MauvaisGuide -> STATUT=GUIDE_A_REVISER (DEFAUTS=[PHASES_MANQUANTES, TROP_DE_QUESTIONS_FERMEES, MANQUE_DE_RELANCES])"
          }
    ],
    solution: "[Exemple]\nAUDIT_GUIDE: EntretienDSI -> STATUT=GUIDE_SEMI_DIRECTIF_CONFORME\n\n[Cas 1 — Guide avec trop de questions fermées de type questionnaire]\nAUDIT_GUIDE: EntretienDev -> STATUT=GUIDE_A_REVISER (DEFAUTS=[TROP_DE_QUESTIONS_FERMEES])\n\n[Cas 2 — Guide manquant de relances et de conclusion]\nAUDIT_GUIDE: EntretienBrouillon -> STATUT=GUIDE_A_REVISER (DEFAUTS=[PHASES_MANQUANTES, MANQUE_DE_RELANCES])\n\n[Cas 3 — Guide combinant tous les défauts]\nAUDIT_GUIDE: MauvaisGuide -> STATUT=GUIDE_A_REVISER (DEFAUTS=[PHASES_MANQUANTES, TROP_DE_QUESTIONS_FERMEES, MANQUE_DE_RELANCES])\n"
  },
  {
    id: "eq3-c4-e2",
    chapter: 4,
    level: "n2",
    language: 'analyse',
    title: "Analyseur d’interactions de Focus Group et équilibre du temps de parole",
    goal: "Mesurer la répartition des prises de parole lors d’une table ronde qualitative et détecter un éventuel biais de leader dominant.",
    brief: "<p>Pour chaque cas d’application :<br>\n<code>FOCUS_GROUP id=&lt;id&gt; duree_totale=&lt;D_min&gt; participants=&lt;Nom1&gt;:&lt;T1&gt;,&lt;Nom2&gt;:&lt;T2&gt;,...</code>.<br>\nOù chaque $T_i$ est la durée totale cumulée en minutes par chaque participant.<br><br>\nCalculs :<br>\n- Nombre de participants $P$.<br>\n- Temps total parlé : $T_{parle} = \\sum T_i$.<br>\n- Pour chaque participant : part relative du temps parlé $pct_i = (T_i / T_{parle}) \\times 100$ (1 décimale).<br>\n- Détection de monopole : si un participant a $pct_i &gt; 35.0\\%$, il est qualifié de leader dominant (le premier qui dépasse).<br><br>\nDiagnostic :<br>\n- Si un leader dominant est détecté :<br>\n  <code>DYNAMIQUE=BIAIS_DOMINANCE (LEADER={Nom} {pct:.1f}%)</code><br>\n- Sinon si $P \\ge 4$ :<br>\n  <code>DYNAMIQUE=EQUILIBREE_CONCERTATION_FLUIDE</code><br>\n- Sinon :<br>\n  <code>DYNAMIQUE=GROUPE_RESTREINT</code><br><br>\nAfficher :<br>\n<code>FOCUS_ANALYSE: {id} -> PARTICIPANTS={P} TEMPS_PARLE={T_parle}m/{duree_totale}m | {DYNAMIQUE}</code></p>",
    starter: "# Grille d'analyse (eq3-c4-e2) — Analyseur d’interactions de Focus Group et équilibre du temps de parole\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Focus group avec leader dominant écrasant]\n# Données : FOCUS_GROUP id=FG_Direction duree_totale=100 participants=Manager:45,Ingenieur1:15,Ingenieur2:10,Technicien:10\nA_COMPLETER\n\n[Cas 2 — Groupe restreint de 3 participants équilibrés]\n# Données : FOCUS_GROUP id=FG_Trio duree_totale=60 participants=Marc:15,Julie:15,Sophie:15\nA_COMPLETER\n\n[Cas 3 — Grand groupe équilibré de 5 participants]\n# Données : FOCUS_GROUP id=FG_Usagers duree_totale=120 participants=P1:20,P2:20,P3:20,P4:20,P5:20\nA_COMPLETER\n",
    hints: [
          "Calculer la part relative par rapport au temps parlé effectif.",
          "Vérifier le seuil de 35% pour détecter la captation de la parole."
    ],
    examples: [
          {
                "stdin": "FOCUS_GROUP id=FG_DevOps duree_totale=90 participants=Alice:20,Bob:18,Chloe:22,David:20",
                "expected": "FOCUS_ANALYSE: FG_DevOps -> PARTICIPANTS=4 TEMPS_PARLE=80m/90m | DYNAMIQUE=EQUILIBREE_CONCERTATION_FLUIDE",
                "note": "4 participants avec des temps répartis entre 18 et 22m : concertation parfaitement fluide."
          }
    ],
    tests: [
          {
                "label": "Focus group avec leader dominant écrasant",
                "stdin": "cas:1",
                "expected": "FOCUS_ANALYSE: FG_Direction -> PARTICIPANTS=4 TEMPS_PARLE=80m/100m | DYNAMIQUE=BIAIS_DOMINANCE (LEADER=Manager 56.2%)"
          },
          {
                "label": "Groupe restreint de 3 participants équilibrés",
                "stdin": "cas:2",
                "expected": "FOCUS_ANALYSE: FG_Trio -> PARTICIPANTS=3 TEMPS_PARLE=45m/60m | DYNAMIQUE=GROUPE_RESTREINT"
          },
          {
                "label": "Grand groupe équilibré de 5 participants",
                "stdin": "cas:3",
                "expected": "FOCUS_ANALYSE: FG_Usagers -> PARTICIPANTS=5 TEMPS_PARLE=100m/120m | DYNAMIQUE=EQUILIBREE_CONCERTATION_FLUIDE"
          }
    ],
    solution: "[Exemple]\nFOCUS_ANALYSE: FG_DevOps -> PARTICIPANTS=4 TEMPS_PARLE=80m/90m | DYNAMIQUE=EQUILIBREE_CONCERTATION_FLUIDE\n\n[Cas 1 — Focus group avec leader dominant écrasant]\nFOCUS_ANALYSE: FG_Direction -> PARTICIPANTS=4 TEMPS_PARLE=80m/100m | DYNAMIQUE=BIAIS_DOMINANCE (LEADER=Manager 56.2%)\n\n[Cas 2 — Groupe restreint de 3 participants équilibrés]\nFOCUS_ANALYSE: FG_Trio -> PARTICIPANTS=3 TEMPS_PARLE=45m/60m | DYNAMIQUE=GROUPE_RESTREINT\n\n[Cas 3 — Grand groupe équilibré de 5 participants]\nFOCUS_ANALYSE: FG_Usagers -> PARTICIPANTS=5 TEMPS_PARLE=100m/120m | DYNAMIQUE=EQUILIBREE_CONCERTATION_FLUIDE\n"
  },
  {
    id: "eq3-c4-e3",
    chapter: 4,
    level: "n3",
    language: 'analyse',
    title: "Grille d’observation comportementale et accord inter-observateurs",
    goal: "Calculer le coefficient d’accord brut entre deux observateurs indépendants codant une séquence comportementale in situ.",
    brief: "<p>Pour chaque cas d’application :<br>\n<code>OBSERVATION session=&lt;id&gt; obs1=&lt;c1,c2,...&gt; obs2=&lt;c1,c2,...&gt;</code>.<br>\nOù chaque séquence contient une série d'occurrences codées (ex: O pour présence du comportement, N pour absence).<br><br>\nCalculs :<br>\n- Nombre total d'unités observées : $U = \\text{len}(obs1)$ (obs1 et obs2 ont la même longueur).<br>\n- Nombre de concordances exactes : $A = \\sum (1 \\text{ si } obs1[i] == obs2[i])$.<br>\n- Taux d'accord brut : $P_0 = (A / U) \\times 100$ (1 décimale).<br><br>\nDiagnostic de concordance (seuil méthodologique de Miles &amp; Huberman) :<br>\n- Si $P_0 \\ge 85.0\\%$ : <code>FIABILITE=EXCELLENTE_CONCORDANCE_FORTE</code><br>\n- Sinon si $P_0 \\ge 70.0\\%$ : <code>FIABILITE=ACCEPTABLE_CONCORDANCE_MODEREE</code><br>\n- Sinon : <code>FIABILITE=INSUFFISANTE_GRILLE_AMBIGUE (REVOIR_DEFINITIONS)</code><br><br>\nAfficher :<br>\n<code>ACCORD_OBSERVATEURS: {session} -> ACCORDS={A}/{U} ({P_0:.1f}%) | {FIABILITE}</code></p>",
    starter: "# Grille d'analyse (eq3-c4-e3) — Grille d’observation comportementale et accord inter-observateurs\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Accord acceptable à 80%]\n# Données : OBSERVATION session=S2 obs1=O,N,O,O,N,O,N,O,O,N obs2=O,N,O,N,N,O,N,O,N,N\nA_COMPLETER\n\n[Cas 2 — Grille ambiguë avec fort désaccord]\n# Données : OBSERVATION session=S3 obs1=O,O,O,O,O,N,N,N,N,N obs2=N,N,O,O,N,O,O,N,N,O\nA_COMPLETER\n\n[Cas 3 — Très bonne concordance à 90%]\n# Données : OBSERVATION session=S4 obs1=A,B,A,B,A,B,A,B,A,B obs2=A,B,A,B,A,B,A,B,A,A\nA_COMPLETER\n",
    hints: [
          "Comparer les symboles élément par élément aux mêmes indices.",
          "Calculer le ratio accords / total."
    ],
    examples: [
          {
                "stdin": "OBSERVATION session=S1 obs1=O,N,O,O,N,O,N,O,O,N obs2=O,N,O,O,N,O,N,O,O,N",
                "expected": "ACCORD_OBSERVATEURS: S1 -> ACCORDS=10/10 (100.0%) | FIABILITE=EXCELLENTE_CONCORDANCE_FORTE",
                "note": "Accord parfait à 100% sur les 10 intervalles temporels."
          }
    ],
    tests: [
          {
                "label": "Accord acceptable à 80%",
                "stdin": "cas:1",
                "expected": "ACCORD_OBSERVATEURS: S2 -> ACCORDS=8/10 (80.0%) | FIABILITE=ACCEPTABLE_CONCORDANCE_MODEREE"
          },
          {
                "label": "Grille ambiguë avec fort désaccord",
                "stdin": "cas:2",
                "expected": "ACCORD_OBSERVATEURS: S3 -> ACCORDS=4/10 (40.0%) | FIABILITE=INSUFFISANTE_GRILLE_AMBIGUE (REVOIR_DEFINITIONS)"
          },
          {
                "label": "Très bonne concordance à 90%",
                "stdin": "cas:3",
                "expected": "ACCORD_OBSERVATEURS: S4 -> ACCORDS=9/10 (90.0%) | FIABILITE=EXCELLENTE_CONCORDANCE_FORTE"
          }
    ],
    solution: "[Exemple]\nACCORD_OBSERVATEURS: S1 -> ACCORDS=10/10 (100.0%) | FIABILITE=EXCELLENTE_CONCORDANCE_FORTE\n\n[Cas 1 — Accord acceptable à 80%]\nACCORD_OBSERVATEURS: S2 -> ACCORDS=8/10 (80.0%) | FIABILITE=ACCEPTABLE_CONCORDANCE_MODEREE\n\n[Cas 2 — Grille ambiguë avec fort désaccord]\nACCORD_OBSERVATEURS: S3 -> ACCORDS=4/10 (40.0%) | FIABILITE=INSUFFISANTE_GRILLE_AMBIGUE (REVOIR_DEFINITIONS)\n\n[Cas 3 — Très bonne concordance à 90%]\nACCORD_OBSERVATEURS: S4 -> ACCORDS=9/10 (90.0%) | FIABILITE=EXCELLENTE_CONCORDANCE_FORTE\n"
  }
];
