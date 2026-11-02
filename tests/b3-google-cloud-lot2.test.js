'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const chapter1 = require('../server/content/b3-google-cloud/chapitre1');
const chapter5 = require('../server/content/b3-google-cloud/chapitre5');
const exercises = require('../server/exercises/b3-google-cloud');
const exerciseRegistry = require('../server/exercises');
const { runTests, MAX_TESTS } = require('../server/exercises/runner');
const { runAnalyse } = require('../server/services/execution/local-runner');
const { renderSection } = require('../scripts/generate-code-labs');

function exercise(id) {
  const result = exercises.find(item => item.id === id);
  assert.ok(result, `Exercice absent : ${id}`);
  return result;
}

function chapterText(chapter) {
  return JSON.stringify(chapter);
}

async function executeAnalysis({ code, stdin }) {
  const result = await runAnalyse(code, stdin);
  return { ok: result.ok, status: 'success', stdout: result.data.stdout, stderr: result.data.stderr };
}

function scenarioInputs(item, caseNumber) {
  const section = item.starter.match(new RegExp(`\\[Cas ${caseNumber} — [^\\]]+\\]\\n([\\s\\S]*?)(?=\\n\\n\\[Cas \\d+ — |$)`));
  assert.ok(section, `${item.id} : cas ${caseNumber} absent de la grille`);
  return section[1].split('\n')
    .filter(line => line.startsWith('# Données : '))
    .map(line => line.slice('# Données : '.length));
}

function scenarios(item) {
  return [
    { label: 'exemple', inputs: item.examples[0].stdin.split('\n'), expected: item.examples[0].expected },
    ...item.tests.map((entry, index) => ({ label: entry.label, inputs: scenarioInputs(item, index + 1), expected: entry.expected }))
  ];
}

function parseInput(input) {
  const [operation, ...parts] = input.split(' ');
  const fields = Object.fromEntries(parts.filter(part => part.includes('=')).map(part => {
    const separator = part.indexOf('=');
    return [part.slice(0, separator), part.slice(separator + 1)];
  }));
  return { operation, fields };
}

test('F155 : héritage allow, refus applicable et limites de la grille IAM', () => {
  const question = chapter1.questions.find(item => /Viewer.*dossier/i.test(item.stem));
  assert.ok(question);
  assert.match(question.opts[question.correct], /deny/i);
  assert.match(question.exp, /permissions? prises? en charge/i);
  assert.match(question.exp, /exception/i);
  assert.doesNotMatch(chapterText(chapter1), /héritage IAM est irréversible|sans exception/i);
  const card = chapter1.flashcards.find(item => /héritage des autorisations IAM/i.test(item.q));
  assert.match(card.a, /deny/i);
  const iam = exercise('gcp3-c2-e1');
  assert.match(iam.brief, /accès effectif/i);
  assert.match(iam.brief, /deny/i);
  assert.doesNotMatch(JSON.stringify(iam), /ACCESS: (GRANTED|DENIED)/);
  assert.match(iam.examples[0].expected, /LIAISON: PRESENT/);
  assert.match(iam.tests[0].expected, /LIAISON: ABSENTE/);
});

test('F156 : une répartition ne démontre pas la résilience', () => {
  const placement = exercise('gcp3-c1-e2');
  assert.match(placement.brief, /capacité/i);
  assert.match(placement.brief, /quota/i);
  assert.match(placement.brief, /basculement/i);
  assert.match(placement.starter, /instance_count=1/);
  assert.match(placement.starter, /instance_count=0/);
  assert.ok(placement.tests.some(item => /status=SINGLE_ZONE_NO_REDUNDANCY/.test(item.expected)));
  assert.ok(placement.tests.some(item => /status=MULTI_ZONE_NO_GUARANTEE/.test(item.expected)));
  assert.ok(placement.tests.some(item => /status=INVALID_INSTANCE_COUNT/.test(item.expected)));
  assert.doesNotMatch(JSON.stringify(placement), /HA_RESILIENT/);
});

