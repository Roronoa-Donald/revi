/**
 * Façade d'exécution de code — point d'entrée unique du reste de l'application.
 *
 * Responsabilités (spec fournisseur §40 et §41) :
 *   - valider les entrées (langage, taille, options) ;
 *   - appeler l'adaptateur du fournisseur ;
 *   - NORMALISER la réponse dans une forme interne stable et testable ;
 *   - traduire les erreurs HTTP en états compréhensibles pour l'élève.
 *
 * Aucun appel au fournisseur ne doit exister ailleurs dans le projet.
 * Aucun nom de champ de la réponse amont n'est supposé : ils sont recherchés,
 * et si rien n'est reconnu la réponse brute est remontée pour diagnostic.
 */

const oanor = require('./oanor');
const piston = require('./piston');
const localRunner = require('./local-runner');
const languages = require('./languages');

const { ExecutionError } = oanor;

/**
 * Sélectionne le fournisseur actif :
 *   1. Piston si PISTON_URL est configuré
 *   2. Oanor si OANOR_API_KEY est configuré
 *   3. Repli par défaut selon les variables définies
 */
function getProvider() {
  if (piston.isConfigured()) return piston;
  if (oanor.isConfigured()) return oanor;
  return process.env.PISTON_URL !== undefined ? piston : oanor;
}

/** Limites de taille, appliquées côté serveur (spec §26). */
const LIMITS = {
  code: 60 * 1024,
  stdin: 8 * 1024,
  args: 2 * 1024,
  options: 512
};

/** Longueur maximale de la réponse brute renvoyée pour diagnostic. */
const RAW_PREVIEW = 8000;

/** Durée de mise en cache du catalogue de langages (données quasi statiques). */
const LANGUAGES_TTL_MS = 60 * 60 * 1000;

// ========================
// Validation
// ========================

function byteLength(value) {
  return Buffer.byteLength(String(value || ''), 'utf8');
}

/**
 * Valide et met en forme une demande d'exécution.
 * @throws {ExecutionError} code `invalid_request`
 */
function validate(input) {
  const raw = input && typeof input === 'object' ? input : {};

  const lang = languages.getLanguage(raw.language);
  if (!lang) {
    throw new ExecutionError('invalid_request',
      `Langage non autorisé : ${String(raw.language).slice(0, 40)}`, {
        userMessage: 'Ce langage n’est pas disponible dans l’atelier.'
      });
  }

  const code = typeof raw.code === 'string' ? raw.code : '';
  if (!code.trim()) {
    throw new ExecutionError('invalid_request', 'Code vide', {
      userMessage: 'Écrivez du code avant de lancer l’exécution.'
    });
  }
  if (byteLength(code) > LIMITS.code) {
    throw new ExecutionError('invalid_request', 'Code trop long', {
      userMessage: `Le code dépasse la taille maximale autorisée (${Math.floor(LIMITS.code / 1024)} Ko).`
    });
  }

  const stdin = typeof raw.stdin === 'string' ? raw.stdin : '';
  if (byteLength(stdin) > LIMITS.stdin) {
    throw new ExecutionError('invalid_request', 'Entrée standard trop longue', {
      userMessage: `L’entrée dépasse la taille maximale autorisée (${Math.floor(LIMITS.stdin / 1024)} Ko).`
    });
  }

  const args = typeof raw.args === 'string' ? raw.args : '';
  if (byteLength(args) > LIMITS.args) {
    throw new ExecutionError('invalid_request', 'Arguments trop longs', {
      userMessage: 'Les arguments passés au programme sont trop longs.'
    });
  }

  const options = typeof raw.options === 'string' ? raw.options : '';
  if (byteLength(options) > LIMITS.options) {
    throw new ExecutionError('invalid_request', 'Options trop longues', {
      userMessage: 'Les options de compilation sont trop longues.'
    });
  }

  // Le compilateur explicite doit venir du catalogue, jamais d'une chaîne libre.
  const compiler = typeof raw.compiler === 'string' ? raw.compiler : '';

  return {
    language: lang.oanor,
    languageId: lang.id,
    code,
    stdin,
    args,
    options,
    compiler,
    save: raw.save === true
  };
}

// ========================
// Normalisation
// ========================

