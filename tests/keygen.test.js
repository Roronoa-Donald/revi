/**
 * tests/keygen.test.js — format, entropie et unicité des clés d'activation
 */
const { test } = require('node:test');
const assert = require('node:assert');
const { generateActivationKey, generateJti, hashFingerprint } = require('../server/utils/keygen');

test('format XXXX-XXXX avec alphabet non ambigu', () => {
  for (let i = 0; i < 500; i++) {
    const k = generateActivationKey();
    assert.match(k, /^[A-HJ-NP-Z2-9]{4}-[A-HJ-NP-Z2-9]{4}$/, `clé invalide: ${k}`);
    assert.ok(!/[0O1Il]/.test(k), `caractère ambigu dans ${k}`);
  }
});

test('unicité statistique sur 5000 générations', () => {
  const set = new Set();
  for (let i = 0; i < 5000; i++) set.add(generateActivationKey());
  assert.ok(set.size > 4990, `trop de collisions: ${5000 - set.size}`);
});

test('distribution des caractères sans biais évident (ex-position 1)', () => {
  const counts = {};
  for (let i = 0; i < 3200; i++) {
    const c = generateActivationKey()[0];
    counts[c] = (counts[c] || 0) + 1;
  }
  const values = Object.values(counts);
  const max = Math.max(...values);
  const min = Math.min(...values);
  // 32 caractères × 3200 tirages = ~100 attendu par caractère ; tolérance large
  assert.ok(max / min < 2.2, `distribution suspecte (max/min=${(max / min).toFixed(2)}) — l'ancien biais timestamp/modulo est-il revenu ?`);
});

test('jti : 64 hex aléatoires, uniques', () => {
  const a = generateJti();
  const b = generateJti();
  assert.match(a, /^[0-9a-f]{64}$/);
  assert.notStrictEqual(a, b);
});

test('hashFingerprint : sha256 hex stable', () => {
  assert.strictEqual(hashFingerprint('abc'), hashFingerprint('abc'));
  assert.strictEqual(hashFingerprint('abc'), require('node:crypto').createHash('sha256').update('abc').digest('hex'));
});
