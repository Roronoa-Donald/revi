'use strict';

module.exports = [
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
        "stdin": "CREATE TABLE serveurs (nom TEXT, cpu_pct INT); INSERT INTO serveurs VALUES ('srv-db', 92), ('srv-web', 65), ('srv-dns', 20);",
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
    "solution": "SELECT nom, cpu_pct, CASE WHEN cpu_pct >= 85 THEN 'CRITIQUE' WHEN cpu_pct >= 60 THEN 'ATTENTION' ELSE 'NORMAL' END AS etat FROM serveurs ORDER BY nom ASC;"
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
        "stdin": "CREATE TABLE employes (nom TEXT, salaire INT); INSERT INTO employes VALUES ('Amina', 400000), ('Koffi', 200000), ('Yao', 250000), ('Sena', 350000);",
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
    "solution": "SELECT nom, salaire FROM employes WHERE salaire > (SELECT AVG(salaire) FROM employes) ORDER BY salaire DESC;"
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
        "stdin": "CREATE TABLE clients (id INT, nom TEXT); CREATE TABLE commandes (id INT, client_id INT); INSERT INTO clients VALUES (1, 'Amina'), (2, 'Koffi'), (3, 'Yao'); INSERT INTO commandes VALUES (10, 1);",
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
    "solution": "SELECT c.id, c.nom FROM clients c WHERE NOT EXISTS (SELECT 1 FROM commandes cmd WHERE cmd.client_id = c.id) ORDER BY c.id ASC;"
  }
];
