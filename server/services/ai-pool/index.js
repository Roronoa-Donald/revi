/**
 * Gestionnaire du pool de clés API et routeur multi-fournisseurs d'IA.
 *
 * Fonctionnalités clés :
 *   - Support multi-fournisseurs : OpenRouter, NVIDIA NIM, Ollama Cloud, Custom
 *   - Pool de clés avec rotation round-robin et équilibrage de charge
 *   - Résilience anti rate-limit : mise en quarantaine temporaire (cooldown) sur 429
 *     et bascule transparente et immédiate sur la clé suivante du pool
 *   - Récupération dynamique des modèles (Pull / GET /models)
 *   - Persistance en base PostgreSQL avec repli mémoire / variables d'environnement
 */

const { PROVIDERS, getProviderDef } = require('./providers');

let db = null;
try {
  db = require('../../db');
} catch {
  // DB non disponible dans certains contextes de test
}

// État en mémoire (sert de cache rapide et de repli si DB indisponible)
const memoryState = {
  config: {
    active_provider: 'openrouter',
    chat_model: 'deepseek/deepseek-chat',
    code_model: 'deepseek/deepseek-chat',
    temperature: '0.7',
    max_tokens: '2048'
  },
  keys: [], // { id, provider, apiKey, label, baseUrl, isActive, requestCount, errorCount, cooldownUntil }
  nextId: 1,
  rotationIndex: {} // provider -> index
};

// Initialisation depuis les variables d'environnement si présentes
function seedFromEnv() {
  if (process.env.OPENROUTER_API_KEY && !memoryState.keys.some(k => k.apiKey === process.env.OPENROUTER_API_KEY)) {
    memoryState.keys.push({
      id: memoryState.nextId++,
      provider: 'openrouter',
      apiKey: process.env.OPENROUTER_API_KEY.trim(),
      label: 'Clé environnement (OPENROUTER_API_KEY)',
      baseUrl: null,
      isActive: true,
      requestCount: 0,
      errorCount: 0,
      cooldownUntil: 0
    });
  }

  if (process.env.NVIDIA_API_KEY && !memoryState.keys.some(k => k.apiKey === process.env.NVIDIA_API_KEY)) {
    memoryState.keys.push({
      id: memoryState.nextId++,
      provider: 'nvidia',
      apiKey: process.env.NVIDIA_API_KEY.trim(),
      label: 'Clé environnement (NVIDIA_API_KEY)',
      baseUrl: null,
      isActive: true,
      requestCount: 0,
      errorCount: 0,
      cooldownUntil: 0
    });
  }

  if (process.env.OLLAMA_API_KEY && !memoryState.keys.some(k => k.apiKey === process.env.OLLAMA_API_KEY)) {
    memoryState.keys.push({
      id: memoryState.nextId++,
      provider: 'ollama',
      apiKey: process.env.OLLAMA_API_KEY.trim(),
      label: 'Clé environnement (OLLAMA_API_KEY)',
      baseUrl: process.env.OLLAMA_BASE_URL || null,
      isActive: true,
      requestCount: 0,
      errorCount: 0,
      cooldownUntil: 0
    });
  }

  if (process.env.AI_HELP_MODEL) {
    memoryState.config.code_model = process.env.AI_HELP_MODEL.trim();
  }
}
seedFromEnv();

/** Masque une clé API pour l'affichage (ex: sk-or-...a1b2) */
function maskKey(key) {
  if (!key || typeof key !== 'string') return '';
  const s = key.trim();
  if (s.length <= 8) return '****';
  return `${s.slice(0, 6)}...${s.slice(-4)}`;
}

// ========================
// Gestion de la Configuration
// ========================

async function getConfig() {
  if (db && typeof db.query === 'function') {
    try {
      const res = await db.query('SELECT key, value FROM ai_config');
      if (res.rows && res.rows.length > 0) {
        for (const row of res.rows) {
          memoryState.config[row.key] = row.value;
        }
      }
    } catch {
      // Table absente ou connexion fermée, repli mémoire
    }
  }
  return { ...memoryState.config };
}

