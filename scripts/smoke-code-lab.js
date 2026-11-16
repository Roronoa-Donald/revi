#!/usr/bin/env node
/**
 * Test de fumée navigateur pour l'atelier de code.
 *
 * Vérifie, dans un vrai moteur de rendu, ce qu'aucun test unitaire ne peut
 * prouver : que Monaco se charge depuis le chemin vendoré, que la coquille de
 * l'atelier est peuplée, et que le repli texte n'est pas déclenché.
 *
 * Le pilotage passe par le protocole DevTools plutôt que par `--dump-dom` :
 * l'éditeur se monte de façon asynchrone, un vidage du DOM au moment de
 * l'événement `load` ne verrait rien.
 *
 * Ne teste pas l'exécution : elle dépend d'une clé de service et d'un accès
 * réseau, volontairement hors périmètre.
 *
 * Usage :
 *   node scripts/smoke-code-lab.js
 *   CHROME_BIN=/chemin/vers/chromium node scripts/smoke-code-lab.js
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

const PAGES = [
  { url: '/b1-python/atelier.html', labs: 1, marker: 'Moyenne' },
  { url: '/b1-python/chapitres/chapitre3.html', labs: 3, marker: 'calcul_statistiques' },
  { url: '/b1-c-cpp/atelier.html', labs: 1, marker: 'Somme' },
  { url: '/b1-c-cpp/chapitres/chapitre6.html', labs: 3, marker: 'echanger' },
  { url: '/b1-algo/atelier.html', labs: 1, marker: 'Zone libre' },
  { url: '/b1-algo/chapitres/chapitre6.html', labs: 3, marker: '(le maximum part du premier élément, jamais d' },
  { url: '/b1-php/atelier.html', labs: 1, marker: 'mini-inventaire' },
  { url: '/b1-php/chapitres/chapitre1.html', labs: 3, marker: 'Bonjour' },
  { url: '/b1-algebre/atelier.html', labs: 1, marker: 'zone libre : simulez votre calcul matriciel' },
  { url: '/b1-algebre/chapitres/chapitre1.html', labs: 3, marker: 'vecteur nul au second membre' },
  { url: '/b1-stats/atelier.html', labs: 1, marker: 'cas d\'application libre' },
  { url: '/b1-stats/chapitres/chapitre1.html', labs: 3, marker: 'cas 1' },
  { url: '/b1-prog-web/atelier.html', labs: 1, marker: 'readFileSync(0' },
  { url: '/b1-prog-web/chapitres/chapitre1.html', labs: 3, marker: 'lignes[0]' },
  { url: '/b1-robotique/atelier.html', labs: 1, marker: 'zone libre : simulez votre logique robotique' },
  { url: '/b1-robotique/chapitres/chapitre1.html', labs: 3, marker: 'cas 1' },
  { url: '/b1-linux/atelier.html', labs: 1, marker: 'inventaire d’un répertoire simulé' },
  { url: '/b1-linux/chapitres/chapitre1.html', labs: 3, marker: '« absolu » ou « relatif' },
  { url: '/b1-git/atelier.html', labs: 1, marker: 'journal de commits' },
  { url: '/b1-git/chapitres/chapitre1.html', labs: 3, marker: 'répondre aux status' },
  { url: '/b1-cyber/atelier.html', labs: 1, marker: 'cas d\'application libre' },
  { url: '/b1-cyber/chapitres/chapitre1.html', labs: 3, marker: 'quatre actifs mixtes' },
  { url: '/b1-merise/atelier.html', labs: 1, marker: 'cas d\'application libre' },
  { url: '/b1-merise/chapitres/chapitre1.html', labs: 3, marker: 'données : 12000' },
  { url: '/b1-droit/atelier.html', labs: 1, marker: 'données : loi relative aux libertés publiques' },
  { url: '/b1-droit/chapitres/chapitre1.html', labs: 3, marker: 'données : droit de vote' },
  { url: '/b1-anglais/atelier.html', labs: 1, marker: 'données : i am writing to enquire about your' },
  { url: '/b1-anglais/chapitres/chapitre1.html', labs: 3, marker: 'cas 1' },
  { url: '/b1-fr-pro/atelier.html', labs: 1, marker: 'données : nous vous prions d\'agréer nos salut' },
  { url: '/b1-fr-pro/chapitres/chapitre1.html', labs: 3, marker: 'cas 1' },
  { url: '/b1-reseaux/atelier.html', labs: 1, marker: 'cas d\'application libre' },
  { url: '/b1-reseaux/chapitres/chapitre1.html', labs: 3, marker: 'cinq reseaux' },
  { url: '/b1-bureautique/atelier.html', labs: 1, marker: 'données : montant 1500' },
  { url: '/b1-bureautique/chapitres/chapitre1.html', labs: 3, marker: 'cas 1' },
  { url: '/b1-ccna1/atelier.html', labs: 1, marker: 'cas d\'application libre' },
  { url: '/b1-ccna1/chapitres/chapitre1.html', labs: 3, marker: 'cas 1' },
  { url: '/b1-architecture/atelier.html', labs: 1, marker: 'cas d\'application libre' },
  { url: '/b1-architecture/chapitres/chapitre1.html', labs: 3, marker: 'cas 1' },
  { url: '/b1-admin-windows/atelier.html', labs: 1, marker: 'vérifie les réponses' },
  { url: '/b1-admin-windows/chapitres/chapitre1.html', labs: 3, marker: 'cas 1' },
  { url: '/b1-virtualisation/atelier.html', labs: 1, marker: 'cas d\'application libre' },
  { url: '/b1-virtualisation/chapitres/chapitre1.html', labs: 3, marker: 'cas 1' },
  { url: '/b1-projet/atelier.html', labs: 1, marker: 'cas d\'application libre' },
  { url: '/b1-projet/chapitres/chapitre1.html', labs: 3, marker: 'cas 1' },
  { url: '/b1-sql/atelier.html', labs: 1, marker: 'select count(*) as nb from voiture;' },
  { url: '/b1-sql/chapitres/chapitre1.html', labs: 3, marker: 'select immat from voiture;' },
  { url: '/linux/atelier.html', labs: 1, marker: 'parc de serveurs' },
  { url: '/linux/chapitres/chapitre1.html', labs: 3, marker: 'tester le premier caractère du chemin' },
  { url: '/php/atelier.html', labs: 1, marker: 'class Contact {' },
  { url: '/php/chapitres/chapitre1.html', labs: 3, marker: 'class Point {' },
  { url: '/probabilites/atelier.html', labs: 1, marker: 'données : univers équiprobable à 8 issues, 3' },
  { url: '/probabilites/chapitres/chapitre1.html', labs: 3, marker: 'données : 10' },
  { url: '/rd_java/atelier.html', labs: 1, marker: 'Zone libre : compilez' },
  { url: '/rd_java/chapitres/chapitre1.html', labs: 3, marker: 'à compléter : afficher "somme : " suivi de la' },
  { url: '/rd_winserver/atelier.html', labs: 1, marker: 'Zone libre : explorez' },
  { url: '/rd_winserver/chapitres/chapitre1.html', labs: 3, marker: 'total : ' },
  { url: '/admin-vm/atelier.html', labs: 1, marker: 'Zone libre : explorez' },
  { url: '/admin-vm/chapitres/chapitre1.html', labs: 3, marker: 'vms : ' },
  { url: '/droit/atelier.html', labs: 1, marker: 'données : chiffre d\'affaires 600000000' },
  { url: '/droit/chapitres/chapitre1.html', labs: 3, marker: 'cas 1' },
  { url: '/react/atelier.html', labs: 1, marker: 'simulateur de rendu d\'un composant Carte' },
  { url: '/react/chapitres/chapitre1.html', labs: 3, marker: 'construire l\'objet React Element' },
  { url: '/api-rest-flask/atelier.html', labs: 1, marker: 'simulateur de réponse d\'API JSON' },
  { url: '/api-rest-flask/chapitres/chapitre1.html', labs: 3, marker: 'découper la ligne et afficher les trois composants' },
  { url: '/erp-si/atelier.html', labs: 1, marker: 'note: validation des prérequis et des critère' },
  { url: '/erp-si/chapitres/chapitre1.html', labs: 3, marker: 'cas 1' },
  { url: '/ingenierie-besoin/atelier.html', labs: 1, marker: 'note: validation des prérequis et des critère' },
  { url: '/ingenierie-besoin/chapitres/chapitre1.html', labs: 3, marker: 'cas 1' },
  { url: '/masterclass-apprendre/atelier.html', labs: 1, marker: 'note: validation des prérequis et des critère' },
  { url: '/masterclass-apprendre/chapitres/chapitre1.html', labs: 3, marker: 'données : calcul_mental_intermediaire' },
  { url: '/RD-RO/atelier.html', labs: 1, marker: 'sommets réalisables : (0, 0), (8, 0), (0, 5.5' },
  { url: '/RD-RO/chapitres/chapitre1.html', labs: 5, marker: 'plan candidat : x1 = -2, x2 = 5' },
  { url: '/assembleur/atelier.html', labs: 1, marker: 'note: validation des prérequis et des critère' },
  { url: '/assembleur/chapitres/chapitre1.html', labs: 3, marker: 'données : 0xaa;0x0f;xor' },
  { url: '/Cyber%20securite%20B2/atelier.html', labs: 1, marker: 'cas d\'application libre' },
  { url: '/Cyber%20securite%20B2/chapitres/chapitre1.html', labs: 3, marker: 'données : 2,2,3' },
  { url: '/sql/atelier.html', labs: 1, marker: 'Zone libre : simulez' },
  { url: '/sql/chapitres/chapitre1.html', labs: 3, marker: 'créez la table collaborateurs avec ses contra' },
  { url: '/csharp/atelier.html', labs: 1, marker: 'Zone libre : simulez' },
  { url: '/csharp/chapitres/chapitre1.html', labs: 3, marker: 'string input = console.in.readtoend().trim();' },
  { url: '/ccna/atelier.html', labs: 1, marker: 'cas d\'application libre' },
  { url: '/ccna/chapitres/chapitre1.html', labs: 3, marker: 'cas 1' },
  { url: '/uml/atelier.html', labs: 1, marker: 'Zone libre : simulez' },
  { url: '/uml/chapitres/chapitre1.html', labs: 3, marker: 'cas 1' },
  { url: '/uiux/atelier.html', labs: 1, marker: 'Zone libre : simulez' },
  { url: '/uiux/chapitres/chapitre1.html', labs: 3, marker: 'données : architecture de l\'information' },
  { url: '/docker/atelier.html', labs: 1, marker: 'Zone libre : simulez' },
  { url: '/docker/chapitres/chapitre1.html', labs: 3, marker: 'lisez les données sur l\'entrée standard (stdi' },
  { url: '/infographie/atelier.html', labs: 1, marker: 'Zone libre : simulez' },
  { url: '/infographie/chapitres/chapitre1.html', labs: 3, marker: 'cas 1' },
  { url: '/b3-algo/atelier.html', labs: 1, marker: 'Zone libre : simulez' },
  { url: '/b3-algo/chapitres/chapitre1.html', labs: 3, marker: 'calculer les opérations selon la classe de complexité' },
  { url: '/b3-cloud-computing/atelier.html', labs: 1, marker: 'cas d\'application libre' },
  { url: '/b3-cloud-computing/chapitres/chapitre1.html', labs: 3, marker: 'données : service nom=vm_compute type=iaas' },
  { url: '/b3-devops/atelier.html', labs: 1, marker: 'cas d\'application libre' },
  { url: '/b3-devops/chapitres/chapitre1.html', labs: 3, marker: 'cas 1' },
  { url: '/b3-document-technique/atelier.html', labs: 1, marker: 'note: validation des prérequis et des critère' },
  { url: '/b3-document-technique/chapitres/chapitre1.html', labs: 3, marker: 'données : doc_type nom=apipaiement cible=deve' },
  { url: '/b3-etude-quantitative/atelier.html', labs: 1, marker: 'note: validation des prérequis et des critère' },
  { url: '/b3-etude-quantitative/chapitres/chapitre1.html', labs: 3, marker: 'cas 1' },
  { url: '/b3-firewall/atelier.html', labs: 1, marker: 'cas d\'application libre' },
  { url: '/b3-firewall/chapitres/chapitre1.html', labs: 3, marker: 'données : equipement nom=fortigate60f couche_' },
  { url: '/b3-github/atelier.html', labs: 1, marker: 'git_hash_object' },
  { url: '/b3-github/chapitres/chapitre1.html', labs: 3, marker: 'lisez les données sur l\'entrée standard (stdi' },
  { url: '/b3-linux/atelier.html', labs: 1, marker: 'analyser_processus' },
  { url: '/b3-linux/chapitres/chapitre1.html', labs: 3, marker: 'lisez les données sur l\'entrée standard (stdi' },
  { url: '/b3-agile/atelier.html', labs: 1, marker: 'note: validation des prérequis et des critère' },
  { url: '/b3-agile/chapitres/chapitre1.html', labs: 3, marker: 'cas 1' },
  { url: '/b3-pfsense/atelier.html', labs: 1, marker: 'cas d\'application libre' },
  { url: '/b3-pfsense/chapitres/chapitre1.html', labs: 3, marker: 'données : iface_config iface=lan ip=10.10.20.' },
  { url: '/b3-reseau-lan/atelier.html', labs: 1, marker: 'cas d\'application libre' },
  { url: '/b3-reseau-lan/chapitres/chapitre1.html', labs: 3, marker: 'données : bridge name=sw-a vlan=1 priority=32' },
  { url: '/b3-sql/atelier.html', labs: 1, marker: 'exemple autonome compatible sqlite' },
  { url: '/b3-sql/chapitres/chapitre1.html', labs: 3, marker: 'sélectionnez les tx_id distincts n’ayant ni c' },
  { url: '/b3-veille/atelier.html', labs: 1, marker: 'note: validation des prérequis et des critère' },
  { url: '/b3-veille/chapitres/chapitre1.html', labs: 3, marker: 'cas 1' },
  { url: '/b3-windows-server/atelier.html', labs: 1, marker: 'cas d\'application libre' },
  { url: '/b3-windows-server/chapitres/chapitre1.html', labs: 3, marker: 'cas 1' },
  { url: '/b3-anglais/atelier.html', labs: 1, marker: 'note: validation des prérequis et des critère' },
  { url: '/b3-anglais/chapitres/chapitre1.html', labs: 3, marker: 'données : acronym ci/cd' },
  { url: '/b3-cloud-azure/atelier.html', labs: 1, marker: 'cas d\'application libre' },
  { url: '/b3-cloud-azure/chapitres/chapitre1.html', labs: 3, marker: 'données : hierarchy mg-root/mg-prod/sub-corp-' },
  { url: '/b3-cryptographie/atelier.html', labs: 1, marker: 'cas d\'application libre' },
  { url: '/b3-cryptographie/chapitres/chapitre1.html', labs: 3, marker: 'données : caesar dec k=3 text=dwwdtxh d o\'dxe' },
  { url: '/b3-google-cloud/atelier.html', labs: 1, marker: 'cas d\'application libre' },
  { url: '/b3-google-cloud/chapitres/chapitre1.html', labs: 3, marker: 'cas 1' },
  { url: '/b3-hacking/atelier.html', labs: 1, marker: 'note: validation des prérequis et des critère' },
  { url: '/b3-hacking/chapitres/chapitre1.html', labs: 3, marker: 'cas 1' },
  { url: '/b3-cloud-aws/atelier.html', labs: 1, marker: 'données : décrivez la situation à étudier.' },
  { url: '/b3-cloud-aws/chapitres/chapitre1.html', labs: 3, marker: 'cas 1' },
  { url: '/b3-supervision/atelier.html', labs: 1, marker: 'note: validation des prérequis et des critère' },
  { url: '/b3-supervision/chapitres/chapitre1.html', labs: 3, marker: 'données : sla_calc total_hours=720 outages=no' },
  { url: '/b3-voip/atelier.html', labs: 1, marker: 'note: validation des prérequis et des critère' },
  { url: '/b3-voip/chapitres/chapitre1.html', labs: 3, marker: 'données : codec=g.722 bitrate_kbps=64 ptime_m' },
  { url: '/b3-virtualisation/atelier.html', labs: 1, marker: 'note: validation des prérequis et des critère' },
  { url: '/b3-virtualisation/chapitres/chapitre1.html', labs: 3, marker: 'données : host=hyperv-01 sockets=4 cores=12 h' }
];

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
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
    response.writeHead(200, { 'Content-Type': MIME[path.extname(target)] || 'application/octet-stream' });
    fs.createReadStream(target).pipe(response);
  });
  return new Promise(resolve => server.listen(0, '127.0.0.1', () => resolve(server)));
}

async function waitFor(fn, timeoutMs, label) {
  const deadline = Date.now() + timeoutMs;
  for (;;) {
    try {
      return await fn();
    } catch (error) {
      if (Date.now() > deadline) throw new Error(`${label} : ${error.message}`);
      await new Promise(resolve => setTimeout(resolve, 200));
    }
  }
}

/** Client minimal du protocole DevTools : une commande, une réponse. */
class Target {
  constructor(ws) {
    this.ws = ws;
    this.next = 1;
    this.pending = new Map();
    ws.addEventListener('message', event => {
      const message = JSON.parse(event.data);
      const entry = this.pending.get(message.id);
      if (!entry) return;
      this.pending.delete(message.id);
      if (message.error) entry.reject(new Error(message.error.message));
      else entry.resolve(message.result);
    });
  }

