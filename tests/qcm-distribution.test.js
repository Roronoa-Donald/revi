'use strict';

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const HANDWRITTEN_B1 = ['b1-c-cpp', 'b1-python', 'b1-php', 'b1-algo'];

function extractCourseQcmIndices(courseDir) {
  const chapDir = path.join(ROOT, courseDir, 'chapitres');
  const counts = [0, 0, 0, 0];
  let maxArity = 0;
  let total = 0;

  for (const name of fs.readdirSync(chapDir).sort()) {
    if (!/^chapitre\d+\.html$/.test(name)) continue;
    const html = fs.readFileSync(path.join(chapDir, name), 'utf8');
    const questions = [...html.matchAll(/<div class="q"[\s\S]*?(?=<div class="q"|<button[^>]*submitQcm|<div class="qcm__foot"|<\/div>\s*<\/section>)/g)];
    for (const m of questions) {
      const opts = [...m[0].matchAll(/<button\b[^>]*class="[^"]*\bopt\b[^"]*"[^>]*>/g)];
      if (opts.length !== 3 && opts.length !== 4) continue;
      if (opts.length > maxArity) maxArity = opts.length;
      const correctIdx = opts.findIndex((o) => /data-correct="1"/.test(o[0]));
      if (correctIdx >= 0 && correctIdx < opts.length) {
        counts[correctIdx]++;
        total++;
      }
    }
  }
  return { counts, maxArity, total };
}

describe('Distribution équilibrée des QCM (cours B1 autonomes + absence data-correct en examen)', () => {
  for (const course of HANDWRITTEN_B1) {
    it(`${course} : aucune option A/B/C/D ne dépasse 45 % des bonnes réponses (et >= 10 % chacune)`, () => {
      const { counts, maxArity, total } = extractCourseQcmIndices(course);
      assert.ok(total >= 30, `${course} : trop peu de questions QCM extraites (${total})`);
      assert.ok(maxArity === 3 || maxArity === 4, `${course} : arité inattendue (${maxArity})`);
      for (let i = 0; i < maxArity; i++) {
        const ratio = counts[i] / total;
        assert.ok(
          ratio <= 0.45 && ratio >= 0.15,
          `${course} : déséquilibre QCM [A=${counts[0]}, B=${counts[1]}, C=${counts[2]}, D=${counts[3]}] sur ${total} (indice ${i} = ${(ratio * 100).toFixed(1)} %)`
        );
      }
    });
  }

  it('Aucune page simulateur-examen.html ne doit embarquer data-correct="1" dans le DOM client', () => {
    const leaks = [];
    for (const entry of fs.readdirSync(ROOT, { withFileTypes: true })) {
      if (!entry.isDirectory() || entry.name === 'node_modules' || entry.name === 'dist') continue;
      for (const rel of ['examens/simulateur-examen.html', 'chapitres/simulateur-examen.html', 'simulateur-examen.html']) {
        const full = path.join(ROOT, entry.name, rel);
        if (!fs.existsSync(full)) continue;
        const html = fs.readFileSync(full, 'utf8');
        if (html.includes('data-correct="1"')) leaks.push(`${entry.name}/${rel}`);
      }
    }
    assert.deepEqual(leaks, [], `data-correct="1" exposé côté client dans : ${leaks.join(', ')}`);
  });
});
