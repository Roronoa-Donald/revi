'use strict';

const fs = require('node:fs');

async function main() {
  if (fs.readFileSync('/proc/1/comm', 'utf8').trim() !== 'bwrap' ||
      fs.readlinkSync('/proc/self/ns/net') === process.env.AUDIT_OUTER_NET ||
      fs.existsSync('/home') || Object.hasOwn(process.env, 'HOME') || fs.existsSync('/trusted') ||
      fs.existsSync('/project/server/exercises')) {
    throw new Error('Confinement SQL insuffisant');
  }
  const engine = require('/project/assets/js/engines/sql-wasm-engine');
  const code = fs.readFileSync('/code/solution.sql', 'utf8');
  const stdin = fs.readFileSync(0, 'utf8');
  const result = await engine.execute(code, stdin, { timeoutMs: 4000, maxRows: 2000, maxOutputBytes: 65536 });
  process.stdout.write(JSON.stringify({ status: result.status, stdout: result.stdout || '' }));
}

main().catch(() => {
  process.stderr.write('Échec du lanceur SQL isolé.\n');
  process.exitCode = 1;
});
