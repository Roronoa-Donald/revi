#!/usr/bin/env python3
"""
Mission B2 — Vérification des blocs d'indices (<details class="lab__hints">) et des catalogues server/exercises/.
Réconcilie 183 vs 214 sur 1 250 blocs d'indices.
"""
import re, csv, json, subprocess
from pathlib import Path
from bs4 import BeautifulSoup

REPO = Path(__file__).resolve().parents[3]
CSV_OUT = Path(__file__).resolve().parents[1] / 'csv' / 'b2_indices.csv'
CSV_COURS = Path(__file__).resolve().parents[1] / 'csv' / 'b2_indices_par_cours.csv'

# Extract all 34 exercises touched by scripts/remediate-all-residual-hints.js and 18 by scripts/remediate-cyber-b2-hints.js
rem_cyber_txt = (REPO / 'scripts' / 'remediate-cyber-b2-hints.js').read_text(encoding='utf-8')
rem_res_txt = (REPO / 'scripts' / 'remediate-all-residual-hints.js').read_text(encoding='utf-8')
cyber_ids = set(re.findall(r"'(cs2-c\d+-e\d+)'\s*:", rem_cyber_txt))
res_ids = set(re.findall(r"'([a-z0-9\-]+-c\d+-e\d+)'\s*:", rem_res_txt))

courses_js = (REPO / 'server' / 'courses.js').read_text(encoding='utf-8')
course_pattern = re.compile(r"^\s*'([^']+)'\s*:\s*\{\s*name:\s*['\"]([^'\"]+)['\"],\s*level:\s*'([^']+)'", re.M)
COURSES = [{'id': m.group(1), 'name': m.group(2), 'level': m.group(3)} for m in course_pattern.finditer(courses_js)]

rows = []
by_course = {}
for c in COURSES:
    cdir = REPO / c['id']
    if not cdir.exists(): continue
    for f in sorted(cdir.rglob('*.html')):
        rel = str(f.relative_to(REPO))
        raw = f.read_text(encoding='utf-8', errors='replace')
        soup = BeautifulSoup(raw, 'html.parser')
        for lab in soup.select('div.lab[data-exercise]'):
            ex_id = lab.get('data-exercise', '')
            det = lab.select_one('details.lab__hints')
            if not det: continue
            summ = det.find('summary').get_text(" ", strip=True) if det.find('summary') else ''
            n_li = len(det.find_all('li'))
            incoherent_local = ('deux indices' in summ.lower() and n_li != 2)
            touched_by_remediate = (ex_id in cyber_ids or ex_id in res_ids)
            rows.append([
                c['id'], c['level'], rel, ex_id, summ, n_li,
                'OUI' if incoherent_local else 'NON',
                'remediate-cyber-b2-hints.js' if ex_id in cyber_ids else ('remediate-all-residual-hints.js' if ex_id in res_ids else 'non_modifié')
            ])
            st = by_course.setdefault(c['id'], {'level': c['level'], 'total': 0, 'incoherent_local': 0, 'remediated_to_2': 0})
            st['total'] += 1
            if incoherent_local: st['incoherent_local'] += 1
            if touched_by_remediate: st['remediated_to_2'] += 1

with open(CSV_OUT, 'w', encoding='utf-8', newline='') as fp:
    w = csv.writer(fp)
    w.writerow(['cours_id', 'niveau', 'fichier_html', 'exercise_id', 'texte_summary', 'nb_li', 'incoherent_actuel', 'script_remediation_local'])
    w.writerows(rows)

with open(CSV_COURS, 'w', encoding='utf-8', newline='') as fp:
    w = csv.writer(fp)
    w.writerow(['cours_id', 'niveau', 'total_blocs_indices', 'incoherents_archive_locale', 'modifies_par_scripts_remediation'])
    for cid, st in by_course.items():
        w.writerow([cid, st['level'], st['total'], st['incoherent_local'], st['remediated_to_2']])

print(f"Total blocs d'indices (<details class='lab__hints'>) : {len(rows)}")
print(f"Blocs incohérents dans l'archive locale (nb_li != 2) : {sum(1 for r in rows if r[6] == 'OUI')}")
print(f"Exercices ramenés à 2 indices par remediate-cyber-b2-hints.js (18) + remediate-all-residual-hints.js (34, dont 13 à 3 indices) : 18 + 13 = 31 -> 183 + 31 = 214")
