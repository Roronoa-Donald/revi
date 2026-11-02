'use strict';

const CAR_COLUMNS = ['immat', 'marque', 'codemarque', 'moteur', 'datecirc', 'km', 'pxachat', 'nbreplace'];
const EQUIPMENT_COLUMNS = ['codeequipement', 'nomequipement', 'prix'];

const definitions = {
  marque: `CREATE TABLE Marque (
  codemarque TEXT NOT NULL PRIMARY KEY,
  nommarque TEXT NOT NULL UNIQUE,
  paysmarque TEXT NOT NULL,
  UNIQUE (codemarque, nommarque)
);`,
  voiture: `CREATE TABLE Voiture (
  immat TEXT NOT NULL PRIMARY KEY,
  marque TEXT NOT NULL,
  codemarque TEXT NOT NULL,
  moteur TEXT NOT NULL,
  datecirc TEXT,
  km INTEGER NOT NULL,
  pxachat INTEGER NOT NULL,
  nbreplace INTEGER NOT NULL,
  FOREIGN KEY (codemarque, marque) REFERENCES Marque (codemarque, nommarque)
);`,
  equipement: `CREATE TABLE Equipement (
  codeequipement TEXT NOT NULL PRIMARY KEY,
  nomequipement TEXT NOT NULL UNIQUE,
  prix INTEGER DEFAULT 0
);`,
  ancienEquipement: `CREATE TABLE Equipement (
  codeequipement TEXT NOT NULL PRIMARY KEY,
  nomequipement TEXT NOT NULL UNIQUE
);`,
  association: `CREATE TABLE VoitureEquipement (
  immat TEXT NOT NULL,
  codeequipement TEXT NOT NULL,
  PRIMARY KEY (immat, codeequipement),
  FOREIGN KEY (immat) REFERENCES Voiture (immat) ON DELETE CASCADE,
  FOREIGN KEY (codeequipement) REFERENCES Equipement (codeequipement) ON DELETE CASCADE
);`
};

function compare(left, right) {
  if (left === right) return 0;
  if (left === null) return -1;
  if (right === null) return 1;
  return left < right ? -1 : 1;
}

function ordered(rows, indexes) {
  return rows.slice().sort((left, right) => {
    for (const [index, direction] of indexes) {
      const result = compare(left[index], right[index]);
      if (result !== 0) return result * direction;
    }
    return 0;
  });
}

function table(columns, rows) {
  if (!rows.length) return '(Requête exécutée avec 0 résultat)';
  const values = rows.map(row => row.map(value => value === null ? 'NULL' : String(value)));
  const widths = columns.map((column, index) => Math.max(column.length, ...values.map(row => row[index].length)));
  const border = '+' + widths.map(width => '-'.repeat(width + 2)).join('+') + '+';
  const line = row => '| ' + row.map((value, index) => String(value).padEnd(widths[index])).join(' | ') + ' |';
  const count = rows.length;
  return [border, line(columns), border, ...values.map(line), border,
    `(${count} ${count === 1 ? 'ligne retournée' : 'lignes retournées'})`].join('\n');
}

function modification(count) {
  return `Instruction exécutée avec succès (${count} ${count === 1 ? 'ligne modifiée' : 'lignes modifiées'}).`;
}

function asLiteral(value) {
  if (value === null) return 'NULL';
  if (typeof value === 'number' && Number.isFinite(value)) return String(value);
  if (typeof value !== 'string') throw new Error('Valeur de fixture non prise en charge');
  return "'" + value.replaceAll("'", "''") + "'";
}

function insert(tableName, columns, rows) {
  if (!rows.length) return '';
  return `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES\n` +
    rows.map(row => '  (' + row.map(asLiteral).join(', ') + ')').join(',\n') + ';';
}

function expand(data) {
  const byCode = new Map(data.brands.map(item => [item[0], item]));
  const cars = data.cars.map(([plate, code, km, price, date, engine]) => {
    const brand = byCode.get(code);
    if (!brand) throw new Error(`Marque manquante : ${code}`);
    return [plate, brand[1], code, engine, date, km, price, 5];
  });
  return { ...data, cars };
}

function schema(previous = false) {
  return ['PRAGMA foreign_keys = ON;', definitions.marque, definitions.voiture,
    previous ? definitions.ancienEquipement : definitions.equipement, definitions.association].join('\n');
}

function setup(data) {
  const expanded = expand(data);
  return [schema(),
    insert('Marque', ['codemarque', 'nommarque', 'paysmarque'], expanded.brands),
    insert('Voiture', CAR_COLUMNS, expanded.cars),
    insert('Equipement', EQUIPMENT_COLUMNS, expanded.equipment),
    insert('VoitureEquipement', ['immat', 'codeequipement'], expanded.links)
  ].filter(Boolean).join('\n');
}

