'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const course = require('../server/content/b3-cloud-azure');
const chapter1 = require('../server/content/b3-cloud-azure/chapitre1');
const chapter3 = require('../server/content/b3-cloud-azure/chapitre3');
const chapter4 = require('../server/content/b3-cloud-azure/chapitre4');
const chapter5 = require('../server/content/b3-cloud-azure/chapitre5');
const exercises = require('../server/exercises/b3-cloud-azure');
const registry = require('../server/exercises');
const { runTests } = require('../server/exercises/runner');
const { execute } = require('../server/services/execution');

const root = path.resolve(__dirname, '..');
const exerciseById = id => exercises.find(exercise => exercise.id === id);
const readCourse = file => fs.readFileSync(path.join(root, 'b3-cloud-azure', file), 'utf8');

function addressFromNumber(address) {
  return [24, 16, 8, 0].map(shift => Math.floor(address / 2 ** shift) % 256).join('.');
}

function subnetOutput(name, address, prefix) {
  const addressNumber = address.split('.').reduce((value, octet) => value * 256 + Number(octet), 0);
  const total = 2 ** (32 - prefix);
  const network = Math.floor(addressNumber / total) * total;
  const value = offset => addressFromNumber(network + offset);
  return `SUBNET ${name}: TOTAL=${total} USABLE=${total - 5} RESERVED=5 ` +
    `GATEWAY=${value(1)} DNS_MAP_1=${value(2)} DNS_MAP_2=${value(3)} ` +
    `RANGE=${value(4)}-${value(total - 2)}`;
}

