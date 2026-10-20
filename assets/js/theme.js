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
  var btn = document.getElementById('themeToggle');
  if (btn) btn.setAttribute('aria-label', next === 'dark' ? 'Activer le mode clair' : 'Activer le mode sombre');

  // Retire la classe après l'animation pour libérer les performances de rendu
  setTimeout(function() {
    html.classList.remove('theme-transitioning');
  }, 220);
}
window.toggleTheme = toggleTheme;

/* Init: set initial aria-label on toggle button */
(function() {
  var btn = document.getElementById('themeToggle');
  if (!btn) return;
  var current = document.documentElement.getAttribute('data-theme') || 'light';
  btn.setAttribute('aria-label', current === 'dark' ? 'Activer le mode clair' : 'Activer le mode sombre');
})();
