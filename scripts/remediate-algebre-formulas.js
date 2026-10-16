'use strict';

const fs = require('fs');
const path = require('path');

// 1. chapitres-1-3.js
{
  const p = path.join(__dirname, '..', 'server', 'content', 'b1-algebre', 'chapitres-1-3.js');
  let c = fs.readFileSync(p, 'utf8');

  // Addition & scalar
  c = c.replace(
    /'<pre><code>\(A \+ B\)<sub>ij<\/sub> = a<sub>ij<\/sub> \+ b<sub>ij<\/sub>\\n' \+\s*'Exemple : \[1 2 ; 3 4\] \+ \[5 0 ; −1 2\] = \[6 2 ; 2 6\]<\/code><\/pre>',/,
    `'<div class="math-block">$$\\begin{pmatrix} 1 & 2 \\\\[4pt] 3 & 4 \\end{pmatrix} + \\begin{pmatrix} 5 & 0 \\\\[4pt] -1 & 2 \\end{pmatrix} = \\begin{pmatrix} 6 & 2 \\\\[4pt] 2 & 6 \\end{pmatrix}$$</div>',`
  );

  c = c.replace(
    /'<pre><code>\(k · A\)<sub>ij<\/sub> = k · a<sub>ij<\/sub>\\n' \+\s*'Exemple : 3 · \[1 2 ; 0 −1\] = \[3 6 ; 0 −3\]<\/code><\/pre>',/,
    `'<div class="math-block">$$3 \\begin{pmatrix} 1 & 2 \\\\[4pt] 0 & -1 \\end{pmatrix} = \\begin{pmatrix} 3 & 6 \\\\[4pt] 0 & -3 \\end{pmatrix}$$</div>',`
  );

  // Matrix product
  c = c.replace(
    /'<pre><code>\(A · B\)<sub>ij<\/sub> = Σ<sub>k = 1…n<\/sub> a<sub>ik<\/sub> · b<sub>kj<\/code><\/pre>',/,
    `'<div class="math-block">$$(A \\cdot B)_{ij} = \\sum_{k=1}^n a_{ik} b_{kj}$$</div>',`
  );

  c = c.replace(
    /'<pre><code>\[1 2\]   \[5 6\]   \[1·5 \+ 2·7   1·6 \+ 2·8\]   \[19 22\]\\n' \+\s*'\[3 4\] · \[7 8\] = \[3·5 \+ 4·7   3·6 \+ 4·8\] = \[43 50\]<\/code><\/pre>',/,
    `'<div class="math-block">$$\\begin{pmatrix} 1 & 2 \\\\[4pt] 3 & 4 \\end{pmatrix} \\begin{pmatrix} 5 & 6 \\\\[4pt] 7 & 8 \\end{pmatrix} = \\begin{pmatrix} 1\\cdot 5 + 2\\cdot 7 & 1\\cdot 6 + 2\\cdot 8 \\\\[4pt] 3\\cdot 5 + 4\\cdot 7 & 3\\cdot 6 + 4\\cdot 8 \\end{pmatrix} = \\begin{pmatrix} 19 & 22 \\\\[4pt] 43 & 50 \\end{pmatrix}$$</div>',`
  );

  // Non-commutativity
  c = c.replace(
    /'    <pre><code>\[1 2\]   \[5 6\]   \[19 22\]           \[5 6\]   \[1 2\]   \[23 34\]\\n' \+\s*'\[3 4\] · \[7 8\] = \[43 50\]    mais   \[7 8\] · \[3 4\] = \[31 46\]<\/code><\/pre>'/,
    `'    <div class="math-block">$$AB = \\begin{pmatrix} 19 & 22 \\\\[4pt] 43 & 50 \\end{pmatrix} \\ne BA = \\begin{pmatrix} 23 & 34 \\\\[4pt] 31 & 46 \\end{pmatrix}$$</div>'`
  );

  // Transposée
  c = c.replace(
    /'<pre><code>     \[1 2 3\]              ⎡ 1 4 ⎤\\n' \+\s*'t   \[4 5 6\]    =         ⎢ 2 5 ⎥\\n' \+\s*'                         ⎣ 3 6 ⎦<\/code><\/pre>',/,
    `'<div class="math-block">$$^t\\begin{pmatrix} 1 & 2 & 3 \\\\[4pt] 4 & 5 & 6 \\end{pmatrix} = \\begin{pmatrix} 1 & 4 \\\\[4pt] 2 & 5 \\\\[4pt] 3 & 6 \\end{pmatrix}$$</div>',`
  );

  // Trace
  c = c.replace(
    /'<pre><code>tr\(A \+ B\) = tr\(A\) \+ tr\(B\)\\n' \+\s*'tr\(k · A\) = k · tr\(A\)\\n' \+\s*'tr\(A · B\) = tr\(B · A\)      \(même si A·B ≠ B·A !\)\\n' \+\s*'tr\(ᵗA\) = tr\(A\)<\/code><\/pre>',/,
    `'<div class="math-block">$$\\operatorname{tr}(A + B) = \\operatorname{tr}(A) + \\operatorname{tr}(B), \\quad \\operatorname{tr}(kA) = k\\operatorname{tr}(A), \\quad \\operatorname{tr}(AB) = \\operatorname{tr}(BA), \\quad \\operatorname{tr}(^tA) = \\operatorname{tr}(A)$$</div>',`
  );

  // Inverse 2x2
  c = c.replace(
    /'<pre><code>     \[ a  b \]\\n' \+\s*'A = \[ c  d \]   ⇒   A⁻¹ = 1\/\(ad − bc\) · \[  d  −b \]\\n' \+\s*'                                    \[ −c   a \]<\/code><\/pre>',/,
    `'<div class="math-block">$$A = \\begin{pmatrix} a & b \\\\[4pt] c & d \\end{pmatrix} \\implies A^{-1} = \\frac{1}{ad - bc} \\begin{pmatrix} d & -b \\\\[4pt] -c & a \\end{pmatrix}$$</div>',`
  );

  fs.writeFileSync(p, c, 'utf8');
  console.log('[OK] b1-algebre/chapitres-1-3.js mis à jour.');
}

