'use strict';

module.exports = [
  {
    "id": "sql3-c5-e1",
    "chapter": 5,
    "level": "n1",
    "language": "sql",
    "title": "Déclencheur de protection contre les soldes négatifs (AFTER UPDATE + WHEN)",
    "goal": "Déclencher une alerte automatique sur condition métier dans un trigger SQL.",
    "brief": "<p>Soient <code>comptes(id INT, solde INT)</code> et <code>alertes_fraude(compte_id INT, montant_tente INT)</code>. Créez un trigger <code>trg_alerte_decouvert</code> qui, <code>AFTER UPDATE ON comptes WHEN NEW.solde &lt; 0</code>, insère <code>(NEW.id, NEW.solde)</code> dans <code>alertes_fraude</code>.</p>",
    "starter": "-- Créez le trigger conditionnel trg_alerte_decouvert avec WHEN NEW.solde < 0\nSELECT * FROM comptes;",
    "hints": [
      "Utilisez la clause WHEN NEW.solde < 0 avant BEGIN dans la définition du trigger.",
      "Insérez (NEW.id, NEW.solde) dans alertes_fraude."
    ],
    "examples": [
      {
        "stdin": "CREATE TABLE comptes (id INT, solde INT); CREATE TABLE alertes_fraude (compte_id INT, montant_tente INT); INSERT INTO comptes VALUES (1, 5000), (2, 10000);\n-- VERIFY:\nUPDATE comptes SET solde = -2000 WHERE id = 1; UPDATE comptes SET solde = 4000 WHERE id = 2; SELECT compte_id, montant_tente FROM alertes_fraude ORDER BY compte_id;",
        "expected": "Instruction exécutée avec succès (2 lignes modifiées).\n\nInstruction exécutée avec succès (1 ligne modifiée).\n\nInstruction exécutée avec succès (1 ligne modifiée).\n\n+-----------+---------------+\n| compte_id | montant_tente |\n+-----------+---------------+\n| 1         | -2000         |\n+-----------+---------------+\n(1 ligne retournée)",
        "note": "Résultat de la requête SQL sur la base d’exemple."
      }
    ],
    "tests": [
      {
        "label": "Un passage à découvert détecté",
        "stdin": "CREATE TABLE comptes (id INT, solde INT); CREATE TABLE alertes_fraude (compte_id INT, montant_tente INT); INSERT INTO comptes VALUES (1, 5000), (2, 10000);\n-- VERIFY:\nUPDATE comptes SET solde = -2000 WHERE id = 1; UPDATE comptes SET solde = 4000 WHERE id = 2; SELECT compte_id, montant_tente FROM alertes_fraude ORDER BY compte_id;",
        "expected": "Instruction exécutée avec succès (2 lignes modifiées).\n\nInstruction exécutée avec succès (1 ligne modifiée).\n\nInstruction exécutée avec succès (1 ligne modifiée).\n\n+-----------+---------------+\n| compte_id | montant_tente |\n+-----------+---------------+\n| 1         | -2000         |\n+-----------+---------------+\n(1 ligne retournée)"
      },
      {
        "label": "Deux découverts détectés",
        "stdin": "CREATE TABLE comptes (id INT, solde INT); CREATE TABLE alertes_fraude (compte_id INT, montant_tente INT); INSERT INTO comptes VALUES (10, 1000), (20, 500);\n-- VERIFY:\nUPDATE comptes SET solde = solde - 1500; SELECT compte_id, montant_tente FROM alertes_fraude ORDER BY compte_id;",
        "expected": "Instruction exécutée avec succès (2 lignes modifiées).\n\nInstruction exécutée avec succès (2 lignes modifiées).\n\n+-----------+---------------+\n| compte_id | montant_tente |\n+-----------+---------------+\n| 10        | -500          |\n| 20        | -1000         |\n+-----------+---------------+\n(2 lignes retournées)"
      },
      {
        "label": "Solde nul non considéré comme découvert",
        "stdin": "CREATE TABLE comptes (id INT, solde INT); CREATE TABLE alertes_fraude (compte_id INT, montant_tente INT); INSERT INTO comptes VALUES (1, 1000), (2, 1000);\n-- VERIFY:\nUPDATE comptes SET solde = 0 WHERE id = 1; UPDATE comptes SET solde = -1 WHERE id = 2; SELECT compte_id, montant_tente FROM alertes_fraude ORDER BY compte_id;",
        "expected": "Instruction exécutée avec succès (2 lignes modifiées).\n\nInstruction exécutée avec succès (1 ligne modifiée).\n\nInstruction exécutée avec succès (1 ligne modifiée).\n\n+-----------+---------------+\n| compte_id | montant_tente |\n+-----------+---------------+\n| 2         | -1            |\n+-----------+---------------+\n(1 ligne retournée)"
      }
    ],
    "solution": "CREATE TRIGGER trg_alerte_decouvert\nAFTER UPDATE ON comptes\nFOR EACH ROW\nWHEN NEW.solde < 0\nBEGIN\n  INSERT INTO alertes_fraude VALUES (NEW.id, NEW.solde);\nEND;"
  },
  {
    "id": "sql3-c5-e2",
    "chapter": 5,
    "level": "n2",
    "language": "sql",
    "title": "Isolation multi-locataires (Row-Level Security / Politique RLS)",
    "goal": "Simuler une politique d’isolation Row-Level Security filtrant selon le contexte de session.",
    "brief": "<p>Dans une architecture SaaS multi-tenant, la table <code>contexte_session(tenant_actif TEXT, role_actif TEXT)</code> contient 1 ligne décrivant l’utilisateur connecté, et la table <code>dossiers_patients(id INT, tenant_id TEXT, patient TEXT)</code> contient les données. Créez une vue sécurisée <code>v_dossiers_rls</code> qui renvoie <code>id</code>, <code>tenant_id</code> et <code>patient</code> uniquement lorsque <code>tenant_id = (SELECT tenant_actif FROM contexte_session)</code> OU lorsque <code>(SELECT role_actif FROM contexte_session) = 'SUPERADMIN'</code>.</p>",
    "starter": "-- Créez la vue v_dossiers_rls appliquant la politique RLS\nCREATE VIEW v_dossiers_rls AS SELECT id, tenant_id, patient FROM dossiers_patients WHERE 1 = 0;",
    "hints": [
      "Créez CREATE VIEW v_dossiers_rls AS SELECT id, tenant_id, patient FROM dossiers_patients WHERE ...",
      "Combinez les deux conditions avec OR."
    ],
    "examples": [
      {
        "stdin": "CREATE TABLE contexte_session (tenant_actif TEXT, role_actif TEXT); CREATE TABLE dossiers_patients (id INT, tenant_id TEXT, patient TEXT); INSERT INTO contexte_session VALUES ('clinique_a', 'MEDECIN'); INSERT INTO dossiers_patients VALUES (1, 'clinique_a', 'Koffi'), (2, 'clinique_b', 'Amina');\n-- VERIFY:\nSELECT id, tenant_id, patient FROM v_dossiers_rls ORDER BY id;",
        "expected": "Instruction exécutée avec succès (2 lignes modifiées).\n\n+----+------------+---------+\n| id | tenant_id  | patient |\n+----+------------+---------+\n| 1  | clinique_a | Koffi   |\n+----+------------+---------+\n(1 ligne retournée)",
        "note": "Résultat de la requête SQL sur la base d’exemple."
      }
    ],
    "tests": [
      {
        "label": "Médecin de la clinique_a isolé sur son tenant",
        "stdin": "CREATE TABLE contexte_session (tenant_actif TEXT, role_actif TEXT); CREATE TABLE dossiers_patients (id INT, tenant_id TEXT, patient TEXT); INSERT INTO contexte_session VALUES ('clinique_a', 'MEDECIN'); INSERT INTO dossiers_patients VALUES (1, 'clinique_a', 'Koffi'), (2, 'clinique_b', 'Amina');\n-- VERIFY:\nSELECT id, tenant_id, patient FROM v_dossiers_rls ORDER BY id;",
        "expected": "Instruction exécutée avec succès (2 lignes modifiées).\n\n+----+------------+---------+\n| id | tenant_id  | patient |\n+----+------------+---------+\n| 1  | clinique_a | Koffi   |\n+----+------------+---------+\n(1 ligne retournée)"
      },
      {
        "label": "Superadmin accédant à tous les tenants",
        "stdin": "CREATE TABLE contexte_session (tenant_actif TEXT, role_actif TEXT); CREATE TABLE dossiers_patients (id INT, tenant_id TEXT, patient TEXT); INSERT INTO contexte_session VALUES ('aucun', 'SUPERADMIN'); INSERT INTO dossiers_patients VALUES (1, 'clinique_a', 'Koffi'), (2, 'clinique_b', 'Amina');\n-- VERIFY:\nSELECT id, tenant_id, patient FROM v_dossiers_rls ORDER BY id;",
        "expected": "Instruction exécutée avec succès (2 lignes modifiées).\n\n+----+------------+---------+\n| id | tenant_id  | patient |\n+----+------------+---------+\n| 1  | clinique_a | Koffi   |\n| 2  | clinique_b | Amina   |\n+----+------------+---------+\n(2 lignes retournées)"
      },
      {
        "label": "Clinique B avec deux dossiers",
        "stdin": "CREATE TABLE contexte_session (tenant_actif TEXT, role_actif TEXT); CREATE TABLE dossiers_patients (id INT, tenant_id TEXT, patient TEXT); INSERT INTO contexte_session VALUES ('clinique_b', 'INFIRMIER'); INSERT INTO dossiers_patients VALUES (1, 'clinique_a', 'Yao'), (2, 'clinique_b', 'Sena'), (3, 'clinique_b', 'Afi');\n-- VERIFY:\nSELECT id, tenant_id, patient FROM v_dossiers_rls ORDER BY id;",
        "expected": "Instruction exécutée avec succès (3 lignes modifiées).\n\n+----+------------+---------+\n| id | tenant_id  | patient |\n+----+------------+---------+\n| 2  | clinique_b | Sena    |\n| 3  | clinique_b | Afi     |\n+----+------------+---------+\n(2 lignes retournées)"
      }
    ],
    "solution": "CREATE VIEW v_dossiers_rls AS\nSELECT id, tenant_id, patient FROM dossiers_patients\nWHERE tenant_id = (SELECT tenant_actif FROM contexte_session)\n   OR (SELECT role_actif FROM contexte_session) = 'SUPERADMIN';"
  },
  {
    "id": "sql3-c5-e3",
    "chapter": 5,
    "level": "n3",
    "language": "sql",
    "title": "Maintien automatique d’une table de matérialisation par Trigger",
    "goal": "Maintenir un compteur dénormalisé en temps réel à chaque insertion.",
    "brief": "<p>Soient <code>commandes(id INT, client_id INT, montant INT)</code> et la table de synthèse <code>stats_clients(client_id INT PRIMARY KEY, nb_cmd INT, cumul_montant INT)</code>. Créez un trigger <code>trg_maj_stats</code> qui, <code>AFTER INSERT ON commandes</code>, met à jour <code>stats_clients</code> (<code>SET nb_cmd = nb_cmd + 1, cumul_montant = cumul_montant + NEW.montant WHERE client_id = NEW.client_id</code>).</p>",
    "starter": "-- Créez le trigger trg_maj_stats AFTER INSERT ON commandes\nSELECT * FROM stats_clients;",
    "hints": [
      "Utilisez CREATE TRIGGER trg_maj_stats AFTER INSERT ON commandes FOR EACH ROW BEGIN ... END;",
      "Mettez à jour stats_clients avec NEW.montant et NEW.client_id."
    ],
    "examples": [
      {
        "stdin": "CREATE TABLE commandes (id INT, client_id INT, montant INT); CREATE TABLE stats_clients (client_id INT PRIMARY KEY, nb_cmd INT, cumul_montant INT); INSERT INTO stats_clients VALUES (1, 0, 0), (2, 1, 10000);\n-- VERIFY:\nINSERT INTO commandes VALUES (100, 1, 25000), (101, 2, 15000); SELECT client_id, nb_cmd, cumul_montant FROM stats_clients ORDER BY client_id;",
        "expected": "Instruction exécutée avec succès (2 lignes modifiées).\n\nInstruction exécutée avec succès (2 lignes modifiées).\n\n+-----------+--------+---------------+\n| client_id | nb_cmd | cumul_montant |\n+-----------+--------+---------------+\n| 1         | 1      | 25000         |\n| 2         | 2      | 25000         |\n+-----------+--------+---------------+\n(2 lignes retournées)",
        "note": "Résultat de la requête SQL sur la base d’exemple."
      }
    ],
    "tests": [
      {
        "label": "Insertion d’une commande par client",
        "stdin": "CREATE TABLE commandes (id INT, client_id INT, montant INT); CREATE TABLE stats_clients (client_id INT PRIMARY KEY, nb_cmd INT, cumul_montant INT); INSERT INTO stats_clients VALUES (1, 0, 0), (2, 1, 10000);\n-- VERIFY:\nINSERT INTO commandes VALUES (100, 1, 25000), (101, 2, 15000); SELECT client_id, nb_cmd, cumul_montant FROM stats_clients ORDER BY client_id;",
        "expected": "Instruction exécutée avec succès (2 lignes modifiées).\n\nInstruction exécutée avec succès (2 lignes modifiées).\n\n+-----------+--------+---------------+\n| client_id | nb_cmd | cumul_montant |\n+-----------+--------+---------------+\n| 1         | 1      | 25000         |\n| 2         | 2      | 25000         |\n+-----------+--------+---------------+\n(2 lignes retournées)"
      },
      {
        "label": "Trois commandes pour le même client",
        "stdin": "CREATE TABLE commandes (id INT, client_id INT, montant INT); CREATE TABLE stats_clients (client_id INT PRIMARY KEY, nb_cmd INT, cumul_montant INT); INSERT INTO stats_clients VALUES (10, 0, 0);\n-- VERIFY:\nINSERT INTO commandes VALUES (1, 10, 5000), (2, 10, 7000), (3, 10, 8000); SELECT client_id, nb_cmd, cumul_montant FROM stats_clients ORDER BY client_id;",
        "expected": "Instruction exécutée avec succès (1 ligne modifiée).\n\nInstruction exécutée avec succès (3 lignes modifiées).\n\n+-----------+--------+---------------+\n| client_id | nb_cmd | cumul_montant |\n+-----------+--------+---------------+\n| 10        | 3      | 20000         |\n+-----------+--------+---------------+\n(1 ligne retournée)"
      },
      {
        "label": "Deux clients dont un sans nouvelle commande",
        "stdin": "CREATE TABLE commandes (id INT, client_id INT, montant INT); CREATE TABLE stats_clients (client_id INT PRIMARY KEY, nb_cmd INT, cumul_montant INT); INSERT INTO stats_clients VALUES (1, 2, 50000), (2, 0, 0);\n-- VERIFY:\nINSERT INTO commandes VALUES (1, 2, 12000); SELECT client_id, nb_cmd, cumul_montant FROM stats_clients ORDER BY client_id;",
        "expected": "Instruction exécutée avec succès (2 lignes modifiées).\n\nInstruction exécutée avec succès (1 ligne modifiée).\n\n+-----------+--------+---------------+\n| client_id | nb_cmd | cumul_montant |\n+-----------+--------+---------------+\n| 1         | 2      | 50000         |\n| 2         | 1      | 12000         |\n+-----------+--------+---------------+\n(2 lignes retournées)"
      }
    ],
    "solution": "CREATE TRIGGER trg_maj_stats\nAFTER INSERT ON commandes\nFOR EACH ROW\nBEGIN\n  UPDATE stats_clients\n  SET nb_cmd = nb_cmd + 1, cumul_montant = cumul_montant + NEW.montant\n  WHERE client_id = NEW.client_id;\nEND;"
  }
];
