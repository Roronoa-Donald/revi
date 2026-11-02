'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const b1 = require('../server/content/b1-stats/chapitres-1-3');
const b1Exercises = require('../server/exercises/b1-stats');
const sampling = require('../server/content/b3-etude-quantitative/chapitre2');
const observation = require('../server/content/b3-etude-quantitative/chapitre4');
const inference = require('../server/content/b3-etude-quantitative/chapitre5');
const samplingExercises = require('../server/exercises/b3-etude-quantitative/chapitre2');
const observationExercises = require('../server/exercises/b3-etude-quantitative/chapitre4');
const { runTests } = require('../server/exercises/runner');
const { toClient } = require('../server/exercises');
const execution = require('../server/services/execution');

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

function exerciseById(exercises, id) {
  const exercise = exercises.find(item => item.id === id);
  assert.ok(exercise, `Exercice introuvable : ${id}`);
  return exercise;
}

function casesOf(exercise) {
  const cases = new Map();
  let current;
  for (const line of exercise.starter.split('\n')) {
    const header = /^\[Cas (\d+) — (.+)\]$/.exec(line);
    if (header) {
      current = { number: Number(header[1]), label: header[2], input: [] };
      assert.equal(cases.has(current.number), false);
      cases.set(current.number, current);
    } else if (current && line.startsWith('# Données : ')) {
      current.input.push(line.slice('# Données : '.length));
    }
  }
  return cases;
}

function checkExercise(exercise, solve) {
  const cases = casesOf(exercise);
  for (const example of exercise.examples) {
    assert.equal(example.expected, solve(example.stdin), `${exercise.id} : exemple`);
  }
  for (const entry of exercise.tests) {
    const selector = /^cas:(\d+)$/.exec(entry.stdin);
    assert.ok(selector);
    const selected = cases.get(Number(selector[1]));
    assert.ok(selected);
    assert.equal(entry.label, selected.label);
    const expected = solve(selected.input.join('\n'));
    assert.equal(entry.expected, expected, `${exercise.id} : ${entry.stdin}`);
    assert.ok(exercise.solution.includes(`[Cas ${selected.number} — ${selected.label}]\n${expected}\n`));
  }
  return cases;
}

function fieldsOf(input) {
  return Object.fromEntries([...input.matchAll(/(\w+)=([^\s]+)/g)].map(match => [match[1], match[2]]));
}

function frequencies(input) {
  const [count, ...values] = input.split('\n').map(Number);
  assert.equal(count, values.length);
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) || 0) + 1);
  return [...counts].sort(([left], [right]) => left - right)
    .map(([value, frequency]) => `${value} ${(100 * frequency / count).toFixed(2)}`).join('\n');
}

function quotaResult(input) {
  const fields = fieldsOf(input);
  const targets = Object.fromEntries(fields.cibles.split(',').map(part => {
    const [name, value] = part.split(':');
    return [name, Number(value)];
  }));
  const observed = fields.obs.split(',').map(part => {
    const [name, value] = part.split(':');
    return [name, Number(value)];
  });
  const total = observed.reduce((sum, [, value]) => sum + value, 0);
  const difference = Math.max(...observed.map(([name, value]) => Math.abs(100 * value / total - targets[name])));
  const verdict = difference <= 3 ? 'OUI' : 'NON';
  return `AUDIT_QUOTAS: ${fields.etude} -> TOTAL_OBS=${total} | ECART_MAX=${difference.toFixed(1)} points | CONFORMITE_QUOTAS=${verdict}`;
}

function agreementResult(input) {
  const fields = fieldsOf(input);
  const bothYes = Number(fields.OO);
  const firstYes = Number(fields.ON);
  const secondYes = Number(fields.NO);
  const bothNo = Number(fields.NN);
  const total = bothYes + firstYes + secondYes + bothNo;
  assert.ok(total > 0);
  const observed = (bothYes + bothNo) / total;
  const expected = ((bothYes + firstYes) * (bothYes + secondYes) +
    (secondYes + bothNo) * (firstYes + bothNo)) / total ** 2;
  const kappa = expected === 1 ? 'INDEFINI' : ((observed - expected) / (1 - expected)).toFixed(3);
  return `ACCORD_OBSERVATEURS: ${fields.session} -> ACCORDS=${bothYes + bothNo}/${total} (${(observed * 100).toFixed(1)}%) | PE=${(expected * 100).toFixed(1)}% | KAPPA=${kappa}`;
}

