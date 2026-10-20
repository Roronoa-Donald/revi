/**
 * Script de vérification d'authentification (comptes utilisateurs)
 * Injecté dans toutes les pages HTML du site.
 *
 * Politique :
 *  - Pages libres (portail, index de cours, chapitre 1) : AUCUNE trace d'abonnement.
 *  - Contenu payant sans abonnement : overlay paywall avec Se connecter / S'abonner.
 *  - Niveau insuffisant (B1 sur un cours B2/B3) : overlay « niveau insuffisant ».
 *  - Utilisateur connecté : badge discret + déconnexion.
 */
(function () {
  'use strict';

  // Ne pas exécuter sur les pages d'auth elles-mêmes
  if (window.location.pathname.startsWith('/_auth/')) return;

  // >>> COURSE_REGISTRY (généré depuis server/courses.js par scripts/sync-courses.js — NE PAS ÉDITER À LA MAIN)
    var COURSE_DIRS = ['linux', 'php', 'probabilites', 'rd_java', 'rd_winserver', 'admin-vm', 'droit', 'react', 'api-rest-flask', 'erp-si', 'ingenierie-besoin', 'masterclass-apprendre', 'RD-RO', 'assembleur', 'Cyber securite B2', 'sql', 'csharp', 'ccna', 'uml', 'uiux', 'docker', 'infographie', 'preparation-web', 'epreuves', 'b1-admin-windows', 'b1-algebre', 'b1-algo', 'b1-anglais', 'b1-reseaux', 'b1-bureautique', 'b1-ccna1', 'b1-architecture', 'b1-robotique', 'b1-cyber', 'b1-droit', 'b1-fr-pro', 'b1-git', 'b1-c-cpp', 'b1-linux', 'b1-merise', 'b1-php', 'b1-prog-web', 'b1-projet', 'b1-python', 'b1-sql', 'b1-stats', 'b1-vb-excel', 'b1-virtualisation', 'b3-algo', 'b3-cloud-computing', 'b3-devops', 'b3-document-technique', 'b3-etude-quantitative', 'b3-firewall', 'b3-github', 'b3-linux', 'b3-agile', 'b3-pfsense', 'b3-reseau-lan', 'b3-sql', 'b3-veille', 'b3-windows-server', 'b3-anglais', 'b3-cloud-azure', 'b3-cryptographie', 'b3-google-cloud', 'b3-hacking', 'b3-cloud-aws', 'b3-supervision', 'b3-voip', 'b3-virtualisation'];
    var COURSE_LEVELS = {"linux":"b2","php":"b2","probabilites":"b2","rd_java":"b2","rd_winserver":"b2","admin-vm":"b2","droit":"b2","react":"b2","api-rest-flask":"b2","erp-si":"b2","ingenierie-besoin":"b2","masterclass-apprendre":"b2","RD-RO":"b2","assembleur":"b2","Cyber securite B2":"b2","sql":"b2","csharp":"b2","ccna":"b2","uml":"b2","uiux":"b2","docker":"b2","infographie":"b2","preparation-web":"b2","epreuves":"b2","b1-admin-windows":"b1","b1-algebre":"b1","b1-algo":"b1","b1-anglais":"b1","b1-reseaux":"b1","b1-bureautique":"b1","b1-ccna1":"b1","b1-architecture":"b1","b1-robotique":"b1","b1-cyber":"b1","b1-droit":"b1","b1-fr-pro":"b1","b1-git":"b1","b1-c-cpp":"b1","b1-linux":"b1","b1-merise":"b1","b1-php":"b1","b1-prog-web":"b1","b1-projet":"b1","b1-python":"b1","b1-sql":"b1","b1-stats":"b1","b1-vb-excel":"b1","b1-virtualisation":"b1","b3-algo":"b3","b3-cloud-computing":"b3","b3-devops":"b3","b3-document-technique":"b3","b3-etude-quantitative":"b3","b3-firewall":"b3","b3-github":"b3","b3-linux":"b3","b3-agile":"b3","b3-pfsense":"b3","b3-reseau-lan":"b3","b3-sql":"b3","b3-veille":"b3","b3-windows-server":"b3","b3-anglais":"b3","b3-cloud-azure":"b3","b3-cryptographie":"b3","b3-google-cloud":"b3","b3-hacking":"b3","b3-cloud-aws":"b3","b3-supervision":"b3","b3-voip":"b3","b3-virtualisation":"b3"};
    var LEVEL_RANK = { b1: 1, b2: 2, b3: 3 };
    // <<< COURSE_REGISTRY
  var path = window.location.pathname;

  // Icône SVG du sprite partagé (aucun emoji). Attributs explicites : la page
  // hôte n'a pas forcément la feuille de styles du cours.
  function svgIcon(name, size) {
    var s = size || 28;
    return '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" aria-hidden="true" focusable="false" ' +
      'fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">' +
      '<use href="/assets/img/ui-icons.svg#i-' + String(name || 'book').replace(/[^a-z-]/g, '') + '"></use></svg>';
  }

  /**
   * Réplique côté client la logique serveur (access-control / middleware).
   * Contenu PAYANT : QCM data, chapitres >= 2, PDFs, epreuves, preparation-web.
   */
  function isProtectedPage() {
    var cleanUrl = path.split('?')[0].split('#')[0];
    var parts = cleanUrl.split('/').filter(Boolean);

    if (parts.length < 2) return false;

    var courseName = parts[0];
    if (COURSE_DIRS.indexOf(courseName) === -1) return false;
    if (courseName === 'epreuves') return true;

    var filename = parts[parts.length - 1] || '';
    var isQcmData = /qcm/i.test(filename) && (filename.endsWith('.js') || filename.endsWith('.json'));
    if (isQcmData) return true;

    if (parts[1] === 'assets') return cleanUrl.endsWith('.pdf');

    if (parts.length === 2 && (parts[1] === 'index.html' || parts[1] === 'sommaire.html' || parts[1] === '')) return false;
    if (parts.length === 2 && parts[1] === 'chapitre1.html') return false;
    if (parts[1] === 'chapitres' && parts.length >= 3 && parts[2] === 'chapitre1.html') return false;

    if (!cleanUrl.endsWith('.html') && !cleanUrl.endsWith('.pdf')) return false;
    return true;
  }

  function getCourseFromPath() {
    var parts = path.split('/').filter(Boolean);
    if (parts.length >= 1 && COURSE_DIRS.indexOf(parts[0]) !== -1) {
      return parts[0];
    }
    return null;
  }

  function canAccessCourse(level, course) {
    var r = LEVEL_RANK[level] || 0;
    var c = LEVEL_RANK[COURSE_LEVELS[course]] || 0;
    if (!r || !c) return true;
    return r >= c;
  }

  var protectedPage = isProtectedPage();
  var currentCourse = getCourseFromPath();

  // ── CRITIQUE : masquer immédiatement le contenu payant ──
  if (protectedPage) {
    document.documentElement.classList.add('auth-content-hidden');
  }

  fetch('/api/verify', { credentials: 'include' })
    .then(function (res) { return res.json(); })
    .then(function (data) {
      if (!data.authenticated) {
        if (protectedPage) showPaywallOverlay('auth');
        // Pages libres : RIEN à afficher (zéro trace d'abonnement)
        return;
      }

      // Niveau insuffisant : UNIQUEMENT sur une page protégée !
      if (protectedPage && currentCourse && !canAccessCourse(data.level, currentCourse)) {
        showLevelOverlay(data.level, currentCourse);
        return;
      }

      if (protectedPage && !data.subscribed) {
        // Connecté mais pas abonné → paywall
        showPaywallOverlay('subscription');
      } else {
        document.documentElement.classList.remove('auth-content-hidden');
        showAuthBadge(data.account, data.level);
        addLogoutButton();
      }
    })
    .catch(function () {
      if (protectedPage) {
        showPaywallOverlay('auth');
      }
    });

  /**
   * Overlay paiement / connexion.
   */
  function showPaywallOverlay(reason) {
    document.documentElement.classList.add('auth-content-hidden');

    var redirectParam = encodeURIComponent(path + window.location.search);

    var title, message;
    if (reason === 'subscription') {
      title = 'Contenu réservé aux abonnés';
      message = 'Ton compte est créé mais l\'abonnement n\'est pas actif. ' +
        'Abonnement <strong>1 000 F / mois</strong> pour accéder à tout le contenu.';
    } else {
      title = 'Connexion requise';
      message = 'Ce contenu est réservé aux abonnés. Connecte-toi ou crée un compte, ' +
        'puis souscris l\'abonnement <strong>1 000 F / mois</strong> pour y accéder.';
    }

    var overlay = document.createElement('div');
    overlay.id = 'auth-blocking-overlay';
    overlay.setAttribute('role', 'alertdialog');
    overlay.setAttribute('aria-label', title);
    overlay.innerHTML =
      '<div class="auth-block-card">' +
        '<div class="auth-block-icon">' + svgIcon('lock', 30) + '</div>' +
        '<h2 class="auth-block-title">' + title + '</h2>' +
        '<p class="auth-block-message">' + message + '</p>' +
        '<div class="auth-block-actions">' +
          (reason === 'auth'
            ? '<a href="/_auth/login.html?redirect=' + redirectParam + '" class="auth-block-btn auth-block-btn-primary">Se connecter</a>' +
              '<a href="/_auth/login.html?mode=register&redirect=' + redirectParam + '" class="auth-block-btn auth-block-btn-secondary">Créer un compte</a>'
            : '<a href="/_auth/account.html?payment=required&redirect=' + redirectParam + '" class="auth-block-btn auth-block-btn-primary">S\'abonner — 1 000 F / mois</a>' +
              '<a href="/' + (currentCourse || '') + '/index.html" class="auth-block-btn auth-block-btn-secondary">' + svgIcon('arrow-left', 16) + ' Retour au sommaire</a>') +
        '</div>' +
      '</div>';

    document.body.appendChild(overlay);
  }

  /**
   * Overlay « niveau insuffisant » : le compte est connecté mais d'un niveau
   * inférieur au cours demandé (B1 ⊄ B2/B3, B2 ⊄ B3).
   */
  function showLevelOverlay(level, course) {
    document.documentElement.classList.add('auth-content-hidden');

    var labels = { b1: 'Licence 1', b2: 'Licence 2', b3: 'Licence 3' };
    var needed = LEVEL_RANK[COURSE_LEVELS[course]] > LEVEL_RANK[level]
      ? (COURSE_LEVELS[course] === 'b3' ? 'Licence 3' : 'Licence 2')
      : '';

    var overlay = document.createElement('div');
    overlay.id = 'auth-blocking-overlay';
    overlay.setAttribute('role', 'alertdialog');
    overlay.setAttribute('aria-label', 'Niveau insuffisant');
    overlay.innerHTML =
      '<div class="auth-block-card">' +
        '<div class="auth-block-icon">' + svgIcon('graduation', 30) + '</div>' +
        '<h2 class="auth-block-title">Niveau insuffisant</h2>' +
        '<p class="auth-block-message">Ce cours est réservé au niveau <strong>' +
          needed + '</strong>. Ton compte est en <strong>' + (labels[level] || level) +
          '</strong>. Les niveaux supérieurs incluent les niveaux inférieurs — fais évoluer ton accès pour débloquer ce cours.</p>' +
        '<div class="auth-block-actions">' +
          '<a href="/_auth/account.html?level=denied" class="auth-block-btn auth-block-btn-primary">Voir mon niveau</a>' +
          '<a href="/" class="auth-block-btn auth-block-btn-secondary">' + svgIcon('arrow-left', 16) + ' Portail des cours</a>' +
        '</div>' +
      '</div>';

    document.body.appendChild(overlay);
  }

  /**
   * Badge discret utilisateur connecté.
   */
  function showAuthBadge(account, level) {
    var badge = document.createElement('a');
    badge.href = '/_auth/account.html';
    badge.id = 'auth-badge';
    badge.title = 'Accéder à mon espace personnel';

    var name = account && account.email ? account.email : 'Compte';
    var lvl = level ? String(level).toUpperCase() : '';
    badge.innerHTML =
      '<span class="auth-badge-dot"></span>' +
      (lvl ? '<span class="auth-badge-level">' + lvl + '</span>' : '') +
      '<span class="auth-badge-email">' + String(name).replace(/[<>&"]/g, '') + '</span>';
    document.body.appendChild(badge);
  }

  function addLogoutButton() {
    var badge = document.getElementById('auth-badge');
    if (!badge) return;

    var logoutBtn = document.createElement('button');
    logoutBtn.id = 'auth-logout-btn';
    logoutBtn.innerHTML = svgIcon('x', 14);
    logoutBtn.title = 'Se déconnecter';
    logoutBtn.addEventListener('click', function () {
      if (confirm('Voulez-vous vous déconnecter ?')) {
        fetch('/api/logout', { method: 'POST', credentials: 'include' })
          .then(function () { window.location.reload(); });
      }
    });
    badge.appendChild(logoutBtn);
  }
})();
