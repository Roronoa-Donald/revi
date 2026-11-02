import json
import os
import sqlite3
import sys

sys.path.insert(0, '/project/corrections/outils/sondes/sql-variantes')
from cas_sql import case, catalogue, table
from oracle_sql import observed, oracle


def isolation():
    assert open('/proc/1/comm', encoding='utf-8').read().strip() == 'bwrap'
    assert 'HOME' not in os.environ
    assert not os.path.exists('/home') and not os.path.exists('/root')
    assert os.readlink('/proc/self/ns/net') != os.environ['REVI_AUDIT_NET_NS_HOTE']
    with open('/proc/self/status', encoding='utf-8') as status:
        caps = [line.split()[1] for line in status if line.startswith(('CapEff:', 'CapPrm:', 'CapBnd:'))]
    assert caps == ['0000000000000000'] * 3


def literal(value):
    if value is None:
        return 'NULL'
    if isinstance(value, int):
        return str(value)
    assert isinstance(value, str)
    return "'" + value.replace("'", "''") + "'"


def setup_for(tables):
    statements = []
    for name, definition in tables.items():
        statements.append(f'CREATE TABLE {name} ({definition["columns"]});')
        if definition['rows']:
            values = ',\n  '.join('(' + ', '.join(literal(value) for value in entry) + ')'
                                  for entry in definition['rows'])
            statements.append(f'INSERT INTO {name} VALUES\n  {values};')
    return '\n'.join(statements)


def database_for(tables):
    database = sqlite3.connect(':memory:')
    database.execute('PRAGMA foreign_keys=ON')
    database.executescript(setup_for(tables))
    return database


def query_case(identifier, label, tables, columns, independent_sql, target, other_case, explanation):
    item = case(identifier, tables, '', [])
    python_rows = oracle(item)
    assert isinstance(python_rows, list)
    database = database_for(tables)
    cursor = database.execute(independent_sql)
    sqlite_columns = [column[0] for column in cursor.description]
    sqlite_rows = cursor.fetchall()
    database.close()
    assert sqlite_columns == columns, (identifier, sqlite_columns, columns)
    assert sqlite_rows == python_rows, (identifier, sqlite_rows, python_rows)
    return {
        'id': identifier,
        'label': label,
        'stdin': setup_for(tables),
        'columns': columns,
        'rows': python_rows,
        'instruction_changes': [],
        'oracle_python': python_rows,
        'oracle_sqlite': {'query': independent_sql, 'rows': sqlite_rows},
        'mutation_rejetee': target,
        'temoin_existant_autre_mutation': other_case,
        'justification': explanation,
        'tables': tables,
    }


def ddl_case():
    identifier = 'sql2-c1-e2'
    setup = 'CREATE TABLE services (id INT PRIMARY KEY, libelle TEXT);'
    verification = ("INSERT INTO projets (code, titre, service_id) VALUES ('ref-valide', 'Atelier', NULL);\n"
                    "INSERT OR IGNORE INTO projets (code, titre, service_id) VALUES ('ref-sans-titre', NULL, NULL);\n"
                    'SELECT COUNT(*) AS titres_absents FROM projets WHERE titre IS NULL;')
    reference_schema = ('CREATE TABLE projets (code TEXT PRIMARY KEY, titre TEXT NOT NULL, service_id INT, '
                        'FOREIGN KEY (service_id) REFERENCES services(id));')
    item = case(identifier, {'services': table('id INT PRIMARY KEY, libelle TEXT', (1, 'Direction'))}, '', [], 'ddl_projets')
    semantic_db = database_for(item.tables)
    semantic_db.execute(reference_schema)
    python_oracle = oracle(item)
    sqlite_probes = observed(item, semantic_db, [])
    assert python_oracle == sqlite_probes == (True, False, False)
    semantic_db.close()
    database = sqlite3.connect(':memory:')
    database.execute('PRAGMA foreign_keys=ON')
    database.executescript(setup)
    database.execute(reference_schema)
    counts = [database.execute('SELECT changes()').fetchone()[0]]
    statements = verification.split('\n')
    for statement in statements[:-1]:
        database.execute(statement)
        counts.append(database.execute('SELECT changes()').fetchone()[0])
    cursor = database.execute(statements[-1])
    columns = [entry[0] for entry in cursor.description]
    output = cursor.fetchall()
    assert counts == [0, 1, 0] and output == [(0,)]
    database.close()
    return {
        'id': identifier,
        'label': 'Titre NULL interdit malgré une référence facultative',
        'stdin': setup + '\n-- VERIFY:\n' + verification,
        'columns': columns,
        'rows': output,
        'instruction_changes': counts,
        'oracle_python': {'insertion_valide': python_oracle[0], 'fk_inconnue': python_oracle[1],
                          'titre_null': python_oracle[2]},
        'oracle_sqlite': {'schema_du_sujet': reference_schema, 'verification': verification,
                          'changes': counts, 'rows': output, 'probes': sqlite_probes},
        'mutation_rejetee': 2,
        'temoin_existant_autre_mutation': 4,
        'justification': 'Le service NULL est permis ; un titre NULL est interdit. Une insertion valide réussit, puis INSERT OR IGNORE ignore le titre NULL : aucune ligne de titre absent.',
        'tables': {'services': table('id INT PRIMARY KEY, libelle TEXT')},
    }


