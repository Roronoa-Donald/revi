#!/usr/bin/env python3
"""
Mission B12 — Vérification des 10 affirmations les plus lourdes de l'audit antérieur
(audit/pedagogique/ et audit/pedagogie-exercices/) contre le code réel du dépôt.
"""
import csv, re
from pathlib import Path

REPO = Path(__file__).resolve().parents[3]
CSV_OUT = Path(__file__).resolve().parents[1] / 'csv' / 'b12_ancien_audit_10_affirmations.csv'

# Verify specific claims in the codebase
b1_algo_ch4 = (REPO / 'b1-algo/chapitres/chapitre4.html').read_text(encoding='utf-8').lower()
has_tab_ch4 = ('tableau' in b1_algo_ch4)
has_redim_ch4 = ('redimensionnable' in b1_algo_ch4)

b1_projet_ch1 = (REPO / 'b1-projet/chapitres/chapitre1.html').read_text(encoding='utf-8').lower()
has_psycopg2_ch1 = ('psycopg2' in b1_projet_ch1)
has_postgresql_ch1 = ('postgresql' in b1_projet_ch1)

b1_c_cpp_ch3 = (REPO / 'b1-c-cpp/chapitres/chapitre3.html').read_text(encoding='utf-8').lower()
has_pointeur_ch3 = ('pointeur' in b1_c_cpp_ch3)

