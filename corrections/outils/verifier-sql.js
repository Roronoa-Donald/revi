'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { execFileSync, fork } = require('node:child_process');
const { redactSql } = require('./redaction-sql');
const { sqlTextContent } = require('./texte-sql');

const root = path.resolve(__dirname, '../..');
const hostNetwork = process.env.REVI_AUDIT_NET_NS_HOTE;
if (process.env.REVI_AUDIT_ISOLE !== '1' || !hostNetwork ||
    fs.readFileSync('/proc/1/comm', 'utf8').trim() !== 'bwrap' ||
    fs.readlinkSync('/proc/self/ns/net') === hostNetwork || fs.existsSync('/home')) {
  throw new Error('Le contrôle SQL doit être exécuté dans bubblewrap, sans réseau ni accès au répertoire personnel.');
}

if (process.argv.includes('--sql-worker')) {
  const initSql = require(path.join(root, 'b1-sql/assets/vendor/sqljs/sql-wasm.js'));
  const engine = require(path.join(root, 'assets/js/engines/sql-wasm-engine'));
  const catalogue = require(path.join(root, 'server/exercises'));
  const { runTests } = require(path.join(root, 'server/exercises/runner'));
  let initialSql = '';
  initSql({ locateFile: name => path.join(root, 'b1-sql/assets/vendor/sqljs', name) }).then(SQL => {
    process.on('message', async job => {
      if (job.type === 'init') {
        initialSql = job.initialSql;
        process.send({ ready: true });
        return;
      }
      if (job.type === 'exercise') {
        const exercise = catalogue.getExercise(job.id);
        const testCase = exercise.tests[job.testIndex];
        const report = await runTests({ ...exercise, tests: [testCase] }, exercise.solution, {
          execute: async payload => {
            const outcome = await engine.execute(payload.code, payload.stdin, { timeoutMs: 1200, maxRows: 1000 });
            return { ...outcome, ok: outcome.status === 'success' };
          }
        });
        process.send({ ok: report.ok && report.passed === 1 && !report.stop, status: report.stop?.reason || report.error?.code || 'success' });
        return;
      }
      const database = new SQL.Database();
      try {
        database.run(initialSql);
        let statementCount = 0;
        let rows = 0;
        for (const statement of database.iterateStatements(job.sql)) {
          statementCount++;
          try {
            while (statement.step()) {
              rows++;
              if (rows > 1000) throw new Error('Limite de 1000 lignes atteinte');
            }
          } finally {
            statement.free();
          }
        }
        process.send({ ok: statementCount > 0, statements: statementCount, rows });
      } catch (error) {
        process.send({ ok: false, error: String(error.message || error).slice(0, 300) });
      } finally {
        database.close();
      }
    });
  }).catch(error => { throw error; });
} else {
  const parse5 = require('parse5');
  const acorn = require('acorn');
  const catalogue = require(path.join(root, 'server/exercises'));
  const referenceIndex = process.argv.indexOf('--reference');
  const reference = referenceIndex < 0 ? null : process.argv[referenceIndex + 1];
  if (referenceIndex >= 0 && !reference) throw new Error('Une référence Git est requise après --reference.');
  const git = args => execFileSync('git', args, { cwd: root, encoding: 'utf8', maxBuffer: 100 * 1024 * 1024 });
  const tracked = (process.env.REVI_SQL_TRACKED_FILE
    ? fs.readFileSync(process.env.REVI_SQL_TRACKED_FILE, 'utf8')
    : reference ? git(['ls-tree', '-rz', '--name-only', reference]) : git(['ls-files', '-z'])).split('\0').filter(Boolean);
  const read = file => reference && process.env.REVI_SQL_REFERENCE_DIR
    ? fs.readFileSync(path.join(process.env.REVI_SQL_REFERENCE_DIR, file), 'utf8')
    : reference ? git(['show', `${reference}:${file}`]) : fs.readFileSync(path.join(root, file), 'utf8');
  const files = tracked.filter(file => /^(b1-sql|sql|b3-sql)\/.*\.html$/i.test(file));

  function astWalk(node, visit) {
    if (!node || typeof node !== 'object') return;
    if (node.type) visit(node);
    for (const value of Object.values(node)) {
      if (Array.isArray(value)) value.forEach(child => astWalk(child, visit));
      else if (value && typeof value === 'object') astWalk(value, visit);
    }
  }

  const simulator = acorn.parse(read('b1-sql/assets/js/sql-simulator.js'), { ecmaVersion: 'latest' });
  let initialSql;
  astWalk(simulator, node => {
    if (node.type !== 'VariableDeclarator' || node.id?.name !== 'PARC_SQL') return;
    const call = node.init;
    const array = call?.callee?.object;
    if (call?.type !== 'CallExpression' || call.callee?.property?.name !== 'join' || array?.type !== 'ArrayExpression' || call.arguments.length !== 1 || call.arguments[0].value !== '\n' || array.elements.some(element => element?.type !== 'Literal' || typeof element.value !== 'string')) {
      throw new Error('Le schéma du simulateur ne correspond plus au tableau littéral attendu.');
    }
    initialSql = array.elements.map(element => element.value).join('\n');
  });
  if (!initialSql) throw new Error('Schéma du simulateur introuvable.');

  const candidates = [];
  const skippedFragments = [];
  const seen = new Set();
  function extract(file, node, insidePre) {
    const tag = node.tagName;
    const className = (node.attrs || []).find(item => item.name === 'class')?.value || '';
    const classes = className.split(/\s+/);
    const relevant = tag === 'pre' || (tag === 'code' && !insidePre) || classes.includes('opt') || classes.includes('q__stem') || classes.includes('q__exp') || classes.includes('fc__face');
    if (relevant && !insidePre) {
      const text = sqlTextContent(node).trim().replace(/^\s*(?:Question|Réponse)\s*/i, '').trim();
      const upper = text.toUpperCase();
      const first = upper.match(/^(SELECT|WITH|CREATE|INSERT|UPDATE|DELETE|ALTER|DROP|PRAGMA|EXPLAIN|REPLACE)\b/);
      if (first) {
        const item = { file, line: node.sourceCodeLocation?.startLine || null, zone: tag === 'pre' ? 'bloc' : tag === 'code' ? 'code' : classes.find(value => ['opt', 'q__stem', 'q__exp', 'fc__face'].includes(value)), sql: text.slice(0, 12000) };
        const key = `${file}:${item.line}:${item.sql}`;
        if (!seen.has(key)) {
          seen.add(key);
          if (text.length > 12000 || !/\s/.test(text) || /(?:\.\.\.|…)$/.test(text)) skippedFragments.push({ ...item, reason: 'fragment ou longueur à qualifier' });
          else candidates.push(item);
        }
      }
    }
    for (const child of node.childNodes || []) extract(file, child, insidePre || tag === 'pre');
  }
  for (const file of files) extract(file, parse5.parse(read(file), { sourceCodeLocationInfo: true }), false);

  async function main() {
    let worker;
    async function startWorker() {
      worker = fork(__filename, ['--sql-worker'], {
        execArgv: ['--max-old-space-size=128'],
        stdio: ['ignore', 'ignore', 'inherit', 'ipc'],
        env: { PATH: process.env.PATH || '/usr/bin:/bin', HOME: '/tmp', LANG: 'C.UTF-8',
          REVI_AUDIT_ISOLE: process.env.REVI_AUDIT_ISOLE, REVI_AUDIT_NET_NS_HOTE: hostNetwork }
      });
      await new Promise((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error('Initialisation SQLite expirée')), 10000);
        worker.once('message', message => { clearTimeout(timer); message.ready ? resolve() : reject(new Error('Worker SQLite non initialisé')); });
        worker.once('error', reject);
        worker.once('exit', code => { clearTimeout(timer); reject(new Error(`Worker SQLite arrêté avant initialisation : ${code}`)); });
        worker.send({ type: 'init', initialSql });
      });
    }
    async function run(job) {
      return new Promise(resolve => {
        const active = worker;
        let settled = false;
        function onExit(exitCode) {
          if (settled) return;
          settled = true;
          clearTimeout(timer);
          startWorker().then(() => resolve({ ok: false, error: `Worker SQLite arrêté : ${exitCode}` }), error => resolve({ ok: false, error: error.message }));
        }
        const timer = setTimeout(() => {
          if (settled) return;
          settled = true;
          active.removeAllListeners('message');
          active.removeListener('exit', onExit);
          active.kill('SIGKILL');
          startWorker().then(() => resolve({ ok: false, timeout: true, error: 'Temps limite externe dépassé' }), error => resolve({ ok: false, error: error.message }));
        }, 1500);
        active.once('exit', onExit);
        active.once('message', value => { if (settled) return; settled = true; clearTimeout(timer); active.removeListener('exit', onExit); resolve(value); });
        active.send(job);
      });
    }
    await startWorker();
    const contentResults = [];
    console.error(`SQL : ${candidates.length} extraits candidats dans ${files.length} pages.`);
    for (const candidate of candidates) {
      const result = await run({ type: 'content', sql: candidate.sql });
      contentResults.push({ ...candidate, sql: redactSql(candidate.sql), ...result,
        ...(result.error ? { error: redactSql(result.error) } : {}) });
      if (contentResults.length % 50 === 0) console.error(`SQL : ${contentResults.length}/${candidates.length} extraits exécutés.`);
    }
    const exerciseResults = [];
    for (const exercise of catalogue.listExercises().filter(item => item.language === 'sql')) {
      for (const [testIndex] of exercise.tests.entries()) {
        exerciseResults.push({ id: exercise.id, course: exercise.course, test: testIndex + 1, ...(await run({ type: 'exercise', id: exercise.id, testIndex })) });
      }
    }
    worker.kill();
    const output = {
      reference: reference || 'dossier local',
      engine: 'sql.js/WebAssembly fourni par b1-sql',
      content: { pages: files.length, candidates: candidates.length, unqualifiedFragments: skippedFragments.map(fragment => ({ ...fragment, sql: redactSql(fragment.sql) })), results: contentResults },
      exercises: { reference: 'catalogue du dossier local, même avec --reference', catalogue: new Set(exerciseResults.map(item => item.id)).size, runs: exerciseResults.length, results: exerciseResults },
      limites: [
        'Les valeurs après IDENTIFIED BY sont masquées dans ce journal ; les extraits ont été exécutés sans modification.',
        'Les candidats sont extraits des blocs, codes, options, questions, explications et faces dont le texte commence par une instruction SQL ; une requête noyée dans une phrase peut manquer.',
        'Le schéma parc_auto est réinitialisé pour chaque extrait ; des exemples décrivant un autre schéma, un autre dialecte ou une erreur volontaire exigent une qualification manuelle.',
        'Les exercices proviennent toujours du catalogue local, même avec --reference ; ils utilisent leur propre jeu de données et le moteur d’atelier, sans imprimer les tests cachés.',
        'Les valeurs affichées et le sens pédagogique ne sont pas automatiquement comparés ; une exécution réussie ne suffit pas à les valider.'
      ]
    };
    console.log(JSON.stringify(output, null, 2));
    const failures = contentResults.filter(item => !item.ok).length + exerciseResults.filter(item => !item.ok).length + skippedFragments.length;
    process.exitCode = failures ? 1 : 0;
  }
  main().catch(error => { console.error(error.stack || error.message); process.exitCode = 2; });
}