function stratifiedResult(input) {
  const fields = fieldsOf(input);
  const sampleSize = Number(fields.n);
  const strata = fields.strates.split(',').map((part, index) => {
    const [name, rawSize] = part.split(':');
    return { name, size: Number(rawSize), index };
  });
  const population = strata.reduce((sum, stratum) => sum + stratum.size, 0);
  const minimaEntries = fields.minima
    ? fields.minima.split(',').map(part => {
      const [name, value] = part.split(':');
      return [name, Number(value)];
    })
    : strata.map(stratum => [stratum.name, 0]);
  const minima = new Map(minimaEntries);
  const names = new Set(strata.map(stratum => stratum.name));
  if (names.size !== strata.length || minima.size !== strata.length || minimaEntries.length !== strata.length ||
      !Number.isInteger(sampleSize) || sampleSize < 1 || sampleSize > population || population <= 0 ||
      strata.some(stratum => !Number.isInteger(stratum.size) || stratum.size < 0 || !minima.has(stratum.name) ||
        !Number.isInteger(minima.get(stratum.name)) || minima.get(stratum.name) < 0 || minima.get(stratum.name) > stratum.size) ||
      [...minima.values()].reduce((sum, minimum) => sum + minimum, 0) > sampleSize) {
    return `STRATIFICATION: ${fields.etude} -> IMPOSSIBLE (CONTRAINTES)`;
  }
  const required = [...minima.values()].reduce((sum, minimum) => sum + minimum, 0);
  const toAllocate = sampleSize - required;
  const residualCapacity = population - required;
  for (const stratum of strata) {
    const capacity = stratum.size - minima.get(stratum.name);
    stratum.allocated = minima.get(stratum.name) + (toAllocate ? Math.floor(toAllocate * capacity / residualCapacity) : 0);
    stratum.remainder = toAllocate ? (toAllocate * capacity) % residualCapacity : 0;
  }
  const remainder = sampleSize - strata.reduce((sum, stratum) => sum + stratum.allocated, 0);
  const ranked = [...strata].sort((left, right) => right.remainder - left.remainder || left.index - right.index);
  for (const stratum of ranked.slice(0, remainder)) stratum.allocated += 1;
  assert.equal(strata.reduce((sum, stratum) => sum + stratum.allocated, 0), sampleSize);
  assert.ok(strata.every(stratum => stratum.allocated >= minima.get(stratum.name) && stratum.allocated <= stratum.size));
  return [`STRATIFICATION: ${fields.etude} (N_TOTAL=${population}, n_CIBLE=${sampleSize})`,
    ...strata.map(stratum => `  - ${stratum.name}: N_pop=${stratum.size} (W=${(100 * stratum.size / population).toFixed(1)}%) -> n_sonde=${stratum.allocated} (${(100 * stratum.allocated / sampleSize).toFixed(1)}%)`)
  ].join('\n');
}

test('F08 — le QCM accepte les distributions plurimodales', () => {
  const question = b1[2].questions.find(item => /mode d’une série|mode\(s\)/i.test(item.stem));
  assert.ok(question);
  assert.match(question.opts[question.correct], /(?:plusieurs|toutes)/i);
  assert.match(question.opts[question.correct], /(?:maximal|fréquen)/i);
  assert.match(question.exp, /(?:égalité|plusieurs)/i);
  const counts = new Map([[1, 2], [2, 2], [3, 1]]);
  const maximum = Math.max(...counts.values());
  assert.deepEqual([...counts].filter(([, count]) => count === maximum).map(([value]) => value), [1, 2]);
});

test('F09 — la p-valeur est conditionnée par H0 et les hypothèses du modèle', () => {
  const card = inference.flashcards.find(item => /p.valeur/i.test(item.q));
  assert.ok(card);
  assert.match(card.a, /au moins aussi extrême/i);
  assert.match(card.a, /H.?0/i);
  assert.match(card.a, /modèle/i);
  assert.match(card.a, /(?:n’est|pas).{0,100}probabilité/i);
  const question = inference.questions.find(item => /p.valeur/i.test(item.stem));
  assert.match(question.opts[question.correct], /au moins aussi extrême/i);
  assert.match(question.opts[question.correct], /modèle/i);
  assert.doesNotMatch(JSON.stringify(inference), /probabilité que (?:les résultats|l’écart).{0,25}(?:hasard)/i);
  assert.match(read('b3-etude-quantitative/chapitres/cartes.html'), /hypothèses du modèle/i);
});

