'use strict';
/**
 * Garde-fou de langue : empêche le retour des corruptions produites par des remplacements automatiques
 * (mots coupés « requêvos », « Vous dois », « affichezz », mots collés, formules LaTeX cassées…).
 * Ce test lit les pages HTML publiques (hors dist/, audit/, node_modules/).
 */
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SKIP = new Set(['node_modules', 'dist', 'audit', 'design-audit', '.git', 'tests', 'server', 'scripts', 'api']);

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}
function visibleText(html) {
  return html
    .replace(/<(script|style|pre|code|textarea)[\s\S]*?<\/\1>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
}
const PAGES = walk(ROOT).map((f) => ({ f: path.relative(ROOT, f), raw: fs.readFileSync(f, 'utf8') }));

const RULES = [
  ['mot terminé par « vos » (conversion tes→vos dans un mot)', /[a-zàâçéèêëîïôûù](?:vos)\b/gi],
  ['« Vous » + verbe conjugué à la 2e personne du singulier', /\b[Vv]ous (?:ne |n['’])?(?:dois|viens|veux|écris|peux|connais|sais|fais|vas|es|as|te)\b/g],
  ['forme « affichezz »', /affichezz/g],
  ['« votre de voix » (ton de voix)', /votre de voix/g],
  ['préposition « Entre » transformée en « Entrez »', /Entrez (?:virgules|guillemets|parenth|crochets)/g],
  ['nom transformé en verbe (Notez obtenue, Gardez-Fous…)', /Notez (?:obtenue|attendue|d’opportunité)|Passez-partout|Gardez-Fous|Filtrez WMI/g],
  ['inversion cassée « es-vous / as-vous »', /\b(?:es|as)-vous\b/g],
  ['futur de 2e personne après « vous »', /\bvous (?:réutiliseras|ré-échapperas|verras|feras)\b/g],
  ['mot collé « méthodique… »', /méthodique(?:et|dans|pour|pur)\b/g],
  ['consigne cassée « il Indiquez »', /\b[Ii]l (?:Indiquez|Analysez)\b/g],
  ['faute « Associater »', /Associater/g],
  ['« L’page »', /L[’']\s*(?:<a[^>]*>)?page\b/g]
];

for (const [label, rx] of RULES) {
  test('langue : aucune occurrence — ' + label, () => {
    const hits = [];
    for (const { f, raw } of PAGES) {
      const m = visibleText(raw).match(rx);
      if (m) hits.push(f + ' → ' + m.slice(0, 2).join(' | '));
    }
    assert.deepStrictEqual(hits.slice(0, 10), [], hits.length + ' page(s) concernée(s)');
  });
}

test('formules LaTeX : ni double antislash, ni mot LaTeX sans antislash, ni \\t/\\b/\\f/\\r corrompu', () => {
  const hits = [];
  for (const { f, raw } of PAGES) {
    const body = raw.replace(/<(script|style|pre|code|textarea)[\s\S]*?<\/\1>/g, ' ');
    for (const m of body.matchAll(/\$([^$\n]{1,200})\$/g)) {
      const s = m[1];
      if (/\\\\[a-zA-Z]/.test(s)) hits.push(f + ' : double antislash : ' + s.slice(0, 40));
      else if (/\d\s(?:le|ge|times|leq|geq)\s\d|\bn le \d|\bimes\b/.test(s)) hits.push(f + ' : antislash perdu : ' + s.slice(0, 40));
    }
    if (/[\t](?:imes|heta|ext\{)|[\b](?:eta|egin)|[\f]rac/.test(body)) hits.push(f + ' : caractère de contrôle dans une formule');
  }
  assert.deepStrictEqual(hits.slice(0, 10), [], hits.length + ' formule(s) cassée(s)');
});

test('cartes de révision : aucune carte « Qu’est-ce que « X » ? » dont la réponse répète seulement X', () => {
  const norm = (s) => s.replace(/<[^>]+>/g, ' ').toLowerCase().replace(/[^a-zàâçéèêëîïôûùü0-9 ]/g, '').replace(/\s+/g, ' ').trim();
  const hits = [];
  for (const { f, raw } of PAGES) {
    if (!/\/cartes\.html$/.test(f)) continue;
    for (const m of raw.matchAll(/<b>Question<\/b>([\s\S]*?)<\/div><div class="fc__face fc__back"><b>Réponse<\/b>([\s\S]*?)<\/div>/g)) {
      const q = /^\s*Qu[’']est-ce que [«"](.+?)[»"]/.exec(m[1].replace(/<[^>]+>/g, ''));
      if (!q) continue;
      const n = norm(q[1]); const a = norm(m[2]);
      if (a === n || (a.startsWith(n) && a.length <= n.length + 8)) hits.push(f + ' → ' + q[1].slice(0, 50));
    }
  }
  assert.deepStrictEqual(hits.slice(0, 10), [], hits.length + ' carte(s) tautologique(s)');
});

test('cartes de révision : aucune réponse coupée en plein milieu d’une phrase', () => {
  const hits = [];
  for (const { f, raw } of PAGES) {
    if (!/\/cartes\.html$/.test(f)) continue;
    for (const m of raw.matchAll(/<div class="fc__face fc__back"><b>Réponse<\/b>([\s\S]*?)<\/div>/g)) {
      const plain = m[1].replace(/<[^>]+>/g, '').replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&[a-z]+;/g, ' ').trim();
      if (plain.length >= 150 && !/[.!?»)\]%\d;>]$/.test(plain)) hits.push(f + ' → …' + plain.slice(-40));
    }
  }
  assert.deepStrictEqual(hits.slice(0, 10), [], hits.length + ' carte(s) coupée(s)');
});
