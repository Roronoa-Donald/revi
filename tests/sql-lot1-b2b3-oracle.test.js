'use strict';

if (require('./lot1-sandbox').runInsideIsolatedOrRegister(__filename)) {

const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const path = require('node:path');
const test = require('node:test');
const catalogue = require('../server/exercises');
const engine = require('../assets/js/engines/sql-wasm-engine');

test('huit témoins SQL non publics concordent avec deux modèles indépendants', () => {
  const script = path.resolve(__dirname, '../corrections/outils/sondes/sql-variantes/temoins_visibilite.py');
  const result = spawnSync('/usr/bin/python3', ['-I', '-B', script], {
    encoding: 'utf8', timeout: 30000, maxBuffer: 4 * 1024 * 1024,
    env: { PATH: '/usr/bin:/bin', LANG: 'C.UTF-8', REVI_AUDIT_NET_NS_HOTE: process.env.REVI_AUDIT_NET_NS_HOTE }
  });
  assert.equal(result.status, 0, result.stderr);
  const report = JSON.parse(result.stdout);
  assert.equal(report.cas.length, 8);
  for (const item of report.cas) {
    const exercise = catalogue.getExercise(item.id);
    assert.ok(exercise, item.id);
    const samples = exercise.tests.filter(candidate => candidate.label === item.label);
    assert.equal(samples.length, 1, item.id);
    assert.equal(samples[0].stdin, item.stdin, item.id);
    const messages = item.instruction_changes.map(count =>
      `Instruction exécutée avec succès (${count} ${count === 1 ? 'ligne modifiée' : 'lignes modifiées'}).`);
    messages.push(item.rows.length ? engine.formatAsciiTable(item.columns, item.rows).trimEnd() :
      '(Requête exécutée avec 0 résultat)');
    assert.equal(samples[0].expected, messages.join('\n\n'), item.id);
  }
});

}
