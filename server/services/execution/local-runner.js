'use strict';

const { spawn } = require('child_process');
const path = require('path');

const WORKER_PATH = path.resolve(__dirname, 'isolated-worker.js');
const SERVER_SKULPT_DIR = path.resolve(__dirname, '../../vendor/skulpt');
const ASSETS_SKULPT_DIR = path.resolve(__dirname, '../../../assets/vendor/skulpt');
const SQL_WASM_DIR = path.resolve(__dirname, '../../../b1-sql/assets/vendor/sqljs');
const ENGINES_DIR = path.resolve(__dirname, '../../../assets/js/engines');

const NODE_MAJOR = parseInt(process.versions.node.split('.')[0], 10) || 0;
const MAX_OUTPUT_BYTES = 65536; // 64 Ko

function capOutput(str, maxBytes = MAX_OUTPUT_BYTES) {
  const s = String(str || '');
  if (!s) return '';
  const buf = Buffer.from(s, 'utf8');
  if (buf.length <= maxBytes) return s;
  return buf.subarray(0, maxBytes).toString('utf8');
}

const SUPPORTED_LOCAL_LANGUAGES = new Set([
  'python', 'py', 'javascript', 'js', 'algo', 'pseudo-code', 'pseudocode', 'sql', 'analyse'
]);

let pseudoEngineCache = null;

function loadPseudoCodeEngine() {
  if (pseudoEngineCache) return pseudoEngineCache;
  try {
    pseudoEngineCache = require('../../vendor/engines/pseudo-code-engine');
    return pseudoEngineCache;
  } catch (e1) {
    try {
      pseudoEngineCache = require('../../../assets/js/engines/pseudo-code-engine');
      return pseudoEngineCache;
    } catch (e2) {}
  }
  return null;
}

function canHandle(languageId) {
  const norm = String(languageId || '').toLowerCase().trim();
  return SUPPORTED_LOCAL_LANGUAGES.has(norm);
}

function runInIsolatedWorker(language, code, stdin, timeoutMs = 5000) {
  return new Promise((resolve) => {
    const args = ['--max-old-space-size=64'];

    if (NODE_MAJOR >= 20) {
      args.push(
        '--permission',
        `--allow-fs-read=${WORKER_PATH}`,
        `--allow-fs-read=${SERVER_SKULPT_DIR}/*`,
        `--allow-fs-read=${ASSETS_SKULPT_DIR}/*`,
        `--allow-fs-read=${SQL_WASM_DIR}/*`,
        `--allow-fs-read=${ENGINES_DIR}/*`
      );
    }
    args.push(WORKER_PATH);

    const safeEnv = {
      PATH: '/usr/bin:/bin',
      LANG: 'C.UTF-8',
      HOME: '/tmp'
    };

    let settled = false;
    const finish = (result) => {
      if (settled) return;
      settled = true;
      if (result && result.data) {
        result.data.stdout = capOutput(result.data.stdout);
        result.data.stderr = capOutput(result.data.stderr);
      }
      resolve(result);
    };

    let child;
    try {
      child = spawn(process.execPath, args, {
        env: safeEnv,
        stdio: ['pipe', 'pipe', 'pipe'],
        windowsHide: true
      });
    } catch (err) {
      return finish({
        ok: true,
        httpStatus: 200,
        data: {
          stdout: '',
          stderr: String(err && err.message ? err.message : err),
          exit_code: 1
        }
      });
    }

    let rawStdout = '';
    let rawStderr = '';
    const MAX_IPC_BYTES = 256 * 1024;

    const killTimer = setTimeout(() => {
      try { child.kill('SIGKILL'); } catch {}
      finish({
        ok: true,
        httpStatus: 200,
        data: {
          stdout: '',
          stderr: `Temps d'exécution dépassé (${timeoutMs} ms).\n`,
          exit_code: 124
        }
      });
    }, Math.max(100, Number(timeoutMs) || 5000) + 500);

    child.stdout.on('data', (chunk) => {
      if (rawStdout.length < MAX_IPC_BYTES) {
        rawStdout += chunk.toString('utf8');
      }
    });

    child.stderr.on('data', (chunk) => {
      if (rawStderr.length < MAX_IPC_BYTES) {
        rawStderr += chunk.toString('utf8');
      }
    });

    child.on('error', (err) => {
      clearTimeout(killTimer);
      finish({
        ok: true,
        httpStatus: 200,
        data: {
          stdout: '',
          stderr: String(err && err.message ? err.message : err),
          exit_code: 1
        }
      });
    });

    child.on('close', (exitCode, signal) => {
      clearTimeout(killTimer);
      if (settled) return;

      if (rawStdout.trim()) {
        try {
          const parsed = JSON.parse(rawStdout.trim());
          if (parsed && typeof parsed === 'object' && parsed.data) {
            return finish(parsed);
          }
        } catch {}
      }

      const stderrMsg = rawStderr.trim()
        || (signal ? `Processus interrompu par le signal ${signal}` : 'Erreur d’exécution dans le worker isolé');

      finish({
        ok: true,
        httpStatus: 200,
        data: {
          stdout: '',
          stderr: stderrMsg,
          exit_code: exitCode && exitCode !== 0 ? exitCode : 1
        }
      });
    });

    try {
      child.stdin.end(JSON.stringify({
        language,
        code: String(code || ''),
        stdin: String(stdin || ''),
        timeoutMs: Number(timeoutMs) || 5000
      }));
    } catch {
      try { child.stdin.destroy(); } catch {}
    }
  });
}

