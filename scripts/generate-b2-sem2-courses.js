#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const reactQuestions = require('./questions-react.js');
const erpQuestions = require('./questions-erp.js');
const requirementsQuestions = require('./questions-requirements.js');
const masterclassQuestions = require('./questions-masterclass.js');

const ROOT = path.resolve(__dirname, '..');

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeFile(file, content) {
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, content.replace(/\n{3,}/g, '\n\n'), 'utf8');
}

function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

function shuffleOptions(correct, wrongs, seed) {
  const opts = [correct, ...wrongs.slice(0, 3)];
  const shift = seed % opts.length;
  const rotated = opts.slice(shift).concat(opts.slice(0, shift));
  return { options: rotated, answer: rotated.indexOf(correct) };
}

function buildQuestions(course) {
  const starters = [
    (t) => `Dans ${course.shortTitle}, quelle idee faut-il retenir sur ${t.label} ?`,
    (t) => `Quelle affirmation est correcte concernant ${t.label} ?`,
    (t) => `Si le professeur demande ${t.label}, quelle reponse est la plus juste ?`,
    (t) => `Quel piege faut-il eviter avec ${t.label} ?`,
    (t) => `Quelle formulation resume le mieux ${t.label} ?`
  ];
  const questions = [];
  let id = 1;
  while (questions.length < 100) {
    for (const topic of course.qTopics) {
      for (const starter of starters) {
        if (questions.length >= 100) break;
        const { options, answer } = shuffleOptions(topic.correct, topic.wrongs, id + topic.ch);
        questions.push({
          id,
          ch: topic.ch,
          q: starter(topic),
          o: options,
          a: answer,
          e: topic.explain
        });
        id += 1;
      }
      if (questions.length >= 100) break;
    }
  }
  return questions;
}

function navLinks(course, prefix, active) {
  const chapterLinks = course.chapters.map((chapter, index) => {
    const name = `chapitre${index + 1}.html`;
    const cls = active === name ? ' class="active"' : '';
    return `<li><a href="${prefix}chapitres/${name}"${cls}>Ch.${index + 1}</a></li>`;
  }).join('\n');
  const extra = [
    ['exercices.html', 'Exercices'],
    ['flashcards.html', 'Flashcards'],
    ['fiche-memo.html', 'Fiche memo']
  ].map(([file, label]) => `<li><a href="${prefix}chapitres/${file}"${active === file ? ' class="active"' : ''}>${label}</a></li>`).join('\n');
  return `${chapterLinks}\n${extra}\n<li><a href="${prefix}qcm-100.html"${active === 'qcm-100.html' ? ' class="active"' : ''}>100 QCM</a></li>`;
}

function mobileLinks(course, prefix, portalPrefix, active) {
  const chapterLinks = course.chapters.map((chapter, index) => {
    const file = `chapitre${index + 1}.html`;
    return `<a href="${prefix}chapitres/${file}"${active === file ? ' class="active"' : ''}><i class="${chapter.icon}"></i> ${index + 1}. ${esc(chapter.title)}</a>`;
  }).join('\n');
  return `<a href="${prefix}index.html"${active === 'index.html' ? ' class="active"' : ''}><i class="fa-solid fa-house"></i> Accueil du cours</a>
${chapterLinks}
<a href="${prefix}chapitres/exercices.html"${active === 'exercices.html' ? ' class="active"' : ''}><i class="fa-solid fa-pen-to-square"></i> Exercices</a>
<a href="${prefix}chapitres/flashcards.html"${active === 'flashcards.html' ? ' class="active"' : ''}><i class="fa-solid fa-layer-group"></i> Flashcards</a>
<a href="${prefix}chapitres/fiche-memo.html"${active === 'fiche-memo.html' ? ' class="active"' : ''}><i class="fa-solid fa-bolt"></i> Fiche memo</a>
<a href="${prefix}qcm-100.html"${active === 'qcm-100.html' ? ' class="active"' : ''}><i class="fa-solid fa-clipboard-check"></i> 100 QCM</a>
<a href="${portalPrefix}index.html"><i class="fa-solid fa-table-cells"></i> Portail general</a>`;
}

function layout(course, page, body, options = {}) {
  const prefix = options.nested ? '../' : '';
  const portalPrefix = options.nested ? '../../' : '../';
  const title = options.title || course.title;
  const description = options.description || course.description;
  const cssHref = options.nested ? '../assets/css/style.css' : 'assets/css/style.css';
  const jsHref = options.nested ? '../assets/js/main.js' : 'assets/js/main.js';
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(title)} | ${esc(course.title)}</title>
  <meta name="description" content="${esc(description)}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <link rel="stylesheet" href="${cssHref}">
</head>
<body data-course-theme-key="${course.slug}-theme" data-accent="${course.accentName}">
  <a href="#main-content" class="skip-link">Aller au contenu</a>
  <div class="reading-progress" id="reading-progress"></div>
  <nav class="course-nav">
    <div class="nav-inner">
      <a href="${prefix}index.html" class="nav-logo"><span class="brand-badge">${course.badge}</span><span>${esc(course.shortTitle)}</span></a>
      <ul class="nav-links">
${navLinks(course, prefix, page)}
      </ul>
      <div class="nav-actions">
        <a class="primary-link compact" href="${portalPrefix}index.html"><i class="fa-solid fa-table-cells"></i> Portail</a>
        <button id="theme-toggle" aria-label="Changer le theme"><i class="fa-solid fa-moon"></i></button>
        <button id="hamburger-btn" class="hamburger-btn" aria-label="Menu"><i class="fa-solid fa-bars"></i></button>
      </div>
    </div>
  </nav>
  <div class="mobile-nav-overlay" id="mobile-nav-overlay"></div>
  <div class="mobile-nav-panel" id="mobile-nav">
    <div class="mobile-nav-header"><span>${esc(course.shortTitle)}</span><button id="mobile-nav-close" class="mobile-nav-close" aria-label="Fermer le menu"><i class="fa-solid fa-xmark"></i></button></div>
${mobileLinks(course, prefix, portalPrefix, page)}
  </div>
  <main id="main-content">
${body}
  </main>
  <footer class="footer">${esc(course.title)} - B2 Semestre 2</footer>
  <script src="${jsHref}"></script>
