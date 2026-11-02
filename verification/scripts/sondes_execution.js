'use strict';

const fs = require('fs');
const http = require('http');
const execution = require('/project/server/services/execution');
const local = require('/project/server/services/execution/local-runner');
const catalogue = require('/project/server/exercises');
const { runTests } = require('/project/server/exercises/runner');

async function observe(action) {
  try {
    const result = await action();
    return {
      ok: result.ok,
      status: result.status,
      provider: result.provider,
      stdoutBytes: Buffer.byteLength(result.stdout || result.data?.stdout || '', 'utf8'),
      stdout: (result.stdout || result.data?.stdout || '').slice(0, 200),
      stderr: (result.stderr || result.data?.stderr || '').slice(0, 200),
      exitCode: result.exitCode ?? result.data?.exit_code ?? null
    };
  } catch (error) {
    return { errorCode: error.code, userMessage: error.userMessage || '' };
  }
}

async function main() {
  const report = {};
  report.shell_local_possible = local.canHandle('shell');
  report.bash_local_possible = local.canHandle('bash');
  report.csharp_local_possible = local.canHandle('csharp');
  report.shell_sans_fournisseur = await observe(() => execution.execute({ language: 'shell', code: 'echo bonjour' }));
  report.python_sans_fournisseur = await observe(() => execution.execute({ language: 'python', code: 'print(7)' }));
  report.python_repli_explicite = await observe(() => execution.execute({ language: 'python', code: 'print(7)' }, { allowLocal: true }));
  const fakePiston = http.createServer((request, response) => {
    response.writeHead(503, { 'content-type': 'application/json' });
    response.end('{"message":"panne simulée"}');
  });
  await new Promise(resolve => fakePiston.listen(0, '127.0.0.1', resolve));
  process.env.PISTON_URL = `http://127.0.0.1:${fakePiston.address().port}`;
  report.shell_piston_503 = await observe(() => execution.execute({ language: 'shell', code: 'echo bonjour' }));
  report.python_piston_503_repli_soumission = await observe(() => execution.execute({ language: 'python', code: 'print(9)' }, { allowLocal: true }));
  delete process.env.PISTON_URL;
  await new Promise(resolve => fakePiston.close(resolve));
  report.javascript_boucle = await observe(() => local.runJavaScript('while (true) {}', '', 300));
  report.javascript_sortie = await observe(() => local.runJavaScript('console.log("x".repeat(100000))', '', 2000));
  report.javascript_capacites = await observe(() => local.runJavaScript('console.log(typeof process, typeof require, typeof fetch, typeof WebSocket)', '', 1000));
  fs.writeFileSync('/tmp/revi-canary.txt', 'CANARY_PUBLIC');
  report.javascript_lecture_fichier = await observe(() => local.runJavaScript("console.log(require('node:fs').readFileSync('/tmp/revi-canary.txt', 'utf8'))", '', 1000));
  report.javascript_reseau = await observe(() => local.runJavaScript("fetch('http://127.0.0.1:9/').then(console.log)", '', 1000));
  report.javascript_constructeur = await observe(() => local.runJavaScript("console.log((()=>{}).constructor('return 123')())", '', 1000));
  report.python_lecture_fichier = await observe(() => local.runPython("print(open('/tmp/revi-canary.txt').read())", '', 1000));
  report.python_reseau = await observe(() => local.runPython("import socket\nprint(socket.socket())", '', 1000));
  report.python_boucle = await observe(() => local.runPython('while True:\n    pass\n', '', 300));
  report.sql_recursif = await observe(() => local.runSql('WITH RECURSIVE n(x) AS (SELECT 1 UNION ALL SELECT x+1 FROM n) SELECT sum(x) FROM n;', '', 300));
  const exercise = catalogue.getExercise('pb2-c1-e1');
  const falseAnswer = exercise.tests.map((test, index) => {
    const fraction = String(test.expected).trim().split('/').map(Number);
    if (fraction.length !== 2 || !fraction.every(Number.isFinite) || fraction[1] === 0) {
      throw new Error('Le test attendu ne contient pas de fraction exploitable.');
    }
    return `[Cas ${index + 1}]\n${fraction[0] / fraction[1]}XYZ`;
  }).join('\n') + '\n';
  const grade = await runTests(exercise, falseAnswer, {
    execute: async payload => execution.normalizeResponse(await local.run(payload), 'local')
  });
  report.fractions_suivies_de_texte = { exercise: exercise.id, passed: grade.passed, total: grade.total, stop: grade.stop?.reason || null };
  fs.writeFileSync('/resultats/sondes-execution.json', JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
}

main().catch(error => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
