'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const basics = require('../server/content/b3-cloud-computing/chapitre1');
const regions = require('../server/content/b3-cloud-computing/chapitre2');
const security = require('../server/content/b3-cloud-computing/chapitre5');
const exercises = require('../server/exercises/b3-cloud-computing');

test('F15 : le nombre de zones dépend du fournisseur et de la région', () => {
  const card = regions.flashcards.find(item => /Régions? Cloud.*Zones de Disponibilité/i.test(item.q));
  assert.ok(card);
  assert.match(card.a, /(?:fournisseur|Oracle)/i);
  assert.match(card.a, /(?:région|region)/i);
  assert.match(card.a, /domaine/i);
  assert.doesNotMatch(card.a, /minimum trois/i);
  assert.doesNotMatch(regions.summary.join(' '), /au moins trois Zones/i);
});

test('F63 : la colocation ne promet pas une isolation absolue', () => {
  const card = basics.flashcards.find(item => /multi-tenant/i.test(item.q));
  const question = basics.questions.find(item => /cohabiter plusieurs clients/i.test(item.stem));
  const item = exercises.find(exercise => exercise.id === 'cc3-c1-e3');
  assert.doesNotMatch(card.a + question.stem + question.exp, /(?:absolue|garantissant|toute fuite)/i);
  assert.match(card.a, /(?:risque|vulnérabilit)/i);
  assert.match(item.brief, /hypothèses[\s\S]*ne prouvent/i);
  assert.ok(item.tests.every(entry => /HYPOTHESE_ISOLATION=/.test(entry.expected)));
});

test('F75 : SecNumCloud ne certifie ni immunité absolue ni verdict légal', () => {
  const card = security.flashcards.find(item => /atouts clés.*SecNumCloud/i.test(item.q));
  const item = exercises.find(exercise => exercise.id === 'cc3-c5-e3');
  assert.match(card.a, /aucune immunité (?:juridique )?absolue/i);
  assert.doesNotMatch(card.a, /niveau militaire/i);
  assert.match(card.a, /(?:limite|risque)/i);
  assert.doesNotMatch(item.brief + item.hints.join(' '), /immunité totale|RGPD=CONFORME|STATUT=ILLEGAL/i);
  assert.match(item.brief, /(?:ne vérifie|NON_EVALUEE)/i);
  assert.ok(item.tests.every(entry => /NON_EVALUEE/.test(entry.expected)));
});

test('F201 : le dimensionnement sépare les concurrences moyenne et de pointe', () => {
  const item = exercises.find(exercise => exercise.id === 'cc3-c3-e3');
  assert.match(item.brief, /durée/i);
  assert.match(item.brief, /moyenne/i);
  assert.match(item.brief, /pic/i);
  assert.match(item.brief, /base/i);
  assert.doesNotMatch(item.brief, /tps\s*\\times\s*ram\\_mb/i);
  assert.ok(item.tests.some(entry => /CONC_MOY=250/.test(entry.expected)));
  assert.ok(item.tests.some(entry => /INDETERMINE/i.test(entry.expected)));
});

test('F201 : les résultats sont recalculés indépendamment pour chaque cas', () => {
  const item = exercises.find(exercise => exercise.id === 'cc3-c3-e3');
  const blocks = item.starter.split(/(?=^\[Cas \d+ — )/m).slice(1);
  assert.equal(blocks.length, item.tests.length);
  const inputs = [item.examples[0].stdin, ...blocks];
  const expectedOutputs = [item.examples[0].expected, ...item.tests.map(entry => entry.expected)];
  for (const [index, block] of inputs.entries()) {
    const values = Object.fromEntries([...block.matchAll(/([a-z_]+)=(\d+)/g)].map(match => [match[1], Number(match[2])]));
    const availableMemory = values.ram_max_gb * 1024 * values.cible_pct - values.base_mb * 100;
    let expected;
    if (availableMemory <= 0) {
      expected = 'SIZING: BASE_NON_ADMISSIBLE';
    } else if (!Object.hasOwn(values, 'duree_ms') || !Object.hasOwn(values, 'pic_concurrent')) {
      expected = 'SIZING: CONCURRENCE=INDETERMINEE | RAM=INDETERMINEE | INSTANCES=INDETERMINEES';
    } else {
      const average = values.tps_moy * values.duree_ms / 1000;
      const cpu = Math.ceil(values.tps_pic * values.cpu_ms * 100 / (values.cpu_max_ms * values.cible_pct));
      const ramAverage = Math.ceil(average * values.ram_mb * 100 / availableMemory);
      const ramPeak = Math.ceil(values.pic_concurrent * values.ram_mb * 100 / availableMemory);
      const iops = Math.ceil(values.tps_pic * values.iops_tx * 100 / (values.iops_max * values.cible_pct));
      const count = Math.max(cpu, ramPeak, iops);
      const limit = count === cpu ? 'CPU' : count === ramPeak ? 'RAM' : 'IOPS';
      expected = `SIZING: CONC_MOY=${average.toFixed(2)} | CONC_PIC=${values.pic_concurrent} | CPU=${cpu} | RAM_MOY=${ramAverage} | RAM_PIC=${ramPeak} | IOPS=${iops} | INSTANCES_PIC=${count} | LIMITANT=${limit}`;
    }
    assert.equal(expectedOutputs[index], expected, `cas ${index}`);
    assert.ok(item.solution.includes(expected));
  }
});

test('F63/F75/F201 : corrigés acceptés et deux variantes refusées par le moteur', async () => {
  const { runTests } = require('../server/exercises/runner');
  const { execute } = require('../server/services/execution');
  for (const id of ['cc3-c1-e3', 'cc3-c3-e3', 'cc3-c5-e3']) {
    const item = exercises.find(exercise => exercise.id === id);
    const accepted = await runTests(item, item.solution, { execute });
    assert.equal(accepted.passed, item.tests.length, id);
    for (const index of [0, 1]) {
      const variant = item.tests.map((entry, caseIndex) => `[Cas ${caseIndex + 1}]\n${caseIndex === index ? 'REPONSE_INCORRECTE' : entry.expected}`).join('\n\n');
      const rejected = await runTests(item, variant, { execute });
      assert.equal(rejected.stop.reason, 'wrong_output', id);
      assert.equal(rejected.stop.testIndex, index, id);
    }
  }
});
