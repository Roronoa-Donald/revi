# refonte/generate_pilot_fiches.py
# -*- coding: utf-8 -*-
"""
Générateur des fiches de conception détaillées pour la vague pilote :
- Linux B1 (18 fiches lx-c1-e1 à lx-c6-e3)
- Probabilités B2 (18 fiches pb2-c1-e1 à pb2-c6-e3)
- Recherche Opérationnelle B2 (20 fiches ro2-c1-e1 à ro2-c6-e3)

Chaque fiche contient :
1. Énoncé complet, contexte métier / académique
2. Type d'exercice, composant d'interface, source exacte (fichier:page)
3. Solution complète rédigée, étapes intermédiaires, calculs vérifiés
4. Jeu de tests (au moins 5 variantes acceptées, au moins 5 quasi-erreurs rejetées avec feedback spécifique)
"""

import os

FICHES_DIR = '/home/rd/Desktop/proba/refonte/fiches'
os.makedirs(FICHES_DIR, exist_ok=True)

def write_fiche(fiche_id, content):
    path = os.path.join(FICHES_DIR, f"{fiche_id}.md")
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")
    print(f"[ok] Fiche écrite : {fiche_id}.md")

print("Génération des fiches de conception du pilote...")
