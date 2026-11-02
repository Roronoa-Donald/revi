'use strict';

importScripts('/b1-sql/assets/vendor/sqljs/sql-wasm.js', '/b1-sql/assets/js/sql-simulator.js');

let database = null;

self.onmessage = event => {
  const message = event.data || {};
  if (message.type === 'initialize') {
    initSqlJs({ locateFile: file => '/b1-sql/assets/vendor/sqljs/' + file })
      .then(engine => {
        database = new engine.Database();
        const limit = database.exec('PRAGMA hard_heap_limit = 33554432;');
        const heapLimit = limit[0] && limit[0].values[0] && limit[0].values[0][0];
        if (!Number.isInteger(heapLimit) || heapLimit <= 0 || heapLimit > 33554432) {
          throw new Error('La limite mémoire SQLite ne peut pas être activée.');
        }
        database.exec(self.SqlSimulatorData.PARC_SQL);
        self.postMessage({ type: 'ready' });
      })
      .catch(error => self.postMessage({ type: 'initialization_error', error: error.message }));
  } else if (message.type === 'execute') {
    try {
      if (!database) throw new Error('La base SQL n’est pas prête.');
      const payload = self.SqlSimulatorData.runOnDatabase(database, String(message.sql || ''));
      self.postMessage({ type: 'result', payload });
    } catch (error) {
      self.postMessage({ type: 'result', error: error.message || String(error) });
    }
  }
};
