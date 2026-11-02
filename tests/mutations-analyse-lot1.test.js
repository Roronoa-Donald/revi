'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const { MAX_TESTS } = require('../server/exercises/runner');
const execution = require('../server/services/execution');
const {
  arithmeticOracle,
  assessVariant,
  auditArithmetic,
  collectSamples,
  evaluate,
  replaceCaseOutput,
  replay,
  selectCandidate
} = require('../corrections/outils/sondes/mutations-analyse-lot1');

function labelledExercise() {
  return {
    id: 'fixture-lignes',
    course: 'fixture',
    language: 'analyse',
    brief: '<p>Pour chaque ligne, indiquez <code>element : OK</code> ou <code>element : ERREUR</code>, puis <code>justes : X/n</code>.</p>',
    starter: [
      '[Cas 1]',
      '# Données : 3',
      '# Données : alpha ok',
      '# Données : beta ko',
      '# Données : gamma ok',
      'A_COMPLETER',
      '[Cas 2]',
      '# Données : rouge ok',
      '# Données : bleu ok',
      'A_COMPLETER'
    ].join('\n'),
    solution: [
      '[Cas 1]',
      'alpha : OK',
      'beta : ERREUR',
      'gamma : OK',
      'justes : 2/3',
      '[Cas 2]',
      'rouge : OK',
      'bleu : OK',
      'justes : 2/2'
    ].join('\n'),
    tests: [
      { stdin: 'cas:1', expected: 'alpha : OK\nbeta : ERREUR\ngamma : OK\njustes : 2/3' },
      { stdin: 'cas:2', expected: 'rouge : OK\nbleu : OK\njustes : 2/2' }
    ]
  };
}

function choiceExercise() {
  return {
    id: 'fixture-choix',
    course: 'fixture',
    language: 'analyse',
    brief: '<p>Indiquez <code>oui</code> ou <code>non</code> selon les données.</p>',
    starter: '[Cas 1]\n# Données : A\nA_COMPLETER\n[Cas 2]\n# Données : B\nA_COMPLETER',
    solution: '[Cas 1]\noui\n[Cas 2]\nnon',
    tests: [{ stdin: 'cas:1', expected: 'oui' }, { stdin: 'cas:2', expected: 'non' }]
  };
}

function fieldExercise() {
  return {
    id: 'fixture-champs',
    course: 'fixture',
    language: 'analyse',
    brief: '<p>Affichez <code>RAPPORT id={id} count={count} status={status}</code>.</p>',
    starter: '[Cas 1]\n# Données : EVENEMENT id=A niveau=2\nA_COMPLETER',
    solution: '[Cas 1]\nRAPPORT id=A count=3 status=OK',
    tests: [{ stdin: 'cas:1', expected: 'RAPPORT id=A count=3 status=OK' }]
  };
}

test('lignes individuelles : omission et confusion ciblent réellement les données du cas', async () => {
  const exercise = labelledExercise();
  const original = structuredClone(exercise);
  const candidate = selectCandidate(exercise);
  assert.ok(candidate);
  assert.equal(candidate.method, 'lignes-individuelles');
  assert.deepEqual(candidate.variants.map(variant => variant.type), ['omission-dernier', 'confusion-categories']);
  assert.equal(candidate.variants[0].evidence.input, 'gamma ok');
  assert.equal(candidate.variants[0].evidence.omittedLine, 'gamma : OK');
  assert.equal(candidate.variants[1].evidence.expectedLine, 'alpha : OK');
  assert.equal(candidate.variants[1].evidence.replacementLine, 'alpha : ERREUR');
  assert.equal((await evaluate(exercise, exercise.solution)).state, 'acceptee');
  for (const variant of candidate.variants) {
    const outcome = await assessVariant(exercise, candidate, variant);
    assert.equal(outcome.state, 'rejetee');
    assert.equal(outcome.reason, 'wrong_output');
    assert.equal(outcome.testIndex, candidate.sample.index);
  }
  assert.deepEqual(exercise, original);
});

test('confusion de deux cas : chaque variante est évaluée sur son propre sélecteur', async () => {
  const exercise = choiceExercise();
  const report = await replay({ exercises: [exercise] });
  assert.equal(report.statistiques.exercicesAvecDeuxVariantesEvaluees, 1);
  assert.equal(report.statistiques.exercicesAvecDeuxRejets, 1);
  assert.equal(report.details[0].method, 'choix-categoriels');
  assert.deepEqual(report.details[0].selectors, ['cas:1', 'cas:2']);
  assert.deepEqual(report.details[0].variants.map(variant => variant.outcome.testIndex), [0, 1]);
  assert.deepEqual(report.details[0].variants.map(variant => variant.outcome.state), ['rejetee', 'rejetee']);
});

