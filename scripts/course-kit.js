/**
 * scripts/course-kit.js — gabarit « 19/20 » d'un cours B1/B2/B3.
 *
 * Bibliothèque sans effet de bord : elle transforme les données d'un cours
 * (`server/content/<cours>.js`) en pages HTML. Un seul rendu pour tous les
 * cours, comme `scripts/generate-code-labs.js` l'est pour les ateliers : la
 * moindre divergence entre deux cours deviendrait une incohérence visible.
 */
const fs = require('fs');
const path = require('path');

const SPRITE = '/assets/img/ui-icons.svg';
const TEMPLATES = path.join(__dirname, 'templates');
const ROOT_DIR = path.resolve(__dirname, '..');

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

/** Résout sur le disque le vrai chemin d'une page transverse du cours. */
function resolveCoursePath(courseId, candidates) {
  if (!courseId) return candidates[0];
  for (const rel of candidates) {
    if (fs.existsSync(path.join(ROOT_DIR, courseId, rel))) return rel;
  }
  return candidates[0];
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
  items.push({
    key: 'exercices',
    label: 'Exercices',
    path: resolveCoursePath(course.id, ['exercices/exercices.html', 'chapitres/exercices.html'])
  });
  items.push({ key: 'atelier', label: 'Atelier', path: 'atelier.html' });
  items.push({
    key: 'examen',
    label: 'Examen',
    path: resolveCoursePath(course.id, [
      'chapitres/simulateur-examen.html',
      'chapitres/examens.html',
      'chapitres/examen-blanc.html',
      'simulateur-examen.html'
    ])
  });
  return items;
}

