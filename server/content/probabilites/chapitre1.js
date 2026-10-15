/**
 * Chapitre 1 du cours « Probabilités » B2 — fondements.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 1,
  title: 'Fondements du calcul des probabilités',
  short: 'Fondements',
  toc: 'Univers et événements, axiomes de Kolmogorov, probabilité conditionnelle, indépendance.',
  time: '≈ 2 h de travail',
  free: true,

  situation:
    'Lancer un dé, tirer une carte, tester un patient : chaque expérience a des issues possibles, et l’on ' +
    'veut mesurer la chance qu’un événement survienne. Avant de calculer, il faut décrire l’univers, les ' +
    'événements et les règles que toute probabilité doit respecter.',

  objectives: [
    'décrire une expérience par son univers et ses événements ;',
    'appliquer les axiomes de Kolmogorov et les formules de la réunion et du complément ;',
    'calculer une probabilité conditionnelle P(A|B) ;',
    'reconnaître deux événements indépendants.'
  ],

  sections: [
    {
      title: 'Univers, événements et axiomes',
      html: [
        '<p>Une expérience aléatoire a un ensemble d’issues : l’<strong>univers</strong> <code>Ω</code>. Un ' +
        '<strong>événement</strong> est une partie de <code>Ω</code>. Par exemple, au lancer d’un dé à six faces, ' +
        '<code>Ω = {1, 2, 3, 4, 5, 6}</code> et « obtenir un nombre pair » est l’événement ' +
        '<code>A = {2, 4, 6}</code>.</p>',
        '<p>Une probabilité <code>P</code> associe à chaque événement un nombre entre 0 et 1 et respecte les ' +
        'trois <strong>axiomes de Kolmogorov</strong> : <code>P(Ω) = 1</code> ; <code>P(A) ≥ 0</code> ; et pour ' +
        'des événements incompatibles <code>P(A ∪ B) = P(A) + P(B)</code>.</p>',
        box('tech', 'Équiprobabilité : on compte', 'scale',
          '    <p>Quand toutes les issues ont la même chance, <code>P(A) = card(A)/card(Ω)</code> : le nombre ' +
          'de cas favorables divisé par le nombre de cas possibles. C’est le pont entre probabilités et ' +
          'dénombrement (chapitre 2).</p>'),
        '<pre><code>from math import gcd\n\nn = 6  # issues de l\'univers\nk = 3  # cas favorables\ng = gcd(k, n)\nprint(f"{k // g}/{n // g}")   # 1/2</code></pre>'
      ].join('\n')
    },
    {
      title: 'Complément, réunion, intersection',
      html: [
        '<p>L’<strong>événement contraire</strong> de <code>A</code>, noté <code>Ā</code>, a pour probabilité ' +
        '<code>P(Ā) = 1 − P(A)</code>. Pour deux événements quelconques, la formule de la réunion évite de ' +
        'compter deux fois l’intersection : <code>P(A ∪ B) = P(A) + P(B) − P(A ∩ B)</code>.</p>',
        '<pre><code>pA, pB, pAB = 0.5, 0.4, 0.2\np_union = pA + pB - pAB\nprint(f"{p_union:.4f}")   # 0.7000</code></pre>',
        box('pitfall', 'Piège — la double soustraction oubliée', 'warning',
          '    <p>Additionner <code>P(A)</code> et <code>P(B)</code> sans retirer <code>P(A ∩ B)</code> ' +
          'compte deux fois les issues communes : la probabilité obtenue peut même dépasser 1. Retire ' +
          'l’intersection <strong>une seule fois</strong>.</p>')
      ].join('\n')
    },
    {
      title: 'Probabilité conditionnelle',
      html: [
        '<p>Savoir que <code>B</code> est réalisé change l’univers : il se réduit à <code>B</code>. La ' +
        '<strong>probabilité conditionnelle</strong> de <code>A</code> sachant <code>B</code> est ' +
        '<code>P(A|B) = P(A ∩ B)/P(B)</code>, définie seulement si <code>P(B) ≠ 0</code>.</p>',
        '<pre><code>pAB, pB = 0.2, 0.5\npA_sachant_B = pAB / pB\nprint(f"{pA_sachant_B:.4f}")   # 0.4000</code></pre>',
        '<p>On en tire la formule de multiplication <code>P(A ∩ B) = P(A|B) · P(B)</code>, base des arbres ' +
        'de probabilité et de la formule des probabilités totales.</p>'
      ].join('\n')
    },
    {
      title: 'Indépendance',
      html: [
        '<p>Deux événements sont <strong>indépendants</strong> quand la réalisation de l’un ne change rien à ' +
        'la probabilité de l’autre : <code>P(A|B) = P(A)</code>, ce qui équivaut à ' +
        '<code>P(A ∩ B) = P(A) · P(B)</code>.</p>',
        box('intuition', 'Indépendant ≠ incompatible', 'lightbulb',
          '    <p>Deux événements <strong>incompatibles</strong> ne peuvent pas se produire ensemble ' +
          '(<code>P(A ∩ B) = 0</code>). Deux événements <strong>indépendants</strong> n’influencent pas leurs ' +
          'probabilités respectives : deux lancers de dé le sont, alors qu’ils ne sont pas incompatibles.</p>')
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'Que décrit l’univers d’une expérience aléatoire ?', opts: ['Ses résultats possibles', 'Sa durée', 'Sa probabilité'], correct: 0, exp: 'L’univers Ω rassemble toutes les issues possibles.' },
    { stem: 'Que vaut P(Ω) ?', opts: ['0', '1', '1/2'], correct: 1, exp: 'Le premier axiome de Kolmogorov impose P(Ω) = 1.' },
    { stem: 'Formule du complément ?', opts: ['P(Ā) = P(A)', 'P(Ā) = 1 − P(A)', 'P(Ā) = 1 + P(A)'], correct: 1, exp: 'A et Ā partitionnent Ω : leurs probabilités somment à 1.' },
    { stem: 'Formule de la réunion ?', opts: ['P(A) + P(B)', 'P(A) + P(B) − P(A∩B)', 'P(A)·P(B)'], correct: 1, exp: 'Il faut retirer une fois l’intersection comptée deux fois.' },
    { stem: 'Définition de P(A|B) ?', opts: ['P(A∩B)/P(B)', 'P(A)/P(B)', 'P(A)·P(B)'], correct: 0, exp: 'Conditionner par B réduit l’univers à B.' },
    { stem: 'Deux événements indépendants vérifient…', opts: ['P(A∩B) = 0', 'P(A∩B) = P(A)·P(B)', 'P(A) = P(B)'], correct: 1, exp: 'L’indépendance équivaut à la factorisation de l’intersection.' },
    { stem: 'Deux événements incompatibles vérifient…', opts: ['P(A∩B) = 0', 'P(A∩B) = P(A)·P(B)', 'P(A∪B) = 1'], correct: 0, exp: 'Incompatibles = disjoints : l’intersection est vide.' },
    { stem: 'Sur un univers équiprobable, P(A) vaut…', opts: ['card(A)/card(Ω)', 'card(Ω)/card(A)', 'card(A)'], correct: 0, exp: 'Cas favorables sur cas possibles.' }
  ],

  pitfalls: [
    'Additionner <code>P(A)</code> et <code>P(B)</code> sans retirer <code>P(A ∩ B)</code>.',
    'Confondre <code>P(A|B)</code> et <code>P(B|A)</code> : ce sont deux quantités différentes.',
    'Conditionner par un événement de probabilité nulle.',
    'Croire que « indépendant » signifie « incompatible ».',
    'Oublier de réduire les fractions avant de conclure.'
  ],

  methodTitle: 'Calculer une probabilité proprement',
  method: [
    '<strong>Décrire</strong> l’expérience et poser l’univers Ω.',
    '<strong>Écrire</strong> l’événement cherché comme une partie de Ω.',
    '<strong>Choisir</strong> la formule : équiprobabilité, réunion, complément, conditionnelle.',
    '<strong>Conditionner</strong> s’il y a une information donnée (formule P(A|B)).',
    '<strong>Vérifier</strong> que le résultat reste entre 0 et 1, et réduire la fraction.'
  ],

  summary: [
    'Un événement est une partie de l’univers Ω ; P(Ω) = 1 et P(A) ≥ 0.',
    'Équiprobabilité : P(A) = card(A)/card(Ω).',
    'Complément : P(Ā) = 1 − P(A) ; réunion : P(A∪B) = P(A)+P(B)−P(A∩B).',
    'Conditionnelle : P(A|B) = P(A∩B)/P(B).',
    'Indépendance : P(A∩B) = P(A)·P(B), à ne pas confondre avec l’incompatibilité.'
  ],

  checklist: [
    'Je pose l’univers et l’événement avant tout calcul.',
    'J’applique la bonne formule (réunion, complément, conditionnelle).',
    'Je distingue P(A|B) de P(B|A).',
    'Je vérifie que mon résultat est une probabilité entre 0 et 1.'
  ],

  notions: ['univers', 'événement', 'axiomes de Kolmogorov', 'équiprobabilité', 'complément', 'réunion', 'intersection', 'probabilité conditionnelle', 'indépendance', 'incompatibilité', 'probabilités totales'],
  mastery: [
    { cls: 'low', text: '&lt; 50 % — Reprends la définition de P(A|B) avant de continuer.' },
    { cls: 'mid', text: '50–69 % — Entraîne-toi sur les formules de réunion et de complément.' },
    { cls: 'good', text: '70–89 % — Solide : tu conditionnes sans confondre les deux sens.' },
    { cls: 'top', text: '≥ 95 % — Maîtrise : passe au dénombrement, chapitre 2.' }
  ],

  flashcards: [
    { q: 'Qu’est-ce que l’univers Ω ?', a: 'L’ensemble de toutes les issues possibles de l’expérience.' },
    { q: 'Que vaut P(Ā) ?', a: '1 − P(A), la probabilité de l’événement contraire.' },
    { q: 'Formule de la réunion ?', a: 'P(A∪B) = P(A) + P(B) − P(A∩B).' },
    { q: 'Comment définit-on P(A|B) ?', a: 'P(A∩B)/P(B), avec P(B) ≠ 0.' },
    { q: 'Comment reconnaître l’indépendance ?', a: 'Quand P(A∩B) = P(A)·P(B), ou P(A|B) = P(A).' },
    { q: 'Indépendant et incompatibles : même chose ?', a: 'Non : incompatibles = P(A∩B) = 0 ; indépendants = P(A∩B) = P(A)·P(B).' }
  ]
};