test('deux champs exigés par le même modèle de sortie sont omis séparément', async () => {
  const exercise = fieldExercise();
  const candidate = selectCandidate(exercise);
  assert.ok(candidate);
  assert.equal(candidate.method, 'champs-de-resultat');
  assert.deepEqual(candidate.variants.map(variant => variant.evidence.omittedField), ['count', 'status']);
  assert.deepEqual(candidate.variants.map(variant => variant.lines[0]), ['RAPPORT id=A status=OK', 'RAPPORT id=A count=3']);
  for (const variant of candidate.variants) assert.equal((await assessVariant(exercise, candidate, variant)).state, 'rejetee');
});

test('un champ optionnel, absent du modèle ou recopié ne justifie pas une paire', () => {
  const exercise = fieldExercise();
  const optional = { ...exercise, brief: exercise.brief.replace('Affichez', 'Affichez le résultat optionnel') };
  const bracketed = { ...exercise, brief: exercise.brief.replace('count={count}', '[count={count}]') };
  const incomplete = { ...exercise, brief: '<p>Affichez <code>RAPPORT id={id} status={status}</code>.</p>' };
  const echoed = { ...exercise, starter: exercise.starter.replace('niveau=2', 'niveau=3') };
  for (const fixture of [optional, bracketed, incomplete, echoed]) assert.equal(selectCandidate(fixture), null);
});

test('une mutation vide, identique ou contenant un en-tête n’est pas un rejet', async () => {
  const exercise = labelledExercise();
  const candidate = selectCandidate(exercise);
  for (const lines of [[], candidate.sample.lines, ['[Cas 3]'], ['[Cas 3]\nvaleur'], ['# réponse']]) {
    assert.equal(replaceCaseOutput(candidate.sample, lines).valid, false);
    const outcome = await assessVariant(exercise, candidate, { lines });
    assert.equal(outcome.state, 'invalide');
  }
});

test('une exécution échouée, incohérente ou interrompue n’est jamais un rejet fiable', async () => {
  const exercise = labelledExercise();
  const candidate = selectCandidate(exercise);
  const variant = candidate.variants[0];
  const failed = async () => ({ ok: false, status: 'runtime_error', exitCode: 1, stdout: '' });
  const inconsistent = async () => ({ ok: true, status: 'runtime_error', exitCode: 1, stdout: 'mauvaise sortie' });
  const compileFailure = async () => ({ ok: true, status: 'success', exitCode: 0, compileError: 'erreur', stdout: 'mauvaise sortie' });
  const stderr = async () => ({ ok: true, status: 'success', exitCode: 0, stderr: 'erreur', stdout: 'mauvaise sortie' });
  const unavailable = async () => { throw Object.assign(new Error('indisponible'), { code: 'api_error' }); };
  for (const execute of [failed, inconsistent, compileFailure, stderr, unavailable]) {
    const outcome = await assessVariant(exercise, candidate, variant, execute);
    assert.equal(outcome.state, 'non-evaluee');
  }
  const oversized = `[Cas 1]\n${'X'.repeat(execution.LIMITS.code + 1)}`;
  assert.equal((await evaluate(exercise, oversized)).state, 'non-evaluee');
});

test('un rejet sur un cas antérieur ne prouve rien sur la mutation visée', async () => {
  const exercise = choiceExercise();
  const candidate = selectCandidate(exercise);
  const secondVariant = candidate.variants[1];
  const execute = async () => ({ ok: true, status: 'success', exitCode: 0, stdout: 'autre réponse' });
  const outcome = await assessVariant(exercise, candidate, secondVariant, execute);
  assert.equal(outcome.state, 'non-evaluee');
});

test('une variante réellement acceptée par la normalisation reste acceptée', async () => {
  const exercise = {
    ...choiceExercise(),
    starter: '[Cas 1]\n# Données : A\nA_COMPLETER',
    solution: '[Cas 1]\nOUI',
    tests: [{ stdin: 'cas:1', expected: 'OUI' }]
  };
  const sample = collectSamples(exercise)[0];
  const outcome = await assessVariant(exercise, { sample }, { lines: ['oui'] });
  assert.equal(outcome.state, 'acceptee');
  assert.equal(outcome.testIndex, 0);
});

test('une différence extérieure au cas visé rend la mutation invalide', async () => {
  const exercise = labelledExercise();
  const candidate = selectCandidate(exercise);
  const modified = { ...exercise, solution: exercise.solution.replace('bleu : OK', 'bleu : ERREUR') };
  const outcome = await assessVariant(modified, candidate, candidate.variants[0]);
  assert.equal(outcome.state, 'invalide');
  assert.equal(outcome.reason, 'un autre cas a été modifié');
});

