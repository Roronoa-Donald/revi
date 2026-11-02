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
    goal: "Répartir un échantillon entier en respectant les minima éventuels, les capacités des strates et la taille cible.",
    brief: "<p>Pour chaque cas d’application :<br>\n<code>STRATIFIE etude=&lt;nom&gt; n=&lt;taille&gt; strates=&lt;NOM1&gt;:&lt;N1&gt;,&lt;NOM2&gt;:&lt;N2&gt;,... [minima=&lt;NOM1&gt;:&lt;m1&gt;,&lt;NOM2&gt;:&lt;m2&gt;,...]</code>.<br>\nLes tailles $N_i$ et les minima $m_i$ sont des entiers positifs ou nuls. Les noms de strates sont distincts ; si les minima sont fournis, ils mentionnent chaque strate une fois. Sans minima, prendre $m_i=0$. Le tirage est sans remplacement.<br><br>\nVérifier $N=\\sum N_i &gt; 0$, $1 \\le n \\le N$, $0 \\le m_i \\le N_i$ et $\\sum m_i \\le n$. Si une condition échoue, afficher uniquement <code>STRATIFICATION: {etude} -> IMPOSSIBLE (CONTRAINTES)</code>.<br><br>\nSinon :<br>\n- Attribuer les minima, puis calculer $R=n-\\sum m_i$ et les capacités résiduelles $C_i=N_i-m_i$. Si $R=0$, ne rien ajouter.<br>\n- Si $R&gt;0$, calculer les parts $q_i=R C_i/\\sum C_i$, puis attribuer leurs planchers et distribuer les unités restantes aux <strong>plus forts restes</strong>. En cas d’égalité, respecter l’ordre des strates.<br>\n- Vérifier $m_i \\le n_i \\le N_i$ et $\\sum n_i=n$. Sans minimum, la règle revient à répartir $n$ proportionnellement aux tailles initiales ; avec minima, elle répartit le reste selon les capacités résiduelles.<br>\n- Calculer $W_i=N_i/N$ et $P_i=100 n_i/n$, affichés à une décimale.<br><br>\nAfficher :<br>\n<code>STRATIFICATION: {etude} (N_TOTAL={N}, n_CIBLE={n})</code><br>\nPour chaque strate dans l’ordre d’apparition :<br>\n<code>  - {NOM_i}: N_pop={N_i} (W={W_i*100:.1f}%) -> n_sonde={n_i} ({P_i:.1f}%)</code></p>",
    starter: "# Grille d'analyse (eq3-c2-e2) — Échantillonnage stratifié proportionnel\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Échantillonnage universitaire sur 3 facultés]\n# Données : STRATIFIE etude=CampusTech n=150 strates=INFO:600,RESEAUX:300,CYBER:100\nA_COMPLETER\n\n[Cas 2 — Respect des capacités des strates]\n# Données : STRATIFIE etude=PersonnelSante n=6 strates=MEDECINS:1,INFIRMIERS:2,AIDES:4\nA_COMPLETER\n\n[Cas 3 — Une unité pour trois strates égales]\n# Données : STRATIFIE etude=Mini n=1 strates=A:1,B:1,C:1\nA_COMPLETER\n\n[Cas 4 — Minima réalisables et capacités résiduelles]\n# Données : STRATIFIE etude=Minima n=5 strates=A:1,B:2,C:4 minima=A:1,B:0,C:1\nA_COMPLETER\n\n[Cas 5 — Minima impossibles]\n# Données : STRATIFIE etude=MiniBloque n=1 strates=A:1,B:1,C:1 minima=A:1,B:1,C:1\nA_COMPLETER\n\n[Cas 6 — Échantillon supérieur à la population]\n# Données : STRATIFIE etude=HorsCapacite n=4 strates=A:1,B:1,C:1\nA_COMPLETER\n",
    hints: [
          "Sommer tous les Ni pour obtenir la population mère totale N.",
          "Attribuer les minima faisables, puis répartir le reste selon les capacités résiduelles par plus forts restes ; départager les égalités dans l’ordre."
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
                "label": "Respect des capacités des strates",
                "stdin": "cas:2",
                "expected": "STRATIFICATION: PersonnelSante (N_TOTAL=7, n_CIBLE=6)\n  - MEDECINS: N_pop=1 (W=14.3%) -> n_sonde=1 (16.7%)\n  - INFIRMIERS: N_pop=2 (W=28.6%) -> n_sonde=2 (33.3%)\n  - AIDES: N_pop=4 (W=57.1%) -> n_sonde=3 (50.0%)"
          },
          {
                "label": "Une unité pour trois strates égales",
                "stdin": "cas:3",
                "expected": "STRATIFICATION: Mini (N_TOTAL=3, n_CIBLE=1)\n  - A: N_pop=1 (W=33.3%) -> n_sonde=1 (100.0%)\n  - B: N_pop=1 (W=33.3%) -> n_sonde=0 (0.0%)\n  - C: N_pop=1 (W=33.3%) -> n_sonde=0 (0.0%)"
          },
          {
                "label": "Minima réalisables et capacités résiduelles",
                "stdin": "cas:4",
                "expected": "STRATIFICATION: Minima (N_TOTAL=7, n_CIBLE=5)\n  - A: N_pop=1 (W=14.3%) -> n_sonde=1 (20.0%)\n  - B: N_pop=2 (W=28.6%) -> n_sonde=1 (20.0%)\n  - C: N_pop=4 (W=57.1%) -> n_sonde=3 (60.0%)"
          },
          {
                "label": "Minima impossibles",
                "stdin": "cas:5",
                "expected": "STRATIFICATION: MiniBloque -> IMPOSSIBLE (CONTRAINTES)"
          },
          {
                "label": "Échantillon supérieur à la population",
                "stdin": "cas:6",
                "expected": "STRATIFICATION: HorsCapacite -> IMPOSSIBLE (CONTRAINTES)"
          }
    ],
    solution: "[Exemple]\nSTRATIFICATION: SondageDSI (N_TOTAL=1000, n_CIBLE=200)\n  - DEV: N_pop=400 (W=40.0%) -> n_sonde=80 (40.0%)\n  - OPS: N_pop=300 (W=30.0%) -> n_sonde=60 (30.0%)\n  - QA: N_pop=200 (W=20.0%) -> n_sonde=40 (20.0%)\n  - DIR: N_pop=100 (W=10.0%) -> n_sonde=20 (10.0%)\n\n[Cas 1 — Échantillonnage universitaire sur 3 facultés]\nSTRATIFICATION: CampusTech (N_TOTAL=1000, n_CIBLE=150)\n  - INFO: N_pop=600 (W=60.0%) -> n_sonde=90 (60.0%)\n  - RESEAUX: N_pop=300 (W=30.0%) -> n_sonde=45 (30.0%)\n  - CYBER: N_pop=100 (W=10.0%) -> n_sonde=15 (10.0%)\n\n[Cas 2 — Respect des capacités des strates]\nSTRATIFICATION: PersonnelSante (N_TOTAL=7, n_CIBLE=6)\n  - MEDECINS: N_pop=1 (W=14.3%) -> n_sonde=1 (16.7%)\n  - INFIRMIERS: N_pop=2 (W=28.6%) -> n_sonde=2 (33.3%)\n  - AIDES: N_pop=4 (W=57.1%) -> n_sonde=3 (50.0%)\n\n[Cas 3 — Une unité pour trois strates égales]\nSTRATIFICATION: Mini (N_TOTAL=3, n_CIBLE=1)\n  - A: N_pop=1 (W=33.3%) -> n_sonde=1 (100.0%)\n  - B: N_pop=1 (W=33.3%) -> n_sonde=0 (0.0%)\n  - C: N_pop=1 (W=33.3%) -> n_sonde=0 (0.0%)\n\n[Cas 4 — Minima réalisables et capacités résiduelles]\nSTRATIFICATION: Minima (N_TOTAL=7, n_CIBLE=5)\n  - A: N_pop=1 (W=14.3%) -> n_sonde=1 (20.0%)\n  - B: N_pop=2 (W=28.6%) -> n_sonde=1 (20.0%)\n  - C: N_pop=4 (W=57.1%) -> n_sonde=3 (60.0%)\n\n[Cas 5 — Minima impossibles]\nSTRATIFICATION: MiniBloque -> IMPOSSIBLE (CONTRAINTES)\n\n[Cas 6 — Échantillon supérieur à la population]\nSTRATIFICATION: HorsCapacite -> IMPOSSIBLE (CONTRAINTES)\n"
  },
  {
    id: "eq3-c2-e3",
    chapter: 2,
    level: "n3",
    language: 'analyse',
    title: "Contrôleur de conformité des quotas",
    goal: "Comparer les proportions observées aux quotas cibles sans conclure à la représentativité générale.",
    brief: "<p>Pour chaque cas d’application :<br>\n<code>QUOTAS etude=&lt;nom&gt; cibles=&lt;C1&gt;:&lt;P1&gt;,&lt;C2&gt;:&lt;P2&gt;,... obs=&lt;C1&gt;:&lt;N1&gt;,&lt;C2&gt;:&lt;N2&gt;,...</code>.<br>\nLes cibles sont des pourcentages totalisant 100 ; les effectifs observés sont positifs ou nuls, leur total est strictement positif et les catégories sont les mêmes.<br><br>\nCalculs :<br>\n- Calculer $T_{obs} = \\sum N_i$ et chaque proportion observée $P_{obs,i} = 100 N_i / T_{obs}$.<br>\n- Calculer $\\Delta_{max} = \\max |P_{obs,i} - P_{cible,i}|$ en <strong>points de pourcentage</strong>.<br>\n- Dans cet exercice seulement, le seuil de conformité choisi est 3,0 points : afficher <code>CONFORMITE_QUOTAS=OUI</code> si $\\Delta_{max} \\le 3$, sinon <code>CONFORMITE_QUOTAS=NON</code>.<br>\n- Afficher l’écart maximum à une décimale.<br><br>\nLe respect des quotas ne démontre pas la représentativité des autres caractéristiques ni l’absence de biais de sélection. Le seuil retenu ne mesure pas ces biais ; la pondération n’est pas une correction automatique de tous les biais.<br><br>\nAfficher :<br>\n<code>AUDIT_QUOTAS: {etude} -> TOTAL_OBS={T_obs} | ECART_MAX={Delta_max:.1f} points | CONFORMITE_QUOTAS={OUI ou NON}</code></p>",
    starter: "# Grille d'analyse (eq3-c2-e3) — Contrôleur de conformité des quotas\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Écart de cinq points]\n# Données : QUOTAS etude=PanelConsommateurs cibles=HOMMES:50.0,FEMMES:50.0 obs=HOMMES:275,FEMMES:225\nA_COMPLETER\n\n[Cas 2 — Écart important aux quotas]\n# Données : QUOTAS etude=EtudeJeunes cibles=ETUDIANT:40.0,ACTIF:40.0,CHOMEUR:20.0 obs=ETUDIANT:300,ACTIF:80,CHOMEUR:20\nA_COMPLETER\n\n[Cas 3 — Quotas A/B respectés malgré la sélection]\n# Données : QUOTAS etude=TestEquilibre cibles=A:50.0,B:50.0 obs=A:5,B:5\n# Contexte : 20 personnes sur 100 ont un revenu élevé dans la population, mais les 10 personnes sélectionnées ont toutes un revenu élevé.\nA_COMPLETER\n",
    hints: [
          "Calculer le total observé pour obtenir les pourcentages réels.",
          "Comparer les écarts absolus avec les quotas cibles."
    ],
    examples: [
          {
                "stdin": "QUOTAS etude=SondageSalaries cibles=JUNIOR:30.0,CONFIRME:50.0,SENIOR:20.0 obs=JUNIOR:140,CONFIRME:260,SENIOR:100",
                "expected": "AUDIT_QUOTAS: SondageSalaries -> TOTAL_OBS=500 | ECART_MAX=2.0 points | CONFORMITE_QUOTAS=OUI",
                "note": "Écart maximal de 2 points sur les catégories contrôlées ; les autres caractéristiques restent à examiner."
          }
    ],
    tests: [
          {
                "label": "Écart de cinq points",
                "stdin": "cas:1",
                "expected": "AUDIT_QUOTAS: PanelConsommateurs -> TOTAL_OBS=500 | ECART_MAX=5.0 points | CONFORMITE_QUOTAS=NON"
          },
          {
                "label": "Écart important aux quotas",
                "stdin": "cas:2",
                "expected": "AUDIT_QUOTAS: EtudeJeunes -> TOTAL_OBS=400 | ECART_MAX=35.0 points | CONFORMITE_QUOTAS=NON"
          },
          {
                "label": "Quotas A/B respectés malgré la sélection",
                "stdin": "cas:3",
                "expected": "AUDIT_QUOTAS: TestEquilibre -> TOTAL_OBS=10 | ECART_MAX=0.0 points | CONFORMITE_QUOTAS=OUI"
          }
    ],
    solution: "[Exemple]\nAUDIT_QUOTAS: SondageSalaries -> TOTAL_OBS=500 | ECART_MAX=2.0 points | CONFORMITE_QUOTAS=OUI\n\n[Cas 1 — Écart de cinq points]\nAUDIT_QUOTAS: PanelConsommateurs -> TOTAL_OBS=500 | ECART_MAX=5.0 points | CONFORMITE_QUOTAS=NON\n\n[Cas 2 — Écart important aux quotas]\nAUDIT_QUOTAS: EtudeJeunes -> TOTAL_OBS=400 | ECART_MAX=35.0 points | CONFORMITE_QUOTAS=NON\n\n[Cas 3 — Quotas A/B respectés malgré la sélection]\nAUDIT_QUOTAS: TestEquilibre -> TOTAL_OBS=10 | ECART_MAX=0.0 points | CONFORMITE_QUOTAS=OUI\n"
  }
];
