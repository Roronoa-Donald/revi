/**
 * Simulateur SQL du cours b1-sql.
 *
 * Un vrai moteur SQLite (sql.js, WebAssembly) tourne dans le navigateur : la
 * base parc_auto du support y est créée au chargement, l'éditeur exécute des
 * requêtes en réel, le résultat s'affiche en tableau. Aucun réseau : tout se
 * passe dans la page, et « Réinitialiser » reconstruit la base initiale.
 *
 * La page atelier.html porte la coquille (#sqlsim, #sqlsim-query, etc.) ;
 * ce script la peuple et l'anime. La base est réécrite à chaque « Réinitialiser »
 * à partir de PARC_SQL (embarqué ci-dessous, issu de la base de vérification).
 */
'use strict';

(function () {
  // ========================
  // Base de référence (identique à la base de vérification du cours)
  // ========================

  const PARC_SQL = [
    'PRAGMA foreign_keys = ON;',
    'CREATE TABLE Marque (',
    '  codemarque TEXT NOT NULL PRIMARY KEY,',
    '  nommarque  TEXT NOT NULL UNIQUE,',
    '  paysmarque TEXT NOT NULL,',
    '  UNIQUE (codemarque, nommarque)',
    ');',
    'CREATE TABLE Voiture (',
    '  immat     TEXT NOT NULL PRIMARY KEY,',
    '  marque    TEXT NOT NULL,',
    '  codemarque TEXT NOT NULL,',
    '  moteur    TEXT NOT NULL,',
    '  datecirc  TEXT,',
    '  km        INTEGER NOT NULL,',
    '  pxachat   INTEGER NOT NULL,',
    '  nbreplace INTEGER NOT NULL,',
    '  FOREIGN KEY (codemarque, marque) REFERENCES Marque (codemarque, nommarque)',
    ');',
    'CREATE TABLE Equipement (',
    '  codeequipement TEXT NOT NULL PRIMARY KEY,',
    '  nomequipement TEXT NOT NULL UNIQUE,',
    '  prix INTEGER DEFAULT 0',
    ');',
    'CREATE TABLE VoitureEquipement (',
    '  immat TEXT NOT NULL,',
    '  codeequipement TEXT NOT NULL,',
    '  PRIMARY KEY (immat, codeequipement),',
    '  FOREIGN KEY (immat) REFERENCES Voiture (immat) ON DELETE CASCADE,',
    '  FOREIGN KEY (codeequipement) REFERENCES Equipement (codeequipement) ON DELETE CASCADE',
    ');',
    "INSERT INTO Marque (codemarque, nommarque, paysmarque) VALUES",
    "('TOY','TOYOTA','JAPON'),('MIT','MITSUBISHI','JAPON'),('MAZ','MAZDA','JAPON'),",
    "('NIS','NISSAN','JAPON'),('SUZ','SUZUKI','JAPON'),('BNZ','MERCEDES BENZ','ALLEMAGNE'),",
    "('BMW','BMW','ALLEMAGNE'),('KIA','KIA','COREE DU SUD'),('HYU','HYUNDAI','COREE DU SUD'),",
    "('REN','RENAULT','FRANCE'),('PEU','PEUGEOT','FRANCE'),('MG','MG','ROYAUME-UNI');",
    "INSERT INTO Voiture (immat, marque, codemarque, moteur, datecirc, km, pxachat, nbreplace) VALUES",
    "('TG-7854-Z','MERCEDES BENZ','BNZ','DIESEL','2000-01-21',500,6000000,5),",
    "('TG-6733-AB','MERCEDES BENZ','BNZ','DIESEL','2002-01-21',0,16000000,5),",
    "('TG-2020-AC','MERCEDES BENZ','BNZ','ESSENCE','2003-03-21',0,9000000,5),",
    "('TG-3733-AC','TOYOTA','TOY','HYBRIDE','2010-01-21',0,20000000,7),",
    "('TG-6733-AC','MERCEDES BENZ','BNZ','DIESEL','2012-01-21',0,9600000,5),",
    "('TG-5420-AF','SUZUKI','SUZ','ELECTRIQUE','2013-01-21',10000,21600000,5),",
    "('TG-9420-AF','TOYOTA','TOY','ESSENCE','2013-09-21',0,50000000,7),",
    "('TG-1200-AK','SUZUKI','SUZ','ELECTRIQUE','2014-01-21',0,11600000,5),",
    "('TG-9420-AK','TOYOTA','TOY','ESSENCE','2014-09-21',100,50000000,7),",
    "('TG-0020-AL','TOYOTA','TOY','DIESEL','2014-11-21',0,50000000,7),",
    "('TG-4444-AL','HYUNDAI','HYU','ESSENCE','2015-09-21',5,10000000,5),",
    "('TG-5420-AL','BMW','BMW','ESSENCE','2015-10-21',0,50000000,7),",
    "('TG-0020-AV','MITSUBISHI','MIT','ESSENCE','2018-10-21',30,50000000,7),",
    "('TG-0480-AV','BMW','BMW','ELECTRIQUE','2015-12-21',0,50000000,5),",
    "('TG-1420-AW','MAZDA','MAZ','ESSENCE','2016-02-01',0,17000000,5),",
    "('TG-2540-AW','KIA','KIA','ESSENCE','2016-10-21',0,50000000,7),",
    "('TG-5220-BA','NISSAN','NIS','ESSENCE','2019-10-21',6700,10000000,5),",
    "('TG-2222-BC','RENAULT','REN','DIESEL','2020-01-20',0,15000000,5),",
    "('TG-3333-BC','PEUGEOT','PEU','ESSENCE','2021-03-15',0,20000000,5),",
    "('TG-4444-BC','PEUGEOT','PEU','DIESEL','2021-06-10',25000,30000000,7),",
    "('TG-5555-BC','MG','MG','ESSENCE','2022-08-01',0,20000000,5),",
    "('TG-6666-BC','TOYOTA','TOY','HYBRIDE','2023-05-20',0,25000000,7),",
    "('TG-7777-BC','HYUNDAI','HYU','ELECTRIQUE','2023-09-12',0,23000000,5);",
    "INSERT INTO Equipement (codeequipement, nomequipement, prix) VALUES",
    "('AIR','Climatisation',0),('GPS','Navigation GPS',450000),",
    "('CAM','Camera de recul',200000),('RAD','Autoradio',NULL);",
    "INSERT INTO VoitureEquipement (immat, codeequipement) VALUES",
    "('TG-7854-Z','AIR'),('TG-3733-AC','AIR'),('TG-3733-AC','GPS'),",
    "('TG-9420-AF','GPS'),('TG-0020-AV','CAM'),('TG-0480-AV','RAD');"
  ].join('\n');

  const STORAGE_KEY = 'b1sql:simulateur:script';

  // Missions : la réponse de référence est vérifiée contre la base réelle
  // (les requêtes de référence sont exécutées par la base de vérification
  // du cours ; les valeurs ci-dessous sont issues de cette exécution).
  const MISSIONS = [
    {
      id: 'm1',
      title: 'Mission 1 — Le parc en vrac',
      level: 'n1',
      brief: 'Affiche toutes les colonnes de toutes les voitures.',
      sql: 'SELECT * FROM Voiture;',
      expectRows: 23,
      firstRow: ['TG-7854-Z', 'MERCEDES BENZ', 'BNZ', 'DIESEL', '2000-01-21', '500', '6000000', '5']
    },
    {
      id: 'm2',
      title: 'Mission 2 — Diesels de luxe',
      level: 'n1',
      brief: 'Les voitures diesel de plus de 20 millions, du plus cher au moins cher (immat, marque, prix).',
      sql: 'SELECT immat, marque, pxachat FROM Voiture\nWHERE moteur = \'DIESEL\' AND pxachat > 20000000\nORDER BY pxachat DESC;',
      ordered: true,
      expectRows: 2,
      firstRow: ['TG-0020-AL', 'TOYOTA', '50000000']
    },
    {
      id: 'm3',
      title: 'Mission 3 — Doublons et comptages',
      level: 'n2',
      brief: 'Les types de moteurs sans doublon, puis le nombre de marques distinctes.',
      sql: 'SELECT DISTINCT moteur FROM Voiture;\nSELECT COUNT(DISTINCT marque) FROM Voiture;',
      expectRows: 1,
      firstRow: ['12'],
      acceptsFirstColumn: true
    },
    {
      id: 'm4',
      title: 'Mission 4 — Le podium des prix',
      level: 'n2',
      brief: 'Les 3 voitures les plus chères (immat, marque, prix), à immatriculation croissante en cas d’égalité.',
      sql: 'SELECT immat, marque, pxachat FROM Voiture\nORDER BY pxachat DESC, immat ASC\nLIMIT 3;',
      ordered: true,
      expectRows: 3,
      firstRow: ['TG-0020-AL', 'TOYOTA', '50000000']
    },
    {
      id: 'm5',
      title: 'Mission 5 — Voitures japonaises',
      level: 'n2',
      brief: 'Les voitures de marques japonaises (immat, marque, pays), triées par immatriculation.',
      sql: 'SELECT V.immat, V.marque, M.paysmarque\nFROM Voiture V\nINNER JOIN Marque M ON V.codemarque = M.codemarque\nWHERE M.paysmarque = \'JAPON\'\nORDER BY V.immat;',
      ordered: true,
      expectRows: 10,
      firstRow: ['TG-0020-AL', 'TOYOTA', 'JAPON']
    },
    {
      id: 'm6',
      title: 'Mission 6 — Les absentes du parc',
      level: 'n3',
      brief: 'Les marques de la table Marque sans aucune voiture dans le parc (nom, pays).',
      sql: 'SELECT M.nommarque, M.paysmarque\nFROM Marque M\nLEFT JOIN Voiture V ON V.codemarque = M.codemarque\nGROUP BY M.nommarque, M.paysmarque\nHAVING COUNT(V.immat) = 0;',
      expectRows: 0,
      firstRow: null
    },
    {
      id: 'm7',
      title: 'Mission 7 — Budget par pays',
      level: 'n3',
      brief: 'Le budget total des voitures par pays d’origine, du plus coûteux au moins coûteux.',
      sql: 'SELECT M.paysmarque, SUM(V.pxachat) AS budget\nFROM Voiture V\nINNER JOIN Marque M ON V.codemarque = M.codemarque\nGROUP BY M.paysmarque\nORDER BY budget DESC;',
      ordered: true,
      expectRows: 5,
      firstRow: ['JAPON', '305200000']
    },
    {
      id: 'm8',
      title: 'Mission 8 — Panier moyen par moteur',
      level: 'n3',
      brief: 'Par moteur : nombre, prix moyen (tronqué), prix maximum — moteurs avec au moins 4 voitures.',
      sql: 'SELECT moteur, COUNT(*) AS nb, CAST(AVG(pxachat) AS INT) AS moyen, MAX(pxachat) AS maxi\nFROM Voiture\nGROUP BY moteur\nHAVING COUNT(*) >= 4\nORDER BY nb DESC;',
      ordered: true,
      expectRows: 3,
      firstRow: ['ESSENCE', '11', '30545454', '50000000']
    }
  ];

  const EXAMEN = {
    title: 'Mode examen — 60 minutes',
    brief: 'Quatre exercices à écrire sans aide, puis à vérifier dans le simulateur : ' +
      '1) voitures diesel avant 2015, de la plus ancienne à la plus récente (immat, marque, date) ; ' +
      '2) nombre de voitures et prix moyen par type de moteur ; ' +
      '3) voitures japonaises (immat, marque) triées par immatriculation ; ' +
      '4) marques avec strictement plus de deux voitures, du plus grand effectif au plus petit.',
    queries: [
      'SELECT immat, marque, datecirc FROM Voiture WHERE moteur = \'DIESEL\' AND datecirc < \'2015-01-01\' ORDER BY datecirc;',
      'SELECT moteur, COUNT(*), AVG(pxachat) FROM Voiture GROUP BY moteur;',
      'SELECT V.immat, V.marque FROM Voiture V INNER JOIN Marque M ON V.codemarque = M.codemarque WHERE M.paysmarque = \'JAPON\' ORDER BY V.immat;',
      'SELECT marque, COUNT(*) AS nb FROM Voiture GROUP BY marque HAVING COUNT(*) > 2 ORDER BY nb DESC;'
    ]
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PARC_SQL, MISSIONS, EXAMEN };
  }
  if (typeof document === 'undefined') {
    if (typeof self !== 'undefined') self.SqlSimulatorData = { PARC_SQL, runOnDatabase };
    return;
  }

  // ========================
  // Utilitaires
  // ========================

  function esc(value) {
    return String(value === null || value === undefined ? '' : value)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // ========================
  // État
  // ========================

  let SQL = null;
  let db = null;
  let databaseReady = false;
  let executing = false;
  let pendingQuery = null;
  let lastTable = null;   // dernier résultat tabulaire (pour l'export CSV)
  const logEntries = [];
  const completedMissions = new Set();

  function setState(text, kind) {
    const el = document.getElementById('sqlsim-state');
    if (!el) return;
    el.textContent = text;
    el.classList.toggle('sqlsim__state--error', kind === 'error');
    el.classList.toggle('sqlsim__state--ok', kind === 'ok');
  }

  function log(kind, text) {
    logEntries.push({ kind, text });
    const logPane = document.getElementById('sqlsim-log');
    if (!logPane) return;
    const line = document.createElement('div');
    line.className = 'sqlsim__logline sqlsim__logline--' + kind;
    line.textContent = text;
    logPane.appendChild(line);
    logPane.scrollTop = logPane.scrollHeight;
  }

  function refreshControls() {
    const run = document.getElementById('sqlsim-run');
    const reset = document.getElementById('sqlsim-reset');
    if (run) run.disabled = !databaseReady || executing;
    if (reset) reset.disabled = !SQL || executing || Boolean(db && !databaseReady);
  }

  function buildDatabase() {
    if (db) db.terminate();
    db = null;
    databaseReady = false;
    refreshControls();
    return new Promise((resolve, reject) => {
      let worker;
      try {
        worker = new Worker('/b1-sql/assets/js/sql-simulator-worker.js');
      } catch (error) {
        reject(new Error('Le navigateur ne permet pas de démarrer le simulateur SQL isolé.'));
        return;
      }
      db = worker;
      let initialized = false;
      const startupTimer = setTimeout(() => {
        if (initialized || db !== worker) return;
        worker.terminate();
        db = null;
        refreshControls();
        reject(new Error('Le moteur SQL n’a pas démarré dans le délai prévu.'));
      }, 10000);
      worker.onmessage = event => {
        if (db !== worker) return;
        const message = event.data || {};
        if (message.type === 'ready') {
          clearTimeout(startupTimer);
          initialized = true;
          databaseReady = true;
          refreshControls();
          resolve();
        } else if (message.type === 'initialization_error') {
          clearTimeout(startupTimer);
          worker.terminate();
          db = null;
          refreshControls();
          reject(new Error(message.error || 'Impossible de charger le moteur SQL.'));
        } else if (message.type === 'result' && pendingQuery && pendingQuery.worker === worker) {
          const pending = pendingQuery;
          pendingQuery = null;
          clearTimeout(pending.timer);
          if (message.error) pending.reject(new Error(message.error));
          else pending.resolve(message.payload);
        }
      };
      worker.onerror = () => {
        if (db !== worker) return;
        clearTimeout(startupTimer);
        worker.terminate();
        db = null;
        databaseReady = false;
        refreshControls();
        const error = new Error('Le moteur SQL isolé s’est arrêté. Réinitialisez la base pour continuer.');
        if (pendingQuery && pendingQuery.worker === worker) {
          const pending = pendingQuery;
          pendingQuery = null;
          clearTimeout(pending.timer);
          pending.reject(error);
        } else if (!initialized) {
          reject(error);
        } else {
          setState(error.message, 'error');
        }
      };
      worker.postMessage({ type: 'initialize' });
    });
  }

  // ========================
  // Exécution
  // ========================

  function runOnDatabase(database, sql) {
    let result = null;
    const tables = [];
    let resultSize = 0;
    let statementCount = 0;
    function accountFor(values) {
      for (const value of values) {
        const size = ArrayBuffer.isView(value) ? value.byteLength * 4 : String(value === null ? 'NULL' : value).length * 2;
        resultSize += 16 + size;
        if (resultSize > 1000000) throw new Error('La limite de taille des résultats est atteinte (environ 1 Mo).');
      }
    }
    for (const prepared of database.iterateStatements(sql)) {
      statementCount++;
      try {
        const columns = prepared.getColumnNames();
        accountFor(columns);
        const rows = [];
        while (prepared.step()) {
          if (rows.length >= 2000) throw new Error('Le résultat dépasse la limite de 2 000 lignes.');
          const row = prepared.get();
          accountFor(row);
          rows.push(row);
        }
        result = columns.length ? { columns, rows } : null;
        if (result) tables.push(result);
      } finally {
        prepared.free();
      }
    }

    if (!statementCount) throw new Error('Aucune requête à exécuter : écrivez une instruction SQL.');

    if (!result) {
      return { kind: 'ok', tables, message: 'Requête exécutée (pas de résultat tabulaire à afficher — SELECT pour lire).' };
    }

    return {
      kind: 'table',
      columns: result.columns,
      rows: result.rows,
      tables
    };
  }

  function runQuery(sql) {
    const worker = db;
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        if (!pendingQuery || pendingQuery.worker !== worker) return;
        pendingQuery = null;
        worker.terminate();
        db = null;
        databaseReady = false;
        refreshControls();
        reject(new Error('Délai dépassé : la base est réinitialisée et ses modifications précédentes sont perdues.'));
        buildDatabase().then(() => {
          setState('Délai dépassé — base réinitialisée', 'error');
          checkMissions();
        }).catch(error => setState(error.message, 'error'));
      }, 4000);
      pendingQuery = { worker, timer, resolve, reject };
      try {
        worker.postMessage({ type: 'execute', sql });
      } catch (error) {
        pendingQuery = null;
        clearTimeout(timer);
        reject(error);
      }
    });
  }

  function renderTable(payload) {
    const tableEl = document.getElementById('sqlsim-table');
    const metaEl = document.getElementById('sqlsim-meta');
    if (!tableEl || !metaEl) return;

    tableEl.innerHTML = '';
    lastTable = payload;

    metaEl.textContent = payload.rows.length + (payload.rows.length === 1 ? ' ligne' : ' lignes') +
      ' — ' + payload.columns.join(', ');

    if (!payload.rows.length) {
      tableEl.innerHTML = '<p class="sqlsim__empty">Aucune ligne : la requête est correcte mais le filtre ne retient rien.</p>';
      return;
    }

    const table = document.createElement('table');
    table.className = 'sqlsim__grid-table';
    const thead = document.createElement('thead');
    const headRow = document.createElement('tr');
    for (const column of payload.columns) {
      const th = document.createElement('th');
      th.textContent = column;
      headRow.appendChild(th);
    }
    thead.appendChild(headRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    for (const row of payload.rows) {
      const tr = document.createElement('tr');
      for (const cell of row) {
        const td = document.createElement('td');
        td.textContent = cell === null ? 'NULL' : String(cell);
        if (cell === null) td.classList.add('sqlsim__null');
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    tableEl.appendChild(table);
  }

  function renderOk(message) {
    const tableEl = document.getElementById('sqlsim-table');
    const metaEl = document.getElementById('sqlsim-meta');
    lastTable = null;
    if (metaEl) metaEl.textContent = '';
    if (tableEl) tableEl.innerHTML = '<p class="sqlsim__empty">' + esc(message) + '</p>';
  }

  async function execute() {
    const textarea = document.getElementById('sqlsim-query');
    if (!textarea || !db || !databaseReady || executing) return;
    const sql = textarea.value;
    executing = true;
    refreshControls();
    setState('Exécution en cours…', '');

    try {
      const payload = await runQuery(sql);
      if (payload.kind === 'table') renderTable(payload);
      else renderOk(payload.message);
      log('ok', 'Exécution réussie (' + sql.replace(/\s+/g, ' ').slice(0, 60) + (sql.length > 60 ? '…' : '') + ')');
      try { localStorage.setItem(STORAGE_KEY, sql); } catch (e) { /* stockage indisponible */ }
      setState('Exécution réussie', 'ok');
      checkMissions(payload);
    } catch (error) {
      renderOk('Erreur : ' + error.message);
      log('err', error.message);
      setState('Erreur — consultez le journal', 'error');
    } finally {
      executing = false;
      refreshControls();
    }
  }

  // ========================
  // Missions et examen
  // ========================

  function sameTables(actual, expected, ordered) {
    if (actual.length !== expected.length) return false;
    return actual.every((table, index) => {
      const reference = expected[index];
      if (table.columns.length !== reference.columns.length || table.rows.length !== reference.rows.length) return false;
      if (!table.rows.length && table.columns.some((column, position) =>
        column.toLowerCase() !== reference.columns[position].toLowerCase())) return false;
      const actualRows = table.rows.map(row => JSON.stringify(row));
      const referenceRows = reference.rows.map(row => JSON.stringify(row));
      if (!ordered) { actualRows.sort(); referenceRows.sort(); }
      return actualRows.every((row, position) => row === referenceRows[position]);
    });
  }

  function checkMissions(payload) {
    const zone = document.getElementById('sqlsim-missions');
    if (!zone || !db) return;
    let referenceDb = null;
    if (payload && payload.kind === 'table') {
      referenceDb = new SQL.Database();
      referenceDb.exec(PARC_SQL);
    }
    for (const mission of MISSIONS) {
      const el = document.getElementById('sqlsim-mission-' + mission.id);
      if (!el) continue;
      if (referenceDb) {
        const reference = runOnDatabase(referenceDb, mission.sql);
        if (sameTables(payload.tables, reference.tables, mission.ordered)) completedMissions.add(mission.id);
      }
      const done = completedMissions.has(mission.id);
      el.classList.toggle('sqlsim__mission--done', done);
      el.classList.remove('sqlsim__mission--partial');
      const badge = el.querySelector('.sqlsim__mission-state');
      if (badge) badge.textContent = done ? 'résultat conforme' : 'à faire';
    }
    if (referenceDb) referenceDb.close();
  }

  function renderMissions() {
    const zone = document.getElementById('sqlsim-missions');
    if (!zone) return;
    const items = MISSIONS.map(mission =>
      '<details class="sqlsim__mission" id="sqlsim-mission-' + mission.id + '">' +
      '<summary><b>' + esc(mission.title) + '</b>' +
      '<span class="sqlsim__mission-badge badge badge--' + mission.level + '">' + mission.level.toUpperCase() + '</span>' +
      '<span class="sqlsim__mission-state">à faire</span></summary>' +
      '<p>' + esc(mission.brief) + '</p>' +
      '<details><summary>Requête de référence (après avoir essayé)</summary>' +
      '<pre><code>' + esc(mission.sql) + '</code></pre></details>' +
      '</details>'
    ).join('');
    zone.innerHTML = '<h3>Missions guidées</h3>' + items;

    const examen = document.createElement('details');
    examen.className = 'sqlsim__mission sqlsim__mission--examen';
    examen.id = 'sqlsim-examen';
    examen.innerHTML =
      '<summary><b>' + esc(EXAMEN.title) + '</b>' +
      '<span class="sqlsim__mission-badge badge badge--n4">EXAMEN</span>' +
      '<span class="sqlsim__mission-state">à faire</span></summary>' +
      '<p>' + esc(EXAMEN.brief) + '</p>' +
      '<p><button class="btn" id="sqlsim-examen-start">' + 'Charger l’éditeur (page vierge)' + '</button> ' +
      '<button class="btn" id="sqlsim-examen-show">Comparer aux requêtes de référence</button></p>' +
      '<details><summary>Requêtes de référence</summary><pre><code>' +
      esc(EXAMEN.queries.join('\n\n')) + '</code></pre></details>';
    zone.appendChild(examen);

    document.getElementById('sqlsim-examen-start').addEventListener('click', function () {
      const textarea = document.getElementById('sqlsim-query');
      if (textarea) { textarea.value = '-- Mode examen : écris ici tes 4 requêtes.\n'; textarea.focus(); }
    });
    document.getElementById('sqlsim-examen-show').addEventListener('click', function () {
      const textarea = document.getElementById('sqlsim-query');
      if (textarea) {
        textarea.value = EXAMEN.queries.join(';\n\n') + ';';
      }
    });
  }

  // ========================
  // Export CSV
  // ========================

  function exportCsv() {
    if (!lastTable) {
      setState('Rien à exporter : exécute d’abord une requête qui renvoie des lignes', 'error');
      return;
    }
    const lines = [lastTable.columns.join(',')];
    for (const row of lastTable.rows) {
      lines.push(row.map(cell => {
        const value = cell === null || cell === undefined ? '' : String(cell);
        return /[",\n]/.test(value) ? '"' + value.replace(/"/g, '""') + '"' : value;
      }).join(','));
    }
    const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'resultat-sql.csv';
    document.body.appendChild(link);
    link.click();
    link.remove();
    setState('Résultat exporté en CSV', 'ok');
  }

  // ========================
  // Onglets
  // ========================

  function bindTabs() {
    const tabs = [
      { tab: 'sqlsim-tab-table', pane: 'sqlsim-pane-table' },
      { tab: 'sqlsim-tab-log', pane: 'sqlsim-pane-log' }
    ];
    for (const { tab, pane } of tabs) {
      const tabEl = document.getElementById(tab);
      if (!tabEl) continue;
      tabEl.addEventListener('click', function () {
        for (const other of tabs) {
          document.getElementById(other.tab).classList.toggle('is-active', other.tab === tab);
          document.getElementById(other.pane).classList.toggle('is-hidden', other.pane !== pane);
        }
      });
    }
  }

  // ========================
  // Démarrage
  // ========================

  function loadEngine() {
    if (typeof initSqlJs !== 'function') {
      setState('Moteur SQL introuvable (sql-wasm.js non chargé)', 'error');
      return;
    }
    initSqlJs({ locateFile: file => '/b1-sql/assets/vendor/sqljs/' + file })
      .then(async engine => {
        SQL = engine;
        await buildDatabase();
        setState('Base parc_auto prête — 12 marques, 23 voitures', 'ok');
        checkMissions();
      })
      .catch(error => setState(error.message || 'Impossible de charger le moteur SQL (WebAssembly)', 'error'));
  }

  function init() {
    const root = document.getElementById('sqlsim');
    if (!root) return;

    const textarea = document.getElementById('sqlsim-query');
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && textarea) textarea.value = saved;
    } catch (e) { /* stockage indisponible */ }

    refreshControls();
    document.getElementById('sqlsim-run').addEventListener('click', execute);
    document.getElementById('sqlsim-reset').addEventListener('click', async function () {
      if (executing) return;
      executing = true;
      refreshControls();
      try {
        await buildDatabase();
        completedMissions.clear();
        renderOk('Base parc_auto réinitialisée (12 marques, 23 voitures).');
        setState('Base réinitialisée', 'ok');
        log('ok', 'Base réinitialisée');
        checkMissions();
      } catch (error) {
        setState(error.message, 'error');
      } finally {
        executing = false;
        refreshControls();
      }
    });
    document.getElementById('sqlsim-export').addEventListener('click', exportCsv);

    textarea.addEventListener('keydown', function (event) {
      if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        event.preventDefault();
        execute();
      }
    });

    bindTabs();
    renderMissions();
    loadEngine();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
