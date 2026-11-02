'use strict';

const MAX_OUTPUT_BYTES = 65536;
const ANALYSE_FORMAT = '# Format REVI-ANALYSE:1';
const ANALYSE_ESCAPE = '\\=';

function capOutput(str, maxBytes = MAX_OUTPUT_BYTES) {
  const value = String(str || '');
  if (!value) return '';
  const buffer = Buffer.from(value, 'utf8');
  if (buffer.length <= maxBytes) return value;
  return buffer.subarray(0, maxBytes).toString('utf8');
}

function canHandle(languageId) {
  return String(languageId || '').toLowerCase().trim() === 'analyse';
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

function runPseudoCode() {
  return unavailable('pseudo-code');
}

function runSql() {
  return unavailable('sql');
}

function runAnalyse(code, stdin) {
  const rawLines = String(code || '')
    .replace(/\r\n?/g, '\n')
    .split('\n');
  const escapedFormat = rawLines[0] === ANALYSE_FORMAT;
  const headerRe = /^\[(?:cas\s*(\d+)|exemple)\b.*\]$/i;
  const hasSections = rawLines.some(l => headerRe.test(l.trim()));
  const sel = String(stdin || '').trim();

  if (hasSections || /^cas\s*:/i.test(sel)) {
    const sections = new Map();
    const allSectionLines = [];
    let currentKey = null;

    for (const rawLine of rawLines) {
      const escapedAnswer = escapedFormat && rawLine.startsWith(ANALYSE_ESCAPE);
      const rtrim = (escapedAnswer ? rawLine.slice(ANALYSE_ESCAPE.length) : rawLine).replace(/\s+$/, '');
      const trimmed = rtrim.trim();
      if (!trimmed || (!escapedAnswer && trimmed.startsWith('#'))) continue;
      const m = escapedAnswer ? null : headerRe.exec(trimmed);
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
    .map(rawLine => {
      const escapedAnswer = escapedFormat && rawLine.startsWith(ANALYSE_ESCAPE);
      const value = escapedAnswer ? rawLine.slice(ANALYSE_ESCAPE.length) : rawLine;
      return { escapedAnswer, value: value.trim().replace(/[ \t]+/g, ' ') };
    })
    .filter(line => line.value.length > 0 && (line.escapedAnswer || (!line.value.startsWith('#') && !headerRe.test(line.value))))
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
  if (language === 'analyse') return runAnalyse(payload.code, payload.stdin);
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
