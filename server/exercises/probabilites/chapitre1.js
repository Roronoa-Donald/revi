/**
 * Chapitre 1 — Fondements du calcul des probabilités.
 *
 * Trois fiches en Python : probabilité d'un événement sur un univers fini,
 * formule de la réunion, probabilité conditionnelle. Python sert de
 * calculatrice vérifiable : la sortie est comparée après normalisation.
 */
'use strict';

module.exports = [
  {
    id: 'pb2-c1-e1',
    chapter: 1,
    level: 'n1',
    language: 'python',
    title: 'Probabilité d’un événement',
    goal: 'Calculer la probabilité d’un événement sur un univers fini équiprobable.',
    brief: '<p>Le programme reçoit deux entiers : <code>n</code> (nombre d’issues de l’univers) puis ' +
      '<code>k</code> (nombre de cas favorables). Sur un univers équiprobable, la probabilité vaut ' +
      '<code>k/n</code>. Affiche cette probabilité sous forme de <strong>fraction réduite</strong> ' +
      '<code>p/q</code> (par exemple <code>1/2</code>).</p>',
    starter: `from math import gcd\n\nn = int(input())\nk = int(input())\n\n# À compléter : afficher la fraction réduite de la probabilité k/n.\n`,
    hints: [
      'Réduire une fraction demande de diviser numérateur et dénominateur par leur pgcd : gcd(k, n).',
      'Une fois le pgcd g obtenu, affiche f"{k // g}/{n // g}".'
    ],
    examples: [
      { stdin: '6\n3', expected: '1/2', note: 'Trois cas favorables sur six : la moitié.' }
    ],
    tests: [
      { label: 'Deux sur huit', stdin: '8\n2', expected: '1/4' },
      { label: 'Sept sur dix', stdin: '10\n7', expected: '7/10' },
      { label: 'Deux sur quatre', stdin: '4\n2', expected: '1/2' }
    ],
    solution: `from math import gcd\n\nn = int(input())\nk = int(input())\n\ng = gcd(k, n)\nprint(f"{k // g}/{n // g}")\n`
  },
  {
    id: 'pb2-c1-e2',
    chapter: 1,
    level: 'n1',
    language: 'python',
    title: 'Formule de la réunion',
    goal: 'Appliquer la formule P(A∪B) = P(A) + P(B) − P(A∩B).',
    brief: '<p>Le programme reçoit trois nombres décimaux, un par ligne : <code>pA</code>, <code>pB</code> ' +
      'et <code>pAB</code> (probabilité de l’intersection). Affiche <code>P(A∪B)</code> arrondie à ' +
      '4 décimales.</p>' +
      '<p>Rappel : <code>P(A∪B) = P(A) + P(B) − P(A∩B)</code>.</p>',
    starter: `pA = float(input())\npB = float(input())\npAB = float(input())\n\n# À compléter : afficher P(A∪B) avec 4 décimales.\n`,
    hints: [
      'Additionne pA et pB, puis retranche une seule fois pAB : sans cela, on compte deux fois l’intersection.',
      'Pour 4 décimales, utilise une f-string : print(f"{resultat:.4f}").'
    ],
    examples: [
      { stdin: '0.5\n0.4\n0.2', expected: '0.7000', note: '0,5 + 0,4 − 0,2 = 0,7.' }
    ],
    tests: [
      { label: 'Événements symétriques', stdin: '0.3\n0.3\n0.1', expected: '0.5000' },
      { label: 'Fort recouvrement', stdin: '0.9\n0.8\n0.75', expected: '0.9500' },
      { label: 'Intersection faible', stdin: '0.2\n0.5\n0.1', expected: '0.6000' }
    ],
    solution: `pA = float(input())\npB = float(input())\npAB = float(input())\n\npUnion = pA + pB - pAB\nprint(f"{pUnion:.4f}")\n`
  },
  {
    id: 'pb2-c1-e3',
    chapter: 1,
    level: 'n2',
    language: 'python',
    title: 'Probabilité conditionnelle',
    goal: 'Calculer P(A|B) à partir de P(A∩B) et P(B).',
    brief: '<p>Le programme reçoit deux nombres décimaux : <code>pAB</code> (probabilité de ' +
      '<code>A∩B</code>) puis <code>pB</code> (probabilité de <code>B</code>). Affiche ' +
      '<code>P(A|B) = P(A∩B)/P(B)</code> arrondie à 4 décimales.</p>',
    starter: `pAB = float(input())\npB = float(input())\n\n# À compléter : afficher la probabilité conditionnelle P(A|B).\n`,
    hints: [
      'La probabilité conditionnelle est le rapport pAB / pB.',
      'Le dénominateur est la probabilité de la condition B : c’est elle qui réduit l’univers.',
    ],
    examples: [
      { stdin: '0.2\n0.5', expected: '0.4000', note: 'Deux chances sur cinq dans l’univers restreint.' }
    ],
    tests: [
      { label: 'Univers réduit de moitié', stdin: '0.15\n0.6', expected: '0.2500' },
      { label: 'Intersection forte', stdin: '0.4\n0.8', expected: '0.5000' },
      { label: 'Petite intersection', stdin: '0.1\n0.4', expected: '0.2500' }
    ],
    solution: `pAB = float(input())\npB = float(input())\n\npA_sachant_B = pAB / pB\nprint(f"{pA_sachant_B:.4f}")\n`
  }
];
