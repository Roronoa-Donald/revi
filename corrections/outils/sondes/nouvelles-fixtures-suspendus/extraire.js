'use strict';

const fs = require('node:fs');
const vm = require('node:vm');
const { createHash } = require('node:crypto');
const { isGradingSuspended } = require('/project/server/exercises/grading-policy');

const courses = [
  { course: 'csharp', file: 'csharp-lot1.test.js', object: 'witnesses',
    profile: '41645e2fcc51c42afcd4bb213789dc4b8ab81165ceea96416db3384f132c446a',
    reviewedProfiles: ['4cbce6b42338a95594cde90372a3458610ab66dd2122a2aa21e6c31447a19817'] },
  { course: 'docker', file: 'docker-lot1.test.js', object: 'independentCases',
    profile: 'e1c8d7cc905e1dbd0c575129456240d80d771201500abb3cdba9b2352049abd4',
    reviewedProfiles: ['f6c0628ffb189544b09bf64189b4975177a6db0bfc900aec768ba9b65c568c76'] },
  { course: 'b3-linux', file: 'b3-linux-lot1.test.js', object: 'independent',
    profile: '2a20c54a724e5bde1b44ba79e405a34e9e392df13479c67ea70592d249d3504a' },
  { course: 'b3-github', file: 'b3-github-lot1.test.js', object: 'independent', github: true,
    profile: '85f2f3b0818f95e7eb4cebc88fd57f9084e1434e84e9bf3186d8774e4cc7b245' },
];

function sha(value) {
  return createHash('sha256').update(value).digest('hex');
}

function normalizeInput(value) {
  return value.replace(/\r\n?/g, '\n').replace(/\s+/gu, ' ').trim();
}

function witnessBounds(specification, source) {
  const marker = new RegExp(`\\bconst\\s+${specification.object}\\s*=\\s*\\{`, 'g');
  const beginnings = [...source.matchAll(marker)];
  if (beginnings.length !== 1) throw new Error(`Déclaration ambiguë : ${specification.file}`);
  const start = beginnings[0].index;
  const ending = /\n[ \t]*};[ \t]*(?:\n|$)/.exec(source.slice(start));
  if (!ending) throw new Error(`Fin des témoins introuvable : ${specification.file}`);
  return [start, start + ending.index + ending[0].length];
}

function generationBounds(specification, source) {
  if (!['docker', 'b3-github'].includes(specification.course)) return null;
  const startMarker = specification.course === 'docker' ? 'function solutionFor(' : 'function randomGenerator(';
  const start = source.indexOf(startMarker);
  const end = specification.course === 'docker' ? source.lastIndexOf('\n}') :
    source.indexOf("\ntest('la route refuse", start);
  if (start < 0 || end <= start || source.indexOf(startMarker, start + 1) !== -1) {
    throw new Error(`Bloc de génération introuvable ou ambigu : ${specification.file}`);
  }
  return [start, end];
}

function sourceProfile(specification, source) {
  const bounds = [witnessBounds(specification, source)];
  const generation = generationBounds(specification, source);
  if (generation) bounds.push(generation);
  bounds.sort((left, right) => left[0] - right[0]);
  let cursor = 0;
  let text = '';
  for (const [start, end] of bounds) {
    if (start < cursor || end <= start) throw new Error(`Blocs chevauchants : ${specification.file}`);
    text += source.slice(cursor, start) + '\n<bloc_dynamique>\n';
    cursor = end;
  }
  return sha(text + source.slice(cursor));
}

function extractWitnesses(specification, source) {
  const [start, end] = witnessBounds(specification, source);
  let prelude = '';
  if (specification.github) {
    const starts = [...source.matchAll(/\bconst\s+hashContent\s*=/g)];
    if (starts.length !== 1 || starts[0].index >= start) throw new Error('Préambule GitHub absent ou ambigu');
    prelude = source.slice(starts[0].index, start);
  }
  const declaration = source.slice(start, end);
  const result = new vm.Script(`${prelude}${declaration}\nJSON.stringify(${specification.object});`, {
    filename: specification.file,
  }).runInNewContext({ Buffer, createHash }, { timeout: 2000 });
  return JSON.parse(result);
}

function staticStrings(source) {
  const strings = [];
  const context = vm.createContext(Object.create(null));
  const pattern = /'(?:\\[\s\S]|[^'\\\r\n])*'|"(?:\\[\s\S]|[^"\\\r\n])*"|`(?:\\[\s\S]|[^`\\])*`/g;
  for (const match of source.matchAll(pattern)) {
    if (match[0][0] === '`' && match[0].includes('${')) continue;
    try {
      const value = new vm.Script(match[0]).runInContext(context, { timeout: 50 });
      if (typeof value === 'string') strings.push(value);
    } catch {}
  }
  return strings;
}