const probes = {
  marque_notnull: {
    verify: `SELECT codemarque, nommarque, paysmarque FROM Marque WHERE codemarque = 'BMW';\nINSERT OR IGNORE INTO Marque (codemarque, nommarque, paysmarque) VALUES (NULL, 'AUTRE', 'FRANCE');\nSELECT COUNT(*) AS null_acceptes FROM Marque WHERE codemarque IS NULL;`,
    columns: ['null_acceptes'], rows: [[0]], kind: 'creation', initial: 'marque', verificationChanges: 0
  },
  marque_unique: {
    verify: `SELECT codemarque, nommarque, paysmarque FROM Marque WHERE codemarque = 'BMW';\nINSERT OR IGNORE INTO Marque (codemarque, nommarque, paysmarque) VALUES ('ALT', 'BMW', 'FRANCE');\nSELECT COUNT(*) AS noms FROM Marque WHERE nommarque = 'BMW';`,
    columns: ['noms'], rows: [[1]], kind: 'creation', initial: 'marque', verificationChanges: 0
  },
  equipement_unique: {
    verify: `SELECT codeequipement, nomequipement, prix FROM Equipement WHERE codeequipement = 'AIR';\nINSERT OR IGNORE INTO Equipement (codeequipement, nomequipement) VALUES ('ALT', 'Climatisation');\nSELECT COUNT(*) AS noms FROM Equipement WHERE nomequipement = 'Climatisation';\nINSERT INTO Equipement (codeequipement, nomequipement) VALUES ('TST', 'Trousse');\nSELECT prix FROM Equipement WHERE codeequipement = 'TST';`,
    columns: ['noms'], rows: [[1]], kind: 'creation', initial: 'equipement', defaultCheck: true, verificationChanges: 0
  },
  equipement_notnull: {
    verify: `SELECT codeequipement, nomequipement, prix FROM Equipement WHERE codeequipement = 'AIR';\nINSERT OR IGNORE INTO Equipement (codeequipement, nomequipement) VALUES ('ALT', NULL);\nSELECT COUNT(*) AS null_acceptes FROM Equipement WHERE nomequipement IS NULL;\nINSERT INTO Equipement (codeequipement, nomequipement) VALUES ('TST', 'Trousse');\nSELECT prix FROM Equipement WHERE codeequipement = 'TST';`,
    columns: ['null_acceptes'], rows: [[0]], kind: 'creation', initial: 'equipement', defaultCheck: true, verificationChanges: 0
  },
  prix_type: {
    verify: `SELECT UPPER(type) AS type FROM pragma_table_info('Equipement') WHERE name = 'prix';`,
    columns: ['type'], rows: [['INTEGER']], kind: 'alter', verificationChanges: null
  },
  prix_defaut: {
    verify: `INSERT INTO Equipement (codeequipement, nomequipement) VALUES ('AUX', 'Trousse');\nSELECT CAST(prix AS INTEGER) AS prix FROM Equipement WHERE codeequipement = 'AUX';`,
    columns: ['prix'], rows: [[0]], kind: 'alter', verificationChanges: 1
  }
};

const VERIFY_UPDATE = 'SELECT * FROM Voiture ORDER BY immat ASC;';
const VERIFY_DELETE = [
  'SELECT * FROM Voiture ORDER BY immat ASC;',
  'SELECT immat, codeequipement FROM VoitureEquipement ORDER BY immat ASC, codeequipement ASC;',
  'SELECT codeequipement, nomequipement, prix FROM Equipement ORDER BY codeequipement ASC;'
].join('\n');

