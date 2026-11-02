'use strict';

const fs = require('node:fs');
const vm = require('node:vm');
const crypto = require('node:crypto');
const catalogue = require('/project/server/exercises/docker.js');
const { isGradingSuspended } = require('/project/server/exercises/grading-policy.js');

const source = fs.readFileSync('/project/tests/docker-lot1.test.js', 'utf8');
const marker = /\bconst\s+independentCases\s*=\s*\{/g;
const beginnings = [...source.matchAll(marker)];
if (beginnings.length !== 1) throw new Error('Déclaration des témoins ambiguë');
const witnessStart = beginnings[0].index;
const witnessEndMatch = /\n[ \t]*};[ \t]*(?:\n|$)/.exec(source.slice(witnessStart));
if (!witnessEndMatch) throw new Error('Fin des témoins introuvable');
const witnessEnd = witnessStart + witnessEndMatch.index + witnessEndMatch[0].length;
const generatorStart = source.indexOf('function solutionFor(');
const generatorEnd = source.lastIndexOf('\n}');
if (generatorStart < witnessEnd || generatorEnd <= generatorStart ||
    source.indexOf('function solutionFor(', generatorStart + 1) !== -1) {
  throw new Error('Bloc de génération introuvable ou ambigu');
}
const profileText = source.slice(0, witnessStart) + '\n<bloc_dynamique>\n' +
  source.slice(witnessEnd, generatorStart) + '\n<bloc_dynamique>\n' + source.slice(generatorEnd);
const profile = crypto.createHash('sha256').update(profileText).digest('hex');
const knownProfiles = [
  'e1c8d7cc905e1dbd0c575129456240d80d771201500abb3cdba9b2352049abd4',
  'f6c0628ffb189544b09bf64189b4975177a6db0bfc900aec768ba9b65c568c76'
];
if (!knownProfiles.includes(profile)) throw new Error('Profil des tests Docker non reconnu');

const witnessDeclaration = source.slice(witnessStart, witnessEnd);
const previous = JSON.parse(new vm.Script(`${witnessDeclaration}\nJSON.stringify(independentCases);`)
  .runInNewContext(Object.create(null), { timeout: 2000 }));
const identifiers = new Set(catalogue.map(exercise => exercise.id));
if (catalogue.length !== 18 || identifiers.size !== 18 ||
    JSON.stringify([...identifiers].sort()) !== JSON.stringify(Object.keys(previous).sort())) {
  throw new Error('Inventaire Docker ou anciens témoins incohérent');
}

const historical = [];
for (const exercise of catalogue) {
  for (const [origin, samples] of [['exemple_catalogue', exercise.examples], ['test_catalogue', exercise.tests]]) {
    if (!Array.isArray(samples)) throw new Error(`Entrées historiques absentes : ${exercise.id}`);
    samples.forEach((sample, index) => {
      if (typeof sample.stdin !== 'string') throw new Error(`Entrée historique invalide : ${exercise.id}`);
      historical.push({ id: exercise.id, origin, index: index + 1, stdin: sample.stdin });
    });
  }
  const witness = previous[exercise.id];
  if (!witness || typeof witness.stdin !== 'string') throw new Error(`Témoin absent : ${exercise.id}`);
  historical.push({ id: exercise.id, origin: 'temoin_preexistant', index: 1, stdin: witness.stdin });
}
historical.push({ id: 'dk2-c1-e2', origin: 'test_catalogue_avant_correction', index: 1,
  stdin: '1 100 256\n5000 2048' });

const generated = [];
const generatedTests = [];
const context = {
  Buffer,
  exercises: [...identifiers].map(id => ({ id, solution: id, tests: [{ label: 'Entiers décimaux au-delà de 2^53' }] })),
  assert: { equal() {}, ok() {} },
  LIMITS: { stdin: 8192 },
  MAX_TESTS: 7,
  runSolution(id, stdin) {
    if (!identifiers.has(id) || typeof stdin !== 'string') throw new Error('Entrée générée invalide');
    generated.push({ id, stdin, origin: 'test_genere_preexistant', index: generated.length + 1 });
    return '';
  },
  test(name, callback) {
    if (typeof name !== 'string' || typeof callback !== 'function') throw new Error('Test généré invalide');
    const before = generated.length;
    callback();
    const count = generated.length - before;
    if (!count) throw new Error(`Test généré sans entrée : ${name}`);
    generatedTests.push({ name, count });
  },
};
new vm.Script(source.slice(generatorStart, generatorEnd), { filename: 'docker-lot1.test.js' })
  .runInNewContext(context, { timeout: 5000 });
if (!generated.length || !generatedTests.length) throw new Error('Générateurs historiques non lus');
historical.push(...generated);

const literals = [];
const literalContext = vm.createContext(Object.create(null));
const stringPattern = /'(?:\\[\s\S]|[^'\\\r\n])*'|"(?:\\[\s\S]|[^"\\\r\n])*"|`(?:\\[\s\S]|[^`\\])*`/g;
for (const match of source.matchAll(stringPattern)) {
  if (match[0][0] === '`' && match[0].includes('${')) continue;
  try {
    const value = new vm.Script(match[0]).runInContext(literalContext, { timeout: 50 });
    if (typeof value === 'string') literals.push(value);
  } catch {}
}

process.stdout.write(JSON.stringify({
  node: process.version,
  suspension: isGradingSuspended('docker'),
  profile,
  historique: historical,
  tests_generes: generatedTests,
  source_tests: source,
  litteraux_tests: literals,
  exercices: catalogue.map(exercise => ({ ...exercise, __sources: ['docker.js'] })),
}));
