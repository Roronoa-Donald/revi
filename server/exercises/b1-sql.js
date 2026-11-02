'use strict';

const MARQUE_DEFINITION = `CREATE TABLE Marque (
  codemarque TEXT NOT NULL PRIMARY KEY,
  nommarque TEXT NOT NULL UNIQUE,
  paysmarque TEXT NOT NULL,
  UNIQUE (codemarque, nommarque)
);`;

const VOITURE_DEFINITION = `CREATE TABLE Voiture (
  immat TEXT NOT NULL PRIMARY KEY,
  marque TEXT NOT NULL,
  codemarque TEXT NOT NULL,
  moteur TEXT NOT NULL,
  datecirc TEXT,
  km INTEGER NOT NULL,
  pxachat INTEGER NOT NULL,
  nbreplace INTEGER NOT NULL,
  FOREIGN KEY (codemarque, marque) REFERENCES Marque (codemarque, nommarque)
);`;

const EQUIPEMENT_DEFINITION = `CREATE TABLE Equipement (
  codeequipement TEXT NOT NULL PRIMARY KEY,
  nomequipement TEXT NOT NULL UNIQUE,
  prix INTEGER DEFAULT 0
);`;

const VOITURE_EQUIPEMENT_DEFINITION = `CREATE TABLE VoitureEquipement (
  immat TEXT NOT NULL,
  codeequipement TEXT NOT NULL,
  PRIMARY KEY (immat, codeequipement),
  FOREIGN KEY (immat) REFERENCES Voiture (immat) ON DELETE CASCADE,
  FOREIGN KEY (codeequipement) REFERENCES Equipement (codeequipement) ON DELETE CASCADE
);`;

const EQUIPEMENT_ANTERIEUR_DEFINITION = `CREATE TABLE Equipement (
  codeequipement TEXT NOT NULL PRIMARY KEY,
  nomequipement TEXT NOT NULL UNIQUE
);`;

const PARC_SCHEMA = `PRAGMA foreign_keys = ON;\n${MARQUE_DEFINITION}\n${VOITURE_DEFINITION}\n${EQUIPEMENT_DEFINITION}\n${VOITURE_EQUIPEMENT_DEFINITION}`;
const PARC_ANTERIEUR = `PRAGMA foreign_keys = ON;\n${MARQUE_DEFINITION}\n${VOITURE_DEFINITION}\n${EQUIPEMENT_ANTERIEUR_DEFINITION}\n${VOITURE_EQUIPEMENT_DEFINITION}`;

const PARC_EXEMPLE = `${PARC_SCHEMA}
INSERT INTO Marque (codemarque, nommarque, paysmarque) VALUES
  ('TOY', 'TOYOTA', 'JAPON'), ('MIT', 'MITSUBISHI', 'JAPON'),
  ('MAZ', 'MAZDA', 'JAPON'), ('BNZ', 'MERCEDES BENZ', 'ALLEMAGNE'),
  ('BMW', 'BMW', 'ALLEMAGNE'), ('HYU', 'HYUNDAI', 'COREE DU SUD');
INSERT INTO Voiture (immat, marque, codemarque, moteur, datecirc, km, pxachat, nbreplace) VALUES
  ('TG-7854-Z', 'MERCEDES BENZ', 'BNZ', 'DIESEL', '2000-01-21', 500, 6000000, 5),
  ('TG-3733-AC', 'TOYOTA', 'TOY', 'HYBRIDE', '2010-01-21', 0, 20000000, 7),
  ('TG-9420-AF', 'TOYOTA', 'TOY', 'ESSENCE', '2013-09-21', 0, 50000000, 7),
  ('TG-0020-AV', 'MITSUBISHI', 'MIT', 'ESSENCE', '2018-10-21', 30, 50000000, 7),
  ('TG-0480-AV', 'BMW', 'BMW', 'ELECTRIQUE', '2015-12-21', 0, 50000000, 5),
  ('TG-4444-AL', 'HYUNDAI', 'HYU', 'ESSENCE', '2015-09-21', 5, 10000000, 5);
INSERT INTO Equipement (codeequipement, nomequipement, prix) VALUES
  ('AIR', 'Climatisation', 0), ('GPS', 'Navigation GPS', 450000),
  ('CAM', 'Camera de recul', 200000), ('RAD', 'Autoradio', NULL);
INSERT INTO VoitureEquipement (immat, codeequipement) VALUES
  ('TG-7854-Z', 'AIR'), ('TG-3733-AC', 'AIR'), ('TG-3733-AC', 'GPS'),
  ('TG-9420-AF', 'GPS'), ('TG-0020-AV', 'CAM'), ('TG-0480-AV', 'RAD');`;

const PARC_LIMITES = `${PARC_SCHEMA}
INSERT INTO Marque (codemarque, nommarque, paysmarque) VALUES
  ('TOY', 'TOYOTA', 'JAPON'), ('MIT', 'MITSUBISHI', 'JAPON'),
  ('MAZ', 'MAZDA', 'JAPON'), ('NIS', 'NISSAN', 'JAPON'),
  ('BMW', 'BMW', 'ALLEMAGNE'), ('PEU', 'PEUGEOT', 'FRANCE');
INSERT INTO Voiture (immat, marque, codemarque, moteur, datecirc, km, pxachat, nbreplace) VALUES
  ('TG-9004-AX', 'TOYOTA', 'TOY', 'ESSENCE', NULL, 4, 6000000, 5),
  ('TG-9001-AX', 'TOYOTA', 'TOY', 'DIESEL', '2020-03-01', 5, 50000000, 5),
  ('TG-9003-AX', 'BMW', 'BMW', 'HYBRIDE', NULL, 6, 25000000, 7),
  ('TG-9002-AX', 'MITSUBISHI', 'MIT', 'ESSENCE', NULL, 5, 50000000, 7),
  ('TG-9005-AX', 'BMW', 'BMW', 'DIESEL', NULL, 0, 6000000, 5),
  ('TG-9006-AX', 'MAZDA', 'MAZ', 'ESSENCE', NULL, 10, 6000000, 5);
INSERT INTO Equipement (codeequipement, nomequipement, prix) VALUES
  ('GPS', 'GPS', 0), ('CAM', 'Caméra de recul', 125000),
  ('JNT', 'Jantes', 90000), ('RAD', 'Autoradio', NULL), ('AIR', 'Climatisation', 0);
INSERT INTO VoitureEquipement (immat, codeequipement) VALUES
  ('TG-9003-AX', 'GPS'), ('TG-9003-AX', 'CAM'), ('TG-9004-AX', 'GPS'),
  ('TG-9004-AX', 'JNT'), ('TG-9002-AX', 'CAM'), ('TG-9006-AX', 'RAD');`;

const PARC_MINI = `${PARC_SCHEMA}
INSERT INTO Marque (codemarque, nommarque, paysmarque) VALUES
  ('REN', 'RENAULT', 'FRANCE'), ('NIS', 'NISSAN', 'JAPON'), ('KIA', 'KIA', 'COREE DU SUD');
INSERT INTO Voiture (immat, marque, codemarque, moteur, datecirc, km, pxachat, nbreplace) VALUES
  ('TG-2222-BC', 'RENAULT', 'REN', 'DIESEL', '2020-01-20', 0, 15000000, 5),
  ('TG-5220-BA', 'NISSAN', 'NIS', 'ESSENCE', '2019-10-21', 6700, 10000000, 5);
INSERT INTO Equipement (codeequipement, nomequipement, prix) VALUES
  ('GPS', 'GPS', 100000), ('ATT', 'Attelage', 300000), ('RAD', 'Autoradio', NULL);
INSERT INTO VoitureEquipement (immat, codeequipement) VALUES
  ('TG-5220-BA', 'GPS'), ('TG-2222-BC', 'GPS'), ('TG-2222-BC', 'ATT');`;

const PARC_SANS_BMW = `${PARC_EXEMPLE}\nDELETE FROM Voiture WHERE immat = 'TG-0480-AV';`;
const PARC_AVEC_MAZDA = `${PARC_EXEMPLE}\nINSERT INTO Voiture VALUES ('TG-1420-AW', 'MAZDA', 'MAZ', 'ESSENCE', '2016-02-01', 0, 17000000, 5);`;
const PARC_DATES = `${PARC_EXEMPLE}\nUPDATE Voiture SET datecirc = NULL WHERE immat IN ('TG-3733-AC', 'TG-9420-AF');`;
const PARC_DATES_MIXTES = `${PARC_LIMITES}\nUPDATE Voiture SET datecirc = '' WHERE immat = 'TG-9002-AX';`;
const VERIFICATION_SUPPRESSION = '\n-- VERIFY:\nSELECT * FROM Voiture ORDER BY immat ASC;\nSELECT immat, codeequipement FROM VoitureEquipement ORDER BY immat ASC, codeequipement ASC;';

const COLONNES_VOITURE = ['immat', 'marque', 'codemarque', 'moteur', 'datecirc', 'km', 'pxachat', 'nbreplace'];
const VOITURES_EXEMPLE = [
  ['TG-0020-AV', 'MITSUBISHI', 'MIT', 'ESSENCE', '2018-10-21', 30, 50000000, 7],
  ['TG-0480-AV', 'BMW', 'BMW', 'ELECTRIQUE', '2015-12-21', 0, 50000000, 5],
  ['TG-3733-AC', 'TOYOTA', 'TOY', 'HYBRIDE', '2010-01-21', 0, 20000000, 7],
  ['TG-4444-AL', 'HYUNDAI', 'HYU', 'ESSENCE', '2015-09-21', 5, 10000000, 5],
  ['TG-7854-Z', 'MERCEDES BENZ', 'BNZ', 'DIESEL', '2000-01-21', 500, 6000000, 5],
  ['TG-9420-AF', 'TOYOTA', 'TOY', 'ESSENCE', '2013-09-21', 0, 50000000, 7]
];
const VOITURES_LIMITES = [
  ['TG-9001-AX', 'TOYOTA', 'TOY', 'DIESEL', '2020-03-01', 5, 50000000, 5],
  ['TG-9002-AX', 'MITSUBISHI', 'MIT', 'ESSENCE', null, 5, 50000000, 7],
  ['TG-9003-AX', 'BMW', 'BMW', 'HYBRIDE', null, 6, 25000000, 7],
  ['TG-9004-AX', 'TOYOTA', 'TOY', 'ESSENCE', null, 4, 6000000, 5],
  ['TG-9005-AX', 'BMW', 'BMW', 'DIESEL', null, 0, 6000000, 5],
  ['TG-9006-AX', 'MAZDA', 'MAZ', 'ESSENCE', null, 10, 6000000, 5]
];
const VOITURES_MINI = [
  ['TG-2222-BC', 'RENAULT', 'REN', 'DIESEL', '2020-01-20', 0, 15000000, 5],
  ['TG-5220-BA', 'NISSAN', 'NIS', 'ESSENCE', '2019-10-21', 6700, 10000000, 5]
];

function resultatTable(colonnes, lignes) {
  if (!lignes.length) return '(Requête exécutée avec 0 résultat)';
  const valeurs = lignes.map(ligne => ligne.map(valeur => valeur === null ? 'NULL' : String(valeur)));
  const largeurs = colonnes.map((colonne, index) => Math.max(colonne.length, ...valeurs.map(ligne => ligne[index].length)));
  const separateur = `+${largeurs.map(largeur => '-'.repeat(largeur + 2)).join('+')}+`;
  const ligneTable = ligne => `| ${ligne.map((valeur, index) => valeur.padEnd(largeurs[index])).join(' | ')} |`;
  const nombre = lignes.length;
  return [separateur, ligneTable(colonnes), separateur, ...valeurs.map(ligneTable), separateur,
    `(${nombre} ${nombre === 1 ? 'ligne retournée' : 'lignes retournées'})`].join('\n');
}

function resultatModification(nombre, colonnes, lignes) {
  const message = `Instruction exécutée avec succès (${nombre} ${nombre === 1 ? 'ligne modifiée' : 'lignes modifiées'}).`;
  return `${message}\n\n${resultatTable(colonnes, lignes)}`;
}

const RESULTAT_CREATION_INSERTION = 'Instruction exécutée avec succès (0 lignes modifiées).\n\n' +
  'Instruction exécutée avec succès (1 ligne modifiée).';

function voituresApresEssai(lignes) {
  return lignes.map(ligne => ligne.map((valeur, index) => index === 5 && valeur < 5 ? valeur + 10 : valeur));
}