function generatedInputs(specification, source, courseExercises) {
  const bounds = generationBounds(specification, source);
  if (!bounds) return null;
  const [start, end] = bounds;
  let prelude = '';
  if (specification.course === 'b3-github') {
    const objectIds = [...source.matchAll(/^\s*const\s+objectId\s*=\s*[^;\n]+;/gm)];
    if (objectIds.length !== 1 || objectIds[0].index >= start) throw new Error('objectId absent ou ambigu');
    prelude = objectIds[0][0];
  }
  const entries = [];
  const tests = [];
  const ids = new Set(courseExercises.map(exercise => exercise.id));
  const context = {
    Buffer, createHash,
    exercises: [...ids].map(id => ({ id, solution: id, tests: [{ label: 'Entiers décimaux au-delà de 2^53' }] })),
    assert: { equal() {}, ok() {} },
    LIMITS: { stdin: 8192 },
    MAX_TESTS: 7,
    runSolution(id, stdin) {
      if (!ids.has(id) || typeof stdin !== 'string') throw new Error(`Entrée générée invalide : ${id}`);
      entries.push({ id, stdin });
      return '';
    },
    test(name, callback) {
      if (typeof name !== 'string' || typeof callback !== 'function') throw new Error('Générateur de test inattendu');
      const before = entries.length;
      callback();
      const count = entries.length - before;
      if (!count) throw new Error(`Test sans entrée capturée : ${name}`);
      tests.push({ nom: name, nombre: count });
    },
  };
  new vm.Script(`${prelude}\n${source.slice(start, end)}`, { filename: specification.file })
    .runInNewContext(context, { timeout: 5000 });
  if (!tests.length || !entries.length) throw new Error(`Aucune entrée générée : ${specification.file}`);
  return { entries, tests };
}

const exercises = [];
const known = [];
const testSources = [];
const suspensions = {};
const sourcesTemoins = {};
const sourcesGeneres = {};
const profilsSources = {};
for (const specification of courses) {
  const source = fs.readFileSync(`/project/tests/${specification.file}`, 'utf8');
  const courseExercises = require(`/project/server/exercises/${specification.course}.js`);
  const proposed = JSON.parse(fs.readFileSync(`/trusted/fixtures/${specification.course}.json`, 'utf8'));
  try {
    const currentProfile = sourceProfile(specification, source);
    const recognized = [specification.profile, ...(specification.reviewedProfiles || [])].includes(currentProfile);
    profilsSources[specification.course] = { etat: recognized ? 'reconnu' : 'modifie',
      sha256: currentProfile, profil_reconnu_sha256: recognized ? currentProfile : specification.profile,
      profil_initial_sha256: specification.profile };
  } catch (error) {
    profilsSources[specification.course] = { etat: 'non_lu', cause: String(error.message) };
  }
  let previous = null;
  try {
    previous = extractWitnesses(specification, source);
    const expectedIds = courseExercises.map(exercise => exercise.id).sort();
    if (JSON.stringify(expectedIds) !== JSON.stringify(Object.keys(previous).sort())) {
      throw new Error('Inventaire des anciens témoins incohérent');
    }
    sourcesTemoins[specification.course] = { etat: 'lus', nombre: Object.keys(previous).length };
  } catch (error) {
    previous = null;
    sourcesTemoins[specification.course] = { etat: 'non_lus', cause: String(error.message) };
  }
  try {
    const generated = generatedInputs(specification, source, courseExercises);
    if (generated) {
      generated.entries.forEach((entry, index) => known.push({ ...entry, origin: 'test_genere_preexistant', index: index + 1 }));
      sourcesGeneres[specification.course] = { etat: 'lus', nombre: generated.entries.length, tests: generated.tests };
    } else {
      sourcesGeneres[specification.course] = { etat: 'sans_bloc_reconnu', nombre: 0 };
    }
  } catch (error) {
    sourcesGeneres[specification.course] = { etat: 'non_lus', cause: String(error.message) };
  }
  testSources.push({ file: `tests/${specification.file}`, source, normalized: normalizeInput(source),
    literals: staticStrings(source).map(normalizeInput) });
  if (!Array.isArray(courseExercises) || courseExercises.length !== 18 ||
      Object.keys(proposed).some(id => !courseExercises.some(exercise => exercise.id === id))) {
    throw new Error(`Inventaire incorrect : ${specification.course}`);
  }
  suspensions[specification.course] = isGradingSuspended(specification.course);
  for (const exercise of courseExercises) {
    const fixture = proposed[exercise.id] || null;
    const language = specification.course === 'csharp' ? 'csharp' : 'shell';
    if (exercise.language !== language || typeof exercise.solution !== 'string' || !exercise.solution.trim() ||
        !Array.isArray(exercise.examples) || !Array.isArray(exercise.tests) ||
        (fixture && (typeof fixture.stdin !== 'string' || typeof fixture.expected !== 'string' ||
                     typeof fixture.raison !== 'string' || !fixture.raison.trim()))) {
      throw new Error(`Fiche ou fixture invalide : ${exercise.id}`);
    }
    for (const [origin, samples] of [['exemple_catalogue', exercise.examples], ['test_catalogue', exercise.tests]]) {
      for (const [index, sample] of samples.entries()) {
        if (typeof sample.stdin !== 'string') throw new Error(`Entrée absente : ${exercise.id} ${origin} ${index + 1}`);
        known.push({ id: exercise.id, origin, index: index + 1, stdin: sample.stdin });
      }
    }
    if (previous) {
      const witness = previous[exercise.id];
      if (!witness || typeof witness.stdin !== 'string') throw new Error(`Ancien témoin invalide : ${exercise.id}`);
      known.push({ id: exercise.id, origin: 'temoin_preexistant', index: 1, stdin: witness.stdin });
    }
    exercises.push({
      id: exercise.id, course: specification.course, language, fixture,
      cases: fixture ? [{ origin: 'fixture_nouvelle', index: 1, sample: fixture }] : [],
      solution: { code: exercise.solution, sha256: sha(exercise.solution) },
      previousSource: `tests/${specification.file}`, previousVerified: Boolean(previous),
      knownCount: { exemples: exercise.examples.length, tests: exercise.tests.length },
    });
  }
}