test('les cas ambigus, JSON ou sans deux choix explicités ne sont pas déclarés couverts', async () => {
  const duplicate = labelledExercise();
  duplicate.id = 'fixture-cas-duplique';
  duplicate.tests = [duplicate.tests[0]];
  duplicate.starter += '\n[Cas 1]\n# Données : alpha ok\nA_COMPLETER';
  assert.equal(collectSamples(duplicate).length, 0);

  const json = {
    ...choiceExercise(),
    id: 'fixture-json',
    brief: '<p>Pour chaque ligne, retournez un objet JSON.</p>',
    solution: '[Cas 1]\n{"valeur":1}\n[Cas 2]\n{"valeur":2}',
    tests: [{ stdin: 'cas:1', expected: '{"valeur":1}' }, { stdin: 'cas:2', expected: '{"valeur":2}' }]
  };
  const unspecified = { ...choiceExercise(), id: 'fixture-choix-non-explicite', brief: '<p>Indiquez <code>oui</code> selon les données.</p>' };
  const report = await replay({ exercises: [duplicate, json, unspecified] });
  assert.equal(report.statistiques.exercicesAnalyse, 3);
  assert.equal(report.statistiques.exercicesAvecDeuxVariantesEvaluees, 0);
  assert.equal(report.statistiques.exercicesNonCouverts, 3);
  assert.equal(report.statistiques.variantes.rejetees, 0);
  const sample = collectSamples(json)[0];
  const malformed = await assessVariant(json, { sample }, { lines: ['{"valeur":'] });
  assert.equal(malformed.state, 'invalide');
});

test('une référence refusée ne rend pas un exercice couvert', async () => {
  const exercise = choiceExercise();
  exercise.tests = [{ stdin: 'cas:1', expected: 'non' }, exercise.tests[1]];
  const report = await replay({ exercises: [exercise] });
  assert.equal(report.statistiques.references.rejetees, 1);
  assert.equal(report.statistiques.exercicesNonCouverts, 1);
  assert.equal(report.statistiques.exercicesAvecDeuxVariantesEvaluees, 0);
  assert.equal(report.statistiques.variantes.rejetees, 0);
});

test('une paire partiellement inexécutable ne couvre pas son exercice', async () => {
  const exercise = choiceExercise();
  exercise.brief = '<p>Indiquez <code>oui</code> ou <code>incorrecte</code>.</p>';
  exercise.solution = '[Cas 1]\noui\n[Cas 2]\nincorrecte';
  exercise.tests[1].expected = 'incorrecte';
  const padding = execution.LIMITS.code - Buffer.byteLength(exercise.solution) - 2;
  exercise.solution += `\n#${'x'.repeat(padding)}`;
  assert.equal(Buffer.byteLength(exercise.solution), execution.LIMITS.code);
  const report = await replay({ exercises: [exercise] });
  assert.equal(report.statistiques.references.acceptees, 1);
  assert.equal(report.statistiques.variantes.construites, 2);
  assert.equal(report.statistiques.variantes.rejetees, 1);
  assert.equal(report.statistiques.variantes.nonEvaluees, 1);
  assert.equal(report.statistiques.exercicesAvecDeuxVariantesEvaluees, 0);
  assert.equal(report.statistiques.exercicesNonCouverts, 1);
});

test('les cas au-delà de la limite du correcteur ne créent pas une couverture fictive', async () => {
  const exercise = choiceExercise();
  exercise.tests = Array.from({ length: MAX_TESTS }, () => ({ stdin: 'cas:1', expected: 'oui' }));
  exercise.tests.push({ stdin: 'cas:2', expected: 'non' });
  const report = await replay({ exercises: [exercise] });
  assert.equal(report.statistiques.references.acceptees, 1);
  assert.equal(report.statistiques.exercicesAvecTestsAuDelaDeLaLimite, 1);
  assert.equal(report.statistiques.exercicesNonCouverts, 1);
  assert.equal(report.statistiques.variantes.construites, 0);
});

test('les réponses analyse restent du texte, jamais un programme JavaScript', async () => {
  const name = '__revi_analyse_sentinel__';
  delete globalThis[name];
  const text = `globalThis.${name} = true`;
  const exercise = {
    ...choiceExercise(),
    solution: `[Cas 1]\n${text}`,
    tests: [{ stdin: 'cas:1', expected: text }]
  };
  const outcome = await evaluate(exercise, exercise.solution);
  assert.equal(outcome.state, 'acceptee');
  assert.equal(globalThis[name], undefined);
});

