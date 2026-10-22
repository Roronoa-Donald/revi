'use strict';

module.exports = [
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
        "stdin": "CREATE TABLE employes (id INT, nom TEXT, departement TEXT, salaire INT); INSERT INTO employes VALUES (1, 'Amina', 'IT', 350000), (2, 'Koffi', 'Support', 200000), (3, 'Yao', 'Securite', 420000);\n-- VERIFY:\nSELECT id, nom, departement FROM vue_cadres ORDER BY id;",
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
    "solution": "CREATE VIEW vue_cadres AS\nSELECT id, nom, departement FROM employes WHERE salaire >= 300000;"
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
        "stdin": "CREATE TABLE comptes (id INT, solde INT); CREATE TABLE journal_audit (compte_id INT, ancien_solde INT, nouveau_solde INT); INSERT INTO comptes VALUES (1, 10000), (2, 50000);\n-- VERIFY:\nUPDATE comptes SET solde = 15000 WHERE id = 1; SELECT compte_id, ancien_solde, nouveau_solde FROM journal_audit ORDER BY compte_id;",
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
    "solution": "CREATE TRIGGER trg_audit_solde\nAFTER UPDATE ON comptes\nFOR EACH ROW\nBEGIN\n  INSERT INTO journal_audit VALUES (OLD.id, OLD.solde, NEW.solde);\nEND;"
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
        "stdin": "CREATE TABLE journaux (id INT, service TEXT, niveau TEXT, message TEXT); INSERT INTO journaux VALUES (1, 'auth', 'ERROR', 'Echec MFA'), (2, 'auth', 'INFO', 'Login OK'), (3, 'db', 'ERROR', 'Timeout');",
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
    "solution": "CREATE INDEX idx_journaux_service_niveau ON journaux(service, niveau);\nSELECT id, message FROM journaux WHERE service = 'auth' AND niveau = 'ERROR' ORDER BY id ASC;"
  }
];