function completeStarter(exercise) {
  const answers = exercise.solution.split(/(?=^\[Cas \d+ — )/m).slice(1)
    .map(section => section.slice(section.indexOf('\n') + 1).trim());
  assert.equal((exercise.starter.match(/A_COMPLETER/g) || []).length, exercise.tests.length, exercise.id);
  assert.equal(answers.length, exercise.tests.length, exercise.id);
  let index = 0;
  return exercise.starter.replace(/A_COMPLETER/g, () => answers[index++]);
}

test('F16 : zone multi-datacenters et SLA dépendant du service', () => {
  const card = chapter1.flashcards.find(item => /Zone de Disponibilité/.test(item.q));
  assert.match(card.a, /un ou plusieurs (?:centres de données|datacenters)/i);
  assert.match(card.a, /SLA.*dépend.*service.*conditions/i);
  const question = chapter1.questions[0];
  assert.match(question.opts[question.correct], /dépend.*service.*conditions/i);
  assert.match(chapter1.sections[0].html, /un ou plusieurs (?:centres de données|datacenters)/i);
  assert.doesNotMatch(course.description, /Availability Zones avec SLA 99\.99%/i);
  const exercise = exerciseById('az3-c1-e2');
  assert.match(exercise.brief, /modèle fictif/i);
  assert.match(exercise.brief, /ne (?:permet|constitue|garantit).*SLA/i);
  assert.match(exercise.brief, /ne pas utiliser comme inventaire Azure/i);
  assert.doesNotMatch(exercise.brief, /cas\.9%/);
  assert.match(exercise.examples[0].note, /modèle fictif/i);
  const exam = fs.readFileSync(path.join(root, 'server/content/b3-cloud-azure/pages/examens-exercices.js'), 'utf8');
  assert.match(exam, /Zone de Disponibilité \(AZ\) regroupe un ou plusieurs datacenters/i);
  assert.doesNotMatch(exam, /Zone de Disponibilité \(AZ\) est un datacenter/i);
});

test('F52 : disponibilité théorique, hypothèses et calculs', () => {
  const section = chapter3.sections.find(item => /Haute Disponibilité/.test(item.title));
  assert.match(section.html, /défaillances indépendantes/i);
  assert.match(section.html, /même période/i);
  assert.match(section.html, /ne constitue pas un engagement contractuel/i);
  assert.match(section.html, /0\.999300109995/);
  assert.match(section.html, /99\.9300\s*%/);
  const card = chapter3.flashcards.find(item => /composite/i.test(item.q));
  assert.match(card.a, /indépendan/i);
  assert.match(card.a, /même période/i);
  assert.match(card.a, /contractuel/i);
  const exercise = exerciseById('az3-c3-e1');
  assert.match(exercise.brief, /modèle fictif/i);
  assert.match(exercise.brief, /indépendan/i);
  assert.match(exercise.brief, /même période/i);
  assert.match(exercise.brief, /non contractuel/i);
  const exam = fs.readFileSync(path.join(root, 'server/content/b3-cloud-azure/pages/examens-exercices.js'), 'utf8');
  assert.match(exam, /0\.99840064995/);
  assert.match(exam, /99\.8401%/);
  assert.match(exam, /défaillances indépendantes/i);
  assert.match(exam, /même période/i);
  assert.match(exam, /ne constitue pas un SLA contractuel/i);
  assert.match(exam, /14\.01 heures/);
  assert.doesNotMatch(exam, /0\.998400475|99\.8400%/);
  assert.equal((0.9999 * 0.9995 * 0.9999 * 100).toFixed(4), '99.9300');
  assert.equal(((1 - 0.9999 * 0.9995 * 0.9999) * 8760).toFixed(2), '6.13');
  assert.equal((0.999 * 0.9995 * 0.9999 * 100).toFixed(4), '99.8401');
});

test('F58 : champs requis et facultatifs d’un SAS de compte', () => {
  const card = chapter5.flashcards.find(item => /SAS de compte/i.test(item.q));
  for (const field of ['sv', 'ss', 'srt', 'sp', 'se', 'sig']) {
    assert.match(card.a, new RegExp(`\\b${field}\\b`));
  }
  assert.match(card.a, /st et spr sont optionnels/i);
  const question = chapter5.questions.find(item => /HTTPS/.test(item.stem));
  assert.equal(question.opts[question.correct], 'spr=https');
  assert.match(question.exp, /facultatif/i);
  assert.match(question.exp, /https,http/i);
  const exercise = exerciseById('az3-c5-e2');
  assert.match(exercise.brief, /modèle fictif/i);
  assert.match(exercise.brief, /ne vérifie pas la signature/i);
  assert.match(exercise.brief, /st et spr.*optionnels/i);
  const exam = fs.readFileSync(path.join(root, 'server/content/b3-cloud-azure/pages/examens-exercices.js'), 'utf8');
  assert.match(exam, /SAS de service.*blob/i);
  assert.match(exam, /SAS de service visant un blob précis, sans politique/i);
  for (const field of ['sv', 'sr=b', 'sp=r', 'se', 'sig']) {
    assert.match(exam, new RegExp(`<code>${field}</code>`));
  }
  assert.match(exam, /<code>st<\/code> est facultatif/i);
  assert.match(exam, /<code>spr<\/code> est facultatif/i);
  assert.match(exercise.brief, /LIST.*pas une méthode HTTP/i);
});

test('F198 : adresses réservées et résolution DNS configurée', () => {
  const section = chapter4.sections[0].html;
  assert.match(section, /correspondance.*Azure DNS/i);
  assert.match(section, /168\.63\.129\.16/);
  assert.match(section, /DNS personnalisé/i);
  assert.doesNotMatch(section, /DNS (?:Resolver )?(?:Primaire|Secondaire)/i);
  const card = chapter4.flashcards.find(item => /5 adresses IP réservées/.test(item.q));
  assert.match(card.a, /correspondance.*Azure DNS/i);
  assert.match(card.a, /168\.63\.129\.16/);
  const question = chapter4.questions.find(item => /décalages \+2 et \+3/.test(item.stem));
  assert.match(question.opts[question.correct], /correspondance.*Azure DNS/i);
  const exercise = exerciseById('az3-c4-e1');
  assert.match(exercise.brief, /DNS personnalisé/i);
  assert.match(exercise.brief, /DNS_MAP_1/);
  assert.match(exercise.brief, /DNS_MAP_2/);
  assert.doesNotMatch(JSON.stringify(exercise), /DNS1=|résolveur DNS (?:primaire|secondaire)/i);
  assert.match(exercise.examples[0].expected, /DNS_MAP_1=10\.0\.1\.2 DNS_MAP_2=10\.0\.1\.3/);
  const exam = fs.readFileSync(path.join(root, 'server/content/b3-cloud-azure/pages/examens-exercices.js'), 'utf8');
  assert.match(exam, /10\.1\.1\.2.*10\.1\.1\.3.*correspondance Azure DNS/i);
  assert.match(exam, /168\.63\.129\.16/);
  assert.doesNotMatch(exam, /Résolveur DNS Azure (?:principal|de secours)/i);
  const cases = [...exercise.starter.matchAll(/SUBNET name=(\S+) cidr=(\d+\.\d+\.\d+\.\d+)\/(\d+)/g)];
  assert.equal(cases.length, 4);
  cases.forEach((match, index) => {
    assert.equal(exercise.tests[index].expected, subnetOutput(match[1], match[2], Number(match[3])));
  });
  assert.match(exercise.tests[3].expected, /GATEWAY=10\.0\.5\.17 DNS_MAP_1=10\.0\.5\.18 DNS_MAP_2=10\.0\.5\.19 RANGE=10\.0\.5\.20-10\.0\.5\.30/);
});

test('F199 : paramètres réels et simulation explicitement fictive', () => {
  const section = chapter3.sections.find(item => /App Service/.test(item.title));
  assert.doesNotMatch(chapter3.toc, /zéro-downtime|calcul de SLA composite/i);
  assert.match(section.html, /WEBSITE_SWAP_WARMUP_PING_PATH/);
  assert.match(section.html, /WEBSITE_SWAP_WARMUP_PING_STATUSES/);
  assert.match(section.html, /par défaut.*(?:tous|tout).*500/i);
  assert.match(section.html, /code hors liste ne valide pas le préchauffage/i);
  assert.match(section.html, /si celui-ci n'aboutit pas, le swap échoue/i);
  assert.match(section.html, /nouveau swap/i);
  const question = chapter3.questions.find(item => /500/.test(item.stem));
  assert.match(question.opts[question.correct], /accepté/i);
  assert.match(question.exp, /WEBSITE_SWAP_WARMUP_PING_STATUSES/);
  const card = chapter3.flashcards.find(item => /Slot Swap/.test(item.q));
  assert.match(card.a, /500/);
  assert.match(card.a, /nouveau swap/i);
  const exercise = exerciseById('az3-c3-e3');
  assert.match(exercise.brief, /modèle fictif/i);
  assert.match(exercise.brief, /par défaut.*500/i);
  assert.match(exercise.brief, /WEBSITE_SWAP_WARMUP_PING_STATUSES/);
  assert.match(exercise.brief, /code non admis ne valide pas le préchauffage/i);
  assert.match(exercise.brief, /auto_rollback.*(?:fictif|hypothétique)/i);
  assert.match(exercise.brief, /ne démontre pas l'intégrité/i);
  assert.match(exercise.brief, /n'annule pas automatiquement les données/i);
  assert.doesNotMatch(exercise.brief, /zéro-downtime|valide l'intégrité/i);
  assert.match(exercise.starter, /modèle fictif/i);
  assert.match(exercise.examples[0].note, /modèle fictif/i);
  assert.match(exercise.tests[1].expected, /SWAP_ABORTED: probe_failed \(status=500\)/);
});

test('Les catalogues Azure actif et découpé restent identiques', () => {
  const split = [1, 2, 3, 4, 5, 6].flatMap(chapter =>
    require(`../server/exercises/b3-cloud-azure/chapitre${chapter}`)
  );
  assert.deepEqual(exercises, split);
});

test('La projection des cinq ateliers masque les réponses et les pages les intègrent', () => {
  for (const id of ['az3-c1-e2', 'az3-c3-e1', 'az3-c3-e3', 'az3-c4-e1', 'az3-c5-e2']) {
    const exercise = registry.getExercise(id);
    const client = registry.toClient(exercise);
    const page = readCourse(`chapitres/chapitre${exercise.chapter}.html`);
    assert.equal(exercise.course, 'b3-cloud-azure');
    assert.equal(client.tests, undefined);
    assert.equal(client.solution, undefined);
    assert.ok(page.includes(`data-exercise="${id}"`), id);
    for (const hidden of exercise.tests) {
      assert.equal(JSON.stringify(client).includes(hidden.expected), false, `${id}: réponse divulguée`);
    }
  }
});

test('Les cinq corrigés de grilles passent le correcteur local', async () => {
  for (const id of ['az3-c1-e2', 'az3-c3-e1', 'az3-c3-e3', 'az3-c4-e1', 'az3-c5-e2']) {
    const exercise = exerciseById(id);
    const result = await runTests(exercise, exercise.solution, { execute });
    assert.equal(result.passed, result.total, `${id}: ${JSON.stringify(result.stop)}`);
    assert.equal(result.ok, true, id);
  }
});

test('Les grilles de départ complétées passent les tests correspondants', async () => {
  for (const id of ['az3-c1-e2', 'az3-c3-e1', 'az3-c3-e3', 'az3-c4-e1', 'az3-c5-e2']) {
    const exercise = exerciseById(id);
    const result = await runTests(exercise, completeStarter(exercise), { execute });
    assert.equal(result.passed, result.total, `${id}: ${JSON.stringify(result.stop)}`);
    assert.equal(result.ok, true, id);
  }
});

test('API locale : soumission des cinq grilles et absence de fuite des attendus', async () => {
  const fastify = require('fastify')({ logger: false });
  const jwt = require('jsonwebtoken');
  const budget = require('../server/services/execution/budget');
  const previousSecret = process.env.JWT_SECRET;
  const previousLimit = process.env.EXEC_DAILY_LIMIT_PER_USER;
  const previousGlobalLimit = process.env.EXEC_DAILY_LIMIT_GLOBAL;
  process.env.JWT_SECRET = 'test-azure-local-seulement';
  process.env.EXEC_DAILY_LIMIT_PER_USER = '100';
  process.env.EXEC_DAILY_LIMIT_GLOBAL = '200';
  fastify.register(require('@fastify/cookie'));
  fastify.register(require('../server/routes/exercises'), { prefix: '/api' });
  budget.reset();
  try {
    const token = jwt.sign({ userId: 'azure-test-local', level: 'b3' }, process.env.JWT_SECRET);
    for (const id of ['az3-c1-e2', 'az3-c3-e1', 'az3-c3-e3', 'az3-c4-e1', 'az3-c5-e2']) {
      const exercise = exerciseById(id);
      const response = await fastify.inject({
        method: 'POST', url: '/api/exercise/submit',
        headers: { cookie: `auth_token=${token}` },
        payload: { exerciseId: id, code: completeStarter(exercise) }
      });
      assert.equal(response.statusCode, 200, id);
      const result = response.json();
      assert.equal(result.total, exercise.tests.length, id);
      assert.equal(result.passed, result.total, id);
      for (const hidden of exercise.tests) {
        assert.equal(response.body.includes(hidden.expected), false, `${id}: attendu divulgué`);
      }
    }
    const network = exerciseById('az3-c4-e1');
    const incorrect = completeStarter(network).replace('DNS_MAP_2=10.0.5.19', 'DNS_MAP_2=10.0.5.3');
    const response = await fastify.inject({
      method: 'POST', url: '/api/exercise/submit',
      headers: { cookie: `auth_token=${token}` },
      payload: { exerciseId: network.id, code: incorrect }
    });
    assert.equal(response.statusCode, 200);
    assert.equal(response.json().passed, 3);
    assert.equal(response.json().stop.reason, 'wrong_output');
    assert.equal(response.body.includes(network.tests[3].expected), false);
  } finally {
    await fastify.close();
    budget.reset();
    if (previousSecret === undefined) delete process.env.JWT_SECRET;
    else process.env.JWT_SECRET = previousSecret;
    if (previousLimit === undefined) delete process.env.EXEC_DAILY_LIMIT_PER_USER;
    else process.env.EXEC_DAILY_LIMIT_PER_USER = previousLimit;
    if (previousGlobalLimit === undefined) delete process.env.EXEC_DAILY_LIMIT_GLOBAL;
    else process.env.EXEC_DAILY_LIMIT_GLOBAL = previousGlobalLimit;
  }
});

test('F198 : le correcteur refuse les anciennes étiquettes DNS1', async () => {
  const exercise = exerciseById('az3-c4-e1');
  const outdated = exercise.solution.replace(/DNS_MAP_1/g, 'DNS1');
  const result = await runTests(exercise, outdated, { execute });
  assert.equal(result.stop.reason, 'wrong_output');
  assert.equal(result.passed, 0);
});

test('F198 : le correcteur refuse une correspondance incorrecte pour le /28', async () => {
  const exercise = exerciseById('az3-c4-e1');
  const incorrect = exercise.solution.replace('DNS_MAP_2=10.0.5.19', 'DNS_MAP_2=10.0.5.3');
  const result = await runTests(exercise, incorrect, { execute });
  assert.equal(result.stop.reason, 'wrong_output');
  assert.equal(result.passed, 3);
});

test('F199 : le correcteur applique les règles fictives au code 500', async () => {
  const exercise = exerciseById('az3-c3-e3');
  const incorrect = exercise.solution.replace(
    'SWAP_ABORTED: probe_failed (status=500), rollback to v1.0.0',
    'SWAP_SUCCESS: prod=v2.0.0-bug stage=v1.0.0'
  );
  const result = await runTests(exercise, incorrect, { execute });
  assert.equal(result.stop.reason, 'wrong_output');
  assert.equal(result.passed, 1);
});

test('Les pages générées reflètent les corrections sans divulguer les corrigés', () => {
  const cards = readCourse('chapitres/cartes.html');
  const formulas = readCourse('chapitres/formules.html');
  const exam = readCourse('chapitres/examens.html');
  const compute = readCourse('chapitres/chapitre3.html');
  const network = readCourse('chapitres/chapitre4.html');
  const storage = readCourse('chapitres/chapitre5.html');
  assert.match(cards, /un ou plusieurs (?:centres de données|datacenters)/i);
  assert.match(cards, /\bsig\b/);
  assert.match(formulas, /correspondance.*Azure DNS/i);
  assert.match(exam, /99\.8401%/);
  assert.match(compute, /WEBSITE_SWAP_WARMUP_PING_STATUSES/);
  assert.match(network, /DNS_MAP_1/);
  assert.match(storage, /ne vérifie pas la signature/i);
  const pages = [cards, formulas, exam, compute, network, storage, readCourse('chapitres/chapitre1.html')];
  for (const id of ['az3-c1-e2', 'az3-c3-e1', 'az3-c3-e3', 'az3-c4-e1', 'az3-c5-e2']) {
    for (const hidden of exerciseById(id).tests) {
      for (const page of pages) assert.equal(page.includes(hidden.expected), false, `${id}: corrigé exposé`);
    }
  }
});
