'use strict';

module.exports = [
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
        "stdin": "CREATE TABLE employes (nom TEXT, departement TEXT, salaire INT); INSERT INTO employes VALUES ('Amina', 'IT', 400000), ('Koffi', 'IT', 300000), ('Yao', 'RH', 350000);",
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
    "solution": "SELECT nom, departement, salaire, RANK() OVER (PARTITION BY departement ORDER BY salaire DESC) AS rang FROM employes ORDER BY departement ASC, rang ASC, nom ASC;"
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
        "stdin": "CREATE TABLE recettes (jour INT, montant INT); INSERT INTO recettes VALUES (1, 10000), (2, 15000), (3, 5000);",
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
    "solution": "SELECT jour, montant, SUM(montant) OVER (ORDER BY jour ASC) AS cumul FROM recettes ORDER BY jour ASC;"
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
        "stdin": "CREATE TABLE ventes (vendeur TEXT, montant INT); INSERT INTO ventes VALUES ('Amina', 30000), ('Amina', 25000), ('Koffi', 40000);",
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
    "solution": "WITH totaux AS (\n  SELECT vendeur, SUM(montant) AS ca_total\n  FROM ventes\n  GROUP BY vendeur\n)\nSELECT vendeur, ca_total FROM totaux WHERE ca_total >= 50000 ORDER BY ca_total DESC;"
  }
];
