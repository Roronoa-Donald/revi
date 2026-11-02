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
const parse5 = require('parse5');

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

const INLINE_TAGS = new Set(['b', 'code', 'em', 'i', 'kbd', 'mark', 's', 'strong', 'sub', 'sup', 'u']);
const RICH_TAGS = new Set([...INLINE_TAGS, 'a', 'div', 'li', 'ol', 'p', 'pre', 'ul']);

function markupHtml(value, allowedTags) {
  const text = String(value === undefined || value === null ? '' : value);
  const tokens = [];
  const stack = [];

  for (let offset = 0; offset < text.length; offset++) {
    if (text[offset] !== '<') continue;
    const end = text.indexOf('>', offset + 1);
    if (end === -1) continue;
    const nextOpen = text.indexOf('<', offset + 1);
    if (nextOpen !== -1 && nextOpen < end) continue;
    const raw = text.slice(offset + 1, end);
    const closing = raw.startsWith('/');
    const tag = closing ? raw.slice(1) : raw;
    const parts = tag.split(' ');
    const name = parts[0];
    const validAttributes = name === 'a'
      ? (closing && parts.length === 1) || (!closing && /^a href="https:\/\/[a-z0-9.-]+(?:\/[a-z0-9._~%/-]*)?"$/i.test(tag))
      : parts.length === 1 || (!closing && name === 'div' && /^div class="[a-z0-9 _-]+"$/.test(tag));
    if (name === 'br' && !closing && parts.length === 1) {
      tokens.push({ start: offset, end, valid: true });
    } else if (allowedTags.has(name) && validAttributes) {
      const token = { start: offset, end, valid: false, name };
      tokens.push(token);
      if (!closing) stack.push(token);
      else {
        let match = stack.length - 1;
        while (match >= 0 && stack[match].name !== name) match--;
        if (match >= 0) {
          stack[match].valid = true;
          stack.splice(match);
          token.valid = true;
        }
      }
    }
    offset = end;
  }

  const validTokens = new Map(tokens.filter(token => token.valid).map(token => [token.start, token]));
  let result = '';
  for (let offset = 0; offset < text.length; offset++) {
    const token = validTokens.get(offset);
    if (token) {
      result += text.slice(offset, token.end + 1);
      offset = token.end;
    } else if (text[offset] === '<') {
      result += '&lt;';
    } else if (text[offset] === '>') {
      result += '&gt;';
    } else {
      result += text[offset];
    }
  }
  return result;
}

function inlineHtml(value) {
  return markupHtml(value, INLINE_TAGS);
}

function richHtml(value) {
  return markupHtml(value, RICH_TAGS);
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
  '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&amp;display=swap">'
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
    .replace(/ta note réelle dépend aussi de votre travail/gi, 'la maîtrise réelle dépend de la régularité du travail personnel')
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
      '        <button class="opt"' + (index === correctIdx ? ' data-correct="1"' : '') + '>' + inlineHtml(label) + '</button>'
    ).join('\n');
    return [
      '    <div class="q">',
      '      <p class="q__stem">' + inlineHtml(q.stem || q.q || '') + '</p>',
      '      <div class="opts">',
      options,
      '      </div>',
      '      <div class="q__exp">' + inlineHtml(q.exp || q.explanation || '') + '</div>',
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
      const normQ = String(c.q || '');
      const key = normQ.replace(/\s+/g, ' ').trim().toLowerCase();
      globalSeenQuestions.add(key);
      items.push({ q: normQ, a: String(c.a || '') });
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
      '  <h2>' + inlineHtml(module.title) + '</h2>',
      '  <div class="cards">',
      items.map(card =>
        '    <div class="fc"><div class="fc__in"><div class="fc__face"><b>Question</b>' + inlineHtml(card.q) +
        '</div><div class="fc__face fc__back"><b>Réponse</b>' + inlineHtml(card.a) + '</div></div></div>'
      ).join('\n'),
      '  </div>',
      ''
    ].join('\n');
  }).join('\n');
}

/** Bandeau de paliers de maîtrise normalisé sur l'échelle unique 4 paliers (< 50 % | 50–69 % | 70–94 % | ≥ 95 %). */
function stripBandPrefix(rawText) {
  let t = String(rawText || '').trim();
  t = t.replace(/^<strong>\s*(?:Score\s*)?(?:(?:<|&lt;)\s*\d+\s*%|\d+\s*[–-]\s*\d+\s*%|≥\s*\d+\s*%|Moins de \d+\/\d+|De \d+ à \d+\/\d+|Entre \d+\/\d+ et \d+\/\d+|\d+\/\d+|Niveau initial|Niveau opérationnel|Maîtrise B3)(?:\s*\([^)]*\))?\s*(?:—|:)\s*<\/strong>\s*/i, '');
  t = t.replace(/^(?:Score\s*)?(?:(?:<|&lt;)\s*\d+\s*%|\d+\s*[–-]\s*\d+\s*%|≥\s*\d+\s*%|Moins de \d+\/\d+|De \d+ à \d+\/\d+|Entre \d+\/\d+ et \d+\/\d+|\d+\/\d+|Niveau initial|Niveau opérationnel|Maîtrise B3)(?:\s*\([^)]*\))?\s*(?:—|:)\s*/i, '');
  return t.trim();
}


