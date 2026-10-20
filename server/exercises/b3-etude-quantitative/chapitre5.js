/**
 * chapitre5.js — Études de cas du cours « b3-etude-quantitative ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    id: "eq3-c5-e1",
    chapter: 5,
    level: "n1",
    language: 'analyse',
    title: "Calculateur de statistiques descriptives univariées",
    goal: "Calculer la moyenne, la médiane, l’écart-type et l’étendue d’une série numérique d’observations.",
    brief: "<p>Pour chaque cas d’application :<br>\n<code>STATS variable=&lt;nom&gt; donnees=&lt;v1,v2,v3,...&gt;</code>.<br><br>\nCalculs statistiques :<br>\n- Nombre d'observations : $N$.<br>\n- Moyenne : $\\mu = \\frac{1}{N} \\sum x_i$ (2 décimales).<br>\n- Médiane : Si $N$ est impair, l'élément central de la série triée ; si $N$ est pair, la moyenne des deux éléments centraux (2 décimales).<br>\n- Écart-type population : $\\sigma = \\sqrt{\\frac{1}{N} \\sum (x_i - \\mu)^2}$ (2 décimales).<br>\n- Étendue : $\\text{max}(x) - \\text{min}(x)$ (2 décimales).<br><br>\nAfficher :<br>\n<code>DEcasIVE: {variable} -> N={N} | MOY={mu:.2f} MED={med:.2f} SIGMA={sigma:.2f} | ETENDUE={etendue:.2f}</code></p>",
    starter: "# Grille d'analyse (eq3-c5-e1) — Calculateur de statistiques descriptives univariées\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Série paire de 6 valeurs avec dispersion]\n# Données : STATS variable=SalairesK donnees=30,35,40,45,50,60\nA_COMPLETER\n\n[Cas 2 — Série avec valeurs identiques]\n# Données : STATS variable=Constante donnees=15,15,15,15\nA_COMPLETER\n\n[Cas 3 — Série asymétrique avec valeurs décimales]\n# Données : STATS variable=Latence donnees=1.5,2.0,2.5,3.0,10.0\nA_COMPLETER\n",
    hints: [
          "Trier les données pour déterminer la médiane.",
          "Gérer le cas N pair et N impair pour la médiane."
    ],
    examples: [
          {
                "stdin": "STATS variable=TempsReponse donnees=10,20,30,40,50",
                "expected": "DESCRIPTIVE: TempsReponse -> N=5 | MOY=30.00 MED=30.00 SIGMA=14.14 | ETENDUE=40.00",
                "note": "Série de 5 valeurs : moyenne 30.00, médiane 30.00, écart-type 14.14."
          }
    ],
    tests: [
          {
                "label": "Série paire de 6 valeurs avec dispersion",
                "stdin": "cas:1",
                "expected": "DESCRIPTIVE: SalairesK -> N=6 | MOY=43.33 MED=42.50 SIGMA=9.86 | ETENDUE=30.00"
          },
          {
                "label": "Série avec valeurs identiques",
                "stdin": "cas:2",
                "expected": "DESCRIPTIVE: Constante -> N=4 | MOY=15.00 MED=15.00 SIGMA=0.00 | ETENDUE=0.00"
          },
          {
                "label": "Série asymétrique avec valeurs décimales",
                "stdin": "cas:3",
                "expected": "DESCRIPTIVE: Latence -> N=5 | MOY=3.80 MED=2.50 SIGMA=3.14 | ETENDUE=8.50"
          }
    ],
    solution: "[Exemple]\nDESCRIPTIVE: TempsReponse -> N=5 | MOY=30.00 MED=30.00 SIGMA=14.14 | ETENDUE=40.00\n\n[Cas 1 — Série paire de 6 valeurs avec dispersion]\nDESCRIPTIVE: SalairesK -> N=6 | MOY=43.33 MED=42.50 SIGMA=9.86 | ETENDUE=30.00\n\n[Cas 2 — Série avec valeurs identiques]\nDESCRIPTIVE: Constante -> N=4 | MOY=15.00 MED=15.00 SIGMA=0.00 | ETENDUE=0.00\n\n[Cas 3 — Série asymétrique avec valeurs décimales]\nDESCRIPTIVE: Latence -> N=5 | MOY=3.80 MED=2.50 SIGMA=3.14 | ETENDUE=8.50\n"
  },
  {
    id: "eq3-c5-e2",
    chapter: 5,
    level: "n2",
    language: 'analyse',
    title: "Test d’indépendance du Chi-deux (χ²) sur tableau de contingence 2x2",
    goal: "Tester l’existence d’un lien statistiquement significatif entre deux variables qualitatives catégorielles.",
    brief: "<p>Pour chaque cas d’application :<br>\n<code>CHIDEUX tableau=&lt;nom&gt; a=&lt;a&gt; b=&lt;b&gt; c=&lt;c&gt; d=&lt;d&gt;</code>.<br><br>\nStructure de contingence $2 \\times 2$ :<br>\nLigne 1 : $a, b$ (Total $R_1 = a + b$).<br>\nLigne 2 : $c, d$ (Total $R_2 = c + d$).<br>\nColonnes : Total $C_1 = a + c$, Total $C_2 = b + d$. Total général $N = a + b + c + d$.<br><br>\nEffectifs théoriques sous $H_0$ (indépendance) :<br>\n$$E_a = \\frac{R_1 \\cdot C_1}{N}, \\quad E_b = \\frac{R_1 \\cdot C_2}{N}, \\quad E_c = \\frac{R_2 \\cdot C_1}{N}, \\quad E_d = \\frac{R_2 \\cdot C_2}{N}$$<br>\nStatistique du test :<br>\n$$\\chi^2 = \\frac{(a - E_a)^2}{E_a} + \\frac{(b - E_b)^2}{E_b} + \\frac{(c - E_c)^2}{E_c} + \\frac{(d - E_d)^2}{E_d}$$<br>\nArrondir $\\chi^2$ à 2 décimales.<br><br>\nRègle de décision au seuil critique $\\alpha=0.05$ pour 1 ddl (valeur critique canonique $= 3.84$) :<br>\n- Si $\\chi^2 &gt; 3.84$ : <code>DECISION=REJET_H0_LIAISON_SIGNIFICATIVE (p &lt; 0.05)</code><br>\n- Sinon : <code>DECISION=NON_REJET_H0_INDEPENDANCE</code><br><br>\nAfficher :<br>\n<code>TEST_CHI2: {tableau} -> CHI2={chi2:.2f} (SEUIL=3.84) | {DECISION}</code></p>",
    starter: "# Grille d'analyse (eq3-c5-e2) — Test d’indépendance du Chi-deux (χ²) sur tableau de contingence 2x2\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Variables indépendantes sans lien significatif]\n# Données : CHIDEUX tableau=GenreEtOS a=25 b=25 c=24 d=26\nA_COMPLETER\n\n[Cas 2 — Lien modéré mais significatif]\n# Données : CHIDEUX tableau=FormationEtPromotion a=30 b=20 c=15 d=35\nA_COMPLETER\n\n[Cas 3 — Écart faible sous le seuil critique]\n# Données : CHIDEUX tableau=PreferenceNavigateur a=30 b=25 c=28 d=32\nA_COMPLETER\n",
    hints: [
          "Calculer les totaux de lignes et de colonnes pour les effectifs théoriques.",
          "Comparer la statistique obtenue au seuil de 3.84."
    ],
    examples: [
          {
                "stdin": "CHIDEUX tableau=AdoptionCloud a=40 b=10 c=20 d=30",
                "expected": "TEST_CHI2: AdoptionCloud -> CHI2=16.67 (SEUIL=3.84) | DECISION=REJET_H0_LIAISON_SIGNIFICATIVE (p < 0.05)",
                "note": "Chi2 de 16.67 largement supérieur à 3.84 : rejet catégorique de l’indépendance."
          }
    ],
    tests: [
          {
                "label": "Variables indépendantes sans lien significatif",
                "stdin": "cas:1",
                "expected": "TEST_CHI2: GenreEtOS -> CHI2=0.04 (SEUIL=3.84) | DECISION=NON_REJET_H0_INDEPENDANCE"
          },
          {
                "label": "Lien modéré mais significatif",
                "stdin": "cas:2",
                "expected": "TEST_CHI2: FormationEtPromotion -> CHI2=9.09 (SEUIL=3.84) | DECISION=REJET_H0_LIAISON_SIGNIFICATIVE (p < 0.05)"
          },
          {
                "label": "Écart faible sous le seuil critique",
                "stdin": "cas:3",
                "expected": "TEST_CHI2: PreferenceNavigateur -> CHI2=0.71 (SEUIL=3.84) | DECISION=NON_REJET_H0_INDEPENDANCE"
          }
    ],
    solution: "[Exemple]\nTEST_CHI2: AdoptionCloud -> CHI2=16.67 (SEUIL=3.84) | DECISION=REJET_H0_LIAISON_SIGNIFICATIVE (p < 0.05)\n\n[Cas 1 — Variables indépendantes sans lien significatif]\nTEST_CHI2: GenreEtOS -> CHI2=0.04 (SEUIL=3.84) | DECISION=NON_REJET_H0_INDEPENDANCE\n\n[Cas 2 — Lien modéré mais significatif]\nTEST_CHI2: FormationEtPromotion -> CHI2=9.09 (SEUIL=3.84) | DECISION=REJET_H0_LIAISON_SIGNIFICATIVE (p < 0.05)\n\n[Cas 3 — Écart faible sous le seuil critique]\nTEST_CHI2: PreferenceNavigateur -> CHI2=0.71 (SEUIL=3.84) | DECISION=NON_REJET_H0_INDEPENDANCE\n"
  },
  {
    id: "eq3-c5-e3",
    chapter: 5,
    level: "n3",
    language: 'analyse',
    title: "Coefficient de corrélation linéaire de Pearson (r)",
    goal: "Mesurer la force et la direction de l’association linéaire entre deux variables numériques quantitatives continues.",
    brief: "<p>Pour chaque cas d’application :<br>\n<code>PEARSON serie=&lt;nom&gt; x=&lt;x1,x2,...&gt; y=&lt;y1,y2,...&gt;</code>.<br><br>\nFormule du coefficient de Pearson :<br>\n$$r = \\frac{\\sum (x_i - \\bar{x})(y_i - \\bar{y})}{\\sqrt{\\sum (x_i - \\bar{x})^2 \\cdot \\sum (y_i - \\bar{y})^2}}$$<br>\nArrondir $r$ à 3 décimales.<br><br>\nQualification de la corrélation selon la convention académique :<br>\n- Si $r \\ge 0.700$ : <code>CORRELATION=FORTE_POSITIVE</code><br>\n- Sinon si $r \\ge 0.300$ : <code>CORRELATION=MODEREE_POSITIVE</code><br>\n- Sinon si $r &gt; -0.300$ : <code>CORRELATION=NULLE_OU_NEGLIGEABLE</code><br>\n- Sinon si $r &gt; -0.700$ : <code>CORRELATION=MODEREE_NEGATIVE</code><br>\n- Sinon : <code>CORRELATION=FORTE_NEGATIVE</code><br><br>\nAfficher :<br>\n<code>PEARSON_CORR: {serie} -> r={r:.3f} | {CORRELATION}</code></p>",
    starter: "# Grille d'analyse (eq3-c5-e3) — Coefficient de corrélation linéaire de Pearson (r)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Corrélation inverse forte négative]\n# Données : PEARSON serie=AgeEtTempsApprentissage x=20,30,40,50,60 y=50,40,30,22,10\nA_COMPLETER\n\n[Cas 2 — Corrélation négligeable ou nulle]\n# Données : PEARSON serie=TailleEtScore x=150,160,170,180,190 y=85,82,88,81,86\nA_COMPLETER\n\n[Cas 3 — Corrélation modérée positive]\n# Données : PEARSON serie=HeuresEtNote x=2,4,6,8,10 y=10,11,15,13,16\nA_COMPLETER\n",
    hints: [
          "Calculer les moyennes de x et y avant les sommes de carrés d’écarts.",
          "Prendre garde aux dénominateurs nuls."
    ],
    examples: [
          {
                "stdin": "PEARSON serie=PerfCode x=1,2,3,4,5 y=2,4,5,4,5",
                "expected": "PEARSON_CORR: PerfCode -> r=0.775 | CORRELATION=FORTE_POSITIVE",
                "note": "r = 0.775 indique une corrélation forte et positive entre les deux variables."
          }
    ],
    tests: [
          {
                "label": "Corrélation inverse forte négative",
                "stdin": "cas:1",
                "expected": "PEARSON_CORR: AgeEtTempsApprentissage -> r=-0.999 | CORRELATION=FORTE_NEGATIVE"
          },
          {
                "label": "Corrélation négligeable ou nulle",
                "stdin": "cas:2",
                "expected": "PEARSON_CORR: TailleEtScore -> r=0.055 | CORRELATION=NULLE_OU_NEGLIGEABLE"
          },
          {
                "label": "Corrélation modérée positive",
                "stdin": "cas:3",
                "expected": "PEARSON_CORR: HeuresEtNote -> r=0.868 | CORRELATION=FORTE_POSITIVE"
          }
    ],
    solution: "[Exemple]\nPEARSON_CORR: PerfCode -> r=0.775 | CORRELATION=FORTE_POSITIVE\n\n[Cas 1 — Corrélation inverse forte négative]\nPEARSON_CORR: AgeEtTempsApprentissage -> r=-0.999 | CORRELATION=FORTE_NEGATIVE\n\n[Cas 2 — Corrélation négligeable ou nulle]\nPEARSON_CORR: TailleEtScore -> r=0.055 | CORRELATION=NULLE_OU_NEGLIGEABLE\n\n[Cas 3 — Corrélation modérée positive]\nPEARSON_CORR: HeuresEtNote -> r=0.868 | CORRELATION=FORTE_POSITIVE\n"
  }
];
