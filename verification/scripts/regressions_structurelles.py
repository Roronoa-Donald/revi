#!/usr/bin/env python3
import csv
import json
import re
import subprocess
from html.parser import HTMLParser
from pathlib import Path

from analyse_independante import git_batch

ROOT = Path(__file__).resolve().parents[2]
OUTPUT = ROOT / 'verification'


class Counters(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.questions = 0
        self.exercises = 0
        self.inert = 0

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        if tag in {'script', 'style', 'textarea'}:
            self.inert += 1
        if self.inert:
            return
        classes = set((attrs.get('class') or '').split())
        if 'q' in classes:
            self.questions += 1
        if 'lab' in classes and attrs.get('data-exercise'):
            self.exercises += 1

    def handle_endtag(self, tag):
        if tag in {'script', 'style', 'textarea'} and self.inert:
            self.inert -= 1


def count(source):
    parser = Counters()
    parser.feed(source)
    return {'questions': parser.questions, 'exercises': parser.exercises}


def main():
    tracked = subprocess.check_output(['git', 'ls-files', '-z', '*.html'], cwd=ROOT).decode().split('\0')
    chapters = sorted(file for file in tracked if re.search(r'/chapitres/chapitre\d+\.html$', file) and (ROOT / file).is_file())
    baseline = git_batch('main', chapters)
    comparisons = []
    regressions = []
    for file in chapters:
        if file not in baseline:
            continue
        before = count(baseline[file])
        after = count((ROOT / file).read_text(encoding='utf-8', errors='replace'))
        comparisons.append({'file': file, 'before': before, 'after': after})
        for kind in ('questions', 'exercises'):
            old, new = before[kind], after[kind]
            if old and (old - new) / old > 0.15:
                regressions.append({'fichier': file, 'type': kind, 'avant': old, 'apres': new,
                                    'perte_pourcent': round(100 * (old - new) / old, 2)})
    result = {'chapters_compared': len(comparisons), 'candidates_over_15_percent': regressions,
              'comparisons': comparisons, 'limits': 'Comptage des marqueurs HTML reconnus ; ne compare pas le sens et ne représente pas forcément le DOM.'}
    (OUTPUT / 'regressions-structurelles.json').write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    with (OUTPUT / 'regressions-structurelles.csv').open('w', newline='', encoding='utf-8') as output:
        writer = csv.DictWriter(output, fieldnames=['fichier', 'type', 'avant', 'apres', 'perte_pourcent'], delimiter=';')
        writer.writeheader()
        writer.writerows(regressions)
    print(f'{len(comparisons)} chapitres comparés ; {len(regressions)} pertes structurelles candidates > 15 %.')


if __name__ == '__main__':
    main()
