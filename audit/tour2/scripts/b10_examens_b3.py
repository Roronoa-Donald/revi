#!/usr/bin/env python3
"""
Mission B10 — Vérification des pages d'examens blancs (examens.html / examen-blanc.html / simulateur-examen.html)
où les corrigés (.box--solution) sont affichés directement en clair sans balise <details>.
"""
import csv
from pathlib import Path
from bs4 import BeautifulSoup

REPO = Path(__file__).resolve().parents[3]
CSV_OUT = Path(__file__).resolve().parents[1] / 'csv' / 'b10_examens_en_clair.csv'

courses_js = (REPO / 'server' / 'courses.js').read_text(encoding='utf-8')
import re
course_pattern = re.compile(r"^\s*'([^']+)'\s*:\s*\{\s*name:\s*['\"]([^'\"]+)['\"],\s*level:\s*'([^']+)'", re.M)
COURSES = [{'id': m.group(1), 'name': m.group(2), 'level': m.group(3)} for m in course_pattern.finditer(courses_js)]

rows = []
for c in COURSES:
    cid = c['id']
    cdir = REPO / cid
    if not cdir.exists(): continue
    for fn in ['chapitres/examens.html', 'chapitres/examen-blanc.html', 'chapitres/simulateur-examen.html', 'simulateur-examen.html']:
        fp = cdir / fn
        if not fp.exists(): continue
        raw = fp.read_text(encoding='utf-8', errors='replace')
        soup = BeautifulSoup(raw, 'html.parser')
        sol_boxes = soup.select('.box--solution')
        details_tags = soup.find_all('details')
        sol_in_details = sum(1 for b in sol_boxes if b.find_parent('details') is not None)
        has_js_toggle = ('details' in raw.lower() and len(details_tags) > 0)
        has_timer = ('data-timer' in raw or 'sim-timer' in raw)
        en_clair = (len(sol_boxes) > 0 and sol_in_details == 0)
        rows.append([
            cid, c['level'], f"{cid}/{fn}", len(sol_boxes), len(details_tags),
            sol_in_details, 'OUI' if has_timer else 'NON',
            'CORRIGÉ VISIBLE EN CLAIR DÈS L\'OUVERTURE' if en_clair else 'CORRIGÉ MASQUÉ SOUS <details>'
        ])

with open(CSV_OUT, 'w', encoding='utf-8', newline='') as fp:
    w = csv.writer(fp)
    w.writerow(['cours_id', 'niveau', 'fichier_examen', 'nb_box_solution', 'nb_details', 'nb_solution_dans_details', 'chronometre_present', 'etat_affichage_ecran'])
    w.writerows(rows)

print(f"Total fichiers d'examen inspectés : {len(rows)}")
print(f"Examens B3 avec corrigé en clair dès l'ouverture : {sum(1 for r in rows if r[1]=='b3' and 'EN CLAIR' in r[7])} / {sum(1 for r in rows if r[1]=='b3')}")
print(f"Examens B2 avec corrigé en clair dès l'ouverture : {sum(1 for r in rows if r[1]=='b2' and 'EN CLAIR' in r[7])}")
