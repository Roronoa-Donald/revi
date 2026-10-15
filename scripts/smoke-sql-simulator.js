#!/usr/bin/env node
/**
 * Test de fumée du simulateur SQL du cours b1-sql.
 *
 * Vérifie, dans un vrai moteur de rendu, ce qu'aucun test unitaire ne peut
 * prouver : que le moteur sql.js (WebAssembly) s'initialise, que la base
 * parc_auto est construite, qu'une requête SELECT s'exécute et s'affiche en
 * tableau, que « Réinitialiser » reconstruit la base après une modification,
 * et que la validation des missions réagit.
 *
 * Ne teste pas MySQL : le simulateur embarque SQLite (WASM), dont les requêtes
 * du cours — SELECT, jointures, agrégats — sont représentatives.
 *
 * Usage :
 *   node scripts/smoke-sql-simulator.js
 *   CHROME_BIN=/chemin/vers/chromium node scripts/smoke-sql-simulator.js
 */
const fs = require('fs');
const http = require('http');
const net = require('net');
const os = require('os');
const path = require('path');
const { spawn, execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const CHROME = process.env.CHROME_BIN || ['chromium', 'chromium-browser', 'google-chrome']
  .find(bin => {
    try {
      execFileSync('which', [bin], { stdio: 'ignore' });
      return true;
    } catch {
      return false;
    }
  });

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.wasm': 'application/wasm',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

function freePort() {
  return new Promise(resolve => {
    const probe = net.createServer();
    probe.listen(0, '127.0.0.1', () => {
      const { port } = probe.address();
      probe.close(() => resolve(port));
    });
  });
}

function staticServer() {
  const server = http.createServer((request, response) => {
    const url = decodeURIComponent((request.url || '/').split('?')[0]);
    const target = path.join(ROOT, path.normalize(url));
    if (!target.startsWith(ROOT) || !fs.existsSync(target) || fs.statSync(target).isDirectory()) {
      response.writeHead(404, { 'Content-Type': 'text/plain' }).end('introuvable');
      return;
    }
    const ext = path.extname(target).toLowerCase();
    response.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    fs.createReadStream(target).pipe(response);
  });
  return new Promise(resolve => server.listen(0, '127.0.0.1', () => resolve(server)));
}

async function waitFor(predicate, timeoutMs, label) {
  const deadline = Date.now() + timeoutMs;
  for (;;) {
    try {
      return await predicate();
    } catch (error) {
      if (Date.now() > deadline) throw new Error(`${label} : ${error.message}`);
      await new Promise(resolve => setTimeout(resolve, 200));
    }
  }
}

async function openTarget(debugPort, url) {
  const response = await fetch(`http://127.0.0.1:${debugPort}/json/new?${encodeURIComponent(url)}`, { method: 'PUT' });
  const page = await response.json();
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    ws.addEventListener('open', resolve, { once: true });
    ws.addEventListener('error', () => reject(new Error('connexion DevTools refusée')), { once: true });
  });
  let nextId = 1;
  const pending = new Map();
  ws.addEventListener('message', event => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      pending.get(message.id)(message);
      pending.delete(message.id);
    }
  });
  const sender = (method, params) => {
    const id = nextId++;
    return new Promise(resolve => {
      pending.set(id, resolve);
      ws.send(JSON.stringify({ id, method, params }));
    });
  };
  return {
    id: page.id,
    send: sender,
    close: () => ws.close()
  };
}

async function evaluate(target, expression, { awaitPromise = false, attempts = 4 } = {}) {
  for (let attempt = 1; ; attempt++) {
    try {
      const response = await target.send('Runtime.evaluate', { expression, awaitPromise, returnByValue: true });
      // Le sender résout avec le message complet { id, result }.
      const result = response.result || {};
      if (response.error) throw new Error(response.error.message);
      if (process.env.SMOKE_DEBUG) console.error('[debug]', JSON.stringify(response).slice(0, 200));
      if (result.exceptionDetails) {
        throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
      }
      if (result.result && result.result.type === 'undefined') {
        throw new Error('évaluation sans valeur : ' + JSON.stringify(response).slice(0, 300));
      }
      return result.result.value;
    } catch (error) {
      const transient = /context was destroyed|Cannot find context/i.test(error.message);
      if (!transient || attempt >= attempts) throw error;
      await new Promise(resolve => setTimeout(resolve, 400));
    }
  }
}

