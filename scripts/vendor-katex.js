#!/usr/bin/env node
/**
 * Vendoring de KaTeX.
 *
 * KaTeX est servi localement depuis /assets/vendor/katex/ : la CSP du site
 * reste fermée (aucun appel tiers) et le rendu mathématique fonctionne hors-ligne.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'node_modules', 'katex', 'dist');
const DEST = path.join(ROOT, 'assets', 'vendor', 'katex');

const args = process.argv.slice(2);
const CHECK = args.includes('--check');

const REQUIRED = [
  'katex.min.css',
  'katex.min.js',
  'auto-render.min.js'
];

if (CHECK) {
  for (const file of REQUIRED) {
    const p = path.join(DEST, file);
    if (!fs.existsSync(p)) {
      console.error(`[vendor:katex] Manquant : ${file}`);
      process.exit(1);
    }
  }
  console.log('[vendor:katex] KaTeX vendored OK.');
  process.exit(0);
}

if (!fs.existsSync(SRC)) {
  console.error('[vendor:katex] node_modules/katex introuvable. Exécutez npm install katex.');
  process.exit(1);
}

fs.mkdirSync(DEST, { recursive: true });
fs.mkdirSync(path.join(DEST, 'fonts'), { recursive: true });

fs.copyFileSync(path.join(SRC, 'katex.min.css'), path.join(DEST, 'katex.min.css'));
fs.copyFileSync(path.join(SRC, 'katex.min.js'), path.join(DEST, 'katex.min.js'));
fs.copyFileSync(path.join(SRC, 'contrib', 'auto-render.min.js'), path.join(DEST, 'auto-render.min.js'));

const fontsSrc = path.join(SRC, 'fonts');
const fontsDest = path.join(DEST, 'fonts');
for (const f of fs.readdirSync(fontsSrc)) {
  fs.copyFileSync(path.join(fontsSrc, f), path.join(fontsDest, f));
}

console.log('[vendor:katex] KaTeX copié avec succès dans assets/vendor/katex/');