const SQ_EXERCISES = [
  {
    "id": "sq-c1-e1",
    "chapter": 1,
    "level": "n1",
    "language": "sql",
    "title": "Lister toutes les colonnes d’une table",
    "goal": "Écrire une requête SELECT * pour afficher l’ensemble des lignes d’une table relationnelle.",
    "brief": "<p>La table <code>Voiture</code> utilise le schéma du simulateur. Affichez toutes ses colonnes et toutes ses lignes, triées par <code>immat</code> croissante.</p>",
    "starter": "SELECT immat FROM Voiture;",
    "hints": [
      "Faut-il afficher uniquement l’immatriculation ou toutes les colonnes ?",
      "Triez les lignes par immatriculation avec ORDER BY."
    ],
    "examples": [
      {
        "stdin": PARC_EXEMPLE,
        "expected": resultatTable(COLONNES_VOITURE, VOITURES_EXEMPLE),
        "note": "Jeu d’exemple réduit utilisant le schéma et des données du simulateur."
      }
    ],
    "tests": [
      { "label": "Parc sans BMW", "stdin": PARC_SANS_BMW, "expected": resultatTable(COLONNES_VOITURE, VOITURES_EXEMPLE.filter(ligne => ligne[0] !== 'TG-0480-AV')) },
      { "label": "Insertion dans un autre ordre", "stdin": PARC_LIMITES, "expected": resultatTable(COLONNES_VOITURE, VOITURES_LIMITES) },
      { "label": "Deux voitures", "stdin": PARC_MINI, "expected": resultatTable(COLONNES_VOITURE, VOITURES_MINI) }
    ],
    "solution": "SELECT * FROM Voiture ORDER BY immat ASC;"
  },
  {
    "id": "sq-c1-e2",
    "chapter": 1,
    "level": "n2",
    "language": "sql",
    "title": "Projection de colonnes ciblées",
    "goal": "Sélectionner uniquement certaines colonnes (projection relationnelle) avec SELECT.",
    "brief": "<p>Dans <code>Voiture</code>, affichez uniquement les colonnes <code>immat</code> et <code>marque</code>, dans cet ordre, puis triez par <code>immat</code> croissante.</p>",
    "starter": "SELECT * FROM Voiture;",
    "hints": [
      "Comment demander plusieurs colonnes tout en conservant leur ordre dans le résultat ?",
      "Triez par immat avec ORDER BY."
    ],
    "examples": [
      {
        "stdin": PARC_EXEMPLE,
        "expected": resultatTable(['immat', 'marque'], VOITURES_EXEMPLE.map(ligne => ligne.slice(0, 2))),
        "note": "Jeu d’exemple réduit utilisant le schéma du simulateur."
      }
    ],
    "tests": [
      { "label": "Parc sans BMW", "stdin": PARC_SANS_BMW, "expected": resultatTable(['immat', 'marque'], VOITURES_EXEMPLE.filter(ligne => ligne[0] !== 'TG-0480-AV').map(ligne => ligne.slice(0, 2))) },
      { "label": "Ordre d’insertion différent", "stdin": PARC_LIMITES, "expected": resultatTable(['immat', 'marque'], VOITURES_LIMITES.map(ligne => ligne.slice(0, 2))) },
      { "label": "Deux marques", "stdin": PARC_MINI, "expected": resultatTable(['immat', 'marque'], VOITURES_MINI.map(ligne => ligne.slice(0, 2))) }
    ],
    "solution": "SELECT immat, marque FROM Voiture ORDER BY immat ASC;"
  },
  {
    "id": "sq-c1-e3",
    "chapter": 1,
    "level": "n3",
    "language": "sql",
    "title": "Éliminer les doublons avec DISTINCT",
    "goal": "Extraire la liste sans doublons des valeurs d’une colonne avec SELECT DISTINCT.",
    "brief": "<p>Dans <code>Voiture</code>, affichez une seule fois chaque valeur de la colonne <code>moteur</code>, par ordre alphabétique croissant.</p>",
    "starter": "SELECT moteur FROM Voiture;",
    "hints": [
      "Quel mot-clé de SELECT élimine les valeurs répétées ?",
      "Triez le résultat par moteur."
    ],
    "examples": [
      {
        "stdin": PARC_EXEMPLE,
        "expected": resultatTable(['moteur'], [['DIESEL'], ['ELECTRIQUE'], ['ESSENCE'], ['HYBRIDE']]),
        "note": "Plusieurs voitures peuvent partager une même motorisation."
      }
    ],
    "tests": [
      { "label": "Motorisations répétées sans électrique", "stdin": PARC_SANS_BMW, "expected": resultatTable(['moteur'], [['DIESEL'], ['ESSENCE'], ['HYBRIDE']]) },
      { "label": "Plusieurs doublons", "stdin": PARC_LIMITES, "expected": resultatTable(['moteur'], [['DIESEL'], ['ESSENCE'], ['HYBRIDE']]) },
      { "label": "Deux motorisations", "stdin": PARC_MINI, "expected": resultatTable(['moteur'], [['DIESEL'], ['ESSENCE']]) }
    ],
    "solution": "SELECT DISTINCT moteur FROM Voiture ORDER BY moteur ASC;"
  },
  {
    "id": "sq-c2-e1",
    "chapter": 2,
    "level": "n1",
    "language": "sql",
    "title": "Créer et initialiser la table Marque",
    "goal": "Définir une table avec ses contraintes, puis insérer une marque.",
    "brief": "<p>Sur une base vide, recréez la table <code>Marque</code> du simulateur : <code>codemarque TEXT NOT NULL PRIMARY KEY</code>, <code>nommarque TEXT NOT NULL UNIQUE</code> et <code>paysmarque TEXT NOT NULL</code>. Ajoutez aussi <code>UNIQUE (codemarque, nommarque)</code>, nécessaire à la clé étrangère composée de <code>Voiture</code>. Puis insérez la marque dont le code est <code>BMW</code>, le nom <code>BMW</code> et le pays <code>ALLEMAGNE</code>. La table existe déjà dans le simulateur initial : cet exercice utilise donc une base vide.</p>",
    "starter": "CREATE TABLE Marque (\n  codemarque TEXT NOT NULL PRIMARY KEY,\n  nommarque TEXT NOT NULL,\n  paysmarque TEXT NOT NULL\n);\nINSERT INTO Marque (codemarque, nommarque, paysmarque) VALUES ('BMW', 'BMW', '');",
    "hints": [
      "La clé primaire identifie chaque code ; le nom doit aussi être unique.",
      "Après les colonnes, ajoutez la contrainte UNIQUE portant sur le couple de colonnes indiqué.",
      "Complétez l’insertion avec le pays de la marque BMW."
    ],
    "examples": [
      {
        "stdin": "PRAGMA foreign_keys = ON;\n-- VERIFY:\nSELECT name, type, \"notnull\", dflt_value, pk FROM pragma_table_info('Marque') ORDER BY cid; SELECT codemarque, nommarque, paysmarque FROM Marque;",
        "expected": RESULTAT_CREATION_INSERTION + '\n\n' + resultatTable(['name', 'type', 'notnull', 'dflt_value', 'pk'], [
          ['codemarque', 'TEXT', 1, null, 1], ['nommarque', 'TEXT', 1, null, 0], ['paysmarque', 'TEXT', 1, null, 0]
        ]) + '\n\n' + resultatTable(['codemarque', 'nommarque', 'paysmarque'], [['BMW', 'BMW', 'ALLEMAGNE']]),
        "note": "La vérification affiche les colonnes de Marque et la ligne insérée sur une base initialement vide."
      }
    ],
    "tests": [
      {
        "label": "Colonnes et contraintes uniques",
        "stdin": "PRAGMA foreign_keys = ON;\n-- VERIFY:\nSELECT name, type, \"notnull\", dflt_value, pk FROM pragma_table_info('Marque') ORDER BY cid; SELECT COUNT(*) AS contraintes_uniques FROM pragma_index_list('Marque') WHERE \"unique\" = 1; SELECT codemarque, nommarque, paysmarque FROM Marque;",
        "expected": RESULTAT_CREATION_INSERTION + '\n\n' + resultatTable(['name', 'type', 'notnull', 'dflt_value', 'pk'], [
          ['codemarque', 'TEXT', 1, null, 1], ['nommarque', 'TEXT', 1, null, 0], ['paysmarque', 'TEXT', 1, null, 0]
        ]) + '\n\n' + resultatTable(['contraintes_uniques'], [[3]]) + '\n\n' +
          resultatTable(['codemarque', 'nommarque', 'paysmarque'], [['BMW', 'BMW', 'ALLEMAGNE']])
      },
      {
        "label": "Clé étrangère composée du parc",
        "stdin": `PRAGMA foreign_keys = ON;\n-- VERIFY:\n${VOITURE_DEFINITION}\nINSERT INTO Marque VALUES ('TOY', 'TOYOTA', 'JAPON');\nINSERT INTO Voiture VALUES ('TG-3733-AC', 'TOYOTA', 'TOY', 'HYBRIDE', '2010-01-21', 0, 20000000, 7);\nSELECT immat, marque FROM Voiture;\nSELECT codemarque, nommarque, paysmarque FROM Marque WHERE codemarque = 'BMW';`,
        "expected": RESULTAT_CREATION_INSERTION + '\n\n' +
          'Instruction exécutée avec succès (1 ligne modifiée).\n\n'.repeat(2) +
          resultatModification(1, ['immat', 'marque'], [['TG-3733-AC', 'TOYOTA']]) + '\n\n' +
          resultatTable(['codemarque', 'nommarque', 'paysmarque'], [['BMW', 'BMW', 'ALLEMAGNE']])
      },
      {
        "label": "Clé, unicité et valeurs obligatoires de Marque",
        "stdin": "PRAGMA foreign_keys = ON;\n-- VERIFY:\nINSERT OR IGNORE INTO Marque VALUES ('TOY', 'TOYOTA', 'JAPON'), ('AUT', 'TOYOTA', 'JAPON'), ('BMW', 'AUTRE MARQUE', 'FRANCE'), (NULL, 'SANS CODE', 'FRANCE'), ('VID', NULL, 'FRANCE'), ('NUL', 'SANS PAYS', NULL); SELECT codemarque, nommarque, paysmarque FROM Marque ORDER BY codemarque;",
        "expected": RESULTAT_CREATION_INSERTION + '\n\n' +
          resultatModification(1, ['codemarque', 'nommarque', 'paysmarque'], [['BMW', 'BMW', 'ALLEMAGNE'], ['TOY', 'TOYOTA', 'JAPON']])
      }
    ],
    "solution": `${MARQUE_DEFINITION}\nINSERT INTO Marque (codemarque, nommarque, paysmarque) VALUES ('BMW', 'BMW', 'ALLEMAGNE');`
  },
  {
    "id": "sq-c2-e2",
    "chapter": 2,
    "level": "n2",
    "language": "sql",
    "title": "Valeur par défaut (DEFAULT) et contrainte NOT NULL",
    "goal": "Utiliser DEFAULT lors de la création d’une table et d’une insertion.",
    "brief": "<p>Sur une base vide, créez la table du parc <code>Equipement</code> avec <code>codeequipement TEXT NOT NULL PRIMARY KEY</code>, <code>nomequipement TEXT NOT NULL UNIQUE</code> et <code>prix INTEGER DEFAULT 0</code>. Puis insérez l’équipement de code <code>AIR</code> et de nom <code>Climatisation</code> sans indiquer son prix. Un prix omis reçoit la valeur <code>0</code> ; un <code>NULL</code> explicitement fourni reste <code>NULL</code>. La table existe déjà dans le simulateur initial : cet exercice utilise une base vide.</p>",
    "starter": "CREATE TABLE Equipement (\n  codeequipement TEXT NOT NULL PRIMARY KEY,\n  nomequipement TEXT NOT NULL UNIQUE,\n  prix INTEGER\n);\nINSERT INTO Equipement (codeequipement, nomequipement) VALUES ('AIR', '');",
    "hints": [
      "Précisez une valeur par défaut dans la définition de prix.",
      "Vérifiez la clé primaire, le caractère obligatoire et l’unicité du nom.",
      "Complétez le nom de l’équipement et omettez la colonne prix dans son insertion."
    ],
    "examples": [
      {
        "stdin": "PRAGMA foreign_keys = ON;\n-- VERIFY:\nSELECT name, type, \"notnull\", dflt_value, pk FROM pragma_table_info('Equipement') ORDER BY cid; SELECT codeequipement, nomequipement, prix FROM Equipement;",
        "expected": RESULTAT_CREATION_INSERTION + '\n\n' + resultatTable(['name', 'type', 'notnull', 'dflt_value', 'pk'], [
          ['codeequipement', 'TEXT', 1, null, 1], ['nomequipement', 'TEXT', 1, null, 0], ['prix', 'INTEGER', 0, '0', 0]
        ]) + '\n\n' + resultatTable(['codeequipement', 'nomequipement', 'prix'], [['AIR', 'Climatisation', 0]]),
        "note": "La vérification affiche les colonnes et l’équipement inséré avec son prix par défaut."
      }
    ],
    "tests": [
      {
        "label": "Structure, contraintes uniques et valeur par défaut",
        "stdin": "PRAGMA foreign_keys = ON;\n-- VERIFY:\nSELECT name, type, \"notnull\", dflt_value, pk FROM pragma_table_info('Equipement') ORDER BY cid; SELECT COUNT(*) AS contraintes_uniques FROM pragma_index_list('Equipement') WHERE \"unique\" = 1; SELECT codeequipement, nomequipement, prix FROM Equipement;",
        "expected": RESULTAT_CREATION_INSERTION + '\n\n' + resultatTable(['name', 'type', 'notnull', 'dflt_value', 'pk'], [
          ['codeequipement', 'TEXT', 1, null, 1], ['nomequipement', 'TEXT', 1, null, 0], ['prix', 'INTEGER', 0, '0', 0]
        ]) + '\n\n' + resultatTable(['contraintes_uniques'], [[2]]) + '\n\n' +
          resultatTable(['codeequipement', 'nomequipement', 'prix'], [['AIR', 'Climatisation', 0]])
      },
      {
        "label": "Prix omis et NULL explicite",
        "stdin": "PRAGMA foreign_keys = ON;\n-- VERIFY:\nINSERT INTO Equipement (codeequipement, nomequipement) VALUES ('GPS', 'Navigation GPS'); INSERT INTO Equipement (codeequipement, nomequipement, prix) VALUES ('RAD', 'Autoradio', NULL); SELECT codeequipement, nomequipement, prix FROM Equipement ORDER BY codeequipement;",
        "expected": RESULTAT_CREATION_INSERTION + '\n\nInstruction exécutée avec succès (1 ligne modifiée).\n\n' +
          resultatModification(1, ['codeequipement', 'nomequipement', 'prix'], [['AIR', 'Climatisation', 0], ['GPS', 'Navigation GPS', 0], ['RAD', 'Autoradio', null]])
      },
      {
        "label": "Clé, unicité et valeurs obligatoires d’Equipement",
        "stdin": "PRAGMA foreign_keys = ON;\n-- VERIFY:\nINSERT OR IGNORE INTO Equipement VALUES ('GPS', 'Navigation GPS', 450000), ('NAV', 'Navigation GPS', 100000), ('AIR', 'Autre équipement', 10000), (NULL, 'Sans code', 0), ('VID', NULL, 0); SELECT codeequipement, nomequipement, prix FROM Equipement ORDER BY codeequipement;",
        "expected": RESULTAT_CREATION_INSERTION + '\n\n' +
          resultatModification(1, ['codeequipement', 'nomequipement', 'prix'], [['AIR', 'Climatisation', 0], ['GPS', 'Navigation GPS', 450000]])
      }
    ],
    "solution": `${EQUIPEMENT_DEFINITION}\nINSERT INTO Equipement (codeequipement, nomequipement) VALUES ('AIR', 'Climatisation');`
  },
  {
    "id": "sq-c2-e3",
    "chapter": 2,
    "level": "n3",
    "language": "sql",
    "title": "Ajouter une colonne avec ALTER TABLE",
    "goal": "Faire évoluer le schéma d’une table existante avec ALTER TABLE ADD COLUMN.",
    "brief": "<p>Dans une version antérieure du parc, la table <code>Equipement(codeequipement TEXT NOT NULL PRIMARY KEY, nomequipement TEXT NOT NULL UNIQUE)</code> existe déjà, mais ne possède pas encore la colonne <code>prix</code>. Les autres tables ont les définitions du parc. Ajoutez <code>prix INTEGER DEFAULT 0</code> pour retrouver le schéma actuel du simulateur. La colonne existe déjà dans le simulateur initial : cet exercice utilise donc cet état antérieur.</p>",
    "starter": "SELECT codeequipement, nomequipement FROM Equipement;",
    "hints": [
      "Modifiez la table existante avec ALTER TABLE et ADD COLUMN, sans la recréer.",
      "Définissez la colonne prix avec le type et la valeur par défaut demandés."
    ],
    "examples": [
      {
        "stdin": `${PARC_ANTERIEUR}\n-- VERIFY:\nSELECT name, type, \"notnull\", dflt_value, pk FROM pragma_table_info('Equipement') ORDER BY cid;`,
        "expected": resultatModification(0, ['name', 'type', 'notnull', 'dflt_value', 'pk'], [
          ['codeequipement', 'TEXT', 1, null, 1], ['nomequipement', 'TEXT', 1, null, 0], ['prix', 'INTEGER', 0, '0', 0]
        ]),
        "note": "La base d’exemple contient la version antérieure d’Equipement, sans prix."
      }
    ],
    "tests": [
      {
        "label": "Colonne ajoutée et contraintes conservées",
        "stdin": `${PARC_ANTERIEUR}\n-- VERIFY:\nSELECT name, type, \"notnull\", dflt_value, pk FROM pragma_table_info('Equipement') ORDER BY cid; SELECT COUNT(*) AS contraintes_uniques FROM pragma_index_list('Equipement') WHERE \"unique\" = 1;`,
        "expected": resultatModification(0, ['name', 'type', 'notnull', 'dflt_value', 'pk'], [
          ['codeequipement', 'TEXT', 1, null, 1], ['nomequipement', 'TEXT', 1, null, 0], ['prix', 'INTEGER', 0, '0', 0]
        ]) + '\n\n' + resultatTable(['contraintes_uniques'], [[2]])
      },
      {
        "label": "Valeur sur les lignes préexistantes",
        "stdin": `${PARC_ANTERIEUR}\nINSERT INTO Equipement VALUES ('GPS', 'Navigation GPS'), ('CAM', 'Camera de recul'); UPDATE Equipement SET nomequipement = nomequipement WHERE 0;\n-- VERIFY:\nSELECT codeequipement, nomequipement, prix FROM Equipement ORDER BY codeequipement;`,
        "expected": resultatModification(0, ['codeequipement', 'nomequipement', 'prix'], [['CAM', 'Camera de recul', 0], ['GPS', 'Navigation GPS', 0]])
      },
      {
        "label": "Prix omis ou NULL après ALTER",
        "stdin": `${PARC_ANTERIEUR}\n-- VERIFY:\nINSERT INTO Equipement (codeequipement, nomequipement) VALUES ('AIR', 'Climatisation'); INSERT INTO Equipement (codeequipement, nomequipement, prix) VALUES ('RAD', 'Autoradio', NULL); SELECT codeequipement, nomequipement, prix FROM Equipement ORDER BY codeequipement;`,
        "expected": 'Instruction exécutée avec succès (0 lignes modifiées).\n\nInstruction exécutée avec succès (1 ligne modifiée).\n\n' + resultatModification(1, ['codeequipement', 'nomequipement', 'prix'], [['AIR', 'Climatisation', 0], ['RAD', 'Autoradio', null]])
      }
    ],
    "solution": "ALTER TABLE Equipement ADD COLUMN prix INTEGER DEFAULT 0;"
  },
  {
    "id": "sq-c3-e1",
    "chapter": 3,
    "level": "n1",
    "language": "sql",
    "title": "Filtrer les lignes avec WHERE",
    "goal": "Sélectionner les enregistrements vérifiant une condition numérique avec WHERE.",
    "brief": "<p>Dans <code>Voiture</code>, affichez <code>immat</code> et <code>km</code> lorsque le kilométrage est supérieur ou égal à <code>5</code>. Triez par <code>km</code> décroissant, puis par <code>immat</code> croissante en cas d’égalité.</p>",
    "starter": "SELECT immat, km FROM Voiture;",
    "hints": [
      "Une clause WHERE permet de conserver les kilométrages à partir de 5 inclus.",
      "Utilisez deux critères dans ORDER BY : km décroissant, puis immat croissante."
    ],
    "examples": [
      {
        "stdin": PARC_EXEMPLE,
        "expected": resultatTable(['immat', 'km'], [['TG-7854-Z', 500], ['TG-0020-AV', 30], ['TG-4444-AL', 5]]),
        "note": "Le véhicule à 5 km satisfait la condition."
      }
    ],
    "tests": [
      { "label": "Seuil inclus et égalité à départager", "stdin": `${PARC_EXEMPLE}\nUPDATE Voiture SET km = 5 WHERE immat = 'TG-3733-AC';`, "expected": resultatTable(['immat', 'km'], [['TG-7854-Z', 500], ['TG-0020-AV', 30], ['TG-3733-AC', 5], ['TG-4444-AL', 5]]) },
      { "label": "Égalité au seuil et départage", "stdin": PARC_LIMITES, "expected": resultatTable(['immat', 'km'], [['TG-9006-AX', 10], ['TG-9003-AX', 6], ['TG-9001-AX', 5], ['TG-9002-AX', 5]]) },
      { "label": "Une voiture retenue", "stdin": PARC_MINI, "expected": resultatTable(['immat', 'km'], [['TG-5220-BA', 6700]]) }
    ],
    "solution": "SELECT immat, km FROM Voiture WHERE km >= 5 ORDER BY km DESC, immat ASC;"
  },
  {
    "id": "sq-c3-e2",
    "chapter": 3,
    "level": "n2",
    "language": "sql",
    "title": "Recherche par motif avec LIKE et intervalle BETWEEN",
    "goal": "Combiner les opérateurs BETWEEN et LIKE dans une clause WHERE.",
    "brief": "<p>Dans <code>Voiture</code>, affichez <code>immat</code>, <code>marque</code> et <code>pxachat</code> pour les voitures dont le prix d’achat est compris entre <code>6000000</code> et <code>50000000</code> inclus et dont la marque commence par <code>M</code>. Triez par prix croissant, puis par immatriculation croissante.</p>",
    "starter": "SELECT immat, marque, pxachat FROM Voiture;",
    "hints": [
      "BETWEEN inclut ses deux bornes ; combinez cette condition avec LIKE et AND.",
      "Avec LIKE, le caractère % représente une suite quelconque de caractères."
    ],
    "examples": [
      {
        "stdin": PARC_EXEMPLE,
        "expected": resultatTable(['immat', 'marque', 'pxachat'], [['TG-7854-Z', 'MERCEDES BENZ', 6000000], ['TG-0020-AV', 'MITSUBISHI', 50000000]]),
        "note": "Les deux bornes du prix sont comprises dans le résultat."
      }
    ],
    "tests": [
      { "label": "Bornes incluses et prix intermédiaire", "stdin": PARC_AVEC_MAZDA, "expected": resultatTable(['immat', 'marque', 'pxachat'], [['TG-7854-Z', 'MERCEDES BENZ', 6000000], ['TG-1420-AW', 'MAZDA', 17000000], ['TG-0020-AV', 'MITSUBISHI', 50000000]]) },
      { "label": "M au début plutôt qu’au milieu", "stdin": PARC_LIMITES, "expected": resultatTable(['immat', 'marque', 'pxachat'], [['TG-9006-AX', 'MAZDA', 6000000], ['TG-9002-AX', 'MITSUBISHI', 50000000]]) },
      {
        "label": "Juste en dehors des bornes",
        "stdin": `${PARC_MINI}\nINSERT INTO Marque VALUES ('MAZ', 'MAZDA', 'JAPON');\nINSERT INTO Voiture VALUES ('TG-9007-AX', 'MAZDA', 'MAZ', 'ESSENCE', NULL, 0, 5999999, 5), ('TG-9008-AX', 'MAZDA', 'MAZ', 'ESSENCE', NULL, 0, 50000001, 5);`,
        "expected": resultatTable(['immat', 'marque', 'pxachat'], [])
      }
    ],
    "solution": "SELECT immat, marque, pxachat FROM Voiture WHERE pxachat BETWEEN 6000000 AND 50000000 AND marque LIKE 'M%' ORDER BY pxachat ASC, immat ASC;"
  },
  {
    "id": "sq-c3-e3",
    "chapter": 3,
    "level": "n3",
    "language": "sql",
    "title": "Valeurs absentes IS NULL et pagination LIMIT",
    "goal": "Identifier les enregistrements dont une colonne vaut NULL avec IS NULL et limiter le résultat.",
    "brief": "<p>Dans <code>Voiture</code>, la date de mise en circulation <code>datecirc</code> peut être <code>NULL</code>. Affichez <code>immat</code> et <code>marque</code> des trois premières voitures dont la date est absente au maximum, triées par <code>immat</code> croissante. Le parc initial du simulateur ne contient pas de date absente ; les jeux ci-dessous en ajoutent pour illustrer le cas.</p>",
    "starter": "SELECT immat, marque FROM Voiture;",
    "hints": [
      "L’absence de valeur se teste avec IS NULL et non avec = NULL.",
      "Triez par immat, puis limitez le nombre de lignes."
    ],
    "examples": [
      {
        "stdin": PARC_DATES,
        "expected": resultatTable(['immat', 'marque'], [['TG-3733-AC', 'TOYOTA'], ['TG-9420-AF', 'TOYOTA']]),
        "note": "Dans ce jeu adapté, deux dates ont été remplacées par NULL."
      }
    ],
    "tests": [
      { "label": "Une autre date absente", "stdin": `${PARC_EXEMPLE}\nUPDATE Voiture SET datecirc = NULL WHERE immat = 'TG-0020-AV';`, "expected": resultatTable(['immat', 'marque'], [['TG-0020-AV', 'MITSUBISHI']]) },
      { "label": "Cinq dates absentes, limite à trois", "stdin": PARC_LIMITES, "expected": resultatTable(['immat', 'marque'], [['TG-9002-AX', 'MITSUBISHI'], ['TG-9003-AX', 'BMW'], ['TG-9004-AX', 'TOYOTA']]) },
      { "label": "Aucune date absente", "stdin": PARC_MINI, "expected": resultatTable(['immat', 'marque'], []) },
      { "label": "Chaîne vide distincte de NULL", "stdin": PARC_DATES_MIXTES, "expected": resultatTable(['immat', 'marque'], [['TG-9003-AX', 'BMW'], ['TG-9004-AX', 'TOYOTA'], ['TG-9005-AX', 'BMW']]) }
    ],
    "solution": "SELECT immat, marque FROM Voiture WHERE datecirc IS NULL ORDER BY immat ASC LIMIT 3;"
  },
  {
    "id": "sq-c4-e1",
    "chapter": 4,
    "level": "n1",
    "language": "sql",
    "title": "Jointure interne (INNER JOIN) entre deux tables",
    "goal": "Associer chaque ligne d’une table enfant à sa table parente via INNER JOIN ... ON.",
    "brief": "<p>Reliez <code>Marque</code> à <code>Voiture</code> par leur <code>codemarque</code>. Affichez <code>nommarque</code> et <code>immat</code> pour chaque voiture ayant une marque correspondante. Triez par nom de marque croissant, puis par immatriculation croissante. Les marques sans voiture ne figurent pas dans le résultat.</p>",
    "starter": "SELECT nommarque FROM Marque;",
    "hints": [
      "Utilisez INNER JOIN et reliez les deux colonnes codemarque dans la condition ON.",
      "Qualifiez les colonnes avec les alias des tables, puis triez sur les deux colonnes demandées."
    ],
    "examples": [
      {
        "stdin": PARC_EXEMPLE,
        "expected": resultatTable(['nommarque', 'immat'], [
          ['BMW', 'TG-0480-AV'], ['HYUNDAI', 'TG-4444-AL'], ['MERCEDES BENZ', 'TG-7854-Z'],
          ['MITSUBISHI', 'TG-0020-AV'], ['TOYOTA', 'TG-3733-AC'], ['TOYOTA', 'TG-9420-AF']
        ]),
        "note": "MAZDA n’apparaît pas dans ce jeu : aucune voiture ne lui correspond."
      }
    ],
    "tests": [
      {
        "label": "Deux marques sans voiture exclues",
        "stdin": PARC_SANS_BMW,
        "expected": resultatTable(['nommarque', 'immat'], [
          ['HYUNDAI', 'TG-4444-AL'], ['MERCEDES BENZ', 'TG-7854-Z'],
          ['MITSUBISHI', 'TG-0020-AV'], ['TOYOTA', 'TG-3733-AC'], ['TOYOTA', 'TG-9420-AF']
        ])
      },
      {
        "label": "Plusieurs voitures et marques sans voiture",
        "stdin": PARC_LIMITES,
        "expected": resultatTable(['nommarque', 'immat'], [
          ['BMW', 'TG-9003-AX'], ['BMW', 'TG-9005-AX'], ['MAZDA', 'TG-9006-AX'],
          ['MITSUBISHI', 'TG-9002-AX'], ['TOYOTA', 'TG-9001-AX'], ['TOYOTA', 'TG-9004-AX']
        ])
      },
      { "label": "Deux voitures de marques différentes", "stdin": PARC_MINI, "expected": resultatTable(['nommarque', 'immat'], [['NISSAN', 'TG-5220-BA'], ['RENAULT', 'TG-2222-BC']]) }
    ],
    "solution": "SELECT M.nommarque, V.immat FROM Marque M INNER JOIN Voiture V ON M.codemarque = V.codemarque ORDER BY M.nommarque ASC, V.immat ASC;"
  },
  {
    "id": "sq-c4-e2",
    "chapter": 4,
    "level": "n2",
    "language": "sql",
    "title": "Jointure externe gauche (LEFT JOIN)",
    "goal": "Conserver toutes les lignes de la table de gauche même sans correspondance à droite.",
    "brief": "<p>Reliez <code>Marque</code> à <code>Voiture</code> par <code>codemarque</code>. Affichez <code>nommarque</code> et <code>immat</code> pour toutes les marques, même sans voiture : dans ce cas, <code>immat</code> vaut <code>NULL</code>. Triez par nom de marque croissant, puis par immatriculation croissante.</p>",
    "starter": "SELECT nommarque FROM Marque;",
    "hints": [
      "Placez Marque à gauche d’une jointure LEFT JOIN vers Voiture.",
      "Reliez les codes de marque, puis triez par nom et par immatriculation."
    ],
    "examples": [
      {
        "stdin": PARC_EXEMPLE,
        "expected": resultatTable(['nommarque', 'immat'], [
          ['BMW', 'TG-0480-AV'], ['HYUNDAI', 'TG-4444-AL'], ['MAZDA', null], ['MERCEDES BENZ', 'TG-7854-Z'],
          ['MITSUBISHI', 'TG-0020-AV'], ['TOYOTA', 'TG-3733-AC'], ['TOYOTA', 'TG-9420-AF']
        ]),
        "note": "MAZDA est conservée même sans voiture dans ce jeu."
      }
    ],
    "tests": [
      {
        "label": "Deux marques sans voiture",
        "stdin": PARC_SANS_BMW,
        "expected": resultatTable(['nommarque', 'immat'], [
          ['BMW', null], ['HYUNDAI', 'TG-4444-AL'], ['MAZDA', null], ['MERCEDES BENZ', 'TG-7854-Z'],
          ['MITSUBISHI', 'TG-0020-AV'], ['TOYOTA', 'TG-3733-AC'], ['TOYOTA', 'TG-9420-AF']
        ])
      },
      {
        "label": "Deux marques sans voiture et plusieurs correspondances",
        "stdin": PARC_LIMITES,
        "expected": resultatTable(['nommarque', 'immat'], [
          ['BMW', 'TG-9003-AX'], ['BMW', 'TG-9005-AX'], ['MAZDA', 'TG-9006-AX'], ['MITSUBISHI', 'TG-9002-AX'],
          ['NISSAN', null], ['PEUGEOT', null], ['TOYOTA', 'TG-9001-AX'], ['TOYOTA', 'TG-9004-AX']
        ])
      },
      { "label": "Une marque absente du parc", "stdin": PARC_MINI, "expected": resultatTable(['nommarque', 'immat'], [['KIA', null], ['NISSAN', 'TG-5220-BA'], ['RENAULT', 'TG-2222-BC']]) }
    ],
    "solution": "SELECT M.nommarque, V.immat FROM Marque M LEFT JOIN Voiture V ON M.codemarque = V.codemarque ORDER BY M.nommarque ASC, V.immat ASC;"
  },
  {
    "id": "sq-c4-e3",
    "chapter": 4,
    "level": "n3",
    "language": "sql",
    "title": "Jointure sur table d’association (N–N)",
    "goal": "Relier trois tables via une double jointure sur une table d’association.",
    "brief": "<p>Une voiture peut avoir plusieurs équipements et un équipement peut équiper plusieurs voitures. La table <code>VoitureEquipement(immat, codeequipement)</code> enregistre ces associations. Reliez-la à <code>Voiture</code> et à <code>Equipement</code>, puis affichez <code>immat</code> et <code>nomequipement</code> pour chaque association, triés par immatriculation croissante puis par nom d’équipement croissant.</p>",
    "starter": "SELECT immat FROM Voiture;",
    "hints": [
      "La première jointure relie l’immatriculation de Voiture à celle de VoitureEquipement.",
      "La seconde relie le code d’équipement de VoitureEquipement à celui d’Equipement."
    ],
    "examples": [
      {
        "stdin": PARC_EXEMPLE,
        "expected": resultatTable(['immat', 'nomequipement'], [
          ['TG-0020-AV', 'Camera de recul'], ['TG-0480-AV', 'Autoradio'],
          ['TG-3733-AC', 'Climatisation'], ['TG-3733-AC', 'Navigation GPS'],
          ['TG-7854-Z', 'Climatisation'], ['TG-9420-AF', 'Navigation GPS']
        ]),
        "note": "La Toyota TG-3733-AC a deux équipements ; le GPS équipe deux voitures."
      }
    ],
    "tests": [
      {
        "label": "Équipement partagé supplémentaire",
        "stdin": `${PARC_EXEMPLE}\nINSERT INTO VoitureEquipement (immat, codeequipement) VALUES ('TG-9420-AF', 'RAD');`,
        "expected": resultatTable(['immat', 'nomequipement'], [
          ['TG-0020-AV', 'Camera de recul'], ['TG-0480-AV', 'Autoradio'],
          ['TG-3733-AC', 'Climatisation'], ['TG-3733-AC', 'Navigation GPS'],
          ['TG-7854-Z', 'Climatisation'], ['TG-9420-AF', 'Autoradio'], ['TG-9420-AF', 'Navigation GPS']
        ])
      },
      {
        "label": "Autres associations et équipements sans voiture",
        "stdin": PARC_LIMITES,
        "expected": resultatTable(['immat', 'nomequipement'], [
          ['TG-9002-AX', 'Caméra de recul'], ['TG-9003-AX', 'Caméra de recul'], ['TG-9003-AX', 'GPS'],
          ['TG-9004-AX', 'GPS'], ['TG-9004-AX', 'Jantes'], ['TG-9006-AX', 'Autoradio']
        ])
      },
      { "label": "Un équipement pour deux voitures", "stdin": PARC_MINI, "expected": resultatTable(['immat', 'nomequipement'], [['TG-2222-BC', 'Attelage'], ['TG-2222-BC', 'GPS'], ['TG-5220-BA', 'GPS']]) }
    ],
    "solution": "SELECT V.immat, E.nomequipement FROM Voiture V INNER JOIN VoitureEquipement VE ON V.immat = VE.immat INNER JOIN Equipement E ON VE.codeequipement = E.codeequipement ORDER BY V.immat ASC, E.nomequipement ASC;"
  },
  {
    "id": "sq-c5-e1",
    "chapter": 5,
    "level": "n1",
    "language": "sql",
    "title": "Compter et sommer par pays avec GROUP BY",
    "goal": "Utiliser COUNT(*) et SUM() associés à GROUP BY.",
    "brief": "<p>À partir de <code>Marque</code>, reliez les voitures par une jointure gauche sur <code>codemarque</code>. Pour chaque <code>paysmarque</code>, affichez le pays, le nombre de lignes de la jointure (<code>COUNT(*) AS nb_lignes</code>), le nombre de voitures (<code>COUNT(V.immat) AS nb_voitures</code>) et la somme des prix d’achat (<code>SUM(V.pxachat) AS total_achat</code>). Triez par pays croissant.</p><p>Une marque sans voiture produit une ligne dont les colonnes de <code>V</code> sont <code>NULL</code> : <code>COUNT(*)</code> la compte, mais <code>COUNT(V.immat)</code> ne la compte pas. <code>SUM</code> ignore les prix <code>NULL</code> et renvoie <code>NULL</code> si aucun prix n’est présent dans le groupe.</p>",
    "starter": "SELECT M.paysmarque FROM Marque M LEFT JOIN Voiture V ON M.codemarque = V.codemarque;",
    "hints": [
      "La jointure gauche conserve les marques sans voiture ; distinguez le nombre de lignes et le nombre d’immatriculations non NULL.",
      "Calculez les agrégats demandés, regroupez par pays et triez le résultat."
    ],
    "examples": [
      {
        "stdin": PARC_EXEMPLE,
        "expected": resultatTable(['paysmarque', 'nb_lignes', 'nb_voitures', 'total_achat'], [
          ['ALLEMAGNE', 2, 2, 56000000], ['COREE DU SUD', 1, 1, 10000000], ['JAPON', 4, 3, 120000000]
        ]),
        "note": "Au Japon, MAZDA contribue une ligne sans voiture ; les deux prix à 50000000 sont additionnés."
      }
    ],
    "tests": [
      {
        "label": "Prix répétés et deux marques sans voiture",
        "stdin": PARC_SANS_BMW,
        "expected": resultatTable(['paysmarque', 'nb_lignes', 'nb_voitures', 'total_achat'], [
          ['ALLEMAGNE', 2, 1, 6000000], ['COREE DU SUD', 1, 1, 10000000], ['JAPON', 4, 3, 120000000]
        ])
      },
      {
        "label": "Pays sans voiture et valeurs répétées",
        "stdin": PARC_LIMITES,
        "expected": resultatTable(['paysmarque', 'nb_lignes', 'nb_voitures', 'total_achat'], [
          ['ALLEMAGNE', 2, 2, 31000000], ['FRANCE', 1, 0, null], ['JAPON', 5, 4, 112000000]
        ])
      },
      {
        "label": "Trois pays dont un sans voiture",
        "stdin": PARC_MINI,
        "expected": resultatTable(['paysmarque', 'nb_lignes', 'nb_voitures', 'total_achat'], [
          ['COREE DU SUD', 1, 0, null], ['FRANCE', 1, 1, 15000000], ['JAPON', 1, 1, 10000000]
        ])
      },
      { "label": "Aucune marque", "stdin": PARC_SCHEMA, "expected": resultatTable(['paysmarque', 'nb_lignes', 'nb_voitures', 'total_achat'], []) }
    ],
    "solution": "SELECT M.paysmarque, COUNT(*) AS nb_lignes, COUNT(V.immat) AS nb_voitures, SUM(V.pxachat) AS total_achat FROM Marque M LEFT JOIN Voiture V ON M.codemarque = V.codemarque GROUP BY M.paysmarque ORDER BY M.paysmarque ASC;"
  },
  {
    "id": "sq-c5-e2",
    "chapter": 5,
    "level": "n2",
    "language": "sql",
    "title": "Filtrer les groupes après agrégation avec HAVING",
    "goal": "Sélectionner uniquement les groupes dont l’agrégat dépasse un seuil via HAVING.",
    "brief": "<p>Dans <code>Voiture</code>, affichez chaque <code>marque</code> et le total de ses prix d’achat (<code>SUM(pxachat) AS total</code>), uniquement si ce total est supérieur ou égal à <code>50000000</code>. Triez par total décroissant, puis par marque croissante en cas d’égalité.</p>",
    "starter": "SELECT marque, SUM(pxachat) AS total FROM Voiture GROUP BY marque;",
    "hints": [
      "WHERE filtre les lignes avant le regroupement ; HAVING filtre les groupes après le calcul des agrégats.",
      "Conservez les groupes dont la somme atteint le seuil, puis triez sur le total et la marque."
    ],
    "examples": [
      {
        "stdin": PARC_EXEMPLE,
        "expected": resultatTable(['marque', 'total'], [['TOYOTA', 70000000], ['BMW', 50000000], ['MITSUBISHI', 50000000]]),
        "note": "Les marques dont le total vaut exactement 50000000 sont conservées."
      }
    ],
    "tests": [
      { "label": "Total juste sous la borne", "stdin": `${PARC_EXEMPLE}\nUPDATE Voiture SET pxachat = 49999999 WHERE immat = 'TG-0020-AV';`, "expected": resultatTable(['marque', 'total'], [['TOYOTA', 70000000], ['BMW', 50000000]]) },
      { "label": "Total exact et total supérieur", "stdin": PARC_LIMITES, "expected": resultatTable(['marque', 'total'], [['TOYOTA', 56000000], ['MITSUBISHI', 50000000]]) },
      { "label": "Aucun groupe au seuil", "stdin": PARC_MINI, "expected": resultatTable(['marque', 'total'], []) }
    ],
    "solution": "SELECT marque, SUM(pxachat) AS total FROM Voiture GROUP BY marque HAVING SUM(pxachat) >= 50000000 ORDER BY total DESC, marque ASC;"
  },
  {
    "id": "sq-c5-e3",
    "chapter": 5,
    "level": "n3",
    "language": "sql",
    "title": "Statistiques par marque (MIN, MAX, COUNT)",
    "goal": "Combiner plusieurs fonctions d’agrégation sur chaque groupe.",
    "brief": "<p>Dans <code>Voiture</code>, affichez pour chaque <code>marque</code> : la marque, le nombre de voitures (<code>COUNT(*) AS effectif</code>), le kilométrage minimal (<code>MIN(km) AS km_min</code>) et le kilométrage maximal (<code>MAX(km) AS km_max</code>). Triez par marque croissante.</p>",
    "starter": "SELECT marque FROM Voiture GROUP BY marque;",
    "hints": [
      "Appelez COUNT(*), MIN(km) et MAX(km) dans SELECT.",
      "Regroupez et triez par marque."
    ],
    "examples": [
      {
        "stdin": PARC_EXEMPLE,
        "expected": resultatTable(['marque', 'effectif', 'km_min', 'km_max'], [
          ['BMW', 1, 0, 0], ['HYUNDAI', 1, 5, 5], ['MERCEDES BENZ', 1, 500, 500],
          ['MITSUBISHI', 1, 30, 30], ['TOYOTA', 2, 0, 0]
        ]),
        "note": "Les deux Toyota sont comptées même si leurs kilométrages sont identiques."
      }
    ],
    "tests": [
      {
        "label": "Kilométrages identiques sans BMW",
        "stdin": PARC_SANS_BMW,
        "expected": resultatTable(['marque', 'effectif', 'km_min', 'km_max'], [
          ['HYUNDAI', 1, 5, 5], ['MERCEDES BENZ', 1, 500, 500], ['MITSUBISHI', 1, 30, 30], ['TOYOTA', 2, 0, 0]
        ])
      },
      {
        "label": "Minimum et maximum différents",
        "stdin": PARC_LIMITES,
        "expected": resultatTable(['marque', 'effectif', 'km_min', 'km_max'], [
          ['BMW', 2, 0, 6], ['MAZDA', 1, 10, 10], ['MITSUBISHI', 1, 5, 5], ['TOYOTA', 2, 4, 5]
        ])
      },
      { "label": "Une voiture par marque", "stdin": PARC_MINI, "expected": resultatTable(['marque', 'effectif', 'km_min', 'km_max'], [['NISSAN', 1, 6700, 6700], ['RENAULT', 1, 0, 0]]) }
    ],
    "solution": "SELECT marque, COUNT(*) AS effectif, MIN(km) AS km_min, MAX(km) AS km_max FROM Voiture GROUP BY marque ORDER BY marque ASC;"
  },
  {
    "id": "sq-c6-e1",
    "chapter": 6,
    "level": "n1",
    "language": "sql",
    "title": "Mettre à jour des lignes ciblées avec UPDATE ... WHERE",
    "goal": "Modifier la valeur d’une colonne sur un sous-ensemble de lignes avec UPDATE.",
    "brief": "<p>Dans une copie de <code>Voiture</code>, ajoutez <code>10</code> au kilométrage <code>km</code> des seules voitures dont le kilométrage actuel est strictement inférieur à <code>5</code>, après un essai de 10 km. Ne modifiez ni les autres voitures ni leurs autres colonnes.</p>",
    "starter": "UPDATE Voiture SET km = km;",
    "hints": [
      "La nouvelle valeur peut être calculée à partir de l’ancienne : km + 10.",
      "Utilisez WHERE pour ne conserver que les kilométrages strictement inférieurs à 5."
    ],
    "examples": [
      {
        "stdin": `${PARC_EXEMPLE}\n-- VERIFY:\nSELECT * FROM Voiture ORDER BY immat ASC;`,
        "expected": resultatModification(3, COLONNES_VOITURE, voituresApresEssai(VOITURES_EXEMPLE)),
        "note": "La vérification affiche toutes les voitures après la modification."
      }
    ],
    "tests": [
      { "label": "Deux voitures à zéro et une à quatre kilomètres", "stdin": `${PARC_EXEMPLE}\nUPDATE Voiture SET km = 4 WHERE immat = 'TG-3733-AC';\n-- VERIFY:\nSELECT * FROM Voiture ORDER BY immat ASC;`, "expected": resultatModification(3, COLONNES_VOITURE, voituresApresEssai(VOITURES_EXEMPLE.map(ligne => ligne[0] === 'TG-3733-AC' ? ligne.map((valeur, index) => index === 5 ? 4 : valeur) : ligne))) },
      { "label": "Valeurs 0, 4, 5 et 6", "stdin": `${PARC_LIMITES}\n-- VERIFY:\nSELECT * FROM Voiture ORDER BY immat ASC;`, "expected": resultatModification(2, COLONNES_VOITURE, voituresApresEssai(VOITURES_LIMITES)) },
      { "label": "Une seule voiture à modifier", "stdin": `${PARC_MINI}\n-- VERIFY:\nSELECT * FROM Voiture ORDER BY immat ASC;`, "expected": resultatModification(1, COLONNES_VOITURE, voituresApresEssai(VOITURES_MINI)) }
    ],
    "solution": "UPDATE Voiture SET km = km + 10 WHERE km < 5;"
  },
  {
    "id": "sq-c6-e2",
    "chapter": 6,
    "level": "n2",
    "language": "sql",
    "title": "Supprimer des lignes ciblées avec DELETE ... WHERE",
    "goal": "Supprimer uniquement les lignes répondant à un critère précis avec DELETE FROM.",
    "brief": "<p>Pour cet exercice sur une copie du parc, supprimez de <code>Voiture</code> uniquement les lignes dont la date de circulation <code>datecirc</code> est <code>NULL</code>. Conservez les autres voitures ; une chaîne vide n’est pas <code>NULL</code>. Le parc initial du simulateur ne comporte pas de date absente : certains jeux sont adaptés pour l’exercice.</p><p>Les clés étrangères étant activées, les associations des voitures supprimées disparaissent automatiquement de <code>VoitureEquipement</code> ; les équipements eux-mêmes sont conservés.</p>",
    "starter": "SELECT * FROM Voiture;",
    "hints": [
      "DELETE FROM supprime des lignes ; la clause WHERE limite la suppression.",
      "Testez l’absence de date avec IS NULL."
    ],
    "examples": [
      {
        "stdin": PARC_DATES + VERIFICATION_SUPPRESSION,
        "expected": resultatModification(2, COLONNES_VOITURE, VOITURES_EXEMPLE.filter(ligne => !['TG-3733-AC', 'TG-9420-AF'].includes(ligne[0]))) + '\n\n' + resultatTable(['immat', 'codeequipement'], [['TG-0020-AV', 'CAM'], ['TG-0480-AV', 'RAD'], ['TG-7854-Z', 'AIR']]),
        "note": "La vérification affiche les voitures et associations conservées après les suppressions."
      }
    ],
    "tests": [
      {
        "label": "Parc initial sans date absente",
        "stdin": PARC_EXEMPLE + VERIFICATION_SUPPRESSION,
        "expected": resultatModification(0, COLONNES_VOITURE, VOITURES_EXEMPLE) + '\n\n' + resultatTable(['immat', 'codeequipement'], [['TG-0020-AV', 'CAM'], ['TG-0480-AV', 'RAD'], ['TG-3733-AC', 'AIR'], ['TG-3733-AC', 'GPS'], ['TG-7854-Z', 'AIR'], ['TG-9420-AF', 'GPS']])
      },
      { "label": "Cinq dates absentes", "stdin": PARC_LIMITES + VERIFICATION_SUPPRESSION, "expected": resultatModification(5, COLONNES_VOITURE, [VOITURES_LIMITES[0]]) + '\n\n' + resultatTable(['immat', 'codeequipement'], []) },
      { "label": "Aucune date absente", "stdin": PARC_MINI + VERIFICATION_SUPPRESSION, "expected": resultatModification(0, COLONNES_VOITURE, VOITURES_MINI) + '\n\n' + resultatTable(['immat', 'codeequipement'], [['TG-2222-BC', 'ATT'], ['TG-2222-BC', 'GPS'], ['TG-5220-BA', 'GPS']]) },
      {
        "label": "Chaîne vide conservée",
        "stdin": PARC_DATES_MIXTES + VERIFICATION_SUPPRESSION,
        "expected": resultatModification(4, COLONNES_VOITURE, [VOITURES_LIMITES[0], ['TG-9002-AX', 'MITSUBISHI', 'MIT', 'ESSENCE', '', 5, 50000000, 7]]) + '\n\n' + resultatTable(['immat', 'codeequipement'], [['TG-9002-AX', 'CAM']])
      }
    ],
    "solution": "DELETE FROM Voiture WHERE datecirc IS NULL;"
  },
  {
    "id": "sq-c6-e3",
    "chapter": 6,
    "level": "n3",
    "language": "sql",
    "title": "Sous-requête dans WHERE",
    "goal": "Utiliser une sous-requête (IN / SELECT) pour filtrer selon les données d’une seconde table.",
    "brief": "<p>Dans <code>Voiture</code>, affichez <code>immat</code> et <code>marque</code> pour les voitures dont la marque a <code>paysmarque = 'JAPON'</code> dans la table <code>Marque</code>. Reliez les deux tables par <code>codemarque</code> et triez par <code>immat</code> croissante.</p>",
    "starter": "SELECT immat, marque FROM Voiture;",
    "hints": [
      "Une sous-requête sur Marque peut renvoyer les codes de toutes les marques japonaises.",
      "Utilisez IN pour comparer le code de chaque voiture à cet ensemble, puis triez par immat."
    ],
    "examples": [
      {
        "stdin": PARC_EXEMPLE,
        "expected": resultatTable(['immat', 'marque'], [['TG-0020-AV', 'MITSUBISHI'], ['TG-3733-AC', 'TOYOTA'], ['TG-9420-AF', 'TOYOTA']]),
        "note": "Le jeu contient des voitures de deux marques japonaises."
      }
    ],
    "tests": [
      { "label": "Trois marques japonaises et des marques étrangères", "stdin": PARC_AVEC_MAZDA, "expected": resultatTable(['immat', 'marque'], [['TG-0020-AV', 'MITSUBISHI'], ['TG-1420-AW', 'MAZDA'], ['TG-3733-AC', 'TOYOTA'], ['TG-9420-AF', 'TOYOTA']]) },
      { "label": "Trois marques japonaises représentées", "stdin": PARC_LIMITES, "expected": resultatTable(['immat', 'marque'], [['TG-9001-AX', 'TOYOTA'], ['TG-9002-AX', 'MITSUBISHI'], ['TG-9004-AX', 'TOYOTA'], ['TG-9006-AX', 'MAZDA']]) },
      { "label": "Une seule voiture japonaise", "stdin": PARC_MINI, "expected": resultatTable(['immat', 'marque'], [['TG-5220-BA', 'NISSAN']]) }
    ],
    "solution": "SELECT immat, marque FROM Voiture WHERE codemarque IN (SELECT codemarque FROM Marque WHERE paysmarque = 'JAPON') ORDER BY immat ASC;"
  }
];

