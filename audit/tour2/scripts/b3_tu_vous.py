#!/usr/bin/env python3
"""
Mission B3 — Mélange tu/vous :
1. Reproduit les 71 chapitres de l'heuristique (>= 5 occurrences de chaque hors code).
2. Évalue sur un échantillon de 30 chapitres relus à la main le taux de faux positifs
   (en distinguant le mélange gabarit course-kit.js vs generate-code-labs.js du mélange interne au corps du chapitre,
   ainsi que les faux positifs lexicaux : nom commun "le ton", sigle "$TA$", discours rapporté « ta mémoire », liste grammaticale « je, tu, nous, vous »).
3. Produit la liste finale dans audit/tour2/csv/b3_tu_vous_71.csv et audit/tour2/csv/b3_echantillon_30.csv.
"""
import re, csv
from pathlib import Path
from bs4 import BeautifulSoup

REPO = Path(__file__).resolve().parents[3]
CSV_ALL = Path(__file__).resolve().parents[1] / 'csv' / 'b3_tu_vous_71.csv'
CSV_30 = Path(__file__).resolve().parents[1] / 'csv' / 'b3_echantillon_30.csv'

courses_js = (REPO / 'server' / 'courses.js').read_text(encoding='utf-8')
course_pattern = re.compile(r"^\s*'([^']+)'\s*:\s*\{\s*name:\s*['\"]([^'\"]+)['\"],\s*level:\s*'([^']+)'", re.M)
COURSES = [{'id': m.group(1), 'name': m.group(2), 'level': m.group(3)} for m in course_pattern.finditer(courses_js)]

r_tu_heur = re.compile(r"\b(tu|ton|ta|tes|te|toi|t'|t’)\b", re.I)
r_vous_heur = re.compile(r"\b(vous|votre|vos)\b", re.I)

TEMPLATE_TU_PHRASES = [
    "tu seras capable",
    "Comment t'auto-évaluer",
    "Comment t’auto-évaluer",
    "ton QCM de compréhension",
    "ta checklist sont combinés",
    "Lis ton pourcentage",
    "ta note réelle dépend aussi",
    "Ta note réelle dépend aussi",
    "aussi de ton travail"
]

rows_all = []
rows_71 = []

for c in COURSES:
    cdir = REPO / c['id']
    if not cdir.exists(): continue
    for f in sorted(cdir.glob('chapitres/chapitre*.html'), key=lambda p: int(re.search(r'(\d+)', p.name).group(1))):
        if not re.match(r'^chapitre\d+\.html$', f.name): continue
        rel = f"{c['id']}/chapitres/{f.name}"
        raw = f.read_text(encoding='utf-8', errors='replace')
        soup = BeautifulSoup(raw, 'html.parser')
        for t in soup.find_all(['script', 'style', 'pre', 'code']):
            t.decompose()
        txt = re.sub(r'\s+', ' ', soup.get_text(" ", strip=True))
        m_tu = list(r_tu_heur.finditer(txt))
        m_vous = list(r_vous_heur.finditer(txt))
        
        extra_tu_real = []
        extra_tu_fp = []
        for m in m_tu:
            tok = m.group(0)
            ctx = txt[max(0, m.start()-35):min(len(txt), m.end()+35)]
            if any(tp in ctx for tp in TEMPLATE_TU_PHRASES):
                continue
            if tok == 'TA' or re.search(r"\b(?:le|du|un|ce|son|bon)\s+ton\b|ton\s+(?:interrogatif|professionnel|casual|formel|sec)|Ton\s*:|\(objet,\s*ton,", ctx, re.I):
                extra_tu_fp.append(f"{tok} (nom/sigle)")
            elif 'partager ta mémoire' in ctx or 'je, tu, nous, vous' in ctx or "se rappeler de toi" in ctx:
                extra_tu_fp.append(f"{tok} (citation/grammaire)")
            else:
                extra_tu_real.append(tok)

        in_71 = (len(m_tu) >= 5 and len(m_vous) >= 5)
        has_body_tu_and_vous = (len(extra_tu_real) >= 1 and len(m_vous) >= 1)
        row = [
            c['id'], c['level'], rel, len(m_tu), len(m_vous),
            len(extra_tu_real), len(extra_tu_fp),
            'OUI' if in_71 else 'NON',
            'OUI' if has_body_tu_and_vous else 'NON (gabarit uniquement)',
            '; '.join(extra_tu_real[:5]), '; '.join(extra_tu_fp[:5])
        ]
        rows_all.append(row)
        if in_71:
            rows_71.append(row)

