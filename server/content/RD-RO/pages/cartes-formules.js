/**
 * Pages « cartes de révision » et « mémo » du cours « Recherche Opérationnelle » B2.
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
    '  <p class="lead">Clique sur une carte pour révéler la réponse. Objectif : répondre sans hésiter dans ' +
    'les deux sens pour ancrer durablement les concepts clés de la modélisation linéaire, du simplexe, de la dualité et des réseaux.</p>',
    cards(modules),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: 'formules.html', label: 'Mémo des formules de RO' })
  ].join('\n\n');

  return {
    'chapitres/cartes.html': {
      title: 'Cartes de révision — ' + course.brand,
      description: 'Flashcards de révision du cours Recherche Opérationnelle B2 : notions clés des ' +
        chapterList.length + ' chapitres.',
      active: 'cartes',
      body
    }
  };
}

/* ======================== Mémo ======================== */

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
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Mémo' }]),
    '  <h1>Mémo synthétique de Recherche Opérationnelle</h1>',
    '  <p class="lead">Toutes les formes matricielles, formules d’intersection, règles de pivotage, théorèmes de dualité, ' +
    'équations de transport et lois d’ordonnancement réunies sur une seule page de référence.</p>',

    bloc('1. Forme Canonique &amp; Forme Standard', [
      fBox('Forme Canonique (Primal MAX)', '\\max Z = \\mathbf{c}^T \\mathbf{x} \\quad \\text{sous} \\quad A\\mathbf{x} \\le \\mathbf{b}, \\quad \\mathbf{x} \\ge \\mathbf{0}'),
      fBox('Mise sous forme standard (Variables d’écart et d’excès)', '\\begin{cases} \\sum_{j=1}^n a_{ij} x_j + s_i = b_i, & s_i \\ge 0 \\quad (\\text{contrainte } \\le) \\\\[4pt] \\sum_{j=1}^n a_{kj} x_j - e_k = b_k, & e_k \\ge 0 \\quad (\\text{contrainte } \\ge) \\end{cases}')
    ].join('\n')),

    bloc('2. Géométrie &amp; Règle de Cramer (2 variables)', [
      fBox('Intersection de deux droites actives &amp; Déterminant', '\\Delta = a_1 b_2 - a_2 b_1, \\qquad x_1^* = \\frac{c_1 b_2 - c_2 b_1}{\\Delta}, \\qquad x_2^* = \\frac{a_1 c_2 - a_2 c_1}{\\Delta} \\quad (\\Delta \\ne 0)')
    ].join('\n')),

    bloc('3. Algorithme du Simplexe (Tableau de Dantzig)', [
      fBox('Critère de Dantzig (Variable entrante)', 'k = \\operatorname{argmax} \\{ \\Delta_j \\mid \\Delta_j > 0 \\} \\quad (\\text{optimal si tous les } \\Delta_j \\le 0)'),
      fBox('Règle du ratio minimum (Variable sortante)', '\\theta = \\min_{i} \\left\\{ \\frac{b_i}{a_{ik}} \\;\\middle|\\; a_{ik} > 0 \\right\\} \\quad (\\text{non borné si } \\forall i, \\; a_{ik} \\le 0)'),
      fBox('Opération de pivot de Gauss-Jordan', 'L_r \\leftarrow \\frac{L_r}{p}, \\qquad L_i \\leftarrow L_i - a_{ik} L_r \\quad (\\forall i \\ne r)')
    ].join('\n')),

    bloc('4. Théorie de la Dualité &amp; Prix d’Ombre', [
      fBox('Transposition Primal / Dual', '\\max Z = \\mathbf{c}^T \\mathbf{x} \\; (A\\mathbf{x} \\le \\mathbf{b}, \\mathbf{x} \\ge \\mathbf{0}) \\iff \\min W = \\mathbf{b}^T \\mathbf{y} \\; (A^T \\mathbf{y} \\ge \\mathbf{c}, \\mathbf{y} \\ge \\mathbf{0})'),
      fBox('Théorème fort de dualité &amp; Écarts complémentaires', 'Z(\\mathbf{x}^*) = W(\\mathbf{y}^*), \\qquad y_i^* \\cdot s_i^* = 0, \\qquad x_j^* \\cdot e_j^* = 0'),
      fBox('Prix d’ombre (Shadow Price)', 'y_i^* = \\frac{\\partial Z^*}{\\partial b_i}')
    ].join('\n')),

    bloc('5. Problème de Transport &amp; Méthode MODI', [
      fBox('Condition d’équilibre logistique', '\\sum_{i=1}^m O_i = \\sum_{j=1}^n D_j'),
      fBox('Potentiels MODI &amp; Coûts marginaux', 'u_i + v_j = c_{ij} \\quad (\\text{cases de base}), \\qquad \\Delta_{ij} = c_{ij} - (u_i + v_j) \\quad (\\text{optimal ssi } \\forall i,j, \\; \\Delta_{ij} \\ge 0)')
    ].join('\n')),

    bloc('6. Ordonnancement PERT / CPM &amp; Flots', [
      fBox('Calcul aller-retour (Dates au plus tôt et au plus tard)', 'ES_j = \\max_{p \\in \\operatorname{Pred}(j)} (ES_p + d_p), \\qquad LF_i = \\min_{s \\in \\operatorname{Succ}(i)} (LS_s)'),
      fBox('Marges et Chemin critique', 'MT_i = LF_i - ES_i - d_i, \\qquad \\text{Chemin critique : } \\{ i \\mid MT_i = 0 \\}'),
      fBox('Théorème Max-Flow Min-Cut (Ford-Fulkerson)', '\\max |f| = \\min_{(S, T)} \\operatorname{cap}(S, T)')
    ].join('\n')),

    chnav({ href: 'cartes.html', label: 'Cartes de révision' }, { href: 'exercices.html', label: 'Exercices et projet' })
  ].join('\n\n');

  return {
    'chapitres/formules.html': {
      title: 'Mémo des formules de RO — ' + course.brand,
      description: 'Formulaire synthétique de Recherche Opérationnelle B2 : simplexe, dualité, transport MODI, PERT et Ford-Fulkerson.',
      active: 'formules',
      body
    }
  };
}

module.exports = { cartes, formules };
