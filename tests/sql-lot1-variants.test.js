'use strict';

if (require('./lot1-sandbox').runInsideIsolatedOrRegister(__filename)) {

const test = require('node:test');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const sqlEngine = require('../assets/js/engines/sql-wasm-engine');
const exercises = require('../server/exercises/b1-sql');
const { runTests, MAX_TESTS } = require('../server/exercises/runner');
const localRunner = require('../server/services/execution/local-runner');

const variants = {
  'sq-c1-e1': [
    'SELECT * FROM Voiture ORDER BY immat DESC;',
    'SELECT immat, marque FROM Voiture ORDER BY immat ASC;'
  ],
  'sq-c1-e2': [
    'SELECT immat FROM Voiture ORDER BY immat ASC;',
    'SELECT marque, immat FROM Voiture ORDER BY immat ASC;'
  ],
  'sq-c1-e3': [
    'SELECT moteur FROM Voiture ORDER BY moteur ASC;',
    'SELECT DISTINCT marque FROM Voiture ORDER BY marque ASC;'
  ],
  'sq-c2-e1': [
    "CREATE TABLE Marque (codemarque TEXT PRIMARY KEY, nommarque TEXT NOT NULL UNIQUE, paysmarque TEXT NOT NULL, UNIQUE (codemarque, nommarque)); INSERT INTO Marque (codemarque, nommarque, paysmarque) VALUES ('BMW', 'BMW', 'ALLEMAGNE');",
    "CREATE TABLE Marque (codemarque TEXT NOT NULL PRIMARY KEY, nommarque TEXT NOT NULL, paysmarque TEXT NOT NULL, UNIQUE (codemarque, nommarque)); INSERT INTO Marque (codemarque, nommarque, paysmarque) VALUES ('BMW', 'BMW', 'ALLEMAGNE');"
  ],
  'sq-c2-e2': [
    "CREATE TABLE Equipement (codeequipement TEXT NOT NULL PRIMARY KEY, nomequipement TEXT NOT NULL, prix INTEGER DEFAULT 0); INSERT INTO Equipement (codeequipement, nomequipement) VALUES ('AIR', 'Climatisation');",
    "CREATE TABLE Equipement (codeequipement TEXT NOT NULL PRIMARY KEY, nomequipement TEXT UNIQUE, prix INTEGER DEFAULT 0); INSERT INTO Equipement (codeequipement, nomequipement) VALUES ('AIR', 'Climatisation');"
  ],
  'sq-c2-e3': [
    'ALTER TABLE Equipement ADD COLUMN prix INTEGER DEFAULT 1;',
    'ALTER TABLE Equipement ADD COLUMN prix INTEGER;'
  ],
  'sq-c3-e1': [
    'SELECT immat, km FROM Voiture WHERE km > 5 ORDER BY km DESC, immat ASC;',
    'SELECT immat, km FROM Voiture WHERE km >= 5 ORDER BY km ASC, immat ASC;'
  ],
  'sq-c3-e2': [
    "SELECT immat, marque, pxachat FROM Voiture WHERE pxachat > 6000000 AND pxachat < 50000000 AND marque LIKE 'M%' ORDER BY pxachat ASC, immat ASC;",
    "SELECT immat, marque, pxachat FROM Voiture WHERE pxachat BETWEEN 6000000 AND 50000000 AND marque LIKE '%M%' ORDER BY pxachat ASC, immat ASC;"
  ],
  'sq-c3-e3': [
    'SELECT immat, marque FROM Voiture WHERE datecirc = NULL ORDER BY immat ASC LIMIT 3;',
    'SELECT immat, marque FROM Voiture WHERE datecirc IS NULL ORDER BY immat ASC;'
  ],
  'sq-c4-e1': [
    'SELECT M.nommarque, V.immat FROM Marque M LEFT JOIN Voiture V ON M.codemarque = V.codemarque ORDER BY M.nommarque ASC, V.immat ASC;',
    'SELECT M.nommarque, V.immat FROM Marque M INNER JOIN Voiture V ON M.nommarque = V.codemarque ORDER BY M.nommarque ASC, V.immat ASC;'
  ],
  'sq-c4-e2': [
    'SELECT M.nommarque, V.immat FROM Marque M INNER JOIN Voiture V ON M.codemarque = V.codemarque ORDER BY M.nommarque ASC, V.immat ASC;',
    "SELECT M.nommarque, COALESCE(V.immat, 'AUCUNE') AS immat FROM Marque M LEFT JOIN Voiture V ON M.codemarque = V.codemarque ORDER BY M.nommarque ASC, V.immat ASC;"
  ],
  'sq-c4-e3': [
    'SELECT V.immat, E.nomequipement FROM Voiture V INNER JOIN VoitureEquipement VE ON V.immat = VE.immat INNER JOIN Equipement E ON V.codemarque = E.codeequipement ORDER BY V.immat ASC, E.nomequipement ASC;',
    'SELECT V.immat, E.nomequipement FROM Voiture V INNER JOIN VoitureEquipement VE ON V.immat = VE.immat CROSS JOIN Equipement E ORDER BY V.immat ASC, E.nomequipement ASC;'
  ],
  'sq-c5-e1': [
    'SELECT M.paysmarque, COUNT(V.pxachat) AS nb_lignes, COUNT(V.immat) AS nb_voitures, SUM(V.pxachat) AS total_achat FROM Marque M LEFT JOIN Voiture V ON M.codemarque = V.codemarque GROUP BY M.paysmarque ORDER BY M.paysmarque ASC;',
    'SELECT M.paysmarque, COUNT(*) AS nb_lignes, COUNT(V.immat) AS nb_voitures, SUM(DISTINCT V.pxachat) AS total_achat FROM Marque M LEFT JOIN Voiture V ON M.codemarque = V.codemarque GROUP BY M.paysmarque ORDER BY M.paysmarque ASC;'
  ],
  'sq-c5-e2': [
    'SELECT marque, SUM(pxachat) AS total FROM Voiture GROUP BY marque HAVING SUM(pxachat) > 50000000 ORDER BY total DESC, marque ASC;',
    'SELECT marque, SUM(pxachat) AS total FROM Voiture GROUP BY marque ORDER BY total DESC, marque ASC;'
  ],
  'sq-c5-e3': [
    'SELECT marque, COUNT(DISTINCT km) AS effectif, MIN(km) AS km_min, MAX(km) AS km_max FROM Voiture GROUP BY marque ORDER BY marque ASC;',
    'SELECT marque, COUNT(*) AS effectif, MAX(km) AS km_min, MAX(km) AS km_max FROM Voiture GROUP BY marque ORDER BY marque ASC;'
  ],
  'sq-c6-e1': [
    'UPDATE Voiture SET km = km + 10 WHERE km <= 5;',
    'UPDATE Voiture SET km = 10 WHERE km < 5;'
  ],
  'sq-c6-e2': [
    'DELETE FROM Voiture WHERE datecirc IS NOT NULL;',
    "DELETE FROM Voiture WHERE datecirc IS NULL OR datecirc = '';"
  ],
  'sq-c6-e3': [
    'SELECT immat, marque FROM Voiture WHERE codemarque IN (SELECT codemarque FROM Marque) ORDER BY immat ASC;',
    "SELECT immat, marque FROM Voiture WHERE codemarque = (SELECT codemarque FROM Marque WHERE paysmarque = 'JAPON') ORDER BY immat ASC;"
  ]
};

test('les 18 corrigés passent et deux variantes erronées par exercice échouent', async diagnostic => {
  const accepted = [];
  let rejected = 0;
  const execute = async ({ code, stdin }) => {
    const output = await sqlEngine.execute(code, stdin, { timeoutMs: 10000 });
    return { ...output, ok: output.status === 'success' };
  };
  assert.equal(exercises.length, 18);
  assert.equal(Object.keys(variants).length, exercises.length);
  for (const exercise of exercises) {
    const choices = variants[exercise.id];
    assert.equal(choices.length, 2, exercise.id);
    const solution = await runTests(exercise, exercise.solution, { execute });
    assert.equal(solution.error, undefined, exercise.id);
    assert.equal(solution.passed, solution.total, exercise.id);
    for (const [index, code] of choices.entries()) {
      const result = await runTests(exercise, code, { execute });
      assert.equal(result.error, undefined, `${exercise.id}, variante ${index + 1}`);
      if (result.passed === result.total) accepted.push(`${exercise.id}, variante ${index + 1}`);
      else {
        assert.equal(result.stop && result.stop.reason, 'wrong_output', `${exercise.id}, variante ${index + 1} non évaluée`);
        rejected++;
      }
    }
  }
  diagnostic.diagnostic(`${rejected}/36 variantes rejetées ; variantes acceptées : ${accepted.join(', ') || 'aucune'}.`);
  assert.deepEqual(accepted, []);
});

test('les variantes de création insèrent la bonne ligne mais violent une contrainte', async () => {
  const SQL = await sqlEngine.loadSqlJs();
  const checks = [
    { id: 'sq-c2-e1', query: 'SELECT codemarque, nommarque, paysmarque FROM Marque', rows: [['BMW', 'BMW', 'ALLEMAGNE']] },
    { id: 'sq-c2-e2', query: 'SELECT codeequipement, nomequipement, prix FROM Equipement', rows: [['AIR', 'Climatisation', 0]] }
  ];
  for (const check of checks) {
    const exercise = exercises.find(item => item.id === check.id);
    for (const [index, code] of variants[check.id].entries()) {
      const label = `${check.id}, variante ${index + 1}`;
      if (check.id === 'sq-c2-e2') {
        assert.match(code, /INSERT INTO Equipement\s*\(\s*codeequipement\s*,\s*nomequipement\s*\)\s*VALUES/i, label);
      }
      const db = new SQL.Database();
      try {
        db.run(code);
        assert.deepEqual(db.exec(check.query)[0].values, check.rows, label);
      } finally {
        db.close();
      }
      const sample = exercise.tests[2];
      const output = await sqlEngine.execute(code, sample.stdin, { timeoutMs: 10000 });
      assert.equal(output.status, 'success', label);
      assert.notEqual(output.stdout.trim(), sample.expected.trim(), label);
    }
  }
});

test('chaque jeu de création vérifie les valeurs de la ligne initiale', async () => {
  const changes = [
    { id: 'sq-c2-e1', from: "('BMW', 'BMW', 'ALLEMAGNE')", to: "('BMW', 'BMW', 'FRANCE')" },
    { id: 'sq-c2-e2', from: "('AIR', 'Climatisation')", to: "('AIR', 'Autre équipement')" }
  ];
  for (const change of changes) {
    const exercise = exercises.find(item => item.id === change.id);
    const code = exercise.solution.replace(change.from, change.to);
    assert.notEqual(code, exercise.solution, change.id);
    for (const sample of exercise.tests) {
      const output = await sqlEngine.execute(code, sample.stdin, { timeoutMs: 10000 });
      assert.equal(output.status, 'success', `${change.id}, ${sample.label}`);
      assert.notEqual(output.stdout.trim(), sample.expected.trim(), `${change.id}, ${sample.label}`);
    }
  }
});

test('un DEFAULT erroné est rejeté même si la ligne initiale contient zéro', async () => {
  const exercise = exercises.find(item => item.id === 'sq-c2-e2');
  const code = "CREATE TABLE Equipement (codeequipement TEXT NOT NULL PRIMARY KEY, nomequipement TEXT NOT NULL UNIQUE, prix INTEGER DEFAULT 1); INSERT INTO Equipement (codeequipement, nomequipement, prix) VALUES ('AIR', 'Climatisation', 0);";
  const SQL = await sqlEngine.loadSqlJs();
  const db = new SQL.Database();
  try {
    db.run(code);
    assert.deepEqual(db.exec('SELECT codeequipement, nomequipement, prix FROM Equipement')[0].values, [['AIR', 'Climatisation', 0]]);
  } finally {
    db.close();
  }
  for (const sample of exercise.tests.slice(0, 2)) {
    const output = await sqlEngine.execute(code, sample.stdin, { timeoutMs: 10000 });
    assert.equal(output.status, 'success', sample.label);
    assert.notEqual(output.stdout.trim(), sample.expected.trim(), sample.label);
  }
});

const crossVariants = {
  "sq-c1-e1": [
    "SELECT * FROM Voiture ORDER BY km DESC, immat ASC;",
    "SELECT * FROM Voiture WHERE datecirc IS NOT NULL ORDER BY immat ASC;",
  ],
  "sq-c1-e2": [
    "SELECT immat, marque FROM Voiture WHERE datecirc IS NOT NULL ORDER BY immat ASC;",
    "SELECT immat, marque FROM Voiture ORDER BY marque ASC, immat ASC;",
  ],
  "sq-c1-e3": [
    "SELECT moteur FROM Voiture ORDER BY moteur ASC;",
    "SELECT DISTINCT moteur FROM Voiture WHERE datecirc IS NOT NULL ORDER BY moteur ASC;",
  ],
  "sq-c2-e1": [
    "CREATE TABLE Marque (codemarque TEXT PRIMARY KEY, nommarque TEXT NOT NULL UNIQUE, paysmarque TEXT NOT NULL, UNIQUE (codemarque, nommarque)); INSERT INTO Marque (codemarque, nommarque, paysmarque) VALUES ('BMW', 'BMW', 'ALLEMAGNE');",
    "CREATE TABLE Marque (codemarque TEXT NOT NULL PRIMARY KEY, nommarque TEXT NOT NULL, paysmarque TEXT NOT NULL, UNIQUE (codemarque, nommarque)); INSERT INTO Marque (codemarque, nommarque, paysmarque) VALUES ('BMW', 'BMW', 'ALLEMAGNE');",
  ],
  "sq-c2-e2": [
    "CREATE TABLE Equipement (codeequipement TEXT NOT NULL PRIMARY KEY, nomequipement TEXT NOT NULL, prix INTEGER DEFAULT 0); INSERT INTO Equipement (codeequipement, nomequipement) VALUES ('AIR', 'Climatisation');",
    "CREATE TABLE Equipement (codeequipement TEXT NOT NULL PRIMARY KEY, nomequipement TEXT UNIQUE, prix INTEGER DEFAULT 0); INSERT INTO Equipement (codeequipement, nomequipement) VALUES ('AIR', 'Climatisation');",
  ],
  "sq-c2-e3": [
    "ALTER TABLE Equipement ADD COLUMN prix TEXT DEFAULT 0;",
    "ALTER TABLE Equipement ADD COLUMN prix INTEGER DEFAULT 1;",
  ],
  "sq-c3-e1": [
    "SELECT immat, km FROM Voiture WHERE km > 5 ORDER BY km DESC, immat ASC;",
    "SELECT immat, km FROM Voiture WHERE km >= 5 ORDER BY km ASC, immat ASC;",
  ],
  "sq-c3-e2": [
    "SELECT immat, marque, pxachat FROM Voiture WHERE pxachat > 6000000 AND pxachat < 50000000 AND marque LIKE 'M%' ORDER BY pxachat ASC, immat ASC;",
    "SELECT immat, marque, pxachat FROM Voiture WHERE pxachat BETWEEN 6000000 AND 50000000 AND marque LIKE '%M%' ORDER BY pxachat ASC, immat ASC;",
  ],
  "sq-c3-e3": [
    "SELECT immat, marque FROM Voiture WHERE datecirc IS NULL ORDER BY immat ASC;",
    "SELECT immat, marque FROM Voiture WHERE datecirc IS NULL OR datecirc = '' ORDER BY immat ASC LIMIT 3;",
  ],
  "sq-c4-e1": [
    "SELECT M.nommarque, V.immat FROM Marque M LEFT JOIN Voiture V ON M.codemarque = V.codemarque ORDER BY M.nommarque ASC, V.immat ASC;",
    "SELECT M.nommarque, V.immat FROM Marque M INNER JOIN Voiture V ON M.codemarque = V.codemarque ORDER BY V.immat ASC, M.nommarque ASC;",
  ],
  "sq-c4-e2": [
    "SELECT M.nommarque, V.immat FROM Marque M INNER JOIN Voiture V ON M.codemarque = V.codemarque ORDER BY M.nommarque ASC, V.immat ASC;",
    "SELECT M.nommarque, V.immat FROM Marque M LEFT JOIN Voiture V ON M.codemarque = V.codemarque ORDER BY V.immat ASC, M.nommarque ASC;",
  ],
  "sq-c4-e3": [
    "SELECT V.immat, E.nomequipement FROM Voiture V INNER JOIN VoitureEquipement VE ON V.immat = VE.immat INNER JOIN Equipement E ON VE.codeequipement = E.codeequipement WHERE E.prix > 0 ORDER BY V.immat ASC, E.nomequipement ASC;",
    "SELECT V.immat, E.nomequipement FROM Voiture V INNER JOIN VoitureEquipement VE ON V.immat = VE.immat INNER JOIN Equipement E ON VE.codeequipement = E.codeequipement ORDER BY E.nomequipement ASC, V.immat ASC;",
  ],
  "sq-c5-e1": [
    "SELECT M.paysmarque, COUNT(V.pxachat) AS nb_lignes, COUNT(V.immat) AS nb_voitures, SUM(V.pxachat) AS total_achat FROM Marque M LEFT JOIN Voiture V ON M.codemarque = V.codemarque GROUP BY M.paysmarque ORDER BY M.paysmarque ASC;",
    "SELECT M.paysmarque, COUNT(*) AS nb_lignes, COUNT(V.immat) AS nb_voitures, SUM(DISTINCT V.pxachat) AS total_achat FROM Marque M LEFT JOIN Voiture V ON M.codemarque = V.codemarque GROUP BY M.paysmarque ORDER BY M.paysmarque ASC;",
  ],
  "sq-c5-e2": [
    "SELECT marque, SUM(pxachat) AS total FROM Voiture GROUP BY marque HAVING SUM(pxachat) > 50000000 ORDER BY total DESC, marque ASC;",
    "SELECT marque, SUM(pxachat) AS total FROM Voiture GROUP BY marque ORDER BY total DESC, marque ASC;",
  ],
  "sq-c5-e3": [
    "SELECT marque, COUNT(DISTINCT km) AS effectif, MIN(km) AS km_min, MAX(km) AS km_max FROM Voiture GROUP BY marque ORDER BY marque ASC;",
    "SELECT marque, COUNT(*) AS effectif, MAX(km) AS km_min, MAX(km) AS km_max FROM Voiture GROUP BY marque ORDER BY marque ASC;",
  ],
  "sq-c6-e1": [
    "UPDATE Voiture SET km = km + 10 WHERE km <= 5;",
    "UPDATE Voiture SET km = 10 WHERE km < 5;",
  ],
  "sq-c6-e2": [
    "DELETE FROM Voiture WHERE datecirc IS NULL OR datecirc = '';",
    "DELETE FROM Voiture WHERE datecirc IS NULL AND km = 0;",
  ],
  "sq-c6-e3": [
    "SELECT immat, marque FROM Voiture WHERE codemarque IN (SELECT codemarque FROM Marque) ORDER BY immat ASC;",
    "SELECT immat, marque FROM Voiture WHERE codemarque = (SELECT codemarque FROM Marque WHERE paysmarque = 'JAPON') ORDER BY immat ASC;",
  ],
};

test('les témoins actifs discriminent en croix deux fautes SQL par fiche', async () => {
  const execute = async ({ code, stdin }) => {
    const output = await sqlEngine.execute(code, stdin, { timeoutMs: 10000 });
    return { ...output, ok: output.status === 'success' };
  };
  assert.equal(MAX_TESTS, 7);
  assert.equal(Object.keys(crossVariants).length, exercises.length);
  for (const exercise of exercises) {
    assert.ok(exercise.tests.length <= MAX_TESTS, exercise.id);
    assert.equal(crossVariants[exercise.id].length, 2, exercise.id);
    for (const [caseIndex, sample] of exercise.tests.slice(0, 2).entries()) {
      const oneCase = { ...exercise, tests: [sample], verifyFirstExample: false };
      const reference = await runTests(oneCase, exercise.solution, { execute });
      assert.equal(reference.error, undefined, exercise.id);
      assert.equal(reference.passed, 1, exercise.id);
      assert.equal(reference.stop, null, exercise.id);
      for (const [variantIndex, code] of crossVariants[exercise.id].entries()) {
        const report = await runTests(oneCase, code, { execute });
        const label = exercise.id + ', cas ' + (caseIndex + 1) + ', variante ' + (variantIndex + 1);
        assert.equal(report.error, undefined, label);
        if (caseIndex === variantIndex) {
          assert.equal(report.passed, 0, label);
          assert.equal(report.stop && report.stop.reason, 'wrong_output', label);
        } else {
          assert.equal(report.passed, 1, label);
          assert.equal(report.stop, null, label);
        }
      }
    }
    for (const [variantIndex, code] of crossVariants[exercise.id].entries()) {
      const report = await runTests(exercise, code, { execute });
      assert.equal(report.error, undefined, exercise.id);
      assert.equal(report.stop && report.stop.reason, 'wrong_output', exercise.id);
      assert.equal(report.stop.testIndex, variantIndex, exercise.id);
    }
  }
});

test('contre-vérification des corrigés et variantes avec SQLite natif', diagnostic => {
  const sample = item => {
    const parts = item.stdin.split('-- VERIFY:');
    assert.ok(parts.length <= 2);
    return { setup: parts[0], verify: parts[1] ? sqlEngine.splitSql(parts[1]) : [], expected: item.expected };
  };
  const payload = exercises.map(exercise => ({
    id: exercise.id,
    solution: sqlEngine.splitSql(exercise.solution),
    variants: variants[exercise.id].concat(crossVariants[exercise.id]).map(code => sqlEngine.splitSql(code)),
    examples: exercise.examples.map(sample),
    tests: exercise.tests.map(sample)
  }));
  const script = [
    'import json, sqlite3, sys',
    'exercises = json.load(sys.stdin)',
    'report = {"solution_runs": 0, "variant_runs": 0, "incorrect_solutions": [], "accepted_variants": [], "errors": []}',
    'def table(columns, rows):',
    '    if not rows:',
    '        return "(Requête exécutée avec 0 résultat)"',
    '    values = [["NULL" if value is None else str(value) for value in row] for row in rows]',
    '    widths = [max([len(column)] + [len(row[index]) for row in values]) for index, column in enumerate(columns)]',
    '    border = "+" + "+".join("-" * (width + 2) for width in widths) + "+"',
    '    def line(row):',
    '        return "| " + " | ".join(value.ljust(widths[index]) for index, value in enumerate(row)) + " |"',
    '    count = len(values)',
    '    footer = f"({count} " + ("ligne retournée)" if count == 1 else "lignes retournées)")',
    '    return "\\n".join([border, line(columns), border] + [line(row) for row in values] + [border, footer])',
    'def run(statements, sample):',
    '    db = sqlite3.connect(":memory:")',
    '    try:',
    '        db.executescript(sample["setup"])',
    '        outputs = []',
    '        for statement in statements + sample["verify"]:',
    '            cursor = db.execute(statement)',
    '            if cursor.description is not None:',
    '                outputs.append(table([column[0] for column in cursor.description], cursor.fetchall()))',
    '            else:',
    '                changes = db.execute("SELECT changes()").fetchone()[0]',
    '                suffix = "ligne modifiée" if changes == 1 else "lignes modifiées"',
    '                outputs.append(f"Instruction exécutée avec succès ({changes} {suffix}).")',
    '        return "\\n\\n".join(outputs)',
    '    finally:',
    '        db.close()',
    'for exercise in exercises:',
    '    for index, sample in enumerate(exercise["examples"] + exercise["tests"]):',
    '        try:',
    '            actual = run(exercise["solution"], sample)',
    '            report["solution_runs"] += 1',
    '            if actual != sample["expected"]:',
    '                report["incorrect_solutions"].append([exercise["id"], index])',
    '        except sqlite3.Error as error:',
    '            report["errors"].append([exercise["id"], "solution", index, str(error)])',
    '    for variant_index, variant in enumerate(exercise["variants"]):',
    '        rejected = False',
    '        for index, sample in enumerate(exercise["tests"]):',
    '            try:',
    '                actual = run(variant, sample)',
    '                report["variant_runs"] += 1',
    '                rejected = rejected or actual != sample["expected"]',
    '            except sqlite3.Error as error:',
    '                report["errors"].append([exercise["id"], variant_index, index, str(error)])',
    '        if not rejected:',
    '            report["accepted_variants"].append([exercise["id"], variant_index])',
    'report["version"] = sqlite3.sqlite_version',
    'print(json.dumps(report, ensure_ascii=False))'
  ].join('\n');
  const child = spawnSync('python3', ['-c', script], {
    input: JSON.stringify(payload), encoding: 'utf8', maxBuffer: 4 * 1024 * 1024
  });
  assert.equal(child.status, 0, child.stderr);
  const report = JSON.parse(child.stdout);
  assert.deepEqual(report.errors, []);
  assert.deepEqual(report.incorrect_solutions, []);
  assert.deepEqual(report.accepted_variants, []);
  assert.equal(report.solution_runs, 111);
  assert.equal(report.variant_runs, 372);
  diagnostic.diagnostic(`SQLite ${report.version} : ${report.solution_runs} jeux de corrigés et ${report.variant_runs} exécutions de variantes ; 72/72 variantes rejetées sans erreur SQL.`);
});

test('le correcteur ne réactive pas le moteur SQL local non isolé', async () => {
  const result = await localRunner.runSql('SELECT 1;', '');
  assert.equal(result.ok, false);
  assert.equal(result.httpStatus, 503);
});

}
