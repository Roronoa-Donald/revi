'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const parse5 = require('parse5');
const chapter = require('../server/content/b3-virtualisation/chapitre5');
const { getExercise } = require('../server/exercises');
const { runTests } = require('../server/exercises/runner');
const { runAnalyse } = require('../server/services/execution/local-runner');

const descendants = node => [node, ...(node.childNodes || []).flatMap(descendants)];
const plain = html => descendants(parse5.parseFragment(html)).filter(node => node.nodeName === '#text').map(node => node.value).join(' ').replace(/\s+/g, ' ');
const execute = async ({ code, stdin }) => {
  const result = await runAnalyse(code, stdin);
  return { ok: result.ok, stdout: result.data.stdout };
};

function model(line) {
  const fields = Object.fromEntries(line.split(/\s+/).map(pair => pair.split('=')));
  const throughput = Number(fields.NET_GBPS) * 1000 * 0.8 / 8;
  const rate = Number(fields.DIRTY_RATE_MBPS);
  if (rate >= throughput) {
    return `VM:${fields.VM} | NET:${fields.NET_GBPS}Gbps | TRANSFERRED:0.0MB | DURATION:0.0s | STATUT:CONVERGENCE_FAILURE`;
  }
  const initial = Number(fields.RAM_GB) * 1000;
  const total = initial + initial / throughput * rate;
  const duration = total / throughput;
  const category = duration <= 30 ? 'RAPIDE' : duration <= 90 ? 'ACCEPTABLE' : 'LENT';
  return `VM:${fields.VM} | NET:${fields.NET_GBPS}Gbps | TRANSFERRED:${total.toFixed(1)}MB | DURATION:${duration.toFixed(1)}s | STATUT:${category}`;
}

test('F221 : le cours, son résumé et son glossaire ne garantissent ni zéro pause ni durée fixe', () => {
  const section = chapter.sections.find(entry => /Mobilité à Chaud vMotion/i.test(entry.title));
  const notion = chapter.notions.find(entry => entry.term === 'vMotion');
  assert.ok(section && notion);
  const text = [chapter.toc, chapter.situation, ...chapter.objectives, plain(section.html),
    ...chapter.summary, notion.def, ...chapter.mastery].join(' ');
  assert.doesNotMatch(text, /sans aucune seconde|sans coupure de service|sans rupture de service|bascule imperceptible|bascule sub.seconde|moins d.une demi.seconde|&lt; 0\.5s/i);
  assert.match(text, /pause[^.]{0,100}(?:possible|varie|dépend)/i);
  assert.match(plain(section.html), /(?:modèle|simplifié)/i);
  const page = fs.readFileSync(path.join(__dirname, '../b3-virtualisation/chapitres/chapitre5.html'), 'utf8');
  const visible = plain(page);
  assert.doesNotMatch(visible, /sans aucune seconde|sans coupure de service|sans rupture de service|bascule imperceptible|moins d.une demi.seconde/i);
});

test('F221 : la grille distingue modèle à deux passes et durée réelle, avec conversions décimales', async () => {
  const item = getExercise('vrt3-c5-e1');
  const copy = require('../server/exercises/b3-virtualisation/b3-virtualisation').find(entry => entry.id === item.id);
  assert.deepEqual({ ...copy, course: item.course }, item);
  const brief = plain(item.brief);
  assert.match(brief, /hypothèse[^.]{0,100}80\s*%/i);
  assert.match(brief, /(?:deux premières passes|deux passes)/i);
  assert.match(brief, /(?:ne représente pas|ne prédit pas)[^.]{0,100}durée (?:totale|réelle)/i);
  assert.match(item.brief, /NET_GBPS \* 1000 \* 0\.8/);
  assert.match(item.brief, /RAM_GB \* 1000/);
  const cases = item.starter.split(/\[Cas \d+ —[^\]]+\]/).slice(1);
  const reconstructed = cases.map(block => block.split('\n')
    .filter(line => line.startsWith('# Données : VM='))
    .map(line => model(line.slice('# Données : '.length))).join('\n'));
  assert.deepEqual(item.tests.map(entry => entry.expected.trim()), reconstructed);
  assert.equal(item.examples[0].expected.trim(), item.examples[0].stdin.split('\n').map(model).join('\n'));
  const report = await runTests(item, item.solution, { execute });
  assert.equal(report.passed, item.tests.length);
  for (const [before, after] of [['17280.0MB', '17664.0MB'], ['48480.0MB', '49632.0MB']]) {
    const mutant = item.solution.replace(before, after);
    assert.notEqual(mutant, item.solution);
    const result = await runTests(item, mutant, { execute });
    assert.ok(result.passed < result.total);
  }
});
