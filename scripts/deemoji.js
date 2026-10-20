#!/usr/bin/env node
'use strict';

/**
 * deemoji — retire tout emoji du contenu servi et le remplace, dans le HTML,
 * par une icône SVG du sprite partagé (`assets/img/ui-icons.svg`).
 *
 * Politique
 *   - HTML (contenu)                    -> <svg class="ic">…</svg>
 *   - HTML (<script>, <pre>, <code>,
 *     attributs, commentaires)          -> suppression du glyphe
 *   - JS / CSS                          -> suppression du glyphe
 *   - Notations conservées : flèches typographiques (-> <- <->), formes
 *     géométriques de notation (UML : diamant, triangle, disque, triangle de
 *     lecture), étoiles de notation (★ ☆), couleurs de cartes (♠ ♥ ♦ ♣),
 *     hamburger (☰), opérateurs (≤ ≥). Ce ne sont pas des emoji.
 *
 * Usage
 *   node scripts/deemoji.js            # rapport seul (dry-run)
 *   node scripts/deemoji.js --apply     # écrit les fichiers + injecte icons.css
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const APPLY = process.argv.includes('--apply');

// ── Périmètre : dossiers de cours réellement servis + coquille racine ───────
const SERVED_DIRS = [
  'admin-vm', 'api-rest-flask', 'assembleur', 'ccna', 'csharp',
  'Cyber securite B2', 'docker', 'droit', 'erp-si', 'infographie',
  'ingenierie-besoin', 'linux', 'masterclass-apprendre', 'php',
  'probabilites', 'rd_java', 'rd_winserver', 'RD-RO', 'react', 'sql',
  'uiux', 'uml', 'epreuves', 'preparation-web', 'b1-python'
];
const ROOT_FILES = ['index.html', '404.html', 'rd-ai-chat.js', 'server.js', 'middleware.js',
  'vercel.json', 'package.json'];
const ROOT_DIRS = ['assets', 'public'];
// Outils et matières du dépôt : `roadmap/` est encore produit par le build,
// le reste est du code applicatif ou du reporting interne.
const EXTRA_DIRS = ['roadmap', 'server', 'api', 'scripts', 'audit', '.build-it-reports', 'COURS_B3'];

// Exclusions : page laissée telle quelle, correspondances emoji->icône de ce
// script lui-même (les emoji y sont des données, pas de la décoration), et
// compétences tierces installées dans le dépôt.
const SKIP_FILES = new Set(['clarisse.html', 'deemoji.js']);
const SKIP_DIRS = new Set(['.agents', 'agent', 'myskill', 'node_modules', 'dist']);
const EXT = /\.(html|js|css|json)$/;

// ── Codepoints conservés (notation, pas d'emoji) ───────────────────────────
function isKept(cp) {
  return (cp >= 0x2190 && cp <= 0x21ff) || // flèches typographiques
         (cp >= 0x2264 && cp <= 0x2265) || // ≤ ≥
         (cp >= 0x2591 && cp <= 0x2593) ||
         (cp >= 0x25a0 && cp <= 0x25ff) || // formes géométriques / notation UML
         cp === 0x2605 || cp === 0x2606 || // ★ ☆ notation d'étoiles
         cp === 0x2630 ||                  // ☰ hamburger
         (cp >= 0x2660 && cp <= 0x2667) || // ♠ ♥ ♦ ♣ (contenu pédagogique)
         cp === 0x279c;                    // ➜
}

// ── Ranges « emoji » effectivement retirés ─────────────────────────────────
// (découpés pour ne jamais recouvrir un codepoint conservé)
const EMOJI_RANGES = [
  '\\u{1F000}-\\u{1FAFF}', // pictogrammes
  '\\u{2B00}-\\u{2BFF}',   // ⭐ ⬆ ⬇ …
  '\\u{2600}-\\u{2604}', '\\u{2607}-\\u{262F}', '\\u{2631}-\\u{265F}',
  '\\u{2668}-\\u{279B}', '\\u{279D}-\\u{27BF}',
  '\\u{231A}-\\u{23FA}',   // ⌚ ⏰ ⏱ ⏳ ⌨
  '\\u{24C2}', '\\u{2139}', '\\u{3030}', '\\u{303D}', '\\u{3297}', '\\u{3299}'
];
// Modificateurs : toujours supprimés.
const MODIFIERS = ['\\u{FE0E}', '\\u{FE0F}', '\\u{20E3}', '\\u{200D}'];

// ── Table emoji -> icône ───────────────────────────────────────────────────
// [id d'icône, classe de teinte]. Absent = suppression pure.
const MAP = {
  // Validation / alerte
  '✅': ['check-circle', 'ic--ok'], '☑': ['check', 'ic--ok'],
  '✓': ['check', 'ic--ok'], '✔': ['check', 'ic--ok'],
  '❌': ['ban', 'ic--bad'], '✗': ['x', 'ic--bad'], '✘': ['x', 'ic--bad'],
  '✕': ['x', null], '✖': ['x', 'ic--bad'], '⛔': ['ban', 'ic--bad'],
  '🚫': ['ban', 'ic--bad'], '🛑': ['ban', 'ic--bad'],
  '⚠': ['warning', 'ic--warn'], '🚨': ['warning', 'ic--bad'],
  '🚧': ['warning', 'ic--warn'],
  // Repères de section
  '💡': ['lightbulb', 'ic--gold'], '🔦': ['lightbulb', 'ic--gold'],
  '🧠': ['brain', 'ic--info'], '🎯': ['target', 'ic--info'],
  '📝': ['pencil', null], '✏': ['pencil', null], '📌': ['pin', null],
  '📍': ['pin', null], '🔹': ['dot', 'ic--info'], '🔸': ['dot', 'ic--warn'],
  '🔴': ['dot', 'ic--bad'], '🟠': ['dot', 'ic--warn'],
  '🟡': ['dot', 'ic--warn'], '🟢': ['dot', 'ic--ok'],
  // Récompenses / énergie
  '⭐': ['star', 'ic--gold'], '🌟': ['star', 'ic--gold'],
  '✨': ['sparkles', 'ic--gold'], '🏆': ['trophy', 'ic--gold'],
  '🥇': ['trophy', 'ic--gold'], '🏅': ['trophy', 'ic--gold'],
  '💎': ['gem', 'ic--info'], '👑': ['crown', 'ic--gold'],
  '🔥': ['fire', 'ic--bad'], '⚡': ['bolt', 'ic--gold'],
  '👍': ['thumbs-up', 'ic--ok'], '👌': ['thumbs-up', 'ic--ok'],
  '👏': ['thumbs-up', 'ic--ok'], '👋': ['hand', null],
  '🎉': ['sparkles', 'ic--gold'], '🎊': ['sparkles', 'ic--gold'],
  '🚀': ['rocket', 'ic--info'],
  // Documents / données
  '📚': ['book', null], '📘': ['book', null], '📖': ['book', null],
  '📄': ['file', null], '📃': ['file', null], '🖨': ['file', null],
  '📜': ['scroll', null], '📋': ['clipboard', null],
  '📊': ['chart', 'ic--info'], '📈': ['chart', 'ic--ok'],
  '📉': ['chart', 'ic--bad'], '📐': ['calculator', null],
  '🧮': ['calculator', null], '🖩': ['calculator', null],
  '📦': ['inbox', null], '📥': ['inbox', null], '📤': ['inbox', null],
  '📁': ['folder', null], '📂': ['folder', null], '🗂': ['folder', null],
  '🔗': ['link', 'ic--info'], '🔀': ['swap', null], '🔄': ['refresh', null],
  '🔒': ['lock', null], '🔓': ['lock', null], '🔐': ['lock', null],
  '🔑': ['key', 'ic--gold'], '🔍': ['search', null], '👁': ['search', null],
  '🎓': ['graduation', 'ic--info'], '🛡': ['shield', 'ic--info'],
  '🌐': ['globe', 'ic--info'], '🗺': ['map', null], '🏁': ['flag', null],
  '🏳': ['flag', null], '🎮': ['gamepad', null], '🕹': ['gamepad', null],
  '🎲': ['dice', null], '🃏': ['cards', null],
  '🖥': ['vm', null], '💻': ['laptop', null], '👨‍💻': ['code', null],
  '📱': ['phone', null], '📟': ['phone', null], '⌨': ['keyboard', null],
  '💾': ['save', null], '🏰': ['castle', null], '🐚': ['shell', null],
  '☕': ['coffee', null], '🏠': ['house', null],
  '⏰': ['clock', 'ic--info'], '⏲': ['clock', 'ic--info'],
  '🕘': ['clock', 'ic--info'], '🕙': ['clock', 'ic--info'],
  '⏱': ['hourglass', 'ic--warn'], '⏳': ['hourglass', 'ic--warn'],
  '📅': ['calendar', null], '🗓': ['calendar', null],
  '🛠': ['wrench', null], '🔧': ['wrench', null], '⚙': ['wrench', null],
  '▶': ['play', null], '⏸': ['play', null],
  '👤': ['user', null], '🧑': ['user', null], '👥': ['users', null],
  '🤖': ['robot', 'ic--info'], '📧': ['mail', null], '✉': ['mail', null],
  '❓': ['search', 'ic--warn'], '❔': ['search', 'ic--warn'],
  '🏭': ['blocks', null], '🏢': ['blocks', null],
  '🎨': ['palette', null], '🏗': ['blocks', null], '🧩': ['blocks', null],
  '🔌': ['plug', 'ic--info'], '📡': ['wifi', 'ic--info'],
  '🧍': ['user', null], '🏷': ['flag', null], '💪': ['bolt', 'ic--warn'],
  '📞': ['phone', null],
  '🐬': ['database', null], '🐘': ['database', null], '🗄': ['database', null],
  '☰': ['chevron-down', null],
  '⬆': ['arrow-up', 'ic--bad'], '⬇': ['arrow-down', 'ic--ok'],
  '🔼': ['arrow-up', 'ic--bad'], '🔽': ['arrow-down', 'ic--ok'],
  '⏫': ['arrow-up', null], '⏬': ['arrow-down', null],
  '↗': ['arrow-up', 'ic--ok'], '➜': ['arrow-right', null],
  // Emoji de clavier non concernés : chiffres combinés -> texte
  '1️⃣': '1', '2️⃣': '2', '3️⃣': '3', '4️⃣': '4', '5️⃣': '5',
  '6️⃣': '6', '7️⃣': '7', '8️⃣': '8', '9️⃣': '9', '0️⃣': '0', '🔟': '10'
};

const ESC = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const SEQ = Object.keys(MAP).sort((a, b) => b.length - a.length).map(ESC);
const RE = new RegExp('(?:' + SEQ.join('|') + '|[' + EMOJI_RANGES.join('') + ']|[' + MODIFIERS.join('') + '])', 'gu');

// ── Zones « brutes » : jamais d'insertion de balise ────────────────────────
// Rétroréférence obligatoire : un <script> peut contenir "</code>" dans une
// chaîne de gabarit, ce qui tronquerait la zone et ferait insérer des balises
// au milieu du JavaScript.
const RAW_TAGS = 'script|style|pre|code|kbd|samp|textarea|title|option';
const RAW_RE = new RegExp('<(' + RAW_TAGS + ')\\b[\\s\\S]*?<\\/\\1>|<!--[\\s\\S]*?-->', 'gi');
const RAW_ONLY = new RegExp('<(' + RAW_TAGS + ')\\b[\\s\\S]*?<\\/\\1>', 'gi');

function rawRegions(src, re) {
  const out = [];
  let m;
  (re || RAW_RE).lastIndex = 0;
  while ((m = (re || RAW_RE).exec(src))) out.push([m.index, m.index + m[0].length]);
  return out;
}

/** Vrai si l'index tombe dans une balise (<...>) plutôt que dans du texte. */
function insideTag(src, i) {
  const lt = src.lastIndexOf('<', i);
  const gt = src.lastIndexOf('>', i);
  return lt > gt;
}

