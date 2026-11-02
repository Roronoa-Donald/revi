#!/usr/bin/env python3
import ast
import html
import json
import re
from pathlib import Path


source = Path('/source')
output = Path('/resultats/extraits')
output.mkdir(parents=True, exist_ok=True)
metadata = {}


def lines(relative):
    return (source / relative).read_text(encoding='utf-8').splitlines()


def literal(line):
    value = line.strip()
    if value.endswith('+'):
        value = value[:-1].rstrip()
    if value.endswith(','):
        value = value[:-1].rstrip()
    result = ast.literal_eval(value)
    if not isinstance(result, str):
        raise ValueError('Un littéral de chaîne JavaScript était attendu')
    return result


def code_block(relative, marker):
    content = lines(relative)
    starts = [index for index, line in enumerate(content) if '<pre><code>' + marker in line]
    if len(starts) != 1:
        raise ValueError(f'Bloc absent ou ambigu dans {relative} : {marker}')
    start = starts[0]
    pieces = []
    for line in content[start:]:
        pieces.append(literal(line))
        if '</code></pre>' in pieces[-1]:
            break
    if not pieces or '</code></pre>' not in pieces[-1]:
        raise ValueError(f'Bloc non terminé dans {relative} : {marker}')
    body = '\n'.join(pieces).split('<pre><code>', 1)[1].split('</code></pre>', 1)[0]
    return html.unescape(body).strip(), start + 1


def inline_code(relative, marker):
    found = []
    for number, line in enumerate(lines(relative), 1):
        if marker not in line:
            continue
        try:
            parsed = literal(line)
        except (SyntaxError, ValueError):
            continue
        for match in re.finditer(r'<code>(.*?)</code>', parsed):
            value = html.unescape(match.group(1))
            if marker in value:
                found.append((value, number))
    if len(found) != 1:
        raise ValueError(f'Fragment absent ou ambigu dans {relative} : {marker}')
    return found[0]


def save(name, relative, found, note='instruction extraite sans adaptation'):
    value, number = found
    (output / name).write_text(value.rstrip() + '\n', encoding='utf-8')
    metadata[name] = {'source': relative, 'ligne': number, 'traitement': note}
    print(f'  {name} : {relative}:{number} — {note}')
    return value


chapter2 = 'server/content/b3-sql/chapitre2.js'
chapter5 = 'server/content/b3-sql/chapitre5.js'
exam = 'server/content/b3-sql/pages/examens-exercices.js'

print('=== Extraction des sources effectives, sans patch ni empreintes figées ===')
save('index.sql', chapter2, code_block(chapter2, 'CREATE INDEX idx_cmd_client_date'))
save('virement.sql', chapter5, code_block(chapter5, 'CREATE OR REPLACE FUNCTION virer_fonds('))
save('audit.sql', chapter5, code_block(chapter5, 'CREATE OR REPLACE FUNCTION audit_employes_trigger()'))
anchor = save('ancre.sql', exam, inline_code(exam, 'SELECT id, nom, 1 AS level, ARRAY[id]'))
recursive = save('recursif.sql', exam, inline_code(exam, 'SELECT e.id, e.nom, cte.level'))
save('politique.sql', exam, inline_code(exam, 'CREATE POLICY tenant_isolation_policy'))
save('contexte.sql', exam, inline_code(exam, 'SET LOCAL app.current_tenant_id'))

force_hits = []
for number, line in enumerate(lines(chapter5), 1):
    for match in re.finditer(r'<code>(ALTER TABLE table_name FORCE ROW LEVEL SECURITY;)</code>', line):
        force_hits.append((html.unescape(match.group(1)), number))
if len(force_hits) != 1:
    raise ValueError('Patron FORCE ROW LEVEL SECURITY absent ou ambigu')
force, force_line = force_hits[0]
save('force.sql', chapter5, (force.replace('table_name', 'demo_rls', 1), force_line),
     'patron adapté : table_name remplacé par la table fictive demo_rls')

cte = 'WITH RECURSIVE cte AS (\n' + anchor + '\nUNION ALL\n' + recursive + '\n) SELECT * FROM cte ORDER BY id;\n'
(output / 'cte-assemblee.sql').write_text(cte, encoding='utf-8')
metadata['cte-assemblee.sql'] = {
    'sources': [metadata['ancre.sql'], metadata['recursif.sql']],
    'traitement': 'enveloppe de test ajoutée ; fragments extraits inchangés',
}

contextes = []
for label, relative, marker in (
    ('Explication AFTER', chapter5, '<li><strong>AFTER :</strong>'),
    ('Encadré sur les contraintes', chapter5, 'Règle d’or des Triggers AFTER'),
    ('Réponse du QCM sur les contraintes', chapter5, 'Un trigger AFTER ... FOR EACH ROW garantit'),
    ('Carte BEFORE/AFTER', chapter5, 'BEFORE s’exécute avant l’écriture physique'),
):
    matches = [(number, line) for number, line in enumerate(lines(relative), 1) if marker in line]
    if len(matches) == 1:
        number, line = matches[0]
        contextes.append(f'{label}\n{relative}:{number}\n{html.unescape(line.strip())}\n')
    else:
        contextes.append(f'{label}\nRéférence absente ou ambiguë : relecture manuelle nécessaire.\n')
(output / 'contextes-after.txt').write_text('\n'.join(contextes), encoding='utf-8')
print('  contextes-after.txt : passages actuels copiés pour relecture humaine, sans verdict automatique')
(output / 'sources.json').write_text(json.dumps(metadata, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
