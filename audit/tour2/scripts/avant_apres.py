#!/usr/bin/env python3
"""
Lot 0 — Script « avant/après » qui rejoue tous les scripts de la Mission B
et imprime le tableau de référence des compteurs de non-régression.
"""
import subprocess, sys, csv
from pathlib import Path

SCRIPTS_DIR = Path(__file__).resolve().parent
CSV_DIR = SCRIPTS_DIR.parent / 'csv'

SCRIPTS = [
    'b0_virgules_et_seuils_b3.py',
    'b1_seuils.py',
    'b2_indices.py',
    'b3_tu_vous.py',
    'b4_liens_404.py',
    'b5_slash_n.py',
    'b6_analyse_cours.py',
    'b7_cycles_prerequis.py',
    'b8_annales_vmotion.py',
    'b9_notions_cartes.py',
    'b10_examens_b3.py',
    'b11_index_home.py',
    'b12_ancien_audit.py',
]

for s in SCRIPTS:
    subprocess.run([sys.executable, str(SCRIPTS_DIR / s)], check=True, stdout=subprocess.DEVNULL)

def count_csv(name, pred=None):
    with open(CSV_DIR / name, encoding='utf-8') as f:
        rows = list(csv.DictReader(f))
    return sum(1 for r in rows if (pred(r) if pred else True))

metrics = [
    ("B0a — Lignes HTML avec virgules parasites (`</tag>,<tag>`)", count_csv('b0_virgules_parasites_63.csv')),
    ("B0b — Pages `.bands` sans signe `%`", count_csv('b0_bands_sans_pourcent_153.csv')),
    ("B1a — Chapitres avec trou `90–94 %`", count_csv('b1_seuils.csv', lambda r: r['type_page']=='chapitre' and 'trou (90–94 %' in r['verdict'])),
    ("B1b — Chapitres avec trou `4/8`", count_csv('b1_seuils.csv', lambda r: r['type_page']=='chapitre' and 'trou (4/8' in r['verdict'])),
    ("B1c — Chapitres sans seuil chiffré", count_csv('b1_seuils.csv', lambda r: r['type_page']=='chapitre' and 'incomplet' in r['verdict'])),
    ("B2  — Blocs `<details class='lab__hints'>` incohérents (`Deux indices` != 2)", count_csv('b2_indices.csv', lambda r: r['incoherent_actuel']=='OUI')),
    ("B3a — Chapitres `tu/vous` >= 5 hors code (heuristique)", count_csv('b3_tu_vous_71.csv', lambda r: r['heuristique_71_ge5']=='OUI')),
    ("B3b — Chapitres mêlant `tu/vous` hors gabarit `course-kit.js`", count_csv('b3_tu_vous_71.csv', lambda r: r['melange_hors_gabarit']=='OUI')),
    ("B4a — Liens 404 totaux sur disque", count_csv('b4_liens_404.csv')),
    ("B4b — Liens 404 barre de navigation (`NAV_B3_B2_754`)", count_csv('b4_liens_404.csv', lambda r: r['famille_404']=='NAV_B3_B2_754')),
    ("B4c — Liens 404 `chapitres/exercices.html` B3 (`EXERCICES_B3_396`)", count_csv('b4_liens_404.csv', lambda r: r['famille_404']=='EXERCICES_B3_396')),
    ("B5a — Lignes HTML avec `\\n` brut", count_csv('b5_slash_n.csv')),
    ("B5b — Blocs `<pre><code>` aplatis avec `\\n` littéral", count_csv('b5_slash_n.csv', lambda r: 'VRAIE_FUITE' in r['categorie'])),
    ("B6a — Cours actifs en `data-language='analyse'`", count_csv('b6_cours_analyse.csv')),
    ("B6b — Lignes contradictoires Python/Bash dans les 52 cours `analyse`", count_csv('b6_lignes_contradictoires.csv')),
    ("B9a — Chapitres où `nb_notions != 8` sous « Les 8 notions »", count_csv('b9_notions_cartes.csv', lambda r: r['nb_notions_listees']!='8')),
    ("B10 — Pages d'examen avec corrigé `.box--solution` en clair", count_csv('b10_examens_en_clair.csv', lambda r: 'EN CLAIR' in r['etat_affichage_ecran'])),
    ("B11 — Cartes B2 placées avant B1 en tête de `#grid` dans `index.html`", count_csv('b11_index_cartes.csv', lambda r: int(r['position_dom'])<=24 and r['data_level']=='b2')),
]

print("| Compteur de contrôle (Mission B) | Valeur de référence (Avant Lot 1) | Cible après correction |")
print("| :--- | :---: | :---: |")
for label, val in metrics:
    target = "Décision A/B/C" if "B6a" in label else "0"
    print(f"| {label} | **{val}** | `{target}` |")
