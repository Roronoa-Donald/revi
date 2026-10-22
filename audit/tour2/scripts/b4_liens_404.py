#!/usr/bin/env python3
"""
Mission B4 — Crawler local de résolution des liens (href relatifs et absolus internes sur disque)
sur les 931 fichiers HTML de cours + index.html.
"""
import re, csv
from pathlib import Path
from urllib.parse import urlparse, unquote
from bs4 import BeautifulSoup

REPO = Path(__file__).resolve().parents[3]
CSV_OUT = Path(__file__).resolve().parents[1] / 'csv' / 'b4_liens_404.csv'

courses_js = (REPO / 'server' / 'courses.js').read_text(encoding='utf-8')
course_pattern = re.compile(r"^\s*'([^']+)'\s*:\s*\{\s*name:\s*['\"]([^'\"]+)['\"],\s*level:\s*'([^']+)'", re.M)
COURSES = [{'id': m.group(1), 'name': m.group(2), 'level': m.group(3)} for m in course_pattern.finditer(courses_js)]

html_files = [REPO / 'index.html']
for c in COURSES:
    cdir = REPO / c['id']
    if cdir.exists():
        html_files.extend(sorted(cdir.rglob('*.html')))

rows = []
for f in html_files:
    rel_src = str(f.relative_to(REPO))
    cid = rel_src.split('/')[0] if '/' in rel_src else 'PORTAIL'
    raw = f.read_text(encoding='utf-8', errors='replace')
    soup = BeautifulSoup(raw, 'html.parser')
    for tag in soup.find_all(['a', 'link'], href=True):
        href = tag.get('href', '').strip()
        if not href or href.startswith(('#', 'http://', 'https://', 'mailto:', 'tel:', 'javascript:', 'data:')):
            continue
        in_code = (tag.find_parent(['code', 'pre']) is not None)
        parsed = urlparse(href)
        path_part = unquote(parsed.path)
        if not path_part:
            continue
        if path_part.startswith('/'):
            target = (REPO / path_part.lstrip('/')).resolve()
        else:
            target = (f.parent / path_part).resolve()
        if not target.exists():
            l_idx = tag.sourceline or 0
            rel_target = str(target.relative_to(REPO)) if str(target).startswith(str(REPO)) else str(target)
            if path_part == '/assets/img/favicon.svg':
                famille = 'FAVICON_404'
                gen = 'scripts/course-kit.js:L113'
            elif path_part.endswith(('exercices/exercices.html', 'chapitres/simulateur-examen.html')) and ('b3-' in cid or cid in ('masterclass-apprendre', 'RD-RO', 'assembleur', 'Cyber securite B2', 'sql', 'csharp')):
                famille = 'NAV_B3_B2_754'
                gen = 'scripts/course-kit.js:L80-82 (navItems)'
            elif 'chapitres/chapitres/chapitre' in rel_target:
                famille = 'EXERCICES_B3_396'
                gen = f"server/content/{cid}/pages/examens-exercices.js (ou server/content/{cid}/pages.js)"
            elif in_code:
                famille = 'EXEMPLE_CODE_HREF'
                gen = f"server/content/{cid}.js"
            else:
                famille = 'LIEN_RELATIF_B1_B2_AUTRE'
                gen = f"server/content/{cid}.js (ou HTML statique {rel_src})"
            rows.append([cid, rel_src, l_idx, href, rel_target, famille, gen])

with open(CSV_OUT, 'w', encoding='utf-8', newline='') as fp:
    w = csv.writer(fp)
    w.writerow(['cours_id', 'page_source', 'ligne', 'href_brut', 'cible_attendue_disque', 'famille_404', 'fichier_generateur_responsable'])
    w.writerows(rows)

from collections import Counter
cnt = Counter(r[5] for r in rows)
print(f"Total liens 404 sur disque : {len(rows)}")
for k, v in cnt.items():
    print(f"  {k}: {v}")
