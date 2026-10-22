#!/usr/bin/env python3
import sys, glob, os, re, unicodedata
from collections import Counter
from bs4 import BeautifulSoup

ROOT = sys.argv[1]

def norm(s):
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode("ascii").lower()
    return re.sub(r"[^a-z0-9]+", " ", s).strip()

def extract_core_term(notion):
    t = re.split(r"\s*[:—–]\s*", notion, maxsplit=1)[0].strip()
    t_no_paren = re.sub(r"\s*\([^)]*\)", "", t).strip()
    res = [x for x in [t, t_no_paren, notion] if len(norm(x)) >= 2]
    return res if res else [notion]

def notion_covered(notion, cards_list):
    candidates = [norm(c) for c in extract_core_term(notion) if norm(c)]
    for q_txt, a_txt in cards_list:
        combined = norm(q_txt + " " + a_txt)
        for c in candidates:
            if c and c in combined:
                return True
        if notion.strip() in (q_txt + " " + a_txt):
            return True
        n_words = [w for w in norm(extract_core_term(notion)[0]).split() if len(w) > 2]
        if n_words and all(w in combined for w in n_words):
            return True
    return False

dup_total = 0
uncovered_total = 0

for p in sorted(glob.glob(os.path.join(ROOT, "*/chapitres/cartes.html"))):
    if "revi-cours-html" in p:
        continue
    rel = os.path.relpath(p, ROOT)
    course_dir = os.path.dirname(os.path.dirname(p))
    soup = BeautifulSoup(open(p, encoding="utf-8", errors="ignore"), "html.parser")
    qs = []
    cards_list = []
    for fc in soup.select(".fc"):
        faces = fc.select(".fc__face")
        if not faces: continue
        f0 = BeautifulSoup(str(faces[0]), "html.parser")
        for b in f0.find_all("b"): b.decompose()
        q = re.sub(r"\s+", " ", f0.get_text(" ", strip=True))
        q = re.sub(r"^(Synthèse|Approfondissement)\s*[—–-]\s*", "", q)
        a = ""
        if len(faces) > 1:
            f1 = BeautifulSoup(str(faces[1]), "html.parser")
            for b in f1.find_all("b"): b.decompose()
            a = re.sub(r"\s+", " ", f1.get_text(" ", strip=True))
        qs.append(q)
        cards_list.append((q, a))
    c = Counter(qs)
    dups = {k: v for k, v in c.items() if v > 1}
    if dups:
        n = sum(v - 1 for v in dups.values())
        dup_total += n
        print(f"{rel}: {n} doublon(s)")

    ch_files = sorted(
        glob.glob(os.path.join(course_dir, "chapitres/chapitre*.html")),
        key=lambda x: int(re.search(r"chapitre(\d+)\.html$", x).group(1)) if re.search(r"chapitre(\d+)\.html$", x) else 999
    )
    missing_in_course = []
    for ch_p in ch_files:
        ch_soup = BeautifulSoup(open(ch_p, encoding="utf-8", errors="ignore"), "html.parser")
        for h in ch_soup.find_all(["h2", "h3", "h4"]):
            t = h.get_text(" ", strip=True)
            if "notions" in t.lower() and "connaître" in t.lower():
                ul = h.find_next_sibling(["ol", "ul"])
                items = [re.sub(r"\s+", " ", li.get_text(" ", strip=True)) for li in (ul.find_all("li") if ul else [])]
                for item in items:
                    if not notion_covered(item, cards_list):
                        missing_in_course.append((os.path.basename(ch_p), item))
                break
    if missing_in_course:
        uncovered_total += len(missing_in_course)
        print(f"{rel}: {len(missing_in_course)} notion(s) sans carte -> {missing_in_course[:2]}")

print(f"TOTAL questions en double: {dup_total}  (attendu: 0)")
print(f"TOTAL notions sans carte: {uncovered_total}  (attendu: 0)")
sys.exit(1 if (dup_total or uncovered_total) else 0)