function svgTag(id, cls) {
  return '<svg class="ic' + (cls ? ' ' + cls : '') +
    '" aria-hidden="true"><use href="/assets/img/ui-icons.svg#i-' + id + '"></use></svg>';
}

function inRegions(i, regions) {
  for (const [a, b] of regions) if (i >= a && i < b) return true;
  return false;
}

// ── Transformation d'un fichier ────────────────────────────────────────────
function transform(src, file) {
  const isHtml = /\.html$/.test(file);
  const regions = isHtml ? rawRegions(src) : null;
  const hits = [];
  let out = '';
  let last = 0;
  let m;
  RE.lastIndex = 0;
  while ((m = RE.exec(src))) {
    const e = m[0];
    const asContent = isHtml && !inRegions(m.index, regions) && !insideTag(src, m.index);
    const v = MAP[e];
    let repl;
    if (typeof v === 'string') repl = v;                               // texte simple
    else if (Array.isArray(v)) repl = asContent ? svgTag(v[0], v[1]) : '';
    else repl = '';                                                    // non mappé
    out += src.slice(last, m.index) + repl;
    last = m.index + e.length;
    hits.push({ e, icon: Array.isArray(v) ? v[0] : (v || null), content: !!asContent && !!repl });
  }
  out += src.slice(last);
  return { out, hits };
}

