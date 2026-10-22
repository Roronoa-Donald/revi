#!/usr/bin/env python3
"""
Vérification K11 — Présence effective des livrables des Tours 1, 2, 3 et 4
et existence sur disque des chemins cités dans les rapports.
"""
import pathlib
import sys

ROOT = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else pathlib.Path('.')

REQUIRED_FILES = [
    'audit/00-cartographie.md',
    'audit/01-graphe-prerequis.md',
    'audit/02-synthese.md',
    'audit/03-backlog-corrections.md',
    'audit/04-gabarit-pedagogique.md',
    'audit/outils/extract_concepts_and_cycles.py',
    'audit/tour2/00-sources-manquantes.md',
    'audit/tour2/01-fidelite-sources.md',
    'audit/tour2/02-verification-rapport.md',
    'audit/tour2/03-etalonnage.md',
    'audit/tour2/04-plan-corrections.md',
    'audit/tour2/05-decision-analyse.md',
    'audit/tour3/06-rapport-final-tour3.md',
    'audit/tour4/A-securite.md',
    'audit/tour4/B-qualite-rendu.md',
    'audit/tour4/C-exercices-seuils.md',
    'audit/tour4/exceptions-analyse.json',
]

missing = []
for rel in REQUIRED_FILES:
    if not (ROOT / rel).exists():
        missing.append(rel)

fidelite_md = list((ROOT / 'audit/tour2/fidelite').glob('*.md')) if (ROOT / 'audit/tour2/fidelite').exists() else []
tour2_scripts = list((ROOT / 'audit/tour2/scripts').glob('*.py')) if (ROOT / 'audit/tour2/scripts').exists() else []
tour2_csv = list((ROOT / 'audit/tour2/csv').glob('*.csv')) if (ROOT / 'audit/tour2/csv').exists() else []
tour1_reg = list((ROOT / 'audit/registres').glob('*.csv')) if (ROOT / 'audit/registres').exists() else []
tour1_rap = list((ROOT / 'audit/rapports').glob('*.md')) if (ROOT / 'audit/rapports').exists() else []

print(f"Fichiers principaux requis présents: {len(REQUIRED_FILES) - len(missing)}/{len(REQUIRED_FILES)}")
print(f"Fiches audit/tour2/fidelite/*.md: {len(fidelite_md)}  (attendu: 69)")
print(f"Scripts audit/tour2/scripts/*.py: {len(tour2_scripts)}  (attendu: 15)")
print(f"CSV audit/tour2/csv/*.csv: {len(tour2_csv)}  (attendu: 19)")
print(f"Registres Tour 1 audit/registres/*.csv: {len(tour1_reg)}  (attendu: 71)")
print(f"Rapports Tour 1 audit/rapports/*.md: {len(tour1_rap)}  (attendu: 71)")
print(f"TOTAL fichiers livrables manquants: {len(missing)} -> {missing}  (attendu: 0)")
sys.exit(0 if (len(missing) == 0 and len(fidelite_md) >= 68 and len(tour2_scripts) >= 15 and len(tour2_csv) >= 19) else 1)
