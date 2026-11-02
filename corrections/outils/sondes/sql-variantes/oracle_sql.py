import json
import os
import sqlite3
import sys
import time
from collections import defaultdict

from cas_sql import catalogue


def isolated():
    try:
        with open('/proc/1/comm', encoding='utf-8') as process_name:
            owner = process_name.read().strip()
        host_network = os.environ.get('REVI_AUDIT_NET_NS_HOTE')
        return (owner == 'bwrap' and bool(host_network) and
                os.readlink('/proc/self/ns/net') != host_network and
                os.environ.get('HOME') == '/tmp' and not os.path.exists('/home'))
    except OSError:
        return False


def rows(item, name):
    return item.tables[name]['rows']


def oracle(item):
    identifier = item.identifier
    if identifier == 'sql2-c1-e1':
        return (True, False, False, False)
    if identifier == 'sql2-c1-e2':
        return (True, False, False)
    if identifier == 'sql2-c1-e3':
        return (True, False, False, True)
    if identifier == 'sql2-c2-e1':
        return [(ident, name.upper(), len(name)) for ident, name, city in sorted(rows(item, 'clients'))]
    if identifier == 'sql2-c2-e2':
        return [(ident, amount - (discount or 0)) for ident, amount, discount in sorted(rows(item, 'factures'))]
    if identifier == 'sql2-c2-e3':
        return [(label, round(price * 1.18, 2)) for ident, label, price in sorted(rows(item, 'articles'))]
    if identifier == 'sql2-c3-e1':
        return [(name, usage, 'CRITIQUE' if usage >= 85 else 'ATTENTION' if usage >= 60 else 'NORMAL')
                for name, usage in sorted(rows(item, 'serveurs'))]
    if identifier == 'sql2-c3-e2':
        employees = rows(item, 'employes')
        average = sum(salary for name, salary in employees) / len(employees)
        return sorted([(name, salary) for name, salary in employees if salary > average], key=lambda entry: -entry[1])
    if identifier == 'sql2-c3-e3':
        customers_with_orders = {customer for order, customer in rows(item, 'commandes')}
        return [(ident, name) for ident, name in sorted(rows(item, 'clients')) if ident not in customers_with_orders]
    if identifier == 'sql2-c4-e1':
        employees = rows(item, 'employes')
        ranked = [(name, department, salary, 1 + sum(other_salary > salary for other_name, other_department, other_salary in employees
                                                    if other_department == department))
                  for name, department, salary in employees]
        return sorted(ranked, key=lambda entry: (entry[1], entry[3], entry[0]))
    if identifier == 'sql2-c4-e2':
        output = []
        total = 0
        for day, amount in sorted(rows(item, 'recettes')):
            total += amount
            output.append((day, amount, total))
        return output
    if identifier == 'sql2-c4-e3':
        totals = defaultdict(int)
        for seller, amount in rows(item, 'ventes'):
            totals[seller] += amount
        return sorted([(seller, total) for seller, total in totals.items() if total >= 50000], key=lambda entry: -entry[1])
    if identifier == 'sql2-c5-e1':
        return [(ident, balance - 15000 if ident == 1 else balance + 15000 if ident == 2 else balance)
                for ident, owner, balance in sorted(rows(item, 'comptes'))]
    if identifier == 'sql2-c5-e2':
        orders = [(ident, 'VALIDEE' if ident == 10 else status) for ident, status in sorted(rows(item, 'commandes'))]
        articles = [(ident, stock - 3 if ident == 1 else stock) for ident, stock in sorted(rows(item, 'articles'))]
        return (orders, articles)
    if identifier == 'sql2-c5-e3':
        totals = defaultdict(lambda: [0, 0])
        for transaction, direction, amount in rows(item, 'ecritures'):
            totals[transaction][0 if direction == 'DEBIT' else 1] += amount
        return [(transaction, totals[transaction][0], totals[transaction][1]) for transaction in sorted(totals)]
    if identifier == 'sql2-c6-e1':
        return [(ident, name, department) for ident, name, department, salary in sorted(rows(item, 'employes'))
                if salary >= 300000]
    if identifier == 'sql2-c6-e2':
        accounts = dict(rows(item, 'comptes'))
        return [(1, accounts[1], accounts[1] + 25), (2, accounts[2], accounts[2] - 7)]
    if identifier == 'sql2-c6-e3':
        result = [(ident, message) for ident, service, level, message in sorted(rows(item, 'journaux'))
                  if service == 'auth' and level == 'ERROR']
        return (result, ('service', 'niveau'), False)
    if identifier == 'sql3-c1-e1':
        entries = rows(item, 'wal_journal')
        completed = {transaction for lsn, transaction, operation in entries
                     if transaction is not None and operation in ('COMMIT', 'ROLLBACK')}
        transactions = {transaction for lsn, transaction, operation in entries if transaction is not None}
        return [(transaction,) for transaction in sorted(transactions - completed)]
    if identifier == 'sql3-c1-e2':
        return [(ident, value) for ident, created, deleted, value in sorted(rows(item, 'mvcc_tuples'))
                if created < 50 and (deleted == 0 or deleted >= 50)]
    if identifier == 'sql3-c1-e3':
        locks = rows(item, 'pg_locks_sim')
        return sorted([(waiting_pid, holder_pid, resource) for waiting_pid, resource, waiting_granted in locks
                       for holder_pid, holder_resource, holder_granted in locks
                       if waiting_granted == 0 and holder_granted == 1 and resource == holder_resource])
    if identifier == 'sql3-c2-e1':
        orders = rows(item, 'commandes')
        countries = {country for ident, country, email in orders if country is not None}
        emails = {email for ident, country, email in orders if email is not None}
        return [(len(orders), len(countries), len(emails))]
    if identifier == 'sql3-c2-e2':
        result = [(ident, amount) for ident, customer, status, amount in sorted(rows(item, 'commandes'))
                  if customer == 10 and status == 'EN_COURS']
        return (result, ('client_id',), True)
    if identifier == 'sql3-c2-e3':
        return sorted([(name, live, dead) for name, live, dead in rows(item, 'pg_stat_user_tables_sim')
                       if dead > 50 + 0.20 * live], key=lambda entry: -entry[2])
    if identifier == 'sql3-c3-e1':
        return sorted([(name, round(pages + tuples * 0.01, 2)) for name, pages, tuples in rows(item, 'pg_class_sim')],
                      key=lambda entry: entry[1])
    if identifier == 'sql3-c3-e2':
        return sorted([(name, round(hits * 100.0 / (hits + reads), 2))
                       for name, hits, reads in rows(item, 'pg_stat_database_sim')], key=lambda entry: -entry[1])
    if identifier == 'sql3-c3-e3':
        total = sum(amount for ident, year, customer, amount in rows(item, 'commandes') if year == 2025)
        return ([(total,)], ('annee', 'montant'))
    if identifier == 'sql3-c4-e1':
        previous = 0
        output = []
        for month, turnover in sorted(rows(item, 'chiffre_affaires')):
            output.append((month, turnover, previous, turnover - previous))
            previous = turnover
        return output
    if identifier == 'sql3-c4-e2':
        employees = rows(item, 'employes')
        ranked = []
        for name, department, salary in employees:
            distinct = sorted({other_salary for other_name, other_department, other_salary in employees
                               if other_department == department}, reverse=True)
            rank = distinct.index(salary) + 1
            if rank <= 2:
                ranked.append((department, name, salary, rank))
        return sorted(ranked, key=lambda entry: (entry[0], entry[3], entry[1]))
    if identifier == 'sql3-c4-e3':
        people = rows(item, 'organigramme')
        frontier = [(ident, name, 1) for ident, name, manager in people if manager is None]
        result = []
        while frontier:
            result.extend(frontier)
            frontier = [(ident, name, depth + 1) for parent, parent_name, depth in frontier
                        for ident, name, manager in people if manager == parent]
        return sorted(result, key=lambda entry: (entry[2], entry[0]))
    if identifier == 'sql3-c5-e1':
        updates = [(1, -5), (2, 0)]
        return [(ident, balance) for ident, balance in updates if balance < 0]
    if identifier == 'sql3-c5-e2':
        dossiers = sorted(rows(item, 'dossiers_patients'))
        tenant = rows(item, 'contexte_session')[0][0]
        return ([entry for entry in dossiers if entry[1] == tenant], dossiers)
    if identifier == 'sql3-c5-e3':
        totals = {client: [count, amount] for client, count, amount in rows(item, 'stats_clients')}
        for ident, client, amount in [(1, 1, 20), (2, 1, 30), (3, 2, 7)]:
            totals[client][0] += 1
            totals[client][1] += amount
        return [(client, totals[client][0], totals[client][1]) for client in sorted(totals)]
    if identifier == 'sql3-c6-e1':
        partitions = defaultdict(list)
        for ident, month, value in rows(item, 'mesures_iot'):
            partitions[f'p_q{(month - 1) // 3 + 1}'].append(value)
        return [(key, len(partitions[key]), sum(partitions[key])) for key in sorted(partitions)]
    if identifier == 'sql3-c6-e2':
        result = [(name, state, sent - replay) for name, sent, replay, state in rows(item, 'pg_stat_replication_sim')]
        return sorted(result, key=lambda entry: (-entry[2], entry[0]))
    if identifier == 'sql3-c6-e3':
        nodes = [(name, received, priority) for name, role, healthy, received, priority in rows(item, 'cluster_nodes')
                 if role == 'REPLICA' and healthy == 1]
        return sorted(nodes, key=lambda entry: (-entry[1], -entry[2]))[:1]
    raise ValueError(f'Oracle absent : {identifier}')


