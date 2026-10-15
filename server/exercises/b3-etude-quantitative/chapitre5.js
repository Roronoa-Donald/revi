/**
 * Exercices Chapitre 5 — Étude Quantitative & Qualitative B3.
 * Analyse Statistique Descriptive & Inférentielle.
 */
'use strict';

module.exports = [
  {
    id: 'eq3-c5-e1',
    chapter: 5,
    title: 'Calculateur de statistiques descriptives univariées',
    level: 'n1',
    language: 'python',
    goal: 'Calculer la moyenne, la médiane, l’écart-type et l’étendue d’une série numérique d’observations.',
    brief: '<p>Le script lit sur l\'entrée standard :<br>\n<code>STATS variable=&lt;nom&gt; donnees=&lt;v1,v2,v3,...&gt;</code>.<br><br>\nCalculs statistiques :<br>\n- Nombre d\'observations : $N$.<br>\n- Moyenne : $\\mu = \\frac{1}{N} \\sum x_i$ (2 décimales).<br>\n- Médiane : Si $N$ est impair, l\'élément central de la série triée ; si $N$ est pair, la moyenne des deux éléments centraux (2 décimales).<br>\n- Écart-type population : $\\sigma = \\sqrt{\\frac{1}{N} \\sum (x_i - \\mu)^2}$ (2 décimales).<br>\n- Étendue : $\\text{max}(x) - \\text{min}(x)$ (2 décimales).<br><br>\nAfficher :<br>\n<code>DESCRIPTIVE: {variable} -> N={N} | MOY={mu:.2f} MED={med:.2f} SIGMA={sigma:.2f} | ETENDUE={etendue:.2f}</code></p>',
    starter: `import sys
import math

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer moyenne, médiane, écart-type et étendue
`,
    hints: [
      'Trier les données pour déterminer la médiane.',
      'Gérer le cas N pair et N impair pour la médiane.'
    ],
    examples: [
      {
        stdin: 'STATS variable=TempsReponse donnees=10,20,30,40,50',
        expected: 'DESCRIPTIVE: TempsReponse -> N=5 | MOY=30.00 MED=30.00 SIGMA=14.14 | ETENDUE=40.00',
        note: 'Série de 5 valeurs : moyenne 30.00, médiane 30.00, écart-type 14.14.'
      }
    ],
    tests: [
      {
        label: 'Série paire de 6 valeurs avec dispersion',
        stdin: 'STATS variable=SalairesK donnees=30,35,40,45,50,60',
        expected: 'DESCRIPTIVE: SalairesK -> N=6 | MOY=43.33 MED=42.50 SIGMA=9.86 | ETENDUE=30.00'
      },
      {
        label: 'Série avec valeurs identiques',
        stdin: 'STATS variable=Constante donnees=15,15,15,15',
        expected: 'DESCRIPTIVE: Constante -> N=4 | MOY=15.00 MED=15.00 SIGMA=0.00 | ETENDUE=0.00'
      },
      {
        label: 'Série asymétrique avec valeurs décimales',
        stdin: 'STATS variable=Latence donnees=1.5,2.0,2.5,3.0,10.0',
        expected: 'DESCRIPTIVE: Latence -> N=5 | MOY=3.80 MED=2.50 SIGMA=3.14 | ETENDUE=8.50'
      }
    ],
    solution: `import sys
import math
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    m = re.search(r'variable=([^\\s]+)\\s+donnees=([^\\s]+)', lig)
    if not m:
        continue
    var_nom, vals_str = m.groups()
    
    vals = [float(x.strip()) for x in vals_str.split(',') if x.strip()]
    n = len(vals)
    if n == 0:
        continue
        
    s_vals = sorted(vals)
    mu = sum(s_vals) / n
    
    if n % 2 == 1:
        med = s_vals[n // 2]
    else:
        med = (s_vals[n // 2 - 1] + s_vals[n // 2]) / 2.0
        
    var = sum((x - mu)**2 for x in s_vals) / n
    sigma = math.sqrt(var)
    etendue = max(s_vals) - min(s_vals)
    
    print(f"DESCRIPTIVE: {var_nom} -> N={n} | MOY={mu:.2f} MED={med:.2f} SIGMA={sigma:.2f} | ETENDUE={etendue:.2f}")
`
  },
  {
    id: 'eq3-c5-e2',
    chapter: 5,
    title: 'Test d’indépendance du Chi-deux (χ²) sur tableau de contingence 2x2',
    level: 'n2',
    language: 'python',
    goal: 'Tester l’existence d’un lien statistiquement significatif entre deux variables qualitatives catégorielles.',
    brief: '<p>Le script lit sur l\'entrée standard :<br>\n<code>CHIDEUX tableau=&lt;nom&gt; a=&lt;a&gt; b=&lt;b&gt; c=&lt;c&gt; d=&lt;d&gt;</code>.<br><br>\nStructure de contingence $2 \\times 2$ :<br>\nLigne 1 : $a, b$ (Total $R_1 = a + b$).<br>\nLigne 2 : $c, d$ (Total $R_2 = c + d$).<br>\nColonnes : Total $C_1 = a + c$, Total $C_2 = b + d$. Total général $N = a + b + c + d$.<br><br>\nEffectifs théoriques sous $H_0$ (indépendance) :<br>\n$$E_a = \\frac{R_1 \\cdot C_1}{N}, \\quad E_b = \\frac{R_1 \\cdot C_2}{N}, \\quad E_c = \\frac{R_2 \\cdot C_1}{N}, \\quad E_d = \\frac{R_2 \\cdot C_2}{N}$$<br>\nStatistique du test :<br>\n$$\\chi^2 = \\frac{(a - E_a)^2}{E_a} + \\frac{(b - E_b)^2}{E_b} + \\frac{(c - E_c)^2}{E_c} + \\frac{(d - E_d)^2}{E_d}$$<br>\nArrondir $\\chi^2$ à 2 décimales.<br><br>\nRègle de décision au seuil critique $\\alpha=0.05$ pour 1 ddl (valeur critique canonique $= 3.84$) :<br>\n- Si $\\chi^2 &gt; 3.84$ : <code>DECISION=REJET_H0_LIAISON_SIGNIFICATIVE (p &lt; 0.05)</code><br>\n- Sinon : <code>DECISION=NON_REJET_H0_INDEPENDANCE</code><br><br>\nAfficher :<br>\n<code>TEST_CHI2: {tableau} -> CHI2={chi2:.2f} (SEUIL=3.84) | {DECISION}</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer la statistique Chi-deux et trancher l'hypothèse nulle
`,
    hints: [
      'Calculer les totaux de lignes et de colonnes pour les effectifs théoriques.',
      'Comparer la statistique obtenue au seuil de 3.84.'
    ],
    examples: [
      {
        stdin: 'CHIDEUX tableau=AdoptionCloud a=40 b=10 c=20 d=30',
        expected: 'TEST_CHI2: AdoptionCloud -> CHI2=16.67 (SEUIL=3.84) | DECISION=REJET_H0_LIAISON_SIGNIFICATIVE (p < 0.05)',
        note: 'Chi2 de 16.67 largement supérieur à 3.84 : rejet catégorique de l’indépendance.'
      }
    ],
    tests: [
      {
        label: 'Variables indépendantes sans lien significatif',
        stdin: 'CHIDEUX tableau=GenreEtOS a=25 b=25 c=24 d=26',
        expected: 'TEST_CHI2: GenreEtOS -> CHI2=0.04 (SEUIL=3.84) | DECISION=NON_REJET_H0_INDEPENDANCE'
      },
      {
        label: 'Lien modéré mais significatif',
        stdin: 'CHIDEUX tableau=FormationEtPromotion a=30 b=20 c=15 d=35',
        expected: 'TEST_CHI2: FormationEtPromotion -> CHI2=9.09 (SEUIL=3.84) | DECISION=REJET_H0_LIAISON_SIGNIFICATIVE (p < 0.05)'
      },
      {
        label: 'Écart faible sous le seuil critique',
        stdin: 'CHIDEUX tableau=PreferenceNavigateur a=30 b=25 c=28 d=32',
        expected: 'TEST_CHI2: PreferenceNavigateur -> CHI2=0.71 (SEUIL=3.84) | DECISION=NON_REJET_H0_INDEPENDANCE'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    m = re.search(r'tableau=([^\\s]+)\\s+a=(\\d+)\\s+b=(\\d+)\\s+c=(\\d+)\\s+d=(\\d+)', lig)
    if not m:
        continue
    tab, a_str, b_str, c_str, d_str = m.groups()
    a, b, c, d = map(int, [a_str, b_str, c_str, d_str])
    
    r1 = a + b
    r2 = c + d
    c1 = a + c
    c2 = b + d
    total = a + b + c + d
    
    if total == 0 or r1 == 0 or r2 == 0 or c1 == 0 or c2 == 0:
        continue
        
    ea = (r1 * c1) / total
    eb = (r1 * c2) / total
    ec = (r2 * c1) / total
    ed = (r2 * c2) / total
    
    chi2 = ((a - ea)**2) / ea + ((b - eb)**2) / eb + ((c - ec)**2) / ec + ((d - ed)**2) / ed
    
    if chi2 > 3.84:
        decision = 'DECISION=REJET_H0_LIAISON_SIGNIFICATIVE (p < 0.05)'
    else:
        decision = 'DECISION=NON_REJET_H0_INDEPENDANCE'
        
    print(f"TEST_CHI2: {tab} -> CHI2={chi2:.2f} (SEUIL=3.84) | {decision}")
`
  },
  {
    id: 'eq3-c5-e3',
    chapter: 5,
    title: 'Coefficient de corrélation linéaire de Pearson (r)',
    level: 'n3',
    language: 'python',
    goal: 'Mesurer la force et la direction de l’association linéaire entre deux variables numériques quantitatives continues.',
    brief: '<p>Le script lit sur l\'entrée standard :<br>\n<code>PEARSON serie=&lt;nom&gt; x=&lt;x1,x2,...&gt; y=&lt;y1,y2,...&gt;</code>.<br><br>\nFormule du coefficient de Pearson :<br>\n$$r = \\frac{\\sum (x_i - \\bar{x})(y_i - \\bar{y})}{\\sqrt{\\sum (x_i - \\bar{x})^2 \\cdot \\sum (y_i - \\bar{y})^2}}$$<br>\nArrondir $r$ à 3 décimales.<br><br>\nQualification de la corrélation selon la convention académique :<br>\n- Si $r \\ge 0.700$ : <code>CORRELATION=FORTE_POSITIVE</code><br>\n- Sinon si $r \\ge 0.300$ : <code>CORRELATION=MODEREE_POSITIVE</code><br>\n- Sinon si $r &gt; -0.300$ : <code>CORRELATION=NULLE_OU_NEGLIGEABLE</code><br>\n- Sinon si $r &gt; -0.700$ : <code>CORRELATION=MODEREE_NEGATIVE</code><br>\n- Sinon : <code>CORRELATION=FORTE_NEGATIVE</code><br><br>\nAfficher :<br>\n<code>PEARSON_CORR: {serie} -> r={r:.3f} | {CORRELATION}</code></p>',
    starter: `import sys
import math

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer le coefficient de corrélation de Pearson
`,
    hints: [
      'Calculer les moyennes de x et y avant les sommes de carrés d’écarts.',
      'Prendre garde aux dénominateurs nuls.'
    ],
    examples: [
      {
        stdin: 'PEARSON serie=PerfCode x=1,2,3,4,5 y=2,4,5,4,5',
        expected: 'PEARSON_CORR: PerfCode -> r=0.775 | CORRELATION=FORTE_POSITIVE',
        note: 'r = 0.775 indique une corrélation forte et positive entre les deux variables.'
      }
    ],
    tests: [
      {
        label: 'Corrélation inverse forte négative',
        stdin: 'PEARSON serie=AgeEtTempsApprentissage x=20,30,40,50,60 y=50,40,30,22,10',
        expected: 'PEARSON_CORR: AgeEtTempsApprentissage -> r=-0.999 | CORRELATION=FORTE_NEGATIVE'
      },
      {
        label: 'Corrélation négligeable ou nulle',
        stdin: 'PEARSON serie=TailleEtScore x=150,160,170,180,190 y=85,82,88,81,86',
        expected: 'PEARSON_CORR: TailleEtScore -> r=0.055 | CORRELATION=NULLE_OU_NEGLIGEABLE'
      },
      {
        label: 'Corrélation modérée positive',
        stdin: 'PEARSON serie=HeuresEtNote x=2,4,6,8,10 y=10,11,15,13,16',
        expected: 'PEARSON_CORR: HeuresEtNote -> r=0.868 | CORRELATION=FORTE_POSITIVE'
      }
    ],
    solution: `import sys
import math
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    m = re.search(r'serie=([^\\s]+)\\s+x=([^\\s]+)\\s+y=([^\\s]+)', lig)
    if not m:
        continue
    serie, x_str, y_str = m.groups()
    
    xs = [float(val.strip()) for val in x_str.split(',') if val.strip()]
    ys = [float(val.strip()) for val in y_str.split(',') if val.strip()]
    
    n = min(len(xs), len(ys))
    if n == 0:
        continue
        
    mx = sum(xs[:n]) / n
    my = sum(ys[:n]) / n
    
    num = sum((xs[i] - mx) * (ys[i] - my) for i in range(n))
    den_x = sum((xs[i] - mx)**2 for i in range(n))
    den_y = sum((ys[i] - my)**2 for i in range(n))
    den = math.sqrt(den_x * den_y)
    
    r = (num / den) if den > 0 else 0.0
    
    if r >= 0.700:
        qual = 'CORRELATION=FORTE_POSITIVE'
    elif r >= 0.300:
        qual = 'CORRELATION=MODEREE_POSITIVE'
    elif r > -0.300:
        qual = 'CORRELATION=NULLE_OU_NEGLIGEABLE'
    elif r > -0.700:
        qual = 'CORRELATION=MODEREE_NEGATIVE'
    else:
        qual = 'CORRELATION=FORTE_NEGATIVE'
        
    print(f"PEARSON_CORR: {serie} -> r={r:.3f} | {qual}")
`
  }
];
