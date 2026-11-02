'use strict';

const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const root = path.resolve(__dirname, '../..');
const resultDirectory = path.join(root, 'corrections/resultats');
const seed = '20261030';
const logs = fs.readdirSync(resultDirectory)
  .filter(name => /lot2/i.test(name) && /(?:g[eé]n[eé]ration|regen)/i.test(name) && name.endsWith('.txt') && !name.endsWith('.exit.txt'))
  .sort();
const pages = new Set();
for (const filename of logs) {
  const lines = fs.readFileSync(path.join(resultDirectory, filename), 'utf8').split('\n');
  for (const line of lines) {
    const match = line.match(/^\s{4,}(.+\.html)\s*$/);
    if (match && fs.existsSync(path.join(root, match[1]))) pages.add(match[1]);
  }
}
const rank = filename => crypto.createHash('sha256').update(`${seed}:${filename}`).digest('hex');
const population = [...pages].sort((left, right) => rank(left).localeCompare(rank(right)));
const selected = population.slice(0, Math.ceil(population.length * 0.05));
console.log(JSON.stringify({
  seed,
  methode: 'SHA-256 de graine:chemin, ordre croissant ; 5 % arrondis au supérieur',
  population: population.length,
  limites: 'Pages explicitement nommées dans les journaux de génération du lot 2 ; les pages modifiées à la main ou sans journal de génération peuvent manquer.',
  journaux: logs,
  pages: selected.map(filename => ({
    fichier: filename,
    rang_sha256: rank(filename),
    contenu_sha256: crypto.createHash('sha256').update(fs.readFileSync(path.join(root, filename))).digest('hex')
  }))
}, null, 2));
