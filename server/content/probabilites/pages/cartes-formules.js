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

  const fBox = (label, formula, note = '') => [
    '  <div class="box--formula">',
    label ? `    <div class="formula-label">${label}</div>` : '',
    `    <div class="math-block">$$${formula}$$</div>`,
    note ? `    <p class="formula-note">${note}</p>` : '',
    '  </div>'
  ].filter(Boolean).join('\n');

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Formulaire' }]),
    '  <h1>Formulaire de probabilités</h1>',
    '  <p class="lead">Toutes les formules du cours sur une page. À garder ouvert pendant les exercices et ' +
    'l’atelier.</p>',

    bloc('Événements et probabilité', [
      fBox('Axiomes &amp; Probabilité de base', 'P(\\Omega) = 1, \\quad 0 \\le P(A) \\le 1, \\quad P(\\bar{A}) = 1 - P(A)'),
      fBox('Formule de la réunion (Crible)', 'P(A \\cup B) = P(A) + P(B) - P(A \\cap B)'),
      fBox('Conditionnement &amp; Indépendance', 'P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)} \\iff P(A \\cap B) = P(A) \\cdot P(B) \\quad (\\text{si } A, B \\text{ indépendants})'),
      '<p>« Incompatibles » ne veut pas dire « indépendants » : deux événements incompatibles ont une intersection vide ($A \\cap B = \\emptyset$), donc $P(A \\cap B) = 0$.</p>'
    ].join('\n')),

    bloc('Dénombrement', [
      fBox('Arrangements (l’ordre compte)', 'A_n^k = \\frac{n!}{(n-k)!} = n(n-1)\\cdots(n-k+1)'),
      fBox('Combinaisons (l’ordre ne compte pas)', 'C_n^k = \\binom{n}{k} = \\frac{n!}{k!(n-k)!}'),
      fBox('Binôme de Newton', '(a+b)^n = \\sum_{k=0}^n \\binom{n}{k} a^k b^{n-k}')
    ].join('\n')),

    bloc('Variable aléatoire discrète', [
      fBox('Loi &amp; Espérance mathématique', '\\sum_{i} p_i = 1, \\qquad E(X) = \\sum_{i} x_i p_i, \\qquad E(aX+b) = aE(X)+b'),
      fBox('Variance &amp; Écart-type (Kœnig-Huygens)', 'V(X) = E(X^2) - [E(X)]^2, \\qquad \\sigma(X) = \\sqrt{V(X)}'),
      fBox('Fonction de répartition', 'F(x) = P(X \\le x) = \\sum_{x_i \\le x} p_i, \\qquad P(X \\ge x) = 1 - P(X < x)')
    ].join('\n')),

    bloc('Lois discrètes usuelles', [
      fBox('Loi de Bernoulli \\(\\mathcal{B}(p)\\)', 'P(X=1) = p, \\quad P(X=0) = 1-p, \\quad E(X) = p, \\quad V(X) = p(1-p)'),
      fBox('Loi Binomiale \\(\\mathcal{B}(n, p)\\)', 'P(X=k) = \\binom{n}{k} p^k (1-p)^{n-k}, \\quad E(X) = np, \\quad V(X) = np(1-p)'),
      fBox('Loi de Poisson \\(\\mathcal{P}(\\lambda)\\)', 'P(X=k) = \\frac{\\lambda^k e^{-\\lambda}}{k!}, \\quad E(X) = \\lambda, \\quad V(X) = \\lambda')
    ].join('\n')),

    bloc('Variables continues', [
      fBox('Densité de probabilité &amp; Intégrale', '\\int_{-\\infty}^{+\\infty} f(x)\\,dx = 1, \\qquad P(a \\le X \\le b) = \\int_{a}^{b} f(x)\\,dx, \\qquad P(X = x) = 0'),
      fBox('Loi uniforme \\(\\mathcal{U}[a, b]\\)', 'f(x) = \\frac{1}{b-a}, \\quad F(x) = \\frac{x-a}{b-a}, \\quad E(X) = \\frac{a+b}{2}, \\quad V(X) = \\frac{(b-a)^2}{12}'),
      fBox('Loi exponentielle \\(\\mathcal{E}(\\lambda)\\)', 'f(x) = \\lambda e^{-\\lambda x}, \\quad P(X \\ge x) = e^{-\\lambda x}, \\quad E(X) = \\frac{1}{\\lambda}, \\quad V(X) = \\frac{1}{\\lambda^2}')
    ].join('\n')),

    bloc('Loi normale : repères', [
      fBox('Standardisation', 'Z = \\frac{X - \\mu}{\\sigma} \\sim \\mathcal{N}(0, 1), \\qquad \\Phi(-z) = 1 - \\Phi(z)'),
      fBox('Calcul d’intervalle &amp; Valeurs remarquables', 'P(a \\le Z \\le b) = \\Phi(b) - \\Phi(a), \\qquad P(|X-\\mu| \\le \\sigma) \\approx 0{,}68, \\quad P(|X-\\mu| \\le 2\\sigma) \\approx 0{,}95, \\quad \\Phi(1{,}96) \\approx 0{,}975')
    ].join('\n')),

    bloc('Convergence et théorèmes limites', [
      fBox('Inégalité de Markov (\\(X \\ge 0\\))', 'P(X \\ge a) \\le \\frac{E(X)}{a}'),
      fBox('Inégalité de Bienaymé-Tchebychev', 'P(|X - E(X)| \\ge \\varepsilon) \\le \\frac{V(X)}{\\varepsilon^2}'),
      fBox('Théorème Central Limite (TCL)', 'Z_n = \\frac{S_n - n\\mu}{\\sigma \\sqrt{n}} \\xrightarrow{\\mathcal{L}} \\mathcal{N}(0, 1) \\quad \\text{où } S_n = \\sum_{i=1}^n X_i')
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
