'use strict';

const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { execFileSync } = require('node:child_process');
const crypto = require('node:crypto');

const ROOT = path.resolve(__dirname, '../..');
const exercises = require(path.join(ROOT, 'server/exercises'));
const { normalizeOutput } = require(path.join(ROOT, 'server/services/execution'));

function findTool(candidates) {
  for (const candidate of candidates.filter(Boolean)) {
    const bin = candidate.includes('/') ? path.resolve(ROOT, candidate) : candidate;
    try {
      execFileSync(bin, ['--version'], { stdio: 'ignore' });
      return bin;
    } catch {}
  }
  return null;
}

const PYTHON = findTool([process.env.PYTHON_BIN, 'python3', 'python']);
const CC = findTool([process.env.CC, 'gcc', 'cc']);
const CXX = findTool([process.env.CXX, 'g++', 'c++']);
const PHP = findTool([process.env.PHP_BIN, 'php', 'tools/php-cli/php']);
const NODE = findTool([process.env.NODE_BIN, 'node']);
const BASH = findTool([process.env.BASH_BIN, '/bin/bash', 'bash']);
const SqlWasmEngine = require(path.join(ROOT, 'assets/js/engines/sql-wasm-engine'));

function toolFor(language) {
  if (language === 'python') return PYTHON && { kind: 'script', bin: PYTHON };
  if (language === 'shell') return BASH && { kind: 'shell', bin: BASH };
  if (language === 'c') return CC && { kind: 'compile', bin: CC, std: 'c11', ext: 'c' };
  if (language === 'cpp') return CXX && { kind: 'compile', bin: CXX, std: 'c++17', ext: 'cpp' };
  if (language === 'php') return PHP && { kind: 'php', bin: PHP };
  if (language === 'javascript') return NODE && { kind: 'node', bin: NODE };
  if (language === 'sql') return { kind: 'sql' };
  return null;
}

function runProcess(command, args, stdin, cwd) {
  try {
    const stdout = execFileSync(command, args, {
      input: stdin || '',
      cwd: cwd || os.tmpdir(),
      encoding: 'utf8',
      timeout: 10000
    });
    return { ok: true, stdout, stderr: '' };
  } catch (error) {
    return { ok: false, stdout: error.stdout || '', stderr: error.stderr || String(error.message) };
  }
}

function prepare(language, code) {
  const tool = toolFor(language);
  if (!tool) return null;

  if (tool.kind === 'script') {
    return { run: stdin => runProcess(tool.bin, ['-c', code], stdin, null) };
  }

  if (tool.kind === 'php') {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'exo-php-'));
    const source = path.join(dir, 'main.php');
    fs.writeFileSync(source, code, 'utf8');
    return {
      run: stdin => runProcess(tool.bin, ['-d', 'display_errors=stderr', '-d', 'log_errors=0', source], stdin, null),
      clean: () => { try { fs.rmSync(dir, { recursive: true, force: true }); } catch {} }
    };
  }

  if (tool.kind === 'node') {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'exo-js-'));
    const source = path.join(dir, 'main.js');
    fs.writeFileSync(source, code, 'utf8');
    return {
      run: stdin => runProcess(tool.bin, [source], stdin, dir),
      clean: () => { try { fs.rmSync(dir, { recursive: true, force: true }); } catch {} }
    };
  }

  if (tool.kind === 'shell') {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'exo-sh-'));
    const source = path.join(dir, 'main.sh');
    fs.writeFileSync(source, code, 'utf8');
    return {
      run: stdin => runProcess(tool.bin, [source], stdin, dir),
      clean: () => { try { fs.rmSync(dir, { recursive: true, force: true }); } catch {} }
    };
  }

  if (tool.kind === 'compile') {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), `exo-${language}-`));
    const source = path.join(dir, `main.${tool.ext}`);
    const binary = path.join(dir, 'prog');
    fs.writeFileSync(source, code, 'utf8');
    try {
      execFileSync(tool.bin, [`-std=${tool.std}`, '-O0', '-o', binary, source], { stdio: 'pipe', timeout: 10000 });
      return {
        run: stdin => runProcess(binary, [], stdin, dir),
        clean: () => { try { fs.rmSync(dir, { recursive: true, force: true }); } catch {} }
      };
    } catch (e) {
      try { fs.rmSync(dir, { recursive: true, force: true }); } catch {}
      return { compileError: String(e.stderr || e.message) };
    }
  }

  return null;
}

