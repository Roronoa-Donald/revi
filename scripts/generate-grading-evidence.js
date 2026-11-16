#!/usr/bin/env node
'use strict';

/**
 * Generates and verifies cryptographic grading evidence for all executable
 * (non-analyse) exercises across the catalogue.
 *
 * Usage:
 *   node scripts/generate-grading-evidence.js           # execute all 420 solutions and update evidence JSONs
 *   node scripts/generate-grading-evidence.js --verify  # check 0 suspended, fresh hashes, and 100% passing without writing
 */

const crypto = require('node:crypto');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync, spawnSync } = require('node:child_process');

const ROOT = path.resolve(__dirname, '..');
const EXERCISES_DIR = path.join(ROOT, 'server/exercises');
const EVIDENCE_FILE = path.join(EXERCISES_DIR, 'grading-evidence.json');
const RUNTIME_EVIDENCE_FILE = path.join(EXERCISES_DIR, 'grading-runtime-evidence.json');

const exercises = require('../server/exercises');
const runner = require('../server/exercises/runner');
const localRunner = require('../server/services/execution/local-runner');
const methodCheck = require('../server/exercises/method-check');

const RUNTIME_FILES = {
  common: [
    'runner.js',
    '../services/execution/index.js',
    '../services/execution/local-runner.js',
    '../routes/exercises.js'
  ],
  method: [
    'method-check.js',
    '../../assets/js/engines/pseudo-code-engine.js'
  ]
};

