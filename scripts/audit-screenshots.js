#!/usr/bin/env node
/**
 * Captures d'écran de toutes les pages HTML des cours — headless Chromium.
 * Sert le projet en local (aucune dépendance), capture en parallèle, écrit
 * audit/screens/ (PNG par page) + audit/captures-index.html (galerie).
 *
 * Usage :
 *   node scripts/audit-screenshots.js                 # tout
 *   LIMIT=5 CONC=2 node scripts/audit-screenshots.js  # échantillon de test
 *   ONLY=react,linux node scripts/audit-screenshots.js
 */
'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawn } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'audit', 'screens');
const GAL = path.join(ROOT, 'audit', 'captures-index.html');
const CHROME = process.env.CHROME || '/usr/bin/chromium';
const PORT = Number(process.env.PORT || 8099);
const CONC = Number(process.env.CONC || 4);
const LIMIT = Number(process.env.LIMIT || 0);
const W_WIDTH = Number(process.env.W || 1440);
const W_HEIGHT = Number(process.env.H || 1100);
const VTIME = Number(process.env.VTIME || 4000);

const COURSE_DIRS = [
  'linux', 'php', 'probabilites', 'rd_java', 'rd_winserver', 'admin-vm',
  'droit', 'react', 'api-rest-flask', 'erp-si', 'ingenierie-besoin',
  'masterclass-apprendre', 'RD-RO', 'assembleur', 'Cyber securite B2',
  'sql', 'csharp', 'ccna', 'uml', 'uiux', 'docker', 'infographie',
  'preparation-web', 'epreuves', 'b1',
];

const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.webp': 'image/webp',
  '.ico': 'image/x-icon', '.woff': 'font/woff', '.woff2': 'font/woff2',
  '.ttf': 'font/ttf', '.pdf': 'application/pdf', '.mp4': 'video/mp4',
  '.map': 'application/json',
};

function walk(dir, out) {
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return out; }
  for (const e of entries) {
    if (e.name === 'node_modules' || e.name === '.git' || e.name === 'dist' || e.name === '.vercel') continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.isFile()) out.push(p);
  }
  return out;
}

function startServer() {
  const server = http.createServer((req, res) => {
    try {
      let rel = decodeURIComponent(req.url.split('?')[0]);
      if (rel.endsWith('/')) rel += 'index.html';
      const abs = path.normalize(path.join(ROOT, rel));
      if (!abs.startsWith(ROOT)) { res.writeHead(403); res.end('no'); return; }
      if (!fs.existsSync(abs) || !fs.statSync(abs).isFile()) { res.writeHead(404); res.end('404'); return; }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(abs).toLowerCase()] || 'application/octet-stream' });
      fs.createReadStream(abs).pipe(res);
    } catch (e) { res.writeHead(500); res.end(String(e)); }
  });
  return new Promise((r) => server.listen(PORT, () => r(server)));
}

function shot(url, outFile, tmpDir) {
  return new Promise((resolve) => {
    fs.mkdirSync(path.dirname(outFile), { recursive: true });
    const args = [
      '--headless=new', '--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage',
      '--hide-scrollbars', '--mute-audio', '--no-first-run', '--disable-extensions',
      `--user-data-dir=${tmpDir}`,
      `--window-size=${W_WIDTH},${W_HEIGHT}`,
      `--virtual-time-budget=${VTIME}`,
      `--screenshot=${outFile}`,
      url,
    ];
    const p = spawn(CHROME, args, { stdio: 'ignore' });
    const to = setTimeout(() => { try { p.kill('SIGKILL'); } catch {} }, 25000);
    p.on('exit', (code) => { clearTimeout(to); resolve(code === 0 && fs.existsSync(outFile)); });
    p.on('error', () => { clearTimeout(to); resolve(false); });
  });
}

async function pool(items, worker, conc) {
  let i = 0, ok = 0, fail = 0;
  const runners = Array.from({ length: conc }, async (_, k) => {
    const tmpDir = path.join(os.tmpdir(), `audit-chrome-${process.pid}-${k}`);
    fs.mkdirSync(tmpDir, { recursive: true });
    while (i < items.length) {
      const idx = i++;
      const res = await worker(items[idx], tmpDir);
      if (res) ok++; else fail++;
      if ((ok + fail) % 25 === 0) process.stdout.write(`  … ${ok + fail}/${items.length} (ok ${ok}, échecs ${fail})\n`);
    }
  });
  await Promise.all(runners);
  return { ok, fail };
}

(async () => {
  // 1. Collecte des pages
  const only = (process.env.ONLY || '').split(',').map((s) => s.trim()).filter(Boolean);
  const dirs = only.length ? COURSE_DIRS.filter((d) => only.includes(d)) : COURSE_DIRS;
  const pages = [];
  for (const dir of dirs) {
    const abs = path.join(ROOT, dir);
    if (!fs.existsSync(abs)) continue;
    for (const f of walk(abs, [])) {
      if (f.toLowerCase().endsWith('.html')) pages.push(path.relative(ROOT, f));
    }
  }
  pages.sort();
  const list = LIMIT ? pages.slice(0, LIMIT) : pages;
  console.log(`Pages à capturer : ${list.length}${LIMIT ? ` (sur ${pages.length}, LIMIT actif)` : ''}`);

  const server = await startServer();
  console.log(`Serveur local : http://localhost:${PORT}`);

  const results = [];
  const { ok, fail } = await pool(list, async (rel, tmpDir) => {
    const url = `http://localhost:${PORT}/${rel.split(path.sep).join('/')}`;
    const outFile = path.join(OUT, rel.replace(/\.html$/i, '.png'));
    const good = await shot(url, outFile, tmpDir);
    results.push({ rel, good, out: good ? path.relative(ROOT, outFile) : '' });
    return good;
  }, CONC);

  server.close();

  // 2. Galerie
  results.sort((a, b) => a.rel.localeCompare(b.rel));
  const byCourse = {};
  for (const r of results) {
    const c = r.rel.split(path.sep)[0];
    (byCourse[c] = byCourse[c] || []).push(r);
  }
  let html = '<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"><title>Captures — audit contenu</title>';
  html += '<style>body{font-family:system-ui,sans-serif;background:#faf7f2;color:#141414;margin:0;padding:24px}h1{font-size:22px}h2{margin:32px 0 12px;border-bottom:1px solid #e7e1d7;padding-bottom:6px}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:14px}.card{background:#fff;border:1px solid #e7e1d7;border-radius:12px;overflow:hidden}.card img{width:100%;display:block;aspect-ratio:4/3;object-fit:cover;object-position:top}.card .p{padding:6px 8px;font-size:11px;word-break:break-all}.miss{background:#fee2e2;color:#991b1b;padding:8px;font-size:12px}</style></head><body>';
  html += `<h1>Captures d'écran — ${results.length} pages (${ok} OK, ${fail} échecs)</h1>`;
  for (const [course, rows] of Object.entries(byCourse)) {
    html += `<h2>${course} <small>(${rows.filter((r) => r.good).length}/${rows.length})</small></h2><div class="grid">`;
    for (const r of rows) {
      html += '<div class="card">';
      html += r.good
        ? `<a href="${r.out}" target="_blank"><img loading="lazy" src="${r.out}"></a>`
        : '<div class="miss">capture échouée</div>';
      html += `<div class="p">${r.rel}</div></div>`;
    }
    html += '</div>';
  }
  html += '</body></html>';
  fs.writeFileSync(GAL, html);

  console.log(`\nTerminé : ${ok} OK, ${fail} échecs sur ${results.length}`);
  console.log(`Galerie : audit/captures-index.html`);
})();
