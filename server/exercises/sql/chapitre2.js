'use strict';

module.exports = [
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
        "stdin": "CREATE TABLE clients (id INT, nom TEXT, ville TEXT); INSERT INTO clients VALUES (1, 'Amina', 'Lome'), (2, 'Koffi', 'Kara');",
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
    "solution": "SELECT id, UPPER(nom) AS nom_maj, LENGTH(nom) AS nb_caracteres FROM clients ORDER BY id ASC;"
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
        "stdin": "CREATE TABLE factures (id INT, montant_ht INT, remise INT); INSERT INTO factures VALUES (1, 50000, 5000), (2, 30000, NULL);",
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
    "solution": "SELECT id, montant_ht - COALESCE(remise, 0) AS montant_net FROM factures ORDER BY id ASC;"
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
        "stdin": "CREATE TABLE articles (id INT, libelle TEXT, prix_ht REAL); INSERT INTO articles VALUES (1, 'Clavier', 10000), (2, 'Adaptateur', 3333.33);",
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
    "solution": "SELECT libelle, ROUND(prix_ht * 1.18, 2) AS prix_ttc FROM articles ORDER BY id ASC;"
  }
];