const B1_ORACLE_CASES = [
  ['al-c2-e1', 'cas:1', '2 2\n2 2', '2 0\n0 2', '2 2\n0 0'],
  ['al-c2-e2', 'cas:1', '1 0 1\n0 1 1', '0 1 1\n1 0 1', '1 0 1\n1 1 0'],
  ['al-c3-e2', 'cas:1', '3 -2\n-1 1', '3 2\n1 1', '1 -2\n-1 3'],
  ['al-c3-e3', 'cas:1', '1.00\n2.00', '2.00\n1.00', '-0.71\n-1.43'],
  ['al-c4-e1', 'cas:2', '18 16 14', '2 2 2', '9 8 7'],
  ['al-c4-e3', 'cas:2', '3 1', '1 3', '-3 -1'],
  ['al-c5-e1', 'cas:2', '1', '3', '2'],
  ['al-c6-e1', 'cas:1', '1', '-79', '0'],
  ['al-c6-e2', 'cas:1', '1.00\n3.00', '3.00\n1.00', '2.00\n2.00'],
  ['al-c6-e3', 'cas:3', '4 12', '4 0', '2 6'],
  ['st-c2-e2', 'cas:3', '1 25.00\n2 25.00\n3 25.00\n4 25.00', '1 50.00\n2 50.00\n3 50.00\n4 50.00', '1 0.25\n2 0.25\n3 0.25\n4 0.25'],
  ['st-c3-e1', 'cas:1', '3.00', '3.75', '2.00'],
  ['st-c3-e2', 'cas:1', '17.50', '15.00', '35.00'],
  ['st-c3-e3', 'cas:1', '6.00', '4.00', '5.00'],
  ['st-c4-e1', 'cas:1', '1.25', '1.67', '1.12'],
  ['st-c4-e2', 'cas:1', '1.12\n44.72', '1.25\n50.00', '1.12\n0.45'],
  ['st-c4-e3', 'cas:1', '18.75', '25.00', '325.00'],
  ['st-c5-e1', 'cas:1', '0.00 2.00\n2.00 4.00\n4.00 6.00\n6.00 8.00\n8.00 10.00',
    '0.00 2.50\n2.50 5.00\n5.00 7.50\n7.50 10.00\n10.00 12.50',
    '2.00 4.00\n4.00 6.00\n6.00 8.00\n8.00 10.00\n10.00 12.00'],
  ['st-c5-e2', 'cas:3', '1 3', '1 2', '2 2'],
  ['st-c5-e3', 'cas:2', '1.00 1.25 2.50 3.75 4.00', '1.00 1.00 2.50 3.00 4.00', '1.00 1.25 2.00 3.75 4.00'],
  ['st-c6-e1', 'cas:1', '2.5000', '3.3333', '15.0000'],
  ['st-c6-e2', 'cas:2', '-0.3273', '0.3273', '-0.5000'],
  ['st-c6-e3', 'cas:1', '1.9000\n1.0000', '0.5067\n4.4833', '1.9000\n3.8500']
];

test('les 23 oracles B1 produisent deux erreurs numériques distinctes, réellement rejetées', async () => {
  const { getExercise } = require('../server/exercises');
  for (const [id, selector, expected, firstError, secondError] of B1_ORACLE_CASES) {
    const exercise = getExercise(id);
    assert.ok(exercise, id);
    const audit = auditArithmetic(exercise);
    assert.equal(audit.status, 'ok', id);
    assert.equal(audit.cases.length, 3, id);
    assert.ok(audit.cases.every(entry => entry.oracle.matchesExpected), id);
    const candidate = selectCandidate(exercise, audit);
    assert.equal(candidate?.method, 'oracle-arithmetique-b1', id);
    assert.equal(candidate.sample.stdin, selector, id);
    assert.equal(candidate.variants[0].evidence.independentlyComputed.join('\n'), expected, id);
    assert.deepEqual(candidate.variants.map(variant => variant.lines.join('\n')), [firstError, secondError], id);
    assert.equal((await evaluate(exercise, exercise.solution)).state, 'acceptee', id);
    for (const variant of candidate.variants) {
      assert.equal(variant.lines.length, candidate.sample.lines.length, id);
      for (const [index, line] of variant.lines.entries()) {
        assert.equal(line.trim().split(/\s+/).length, candidate.sample.lines[index].trim().split(/\s+/).length, id);
      }
      const outcome = await assessVariant(exercise, candidate, variant);
      assert.equal(outcome.state, 'rejetee', id);
      assert.equal(outcome.reason, 'wrong_output', id);
      assert.equal(outcome.testIndex, candidate.sample.index, id);
    }
  }
});

test('les oracles matriciels reconstruisent aussi des cas synthétiques bornés', () => {
  const { getExercise } = require('../server/exercises');
  const compute = (id, data, expected) => arithmeticOracle(getExercise(id), { data, expected });
  assert.deepEqual(compute('al-c2-e1', ['1 2', '0 1', '1 0', '1 1'], '3 2\n1 1').computed, ['3 2', '1 1']);
  assert.deepEqual(compute('al-c2-e2', ['2 3', '1 2 3', '4 5 6'], '1 4\n2 5\n3 6').computed, ['1 4', '2 5', '3 6']);
  assert.deepEqual(compute('al-c5-e1', ['3 3', '0 2 0', '1 0 0', '0 0 3'], '3').computed, ['3']);
  assert.deepEqual(compute('al-c5-e1', ['2 3', '1 2 3', '2 4 6'], '1').computed, ['1']);
  assert.deepEqual(compute('al-c5-e1', ['2 3', '0 0 0', '0 0 0'], '0').computed, ['0']);
  const singular = compute('al-c3-e2', ['1 2', '2 4'], 'singuliere');
  assert.deepEqual(singular.computed, ['singuliere']);
  assert.equal(singular.matchesExpected, true);
  assert.equal(singular.variants.length, 0);
  const noRealEigenvalue = compute('al-c6-e2', ['0 1', '-1 0'], 'pas de valeur propre reelle');
  assert.deepEqual(noRealEigenvalue.computed, ['pas de valeur propre reelle']);
  assert.equal(noRealEigenvalue.variants.length, 0);
  assert.equal(compute('al-c4-e3', ['2 4 6', '1 2 3', '2 4 6'], '0 1'), null);
  assert.equal(compute('al-c2-e2', ['9 1', ...Array(9).fill('1')], '1'), null);
});

