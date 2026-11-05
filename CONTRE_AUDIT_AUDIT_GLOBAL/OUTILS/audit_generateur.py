#!/usr/bin/env python3
"""
CONTRE_AUDIT_AUDIT_GLOBAL/OUTILS/audit_generateur.py
Analyse forensique systématique du script scripts/build_audit_global_csvs.js
"""
import re, os, sys

target = "/home/rd/Desktop/proba/scripts/build_audit_global_csvs.js"
with open(target, "r", encoding="utf-8") as f:
    lines = f.readlines()

print(f"Total lines: {len(lines)}")

patterns = [
    ("HARDCODED_NUMBERS", r"\b(814|1250|896|354|3089|3158|2829|2898|260|701|184|844|652|82|68|71|832|931)\b"),
    ("SLICE_USAGE", r"\.slice\("),
    ("MIN_MAX", r"Math\.(min|max)"),
    ("INCLUDES_CALL", r"\.includes\("),
    ("DEFAULT_FALLBACKS", r"\|\|\s*(4|1|0|'[^']*')"),
    ("FABRICATED_PROOFS", r"(TESTEE_RUNNER_OK|VERIFIEE_NON_REGRESSION|SPECIFIE_DANS_ENONCE|PROTEGE_SERVEUR_FASTIFY|VALIDATEUR_GENERIQUE|CONFORME_VALIDATION_TECHNIQUE)"),
    ("HARDCODED_RATIO", r"> 2\.0x"),
    ("SOURCE_DEPENDENCY", r"(CONTRE_AUDIT_FINAL|FINALISATION_REMEDIATION)"),
    ("MANUAL_OBJECT_ARRAYS", r"(anomalies\s*=\s*\[|claims\s*=\s*\[|pilotCourses\s*=\s*new Set|coursePoles\s*=\s*\{)")
]

findings = []

for idx, line in enumerate(lines, 1):
    text = line.strip()
    for cat, pat in patterns:
        matches = re.findall(pat, text)
        if matches:
            findings.append((idx, cat, text, matches))

print(f"Total pattern matches found: {len(findings)}")

out_log = "/home/rd/Desktop/proba/CONTRE_AUDIT_AUDIT_GLOBAL/PREUVES/generateur_pattern_scan.log"
with open(out_log, "w", encoding="utf-8") as out:
    out.write(f"ANALYSE DU GENERATEUR scripts/build_audit_global_csvs.js\n")
    out.write(f"Nombre total d occurrences detectees : {len(findings)}\n\n")
    for idx, cat, text, matches in findings:
        out.write(f"Ligne {idx:4d} [{cat}] : {text}\n")

print(f"Rapport de scan ecrit dans {out_log}")