def make_database(item):
    database = sqlite3.connect(':memory:', isolation_level=None)
    database.execute('PRAGMA foreign_keys=ON')
    for name, specification in item.tables.items():
        database.execute(f'CREATE TABLE {name} ({specification["columns"]})')
        for entry in specification['rows']:
            placeholders = ','.join('?' for value in entry)
            database.execute(f'INSERT INTO {name} VALUES ({placeholders})', entry)
    return database


def execute_sql(database, program):
    output = []
    buffer = ''
    for character in program:
        buffer += character
        if character == ';' and sqlite3.complete_statement(buffer):
            cursor = database.execute(buffer)
            if cursor.description:
                output = cursor.fetchall()
            buffer = ''
    if buffer.strip():
        cursor = database.execute(buffer)
        if cursor.description:
            output = cursor.fetchall()
    return output


def accepts(database, sql, values):
    database.execute('SAVEPOINT probe')
    try:
        database.execute(sql, values)
        accepted = True
    except sqlite3.IntegrityError:
        accepted = False
    finally:
        database.execute('ROLLBACK TO probe')
        database.execute('RELEASE probe')
    return accepted


def index_supports_filter(database, index, condition):
    try:
        database.execute(f'SELECT COUNT(*) FROM commandes INDEXED BY {index} WHERE {condition}').fetchone()
        return True
    except sqlite3.OperationalError:
        return False


