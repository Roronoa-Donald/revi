'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { getExercise, listExercises } = require('../server/exercises');
const { runTests } = require('../server/exercises/runner');
const execution = require('../server/services/execution');

async function accepted(exercise, entry, stdout) {
  const report = await runTests({ ...exercise, tests: [entry] }, '', {
    execute: async () => ({ ok: true, status: 'success', stdout, stderr: '' })
  });
  assert.equal(report.ok, true);
  return report.passed === 1;
}

async function compare(actual, expected, options = {}, exercise = { language: 'analyse' }) {
  return accepted(exercise, { stdin: '', expected, ...options }, actual);
}

const numberCases = [
  ['0.25texte', '1/4', false],
  ['0,25 kg', '1/4', false],
  ['0.25.0', '1/4', false],
  ['0.25\nautre résultat', '1/4', false],
  ['1/4', '0.25f', false],
  ['0x1', '0/1', false],
  ['0.25', '1/4', true],
  ['0,25', '1/4', true],
  ['  .25  ', '1/4', true],
  ['+2.5e-1', '1/4', true],
  ['-0,25', '-1/4', true],
  ['1/4', '0.2500001', true],
  ['0.2500005', '1/4', true],
  ['0.250002', '1/4', false],
  ['1/4', '0.26', false],
  ['1/0', '0', false]
];

for (const [actual, expected, valid] of numberCases) {
  test(`F22 fraction : ${JSON.stringify(actual)} face à ${JSON.stringify(expected)}`, async () => {
    assert.equal(await compare(actual, expected), valid);
  });
}

test('F22 tolérance numérique : chaîne entière valide et bornes', async () => {
  const options = { tolerance: 0.001 };
  const exercise = { language: 'python' };
  assert.equal(await compare('0.2504kg', '0.25', options, exercise), false);
  assert.equal(await compare('0.25', '0.2504kg', options, exercise), false);
  assert.equal(await compare('0.2504', '0.25', options, exercise), true);
  assert.equal(await compare('0.2511', '0.25', options, exercise), false);
  assert.equal(await compare('0x1', '0', options, exercise), false);
  assert.equal(await compare('0,2504', '0.25', options, exercise), true);
});

test('F203 ERP : les valeurs JSON conservent leur casse', async () => {
  const exercise = getExercise('erp2-c3-e3');
  const entry = exercise.tests[0];
  assert.equal(await accepted(exercise, entry, entry.expected.replace('ROBERT', 'robert')), false);
  assert.equal(await accepted(exercise, entry, entry.expected.replace('CLAIRE', 'Claire')), false);
  assert.equal(await accepted(exercise, entry, entry.expected.replace('bob@test.com', 'BOB@test.com')), false);
  assert.equal(await accepted(exercise, entry, entry.expected), true);
  assert.equal(await accepted(exercise, entry, entry.expected.replaceAll('\": ', '\":')), true);
});

test('F203 JSON accepte les espaces insignifiants sans altérer les chaînes', async () => {
  const exercise = getExercise('erp2-c3-e3');
  const entry = exercise.tests[0];
  const parsed = JSON.parse(entry.expected);
  assert.equal(await accepted(exercise, entry, JSON.stringify(parsed)), true);
  assert.equal(await accepted(exercise, entry, JSON.stringify(parsed, null, 2)), true);
  parsed[0].nom = 'robert';
  assert.equal(await accepted(exercise, entry, JSON.stringify(parsed)), false);

  const expected = '{"texte": "A  B et \\\"C\\\"", "droits": ["LECTURE", "ÉCRITURE"]}';
  const compact = JSON.stringify(JSON.parse(expected));
  assert.equal(await compare(compact, expected), true);
  assert.equal(await compare(compact.replace('A  B', 'A B'), expected), false);

  const pivot = getExercise('erp2-c3-e2');
  const zeroTotal = pivot.tests[1];
  assert.equal(await accepted(pivot, zeroTotal, JSON.stringify(JSON.parse(zeroTotal.expected))), true);
});

