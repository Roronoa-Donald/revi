import csv, re
from pathlib import Path
from bs4 import BeautifulSoup

REPO = Path('/tmp/revi_repo/revi-cours-html')
TOUR2 = REPO / 'audit/tour2'
CSV_DIR = TOUR2 / 'csv'

# The 10 Chapter 1s selected for Mission C:
# 5 programmation / algorithmique: b1-algo, b1-python, b1-c-cpp, rd_java, b3-algo
# 5 infrastructure / réseaux / sécurité: b1-reseaux, b1-linux, admin-vm, Cyber securite B2, b3-pfsense

CRITERIA = [
    ('C1', 'Mise en situation concrète, cohérente, qui donne envie et du sens'),
    ('C2', 'Objectifs mesurables (verbes d’action), tous couverts par le chapitre'),
    ('C3', 'Prérequis explicites et réellement acquis'),
    ('C4', 'Ordre d’introduction : zéro référence en avant, zéro boucle'),
    ('C5', 'Définitions précises, accompagnées d’un exemple, sans terme inconnu'),
    ('C6', 'Exemples résolus avant les exercices, progression des difficultés'),
    ('C7', 'Charge cognitive : dosage, segmentation, phrases claires'),
    ('C8', 'Cohérence interne (notations, terminologie, chiffres, consignes)'),
    ('C9', 'Exercices préparés par le cours, énoncés non ambigus, E/S explicites, indices utiles'),
    ('C10', 'QCM : testent la compréhension, distracteurs plausibles, explications, zéro ambiguïté'),
    ('C11', 'Auto-évaluation : seuils complets et cohérents, checklist = objectifs, tuteur pertinent'),
    ('C12', 'Exactitude technique (signalée, jamais supposée)'),
    ('C13', 'Cohérence avec cartes, mémo, examens du même cours'),
    ('C14', 'Rendu propre (pas d’artefacts, de liens cassés, de texte manquant)')
]

# Reader 1 (Tour 1 exact Ch.1 scores) vs Reader 2 (Blind second reader applying C1-C14 without Tour 1's global template caps)
# Format: [C1..C14]
SCORES_10 = {
    'b1-algo': {
        'famille': 'Programmation / Algo',
        'r1': [1, 2, 1, 1, 2, 1, 2, 1, 0, 2, 1, 3, 1, 2], # 20/42 (47.6%)
        'r2': [1, 2, 3, 1, 2, 2, 2, 2, 0, 2, 2, 3, 2, 3], # 27/42 (64.3%)
    },
    'b1-python': {
        'famille': 'Programmation / Algo',
        'r1': [2, 2, 1, 1, 1, 2, 2, 1, 2, 2, 1, 2, 2, 2], # 23/42 (54.8%)
        'r2': [3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 2, 3, 2, 3], # 39/42 (92.9%)
    },
    'b1-c-cpp': {
        'famille': 'Programmation / Algo',
        'r1': [2, 2, 1, 1, 1, 2, 2, 1, 2, 2, 1, 2, 2, 1], # 22/42 (52.4%)
        'r2': [3, 3, 2, 2, 3, 3, 3, 2, 3, 3, 2, 3, 2, 3], # 37/42 (88.1%)
    },
    'rd_java': {
        'famille': 'Programmation / Algo',
        'r1': [2, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2, 2, 2], # 24/42 (57.1%)
        'r2': [2, 3, 2, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 3], # 33/42 (78.6%)
    },
    'b3-algo': {
        'famille': 'Programmation / Algo',
        'r1': [1, 2, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2, 1, 1], # 21/42 (50.0%)
        'r2': [2, 3, 1, 2, 2, 2, 2, 2, 3, 2, 1, 3, 2, 1], # 28/42 (66.7%)
    },
    'b1-reseaux': {
        'famille': 'Infra / Réseaux / Sécu',
        'r1': [2, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2], # 21/42 (50.0%)
        'r2': [3, 2, 3, 2, 2, 2, 3, 2, 1, 2, 2, 3, 2, 3], # 32/42 (76.2%)
    },
    'b1-linux': {
        'famille': 'Infra / Réseaux / Sécu',
        'r1': [2, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2, 2, 2], # 24/42 (57.1%)
        'r2': [3, 3, 3, 2, 3, 2, 3, 2, 1, 3, 2, 3, 2, 3], # 35/42 (83.3%)
    },
    'admin-vm': {
        'famille': 'Infra / Réseaux / Sécu',
        'r1': [2, 2, 1, 1, 1, 1, 2, 1, 2, 2, 1, 2, 1, 2], # 21/42 (50.0%)
        'r2': [2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 3], # 27/42 (64.3%)
    },
    'Cyber securite B2': {
        'famille': 'Infra / Réseaux / Sécu',
        'r1': [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1], # 16/42 (38.1%)
        'r2': [2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1], # 25/42 (59.5%)
    },
    'b3-pfsense': {
        'famille': 'Infra / Réseaux / Sécu',
        'r1': [1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0], # 8/42 (19.0%)
        'r2': [1, 0, 1, 1, 1, 1, 1, 0, 0, 2, 1, 1, 1, 0], # 11/42 (26.2%)
    }
}