function collectFiles() {
  const files = [];
  const walk = dir => {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      if (SKIP_DIRS.has(ent.name)) continue;
      const p = path.join(dir, ent.name);
      if (ent.isDirectory()) walk(p);
      else if (EXT.test(ent.name) && !SKIP_FILES.has(ent.name) &&
        !SKIP_FILES.has(path.relative(ROOT, p))) files.push(p);
    }
  };
  for (const d of SERVED_DIRS) walk(path.join(ROOT, d));
  for (const d of ROOT_DIRS) walk(path.join(ROOT, d));
  for (const d of EXTRA_DIRS) if (fs.existsSync(path.join(ROOT, d))) walk(path.join(ROOT, d));
  for (const f of ROOT_FILES) if (fs.existsSync(path.join(ROOT, f))) files.push(path.join(ROOT, f));
  return [...new Set(files)];
}

// ── Réparation : retire les balises insérées par erreur dans du code ───────
// (HTML de cours uniquement ; les coquilles `public/` et `index.html`
//  construisent légitimement des icônes dans leurs propres scripts).
const SVG_LITERAL = /<svg class="ic[^"]*" aria-hidden="true"><use href="\/assets\/img\/ui-icons\.svg#i-[a-z-]+"><\/use><\/svg>/g;

function repair() {
  let fixed = 0, removed = 0;
  for (const d of SERVED_DIRS) {
    const base = path.join(ROOT, d);
    if (!fs.existsSync(base)) continue;
    const walk = dir => {
      for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, ent.name);
        if (ent.isDirectory()) { walk(p); continue; }
        if (!/\.html$/.test(ent.name)) continue;
        const src = fs.readFileSync(p, 'utf8');
        const regions = rawRegions(src, RAW_ONLY);
        let out = '', last = 0, n = 0;
        for (const [a, b] of regions) {
          const chunk = src.slice(a, b);
          const clean = chunk.replace(SVG_LITERAL, '');
          n += (chunk.length - clean.length);
          out += src.slice(last, a) + clean;
          last = b;
        }
        out += src.slice(last);
        if (n) { fs.writeFileSync(p, out); fixed++; removed += n; }
      }
    };
    walk(base);
  }
  console.log('réparation : ' + fixed + ' fichiers, ' + removed + ' caractères de balise retirés');
}