test('le rang exact concorde avec les mineurs sur 160 matrices déterministes', () => {
  const { getExercise } = require('../server/exercises');
  const exercise = getExercise('al-c5-e1');
  const combinations = (size, count) => {
    const result = [];
    const visit = (start, indices) => {
      if (indices.length === count) {
        result.push(indices);
        return;
      }
      for (let index = start; index < size; index++) visit(index + 1, [...indices, index]);
    };
    visit(0, []);
    return result;
  };
  const determinant = matrix => {
    if (matrix.length === 1) return BigInt(matrix[0][0]);
    return matrix[0].reduce((sum, value, column) => {
      const minor = matrix.slice(1).map(row => row.filter((_, index) => index !== column));
      return sum + (column % 2 ? -1n : 1n) * BigInt(value) * determinant(minor);
    }, 0n);
  };
  const rankByMinors = matrix => {
    for (let size = Math.min(matrix.length, matrix[0].length); size > 0; size--) {
      for (const selectedRows of combinations(matrix.length, size)) {
        for (const selectedColumns of combinations(matrix[0].length, size)) {
          const minor = selectedRows.map(row => selectedColumns.map(column => matrix[row][column]));
          if (determinant(minor) !== 0n) return size;
        }
      }
    }
    return 0;
  };
  let state = 0x15b1;
  const draw = limit => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state % limit;
  };
  for (let iteration = 0; iteration < 160; iteration++) {
    const height = 1 + Math.floor(iteration / 40);
    const width = 1 + Math.floor((iteration % 40) / 10);
    const matrix = Array.from({ length: height }, () => Array.from({ length: width }, () => draw(5) - 2));
    const expected = String(rankByMinors(matrix));
    const data = [`${height} ${width}`, ...matrix.map(row => row.join(' '))];
    const oracle = arithmeticOracle(exercise, { data, expected });
    assert.ok(oracle, JSON.stringify(matrix));
    assert.equal(oracle.matchesExpected, true, JSON.stringify(matrix));
  }
});

test('une entrée synthétique brute ne devient pas un cas caché du correcteur analyse', async () => {
  const { getExercise } = require('../server/exercises');
  const exercise = getExercise('al-c2-e1');
  const data = ['1 2', '0 1', '1 0', '1 1'];
  const oracle = arithmeticOracle(exercise, { data, expected: '3 2\n1 1' });
  assert.equal(oracle.matchesExpected, true);
  assert.ok(exercise.tests.every(entry => /^cas\s*:\s*\d+$/i.test(entry.stdin)));
  const result = await execution.execute({ language: 'analyse', code: exercise.solution, stdin: data.join('\n') });
  assert.equal(result.ok, true);
  assert.equal(result.status, 'success');
  assert.equal(execution.normalizeOutput(result.stdout), '19 22\n43 50');
  assert.notEqual(execution.normalizeOutput(result.stdout), oracle.computed.join('\n'));
});

test('les oracles statistiques calculent des séries synthétiques sans les soumettre au correcteur', () => {
  const { getExercise } = require('../server/exercises');
  const compute = (id, data, expected) => arithmeticOracle(getExercise(id), { data, expected });
  assert.deepEqual(compute('st-c3-e2', ['3', '-2 1', '4 2', '10 1'], '4.00').computed, ['4.00']);
  assert.deepEqual(compute('st-c4-e3', ['3', '-2 1', '4 2', '10 1'], '18.00').computed, ['18.00']);
  assert.deepEqual(compute('st-c3-e3', ['4', '100', '0', '6', '2'], '4.00').computed, ['4.00']);
  assert.deepEqual(compute('st-c5-e3', ['6', '5', '3', '8', '1', '9', '2'], '1.00 1.75 4.00 8.25 9.00').computed,
    ['1.00 1.75 4.00 8.25 9.00']);
  assert.deepEqual(compute('st-c5-e1', ['1 9 4'], '1.00 3.00\n3.00 5.00\n5.00 7.00\n7.00 9.00').computed,
    ['1.00 3.00', '3.00 5.00', '5.00 7.00', '7.00 9.00']);
  const pair = ['3', '0', '1', '2', '2', '3', '4'];
  assert.deepEqual(compute('st-c6-e1', pair, '0.6667').computed, ['0.6667']);
  assert.deepEqual(compute('st-c6-e2', pair, '1.0000').computed, ['1.0000']);
  assert.deepEqual(compute('st-c6-e3', pair, '1.0000\n2.0000').computed, ['1.0000', '2.0000']);
});

test('les cas mathématiques indéfinis, hors bornes ou au milieu d’un arrondi restent non vérifiés', () => {
  const { getExercise } = require('../server/exercises');
  const compute = (id, data) => arithmeticOracle(getExercise(id), { data, expected: '0' });
  assert.equal(compute('st-c4-e2', ['2', '-1', '1']), null);
  assert.equal(compute('st-c6-e2', ['3', '1', '1', '1', '0', '1', '2']), null);
  assert.equal(compute('st-c3-e2', ['2', '10 0', '20 3']), null);
  assert.equal(compute('st-c3-e1', ['200', '1', ...Array(199).fill('0')]), null);
});