${options.extraScripts || ''}
</body>
</html>`;
}

function hero(course, eyebrow, title, subtitle, icon) {
  return `<header class="hero-section">
    <div class="hero-badge"><i class="${icon || course.icon}"></i> ${esc(eyebrow)}</div>
    <h1>${esc(title)}</h1>
    <p>${esc(subtitle)}</p>
  </header>`;
}

function renderSection(section) {
  const parts = [`<section class="chapter-section reveal-on-scroll">
    <h2><i class="${section.icon || 'fa-solid fa-book-open'}"></i> ${esc(section.title)}</h2>`];
  if (section.lead) parts.push(`<p class="lead">${esc(section.lead)}</p>`);
  (section.paragraphs || []).forEach((p) => parts.push(`<p>${esc(p)}</p>`));
  if (section.bullets) {
    parts.push(`<ul class="key-list">${section.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>`);
  }
  if (section.table) {
    parts.push(`<table class="data-table"><thead><tr>${section.table.headers.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${section.table.rows.map((row) => `<tr>${row.map((cell) => `<td>${esc(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table>`);
  }
  if (section.code) parts.push(`<pre><code>${esc(section.code)}</code></pre>`);
  if (section.memo) parts.push(`<div class="memo-box"><strong>Memo rapide :</strong> ${esc(section.memo)}</div>`);
  if (section.tip) parts.push(`<div class="tip-box"><strong>Tip :</strong> ${esc(section.tip)}</div>`);
  if (section.warning) parts.push(`<div class="warning-box"><strong>Piege :</strong> ${esc(section.warning)}</div>`);
  parts.push('</section>');
  return parts.join('\n');
}

function miniQuizHtml(questions) {
  return `<section class="chapter-section reveal-on-scroll">
    <h2><i class="fa-solid fa-circle-question"></i> Questions de fin de chapitre</h2>
    <p>Reponds avant de lire la correction. Elle se debloque apres une bonne reponse, ou apres deux erreurs.</p>
${questions.map((q, index) => `<div class="quiz-card" data-answer="${q.a}">
      <div class="quiz-question">${index + 1}. ${esc(q.q)}</div>
      <div class="quiz-options">${q.o.map((opt, i) => `<button class="quiz-option" data-index="${i}">${esc(opt)}</button>`).join('')}</div>
      <div class="quiz-status"></div>
      <div class="quiz-explain"><strong>Correction :</strong> ${esc(q.e)}</div>
    </div>`).join('\n')}
  </section>`;
}

function chapterPage(course, chapter, index, bank) {
  const q = bank.filter((item) => item.ch === index + 1).slice(0, 5);
  const previous = index === 0 ? '../index.html' : `chapitre${index}.html`;
  const next = index === course.chapters.length - 1 ? 'exercices.html' : `chapitre${index + 2}.html`;
  const body = `${hero(course, `Chapitre ${index + 1}`, chapter.title, chapter.subtitle, chapter.icon)}
  <div class="content-wrapper">
${chapter.sections.map(renderSection).join('\n')}
${chapter.lab ? renderLabBlock(chapter.lab) : ''}
${miniQuizHtml(q)}
    <nav class="chapter-nav">
      <a class="primary-link" href="${previous}"><i class="fa-solid fa-arrow-left"></i> Precedent</a>
      <a class="primary-link" href="${next}">Suivant <i class="fa-solid fa-arrow-right"></i></a>
    </nav>
  </div>`;
  return layout(course, `chapitre${index + 1}.html`, body, {
    nested: true,
    title: `Chapitre ${index + 1} - ${chapter.title}`,
    description: chapter.subtitle
  });
}

function renderLabBlock(lab) {
  return `<section class="chapter-section reveal-on-scroll">
    <h2><i class="fa-solid fa-code"></i> Atelier guide</h2>
    <p>${esc(lab.intro)}</p>
    <div class="code-lab" data-terms="${esc(lab.terms.join('|'))}">
      <label>${esc(lab.prompt)}</label>
      <textarea spellcheck="false">${esc(lab.starter || '')}</textarea>
      <button class="primary-link check-exercise" type="button"><i class="fa-solid fa-check"></i> Verifier</button>
      <div class="exercise-feedback"></div>
      <div class="exercise-solution"><strong>Correction guidee :</strong><pre><code>${esc(lab.solution)}</code></pre><p>${esc(lab.explain)}</p></div>
    </div>
  </section>`;
}

function indexPage(course) {
  const chapterCards = course.chapters.map((chapter, index) => `<a href="chapitres/chapitre${index + 1}.html" class="module-card reveal-on-scroll">
      <span class="module-lock"><i class="fa-solid ${index === 0 ? 'fa-lock-open' : 'fa-lock'}"></i></span>
      <div class="module-icon"><i class="${chapter.icon}"></i></div>
      <h3>Chapitre ${index + 1} - ${esc(chapter.title)}</h3>
      <p>${esc(chapter.subtitle)}</p>
      <div class="module-meta"><span><i class="fa-solid fa-clock"></i> ${chapter.duration}</span><span><i class="fa-solid fa-lightbulb"></i> Memo + QCM</span></div>
    </a>`).join('\n');
  const extras = [
    ['chapitres/exercices.html', 'fa-solid fa-pen-to-square', 'Exercices progressifs', 'TP, cas pratiques et corrections debloquees apres tentative.'],
    ['chapitres/flashcards.html', 'fa-solid fa-layer-group', 'Flashcards', 'Cartes memo pour retenir les definitions, pieges et formules mentales.'],
    ['chapitres/fiche-memo.html', 'fa-solid fa-bolt', 'Fiche memo', 'Recap dense pour reviser vite sans perdre le sens.'],
    ['qcm-100.html', 'fa-solid fa-clipboard-check', '100 QCM', 'Banque separee en mode entrainement, sans chrono.']
  ].map(([href, icon, title, desc]) => `<a href="${href}" class="module-card reveal-on-scroll">
      <span class="module-lock"><i class="fa-solid fa-lock"></i></span>
      <div class="module-icon"><i class="${icon}"></i></div>
      <h3>${title}</h3>
      <p>${desc}</p>
      <div class="module-meta"><span><i class="fa-solid fa-unlock-keyhole"></i> Cle requise</span><span><i class="fa-solid fa-check"></i> Entrainement</span></div>
    </a>`).join('\n');
  const body = `${hero(course, 'B2 - Semestre 2', course.title, course.description, course.icon)}
  <div class="content-wrapper">
    <section class="course-intro reveal-on-scroll">
      <h2>Comment travailler ce cours</h2>
      <p>Chaque chapitre avance en quatre temps: comprendre l'idee, voir un exemple, eviter les pieges, puis se tester. Les corrections ne s'ouvrent pas tout de suite: tu dois reussir une fois ou te tromper deux fois pour les voir.</p>
      <div class="method-strip">
        <span><i class="fa-solid fa-brain"></i> Idee claire</span>
        <span><i class="fa-solid fa-code"></i> Application</span>
        <span><i class="fa-solid fa-triangle-exclamation"></i> Pieges</span>
        <span><i class="fa-solid fa-repeat"></i> Rappel actif</span>
      </div>
    </section>
    <div class="modules-grid">
${chapterCards}
${extras}
    </div>
  </div>`;
  return layout(course, 'index.html', body, { title: 'Accueil', description: course.description });
}

function exercisesPage(course) {
  const body = `${hero(course, 'Atelier', 'Exercices progressifs', 'Applique les notions avec des corrections qui se debloquent apres reussite ou deux echecs.', 'fa-solid fa-pen-to-square')}
  <div class="content-wrapper">
${course.exercises.map((exercise, index) => `<section class="chapter-section reveal-on-scroll exercise-card" data-terms="${esc(exercise.terms.join('|'))}">
      <h2><i class="${exercise.icon || 'fa-solid fa-pen'}"></i> Exercice ${index + 1} - ${esc(exercise.title)}</h2>
      <p>${esc(exercise.prompt)}</p>
      ${exercise.context ? `<div class="tip-box"><strong>Contexte :</strong> ${esc(exercise.context)}</div>` : ''}
      <textarea spellcheck="false" placeholder="Ecris ta reponse, ton pseudo-code ou ton code ici...">${esc(exercise.starter || '')}</textarea>
      <button class="primary-link check-exercise" type="button"><i class="fa-solid fa-check"></i> Verifier</button>
      <div class="exercise-feedback"></div>
      <div class="exercise-solution"><strong>Correction :</strong><pre><code>${esc(exercise.solution)}</code></pre><p>${esc(exercise.explain)}</p></div>
    </section>`).join('\n')}
    <nav class="chapter-nav">
      <a class="primary-link" href="chapitre${course.chapters.length}.html"><i class="fa-solid fa-arrow-left"></i> Dernier chapitre</a>
      <a class="primary-link" href="flashcards.html">Flashcards <i class="fa-solid fa-arrow-right"></i></a>
    </nav>
  </div>`;
  return layout(course, 'exercices.html', body, { nested: true, title: 'Exercices', description: `Exercices ${course.title}` });
}

function flashcardsPage(course) {
  const cards = course.flashcards.map((card, index) => `<button class="flashcard reveal-on-scroll" type="button" aria-label="Retourner la carte ${index + 1}">
      <span class="flash-front">${esc(card.front)}</span>
      <span class="flash-back">${esc(card.back)}</span>
    </button>`).join('\n');
  const body = `${hero(course, 'Memoire active', 'Flashcards', 'Clique sur une carte, reponds dans ta tete, puis verifie.', 'fa-solid fa-layer-group')}
  <div class="content-wrapper">
    <div class="flash-grid">
${cards}
    </div>
    <nav class="chapter-nav">
      <a class="primary-link" href="exercices.html"><i class="fa-solid fa-arrow-left"></i> Exercices</a>
      <a class="primary-link" href="fiche-memo.html">Fiche memo <i class="fa-solid fa-arrow-right"></i></a>
    </nav>
  </div>`;
  return layout(course, 'flashcards.html', body, { nested: true, title: 'Flashcards', description: `Flashcards ${course.title}` });
}

function memoPage(course) {
  const body = `${hero(course, 'Revision rapide', 'Fiche memo', 'Les idees a ressortir vite en controle, sans perdre le raisonnement.', 'fa-solid fa-bolt')}
  <div class="content-wrapper">
${course.memoSections.map((section) => `<section class="chapter-section reveal-on-scroll">
      <h2><i class="${section.icon || 'fa-solid fa-thumbtack'}"></i> ${esc(section.title)}</h2>
      <ul class="key-list">${section.items.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>
    </section>`).join('\n')}
    <nav class="chapter-nav">
      <a class="primary-link" href="flashcards.html"><i class="fa-solid fa-arrow-left"></i> Flashcards</a>
      <a class="primary-link" href="../qcm-100.html">100 QCM <i class="fa-solid fa-arrow-right"></i></a>
    </nav>
  </div>`;
  return layout(course, 'fiche-memo.html', body, { nested: true, title: 'Fiche memo', description: `Fiche memo ${course.title}` });
}

function qcmPage(course) {
  const body = `${hero(course, 'Mode entrainement', '100 QCM', 'Pas de chrono: l objectif est de comprendre, pas de deviner vite.', 'fa-solid fa-clipboard-check')}
  <div class="content-wrapper">
    <section class="content-block">
      <div class="mode-row">
        <button class="mode-btn active" type="button" data-mode="all">Tous</button>
        ${course.chapters.map((_, index) => `<button class="mode-btn" type="button" data-mode="${index + 1}">Ch.${index + 1}</button>`).join('')}
        <button class="mode-btn" type="button" data-mode="errors">Erreurs</button>
      </div>
      <div class="progress-shell"><div class="progress-fill" id="progressFill"></div></div>
      <div class="score-display" id="scoreDisplay">Score : 0 / 0</div>
    </section>
    <div id="qcmArea"></div>
  </div>`;
  return layout(course, 'qcm-100.html', body, {
    title: '100 QCM',
    description: `100 QCM ${course.title}`,
    extraScripts: '  <script src="qcm-100.js"></script>\n  <script src="assets/js/qcm-page.js"></script>\n'
  });
}

function styleCss(course) {
  return `:root {
  --bg: ${course.colors.bg};
  --bg-2: ${course.colors.bg2};
  --panel: rgba(16, 24, 39, 0.84);
  --panel-strong: rgba(10, 15, 26, 0.96);
  --text: #f8fafc;
  --muted: #b8c2d6;
  --border: rgba(255, 255, 255, 0.14);
  --accent: ${course.colors.accent};
  --accent-2: ${course.colors.accent2};
  --accent-3: ${course.colors.accent3};
  --ok: #34d399;
  --danger: #fb7185;
  --warn: #fbbf24;
}

* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  min-height: 100vh;
  color: var(--text);
  font-family: 'Inter', system-ui, sans-serif;
  line-height: 1.7;
  background:
    linear-gradient(120deg, color-mix(in srgb, var(--accent) 16%, transparent) 0 1px, transparent 1px 100%),
    linear-gradient(150deg, var(--bg), var(--bg-2));
  background-size: 34px 34px, auto;
  overflow-x: hidden;
}
body::before {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(90deg, transparent 0 74%, color-mix(in srgb, var(--accent-2) 12%, transparent) 74% 75%, transparent 75%),
    linear-gradient(0deg, transparent 0 82%, color-mix(in srgb, var(--accent-3) 10%, transparent) 82% 83%, transparent 83%);
  background-size: 160px 160px;
  opacity: .6;
  z-index: -1;
}
body.light-mode {
  --bg: #f6f8fb;
  --bg-2: #e9eef6;
  --panel: rgba(255, 255, 255, 0.86);
  --panel-strong: rgba(255, 255, 255, 0.98);
  --text: #0f172a;
  --muted: #475569;
  --border: rgba(15, 23, 42, 0.14);
}
a { color: inherit; }
.skip-link { position: absolute; left: -999px; top: 1rem; z-index: 80; background: var(--accent); color: #06111c; padding: .7rem 1rem; border-radius: 8px; font-weight: 900; }
.skip-link:focus { left: 1rem; }
.reading-progress { position: fixed; top: 0; left: 0; height: 4px; width: 0; background: linear-gradient(90deg, var(--accent), var(--accent-2)); z-index: 90; }
.course-nav { position: sticky; top: 0; z-index: 50; border-bottom: 1px solid var(--border); background: color-mix(in srgb, var(--bg) 82%, transparent); backdrop-filter: blur(18px); }
.nav-inner { width: min(1200px, calc(100% - 2rem)); min-height: 72px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
.nav-logo { display: inline-flex; align-items: center; gap: .7rem; font-weight: 900; text-decoration: none; letter-spacing: 0; }
.brand-badge, .module-icon, .feature-icon { width: 42px; height: 42px; display: inline-flex; align-items: center; justify-content: center; border-radius: 8px; background: linear-gradient(135deg, var(--accent), var(--accent-2)); color: #07111f; box-shadow: 0 10px 26px color-mix(in srgb, var(--accent) 28%, transparent); font-weight: 900; }
.nav-links { display: flex; align-items: center; justify-content: center; gap: .45rem; list-style: none; flex-wrap: wrap; }
.nav-links a { color: var(--muted); text-decoration: none; font-size: .82rem; font-weight: 800; padding: .48rem .62rem; border-radius: 8px; }
.nav-links a:hover, .nav-links a.active { color: var(--text); background: color-mix(in srgb, var(--accent) 16%, transparent); }
.nav-actions { display: flex; gap: .5rem; align-items: center; }
.nav-actions button, .hamburger-btn, .mobile-nav-close { min-width: 40px; min-height: 40px; border: 1px solid var(--border); border-radius: 8px; color: var(--text); background: var(--panel); cursor: pointer; }
.hamburger-btn { display: none; }
.primary-link { display: inline-flex; align-items: center; justify-content: center; gap: .45rem; border: 1px solid color-mix(in srgb, var(--accent) 36%, transparent); background: color-mix(in srgb, var(--accent) 14%, transparent); color: var(--text); border-radius: 8px; padding: .72rem .92rem; text-decoration: none; font-weight: 900; cursor: pointer; }
.primary-link.compact { padding: .6rem .78rem; }
.mobile-nav-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.55); opacity: 0; pointer-events: none; z-index: 55; }
.mobile-nav-overlay.open { opacity: 1; pointer-events: auto; }
.mobile-nav-panel { position: fixed; top: 0; right: 0; width: min(88vw, 380px); height: 100vh; transform: translateX(100%); z-index: 60; background: var(--panel-strong); border-left: 1px solid var(--border); padding: 1rem; display: flex; flex-direction: column; gap: .45rem; transition: transform .22s ease; overflow-y: auto; }
.mobile-nav-panel.open { transform: translateX(0); }
.mobile-nav-header { display: flex; align-items: center; justify-content: space-between; font-weight: 900; margin-bottom: .4rem; }
.mobile-nav-panel a { text-decoration: none; color: var(--text); padding: .72rem .8rem; border-radius: 8px; background: color-mix(in srgb, var(--accent) 10%, transparent); }
.hero-section { width: min(1120px, calc(100% - 2rem)); margin: 0 auto; padding: 4.8rem 0 2.2rem; }
.hero-badge { display: inline-flex; align-items: center; gap: .5rem; padding: .45rem .75rem; border-radius: 8px; border: 1px solid color-mix(in srgb, var(--accent) 38%, transparent); background: color-mix(in srgb, var(--accent) 12%, transparent); color: var(--accent-2); font-size: .78rem; text-transform: uppercase; letter-spacing: .08em; font-weight: 900; margin-bottom: 1.05rem; }
h1 { max-width: 850px; font-size: 4.2rem; line-height: 1; letter-spacing: 0; margin-bottom: 1rem; }
.hero-section p { max-width: 780px; color: var(--muted); font-size: 1.06rem; }
.content-wrapper { width: min(1120px, calc(100% - 2rem)); margin: 0 auto 4rem; }
.course-intro, .content-block, .chapter-section, .module-card, .flashcard { border: 1px solid var(--border); background: linear-gradient(180deg, color-mix(in srgb, var(--panel) 96%, transparent), color-mix(in srgb, var(--panel) 80%, transparent)); border-radius: 8px; box-shadow: 0 20px 60px rgba(0, 0, 0, .28); }
.course-intro { padding: 1.4rem; margin-bottom: 1rem; }
.course-intro h2, .chapter-section h2, .content-block h2 { font-size: 1.85rem; line-height: 1.12; letter-spacing: 0; margin-bottom: .8rem; }
.method-strip { display: flex; flex-wrap: wrap; gap: .55rem; margin-top: 1rem; }
.method-strip span { border: 1px solid color-mix(in srgb, var(--accent) 28%, transparent); background: color-mix(in srgb, var(--accent) 10%, transparent); border-radius: 8px; padding: .55rem .7rem; font-weight: 850; }
.modules-grid, .flash-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(245px, 1fr)); gap: 1rem; }
.module-card { position: relative; min-height: 230px; padding: 1.25rem; text-decoration: none; overflow: hidden; transition: transform .22s ease, border-color .22s ease; }
.module-card::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, color-mix(in srgb, var(--accent) 18%, transparent), transparent 42%); pointer-events: none; }
.module-card:hover { transform: translateY(-4px); border-color: color-mix(in srgb, var(--accent) 48%, transparent); }
.module-card > * { position: relative; }
.module-icon { margin-bottom: 1rem; }
.module-card h3 { font-size: 1.1rem; line-height: 1.25; margin-bottom: .55rem; }
.module-card p, .chapter-section p, .content-block p { color: var(--muted); }
.module-meta { display: flex; flex-wrap: wrap; gap: .55rem; margin-top: 1rem; color: var(--muted); font-size: .82rem; }
.module-lock { position: absolute; top: 1rem; right: 1rem; color: var(--accent-2); z-index: 1; }
.chapter-section, .content-block { padding: 1.45rem; margin-bottom: 1rem; }
.lead { color: var(--text) !important; font-weight: 750; }
.key-list { display: grid; gap: .58rem; margin: .9rem 0; }
.key-list li { list-style: none; padding: .75rem .85rem; border-radius: 8px; border: 1px solid color-mix(in srgb, var(--accent) 23%, transparent); background: color-mix(in srgb, var(--accent) 8%, transparent); }
.memo-box, .tip-box, .warning-box { margin: 1rem 0; padding: .9rem; border-radius: 8px; border: 1px solid color-mix(in srgb, var(--accent-2) 34%, transparent); background: color-mix(in srgb, var(--accent-2) 10%, transparent); }
.warning-box { border-color: color-mix(in srgb, var(--danger) 42%, transparent); background: color-mix(in srgb, var(--danger) 10%, transparent); }
.data-table { width: 100%; border-collapse: collapse; margin: 1rem 0; }
.data-table th, .data-table td { border: 1px solid var(--border); padding: .75rem; text-align: left; vertical-align: top; }
.data-table th { background: color-mix(in srgb, var(--accent) 18%, transparent); }
pre { overflow-x: auto; padding: 1rem; border-radius: 8px; border: 1px solid var(--border); background: rgba(2, 6, 23, .78); margin: 1rem 0; color: #e6f6ff; }
code, textarea { font-family: 'JetBrains Mono', Consolas, monospace; }
textarea { width: 100%; min-height: 180px; resize: vertical; margin: .8rem 0; padding: .9rem; border-radius: 8px; border: 1px solid var(--border); background: rgba(2, 6, 23, .72); color: #e8f8ff; line-height: 1.55; }
body.light-mode textarea { background: #f8fafc; color: #0f172a; }
.quiz-card, .exercise-card, .code-lab { border: 1px solid var(--border); border-radius: 8px; background: color-mix(in srgb, var(--panel) 82%, transparent); padding: 1rem; margin: .9rem 0; }
.quiz-question { font-weight: 900; margin-bottom: .7rem; }
.quiz-options { display: grid; gap: .5rem; }
.quiz-option, .mode-btn { border: 1px solid var(--border); border-radius: 8px; background: color-mix(in srgb, var(--panel) 90%, transparent); color: var(--text); padding: .72rem .85rem; text-align: left; cursor: pointer; font-weight: 750; }
.quiz-option.correct { border-color: color-mix(in srgb, var(--ok) 70%, transparent); background: color-mix(in srgb, var(--ok) 18%, transparent); }
.quiz-option.incorrect { border-color: color-mix(in srgb, var(--danger) 70%, transparent); background: color-mix(in srgb, var(--danger) 18%, transparent); }
.quiz-option.disabled { opacity: .82; cursor: default; }
.quiz-status, .exercise-feedback { min-height: 1.4rem; margin-top: .6rem; color: var(--warn); font-weight: 800; }
.quiz-explain, .exercise-solution { display: none; margin-top: .8rem; padding: .8rem; border-left: 4px solid var(--accent-2); border-radius: 8px; background: color-mix(in srgb, var(--accent-2) 9%, transparent); color: var(--muted); }
.quiz-explain.show, .exercise-solution.show { display: block; }
.chapter-nav { display: flex; justify-content: space-between; gap: 1rem; flex-wrap: wrap; margin: 1.5rem 0; }
.flashcard { min-height: 180px; padding: 1rem; color: var(--text); cursor: pointer; text-align: left; position: relative; border: 1px solid var(--border); }
.flash-front, .flash-back { display: block; }
.flash-front { font-weight: 900; font-size: 1.04rem; }
.flash-back { display: none; margin-top: .75rem; color: var(--muted); }
.flashcard.is-flipped { border-color: color-mix(in srgb, var(--accent) 50%, transparent); }
.flashcard.is-flipped .flash-back { display: block; }
.mode-row { display: flex; flex-wrap: wrap; gap: .55rem; justify-content: center; margin: .8rem 0 1rem; }
.mode-btn.active { border-color: color-mix(in srgb, var(--accent) 60%, transparent); background: color-mix(in srgb, var(--accent) 16%, transparent); }
.progress-shell { height: 8px; background: color-mix(in srgb, var(--accent) 12%, transparent); border-radius: 8px; overflow: hidden; }
.progress-fill { height: 100%; width: 0; background: linear-gradient(90deg, var(--accent), var(--accent-2)); transition: width .2s ease; }
.score-display { text-align: center; font-weight: 900; margin-top: .75rem; }
.reveal-on-scroll { opacity: 0; transform: translateY(16px); transition: opacity .45s ease, transform .45s ease; }
.reveal-on-scroll.is-visible { opacity: 1; transform: translateY(0); }
.footer { border-top: 1px solid var(--border); color: var(--muted); text-align: center; padding: 2rem 1rem; }
@media (max-width: 980px) {
  .nav-links { display: none; }
  .hamburger-btn { display: inline-flex; align-items: center; justify-content: center; }
}
@media (max-width: 720px) {
  .hero-section { padding-top: 3.4rem; }
  h1 { font-size: 2.6rem; }
  .chapter-section, .content-block, .course-intro { padding: 1rem; }
  .modules-grid, .flash-grid { grid-template-columns: 1fr; }
}
@media (prefers-reduced-motion: reduce) {
  * { transition: none !important; scroll-behavior: auto !important; }
}`;
}

function mainJs() {
  return `document.addEventListener('DOMContentLoaded', () => {
  const progress = document.getElementById('reading-progress');
  const hamburger = document.getElementById('hamburger-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const overlay = document.getElementById('mobile-nav-overlay');
  const closeBtn = document.getElementById('mobile-nav-close');
  const themeToggle = document.getElementById('theme-toggle');

  function setMobile(open) {
    if (!mobileNav || !overlay) return;
    mobileNav.classList.toggle('open', open);
    overlay.classList.toggle('open', open);
    document.body.classList.toggle('nav-open', open);
  }

  if (hamburger) hamburger.addEventListener('click', () => setMobile(true));
  if (closeBtn) closeBtn.addEventListener('click', () => setMobile(false));
  if (overlay) overlay.addEventListener('click', () => setMobile(false));

  if (themeToggle) {
    const key = document.body.dataset.courseThemeKey || 'course-theme';
    if (localStorage.getItem(key) === 'light') document.body.classList.add('light-mode');
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      localStorage.setItem(key, document.body.classList.contains('light-mode') ? 'light' : 'dark');
    });
  }

  function updateProgress() {
    if (!progress) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    progress.style.width = Math.min(100, Math.max(0, pct)) + '%';
  }
  updateProgress();
  window.addEventListener('scroll', updateProgress, { passive: true });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible');
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal-on-scroll').forEach((el) => observer.observe(el));

  document.addEventListener('click', (event) => {
    const flash = event.target.closest('.flashcard');
    if (flash) {
      flash.classList.toggle('is-flipped');
      return;
    }

    const option = event.target.closest('.quiz-option');
    if (option) handleQuiz(option);

    const check = event.target.closest('.check-exercise');
    if (check) handleExercise(check);
  });

  function handleQuiz(option) {
    const card = option.closest('.quiz-card');
    if (!card || card.dataset.locked === 'true') return;
    const answer = Number(card.dataset.answer);
    const picked = Number(option.dataset.index);
    const status = card.querySelector('.quiz-status');
    let attempts = Number(card.dataset.attempts || '0') + 1;
    card.dataset.attempts = String(attempts);

    option.classList.add(picked === answer ? 'correct' : 'incorrect');
    if (picked === answer || attempts >= 2) {
      card.dataset.locked = 'true';
      card.querySelectorAll('.quiz-option').forEach((btn) => {
        const idx = Number(btn.dataset.index);
        btn.classList.add('disabled');
        if (idx === answer) btn.classList.add('correct');
      });
      const explain = card.querySelector('.quiz-explain');
      if (explain) explain.classList.add('show');
      if (status) status.textContent = picked === answer ? 'Reussi: correction debloquee.' : 'Deux essais faits: correction debloquee.';
    } else if (status) {
      status.textContent = 'Pas encore. Reessaie une fois avant de debloquer la correction.';
    }
  }

  function normalize(text) {
    return (text || '').toLowerCase().normalize('NFD').replace(/[\\u0300-\\u036f]/g, '');
  }

  function handleExercise(button) {
    const card = button.closest('.exercise-card, .code-lab');
    if (!card) return;
    const textarea = card.querySelector('textarea');
    const feedback = card.querySelector('.exercise-feedback');
    const solution = card.querySelector('.exercise-solution');
    const terms = (card.dataset.terms || '').split('|').map(normalize).filter(Boolean);
    const value = normalize(textarea ? textarea.value : '');
    const ok = terms.every((term) => value.includes(term));
    let attempts = Number(card.dataset.attempts || '0') + 1;
    card.dataset.attempts = String(attempts);

    if (ok || attempts >= 2) {
      if (solution) solution.classList.add('show');
      if (feedback) feedback.textContent = ok ? 'Reussi: correction debloquee.' : 'Deux essais faits: correction debloquee. Compare avec la solution.';
    } else if (feedback) {
      feedback.textContent = 'Il manque encore un element attendu. Reessaie: cherche les mots-cles du chapitre.';
    }
  }
});`;
}

function qcmPageJs() {
  return `const bank = window.COURSE_QCM || [];
const area = document.getElementById('qcmArea');
const scoreDisplay = document.getElementById('scoreDisplay');
const fill = document.getElementById('progressFill');
const storageKey = (document.body.dataset.courseThemeKey || 'course') + '-qcm-errors';
let current = [];
let score = 0;
let answered = 0;

function getErrors() {
  return JSON.parse(localStorage.getItem(storageKey) || '[]');
}

function setErrors(ids) {
  localStorage.setItem(storageKey, JSON.stringify([...new Set(ids)]));
}

function updateScore() {
  scoreDisplay.textContent = 'Score : ' + score + ' / ' + current.length;
  fill.style.width = (current.length ? (answered / current.length) * 100 : 0) + '%';
}

function render(list) {
  current = list;
  score = 0;
  answered = 0;
  updateScore();
  area.innerHTML = '';
  if (!current.length) {
    area.innerHTML = '<section class="content-block">Aucune question pour ce filtre.</section>';
    return;
  }
  current.forEach((q, index) => {
    const card = document.createElement('section');
    card.className = 'quiz-card reveal-on-scroll is-visible';
    card.dataset.answer = q.a;
    card.dataset.qid = q.id;
    card.innerHTML = '<div class="quiz-question">' + (index + 1) + '. ' + q.q + '</div>' +
      '<div class="quiz-options">' + q.o.map((opt, i) => '<button class="quiz-option" data-index="' + i + '">' + opt + '</button>').join('') + '</div>' +
      '<div class="quiz-status"></div>' +
      '<div class="quiz-explain"><strong>Correction :</strong> ' + q.e + '</div>';
    area.appendChild(card);
  });
}

function applyMode(mode) {
  if (mode === 'all') render(bank);
  else if (mode === 'errors') {
    const ids = getErrors();
    render(bank.filter((q) => ids.includes(q.id)));
  } else {
    const ch = Number(mode);
    render(bank.filter((q) => q.ch === ch));
  }
}

document.querySelectorAll('.mode-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.mode-btn').forEach((item) => item.classList.remove('active'));
    btn.classList.add('active');
    applyMode(btn.dataset.mode);
  });
});

area.addEventListener('click', (event) => {
  const option = event.target.closest('.quiz-option');
  if (!option) return;
  const card = option.closest('.quiz-card');
  if (!card || card.dataset.locked === 'true') return;
  const answer = Number(card.dataset.answer);
  const picked = Number(option.dataset.index);
  const qid = Number(card.dataset.qid);
  let attempts = Number(card.dataset.attempts || '0') + 1;
  card.dataset.attempts = String(attempts);
  option.classList.add(picked === answer ? 'correct' : 'incorrect');
  const status = card.querySelector('.quiz-status');
  if (picked === answer || attempts >= 2) {
    card.dataset.locked = 'true';
    card.querySelectorAll('.quiz-option').forEach((btn) => {
      const idx = Number(btn.dataset.index);
      btn.classList.add('disabled');
      if (idx === answer) btn.classList.add('correct');
    });
    card.querySelector('.quiz-explain').classList.add('show');
    answered += 1;
    const errors = getErrors();
    if (picked === answer) {
      score += 1;
      setErrors(errors.filter((id) => id !== qid));
      if (status) status.textContent = 'Reussi: correction debloquee.';
    } else {
      setErrors(errors.concat(qid));
      if (status) status.textContent = 'Deux essais faits: correction debloquee.';
    }
    updateScore();
  } else if (status) {
    status.textContent = 'Pas encore. Reessaie une fois avant de debloquer la correction.';
  }
});

