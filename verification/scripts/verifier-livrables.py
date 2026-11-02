#!/usr/bin/env python3
import collections
import csv
import html
import json
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parents[2]
AUDIT = ROOT / 'verification'


def lire_csv(name):
    with (AUDIT / name).open(encoding='utf-8', newline='') as stream:
        return list(csv.DictReader(stream, delimiter=';'))


def lire_json(name):
    return json.loads((AUDIT / name).read_text(encoding='utf-8'))


def main():
    rows = lire_csv('04-erreurs-a-corriger.csv')
    assert len(rows) == 227
    assert [int(row['id'][1:]) for row in rows] == list(range(1, 228))
    assert collections.Counter(row['gravite'] for row in rows) == {'S0': 98, 'S1': 119, 'S2': 10}
    for row in rows:
        name, line_number = row['localisation'].rsplit(':', 1)
        source = (ROOT / name).read_text(encoding='utf-8').splitlines()
        line = source[int(line_number) - 1]
        rendered = re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', ' ', line))).strip()
        excerpt = row['extrait_15_mots_max']
        assert len(excerpt.split()) <= 15, row['id']
        assert excerpt in line or excerpt in html.unescape(line) or excerpt in rendered, row['id']

    claims = lire_csv('01-affirmations.csv')
    assert {row['id'] for row in claims} == {f'K{number}' for number in range(1, 21)}
    assert collections.Counter(row['verdict'] for row in claims) == {
        'confirmé': 1, 'infirmé': 10, 'partiel': 8, 'non vérifié': 1,
    }

    samples = lire_json('echantillons-identifiants.json')
    selected = {item['id'] for family in samples['families'].values() for item in family['exercises_20']}
    findings = lire_json('sondes-reponses-plausibles.json')['findings'] + lire_json('sondes-sept-restants.json')['findings']
    assert len(findings) == len(selected) == 180
    assert {finding['id'] for finding in findings} == selected
    assert all((finding.get('baseline') or finding.get('baselineIndependante'))['accepted'] for finding in findings)
    variants = [variant for finding in findings for variant in finding['variants']]
    assert len(variants) == 360 and all(variant['executed'] for variant in variants)
    assert sum(variant['accepted'] for variant in variants) == 16

    candidates = lire_csv('09-candidats-K13.csv')
    matrix = (AUDIT / '11-preparation-26.md').read_text(encoding='utf-8')
    assert len(candidates) == 26
    assert all(f"| `{row['exercice']}` |" in matrix for row in candidates)
    conversions = lire_csv('12-conversions-k8.csv')
    assert len(conversions) == 426
    alignments = lire_json('13-alignement-langues.json')
    assert len(alignments) == 17 and all(len(row['labs']) == 3 for row in alignments)
    assert all(lab['language'] in {'shell', 'sql'} for row in alignments for lab in row['labs'])
    assert len(list((AUDIT / '02-domaines').glob('*.md'))) == 9

    print('OK : 227 constats et leurs extraits ; 20 verdicts ; 9 rapports de domaine.')
    print('OK : 180 exercices, 360 variantes dont 16 acceptées ; 26 candidats K13.')
    print('OK : 426 conversions répertoriées ; 17 chapitres aux 51 ateliers Bash/SQL.')
    print('Ce contrôle vérifie la cohérence des livrables, pas la vérité de tous les constats.')


if __name__ == '__main__':
    main()