test('les trois grilles corrigées et leurs exemples concordent avec les oracles', () => {
  const { getExercise } = require('../server/exercises');
  for (const id of ['al-c3-e3', 'st-c2-e2', 'st-c5-e2']) {
    const exercise = getExercise(id);
    const audit = auditArithmetic(exercise);
    assert.equal(audit.status, 'ok', id);
    assert.equal(audit.cases.length, 3, id);
    assert.deepEqual(audit.warnings, [], id);
    assert.ok(audit.cases.every(entry => entry.eligible && entry.oracle.matchesExpected), id);
    assert.ok(exercise.examples.length > 0, id);
    for (const example of exercise.examples) {
      const oracle = arithmeticOracle(exercise, { data: example.stdin.trim().split(/\r?\n/), expected: example.expected });
      assert.ok(oracle, id);
      assert.equal(oracle.matchesExpected, true, id);
    }
  }
  const frequency = getExercise('st-c2-e2');
  const frequencyAudit = auditArithmetic(frequency);
  assert.match(frequencyAudit.cases[0].sample.heading, /trois modalités/);
  assert.equal(selectCandidate(frequency, frequencyAudit).sample.stdin, 'cas:3');
  const classes = auditArithmetic(getExercise('st-c5-e2'));
  const thirdCase = classes.cases.find(entry => entry.sample.stdin === 'cas:3');
  assert.ok(thirdCase.sample.data.slice(2).includes('20'));
  assert.deepEqual(thirdCase.oracle.computed, ['1 3']);
});

test('un libellé de modalités contradictoire ne sert toujours pas aux variantes', async () => {
  const { getExercise } = require('../server/exercises');
  const frequency = structuredClone(getExercise('st-c2-e2'));
  const originalStarter = frequency.starter;
  frequency.starter = frequency.starter.replace('trois modalités', 'deux modalités');
  assert.notEqual(frequency.starter, originalStarter);
  const audit = auditArithmetic(frequency);
  assert.deepEqual(audit.warnings.map(warning => [warning.selector, warning.declared, warning.observed]), [['cas:1', 2, 3]]);
  assert.equal(audit.cases.find(entry => entry.sample.stdin === 'cas:1').eligible, false);
  assert.equal(selectCandidate(frequency, audit).sample.stdin, 'cas:3');
  const report = await replay({ exercises: [frequency] });
  assert.equal(report.statistiques.oraclesArithmetiquesB1.casAuLibelleContradictoire, 1);
  assert.equal(report.statistiques.exercicesAvecDeuxRejets, 1);
  assert.deepEqual(report.details[0].selectors, ['cas:3']);
});

test('le retour des anciens contrats contradictoires désactive leurs oracles', async () => {
  const { getExercise } = require('../server/exercises');
  const system = structuredClone(getExercise('al-c3-e3'));
  const classes = structuredClone(getExercise('st-c5-e2'));
  const originalSystemBrief = system.brief;
  const originalClassesBrief = classes.brief;
  system.brief = system.brief.replace('deux lignes', 'trois lignes');
  classes.brief = classes.brief.replace('sauf la dernière classe : la dernière classe inclut aussi <code>max</code>', 'y compris la dernière classe');
  assert.notEqual(system.brief, originalSystemBrief);
  assert.notEqual(classes.brief, originalClassesBrief);
  for (const exercise of [system, classes]) {
    assert.equal(auditArithmetic(exercise).status, 'contrat-modifie', exercise.id);
    assert.equal(selectCandidate(exercise), null, exercise.id);
    assert.equal(arithmeticOracle(exercise, collectSamples(exercise)[0]), null, exercise.id);
  }
  const report = await replay({ exercises: [system, classes] });
  assert.equal(report.statistiques.references.acceptees, 2);
  assert.equal(report.statistiques.oraclesArithmetiquesB1.contratsModifies, 2);
  assert.equal(report.statistiques.exercicesNonCouverts, 2);
  assert.equal(report.statistiques.variantes.construites, 0);
  assert.ok(report.exclus.every(exclusion => exclusion.reason === 'contrat arithmétique modifié'));
});