def build():
    isolation()
    entries = [ddl_case()]
    entries.append(query_case(
        'sql2-c3-e2', 'Tri décroissant de trois salaires supérieurs à la moyenne',
        {'employes': table('nom TEXT, salaire INT', ('Sira', 180000), ('Malik', 220000),
                          ('Laura', 240000), ('Yara', 270000), ('Fode', 300000), ('Naya', 350000))},
        ['nom', 'salaire'],
        'SELECT nom, salaire FROM employes WHERE salaire * (SELECT COUNT(*) FROM employes) > '
        '(SELECT SUM(salaire) FROM employes) ORDER BY -salaire;', 2, 3,
        'La moyenne vaut 260000 sans salaire égal ; les trois salaires retenus sont 350000, 300000 et 270000 dans cet ordre.'))
    entries.append(query_case(
        'sql2-c4-e3', 'Deux totaux admissibles composés de plusieurs ventes',
        {'ventes': table('vendeur TEXT, montant INT', ('Rama', 24000), ('Rama', 37000),
                         ('Dede', 35000), ('Dede', 18000), ('Solo', 13000))},
        ['vendeur', 'ca_total'],
        'SELECT vendeur, SUM(montant) AS ca_total FROM ventes GROUP BY vendeur '
        'HAVING SUM(montant) >= 50000 ORDER BY SUM(montant) DESC;', 2, 4,
        'Rama totalise 61000 et Dede 53000, sans vente individuelle à 50000 ; aucun total ne vaut exactement le seuil.'))
    entries.append(query_case(
        'sql3-c1-e3', 'Un verrou en attente parmi trois ressources détenues',
        {'pg_locks_sim': table('pid INT, ressource TEXT, accorde INT', (412, 'factures', 1),
                               (515, 'stocks', 1), (28, 'journaux', 1), (315, 'factures', 0))},
        ['pid_bloque', 'pid_bloqueur', 'ressource'],
        'SELECT attente.pid AS pid_bloque, detenteur.pid AS pid_bloqueur, attente.ressource '
        'FROM pg_locks_sim attente, pg_locks_sim detenteur '
        'WHERE attente.accorde = 0 AND detenteur.accorde = 1 AND attente.ressource = detenteur.ressource '
        'ORDER BY attente.pid;', 2, 3,
        'Seul 315 attend factures détenue par 412 ; les verrous stocks et journaux ne sont pas des bloqueurs de cette ressource.'))
    entries.append(query_case(
        'sql3-c2-e3', 'Taux de tuples morts entre les deux formules',
        {'pg_stat_user_tables_sim': table('relname TEXT, n_live_tup INT, n_dead_tup INT',
                                         ('actives', 300, 111), ('archive', 1000, 100),
                                         ('stable', 250, 54), ('proche', 400, 129))},
        ['relname', 'n_live_tup', 'n_dead_tup'],
        'SELECT relname, n_live_tup, n_dead_tup FROM pg_stat_user_tables_sim '
        'WHERE 5 * n_dead_tup > 250 + n_live_tup ORDER BY n_dead_tup DESC;', 2, 4,
        'Les seuils réels sont 110, 250, 100 et 130 : seule actives les dépasse, aucune ligne ne tombe exactement sur le seuil.'))
    entries.append(query_case(
        'sql3-c4-e3', 'Chaîne hiérarchique de quatre niveaux',
        {'organigramme': table('id INT, nom TEXT, manager_id INT', (40, 'Direction', None),
                               (13, 'Equipe', 40), (72, 'Analyste', 13), (9, 'Tech', 72))},
        ['id', 'nom', 'niveau'],
        'SELECT e.id AS id, e.nom AS nom, 1 AS niveau FROM organigramme e WHERE e.manager_id IS NULL '
        'UNION ALL SELECT e.id, e.nom, 2 FROM organigramme e JOIN organigramme p ON e.manager_id = p.id WHERE p.manager_id IS NULL '
        'UNION ALL SELECT e.id, e.nom, 3 FROM organigramme e JOIN organigramme p ON e.manager_id = p.id '
        'JOIN organigramme g ON p.manager_id = g.id WHERE g.manager_id IS NULL '
        'UNION ALL SELECT e.id, e.nom, 4 FROM organigramme e JOIN organigramme p ON e.manager_id = p.id '
        'JOIN organigramme g ON p.manager_id = g.id JOIN organigramme r ON g.manager_id = r.id WHERE r.manager_id IS NULL '
        'ORDER BY niveau, id;', 2, 3,
        'La chaîne compte un employé par niveau, jusqu’au quatrième : inverser le tri des id ne change rien, arrêter la récursion après le niveau 2 en omet deux.'))
    entries.append(query_case(
        'sql3-c6-e1', 'Mars inclus dans le premier trimestre',
        {'mesures_iot': table('id INT, mois INT, valeur INT', (11, 1, 4), (12, 3, 9),
                              (13, 4, 6), (14, 8, 12), (15, 10, 3))},
        ['partition_cible', 'nb_lignes', 'total_valeurs'],
        "SELECT printf('p_q%d', CAST((mois - 1) / 3 AS INT) + 1) AS partition_cible, "
        'COUNT(*) AS nb_lignes, SUM(valeur) AS total_valeurs FROM mesures_iot '
        'GROUP BY partition_cible ORDER BY partition_cible;', 1, 4,
        'Janvier et mars forment p_q1 avec 2 lignes et 13 au total ; aucun mois de juin ne peut activer l’autre mutation.'))
    entries.append(query_case(
        'sql3-c6-e3', 'LSN prioritaire et départage de réplicas sains',
        {'cluster_nodes': table('node_name TEXT, role TEXT, healthy INT, received_lsn INT, priority INT',
                                ('primaire', 'PRIMARY', 0, 9900, 100), ('mistral', 'REPLICA', 1, 7900, 95),
                                ('boreal', 'REPLICA', 1, 8100, 20), ('sirocco', 'REPLICA', 1, 8100, 40))},
        ['node_name', 'received_lsn', 'priority'],
        'SELECT n.node_name, n.received_lsn, n.priority FROM cluster_nodes n '
        "WHERE n.role = 'REPLICA' AND n.healthy = 1 AND NOT EXISTS ("
        "SELECT 1 FROM cluster_nodes autre WHERE autre.role = 'REPLICA' AND autre.healthy = 1 "
        'AND (autre.received_lsn > n.received_lsn OR '
        '(autre.received_lsn = n.received_lsn AND autre.priority > n.priority)));', 2, 3,
        'Tous les réplicas sont sains ; à LSN 8100, sirocco gagne par priorité 40, devant boreal, tandis que mistral a une priorité supérieure mais un LSN inférieur.'))

    fixture = {item.identifier: item for item in catalogue()}
    variants = {entry['id']: {'reference_du_banc': fixture[entry['id']].program,
                              'codes': fixture[entry['id']].mutants()} for entry in entries}
    return {'sqlite_version': sqlite3.sqlite_version, 'cas': entries, 'variantes': variants}


if __name__ == '__main__':
    json.dump(build(), sys.stdout, ensure_ascii=False, indent=2)
    sys.stdout.write('\n')
