/**
 * Chapitre 2 — Dénombrement.
 *
 * Arrangements, combinaisons et permutations avec répétition. Python sert de
 * calculatrice exacte : factorielles et entiers, aucune approximation.
 */
'use strict';

module.exports = [
  {
    id: 'pb2-c2-e1',
    chapter: 2,
    level: 'n1',
    language: 'python',
    title: 'Arrangements',
    goal: 'Compter les arrangements de k objets parmi n : A(n,k) = n!/(n−k)!.',
    brief: '<p>Le programme reçoit deux entiers : <code>n</code> puis <code>k</code>. Affiche le nombre ' +
      'd’<strong>arrangements</strong> <code>A(n,k) = n!/(n−k)!</code> (l’ordre compte, sans répétition).</p>',
    starter: `from math import factorial\n\nn = int(input())\nk = int(input())\n\n# À compléter : afficher A(n,k) = n! / (n-k)!.\n`,
    hints: [
      'A(n,k) = n·(n−1)·…·(n−k+1) : c’est le quotient n! / (n−k)!.',
      'La fonction factorial du module math calcule n! ; attention à ne pas oublier le cas k = 0 (résultat 1).'
    ],
    examples: [
      { stdin: '5\n3', expected: '60', note: '5 × 4 × 3 = 60.' }
    ],
    tests: [
      { label: 'Petit arrangement', stdin: '4\n2', expected: '12' },
      { label: 'Six parmi trois', stdin: '6\n3', expected: '120' },
      { label: 'Deux parmi dix', stdin: '10\n2', expected: '90' }
    ],
    solution: `from math import factorial\n\nn = int(input())\nk = int(input())\n\nprint(factorial(n) // factorial(n - k))\n`
  },
  {
    id: 'pb2-c2-e2',
    chapter: 2,
    level: 'n2',
    language: 'python',
    title: 'Combinaisons',
    goal: 'Compter les combinaisons de k objets parmi n : C(n,k) = n!/(k!(n−k)!).',
    brief: '<p>Le programme reçoit deux entiers : <code>n</code> puis <code>k</code>. Affiche le nombre ' +
      'de <strong>combinaisons</strong> <code>C(n,k)</code> (l’ordre ne compte pas, sans répétition).</p>',
    starter: `from math import factorial\n\nn = int(input())\nk = int(input())\n\n# À compléter : afficher C(n,k) = n! / (k! (n-k)!).\n`,
    hints: [
      'Divise l’arrangement A(n,k) par k! pour oublier l’ordre : C(n,k) = A(n,k) / k!.',
      'La fonction comb(n, k) du module math donne directement le coefficient binomial.'
    ],
    examples: [
      { stdin: '5\n2', expected: '10', note: 'Dix façons de choisir 2 objets parmi 5.' }
    ],
    tests: [
      { label: 'Six parmi trois', stdin: '6\n3', expected: '20' },
      { label: 'Tout l’ensemble', stdin: '4\n4', expected: '1' },
      { label: 'Cinq parmi dix', stdin: '10\n5', expected: '252' }
    ],
    solution: `from math import factorial\n\nn = int(input())\nk = int(input())\n\nprint(factorial(n) // (factorial(k) * factorial(n - k)))\n`
  },
  {
    id: 'pb2-c2-e3',
    chapter: 2,
    level: 'n3',
    language: 'python',
    title: 'Permutations avec répétition',
    goal: 'Compter les anagrammes distincts d’un mot : n!/(r₁!·r₂!·…).',
    brief: '<p>Le programme reçoit un mot (une ligne, sans espace). Affiche le nombre d’<strong>anagrammes ' +
      'distincts</strong>, c’est-à-dire le nombre de permutations des lettres en tenant compte des répétitions : ' +
      '<code>n! / (r₁!·r₂!·…)</code> où chaque <code>rᵢ</code> est le nombre d’occurrences d’une lettre.</p>',
    starter: `from math import factorial\nfrom collections import Counter\n\nmot = input()\n\n# À compléter : afficher le nombre d’anagrammes distincts.\n`,
    hints: [
      'Compte d’abord les occurrences de chaque lettre avec Counter(mot).',
      'Divise la factorielle de la longueur par le produit des factorielles de chaque effectif.'
    ],
    examples: [
      { stdin: 'ABC', expected: '6', note: 'Trois lettres distinctes : 3! = 6 anagrammes.' }
    ],
    tests: [
      { label: 'Une lettre doublée', stdin: 'AAB', expected: '3' },
      { label: 'Deux lettres doublées', stdin: 'AABB', expected: '6' },
      { label: 'Quatre lettres distinctes', stdin: 'ABCD', expected: '24' }
    ],
    solution: `from math import factorial\nfrom collections import Counter\n\nmot = input()\n\ntotal = factorial(len(mot))\nfor effectif in Counter(mot).values():\n    total //= factorial(effectif)\nprint(total)\n`
  }
];