/** Cherche la première propriété non vide parmi plusieurs chemins (`a.b.c`). */
function pickDeep(source, paths) {
  for (const path of paths) {
    const value = path.split('.').reduce(
      (acc, key) => (acc && typeof acc === 'object' ? acc[key] : undefined),
      source
    );
    if (value === undefined || value === null) continue;
    if (typeof value === 'string' || typeof value === 'number') {
      return { path, value: String(value) };
    }
  }
  return { path: null, value: '' };
}

/** Lit une valeur numérique au chemin indiqué, sans supposer l'unité. */
function numberAt(source, path) {
  if (!path) return null;
  const value = path.split('.').reduce(
    (acc, key) => (acc && typeof acc === 'object' ? acc[key] : undefined),
    source
  );
  return value;
}

const FIELDS = {
  stdout: [
    'run.stdout', 'stdout', 'program_output', 'data.stdout', 'result.stdout',
    'result.program_output', 'execution.stdout', 'output', 'run.output'
  ],
  stderr: [
    'run.stderr', 'stderr', 'program_error', 'data.stderr', 'result.stderr',
    'result.program_error', 'execution.stderr'
  ],
  compileError: [
    'compile.stderr', 'compile.output', 'compile_error', 'compiler_error', 'data.compile_error', 'result.compile_error',
    'compiler_message', 'data.compiler_message', 'compiler_output'
  ],
  merged: ['program_message', 'data.program_message', 'result.program_message'],
  exitCode: ['run.code', 'exit_code', 'exitCode', 'status_code', 'result.exit_code', 'data.exit_code'],
  runStatus: ['status', 'data.status', 'result.status'],
  signal: ['run.signal', 'signal', 'data.signal'],
  executionTime: ['execution_time', 'time', 'duration', 'cpu_time', 'result.time'],
  memory: ['memory', 'memory_usage', 'result.memory'],
  permalink: ['permalink', 'permanent_link', 'save_url', 'share_url', 'url']
};

function toNumber(value) {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim() !== '' && Number.isFinite(Number(value))) {
    return Number(value);
  }
  return null;
}

function stringOrNull(value) {
  if (value === undefined || value === null || value === '') return null;
  return String(value);
}

function httpStatusToState(httpStatus) {
  if (httpStatus === 429) return 'rate_limited';
  return 'api_error';
}

const HTTP_MESSAGES = {
  400: 'La demande d’exécution a été refusée par le service.',
  401: 'Le service d’exécution a refusé l’authentification du serveur.',
  403: 'Le service d’exécution a refusé la demande.',
  404: 'Le service d’exécution est introuvable.',
  408: 'Le service d’exécution n’a pas répondu à temps. Réessayez.',
  429: 'Trop de demandes d’exécution en cours. Réessayez dans quelques instants.',
  500: 'Le service d’exécution a rencontré une erreur interne.',
  502: 'Le service d’exécution est temporairement indisponible.',
  503: 'Le service d’exécution est temporairement indisponible.',
  504: 'Le service d’exécution n’a pas répondu à temps. Réessayez.'
};

function userMessageFor(httpStatus) {
  return HTTP_MESSAGES[httpStatus] || 'Le service d’exécution est momentanément indisponible.';
}

/**
 * Transforme la réponse brute du fournisseur en forme interne stable.
 * @returns {object} forme normalisée
 */
