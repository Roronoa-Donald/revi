'use strict';

const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { spawnSync } = require('node:child_process');
const { sections } = require('./grille');
const { sqlStimulus, witnessVisibleInProjection: visibleInProjection } = require('./stimuli');

const root = path.resolve(process.argv[2] || process.cwd());
if (!process.argv[3]) throw new Error('Fournir un répertoire de sortie privé déjà créé.');
const destination = path.resolve(process.argv[3]);
const output = fs.lstatSync(destination);
if (!output.isDirectory() || output.isSymbolicLink() || fs.realpathSync(destination) !== destination ||
    destination === root || destination.startsWith(root + path.sep) || (output.mode & 0o077) !== 0) {
  throw new Error('Destination privée hors du dépôt requise.');
}
const fromRoot = (...parts) => path.join(root, ...parts);
const readText = name => fs.readFileSync(fromRoot(name), 'utf8');
const readJson = name => JSON.parse(readText(name));
function sourcesSnapshot() {
  const directories = ['server/exercises', 'server/services/execution', 'assets/js/engines',
    'corrections/fixtures', 'corrections/outils/sondes', 'corrections/resultats', 'tests'];
  function filesIn(directory) {
    return fs.readdirSync(fromRoot(directory), { withFileTypes: true }).flatMap(entry => {
      const filename = `${directory}/${entry.name}`;
      if (entry.isDirectory()) return filesIn(filename);
      return entry.isFile() ? [filename] : [];
    });
  }
  const names = directories.flatMap(filesIn);
  names.push('assets/js/code-lab.js', 'assets/js/engines/sql-wasm-engine.js', 'server/services/execution/index.js',
    'b1-sql/assets/vendor/sqljs/sql-wasm.js', 'b1-sql/assets/vendor/sqljs/sql-wasm.wasm',
    'corrections/resultats/reprise-suite-reprise-final.txt', 'corrections/resultats/mutations-analyse-lot1-final.json',
    'corrections/resultats/banc-360-apres.json');
  return Object.fromEntries([...new Set(names)].sort().map(name => [name,
    crypto.createHash('sha256').update(fs.readFileSync(fromRoot(name))).digest('hex')]));
}
const initialSources = sourcesSnapshot();
const catalogue = require(fromRoot('server/exercises'));
const policy = require(fromRoot('server/exercises/grading-policy'));
const { MAX_TESTS } = require(fromRoot('server/exercises/runner'));
const execution = require(fromRoot('server/services/execution'));
const sqlEngine = require(fromRoot('assets/js/engines/sql-wasm-engine'));
const analysisProbe = require(fromRoot('corrections/outils/sondes/mutations-analyse-lot1'));
const acorn = require(fromRoot('node_modules/acorn'));
const exercises = catalogue.listExercises();
const byId = new Map(exercises.map(exercise => [exercise.id, exercise]));
const records = new Map(exercises.map(exercise => [exercise.id, {
  id: exercise.id,
  course: exercise.course,
  language: exercise.language,
  suspended: policy.isGradingSuspended(exercise.course, exercise.id),
  defined: new Map(),
  current: new Map(),
  reconstructed: new Map(),
  historical: new Map(),
  currentFloor: 0,
  floorSources: new Set(),
  nominalTapState: '',
  ownBankEvidence: [],
  crossWitness: null
}]));
const hash = value => crypto.createHash('sha256').update(Buffer.isBuffer(value) ? value : String(value)).digest('hex');
const appendFingerprint = (map, key, source) => {
  if (!map.has(key)) map.set(key, new Set());
  map.get(key).add(source);
};
const append = (map, code, source) => appendFingerprint(map, hash(code), source);
const allSources = map => [...new Set([...map.values()].flatMap(values => [...values]))].sort();
const visibility = JSON.parse(fs.readFileSync(path.join(destination, '.visibilite-grilles.json'), 'utf8'));
for (const [filename, fingerprint] of Object.entries(visibility.pageFingerprints)) {
  if (hash(fs.readFileSync(fromRoot(filename), 'utf8')) !== fingerprint) {
    throw new Error('Page modifiée depuis la vérification des grilles : ' + filename);
  }
}
const currentDigest = hash(JSON.stringify(exercises.filter(exercise => exercise.language === 'analyse')
  .sort((left, right) => left.id < right.id ? -1 : left.id > right.id ? 1 : 0)
  .map(exercise => ({ id: exercise.id, course: exercise.course, language: exercise.language,
    title: exercise.title, brief: exercise.brief, starter: exercise.starter,
    solution: exercise.solution, tests: exercise.tests }))));

function stimulus(exercise, input, caseSections) {
  if (exercise.language === 'analyse') {
    const selector = /^cas\s*:\s*(\d+)$/i.exec(String(input || '').trim());
    if (!selector || !caseSections.has(Number(selector[1]))) return null;
    const data = caseSections.get(Number(selector[1]));
    return data.length ? JSON.stringify(data) : null;
  }
  if (exercise.language === 'sql') return sqlStimulus(sqlEngine, input);
  return String(input || '');
}

function witnessVisibleInProjection(exercise, input) {
  return visibleInProjection(sqlEngine, catalogue.toClient, exercise, input);
}

let analysisSelectors = 0;
let analysisVisible = 0;
for (const exercise of exercises) {
  const record = records.get(exercise.id);
  const caseSections = exercise.language === 'analyse' ? sections(exercise.starter) : null;
  const pageVisibility = exercise.language === 'analyse' ? visibility.exercises[exercise.id] : null;
  if (pageVisibility) {
    const fingerprint = hash(JSON.stringify({ starter: exercise.starter,
      selectors: exercise.tests.slice(0, MAX_TESTS).map(test => test.stdin) }));
    if (pageVisibility.fingerprint !== fingerprint) throw new Error('Grille modifiée : ' + exercise.id);
  } else if (exercise.language === 'analyse') {
    throw new Error('Visibilité non vérifiée : ' + exercise.id);
  }
  const displayedExamples = new Set((exercise.examples || [])
    .map(example => stimulus(exercise, example.stdin, caseSections)).filter(value => value !== null));
  const shownText = [exercise.starter, exercise.brief, exercise.goal].map(value => String(value || ''));
  const data = new Map();
  let unknown = 0;
  for (const [index, item] of (exercise.tests || []).slice(0, MAX_TESTS).entries()) {
    const key = stimulus(exercise, item.stdin, caseSections);
    if (key === null) {
      unknown++;
      continue;
    }
    let visible = exercise.language === 'analyse' ? Boolean(pageVisibility.visibleByTestIndex[index]) : displayedExamples.has(key);
    if (exercise.language !== 'analyse' && exercise.language !== 'sql') {
      const raw = String(item.stdin || '');
      if (raw.length >= 8 && shownText.some(text => text.includes(raw))) visible = true;
    }
    data.set(key, Boolean(data.get(key)) || visible);
    if (exercise.language === 'analyse') {
      analysisSelectors++;
      if (visible) analysisVisible++;
    }
  }
  record.tests = (exercise.tests || []).length;
  record.activeTests = Math.min(record.tests, MAX_TESTS);
  record.distinct = data.size;
  record.visible = [...data.values()].filter(Boolean).length;
  record.notDetectedVisible = data.size - record.visible;
  record.unknownInputs = unknown;
  record.exposedStarter = exercise.language === 'analyse' && catalogue.toClient(exercise).starter === exercise.starter;
}

