'use strict';

const fs = require('node:fs');
const vm = require('node:vm');
const crypto = require('node:crypto');
const { MAX_TESTS } = require('/project/server/exercises/runner');
const { isGradingSuspended } = require('/project/server/exercises/grading-policy');

const courses = [
  { course: 'csharp', file: 'csharp-lot1.test.js', name: 'mutations', type: 'replace' },
  { course: 'docker', file: 'docker-lot1.test.js', name: 'mutants', type: 'labelled' },
  { course: 'b3-linux', file: 'b3-linux-lot1.test.js', name: 'mutations', type: 'replace' },
  { course: 'b3-github', file: 'b3-github-lot1.test.js', name: 'mutations', type: 'labelled-callback' },
  { course: 'b1-sql', file: 'sql-lot1-variants.test.js', name: 'crossVariants', type: 'sql' }
];

const previous = JSON.parse(fs.readFileSync('/project/corrections/fixtures/variantes-suspendues-avant-partie2.json', 'utf8'));
if (previous.version !== 1 || !previous.cours) throw new Error('Archive des variantes historiques invalide.');

function sha(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function extractObject(file, name) {
  const source = fs.readFileSync(`/project/tests/${file}`, 'utf8');
  const marker = new RegExp(`\\bconst\\s+${name}\\s*=\\s*\\{`, 'g');
  const beginnings = [...source.matchAll(marker)];
  if (beginnings.length !== 1) throw new Error(`Déclaration ${name} introuvable ou ambiguë : ${file}`);
  const start = beginnings[0].index;
  const rest = source.slice(start);
  const ending = /\n[ \t]*};[ \t]*(?:\n|$)/.exec(rest);
  if (!ending) throw new Error(`Fin de déclaration introuvable : ${file}`);
  const declaration = rest.slice(0, ending.index + ending[0].length);
  const value = new vm.Script(`${declaration}\nJSON.stringify(${name});`, { filename: file })
    .runInNewContext(Object.create(null), { timeout: 2000 });
  return JSON.parse(value);
}

function activeCases(exercise) {
  if (!Array.isArray(exercise.tests)) throw new Error(`Tests absents : ${exercise.id}`);
  const cases = exercise.tests.slice(0, MAX_TESTS).map((sample, index) => ({
    origin: 'test_cache', index: index + 1, sample
  }));
  if (exercise.verifyFirstExample === true) {
    const example = Array.isArray(exercise.examples) ? exercise.examples[0] : null;
    if (exercise.language === 'analyse' || !example || typeof example.stdin !== 'string' ||
        typeof example.expected !== 'string') throw new Error(`Exemple actif invalide : ${exercise.id}`);
    cases.push({ origin: 'exemple_verifie', index: 1, sample: { ...example, label: 'Exemple affiché' } });
  }
  if (!cases.length) throw new Error(`Aucun cas actif : ${exercise.id}`);
  for (const entry of cases) {
    if (typeof entry.sample.stdin !== 'string' || typeof entry.sample.expected !== 'string') {
      throw new Error(`Cas actif invalide : ${exercise.id}`);
    }
  }
  return cases;
}

function materialize(exercise, definition, type) {
  if (!Array.isArray(definition) || definition.length < 2) throw new Error(`Paire absente : ${exercise.id}`);
  return definition.map((item, index) => {
    if (type === 'sql') {
      if (typeof item !== 'string' || !item.trim()) throw new Error(`SQL vide : ${exercise.id}`);
      return { index: index + 1, label: `variante ${index + 1}`, code: item, sha256: sha(item) };
    }
    const labelled = type.startsWith('labelled');
    const [label, before, after] = labelled ? item : [`variante ${index + 1}`, ...item];
    if (typeof before !== 'string' || !before || typeof after !== 'string' || typeof label !== 'string') {
      throw new Error(`Mutation invalide : ${exercise.id}`);
    }
    const occurrences = exercise.solution.split(before).length - 1;
    if (!occurrences || (labelled && occurrences !== 1)) throw new Error(`Mutation absente ou ambiguë : ${exercise.id}`);
    const code = type === 'labelled-callback'
      ? exercise.solution.replace(before, () => after)
      : exercise.solution.replace(before, after);
    if (code === exercise.solution) throw new Error(`Mutation sans effet : ${exercise.id}`);
    return { index: index + 1, label, code, sha256: sha(code), occurrences };
  });
}