test('systèmes et classes traitent les bornes sans inventer une paire', async () => {
  const { getExercise } = require('../server/exercises');
  const compute = (id, data, expected = '0') => arithmeticOracle(getExercise(id), { data, expected });
  const system = compute('al-c3-e3', ['1 1 5', '2 -1 1'], '2.00\n3.00');
  assert.equal(system.matchesExpected, true);
  const [x, y] = system.computed.map(Number);
  assert.equal(x + y, 5);
  assert.equal(2 * x - y, 1);
  assert.equal(compute('al-c3-e3', ['1 1 2', '2 2 4']), null);
  assert.equal(compute('al-c3-e3', ['8 0 1', '0 1 1']), null);
  const boundaries = compute('st-c5-e2', ['0 10 2', '3', '0', '5', '10'], '1 2');
  assert.equal(boundaries.matchesExpected, true);
  assert.deepEqual(boundaries.variants.map(variant => variant.lines), [['1 1'], ['2 1']]);
  const repeatedMaximum = compute('st-c5-e2', ['0 10 2', '5', '0', '5', '10', '10', '10'], '1 4');
  assert.equal(repeatedMaximum.matchesExpected, true);
  assert.deepEqual(repeatedMaximum.variants.map(variant => variant.lines), [['1 1'], ['2 3']]);
  assert.deepEqual(compute('st-c5-e2', ['0 7 3', '5', '0', '2', '3', '4', '7'], '2 2 1').computed, ['2 2 1']);
  assert.deepEqual(compute('st-c5-e2', ['-5 5 2', '3', '-5', '0', '5'], '1 2').computed, ['1 2']);
  assert.equal(compute('st-c5-e2', ['0 10 0', '1', '5']), null);
  assert.equal(compute('st-c5-e2', ['0 10 2', '2', '5', '11']), null);
  assert.equal(compute('st-c5-e2', ['0 10 2', '2', '5']), null);
  assert.equal(compute('st-c5-e2', ['0 10 2', '1', '2.5']), null);
  const single = structuredClone(getExercise('st-c5-e2'));
  single.starter = '[Cas 1]\n# Données : 0 10 1\n# Données : 1\n# Données : 10\nA_COMPLETER';
  single.solution = '[Cas 1]\n1';
  single.tests = [{ stdin: 'cas:1', expected: '1' }];
  const audit = auditArithmetic(single);
  assert.equal(audit.status, 'ok');
  assert.deepEqual(audit.cases[0].oracle.computed, ['1']);
  assert.equal(audit.cases[0].oracle.variants.length, 1);
  assert.equal(selectCandidate(single, audit), null);
  const report = await replay({ exercises: [single] });
  assert.equal(report.statistiques.exercicesNonCouverts, 1);
  assert.equal(report.statistiques.variantes.construites, 0);
  assert.equal(report.exclus[0].reason, 'aucune paire arithmétique justifiée');
});

test('les classes correspondent aux inégalités exactes sur 225 séries synthétiques', () => {
  const { getExercise } = require('../server/exercises');
  const exercise = getExercise('st-c5-e2');
  let checked = 0;
  for (let minimum = -3; minimum <= 1; minimum++) {
    for (let width = 1; width <= 9; width++) {
      for (let count = 1; count <= 5; count++) {
        const maximum = minimum + width;
        const values = Array.from({ length: width + 1 }, (_, index) => minimum + index);
        const expected = Array.from({ length: count }, (_, index) => values.filter(value => {
          const position = (value - minimum) * count;
          return position >= index * width && (index === count - 1 ? position <= (index + 1) * width : position < (index + 1) * width);
        }).length).join(' ');
        const data = [`${minimum} ${maximum} ${count}`, String(values.length), ...values.map(String)];
        const oracle = arithmeticOracle(exercise, { data, expected });
        assert.ok(oracle, data.join(' / '));
        assert.equal(oracle.matchesExpected, true, data.join(' / '));
        checked++;
      }
    }
  }
  assert.equal(checked, 225);
});

test('les nouveaux oracles repèrent un attendu erroné même accepté par le correcteur', async () => {
  const { getExercise } = require('../server/exercises');
  const examples = [
    ['al-c3-e3', 0, '2.00\n1.00', '1.00\n2.00'],
    ['st-c5-e2', 2, '1 2', '1 3']
  ];
  const modified = [];
  for (const [id, index, incorrect, correct] of examples) {
    const exercise = structuredClone(getExercise(id));
    const sample = collectSamples(exercise)[index];
    const mutation = replaceCaseOutput(sample, incorrect.split('\n'));
    assert.equal(mutation.valid, true, id);
    exercise.solution = mutation.code;
    exercise.tests[index].expected = incorrect;
    assert.equal((await evaluate(exercise, exercise.solution)).state, 'acceptee', id);
    const audit = auditArithmetic(exercise);
    assert.equal(audit.status, 'attendu-divergent', id);
    assert.equal(audit.mismatches.length, 1, id);
    assert.equal(audit.mismatches[0].selector, `cas:${index + 1}`, id);
    assert.equal(audit.mismatches[0].expected, incorrect, id);
    assert.equal(audit.mismatches[0].independentlyComputed, correct, id);
    assert.equal(selectCandidate(exercise, audit), null, id);
    modified.push(exercise);
  }
  const report = await replay({ exercises: modified });
  assert.equal(report.statistiques.references.acceptees, 2);
  assert.equal(report.statistiques.oraclesArithmetiquesB1.attendusDifferents, 2);
  assert.equal(report.statistiques.exercicesNonCouverts, 2);
  assert.equal(report.statistiques.variantes.construites, 0);
  assert.ok(report.exclus.every(exclusion => exclusion.reason === 'attendu incompatible avec l’oracle arithmétique'));
});