/** Sondes et scénario exécutés dans la page. */
const PROBE = `(async () => {
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
  const stateEl = () => document.getElementById('sqlsim-state');
  const tableEl = () => document.getElementById('sqlsim-table');

  // 1. Le moteur doit s'initialiser (WASM) et construire la base.
  let deadline = Date.now() + 20000;
  while (Date.now() < deadline) {
    const el = stateEl();
    if (el && /prête|Erreur|impossible/i.test(el.textContent)) break;
    await wait(200);
  }
  const state = stateEl();
  const out = { bootState: state ? state.textContent : '(absent)' };

  // 2. Exécuter le script de l'éditeur (requêtes par défaut) et lire le tableau.
  document.getElementById('sqlsim-run').click();
  await wait(600);
  const table = tableEl();
  const rows = table ? table.querySelectorAll('tbody tr').length : 0;
  const heads = [...(table ? table.querySelectorAll('thead th') : [])].map(th => th.textContent);
  out.tableRows = rows;
  out.tableHeads = heads.join('|');

  // 3. Erreur SQL propre : une requête invalide ne casse pas la page.
  const q = document.getElementById('sqlsim-query');
  const saved = q.value;
  q.value = 'SELECT n_existepas FROM Voiture;';
  document.getElementById('sqlsim-run').click();
  await wait(400);
  out.errorState = stateEl() ? stateEl().textContent : '(absent)';
  out.logLines = document.querySelectorAll('#sqlsim-log .sqlsim__logline').length;

  // 4. UPDATE puis Réinitialiser : la base doit revenir à l'état initial.
  q.value = "UPDATE Voiture SET moteur = 'DIESEL';";
  document.getElementById('sqlsim-run').click();
  await wait(400);
  q.value = "SELECT COUNT(*) AS diesel FROM Voiture WHERE moteur = 'DIESEL';";
  document.getElementById('sqlsim-run').click();
  await wait(400);
  const dieselCells = [...tableEl().querySelectorAll('tbody td')].map(td => td.textContent);
  out.afterUpdate = dieselCells.join('|');
  document.getElementById('sqlsim-reset').click();
  await wait(500);
  q.value = "SELECT COUNT(*) AS diesel FROM Voiture WHERE moteur = 'DIESEL';";
  document.getElementById('sqlsim-run').click();
  await wait(400);
  out.afterReset = [...tableEl().querySelectorAll('tbody td')].map(td => td.textContent).join('|');

  // 5. Mission 1 : la requête de référence doit être validée.
  q.value = 'SELECT * FROM Voiture;';
  document.getElementById('sqlsim-run').click();
  await wait(500);
  const m1 = document.getElementById('sqlsim-mission-m1');
  // (accesseurs re-queris à chaque étape : aucune capture longue durée)
  out.mission1 = m1 ? (m1.classList.contains('sqlsim__mission--done') ? 'done'
    : m1.classList.contains('sqlsim__mission--partial') ? 'partial' : 'todo') : '(absente)';
  q.value = saved;
  return JSON.stringify(out);
})()`;

async function main() {
  if (!CHROME) {
    console.error('[!!] aucun navigateur trouvé (CHROME_BIN pour le préciser)');
    process.exit(1);
  }

  const site = await staticServer();
  const sitePort = site.address().port;
  const debugPort = await freePort();
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'smoke-sql-'));

  const browser = spawn(CHROME, [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--disable-dev-shm-usage',
    '--no-first-run',
    '--disable-background-networking',
    '--disable-sync',
    '--disable-component-update',
    '--disable-default-apps',
    '--metrics-recording-only',
    '--host-resolver-rules=MAP * ~NOTFOUND, EXCLUDE 127.0.0.1',
    `--remote-debugging-port=${debugPort}`,
    `--user-data-dir=${profile}`,
    'about:blank'
  ], { stdio: ['ignore', 'ignore', 'ignore'] });

  const failures = [];

  try {
    await waitFor(async () => {
      const response = await fetch(`http://127.0.0.1:${debugPort}/json/version`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    }, 30000, 'démarrage du navigateur');

    const url = `http://127.0.0.1:${sitePort}/b1-sql/atelier.html`;
    const handle = await openTarget(debugPort, url);
    try {
      await waitFor(async () => {
        const state = await evaluate(handle, 'document.readyState');
        if (state !== 'complete') throw new Error(`état ${state}`);
        return true;
      }, 25000, 'chargement de la page');

      const info = JSON.parse(await evaluate(handle, PROBE, { awaitPromise: true }));
      const check = (label, ok, detail) => { if (!ok) failures.push(`/b1-sql/atelier.html : ${label}${detail ? ' — ' + detail : ''}`); };

      check('moteur SQL initialisé (base prête)', /prête/.test(info.bootState), info.bootState);
      check('requête par défaut affichée en tableau', info.tableRows > 0, `${info.tableRows} ligne(s)`);
      check('colonnes du GROUP BY présentes', /marque/.test(info.tableHeads) && /nb/.test(info.tableHeads), info.tableHeads);
      check('erreur SQL affichée sans casser la page', /Erreur/.test(info.errorState), info.errorState);
      check('journal alimenté', info.logLines >= 2, `${info.logLines} ligne(s)`);
      check('UPDATE sans WHERE touche toute la table', info.afterUpdate === '23', info.afterUpdate);
      check('Réinitialiser reconstruit la base', info.afterReset === '6', info.afterReset);
      check('mission 1 validée par le simulateur', info.mission1 === 'done', info.mission1);

      console.log(
        `[${failures.length ? '!!' : 'ok'}] /b1-sql/atelier.html — moteur ${/prête/.test(info.bootState) ? 'prêt' : 'EN ÉCHEC'}, ` +
        `${info.tableRows} ligne(s) affichée(s), ${info.logLines} entrée(s) de journal, ` +
        `UPDATE ${info.afterUpdate} → reset ${info.afterReset}, mission1 ${info.mission1}`
      );
    } finally {
      handle.close();
      await fetch(`http://127.0.0.1:${debugPort}/json/close/${handle.id}`).catch(() => {});
    }
  } finally {
    browser.kill('SIGKILL');
    site.close();
    fs.rmSync(profile, { recursive: true, force: true });
  }

  if (failures.length) {
    console.error('\n[!!] échecs :');
    for (const failure of failures) console.error('     ' + failure);
    process.exit(1);
  }
  console.log('\n[ok] simulateur SQL vérifié dans un vrai navigateur : moteur WASM prêt, exécution, reset, missions');
}

main().catch(error => {
  console.error('[!!] test de fumée interrompu :', error.message);
  process.exit(1);
});