function walk(node, callback) {
  if (!node || typeof node !== 'object') return;
  if (typeof node.type === 'string') callback(node);
  for (const value of Object.values(node)) {
    if (Array.isArray(value)) value.forEach(child => walk(child, callback));
    else if (value && typeof value === 'object') walk(value, callback);
  }
}

function literal(node) {
  if (node.type === 'Literal') return node.value;
  if (node.type === 'ArrayExpression') return node.elements.map(literal);
  if (node.type === 'ObjectExpression') return Object.fromEntries(node.properties.map(property => [literal(property.key), literal(property.value)]));
  throw new Error(`Donnée de banc non littérale : ${node.type}`);
}

function fixtureVariable(filename, name) {
  const source = readText(filename);
  const ast = acorn.parse(source, { ecmaVersion: 'latest' });
  let target = null;
  walk(ast, node => {
    if (node.type === 'VariableDeclarator' && node.id.type === 'Identifier' &&
        node.id.name === name && node.init && ['ObjectExpression', 'ArrayExpression'].includes(node.init.type)) target = node.init;
  });
  if (!target) throw new Error(`Banc absent : ${filename}`);
  return literal(target);
}

const recentLog = 'corrections/resultats/reprise-suite-reprise-final.txt';
const recentLines = readText(recentLog).split('\n');
const passed = recentLines.filter(line => /^\s*ok\s+\d+\s+-/.test(line) && !/#\s*SKIP/i.test(line));
const recentEvidence = (id, label) => passed.some(line => line.includes(id) && (!label || line.includes(label)));
const passedNames = new Set(passed.map(line => line.replace(/^\s*ok\s+\d+\s+-\s*/, '').trim()));
const hasWrongOutputAssertion = node => {
  let found = false;
  walk(node, item => { if (item.type === 'Literal' && item.value === 'wrong_output') found = true; });
  return found;
};
function exerciseIn(node) {
  const ids = new Set();
  walk(node, item => {
    if (item.type !== 'CallExpression' || item.arguments[0]?.type !== 'Literal') return;
    const callee = item.callee;
    if ((callee.type === 'Identifier' && callee.name === 'getExercise') ||
        (callee.type === 'MemberExpression' && callee.property?.name === 'getExercise')) {
      if (byId.has(item.arguments[0].value)) ids.add(item.arguments[0].value);
    }
  });
  return ids.size === 1 ? byId.get([...ids][0]) : null;
}

for (const filename of ['tests/b1-algo-lot1.test.js', 'tests/git-novice-lot1.test.js']) {
  const ast = acorn.parse(readText(filename), { ecmaVersion: 'latest' });
  walk(ast, node => {
    if (node.type !== 'CallExpression' || node.callee?.name !== 'test' || node.arguments[0]?.type !== 'Literal') return;
    const callback = node.arguments.at(-1);
    const exercise = exerciseIn(callback);
    if (!exercise) return;
    const transforms = new Map();
    walk(callback, item => {
      if (item.type !== 'VariableDeclarator' || item.id.type !== 'Identifier' || item.init?.type !== 'CallExpression') return;
      const call = item.init;
      const method = call.callee?.property?.name;
      const receiver = call.callee?.object;
      if (!['replace', 'replaceAll'].includes(method) || receiver?.type !== 'MemberExpression' ||
          receiver.object?.name !== 'exercise' || receiver.property?.name !== 'solution' ||
          call.arguments.length !== 2 || call.arguments.some(argument => argument.type !== 'Literal' || typeof argument.value !== 'string')) return;
      const [before, after] = call.arguments.map(argument => argument.value);
      if (!before || !exercise.solution.includes(before)) return;
      const code = method === 'replaceAll' ? exercise.solution.replaceAll(before, after) : exercise.solution.replace(before, after);
      if (code !== exercise.solution) transforms.set(item.id.name, code);
    });
    walk(callback, loop => {
      if (loop.type !== 'ForOfStatement' || loop.right.type !== 'ArrayExpression' || !hasWrongOutputAssertion(loop.body)) return;
      for (const item of loop.right.elements) {
        const code = item.type === 'Identifier' ? transforms.get(item.name) : null;
        if (!code) continue;
        const record = records.get(exercise.id);
        append(record.defined, code, filename);
        if (passedNames.has(node.arguments[0].value)) append(record.current, code, `${filename};${recentLog}`);
      }
    });
  });
}

const integrityFile = 'tests/integrite-cas-lot1.test.js';
const integrityAst = acorn.parse(readText(integrityFile), { ecmaVersion: 'latest' });
let integrityTitle = null;
walk(integrityAst, node => {
  if (node.type === 'CallExpression' && node.callee?.name === 'test' &&
      node.arguments[0]?.type === 'TemplateLiteral' && node.arguments[0].expressions.some(item => item.name === 'label')) {
    integrityTitle = node.arguments[0];
  }
});
if (!integrityTitle || integrityTitle.expressions.length !== 2) throw new Error('Titres du banc d’intégrité non reconnus');
for (const [name, id] of [['windowsMutations', 'ws2-c4-e3'], ['flaskMutations', 'fl2-c4-e1']]) {
  const exercise = byId.get(id);
  for (const [label, before, after] of fixtureVariable(integrityFile, name)) {
    if (!exercise || !exercise.solution.includes(before)) continue;
    const code = exercise.solution.replace(before, after);
    if (code === exercise.solution) continue;
    const record = records.get(id);
    append(record.defined, code, integrityFile);
    const title = integrityTitle.quasis[0].value.cooked + id + integrityTitle.quasis[1].value.cooked +
      label + integrityTitle.quasis[2].value.cooked;
    if (passedNames.has(title)) append(record.current, code, `${integrityFile};${recentLog}`);
  }
}

for (const filename of ['tests/probabilites-fractions-lot1.test.js', 'tests/native-exercise-component.test.js']) {
  const ast = acorn.parse(readText(filename), { ecmaVersion: 'latest' });
  walk(ast, node => {
    if (node.type !== 'CallExpression' || node.callee?.name !== 'test' || node.arguments[0]?.type !== 'Literal') return;
    const callback = node.arguments.at(-1);
    const exercise = exerciseIn(callback);
    if (!exercise) return;
    walk(callback, loop => {
      if (loop.type !== 'ForOfStatement' || loop.right.type !== 'ArrayExpression' || !hasWrongOutputAssertion(loop.body)) return;
      const variable = loop.left.declarations?.[0]?.id?.name;
      let replace = null;
      walk(loop.body, item => {
        if (item.type !== 'CallExpression' || item.callee?.property?.name !== 'replace') return;
        const [before, after] = item.arguments;
        if (before?.type === 'Literal' && after?.type === 'TemplateLiteral' && after.expressions.length === 1 &&
            after.expressions[0].name === variable) replace = { before: before.value, after };
      });
      if (!replace || typeof replace.before !== 'string' || !exercise.solution.includes(replace.before)) return;
      for (const item of loop.right.elements) {
        if (item.type !== 'Literal' || typeof item.value !== 'string') continue;
        const replacement = replace.after.quasis[0].value.cooked + item.value + replace.after.quasis[1].value.cooked;
        const code = exercise.solution.replace(replace.before, replacement);
        if (code === exercise.solution) continue;
        const record = records.get(exercise.id);
        append(record.defined, code, filename);
        if (passedNames.has(node.arguments[0].value)) append(record.current, code, `${filename};${recentLog}`);
      }
    });
  });
}

const linuxFile = 'tests/linux-cas-lot1.test.js';
const linuxAst = acorn.parse(readText(linuxFile), { ecmaVersion: 'latest' });
walk(linuxAst, node => {
  if (node.type !== 'CallExpression' || node.callee?.name !== 'test' || node.arguments[0]?.type !== 'Literal') return;
  const callback = node.arguments.at(-1);
  const exercise = exerciseIn(callback);
  if (!exercise || !hasWrongOutputAssertion(callback)) return;
  walk(callback, call => {
    if (call.type !== 'CallExpression' || call.callee?.name !== 'runTests' || call.arguments[1]?.type !== 'Literal' ||
        typeof call.arguments[1].value !== 'string' || call.arguments[1].value === exercise.solution) return;
    const record = records.get(exercise.id);
    append(record.defined, call.arguments[1].value, linuxFile);
    if (passedNames.has(node.arguments[0].value)) append(record.current, call.arguments[1].value, `${linuxFile};${recentLog}`);
  });
});

const browserFile = 'tests/code-lab-analyse-lot1.test.js';
const browserAst = acorn.parse(readText(browserFile), { ecmaVersion: 'latest' });
walk(browserAst, node => {
  if (node.type !== 'CallExpression' || node.callee?.name !== 'test' || node.arguments[0]?.type !== 'Literal' ||
      !passedNames.has(node.arguments[0].value)) return;
  const callback = node.arguments.at(-1);
  let target = false;
  let submits = false;
  walk(callback, item => {
    if (item.type === 'Literal' && item.value === 'pf3-c2-e1') target = true;
    if (item.type === 'CallExpression' && item.callee?.name === 'submitAnalysis') submits = true;
  });
  if (target && submits && hasWrongOutputAssertion(callback)) {
    const record = records.get('pf3-c2-e1');
    record.currentFloor = Math.max(record.currentFloor, 1);
    record.floorSources.add(`${browserFile};${recentLog}`);
  }
});

const analysisRegressionFile = 'tests/analyses-lot1.test.js';
const analysisRegressionAst = acorn.parse(readText(analysisRegressionFile), { ecmaVersion: 'latest' });
const analysisGlobals = {};
let answerTemplate = null;
walk(analysisRegressionAst, node => {
  if (node.type === 'VariableDeclarator' && node.id?.type === 'Identifier' && node.init?.type === 'Literal' &&
      typeof node.init.value === 'string') analysisGlobals[node.id.name] = node.init.value;
  if (node.type === 'FunctionDeclaration' && node.id?.name === 'accepted') {
    walk(node, item => {
      if (item.type === 'VariableDeclarator' && item.id?.name === 'submission' && item.init?.type === 'TemplateLiteral') answerTemplate = item.init;
    });
  }
});
function pureExpression(node, environment) {
  if (node.type === 'Literal') return node.value;
  if (node.type === 'Identifier' && Object.hasOwn(environment, node.name)) return environment[node.name];
  if (node.type === 'MemberExpression') {
    const object = pureExpression(node.object, environment);
    const key = node.computed ? pureExpression(node.property, environment) : node.property.name;
    return object[key];
  }
  if (node.type === 'ArrayExpression') return node.elements.map(item => pureExpression(item, environment));
  if (node.type === 'ObjectExpression') return Object.fromEntries(node.properties.map(item =>
    [item.key.name || item.key.value, pureExpression(item.value, environment)]));
  if (node.type === 'TemplateLiteral') return node.quasis.map((part, index) => part.value.cooked +
    (index < node.expressions.length ? pureExpression(node.expressions[index], environment) : '')).join('');
  if (node.type === 'CallExpression' && node.callee?.type === 'MemberExpression') {
    const method = node.callee.property.name;
    if (node.callee.object?.name === 'JSON' && method === 'stringify') return JSON.stringify(pureExpression(node.arguments[0], environment));
    const receiver = pureExpression(node.callee.object, environment);
    const args = node.arguments.map(item => pureExpression(item, environment));
    if (method === 'replace' && typeof receiver === 'string') return receiver.replace(...args);
    if (method === 'join' && Array.isArray(receiver)) return receiver.join(...args);
  }
  throw new Error('Expression non prise en charge dans le relevé de régression');
}
if (!answerTemplate) throw new Error('Forme des soumissions d’analyse non reconnue');
walk(analysisRegressionAst, node => {
  if (node.type !== 'CallExpression' || node.callee?.name !== 'test' || node.arguments[0]?.type !== 'Literal') return;
  const callback = node.arguments.at(-1);
  let id = null;
  walk(callback, item => {
    if (item.type === 'CallExpression' && item.callee?.name === 'getRequiredExercise' && item.arguments[0]?.type === 'Literal') id = item.arguments[0].value;
  });
  const exercise = byId.get(id);
  if (!exercise || exercise.language !== 'analyse') return;
  const environment = { ...analysisGlobals, exercise };
  walk(callback, item => {
    if (item.type !== 'VariableDeclarator' || item.id?.type !== 'Identifier' || item.id.name === 'exercise') return;
    try { environment[item.id.name] = pureExpression(item.init, environment); } catch (_) {}
  });
  const entry = environment.entry;
  const selector = entry && /^cas\s*:\s*(\d+)$/i.exec(String(entry.stdin || ''));
  if (!selector) return;
  walk(callback, item => {
    if (item.type !== 'CallExpression' || item.callee?.object?.name !== 'assert' || item.callee?.property?.name !== 'equal' ||
        item.arguments[0]?.type !== 'AwaitExpression' || item.arguments[0].argument?.callee?.name !== 'accepted' ||
        item.arguments[1]?.type !== 'Literal' || item.arguments[1].value !== false) return;
    try {
      const answer = pureExpression(item.arguments[0].argument.arguments[2], environment);
      const code = pureExpression(answerTemplate, { ...environment, selector, answer });
      if (typeof code !== 'string' || code === exercise.solution) return;
      const record = records.get(exercise.id);
      append(record.defined, code, analysisRegressionFile);
      if (passedNames.has(node.arguments[0].value)) append(record.current, code,
        `${analysisRegressionFile};server/services/execution/local-runner.js;${recentLog}`);
    } catch (_) {}
  });
});

const pfsenseFile = 'tests/pfsense-chapitre2-lot1.test.js';
const pfsenseAst = acorn.parse(readText(pfsenseFile), { ecmaVersion: 'latest' });
walk(pfsenseAst, node => {
  if (node.type !== 'CallExpression' || node.callee?.name !== 'test' || node.arguments[0]?.type !== 'Literal') return;
  const callback = node.arguments.at(-1);
  const exercise = exerciseIn(callback);
  if (!exercise || !hasWrongOutputAssertion(callback)) return;
  let variants = null;
  walk(callback, item => {
    if (item.type === 'VariableDeclarator' && item.id?.name === 'variants' && item.init?.type === 'ArrayExpression') variants = item.init.elements;
  });
  if (!variants || variants.length !== 2 || variants.some(item => item.type !== 'ObjectExpression')) return;
  const property = (item, name) => item.properties.find(entry => (entry.key.name || entry.key.value) === name)?.value?.value;
  const selectors = variants.map(item => property(item, 'selector'));
  const differentIds = variants.map(item => property(item, 'differingId'));
  if (selectors.some(value => typeof value !== 'string') || new Set(selectors).size !== 1 ||
      differentIds.some(value => typeof value !== 'string') || new Set(differentIds).size !== 2) return;
  const record = records.get(exercise.id);
  if (passedNames.has(node.arguments[0].value)) {
    record.currentFloor = Math.max(record.currentFloor, 2);
    record.floorSources.add(`${pfsenseFile};${recentLog}`);
  }
});

const definitions = [
  { file: 'tests/csharp-lot1.test.js', name: 'mutations', course: 'csharp', withLabel: false },
  { file: 'tests/docker-lot1.test.js', name: 'mutants', course: 'docker', withLabel: true },
  { file: 'tests/b3-linux-lot1.test.js', name: 'mutations', course: 'b3-linux', withLabel: false },
  { file: 'tests/b3-github-lot1.test.js', name: 'mutations', course: 'b3-github', withLabel: true }
];
for (const definition of definitions) {
  const fixtures = fixtureVariable(definition.file, definition.name);
  for (const [id, variants] of Object.entries(fixtures)) {
    const exercise = byId.get(id);
    if (!exercise || exercise.course !== definition.course) throw new Error(`Identifiant inconnu : ${id}`);
    const record = records.get(id);
    for (const variant of variants) {
      const [label, before, after] = definition.withLabel ? variant : [null, ...variant];
      if (!exercise.solution.includes(before)) continue;
      const code = definition.course === 'b3-github'
        ? exercise.solution.replace(before, () => after) : exercise.solution.replace(before, after);
      if (code === exercise.solution) continue;
      append(record.defined, code, definition.file);
      const logged = definition.course === 'b3-github'
        ? recentEvidence(id, label) : recentEvidence(id, 'variantes');
      if (logged) append(record.current, code, `${definition.file};${recentLog}`);
    }
  }
}

const sqlVariantFile = 'tests/sql-lot1-variants.test.js';
const sqlFixtures = fixtureVariable(sqlVariantFile, 'variants');
const sqlPassed = passed.some(line => line.includes('les 18 corrigés passent et deux variantes erronées par exercice échouent'));
for (const [id, variants] of Object.entries(sqlFixtures)) {
  const exercise = byId.get(id);
  if (!exercise || exercise.course !== 'b1-sql') throw new Error(`Identifiant SQL inconnu : ${id}`);
  for (const code of variants) {
    if (code === exercise.solution) continue;
    append(records.get(id).defined, code, sqlVariantFile);
    if (sqlPassed) append(records.get(id).reconstructed, code, `${sqlVariantFile};${recentLog}`);
  }
}

for (const filename of ['tests/sql-lot1-b2-ddl.test.js', 'tests/sql-lot1-index.test.js']) {
  if (!fs.existsSync(fromRoot(filename))) continue;
  const fixtures = fixtureVariable(filename, 'variants');
  for (const [id, variants] of Object.entries(fixtures)) {
    const exercise = byId.get(id);
    if (!exercise) throw new Error(`Identifiant SQL inconnu : ${id}`);
    for (const [label, original, replacement] of variants) {
      if (!exercise.solution.includes(original)) continue;
      const code = exercise.solution.replace(original, replacement);
      if (code !== exercise.solution) append(records.get(id).defined, code, filename);
    }
  }
}

const freshSqlFile = 'tests/sql-lot1-fresh.test.js';
if (fs.existsSync(fromRoot(freshSqlFile))) {
  const ast = acorn.parse(readText(freshSqlFile), { ecmaVersion: 'latest' });
  let memorized = null;
  walk(ast, node => {
    if (node.type === 'VariableDeclarator' && node.id.type === 'Identifier' &&
        node.id.name === 'memorized' && node.init?.type === 'Literal') memorized = node.init.value;
  });
  const target = records.get('sq-c1-e1');
  if (target && typeof memorized === 'string' && memorized !== byId.get(target.id).solution) {
    append(target.defined, memorized, freshSqlFile);
  }
}

const aggregateFile = 'corrections/resultats/mutations-analyse-lot1-final.json';
const aggregate = readJson(aggregateFile);
const diagnosticLine = recentLines.find(line => line.includes('"empreinteCatalogueSha256"'));
let diagnostic = null;
if (diagnosticLine) diagnostic = JSON.parse(diagnosticLine.slice(diagnosticLine.indexOf('{')));
const replayPassed = passed.some(line => line.includes('rejeu du catalogue : résultats reproductibles et comptes cohérents'));
const matchingSnapshot = aggregate.empreinteCatalogueSha256 === currentDigest &&
  diagnostic && diagnostic.empreinteCatalogueSha256 === currentDigest;
let reconstructedCount = 0;
for (const exercise of exercises.filter(item => item.language === 'analyse')) {
  const audit = analysisProbe.auditArithmetic(exercise);
  if (audit && ['attendu-divergent', 'contrat-ambigu', 'contrat-modifie', 'cas-non-reconstructible'].includes(audit.status)) continue;
  const candidate = analysisProbe.selectCandidate(exercise, audit);
  if (!candidate || candidate.variants.length !== 2) continue;
  const outputs = candidate.variants.map(variant => execution.normalizeOutput(variant.lines.join('\n')));
  if (new Set(outputs).size !== 2) continue;
  const programs = candidate.variants.map(variant => analysisProbe.replaceCaseOutput(variant.sample || candidate.sample, variant.lines));
  if (programs.some(program => !program.valid) || new Set(programs.map(program => program.code)).size !== 2) continue;
  reconstructedCount++;
  for (const program of programs) {
    append(records.get(exercise.id).defined, program.code, 'corrections/outils/sondes/mutations-analyse-lot1.js');
    if (replayPassed && matchingSnapshot) append(records.get(exercise.id).reconstructed, program.code,
      `corrections/outils/sondes/mutations-analyse-lot1.js;tests/mutations-analyse-lot1.test.js;${recentLog}`);
  }
}
if (!diagnostic || reconstructedCount !== diagnostic.statistiques.exercicesAvecDeuxRejets ||
    diagnostic.statistiques.variantes.rejetees !== 2 * reconstructedCount ||
    diagnostic.statistiques.variantes.acceptees !== 0 || diagnostic.statistiques.variantes.nonEvaluees !== 0 ||
    diagnostic.statistiques.variantes.invalides !== 0) {
  throw new Error('Reconstruction des preuves agrégées non concordante');
}

const bankFile = 'corrections/fixtures/banc-360.json';
const historyFile = 'corrections/resultats/banc-360-apres.json';
const bank = readJson(bankFile);
const history = readJson(historyFile);
const historyById = new Map(history.details.map(item => [item.id, item]));
for (const fixture of bank.exercises) {
  const record = records.get(fixture.id);
  const outcome = historyById.get(fixture.id);
  if (!record || !outcome || fixture.variants.length !== outcome.variants.length) continue;
  for (let index = 0; index < fixture.variants.length; index++) {
    const variant = fixture.variants[index];
    const result = outcome.variants[index];
    if (variant.code === byId.get(fixture.id).solution) continue;
    append(record.defined, variant.code, bankFile);
    if (variant.description === result.description && result.executed === true && result.accepted === false &&
        result.reason === 'wrong_output' && outcome.baseline?.executed === true && outcome.baseline?.accepted === true) {
      append(record.historical, variant.code, `${bankFile};${historyFile}`);
    }
  }
}

const ownBankDirectory = path.join(__dirname, 'resultats-banc');
const ownBankSource = fromRoot('corrections/outils/sondes/sql-variantes/cas_sql.py');
let currentVariantFingerprints = {};
if (fs.existsSync(ownBankSource)) {
  function fingerprintBank(filename) {
    const fingerprintProcess = spawnSync('python3', [path.join(__dirname, 'empreintes-banc.py'), filename],
      { encoding: 'utf8', timeout: 10000, maxBuffer: 1024 * 1024 });
    if (fingerprintProcess.status !== 0) throw new Error('Empreintes des variantes SQL indisponibles');
    return JSON.parse(fingerprintProcess.stdout);
  }
  const variantFingerprints = fingerprintBank(ownBankSource);
  currentVariantFingerprints = variantFingerprints;
  const personalSource = 'corrections/outils/sondes/sql-variantes/cas_sql.py;corrections/outils/sondes/sql-variantes/oracle_sql.py';
  for (const [id, fingerprints] of Object.entries(variantFingerprints)) {
    const record = records.get(id);
    if (!record || fingerprints.length !== 2 || new Set(fingerprints).size !== 2) {
      throw new Error('Variantes personnelles ambiguës : ' + id);
    }
    for (const fingerprint of fingerprints) appendFingerprint(record.defined, fingerprint, personalSource);
  }
  const repositoryBank = fromRoot('corrections/outils/sondes/sql-variantes/cas_sql.py');
  if (fs.existsSync(repositoryBank)) {
    for (const [id, fingerprints] of Object.entries(fingerprintBank(repositoryBank))) {
      const record = records.get(id);
      if (!record || fingerprints.length !== 2 || new Set(fingerprints).size !== 2) {
        throw new Error('Variantes du dépôt ambiguës : ' + id);
      }
      for (const fingerprint of fingerprints) appendFingerprint(record.defined, fingerprint,
        'corrections/outils/sondes/sql-variantes/cas_sql.py');
    }
  }
  const requiredFiles = [
    '/project/server/exercises/index.js', '/project/server/exercises/runner.js',
    '/project/server/exercises/grading-policy.js', '/project/server/exercises/sql.js',
    '/project/server/exercises/b3-sql.js', '/project/server/services/execution/index.js',
    '/project/assets/js/engines/sql-wasm-engine.js', '/project/assets/js/engines/engine-interface.js',
    '/project/b1-sql/assets/vendor/sqljs/sql-wasm.js', '/project/b1-sql/assets/vendor/sqljs/sql-wasm.wasm',
    '/banc/cas_sql.py', '/banc/oracle_sql.py', '/banc/lancer-sql.js'
  ];
  const localFile = filename => {
    if (filename.startsWith('/project/')) return path.join(root, filename.slice('/project/'.length));
    if (filename.startsWith('/banc/')) return path.join(__dirname, filename.slice('/banc/'.length));
    return null;
  };
  const reports = fs.existsSync(ownBankDirectory) ? fs.readdirSync(ownBankDirectory)
    .filter(filename => /^banc-sql-\d+-[0-9a-f]+\.json$/.test(filename)).sort() : [];
  for (const filename of reports) {
    const reportPath = path.join(ownBankDirectory, filename);
    const companion = path.join(ownBankDirectory, filename.replace(/^banc-sql-/, '.empreintes-'));
    if (!fs.existsSync(companion)) continue;
    const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
    const fingerprints = JSON.parse(fs.readFileSync(companion, 'utf8'));
    if (report.sources_stables !== true || !Array.isArray(report.exercices) || report.exercices.length !== 36 ||
        new Set(report.exercices.map(item => item.id)).size !== 36 || !fingerprints.sources || !fingerprints.exercices ||
        requiredFiles.some(name => !fingerprints.sources[name]) ||
        Object.entries(fingerprints.sources).some(([name, digest]) => {
          if (!requiredFiles.includes(name)) return true;
          const local = localFile(name);
          return !local || !fs.existsSync(local) || hash(fs.readFileSync(local)) !== digest;
        })) continue;
    for (const item of report.exercices) {
      const record = records.get(item.id);
      const exercise = byId.get(item.id);
      const variants = variantFingerprints[item.id];
      if (!record || !exercise || record.course !== item.cours || !variants ||
          !Array.isArray(item.variantes) || item.variantes.length !== 2 ||
          hash(JSON.stringify({ tests: exercise.tests, solution: exercise.solution })) !== fingerprints.exercices[item.id] ||
          item.reference_independante !== 'conforme' || item.reference_correcteur !== 'acceptee') continue;
      let rejected = 0;
      for (const [index, variant] of item.variantes.entries()) {
        if (variant.preuve !== true || variant.oracle !== 'rejetee' || variant.correcteur !== 'rejetee') continue;
        appendFingerprint(record.current, variants[index], reportPath);
        rejected++;
      }
      if (rejected) record.ownBankEvidence.push({ report: reportPath, rejected });
    }
  }
}

const crossReportFile = 'corrections/resultats/variantes-sql-b2b3-partie2.json';
if (fs.existsSync(fromRoot(crossReportFile))) {
  const crossReport = readJson(crossReportFile);
  const requiredSources = [
    'server/exercises/index.js', 'server/exercises/runner.js', 'server/exercises/grading-policy.js',
    'server/exercises/sql.js', 'server/exercises/b3-sql.js', 'server/services/execution/index.js',
    'assets/js/engines/sql-wasm-engine.js', 'assets/js/engines/engine-interface.js',
    'b1-sql/assets/vendor/sqljs/sql-wasm.js', 'b1-sql/assets/vendor/sqljs/sql-wasm.wasm',
    'corrections/outils/sondes/sql-variantes/lancer-sql.js', 'corrections/outils/sondes/couverture/stimuli.js'
  ];
  const sourceMatches = crossReport.sources_stables === true && requiredSources.every(name => {
    const expected = crossReport.empreintes_sources?.[`/project/${name}`];
    return expected && fs.existsSync(fromRoot(name)) && hash(fs.readFileSync(fromRoot(name))) === expected;
  });
  const caseSourceMatches = fs.existsSync(ownBankSource) &&
    hash(fs.readFileSync(ownBankSource)) === crossReport.empreintes_sources?.['/project/corrections/outils/sondes/sql-variantes/cas_sql.py'];
  const oracleSource = fromRoot('corrections/outils/sondes/sql-variantes/oracle_sql.py');
  const oracleMatches = fs.existsSync(oracleSource) &&
    hash(fs.readFileSync(oracleSource)) === crossReport.empreintes_sources?.['/project/corrections/outils/sondes/sql-variantes/oracle_sql.py'];
  if (sourceMatches && caseSourceMatches && oracleMatches && Array.isArray(crossReport.exercices)) {
    for (const item of crossReport.exercices) {
      const exercise = byId.get(item.id);
      const record = records.get(item.id);
      const fingerprints = currentVariantFingerprints[item.id];
      if (!exercise || !record || !fingerprints || fingerprints.length !== 2 || item.cours !== exercise.course ||
          item.reference_independante !== 'conforme' || item.reference_correcteur !== 'acceptee' ||
          !Array.isArray(item.variantes) || item.variantes.length !== 2 ||
          item.variantes.some(variant => variant.preuve !== true || !Array.isArray(variant.cas_caches)) ||
          hash(JSON.stringify({ tests: exercise.tests, solution: exercise.solution })) !== crossReport.empreintes_exercices?.[item.id]) continue;
      for (const [index, variant] of item.variantes.entries()) {
        if (variant.oracle === 'rejetee' && variant.correcteur === 'rejetee') {
          appendFingerprint(record.current, fingerprints[index], crossReportFile);
        }
      }
      if (!Array.isArray(item.temoins_exclusifs) || item.temoins_exclusifs.length !== 2) continue;
      const [first, second] = item.temoins_exclusifs;
      if (!Number.isInteger(first) || !Number.isInteger(second) || first === second || first < 1 || second < 1 ||
          first > Math.min(MAX_TESTS, exercise.tests.length) || second > Math.min(MAX_TESTS, exercise.tests.length)) continue;
      const state = (variant, index) => item.variantes[variant].cas_caches.find(entry => entry.numero === index)?.etat;
      if (state(0, first) !== 'rejetee' || state(1, first) !== 'acceptee' ||
          state(0, second) !== 'acceptee' || state(1, second) !== 'rejetee') continue;
      const available = exercise.tests.slice(0, MAX_TESTS).map((test, index) => index + 1);
      const firstCandidates = available.filter(index => state(0, index) === 'rejetee' && state(1, index) === 'acceptee');
      const secondCandidates = available.filter(index => state(0, index) === 'acceptee' && state(1, index) === 'rejetee');
      const candidates = firstCandidates.flatMap(left => secondCandidates.map(right => [left, right]))
        .map(indexes => indexes.map(index => String(exercise.tests[index - 1].stdin || '')))
        .filter(values => stimulus(exercise, values[0], null) !== stimulus(exercise, values[1], null));
      const pair = candidates.find(values => values.every(input => !witnessVisibleInProjection(exercise, input))) || candidates[0];
      if (!pair) continue;
      record.crossWitness = {
        distinct: true,
        visible: pair.filter(input => witnessVisibleInProjection(exercise, input)).length,
        oracleSourceMatches: oracleMatches,
        source: crossReportFile
      };
    }
  }
}

const matrixReportFile = 'corrections/resultats/matrice-suspendus-lot1-partie2.json';
if (fs.existsSync(fromRoot(matrixReportFile))) {
  const matrixCheck = spawnSync('python3', ['-I',
    fromRoot('corrections/outils/sondes/matrice-suspendus/verifier-rapport.py'),
    fromRoot(matrixReportFile), '--repo', root], { encoding: 'utf8', timeout: 10000 });
  if (matrixCheck.status !== 0) throw new Error('Matrice suspendue non vérifiable : ' + matrixCheck.stderr);
  const matrixReport = readJson(matrixReportFile);
  if (matrixReport.etat !== 'complet' || matrixReport.exercices.length !== 90 ||
      new Set(matrixReport.exercices.map(item => item.id)).size !== 90) {
    throw new Error('Périmètre incomplet de la matrice suspendue.');
  }
  for (const item of matrixReport.exercices) {
    const exercise = byId.get(item.id);
    const record = records.get(item.id);
    if (!exercise || !record || !record.suspended || item.cours !== exercise.course ||
        !item.corrige.conforme_sur_tous_les_cas) throw new Error('Fiche de matrice incohérente : ' + item.id);
    for (const variant of item.variantes) {
      if (variant.verdict === 'rejet_mauvaise_sortie') {
        appendFingerprint(record.defined, variant.source_sha256, matrixReportFile);
        appendFingerprint(record.current, variant.source_sha256, matrixReportFile);
      }
    }
    const pair = item.temoins_par_paire.find(entry => entry.variantes[0] === 1 && entry.variantes[1] === 2);
    if (!pair) continue;
    const matchingCase = (number, rejected, accepted) => {
      const cell = item.matrice.find(entry => entry.numero === number);
      if (!cell || cell.origine !== 'test_cache' || cell.corrige.etat !== 'accepte' ||
          !Number.isInteger(cell.indice_origine) || cell.indice_origine < 1 ||
          cell.indice_origine > Math.min(MAX_TESTS, exercise.tests.length)) return null;
      const state = variant => cell.variantes.find(entry => entry.numero === variant)?.etat;
      if (state(rejected) !== 'mauvaise_sortie' || state(accepted) !== 'accepte') return null;
      return String(exercise.tests[cell.indice_origine - 1].stdin || '');
    };
    const first = pair.temoins_premiere_seule.map(number => matchingCase(number, 1, 2)).filter(value => value !== null);
    const second = pair.temoins_seconde_seule.map(number => matchingCase(number, 2, 1)).filter(value => value !== null);
    const candidates = first.flatMap(left => second.map(right => [left, right])).filter(values =>
      stimulus(exercise, values[0], null) !== stimulus(exercise, values[1], null));
    const selected = candidates.find(values => values.every(input => !witnessVisibleInProjection(exercise, input))) || candidates[0];
    if (!selected) continue;
    record.crossWitness = {
      distinct: true,
      visible: selected.filter(input => witnessVisibleInProjection(exercise, input)).length,
      oracleSourceMatches: false,
      source: matrixReportFile
    };
  }
}

function union(...maps) {
  const result = new Set();
  for (const map of maps) for (const key of map.keys()) result.add(key);
  return result.size;
}
const directCount = record => Math.max(record.current.size, record.currentFloor);
const recentCount = record => Math.max(union(record.current, record.reconstructed), record.currentFloor);
const historicalCount = record => Math.max(union(record.current, record.reconstructed, record.historical), record.currentFloor);

const sorted = [...records.values()].sort((left, right) => left.id < right.id ? -1 : left.id > right.id ? 1 : 0);
const independenceSupported = sorted.filter(record => record.crossWitness?.distinct);
const independenceUnestablished = sorted.filter(record => !record.crossWitness?.distinct);
const crossVisible = sorted.filter(record => record.crossWitness?.visible > 0);
const aDistinct = sorted.filter(record => !record.unknownInputs && record.distinct < 2);
const aVisible = sorted.filter(record => !record.unknownInputs && record.notDetectedVisible < 2);
const bDirect = sorted.filter(record => directCount(record) < 2);
const bCurrent = sorted.filter(record => recentCount(record) < 2);
const bHistorical = sorted.filter(record => historicalCount(record) < 2);
const makeUnion = (first, second) => {
  const ids = new Set([...first, ...second].map(record => record.id));
  return sorted.filter(record => ids.has(record.id));
};
const unionCurrent = makeUnion(aVisible, bCurrent);
const unionHistorical = makeUnion(aVisible, bHistorical);
const unionDirect = makeUnion(aVisible, bDirect);
const unionIndependence = makeUnion(independenceUnestablished, bDirect);
const hiddenIndependenceUnestablished = makeUnion(independenceUnestablished, crossVisible);
const unionHiddenIndependence = makeUnion(hiddenIndependenceUnestablished, bDirect);

if (JSON.stringify(initialSources) !== JSON.stringify(sourcesSnapshot())) {
  throw new Error('Sources modifiées pendant le recensement ; relancer');
}
fs.mkdirSync(destination, { recursive: true, mode: 0o700 });
function write(name, contents) {
  fs.writeFileSync(path.join(destination, name), contents, { mode: 0o600, flag: 'wx' });
}
const sourceFor = record => `server/exercises/${record.course === 'Cyber securite B2' ? 'cyber-securite-b2' : record.course}.js`;
const idsOnly = values => values.map(record => `${record.id}\t${record.course}\t${sourceFor(record)}`).join('\n') + (values.length ? '\n' : '');
write('a-moins-2-donnees-automatiques.tsv', idsOnly(aDistinct));
write('a-moins-2-cachees-demontre.tsv', idsOnly(aVisible));
write('a-independance-non-demontree.tsv', idsOnly(independenceUnestablished));
write('a-independance-differentielle-observee.tsv', idsOnly(independenceSupported));
write('a-deux-cachees-independantes-non-demontrees.tsv', idsOnly(hiddenIndependenceUnestablished));
write('b-moins-2-rejets-attribues-directement.tsv', idsOnly(bDirect));
write('b-moins-2-rejets-preuves-recents.tsv', idsOnly(bCurrent));
write('b-moins-2-rejets-preuves-historiques.tsv', idsOnly(bHistorical));
write('union-preuves-directes.tsv', idsOnly(unionDirect));
write('union-preuves-recentes.tsv', idsOnly(unionCurrent));
write('union-preuves-historiques.tsv', idsOnly(unionHistorical));
write('union-independance-non-demontree.tsv', idsOnly(unionIndependence));
write('union-deux-cachees-independantes-non-demontrees.tsv', idsOnly(unionHiddenIndependence));
write('suspendus-independance-non-demontree.tsv', idsOnly(independenceUnestablished.filter(record => record.suspended)));
write('suspendus-independance-differentielle-observee.tsv', idsOnly(independenceSupported.filter(record => record.suspended)));
write('suspendus-deux-cachees-independantes-non-demontrees.tsv', idsOnly(hiddenIndependenceUnestablished.filter(record => record.suspended)));
write('suspendus-moins-2-cachees-maximum.tsv', idsOnly(aVisible.filter(record => record.suspended)));
write('suspendus-moins-2-rejets-nominatifs.tsv', idsOnly(bDirect.filter(record => record.suspended)));
write('suspendus-moins-2-rejets-recents.tsv', idsOnly(bCurrent.filter(record => record.suspended)));
write('suspendus-moins-2-rejets-historiques.tsv', idsOnly(bHistorical.filter(record => record.suspended)));
write('suspendus-union-preuves-directes.tsv', idsOnly(unionDirect.filter(record => record.suspended)));
write('suspendus-union-preuves-recentes.tsv', idsOnly(unionCurrent.filter(record => record.suspended)));
write('suspendus-union-preuves-historiques.tsv', idsOnly(unionHistorical.filter(record => record.suspended)));
write('suspendus-union-independance-non-demontree.tsv', idsOnly(unionIndependence.filter(record => record.suspended)));
write('suspendus-union-deux-cachees-independantes-non-demontrees.tsv', idsOnly(unionHiddenIndependence.filter(record => record.suspended)));
const ownRows = sorted.filter(record => record.ownBankEvidence.length).map(record => [record.id, record.course,
  Math.max(...record.ownBankEvidence.map(item => item.rejected)),
  record.ownBankEvidence.map(item => item.report).join('|')].join('\t'));
write('rejeux-banc-sql.tsv', `identifiant\tcours\trejets_attribues\tprovenance\n${ownRows.join('\n')}\n`);
const crossRows = sorted.filter(record => record.nominalTapState).map(record => {
  const exercise = byId.get(record.id);
  const pair = exercise.tests.slice(-2).map(test => sqlStimulus(sqlEngine, test.stdin));
  const visible = new Set((exercise.examples || []).map(example => sqlStimulus(sqlEngine, example.stdin)));
  return [record.id, record.course, pair[0] !== pair[1] ? 'oui' : 'non',
    pair.filter(item => visible.has(item)).length, record.nominalTapState,
    [...record.floorSources].join('|')].join('\t');
});
write('discrimination-croisee-sql.tsv', `identifiant\tcours\tstimuli_distincts_auto\tvisibilite_detectee\tcorrespondance_source_tap\tprovenance\n${crossRows.join('\n')}\n`);
const versionedCrossRows = sorted.filter(record => record.crossWitness).map(record => [record.id, record.course,
  record.crossWitness.distinct ? 'oui' : 'non', record.crossWitness.visible,
  record.crossWitness.oracleSourceMatches ? 'conforme' : 'non_retrouvee', record.crossWitness.source].join('\t'));
write('discriminations-croisees-empreintes.tsv', `identifiant\tcours\tstimuli_distincts_auto\tvisibilite_detectee\tsource_oracle_rejeu\tprovenance\n${versionedCrossRows.join('\n')}\n`);
const usedForEvidence = new Set(sorted.flatMap(record => [
  ...allSources(record.current), ...allSources(record.reconstructed),
  ...allSources(record.historical), ...record.floorSources
]).flatMap(source => source.split(';')));
const usedForDefinitions = new Set(sorted.flatMap(record => allSources(record.defined))
  .flatMap(source => source.split(';')));
const manifest = Object.keys(initialSources).filter(filename => filename.startsWith('corrections/fixtures/') ||
  filename.startsWith('corrections/outils/sondes/') ||
  (filename.startsWith('tests/') && path.basename(filename).includes('lot1'))).sort();
write('perimetre-bancs.tsv', `provenance\tvariantes_definies\tutilise_pour_rejet_attribue\n${manifest.map(filename =>
  `${filename}\t${usedForDefinitions.has(filename) ? 'oui' : 'non'}\t${usedForEvidence.has(filename) ? 'oui' : 'non'}`).join('\n')}\n`);
write('.empreintes-inventaire.json', `${JSON.stringify({ date: new Date().toISOString(), sources: initialSources })}\n`);
const exerciseFingerprints = Object.fromEntries(exercises.map(exercise => [exercise.id, {
  version: hash(JSON.stringify({ tests: exercise.tests, solution: exercise.solution, examples: exercise.examples,
    starter: exercise.starter, brief: exercise.brief, goal: exercise.goal,
    verifyFirstExample: exercise.verifyFirstExample, requiredShebang: exercise.requiredShebang })),
  tests: (exercise.tests || []).map(test => hash(JSON.stringify(test))),
  stimuli: (exercise.tests || []).slice(0, MAX_TESTS).map(test => {
    const parts = exercise.language === 'analyse' ? sections(exercise.starter) : null;
    const input = stimulus(exercise, test.stdin, parts);
    return input === null ? null : hash(input);
  }),
  programme: hash(exercise.solution)
}]));
write('.empreintes-exercices.json', `${JSON.stringify(exerciseFingerprints)}\n`);

const header = ['identifiant', 'cours', 'langage', 'suspendu', 'tests_actifs', 'donnees_distinctes_auto',
  'visibilite_detectee', 'visibilite_non_determinee', 'entrees_non_reconstituees', 'independance',
  'variantes_definies_au_moins', 'rejets_recents_attribues_au_moins', 'rejets_agreges_reconstitues',
  'rejets_historiques_non_actualises', 'provenance_banc', 'provenance_donnees', 'etat_tap_nominal'].join('\t');
const rows = sorted.map(record => [record.id, record.course, record.language, record.suspended ? 'oui' : 'non',
  record.activeTests, record.distinct, record.visible, record.notDetectedVisible, record.unknownInputs,
  record.crossWitness ? record.crossWitness.distinct ? record.crossWitness.visible ? 'croisement_rejoue_visibilite_detectee' : 'croisement_rejoue_visibilite_non_detectee' :
    'croisement_meme_stimulus_non_compte' :
  record.nominalTapState === 'source_modifiee_depuis_tap' ? 'croisement_historique_non_fige' :
    record.nominalTapState ? 'croisement_observe_non_fige' : 'non-demontree',
  Math.max(record.defined.size, record.currentFloor), directCount(record), record.reconstructed.size, record.historical.size,
  [...new Set([...allSources(record.defined), ...allSources(record.current), ...allSources(record.reconstructed),
    ...allSources(record.historical), ...record.floorSources])].join('|'), sourceFor(record), record.nominalTapState].join('\t'));
write('inventaire-par-identifiant.tsv', `${header}\n${rows.join('\n')}\n`);

const grouped = recordsToCount => {
  const groups = {};
  for (const record of recordsToCount) groups[record.course] = (groups[record.course] || 0) + 1;
  return groups;
};
const summary = {
  catalogue: sorted.length,
  suspended: sorted.filter(record => record.suspended).length,
  analysisExercises: sorted.filter(record => record.language === 'analyse').length,
  analysisStartersPreservedByProjection: sorted.filter(record => record.exposedStarter).length,
  analysisSelectors,
  analysisVisible,
  unresolvedInputs: sorted.filter(record => record.unknownInputs).length,
  differentialIndependenceSupported: independenceSupported.length,
  differentialIndependenceUnestablished: independenceUnestablished.length,
  crossWitnessVisibleInProjection: crossVisible.length,
  hiddenIndependenceUnestablished: hiddenIndependenceUnestablished.length,
  lessTwoDistinctAutomatically: aDistinct.length,
  lessTwoUndetectedVisible: aVisible.length,
  lessTwoRecentDirect: bDirect.length,
  lessTwoRecentPlusReconstructed: bCurrent.length,
  lessTwoIncludingHistorical: bHistorical.length,
  unionDirect: unionDirect.length,
  unionRecent: unionCurrent.length,
  unionHistorical: unionHistorical.length,
  unionDifferentialIndependenceUnestablished: unionIndependence.length,
  currentTwoDirect: sorted.length - bDirect.length,
  currentTwoDirectOrReconstructed: sorted.length - bCurrent.length,
  twoIncludingHistorical: sorted.length - bHistorical.length,
  analysisReconstructed: reconstructedCount,
  aggregateFingerprintMatches: Boolean(matchingSnapshot),
  suspendedLessTwoDistinct: grouped(aDistinct.filter(record => record.suspended)),
  suspendedDifferentialIndependenceSupported: grouped(independenceSupported.filter(record => record.suspended)),
  suspendedLessTwoUndetectedVisible: grouped(aVisible.filter(record => record.suspended)),
  suspendedLessTwoDirect: grouped(bDirect.filter(record => record.suspended)),
  suspendedLessTwoRecent: grouped(bCurrent.filter(record => record.suspended)),
  suspendedLessTwoHistorical: grouped(bHistorical.filter(record => record.suspended)),
  suspendedUnionDirect: grouped(unionDirect.filter(record => record.suspended)),
  suspendedUnionRecent: grouped(unionCurrent.filter(record => record.suspended)),
  suspendedUnionHistorical: grouped(unionHistorical.filter(record => record.suspended))
};
write('comptes.json', `${JSON.stringify(summary, null, 2)}\n`);
console.log(JSON.stringify(summary));
