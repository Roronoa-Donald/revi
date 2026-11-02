'use strict';

const fs = require('fs');
const catalogue = require('/project/server/exercises');

const file = '/project/audit/tour5/k13-matrice-ch1.csv';
const rows = fs.readFileSync(file, 'utf8').split(/\r?\n/).slice(1).filter(Boolean);
const quote = value => '"' + String(value).replace(/"/g, '""') + '"';
const headers = ['cours', 'exercice', 'langage', 'notions_signalees_historique', 'notions_dans_corrige', 'mentions_avant_lab', 'mentions_dans_starter', 'corrige_entrees_encodees', 'statut_et_limites'];

function contains(text, term) {
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s+').replace(/\\\(/g, '\\s*\\(');
  const end = /[A-Za-z0-9_]$/.test(term) ? '(?![A-Za-z0-9_])' : '';
  return new RegExp(`(?:^|[^A-Za-z0-9_])${escaped}${end}`, 'i').test(text);
}

const result = [headers.map(quote).join(';')];
for (const row of rows) {
  const match = row.match(/^([^,]+),([^,]+),([^,]+),"?(.+?)"?$/);
  if (!match) throw new Error('Ligne historique non analysable.');
  const [, course, id, language, reported] = match;
  const exercise = catalogue.getExercise(id);
  if (!exercise || exercise.course !== course) throw new Error(`Exercice introuvable : ${id}`);
  const terms = reported.split(/,\s*/);
  const page = fs.readFileSync(`/project/${course}/chapitres/chapitre1.html`, 'utf8');
  const lab = page.search(/<div\s+class="lab"[^>]*\bdata-lab\b/i);
  if (lab < 0) throw new Error(`Premier lab introuvable : ${course}`);
  const theory = page.slice(0, lab).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]*>/g, ' ');
  const encoded = /in_b64=/.test(exercise.solution) && /base64\s*(?:-d|--decode)/.test(exercise.solution);
  const status = encoded
    ? 'Artefact possible : case/sed/printf viennent du corrigé mémorisé, pas nécessairement des compétences imposées à l’élève ; énoncé à relire.'
    : 'Présence de mots seulement : vérifier l’enseignement effectif, les prérequis annoncés et les solutions alternatives.';
  const cells = [course, id, language, terms.join(', '), terms.filter(term => contains(exercise.solution, term)).join(', ') || 'aucune', terms.filter(term => contains(theory, term)).join(', ') || 'aucune', terms.filter(term => contains(exercise.starter, term)).join(', ') || 'aucune', encoded ? 'oui' : 'non', status];
  result.push(cells.map(quote).join(';'));
}
process.stdout.write(result.join('\n') + '\n');
