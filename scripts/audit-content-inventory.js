#!/usr/bin/env node
/**
 * Inventaire mécanique du contenu — audit A→Z des cours.
 * Sortie : audit/inventaire-pages.json + audit/inventaire-pages.md
 *
 * Aucune dépendance externe. Lecture seule sur les fichiers du projet.
 *
 * Usage : node scripts/audit-content-inventory.js
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'audit');

// Cours HTML servis (liste canonique access-control.js) + b1 (portail B1)
const COURSE_DIRS = [
  'linux', 'php', 'probabilites', 'rd_java', 'rd_winserver', 'admin-vm',
  'droit', 'react', 'api-rest-flask', 'erp-si', 'ingenierie-besoin',
  'masterclass-apprendre', 'RD-RO', 'assembleur', 'Cyber securite B2',
  'sql', 'csharp', 'ccna', 'uml', 'uiux', 'docker', 'infographie',
  'preparation-web', 'epreuves', 'b1',
];

// Dossiers de matière source (PDF/PPTX/DOCX/...) à inventorier séparément
const SOURCE_DIRS = ['COURS_B3', 'cours B1 IT'];
// Legacy / hors canonique (contexte)
const LEGACY_DIRS = ['droitb2', 'administration machine virtuel', 'cours windows', 'roadmap'];

const SHELL_MARKERS = [
  'contenu original est conserv',
  "cette page sert d'entrée en matière",
  'cette page sert d’entrée en matière',
  'ce chapitre couvre',
  'contenu à venir',
  'à venir',
  'coming soon',
  'lorem ipsum',
];

function walk(dir, out) {
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return out; }
  for (const e of entries) {
    if (e.name === 'node_modules' || e.name === '.git' || e.name === 'dist') continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.isFile()) out.push(p);
  }
  return out;
}

function stripNoise(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ');
}

function textOf(html) {
  const body = html.replace(/[\s\S]*?<body[^>]*>/i, ' ');
  const t = stripNoise(body)
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return t;
}

function countMatches(str, re) { const m = str.match(re); return m ? m.length : 0; }

function classify(rel) {
  const base = path.basename(rel);
  const dir = path.dirname(rel);
  if (base === 'index.html') return 'index';
  if (base === 'sommaire.html') return 'sommaire';
  if (/^chapitre-?\d+\.html$/.test(base)) return 'chapitre';
  if (dir.split(path.sep).includes('chapitres') && /^chapitre-?\d+/.test(base)) return 'chapitre';
  if (dir.split(path.sep).includes('modules') && /^mod\d+/.test(base)) return 'chapitre';
  if (/^(cours-complet|rappels.*)\.html$/.test(base)) return 'chapitre';
  if (dir.split(path.sep).includes('chapitres')) return 'chapitre-annexe';
  if (/^exercice-?\d*\.html$/.test(base)) return 'exercice';
  if (/qcm/i.test(base)) return 'qcm';
  if (/simulateur|examen/i.test(base)) return 'examen';
  if (/formules|fiche-memo|cartes|cheatsheet/i.test(base)) return 'memo';
  if (/tp\d/.test(base)) return 'tp';
  if (/404|robots|sitemap/i.test(base)) return 'technique';
  return 'autre';
}

function analyzeFile(abs, rel) {
  const html = fs.readFileSync(abs, 'utf8');
  const text = textOf(html);
  const titleM = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const metaRefresh = /http-equiv=["']refresh["']/i.test(html);
  const lower = text.toLowerCase();
  const shellHits = SHELL_MARKERS.filter((m) => lower.includes(m.toLowerCase()));
  const scriptBytes = (html.match(/<script[\s\S]*?<\/script>/gi) || []).join('').length;
  const styleBytes = (html.match(/<style[\s\S]*?<\/style>/gi) || []).join('').length;

  return {
    rel,
    bytes: Buffer.byteLength(html),
    lines: html.split('\n').length,
    kind: classify(rel),
    title: titleM ? titleM[1].replace(/\s+/g, ' ').trim() : '',
    metaRefresh,
    words: text ? text.split(' ').length : 0,
    textLen: text.length,
    h1: countMatches(html, /<h1[\s>]/gi),
    h2: countMatches(html, /<h2[\s>]/gi),
    h3: countMatches(html, /<h3[\s>]/gi),
    pre: countMatches(html, /<pre[\s>]/gi),
    code: countMatches(html, /<code[\s>]/gi),
    img: countMatches(html, /<img[\s>]/gi),
    svg: countMatches(html, /<svg[\s>]/gi),
    table: countMatches(html, /<table[\s>]/gi),
    scripts: countMatches(html, /<script[\s>]/gi),
    inlineScriptBytes: scriptBytes,
    inlineStyleBytes: styleBytes,
    shell: shellHits.length > 0,
    shellHits,
    cdn: ['cdn.jsdelivr', 'cdnjs.cloudflare', 'unpkg.com', 'cdn.tailwindcss', 'fonts.googleapis']
      .filter((h) => html.includes(h)),
    hasQcm: /data-correct|quiz|qcm|correct/i.test(html),
    // Signaux de profondeur pédagogique
    boxes: countMatches(html, /class="[^"]*(info-box|success-box|warning-box|danger-box|memo-box|note-box|analogy-box|definition-box)[^"]*"/gi),
    quizCards: countMatches(html, /class="quiz-card"/gi),
    mnemo: countMatches(html, /mn[ée]motechn|astuce|retiens|memo rapide|pense [àa]/gi),
    traps: countMatches(html, /pi[èe]ge|erreur classique|attention|confusion|\bKO\b/gi),
    examples: countMatches(html, /class="(code-block|example|demo)[^"]*"/gi),
    anchors: countMatches(html, /<a [^>]*href="#/gi),
  };
}

function dirSizeFiles(dir) {
  const files = walk(path.join(ROOT, dir), []);
  const byExt = {};
  let bytes = 0;
  for (const f of files) {
    const ext = path.extname(f).toLowerCase() || '(none)';
    byExt[ext] = (byExt[ext] || 0) + 1;
    try { bytes += fs.statSync(f).size; } catch { /* ignore */ }
  }
  return { count: files.length, bytes, byExt };
}

