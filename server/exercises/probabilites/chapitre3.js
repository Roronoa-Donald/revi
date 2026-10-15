/**
 * Chapitre 3 — Variables aléatoires discrètes.
 *
 * Espérance, variance et fonction de répartition d'une loi discrète donnée
 * sous forme de couples « valeur probabilité », un par ligne.
 */
'use strict';

module.exports = [
  {
    id: 'pb2-c3-e1',
    chapter: 3,
    level: 'n1',
    language: 'python',
    title: 'Espérance d’une loi discrète',
    goal: 'Calculer E(X) = Σ xᵢ · pᵢ pour une loi discrète donnée.',
    brief: '<p>Le programme reçoit un entier <code>n</code>, puis <code>n</code> lignes au format ' +
      '<code>valeur probabilité</code>. Affiche l’<strong>espérance</strong> ' +
      '<code>E(X) = Σ xᵢ · pᵢ</code> arrondie à 4 décimales.</p>',
    starter: `n = int(input())\ncouples = [input().split() for _ in range(n)]\n\n# À compléter : afficher l’espérance E(X) avec 4 décimales.\n`,
    hints: [
      'Chaque ligne contient une valeur et une probabilité : convertis la valeur avec float (une valeur négative est possible).',
      'Accumule la somme des produits valeur × probabilité, puis affiche f"{esperance:.4f}".'
    ],
    examples: [
      { stdin: '2\n0 0.5\n1 0.5', expected: '0.5000', note: 'Pile ou face équilibré : espérance 0,5.' }
    ],
    tests: [
      { label: 'Trois valeurs', stdin: '3\n1 0.2\n2 0.3\n3 0.5', expected: '2.3000' },
      { label: 'Valeur certaine', stdin: '1\n5 1.0', expected: '5.0000' },
      { label: 'Valeurs opposées', stdin: '2\n-1 0.5\n1 0.5', expected: '0.0000' }
    ],
    solution: `n = int(input())\ncouples = [input().split() for _ in range(n)]\n\nesperance = 0.0\nfor valeur, probabilite in couples:\n    esperance += float(valeur) * float(probabilite)\nprint(f"{esperance:.4f}")\n`
  },
  {
    id: 'pb2-c3-e2',
    chapter: 3,
    level: 'n2',
    language: 'python',
    title: 'Variance d’une loi discrète',
    goal: 'Calculer V(X) = E(X²) − E(X)² pour une loi discrète donnée.',
    brief: '<p>Le programme reçoit un entier <code>n</code>, puis <code>n</code> lignes ' +
      '<code>valeur probabilité</code>. Affiche la <strong>variance</strong> ' +
      '<code>V(X) = E(X²) − E(X)²</code> arrondie à 4 décimales.</p>',
    starter: `n = int(input())\ncouples = [input().split() for _ in range(n)]\n\n# À compléter : afficher la variance V(X) avec 4 décimales.\n`,
    hints: [
      'Calcule E(X) et E(X²) dans la même boucle : E(X²) = Σ xᵢ² · pᵢ.',
      'La variance est E(X²) − E(X)² ; attention, il faut élever E(X) au carré après l’avoir calculé.'
    ],
    examples: [
      { stdin: '2\n0 0.5\n1 0.5', expected: '0.2500', note: 'E(X)=0,5 et E(X²)=0,5, donc V=0,25.' }
    ],
    tests: [
      { label: 'Déséquilibré', stdin: '2\n0 0.3\n1 0.7', expected: '0.2100' },
      { label: 'Trois valeurs', stdin: '3\n1 0.2\n2 0.5\n3 0.3', expected: '0.4900' },
      { label: 'Valeur certaine', stdin: '1\n2 1.0', expected: '0.0000' }
    ],
    solution: `n = int(input())\ncouples = [input().split() for _ in range(n)]\n\nesperance = 0.0\nesperance_carre = 0.0\nfor valeur, probabilite in couples:\n    x = float(valeur)\n    p = float(probabilite)\n    esperance += x * p\n    esperance_carre += x * x * p\nvariance = esperance_carre - esperance * esperance\nprint(f"{variance:.4f}")\n`
  },
  {
    id: 'pb2-c3-e3',
    chapter: 3,
    level: 'n2',
    language: 'python',
    title: 'Fonction de répartition',
    goal: 'Calculer F(t) = P(X ≤ t) pour une loi discrète et un seuil donnés.',
    brief: '<p>Le programme reçoit un entier <code>n</code>, puis <code>n</code> lignes ' +
      '<code>valeur probabilité</code>, puis enfin un seuil <code>t</code>. Affiche ' +
      '<code>F(t) = P(X ≤ t)</code> arrondie à 4 décimales (somme des probabilités des valeurs ' +
      'inférieures ou égales à <code>t</code>).</p>',
    starter: `n = int(input())\ncouples = [input().split() for _ in range(n)]\nt = float(input())\n\n# À compléter : afficher F(t) avec 4 décimales.\n`,
    hints: [
      'Additionne les probabilités dont la valeur est inférieure ou égale au seuil t.',
      'Si aucune valeur n’est ≤ t, la répartition vaut 0 ; si toutes le sont, elle vaut 1.'
    ],
    examples: [
      { stdin: '2\n0 0.3\n1 0.7\n0', expected: '0.3000', note: 'P(X ≤ 0) = 0,3.' }
    ],
    tests: [
      { label: 'Seuil intermédiaire', stdin: '3\n1 0.2\n2 0.3\n3 0.5\n2', expected: '0.5000' },
      { label: 'Sous le minimum', stdin: '2\n5 0.4\n6 0.6\n4', expected: '0.0000' },
      { label: 'Au-dessus du maximum', stdin: '2\n5 0.4\n6 0.6\n10', expected: '1.0000' }
    ],
    solution: `n = int(input())\ncouples = [input().split() for _ in range(n)]\nt = float(input())\n\nrepartition = 0.0\nfor valeur, probabilite in couples:\n    if float(valeur) <= t:\n        repartition += float(probabilite)\nprint(f"{repartition:.4f}")\n`
  }
];
