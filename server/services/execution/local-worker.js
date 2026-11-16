'use strict';

const { parentPort, workerData } = require('node:worker_threads');

async function runTask() {
  const { kind, code, stdin } = workerData || {};
  try {
    const engine = kind === 'sql'
      ? require('../../../assets/js/engines/sql-wasm-engine')
      : require('../../../assets/js/engines/pseudo-code-engine');
    const res = await engine.execute(String(code || ''), String(stdin || ''));
    parentPort.postMessage({ ok: true, res });
  } catch (err) {
    parentPort.postMessage({
      ok: false,
      error: err && err.message ? err.message : 'Erreur d’exécution locale'
    });
  }
}

runTask();