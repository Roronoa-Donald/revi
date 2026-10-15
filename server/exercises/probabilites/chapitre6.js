/**
 * Chapitre 6 — Convergence et théorèmes limites.
 *
 * Inégalité de Markov, inégalité de Bienaymé-Tchebychev et approximation par
 * le théorème central limite.
 */
'use strict';

module.exports = [
  {
    id: 'pb2-c6-e1',
    chapter: 6,
    level: 'n2',
    language: 'python',
    title: 'Inégalité de Markov',
    goal: 'Appliquer la borne de Markov P(X ≥ a) ≤ E(X)/a.',
    brief: '<p>Le programme reçoit deux décimaux : <code>esperance</code> (E(X), positive) puis ' +
      '<code>a</code> (a &gt; 0). Affiche la borne de Markov <code>E(X)/a</code> arrondie à 4 décimales.</p>',
    starter: `esperance = float(input())\na = float(input())\n\n# À compléter : afficher la borne E(X)/a avec 4 décimales.\n`,
    hints: [
      'L’inégalité de Markov affirme P(X ≥ a) ≤ E(X)/a pour une variable positive.',
      'La « borne » demandée est donc le quotient de l’espérance par le seuil a.'
    ],
    examples: [
      { stdin: '4\n8', expected: '0.5000', note: 'E(X)/a = 4/8.' }
    ],
    tests: [
      { label: 'Seuil plus grand', stdin: '6\n10', expected: '0.6000' },
      { label: 'Grand seuil', stdin: '2\n8', expected: '0.2500' },
      { label: 'Seuil modeste', stdin: '10\n4', expected: '2.5000' }
    ],
    solution: `esperance = float(input())\na = float(input())\n\nborne = esperance / a\nprint(f"{borne:.4f}")\n`
  },
  {
    id: 'pb2-c6-e2',
    chapter: 6,
    level: 'n2',
    language: 'python',
    title: 'Inégalité de Bienaymé-Tchebychev',
    goal: 'Appliquer la borne V(X)/ε² de l’inégalité de Tchebychev.',
    brief: '<p>Le programme reçoit deux décimaux : <code>variance</code> (V(X), positive) puis ' +
      '<code>epsilon</code> (ε &gt; 0). Affiche la borne de Tchebychev ' +
      '<code>P(|X − E(X)| ≥ ε) ≤ V(X)/ε²</code>, arrondie à 4 décimales.</p>',
    starter: `variance = float(input())\nepsilon = float(input())\n\n# À compléter : afficher la borne V(X)/ε² avec 4 décimales.\n`,
    hints: [
      'La borne de Tchebychev est le quotient de la variance par le carré de l’écart ε.',
      'Pense à élever epsilon au carré : epsilon ** 2.'
    ],
    examples: [
      { stdin: '4\n2', expected: '1.0000', note: 'V/ε² = 4/4.' }
    ],
    tests: [
      { label: 'Variance plus grande', stdin: '9\n3', expected: '1.0000' },
      { label: 'Écart de deux', stdin: '1\n2', expected: '0.2500' },
      { label: 'Écart serré', stdin: '5\n2', expected: '1.2500' }
    ],
    solution: `variance = float(input())\nepsilon = float(input())\n\nborne = variance / (epsilon ** 2)\nprint(f"{borne:.4f}")\n`
  },
  {
    id: 'pb2-c6-e3',
    chapter: 6,
    level: 'n3',
    language: 'python',
    title: 'Théorème central limite',
    goal: 'Approximer P(S ≤ x) par la loi normale après standardisation.',
    brief: '<p>Le programme reçoit quatre nombres, un par ligne : l’effectif <code>n</code>, la moyenne ' +
      '<code>mu</code> de chaque variable, son écart-type <code>sigma</code>, puis un seuil <code>x</code>. ' +
      'La somme <code>S</code> des <code>n</code> variables a pour moyenne <code>n·mu</code> et pour ' +
      'écart-type <code>sigma·√n</code>. Affiche d’abord l’écart réduit ' +
      '<code>z = (x − n·mu)/(sigma·√n)</code> sur la ligne <code>z = …</code>, puis l’approximation ' +
      '<code>Φ(z)</code> sur la ligne <code>P = …</code>, chacune à 4 décimales.</p>',
    starter: `from math import erf, sqrt\n\nn = int(input())\nmu = float(input())\nsigma = float(input())\nx = float(input())\n\n# À compléter : afficher "z = ..." puis "P = ..." avec 4 décimales.\n`,
    hints: [
      'La somme a pour moyenne n * mu et pour écart-type sigma * sqrt(n).',
      'Calcule z = (x - n * mu) / (sigma * sqrt(n)), puis Φ(z) = 0.5 * (1 + erf(z / sqrt(2))).'
    ],
    examples: [
      { stdin: '100\n0.5\n1\n55', expected: 'z = 0.5000\nP = 0.6915', note: 'Moyenne 50, écart-type 10 : z = 0,5.' }
    ],
    tests: [
      { label: 'Trente-six variables', stdin: '36\n10\n2\n372', expected: 'z = 1.0000\nP = 0.8413' },
      { label: 'Vingt-cinq variables', stdin: '25\n4\n1\n95', expected: 'z = -1.0000\nP = 0.1587' },
      { label: 'Soixante-quatre variables', stdin: '64\n1\n2\n64', expected: 'z = 0.0000\nP = 0.5000' }
    ],
    solution: `from math import erf, sqrt\n\nn = int(input())\nmu = float(input())\nsigma = float(input())\nx = float(input())\n\nmoyenne = n * mu\necart_type = sigma * sqrt(n)\nz = (x - moyenne) / ecart_type\nprobabilite = 0.5 * (1 + erf(z / sqrt(2)))\nprint(f"z = {z:.4f}")\nprint(f"P = {probabilite:.4f}")\n`
  }
];
