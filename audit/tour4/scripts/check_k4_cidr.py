#!/usr/bin/env python3
"""
K4 — Vérifier l'absence de la règle fausse usable_hosts / num_addresses - 2 / prefix < 31
et du vocabulaire Python ipaddress (iface_obj, net.network_address, net.prefixlen) dans tout le dépôt,
ainsi que la prise en charge des 4 cas /24, /30, /31 (RFC 3021 -> 2 hôtes) et /32 (1 hôte)
dans l'exercice 1 de b3-pfsense Chapitre 1.
"""
import sys, os, re, glob, json

ROOT = sys.argv[1]

PAT = re.compile(
    r"usable_hosts|num_addresses\s*-\s*2|prefix\s*(?:<|&lt;)\s*31|n\s*(?:<|&lt;)\s*31.*sinon\s*0|iface_obj\.network|net\.network_address|net\.prefixlen"
)

hits = []
for root, dirs, files in os.walk(ROOT):
    rel_dir = os.path.relpath(root, ROOT)
    if rel_dir.startswith(("audit", "dist", ".git", "node_modules", "revi-cours-html")):
        continue
    for f in sorted(files):
        if not f.endswith((".js", ".html", ".md")):
            continue
        p = os.path.join(root, f)
        rel = os.path.relpath(p, ROOT)
        txt = open(p, encoding="utf-8", errors="ignore").read()
        for m in PAT.finditer(txt):
            hits.append((rel, m.group(0)))

for rel, match in hits:
    print(f"OCCURRENCE INTERDITE: {rel} -> {match!r}")

pf_ex_path = os.path.join(ROOT, "server/exercises/b3-pfsense/chapitre1.js")
pf_txt = open(pf_ex_path, encoding="utf-8").read()
required_cases = [
    ("/24", "hosts=254"),
    ("/30", "hosts=2"),
    ("/31", "hosts=2"),
    ("/32", "hosts=1"),
]
missing_cases = []
for mask, expected_hosts in required_cases:
    if mask not in pf_txt or expected_hosts not in pf_txt:
        missing_cases.append(f"{mask} ({expected_hosts})")

# Check specifically that /31 is tested in tests/solution of pf3-c1-e1
ex1_block = pf_txt.split('"id": "pf3-c1-e2"')[0]
for mask, expected_hosts in required_cases:
    if mask not in ex1_block:
        if f"{mask} ({expected_hosts})" not in missing_cases:
            missing_cases.append(f"{mask} absent de pf3-c1-e1")

print(f"TOTAL occurrences règle CIDR fausse / ipaddress résiduel: {len(hits)}  (attendu: 0)")
print(f"Cas CIDR manquants dans pf3-c1-e1 (/24, /30, /31, /32): {len(missing_cases)} -> {missing_cases}  (attendu: 0)")
sys.exit(1 if (hits or missing_cases) else 0)
