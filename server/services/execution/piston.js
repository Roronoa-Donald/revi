/**
 * Adaptateur du fournisseur d'exécution Piston (EngineerMan / piston).
 *
 * Ce fichier est le point de contact exclusif avec l'API Piston v2.
 * Il respecte le contrat de sortie : { httpStatus, ok, data, raw, parsed }
 * et garantit la non-divulgation de toute clé d'authentification ou URL interne.
 *
 * Spécification Piston v2 :
 *   - GET  /api/v2/runtimes : liste des langages et versions installés
 *   - POST /api/v2/execute  : exécution avec files, stdin, args, timeouts
 */

const PROVIDER_NAME = 'piston';

function baseUrl() {
  const url = process.env.PISTON_URL || '';
  return url.trim().replace(/\/+$/, '');
}

function apiKey() {
  return (process.env.PISTON_API_KEY || '').trim();
}

function isConfigured() {
  return baseUrl().length > 0;
}

function timeoutMs() {
  const n = Number(process.env.CODE_EXEC_TIMEOUT_MS);
  return Number.isFinite(n) && n > 0 ? n : 20000;
}

/** Erreurs HTTP transitoires justifiant un nouvel essai automatique. */
const RETRYABLE_STATUS = new Set([502, 503, 504]);
const RETRY_DELAY_MS = 400;

