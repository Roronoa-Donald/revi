'use strict';

const crypto = require('node:crypto');
const fs = require('node:fs');

const sources = [
  'tests/sql-lot1-fresh.test.js',
  'tests/lot1-sandbox.js',
  'server/exercises/b1-sql.js',
  'assets/js/engines/engine-interface.js',
  'assets/js/engines/sql-wasm-engine.js',
  'b1-sql/assets/js/sql-simulator.js',
  'b1-sql/assets/vendor/sqljs/sql-wasm.js',
  'b1-sql/assets/vendor/sqljs/sql-wasm.wasm',
  'corrections/outils/sondes/sql-b1-generalisation/rapporteur.js'
];

function option(value) {
  return value === undefined || value === false ? null : value === true ? true : String(value);
}

module.exports = async function* (events) {
  const tests = [];
  const resumes = [];
  for await (const event of events) {
    const data = event.data;
    if (event.type === 'test:pass' || event.type === 'test:fail') {
      const error = data.details && data.details.error;
      const cause = error && error.cause;
      tests.push({
        nom: data.name,
        fichier: data.file || null,
        profondeur: data.nesting,
        genre: data.details && data.details.type,
        verdict: event.type === 'test:pass' ? 'pass' : 'fail',
        ignore: option(data.skip),
        todo: option(data.todo),
        type_erreur: error && error.failureType || null,
        message: error ? String(cause && cause.message || error.message || error).slice(0, 2000) : null
      });
    } else if (event.type === 'test:summary' && !data.file) {
      resumes.push({ success: data.success, counts: data.counts });
    }
  }
  const hostNetwork = process.env.REVI_AUDIT_NET_NS_HOTE;
  const isolation = {
    pid1: fs.readFileSync('/proc/1/comm', 'utf8').trim(),
    reseau_separe: Boolean(hostNetwork) && fs.readlinkSync('/proc/self/ns/net') !== hostNetwork,
    variable_home_absente: process.env.HOME === undefined,
    repertoire_home_absent: !fs.existsSync('/home')
  };
  const empreintes = Object.fromEntries(sources.map(relative => [relative,
    crypto.createHash('sha256').update(fs.readFileSync(`/project/${relative}`)).digest('hex')
  ]));
  yield `${JSON.stringify({ format: 'revi-sql-b1-fresh-v1', node: process.version, isolation, empreintes, resumes, tests })}\n`;
};
