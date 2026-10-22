#!/usr/bin/env python3
"""
Mission B (Règle 3) — Vérification des deux compteurs complémentaires cités dans le rapport du Tour 1 :
- « 63 occurrences » de virgules parasites `,<ul>,` / `,<li>` causées par Array.prototype.toString() dans kit.box()
- « 153 pages » ayant un bloc .bands sans aucun signe `%` dans les paliers .bandrow.
"""
import re, csv
from pathlib import Path
from bs4 import BeautifulSoup

REPO = Path(__file__).resolve().parents[3]
CSV_VIRG = Path(__file__).resolve().parents[1] / 'csv' / 'b0_virgules_parasites_63.csv'
CSV_BANDS = Path(__file__).resolve().parents[1] / 'csv' / 'b0_bands_sans_pourcent_153.csv'

courses_js = (REPO / 'server' / 'courses.js').read_text(encoding='utf-8')
course_pattern = re.compile(r"^\s*'([^']+)'\s*:\s*\{\s*name:\s*['\"]([^'\"]+)['\"],\s*level:\s*'([^']+)'", re.M)
COURSES = [{'id': m.group(1), 'name': m.group(2), 'level': m.group(3)} for m in course_pattern.finditer(courses_js)]

virg_rows = []
bands_rows = []

for c in COURSES:
    cid = c['id']
    cdir = REPO / cid
    if not cdir.exists(): continue
    for f in sorted(cdir.rglob('*.html')):
        rel = str(f.relative_to(REPO))
        raw = f.read_text(encoding='utf-8', errors='replace')
        for l_idx, line in enumerate(raw.splitlines(), 1):
            if re.search(r'</(?:p|ul|ol|li|div|table)>\s*,\s*<(?:p|ul|ol|li|div|table)\b', line):
                virg_rows.append([cid, c['level'], rel, l_idx, line.strip()[:140], f"server/content/{cid}.js + scripts/course-kit.js:L203"])
        soup = BeautifulSoup(raw, 'html.parser')
        brs = [b.get_text(" ", strip=True) for b in soup.select('.bandrow')]
        if brs and not any('%' in b for b in brs):
            bands_rows.append([cid, c['level'], rel, len(brs), ' | '.join(b[:45] for b in brs)])

with open(CSV_VIRG, 'w', encoding='utf-8', newline='') as fp:
    w = csv.writer(fp)
    w.writerow(['cours_id', 'niveau', 'fichier_html', 'ligne', 'extrait', 'source_responsable'])
    w.writerows(virg_rows)

with open(CSV_BANDS, 'w', encoding='utf-8', newline='') as fp:
    w = csv.writer(fp)
    w.writerow(['cours_id', 'niveau', 'fichier_html', 'nb_bandrow', 'aperçu_bandrows'])
    w.writerows(bands_rows)

print(f"Lignes HTML avec virgules parasites entre balises (`</tag>,<tag>`) : {len(virg_rows)}")
print(f"Pages HTML avec .bandrow dépourvus de '%' : {len(bands_rows)}")
