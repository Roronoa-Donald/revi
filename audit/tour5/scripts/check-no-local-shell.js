// node audit/tour4/scripts/check-no-local-shell.js   (lancer depuis NEW)
process.env.JWT_SECRET = process.env.JWT_SECRET || 'SECRET_DE_TEST';
const lr = require('../../../server/services/execution/local-runner');
(async () => {
  console.log('canHandle(shell)=', lr.canHandle('shell'), ' (attendu: false)');
  console.log('runShell exporté =', typeof lr.runShell, ' (attendu: undefined)');
  for (const code of [
    'tr "\\0" "\\n" < /proc/$PPID/environ | grep -E "SECRET|DATABASE"',
    'head -c 80 /etc/passwd',
    'timeout 3 bash -c "exec 3<>/dev/tcp/api.github.com/443" && echo CONNEXION_OK',
  ]) {
    let out;
    try { out = await lr.run({ languageId: 'shell', code, stdin: '' }); } catch (e) { out = { erreur: String(e.message || e).slice(0, 80) }; }
    console.log(JSON.stringify(out).slice(0, 160));
  }
})();
// ATTENDU : aucune sortie de secret, de /etc/passwd ni CONNEXION_OK ; refus ou « indisponible ».