test('F157 : la relivraison Pub/Sub est conditionnelle, sans changement de client garanti', () => {
  const question = chapter5.questions.find(item => /Pub\/Sub/.test(item.stem));
  assert.ok(question);
  assert.match(question.opts[question.correct], /même.*autre/i);
  assert.match(question.exp, /retry/i);
  assert.match(question.exp, /prolong/i);
  const messaging = exercise('gcp3-c5-e3');
  assert.match(messaging.brief, /prolong/i);
  assert.match(messaging.brief, /même.*autre/i);
  assert.match(messaging.examples[0].expected, /REDELIVERY_POSSIBLE/);
  assert.ok(messaging.tests.some(item => /WAITING_FOR_ACK/.test(item.expected)));
  assert.ok(messaging.tests.some(item => /DEADLINE_EXPIRED/.test(item.expected)));
  assert.doesNotMatch(JSON.stringify(messaging), /REDELIVERED_TO_CONSUMER|REMOVED_FROM_QUEUE/);
});

test('F166 : Rapid est zonal, conditionné et exclu des transitions de classe', () => {
  const text = chapterText(chapter5);
  assert.match(text, /Rapid/);
  assert.match(text, /30 octobre 2026/i);
  assert.match(text, /zone/i);
  assert.match(text, /espace de noms hiérarchique/i);
  assert.match(text, /accès uniforme/i);
  assert.match(text, /quota/i);
  assert.match(text, /SetStorageClass/i);
  const lifecycle = exercise('gcp3-c5-e1');
  assert.match(lifecycle.brief, /Rapid/);
  assert.match(lifecycle.brief, /quatre classes/i);
  assert.match(lifecycle.brief, /SetStorageClass/i);
});

test('F167 : le SLA Spanner distingue multi-région, régions et Stockholm', () => {
  const text = chapterText(chapter5);
  assert.match(text, /99\.999\s*%/);
  assert.match(text, /99\.99\s*%/);
  assert.match(text, /Stockholm.*99\.95\s*%|99\.95\s*%.*Stockholm/i);
  assert.match(text, /multi[- ]?région/i);
  assert.match(text, /mensuel/i);
  assert.match(text, /exclusion/i);
  const selection = exercise('gcp3-c5-e2');
  assert.match(selection.examples[0].stdin, /config=MULTI_REGION/);
  assert.match(selection.examples[0].expected, /slo_mensuel=99\.999%/);
  assert.ok(selection.tests.some(item => /slo_mensuel=NON_DETERMINE/.test(item.expected)));
});

test('F200 : Cloud SQL distingue éditions HA, exclusions et période de calcul', () => {
  const text = chapterText(chapter5);
  assert.match(text, /Enterprise Plus/);
  assert.match(text, /Enterprise.*99\.95\s*%/);
  assert.match(text, /Enterprise Plus.*99\.99\s*%/);
  assert.match(text, /cœurs partagés/i);
  assert.match(text, /mois calendaire/i);
  assert.match(text, /maintenance/i);
  assert.match(text, /quota/i);
  const selection = exercise('gcp3-c5-e2');
  assert.match(selection.starter, /edition=ENTERPRISE.*availability=HA/);
  assert.ok(selection.tests.some(item => /slo_mensuel=99\.95%/.test(item.expected)));
  assert.ok(selection.tests.some(item => /slo_mensuel=99\.99%/.test(item.expected)));
  assert.ok(selection.tests.some(item => /slo_mensuel=NON_DETERMINE/.test(item.expected)));
});

test('les catalogues par chapitre restent identiques au catalogue actif', () => {
  for (const chapter of [1, 2, 5]) {
    const copy = require(`../server/exercises/b3-google-cloud/chapitre${chapter}`);
    assert.deepEqual(copy, exercises.filter(item => item.chapter === chapter));
  }
});

