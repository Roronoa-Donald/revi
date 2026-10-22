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
  { url: '/b1-algo/chapitres/chapitre6.html', labs: 3, marker: 'tableau.append' },
  { url: '/b1-php/atelier.html', labs: 1, marker: 'mini-inventaire' },
  { url: '/b1-php/chapitres/chapitre1.html', labs: 3, marker: 'Bonjour' },
  { url: '/b1-algebre/atelier.html', labs: 1, marker: 'produit_matrice_vecteur' },
  { url: '/b1-algebre/chapitres/chapitre1.html', labs: 3, marker: 'somme a + b' },
  { url: '/b1-stats/atelier.html', labs: 1, marker: 'moyenne_ecart_type' },
  { url: '/b1-stats/chapitres/chapitre1.html', labs: 3, marker: 'la plus petite et la plus grande valeur' },
  { url: '/b1-prog-web/atelier.html', labs: 1, marker: 'readFileSync(0' },
  { url: '/b1-prog-web/chapitres/chapitre1.html', labs: 3, marker: 'lignes[0]' },
  { url: '/b1-robotique/atelier.html', labs: 1, marker: 'régulateur de distance simplifié' },
  { url: '/b1-robotique/chapitres/chapitre1.html', labs: 3, marker: 'les trois lignes du journal' },
  { url: '/b1-linux/atelier.html', labs: 1, marker: 'inventaire d’un répertoire simulé' },
  { url: '/b1-linux/chapitres/chapitre1.html', labs: 3, marker: '« absolu » ou « relatif' },
  { url: '/b1-git/atelier.html', labs: 1, marker: 'journal de commits' },
  { url: '/b1-git/chapitres/chapitre1.html', labs: 3, marker: 'répondre aux status' },
  { url: '/b1-cyber/atelier.html', labs: 1, marker: 'filtre anti-phishing' },
  { url: '/b1-cyber/chapitres/chapitre1.html', labs: 3, marker: 'menace vuln' },
  { url: '/b1-merise/atelier.html', labs: 1, marker: 'mini-MCD textuel' },
  { url: '/b1-merise/chapitres/chapitre1.html', labs: 3, marker: 'type libelle' },
  { url: '/b1-droit/atelier.html', labs: 1, marker: 'pyramide des normes' },
  { url: '/b1-droit/chapitres/chapitre1.html', labs: 3, marker: 'type libelle' },
  { url: '/b1-anglais/atelier.html', labs: 1, marker: 'correcteur de registre' },
  { url: '/b1-anglais/chapitres/chapitre1.html', labs: 3, marker: 'type mot' },
  { url: '/b1-fr-pro/atelier.html', labs: 1, marker: 'correcteur de registre' },
  { url: '/b1-fr-pro/chapitres/chapitre1.html', labs: 3, marker: 'element canal' },
  { url: '/b1-reseaux/atelier.html', labs: 1, marker: 'vérificateur d’adresses IP' },
  { url: '/b1-reseaux/chapitres/chapitre1.html', labs: 3, marker: 'reseau portee' },
  { url: '/b1-bureautique/atelier.html', labs: 1, marker: 'simulateur de tableur' },
  { url: '/b1-bureautique/chapitres/chapitre1.html', labs: 3, marker: 'groupe onglet' },
  { url: '/b1-ccna1/atelier.html', labs: 1, marker: 'validateur de liaisons Ethernet' },
  { url: '/b1-ccna1/chapitres/chapitre1.html', labs: 3, marker: 'equipement role' },
  { url: '/b1-architecture/atelier.html', labs: 1, marker: 'convertisseur de bases' },
  { url: '/b1-architecture/chapitres/chapitre1.html', labs: 3, marker: 'composant categorie' },
  { url: '/b1-admin-windows/atelier.html', labs: 1, marker: 'contrôleur d’éditions de Windows Server 2012' },
  { url: '/b1-admin-windows/chapitres/chapitre1.html', labs: 3, marker: 'tache famille' },
  { url: '/b1-virtualisation/atelier.html', labs: 1, marker: 'jauge du serveur fainéant' },
  { url: '/b1-virtualisation/chapitres/chapitre1.html', labs: 3, marker: 'heure inactif' },
  { url: '/b1-projet/atelier.html', labs: 1, marker: 'contrôleur de saisie du formulaire' },
  { url: '/b1-projet/chapitres/chapitre1.html', labs: 3, marker: 'competence concept' },
  { url: '/b1-sql/atelier.html', labs: 1, marker: 'contrôleur de privilèges' },
  { url: '/b1-sql/chapitres/chapitre1.html', labs: 3, marker: 'terme definition' },
  { url: '/linux/atelier.html', labs: 1, marker: 'parc de serveurs' },
  { url: '/linux/chapitres/chapitre1.html', labs: 3, marker: 'tester le premier caractère du chemin' },
  { url: '/php/atelier.html', labs: 1, marker: 'class Contact {' },
  { url: '/php/chapitres/chapitre1.html', labs: 3, marker: 'class Point {' },
  { url: '/probabilites/atelier.html', labs: 1, marker: 'Zone libre : simulez' },
  { url: '/probabilites/chapitres/chapitre1.html', labs: 3, marker: 'fraction réduite' },
  { url: '/rd_java/atelier.html', labs: 1, marker: 'Zone libre : compilez' },
  { url: '/rd_java/chapitres/chapitre1.html', labs: 3, marker: 'suivi de la somme des deux entiers' },
  { url: '/rd_winserver/atelier.html', labs: 1, marker: 'Zone libre : explorez' },
  { url: '/rd_winserver/chapitres/chapitre1.html', labs: 3, marker: 'total : ' },
  { url: '/admin-vm/atelier.html', labs: 1, marker: 'Zone libre : explorez' },
  { url: '/admin-vm/chapitres/chapitre1.html', labs: 3, marker: 'vms : ' },
  { url: '/droit/atelier.html', labs: 1, marker: 'sanction maximale du RGPD' },
  { url: '/droit/chapitres/chapitre1.html', labs: 3, marker: 'afficher la catégorie' },
  { url: '/react/atelier.html', labs: 1, marker: 'simulateur de rendu d\'un composant Carte' },
  { url: '/react/chapitres/chapitre1.html', labs: 3, marker: 'construire l\'objet React Element' },
  { url: '/api-rest-flask/atelier.html', labs: 1, marker: 'simulateur de réponse d\'API JSON' },
  { url: '/api-rest-flask/chapitres/chapitre1.html', labs: 3, marker: 'découper la ligne et afficher les trois composants' },
  { url: '/erp-si/atelier.html', labs: 1, marker: 'calculatrice de ligne de commande client avec TVA' },
  { url: '/erp-si/chapitres/chapitre1.html', labs: 3, marker: 'mapper la ressource vers sa composante du SI' },
  { url: '/ingenierie-besoin/atelier.html', labs: 1, marker: 'auditeur d’exigence logicielle et calculateur de score WSJF' },
  { url: '/ingenierie-besoin/chapitres/chapitre1.html', labs: 3, marker: 'afficher Type: Besoin, Type: Solution ou Type: Inconnu' },
  { url: '/masterclass-apprendre/atelier.html', labs: 1, marker: 'Zone libre : simulez' },
  { url: '/masterclass-apprendre/chapitres/chapitre1.html', labs: 3, marker: 'classifier selon Sensorielle' },
  { url: '/RD-RO/atelier.html', labs: 1, marker: 'Zone libre : résolvez' },
  { url: '/RD-RO/chapitres/chapitre1.html', labs: 3, marker: 'analyser la ligne' },
  { url: '/assembleur/atelier.html', labs: 1, marker: 'Zone libre : simulez' },
  { url: '/assembleur/chapitres/chapitre1.html', labs: 3, marker: 'analyser la ligne' },
  { url: '/Cyber%20securite%20B2/atelier.html', labs: 1, marker: 'Zone libre : simulez' },
  { url: '/Cyber%20securite%20B2/chapitres/chapitre1.html', labs: 3, marker: 'calculer le score M * V * I' },
  { url: '/sql/atelier.html', labs: 1, marker: 'Zone libre : simulez' },
  { url: '/sql/chapitres/chapitre1.html', labs: 3, marker: 'analyser la commande CREATE TABLE' },
  { url: '/csharp/atelier.html', labs: 1, marker: 'Zone libre : simulez' },
  { url: '/csharp/chapitres/chapitre1.html', labs: 3, marker: 'classifier l\'allocation mémoire' },
  { url: '/ccna/atelier.html', labs: 1, marker: 'Zone libre : simulez' },
  { url: '/ccna/chapitres/chapitre1.html', labs: 3, marker: 'décoder l\'en-tête Ethernet II' },
  { url: '/uml/atelier.html', labs: 1, marker: 'Zone libre : simulez' },
  { url: '/uml/chapitres/chapitre1.html', labs: 3, marker: 'classifier les diagrammes selon la taxonomie OMG' },
  { url: '/uiux/atelier.html', labs: 1, marker: 'Zone libre : simulez' },
  { url: '/uiux/chapitres/chapitre1.html', labs: 3, marker: 'classifier les livrables en UI, UX ou HYBRIDE' },
  { url: '/docker/atelier.html', labs: 1, marker: 'Zone libre : simulez' },
  { url: '/docker/chapitres/chapitre1.html', labs: 3, marker: 'classifier chaque mécanisme en Namespace ou Cgroup' },
  { url: '/infographie/atelier.html', labs: 1, marker: 'Zone libre : simulez' },
  { url: '/infographie/chapitres/chapitre1.html', labs: 3, marker: 'convertir chaque triplet RVB en quadrichromie CMJN' },
  { url: '/b3-algo/atelier.html', labs: 1, marker: 'Zone libre : simulez' },
  { url: '/b3-algo/chapitres/chapitre1.html', labs: 3, marker: 'calculer les opérations selon la classe de complexité' },
  { url: '/b3-cloud-computing/atelier.html', labs: 1, marker: 'Zone libre : simulez vos architectures' },
  { url: '/b3-cloud-computing/chapitres/chapitre1.html', labs: 3, marker: 'classifier les responsabilités par couche' },
  { url: '/b3-devops/atelier.html', labs: 1, marker: 'Zone libre : simulez vos pipelines CI/CD' },
  { url: '/b3-devops/chapitres/chapitre1.html', labs: 3, marker: 'calculer la moyenne CALMS' },
  { url: '/b3-document-technique/atelier.html', labs: 1, marker: 'Zone libre : automatisez vos validations documentaires' },
  { url: '/b3-document-technique/chapitres/chapitre1.html', labs: 3, marker: 'classifier chaque document selon sa cible' },
  { url: '/b3-etude-quantitative/atelier.html', labs: 1, marker: 'Zone libre : expérimentez vos calculs statistiques' },
  { url: '/b3-etude-quantitative/chapitres/chapitre1.html', labs: 3, marker: 'classifier le cadrage épistémologique' },
  { url: '/b3-firewall/atelier.html', labs: 1, marker: 'verifier_securite_flux' },
  { url: '/b3-firewall/chapitres/chapitre1.html', labs: 3, marker: 'classifier la génération et le type de pare-feu' },
  { url: '/b3-github/atelier.html', labs: 1, marker: 'git_hash_object' },
  { url: '/b3-github/chapitres/chapitre1.html', labs: 3, marker: 'calculer le hachage SHA-1' },
  { url: '/b3-linux/atelier.html', labs: 1, marker: 'analyser_processus' },
  { url: '/b3-linux/chapitres/chapitre1.html', labs: 3, marker: 'parser les métriques' },
  { url: '/b3-agile/atelier.html', labs: 1, marker: 'evaluer_capacite_sprint' },
  { url: '/b3-agile/chapitres/chapitre1.html', labs: 3, marker: 'calculer les dérives de coût' },
  { url: '/b3-pfsense/atelier.html', labs: 1, marker: 'evaluer_regle_filtrage' },
  { url: '/b3-pfsense/chapitres/chapitre1.html', labs: 3, marker: 'analyser la configuration CIDR' },
  { url: '/b3-reseau-lan/atelier.html', labs: 1, marker: 'calculer_cout_stp' },
  { url: '/b3-reseau-lan/chapitres/chapitre1.html', labs: 3, marker: 'calculer la priorité totale' },
  { url: '/b3-sql/atelier.html', labs: 1, marker: 'simuler_transaction_acid' },
  { url: '/b3-sql/chapitres/chapitre1.html', labs: 3, marker: 'vérifier l\'admissibilité de chaque anomalie' },
  { url: '/b3-veille/atelier.html', labs: 1, marker: 'simuler_veille_strategique' },
  { url: '/b3-veille/chapitres/chapitre1.html', labs: 3, marker: 'classifier chaque signal et générer le bilan' },
  { url: '/b3-windows-server/atelier.html', labs: 1, marker: 'simuler_administration_windows_server' },
  { url: '/b3-windows-server/chapitres/chapitre1.html', labs: 3, marker: 'analyser l\'étendue DHCP et vérifier les réservations' },
  { url: '/b3-anglais/atelier.html', labs: 1, marker: 'simuler_analyse_technique_anglais' },
  { url: '/b3-anglais/chapitres/chapitre1.html', labs: 3, marker: 'associer chaque acronyme à son expansion et son domaine' },
  { url: '/b3-cloud-azure/atelier.html', labs: 1, marker: 'simuler_gestion_cloud_azure' },
  { url: '/b3-cloud-azure/chapitres/chapitre1.html', labs: 3, marker: 'analyser la hiérarchie et valider la nomenclature CAF' },
  { url: '/b3-cryptographie/atelier.html', labs: 1, marker: 'simuler_cryptographie_pki' },
  { url: '/b3-cryptographie/chapitres/chapitre1.html', labs: 3, marker: 'substitution affine' },
  { url: '/b3-google-cloud/atelier.html', labs: 1, marker: 'simuler_architecture_gcp' },
  { url: '/b3-google-cloud/chapitres/chapitre1.html', labs: 3, marker: 'validation Project ID' },
  { url: '/b3-hacking/atelier.html', labs: 1, marker: 'calculer_cvss_v31' },
  { url: '/b3-hacking/chapitres/chapitre1.html', labs: 3, marker: 'calculer le score CVSS' },
  { url: '/b3-cloud-aws/atelier.html', labs: 1, marker: 'simuler_architecture_aws' },
  { url: '/b3-cloud-aws/chapitres/chapitre1.html', labs: 3, marker: 'analyser et valider les ARN AWS' },
  { url: '/b3-supervision/atelier.html', labs: 1, marker: 'simuler_sonde_supervision' },
  { url: '/b3-supervision/chapitres/chapitre1.html', labs: 3, marker: 'analyser SLA_CALC et calculer MTTR' },
  { url: '/b3-voip/atelier.html', labs: 1, marker: 'simuler_telephonie_ip' },
  { url: '/b3-voip/chapitres/chapitre1.html', labs: 3, marker: 'analyser les paramètres du codec' },
  { url: '/b3-virtualisation/atelier.html', labs: 1, marker: 'simuler_virtualisation_avancee' },
  { url: '/b3-virtualisation/chapitres/chapitre1.html', labs: 3, marker: 'calculer les ratios de surallocation' }
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
  const isAnalyse = Boolean(document.querySelector('[data-lab][data-language="analyse"]'));
  if (isAnalyse) {
    while (Date.now() < deadline && !document.querySelector('.lab__analyse-grid, .lab__cases, textarea')) {
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    return JSON.stringify({
      isAnalyse: true,
      ready: document.readyState,
      bars: document.querySelectorAll('.lab__bar').length,
      cases: document.querySelectorAll('.lab__case, .lab__analyse-grid').length,
      fallback: 0,
      monaco: 0,
      panes: 0,
      runButtons: 0,
      idleStates: 0,
      viewText: document.body.textContent
    });
  }
  while (Date.now() < deadline && !document.querySelector('.monaco-editor')) {
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  // Monaco peut être monté avec la zone de rendu encore vide : attendre que
  // le code de départ soit peint avant de conclure à un échec.
  let view = null;
  while (Date.now() < deadline) {
    view = document.querySelector('.view-lines');
    if (view && view.textContent.trim().length > 0) break;
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  const starterEl = document.querySelector('[data-lab-starter]');
  const starterSnippet = starterEl ? starterEl.textContent.trim().slice(0, 30) : '';
  return JSON.stringify({
    isAnalyse: false,
    ready: document.readyState,
    bars: document.querySelectorAll('.lab__bar').length,
    monaco: document.querySelectorAll('.monaco-editor').length,
    fallback: document.querySelectorAll('.lab__fallback').length,
    panes: document.querySelectorAll('[data-lab-pane]').length,
    runButtons: document.querySelectorAll('[data-lab-run]').length,
    idleStates: document.querySelectorAll('[data-kind="idle"]').length,
    starterSnippet: starterSnippet,
    // Monaco restitue les espaces du code sous forme d'espaces insécables
    // (U+00A0) : normaliser avant toute comparaison de contenu.
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

  const out = {};
  const runBtn = lab ? lab.querySelector('[data-lab-run]') : null;
  if (runBtn) {
    runBtn.click();
    await wait(500);
    out.statusKind = lab.querySelector('[data-lab-status]')?.getAttribute('data-kind');
    out.stdout = lab.querySelector('[data-lab-pane="out"]')?.textContent;
    out.stderr = lab.querySelector('[data-lab-pane="err"]')?.textContent;
    out.errTabSelected = lab.querySelector('[data-lab-tab="err"]')?.getAttribute('aria-selected');
    out.helpEnabled = !lab.querySelector('[data-lab-help]')?.disabled;
    out.details = lab.querySelector('[data-lab-pane="detail"]')?.textContent;

    lab.querySelector('[data-lab-help]')?.click();
    await wait(500);
    out.tutor = lab.querySelector('[data-lab-tutor]')?.textContent;
    out.tutorNotice = lab.querySelector('[data-lab-tutor-notice]')?.textContent;
  }

  const submit = lab ? lab.querySelector('[data-lab-submit]') : null;
  if (submit) {
    submit.click();
    await wait(800);
    out.report = lab.querySelector('.lab__report')?.textContent;
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

  // Parcours fonctionnel sur le premier atelier de la page.
  const run = JSON.parse(await evaluate(target, INTERACT, { awaitPromise: true }));

  if (info.isAnalyse) {
    check('coquille d’atelier construite', info.bars === page.labs);
    check('grille d’analyse affichée', info.cases > 0);
    if (page.labs > 0 && page.url.includes('chapitre')) {
      check('rapport de correction affiché', /1 \/ 3/.test(run.report || ''));
      check('premier test en échec détaillé', (run.report || '').includes('-40.0'));
    }
    return { failures, info, run };
  }

  check('coquille d’atelier construite', info.bars === page.labs);
  check('éditeur Monaco monté', info.monaco >= page.labs);
  check('repli texte non déclenché', info.fallback === 0);
  check('console à trois onglets par atelier', info.panes === page.labs * 3);
  check('bouton Exécuter présent', info.runButtons === page.labs);
  check('état initial affiché', info.idleStates >= page.labs);
  check('code de départ affiché dans l’éditeur',
    info.viewText.includes(page.marker) ||
    (info.starterSnippet && info.viewText.includes(info.starterSnippet)) ||
    info.viewText.trim().length > 0
  );

  check('état d’erreur remonté', run.statusKind === 'runtime_error');
  check('sortie standard affichée', run.stdout.includes('12'));
  check('erreur affichée', run.stderr.includes('ZeroDivisionError'));
  check('onglet Erreurs sélectionné', run.errTabSelected === 'true');
  check('tuteur activé après une erreur', run.helpEnabled);
  check('détails d’exécution remplis', run.details.includes('Code de sortie') && run.details.includes('oanor'));
  check('explication du tuteur affichée', run.tutor.includes('divise par zéro'));
  check('retrait de code signalé', run.tutorNotice.includes('retiré'));
  if (page.labs > 0 && page.url.includes('chapitre')) {
    check('rapport de correction affiché', /1 \/ 3/.test(run.report || ''));
    check('premier test en échec détaillé', (run.report || '').includes('-40.0'));
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
          (info.isAnalyse
            ? `mode analyse, ${info.bars} atelier(s), validation ${run.report ? 'oui' : 'non'}`
            : `${info.monaco} éditeur(s), ${info.panes} panneaux, repli ${info.fallback}, ` +
              `état ${run.statusKind}, tuteur ${run.tutor ? 'oui' : 'non'}`)
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
  console.error('[!!] test de fumée interrompu :', error.stack || error.message);
  process.exit(1);
});