function main() {
  if (process.argv.includes('--repair')) { repair(); return; }
  const files = collectFiles();
  let totalBefore = 0, totalAfter = 0, touched = 0;
  const perFile = [];
  const unknown = new Map();
  const needCss = [];

  for (const abs of files) {
    let src;
    try { src = fs.readFileSync(abs, 'utf8'); } catch { continue; }
    const before = (src.match(RE) || []).length;
    if (!before) continue;
    const { out, hits } = transform(src, abs);
    for (const h of hits) {
      if (!h.icon && h.e && !isKept(h.e.codePointAt(0))) {
        const k = h.e;
        if (!unknown.has(k)) unknown.set(k, []);
        if (unknown.get(k).length < 2) unknown.get(k).push(path.relative(ROOT, abs));
      }
    }
    const after = (out.match(RE) || []).length;
    totalBefore += before; totalAfter += after; touched++;
    perFile.push([before, after, path.relative(ROOT, abs)]);
    if (after !== 0) console.error('[!!] RESTE ' + after + ' dans ' + path.relative(ROOT, abs));
    if (/\.html$/.test(abs) && hits.some(h => h.content)) needCss.push(abs);
    if (APPLY) fs.writeFileSync(abs, out);
  }

  // Injection de la feuille d'icônes pour les pages qui en reçoivent.
  let linked = 0;
  if (APPLY) {
    for (const abs of needCss) {
      let s = fs.readFileSync(abs, 'utf8');
      if (s.includes('/assets/css/icons.css')) continue;
      const link = '    <link rel="stylesheet" href="/assets/css/icons.css">\n';
      if (/<\/head>/i.test(s)) s = s.replace(/<\/head>/i, link + '</head>');
      else s = link + s;
      fs.writeFileSync(abs, s);
      linked++;
    }
  }

  perFile.sort((a, b) => b[0] - a[0]);
  console.log('fichiers modifiés : ' + touched);
  console.log('emoji avant : ' + totalBefore + '  ->  après : ' + totalAfter);
  console.log('pages recevant icons.css : ' + (APPLY ? linked : needCss.length));
  console.log('\nTop 25 fichiers :');
  for (const [b, a, f] of perFile.slice(0, 25)) console.log('  ' + b + ' -> ' + a + '  ' + f);
  if (unknown.size) {
    console.log('\nGlyphes non mappés (supprimés, ' + unknown.size + ' distincts) :');
    console.log([...unknown.keys()].join(' '));
  }
  if (!APPLY) console.log('\n(dry-run : relancer avec --apply)');
}

main();