const TEMOINS_CROISES = {
  "sq-c1-e1": [
    {
      label: "Tri différent, dates présentes",
      stdin: PARC_SCHEMA + "\nINSERT INTO Marque (codemarque, nommarque, paysmarque) VALUES\n  ('ALP', 'ALPHA', 'FRANCE'),\n  ('BET', 'BETA', 'FRANCE');\nINSERT INTO Voiture (immat, marque, codemarque, moteur, datecirc, km, pxachat, nbreplace) VALUES\n  ('P-A', 'ALPHA', 'ALP', 'ESSENCE', '2020-01-01', 1, 10000000, 5),\n  ('P-B', 'BETA', 'BET', 'ESSENCE', '2020-01-01', 9, 10000000, 5);",
      expected: "+-------+--------+------------+---------+------------+----+----------+-----------+\n| immat | marque | codemarque | moteur  | datecirc   | km | pxachat  | nbreplace |\n+-------+--------+------------+---------+------------+----+----------+-----------+\n| P-A   | ALPHA  | ALP        | ESSENCE | 2020-01-01 | 1  | 10000000 | 5         |\n| P-B   | BETA   | BET        | ESSENCE | 2020-01-01 | 9  | 10000000 | 5         |\n+-------+--------+------------+---------+------------+----+----------+-----------+\n(2 lignes retournées)"
    },
    {
      label: "Kilométrages égaux et date absente",
      stdin: PARC_SCHEMA + "\nINSERT INTO Marque (codemarque, nommarque, paysmarque) VALUES\n  ('ALP', 'ALPHA', 'FRANCE'),\n  ('BET', 'BETA', 'FRANCE');\nINSERT INTO Voiture (immat, marque, codemarque, moteur, datecirc, km, pxachat, nbreplace) VALUES\n  ('P-B', 'BETA', 'BET', 'ESSENCE', '2020-01-01', 0, 10000000, 5),\n  ('P-A', 'ALPHA', 'ALP', 'ESSENCE', NULL, 0, 10000000, 5);",
      expected: "+-------+--------+------------+---------+------------+----+----------+-----------+\n| immat | marque | codemarque | moteur  | datecirc   | km | pxachat  | nbreplace |\n+-------+--------+------------+---------+------------+----+----------+-----------+\n| P-A   | ALPHA  | ALP        | ESSENCE | NULL       | 0  | 10000000 | 5         |\n| P-B   | BETA   | BET        | ESSENCE | 2020-01-01 | 0  | 10000000 | 5         |\n+-------+--------+------------+---------+------------+----+----------+-----------+\n(2 lignes retournées)"
    },
  ],
  "sq-c1-e2": [
    {
      label: "Date absente, tris concordants",
      stdin: PARC_SCHEMA + "\nINSERT INTO Marque (codemarque, nommarque, paysmarque) VALUES\n  ('ALP', 'ALPHA', 'FRANCE'),\n  ('BET', 'BETA', 'FRANCE');\nINSERT INTO Voiture (immat, marque, codemarque, moteur, datecirc, km, pxachat, nbreplace) VALUES\n  ('P-A', 'ALPHA', 'ALP', 'ESSENCE', NULL, 1, 10000000, 5),\n  ('P-B', 'BETA', 'BET', 'ESSENCE', '2020-01-01', 1, 10000000, 5);",
      expected: "+-------+--------+\n| immat | marque |\n+-------+--------+\n| P-A   | ALPHA  |\n| P-B   | BETA   |\n+-------+--------+\n(2 lignes retournées)"
    },
    {
      label: "Dates présentes, tris opposés",
      stdin: PARC_SCHEMA + "\nINSERT INTO Marque (codemarque, nommarque, paysmarque) VALUES\n  ('ALP', 'ALPHA', 'FRANCE'),\n  ('BET', 'BETA', 'FRANCE');\nINSERT INTO Voiture (immat, marque, codemarque, moteur, datecirc, km, pxachat, nbreplace) VALUES\n  ('P-A', 'BETA', 'BET', 'ESSENCE', '2020-01-01', 1, 10000000, 5),\n  ('P-B', 'ALPHA', 'ALP', 'ESSENCE', '2020-01-01', 1, 10000000, 5);",
      expected: "+-------+--------+\n| immat | marque |\n+-------+--------+\n| P-A   | BETA   |\n| P-B   | ALPHA  |\n+-------+--------+\n(2 lignes retournées)"
    },
  ],
  "sq-c1-e3": [
    {
      label: "Motorisation répétée, dates présentes",
      stdin: PARC_SCHEMA + "\nINSERT INTO Marque (codemarque, nommarque, paysmarque) VALUES\n  ('ALP', 'ALPHA', 'FRANCE');\nINSERT INTO Voiture (immat, marque, codemarque, moteur, datecirc, km, pxachat, nbreplace) VALUES\n  ('P-A', 'ALPHA', 'ALP', 'ESSENCE', '2020-01-01', 1, 10000000, 5),\n  ('P-B', 'ALPHA', 'ALP', 'ESSENCE', '2020-01-01', 2, 10000000, 5);",
      expected: "+---------+\n| moteur  |\n+---------+\n| ESSENCE |\n+---------+\n(1 ligne retournée)"
    },
    {
      label: "Motorisations distinctes, date absente",
      stdin: PARC_SCHEMA + "\nINSERT INTO Marque (codemarque, nommarque, paysmarque) VALUES\n  ('ALP', 'ALPHA', 'FRANCE');\nINSERT INTO Voiture (immat, marque, codemarque, moteur, datecirc, km, pxachat, nbreplace) VALUES\n  ('P-A', 'ALPHA', 'ALP', 'ESSENCE', NULL, 1, 10000000, 5),\n  ('P-B', 'ALPHA', 'ALP', 'DIESEL', '2020-01-01', 1, 10000000, 5);",
      expected: "+---------+\n| moteur  |\n+---------+\n| DIESEL  |\n| ESSENCE |\n+---------+\n(2 lignes retournées)"
    },
  ],
  "sq-c2-e1": [
    {
      label: "Clé texte explicitement NOT NULL",
      stdin: "PRAGMA foreign_keys=ON;\n-- VERIFY:\nSELECT codemarque, nommarque, paysmarque FROM Marque WHERE codemarque = 'BMW';\nINSERT OR IGNORE INTO Marque (codemarque, nommarque, paysmarque) VALUES (NULL, 'AUTRE', 'FRANCE');\nSELECT COUNT(*) AS null_acceptes FROM Marque WHERE codemarque IS NULL;",
      expected: "Instruction exécutée avec succès (0 lignes modifiées).\n\nInstruction exécutée avec succès (1 ligne modifiée).\n\n+------------+-----------+------------+\n| codemarque | nommarque | paysmarque |\n+------------+-----------+------------+\n| BMW        | BMW       | ALLEMAGNE  |\n+------------+-----------+------------+\n(1 ligne retournée)\n\nInstruction exécutée avec succès (0 lignes modifiées).\n\n+---------------+\n| null_acceptes |\n+---------------+\n| 0             |\n+---------------+\n(1 ligne retournée)"
    },
    {
      label: "Unicité individuelle du nom",
      stdin: "PRAGMA foreign_keys=ON;\n-- VERIFY:\nSELECT codemarque, nommarque, paysmarque FROM Marque WHERE codemarque = 'BMW';\nINSERT OR IGNORE INTO Marque (codemarque, nommarque, paysmarque) VALUES ('ALT', 'BMW', 'FRANCE');\nSELECT COUNT(*) AS noms FROM Marque WHERE nommarque = 'BMW';",
      expected: "Instruction exécutée avec succès (0 lignes modifiées).\n\nInstruction exécutée avec succès (1 ligne modifiée).\n\n+------------+-----------+------------+\n| codemarque | nommarque | paysmarque |\n+------------+-----------+------------+\n| BMW        | BMW       | ALLEMAGNE  |\n+------------+-----------+------------+\n(1 ligne retournée)\n\nInstruction exécutée avec succès (0 lignes modifiées).\n\n+------+\n| noms |\n+------+\n| 1    |\n+------+\n(1 ligne retournée)"
    },
  ],
  "sq-c2-e2": [
    {
      label: "Unicité individuelle du nom",
      stdin: "PRAGMA foreign_keys=ON;\n-- VERIFY:\nSELECT codeequipement, nomequipement, prix FROM Equipement WHERE codeequipement = 'AIR';\nINSERT OR IGNORE INTO Equipement (codeequipement, nomequipement) VALUES ('ALT', 'Climatisation');\nSELECT COUNT(*) AS noms FROM Equipement WHERE nomequipement = 'Climatisation';\nINSERT INTO Equipement (codeequipement, nomequipement) VALUES ('TST', 'Trousse');\nSELECT prix FROM Equipement WHERE codeequipement = 'TST';",
      expected: "Instruction exécutée avec succès (0 lignes modifiées).\n\nInstruction exécutée avec succès (1 ligne modifiée).\n\n+----------------+---------------+------+\n| codeequipement | nomequipement | prix |\n+----------------+---------------+------+\n| AIR            | Climatisation | 0    |\n+----------------+---------------+------+\n(1 ligne retournée)\n\nInstruction exécutée avec succès (0 lignes modifiées).\n\n+------+\n| noms |\n+------+\n| 1    |\n+------+\n(1 ligne retournée)\n\nInstruction exécutée avec succès (1 ligne modifiée).\n\n+------+\n| prix |\n+------+\n| 0    |\n+------+\n(1 ligne retournée)"
    },
    {
      label: "Nom explicitement NOT NULL",
      stdin: "PRAGMA foreign_keys=ON;\n-- VERIFY:\nSELECT codeequipement, nomequipement, prix FROM Equipement WHERE codeequipement = 'AIR';\nINSERT OR IGNORE INTO Equipement (codeequipement, nomequipement) VALUES ('ALT', NULL);\nSELECT COUNT(*) AS null_acceptes FROM Equipement WHERE nomequipement IS NULL;\nINSERT INTO Equipement (codeequipement, nomequipement) VALUES ('TST', 'Trousse');\nSELECT prix FROM Equipement WHERE codeequipement = 'TST';",
      expected: "Instruction exécutée avec succès (0 lignes modifiées).\n\nInstruction exécutée avec succès (1 ligne modifiée).\n\n+----------------+---------------+------+\n| codeequipement | nomequipement | prix |\n+----------------+---------------+------+\n| AIR            | Climatisation | 0    |\n+----------------+---------------+------+\n(1 ligne retournée)\n\nInstruction exécutée avec succès (0 lignes modifiées).\n\n+---------------+\n| null_acceptes |\n+---------------+\n| 0             |\n+---------------+\n(1 ligne retournée)\n\nInstruction exécutée avec succès (1 ligne modifiée).\n\n+------+\n| prix |\n+------+\n| 0    |\n+------+\n(1 ligne retournée)"
    },
  ],
  "sq-c2-e3": [
    {
      label: "Type entier de prix après ALTER",
      stdin: PARC_ANTERIEUR + "\n-- VERIFY:\nSELECT UPPER(type) AS type FROM pragma_table_info('Equipement') WHERE name = 'prix';",
      expected: "Instruction exécutée avec succès (0 lignes modifiées).\n\n+---------+\n| type    |\n+---------+\n| INTEGER |\n+---------+\n(1 ligne retournée)"
    },
    {
      label: "Prix par défaut égal à zéro",
      stdin: PARC_ANTERIEUR + "\n-- VERIFY:\nINSERT INTO Equipement (codeequipement, nomequipement) VALUES ('AUX', 'Trousse');\nSELECT CAST(prix AS INTEGER) AS prix FROM Equipement WHERE codeequipement = 'AUX';",
      expected: "Instruction exécutée avec succès (0 lignes modifiées).\n\nInstruction exécutée avec succès (1 ligne modifiée).\n\n+------+\n| prix |\n+------+\n| 0    |\n+------+\n(1 ligne retournée)"
    },
  ],
  "sq-c3-e1": [
    {
      label: "Seuil inclus et kilométrages égaux",
      stdin: PARC_SCHEMA + "\nINSERT INTO Marque (codemarque, nommarque, paysmarque) VALUES\n  ('ALP', 'ALPHA', 'FRANCE');\nINSERT INTO Voiture (immat, marque, codemarque, moteur, datecirc, km, pxachat, nbreplace) VALUES\n  ('P-B', 'ALPHA', 'ALP', 'ESSENCE', '2020-01-01', 5, 10000000, 5),\n  ('P-A', 'ALPHA', 'ALP', 'ESSENCE', '2020-01-01', 5, 10000000, 5);",
      expected: "+-------+----+\n| immat | km |\n+-------+----+\n| P-A   | 5  |\n| P-B   | 5  |\n+-------+----+\n(2 lignes retournées)"
    },
    {
      label: "Kilométrages distincts au-dessus du seuil",
      stdin: PARC_SCHEMA + "\nINSERT INTO Marque (codemarque, nommarque, paysmarque) VALUES\n  ('ALP', 'ALPHA', 'FRANCE');\nINSERT INTO Voiture (immat, marque, codemarque, moteur, datecirc, km, pxachat, nbreplace) VALUES\n  ('P-A', 'ALPHA', 'ALP', 'ESSENCE', '2020-01-01', 6, 10000000, 5),\n  ('P-B', 'ALPHA', 'ALP', 'ESSENCE', '2020-01-01', 9, 10000000, 5);",
      expected: "+-------+----+\n| immat | km |\n+-------+----+\n| P-B   | 9  |\n| P-A   | 6  |\n+-------+----+\n(2 lignes retournées)"
    },
  ],
  "sq-c3-e2": [
    {
      label: "Bornes présentes, marques commençant par M",
      stdin: PARC_SCHEMA + "\nINSERT INTO Marque (codemarque, nommarque, paysmarque) VALUES\n  ('MAZ', 'MAZDA', 'FRANCE'),\n  ('MER', 'MERCEDES', 'FRANCE');\nINSERT INTO Voiture (immat, marque, codemarque, moteur, datecirc, km, pxachat, nbreplace) VALUES\n  ('P-A', 'MAZDA', 'MAZ', 'ESSENCE', '2020-01-01', 1, 6000000, 5),\n  ('P-B', 'MERCEDES', 'MER', 'ESSENCE', '2020-01-01', 1, 50000000, 5);",
      expected: "+-------+----------+----------+\n| immat | marque   | pxachat  |\n+-------+----------+----------+\n| P-A   | MAZDA    | 6000000  |\n| P-B   | MERCEDES | 50000000 |\n+-------+----------+----------+\n(2 lignes retournées)"
    },
    {
      label: "Prix intérieurs et M au milieu",
      stdin: PARC_SCHEMA + "\nINSERT INTO Marque (codemarque, nommarque, paysmarque) VALUES\n  ('MAZ', 'MAZDA', 'FRANCE'),\n  ('BMW', 'BMW', 'FRANCE');\nINSERT INTO Voiture (immat, marque, codemarque, moteur, datecirc, km, pxachat, nbreplace) VALUES\n  ('P-A', 'MAZDA', 'MAZ', 'ESSENCE', '2020-01-01', 1, 10000000, 5),\n  ('P-B', 'BMW', 'BMW', 'ESSENCE', '2020-01-01', 1, 20000000, 5);",
      expected: "+-------+--------+----------+\n| immat | marque | pxachat  |\n+-------+--------+----------+\n| P-A   | MAZDA  | 10000000 |\n+-------+--------+----------+\n(1 ligne retournée)"
    },
  ],
  "sq-c3-e3": [
    {
      label: "Quatre dates NULL sans chaîne vide",
      stdin: PARC_SCHEMA + "\nINSERT INTO Marque (codemarque, nommarque, paysmarque) VALUES\n  ('ALP', 'ALPHA', 'FRANCE');\nINSERT INTO Voiture (immat, marque, codemarque, moteur, datecirc, km, pxachat, nbreplace) VALUES\n  ('P-A', 'ALPHA', 'ALP', 'ESSENCE', NULL, 1, 10000000, 5),\n  ('P-B', 'ALPHA', 'ALP', 'ESSENCE', NULL, 1, 10000000, 5),\n  ('P-C', 'ALPHA', 'ALP', 'ESSENCE', NULL, 1, 10000000, 5),\n  ('P-D', 'ALPHA', 'ALP', 'ESSENCE', NULL, 1, 10000000, 5);",
      expected: "+-------+--------+\n| immat | marque |\n+-------+--------+\n| P-A   | ALPHA  |\n| P-B   | ALPHA  |\n| P-C   | ALPHA  |\n+-------+--------+\n(3 lignes retournées)"
    },
    {
      label: "Une date NULL et une chaîne vide",
      stdin: PARC_SCHEMA + "\nINSERT INTO Marque (codemarque, nommarque, paysmarque) VALUES\n  ('ALP', 'ALPHA', 'FRANCE');\nINSERT INTO Voiture (immat, marque, codemarque, moteur, datecirc, km, pxachat, nbreplace) VALUES\n  ('P-A', 'ALPHA', 'ALP', 'ESSENCE', NULL, 1, 10000000, 5),\n  ('P-B', 'ALPHA', 'ALP', 'ESSENCE', '', 1, 10000000, 5);",
      expected: "+-------+--------+\n| immat | marque |\n+-------+--------+\n| P-A   | ALPHA  |\n+-------+--------+\n(1 ligne retournée)"
    },
  ],
  "sq-c4-e1": [
    {
      label: "Marque sans voiture",
      stdin: PARC_SCHEMA + "\nINSERT INTO Marque (codemarque, nommarque, paysmarque) VALUES\n  ('ALP', 'ALPHA', 'FRANCE'),\n  ('BET', 'BETA', 'FRANCE');\nINSERT INTO Voiture (immat, marque, codemarque, moteur, datecirc, km, pxachat, nbreplace) VALUES\n  ('P-A', 'BETA', 'BET', 'ESSENCE', '2020-01-01', 1, 10000000, 5);",
      expected: "+-----------+-------+\n| nommarque | immat |\n+-----------+-------+\n| BETA      | P-A   |\n+-----------+-------+\n(1 ligne retournée)"
    },
    {
      label: "Toutes les marques présentes, tris opposés",
      stdin: PARC_SCHEMA + "\nINSERT INTO Marque (codemarque, nommarque, paysmarque) VALUES\n  ('ALP', 'ALPHA', 'FRANCE'),\n  ('BET', 'BETA', 'FRANCE');\nINSERT INTO Voiture (immat, marque, codemarque, moteur, datecirc, km, pxachat, nbreplace) VALUES\n  ('P-A', 'BETA', 'BET', 'ESSENCE', '2020-01-01', 1, 10000000, 5),\n  ('P-B', 'ALPHA', 'ALP', 'ESSENCE', '2020-01-01', 1, 10000000, 5);",
      expected: "+-----------+-------+\n| nommarque | immat |\n+-----------+-------+\n| ALPHA     | P-B   |\n| BETA      | P-A   |\n+-----------+-------+\n(2 lignes retournées)"
    },
  ],
  "sq-c4-e2": [
    {
      label: "Marque initiale sans voiture",
      stdin: PARC_SCHEMA + "\nINSERT INTO Marque (codemarque, nommarque, paysmarque) VALUES\n  ('ALP', 'ALPHA', 'FRANCE'),\n  ('BET', 'BETA', 'FRANCE');\nINSERT INTO Voiture (immat, marque, codemarque, moteur, datecirc, km, pxachat, nbreplace) VALUES\n  ('P-A', 'BETA', 'BET', 'ESSENCE', '2020-01-01', 1, 10000000, 5);",
      expected: "+-----------+-------+\n| nommarque | immat |\n+-----------+-------+\n| ALPHA     | NULL  |\n| BETA      | P-A   |\n+-----------+-------+\n(2 lignes retournées)"
    },
    {
      label: "Toutes les marques présentes, tris opposés",
      stdin: PARC_SCHEMA + "\nINSERT INTO Marque (codemarque, nommarque, paysmarque) VALUES\n  ('ALP', 'ALPHA', 'FRANCE'),\n  ('BET', 'BETA', 'FRANCE');\nINSERT INTO Voiture (immat, marque, codemarque, moteur, datecirc, km, pxachat, nbreplace) VALUES\n  ('P-A', 'BETA', 'BET', 'ESSENCE', '2020-01-01', 1, 10000000, 5),\n  ('P-B', 'ALPHA', 'ALP', 'ESSENCE', '2020-01-01', 1, 10000000, 5);",
      expected: "+-----------+-------+\n| nommarque | immat |\n+-----------+-------+\n| ALPHA     | P-B   |\n| BETA      | P-A   |\n+-----------+-------+\n(2 lignes retournées)"
    },
  ],
  "sq-c4-e3": [
    {
      label: "Une voiture et un équipement gratuit",
      stdin: PARC_SCHEMA + "\nINSERT INTO Marque (codemarque, nommarque, paysmarque) VALUES\n  ('ALP', 'ALPHA', 'FRANCE');\nINSERT INTO Voiture (immat, marque, codemarque, moteur, datecirc, km, pxachat, nbreplace) VALUES\n  ('P-A', 'ALPHA', 'ALP', 'ESSENCE', '2020-01-01', 1, 10000000, 5);\nINSERT INTO Equipement (codeequipement, nomequipement, prix) VALUES\n  ('AIR', 'Clim', 0),\n  ('GPS', 'GPS', 100);\nINSERT INTO VoitureEquipement (immat, codeequipement) VALUES\n  ('P-A', 'AIR'),\n  ('P-A', 'GPS');",
      expected: "+-------+---------------+\n| immat | nomequipement |\n+-------+---------------+\n| P-A   | Clim          |\n| P-A   | GPS           |\n+-------+---------------+\n(2 lignes retournées)"
    },
    {
      label: "Équipements payants, tris opposés",
      stdin: PARC_SCHEMA + "\nINSERT INTO Marque (codemarque, nommarque, paysmarque) VALUES\n  ('ALP', 'ALPHA', 'FRANCE');\nINSERT INTO Voiture (immat, marque, codemarque, moteur, datecirc, km, pxachat, nbreplace) VALUES\n  ('P-A', 'ALPHA', 'ALP', 'ESSENCE', '2020-01-01', 1, 10000000, 5),\n  ('P-B', 'ALPHA', 'ALP', 'ESSENCE', '2020-01-01', 1, 10000000, 5);\nINSERT INTO Equipement (codeequipement, nomequipement, prix) VALUES\n  ('CAM', 'Camera', 100),\n  ('RAD', 'Radio', 200);\nINSERT INTO VoitureEquipement (immat, codeequipement) VALUES\n  ('P-A', 'RAD'),\n  ('P-B', 'CAM');",
      expected: "+-------+---------------+\n| immat | nomequipement |\n+-------+---------------+\n| P-A   | Radio         |\n| P-B   | Camera        |\n+-------+---------------+\n(2 lignes retournées)"
    },
  ],
  "sq-c5-e1": [
    {
      label: "Marque sans voiture, prix sans répétition",
      stdin: PARC_SCHEMA + "\nINSERT INTO Marque (codemarque, nommarque, paysmarque) VALUES\n  ('ALP', 'ALPHA', 'FRANCE'),\n  ('BET', 'BETA', 'FRANCE');\nINSERT INTO Voiture (immat, marque, codemarque, moteur, datecirc, km, pxachat, nbreplace) VALUES\n  ('P-A', 'ALPHA', 'ALP', 'ESSENCE', '2020-01-01', 1, 100, 5);",
      expected: "+------------+-----------+-------------+-------------+\n| paysmarque | nb_lignes | nb_voitures | total_achat |\n+------------+-----------+-------------+-------------+\n| FRANCE     | 2         | 1           | 100         |\n+------------+-----------+-------------+-------------+\n(1 ligne retournée)"
    },
    {
      label: "Toutes les marques représentées, prix répété",
      stdin: PARC_SCHEMA + "\nINSERT INTO Marque (codemarque, nommarque, paysmarque) VALUES\n  ('ALP', 'ALPHA', 'FRANCE'),\n  ('BET', 'BETA', 'FRANCE');\nINSERT INTO Voiture (immat, marque, codemarque, moteur, datecirc, km, pxachat, nbreplace) VALUES\n  ('P-A', 'ALPHA', 'ALP', 'ESSENCE', '2020-01-01', 1, 100, 5),\n  ('P-B', 'BETA', 'BET', 'ESSENCE', '2020-01-01', 1, 100, 5);",
      expected: "+------------+-----------+-------------+-------------+\n| paysmarque | nb_lignes | nb_voitures | total_achat |\n+------------+-----------+-------------+-------------+\n| FRANCE     | 2         | 2           | 200         |\n+------------+-----------+-------------+-------------+\n(1 ligne retournée)"
    },
  ],
  "sq-c5-e2": [
    {
      label: "Un total égal au seuil, aucun inférieur",
      stdin: PARC_SCHEMA + "\nINSERT INTO Marque (codemarque, nommarque, paysmarque) VALUES\n  ('ALP', 'ALPHA', 'FRANCE'),\n  ('BET', 'BETA', 'FRANCE');\nINSERT INTO Voiture (immat, marque, codemarque, moteur, datecirc, km, pxachat, nbreplace) VALUES\n  ('P-A', 'ALPHA', 'ALP', 'ESSENCE', '2020-01-01', 1, 50000000, 5),\n  ('P-B', 'BETA', 'BET', 'ESSENCE', '2020-01-01', 1, 60000000, 5);",
      expected: "+--------+----------+\n| marque | total    |\n+--------+----------+\n| BETA   | 60000000 |\n| ALPHA  | 50000000 |\n+--------+----------+\n(2 lignes retournées)"
    },
    {
      label: "Un total inférieur, aucun égal au seuil",
      stdin: PARC_SCHEMA + "\nINSERT INTO Marque (codemarque, nommarque, paysmarque) VALUES\n  ('ALP', 'ALPHA', 'FRANCE'),\n  ('BET', 'BETA', 'FRANCE');\nINSERT INTO Voiture (immat, marque, codemarque, moteur, datecirc, km, pxachat, nbreplace) VALUES\n  ('P-A', 'ALPHA', 'ALP', 'ESSENCE', '2020-01-01', 1, 1000000, 5),\n  ('P-B', 'BETA', 'BET', 'ESSENCE', '2020-01-01', 1, 60000000, 5);",
      expected: "+--------+----------+\n| marque | total    |\n+--------+----------+\n| BETA   | 60000000 |\n+--------+----------+\n(1 ligne retournée)"
    },
  ],
  "sq-c5-e3": [
    {
      label: "Kilométrages identiques",
      stdin: PARC_SCHEMA + "\nINSERT INTO Marque (codemarque, nommarque, paysmarque) VALUES\n  ('ALP', 'ALPHA', 'FRANCE');\nINSERT INTO Voiture (immat, marque, codemarque, moteur, datecirc, km, pxachat, nbreplace) VALUES\n  ('P-A', 'ALPHA', 'ALP', 'ESSENCE', '2020-01-01', 4, 10000000, 5),\n  ('P-B', 'ALPHA', 'ALP', 'ESSENCE', '2020-01-01', 4, 10000000, 5);",
      expected: "+--------+----------+--------+--------+\n| marque | effectif | km_min | km_max |\n+--------+----------+--------+--------+\n| ALPHA  | 2        | 4      | 4      |\n+--------+----------+--------+--------+\n(1 ligne retournée)"
    },
    {
      label: "Kilométrages distincts",
      stdin: PARC_SCHEMA + "\nINSERT INTO Marque (codemarque, nommarque, paysmarque) VALUES\n  ('ALP', 'ALPHA', 'FRANCE');\nINSERT INTO Voiture (immat, marque, codemarque, moteur, datecirc, km, pxachat, nbreplace) VALUES\n  ('P-A', 'ALPHA', 'ALP', 'ESSENCE', '2020-01-01', 2, 10000000, 5),\n  ('P-B', 'ALPHA', 'ALP', 'ESSENCE', '2020-01-01', 9, 10000000, 5);",
      expected: "+--------+----------+--------+--------+\n| marque | effectif | km_min | km_max |\n+--------+----------+--------+--------+\n| ALPHA  | 2        | 2      | 9      |\n+--------+----------+--------+--------+\n(1 ligne retournée)"
    },
  ],
  "sq-c6-e1": [
    {
      label: "Kilométrages 0 et 5",
      stdin: PARC_SCHEMA + "\nINSERT INTO Marque (codemarque, nommarque, paysmarque) VALUES\n  ('ALP', 'ALPHA', 'FRANCE');\nINSERT INTO Voiture (immat, marque, codemarque, moteur, datecirc, km, pxachat, nbreplace) VALUES\n  ('P-A', 'ALPHA', 'ALP', 'ESSENCE', '2020-01-01', 0, 10000000, 5),\n  ('P-B', 'ALPHA', 'ALP', 'ESSENCE', '2020-01-01', 5, 10000000, 5);\n-- VERIFY:\nSELECT * FROM Voiture ORDER BY immat ASC;",
      expected: "Instruction exécutée avec succès (1 ligne modifiée).\n\n+-------+--------+------------+---------+------------+----+----------+-----------+\n| immat | marque | codemarque | moteur  | datecirc   | km | pxachat  | nbreplace |\n+-------+--------+------------+---------+------------+----+----------+-----------+\n| P-A   | ALPHA  | ALP        | ESSENCE | 2020-01-01 | 10 | 10000000 | 5         |\n| P-B   | ALPHA  | ALP        | ESSENCE | 2020-01-01 | 5  | 10000000 | 5         |\n+-------+--------+------------+---------+------------+----+----------+-----------+\n(2 lignes retournées)"
    },
    {
      label: "Kilométrages 4 et 6",
      stdin: PARC_SCHEMA + "\nINSERT INTO Marque (codemarque, nommarque, paysmarque) VALUES\n  ('ALP', 'ALPHA', 'FRANCE');\nINSERT INTO Voiture (immat, marque, codemarque, moteur, datecirc, km, pxachat, nbreplace) VALUES\n  ('P-A', 'ALPHA', 'ALP', 'ESSENCE', '2020-01-01', 4, 10000000, 5),\n  ('P-B', 'ALPHA', 'ALP', 'ESSENCE', '2020-01-01', 6, 10000000, 5);\n-- VERIFY:\nSELECT * FROM Voiture ORDER BY immat ASC;",
      expected: "Instruction exécutée avec succès (1 ligne modifiée).\n\n+-------+--------+------------+---------+------------+----+----------+-----------+\n| immat | marque | codemarque | moteur  | datecirc   | km | pxachat  | nbreplace |\n+-------+--------+------------+---------+------------+----+----------+-----------+\n| P-A   | ALPHA  | ALP        | ESSENCE | 2020-01-01 | 14 | 10000000 | 5         |\n| P-B   | ALPHA  | ALP        | ESSENCE | 2020-01-01 | 6  | 10000000 | 5         |\n+-------+--------+------------+---------+------------+----+----------+-----------+\n(2 lignes retournées)"
    },
  ],
  "sq-c6-e2": [
    {
      label: "NULL à zéro kilomètre et chaîne vide",
      stdin: PARC_SCHEMA + "\nINSERT INTO Marque (codemarque, nommarque, paysmarque) VALUES\n  ('ALP', 'ALPHA', 'FRANCE');\nINSERT INTO Voiture (immat, marque, codemarque, moteur, datecirc, km, pxachat, nbreplace) VALUES\n  ('P-A', 'ALPHA', 'ALP', 'ESSENCE', NULL, 0, 10000000, 5),\n  ('P-B', 'ALPHA', 'ALP', 'ESSENCE', '', 1, 10000000, 5),\n  ('P-C', 'ALPHA', 'ALP', 'ESSENCE', '2020-01-01', 2, 10000000, 5);\nINSERT INTO Equipement (codeequipement, nomequipement, prix) VALUES\n  ('GPS', 'GPS', 100);\nINSERT INTO VoitureEquipement (immat, codeequipement) VALUES\n  ('P-A', 'GPS'),\n  ('P-B', 'GPS');\n-- VERIFY:\nSELECT * FROM Voiture ORDER BY immat ASC;\nSELECT immat, codeequipement FROM VoitureEquipement ORDER BY immat ASC, codeequipement ASC;\nSELECT codeequipement, nomequipement, prix FROM Equipement ORDER BY codeequipement ASC;",
      expected: "Instruction exécutée avec succès (1 ligne modifiée).\n\n+-------+--------+------------+---------+------------+----+----------+-----------+\n| immat | marque | codemarque | moteur  | datecirc   | km | pxachat  | nbreplace |\n+-------+--------+------------+---------+------------+----+----------+-----------+\n| P-B   | ALPHA  | ALP        | ESSENCE |            | 1  | 10000000 | 5         |\n| P-C   | ALPHA  | ALP        | ESSENCE | 2020-01-01 | 2  | 10000000 | 5         |\n+-------+--------+------------+---------+------------+----+----------+-----------+\n(2 lignes retournées)\n\n+-------+----------------+\n| immat | codeequipement |\n+-------+----------------+\n| P-B   | GPS            |\n+-------+----------------+\n(1 ligne retournée)\n\n+----------------+---------------+------+\n| codeequipement | nomequipement | prix |\n+----------------+---------------+------+\n| GPS            | GPS           | 100  |\n+----------------+---------------+------+\n(1 ligne retournée)"
    },
    {
      label: "NULL à kilométrage non nul, aucune chaîne vide",
      stdin: PARC_SCHEMA + "\nINSERT INTO Marque (codemarque, nommarque, paysmarque) VALUES\n  ('ALP', 'ALPHA', 'FRANCE');\nINSERT INTO Voiture (immat, marque, codemarque, moteur, datecirc, km, pxachat, nbreplace) VALUES\n  ('P-A', 'ALPHA', 'ALP', 'ESSENCE', NULL, 4, 10000000, 5),\n  ('P-B', 'ALPHA', 'ALP', 'ESSENCE', '2020-01-01', 1, 10000000, 5);\nINSERT INTO Equipement (codeequipement, nomequipement, prix) VALUES\n  ('GPS', 'GPS', 100);\nINSERT INTO VoitureEquipement (immat, codeequipement) VALUES\n  ('P-A', 'GPS'),\n  ('P-B', 'GPS');\n-- VERIFY:\nSELECT * FROM Voiture ORDER BY immat ASC;\nSELECT immat, codeequipement FROM VoitureEquipement ORDER BY immat ASC, codeequipement ASC;\nSELECT codeequipement, nomequipement, prix FROM Equipement ORDER BY codeequipement ASC;",
      expected: "Instruction exécutée avec succès (1 ligne modifiée).\n\n+-------+--------+------------+---------+------------+----+----------+-----------+\n| immat | marque | codemarque | moteur  | datecirc   | km | pxachat  | nbreplace |\n+-------+--------+------------+---------+------------+----+----------+-----------+\n| P-B   | ALPHA  | ALP        | ESSENCE | 2020-01-01 | 1  | 10000000 | 5         |\n+-------+--------+------------+---------+------------+----+----------+-----------+\n(1 ligne retournée)\n\n+-------+----------------+\n| immat | codeequipement |\n+-------+----------------+\n| P-B   | GPS            |\n+-------+----------------+\n(1 ligne retournée)\n\n+----------------+---------------+------+\n| codeequipement | nomequipement | prix |\n+----------------+---------------+------+\n| GPS            | GPS           | 100  |\n+----------------+---------------+------+\n(1 ligne retournée)"
    },
  ],
  "sq-c6-e3": [
    {
      label: "Une marque japonaise et une marque étrangère représentées",
      stdin: PARC_SCHEMA + "\nINSERT INTO Marque (codemarque, nommarque, paysmarque) VALUES\n  ('TOY', 'TOYOTA', 'JAPON'),\n  ('REN', 'RENAULT', 'FRANCE');\nINSERT INTO Voiture (immat, marque, codemarque, moteur, datecirc, km, pxachat, nbreplace) VALUES\n  ('P-A', 'TOYOTA', 'TOY', 'ESSENCE', '2020-01-01', 1, 10000000, 5),\n  ('P-B', 'RENAULT', 'REN', 'ESSENCE', '2020-01-01', 1, 10000000, 5);",
      expected: "+-------+--------+\n| immat | marque |\n+-------+--------+\n| P-A   | TOYOTA |\n+-------+--------+\n(1 ligne retournée)"
    },
    {
      label: "Deux marques japonaises représentées, aucune voiture étrangère",
      stdin: PARC_SCHEMA + "\nINSERT INTO Marque (codemarque, nommarque, paysmarque) VALUES\n  ('TOY', 'TOYOTA', 'JAPON'),\n  ('MAZ', 'MAZDA', 'JAPON'),\n  ('REN', 'RENAULT', 'FRANCE');\nINSERT INTO Voiture (immat, marque, codemarque, moteur, datecirc, km, pxachat, nbreplace) VALUES\n  ('P-A', 'TOYOTA', 'TOY', 'ESSENCE', '2020-01-01', 1, 10000000, 5),\n  ('P-B', 'MAZDA', 'MAZ', 'ESSENCE', '2020-01-01', 1, 10000000, 5);",
      expected: "+-------+--------+\n| immat | marque |\n+-------+--------+\n| P-A   | TOYOTA |\n| P-B   | MAZDA  |\n+-------+--------+\n(2 lignes retournées)"
    },
  ],
};

for (const exercise of SQ_EXERCISES) {
  exercise.tests.unshift(...TEMOINS_CROISES[exercise.id]);
}

module.exports = SQ_EXERCISES;