def observed(item, database, output):
    if item.kind == 'query':
        return output
    if item.kind == 'rank':
        return sorted(output, key=lambda entry: (entry[1], entry[3], entry[0]))
    if item.kind == 'ddl_collaborateurs':
        database.execute('INSERT INTO collaborateurs VALUES (?, ?, ?)', (1, 'seed@x', 120000))
        sql = 'INSERT INTO collaborateurs VALUES (?, ?, ?)'
        return (accepts(database, sql, (2, 'new@x', 100000)),
                accepts(database, sql, (3, 'seed@x', 120000)),
                accepts(database, sql, (4, 'low@x', 99999)),
                accepts(database, sql, (5, None, 120000)))
    if item.kind == 'ddl_projets':
        sql = 'INSERT INTO projets VALUES (?, ?, ?)'
        return (accepts(database, sql, ('A', 'Projet', 1)),
                accepts(database, sql, ('B', 'Projet', 99)),
                accepts(database, sql, ('C', None, 1)))
    if item.kind == 'ddl_affectations':
        database.execute('INSERT INTO affectations VALUES (?, ?, ?)', (1, 1, 2))
        sql = 'INSERT INTO affectations VALUES (?, ?, ?)'
        return (accepts(database, sql, (1, 2, 3)),
                accepts(database, sql, (2, 2, None)),
                accepts(database, sql, (1, 1, 4)),
                accepts(database, sql, (3, 3, 0)))
    if item.kind == 'transfer':
        return database.execute('SELECT id, solde FROM comptes ORDER BY id').fetchall()
    if item.kind == 'order_stock':
        return (database.execute('SELECT id, statut FROM commandes ORDER BY id').fetchall(),
                database.execute('SELECT id, stock FROM articles ORDER BY id').fetchall())
    if item.kind == 'cadres':
        return database.execute('SELECT id, nom, departement FROM vue_cadres ORDER BY id').fetchall()
    if item.kind == 'audit_trigger':
        database.execute('UPDATE comptes SET solde = solde + 25 WHERE id = 1')
        database.execute('UPDATE comptes SET solde = solde - 7 WHERE id = 2')
        return database.execute('SELECT compte_id, ancien_solde, nouveau_solde FROM journal_audit ORDER BY compte_id').fetchall()
    if item.kind == 'fraud_trigger':
        database.execute('UPDATE comptes SET solde = -5 WHERE id = 1')
        database.execute('UPDATE comptes SET solde = 0 WHERE id = 2')
        return database.execute('SELECT compte_id, montant_tente FROM alertes_fraude ORDER BY compte_id').fetchall()
    if item.kind == 'rls_view':
        sql = 'SELECT id, tenant_id, patient FROM v_dossiers_rls ORDER BY id'
        ordinary = database.execute(sql).fetchall()
        database.execute("UPDATE contexte_session SET role_actif = 'SUPERADMIN'")
        return (ordinary, database.execute(sql).fetchall())
    if item.kind == 'stats_trigger':
        database.executemany('INSERT INTO commandes VALUES (?, ?, ?)', [(1, 1, 20), (2, 1, 30), (3, 2, 7)])
        return database.execute('SELECT client_id, nb_cmd, cumul_montant FROM stats_clients ORDER BY client_id').fetchall()
    if item.kind == 'index':
        index = item.meta['index']
        columns = tuple(entry[2] for entry in database.execute(f'PRAGMA index_info({index})').fetchall())
        if item.meta.get('complete'):
            entries = database.execute("PRAGMA index_list('journaux')").fetchall()
            return (output, columns, any(entry[1] == index and entry[4] == 1 for entry in entries))
        if item.meta.get('partial'):
            entries = database.execute("PRAGMA index_list('commandes')").fetchall()
            partial = any(entry[1] == index and entry[4] == 1 for entry in entries)
            included = index_supports_filter(database, index, "statut = 'EN_COURS'")
            excluded = not index_supports_filter(database, index, "statut = 'ANNULEE'")
            predicate = partial and included and excluded
            return (output, columns, predicate)
        return (output, columns)
    raise ValueError(f'Observation absente : {item.identifier}')


