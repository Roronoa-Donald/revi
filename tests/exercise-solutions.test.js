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
const { normalizeOutput } = require('../server/services/execution');

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

/** Outil disponible pour un langage donné, ou null. */
function toolFor(language) {
  if (language === 'python') return PYTHON && { kind: 'script', bin: PYTHON };
  if (language === 'shell') return BASH && { kind: 'shell', bin: BASH };
  if (language === 'c') return CC && { kind: 'compile', bin: CC, std: 'c11', ext: 'c' };
  if (language === 'cpp') return CXX && { kind: 'compile', bin: CXX, std: 'c++17', ext: 'cpp' };
  if (language === 'php') return PHP && { kind: 'php', bin: PHP };
  if (language === 'javascript') return NODE && { kind: 'node', bin: NODE };
  if (language === 'analyse') return { kind: 'analyse' };
  return null;
}

const TEMP_DIRS = [];

process.on('exit', () => {
  for (const dir of TEMP_DIRS) {
    try { fs.rmSync(dir, { recursive: true, force: true }); } catch { /* ignore */ }
  }
});

function prepareAnalyse(code) {
  const rawLines = String(code || '').replace(/\r\n?/g, '\n').split('\n');
  const headerRe = /^\[(?:cas\s*(\d+)|exemple)\b.*\]$/i;
  const sections = new Map();
  const allSectionLines = [];
  let currentKey = null;

  for (const rawLine of rawLines) {
    const rtrim = rawLine.replace(/\s+$/, '');
    const trimmed = rtrim.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const m = headerRe.exec(trimmed);
    if (m) {
      currentKey = m[1] ? `cas:${m[1]}` : 'cas:exemple';
      if (!sections.has(currentKey)) sections.set(currentKey, []);
      continue;
    }
    if (currentKey !== null) {
      sections.get(currentKey).push(rtrim);
    }
    allSectionLines.push(rtrim);
  }

  return {
    run: stdin => {
      const sel = String(stdin || '').trim();
      let out = '';
      if (/^cas\s*:/i.test(sel)) {
        const key = sel.toLowerCase().replace(/\s+/g, '');
        out = (sections.get(key) || []).join('\n');
      } else if (sections.has('cas:exemple')) {
        out = sections.get('cas:exemple').join('\n');
      } else {
        out = allSectionLines.join('\n');
      }
      return { ok: true, stdout: out, stderr: '', exitCode: 0 };
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

test('corrigés : chaque solution passe ses propres tests', async t => {
  assert.ok(CATALOGUE.length >= 42, `catalogue trop court : ${CATALOGUE.length}`);

  let checks = 0;

  for (const exercise of CATALOGUE) {
    if (!toolFor(exercise.language)) continue;
    const prepared = prepare(exercise.language, exercise.solution);
    assert.ok(!prepared.compileError, `${exercise.id} : échec de compilation — ${prepared.compileError}`);

    for (const testCase of exercise.tests) {
      await t.test(`${exercise.id} · ${testCase.label}`, () => {
        const run = prepared.run(testCase.stdin);
        assert.ok(run.ok, `échec d'exécution : ${run.stderr.split('\n').slice(-3).join(' ')}`);
        assert.strictEqual(
          normalizeOutput(run.stdout),
          normalizeOutput(testCase.expected),
          `sortie inattendue pour l'entrée « ${(testCase.stdin || '(vide)').replace(/\n/g, ' / ')} »`
        );
        checks++;
      });
    }

    for (const example of exercise.examples) {
      await t.test(`${exercise.id} · exemple visible`, () => {
        if (exercise.language === 'analyse') {
          assert.ok(typeof example.expected === 'string' && example.expected.trim().length > 0);
          checks++;
          return;
        }
        const run = prepared.run(example.stdin);
        assert.ok(run.ok, `échec d'exécution : ${run.stderr.split('\n').slice(-3).join(' ')}`);
        assert.strictEqual(normalizeOutput(run.stdout), normalizeOutput(example.expected));
        checks++;
      });
    }
  }

  assert.ok(checks >= 60, `couverture insuffisante : ${checks} vérifications`);
});

test('corrigés : le code de départ échoue au moins un test', async t => {
  for (const exercise of CATALOGUE) {
    if (!toolFor(exercise.language)) continue;
    await t.test(`${exercise.id} · code de départ incomplet`, () => {
      // Le code de départ peut passer le premier test par accident, mais il doit
      // échouer quelque part : sinon l'exercice n'a aucune valeur pédagogique.
      const prepared = prepare(exercise.language, exercise.starter);
      assert.ok(!prepared.compileError, `${exercise.id} : le code de départ ne compile pas — ${prepared.compileError}`);
      const outcomes = exercise.tests.map(testCase => {
        const run = prepared.run(testCase.stdin);
        return run.ok && normalizeOutput(run.stdout) === normalizeOutput(testCase.expected);
      });
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
    await t.test(`${exercise.id} · démarrage propre`, () => {
      const prepared = prepare(exercise.language, exercise.starter);
      assert.ok(!prepared.compileError, `le code de départ ne compile pas : ${prepared.compileError}`);
      for (const example of exercise.examples) {
        const run = prepared.run(example.stdin);
        assert.ok(run.ok, `le code de départ plante : ${run.stderr.split('\n').slice(-3).join(' ')}`);
      }
    });
  }
});
