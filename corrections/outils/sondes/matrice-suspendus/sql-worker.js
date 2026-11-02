'use strict';

const fs = require('node:fs');

async function main() {
  if (fs.readFileSync('/proc/1/comm', 'utf8').trim() !== 'bwrap' ||
      fs.readlinkSync('/proc/self/ns/net') === process.env.AUDIT_HOST_NET_NS ||
      fs.existsSync('/home') || Object.hasOwn(process.env, 'HOME') ||
      fs.existsSync('/project/server/exercises') || fs.existsSync('/trusted')) {
    throw new Error('Confinement insuffisant');
  }
  const engine = require('/project/assets/js/engines/sql-wasm-engine');
  const sql = fs.readFileSync('/code/solution.sql', 'utf8');
  const input = fs.readFileSync(0, 'utf8');
  const result = await engine.execute(sql, input, { timeoutMs: 10000 });
  process.stdout.write(JSON.stringify({
    status: result.status, stdout: result.stdout || '', stderr: result.stderr || '', exitCode: result.exitCode
  }));
}

main().catch(() => { process.stderr.write('Lanceur SQL indisponible.\n'); process.exitCode = 1; });