render(bank);`;
}

const courses = [
  {
    slug: 'react',
    title: 'React',
    shortTitle: 'React',
    badge: 'RX',
    icon: 'fa-brands fa-react',
    accentName: 'react',
    description: 'Cours React B2: JSX, composants, props, state, formulaires, listes, useEffect, appels API, routing et projet Todo.',
    colors: { bg: '#08111f', bg2: '#101826', accent: '#61dafb', accent2: '#a3e635', accent3: '#f472b6' },
    chapters: [
      {
        title: 'Penser en composants',
        subtitle: 'Comprendre React sans se noyer dans la syntaxe.',
        duration: '35 min',
        icon: 'fa-brands fa-react',
        sections: [
          { title: 'React en une phrase', icon: 'fa-solid fa-seedling', lead: 'React est une bibliotheque JavaScript pour construire des interfaces interactives avec des composants reutilisables.', paragraphs: ['Un composant est une fonction qui retourne une portion d interface. Au lieu de modifier le DOM a la main, tu decris ce que l interface doit afficher selon les donnees du moment.', 'Le mot important est declaratif: tu dis le resultat attendu, React s occupe de synchroniser l affichage.'], memo: 'React = UI en composants. Une fonction + des donnees = un morceau d interface.' },
          { title: 'Le modele mental', icon: 'fa-solid fa-brain', paragraphs: ['Imagine une page comme un assemblage de briques. Une carte produit, une barre de navigation, un bouton et une liste peuvent etre des composants.', 'Chaque brique peut recevoir des props, garder un state local, et se reafficher quand ce state change.'], bullets: ['Composant: brique reutilisable.', 'Props: donnees recues du parent.', 'State: donnees internes qui changent.', 'Rendu: resultat visuel produit par le composant.'], warning: 'Ne pense pas React comme jQuery. On ne cherche pas d abord un element a modifier; on change les donnees, puis React met a jour l interface.' },
          { title: 'Prerequis et environnement', icon: 'fa-solid fa-screwdriver-wrench', paragraphs: ['Le support demande HTML, CSS, JavaScript moderne, terminal, Node.js 18 ou plus, npm et un editeur comme VS Code.', 'Vite sert a creer vite un projet React propre. Il donne un serveur de developpement rapide et une structure claire.'], code: 'npm create vite@latest mon-app\ncd mon-app\nnpm install\nnpm run dev', tip: 'Si tu oublies tout: create, enter, install, dev. C est le chemin minimal pour demarrer.' }
        ]
      },
      {
        title: 'Vite et JSX',
        subtitle: 'Lire la structure du projet et ecrire du JSX propre.',
        duration: '40 min',
        icon: 'fa-solid fa-bolt',
        sections: [
          { title: 'Structure Vite', icon: 'fa-solid fa-folder-tree', paragraphs: ['index.html contient la balise root. src/main.jsx monte React dans ce root. App.jsx est le premier composant visible.', 'Au debut, ne modifie main.jsx que si tu sais pourquoi. Travaille surtout dans App.jsx et dans de nouveaux composants.'], table: { headers: ['Fichier', 'Role'], rows: [['index.html', 'Point d entree HTML avec div id root'], ['src/main.jsx', 'Demarre React avec createRoot'], ['src/App.jsx', 'Composant principal'], ['src/App.css', 'Styles du composant principal']] }, memo: 'index.html accueille, main.jsx branche, App.jsx affiche.' },
          { title: 'JSX', icon: 'fa-solid fa-code', paragraphs: ['JSX ressemble a HTML mais reste du JavaScript. Les accolades permettent d inserer une expression.', 'La regle de base: retourner un seul element parent, ou utiliser un fragment vide.'], code: 'function Bonjour() {\n  const nom = "Awa";\n  return <h1>Bonjour, {nom}</h1>;\n}', bullets: ['className remplace class.', 'Les balises sans enfant se ferment: <img />.', 'Le style inline est un objet: style={{ color: "red" }}.'], warning: 'Dans JSX, tu ecris className. Si tu mets class, tu melanges HTML brut et JSX.' },
          { title: 'Fragment', icon: 'fa-solid fa-layer-group', paragraphs: ['Un composant ne peut pas retourner deux balises voisines sans parent. Le fragment regroupe sans ajouter de div inutile.', 'C est pratique pour eviter une structure HTML lourde.'], code: 'return (\n  <>\n    <h1>Titre</h1>\n    <p>Texte</p>\n  </>\n);', memo: 'Fragment = boite invisible.' }
        ]
      },
      {
        title: 'Composants et props',
        subtitle: 'Passer des donnees sans casser la reutilisabilite.',
        duration: '45 min',
        icon: 'fa-solid fa-cubes',
        sections: [
          { title: 'Composant fonctionnel', icon: 'fa-solid fa-cube', paragraphs: ['Un composant React commence par une majuscule. Techniquement, c est une fonction JavaScript qui retourne du JSX.', 'Tu peux l appeler plusieurs fois avec des donnees differentes.'], code: 'function Carte({ titre, description }) {\n  return (\n    <article className="carte">\n      <h2>{titre}</h2>\n      <p>{description}</p>\n    </article>\n  );\n}', tip: 'Majuscule = React comprend que c est un composant, pas une balise HTML.' },
          { title: 'Props', icon: 'fa-solid fa-right-left', paragraphs: ['Les props sont des parametres envoyes par le parent. Elles sont immutables: l enfant les lit, il ne les modifie pas.', 'La destructuration rend le code plus lisible quand tu sais quelles props tu attends.'], code: '<Carte titre="React" description="Bibliotheque UI" />\n<Carte titre="Vite" description="Build rapide" />', memo: 'Props = colis envoye du parent vers l enfant.' },
          { title: 'children', icon: 'fa-solid fa-box-open', paragraphs: ['props.children represente le contenu place entre les balises d un composant.', 'C est utile pour creer un composant Conteneur, Alerte ou Layout.'], code: 'function Conteneur({ children }) {\n  return <div className="conteneur">{children}</div>;\n}\n\n<Conteneur><p>Texte interne</p></Conteneur>', warning: 'Ne mets pas tout dans un seul composant App. Des composants courts donnent un code plus lisible et plus testable.' }
        ]
      },
      {
        title: 'State, evenements et formulaires',
        subtitle: 'Faire reagir l interface sans modifier le DOM a la main.',
        duration: '55 min',
        icon: 'fa-solid fa-sliders',
        sections: [
          { title: 'useState', icon: 'fa-solid fa-toggle-on', paragraphs: ['Le state permet de memoriser une valeur qui evolue: compteur, texte, filtre, panier.', 'useState retourne un tableau: la valeur actuelle et la fonction qui la modifie.'], code: 'const [compte, setCompte] = useState(0);\nsetCompte(compte + 1);', memo: 'Valeur + setter. Tu lis la valeur, tu modifies avec le setter.' },
          { title: 'Mise a jour fonctionnelle', icon: 'fa-solid fa-arrows-rotate', paragraphs: ['Quand la nouvelle valeur depend de l ancienne, utilise la forme fonctionnelle. Elle evite les surprises si plusieurs mises a jour arrivent vite.', 'C est particulierement utile pour les compteurs, les tableaux et les toggles.'], code: 'setCompte((prev) => prev + 1);\nsetOn((prev) => !prev);', warning: 'Ne fais jamais compte = compte + 1. Modifier directement une variable state ne declenche pas le rendu.' },
          { title: 'Formulaire controle', icon: 'fa-solid fa-keyboard', paragraphs: ['Un input controle a sa value liee au state et son onChange met a jour ce state.', 'Le composant devient la source de verite: ce qui est affiche dans le champ vient de React.'], code: 'const [email, setEmail] = useState("");\n<input value={email} onChange={(e) => setEmail(e.target.value)} />', tip: 'Formulaire controle = value + onChange. Si un manque, le comportement devient flou.' }
        ],
        lab: { intro: 'Complete un compteur simple. Le correcteur cherche les elements essentiels.', prompt: 'Ecris un composant Compteur avec useState, un bouton +1 et un bouton reset.', terms: ['useState', 'setCompte', 'button', 'onClick'], starter: 'function Compteur() {\n  // complete ici\n}', solution: 'import { useState } from "react";\n\nfunction Compteur() {\n  const [compte, setCompte] = useState(0);\n  return (\n    <div>\n      <p>Compteur : {compte}</p>\n      <button onClick={() => setCompte((prev) => prev + 1)}>+1</button>\n      <button onClick={() => setCompte(0)}>Reset</button>\n    </div>\n  );\n}', explain: 'La valeur compte est affichee. Les boutons utilisent le setter, donc React sait qu il doit re-rendre le composant.' }
      },
      {
        title: 'Listes et donnees',
        subtitle: 'Afficher des tableaux avec map, key et filtrage.',
        duration: '45 min',
        icon: 'fa-solid fa-list',
        sections: [
          { title: 'map', icon: 'fa-solid fa-repeat', paragraphs: ['map transforme un tableau en un autre tableau. En React, on l utilise pour transformer des donnees en elements JSX.', 'Chaque element genere doit avoir une key stable.'], code: '{produits.map((produit) => (\n  <li key={produit.id}>{produit.nom}</li>\n))}', warning: 'Evite key={index} si la liste peut changer. Une suppression ou un tri peut produire des bugs visuels.' },
          { title: 'Ajouter et supprimer', icon: 'fa-solid fa-plus-minus', paragraphs: ['Avec un tableau dans le state, on cree un nouveau tableau au lieu de modifier l ancien.', 'spread ajoute proprement. filter retire proprement.'], code: 'setAnimaux((prev) => [...prev, nouvelAnimal]);\nsetAnimaux((prev) => prev.filter((a) => a.id !== id));', memo: 'Ajouter = [...prev, item]. Supprimer = filter.' },
          { title: 'Deriver plutot que dupliquer', icon: 'fa-solid fa-filter', paragraphs: ['Si une liste filtree peut etre calculee a partir du state existant, ne la stocke pas dans un deuxieme state.', 'Moins de state signifie moins de bugs de synchronisation.'], code: 'const visibles = animaux.filter((animal) => animal.nom.includes(recherche));', tip: 'State minimal: garde la source, calcule le reste.' }
        ]
      },
      {
        title: 'useEffect et appels API',
        subtitle: 'Charger des donnees apres le rendu.',
        duration: '50 min',
        icon: 'fa-solid fa-cloud-arrow-down',
        sections: [
          { title: 'Effet de bord', icon: 'fa-solid fa-wave-square', paragraphs: ['useEffect execute du code apres le rendu: appel API, abonnement, timer, titre du document.', 'Le tableau de dependances controle quand l effet se relance.'], table: { headers: ['Dependances', 'Effet'], rows: [['[]', 'Une fois au montage'], ['[id]', 'A chaque changement de id'], ['Aucun tableau', 'Apres chaque rendu, risque de boucle']] }, memo: 'useEffect = apres rendu + dependances.' },
          { title: 'Fetch', icon: 'fa-solid fa-server', paragraphs: ['Un appel API a au moins trois etats utiles: chargement, donnees, erreur.', 'Le support recommande de gerer explicitement loading et error pour eviter une page vide.'], code: 'useEffect(() => {\n  fetch("https://jsonplaceholder.typicode.com/users")\n    .then((res) => res.json())\n    .then(setUsers)\n    .catch(setError);\n}, []);', warning: 'Ne mets pas setState dans un effet qui depend de ce meme state sans condition. C est la boucle infinie classique.' },
          { title: 'AbortController', icon: 'fa-solid fa-scissors', paragraphs: ['Si un composant disparait avant la fin d une requete, on peut annuler la requete.', 'C est une bonne pratique pour les pages qui changent vite ou les recherches dynamiques.'], code: 'const controller = new AbortController();\nfetch(url, { signal: controller.signal });\nreturn () => controller.abort();', tip: 'Nettoyage = return dans useEffect.' }
        ]
      },
      {
        title: 'Routing',
        subtitle: 'Construire une mini application multi-pages.',
        duration: '45 min',
        icon: 'fa-solid fa-route',
        sections: [
          { title: 'React Router DOM', icon: 'fa-solid fa-map-signs', paragraphs: ['React ne gere pas les routes tout seul. On ajoute react-router-dom pour faire une SPA avec plusieurs vues.', 'Link navigue sans rechargement complet. Routes associe un chemin a un composant.'], code: 'npm i react-router-dom', memo: 'BrowserRouter autour, Link pour naviguer, Routes/Route pour declarer.' },
          { title: 'Route dynamique', icon: 'fa-solid fa-link', paragraphs: ['Une route comme /utilisateur/:id capture un parametre.', 'useParams permet de lire cet id et de charger la bonne ressource.'], code: 'const { id } = useParams();\nfetch(`https://jsonplaceholder.typicode.com/users/${id}`);', warning: 'Si la route peut etre inconnue, ajoute une route * pour afficher une page 404 propre.' },
          { title: 'Deploiement', icon: 'fa-solid fa-rocket', paragraphs: ['npm run build cree le dossier dist. Sur Netlify, Vercel ou GitHub Pages, il faut parfois une regle de redirection pour les routes cote client.', 'Le test local du build evite les surprises apres publication.'], code: 'npm run build\nnpx serve -s dist', tip: 'Dev OK ne veut pas dire build OK. Toujours tester le build.' }
        ]
      },
      {
        title: 'Projet Todo List',
        subtitle: 'Assembler props, state, listes, filtres et localStorage.',
        duration: '60 min',
        icon: 'fa-solid fa-list-check',
        sections: [
          { title: 'Fonctionnalites attendues', icon: 'fa-solid fa-clipboard-list', paragraphs: ['Le projet Todo List reprend l ensemble du cours: ajout, suppression, completion, filtrage, compteur et persistance locale.', 'L objectif n est pas de faire joli d abord; l objectif est de structurer les donnees et les interactions.'], bullets: ['Une tache a id, texte, completed.', 'Le filtre change l affichage sans supprimer les donnees.', 'localStorage sauvegarde et restaure les taches.', 'Le compteur derive des taches actives.'] },
          { title: 'Persistance locale', icon: 'fa-solid fa-database', paragraphs: ['Au montage, on lit localStorage. A chaque modification des taches, on sauvegarde.', 'JSON.stringify transforme le tableau en texte. JSON.parse relit le texte.'], code: 'useEffect(() => {\n  localStorage.setItem("tasks", JSON.stringify(tasks));\n}, [tasks]);', memo: 'localStorage ne stocke que du texte: stringify pour entrer, parse pour sortir.' },
          { title: 'Plan de code', icon: 'fa-solid fa-diagram-project', paragraphs: ['Decoupe possible: TodoForm pour ajouter, TodoItem pour afficher une tache, TodoFilters pour changer le filtre, App pour coordonner.', 'Cette decoupe rend le projet lisible et proche d un vrai code professionnel.'], warning: 'Ne mets pas la logique de filtrage dans chaque TodoItem. Le parent decide la liste visible.' }
        ]
      }
    ],
    exercises: [
      { title: 'Carte de presentation', icon: 'fa-solid fa-id-card', prompt: 'Cree un composant CartePresentation qui affiche ton nom, ton role et trois technologies.', terms: ['function', 'CartePresentation', 'h1', 'ul'], solution: 'function CartePresentation() {\n  return (\n    <div className="carte">\n      <h1>Clarisse</h1>\n      <p>Developpeuse React en devenir</p>\n      <ul><li>HTML</li><li>CSS</li><li>React</li></ul>\n    </div>\n  );\n}', explain: 'Le composant est une fonction et retourne un seul bloc JSX.' },
      { title: 'Produit avec props', icon: 'fa-solid fa-box', prompt: 'Cree un composant Produit avec nom, prix, disponible et categorie optionnelle.', terms: ['Produit', 'nom', 'prix', 'disponible'], solution: 'function Produit({ nom, prix, disponible, categorie }) {\n  return <article><h2>{nom}</h2><p>{prix} EUR</p><p>{disponible ? "En stock" : "Rupture"}</p>{categorie && <small>{categorie}</small>}</article>;\n}', explain: 'Les props rendent le composant reutilisable sans dupliquer le code.' },
      { title: 'Compteur', icon: 'fa-solid fa-plus', prompt: 'Implemente un compteur avec +, -, reset et pas dynamique.', terms: ['useState', 'setCompte', 'setPas', 'input'], solution: 'const [compte, setCompte] = useState(0);\nconst [pas, setPas] = useState(1);\n<button onClick={() => setCompte(c => c + pas)}>+{pas}</button>\n<input type="number" value={pas} onChange={e => setPas(+e.target.value)} />', explain: 'Le pas est lui aussi un state, car il change avec l input.' },
      { title: 'Apercu texte', icon: 'fa-solid fa-keyboard', prompt: 'Cree un formulaire controle qui affiche la previsualisation en temps reel.', terms: ['useState', 'value', 'onChange', 'textarea'], solution: 'const [texte, setTexte] = useState("");\n<input value={texte} onChange={e => setTexte(e.target.value)} />\n<textarea value={texte} onChange={e => setTexte(e.target.value)} />\n<p>{texte}</p>', explain: 'value + onChange rendent le champ controle par React.' },
      { title: 'Liste animaux', icon: 'fa-solid fa-list', prompt: 'Affiche une liste depuis un tableau et ajoute/supprime sans utiliser index comme key.', terms: ['map', 'key', 'filter', 'setAnimaux'], solution: '{animaux.map(a => <li key={a.id}>{a.nom}<button onClick={() => setAnimaux(prev => prev.filter(x => x.id !== a.id))}>Supprimer</button></li>)}', explain: 'La key stable permet a React de suivre chaque item.' },
      { title: 'Liste utilisateurs API', icon: 'fa-solid fa-cloud-arrow-down', prompt: 'Charge les utilisateurs jsonplaceholder avec loading et error.', terms: ['useEffect', 'fetch', 'loading', 'error'], solution: 'useEffect(() => {\n  setLoading(true);\n  fetch(url).then(r => r.json()).then(setUsers).catch(setError).finally(() => setLoading(false));\n}, []);', explain: 'Un appel API propre gere chargement, succes et erreur.' },
      { title: 'Routing simple', icon: 'fa-solid fa-route', prompt: 'Cree Accueil, Services, Contact et une route 404.', terms: ['Routes', 'Route', 'Link', '*'], solution: '<Routes>\n  <Route path="/" element={<Accueil />} />\n  <Route path="/services" element={<Services />} />\n  <Route path="/contact" element={<Contact />} />\n  <Route path="*" element={<NotFound />} />\n</Routes>', explain: 'La route * capture les chemins inconnus.' },
      { title: 'Profil dynamique', icon: 'fa-solid fa-user', prompt: 'Utilise useParams pour charger /utilisateur/:id.', terms: ['useParams', 'id', 'fetch', 'utilisateur'], solution: 'const { id } = useParams();\nuseEffect(() => { fetch(`/users/${id}`).then(r => r.json()).then(setUser); }, [id]);', explain: 'id est une dependance: si l URL change, l effet doit relancer la requete.' },
      { title: 'Build production', icon: 'fa-solid fa-rocket', prompt: 'Explique les commandes pour generer et tester dist.', terms: ['npm run build', 'dist', 'serve'], solution: 'npm run build\nnpx serve -s dist', explain: 'Le build verifie que l application peut etre livree hors serveur de developpement.' },
      { title: 'Todo List', icon: 'fa-solid fa-list-check', prompt: 'Decris la structure state du projet Todo.', terms: ['id', 'text', 'completed', 'localStorage'], solution: 'const task = { id: Date.now(), text: "Reviser React", completed: false };\nlocalStorage.setItem("tasks", JSON.stringify(tasks));', explain: 'Un bon modele de donnees rend le reste du projet simple.' }
    ],
    flashcards: [
      ['React', 'Bibliotheque JavaScript pour construire des interfaces avec composants.'],
      ['Composant', 'Fonction qui retourne du JSX.'],
      ['JSX', 'Syntaxe JavaScript qui ressemble a HTML.'],
      ['Props', 'Donnees recues du parent, immutables dans l enfant.'],
      ['State', 'Donnees internes qui declenchent un re-rendu quand elles changent.'],
      ['useState', 'Hook qui donne [valeur, setter].'],
      ['Formulaire controle', 'Champ avec value liee au state et onChange.'],
      ['map + key', 'Afficher une liste avec une cle stable pour chaque item.'],
      ['useEffect', 'Executer du code apres le rendu selon des dependances.'],
      ['React Router', 'Bibliotheque pour les routes dans une SPA.'],
      ['useParams', 'Hook pour lire les parametres dynamiques de l URL.'],
      ['localStorage', 'Stockage local texte: JSON.stringify et JSON.parse.']
    ].map(([front, back]) => ({ front, back })),
    memoSections: [
      { title: 'Formules mentales', icon: 'fa-solid fa-brain', items: ['Composant = fonction + JSX.', 'Props = donnees qui descendent.', 'State = donnees qui changent.', 'Rendu = React reconstruit l interface depuis les donnees.'] },
      { title: 'Syntaxes a retenir', icon: 'fa-solid fa-code', items: ['useState: const [x, setX] = useState(valeurInitiale).', 'Liste: items.map(item => <li key={item.id}>...</li>).', 'Effet: useEffect(() => { ... }, [dependances]).', 'Route 404: <Route path="*" element={<NotFound />} />.'] },
      { title: 'Pieges classiques', icon: 'fa-solid fa-triangle-exclamation', items: ['Ne pas modifier le state directement.', 'Ne pas utiliser index comme key si la liste change.', 'Ne pas oublier value/onChange dans un formulaire controle.', 'Ne pas creer une boucle infinie avec useEffect.'] }
    ],
    qTopics: [
      ['React', 'React sert a construire des interfaces interactives a partir de composants.', ['React remplace HTML et CSS', 'React est un serveur SQL', 'React est seulement un outil de dessin'], 1],
      ['JSX', 'JSX permet d ecrire une interface ressemblant a HTML dans du JavaScript.', ['JSX est un format image', 'JSX remplace npm', 'JSX est uniquement du CSS'], 2],
      ['Vite', 'Vite cree et sert rapidement un projet React moderne.', ['Vite est une base de donnees', 'Vite remplace le navigateur', 'Vite est un protocole HTTP'], 2],
      ['Composants', 'Un composant React est une fonction qui retourne du JSX.', ['Un composant est toujours une classe CSS', 'Un composant est un fichier PDF', 'Un composant ne peut pas etre reutilise'], 3],
      ['Props', 'Les props sont des donnees passees du parent vers l enfant.', ['Les props sont modifiees directement par l enfant', 'Les props sont des erreurs serveur', 'Les props remplacent useEffect'], 3],
      ['State', 'Le state contient des donnees internes qui peuvent changer.', ['Le state est toujours global', 'Le state ne declenche jamais de rendu', 'Le state est du HTML statique'], 4],
      ['useState', 'useState retourne une valeur et une fonction de mise a jour.', ['useState retourne seulement un objet DOM', 'useState se lance dans CSS', 'useState sert aux routes uniquement'], 4],
      ['Formulaire controle', 'Un champ controle lie value au state et met a jour avec onChange.', ['Il n utilise jamais onChange', 'Il modifie le DOM manuellement', 'Il interdit les inputs'], 4],
      ['map et key', 'map transforme des donnees en elements JSX avec une key stable.', ['key doit etre aleatoire', 'map supprime toujours le tableau', 'key est inutile dans une liste'], 5],
      ['useEffect', 'useEffect sert aux effets apres rendu comme appels API.', ['useEffect remplace tous les composants', 'useEffect est obligatoire pour chaque variable', 'useEffect sert uniquement a styliser'], 6],
      ['Dependances useEffect', 'Le tableau de dependances controle quand l effet se relance.', ['Il controle les couleurs', 'Il contient les routes CSS', 'Il ne sert jamais'], 6],
      ['Fetch API', 'fetch permet d appeler une API et de lire une reponse JSON.', ['fetch cree un composant', 'fetch compile React', 'fetch remplace localStorage'], 6],
      ['React Router', 'React Router permet de gerer plusieurs vues dans une SPA.', ['Il remplace les props', 'Il est un moteur SQL', 'Il ne gere que les images'], 7],
      ['Link', 'Link navigue sans recharger completement la page.', ['Link force toujours un reload', 'Link sert a importer CSS', 'Link remplace useState'], 7],
      ['useParams', 'useParams lit les parametres dynamiques de la route.', ['useParams lit localStorage', 'useParams cree une base', 'useParams style un bouton'], 7],
      ['Build', 'npm run build genere une version production dans dist.', ['npm run build lance toujours Postman', 'dist est le dossier source', 'build supprime React'], 7],
      ['Todo List', 'Une tache peut avoir id, text et completed.', ['Une tache n a jamais d id', 'completed est une route', 'text doit etre un tableau'], 8],
      ['localStorage', 'localStorage stocke du texte localement dans le navigateur.', ['localStorage stocke des fonctions React', 'localStorage est cote serveur', 'localStorage accepte seulement des images'], 8],
      ['Correction state', 'On utilise le setter pour modifier le state.', ['On modifie directement la variable', 'On modifie document.body', 'On change le CSS uniquement'], 4],
      ['Rappel API', 'Loading, error et data rendent un appel API lisible pour l utilisateur.', ['On ignore toujours les erreurs', 'On affiche seulement null', 'On recharge la page a chaque clic'], 6]
    ].map(([label, correct, wrongs, ch]) => ({ label, correct, wrongs, ch, explain: correct })),
    questions: reactQuestions
  },
  {
    slug: 'api-rest-flask',
    title: 'API REST avec Flask',
    shortTitle: 'API REST',
    badge: 'API',
    icon: 'fa-solid fa-plug',
    accentName: 'api',
    description: 'Cours API REST B2 avec Python Flask: HTTP, JSON, routes, methodes, status codes, tests et mini API.',
    colors: { bg: '#07151a', bg2: '#10201d', accent: '#34d399', accent2: '#60a5fa', accent3: '#f59e0b' },
    chapters: [
      { title: 'API Web et HTTP', subtitle: 'Comprendre le dialogue client-serveur.', duration: '35 min', icon: 'fa-solid fa-network-wired', sections: [
        { title: 'API', icon: 'fa-solid fa-plug', lead: 'API signifie Application Programming Interface: une interface pour faire communiquer des programmes.', paragraphs: ['Dans le web, une API permet a un frontend ou a une autre application d echanger des donnees avec un backend.', 'Elle utilise souvent HTTP pour recevoir une requete et renvoyer une reponse.'], memo: 'API = contrat de communication entre logiciels.' },
        { title: 'Requete et reponse HTTP', icon: 'fa-solid fa-right-left', paragraphs: ['Une requete contient une methode, une URL, des headers et parfois un body.', 'Une reponse contient un code d etat, des headers et un body.'], table: { headers: ['Element', 'Role'], rows: [['Methode', 'Action souhaitee: GET, POST, PUT, DELETE'], ['Route', 'Ressource visee: /students/42'], ['Header', 'Informations: Content-Type, Authorization'], ['Body', 'Donnees envoyees, souvent JSON']] }, tip: 'Methode = verbe. Route = nom de la ressource.' },
        { title: 'Pourquoi JSON', icon: 'fa-solid fa-brackets-curly', paragraphs: ['JSON est un format texte lisible par beaucoup de langages. Il represente objets, tableaux, chaines, nombres, booleens et null.', 'Une API REST renvoie souvent du JSON au lieu du HTML.'], code: '{\n  "id": 42,\n  "firstName": "Lisa",\n  "semesterPaid": true\n}', warning: 'En JSON strict, les cles doivent etre entre guillemets.' }
      ] },
      { title: 'REST et ressources', subtitle: 'Construire des routes logiques.', duration: '40 min', icon: 'fa-solid fa-sitemap', sections: [
        { title: 'REST', icon: 'fa-solid fa-diagram-project', paragraphs: ['REST utilise les methodes HTTP et les codes d etat pour manipuler des ressources.', 'Une ressource est une chose du domaine: student, class, product, order.'], bullets: ['GET lit.', 'POST cree via une collection.', 'PUT remplace ou met a jour une ressource identifiee.', 'DELETE supprime.'], memo: 'REST = ressources + verbes HTTP + status codes.' },
        { title: 'Routes propres', icon: 'fa-solid fa-route', paragraphs: ['Une route doit nommer une ressource, pas une action vague.', '/students est plus REST que /getAllStudents.', 'Pour une ressource precise, on ajoute son id.'], table: { headers: ['Besoin', 'Route'], rows: [['Liste des etudiants', 'GET /students'], ['Un etudiant', 'GET /students/42'], ['Creer', 'POST /students'], ['Modifier', 'PUT /students/42'], ['Supprimer', 'DELETE /students/42']] }, warning: 'Evite les routes verbeuses comme /deleteStudent/42. La methode DELETE porte deja l action.' },
        { title: 'POST vs PUT', icon: 'fa-solid fa-code-compare', paragraphs: ['POST s utilise quand la route ne designe pas encore une ressource precise: POST /students cree un nouvel etudiant.', 'PUT s utilise quand la route designe la ressource a creer ou mettre a jour: PUT /students/42.'], memo: 'POST sur collection, PUT sur ressource identifiee.' }
      ] },
      { title: 'Flask minimal', subtitle: 'Coder une API Python claire.', duration: '50 min', icon: 'fa-brands fa-python', sections: [
        { title: 'Installer et demarrer', icon: 'fa-solid fa-terminal', paragraphs: ['Flask est un micro-framework Python. Il permet de declarer rapidement des routes HTTP.', 'jsonify transforme des donnees Python en reponse JSON.'], code: 'pip install flask\npython app.py', memo: 'Flask = routes simples + fonctions Python.' },
        { title: 'Premiere route', icon: 'fa-solid fa-code', paragraphs: ['Le decorateur @app.get indique la methode et la route.', 'La fonction retourne les donnees de la reponse.'], code: 'from flask import Flask, jsonify\n\napp = Flask(__name__)\n\n@app.get("/students")\ndef list_students():\n    return jsonify([])\n\napp.run(debug=True)', tip: '@app.get("/route") se lit: quand GET arrive ici, execute cette fonction.' },
        { title: 'Body JSON', icon: 'fa-solid fa-inbox', paragraphs: ['Pour POST ou PUT, le client envoie souvent un body JSON. Flask le lit avec request.get_json().', 'Il faut verifier les donnees avant de les accepter.'], code: 'from flask import request\n\ndata = request.get_json() or {}\nname = data.get("name")', warning: 'Ne fais pas confiance au body. Une API doit valider les champs obligatoires.' }
      ], lab: { intro: 'Ecris une mini route Flask GET /students.', prompt: 'Ton code doit contenir Flask, app.get, jsonify et /students.', terms: ['Flask', 'app.get', 'jsonify', '/students'], starter: 'from flask import Flask, jsonify\n\napp = Flask(__name__)\n\n# complete ici', solution: 'from flask import Flask, jsonify\n\napp = Flask(__name__)\n\n@app.get("/students")\ndef list_students():\n    return jsonify([{"id": 1, "name": "Lisa"}])', explain: 'La route lit une collection students et renvoie une liste JSON.' } },
      { title: 'Status codes', subtitle: 'Dire clairement ce qui s est passe.', duration: '40 min', icon: 'fa-solid fa-signal', sections: [
        { title: 'Codes frequents', icon: 'fa-solid fa-list-ol', paragraphs: ['Le code HTTP fait partie de la reponse. Il explique le resultat technique de la requete.', 'Une API claire utilise les bons codes au lieu de tout renvoyer en 200.'], table: { headers: ['Code', 'Sens'], rows: [['200', 'OK'], ['201', 'Created'], ['400', 'Bad Request'], ['401', 'Non authentifie'], ['403', 'Interdit'], ['404', 'Ressource introuvable'], ['500', 'Erreur serveur']] }, memo: '401 = qui es-tu ? 403 = je te connais mais tu n as pas le droit.' },
        { title: 'Erreurs JSON', icon: 'fa-solid fa-triangle-exclamation', paragraphs: ['Meme en erreur, une API peut renvoyer un JSON comprehensible.', 'Le frontend peut alors afficher le message proprement.'], code: 'return jsonify({"error": "student_not_found"}), 404', tip: 'Une erreur utile a un code HTTP et un message machine lisible.' },
        { title: 'Validation', icon: 'fa-solid fa-shield-halved', paragraphs: ['Si un champ obligatoire manque, on renvoie 400.', 'Si une ressource n existe pas, on renvoie 404.'], warning: 'Ne renvoie pas 500 pour une erreur utilisateur. 500 signifie probleme serveur.' }
      ] },
      { title: 'Tester une API', subtitle: 'Verifier autrement qu au hasard.', duration: '35 min', icon: 'fa-solid fa-vial', sections: [
        { title: 'Navigateur', icon: 'fa-solid fa-globe', paragraphs: ['Le navigateur teste surtout GET. Si tu ouvres /students, il fait une requete GET.', 'Pour POST, PUT ou DELETE, il faut un outil adapte.'], memo: 'Navigateur = GET facile, pas suffisant pour toute l API.' },
        { title: 'Postman, Bruno, Insomnia, cURL', icon: 'fa-solid fa-toolbox', paragraphs: ['Ces outils permettent de choisir la methode, les headers et le body.', 'cURL est pratique pour garder une commande reproductible.'], code: 'curl -X POST http://localhost:5000/students \\\n  -H "Content-Type: application/json" \\\n  -d "{\\"name\\":\\"Lisa\\"}"', tip: 'Un test API precise methode + URL + headers + body attendu.' },
        { title: 'Checklist', icon: 'fa-solid fa-clipboard-check', paragraphs: ['Teste les cas normaux et les erreurs: id introuvable, champ manquant, JSON invalide.', 'Une API n est pas fiable tant que ses erreurs ne sont pas testees.'], bullets: ['GET liste.', 'GET detail existant et absent.', 'POST valide et invalide.', 'PUT ressource absente.', 'DELETE puis GET pour confirmer.'] }
      ] },
      { title: 'Mini API complete', subtitle: 'Students et classes comme dans le support.', duration: '55 min', icon: 'fa-solid fa-graduation-cap', sections: [
        { title: 'Modele de donnees', icon: 'fa-solid fa-database', paragraphs: ['Le support donne deux ressources: students et classes.', 'On peut commencer avec une liste Python en memoire avant de brancher une vraie base.'], code: 'students = [\n  {"id": "1842421", "firstName": "Lisa", "classes": ["420-123-SH"]}\n]\nclasses = [\n  {"id": "420-123-SH", "title": "Creation de pages Web"}\n]', memo: 'Avant la base de donnees, maitrise deja routes + JSON + codes.' },
        { title: 'CRUD minimal', icon: 'fa-solid fa-gears', paragraphs: ['CRUD signifie Create, Read, Update, Delete.', 'Dans une API REST, CRUD se traduit souvent par POST, GET, PUT, DELETE.'], table: { headers: ['CRUD', 'HTTP'], rows: [['Create', 'POST /students'], ['Read all', 'GET /students'], ['Read one', 'GET /students/id'], ['Update', 'PUT /students/id'], ['Delete', 'DELETE /students/id']] } },
        { title: 'Securite de base', icon: 'fa-solid fa-lock', paragraphs: ['Une vraie API doit proteger certaines routes: authentification, permissions, validation, logs.', 'Le cours API REST ici reste centre sur HTTP, JSON et Flask, mais le reflexe securite doit deja exister.'], warning: 'Ne jamais exposer de secrets dans le code frontend. Une cle API reste cote serveur.' }
      ] }
    ],
    exercises: [
      { title: 'Identifier une requete', prompt: 'Decoupe une requete HTTP en methode, route, headers et body.', terms: ['methode', 'route', 'headers', 'body'], solution: 'POST /students HTTP/1.1\nContent-Type: application/json\n\n{"name":"Lisa"}\n\nMethode: POST\nRoute: /students\nHeader: Content-Type\nBody: JSON envoye', explain: 'Cette lecture evite de confondre l action, la ressource et les donnees.' },
      { title: 'Choisir les routes REST', prompt: 'Propose les routes pour lister, lire, creer, modifier et supprimer des cours.', terms: ['GET /classes', 'POST /classes', 'PUT /classes', 'DELETE /classes'], solution: 'GET /classes\nGET /classes/<id>\nPOST /classes\nPUT /classes/<id>\nDELETE /classes/<id>', explain: 'La ressource est classes. La methode porte l action.' },
      { title: 'Route Flask GET', prompt: 'Ecris une route GET /classes qui renvoie une liste JSON.', terms: ['@app.get', '/classes', 'jsonify'], solution: '@app.get("/classes")\ndef list_classes():\n    return jsonify(classes)', explain: 'Une route GET lit une collection sans modifier les donnees.' },
      { title: 'Route Flask POST', prompt: 'Ecris une route POST /students avec request.get_json.', terms: ['@app.post', 'request.get_json', '201'], solution: '@app.post("/students")\ndef create_student():\n    data = request.get_json() or {}\n    if not data.get("firstName"):\n        return jsonify({"error": "firstName_required"}), 400\n    students.append(data)\n    return jsonify(data), 201', explain: '201 indique qu une ressource a ete creee.' },
      { title: 'Erreur 404', prompt: 'Gere le cas ou GET /students/<id> ne trouve rien.', terms: ['404', 'student_not_found', 'jsonify'], solution: 'return jsonify({"error": "student_not_found"}), 404', explain: 'Une ressource absente doit produire une erreur claire.' },
      { title: 'Test cURL', prompt: 'Ecris une commande cURL pour creer un etudiant.', terms: ['curl', '-X POST', 'Content-Type', '-d'], solution: 'curl -X POST http://localhost:5000/students -H "Content-Type: application/json" -d "{\\"firstName\\":\\"Lisa\\"}"', explain: 'La commande precise methode, URL, header JSON et body.' }
    ],
    flashcards: [
      ['API', 'Interface permettant a des programmes de communiquer.'],
      ['API Web', 'Interface HTTP pour echanger des donnees avec un backend.'],
      ['REST', 'Style base sur ressources, methodes HTTP et status codes.'],
      ['GET', 'Lire une ressource.'],
      ['POST', 'Creer via une collection ou declencher un traitement.'],
      ['PUT', 'Mettre a jour une ressource identifiee.'],
      ['DELETE', 'Supprimer une ressource.'],
      ['JSON', 'Format texte d echange de donnees.'],
      ['401 vs 403', '401 non authentifie, 403 authentifie mais interdit.'],
      ['Flask jsonify', 'Transforme des donnees Python en reponse JSON.'],
      ['request.get_json', 'Lit le body JSON envoye par le client.'],
      ['cURL', 'Outil ligne de commande pour tester des requetes HTTP.']
    ].map(([front, back]) => ({ front, back })),
    memoSections: [
      { title: 'REST rapide', items: ['GET /students: liste.', 'GET /students/42: detail.', 'POST /students: creation.', 'PUT /students/42: mise a jour.', 'DELETE /students/42: suppression.'] },
      { title: 'Codes utiles', items: ['200 OK.', '201 Created.', '400 donnees invalides.', '401 non authentifie.', '403 interdit.', '404 introuvable.', '500 erreur serveur.'] },
      { title: 'Flask minimal', items: ['from flask import Flask, jsonify, request.', '@app.get("/route").', 'request.get_json() pour le body.', 'return jsonify(data), status_code.'] }
    ],
    questions: [
      {
        id: 1,
        ch: 1,
        q: "Que signifie l'acronyme API ?",
        o: ["Application Programming Interface", "Advanced Protocol Integration", "Automated Program Identifier", "Applicative Process Internet"],
        a: 0,
        e: "Application Programming Interface (API) désigne une interface permettant à différents programmes de communiquer entre eux."
      },
      {
        id: 2,
        ch: 1,
        q: "Quel est le rôle principal d'une API Web ?",
        o: ["Rendre une page web plus animée", "Permettre l'échange de données entre un client et un serveur via HTTP", "Remplacer l'infrastructure réseau", "Générer du code CSS automatiquement"],
        a: 1,
        e: "Une API Web expose des points d'accès (endpoints) sur le réseau pour permettre à un client de lire ou modifier des données sur un serveur."
      },
      {
        id: 3,
        ch: 1,
        q: "Dans le modèle client-serveur d'une API, que représente le 'client' ?",
        o: ["L'application qui formule la requête (ex: navigateur, application mobile)", "La base de données PostgreSQL", "Le routeur physique du réseau", "L'équipe de support technique"],
        a: 0,
        e: "Le client est l'émetteur de la requête. Il demande des informations ou des actions au serveur."
      },
      {
        id: 4,
        ch: 1,
        q: "Dans le modèle client-serveur, quel est le rôle du serveur ?",
        o: ["Écrire le code JavaScript pour le frontend", "Recevoir la requête, la traiter, et renvoyer une réponse HTTP", "Ranger physiquement les câbles réseau", "Vérifier le navigateur de l'utilisateur"],
        a: 1,
        e: "Le serveur est à l'écoute des requêtes. Il traite les demandes (ex: lire en base de données) et répond au client."
      },
      {
        id: 5,
        ch: 1,
        q: "Quel protocole réseau est le fondement du transfert de données pour les API REST ?",
        o: ["FTP", "SMTP", "HTTP", "SSH"],
        a: 2,
        e: "HTTP (Hypertext Transfer Protocol) est le protocole utilisé par REST pour transporter les requêtes et réponses."
      },
      {
        id: 6,
        ch: 1,
        q: "Parmi les éléments suivants, lequel ne fait PAS partie d'une requête HTTP standard ?",
        o: ["La méthode HTTP (GET, POST, etc.)", "L'en-tête (Header) de la requête", "Le corps (Body) de la requête", "La structure des tables de la base de données"],
        a: 3,
        e: "La base de données est interne au serveur et n'apparaît jamais dans les détails d'une requête HTTP."
      },
      {
        id: 7,
        ch: 1,
        q: "Quel composant d'une réponse HTTP indique le succès ou l'échec technique d'une requête ?",
        o: ["Le nom de domaine", "Le code d'état (Status Code)", "L'adresse MAC", "Le paramètre de chemin (path parameter)"],
        a: 1,
        e: "Le code d'état HTTP (comme 200 ou 404) informe immédiatement le client du résultat de sa requête."
      },
      {
        id: 8,
        ch: 1,
        q: "Quel en-tête (Header) HTTP permet au client de préciser le format des données qu'il envoie dans le corps ?",
        o: ["Accept", "Authorization", "Content-Type", "User-Agent"],
        a: 2,
        e: "Content-Type (ex: application/json) indique au serveur comment interpréter le corps de la requête."
      },
      {
        id: 9,
        ch: 1,
        q: "Que signifie l'acronyme JSON ?",
        o: ["JavaScript Object Notation", "Java System Online Network", "Joint Server Output Node", "JavaScript Oriented Null"],
        a: 0,
        e: "JSON (JavaScript Object Notation) est un format textuel léger pour échanger des données structurées."
      },
      {
        id: 10,
        ch: 1,
        q: "En JSON strict, quelle règle doit être respectée pour la déclaration des clés ?",
        o: ["Les clés doivent être entourées de guillemets doubles", "Les clés doivent être écrites en majuscules", "Les clés ne peuvent pas contenir de chiffres", "Les clés doivent obligatoirement commencer par un underscore"],
        a: 0,
        e: "En JSON strict, les clés et les chaînes de caractères doivent utiliser des guillemets doubles (\")."
      },
      {
        id: 11,
        ch: 1,
        q: "Quel type de données parmi les suivants n'est pas valide dans un document JSON ?",
        o: ["Une chaîne de caractères", "Un nombre entier ou décimal", "Une fonction ou méthode", "Une valeur booléenne (true/false)"],
        a: 2,
        e: "JSON ne supporte que les types de données statiques : objets, tableaux, chaînes, nombres, booléens et null. Les fonctions en sont exclues."
      },
      {
        id: 12,
        ch: 1,
        q: "Pourquoi le format JSON est-il très populaire pour les API REST face à XML ?",
        o: ["JSON crypte automatiquement les données", "JSON est plus léger, plus lisible et s'intègre naturellement avec le JavaScript", "JSON remplace le besoin de bases de données", "JSON est compilé directement par le processeur"],
        a: 1,
        e: "JSON est moins verbeux que XML, ce qui réduit la bande passante et accélère le traitement côté client et serveur."
      },
      {
        id: 13,
        ch: 1,
        q: "À quoi sert généralement l'en-tête de requête 'Authorization' ?",
        o: ["À indiquer la langue préférée de l'utilisateur", "À transmettre des identifiants ou un jeton pour authentifier le client", "À définir le temps d'expiration de la page", "À autoriser l'affichage des images"],
        a: 1,
        e: "L'en-tête Authorization (ex: Bearer token) prouve l'identité du client auprès du serveur pour accéder aux routes protégées."
      },
      {
        id: 14,
        ch: 1,
        q: "Qu'est-ce qu'un 'endpoint' (point d'accès) dans une API Web ?",
        o: ["L'adresse physique de la carte mère du serveur", "Une URL spécifique exposée par l'API pour effectuer des requêtes sur une ressource", "Le bouton de fermeture de l'application", "L'identifiant unique de la base de données"],
        a: 1,
        e: "Un endpoint correspond à la combinaison d'une URL et d'une méthode HTTP (ex: GET /students)."
      },
      {
        id: 15,
        ch: 1,
        q: "Quel en-tête de requête HTTP le client peut-il utiliser pour indiquer au serveur le format qu'il souhaite recevoir ?",
        o: ["Accept", "Content-Type", "Host", "User-Agent"],
        a: 0,
        e: "L'en-tête Accept (ex: application/json) permet au client de négocier le format de contenu de la réponse."
      },
      {
        id: 16,
        ch: 1,
        q: "Dans l'URL 'https://api.monsite.com/v1/users', quelle partie correspond au nom d'hôte (Host) ?",
        o: ["/v1/users", "https", "api.monsite.com", "users"],
        a: 2,
        e: "api.monsite.com représente le nom de domaine ou nom d'hôte (Host) identifiant le serveur sur internet."
      },
      {
        id: 17,
        ch: 1,
        q: "Pourquoi les API Web permettent-elles une indépendance de la plateforme ?",
        o: ["Elles obligent tous les programmes à être codés en Python", "Elles communiquent via des protocoles et formats standardisés (HTTP/JSON) indépendants du langage", "Elles n'ont pas besoin de système d'exploitation", "Elles convertissent tout le code en code machine unique"],
        a: 1,
        e: "Comme l'échange se fait par des formats universels (JSON), un frontend en React (JS) peut dialoguer sans problème avec un backend en Flask (Python)."
      },
      {
        id: 18,
        ch: 2,
        q: "Que signifie l'acronyme REST ?",
        o: ["Representational State Transfer", "Remote External System Technology", "Realtime Encryption Security Protocol", "Resource Efficient Storage Tool"],
        a: 0,
        e: "REST (Representational State Transfer) est un style d'architecture logicielle pour concevoir des applications web basées sur des ressources."
      },
      {
        id: 19,
        ch: 2,
        q: "Dans une API REST, qu'est-ce qu'une 'ressource' ?",
        o: ["Un fichier de style CSS", "Une entité conceptuelle manipulable de l'application (ex: un étudiant, une classe, un produit)", "La quantité de RAM disponible sur le serveur", "La bande passante totale du réseau"],
        a: 1,
        e: "Une ressource est n'importe quel objet ou concept de données exposé par l'API (ex: /students, /courses)."
      },
      {
        id: 20,
        ch: 2,
        q: "Quelle est la bonne pratique de nommage REST pour lister des classes ?",
        o: ["GET /getClasses", "GET /classes", "POST /classes/all", "GET /listAllClasses"],
        a: 1,
        e: "REST utilise des noms au pluriel pour représenter les collections, l'action (lire) étant portée par la méthode HTTP GET."
      },
      {
        id: 21,
        ch: 2,
        q: "Quelle structure d'URL est la plus conforme aux principes REST pour récupérer les détails de la classe '42' ?",
        o: ["GET /classDetails?id=42", "GET /classes/42", "GET /classes/id/42", "POST /getClassById/42"],
        a: 1,
        e: "Pour cibler un élément spécifique, on place son identifiant directement dans le chemin après le nom de la collection."
      },
      {
        id: 22,
        ch: 2,
        q: "Quelle méthode HTTP est spécifiquement dédiée à la création d'une nouvelle ressource ?",
        o: ["GET", "PUT", "POST", "PATCH"],
        a: 2,
        e: "POST est utilisé pour créer une nouvelle ressource au sein d'une collection générique (ex: POST /students)."
      },
      {
        id: 23,
        ch: 2,
        q: "Quelle est la différence fondamentale entre POST et PUT dans REST ?",
        o: ["POST est réservé à la lecture, PUT à la modification", "POST s'applique sur la collection pour créer (id inconnu), PUT s'applique sur une ressource identifiée pour remplacer (id connu)", "PUT est plus rapide que POST", "POST ne peut pas envoyer de JSON, contrairement à PUT"],
        a: 1,
        e: "POST crée une ressource sous un identifiant généré par le serveur. PUT crée ou remplace une ressource à un URI précis déjà déterminé."
      },
      {
        id: 24,
        ch: 2,
        q: "Quelle méthode HTTP permet de remplacer ou mettre à jour entièrement une ressource identifiée ?",
        o: ["POST", "PUT", "GET", "OPTIONS"],
        a: 1,
        e: "PUT écrase ou crée la ressource ciblée à l'URI spécifié (ex: PUT /students/42)."
      },
      {
        id: 25,
        ch: 2,
        q: "Quelle méthode HTTP doit être appelée pour retirer définitivement une ressource ?",
        o: ["REMOVE", "DELETE", "POST", "GET"],
        a: 1,
        e: "DELETE est la méthode standard pour supprimer une ressource identifiée (ex: DELETE /students/42)."
      },
      {
        id: 26,
        ch: 2,
        q: "Pourquoi la route 'GET /deleteStudent/42' viole-t-elle les principes de REST ?",
        o: ["Parce qu'elle utilise un identifiant numérique", "Parce qu'elle exprime une action de modification dans l'URL et utilise GET au lieu de la méthode DELETE", "Parce qu'elle ne renvoie pas de format XML", "Parce qu'elle est trop courte"],
        a: 1,
        e: "L'action ne doit pas figurer dans l'URL. On doit utiliser la méthode HTTP DELETE sur la ressource : DELETE /students/42."
      },
      {
        id: 27,
        ch: 2,
        q: "Que signifie le concept d'idempotence pour une méthode HTTP ?",
        o: ["Elle renvoie toujours la même date dans les en-têtes", "L'appeler plusieurs fois de suite avec les mêmes paramètres produit le même état final sur le serveur", "Elle s'exécute en moins d'une milliseconde", "Elle n'autorise que les requêtes locales"],
        a: 1,
        e: "Une méthode est idempotente si plusieurs requêtes identiques successives ont le même effet sur le serveur que la première."
      },
      {
        id: 28,
        ch: 2,
        q: "Parmi les méthodes suivantes, laquelle n'est pas idempotente ?",
        o: ["GET", "PUT", "POST", "DELETE"],
        a: 2,
        e: "POST n'est pas idempotente car l'appeler plusieurs fois créera plusieurs ressources différentes (ex: ajouter 3 fois le même étudiant génère 3 entrées)."
      },
      {
        id: 29,
        ch: 2,
        q: "Quelle méthode HTTP permet d'effectuer une mise à jour partielle (ex: modifier uniquement l'email d'un utilisateur) ?",
        o: ["PUT", "PATCH", "POST", "GET"],
        a: 1,
        e: "PATCH est conçu pour appliquer des modifications partielles à une ressource existante."
      },
      {
        id: 30,
        ch: 2,
        q: "Que signifie le fait qu'une API REST soit 'stateless' ?",
        o: ["Le serveur ne garde en mémoire aucune session ou contexte utilisateur entre les requêtes. Chaque requête doit contenir tout le nécessaire", "Le serveur n'utilise pas de base de données", "L'application ne peut pas changer d'état", "L'API ne fonctionne que sans connexion Internet"],
        a: 0,
        e: "Dans une API sans état, chaque requête est indépendante. L'authentification et les paramètres requis doivent être fournis à chaque appel."
      },
      {
        id: 31,
        ch: 2,
        q: "Quelle route REST est la plus logique pour lister les notes (grades) de l'étudiant 12 ?",
        o: ["GET /gradesOfStudent/12", "GET /students/12/grades", "GET /grades?studentId=12", "POST /students/12/getGrades"],
        a: 1,
        e: "La relation hiérarchique s'exprime naturellement par l'imbrication des chemins : /collection/id/sous-collection."
      },
      {
        id: 32,
        ch: 2,
        q: "Quelle méthode HTTP est considérée comme 'sûre' (safe) car elle ne modifie jamais les données sur le serveur ?",
        o: ["POST", "PUT", "GET", "DELETE"],
        a: 2,
        e: "GET ne doit servir qu'à la lecture. Elle est sûre car sa consultation n'altère pas l'état des ressources."
      },
      {
        id: 33,
        ch: 2,
        q: "Quelle est la bonne pratique concernant l'usage du pluriel pour les collections de ressources ?",
        o: ["Utiliser le pluriel pour les collections (ex: /students) et le même chemin avec l'ID pour un élément (ex: /students/42)", "Utiliser le singulier partout (ex: /student et /student/42)", "Mélanger selon le nombre d'éléments attendus", "Utiliser le pluriel uniquement pour les requêtes POST"],
        a: 0,
        e: "L'usage constant du pluriel (ex: /students) simplifie la structure et rend l'API cohérente pour l'accès aux collections et aux éléments."
      },
      {
        id: 34,
        ch: 2,
        q: "Dans quel cas est-il préférable d'utiliser des paramètres de requête (ex: /students?age=20) plutôt que des paramètres de chemin ?",
        o: ["Pour cibler un étudiant précis par son identifiant unique", "Pour filtrer, trier ou paginer les résultats d'une collection d'éléments", "Pour sécuriser les mots de passe des utilisateurs", "Pour créer une nouvelle ressource"],
        a: 1,
        e: "Les paramètres de requête (query parameters) servent à modifier la vue d'une collection (filtres, tri, pagination), pas à cibler une ressource précise."
      },
      {
        id: 35,
        ch: 3,
        q: "Qu'est-ce que Flask dans l'écosystème Python ?",
        o: ["Un système de gestion de bases de données relationnelles", "Un micro-framework minimaliste pour construire des applications web et des API", "Un compilateur pour optimiser le code Python", "Un outil d'analyse de données scientifiques"],
        a: 1,
        e: "Flask est un framework léger en Python permettant de déclarer facilement des routes HTTP et de servir des réponses."
      },
      {
        id: 36,
        ch: 3,
        q: "Quelle commande permet d'installer Flask dans votre environnement de développement ?",
        o: ["npm install flask", "pip install flask", "python install flask", "git pull flask"],
        a: 1,
        e: "En Python, l'installateur standard de paquets est pip. On installe Flask via `pip install flask`."
      },
      {
        id: 37,
        ch: 3,
        q: "Comment déclare-t-on l'instance principale de l'application Flask ?",
        o: ["app = Flask(__name__)", "app = new Flask()", "app = flask.init()", "app = Flask.run()"],
        a: 0,
        e: "On initialise l'application en instanciant `Flask` avec `__name__` pour que le framework localise les ressources."
      },
      {
        id: 38,
        ch: 3,
        q: "Quel décorateur Flask associe une fonction à des requêtes GET sur la route '/status' ?",
        o: ["@app.route.get('/status')", "@app.get('/status')", "@flask.get('/status')", "@route('/status', method='GET')"],
        a: 1,
        e: "Flask moderne propose `@app.get('/route')` comme raccourci explicite pour associer la méthode GET."
      },
      {
        id: 39,
        ch: 3,
        q: "À quoi sert la fonction 'jsonify' fournie par Flask ?",
        o: ["À valider la syntaxe du code Python", "À convertir une structure Python (dictionnaire, liste) en une réponse HTTP contenant du JSON et l'en-tête Content-Type correct", "À sauvegarder les données dans un fichier .json sur le serveur", "À chiffrer les requêtes reçues"],
        a: 1,
        e: "jsonify convertit les données en chaîne JSON et configure automatiquement l'en-tête de réponse sur `application/json`."
      },
      {
        id: 40,
        ch: 3,
        q: "Comment lance-t-on le serveur de développement Flask en mode debug ?",
        o: ["app.start(debug=True)", "app.run(debug=True)", "Flask.launch(debug=True)", "python run app.py"],
        a: 1,
        e: "La méthode `app.run(debug=True)` démarre le serveur local et active le rechargement automatique en cas de modification de fichier."
      },
      {
        id: 41,
        ch: 3,
        q: "Comment récupère-t-on les données d'un corps de requête au format JSON dans Flask ?",
        o: ["request.get_json()", "request.body.json", "request.form['json']", "request.read_json()"],
        a: 0,
        e: "La méthode `request.get_json()` analyse le corps de la requête HTTP entrante et le convertit en dictionnaire ou liste Python."
      },
      {
        id: 42,
        ch: 3,
        q: "Quelle est la bonne syntaxe d'importation pour accéder à l'objet 'request' dans Flask ?",
        o: ["import flask.request", "from flask import request", "from flask import RequestObject", "import request from flask"],
        a: 1,
        e: "On importe `request` directement depuis le module global `flask`."
      },
      {
        id: 43,
        ch: 3,
        q: "Que retourne 'request.get_json()' si le client n'a pas spécifié l'en-tête 'Content-Type: application/json' ?",
        o: ["Un dictionnaire vide", "Lève obligatoirement une erreur de syntaxe", "None", "Une chaîne de caractères brute"],
        a: 2,
        e: "Sans l'en-tête application/json, Flask n'interprète pas le corps en JSON et renvoie None par défaut."
      },
      {
        id: 44,
        ch: 3,
        q: "Quel est l'intérêt d'activer 'debug=True' lors du développement d'une API Flask ?",
        o: ["Il désactive la sécurité de l'API", "Il recharge automatiquement le serveur lors d'un changement de code et affiche un débogueur interactif en cas d'erreur", "Il double les performances du serveur de base", "Il simule une base de données locale"],
        a: 1,
        e: "Le mode debug offre le rechargement à chaud (hot-reload) et affiche des traces d'erreurs détaillées dans la console ou le navigateur."
      },
      {
        id: 45,
        ch: 3,
        q: "Quel est le port réseau standard par défaut utilisé par 'app.run()' dans Flask ?",
        o: ["8080", "3000", "5000", "80"],
        a: 2,
        e: "Par défaut, Flask configure son serveur de développement local pour écouter sur le port 5000."
      },
      {
        id: 46,
        ch: 3,
        q: "Pourquoi est-il crucial de valider le dictionnaire renvoyé par 'request.get_json()' dans une route POST ?",
        o: ["Parce que le client peut avoir envoyé des données corrompues, incomplètes ou malveillantes", "Parce que Python plante si on ne valide pas", "Pour accélérer le temps de réponse du serveur", "Pour compiler l'application en production"],
        a: 0,
        e: "Le serveur ne doit jamais faire confiance aux données d'entrée. Il doit vérifier la présence et le type des champs obligatoires."
      },
      {
        id: 47,
        ch: 3,
        q: "Comment déclare-t-on une route Flask dynamique capturant un entier nommé 'id' ?",
        o: ["@app.get('/users/id')", "@app.get('/users/<int:id>')", "@app.get('/users/:id')", "@app.get('/users/{id}')"],
        a: 1,
        e: "Dans Flask, les paramètres de chemin dynamiques s'écrivent entre chevrons avec l'indication optionnelle du type : `<type:nom_variable>`."
      },
      {
        id: 48,
        ch: 3,
        q: "Que se passe-t-il si une fonction de route Flask ne renvoie rien (instruction return omise) ?",
        o: ["Flask renvoie une page vide en code 200", "Flask lève une exception indiquant que la valeur de retour n'est pas valide", "Flask attend indéfiniment la réponse", "Le serveur s'arrête automatiquement"],
        a: 1,
        e: "Flask exige que chaque fonction de vue renvoie une réponse valide (chaîne, dictionnaire, tuple de réponse ou objet Response) sous peine de lever un TypeError."
      },
      {
        id: 49,
        ch: 3,
        q: "Comment configurer 'app.run()' pour rendre le serveur accessible depuis d'autres appareils du réseau ?",
        o: ["app.run(host='0.0.0.0')", "app.run(network='public')", "app.run(port='all')", "app.run(host='localhost')"],
        a: 0,
        e: "L'hôte '0.0.0.0' indique au serveur d'écouter sur toutes les adresses IP disponibles, rendant le serveur accessible sur le réseau local."
      },
      {
        id: 50,
        ch: 3,
        q: "Quel est le principal défaut de stocker des données dans une liste globale en mémoire (`students = []`) ?",
        o: ["Les données sont effacées à chaque redémarrage du serveur Flask", "La liste ne peut contenir que des chaînes de caractères", "La mémoire RAM sature en moins de 10 requêtes", "On ne peut pas lire la liste avec une méthode GET"],
        a: 0,
        e: "Le stockage en mémoire est volatile. Pour persister les données, il faut connecter l'API à une base de données (PostgreSQL, SQLite, etc.)."
      },
      {
        id: 51,
        ch: 3,
        q: "Comment renvoyer à la fois un JSON et un code de statut 201 dans Flask ?",
        o: ["return jsonify(data, 201)", "return jsonify(data), 201", "return jsonify(data).status(201)", "return 201, jsonify(data)"],
        a: 1,
        e: "Flask permet de retourner un tuple `(response, status_code)`. La syntaxe correcte est `return jsonify(data), 201`."
      },
      {
        id: 52,
        ch: 4,
        q: "Quelle signification générale ont les codes HTTP de la famille 2xx ?",
        o: ["La requête a été reçue mais nécessite des redirections", "La requête a été reçue, comprise et acceptée avec succès", "La requête comporte une erreur de syntaxe côté client", "Le serveur a rencontré une erreur interne lors du traitement"],
        a: 1,
        e: "La famille 2xx (ex: 200, 201, 204) représente les réussites d'opérations."
      },
      {
        id: 53,
        ch: 4,
        q: "Quel est l'usage standard du code de statut '200 OK' ?",
        o: ["Indiquer qu'une nouvelle ressource a été créée", "Indiquer le succès d'une requête classique de lecture ou de mise à jour", "Signaler qu'un utilisateur n'est pas connecté", "Ressource introuvable"],
        a: 1,
        e: "Le code 200 indique que la requête s'est déroulée avec succès et que le résultat attendu est renvoyé dans le corps de réponse."
      },
      {
        id: 54,
        ch: 4,
        q: "Quel code HTTP doit idéalement renvoyer une route POST suite à la création réussie d'une ressource ?",
        o: ["200 OK", "201 Created", "204 No Content", "400 Bad Request"],
        a: 1,
        e: "201 Created est le code standard pour notifier le client qu'une nouvelle ressource a été correctement insérée et possède désormais son propre URI."
      },
      {
        id: 55,
        ch: 4,
        q: "Quelle signification a le code '400 Bad Request' ?",
        o: ["L'utilisateur a saisi un mauvais mot de passe", "La requête est mal formée ou les données fournies sont invalides pour le traitement", "La ressource demandée n'existe plus", "Le serveur Flask est en panne"],
        a: 1,
        e: "Le code 400 indique une erreur de la part du client (ex: format JSON invalide, champs obligatoires manquants)."
      },
      {
        id: 56,
        ch: 4,
        q: "Que signifie précisément le code HTTP '401 Unauthorized' ?",
        o: ["Le client n'est pas autorisé car il n'a pas fourni de preuves d'identité (non authentifié)", "L'accès est refusé même après s'être correctement connecté", "La méthode HTTP utilisée n'est pas acceptée", "La requête a expiré"],
        a: 0,
        e: "Le code 401 signifie que la requête requiert une authentification utilisateur qui a échoué ou est absente."
      },
      {
        id: 57,
        ch: 4,
        q: "Que signifie le code HTTP '403 Forbidden' ?",
        o: ["Le serveur refuse la requête car l'utilisateur n'est pas connecté", "Le serveur comprend l'identité du client mais ce dernier n'a pas les droits nécessaires pour effectuer l'action", "Le mot de passe de l'utilisateur a expiré", "La ressource n'existe pas"],
        a: 1,
        e: "403 indique un problème de permissions (ex: un étudiant authentifié accède à une page d'administration réservée aux profs)."
      },
      {
        id: 58,
        ch: 4,
        q: "Quelle est la nuance principale entre le code 401 et le code 403 ?",
        o: ["401 concerne l'authentification (qui êtes-vous ?), 403 concerne les autorisations (qu'avez-vous le droit de faire ?)", "401 est une erreur serveur, 403 est une erreur client", "Il n'y a aucune différence, les deux codes sont interchangeables", "401 est utilisé en HTTP classique, 403 uniquement pour le protocole HTTPS"],
        a: 0,
        e: "Le code 401 indique un manque d'identité valide. Le code 403 intervient lorsque l'identité est validée mais insuffisante pour l'action requise."
      },
      {
        id: 59,
        ch: 4,
        q: "Quel code de retour est approprié si un client demande `/students/999` et que cet ID n'existe pas ?",
        o: ["400 Bad Request", "401 Unauthorized", "404 Not Found", "500 Internal Error"],
        a: 2,
        e: "404 Not Found s'impose lorsque le serveur ne trouve aucune correspondance pour la ressource ciblée par l'URI."
      },
      {
        id: 60,
        ch: 4,
        q: "À quelle catégorie de problèmes correspondent les codes HTTP commençant par 5 (5xx) ?",
        o: ["Erreurs de syntaxe commises par le développeur client", "Erreurs générées par le serveur qui a échoué à exécuter une requête valide", "Tentatives de piratage interceptées", "Changements d'URI ou redirections de pages"],
        a: 1,
        e: "Les codes 5xx désignent une défaillance interne du serveur lors du traitement d'une requête par ailleurs valide."
      },
      {
        id: 61,
        ch: 4,
        q: "Que signifie le code '500 Internal Server Error' ?",
        o: ["La connexion internet a été coupée", "Le serveur a rencontré une condition inattendue qui l'a empêché de répondre à la requête (ex: crash du code Python non géré)", "La base de données contient trop d'étudiants", "La route demandée n'existe pas"],
        a: 1,
        e: "Le code 500 est le code générique pour les plantages ou exceptions non gérées côté serveur (ex: division par zéro dans le script)."
      },
      {
        id: 62,
        ch: 4,
        q: "Quel code HTTP renvoyer si un client tente de créer un étudiant en omettant le champ obligatoire 'firstName' ?",
        o: ["404 Not Found", "400 Bad Request", "403 Forbidden", "401 Unauthorized"],
        a: 1,
        e: "L'omission de données requises pour le modèle constitue une mauvaise requête client, qualifiée en `400 Bad Request`."
      },
      {
        id: 63,
        ch: 4,
        q: "Quel code renvoyer après une suppression réussie via DELETE si le serveur ne retourne aucun contenu ?",
        o: ["200 OK", "201 Created", "204 No Content", "202 Accepted"],
        a: 2,
        e: "Le code 204 No Content confirme la réussite de l'action tout en spécifiant que le corps de la réponse est intentionnellement vide."
      },
      {
        id: 64,
        ch: 4,
        q: "Pourquoi est-il déconseillé de retourner un code 200 OK avec un JSON contenant `{'status': 'error', 'code': 404}` ?",
        o: ["Parce que le client doit analyser le corps JSON pour détecter l'erreur, au lieu de lire directement le code de statut standard de la réponse HTTP", "Parce que JSON n'accepte pas les nombres comme 404", "Parce que Flask refuse de démarrer dans cette configuration", "Parce que le code 200 est réservé aux fichiers HTML brut"],
        a: 0,
        e: "L'architecture REST repose sur l'exploitation des codes de statut HTTP standard. Renvoyer 200 pour une erreur empêche les outils réseau d'interpréter correctement la réponse."
      },
      {
        id: 65,
        ch: 4,
        q: "Quel code de statut HTTP correspond à l'erreur '405 Method Not Allowed' ?",
        o: ["La route demandée n'existe pas sur le serveur", "La route existe, mais la méthode HTTP utilisée (ex: POST) n'est pas autorisée sur cet URI", "L'accès à la méthode requiert un abonnement payant", "L'adresse IP du client est bannie"],
        a: 1,
        e: "Le code 405 s'applique si la route est valide mais que le verbe HTTP transmis n'est pas supporté (ex: faire un POST sur une route purement informative en GET)."
      },
      {
        id: 66,
        ch: 4,
        q: "Que signifie le code '204 No Content' ?",
        o: ["La requête a échoué car le serveur n'a pas de données", "La requête a réussi mais la réponse ne contient aucun corps (body)", "La base de données est vide", "Le serveur demande au client d'effacer ses données"],
        a: 1,
        e: "Le code 204 valide le succès d'une opération n'exigeant aucun retour d'information dans le corps de réponse."
      },
      {
        id: 67,
        ch: 4,
        q: "Quel code HTTP indique qu'une ressource a été temporairement déplacée vers un autre URI ?",
        o: ["404 Not Found", "302 Found (ou Temporary Redirect)", "200 OK", "503 Service Unavailable"],
        a: 1,
        e: "La famille des codes 3xx est réservée aux redirections. Le code 302 redirige temporairement le client vers un autre URI."
      },
      {
        id: 68,
        ch: 5,
        q: "Pourquoi le navigateur web standard n'est-il pas suffisant pour tester une API complète ?",
        o: ["Il n'affiche pas les formats JSON", "Il ne peut effectuer facilement que des requêtes de type GET en saisissant l'URL dans la barre d'adresse", "Il ralentit les réponses du serveur", "Il n'est pas capable d'interpréter les codes 200"],
        a: 1,
        e: "Pour tester les requêtes POST, PUT ou DELETE avec des en-têtes complexes, il est nécessaire d'utiliser des outils spécialisés comme Postman ou cURL."
      },
      {
        id: 69,
        ch: 5,
        q: "Qu'est-ce que l'outil 'cURL' dans le développement web ?",
        o: ["Un micro-framework similaire à Flask", "Un utilitaire en ligne de commande permettant de formuler et d'envoyer des requêtes réseau avec des URL", "Un compilateur JavaScript pour le frontend", "Un outil d'administration de machines virtuelles"],
        a: 1,
        e: "cURL permet d'effectuer des appels HTTP directement depuis un terminal, ce qui est très pratique pour tester rapidement ou scripter des requêtes."
      },
      {
        id: 70,
        ch: 5,
        q: "Quelle option cURL permet de définir la méthode HTTP à employer (ex: POST ou DELETE) ?",
        o: ["-m", "-H", "-X (ou --request)", "-d"],
        a: 2,
        e: "L'option `-X` ou `--request` est utilisée pour spécifier le verbe HTTP (GET, POST, PUT, DELETE, etc.)."
      },
      {
        id: 71,
        ch: 5,
        q: "Comment ajoute-t-on un en-tête (Header) personnalisé dans une commande cURL ?",
        o: ["-h 'HeaderName: Value'", "-H 'HeaderName: Value' (ou --header)", "-d 'HeaderName: Value'", "-x 'HeaderName: Value'"],
        a: 1,
        e: "L'option `-H` permet de configurer les en-têtes HTTP de la requête de test."
      },
      {
        id: 72,
        ch: 5,
        q: "Quelle option cURL est utilisée pour envoyer des données dans le corps (Body) d'une requête ?",
        o: ["-b", "-H", "-d (ou --data)", "-X"],
        a: 2,
        e: "L'option `-d` ou `--data` permet de passer la chaîne de données ou le JSON (ex: `-d '{\"name\":\"Lisa\"}'`)."
      },
      {
        id: 73,
        ch: 5,
        q: "Qu'est-ce que Postman ?",
        o: ["Un client de messagerie sécurisé pour envoyer des rapports d'erreurs", "Une application graphique facilitant la création, le test, le partage et la documentation des requêtes d'API", "Un serveur web alternatif à Apache et Nginx", "Un plugin d'authentification pour Flask"],
        a: 1,
        e: "Postman fournit une interface conviviale pour construire visuellement des appels HTTP complexes et analyser les réponses."
      },
      {
        id: 74,
        ch: 5,
        q: "Dans Postman, à quoi sert le concept d'Environnement ?",
        o: ["À modifier la couleur de l'interface", "À stocker des variables réutilisables (ex: base_url) qui changent selon le contexte (ex: local vs production)", "À simuler des pannes matérielles de serveurs", "À compiler le code source de l'API"],
        a: 1,
        e: "Les environnements permettent de basculer facilement les requêtes entre le serveur de développement local et le serveur de production sans modifier les URL manuellement."
      },
      {
        id: 75,
        ch: 5,
        q: "Qu'est-ce que 'Bruno' dans le cadre du test d'API ?",
        o: ["Un langage de programmation concurrent de Python", "Un client d'API open-source, léger et axé sur Git pour stocker les collections sous forme de fichiers texte", "Un outil de déploiement de serveurs Linux", "Une base de données alternative à PostgreSQL"],
        a: 1,
        e: "Bruno est une alternative moderne à Postman qui stocke les requêtes dans des fichiers plats, simplifiant le partage via le contrôle de version (Git)."
      },
      {
        id: 76,
        ch: 5,
        q: "Quelle commande cURL permet de formuler une requête GET basique vers '/students' ?",
        o: ["curl GET http://localhost:5000/students", "curl http://localhost:5000/students", "curl -X SEND http://localhost:5000/students", "curl -d http://localhost:5000/students"],
        a: 1,
        e: "Par défaut, si aucune option de méthode n'est précisée, cURL effectue une requête GET sur l'URL bouclée."
      },
      {
        id: 77,
        ch: 5,
        q: "À quoi sert la rédaction de tests automatisés dans Postman ou Bruno ?",
        o: ["À générer le code source de l'API automatiquement", "À valider automatiquement les réponses (code de statut, structure JSON) après chaque requête pour éviter les régressions", "À chiffrer les requêtes en transit", "À générer de faux utilisateurs dans la base de données"],
        a: 1,
        e: "Les scripts de test permettent d'assurer que l'API renvoie toujours le format et les données attendus lors de modifications du code source."
      },
      {
        id: 78,
        ch: 5,
        q: "Comment spécifie-t-on le format JSON pour l'envoi de données dans une commande cURL ?",
        o: ["En ajoutant l'en-tête `-H \"Content-Type: application/json\"`", "En utilisant l'option `--format json`", "cURL détecte le JSON et configure l'en-tête automatiquement", "cURL ne supporte pas le format JSON"],
        a: 0,
        e: "Il faut impérativement préciser au serveur que les données envoyées avec `-d` sont du JSON en configurant le Content-Type approprié via `-H`."
      },
      {
        id: 79,
        ch: 5,
        q: "Pourquoi est-il recommandé de tester le comportement de l'API face à des données invalides ?",
        o: ["Pour vérifier que le serveur est bien capable de refuser les mauvaises requêtes et de renvoyer un code d'erreur client approprié (4xx)", "Pour tester si l'application frontend peut corriger les erreurs", "Pour ralentir volontairement les requêtes du serveur", "Pour tester la vitesse maximale du processeur"],
        a: 0,
        e: "Une API robuste doit gérer proprement les erreurs d'entrée et guider le client avec des codes HTTP précis (ex: 400 Bad Request) plutôt que de crasher (500)."
      },
      {
        id: 80,
        ch: 5,
        q: "Quel en-tête HTTP le client utilise-t-il pour spécifier le format de réponse qu'il attend ?",
        o: ["Content-Type", "Accept", "User-Agent", "Referer"],
        a: 1,
        e: "L'en-tête Accept indique au serveur les types de médias que le client est prêt à recevoir en retour."
      },
      {
        id: 81,
        ch: 5,
        q: "Que teste-t-on prioritairement lors d'un test de régression ?",
        o: ["Les nouvelles fonctionnalités uniquement", "Que les fonctionnalités existantes de l'API n'ont pas été altérées par de récentes modifications du code", "La vitesse maximale du serveur de production", "La validité du certificat de sécurité SSL"],
        a: 1,
        e: "Les tests de régression protègent le comportement historique de l'API contre les effets secondaires de nouvelles fonctionnalités."
      },
      {
        id: 82,
        ch: 5,
        q: "Quel outil en ligne de commande est préinstallé sur la plupart des systèmes d'exploitation modernes pour tester des requêtes HTTP ?",
        o: ["Git", "cURL", "Postman", "Flask"],
        a: 1,
        e: "cURL est l'outil natif universel pour formuler des requêtes HTTP directement en ligne de commande."
      },
      {
        id: 83,
        ch: 5,
        q: "Dans Postman, comment s'appelle le groupe organisé de requêtes HTTP ?",
        o: ["Une Liste", "Une Collection", "Un Dossier", "Un Projet"],
        a: 1,
        e: "Les requêtes sont regroupées au sein de Collections permettant de structurer et de partager les tests d'une même API."
      },
      {
        id: 84,
        ch: 6,
        q: "Que signifie précisément l'acronyme CRUD ?",
        o: ["Create, Read, Update, Delete", "Control, Run, Use, Debug", "Connect, Retrieve, Upload, Disconnect", "Client, Router, User, Database"],
        a: 0,
        e: "CRUD désigne les quatre opérations de base de la persistance des données : Créer, Lire, Mettre à jour et Supprimer."
      },
      {
        id: 85,
        ch: 6,
        q: "Dans une API REST, à quelle opération du CRUD correspond la méthode POST ?",
        o: ["Read", "Create", "Update", "Delete"],
        a: 1,
        e: "La méthode POST permet de créer de nouvelles ressources au sein de l'API."
      },
      {
        id: 86,
        ch: 6,
        q: "Dans une API REST, à quelle opération du CRUD correspond la méthode GET ?",
        o: ["Update", "Create", "Read", "Delete"],
        a: 2,
        e: "La méthode GET est utilisée pour lire des données (lister une collection ou afficher un élément)."
      },
      {
        id: 87,
        ch: 6,
        q: "Dans une API REST, à quelle opération du CRUD correspond la méthode PUT ?",
        o: ["Create", "Read", "Update", "Delete"],
        a: 2,
        e: "La méthode PUT est typiquement utilisée pour modifier (mettre à jour/remplacer) une ressource existante identifiée."
      },
      {
        id: 88,
        ch: 6,
        q: "Dans une API REST, à quelle opération du CRUD correspond la méthode DELETE ?",
        o: ["Delete", "Create", "Read", "Update"],
        a: 0,
        e: "La méthode DELETE permet de supprimer la ressource désignée par l'URI."
      },
      {
        id: 89,
        ch: 6,
        q: "Lors du développement d'une maquette d'API, quel est le principal inconvénient d'utiliser une variable globale pour les données ?",
        o: ["Les requêtes GET ne peuvent pas y accéder", "Les données sont perdues à chaque fois que le serveur Flask s'arrête ou redémarre", "Cela ralentit le serveur de développement", "La mémoire sature après trois requêtes"],
        a: 1,
        e: "Les données stockées en mémoire vive (RAM) sont volatiles. Une fermeture du processus Python réinitialise la variable."
      },
      {
        id: 90,
        ch: 6,
        q: "Comment lier de façon relationnelle un étudiant à une classe dans les données JSON ?",
        o: ["En copiant tout le code HTML de la classe dans l'objet étudiant", "En stockant l'identifiant unique de la classe (ex: class_id) dans l'objet étudiant", "En renommant l'identifiant de l'étudiant", "On ne peut pas lier de données en JSON"],
        a: 1,
        e: "On utilise le concept de clé étrangère : inclure l'identifiant de la ressource liée pour associer les entités."
      },
      {
        id: 91,
        ch: 6,
        q: "Pourquoi la validation des formats de données (ex: s'assurer qu'un email contient un '@') est-elle indispensable côté serveur ?",
        o: ["Pour s'assurer de la cohérence et de l'intégrité de la base de données et éviter des crashs de l'application", "Pour accélérer le rendu du navigateur web", "Pour réduire la consommation électrique du serveur", "Pour compiler le code source en Python"],
        a: 0,
        e: "Le serveur doit être le garant de la qualité des données. La validation prévient les erreurs de traitement futures."
      },
      {
        id: 92,
        ch: 6,
        q: "Qu'est-ce que CORS (Cross-Origin Resource Sharing) ?",
        o: ["Un système de sauvegarde des bases de données", "Un mécanisme de sécurité limitant les requêtes HTTP d'un site web externe vers votre API s'il n'est pas explicitement autorisé", "Un protocole pour compresser les fichiers JSON", "Un serveur de cache pour accélérer les connexions"],
        a: 1,
        e: "CORS empêche les scripts malveillants d'un domaine d'interroger votre API au nom d'un utilisateur sans son accord."
      },
      {
        id: 93,
        ch: 6,
        q: "Pourquoi est-il déconseillé de laisser traîner des clés API ou des mots de passe en clair dans son code source poussé sur Git ?",
        o: ["Parce que Git refuse de pousser le code s'il contient des mots de passe", "Parce que n'importe qui accédant au dépôt Git peut récupérer les clés et pirater vos services", "Parce que cela augmente inutilement la taille des fichiers de code", "Parce que Python ne comprend pas les secrets"],
        a: 1,
        e: "Les dépôts Git sont souvent partagés ou publics. Les secrets doivent être stockés en dehors du code, dans des variables d'environnement."
      },
      {
        id: 94,
        ch: 6,
        q: "À quoi servent les fichiers de logs (journaux d'activité) dans une API en production ?",
        o: ["À générer l'interface utilisateur de l'API", "À enregistrer les requêtes reçues, les erreurs et les comportements suspects pour le débogage et la sécurité", "À stocker la liste des étudiants à la place de la base de données", "À crypter le trafic réseau"],
        a: 1,
        e: "Les logs tracent l'activité de l'API pour analyser les incidents techniques et suivre les accès."
      },
      {
        id: 95,
        ch: 6,
        q: "Qu'est-ce qu'un jeton JWT (JSON Web Token) ?",
        o: ["Un format d'image compressé", "Un jeton compact et sécurisé pour transmettre des informations d'authentification de façon vérifiable entre client et serveur", "Un serveur de base de données en mémoire", "Une balise HTML de sécurité"],
        a: 1,
        e: "Un JWT contient une signature cryptographique permettant au serveur de vérifier l'identité de l'utilisateur sans stocker de session en mémoire."
      },
      {
        id: 96,
        ch: 6,
        q: "Quelle est la première étape recommandée pour concevoir proprement une API Web ?",
        o: ["Coder directement la base de données", "Définir les ressources, les routes associées (méthode et chemin) et le format des données échangées (contrat d'API)", "Écrire les fichiers CSS pour la mise en page", "Acheter un nom de domaine"],
        a: 1,
        e: "La conception des ressources et du contrat d'API (routes, paramètres) permet de clarifier les besoins avant de coder la technique."
      },
      {
        id: 97,
        ch: 6,
        q: "Comment sécuriser une API contre les attaques par force brute sur un endpoint de connexion ?",
        o: ["En désactivant le port 5000", "En mettant en place une limitation du taux de requêtes (rate limiting) pour bloquer les IP abusives", "En interdisant les requêtes en provenance de téléphones mobiles", "En supprimant le mot de passe de l'administrateur"],
        a: 1,
        e: "Le rate limiting restreint le nombre d'appels autorisés dans un intervalle de temps, bloquant les tentatives d'attaque automatisées."
      },
      {
        id: 98,
        ch: 6,
        q: "Quel est l'intérêt de renvoyer des messages d'erreur détaillés (mais non confidentiels) en JSON ?",
        o: ["Permettre au frontend de comprendre l'origine de l'erreur et de l'afficher proprement à l'utilisateur", "C'est obligatoire pour que le serveur HTTP fonctionne", "Pour masquer le problème technique", "Pour forcer le rechargement de la page"],
        a: 0,
        e: "Un JSON d'erreur structuré (ex: `{\"error\": \"email_invalid\"}`) aide le développeur frontend à réagir correctement et à formuler une interface claire."
      },
      {
        id: 99,
        ch: 6,
        q: "Dans Flask, comment intercepter les données JSON invalides (mauvaise syntaxe) envoyées par un client ?",
        o: ["Flask gère cela automatiquement et renvoie par défaut une erreur 400", "Il faut écrire un script en JavaScript côté serveur", "Le serveur plante obligatoirement", "Il faut redémarrer le serveur à chaque erreur"],
        a: 0,
        e: "Flask intercepte l'analyse JSON défectueuse et renvoie une réponse HTTP `400 Bad Request` standard."
      },
      {
        id: 100,
        ch: 6,
        q: "Quelle méthode HTTP est recommandée pour soumettre des filtres complexes ou de gros volumes de paramètres lors d'une recherche sans surcharger l'URL ?",
        o: ["GET", "POST", "DELETE", "OPTIONS"],
        a: 1,
        e: "Bien que GET serve à la lecture, POST est toléré et recommandé si les paramètres de recherche sont trop volumineux pour l'URL, car ils peuvent être envoyés proprement dans le corps de la requête."
      }
    ]
  }
];

