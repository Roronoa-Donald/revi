'use strict';

const fs = require('fs');
const path = require('path');

// 1. Clean b1-stats/chapitres-1-3.js
{
  const p = path.join(__dirname, '..', 'server', 'content', 'b1-stats', 'chapitres-1-3.js');
  let c = fs.readFileSync(p, 'utf8');

  // Replace Python box at line 96
  c = c.replace(
    /box\('tech', 'En Python', 'terminal',[\s\S]*?'croissant : la ligne complète décrit le caractère\.<\/p>'\)/,
    `box('standard', 'Modalités et effectifs d’un caractère', [
      '<p>Pour une série brute $X = (x_1, x_2, \\dots, x_N)$, on ordonne les valeurs par ordre croissant :</p>',
      '<div class="math-block">$$x_{(1)} \\le x_{(2)} \\le \\dots \\le x_{(N)}$$</div>',
      '<p>L’ensemble des valeurs distinctes $\\{x_1, \\dots, x_k\\}$ forme les <strong>$k$ modalités</strong> ($k \\le N$).</p>'
    ].join('\\n'))`
  );

  // Replace classes pre at line 111
  c = c.replace(
    /'<pre><code>nombre de classes      k\\n' \+\s*'amplitude              largeur de chaque classe = \(x<sub>max<\/sub> − x<sub>min<\/sub>\) \/ k\\n' \+\s*'classe n° i            \[x<sub>min<\/sub> \+ \(i − 1\)·largeur ; x<sub>min<\/sub> \+ i·largeur\[\\n' \+\s*'centre de classe       \(borne inférieure \+ borne supérieure\) \/ 2<\/code><\/pre>',/,
    `box('formula', 'Découpage en classes et amplitudes', [
      '<div class="box--formula">',
      '  <span class="formula-label">Amplitude d’une classe</span>',
      '  <div class="math-block">$$a = \\frac{x_{\\max} - x_{\\min}}{k}$$</div>',
      '</div>',
      '<div class="box--formula">',
      '  <span class="formula-label">Centre de la classe $[b_i, b_{i+1}[$</span>',
      '  <div class="math-block">$$c_i = \\frac{b_i + b_{i+1}}{2}$$</div>',
      '</div>'
    ].join('\\n')),`
  );

  // Replace frequency pre at line 241
  c = c.replace(
    /'<pre><code>f<sub>i<\/sub> = n<sub>i<\/sub> \/ N            avec  Σ f<sub>i<\/sub> = 1\\n' \+\s*'\\n' \+\s*'en pourcentage :  f<sub>i<\/sub> × 100       avec  Σ = 100 %<\/code><\/pre>',/,
    `'<div class="math-block">$$f_i = \\frac{n_i}{N} \\quad \\text{avec} \\quad \\sum_{i=1}^k f_i = 1 \\quad (\\text{soit } 100\\,\\%)$$</div>',`
  );

  // Replace Python box at line 247
  c = c.replace(
    /box\('tech', 'Le même calcul en Python', 'terminal',[\s\S]*?'lisible et stable\.<\/p>'\)/,
    `box('standard', 'Propriété des fréquences relatives', [
      '<p>La fréquence relative $f_i$ est un nombre sans dimension compris entre 0 et 1 :</p>',
      '<div class="math-block">$$0 \\le f_i \\le 1 \\quad \\forall i \\in \\{1, \\dots, k\\}$$</div>',
      '<p>Elle mesure la proportion relative d’individus présentant la modalité $x_i$.</p>'
    ].join('\\n'))`
  );

  // Replace ECC pre at line 264
  c = c.replace(
    /'<pre><code>ECC<sub>i<\/sub> = n₁ \+ n₂ \+ … \+ n<sub>i<\/sub><\/code><\/pre>',/,
    `'<div class="math-block">$$ECC_i = \\sum_{j=1}^i n_j = n_1 + n_2 + \\dots + n_i$$</div>',`
  );

  // Replace ECD pre at line 281
  c = c.replace(
    /'<pre><code>ECD<sub>i<\/sub> = n<sub>i<\/sub> \+ n<sub>i\+1<\/sub> \+ … \+ n<sub>k<\/sub><\/code><\/pre>',/,
    `'<div class="math-block">$$ECD_i = \\sum_{j=i}^k n_j = n_i + n_{i+1} + \\dots + n_k$$</div>',`
  );

  // Replace mean pre at lines 384-389
  c = c.replace(
    /'<pre><code>x̄ = \(x₁ \+ x₂ \+ … \+ xₙ\) \/ n<\/code><\/pre>',/,
    `'<div class="math-block">$$\\bar{x} = \\frac{1}{n} \\sum_{i=1}^n x_i$$</div>',`
  );
  c = c.replace(
    /'<pre><code>x̄ = \(n₁·x₁ \+ n₂·x₂ \+ … \+ n<sub>k<\/sub>·x<sub>k<\/sub>\) \/ N        avec N = Σ n<sub>i<\/sub><\/code><\/pre>',/,
    `'<div class="math-block">$$\\bar{x} = \\frac{1}{N} \\sum_{i=1}^k n_i x_i = \\sum_{i=1}^k f_i x_i \\quad \\left(N = \\sum_{i=1}^k n_i\\right)$$</div>',`
  );
  c = c.replace(
    /'<pre><code>x̄ = \(2·1 \+ 4·2 \+ 6·3 \+ 5·4 \+ 3·5\) \/ 20\\n' \+\s*'  = \(2 \+ 8 \+ 18 \+ 20 \+ 15\) \/ 20 = 63 \/ 20 = 3,15<\/code><\/pre>',/,
    `'<div class="math-block">$$\\bar{x} = \\frac{2 \\times 1 + 4 \\times 2 + 6 \\times 3 + 5 \\times 4 + 3 \\times 5}{20} = \\frac{63}{20} = 3{,}15$$</div>',`
  );
  c = c.replace(
    /'<pre><code>moyenne pondérée = Σ \(coefficient<sub>i<\/sub> × valeur<sub>i<\/sub>\) \/ Σ coefficient<sub>i<\/sub><\/code><\/pre>',/,
    `'<div class="math-block">$$\\bar{x} = \\frac{\\sum w_i x_i}{\\sum w_i}$$</div>',`
  );
  c = c.replace(
    /'<pre><code>x̄ = Σ n<sub>i<\/sub> · c<sub>i<\/sub> \/ N        où c<sub>i<\/sub> = \(borne inf \+ borne sup\) \/ 2<\/code><\/pre>',/,
    `'<div class="math-block">$$\\bar{x} = \\frac{1}{N} \\sum_{i=1}^k n_i c_i \\quad \\text{avec } c_i = \\frac{\\text{inf}_i + \\text{sup}_i}{2}$$</div>',`
  );
  c = c.replace(
    /'<pre><code>médiane   p = 0,50        Q1 : p = 0,25        Q3 : p = 0,75\\n' \+\s*'D1 : p = 0,10           D9 : p = 0,90<\/code><\/pre>',/,
    `'<div class="math-block">$$\\text{Médiane } (p = 0{,}50), \\quad Q_1 (p = 0{,}25), \\quad Q_3 (p = 0{,}75)$$</div>',`
  );

  fs.writeFileSync(p, c, 'utf8');
  console.log('[OK] b1-stats/chapitres-1-3.js mis à jour.');
}

