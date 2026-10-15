/**
 * Chapitre 5 — Variables aléatoires continues.
 *
 * Loi uniforme continue, loi exponentielle, loi normale centrée réduite
 * (évaluée par la fonction d'erreur erf, comme un tableur ou une calculatrice).
 */
'use strict';

module.exports = [
  {
    id: 'pb2-c5-e1',
    chapter: 5,
    level: 'n2',
    language: 'python',
    title: 'Loi uniforme continue',
    goal: 'Calculer P(X ≤ x) pour X uniforme sur [a, b].',
    brief: '<p>Le programme reçoit trois décimaux : <code>a</code>, <code>b</code> (bornes, avec ' +
      '<code>a &lt; b</code>) puis <code>x</code>. Pour une loi uniforme continue sur <code>[a, b]</code>, ' +
      'la fonction de répartition vaut <code>F(x) = (x−a)/(b−a)</code>, ramenée à 0 si <code>x &lt; a</code> ' +
      'et à 1 si <code>x &gt; b</code>. Affiche <code>F(x)</code> avec 4 décimales.</p>',
    starter: `a = float(input())\nb = float(input())\nx = float(input())\n\n# À compléter : afficher F(x) avec 4 décimales.\n`,
    hints: [
      'Commence par « ramener » x dans l’intervalle : si x est sous a, le résultat vaut 0 ; au-dessus de b, il vaut 1.',
      'Au milieu, la répartition vaut (x - a) / (b - a).'
    ],
    examples: [
      { stdin: '0\n2\n1', expected: '0.5000', note: 'Le point 1 est le milieu de [0, 2].' }
    ],
    tests: [
      { label: 'Milieu d’un autre intervalle', stdin: '1\n5\n3', expected: '0.5000' },
      { label: 'Sous la borne inférieure', stdin: '0\n10\n0', expected: '0.0000' },
      { label: 'Au-dessus de la borne supérieure', stdin: '0\n10\n12', expected: '1.0000' }
    ],
    solution: `a = float(input())\nb = float(input())\nx = float(input())\n\nif x <= a:\n    repartition = 0.0\nelif x >= b:\n    repartition = 1.0\nelse:\n    repartition = (x - a) / (b - a)\nprint(f"{repartition:.4f}")\n`
  },
  {
    id: 'pb2-c5-e2',
    chapter: 5,
    level: 'n2',
    language: 'python',
    title: 'Loi exponentielle',
    goal: 'Calculer P(X ≥ x) = e^(−λx) pour une loi exponentielle.',
    brief: '<p>Le programme reçoit un décimal <code>lambda</code> (λ &gt; 0) puis un décimal ' +
      '<code>x</code> (positif). Affiche la probabilité de dépassement <code>P(X ≥ x) = e^(−λx)</code> ' +
      'avec 4 décimales.</p>',
    starter: `from math import exp\n\nlam = float(input())\nx = float(input())\n\n# À compléter : afficher P(X >= x) avec 4 décimales.\n`,
    hints: [
      'La probabilité de dépassement de la loi exponentielle est exp(-lam * x).',
      'Une seule ligne suffit : le produit λ·x se calcule avant l’exponentielle.'
    ],
    examples: [
      { stdin: '1\n1', expected: '0.3679', note: 'e⁻¹ ≈ 0,3679.' }
    ],
    tests: [
      { label: 'Deux fois un demi', stdin: '2\n0.5', expected: '0.3679' },
      { label: 'Petit taux', stdin: '0.5\n4', expected: '0.1353' },
      { label: 'Taux élevé', stdin: '3\n2', expected: '0.0025' }
    ],
    solution: `from math import exp\n\nlam = float(input())\nx = float(input())\n\nprobabilite = exp(-lam * x)\nprint(f"{probabilite:.4f}")\n`
  },
  {
    id: 'pb2-c5-e3',
    chapter: 5,
    level: 'n3',
    language: 'python',
    title: 'Loi normale centrée réduite',
    goal: 'Calculer Φ(z) = P(Z ≤ z) pour la loi normale centrée réduite.',
    brief: '<p>Le programme reçoit un décimal <code>z</code>. Affiche la probabilité ' +
      '<code>Φ(z) = P(Z ≤ z)</code> de la loi normale centrée réduite, arrondie à 4 décimales. ' +
      'On la calcule par la fonction d’erreur : <code>Φ(z) = 0,5 · (1 + erf(z/√2))</code>.</p>',
    starter: `from math import erf, sqrt\n\nz = float(input())\n\n# À compléter : afficher Φ(z) avec 4 décimales.\n`,
    hints: [
      'La fonction erf du module math donne la fonction d’erreur ; divise z par sqrt(2).',
      'La formule complète est 0.5 * (1 + erf(z / sqrt(2))).'
    ],
    examples: [
      { stdin: '0', expected: '0.5000', note: 'Φ(0) = 0,5 par symétrie.' }
    ],
    tests: [
      { label: 'Quantile 1,96', stdin: '1.96', expected: '0.9750' },
      { label: 'Un écart-type en dessous', stdin: '-1', expected: '0.1587' },
      { label: 'Deux écarts-types', stdin: '2', expected: '0.9772' }
    ],
    solution: `from math import erf, sqrt\n\nz = float(input())\n\nprobabilite = 0.5 * (1 + erf(z / sqrt(2)))\nprint(f"{probabilite:.4f}")\n`
  }
];