  send(method, params) {
    const id = this.next++;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }
}

async function openTarget(port, url) {
  const created = await fetch(`http://127.0.0.1:${port}/json/new?${encodeURIComponent(url)}`, { method: 'PUT' });
  const info = await created.json();
  const ws = new WebSocket(info.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    ws.addEventListener('open', resolve, { once: true });
    ws.addEventListener('error', () => reject(new Error('connexion DevTools refusée')), { once: true });
  });
  return { target: new Target(ws), id: info.id, close: () => ws.close() };
}

const PROBE = `(async () => {
  const deadline = Date.now() + 25000;
  while (Date.now() < deadline && !document.querySelector('.monaco-editor, .lab__cases, .lab__editor-wrap')) {
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  let view = null;
  while (Date.now() < deadline) {
    view = document.querySelector('.view-lines, .lab__cases, .lab__editor-wrap');
    if (view && view.textContent.trim().length > 0) break;
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  const isAnalyse = !!document.querySelector('.lab__cases, [data-language="analyse"]');
  const editors = isAnalyse
    ? document.querySelectorAll('.lab__editor-wrap').length
    : document.querySelectorAll('.monaco-editor').length;
  return JSON.stringify({
    ready: document.readyState,
    isAnalyse: isAnalyse,
    bars: document.querySelectorAll('.lab__bar').length,
    monaco: editors,
    fallback: document.querySelectorAll('.lab__fallback').length,
    panes: document.querySelectorAll('[data-lab-pane]').length,
    runButtons: document.querySelectorAll('[data-lab-run]').length,
    idleStates: document.querySelectorAll('[data-kind="idle"]').length,
    viewText: view ? view.textContent.replace(/\u00A0/g, ' ') : ''
  });
})()`;

