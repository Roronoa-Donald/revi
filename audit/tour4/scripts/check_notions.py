#!/usr/bin/env python3
import sys, os, glob, re
from bs4 import BeautifulSoup

MAIN, NEW = sys.argv[1], sys.argv[2]

def notions(path):
    soup = BeautifulSoup(open(path, encoding="utf-8", errors="ignore"), "html.parser")
    for h in soup.find_all(["h2", "h3", "h4"]):
        t = h.get_text(" ", strip=True)
        if "notions" in t.lower() and "connaître" in t.lower():
            m = re.search(r"\b(\d+)\b", t)
            announced = int(m.group(1)) if m else None
            ul = h.find_next_sibling(["ol", "ul"])
            items = [re.sub(r"\s+", " ", li.get_text(" ", strip=True)) for li in (ul.find_all("li") if ul else [])]
            extra_h = ul.find_next_sibling(["h3", "h4"]) if ul else None
            extra = []
            if extra_h and "aller plus loin" in extra_h.get_text().lower():
                ul2 = extra_h.find_next_sibling(["ol", "ul"])
                extra = [re.sub(r"\s+", " ", li.get_text(" ", strip=True)) for li in (ul2.find_all("li") if ul2 else [])]
            return announced, items, extra
    return None, [], []

lost_total, bad_title, checked = 0, 0, 0
for p in sorted(glob.glob(os.path.join(MAIN, "*/chapitres/chapitre*.html"))):
    if "revi-cours-html" in p:
        continue
    rel = os.path.relpath(p, MAIN)
    np = os.path.join(NEW, rel)
    if not os.path.exists(np): continue
    checked += 1
    _, m_items, _ = notions(p)
    ann, n_items, n_extra = notions(np)
    present = set(n_items) | set(n_extra)
    lost = [x for x in m_items if x not in present]
    if lost:
        lost_total += len(lost)
        print(f"{rel}: {len(lost)} perdue(s) -> {lost[:3]}")
    if ann is not None and ann != len(n_items):
        bad_title += 1
        print(f"{rel}: titre annonce {ann}, liste contient {len(n_items)}")

print(f"Chapitres vérifiés: {checked}")
print(f"TOTAL notions perdues: {lost_total}  (attendu: 0)")
print(f"TOTAL titres incohérents avec la longueur de liste: {bad_title}  (attendu: 0)")
sys.exit(1 if (lost_total or bad_title) else 0)
