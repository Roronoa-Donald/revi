const test = require('node:test');
const assert = require('node:assert/strict');
const aiPool = require('../server/services/ai-pool');
const { PROVIDERS, getProviderDef } = require('../server/services/ai-pool/providers');

test('ai-pool: configuration des fournisseurs', () => {
  assert.ok(PROVIDERS.openrouter, 'Fournisseur openrouter présent');
  assert.ok(PROVIDERS.nvidia, 'Fournisseur nvidia présent');
  assert.ok(PROVIDERS.ollama, 'Fournisseur ollama présent');
  assert.ok(PROVIDERS.custom, 'Fournisseur custom présent');

  const openrouterDef = getProviderDef('openrouter');
  assert.strictEqual(openrouterDef.id, 'openrouter');
  assert.ok(openrouterDef.defaultBaseUrl.includes('openrouter.ai'));

  const nvidiaDef = getProviderDef('nvidia');
  assert.strictEqual(nvidiaDef.id, 'nvidia');
  assert.ok(nvidiaDef.defaultBaseUrl.includes('nvidia.com'));

  const ollamaDef = getProviderDef('ollama');
  assert.strictEqual(ollamaDef.id, 'ollama');
});

test('ai-pool: masquage de clé API', () => {
  assert.strictEqual(aiPool.maskKey(''), '');
  assert.strictEqual(aiPool.maskKey(null), '');
  assert.strictEqual(aiPool.maskKey('1234'), '****');
  assert.strictEqual(aiPool.maskKey('sk-or-v1-abcdef1234567890'), 'sk-or-...7890');
  assert.strictEqual(aiPool.maskKey('nvapi-mytestsecretkey9999'), 'nvapi-...9999');
});

test('ai-pool: gestion du pool en mémoire (ajout, toggle, suppression)', async () => {
  // Ajout de clés
  const k1 = await aiPool.addKey({
    provider: 'nvidia',
    apiKey: 'nvapi-test-key-alpha-1234',
    label: 'Clé NVIDIA Alpha'
  });
  assert.ok(k1.id, 'La clé a un identifiant généré');
  assert.strictEqual(k1.provider, 'nvidia');
  assert.strictEqual(k1.maskedKey, 'nvapi-...1234');

  const k2 = await aiPool.addKey({
    provider: 'nvidia',
    apiKey: 'nvapi-test-key-beta-5678',
    label: 'Clé NVIDIA Beta'
  });

  const keys = await aiPool.getKeys('nvidia');
  const foundK1 = keys.find(k => k.id === k1.id);
  assert.ok(foundK1, 'Clé K1 trouvée dans le pool NVIDIA');
  assert.strictEqual(foundK1.isActive, true);

  // Toggle désactivation
  await aiPool.toggleKey(k1.id, false);
  const keysAfterToggle = await aiPool.getKeys('nvidia');
  const foundK1Toggled = keysAfterToggle.find(k => k.id === k1.id);
  assert.strictEqual(foundK1Toggled.isActive, false);

  // Toggle réactivation
  await aiPool.toggleKey(k1.id, true);
  const keysAfterReactivate = await aiPool.getKeys('nvidia');
  assert.strictEqual(keysAfterReactivate.find(k => k.id === k1.id).isActive, true);

  // Suppression
  await aiPool.deleteKey(k1.id);
  await aiPool.deleteKey(k2.id);
  const keysAfterDelete = await aiPool.getKeys('nvidia');
  assert.ok(!keysAfterDelete.some(k => k.id === k1.id || k.id === k2.id));
});

test('ai-pool: rotation round-robin et évitement des clés en cooldown', async () => {
  // Ajouter 2 clés de test pour openrouter
  const kA = await aiPool.addKey({
    provider: 'openrouter',
    apiKey: 'sk-or-v1-pool-key-aaaa',
    label: 'Clé A'
  });
  const kB = await aiPool.addKey({
    provider: 'openrouter',
    apiKey: 'sk-or-v1-pool-key-bbbb',
    label: 'Clé B'
  });

  const key1 = await aiPool.getHealthyKey('openrouter');
  const key2 = await aiPool.getHealthyKey('openrouter');
  assert.ok(key1 && key2, 'Les deux requêtes obtiennent une clé saine');

  // Mettre kA en quarantaine (cooldown simulé)
  const memA = aiPool._memoryState.keys.find(k => k.id === kA.id);
  memA.cooldownUntil = Date.now() + 60000;

  // Maintenant, getHealthyKey ne doit jamais renvoyer kA
  for (let i = 0; i < 5; i++) {
    const selected = await aiPool.getHealthyKey('openrouter');
    assert.notStrictEqual(selected.id, kA.id, 'La clé kA en cooldown est ignorée');
  }

  // Nettoyage
  await aiPool.deleteKey(kA.id);
  await aiPool.deleteKey(kB.id);
});

test('ai-pool: mise à jour de la configuration globale', async () => {
  const updated = await aiPool.updateConfig({
    active_provider: 'nvidia',
    chat_model: 'meta/llama-3.3-70b-instruct',
    code_model: 'deepseek-ai/deepseek-r1'
  });

  assert.strictEqual(updated.active_provider, 'nvidia');
  assert.strictEqual(updated.chat_model, 'meta/llama-3.3-70b-instruct');
  assert.strictEqual(updated.code_model, 'deepseek-ai/deepseek-r1');

  const config = await aiPool.getConfig();
  assert.strictEqual(config.active_provider, 'nvidia');
  assert.strictEqual(config.code_model, 'deepseek-ai/deepseek-r1');

  // Rétablir openrouter par défaut
  await aiPool.updateConfig({
    active_provider: 'openrouter',
    chat_model: 'deepseek/deepseek-chat',
    code_model: 'deepseek/deepseek-chat'
  });
});