/** Normalise les liens relatifs et replie les corrigés d'examen dans une page générée. */
function normalizePageBody(course, pagePath, rawBody) {
  let body = Array.isArray(rawBody) ? rawBody.join('\n') : String(rawBody || '');

  // Nettoyer toute virgule parasite résiduelle entre balises HTML (ex: </p>,<ul>,<li>)
  body = body.replace(/(<\/(?:p|ul|ol|li|div|table)>)\s*,\s*(<(?:p|ul|ol|li|div|table)\b)/g, '$1\n$2');
  body = body.replace(/(<(?:ul|ol)>)\s*,\s*(<li\b)/g, '$1\n$2');

  const realExPath = course && course.id
    ? resolveCoursePath(course.id, ['exercices/exercices.html', 'chapitres/exercices.html'])
    : 'exercices/exercices.html';
  const realExamPath = course && course.id
    ? resolveCoursePath(course.id, ['chapitres/simulateur-examen.html', 'chapitres/examens.html', 'chapitres/examen-blanc.html', 'simulateur-examen.html'])
    : 'chapitres/simulateur-examen.html';

  if (pagePath === 'index.html' || pagePath === 'sommaire.html' || pagePath === 'atelier.html') {
    body = body.replace(/href="exercices\/exercices\.html"/g, 'href="' + realExPath + '"');
    body = body.replace(/href="chapitres\/simulateur-examen\.html"/g, 'href="' + realExamPath + '"');
  } else if (pagePath.startsWith('chapitres/')) {
    body = body.replace(/href="chapitres\/chapitre(\d+\.html[^"]*)"/g, 'href="chapitre$1"');
    body = body.replace(/href="exercices\/exercices\.html"/g, 'href="../' + realExPath + '"');
    if (realExPath === 'exercices/exercices.html') {
      body = body.replace(/href="exercices\.html"/g, 'href="../exercices/exercices.html"');
    }
    const relExamFromChap = realExamPath.startsWith('chapitres/') ? realExamPath.slice('chapitres/'.length) : ('../' + realExamPath);
    body = body.replace(/href="(?:\.\.\/chapitres\/)?simulateur-examen\.html"/g, 'href="' + relExamFromChap + '"');
  } else if (pagePath.startsWith('exercices/')) {
    body = body.replace(/href="chapitre(\d+\.html[^"]*)"/g, 'href="../chapitres/chapitre$1"');
    body = body.replace(/href="(?:\.\.\/chapitres\/)?simulateur-examen\.html"/g, 'href="../' + realExamPath + '"');
  }

  // Replier les corrigés .box--solution sur les pages d'examen s'ils ne sont pas déjà dans <details>
  if (/(?:examens|examen-blanc|simulateur-examen)\.html$/.test(pagePath) && body.includes('box--solution') && !body.includes('<details')) {
    body = body.replace(
      /<div class="box box--solution">([\s\S]*?)<\/div>\s*<\/div>/g,
      (match) => '<details class="exam-sol"><summary class="btn">' + ic('check') + ' Afficher le corrigé officiel et le barème (après avoir composé)</summary>\n' + match + '\n</details>'
    );
  }


  // Harmonisation du registre d'adresse (suppression des tutoiements de gabarit et de bandeaux)
  body = body
    .replace(/À la fin de ce chapitre,\s*tu seras capable de\s*:/gi, 'Objectifs visés à l’issue de ce chapitre :')
    .replace(/Comment t['’]auto-évaluer/gi, 'Grille d’auto-évaluation')
    .replace(/ton QCM de compréhension et ta checklist sont combinés/gi, 'le QCM de compréhension et la checklist sont combinés')
    .replace(/Lis ton pourcentage/gi, 'Interprétation du score obtenu')
    .replace(/ta note réelle dépend aussi de ton travail/gi, 'la maîtrise réelle dépend de la régularité du travail personnel')
    .replace(/(<div class="bandrow[^>]*>[\s\S]*?)\btu\s+(?:maîtrises|distingues|résous|choisis|conditionnes|traites|standardises|lis et affiches|factorises et tu utilises|cycles|cloisonnes|qualifies|analyses|évalues|gères|possèdes|as acquis|peux)\b/gi, '$1maîtrise confirmée :')
    .replace(/(<div class="bandrow[^>]*>[\s\S]*?)\btes classes ont\b/gi, '$1les classes ont')
    .replace(/(<div class="bandrow[^>]*>[\s\S]*?)\btraque les barbarismes dans tes mails\b/gi, '$1chasser les barbarismes dans les courriels')
    .replace(/\bEntraîne-toi\b/gi, 'S’entraîner')
    .replace(/\bAssure-toi\b/gi, 'Vérifier')
    .replace(/félicitations,\s*tu domines/gi, 'maîtrise complète de')
    .replace(/et assure-toi de pouvoir/gi, 'pour valider chaque étape et');

  return body;
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
  const bodyHtml = normalizePageBody(course, pagePath, opts.body);

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
    bodyHtml,
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
let _lastCourseId = null;
const _extraCardsMap = (() => {
  try {
    return JSON.parse(fs.readFileSync(path.join(__dirname, 'notions-cards-extra.json'), 'utf8'));
  } catch (_) {
    return {};
  }
})();

function crumb(course, parts) {
  if (course && course.id) _lastCourseId = course.id;
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
  const content = Array.isArray(inner) ? inner.join('\n') : inner;
  const renderedBox = [
    '  <div class="box box--' + kind + '">',
    '    <div class="box__title">' + ic(iconName) + ' ' + title + '</div>',
    content,
    '  </div>'
  ].join('\n');

  if (kind === 'solution') {
    return [
      '  <details class="exam-sol">',
      '    <summary class="btn">' + ic(iconName) + ' Afficher le corrigé officiel et le barème — ' + title + '</summary>',
      renderedBox,
      '  </details>'
    ].join('\n');
  }
  return renderedBox;
}

/** QCM interactif (corrigé par `assets/js/cours.js`). */
function qcm(questions, opts) {
  if (!Array.isArray(questions)) return '';
  const rows = questions.map(q => {
    const rawOpts = q.opts || q.choices || q.options || [];
    const correctIdx = typeof q.correct === 'number' ? q.correct : q.answer;
    const options = rawOpts.map((label, index) =>
      '        <button class="opt"' + (index === correctIdx ? ' data-correct="1"' : '') + '>' + label + '</button>'
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
  const globalSeenQuestions = new Set();
  const courseExtra = (_lastCourseId && _extraCardsMap[_lastCourseId]) || {};
  return modules.map((module, modIdx) => {
    const rawItems = Array.isArray(module.items) ? module.items : (Array.isArray(module.cards) ? module.cards : []);
    const items = [];
    for (const c of rawItems) {
      let normQ = String(c.q || '').replace(/^(Synthèse|Approfondissement)\s*[—–-]\s*/i, '').trim();
      if (!normQ) continue;
      let key = normQ.replace(/\s+/g, ' ').toLowerCase();
      if (globalSeenQuestions.has(key)) {
        normQ = normQ.replace(/\s*\?$/, '') + ' (Ch. ' + (modIdx + 1) + ') ?';
        key = normQ.replace(/\s+/g, ' ').toLowerCase();
        if (globalSeenQuestions.has(key)) continue;
      }
      globalSeenQuestions.add(key);
      items.push({ q: normQ, a: c.a });
    }
    const chExtra = courseExtra[String(modIdx + 1)] || [];
    const blob = items.map(it => (it.q + ' ' + it.a).toLowerCase()).join(' ');
    for (const ec of chExtra) {
      const nLow = String(ec.notion || '').toLowerCase();
      const hLow = String(ec.head || '').toLowerCase();
      if ((nLow && blob.includes(nLow)) || (hLow && hLow.length >= 2 && blob.includes(hLow))) continue;
      let q = ec.q;
      let key = q.replace(/\s+/g, ' ').toLowerCase();
      if (globalSeenQuestions.has(key)) continue;
      globalSeenQuestions.add(key);
      items.push({ q, a: ec.a });
    }
    return [
      '  <h2>' + module.title + '</h2>',
      '  <div class="cards">',
      items.map(card =>
        '    <div class="fc"><div class="fc__in"><div class="fc__face"><b>Question</b>' + card.q +
        '</div><div class="fc__face fc__back"><b>Réponse</b>' + card.a + '</div></div></div>'
      ).join('\n'),
      '  </div>',
      ''
    ].join('\n');
  }).join('\n');
}

/** Bandeau de paliers de maîtrise normalisé sur l'échelle unique 4 paliers (< 50 % | 50–69 % | 70–94 % | ≥ 95 %). */
function stripBandPrefix(rawText) {
  let t = String(rawText || '').trim();
  t = t.replace(/^<strong>\s*(?:Score\s*)?(?:<\s*\d+\s*%|\d+\s*[–-]\s*\d+\s*%|≥\s*\d+\s*%|Moins de \d+\/\d+|De \d+ à \d+\/\d+|Entre \d+\/\d+ et \d+\/\d+|\d+\/\d+|Niveau initial|Niveau opérationnel|Maîtrise B3)(?:\s*\([^)]*\))?\s*(?:—|:)\s*<\/strong>\s*/i, '');
  t = t.replace(/^(?:Score\s*)?(?:<\s*\d+\s*%|\d+\s*[–-]\s*\d+\s*%|≥\s*\d+\s*%|Moins de \d+\/\d+|De \d+ à \d+\/\d+|Entre \d+\/\d+ et \d+\/\d+|\d+\/\d+|Niveau initial|Niveau opérationnel|Maîtrise B3)(?:\s*\([^)]*\))?\s*(?:—|:)\s*/i, '');
  return t.trim();
}

function bands(rows, usesVous = true) {
  if (!rows || !Array.isArray(rows) || !rows.length) return '';

  // Cas particulier : barème de projet sur 100 (5 critères de 20 %) dans exercices/exercices.html
  const isProjectRubric = rows.length === 5 && rows.every(row => {
    const txt = row.text || String(row);
    return /<span>\d+<\/span>\s*$/.test(txt);
  });
  if (isProjectRubric) {
    return '<div class="bands">\n' + rows.map(row => {
      const txt = (row.text || String(row)).replace(/<span>(\d+)<\/span>\s*$/, '<span>$1 %</span>');
      return '      <div class="bandrow">' + txt + '</div>';
    }).join('\n') + '\n    </div>';
  }

  const rawTexts = rows.map(row => {
    const raw = row.text || (row.title ? '<strong>' + row.title + ' :</strong> ' + (row.desc || '') : '') || String(row);
    return stripBandPrefix(raw);
  });

  let fourDescs;
  if (rawTexts.length === 4) {
    fourDescs = rawTexts;
  } else if (rawTexts.length === 3) {
    fourDescs = [
      rawTexts[0],
      'Compréhension partielle : reprenez les sections où une erreur subsiste et refaites les exercices des niveaux 1 et 2.',
      rawTexts[1],
      rawTexts[2]
    ];
  } else if (rawTexts.length >= 5) {
    fourDescs = [
      rawTexts[0],
      rawTexts[1],
      rawTexts[3] || rawTexts[2],
      rawTexts[rawTexts.length - 1]
    ];
  } else {
    fourDescs = [
      rawTexts[0] || 'Reprenez les sections fondamentales du chapitre.',
      rawTexts[1] || 'Refaites les exercices d’application des niveaux 1 et 2.',
      'Bonne maîtrise d’ensemble : consolidez les cas limites.',
      'Maîtrise complète des objectifs du chapitre.'
    ];
  }

  const PREFIXES_4 = ['< 50 % — ', '50–69 % — ', '70–94 % — ', '≥ 95 % — '];
  const CLASSES_4 = [' bandrow--low', ' bandrow--mid', ' bandrow--good', ' bandrow--top'];

  return '<div class="bands">\n' + fourDescs.map((desc, idx) => {
    let text = '<strong>' + PREFIXES_4[idx] + '</strong>' + desc;
    if (usesVous) {
      text = text
        .replace(/\breprends\b/g, 'reprenez')
        .replace(/\bReprends\b/g, 'Reprenez')
        .replace(/\brefais\b/g, 'refaites')
        .replace(/\bRefais\b/g, 'Refaites')
        .replace(/\brelis\b/g, 'relisez')
        .replace(/\bRelis\b/g, 'Relisez')
        .replace(/\brevois\b/g, 'revoyez')
        .replace(/\bRevois\b/g, 'Revoyez')
        .replace(/\bpasse au\b/g, 'passez au')
        .replace(/\bPasse au\b/g, 'Passez au')
        .replace(/\bcible\b/g, 'ciblez')
        .replace(/\btu peux\b/g, 'vous pouvez')
        .replace(/\btu es prêt\b/g, 'vous êtes prêt')
        .replace(/\bton\b/g, 'votre')
        .replace(/\bta\b/g, 'votre')
        .replace(/\btes\b/g, 'vos');
    }
    return '      <div class="bandrow' + CLASSES_4[idx] + '">' + text + '</div>';
  }).join('\n') + '\n    </div>';
}

/* ======================== Chapitre ======================== */

/** Détecte si le chapitre s'adresse à l'étudiant au vouvoiement (`vous`) ou au tutoiement (`tu`). */
function detectChapterUsesVous(course, ch) {
  const sample = [
    ch.situation || '',
    ...(ch.sections || []).map(s => (Array.isArray(s.html) ? s.html.join(' ') : (s.html || ''))),
    ...(ch.pitfalls || []),
    ...(ch.method || [])
  ].join(' ').replace(/<script[\s\S]*?<\/script>|<pre[\s\S]*?<\/pre>|<code>[\s\S]*?<\/code>/gi, ' ');

  const vousMatches = (sample.match(/\b(vous|votre|vos)\b/gi) || []).length;
  const tuMatches = (sample.match(/\b(tu|ton|ta|tes|te|toi|t'|t’)\b/gi) || []).length;
  if (vousMatches > 0 || tuMatches > 0) {
    return vousMatches >= tuMatches;
  }
  return !(course && course.id && course.id.startsWith('b1-'));
}

/** Normalise la liste des notions d'un chapitre à exactement 8 éléments. */
function normalizeNotionsTo8(ch) {
  const raw = Array.isArray(ch.notions) ? ch.notions.slice() : [];
  if (raw.length >= 8) return raw;
  const fallbacks = [...(ch.summary || []), ...(ch.checklist || []), ...(ch.objectives || [])];
  let idx = 0;
  while (raw.length < 8 && idx < fallbacks.length) {
    const item = fallbacks[idx++];
    if (item && !raw.includes(item)) raw.push(item);
  }
  while (raw.length < 8) {
    raw.push('Synthèse opérationnelle du chapitre ' + ch.n);
  }
  return raw;
}

/**
 * Corps d'une page de chapitre, au gabarit complet.
 */
function chapter(course, ch) {
  const out = [];
  const usesVous = true;
  const notions8 = normalizeNotionsTo8(ch);

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
    '    <p>' + (usesVous ? 'À la fin de ce chapitre, vous serez capable de :' : 'À la fin de ce chapitre, tu seras capable de :') + '</p>\n    <ol>\n' +
    ch.objectives.map(o => '      <li>' + o + '</li>').join('\n') + '\n    </ol>'));

  // Sections numérotées 1..N
  ch.sections.forEach((section, index) => {
    out.push('<h2>' + (index + 1) + '. ' + section.title + '</h2>');
    out.push(Array.isArray(section.html) ? section.html.join('\n') : section.html);
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
    '    <h3>Les ' + notions8.length + ' notions à connaître absolument</h3>',
    '    <ol>',
    '      ' + notions8.map(n => '<li>' + (typeof n === 'string' ? n : '<strong>' + (n.term || n.title || '') + ' :</strong> ' + (n.def || n.desc || n.definition || '')) + '</li>').join(''),
    '    </ol>',
    '    <p><a class="btn" href="cartes.html">' + ic('cards') + ' Réviser avec les flashcards</a>',
    '       <a class="btn" href="formules.html">' + ic('file') + ' Mémo syntaxe</a></p>',
    '  </div>'
  ].join('\n'));

  let masteryIntroText = ch.masteryIntro || (usesVous
    ? 'Le QCM ci-dessus est un test de maîtrise. Lisez votre pourcentage :'
    : 'Le QCM ci-dessus est un test de maîtrise. Lis ton pourcentage :');
  if (usesVous) {
    masteryIntroText = masteryIntroText
      .replace(/\bton QCM\b/g, 'votre QCM')
      .replace(/\bta checklist\b/g, 'votre checklist')
      .replace(/\bLis ton pourcentage\b/g, 'Lisez votre pourcentage');
  }

  out.push('<h2>' + (qcmNumber + 4) + '. Test de maîtrise</h2>');
  out.push([
    '  <div class="box box--tech">',
    '    <div class="box__title">' + ic('chart') + ' ' + (usesVous ? 'Comment vous auto-évaluer' : 'Comment t\'auto-évaluer') + '</div>',
    '    <p>' + masteryIntroText + '</p>',
    '    ' + bands(ch.mastery, usesVous),
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

  out.push('  <p class="disclaimer">Objectif de maîtrise 19/20 — ' +
    (usesVous ? 'votre note réelle dépend aussi de votre travail.' : 'ta note réelle dépend aussi de ton travail.') +
    '\n  Sources : ' + course.sources + '.</p>');

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
  resolveCoursePath,
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