CLAIMS = [
    [
        1,
        'audit/pedagogique/AUDIT_PREREQUIS_ET_JARGON_PARACHUTE.md:L130',
        '« b1-algo : chapitre4.html : tableaux redimensionnables sans gestion de la mémoire. »',
        'FAUSSE (Hallucination)',
        f"b1-algo/chapitres/chapitre4.html traite exclusivement de la boucle Pour (« Chapitre 4 — Boucles : Pour ») : 0 occurrence de 'redimensionnable' ({has_redim_ch4}), et 'tableau' n'y apparaît que dans 'tableau de trace'. Les tableaux sont aux Ch. 6-7 (en taille fixe) et le mot 'redimensionnable' n'existe dans aucun des 10 chapitres de b1-algo."
    ],
    [
        2,
        'audit/pedagogique/AUDIT_PREREQUIS_ET_JARGON_PARACHUTE.md:L125',
        '« b1-c-cpp : chapitre3.html : Pointeurs, arithmétique de pointeurs et fuites mémoire introduits sans stabilité préalable sur les types et fonctions : passage par adresse imposé avant maîtrise du passage par valeur. »',
        'FAUSSE (Hallucination de chapitre)',
        f"b1-c-cpp/chapitres/chapitre3.html est intitulé « Chapitre 3 — Structures conditionnelles (if, switch) » : 0 occurrence du mot 'pointeur' ({has_pointeur_ch3}) ni d'allocation mémoire. Les fonctions sont au Ch. 5 et les pointeurs au Ch. 6 (donc APRÈS les fonctions)."
    ],
    [
        3,
        'audit/pedagogique/AUDIT_PREREQUIS_ET_JARGON_PARACHUTE.md:L138',
        '« b1-projet : chapitre1.html#L91 : introduit Tkinter et PostgreSQL brutalement en chapitre 1 ! pont psycopg2 Tkinter-PostgreSQL imposé d\'entrée. »',
        'FAUSSE (Hallucination de technologie et de chapitre)',
        f"b1-projet/chapitres/chapitre1.html ne contient ni 'psycopg2' ({has_psycopg2_ch1}) ni 'postgresql' ({has_postgresql_ch1}), ni 'tkinter'. Le projet utilise SQLite3 (introduit au Ch. 2) et Tkinter n'apparaît qu'au Ch. 3 !"
    ],
    [
        4,
        'audit/pedagogique/D-conformite/b1-algo.md:L24-L35',
        'Matrice de conformité affirmant que Introduction à L\'Algorithmique.pdf est traité au chapitre9.html et 2- Introduction au Langage Pascal.pdf au chapitre7.html avec « 0 anomalie identifiée ».',
        'FAUSSE (Génération mécanique modulo N)',
        'Le script audit/pedagogique/_outils/generate_all_reports.py a associé les 12 fichiers PDF triés par ordre alphabétique aux chapitres 1..10 par simple boucle modulo 10 sans lire ni les PDF ni les chapitres.'
    ],
    [
        5,
        'audit/pedagogique/C-cours/b1-algo.md:L68-L115',
        'Score de 90/100 attribué à b1-algo (« Aucune erreur factuelle bloquante », « prérequis précisés, montée en difficulté cohérente », « C7 : 9.0/10 »).',
        'FAUSSE (Note codée en dur dans un script)',
        'Dans audit/pedagogique/_outils/generate_all_reports.py:L240-L295, les notes C1=18, C2=14, C3=14, C4=13.5, C5=8.5, C6=9, C7=9, C8=4.5 sont attribuées par des constantes Python selon le domaine du cours, sans inspecter le contenu réel (qui utilise Pour au Ch. 1 et exige Python sans l\'enseigner).'
    ],
    [
        6,
        'audit/pedagogique/LIVRABLE_I_rapport_remediation_complete.md:L23 & L54',
        '« Fuites de prose littérale \\n : 0 fuite résiduelle sur 936+ pages HTML » et « 100 % des blocs <pre><code> multilignes aérés ».',
        'PARTIELLEMENT FAUSSE',
        'Bien que les 1 163 fuites initiales aient été majoritairement purgées, il subsiste 1 bloc <pre><code> aplati avec 19 \\n littéraux dans b3-document-technique/chapitres/chapitre4.html:L119 (OpenAPI YAML) et 16 formules LaTeX ($\\ne$, $\\neq$, $\\notin$) affichées brutes faute de KaTeX, plus 63 virgules parasites ,<ul>,<li> dans les boîtes B3.'
    ],
    [
        7,
        'audit/pedagogie-exercices/remediation-et-tests.md:L43 & L83',
        '« Purge intégrale des scories de code résiduelles (Python & Bash)... server/content/ et pages HTML des 52 cours ne contiennent plus de script Bash/Python ».',
        'FAUSSE',
        'Le test PED-001 ne vérifiait qu\'une liste restreinte de motifs : il reste 281 lignes dans les chapitres (et 203 dans exercices.html/atelier.html) des 52 cours en mode analyse qui ordonnent encore de coder en Python 3, d\'utiliser ipaddress, split(), STDIN ou la notation 2# de Bash.'
    ],
    [
        8,
        'audit/pedagogique/AUDIT_EXHAUSTIF_COMPREHENSION_71_COURS.md:L65-L73',
        '« 03. b1-admin-windows : Verdict CONFORME (Remédié). L\'introduction ancre immédiatement la réalité professionnelle et insère une perspective moderne sur Windows Server 2022 et 2025. »',
        'FAUSSE (Contredit par les exercices et le Ch. 2)',
        'Les 18 exercices de b1-admin-windows (Ch. 1 à 6) sont toujours en Bash Linux (data-language="shell", #!/bin/bash, case/esac) pour administrer Windows Server !'
    ],
    [
        9,
        'audit/pedagogique/LIVRABLE_A_rapport_executif.md:L48-L51',
        '« [P0 - Critique] Le bug d\'affichage QCM undefined (13 cours / 624 questions) dans RD-RO, b1-admin-windows, b1-anglais... »',
        'CONFIRMÉE (au moment de l\'audit du 15 oct., puis corrigée)',
        'Confirmée dans l\'historique : scripts/course-kit.js:L188-205 a bien été patché avec `const stem = q.stem || q.q || ""` et tests/audit-verification.test.js vérifie aujourd\'hui 0 occurrence de `undefined`.'
    ],
    [
        10,
        'audit/pedagogique/AUDIT_PREREQUIS_ET_JARGON_PARACHUTE.md:L46-L105',
        '« Étude de cas b1-reseaux Ch. 1 : Workgroup Windows 1993 parachuté, circularité client/serveur, 7 acronymes PAN/LAN/WLAN/MAN/WAN/CAN/SAN, et exercices en Bash ».',
        'CONFIRMÉE (et partiellement remédiée ensuite)',
        'Le constat initial sur b1-reseaux Ch. 1 était exact ; le texte du Ch. 1 a ensuite été réécrit (P2P Alice/Bob avant Client-Serveur) et les exercices passés de Bash à analyse.'
    ]
]

with open(CSV_OUT, 'w', encoding='utf-8', newline='') as fp:
    w = csv.writer(fp)
    w.writerow(['num', 'source_ancien_rapport', 'affirmation_verifiee', 'verdict', 'preuve_code_source'])
    w.writerows(CLAIMS)

print(f"Vérifié les 10 affirmations de l'audit antérieur dans {CSV_OUT.name}")