courses.push(
  {
    slug: 'erp-si',
    title: 'ERP & SI',
    shortTitle: 'ERP & SI',
    badge: 'ERP',
    icon: 'fa-solid fa-building-columns',
    accentName: 'erp',
    description: 'Cours ERP et systemes d information: SI, processus, integration, modules, deploiements, benefices et defis.',
    colors: { bg: '#11121a', bg2: '#1f1b2e', accent: '#f59e0b', accent2: '#22d3ee', accent3: '#a78bfa' },
    chapters: [
      { title: 'SI et ERP', subtitle: 'Definitions et role dans l organisation.', duration: '40 min', icon: 'fa-solid fa-building', sections: [
        { title: 'Systeme d information', lead: 'Un SI collecte, stocke, traite et diffuse l information aux bonnes personnes au bon moment.', paragraphs: ['Il relie le systeme operant, qui produit et execute, au systeme de pilotage, qui decide et controle.', 'Un bon SI ameliore communication, productivite, relation client et pilotage.'], memo: 'SI = information utile + bon acteur + bon moment.' },
        { title: 'ERP', paragraphs: ['Un ERP centralise les processus d une organisation sur une plateforme partagee: finance, RH, achats, ventes, production, logistique.', 'Son idee centrale est la base de donnees commune: moins de doublons, plus de coherence, mise a jour en temps reel.'], table: { headers: ['Avant ERP', 'Avec ERP'], rows: [['Applications separees', 'Modules connectes'], ['Saisies multiples', 'Donnee unique partagee'], ['Silos', 'Vue transversale']] }, memo: 'ERP = systeme nerveux central de l entreprise.' },
        { title: 'Workflow', paragraphs: ['Un moteur de workflow propage une information entre modules selon des regles definies.', 'Exemple: une commande validee declenche reservation de stock, livraison et facture.'], warning: 'Un ERP n est pas juste un logiciel: c est aussi une organisation des processus.' }
      ] },
      { title: 'Automatisation', subtitle: 'RPA, workflow, IA, Big Data et hyperautomatisation.', duration: '45 min', icon: 'fa-solid fa-robot', sections: [
        { title: 'RPA et workflow', paragraphs: ['La RPA utilise des robots logiciels pour imiter des actions humaines repetitives: lire, saisir, copier, verifier.', 'Le workflow automatise la circulation de taches, documents et informations selon des regles metier.'], memo: 'RPA imite les gestes; workflow organise le flux.' },
        { title: 'Hyperautomatisation', paragraphs: ['L hyperautomatisation combine RPA, IA, Machine Learning, ERP modernes et outils low-code pour automatiser vite les processus metier.', 'Ce n est pas une seule technologie mais une strategie d organisation.'], tip: 'Si plusieurs outils sont orchestres pour automatiser un processus complet, pense hyperautomatisation.' },
        { title: 'Donnees et IA', paragraphs: ['Big Data apporte volume, variete et vitesse. L IA aide a structurer des donnees non structurees. Le Machine Learning apprend des tendances.', 'Dans un ERP moderne, ces technologies renforcent decision, prediction et automatisation.'], warning: 'La technologie seule ne suffit pas: sans processus clair, l automatisation automatise aussi les erreurs.' }
      ] },
      { title: 'Integration du SI', subtitle: 'Point a point, hub, ESB et integration agile.', duration: '45 min', icon: 'fa-solid fa-diagram-project', sections: [
        { title: 'EAI', paragraphs: ['L integration d applications d entreprise connecte des applications differentes par messages.', 'Elle devient necessaire quand plusieurs logiciels doivent partager des donnees en temps reel.'], memo: 'Integration = faire circuler l information sans ressaisie.' },
        { title: 'Modeles', table: { headers: ['Modele', 'Avantage', 'Limite'], rows: [['Point a point', 'Simple au debut', 'Devient vite complexe'], ['Hub-and-spoke', 'Centre commun', 'Point unique de defaillance'], ['ESB', 'Services et standards ouverts', 'Gouvernance parfois rigide'], ['iPaaS', 'Cloud, rapide, flexible', 'Dependance plateforme']] }, paragraphs: ['Le choix depend de la taille, de l agilité attendue et de l existant technique.'] },
        { title: 'Integration agile', paragraphs: ['Les architectures cloud-native et DevOps demandent des integrations plus souples que les anciens bus monolithiques.', 'L objectif est de connecter vite, de maniere evolutive, sans bloquer toute l entreprise.'], warning: 'Un ESB peut resoudre des problemes d integration, mais devenir lui-meme un monolithe.' }
      ] },
      { title: 'Processus metiers', subtitle: 'BPMN, KPI et flux entre services.', duration: '50 min', icon: 'fa-solid fa-arrows-spin', sections: [
        { title: 'Processus metier', paragraphs: ['Un processus metier est une suite d activites connectees produisant un service ou produit pour un client interne ou externe.', 'Il a un objectif clair, des acteurs, des ressources et des indicateurs de performance.'], memo: 'Processus = objectif + activites + acteurs + mesure.' },
        { title: 'BPMN et exemple', paragraphs: ['BPMN aide a visualiser les etapes, decisions, responsabilites et points de blocage.', 'Exemple: reception commande, validation, verification stock, expedition, facturation.'], table: { headers: ['Etape', 'Service'], rows: [['Valider commande', 'Commercial'], ['Verifier stock', 'Stock'], ['Planifier expedition', 'Logistique'], ['Generer facture', 'Comptabilite']] } },
        { title: 'KPI et flux', paragraphs: ['Les KPI mesurent temps de cycle, cout, qualite, taux d erreur ou satisfaction.', 'Les flux peuvent etre verticaux, horizontaux ou transversaux.'], tip: 'Un processus non mesure est difficile a ameliorer.' }
      ] },
      { title: 'Modules ERP', subtitle: 'Finance, RH, achats, ventes, production et supply chain.', duration: '45 min', icon: 'fa-solid fa-puzzle-piece', sections: [
        { title: 'Modules courants', paragraphs: ['Un ERP est une suite de modules qui partagent les memes donnees.', 'Finance, RH, achats, ventes, production, logistique et supply chain sont souvent les points de depart.'], table: { headers: ['Module', 'Role'], rows: [['Finance', 'Comptabilite, reporting, cloture'], ['RH', 'Paie, temps, formation'], ['Achats', 'Demandes, contrats, fournisseurs'], ['Ventes', 'Commandes, facturation, relation client'], ['Supply Chain', 'Stocks, entrepots, transport']] } },
        { title: 'Benefices', paragraphs: ['Un ERP apporte productivite, insights, reporting rapide, risque reduit, SI simplifie et agilite.', 'La valeur vient de la coordination entre modules, pas d un ecran isole.'], memo: 'Base commune = version unique de la realite.' },
        { title: 'Deploiements', paragraphs: ['Cloud: abonnement, maintenance fournisseur, couts initiaux reduits. Sur site: controle fort, maintenance interne. Hybride: combinaison des deux.', 'Le choix depend de la securite, des couts, des competences et de la strategie.'], warning: 'Cloud ne veut pas dire gratuit; sur site ne veut pas dire plus simple.' }
      ] },
      { title: 'Avenir et defis', subtitle: 'Cloud, personnalisation, couts, conduite du changement.', duration: '40 min', icon: 'fa-solid fa-compass', sections: [
        { title: 'Tendances', paragraphs: ['L avenir de l ERP va vers cloud, IA, IoT, analytique, low-code, personnalisation, ERP composable et ERP collaboratif.', 'Les utilisateurs attendent des tableaux de bord adaptes et une experience multi-appareils.'], memo: 'ERP moderne = donnees + automatisation + personnalisation.' },
        { title: 'Defis', paragraphs: ['Les freins majeurs: poids de l organisation, manque de competences numeriques, budget limite, faible implication des dirigeants.', 'Une implementation ERP est autant humaine que technique.'], warning: 'Le plus grand risque n est pas toujours logiciel: c est la resistance organisationnelle.' },
        { title: 'Bonnes pratiques', paragraphs: ['Cartographier les processus, choisir les modules utiles, former les utilisateurs, mesurer les KPI et piloter les changements.', 'Un ERP doit servir une strategie, pas seulement remplacer des fichiers Excel.'], tip: 'Question examen probable: citer benefices et defis d un ERP.' }
      ] }
    ],
    exercises: [
      { title: 'Diagnostiquer un SI en silos', prompt: 'Une entreprise utilise Excel pour les stocks, un logiciel de caisse et une compta separee. Explique les problemes et ce qu un ERP apporte.', terms: ['doublons', 'coherence', 'base', 'temps reel'], solution: 'Problemes: doublons, erreurs de ressaisie, informations incoherentes, reporting lent. ERP: base commune, modules connectes, donnees mises a jour en temps reel, meilleure decision.', explain: 'Le coeur de l ERP est la coherence transversale.' },
      { title: 'Choisir un modele d integration', prompt: 'Compare point a point, hub et ESB pour une PME qui ajoute beaucoup d applications.', terms: ['point a point', 'hub', 'ESB'], solution: 'Point a point: simple mais trop complexe si les applications augmentent. Hub: centralise les connexions mais cree un coeur critique. ESB: standardise les services mais peut devenir rigide.', explain: 'Le bon choix depend de la complexite et de l agilite attendue.' },
      { title: 'Cartographier une commande', prompt: 'Decris le processus commande-stock-livraison-facture avec services et KPI.', terms: ['commercial', 'stock', 'logistique', 'facture', 'KPI'], solution: 'Commercial valide la commande, Stock verifie et reserve, Logistique expedie, Comptabilite facture. KPI: temps de cycle, taux erreur, delai livraison, satisfaction client.', explain: 'Un processus metier se mesure.' },
      { title: 'Modules ERP', prompt: 'Associe finance, RH, achats, ventes et supply chain a leurs roles.', terms: ['finance', 'RH', 'achats', 'ventes', 'supply chain'], solution: 'Finance: comptabilite/reporting. RH: paie/temps. Achats: fournisseurs/contrats. Ventes: commandes/factures. Supply Chain: stocks/transport.', explain: 'Les modules partagent les donnees.' },
      { title: 'Cloud ou sur site', prompt: 'Une PME a peu de budget initial et peu d equipe IT. Quel deploiement recommander ?', terms: ['cloud', 'abonnement', 'maintenance'], solution: 'ERP cloud: cout initial plus faible, abonnement, maintenance et mises a jour gerees par le fournisseur. Il faut toutefois evaluer securite, dependance et cout total.', explain: 'Le cloud simplifie l exploitation mais doit etre gouverne.' }
    ],
    flashcards: [['SI','Collecter, traiter, stocker et diffuser l information.'],['ERP','Plateforme integree pour processus et donnees communes.'],['Workflow','Automatisation d un flux de taches selon des regles.'],['RPA','Robots logiciels pour taches repetitives.'],['EAI','Integration d applications d entreprise.'],['ESB','Bus de services d entreprise.'],['iPaaS','Plateforme cloud d integration.'],['BPMN','Notation pour modeliser les processus.'],['KPI','Indicateur de performance.'],['Cloud ERP','ERP fourni comme service par abonnement.'],['ERP hybride','Partie cloud et partie sur site.'],['Defi ERP','Organisation, competences, budget, direction.']].map(([front, back]) => ({ front, back })),
    memoSections: [{ title: 'Definitions', items: ['SI: information utile au bon moment.', 'ERP: modules + base commune + processus.', 'Workflow: flux automatise.', 'RPA: imitation logicielle de taches humaines.'] }, { title: 'Integration', items: ['Point a point: simple puis fragile.', 'Hub: centre commun mais risque central.', 'ESB: standards et services.', 'iPaaS: integration cloud flexible.'] }, { title: 'Benefices et defis', items: ['Benefices: productivite, reporting, risques reduits, agilite.', 'Defis: resistance, competences, budget, direction.', 'ERP reussi = processus + donnees + conduite du changement.'] }],
    qTopics: [],
    questions: erpQuestions
  },
  {
    slug: 'ingenierie-besoin',
    title: 'Ingenierie du besoin',
    shortTitle: 'Ingenierie du besoin',
    badge: 'REQ',
    icon: 'fa-solid fa-clipboard-list',
    accentName: 'requirements',
    description: 'Cours sur besoins, exigences, elicitation, analyse, SRS, validation, verification et gestion des exigences.',
    colors: { bg: '#0d1220', bg2: '#1d2438', accent: '#a78bfa', accent2: '#34d399', accent3: '#f97316' },
    chapters: [
      { title: 'Besoin vs exigence', subtitle: 'Transformer le flou en critere clair.', duration: '40 min', icon: 'fa-solid fa-question', sections: [
        { title: 'Le besoin', lead: 'Un besoin est souvent vague, latent ou exprime avec des mots generaux.', paragraphs: ['Exemple: je veux une application rapide et facile a utiliser. C est comprehensible, mais pas encore testable.', 'Le besoin exprime un manque ou une attente. Il faut l analyser avant d en faire une exigence.'], memo: 'Besoin = intention encore floue.' },
        { title: 'L exigence', paragraphs: ['Une exigence est une condition precise, documentee et mesurable que le systeme doit satisfaire.', 'Elle sert a concevoir, tester et accepter le produit final.'], code: 'Besoin: le site doit etre rapide.\nExigence: chaque page doit se charger en moins de 2 secondes pour 100 utilisateurs simultanes.', memo: 'Exigence = besoin + mesure + validation.' },
        { title: 'Pourquoi c est critique', paragraphs: ['Une exigence mal definie est une cause majeure d echec projet: couts, delais, qualite et insatisfaction.', 'L ingenierie des exigences evite les malentendus entre metier et technique.'], warning: 'Ne saute pas du besoin a la solution trop vite. D abord le quoi, ensuite le comment.' }
      ] },
      { title: 'Types et qualites', subtitle: 'Classer et bien formuler les exigences.', duration: '45 min', icon: 'fa-solid fa-layer-group', sections: [
        { title: 'Fonctionnelles et non fonctionnelles', paragraphs: ['Une exigence fonctionnelle dit ce que le systeme fait. Une non fonctionnelle dit comment il doit le faire ou quelles contraintes respecter.', 'Performance, securite, ergonomie, maintenabilite et portabilite sont souvent non fonctionnelles.'], table: { headers: ['Type', 'Exemple'], rows: [['Fonctionnelle', 'Le systeme doit permettre de consulter l historique.'], ['Non fonctionnelle', 'L historique doit s afficher en moins de 1,5 seconde.']] }, memo: 'Fonctionnel = quoi. Non fonctionnel = qualite/contrainte.' },
        { title: 'Bonne exigence', paragraphs: ['Une bonne exigence est correcte, atomique, non ambigue, complete, coherente, priorisee, tracable et verifiable.', 'Chaque exigence doit contenir un sujet, un verbe fort et un critere de succes.'], code: 'Le systeme doit permettre a l utilisateur d acceder au solde de son compte en moins de 5 secondes.', tip: 'Phrase complete + doit + mesure = base solide.' },
        { title: 'Pieges', paragraphs: ['Eviter etc., rapide, simple, moderne, intuitif sans mesure.', 'Eviter les exigences multiples reliees par et/ou si elles cachent plusieurs controles.'], warning: 'Une exigence avec "et" contient souvent deux exigences.' }
      ] },
      { title: 'Elicitation', subtitle: 'Faire emerger les vrais besoins.', duration: '50 min', icon: 'fa-solid fa-comments', sections: [
        { title: 'Elicitation active', paragraphs: ['On ne fait pas que ramasser des phrases. On fait emerger ce qui est implicite par questions, ateliers, observation et analyse.', 'Les exigences viennent des parties prenantes, systemes existants, documents, concurrents, lois et normes.'], memo: 'Eliciter = faire sortir ce qui n est pas encore clair.' },
        { title: '4 etapes', table: { headers: ['Etape', 'But'], rows: [['Identifier les sources', 'Qui sait quoi ?'], ['Definir la portee', 'Ce qui est inclus ou exclu'], ['Collecter activement', 'Entretiens, ateliers, questionnaires'], ['Documenter', 'Garder une trace exploitable']] } },
        { title: 'Questions cles', paragraphs: ['Quels objectifs ? Quelles fonctions ? Quel contexte metier ? Quelle utilisation normale et en pic ? Quels risques ?', 'Ces questions paraissent simples, mais elles reduisent les hypotheses cachees.'], tip: 'Demande toujours: pourquoi cette exigence est-elle necessaire ?' }
      ] },
      { title: 'Analyse et negociation', subtitle: 'Resoudre les conflits et prioriser.', duration: '45 min', icon: 'fa-solid fa-scale-balanced', sections: [
        { title: 'Analyser', paragraphs: ['L analyse sert a comprendre, clarifier, classer, detecter les conflits et verifier qu on n oublie rien.', 'Les exigences de sources differentes peuvent se contredire.'], memo: 'Analyser = comprendre + nettoyer + organiser.' },
        { title: 'Negocier', paragraphs: ['Toutes les demandes ne peuvent pas etre satisfaites exactement comme exprimees. On negocie cout, delai, qualite, faisabilite et valeur.', 'Exemple: medecin veut une reponse en moins d une seconde, DSI impose un chiffrement qui ajoute du temps.'], warning: 'Prioriser n est pas supprimer au hasard. C est arbitrer avec les objectifs projet.' },
        { title: 'Prioriser', paragraphs: ['On distingue exigences critiques, importantes et secondaires.', 'Une exigence critique bloque l usage ou la conformite. Une secondaire ameliore le confort mais peut attendre.'], tip: 'Question utile: que se passe-t-il si on ne livre pas cette exigence ?' }
      ] },
      { title: 'SRS et cahier des charges', subtitle: 'Documenter le quoi sans imposer trop tot le comment.', duration: '55 min', icon: 'fa-solid fa-file-lines', sections: [
        { title: 'SRS', paragraphs: ['Le document de specification des exigences est l enonce officiel des besoins auxquels le systeme doit repondre.', 'Il sert de reference commune aux clients, managers, developpeurs, testeurs et mainteneurs.'], memo: 'SRS = contrat de comprehension.' },
        { title: 'Structure', table: { headers: ['Section', 'Role'], rows: [['Introduction', 'Pourquoi le systeme existe'], ['Glossaire', 'Termes techniques'], ['Exigences utilisateur', 'Ce que l utilisateur veut faire'], ['Exigences systeme', 'Comportements detailles'], ['Modeles', 'Use cases, classes, schemas'], ['Annexes', 'Details specifiques']] } },
        { title: 'Deux mini cahiers des charges', paragraphs: ['Exemple 1: application de gestion de taches collaboratives. Besoin: travailler en equipe sans perdre les taches. Exigences: creer, assigner, filtrer, notifier, conserver historique.', 'Exemple 2: application de telemedecine. Besoin: consultation a distance fiable. Exigences: prise de rendez-vous, video, dossier patient, RGPD, disponibilite.'], tip: 'Un cahier des charges utile garde le QUOI lisible avant le COMMENT technique.' }
      ] },
      { title: 'Validation et gestion', subtitle: 'Construire le bon systeme et suivre les changements.', duration: '45 min', icon: 'fa-solid fa-check-double', sections: [
        { title: 'Validation vs verification', paragraphs: ['Validation: construisons-nous le bon systeme ? Verification: construisons-nous correctement le produit ?', 'La verification regarde la conformite, la validation regarde l adequation au besoin reel.'], memo: 'Validation = bon produit. Verification = produit bien construit.' },
        { title: 'Techniques', paragraphs: ['Controle des exigences, matrice de tracabilite, prototypage, conception de tests et revues structurees.', 'Le prototype aide les parties prenantes a voir les problemes avant le developpement complet.'], tip: 'Une exigence testable donne presque deja son test.' },
        { title: 'Gestion des exigences', paragraphs: ['Les exigences changent. Il faut suivre les modifications, relations, dependances et impacts.', 'Une exigence claire, concise et tracable reduit les couts et risques projet.'], warning: 'Sans tracabilite, un changement local peut casser une decision globale.' }
      ] }
    ],
    exercises: [
      { title: 'Transformer un besoin', prompt: 'Transforme "l application doit etre securisee" en exigence mesurable.', terms: ['authentification', 'chiffrement', 'journaliser'], solution: 'Le systeme doit imposer une authentification par compte personnel, chiffrer les donnees sensibles en transit via HTTPS et journaliser toute tentative de connexion echouee.', explain: 'On passe d un adjectif vague a des controles observables.' },
      { title: 'Classer U/S', prompt: 'Classe: "l utilisateur consulte son historique" et "l historique s affiche en moins de 1,5s".', terms: ['utilisateur', 'systeme', '1,5'], solution: 'Utilisateur: consulter son historique. Systeme/non fonctionnelle: affichage en moins de 1,5 seconde.', explain: 'Le premier exprime un service, le second une performance.' },
      { title: 'Sources d exigences', prompt: 'Pour une application de telemedecine, donne 5 sources et une question cle.', terms: ['medecins', 'patients', 'RGPD', 'DSI', 'concurrent'], solution: 'Medecins: quelles infos avant consultation ? Patients: quels usages ? RGPD: quelles donnees sensibles ? DSI: quelle infrastructure ? Concurrent: quelles fonctionnalites manquent ?', explain: 'Les sources couvrent metier, utilisateurs, loi, technique et marche.' },
      { title: 'Cahier des charges taches', prompt: 'Redige 5 exigences pour une application de gestion de taches collaboratives.', terms: ['creer', 'assigner', 'filtrer', 'notification', 'historique'], solution: 'Le systeme doit permettre de creer une tache, assigner une tache a un membre, filtrer par statut, notifier un membre lors d une assignation, conserver l historique des modifications.', explain: 'Les exigences sont fonctionnelles et testables.' },
      { title: 'Cahier des charges telemedecine', prompt: 'Redige 5 exigences dont 2 non fonctionnelles.', terms: ['rendez-vous', 'dossier', 'RGPD', 'disponibilite', 'video'], solution: 'Prendre rendez-vous, consulter dossier patient, lancer une video consultation. Non fonctionnelles: respecter RGPD, disponibilite 99,5 pour cent pendant horaires de consultation.', explain: 'On combine services metier et contraintes qualite.' },
      { title: 'Validation', prompt: 'Explique validation vs verification avec un exemple.', terms: ['bon systeme', 'correctement', 'test'], solution: 'Validation: le systeme correspond-il au besoin du client ? Verification: le systeme respecte-t-il les specifications sans erreur ? Exemple: tester une route est verification, faire confirmer le workflow par le medecin est validation.', explain: 'Les deux sont complementaires.' }
    ],
    flashcards: [['Besoin','Attente generale, parfois floue.'],['Exigence','Condition precise, mesurable et documentee.'],['Fonctionnelle','Ce que le systeme fait.'],['Non fonctionnelle','Qualite ou contrainte du systeme.'],['Elicitation','Faire emerger les besoins caches.'],['Portee','Ce qui est inclus et exclu du projet.'],['SRS','Document officiel des exigences.'],['Validation','Construisons-nous le bon systeme ?'],['Verification','Construisons-nous correctement le produit ?'],['Tracabilite','Suivre origine, liens et changements.'],['Prototype','Simulation pour valider avant de construire.'],['Priorisation','Arbitrer valeur, risque, cout et delai.']].map(([front, back]) => ({ front, back })),
    memoSections: [{ title: 'Regles d or', items: ['Besoin vague -> exigence mesurable.', 'Une exigence = une idee.', 'Eviter rapide, simple, moderne sans critere.', 'Le QUOI avant le COMMENT.'] }, { title: 'Processus IE', items: ['Recueil/elicitation.', 'Analyse et negociation.', 'Documentation/SRS.', 'Validation.', 'Gestion des exigences.'] }, { title: 'Bonne exigence', items: ['Correcte.', 'Atomique.', 'Non ambigue.', 'Complete.', 'Coherente.', 'Priorisee.', 'Tracable.', 'Verifiable.'] }],
    qTopics: [],
    questions: requirementsQuestions
  },
  {
    slug: 'masterclass-apprendre',
    title: 'Masterclass Apprendre a apprendre',
    shortTitle: 'Masterclass',
    badge: 'MC',
    icon: 'fa-solid fa-brain',
    accentName: 'learn',
    description: 'Cours bref et pratique pour mieux apprendre: attention, comprehension, rappel actif, repetition espacee, routines et erreurs a eviter.',
    colors: { bg: '#10131b', bg2: '#1b2333', accent: '#f472b6', accent2: '#fbbf24', accent3: '#38bdf8' },
    chapters: [
      { title: 'Comment le cerveau retient', subtitle: 'Attention, comprehension, encodage, stockage, recuperation.', duration: '25 min', icon: 'fa-solid fa-brain', sections: [
        { title: 'La chaine memoire', lead: 'On retient mieux quand l information passe par attention, comprehension, encodage, stockage et recuperation.', paragraphs: ['Le cerveau ne memorise pas ce a quoi il ne prete pas attention.', 'Comprendre rend la memoire plus solide que reciter sans sens.'], memo: 'A-C-E-S-R: Attention, Comprehension, Encodage, Stockage, Recuperation.' },
        { title: 'Attention', paragraphs: ['Telephone, notifications, bruit, fatigue et stress excessif cassent l attention.', 'Des sessions courtes mais intenses valent mieux qu une longue presence distraite.'], warning: 'Le multitache donne l impression d avancer, mais reduit la memorisation.' },
        { title: 'Recuperation', paragraphs: ['Apprendre, ce n est pas seulement faire entrer l information. C est s entrainer a la ressortir.', 'Lire n est pas apprendre. Se tester est apprendre.'], tip: 'Ferme le cours et explique a voix haute: c est la vraie verification.' }
      ] },
      { title: 'Techniques efficaces', subtitle: 'Rappel actif, repetition espacee et Feynman.', duration: '30 min', icon: 'fa-solid fa-repeat', sections: [
        { title: 'Rappel actif', paragraphs: ['Au lieu de relire, force-toi a retrouver l information sans support.', 'QCM, flashcards, feuille blanche et explication orale renforcent le chemin neuronal.'], memo: 'Relire rassure. Se tester construit.' },
        { title: 'Repetition espacee', paragraphs: ['On revoit a J+0, J+1, J+3, J+7, J+30. Des petites reprises battent le bachotage de derniere minute.', 'Le but est de revoir juste avant l oubli complet.'], code: 'Jour 1: apprendre\nJour 2: revoir\nJour 7: revoir\nJour 15: revoir\nJour 30: revoir' },
        { title: 'Feynman', paragraphs: ['Si tu ne peux pas expliquer simplement, tu n as pas encore compris.', 'Explique a un enfant imaginaire, repere les zones floues, retourne au cours, recommence.'], tip: 'Une definition apprise sans exemple est fragile.' }
      ] },
      { title: 'Memoire visuelle', subtitle: 'Histoires, palais mental et cartes mentales.', duration: '25 min', icon: 'fa-solid fa-map', sections: [
        { title: 'Images mentales', paragraphs: ['Le cerveau retient mieux les histoires, images et experiences que les listes abstraites.', 'Rendre une information bizarre, visuelle ou liee a un lieu aide a la retrouver.'], memo: 'Une histoire colle mieux qu une liste.' },
        { title: 'Palais de memoire', paragraphs: ['Associe les elements a retenir a un lieu familier: entree, salon, cuisine, chambre.', 'Puis parcours mentalement le lieu pour recuperer les idees.'], tip: 'Plus l image est concrete et exageree, plus elle marque.' },
        { title: 'Mind mapping', paragraphs: ['Une carte mentale organise les idees, exemples et relations.', 'Elle aide surtout quand le cours contient beaucoup de concepts relies.'], warning: 'Tout recopier n est pas prendre des notes intelligentes.' }
      ] },
      { title: 'Routine performante', subtitle: 'Avant, pendant, apres le cours.', duration: '25 min', icon: 'fa-solid fa-calendar-check', sections: [
        { title: 'Routine', paragraphs: ['Avant le cours: lire rapidement et noter les inconnues. Pendant: etre actif, poser des questions, prendre des notes intelligentes. Apres: resumer, refaire exercices, creer flashcards.', 'La revision dans les 24h fixe beaucoup mieux le contenu.'], memo: 'Avant: reperer. Pendant: participer. Apres: rappeler.' },
        { title: 'Muscler son cerveau', paragraphs: ['Sommeil, hydratation, activite physique et lecture soutiennent l attention et la memoire.', 'Le cerveau change avec l entrainement: c est la neuroplasticite.'], tip: '20 a 30 minutes de marche peuvent ameliorer concentration et stress.' },
        { title: 'Erreurs qui font echouer', paragraphs: ['Relire passivement, reviser seulement avant l examen, etudier avec distractions, ne pas dormir, apprendre sans pratiquer, ne jamais se tester.', 'La methode compte autant que le temps passe.'], warning: 'Travailler beaucoup mais mal peut donner peu de resultats.' }
      ] }
    ],
    exercises: [
      { title: 'Feuille blanche', prompt: 'Choisis une notion et ecris tout ce que tu sais sans regarder.', terms: ['definition', 'exemple', 'piege'], solution: 'Structure: definition avec tes mots, exemple concret, piege a eviter, question de verification.', explain: 'La feuille blanche force le rappel actif.' },
      { title: 'Planning espace', prompt: 'Cree un planning de revision sur 30 jours.', terms: ['J+1', 'J+7', 'J+30'], solution: 'J+0 apprentissage, J+1 rappel, J+3 flashcards, J+7 exercices, J+15 mini test, J+30 revision finale.', explain: 'L espacement bat le bachotage.' },
      { title: 'Feynman', prompt: 'Explique REST ou useState a un enfant de 10 ans.', terms: ['simple', 'exemple', 'sans jargon'], solution: 'useState, c est comme une petite memoire dans un composant. Quand elle change, React redessine la partie de l ecran qui en depend.', explain: 'Simple ne veut pas dire faux: cela prouve la comprehension.' },
      { title: 'Histoire memoire', prompt: 'Memorise 5 mots avec une mini histoire.', terms: ['histoire', 'image', 'ordre'], solution: 'Un parapluie geant porte un elephant qui mange du fromage en jouant de la guitare dans une fusee.', explain: 'L ordre vient de l histoire.' },
      { title: 'Anti-distraction', prompt: 'Cree une routine de 25 minutes de concentration.', terms: ['telephone', 'objectif', 'pause'], solution: 'Telephone loin, objectif unique ecrit, 25 minutes focus, 5 minutes pause, puis rappel actif de 2 minutes.', explain: 'La concentration se prepare.' }
    ],
    flashcards: [['Attention','Le cerveau ne retient pas ce qu il ignore.'],['Comprehension','On retient mieux ce qu on comprend.'],['Encodage','Transformer l information en trace memoire.'],['Rappel actif','Se tester sans regarder.'],['Repetition espacee','Revoir avec intervalles progressifs.'],['Feynman','Expliquer simplement pour verifier la comprehension.'],['Mind map','Organiser visuellement les relations.'],['Palais mental','Associer des idees a un lieu familier.'],['Neuroplasticite','Le cerveau se modifie avec l entrainement.'],['Erreur','Relire passivement sans se tester.']].map(([front, back]) => ({ front, back })),
    memoSections: [{ title: '5 etapes memoire', items: ['Attention.', 'Comprehension.', 'Encodage.', 'Stockage.', 'Recuperation.'] }, { title: 'Techniques gagnantes', items: ['Rappel actif.', 'Repetition espacee.', 'Feynman.', 'Images mentales.', 'Mind mapping.'] }, { title: 'Routine', items: ['Avant: survol et inconnues.', 'Pendant: notes actives.', 'Apres 24h: resume + exercices + flashcards.', 'Sommeil et pauses comptent.'] }],
    qTopics: [],
    questions: masterclassQuestions
  }
);

