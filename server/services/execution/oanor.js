/**
 * Adaptateur du fournisseur d'exécution (Oanor Code Execution API).
 *
 * Ce fichier est le SEUL endroit du projet qui connaît l'URL du fournisseur et
 * l'en-tête d'authentification. Remplacer de fournisseur (Judge0, Piston…)
 * consiste à réécrire ce fichier : rien d'autre ne change (cf. spec §42).
 *
 * Contrat de sortie : `{ httpStatus, ok, data, raw }`, jamais de fuite de la clé.
 * La clé n'apparaît dans aucun message d'erreur ni dans aucun log.
 */

const PROVIDER_NAME = 'oanor';

function baseUrl() {
  return (process.env.OANOR_BASE_URL || 'https://api.oanor.com/codeexec-api').replace(/\/+$/, '');
}

function apiKey() {
  return process.env.OANOR_API_KEY || '';
}

function isConfigured() {
  return apiKey().length > 0;
}

function timeoutMs() {
  const n = Number(process.env.CODE_EXEC_TIMEOUT_MS);
  return Number.isFinite(n) && n > 0 ? n : 20000;
}

/** Retry seulement sur les erreurs réellement transitoires (spec §37). */
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
 * Appel brut à un endpoint du fournisseur.
 * @param {string} endpoint chemin relatif, ex. '/v1/run'
 * @param {URLSearchParams} [params]
 * @returns {Promise<{ok: boolean, httpStatus: number, data: unknown, raw: string}>}
 */
async function request(endpoint, params) {
  if (!isConfigured()) {
    throw new ExecutionError('not_configured', 'Service d’exécution non configuré', {
      userMessage: 'Le service d’exécution n’est pas configuré sur ce serveur.'
    });
  }

  const query = params && params.toString() ? `?${params.toString()}` : '';
  const url = `${baseUrl()}${endpoint}${query}`;

  let attempt = 0;
  for (;;) {
    attempt++;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs());

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          // La clé part uniquement d'ici, côté serveur (spec §7, §29).
          'x-oanor-key': apiKey(),
          Accept: 'application/json'
        },
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
      throw new ExecutionError(aborted ? 'timeout' : 'upstream_unreachable',
        aborted ? 'Délai dépassé auprès du fournisseur' : 'Fournisseur injoignable', {
        userMessage: aborted
          ? 'Le service d’exécution a mis trop de temps à répondre. Réessayez.'
          : 'Le service d’exécution est temporairement indisponible.'
      });
    } finally {
      clearTimeout(timer);
    }
  }
}

/**
 * Compile et exécute un programme.
 * @param {{language: string, code: string, stdin?: string, options?: string,
 *          compiler?: string, args?: string, save?: boolean}} payload
 */
function run(payload) {
  const params = new URLSearchParams();
  // URLSearchParams gère espace, +, &, =, ?, #, %, guillemets, Unicode et
  // sauts de ligne — jamais de concaténation manuelle (spec §5, §39.5).
  params.set('language', payload.language);
  params.set('code', payload.code);
  if (payload.stdin) params.set('stdin', payload.stdin);
  if (payload.options) params.set('options', payload.options);
  if (payload.compiler) params.set('compiler', payload.compiler);
  if (payload.args) params.set('args', payload.args);
  if (payload.save) params.set('save', 'true');
  return request('/v1/run', params);
}

function languages() {
  return request('/v1/languages');
}

function compilers() {
  return request('/v1/compilers');
}

function meta() {
  return request('/v1/meta');
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
  timeoutMs
};
