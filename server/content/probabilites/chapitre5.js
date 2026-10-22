/**
 * Chapitre 5 du cours « Probabilités » B2 — variables aléatoires continues.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 5,
  title: 'Variables aléatoires continues',
  short: 'Variables continues',
  toc: 'Densité, loi uniforme, loi exponentielle, loi normale et lecture d’une table.',
  time: '≈ 3 h de travail',
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Une durée de vie, une taille, une erreur de mesure prennent une infinité de valeurs : on ne peut plus ' +
    'parler de la probabilité d’une valeur exacte. On décrit alors la variable par une densité, et l’on ' +
    'calcule des probabilités d’intervalles par une aire.',

  objectives: [
    'passer de la loi ponctuelle discrète à la densité continue ;',
    'utiliser la loi uniforme et la loi exponentielle ;',
    'calculer une probabilité avec la loi normale centrée réduite ;',
    'lire et interpréter une table de la loi normale.'
  ],

  sections: [
      {
        "title": "Prérequis intégré : Comprendre et calculer une intégrale de densité sans cours d’Analyse préalable",
        "html": "<div class=\"box box--intuition\"><div class=\"box__title\">Niveau 1 — Intuition &amp; Règle opératoire : L’intégrale comme aire sous la courbe</div><p>Pour une variable continue, la probabilité de tomber dans un intervalle $[a, b]$ est l’<strong>aire située sous la courbe</strong> de la densité $f(x)$ entre $a$ et $b$, notée $\\int_a^b f(x)\\,dx$. Pour la calculer concrètement en exercice, il suffit de trouver une <strong>primitive</strong> $F(x)$ (la fonction inverse de la dérivée) et d’appliquer la formule $F(b) - F(a)$ :</p><ul><li><strong>Constante :</strong> une primitive de $c$ est $c \\cdot x$, donc $\\int_a^b c\\,dx = c(b - a)$ (utilisé pour la loi uniforme) ;</li><li><strong>Puissance :</strong> une primitive de $x$ est $\\frac{x^2}{2}$ et une primitive de $x^2$ est $\\frac{x^3}{3}$ ;</li><li><strong>Exponentielle :</strong> une primitive de $\\lambda e^{-\\lambda x}$ est $-e^{-\\lambda x}$, ce qui donne directement $P(X \\le t) = \\int_0^t \\lambda e^{-\\lambda x}\\,dx = 1 - e^{-\\lambda t}$ pour la loi exponentielle.</li></ul></div>"
      },
    {
      title: 'Densité et fonction de répartition',
      html: [
        '<p>Une variable <strong>continue</strong> <code>X</code> est décrite par une <strong>densité</strong> ' +
        '<code>f</code> positive, d’intégrale totale 1 : <code>∫ f(x) dx = 1</code>. La probabilité d’un ' +
        'intervalle est l’aire sous la courbe : <code>P(a ≤ X ≤ b) = ∫ₐᵇ f(x) dx</code>. La fonction de ' +
        'répartition est <code>F(x) = P(X ≤ x) = ∫₋∞ˣ f(t) dt</code>.</p>',
        box('pitfall', 'Piège — P(X = x) = 0 pour une loi continue', 'warning',
          '    <p>Pour une variable continue, la probabilité d’une valeur exacte est nulle : ' +
          '<code>P(X = x) = 0</code>. Seules les probabilités d’<strong>intervalles</strong> ont un sens, et ' +
          '<code>P(a ≤ X ≤ b) = P(a &lt; X ≤ b) = P(a ≤ X &lt; b)</code> : les bornes n’importent pas.</p>')
      ].join('\n')
    },
    {
      title: 'Loi uniforme et loi exponentielle',
      html: [
        '<p>La <strong>loi uniforme</strong> sur <code>[a, b]</code> répartit la probabilité également : ' +
        '<code>F(x) = (x − a)/(b − a)</code>. La <strong>loi exponentielle</strong> de paramètre ' +
        '<code>λ &gt; 0</code>, souvent utilisée pour une durée de vie, a pour répartition ' +
        '<code>P(X ≥ x) = e^(−λx)</code>.</p>',
        '<div class="math-block">$$\\text{Loi Uniforme : } F(x) = \\frac{x - a}{b - a} \\qquad \\text{Loi Exponentielle : } \\mathbb{P}(X \\ge x) = e^{-\\lambda x}$$</div>\n' +
        '<div class="box box--formula"><div class="box__title">Exemples continus usuels</div><p><strong>Uniforme</strong> sur $[1, 5]$ au point médian $x = 3$ :</p>$$F(3) = \\frac{3 - 1}{5 - 1} = \\frac{2}{4} = 0{,}5000$$<p><strong>Exponentielle</strong> de paramètre $\\lambda = 2$ pour $x = 3$ :</p>$$\\mathbb{P}(X \\ge 3) = e^{-2 \\times 3} = e^{-6} \\approx 0{,}0025$$</div>',
        box('intuition', 'Sans mémoire', 'lightbulb',
          '    <p>La loi exponentielle est <strong>sans mémoire</strong> : savoir que l’événement n’est pas ' +
          'encore arrivé ne change rien à la loi des temps restants. C’est le pendant continu de la loi de ' +
          'Poisson, qui compte les événements.</p>')
      ].join('\n')
    },
    {
      title: 'Loi normale et standardisation',
      html: [
        '<p>La <strong>loi normale</strong> <code>N(μ, σ)</code> est en cloche, centrée en <code>μ</code> et ' +
        'd’écart-type <code>σ</code>. On se ramène à la <strong>normale centrée réduite</strong> ' +
        '<code>N(0, 1)</code> par la <strong>standardisation</strong> ' +
        '<code>Z = (X − μ)/σ</code>.</p>',
        '<div class="math-block">$$Z = \\frac{X - \\mu}{\\sigma} \\sim \\mathcal{N}(0, 1) \\qquad \\Phi(z) = \\mathbb{P}(Z \\le z)$$</div>\n' +
        '<div class="box box--formula"><div class="box__title">Valeurs remarquables de la loi normale centrée réduite</div>$$\\Phi(0) = 0{,}5000 \\qquad \\Phi(1{,}96) \\approx 0{,}9750 \\qquad \\Phi(1) \\approx 0{,}8413$$</div>',
        box('tech', 'Repères à connaître', 'chart',
          '    <p>Autour de la moyenne : <code>P(μ−σ ≤ X ≤ μ+σ) ≈ 0,68</code>, ' +
          '<code>≈ 0,95</code> pour <code>±2σ</code>, <code>≈ 0,997</code> pour <code>±3σ</code>. Le ' +
          'quantile <code>1,96</code> coupe 97,5 % de la masse à sa gauche.</p>')
      ].join('\n')
    },
    {
      title: 'Lire une table de la loi normale',
      html: [
        '<p>La <strong>table</strong> donne <code>Φ(z) = P(Z ≤ z)</code> pour <code>z ≥ 0</code>. Pour ' +
        '<code>z &lt; 0</code>, on utilise la symétrie : <code>Φ(−z) = 1 − Φ(z)</code>. Pour une probabilité ' +
        'd’intervalle : <code>P(a ≤ Z ≤ b) = Φ(b) − Φ(a)</code>.</p>',
        '<div class="math-block">$$\\mathbb{P}(a \\le Z \\le b) = \\Phi(b) - \\Phi(a) \\qquad \\text{avec } \\Phi(-z) = 1 - \\Phi(z)$$</div>\n' +
        '<div class="box box--formula"><div class="box__title">Exemple de calcul d’intervalle sur $\\mathcal{N}(0, 1)$</div><p>Calculons $\\mathbb{P}(-1 \\le Z \\le 2)$ :</p>$$\\mathbb{P}(-1 \\le Z \\le 2) = \\Phi(2) - \\Phi(-1) = \\Phi(2) - (1 - \\Phi(1))$$$$= 0{,}9772 - (1 - 0{,}8413) = 0{,}9772 - 0{,}1587 = 0{,}8185$$</div>',
        '<p>La table statistique donne directement $\\Phi(z)$ pour toute valeur positive centrée réduite.</p>'
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'Pour une loi continue, P(X = x) vaut…', opts: ['0', 'f(x)', '1'], correct: 0, exp: 'La probabilité d’une valeur exacte est nulle.' },
    { stem: 'La densité vérifie…', opts: ['∫ f = 1', '∫ f = 0', 'Σ f = 1'], correct: 0, exp: 'L’aire totale sous la densité vaut 1.' },
    { stem: 'F(x) pour une uniforme sur [a, b] ?', opts: ['(x−a)/(b−a)', 'x/b', '1/x'], correct: 0, exp: 'La répartition croît linéairement de a à b.' },
    { stem: 'P(X ≥ x) pour une exponentielle de paramètre λ ?', opts: ['e^(−λx)', 'λx', '1 − e^(−λx)'], correct: 0, exp: 'La probabilité de dépasser x est e^(−λx).' },
    { stem: 'Comment standardise-t-on X ?', opts: ['Z = (X−μ)/σ', 'Z = X·σ', 'Z = X+μ'], correct: 0, exp: 'Z = (X−μ)/σ suit N(0,1).' },
    { stem: 'Que vaut Φ(0) ?', opts: ['0,5', '0', '1'], correct: 0, exp: 'La courbe est symétrique : la moitié de la masse est à gauche de 0.' },
    { stem: 'Φ(−z) vaut…', opts: ['1 − Φ(z)', 'Φ(z)', '−Φ(z)'], correct: 0, exp: 'La symétrie de la normale donne Φ(−z) = 1 − Φ(z).' },
    { stem: 'P(a ≤ Z ≤ b) vaut…', opts: ['Φ(b) − Φ(a)', 'Φ(a) − Φ(b)', 'Φ(b)·Φ(a)'], correct: 0, exp: 'On soustrait les répartitions aux deux bornes.' }
  ],

  pitfalls: [
    'Chercher <code>P(X = x)</code> pour une variable continue (valeur toujours nulle).',
    'Oublier de standardiser avant de lire la table.',
    'Mal traiter <code>z &lt; 0</code> : utiliser <code>Φ(−z) = 1 − Φ(z)</code>.',
    'Inverser les bornes dans <code>P(a ≤ Z ≤ b) = Φ(b) − Φ(a)</code>.',
    'Confondre <code>P(X ≤ x)</code> et <code>P(X ≥ x)</code> dans l’exponentielle.'
  ],

  methodTitle: 'Traiter une loi continue',
  method: [
    '<strong>Identifier</strong> la loi (uniforme, exponentielle, normale) et ses paramètres.',
    '<strong>Si normale</strong>, standardiser avec Z = (X − μ)/σ.',
    '<strong>Écrire</strong> la probabilité comme une aire (intervalle, complément).',
    '<strong>Évaluer</strong> Φ avec erf ou la table, en gérant les z négatifs.',
    '<strong>Interpréter</strong> le résultat comme une proportion.'
  ],

  summary: [
    'Une variable continue est décrite par une densité d’aire totale 1.',
    'P(X = x) = 0 ; seules les probabilités d’intervalles comptent.',
    'Uniforme : F(x) = (x−a)/(b−a). Exponentielle : P(X ≥ x) = e^(−λx).',
    'Normale : standardiser Z = (X−μ)/σ, puis lire Φ.',
    'Φ(−z) = 1 − Φ(z) et P(a ≤ Z ≤ b) = Φ(b) − Φ(a).'
  ],

  checklist: [
    'Je sais qu’une probabilité ponctuelle continue vaut 0.',
    'J’applique la répartition d’une uniforme et d’une exponentielle.',
    'Je standardise avant d’utiliser la loi normale.',
    'Je gère les z négatifs par symétrie.'
  ],

  notions: ['densité', 'fonction de répartition', 'loi uniforme', 'loi exponentielle', 'loi sans mémoire', 'loi normale', 'standardisation', 'loi centrée réduite', 'fonction Φ', 'table de la normale', 'aire sous la courbe'],
  mastery: [
    { cls: 'low', text: '&lt; 50 % — Revois densité et probabilité nulle en un point.' },
    { cls: 'mid', text: '50–69 % — Reprenez la standardisation puis la lecture de Φ.' },
    { cls: 'good', text: '70–94 % — Solide : vous traitez les intervalles et les symétries.' },
    { cls: 'top', text: '≥ 95 % — Maîtrise : passe à la convergence, chapitre 6.' }
  ],

  flashcards: [
    { q: 'Comment définit-on une densité ?', a: 'Une fonction positive dont l’intégrale totale vaut 1.' },
    { q: 'Que vaut P(X = x) en continu ?', a: '0 : seule une probabilité d’intervalle est non nulle.' },
    { q: 'Répartition d’une uniforme sur [a, b] ?', a: 'F(x) = (x−a)/(b−a).' },
    { q: 'P(X ≥ x) pour une exponentielle ?', a: 'e^(−λx).' },
    { q: 'Comment standardiser ?', a: 'Z = (X − μ)/σ, qui suit N(0, 1).' },
    { q: 'Symétrie de la normale ?', a: 'Φ(−z) = 1 − Φ(z).' }
  ]
};