// ── Exécution ──────────────────────────────────────────────────────────────
const pages = [];
const courses = {};

for (const dir of COURSE_DIRS) {
  const abs = path.join(ROOT, dir);
  if (!fs.existsSync(abs)) { courses[dir] = { missing: true }; continue; }
  const files = walk(abs, []).filter((f) => f.toLowerCase().endsWith('.html'));
  const rows = files.map((f) => analyzeFile(f, path.relative(ROOT, f)));
  // Chapitres de contenu réels : source + refonte non-redirigés
  const chapRows = rows.filter((r) => r.kind === 'chapitre' && !r.metaRefresh && r.words >= 60);
  const words = chapRows.map((r) => r.words);
  const sum = (arr) => arr.reduce((a, b) => a + b, 0);
  courses[dir] = {
    html: rows.length,
    byKind: rows.reduce((a, r) => { a[r.kind] = (a[r.kind] || 0) + 1; return a; }, {}),
    totalWords: rows.reduce((a, r) => a + r.words, 0),
    shellPages: rows.filter((r) => r.shell).length,
    redirectPages: rows.filter((r) => r.metaRefresh).length,
    emptyPages: rows.filter((r) => r.words < 60 && r.kind !== 'technique').length,
    media: { img: rows.reduce((a, r) => a + r.img, 0), svg: rows.reduce((a, r) => a + r.svg, 0) },
    // Profondeur
    contentChapters: chapRows.length,
    avgWords: chapRows.length ? Math.round(sum(words) / chapRows.length) : 0,
    minWords: chapRows.length ? Math.min(...words) : 0,
    maxWords: chapRows.length ? Math.max(...words) : 0,
    avgBoxes: chapRows.length ? +(sum(chapRows.map((r) => r.boxes)) / chapRows.length).toFixed(1) : 0,
    avgCode: chapRows.length ? +(sum(chapRows.map((r) => r.pre)) / chapRows.length).toFixed(1) : 0,
    avgQuiz: chapRows.length ? +(sum(chapRows.map((r) => r.quizCards)) / chapRows.length).toFixed(1) : 0,
    avgMnemo: chapRows.length ? +(sum(chapRows.map((r) => r.mnemo)) / chapRows.length).toFixed(1) : 0,
    avgImages: chapRows.length ? +(sum(chapRows.map((r) => r.img + r.svg)) / chapRows.length).toFixed(1) : 0,
    deepChapters: chapRows.filter((r) => r.words >= 800).length,
    thinChapters: chapRows.filter((r) => r.words < 350).length,
  };
  pages.push(...rows);
}

const sources = {};
for (const dir of SOURCE_DIRS.concat(LEGACY_DIRS)) {
  const abs = path.join(ROOT, dir);
  sources[dir] = fs.existsSync(abs) ? dirSizeFiles(dir) : { missing: true };
}

// ── Sorties ────────────────────────────────────────────────────────────────
fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(
  path.join(OUT_DIR, 'inventaire-pages.json'),
  JSON.stringify({ generatedAt: new Date().toISOString(), courses, sources, pages }, null, 2)
);