test('les corrigés des grilles ciblées passent le véritable sélecteur de cas', async () => {
  for (const id of ['gcp3-c1-e2', 'gcp3-c2-e1', 'gcp3-c5-e1', 'gcp3-c5-e2', 'gcp3-c5-e3']) {
    const item = exercise(id);
    const report = await runTests(item, item.solution, { execute: executeAnalysis });
    assert.equal(report.passed, report.total, `${id} : ${JSON.stringify(report.stop)}`);
    assert.equal(report.total, item.tests.length, `${id} : des cas ne sont pas exécutés`);
    const example = await runAnalyse(item.solution, item.examples[0].stdin);
    assert.equal(example.data.stdout, item.examples[0].expected, `${id} : exemple désynchronisé`);
    const client = exerciseRegistry.toClient(item);
    assert.equal(client.solution, undefined);
    assert.equal(client.tests, undefined);
    assert.ok(!renderSection('b3-google-cloud', item.chapter).includes(item.solution));
  }
});

test('chaque grille a des cas distincts, tous exécutables et sans corrigé côté client', () => {
  for (const id of ['gcp3-c1-e2', 'gcp3-c2-e1', 'gcp3-c5-e1', 'gcp3-c5-e2', 'gcp3-c5-e3']) {
    const item = exercise(id);
    assert.ok(item.tests.length <= MAX_TESTS, `${id} : plafond de correction dépassé`);
    assert.equal(new Set(item.tests.map(entry => entry.stdin)).size, item.tests.length, `${id} : cas répétés`);
    assert.equal((item.starter.match(/A_COMPLETER/g) || []).length, item.tests.length, `${id} : grille incomplète`);
    const visible = exerciseRegistry.toClient(item);
    const visibleText = [visible.brief, visible.starter, ...visible.examples.map(entry => entry.expected)].join('\n');
    const rendered = renderSection('b3-google-cloud', item.chapter).replaceAll('&#10;', '\n');
    for (const entry of item.tests) {
      assert.ok(!visibleText.includes(entry.expected), `${id} : réponse de ${entry.label} visible`);
      assert.ok(!rendered.includes(entry.expected), `${id} : réponse de ${entry.label} rendue dans le HTML`);
    }
  }
});

test('F155 : les sorties constatent les liaisons locales sans décider un accès effectif', () => {
  const item = exercise('gcp3-c2-e1');
  const basicRoles = new Set(['roles/viewer', 'roles/editor', 'roles/owner']);
  for (const scenario of scenarios(item)) {
    const bindings = [];
    const expected = [];
    for (const input of scenario.inputs) {
      const { operation, fields } = parseInput(input);
      if (operation === 'BIND') {
        bindings.push(fields);
        const type = basicRoles.has(fields.role) ? 'BASIC_CAUTION_PROD' : 'PREDEFINED';
        expected.push(`BIND_OK: role=${fields.role} member=${fields.member} type=${type}`);
      } else if (operation === 'CHECK_ROLE') {
        const found = bindings.some(binding => binding.member === fields.member && binding.role === fields.role);
        expected.push(`LIAISON: ${found ? 'PRESENT' : 'ABSENTE'} member=${fields.member} role=${fields.role}`);
      } else if (operation === 'AUDIT_PRIMITIVE_ROLES') {
        const basic = bindings.filter(binding => basicRoles.has(binding.role));
        expected.push(basic.length
          ? `AUDIT: WARNING basic_count=${basic.length} members=${basic.map(binding => binding.member).sort().join(',')}`
          : 'AUDIT: OK (zero basic roles in use)');
      } else {
        assert.equal(operation, 'CONTEXTE');
      }
    }
    assert.equal(scenario.expected, expected.join('\n'), scenario.label);
  }
  assert.doesNotMatch(JSON.stringify(item), /PRIMITIVE_DEPRECATED|ACCESS: (?:GRANTED|DENIED)/);
  assert.doesNotMatch(require('../server/content/b3-google-cloud/chapitre2').toc, /rôles primitifs dépréciés/i);
});