function normalizeResponse(response, providerOverride) {
  const currentProvider = getProvider();
  const providerName = providerOverride || (currentProvider ? currentProvider.PROVIDER_NAME : 'piston');
  const base = {
    provider: providerName,
    ok: false,
    status: 'api_error',
    stdout: '',
    stderr: '',
    compileError: '',
    exitCode: null,
    executionTime: null,
    memory: null,
    permalink: null,
    httpStatus: response.httpStatus || null,
    userMessage: '',
    warnings: [],
    raw: null
  };

  if (!response.ok) {
    const serverMessage = response.data && typeof response.data === 'object' && typeof response.data.message === 'string'
      ? response.data.message.trim()
      : '';
    return {
      ...base,
      status: httpStatusToState(response.httpStatus),
      userMessage: serverMessage || userMessageFor(response.httpStatus),
      warnings: serverMessage ? [serverMessage] : [],
      raw: typeof response.raw === 'string' ? response.raw.slice(0, RAW_PREVIEW) : null
    };
  }

  const data = response.data;

  if (!data || typeof data !== 'object') {
    return {
      ...base,
      status: 'unknown_error',
      userMessage: 'Le service d’exécution a renvoyé une réponse illisible.',
      warnings: ['Réponse non JSON ou vide.'],
      raw: typeof response.raw === 'string' ? response.raw.slice(0, RAW_PREVIEW) : null
    };
  }

  const paths = {};
  const values = {};
  for (const [field, candidates] of Object.entries(FIELDS)) {
    const found = pickDeep(data, candidates);
    paths[field] = found.path;
    values[field] = found.value;
  }

  const recognized = Object.values(paths).filter(Boolean).length;
  const warnings = [];

  if (recognized === 0) {
    if (data.message && typeof data.message === 'string') {
      return {
        ...base,
        status: 'api_error',
        userMessage: data.message,
        warnings: [data.message],
        raw: typeof response.raw === 'string' ? response.raw.slice(0, RAW_PREVIEW) : null
      };
    }
    return {
      ...base,
      status: 'unknown_error',
      userMessage: 'Le service d’exécution a renvoyé une réponse non reconnue.',
      warnings: [
        'Aucun champ attendu (stdout, stderr, exit_code…) n’a été trouvé dans la réponse.',
        `Clés reçues : ${Object.keys(data).slice(0, 20).join(', ') || '(aucune)'}`
      ],
      raw: typeof response.raw === 'string' ? response.raw.slice(0, RAW_PREVIEW) : null
    };
  }

  const serialize = (field, fallback) => {
    if (!paths[field]) return fallback;
    const value = values[field];
    return typeof value === 'string' ? value : String(value);
  };

  let stdout = serialize('stdout', '');
  let stderr = serialize('stderr', '');
  let compileError = serialize('compileError', '').trim();

  // Spécifique Piston : prise en compte explicite du bloc compile
  if (data.compile && typeof data.compile === 'object') {
    if (typeof data.compile.code === 'number' && data.compile.code !== 0) {
      if (!compileError) {
        compileError = (data.compile.stderr || data.compile.output || 'Erreur de compilation').trim();
      }
    } else if (data.compile.code === 0) {
      compileError = '';
    }
  }

  // Certains fournisseurs renvoient stdout + stderr fusionnés dans un seul champ.
  if (!stdout && !paths.stdout && paths.merged) {
    stdout = serialize('merged', '');
    warnings.push('Sortie récupérée depuis le champ fusionné `program_message`.');
  }

  const exitCode = paths.exitCode ? toNumber(numberAt(data, paths.exitCode)) : null;
  const runStatus = paths.runStatus ? toNumber(numberAt(data, paths.runStatus)) : null;
  const signal = stringOrNull(values.signal) || '';

  if (signal && !stderr) {
    if (data.run && data.run.message) {
      stderr = data.run.message;
    } else if (data.run && data.run.output) {
      stderr = data.run.output;
    } else {
      stderr = `Programme interrompu par le signal ${signal} (temps d'exécution ou mémoire dépassés).`;
    }
  }

  let status = 'success';
  if (compileError) {
    status = 'compile_error';
  } else if (signal) {
    status = 'runtime_error';
  } else if (exitCode !== null && exitCode !== 0) {
    status = 'runtime_error';
  } else if (exitCode === null && runStatus !== null && runStatus !== 0) {
    status = 'runtime_error';
  } else if (stderr && exitCode === null && runStatus === null) {
    // On ne sait pas lire le code de sortie mais le programme a écrit sur la
    // sortie d'erreur : on classe en échec plutôt que d'annoncer un succès.
    status = 'runtime_error';
    warnings.push('Échec déduit de la sortie d’erreur (code de sortie absent de la réponse).');
  }

  const permalink = stringOrNull(values.permalink);
  const safePermalink = permalink && /^https?:\/\//i.test(permalink) ? permalink : null;

  const timeRaw = paths.executionTime ? toNumber(numberAt(data, paths.executionTime)) : null;

  return {
    ...base,
    ok: status === 'success',
    status,
    stdout,
    stderr,
    compileError,
    exitCode,
    executionTime: timeRaw,
    memory: paths.memory ? toNumber(numberAt(data, paths.memory)) : null,
    permalink: safePermalink,
    userMessage: '',
    warnings,
    raw: null
  };
}

