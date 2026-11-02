from dataclasses import dataclass, field


@dataclass(frozen=True)
class Case:
    identifier: str
    tables: dict
    program: str
    changes: tuple
    kind: str = 'query'
    meta: dict = field(default_factory=dict)

    def mutants(self):
        programs = []
        for original, replacement in self.changes:
            if self.program.count(original) != 1:
                raise ValueError(f'{self.identifier}: transformation ambiguë')
            program = self.program.replace(original, replacement, 1)
            if program == self.program:
                raise ValueError(f'{self.identifier}: transformation vide')
            programs.append(program)
        if len(programs) != 2 or len(set(programs)) != 2:
            raise ValueError(f'{self.identifier}: paire non distincte')
        return programs


def table(columns, *rows):
    return {'columns': columns, 'rows': list(rows)}


def case(identifier, tables, program, changes, kind='query', **meta):
    return Case(identifier, tables, program, tuple(changes), kind, meta)


def catalogue():
    return [
        case('sql2-c1-e1', {},
             'CREATE TABLE collaborateurs(id INT PRIMARY KEY, email TEXT UNIQUE NOT NULL, salaire INT CHECK(salaire >= 100000));',
             [('email TEXT UNIQUE NOT NULL', 'email TEXT NOT NULL'), ('salaire >= 100000', 'salaire > 100000')], 'ddl_collaborateurs'),
        case('sql2-c1-e2', {'services': table('id INT PRIMARY KEY, libelle TEXT', (1, 'Réseau'))},
             'CREATE TABLE projets(code TEXT PRIMARY KEY, titre TEXT NOT NULL, service_id INT REFERENCES services(id));',
             [('service_id INT REFERENCES services(id)', 'service_id INT'), ('titre TEXT NOT NULL', 'titre TEXT')], 'ddl_projets'),
        case('sql2-c1-e3', {},
             'CREATE TABLE affectations(employe_id INT, projet_id INT, heures INT NOT NULL, PRIMARY KEY (employe_id, projet_id));',
             [('heures INT NOT NULL', 'heures INT NOT NULL CHECK (heures > 0)'),
              ('PRIMARY KEY (employe_id, projet_id)', 'PRIMARY KEY (employe_id, projet_id), UNIQUE (employe_id)')], 'ddl_affectations'),
        case('sql2-c2-e1', {'clients': table('id INT, nom TEXT, ville TEXT', (2, 'Awa', 'Bafilo'), (1, 'Kossi', 'Aneho'))},
             'SELECT id, UPPER(nom) AS nom_maj, LENGTH(nom) AS nb_caracteres FROM clients ORDER BY id;',
             [('UPPER(nom)', 'nom'), ('LENGTH(nom)', 'LENGTH(ville)')]),
        case('sql2-c2-e2', {'factures': table('id INT, montant_ht REAL, remise REAL', (3, 80, None), (1, 100, 5), (2, 20, 0))},
             'SELECT id, montant_ht - COALESCE(remise, 0) AS montant_net FROM factures ORDER BY id;',
             [('COALESCE(remise, 0)', 'remise'), ('montant_ht -', 'montant_ht +')]),
        case('sql2-c2-e3', {'articles': table('id INT, libelle TEXT, prix_ht REAL', (2, 'Stylo', 9.99), (1, 'Clavier', 123.45))},
             'SELECT libelle, ROUND(prix_ht * 1.18, 2) AS prix_ttc FROM articles ORDER BY id;',
             [('1.18', '1.08'), ('prix_ht * 1.18, 2', 'prix_ht * 1.18, 1')]),
        case('sql2-c3-e1', {'serveurs': table('nom TEXT, cpu_pct INT', ('Delta', 85), ('Alpha', 60), ('Beta', 20), ('Gamma', 90))},
             "SELECT nom, cpu_pct, CASE WHEN cpu_pct >= 85 THEN 'CRITIQUE' WHEN cpu_pct >= 60 THEN 'ATTENTION' ELSE 'NORMAL' END AS etat FROM serveurs ORDER BY nom;",
             [('cpu_pct >= 85', 'cpu_pct > 85'), ('cpu_pct >= 60', 'cpu_pct > 60')]),
        case('sql2-c3-e2', {'employes': table('nom TEXT, salaire INT', ('Ada', 10), ('Benoit', 20), ('Chloe', 30), ('Dina', 40), ('Eli', 50))},
             'SELECT nom, salaire FROM employes WHERE salaire > (SELECT AVG(salaire) FROM employes) ORDER BY salaire DESC;',
             [('salaire > (SELECT', 'salaire >= (SELECT'), ('ORDER BY salaire DESC', 'ORDER BY salaire ASC')]),
        case('sql2-c3-e3', {'clients': table('id INT, nom TEXT', (901, 'Ena'), (902, 'Fara')),
                            'commandes': table('id INT, client_id INT', (901, 901), (902, None))},
             'SELECT c.id, c.nom FROM clients c WHERE NOT EXISTS (SELECT 1 FROM commandes o WHERE o.client_id = c.id) ORDER BY c.id;',
             [('NOT EXISTS (SELECT 1 FROM commandes o WHERE o.client_id = c.id)', 'c.id NOT IN (SELECT o.client_id FROM commandes o)'),
              ('o.client_id = c.id', 'o.client_id IS NOT NULL')]),
        case('sql2-c4-e1', {'employes': table('nom TEXT, departement TEXT, salaire INT', ('A', 'Dev', 100), ('B', 'Dev', 100), ('C', 'Dev', 80), ('D', 'Ops', 90), ('E', 'Ops', 70))},
             'SELECT nom, departement, salaire, RANK() OVER (PARTITION BY departement ORDER BY salaire DESC) AS rang FROM employes ORDER BY departement, rang;',
             [('RANK()', 'DENSE_RANK()'), ('PARTITION BY departement ORDER BY salaire DESC', 'ORDER BY salaire DESC')], 'rank'),
        case('sql2-c4-e2', {'recettes': table('jour INT, montant INT', (3, 8), (1, 3), (2, 5))},
             'SELECT jour, montant, SUM(montant) OVER (ORDER BY jour ASC) AS cumul FROM recettes ORDER BY jour;',
             [('SUM(montant)', 'COUNT(montant)'), ('OVER (ORDER BY jour ASC)', 'OVER (ORDER BY jour DESC)')]),
        case('sql2-c4-e3', {'ventes': table('vendeur TEXT, montant INT', ('A', 20000), ('A', 30000), ('B', 60000), ('B', 1000), ('C', 8000))},
             'WITH totaux AS (SELECT vendeur, SUM(montant) AS ca_total FROM ventes GROUP BY vendeur) SELECT vendeur, ca_total FROM totaux WHERE ca_total >= 50000 ORDER BY ca_total DESC;',
             [('ca_total >= 50000', 'ca_total > 50000'), ('SUM(montant)', 'MAX(montant)')]),
        case('sql2-c5-e1', {'comptes': table('id INT, titulaire TEXT, solde INT', (1, 'Emi', 15000), (2, 'Faro', 4300), (3, 'Gaia', 1700))},
             'UPDATE comptes SET solde = solde - 15000 WHERE id = 1; UPDATE comptes SET solde = solde + 15000 WHERE id = 2;',
             [('WHERE id = 1', 'WHERE id = 1 AND solde > 15000'), ('WHERE id = 2', 'WHERE id <> 1')], 'transfer'),
        case('sql2-c5-e2', {'commandes': table('id INT, statut TEXT', (10, 'ATTENTE'), (20, 'ATTENTE')),
                            'articles': table('id INT, stock INT', (1, 3), (2, 8))},
             "UPDATE commandes SET statut = 'VALIDEE' WHERE id = 10; UPDATE articles SET stock = stock - 3 WHERE id = 1;",
             [('WHERE id = 1;', 'WHERE id = 1 AND stock > 3;'), ('WHERE id = 10', 'WHERE id >= 10')], 'order_stock'),
        case('sql2-c5-e3', {'ecritures': table('tx_id INT, sens TEXT, montant INT', (801, 'DEBIT', 7), (801, 'CREDIT', 3), (802, 'CREDIT', 1))},
             "SELECT tx_id, SUM(CASE WHEN sens = 'DEBIT' THEN montant ELSE 0 END) AS total_debit, SUM(CASE WHEN sens = 'CREDIT' THEN montant ELSE 0 END) AS total_credit FROM ecritures GROUP BY tx_id ORDER BY tx_id;",
             [("CASE WHEN sens = 'DEBIT' THEN montant ELSE 0 END", "CASE WHEN sens = 'DEBIT' THEN montant ELSE NULL END"),
              ("CASE WHEN sens = 'CREDIT' THEN montant ELSE 0 END", "CASE WHEN sens = 'CREDIT' THEN 1 ELSE 0 END")]),
        case('sql2-c6-e1', {'employes': table('id INT, nom TEXT, departement TEXT, salaire INT', (1, 'A', 'Dev', 300000), (2, 'B', 'Ops', 350000), (3, 'C', 'Dev', 200000))},
             'CREATE VIEW vue_cadres AS SELECT id, nom, departement FROM employes WHERE salaire >= 300000;',
             [('salaire >= 300000', 'salaire > 300000'), ('salaire >= 300000', "salaire >= 300000 AND departement = 'IT'")], 'cadres'),
        case('sql2-c6-e2', {'comptes': table('id INT, solde INT', (1, 80), (2, 40)), 'journal_audit': table('compte_id INT, ancien_solde INT, nouveau_solde INT')},
             'CREATE TRIGGER trg_audit_solde AFTER UPDATE ON comptes BEGIN INSERT INTO journal_audit VALUES (OLD.id, OLD.solde, NEW.solde); END;',
             [('OLD.id, OLD.solde, NEW.solde', 'OLD.id, NEW.solde, NEW.solde'), ('OLD.id, OLD.solde, NEW.solde', 'OLD.id, OLD.solde, OLD.solde')], 'audit_trigger'),
        case('sql2-c6-e3', {'journaux': table('id INT, service TEXT, niveau TEXT, message TEXT', (2, 'auth', 'WARNING', 'A'), (1, 'auth', 'ERROR', 'B'), (3, 'api', 'ERROR', 'C'))},
             "CREATE INDEX idx_journaux_service_niveau ON journaux(service, niveau); SELECT id, message FROM journaux WHERE service = 'auth' AND niveau = 'ERROR' ORDER BY id;",
             [('ON journaux(service, niveau)', 'ON journaux(niveau, service)'),
              ('ON journaux(service, niveau)', "ON journaux(service, niveau) WHERE service = 'auth'")],
             'index', index='idx_journaux_service_niveau', columns=('service', 'niveau'), complete=True),
        case('sql3-c1-e1', {'wal_journal': table('lsn INT, tx_id INT, op TEXT', (1, 1, 'BEGIN'), (2, 1, 'UPDATE'), (3, 2, 'BEGIN'), (4, 2, 'COMMIT'), (5, 3, 'BEGIN'), (6, 3, 'ROLLBACK'), (7, 4, 'BEGIN'), (8, 4, 'UPDATE'), (9, None, 'COMMIT'), (10, None, 'UPDATE'))},
             "SELECT DISTINCT w.tx_id FROM wal_journal w WHERE w.tx_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM wal_journal fin WHERE fin.tx_id = w.tx_id AND fin.op IN ('COMMIT', 'ROLLBACK')) ORDER BY w.tx_id;",
             [('SELECT DISTINCT w.tx_id', 'SELECT w.tx_id'), ("IN ('COMMIT', 'ROLLBACK')", "IN ('COMMIT')")]),
        case('sql3-c1-e2', {'mvcc_tuples': table('tuple_id INT, xmin INT, xmax INT, valeur TEXT', (1, 49, 0, 'A'), (2, 50, 0, 'B'), (3, 20, 50, 'C'), (4, 30, 49, 'D'))},
             'SELECT tuple_id, valeur FROM mvcc_tuples WHERE xmin < 50 AND (xmax = 0 OR xmax >= 50) ORDER BY tuple_id;',
             [('xmin < 50', 'xmin <= 50'), ('xmax >= 50', 'xmax > 50')]),
        case('sql3-c1-e3', {'pg_locks_sim': table('pid INT, ressource TEXT, accorde INT', (10, 'A', 0), (20, 'A', 1), (11, 'B', 0), (21, 'B', 1))},
             'SELECT a.pid AS pid_bloque, d.pid AS pid_bloqueur, a.ressource FROM pg_locks_sim a JOIN pg_locks_sim d ON a.ressource = d.ressource WHERE a.accorde = 0 AND d.accorde = 1 ORDER BY a.pid;',
             [('ORDER BY a.pid', 'ORDER BY a.pid DESC'), ('a.ressource = d.ressource', '1 = 1')]),
        case('sql3-c2-e1', {'commandes': table('id INT, code_pays TEXT, email_client TEXT', (1, 'TG', 'a@x'), (2, 'TG', 'a@x'), (3, 'BJ', 'b@x'), (4, None, None))},
             'SELECT COUNT(*) AS total_lignes, COUNT(DISTINCT code_pays) AS card_pays, COUNT(DISTINCT email_client) AS card_email FROM commandes;',
             [('COUNT(DISTINCT code_pays)', 'COUNT(code_pays)'), ('COUNT(DISTINCT email_client)', 'COUNT(email_client)')]),
        case('sql3-c2-e2', {'commandes': table('id INT, client_id INT, statut TEXT, montant INT', (1, 10, 'EN_COURS', 80), (2, 10, 'LIVREE', 50), (3, 11, 'EN_COURS', 60))},
             "CREATE INDEX idx_cmd_en_cours ON commandes(client_id) WHERE statut = 'EN_COURS'; SELECT id, montant FROM commandes WHERE client_id = 10 AND statut = 'EN_COURS' ORDER BY id;",
             [("ON commandes(client_id) WHERE statut = 'EN_COURS'", 'ON commandes(client_id)'),
              ("ON commandes(client_id) WHERE statut = 'EN_COURS'", "ON commandes(statut) WHERE statut = 'EN_COURS'")],
             'index', index='idx_cmd_en_cours', columns=('client_id',), partial=True),
        case('sql3-c2-e3', {'pg_stat_user_tables_sim': table('relname TEXT, n_live_tup INT, n_dead_tup INT', ('borne', 100, 70), ('alerte', 100, 71), ('faible', 100, 60), ('haut', 200, 100))},
             'SELECT relname, n_live_tup, n_dead_tup FROM pg_stat_user_tables_sim WHERE n_dead_tup > 50 + 0.20 * n_live_tup ORDER BY n_dead_tup DESC;',
             [('n_dead_tup > 50', 'n_dead_tup >= 50'), ('0.20 * n_live_tup', '0.02 * n_live_tup')]),
        case('sql3-c3-e1', {'pg_class_sim': table('relname TEXT, relpages INT, reltuples INT', ('A', 10, 300), ('B', 7, 900), ('C', 4, 100))},
             'SELECT relname, ROUND(relpages * 1.0 + reltuples * 0.01, 2) AS cout_seq_scan FROM pg_class_sim ORDER BY cout_seq_scan ASC;',
             [('reltuples * 0.01', 'reltuples * 0.1'), ('ORDER BY cout_seq_scan ASC', 'ORDER BY cout_seq_scan DESC')]),
        case('sql3-c3-e2', {'pg_stat_database_sim': table('datname TEXT, blks_hit INT, blks_read INT', ('db_frac', 1, 2), ('db_sans_hit', 0, 5))},
             'SELECT datname, ROUND(blks_hit * 100.0 / (blks_hit + blks_read), 2) AS hit_ratio_pct FROM pg_stat_database_sim ORDER BY hit_ratio_pct DESC;',
             [('blks_hit * 100.0', 'blks_hit * 100'), ('FROM pg_stat_database_sim', 'FROM pg_stat_database_sim WHERE blks_hit > 0')]),
        case('sql3-c3-e3', {'commandes': table('id INT, annee INT, client_id INT, montant INT', (1, 2025, 1, 20), (2, 2024, 1, 70), (3, 2025, 2, 30))},
             'CREATE INDEX idx_cmd_annee_montant ON commandes(annee, montant); SELECT SUM(montant) AS total_2025 FROM commandes WHERE annee = 2025;',
             [('ON commandes(annee, montant)', 'ON commandes(montant, annee)'), ('annee = 2025', 'annee = 2024')],
             'index', index='idx_cmd_annee_montant', columns=('annee', 'montant')),
        case('sql3-c4-e1', {'chiffre_affaires': table('mois INT, ca INT', (3, 90), (1, 100), (2, 130))},
             'WITH suivi AS (SELECT mois, ca, LAG(ca, 1, 0) OVER (ORDER BY mois ASC) AS ca_precedent FROM chiffre_affaires) SELECT mois, ca, ca_precedent, ca - ca_precedent AS variation FROM suivi ORDER BY mois;',
             [('LAG(ca, 1, 0)', 'LEAD(ca, 1, 0)'), ('LAG(ca, 1, 0)', 'LAG(ca, 2, 0)')]),
        case('sql3-c4-e2', {'employes': table('nom TEXT, departement TEXT, salaire INT', ('A', 'Dev', 100), ('B', 'Dev', 100), ('C', 'Dev', 90), ('D', 'Ops', 50), ('E', 'Ops', 40))},
             'WITH rangs AS (SELECT nom, departement, salaire, DENSE_RANK() OVER (PARTITION BY departement ORDER BY salaire DESC) AS rang FROM employes) SELECT departement, nom, salaire, rang FROM rangs WHERE rang <= 2 ORDER BY departement, rang, nom;',
             [('DENSE_RANK()', 'RANK()'), ('PARTITION BY departement ORDER BY salaire DESC', 'ORDER BY salaire DESC')]),
        case('sql3-c4-e3', {'organigramme': table('id INT, nom TEXT, manager_id INT', (1, 'A', None), (2, 'B', 1), (3, 'C', 1), (4, 'D', 2))},
             'WITH RECURSIVE hierarchie AS (SELECT id, nom, 1 AS niveau FROM organigramme WHERE manager_id IS NULL UNION ALL SELECT e.id, e.nom, h.niveau + 1 FROM organigramme e JOIN hierarchie h ON e.manager_id = h.id) SELECT id, nom, niveau FROM hierarchie ORDER BY niveau, id;',
             [('ORDER BY niveau, id', 'ORDER BY niveau, id DESC'),
              ('JOIN hierarchie h ON e.manager_id = h.id', 'JOIN hierarchie h ON e.manager_id = h.id WHERE h.niveau < 2')]),
        case('sql3-c5-e1', {'comptes': table('id INT, solde INT', (1, 20), (2, 5)), 'alertes_fraude': table('compte_id INT, montant_tente INT')},
             'CREATE TRIGGER trg_alerte_decouvert AFTER UPDATE ON comptes WHEN NEW.solde < 0 BEGIN INSERT INTO alertes_fraude VALUES (NEW.id, NEW.solde); END;',
             [('NEW.solde < 0', 'NEW.solde <= 0'), ('NEW.id, NEW.solde', 'NEW.id, OLD.solde')], 'fraud_trigger'),
        case('sql3-c5-e2', {'contexte_session': table('tenant_actif TEXT, role_actif TEXT', ('A', 'MEMBRE')),
                            'dossiers_patients': table('id INT, tenant_id TEXT, patient TEXT', (1, 'A', 'P1'), (2, 'B', 'P2'), (3, 'A', 'P3'))},
             "CREATE VIEW v_dossiers_rls AS SELECT id, tenant_id, patient FROM dossiers_patients WHERE tenant_id = (SELECT tenant_actif FROM contexte_session) OR (SELECT role_actif FROM contexte_session) = 'SUPERADMIN';",
             [(') OR (SELECT role_actif', ') AND (SELECT role_actif'), ("= 'SUPERADMIN'", "= 'ADMIN'")], 'rls_view'),
        case('sql3-c5-e3', {'commandes': table('id INT, client_id INT, montant INT'), 'stats_clients': table('client_id INT PRIMARY KEY, nb_cmd INT, cumul_montant INT', (1, 0, 0), (2, 2, 50))},
             'CREATE TRIGGER trg_maj_stats AFTER INSERT ON commandes BEGIN UPDATE stats_clients SET nb_cmd = nb_cmd + 1, cumul_montant = cumul_montant + NEW.montant WHERE client_id = NEW.client_id; END;',
             [('cumul_montant + NEW.montant', 'NEW.montant'), ('client_id = NEW.client_id', 'client_id <= NEW.client_id')], 'stats_trigger'),
        case('sql3-c6-e1', {'mesures_iot': table('id INT, mois INT, valeur INT', (1, 3, 10), (2, 6, 20), (3, 9, 30), (4, 12, 40), (5, 1, 5), (6, 4, 7))},
             "SELECT CASE WHEN mois <= 3 THEN 'p_q1' WHEN mois <= 6 THEN 'p_q2' WHEN mois <= 9 THEN 'p_q3' ELSE 'p_q4' END AS partition_cible, COUNT(*) AS nb_lignes, SUM(valeur) AS total_valeurs FROM mesures_iot GROUP BY partition_cible ORDER BY partition_cible;",
             [('mois <= 3', 'mois < 3'), ('mois <= 6', 'mois < 6')]),
        case('sql3-c6-e2', {'pg_stat_replication_sim': table('application_name TEXT, sent_lsn_mb INT, replay_lsn_mb INT, sync_state TEXT', ('repl_b', 210, 210, 'sync'), ('repl_a', 230, 230, 'async'), ('repl_c', 320, 310, 'sync'))},
             'SELECT application_name, sync_state, sent_lsn_mb - replay_lsn_mb AS lag_mb FROM pg_stat_replication_sim ORDER BY lag_mb DESC, application_name;',
             [('sent_lsn_mb - replay_lsn_mb', 'replay_lsn_mb - sent_lsn_mb'), ('ORDER BY lag_mb DESC, application_name', 'ORDER BY lag_mb DESC, application_name DESC')]),
        case('sql3-c6-e3', {'cluster_nodes': table('node_name TEXT, role TEXT, healthy INT, received_lsn INT, priority INT', ('A', 'REPLICA', 1, 100, 1), ('B', 'REPLICA', 1, 90, 9), ('C', 'REPLICA', 0, 200, 10), ('D', 'PRIMARY', 1, 300, 20))},
             "SELECT node_name, received_lsn, priority FROM cluster_nodes WHERE role = 'REPLICA' AND healthy = 1 ORDER BY received_lsn DESC, priority DESC LIMIT 1;",
             [(' AND healthy = 1', ''), ('received_lsn DESC, priority DESC', 'priority DESC, received_lsn DESC')])
    ]


if __name__ == '__main__':
    for item in catalogue():
        print(f'{item.identifier}\t{len(item.mutants())}')