test('F160 — les classes couvrent chaque borne et le maximum exactement une fois', () => {
  const section = b1[0].sections.find(item => /classes/i.test(item.title));
  assert.ok(section);
  const classes = [...section.html.matchAll(/<tr><td>\[(\d+)\s*;\s*(\d+)(\[|\])<\/td>/g)]
    .map(match => ({ min: Number(match[1]), max: Number(match[2]), inclusive: match[3] === ']' }));
  assert.equal(classes.length, 4);
  for (const value of [150, 160, 170, 180, 190]) {
    assert.equal(classes.filter(item => value >= item.min && (value < item.max || item.inclusive && value === item.max)).length, 1, `borne ${value}`);
  }
  assert.match(section.html, /dernière classe/i);
  assert.match(read('b1-stats/chapitres/chapitre1.html'), /\[180\s*;\s*190\]/);
});

test('F161 — une égalité moyenne-médiane ne prouve pas la symétrie', () => {
  const values = [0, 1, 2, 2, 5];
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  const median = values[Math.floor(values.length / 2)];
  assert.equal(mean, 2);
  assert.equal(median, 2);
  assert.notEqual(values.filter(value => value === 0).length, values.filter(value => value === 2 * mean).length);
  assert.match(JSON.stringify(b1[2]), /0, 1, 2, 2, 5/);
  assert.match(JSON.stringify(b1[2]), /(?:réciproque|ne prouve pas|ne garantit pas)/i);
  assert.doesNotMatch(JSON.stringify(b1[2]), /ne coïncident que pour une distribution symétrique/i);
});

test('F162 — les centres de classes sont pondérés par les effectifs', () => {
  const question = b1[2].questions.find(item => /série en classes, la moyenne/i.test(item.stem));
  assert.ok(question);
  assert.match(question.opts[question.correct], /centres/i);
  assert.match(question.opts[question.correct], /effectifs/i);
  assert.match(question.exp, /pondér/i);
  const weighted = (5 * 1 + 15 * 3) / 4;
  assert.equal(weighted, 12.5);
  assert.notEqual(weighted, (5 + 15) / 2);
  assert.match(read('b1-stats/chapitres/simulateur-examen.html'), /centres des classes.{0,80}effectifs/i);
});

test('F175 — le titre, les données et les fréquences désignent trois modalités', () => {
  const exercise = exerciseById(b1Exercises, 'st-c2-e2');
  const cases = checkExercise(exercise, frequencies);
  const first = cases.get(1);
  assert.match(first.label, /trois modalités/i);
  assert.deepEqual(first.input.map(Number), [5, 1, 2, 2, 3, 3]);
  assert.equal(new Set(first.input.slice(1)).size, 3);
  assert.match(read('b1-stats/chapitres/chapitre2.html'), /Cinq valeurs, trois modalités/i);
});

test('F176 — accord brut, marges et kappa ne constituent pas une garantie universelle', () => {
  const exercise = exerciseById(observationExercises, 'eq3-c4-e3');
  const cases = checkExercise(exercise, agreementResult);
  assert.match(cases.get(2).input[0], /OO=90 ON=5 NO=5 NN=0/);
  assert.match(exercise.tests[1].expected, /90\.0%.*90\.5%.*-0\.053/);
  assert.match(exercise.tests[2].expected, /KAPPA=INDEFINI/);
  assert.match(JSON.stringify(observation), /kappa/i);
  assert.match(JSON.stringify(observation), /0[,.]053/);
  assert.match(JSON.stringify(observation), /85% ne garantit ni l’objectivité/i);
  assert.doesNotMatch(JSON.stringify(observation), /(?:85\s*%|85\.0\\?%).{0,90}(?:gage scientifique|garantit l’objectivité|dépourvue d’ambiguïté)/i);
  assert.match(read('b3-etude-quantitative/chapitres/formules.html'), /kappa/i);
});

test('F177 — respecter des quotas ne démontre pas la représentativité', () => {
  const exercise = exerciseById(samplingExercises, 'eq3-c2-e3');
  const cases = checkExercise(exercise, quotaResult);
  assert.match(exercise.brief, /ne (?:démontre|garantit|prouve) pas.{0,100}représentativ/i);
  assert.match(cases.get(3).input[0], /cibles=A:50\.0,B:50\.0 obs=A:5,B:5/);
  const population = [{ high: 10, low: 40 }, { high: 10, low: 40 }];
  const sample = [{ high: 5, low: 0 }, { high: 5, low: 0 }];
  assert.equal(population[0].high + population[0].low, population[1].high + population[1].low);
  assert.equal(sample[0].high + sample[0].low, sample[1].high + sample[1].low);
  assert.equal(population.reduce((sum, group) => sum + group.high, 0) / 100, 0.2);
  assert.equal(sample.reduce((sum, group) => sum + group.high, 0) / 10, 1);
  assert.match(JSON.stringify(sampling), /(?:20\s*%|20 pour cent)/i);
  assert.doesNotMatch(JSON.stringify(sampling), /quotas et la stratification assurent la représentativité/i);
});

test('F178 — les plus forts restes conservent n et respectent les capacités', () => {
  const exercise = exerciseById(samplingExercises, 'eq3-c2-e2');
  assert.match(exercise.brief, /plus forts restes/i);
  assert.match(exercise.brief, /(?:égalité|ex æquo).{0,50}ordre/i);
  assert.match(exercise.brief, /(?:capacit|n_i.{0,20}N_i)/i);
  const cases = checkExercise(exercise, stratifiedResult);
  assert.match(cases.get(3).input[0], /n=1 strates=A:1,B:1,C:1/);
  assert.match(exercise.tests[2].expected, /A: N_pop=1.*n_sonde=1/s);
  assert.match(cases.get(4).input[0], /minima=A:1,B:0,C:1/);
  assert.match(exercise.tests[3].expected, /C: N_pop=4.*n_sonde=3/);
  assert.match(exercise.tests[4].expected, /IMPOSSIBLE \(CONTRAINTES\)/);
  assert.match(exercise.tests[5].expected, /IMPOSSIBLE \(CONTRAINTES\)/);
  assert.equal(stratifiedResult('STRATIFIE etude=MinTropGrand n=2 strates=A:1,B:3 minima=A:2,B:0'), 'STRATIFICATION: MinTropGrand -> IMPOSSIBLE (CONTRAINTES)');
  assert.match(stratifiedResult('STRATIFIE etude=MinExact n=2 strates=A:1,B:2,C:4 minima=A:1,B:0,C:1'), /n_sonde=1 \(50\.0%\).*n_sonde=0 \(0\.0%\).*n_sonde=1 \(50\.0%\)/s);
  assert.match(JSON.stringify(sampling), /plus forts restes/i);
  assert.match(JSON.stringify(sampling), /attribuer d’abord les minima/i);
  assert.match(JSON.stringify(sampling), /capacités résiduelles/i);
  assert.match(read('b3-etude-quantitative/chapitres/formules.html'), /plus forts restes/i);
});

test('Les corrigés des ateliers passent le vrai correcteur et des erreurs ciblées sont rejetées', async () => {
  const cases = [
    [exerciseById(b1Exercises, 'st-c2-e2'), '1 20.00\n2 40.00\n3 40.00', '1 40.00\n2 40.00\n3 40.00'],
    [exerciseById(samplingExercises, 'eq3-c2-e2'), 'A: N_pop=1 (W=33.3%) -> n_sonde=1 (100.0%)', 'A: N_pop=1 (W=33.3%) -> n_sonde=0 (0.0%)'],
    [exerciseById(samplingExercises, 'eq3-c2-e2'), 'STRATIFICATION: MiniBloque -> IMPOSSIBLE (CONTRAINTES)', 'STRATIFICATION: MiniBloque -> VALIDE'],
    [exerciseById(samplingExercises, 'eq3-c2-e3'), 'ECART_MAX=0.0 points | CONFORMITE_QUOTAS=OUI', 'ECART_MAX=0.0 points | CONFORMITE_QUOTAS=NON'],
    [exerciseById(observationExercises, 'eq3-c4-e3'), 'KAPPA=-0.053', 'KAPPA=0.053'],
    [exerciseById(observationExercises, 'eq3-c4-e3'), 'KAPPA=INDEFINI', 'KAPPA=1.000']
  ];
  for (const [exercise, expected, incorrect] of cases) {
    const correct = await runTests(exercise, exercise.solution, { execute: execution.execute });
    assert.equal(correct.passed, correct.total, exercise.id);
    assert.ok(exercise.solution.includes(expected));
    const mutated = await runTests(exercise, exercise.solution.replace(expected, incorrect), { execute: execution.execute });
    assert.equal(mutated.stop.reason, 'wrong_output', exercise.id);
    assert.ok(mutated.passed < mutated.total, exercise.id);
  }
});

test('Les ateliers générés et leur projection publique ne divulguent pas les corrigés', () => {
  const fixtures = [
    [exerciseById(b1Exercises, 'st-c2-e2'), 'b1-stats/chapitres/chapitre2.html'],
    [exerciseById(samplingExercises, 'eq3-c2-e2'), 'b3-etude-quantitative/chapitres/chapitre2.html'],
    [exerciseById(samplingExercises, 'eq3-c2-e3'), 'b3-etude-quantitative/chapitres/chapitre2.html'],
    [exerciseById(observationExercises, 'eq3-c4-e3'), 'b3-etude-quantitative/chapitres/chapitre4.html']
  ];
  for (const [exercise, pagePath] of fixtures) {
    const page = read(pagePath);
    const projection = toClient(exercise);
    assert.ok(page.includes(`data-exercise="${exercise.id}"`));
    assert.equal(Object.hasOwn(projection, 'tests'), false);
    assert.equal(Object.hasOwn(projection, 'solution'), false);
    for (const entry of exercise.tests) assert.equal(page.includes(entry.expected), false, exercise.id);
  }
});