/**
 * Conversion tu → vous des textes de paliers (auto-évaluation).
 * ATTENTION : en JavaScript, \b ne reconnaît que les lettres ASCII ; « requê|tes » y contient donc une
 * frontière et /\btes\b/ produisait « requêvos ». On utilise des frontières Unicode explicites.
 * Le mot « cible » (nom) n'est volontairement pas converti ; « ton » n'est converti que s'il est possessif.
 */
function toVousBandText(text) {
  const B = (w) => new RegExp('(?<![\\p{L}\\p{N}_-])' + w + '(?![\\p{L}\\p{N}_])', 'gu');
  const pairs = [
    ['reprends', 'reprenez'], ['Reprends', 'Reprenez'], ['refais', 'refaites'], ['Refais', 'Refaites'],
    ['relis', 'relisez'], ['Relis', 'Relisez'], ['revois', 'revoyez'], ['Revois', 'Revoyez'],
    ['passe au', 'passez au'], ['Passe au', 'Passez au'], ['tu peux', 'vous pouvez'], ['tu es prêt', 'vous êtes prêt']
  ];
  let out = text;
  for (const [a, b] of pairs) out = out.replace(B(a), b);
  out = out.replace(B('ton'), (m, offset, whole) => (/(?:^|\s)(?:le|un|du|au|ce)\s$/i.test(whole.slice(0, offset)) ? m : 'votre'));
  out = out.replace(B('ta'), 'votre').replace(B('tes'), 'vos');
  return imperativesToVous(out);
}

/**
 * Impératifs au tutoiement en début de proposition (après « — », « : », « ; », « , », « puis », « et », « ou »)
 * convertis au vouvoiement. Liste fermée de verbes : on ne devine pas la grammaire (un nom comme « place » ou
 * « structure » reste inchangé hors contexte verbal).
 */
