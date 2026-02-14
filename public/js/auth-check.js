/**
 * Script de vérification d'authentification
 * Injecté dans toutes les pages HTML du site
 * Affiche un bandeau "mode démo" si l'utilisateur n'est pas authentifié
 */
(function() {
  'use strict';

  // Ne pas exécuter sur les pages d'auth elles-mêmes
  if (window.location.pathname.startsWith('/_auth/')) return;

  // Vérifier l'authentification
  fetch('/api/verify', { credentials: 'include' })
    .then(res => res.json())
    .then(data => {
      if (data.authenticated) {
        showAuthBadge(data.scope);
        addLogoutButton();
      } else {
        showDemoBanner();
      }
    })
    .catch(() => {
      showDemoBanner();
    });

  /**
   * Affiche un petit badge indiquant que l'utilisateur est connecté
   */
  function showAuthBadge(scope) {
    const badge = document.createElement('div');
    badge.id = 'auth-badge';

    let scopeText = 'Accès complet';
    if (scope !== 'all') {
      scopeText = 'Accès : ' + scope.split(',').join(', ');
    }

    badge.innerHTML = `
      <span class="auth-badge-dot"></span>
      <span>${scopeText}</span>
    `;
    document.body.appendChild(badge);
  }

  /**
   * Ajoute un bouton de déconnexion dans le badge
   */
  function addLogoutButton() {
    const badge = document.getElementById('auth-badge');
    if (!badge) return;

    const logoutBtn = document.createElement('button');
    logoutBtn.id = 'auth-logout-btn';
    logoutBtn.textContent = '✕';
    logoutBtn.title = 'Se déconnecter';
    logoutBtn.addEventListener('click', async () => {
      if (confirm('Voulez-vous vous déconnecter ?')) {
        await fetch('/api/logout', { method: 'POST', credentials: 'include' });
        window.location.reload();
      }
    });
    badge.appendChild(logoutBtn);
  }

  /**
   * Affiche un bandeau "mode démonstration" en haut de page
   */
  function showDemoBanner() {
    // Vérifier si on est sur une page de cours (pas la racine)
    const path = window.location.pathname;
    const coursePattern = /^\/(linux|php|probabilites|rd_java|rd_winserver|RD-RO|sql)\//;
    const courseMatch = path.match(coursePattern);

    if (!courseMatch && path !== '/' && !path.endsWith('/index.html')) return;

    // Extraire le nom du cours pour le passer à la page d'activation
    const courseParam = courseMatch ? '&course=' + encodeURIComponent(courseMatch[1]) : '';

    const banner = document.createElement('div');
    banner.id = 'demo-banner';
    banner.innerHTML = `
      <div class="demo-banner-content">
        <span class="demo-banner-icon">🔒</span>
        <span class="demo-banner-text">
          <strong>Mode démonstration</strong> — Seul le premier chapitre est accessible.
          <a href="/_auth/activate.html?redirect=${encodeURIComponent(path)}${courseParam}" class="demo-banner-link">
            Activer une clé d'accès →
          </a>
        </span>
        <button class="demo-banner-close" onclick="this.parentElement.parentElement.remove()" title="Fermer">✕</button>
      </div>
    `;
    document.body.prepend(banner);
  }

  // Vérification périodique du fingerprint (toutes les 10 minutes)
  if (typeof generateFingerprint === 'function') {
    setInterval(async () => {
      try {
        const fp = generateFingerprint();
        const res = await fetch('/api/verify-fingerprint', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fingerprint: fp }),
          credentials: 'include'
        });
        const data = await res.json();
        if (data.valid === false && data.reason === 'fingerprint_mismatch') {
          // Session invalidée — recharger pour afficher le mode démo
          window.location.reload();
        }
      } catch (e) { /* ignore */ }
    }, 10 * 60 * 1000);
  }
})();