test('F156 : un oracle local recalcule allocations et nombre de zones occupées', () => {
  const item = exercise('gcp3-c1-e2');
  const regions = {
    'europe-west1': ['a', 'b', 'c'],
    'europe-west9': ['a', 'b', 'c'],
    'us-central1': ['a', 'b', 'c', 'f']
  };
  for (const scenario of scenarios(item)) {
    const expected = scenario.inputs.map(input => {
      const { operation, fields } = parseInput(input);
      if (operation === 'REGION_INFO') {
        return fields.region === 'europe-west9'
          ? 'REGION: name=europe-west9 location=Paris zones_count=3 low_carbon=YES'
          : `REGION: name=${fields.region} status=UNKNOWN`;
      }
      assert.equal(operation, 'MULTI_ZONE_DEPLOY');
      const count = Number(fields.instance_count);
      if (count < 1) return `DEPLOY: region=${fields.region} total=${count} status=INVALID_INSTANCE_COUNT`;
      const zoneNames = regions[fields.region];
      assert.ok(zoneNames, `Région non prévue : ${fields.region}`);
      const allocation = zoneNames.map((zone, index) => ({
        zone: `${fields.region}-${zone}`,
        count: Math.floor(count / zoneNames.length) + (index < count % zoneNames.length ? 1 : 0)
      }));
      const status = allocation.filter(entry => entry.count > 0).length === 1
        ? 'SINGLE_ZONE_NO_REDUNDANCY'
        : 'MULTI_ZONE_NO_GUARANTEE';
      return `DEPLOY: region=${fields.region} total=${count} allocation=${allocation.map(entry => `${entry.zone}:${entry.count}`).join(',')} status=${status}`;
    });
    assert.equal(scenario.expected, expected.join('\n'), scenario.label);
  }
});

test('F166 : Rapid et les seuils de cycle de vie sont évalués séparément', () => {
  const item = exercise('gcp3-c5-e1');
  for (const scenario of scenarios(item)) {
    const expected = scenario.inputs.map(input => {
      const { operation, fields } = parseInput(input);
      assert.equal(operation, 'LIFECYCLE_EVAL');
      const rapid = fields.bucket_type === 'RAPID' || fields.current_class === 'RAPID' || fields.target_class === 'RAPID';
      const met = Number(fields.age_days) >= Number(fields.min_age);
      const action = rapid || !met ? 'NONE' : 'TRANSITION_ELIGIBLE';
      const status = rapid ? 'UNSUPPORTED_SET_STORAGE_CLASS' : met ? 'CONDITION_MET' : 'CONDITION_NOT_MET';
      return `LIFECYCLE: current=${fields.current_class} target=${fields.target_class} age=${fields.age_days} action=${action} status=${status}`;
    });
    assert.equal(scenario.expected, expected.join('\n'), scenario.label);
  }
});

test('F167/F200 : les objectifs suivent configuration, région et couverture', () => {
  const item = exercise('gcp3-c5-e2');
  for (const scenario of scenarios(item)) {
    const outputs = scenario.expected.split('\n');
    assert.equal(outputs.length, scenario.inputs.length, scenario.label);
    scenario.inputs.forEach((input, index) => {
      const { operation, fields } = parseInput(input);
      assert.equal(operation, 'SELECT_DB');
      if (fields.model !== 'RELATIONAL') return;
      let target = 'NON_DETERMINE';
      if (fields.choice === 'SQL' && fields.eligible === 'YES' && fields.availability === 'HA' && fields.instance === 'DEDICATED') {
        if (fields.edition === 'ENTERPRISE') target = '99.95%';
        if (fields.edition === 'ENTERPRISE_PLUS') target = '99.99%';
      }
      if (fields.choice === 'SPANNER' && fields.eligible === 'YES') {
        if (['MULTI_REGION', 'DUAL_REGION'].includes(fields.config)) target = '99.999%';
        if (fields.config === 'REGIONAL' && fields.region === 'PARIS') target = '99.99%';
        if (fields.config === 'REGIONAL' && fields.region === 'STOCKHOLM') target = '99.95%';
      }
      const actual = outputs[index].match(/slo_mensuel=(\S+)/);
      assert.ok(actual, scenario.label);
      assert.equal(actual[1], target, `${scenario.label} : ${input}`);
    });
  }
});

