'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { COURSE_DIRS } = require('../server/courses');
const languages = require('../server/services/execution/languages');
const { buildApp } = require('../server/app');
const kit = require('../scripts/course-kit');

const ROOT = path.resolve(__dirname, '..');

test('languages : listLanguages et GET /api/execute/languages n exposent jamais analyse', async () => {
  const list = languages.listLanguages();
  assert.equal(list.some((l) => l.id === 'analyse'), false, 'analyse ne doit pas être dans listLanguages()');
  assert.ok(languages.getLanguage('analyse'), 'getLanguage("analyse") doit rester résolvable en interne');

  const app = buildApp({ logger: false });
  const res = await app.inject({ method: 'GET', url: '/api/execute/languages?exerciseId=py-c1-e1' });
  await app.close();
  assert.equal(res.statusCode, 200);
  const body = res.json();
  assert.equal(body.languages.some((l) => l.id === 'analyse'), false, '/api/execute/languages ne doit pas exposer analyse');
});

test('code-lab.js : setEditorLanguage synchronise les contrôles UI lors d un changement de mode', () => {
  const src = fs.readFileSync(path.join(ROOT, 'assets/js/code-lab.js'), 'utf8');
  const m = src.match(/Lab\.prototype\.setEditorLanguage\s*=\s*function\s*\([^)]*\)\s*\{[\s\S]*?\n  \};/);
  assert.ok(m, 'setEditorLanguage introuvable dans code-lab.js');
  const fn = m[0];
  assert.match(fn, /stdinBlock/, 'setEditorLanguage doit synchroniser stdinBlock');
  assert.match(fn, /consoleEl/, 'setEditorLanguage doit synchroniser consoleEl');
});

test('ateliers : starters et textes cohérents avec data-language (aucun mélange C#/SQL/Bash/Analyse/Python)', () => {
  const issues = [];
  for (const dir of COURSE_DIRS) {
    const file = path.join(ROOT, dir, 'atelier.html');
    if (!fs.existsSync(file)) continue;
    const html = fs.readFileSync(file, 'utf8');
    const labMatch = html.match(/<div\s+class="lab"[^>]*data-language="([^"]+)"[^>]*>[\s\S]*?<script[^>]*data-lab-starter[^>]*>([\s\S]*?)<\/script>/i);
    if (!labMatch) continue;
    const lang = labMatch[1].toLowerCase();
    const starter = labMatch[2];

    if (lang !== 'analyse') {
      if (/A_COMPLETER|\[Cas\s+\d+|Grille d[’']analyse/i.test(starter)) {
        issues.push(`${dir}/atelier.html (${lang}) contient un modèle analyse (${starter.trim().slice(0, 60)})`);
      }
      if (lang !== 'python' && /\bprint\s*\(/.test(starter)) {
        issues.push(`${dir}/atelier.html (${lang}) contient un print(...) Python dans le starter`);
      }
      if (lang === 'csharp' && !/\bstatic\s+void\s+Main\b/.test(starter)) {
        issues.push(`${dir}/atelier.html (csharp) doit contenir un point d’entrée C# Main()`);
      }
      if (lang === 'sql' && !/\bSELECT\b/i.test(starter)) {
        issues.push(`${dir}/atelier.html (sql) doit contenir une requête SQL SELECT`);
      }
      if (/interpréteur Python|code Python/i.test(html) && lang !== 'python' && lang !== 'algo') {
        issues.push(`${dir}/atelier.html (${lang}) mentionne à tort Python dans ses explications`);
      }
    } else {
      if (/\bprint\s*\(/.test(starter)) {
        issues.push(`${dir}/atelier.html (analyse) contient un print(...) Python dans le starter`);
      }
      if (/\\n|\\'/.test(starter)) {
        issues.push(`${dir}/atelier.html (analyse) contient des séquences d’échappement littérales \\n ou \\'`);
      }
      if (/interpréteur Python|code Python/i.test(html)) {
        issues.push(`${dir}/atelier.html (analyse) mentionne l’interpréteur Python`);
      }
    }
  }
  assert.deepEqual(issues, [], `Incohérences d’ateliers :\n${issues.join('\n')}`);
});

test('course-kit : rendu des balises HTML sémantiques <table> via richHtml et filtrage XSS', () => {
  const input = '<table class="data-table"><caption>Synthèse</caption><thead><tr><th scope="col">Col</th></tr></thead><tbody><tr><td colspan="2" rowspan="1">Val</td></tr></tbody><tfoot><tr><td>Tot</td></tr></tfoot></table>';
  const rendered = kit.richHtml(input);
  assert.equal(rendered, input, 'Les balises <table> sémantiques ne doivent pas être échappées par richHtml');
  const dirty = kit.richHtml('<table onclick="alert(1)"><tr><td>X</td></tr></table><script>x</script>');
  assert.equal(dirty.includes('<script>'), false, '<script> doit rester échappé');
  assert.equal(dirty.includes('<table'), false, '<table> avec onclick non autorisé doit rester échappé');
});
