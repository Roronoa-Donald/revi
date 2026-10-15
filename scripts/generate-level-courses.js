#!/usr/bin/env node
/**
 * scripts/generate-level-courses.js
 *
 * Crée les dossiers des cours B1 (« cours B1 IT ») et B3 (« COURS_B3 », spé
 * Réseaux & Systèmes d'Information) à la racine, avec un `index.html` réel :
 * niveau, nom, et inventaire du programme issu des supports sources présents
 * sur disque (cours, TD, TP, examens). Aucun contenu inventé : la page décrit
 * ce que contiennent réellement les sources.
 *
 * Idempotent : ne réécrit que les fichiers portant le marqueur généré (ou absents).
 *
 * Usage : node scripts/generate-level-courses.js
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const MARKER = '<!-- generated:level-course -->';

// ── Manifeste : id → { source relatif, semestre éventuel } ────────────────────
const B1_DIR = 'cours B1 IT';
const B3_S1 = path.join('COURS_B3', 'SEMESTRE I');
const B3_S2 = path.join('COURS_B3', 'Semestre II');

const MANIFEST = [
  // ── B1 (24 modules) ──
  { id: 'b1-admin-windows', source: path.join(B1_DIR, 'ADMIN_WINDOWS') },
  { id: 'b1-algebre', source: path.join(B1_DIR, 'Algèbre linéaire') },
  { id: 'b1-algo', source: path.join(B1_DIR, 'Algorithmique') },
  { id: 'b1-anglais', source: path.join(B1_DIR, 'Anglais des affaires') },
  { id: 'b1-reseaux', source: path.join(B1_DIR, 'Architecture réseau') },
  { id: 'b1-bureautique', source: path.join(B1_DIR, 'Bureautique') },
  { id: 'b1-ccna1', source: path.join(B1_DIR, 'CCNA1') },
  { id: 'b1-architecture', source: path.join(B1_DIR, 'Circuit logique et architecture des ordinateurs') },
  { id: 'b1-robotique', source: path.join(B1_DIR, 'CLUB DE ROBOTIQUE') },
  { id: 'b1-cyber', source: path.join(B1_DIR, 'Cyber Sécurité') },
  { id: 'b1-droit', source: path.join(B1_DIR, 'DROIT') },
  { id: 'b1-fr-pro', source: path.join(B1_DIR, 'FR pro') },
  { id: 'b1-git', source: path.join(B1_DIR, 'Git') },
  { id: 'b1-c-cpp', source: path.join(B1_DIR, 'Langage C et C+') },
  { id: 'b1-linux', source: path.join(B1_DIR, 'LINUX') },
  { id: 'b1-merise', source: path.join(B1_DIR, 'Modélisation (MERISE)') },
  { id: 'b1-php', source: path.join(B1_DIR, 'php') },
  { id: 'b1-prog-web', source: path.join(B1_DIR, 'Prog WEB') },
  { id: 'b1-projet', source: path.join(B1_DIR, 'Proje') },
  { id: 'b1-python', source: path.join(B1_DIR, 'PYTHON') },
  { id: 'b1-sql', source: path.join(B1_DIR, 'SQL') },
  { id: 'b1-stats', source: path.join(B1_DIR, 'STATISTIQUE DESCRIPTIVE') },
  { id: 'b1-vb-excel', source: path.join(B1_DIR, 'VB Excel') },
  { id: 'b1-virtualisation', source: path.join(B1_DIR, 'Virtualisation des serveurs') },

  // ── B3 — Semestre I (14 modules) ──
  { id: 'b3-algo', source: path.join(B3_S1, 'Algorithmique'), semestre: 'S1' },
  { id: 'b3-cloud-computing', source: path.join(B3_S1, 'Cloud_computer'), semestre: 'S1' },
  { id: 'b3-devops', source: path.join(B3_S1, 'Devops'), semestre: 'S1' },
  { id: 'b3-document-technique', source: path.join(B3_S1, 'Document_technique'), semestre: 'S1' },
  { id: 'b3-etude-quantitative', source: path.join(B3_S1, 'Etude_quantitative_qualitative'), semestre: 'S1' },
  { id: 'b3-firewall', source: path.join(B3_S1, 'firwall'), semestre: 'S1' },
  { id: 'b3-github', source: path.join(B3_S1, 'Git_thub'), semestre: 'S1' },
  { id: 'b3-linux', source: path.join(B3_S1, 'Linux'), semestre: 'S1' },
  { id: 'b3-agile', source: path.join(B3_S1, 'Methode agiles'), semestre: 'S1' },
  { id: 'b3-pfsense', source: path.join(B3_S1, 'pfsense'), semestre: 'S1' },
  { id: 'b3-reseau-lan', source: path.join(B3_S1, 'Reseau_Lan'), semestre: 'S1' },
  { id: 'b3-sql', source: path.join(B3_S1, 'SQL'), semestre: 'S1' },
  { id: 'b3-veille', source: path.join(B3_S1, 'veille technologique'), semestre: 'S1' },
  { id: 'b3-windows-server', source: path.join(B3_S1, 'Windows_server'), semestre: 'S1' },

  // ── B3 — Semestre II (9 modules) ──
  { id: 'b3-anglais', source: path.join(B3_S2, 'Anglais'), semestre: 'S2' },
  { id: 'b3-cloud-azure', source: path.join(B3_S2, 'Cloud Azure'), semestre: 'S2' },
  { id: 'b3-cryptographie', source: path.join(B3_S2, 'Cryptographie'), semestre: 'S2' },
  { id: 'b3-google-cloud', source: path.join(B3_S2, 'Google Cloud'), semestre: 'S2' },
  { id: 'b3-hacking', source: path.join(B3_S2, 'hacking'), semestre: 'S2' },
  { id: 'b3-cloud-aws', source: path.join(B3_S2, 'Services Cloud AWS'), semestre: 'S2' },
  { id: 'b3-supervision', source: path.join(B3_S2, 'Supervision'), semestre: 'S2' },
  { id: 'b3-voip', source: path.join(B3_S2, 'Telephonie_voix_IP'), semestre: 'S2' },
  { id: 'b3-virtualisation', source: path.join(B3_S2, 'virtulisation'), semestre: 'S2' }
];

const registry = require(path.join(ROOT, 'server', 'courses.js'));

// ── Inventaire des supports ───────────────────────────────────────────────────
const DOC_EXT = new Set(['.pdf', '.docx', '.doc', '.pptx', '.ppt', '.odt', '.odp', '.txt', '.md']);
const MEDIA_EXT = new Set(['.mp4', '.webm', '.mp3', '.m4a', '.png', '.jpg', '.jpeg', '.zip', '.exe', '.iso', '.rar', '.7z', '.txt']);

function listFiles(dir, out = [], depth = 0) {
  if (depth > 3 || !fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) listFiles(full, out, depth + 1);
    else out.push(full);
  }
  return out;
}

function classify(name) {
  const n = name.toLowerCase();
  if (/^ef_|^cdp_|^dst_|examen|epreuve|épreuve|partiel/.test(n)) return { type: 'Évaluation', tone: 'eval' };
  if (/(^|[^a-z])td[^a-z]|travaux dirigés|travaux diriges/.test(n)) return { type: 'TD', tone: 'td' };
  if (/(^|[^a-z])tp[^a-z]|travaux pratiques|^tp/.test(n)) return { type: 'TP', tone: 'tp' };
  if (/exo|exercice|exercices/.test(n)) return { type: 'Exercices', tone: 'exo' };
  if (/^chap|chapitre|^ch[-_. ]?\d|cours|polycop|support|fondamentaux|initiation|introduction/.test(n)) return { type: 'Cours', tone: 'cours' };
  return { type: 'Support', tone: 'support' };
}

function cleanLabel(filename) {
  let s = filename.replace(/\.[^.]+$/, '');
  s = s.replace(/[_]+/g, ' ').replace(/\s{2,}/g, ' ').trim();
  return s;
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// Icône SVG du sprite partagé (aucun emoji).
function svgIcon(name, size) {
  const s = size || 28;
  const id = String(name || 'book').replace(/[^a-z-]/g, '');
  return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><use href="/assets/img/ui-icons.svg#i-${id}"></use></svg>`;
}

// ── Gabarit HTML ──────────────────────────────────────────────────────────────
function page({ id, name, level, icon, accent, docs, totalSource }) {
  const counts = docs.reduce((acc, d) => { acc[d.tone] = (acc[d.tone] || 0) + 1; return acc; }, {});
  const summary = [
    counts.cours ? `${counts.cours} support(s) de cours` : null,
    counts.td ? `${counts.td} TD` : null,
    counts.tp ? `${counts.tp} TP` : null,
    counts.exo ? `${counts.exo} série(s) d'exercices` : null,
    counts.eval ? `${counts.eval} évaluation(s)` : null,
    counts.support ? `${counts.support} document(s)` : null
  ].filter(Boolean).join(' · ');

  const items = docs.map((d) => `        <li class="doc doc--${d.tone}"><span class="doc__type">${d.type}</span><span class="doc__name">${esc(d.label)}</span></li>`).join('\n');

  return `<!DOCTYPE html>
${MARKER}
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(name)} — ${level.toUpperCase()} | Cours Interactif</title>
<meta name="description" content="Module ${esc(name)} (niveau ${level.toUpperCase()}) : programme, supports et progression.">
<link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap">
<link rel="stylesheet" href="/assets/css/tokens.css">
<style>
  :root { --course-accent: ${accent}; }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: var(--font-family, 'JetBrains Mono', system-ui, sans-serif); background: var(--color-bg, #faf7f2); color: var(--color-text, #1c1917); line-height: 1.65; }
  .wrap { max-width: 880px; margin: 0 auto; padding: 28px 20px 72px; }
  .top { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 28px; }
  .back { display: inline-flex; align-items: center; gap: 7px; color: var(--color-text-muted, #78716c); text-decoration: none; font-size: .82rem; font-weight: 600; }
  .back:hover { color: var(--color-text, #1c1917); }
  .level-badge { display: inline-flex; align-items: center; gap: 6px; font-size: .7rem; font-weight: 800; letter-spacing: .06em; text-transform: uppercase; padding: 4px 12px; border-radius: 999px; background: color-mix(in srgb, var(--course-accent) 14%, transparent); color: var(--course-accent); border: 1px solid color-mix(in srgb, var(--course-accent) 32%, transparent); }
  .hero { border: 1px solid var(--color-border, #e7e1d7); background: var(--color-bg-subtle, #fff); border-radius: 22px; padding: 34px 32px; box-shadow: 0 8px 30px rgba(28,25,23,.05); }
  .hero__icon { color: var(--course-accent); line-height: 1; }
  .hero h1 { font-size: clamp(1.5rem, 4vw, 2.1rem); margin: 12px 0 8px; letter-spacing: -.01em; }
  .hero p { color: var(--color-text-muted, #57534e); font-size: .92rem; max-width: 62ch; }
  .summary { margin-top: 16px; font-size: .8rem; color: var(--course-accent); font-weight: 600; }
  section { margin-top: 34px; }
  h2 { font-size: 1.05rem; margin-bottom: 6px; }
  .h2sub { font-size: .82rem; color: var(--color-text-muted, #57534e); margin-bottom: 16px; }
  ul.docs { list-style: none; display: grid; gap: 8px; }
  .doc { display: flex; align-items: center; gap: 12px; padding: 12px 14px; border: 1px solid var(--color-border, #e7e1d7); border-radius: 12px; background: var(--color-bg-subtle, #fff); font-size: .84rem; }
  .doc__type { flex-shrink: 0; width: 92px; font-size: .64rem; font-weight: 800; text-transform: uppercase; letter-spacing: .05em; color: var(--color-text-muted, #78716c); }
  .doc--cours .doc__type { color: #2563eb; } .doc--td .doc__type { color: #7c3aed; }
  .doc--tp .doc__type { color: #0d9488; } .doc--exo .doc__type { color: #d97706; }
  .doc--eval .doc__type { color: #dc2626; }
  .doc__name { color: var(--color-text, #1c1917); }
  .notice { margin-top: 34px; padding: 16px 18px; border-radius: 14px; border: 1px dashed var(--color-border, #e7e1d7); background: var(--color-bg-subtle, #fff); font-size: .82rem; color: var(--color-text-muted, #57534e); }
  .notice strong { color: var(--color-text, #1c1917); }
  footer { margin-top: 40px; text-align: center; font-size: .76rem; color: var(--color-text-muted, #a8a29e); }
  @media (max-width: 520px) { .doc { flex-direction: column; align-items: flex-start; gap: 4px; } .doc__type { width: auto; } }
</style>
</head>
<body>
<main class="wrap">
  <div class="top">
    <a class="back" href="/index.html">${svgIcon('arrow-left', 16)} Portail des cours</a>
    <span class="level-badge">${level.toUpperCase()} · ${level === 'b1' ? 'Licence 1' : 'Licence 3'}</span>
  </div>

  <header class="hero">
    <div class="hero__icon">${svgIcon(icon, 34)}</div>
    <h1>${esc(name)}</h1>
    <p>Module de ${level.toUpperCase()}${summary ? ' — ' + esc(summary) : ''}.</p>
    <div class="summary">${docs.length} élément(s) de programme référencé(s)${totalSource > docs.length ? ` · ${totalSource} fichiers sources au total` : ''}</div>
  </header>

  <section aria-labelledby="prog">
    <h2 id="prog">Programme & supports du module</h2>
    <p class="h2sub">Inventaire des ressources pédagogiques de ce module (cours, TD, TP, exercices, évaluations).</p>
    <ul class="docs">
${items || '      <li class="doc"><span class="doc__name">Aucun support listé pour le moment.</span></li>'}
    </ul>
  </section>

  <div class="notice">
    <strong>Progression pédagogique.</strong> Ce module expose son programme officiel et ses supports.
    Les chapitres interactifs (théorie, exemples, exercices progressifs, QCM, examen blanc) sont
    produits cours par cours, dans l'ordre défini par la refonte académique. Les niveaux
    supérieurs incluent les niveaux inférieurs : ton niveau d'accès détermine les modules débloqués.
  </div>

  <footer>Cours Interactifs — ${esc(name)} (${level.toUpperCase()})</footer>
</main>
</body>
</html>
`;
}

// ── Génération ────────────────────────────────────────────────────────────────
let created = 0, updated = 0, skipped = 0, missingSource = 0;

for (const entry of MANIFEST) {
  const course = registry.COURSES[entry.id];
  if (!course) { console.error(`  [!!] ${entry.id} absent du registre — ignoré`); continue; }

  const srcDir = path.join(ROOT, entry.source);
  const files = listFiles(srcDir);
  if (files.length === 0) { missingSource++; }

  const docs = files
    .filter((f) => DOC_EXT.has(path.extname(f).toLowerCase()))
    .map((f) => {
      const label = cleanLabel(path.basename(f));
      const { type, tone } = classify(path.basename(f));
      return { label, type, tone };
    })
    .sort((a, b) => a.label.localeCompare(b.label, 'fr'));

  const html = page({
    id: entry.id,
    name: course.name,
    level: course.level,
    icon: course.icon,
    accent: course.theme ? course.theme.accent : '#456dff',
    docs,
    totalSource: files.length
  });

  const destDir = path.join(ROOT, entry.id);
  const destFile = path.join(destDir, 'index.html');
  fs.mkdirSync(destDir, { recursive: true });

  if (fs.existsSync(destFile)) {
    const existing = fs.readFileSync(destFile, 'utf8');
    if (!existing.includes(MARKER)) { skipped++; continue; } // page non générée → ne pas écraser
    if (existing === html) { continue; }
    fs.writeFileSync(destFile, html, 'utf8');
    updated++;
  } else {
    fs.writeFileSync(destFile, html, 'utf8');
    created++;
  }
}

console.log(`[ok] ${MANIFEST.length} cours traités — ${created} créés, ${updated} mis à jour, ${skipped} préservés (non générés)`);
if (missingSource > 0) console.log(`   [!!] ${missingSource} module(s) sans dossier source trouvé (programme vide)`);