function fillGenericTopics(course, concepts) {
  course.qTopics = concepts.map(([label, correct, ch]) => ({
    label,
    correct,
    ch,
    wrongs: ['Une reponse vague non mesurable', 'Un detail sans lien avec le cours', 'Une confusion frequente a eviter'],
    explain: correct
  }));
}

fillGenericTopics(courses.find((c) => c.slug === 'erp-si'), [
  ['systeme d information', 'Un SI collecte, traite, stocke et diffuse l information utile.', 1],
  ['ERP', 'Un ERP integre les processus autour de modules et d une base commune.', 1],
  ['base commune', 'La base commune reduit doublons et incoherences.', 1],
  ['workflow', 'Un workflow automatise la circulation des taches selon des regles.', 1],
  ['RPA', 'La RPA imite des taches humaines repetitives avec des robots logiciels.', 2],
  ['hyperautomatisation', 'L hyperautomatisation orchestre plusieurs technologies pour automatiser des processus.', 2],
  ['Big Data', 'Le Big Data apporte volume, variete et vitesse de donnees.', 2],
  ['Machine Learning', 'Le Machine Learning apprend des tendances a partir des donnees.', 2],
  ['EAI', 'L EAI connecte des applications d entreprise par messages.', 3],
  ['point a point', 'Le point a point devient complexe quand les applications augmentent.', 3],
  ['hub and spoke', 'Le hub centralise les connexions mais peut devenir point de defaillance.', 3],
  ['ESB', 'L ESB propose des services d integration bases sur des standards.', 3],
  ['processus metier', 'Un processus metier enchaine des activites pour livrer une valeur.', 4],
  ['BPMN', 'BPMN visualise activites, decisions et responsabilites.', 4],
  ['KPI', 'Un KPI mesure la performance d un processus.', 4],
  ['flux transversaux', 'Les flux transversaux traversent plusieurs services et niveaux.', 4],
  ['module finance', 'Le module finance gere comptabilite, reporting et cloture.', 5],
  ['ERP cloud', 'L ERP cloud est fourni via Internet sous forme de service.', 5],
  ['ERP hybride', 'L ERP hybride combine cloud et sur site.', 5],
  ['defis ERP', 'Les defis ERP incluent organisation, competences, budget et implication dirigeante.', 6]
]);

