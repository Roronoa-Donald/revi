/**
 * chapitre2.js — Études de cas du cours « b3-etude-quantitative ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    id: "eq3-c2-e1",
    chapter: 2,
    level: "n1",
    language: 'analyse',
    title: "Calculateur de taille d’échantillon probabiliste (Formule de Cochran)",
    goal: "Calculer la taille minimale d’échantillon requise selon le niveau de confiance, la marge d’erreur et la taille de population.",
    brief: "<p>Pour chaque cas d’application :<br>\n<code>COCHRAN etude=&lt;nom&gt; confiance=&lt;90|95|99&gt; erreur=&lt;pct_erreur&gt; p=&lt;proportion&gt; [N=&lt;taille_pop&gt;]</code>.<br><br>\nParamètres statistiques :<br>\n- Coefficient $z$ selon le niveau de confiance :<br>\n  - 90% : $z = 1.645$<br>\n  - 95% : $z = 1.96$<br>\n  - 99% : $z = 2.576$<br>\n- Marge d'erreur $e = \\text{erreur} / 100.0$ (ex: erreur=5 -&gt; $e = 0.05$).<br>\n- Proportion attendue $p$ (ex: 0.5 pour variabilité maximale).<br><br>\nFormule de Cochran (population infinie) :<br>\n$$n_0 = \\frac{z^2 \\cdot p \\cdot (1 - p)}{e^2}$$<br>\nCorrection pour population finie (si $N$ est spécifié et $N &gt; 0$) :<br>\n$$n = \\frac{n_0}{1 + \\frac{n_0 - 1}{N}}$$<br>\nSinon $n = n_0$.<br>\nLa taille requise est arrondie à l'entier supérieur : $n_{final} = \\lceil n \\rceil$ (via <code>math.ceil</code>).<br><br>\nAfficher :<br>\n<code>ECHANTILLON: {etude} -> N_POP={N_ou_INFINI} | CONFIANCE={confiance}% ERREUR={erreur}% | TAILLE_REQUISE={n_final}</code></p>",
    starter: "# Grille d'analyse (eq3-c2-e1) — Calculateur de taille d’échantillon probabiliste (Formule de Cochran)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Population finie N=1000 avec correction]\n# Données : COCHRAN etude=EnqueteEntreprise confiance=95 erreur=5.0 p=0.5 N=1000\nA_COMPLETER\n\n[Cas 2 — Haute précision 99% avec erreur 3%]\n# Données : COCHRAN etude=ControleQualite confiance=99 erreur=3.0 p=0.5 N=5000\nA_COMPLETER\n\n[Cas 3 — Niveau 90% avec forte proportion connue p=0.8]\n# Données : COCHRAN etude=UsageMobile confiance=90 erreur=4.0 p=0.8\nA_COMPLETER\n",
    hints: [
          "Gérer N comme optionnel (INFINI si absent ou égal à 0).",
          "Appliquer math.ceil sur le résultat final."
    ],
    examples: [
          {
                "stdin": "COCHRAN etude=SondageNational confiance=95 erreur=5.0 p=0.5",
                "expected": "ECHANTILLON: SondageNational -> N_POP=INFINI | CONFIANCE=95% ERREUR=5.0% | TAILLE_REQUISE=385",
                "note": "Cas classique : confiance 95% et marge d’erreur 5% donne n0 = 384.16 -> 385 répondants."
          }
    ],
    tests: [
          {
                "label": "Population finie N=1000 avec correction",
                "stdin": "cas:1",
                "expected": "ECHANTILLON: EnqueteEntreprise -> N_POP=1000 | CONFIANCE=95% ERREUR=5.0% | TAILLE_REQUISE=278"
          },
          {
                "label": "Haute précision 99% avec erreur 3%",
                "stdin": "cas:2",
                "expected": "ECHANTILLON: ControleQualite -> N_POP=5000 | CONFIANCE=99% ERREUR=3.0% | TAILLE_REQUISE=1347"
          },
          {
                "label": "Niveau 90% avec forte proportion connue p=0.8",
                "stdin": "cas:3",
                "expected": "ECHANTILLON: UsageMobile -> N_POP=INFINI | CONFIANCE=90% ERREUR=4.0% | TAILLE_REQUISE=271"
          }
    ],
    solution: "[Exemple]\nECHANTILLON: SondageNational -> N_POP=INFINI | CONFIANCE=95% ERREUR=5.0% | TAILLE_REQUISE=385\n\n[Cas 1 — Population finie N=1000 avec correction]\nECHANTILLON: EnqueteEntreprise -> N_POP=1000 | CONFIANCE=95% ERREUR=5.0% | TAILLE_REQUISE=278\n\n[Cas 2 — Haute précision 99% avec erreur 3%]\nECHANTILLON: ControleQualite -> N_POP=5000 | CONFIANCE=99% ERREUR=3.0% | TAILLE_REQUISE=1347\n\n[Cas 3 — Niveau 90% avec forte proportion connue p=0.8]\nECHANTILLON: UsageMobile -> N_POP=INFINI | CONFIANCE=90% ERREUR=4.0% | TAILLE_REQUISE=271\n"
  },
  {
    id: "eq3-c2-e2",
    chapter: 2,
    level: "n2",
    language: 'analyse',
    title: "Échantillonnage stratifié proportionnel",
    goal: "Calculer la ventilation exacte des quotas de sondage par sous-population selon leur poids démographique réel.",
    brief: "<p>Pour chaque cas d’application :<br>\n<code>STRATIFIE etude=&lt;nom&gt; n=&lt;taille_echantillon&gt; strates=&lt;NOM1&gt;:&lt;N1&gt;,&lt;NOM2&gt;:&lt;N2&gt;,...</code>.<br><br>\nCalculs :<br>\n- Calculer la population totale mère : $N = \\sum N_i$.<br>\n- Pour chaque strate $i$ :<br>\n  - Poids relatif : $W_i = N_i / N$.<br>\n  - Effectif théorique à sonder : $n_i = \\text{round}(n \\times W_i)$.<br>\n  - Pourcentage dans l'échantillon : $P_i = (n_i / n) \\times 100$ (1 décimale).<br><br>\nAfficher :<br>\n<code>STRATIFICATION: {etude} (N_TOTAL={N}, n_CIBLE={n})</code><br>\nPour chaque strate dans l'ordre d'apparition :<br>\n<code>  - {NOM_i}: N_pop={N_i} (W={W_i*100:.1f}%) -> n_sonde={n_i} ({P_i:.1f}%)</code></p>",
    starter: "# Grille d'analyse (eq3-c2-e2) — Échantillonnage stratifié proportionnel\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Échantillonnage universitaire sur 3 facultés]\n# Données : STRATIFIE etude=CampusTech n=150 strates=INFO:600,RESEAUX:300,CYBER:100\nA_COMPLETER\n\n[Cas 2 — Échantillon médical avec effectifs variés]\n# Données : STRATIFIE etude=PersonnelSante n=100 strates=MEDECINS:50,INFIRMIERS:350,AIDES:600\nA_COMPLETER\n\n[Cas 3 — Deux strates équilibrées]\n# Données : STRATIFIE etude=PariteEquipe n=80 strates=FEMMES:250,HOMMES:250\nA_COMPLETER\n",
    hints: [
          "Sommer tous les Ni pour obtenir la population mère totale N.",
          "Utiliser round() pour arrondir chaque effectif à sonder."
    ],
    examples: [
          {
                "stdin": "STRATIFIE etude=SondageDSI n=200 strates=DEV:400,OPS:300,QA:200,DIR:100",
                "expected": "STRATIFICATION: SondageDSI (N_TOTAL=1000, n_CIBLE=200)\n  - DEV: N_pop=400 (W=40.0%) -> n_sonde=80 (40.0%)\n  - OPS: N_pop=300 (W=30.0%) -> n_sonde=60 (30.0%)\n  - QA: N_pop=200 (W=20.0%) -> n_sonde=40 (20.0%)\n  - DIR: N_pop=100 (W=10.0%) -> n_sonde=20 (10.0%)",
                "note": "La répartition est rigoureusement proportionnelle au poids de chaque strate."
          }
    ],
    tests: [
          {
                "label": "Échantillonnage universitaire sur 3 facultés",
                "stdin": "cas:1",
                "expected": "STRATIFICATION: CampusTech (N_TOTAL=1000, n_CIBLE=150)\n  - INFO: N_pop=600 (W=60.0%) -> n_sonde=90 (60.0%)\n  - RESEAUX: N_pop=300 (W=30.0%) -> n_sonde=45 (30.0%)\n  - CYBER: N_pop=100 (W=10.0%) -> n_sonde=15 (10.0%)"
          },
          {
                "label": "Échantillon médical avec effectifs variés",
                "stdin": "cas:2",
                "expected": "STRATIFICATION: PersonnelSante (N_TOTAL=1000, n_CIBLE=100)\n  - MEDECINS: N_pop=50 (W=5.0%) -> n_sonde=5 (5.0%)\n  - INFIRMIERS: N_pop=350 (W=35.0%) -> n_sonde=35 (35.0%)\n  - AIDES: N_pop=600 (W=60.0%) -> n_sonde=60 (60.0%)"
          },
          {
                "label": "Deux strates équilibrées",
                "stdin": "cas:3",
                "expected": "STRATIFICATION: PariteEquipe (N_TOTAL=500, n_CIBLE=80)\n  - FEMMES: N_pop=250 (W=50.0%) -> n_sonde=40 (50.0%)\n  - HOMMES: N_pop=250 (W=50.0%) -> n_sonde=40 (50.0%)"
          }
    ],
    solution: "[Exemple]\nSTRATIFICATION: SondageDSI (N_TOTAL=1000, n_CIBLE=200)\n  - DEV: N_pop=400 (W=40.0%) -> n_sonde=80 (40.0%)\n  - OPS: N_pop=300 (W=30.0%) -> n_sonde=60 (30.0%)\n  - QA: N_pop=200 (W=20.0%) -> n_sonde=40 (20.0%)\n  - DIR: N_pop=100 (W=10.0%) -> n_sonde=20 (10.0%)\n\n[Cas 1 — Échantillonnage universitaire sur 3 facultés]\nSTRATIFICATION: CampusTech (N_TOTAL=1000, n_CIBLE=150)\n  - INFO: N_pop=600 (W=60.0%) -> n_sonde=90 (60.0%)\n  - RESEAUX: N_pop=300 (W=30.0%) -> n_sonde=45 (30.0%)\n  - CYBER: N_pop=100 (W=10.0%) -> n_sonde=15 (10.0%)\n\n[Cas 2 — Échantillon médical avec effectifs variés]\nSTRATIFICATION: PersonnelSante (N_TOTAL=1000, n_CIBLE=100)\n  - MEDECINS: N_pop=50 (W=5.0%) -> n_sonde=5 (5.0%)\n  - INFIRMIERS: N_pop=350 (W=35.0%) -> n_sonde=35 (35.0%)\n  - AIDES: N_pop=600 (W=60.0%) -> n_sonde=60 (60.0%)\n\n[Cas 3 — Deux strates équilibrées]\nSTRATIFICATION: PariteEquipe (N_TOTAL=500, n_CIBLE=80)\n  - FEMMES: N_pop=250 (W=50.0%) -> n_sonde=40 (50.0%)\n  - HOMMES: N_pop=250 (W=50.0%) -> n_sonde=40 (50.0%)\n"
  },
  {
    id: "eq3-c2-e3",
    chapter: 2,
    level: "n3",
    language: 'analyse',
    title: "Contrôleur de conformité et représentativité par quotas",
    goal: "Comparer la distribution d’un échantillon empirique aux quotas cibles de la population et détecter les biais de sélection.",
    brief: "<p>Pour chaque cas d’application :<br>\n<code>QUOTAS etude=&lt;nom&gt; cibles=&lt;C1&gt;:&lt;P1&gt;,&lt;C2&gt;:&lt;P2&gt;,... obs=&lt;C1&gt;:&lt;N1&gt;,&lt;C2&gt;:&lt;N2&gt;,...</code>.<br>\nOù les cibles sont des pourcentages théoriques et obs les effectifs observés.<br><br>\nCalculs :<br>\n- Calculer le total observé $T_{obs} = \\sum N_i$.<br>\n- Pour chaque catégorie $i$ :<br>\n  - Pourcentage observé : $P_{obs,i} = (N_i / T_{obs}) \\times 100$.<br>\n  - Écart absolu : $\\Delta_i = |P_{obs,i} - P_{cible,i}|$.<br>\n- Écart maximum : $\\Delta_{max} = \\max(\\Delta_i)$.<br><br>\nQualification du biais d'échantillonnage :<br>\n- Si $\\Delta_{max} \\le 3.0\\%$ : <code>CONFORMITE=EXCELLENTE_REPRESENTATIF</code><br>\n- Sinon si $\\Delta_{max} \\le 6.0\\%$ : <code>CONFORMITE=ACCEPTABLE_BIAIS_LEGER</code><br>\n- Sinon : <code>CONFORMITE=REJET_BIAIS_CRITIQUE (REDRESSEMENT_REQUIS)</code><br><br>\nAfficher :<br>\n<code>AUDIT_QUOTAS: {etude} -> TOTAL_OBS={T_obs} | ECART_MAX={Delta_max:.1f}% | {CONFORMITE}</code></p>",
    starter: "# Grille d'analyse (eq3-c2-e3) — Contrôleur de conformité et représentativité par quotas\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Échantillon avec biais modéré acceptable]\n# Données : QUOTAS etude=PanelConsommateurs cibles=HOMMES:50.0,FEMMES:50.0 obs=HOMMES:275,FEMMES:225\nA_COMPLETER\n\n[Cas 2 — Échantillon fortement biaisé rejeté]\n# Données : QUOTAS etude=EtudeJeunes cibles=ETUDIANT:40.0,ACTIF:40.0,CHOMEUR:20.0 obs=ETUDIANT:300,ACTIF:80,CHOMEUR:20\nA_COMPLETER\n\n[Cas 3 — Quotas strictement parfaits]\n# Données : QUOTAS etude=TestEquilibre cibles=A:25.0,B:25.0,C:25.0,D:25.0 obs=A:50,B:50,C:50,D:50\nA_COMPLETER\n",
    hints: [
          "Calculer le total observé pour obtenir les pourcentages réels.",
          "Comparer les écarts absolus avec les quotas cibles."
    ],
    examples: [
          {
                "stdin": "QUOTAS etude=SondageSalaries cibles=JUNIOR:30.0,CONFIRME:50.0,SENIOR:20.0 obs=JUNIOR:140,CONFIRME:260,SENIOR:100",
                "expected": "AUDIT_QUOTAS: SondageSalaries -> TOTAL_OBS=500 | ECART_MAX=2.0% | CONFORMITE=EXCELLENTE_REPRESENTATIF",
                "note": "Écart max = 2.0% (Junior 28% vs 30%, Confirmé 52% vs 50%) : représentativité excellente."
          }
    ],
    tests: [
          {
                "label": "Échantillon avec biais modéré acceptable",
                "stdin": "cas:1",
                "expected": "AUDIT_QUOTAS: PanelConsommateurs -> TOTAL_OBS=500 | ECART_MAX=5.0% | CONFORMITE=ACCEPTABLE_BIAIS_LEGER"
          },
          {
                "label": "Échantillon fortement biaisé rejeté",
                "stdin": "cas:2",
                "expected": "AUDIT_QUOTAS: EtudeJeunes -> TOTAL_OBS=400 | ECART_MAX=35.0% | CONFORMITE=REJET_BIAIS_CRITIQUE (REDRESSEMENT_REQUIS)"
          },
          {
                "label": "Quotas strictement parfaits",
                "stdin": "cas:3",
                "expected": "AUDIT_QUOTAS: TestEquilibre -> TOTAL_OBS=200 | ECART_MAX=0.0% | CONFORMITE=EXCELLENTE_REPRESENTATIF"
          }
    ],
    solution: "[Exemple]\nAUDIT_QUOTAS: SondageSalaries -> TOTAL_OBS=500 | ECART_MAX=2.0% | CONFORMITE=EXCELLENTE_REPRESENTATIF\n\n[Cas 1 — Échantillon avec biais modéré acceptable]\nAUDIT_QUOTAS: PanelConsommateurs -> TOTAL_OBS=500 | ECART_MAX=5.0% | CONFORMITE=ACCEPTABLE_BIAIS_LEGER\n\n[Cas 2 — Échantillon fortement biaisé rejeté]\nAUDIT_QUOTAS: EtudeJeunes -> TOTAL_OBS=400 | ECART_MAX=35.0% | CONFORMITE=REJET_BIAIS_CRITIQUE (REDRESSEMENT_REQUIS)\n\n[Cas 3 — Quotas strictement parfaits]\nAUDIT_QUOTAS: TestEquilibre -> TOTAL_OBS=200 | ECART_MAX=0.0% | CONFORMITE=EXCELLENTE_REPRESENTATIF\n"
  }
];