const previousComplete = Object.values(sourcesTemoins).every(source => source.etat === 'lus') &&
  Object.values(sourcesGeneres).every(source => source.etat !== 'non_lus') &&
  Object.values(profilsSources).every(source => source.etat === 'reconnu');
const seen = new Set();
for (const exercise of exercises) {
  if (seen.has(exercise.id)) throw new Error(`ID répété : ${exercise.id}`);
  seen.add(exercise.id);
  if (!exercise.fixture) {
    exercise.nouveaute = { valide: false, cause: 'fixture_absente', ancien_temoin_lu: exercise.previousVerified };
    continue;
  }
  const stdin = exercise.fixture.stdin;
  const normalized = normalizeInput(stdin);
  const matches = known.filter(sample => normalizeInput(sample.stdin) === normalized)
    .map(({ id, origin, index }) => ({ id, origin, index }));
  const otherFixtures = normalized.length === 0 ? [] : exercises
    .filter(other => other.id !== exercise.id && other.fixture && normalizeInput(other.fixture.stdin) === normalized)
    .map(other => other.id);
  const solutionMatches = normalized.length === 0 ? [] : exercises
    .filter(other => normalizeInput(other.solution.code).includes(normalized)).map(other => other.id);
  const sourceMatches = normalized.length === 0 ? [] : testSources
    .filter(test => test.source.includes(stdin) || test.normalized.includes(normalized) || test.literals.includes(normalized))
    .map(test => test.file);
  exercise.nouveaute = {
    entree_non_vide: normalized.length > 0, ancien_temoin_lu: exercise.previousVerified,
    toutes_sources_precedentes_lues: previousComplete,
    exemples_et_tests_examines: exercise.knownCount, doublons_catalogue_ou_anciens_temoins: matches,
    doublons_autres_fixtures: otherFixtures, entree_integrale_dans_corriges: solutionMatches,
    entree_integrale_dans_sources_tests: sourceMatches,
    regle: 'Égalité après normalisation des espaces ; anciens témoins et blocs de tests générés reconnus évalués à chaque lancement ; recherche intégrale dans les sources et littéraux de tests.',
  };
  exercise.nouveaute.valide = exercise.nouveaute.entree_non_vide && exercise.previousVerified && previousComplete &&
    matches.length === 0 && otherFixtures.length === 0 && solutionMatches.length === 0 && sourceMatches.length === 0;
}
if (exercises.length !== 72 || seen.size !== 72) throw new Error('Inventaire différent de 72');
process.stdout.write(JSON.stringify({ node: process.version, suspensions, sourcesTemoins, sourcesGeneres, profilsSources, exercises }));