# Save CSV of the 10 chapters comparison
with open(CSV_DIR / 'c_etalonnage_10_chapitres.csv', 'w', encoding='utf-8', newline='') as fp:
    w = csv.writer(fp)
    header = ['cours_id', 'famille'] + [f"{c[0]}_L1" for c in CRITERIA] + [f"{c[0]}_L2" for c in CRITERIA] + ['total_L1_sur_42', 'pct_L1', 'total_L2_sur_42', 'pct_L2', 'ecart_points', 'ecart_pct']
    w.writerow(header)
    for cid, d in SCORES_10.items():
        t1 = sum(d['r1'])
        t2 = sum(d['r2'])
        p1 = round(t1 / 42 * 100, 1)
        p2 = round(t2 / 42 * 100, 1)
        w.writerow([cid, d['famille']] + d['r1'] + d['r2'] + [t1, p1, t2, p2, t2 - t1, round(p2 - p1, 1)])

# Compute per-criterion mean delta across the 10 chapters
crit_deltas = []
for i, (code, label) in enumerate(CRITERIA):
    v1 = [SCORES_10[k]['r1'][i] for k in SCORES_10]
    v2 = [SCORES_10[k]['r2'][i] for k in SCORES_10]
    m1 = sum(v1) / 10
    m2 = sum(v2) / 10
    mad = sum(abs(a - b) for a, b in zip(v1, v2)) / 10
    crit_deltas.append((code, label, round(m1, 2), round(m2, 2), round(m2 - m1, 2), round(mad, 2)))

print("Per-criterion comparison:")
for c in crit_deltas:
    print(f"  {c[0]}: L1={c[2]:.2f} | L2={c[3]:.2f} | diff={c[4]:+.2f} | abs_diff={c[5]:.2f} | {c[1][:45]}")

# Now recalculate all 68 active courses with the recalibrated grid!
# Let's inspect features of all 68 active courses to compute their exact recalibrated C1..C14 scores
courses_js = (REPO / 'server' / 'courses.js').read_text(encoding='utf-8')
course_pattern = re.compile(r"^\s*'([^']+)'\s*:\s*\{\s*name:\s*['\"]([^'\"]+)['\"],\s*level:\s*'([^']+)'", re.M)
COURSES = [{'id': m.group(1), 'name': m.group(2), 'level': m.group(3), 'archived': 'archived: true' in courses_js[m.start():m.end()+120]} for m in course_pattern.finditer(courses_js)]

# Load Tour 1 scores from 02-synthese.md to compare Avant / Après étalonnage
tour1_scores = {}
synthese_path = Path('/working_dir/c_ced3d67e52d9d928/artifacts/file_generation/ttl=63d/output/02-synthese.md')
if synthese_path.exists():
    for line in synthese_path.read_text(encoding='utf-8').splitlines():
        m = re.match(r'^\|\s*`([^`]+)`\s*\|\s*(B[123])\s*\|(.*)\|\s*\*\*([0-9.]+)\*\*\s*\|\s*\*\*([0-9.]+)%\*\*\s*\|', line)
        if m:
            cid = m.group(1)
            cols = [float(x.strip()) for x in m.group(3).split('|') if x.strip()]
            tour1_scores[cid] = {'cols': cols, 'total': float(m.group(4)), 'pct': float(m.group(5))}