const IMPERATIVES_TU_VOUS = {
  'révise': 'révisez', 'enchaîne': 'enchaînez', 'rejoue': 'rejouez', 'déroule': 'déroulez', 'réécris': 'réécrivez',
  'affine': 'affinez', 'explique': 'expliquez', 'travaille': 'travaillez', 'simule': 'simulez', 'ajoute': 'ajoutez',
  'écris': 'écrivez', 'rédige': 'rédigez', 'vérifie': 'vérifiez', 'prédis': 'prédisez', 'attaque': 'attaquez',
  'construis': 'construisez', 'produis': 'produisez', 'corrige': 'corrigez', 'refais': 'refaites', 'reprends': 'reprenez',
  'relis': 'relisez', 'calcule': 'calculez', 'trace': 'tracez', 'applique': 'appliquez', 'utilise': 'utilisez',
  'lis': 'lisez', 'fais': 'faites', 'complète': 'complétez', 'teste': 'testez', 'mémorise': 'mémorisez',
  'identifie': 'identifiez', 'dessine': 'dessinez', 'classe': 'classez', 'résous': 'résolvez', 'traduis': 'traduisez',
  'décris': 'décrivez', 'définis': 'définissez', 'justifie': 'justifiez', 'compare': 'comparez', 'retiens': 'retenez',
  'cherche': 'cherchez', 'trouve': 'trouvez', 'donne': 'donnez', 'montre': 'montrez', 'crée': 'créez',
  'observe': 'observez', 'analyse': 'analysez', 'étudie': 'étudiez', 'entraîne': 'entraînez', 'lance': 'lancez',
  'ouvre': 'ouvrez', 'prends': 'prenez', 'mets': 'mettez', 'cible': 'ciblez', 'travaille': 'travaillez', 'pratique': 'pratiquez'
};
// verbes ambigus (noms ou autres emplois) : convertis seulement devant un complément typique
const IMPERATIVES_AMBIGUS = [
  [/passe(?= (?:aux?|à|en|directement|ensuite|le|la|les|un|une)(?![\\p{L}\\p{N}_]))/i, 'passez'],
  [/cible(?= (?:la|le|les|l['’]|un|une|des)(?![\\p{L}\\p{N}_]))/i, 'ciblez'],
  [/pratique(?= (?:les?|la|l['’]|ces|des)(?![\\p{L}\\p{N}_]))/i, 'pratiquez'],
  [/compte(?= (?:aussi|les?|la|chaque|combien|le)(?![\\p{L}\\p{N}_]))/i, 'comptez'],
  [/structure(?= (?:un|une|le|la|les|l['’])(?![\\p{L}\\p{N}_]))/i, 'structurez'],
  [/chiffre(?= (?:votre|le|la|les|un|une)(?![\\p{L}\\p{N}_]))/i, 'chiffrez']
];
function imperativesToVous(text) {
  const head = '(^|>\\s*|[—:;,]\\s*|\\s(?:puis|et|ou)\\s|\\.\\s+)';
  const cap = (src, rep) => (src[0] === src[0].toUpperCase() ? rep[0].toUpperCase() + rep.slice(1) : rep);
  let out = text;
  for (const [tu, vous] of Object.entries(IMPERATIVES_TU_VOUS)) {
    const rx = new RegExp(head + '(' + tu + ')(?![\\p{L}\\p{N}_-])', 'giu');
    out = out.replace(rx, (m, pre, word) => pre + cap(word, vous));
  }
  for (const [rx0, vous] of IMPERATIVES_AMBIGUS) {
    const rx = new RegExp(head + '(' + rx0.source + ')', 'giu');
    out = out.replace(rx, (m, pre, word) => pre + cap(word, vous));
  }
  return out;
}


/**
 * Paramètres entre chevrons (<iface>, <nom>, <id>…) : le navigateur les prend pour des balises HTML inconnues et
 * ne les affiche pas (« pass in on <iface> proto <p> » devenait « pass in on proto »). On les échappe, sauf dans
 * les blocs <script> et <style>.
 */
const KNOWN_TAGS = new Set(('a abbr article aside audio b bdi bdo blockquote body br button canvas caption circle cite clippath code col colgroup ' +
  'data dd defs del desc details dfn dialog div dl dt ellipse em fieldset figcaption figure foreignobject footer form g h1 h2 h3 h4 h5 h6 head header hr ' +
  'html i iframe image img input ins kbd label legend li line lineargradient link main mark marker mask math menu meta meter mfrac mi mn mo mrow msub msup ' +
  'nav noscript ol optgroup option output p path pattern picture polygon polyline pre progress q radialgradient rect rp rt ruby s samp script section ' +
  'select slot small source span stop strong style sub summary sup svg symbol table tbody td template text textarea tfoot th thead time title tr track ' +
  'tspan u ul use var video wbr animate animatetransform').split(' '));

const characterReferences = new Map();

function escapeAmpersand(value, offset, inTag) {
  const match = /^&(?:#[xX][0-9a-fA-F]+;?|#[0-9]+;?|[A-Za-z][A-Za-z0-9]*;?)/.exec(value.slice(offset));
  if (!match) return '&amp;';
  const token = match[0] + (value[offset + match[0].length] === '=' ? '=' : '');
  const key = (inTag ? 'attribute:' : 'text:') + token;
  if (!characterReferences.has(key)) {
    const fragment = inTag
      ? parse5.parseFragment('<a data-value="' + token + '"></a>')
      : parse5.parseFragment(token);
    const decoded = inTag
      ? fragment.childNodes[0].attrs[0].value
      : (fragment.childNodes[0] && fragment.childNodes[0].value) || '';
    characterReferences.set(key, decoded !== token);
  }
  return characterReferences.get(key) ? '&' : '&amp;';
}

function escapeTextAngles(value) {
  let result = '';
  let inTag = false;
  let quote = '';
  for (let offset = 0; offset < value.length; offset++) {
    const character = value[offset];
    if (inTag) {
      result += character === '&' ? escapeAmpersand(value, offset, true) : character;
      if (quote && character === quote) quote = '';
      else if (!quote && (character === '"' || character === "'")) quote = character;
      else if (!quote && character === '>') inTag = false;
    } else if (character === '<') {
      const remainder = value.slice(offset);
      const match = /^<\/?([A-Za-z][A-Za-z0-9:-]*)(?=[\s/>])/.exec(remainder);
      const nextOpen = remainder.indexOf('<', 1);
      const end = remainder.indexOf('>');
      const closed = end !== -1 && (nextOpen === -1 || end < nextOpen);
      if (closed && ((match && KNOWN_TAGS.has(match[1].toLowerCase())) || /^<!doctype\b/i.test(remainder))) {
        result += character;
        inTag = true;
      } else {
        result += '&lt;';
      }
    } else if (character === '>') {
      result += '&gt;';
    } else if (character === '&') {
      result += escapeAmpersand(value, offset, false);
    } else {
      result += character;
    }
  }
  return result;
}

function escapeUnknownTags(html) {
  return String(html).split(/(<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<!--[\s\S]*?-->)/i).map((part, i) => {
    if (i % 2 === 1) return part;
    return escapeTextAngles(part.replace(/<(\/?)([\p{L}][\p{L}\p{N}_:-]*)((?:\s[^<>]*)?)(\/?)>/gu, (m, slash, name, rest, selfClose) => {
      if (KNOWN_TAGS.has(name.toLowerCase())) return m;
      return '&lt;' + slash + name + rest + selfClose + '&gt;';
    }));
  }).join('');
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

  const PREFIXES_4 = ['&lt; 50 % — ', '50–69 % — ', '70–94 % — ', '≥ 95 % — '];
  const CLASSES_4 = [' bandrow--low', ' bandrow--mid', ' bandrow--good', ' bandrow--top'];

  return '<div class="bands">\n' + fourDescs.map((desc, idx) => {
    let text = '<strong>' + PREFIXES_4[idx] + '</strong>' + desc;
    if (usesVous) {
      text = toVousBandText(text);
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
    (usesVous ? 'votre note réelle dépend aussi de votre travail.' : 'ta note réelle dépend aussi de votre travail.') +
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
  escapeUnknownTags,
  esc,
  richHtml,
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