const pad = (s, n) => String(s).padEnd(n);
const padl = (s, n) => String(s).padStart(n);
let md = '# Inventaire mécanique des pages — audit contenu\n\n';
md += `Généré : ${new Date().toISOString()} — ${pages.length} pages HTML inventoriées.\n\n`;
md += '## Synthèse par cours (cours servis)\n\n';
md += '| Cours | HTML | index | sommaire | chap-refonte | chap-source | exercices | qcm | coquilles | redirections | <60 mots | mots total |\n';
md += '|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|\n';
for (const dir of COURSE_DIRS) {
  const c = courses[dir];
  if (!c || c.missing) { md += `| ${dir} | — | — | — | — | — | — | — | — | — | — | — |\n`; continue; }
  const k = c.byKind || {};
  const g = (x) => k[x] || 0;
  md += `| ${dir} | ${c.html} | ${g('index')} | ${g('sommaire')} | ${g('chapitre-refonte')} | ${g('chapitre-source')} | ${g('exercice')} | ${g('qcm')} | ${c.shellPages} | ${c.redirectPages} | ${c.emptyPages} | ${c.totalWords} |\n`;
}

md += '\n## Profondeur du contenu par cours (chapitres réels, hors index/qcm/annexes)\n\n';
md += '| Cours | Chap. contenu | Mots moy. | Mots min | Mots max | Encadrés/ch | Code/ch | QCM/ch | Mn[ée]mo/ch | Images/ch | Chap. ≥800m | Chap. <350m | Note estimée /20 |\n';
md += '|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|\n';
for (const dir of COURSE_DIRS) {
  const c = courses[dir];
  if (!c || c.missing) continue;
  // Heuristique de notation (voir rapport pour la méthode)
  const w = Math.min(c.avgWords / 1200, 1);          // profondeur textuelle
  const b = Math.min(c.avgBoxes / 6, 1);              // encadrés pédagogiques
  const q = Math.min(c.avgQuiz / 5, 1);               // évaluation
  const m = Math.min(c.avgMnemo / 3, 1);              // mnémotechnique
  const cov = c.contentChapters ? Math.min(c.deepChapters / c.contentChapters, 1) : 0;
  const note = Math.round((w * 5 + b * 4 + q * 4 + m * 3 + cov * 4) * 10) / 10; // sur 20
  md += `| ${dir} | ${c.contentChapters} | ${c.avgWords} | ${c.minWords} | ${c.maxWords} | ${c.avgBoxes} | ${c.avgCode} | ${c.avgQuiz} | ${c.avgMnemo} | ${c.avgImages} | ${c.deepChapters} | ${c.thinChapters} | **${note}** |\n`;
}

md += '\n## Matière source (non servie)\n\n| Dossier | Fichiers | Taille | Types |\n|---|---:|---:|---|\n';

for (const dir of SOURCE_DIRS.concat(LEGACY_DIRS)) {
  const s = sources[dir];
  if (!s || s.missing) { md += `| ${dir} | — | — | — |\n`; continue; }
  const types = Object.entries(s.byExt).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([e, n]) => `${e}:${n}`).join(', ');
  md += `| ${dir} | ${s.count} | ${(s.bytes / 1048576).toFixed(1)} Mo | ${types} |\n`;
}

md += '\n## Pages les plus pauvres (< 60 mots, hors techniques)\n\n';
const poor = pages.filter((p) => p.words < 60 && p.kind !== 'technique').sort((a, b) => a.words - b.words).slice(0, 60);
md += '| Fichier | Type | Mots | Redir. | Titre |\n|---|---|---:|---|---|\n';
for (const p of poor) md += `| ${p.rel} | ${p.kind} | ${p.words} | ${p.metaRefresh ? 'oui' : ''} | ${(p.title || '').slice(0, 60)} |\n`;

md += '\n## Pages les plus riches (top 40 en mots)\n\n| Fichier | Type | Mots | h2 | pre | Titre |\n|---|---|---:|---:|---:|---|\n';
for (const p of [...pages].sort((a, b) => b.words - a.words).slice(0, 40)) {
  md += `| ${p.rel} | ${p.kind} | ${p.words} | ${p.h2} | ${p.pre} | ${(p.title || '').slice(0, 50)} |\n`;
}

md += '\n## Pages contenant un marqueur de coquille\n\n| Fichier | Marqueurs |\n|---|---|\n';
for (const p of pages.filter((x) => x.shell).slice(0, 120)) md += `| ${p.rel} | ${p.shellHits.join('; ')} |\n`;

fs.writeFileSync(path.join(OUT_DIR, 'inventaire-pages.md'), md);

console.log(`OK — ${pages.length} pages HTML inventoriées`);
console.log(`     audit/inventaire-pages.json`);
console.log(`     audit/inventaire-pages.md`);
for (const dir of COURSE_DIRS) {
  const c = courses[dir];
  if (!c || c.missing) continue;
  console.log(`  ${pad(dir, 26)} html=${padl(c.html, 3)}  coquilles=${padl(c.shellPages, 3)}  redir=${padl(c.redirectPages, 3)}  <60mots=${padl(c.emptyPages, 3)}  mots=${padl(c.totalWords, 7)}`);
}
