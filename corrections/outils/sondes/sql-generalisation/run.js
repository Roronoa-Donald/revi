'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const { DatabaseSync } = require('node:sqlite');
const { isDeepStrictEqual } = require('node:util');
const fixtures = require('./fixtures');
const { buildOracle } = require('./oracles');

const repository = '/project';
const cataloguePaths = ['/project/server/exercises/sql.js', '/project/server/exercises/b3-sql.js'];
const enginePaths = ['/project/b1-sql/assets/vendor/sqljs/sql-wasm.js', '/project/b1-sql/assets/vendor/sqljs/sql-wasm.wasm'];
const ddlExceptions = new Set(['sql2-c1-e1', 'sql2-c1-e2', 'sql2-c1-e3']);

function hashBytes(data) {
  return crypto.createHash('sha256').update(data).digest('hex');
}

function fileHashes(paths) {
  return Object.fromEntries(paths.map(file => [file.slice(repository.length + 1), hashBytes(fs.readFileSync(file))]));
}

function identifier(name) {
  if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(name)) throw new Error(`Identifiant SQL invalide : ${name}`);
  return `"${name}"`;
}

function wasmQuery(database, sql, params = []) {
  const statement = database.prepare(sql);
  try {
    if (params.length) statement.bind(params);
    const columns = statement.getColumnNames();
    const values = [];
    while (statement.step()) values.push(statement.get());
    return { columns, values };
  } finally {
    statement.free();
  }
}

function nativeQuery(database, sql, params = []) {
  const statement = database.prepare(sql);
  statement.setReturnArrays(true);
  const columns = statement.columns().map(column => column.name);
  return { columns, values: statement.all(...params) };
}

function wasmRun(database, sql, params = []) {
  database.run(sql, params);
}

function nativeRun(database, sql, params = []) {
  database.prepare(sql).run(...params);
}

function initialize(SQL, schema, data, nativeNeeded = true) {
  assert.deepEqual(Object.keys(data).sort(), Object.keys(schema).sort(), 'Les données et le schéma doivent énumérer les mêmes tables');
  const wasm = new SQL.Database();
  const native = nativeNeeded ? new DatabaseSync(':memory:') : null;
  try {
    wasm.run('PRAGMA foreign_keys = ON');
    if (native) native.exec('PRAGMA foreign_keys = ON');
    for (const [table, columns] of Object.entries(schema)) {
      for (const column of columns) {
        if (!/^[A-Za-z_][A-Za-z0-9_]* (?:INT|TEXT|REAL)(?: PRIMARY KEY)?$/.test(column)) {
          throw new Error(`Définition de colonne invalide : ${column}`);
        }
      }
      const definition = `CREATE TABLE ${identifier(table)} (${columns.join(', ')})`;
      wasm.run(definition);
      if (native) native.exec(definition);
      const insertion = `INSERT INTO ${identifier(table)} VALUES (${columns.map(() => '?').join(', ')})`;
      for (const row of data[table]) {
        assert.equal(row.length, columns.length, `Nombre de colonnes incorrect dans ${table}`);
        wasmRun(wasm, insertion, row);
        if (native) nativeRun(native, insertion, row);
      }
    }
    return { wasm, native };
  } catch (error) {
    wasm.close();
    if (native) native.close();
    throw error;
  }
}

function closeDatabases(databases) {
  databases.wasm.close();
  if (databases.native) databases.native.close();
}

function fingerprint(database) {
  const tables = wasmQuery(database, "SELECT name FROM sqlite_schema WHERE type = 'table' AND name NOT LIKE 'sqlite_%' ORDER BY name").values;
  const content = [];
  for (const [table] of tables) {
    const result = wasmQuery(database, `SELECT * FROM ${identifier(table)}`);
    const columns = result.columns.slice().sort();
    const rows = result.values.map(row => result.columns.map((column, index) => [column, row[index]])
      .sort((left, right) => left[0].localeCompare(right[0])))
      .sort((left, right) => JSON.stringify(left).localeCompare(JSON.stringify(right)));
    content.push({ table, columns, rows });
  }
  return JSON.stringify(content);
}