async function updateConfig(updates) {
  if (!updates || typeof updates !== 'object') return getConfig();

  const allowed = ['active_provider', 'chat_model', 'code_model', 'temperature', 'max_tokens'];
  for (const k of allowed) {
    if (updates[k] !== undefined && updates[k] !== null) {
      const val = String(updates[k]).trim();
      memoryState.config[k] = val;

      if (db && typeof db.query === 'function') {
        try {
          await db.query(
            'INSERT INTO ai_config (key, value, updated_at) VALUES ($1, $2, NOW()) ON CONFLICT (key) DO UPDATE SET value = $2, updated_at = NOW()',
            [k, val]
          );
        } catch {
          // Erreur DB ignorée, état mémoire conservé
        }
      }
    }
  }

  return getConfig();
}

// ========================
// Gestion du Pool de Clés
// ========================

async function loadKeysFromDB() {
  if (!db || typeof db.query !== 'function') return memoryState.keys;

  try {
    const res = await db.query(
      'SELECT id, provider, api_key, label, base_url, is_active, request_count, error_count, last_used_at FROM ai_api_keys ORDER BY id ASC'
    );
    if (res.rows) {
      // Synchronise la mémoire avec la base
      const existingCooldowns = new Map(memoryState.keys.map(k => [k.id, k.cooldownUntil || 0]));
      memoryState.keys = res.rows.map(r => ({
        id: r.id,
        provider: r.provider,
        apiKey: r.api_key,
        label: r.label || '',
        baseUrl: r.base_url || null,
        isActive: r.is_active,
        requestCount: r.request_count || 0,
        errorCount: r.error_count || 0,
        lastUsedAt: r.last_used_at,
        cooldownUntil: existingCooldowns.get(r.id) || 0
      }));
    }
  } catch {
    // Si la table n'existe pas encore, seed initial
  }

  // S'assurer que les clés d'environnement sont toujours présentes
  seedFromEnv();
  return memoryState.keys;
}

async function getKeys(providerFilter = null) {
  await loadKeysFromDB();
  const now = Date.now();

  return memoryState.keys
    .filter(k => !providerFilter || k.provider === providerFilter)
    .map(k => ({
      id: k.id,
      provider: k.provider,
      label: k.label,
      maskedKey: maskKey(k.apiKey),
      baseUrl: k.baseUrl,
      isActive: k.isActive,
      isCoolingDown: (k.cooldownUntil || 0) > now,
      cooldownRemainingSec: Math.max(0, Math.ceil(((k.cooldownUntil || 0) - now) / 1000)),
      requestCount: k.requestCount,
      errorCount: k.errorCount,
      lastUsedAt: k.lastUsedAt
    }));
}

async function addKey({ provider, apiKey, label, baseUrl }) {
  const normProvider = String(provider || 'openrouter').toLowerCase().trim();
  const rawKey = String(apiKey || '').trim();
  const normLabel = String(label || '').trim() || `Clé ${normProvider.toUpperCase()} (${new Date().toLocaleDateString('fr-FR')})`;
  const normBaseUrl = baseUrl && typeof baseUrl === 'string' && baseUrl.trim() ? baseUrl.trim().replace(/\/+$/, '') : null;

  if (!rawKey) {
    throw new Error('La clé API est obligatoire.');
  }

  let newId = memoryState.nextId++;
  if (db && typeof db.query === 'function') {
    try {
      const res = await db.query(
        'INSERT INTO ai_api_keys (provider, api_key, label, base_url, is_active) VALUES ($1, $2, $3, $4, TRUE) RETURNING id',
        [normProvider, rawKey, normLabel, normBaseUrl]
      );
      if (res.rows && res.rows[0]) {
        newId = res.rows[0].id;
      }
    } catch (err) {
      console.warn('aiPool: Impossible d’insérer la clé en base, sauvegarde mémoire :', err.message);
    }
  }

  const keyObj = {
    id: newId,
    provider: normProvider,
    apiKey: rawKey,
    label: normLabel,
    baseUrl: normBaseUrl,
    isActive: true,
    requestCount: 0,
    errorCount: 0,
    lastUsedAt: null,
    cooldownUntil: 0
  };

  memoryState.keys.push(keyObj);
  return { id: newId, provider: normProvider, label: normLabel, maskedKey: maskKey(rawKey) };
}

