'use strict';

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function extractFn(html, fnName) {
  const re = new RegExp(`function\\s+${fnName}\\s*\\([^)]*\\)\\s*\\{[\\s\\S]*?\\n\\s{6}\\}`);
  const match = html.match(re);
  return match ? match[0] : null;
}

describe('Tâche 1.6 : Protection Open Redirect et encodage HTML complet (login.html & account.html)', () => {
  for (const relPath of ['public/login.html', 'public/account.html']) {
    test(`${relPath} : safeRedirect bloque URL externes/schemaless et esc() encode toutes les entités HTML`, () => {
      const html = fs.readFileSync(path.join(__dirname, '..', relPath), 'utf8');
      const safeRedirectSrc = extractFn(html, 'safeRedirect');
      const escSrc = extractFn(html, 'esc');

      assert.ok(safeRedirectSrc, `${relPath} doit définir function safeRedirect(raw)`);
      assert.ok(escSrc, `${relPath} doit définir function esc(s)`);

      const context = {
        window: { location: { origin: 'https://revi-mu.vercel.app' } },
        URL
      };
      vm.runInNewContext(`${safeRedirectSrc}\n${escSrc}\nglobalThis.__exports = { safeRedirect, esc };`, context);
      const { safeRedirect, esc } = context.__exports;

      // Open redirect vectors -> tous ramenés à '/'
      assert.strictEqual(safeRedirect('https://evil.example/steal'), '/');
      assert.strictEqual(safeRedirect('http://evil.example'), '/');
      assert.strictEqual(safeRedirect('//evil.example/phish'), '/');
      assert.strictEqual(safeRedirect('/\\evil.example'), '/');
      assert.strictEqual(safeRedirect('javascript:alert(1)'), '/');
      assert.strictEqual(safeRedirect('data:text/html,<script>alert(1)</script>'), '/');
      assert.strictEqual(safeRedirect(''), '/');

      // Chemins internes valides préservés
      assert.strictEqual(safeRedirect('/b1-python/chapitres/chapitre2.html'), '/b1-python/chapitres/chapitre2.html');
      assert.strictEqual(safeRedirect('/_auth/account.html?payment=required'), '/_auth/account.html?payment=required');

      // esc() encode sans détruire les caractères
      assert.strictEqual(esc('a"b\'c<d>&e'), 'a&quot;b&#39;c&lt;d&gt;&amp;e');
    });
  }

  test('public/login.html : goBack() et redirection vers account passent par safeRedirect()', () => {
    const html = fs.readFileSync(path.join(__dirname, '..', 'public/login.html'), 'utf8');
    assert.match(html, /var\s+redirect\s*=\s*safeRedirect\(/);
    assert.match(html, /function\s+goBack\([\s\S]*?safeRedirect\(/);
  });
});
