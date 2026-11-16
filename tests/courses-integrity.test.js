'use strict';

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { COURSES, COURSE_DIRS } = require('../server/courses');

const ROOT = path.resolve(__dirname, '..');
const CYRILLIC_RE = /[\u0400-\u04FF]/;

function walkHtml(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'dist') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkHtml(full, out);
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

describe('Cohérence globale des cours, sitemap et liens internes', () => {
  it('Aucun cours dans COURSES ou sitemap.xml ne reste en statut archived: true', () => {
    const archived = COURSE_DIRS.filter((id) => COURSES[id].archived);
    assert.deepEqual(archived, [], `Cours archivés résiduels : ${archived.join(', ')}`);

    const sitemap = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
    const urls = [...sitemap.matchAll(/<loc>https:\/\/revi-mu\.vercel\.app\/([^<]*)<\/loc>/g)].map((m) => m[1]);
    const missing = [];
    for (const rel of urls) {
      if (!rel) continue;
      const decoded = decodeURIComponent(rel.split('#')[0].split('?')[0]);
      if (!fs.existsSync(path.join(ROOT, decoded))) missing.push(rel);
    }
    assert.deepEqual(missing, [], `Entrées sitemap.xml introuvables : ${missing.join(', ')}`);
  });

  it('Aucune page HTML active ne contient de caractère cyrillique parasite', () => {
    const hits = [];
    for (const dir of [...COURSE_DIRS, 'public']) {
      for (const file of walkHtml(path.join(ROOT, dir))) {
        const html = fs.readFileSync(file, 'utf8');
        if (CYRILLIC_RE.test(html)) hits.push(path.relative(ROOT, file));
      }
    }
    assert.deepEqual(hits, [], `Caractères cyrilliques détectés dans : ${hits.join(', ')}`);
  });

  it('Tous les liens internes <a href> de index.html et des cours actifs se résolvent sur disque', () => {
    const broken = [];
    const htmlFiles = [path.join(ROOT, 'index.html')];
    for (const dir of COURSE_DIRS) {
      htmlFiles.push(...walkHtml(path.join(ROOT, dir)));
    }
    for (const file of htmlFiles) {
      const html = fs.readFileSync(file, 'utf8').replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
      const dirName = path.dirname(file);
      for (const m of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/gi)) {
        const rawHref = m[1];
        if (!rawHref || rawHref.startsWith('#') || /^(https?:|mailto:|tel:|javascript:)/i.test(rawHref)) continue;
        const clean = decodeURIComponent(rawHref.split('#')[0].split('?')[0]);
        if (!clean || clean === '/' || clean.startsWith('/_auth/')) continue;
        const target = clean.startsWith('/')
          ? path.join(ROOT, clean.slice(1))
          : path.resolve(dirName, clean);
        if (!fs.existsSync(target)) {
          broken.push(`${path.relative(ROOT, file)} -> ${rawHref}`);
        }
      }
    }
    assert.deepEqual(broken, [], `Liens internes cassés (${broken.length}) :\n${broken.slice(0, 30).join('\n')}`);
  });
});
