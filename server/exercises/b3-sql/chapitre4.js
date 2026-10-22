'use strict';

module.exports = [
  {
    "id": "sql3-c4-e1",
    "chapter": 4,
    "level": "n1",
    "language": "sql",
    "title": "Comparaison temporelle ligne à ligne avec LAG() OVER",
    "goal": "Utiliser la fonction de fenêtrage LAG() pour calculer l’écart avec la période précédente.",
    "brief": "<p>Dans la table <code>chiffre_affaires(mois INT, ca INT)</code>, affichez <code>mois</code>, <code>ca</code>, le CA du mois précédent (<code>LAG(ca, 1, 0) OVER (ORDER BY mois ASC) AS ca_precedent</code>) et la variation (<code>ca - LAG(ca, 1, 0) OVER (ORDER BY mois ASC) AS variation</code>), triés par <code>mois</code> croissant.</p>",
    "starter": "-- Utilisez LAG(ca, 1, 0) OVER (ORDER BY mois ASC)\nSELECT mois, ca FROM chiffre_affaires;",
    "hints": [
      "LAG(ca, 1, 0) renvoie la valeur de ca 1 ligne plus haut, ou 0 sur la toute première ligne.",
      "Calculez ca - LAG(ca, 1, 0) OVER (ORDER BY mois ASC) AS variation."
    ],
    "examples": [
      {
        "stdin": "CREATE TABLE chiffre_affaires (mois INT, ca INT); INSERT INTO chiffre_affaires VALUES (1, 100000), (2, 130000), (3, 115000);",
        "expected": "+------+--------+--------------+-----------+\n| mois | ca     | ca_precedent | variation |\n+------+--------+--------------+-----------+\n| 1    | 100000 | 0            | 100000    |\n| 2    | 130000 | 100000       | 30000     |\n| 3    | 115000 | 130000       | -15000    |\n+------+--------+--------------+-----------+\n(3 lignes retournées)",
        "note": "Résultat de la requête SQL sur la base d’exemple."
      }
    ],
    "tests": [
      {
        "label": "Trois mois consécutifs",
        "stdin": "CREATE TABLE chiffre_affaires (mois INT, ca INT); INSERT INTO chiffre_affaires VALUES (1, 100000), (2, 130000), (3, 115000);",
        "expected": "+------+--------+--------------+-----------+\n| mois | ca     | ca_precedent | variation |\n+------+--------+--------------+-----------+\n| 1    | 100000 | 0            | 100000    |\n| 2    | 130000 | 100000       | 30000     |\n| 3    | 115000 | 130000       | -15000    |\n+------+--------+--------------+-----------+\n(3 lignes retournées)"
      },
      {
        "label": "Croissance continue sur quatre mois",
        "stdin": "CREATE TABLE chiffre_affaires (mois INT, ca INT); INSERT INTO chiffre_affaires VALUES (1, 50), (2, 75), (3, 100), (4, 150);",
        "expected": "+------+-----+--------------+-----------+\n| mois | ca  | ca_precedent | variation |\n+------+-----+--------------+-----------+\n| 1    | 50  | 0            | 50        |\n| 2    | 75  | 50           | 25        |\n| 3    | 100 | 75           | 25        |\n| 4    | 150 | 100          | 50        |\n+------+-----+--------------+-----------+\n(4 lignes retournées)"
      },
      {
        "label": "Deux mois",
        "stdin": "CREATE TABLE chiffre_affaires (mois INT, ca INT); INSERT INTO chiffre_affaires VALUES (1, 200000), (2, 180000);",
        "expected": "+------+--------+--------------+-----------+\n| mois | ca     | ca_precedent | variation |\n+------+--------+--------------+-----------+\n| 1    | 200000 | 0            | 200000    |\n| 2    | 180000 | 200000       | -20000    |\n+------+--------+--------------+-----------+\n(2 lignes retournées)"
      }
    ],
    "solution": "SELECT mois, ca, LAG(ca, 1, 0) OVER (ORDER BY mois ASC) AS ca_precedent, ca - LAG(ca, 1, 0) OVER (ORDER BY mois ASC) AS variation FROM chiffre_affaires ORDER BY mois ASC;"
  },
  {
    "id": "sql3-c4-e2",
    "chapter": 4,
    "level": "n2",
    "language": "sql",
    "title": "Top-N par département avec DENSE_RANK() dans une CTE",
    "goal": "Extraire les 2 meilleurs salaires de chaque département sans trou de classement.",
    "brief": "<p>Dans la table <code>employes(nom, departement, salaire)</code>, utilisez une CTE calculant <code>DENSE_RANK() OVER (PARTITION BY departement ORDER BY salaire DESC) AS rang</code> pour afficher <code>departement</code>, <code>nom</code>, <code>salaire</code> et <code>rang</code> uniquement pour les employés classés aux rangs <code>1</code> ou <code>2</code> (<code>WHERE rang &lt;= 2</code>), triés par <code>departement</code> croissant, <code>rang</code> croissant et <code>nom</code> croissant.</p>",
    "starter": "-- Sélectionnez les rangs <= 2 par département avec DENSE_RANK()\nSELECT departement, nom, salaire FROM employes;",
    "hints": [
      "Une fonction de fenêtrage ne peut pas figurer directement dans WHERE : calculez-la dans une CTE WITH classement AS (...).",
      "Filtrez ensuite avec WHERE rang <= 2."
    ],
    "examples": [
      {
        "stdin": "CREATE TABLE employes (nom TEXT, departement TEXT, salaire INT); INSERT INTO employes VALUES ('Amina', 'IT', 500000), ('Koffi', 'IT', 400000), ('Yao', 'IT', 300000), ('Sena', 'RH', 450000);",
        "expected": "+-------------+-------+---------+------+\n| departement | nom   | salaire | rang |\n+-------------+-------+---------+------+\n| IT          | Amina | 500000  | 1    |\n| IT          | Koffi | 400000  | 2    |\n| RH          | Sena  | 450000  | 1    |\n+-------------+-------+---------+------+\n(3 lignes retournées)",
        "note": "Résultat de la requête SQL sur la base d’exemple."
      }
    ],
    "tests": [
      {
        "label": "Trois employés en IT et un en RH",
        "stdin": "CREATE TABLE employes (nom TEXT, departement TEXT, salaire INT); INSERT INTO employes VALUES ('Amina', 'IT', 500000), ('Koffi', 'IT', 400000), ('Yao', 'IT', 300000), ('Sena', 'RH', 450000);",
        "expected": "+-------------+-------+---------+------+\n| departement | nom   | salaire | rang |\n+-------------+-------+---------+------+\n| IT          | Amina | 500000  | 1    |\n| IT          | Koffi | 400000  | 2    |\n| RH          | Sena  | 450000  | 1    |\n+-------------+-------+---------+------+\n(3 lignes retournées)"
      },
      {
        "label": "Ex-aequo au rang 1",
        "stdin": "CREATE TABLE employes (nom TEXT, departement TEXT, salaire INT); INSERT INTO employes VALUES ('Afi', 'Secu', 600000), ('Binta', 'Secu', 600000), ('Kodjo', 'Secu', 450000), ('Marc', 'Secu', 300000);",
        "expected": "+-------------+-------+---------+------+\n| departement | nom   | salaire | rang |\n+-------------+-------+---------+------+\n| Secu        | Afi   | 600000  | 1    |\n| Secu        | Binta | 600000  | 1    |\n| Secu        | Kodjo | 450000  | 2    |\n+-------------+-------+---------+------+\n(3 lignes retournées)"
      },
      {
        "label": "Deux départements",
        "stdin": "CREATE TABLE employes (nom TEXT, departement TEXT, salaire INT); INSERT INTO employes VALUES ('E1', 'A', 100), ('E2', 'A', 90), ('E3', 'A', 80), ('E4', 'B', 200);",
        "expected": "+-------------+-----+---------+------+\n| departement | nom | salaire | rang |\n+-------------+-----+---------+------+\n| A           | E1  | 100     | 1    |\n| A           | E2  | 90      | 2    |\n| B           | E4  | 200     | 1    |\n+-------------+-----+---------+------+\n(3 lignes retournées)"
      }
    ],
    "solution": "WITH classement AS (\n  SELECT departement, nom, salaire, DENSE_RANK() OVER (PARTITION BY departement ORDER BY salaire DESC) AS rang\n  FROM employes\n)\nSELECT departement, nom, salaire, rang FROM classement WHERE rang <= 2 ORDER BY departement ASC, rang ASC, nom ASC;"
  },
  {
    "id": "sql3-c4-e3",
    "chapter": 4,
    "level": "n3",
    "language": "sql",
    "title": "Parcours d’arbre hiérarchique avec WITH RECURSIVE",
    "goal": "Écrire une CTE récursive pour calculer la profondeur hiérarchique d’un organigramme.",
    "brief": "<p>La table <code>organigramme(id INT, nom TEXT, manager_id INT)</code> représente la hiérarchie d’une entreprise (la racine a <code>manager_id IS NULL</code>). Écrivez une requête <code>WITH RECURSIVE hierarchie AS (...)</code> qui calcule pour chaque employé son <code>id</code>, son <code>nom</code> et son niveau hiérarchique <code>niveau</code> (<code>1</code> pour la racine, puis <code>h.niveau + 1</code> pour chaque subordonné), triée par <code>niveau</code> croissant puis <code>id</code> croissant.</p>",
    "starter": "-- Écrivez une CTE WITH RECURSIVE hierarchie(id, nom, niveau)\nSELECT id, nom FROM organigramme;",
    "hints": [
      "Le membre d’ancrage sélectionne la racine : SELECT id, nom, 1 FROM organigramme WHERE manager_id IS NULL.",
      "Après UNION ALL, joignez organigramme o à hierarchie h sur o.manager_id = h.id avec h.niveau + 1."
    ],
    "examples": [
      {
        "stdin": "CREATE TABLE organigramme (id INT, nom TEXT, manager_id INT); INSERT INTO organigramme VALUES (1, 'DG', NULL), (2, 'DSI', 1), (3, 'Admin Réseau', 2);",
        "expected": "+----+--------------+--------+\n| id | nom          | niveau |\n+----+--------------+--------+\n| 1  | DG           | 1      |\n| 2  | DSI          | 2      |\n| 3  | Admin Réseau | 3      |\n+----+--------------+--------+\n(3 lignes retournées)",
        "note": "Résultat de la requête SQL sur la base d’exemple."
      }
    ],
    "tests": [
      {
        "label": "Hiérarchie à 3 niveaux",
        "stdin": "CREATE TABLE organigramme (id INT, nom TEXT, manager_id INT); INSERT INTO organigramme VALUES (1, 'DG', NULL), (2, 'DSI', 1), (3, 'Admin Réseau', 2);",
        "expected": "+----+--------------+--------+\n| id | nom          | niveau |\n+----+--------------+--------+\n| 1  | DG           | 1      |\n| 2  | DSI          | 2      |\n| 3  | Admin Réseau | 3      |\n+----+--------------+--------+\n(3 lignes retournées)"
      },
      {
        "label": "Arbre large à 2 branches",
        "stdin": "CREATE TABLE organigramme (id INT, nom TEXT, manager_id INT); INSERT INTO organigramme VALUES (1, 'PDG', NULL), (2, 'Dir Tech', 1), (3, 'Dir Fin', 1), (4, 'Dev Lead', 2), (5, 'Comptable', 3);",
        "expected": "+----+-----------+--------+\n| id | nom       | niveau |\n+----+-----------+--------+\n| 1  | PDG       | 1      |\n| 2  | Dir Tech  | 2      |\n| 3  | Dir Fin   | 2      |\n| 4  | Dev Lead  | 3      |\n| 5  | Comptable | 3      |\n+----+-----------+--------+\n(5 lignes retournées)"
      },
      {
        "label": "Racine et deux directeurs",
        "stdin": "CREATE TABLE organigramme (id INT, nom TEXT, manager_id INT); INSERT INTO organigramme VALUES (10, 'Recteur', NULL), (20, 'Doyen B1', 10), (30, 'Doyen B3', 10);",
        "expected": "+----+----------+--------+\n| id | nom      | niveau |\n+----+----------+--------+\n| 10 | Recteur  | 1      |\n| 20 | Doyen B1 | 2      |\n| 30 | Doyen B3 | 2      |\n+----+----------+--------+\n(3 lignes retournées)"
      }
    ],
    "solution": "WITH RECURSIVE hierarchie(id, nom, niveau) AS (\n  SELECT id, nom, 1 FROM organigramme WHERE manager_id IS NULL\n  UNION ALL\n  SELECT o.id, o.nom, h.niveau + 1 FROM organigramme o INNER JOIN hierarchie h ON o.manager_id = h.id\n)\nSELECT id, nom, niveau FROM hierarchie ORDER BY niveau ASC, id ASC;"
  }
];
