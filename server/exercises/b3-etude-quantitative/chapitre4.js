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
    goal: "Calculer l’accord brut et le kappa de Cohen non pondéré, puis en identifier les limites.",
    brief: "<p>Deux observateurs indépendants codent les mêmes unités selon deux catégories : O (présence) et N (absence). Pour chaque cas :<br>\n<code>OBSERVATION session=&lt;id&gt; OO=&lt;nombre&gt; ON=&lt;nombre&gt; NO=&lt;nombre&gt; NN=&lt;nombre&gt;</code>.<br>\nLa première lettre désigne le codage de l’observateur 1 (ligne), la seconde celui de l’observateur 2 (colonne). Les quatre effectifs sont entiers, positifs ou nuls, et leur somme $U$ est strictement positive.<br><br>\nCalculs :<br>\n- Accords $A = OO + NN$ et accord brut $P_0 = A / U$.<br>\n- Accord attendu à partir des marges : $P_e = [(OO+ON)(OO+NO) + (NO+NN)(ON+NN)] / U^2$.<br>\n- Si $P_e &lt; 1$, kappa non pondéré $\\kappa = (P_0 - P_e)/(1 - P_e)$ ; si $P_e = 1$, il est <code>INDEFINI</code>.<br>\n- Afficher $P_0$ et $P_e$ en pourcentage à une décimale, et le kappa à trois décimales.<br><br>\nUn accord brut élevé ne garantit ni objectivité ni absence d’ambiguïté. Le kappa dépend des marges et ne remplace pas l’examen des désaccords.<br><br>\nAfficher :<br>\n<code>ACCORD_OBSERVATEURS: {session} -> ACCORDS={A}/{U} ({P_0:.1f}%) | PE={P_e:.1f}% | KAPPA={kappa}</code></p>",
    starter: "# Grille d'analyse (eq3-c4-e3) — Grille d’observation comportementale et accord inter-observateurs\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Accord brut de 80%]\n# Données : OBSERVATION session=S2 OO=6 ON=1 NO=1 NN=2\nA_COMPLETER\n\n[Cas 2 — Accord brut de 90% et catégories rares]\n# Données : OBSERVATION session=S3 OO=90 ON=5 NO=5 NN=0\nA_COMPLETER\n\n[Cas 3 — Accord attendu égal à 100%]\n# Données : OBSERVATION session=S4 OO=10 ON=0 NO=0 NN=0\nA_COMPLETER\n",
    hints: [
          "Construire les marges du tableau et additionner les deux produits des proportions marginales correspondantes.",
          "Comparer l’accord brut à l’accord attendu ; si ce dernier vaut 1, le dénominateur du kappa est nul."
    ],
    examples: [
          {
                "stdin": "OBSERVATION session=S1 OO=4 ON=1 NO=1 NN=4",
                "expected": "ACCORD_OBSERVATEURS: S1 -> ACCORDS=8/10 (80.0%) | PE=50.0% | KAPPA=0.600",
                "note": "L’accord brut est de 80% ; les deux marges équilibrées donnent un accord attendu de 50%."
          }
    ],
    tests: [
          {
                "label": "Accord brut de 80%",
                "stdin": "cas:1",
                "expected": "ACCORD_OBSERVATEURS: S2 -> ACCORDS=8/10 (80.0%) | PE=58.0% | KAPPA=0.524"
          },
          {
                "label": "Accord brut de 90% et catégories rares",
                "stdin": "cas:2",
                "expected": "ACCORD_OBSERVATEURS: S3 -> ACCORDS=90/100 (90.0%) | PE=90.5% | KAPPA=-0.053"
          },
          {
                "label": "Accord attendu égal à 100%",
                "stdin": "cas:3",
                "expected": "ACCORD_OBSERVATEURS: S4 -> ACCORDS=10/10 (100.0%) | PE=100.0% | KAPPA=INDEFINI"
          }
    ],
    solution: "[Exemple]\nACCORD_OBSERVATEURS: S1 -> ACCORDS=8/10 (80.0%) | PE=50.0% | KAPPA=0.600\n\n[Cas 1 — Accord brut de 80%]\nACCORD_OBSERVATEURS: S2 -> ACCORDS=8/10 (80.0%) | PE=58.0% | KAPPA=0.524\n\n[Cas 2 — Accord brut de 90% et catégories rares]\nACCORD_OBSERVATEURS: S3 -> ACCORDS=90/100 (90.0%) | PE=90.5% | KAPPA=-0.053\n\n[Cas 3 — Accord attendu égal à 100%]\nACCORD_OBSERVATEURS: S4 -> ACCORDS=10/10 (100.0%) | PE=100.0% | KAPPA=INDEFINI\n"
  }
];
