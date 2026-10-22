'use strict';

const SQL2_EXERCISES = [
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
        "stdin": "\n-- VERIFY:\nSELECT name, type, \"notnull\", dflt_value, pk FROM pragma_table_info('collaborateurs') ORDER BY cid;\n-- exemple",
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
        "stdin": "\n-- VERIFY:\nSELECT name, type, \"notnull\", dflt_value, pk FROM pragma_table_info('collaborateurs') ORDER BY cid;\n-- cas 2",
        "expected": "Instruction exécutée avec succès (0 lignes modifiées).\n\n+---------+------+---------+------------+----+\n| name    | type | notnull | dflt_value | pk |\n+---------+------+---------+------------+----+\n| id      | INT  | 0       | NULL       | 1  |\n| email   | TEXT | 1       | NULL       | 0  |\n| salaire | INT  | 0       | NULL       | 0  |\n+---------+------+---------+------------+----+\n(3 lignes retournées)"
      },
      {
        "label": "Trois collaborateurs",
        "stdin": "\n-- VERIFY:\nSELECT name, type, \"notnull\", dflt_value, pk FROM pragma_table_info('collaborateurs') ORDER BY cid;\n-- cas 3",
        "expected": "Instruction exécutée avec succès (0 lignes modifiées).\n\n+---------+------+---------+------------+----+\n| name    | type | notnull | dflt_value | pk |\n+---------+------+---------+------------+----+\n| id      | INT  | 0       | NULL       | 1  |\n| email   | TEXT | 1       | NULL       | 0  |\n| salaire | INT  | 0       | NULL       | 0  |\n+---------+------+---------+------------+----+\n(3 lignes retournées)"
      }
    ],
    "solution": "-- Corrigé officiel sql2-c1-e1\nCREATE TABLE collaborateurs (\n  id INT PRIMARY KEY,\n  email TEXT UNIQUE NOT NULL,\n  salaire INT CHECK (salaire >= 100000)\n);"
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
        "stdin": "CREATE TABLE services (id INT PRIMARY KEY, libelle TEXT);\n-- VERIFY:\nSELECT name, type, \"notnull\", dflt_value, pk FROM pragma_table_info('projets') ORDER BY cid;\n-- exemple",
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
        "stdin": "CREATE TABLE services (id INT PRIMARY KEY, libelle TEXT);\n-- VERIFY:\nSELECT name, type, \"notnull\", dflt_value, pk FROM pragma_table_info('projets') ORDER BY cid;\n-- cas 2",
        "expected": "Instruction exécutée avec succès (0 lignes modifiées).\n\n+------------+------+---------+------------+----+\n| name       | type | notnull | dflt_value | pk |\n+------------+------+---------+------------+----+\n| code       | TEXT | 0       | NULL       | 1  |\n| titre      | TEXT | 1       | NULL       | 0  |\n| service_id | INT  | 0       | NULL       | 0  |\n+------------+------+---------+------------+----+\n(3 lignes retournées)"
      },
      {
        "label": "Projet unique",
        "stdin": "CREATE TABLE services (id INT PRIMARY KEY, libelle TEXT);\n-- VERIFY:\nSELECT name, type, \"notnull\", dflt_value, pk FROM pragma_table_info('projets') ORDER BY cid;\n-- cas 3",
        "expected": "Instruction exécutée avec succès (0 lignes modifiées).\n\n+------------+------+---------+------------+----+\n| name       | type | notnull | dflt_value | pk |\n+------------+------+---------+------------+----+\n| code       | TEXT | 0       | NULL       | 1  |\n| titre      | TEXT | 1       | NULL       | 0  |\n| service_id | INT  | 0       | NULL       | 0  |\n+------------+------+---------+------------+----+\n(3 lignes retournées)"
      }
    ],
    "solution": "-- Corrigé officiel sql2-c1-e2\nCREATE TABLE projets (\n  code TEXT PRIMARY KEY,\n  titre TEXT NOT NULL,\n  service_id INT REFERENCES services(id)\n);"
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
        "stdin": "\n-- VERIFY:\nSELECT name, type, \"notnull\", dflt_value, pk FROM pragma_table_info('affectations') ORDER BY cid;\n-- exemple",
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
        "stdin": "\n-- VERIFY:\nSELECT name, type, \"notnull\", dflt_value, pk FROM pragma_table_info('affectations') ORDER BY cid;\n-- cas 2",
        "expected": "Instruction exécutée avec succès (0 lignes modifiées).\n\n+------------+------+---------+------------+----+\n| name       | type | notnull | dflt_value | pk |\n+------------+------+---------+------------+----+\n| employe_id | INT  | 0       | NULL       | 1  |\n| projet_id  | INT  | 0       | NULL       | 2  |\n| heures     | INT  | 1       | NULL       | 0  |\n+------------+------+---------+------------+----+\n(3 lignes retournées)"
      },
      {
        "label": "Affectation unique",
        "stdin": "\n-- VERIFY:\nSELECT name, type, \"notnull\", dflt_value, pk FROM pragma_table_info('affectations') ORDER BY cid;\n-- cas 3",
        "expected": "Instruction exécutée avec succès (0 lignes modifiées).\n\n+------------+------+---------+------------+----+\n| name       | type | notnull | dflt_value | pk |\n+------------+------+---------+------------+----+\n| employe_id | INT  | 0       | NULL       | 1  |\n| projet_id  | INT  | 0       | NULL       | 2  |\n| heures     | INT  | 1       | NULL       | 0  |\n+------------+------+---------+------------+----+\n(3 lignes retournées)"
      }
    ],
    "solution": "-- Corrigé officiel sql2-c1-e3\nCREATE TABLE affectations (\n  employe_id INT,\n  projet_id INT,\n  heures INT NOT NULL,\n  PRIMARY KEY (employe_id, projet_id)\n);"
  },
  {
    "id": "sql2-c2-e1",
    "chapter": 2,
    "level": "n1",
    "language": "sql",
    "title": "Normalisation de texte avec UPPER et LENGTH",
    "goal": "Utiliser les fonctions scalaires de chaînes UPPER() et LENGTH().",
    "brief": "<p>Dans la table <code>clients(id, nom, ville)</code>, affichez <code>id</code>, le nom en majuscules (<code>UPPER(nom) AS nom_maj</code>) et la longueur du nom (<code>LENGTH(nom) AS nb_caracteres</code>), triés par <code>id</code> croissant.</p>",
    "starter": "-- Utilisez UPPER(nom) et LENGTH(nom)\nSELECT id, nom FROM clients;",
    "hints": [
      "Utilisez UPPER(nom) AS nom_maj pour mettre en majuscules.",
      "Utilisez LENGTH(nom) AS nb_caracteres pour compter les caractères."
    ],
    "examples": [
      {
        "stdin": "CREATE TABLE clients (id INT, nom TEXT, ville TEXT); INSERT INTO clients VALUES (1, 'Amina', 'Lome'), (2, 'Koffi', 'Kara');\n-- exemple",
        "expected": "+----+---------+---------------+\n| id | nom_maj | nb_caracteres |\n+----+---------+---------------+\n| 1  | AMINA   | 5             |\n| 2  | KOFFI   | 5             |\n+----+---------+---------------+\n(2 lignes retournées)",
        "note": "Résultat de la requête SQL sur la base d’exemple."
      }
    ],
    "tests": [
      {
        "label": "Deux clients",
        "stdin": "CREATE TABLE clients (id INT, nom TEXT, ville TEXT); INSERT INTO clients VALUES (1, 'Amina', 'Lome'), (2, 'Koffi', 'Kara');",
        "expected": "+----+---------+---------------+\n| id | nom_maj | nb_caracteres |\n+----+---------+---------------+\n| 1  | AMINA   | 5             |\n| 2  | KOFFI   | 5             |\n+----+---------+---------------+\n(2 lignes retournées)"
      },
      {
        "label": "Noms de longueurs variées",
        "stdin": "CREATE TABLE clients (id INT, nom TEXT, ville TEXT); INSERT INTO clients VALUES (1, 'Yao', 'Sokode'), (2, 'Abalo', 'Kpalime'), (3, 'Tchazino', 'Atakpame');",
        "expected": "+----+----------+---------------+\n| id | nom_maj  | nb_caracteres |\n+----+----------+---------------+\n| 1  | YAO      | 3             |\n| 2  | ABALO    | 5             |\n| 3  | TCHAZINO | 8             |\n+----+----------+---------------+\n(3 lignes retournées)"
      },
      {
        "label": "Client unique",
        "stdin": "CREATE TABLE clients (id INT, nom TEXT, ville TEXT); INSERT INTO clients VALUES (10, 'Sena', 'Aneho');",
        "expected": "+----+---------+---------------+\n| id | nom_maj | nb_caracteres |\n+----+---------+---------------+\n| 10 | SENA    | 4             |\n+----+---------+---------------+\n(1 ligne retournée)"
      }
    ],
    "solution": "-- Corrigé officiel sql2-c2-e1\nSELECT id, UPPER(nom) AS nom_maj, LENGTH(nom) AS nb_caracteres FROM clients ORDER BY id ASC;"
  },
  {
    "id": "sql2-c2-e2",
    "chapter": 2,
    "level": "n2",
    "language": "sql",
    "title": "Gestion des valeurs nulles avec COALESCE",
    "goal": "Remplacer les valeurs NULL par une valeur de repli grâce à COALESCE.",
    "brief": "<p>Dans la table <code>factures(id, montant_ht, remise)</code>, la colonne <code>remise</code> peut être <code>NULL</code> lorsqu’aucune remise n’est accordée. Affichez <code>id</code> et le montant net <code>montant_ht - COALESCE(remise, 0) AS montant_net</code>, triés par <code>id</code> croissant.</p>",
    "starter": "-- Calculez montant_net en remplaçant remise NULL par 0 avec COALESCE\nSELECT id, montant_ht FROM factures;",
    "hints": [
      "En SQL, 10000 - NULL vaut NULL ! Utilisez COALESCE(remise, 0) pour obtenir 0 lorsque remise est NULL.",
      "Nommez la colonne calculée AS montant_net."
    ],
    "examples": [
      {
        "stdin": "CREATE TABLE factures (id INT, montant_ht INT, remise INT); INSERT INTO factures VALUES (1, 50000, 5000), (2, 30000, NULL);\n-- exemple",
        "expected": "+----+-------------+\n| id | montant_net |\n+----+-------------+\n| 1  | 45000       |\n| 2  | 30000       |\n+----+-------------+\n(2 lignes retournées)",
        "note": "Résultat de la requête SQL sur la base d’exemple."
      }
    ],
    "tests": [
      {
        "label": "Une facture avec remise et une sans remise (NULL)",
        "stdin": "CREATE TABLE factures (id INT, montant_ht INT, remise INT); INSERT INTO factures VALUES (1, 50000, 5000), (2, 30000, NULL);",
        "expected": "+----+-------------+\n| id | montant_net |\n+----+-------------+\n| 1  | 45000       |\n| 2  | 30000       |\n+----+-------------+\n(2 lignes retournées)"
      },
      {
        "label": "Trois factures dont deux à NULL",
        "stdin": "CREATE TABLE factures (id INT, montant_ht INT, remise INT); INSERT INTO factures VALUES (10, 10000, NULL), (20, 25000, 2500), (30, 15000, NULL);",
        "expected": "+----+-------------+\n| id | montant_net |\n+----+-------------+\n| 10 | 10000       |\n| 20 | 22500       |\n| 30 | 15000       |\n+----+-------------+\n(3 lignes retournées)"
      },
      {
        "label": "Remise nulle et remise absente",
        "stdin": "CREATE TABLE factures (id INT, montant_ht INT, remise INT); INSERT INTO factures VALUES (1, 40000, 0), (2, 40000, NULL);",
        "expected": "+----+-------------+\n| id | montant_net |\n+----+-------------+\n| 1  | 40000       |\n| 2  | 40000       |\n+----+-------------+\n(2 lignes retournées)"
      }
    ],
    "solution": "-- Corrigé officiel sql2-c2-e2\nSELECT id, montant_ht - COALESCE(remise, 0) AS montant_net FROM factures ORDER BY id ASC;"
  },
  {
    "id": "sql2-c2-e3",
    "chapter": 2,
    "level": "n3",
    "language": "sql",
    "title": "Calcul financier arrondi avec ROUND",
    "goal": "Calculer une colonne dérivée et l’arrondir à 2 décimales avec ROUND(x, 2).",
    "brief": "<p>Dans la table <code>articles(id, libelle, prix_ht)</code>, calculez le prix TTC avec une TVA de 18 % arrondi à 2 décimales : <code>ROUND(prix_ht * 1.18, 2) AS prix_ttc</code>. Affichez <code>libelle</code> et <code>prix_ttc</code> triés par <code>id</code> croissant.</p>",
    "starter": "-- Calculez libelle et ROUND(prix_ht * 1.18, 2) AS prix_ttc\nSELECT libelle, prix_ht FROM articles;",
    "hints": [
      "Utilisez la fonction ROUND(prix_ht * 1.18, 2) AS prix_ttc.",
      "Triez par id ASC."
    ],
    "examples": [
      {
        "stdin": "CREATE TABLE articles (id INT, libelle TEXT, prix_ht REAL); INSERT INTO articles VALUES (1, 'Clavier', 10000), (2, 'Adaptateur', 3333.33);\n-- exemple",
        "expected": "+------------+----------+\n| libelle    | prix_ttc |\n+------------+----------+\n| Clavier    | 11800    |\n| Adaptateur | 3933.33  |\n+------------+----------+\n(2 lignes retournées)",
        "note": "Résultat de la requête SQL sur la base d’exemple."
      }
    ],
    "tests": [
      {
        "label": "Prix entier et prix décimal",
        "stdin": "CREATE TABLE articles (id INT, libelle TEXT, prix_ht REAL); INSERT INTO articles VALUES (1, 'Clavier', 10000), (2, 'Adaptateur', 3333.33);",
        "expected": "+------------+----------+\n| libelle    | prix_ttc |\n+------------+----------+\n| Clavier    | 11800    |\n| Adaptateur | 3933.33  |\n+------------+----------+\n(2 lignes retournées)"
      },
      {
        "label": "Trois articles",
        "stdin": "CREATE TABLE articles (id INT, libelle TEXT, prix_ht REAL); INSERT INTO articles VALUES (1, 'Cable', 1250.5), (2, 'Switch', 24999.9), (3, 'Souris', 5000);",
        "expected": "+---------+----------+\n| libelle | prix_ttc |\n+---------+----------+\n| Cable   | 1475.59  |\n| Switch  | 29499.88 |\n| Souris  | 5900     |\n+---------+----------+\n(3 lignes retournées)"
      },
      {
        "label": "Article unique",
        "stdin": "CREATE TABLE articles (id INT, libelle TEXT, prix_ht REAL); INSERT INTO articles VALUES (1, 'Licence', 199.99);",
        "expected": "+---------+----------+\n| libelle | prix_ttc |\n+---------+----------+\n| Licence | 235.99   |\n+---------+----------+\n(1 ligne retournée)"
      }
    ],
    "solution": "-- Corrigé officiel sql2-c2-e3\nSELECT libelle, ROUND(prix_ht * 1.18, 2) AS prix_ttc FROM articles ORDER BY id ASC;"
  },
  {
    "id": "sql2-c3-e1",
    "chapter": 3,
    "level": "n1",
    "language": "sql",
    "title": "Classification conditionnelle avec CASE WHEN ... THEN ... ELSE ... END",
    "goal": "Catégoriser les lignes d’une requête avec l’expression conditionnelle CASE.",
    "brief": "<p>Dans la table <code>serveurs(nom, cpu_pct)</code>, affichez <code>nom</code>, <code>cpu_pct</code> et une colonne <code>etat</code> valant <code>'CRITIQUE'</code> si <code>cpu_pct &gt;= 85</code>, <code>'ATTENTION'</code> si <code>cpu_pct &gt;= 60</code>, et <code>'NORMAL'</code> sinon, triés par <code>nom</code> croissant.</p>",
    "starter": "-- Utilisez CASE WHEN pour calculer la colonne etat\nSELECT nom, cpu_pct FROM serveurs;",
    "hints": [
      "Écrivez CASE WHEN cpu_pct >= 85 THEN 'CRITIQUE' WHEN cpu_pct >= 60 THEN 'ATTENTION' ELSE 'NORMAL' END AS etat.",
      "Triez par nom ASC."
    ],
    "examples": [
      {
        "stdin": "CREATE TABLE serveurs (nom TEXT, cpu_pct INT); INSERT INTO serveurs VALUES ('srv-db', 92), ('srv-web', 65), ('srv-dns', 20);\n-- exemple",
        "expected": "+---------+---------+-----------+\n| nom     | cpu_pct | etat      |\n+---------+---------+-----------+\n| srv-db  | 92      | CRITIQUE  |\n| srv-dns | 20      | NORMAL    |\n| srv-web | 65      | ATTENTION |\n+---------+---------+-----------+\n(3 lignes retournées)",
        "note": "Résultat de la requête SQL sur la base d’exemple."
      }
    ],
    "tests": [
      {
        "label": "Trois niveaux de charge CPU",
        "stdin": "CREATE TABLE serveurs (nom TEXT, cpu_pct INT); INSERT INTO serveurs VALUES ('srv-db', 92), ('srv-web', 65), ('srv-dns', 20);",
        "expected": "+---------+---------+-----------+\n| nom     | cpu_pct | etat      |\n+---------+---------+-----------+\n| srv-db  | 92      | CRITIQUE  |\n| srv-dns | 20      | NORMAL    |\n| srv-web | 65      | ATTENTION |\n+---------+---------+-----------+\n(3 lignes retournées)"
      },
      {
        "label": "Valeurs seuils exactes 60 et 85",
        "stdin": "CREATE TABLE serveurs (nom TEXT, cpu_pct INT); INSERT INTO serveurs VALUES ('node-1', 85), ('node-2', 60), ('node-3', 59);",
        "expected": "+--------+---------+-----------+\n| nom    | cpu_pct | etat      |\n+--------+---------+-----------+\n| node-1 | 85      | CRITIQUE  |\n| node-2 | 60      | ATTENTION |\n| node-3 | 59      | NORMAL    |\n+--------+---------+-----------+\n(3 lignes retournées)"
      },
      {
        "label": "Parc nominal",
        "stdin": "CREATE TABLE serveurs (nom TEXT, cpu_pct INT); INSERT INTO serveurs VALUES ('app-1', 15), ('app-2', 42);",
        "expected": "+-------+---------+--------+\n| nom   | cpu_pct | etat   |\n+-------+---------+--------+\n| app-1 | 15      | NORMAL |\n| app-2 | 42      | NORMAL |\n+-------+---------+--------+\n(2 lignes retournées)"
      }
    ],
    "solution": "-- Corrigé officiel sql2-c3-e1\nSELECT nom, cpu_pct, CASE WHEN cpu_pct >= 85 THEN 'CRITIQUE' WHEN cpu_pct >= 60 THEN 'ATTENTION' ELSE 'NORMAL' END AS etat FROM serveurs ORDER BY nom ASC;"
  },
  {
    "id": "sql2-c3-e2",
    "chapter": 3,
    "level": "n2",
    "language": "sql",
    "title": "Sous-requête scalaire : filtrer au-dessus de la moyenne globale",
    "goal": "Comparer chaque ligne à une valeur agrégée calculée par une sous-requête.",
    "brief": "<p>Dans la table <code>employes(nom, salaire)</code>, affichez <code>nom</code> et <code>salaire</code> des employés dont le salaire est strictement supérieur à la moyenne de tous les salaires (<code>WHERE salaire &gt; (SELECT AVG(salaire) FROM employes)</code>), triés par <code>salaire</code> décroissant.</p>",
    "starter": "-- Sélectionnez les employés gagnant plus que la moyenne\nSELECT nom, salaire FROM employes;",
    "hints": [
      "Utilisez la sous-requête (SELECT AVG(salaire) FROM employes) à droite de l’opérateur >.",
      "Triez avec ORDER BY salaire DESC."
    ],
    "examples": [
      {
        "stdin": "CREATE TABLE employes (nom TEXT, salaire INT); INSERT INTO employes VALUES ('Amina', 400000), ('Koffi', 200000), ('Yao', 250000), ('Sena', 350000);\n-- exemple",
        "expected": "+-------+---------+\n| nom   | salaire |\n+-------+---------+\n| Amina | 400000  |\n| Sena  | 350000  |\n+-------+---------+\n(2 lignes retournées)",
        "note": "Résultat de la requête SQL sur la base d’exemple."
      }
    ],
    "tests": [
      {
        "label": "Quatre salaires (moyenne 300000)",
        "stdin": "CREATE TABLE employes (nom TEXT, salaire INT); INSERT INTO employes VALUES ('Amina', 400000), ('Koffi', 200000), ('Yao', 250000), ('Sena', 350000);",
        "expected": "+-------+---------+\n| nom   | salaire |\n+-------+---------+\n| Amina | 400000  |\n| Sena  | 350000  |\n+-------+---------+\n(2 lignes retournées)"
      },
      {
        "label": "Un haut salaire au-dessus du groupe",
        "stdin": "CREATE TABLE employes (nom TEXT, salaire INT); INSERT INTO employes VALUES ('Directrice', 600000), ('Tech1', 200000), ('Tech2', 200000);",
        "expected": "+------------+---------+\n| nom        | salaire |\n+------------+---------+\n| Directrice | 600000  |\n+------------+---------+\n(1 ligne retournée)"
      },
      {
        "label": "Trois salaires échelonnés",
        "stdin": "CREATE TABLE employes (nom TEXT, salaire INT); INSERT INTO employes VALUES ('A', 150000), ('B', 300000), ('C', 450000);",
        "expected": "+-----+---------+\n| nom | salaire |\n+-----+---------+\n| C   | 450000  |\n+-----+---------+\n(1 ligne retournée)"
      }
    ],
    "solution": "-- Corrigé officiel sql2-c3-e2\nSELECT nom, salaire FROM employes WHERE salaire > (SELECT AVG(salaire) FROM employes) ORDER BY salaire DESC;"
  },
  {
    "id": "sql2-c3-e3",
    "chapter": 3,
    "level": "n3",
    "language": "sql",
    "title": "Détecter l’absence de correspondance avec NOT EXISTS",
    "goal": "Identifier les enregistrements parents sans aucun enfant via NOT EXISTS.",
    "brief": "<p>Soient <code>clients(id, nom)</code> et <code>commandes(id, client_id)</code>. Affichez <code>id</code> et <code>nom</code> des clients qui n’ont passé <strong>aucune</strong> commande, en utilisant <code>WHERE NOT EXISTS (...)</code>, triés par <code>id</code> croissant.</p>",
    "starter": "-- Trouvez les clients sans commande avec NOT EXISTS\nSELECT id, nom FROM clients;",
    "hints": [
      "Écrivez WHERE NOT EXISTS (SELECT 1 FROM commandes cmd WHERE cmd.client_id = c.id).",
      "Triez par c.id ASC."
    ],
    "examples": [
      {
        "stdin": "CREATE TABLE clients (id INT, nom TEXT); CREATE TABLE commandes (id INT, client_id INT); INSERT INTO clients VALUES (1, 'Amina'), (2, 'Koffi'), (3, 'Yao'); INSERT INTO commandes VALUES (10, 1);\n-- exemple",
        "expected": "+----+-------+\n| id | nom   |\n+----+-------+\n| 2  | Koffi |\n| 3  | Yao   |\n+----+-------+\n(2 lignes retournées)",
        "note": "Résultat de la requête SQL sur la base d’exemple."
      }
    ],
    "tests": [
      {
        "label": "Deux clients inactifs sur trois",
        "stdin": "CREATE TABLE clients (id INT, nom TEXT); CREATE TABLE commandes (id INT, client_id INT); INSERT INTO clients VALUES (1, 'Amina'), (2, 'Koffi'), (3, 'Yao'); INSERT INTO commandes VALUES (10, 1);",
        "expected": "+----+-------+\n| id | nom   |\n+----+-------+\n| 2  | Koffi |\n| 3  | Yao   |\n+----+-------+\n(2 lignes retournées)"
      },
      {
        "label": "Un seul client sans commande",
        "stdin": "CREATE TABLE clients (id INT, nom TEXT); CREATE TABLE commandes (id INT, client_id INT); INSERT INTO clients VALUES (10, 'Alpha'), (20, 'Beta'); INSERT INTO commandes VALUES (1, 10), (2, 10);",
        "expected": "+----+------+\n| id | nom  |\n+----+------+\n| 20 | Beta |\n+----+------+\n(1 ligne retournée)"
      },
      {
        "label": "Aucun client n’a commandé",
        "stdin": "CREATE TABLE clients (id INT, nom TEXT); CREATE TABLE commandes (id INT, client_id INT); INSERT INTO clients VALUES (1, 'Sena'), (2, 'Afi');",
        "expected": "+----+------+\n| id | nom  |\n+----+------+\n| 1  | Sena |\n| 2  | Afi  |\n+----+------+\n(2 lignes retournées)"
      }
    ],
    "solution": "-- Corrigé officiel sql2-c3-e3\nSELECT c.id, c.nom FROM clients c WHERE NOT EXISTS (SELECT 1 FROM commandes cmd WHERE cmd.client_id = c.id) ORDER BY c.id ASC;"
  },
  {
    "id": "sql2-c4-e1",
    "chapter": 4,
    "level": "n1",
    "language": "sql",
    "title": "Classement par partition avec RANK() OVER",
    "goal": "Calculer le rang de chaque ligne au sein de son groupe avec une fonction de fenêtrage.",
    "brief": "<p>Dans la table <code>employes(nom, departement, salaire)</code>, affichez <code>nom</code>, <code>departement</code>, <code>salaire</code> et le rang du salaire au sein de chaque département (<code>RANK() OVER (PARTITION BY departement ORDER BY salaire DESC) AS rang</code>), triés par <code>departement</code> croissant puis <code>rang</code> croissant.</p>",
    "starter": "-- Calculez le rang par département avec RANK() OVER (...)\nSELECT nom, departement, salaire FROM employes;",
    "hints": [
      "Utilisez RANK() OVER (PARTITION BY departement ORDER BY salaire DESC) AS rang.",
      "Triez par departement ASC, rang ASC, nom ASC."
    ],
    "examples": [
      {
        "stdin": "CREATE TABLE employes (nom TEXT, departement TEXT, salaire INT); INSERT INTO employes VALUES ('Amina', 'IT', 400000), ('Koffi', 'IT', 300000), ('Yao', 'RH', 350000);\n-- exemple",
        "expected": "+-------+-------------+---------+------+\n| nom   | departement | salaire | rang |\n+-------+-------------+---------+------+\n| Amina | IT          | 400000  | 1    |\n| Koffi | IT          | 300000  | 2    |\n| Yao   | RH          | 350000  | 1    |\n+-------+-------------+---------+------+\n(3 lignes retournées)",
        "note": "Résultat de la requête SQL sur la base d’exemple."
      }
    ],
    "tests": [
      {
        "label": "Deux départements IT et RH",
        "stdin": "CREATE TABLE employes (nom TEXT, departement TEXT, salaire INT); INSERT INTO employes VALUES ('Amina', 'IT', 400000), ('Koffi', 'IT', 300000), ('Yao', 'RH', 350000);",
        "expected": "+-------+-------------+---------+------+\n| nom   | departement | salaire | rang |\n+-------+-------------+---------+------+\n| Amina | IT          | 400000  | 1    |\n| Koffi | IT          | 300000  | 2    |\n| Yao   | RH          | 350000  | 1    |\n+-------+-------------+---------+------+\n(3 lignes retournées)"
      },
      {
        "label": "Ex-aequo dans un département",
        "stdin": "CREATE TABLE employes (nom TEXT, departement TEXT, salaire INT); INSERT INTO employes VALUES ('Afi', 'Cloud', 500000), ('Sena', 'Cloud', 500000), ('Binta', 'Cloud', 350000);",
        "expected": "+-------+-------------+---------+------+\n| nom   | departement | salaire | rang |\n+-------+-------------+---------+------+\n| Afi   | Cloud       | 500000  | 1    |\n| Sena  | Cloud       | 500000  | 1    |\n| Binta | Cloud       | 350000  | 3    |\n+-------+-------------+---------+------+\n(3 lignes retournées)"
      },
      {
        "label": "Trois départements",
        "stdin": "CREATE TABLE employes (nom TEXT, departement TEXT, salaire INT); INSERT INTO employes VALUES ('E1', 'A', 100), ('E2', 'A', 200), ('E3', 'B', 150);",
        "expected": "+-----+-------------+---------+------+\n| nom | departement | salaire | rang |\n+-----+-------------+---------+------+\n| E2  | A           | 200     | 1    |\n| E1  | A           | 100     | 2    |\n| E3  | B           | 150     | 1    |\n+-----+-------------+---------+------+\n(3 lignes retournées)"
      }
    ],
    "solution": "-- Corrigé officiel sql2-c4-e1\nSELECT nom, departement, salaire, RANK() OVER (PARTITION BY departement ORDER BY salaire DESC) AS rang FROM employes ORDER BY departement ASC, rang ASC, nom ASC;"
  },
  {
    "id": "sql2-c4-e2",
    "chapter": 4,
    "level": "n2",
    "language": "sql",
    "title": "Cumul glissant avec SUM() OVER (ORDER BY ...)",
    "goal": "Calculer un total cumulé progressif à l’aide d’une fenêtre ordonnée.",
    "brief": "<p>Dans la table <code>recettes(jour, montant)</code>, affichez <code>jour</code>, <code>montant</code> et le cumul progressif des recettes jusqu’à ce jour (<code>SUM(montant) OVER (ORDER BY jour ASC) AS cumul</code>), triés par <code>jour</code> croissant.</p>",
    "starter": "-- Calculez le cumul progressif avec SUM(montant) OVER (ORDER BY jour ASC)\nSELECT jour, montant FROM recettes;",
    "hints": [
      "SUM(montant) OVER (ORDER BY jour ASC) additionne toutes les lignes du début jusqu’à la ligne courante.",
      "Nommez la colonne AS cumul."
    ],
    "examples": [
      {
        "stdin": "CREATE TABLE recettes (jour INT, montant INT); INSERT INTO recettes VALUES (1, 10000), (2, 15000), (3, 5000);\n-- exemple",
        "expected": "+------+---------+-------+\n| jour | montant | cumul |\n+------+---------+-------+\n| 1    | 10000   | 10000 |\n| 2    | 15000   | 25000 |\n| 3    | 5000    | 30000 |\n+------+---------+-------+\n(3 lignes retournées)",
        "note": "Résultat de la requête SQL sur la base d’exemple."
      }
    ],
    "tests": [
      {
        "label": "Trois jours de recettes",
        "stdin": "CREATE TABLE recettes (jour INT, montant INT); INSERT INTO recettes VALUES (1, 10000), (2, 15000), (3, 5000);",
        "expected": "+------+---------+-------+\n| jour | montant | cumul |\n+------+---------+-------+\n| 1    | 10000   | 10000 |\n| 2    | 15000   | 25000 |\n| 3    | 5000    | 30000 |\n+------+---------+-------+\n(3 lignes retournées)"
      },
      {
        "label": "Quatre jours",
        "stdin": "CREATE TABLE recettes (jour INT, montant INT); INSERT INTO recettes VALUES (1, 500), (2, 1000), (3, 1500), (4, 2000);",
        "expected": "+------+---------+-------+\n| jour | montant | cumul |\n+------+---------+-------+\n| 1    | 500     | 500   |\n| 2    | 1000    | 1500  |\n| 3    | 1500    | 3000  |\n| 4    | 2000    | 5000  |\n+------+---------+-------+\n(4 lignes retournées)"
      },
      {
        "label": "Deux jours",
        "stdin": "CREATE TABLE recettes (jour INT, montant INT); INSERT INTO recettes VALUES (10, 25000), (20, 75000);",
        "expected": "+------+---------+--------+\n| jour | montant | cumul  |\n+------+---------+--------+\n| 10   | 25000   | 25000  |\n| 20   | 75000   | 100000 |\n+------+---------+--------+\n(2 lignes retournées)"
      }
    ],
    "solution": "-- Corrigé officiel sql2-c4-e2\nSELECT jour, montant, SUM(montant) OVER (ORDER BY jour ASC) AS cumul FROM recettes ORDER BY jour ASC;"
  },
  {
    "id": "sql2-c4-e3",
    "chapter": 4,
    "level": "n3",
    "language": "sql",
    "title": "Expression de table commune (CTE WITH ... AS)",
    "goal": "Structurer une requête analytique avec une CTE (clause WITH).",
    "brief": "<p>À partir de la table <code>ventes(vendeur, montant)</code>, utilisez une CTE <code>totaux AS (SELECT vendeur, SUM(montant) AS ca_total FROM ventes GROUP BY vendeur)</code> pour afficher <code>vendeur</code> et <code>ca_total</code> des vendeurs ayant <code>ca_total &gt;= 50000</code>, triés par <code>ca_total</code> décroissant.</p>",
    "starter": "-- Utilisez WITH totaux AS (...) SELECT ...\nSELECT vendeur, montant FROM ventes;",
    "hints": [
      "Définissez WITH totaux AS (SELECT vendeur, SUM(montant) AS ca_total FROM ventes GROUP BY vendeur).",
      "Interrogez ensuite totaux avec WHERE ca_total >= 50000 ORDER BY ca_total DESC."
    ],
    "examples": [
      {
        "stdin": "CREATE TABLE ventes (vendeur TEXT, montant INT); INSERT INTO ventes VALUES ('Amina', 30000), ('Amina', 25000), ('Koffi', 40000);\n-- exemple",
        "expected": "+---------+----------+\n| vendeur | ca_total |\n+---------+----------+\n| Amina   | 55000    |\n+---------+----------+\n(1 ligne retournée)",
        "note": "Résultat de la requête SQL sur la base d’exemple."
      }
    ],
    "tests": [
      {
        "label": "Deux vendeurs dont un éligible",
        "stdin": "CREATE TABLE ventes (vendeur TEXT, montant INT); INSERT INTO ventes VALUES ('Amina', 30000), ('Amina', 25000), ('Koffi', 40000);",
        "expected": "+---------+----------+\n| vendeur | ca_total |\n+---------+----------+\n| Amina   | 55000    |\n+---------+----------+\n(1 ligne retournée)"
      },
      {
        "label": "Trois vendeurs",
        "stdin": "CREATE TABLE ventes (vendeur TEXT, montant INT); INSERT INTO ventes VALUES ('Yao', 50000), ('Sena', 40000), ('Sena', 35000), ('Afi', 10000);",
        "expected": "+---------+----------+\n| vendeur | ca_total |\n+---------+----------+\n| Sena    | 75000    |\n| Yao     | 50000    |\n+---------+----------+\n(2 lignes retournées)"
      },
      {
        "label": "Un seul vendeur au-dessus du seuil",
        "stdin": "CREATE TABLE ventes (vendeur TEXT, montant INT); INSERT INTO ventes VALUES ('Binta', 60000), ('Kodjo', 15000);",
        "expected": "+---------+----------+\n| vendeur | ca_total |\n+---------+----------+\n| Binta   | 60000    |\n+---------+----------+\n(1 ligne retournée)"
      }
    ],
    "solution": "-- Corrigé officiel sql2-c4-e3\nWITH totaux AS (\n  SELECT vendeur, SUM(montant) AS ca_total\n  FROM ventes\n  GROUP BY vendeur\n)\nSELECT vendeur, ca_total FROM totaux WHERE ca_total >= 50000 ORDER BY ca_total DESC;"
  },
  {
    "id": "sql2-c5-e1",
    "chapter": 5,
    "level": "n1",
    "language": "sql",
    "title": "Virement bancaire atomique entre deux comptes",
    "goal": "Exécuter le débit et le crédit d’un virement bancaire en conservant l’invariant de somme.",
    "brief": "<p>Dans la table <code>comptes(id, titulaire, solde)</code>, effectuez un virement de <code>15000</code> du compte <code>id = 1</code> (débit : <code>solde = solde - 15000</code>) vers le compte <code>id = 2</code> (crédit : <code>solde = solde + 15000</code>).</p>",
    "starter": "-- Débitez 15000 sur id=1 et créditez 15000 sur id=2\nUPDATE comptes SET solde = solde WHERE id = 1;",
    "hints": [
      "Écrivez deux instructions UPDATE séparées par un point-virgule.",
      "La première soustrait 15000 sur WHERE id = 1, la seconde ajoute 15000 sur WHERE id = 2."
    ],
    "examples": [
      {
        "stdin": "CREATE TABLE comptes (id INT PRIMARY KEY, titulaire TEXT, solde INT); INSERT INTO comptes VALUES (1, 'Amina', 50000), (2, 'Koffi', 20000);\n-- VERIFY:\nSELECT id, titulaire, solde FROM comptes ORDER BY id;\n-- exemple",
        "expected": "Instruction exécutée avec succès (1 ligne modifiée).\n\nInstruction exécutée avec succès (1 ligne modifiée).\n\n+----+-----------+-------+\n| id | titulaire | solde |\n+----+-----------+-------+\n| 1  | Amina     | 35000 |\n| 2  | Koffi     | 35000 |\n+----+-----------+-------+\n(2 lignes retournées)",
        "note": "Résultat de la requête SQL sur la base d’exemple."
      }
    ],
    "tests": [
      {
        "label": "Virement standard de 15000",
        "stdin": "CREATE TABLE comptes (id INT PRIMARY KEY, titulaire TEXT, solde INT); INSERT INTO comptes VALUES (1, 'Amina', 50000), (2, 'Koffi', 20000);\n-- VERIFY:\nSELECT id, titulaire, solde FROM comptes ORDER BY id;",
        "expected": "Instruction exécutée avec succès (1 ligne modifiée).\n\nInstruction exécutée avec succès (1 ligne modifiée).\n\n+----+-----------+-------+\n| id | titulaire | solde |\n+----+-----------+-------+\n| 1  | Amina     | 35000 |\n| 2  | Koffi     | 35000 |\n+----+-----------+-------+\n(2 lignes retournées)"
      },
      {
        "label": "Solde exact de 15000 au départ",
        "stdin": "CREATE TABLE comptes (id INT PRIMARY KEY, titulaire TEXT, solde INT); INSERT INTO comptes VALUES (1, 'Yao', 15000), (2, 'Sena', 0);\n-- VERIFY:\nSELECT id, titulaire, solde FROM comptes ORDER BY id;",
        "expected": "Instruction exécutée avec succès (1 ligne modifiée).\n\nInstruction exécutée avec succès (1 ligne modifiée).\n\n+----+-----------+-------+\n| id | titulaire | solde |\n+----+-----------+-------+\n| 1  | Yao       | 0     |\n| 2  | Sena      | 15000 |\n+----+-----------+-------+\n(2 lignes retournées)"
      },
      {
        "label": "Trois comptes dont un non touché",
        "stdin": "CREATE TABLE comptes (id INT PRIMARY KEY, titulaire TEXT, solde INT); INSERT INTO comptes VALUES (1, 'Afi', 100000), (2, 'Binta', 40000), (3, 'Epargne', 90000);\n-- VERIFY:\nSELECT id, titulaire, solde FROM comptes ORDER BY id;",
        "expected": "Instruction exécutée avec succès (1 ligne modifiée).\n\nInstruction exécutée avec succès (1 ligne modifiée).\n\n+----+-----------+-------+\n| id | titulaire | solde |\n+----+-----------+-------+\n| 1  | Afi       | 85000 |\n| 2  | Binta     | 55000 |\n| 3  | Epargne   | 90000 |\n+----+-----------+-------+\n(3 lignes retournées)"
      }
    ],
    "solution": "-- Corrigé officiel sql2-c5-e1\nUPDATE comptes SET solde = solde - 15000 WHERE id = 1;\nUPDATE comptes SET solde = solde + 15000 WHERE id = 2;"
  },
  {
    "id": "sql2-c5-e2",
    "chapter": 5,
    "level": "n2",
    "language": "sql",
    "title": "Validation atomique d’une commande et décrémentation de stock",
    "goal": "Mettre à jour simultanément le statut d’une commande et le stock disponible.",
    "brief": "<p>Lors de la validation de la commande <code>id = 10</code> portant sur <code>3</code> unités de l’article <code>id = 1</code>, mettez à jour <code>commandes</code> (<code>SET statut = 'VALIDEE' WHERE id = 10</code>) et décrémentez <code>articles</code> (<code>SET stock = stock - 3 WHERE id = 1</code>).</p>",
    "starter": "-- Validez la commande id=10 et décrémentez de 3 le stock de l’article id=1\nUPDATE commandes SET statut = statut WHERE id = 10;",
    "hints": [
      "Exécutez UPDATE commandes SET statut = 'VALIDEE' WHERE id = 10;",
      "Puis exécutez UPDATE articles SET stock = stock - 3 WHERE id = 1;"
    ],
    "examples": [
      {
        "stdin": "CREATE TABLE articles (id INT, stock INT); CREATE TABLE commandes (id INT, statut TEXT); INSERT INTO articles VALUES (1, 10); INSERT INTO commandes VALUES (10, 'EN_ATTENTE');\n-- VERIFY:\nSELECT c.id, c.statut, a.stock FROM commandes c CROSS JOIN articles a WHERE c.id = 10 AND a.id = 1;\n-- exemple",
        "expected": "Instruction exécutée avec succès (1 ligne modifiée).\n\nInstruction exécutée avec succès (1 ligne modifiée).\n\n+----+---------+-------+\n| id | statut  | stock |\n+----+---------+-------+\n| 10 | VALIDEE | 7     |\n+----+---------+-------+\n(1 ligne retournée)",
        "note": "Résultat de la requête SQL sur la base d’exemple."
      }
    ],
    "tests": [
      {
        "label": "Stock initial de 10 unités",
        "stdin": "CREATE TABLE articles (id INT, stock INT); CREATE TABLE commandes (id INT, statut TEXT); INSERT INTO articles VALUES (1, 10); INSERT INTO commandes VALUES (10, 'EN_ATTENTE');\n-- VERIFY:\nSELECT c.id, c.statut, a.stock FROM commandes c CROSS JOIN articles a WHERE c.id = 10 AND a.id = 1;",
        "expected": "Instruction exécutée avec succès (1 ligne modifiée).\n\nInstruction exécutée avec succès (1 ligne modifiée).\n\n+----+---------+-------+\n| id | statut  | stock |\n+----+---------+-------+\n| 10 | VALIDEE | 7     |\n+----+---------+-------+\n(1 ligne retournée)"
      },
      {
        "label": "Stock initial de 3 unités",
        "stdin": "CREATE TABLE articles (id INT, stock INT); CREATE TABLE commandes (id INT, statut TEXT); INSERT INTO articles VALUES (1, 3); INSERT INTO commandes VALUES (10, 'BROUILLON');\n-- VERIFY:\nSELECT c.id, c.statut, a.stock FROM commandes c CROSS JOIN articles a WHERE c.id = 10 AND a.id = 1;",
        "expected": "Instruction exécutée avec succès (1 ligne modifiée).\n\nInstruction exécutée avec succès (1 ligne modifiée).\n\n+----+---------+-------+\n| id | statut  | stock |\n+----+---------+-------+\n| 10 | VALIDEE | 0     |\n+----+---------+-------+\n(1 ligne retournée)"
      },
      {
        "label": "Plusieurs commandes en base",
        "stdin": "CREATE TABLE articles (id INT, stock INT); CREATE TABLE commandes (id INT, statut TEXT); INSERT INTO articles VALUES (1, 25), (2, 50); INSERT INTO commandes VALUES (10, 'EN_ATTENTE'), (20, 'EN_ATTENTE');\n-- VERIFY:\nSELECT c.id, c.statut, a.stock FROM commandes c JOIN articles a ON a.id = 1 ORDER BY c.id;",
        "expected": "Instruction exécutée avec succès (1 ligne modifiée).\n\nInstruction exécutée avec succès (1 ligne modifiée).\n\n+----+------------+-------+\n| id | statut     | stock |\n+----+------------+-------+\n| 10 | VALIDEE    | 22    |\n| 20 | EN_ATTENTE | 22    |\n+----+------------+-------+\n(2 lignes retournées)"
      }
    ],
    "solution": "-- Corrigé officiel sql2-c5-e2\nUPDATE commandes SET statut = 'VALIDEE' WHERE id = 10;\nUPDATE articles SET stock = stock - 3 WHERE id = 1;"
  },
  {
    "id": "sql2-c5-e3",
    "chapter": 5,
    "level": "n3",
    "language": "sql",
    "title": "Audit de cohérence comptable (Écriture débit / crédit équilibrée)",
    "goal": "Vérifier par agrégation SQL qu’une transaction respecte l’équilibre débit = crédit.",
    "brief": "<p>Dans la table <code>ecritures(tx_id, sens, montant)</code> où <code>sens</code> vaut <code>'DEBIT'</code> ou <code>'CREDIT'</code>, affichez pour chaque <code>tx_id</code> le total débit (<code>SUM(CASE WHEN sens = 'DEBIT' THEN montant ELSE 0 END) AS total_debit</code>) et le total crédit (<code>SUM(CASE WHEN sens = 'CREDIT' THEN montant ELSE 0 END) AS total_credit</code>), triés par <code>tx_id</code> croissant.</p>",
    "starter": "-- Calculez total_debit et total_credit par tx_id\nSELECT tx_id FROM ecritures GROUP BY tx_id;",
    "hints": [
      "Utilisez SUM(CASE WHEN sens = 'DEBIT' THEN montant ELSE 0 END) AS total_debit.",
      "Faites de même pour CREDIT et regroupez avec GROUP BY tx_id ORDER BY tx_id ASC."
    ],
    "examples": [
      {
        "stdin": "CREATE TABLE ecritures (tx_id INT, sens TEXT, montant INT); INSERT INTO ecritures VALUES (1, 'DEBIT', 10000), (1, 'CREDIT', 10000), (2, 'DEBIT', 5000), (2, 'CREDIT', 3000);\n-- exemple",
        "expected": "+-------+-------------+--------------+\n| tx_id | total_debit | total_credit |\n+-------+-------------+--------------+\n| 1     | 10000       | 10000        |\n| 2     | 5000        | 3000         |\n+-------+-------------+--------------+\n(2 lignes retournées)",
        "note": "Résultat de la requête SQL sur la base d’exemple."
      }
    ],
    "tests": [
      {
        "label": "Une transaction équilibrée et une déséquilibrée",
        "stdin": "CREATE TABLE ecritures (tx_id INT, sens TEXT, montant INT); INSERT INTO ecritures VALUES (1, 'DEBIT', 10000), (1, 'CREDIT', 10000), (2, 'DEBIT', 5000), (2, 'CREDIT', 3000);",
        "expected": "+-------+-------------+--------------+\n| tx_id | total_debit | total_credit |\n+-------+-------------+--------------+\n| 1     | 10000       | 10000        |\n| 2     | 5000        | 3000         |\n+-------+-------------+--------------+\n(2 lignes retournées)"
      },
      {
        "label": "Transaction ventilée sur deux crédits",
        "stdin": "CREATE TABLE ecritures (tx_id INT, sens TEXT, montant INT); INSERT INTO ecritures VALUES (10, 'DEBIT', 20000), (10, 'CREDIT', 12000), (10, 'CREDIT', 8000);",
        "expected": "+-------+-------------+--------------+\n| tx_id | total_debit | total_credit |\n+-------+-------------+--------------+\n| 10    | 20000       | 20000        |\n+-------+-------------+--------------+\n(1 ligne retournée)"
      },
      {
        "label": "Deux transactions équilibrées",
        "stdin": "CREATE TABLE ecritures (tx_id INT, sens TEXT, montant INT); INSERT INTO ecritures VALUES (1, 'DEBIT', 1500), (1, 'CREDIT', 1500), (2, 'DEBIT', 4500), (2, 'CREDIT', 4500);",
        "expected": "+-------+-------------+--------------+\n| tx_id | total_debit | total_credit |\n+-------+-------------+--------------+\n| 1     | 1500        | 1500         |\n| 2     | 4500        | 4500         |\n+-------+-------------+--------------+\n(2 lignes retournées)"
      }
    ],
    "solution": "-- Corrigé officiel sql2-c5-e3\nSELECT tx_id, SUM(CASE WHEN sens = 'DEBIT' THEN montant ELSE 0 END) AS total_debit, SUM(CASE WHEN sens = 'CREDIT' THEN montant ELSE 0 END) AS total_credit FROM ecritures GROUP BY tx_id ORDER BY tx_id ASC;"
  },
  {
    "id": "sql2-c6-e1",
    "chapter": 6,
    "level": "n1",
    "language": "sql",
    "title": "Créer une vue relationnelle (CREATE VIEW)",
    "goal": "Encapsuler une requête de filtrage dans une vue SQL réutilisable.",
    "brief": "<p>À partir de la table <code>employes(id, nom, departement, salaire)</code>, créez une vue nommée <code>vue_cadres</code> qui expose <code>id</code>, <code>nom</code> et <code>departement</code> des employés dont <code>salaire &gt;= 300000</code>.</p>",
    "starter": "-- Créez la vue vue_cadres(id, nom, departement)\nCREATE VIEW vue_cadres AS SELECT id, nom, departement FROM employes WHERE salaire >= 9999999;",
    "hints": [
      "Utilisez la syntaxe CREATE VIEW vue_cadres AS SELECT ...",
      "Sélectionnez id, nom, departement FROM employes WHERE salaire >= 300000;"
    ],
    "examples": [
      {
        "stdin": "CREATE TABLE employes (id INT, nom TEXT, departement TEXT, salaire INT); INSERT INTO employes VALUES (1, 'Amina', 'IT', 350000), (2, 'Koffi', 'Support', 200000), (3, 'Yao', 'Securite', 420000);\n-- VERIFY:\nSELECT id, nom, departement FROM vue_cadres ORDER BY id;\n-- exemple",
        "expected": "Instruction exécutée avec succès (3 lignes modifiées).\n\n+----+-------+-------------+\n| id | nom   | departement |\n+----+-------+-------------+\n| 1  | Amina | IT          |\n| 3  | Yao   | Securite    |\n+----+-------+-------------+\n(2 lignes retournées)",
        "note": "Résultat de la requête SQL sur la base d’exemple."
      }
    ],
    "tests": [
      {
        "label": "Deux cadres éligibles",
        "stdin": "CREATE TABLE employes (id INT, nom TEXT, departement TEXT, salaire INT); INSERT INTO employes VALUES (1, 'Amina', 'IT', 350000), (2, 'Koffi', 'Support', 200000), (3, 'Yao', 'Securite', 420000);\n-- VERIFY:\nSELECT id, nom, departement FROM vue_cadres ORDER BY id;",
        "expected": "Instruction exécutée avec succès (3 lignes modifiées).\n\n+----+-------+-------------+\n| id | nom   | departement |\n+----+-------+-------------+\n| 1  | Amina | IT          |\n| 3  | Yao   | Securite    |\n+----+-------+-------------+\n(2 lignes retournées)"
      },
      {
        "label": "Seuil exact à 300000",
        "stdin": "CREATE TABLE employes (id INT, nom TEXT, departement TEXT, salaire INT); INSERT INTO employes VALUES (10, 'Sena', 'Cloud', 300000), (20, 'Afi', 'Reseau', 290000);\n-- VERIFY:\nSELECT id, nom, departement FROM vue_cadres ORDER BY id;",
        "expected": "Instruction exécutée avec succès (2 lignes modifiées).\n\n+----+------+-------------+\n| id | nom  | departement |\n+----+------+-------------+\n| 10 | Sena | Cloud       |\n+----+------+-------------+\n(1 ligne retournée)"
      },
      {
        "label": "Trois cadres",
        "stdin": "CREATE TABLE employes (id INT, nom TEXT, departement TEXT, salaire INT); INSERT INTO employes VALUES (1, 'A', 'D1', 500000), (2, 'B', 'D2', 310000), (3, 'C', 'D3', 400000);\n-- VERIFY:\nSELECT id, nom, departement FROM vue_cadres ORDER BY id;",
        "expected": "Instruction exécutée avec succès (3 lignes modifiées).\n\n+----+-----+-------------+\n| id | nom | departement |\n+----+-----+-------------+\n| 1  | A   | D1          |\n| 2  | B   | D2          |\n| 3  | C   | D3          |\n+----+-----+-------------+\n(3 lignes retournées)"
      }
    ],
    "solution": "-- Corrigé officiel sql2-c6-e1\nCREATE VIEW vue_cadres AS\nSELECT id, nom, departement FROM employes WHERE salaire >= 300000;"
  },
  {
    "id": "sql2-c6-e2",
    "chapter": 6,
    "level": "n2",
    "language": "sql",
    "title": "Déclencheur d’audit automatique (CREATE TRIGGER AFTER UPDATE)",
    "goal": "Écrire un trigger enregistrant l’ancienne et la nouvelle valeur lors d’une mise à jour.",
    "brief": "<p>Soient <code>comptes(id INT, solde INT)</code> et <code>journal_audit(compte_id INT, ancien_solde INT, nouveau_solde INT)</code>. Créez un déclencheur <code>trg_audit_solde</code> qui, <code>AFTER UPDATE ON comptes</code>, insère dans <code>journal_audit</code> les valeurs <code>(OLD.id, OLD.solde, NEW.solde)</code>.</p>",
    "starter": "-- Créez le trigger trg_audit_solde AFTER UPDATE ON comptes\nSELECT * FROM comptes;",
    "hints": [
      "Utilisez CREATE TRIGGER trg_audit_solde AFTER UPDATE ON comptes FOR EACH ROW BEGIN ... END;",
      "Dans le corps, écrivez INSERT INTO journal_audit VALUES (OLD.id, OLD.solde, NEW.solde);"
    ],
    "examples": [
      {
        "stdin": "CREATE TABLE comptes (id INT, solde INT); CREATE TABLE journal_audit (compte_id INT, ancien_solde INT, nouveau_solde INT); INSERT INTO comptes VALUES (1, 10000), (2, 50000);\n-- VERIFY:\nUPDATE comptes SET solde = 15000 WHERE id = 1; SELECT compte_id, ancien_solde, nouveau_solde FROM journal_audit ORDER BY compte_id;\n-- exemple",
        "expected": "Instruction exécutée avec succès (2 lignes modifiées).\n\nInstruction exécutée avec succès (1 ligne modifiée).\n\n+-----------+--------------+---------------+\n| compte_id | ancien_solde | nouveau_solde |\n+-----------+--------------+---------------+\n| 1         | 10000        | 15000         |\n+-----------+--------------+---------------+\n(1 ligne retournée)",
        "note": "Résultat de la requête SQL sur la base d’exemple."
      }
    ],
    "tests": [
      {
        "label": "Une modification de solde auditée",
        "stdin": "CREATE TABLE comptes (id INT, solde INT); CREATE TABLE journal_audit (compte_id INT, ancien_solde INT, nouveau_solde INT); INSERT INTO comptes VALUES (1, 10000), (2, 50000);\n-- VERIFY:\nUPDATE comptes SET solde = 15000 WHERE id = 1; SELECT compte_id, ancien_solde, nouveau_solde FROM journal_audit ORDER BY compte_id;",
        "expected": "Instruction exécutée avec succès (2 lignes modifiées).\n\nInstruction exécutée avec succès (1 ligne modifiée).\n\n+-----------+--------------+---------------+\n| compte_id | ancien_solde | nouveau_solde |\n+-----------+--------------+---------------+\n| 1         | 10000        | 15000         |\n+-----------+--------------+---------------+\n(1 ligne retournée)"
      },
      {
        "label": "Deux mises à jour successives",
        "stdin": "CREATE TABLE comptes (id INT, solde INT); CREATE TABLE journal_audit (compte_id INT, ancien_solde INT, nouveau_solde INT); INSERT INTO comptes VALUES (10, 2000), (20, 8000);\n-- VERIFY:\nUPDATE comptes SET solde = 3000 WHERE id = 10; UPDATE comptes SET solde = 7500 WHERE id = 20; SELECT compte_id, ancien_solde, nouveau_solde FROM journal_audit ORDER BY compte_id;",
        "expected": "Instruction exécutée avec succès (2 lignes modifiées).\n\nInstruction exécutée avec succès (1 ligne modifiée).\n\nInstruction exécutée avec succès (1 ligne modifiée).\n\n+-----------+--------------+---------------+\n| compte_id | ancien_solde | nouveau_solde |\n+-----------+--------------+---------------+\n| 10        | 2000         | 3000          |\n| 20        | 8000         | 7500          |\n+-----------+--------------+---------------+\n(2 lignes retournées)"
      },
      {
        "label": "Mise à jour globale de tous les comptes",
        "stdin": "CREATE TABLE comptes (id INT, solde INT); CREATE TABLE journal_audit (compte_id INT, ancien_solde INT, nouveau_solde INT); INSERT INTO comptes VALUES (1, 100), (2, 200);\n-- VERIFY:\nUPDATE comptes SET solde = solde + 50; SELECT compte_id, ancien_solde, nouveau_solde FROM journal_audit ORDER BY compte_id;",
        "expected": "Instruction exécutée avec succès (2 lignes modifiées).\n\nInstruction exécutée avec succès (2 lignes modifiées).\n\n+-----------+--------------+---------------+\n| compte_id | ancien_solde | nouveau_solde |\n+-----------+--------------+---------------+\n| 1         | 100          | 150           |\n| 2         | 200          | 250           |\n+-----------+--------------+---------------+\n(2 lignes retournées)"
      }
    ],
    "solution": "-- Corrigé officiel sql2-c6-e2\nCREATE TRIGGER trg_audit_solde\nAFTER UPDATE ON comptes\nFOR EACH ROW\nBEGIN\n  INSERT INTO journal_audit VALUES (OLD.id, OLD.solde, NEW.solde);\nEND;"
  },
  {
    "id": "sql2-c6-e3",
    "chapter": 6,
    "level": "n3",
    "language": "sql",
    "title": "Créer un index composite pour accélérer les recherches (CREATE INDEX)",
    "goal": "Créer un index B-Tree multi-colonnes et interroger la table indexée.",
    "brief": "<p>Sur la table <code>journaux(id INT, service TEXT, niveau TEXT, message TEXT)</code>, créez un index nommé <code>idx_journaux_service_niveau</code> sur les colonnes <code>(service, niveau)</code>, puis sélectionnez <code>id</code> et <code>message</code> pour <code>service = 'auth' AND niveau = 'ERROR'</code> triés par <code>id</code> croissant.</p>",
    "starter": "-- Créez l’index idx_journaux_service_niveau puis sélectionnez id, message\nSELECT id, message FROM journaux;",
    "hints": [
      "Écrivez CREATE INDEX idx_journaux_service_niveau ON journaux(service, niveau);",
      "Suivez par SELECT id, message FROM journaux WHERE service = 'auth' AND niveau = 'ERROR' ORDER BY id ASC;"
    ],
    "examples": [
      {
        "stdin": "CREATE TABLE journaux (id INT, service TEXT, niveau TEXT, message TEXT); INSERT INTO journaux VALUES (1, 'auth', 'ERROR', 'Echec MFA'), (2, 'auth', 'INFO', 'Login OK'), (3, 'db', 'ERROR', 'Timeout');\n-- exemple",
        "expected": "Instruction exécutée avec succès (3 lignes modifiées).\n\n+----+-----------+\n| id | message   |\n+----+-----------+\n| 1  | Echec MFA |\n+----+-----------+\n(1 ligne retournée)",
        "note": "Résultat de la requête SQL sur la base d’exemple."
      }
    ],
    "tests": [
      {
        "label": "Filtrage précis sur auth + ERROR",
        "stdin": "CREATE TABLE journaux (id INT, service TEXT, niveau TEXT, message TEXT); INSERT INTO journaux VALUES (1, 'auth', 'ERROR', 'Echec MFA'), (2, 'auth', 'INFO', 'Login OK'), (3, 'db', 'ERROR', 'Timeout');",
        "expected": "Instruction exécutée avec succès (3 lignes modifiées).\n\n+----+-----------+\n| id | message   |\n+----+-----------+\n| 1  | Echec MFA |\n+----+-----------+\n(1 ligne retournée)"
      },
      {
        "label": "Deux erreurs d’authentification",
        "stdin": "CREATE TABLE journaux (id INT, service TEXT, niveau TEXT, message TEXT); INSERT INTO journaux VALUES (10, 'auth', 'ERROR', 'Jeton expire'), (20, 'web', 'ERROR', '404'), (30, 'auth', 'ERROR', 'Compte verrouille');",
        "expected": "Instruction exécutée avec succès (3 lignes modifiées).\n\n+----+-------------------+\n| id | message           |\n+----+-------------------+\n| 10 | Jeton expire      |\n| 30 | Compte verrouille |\n+----+-------------------+\n(2 lignes retournées)"
      },
      {
        "label": "Événement unique",
        "stdin": "CREATE TABLE journaux (id INT, service TEXT, niveau TEXT, message TEXT); INSERT INTO journaux VALUES (5, 'auth', 'ERROR', 'Signature invalide');",
        "expected": "Instruction exécutée avec succès (1 ligne modifiée).\n\n+----+--------------------+\n| id | message            |\n+----+--------------------+\n| 5  | Signature invalide |\n+----+--------------------+\n(1 ligne retournée)"
      }
    ],
    "solution": "-- Corrigé officiel sql2-c6-e3\nCREATE INDEX idx_journaux_service_niveau ON journaux(service, niveau);\nSELECT id, message FROM journaux WHERE service = 'auth' AND niveau = 'ERROR' ORDER BY id ASC;"
  }
];

module.exports = SQL2_EXERCISES;
