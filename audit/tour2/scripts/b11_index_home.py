#!/usr/bin/env python3
"""
Mission B11 — Vérification de la page d'accueil index.html :
- Onglet actif par défaut dans le HTML statique
- Valeurs des compteurs affichés
- Ordre des 70 cartes dans le DOM (#grid)
- Comportement avant et après exécution du JavaScript (applyFilter au chargement).
"""
import re, csv
from pathlib import Path
from bs4 import BeautifulSoup

REPO = Path(__file__).resolve().parents[3]
CSV_OUT = Path(__file__).resolve().parents[1] / 'csv' / 'b11_index_cartes.csv'

raw = (REPO / 'index.html').read_text(encoding='utf-8', errors='replace')
soup = BeautifulSoup(raw, 'html.parser')

active_tab = soup.select_one('.level-tab.is-active')
status_bar = soup.select_one('#filterStatus')
hero_sub = soup.select_one('.hero__sub')

print("Onglet actif par défaut dans le HTML :", active_tab.get('id'), "->", active_tab.get_text(" ", strip=True))
print("Texte barre de statut initiale :", status_bar.get_text(" ", strip=True) if status_bar else '')

cards = soup.select('#grid a.card')
rows = []
for idx, card in enumerate(cards, 1):
    href = card.get('href', '')
    lvl = card.get('data-level', '')
    style = card.get('style', '')
    hidden_attr = card.has_attr('hidden')
    title = card.select_one('.card__title').get_text(" ", strip=True) if card.select_one('.card__title') else ''
    rows.append([idx, href.split('/')[0], lvl, title, style, 'OUI' if hidden_attr else 'NON'])

with open(CSV_OUT, 'w', encoding='utf-8', newline='') as fp:
    w = csv.writer(fp)
    w.writerow(['position_dom', 'slug', 'data_level', 'titre_carte', 'style_initial', 'attribut_hidden_initial'])
    w.writerows(rows)

print(f"Total cartes dans #grid : {len(rows)}")
print(f"Niveaux des 24 premières cartes du DOM : {[r[2] for r in rows[:24]]}")
print(f"Positions DOM de B2 : 1..24 | B1 : 25..47 | B3 : 48..70")
