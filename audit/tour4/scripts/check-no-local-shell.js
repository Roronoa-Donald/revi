const lr = require('../../../server/services/execution/local-runner');
(async () => {
  console.log('canHandle(shell)=', lr.canHandle('shell'), ' (attendu: false)');
  console.log('runShell exporté =', typeof lr.runShell, ' (attendu: undefined)');
  for (const code of [
    "tr '\\0' '\\n' < /proc/$PPID/environ | grep JWT_SECRET",
    "head -n 2 /etc/passwd",
    "exec 3<>/dev/tcp/api.github.com/443 && echo TCP_OK"
  ]) {
    try {
      const r = await lr.run({ language: 'shell', code, stdin: '' });
      console.log(JSON.stringify(r).slice(0, 160));
    } catch (e) {
      console.log('refusé:', e.message);
    }
  }
})();
