/**
 * tests/exercise-solutions.test.js — cohérence réelle du catalogue.
 *
 * On exécute chaque corrigé avec la chaîne d'outils locale de son langage
 * (interpréteur Python, Node pour JavaScript, compilateur C ou C++, interpréteur
 * PHP) et on vérifie qu'il produit exactement les sorties attendues par les
 * tests (et l'exemple).
 * Sans ce contrôle, un énoncé peut être insoluble ou une sortie attendue fausse
 * sans que rien ne le signale.
 *
 * Chaque langage dont l'outillage est absent est simplement ignoré : l'absence
 * de compilateur local n'est pas un défaut du catalogue.
 */
const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const exercises = require('../server/exercises');
const { matchOutputs } = require('../server/exercises/runner');
const { normalizeOutput } = require('../server/services/execution');
const localRunner = require('../server/services/execution/local-runner');

function findTool(candidates) {
  for (const candidate of candidates.filter(Boolean)) {
    // Un chemin contenant un slash est résolu par rapport au cwd de l'enfant
    // (et non du parent) au moment de l'exécution : le rendre absolu d'entrée.
    const bin = candidate.includes('/') ? path.resolve(candidate) : candidate;
    try {
      execFileSync(bin, ['--version'], { stdio: 'ignore' });
      return bin;
    } catch {
      // candidat suivant
    }
  }
  return null;
}

const PYTHON = findTool([process.env.PYTHON_BIN, 'python3', 'python']);
const CC = findTool([process.env.CC, 'gcc', 'cc']);
const CXX = findTool([process.env.CXX, 'g++', 'c++']);
// CLI PHP absent des dépôts de la machine : binaire portable vendé dans
// `tools/php-cli/` (déposé volontairement hors des dossiers servis).
const PHP = findTool([process.env.PHP_BIN, 'php', 'php8', 'php8.3', 'tools/php-cli/php']);
const NODE = findTool([process.env.NODE_BIN, 'node']);
// Bash est présent sur les systèmes Unix (Git Bash sous Windows) : les labs
// shell s'exécutent en réel comme les autres langages.
const BASH = findTool([process.env.BASH_BIN, '/bin/bash', 'bash']);
const JAVAC = findTool([
  process.env.JAVAC_BIN,
  'javac',
  path.join(os.homedir(), '.local/share/mise/installs/java/21/bin/javac'),
  path.join(os.homedir(), '.local/share/mise/installs/java/latest/bin/javac')
]);
const JAVA = findTool([
  process.env.JAVA_BIN,
  'java',
  path.join(os.homedir(), '.local/share/mise/installs/java/21/bin/java'),
  path.join(os.homedir(), '.local/share/mise/installs/java/latest/bin/java')
]);
const DOTNET = findTool([process.env.DOTNET_BIN, 'dotnet', '/usr/local/bin/dotnet']);
const SqlWasmEngine = require('../assets/js/engines/sql-wasm-engine');

/** Outil disponible pour un langage donné, ou null. */
function toolFor(language) {
  if (language === 'python') return PYTHON && { kind: 'script', bin: PYTHON };
  if (language === 'shell') return BASH && { kind: 'shell', bin: BASH };
  if (language === 'c') return CC && { kind: 'compile', bin: CC, std: 'c11', ext: 'c' };
  if (language === 'cpp') return CXX && { kind: 'compile', bin: CXX, std: 'c++17', ext: 'cpp' };
  if (language === 'php') return PHP && { kind: 'php', bin: PHP };
  if (language === 'javascript') return NODE && { kind: 'node', bin: NODE };
  if (language === 'java') return JAVAC && JAVA && { kind: 'java', javac: JAVAC, java: JAVA };
  if (language === 'csharp') return DOTNET && { kind: 'csharp', bin: DOTNET };
  if (language === 'sql') return { kind: 'sql' };
  if (language === 'algo') return { kind: 'algo' };
  if (language === 'analyse') return { kind: 'analyse' };
  return null;
}