const results = [];
const seen = new Set();
for (const spec of courses) {
  const exercises = require(`/project/server/exercises/${spec.course}.js`);
  const fixtures = extractObject(spec.file, spec.name);
  const archived = previous.cours[spec.course];
  if (!Array.isArray(exercises) || exercises.length !== 18 || Object.keys(fixtures).length !== 18 ||
      !archived || archived.type !== spec.type || Object.keys(archived.variantes || {}).length !== 18 ||
      !isGradingSuspended(spec.course)) throw new Error(`Inventaire ou suspension incorrecte : ${spec.course}`);
  const ids = exercises.map(exercise => exercise.id).sort();
  const fixtureIds = Object.keys(fixtures).sort();
  if (JSON.stringify(ids) !== JSON.stringify(fixtureIds)) throw new Error(`IDs de mutations incohérents : ${spec.course}`);
  for (const exercise of exercises) {
    if (seen.has(exercise.id) || typeof exercise.solution !== 'string') throw new Error(`Corrigé invalide : ${exercise.id}`);
    seen.add(exercise.id);
    const expectedLanguage = spec.course === 'csharp' ? 'csharp' : spec.course === 'b1-sql' ? 'sql' : 'shell';
    if (exercise.language !== expectedLanguage) throw new Error(`Langage inattendu : ${exercise.id}`);
    const cases = activeCases(exercise);
    const chosen = materialize(exercise, fixtures[exercise.id], spec.type);
    let historicalDefinitions = archived.variantes[exercise.id];
    let historicalAdaptation = null;
    if (exercise.id === 'dk2-c1-e2') {
      const archiveExpected = [
        ['ne pas multiplier le disque invité', 'instances * (app_disk + $1)', 'instances * app_disk + $1'],
        ['oublier les instances pour la RAM Docker', 'docker_ram = instances * app_ram', 'docker_ram = app_ram']
      ];
      const revisedExpected = [
        ['ne pas multiplier le disque invité', 'guest_disk = multiply_decimal(instances, $1)', 'guest_disk = normalize_decimal($1)'],
        ['oublier les instances pour la RAM Docker', 'docker_ram = multiply_decimal(instances, app_ram)', 'docker_ram = normalize_decimal(app_ram)']
      ];
      if (sha(exercise.solution) !== '826de5b5044f42933680e1d98facd44b18eaff3b3180b0f37fc02ac3d82b6125' ||
          JSON.stringify(historicalDefinitions) !== JSON.stringify(archiveExpected) ||
          JSON.stringify(fixtures[exercise.id]) !== JSON.stringify(revisedExpected)) {
        throw new Error(`Transition historique non reconnue : ${exercise.id}`);
      }
      historicalAdaptation = {
        archive_sha256: sha(JSON.stringify(historicalDefinitions)),
        raison: 'Le calcul en virgule flottante a été remplacé par un calcul décimal exact ; les deux mutations historiques sont rematérialisées sur les nouveaux termes et ne sont pas les anciens codes exécutables.'
      };
      historicalDefinitions = revisedExpected;
    }
    const historical = materialize(exercise, historicalDefinitions, spec.type);
    const variants = [...chosen];
    for (const variant of historical) {
      if (!variants.some(existing => existing.sha256 === variant.sha256)) {
        variants.push({ ...variant, index: variants.length + 1, label: `historique : ${variant.label}` });
      }
    }
    results.push({
      id: exercise.id,
      course: spec.course,
      language: exercise.language,
      requiredShebang: exercise.requiredShebang || null,
      verifyFirstExample: exercise.verifyFirstExample === true,
      historicalAdaptation,
      hiddenTotal: exercise.tests.length,
      hiddenExcluded: Math.max(0, exercise.tests.length - MAX_TESTS),
      cases,
      solution: { code: exercise.solution, sha256: sha(exercise.solution) },
      variants
    });
  }
}
process.stdout.write(JSON.stringify({ maxTests: MAX_TESTS, exercises: results }));