async function deleteKey(id) {
  await loadKeysFromDB();
  const numId = Number(id);
  memoryState.keys = memoryState.keys.filter(k => k.id !== numId);

  if (db && typeof db.query === 'function') {
    try {
      await db.query('DELETE FROM ai_api_keys WHERE id = $1', [numId]);
    } catch {
      // Ignoré
    }
  }
  return { success: true };
}

async function toggleKey(id, forceState = null) {
  await loadKeysFromDB();
  const numId = Number(id);
  const key = memoryState.keys.find(k => k.id === numId);
  if (!key) return null;

  key.isActive = forceState !== null ? !!forceState : !key.isActive;

  if (db && typeof db.query === 'function') {
    try {
      await db.query('UPDATE ai_api_keys SET is_active = $1 WHERE id = $2', [key.isActive, numId]);
    } catch {
      // Ignoré
    }
  }
  return { id: key.id, isActive: key.isActive };
}

/**
 * Place une clé en refroidissement temporaire suite à un 429 (Rate Limit).
 */
function cooldownKey(keyId, durationMs = 45000) {
  const key = memoryState.keys.find(k => k.id === keyId);
  if (key) {
    key.cooldownUntil = Date.now() + durationMs;
    key.errorCount = (key.errorCount || 0) + 1;
  }
}

/**
 * Enregistre l'utilisation réussie d'une clé.
 */
function recordKeyUsage(keyId) {
  const key = memoryState.keys.find(k => k.id === keyId);
  if (key) {
    key.requestCount = (key.requestCount || 0) + 1;
    key.lastUsedAt = new Date().toISOString();
  }
}

/**
 * Sélectionne la prochaine clé saine du pool selon un algorithme Round-Robin.
 */
async function getHealthyKey(providerId) {
  await loadKeysFromDB();
  const now = Date.now();

  const candidates = memoryState.keys.filter(k => k.provider === providerId && k.isActive);
  if (candidates.length === 0) return null;

  // Clés actuellement prêtes (hors cooldown)
  const readyKeys = candidates.filter(k => (k.cooldownUntil || 0) <= now);

  if (readyKeys.length > 0) {
    const idx = (memoryState.rotationIndex[providerId] || 0) % readyKeys.length;
    memoryState.rotationIndex[providerId] = idx + 1;
    return readyKeys[idx];
  }

  // Si toutes les clés sont en cooldown, on choisit celle dont le cooldown expire le plus tôt
  candidates.sort((a, b) => (a.cooldownUntil || 0) - (b.cooldownUntil || 0));
  return candidates[0];
}

// ========================
// Récupération dynamique des Modèles (GET /models)
// ========================

