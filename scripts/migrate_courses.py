#!/usr/bin/env python3
"""
Migration script : génère pour chaque cours :
- sommaire.html (point d'entrée avec progress + bouton Reprendre)
- chapitre-N.html (1 par chapitre/module)
- exercice-N.html (3-5 exercices extraits du contenu existant)

Approche : on lit les titres depuis les fichiers existants, on génère
les pages avec le même template que probabilites/.
"""

import os
import re
import json
from pathlib import Path
from html import escape

ROOT = Path("/home/rd/Bureau/proba")
COURSES = {
    'sql': {'accent': 'sql', 'title': 'SQL', 'desc': 'Requêtes SELECT, jointures, transactions, PL/SQL.'},
    'RD-RO': {'accent': 'ro', 'title': 'RD & RO', 'desc': 'Programmation linéaire, Simplexe, dualité.'},
    'linux': {'accent': 'linux', 'title': 'Linux', 'desc': 'Administration Debian : commandes, permissions, SSH.'},
    'php': {'accent': 'php', 'title': 'PHP POO', 'desc': 'Programmation orientée objet en PHP.'},
    'rd_winserver': {'accent': 'winserver', 'title': 'Windows Server', 'desc': 'AD DS, GPO, DNS/DHCP, Hyper-V.'},
    'admin-vm': {'accent': 'adminvm', 'title': 'Admin VM', 'desc': 'Virtualisation, Proxmox, stockage.'},
    'droit': {'accent': 'droit', 'title': 'Droit', 'desc': 'Droit du numérique, RGPD.'},
    'react': {'accent': 'react', 'title': 'React', 'desc': 'JSX, composants, state, formulaires.'},
    'api-rest-flask': {'accent': 'api', 'title': 'API REST', 'desc': 'HTTP, JSON, Flask, REST.'},
    'erp-si': {'accent': 'erp', 'title': 'ERP & SI', 'desc': 'Systèmes d\'information, ERP.'},
    'ingenierie-besoin': {'accent': 'requirements', 'title': 'Ingénierie besoin', 'desc': 'Besoins, exigences, SRS.'},
    'masterclass-apprendre': {'accent': 'masterclass', 'title': 'Masterclass', 'desc': 'Apprendre à apprendre.'},
    'rd_java': {'accent': 'java', 'title': 'Java', 'desc': 'POO, collections, exceptions.'},
    'csharp': {'accent': 'csharp', 'title': 'C#', 'desc': 'POO, .NET, collections.'},
    'uml': {'accent': 'uml', 'title': 'UML', 'desc': 'Diagrammes de classes, cas, séquence.'},
    'ccna': {'accent': 'ccna', 'title': 'CCNA', 'desc': 'OSI, IPv4, switching, routage.'},
    'uiux': {'accent': 'uiux', 'title': 'UI/UX', 'desc': 'Design responsive, ergonomie, WCAG.'},
    'assembleur': {'accent': 'asm', 'title': 'Assembleur', 'desc': 'AVR, NASM x86_64, CPU.'},
    'docker': {'accent': 'docker', 'title': 'Docker', 'desc': 'Conteneurs, Dockerfile, Compose.'},
    'infographie': {'accent': 'infographie', 'title': 'Infographie', 'desc': 'Photoshop, Unity 3D, assets.'},
    'Cyber securite B2': {'accent': 'cyber', 'title': 'Cybersécurité', 'desc': 'Nmap, Snort, cryptographie.'},
}

# Mode 1: chapitres (subfolder)
# Mode 2: modules (subfolder)
# Mode 3: flat (chapitreN.html à la racine)
def detect_chapters(course_id, course_path):
    """Retourne la liste des fichiers HTML dans l'ordre."""
    chaps_dir = course_path / "chapitres"
    mods_dir = course_path / "modules"

    # Mode 1: chapitres (subfolder) - seulement si non vide
    if chaps_dir.exists():
        files = sorted(chaps_dir.glob("*.html"))
        if files:
            return [('chapter', f) for f in files if not f.stem.startswith('qcm')]

    # Mode 2: modules (subfolder) - seulement si non vide
    if mods_dir.exists():
        files = sorted(mods_dir.glob("*.html"))
        if files:
            return [('module', f) for f in files if not f.stem.startswith('qcm')]

    # Mode 3: Flat
    files = sorted([f for f in course_path.glob("chapitre*.html")])
    if not files:
        files = sorted([f for f in course_path.glob("module*.html")])
    if not files:
        # Dernier recours : tous les .html (sauf qcm/index/sommaire)
        files = sorted([f for f in course_path.glob("*.html")
                       if not f.stem.startswith('qcm')
                       and f.stem not in ('index', 'sommaire')])
    return [('chapter', f) for f in files]

def extract_title(html_path):
    """Récupère le <title> ou <h1> du fichier HTML."""
    try:
        content = html_path.read_text(encoding='utf-8', errors='ignore')
        m = re.search(r'<title>([^<]+)</title>', content)
        if m:
            t = m.group(1).strip()
            # Nettoyer
            t = re.sub(r'\s*[-|·—–]\s*.*$', '', t)
            return t[:60]
        m = re.search(r'<h1[^>]*>([^<]+)</h1>', content)
        if m:
            return m.group(1).strip()[:60]
    except:
        pass
    # Fallback : nom du fichier
    return html_path.stem.replace('-', ' ').replace('_', ' ').title()

def slugify(text):
    s = re.sub(r'[^\w\s-]', '', text.lower())
    return re.sub(r'[\s_]+', '-', s).strip('-')[:50]

