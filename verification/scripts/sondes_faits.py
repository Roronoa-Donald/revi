#!/usr/bin/env python3
"""Sondes factuelles synthétiques, sans base ou service utilisateur."""

import collections
import json
import sqlite3
import subprocess

database = sqlite3.connect(':memory:')
database.execute('CREATE TABLE produits (prix INTEGER CHECK (prix > 0))')
database.execute('INSERT INTO produits (prix) VALUES (NULL)')
null_accepted = database.execute('SELECT prix IS NULL FROM produits').fetchone()[0] == 1
try:
    database.execute('INSERT INTO produits (prix) VALUES (0)')
    zero_rejected = False
except sqlite3.IntegrityError:
    zero_rejected = True

reachable = database.execute('''WITH RECURSIVE nodes(value) AS (
  SELECT 1
  UNION
  SELECT CASE value WHEN 1 THEN 2 ELSE 1 END FROM nodes
) SELECT value FROM nodes ORDER BY value''').fetchall()

database.executescript('''
CREATE TABLE article (id INTEGER);
CREATE TABLE audit_avant (id INTEGER);
CREATE TABLE audit_apres (id INTEGER);
CREATE TRIGGER journal_avant BEFORE INSERT ON article BEGIN
  INSERT INTO audit_avant VALUES (NEW.id);
END;
CREATE TRIGGER journal_apres AFTER INSERT ON article BEGIN
  INSERT INTO audit_apres VALUES (NEW.id);
END;
''')
database.commit()
database.execute('BEGIN')
database.execute('INSERT INTO article VALUES (1)')
database.rollback()
after_rollback = [database.execute('SELECT COUNT(*) FROM ' + table).fetchone()[0]
                  for table in ('article', 'audit_avant', 'audit_apres')]
database.execute('BEGIN')
database.execute('INSERT INTO article VALUES (2)')
database.commit()
after_commit = [database.execute('SELECT COUNT(*) FROM ' + table).fetchone()[0]
                for table in ('article', 'audit_avant', 'audit_apres')]

def ssh_config(arguments):
    completed = subprocess.run(['ssh', '-F', '/dev/null', '-G', *arguments],
                               capture_output=True, text=True, timeout=5, check=True)
    return dict(line.split(' ', 1) for line in completed.stdout.splitlines()
                if line.startswith(('hostname ', 'port ')))

frequencies = collections.Counter([1, 1, 2, 2, 3])
maximum = max(frequencies.values())
print(json.dumps({
    'sqlite_version': sqlite3.sqlite_version,
    'check_null_accepte': null_accepted,
    'check_zero_refuse': zero_rejected,
    'union_cycle_termine': [row[0] for row in reachable],
    'trigger_compteurs_apres_rollback': after_rollback,
    'trigger_compteurs_apres_commit': after_commit,
    'ssh_destination_sans_p': ssh_config(['utilisateur@exemple.local:2222']),
    'ssh_avec_p': ssh_config(['-p', '2222', 'utilisateur@exemple.local']),
    'serie_bimodale': [value for value, count in frequencies.items() if count == maximum]
}, ensure_ascii=False, indent=2))