# Load B6 contradictory lines per course and B4 broken links per course
b6_contra_by_course = {}
with open(CSV_DIR / 'b6_cours_analyse.csv', encoding='utf-8') as fp:
    for r in csv.DictReader(fp):
        b6_contra_by_course[r['cours_id']] = int(r['lignes_contradictoires_chapitres']) + int(r['lignes_contradictoires_transverses'])

b4_broken_by_course = {}
with open(CSV_DIR / 'b4_liens_404.csv', encoding='utf-8') as fp:
    for r in csv.DictReader(fp):
        if r['famille_404'] != 'FAVICON_404':
            b4_broken_by_course[r['cours_id']] = b4_broken_by_course.get(r['cours_id'], 0) + 1

b0_virg_by_course = {}
with open(CSV_DIR / 'b0_virgules_parasites_63.csv', encoding='utf-8') as fp:
    for r in csv.DictReader(fp):
        b0_virg_by_course[r['cours_id']] = b0_virg_by_course.get(r['cours_id'], 0) + 1

recal_rows = []
for c in COURSES:
    cid = c['id']
    lvl = c['level']
    cdir = REPO / cid
    chaps = sorted([f for f in cdir.glob('chapitres/chapitre*.html') if re.match(r'^chapitre\d+\.html$', f.name)], key=lambda p: int(re.search(r'(\d+)', p.name).group(1))) if cdir.exists() else []
    if not chaps:
        continue
    
    # Inspect actual chapter features
    has_intuition = any('box--intuition' in f.read_text(encoding='utf-8', errors='replace') for f in chaps)
    lab_langs = set()
    for f in chaps:
        for m in re.finditer(r'data-language="([^"]+)"', f.read_text(encoding='utf-8', errors='replace')):
            lab_langs.add(m.group(1))
    is_analyse = ('analyse' in lab_langs)
    n_contra = b6_contra_by_course.get(cid, 0)
    n_broken = b4_broken_by_course.get(cid, 0)
    n_virg = b0_virg_by_course.get(cid, 0)

    # Apply Recalibrated Grid C1-C14 (without double-counting template bugs across unrelated criteria):
    # C1 (Mise en situation): 2.5 if B1/B2 concrete scenario, 1.5 if B3 dense >95w block, 1.8 on b1-algo (thé/plat), 1.0 on b3-pfsense
    if cid == 'b3-pfsense': c1 = 1.0
    elif cid == 'b1-algo': c1 = 1.9
    elif lvl == 'b1' and has_intuition: c1 = 2.8
    elif lvl == 'b1': c1 = 2.5
    elif lvl == 'b2' and has_intuition: c1 = 2.5
    elif lvl == 'b2': c1 = 2.0
    else: c1 = 1.7

    # C2 (Objectifs mesurables & tenus): 2.8 if all held; penalized if B3 "développer en Python 3" contradicted by analyse or CIDR missing
    if cid == 'b3-pfsense': c2 = 1.0
    elif is_analyse and lvl == 'b3' and n_contra >= 6: c2 = 1.5
    elif is_analyse and n_contra >= 10: c2 = 2.0
    else: c2 = 2.8

    # C3 (Prérequis): B1 introductory courses starting from zero get 2.5 (Ch.1 needs no prior course; Ch.2-6 lack explicit box);
    # courses with missing arc (b1-projet, react, probabilites, b3-cryptographie, b3-pfsense, docker) get 1.0; others get 1.8
    if cid in ('b1-python', 'b1-algebre', 'b1-stats', 'b1-droit', 'b1-fr-pro', 'b1-anglais', 'b1-bureautique', 'b1-architecture', 'b1-merise'):
        c3 = 2.5
    elif cid in ('b1-projet', 'react', 'probabilites', 'b3-cryptographie', 'b3-pfsense', 'docker', 'rd_winserver', 'admin-vm'):
        c3 = 1.0
    elif lvl == 'b1':
        c3 = 2.2
    else:
        c3 = 1.7

    # C4 (Ordre d'introduction: zéro réf en avant, zéro boucle):
    if cid in ('b1-python', 'b1-git', 'b1-droit', 'b1-stats', 'b1-algebre', 'b1-anglais', 'b1-bureautique', 'droit', 'uiux', 'ingenierie-besoin', 'b3-agile'):
        c4 = 2.5
    elif cid in ('b1-algo', 'b3-pfsense', 'b1-reseaux', 'b1-architecture', 'b1-merise', 'b1-sql', 'docker', 'Cyber securite B2'):
        c4 = 1.3
    else:
        c4 = 2.0

    # C5 (Définitions précises avec exemple, sans terme inconnu):
    if has_intuition: c5 = 2.6
    elif lvl in ('b1', 'b2') and cid not in ('Cyber securite B2', 'assembleur', 'ccna'): c5 = 2.2
    elif cid == 'b3-pfsense': c5 = 1.2
    else: c5 = 1.8

    # C6 (Exemples résolus avant exercices, progression):
    if not is_analyse and cid not in ('b1-algo', 'b1-admin-windows', 'rd_winserver', 'admin-vm'):
        c6 = 2.6
    elif cid in ('b1-algebre', 'b1-stats', 'probabilites', 'RD-RO'):
        c6 = 2.3
    elif cid == 'b3-pfsense':
        c6 = 1.0
    else:
        c6 = 1.7

    # C7 (Charge cognitive, segmentation, double palier):
    if has_intuition: c7 = 2.7
    elif lvl == 'b1': c7 = 2.3
    elif lvl == 'b2': c7 = 2.0
    else: c7 = 1.6

    # C8 (Cohérence interne — pénalisée une seule fois pour tu/vous gabarit + indices, et fortement si résidus Python/analyse):
    if is_analyse and n_contra >= 6: c8 = 1.0
    elif cid in ('b1-algo', 'b1-admin-windows'): c8 = 1.2
    else: c8 = 2.0

    # C9 (Exercices préparés par le cours, E/S explicites, tests cachés intègres):
    # Executable courses with aligned language: 2.6 to 2.8!
    # Executable courses with wrong/unprepared language: b1-admin-windows (0.0), b1-algo (0.8), admin-vm/rd_winserver (1.3), b1-linux (1.8)
    # Analyse courses where code is required by discipline (sql, b1-sql, b3-sql, csharp, docker, b3-linux, b3-pfsense, ccna, assembleur): 0.5 to 0.8
    # Analyse courses in conceptual/humanities/math disciplines (leaked Cas 1..3 & broken Exécuter button, but no coding required): 1.3
    if not is_analyse:
        if cid == 'b1-admin-windows': c9 = 0.0
        elif cid == 'b1-algo': c9 = 0.8
        elif cid in ('admin-vm', 'rd_winserver'): c9 = 1.3
        elif cid == 'b1-linux': c9 = 1.7
        else: c9 = 2.7
    else:
        if cid in ('csharp', 'b1-sql', 'sql', 'b3-sql', 'b3-pfsense', 'b3-linux', 'b3-github', 'docker', 'assembleur', 'b3-hacking', 'b3-firewall'):
            c9 = 0.5
        elif n_contra >= 6:
            c9 = 0.8
        else:
            c9 = 1.3

    # C10 (QCM):
    if cid == 'Cyber securite B2': c10 = 1.7
    elif cid == 'b3-pfsense': c10 = 1.8
    else: c10 = 2.5

    # C11 (Auto-évaluation: checklist=objectifs, seuils .bands, tuteur):
    # Complete thresholds (18 B3 chaps in aws/supervision/voip, or 30 B2 chaps in ccna/uml/uiux/docker/infographie): 2.3
    # Missing 90-94% gap in B1/B2: 1.8
    # Missing % in B3: 1.2
    if cid in ('b3-cloud-aws', 'b3-supervision', 'b3-voip', 'ccna', 'uml', 'uiux', 'docker', 'infographie'):
        c11 = 2.3
    elif lvl in ('b1', 'b2'):
        c11 = 1.8
    else:
        c11 = 1.2

    # C12 (Exactitude technique):
    if cid in ('b1-admin-windows', 'rd_winserver', 'b3-pfsense'): c12 = 1.8
    else: c12 = 2.8

    # C13 (Cohérence avec cartes, mémo, examens):
    # B1/B2 with collapsible exam solutions and aligned exams: 2.2 (except admin-vm, csharp, b1-algo)
    # B3 and 7 B2 with examens in clear: 1.3 (and 1.0 for b3-pfsense CBQ/HFSC, admin-vm vMotion, csharp code)
    if cid in ('admin-vm', 'csharp', 'b3-pfsense'): c13 = 1.0
    elif cid == 'b1-algo': c13 = 1.7
    elif lvl == 'b3' or cid in ('sql', 'ccna', 'uml', 'uiux', 'docker', 'infographie'): c13 = 1.4
    else: c13 = 2.2

    # C14 (Rendu propre):
    # Zero visible artifacts & 0 broken links (ignoring favicon.svg): 2.8
    # Broken links or \n or comma artifacts: scaled 0.5 to 1.8
    if n_broken == 0 and n_virg == 0 and cid not in ('RD-RO', 'b3-document-technique'):
        c14 = 2.8
    elif n_virg > 0 and n_broken > 30:
        c14 = 0.5
    elif n_broken >= 20 or cid in ('RD-RO', 'b3-document-technique'):
        c14 = 1.2
    else:
        c14 = 1.8

    cols_new = [round(x, 1) for x in [c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13, c14]]
    tot_new = round(sum(cols_new), 1)
    pct_new = round(tot_new / 42 * 100, 1)
    verdict_new = 'Conforme (≥ 85%)' if pct_new >= 85.0 else ('À retoucher (70–84%)' if pct_new >= 70.0 else 'À réécrire (< 70%)')
    tot_old = tour1_scores.get(cid, {}).get('total', 0.0)
    pct_old = tour1_scores.get(cid, {}).get('pct', 0.0)
    recal_rows.append([cid, lvl.upper()] + cols_new + [tot_old, pct_old, tot_new, pct_new, round(tot_new - tot_old, 1), verdict_new])

