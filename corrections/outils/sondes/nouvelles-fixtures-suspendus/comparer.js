'use strict';

const fs = require('node:fs');
const assert = require('node:assert/strict');
const { createHash } = require('node:crypto');
const { normalizeOutput } = require('/project/server/services/execution');

function normalized(course, value, id) {
  if (id === 'gh3-c1-e2') return value.replace(/\r\n/g, '\n');
  if (course === 'docker') return normalizeOutput(value);
  if (course === 'csharp') return value.replace(/\r\n?/g, '\n').replace(/\n+$/, '');
  if (course === 'b3-linux' || course === 'b3-github') return value.replace(/\r\n/g, '\n').replace(/\n+$/, '');
  throw new Error(`Cours inconnu : ${course}`);
}

function sha(value) {
  return createHash('sha256').update(value).digest('hex');
}

function expectedForTest(course, value, id) {
  return course === 'b3-linux' || course === 'b3-github' ? value : normalized(course, value, id);
}

assert.equal(normalized('docker', ' A  \r\n\n'), ' A');
assert.equal(normalized('csharp', ' A  \r\n\n'), ' A  ');
assert.equal(normalized('b3-linux', ' A  \r\n\n'), ' A  ');
assert.equal(normalized('b3-github', ' A  \r\n\n'), ' A  ');
assert.equal(expectedForTest('b3-linux', ' A  \r\n\n'), ' A  \r\n\n');
assert.equal(expectedForTest('b3-github', ' A  \r\n\n'), ' A  \r\n\n');
assert.equal(normalized('b3-github', 'ligne\n', 'gh3-c1-e2'), 'ligne\n');
assert.notEqual(normalized('b3-github', 'ligne', 'gh3-c1-e2'), 'ligne\n');
const data = JSON.parse(fs.readFileSync(0, 'utf8'));
const states = data.rows.map(row => {
  if (typeof row.id !== 'string' || typeof row.stdout !== 'string' || typeof row.expected !== 'string') {
    throw new Error('Ligne invalide');
  }
  const actual = normalized(row.course, row.stdout, row.id);
  const expected = expectedForTest(row.course, row.expected, row.id);
  return { id: row.id, etat: actual === expected ? 'conforme' : 'sortie_incorrecte',
    sortie_normalisee_sha256: sha(actual), attendu_comparaison_sha256: sha(expected) };
});
process.stdout.write(JSON.stringify({ selftests: 'reussis', states }));
