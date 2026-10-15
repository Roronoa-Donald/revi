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
    'CREATE TABLE Marque (',
    '  codemarque TEXT PRIMARY KEY,',
    '  nommarque  TEXT NOT NULL,',
    '  paysmarque TEXT NOT NULL',
    ');',
    'CREATE TABLE Voiture (',
    '  immat     TEXT PRIMARY KEY,',
    '  marque    TEXT NOT NULL,',
    '  moteur    TEXT NOT NULL,',
    '  datecirc  TEXT,',
    '  km        INTEGER NOT NULL,',
    '  pxachat   INTEGER NOT NULL,',
    '  nbreplace INTEGER NOT NULL',
    ');',
    "INSERT INTO Marque (codemarque, nommarque, paysmarque) VALUES",
    "('TOY','TOYOTA','JAPON'),('MIT','MITSUBISHI','JAPON'),('MAZ','MAZDA','JAPON'),",
    "('NIS','NISSAN','JAPON'),('SUZ','SUZUKI','JAPON'),('BNZ','MERCEDES BENZ','ALLEMAGNE'),",
    "('BMW','BMW','ALLEMAGNE'),('KIA','KIA','COREE DU SUD'),('HYU','HYUNDAI','COREE DU SUD'),",
    "('REN','RENAULT','FRANCE'),('PEU','PEUGEOT','FRANCE'),('MG','MG','ROYAUME-UNI');",
    "INSERT INTO Voiture (immat, marque, moteur, datecirc, km, pxachat, nbreplace) VALUES",
    "('TG-7854-Z','MERCEDES BENZ','DIESEL','2000-01-21',500,6000000,5),",
    "('TG-6733-AB','MERCEDES BENZ','DIESEL','2002-01-21',0,16000000,5),",
    "('TG-2020-AC','MERCEDES BENZ','ESSENCE','2003-03-21',0,9000000,5),",
    "('TG-3733-AC','TOYOTA','HYBRIDE','2010-01-21',0,20000000,7),",
    "('TG-6733-AC','MERCEDES BENZ','DIESEL','2012-01-21',0,9600000,5),",
    "('TG-5420-AF','SUZUKI','ELECTRIQUE','2013-01-21',10000,21600000,5),",
    "('TG-9420-AF','TOYOTA','ESSENCE','2013-09-21',0,50000000,7),",
    "('TG-1200-AK','SUZUKI','ELECTRIQUE','2014-01-21',0,11600000,5),",
    "('TG-9420-AK','TOYOTA','ESSENCE','2014-09-21',100,50000000,7),",
    "('TG-0020-AL','TOYOTA','DIESEL','2014-11-21',0,50000000,7),",
    "('TG-4444-AL','HYUNDAI','ESSENCE','2015-09-21',5,10000000,5),",
    "('TG-5420-AL','BMW','ESSENCE','2015-10-21',0,50000000,7),",
    "('TG-0020-AV','MITSUBISHI','ESSENCE','2018-10-21',30,50000000,7),",
    "('TG-0480-AV','BMW','ELECTRIQUE','2015-12-21',0,50000000,5),",
    "('TG-1420-AW','MAZDA','ESSENCE','2016-02-01',0,17000000,5),",
    "('TG-2540-AW','KIA','ESSENCE','2016-10-21',0,50000000,7),",
    "('TG-5220-BA','NISSAN','ESSENCE','2019-10-21',6700,10000000,5),",
    "('TG-2222-BC','RENAULT','DIESEL','2020-01-20',0,15000000,5),",
    "('TG-3333-BC','PEUGEOT','ESSENCE','2021-03-15',0,20000000,5),",
    "('TG-4444-BC','PEUGEOT','DIESEL','2021-06-10',25000,30000000,7),",
    "('TG-5555-BC','MG','ESSENCE','2022-08-01',0,20000000,5),",
    "('TG-6666-BC','TOYOTA','HYBRIDE','2023-05-20',0,25000000,7),",
    "('TG-7777-BC','HYUNDAI','ELECTRIQUE','2023-09-12',0,23000000,5);"
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
      firstRow: ['TG-7854-Z', 'MERCEDES BENZ', 'DIESEL', '2000-01-21', '500', '6000000', '5']
    },
    {
      id: 'm2',
      title: 'Mission 2 — Diesels de luxe',
      level: 'n1',
      brief: 'Les voitures diesel de plus de 20 millions, du plus cher au moins cher (immat, marque, prix).',
      sql: 'SELECT immat, marque, pxachat FROM Voiture\nWHERE moteur = \'DIESEL\' AND pxachat > 20000000\nORDER BY pxachat DESC;',
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
      brief: 'Les 3 voitures les plus chères (immat, marque, prix).',
      sql: 'SELECT immat, marque, pxachat FROM Voiture\nORDER BY pxachat DESC\nLIMIT 3;',
      expectRows: 3,
      firstRow: ['TG-0020-AL', 'TOYOTA', '50000000']
    },
    {
      id: 'm5',
      title: 'Mission 5 — Voitures japonaises',
      level: 'n2',
      brief: 'Les voitures de marques japonaises (immat, marque, pays), triées par immatriculation.',
      sql: 'SELECT V.immat, V.marque, M.paysmarque\nFROM Voiture V\nINNER JOIN Marque M ON V.marque = M.nommarque\nWHERE M.paysmarque = \'JAPON\'\nORDER BY V.immat;',
      expectRows: 10,
      firstRow: ['TG-0020-AL', 'TOYOTA', 'JAPON']
    },
    {
      id: 'm6',
      title: 'Mission 6 — Les absentes du parc',
      level: 'n3',
      brief: 'Les marques de la table Marque sans aucune voiture dans le parc (nom, pays).',
      sql: 'SELECT M.nommarque, M.paysmarque\nFROM Marque M\nLEFT JOIN Voiture V ON V.marque = M.nommarque\nGROUP BY M.nommarque, M.paysmarque\nHAVING COUNT(V.immat) = 0;',
      expectRows: 0,
      firstRow: null
    },
    {
      id: 'm7',
      title: 'Mission 7 — Budget par pays',
      level: 'n3',
      brief: 'Le budget total des voitures par pays d’origine, du plus coûteux au moins coûteux.',
      sql: 'SELECT M.paysmarque, SUM(V.pxachat) AS budget\nFROM Voiture V\nINNER JOIN Marque M ON V.marque = M.nommarque\nGROUP BY M.paysmarque\nORDER BY budget DESC;',
      expectRows: 5,
      firstRow: ['JAPON', '305200000']
    },
    {
      id: 'm8',
      title: 'Mission 8 — Panier moyen par moteur',
      level: 'n3',
      brief: 'Par moteur : nombre, prix moyen (tronqué), prix maximum — moteurs avec au moins 4 voitures.',
      sql: 'SELECT moteur, COUNT(*) AS nb, CAST(AVG(pxachat) AS INT) AS moyen, MAX(pxachat) AS maxi\nFROM Voiture\nGROUP BY moteur\nHAVING COUNT(*) >= 4\nORDER BY nb DESC;',
      expectRows: 2,
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
      'SELECT V.immat, V.marque FROM Voiture V INNER JOIN Marque M ON V.marque = M.nommarque WHERE M.paysmarque = \'JAPON\' ORDER BY V.immat;',
      'SELECT marque, COUNT(*) AS nb FROM Voiture GROUP BY marque HAVING COUNT(*) > 2 ORDER BY nb DESC;'
    ]
  };

  // ========================
  // Utilitaires
  // ========================

  function esc(value) {
    return String(value === null || value === undefined ? '' : value)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function splitStatements(sql) {
    const statements = [];
    let current = '';
    let inString = false;
    for (let i = 0; i < sql.length; i++) {
      const ch = sql[i];
      if (inString) {
        current += ch;
        if (ch === "'") {
          if (sql[i + 1] === "'") { current += "'"; i++; }
          else inString = false;
        }
        continue;
      }
      if (ch === "'") { inString = true; current += ch; continue; }
      if (ch === '-' && sql[i + 1] === '-') {
        while (i < sql.length && sql[i] !== '\n') i++;
        continue;
      }
      if (ch === '/' && sql[i + 1] === '*') {
        i += 2;
        while (i < sql.length && !(sql[i] === '*' && sql[i + 1] === '/')) i++;
        i++;
        continue;
      }
      if (ch === ';') { statements.push(current.trim()); current = ''; continue; }
      current += ch;
    }
    if (current.trim()) statements.push(current.trim());
    return statements.filter(s => s.length);
  }

  // ========================
  // État
  // ========================

  let SQL = null;
  let db = null;
  let lastTable = null;   // dernier résultat tabulaire (pour l'export CSV)
  const logEntries = [];

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

  function buildDatabase() {
    if (db) db.close();
    db = new SQL.Database();
    db.exec(PARC_SQL);
  }

  // ========================
  // Exécution
  // ========================

  function runQuery(sql) {
    const statements = splitStatements(sql);
    if (!statements.length) {
      throw new Error('Aucune requête à exécuter : écris une instruction SQL.');
    }

    let result = null;
    for (const statement of statements) {
      const trimmed = statement.toUpperCase();
      if (trimmed.startsWith('SELECT') || trimmed.startsWith('WITH') || trimmed.startsWith('PRAGMA')) {
        const output = db.exec(statement);
        if (output.length) result = output[0];
      } else {
        db.run(statement);
        result = null;
      }
    }

    if (!result) {
      return { kind: 'ok', message: 'Requête exécutée (pas de résultat tabulaire à afficher — SELECT pour lire).' };
    }

    return {
      kind: 'table',
      columns: result.columns,
      rows: result.values
    };
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

  function execute() {
    const textarea = document.getElementById('sqlsim-query');
    if (!textarea || !db) return;
    const sql = textarea.value;

    try {
      const payload = runQuery(sql);
      if (payload.kind === 'table') renderTable(payload);
      else renderOk(payload.message);
      log('ok', 'Exécution réussie (' + sql.replace(/\s+/g, ' ').slice(0, 60) + (sql.length > 60 ? '…' : '') + ')');
      try { localStorage.setItem(STORAGE_KEY, sql); } catch (e) { /* stockage indisponible */ }
      setState('Exécution réussie', 'ok');
      checkMissions();
    } catch (error) {
      renderOk('Erreur : ' + error.message);
      log('err', error.message);
      setState('Erreur — lis le journal', 'error');
    }
  }

  // ========================
  // Missions et examen
  // ========================

  function cellMatches(actual, expected) {
    if (actual === null || actual === undefined) return false;
    return String(actual) === String(expected);
  }

  function checkMissions() {
    const zone = document.getElementById('sqlsim-missions');
    if (!zone || !db) return;
    for (const mission of MISSIONS) {
      const el = document.getElementById('sqlsim-mission-' + mission.id);
      if (!el) continue;
      let state = 'todo';
      try {
        const output = db.exec(mission.sql);
        const result = output.length ? output[0] : null;
        if (result) {
          const rows = result.values;
          const rowsOk = rows.length === mission.expectRows;
          const firstOk = mission.firstRow === null
            ? rows.length === 0
            : (rows.length > 0 && mission.firstRow.every((expected, index) =>
                cellMatches(rows[0][index], expected)));
          state = rowsOk && firstOk ? 'done' : 'partial';
        }
      } catch (e) {
        state = 'todo';
      }
      el.classList.toggle('sqlsim__mission--done', state === 'done');
      el.classList.toggle('sqlsim__mission--partial', state === 'partial');
      const badge = el.querySelector('.sqlsim__mission-state');
      if (badge) {
        badge.textContent = state === 'done' ? 'validée'
          : state === 'partial' ? 'proche — compare ton résultat à la référence'
          : 'à faire';
      }
    }
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
    // sql.js expose initSqlJs (fichier vendorisé servi localement, wasm chargé
    // par fetch relatif — aucun CDN, la page reste utilisable hors ligne).
    if (typeof initSqlJs !== 'function') {
      setState('Moteur SQL introuvable (sql-wasm.js non chargé)', 'error');
      return;
    }
    initSqlJs({ locateFile: file => '/b1-sql/assets/vendor/sqljs/' + file })
      .then(engine => {
        SQL = engine;
        buildDatabase();
        setState('Base parc_auto prête — 12 marques, 23 voitures', 'ok');
        checkMissions();
      })
      .catch(() => setState('Impossible de charger le moteur SQL (WebAssembly)', 'error'));
  }

  function init() {
    const root = document.getElementById('sqlsim');
    if (!root) return;

    const textarea = document.getElementById('sqlsim-query');
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && textarea) textarea.value = saved;
    } catch (e) { /* stockage indisponible */ }

    document.getElementById('sqlsim-run').addEventListener('click', execute);
    document.getElementById('sqlsim-reset').addEventListener('click', function () {
      buildDatabase();
      renderOk('Base parc_auto réinitialisée (12 marques, 23 voitures).');
      setState('Base réinitialisée', 'ok');
      log('ok', 'Base réinitialisée');
      checkMissions();
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
