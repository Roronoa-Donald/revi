'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

test('server/migrations : Validation syntaxique, ordre et idempotence des scripts SQL', () => {
  const migrationsDir = path.resolve(__dirname, '..', 'server', 'migrations');
  assert.ok(fs.existsSync(migrationsDir), 'Le dossier server/migrations doit exister');

  const files = fs.readdirSync(migrationsDir).filter(f => f.endsWith('.sql')).sort();
  assert.ok(files.length >= 5, 'Au moins 5 migrations attendues');

  // 1. Ordre séquentiel strict (001_, 002_, ...)
  files.forEach((file, index) => {
    const expectedPrefix = String(index + 1).padStart(3, '0');
    assert.ok(file.startsWith(expectedPrefix), `La migration ${file} doit commencer par ${expectedPrefix}`);
  });

  // 2. Vérification syntaxique et clauses d'idempotence
  for (const file of files) {
    const filePath = path.join(migrationsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');

    // Vérification de la non-vacuité
    assert.ok(content.trim().length > 10, `${file} ne doit pas être vide`);

    // Contrôle d'équilibre des parenthèses
    let openParens = 0;
    for (const char of content) {
      if (char === '(') openParens++;
      else if (char === ')') openParens--;
      assert.ok(openParens >= 0, `${file} : parenthèse fermante orpheline`);
    }
    assert.equal(openParens, 0, `${file} : parenthèses non équilibrées`);

    // Pour les créations de tables et d'index, vérification d'idempotence
    const createTableStatements = content.match(/CREATE\s+TABLE\s+([^;\n]+)/gi) || [];
    for (const stmt of createTableStatements) {
      assert.match(stmt, /IF\s+NOT\s+EXISTS/i, `${file} : La création de table doit être idempotente (IF NOT EXISTS)`);
    }

    const createIndexStatements = content.match(/CREATE\s+(?:UNIQUE\s+)?INDEX\s+([^;\n]+)/gi) || [];
    for (const stmt of createIndexStatements) {
      assert.match(stmt, /IF\s+NOT\s+EXISTS/i, `${file} : La création d'index doit être idempotente (IF NOT EXISTS)`);
    }
  }
});
