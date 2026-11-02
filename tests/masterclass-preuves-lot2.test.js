'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const first = require('../server/content/masterclass-apprendre/chapitre1');
const fifth = require('../server/content/masterclass-apprendre/chapitre5');
const exercises = require('../server/exercises/masterclass-apprendre');
const { runTests } = require('../server/exercises/runner');
const { runAnalyse } = require('../server/services/execution/local-runner');

const exercise = id => exercises.find(item => item.id === id);

test('F38 : Miller est situé historiquement sans limite universelle', () => {
  const text = first.sections[0].html;
  assert.match(text, /1956[^<]*Miller/i);
  assert.match(text, /(?:varie|dépend)[^.]*tâche/i);
  assert.doesNotMatch(first.summary.join(' '), /limitée à \$7/);
  assert.match(exercise('mc2-c1-e3').brief, /(?:ficti|arbitraire)/i);
  assert.match(exercise('mc2-c1-e3').brief, /ne (?:mesure|démontre)/i);
});

test('F165 : aucune promesse de vitesse ou de perte universelle', () => {
  assert.doesNotMatch(first.situation, /deux fois plus vite|80\s*%/i);
});

test('F164 : le seuil et les scores sont une simulation, pas un diagnostic', () => {
  const item = exercise('mc2-c1-e2');
  assert.match(item.brief, /arbitraire/i);
  assert.match(item.brief, /ne (?:mesure|permet)/i);
  assert.doesNotMatch(JSON.stringify(item), /SURCHARGE cognitive critique|OPTIMAL \(Charge/);
});

test('F163 : Wilson concerne des modèles et non un optimum étudiant universel', () => {
  const text = fifth.sections.find(section => /85/.test(section.title)).html;
  assert.match(text, /classification binaire/i);
  assert.match(text, /hypothèses/i);
  assert.match(text, /pas[^.]*universel/i);
  const item = exercise('mc2-c5-e3');
  assert.match(item.brief, /ficti/i);
  assert.match(item.brief, /ne (?:mesure|permet|constitue)/i);
  assert.doesNotMatch(JSON.stringify(item), /Progression maximale|difficulté est parfait/i);
});

test('les trois grilles et les copies par chapitre restent synchronisées', async () => {
  for (const id of ['mc2-c1-e2', 'mc2-c1-e3', 'mc2-c5-e3']) {
    const item = exercise(id);
    const copy = require(`../server/exercises/masterclass-apprendre/chapitre${item.chapter}`).find(entry => entry.id === id);
    assert.deepEqual(copy, item);
    const report = await runTests(item, item.solution, { execute: async ({ code, stdin }) => {
      const result = await runAnalyse(code, stdin);
      return { ok: result.ok, stdout: result.data.stdout };
    } });
    assert.equal(report.passed, report.total, id);
    const example = await runAnalyse(item.solution, 'cas:exemple');
    assert.equal(example.data.stdout, item.examples[0].expected, id);
  }
});

test('les attendus des trois modèles suivent des calculs indépendants', () => {
  const models = {
    'mc2-c1-e2': input => {
      const [intrinsic, extraneous, useful] = input.split(';').map(Number);
      const sum = intrinsic + extraneous;
      return sum > 7 ? `HORS_SEUIL (Somme: ${sum}, Reste: 0)` :
        `DANS_SEUIL (Somme: ${sum}, Reste: ${Math.min(useful, 7 - sum)})`;
    },
    'mc2-c1-e3': input => {
      const digits = input.split(' ');
      if (digits.length <= 7) return `COURTE (${digits.length} elements): ${digits.join('')}`;
      const groups = [];
      for (let index = 0; index < digits.length; index += 3) groups.push(digits.slice(index, index + 3).join(''));
      return `GROUPEMENT_MODELE (${digits.length} elements -> ${groups.length} groupes): ${groups.join('-')}`;
    },
    'mc2-c5-e3': input => {
      const [successes, total] = input.split(';').map(Number);
      const rate = successes * 100 / total;
      const band = rate > 90 ? 'AU_DESSUS_90' : rate >= 80 ? 'DE_80_A_90' : 'SOUS_80';
      return `Taux: ${rate.toFixed(1)}%\nBANDE: ${band}`;
    }
  };
  for (const [id, calculate] of Object.entries(models)) {
    const item = exercise(id);
    const inputs = [item.examples[0].stdin, ...item.starter.split(/(?=^\[Cas \d+ — )/m).slice(1).map(block =>
      block.split('\n').find(line => line.startsWith('# Données : ')).slice('# Données : '.length))];
    const expected = [item.examples[0].expected, ...item.tests.map(entry => entry.expected)];
    assert.equal(inputs.length, expected.length, id);
    inputs.forEach((input, index) => assert.equal(calculate(input), expected[index], `${id} cas ${index}`));
  }
});
