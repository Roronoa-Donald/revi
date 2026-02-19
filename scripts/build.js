#!/usr/bin/env node
/**
 * Script de build pour Vercel (et optionnellement Render)
 * 
 * Ce script :
 * 1. Copie tous les fichiers du site (cours, assets, etc.) dans dist/
 * 2. Injecte les scripts d'authentification dans chaque fichier HTML
 * 3. Copie les fichiers auth (public/) dans dist/_auth/
 * 
 * Résultat : dist/ contient un site statique complet avec auth injectée,
 * prêt à être servi par le CDN Vercel ou tout autre hébergeur statique.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const PUBLIC_DIR = path.join(ROOT, 'public');

// Dossiers de cours à copier
const COURSE_DIRS = ['linux', 'php', 'probabilites', 'rd_java', 'rd_winserver', 'RD-RO', 'sql', 'csharp', 'uml', 'ccna'];

// Fichiers/dossiers racine à copier (en plus des cours)
const ROOT_FILES = ['index.html', 'robots.txt', 'sitemap.xml', '404.html', 'rd-ai-chat.js'];

// Dossiers à ne jamais copier
const SKIP_DIRS = ['node_modules', '.git', 'server', 'api', 'scripts', 'dist', 'public', 'cours windows', 'ref', 'cours', 'exos'];

// Extensions à ne pas traiter
const BINARY_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.ico', '.svg', '.webp', '.woff', '.woff2', '.ttf', '.otf', '.eot', '.pdf', '.mp4', '.webm', '.mp3'];

// Injection HTML
const AUTH_INJECT_HEAD = '<link rel="stylesheet" href="/_auth/css/auth-styles.css">';
const AUTH_INJECT_BODY = '<script src="/_auth/js/fingerprint.js"></script>\n<script src="/_auth/js/auth-check.js"></script>\n<script src="/rd-ai-chat.js"></script>';

// ========================
// Fonctions utilitaires
// ========================

function cleanDir(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true });
  }
  fs.mkdirSync(dir, { recursive: true });
}

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });

  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      // Ignorer les dossiers exclus
      if (SKIP_DIRS.includes(entry.name)) continue;
      copyDirRecursive(srcPath, destPath);
    } else {
      // Ignorer les fichiers de référence (PDFs, docs source, scripts Python)
      const ext = path.extname(entry.name).toLowerCase();
      if (['.pdf', '.docx', '.doc', '.py'].includes(ext)) continue;
      // Ignorer les fichiers .txt sauf ceux dans les dossiers de cours principaux
      if (ext === '.txt' && !entry.name.includes('robots')) continue;

      if (ext === '.html') {
        // Injecter les scripts d'auth dans les fichiers HTML
        let content = fs.readFileSync(srcPath, 'utf-8');
        content = injectAuth(content);
        fs.writeFileSync(destPath, content, 'utf-8');
      } else {
        // Copie binaire pour tout le reste
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
}

function injectAuth(html) {
  // Injecter le CSS avant </head>
  if (html.includes('</head>')) {
    html = html.replace('</head>', AUTH_INJECT_HEAD + '\n</head>');
  }
  // Injecter le JS avant </body>
  if (html.includes('</body>')) {
    html = html.replace('</body>', AUTH_INJECT_BODY + '\n</body>');
  }
  return html;
}

function copyFileIfExists(src, dest) {
  if (fs.existsSync(src)) {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    const ext = path.extname(src).toLowerCase();
    if (ext === '.html') {
      let content = fs.readFileSync(src, 'utf-8');
      content = injectAuth(content);
      fs.writeFileSync(dest, content, 'utf-8');
    } else {
      fs.copyFileSync(src, dest);
    }
  }
}

// ========================
// Build
// ========================

console.log('🔨 Build démarré...\n');
const startTime = Date.now();

// 1. Nettoyer dist/
cleanDir(DIST);
console.log('  ✅ dist/ nettoyé');

// 2. Copier les dossiers de cours avec injection
let htmlCount = 0;
let fileCount = 0;

for (const courseDir of COURSE_DIRS) {
  const src = path.join(ROOT, courseDir);
  if (fs.existsSync(src)) {
    copyDirRecursive(src, path.join(DIST, courseDir));
    // Compter les fichiers
    const count = countFiles(path.join(DIST, courseDir));
    fileCount += count.total;
    htmlCount += count.html;
    console.log(`  📚 ${courseDir}/ → ${count.total} fichiers (${count.html} HTML injectés)`);
  }
}

// 3. Copier les fichiers racine
for (const file of ROOT_FILES) {
  const src = path.join(ROOT, file);
  if (fs.existsSync(src)) {
    copyFileIfExists(src, path.join(DIST, file));
    fileCount++;
    if (file.endsWith('.html')) htmlCount++;
    console.log(`  📄 ${file}`);
  }
}

// 4. Copier public/ → dist/_auth/ (pages d'authentification)
if (fs.existsSync(PUBLIC_DIR)) {
  copyDirRecursive(PUBLIC_DIR, path.join(DIST, '_auth'));
  const authCount = countFiles(path.join(DIST, '_auth'));
  fileCount += authCount.total;
  console.log(`  🔑 _auth/ → ${authCount.total} fichiers`);
}

// 5. Créer un _redirects pour les SPA-like rewrites (Render static)
const redirectsContent = `# Rewrites pour API
/api/*  /api/:splat  200
`;
// Ce fichier n'est utile que pour certains hébergeurs statiques

const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
console.log(`\n✨ Build terminé en ${elapsed}s`);
console.log(`   ${fileCount} fichiers copiés, ${htmlCount} HTML avec auth injectée`);
console.log(`   Sortie : dist/\n`);

function countFiles(dir) {
  let total = 0, html = 0;
  if (!fs.existsSync(dir)) return { total, html };
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const sub = countFiles(path.join(dir, entry.name));
      total += sub.total;
      html += sub.html;
    } else {
      total++;
      if (entry.name.endsWith('.html')) html++;
    }
  }
  return { total, html };
}
