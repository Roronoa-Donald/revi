'use strict';

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { COURSE_DIRS } = require('../server/courses');

const ROOT = path.resolve(__dirname, '..');

function walkHtml(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.git') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkHtml(full, out);
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

describe('Intégrité KaTeX sur toutes les pages HTML (source & dist)', () => {
  it('Aucun délimiteur KaTeX corrompu (724278) dans les sources HTML ni dans dist/', () => {
    const bad = [];
    for (const base of [...COURSE_DIRS, 'dist']) {
      for (const file of walkHtml(path.join(ROOT, base))) {
        const html = fs.readFileSync(file, 'utf8');
        if (html.includes('724278')) bad.push(path.relative(ROOT, file));
      }
    }
    assert.deepEqual(bad, [], `Délimiteurs 724278 détectés dans ${bad.length} fichier(s) :\n${bad.join('\n')}`);
  });
});
