#!/usr/bin/env python3
import sys, re, glob, os
ROOT = sys.argv[1]
PAT = re.compile(r"\$[^$\n]*?[\t\x08\x0c\r][^$\n]*?\$")
bad = 0
for p in sorted(glob.glob(os.path.join(ROOT, "**/*.html"), recursive=True)):
    rel = os.path.relpath(p, ROOT)
    if rel.startswith(("audit/", "dist/", "node_modules/", "revi-cours-html/")):
        continue
    s = open(p, encoding="utf-8", errors="ignore", newline="").read()
    hits = PAT.findall(s)
    if hits:
        bad += len(hits)
        print(f"{rel}: {len(hits)}")
print(f"TOTAL séquences corrompues: {bad}  (attendu: 0)")
sys.exit(1 if bad else 0)
