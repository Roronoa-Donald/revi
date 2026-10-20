/**
 * scripts/course-kit.js — gabarit « 19/20 » d'un cours B1.
 *
 * Bibliothèque sans effet de bord : elle transforme les données d'un cours
 * (`server/content/<cours>.js`) en pages HTML. Un seul rendu pour tous les
 * cours, comme `scripts/generate-code-labs.js` l'est pour les ateliers : la
 * moindre divergence entre deux cours deviendrait une incohérence visible.
 *
 * Ce que le kit produit :
 *   - la coquille de page (en-tête, barre de navigation, pied de page) avec les
 *     chemins relatifs calculés depuis l'emplacement du fichier ;
 *   - le gabarit d'un chapitre : mise en situation, objectifs, sections,
 *     ateliers (injectés ensuite), QCM, erreurs classiques, méthodologie,
 *     révision active, test de maîtrise, navigation ;
 *   - les briques répétitives : QCM, cartes de révision, encadrés ;
 *   - la feuille de style et le script du cours, depuis `templates/`.
 *
 * Les couleurs viennent du cours ; elles doivent garder un contraste AA sur
 * blanc (l'accent sert aussi de fond au bouton principal, texte blanc).
 */
const fs = require('fs');
const path = require('path');

const SPRITE = '/assets/img/ui-icons.svg';
const TEMPLATES = path.join(__dirname, 'templates');

/* ======================== Utilitaires ======================== */