test('un attendu erroné est signalé même si le correcteur accepte la référence correspondante', async () => {
  const { getExercise } = require('../server/exercises');
  const exercise = structuredClone(getExercise('st-c3-e2'));
  const thirdCase = collectSamples(exercise)[2];
  const mutation = replaceCaseOutput(thirdCase, ['5.40']);
  assert.equal(mutation.valid, true);
  exercise.solution = mutation.code;
  exercise.tests[2].expected = '5.40';
  assert.equal((await evaluate(exercise, exercise.solution)).state, 'acceptee');
  const audit = auditArithmetic(exercise);
  assert.equal(audit.status, 'attendu-divergent');
  assert.equal(audit.mismatches.length, 1);
  assert.equal(audit.mismatches[0].selector, 'cas:3');
  assert.equal(audit.mismatches[0].expected, '5.40');
  assert.equal(audit.mismatches[0].independentlyComputed, '5.30');
  assert.equal(selectCandidate(exercise, audit), null);
  const report = await replay({ exercises: [exercise] });
  assert.equal(report.statistiques.references.acceptees, 1);
  assert.equal(report.statistiques.oraclesArithmetiquesB1.attendusDifferents, 1);
  assert.equal(report.statistiques.exercicesNonCouverts, 1);
  assert.equal(report.statistiques.variantes.construites, 0);
  assert.equal(report.anomaliesOracles[0].independentlyComputed, '5.30');
  assert.match(report.exclus[0].reason, /attendu incompatible/);
});

test('un indice modifié désactive les oracles B1 au lieu de recycler une mutation générique', async () => {
  const { getExercise } = require('../server/exercises');
  const exercise = structuredClone(getExercise('st-c6-e1'));
  exercise.hints.push('Convention modifiée.');
  assert.equal(auditArithmetic(exercise).status, 'contrat-modifie');
  assert.equal(selectCandidate(exercise), null);
  const report = await replay({ exercises: [exercise] });
  assert.equal(report.statistiques.references.acceptees, 1);
  assert.equal(report.statistiques.oraclesArithmetiquesB1.contratsModifies, 1);
  assert.equal(report.statistiques.exercicesNonCouverts, 1);
  assert.equal(report.statistiques.variantes.construites, 0);
});

test('les calculs reconstruits sont désactivés si leur énoncé a changé', () => {
  const { getExercise } = require('../server/exercises');
  const exercise = getExercise('al-c1-e1');
  assert.ok(exercise);
  const candidate = selectCandidate(exercise);
  if (candidate?.method === 'calcul-reconstruit') {
    assert.equal(candidate.variants.length, 2);
    const modified = { ...exercise, brief: `${exercise.brief} ` };
    assert.notEqual(selectCandidate(modified)?.method, 'calcul-reconstruit');
  }
});

test('rejeu du catalogue : résultats reproductibles et comptes cohérents', async context => {
  const first = await replay();
  const second = await replay();
  assert.deepEqual(second, first);
  const stats = first.statistiques;
  assert.ok(stats.exercicesAnalyse > 0);
  assert.ok(stats.exercicesAvecDeuxVariantesEvaluees > 0);
  assert.equal(stats.references.acceptees + stats.references.rejetees + stats.references.nonEvaluees, stats.exercicesAnalyse);
  assert.equal(stats.exercicesAvecDeuxVariantesEvaluees + stats.exercicesNonCouverts, stats.exercicesAnalyse);
  assert.equal(stats.variantes.rejetees + stats.variantes.acceptees + stats.variantes.nonEvaluees + stats.variantes.invalides, stats.variantes.construites);
  assert.equal(first.exclus.length, stats.exercicesNonCouverts);
  assert.equal(stats.references.rejetees, 0);
  assert.equal(stats.references.nonEvaluees, 0);
  assert.equal(stats.variantes.acceptees, 0);
  assert.equal(stats.variantes.nonEvaluees, 0);
  assert.equal(stats.variantes.invalides, 0);
  assert.equal(stats.exercicesAvecDeuxRejets, stats.exercicesAvecDeuxVariantesEvaluees);
  assert.equal(stats.variantes.rejetees, 2 * stats.exercicesAvecDeuxRejets);
  for (const detail of first.details.filter(item => item.covered)) {
    assert.equal(detail.reference, 'acceptee', detail.id);
    assert.equal(detail.variants.length, 2, detail.id);
    for (const variant of detail.variants) {
      assert.equal(variant.outcome.state, 'rejetee', detail.id);
      assert.equal(variant.outcome.reason, 'wrong_output', detail.id);
      assert.equal(variant.outcome.testIndex, variant.testIndex, detail.id);
    }
  }
  assert.match(first.empreinteCatalogueSha256, /^[a-f0-9]{64}$/);
  assert.ok(first.limites.some(limit => limit.includes('pas la validité pédagogique')));
  context.diagnostic(JSON.stringify({ empreinteCatalogueSha256: first.empreinteCatalogueSha256, statistiques: stats, historique: first.historique }));
});