/**
 * Évalue une expression en tolérant la destruction du contexte : juste après
 * l'ouverture d'un onglet, la navigation remplace le contexte initial et la
 * première évaluation peut être perdue.
 */
async function evaluate(target, expression, { awaitPromise = false, attempts = 4 } = {}) {
  for (let attempt = 1; ; attempt++) {
    try {
      const result = await target.send('Runtime.evaluate', { expression, awaitPromise, returnByValue: true });
      if (result.exceptionDetails) {
        throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
      }
      return result.result.value;
    } catch (error) {
      const transient = /context was destroyed|Cannot find context/i.test(error.message);
      if (!transient || attempt >= attempts) throw error;
      await new Promise(resolve => setTimeout(resolve, 400));
    }
  }
}

/**
 * Parcours complet côté client, avec des réponses d'API simulées.
 *
 * L'exécution réelle dépend d'une clé de service : on ne la teste donc pas.
 * On teste tout le reste, qui est la partie fragile : affichage du résultat,
 * bascule vers les erreurs, activation du tuteur, rapport de correction.
 */
const INTERACT = `(async () => {
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
  const lab = document.querySelector('[data-lab]');
  if (!lab) return JSON.stringify({});
  const isAnalyse = !!lab.querySelector('.lab__cases, [data-language="analyse"]');
  const real = window.fetch;
  const fake = payload => Promise.resolve(new Response(JSON.stringify(payload), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  }));

  window.fetch = function (url) {
    const target = String(url);
    if (target.includes('/api/execute')) {
      return fake({
        status: 'runtime_error', stdout: '12\\n',
        stderr: 'ZeroDivisionError: division by zero', compileError: '',
        exitCode: 1, provider: 'oanor', warnings: [], quota: { remaining: 39, limit: 40 }
      });
    }
    if (target.includes('/api/exercise/submit')) {
      return fake({
        passed: 1, total: 3,
        results: [{ label: 'Zéro degré', ok: true }, { label: 'Froid extrême', ok: false }],
        stop: { reason: 'wrong_output', label: 'Froid extrême', input: '-40', expected: '-40.0', actual: '0.0', stderr: '' },
        quota: { remaining: 36, limit: 40 }
      });
    }
    if (target.includes('/api/code-help')) {
      return fake({
        explanation: 'Le programme divise par zéro.',
        notice: 'Un passage rédigé sous forme de code a été retiré.',
        stripped: 1
      });
    }
    return real.apply(window, arguments);
  };

  const out = { isAnalyse: isAnalyse };
  const runBtn = lab.querySelector('[data-lab-run]');
  if (runBtn) runBtn.click();
  await wait(500);

  const statusEl = lab.querySelector('[data-lab-status]');
  out.statusKind = statusEl ? statusEl.getAttribute('data-kind') : '';
  const outPane = lab.querySelector('[data-lab-pane="out"]');
  out.stdout = outPane ? outPane.textContent : '';
  const errPane = lab.querySelector('[data-lab-pane="err"]');
  out.stderr = errPane ? errPane.textContent : '';
  const errTab = lab.querySelector('[data-lab-tab="err"]');
  out.errTabSelected = errTab ? errTab.getAttribute('aria-selected') : 'false';
  const helpBtn = lab.querySelector('[data-lab-help]');
  out.helpEnabled = helpBtn ? !helpBtn.disabled : false;
  const detailPane = lab.querySelector('[data-lab-pane="detail"]');
  out.details = detailPane ? detailPane.textContent : '';

  if (helpBtn && !helpBtn.disabled) {
    helpBtn.click();
    await wait(500);
    const tutorEl = lab.querySelector('[data-lab-tutor]');
    out.tutor = tutorEl ? tutorEl.textContent : '';
    const noticeEl = lab.querySelector('[data-lab-tutor-notice]');
    out.tutorNotice = noticeEl ? noticeEl.textContent : '';
  }

  const submit = lab.querySelector('[data-lab-submit]');
  if (submit) {
    if (isAnalyse && lab.__lab) {
      if (lab.__lab.analyseCases && lab.__lab.analyseCases.length) {
        for (let i = 0; i < lab.__lab.analyseCases.length; i++) {
          lab.__lab.analyseCases[i].value = 'Reponse test';
        }
      }
      const inputs = lab.querySelectorAll('.lab__case-input');
      inputs.forEach(inp => { inp.value = 'Reponse test'; });
    }
    submit.click();
    await wait(500);
    const reportEl = lab.querySelector('.lab__report');
    out.report = reportEl ? reportEl.textContent : '';
  }
  return JSON.stringify(out);
})()`;