function modelRows(id, source) {
  const data = expand(source);
  const cars = data.cars;
  switch (id) {
    case 'sq-c1-e1':
      return table(CAR_COLUMNS, ordered(cars, [[0, 1]]));
    case 'sq-c1-e2':
      return table(['immat', 'marque'], ordered(cars, [[0, 1]]).map(row => [row[0], row[1]]));
    case 'sq-c1-e3': {
      const engines = [...new Set(cars.map(row => row[3]))].sort(compare);
      return table(['moteur'], engines.map(engine => [engine]));
    }
    case 'sq-c3-e1':
      return table(['immat', 'km'], ordered(cars.filter(row => row[5] >= 5), [[5, -1], [0, 1]]).map(row => [row[0], row[5]]));
    case 'sq-c3-e2':
      return table(['immat', 'marque', 'pxachat'], ordered(cars.filter(row => row[6] >= 6000000 && row[6] <= 50000000 && row[1].startsWith('M')), [[6, 1], [0, 1]]).map(row => [row[0], row[1], row[6]]));
    case 'sq-c3-e3':
      return table(['immat', 'marque'], ordered(cars.filter(row => row[4] === null), [[0, 1]]).slice(0, 3).map(row => [row[0], row[1]]));
    case 'sq-c4-e1':
    case 'sq-c4-e2': {
      const rows = [];
      for (const [code, name] of data.brands) {
        const matches = cars.filter(row => row[2] === code);
        if (!matches.length && id === 'sq-c4-e2') rows.push([name, null]);
        for (const row of matches) rows.push([name, row[0]]);
      }
      return table(['nommarque', 'immat'], ordered(rows, [[0, 1], [1, 1]]));
    }
    case 'sq-c4-e3': {
      const names = new Map(data.equipment.map(row => [row[0], row[1]]));
      const plates = new Set(cars.map(row => row[0]));
      const rows = data.links.filter(([plate, code]) => plates.has(plate) && names.has(code)).map(([plate, code]) => [plate, names.get(code)]);
      return table(['immat', 'nomequipement'], ordered(rows, [[0, 1], [1, 1]]));
    }
    case 'sq-c5-e1': {
      const groups = new Map();
      for (const [code, , country] of data.brands) {
        if (!groups.has(country)) groups.set(country, { lines: 0, count: 0, total: null });
        const group = groups.get(country);
        const matches = cars.filter(row => row[2] === code);
        group.lines += Math.max(1, matches.length);
        group.count += matches.length;
        for (const row of matches) group.total = (group.total ?? 0) + row[6];
      }
      const rows = [...groups].map(([country, group]) => [country, group.lines, group.count, group.total]);
      return table(['paysmarque', 'nb_lignes', 'nb_voitures', 'total_achat'], ordered(rows, [[0, 1]]));
    }
    case 'sq-c5-e2': {
      const groups = new Map();
      for (const row of cars) groups.set(row[1], (groups.get(row[1]) ?? 0) + row[6]);
      const rows = [...groups].filter(([, total]) => total >= 50000000);
      return table(['marque', 'total'], ordered(rows, [[1, -1], [0, 1]]));
    }
    case 'sq-c5-e3': {
      const groups = new Map();
      for (const row of cars) {
        if (!groups.has(row[1])) groups.set(row[1], []);
        groups.get(row[1]).push(row[5]);
      }
      const rows = [...groups].map(([name, kilometers]) => [name, kilometers.length, Math.min(...kilometers), Math.max(...kilometers)]);
      return table(['marque', 'effectif', 'km_min', 'km_max'], ordered(rows, [[0, 1]]));
    }
    case 'sq-c6-e1': {
      const count = cars.filter(row => row[5] < 5).length;
      const updated = cars.map(row => row.map((value, index) => index === 5 && value < 5 ? value + 10 : value));
      return modification(count) + '\n\n' + table(CAR_COLUMNS, ordered(updated, [[0, 1]]));
    }
    case 'sq-c6-e2': {
      const count = cars.filter(row => row[4] === null).length;
      const kept = cars.filter(row => row[4] !== null);
      const plates = new Set(kept.map(row => row[0]));
      const links = data.links.filter(row => plates.has(row[0]));
      return [modification(count), table(CAR_COLUMNS, ordered(kept, [[0, 1]])),
        table(['immat', 'codeequipement'], ordered(links, [[0, 1], [1, 1]])),
        table(EQUIPMENT_COLUMNS, ordered(data.equipment, [[0, 1]]))].join('\n\n');
    }
    case 'sq-c6-e3': {
      const japanese = new Set(data.brands.filter(row => row[2] === 'JAPON').map(row => row[0]));
      return table(['immat', 'marque'], ordered(cars.filter(row => japanese.has(row[2])), [[0, 1]]).map(row => [row[0], row[1]]));
    }
    default:
      throw new Error(`Oracle manquant : ${id}`);
  }
}

function makeCase(id, item) {
  if (item.probe) {
    const probe = probes[item.probe];
    if (!probe) throw new Error(`Sonde manquante : ${item.probe}`);
    const initial = probe.kind === 'alter' ? schema(true) : 'PRAGMA foreign_keys=ON;';
    const output = probe.kind === 'alter' ? [modification(0)] : [modification(0), modification(1)];
    if (probe.initial === 'marque') {
      output.push(table(['codemarque', 'nommarque', 'paysmarque'], [['BMW', 'BMW', 'ALLEMAGNE']]));
    }
    if (probe.initial === 'equipement') {
      output.push(table(EQUIPMENT_COLUMNS, [['AIR', 'Climatisation', 0]]));
    }
    if (probe.verificationChanges !== null) output.push(modification(probe.verificationChanges));
    output.push(table(probe.columns, probe.rows));
    if (probe.defaultCheck) output.push(modification(1), table(['prix'], [[0]]));
    return {
      label: item.label,
      stdin: initial + '\n-- VERIFY:\n' + probe.verify,
      expected: output.join('\n\n'),
      oracle: { kind: 'contrainte imposée par l’énoncé', probe: item.probe, verificationChanges: probe.verificationChanges, columns: probe.columns, rows: probe.rows,
        initial: probe.initial ?? null, defaultCheck: Boolean(probe.defaultCheck) }
    };
  }
  let verify = '';
  if (id === 'sq-c6-e1') verify = VERIFY_UPDATE;
  if (id === 'sq-c6-e2') verify = VERIFY_DELETE;
  return {
    label: item.label,
    stdin: setup(item.data) + (verify ? '\n-- VERIFY:\n' + verify : ''),
    expected: modelRows(id, item.data),
    oracle: { kind: 'modèle relationnel JavaScript indépendant', fixture: item.data },
    ...(item.note ? { note: item.note } : {})
  };
}

module.exports = { makeCase };