function prepareSql(code) {
  return {
    run: async stdin => {
      const res = await SqlWasmEngine.execute(code, stdin);
      return {
        ok: res && res.status === 'success',
        stdout: (res && res.stdout) || '',
        stderr: (res && res.stderr) || '',
        exitCode: res && res.status === 'success' ? 0 : 1
      };
    }
  };
}

function prepareAlgo(code) {
  return {
    run: async stdin => {
      const res = await localRunner.runPseudoCode(code, stdin);
      return {
        ok: Boolean(res && res.ok),
        stdout: (res && res.data && res.data.stdout) || '',
        stderr: (res && res.data && res.data.stderr) || '',
        exitCode: res && res.data && typeof res.data.exit_code === 'number' ? res.data.exit_code : 1
      };
    }
  };
}

const TEMP_DIRS = [];

process.on('exit', () => {
  for (const dir of TEMP_DIRS) {
    try { fs.rmSync(dir, { recursive: true, force: true }); } catch { /* ignore */ }
  }
});

function prepareAnalyse(code) {
  return {
    run: async stdin => {
      const res = await localRunner.runAnalyse(code, stdin);
      return {
        ok: Boolean(res && res.ok),
        stdout: (res && res.data && res.data.stdout) || '',
        stderr: (res && res.data && res.data.stderr) || '',
        exitCode: res && res.data && typeof res.data.exit_code === 'number' ? res.data.exit_code : 0
      };
    }
  };
}

/**
 * Prépare un exécutable pour un couple (langage, code). Pour un langage
 * interprété, on renvoie directement le script ; pour un langage compilé, on
 * compile une fois puis on réutilise le binaire pour tous les tests.
 */
function prepare(language, code) {
  const tool = toolFor(language);
  if (!tool) return null;

  if (tool.kind === 'analyse') {
    return prepareAnalyse(code);
  }
  if (tool.kind === 'algo') {
    return prepareAlgo(code);
  }
  if (tool.kind === 'sql') {
    return prepareSql(code);
  }

  if (tool.kind === 'script') {
    return { run: stdin => runProcess(tool.bin, ['-c', code], stdin, null) };
  }

  if (tool.kind === 'php') {
    return preparePhp(tool.bin, code);
  }

  if (tool.kind === 'node') {
    return prepareNode(tool.bin, code);
  }

  if (tool.kind === 'shell') {
    return prepareShell(tool.bin, code);
  }

  if (tool.kind === 'java') {
    return prepareJava(tool.javac, tool.java, code);
  }

  if (tool.kind === 'csharp') {
    return prepareCsharp(tool.bin, code);
  }

  const dir = fs.mkdtempSync(path.join(os.tmpdir(), `exo-${language}-`));
  TEMP_DIRS.push(dir);
  const source = path.join(dir, `main.${tool.ext}`);
  const binary = path.join(dir, 'prog');
  fs.writeFileSync(source, code, 'utf8');

  try {
    execFileSync(tool.bin, [`-std=${tool.std}`, '-O0', '-o', binary, source], { stdio: 'pipe' });
  } catch (error) {
    fs.rmSync(dir, { recursive: true, force: true });
    return { compileError: String(error.stderr || error.message) };
  }

  return { run: stdin => runProcess(binary, [], stdin, dir) };
}

/** PHP : script écrit dans un fichier temporaire puis interprété. */
function preparePhp(bin, code) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'exo-php-'));
  TEMP_DIRS.push(dir);
  const source = path.join(dir, 'main.php');
  fs.writeFileSync(source, code, 'utf8');
  // display_errors sur stderr pour ne jamais polluer la sortie comparée.
  return { run: stdin => runProcess(bin, ['-d', 'display_errors=stderr', '-d', 'log_errors=0', source], stdin, null) };
}

/**
 * JavaScript : script écrit dans un fichier temporaire, puis exécuté par Node.
 * Le script est lu depuis stdin : l'entrée standard du programme reste donc
 * libre pour les données de l'exercice.
 */
