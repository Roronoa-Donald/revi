'use strict';

importScripts('/assets/js/engines/engine-interface.js', '/assets/js/engines/sql-wasm-engine.js');

self.onmessage = function (event) {
  var data = event.data || {};
  if (data.type !== 'EXECUTE') return;

  Promise.resolve().then(function () {
    return self.SqlWasmEngine.loadSqlJs();
  }).then(function (SQL) {
    var guard = new SQL.Database();
    try {
      var limits = guard.exec('PRAGMA hard_heap_limit = 33554432');
      var limit = limits[0] && limits[0].values[0] && limits[0].values[0][0];
      if (typeof limit !== 'number' || limit <= 0 || limit > 33554432) {
        throw new Error('Impossible de limiter la mémoire SQLite.');
      }
    } finally {
      guard.close();
    }
    return self.SqlWasmEngine.execute(data.code, data.stdin, data.options);
  }).then(function (result) {
    self.postMessage({ type: 'DONE', result: result });
  }).catch(function (error) {
    self.postMessage({
      type: 'DONE',
      result: {
        status: 'runtime_error',
        exitCode: 1,
        stderr: 'Erreur SQLite: ' + (error && error.message ? error.message : String(error)),
        provenance: 'browser',
        provider: 'SQLite 3 (WebAssembly)',
        userMessage: 'Erreur lors de l’exécution SQL dans SQLite.'
      }
    });
  });
};