function esc(value) {
  return String(value === undefined || value === null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Icône du sprite SVG commun (voir /assets/img/ui-icons.svg). */
function ic(name) {
  return '<svg class="ic" aria-hidden="true" focusable="false"><use href="' + SPRITE + '#i-' + name + '"></use></svg>';
}

/** Préfixe relatif (« » ou « ../ ») pour une page située à `pagePath`. */
function prefix(pagePath) {
  const depth = pagePath.split('/').length - 1;
  return '../'.repeat(depth);
}

/* ======================== Feuille de style et script ======================== */

function renderCss(course) {
  return fs.readFileSync(path.join(TEMPLATES, 'cours.css'), 'utf8')
    .replace(/__S__/g, course.slug)
    .replace(/__A__/g, course.accent)
    .replace(/__AD__/g, course.accentDeep)
    .replace(/__AS__/g, course.accentSoft)
    .replace(/__BD__/g, course.accentBorder);
}

function renderJs(course) {
  return fs.readFileSync(path.join(TEMPLATES, 'cours.js'), 'utf8')
    .replace(/__STORE__/g, course.storeKey);
}

/* ======================== Coquille de page ======================== */

const FONTS = [
  '<link rel="preconnect" href="https://fonts.googleapis.com">',
  '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
  '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap">'
];

/** Entrées de navigation, dans l'ordre, pour un cours donné. */
function navItems(course) {
  const items = [{ key: 'sommaire', label: 'Sommaire', path: 'sommaire.html' }];
  for (const ch of course.chapters) {
    items.push({ key: 'ch' + ch.n, label: 'Ch. ' + ch.n, path: 'chapitres/chapitre' + ch.n + '.html' });
  }
  items.push({ key: 'cartes', label: 'Cartes', path: 'chapitres/cartes.html' });
  items.push({ key: 'formules', label: 'Mémo', path: 'chapitres/formules.html' });
  items.push({ key: 'exercices', label: 'Exercices', path: 'exercices/exercices.html' });
  items.push({ key: 'atelier', label: 'Atelier', path: 'atelier.html' });
  items.push({ key: 'examen', label: 'Examen', path: 'chapitres/simulateur-examen.html' });
  return items;
}

/**
 * Page complète du cours.
 * @param {object} course configuration du cours (slug, brand, brandIcon, chapters…)
 * @param {string} pagePath chemin du fichier, relatif à la racine du cours
 * @param {object} opts { title, description, active, body, dataChapter }
 */
function page(course, pagePath, opts) {
  const p = prefix(pagePath);
  const nav = navItems(course)
    .map(item => '    <a href="' + p + item.path + '"' + (item.key === opts.active ? ' class="is-active"' : '') + '>' + item.label + '</a>')
    .join('\n');

  const bodyAttr = opts.dataChapter ? ' data-chapter="' + opts.dataChapter + '"' : '';

  return [
    '<!DOCTYPE html>',
    '<html lang="fr">',
    '<head>',
    '<meta charset="UTF-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
    '<title>' + esc(opts.title) + '</title>',
    '<meta name="description" content="' + esc(opts.description) + '">',
    '<link rel="canonical" href="https://revi-mu.vercel.app/' + encodeURI(course.id) + '/' + pagePath + '">',
    '<meta property="og:title" content="' + esc(opts.title) + '">',
    '<meta property="og:description" content="' + esc(opts.description) + '">',
    '<meta property="og:type" content="article">',
    '<meta name="twitter:card" content="summary">',
    '<link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">',
    ...FONTS,
    '<link rel="stylesheet" href="/assets/css/tokens.css">',
    '<link rel="stylesheet" href="' + p + 'assets/css/cours.css">',
    '<link rel="stylesheet" href="/assets/css/code-lab.css">',
    '<link rel="stylesheet" href="/assets/vendor/katex/katex.min.css">',
    '<script src="/assets/js/theme.js"></script>',
    ...(opts.extraHead || []),
    '</head>',
    '<body' + bodyAttr + '>',
    '',
    '<nav class="skip-nav" aria-label="Accès rapide"><a href="#content" class="skip-link">Aller au contenu</a></nav>',
    '',
    '<nav class="' + course.slug + 'nav"><div class="' + course.slug + 'nav__in">',
    '  <a class="' + course.slug + 'nav__home" href="/" title="Accueil — Tous les portails" aria-label="Accueil — Tous les portails">' + ic('house') + ' <span>Portail</span></a>',
    '  <span class="' + course.slug + 'nav__sep" aria-hidden="true">/</span>',
    '  <a class="' + course.slug + 'nav__brand" href="' + p + 'index.html">' + ic(course.brandIcon) + ' ' + esc(course.brand) + '</a>',
    '  <div class="' + course.slug + 'nav__links">',
    nav,
    '  </div>',
    '  <div class="' + course.slug + 'nav__actions">',
    '    <button type="button" class="theme-toggle" id="themeToggle" aria-label="Activer le mode sombre" title="Basculer le thème clair / sombre">',
    '      <svg class="theme-toggle__sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>',
    '      <svg class="theme-toggle__moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>',
    '    </button>',
    '  </div>',
    '</div></nav>',
    '',
    '<main id="content" class="' + course.slug + 'wrap">',
    opts.body,
    '</main>',
    '',
    '<script src="' + p + 'assets/js/cours.js"></script>',
    '<script src="/assets/vendor/katex/katex.min.js" defer></script>',
    '<script src="/assets/vendor/katex/auto-render.min.js" defer></script>',
    '<script>',
    '  document.addEventListener("DOMContentLoaded", function() {',
    '    function initMath() {',
    '      if (typeof renderMathInElement === "function") {',
    '        renderMathInElement(document.body, {',
    '          delimiters: [',
    '            {left: "$$", right: "$$", display: true},',
    '            {left: "\\\\[", right: "\\\\]", display: true},',
    '            {left: "$", right: "$", display: false},',
    '            {left: "\\\\(", right: "\\\\)", display: false}',
    '          ],',
    '          ignoredTags: ["script", "noscript", "style", "textarea", "pre", "code"],',
    '          throwOnError: false',
    '        });',
    '      } else {',
    '        setTimeout(initMath, 50);',
    '      }',
    '    }',
    '    initMath();',
    '  });',
    '</script>',
    '<script src="/assets/js/code-lab.js" defer></script>',
    ...(opts.extraScripts || []).map(src => '<script src="' + src + '" defer></script>'),
    '</body>',
    '</html>',
    ''
  ].join('\n');
}

/* ======================== Briques ======================== */

/** Fil d'Ariane : `PHP B1 › Sommaire › Chapitre 1`. */
function crumb(course, parts) {
  const links = parts.map(part => part.href
    ? '<a href="' + part.href + '">' + part.label + '</a>'
    : part.label);
  return '<p class="crumb">' + links.join(' › ') + '</p>';
}

/** Métadonnées de tête de chapitre. */
function tags(list) {
  return '<div class="chapmeta">\n' + list
    .map(tag => '    <span class="tag' + (tag.cls ? ' ' + tag.cls : '') + '">' + tag.label + '</span>')
    .join('\n') + '\n  </div>';
}

/** Encadré pédagogique : `box`, `box--objectifs`, `box--pitfall`… */
function box(kind, title, iconName, inner) {
  if (inner === undefined) {
    inner = iconName;
    iconName = (kind === 'warning' || kind === 'pitfall') ? 'warning'
      : (kind === 'solution') ? 'check'
      : (kind === 'method') ? 'compass'
      : 'info';
  }
  return [
    '  <div class="box box--' + kind + '">',
    '    <div class="box__title">' + ic(iconName) + ' ' + title + '</div>',
    inner,
    '  </div>'
  ].join('\n');
}

/** QCM interactif (corrigé par `assets/js/cours.js`). */
function qcm(questions, opts) {
  if (!Array.isArray(questions)) return '';
  const rows = questions.map(q => {
    const rawOpts = q.opts || q.choices || q.options || [];
    const options = rawOpts.map((label, index) =>
      '        <button class="opt"' + (index === q.correct ? ' data-correct="1"' : '') + '>' + label + '</button>'
    ).join('\n');
    return [
      '    <div class="q">',
      '      <p class="q__stem">' + (q.stem || q.q || '') + '</p>',
      '      <div class="opts">',
      options,
      '      </div>',
      '      <div class="q__exp">' + (q.exp || q.explanation || '') + '</div>',
      '    </div>'
    ].join('\n');
  }).join('\n');

  return '<div class="qcm"' + (opts && opts.mastery ? ' data-mastery="1"' : '') + '>\n' + rows + '\n  </div>';
}

/**
 * Cartes de révision. `modules` = [{ title, items: [{ q, a }] }].
 */
function cards(modules) {
  return modules.map(module => [
    '  <h2>' + module.title + '</h2>',
    '  <div class="cards">',
    module.items.map(card =>
      '    <div class="fc"><div class="fc__in"><div class="fc__face"><b>Question</b>' + card.q +
      '</div><div class="fc__face fc__back"><b>Réponse</b>' + card.a + '</div></div></div>'
    ).join('\n'),
    '  </div>',
    ''
  ].join('\n')).join('\n');
}

/** Bandeau de paliers de maîtrise. */
function bands(rows) {
  if (!rows || !Array.isArray(rows)) return '';
  return '<div class="bands">\n' + rows
    .map(row => {
      const cls = row.cls ? ' bandrow--' + row.cls : '';
      const text = row.text || (row.title ? '<strong>' + row.title + ' :</strong> ' + (row.desc || '') : '') || row;
      return '      <div class="bandrow' + cls + '">' + text + '</div>';
    })
    .join('\n') + '\n    </div>';
}

/* ======================== Chapitre ======================== */

/**
 * Corps d'une page de chapitre, au gabarit complet.
 *
 * L'ordre est celui qui compte : théorie, puis ateliers (insérés par
 * `scripts/generate-code-labs.js` juste avant l'ancre QCM), puis évaluation,
 * remédiation, révision et auto-contrôle.
 */
function chapter(course, ch) {
  const out = [];

  out.push(crumb(course, [
    { href: '../index.html', label: course.brand },
    { href: '../sommaire.html', label: 'Sommaire' },
    { label: 'Chapitre ' + ch.n }
  ]));
  out.push('<h1>Chapitre ' + ch.n + ' — ' + ch.title + '</h1>');

  const meta = [{ label: 'Module ' + ch.n }];
  if (ch.time) meta.push({ label: ch.time, cls: 'tag--time' });
  meta.push(ch.free
    ? { label: 'Accès libre', cls: 'tag--time' }
    : { label: ch.lockLabel || 'Réservé B1 et plus', cls: 'tag--time' });
  out.push(tags(meta));

  out.push(box('situation', 'Mise en situation', 'play', '    <p>' + ch.situation + '</p>'));
  out.push(box('objectifs', 'Objectifs pédagogiques', 'target',
    '    <p>À la fin de ce chapitre, tu seras capable de :</p>\n    <ol>\n' +
    ch.objectives.map(o => '      <li>' + o + '</li>').join('\n') + '\n    </ol>'));

  // Sections numérotées 1..N
  ch.sections.forEach((section, index) => {
    out.push('<h2>' + (index + 1) + '. ' + section.title + '</h2>');
    out.push(section.html);
  });

  const qcmNumber = ch.sections.length + 1;

  // Ancre attendue par scripts/generate-code-labs.js : deux espaces devant <h2>.
  out.push('  <h2>' + qcmNumber + '. ' + (ch.qcmTitle || 'QCM — niveau examen') + '</h2>');
  out.push('  ' + qcm(ch.questions));

  out.push('<h2>' + (qcmNumber + 1) + '. Erreurs classiques — récapitulatif</h2>');
  out.push(box('pitfall', ch.pitfallTitle || 'À reconnaître en examen', 'warning',
    '    <ul>\n' + ch.pitfalls.map(item => '      <li>' + item + '</li>').join('\n') + '\n    </ul>'));

  out.push('<h2>' + (qcmNumber + 2) + '. Méthodologie de résolution</h2>');
  out.push(box('method', ch.methodTitle || 'Démarche d’ingénierie pas à pas', 'compass',
    '    <ol>\n' + ch.method.map(item => '      <li>' + item + '</li>').join('\n') + '\n    </ol>'));

  out.push('<h2>' + (qcmNumber + 3) + '. Révision active</h2>');
  out.push([
    '  <div class="box box--revision">',
    '    <div class="box__title">' + ic('pin') + ' Résumé essentiel</div>',
    '    <ul>',
    ch.summary.map(item => '      <li>' + item + '</li>').join('\n'),
    '    </ul>',
    '    <h3>Checklist de maîtrise</h3>',
    '    <ul class="check">',
    ch.checklist.map(item => '      <li>' + item + '</li>').join('\n'),
    '    </ul>',
    '    <h3>Les 8 notions à connaître absolument</h3>',
    '    <ol>',
    '      ' + ch.notions.map(n => '<li>' + (typeof n === 'string' ? n : '<strong>' + (n.term || n.title || '') + ' :</strong> ' + (n.def || n.desc || n.definition || '')) + '</li>').join(''),
    '    </ol>',
    '    <p><a class="btn" href="cartes.html">' + ic('cards') + ' Réviser avec les flashcards</a>',
    '       <a class="btn" href="formules.html">' + ic('file') + ' Mémo syntaxe</a></p>',
    '  </div>'
  ].join('\n'));

  out.push('<h2>' + (qcmNumber + 4) + '. Test de maîtrise</h2>');
  out.push([
    '  <div class="box box--tech">',
    '    <div class="box__title">' + ic('chart') + ' Comment t\'auto-évaluer</div>',
    '    <p>' + (ch.masteryIntro || 'Le QCM ci-dessus est un test de maîtrise. Lis ton pourcentage :') + '</p>',
    '    ' + bands(ch.mastery),
    '    <p style="margin-top:12px"><label class="checkbox"><input type="checkbox" data-mark-done> <span>Je considère ce chapitre maîtrisé (≥ 95 % au test de maîtrise).</span></label></p>',
    '  </div>'
  ].join('\n'));

  if (ch.extra) out.push(ch.extra);

  const nav = ['  <div class="chnav">'];
  nav.push('    <a class="btn" href="../sommaire.html">' + ic('arrow-left') + ' Sommaire</a>');
  if (ch.next) {
    nav.push('    <a class="btn btn--primary" href="' + ch.next.href + '">' + ch.next.label + ' ' + ic('arrow-right') + '</a>');
  }
  nav.push('  </div>');
  out.push(nav.join('\n'));

  out.push('  <p class="disclaimer">Objectif de maîtrise 19/20 — ta note réelle dépend aussi de ton travail.\n  Sources : ' + course.sources + '.</p>');

  return out.join('\n\n');
}

/** Bloc ou formule mathématique KaTeX */
function math(tex, isBlock = true) {
  if (isBlock) {
    return '  <div class="math-block">$$' + tex + '$$</div>';
  }
  return '$' + tex + '$';
}

module.exports = {
  SPRITE,
  esc,
  ic,
  prefix,
  page,
  crumb,
  tags,
  box,
  qcm,
  cards,
  bands,
  chapter,
  math,
  navItems,
  renderCss,
  renderJs
};
