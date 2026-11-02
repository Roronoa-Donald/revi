'use strict';

const fs = require('node:fs');

async function main() {
  const hostNamespace = process.env.REVI_AUDIT_NET_NS_HOTE || '';
  if (process.env.REVI_AUDIT_ISOLE !== '1' || !/^net:\[\d+\]$/.test(hostNamespace) ||
      fs.readFileSync('/proc/1/comm', 'utf8').trim() !== 'bwrap' ||
      fs.readlinkSync('/proc/self/ns/net') === hostNamespace) {
    throw new Error('Le moteur SQL du banc exige le confinement du lanceur d’audit.');
  }
  const input = JSON.parse(fs.readFileSync(0, 'utf8'));
  const engine = require('/project/assets/js/engines/sql-wasm-engine');
  const result = await engine.execute(input.code, input.stdin, { timeoutMs: 4000, maxRows: 2000, maxOutputBytes: 65536 });
  process.stdout.write(JSON.stringify({
    ok: true, httpStatus: 200,
    data: { stdout: result.stdout || '', stderr: result.stderr || '', exit_code: result.status === 'success' ? 0 : 1 }
  }));
}

main().catch(error => {
  console.error(error.message);
  process.exitCode = 1;
});