// 2. Clean b1-stats/chapitres-4-6.js
{
  const p = path.join(__dirname, '..', 'server', 'content', 'b1-stats', 'chapitres-4-6.js');
  let c = fs.readFileSync(p, 'utf8');

  c = c.replace(
    /'<pre><code>e = x<sub>max<\/sub> − x<sub>min<\/sub><\/code><\/pre>',/,
    `'<div class="math-block">$$e = x_{\\max} - x_{\\min}$$</div>',`
  );
  c = c.replace(
    /'<pre><code>EI = Q3 − Q1<\/code><\/pre>',/,
    `'<div class="math-block">$$EI = Q_3 - Q_1$$</div>',`
  );
  c = c.replace(
    /'<pre><code>V = \(1\/N\) · Σ n<sub>i<\/sub> \(x<sub>i<\/sub> − x̄\)²<\/code><\/pre>',/,
    `'<div class="math-block">$$V = \\frac{1}{N} \\sum_{i=1}^k n_i (x_i - \\bar{x})^2$$</div>',`
  );
  c = c.replace(
    /'<pre><code>V = \(1\/N\) · Σ n<sub>i<\/sub> · x<sub>i<\/sub>²  −  x̄²<\/code><\/pre>',/,
    `'<div class="math-block">$$V = \\frac{1}{N} \\sum_{i=1}^k n_i x_i^2 - \\bar{x}^2 \\quad (\\text{Formule de König-Huygens})$$</div>',`
  );
  c = c.replace(
    /'<pre><code>σ = √V<\/code><\/pre>',/,
    `'<div class="math-block">$$\\sigma = \\sqrt{V}$$</div>',`
  );
  c = c.replace(
    /'<pre><code>CV = σ \/ x̄          \(exprimé souvent en pourcentage, si x̄ &gt; 0\)<\/code><\/pre>',/,
    `'<div class="math-block">$$CV = \\frac{\\sigma}{\\bar{x}} \\times 100\\,\\%$$</div>',`
  );

  c = c.replace(
    /'<pre><code>G = \( x̄ ; ȳ \)        x̄ = Σ x \/ n        ȳ = Σ y \/ n<\/code><\/pre>',/,
    `'<div class="math-block">$$G(\\bar{x}, \\bar{y}) \\quad \\text{avec } \\bar{x} = \\frac{1}{n} \\sum x_i, \\quad \\bar{y} = \\frac{1}{n} \\sum y_i$$</div>',`
  );
  c = c.replace(
    /'<pre><code>cov\(x, y\) = \(1\/n\) · Σ \(x<sub>i<\/sub> − x̄\)\(y<sub>i<\/sub> − ȳ\)<\/code><\/pre>',/,
    `'<div class="math-block">$$\\operatorname{cov}(X, Y) = \\frac{1}{n} \\sum_{i=1}^n (x_i - \\bar{x})(y_i - \\bar{y})$$</div>',`
  );
  c = c.replace(
    /'<pre><code>cov\(x, y\) = \(1\/n\) · Σ x<sub>i<\/sub>y<sub>i<\/sub>  −  x̄ · ȳ<\/code><\/pre>',/,
    `'<div class="math-block">$$\\operatorname{cov}(X, Y) = \\frac{1}{n} \\sum_{i=1}^n x_i y_i - \\bar{x} \\bar{y}$$</div>',`
  );
  c = c.replace(
    /'<pre><code>r = cov\(x, y\) \/ \(σ<sub>x<\/sub> · σ<sub>y<\/sub>\)<\/code><\/pre>',/,
    `'<div class="math-block">$$r = \\frac{\\operatorname{cov}(X, Y)}{\\sigma_x \\sigma_y} \\quad (-1 \\le r \\le 1)$$</div>',`
  );
  c = c.replace(
    /'<pre><code>a = cov\(x, y\) \/ V\(x\)          \(pente, ou coefficient directeur\)\\n' \+\s*'b = ȳ − a·x̄                     \(ordonnée à l’origine\)<\/code><\/pre>',/,
    `'<div class="math-block">$$a = \\frac{\\operatorname{cov}(X, Y)}{V(X)}, \\qquad b = \\bar{y} - a \\bar{x}$$</div>',`
  );

  // Replace Python box at line 281
  c = c.replace(
    /box\('tech', 'Les cinq valeurs, en Python', 'terminal',[\s\S]*?print\(f"intervalle:.*?"\)'\)/,
    `box('standard', 'Les cinq nombres de Tukey', [
      '<p>Le résumé à cinq nombres structure le diagramme en boîte (box-plot) :</p>',
      '<div class="math-block">$$x_{\\min} \\le Q_1 \\le \\text{Médiane} \\le Q_3 \\le x_{\\max}$$</div>',
      '<p>L’intervalle interquartile $EI = Q_3 - Q_1$ contient exactement 50 % des observations centrales.</p>'
    ].join('\\n'))`
  );

  fs.writeFileSync(p, c, 'utf8');
  console.log('[OK] b1-stats/chapitres-4-6.js mis à jour.');
}
