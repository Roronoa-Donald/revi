/**
 * Chapitre 4 du cours « Probabilités » B2 — lois discrètes usuelles.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 4,
  title: 'Lois discrètes usuelles',
  short: 'Lois usuelles',
  toc: 'Loi de Bernoulli, loi binomiale, loi de Poisson : situation, formule, espérance et variance.',
  time: '≈ 2 h 30 de travail',
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Beaucoup d’expériences se ressemblent : une épreuve à deux issues, un nombre de succès sur n essais, un ' +
    'comptage d’événements rares dans le temps. Plutôt que de recalculer à chaque fois, on reconnaît la loi ' +
    'type et on applique ses formules.',

  objectives: [
    'identifier une épreuve de Bernoulli et sa loi ;',
    'calculer P(X = k) pour une loi binomiale B(n, p) ;',
    'utiliser E = np et V = np(1−p) pour une loi binomiale ;',
    'modéliser un comptage rare par une loi de Poisson.'
  ],

  sections: [
    {
      title: 'Loi de Bernoulli',
      html: [
        '<p>Une <strong>épreuve de Bernoulli</strong> n’a que deux issues : succès (probabilité <code>p</code>) ' +
        'et échec (probabilité <code>1 − p</code>). La variable <code>X</code> qui vaut 1 en cas de succès suit ' +
        'la <strong>loi de Bernoulli</strong> <code>B(p)</code>, d’espérance <code>p</code> et de variance ' +
        '<code>p(1 − p)</code>.</p>',
        box('tech', 'La brique de base', 'blocks',
          '    <p>Tout le chapitre s’appuie sur cette épreuve. Une suite de <code>n</code> épreuves de Bernoulli ' +
          'indépendantes donne la loi binomiale ; on la répète sans mémoire.</p>'),
        '<div class="math-block">$$\\mathbb{E}(X) = p \\qquad \\text{et} \\qquad \\mathbb{V}(X) = p(1 - p)$$</div>\n' +
        '<div class="box box--formula"><div class="box__title">Exemple numérique (Bernoulli)</div><p>Pour $p = 0{,}3$ :</p>$$\\mathbb{E}(X) = 0{,}3000 \\qquad \\mathbb{V}(X) = 0{,}3 \\times 0{,}7 = 0{,}2100$$</div>'
      ].join('\n')
    },
    {
      title: 'Loi binomiale',
      html: [
        '<p>Si <code>X</code> compte le nombre de succès sur <code>n</code> épreuves de Bernoulli indépendantes ' +
        'de paramètre <code>p</code>, alors <code>X</code> suit la <strong>loi binomiale</strong> ' +
        '<code>B(n, p)</code> et :</p>',
        '<div class="math-block">$$\\mathbb{P}(X = k) = \\binom{n}{k} p^k (1 - p)^{n - k} \\qquad \\mathbb{E}(X) = n p \\qquad \\mathbb{V}(X) = n p (1 - p)$$</div>\n' +
        '<div class="box box--formula"><div class="box__title">Exemple de calcul binomial</div><p>Pour $n = 5$ essais, $k = 2$ succès et $p = 0{,}5$ :</p>$$\\mathbb{P}(X = 2) = \\binom{5}{2} (0{,}5)^2 (0{,}5)^3 = 10 \\times 0{,}25 \\times 0{,}125 = 0{,}3125$$</div>',
        box('intuition', 'Reconnaître B(n, p)', 'lightbulb',
          '    <p>On cherche un <strong>nombre de succès</strong> sur un <strong>nombre fixé</strong> ' +
          'd’épreuves <strong>identiques et indépendantes</strong> à deux issues. Les trois conditions réunies ' +
          '→ binomiale. Si le nombre d’épreuves n’est pas fixé mais qu’on compte des événements rares → Poisson.</p>')
      ].join('\n')
    },
    {
      title: 'Loi de Poisson',
      html: [
        '<p>La <strong>loi de Poisson</strong> de paramètre <code>λ &gt; 0</code> modélise un ' +
        '<strong>nombre d’événements</strong> survenant dans un intervalle (temps, espace) à taux moyen ' +
        'constant et sans mémoire :</p>',
        '<div class="math-block">$$\\mathbb{P}(X = k) = \\frac{\\lambda^k e^{-\\lambda}}{k!} \\qquad \\mathbb{E}(X) = \\mathbb{V}(X) = \\lambda$$</div>\n' +
        '<div class="box box--formula"><div class="box__title">Exemple de calcul de Poisson</div><p>Pour un taux moyen $\\lambda = 2{,}0$ et $k = 1$ événement :</p>$$\\mathbb{P}(X = 1) = \\frac{2^1 e^{-2}}{1!} = 2 \\times 0{,}135335 = 0{,}2707$$</div>',
        box('pitfall', 'Piège — multiplier au lieu d’exponentier', 'warning',
          '    <p>Dans <code>λᵏ · e^(−λ)</code>, le premier facteur est <code>λ</code> à la puissance ' +
          '<code>k</code>, le second l’exponentielle de <code>−λ</code>. Mélanger les deux (ou oublier le ' +
          '<code>k!</code> au dénominateur) fausse complètement le résultat.</p>')
      ].join('\n')
    },
    {
      title: 'Choisir la bonne loi',
      html: [
        '<p>Le réflexe est de traduire l’énoncé en paramètres : <code>n</code> et <code>p</code> pour la ' +
        'binomiale, <code>λ</code> (moyenne) pour la Poisson. Sens et unité de <code>λ</code> doivent suivre ' +
        'l’énoncé : « 3 appels par heure » donne <code>λ = 3</code> pour une heure, <code>λ = 1,5</code> pour ' +
        'une demi-heure.</p>',
        '<div class="box box--formula"><div class="box__title">Exemple de synthèse (Binomiale $n=10$, $p=0{,}2$)</div>$$\\mathbb{E}(X) = 10 \\times 0{,}2 = 2{,}0000 \\qquad \\mathbb{V}(X) = 10 \\times 0{,}2 \\times 0{,}8 = 1{,}6000$$</div>',
        box('tech', 'Deux paramètres, deux formules', 'scale',
          '    <p>Binomiale : deux paramètres <code>(n, p)</code>, espérance <code>np</code>, variance ' +
          '<code>np(1−p)</code>. Poisson : un paramètre <code>λ</code>, espérance et variance égales à ' +
          '<code>λ</code>. C’est souvent le nombre de paramètres qui trahit la loi.</p>')
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'Une épreuve de Bernoulli a…', opts: ['deux issues', 'trois issues', 'aucune issue'], correct: 0, exp: 'Succès ou échec : deux issues seulement.' },
    { stem: 'La loi binomiale modélise…', opts: ['un nombre de succès sur n épreuves', 'une durée', 'une moyenne'], correct: 0, exp: 'X compte les succès parmi n épreuves de Bernoulli.' },
    { stem: 'Formule de P(X = k) pour B(n, p) ?', opts: ['C(n,k)·pᵏ·(1−p)ⁿ⁻ᵏ', 'pᵏ', 'n·p'], correct: 0, exp: 'Le coefficient binomial choisit l’emplacement des k succès.' },
    { stem: 'Espérance d’une binomiale ?', opts: ['np', 'np(1−p)', 'λ'], correct: 0, exp: 'E(X) = n·p.' },
    { stem: 'Variance d’une binomiale ?', opts: ['np', 'np(1−p)', 'p(1−p)'], correct: 1, exp: 'V(X) = n·p·(1−p).' },
    { stem: 'Que vaut l’espérance d’une loi de Poisson ?', opts: ['λ', 'λ²', '√λ'], correct: 0, exp: 'Pour une Poisson, E(X) = V(X) = λ.' },
    { stem: 'Une loi de Poisson modélise…', opts: ['un comptage d’événements rares', 'un nombre de succès sur n fixé', 'une durée'], correct: 0, exp: 'Elle compte les occurrences par unité de temps ou d’espace.' },
    { stem: 'Que signifie λ dans la Poisson ?', opts: ['le nombre moyen d’événements', 'la probabilité', 'l’écart-type'], correct: 0, exp: 'λ est l’intensité moyenne sur l’intervalle considéré.' }
  ],

  pitfalls: [
    'Utiliser la binomiale sans vérifier l’indépendance des épreuves.',
    'Oublier le coefficient binomial <code>C(n,k)</code> dans <code>P(X = k)</code>.',
    'Confondre <code>E = np</code> et <code>V = np(1−p)</code>.',
    'Se tromper sur l’unité de <code>λ</code> dans une loi de Poisson.',
    'Oublier le <code>k!</code> au dénominateur de la loi de Poisson.'
  ],

  methodTitle: 'Reconnaître et appliquer une loi',
  method: [
    '<strong>Traduire</strong> l’énoncé : que compte X et quelle est son unité ?',
    '<strong>Choisir</strong> Bernoulli, binomiale ou Poisson selon le contexte.',
    '<strong>Relever</strong> les paramètres (n, p) ou λ.',
    '<strong>Appliquer</strong> la formule P(X = k), puis E et V.',
    '<strong>Contrôler</strong> l’ordre de grandeur (probabilité entre 0 et 1).'
  ],

  summary: [
    'Bernoulli B(p) : deux issues, E = p, V = p(1−p).',
    'Binomiale B(n,p) : P(X=k) = C(n,k)·pᵏ·(1−p)ⁿ⁻ᵏ, E = np, V = np(1−p).',
    'Poisson P(λ) : P(X=k) = λᵏ·e^(−λ)/k!, E = V = λ.',
    'Reconnaître la loi revient à lire les paramètres et le contexte.',
    'Vérifier λ et son unité avant tout calcul.'
  ],

  checklist: [
    'Je reconnais une épreuve de Bernoulli.',
    'Je fixe n et p ou λ selon le contexte.',
    'J’écris la bonne formule P(X = k).',
    'Je distingue espérance et variance de chaque loi.'
  ],

  notions: ['épreuve de Bernoulli', 'loi de Bernoulli', 'loi binomiale', 'coefficient binomial', 'loi de Poisson', 'paramètre λ', 'espérance', 'variance', 'succès', 'épreuves indépendantes', 'événement rare'],
  mastery: [
    { cls: 'low', text: '&lt; 50 % — Revois B(p) puis la formule de la binomiale.' },
    { cls: 'mid', text: '50–69 % — Entraînez-vous à choisir la loi selon l’énoncé.' },
    { cls: 'good', text: '70–94 % — Solide : vous appliquez formule, espérance et variance.' },
    { cls: 'top', text: '≥ 95 % — Maîtrise : passe aux variables continues, chapitre 5.' }
  ],

  flashcards: [
    { q: 'Qu’est-ce qu’une épreuve de Bernoulli ?', a: 'Une épreuve à deux issues : succès (p) et échec (1−p).' },
    { q: 'Formule de P(X = k) pour B(n, p) ?', a: 'C(n,k)·pᵏ·(1−p)ⁿ⁻ᵏ.' },
    { q: 'Espérance et variance d’une binomiale ?', a: 'E = np et V = np(1−p).' },
    { q: 'Formule de la loi de Poisson ?', a: 'P(X=k) = λᵏ·e^(−λ)/k!.' },
    { q: 'Espérance et variance d’une Poisson ?', a: 'E(X) = V(X) = λ.' },
    { q: 'Quand préférer Poisson à la binomiale ?', a: 'Pour un comptage d’événements rares sur un intervalle, sans n fixé.' }
  ]
};