// ========================
// API publique
// ========================

/**
 * Compile et exécute du code.
 * @param {object} input { language, code, stdin, args, options, compiler, save }
 * @returns {Promise<object>} forme normalisée (voir `normalizeResponse`)
 * @throws {provider.ExecutionError} `invalid_request` ou `not_configured`
 */
const ISOLATED_LOCAL_LANGUAGES = new Set([
  'python', 'py', 'javascript', 'js', 'algo', 'pseudo-code', 'pseudocode', 'sql', 'analyse'
]);

async function execute(input, deps = {}) {
  const activeProvider = deps.provider || getProvider();
  const payload = validate(input);

  // 1. Dépendance injectée explicite (ex: tests automatisés)
  if (deps.run) {
    const response = await deps.run(payload);
    return normalizeResponse(response, activeProvider.PROVIDER_NAME);
  }

  const langId = String(payload.languageId || '').toLowerCase().trim();
  const isIsolatedLocal = ISOLATED_LOCAL_LANGUAGES.has(langId) && localRunner.canHandle(langId);
  // Valeur par défaut du repli local : false (désactivé) ; activation explicite requise
  const canFallbackLocal = isIsolatedLocal && (deps.allowLocal === true || process.env.ALLOW_LOCAL_EXECUTION_FALLBACK === 'true');

  if (langId === 'analyse') {
    const localRes = await localRunner.run(payload);
    return normalizeResponse(localRes, 'local');
  }

  // Pour shell et csharp (et tout langage hors ISOLATED_LOCAL_LANGUAGES) :
  // exécution UNIQUEMENT via Piston (ou fournisseur distant configuré), jamais de repli local.
  if (!isIsolatedLocal) {
    if (piston.isConfigured()) {
      try {
        const response = await piston.run(payload);
        if (!response.ok) {
          return {
            ...normalizeResponse(response, piston.PROVIDER_NAME),
            ok: false,
            status: 'api_error',
            userMessage: 'Le moteur d’exécution est temporairement indisponible.'
          };
        }
        return normalizeResponse(response, piston.PROVIDER_NAME);
      } catch (err) {
        throw new activeProvider.ExecutionError('upstream_unreachable',
          `Moteur d’exécution distant indisponible pour ${langId}`, {
            userMessage: 'Le moteur d’exécution est temporairement indisponible.'
          });
      }
    }
    if (oanor.isConfigured()) {
      const response = await oanor.run(payload);
      return normalizeResponse(response, oanor.PROVIDER_NAME);
    }
    throw new activeProvider.ExecutionError('not_configured',
      `Le moteur d’exécution est temporairement indisponible pour ${langId} (PISTON_URL non configuré).`, {
        userMessage: 'Le moteur d’exécution est temporairement indisponible.'
      });
  }

  // 2. Si Piston est configuré, il est le moteur distant prioritaire
  if (piston.isConfigured()) {
    try {
      const response = await piston.run(payload);
      if (!response.ok && canFallbackLocal) {
        const localRes = await localRunner.run(payload);
        return normalizeResponse(localRes, 'local');
      }
      return normalizeResponse(response, piston.PROVIDER_NAME);
    } catch (err) {
      if (canFallbackLocal) {
        const localRes = await localRunner.run(payload);
        return normalizeResponse(localRes, 'local');
      }
      throw err;
    }
  }

  // 3. Exécution locale isolée uniquement sur activation explicite (allowLocal === true ou ALLOW_LOCAL_EXECUTION_FALLBACK === 'true')
  if (canFallbackLocal) {
    const localRes = await localRunner.run(payload);
    return normalizeResponse(localRes, 'local');
  }

  // 4. Si Oanor est configuré (legacy)
  if (oanor.isConfigured()) {
    try {
      const response = await oanor.run(payload);
      if (!response.ok && canFallbackLocal) {
        const localRes = await localRunner.run(payload);
        return normalizeResponse(localRes, 'local');
      }
      return normalizeResponse(response, oanor.PROVIDER_NAME);
    } catch (err) {
      if (canFallbackLocal) {
        const localRes = await localRunner.run(payload);
        return normalizeResponse(localRes, 'local');
      }
      throw err;
    }
  }

  // 5. Aucun fournisseur distant configuré et repli local non activé
  throw new activeProvider.ExecutionError('not_configured',
    `Le moteur distant (Piston) n’est pas configuré pour ${payload.languageId}. Renseignez PISTON_URL.`, {
      userMessage: 'Le moteur d’exécution est temporairement indisponible.'
    });
}

