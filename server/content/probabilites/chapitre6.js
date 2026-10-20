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
        '<div class="math-block">$$\\mathbb{P}(X \\ge a) \\le \\frac{\\mathbb{E}(X)}{a} \\quad (\\text{pour } X \\ge 0 \\text{ et } a > 0)$$</div>\n' +
        '<div class="box box--formula"><div class="box__title">Exemple de borne de Markov</div><p>Si $\\mathbb{E}(X) = 4{,}0$ et pour le seuil $a = 8{,}0$ :</p>$$\\mathbb{P}(X \\ge 8{,}0) \\le \\frac{4{,}0}{8{,}0} = 0{,}5000$$</div>',
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
        '<div class="math-block">$$\\mathbb{P}(|X - \\mathbb{E}(X)| \\ge \\varepsilon) \\le \\frac{\\mathbb{V}(X)}{\\varepsilon^2} \\quad (\\text{pour tout } \\varepsilon > 0)$$</div>\n' +
        '<div class="box box--formula"><div class="box__title">Exemple de borne de Bienaymé-Tchebychev</div><p>Pour $\\mathbb{V}(X) = 4{,}0$ et $\\varepsilon = 2{,}0$ :</p>$$\\mathbb{P}(|X - \\mathbb{E}(X)| \\ge 2{,}0) \\le \\frac{4{,}0}{(2{,}0)^2} = \\frac{4{,}0}{4{,}0} = 1{,}0000$$</div>',
        box('pitfall', 'Piège — oublier de diviser par ε²', 'warning',
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
        '<div class="math-block">$$\\mathbb{E}(\\overline{X}_n) = \\mu \\qquad \\text{et} \\qquad \\mathbb{V}(\\overline{X}_n) = \\frac{\\sigma^2}{n} \\xrightarrow[n \\to +\\infty]{} 0$$</div>\n' +
        '<div class="box box--formula"><div class="box__title">Exemple d’échantillonnage ($n = 100$)</div><p>Pour $\\sigma^2 = 4{,}0$ et $n = 100$ observations :</p>$$\\mathbb{V}(\\overline{X}_{100}) = \\frac{4{,}0}{100} = 0{,}0400 \\quad (\\sigma_{\\overline{X}} = 0{,}2000)$$</div>',
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
        '<div class="math-block">$$Z_n = \\frac{S_n - n\\mu}{\\sigma \\sqrt{n}} \\xrightarrow[\\mathcal{L}]{n \\to +\\infty} \\mathcal{N}(0, 1)$$</div>\n' +
        '<div class="box box--formula"><div class="box__title">Exemple d’application du TCL</div><p>Pour $n = 100$, $\\mu = 0{,}5$, $\\sigma = 1{,}0$ et un seuil $S_{100} \\le 55{,}0$ :</p>$$z = \\frac{55{,}0 - 100 \\times 0{,}5}{1{,}0 \\times \\sqrt{100}} = \\frac{5{,}0}{10{,}0} = 0{,}5000$$$$\\mathbb{P}(S_{100} \\le 55{,}0) \\approx \\Phi(0{,}5) \\approx 0{,}6915$$</div>',
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