async function inspect(target, url, page) {
  // Attendre la fin du chargement : le contexte initial d'un onglet neuf est
  // remplacé dès que la navigation démarre.
  await waitFor(async () => {
    const state = await evaluate(target, 'document.readyState');
    if (state !== 'complete') throw new Error(`état ${state}`);
    return true;
  }, 25000, 'chargement de la page');

  const info = JSON.parse(await evaluate(target, PROBE, { awaitPromise: true }));
  const failures = [];
  const check = (label, ok) => { if (!ok) failures.push(`${url} : ${label}`); };

  check('coquille d’atelier construite', info.bars === page.labs);
  check('éditeur monté', info.monaco >= page.labs);
  check('repli texte non déclenché', info.fallback === 0);
  if (!info.isAnalyse) {
    check('console à trois onglets par atelier', info.panes === page.labs * 3);
    check('bouton Exécuter présent', info.runButtons === page.labs);
  }
  check('état initial affiché', info.idleStates >= page.labs);
  if (page.marker) {
    const normView = (info.viewText || '').toLowerCase();
    const normMarker = page.marker.toLowerCase();
    check('code de départ affiché dans l’éditeur', normView.includes(normMarker));
    if (process.env.SMOKE_DEBUG && !normView.includes(normMarker)) {
      require('fs').appendFileSync(process.env.SMOKE_DEBUG, JSON.stringify({ url: page.url, view: normView }) + '\n');
    }
  }

  // Parcours fonctionnel sur le premier atelier de la page.
  const run = JSON.parse(await evaluate(target, INTERACT, { awaitPromise: true }));
  const isSql = !info.isAnalyse && (page.url.includes('/sql/') || page.url.includes('/b1-sql/') || page.url.includes('/b3-sql/'));
  if (!info.isAnalyse) {
    if (!isSql) {
      check('état d’erreur remonté', run.statusKind === 'runtime_error');
      check('sortie standard affichée', (run.stdout || '').includes('12'));
      check('erreur affichée', (run.stderr || '').includes('ZeroDivisionError'));
      check('onglet Erreurs sélectionné', run.errTabSelected === 'true');
      check('tuteur activé après une erreur', run.helpEnabled);
      check('détails d’exécution remplis', (run.details || '').includes('Code de sortie') && (run.details || '').includes('oanor'));
      if (run.helpEnabled) {
        check('explication du tuteur affichée', (run.tutor || '').includes('divise par zéro'));
        check('retrait de code signalé', (run.tutorNotice || '').includes('retiré'));
      }
    } else {
      check('état d’exécution remonté', run.statusKind === 'success' || run.statusKind === 'runtime_error');
    }
  }
  if (page.labs > 0 && page.url.includes('chapitre')) {
    check('rapport de correction affiché', /1 \/ 3|1 test|validé|vérification formative/i.test(run.report || ''));
    if (!info.isAnalyse && !isSql) {
      check('premier test en échec détaillé', (run.report || '').includes('-40.0'));
    }
  }

  return { failures, info, run };
}