function historicalFingerprints(SQL, exercises) {
  const seen = new Map();
  let count = 0;
  for (const exercise of exercises) {
    for (const [kind, entries] of [['exemple', exercise.examples || []], ['test', exercise.tests || []]]) {
      for (const [index, entry] of entries.entries()) {
        const database = new SQL.Database();
        try {
          database.run('PRAGMA foreign_keys = ON');
          const setup = String(entry.stdin || '').split('-- VERIFY:')[0];
          if (setup.trim()) database.run(setup);
          const signature = fingerprint(database);
          if (!seen.has(signature)) seen.set(signature, []);
          seen.get(signature).push(`${exercise.id} ${kind} ${index + 1}`);
          count += 1;
        } catch (error) {
          throw new Error(`Impossible de lire le jeu historique ${exercise.id} ${kind} ${index + 1} : ${error.message}`);
        } finally {
          database.close();
        }
      }
    }
  }
  return { seen, count };
}

function fixtureFingerprint(SQL, definition, fixture) {
  const databases = initialize(SQL, definition.schema, fixture.data, false);
  try {
    return fingerprint(databases.wasm);
  } finally {
    closeDatabases(databases);
  }
}

function normalizeResult(result, comparison) {
  const rows = result.values.map(row => row.slice());
  const canonical = row => JSON.stringify(row);
  if (comparison.unordered) rows.sort((left, right) => canonical(left).localeCompare(canonical(right)));
  if (comparison.ties) {
    let start = 0;
    while (start < rows.length) {
      let end = start + 1;
      const key = JSON.stringify(comparison.ties.map(column => rows[start][column]));
      while (end < rows.length && JSON.stringify(comparison.ties.map(column => rows[end][column])) === key) end += 1;
      rows.splice(start, end - start, ...rows.slice(start, end).sort((left, right) => canonical(left).localeCompare(canonical(right))));
      start = end;
    }
  }
  return { columns: result.columns, values: rows };
}

function normalized(value, comparison) {
  if (Array.isArray(value)) return value.map(result => normalizeResult(result, comparison));
  if (value && Array.isArray(value.columns) && Array.isArray(value.values)) return normalizeResult(value, comparison);
  return value;
}

function record(caseReport, label, expected, wasm, native, comparison = {}, details = undefined) {
  const normalizedExpected = normalized(expected, comparison);
  const normalizedWasm = normalized(wasm, comparison);
  const normalizedNative = normalized(native, comparison);
  const passed = isDeepStrictEqual(normalizedExpected, normalizedWasm) && isDeepStrictEqual(normalizedExpected, normalizedNative);
  caseReport.checks.push({ label, passed, expected, sqljs: wasm, sqlite: native, comparison, ...(details ? { details } : {}) });
  return passed;
}

function recordMetadata(caseReport, label, expected, observed) {
  const passed = isDeepStrictEqual(expected, observed);
  caseReport.checks.push({ label, passed, expected, observed, source: 'empreintes des états sql.js' });
  return passed;
}

function applyOriginalSolution(databases, solution) {
  const wasmResults = [];
  const nativeResults = [];
  const iterator = databases.wasm.iterateStatements(solution);
  while (true) {
    const next = iterator.next();
    if (next.done) break;
    const statement = next.value;
    const source = statement.getSQL();
    const columns = statement.getColumnNames();
    const values = [];
    let wasmError;
    let nativeError;
    try {
      while (statement.step()) values.push(statement.get());
      if (columns.length) wasmResults.push({ columns, values });
    } catch (error) {
      wasmError = error.message;
    } finally {
      statement.free();
    }
    try {
      const nativeStatement = databases.native.prepare(source);
      const nativeColumns = nativeStatement.columns().map(column => column.name);
      if (nativeColumns.length) {
        nativeStatement.setReturnArrays(true);
        nativeResults.push({ columns: nativeColumns, values: nativeStatement.all() });
      } else nativeStatement.run();
    } catch (error) {
      nativeError = error.message;
    }
    if (wasmError || nativeError) {
      throw new Error(`Exécution du corrigé : sql.js=${wasmError || 'succès'} ; SQLite natif=${nativeError || 'succès'}`);
    }
  }
  return { wasm: wasmResults, native: nativeResults };
}

function rejection(run, category) {
  try {
    run();
    return { rejected: false, category: null, message: null };
  } catch (error) {
    return { rejected: true, category: error.message.toUpperCase().includes(category) ? category : 'AUTRE', message: error.message };
  }
}

