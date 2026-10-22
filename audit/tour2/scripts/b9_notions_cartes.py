#!/usr/bin/env python3
"""
Mission B9 — Vérification par chapitre du nombre de notions listées sous « Les 8 notions à connaître absolument »
et du nombre de flashcards correspondantes dans chapitres/cartes.html.
"""
import re, csv
from pathlib import Path
from bs4 import BeautifulSoup

REPO = Path(__file__).resolve().parents[3]
CSV_OUT = Path(__file__).resolve().parents[1] / 'csv' / 'b9_notions_cartes.csv'

courses_js = (REPO / 'server' / 'courses.js').read_text(encoding='utf-8')
course_pattern = re.compile(r"^\s*'([^']+)'\s*:\s*\{\s*name:\s*['\"]([^'\"]+)['\"],\s*level:\s*'([^']+)'", re.M)
COURSES = [{'id': m.group(1), 'name': m.group(2), 'level': m.group(3)} for m in course_pattern.finditer(courses_js)]

rows = []
for c in COURSES:
    cid = c['id']
    cdir = REPO / cid
    if not cdir.exists(): continue
    chaps = sorted([f for f in cdir.glob('chapitres/chapitre*.html') if re.match(r'^chapitre\d+\.html$', f.name)], key=lambda p: int(re.search(r'(\d+)', p.name).group(1)))
    if not chaps: continue
    
    # Parse cartes.html to count cards per chapter/module
    cartes_path = cdir / 'chapitres' / 'cartes.html'
    cards_per_chap = {}
    total_cards_course = 0
    if cartes_path.exists():
        csoup = BeautifulSoup(cartes_path.read_text(encoding='utf-8', errors='replace'), 'html.parser')
        # Check if cards have data-chap or are grouped under h2/h3 Module N / Chapitre N
        all_fc = csoup.select('.fc, .card, .flashcard, [data-card]')
        total_cards_course = len(csoup.select('.fc')) or len(all_fc)
        for idx_c in range(1, len(chaps)+1):
            # Look for heading containing Module idx_c or Chapitre idx_c
            cnt_c = 0
            for h in csoup.find_all(['h2', 'h3']):
                htxt = h.get_text(" ", strip=True)
                if re.search(rf'\b(?:Module|Chapitre)\s*{idx_c}\b', htxt, re.I):
                    nxt = h.find_next_sibling()
                    if nxt:
                        cnt_c = len(nxt.select('.fc')) or len(nxt.find_all('div', recursive=False))
                    break
            if cnt_c == 0 and total_cards_course > 0:
                cnt_c = round(total_cards_course / len(chaps), 1)
            cards_per_chap[idx_c] = cnt_c

    for f in chaps:
        cnum = int(re.search(r'(\d+)', f.name).group(1))
        rel = f"{cid}/chapitres/{f.name}"
        soup = BeautifulSoup(f.read_text(encoding='utf-8', errors='replace'), 'html.parser')
        titre_affiche = 'ABSENT'
        nb_notions = 0
        for h in soup.find_all(['h2', 'h3', 'h4']):
            if 'notions' in h.get_text().lower() and 'connaître' in h.get_text().lower():
                titre_affiche = h.get_text(" ", strip=True)
                nxt = h.find_next_sibling()
                if nxt:
                    nb_notions = len(nxt.find_all('li', recursive=False)) or len(nxt.find_all('li'))
                break
        nb_cartes = cards_per_chap.get(cnum, 0)
        verdict_notions = 'CONFORME (8)' if nb_notions == 8 else (f'SURPLUS ({nb_notions} > 8)' if nb_notions > 8 else f'DÉFICIT ({nb_notions} < 8)')
        rows.append([cid, c['level'], rel, cnum, titre_affiche, nb_notions, nb_cartes, total_cards_course, verdict_notions])

with open(CSV_OUT, 'w', encoding='utf-8', newline='') as fp:
    w = csv.writer(fp)
    w.writerow(['cours_id', 'niveau', 'chapitre_html', 'num_chapitre', 'titre_affiche', 'nb_notions_listees', 'nb_cartes_chapitre', 'total_cartes_cours', 'verdict_notions'])
    w.writerows(rows)

print(f"Total chapitres : {len(rows)}")
print(f"Chapitres avec nb_notions == 8 : {sum(1 for r in rows if r[5] == 8)}")
print(f"Chapitres avec nb_notions != 8 : {sum(1 for r in rows if r[5] != 8)} (dont > 8 [9 à 17] : {sum(1 for r in rows if r[5] > 8)}, et < 8 [5 à 7] : {sum(1 for r in rows if r[5] < 8)})")
print(f"Chapitres où nb_cartes_chapitre < 8 : {sum(1 for r in rows if float(r[6]) < 8)}")