test('F157 : acquittement, prolongation, expiration et NACK ont des résultats distincts', () => {
  const item = exercise('gcp3-c5-e3');
  for (const scenario of scenarios(item)) {
    const subscriptions = new Set();
    const expected = scenario.inputs.map(input => {
      const { operation, fields } = parseInput(input);
      if (operation === 'CREATE_SUB') {
        subscriptions.add(fields.sub);
        return `SUB_READY: name=${fields.sub} ack_deadline=${fields.ack_deadline}s`;
      }
      assert.equal(operation, 'DELIVER_MSG');
      if (!subscriptions.has(fields.sub)) return `DELIVERY: sub=${fields.sub} status=ERROR_SUBSCRIPTION_NOT_FOUND`;
      let status = 'WAITING_FOR_ACK';
      let action = 'NONE';
      if (fields.ack === 'YES') status = 'ACKNOWLEDGED';
      if (fields.ack === 'NACK') {
        status = 'NACKED';
        action = 'REDELIVERY_POSSIBLE';
      } else if (fields.ack === 'NO' && Number(fields.elapsed_time) >= Number(fields.effective_deadline)) {
        status = 'DEADLINE_EXPIRED';
        action = 'REDELIVERY_POSSIBLE';
      }
      return `DELIVERY: sub=${fields.sub} msg_id=${fields.msg_id} status=${status} action=${action}`;
    });
    assert.equal(scenario.expected, expected.join('\n'), scenario.label);
  }
});

test('les décisions trop affirmatives et les SLA erronés sont rejetés', async () => {
  for (const [id, correct, incorrect] of [
    ['gcp3-c2-e1', 'LIAISON: ABSENTE', 'ACCESS: DENIED'],
    ['gcp3-c5-e1', 'TRANSITION_ELIGIBLE', 'TRANSITION_APPLIED'],
    ['gcp3-c5-e1', 'UNSUPPORTED_SET_STORAGE_CLASS', 'CONDITION_MET'],
    ['gcp3-c5-e2', 'slo_mensuel=99.99%', 'slo_mensuel=99.95%'],
    ['gcp3-c5-e2', 'region=STOCKHOLM slo_mensuel=99.95%', 'region=STOCKHOLM slo_mensuel=99.999%'],
    ['gcp3-c5-e3', 'WAITING_FOR_ACK', 'ACKNOWLEDGED']
  ]) {
    const item = exercise(id);
    const altered = item.solution.replaceAll(correct, incorrect);
    assert.notEqual(altered, item.solution, `${id} : mutation impossible`);
    const report = await runTests(item, altered, { execute: executeAnalysis });
    assert.equal(report.stop?.reason, 'wrong_output', `${id} : décision erronée acceptée`);
  }
});

test('les anciens statuts de résilience et de relivraison sont refusés', async () => {
  for (const [id, current, old] of [
    ['gcp3-c1-e2', 'MULTI_ZONE_NO_GUARANTEE', 'HA_RESILIENT'],
    ['gcp3-c5-e3', 'REDELIVERY_POSSIBLE', 'REDELIVERED_TO_CONSUMER']
  ]) {
    const item = exercise(id);
    const altered = item.solution.replaceAll(current, old);
    assert.notEqual(altered, item.solution, `${id} : statut attendu absent`);
    const report = await runTests(item, altered, { execute: executeAnalysis });
    assert.equal(report.stop?.reason, 'wrong_output', `${id} : ancien statut accepté`);
  }
});
