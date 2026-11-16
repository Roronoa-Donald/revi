'use strict';

const path = require('node:path');
const { Worker } = require('node:worker_threads');

const MAX_OUTPUT_BYTES = 65536;
const DEFAULT_LOCAL_TIMEOUT_MS = Number(process.env.LOCAL_EXEC_TIMEOUT_MS) || 2500;
const WORKER_PATH = path.join(__dirname, 'local-worker.js');
const ANALYSE_FORMAT = '# Format REVI-ANALYSE:1';
const ANALYSE_ESCAPE = '\\=';
const ALGO_LANGUAGE_IDS = new Set(['algo', 'pseudocode', 'pseudo-code', 'pseudo_code']);
const SQL_LANGUAGE_IDS = new Set(['sql', 'sqlite', 'sqlite3']);

function capOutput(str, maxBytes = MAX_OUTPUT_BYTES) {
  const value = String(str || '');
  if (!value) return '';
  const buffer = Buffer.from(value, 'utf8');
  if (buffer.length <= maxBytes) return value;
  return buffer.subarray(0, maxBytes).toString('utf8');
}

function canHandle(languageId) {
  const norm = String(languageId || '').toLowerCase().trim();
  return norm === 'analyse' || ALGO_LANGUAGE_IDS.has(norm) || SQL_LANGUAGE_IDS.has(norm);
}

function unavailable(language) {
  return Promise.resolve({
    ok: false,
    httpStatus: 503,
    data: {
      stdout: '',
      stderr: '',
      message: `Le moteur d’exécution est temporairement indisponible (langage ${language || 'inconnu'} non exécutable localement).`,
      exit_code: 1
    }
  });
}

function runPython() {
  return unavailable('python');
}

function runJavaScript() {
  return unavailable('javascript');
}

function runInWorker(kind, code, stdin, timeoutMs) {
  const limitMs = Math.max(50, Number(timeoutMs) || DEFAULT_LOCAL_TIMEOUT_MS);

  return new Promise(resolve => {
    let settled = false;
    const worker = new Worker(WORKER_PATH, {
      workerData: {
        kind,
        code: String(code || ''),
        stdin: String(stdin || '')
      }
    });

    const timer = setTimeout(() => {
      if (settled) return;
      settled = true;
      worker.terminate().catch(() => {});
      resolve({
        ok: true,
        httpStatus: 200,
        data: {
          status: 'timeout',
          stdout: '',
          stderr: `Délai d’exécution locale dépassé (${limitMs} ms). Vérifiez qu’il n’y a pas de boucle infinie.`,
          compile_error: '',
          exit_code: 124
        }
      });
    }, limitMs);

    function finish(payload) {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve(payload);
    }

    worker.once('message', msg => {
      if (!msg || !msg.ok) {
        finish({
          ok: false,
          httpStatus: 200,
          data: {
            stdout: '',
            stderr: capOutput((msg && msg.error) || 'Erreur lors de l’exécution locale.'),
            compile_error: '',
            exit_code: 1
          }
        });
        return;
      }
      const res = msg.res || {};
      const ok = Boolean(res.status === 'success');
      finish({
        ok,
        httpStatus: 200,
        data: {
          stdout: capOutput(res.stdout),
          stderr: capOutput(res.stderr),
          compile_error: capOutput(res.compileError),
          exit_code: typeof res.exitCode === 'number' ? res.exitCode : (ok ? 0 : 1)
        }
      });
    });

    worker.once('error', err => {
      finish({
        ok: false,
        httpStatus: 200,
        data: {
          stdout: '',
          stderr: capOutput(err && err.message ? err.message : 'Erreur du worker local.'),
          compile_error: '',
          exit_code: 1
        }
      });
    });

    worker.once('exit', code => {
      if (!settled) {
        finish({
          ok: false,
          httpStatus: 200,
          data: {
            stdout: '',
            stderr: code ? `Worker interrompu (code ${code}).` : '',
            compile_error: '',
            exit_code: code || 1
          }
        });
      }
    });
  });
}

function runPseudoCode(code, stdin, options = {}) {
  return runInWorker('algo', code, stdin, options.timeoutMs);
}