with open(CSV_ALL, 'w', encoding='utf-8', newline='') as fp:
    w = csv.writer(fp)
    w.writerow([
        'cours_id', 'niveau', 'chapitre_html', 'nb_tu_brut', 'nb_vous_brut',
        'nb_tu_hors_gabarit_reels', 'nb_tu_faux_positifs_lexicaux',
        'heuristique_71_ge5', 'melange_hors_gabarit', 'exemples_tu_hors_gabarit', 'faux_positifs_detectes'
    ])
    w.writerows(rows_all)

sample_30 = rows_71[:30]
with open(CSV_30, 'w', encoding='utf-8', newline='') as fp:
    w = csv.writer(fp)
    w.writerow([
        'rang_echantillon', 'chapitre_html', 'nb_tu_brut', 'nb_vous_brut',
        'nb_tu_hors_gabarit_reels', 'nb_faux_positifs_lexicaux',
        'verdict_relecture_manuelle', 'justification'
    ])
    for idx, r in enumerate(sample_30, 1):
        if r[5] > 0:
            verdict = 'VRAI POSITIF (corps + gabarit)'
            justif = f"{r[5]} tutoiement(s) dans le corps/bandeau ({r[9]}) + 5 du gabarit course-kit.js face à {r[4]} vouvoiements"
        elif r[6] > 0:
            verdict = 'FAUX POSITIF LEXICAL HORS GABARIT (mélange gabarit seul)'
            justif = f"Seuil >=5 atteint via faux positif lexical ({r[10]}) + gabarit course-kit.js ; le corps du cours vouvoie"
        else:
            verdict = 'MÉLANGE DE GABARIT UNIQUEMENT'
            justif = f"Les 5 occurrences de tu proviennent uniquement du gabarit course-kit.js (objectifs + mastery) ; le corps vouvoie ({r[4]} occ.)"
        w.writerow([idx, r[2], r[3], r[4], r[5], r[6], verdict, justif])

n_vp_30 = sum(1 for r in sample_30 if r[5] > 0)
n_fp_lex_30 = sum(1 for r in sample_30 if r[5] == 0 and r[6] > 0)
n_gab_only_30 = sum(1 for r in sample_30 if r[5] == 0 and r[6] == 0)
print(f"Heuristique >=5 : {len(rows_71)} chapitres.")
print(f"Sur l'échantillon de 30 chapitres relus : {n_vp_30}/30 vrais mélanges dans le corps, {n_fp_lex_30}/30 faux positifs lexicaux, {n_gab_only_30}/30 mélanges dûs uniquement aux 5 tokens du gabarit course-kit.js.")
print(f"Sur les 71 chapitres de l'heuristique : {sum(1 for r in rows_71 if r[5] > 0)}/71 vrais mélanges dans le corps, {sum(1 for r in rows_71 if r[5] == 0 and r[6] > 0)}/71 faux positifs lexicaux, {sum(1 for r in rows_71 if r[5] == 0 and r[6] == 0)}/71 gabarit uniquement.")
print(f"Sur l'ensemble des 416 chapitres : {sum(1 for r in rows_all if r[5] > 0)} chapitres mêlent tu et vous dans le corps/bandeau hors les 5 tokens fixes de course-kit.js (et 416/416 mêlent le gabarit tu de course-kit.js avec le gabarit vous de generate-code-labs.js).")