// 2. chapitres-4-6.js
{
  const p = path.join(__dirname, '..', 'server', 'content', 'b1-algebre', 'chapitres-4-6.js');
  let c = fs.readFileSync(p, 'utf8');

  // Sous-espace
  c = c.replace(
    /'<pre><code>1\.  F ≠ ∅              \(en pratique : 0<sub>E<\/sub> ∈ F\)\\n' \+\s*'2\.  u, v ∈ F  ⇒  u \+ v ∈ F   \(stabilité par addition\)\\n' \+\s*'3\.  u ∈ F, a ∈ ℝ  ⇒  a · u ∈ F \(stabilité par multiplication scalaire\)<\/code><\/pre>',/,
    `box('formula', 'Caractérisation d’un sous-espace vectoriel', [
      '<ol>',
      '  <li>$0_E \\in F$ (non vide, contient le vecteur nul) ;</li>',
      '  <li>$\\forall u, v \\in F, \\ u + v \\in F$ (stabilité par addition) ;</li>',
      '  <li>$\\forall u \\in F, \\ \\forall \\lambda \\in \\mathbb{R}, \\ \\lambda u \\in F$ (stabilité par multiplication par un scalaire).</li>',
      '</ol>'
    ].join('\\n')),`
  );

  // Vect
  c = c.replace(
    /'<pre><code>Vect\(v₁, …, vₚ\) = \{ a₁·v₁ \+ … \+ aₚ·vₚ \| a₁, …, aₚ ∈ ℝ \}<\/code><\/pre>',/,
    `'<div class="math-block">$$\\operatorname{Vect}(v_1, \\dots, v_p) = \\left\\{ \\sum_{k=1}^p a_k v_k \\;\\middle|\\; a_1, \\dots, a_p \\in \\mathbb{R} \\right\\}$$</div>',`
  );

  // Famille libre
  c = c.replace(
    /'<pre><code>a₁·v₁ \+ … \+ aₚ·vₚ = 0   ⇒   a₁ = a₂ = … = aₚ = 0<\/code><\/pre>',/,
    `'<div class="math-block">$$\\sum_{k=1}^p a_k v_k = 0 \\implies a_1 = a_2 = \\dots = a_p = 0$$</div>',`
  );

  // Déterminant 2x2
  c = c.replace(
    /'<pre><code>     \[ a  b \]\\n' \+\s*'det \[ c  d \]  =  ad − bc<\/code><\/pre>',/,
    `'<div class="math-block">$$\\det \\begin{pmatrix} a & b \\\\[4pt] c & d \\end{pmatrix} = ad - bc$$</div>',`
  );

  // Valeurs propres
  c = c.replace(
    /'<pre><code>A · X = λ · X<\/code><\/pre>',/,
    `'<div class="math-block">$$A X = \\lambda X \\quad (X \\ne 0)$$</div>',`
  );

  c = c.replace(
    /'<pre><code>det\(A − λ·I\) = 0        ← polynôme caractéristique<\/code><\/pre>',/,
    `'<div class="math-block">$$\\det(A - \\lambda I) = 0 \\quad (\\text{Polynôme caractéristique } P(\\lambda))$$</div>',`
  );

  fs.writeFileSync(p, c, 'utf8');
  console.log('[OK] b1-algebre/chapitres-4-6.js mis à jour.');
}