class ExecutionError extends Error {
  constructor(code, message, extra = {}) {
    super(message);
    this.name = 'ExecutionError';
    this.code = code;
    this.httpStatus = extra.httpStatus || null;
    this.userMessage = extra.userMessage || message;
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Construit l'URL complète d'un endpoint Piston en tenant compte du préfixe éventuel.
 * @param {string} endpoint ex: '/execute' ou '/runtimes'
 */
function endpointUrl(endpoint) {
  const base = baseUrl();
  const sub = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  if (base.endsWith('/api/v2') || base.endsWith('/api/v2/piston')) {
    return `${base}${sub}`;
  }
  return `${base}/api/v2${sub}`;
}

/**
 * Correspondance des langages internes vers les identifiants reconnus par Piston.
 */
const PISTON_LANG_MAP = {
  python: 'python',
  py: 'python',
  javascript: 'javascript',
  js: 'javascript',
  node: 'javascript',
  nodejs: 'javascript',
  typescript: 'typescript',
  ts: 'typescript',
  c: 'c',
  cpp: 'c++',
  'c++': 'c++',
  csharp: 'csharp',
  'c#': 'csharp',
  java: 'java',
  php: 'php',
  go: 'go',
  rust: 'rust',
  ruby: 'ruby',
  kotlin: 'kotlin',
  swift: 'swift',
  haskell: 'haskell',
  scala: 'scala',
  lua: 'lua',
  r: 'r',
  shell: 'bash',
  bash: 'bash',
  sh: 'bash',
  powershell: 'powershell',
  pwsh: 'powershell',
  sql: 'sqlite3',
  sqlite: 'sqlite3',
  sqlite3: 'sqlite3'
};

const LANG_EXT_MAP = {
  python: 'py',
  javascript: 'js',
  typescript: 'ts',
  c: 'c',
  cpp: 'cpp',
  'c++': 'cpp',
  csharp: 'cs',
  'c#': 'cs',
  java: 'java',
  php: 'php',
  go: 'go',
  rust: 'rs',
  ruby: 'rb',
  kotlin: 'kt',
  swift: 'swift',
  haskell: 'hs',
  scala: 'scala',
  lua: 'lua',
  r: 'r',
  shell: 'sh',
  bash: 'sh',
  powershell: 'ps1',
  pwsh: 'ps1',
  sql: 'sql'
};

/**
 * Appel HTTP brut à l'API Piston.
 * @param {string} endpoint chemin relatif, ex: '/execute' ou '/runtimes'
 * @param {object} [options] { method, body, headers }
 * @returns {Promise<{ok: boolean, httpStatus: number, data: unknown, raw: string, parsed: boolean}>}
 */
async function request(endpoint, options = {}) {
  if (!isConfigured()) {
    throw new ExecutionError('not_configured', 'Service Piston non configuré', {
      userMessage: 'Le service d’exécution Piston n’est pas configuré sur ce serveur.'
    });
  }

  const url = endpointUrl(endpoint);
  const method = options.method || 'GET';
  const headers = {
    Accept: 'application/json',
    ...(options.headers || {})
  };

  const key = apiKey();
  if (key) {
    headers['Authorization'] = key;
    headers['x-api-key'] = key;
  }

  let body = null;
  if (options.body) {
    if (typeof options.body === 'object') {
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(options.body);
    } else {
      body = String(options.body);
    }
  }

  let attempt = 0;
  for (;;) {
    attempt++;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs());

    try {
      const response = await fetch(url, {
        method,
        headers,
        body,
        cache: 'no-store',
        signal: controller.signal
      });

      const raw = await response.text();

      if (!response.ok && RETRYABLE_STATUS.has(response.status) && attempt === 1) {
        clearTimeout(timer);
        await sleep(RETRY_DELAY_MS);
        continue;
      }

      let data = null;
      let parsed = true;
      try {
        data = raw ? JSON.parse(raw) : null;
      } catch {
        parsed = false;
      }

      return { ok: response.ok, httpStatus: response.status, data, raw, parsed };
    } catch (error) {
      const aborted = error && error.name === 'AbortError';
      if (!aborted && attempt === 1) {
        clearTimeout(timer);
        await sleep(RETRY_DELAY_MS);
        continue;
      }
      throw new ExecutionError(
        aborted ? 'timeout' : 'upstream_unreachable',
        aborted ? 'Délai dépassé auprès de Piston' : 'Piston injoignable',
        {
          userMessage: aborted
            ? 'Le service d’exécution a mis trop de temps à répondre. Réessayez.'
            : 'Le service d’exécution est temporairement indisponible.'
        }
      );
    } finally {
      clearTimeout(timer);
    }
  }
}

/**
 * Exécute un programme via l'API Piston v2 /execute.
 * @param {{language: string, code: string, stdin?: string, args?: string|string[], version?: string}} payload
 */
function run(payload) {
  const norm = String(payload.language || '').toLowerCase().trim();
  const lang = PISTON_LANG_MAP[norm] || payload.language;
  const ext = LANG_EXT_MAP[norm] || 'txt';
  const fileName = norm === 'java' ? 'Main.java' : `main.${ext}`;

  let args = [];
  if (Array.isArray(payload.args)) {
    args = payload.args;
  } else if (typeof payload.args === 'string' && payload.args.trim()) {
    args = payload.args.trim().split(/\s+/);
  }

  const body = {
    language: lang,
    version: payload.version || '*',
    files: [
      {
        name: fileName,
        content: payload.code || ''
      }
    ],
    stdin: payload.stdin || '',
    args
  };

  // N'envoyer run_timeout / compile_timeout que si explicitement spécifiés dans l'environnement,
  // sinon laisser Piston appliquer ses limites natives de sécurité (ex: 3000 ms) pour éviter
  // l'erreur HTTP 400 "run_timeout cannot exceed the configured limit of 3000".
  if (process.env.PISTON_RUN_TIMEOUT) {
    const rt = Number(process.env.PISTON_RUN_TIMEOUT);
    if (Number.isFinite(rt) && rt > 0) body.run_timeout = rt;
  }
  if (process.env.PISTON_COMPILE_TIMEOUT) {
    const ct = Number(process.env.PISTON_COMPILE_TIMEOUT);
    if (Number.isFinite(ct) && ct > 0) body.compile_timeout = ct;
  }

  return request('/execute', {
    method: 'POST',
    body
  });
}

/**
 * Liste des environnements d'exécution installés sur Piston.
 */
function languages() {
  return request('/runtimes');
}

/**
 * Compilateurs et versions (alias vers /runtimes sur Piston).
 */
function compilers() {
  return request('/runtimes');
}

/**
 * Métadonnées du service Piston.
 */
function meta() {
  return request('/runtimes').then(res => ({
    ok: res.ok,
    httpStatus: res.httpStatus,
    data: { provider: PROVIDER_NAME, configured: isConfigured() },
    raw: res.raw,
    parsed: res.parsed
  }));
}

module.exports = {
  PROVIDER_NAME,
  ExecutionError,
  isConfigured,
  run,
  languages,
  compilers,
  meta,
  baseUrl,
  apiKey,
  endpointUrl,
  timeoutMs,
  PISTON_LANG_MAP,
  LANG_EXT_MAP
};