test('F203 JSON : clés, valeurs imbriquées, accents et tableaux restent distincts', async () => {
  const expected = '[{"nom": "Élodie", "droits": ["ADMIN", "lecture"]}]';
  assert.equal(await compare('[{"nom": "élodie", "droits": ["ADMIN", "lecture"]}]', expected), false);
  assert.equal(await compare('[{"nom": "Elodie", "droits": ["ADMIN", "lecture"]}]', expected), false);
  assert.equal(await compare('[{"Nom": "Élodie", "droits": ["ADMIN", "lecture"]}]', expected), false);
  assert.equal(await compare('[{"nom": "Élodie", "droits": ["admin", "lecture"]}]', expected), false);
  assert.equal(await compare('[{"nom": "Élodie", "droits": ["lecture", "ADMIN"]}]', expected), false);
  assert.equal(await compare('[{"nom": "Élodie", "droits": ["ADMIN", "lecture"]}', expected), false);
  assert.equal(await compare(`${expected} texte`, expected), false);
  assert.equal(await compare(expected, expected), true);
  assert.equal(await compare('{"valeur": "0.25"}', '{"valeur": "0,25"}'), false);
  assert.equal(await compare('{"valeur": "A  B"}', '{"valeur": "A B"}'), false);
});

test('F203 JSON : valeurs et clés restent sensibles à la casse dans les quatre exercices concernés', async () => {
  for (const [id, original, modified] of [
    ['erp2-c3-e2', 'ACME', 'acme'],
    ['erp2-c3-e3', 'ROBERT', 'robert'],
    ['ib2-c4-e2', '"Must"', '"must"'],
    ['ib2-c5-e3', 'panier', 'PANIER']
  ]) {
    const exercise = getExercise(id);
    const entry = exercise.tests.find(item => item.expected.includes(original));
    assert.ok(entry, id);
    const actual = entry.expected.replace(original, modified);
    assert.doesNotThrow(() => JSON.parse(actual));
    assert.equal(await accepted(exercise, entry, actual), false, id);
  }
});

test('F203 JSON : tous les attendus structurés du catalogue restent acceptés', async () => {
  const cases = [];
  for (const exercise of listExercises()) {
    if (exercise.language !== 'analyse') continue;
    for (const entry of exercise.tests) {
      let expected;
      try {
        expected = JSON.parse(entry.expected);
      } catch {
        continue;
      }
      if (expected !== null && typeof expected === 'object') cases.push([exercise, entry]);
    }
  }
  const ids = new Set(cases.map(([exercise]) => exercise.id));
  for (const id of ['erp2-c3-e2', 'erp2-c3-e3', 'ib2-c4-e2', 'ib2-c5-e3']) assert.ok(ids.has(id), id);
  for (const [exercise, entry] of cases) {
    assert.equal(await accepted(exercise, entry, entry.expected), true, exercise.id);
    assert.equal(await accepted(exercise, entry, JSON.stringify(JSON.parse(entry.expected))), true, `${exercise.id} : JSON compact`);
  }
  const erp = getExercise('erp2-c3-e2');
  assert.equal(await accepted(erp, erp.tests[1], erp.tests[1].expected.replace('0.0', '0')), true);
});

test('F203 JSON : pas de nouvelle égalité par perte de précision numérique', async () => {
  assert.equal(await compare('[{"valeur": 9007199254740993}]', '[{"valeur": 9007199254740992}]'), false);
  assert.equal(await compare('[{"valeur": 1.0000000000000001}]', '[{"valeur": 1}]'), false);
  assert.equal(await compare('[{"valeur":9007199254740993}]', '[{"valeur": 9007199254740992}]'), false);
  assert.equal(await compare('[{"valeur":1.0000000000000001}]', '[{"valeur": 1.0}]'), false);
  assert.equal(await compare('[{"valeur":1e309}]', '[{"valeur": 2e309}]'), false);
});

test('F203 JSON : les objets équivalents restent acceptés sans arrondi numérique', async () => {
  assert.equal(await compare('{"second": [2, 3], "premier": "\\u0041"}', '{"premier": "A", "second": [2.0, 3]}'), true);
  assert.equal(await compare('{"valeur": 1e2, "autre": -0.00}', '{"autre": 0, "valeur": 100.0}'), true);
  assert.equal(await compare('{"nombre": 9007199254740993e0}', '{"nombre": 9007199254740993}'), true);
  assert.equal(await compare('{"nombre": 9007199254740993}', '{"nombre": 9007199254740992}'), false);
  assert.equal(await compare('{"nombre": 1.0000000000000001}', '{"nombre": 1}'), false);
  assert.equal(await compare('{"valeur": "1"}', '{"valeur": 1}'), false);
  assert.equal(await compare('{"a": 1, "b": 2}', '{"a": 2, "b": 1}'), false);
  assert.equal(await compare('{"\\u0000revi-number": "1e0"}', '{"valeur": 1}'), false);
});

