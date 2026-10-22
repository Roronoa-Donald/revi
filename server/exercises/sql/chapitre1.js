'use strict';

module.exports = [
  {
    "id": "sql2-c1-e1",
    "chapter": 1,
    "level": "n1",
    "language": "sql",
    "title": "Création de table avec contraintes PRIMARY KEY, UNIQUE et CHECK",
    "goal": "Définir une table relationnelle avec contraintes d’unicité et de domaine.",
    "brief": "<p>Créez la table <code>collaborateurs(id INT PRIMARY KEY, email TEXT UNIQUE NOT NULL, salaire INT CHECK (salaire &gt;= 100000))</code>.</p>",
    "starter": "-- Créez la table collaborateurs avec ses contraintes\nSELECT 'A_COMPLETER';",
    "hints": [
      "Ajoutez UNIQUE NOT NULL sur la colonne email.",
      "Ajoutez CHECK (salaire >= 100000) sur la colonne salaire."
    ],
    "examples": [
      {
        "stdin": "\n-- VERIFY:\nSELECT name, type, \"notnull\", dflt_value, pk FROM pragma_table_info('collaborateurs') ORDER BY cid;",
        "expected": "Instruction exécutée avec succès (0 lignes modifiées).\n\n+---------+------+---------+------------+----+\n| name    | type | notnull | dflt_value | pk |\n+---------+------+---------+------------+----+\n| id      | INT  | 0       | NULL       | 1  |\n| email   | TEXT | 1       | NULL       | 0  |\n| salaire | INT  | 0       | NULL       | 0  |\n+---------+------+---------+------------+----+\n(3 lignes retournées)",
        "note": "Résultat de la requête SQL sur la base d’exemple."
      }
    ],
    "tests": [
      {
        "label": "Deux collaborateurs valides",
        "stdin": "\n-- VERIFY:\nSELECT name, type, \"notnull\", dflt_value, pk FROM pragma_table_info('collaborateurs') ORDER BY cid;",
        "expected": "Instruction exécutée avec succès (0 lignes modifiées).\n\n+---------+------+---------+------------+----+\n| name    | type | notnull | dflt_value | pk |\n+---------+------+---------+------------+----+\n| id      | INT  | 0       | NULL       | 1  |\n| email   | TEXT | 1       | NULL       | 0  |\n| salaire | INT  | 0       | NULL       | 0  |\n+---------+------+---------+------------+----+\n(3 lignes retournées)"
      },
      {
        "label": "Salaire au seuil minimal",
        "stdin": "\n-- VERIFY:\nSELECT name, type, \"notnull\", dflt_value, pk FROM pragma_table_info('collaborateurs') ORDER BY cid;",
        "expected": "Instruction exécutée avec succès (0 lignes modifiées).\n\n+---------+------+---------+------------+----+\n| name    | type | notnull | dflt_value | pk |\n+---------+------+---------+------------+----+\n| id      | INT  | 0       | NULL       | 1  |\n| email   | TEXT | 1       | NULL       | 0  |\n| salaire | INT  | 0       | NULL       | 0  |\n+---------+------+---------+------------+----+\n(3 lignes retournées)"
      },
      {
        "label": "Trois collaborateurs",
        "stdin": "\n-- VERIFY:\nSELECT name, type, \"notnull\", dflt_value, pk FROM pragma_table_info('collaborateurs') ORDER BY cid;",
        "expected": "Instruction exécutée avec succès (0 lignes modifiées).\n\n+---------+------+---------+------------+----+\n| name    | type | notnull | dflt_value | pk |\n+---------+------+---------+------------+----+\n| id      | INT  | 0       | NULL       | 1  |\n| email   | TEXT | 1       | NULL       | 0  |\n| salaire | INT  | 0       | NULL       | 0  |\n+---------+------+---------+------------+----+\n(3 lignes retournées)"
      }
    ],
    "solution": "CREATE TABLE collaborateurs (\n  id INT PRIMARY KEY,\n  email TEXT UNIQUE NOT NULL,\n  salaire INT CHECK (salaire >= 100000)\n);"
  },
  {
    "id": "sql2-c1-e2",
    "chapter": 1,
    "level": "n2",
    "language": "sql",
    "title": "Clé étrangère et intégrité référentielle (FOREIGN KEY)",
    "goal": "Déclarer une clé étrangère reliant une table enfant à une table parente.",
    "brief": "<p>La table <code>services(id INT PRIMARY KEY, libelle TEXT)</code> existe déjà. Créez la table <code>projets(code TEXT PRIMARY KEY, titre TEXT NOT NULL, service_id INT REFERENCES services(id))</code>.</p>",
    "starter": "-- Créez la table projets référençant services(id)\nSELECT 'A_COMPLETER';",
    "hints": [
      "Utilisez service_id INT REFERENCES services(id) ou FOREIGN KEY (service_id) REFERENCES services(id).",
      "Déclarez code TEXT PRIMARY KEY."
    ],
    "examples": [
      {
        "stdin": "CREATE TABLE services (id INT PRIMARY KEY, libelle TEXT);\n-- VERIFY:\nSELECT name, type, \"notnull\", dflt_value, pk FROM pragma_table_info('projets') ORDER BY cid;",
        "expected": "Instruction exécutée avec succès (0 lignes modifiées).\n\n+------------+------+---------+------------+----+\n| name       | type | notnull | dflt_value | pk |\n+------------+------+---------+------------+----+\n| code       | TEXT | 0       | NULL       | 1  |\n| titre      | TEXT | 1       | NULL       | 0  |\n| service_id | INT  | 0       | NULL       | 0  |\n+------------+------+---------+------------+----+\n(3 lignes retournées)",
        "note": "Résultat de la requête SQL sur la base d’exemple."
      }
    ],
    "tests": [
      {
        "label": "Deux projets rattachés aux services",
        "stdin": "CREATE TABLE services (id INT PRIMARY KEY, libelle TEXT);\n-- VERIFY:\nSELECT name, type, \"notnull\", dflt_value, pk FROM pragma_table_info('projets') ORDER BY cid;",
        "expected": "Instruction exécutée avec succès (0 lignes modifiées).\n\n+------------+------+---------+------------+----+\n| name       | type | notnull | dflt_value | pk |\n+------------+------+---------+------------+----+\n| code       | TEXT | 0       | NULL       | 1  |\n| titre      | TEXT | 1       | NULL       | 0  |\n| service_id | INT  | 0       | NULL       | 0  |\n+------------+------+---------+------------+----+\n(3 lignes retournées)"
      },
      {
        "label": "Trois projets",
        "stdin": "CREATE TABLE services (id INT PRIMARY KEY, libelle TEXT);\n-- VERIFY:\nSELECT name, type, \"notnull\", dflt_value, pk FROM pragma_table_info('projets') ORDER BY cid;",
        "expected": "Instruction exécutée avec succès (0 lignes modifiées).\n\n+------------+------+---------+------------+----+\n| name       | type | notnull | dflt_value | pk |\n+------------+------+---------+------------+----+\n| code       | TEXT | 0       | NULL       | 1  |\n| titre      | TEXT | 1       | NULL       | 0  |\n| service_id | INT  | 0       | NULL       | 0  |\n+------------+------+---------+------------+----+\n(3 lignes retournées)"
      },
      {
        "label": "Projet unique",
        "stdin": "CREATE TABLE services (id INT PRIMARY KEY, libelle TEXT);\n-- VERIFY:\nSELECT name, type, \"notnull\", dflt_value, pk FROM pragma_table_info('projets') ORDER BY cid;",
        "expected": "Instruction exécutée avec succès (0 lignes modifiées).\n\n+------------+------+---------+------------+----+\n| name       | type | notnull | dflt_value | pk |\n+------------+------+---------+------------+----+\n| code       | TEXT | 0       | NULL       | 1  |\n| titre      | TEXT | 1       | NULL       | 0  |\n| service_id | INT  | 0       | NULL       | 0  |\n+------------+------+---------+------------+----+\n(3 lignes retournées)"
      }
    ],
    "solution": "CREATE TABLE projets (\n  code TEXT PRIMARY KEY,\n  titre TEXT NOT NULL,\n  service_id INT REFERENCES services(id)\n);"
  },
  {
    "id": "sql2-c1-e3",
    "chapter": 1,
    "level": "n3",
    "language": "sql",
    "title": "Clé primaire composite sur une table associative",
    "goal": "Définir une contrainte PRIMARY KEY (col1, col2) composée de deux colonnes.",
    "brief": "<p>Créez la table <code>affectations(employe_id INT, projet_id INT, heures INT NOT NULL, PRIMARY KEY (employe_id, projet_id))</code>.</p>",
    "starter": "-- Créez la table affectations avec clé primaire composite\nSELECT 'A_COMPLETER';",
    "hints": [
      "Ajoutez PRIMARY KEY (employe_id, projet_id) en fin de déclaration de table.",
      "N’oubliez pas la colonne heures INT NOT NULL."
    ],
    "examples": [
      {
        "stdin": "\n-- VERIFY:\nSELECT name, type, \"notnull\", dflt_value, pk FROM pragma_table_info('affectations') ORDER BY cid;",
        "expected": "Instruction exécutée avec succès (0 lignes modifiées).\n\n+------------+------+---------+------------+----+\n| name       | type | notnull | dflt_value | pk |\n+------------+------+---------+------------+----+\n| employe_id | INT  | 0       | NULL       | 1  |\n| projet_id  | INT  | 0       | NULL       | 2  |\n| heures     | INT  | 1       | NULL       | 0  |\n+------------+------+---------+------------+----+\n(3 lignes retournées)",
        "note": "Résultat de la requête SQL sur la base d’exemple."
      }
    ],
    "tests": [
      {
        "label": "Trois affectations croisées",
        "stdin": "\n-- VERIFY:\nSELECT name, type, \"notnull\", dflt_value, pk FROM pragma_table_info('affectations') ORDER BY cid;",
        "expected": "Instruction exécutée avec succès (0 lignes modifiées).\n\n+------------+------+---------+------------+----+\n| name       | type | notnull | dflt_value | pk |\n+------------+------+---------+------------+----+\n| employe_id | INT  | 0       | NULL       | 1  |\n| projet_id  | INT  | 0       | NULL       | 2  |\n| heures     | INT  | 1       | NULL       | 0  |\n+------------+------+---------+------------+----+\n(3 lignes retournées)"
      },
      {
        "label": "Deux employés sur un même projet",
        "stdin": "\n-- VERIFY:\nSELECT name, type, \"notnull\", dflt_value, pk FROM pragma_table_info('affectations') ORDER BY cid;",
        "expected": "Instruction exécutée avec succès (0 lignes modifiées).\n\n+------------+------+---------+------------+----+\n| name       | type | notnull | dflt_value | pk |\n+------------+------+---------+------------+----+\n| employe_id | INT  | 0       | NULL       | 1  |\n| projet_id  | INT  | 0       | NULL       | 2  |\n| heures     | INT  | 1       | NULL       | 0  |\n+------------+------+---------+------------+----+\n(3 lignes retournées)"
      },
      {
        "label": "Affectation unique",
        "stdin": "\n-- VERIFY:\nSELECT name, type, \"notnull\", dflt_value, pk FROM pragma_table_info('affectations') ORDER BY cid;",
        "expected": "Instruction exécutée avec succès (0 lignes modifiées).\n\n+------------+------+---------+------------+----+\n| name       | type | notnull | dflt_value | pk |\n+------------+------+---------+------------+----+\n| employe_id | INT  | 0       | NULL       | 1  |\n| projet_id  | INT  | 0       | NULL       | 2  |\n| heures     | INT  | 1       | NULL       | 0  |\n+------------+------+---------+------------+----+\n(3 lignes retournées)"
      }
    ],
    "solution": "CREATE TABLE affectations (\n  employe_id INT,\n  projet_id INT,\n  heures INT NOT NULL,\n  PRIMARY KEY (employe_id, projet_id)\n);"
  }
];