async function fetchModels(providerId, customApiKey = null, customBaseUrl = null) {
  const def = getProviderDef(providerId);
  const baseUrl = (customBaseUrl || def.defaultBaseUrl || '').replace(/\/+$/, '');

  let key = customApiKey;
  if (!key) {
    const healthyKey = await getHealthyKey(providerId);
    key = healthyKey ? healthyKey.apiKey : '';
  }

  if (!baseUrl) {
    return def.defaultModels || [];
  }

  try {
    const headers = {
      Accept: 'application/json',
      ...def.getHeaders(key)
    };

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const res = await fetch(`${baseUrl}/models`, {
      method: 'GET',
      headers,
      signal: controller.signal
    });
    clearTimeout(timeout);

    if (!res.ok) {
      console.warn(`fetchModels: ${providerId} a renvoyé ${res.status}`);
      return def.defaultModels || [];
    }

    const data = await res.json();
    let list = [];

    // Format standard OpenAI : { data: [{ id, ... }] }
    if (data && Array.isArray(data.data)) {
      list = data.data.map(m => ({
        id: m.id,
        name: m.name || m.id
      }));
    } else if (Array.isArray(data)) {
      list = data.map(m => ({
        id: typeof m === 'string' ? m : m.id || m.name,
        name: typeof m === 'string' ? m : m.name || m.id
      }));
    } else if (data && Array.isArray(data.models)) {
      // Format Ollama natif : { models: [{ name, ... }] }
      list = data.models.map(m => ({
        id: m.name || m.model || m.id,
        name: m.name || m.model || m.id
      }));
    }

    if (list.length === 0) return def.defaultModels || [];
    // Trier alphabétiquement
    return list.sort((a, b) => String(a.id).localeCompare(String(b.id)));
  } catch (err) {
    console.warn(`fetchModels: Erreur lors de la récupération des modèles pour ${providerId} :`, err.message);
    return def.defaultModels || [];
  }
}

// ========================
// Test de Clé API
// ========================

