#!/usr/bin/env node
/**
 * Vendoring de Monaco Editor.
 *
 * Monaco est servi localement (aucun CDN tiers) : la CSP du site reste fermée
 * et l'éditeur reste disponible si un réseau est filtré.
 *
 * Prérequis (monaco n'est volontairement PAS une dépendance du projet, pour ne
 * pas alourdir l'installation Vercel) :
 *
 *   npm install --no-save monaco-editor@<version>
 *   node scripts/vendor-monaco.js
 *
 * Le résultat (assets/vendor/monaco/vs) est un artefact versionné sur disque.
 *
 * Options :
 *   --version <v>   installe la version demandée avant de copier
 *   --check         vérifie que le vendored est à jour, ne copie rien
 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'node_modules', 'monaco-editor', 'min', 'vs');
const DEST = path.join(ROOT, 'assets', 'vendor', 'monaco', 'vs');

const args = process.argv.slice(2);
const CHECK = args.includes('--check');
const versionIdx = args.indexOf('--version');
const VERSION = versionIdx !== -1 ? args[versionIdx + 1] : null;

// Fichiers indispensables au chargement de l'éditeur : leur absence signifie
// que le sous-ensemble copié est incomplet (le loader AMD échouerait à
// l'exécution, pas au build).
const REQUIRED = [
  'loader.js',
  'editor/editor.main.js',
  'editor/editor.main.css',
  'base/worker/workerMain.js',
  'basic-languages/python/python.js'
];

function rel(p) {
  return path.relative(ROOT, p).split(path.sep).join('/');
}

function walk(dir, base = dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, base, out);
    else out.push(path.relative(base, full).split(path.sep).join('/'));
  }
  return out;
}

function main() {
  if (VERSION) {
    console.log(`[..] installation de monaco-editor@${VERSION}`);
    execFileSync('npm', ['install', '--no-save', '--no-audit', '--no-fund', `monaco-editor@${VERSION}`], {
      cwd: ROOT,
      stdio: 'inherit'
    });
  }

  if (!fs.existsSync(SRC)) {
    console.error(`[!!] ${rel(SRC)} introuvable.`);
    console.error('     Lancez : npm install --no-save monaco-editor@0.52.2');
    process.exit(1);
  }

  const files = walk(SRC);

  if (CHECK) {
    const missing = files.filter(f => !fs.existsSync(path.join(DEST, f)));
    const required = REQUIRED.filter(f => !fs.existsSync(path.join(DEST, f)));
    if (missing.length || required.length) {
      console.error(`[!!] vendored incomplet : ${missing.length} fichier(s) manquant(s)`);
      for (const f of required) console.error(`     requis manquant : ${f}`);
      process.exit(1);
    }
    console.log(`[ok] assets/vendor/monaco/vs complet (${files.length} fichiers)`);
    return;
  }

  fs.rmSync(DEST, { recursive: true, force: true });
  fs.mkdirSync(DEST, { recursive: true });

  let copied = 0;
  let bytes = 0;
  for (const file of files) {
    const from = path.join(SRC, file);
    const to = path.join(DEST, file);
    fs.mkdirSync(path.dirname(to), { recursive: true });
    fs.copyFileSync(from, to);
    copied++;
    bytes += fs.statSync(to).size;
  }

  const missing = REQUIRED.filter(f => !fs.existsSync(path.join(DEST, f)));
  if (missing.length) {
    console.error('[!!] copie incomplète, fichiers requis absents :');
    for (const f of missing) console.error(`     ${f}`);
    process.exit(1);
  }

  console.log(`[ok] Monaco vendored : ${copied} fichiers, ${(bytes / 1024 / 1024).toFixed(1)} Mo → assets/vendor/monaco/vs`);
}

main();