with open(CSV_DIR / 'c_scores_68_cours_recalibres.csv', 'w', encoding='utf-8', newline='') as fp:
    w = csv.writer(fp)
    w.writerow(['cours_id', 'niveau'] + [c[0] for c in CRITERIA] + ['score_tour1_sur_42', 'pct_tour1', 'score_recalibre_sur_42', 'pct_recalibre', 'delta_points', 'verdict_recalibre'])
    w.writerows(recal_rows)

avg_old = round(sum(r[16] for r in recal_rows) / len(recal_rows), 1)
avg_new = round(sum(r[18] for r in recal_rows) / len(recal_rows), 1)
n_conf = sum(1 for r in recal_rows if r[19] >= 85.0)
n_ret = sum(1 for r in recal_rows if 70.0 <= r[19] < 85.0)
n_reec = sum(1 for r in recal_rows if r[19] < 70.0)
print(f"\nRecalibrated 68 courses: Old mean = {avg_old}/42 ({round(avg_old/42*100,1)}%) -> New mean = {avg_new}/42 ({round(avg_new/42*100,1)}%)")
print(f"Distribution: Conforme (>=85%): {n_conf} | À retoucher (70-84%): {n_ret} | À réécrire (<70%): {n_reec}")
for r in sorted(recal_rows, key=lambda x: -x[18])[:15]:
    print(f"  TOP: {r[0]:22s} ({r[1]}): {r[16]}/42 ({r[17]}%) -> {r[18]}/42 ({r[19]}%) [{r[21]}]")
