/**
 * chapitre2.js — Études de cas du cours « b3-etude-quantitative ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    "id": "eq3-c2-e1",
    "chapter": 2,
    "level": "n1",
    "language": "analyse",
    "title": "Le baromètre annuel de la ville de Sainte-Rose",
    "exampleTitle": "Exemple résolu — l'enquête des abonnés du réseau Filbus",
    "goal": "Dimensionner un échantillon avec la règle simplifiée n = 1/e² et distinguer quotas et échantillon.",
    "brief": "<p><strong>Énoncé.</strong> La ville de Sainte-Rose (18 000 habitants) commande à l'institut Novéa un baromètre annuel de satisfaction de ses habitants. Il n'existe pas de liste nominative des habitants, mais le recensement fournit la structure exacte de la population par tranche d'âge et par sexe. Pour un premier chiffrage, l'institut applique la <strong>règle simplifiée de dimensionnement : n = 1/e²</strong>, où e est la marge d'erreur exprimée en décimale.</p><ol><li>Comment s'appelle le sous-ensemble d'habitants que l'institut va réellement interroger pour représenter la ville ? (un mot)</li><li>Quelle taille d'échantillon donne la règle n = 1/e² pour une marge d'erreur e = 0,05 ?</li><li>Le commanditaire accepte une marge d'erreur plus large, e = 0,10 : quelle taille d'échantillon suffit alors ?</li><li>Quand la marge d'erreur double (de 0,05 à 0,10), par quel facteur la taille requise est-elle divisée ? (un nombre)</li><li>Les enquêteurs devront respecter la structure par âge et par sexe de la population, sans tirage au sort : quelle méthode d'échantillonnage est imposée ici ?</li><li>Cette méthode est-elle probabiliste ou non probabiliste ?</li></ol>",
    "starter": "# Exercice — Le baromètre annuel de la ville de Sainte-Rose\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Les questions 2, 3 et 4 attendent des nombres ; les autres des termes du cours.\n\n[Question 1 — Sous-ensemble réellement interrogé (un mot)]\nA_COMPLETER\n\n[Question 2 — Taille requise pour e = 0,05]\nA_COMPLETER\n\n[Question 3 — Taille requise pour e = 0,10]\nA_COMPLETER\n\n[Question 4 — Facteur de division quand e double]\nA_COMPLETER\n\n[Question 5 — Méthode imposée aux enquêteurs]\nA_COMPLETER\n\n[Question 6 — Probabiliste ou non probabiliste ?]\nA_COMPLETER\n",
    "hints": [
      "L'échantillon est le sous-ensemble de la population mère sur lequel porte effectivement l'enquête.",
      "Dans la règle n = 1/e², la taille varie comme l'inverse du carré de la marge d'erreur : doubler e multiplie e² par 4, donc divise n par 4.",
      "Sans base de sondage nominative mais avec une structure de population connue (âge, sexe), les enquêteurs reconstituent un modèle réduit de la population : la méthode des quotas, qui n'est pas probabiliste."
    ],
    "examples": [
      {
        "stdin": "Une association mesure la satisfaction des abonnés de son réseau de bus Filbus : 6 000 abonnés, pas de liste nominative, structure par âge connue. Règle n = 1/e².\n\n1) Sous-ensemble interrogé : l'échantillon.\n2) e = 0,02 : n = 1/0,0004 = 2 500 abonnés.\n3) e = 0,04 : n = 1/0,0016 = 625 abonnés.\n4) e doublé (0,02 puis 0,04) : taille divisée par 4.\n5) Méthode sans tirage au sort avec structure par âge : les quotas.\n6) Les quotas forment une méthode non probabiliste.",
        "expected": "échantillon — 2 500 — 625 — divisée par 4 — quotas — non probabiliste",
        "note": "La précision coûte cher : diviser la marge d'erreur par deux quadruple la taille d'échantillon nécessaire."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Sous-ensemble réellement interrogé",
        "stdin": "q:1",
        "expected": "échantillon||un échantillon||l'échantillon||l’échantillon"
      },
      {
        "label": "Question 2 — Taille requise pour e = 0,05",
        "stdin": "q:2",
        "expected": "400||400 habitants"
      },
      {
        "label": "Question 3 — Taille requise pour e = 0,10",
        "stdin": "q:3",
        "expected": "100||100 habitants"
      },
      {
        "label": "Question 4 — Facteur de division quand e double",
        "stdin": "q:4",
        "expected": "4||par 4"
      },
      {
        "label": "Question 5 — Méthode imposée aux enquêteurs",
        "stdin": "q:5",
        "expected": "quotas||méthode des quotas||la méthode des quotas"
      },
      {
        "label": "Question 6 — Probabiliste ou non probabiliste ?",
        "stdin": "q:6",
        "expected": "non probabiliste||non-probabiliste||empirique"
      }
    ],
    "solution": "[Question 1 — Sous-ensemble réellement interrogé (un mot)]\néchantillon\n\n[Question 2 — Taille requise pour e = 0,05]\n400\n\n[Question 3 — Taille requise pour e = 0,10]\n100\n\n[Question 4 — Facteur de division quand e double]\n4\n\n[Question 5 — Méthode imposée aux enquêteurs]\nquotas\n\n[Question 6 — Probabiliste ou non probabiliste ?]\nnon probabiliste",
    "takeaway": "1) L'institut interrogera un échantillon : le sous-ensemble de la population mère choisi pour l'étudier.\n2) n = 1/e² = 1/0,05² = 1/0,0025 = 400 habitants.\n3) n = 1/0,10² = 1/0,01 = 100 habitants.\n4) La taille requise est divisée par 4 : n est proportionnel à 1/e², et 0,10 = 2 × 0,05 donc (0,10)² = 4 × (0,05)². Contrôle : 400/4 = 100.\n5) Sans liste nominative mais avec une structure de population connue (âge, sexe), les enquêteurs appliquent la méthode des quotas : reconstituer un modèle réduit de la population.\n6) La méthode des quotas n'est pas probabiliste : aucune probabilité de sélection n'est calculée, contrairement au tirage au sort. Le respect des quotas ne garantît d'ailleurs ni la représentativité des autres caractéristiques ni l'absence de biais de sélection."
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
      "Attribuer les minima faisables, puis répartir le reste selon les capacités résiduelles par plus forts restes ; départager les égalités dans l’ordre.",
      "Respectez d abord les planchers minimaux par strate avant de répartir le reliquat proportionnellement aux poids W_i sans dépasser les capacités max."
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
    solution: "[Exemple]\nSTRATIFICATION: SondageDSI (N_TOTAL=1000, n_CIBLE=200)\n  - DEV: N_pop=400 (W=40.0%) -> n_sonde=80 (40.0%)\n  - OPS: N_pop=300 (W=30.0%) -> n_sonde=60 (30.0%)\n  - QA: N_pop=200 (W=20.0%) -> n_sonde=40 (20.0%)\n  - DIR: N_pop=100 (W=10.0%) -> n_sonde=20 (10.0%)\n\n[Cas 1 — Échantillonnage universitaire sur 3 facultés]\nSTRATIFICATION: CampusTech (N_TOTAL=1000, n_CIBLE=150)\n  - INFO: N_pop=600 (W=60.0%) -> n_sonde=90 (60.0%)\n  - RESEAUX: N_pop=300 (W=30.0%) -> n_sonde=45 (30.0%)\n  - CYBER: N_pop=100 (W=10.0%) -> n_sonde=15 (10.0%)\n\n[Cas 2 — Respect des capacités des strates]\nSTRATIFICATION: PersonnelSante (N_TOTAL=7, n_CIBLE=6)\n  - MEDECINS: N_pop=1 (W=14.3%) -> n_sonde=1 (16.7%)\n  - INFIRMIERS: N_pop=2 (W=28.6%) -> n_sonde=2 (33.3%)\n  - AIDES: N_pop=4 (W=57.1%) -> n_sonde=3 (50.0%)\n\n[Cas 3 — Une unité pour trois strates égales]\nSTRATIFICATION: Mini (N_TOTAL=3, n_CIBLE=1)\n  - A: N_pop=1 (W=33.3%) -> n_sonde=1 (100.0%)\n  - B: N_pop=1 (W=33.3%) -> n_sonde=0 (0.0%)\n  - C: N_pop=1 (W=33.3%) -> n_sonde=0 (0.0%)\n\n[Cas 4 — Minima réalisables et capacités résiduelles]\nSTRATIFICATION: Minima (N_TOTAL=7, n_CIBLE=5)\n  - A: N_pop=1 (W=14.3%) -> n_sonde=1 (20.0%)\n  - B: N_pop=2 (W=28.6%) -> n_sonde=1 (20.0%)\n  - C: N_pop=4 (W=57.1%) -> n_sonde=3 (60.0%)\n\n[Cas 5 — Minima impossibles]\nSTRATIFICATION: MiniBloque -> IMPOSSIBLE (CONTRAINTES)\n\n[Cas 6 — Échantillon supérieur à la population]\nSTRATIFICATION: HorsCapacite -> IMPOSSIBLE (CONTRAINTES)\n",
    takeaway: "À retenir : Répartir un échantillon entier en respectant les minima éventuels, les capacités des strates et la taille cible.\nRepère : La répartition est rigoureusement proportionnelle au poids de chaque strate."
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
      "Comparer les écarts absolus avec les quotas cibles.",
      "Comparez chaque pourcentage observé au quota cible en points de pourcentage ; vérifiez que l écart max respecte la tolérance avant de conclure."
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
    solution: "[Exemple]\nAUDIT_QUOTAS: SondageSalaries -> TOTAL_OBS=500 | ECART_MAX=2.0 points | CONFORMITE_QUOTAS=OUI\n\n[Cas 1 — Écart de cinq points]\nAUDIT_QUOTAS: PanelConsommateurs -> TOTAL_OBS=500 | ECART_MAX=5.0 points | CONFORMITE_QUOTAS=NON\n\n[Cas 2 — Écart important aux quotas]\nAUDIT_QUOTAS: EtudeJeunes -> TOTAL_OBS=400 | ECART_MAX=35.0 points | CONFORMITE_QUOTAS=NON\n\n[Cas 3 — Quotas A/B respectés malgré la sélection]\nAUDIT_QUOTAS: TestEquilibre -> TOTAL_OBS=10 | ECART_MAX=0.0 points | CONFORMITE_QUOTAS=OUI\n",
    takeaway: "À retenir : Comparer les proportions observées aux quotas cibles sans conclure à la représentativité générale.\nRepère : Écart maximal de 2 points sur les catégories contrôlées ; les autres caractéristiques restent à examiner."
  }
];
