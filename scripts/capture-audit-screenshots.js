const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const mode = process.argv[2] || 'before';
const outDir = path.join(__dirname, '..', 'design-audit', mode);

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 390, height: 844 },
  { name: 'small-mobile', width: 360, height: 800 }
];

const PAGES = [
  { key: 'portal', url: 'http://127.0.0.1:3000/index.html' },
  { key: 'sommaire', url: 'http://127.0.0.1:3000/RD-RO/sommaire.html' },
  { key: 'chapter-case', url: 'http://127.0.0.1:3000/RD-RO/chapitres/chapitre1.html' },
  { key: 'chapter-code', url: 'http://127.0.0.1:3000/b1-python/chapitres/chapitre1.html' },
  { key: 'atelier', url: 'http://127.0.0.1:3000/b1-python/atelier.html' }
];

console.log(`[Audit] Capturing screenshots for mode: ${mode}`);

for (const page of PAGES) {
  for (const vp of VIEWPORTS) {
    const filename = `${page.key}-${vp.width}x${vp.height}.png`;
    const targetPath = path.join(outDir, filename);
    const cmd = `chromium --headless --disable-gpu --screenshot="${targetPath}" --window-size=${vp.width},${vp.height} "${page.url}"`;
    try {
      execSync(cmd, { stdio: 'pipe' });
      const stats = fs.statSync(targetPath);
      console.log(`✓ Saved ${filename} (${Math.round(stats.size / 1024)} KB)`);
    } catch (err) {
      console.error(`✗ Failed to capture ${filename}:`, err.message);
    }
  }
}

console.log(`[Audit] Completed ${PAGES.length * VIEWPORTS.length} captures in ${outDir}`);