function prepareNode(bin, code) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'exo-js-'));
  TEMP_DIRS.push(dir);
  const source = path.join(dir, 'main.js');
  // Le fichier doit être un module CommonJS : certains extraits d'énoncé
  // manipulent `require`, ce qui suppose ce format.
  fs.writeFileSync(source, code, 'utf8');
  return { run: stdin => runProcess(bin, [source], stdin, dir) };
}

/** Bash : script écrit dans un fichier temporaire, exécuté depuis ce dossier. */
function prepareShell(bin, code) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'exo-sh-'));
  TEMP_DIRS.push(dir);
  const source = path.join(dir, 'main.sh');
  fs.writeFileSync(source, code, 'utf8');
  return { run: stdin => runProcess(bin, [source], stdin, dir) };
}

/** Java : Main.java compilé puis exécuté sur le JDK local. */
function prepareJava(javacBin, javaBin, code) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'exo-java-'));
  TEMP_DIRS.push(dir);
  const source = path.join(dir, 'Main.java');
  fs.writeFileSync(source, code, 'utf8');
  try {
    execFileSync(javacBin, ['-encoding', 'UTF-8', source], { cwd: dir, stdio: 'pipe' });
  } catch (error) {
    return { compileError: String(error.stderr || error.message) };
  }
  return { run: stdin => runProcess(javaBin, ['-cp', dir, 'Main'], stdin, dir) };
}

/** C# : Program.cs compilé en net10.0 (ou SDK courant) avec dotnet. */
function prepareCsharp(dotnetBin, code) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'exo-cs-'));
  TEMP_DIRS.push(dir);
  const outDir = path.join(dir, 'out');
  fs.writeFileSync(
    path.join(dir, 'exo.csproj'),
    '<Project Sdk="Microsoft.NET.Sdk"><PropertyGroup><OutputType>Exe</OutputType><TargetFramework>net10.0</TargetFramework><ImplicitUsings>disable</ImplicitUsings><Nullable>disable</Nullable></PropertyGroup></Project>',
    'utf8'
  );
  fs.writeFileSync(path.join(dir, 'Program.cs'), code, 'utf8');
  try {
    execFileSync(dotnetBin, ['build', '--nologo', '-v', 'q', '-o', outDir], { cwd: dir, stdio: 'pipe', timeout: 30000 });
  } catch (error) {
    return { compileError: String(error.stderr || error.stdout || error.message) };
  }
  return { run: stdin => runProcess(dotnetBin, [path.join(outDir, 'exo.dll')], stdin, dir) };
}

function runProcess(command, args, stdin, cwd) {
  try {
    const stdout = execFileSync(command, args, {
      input: stdin || '',
      cwd: cwd || os.tmpdir(),
      encoding: 'utf8',
      timeout: 20000
    });
    return { ok: true, stdout, stderr: '' };
  } catch (error) {
    // Un programme qui se termine anormalement (code de sortie non nul) reste
    // un résultat exploitable : on récupère sa sortie partielle.
    if (error.status !== undefined && error.status !== null && error.status !== 0) {
      return { ok: false, stdout: error.stdout || '', stderr: error.stderr || String(error.message) };
    }
    return { ok: false, stdout: error.stdout || '', stderr: error.stderr || String(error.message) };
  }
}

const CATALOGUE = exercises.listExercises();

test("outillage : au moins un langage vérifiable en local", () => {
  assert.ok(PYTHON || NODE || CC || CXX || PHP, 'aucun interpréteur ni compilateur disponible');
});

test('intégrité corrigés : aucune table de correspondance base64 (in_b64) ni triche par lookup de stdin', () => {
  const fs = require('fs');
  const path = require('path');
  const offenders = [];
  for (const exercise of CATALOGUE) {
    const sol = String(exercise.solution || '');
    if (/\bin_b64\b/.test(sol) || (/base64\s+-d/.test(sol) && /\bcase\s+"\$in_b64"/.test(sol))) {
      offenders.push(`${exercise.course}/${exercise.id}`);
    }
  }
  const exRoot = path.join(__dirname, '..', 'server', 'exercises');
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith('.js')) {
        const raw = fs.readFileSync(full, 'utf8');
        if (/\bin_b64\b/.test(raw) || /base64\s+-d/.test(raw)) {
          offenders.push(`file:${path.relative(exRoot, full)}`);
        }
      }
    }
  }
  walk(exRoot);
  assert.deepEqual(
    offenders,
    [],
    `Solutions factices in_b64 détectées (${offenders.length}) : ${offenders.join(', ')}`
  );
});

