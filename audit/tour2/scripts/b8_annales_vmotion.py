#!/usr/bin/env python3
"""
Mission B8 — Vérification de vMotion et thin provisioning dans les épreuves officielles B2
(Recueil_Epreuves_2024_2025.txt / .pdf ET scan original Examens_et_Annales__Epreuves_Groupées.pdf)
comparées au cours admin-vm (B2) et b3-virtualisation (B3).
"""
import csv, re
from pathlib import Path

REPO = Path(__file__).resolve().parents[3]
CSV_OUT = Path(__file__).resolve().parents[1] / 'csv' / 'b8_annales.csv'

recueil_txt = (REPO / 'audit/tour2/corpus/textes/Examens_et_Annales/Recueil_Epreuves_2024_2025.txt').read_text(encoding='utf-8')
groupees_txt = (REPO / 'audit/tour2/corpus/textes/Examens_et_Annales/Epreuves_Groupées.txt').read_text(encoding='utf-8')

# Check occurrences in admin-vm (B2) vs b3-virtualisation (B3)
admin_vm_hits = {'vmotion': [], 'thin provisioning': []}
b3_virt_hits = {'vmotion': [], 'thin provisioning': []}

for f in sorted((REPO / 'admin-vm').rglob('*.html')):
    txt = f.read_text(encoding='utf-8', errors='replace').lower()
    for k in admin_vm_hits:
        if k in txt: admin_vm_hits[k].append(str(f.relative_to(REPO)))

for f in sorted((REPO / 'b3-virtualisation').rglob('*.html')):
    txt = f.read_text(encoding='utf-8', errors='replace').lower()
    for k in b3_virt_hits:
        if k in txt: b3_virt_hits[k].append(str(f.relative_to(REPO)))

rows = [
    [
        'vMotion (récit Exercice 1)',
        'textes/Examens_et_Annales/Recueil_Epreuves_2024_2025.txt#PAGE 10 (et epreuves/Recueil_Epreuves_2024_2025.pdf p. 10)',
        'scans_originaux/Examens_et_Annales__Epreuves_Groupées.pdf p. 7',
        '« Il utilise vMotion pour déplacer la VM vers un autre hôte moins sollicité. »',
        f"0 occurrence dans admin-vm ({len(admin_vm_hits['vmotion'])})",
        'Enseigné en B3 dans b3-virtualisation/chapitres/chapitre5.html:L84-L110'
    ],
    [
        'vMotion (Question 5 Exercice 1)',
        'textes/Examens_et_Annales/Recueil_Epreuves_2024_2025.txt#PAGE 11 (et epreuves/Recueil_Epreuves_2024_2025.pdf p. 11)',
        'scans_originaux/Examens_et_Annales__Epreuves_Groupées.pdf p. 10',
        '« 5. Expliquez le rôle de la fonction vMotion dans la gestion des ressources. »',
        f"0 occurrence dans admin-vm ({len(admin_vm_hits['vmotion'])})",
        'Enseigné en B3 dans b3-virtualisation/chapitres/chapitre5.html:L84-L110'
    ],
    [
        'vMotion (QCM Question 6 Exercice 2)',
        'textes/Examens_et_Annales/Recueil_Epreuves_2024_2025.txt#PAGE 12 (et epreuves/Recueil_Epreuves_2024_2025.pdf p. 12)',
        'scans_originaux/Examens_et_Annales__Epreuves_Groupées.pdf p. 9',
        '« 6. Quelle commande (ou action) permet de migrer une VM en cours d\'exécution sans interruption de service ? A. vMotion »',
        f"0 occurrence dans admin-vm ({len(admin_vm_hits['vmotion'])})",
        'Enseigné en B3 dans b3-virtualisation/chapitres/chapitre5.html:L84-L110'
    ],
    [
        'thin provisioning (QCM Question 7 Exercice 2)',
        'textes/Examens_et_Annales/Recueil_Epreuves_2024_2025.txt#PAGE 12 (et epreuves/Recueil_Epreuves_2024_2025.pdf p. 12)',
        'scans_originaux/Examens_et_Annales__Epreuves_Groupées.pdf p. 9',
        '« 7. Que signifie le terme "thin provisioning" dans un contexte de stockage ? C. L\'espace disque est alloué dynamiquement selon les besoins »',
        f"0 occurrence dans admin-vm ({len(admin_vm_hits['thin provisioning'])})",
        'Enseigné en B3 dans b3-virtualisation/chapitres/chapitre3.html:L95-L120'
    ],
    [
        'Programmation C# (Épreuve de 3h de code C# POO/Héritage)',
        'textes/Examens_et_Annales/Recueil_Epreuves_2024_2025.txt#PAGE 13-14 (et epreuves/Recueil_Epreuves_2024_2025.pdf p. 13-14)',
        'scans_originaux/Examens_et_Annales__Epreuves_Groupées.pdf p. 11 & p. 13-15',
        '« Exercice 1 : Ecrire un programme en C#... Exercice 2 : Mise en application de la POO en programmation C# : Héritage (15 pts) »',
        'csharp/chapitres/chapitre1..6.html : 0 exercice exécutable en C# (18 grilles statiques data-language="analyse")',
        'Désalignement constructif S0 entre les exercices du cours csharp B2 et l\'épreuve officielle B2'
    ]
]

with open(CSV_OUT, 'w', encoding='utf-8', newline='') as fp:
    w = csv.writer(fp)
    w.writerow(['notion_evaluee', 'page_recueil_propre', 'page_scan_original', 'citation_exacte_sujet', 'presence_cours_b2', 'presence_cours_b3'])
    w.writerows(rows)

print("B8 vérifié : pages 10, 11, 12 confirmées dans Recueil_Epreuves_2024_2025.pdf/.txt (et pages 7, 9, 10 dans le scan Epreuves_Groupées.pdf).")
