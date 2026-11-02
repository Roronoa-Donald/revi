'use strict';

if (require('./lot1-sandbox').runInsideIsolatedOrRegister(__filename)) {

const assert = require('node:assert/strict');
const test = require('node:test');
const sqlEngine = require('../assets/js/engines/sql-wasm-engine');
const exercises = require('../server/exercises/b1-sql');
const { PARC_SQL } = require('../b1-sql/assets/js/sql-simulator');

const datasets = [
  {
    marker: 'A-NV-',
    brands: [
      ['MIR', 'MIRAGE', 'JAPON'], ['MOR', 'MORAVA', 'JAPON'],
      ['ATL', 'ATLAS', 'TOGO'], ['ZEP', 'ZEPHYR', 'FRANCE'], ['SIL', 'SILENE', 'TOGO']
    ],
    cars: [
      ['A-NV-17', 'MIRAGE', 'MIR', 'DIESEL', null, 4, 6000000, 5],
      ['A-NV-09', 'MIRAGE', 'MIR', 'ESSENCE', '2031-01-01', 5, 44000000, 4],
      ['A-NV-32', 'MORAVA', 'MOR', 'DIESEL', null, 6, 50000000, 5],
      ['A-NV-21', 'ATLAS', 'ATL', 'HYBRIDE', '', 0, 5999999, 2],
      ['A-NV-41', 'ATLAS', 'ATL', 'ESSENCE', null, 5, 50000001, 7],
      ['A-NV-40', 'MIRAGE', 'MIR', 'DIESEL', null, 5, 6000001, 5]
    ],
    equipment: [['NVA', 'Balise', 0], ['NVB', 'Camera', null], ['NVC', 'Radar', 125]],
    associations: [
      ['A-NV-17', 'NVA'], ['A-NV-17', 'NVB'], ['A-NV-09', 'NVA'],
      ['A-NV-32', 'NVC'], ['A-NV-21', 'NVB'], ['A-NV-41', 'NVC']
    ]
  },
  {
    marker: 'B-NV-',
    brands: [
      ['MLI', 'MALI', 'JAPON'], ['MOT', 'MOTIF', 'FRANCE'],
      ['ORI', 'ORION', 'JAPON'], ['VEN', 'VENTURE', 'BENIN'], ['VID', 'VIDE', 'BENIN']
    ],
    cars: [
      ['B-NV-56', 'MALI', 'MLI', 'ELECTRIQUE', '2028-04-02', 3, 25000000, 2],
      ['B-NV-18', 'MALI', 'MLI', 'ESSENCE', null, 5, 25000000, 5],
      ['B-NV-27', 'MOTIF', 'MOT', 'ESSENCE', '', 6, 50000000, 4],
      ['B-NV-42', 'ORION', 'ORI', 'HYBRIDE', '2030-05-04', 11, 8000000, 7],
      ['B-NV-33', 'ORION', 'ORI', 'HYBRIDE', null, 0, 7000000, 7],
      ['B-NV-61', 'VENTURE', 'VEN', 'DIESEL', null, 5, 59000000, 5]
    ],
    equipment: [['NVD', 'Ecran', 44], ['NVE', 'Lampe', null], ['NVF', 'Radio', 0]],
    associations: [
      ['B-NV-18', 'NVD'], ['B-NV-56', 'NVD'], ['B-NV-27', 'NVE'],
      ['B-NV-42', 'NVE'], ['B-NV-33', 'NVF'], ['B-NV-61', 'NVF']
    ]
  }
];

const carColumns = ['immat', 'marque', 'codemarque', 'moteur', 'datecirc', 'km', 'pxachat', 'nbreplace'];
const emptyCreation = new Set(['sq-c2-e1', 'sq-c2-e2']);
let SQL;

test.before(async () => { SQL = await sqlEngine.loadSqlJs(); });

function compareValues(first, second) {
  if (first === second) return 0;
  if (first === null) return -1;
  if (second === null) return 1;
  return first < second ? -1 : 1;
}

function sorted(rows, columns) {
  return rows.slice().sort((first, second) => {
    for (const [index, direction] of columns) {
      const comparison = compareValues(first[index], second[index]);
      if (comparison) return comparison * direction;
    }
    return 0;
  });
}

function query(database, statement, parameters) {
  const prepared = database.prepare(statement);
  try {
    if (parameters) prepared.bind(parameters);
    const columns = prepared.getColumnNames();
    const rows = [];
    while (prepared.step()) rows.push(prepared.get());
    return { columns, rows };
  } finally {
    prepared.free();
  }
}

function initialize(dataset, previousEquipmentSchema) {
  const database = new SQL.Database();
  database.exec(PARC_SQL);
  database.exec('DELETE FROM VoitureEquipement; DELETE FROM Voiture; DELETE FROM Equipement; DELETE FROM Marque;');
  if (previousEquipmentSchema) {
    database.exec('DROP TABLE Equipement; CREATE TABLE Equipement (codeequipement TEXT NOT NULL PRIMARY KEY, nomequipement TEXT NOT NULL UNIQUE);');
  }
  for (const brand of dataset.brands) database.run('INSERT INTO Marque VALUES (?, ?, ?)', brand);
  for (const car of dataset.cars) database.run('INSERT INTO Voiture VALUES (?, ?, ?, ?, ?, ?, ?, ?)', car);
  for (const item of dataset.equipment) {
    database.run(previousEquipmentSchema ? 'INSERT INTO Equipement VALUES (?, ?)' : 'INSERT INTO Equipement VALUES (?, ?, ?)',
      previousEquipmentSchema ? item.slice(0, 2) : item);
  }
  for (const association of dataset.associations) database.run('INSERT INTO VoitureEquipement VALUES (?, ?)', association);
  return database;
}

function result(columns, rows) {
  return { columns, rows };
}

function countryGroups(dataset) {
  const groups = new Map();
  for (const brand of dataset.brands) {
    const country = brand[2];
    const cars = dataset.cars.filter(car => car[2] === brand[0]);
    const group = groups.get(country) || { lines: 0, cars: 0, sum: null };
    group.lines += Math.max(cars.length, 1);
    group.cars += cars.length;
    for (const car of cars) group.sum = (group.sum ?? 0) + car[6];
    groups.set(country, group);
  }
  return sorted([...groups].map(([country, group]) => [country, group.lines, group.cars, group.sum]), [[0, 1]]);
}

function brandGroups(dataset) {
  const groups = new Map();
  for (const car of dataset.cars) {
    const group = groups.get(car[1]) || [];
    group.push(car);
    groups.set(car[1], group);
  }
  return groups;
}

function expected(exerciseId, dataset) {
  const cars = dataset.cars;
  const groups = brandGroups(dataset);
  switch (exerciseId) {
    case 'sq-c1-e1': return result(carColumns, sorted(cars, [[0, 1]]));
    case 'sq-c1-e2': return result(['immat', 'marque'], sorted(cars.map(car => [car[0], car[1]]), [[0, 1]]));
    case 'sq-c1-e3': return result(['moteur'], [...new Set(cars.map(car => car[3]))].sort(compareValues).map(value => [value]));
    case 'sq-c3-e1': return result(['immat', 'km'], sorted(cars.filter(car => car[5] >= 5).map(car => [car[0], car[5]]), [[1, -1], [0, 1]]));
    case 'sq-c3-e2': return result(['immat', 'marque', 'pxachat'], sorted(cars.filter(car => car[6] >= 6000000 && car[6] <= 50000000 && car[1].startsWith('M')).map(car => [car[0], car[1], car[6]]), [[2, 1], [0, 1]]));
    case 'sq-c3-e3': return result(['immat', 'marque'], sorted(cars.filter(car => car[4] === null).map(car => [car[0], car[1]]), [[0, 1]]).slice(0, 3));
    case 'sq-c4-e1':
    case 'sq-c4-e2': {
      const rows = [];
      for (const brand of dataset.brands) {
        const matches = cars.filter(car => car[2] === brand[0]);
        if (!matches.length && exerciseId === 'sq-c4-e2') rows.push([brand[1], null]);
        for (const car of matches) rows.push([brand[1], car[0]]);
      }
      return result(['nommarque', 'immat'], sorted(rows, [[0, 1], [1, 1]]));
    }
    case 'sq-c4-e3': {
      const rows = dataset.associations.map(association => [association[0], dataset.equipment.find(item => item[0] === association[1])[1]]);
      return result(['immat', 'nomequipement'], sorted(rows, [[0, 1], [1, 1]]));
    }
    case 'sq-c5-e1': return result(['paysmarque', 'nb_lignes', 'nb_voitures', 'total_achat'], countryGroups(dataset));
    case 'sq-c5-e2': {
      const rows = [...groups].map(([brand, entries]) => [brand, entries.reduce((total, car) => total + car[6], 0)]);
      return result(['marque', 'total'], sorted(rows.filter(row => row[1] >= 50000000), [[1, -1], [0, 1]]));
    }
    case 'sq-c5-e3': {
      const rows = [...groups].map(([brand, entries]) => [brand, entries.length, Math.min(...entries.map(car => car[5])), Math.max(...entries.map(car => car[5]))]);
      return result(['marque', 'effectif', 'km_min', 'km_max'], sorted(rows, [[0, 1]]));
    }
    case 'sq-c6-e3': {
      const japanese = new Set(dataset.brands.filter(brand => brand[2] === 'JAPON').map(brand => brand[0]));
      return result(['immat', 'marque'], sorted(cars.filter(car => japanese.has(car[2])).map(car => [car[0], car[1]]), [[0, 1]]));
    }
    default: throw new Error(`Oracle absent : ${exerciseId}`);
  }
}

function assertNewData(exercise, dataset) {
  const oldText = [exercise.solution, ...exercise.examples.map(example => example.stdin), ...exercise.tests.map(entry => entry.stdin)].join('\n');
  assert.equal(oldText.includes(dataset.marker), false, `${exercise.id} : marqueur déjà présent`);
  for (const car of dataset.cars) assert.equal(oldText.includes(car[0]), false, `${exercise.id} : ligne déjà présente`);
}

function assertConstraint(database, statement, parameters) {
  assert.throws(() => database.run(statement, parameters));
}

function uniqueColumnSets(database, table) {
  return query(database, `PRAGMA index_list("${table}")`).rows.filter(row => row[2] === 1).map(row => {
    const indexName = String(row[1]).replace(/"/g, '""');
    return query(database, `PRAGMA index_info("${indexName}")`).rows.map(column => column[2]);
  });
}

function verifyCreation(exercise, dataset) {
  const database = new SQL.Database();
  try {
    database.exec(exercise.solution);
    const marker = `${dataset.marker}DDL`;
    const oldText = [exercise.solution, ...exercise.examples.map(example => example.stdin), ...exercise.tests.map(entry => entry.stdin)].join('\n');
    assert.equal(oldText.includes(marker), false);
    if (exercise.id === 'sq-c2-e1') {
      database.run('INSERT INTO Marque VALUES (?, ?, ?)', [marker, `${marker} NOM`, 'NOUVEAU']);
      const inserted = query(database, 'SELECT codemarque, nommarque, paysmarque FROM Marque WHERE codemarque = ?', [marker]);
      assert.deepEqual(inserted.rows, [[marker, `${marker} NOM`, 'NOUVEAU']]);
      assertConstraint(database, 'INSERT INTO Marque VALUES (?, ?, ?)', [null, `${marker} AUTRE`, 'NOUVEAU']);
      assertConstraint(database, 'INSERT INTO Marque VALUES (?, ?, ?)', [`${marker} X`, null, 'NOUVEAU']);
      assertConstraint(database, 'INSERT INTO Marque VALUES (?, ?, ?)', [`${marker} Y`, `${marker} AUTRE`, null]);
      assertConstraint(database, 'INSERT INTO Marque VALUES (?, ?, ?)', [marker, `${marker} AUTRE`, 'NOUVEAU']);
      assertConstraint(database, 'INSERT INTO Marque VALUES (?, ?, ?)', [`${marker} X`, `${marker} NOM`, 'NOUVEAU']);
      assert.ok(uniqueColumnSets(database, 'Marque').some(columns => JSON.stringify(columns) === JSON.stringify(['codemarque', 'nommarque'])));
    } else {
      database.run('INSERT INTO Equipement (codeequipement, nomequipement) VALUES (?, ?)', [marker, `${marker} NOM`]);
      database.run('INSERT INTO Equipement (codeequipement, nomequipement, prix) VALUES (?, ?, NULL)', [`${marker} X`, `${marker} AUTRE`]);
      const rows = query(database, 'SELECT codeequipement, prix FROM Equipement ORDER BY codeequipement').rows;
      assert.deepEqual(rows, sorted([['AIR', 0], [marker, 0], [`${marker} X`, null]], [[0, 1]]));
      assertConstraint(database, 'INSERT INTO Equipement VALUES (?, ?, ?)', [null, `${marker} AUTRE2`, 1]);
      assertConstraint(database, 'INSERT INTO Equipement VALUES (?, ?, ?)', [`${marker} Y`, null, 1]);
      assertConstraint(database, 'INSERT INTO Equipement VALUES (?, ?, ?)', [marker, `${marker} AUTRE2`, 1]);
      assertConstraint(database, 'INSERT INTO Equipement VALUES (?, ?, ?)', [`${marker} Y`, `${marker} NOM`, 1]);
    }
  } finally {
    database.close();
  }
}

function verifyAlter(exercise, dataset) {
  const database = initialize(dataset, true);
  try {
    database.exec(exercise.solution);
    const columns = query(database, 'PRAGMA table_info(Equipement)').rows;
    const price = columns.find(column => column[1] === 'prix');
    assert.ok(price);
    assert.equal(price[2].toUpperCase(), 'INTEGER');
    assert.equal(price[4], '0');
    assert.deepEqual(query(database, 'SELECT codeequipement, nomequipement, prix FROM Equipement ORDER BY codeequipement').rows,
      sorted(dataset.equipment.map(item => [item[0], item[1], 0]), [[0, 1]]));
  } finally {
    database.close();
  }
}

function verifyMutation(exercise, dataset) {
  const database = initialize(dataset, false);
  try {
    database.exec(exercise.solution);
    const cars = exercise.id === 'sq-c6-e1'
      ? dataset.cars.map(car => car.map((value, index) => index === 5 && value < 5 ? value + 10 : value))
      : dataset.cars.filter(car => car[4] !== null);
    const retained = new Set(cars.map(car => car[0]));
    const associations = exercise.id === 'sq-c6-e1'
      ? dataset.associations : dataset.associations.filter(association => retained.has(association[0]));
    assert.deepEqual(query(database, 'SELECT * FROM Voiture ORDER BY immat').rows, sorted(cars, [[0, 1]]));
    assert.deepEqual(query(database, 'SELECT * FROM VoitureEquipement ORDER BY immat, codeequipement').rows, sorted(associations, [[0, 1], [1, 1]]));
    assert.deepEqual(query(database, 'SELECT * FROM Equipement ORDER BY codeequipement').rows, sorted(dataset.equipment, [[0, 1]]));
  } finally {
    database.close();
  }
}

for (const exercise of exercises) {
  test(`${exercise.id} : ${emptyCreation.has(exercise.id) ? 'nouvelles vérifications sur base vide' : 'deux jeux inédits et oracle indépendant'}`, () => {
    for (const dataset of datasets) {
      assertNewData(exercise, dataset);
      if (emptyCreation.has(exercise.id)) {
        verifyCreation(exercise, dataset);
      } else if (exercise.id === 'sq-c2-e3') {
        verifyAlter(exercise, dataset);
      } else if (exercise.id === 'sq-c6-e1' || exercise.id === 'sq-c6-e2') {
        verifyMutation(exercise, dataset);
      } else {
        const database = initialize(dataset, false);
        try {
          assert.deepEqual(query(database, exercise.solution), expected(exercise.id, dataset));
        } finally {
          database.close();
        }
      }
    }
  });
}

test('une requête adaptée aux jeux connus réussit les anciens tests mais échoue sur le parc inédit', async () => {
  const exercise = exercises.find(item => item.id === 'sq-c1-e1');
  const memorized = "SELECT * FROM Voiture WHERE EXISTS (SELECT 1 FROM Voiture WHERE immat IN ('TG-7854-Z', 'TG-9004-AX', 'TG-2222-BC', 'P-A', 'P-B')) ORDER BY immat ASC;";
  for (const sample of [...exercise.examples, ...exercise.tests]) {
    const output = await sqlEngine.execute(memorized, sample.stdin, { timeoutMs: 10000 });
    assert.equal(output.status, 'success', output.stderr);
    assert.equal(output.stdout.trim(), sample.expected.trim());
  }
  const database = initialize(datasets[0], false);
  try {
    assert.notDeepEqual(query(database, memorized), expected(exercise.id, datasets[0]));
  } finally {
    database.close();
  }
});

}