test('corrigés : chaque solution passe ses propres tests', async t => {
  assert.ok(CATALOGUE.length >= 42, `catalogue trop court : ${CATALOGUE.length}`);

  let checks = 0;

  for (const exercise of CATALOGUE) {
    if (!toolFor(exercise.language)) continue;
    const prepared = prepare(exercise.language, exercise.solution);
    assert.ok(!prepared.compileError, `${exercise.id} : échec de compilation — ${prepared.compileError}`);

    for (const testCase of exercise.tests) {
      await t.test(`${exercise.id} · ${testCase.label}`, async () => {
        const run = await prepared.run(testCase.stdin);
        assert.ok(run.ok, `échec d'exécution : ${run.stderr.split('\n').slice(-3).join(' ')}`);
        assert.ok(
          matchOutputs(run.stdout, testCase.expected, testCase, exercise),
          `sortie inattendue pour l'entrée « ${(testCase.stdin || '(vide)').replace(/\n/g, ' / ')} » : reçu ${JSON.stringify(normalizeOutput(run.stdout))}, attendu ${JSON.stringify(normalizeOutput(testCase.expected))}`
        );
        checks++;
      });
    }

    for (const example of exercise.examples) {
      await t.test(`${exercise.id} · exemple visible`, async () => {
        if (exercise.language === 'analyse') {
          assert.ok(typeof example.expected === 'string' && example.expected.trim().length > 0);
          checks++;
          return;
        }
        const run = await prepared.run(example.stdin);
        assert.ok(run.ok, `échec d'exécution : ${run.stderr.split('\n').slice(-3).join(' ')}`);
        assert.ok(
          matchOutputs(run.stdout, example.expected, example, exercise),
          `sortie exemple inattendue : reçu ${JSON.stringify(normalizeOutput(run.stdout))}, attendu ${JSON.stringify(normalizeOutput(example.expected))}`
        );
        checks++;
      });
    }
  }

  assert.ok(checks >= 60, `couverture insuffisante : ${checks} vérifications`);
});

test('corrigés : le code de départ échoue au moins un test', async t => {
  for (const exercise of CATALOGUE) {
    if (!toolFor(exercise.language)) continue;
    await t.test(`${exercise.id} · code de départ incomplet`, async () => {
      const prepared = prepare(exercise.language, exercise.starter);
      assert.ok(!prepared.compileError, `${exercise.id} : le code de départ ne compile pas — ${prepared.compileError}`);
      const outcomes = [];
      for (const testCase of exercise.tests) {
        const run = await prepared.run(testCase.stdin);
        outcomes.push(run.ok && matchOutputs(run.stdout, testCase.expected, testCase, exercise));
      }
      assert.ok(
        outcomes.some(ok => !ok),
        `tous les tests passent avec le code de départ (${outcomes.length} tests)`
      );
    });
  }
});

test('corrigés : le code de départ se termine normalement (pas d’erreur bloquante prématurée)', async t => {
  // Un exercice volontairement « cassé » (Python, module 6, exercice 1) est
  // exclu : son code de départ doit justement planter, c'est le sujet.
  const accepted = new Set(['py-c6-e1']);

  for (const exercise of CATALOGUE) {
    if (!toolFor(exercise.language)) continue;
    if (accepted.has(exercise.id)) continue;
    await t.test(`${exercise.id} · démarrage propre`, async () => {
      const prepared = prepare(exercise.language, exercise.starter);
      assert.ok(!prepared.compileError, `le code de départ ne compile pas : ${prepared.compileError}`);
      for (const example of exercise.examples) {
        const run = await prepared.run(example.stdin);
        assert.ok(run.ok, `le code de départ plante : ${run.stderr.split('\n').slice(-3).join(' ')}`);
      }
    });
  }
});