function indexPredicate(database, name, queryFunction) {
  const indexes = queryFunction(database, "SELECT name, partial FROM pragma_index_list('commandes')").values;
  const partial = indexes.some(entry => entry[0] === name && entry[1] === 1);
  const supports = condition => {
    try {
      queryFunction(database, `SELECT COUNT(*) FROM commandes INDEXED BY ${identifier(name)} WHERE ${condition}`);
      return true;
    } catch (_) {
      return false;
    }
  };
  return { partial, included: supports("statut = 'EN_COURS'"), excluded: !supports("statut = 'ANNULEE'") };
}

function performSteps(caseReport, databases, steps) {
  for (const step of steps) {
    try {
      if (step.kind === 'query') {
        record(caseReport, step.label, step.expected, wasmQuery(databases.wasm, step.sql, step.params),
          nativeQuery(databases.native, step.sql, step.params), step.comparison);
      } else if (step.kind === 'execute') {
        let wasmStatus = 'succès';
        let nativeStatus = 'succès';
        try { wasmRun(databases.wasm, step.sql, step.params); } catch (error) { wasmStatus = error.message; }
        try { nativeRun(databases.native, step.sql, step.params); } catch (error) { nativeStatus = error.message; }
        record(caseReport, step.label, 'succès', wasmStatus, nativeStatus);
      } else if (step.kind === 'reject') {
        const wasm = rejection(() => wasmRun(databases.wasm, step.sql, step.params), step.error);
        const native = rejection(() => nativeRun(databases.native, step.sql, step.params), step.error);
        record(caseReport, step.label, { rejected: true, category: step.error },
          { rejected: wasm.rejected, category: wasm.category }, { rejected: native.rejected, category: native.category }, {},
          { sqljsMessage: wasm.message, sqliteMessage: native.message });
      } else if (step.kind === 'predicate') {
        record(caseReport, step.label, step.expected, indexPredicate(databases.wasm, step.name, wasmQuery),
          indexPredicate(databases.native, step.name, nativeQuery));
      } else throw new Error(`Vérification inconnue : ${step.kind}`);
    } catch (error) {
      caseReport.checks.push({ label: step.label, passed: false, error: error.message });
    }
  }
}