fillGenericTopics(courses.find((c) => c.slug === 'ingenierie-besoin'), [
  ['besoin', 'Un besoin est une attente generale souvent floue.', 1],
  ['exigence', 'Une exigence est precise, mesuree, documentee et testable.', 1],
  ['besoin rapide', 'Rapide doit devenir un temps maximal mesurable.', 1],
  ['quoi vs comment', 'On clarifie le quoi avant de choisir le comment technique.', 1],
  ['exigence fonctionnelle', 'Elle decrit un service que le systeme doit fournir.', 2],
  ['exigence non fonctionnelle', 'Elle decrit une qualite ou contrainte du systeme.', 2],
  ['exigence atomique', 'Une exigence atomique exprime une seule idee.', 2],
  ['exigence verifiable', 'Une exigence verifiable peut etre controlee par test ou inspection.', 2],
  ['elicitation', 'L elicitation fait emerger activement les besoins caches.', 3],
  ['sources d exigences', 'Les sources incluent parties prenantes, documents, systemes, concurrents et normes.', 3],
  ['portee', 'La portee precise ce qui est inclus et exclu du projet.', 3],
  ['questions cles', 'Les questions cles portent sur objectifs, usages, fonctions, contexte et risques.', 3],
  ['analyse', 'L analyse clarifie, classe et detecte les conflits.', 4],
  ['negociation', 'La negociation arbitre valeur, cout, delai, qualite et faisabilite.', 4],
  ['priorisation', 'La priorisation distingue critique, important et secondaire.', 4],
  ['SRS', 'Le SRS est le document officiel des exigences.', 5],
  ['cahier des charges', 'Le cahier des charges decrit le quoi attendu du systeme.', 5],
  ['validation', 'La validation demande si on construit le bon systeme.', 6],
  ['verification', 'La verification demande si on construit correctement le produit.', 6],
  ['tracabilite', 'La tracabilite suit l origine, les liens et les changements des exigences.', 6]
]);

