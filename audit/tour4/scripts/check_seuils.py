#!/usr/bin/env python3
"""
Vérification K6 — Cohérence de l'échelle des seuils du test de maîtrise (B1)
Contrôle sur les 416 chapitres (*/chapitres/chapitre*.html) et les pages
d'examen disposant d'un barème .bands :
  1. Qu'une seule et unique échelle continue de 0 à 100 % est utilisée partout :
     `< 50 %` | `50–69 %` | `70–94 %` | `≥ 95 %` (4 paliers continus couvrant
     [0..49], [50..69], [70..94], [95..100]).
  2. Qu'aucun chapitre ne mélange deux échelles incompatibles (ex. `%` et `/8`
     comme `< 50 % (0 à 3/8)` ou `50–89 % (4 à 7/8)`), ne présente de trou
     (`70–89 %` suivi de `≥ 95 %`), ni de chevauchement.
"""
import pathlib
import re
import sys
from bs4 import BeautifulSoup

ROOT = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else pathlib.Path('.')
EXPECTED_SCALE = ('< 50 %', '50–69 %', '70–94 %', '≥ 95 %')

MIXED_OR_RAW_PAT = re.compile(r'\b\d+\s*/\s*8\b|Moins de \d|Entre \d|Score\s*<', re.I)
BAND_HEAD_PAT = re.compile(r'^(<\s*\d+\s*%|\d+\s*[–-]\s*\d+\s*%|≥\s*\d+\s*%)\s*[—:]')


def parse_intervals(heads):
    intervals = []
    for h in heads:
        h_clean = re.sub(r'\s+', ' ', h.strip()).replace('-', '–')
        m_lt = re.match(r'^<\s*(\d+)\s*%$', h_clean)
        m_rng = re.match(r'^(\d+)\s*–\s*(\d+)\s*%$', h_clean)
        m_ge = re.match(r'^≥\s*(\d+)\s*%$', h_clean)
        if m_lt:
            intervals.append((0, int(m_lt.group(1)) - 1, f"< {m_lt.group(1)} %"))
        elif m_rng:
            intervals.append((int(m_rng.group(1)), int(m_rng.group(2)), f"{m_rng.group(1)}–{m_rng.group(2)} %"))
        elif m_ge:
            intervals.append((int(m_ge.group(1)), 100, f"≥ {m_ge.group(1)} %"))
        else:
            return None
    return intervals


def check_continuity(intervals):
    if not intervals:
        return False, "aucun intervalle valide"
    if intervals[0][0] != 0 or intervals[-1][1] != 100:
        return False, f"couverture incomplète [{intervals[0][0]}..{intervals[-1][1]}]"
    for i in range(len(intervals) - 1):
        prev_hi = intervals[i][1]
        next_lo = intervals[i + 1][0]
        if next_lo > prev_hi + 1:
            return False, f"trou [{prev_hi + 1}..{next_lo - 1}%]"
        if next_lo <= prev_hi:
            return False, f"chevauchement [{next_lo}..{prev_hi}%]"
    return True, "ok"


def main():
    chapters = sorted(ROOT.glob('*/chapitres/chapitre*.html'))
    checked = 0
    gaps_or_overlaps = 0
    mixed_scales = 0
    wrong_scale = 0

    for p in chapters:
        checked += 1
        rel = p.relative_to(ROOT).as_posix()
        soup = BeautifulSoup(p.read_text(encoding='utf-8', errors='ignore'), 'html.parser')
        bands = soup.find('div', class_='bands')
        if not bands:
            wrong_scale += 1
            print(f"{rel}: bloc .bands manquant")
            continue
        rows = [re.sub(r'\s+', ' ', r.get_text(' ', strip=True)).strip() for r in bands.find_all('div', class_='bandrow')]
        has_mixed = any(MIXED_OR_RAW_PAT.search(r.split('—')[0].split(':')[0]) for r in rows)
        if has_mixed:
            mixed_scales += 1
            print(f"{rel}: échelle mixte ou incompatible (% et /8 ou Score < 60%) -> {[r[:35] for r in rows]}")

        heads = []
        for r in rows:
            m = BAND_HEAD_PAT.match(r)
            heads.append(m.group(1) if m else r[:25])

        intervals = parse_intervals(heads)
        if intervals is None:
            wrong_scale += 1
            if not has_mixed:
                print(f"{rel}: en-têtes de seuils non conformes -> {heads}")
            continue

        ok, msg = check_continuity(intervals)
        if not ok:
            gaps_or_overlaps += 1
            print(f"{rel}: {msg} -> {heads}")

        norm_heads = tuple(x[2] for x in intervals)
        if norm_heads != EXPECTED_SCALE:
            wrong_scale += 1
            print(f"{rel}: échelle différente de {EXPECTED_SCALE} -> {norm_heads}")

    print(f"Chapitres vérifiés: {checked}")
    print(f"Chapitres avec trou ou chevauchement: {gaps_or_overlaps}  (attendu: 0)")
    print(f"Chapitres avec échelle mixte (% + /8 ou Score < 60 %): {mixed_scales}  (attendu: 0)")
    print(f"Chapitres hors échelle unifiée {EXPECTED_SCALE}: {wrong_scale}  (attendu: 0)")
    sys.exit(0 if (gaps_or_overlaps == 0 and mixed_scales == 0 and wrong_scale == 0) else 1)


if __name__ == '__main__':
    main()
