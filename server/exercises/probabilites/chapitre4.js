/**
 * Chapitre 4 — Lois discrètes usuelles.
 *
 * Loi binomiale (probabilité, espérance, variance) et loi de Poisson.
 */
'use strict';

module.exports = [
  {
    id: 'pb2-c4-e1',
    chapter: 4,
    level: 'n2',
    language: 'python',
    title: 'Loi binomiale — probabilité',
    goal: 'Calculer P(X = k) pour X suivant une loi binomiale B(n, p).',
    brief: '<p>Le programme reçoit un entier <code>n</code>, un entier <code>k</code>, puis un décimal ' +
      '<code>p</code>. Affiche <code>P(X = k) = C(n,k)·pᵏ·(1−p)ⁿ⁻ᵏ</code> arrondie à 4 décimales.</p>',
    starter: `from math import comb\n\nn = int(input())\nk = int(input())\np = float(input())\n\n# À compléter : afficher P(X = k) avec 4 décimales.\n`,
    hints: [
      'Le coefficient binomial se calcule avec comb(n, k) du module math.',
      'Multiplie-le par p ** k puis par (1 - p) ** (n - k), et formate le résultat sur 4 décimales.'
    ],
    examples: [
      { stdin: '5\n2\n0.5', expected: '0.3125', note: 'C(5,2)·0,5²·0,5³ = 10 × 0,03125.' }
    ],
    tests: [
      { label: 'Un succès', stdin: '4\n1\n0.5', expected: '0.2500' },
      { label: 'Tous les succès', stdin: '3\n3\n0.5', expected: '0.1250' },
      { label: 'Aucun succès', stdin: '10\n0\n0.2', expected: '0.1074' }
    ],
    solution: `from math import comb\n\nn = int(input())\nk = int(input())\np = float(input())\n\nprobabilite = comb(n, k) * (p ** k) * ((1 - p) ** (n - k))\nprint(f"{probabilite:.4f}")\n`
  },
  {
    id: 'pb2-c4-e2',
    chapter: 4,
    level: 'n2',
    language: 'python',
    title: 'Loi binomiale — espérance et variance',
    goal: 'Retenir E(X) = np et V(X) = np(1−p) pour une loi binomiale.',
    brief: '<p>Le programme reçoit un entier <code>n</code> puis un décimal <code>p</code>. Affiche ' +
      'l’<strong>espérance</strong> <code>E(X) = np</code> puis la <strong>variance</strong> ' +
      '<code>V(X) = np(1−p)</code>, chacune sur sa ligne, arrondies à 4 décimales et précédées de ' +
      '<code>E = </code> et <code>V = </code>.</p>',
    starter: `n = int(input())\np = float(input())\n\n# À compléter : afficher E = np puis V = np(1-p), avec 4 décimales.\n`,
    hints: [
      'L’espérance d’une loi binomiale vaut simplement n·p.',
      'La variance vaut n·p·(1−p) : n’oublie pas le facteur (1−p).'
    ],
    examples: [
      { stdin: '10\n0.5', expected: 'E = 5.0000\nV = 2.5000', note: 'Dix épreuves équilibrées : E=5, V=2,5.' }
    ],
    tests: [
      { label: 'Vingt épreuves', stdin: '20\n0.3', expected: 'E = 6.0000\nV = 4.2000' },
      { label: 'Cinq épreuves', stdin: '5\n0.5', expected: 'E = 2.5000\nV = 1.2500' },
      { label: 'Cent épreuves', stdin: '100\n0.1', expected: 'E = 10.0000\nV = 9.0000' }
    ],
    solution: `n = int(input())\np = float(input())\n\nesperance = n * p\nvariance = n * p * (1 - p)\nprint(f"E = {esperance:.4f}")\nprint(f"V = {variance:.4f}")\n`
  },
  {
    id: 'pb2-c4-e3',
    chapter: 4,
    level: 'n3',
    language: 'python',
    title: 'Loi de Poisson',
    goal: 'Calculer P(X = k) pour X suivant une loi de Poisson de paramètre λ.',
    brief: '<p>Le programme reçoit un décimal <code>lambda</code> (λ) puis un entier <code>k</code>. ' +
      'Affiche <code>P(X = k) = λᵏ · e^(−λ) / k!</code> arrondie à 4 décimales.</p>',
    starter: `from math import factorial, exp\n\nlam = float(input())\nk = int(input())\n\n# À compléter : afficher P(X = k) avec 4 décimales.\n`,
    hints: [
      'La probabilité vaut (λ ** k) * exp(-λ) / factorial(k).',
      'Utilise exp(-lam) plutôt que la constante e : c’est la fonction du module math.'
    ],
    examples: [
      { stdin: '2\n1', expected: '0.2707', note: 'λ=2 et k=1 : 2·e⁻² ≈ 0,2707.' }
    ],
    tests: [
      { label: 'Aucun événement', stdin: '3\n0', expected: '0.0498' },
      { label: 'Deux événements', stdin: '1\n2', expected: '0.1839' },
      { label: 'Quatre événements', stdin: '4\n4', expected: '0.1954' }
    ],
    solution: `from math import factorial, exp\n\nlam = float(input())\nk = int(input())\n\nprobabilite = (lam ** k) * exp(-lam) / factorial(k)\nprint(f"{probabilite:.4f}")\n`
  }
];
