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
  var MAX_RESULT_ROWS = 2000;
  var MAX_OUTPUT_BYTES = 65536;

  var sqlEnginePromise = null;
  var sharedDb = null;

  function loadSqlJs() {
    if (sqlEnginePromise) return sqlEnginePromise;

    sqlEnginePromise = new Promise(function (resolve, reject) {
      var isWorker = typeof self !== 'undefined' && typeof importScripts === 'function' && typeof document === 'undefined';
      if (typeof window === 'undefined' && !isWorker) {
        try {
          var pathMod = require('path');
          var initNodeSql = require(pathMod.resolve(__dirname, '../../../b1-sql/assets/vendor/sqljs/sql-wasm.js'));
          return initNodeSql().then(resolve).catch(reject);
        } catch (e) {
          return reject(e);
        }
      }

      var scope = isWorker ? self : window;

      function initEngine() {
        if (typeof scope.initSqlJs !== 'function') {
          return reject(new Error('initSqlJs non disponible'));
        }
        scope.initSqlJs({
          locateFile: function (file) {
            return '/b1-sql/assets/vendor/sqljs/' + file;
          }
        }).then(function (SQL) {
          resolve(SQL);
        }).catch(reject);
      }

      if (typeof scope.initSqlJs === 'function') {
        initEngine();
      } else if (isWorker) {
        try {
          importScripts('/b1-sql/assets/vendor/sqljs/sql-wasm.js');
          initEngine();
        } catch (error) {
          reject(new Error('Échec du chargement du script WebAssembly sql-wasm.js : ' + (error.message || error)));
        }
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

  function timeoutError(timeoutMs) {
    var error = new Error('Temps d’exécution SQL dépassé (' + timeoutMs + ' ms).');
    error.name = 'SqlTimeoutError';
    return error;
  }

  function outputLimitError(maxOutputBytes) {
    return new Error('Limite de sortie SQL dépassée (' + maxOutputBytes + ' octets).');
  }

  function utf8Length(value) {
    var size = 0;
    for (var index = 0; index < value.length; index++) {
      var code = value.charCodeAt(index);
      if (code < 0x80) size++;
      else if (code < 0x800) size += 2;
      else if (code >= 0xD800 && code <= 0xDBFF && index + 1 < value.length &&
          value.charCodeAt(index + 1) >= 0xDC00 && value.charCodeAt(index + 1) <= 0xDFFF) {
        size += 4;
        index++;
      } else size += 3;
    }
    return size;
  }

  function statementPointer(SQL, prepared) {
    var pointer = prepared.stmt || prepared.Qa;
    if (!Number.isInteger(pointer) || pointer <= 0 ||
        typeof prepared.free !== 'function' ||
        typeof SQL._sqlite3_column_count !== 'function' ||
        typeof SQL._sqlite3_column_name !== 'function' ||
        typeof SQL._sqlite3_column_type !== 'function' ||
        typeof SQL._sqlite3_column_bytes !== 'function' ||
        typeof SQL._sqlite3_column_double !== 'function' ||
        typeof SQL.UTF8ToString !== 'function') {
      throw new Error('Impossible de contrôler la taille des résultats avec cette version de sql.js.');
    }
    return pointer;
  }

  function checkIterator(SQL, iterator) {
    if (!Number.isInteger(iterator.fb) || iterator.fb <= 0 ||
        (typeof iterator.ob !== 'function' && typeof SQL._free !== 'function')) {
      throw new Error('Impossible de libérer l’itérateur SQL avec cette version de sql.js.');
    }
  }

  function freeIterator(SQL, iterator) {
    if (!iterator || iterator.fb === null) return;
    if (!Number.isInteger(iterator.fb) || iterator.fb <= 0) {
      throw new Error('Impossible de libérer l’itérateur SQL avec cette version de sql.js.');
    }
    if (typeof SQL._free === 'function') {
      SQL._free(iterator.fb);
      iterator.fb = null;
    } else if (typeof iterator.ob === 'function') {
      iterator.ob();
    } else {
      throw new Error('Impossible de libérer l’itérateur SQL avec cette version de sql.js.');
    }
  }

  function checkedColumnCount(SQL, pointer) {
    var count = SQL._sqlite3_column_count(pointer);
    if (!Number.isInteger(count) || count < 0) {
      throw new Error('Impossible de contrôler la taille des résultats avec cette version de sql.js.');
    }
    return count;
  }

  function boundedColumnNames(SQL, pointer, count, availableBytes, maxOutputBytes) {
    var columns = [];
    var used = 0;
    for (var index = 0; index < count; index++) {
      var namePointer = SQL._sqlite3_column_name(pointer, index);
      if (!Number.isInteger(namePointer) || namePointer <= 0) {
        throw new Error('Impossible de lire le nom d’une colonne SQL.');
      }
      var name = SQL.UTF8ToString(namePointer, availableBytes - used + 1);
      used += utf8Length(name);
      if (used > availableBytes) throw outputLimitError(maxOutputBytes);
      columns.push(name);
    }
    return columns;
  }

  function checkRowSize(SQL, pointer, count, availableBytes, maxOutputBytes) {
    var used = 0;
    for (var index = 0; index < count; index++) {
      var type = SQL._sqlite3_column_type(pointer, index);
      if (type === 3 || type === 4) {
        var bytes = SQL._sqlite3_column_bytes(pointer, index);
        if (!Number.isInteger(bytes) || bytes < 0) {
          throw new Error('Impossible de contrôler la taille des résultats avec cette version de sql.js.');
        }
        used += type === 4 && bytes ? bytes * 4 - 1 : bytes;
      } else if (type === 1 || type === 2) {
        var number = SQL._sqlite3_column_double(pointer, index);
        if (typeof number !== 'number') {
          throw new Error('Impossible de contrôler la taille des résultats avec cette version de sql.js.');
        }
        used += String(number).length;
      } else if (type === 5) {
        used += 4;
      } else {
        throw new Error('Impossible de contrôler la taille des résultats avec cette version de sql.js.');
      }
      if (used > availableBytes) throw outputLimitError(maxOutputBytes);
    }
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
      var db = new SQL.Database();
      var iterator = null;
      var prepared = null;
      try {
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

        var sources = [String(sql || ''), verifySql];
        var opts = options || {};
        var maxTimeoutMs = Number(opts.timeoutMs) > 0 ? Number(opts.timeoutMs) : 3000;
        var maxResultRows = Number(opts.maxRows) >= 1 ? Math.min(Math.floor(Number(opts.maxRows)), MAX_RESULT_ROWS) : MAX_RESULT_ROWS;
        var maxOutputBytes = Number(opts.maxOutputBytes) >= 1 ? Math.min(Math.floor(Number(opts.maxOutputBytes)), MAX_OUTPUT_BYTES) : MAX_OUTPUT_BYTES;
        var outputText = '';
        var outputBytes = 0;
        var hasStatements = false;

        function appendOutput(text) {
          var size = utf8Length(text);
          if (outputBytes + size > maxOutputBytes) throw outputLimitError(maxOutputBytes);
          outputText += text;
          outputBytes += size;
        }

        for (var sourceIndex = 0; sourceIndex < sources.length; sourceIndex++) {
          if (!sources[sourceIndex].trim()) continue;
          iterator = db.iterateStatements(sources[sourceIndex]);
          checkIterator(SQL, iterator);
          while (true) {
            if (Date.now() - startTime > maxTimeoutMs) {
              throw timeoutError(maxTimeoutMs);
            }
            var next = iterator.next();
            if (next.done) {
              prepared = null;
              iterator = null;
              break;
            }
            hasStatements = true;
            prepared = next.value;
            var pointer = statementPointer(SQL, prepared);
            var columnCount = checkedColumnCount(SQL, pointer);
            if (columnCount > 0) {
              var cols = [];
              var rows = [];
              var widths = [];
              var widthTotal = 0;
              var extraBytes = 0;
              while (prepared.step()) {
                if (Date.now() - startTime > maxTimeoutMs) {
                  throw timeoutError(maxTimeoutMs);
                }
                if (checkedColumnCount(SQL, pointer) !== columnCount) {
                  throw new Error('Impossible de contrôler la taille des résultats avec cette version de sql.js.');
                }
                if (rows.length >= maxResultRows) {
                  throw new Error('Limite mémoire/lignes dépassée : la requête génère plus de ' + maxResultRows + ' lignes (vérifiez vos clauses WITH RECURSIVE ou jointures).');
                }
                if (!rows.length) {
                  cols = boundedColumnNames(SQL, pointer, columnCount, maxOutputBytes - outputBytes, maxOutputBytes);
                  widths = cols.map(function (col) {
                    widthTotal += col.length;
                    extraBytes += utf8Length(col) - col.length;
                    return col.length;
                  });
                }
                checkRowSize(SQL, pointer, cols.length, maxOutputBytes - outputBytes, maxOutputBytes);
                var row = prepared.get().map(function (value, index) {
                  var text = value === null || value === undefined ? 'NULL' : String(value);
                  if (text.length > widths[index]) {
                    widthTotal += text.length - widths[index];
                    widths[index] = text.length;
                  }
                  extraBytes += utf8Length(text) - text.length;
                  return text;
                });
                var rowCount = rows.length + 1;
                var lineBytes = widthTotal + 3 * cols.length + 2;
                var summary = '(' + rowCount + (rowCount === 1 ? ' ligne retournée' : ' lignes retournées') + ')\n\n';
                var tableBytes = lineBytes * (rowCount + 4) + extraBytes + utf8Length(summary);
                if (outputBytes + tableBytes > maxOutputBytes) throw outputLimitError(maxOutputBytes);
                rows.push(row);
              }
              if (cols.length && rows.length) {
                appendOutput(formatAsciiTable(cols, rows) + '\n');
              } else {
                appendOutput('(Requête exécutée avec 0 résultat)\n\n');
              }
            } else {
              while (prepared.step()) {
                if (Date.now() - startTime > maxTimeoutMs) {
                  throw timeoutError(maxTimeoutMs);
                }
                if (checkedColumnCount(SQL, pointer) !== columnCount) {
                  throw new Error('Impossible de contrôler la taille des résultats avec cette version de sql.js.');
                }
              }
              var changes = typeof db.getRowsModified === 'function' ? db.getRowsModified() : 0;
              appendOutput('Instruction exécutée avec succès (' + changes + (changes === 1 ? ' ligne modifiée' : ' lignes modifiées') + ').\n\n');
            }
          }
        }

        if (!hasStatements) {
          return createResult({
            status: 'success',
            stdout: 'Aucune instruction SQL à exécuter.\n',
            executionTime: (Date.now() - startTime) / 1000,
            provenance: 'browser',
            provider: 'SQLite 3 (WebAssembly)',
            userMessage: 'Écrivez une requête SQL.'
          });
        }

        var elapsed = (Date.now() - startTime) / 1000;
        var result = createResult({
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
        if (utf8Length(result.stdout) > maxOutputBytes) throw outputLimitError(maxOutputBytes);
        return result;
      } finally {
        try {
          var preparedPointer = prepared && (prepared.stmt || prepared.Qa);
          if (Number.isInteger(preparedPointer) && preparedPointer > 0 && typeof prepared.free === 'function') {
            prepared.free();
          }
        } finally {
          try {
            freeIterator(SQL, iterator);
          } finally {
            db.close();
          }
        }
      }
    }).catch(function (err) {
      var elapsedErr = (Date.now() - startTime) / 1000;
      var msg = (err && err.message ? err.message : String(err)).slice(0, 2000);
      var isTimeout = err && err.name === 'SqlTimeoutError';
      return createResult({
        status: isTimeout ? 'timeout' : 'runtime_error',
        stdout: '',
        stderr: 'Erreur SQLite: ' + msg,
        compileError: '',
        exitCode: isTimeout ? 124 : 1,
        executionTime: elapsedErr,
        provenance: 'browser',
        provider: 'SQLite 3 (WebAssembly)',
        userMessage: isTimeout ? 'Temps limite SQL dépassé.' : 'Erreur lors de l’exécution SQL dans SQLite.'
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