function generateMutants(code, language) {
  const muts = [];
  const seen = new Set([code]);

  const patterns = [
    { from: /\b\+\b/g, to: '-' },
    { from: /\b-\b/g, to: '+' },
    { from: /\b\*\b/g, to: '+' },
    { from: /\/\//g, to: '/' },
    { from: /\b==\b/g, to: '!=' },
    { from: /\b!=\b/g, to: '==' },
    { from: /\b<=\b/g, to: '<' },
    { from: /\b>=\b/g, to: '>' },
    { from: /\btrue\b/gi, to: 'false' },
    { from: /\bfalse\b/gi, to: 'true' },
    { from: /\b0\b/g, to: '1' },
    { from: /\b1\b/g, to: '2' },
    { from: /\b60\b/g, to: '61' },
    { from: /\b100\b/g, to: '101' },
    { from: /\b3600\b/g, to: '3601' },
    { from: /\b1000\b/g, to: '1001' }
  ];

  for (const p of patterns) {
    let match;
    const re = new RegExp(p.from.source, p.from.flags);
    while ((match = re.exec(code)) !== null) {
      const candidate = code.slice(0, match.index) + p.to + code.slice(match.index + match[0].length);
      if (!seen.has(candidate)) {
        seen.add(candidate);
        muts.push({
          type: `${match[0]} -> ${p.to} @ ${match.index}`,
          code: candidate
        });
      }
      if (muts.length >= 8) break;
    }
    if (muts.length >= 8) break;
  }
  return muts;
}

async function testOne(exercise) {
  const lang = exercise.language;
  const tool = toolFor(lang);
  if (!tool) {
    return {
      id: exercise.id,
      course: exercise.course,
      language: lang,
      etat: 'outil_absent_ou_non_supporte',
      tests: exercise.tests.length
    };
  }

  // 1. Solution pass check
  const prep = prepare(lang, exercise.solution);
  if (!prep || prep.compileError) {
    return {
      id: exercise.id,
      course: exercise.course,
      language: lang,
      etat: 'erreur_compilation_corrige',
      error: prep ? prep.compileError : 'prepare impossible'
    };
  }

  let solOk = true;
  for (const t of exercise.tests) {
    const run = prep.run(t.stdin);
    if (!run.ok || normalizeOutput(run.stdout) !== normalizeOutput(t.expected)) {
      solOk = false;
      break;
    }
  }
  if (prep.clean) prep.clean();

  if (!solOk) {
    return {
      id: exercise.id,
      course: exercise.course,
      language: lang,
      etat: 'echec_corrige'
    };
  }

  // 2. Mutants check
  const muts = generateMutants(exercise.solution, lang);
  if (!muts.length) {
    return {
      id: exercise.id,
      course: exercise.course,
      language: lang,
      etat: 'sans_mutant',
      corrige_valide: true,
      tests: exercise.tests.length
    };
  }

  let rejected = 0;
  const survivors = [];

  for (const m of muts) {
    const mPrep = prepare(lang, m.code);
    if (!mPrep || mPrep.compileError) {
      // Compilation error is a valid reject!
      rejected++;
      continue;
    }
    let caught = false;
    for (const t of exercise.tests) {
      const run = mPrep.run(t.stdin);
      if (!run.ok || normalizeOutput(run.stdout) !== normalizeOutput(t.expected)) {
        caught = true;
        break;
      }
    }
    if (mPrep.clean) mPrep.clean();

    if (caught) {
      rejected++;
    } else {
      survivors.push(m.type);
    }
  }

  return {
    id: exercise.id,
    course: exercise.course,
    language: lang,
    etat: survivors.length > 0 ? 'survivants' : 'tous_rejetes',
    corrige_valide: true,
    tests: exercise.tests.length,
    mutants_total: muts.length,
    mutants_rejetes: rejected,
    mutants_survivants: survivors.length,
    survivors_list: survivors
  };
}

async function main() {
  const tsvPath = path.join(ROOT, 'corrections/resultats/prelot3-preuves-289.tsv');
  const tsvLines = fs.readFileSync(tsvPath, 'utf8').trim().split('\n');
  tsvLines.shift(); // header

  const suspended = tsvLines
    .map(line => line.split('\t'))
    .filter(parts => parts[2] === 'suspendue')
    .map(parts => ({ course: parts[0], id: parts[1] }));

  console.log(`Lancement du banc sur les ${suspended.length} fiches suspendues...`);

  const results = [];
  let index = 0;
  for (const item of suspended) {
    index++;
    const ex = exercises.getExercise(item.id);
    if (!ex) {
      results.push({ id: item.id, course: item.course, etat: 'introuvable_catalogue' });
      continue;
    }
    const res = await testOne(ex);
    results.push(res);
    if (index % 25 === 0 || index === suspended.length) {
      console.log(`Progression : ${index}/${suspended.length} traitées...`);
    }
  }

  const counts = {};
  results.forEach(r => { counts[r.etat] = (counts[r.etat] || 0) + 1; });

  const survivors = results.filter(r => r.etat === 'survivants');
  const summary = {
    total: results.length,
    etats: counts,
    survivants_count: survivors.length,
    survivants: survivors.map(s => ({
      id: s.id,
      course: s.course,
      language: s.language,
      tests: s.tests,
      mutants_total: s.mutants_total,
      mutants_survivants: s.mutants_survivants,
      survivors_list: s.survivors_list
    }))
  };

  const outPath = path.join(ROOT, 'corrections/resultats/lot3-banc-227-mutations.json');
  fs.writeFileSync(outPath, JSON.stringify(summary, null, 2), 'utf8');

  console.log('\n=== BILAN EXÉCUTION DU BANC SUR LES 227 FICHES ===');
  console.log(`Total analysées : ${results.length}`);
  for (const [st, cnt] of Object.entries(counts)) {
    console.log(`  - ${st} : ${cnt}`);
  }
  console.log(`Fiches avec mutants survivants : ${survivors.length}`);
  console.log(`Rapport JSON complet écrit dans ${outPath}`);
}

main().catch(err => { console.error(err); process.exit(1); });
