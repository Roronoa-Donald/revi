import json
import sqlite3


connection = sqlite3.connect(':memory:')
connection.executescript('''
CREATE TABLE produits(nom TEXT, prix INT);
INSERT INTO produits VALUES ('Cable simple', 2000), ('SuperCable', 2000);
CREATE TABLE mvcc_tuples(tuple_id INT, xmin INT, xmax INT, valeur TEXT);
INSERT INTO mvcc_tuples VALUES (1, 49, 50, 'borne');
CREATE TABLE commandes(id INT, annee INT, client_id INT, montant INT);
CREATE INDEX index_attendu ON commandes(annee, montant);
CREATE INDEX index_inverse ON commandes(montant, annee);
''')

prefixe = connection.execute("SELECT nom FROM produits WHERE prix BETWEEN 1000 AND 50000 AND nom LIKE 'Cable%' ORDER BY nom").fetchall()
contient = connection.execute("SELECT nom FROM produits WHERE prix BETWEEN 1000 AND 50000 AND nom LIKE '%Cable%' ORDER BY nom").fetchall()
borne_incluse = connection.execute('SELECT tuple_id FROM mvcc_tuples WHERE xmin < 50 AND (xmax = 0 OR xmax >= 50)').fetchall()
borne_exclue = connection.execute('SELECT tuple_id FROM mvcc_tuples WHERE xmin < 50 AND (xmax = 0 OR xmax > 50)').fetchall()
index_attendu = [row[2] for row in connection.execute('PRAGMA index_info(index_attendu)')]
index_inverse = [row[2] for row in connection.execute('PRAGMA index_info(index_inverse)')]

result = {
    'prefixe_vs_sous_chaine': {'resultats_attendus': prefixe, 'resultats_errones': contient},
    'snapshot_modele_simplifie_borne_50': {'resultats_attendus': borne_incluse, 'resultats_errones': borne_exclue},
    'ordre_colonnes_index': {'ordre_demande': index_attendu, 'ordre_errone': index_inverse}
}
assert prefixe == [('Cable simple',)] and ('SuperCable',) in contient
assert borne_incluse == [(1,)] and not borne_exclue
assert index_attendu == ['annee', 'montant'] and index_inverse == ['montant', 'annee']
print(json.dumps(result, ensure_ascii=False, indent=2))
