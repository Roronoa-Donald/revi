/**
 * Moteur d'exécution SQL dans le navigateur utilisant sql.js (SQLite WebAssembly).
 * Permet d'exécuter des requêtes DDL, DML et SELECT sans aucun appel réseau.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('./engine-interface'));
  } else {
    root.SqlWasmEngine = factory(root.ExecutionInterface);
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function (ExecutionInterface) {
  'use strict';

  var createResult = ExecutionInterface ? ExecutionInterface.createResult : function (r) { return r; };

  var sqlEnginePromise = null;
  var sharedDb = null;

  function loadSqlJs() {
    if (sqlEnginePromise) return sqlEnginePromise;

    sqlEnginePromise = new Promise(function (resolve, reject) {
      if (typeof window === 'undefined') {
        try {
          var pathMod = require('path');
          var initNodeSql = require(pathMod.resolve(__dirname, '../../../b1-sql/assets/vendor/sqljs/sql-wasm.js'));
          return initNodeSql().then(resolve).catch(reject);
        } catch (e) {
          return reject(e);
        }
      }

      function initEngine() {
        if (typeof window.initSqlJs !== 'function') {
          return reject(new Error('initSqlJs non disponible'));
        }
        window.initSqlJs({
          locateFile: function (file) {
            return '/b1-sql/assets/vendor/sqljs/' + file;
          }
        }).then(function (SQL) {
          resolve(SQL);
        }).catch(reject);
      }

      if (typeof window.initSqlJs === 'function') {
        initEngine();
      } else {
        var script = document.createElement('script');
        script.src = '/b1-sql/assets/vendor/sqljs/sql-wasm.js';
        script.onload = initEngine;
        script.onerror = function () {
          reject(new Error('Échec du chargement du script WebAssembly sql-wasm.js'));
        };
        document.head.appendChild(script);
      }
    });

    return sqlEnginePromise;
  }

  function splitSql(sql) {
    var statements = [];
    var current = '';
    var inString = false;
    for (var i = 0; i < sql.length; i++) {
      var ch = sql[i];
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
      if (ch === ';') {
        if (/\bCREATE\s+(?:TEMP(?:ORARY)?\s+)?TRIGGER\b/i.test(current) && !/\bEND\s*$/i.test(current)) {
          current += ch;
          continue;
        }
        if (current.trim()) statements.push(current.trim());
        current = '';
        continue;
      }
      current += ch;
    }
    if (current.trim()) statements.push(current.trim());
    return statements;
  }

  function formatAsciiTable(columns, values) {
    if (!columns || !columns.length) return '';
    var widths = columns.map(function (c) { return String(c).length; });

    for (var r = 0; r < values.length; r++) {
      var row = values[r];
      for (var c = 0; c < columns.length; c++) {
        var str = row[c] === null || row[c] === undefined ? 'NULL' : String(row[c]);
        if (str.length > widths[c]) widths[c] = str.length;
      }
    }

    function pad(str, len) {
      var s = String(str);
      while (s.length < len) s += ' ';
      return s;
    }

    function separator() {
      var parts = widths.map(function (w) { return '-'.repeat(w + 2); });
      return '+' + parts.join('+') + '+\n';
    }

    var out = separator();
    // En-têtes
    out += '| ' + columns.map(function (c, idx) { return pad(c, widths[idx]); }).join(' | ') + ' |\n';
    out += separator();

    // Lignes
    if (!values.length) {
      out += '| ' + pad('(0 ligne retournée)', widths.reduce(function (a, b) { return a + b + 3; }, 0) - 3) + ' |\n';
    } else {
      for (var i = 0; i < values.length; i++) {
        var curRow = values[i];
        out += '| ' + columns.map(function (c, idx) {
          var val = curRow[idx] === null || curRow[idx] === undefined ? 'NULL' : curRow[idx];
          return pad(val, widths[idx]);
        }).join(' | ') + ' |\n';
      }
    }

    out += separator();
    out += '(' + values.length + (values.length === 1 ? ' ligne retournée' : ' lignes retournées') + ')\n';
    return out;
  }

  function execute(sql, stdin, options) {
    var startTime = Date.now();

    return loadSqlJs().then(function (SQL) {
      // Base SQLite fraîche pour chaque exécution d'atelier pour garantir l'indépendance
      var db = new SQL.Database();
      var rawStdin = String(stdin || '');
      var setupSql = rawStdin;
      var verifySql = '';
      var verifyIdx = rawStdin.indexOf('-- VERIFY:');
      if (verifyIdx !== -1) {
        setupSql = rawStdin.slice(0, verifyIdx);
        verifySql = rawStdin.slice(verifyIdx + '-- VERIFY:'.length);
      }
      if (setupSql.trim()) {
        db.run(setupSql);
      }
      var statements = splitSql(sql);
      if (verifySql.trim()) {
        statements = statements.concat(splitSql(verifySql));
      }

      if (!statements.length) {
        return createResult({
          status: 'success',
          stdout: 'Aucune instruction SQL à exécuter.\n',
          executionTime: (Date.now() - startTime) / 1000,
          provenance: 'browser',
          provider: 'SQLite 3 (WebAssembly)',
          userMessage: 'Écrivez une requête SQL.'
        });
      }

      var opts = options || {};
      var maxTimeoutMs = Number(opts.timeoutMs) > 0 ? Number(opts.timeoutMs) : 3000;
      var maxSelectRows = Number(opts.maxRows) > 0 ? Number(opts.maxRows) : 2000;
      var maxOutputBytes = Number(opts.maxOutputBytes) > 0 ? Number(opts.maxOutputBytes) : 65536;
      var outputText = '';
      for (var i = 0; i < statements.length; i++) {
        if (Date.now() - startTime > maxTimeoutMs) {
          db.close();
          throw new Error('Temps d’exécution SQL dépassé (' + maxTimeoutMs + ' ms).');
        }
        var stmt = statements[i];
        var upper = stmt.trim().toUpperCase();
        if (upper.indexOf('SELECT') === 0 || upper.indexOf('WITH') === 0 || upper.indexOf('PRAGMA') === 0 || upper.indexOf('EXPLAIN') === 0) {
          var prepared = db.prepare(stmt);
          var cols = [];
          var rows = [];
          try {
            while (prepared.step()) {
              if (Date.now() - startTime > maxTimeoutMs) {
                throw new Error('Temps d’exécution SQL dépassé (' + maxTimeoutMs + ' ms).');
              }
              if (!cols.length) cols = prepared.getColumnNames();
              rows.push(prepared.get());
              if (rows.length > maxSelectRows) {
                throw new Error('Limite mémoire/lignes dépassée : la requête génère plus de ' + maxSelectRows + ' lignes (vérifiez vos clauses WITH RECURSIVE ou jointures).');
              }
            }
            if (!cols.length) {
              try { cols = prepared.getColumnNames(); } catch (e) {}
            }
          } finally {
            try { prepared.free(); } catch (e) {}
          }
          if (cols && cols.length && rows.length) {
            outputText += formatAsciiTable(cols, rows) + '\n';
          } else {
            outputText += '(Requête SELECT exécutée avec 0 résultat)\n\n';
          }
        } else {
          db.run(stmt);
          var changes = typeof db.getRowsModified === 'function' ? db.getRowsModified() : 0;
          outputText += 'Instruction exécutée avec succès (' + changes + (changes === 1 ? ' ligne modifiée' : ' lignes modifiées') + ').\n\n';
        }
        if (outputText.length > maxOutputBytes) {
          outputText = outputText.slice(0, maxOutputBytes);
          break;
        }
      }

      db.close();
      var elapsed = (Date.now() - startTime) / 1000;

      return createResult({
        status: 'success',
        stdout: outputText.trim() + '\n',
        stderr: '',
        compileError: '',
        exitCode: 0,
        executionTime: elapsed,
        provenance: 'browser',
        provider: 'SQLite 3 (WebAssembly)',
        userMessage: 'Requête(s) SQL exécutée(s) avec succès dans le navigateur.'
      });
    }).catch(function (err) {
      var elapsedErr = (Date.now() - startTime) / 1000;
      var msg = err && err.message ? err.message : String(err);
      return createResult({
        status: 'runtime_error',
        stdout: '',
        stderr: 'Erreur SQLite: ' + msg,
        compileError: '',
        exitCode: 1,
        executionTime: elapsedErr,
        provenance: 'browser',
        provider: 'SQLite 3 (WebAssembly)',
        userMessage: 'Erreur lors de l’exécution SQL dans SQLite.'
      });
    });
  }

  return {
    loadSqlJs: loadSqlJs,
    splitSql: splitSql,
    formatAsciiTable: formatAsciiTable,
    execute: execute
  };
});
