/**
 * Script de vérification d'authentification
 * Injecté dans toutes les pages HTML du site
 * Bloque l'accès aux contenus protégés si l'utilisateur n'est pas authentifié
 * Seuls l'index et le chapitre 1 de chaque cours sont gratuits
 */
(function() {
  'use strict';

  // Ne pas exécuter sur les pages d'auth elles-mêmes
  if (window.location.pathname.startsWith('/_auth/')) return;

  var COURSE_DIRS = ['linux', 'php', 'probabilites', 'rd_java', 'rd_winserver', 'admin-vm', 'droit', 'RD-RO', 'sql', 'csharp', 'ccna', 'uml', 'uiux', 'epreuves'];
  var path = window.location.pathname;

  /**
   * Réplique côté client la logique serveur de access-control.js
   * Détermine si la page courante nécessite une clé d'activation
   */
  function isProtectedPage() {
    var cleanUrl = path.split('?')[0].split('#')[0];
    var parts = cleanUrl.split('/').filter(Boolean);

    // Pas assez de segments → fichier racine → libre
    if (parts.length < 2) return false;

    var courseName = parts[0];

    // Pas un dossier de cours → libre
    if (COURSE_DIRS.indexOf(courseName) === -1) return false;

    // Épreuves passées → tout protégé (index + PDF)
    if (courseName === 'epreuves') return true;

    var filename = parts[parts.length - 1] || '';
    var isQcmData = /qcm/i.test(filename) && (filename.endsWith('.js') || filename.endsWith('.json'));
    if (isQcmData) return true;

    // Assets toujours libres (CSS, JS, images) sauf PDF
    if (parts[1] === 'assets') return cleanUrl.endsWith('.pdf');

    // index.html du cours → libre
    if (parts.length === 2 && (parts[1] === 'index.html' || parts[1] === '')) return false;

    // Chapitre 1 → libre
    if (parts[1] === 'chapitres' && parts.length >= 3 && parts[2] === 'chapitre1.html') return false;

    // Seuls les fichiers HTML et PDF sont protégés
    if (!cleanUrl.endsWith('.html') && !cleanUrl.endsWith('.pdf')) return false;

    // Tout le reste dans un cours est protégé
    return true;
  }

  /**
   * Extrait le nom du cours depuis le chemin URL
   */
  function getCourseFromPath() {
    var parts = path.split('/').filter(Boolean);
    if (parts.length >= 1 && COURSE_DIRS.indexOf(parts[0]) !== -1) {
      return parts[0];
    }
    return null;
  }

  var protectedPage = isProtectedPage();
  var currentCourse = getCourseFromPath();

  // ── CRITIQUE : masquer immédiatement le contenu des pages protégées ──
  // Cela empêche le "flash" de contenu avant que le fetch async ne réponde
  if (protectedPage) {
    document.documentElement.classList.add('auth-content-hidden');
  }

  // Vérifier l'authentification auprès du serveur
  fetch('/api/verify', { credentials: 'include' })
    .then(function(res) { return res.json(); })
    .then(function(data) {
      if (data.authenticated) {
        // Vérifier que le scope couvre ce cours
        var hasAccess = data.scope === 'all' ||
          (currentCourse && data.scope && data.scope.split(',').indexOf(currentCourse) !== -1);

        if (protectedPage && !hasAccess) {
          // Authentifié mais pas accès à ce cours
          showBlockingOverlay('scope');
        } else {
          // Accès autorisé → révéler le contenu
          document.documentElement.classList.remove('auth-content-hidden');
          showAuthBadge(data.scope);
          addLogoutButton();
        }
      } else {
        if (protectedPage) {
          // Page protégée sans authentification → BLOQUER
          showBlockingOverlay(data.reason === 'expired' ? 'expired' : 'auth');
        } else {
          // Page libre → bandeau informatif
          showDemoBanner();
        }
      }
    })
    .catch(function() {
      if (protectedPage) {
        showBlockingOverlay('auth');
      } else {
        showDemoBanner();
      }
    });

  /**
   * Affiche un overlay plein écran bloquant l'accès au contenu
   * @param {string} reason - 'auth' (non authentifié) ou 'scope' (cours non inclus)
   */
  function showBlockingOverlay(reason) {
    // S'assurer que le contenu reste caché
    document.documentElement.classList.add('auth-content-hidden');

    var courseParam = currentCourse ? '&course=' + encodeURIComponent(currentCourse) : '';
    var redirectParam = encodeURIComponent(path);

    var title, message;
    if (reason === 'scope') {
      title = 'Acc\u00e8s non inclus dans votre licence';
      message = 'Votre cl\u00e9 d\'activation ne couvre pas ce cours. Contactez votre administrateur ou activez une cl\u00e9 valide pour ce module.';
    } else if (reason === 'expired') {
      title = 'Cl\u00e9 expir\u00e9e';
      message = 'Votre cl\u00e9 d\'activation a expir\u00e9. Contactez l\'administrateur pour la renouveler ou activer une nouvelle cl\u00e9.';
    } else {
      title = 'Contenu r\u00e9serv\u00e9 aux abonn\u00e9s';
      message = 'Ce chapitre n\u00e9cessite une cl\u00e9 d\'activation. Obtenez votre acc\u00e8s complet pour seulement <strong>1 000 F</strong> ! Contactez Donald pour votre cl\u00e9.';
    }

    var overlay = document.createElement('div');
    overlay.id = 'auth-blocking-overlay';
    overlay.innerHTML =
      '<div class="auth-block-card">' +
        '<div class="auth-block-icon">🔒</div>' +
        '<h2 class="auth-block-title">' + title + '</h2>' +
        '<p class="auth-block-message">' + message + '</p>' +
        '<div class="auth-block-actions">' +
          '<a href="/_auth/activate.html?redirect=' + redirectParam + courseParam + '" class="auth-block-btn auth-block-btn-primary">' +
            '🔑 Activer une clé d\'accès' +
          '</a>' +
          '<a href="/' + (currentCourse || '') + '/index.html" class="auth-block-btn auth-block-btn-secondary">' +
            '← Retour au sommaire' +
          '</a>' +
        '</div>' +
        '<p class="auth-block-hint">Vous avez déjà une clé ? <a href="/_auth/activate.html?redirect=' + redirectParam + courseParam + '">Cliquez ici pour l\'activer</a></p>' +
      '</div>';

    document.body.appendChild(overlay);
  }

  /**
   * Affiche un petit badge indiquant que l'utilisateur est connecté
   */
  function showAuthBadge(scope) {
    var badge = document.createElement('div');
    badge.id = 'auth-badge';

    var scopeText = 'Accès complet';
    if (scope !== 'all') {
      scopeText = 'Accès : ' + scope.split(',').join(', ');
    }

    badge.innerHTML =
      '<span class="auth-badge-dot"></span>' +
      '<span>' + scopeText + '</span>';
    document.body.appendChild(badge);
  }

  /**
   * Ajoute un bouton de déconnexion dans le badge
   */
  function addLogoutButton() {
    var badge = document.getElementById('auth-badge');
    if (!badge) return;

    var logoutBtn = document.createElement('button');
    logoutBtn.id = 'auth-logout-btn';
    logoutBtn.textContent = '✕';
    logoutBtn.title = 'Se déconnecter';
    logoutBtn.addEventListener('click', function() {
      if (confirm('Voulez-vous vous déconnecter ?')) {
        fetch('/api/logout', { method: 'POST', credentials: 'include' })
          .then(function() { window.location.reload(); });
      }
    });
    badge.appendChild(logoutBtn);
  }

  /**
   * Affiche un bandeau "mode démonstration" sur les pages libres
   * (index du cours, chapitre 1, page d'accueil)
   */
  function showDemoBanner() {
    var coursePattern = /^\/(linux|php|probabilites|rd_java|rd_winserver|admin-vm|droit|RD-RO|sql|csharp|ccna|uml|uiux)\//;
    var courseMatch = path.match(coursePattern);

    if (!courseMatch && path !== '/' && !path.endsWith('/index.html')) return;

    var courseParam = courseMatch ? '&course=' + encodeURIComponent(courseMatch[1]) : '';

    var banner = document.createElement('div');
    banner.id = 'demo-banner';
    banner.innerHTML =
      '<div class="demo-banner-content">' +
        '<span class="demo-banner-icon">🔒</span>' +
        '<span class="demo-banner-text">' +
          '<strong>Mode démonstration</strong> — Accès complet à <strong>1 000 F</strong> seulement ! ' +
          '<a href="/_auth/activate.html?redirect=' + encodeURIComponent(path) + courseParam + '" class="demo-banner-link">' +
            'Activer une clé d\'accès →' +
          '</a>' +
        '</span>' +
        '<button class="demo-banner-close" onclick="this.parentElement.parentElement.remove()" title="Fermer">✕</button>' +
      '</div>';
    document.body.prepend(banner);
  }

  // Fingerprint check désactivé — seule la déconnexion manuelle coupe l'accès
})();