def run():
    if not isolated():
        raise RuntimeError('Exécution refusée hors bubblewrap isolé sans réseau')
    results = []
    for item in catalogue():
        expected = oracle(item)
        baseline_database = make_database(item)
        baseline_deadline = time.monotonic() + 3
        baseline_database.set_progress_handler(lambda: int(time.monotonic() >= baseline_deadline), 1000)
        try:
            baseline_output = execute_sql(baseline_database, item.program)
            baseline_state = 'conforme' if observed(item, baseline_database, baseline_output) == expected else 'divergente'
        except sqlite3.Error:
            baseline_state = 'erreur_runtime'
        finally:
            baseline_database.close()
        variants = []
        for program in item.mutants():
            database = make_database(item)
            deadline = time.monotonic() + 3
            database.set_progress_handler(lambda: int(time.monotonic() >= deadline), 1000)
            try:
                result = execute_sql(database, program)
                actual = observed(item, database, result)
                state = 'rejetee' if actual != expected else 'acceptee'
            except sqlite3.Error:
                state = 'erreur_runtime'
            finally:
                database.close()
            variants.append({'code': program, 'oracle': state})
        results.append({'id': item.identifier, 'reference_independante': baseline_state, 'variants': variants})
    return results


if __name__ == '__main__':
    try:
        json.dump(run(), sys.stdout, ensure_ascii=False)
    except Exception:
        print('Erreur de confinement ou de préparation du banc.', file=sys.stderr)
        sys.exit(2)