test('F203 : les tolérances textuelles et le mode exact ne changent pas', async () => {
  assert.equal(await compare('lan : routeur', 'LAN : ROUTEUR'), true);
  assert.equal(await compare('realisable : oui', 'Réalisable : OUI'), true);
  assert.equal(await compare('4x1', '4*x1'), true);
  assert.equal(await compare('0,25', '0.25'), true);
  assert.equal(await compare('ABC', 'abc', {}, { language: 'python' }), false);
  assert.equal(await compare('lan', 'LAN', { mode: 'exact' }), false);
  assert.equal(await compare('{"nom":"ROBERT"}', '{"nom": "ROBERT"}', { mode: 'exact' }), false);
});

test('F22 et F203 : soumissions synthétiques via le moteur réel d’analyse', async () => {
  async function submit(expected, answer) {
    const exercise = { language: 'analyse', tests: [{ stdin: 'cas:1', expected }] };
    const report = await runTests(exercise, `[Cas 1]\n${answer}`, {
      execute: payload => execution.execute(payload, { allowLocal: true })
    });
    assert.equal(report.ok, true);
    return report.passed === 1;
  }
  assert.equal(await submit('1/4', '0.25texte'), false);
  assert.equal(await submit('1/4', '0,25'), true);
  assert.equal(await submit('[{"nom": "ALICE"}]', '[{"nom": "alice"}]'), false);
  assert.equal(await submit('[{"nom": "ALICE"}]', '[{"nom": "ALICE"}]'), true);
});

const repairedCases = [
  ['re-c1-e2', 2, ['a : workgroup', 'b : client-serveur', 'c : workgroup', 'd : workgroup', 'e : client-serveur', 'centralises : oui']],
  ['re-c1-e3', 2, ['a : PAN', 'b : LAN', 'c : WLAN', 'd : MAN', 'e : WAN', 'f : WLAN', 'wlan : 2/6']],
  ['re-c2-e1', 2, ['a : fragile', 'b : centralise', 'c : boucle', 'd : centralise', 'e : fragile', 'etoiles : 2/5']],
  ['re-c2-e2', 2, ['a : conseille', 'b : sans fil', 'c : conseille', 'd : conseille', 'e : conseille', 'blindes : 2/5']],
  ['re-c2-e3', 2, ['a : reseau hors service', 'b : liaison correcte', 'c : liaison correcte', 'd : un poste isole', 'e : bascule anneau secondaire', 'pannes : 3/5']],
  ['re-c3-e1', 2, ['a : 7-application', 'b : 2-liaison', 'c : 3-reseau', 'd : 5-session', 'e : 6-presentation', 'routeurs : 1/5']],
  ['re-c3-e3', 2, ['a : verifier les cables', 'b : verifier le routage', 'c : verifier la carte', 'd : verifier les cables', 'e : verifier les applications', 'physiques : 2/5']],
  ['re-c4-e1', 2, ['a : acces-reseau', 'b : application', 'c : internet', 'd : transport', 'e : application', 'transport : 1/5']],
  ['re-c4-e3', 2, ['a : fiable', 'b : rapide', 'c : rapide', 'd : fiable', 'e : fiable', 'fiables : 3/5']],
  ['re-c5-e1', 2, ['a : mac valide', 'b : mac valide', 'c : mac invalide', 'd : mac invalide', 'e : mac invalide', 'invalides : 3/5']],
  ['re-c5-e3', 2, ['a : classe A', 'b : classe A', 'c : classe B', 'd : classe B', 'e : reservee', 'f : reservee', 'speciales : 2/6']],
  ['re-c6-e1', 2, ['a : /25 (2 sous-reseaux, 126 hotes)', 'b : /26 (4 sous-reseaux, 62 hotes)', 'c : /27 (8 sous-reseaux, 30 hotes)', 'd : /28 (16 sous-reseaux, 14 hotes)', 'e : /29 (32 sous-reseaux, 6 hotes)']],
  ['re-c6-e2', 2, ['a : 255.255.255.128 (/25)', 'b : 255.255.255.192 (/26)', 'c : 255.255.255.224 (/27)', 'd : 255.255.255.240 (/28)', 'e : 255.255.255.252 (/30)', 'slash28 : 1/5']],
  ['re-c6-e3', 2, ['a : /30 (2 hotes)', 'b : /28 (14 hotes)', 'c : /26 (62 hotes)', 'd : /30 (2 hotes)', 'e : /24 (254 hotes)', 'liaisons : 2/5']],
  ['en-c6-e3', 2, ['a : score 80', 'b : score 70', 'c : score 90', 'd : score 65', 'e : score 75', 'moyenne : 76', 'verdict : admis']],
  ['bu-c5-e3', 2, ['a : tres bien', 'b : passe', 'c : passe', 'd : rattrapage', 'e : tres bien', 'recales : 1']],
  ['pr-c4-e3', 0, ['a : supprime', 'b : conserve', 'c : supprime', 'd : introuvable', 'e : supprime', 'suppressions : 3', 'introuvables : 1']],
  ['pr-c5-e1', 0, ['a : rupture', 'b : alerte', 'c : ok', 'd : alerte', 'e : ok', 'ruptures : 1', 'alertes : 2']]
];

