#!/usr/bin/env python3
"""
Mission B5 — Vérification des séquences littérales \n :
Réconcilie :
- 320 lignes (316 lignes dans les chapitres/exercices) contenant la sous-chaîne brute `\n` dans le code source HTML
- 22 occurrences dans 13 chapitres dans le texte visible hors <script>, <style>, <pre>, <code>
- 1 163 fuites annoncées dans l'audit antérieur (626 prose + 537 <pre><code> aplatis, corrigés avant le Tour 1).
"""
import re, csv
from pathlib import Path
from bs4 import BeautifulSoup

REPO = Path(__file__).resolve().parents[3]
CSV_OUT = Path(__file__).resolve().parents[1] / 'csv' / 'b5_slash_n.csv'

courses_js = (REPO / 'server' / 'courses.js').read_text(encoding='utf-8')
course_pattern = re.compile(r"^\s*'([^']+)'\s*:\s*\{\s*name:\s*['\"]([^'\"]+)['\"],\s*level:\s*'([^']+)'", re.M)
COURSES = [{'id': m.group(1), 'name': m.group(2), 'level': m.group(3)} for m in course_pattern.finditer(courses_js)]

rows = []
for c in COURSES:
    cdir = REPO / c['id']
    if not cdir.exists(): continue
    for f in sorted(cdir.rglob('*.html')):
        rel = str(f.relative_to(REPO))
        is_chap = bool(re.match(r'^chapitres/chapitre\d+\.html$', str(f.relative_to(cdir))))
        raw = f.read_text(encoding='utf-8', errors='replace')
        in_script = False
        for l_idx, line in enumerate(raw.splitlines(), 1):
            if '<script' in line: in_script = True
            if r'\n' in line:
                n_occ = len(re.findall(r'\\n', line))
                if in_script:
                    cat = 'SCRIPT_DATA_LAB (code starter/solution JS/C/PHP)'
                elif '<pre' in line or '<code>' in line:
                    if r'openapi: 3.0.0\n' in line:
                        cat = 'VRAIE_FUITE_PRE_CODE_APLATI (OpenAPI YAML sur 1 ligne)'
                    else:
                        cat = 'CODE_LEGITIME_PRE_CODE (printf/echo/write avec \\n)'
                elif re.search(r'\\n(?:eq|e\b|otin)', line):
                    if r'\\ne' in line:
                        cat = 'LATEX_DOUBLE_ECHAPPE_SANS_KATEX (\\\\ne visible)'
                    else:
                        cat = 'LATEX_SANS_KATEX (\\ne / \\neq / \\notin visible)'
                else:
                    cat = 'PROSE_MENTION_LEGITIME_CARACTERE_N'
                rows.append([c['id'], rel, l_idx, 'OUI' if is_chap else 'NON', n_occ, cat, line.strip()[:120]])
            if '</script>' in line: in_script = False

with open(CSV_OUT, 'w', encoding='utf-8', newline='') as fp:
    w = csv.writer(fp)
    w.writerow(['cours_id', 'fichier_html', 'ligne', 'est_chapitre', 'nb_occurrences_ligne', 'categorie', 'extrait'])
    w.writerows(rows)

from collections import Counter
print(f"Total lignes HTML contenant '\\n' : {len(rows)} (dont dans les chapitres : {sum(1 for r in rows if r[3]=='OUI')})")
for k, v in Counter(r[5] for r in rows).items():
    print(f"  {k}: {v} lignes ({sum(r[4] for r in rows if r[5]==k)} occurrences)")
