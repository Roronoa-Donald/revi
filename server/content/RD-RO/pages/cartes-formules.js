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

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Mémo' }]),
    '  <h1>Mémo synthétique de Recherche Opérationnelle</h1>',
    '  <p class="lead">Toutes les formes matricielles, formules d’intersection, règles de pivotage, théorèmes de dualité, ' +
    'équations de transport et lois d’ordonnancement réunies sur une seule page de référence.</p>',

    bloc('1. Forme Canonique &amp; Forme Standard', [
      '<pre><code>// Forme Canonique (Primal MAX)\n' +
      'MAX Z = c1*x1 + c2*x2 + ... + cn*xn\n' +
      'sous :\n' +
      '  a_i1*x1 + a_i2*x2 + ... + a_in*xn &le; b_i  (i = 1..m)\n' +
      '  x_j &ge; 0  (j = 1..n)\n\n' +
      '// Forme Standard\n' +
      '- Contrainte &le; : ajouter variable d’écart s_i &ge; 0 &rarr; &sum; a_ij*x_j + s_i = b_i\n' +
      '- Contrainte &ge; : soustraire variable d’excès e_k &ge; 0 &rarr; &sum; a_kj*x_j - e_k = b_k\n' +
      '- Contrainte =  : contrainte stricte maintenue &rarr; &sum; a_lj*x_j = b_l</code></pre>'
    ].join('\n')),

    bloc('2. Géométrie &amp; Règle de Cramer (2 variables)', [
      '<pre><code>// Intersection de deux droites frontières actives\n' +
      'L1 : a1 * x1 + b1 * x2 = c1\n' +
      'L2 : a2 * x1 + b2 * x2 = c2\n\n' +
      'Déterminant principal : &Delta; = a1 * b2 - a2 * b1\n' +
      'Si &Delta; &ne; 0 :\n' +
      '  x1 = (c1 * b2 - c2 * b1) / &Delta;\n' +
      '  x2 = (a1 * c2 - a2 * c1) / &Delta;\n' +
      'Si &Delta; = 0 : droites parallèles ou confondues.</code></pre>'
    ].join('\n')),

    bloc('3. Algorithme du Simplexe (Tableau de Dantzig)', [
      '<pre><code>// 1. Critère de Dantzig (Variable entrante)\n' +
      'k = argmax { &Delta;j | &Delta;j &gt; 0 }  (coût réduit le plus strictement positif)\n' +
      'Arrêt optimal : ssi tous les &Delta;j &le; 0.\n\n' +
      '// 2. Règle du ratio minimum (Variable sortante)\n' +
      '&theta; = min { b_i / a_ik | a_ik &gt; 0 }\n' +
      'La ligne r correspondant à &theta; sort de la base.\n' +
      'Arrêt non borné : ssi tous les a_ik &le; 0 dans la colonne pivot.\n\n' +
      '// 3. Opération de pivot de Gauss-Jordan (sur pivot p = A[r][k])\n' +
      'Ligne pivot : Lr &larr; Lr / p\n' +
      'Autres lignes : Li &larr; Li - A[i][k] * Lr</code></pre>'
    ].join('\n')),

    bloc('4. Théorie de la Dualité &amp; Prix d’Ombre', [
      '<pre><code>// Transposition Primal / Dual\n' +
      'PRIMAL (MAX)                 DUAL (MIN)\n' +
      'MAX Z = c^T * x      &harr;      MIN W = b^T * y\n' +
      'sous A * x &le; b              sous A^T * y &ge; c\n' +
      'avec x &ge; 0                   avec y &ge; 0\n\n' +
      '// Théorèmes fondamentaux\n' +
      '1. Théorème faible : Z(x) &le; W(y) pour tous x et y réalisables.\n' +
      '2. Théorème fort   : à l’optimum, Z(x*) = W(y*) (gap nul).\n' +
      '3. Écarts complémentaires : y_i* * s_i* = 0  et  x_j* * e_j* = 0\n\n' +
      '// Prix d’ombre (Shadow price)\n' +
      'y_i* = &part;Z* / &part;b_i (gain marginal apporté par une unité de ressource i).</code></pre>'
    ].join('\n')),

    bloc('5. Problème de Transport &amp; Méthode MODI', [
      '<pre><code>// Matrice équilibrée\n' +
      '&sum;_{i=1}^m O_i = &sum;_{j=1}^n D_j  (sinon : ajouter une entité fictive à coût nul)\n\n' +
      '// Potentiels de lignes (u_i) et de colonnes (v_j)\n' +
      'Pour chaque cellule de base (occupée) : u_i + v_j = c_ij  (poser u_1 = 0)\n\n' +
      '// Évaluation des cellules vides\n' +
      '&Delta;_ij = c_ij - (u_i + v_j)\n' +
      '- Solution optimale ssi tous les &Delta;_ij &ge; 0.\n' +
      '- Si min &Delta;_ij &lt; 0 : cycle du marchepied (stepping-stone) avec transfert &theta;.</code></pre>'
    ].join('\n')),

    bloc('6. Ordonnancement PERT / CPM &amp; Ford-Fulkerson', [
      '<pre><code>// PERT / MPM (Calcul aller-retour)\n' +
      'Forward pass  : ES(j) = max_{p &isin; Pred(j)} (ES(p) + d_p),   EF(j) = ES(j) + d_j\n' +
      'Durée projet  : max EF(t)\n' +
      'Backward pass : LF(i) = min_{s &isin; Succ(i)} LS(s),           LS(i) = LF(i) - d_i\n' +
      'Marge Totale  : MT(i) = LF(i) - ES(i) - d_i = LS(i) - ES(i)\n' +
      'Marge Libre   : ML(i) = min_{s} ES(s) - ES(i) - d_i\n' +
      'Chemin critique : ensemble des tâches de marge totale nulle (MT = 0).\n\n' +
      '// Flots de Ford-Fulkerson\n' +
      'Capacité résiduelle : r(u, v) = c(u, v) - f(u, v)\n' +
      'Goulot d’étranglement d’une chaîne augmentante : &Delta; = min r(u, v)\n' +
      'Théorème Max-Flow Min-Cut : Valeur maximale du Flot = Capacité de la Coupe minimale.</code></pre>'
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
