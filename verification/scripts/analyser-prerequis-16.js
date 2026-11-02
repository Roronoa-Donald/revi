'use strict';

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../..');
const cases = [
  ['b1-admin-windows', 2, 'Repère de cycle de vie', ['2012 R2', '2022']],
  ['b1-projet', 2, 'classes Python', ['Database', 'self']],
  ['b1-projet', 3, 'interface graphique Tkinter', ['Tkinter', 'Treeview']],
  ['b1-merise', 5, 'Lire et comprendre les mots-clés SQL', ['CREATE TABLE', 'REFERENCES']],
  ['b1-architecture', 1, 'modèle d’architecture de Von Neumann', ['Von Neumann', 'bus']],
  ['b1-reseaux', 1, 'Pour aller plus loin — services d’entreprise', ['Active Directory', 'NAS']],
  ['b1-linux', 1, 'structure minimale d’un script Bash', ['shell', 'Bash']],
  ['b1-robotique', 1, 'Du cycle Capteur', ['Arduino', 'loop']],
  ['admin-vm', 4, 'Allocation des Disques Virtuels', ['thin', 'thick']],
  ['admin-vm', 6, 'Continuité de Service', ['migration à chaud', 'vMotion']],
  ['react', 1, 'Rappels JavaScript ES6+', ['import', 'export']],
  ['probabilites', 5, 'calculer une intégrale de densité', ['intégrale', 'primitive']],
  ['docker', 1, 'Vulgarisation illustrée', ['namespaces', 'cgroups']],
  ['rd_winserver', 1, 'syntaxe des cmdlets PowerShell', ['PowerShell', 'Get-Service']],
  ['b3-cryptographie', 4, 'Rappels d’arithmétique modulaire', ['Bézout', 'inverse modulaire']],
  ['b3-pfsense', 5, 'Fondements de la PKI X.509', ['PKI', 'CRL']]
];

function blankMarkup(raw) {
  return raw.replace(/<script\b[^>]*>[\s\S]*?<\/script>|<style\b[^>]*>[\s\S]*?<\/style>|<[^>]*>/gi,
    value => value.replace(/[^\n]/g, ' '));
}

function matchingLines(text, term, offset, original) {
  const result = [];
  const needle = term.toLocaleLowerCase('fr');
  const haystack = text.toLocaleLowerCase('fr');
  let index = -1;
  while ((index = haystack.indexOf(needle, index + 1)) !== -1) {
    const absolute = offset + index;
    const line = original.slice(0, absolute).split('\n').length;
    if (!result.includes(line)) result.push(line);
  }
  return result;
}

function inspect([course, chapter, marker, terms]) {
  const file = `${course}/chapitres/chapitre${chapter}.html`;
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  const start = html.indexOf(marker);
  if (start < 0) throw new Error(`Encadré introuvable : ${file}, ${marker}`);
  const headings = [...html.matchAll(/<h2\b[^>]*>/gi)].map(match => match.index);
  const nextHeading = headings.find(index => index > start);
  if (nextHeading === undefined) throw new Error(`Fin d'encadré introuvable : ${file}`);
  const main = html.indexOf('<main');
  const before = blankMarkup(html.slice(main, start));
  const after = blankMarkup(html.slice(nextHeading));
  const details = terms.map(term => ({
    terme: term,
    lignesAvant: matchingLines(before, term, main, html),
    lignesApres: matchingLines(after, term, nextHeading, html)
  }));
  return { fichier: file, ligneEncadre: html.slice(0, start).split('\n').length, repere: marker, details };
}

process.stdout.write(JSON.stringify({
  methode: 'Occurrences textuelles visibles approchées avant et après la section : deux termes choisis par chapitre ; présence ne signifie ni compréhension ni prérequis indispensable.',
  liste: '16 chapitres explicitement énumérés dans le prompt du tour 3, qui annonce pourtant 15 ; correspondance non documentée avec les 14 encadrés du rapport final.',
  cas: cases.map(inspect)
}, null, 2) + '\n');
