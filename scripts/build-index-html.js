'use strict';

const fs = require('fs');
const path = require('path');
const { generateCards } = require('./generate-portal-cards');

const ROOT = path.resolve(__dirname, '..');
const cardsHtml = generateCards();

const indexHtml = `<!DOCTYPE html>
<html lang="fr" data-theme="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cours Interactifs — Portail Informatique B1, B2 & B3</title>
    <meta name="description" content="71 cours interactifs d'informatique en B1, B2 et B3 : chapitres interactifs, exercices, code en direct, QCM, flashcards et ateliers. Le premier chapitre de chaque cours est 100% gratuit.">
    <meta property="og:title" content="Cours Interactifs — Portail Informatique B1, B2 & B3">
    <meta property="og:description" content="71 cours interactifs complets pour Licence 1, 2 et 3. Tous les premiers chapitres sont gratuits sans inscription.">
    <meta property="og:type" content="website">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700;800&display=swap">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700;800&display=swap">

    <link rel="stylesheet" href="assets/css/tokens.css">
    <link rel="stylesheet" href="assets/css/base.css">
    <link rel="stylesheet" href="assets/css/components.css">
    <link rel="stylesheet" href="assets/css/portal.css">

    <script src="assets/js/theme.js"></script>
</head>
<body>

    <nav class="skip-nav" aria-label="Accès rapide"><a href="#grid" class="skip-link">Aller au contenu</a></nav>

    <!-- Topbar -->
    <header class="topbar" role="banner">
        <a href="index.html" class="topbar__brand" aria-label="cours.interactifs — Accueil">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c3 3 10 3 12 0v-5"/>
            </svg>
            <span>cours.interactifs</span>
        </a>

        <nav class="topbar__nav" aria-label="Navigation principale">
            <a href="epreuves/index.html" class="topbar__nav-link">Épreuves</a>
            <a href="preparation-web/index.html" class="topbar__nav-link">Atelier</a>
            <a href="/_auth/account.html" class="topbar__nav-link" id="navAccount">Mon compte</a>
        </nav>

        <div class="topbar__actions">
            <a href="/_auth/account.html" class="profile-btn" id="topbarProfileBtn" aria-label="Mon espace personnel" title="Mon compte">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <use href="/assets/img/ui-icons.svg#i-user"></use>
                </svg>
            </a>
            <button type="button" id="themeToggle" class="theme-toggle" aria-label="Activer le mode sombre">
                <svg class="theme-toggle__sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <circle cx="12" cy="12" r="4"/>
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
                </svg>
                <svg class="theme-toggle__moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
                </svg>
            </button>
        </div>
    </header>

    <main id="main">

        <!-- Message si redirection atelier verrouillé (?preparation=locked) -->
        <div id="prepLockedMsg" class="prep-locked-msg" hidden role="status">
            <strong><svg class="ic" aria-hidden="true"><use href="/assets/img/ui-icons.svg#i-lock"></use></svg> L'atelier est protégé.</strong>
            Connecte-toi, saisis le mot de passe de section dans l'atelier, puis accède à tes projets.
            <button type="button" class="prep-locked-msg__close" aria-label="Fermer" onclick="this.parentElement.hidden = true"><svg class="ic" aria-hidden="true"><use href="/assets/img/ui-icons.svg#i-x"></use></svg></button>
        </div>

        <!-- Hero -->
        <section class="portal-hero">
            <h1 class="portal-hero__title">Apprends en codant.</h1>
            <p class="portal-hero__subtitle">71 cours interactifs d'informatique — Licence 1, 2 et 3. Théorie rigoureuse, exécution de code en direct, QCM interactifs, flashcards et ateliers pratiques.</p>

            <!-- Accès libre gratuit chapitre 1 -->
            <div class="portal-free-banner" role="status">
                <svg class="ic" aria-hidden="true"><use href="/assets/img/ui-icons.svg#i-sparkles"></use></svg>
                <span><strong>Accès 100% libre :</strong> Le chapitre 1 de chaque cours est gratuit et accessible immédiatement sans inscription.</span>
            </div>

            <!-- Choix du Niveau (B1 / B2 / B3 / Tous) -->
            <div class="portal-level-section" role="region" aria-label="Sélection du niveau d'études">
                <div class="portal-level-label">Choisis ton niveau :</div>
                <div class="portal-level-tabs" role="tablist" aria-label="Niveau académique">
                    <button class="level-tab is-active" type="button" role="tab" data-level="b1" id="tab-b1" aria-selected="true">
                        <span class="level-tab__badge">B1</span>
                        <span class="level-tab__title">Licence 1</span>
                        <span class="level-tab__count">24 cours</span>
                    </button>
                    <button class="level-tab" type="button" role="tab" data-level="b2" id="tab-b2" aria-selected="false">
                        <span class="level-tab__badge">B2</span>
                        <span class="level-tab__title">Licence 2</span>
                        <span class="level-tab__count">24 cours</span>
                    </button>
                    <button class="level-tab" type="button" role="tab" data-level="b3" id="tab-b3" aria-selected="false">
                        <span class="level-tab__badge">B3</span>
                        <span class="level-tab__title">Licence 3</span>
                        <span class="level-tab__count">23 cours</span>
                    </button>
                    <button class="level-tab" type="button" role="tab" data-level="all" id="tab-all" aria-selected="false">
                        <span class="level-tab__badge">Tous</span>
                        <span class="level-tab__title">Tous niveaux</span>
                        <span class="level-tab__count">71 cours</span>
                    </button>
                </div>
            </div>

            <!-- Search -->
            <div class="portal-search" style="position: relative;">
                <svg class="portal-search__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                </svg>
                <input type="search" id="courseSearch" class="portal-search__input" placeholder="Rechercher un cours (Python, Linux, SQL, Docker, React…)" aria-label="Rechercher un cours">
            </div>

            <!-- Status bar -->
            <div class="portal-status-bar" id="portalStatusBar">
                <span id="activeFilterLabel">Cours de Licence 1 (B1)</span> — <strong id="activeFilterCount">24 cours</strong>
            </div>
        </section>

        <!-- Reprendre (conditionnel : visible seulement si progression locale) -->
        <section id="bf-resume" class="bf-resume" hidden>
            <span class="bf-resume__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9"/><path d="M3 4v5h5"/></svg>
            </span>
            <span class="bf-resume__body">
                <span class="bf-resume__label">Reprendre</span>
                <strong class="bf-resume__title" id="bfResumeTitle">—</strong>
            </span>
            <a class="bf-resume__cta" id="bfResumeLink" href="#"><span>Continuer</span><svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><use href="/assets/img/ui-icons.svg#i-arrow-right"></use></svg></a>
        </section>

        <!-- Grid (71 cours) -->
        <section id="grid" class="portal-grid" aria-label="Liste des cours">

${cardsHtml}

        </section>

    </main>

    <footer class="portal-footer">
        <p>© 2025-2026 Cours Interactifs — RD4SLOQ · <a href="/_auth/account.html">Mon compte</a> · <a href="epreuves/index.html">Épreuves</a> · <a href="preparation-web/index.html">Atelier</a></p>
    </footer>

    <style>
        /* Skip link */
        .skip-link {
            position: absolute;
            top: -100px;
            left: var(--space-4);
            z-index: var(--z-max);
            padding: var(--space-2) var(--space-4);
            background: var(--color-primary);
            color: var(--color-on-primary);
            font-size: var(--text-sm);
            font-weight: var(--weight-semibold);
            border-radius: var(--radius-md);
            text-decoration: none;
            transition: top var(--transition-base);
        }
        .skip-link:focus {
            top: var(--space-4);
        }

        /* Message atelier verrouillé */
        .prep-locked-msg {
            display: flex;
            align-items: center;
            gap: var(--space-3);
            max-width: 720px;
            margin: var(--space-4) auto 0;
            padding: var(--space-3) var(--space-4);
            background: var(--color-warning-soft);
            border: 1px solid color-mix(in srgb, var(--color-warning) 30%, transparent);
            border-radius: var(--radius-md);
            color: var(--color-warning);
            font-size: var(--text-sm);
        }
        .prep-locked-msg strong { color: var(--color-warning); }
        .prep-locked-msg[hidden] { display: none; }
        .prep-locked-msg__close {
            margin-left: auto;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 28px;
            height: 28px;
            background: transparent;
            border: none;
            border-radius: var(--radius-full);
            color: inherit;
            cursor: pointer;
            font-size: var(--text-sm);
        }
        .prep-locked-msg__close:hover { background: color-mix(in srgb, var(--color-warning) 14%, transparent); }

        /* Theme toggle icon visibility */
        [data-theme="dark"] .theme-toggle__sun { display: none; }
        [data-theme="light"] .theme-toggle__moon { display: none; }
        [data-theme="dark"] .theme-toggle__moon,
        [data-theme="light"] .theme-toggle__sun { display: block; }

        /* Smooth scroll */
        html { scroll-behavior: smooth; }
        @media (prefers-reduced-motion: reduce) {
            html { scroll-behavior: auto; }
        }

        /* SVG icon class */
        .ic { width: 1em; height: 1em; flex: none; fill: none; stroke: currentColor; stroke-width: 1.75; stroke-linecap: round; stroke-linejoin: round; vertical-align: -0.14em; }

        /* ── Bannière gratuite Chapitre 1 ── */
        .portal-free-banner {
            display: inline-flex;
            align-items: center;
            gap: var(--space-2);
            padding: var(--space-2) var(--space-4);
            background: var(--color-success-soft);
            border: 1px solid color-mix(in srgb, var(--color-success) 30%, transparent);
            border-radius: var(--radius-full);
            color: var(--color-success);
            font-size: var(--text-xs);
            font-weight: 500;
            margin: 0 auto var(--space-6);
            max-width: 92%;
            text-align: left;
        }
        [data-theme="dark"] .portal-free-banner {
            background: rgba(52, 211, 153, 0.15);
            border-color: rgba(52, 211, 153, 0.3);
            color: #34d399;
        }
        .portal-free-banner .ic {
            width: 1.15rem;
            height: 1.15rem;
            flex-shrink: 0;
        }

        /* ── Sélecteur de niveau (B1 / B2 / B3 / Tous) ── */
        .portal-level-section {
            max-width: 760px;
            margin: 0 auto var(--space-6);
        }
        .portal-level-label {
            font-size: var(--text-xs);
            font-weight: var(--weight-bold);
            color: var(--color-text-subtle);
            text-transform: uppercase;
            letter-spacing: var(--tracking-wider);
            margin-bottom: var(--space-3);
            text-align: center;
        }
        .portal-level-tabs {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: var(--space-3);
        }
        @media (max-width: 640px) {
            .portal-level-tabs {
                grid-template-columns: repeat(2, 1fr);
                gap: var(--space-2);
            }
        }
        .level-tab {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: var(--space-3) var(--space-2);
            background: var(--color-bg-elevated);
            border: 2px solid var(--color-border);
            border-radius: var(--radius-xl);
            cursor: pointer;
            transition: all var(--transition-fast);
            font-family: inherit;
            color: var(--color-text);
        }
        .level-tab:hover {
            border-color: var(--color-border-strong);
            transform: translateY(-2px);
            box-shadow: var(--shadow-sm);
        }
        .level-tab.is-active {
            border-color: var(--color-primary);
            background: var(--color-primary);
            color: var(--color-on-primary);
            box-shadow: var(--shadow-md);
        }
        [data-theme="dark"] .level-tab.is-active {
            border-color: var(--color-accent);
            background: var(--color-accent);
            color: #0c0a09;
        }
        .level-tab__badge {
            font-size: 1.18rem;
            font-weight: 800;
            line-height: 1;
            margin-bottom: 3px;
            letter-spacing: -0.02em;
            font-family: var(--font-mono);
        }
        .level-tab__title {
            font-size: var(--text-xs);
            font-weight: 700;
        }
        .level-tab__count {
            font-size: 11px;
            opacity: 0.75;
            margin-top: 1px;
        }
        .level-tab.is-active .level-tab__count {
            opacity: 0.9;
        }

        /* ── Status Bar ── */
        .portal-status-bar {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: var(--space-2);
            font-size: var(--text-xs);
            color: var(--color-text-subtle);
            margin: var(--space-2) auto var(--space-8);
        }
        .portal-status-bar strong {
            color: var(--color-text);
        }

        /* ── Cartes de cours ── */
        .portal-card {
            display: flex;
            flex-direction: column;
            min-height: 130px;
        }
        .card__head {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            margin-bottom: var(--space-2);
        }
        .card__foot {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            margin-top: auto;
            padding-top: var(--space-2);
            border-top: 1px solid var(--color-border-subtle);
        }
        .badge-level {
            font-size: 0.68rem;
            font-weight: 800;
            padding: 2px 7px;
            border-radius: var(--radius-full);
            letter-spacing: 0.04em;
            font-family: var(--font-mono);
        }
        .badge-level--b1 { background: #e0e7ff; color: #3730a3; }
        .badge-level--b2 { background: #fef3c7; color: #92400e; }
        .badge-level--b3 { background: #ccfbf1; color: #115e59; }
        [data-theme="dark"] .badge-level--b1 { background: rgba(99, 102, 241, 0.2); color: #a5b4fc; }
        [data-theme="dark"] .badge-level--b2 { background: rgba(245, 158, 11, 0.2); color: #fcd34d; }
        [data-theme="dark"] .badge-level--b3 { background: rgba(20, 184, 166, 0.2); color: #5eead4; }

        .badge-free {
            font-size: 0.68rem;
            font-weight: 700;
            color: var(--color-success);
            background: var(--color-success-soft);
            padding: 2px 6px;
            border-radius: var(--radius-sm);
        }
        [data-theme="dark"] .badge-free {
            color: #34d399;
            background: rgba(52, 211, 153, 0.15);
        }
    </style>

    <script src="assets/js/progress.js" defer></script>
    <script>
        // Theme toggle binding
        document.getElementById('themeToggle')?.addEventListener('click', window.toggleTheme);

        // Message « atelier verrouillé » si redirection depuis preparation-web
        if (new URLSearchParams(window.location.search).get('preparation') === 'locked') {
            var msg = document.getElementById('prepLockedMsg');
            if (msg) msg.hidden = false;
            history.replaceState(null, '', '/index.html');
        }

        // Carte « Reprendre » — lit la progression locale, s'efface sinon
        document.addEventListener('DOMContentLoaded', function () {
            if (!window.Progress) return;
            try {
                var best = null;
                document.querySelectorAll('.portal-card').forEach(function (card) {
                    var href = card.getAttribute('href') || '';
                    var courseId = href.split('/')[0];
                    if (!courseId) return;
                    var stats = window.Progress.getStats(courseId);
                    if (stats.overall > 0 && stats.lastActivityAt && (!best || stats.lastActivityAt > best.stats.lastActivityAt)) {
                        best = { courseId: courseId, stats: stats, href: href, title: (card.querySelector('.card__title') || {}).textContent || courseId };
                    }
                });
                if (best) {
                    var section = document.getElementById('bf-resume');
                    document.getElementById('bfResumeTitle').textContent = best.title + ' · ' + best.stats.overall + '%';
                    document.getElementById('bfResumeLink').href = best.href;
                    section.hidden = false;
                }
            } catch (e) { /* jamais bloquant */ }
        });

        // Filtrage par niveau (B1 / B2 / B3 / Tous) + recherche en direct
        (function() {
            var search = document.getElementById('courseSearch');
            var levelTabs = document.querySelectorAll('.level-tab');
            var cards = document.querySelectorAll('.portal-card');
            var countEl = document.getElementById('activeFilterCount');
            var labelEl = document.getElementById('activeFilterLabel');

            var levelLabels = {
                'b1': 'Cours de Licence 1 (B1)',
                'b2': 'Cours de Licence 2 (B2)',
                'b3': 'Cours de Licence 3 (B3)',
                'all': 'Tous les cours (B1, B2, B3)'
            };

            // Lire le niveau depuis l'URL ou le stockage local, défaut: 'b1'
            var urlParam = new URLSearchParams(window.location.search).get('level');
            var savedLevel = null;
            try { savedLevel = localStorage.getItem('portal_selected_level'); } catch(e) {}
            var currentLevel = (urlParam && ['b1', 'b2', 'b3', 'all'].indexOf(urlParam.toLowerCase()) !== -1)
                ? urlParam.toLowerCase()
                : (savedLevel && ['b1', 'b2', 'b3', 'all'].indexOf(savedLevel) !== -1 ? savedLevel : 'b1');

            function applyFilters() {
                var q = (search?.value || '').toLowerCase().trim();
                var visibleCount = 0;

                cards.forEach(function(card) {
                    var title = card.dataset.title || '';
                    var cardLevel = card.dataset.level || '';
                    var matchSearch = !q || title.indexOf(q) !== -1;
                    var matchLevel = currentLevel === 'all' || cardLevel === currentLevel;

                    var isVisible = matchSearch && matchLevel;
                    card.style.display = isVisible ? '' : 'none';
                    if (isVisible) visibleCount++;
                });

                if (countEl) countEl.textContent = visibleCount + (visibleCount > 1 ? ' cours' : ' cours');
                if (labelEl) labelEl.textContent = levelLabels[currentLevel] || 'Cours';
            }

            function setLevel(lvl) {
                currentLevel = lvl;
                try { localStorage.setItem('portal_selected_level', lvl); } catch(e) {}

                levelTabs.forEach(function(tab) {
                    var active = tab.dataset.level === lvl;
                    tab.classList.toggle('is-active', active);
                    tab.setAttribute('aria-selected', active ? 'true' : 'false');
                });

                applyFilters();
            }

            levelTabs.forEach(function(tab) {
                tab.addEventListener('click', function() {
                    setLevel(tab.dataset.level);
                });
                tab.addEventListener('keydown', function(e) {
                    var tabsArray = Array.from(levelTabs);
                    var idx = tabsArray.indexOf(tab);
                    var target = null;
                    if (e.key === 'ArrowRight') target = tabsArray[(idx + 1) % tabsArray.length];
                    else if (e.key === 'ArrowLeft') target = tabsArray[(idx - 1 + tabsArray.length) % tabsArray.length];
                    if (target) { e.preventDefault(); target.focus(); target.click(); }
                });
            });

            search?.addEventListener('input', applyFilters);

            // Activer le niveau initial
            setLevel(currentLevel);

            // Détection optionnelle du niveau du compte connecté (sans jamais bloquer)
            fetch('/api/verify', { credentials: 'include' })
                .then(function(r) { return r.json(); })
                .then(function(d) {
                    if (d && d.authenticated) {
                        var profBtn = document.getElementById('topbarProfileBtn');
                        if (profBtn) {
                            profBtn.classList.add('is-authenticated');
                            var name = (d.account && (d.account.displayName || d.account.email)) || 'Mon espace personnel';
                            profBtn.setAttribute('title', name + ' (connecté)');
                            profBtn.setAttribute('aria-label', name + ' (connecté)');
                        }
                        if (d.level && !urlParam && !savedLevel) {
                            if (['b1', 'b2', 'b3'].indexOf(d.level) !== -1) {
                                setLevel(d.level);
                            }
                        }
                    }
                })
                .catch(function() { /* jamais bloquant */ });
        })();
    </script>

</body>
</html>
`;

fs.writeFileSync(path.join(ROOT, 'index.html'), indexHtml, 'utf8');
console.log('index.html mis à jour avec succès avec les 71 cours et le sélecteur de niveau B1/B2/B3.');