function solutionCase(solution, number) {
  const heading = `[Cas ${number} —`;
  const start = solution.indexOf(heading);
  assert.notEqual(start, -1);
  const firstLine = solution.indexOf('\n', start);
  assert.notEqual(firstLine, -1);
  const nextCase = solution.indexOf('\n\n[Cas ', firstLine);
  return solution.slice(firstLine + 1, nextCase === -1 ? undefined : nextCase).trim();
}

for (const [id, index, lines] of repairedCases) {
  test(`F179 ${id} : réponse séparée, corrigé cohérent, fusion rejetée`, async () => {
    const exercise = getExercise(id);
    const entry = exercise.tests[index];
    const correct = lines.join('\n');
    const fused = correct.replace('\ne : ', '≠ : ');
    assert.notEqual(fused, correct);
    assert.equal(await accepted(exercise, entry, fused), false);
    assert.equal(await accepted(exercise, entry, correct), true);
    assert.equal(entry.expected, correct);
    assert.equal(solutionCase(exercise.solution, Number(entry.stdin.slice(4))), correct);
    assert.equal(lines.filter(line => line.startsWith('d : ')).length, 1);
    assert.equal(lines.filter(line => line.startsWith('e : ')).length, 1);
    assert.equal(lines.findIndex(line => line.startsWith('e : ')), lines.findIndex(line => line.startsWith('d : ')) + 1);
  });
}

test('F179 intégrité : les 18 cas couverts et aucune fusion connue dans les quatre catalogues', () => {
  assert.equal(repairedCases.length, 18);
  assert.equal(new Set(repairedCases.map(([id]) => id)).size, 18);
  const counts = { 'b1-reseaux': 0, 'b1-anglais': 0, 'b1-bureautique': 0, 'b1-projet': 0 };
  for (const [id] of repairedCases) counts[getExercise(id).course]++;
  assert.deepEqual(counts, { 'b1-reseaux': 14, 'b1-anglais': 1, 'b1-bureautique': 1, 'b1-projet': 2 });
  for (const exercise of listExercises().filter(item => Object.hasOwn(counts, item.course))) {
    assert.equal(exercise.solution.includes('≠ : '), false, `${exercise.id} : corrigé fusionné`);
    for (const entry of exercise.tests) {
      assert.equal(entry.expected.includes('≠ : '), false, `${exercise.id} : attendu fusionné`);
    }
  }
});

test('F179 intégrité : aucun attendu ou corrigé du catalogue ne contient le marqueur de fusion connu', () => {
  for (const exercise of listExercises()) {
    assert.equal(exercise.solution.includes('≠ : '), false, `${exercise.id} : corrigé fusionné`);
    for (const entry of exercise.tests) {
      assert.equal(String(entry.expected).includes('≠ : '), false, `${exercise.id} : attendu fusionné`);
    }
  }
});
