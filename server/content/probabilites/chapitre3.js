/**
 * Chapitre 3 du cours « Probabilités » B2 — variables aléatoires discrètes.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 3,
  title: 'Variables aléatoires discrètes',
  short: 'Variables discrètes',
  toc: 'Loi de probabilité, espérance, variance, écart-type, fonction de répartition.',
  time: '≈ 2 h 30 de travail',
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Une variable aléatoire associe un nombre au résultat d’une expérience : le gain d’un jeu, le nombre de ' +
    'succès, la somme de deux dés. Une fois sa loi connue, deux nombres résument l’essentiel : autour de quoi ' +
    'elle se centre (espérance) et de combien elle s’en écarte (variance).',

  objectives: [
    'définir une variable aléatoire discrète et sa loi de probabilité ;',
    'calculer l’espérance E(X) = Σ xᵢ·pᵢ ;',
    'calculer la variance V(X) = E(X²) − E(X)² et l’écart-type ;',
    'construire la fonction de répartition F(x) = P(X ≤ x).'
  ],

  sections: [
    {
      title: 'Loi de probabilité',
      html: [
        '<p>Une <strong>variable aléatoire discrète</strong> <code>X</code> prend des valeurs isolées ' +
        '<code>x₁, x₂, …</code>, chacune avec une probabilité <code>pᵢ = P(X = xᵢ)</code>. L’ensemble des ' +
        'couples <code>(xᵢ, pᵢ)</code> est la <strong>loi de probabilité</strong>. Elle doit vérifier ' +
        '<code>0 ≤ pᵢ ≤ 1</code> et <code>Σ pᵢ = 1</code>.</p>',
        box('tech', 'Vérifier une loi avant de calculer', 'check-circle',
          '    <p>Si la somme des probabilités ne vaut pas 1, la loi est mal énoncée : inutile de calculer ' +
          'l’espérance. Ce contrôle attrape la plupart des erreurs d’énoncé et de recopie.</p>'),
        '<div class="math-block">$$\\sum_{i} p_i = 1 \\quad \\text{avec } 0 \\le p_i \\le 1$$</div>\n' +
        '<div class="box box--formula"><div class="box__title">Exemple de vérification</div><p>Pour une variable prenant les valeurs $0$ et $1$ avec $p_0 = 0{,}5$ et $p_1 = 0{,}5$ :</p>$$\\sum p_i = 0{,}5 + 0{,}5 = 1{,}0 \\implies \\text{loi valide}$$</div>'
      ].join('\n')
    },
    {
      title: 'Espérance',
      html: [
        '<p>L’<strong>espérance</strong> est la moyenne pondérée des valeurs, pondérée par leurs probabilités : ' +
        '<code>E(X) = Σ xᵢ · pᵢ</code>. C’est le gain moyen à long terme d’un jeu répété.</p>',
        '<div class="math-block">$$\\mathbb{E}(X) = \\sum_{i} x_i \\cdot p_i$$</div>\n' +
        '<div class="box box--formula"><div class="box__title">Exemple de calcul d’espérance</div><p>Pour les valeurs $(1, 2, 3)$ avec probabilités $(0{,}2 ; 0{,}3 ; 0{,}5)$ :</p>$$\\mathbb{E}(X) = 1 \\times 0{,}2 + 2 \\times 0{,}3 + 3 \\times 0{,}5 = 0{,}2 + 0{,}6 + 1{,}5 = 2{,}3000$$</div>',
        '<p>L’espérance est <strong>linéaire</strong> : <code>E(aX + b) = a·E(X) + b</code>, et ' +
        '<code>E(X + Y) = E(X) + E(Y)</code> même si <code>X</code> et <code>Y</code> ne sont pas indépendantes.</p>'
      ].join('\n')
    },
    {
      title: 'Variance et écart-type',
      html: [
        '<p>La <strong>variance</strong> mesure la dispersion autour de la moyenne. La formule la plus ' +
        'commode est la formule de <strong>Kœnig–Huygens</strong> : ' +
        '<code>V(X) = E(X²) − E(X)²</code>. L’<strong>écart-type</strong> est <code>σ(X) = √V(X)</code>, ' +
        'exprimé dans la même unité que <code>X</code>.</p>',
        '<div class="math-block">$$\\mathbb{V}(X) = \\mathbb{E}(X^2) - [\\mathbb{E}(X)]^2 \\qquad \\text{et} \\qquad \\sigma(X) = \\sqrt{\\mathbb{V}(X)}$$</div>\n' +
        '<div class="box box--formula"><div class="box__title">Exemple de variance (formule de Kœnig–Huygens)</div><p>Pour $X \\in \\{0, 1\\}$ avec $p = 0{,}5$ :</p>$$\\mathbb{E}(X) = 0{,}5, \\quad \\mathbb{E}(X^2) = 0{,}5 \\implies \\mathbb{V}(X) = 0{,}5 - (0{,}5)^2 = 0{,}2500$$</div>',
        box('pitfall', 'Piège — E(X²) n’est pas E(X)²', 'warning',
          '    <p><code>E(X²)</code> est la moyenne des <strong>carrés</strong> ; <code>E(X)²</code> est le ' +
          '<strong>carré de la moyenne</strong>. Les confondre donne une variance nulle à tort. On calcule ' +
          'les deux puis on soustrait.</p>')
      ].join('\n')
    },
    {
      title: 'Fonction de répartition',
      html: [
        '<p>La <strong>fonction de répartition</strong> cumule les probabilités jusqu’à un seuil : ' +
        '<code>F(x) = P(X ≤ x) = Σ_{xᵢ ≤ x} pᵢ</code>. Elle est croissante, vaut 0 avant la plus petite valeur ' +
        'et 1 à partir de la plus grande. « Au plus » (≤) est la convention de la répartition ; « au moins » ' +
        '(<code>P(X ≥ x)</code>) s’obtient par le complément.</p>',
        '<div class="math-block">$$F(x) = \\mathbb{P}(X \\le x) = \\sum_{x_i \\le x} p_i$$</div>\n' +
        '<div class="box box--formula"><div class="box__title">Exemple de répartition</div><p>Pour $X \\in \\{1, 2, 3\\}$ avec probabilités $(0{,}2 ; 0{,}3 ; 0{,}5)$, calculons $F(2)$ :</p>$$F(2) = \\mathbb{P}(X \\le 2) = 0{,}2 + 0{,}3 = 0{,}5000$$</div>',
        box('intuition', 'Deux façons de décrire la même loi', 'lightbulb',
          '    <p>La loi ponctuelle donne <code>P(X = x)</code> ; la répartition donne <code>P(X ≤ x)</code>. ' +
          'Passer de l’une à l’autre se fait par somme (ponctuelle → répartition) ou par différence ' +
          '(répartition → ponctuelle : <code>P(X = x) = F(x) − F(x⁻)</code>).</p>')
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'Une loi de probabilité discrète vérifie…', opts: ['Σ pᵢ = 1', 'Σ pᵢ = 0', 'Σ pᵢ = n'], correct: 0, exp: 'Les probabilités des valeurs possibles somment à 1.' },
    { stem: 'Formule de l’espérance ?', opts: ['Σ xᵢ', 'Σ xᵢ·pᵢ', 'Σ pᵢ'], correct: 1, exp: 'E(X) est la moyenne pondérée par les probabilités.' },
    { stem: 'Formule de Kœnig–Huygens ?', opts: ['E(X)² − E(X²)', 'E(X²) − E(X)²', 'E(X²) + E(X)²'], correct: 1, exp: 'V(X) = E(X²) − E(X)².' },
    { stem: 'L’écart-type vaut…', opts: ['V(X)', '√V(X)', 'V(X)²'], correct: 1, exp: 'σ(X) = √V(X), même unité que X.' },
    { stem: 'E(aX + b) vaut…', opts: ['aE(X) + b', 'E(X) + b', 'aE(X)'], correct: 0, exp: 'L’espérance est linéaire : aE(X) + b.' },
    { stem: 'Que vaut F(x) = P(X ≤ x) sous la plus petite valeur ?', opts: ['0', '1', '0,5'], correct: 0, exp: 'Aucune valeur n’est ≤ x : la répartition vaut 0.' },
    { stem: 'P(X ≥ x) se calcule comme…', opts: ['F(x)', '1 − P(X < x)', 'F(x) − 1'], correct: 1, exp: 'On passe par le complément de l’événement contraire.' },
    { stem: 'E(X²) est…', opts: ['le carré de la moyenne', 'la moyenne des carrés', 'la variance'], correct: 1, exp: 'E(X²) = Σ xᵢ²·pᵢ, une quantité différente de E(X)².' }
  ],

  pitfalls: [
    'Confondre <code>E(X²)</code> (moyenne des carrés) et <code>E(X)²</code> (carré de la moyenne).',
    'Utiliser une loi dont la somme des probabilités n’est pas 1.',
    'Calculer la variance avant l’espérance alors que la formule en dépend.',
    'Oublier que l’écart-type est la racine de la variance.',
    'Se tromper de sens dans la répartition (<code>≤</code> et non <code>&lt;</code>).'
  ],

  methodTitle: 'Décrire une variable aléatoire',
  method: [
    '<strong>Lister</strong> les valeurs possibles de X.',
    '<strong>Calculer</strong> chaque probabilité pᵢ et vérifier que Σ pᵢ = 1.',
    '<strong>Poser</strong> le tableau (xᵢ, pᵢ, xᵢ·pᵢ, xᵢ²·pᵢ).',
    '<strong>Déduire</strong> E(X) puis V(X) = E(X²) − E(X)².',
    '<strong>Construire</strong> F(x) en cumulant les probabilités.'
  ],

  summary: [
    'La loi ponctuelle donne P(X = xᵢ), avec Σ pᵢ = 1.',
    'E(X) = Σ xᵢ·pᵢ, linéaire : E(aX + b) = aE(X) + b.',
    'V(X) = E(X²) − E(X)² et σ(X) = √V(X).',
    'F(x) = P(X ≤ x) cumule les probabilités jusqu’au seuil x.',
    'Vérifier Σ pᵢ = 1 avant tout calcul.'
  ],

  checklist: [
    'Je vérifie que la somme des probabilités vaut 1.',
    'Je calcule E(X) et E(X²) séparément.',
    'Je distingue variance et écart-type.',
    'Je sais lire et construire une fonction de répartition.'
  ],

  notions: ['variable aléatoire discrète', 'loi de probabilité', 'espérance', 'linéarité', 'variance', 'Kœnig–Huygens', 'écart-type', 'fonction de répartition', 'P(X ≤ x)', 'complément', 'valeur possible'],
  mastery: [
    { cls: 'low', text: '&lt; 50 % — Revois E(X) = Σ xᵢ·pᵢ et la somme des probabilités.' },
    { cls: 'mid', text: '50–69 % — Reprenez V(X) = E(X²) − E(X)² sur des exemples courts.' },
    { cls: 'good', text: '70–94 % — Solide : vous construisez la répartition sans erreur.' },
    { cls: 'top', text: '≥ 95 % — Maîtrise : passe aux lois discrètes usuelles, chapitre 4.' }
  ],

  flashcards: [
    { q: 'Qu’est-ce qu’une loi de probabilité ?', a: 'L’ensemble des couples (valeur, probabilité) d’une variable aléatoire.' },
    { q: 'Formule de l’espérance ?', a: 'E(X) = Σ xᵢ·pᵢ.' },
    { q: 'Formule de la variance ?', a: 'V(X) = E(X²) − E(X)².' },
    { q: 'Comment obtient-on l’écart-type ?', a: 'σ(X) = √V(X).' },
    { q: 'Que représente F(x) ?', a: 'P(X ≤ x), la probabilité cumulée jusqu’au seuil x.' },
    { q: 'L’espérance est-elle linéaire ?', a: 'Oui : E(aX + b) = aE(X) + b, même sans indépendance.' }
  ]
};