function runSql(code, stdin, options = {}) {
  return runInWorker('sql', code, stdin, options.timeoutMs);
}

function matchAnalyseHeader(trimmed) {
  // Entêtes complets : [Cas N — ...], [Question N — ...], [Exemple], ou [ préfixé sans ] fermant
  const bracketMatch = /^\[(?:cas\s*(\d+)|question\s*(\d+)|(exemple))\b.*\]?$/i.exec(trimmed);
  if (bracketMatch) {
    if (bracketMatch[3]) return 'cas:exemple';
    const num = bracketMatch[1] || bracketMatch[2];
    return num ? `cas:${parseInt(num, 10)}` : null;
  }
  // Entêtes partiellement préfixés : "Question 1 — ...", "Cas 2 : ...", "Question 2"
  const plainMatch = /^(?:cas\s*(\d+)|question\s*(\d+))\s*(?:[—–:\-].*|$)$/i.exec(trimmed);
  if (plainMatch) {
    const num = plainMatch[1] || plainMatch[2];
    return num ? `cas:${parseInt(num, 10)}` : null;
  }
  return null;
}

function normalizeAnalyseSelector(sel) {
  const m = /^(?:cas|q|question)\s*:\s*(\d+|exemple)$/i.exec(String(sel || '').trim());
  if (!m) return null;
  return `cas:${m[1].toLowerCase()}`;
}

function runAnalyse(code, stdin) {
  const rawLines = String(code || '')
    .replace(/\r\n?/g, '\n')
    .split('\n');
  const escapedFormat = rawLines[0] === ANALYSE_FORMAT;
  const hasSections = rawLines.some(l => {
    if (escapedFormat && l.startsWith(ANALYSE_ESCAPE)) return false;
    return matchAnalyseHeader(l.trim()) !== null;
  });
  const sel = String(stdin || '').trim();
  const sectionKeyWanted = normalizeAnalyseSelector(sel);

  if (hasSections || sectionKeyWanted) {
    const sections = new Map();
    const allSectionLines = [];
    let currentKey = null;

    for (const rawLine of rawLines) {
      const escapedAnswer = escapedFormat && rawLine.startsWith(ANALYSE_ESCAPE);
      const rtrim = (escapedAnswer ? rawLine.slice(ANALYSE_ESCAPE.length) : rawLine).replace(/\s+$/, '');
      const trimmed = rtrim.trim();
      if (!trimmed || (!escapedAnswer && trimmed.startsWith('#'))) continue;
      if (!escapedAnswer && trimmed === 'A_COMPLETER') continue;
      const headerKey = escapedAnswer ? null : matchAnalyseHeader(trimmed);
      if (headerKey) {
        currentKey = headerKey;
        if (!sections.has(currentKey)) sections.set(currentKey, []);
        continue;
      }
      if (currentKey !== null) {
        sections.get(currentKey).push(rtrim);
      }
      allSectionLines.push(rtrim);
    }

    if (sectionKeyWanted) {
      const out = capOutput((sections.get(sectionKeyWanted) || []).join('\n'));
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
    .map(rawLine => {
      const escapedAnswer = escapedFormat && rawLine.startsWith(ANALYSE_ESCAPE);
      const value = escapedAnswer ? rawLine.slice(ANALYSE_ESCAPE.length) : rawLine;
      return { escapedAnswer, value: value.trim().replace(/[ \t]+/g, ' ') };
    })
    .filter(line => line.value.length > 0 && (line.escapedAnswer || (
      !line.value.startsWith('#') &&
      line.value !== 'A_COMPLETER' &&
      matchAnalyseHeader(line.value) === null
    )))
    .map(line => line.value);

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

function run(payload) {
  const language = String((payload && (payload.language || payload.languageId)) || '').toLowerCase().trim();
  const options = payload && payload.timeoutMs ? { timeoutMs: payload.timeoutMs } : {};
  if (language === 'analyse') return runAnalyse(payload.code, payload.stdin);
  if (ALGO_LANGUAGE_IDS.has(language)) return runPseudoCode(payload.code, payload.stdin, options);
  if (SQL_LANGUAGE_IDS.has(language)) return runSql(payload.code, payload.stdin, options);
  return unavailable(language);
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
