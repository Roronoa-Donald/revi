#!/usr/bin/env python3
"""
Mission B1 — Vérification des gabarits de seuils du test de maîtrise (.bands / .bandrow)
sur les 416 chapitres (chapitres/chapitreN.html) et les 931 fichiers HTML des cours.
"""
import re, csv
from pathlib import Path
from bs4 import BeautifulSoup

REPO = Path(__file__).resolve().parents[3]
CSV_OUT = Path(__file__).resolve().parents[1] / 'csv' / 'b1_seuils.csv'

courses_js = (REPO / 'server' / 'courses.js').read_text(encoding='utf-8')
course_pattern = re.compile(r"^\s*'([^']+)'\s*:\s*\{\s*name:\s*['\"]([^'\"]+)['\"],\s*level:\s*'([^']+)'", re.M)
COURSES = [{'id': m.group(1), 'name': m.group(2), 'level': m.group(3)} for m in course_pattern.finditer(courses_js)]

rows = []
for c in COURSES:
    cdir = REPO / c['id']
    if not cdir.exists(): continue
    for f in sorted(cdir.rglob('*.html')):
        rel = str(f.relative_to(REPO))
        rel_course = str(f.relative_to(cdir))
        is_chap = bool(re.match(r'^chapitres/chapitre\d+\.html$', rel_course))
        raw = f.read_text(encoding='utf-8', errors='replace')
        soup = BeautifulSoup(raw, 'html.parser')
        brs = [b.get_text(" ", strip=True) for b in soup.select('.bandrow')]
        if not brs and not is_chap:
            continue
        prefixes = []
        for b in brs:
            if '—' in b:
                prefixes.append(b.split('—')[0].strip())
            elif ':' in b and len(b.split(':')[0]) < 35:
                prefixes.append(b.split(':')[0].strip())
            else:
                prefixes.append('SANS_SEUIL_CHIFRE')
        gabarit = ' | '.join(prefixes) if prefixes else 'AUCUN_BANDROW'
        if gabarit == '< 50 % | 50–69 % | 70–89 % | ≥ 95 %':
            verdict = 'trou (90–94 % absent)'
        elif gabarit == '< 50 % | 50–69 % | 70–94 % | ≥ 95 %':
            verdict = 'complet (corrigé 70–94 %)'
        elif gabarit == 'Moins de 4/8 | De 4 à 6/8 | 7/8 | 8/8':
            verdict = 'complet (échelle sur 8 : 0-3, 4-6, 7, 8)'
        elif gabarit == 'Moins de 4/8 | Entre 5/8 et 7/8 | 8/8':
            verdict = 'trou (4/8 absent entre <4/8 et 5/8..7/8)'
        elif gabarit == 'Score < 60 % | Score 60-74 % | Score 75-84 % | Score 85-94 % | Score ≥ 95 %':
            verdict = 'complet (5 bandes continues en %)'
        elif 'SANS_SEUIL_CHIFRE' in gabarit or gabarit == 'Niveau initial | Niveau opérationnel | Maîtrise B3':
            verdict = 'incomplet (aucun seuil chiffré en %)'
        else:
            verdict = 'autre'
        src_file = f"server/content/{c['id']}.js" if (REPO / 'server' / 'content' / f"{c['id']}.js").exists() else rel
        rows.append([c['id'], c['level'], rel, 'chapitre' if is_chap else f.name, len(brs), gabarit, verdict, src_file])

with open(CSV_OUT, 'w', encoding='utf-8', newline='') as fp:
    w = csv.writer(fp)
    w.writerow(['cours_id', 'niveau', 'fichier_html', 'type_page', 'nb_bandrow', 'gabarit_seuils', 'verdict', 'fichier_source'])
    w.writerows(rows)

chaps = [r for r in rows if r[3] == 'chapitre']
print(f"Total chapitres analysés : {len(chaps)}")
print(f"Chapitres avec '< 50 % | 50–69 % | 70–89 % | ≥ 95 %' (trou 90-94%) : {sum(1 for r in chaps if r[5] == '< 50 % | 50–69 % | 70–89 % | ≥ 95 %')}")
print(f"Pages non-chapitres (simulateur-examen.html) avec ce même trou : {sum(1 for r in rows if r[3] != 'chapitre' and r[5] == '< 50 % | 50–69 % | 70–89 % | ≥ 95 %')}")
print(f"Total fichiers HTML avec ce trou (253 + 30) : {sum(1 for r in rows if r[5] == '< 50 % | 50–69 % | 70–89 % | ≥ 95 %')}")