async function main() {
  const hostNamespace = process.env.REVI_AUDIT_NET_NS_HOTE;
  if (!hostNamespace || fs.readFileSync('/proc/1/comm', 'utf8').trim() !== 'bwrap' ||
      fs.readlinkSync('/proc/self/ns/net') === hostNamespace || fs.existsSync('/home') || process.env.HOME !== '/tmp') {
    throw new Error('L’exécution des corrigés exige le confinement du lanceur d’audit.');
  }
  const originalHashes = fileHashes([...cataloguePaths, ...enginePaths]);
  const exercises = cataloguePaths.flatMap(path => require(path));
  assert.equal(exercises.length, 36, 'Le catalogue doit contenir exactement 36 exercices');
  assert.equal(new Set(exercises.map(exercise => exercise.id)).size, 36, 'Identifiants dupliqués');
  assert.deepEqual(Object.keys(fixtures).sort(), exercises.map(exercise => exercise.id).sort(), 'La couverture doit correspondre aux catalogues');
  for (const exercise of exercises) {
    assert.equal(exercise.language, 'sql', `${exercise.id} : langage inattendu`);
    assert.equal(typeof exercise.solution, 'string', `${exercise.id} : corrigé absent`);
    assert.ok(exercise.solution.trim(), `${exercise.id} : corrigé vide`);
    assert.equal(fixtures[exercise.id].cases.length, 2, `${exercise.id} : deux scénarios requis`);
  }

  const SQL = await require(enginePaths[0])({ locateFile: name => `/project/b1-sql/assets/vendor/sqljs/${name}` });
  const versionDatabase = new SQL.Database();
  const sqljsVersion = wasmQuery(versionDatabase, 'SELECT sqlite_version() AS version').values[0][0];
  const defaultForeignKeys = wasmQuery(versionDatabase, 'PRAGMA foreign_keys').values[0][0];
  versionDatabase.close();
  const nativeVersionDatabase = new DatabaseSync(':memory:');
  const nativeVersion = nativeVersionDatabase.prepare('SELECT sqlite_version() AS version').get().version;
  nativeVersionDatabase.close();

  const historical = historicalFingerprints(SQL, exercises);
  const report = {
    generatedAt: new Date().toISOString(),
    versions: { node: process.version, sqljsSQLite: sqljsVersion, nativeSQLite: nativeVersion, sqljsDefaultForeignKeys: defaultForeignKeys },
    fileSha256: originalHashes,
    historicalFixtureCount: historical.count,
    noveltyScope: 'États initiaux des exemples et tests des 36 exercices du catalogue, comparés comme multisets de lignes et colonnes par table.',
    ddlException: [...ddlExceptions],
    cases: []
  };

  console.error(`Moteurs : sql.js/SQLite ${sqljsVersion} ; SQLite natif ${nativeVersion} ; Node ${process.version}`);
  console.error(`États historiques examinés : ${historical.count} ; PRAGMA foreign_keys activé explicitement.`);

  for (const exercise of exercises) {
    const definition = fixtures[exercise.id];
    const allCases = [...definition.cases, ...(definition.supplementary || [])];
    const signatures = allCases.map(fixture => fixtureFingerprint(SQL, definition, fixture));
    for (const [caseNumber, fixture] of allCases.entries()) {
      const historicalMatches = historical.seen.get(signatures[caseNumber]) || [];
      const exception = ddlExceptions.has(exercise.id);
      const caseReport = {
        id: exercise.id,
        scenario: String.fromCharCode('A'.charCodeAt(0) + caseNumber),
        label: fixture.label,
        solutionSha256: hashBytes(exercise.solution),
        initialSha256: hashBytes(signatures[caseNumber]),
        initialNovelty: exception ? 'exception-creation-base-vide' : 'controle',
        historicalMatches,
        checks: []
      };
      report.cases.push(caseReport);
      if (exception) {
        recordMetadata(caseReport, 'état initial identique entre A et B et déjà présent (exception CREATE)',
          { casesIdentical: true, historicalMatch: true },
          { casesIdentical: signatures[0] === signatures[1], historicalMatch: historicalMatches.length > 0 });
      } else {
        recordMetadata(caseReport, 'état initial distinct des exemples/tests et de l’autre scénario',
          { historicalMatches: 0, otherCaseIdentical: false },
          { historicalMatches: historicalMatches.length, otherCaseIdentical: signatures.some((signature, index) => index !== caseNumber && signature === signatures[caseNumber]) });
      }
      let databases;
      try {
        const plan = buildOracle(exercise.id, fixture, caseNumber);
        databases = initialize(SQL, definition.schema, fixture.data);
        const originalResults = applyOriginalSolution(databases, exercise.solution);
        record(caseReport, 'résultats du corrigé intégral', plan.main, originalResults.wasm, originalResults.native, plan.comparison);
        performSteps(caseReport, databases, plan.steps);
      } catch (error) {
        caseReport.checks.push({ label: 'préparation ou exécution', passed: false, error: error.message });
      } finally {
        if (databases) closeDatabases(databases);
      }
      caseReport.passed = caseReport.checks.every(check => check.passed);
      console.error(`${caseReport.passed ? 'OK' : 'ÉCHEC'} ${caseReport.id} ${caseReport.scenario} — ${caseReport.label} (${caseReport.checks.length} contrôles)`);
      for (const check of caseReport.checks.filter(entry => !entry.passed)) {
        console.error(`  ${check.label} : ${JSON.stringify({ expected: check.expected, observed: check.observed, sqljs: check.sqljs, sqlite: check.sqlite, error: check.error })}`);
      }
    }
  }
  report.finalFileSha256 = fileHashes([...cataloguePaths, ...enginePaths]);
  report.sourcesUnchangedDuringRun = isDeepStrictEqual(report.fileSha256, report.finalFileSha256);
  report.summary = {
    exercises: exercises.length,
    scenarios: report.cases.length,
    passed: report.cases.filter(entry => entry.passed).length,
    failed: report.cases.filter(entry => !entry.passed).length,
    checks: report.cases.reduce((sum, entry) => sum + entry.checks.length, 0),
    failedChecks: report.cases.reduce((sum, entry) => sum + entry.checks.filter(check => !check.passed).length, 0)
  };
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  console.error(`Bilan : ${report.summary.passed}/${report.summary.scenarios} scénarios conformes ; ${report.summary.failed} échec(s) ; ${report.summary.failedChecks}/${report.summary.checks} contrôles en échec.`);
  console.error(`Sources inchangées pendant l’exécution : ${report.sourcesUnchangedDuringRun ? 'oui' : 'non'}.`);
  if (report.summary.failed || !report.sourcesUnchangedDuringRun) process.exitCode = 1;
}

main().catch(error => {
  console.error(`Banc interrompu : ${error.stack || error.message}`);
  process.exitCode = 2;
});
