/**
 * Chapitre 6 du cours « Probabilités » B2 — convergence et théorèmes limites.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 6,
  title: 'Convergence et théorèmes limites',
  short: 'Convergence',
  toc: 'Inégalité de Markov, Bienaymé-Tchebychev, loi des grands nombres et théorème central limite.',
  time: '≈ 3 h de travail',
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Pourquoi la moyenne d’un grand échantillon se rapproche-t-elle de l’espérance ? Pourquoi la somme de ' +
    'beaucoup de variables indépendantes ressemble-t-elle à une loi normale ? Ces deux faits sont la raison ' +
    'pour laquelle les statistiques fonctionnent — et ils se démontrent par des inégalités simples.',

  objectives: [
    'majorer une probabilité par l’inégalité de Markov ;',
    'appliquer l’inégalité de Bienaymé-Tchebychev ;',
    'énoncer la loi des grands nombres ;',
    'approximer une somme par le théorème central limite.'
  ],

  sections: [
    {
      title: 'Inégalité de Markov',
      html: [
        '<p>Pour une variable <code>X</code> <strong>positive</strong> d’espérance finie et un seuil ' +
        '<code>a &gt; 0</code> : <code>P(X ≥ a) ≤ E(X)/a</code>. Plus le seuil est grand devant l’espérance, ' +
        'plus la probabilité de dépasser <code>a</code> est petite.</p>',
        '<pre><code>esperance, a = 4.0, 8.0\nprint(f"{esperance / a:.4f}")   # 0.5000</code></pre>',
        box('tech', 'Une borne, pas une égalité', 'scale',
          '    <p>L’inégalité fournit un <strong>majorant</strong> souvent grossier : la vraie probabilité ' +
          'peut être bien plus petite. Sa force est d’être <em>universelle</em> : elle ne suppose rien d’autre ' +
          'que la positivité et une espérance finie.</p>')
      ].join('\n')
    },
    {
      title: 'Inégalité de Bienaymé-Tchebychev',
      html: [
        '<p>Pour toute variable d’espérance <code>E(X)</code> et de variance <code>V(X)</code>, et pour tout ' +
        '<code>ε &gt; 0</code> : <code>P(|X − E(X)| ≥ ε) ≤ V(X)/ε²</code>. Elle majore la probabilité de ' +
        's’écarter de la moyenne.</p>',
        '<pre><code>variance, epsilon = 4.0, 2.0\nprint(f"{variance / (epsilon ** 2):.4f}")   # 1.0000</code></pre>',
        box('pitfall', 'Piège — oublier le carré de ε', 'warning',
          '    <p>La borne est <code>V(X)/ε²</code> : l’écart <code>ε</code> intervient <strong>au carré</strong>' +
          '. Doubler la tolérance divise la borne par 4. Une borne supérieure à 1 n’apprend rien (toute ' +
          'probabilité vaut au plus 1).</p>')
      ].join('\n')
    },
    {
      title: 'Loi des grands nombres',
      html: [
        '<p>Soient <code>X₁, …, Xₙ</code> indépendantes, de même espérance <code>μ</code> et de même variance ' +
        '<code>σ²</code>. Leur moyenne <code>M̄ₙ = (X₁ + … + Xₙ)/n</code> a pour espérance <code>μ</code> et ' +
        'pour variance <code>σ²/n</code>. La <strong>loi des grands nombres</strong> dit que <code>M̄ₙ</code> ' +
        'converge vers <code>μ</code> : la variance tend vers 0 quand <code>n</code> grandit.</p>',
        '<pre><code>sigma2, n = 4.0, 100\nprint(f"{sigma2 / n:.4f}")   # 0.0400 : la dispersion fond</code></pre>',
        '<p>C’est pourquoi, en statistique, plus l’échantillon est grand, plus la moyenne observée est proche ' +
        'de l’espérance théorique.</p>'
      ].join('\n')
    },
    {
      title: 'Théorème central limite',
      html: [
        '<p>Le <strong>théorème central limite</strong> (TCL) va plus loin : pour des variables indépendantes ' +
        'et identiquement distribuées, la somme <code>Sₙ = X₁ + … + Xₙ</code> se comporte, après ' +
        'standardisation, comme une loi normale. Sa moyenne vaut <code>nμ</code> et son écart-type ' +
        '<code>σ√n</code>, donc :</p>',
        '<pre><code>Sₙ standardisée : Z = (Sₙ − nμ) / (σ√n)  ≈  N(0, 1)</code></pre>',
        '<pre><code>from math import erf, sqrt\n\nn, mu, sigma, x = 100, 0.5, 1.0, 55.0\nz = (x - n * mu) / (sigma * sqrt(n))\nP = 0.5 * (1 + erf(z / sqrt(2)))\nprint(f"z = {z:.4f}")   # z = 0.5000\nprint(f"P = {P:.4f}")   # P = 0.6915</code></pre>',
        box('intuition', 'Pourquoi la cloche est partout', 'lightbulb',
          '    <p>Une somme de beaucoup de petites contributions indépendantes « s’oublie » : seul comptent ' +
          'l’effet moyen et l’effet aléatoire cumulé, qui se répartit en cloche. D’où l’omniprésence de la loi ' +
          'normale, indépendamment de la loi d’origine des <code>Xᵢ</code>.</p>')
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'L’inégalité de Markov suppose X…', opts: ['positive', 'normale', 'discrète'], correct: 0, exp: 'Markov vaut pour une variable positive d’espérance finie.' },
    { stem: 'Que majore Markov à partir de E(X) ?', opts: ['P(X ≥ a)', 'P(X = a)', 'P(X ≤ a)'], correct: 0, exp: 'P(X ≥ a) ≤ E(X)/a.' },
    { stem: 'La borne de Tchebychev vaut…', opts: ['V(X)/ε²', 'V(X)/ε', 'E(X)/ε²'], correct: 0, exp: 'P(|X−E(X)| ≥ ε) ≤ V(X)/ε².' },
    { stem: 'La moyenne de n variables i.i.d. a pour variance…', opts: ['σ²/n', 'σ²', 'nσ²'], correct: 0, exp: 'En moyennant, la variance se divise par n.' },
    { stem: 'Que dit la loi des grands nombres ?', opts: ['La moyenne converge vers l’espérance', 'La somme devient nulle', 'La variance augmente'], correct: 0, exp: 'M̄ₙ se rapproche de μ quand n grandit.' },
    { stem: 'Écart-type d’une somme Sₙ = X₁+…+Xₙ ?', opts: ['σ√n', 'σn', 'σ'], correct: 0, exp: 'Les variances s’additionnent : nσ², donc l’écart-type vaut σ√n.' },
    { stem: 'Que donne le TCL après standardisation ?', opts: ['Une loi normale N(0,1)', 'Une exponentielle', 'Une Poisson'], correct: 0, exp: 'La somme standardisée tend vers N(0,1).' },
    { stem: 'Markov et Tchebychev donnent…', opts: ['des majorants', 'des valeurs exactes', 'des minorants'], correct: 0, exp: 'Ce sont des inégalités : des bornes supérieures.' }
  ],

  pitfalls: [
    'Appliquer Markov à une variable qui n’est pas positive.',
    'Oublier d’élever <code>ε</code> au carré dans Tchebychev.',
    'Confondre la variance <code>σ²/n</code> de la moyenne et <code>nσ²</code> de la somme.',
    'Utiliser le TCL sans standardiser.',
    'Prendre une borne pour la valeur exacte de la probabilité.'
  ],

  methodTitle: 'Appliquer une inégalité ou le TCL',
  method: [
    '<strong>Identifier</strong> ce que l’on majore ou approxime (valeur, moyenne, somme).',
    '<strong>Choisir</strong> Markov (par l’espérance) ou Tchebychev (par la variance).',
    '<strong>Poser</strong> le bon seuil a ou l’écart ε.',
    '<strong>Pour le TCL</strong>, écrire moyenne <code>nμ</code> et écart-type <code>σ√n</code> avant de standardiser.',
    '<strong>Interpréter</strong> : un majorant est une borne, pas un résultat exact.'
  ],

  summary: [
    'Markov : pour X ≥ 0, P(X ≥ a) ≤ E(X)/a.',
    'Tchebychev : P(|X − E(X)| ≥ ε) ≤ V(X)/ε².',
    'Moyenne de n variables i.i.d. : E = μ, V = σ²/n ; elle converge vers μ.',
    'Somme Sₙ : E = nμ, écart-type = σ√n.',
    'TCL : la somme standardisée se comporte comme N(0, 1).'
  ],

  checklist: [
    'Je sais quand utiliser Markov plutôt que Tchebychev.',
    'Je distingue la variance d’une moyenne et celle d’une somme.',
    'Je standardise la somme avant d’utiliser le TCL.',
    'Je présente une borne comme un majorant, non une valeur exacte.'
  ],

  notions: ['inégalité de Markov', 'inégalité de Bienaymé-Tchebychev', 'majorant', 'loi des grands nombres', 'moyenne empirique', 'convergence', 'théorème central limite', 'standardisation', 'écart-type de la somme', 'variables i.i.d.', 'approximation normale'],
  mastery: [
    { cls: 'low', text: '&lt; 50 % — Revois les hypothèses de Markov et Tchebychev.' },
    { cls: 'mid', text: '50–69 % — Entraîne-toi à distinguer variance de la moyenne et de la somme.' },
    { cls: 'good', text: '70–89 % — Solide : tu standardises puis approximes sans erreur.' },
    { cls: 'top', text: '≥ 95 % — Maîtrise : le cours est bouclé, place aux examens blancs.' }
  ],

  flashcards: [
    { q: 'Inégalité de Markov ?', a: 'Pour X ≥ 0 : P(X ≥ a) ≤ E(X)/a.' },
    { q: 'Inégalité de Tchebychev ?', a: 'P(|X − E(X)| ≥ ε) ≤ V(X)/ε².' },
    { q: 'Variance de la moyenne de n variables i.i.d. ?', a: 'σ²/n : la dispersion diminue avec n.' },
    { q: 'Que dit la loi des grands nombres ?', a: 'La moyenne empirique converge vers l’espérance.' },
    { q: 'Moyenne et écart-type de Sₙ ?', a: 'E = nμ et écart-type = σ√n.' },
    { q: 'Que permet le TCL ?', a: 'Approximer la somme standardisée par une loi normale N(0,1).' }
  ]
};
