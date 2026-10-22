'use strict';

const SQ_EXERCISES = [
  {
    "id": "sq-c1-e1",
    "chapter": 1,
    "level": "n1",
    "language": "sql",
    "title": "Lister toutes les colonnes d’une table",
    "goal": "Écrire une requête SELECT * pour afficher l’ensemble des lignes d’une table relationnelle.",
    "brief": "<p>La table <code>etudiants(id, nom, filiere)</code> est créée dans la base. Écrivez une requête SQL qui sélectionne toutes les colonnes et toutes les lignes de la table <code>etudiants</code> triées par <code>id</code> croissant (<code>ORDER BY id ASC</code>).</p>",
    "starter": "-- Affichez toutes les colonnes de la table etudiants triées par id\nSELECT nom FROM etudiants;",
    "hints": [
      "Utilisez SELECT * FROM etudiants pour récupérer toutes les colonnes.",
      "Ajoutez ORDER BY id ASC à la fin de la requête."
    ],
    "examples": [
      {
        "stdin": "CREATE TABLE etudiants (id INT PRIMARY KEY, nom TEXT, filiere TEXT); INSERT INTO etudiants VALUES (1, 'Amina', 'Reseaux'), (2, 'Koffi', 'Developpement');\n-- exemple",
        "expected": "+----+-------+---------------+\n| id | nom   | filiere       |\n+----+-------+---------------+\n| 1  | Amina | Reseaux       |\n| 2  | Koffi | Developpement |\n+----+-------+---------------+\n(2 lignes retournées)",
        "note": "Résultat de la requête SQL sur la base d’exemple."
      }
    ],
    "tests": [
      {
        "label": "Deux étudiants",
        "stdin": "CREATE TABLE etudiants (id INT PRIMARY KEY, nom TEXT, filiere TEXT); INSERT INTO etudiants VALUES (1, 'Amina', 'Reseaux'), (2, 'Koffi', 'Developpement');",
        "expected": "+----+-------+---------------+\n| id | nom   | filiere       |\n+----+-------+---------------+\n| 1  | Amina | Reseaux       |\n| 2  | Koffi | Developpement |\n+----+-------+---------------+\n(2 lignes retournées)"
      },
      {
        "label": "Trois étudiants",
        "stdin": "CREATE TABLE etudiants (id INT PRIMARY KEY, nom TEXT, filiere TEXT); INSERT INTO etudiants VALUES (1, 'Afi', 'Cyber'), (2, 'Yao', 'Cloud'), (3, 'Sena', 'Algo');",
        "expected": "+----+------+---------+\n| id | nom  | filiere |\n+----+------+---------+\n| 1  | Afi  | Cyber   |\n| 2  | Yao  | Cloud   |\n| 3  | Sena | Algo    |\n+----+------+---------+\n(3 lignes retournées)"
      },
      {
        "label": "Ordre d’insertion inversé",
        "stdin": "CREATE TABLE etudiants (id INT PRIMARY KEY, nom TEXT, filiere TEXT); INSERT INTO etudiants VALUES (10, 'Binta', 'SQL'), (5, 'Kodjo', 'Linux');",
        "expected": "+----+-------+---------+\n| id | nom   | filiere |\n+----+-------+---------+\n| 5  | Kodjo | Linux   |\n| 10 | Binta | SQL     |\n+----+-------+---------+\n(2 lignes retournées)"
      }
    ],
    "solution": "-- Corrigé officiel sq-c1-e1\nSELECT * FROM etudiants ORDER BY id ASC;"
  },
  {
    "id": "sq-c1-e2",
    "chapter": 1,
    "level": "n2",
    "language": "sql",
    "title": "Projection de colonnes ciblées",
    "goal": "Sélectionner uniquement certaines colonnes (projection relationnelle) avec SELECT.",
    "brief": "<p>La table <code>cours(code, intitule, credits)</code> contient la liste des matières. Écrivez une requête SQL qui affiche uniquement les colonnes <code>code</code> et <code>intitule</code> (dans cet ordre), triées par <code>code</code> croissant.</p>",
    "starter": "-- Sélectionnez uniquement code et intitule de la table cours\nSELECT * FROM cours;",
    "hints": [
      "Séparez les noms des colonnes souhaitées par une virgule après SELECT.",
      "Terminez par ORDER BY code ASC;"
    ],
    "examples": [
      {
        "stdin": "CREATE TABLE cours (code TEXT PRIMARY KEY, intitule TEXT, credits INT); INSERT INTO cours VALUES ('INF101', 'Algorithmique', 6), ('INF102', 'Bases de donnees', 5);\n-- exemple",
        "expected": "+--------+------------------+\n| code   | intitule         |\n+--------+------------------+\n| INF101 | Algorithmique    |\n| INF102 | Bases de donnees |\n+--------+------------------+\n(2 lignes retournées)",
        "note": "Résultat de la requête SQL sur la base d’exemple."
      }
    ],
    "tests": [
      {
        "label": "Deux cours d’informatique",
        "stdin": "CREATE TABLE cours (code TEXT PRIMARY KEY, intitule TEXT, credits INT); INSERT INTO cours VALUES ('INF101', 'Algorithmique', 6), ('INF102', 'Bases de donnees', 5);",
        "expected": "+--------+------------------+\n| code   | intitule         |\n+--------+------------------+\n| INF101 | Algorithmique    |\n| INF102 | Bases de donnees |\n+--------+------------------+\n(2 lignes retournées)"
      },
      {
        "label": "Trois matières",
        "stdin": "CREATE TABLE cours (code TEXT PRIMARY KEY, intitule TEXT, credits INT); INSERT INTO cours VALUES ('RES201', 'Routage', 4), ('MAT101', 'Algebre', 4), ('SEC105', 'Cybersecurite', 5);",
        "expected": "+--------+---------------+\n| code   | intitule      |\n+--------+---------------+\n| MAT101 | Algebre       |\n| RES201 | Routage       |\n| SEC105 | Cybersecurite |\n+--------+---------------+\n(3 lignes retournées)"
      },
      {
        "label": "Matière unique",
        "stdin": "CREATE TABLE cours (code TEXT PRIMARY KEY, intitule TEXT, credits INT); INSERT INTO cours VALUES ('SYS101', 'Linux', 5);",
        "expected": "+--------+----------+\n| code   | intitule |\n+--------+----------+\n| SYS101 | Linux    |\n+--------+----------+\n(1 ligne retournée)"
      }
    ],
    "solution": "-- Corrigé officiel sq-c1-e2\nSELECT code, intitule FROM cours ORDER BY code ASC;"
  },
  {
    "id": "sq-c1-e3",
    "chapter": 1,
    "level": "n3",
    "language": "sql",
    "title": "Éliminer les doublons avec DISTINCT",
    "goal": "Extraire la liste sans doublons des valeurs d’une colonne avec SELECT DISTINCT.",
    "brief": "<p>La table <code>enseignants(id, nom, departement)</code> contient plusieurs professeurs par département. Écrivez une requête SQL qui renvoie la liste sans doublon des départements (colonne <code>departement</code>), triée par ordre alphabétique croissant.</p>",
    "starter": "-- Affichez les départements distincts triés par ordre alphabétique\nSELECT departement FROM enseignants;",
    "hints": [
      "Placez le mot-clé DISTINCT juste après SELECT.",
      "Ajoutez ORDER BY departement ASC pour trier les résultats."
    ],
    "examples": [
      {
        "stdin": "CREATE TABLE enseignants (id INT, nom TEXT, departement TEXT); INSERT INTO enseignants VALUES (1, 'Dr Edoh', 'Informatique'), (2, 'Mme Agbegnan', 'Informatique'), (3, 'M. Lawson', 'Mathematiques');\n-- exemple",
        "expected": "+---------------+\n| departement   |\n+---------------+\n| Informatique  |\n| Mathematiques |\n+---------------+\n(2 lignes retournées)",
        "note": "Résultat de la requête SQL sur la base d’exemple."
      }
    ],
    "tests": [
      {
        "label": "Doublons simples",
        "stdin": "CREATE TABLE enseignants (id INT, nom TEXT, departement TEXT); INSERT INTO enseignants VALUES (1, 'Dr Edoh', 'Informatique'), (2, 'Mme Agbegnan', 'Informatique'), (3, 'M. Lawson', 'Mathematiques');",
        "expected": "+---------------+\n| departement   |\n+---------------+\n| Informatique  |\n| Mathematiques |\n+---------------+\n(2 lignes retournées)"
      },
      {
        "label": "Trois départements répétés",
        "stdin": "CREATE TABLE enseignants (id INT, nom TEXT, departement TEXT); INSERT INTO enseignants VALUES (1, 'A', 'Reseaux'), (2, 'B', 'Droit'), (3, 'C', 'Reseaux'), (4, 'D', 'Gestion'), (5, 'E', 'Droit');",
        "expected": "+-------------+\n| departement |\n+-------------+\n| Droit       |\n| Gestion     |\n| Reseaux     |\n+-------------+\n(3 lignes retournées)"
      },
      {
        "label": "Tous dans le même département",
        "stdin": "CREATE TABLE enseignants (id INT, nom TEXT, departement TEXT); INSERT INTO enseignants VALUES (1, 'A', 'Cyber'), (2, 'B', 'Cyber');",
        "expected": "+-------------+\n| departement |\n+-------------+\n| Cyber       |\n+-------------+\n(1 ligne retournée)"
      }
    ],
    "solution": "-- Corrigé officiel sq-c1-e3\nSELECT DISTINCT departement FROM enseignants ORDER BY departement ASC;"
  },
  {
    "id": "sq-c2-e1",
    "chapter": 2,
    "level": "n1",
    "language": "sql",
    "title": "Créer une table avec clé primaire",
    "goal": "Écrire une instruction CREATE TABLE définissant des colonnes typées et une clé primaire.",
    "brief": "<p>Écrivez une instruction SQL <code>CREATE TABLE salles</code> comportant trois colonnes : <code>numero</code> (type <code>INT PRIMARY KEY</code>), <code>batiment</code> (type <code>TEXT NOT NULL</code>) et <code>capacite</code> (type <code>INT</code>), puis insérez les lignes fournies par le test.</p>",
    "starter": "-- Créez la table salles(numero, batiment, capacite)\nCREATE TABLE salles (\n  numero INT\n);",
    "hints": [
      "Déclarez numero INT PRIMARY KEY comme première colonne.",
      "Déclarez batiment TEXT NOT NULL et capacite INT."
    ],
    "examples": [
      {
        "stdin": "\n-- VERIFY:\nSELECT name, type, \"notnull\", dflt_value, pk FROM pragma_table_info('salles') ORDER BY cid;\n-- exemple",
        "expected": "Instruction exécutée avec succès (0 lignes modifiées).\n\n+----------+------+---------+------------+----+\n| name     | type | notnull | dflt_value | pk |\n+----------+------+---------+------------+----+\n| numero   | INT  | 0       | NULL       | 1  |\n| batiment | TEXT | 1       | NULL       | 0  |\n| capacite | INT  | 0       | NULL       | 0  |\n+----------+------+---------+------------+----+\n(3 lignes retournées)",
        "note": "Résultat de la requête SQL sur la base d’exemple."
      }
    ],
    "tests": [
      {
        "label": "Deux salles de cours",
        "stdin": "\n-- VERIFY:\nSELECT name, type, \"notnull\", dflt_value, pk FROM pragma_table_info('salles') ORDER BY cid;",
        "expected": "Instruction exécutée avec succès (0 lignes modifiées).\n\n+----------+------+---------+------------+----+\n| name     | type | notnull | dflt_value | pk |\n+----------+------+---------+------------+----+\n| numero   | INT  | 0       | NULL       | 1  |\n| batiment | TEXT | 1       | NULL       | 0  |\n| capacite | INT  | 0       | NULL       | 0  |\n+----------+------+---------+------------+----+\n(3 lignes retournées)"
      },
      {
        "label": "Amphithéâtre et labo",
        "stdin": "\n-- VERIFY:\nSELECT name, type, \"notnull\", dflt_value, pk FROM pragma_table_info('salles') ORDER BY cid;\n-- cas 2",
        "expected": "Instruction exécutée avec succès (0 lignes modifiées).\n\n+----------+------+---------+------------+----+\n| name     | type | notnull | dflt_value | pk |\n+----------+------+---------+------------+----+\n| numero   | INT  | 0       | NULL       | 1  |\n| batiment | TEXT | 1       | NULL       | 0  |\n| capacite | INT  | 0       | NULL       | 0  |\n+----------+------+---------+------------+----+\n(3 lignes retournées)"
      },
      {
        "label": "Trois salles",
        "stdin": "\n-- VERIFY:\nSELECT name, type, \"notnull\", dflt_value, pk FROM pragma_table_info('salles') ORDER BY cid;\n-- cas 3",
        "expected": "Instruction exécutée avec succès (0 lignes modifiées).\n\n+----------+------+---------+------------+----+\n| name     | type | notnull | dflt_value | pk |\n+----------+------+---------+------------+----+\n| numero   | INT  | 0       | NULL       | 1  |\n| batiment | TEXT | 1       | NULL       | 0  |\n| capacite | INT  | 0       | NULL       | 0  |\n+----------+------+---------+------------+----+\n(3 lignes retournées)"
      }
    ],
    "solution": "-- Corrigé officiel sq-c2-e1\nCREATE TABLE salles (\n  numero INT PRIMARY KEY,\n  batiment TEXT NOT NULL,\n  capacite INT\n);"
  },
  {
    "id": "sq-c2-e2",
    "chapter": 2,
    "level": "n2",
    "language": "sql",
    "title": "Valeur par défaut (DEFAULT) et contrainte NOT NULL",
    "goal": "Utiliser la clause DEFAULT lors de la création d’une table SQL.",
    "brief": "<p>Créez la table <code>comptes(id INT PRIMARY KEY, login TEXT NOT NULL, actif INT DEFAULT 1)</code> pour que toute insertion omettant la colonne <code>actif</code> reçoive automatiquement la valeur <code>1</code>.</p>",
    "starter": "-- Créez la table comptes avec actif INT DEFAULT 1\nCREATE TABLE comptes (id INT PRIMARY KEY, login TEXT NOT NULL, actif INT);",
    "hints": [
      "Utilisez la syntaxe actif INT DEFAULT 1 dans la définition de colonne.",
      "Assurez-vous que id est PRIMARY KEY et login est NOT NULL."
    ],
    "examples": [
      {
        "stdin": "\n-- VERIFY:\nSELECT name, type, \"notnull\", dflt_value, pk FROM pragma_table_info('comptes') ORDER BY cid;\n-- exemple",
        "expected": "Instruction exécutée avec succès (0 lignes modifiées).\n\n+-------+------+---------+------------+----+\n| name  | type | notnull | dflt_value | pk |\n+-------+------+---------+------------+----+\n| id    | INT  | 0       | NULL       | 1  |\n| login | TEXT | 1       | NULL       | 0  |\n| actif | INT  | 0       | 1          | 0  |\n+-------+------+---------+------------+----+\n(3 lignes retournées)",
        "note": "Résultat de la requête SQL sur la base d’exemple."
      }
    ],
    "tests": [
      {
        "label": "Insertion avec valeur par défaut",
        "stdin": "\n-- VERIFY:\nSELECT name, type, \"notnull\", dflt_value, pk FROM pragma_table_info('comptes') ORDER BY cid;",
        "expected": "Instruction exécutée avec succès (0 lignes modifiées).\n\n+-------+------+---------+------------+----+\n| name  | type | notnull | dflt_value | pk |\n+-------+------+---------+------------+----+\n| id    | INT  | 0       | NULL       | 1  |\n| login | TEXT | 1       | NULL       | 0  |\n| actif | INT  | 0       | 1          | 0  |\n+-------+------+---------+------------+----+\n(3 lignes retournées)"
      },
      {
        "label": "Deux comptes actifs par défaut",
        "stdin": "\n-- VERIFY:\nSELECT name, type, \"notnull\", dflt_value, pk FROM pragma_table_info('comptes') ORDER BY cid;\n-- cas 2",
        "expected": "Instruction exécutée avec succès (0 lignes modifiées).\n\n+-------+------+---------+------------+----+\n| name  | type | notnull | dflt_value | pk |\n+-------+------+---------+------------+----+\n| id    | INT  | 0       | NULL       | 1  |\n| login | TEXT | 1       | NULL       | 0  |\n| actif | INT  | 0       | 1          | 0  |\n+-------+------+---------+------------+----+\n(3 lignes retournées)"
      },
      {
        "label": "Mélange implicite et explicite",
        "stdin": "\n-- VERIFY:\nSELECT name, type, \"notnull\", dflt_value, pk FROM pragma_table_info('comptes') ORDER BY cid;\n-- cas 3",
        "expected": "Instruction exécutée avec succès (0 lignes modifiées).\n\n+-------+------+---------+------------+----+\n| name  | type | notnull | dflt_value | pk |\n+-------+------+---------+------------+----+\n| id    | INT  | 0       | NULL       | 1  |\n| login | TEXT | 1       | NULL       | 0  |\n| actif | INT  | 0       | 1          | 0  |\n+-------+------+---------+------------+----+\n(3 lignes retournées)"
      }
    ],
    "solution": "-- Corrigé officiel sq-c2-e2\nCREATE TABLE comptes (\n  id INT PRIMARY KEY,\n  login TEXT NOT NULL,\n  actif INT DEFAULT 1\n);"
  },
  {
    "id": "sq-c2-e3",
    "chapter": 2,
    "level": "n3",
    "language": "sql",
    "title": "Ajouter une colonne avec ALTER TABLE",
    "goal": "Faire évoluer le schéma d’une table existante avec ALTER TABLE ADD COLUMN.",
    "brief": "<p>La table <code>materiels(id INT PRIMARY KEY, designation TEXT)</code> existe déjà. Écrivez l’instruction SQL permettant de lui ajouter une colonne <code>garantie_mois INT DEFAULT 12</code>.</p>",
    "starter": "-- Ajoutez la colonne garantie_mois INT DEFAULT 12 à la table materiels\nSELECT * FROM materiels;",
    "hints": [
      "Utilisez la commande ALTER TABLE materiels ADD COLUMN ...",
      "Précisez le type INT suivi de DEFAULT 12."
    ],
    "examples": [
      {
        "stdin": "CREATE TABLE materiels (id INT PRIMARY KEY, designation TEXT);\n-- VERIFY:\nSELECT name, type, \"notnull\", dflt_value, pk FROM pragma_table_info('materiels') ORDER BY cid;\n-- exemple",
        "expected": "Instruction exécutée avec succès (0 lignes modifiées).\n\n+---------------+------+---------+------------+----+\n| name          | type | notnull | dflt_value | pk |\n+---------------+------+---------+------------+----+\n| id            | INT  | 0       | NULL       | 1  |\n| designation   | TEXT | 0       | NULL       | 0  |\n| garantie_mois | INT  | 0       | 12         | 0  |\n+---------------+------+---------+------------+----+\n(3 lignes retournées)",
        "note": "Résultat de la requête SQL sur la base d’exemple."
      }
    ],
    "tests": [
      {
        "label": "Équipements réseau existants",
        "stdin": "CREATE TABLE materiels (id INT PRIMARY KEY, designation TEXT);\n-- VERIFY:\nSELECT name, type, \"notnull\", dflt_value, pk FROM pragma_table_info('materiels') ORDER BY cid;",
        "expected": "Instruction exécutée avec succès (0 lignes modifiées).\n\n+---------------+------+---------+------------+----+\n| name          | type | notnull | dflt_value | pk |\n+---------------+------+---------+------------+----+\n| id            | INT  | 0       | NULL       | 1  |\n| designation   | TEXT | 0       | NULL       | 0  |\n| garantie_mois | INT  | 0       | 12         | 0  |\n+---------------+------+---------+------------+----+\n(3 lignes retournées)"
      },
      {
        "label": "Postes de travail",
        "stdin": "CREATE TABLE materiels (id INT PRIMARY KEY, designation TEXT);\n-- VERIFY:\nSELECT name, type, \"notnull\", dflt_value, pk FROM pragma_table_info('materiels') ORDER BY cid;\n-- cas 2",
        "expected": "Instruction exécutée avec succès (0 lignes modifiées).\n\n+---------------+------+---------+------------+----+\n| name          | type | notnull | dflt_value | pk |\n+---------------+------+---------+------------+----+\n| id            | INT  | 0       | NULL       | 1  |\n| designation   | TEXT | 0       | NULL       | 0  |\n| garantie_mois | INT  | 0       | 12         | 0  |\n+---------------+------+---------+------------+----+\n(3 lignes retournées)"
      },
      {
        "label": "Insertion après ALTER TABLE",
        "stdin": "CREATE TABLE materiels (id INT PRIMARY KEY, designation TEXT);\n-- VERIFY:\nSELECT name, type, \"notnull\", dflt_value, pk FROM pragma_table_info('materiels') ORDER BY cid;\n-- cas 3",
        "expected": "Instruction exécutée avec succès (0 lignes modifiées).\n\n+---------------+------+---------+------------+----+\n| name          | type | notnull | dflt_value | pk |\n+---------------+------+---------+------------+----+\n| id            | INT  | 0       | NULL       | 1  |\n| designation   | TEXT | 0       | NULL       | 0  |\n| garantie_mois | INT  | 0       | 12         | 0  |\n+---------------+------+---------+------------+----+\n(3 lignes retournées)"
      }
    ],
    "solution": "-- Corrigé officiel sq-c2-e3\nALTER TABLE materiels ADD COLUMN garantie_mois INT DEFAULT 12;"
  },
  {
    "id": "sq-c3-e1",
    "chapter": 3,
    "level": "n1",
    "language": "sql",
    "title": "Filtrer les lignes avec WHERE",
    "goal": "Sélectionner les enregistrements vérifiant une condition numérique avec WHERE.",
    "brief": "<p>La table <code>notes(etudiant, matiere, note)</code> contient les résultats du semestre. Écrivez une requête SQL affichant <code>etudiant</code> et <code>note</code> pour les lignes où <code>note &gt;= 12</code>, triées par <code>note</code> décroissante puis <code>etudiant</code> croissant.</p>",
    "starter": "-- Sélectionnez etudiant et note lorsque note >= 12\nSELECT etudiant, note FROM notes;",
    "hints": [
      "Ajoutez la clause WHERE note >= 12 après FROM notes.",
      "Triez avec ORDER BY note DESC, etudiant ASC."
    ],
    "examples": [
      {
        "stdin": "CREATE TABLE notes (etudiant TEXT, matiere TEXT, note INT); INSERT INTO notes VALUES ('Amina', 'SQL', 16), ('Koffi', 'SQL', 9), ('Yao', 'SQL', 14);\n-- exemple",
        "expected": "+----------+------+\n| etudiant | note |\n+----------+------+\n| Amina    | 16   |\n| Yao      | 14   |\n+----------+------+\n(2 lignes retournées)",
        "note": "Résultat de la requête SQL sur la base d’exemple."
      }
    ],
    "tests": [
      {
        "label": "Trois notes dont une sous la moyenne",
        "stdin": "CREATE TABLE notes (etudiant TEXT, matiere TEXT, note INT); INSERT INTO notes VALUES ('Amina', 'SQL', 16), ('Koffi', 'SQL', 9), ('Yao', 'SQL', 14);",
        "expected": "+----------+------+\n| etudiant | note |\n+----------+------+\n| Amina    | 16   |\n| Yao      | 14   |\n+----------+------+\n(2 lignes retournées)"
      },
      {
        "label": "Cas limite à 12 pile",
        "stdin": "CREATE TABLE notes (etudiant TEXT, matiere TEXT, note INT); INSERT INTO notes VALUES ('Sena', 'Algo', 12), ('Binta', 'Algo', 11), ('Kodjo', 'Algo', 18), ('Afi', 'Algo', 12);",
        "expected": "+----------+------+\n| etudiant | note |\n+----------+------+\n| Kodjo    | 18   |\n| Afi      | 12   |\n| Sena     | 12   |\n+----------+------+\n(3 lignes retournées)"
      },
      {
        "label": "Toutes les notes excellentes",
        "stdin": "CREATE TABLE notes (etudiant TEXT, matiere TEXT, note INT); INSERT INTO notes VALUES ('Léa', 'Web', 15), ('Marc', 'Web', 19);",
        "expected": "+----------+------+\n| etudiant | note |\n+----------+------+\n| Marc     | 19   |\n| Léa      | 15   |\n+----------+------+\n(2 lignes retournées)"
      }
    ],
    "solution": "-- Corrigé officiel sq-c3-e1\nSELECT etudiant, note FROM notes WHERE note >= 12 ORDER BY note DESC, etudiant ASC;"
  },
  {
    "id": "sq-c3-e2",
    "chapter": 3,
    "level": "n2",
    "language": "sql",
    "title": "Recherche par motif avec LIKE et intervalle BETWEEN",
    "goal": "Combiner les opérateurs BETWEEN et LIKE dans une clause WHERE.",
    "brief": "<p>Dans la table <code>produits(id, nom, prix)</code>, sélectionnez <code>nom</code> et <code>prix</code> des produits dont le <code>prix</code> est compris entre <code>1000</code> et <code>50000</code> inclus (<code>BETWEEN 1000 AND 50000</code>) et dont le <code>nom</code> commence par <code>'Cable'</code> (<code>LIKE 'Cable%'</code>), triés par <code>prix</code> croissant.</p>",
    "starter": "-- Filtrez avec BETWEEN et LIKE\nSELECT nom, prix FROM produits;",
    "hints": [
      "Utilisez WHERE prix BETWEEN 1000 AND 50000 AND nom LIKE 'Cable%'.",
      "Terminez par ORDER BY prix ASC;"
    ],
    "examples": [
      {
        "stdin": "CREATE TABLE produits (id INT, nom TEXT, prix INT); INSERT INTO produits VALUES (1, 'Cable RJ45', 2500), (2, 'Cable HDMI', 5000), (3, 'Switch Pro', 15000), (4, 'Cable Fibre Bobine', 85000);\n-- exemple",
        "expected": "+------------+------+\n| nom        | prix |\n+------------+------+\n| Cable RJ45 | 2500 |\n| Cable HDMI | 5000 |\n+------------+------+\n(2 lignes retournées)",
        "note": "Résultat de la requête SQL sur la base d’exemple."
      }
    ],
    "tests": [
      {
        "label": "Câbles dans la fourchette de prix",
        "stdin": "CREATE TABLE produits (id INT, nom TEXT, prix INT); INSERT INTO produits VALUES (1, 'Cable RJ45', 2500), (2, 'Cable HDMI', 5000), (3, 'Switch Pro', 15000), (4, 'Cable Fibre Bobine', 85000);",
        "expected": "+------------+------+\n| nom        | prix |\n+------------+------+\n| Cable RJ45 | 2500 |\n| Cable HDMI | 5000 |\n+------------+------+\n(2 lignes retournées)"
      },
      {
        "label": "Bornes exactes 1000 et 50000",
        "stdin": "CREATE TABLE produits (id INT, nom TEXT, prix INT); INSERT INTO produits VALUES (1, 'Cable USB', 1000), (2, 'Cable Blindé', 50000), (3, 'Cable Mini', 500);",
        "expected": "+--------------+-------+\n| nom          | prix  |\n+--------------+-------+\n| Cable USB    | 1000  |\n| Cable Blindé | 50000 |\n+--------------+-------+\n(2 lignes retournées)"
      },
      {
        "label": "Un seul câble éligible",
        "stdin": "CREATE TABLE produits (id INT, nom TEXT, prix INT); INSERT INTO produits VALUES (1, 'Souris', 4000), (2, 'Cable Console', 8000);",
        "expected": "+---------------+------+\n| nom           | prix |\n+---------------+------+\n| Cable Console | 8000 |\n+---------------+------+\n(1 ligne retournée)"
      }
    ],
    "solution": "-- Corrigé officiel sq-c3-e2\nSELECT nom, prix FROM produits WHERE prix BETWEEN 1000 AND 50000 AND nom LIKE 'Cable%' ORDER BY prix ASC;"
  },
  {
    "id": "sq-c3-e3",
    "chapter": 3,
    "level": "n3",
    "language": "sql",
    "title": "Valeurs absentes IS NULL et pagination LIMIT",
    "goal": "Identifier les enregistrements dont une colonne vaut NULL avec IS NULL.",
    "brief": "<p>Dans la table <code>livraisons(id_commande, client, date_livraison)</code>, les commandes non encore livrées ont <code>date_livraison</code> à <code>NULL</code>. Affichez <code>id_commande</code> et <code>client</code> des commandes non livrées, triées par <code>id_commande</code> croissant.</p>",
    "starter": "-- Sélectionnez les commandes dont date_livraison est NULL\nSELECT id_commande, client FROM livraisons;",
    "hints": [
      "En SQL, on teste l’absence de valeur avec IS NULL (et jamais avec = NULL).",
      "Ajoutez ORDER BY id_commande ASC."
    ],
    "examples": [
      {
        "stdin": "CREATE TABLE livraisons (id_commande INT, client TEXT, date_livraison TEXT); INSERT INTO livraisons VALUES (101, 'Amina', '2026-03-01'), (102, 'Koffi', NULL), (103, 'Yao', NULL);\n-- exemple",
        "expected": "+-------------+--------+\n| id_commande | client |\n+-------------+--------+\n| 102         | Koffi  |\n| 103         | Yao    |\n+-------------+--------+\n(2 lignes retournées)",
        "note": "Résultat de la requête SQL sur la base d’exemple."
      }
    ],
    "tests": [
      {
        "label": "Deux commandes en attente",
        "stdin": "CREATE TABLE livraisons (id_commande INT, client TEXT, date_livraison TEXT); INSERT INTO livraisons VALUES (101, 'Amina', '2026-03-01'), (102, 'Koffi', NULL), (103, 'Yao', NULL);",
        "expected": "+-------------+--------+\n| id_commande | client |\n+-------------+--------+\n| 102         | Koffi  |\n| 103         | Yao    |\n+-------------+--------+\n(2 lignes retournées)"
      },
      {
        "label": "Une seule commande non livrée",
        "stdin": "CREATE TABLE livraisons (id_commande INT, client TEXT, date_livraison TEXT); INSERT INTO livraisons VALUES (1, 'Societe A', '2026-01-10'), (2, 'Societe B', NULL), (3, 'Societe C', '2026-01-12');",
        "expected": "+-------------+-----------+\n| id_commande | client    |\n+-------------+-----------+\n| 2           | Societe B |\n+-------------+-----------+\n(1 ligne retournée)"
      },
      {
        "label": "Trois commandes en attente",
        "stdin": "CREATE TABLE livraisons (id_commande INT, client TEXT, date_livraison TEXT); INSERT INTO livraisons VALUES (10, 'Client X', NULL), (20, 'Client Y', NULL), (30, 'Client Z', NULL);",
        "expected": "+-------------+----------+\n| id_commande | client   |\n+-------------+----------+\n| 10          | Client X |\n| 20          | Client Y |\n| 30          | Client Z |\n+-------------+----------+\n(3 lignes retournées)"
      }
    ],
    "solution": "-- Corrigé officiel sq-c3-e3\nSELECT id_commande, client FROM livraisons WHERE date_livraison IS NULL ORDER BY id_commande ASC;"
  },
  {
    "id": "sq-c4-e1",
    "chapter": 4,
    "level": "n1",
    "language": "sql",
    "title": "Jointure interne (INNER JOIN) entre deux tables",
    "goal": "Associer chaque ligne d’une table enfant à sa table parente via INNER JOIN ... ON.",
    "brief": "<p>Soient les tables <code>departements(id, nom_dep)</code> et <code>employes(id, nom_emp, dep_id)</code>. Écrivez une requête SQL affichant <code>nom_emp</code> et <code>nom_dep</code> pour chaque employé affecté à un département, triée par <code>nom_emp</code> croissant.</p>",
    "starter": "-- Joignez employes et departements\nSELECT nom_emp FROM employes;",
    "hints": [
      "Utilisez INNER JOIN departements d ON e.dep_id = d.id.",
      "Sélectionnez e.nom_emp, d.nom_dep et triez par e.nom_emp ASC."
    ],
    "examples": [
      {
        "stdin": "CREATE TABLE departements (id INT, nom_dep TEXT); CREATE TABLE employes (id INT, nom_emp TEXT, dep_id INT); INSERT INTO departements VALUES (1, 'Informatique'), (2, 'Reseaux'); INSERT INTO employes VALUES (10, 'Amina', 1), (11, 'Koffi', 2);\n-- exemple",
        "expected": "+---------+--------------+\n| nom_emp | nom_dep      |\n+---------+--------------+\n| Amina   | Informatique |\n| Koffi   | Reseaux      |\n+---------+--------------+\n(2 lignes retournées)",
        "note": "Résultat de la requête SQL sur la base d’exemple."
      }
    ],
    "tests": [
      {
        "label": "Deux employés dans deux départements",
        "stdin": "CREATE TABLE departements (id INT, nom_dep TEXT); CREATE TABLE employes (id INT, nom_emp TEXT, dep_id INT); INSERT INTO departements VALUES (1, 'Informatique'), (2, 'Reseaux'); INSERT INTO employes VALUES (10, 'Amina', 1), (11, 'Koffi', 2);",
        "expected": "+---------+--------------+\n| nom_emp | nom_dep      |\n+---------+--------------+\n| Amina   | Informatique |\n| Koffi   | Reseaux      |\n+---------+--------------+\n(2 lignes retournées)"
      },
      {
        "label": "Trois employés avec département commun",
        "stdin": "CREATE TABLE departements (id INT, nom_dep TEXT); CREATE TABLE employes (id INT, nom_emp TEXT, dep_id INT); INSERT INTO departements VALUES (1, 'Securite'), (2, 'Cloud'); INSERT INTO employes VALUES (1, 'Yao', 2), (2, 'Afi', 1), (3, 'Sena', 1);",
        "expected": "+---------+----------+\n| nom_emp | nom_dep  |\n+---------+----------+\n| Afi     | Securite |\n| Sena    | Securite |\n| Yao     | Cloud    |\n+---------+----------+\n(3 lignes retournées)"
      },
      {
        "label": "Employé non affecté exclu par INNER JOIN",
        "stdin": "CREATE TABLE departements (id INT, nom_dep TEXT); CREATE TABLE employes (id INT, nom_emp TEXT, dep_id INT); INSERT INTO departements VALUES (10, 'Support'); INSERT INTO employes VALUES (1, 'Binta', 10), (2, 'Stagiaire', NULL);",
        "expected": "+---------+---------+\n| nom_emp | nom_dep |\n+---------+---------+\n| Binta   | Support |\n+---------+---------+\n(1 ligne retournée)"
      }
    ],
    "solution": "-- Corrigé officiel sq-c4-e1\nSELECT e.nom_emp, d.nom_dep FROM employes e INNER JOIN departements d ON e.dep_id = d.id ORDER BY e.nom_emp ASC;"
  },
  {
    "id": "sq-c4-e2",
    "chapter": 4,
    "level": "n2",
    "language": "sql",
    "title": "Jointure externe gauche (LEFT JOIN)",
    "goal": "Conserver toutes les lignes de la table de gauche même sans correspondance à droite.",
    "brief": "<p>Soient <code>clients(id, nom)</code> et <code>commandes(id, client_id, montant)</code>. Affichez <code>clients.nom</code> et <code>commandes.montant</code> pour <strong>tous</strong> les clients (même ceux n’ayant passé aucune commande, pour lesquels <code>montant</code> vaudra <code>NULL</code>), triés par <code>clients.id</code> croissant.</p>",
    "starter": "-- Conservez tous les clients avec LEFT JOIN\nSELECT nom FROM clients;",
    "hints": [
      "Utilisez LEFT JOIN commandes cmd ON c.id = cmd.client_id.",
      "Triez par c.id ASC, cmd.id ASC."
    ],
    "examples": [
      {
        "stdin": "CREATE TABLE clients (id INT, nom TEXT); CREATE TABLE commandes (id INT, client_id INT, montant INT); INSERT INTO clients VALUES (1, 'Amina'), (2, 'Koffi'); INSERT INTO commandes VALUES (100, 1, 25000);\n-- exemple",
        "expected": "+-------+---------+\n| nom   | montant |\n+-------+---------+\n| Amina | 25000   |\n| Koffi | NULL    |\n+-------+---------+\n(2 lignes retournées)",
        "note": "Résultat de la requête SQL sur la base d’exemple."
      }
    ],
    "tests": [
      {
        "label": "Un client avec commande et un client sans commande",
        "stdin": "CREATE TABLE clients (id INT, nom TEXT); CREATE TABLE commandes (id INT, client_id INT, montant INT); INSERT INTO clients VALUES (1, 'Amina'), (2, 'Koffi'); INSERT INTO commandes VALUES (100, 1, 25000);",
        "expected": "+-------+---------+\n| nom   | montant |\n+-------+---------+\n| Amina | 25000   |\n| Koffi | NULL    |\n+-------+---------+\n(2 lignes retournées)"
      },
      {
        "label": "Trois clients dont deux sans commande",
        "stdin": "CREATE TABLE clients (id INT, nom TEXT); CREATE TABLE commandes (id INT, client_id INT, montant INT); INSERT INTO clients VALUES (1, 'Alpha'), (2, 'Beta'), (3, 'Gamma'); INSERT INTO commandes VALUES (50, 2, 12000);",
        "expected": "+-------+---------+\n| nom   | montant |\n+-------+---------+\n| Alpha | NULL    |\n| Beta  | 12000   |\n| Gamma | NULL    |\n+-------+---------+\n(3 lignes retournées)"
      },
      {
        "label": "Client avec deux commandes",
        "stdin": "CREATE TABLE clients (id INT, nom TEXT); CREATE TABLE commandes (id INT, client_id INT, montant INT); INSERT INTO clients VALUES (1, 'Sena'), (2, 'Yao'); INSERT INTO commandes VALUES (1, 1, 5000), (2, 1, 8000);",
        "expected": "+------+---------+\n| nom  | montant |\n+------+---------+\n| Sena | 5000    |\n| Sena | 8000    |\n| Yao  | NULL    |\n+------+---------+\n(3 lignes retournées)"
      }
    ],
    "solution": "-- Corrigé officiel sq-c4-e2\nSELECT c.nom, cmd.montant FROM clients c LEFT JOIN commandes cmd ON c.id = cmd.client_id ORDER BY c.id ASC, cmd.id ASC;"
  },
  {
    "id": "sq-c4-e3",
    "chapter": 4,
    "level": "n3",
    "language": "sql",
    "title": "Jointure sur table d’association (N-N)",
    "goal": "Relier trois tables (étudiants, inscriptions, cours) via une double jointure.",
    "brief": "<p>Soient <code>etudiants(id, nom)</code>, <code>cours(id, titre)</code> et la table d’association <code>inscriptions(etudiant_id, cours_id)</code>. Affichez <code>etudiants.nom</code> et <code>cours.titre</code> pour chaque inscription, triés par <code>nom</code> croissant puis <code>titre</code> croissant.</p>",
    "starter": "-- Reliez etudiants, inscriptions et cours\nSELECT nom FROM etudiants;",
    "hints": [
      "Enchaînez deux INNER JOIN : etudiants -> inscriptions puis inscriptions -> cours.",
      "Triez par e.nom ASC, c.titre ASC."
    ],
    "examples": [
      {
        "stdin": "CREATE TABLE etudiants (id INT, nom TEXT); CREATE TABLE cours (id INT, titre TEXT); CREATE TABLE inscriptions (etudiant_id INT, cours_id INT); INSERT INTO etudiants VALUES (1, 'Amina'), (2, 'Koffi'); INSERT INTO cours VALUES (10, 'SQL'), (20, 'Reseaux'); INSERT INTO inscriptions VALUES (1, 10), (1, 20), (2, 10);\n-- exemple",
        "expected": "+-------+---------+\n| nom   | titre   |\n+-------+---------+\n| Amina | Reseaux |\n| Amina | SQL     |\n| Koffi | SQL     |\n+-------+---------+\n(3 lignes retournées)",
        "note": "Résultat de la requête SQL sur la base d’exemple."
      }
    ],
    "tests": [
      {
        "label": "Inscriptions multiples",
        "stdin": "CREATE TABLE etudiants (id INT, nom TEXT); CREATE TABLE cours (id INT, titre TEXT); CREATE TABLE inscriptions (etudiant_id INT, cours_id INT); INSERT INTO etudiants VALUES (1, 'Amina'), (2, 'Koffi'); INSERT INTO cours VALUES (10, 'SQL'), (20, 'Reseaux'); INSERT INTO inscriptions VALUES (1, 10), (1, 20), (2, 10);",
        "expected": "+-------+---------+\n| nom   | titre   |\n+-------+---------+\n| Amina | Reseaux |\n| Amina | SQL     |\n| Koffi | SQL     |\n+-------+---------+\n(3 lignes retournées)"
      },
      {
        "label": "Deux étudiants sur deux matières",
        "stdin": "CREATE TABLE etudiants (id INT, nom TEXT); CREATE TABLE cours (id INT, titre TEXT); CREATE TABLE inscriptions (etudiant_id INT, cours_id INT); INSERT INTO etudiants VALUES (1, 'Afi'), (2, 'Yao'); INSERT INTO cours VALUES (1, 'Algo'), (2, 'Linux'); INSERT INTO inscriptions VALUES (1, 2), (2, 1);",
        "expected": "+-----+-------+\n| nom | titre |\n+-----+-------+\n| Afi | Linux |\n| Yao | Algo  |\n+-----+-------+\n(2 lignes retournées)"
      },
      {
        "label": "Un étudiant inscrit à trois cours",
        "stdin": "CREATE TABLE etudiants (id INT, nom TEXT); CREATE TABLE cours (id INT, titre TEXT); CREATE TABLE inscriptions (etudiant_id INT, cours_id INT); INSERT INTO etudiants VALUES (1, 'Sena'); INSERT INTO cours VALUES (1, 'C'), (2, 'PHP'), (3, 'Python'); INSERT INTO inscriptions VALUES (1, 1), (1, 2), (1, 3);",
        "expected": "+------+--------+\n| nom  | titre  |\n+------+--------+\n| Sena | C      |\n| Sena | PHP    |\n| Sena | Python |\n+------+--------+\n(3 lignes retournées)"
      }
    ],
    "solution": "-- Corrigé officiel sq-c4-e3\nSELECT e.nom, c.titre FROM etudiants e INNER JOIN inscriptions i ON e.id = i.etudiant_id INNER JOIN cours c ON c.id = i.cours_id ORDER BY e.nom ASC, c.titre ASC;"
  },
  {
    "id": "sq-c5-e1",
    "chapter": 5,
    "level": "n1",
    "language": "sql",
    "title": "Compter et sommer par catégorie avec GROUP BY",
    "goal": "Utiliser COUNT(*) et SUM() associés à GROUP BY.",
    "brief": "<p>Dans la table <code>ventes(id, categorie, montant)</code>, calculez pour chaque <code>categorie</code> le nombre de ventes (alias <code>nb_ventes</code>) et la somme des montants (alias <code>total_montant</code>), triés par <code>categorie</code> croissante.</p>",
    "starter": "-- Regroupez par categorie avec COUNT(*) et SUM(montant)\nSELECT categorie FROM ventes;",
    "hints": [
      "Utilisez COUNT(*) AS nb_ventes, SUM(montant) AS total_montant.",
      "Regroupez avec GROUP BY categorie et triez par categorie ASC."
    ],
    "examples": [
      {
        "stdin": "CREATE TABLE ventes (id INT, categorie TEXT, montant INT); INSERT INTO ventes VALUES (1, 'Clavier', 5000), (2, 'Clavier', 7000), (3, 'Souris', 3000);\n-- exemple",
        "expected": "+-----------+-----------+---------------+\n| categorie | nb_ventes | total_montant |\n+-----------+-----------+---------------+\n| Clavier   | 2         | 12000         |\n| Souris    | 1         | 3000          |\n+-----------+-----------+---------------+\n(2 lignes retournées)",
        "note": "Résultat de la requête SQL sur la base d’exemple."
      }
    ],
    "tests": [
      {
        "label": "Deux catégories de périphériques",
        "stdin": "CREATE TABLE ventes (id INT, categorie TEXT, montant INT); INSERT INTO ventes VALUES (1, 'Clavier', 5000), (2, 'Clavier', 7000), (3, 'Souris', 3000);",
        "expected": "+-----------+-----------+---------------+\n| categorie | nb_ventes | total_montant |\n+-----------+-----------+---------------+\n| Clavier   | 2         | 12000         |\n| Souris    | 1         | 3000          |\n+-----------+-----------+---------------+\n(2 lignes retournées)"
      },
      {
        "label": "Trois familles de produits",
        "stdin": "CREATE TABLE ventes (id INT, categorie TEXT, montant INT); INSERT INTO ventes VALUES (1, 'Cable', 2000), (2, 'Ecran', 45000), (3, 'Cable', 3000), (4, 'Routeur', 25000), (5, 'Ecran', 50000);",
        "expected": "+-----------+-----------+---------------+\n| categorie | nb_ventes | total_montant |\n+-----------+-----------+---------------+\n| Cable     | 2         | 5000          |\n| Ecran     | 2         | 95000         |\n| Routeur   | 1         | 25000         |\n+-----------+-----------+---------------+\n(3 lignes retournées)"
      },
      {
        "label": "Catégorie unique",
        "stdin": "CREATE TABLE ventes (id INT, categorie TEXT, montant INT); INSERT INTO ventes VALUES (1, 'Serveur', 500000), (2, 'Serveur', 700000);",
        "expected": "+-----------+-----------+---------------+\n| categorie | nb_ventes | total_montant |\n+-----------+-----------+---------------+\n| Serveur   | 2         | 1200000       |\n+-----------+-----------+---------------+\n(1 ligne retournée)"
      }
    ],
    "solution": "-- Corrigé officiel sq-c5-e1\nSELECT categorie, COUNT(*) AS nb_ventes, SUM(montant) AS total_montant FROM ventes GROUP BY categorie ORDER BY categorie ASC;"
  },
  {
    "id": "sq-c5-e2",
    "chapter": 5,
    "level": "n2",
    "language": "sql",
    "title": "Filtrer les groupes après agrégation avec HAVING",
    "goal": "Sélectionner uniquement les groupes dont l’agrégat dépasse un seuil via HAVING.",
    "brief": "<p>Dans la table <code>commandes(id, client, montant)</code>, affichez le <code>client</code> et le total de ses commandes (<code>SUM(montant) AS total</code>) uniquement pour les clients dont le total est supérieur ou égal à <code>20000</code>, triés par <code>total</code> décroissant.</p>",
    "starter": "-- Filtrez les groupes ayant SUM(montant) >= 20000 avec HAVING\nSELECT client, SUM(montant) AS total FROM commandes GROUP BY client;",
    "hints": [
      "WHERE filtre les lignes avant GROUP BY, tandis que HAVING filtre les groupes après GROUP BY.",
      "Écrivez HAVING SUM(montant) >= 20000 ORDER BY total DESC;"
    ],
    "examples": [
      {
        "stdin": "CREATE TABLE commandes (id INT, client TEXT, montant INT); INSERT INTO commandes VALUES (1, 'Amina', 15000), (2, 'Amina', 10000), (3, 'Koffi', 8000);\n-- exemple",
        "expected": "+--------+-------+\n| client | total |\n+--------+-------+\n| Amina  | 25000 |\n+--------+-------+\n(1 ligne retournée)",
        "note": "Résultat de la requête SQL sur la base d’exemple."
      }
    ],
    "tests": [
      {
        "label": "Deux clients dont un seul dépasse 20000",
        "stdin": "CREATE TABLE commandes (id INT, client TEXT, montant INT); INSERT INTO commandes VALUES (1, 'Amina', 15000), (2, 'Amina', 10000), (3, 'Koffi', 8000);",
        "expected": "+--------+-------+\n| client | total |\n+--------+-------+\n| Amina  | 25000 |\n+--------+-------+\n(1 ligne retournée)"
      },
      {
        "label": "Cas limite à 20000",
        "stdin": "CREATE TABLE commandes (id INT, client TEXT, montant INT); INSERT INTO commandes VALUES (1, 'Yao', 12000), (2, 'Yao', 8000), (3, 'Sena', 35000), (4, 'Afi', 19000);",
        "expected": "+--------+-------+\n| client | total |\n+--------+-------+\n| Sena   | 35000 |\n| Yao    | 20000 |\n+--------+-------+\n(2 lignes retournées)"
      },
      {
        "label": "Plusieurs gros clients",
        "stdin": "CREATE TABLE commandes (id INT, client TEXT, montant INT); INSERT INTO commandes VALUES (1, 'Entreprise A', 50000), (2, 'Entreprise B', 25000), (3, 'Particulier', 5000);",
        "expected": "+--------------+-------+\n| client       | total |\n+--------------+-------+\n| Entreprise A | 50000 |\n| Entreprise B | 25000 |\n+--------------+-------+\n(2 lignes retournées)"
      }
    ],
    "solution": "-- Corrigé officiel sq-c5-e2\nSELECT client, SUM(montant) AS total FROM commandes GROUP BY client HAVING SUM(montant) >= 20000 ORDER BY total DESC;"
  },
  {
    "id": "sq-c5-e3",
    "chapter": 5,
    "level": "n3",
    "language": "sql",
    "title": "Statistiques complètes par matière (MIN, MAX, COUNT)",
    "goal": "Combiner plusieurs fonctions d’agrégation sur chaque groupe.",
    "brief": "<p>Dans la table <code>evaluations(matiere, note)</code>, affichez pour chaque <code>matiere</code> : <code>matiere</code>, le nombre de copies (<code>COUNT(*) AS effectif</code>), la note minimale (<code>MIN(note) AS note_min</code>) et la note maximale (<code>MAX(note) AS note_max</code>), triés par <code>matiere</code> croissante.</p>",
    "starter": "-- Calculez effectif, note_min et note_max par matiere\nSELECT matiere FROM evaluations GROUP BY matiere;",
    "hints": [
      "Appelez COUNT(*), MIN(note) et MAX(note) dans la clause SELECT.",
      "Regroupez avec GROUP BY matiere ORDER BY matiere ASC;"
    ],
    "examples": [
      {
        "stdin": "CREATE TABLE evaluations (matiere TEXT, note INT); INSERT INTO evaluations VALUES ('Algo', 12), ('Algo', 18), ('SQL', 14), ('SQL', 10), ('SQL', 16);\n-- exemple",
        "expected": "+---------+----------+----------+----------+\n| matiere | effectif | note_min | note_max |\n+---------+----------+----------+----------+\n| Algo    | 2        | 12       | 18       |\n| SQL     | 3        | 10       | 16       |\n+---------+----------+----------+----------+\n(2 lignes retournées)",
        "note": "Résultat de la requête SQL sur la base d’exemple."
      }
    ],
    "tests": [
      {
        "label": "Deux matières évaluées",
        "stdin": "CREATE TABLE evaluations (matiere TEXT, note INT); INSERT INTO evaluations VALUES ('Algo', 12), ('Algo', 18), ('SQL', 14), ('SQL', 10), ('SQL', 16);",
        "expected": "+---------+----------+----------+----------+\n| matiere | effectif | note_min | note_max |\n+---------+----------+----------+----------+\n| Algo    | 2        | 12       | 18       |\n| SQL     | 3        | 10       | 16       |\n+---------+----------+----------+----------+\n(2 lignes retournées)"
      },
      {
        "label": "Trois matières",
        "stdin": "CREATE TABLE evaluations (matiere TEXT, note INT); INSERT INTO evaluations VALUES ('Linux', 15), ('Linux', 11), ('Reseaux', 9), ('Reseaux', 17), ('Web', 14);",
        "expected": "+---------+----------+----------+----------+\n| matiere | effectif | note_min | note_max |\n+---------+----------+----------+----------+\n| Linux   | 2        | 11       | 15       |\n| Reseaux | 2        | 9        | 17       |\n| Web     | 1        | 14       | 14       |\n+---------+----------+----------+----------+\n(3 lignes retournées)"
      },
      {
        "label": "Notes identiques",
        "stdin": "CREATE TABLE evaluations (matiere TEXT, note INT); INSERT INTO evaluations VALUES ('Anglais', 13), ('Anglais', 13);",
        "expected": "+---------+----------+----------+----------+\n| matiere | effectif | note_min | note_max |\n+---------+----------+----------+----------+\n| Anglais | 2        | 13       | 13       |\n+---------+----------+----------+----------+\n(1 ligne retournée)"
      }
    ],
    "solution": "-- Corrigé officiel sq-c5-e3\nSELECT matiere, COUNT(*) AS effectif, MIN(note) AS note_min, MAX(note) AS note_max FROM evaluations GROUP BY matiere ORDER BY matiere ASC;"
  },
  {
    "id": "sq-c6-e1",
    "chapter": 6,
    "level": "n1",
    "language": "sql",
    "title": "Mettre à jour des lignes ciblées avec UPDATE ... WHERE",
    "goal": "Modifier la valeur d’une colonne sur un sous-ensemble de lignes avec UPDATE.",
    "brief": "<p>Dans la table <code>stocks(id, article, quantite)</code>, augmentez de <code>10</code> la <code>quantite</code> (<code>quantite = quantite + 10</code>) uniquement pour les articles dont la quantité actuelle est strictement inférieure à <code>5</code> (<code>WHERE quantite &lt; 5</code>).</p>",
    "starter": "-- Réapprovisionnez de +10 les articles ayant quantite < 5\nUPDATE stocks SET quantite = quantite;",
    "hints": [
      "Utilisez UPDATE stocks SET quantite = quantite + 10.",
      "Filtrez impérativement avec WHERE quantite < 5 pour ne pas modifier tout le stock."
    ],
    "examples": [
      {
        "stdin": "CREATE TABLE stocks (id INT, article TEXT, quantite INT); INSERT INTO stocks VALUES (1, 'Clavier', 2), (2, 'Souris', 12), (3, 'Ecran', 4);\n-- VERIFY:\nSELECT id, article, quantite FROM stocks ORDER BY id;\n-- exemple",
        "expected": "Instruction exécutée avec succès (2 lignes modifiées).\n\n+----+---------+----------+\n| id | article | quantite |\n+----+---------+----------+\n| 1  | Clavier | 12       |\n| 2  | Souris  | 12       |\n| 3  | Ecran   | 14       |\n+----+---------+----------+\n(3 lignes retournées)",
        "note": "Résultat de la requête SQL sur la base d’exemple."
      }
    ],
    "tests": [
      {
        "label": "Deux articles en alerte de stock",
        "stdin": "CREATE TABLE stocks (id INT, article TEXT, quantite INT); INSERT INTO stocks VALUES (1, 'Clavier', 2), (2, 'Souris', 12), (3, 'Ecran', 4);\n-- VERIFY:\nSELECT id, article, quantite FROM stocks ORDER BY id;",
        "expected": "Instruction exécutée avec succès (2 lignes modifiées).\n\n+----+---------+----------+\n| id | article | quantite |\n+----+---------+----------+\n| 1  | Clavier | 12       |\n| 2  | Souris  | 12       |\n| 3  | Ecran   | 14       |\n+----+---------+----------+\n(3 lignes retournées)"
      },
      {
        "label": "Stock à zéro (rupture)",
        "stdin": "CREATE TABLE stocks (id INT, article TEXT, quantite INT); INSERT INTO stocks VALUES (1, 'Routeur', 0), (2, 'Switch', 5), (3, 'Cable', 20);\n-- VERIFY:\nSELECT id, article, quantite FROM stocks ORDER BY id;",
        "expected": "Instruction exécutée avec succès (1 ligne modifiée).\n\n+----+---------+----------+\n| id | article | quantite |\n+----+---------+----------+\n| 1  | Routeur | 10       |\n| 2  | Switch  | 5        |\n| 3  | Cable   | 20       |\n+----+---------+----------+\n(3 lignes retournées)"
      },
      {
        "label": "Tous les articles sous le seuil",
        "stdin": "CREATE TABLE stocks (id INT, article TEXT, quantite INT); INSERT INTO stocks VALUES (1, 'SSD', 1), (2, 'RAM', 3);\n-- VERIFY:\nSELECT id, article, quantite FROM stocks ORDER BY id;",
        "expected": "Instruction exécutée avec succès (2 lignes modifiées).\n\n+----+---------+----------+\n| id | article | quantite |\n+----+---------+----------+\n| 1  | SSD     | 11       |\n| 2  | RAM     | 13       |\n+----+---------+----------+\n(2 lignes retournées)"
      }
    ],
    "solution": "-- Corrigé officiel sq-c6-e1\nUPDATE stocks SET quantite = quantite + 10 WHERE quantite < 5;"
  },
  {
    "id": "sq-c6-e2",
    "chapter": 6,
    "level": "n2",
    "language": "sql",
    "title": "Supprimer les enregistrements obsolètes avec DELETE ... WHERE",
    "goal": "Supprimer uniquement les lignes répondant à un critère précis avec DELETE FROM.",
    "brief": "<p>Dans la table <code>sessions(id, utilisateur, expiree)</code>, supprimez toutes les sessions expirées pour lesquelles <code>expiree = 1</code>.</p>",
    "starter": "-- Supprimez uniquement les sessions où expiree = 1\nSELECT * FROM sessions;",
    "hints": [
      "Utilisez DELETE FROM sessions WHERE expiree = 1;",
      "Vérifiez la présence de la clause WHERE pour conserver les sessions actives (expiree = 0)."
    ],
    "examples": [
      {
        "stdin": "CREATE TABLE sessions (id INT, utilisateur TEXT, expiree INT); INSERT INTO sessions VALUES (1, 'amina', 0), (2, 'koffi', 1), (3, 'yao', 1);\n-- VERIFY:\nSELECT id, utilisateur, expiree FROM sessions ORDER BY id;\n-- exemple",
        "expected": "Instruction exécutée avec succès (2 lignes modifiées).\n\n+----+-------------+---------+\n| id | utilisateur | expiree |\n+----+-------------+---------+\n| 1  | amina       | 0       |\n+----+-------------+---------+\n(1 ligne retournée)",
        "note": "Résultat de la requête SQL sur la base d’exemple."
      }
    ],
    "tests": [
      {
        "label": "Deux sessions expirées sur trois",
        "stdin": "CREATE TABLE sessions (id INT, utilisateur TEXT, expiree INT); INSERT INTO sessions VALUES (1, 'amina', 0), (2, 'koffi', 1), (3, 'yao', 1);\n-- VERIFY:\nSELECT id, utilisateur, expiree FROM sessions ORDER BY id;",
        "expected": "Instruction exécutée avec succès (2 lignes modifiées).\n\n+----+-------------+---------+\n| id | utilisateur | expiree |\n+----+-------------+---------+\n| 1  | amina       | 0       |\n+----+-------------+---------+\n(1 ligne retournée)"
      },
      {
        "label": "Une seule session expirée",
        "stdin": "CREATE TABLE sessions (id INT, utilisateur TEXT, expiree INT); INSERT INTO sessions VALUES (10, 'admin', 0), (20, 'guest', 1), (30, 'dev', 0);\n-- VERIFY:\nSELECT id, utilisateur, expiree FROM sessions ORDER BY id;",
        "expected": "Instruction exécutée avec succès (1 ligne modifiée).\n\n+----+-------------+---------+\n| id | utilisateur | expiree |\n+----+-------------+---------+\n| 10 | admin       | 0       |\n| 30 | dev         | 0       |\n+----+-------------+---------+\n(2 lignes retournées)"
      },
      {
        "label": "Aucune session expirée",
        "stdin": "CREATE TABLE sessions (id INT, utilisateur TEXT, expiree INT); INSERT INTO sessions VALUES (1, 'alice', 0), (2, 'bob', 0);\n-- VERIFY:\nSELECT id, utilisateur, expiree FROM sessions ORDER BY id;",
        "expected": "Instruction exécutée avec succès (0 lignes modifiées).\n\n+----+-------------+---------+\n| id | utilisateur | expiree |\n+----+-------------+---------+\n| 1  | alice       | 0       |\n| 2  | bob         | 0       |\n+----+-------------+---------+\n(2 lignes retournées)"
      }
    ],
    "solution": "-- Corrigé officiel sq-c6-e2\nDELETE FROM sessions WHERE expiree = 1;"
  },
  {
    "id": "sq-c6-e3",
    "chapter": 6,
    "level": "n3",
    "language": "sql",
    "title": "Sous-requête dans WHERE (supprimer ou filtrer selon une autre table)",
    "goal": "Utiliser une sous-requête (IN / SELECT) pour filtrer selon les données d’une seconde table.",
    "brief": "<p>Soient <code>utilisateurs(id, login, role)</code> et <code>journal_connexions(id_log, user_id, action)</code>. Affichez <code>id_log</code> et <code>action</code> du journal uniquement pour les utilisateurs dont le <code>role</code> est <code>'admin'</code> dans la table <code>utilisateurs</code>, triés par <code>id_log</code> croissant.</p>",
    "starter": "-- Sélectionnez id_log et action des utilisateurs ayant role = 'admin'\nSELECT id_log, action FROM journal_connexions;",
    "hints": [
      "Utilisez WHERE user_id IN (SELECT id FROM utilisateurs WHERE role = 'admin') ou un INNER JOIN.",
      "Triez par id_log ASC."
    ],
    "examples": [
      {
        "stdin": "CREATE TABLE utilisateurs (id INT, login TEXT, role TEXT); CREATE TABLE journal_connexions (id_log INT, user_id INT, action TEXT); INSERT INTO utilisateurs VALUES (1, 'root', 'admin'), (2, 'invite', 'lecteur'); INSERT INTO journal_connexions VALUES (100, 1, 'GRANT SELECT'), (101, 2, 'SELECT'), (102, 1, 'BACKUP');\n-- exemple",
        "expected": "+--------+--------------+\n| id_log | action       |\n+--------+--------------+\n| 100    | GRANT SELECT |\n| 102    | BACKUP       |\n+--------+--------------+\n(2 lignes retournées)",
        "note": "Résultat de la requête SQL sur la base d’exemple."
      }
    ],
    "tests": [
      {
        "label": "Actions d’un administrateur et d’un lecteur",
        "stdin": "CREATE TABLE utilisateurs (id INT, login TEXT, role TEXT); CREATE TABLE journal_connexions (id_log INT, user_id INT, action TEXT); INSERT INTO utilisateurs VALUES (1, 'root', 'admin'), (2, 'invite', 'lecteur'); INSERT INTO journal_connexions VALUES (100, 1, 'GRANT SELECT'), (101, 2, 'SELECT'), (102, 1, 'BACKUP');",
        "expected": "+--------+--------------+\n| id_log | action       |\n+--------+--------------+\n| 100    | GRANT SELECT |\n| 102    | BACKUP       |\n+--------+--------------+\n(2 lignes retournées)"
      },
      {
        "label": "Deux administrateurs distincts",
        "stdin": "CREATE TABLE utilisateurs (id INT, login TEXT, role TEXT); CREATE TABLE journal_connexions (id_log INT, user_id INT, action TEXT); INSERT INTO utilisateurs VALUES (1, 'amina', 'admin'), (2, 'koffi', 'editeur'), (3, 'yao', 'admin'); INSERT INTO journal_connexions VALUES (1, 1, 'CREATE USER'), (2, 2, 'UPDATE'), (3, 3, 'REVOKE');",
        "expected": "+--------+-------------+\n| id_log | action      |\n+--------+-------------+\n| 1      | CREATE USER |\n| 3      | REVOKE      |\n+--------+-------------+\n(2 lignes retournées)"
      },
      {
        "label": "Un seul événement admin",
        "stdin": "CREATE TABLE utilisateurs (id INT, login TEXT, role TEXT); CREATE TABLE journal_connexions (id_log INT, user_id INT, action TEXT); INSERT INTO utilisateurs VALUES (10, 'secops', 'admin'); INSERT INTO journal_connexions VALUES (50, 10, 'AUDIT_OK');",
        "expected": "+--------+----------+\n| id_log | action   |\n+--------+----------+\n| 50     | AUDIT_OK |\n+--------+----------+\n(1 ligne retournée)"
      }
    ],
    "solution": "-- Corrigé officiel sq-c6-e3\nSELECT id_log, action FROM journal_connexions WHERE user_id IN (SELECT id FROM utilisateurs WHERE role = 'admin') ORDER BY id_log ASC;"
  }
];

module.exports = SQ_EXERCISES;
