'use strict';

module.exports = [
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
        "stdin": "CREATE TABLE comptes (id INT PRIMARY KEY, titulaire TEXT, solde INT); INSERT INTO comptes VALUES (1, 'Amina', 50000), (2, 'Koffi', 20000);\n-- VERIFY:\nSELECT id, titulaire, solde FROM comptes ORDER BY id;",
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
    "solution": "UPDATE comptes SET solde = solde - 15000 WHERE id = 1;\nUPDATE comptes SET solde = solde + 15000 WHERE id = 2;"
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
        "stdin": "CREATE TABLE articles (id INT, stock INT); CREATE TABLE commandes (id INT, statut TEXT); INSERT INTO articles VALUES (1, 10); INSERT INTO commandes VALUES (10, 'EN_ATTENTE');\n-- VERIFY:\nSELECT c.id, c.statut, a.stock FROM commandes c CROSS JOIN articles a WHERE c.id = 10 AND a.id = 1;",
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
    "solution": "UPDATE commandes SET statut = 'VALIDEE' WHERE id = 10;\nUPDATE articles SET stock = stock - 3 WHERE id = 1;"
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
        "stdin": "CREATE TABLE ecritures (tx_id INT, sens TEXT, montant INT); INSERT INTO ecritures VALUES (1, 'DEBIT', 10000), (1, 'CREDIT', 10000), (2, 'DEBIT', 5000), (2, 'CREDIT', 3000);",
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
    "solution": "SELECT tx_id, SUM(CASE WHEN sens = 'DEBIT' THEN montant ELSE 0 END) AS total_debit, SUM(CASE WHEN sens = 'CREDIT' THEN montant ELSE 0 END) AS total_credit FROM ecritures GROUP BY tx_id ORDER BY tx_id ASC;"
  }
];