fillGenericTopics(courses.find((c) => c.slug === 'masterclass-apprendre'), [
  ['attention', 'Le cerveau memorise mal ce a quoi il ne prete pas attention.', 1],
  ['comprehension', 'On retient mieux ce qu on comprend vraiment.', 1],
  ['encodage', 'L encodage transforme l information en trace memoire.', 1],
  ['recuperation', 'Recuperer sans support renforce l apprentissage.', 1],
  ['rappel actif', 'Le rappel actif consiste a se tester au lieu de relire.', 2],
  ['repetition espacee', 'La repetition espacee repartit les revisions dans le temps.', 2],
  ['J plus 7', 'Une revision a J+7 aide a lutter contre l oubli.', 2],
  ['Feynman', 'La methode Feynman verifie si on peut expliquer simplement.', 2],
  ['image mentale', 'Une image concrete aide a retenir une notion abstraite.', 3],
  ['palais de memoire', 'Le palais de memoire associe des idees a un lieu familier.', 3],
  ['mind map', 'Une mind map montre les relations entre idees.', 3],
  ['prise de note', 'Une bonne note garde idees cles, exemples et relations.', 3],
  ['routine avant cours', 'Avant le cours, on survole et repere les notions inconnues.', 4],
  ['routine apres cours', 'Apres le cours, on resume, teste et cree des flashcards.', 4],
  ['sommeil', 'Le sommeil consolide la memoire.', 4],
  ['neuroplasticite', 'Le cerveau evolue avec l entrainement.', 4],
  ['groupe de travail', 'Un groupe efficace interroge, explique et motive.', 4],
  ['erreur relire', 'Relire passivement donne une illusion de maitrise.', 4],
  ['multitache', 'Le multitache reduit fortement la memorisation.', 1],
  ['pratique', 'Apprendre sans pratiquer reste fragile.', 4]
]);

for (const course of courses) {
  const dir = path.join(ROOT, course.slug);
  const bank = course.questions ? course.questions : buildQuestions(course);
  writeFile(path.join(dir, 'assets/css/style.css'), styleCss(course));
  writeFile(path.join(dir, 'assets/js/main.js'), mainJs());
  writeFile(path.join(dir, 'assets/js/qcm-page.js'), qcmPageJs());
  writeFile(path.join(dir, 'qcm-100.js'), `window.COURSE_QCM = ${JSON.stringify(bank, null, 2)};\n`);
  writeFile(path.join(dir, 'index.html'), indexPage(course));
  course.chapters.forEach((chapter, index) => {
    writeFile(path.join(dir, `chapitres/chapitre${index + 1}.html`), chapterPage(course, chapter, index, bank));
  });
  writeFile(path.join(dir, 'chapitres/exercices.html'), exercisesPage(course));
  writeFile(path.join(dir, 'chapitres/flashcards.html'), flashcardsPage(course));
  writeFile(path.join(dir, 'chapitres/fiche-memo.html'), memoPage(course));
  writeFile(path.join(dir, 'qcm-100.html'), qcmPage(course));
}

console.log(`Generated ${courses.length} B2 semester 2 courses.`);
