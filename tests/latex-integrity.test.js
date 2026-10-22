'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

test('K7 — Aucune page HTML ne contient de séquence LaTeX corrompue par un échappement JS (\\t, \\b, \\f, \\r)', () => {
  const root = path.resolve(__dirname, '..');
  const pat = /\$[^$\n]*?[\t\x08\x0c\r][^$\n]*?\$/;
  const bad = [];
  function walk(dir) {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      if (['node_modules', '.git', 'dist', 'audit'].includes(ent.name)) continue;
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) walk(full);
      else if (ent.name.endsWith('.html')) {
        const s = fs.readFileSync(full, 'utf8');
        if (pat.test(s)) bad.push(path.relative(root, full));
      }
    }
  }
  walk(root);
  assert.deepEqual(bad, []);
});