async function main() {
  if (!CHROME) {
    console.error('[!!] aucun navigateur trouvé (CHROME_BIN pour le préciser)');
    process.exit(1);
  }

  const site = await staticServer();
  const sitePort = site.address().port;
  const debugPort = await freePort();
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'smoke-lab-'));

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
    // Aucune résolution externe : en environnement isolé, une police distante
    // ferait patienter la page indéfiniment.
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

    const filter = process.argv[2];
    const pagesToRun = filter ? PAGES.filter(p => p.url.includes(filter)) : PAGES;

    for (const page of pagesToRun) {
      const url = `http://127.0.0.1:${sitePort}${page.url}`;
      const handle = await openTarget(debugPort, url);
      try {
        const { failures: pageFailures, info, run } = await inspect(handle.target, page.url, page);
        failures.push(...pageFailures);
        console.log(
          `[${pageFailures.length ? '!!' : 'ok'}] ${page.url.replace(/^\/[^/]+/, '')} — ` +
          `${info.monaco} éditeur(s), ${info.panes} panneaux, repli ${info.fallback}, ` +
          `état ${run.statusKind}, tuteur ${run.tutor ? 'oui' : 'non'}`
        );
      } finally {
        handle.close();
        await fetch(`http://127.0.0.1:${debugPort}/json/close/${handle.id}`).catch(() => {});
      }
    }
  } finally {
    browser.kill('SIGKILL');
    site.close();
    try {
      fs.rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    } catch {}
  }

  if (failures.length) {
    console.error('\n[!!] échecs :');
    for (const failure of failures) console.error('     ' + failure);
    process.exit(1);
  }
  console.log('\n[ok] atelier chargé dans un vrai navigateur : Monaco monté, console et boutons en place');
}

main().catch(error => {
  console.error('[!!] test de fumée interrompu :', error.message);
  process.exit(1);
});
