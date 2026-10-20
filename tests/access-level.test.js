/**
 * tests/access-level.test.js — règle d'accès hiérarchique B1 ⊂ B2 ⊂ B3.
 * Vérifie canAccessCourse / coursesForLevel / normalizeLevel sur la matrice complète.
 */
const { test } = require('node:test');
const assert = require('node:assert');
const {
  COURSE_DIRS,
  LEVELS,
  normalizeLevel,
  canAccessCourse,
  coursesForLevel,
  getCourseLevel
} = require('../server/middleware/access-control');

test('normalizeLevel : stricte, défaut null', () => {
  assert.strictEqual(normalizeLevel('b1'), 'b1');
  assert.strictEqual(normalizeLevel('B2'), 'b2');
  assert.strictEqual(normalizeLevel(' b3 '), 'b3');
  assert.strictEqual(normalizeLevel('b4'), null);
  assert.strictEqual(normalizeLevel(''), null);
  assert.strictEqual(normalizeLevel(undefined), null);
  assert.strictEqual(normalizeLevel(null), null);
});

test('B1 : accès aux cours B1 uniquement', () => {
  for (const id of COURSE_DIRS) {
    const expected = getCourseLevel(id) === 'b1';
    assert.strictEqual(canAccessCourse('b1', id), expected, `b1 → ${id} (${getCourseLevel(id)})`);
  }
});

test('B2 : accès aux cours B1 et B2, jamais B3', () => {
  for (const id of COURSE_DIRS) {
    const lvl = getCourseLevel(id);
    const expected = lvl === 'b1' || lvl === 'b2';
    assert.strictEqual(canAccessCourse('b2', id), expected, `b2 → ${id} (${lvl})`);
  }
});

test('B3 : accès à tous les cours', () => {
  for (const id of COURSE_DIRS) {
    assert.strictEqual(canAccessCourse('b3', id), true, `b3 → ${id}`);
  }
});

test('fail-closed : niveau ou cours inconnu → refus', () => {
  assert.strictEqual(canAccessCourse('b4', 'linux'), false);
  assert.strictEqual(canAccessCourse(null, 'linux'), false);
  assert.strictEqual(canAccessCourse('b1', 'cours-inexistant'), false);
});

test('coursesForLevel : tailles croissantes B1 < B2 < B3', () => {
  const b1 = coursesForLevel('b1');
  const b2 = coursesForLevel('b2');
  const b3 = coursesForLevel('b3');
  assert.strictEqual(b1.length, 24);
  assert.strictEqual(b2.length, 48);
  assert.strictEqual(b3.length, COURSE_DIRS.length);
  assert.ok(b1.every((id) => b2.includes(id)), 'B1 ⊂ B2');
  assert.ok(b2.every((id) => b3.includes(id)), 'B2 ⊂ B3');
  assert.deepStrictEqual(coursesForLevel('b4'), [], 'niveau invalide → aucun cours');
});

test('niveaux connus cohérents', () => {
  assert.deepStrictEqual(LEVELS, ['b1', 'b2', 'b3']);
});
