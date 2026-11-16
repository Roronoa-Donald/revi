/* ════════════════════════════════════════════════════════════════════════════
   THEME — Gestion light/dark avec anti-flash et persistence
   ════════════════════════════════════════════════════════════════════════════ */

/* Anti-flash: appliqué avant le rendu pour éviter le flash de thème */
(function() {
  var t = localStorage.getItem('theme');
  if (t === 'dark' || t === 'light') {
    document.documentElement.setAttribute('data-theme', t);
  } else {
    // v3.1 — thème clair par défaut, indépendant des préférences système
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();

function syncThemeToggle(theme) {
  var btn = document.getElementById('themeToggle');
  if (!btn) return;
  var current = theme || document.documentElement.getAttribute('data-theme') || 'light';
  var isDark = current === 'dark';
  btn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
  btn.setAttribute('aria-label', isDark ? 'Activer le mode clair' : 'Activer le mode sombre');
}

/* Toggle handler — appelé par le bouton */
function toggleTheme() {
  var html = document.documentElement;
  var current = html.getAttribute('data-theme') || 'light';
  var next = current === 'dark' ? 'light' : 'dark';

  // Active temporairement la transition fluide (150ms) pour la bascule interactive
  html.classList.add('theme-transitioning');
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);

  // Update toggle button icon visibility & accessibility label
  syncThemeToggle(next);

  // Retire la classe après l'animation pour libérer les performances de rendu
  setTimeout(function() {
    html.classList.remove('theme-transitioning');
  }, 220);
}
window.toggleTheme = toggleTheme;
window.syncThemeToggle = syncThemeToggle;

/* Init: set initial aria-label + aria-pressed on toggle button */
syncThemeToggle();
if (typeof document !== 'undefined' && document.addEventListener) {
  document.addEventListener('DOMContentLoaded', function() { syncThemeToggle(); });
}
