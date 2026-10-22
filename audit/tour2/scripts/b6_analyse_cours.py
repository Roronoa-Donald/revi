#!/usr/bin/env python3
"""
Mission B6 — Vérification des cours en data-language="analyse" (52 vs 53 cours),
des lignes d'objectifs/énoncés/indices contradictoires (206 lignes dans les chapitres),
de la divulgation des tests [Cas 1..3] et de l'absence de [Exemple] dans data-lab-starter.
"""
import re, csv
from pathlib import Path
from bs4 import BeautifulSoup

REPO = Path(__file__).resolve().parents[3]
CSV_COURS = Path(__file__).resolve().parents[1] / 'csv' / 'b6_cours_analyse.csv'
CSV_LIGNES = Path(__file__).resolve().parents[1] / 'csv' / 'b6_lignes_contradictoires.csv'

courses_js = (REPO / 'server' / 'courses.js').read_text(encoding='utf-8')
course_pattern = re.compile(r"^\s*'([^']+)'\s*:\s*\{\s*name:\s*['\"]([^'\"]+)['\"],\s*level:\s*'([^']+)'", re.M)
COURSES = [{'id': m.group(1), 'name': m.group(2), 'level': m.group(3)} for m in course_pattern.finditer(courses_js)]

# Map which script converted which course
rem_26 = (REPO / 'scripts' / 'remediate-26-exercises.js').read_text(encoding='utf-8')
rem_noncode = (REPO / 'scripts' / 'remediate-noncode-courses.js').read_text(encoding='utf-8')
rem_math = (REPO / 'scripts' / 'remediate-math-courses.js').read_text(encoding='utf-8')
mig_ped = (REPO / 'tools' / 'migrate-pedagogical-alignment.js').read_text(encoding='utf-8')

course_rows = []
line_rows = []

residue_pat = re.compile(
    r'(?:en Python\s*3?|script Python|module\s+ipaddress|ipaddress\.|split\(|input\(\)|sys\.stdin|'
    r'STDIN|#!/bin/bash|2#du-bash|Langage\s*:\s*Python|ateliers de programmation interactive en Python 3|'
    r'votre programme reçoit|le programme lit|le script lit)',
    re.I
)

for c in COURSES:
    cid = c['id']
    cdir = REPO / cid
    if not cdir.exists(): continue
    chaps = sorted([f for f in cdir.glob('chapitres/chapitre*.html') if re.match(r'^chapitre\d+\.html$', f.name)], key=lambda p: int(re.search(r'(\d+)', p.name).group(1)))
    if not chaps: continue
    langs = set()
    n_labs = 0
    n_cas_leaked = 0
    n_has_ex = 0
    for f in chaps:
        raw = f.read_text(encoding='utf-8', errors='replace')
        for m in re.finditer(r'data-language="([^"]+)"', raw):
            langs.add(m.group(1))
            n_labs += 1
        for m in re.finditer(r'<script type="text/plain" data-lab-starter>(.*?)</script>', raw, re.S):
            st = m.group(1)
            if '[Cas 1' in st: n_cas_leaked += 1
            if '[Exemple' in st: n_has_ex += 1
    if 'analyse' not in langs:
        continue
    # Identify conversion script
    if f"'{cid}'" in rem_noncode or f'"{cid}"' in rem_noncode:
        script_resp = 'scripts/remediate-noncode-courses.js'
    elif f"'{cid}'" in rem_math or f'"{cid}"' in rem_math:
        script_resp = 'scripts/remediate-math-courses.js'
    elif f"'{cid}'" in rem_26 or f'"{cid}"' in rem_26:
        script_resp = 'scripts/remediate-26-exercises.js'
    else:
        script_resp = 'tools/migrate-pedagogical-alignment.js'

    # Count contradictory lines in chapters + exercices.html + atelier.html
    n_contra_chap = 0
    n_contra_trans = 0
    for f in sorted(cdir.rglob('*.html')):
        rel = str(f.relative_to(REPO))
        is_chap = bool(re.match(r'^chapitres/chapitre\d+\.html$', str(f.relative_to(cdir))))
        raw = f.read_text(encoding='utf-8', errors='replace')
        for l_idx, line in enumerate(raw.splitlines(), 1):
            if any(k in line for k in ['box--objectifs', '<li>', 'lab__goal', 'lab__brief', 'lab__hints', 'lead', 'Langage :', '2#du-bash', 'STDIN', 'ipaddress', 'split(']):
                m = residue_pat.search(line)
                if m:
                    clean = BeautifulSoup(line, 'html.parser').get_text(" ", strip=True)
                    # Filter out pure course theory lines in b1-cyber/Cyber securite B2/b3-hacking that aren't objectives or labs
                    if is_chap:
                        n_contra_chap += 1
                    else:
                        n_contra_trans += 1
                    line_rows.append([cid, c['level'], rel, l_idx, 'chapitre' if is_chap else f.name, m.group(0), clean[:140], script_resp])

    course_rows.append([cid, c['level'], len(chaps), n_labs, n_cas_leaked, n_has_ex, n_contra_chap, n_contra_trans, script_resp])

with open(CSV_COURS, 'w', encoding='utf-8', newline='') as fp:
    w = csv.writer(fp)
    w.writerow(['cours_id', 'niveau', 'nb_chapitres', 'nb_exercices_analyse', 'nb_starters_divulguant_cas_1_3', 'nb_starters_avec_exemple', 'lignes_contradictoires_chapitres', 'lignes_contradictoires_transverses', 'script_responsable'])
    w.writerows(course_rows)

with open(CSV_LIGNES, 'w', encoding='utf-8', newline='') as fp:
    w = csv.writer(fp)
    w.writerow(['cours_id', 'niveau', 'fichier_html', 'ligne', 'type_page', 'motif_detecte', 'extrait', 'script_responsable'])
    w.writerows(line_rows)

print(f"Total cours en data-language='analyse' : {len(course_rows)} (et {68 - len(course_rows)} cours exécutables = 68 cours actifs)")
print(f"Total exercices en analyse : {sum(r[3] for r in course_rows)} (divulguant [Cas 1..3] : {sum(r[4] for r in course_rows)}, avec [Exemple] : {sum(r[5] for r in course_rows)})")
print(f"Lignes contradictoires dans les chapitres : {sum(r[6] for r in course_rows)} | dans les pages transverses (exercices.html/atelier.html) : {sum(r[7] for r in course_rows)} | Total : {len(line_rows)}")
