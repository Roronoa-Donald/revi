/**
 * Pages « cartes de révision » et « formulaire » du cours « Probabilités » B2.
 */
'use strict';

const { crumb, cards } = require('../../../../scripts/course-kit');
const { chnav } = require('./helpers');

/* ======================== Cartes ======================== */

function cartes(course, chapterList) {
  const modules = chapterList.map(chapitre => ({
    title: 'Module ' + chapitre.n + ' — ' + chapitre.title,
    items: chapitre.flashcards
  }));

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Cartes' }]),
    '  <h1>Cartes de révision</h1>',
    '  <p class="lead">Clique une carte pour révéler la réponse. Objectif : répondre sans hésiter, dans les ' +
    'deux sens. Reviens à J+1, J+3, J+7 pour ancrer durablement.</p>',
    cards(modules),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: 'formules.html', label: 'Formulaire' })
  ].join('\n\n');

  return {
    'chapitres/cartes.html': {
      title: 'Cartes de révision — ' + course.brand,
      description: 'Flashcards de révision du cours de probabilités B2 : notions clés des ' +
        chapterList.length + ' chapitres.',
      active: 'cartes',
      body
    }
  };
}

/* ======================== Formulaire ======================== */

function formules(course) {
  const bloc = (titre, html) => '  <h2>' + titre + '</h2>\n' + html;

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Formulaire' }]),
    '  <h1>Formulaire de probabilités</h1>',
    '  <p class="lead">Toutes les formules du cours sur une page. À garder ouvert pendant les exercices et ' +
    'l’atelier.</p>',

    bloc('Événements et probabilité', [
      '<pre><code>P(Ω) = 1       0 ≤ P(A) ≤ 1       P(Ā) = 1 − P(A)\n',
      'P(A ∪ B) = P(A) + P(B) − P(A ∩ B)     (formule de la réunion)\n',
      'univers équiprobable : P(A) = card(A) / card(Ω)\n',
      'P(A|B) = P(A ∩ B) / P(B)              (probabilité conditionnelle)\n',
      'indépendance : P(A ∩ B) = P(A) · P(B)</code></pre>',
      '<p>« Incompatibles » ne veut pas dire « indépendants » : incompatibles = intersection vide.</p>'
    ].join('\n')),

    bloc('Dénombrement', [
      '<pre><code>principe multiplicatif : m × n × …\n',
      'arrangement A(n,k) = n! / (n−k)!         (l’ordre compte)\n',
      'combinaison C(n,k) = n! / (k!(n−k)!)     (l’ordre ne compte pas)\n',
      'permutations avec répétition : n! / (r₁! r₂! …)\n',
      'binôme : (a+b)ⁿ = Σ C(n,k) aᵏ bⁿ⁻ᵏ</code></pre>'
    ].join('\n')),

    bloc('Variable aléatoire discrète', [
      '<pre><code>loi : Σ pᵢ = 1\n',
      'espérance : E(X) = Σ xᵢ pᵢ        linéarité : E(aX+b) = aE(X)+b\n',
      'variance : V(X) = E(X²) − E(X)²   écart-type : σ(X) = √V(X)\n',
      'répartition : F(x) = P(X ≤ x) = Σ_{xᵢ ≤ x} pᵢ\n',
      'P(X ≥ x) = 1 − P(X &lt; x)</code></pre>'
    ].join('\n')),

    bloc('Lois discrètes usuelles', [
      '<pre><code>Bernoulli B(p)      E = p            V = p(1−p)\n',
      'Binomiale B(n,p)    P(X=k) = C(n,k) pᵏ (1−p)ⁿ⁻ᵏ\n',
      '                    E = n p          V = n p (1−p)\n',
      'Poisson P(λ)        P(X=k) = λᵏ e^(−λ) / k!\n',
      '                    E = λ            V = λ</code></pre>'
    ].join('\n')),

    bloc('Variables continues', [
      '<pre><code>densité : ∫ f(x) dx = 1        P(a ≤ X ≤ b) = ∫ₐᵇ f(x) dx\n',
      'P(X = x) = 0                    (valeur exacte)\n',
      'uniforme [a,b] : F(x) = (x−a)/(b−a)\n',
      'exponentielle λ : P(X ≥ x) = e^(−λx)\n',
      'normale N(μ,σ) : standardiser Z = (X − μ)/σ</code></pre>'
    ].join('\n')),

    bloc('Loi normale : repères', [
      '<pre><code>Φ(z) = 0,5 (1 + erf(z/√2))        Φ(0) = 0,5\n',
      'Φ(−z) = 1 − Φ(z)                  P(a ≤ Z ≤ b) = Φ(b) − Φ(a)\n',
      'P(μ−σ ≤ X ≤ μ+σ) ≈ 0,68     ±2σ ≈ 0,95     ±3σ ≈ 0,997\n',
      'quantile 1,96 : Φ(1,96) ≈ 0,975</code></pre>'
    ].join('\n')),

    bloc('Convergence et théorèmes limites', [
      '<pre><code>Markov (X ≥ 0)            P(X ≥ a) ≤ E(X)/a\n',
      'Tchebychev                 P(|X−E(X)| ≥ ε) ≤ V(X)/ε²\n',
      'moyenne de n variables    E = μ,  V = σ²/n  → μ\n',
      'somme Sₙ = X₁+…+Xₙ         E = nμ,  σ = σ√n\n',
      'TCL : Z = (Sₙ − nμ)/(σ√n) ≈ N(0, 1)</code></pre>'
    ].join('\n')),

    bloc('Erreurs fréquentes à éviter', [
      '<ul>',
      '    <li>Oublier de retirer <code>P(A ∩ B)</code> dans la réunion.</li>',
      '    <li>Confondre <code>P(A|B)</code> et <code>P(B|A)</code>.</li>',
      '    <li>Compter l’ordre (arrangement) là où il ne compte pas (combinaison).</li>',
      '    <li>Confondre <code>E(X²)</code> et <code>E(X)²</code> dans la variance.</li>',
      '    <li>Oublier <code>C(n,k)</code> dans <code>P(X = k)</code> de la binomiale.</li>',
      '    <li>Chercher <code>P(X = x)</code> pour une variable continue (vaut 0).</li>',
      '    <li>Ne pas standardiser avant d’utiliser la loi normale.</li>',
      '  </ul>'
    ].join('\n')),

    chnav({ href: 'cartes.html', label: 'Cartes' }, { href: 'simulateur-examen.html', label: 'Examens blancs' })
  ].join('\n\n');

  return {
    'chapitres/formules.html': {
      title: 'Formulaire — ' + course.brand,
      description: 'Formulaire du cours de probabilités B2 : événements, dénombrement, variables aléatoires, ' +
        'lois usuelles, lois continues et théorèmes limites sur une page.',
      active: 'formules',
      body
    }
  };
}

module.exports = { cartes, formules };
