/**
 * Utilitaires de rendu partagés pour les pages transverses du cours « CCNA Réseau B2 ».
 */
'use strict';

const { ic } = require('../../../../scripts/course-kit');

function chnav(prev, next) {
  const parts = ['  <div class="chnav">'];
  if (prev) {
    parts.push('    <a class="btn" href="' + prev.href + '">' + ic('arrow-left') + ' ' + prev.label + '</a>');
  }
  if (next) {
    parts.push('    <a class="btn btn--primary" href="' + next.href + '">' + next.label + ' ' + ic('arrow-right') + '</a>');
  }
  parts.push('  </div>');
  return parts.join('\n');
}

function disclaimer(extra) {
  const base = 'Objectif de maîtrise 19/20 — votre note réelle dépend aussi de votre travail personnel.';
  return '  <p class="disclaimer">' + (extra ? base + ' ' + extra : base) + '</p>';
}

module.exports = { chnav, disclaimer };
