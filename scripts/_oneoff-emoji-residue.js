#!/usr/bin/env node
'use strict';
/**
 * Résidus du balayage emoji : reconstruit les valeurs qui ont perdu leur sens
 * parce qu'un emoji constituait À LUI SEUL la valeur d'une chaîne.
 *
 *   - gamification.js : retire les champs `icon` devenus vides, nettoie les
 *     espaces résiduels des toasts, remet une icône sur le panneau ccna.
 *   - guide C#        : supprime le champ `emoji` (non utilisé) et les espaces
 *     de tête des titres.
 *   - POO C#          : rend aux 9 concepts leur icône (SVG) + helper.
 *   - formules.html   : remet un sens dans l'expression switch (humeur).
 */

const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const read = p => fs.readFileSync(path.join(ROOT, p), 'utf8');
const write = (p, s) => fs.writeFileSync(path.join(ROOT, p), s);
const rel = p => path.relative(ROOT, p);

let changed = 0;
const bump = () => { changed++; };

// ── 1. gamification.js ─────────────────────────────────────────────────────
const GAM = fs.readdirSync(ROOT)
  .filter(d => fs.existsSync(path.join(ROOT, d, 'assets/js/gamification.js')))
  .map(d => path.join(ROOT, d, 'assets/js/gamification.js'));

const SPRITE = '/assets/img/ui-icons.svg';
for (const abs of GAM) {
  let s = fs.readFileSync(abs, 'utf8');
  const before = s;

  // Panneau de badge ccna : le span vide reçoit une icône de trophée.
  s = s.replace(/<span style="font-size:1\.8rem">\$\{badge\.icon\}<\/span>/g,
    '<svg class="ic ic--xl" aria-hidden="true"><use href="' + SPRITE + '#i-trophy"></use></svg>');

  // Préfixes devenus vides dans les toasts.
  s = s.replace(/\$\{badge\.icon\} /g, '');
  s = s.replace(/\$\{b\.icon\} /g, '');
  s = s.replace(/showToast\(` /g, 'showToast(`');
  s = s.replace(/notify\(` \+/g, 'notify(`+');
  s = s.replace(/innerHTML = isLevelUp \? ` \$\{msg\}` : ` \$\{msg\}`;/g,
    'innerHTML = isLevelUp ? `<strong>Niveau supérieur</strong> ${msg}` : `${msg}`;');

  // Champs `icon` devenus vides (inline ou en ligne propre).
  s = s.replace(/,\s*icon:\s*'',/g, ',');
  s = s.replace(/icon:\s*'',\s*/g, '');
  s = s.replace(/^\s*icon:\s*''\s*\r?\n/gm, '');

  if (s !== before) { fs.writeFileSync(abs, s); bump(); console.log('  gamification', rel(abs)); }
}

// ── 2. Guide C# ───────────────────────────────────────────────────────────
{
  const abs = path.join(ROOT, 'csharp/guide-csharp-complet.html');
  let s = fs.readFileSync(abs, 'utf8');
  const before = s;
  s = s.replace(/^\s*emoji:\s*'',\s*\r?\n/gm, '');
  s = s.replace(/title: ' /g, "title: '");
  if (s !== before) { fs.writeFileSync(abs, s); bump(); console.log('  guide  ', rel(abs)); }
}

// ── 3. POO C# : icônes des 9 concepts ─────────────────────────────────────
{
  const abs = path.join(ROOT, 'csharp/POO-Csharp-Final.html');
  let s = fs.readFileSync(abs, 'utf8');
  const before = s;

  const ICONS = ['blocks', 'gem', 'pin', 'wrench', 'bolt', 'lock', 'scale', 'layers', 'swap'];
  let n = 0;
  s = s.replace(/^(\s*)emoji:\s*'',/gm, (m, indent) => {
    const id = ICONS[n] || 'blocks';
    n++;
    return indent + "icon: '" + id + "',";
  });

  s = s.replace('btn.textContent = `${concept.emoji} ${concept.title}`;',
    'btn.innerHTML = `${ic(concept.icon)} ${concept.title}`;');
  s = s.replace('<h2 class="concept-title">${concept.emoji} ${concept.title}</h2>',
    '<h2 class="concept-title">${ic(concept.icon)} ${concept.title}</h2>');

  if (n) {
    s = s.replace(/<script>\r?\n(\s*)const conceptsData = \[/,
      '<script>\n$1const ic = n => n ? \'<svg class="ic" aria-hidden="true"><use href="' +
      SPRITE + '#i-\' + n + \'"></use></svg>\' : \'\';\n$1const conceptsData = [');
  }
  if (s !== before) { fs.writeFileSync(abs, s); bump(); console.log('  POO    ', rel(abs), '(' + n + ' icônes)'); }
}

// ── 4. formules.html : expression switch rendue à nouveau lisible ─────────
{
  const abs = path.join(ROOT, 'csharp/chapitres/formules.html');
  let s = fs.readFileSync(abs, 'utf8');
  const before = s;
  s = s.replace(/(<span class="kw">string<\/span> )emoji( = jour)/, '$1humeur$2');
  s = s.replace('<span class="str">"Lundi"</span> =&gt; <span class="str">""</span>,',
    '<span class="str">"Lundi"</span> =&gt; <span class="str">"Fatigué"</span>,');
  s = s.replace('<span class="str">"Vendredi"</span> =&gt; <span class="str">""</span>,',
    '<span class="str">"Vendredi"</span> =&gt; <span class="str">"Content"</span>,');
  s = s.replace('_ =&gt; <span class="str">""</span>',
    '_ =&gt; <span class="str">"Neutre"</span>');
  if (s !== before) { fs.writeFileSync(abs, s); bump(); console.log('  formules', rel(abs)); }
}

console.log('fichiers modifiés : ' + changed);
