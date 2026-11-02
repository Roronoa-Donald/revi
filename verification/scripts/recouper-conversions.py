#!/usr/bin/env python3
import csv
import pathlib
import re
from collections import Counter

ROOT = pathlib.Path(__file__).resolve().parents[2]
ENTREE = ROOT / 'audit/tour5/k8-conversions-a-relire.csv'
SORTIE = ROOT / 'verification/12-conversions-k8.csv'
QUALIFICATIONS = {
    7: 'description rétablie dans la source et la page',
    9: 'description rétablie dans la source',
    34: 'impératif cohérent dans une carte de révision',
    77: 'instruction au pluriel retrouvée manuellement dans la source',
    78: 'instruction au pluriel retrouvée manuellement dans la source',
    104: 'option descriptive retrouvée manuellement dans la source',
    131: 'option descriptive retrouvée manuellement dans la source',
    141: 'option descriptive retrouvée manuellement dans la source',
    174: 'phrase retrouvée manuellement ; mélange de registre F227',
    175: 'phrase retrouvée manuellement ; mélange de registre F227',
    176: 'phrase retrouvée manuellement ; mélange de registre F227',
    177: 'mélange de registre F227',
    216: 'impératif cohérent dans une carte de révision',
    229: 'instruction au pluriel retrouvée ; mélange de registre F227',
    230: 'instruction au pluriel retrouvée ; mélange de registre F227',
    236: 'impératif cohérent dans une carte de révision',
    265: 'impératif dans une cellule descriptive ; F226',
    305: 'description retrouvée manuellement dans la source',
    344: 'instruction au pluriel retrouvée manuellement dans la source',
    350: 'instruction au pluriel retrouvée manuellement dans la source',
    365: 'instruction au pluriel retrouvée manuellement dans la source',
}


def chemin_actuel(ancien):
    if ancien.startswith('content/b3-windows-pages/'):
        return 'server/content/b3-windows-server/pages/' + ancien.split('content/b3-windows-pages/', 1)[1]
    if ancien.startswith('content/b3-windows-chapitre'):
        return 'server/content/b3-windows-server/' + ancien.split('content/b3-windows-', 1)[1]
    if ancien.startswith('content/rd_winpages/'):
        return 'server/content/rd_winserver/pages/' + ancien.split('content/rd_winpages/', 1)[1]
    if ancien.startswith('content/rd_winchapitre'):
        return 'server/content/rd_winserver/' + ancien.split('content/rd_win', 1)[1]
    if ancien.startswith('content/'):
        return 'server/' + ancien
    return ancien


def relever(row, cache):
    path = chemin_actuel(row['fichier'])
    target = ROOT / path
    if not target.is_file():
        return path, '', 'source_absente', ''
    lines = cache.setdefault(path, target.read_text(encoding='utf-8').splitlines())
    before, after, original = row['ancien mot'], row['mot K8'], row['ligne d’origine (avant K8)']
    if before not in original:
        return path, '', 'mot_absent_du_contexte_historique', ''
    left, right = original.split(before, 1)
    anchor_left = left[-35:]
    anchor_right = right[:35]
    pattern = re.compile(re.escape(anchor_left) + '(' + re.escape(before) + '|' + re.escape(after) + ')' + re.escape(anchor_right))
    matches = []
    for number, line in enumerate(lines, 1):
        for match in pattern.finditer(line):
            value = match.group(1)
            state = 'ancien' if value == before else 'nouveau'
            matches.append((number, state))
    unique = sorted(set(matches))
    if len(unique) == 1:
        number, state = unique[0]
        return path, str(number), state, 'contexte_35_caracteres'
    if len(unique) > 1:
        states = {match[1] for match in unique}
        return path, ','.join(str(match[0]) for match in unique), 'multiple_' + '_'.join(sorted(states)), 'contexte_35_caracteres'
    return path, '', 'non_retrouve', ''


def main():
    with ENTREE.open(encoding='utf-8', newline='') as stream:
        rows = list(csv.DictReader(stream))
    cache = {}
    results = []
    for position, row in enumerate(rows, 1):
        path, line, state, method = relever(row, cache)
        results.append({
            'id_historique': position,
            'source_actuelle': path,
            'ligne': line,
            'contexte_historique': row['contexte'],
            'ancien_mot': row['ancien mot'],
            'mot_k8': row['mot K8'],
            'reperage_automatique': state,
            'methode': method,
            'qualification_linguistique': QUALIFICATIONS.get(position, 'à relire'),
        })
    with SORTIE.open('w', encoding='utf-8', newline='') as stream:
        writer = csv.DictWriter(stream, fieldnames=results[0].keys(), delimiter=';')
        writer.writeheader()
        writer.writerows(results)
    print('total :', len(results))
    print('repérages automatiques :', dict(Counter(row['reperage_automatique'] for row in results)))
    print('sources absentes :', sum(not (ROOT / row['source_actuelle']).is_file() for row in results))


if __name__ == '__main__':
    main()
