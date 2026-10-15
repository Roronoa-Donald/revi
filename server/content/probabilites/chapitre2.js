/**
 * Chapitre 2 du cours « Probabilités » B2 — dénombrement.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 2,
  title: 'Dénombrement et recomptage',
  short: 'Dénombrement',
  toc: 'Principe multiplicatif, arrangements, combinaisons, permutations avec répétition, binôme de Newton.',
  time: '≈ 2 h 30 de travail',
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Sur un univers équiprobable, calculer une probabilité se ramène à compter des cas. Encore faut-il ' +
    'compter juste : distinguer l’ordre, gérer les répétitions, reconnaître quand on choisit un sous-ensemble ' +
    'plutôt qu’une suite ordonnée.',

  objectives: [
    'appliquer le principe multiplicatif et lister les cas d’un arbre ;',
    'distinguer arrangements et combinaisons ;',
    'compter les permutations avec répétition (anagrammes) ;',
    'utiliser le coefficient binomial et la formule du binôme.'
  ],

  sections: [
    {
      title: 'Principe multiplicatif et arbres',
      html: [
        '<p>Si une étape offre <code>m</code> choix et la suivante <code>n</code> choix, il y a ' +
        '<code>m × n</code> chemins. C’est le <strong>principe multiplicatif</strong> : il se répète jusqu’au ' +
        'produit de tous les niveaux. Un menu (3 entrées, 4 plats) offre 12 combinaisons.</p>',
        box('tech', 'L’arbre, outil de comptage', 'layers',
          '    <p>Un <strong>arbre</strong> dessine une expérience par étapes : chaque branche est un choix. ' +
          'Le nombre de chemins complets est le nombre de résultats ; on multiplie les branches plutôt que de ' +
          'les énumérer une à une.</p>'),
        '<pre><code>entrees = 3\nplats = 4\nprint(entrees * plats)   # 12</code></pre>'
      ].join('\n')
    },
    {
      title: 'Arrangements et combinaisons',
      html: [
        '<p>Un <strong>arrangement</strong> de <code>k</code> objets parmi <code>n</code> tient compte de ' +
        'l’ordre : <code>A(n,k) = n!/(n−k)! = n·(n−1)···(n−k+1)</code>. Une <strong>combinaison</strong> ' +
        'ignore l’ordre : <code>C(n,k) = A(n,k)/k! = n!/(k!(n−k)!)</code>.</p>',
        '<pre><code>from math import factorial, comb\n\n# Arrangement : 3 premières places parmi 5 chevaux.\nprint(factorial(5) // factorial(2))   # 60\n\n# Combinaison : choisir 2 chevaux parmi 5, sans ordre.\nprint(comb(5, 2))                      # 10</code></pre>',
        box('pitfall', 'Piège — oublier de diviser par k!', 'warning',
          '    <p>Passer de l’arrangement à la combinaison demande de <strong>diviser par k!</strong>, car ' +
          'chaque sous-ensemble de <code>k</code> objets a été compté <code>k!</code> fois (toutes les ' +
          'permutations internes). Même sans l’écrire, l’ordre reste compté si l’on garde l’arrangement.</p>')
      ].join('\n')
    },
    {
      title: 'Permutations avec répétition',
      html: [
        '<p>Combien d’<strong>anagrammes distincts</strong> le mot <code>AABB</code> a-t-il ? Les permutations ' +
        'des 4 lettres sont <code>4!</code>, mais échanger deux A identiques donne le même mot. La formule ' +
        'divise par les factorielles des effectifs :</p>',
        '<pre><code>from math import factorial\nfrom collections import Counter\n\ntotal = factorial(4)\nfor effectif in Counter("AABB").values():\n    total //= factorial(effectif)\nprint(total)   # 6</code></pre>',
        '<p>Avec des lettres toutes distinctes (<code>ABCD</code>), chaque effectif vaut 1 et l’on retrouve ' +
        '<code>4! = 24</code>.</p>'
      ].join('\n')
    },
    {
      title: 'Coefficients binomiaux et binôme',
      html: [
        '<p>Le nombre <code>C(n,k)</code> est aussi appelé <strong>coefficient binomial</strong>. Il apparaît ' +
        'dans la formule du <strong>binôme de Newton</strong> : <code>(a+b)ⁿ = Σ C(n,k)·aᵏ·bⁿ⁻ᵏ</code>. On ' +
        'le lit dans le triangle de Pascal, où chaque case est la somme des deux au-dessus.</p>',
        '<pre><code>from math import comb\n\nn = 4\nfor k in range(n + 1):\n    print(comb(n, k))\n# 1 4 6 4 1 — ligne n = 4 du triangle de Pascal</code></pre>',
        box('intuition', 'Compter, c’est choisir', 'lightbulb',
          '    <p>À l’oral : « on choisit 2 objets parmi 5 » se traduit toujours par <code>C(5,2)</code>. ' +
          '« on range 2 objets parmi 5 » (place, podium, mot de passe) se traduit par <code>A(5,2)</code>. ' +
          'Identifier si l’ordre compte est la moitié du travail.</p>')
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'Le principe multiplicatif dit que…', opts: ['on additionne les choix', 'on multiplie les choix des étapes', 'on divise les choix'], correct: 1, exp: 'm choix puis n choix donnent m × n chemins.' },
    { stem: 'Quand utilise-t-on un arrangement ?', opts: ['Quand l’ordre compte', 'Quand l’ordre ne compte pas', 'Jamais'], correct: 0, exp: 'A(n,k) tient compte de l’ordre des k objets choisis.' },
    { stem: 'Quand utilise-t-on une combinaison ?', opts: ['Quand l’ordre compte', 'Quand l’ordre ne compte pas', 'Toujours'], correct: 1, exp: 'C(n,k) ignore l’ordre : c’est un choix de sous-ensemble.' },
    { stem: 'Formule de C(n,k) ?', opts: ['n!/(n−k)!', 'n!/(k!(n−k)!)', 'n!·k!'], correct: 1, exp: 'On divise l’arrangement par k! pour oublier l’ordre.' },
    { stem: 'Combien d’anagrammes pour AAB ?', opts: ['3', '6', '2'], correct: 0, exp: '3!/2! = 6/2 = 3 anagrammes distincts.' },
    { stem: 'Le coefficient binomial C(n,k) sert dans…', opts: ['le binôme de Newton', 'la dérivée', 'l’intégrale'], correct: 0, exp: '(a+b)ⁿ = Σ C(n,k) aᵏ bⁿ⁻ᵏ.' },
    { stem: 'Combien d’anagrammes pour ABCD ?', opts: ['24', '12', '4'], correct: 0, exp: 'Lettres distinctes : 4! = 24.' },
    { stem: 'Pourquoi diviser par les factorielles des effectifs ?', opts: ['Pour compter les répétitions comme identiques', 'Pour accélérer', 'Pour l’ordre'], correct: 0, exp: 'Les permutations d’éléments identiques donnent le même mot.' }
  ],

  pitfalls: [
    'Confondre arrangement (ordre) et combinaison (pas d’ordre).',
    'Oublier de diviser par <code>k!</code> en passant de l’arrangement à la combinaison.',
    'Traiter des éléments répétés comme s’ils étaient distincts.',
    'Additionner les branches d’un arbre au lieu de les multiplier.',
    'Utiliser <code>C(n,k)</code> là où l’ordre compte (mot de passe, podium).'
  ],

  methodTitle: 'Compter sans se tromper',
  method: [
    '<strong>Représenter</strong> l’expérience par un arbre ou un schéma étape par étape.',
    '<strong>Décider</strong> si l’ordre compte : arrangement si oui, combinaison sinon.',
    '<strong>Repérer</strong> les répétitions et diviser par les factorielles des effectifs.',
    '<strong>Écrire</strong> le calcul en factorielles avant d’évaluer.',
    '<strong>Contrôler</strong> par un petit cas compté à la main.'
  ],

  summary: [
    'Principe multiplicatif : les choix successifs se multiplient.',
    'Arrangement A(n,k) = n!/(n−k)! : l’ordre compte.',
    'Combinaison C(n,k) = n!/(k!(n−k)!) : l’ordre ne compte pas.',
    'Permutations avec répétition : n! divisé par les factorielles des effectifs.',
    'C(n,k) est le coefficient du binôme de Newton, lu sur le triangle de Pascal.'
  ],

  checklist: [
    'Je sais dire si l’ordre compte dans un énoncé.',
    'J’écris un arrangement sans le confondre avec une combinaison.',
    'Je gère les répétitions en divisant par les factorielles.',
    'Je reconnais un coefficient binomial dans une formule.'
  ],

  notions: ['principe multiplicatif', 'arbre', 'factorielle', 'arrangement', 'combinaison', 'coefficient binomial', 'permutation avec répétition', 'anagramme', 'binôme de Newton', 'triangle de Pascal', 'sous-ensemble'],
  mastery: [
    { cls: 'low', text: '&lt; 50 % — Revois la différence arrangement / combinaison.' },
    { cls: 'mid', text: '50–69 % — Entraîne-toi sur les permutations avec répétition.' },
    { cls: 'good', text: '70–89 % — Solide : tu écris les factorielles correctement.' },
    { cls: 'top', text: '≥ 95 % — Maîtrise : passe aux variables aléatoires, chapitre 3.' }
  ],

  flashcards: [
    { q: 'Principe multiplicatif ?', a: 'Les choix d’étapes successives se multiplient.' },
    { q: 'Formule A(n,k) ?', a: 'n!/(n−k)! = n·(n−1)···(n−k+1), l’ordre compte.' },
    { q: 'Formule C(n,k) ?', a: 'n!/(k!(n−k)!), l’ordre ne compte pas.' },
    { q: 'Relation entre A(n,k) et C(n,k) ?', a: 'C(n,k) = A(n,k)/k!.' },
    { q: 'Anagrammes d’un mot avec répétitions ?', a: 'n! divisé par les factorielles des effectifs de chaque lettre.' },
    { q: 'Que donne le binôme de Newton ?', a: '(a+b)ⁿ = Σ C(n,k) aᵏ bⁿ⁻ᵏ.' }
  ]
};