function sha256Buffer(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

function sha256File(absPath) {
  return sha256Buffer(fs.readFileSync(absPath));
}

function exerciseFingerprint(exercise) {
  return sha256Buffer(Buffer.from(JSON.stringify(exercise)));
}

function findTool(candidates, versionArg = '--version') {
  for (const candidate of candidates.filter(Boolean)) {
    const bin = candidate.includes('/') ? path.resolve(ROOT, candidate) : candidate;
    if (candidate.includes('/') && !fs.existsSync(bin)) continue;
    try {
      execFileSync(bin, [versionArg], { stdio: 'ignore' });
      return bin;
    } catch {
      // try next candidate
    }
  }
  return null;
}

function findJavaToolchain() {
  const home = os.homedir();
  const javac = findTool([
    process.env.JAVAC_BIN,
    'javac',
    path.join(home, '.local/share/mise/installs/java/21/bin/javac')
  ], '-version');
  const java = findTool([
    process.env.JAVA_BIN,
    'java',
    path.join(home, '.local/share/mise/installs/java/21/bin/java')
  ], '-version');
  return javac && java ? { javac, java } : null;
}

function findDotnetRoslyn() {
  const dotnetRoot = '/usr/share/dotnet';
  const dotnet = findTool([process.env.DOTNET_BIN, '/usr/local/bin/dotnet', path.join(dotnetRoot, 'dotnet'), 'dotnet'], '--version');
  if (!dotnet || !fs.existsSync(path.join(dotnetRoot, 'sdk'))) return null;

  const orderVersions = (a, b) => b.localeCompare(a, 'en', { numeric: true });
  const sdk = fs.readdirSync(path.join(dotnetRoot, 'sdk')).sort(orderVersions)
    .find(v => fs.existsSync(path.join(dotnetRoot, 'sdk', v, 'Roslyn/bincore/csc.dll')));
  const refRoot = path.join(dotnetRoot, 'packs/Microsoft.NETCore.App.Ref');
  const runtimeRoot = path.join(dotnetRoot, 'shared/Microsoft.NETCore.App');
  if (!sdk || !fs.existsSync(refRoot) || !fs.existsSync(runtimeRoot)) return null;

  const refVer = fs.readdirSync(refRoot).sort(orderVersions)
    .find(v => fs.existsSync(path.join(runtimeRoot, v)));
  if (!refVer) return null;

  const refVersDir = path.join(refRoot, refVer, 'ref');
  const tfm = fs.readdirSync(refVersDir).sort(orderVersions).find(n => /^net\d+\.\d+$/.test(n));
  if (!tfm) return null;

  const netRefDir = path.join(refVersDir, tfm);
  const refs = fs.readdirSync(netRefDir).filter(f => f.endsWith('.dll')).map(f => path.join(netRefDir, f));
  return {
    dotnet,
    csc: path.join(dotnetRoot, 'sdk', sdk, 'Roslyn/bincore/csc.dll'),
    refs,
    tfm,
    refVer
  };
}

/**
 * Evaluates standalone PowerShell scripts (subset used by rd_winserver / admin-vm)
 * with PowerShell case-insensitive string comparison (`-eq`, `-ne`, `switch`) when `pwsh` is absent.
 */
function evalPowerShellSubset(code, stdin) {
  const inputLines = String(stdin || '').replace(/\r\n?/g, '\n').split('\n');
  let inputIdx = 0;
  const outputs = [];
  const vars = Object.create(null);

  function psEq(a, b) {
    if (typeof a === 'string' && typeof b === 'string') return a.toLowerCase() === b.toLowerCase();
    return a === b;
  }

  function transpileExpr(expr) {
    let e = expr.trim();
    e = e.replace(/\[Console\]::In\.ReadLine\(\)/gi, '__readLine()');
    e = e.replace(/\[math\]::Floor\(/gi, 'Math.floor(');
    e = e.replace(/\[int\]\s*__readLine\(\)/gi, 'parseInt(__readLine(), 10)');
    e = e.replace(/\[int\]\s*\(/gi, 'Math.trunc(');
    e = e.replace(/\[double\]\s*__readLine\(\)/gi, 'parseFloat(__readLine())');
    e = e.replace(/\[double\]\s*\(/gi, 'Number(');

    let out = '';
    let i = 0;
    while (i < e.length) {
      if (e[i] === '"') {
        let j = i + 1;
        while (j < e.length && e[j] !== '"') {
          if (e[j] === '`') j++;
          j++;
        }
        out += e.slice(i, j + 1);
        i = j + 1;
      } else if (e[i] === '$' && /[A-Za-z_]/.test(e[i + 1] || '')) {
        let j = i + 1;
        while (j < e.length && /[A-Za-z0-9_]/.test(e[j])) j++;
        out += '__v.' + e.slice(i + 1, j);
        i = j;
      } else if (e[i] === '-') {
        const rest = e.slice(i);
        const m = /^-(and|or|not|eq|ne|ge|gt|le|lt)\b/i.exec(rest);
        if (m) {
          const op = m[1].toLowerCase();
          if (op === 'eq' || op === 'ne') {
            // Rewrite binary `lhs -eq rhs` outside switch by converting `a -eq b` via helper when simple
            // Fall through after building token list? Simpler: rewrite `-eq` to `==`? No, case-insensitive!
            out += op === 'eq' ? ' /*EQ*/ === ' : ' /*NE*/ !== ';
          } else {
            const map = { and: '&&', or: '||', not: '!', ge: '>=', gt: '>', le: '<=', lt: '<' };
            out += ' ' + map[op] + ' ';
          }
          i += m[0].length;
        } else {
          out += '-';
          i++;
        }
      } else {
        out += e[i];
        i++;
      }
    }
    // Convert `/*EQ*/` / `/*NE*/` binary comparisons into `__eq(lhs, rhs)` cleanly at top-level or parenthesized subexpressions
    return rewriteCaseInsensitiveEq(out);
  }

  function rewriteCaseInsensitiveEq(jsExpr) {
    // Handle `lhs /*EQ*/ === rhs` and `lhs /*NE*/ !== rhs` inside balanced segments
    const markerRe = /\s*\/\*([EN]Q|NE)\*\/\s*(?:===|!==)\s*/;
    if (!markerRe.test(jsExpr)) return jsExpr;

    // Split on logical && / || at top paren depth, recurse into (...) subexpressions
    function rewriteSegment(seg) {
      let s = seg.trim();
      // Recurse into parenthesized groups first
      let rebuilt = '';
      for (let i = 0; i < s.length; i++) {
        if (s[i] === '"') {
          let j = i + 1;
          while (j < s.length && s[j] !== '"') { if (s[j] === '\\') j++; j++; }
          rebuilt += s.slice(i, j + 1);
          i = j;
        } else if (s[i] === '(') {
          let depth = 1;
          let j = i + 1;
          let inQ = false;
          while (j < s.length && depth > 0) {
            if (s[j] === '"') inQ = !inQ;
            else if (!inQ && s[j] === '(') depth++;
            else if (!inQ && s[j] === ')') depth--;
            j++;
          }
          rebuilt += '(' + rewriteSegment(s.slice(i + 1, j - 1)) + ')';
          i = j - 1;
        } else {
          rebuilt += s[i];
        }
      }
      // Now split top-level && / ||
      const parts = [];
      let depth = 0;
      let inQ = false;
      let start = 0;
      for (let i = 0; i < rebuilt.length; i++) {
        if (rebuilt[i] === '"') inQ = !inQ;
        else if (!inQ) {
          if (rebuilt[i] === '(') depth++;
          else if (rebuilt[i] === ')') depth--;
          else if (depth === 0 && (rebuilt.slice(i, i + 2) === '&&' || rebuilt.slice(i, i + 2) === '||')) {
            parts.push(rebuilt.slice(start, i));
            parts.push(rebuilt.slice(i, i + 2));
            i++;
            start = i + 1;
          }
        }
      }
      parts.push(rebuilt.slice(start));
      return parts.map(part => {
        if (part === '&&' || part === '||') return part;
        const m = /^([\s\S]+?)\s*\/\*(EQ|NE)\*\/\s*(?:===|!==)\s*([\s\S]+)$/.exec(part);
        if (!m) return part;
        const fnCall = `__eq(${m[1].trim()}, ${m[3].trim()})`;
        return m[2] === 'NE' ? `!(${fnCall})` : fnCall;
      }).join(' ');
    }

    return rewriteSegment(jsExpr);
  }

  const raw = String(code || '').replace(/\r\n?/g, '\n');
  const lines = raw.split('\n').map(line => {
    let inStr = false;
    for (let i = 0; i < line.length; i++) {
      if (line[i] === '"') inStr = !inStr;
      else if (!inStr && line[i] === '#') return line.slice(0, i).trim();
    }
    return line.trim();
  }).filter(Boolean);

  function transpileBlockBody(bodyText) {
    const parts = [];
    let cur = '';
    let inStr = false;
    for (let i = 0; i < bodyText.length; i++) {
      if (bodyText[i] === '"') inStr = !inStr;
      if (!inStr && bodyText[i] === ';') {
        if (cur.trim()) parts.push(cur.trim());
        cur = '';
      } else {
        cur += bodyText[i];
      }
    }
    if (cur.trim()) parts.push(cur.trim());
    return parts.map(transpileSimpleStmt).join('\n');
  }

  function transpileSimpleStmt(stmt) {
    const s = stmt.trim();
    if (/^Write-Output\s+/i.test(s)) {
      const arg = s.replace(/^Write-Output\s+/i, '');
      return `__out.push(String(${transpileExpr(arg)}));`;
    }
    return transpileExpr(s) + ';';
  }

  const js = [];
  let inSwitch = false;
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (/^for\s*\((.+)\)\s*\{$/i.test(l)) {
      const parts = RegExp.$1.split(';').map(p => transpileExpr(p));
      js.push(`for (${parts.join('; ')}) {`);
    } else if (/^if\s*\((.+)\)\s*\{$/i.test(l)) {
      js.push(`if (${transpileExpr(RegExp.$1)}) {`);
    } else if (/^\}\s*elseif\s*\((.+)\)\s*\{$/i.test(l)) {
      js.push(`} else if (${transpileExpr(RegExp.$1)}) {`);
    } else if (/^\}\s*else\s*\{$/i.test(l)) {
      js.push('} else {');
    } else if (/^switch\s*\((.+)\)\s*\{$/i.test(l)) {
      inSwitch = true;
      const expr = transpileExpr(RegExp.$1);
      js.push(`switch (typeof (${expr}) === 'string' ? (${expr}).toLowerCase() : (${expr})) {`);
    } else if (inSwitch && l === '}') {
      inSwitch = false;
      js.push('}');
    } else if (inSwitch && /^default\s*\{([\s\S]+)\}$/i.test(l)) {
      js.push(`default: { ${transpileBlockBody(RegExp.$1)} break; }`);
    } else if (inSwitch && /^("[^"]*"|\d+)\s*\{([\s\S]+)\}$/i.test(l)) {
      const caseVal = RegExp.$1.startsWith('"') ? RegExp.$1.toLowerCase() : RegExp.$1;
      js.push(`case ${caseVal}: { ${transpileBlockBody(RegExp.$2)} break; }`);
    } else if (l === '}') {
      js.push('}');
    } else {
      js.push(transpileSimpleStmt(l));
    }
  }

  const fn = new Function('__v', '__readLine', '__out', '__eq', js.join('\n'));
  fn(vars, () => (inputIdx < inputLines.length ? inputLines[inputIdx++] : ''), outputs, psEq);
  return {
    ok: true,
    status: 'success',
    stdout: outputs.join('\n') + (outputs.length ? '\n' : ''),
    stderr: '',
    compileError: '',
    exitCode: 0
  };
}

function createExecutor() {
  const PYTHON = findTool([process.env.PYTHON_BIN, 'python3', 'python']);
  const CC = findTool([process.env.CC, 'gcc', 'cc']);
  const CXX = findTool([process.env.CXX, 'g++', 'c++']);
  const PHP = findTool([process.env.PHP_BIN, 'php', 'php8', 'tools/php-cli/php']);
  const NODE = findTool([process.env.NODE_BIN, process.execPath]);
  const BASH = findTool([process.env.BASH_BIN, '/bin/bash', 'bash']);
  const PWSH = findTool([process.env.PWSH_BIN, 'pwsh']);
  const JAVA_TC = findJavaToolchain();
  const DOTNET_TC = findDotnetRoslyn();

  const missing = [];
  if (!PYTHON) missing.push('python3');
  if (!CC) missing.push('gcc');
  if (!CXX) missing.push('g++');
  if (!PHP) missing.push('php');
  if (!NODE) missing.push('node');
  if (!BASH) missing.push('bash');
  if (!JAVA_TC) missing.push('javac/java');
  if (!DOTNET_TC) missing.push('dotnet/Roslyn');
  if (missing.length) {
    throw new Error(`Outils de compilation/exécution manquants : ${missing.join(', ')}`);
  }

  const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'revi-evidence-'));
  const cleanup = () => {
    try { fs.rmSync(tmpRoot, { recursive: true, force: true }); } catch { /* ignore */ }
  };

  let rspFile = null;
  if (DOTNET_TC) {
    rspFile = path.join(tmpRoot, 'csharp-refs.rsp');
    fs.writeFileSync(rspFile, DOTNET_TC.refs.map(r => `-r:${r}`).join('\n'));
  }

  const compiledCache = new Map();

  function compileProgram(language, code) {
    const key = `${language}:${sha256Buffer(Buffer.from(code))}`;
    if (compiledCache.has(key)) return compiledCache.get(key);

    const dir = fs.mkdtempSync(path.join(tmpRoot, `${language}-`));
    let entry;

    if (language === 'c' || language === 'cpp') {
      const ext = language === 'c' ? 'c' : 'cpp';
      const compiler = language === 'c' ? CC : CXX;
      const std = language === 'c' ? '-std=c11' : '-std=c++17';
      const src = path.join(dir, `main.${ext}`);
      const bin = path.join(dir, 'main');
      fs.writeFileSync(src, code, 'utf8');
      const res = spawnSync(compiler, [std, '-O2', src, '-o', bin, '-lm'], { encoding: 'utf8', timeout: 15000 });
      entry = res.status === 0
        ? { ok: true, run: stdin => spawnSync(bin, [], { input: stdin, encoding: 'utf8', timeout: 5000, maxBuffer: 1024 * 1024 }) }
        : { ok: false, compileError: res.stderr || res.stdout || 'Compilation failed' };
    } else if (language === 'java') {
      const src = path.join(dir, 'Main.java');
      fs.writeFileSync(src, code, 'utf8');
      const res = spawnSync(JAVA_TC.javac, [src], { encoding: 'utf8', timeout: 20000 });
      entry = res.status === 0
        ? { ok: true, run: stdin => spawnSync(JAVA_TC.java, ['-cp', dir, 'Main'], { input: stdin, encoding: 'utf8', timeout: 5000, maxBuffer: 1024 * 1024 }) }
        : { ok: false, compileError: res.stderr || res.stdout || 'javac failed' };
    } else if (language === 'csharp') {
      const src = path.join(dir, 'Program.cs');
      const dll = path.join(dir, 'Program.dll');
      fs.writeFileSync(src, code, 'utf8');
      const res = spawnSync(DOTNET_TC.dotnet, [
        DOTNET_TC.csc, '-nologo', '-target:exe', `-out:${dll}`, `@${rspFile}`, src
      ], { encoding: 'utf8', timeout: 20000 });
      if (res.status === 0) {
        fs.writeFileSync(path.join(dir, 'Program.runtimeconfig.json'), JSON.stringify({
          runtimeOptions: {
            tfm: DOTNET_TC.tfm,
            framework: { name: 'Microsoft.NETCore.App', version: DOTNET_TC.refVer }
          }
        }));
        entry = { ok: true, run: stdin => spawnSync(DOTNET_TC.dotnet, [dll], { input: stdin, encoding: 'utf8', timeout: 5000, maxBuffer: 1024 * 1024 }) };
      } else {
        entry = { ok: false, compileError: res.stderr || res.stdout || 'csc failed' };
      }
    } else {
      throw new Error(`Langage compilé inattendu : ${language}`);
    }

    compiledCache.set(key, entry);
    return entry;
  }

  async function execute({ language, code, stdin }) {
    if (language === 'algo') {
      const res = await localRunner.runPseudoCode(code, stdin);
      return {
        ok: res.ok && res.data.exit_code === 0,
        status: res.ok && res.data.exit_code === 0 ? 'success' : (res.data.compile_error ? 'compile_error' : 'runtime_error'),
        stdout: res.data.stdout || '',
        stderr: res.data.stderr || '',
        compileError: res.data.compile_error || '',
        exitCode: res.data.exit_code
      };
    }

    if (language === 'sql') {
      const res = await localRunner.runSql(code, stdin);
      return {
        ok: res.ok && res.data.exit_code === 0,
        status: res.ok && res.data.exit_code === 0 ? 'success' : 'runtime_error',
        stdout: res.data.stdout || '',
        stderr: res.data.stderr || '',
        compileError: res.data.compile_error || '',
        exitCode: res.data.exit_code
      };
    }

    if (language === 'powershell') {
      if (PWSH) {
        const res = spawnSync(PWSH, ['-NoProfile', '-NonInteractive', '-Command', code], {
          input: stdin, encoding: 'utf8', timeout: 5000, maxBuffer: 1024 * 1024
        });
        return {
          ok: res.status === 0,
          status: res.status === 0 ? 'success' : 'runtime_error',
          stdout: res.stdout || '',
          stderr: res.stderr || '',
          compileError: '',
          exitCode: res.status ?? 1
        };
      }
      return evalPowerShellSubset(code, stdin);
    }

    if (language === 'python' || language === 'javascript' || language === 'php' || language === 'shell') {
      let cmd;
      let args;
      if (language === 'python') { cmd = PYTHON; args = ['-I', '-c', code]; }
      else if (language === 'javascript') { cmd = NODE; args = ['-e', code]; }
      else if (language === 'php') { cmd = PHP; args = ['-r', code.replace(/^\s*<\?(?:php)?\s*/i, '')]; }
      else { cmd = BASH; args = ['-c', code]; }

      const res = spawnSync(cmd, args, { input: stdin, encoding: 'utf8', timeout: 5000, maxBuffer: 1024 * 1024 });
      return {
        ok: res.status === 0,
        status: res.status === 0 ? 'success' : 'runtime_error',
        stdout: res.stdout || '',
        stderr: res.stderr || '',
        compileError: '',
        exitCode: res.status ?? 1
      };
    }

    if (language === 'c' || language === 'cpp' || language === 'java' || language === 'csharp') {
      const compiled = compileProgram(language, code);
      if (!compiled.ok) {
        return {
          ok: false,
          status: 'compile_error',
          stdout: '',
          stderr: '',
          compileError: compiled.compileError,
          exitCode: 1
        };
      }
      const res = compiled.run(stdin);
      return {
        ok: res.status === 0,
        status: res.status === 0 ? 'success' : 'runtime_error',
        stdout: res.stdout || '',
        stderr: res.stderr || '',
        compileError: '',
        exitCode: res.status ?? 1
      };
    }

    throw new Error(`Langage non pris en charge : ${language}`);
  }

  return { execute, cleanup, hasPwsh: Boolean(PWSH) };
}

function computeRuntimeEvidence() {
  const result = {};
  for (const [group, files] of Object.entries(RUNTIME_FILES)) {
    result[group] = {};
    for (const rel of files) {
      result[group][rel] = sha256File(path.resolve(EXERCISES_DIR, rel));
    }
  }
  return result;
}

async function verifyAndBuildEvidence() {
  const all = exercises.listExercises();
  const executable = all.filter(e => e.language !== 'analyse');
  const { execute, cleanup, hasPwsh } = createExecutor();

  const summary = {};
  const failures = [];
  const hashes = {};

  try {
    for (const ex of executable) {
      const isMethod = methodCheck.methodExercises.includes(ex.id);
      const execForExercise = isMethod
        ? async payload => {
            const checked = await methodCheck.checkMethod(ex.id, payload.code, execute, payload.stdin);
            if (checked.status !== 'verified') {
              return { ok: false, status: checked.status, stdout: '', stderr: `method check: ${checked.reason || checked.status}`, compileError: '', exitCode: 1 };
            }
            return { ok: true, status: 'success', stdout: checked.output, stderr: '', compileError: '', exitCode: 0 };
          }
        : execute;

      const report = await runner.runTests(ex, ex.solution, { execute: execForExercise, maxTests: 100 });
      const testPassed = report.ok && report.passed === report.total && report.results.every(r => r.ok);

      // Verify visible examples explicitly even when verifyFirstExample is not set
      let exampleFail = null;
      if (testPassed && Array.isArray(ex.examples)) {
        for (let idx = 0; idx < ex.examples.length; idx++) {
          const example = ex.examples[idx];
          if (typeof example.expected !== 'string') continue;
          const out = await execForExercise({ language: ex.language, code: ex.solution, stdin: example.stdin || '' });
          if (!out.ok || !runner.matchOutputs(out.stdout, example.expected, example, ex)) {
            exampleFail = { index: idx, expected: example.expected, actual: out.stdout, stderr: out.stderr || out.compileError };
            break;
          }
        }
      }

      if (!summary[ex.language]) summary[ex.language] = { total: 0, passed: 0, failed: 0 };
      summary[ex.language].total++;

      if (!testPassed || exampleFail) {
        summary[ex.language].failed++;
        failures.push({
          id: ex.id,
          course: ex.course,
          language: ex.language,
          passed: report.passed,
          total: report.total,
          stop: report.stop,
          exampleFail
        });
      } else {
        summary[ex.language].passed++;
        hashes[ex.id] = exerciseFingerprint(ex);
      }
    }
  } finally {
    cleanup();
  }

  return {
    totalCatalog: all.length,
    executableCount: executable.length,
    analyseCount: all.length - executable.length,
    hasPwsh,
    summary,
    failures,
    hashes,
    runtime: computeRuntimeEvidence()
  };
}

function sortObjectKeys(obj) {
  const sorted = {};
  for (const key of Object.keys(obj).sort()) sorted[key] = obj[key];
  return sorted;
}

async function main() {
  const verifyOnly = process.argv.includes('--verify');
  const result = await verifyAndBuildEvidence();

  console.log(`Catalogue: ${result.totalCatalog} exercices (${result.executableCount} exécutables, ${result.analyseCount} analyse)`);
  console.log(`PowerShell mode: ${result.hasPwsh ? 'pwsh natif' : 'évaluateur Node PS-subset (pwsh absent)'}`);
  console.table(result.summary);

  if (result.failures.length > 0) {
    console.error(`ÉCHEC : ${result.failures.length} exercice(s) n'ont pas passé 100 % des tests :`);
    for (const f of result.failures) {
      console.error(`  - ${f.id} (${f.course}, ${f.language}) : ${f.passed}/${f.total}`, JSON.stringify(f.stop || f.exampleFail));
    }
    process.exit(1);
  }

  if (verifyOnly) {
    // 1. Check 0 suspended across the entire catalogue
    const policy = require('../server/exercises/grading-policy');
    const all = exercises.listExercises();
    const suspended = all.filter(ex => policy.isGradingSuspended(ex.course, ex.id));
    if (suspended.length > 0) {
      console.error(`ÉCHEC --verify : ${suspended.length} exercice(s) encore suspendu(s) : ${suspended.slice(0, 10).map(e => e.id).join(', ')}`);
      process.exit(1);
    }

    // 2. Check grading-evidence.json matches exactly
    const diskEvidence = JSON.parse(fs.readFileSync(EVIDENCE_FILE, 'utf8'));
    const expectedKeys = Object.keys(result.hashes).sort();
    const diskKeys = Object.keys(diskEvidence).sort();
    if (JSON.stringify(expectedKeys) !== JSON.stringify(diskKeys)) {
      console.error(`ÉCHEC --verify : clés de grading-evidence.json désynchronisées (${diskKeys.length} vs ${expectedKeys.length}).`);
      process.exit(1);
    }
    for (const key of expectedKeys) {
      if (diskEvidence[key] !== result.hashes[key]) {
        console.error(`ÉCHEC --verify : empreinte obsolète pour ${key}.`);
        process.exit(1);
      }
    }

    // 3. Check grading-runtime-evidence.json matches exactly
    const diskRuntime = JSON.parse(fs.readFileSync(RUNTIME_EVIDENCE_FILE, 'utf8'));
    if (JSON.stringify(diskRuntime) !== JSON.stringify(result.runtime)) {
      console.error('ÉCHEC --verify : grading-runtime-evidence.json désynchronisé.');
      process.exit(1);
    }

    console.log(`VÉRIFIÉ : 0 suspendu / ${result.totalCatalog} exercices actifs, ${expectedKeys.length}/${result.executableCount} empreintes et preuves runtime à jour.`);
    return;
  }

  fs.writeFileSync(EVIDENCE_FILE, `${JSON.stringify(sortObjectKeys(result.hashes), null, 2)}\n`, 'utf8');
  fs.writeFileSync(RUNTIME_EVIDENCE_FILE, `${JSON.stringify(result.runtime, null, 2)}\n`, 'utf8');
  console.log(`Écrit : ${Object.keys(result.hashes).length} empreintes dans ${path.relative(ROOT, EVIDENCE_FILE)}`);
  console.log(`Écrit : preuves runtime dans ${path.relative(ROOT, RUNTIME_EVIDENCE_FILE)}`);
}

if (require.main === module) {
  main().catch(err => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { verifyAndBuildEvidence, computeRuntimeEvidence, evalPowerShellSubset };