function runPython(code, stdin, timeoutMs = 6000) {
  return runInIsolatedWorker('python', code, stdin, timeoutMs);
}

function runJavaScript(code, stdin, timeoutMs = 5000) {
  return runInIsolatedWorker('javascript', code, stdin, timeoutMs);
}

function runPseudoCode(code, stdin) {
  return new Promise((resolve) => {
    const engine = loadPseudoCodeEngine();
    if (!engine) {
      return resolve({
        ok: false,
        httpStatus: 500,
        data: { stdout: '', stderr: 'Moteur pseudo-code introuvable', exit_code: 1 }
      });
    }
    const res = engine.execute(code, stdin);
    resolve({
      ok: true,
      httpStatus: 200,
      data: {
        stdout: capOutput(res.stdout || ''),
        stderr: capOutput(res.stderr || ''),
        exit_code: res.exitCode !== null ? res.exitCode : (res.ok ? 0 : 1)
      }
    });
  });
}

function runAnalyse(code, stdin) {
  const rawLines = String(code || '')
    .replace(/\r\n?/g, '\n')
    .split('\n');
  const headerRe = /^\[(?:cas\s*(\d+)|exemple)\b.*\]$/i;
  const hasSections = rawLines.some(l => headerRe.test(l.trim()));
  const sel = String(stdin || '').trim();

  if (hasSections || /^cas\s*:/i.test(sel)) {
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

    if (/^cas\s*:/i.test(sel)) {
      const key = sel.toLowerCase().replace(/\s+/g, '');
      const out = capOutput((sections.get(key) || []).join('\n'));
      return Promise.resolve({
        ok: true,
        httpStatus: 200,
        data: { stdout: out, stderr: '', exit_code: 0 }
      });
    }

    if (
      !sel ||
      (!sel.startsWith('critere:') && !sel.startsWith('cle:') && !sel.startsWith('ligne:') && !sel.startsWith('lignes:'))
    ) {
      const out = capOutput(sections.has('cas:exemple')
        ? sections.get('cas:exemple').join('\n')
        : allSectionLines.join('\n'));
      return Promise.resolve({
        ok: true,
        httpStatus: 200,
        data: { stdout: out, stderr: '', exit_code: 0 }
      });
    }
  }

  const lines = rawLines
    .map(l => l.trim().replace(/[ \t]+/g, ' '))
    .filter(l => l.length > 0 && !l.startsWith('#') && !headerRe.test(l));

  let out = '';

  if (
    !sel ||
    (!sel.startsWith('critere:') && !sel.startsWith('cle:') && !sel.startsWith('ligne:') && !sel.startsWith('lignes:'))
  ) {
    out = lines.join('\n');
  } else if (sel.startsWith('ligne:')) {
    const idx = parseInt(sel.slice('ligne:'.length).trim(), 10) - 1;
    out = idx >= 0 && idx < lines.length ? lines[idx] : '';
  } else if (sel.startsWith('lignes:')) {
    const parts = sel.slice('lignes:'.length).trim().split('-');
    const start = Math.max(1, parseInt(parts[0], 10) || 1);
    const end = parseInt(parts[1], 10) || start;
    out = lines.slice(start - 1, end).join('\n');
  } else if (sel.startsWith('cle:') || sel.startsWith('critere:')) {
    const key = sel.slice(sel.indexOf(':') + 1).trim();
    const found = lines.find(l => l.startsWith(`${key} :`) || l.startsWith(`${key}:`))
      || lines.find(l => l.toLowerCase().startsWith(`${key.toLowerCase()} :`) || l.toLowerCase().startsWith(`${key.toLowerCase()}:`));
    out = found || '';
  }

  return Promise.resolve({
    ok: true,
    httpStatus: 200,
    data: {
      stdout: capOutput(out),
      stderr: '',
      exit_code: 0
    }
  });
}

async function runSql(code, stdin, timeoutMs = 4000) {
  return runInIsolatedWorker('sql', code, stdin, timeoutMs);
}

function run(payload) {
  const norm = String((payload && (payload.language || payload.languageId)) || '').toLowerCase().trim();
  if (norm === 'python' || norm === 'py') {
    return runPython(payload.code, payload.stdin);
  }
  if (norm === 'javascript' || norm === 'js') {
    return runJavaScript(payload.code, payload.stdin);
  }
  if (norm === 'algo' || norm === 'pseudo-code' || norm === 'pseudocode') {
    return runPseudoCode(payload.code, payload.stdin);
  }
  if (norm === 'sql') {
    return runSql(payload.code, payload.stdin);
  }
  if (norm === 'analyse') {
    return runAnalyse(payload.code, payload.stdin);
  }
  return Promise.resolve({
    ok: false,
    httpStatus: 503,
    data: {
      stdout: '',
      stderr: '',
      message: `Le moteur d’exécution est temporairement indisponible (langage ${norm || 'inconnu'} non exécutable localement).`,
      exit_code: 1
    }
  });
}

module.exports = {
  MAX_OUTPUT_BYTES,
  capOutput,
  canHandle,
  run,
  runPython,
  runJavaScript,
  runPseudoCode,
  runSql,
  runAnalyse
};