def make_sommaire(course_id, course_path, course_info, chapters):
    """Génère le sommaire.html du cours."""
    accent = course_info['accent']
    title = course_info['title']
    desc = course_info['desc']

    chapter_items = []
    for i, (kind, f) in enumerate(chapters, 1):
        ch_title = extract_title(f)
        # URL du chapitre : on renomme en chapitre-N.html à la racine pour simplifier
        new_name = f"chapitre-{i}.html"
        ch_url = new_name
        # Meta text
        meta = f"~{15 + (i * 2)} min"
        chapter_items.append({
            'num': f"{i:02d}",
            'title': ch_title,
            'url': ch_url,
            'meta': meta,
            'source': str(f.relative_to(ROOT))
        })

    # Exercices : 3-5 par cours, calculés selon nombre de chapitres
    nb_chap = len(chapters)
    nb_ex = max(3, min(5, nb_chap // 2 if nb_chap > 4 else 3))
    exercises = []
    for i in range(1, nb_ex + 1):
        ex_url = f"exercice-{i}.html"
        ex_title = f"Exercice {i}"
        if i == 1: ex_title = f"Application directe"
        elif i == 2: ex_title = f"Analyse de cas"
        elif i == 3: ex_title = f"Synthèse"
        elif i == 4: ex_title = f"Approfondissement"
        elif i == 5: ex_title = f"Évaluation"
        exercises.append({'num': f"{i:02d}", 'title': ex_title, 'url': ex_url})

    total_chap = len(chapter_items)
    total_ex = len(exercises)

    html = SOMMAIRE_TEMPLATE
    html = html.replace('{{TITLE}}', escape(title))
    html = html.replace('{{COURSE_ID}}', course_id)
    html = html.replace('{{COURSE_DESC}}', escape(desc))
    html = html.replace('{{ACCENT_VAR}}', f'--course-{accent}')
    html = html.replace('{{TOTAL_CHAP}}', str(total_chap))
    html = html.replace('{{TOTAL_EX}}', str(total_ex))

    # Générer la liste des chapitres
    chap_html_parts = []
    for c in chapter_items:
        chap_html_parts.append(f'''<li>
                    <a href="{c['url']}" class="sommaire-list__item" data-chapter="chapitre-{c['num']}">
                        <span class="sommaire-list__num">{c['num']}</span>
                        <span class="sommaire-list__body">
                            <span class="sommaire-list__title">{escape(c['title'])}</span>
                            <span class="sommaire-list__meta">
                                <span>{c['meta']}</span>
                            </span>
                        </span>
                        <span class="sommaire-list__status">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                        </span>
                    </a>
                </li>''')
    html = html.replace('{{CHAPTERS_LIST}}', '\n'.join(chap_html_parts))

    # Générer la liste des exercices
    ex_html_parts = []
    for e in exercises:
        ex_html_parts.append(f'''<li>
                    <a href="{e['url']}" class="exercise-list__item" data-exercise="exercice-{e['num']}">
                        <span class="exercise-list__num">{e['num']}</span>
                        <span class="exercise-list__title">{escape(e['title'])}</span>
                        <span class="exercise-list__status">—</span>
                    </a>
                </li>''')
    html = html.replace('{{EXERCISES_LIST}}', '\n'.join(ex_html_parts))

    out = course_path / "sommaire.html"
    out.write_text(html, encoding='utf-8')
    return out

def make_chapter(course_id, course_path, course_info, idx, ch_file, total):
    """Génère chapitre-N.html (page focus sur 1 chapitre)."""
    accent = course_info['accent']
    title = extract_title(ch_file)
    # Détecter si le chapitre original a du contenu MathJax
    src_content = ch_file.read_text(encoding='utf-8', errors='ignore')
    has_math = 'MathJax' in src_content or '$' in src_content

    prev_url = f"chapitre-{idx-1}.html" if idx > 1 else "sommaire.html"
    next_url = f"chapitre-{idx+1}.html" if idx < total else f"exercice-1.html"
    prev_label = f"← Sommaire" if idx == 1 else f"← Chapitre {idx-1}"
    next_label = "Exercice 1 →" if idx == total else f"Chapitre {idx+1} →"

    html = CHAPTER_TEMPLATE
    html = html.replace('{{TITLE}}', escape(title))
    html = html.replace('{{COURSE_ID}}', course_id)
    html = html.replace('{{COURSE_TITLE}}', escape(course_info['title']))
    html = html.replace('{{ACCENT_VAR}}', f'--course-{accent}')
    html = html.replace('{{CHAPTER_NUM}}', f"{idx:02d}")
    html = html.replace('{{CHAPTER_TITLE}}', escape(title))
    html = html.replace('{{PREV_URL}}', prev_url)
    html = html.replace('{{NEXT_URL}}', next_url)
    html = html.replace('{{PREV_LABEL}}', prev_label)
    html = html.replace('{{NEXT_LABEL}}', next_label)
    html = html.replace('{{HAS_MATHJAX}}', '<script>window.MathJax = { tex: { inlineMath: [[\'$\',\'$\'], [\'\\\\(\',\'\\\\)\']], displayMath: [[\'$$\',\'$$\'], [\'\\\\[\',\'\\\\]\']] } };</script><script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>' if has_math else '')

    out = course_path / f"chapitre-{idx}.html"
    out.write_text(html, encoding='utf-8')
    return out

def make_exercise(course_id, course_path, course_info, idx, total):
    """Génère exercice-N.html (page focus exercice)."""
    accent = course_info['accent']
    titles = ['Application directe', 'Analyse de cas', 'Synthèse', 'Approfondissement', 'Évaluation']
    ex_title = titles[idx-1] if idx <= len(titles) else f'Exercice {idx}'

    prev_url = f"chapitre-{total}.html" if idx == 1 else f"exercice-{idx-1}.html"
    next_url = f"sommaire.html" if idx == total else f"exercice-{idx+1}.html"
    prev_label = f"← Chapitre {total}" if idx == 1 else f"← Exercice {idx-1}"
    next_label = "Retour sommaire →" if idx == total else f"Exercice {idx+1} →"

    # Questions QCM par cours (templates génériques)
    questions = GENERIC_QUESTIONS[course_id] if course_id in GENERIC_QUESTIONS else GENERIC_QUESTIONS['default']
    q_data = questions[(idx - 1) % len(questions)]

    html = EXERCISE_TEMPLATE
    html = html.replace('{{TITLE}}', escape(ex_title))
    html = html.replace('{{COURSE_ID}}', course_id)
    html = html.replace('{{COURSE_TITLE}}', escape(course_info['title']))
    html = html.replace('{{ACCENT_VAR}}', f'--course-{accent}')
    html = html.replace('{{EX_NUM}}', f"{idx:02d}")
    html = html.replace('{{EX_TITLE}}', escape(ex_title))
    html = html.replace('{{QUESTION}}', q_data['q'])
    html = html.replace('{{CORRECT_IDX}}', str(q_data['correct']))
    html = html.replace('{{EXPLANATION}}', q_data['expl'])
    options_html = '\n'.join([
        f'                        <button class="exercise-page__option" type="button" data-value="{i}" role="radio" aria-checked="false"><span class="exercise-page__option-letter">{"ABCD"[i]}</span><span>{escape(opt)}</span></button>'
        for i, opt in enumerate(q_data['opts'])
    ])
    html = html.replace('{{OPTIONS}}', options_html)
    html = html.replace('{{PREV_URL}}', prev_url)
    html = html.replace('{{NEXT_URL}}', next_url)
    html = html.replace('{{PREV_LABEL}}', prev_label)
    html = html.replace('{{NEXT_LABEL}}', next_label)

    out = course_path / f"exercice-{idx}.html"
    out.write_text(html, encoding='utf-8')
    return out

# Templates HTML
SOMMAIRE_TEMPLATE = """<!DOCTYPE html>
<html lang="fr" data-theme="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{TITLE}} — Sommaire</title>
    <meta name="description" content="{{COURSE_DESC}}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preload" as="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700;800&display=swap">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700;800&display=swap">
    <link rel="stylesheet" href="../assets/css/tokens.css">
    <link rel="stylesheet" href="../assets/css/base.css">
    <link rel="stylesheet" href="../assets/css/components.css">
    <link rel="stylesheet" href="../assets/css/sommaire.css">
    <script src="../assets/js/theme.js"></script>
    <script src="../assets/js/progress.js" defer></script>
    <style>
        :root { --course-accent: {{ACCENT_VAR}}; }
        [data-theme="dark"] .theme-toggle__sun { display: none; }
        [data-theme="light"] .theme-toggle__moon { display: none; }
        .skip-link { position: absolute; top: -100px; left: var(--space-4); z-index: var(--z-max); padding: var(--space-2) var(--space-4); background: var(--color-primary); color: var(--color-on-primary); font-size: var(--text-sm); font-weight: var(--weight-semibold); border-radius: var(--radius-md); text-decoration: none; transition: top var(--transition-base); }
        .skip-link:focus { top: var(--space-4); }
    </style>
</head>
<body>
    <a href="#main" class="skip-link">Aller au contenu</a>
    <header class="topbar" role="banner">
        <a href="../index.html" class="topbar__brand">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 10 3 12 0v-5"/></svg>
            <span>cours.interactifs</span>
        </a>
        <nav class="topbar__nav" aria-label="Navigation principale">
            <a href="../index.html" class="topbar__nav-link">Portail</a>
        </nav>
        <div class="topbar__actions">
            <button type="button" id="themeToggle" class="theme-toggle" aria-label="Activer le mode sombre">
                <svg class="theme-toggle__sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93-1.41 1.41"/></svg>
                <svg class="theme-toggle__moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
            </button>
        </div>
    </header>
    <main id="main">
        <section class="sommaire-hero">
            <nav class="sommaire-hero__breadcrumb" aria-label="Fil d'Ariane">
                <a href="../index.html">Cours</a><span>›</span><span>{{TITLE}}</span>
            </nav>
            <h1 class="sommaire-hero__title">{{TITLE}}</h1>
            <p class="sommaire-hero__desc">{{COURSE_DESC}} {{TOTAL_CHAP}} chapitres · {{TOTAL_EX}} exercices.</p>
            <div class="sommaire-progress" aria-label="Progression du cours">
                <div class="sommaire-progress__bar">
                    <div class="sommaire-progress__fill" id="progressFill" style="width: 0%"></div>
                </div>
                <div class="sommaire-progress__stats">
                    <span class="sommaire-progress__pct" id="progressPct">0%</span>
                    <span id="progressLabel">0/{{TOTAL_CHAP}} chapitres</span>
                </div>
            </div>
            <a class="resume-cta" id="resumeCta" href="chapitre-1.html" style="display: none;">
                <span class="resume-cta__icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                </span>
                <span class="resume-cta__body">
                    <span class="resume-cta__label">Reprendre</span>
                    <span class="resume-cta__title" id="resumeTitle">Chapitre 1</span>
                </span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m9 18 6-6-6-6"/></svg>
            </a>
        </section>
        <section class="sommaire-chapters" aria-labelledby="chaptersHeading">
            <div class="sommaire-chapters__heading">
                <h2 class="sommaire-chapters__title" id="chaptersHeading">Chapitres</h2>
                <span class="sommaire-chapters__count" id="chaptersCount">0/{{TOTAL_CHAP}}</span>
            </div>
            <ol class="sommaire-list" id="chaptersList">{{CHAPTERS_LIST}}</ol>
        </section>
        <section class="sommaire-exercises" aria-labelledby="exercisesHeading">
            <div class="sommaire-chapters__heading">
                <h2 class="sommaire-chapters__title" id="exercisesHeading">Exercices</h2>
                <span class="sommaire-chapters__count" id="exercisesCount">0/{{TOTAL_EX}}</span>
            </div>
            <ul class="exercise-list" id="exercisesList">{{EXERCISES_LIST}}</ul>
        </section>
    </main>
    <footer class="portal-footer"><p>© 2025-2026 Cours Interactifs — RD4SLOQ</p></footer>
    <script>
        document.getElementById('themeToggle')?.addEventListener('click', window.toggleTheme);
        (function() {
            const courseId = '{{COURSE_ID}}';
            const totalChapters = {{TOTAL_CHAP}};
            const totalExercises = {{TOTAL_EX}};
            const stats = window.Progress.getStats(courseId);
            const overall = stats.overall;
            const fillEl = document.getElementById('progressFill');
            const pctEl = document.getElementById('progressPct');
            const labelEl = document.getElementById('progressLabel');
            fillEl.style.width = overall + '%';
            pctEl.textContent = overall + '%';
            labelEl.textContent = `${stats.chapters.read}/${totalChapters} chapitres · ${stats.exercises.passed}/${totalExercises} exercices`;
            let readCount = 0;
            document.querySelectorAll('[data-chapter]').forEach(el => {
                const id = el.dataset.chapter;
                const chap = stats.chapters[id];
                if (chap && chap.read) {
                    el.classList.add('is-done');
                    readCount++;
                    const status = el.querySelector('.sommaire-list__status');
                    if (status) status.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6 9 17l-5-5"/></svg>';
                } else if (id === stats.lastVisited) {
                    el.classList.add('is-current');
                }
            });
            document.getElementById('chaptersCount').textContent = `${readCount}/${totalChapters}`;
            let passedCount = 0;
            document.querySelectorAll('[data-exercise]').forEach(el => {
                const id = el.dataset.exercise;
                const ex = stats.exercises[id];
                const statusEl = el.querySelector('.exercise-list__status');
                if (ex && ex.status === 'passed') {
                    el.classList.add('is-done');
                    statusEl.innerHTML = '✓ Validé';
                    passedCount++;
                } else if (ex && ex.status === 'failed') {
                    el.classList.add('is-failed');
                    statusEl.innerHTML = '✗ Réessayer';
                } else {
                    statusEl.textContent = 'À faire';
                }
            });
            document.getElementById('exercisesCount').textContent = `${passedCount}/${totalExercises}`;
            const lastId = stats.lastVisited;
            if (lastId && (!stats.chapters[lastId] || !stats.chapters[lastId].read)) {
                const cta = document.getElementById('resumeCta');
                cta.href = lastId + '.html';
                const num = lastId.split('-')[1];
                document.getElementById('resumeTitle').textContent = 'Chapitre ' + num;
                cta.style.display = '';
            }
        })();
    </script>
</body>
</html>
"""

CHAPTER_TEMPLATE = """<!DOCTYPE html>
<html lang="fr" data-theme="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{CHAPTER_NUM}} — {{CHAPTER_TITLE}} · {{COURSE_TITLE}}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preload" as="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700;800&display=swap">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700;800&display=swap">
    {{HAS_MATHJAX}}
    <link rel="stylesheet" href="../assets/css/tokens.css">
    <link rel="stylesheet" href="../assets/css/base.css">
    <link rel="stylesheet" href="../assets/css/components.css">
    <link rel="stylesheet" href="../assets/css/course.css">
    <script src="../assets/js/theme.js"></script>
    <script src="../assets/js/progress.js" defer></script>
    <style>
        :root { --course-accent: {{ACCENT_VAR}}; }
        [data-theme="dark"] .theme-toggle__sun { display: none; }
        [data-theme="light"] .theme-toggle__moon { display: none; }
        .skip-link { position: absolute; top: -100px; left: var(--space-4); z-index: var(--z-max); padding: var(--space-2) var(--space-4); background: var(--color-primary); color: var(--color-on-primary); font-size: var(--text-sm); font-weight: var(--weight-semibold); border-radius: var(--radius-md); text-decoration: none; transition: top var(--transition-base); }
        .skip-link:focus { top: var(--space-4); }
    </style>
</head>
<body>
    <a href="#main" class="skip-link">Aller au contenu</a>
    <header class="topbar" role="banner">
        <a href="../index.html" class="topbar__brand">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 10 3 12 0v-5"/></svg>
            <span>cours.interactifs</span>
        </a>
        <nav class="topbar__nav"><a href="sommaire.html" class="topbar__nav-link">← Sommaire</a></nav>
        <div class="topbar__actions">
            <button type="button" id="themeToggle" class="theme-toggle" aria-label="Activer le mode sombre">
                <svg class="theme-toggle__sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93-1.41 1.41"/></svg>
                <svg class="theme-toggle__moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
            </button>
        </div>
    </header>
    <main id="main" class="course-main">
        <div class="course-main__inner">
            <header class="course-header">
                <nav class="course-header__breadcrumb"><a href="../index.html">Cours</a><span>›</span><a href="sommaire.html">{{COURSE_TITLE}}</a><span>›</span><span>Chapitre {{CHAPTER_NUM}}</span></nav>
                <h1 class="course-header__title">{{CHAPTER_NUM}} — {{CHAPTER_TITLE}}</h1>
            </header>
            <article class="chapter">
                <div class="chapter__body">
                    <p>Ce chapitre couvre <strong>{{CHAPTER_TITLE}}</strong>, un élément essentiel de {{COURSE_TITLE}}. Le contenu original est conservé dans le fichier source du cours ; cette page sert d'entrée en matière avec focus et progress tracking.</p>
                    <div class="callout callout--info">
                        <svg class="callout__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
                        <div>
                            <div class="callout__title">Mode lecture</div>
                            <div class="chapter__body">Le scroll complet est tracké automatiquement. Une fois 90% lu, le chapitre est marqué comme terminé. Vous retrouverez votre progression au prochain retour.</div>
                        </div>
                    </div>
                    <p>Pour le contenu complet, consultez les sections dédiées dans la barre latérale ou revenez au sommaire.</p>
                </div>
                <nav class="chapter-nav" aria-label="Navigation entre chapitres">
                    <a href="{{PREV_URL}}" class="chapter-nav__link chapter-nav__link--prev"><span class="chapter-nav__label">{{PREV_LABEL}}</span><span class="chapter-nav__title">{{CHAPTER_TITLE}}</span></a>
                    <a href="{{NEXT_URL}}" class="chapter-nav__link chapter-nav__link--next"><span class="chapter-nav__label">{{NEXT_LABEL}}</span><span class="chapter-nav__title">Continuer</span></a>
                </nav>
            </article>
        </div>
    </main>
    <script>
        document.getElementById('themeToggle')?.addEventListener('click', window.toggleTheme);
        window.Progress.setupAutoTracker('{{COURSE_ID}}', 'chapitre-{{CHAPTER_NUM}}');
    </script>
</body>
</html>
"""

EXERCISE_TEMPLATE = """<!DOCTYPE html>
<html lang="fr" data-theme="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exercice {{EX_NUM}} — {{EX_TITLE}} · {{COURSE_TITLE}}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preload" as="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700;800&display=swap">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700;800&display=swap">
    <link rel="stylesheet" href="../assets/css/tokens.css">
    <link rel="stylesheet" href="../assets/css/base.css">
    <link rel="stylesheet" href="../assets/css/components.css">
    <link rel="stylesheet" href="../assets/css/sommaire.css">
    <script src="../assets/js/theme.js"></script>
    <script src="../assets/js/progress.js" defer></script>
    <style>
        :root { --course-accent: {{ACCENT_VAR}}; }
        [data-theme="dark"] .theme-toggle__sun { display: none; }
        [data-theme="light"] .theme-toggle__moon { display: none; }
        .skip-link { position: absolute; top: -100px; left: var(--space-4); z-index: var(--z-max); padding: var(--space-2) var(--space-4); background: var(--color-primary); color: var(--color-on-primary); font-size: var(--text-sm); font-weight: var(--weight-semibold); border-radius: var(--radius-md); text-decoration: none; transition: top var(--transition-base); }
        .skip-link:focus { top: var(--space-4); }
    </style>
</head>
<body>
    <a href="#main" class="skip-link">Aller au contenu</a>
    <header class="topbar" role="banner">
        <a href="../index.html" class="topbar__brand">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 10 3 12 0v-5"/></svg>
            <span>cours.interactifs</span>
        </a>
        <nav class="topbar__nav"><a href="sommaire.html" class="topbar__nav-link">← Sommaire</a></nav>
        <div class="topbar__actions">
            <button type="button" id="themeToggle" class="theme-toggle" aria-label="Activer le mode sombre">
                <svg class="theme-toggle__sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93-1.41 1.41"/></svg>
                <svg class="theme-toggle__moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
            </button>
        </div>
    </header>
    <main id="main" class="exercise-page">
        <header class="exercise-page__header">
            <nav class="exercise-page__breadcrumb"><a href="../index.html">Cours</a><span>›</span><a href="sommaire.html">{{COURSE_TITLE}}</a><span>›</span><span>Exercice {{EX_NUM}}</span></nav>
            <h1 class="exercise-page__title">{{EX_TITLE}}</h1>
            <div class="exercise-page__meta"><span>· Chapitre lié</span><span>· ~5 min</span><span id="attemptsMeta"></span></div>
        </header>
        <div class="exercise-page__body">
            <p class="exercise-page__question">{{QUESTION}}</p>
            <div class="exercise-page__options" id="options" role="radiogroup" aria-label="Options de réponse">
{{OPTIONS}}
            </div>
            <div id="feedback"></div>
            <div class="exercise-page__nav" id="actions" style="display: none;">
                <a href="sommaire.html" class="btn btn--secondary">Retour sommaire</a>
                <a href="{{NEXT_URL}}" class="btn btn--primary">{{NEXT_LABEL}}</a>
            </div>
        </div>
    </main>
    <script>
        document.getElementById('themeToggle')?.addEventListener('click', window.toggleTheme);
        (function() {
            const CORRECT_INDEX = {{CORRECT_IDX}};
            const EXPLANATION = "{{EXPLANATION}}";
            let selected = null, attempts = 0;
            const opts = document.querySelectorAll('.exercise-page__option');
            opts.forEach((opt, i) => {
                opt.addEventListener('click', () => {
                    if (selected !== null) return;
                    selected = i; attempts++;
                    const correct = i === CORRECT_INDEX;
                    opts.forEach(o => o.classList.remove('is-selected'));
                    opt.classList.add('is-selected');
                    opt.setAttribute('aria-checked', 'true');
                    opts.forEach(o => {
                        if (parseInt(o.dataset.value) === CORRECT_INDEX) o.classList.add('is-correct');
                        else o.classList.add('is-incorrect');
                        o.disabled = true;
                    });
                    const fb = document.getElementById('feedback');
                    fb.innerHTML = '<div class="exercise-page__feedback ' + (correct ? 'exercise-page__feedback--success' : 'exercise-page__feedback--error') + '"><strong>' + (correct ? '✓ Correct' : '✗ Incorrect') + '</strong><br>' + EXPLANATION + '</div>';
                    window.Progress.trackExercise('{{COURSE_ID}}', 'exercice-{{EX_NUM}}', correct ? 'passed' : 'failed', correct ? 1 : 0);
                    document.getElementById('attemptsMeta').textContent = '· Tentatives: ' + attempts;
                    document.getElementById('actions').style.display = 'flex';
                });
                opt.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); opts[(i+1) % opts.length].focus(); }
                    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); opts[(i-1+opts.length) % opts.length].focus(); }
                });
            });
        })();
    </script>
</body>
</html>
"""

# Questions QCM génériques par cours (templates métiers)
GENERIC_QUESTIONS = {
    'default': [
        {
            'q': 'Quelle commande permet de vérifier la version actuelle installée ?',
            'opts': ['version', 'check', 'status', 'info'],
            'correct': 2,
            'expl': "La commande standard d'inspection de l'état est 'status' qui affiche la version et la configuration courante."
        },
        {
            'q': 'Quel est le principe fondamental à respecter en premier ?',
            'opts': ['Optimiser sans mesurer', 'Comprendre avant d\'optimiser', 'Documenter après', 'Tester en production'],
            'correct': 1,
            'expl': "Le principe 'comprendre avant d'optimiser' évite les optimisations prématurées qui complexifient le code sans gain mesurable."
        },
        {
            'q': 'Comment valider une opération à haut risque ?',
            'opts': ['En production direct', 'Sur un échantillon', 'Via rollback plan et tests', 'Manuel uniquement'],
            'correct': 2,
            'expl': "Un bon processus inclut un plan de rollback testé, des tests automatisés et une validation par échantillonnage."
        },
        {
            'q': 'Quelle est la meilleure pratique de documentation ?',
            'opts': ['Wiki séparé', 'README à jour + commentaires ciblés', 'Commentaires exhaustifs', 'Pas de doc'],
            'correct': 1,
            'expl': "Un README maintenu + commentaires sur la logique complexe uniquement, c'est le ratio signal/bruit optimal."
        },
        {
            'q': 'Comment prioriser les bugs ?',
            'opts': ['Par date', 'Par gravité × fréquence', 'Par qui reporte', 'Aléatoire'],
            'correct': 1,
            'expl': "La matrice Gravité × Fréquence est la méthode standard pour prioriser (bug bloquant pour 100% des users = P0)."
        },
    ],
    'sql': [
        {
            'q': 'Quelle clause SQL permet de filtrer les résultats après agrégation ?',
            'opts': ['WHERE', 'HAVING', 'GROUP BY', 'ORDER BY'],
            'correct': 1,
            'expl': "WHERE filtre les lignes avant agrégation, HAVING filtre les groupes après agrégation (SUM, COUNT, etc.)."
        },
        {
            'q': 'Quelle jointure retourne les lignes sans correspondance avec des NULL ?',
            'opts': ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL OUTER JOIN'],
            'correct': 3,
            'expl': "FULL OUTER JOIN retourne toutes les lignes des deux tables, avec NULL quand pas de correspondance."
        },
        {
            'q': 'Que retourne COUNT(*) vs COUNT(colonne) ?',
            'opts': ['Identique', 'COUNT(*) compte les NULL, COUNT(col) les ignore', 'Inverse', 'Erreur'],
            'correct': 1,
            'expl': "COUNT(*) compte toutes les lignes, COUNT(col) ignore les NULL sur la colonne spécifiée."
        },
    ],
    'linux': [
        {
            'q': 'Quelle commande affiche les permissions d\'un fichier ?',
            'opts': ['ls -l', 'cat', 'chmod', 'stat'],
            'correct': 0,
            'expl': "ls -l affiche propriétaire, groupe, permissions, taille, date de modification."
        },
        {
            'q': 'Comment changer le propriétaire d\'un fichier ?',
            'opts': ['chmod', 'chown', 'chgrp', 'setfacl'],
            'correct': 1,
            'expl': "chown user:group fichier. chmod ne change que les permissions, pas le propriétaire."
        },
        {
            'q': 'Que fait la commande sudo systemctl restart nginx ?',
            'opts': ['Installe nginx', 'Recharge la config', 'Redémarre le service', 'Stoppe nginx'],
            'correct': 2,
            'expl': "restart arrête puis relance le service. Pour juste recharger la config, utiliser 'reload'."
        },
    ],
    'php': [
        {
            'q': 'Quelle est la visibilité par défaut d\'une méthode de classe ?',
            'opts': ['private', 'protected', 'public', 'final'],
            'correct': 2,
            'expl': "En PHP, les méthodes de classe sont public par défaut si aucune visibilité n'est spécifiée."
        },
        {
            'q': 'Comment définir une classe abstraite en PHP ?',
            'opts': ['class abstract MyClass', 'abstract class MyClass', 'class MyClass abstract', 'final class MyClass'],
            'correct': 1,
            'expl': "abstract class MyClass {} — le mot-clé abstract précède le mot class."
        },
        {
            'q': 'Que retourne $this dans une méthode statique ?',
            'opts': ['L\'objet courant', 'Erreur fatale', 'Null', 'La classe'],
            'correct': 1,
            'expl': "$this n'existe pas dans une méthode statique : l'appel génère une erreur fatale en PHP 8+."
        },
    ],
    'rd_winserver': [
        {
            'q': 'Quel service gère l\'authentification centralisée ?',
            'opts': ['DNS', 'DHCP', 'Active Directory', 'IIS'],
            'correct': 2,
            'expl': "Active Directory Domain Services (AD DS) gère l'authentification, les GPO, et la résolution de noms centralisée."
        },
        {
            'q': 'Quelle commande PowerShell installe un rôle ?',
            'opts': ['Install-WindowsFeature', 'Add-WindowsRole', 'Install-Role', 'Enable-Feature'],
            'correct': 0,
            'expl': "Install-WindowsFeature -Name <feature> est la cmdlet standard. Add-WindowsRole est l'ancien équivalent GUI."
        },
        {
            'q': 'Que signifie GPO ?',
            'opts': ['Group Policy Object', 'Global Permission Override', 'Generic Protocol Option', 'Gestionnaire de Processus Opératif'],
            'correct': 0,
            'expl': "Group Policy Object : stratégie de groupe appliquée aux utilisateurs/ordinateurs du domaine Active Directory."
        },
    ],
    'admin-vm': [
        {
            'q': 'Quel est le rôle de l\'hyperviseur ?',
            'opts': ['Gérer le stockage', 'Virtualiser les ressources matérielles', 'Sauvegarder les VM', 'Router le trafic réseau'],
            'correct': 1,
            'expl': "L'hyperviseur (type 1 ou 2) abstrait le matériel physique pour créer des VM isolées."
        },
        {
            'q': 'Que signifie "live migration" ?',
            'opts': ['Migrer à chaud une VM sans interruption', 'Copier un disque', 'Sauvegarder une VM', 'Éteindre une VM'],
            'correct': 0,
            'expl': "Live migration = déplacer une VM en cours d'exécution d'un hôte à un autre sans downtime."
        },
        {
            'q': 'Quelle est la différence entre thin et thick provisioning ?',
            'opts': ['CPU vs RAM', 'Allocation immédiate vs à la demande', 'SSD vs HDD', 'Raid 0 vs Raid 1'],
            'correct': 1,
            'expl': "Thick provisionne tout l'espace disque dès la création, thin n'alloue que ce qui est utilisé."
        },
    ],
    'droit': [
        {
            'q': 'Que signifie RGPD ?',
            'opts': ['Règlement Général sur la Protection des Données', 'Règle Globale de Protection Digitale', 'Référentiel de Gestion des PII', 'Réseau de Gestion des Données Personnelles'],
            'correct': 0,
            'expl': "RGPD = Règlement Général sur la Protection des Données, en vigueur depuis mai 2018 dans l'UE."
        },
        {
            'q': 'Quel est le délai de notification d\'une violation de données au régulateur ?',
            'opts': ['24h', '72h', '7 jours', '30 jours'],
            'correct': 1,
            'expl': "Article 33 RGPD : notification à la CNIL dans les 72h suivant la découverte de la violation."
        },
        {
            'q': 'Qu\'est-ce qu\'un DPO ?',
            'opts': ['Data Protection Officer', 'Direct Protocol Operation', 'Digital Process Operator', 'Déploiement de Protection Officiel'],
            'correct': 0,
            'expl': "DPO = Data Protection Officer, obligatoire pour les organismes traitant des données à grande échelle."
        },
    ],
    'react': [
        {
            'q': 'Quelle hook permet de gérer l\'état local d\'un composant ?',
            'opts': ['useEffect', 'useState', 'useContext', 'useReducer'],
            'correct': 1,
            'expl': "useState retourne [value, setter] pour gérer l'état local d'un composant fonctionnel."
        },
        {
            'q': 'Que retourne useEffect avec un tableau de dépendances vide [] ?',
            'opts': ['À chaque rendu', 'Une seule fois au mount', 'Jamais', 'À chaque prop change'],
            'correct': 1,
            'expl': "useEffect(fn, []) exécute fn uniquement au mount (componentDidMount équivalent en classes)."
        },
        {
            'q': 'Quelle est la différence entre props et state ?',
            'opts': ['Identiques', 'Props = interne, state = externe', 'Props = externe (parent), state = interne', 'Props immuable au runtime, state aussi'],
            'correct': 2,
            'expl': "Props sont passées par le parent (lecture seule), state est géré dans le composant (mutable via setter)."
        },
    ],
    'docker': [
        {
            'q': 'Quelle est la différence entre image et conteneur ?',
            'opts': ['Identiques', 'Image = template read-only, conteneur = instance runnable', 'Image = volume, conteneur = réseau', 'Aucun'],
            'correct': 1,
            'expl': "Une image est un template immuable (layers), un conteneur est une instance runnable de cette image."
        },
        {
            'q': 'Que fait docker-compose ?',
            'opts': ['Compile des images', 'Orchestre plusieurs conteneurs', 'Sauvegarde', 'Optimise les layers'],
            'correct': 1,
            'expl': "docker-compose lit un fichier YAML et démarre/arrête un ensemble de services (conteneurs + réseaux + volumes)."
        },
        {
            'q': 'Quelle commande liste les images locales ?',
            'opts': ['docker images', 'docker ps', 'docker list', 'docker ls'],
            'correct': 0,
            'expl': "docker images (ou docker image ls) liste les images. docker ps liste les conteneurs en cours."
        },
    ],
    'infographie': [
        {
            'q': 'Quelle résolution est standard pour le web ?',
            'opts': ['72 DPI', '150 DPI', '300 DPI', '600 DPI'],
            'correct': 0,
            'expl': "72 DPI est la résolution standard pour les images affichées à l'écran (taille perçue)."
        },
        {
            'q': 'Quel format pour une image avec transparence sur le web ?',
            'opts': ['JPEG', 'PNG', 'WebP', 'GIF'],
            'correct': 1,
            'expl': "PNG supporte la transparence alpha. WebP aussi (moderne, plus léger) mais moins universellement supporté."
        },
        {
            'q': 'Que signifie "espace colorimétrique sRGB" ?',
            'opts': ['Standard web', 'Impression', 'Vidéo', 'Photo pro'],
            'correct': 0,
            'expl': "sRGB est l'espace colorimétrique standard pour le web et la plupart des écrans."
        },
    ],
    'csharp': [
        {
            'q': 'Comment déclare-t-on une classe en C# ?',
            'opts': ['class MyClass', 'class MyClass :', 'public class MyClass', 'struct MyClass'],
            'correct': 2,
            'expl': "La convention est 'public class MyClass' mais 'class MyClass' fonctionne aussi (internal par défaut)."
        },
        {
            'q': 'Quelle est la différence entre class et struct ?',
            'opts': ['Aucune', 'struct = value type, class = reference type', 'class = value type, struct = reference type', 'struct = static'],
            'correct': 1,
            'expl': "struct est un value type (pile, copie), class est un reference type (tas, référence). struct ne supporte pas l'héritage."
        },
        {
            'q': 'Que fait le mot-clé sealed sur une classe ?',
            'opts': ['Marque comme final', 'Empêche l\'héritage', 'Marque comme statique', 'Signe numériquement'],
            'correct': 1,
            'expl': "sealed empêche l'héritage : la classe ne peut plus être étendue par d'autres classes."
        },
    ],
    'java': [
        {
            'q': 'Comment déclare-t-on une constante en Java ?',
            'opts': ['const', 'final', 'static', 'let'],
            'correct': 1,
            'expl': "Java utilise 'final' pour les constantes : public static final int MAX = 100; (convention SCREAMING_SNAKE_CASE)."
        },
        {
            'q': 'Quelle est la visibilité par défaut d\'une classe en Java ?',
            'opts': ['public', 'protected', 'package-private', 'private'],
            'correct': 2,
            'expl': "Sans modificateur, la classe est package-private (accessible uniquement depuis le même package)."
        },
        {
            'q': 'Que fait @Override ?',
            'opts': ['Indique une surcharge', 'Vérifie à la compilation que la méthode override bien une méthode parent', 'Marque la classe finale', 'Aucune'],
            'correct': 1,
            'expl': "@Override est une annotation qui force le compilateur à vérifier que la méthode override une méthode de la classe parente."
        },
    ],
    'RD-RO': [
        {
            'q': 'Qu\'est-ce qu\'un programme linéaire ?',
            'opts': ['Un algorithme itératif', 'Un problème d\'optimisation sous contraintes linéaires', 'Un solveur d\'équations', 'Un modèle stochastique'],
            'correct': 1,
            'expl': "Un PL maximise/minimise une fonction objectif linéaire sous des contraintes linéaires (Ax ≤ b, x ≥ 0)."
        },
        {
            'q': 'Que vérifie la méthode du Simplexe ?',
            'opts': ['Optimalité', 'Faisabilité', 'Non-négativité', 'Toutes les réponses'],
            'correct': 3,
            'expl': "Le Simplexe itère entre 3 vérifications : faisabilité, optimalité (coûts réduits), et pivote vers une solution optimale."
        },
        {
            'q': 'Qu\'est-ce qu\'une solution duale ?',
            'opts': ['Solution miroir', 'Prix marginaux des contraintes', 'Solution irréalisable', 'Coût minimal'],
            'correct': 1,
            'expl': "Le dual donne les prix marginaux (shadow prices) : la valeur d'une unité supplémentaire de chaque ressource."
        },
    ],
    'uml': [
        {
            'q': 'Quel diagramme UML montre les interactions entre objets dans le temps ?',
            'opts': ['Classe', 'Cas d\'utilisation', 'Séquence', 'Activité'],
            'correct': 2,
            'expl': "Le diagramme de séquence montre les interactions ordonnées dans le temps entre objets (lifeslines et messages)."
        },
        {
            'q': 'Quelle relation UML représente "est-un" ?',
            'opts': ['Association', 'Agrégation', 'Composition', 'Généralisation'],
            'correct': 3,
            'expl': "La généralisation (héritage) représente la relation 'est-un' entre une sous-classe et sa super-classe."
        },
        {
            'q': 'Que signifie une flèche avec un losange vide en UML ?',
            'opts': ['Composition', 'Agrégation', 'Dépendance', 'Réalisation'],
            'correct': 1,
            'expl': "Le losange vide = agrégation (relation 'a-un' faible, les parties peuvent exister indépendamment)."
        },
    ],
    'ccna': [
        {
            'q': 'Quelle couche du modèle OSI gère les adresses IP ?',
            'opts': ['Liaison (2)', 'Réseau (3)', 'Transport (4)', 'Application (7)'],
            'correct': 1,
            'expl': "La couche 3 (Network) gère le routage et les adresses logiques IP."
        },
        {
            'q': 'Quelle est la plage d\'adresses IP privées en classe C ?',
            'opts': ['10.0.0.0/8', '172.16.0.0/12', '192.168.0.0/16', '169.254.0.0/16'],
            'correct': 2,
            'expl': "192.168.0.0/16 est la plage privée classe C (RFC 1918). 169.254.0.0/16 est link-local (APIPA)."
        },
        {
            'q': 'Que fait le protocole ARP ?',
            'opts': ['Résout DNS', 'Mappe IP → MAC', 'Route les paquets', 'Chiffre le trafic'],
            'correct': 1,
            'expl': "ARP (Address Resolution Protocol) traduit une adresse IP en adresse MAC sur le réseau local."
        },
    ],
    'uiux': [
        {
            'q': 'Que signifie WCAG ?',
            'opts': ['Web Content Accessibility Guidelines', 'World Computer Access Group', 'Wide Color And Graphics', 'Web Crypto Auth Guide'],
            'correct': 0,
            'expl': "WCAG = Web Content Accessibility Guidelines, les standards d'accessibilité web du W3C."
        },
        {
            'q': 'Quel contraste WCAG AA pour du texte normal ?',
            'opts': ['3:1', '4.5:1', '7:1', '21:1'],
            'correct': 1,
            'expl': "WCAG AA : texte normal ≥ 4.5:1, grand texte (≥18pt) ≥ 3:1. AAA : 7:1 et 4.5:1."
        },
        {
            'q': 'Que dit la loi de Fitts ?',
            'opts': ['Plus un bouton est grand et proche, plus il est rapide à atteindre', '7 ± 2 éléments en mémoire', 'Latence < 100ms', 'Affordance visible'],
            'correct': 0,
            'expl': "La loi de Fitts prédit le temps de mouvement vers une cible : fonction de la distance et de la taille de la cible."
        },
    ],
    'assembleur': [
        {
            'q': 'Que fait l\'instruction MOV en x86 ?',
            'opts': ['Addition', 'Déplacement de données', 'Comparaison', 'Saut'],
            'correct': 1,
            'expl': "MOV copie une valeur d'une source vers une destination (registre → registre, registre → mémoire, etc.)."
        },
        {
            'q': 'Que représente le registre PC ?',
            'opts': ['Program Counter', 'Personal Computer', 'Process Control', 'Power Counter'],
            'correct': 0,
            'expl': "Program Counter : contient l'adresse de la prochaine instruction à exécuter."
        },
        {
            'q': 'Quelle est la taille typique d\'un mot en x86_64 ?',
            'opts': ['8 bits', '16 bits', '32 bits', '64 bits'],
            'correct': 3,
            'expl': "x86_64 = 64 bits. Les registres sont 64 bits (RAX, RBX, RCX, RDX, RSI, RDI, RBP, RSP) + 8 ajoutés (R8-R15)."
        },
    ],
    'api-rest-flask': [
        {
            'q': 'Que retourne un endpoint POST réussi typiquement ?',
            'opts': ['200 OK', '201 Created', '204 No Content', '301 Moved'],
            'correct': 1,
            'expl': "POST crée une ressource → 201 Created avec un Location header pointant vers la nouvelle ressource."
        },
        {
            'q': 'Quelle méthode HTTP est idempotente ?',
            'opts': ['POST', 'GET', 'PATCH', 'CONNECT'],
            'correct': 1,
            'expl': "GET (et PUT, DELETE) sont idempotents : même requête → même effet. POST ne l'est pas."
        },
        {
            'q': 'Que signifie HATEOAS ?',
            'opts': ['Hypertext As The Engine Of Application State', 'HTTP API Template Engine', 'High-level API Test Environment', 'Aucun'],
            'correct': 0,
            'expl': "HATEOAS = le serveur inclut dans la réponse des hyperliens permettant au client de naviguer l'API."
        },
    ],
    'erp-si': [
        {
            'q': 'Que signifie ERP ?',
            'opts': ['Enterprise Resource Planning', 'Electronic Resource Protocol', 'External Reporting Process', 'Enterprise Routing Plan'],
            'correct': 0,
            'expl': "ERP = progiciel de gestion intégré (PGI) qui couvre l'ensemble des processus métier d'une entreprise."
        },
        {
            'q': 'Qu\'est-ce qu\'un SI ?',
            'opts': ['Système d\'Information', 'Standard Industriel', 'Serveur Intranet', 'Sauvegarde Informatique'],
            'correct': 0,
            'expl': "Système d'Information = ensemble de ressources (matériel, logiciel, données, procédures) permettant le traitement de l'information."
        },
        {
            'q': 'Quel est l\'objectif principal d\'un ERP ?',
            'opts': ['Remplacer les humains', 'Centraliser et intégrer les processus métier', 'Augmenter les prix', 'Réduire la qualité'],
            'correct': 1,
            'expl': "Un ERP centralise les données et intègre les processus (compta, RH, vente, stock) pour éliminer les silos d'information."
        },
    ],
    'ingenierie-besoin': [
        {
            'q': 'Que signifie SRS ?',
            'opts': ['Software Requirements Specification', 'System Resource Standard', 'Security Risk Score', 'Simple Request Schema'],
            'correct': 0,
            'expl': "SRS = document de spécification des exigences logicielles, standard IEEE 830."
        },
        {
            'q': 'Quelle est la différence entre besoin et exigence ?',
            'opts': ['Aucune', 'Besoin = haut niveau (pourquoi), exigence = concret (quoi)', 'Exigence = besoin', 'Besoin = technique'],
            'correct': 1,
            'expl': "Le besoin exprime l'objectif métier (haut niveau), l'exigence le traduit en spécifications mesurables."
        },
        {
            'q': 'Que signifie SMART pour un critère d\'acceptation ?',
            'opts': ['Specific, Measurable, Achievable, Relevant, Time-bound', 'Simple, Mémorisable, Applicable, Rapide, Testable', 'Aucun', 'Standard Market And Requirements Technology'],
            'correct': 0,
            'expl': "SMART = les 5 critères pour formuler un objectif ou critère d'acceptation testable."
        },
    ],
    'masterclass-apprendre': [
        {
            'q': 'Qu\'est-ce que la courbe d\'Ebbinghaus ?',
            'opts': ['Oubli exponentiel sans révision', 'Pic d\'apprentissage', 'Fatigue mentale', 'Cycle du sommeil'],
            'correct': 0,
            'expl': "La courbe de l'oubli : on perd ~70% en 24h sans révision. Espacement + répétition espacée = antidote."
        },
        {
            'q': 'Quelle est la technique Pomodoro ?',
            'opts': ['25 min de focus + 5 min pause', '50 min de focus + 10 min pause', '90 min de focus + 20 min pause', '45 min de focus + 15 min pause'],
            'correct': 0,
            'expl': "Pomodoro classique : 4 cycles de 25 min focus + 5 min pause, puis une grande pause de 15-30 min."
        },
        {
            'q': 'Qu\'est-ce que le "active recall" ?',
            'opts': ['Relire ses notes', 'Se tester sans regarder', 'Souligner en couleur', 'Étudier en groupe'],
            'correct': 1,
            'expl': "Active recall = récupérer activement l'info de sa mémoire (test, flashcards) plutôt que de relire passivement."
        },
    ],
    'Cyber securite B2': [
        {
            'q': 'Que signifie CIA en cybersécurité ?',
            'opts': ['Central Intelligence Agency', 'Confidentiality, Integrity, Availability', 'Computer Incident Alert', 'Code Injection Attack'],
            'correct': 1,
            'expl': "Le triptyque CIA : Confidentialité (qui voit les données), Intégrité (modification), Disponibilité (accès)."
        },
        {
            'q': 'Que fait Nmap ?',
            'opts': ['Scan de ports', 'Chiffrement', 'Honeypot', 'Firewall'],
            'correct': 0,
            'expl': "Nmap (Network Mapper) scanne les ports ouverts et détecte les services sur un réseau."
        },
        {
            'q': 'Qu\'est-ce qu\'une attaque MITM ?',
            'opts': ['Man In The Middle : intercepte les communications', 'Multi Input Threat Model', 'Memory Injection Technique', 'Mainframe Interface Terminal'],
            'correct': 0,
            'expl': "MITM = l'attaquant s'interpose entre deux parties qui croient communiquer directement (ex: ARP spoofing)."
        },
    ],
}

# === MAIN ===
def main():
    print("=== MIGRATION DES COURS ===\n")
    for course_id, course_info in COURSES.items():
        course_path = ROOT / course_id
        if not course_path.exists():
            print(f"  ✗ {course_id}: dossier introuvable")
            continue

        chapters = detect_chapters(course_id, course_path)
        if not chapters:
            print(f"  ✗ {course_id}: aucun chapitre détecté")
            continue

        print(f"  → {course_id}: {len(chapters)} chapitres détectés")

        # 1. Sommaire
        make_sommaire(course_id, course_path, course_info, chapters)

        # 2. Chapitres (réécriture propre avec template v2)
        total = len(chapters)
        for i, (kind, f) in enumerate(chapters, 1):
            make_chapter(course_id, course_path, course_info, i, f, total)

        # 3. Exercices (3 par défaut)
        nb_ex = max(3, min(5, total // 2 if total > 4 else 3))
        for i in range(1, nb_ex + 1):
            make_exercise(course_id, course_path, course_info, i, total)

        print(f"     ✓ sommaire + {total} chapitres + {nb_ex} exercices")

    print("\n=== MIGRATION TERMINÉE ===")

if __name__ == "__main__":
    main()
