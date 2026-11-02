'use strict';

const fs = require('node:fs');
const vm = require('node:vm');
const { createHash } = require('node:crypto');

const [cataloguePath, testPath, policyPath, ...legacyPaths] = process.argv.slice(2);
if (!cataloguePath || !testPath || !policyPath || legacyPaths.length !== 6) {
  throw new Error('Catalogue, test, politique et six modules historiques requis');
}
const exercises = require(cataloguePath);
const { isGradingSuspended } = require(policyPath);
const source = fs.readFileSync(testPath, 'utf8');
if (!Array.isArray(exercises) || exercises.length !== 18 || new Set(exercises.map(item => item.id)).size !== 18) {
  throw new Error('Inventaire GitHub B3 inattendu');
}

const witnessStarts = [...source.matchAll(/\bconst\s+independent\s*=\s*\{/g)];
const preludeStarts = [...source.matchAll(/\bconst\s+hashContent\s*=/g)];
if (witnessStarts.length !== 1 || preludeStarts.length !== 1 || preludeStarts[0].index >= witnessStarts[0].index) {
  throw new Error('Bloc de témoins historiques absent ou ambigu');
}
const witnessStart = witnessStarts[0].index;
const witnessEnding = /\n[ \t]*};[ \t]*(?:\n|$)/.exec(source.slice(witnessStart));
if (!witnessEnding) throw new Error('Fin du bloc des témoins introuvable');
const witnessEnd = witnessStart + witnessEnding.index + witnessEnding[0].length;
const witnesses = JSON.parse(new vm.Script(
  source.slice(preludeStarts[0].index, witnessStart) + source.slice(witnessStart, witnessEnd) +
  '\nJSON.stringify(independent);'
).runInNewContext({ Buffer, createHash }, { timeout: 2000 }));

const generatedStart = source.indexOf('function randomGenerator(');
const generatedEnd = source.indexOf("\ntest('la route refuse", generatedStart);
const objectIds = [...source.matchAll(/^\s*const\s+objectId\s*=\s*[^;\n]+;/gm)];
if (generatedStart < 0 || generatedEnd <= generatedStart || objectIds.length !== 1 ||
    source.indexOf('function randomGenerator(', generatedStart + 1) !== -1) {
  throw new Error('Générateurs historiques absents ou ambigus');
}
const blocks = [[witnessStart, witnessEnd], [generatedStart, generatedEnd]].sort((left, right) => left[0] - right[0]);
let profileText = '';
let cursor = 0;
for (const [start, end] of blocks) {
  if (start < cursor || end <= start) throw new Error('Blocs historiques chevauchants');
  profileText += source.slice(cursor, start) + '\n<bloc_dynamique>\n';
  cursor = end;
}
profileText += source.slice(cursor);
const profile = createHash('sha256').update(profileText).digest('hex');
const expectedProfile = '85f2f3b0818f95e7eb4cebc88fd57f9084e1434e84e9bf3186d8774e4cc7b245';
if (profile !== expectedProfile) throw new Error('Profil des tests historiques non reconnu');

const generated = [];
const generatedTests = [];
const identifiers = new Set(exercises.map(item => item.id));
const legacy = legacyPaths.flatMap(file => require(file)).map(item => ({
  id: item.id,
  examples: item.examples,
  tests: item.tests,
}));
if (legacy.length !== 18 || new Set(legacy.map(item => item.id)).size !== 18 ||
    legacy.some(item => !identifiers.has(item.id) || !Array.isArray(item.examples) || !Array.isArray(item.tests))) {
  throw new Error('Inventaire des modules de chapitre historiques incomplet');
}
const context = {
  Buffer,
  createHash,
  exercises: [...identifiers].map(id => ({ id, solution: id })),
  assert: { equal() {} },
  runSolution(id, stdin) {
    if (!identifiers.has(id) || typeof stdin !== 'string') throw new Error('Entrée historique invalide');
    generated.push({ id, stdin });
    return '';
  },
  test(name, callback) {
    const before = generated.length;
    if (typeof name !== 'string' || typeof callback !== 'function') throw new Error('Test historique invalide');
    callback();
    const count = generated.length - before;
    if (!count) throw new Error('Test historique sans entrée capturée');
    generatedTests.push({ name, count });
  },
};
new vm.Script(objectIds[0][0] + '\n' + source.slice(generatedStart, generatedEnd))
  .runInNewContext(context, { timeout: 5000 });
if (generated.length !== 150 || Object.keys(witnesses).length !== 18 ||
    [...identifiers].some(id => typeof witnesses[id]?.stdin !== 'string')) {
  throw new Error('Inventaire des entrées historiques incomplet');
}
process.stdout.write(JSON.stringify({
  node: process.version,
  suspension: isGradingSuspended('b3-github'),
  profile,
  exercises,
  legacy,
  witnesses,
  generated,
  generatedTests,
}));
