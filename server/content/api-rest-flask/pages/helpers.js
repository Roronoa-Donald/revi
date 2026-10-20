/**
 * Petits utilitaires partagés par les pages transverses du cours « API REST avec Flask » B2.
 */
'use strict';

const { ic } = require('../../../../scripts/course-kit');

/** Barre de navigation pied de page (précédent / suivant). */
function chnav(back, forward) {
  const links = ['  <div class="chnav">'];
  if (back) links.push('    <a class="btn" href="' + back.href + '">' + ic('arrow-left') + ' ' + back.label + '</a>');
  if (forward) links.push('    <a class="btn btn--primary" href="' + forward.href + '">' + forward.label + ' ' + ic('arrow-right') + '</a>');
  links.push('  </div>');
  return links.join('\n');
}

/** Mention de bas de page partagée. */
function disclaimer(course, extra) {
  return '  <p class="disclaimer">Objectif de maîtrise 19/20 — ta note réelle dépend aussi de ton travail.\n  ' +
    (extra || '') + 'Sources : ' + course.sources + '.</p>';
}

module.exports = { chnav, disclaimer };