async function testKey({ id, keyId, provider, apiKey, baseUrl } = {}) {
  let targetKey = apiKey;
  let targetProvider = provider;
  let targetBaseUrl = baseUrl;

  const targetId = id || keyId;
  if (targetId) {
    await loadKeysFromDB();
    const found = memoryState.keys.find(k => String(k.id) === String(targetId));
    if (found) {
      targetKey = found.apiKey;
      targetProvider = found.provider;
      targetBaseUrl = found.baseUrl;
    } else {
      return { ok: false, error: 'Clé introuvable dans le pool' };
    }
  }

  const def = getProviderDef(targetProvider);
  const endpoint = (targetBaseUrl || def.defaultBaseUrl || '').replace(/\/+$/, '');

  if (!targetKey || !targetKey.trim()) {
    return { ok: false, error: 'Clé API vide' };
  }

  const testModel = def.defaultModels && def.defaultModels[0] ? def.defaultModels[0].id : 'deepseek/deepseek-chat';
  const start = Date.now();

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 12000);

    const res = await fetch(`${endpoint}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...def.getHeaders(targetKey.trim())
      },
      body: JSON.stringify({
        model: testModel,
        messages: [{ role: 'user', content: 'Reponds juste "OK".' }],
        max_tokens: 5,
        temperature: 0.1
      }),
      signal: controller.signal
    });
    clearTimeout(timer);

    const latencyMs = Date.now() - start;
    if (res.ok) {
      return { ok: true, latencyMs, model: testModel };
    }

    const errText = await res.text();
    return { ok: false, httpStatus: res.status, error: errText.slice(0, 250) };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

// ========================
// Exécution d'une Requête de Chat avec Tolérance aux Pannes
// ========================

/**
 * Exécute une complétion de chat en sélectionnant une clé saine du pool
 * avec bascule automatique sur les autres clés en cas de 429 ou d'erreur.
 */
async function chatCompletion(options = {}) {
  const config = await getConfig();
  const providerId = options.provider || config.active_provider || 'openrouter';
  const def = getProviderDef(providerId);

  // Modèle selon la tâche (chat ou tuteur code)
  const providerDefaultModel = (def.defaultModels && def.defaultModels[0] && def.defaultModels[0].id) || 'deepseek/deepseek-chat';
  const defaultModelForTask = options.task === 'code-help'
    ? (config.code_model || providerDefaultModel)
    : (config.chat_model || providerDefaultModel);

  let model = options.model || defaultModelForTask;
  if (providerId === 'nvidia') {
    const isNvidiaKnown = def.defaultModels ? def.defaultModels.some(m => m.id === model) : false;
    if (!isNvidiaKnown && (model.startsWith('deepseek/') || model === 'deepseek/deepseek-chat')) {
      model = providerDefaultModel;
    }
  } else if (providerId === 'ollama') {
    if (model.includes('/') && !model.includes(':')) {
      model = providerDefaultModel;
    }
  }
  const temperature = typeof options.temperature === 'number'
    ? options.temperature
    : Number(config.temperature || 0.7);
  const maxTokens = typeof options.max_tokens === 'number'
    ? options.max_tokens
    : Number(config.max_tokens || 2048);

  await loadKeysFromDB();
  const allProviderKeys = memoryState.keys.filter(k => k.provider === providerId && k.isActive);

  if (allProviderKeys.length === 0) {
    const err = new Error(`Aucune clé API active dans le pool pour le fournisseur ${def.name}.`);
    err.status = 503;
    err.code = 'no_keys_in_pool';
    throw err;
  }

  // Essayer jusqu'à N clés différentes en cas de 429
  const maxAttempts = Math.min(allProviderKeys.length, 4);
  let lastError = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const keyObj = await getHealthyKey(providerId);
    if (!keyObj) break;

    const baseUrl = (keyObj.baseUrl || def.defaultBaseUrl || '').replace(/\/+$/, '');
    const headers = {
      'Content-Type': 'application/json',
      ...def.getHeaders(keyObj.apiKey)
    };

    const payload = {
      model,
      messages: options.messages,
      max_tokens: maxTokens,
      temperature,
      stream: !!options.stream
    };

    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), options.timeoutMs || 25000);

      const response = await fetch(`${baseUrl}/chat/completions`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      clearTimeout(timer);

      // Si Rate Limit (429), mise en quarantaine immédiate de cette clé et bascule !
      if (response.status === 429) {
        console.warn(`aiPool: Clé #${keyObj.id} (${keyObj.label}) a reçu un 429 (Rate Limit). Mise en cooldown et bascule.`);
        cooldownKey(keyObj.id, 45000);
        lastError = new Error('Rate limit atteint sur la clé');
        lastError.status = 429;
        continue;
      }

      if (!response.ok) {
        const errBody = await response.text();
        console.warn(`aiPool: Erreur HTTP ${response.status} sur clé #${keyObj.id} : ${errBody.slice(0, 200)}`);
        // Sur 502/503/504 temporaires, cooldown court
        if ([502, 503, 504].includes(response.status)) {
          cooldownKey(keyObj.id, 20000);
          continue;
        }
        const error = new Error(`Erreur API ${def.name} (${response.status}) : ${errBody.slice(0, 200)}`);
        error.status = response.status;
        throw error;
      }

      recordKeyUsage(keyObj.id);

      // Mode streaming (SSE)
      if (options.stream) {
        return {
          response,
          provider: providerId,
          keyId: keyObj.id,
          model
        };
      }

      // Mode JSON non-stream
      const data = await response.json();
      return {
        data,
        provider: providerId,
        keyId: keyObj.id,
        model
      };
    } catch (err) {
      if (err.status && err.status !== 429) throw err;
      lastError = err;
      cooldownKey(keyObj.id, 30000);
    }
  }

  // Toutes les tentatives ont échoué
  const finalError = lastError || new Error(`Toutes les clés API du pool ${def.name} sont saturées ou indisponibles.`);
  finalError.status = finalError.status || 503;
  throw finalError;
}

module.exports = {
  PROVIDERS,
  getConfig,
  updateConfig,
  getKeys,
  addKey,
  deleteKey,
  toggleKey,
  getHealthyKey,
  fetchModels,
  testKey,
  chatCompletion,
  maskKey,
  _memoryState: memoryState // Pour les tests unitaires
};