let languagesCache = { at: 0, payload: null };

/**
 * Catalogue des langages proposables à l'élève.
 * Recoupé avec ce que le fournisseur annonce réellement, avec repli local.
 * @param {boolean} [forceRefresh]
 */
async function getLanguages(forceRefresh = false) {
  const now = Date.now();
  if (!forceRefresh && languagesCache.payload && now - languagesCache.at < LANGUAGES_TTL_MS) {
    return languagesCache.payload;
  }

  const activeProvider = getProvider();
  let payload;
  try {
    if (!activeProvider.isConfigured()) throw new Error('non configuré');
    const response = await activeProvider.languages();
    if (!response.ok) throw new Error(`HTTP ${response.httpStatus}`);
    const { languages: list, matched } = languages.matchDeclared(response.data);
    payload = { source: matched > 0 ? 'provider' : 'fallback', matched, languages: list };
  } catch {
    const { languages: list } = languages.matchDeclared(null);
    payload = { source: 'fallback', matched: 0, languages: list };
  }

  languagesCache = { at: now, payload };
  return payload;
}

/** Catalogue des compilateurs (versions disponibles par langage). */
async function getCompilers() {
  const activeProvider = getProvider();
  const response = await activeProvider.compilers();
  if (!response.ok) {
    throw new activeProvider.ExecutionError('api_error', `Compilateurs indisponibles (HTTP ${response.httpStatus})`, {
      httpStatus: response.httpStatus,
      userMessage: userMessageFor(response.httpStatus)
    });
  }
  return response.data;
}

/** Métadonnées du service d'exécution. */
async function getMeta() {
  const activeProvider = getProvider();
  const response = await activeProvider.meta();
  if (!response.ok) {
    throw new activeProvider.ExecutionError('api_error', `Métadonnées indisponibles (HTTP ${response.httpStatus})`, {
      httpStatus: response.httpStatus,
      userMessage: userMessageFor(response.httpStatus)
    });
  }
  return response.data;
}

/**
 * Comparaison de sorties de programme pour la correction d'exercices.
 * Insensible aux espaces de fin de ligne et aux lignes vides de bord.
 */
function normalizeOutput(value) {
  return String(value === undefined || value === null ? '' : value)
    .replace(/\r\n?/g, '\n')
    .split('\n')
    .map(line => line.replace(/\s+$/, ''))
    .join('\n')
    .replace(/^\n+/, '')
    .replace(/\n+$/, '');
}

/**
 * Traduit une exception d'exécution en réponse HTTP pour l'élève.
 *
 * `error.message` n'est JAMAIS transmis : il peut contenir une adresse, un
 * statut interne ou un extrait de configuration. Seul `userMessage`, rédigé
 * pour l'élève, sort d'ici ; à défaut, un message générique du tableau.
 */
const ERROR_HTTP = {
  invalid_request: 400,
  not_configured: 503,
  timeout: 504,
  upstream_unreachable: 502,
  api_error: 502
};

const ERROR_MESSAGE = {
  invalid_request: 'La demande a été refusée.',
  not_configured: 'Le service d’exécution n’est pas configuré sur ce serveur.',
  timeout: 'Le service d’exécution n’a pas répondu à temps. Réessayez.',
  upstream_unreachable: 'Le service d’exécution est momentanément indisponible.',
  api_error: 'Le service d’exécution est momentanément indisponible.'
};

function errorToHttp(error) {
  const code = (error && error.code) || 'api_error';
  return {
    statusCode: ERROR_HTTP[code] || 502,
    code,
    message: (error && error.userMessage) || ERROR_MESSAGE[code] || ERROR_MESSAGE.api_error
  };
}

module.exports = {
  LIMITS,
  execute,
  errorToHttp,
  getLanguages,
  getCompilers,
  getMeta,
  normalizeResponse,
  normalizeOutput,
  validate,
  getProvider,
  piston,
  oanor,
  get ExecutionError() { return getProvider().ExecutionError; },
  isConfigured: () => getProvider().isConfigured(),
  get provider() { return getProvider().PROVIDER_NAME; }
};
