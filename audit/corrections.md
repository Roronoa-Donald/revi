# Rapport — Corrections appliquées (phases 6 & 7)
Date : 2026-09-26
Référentiels : AUDIT-SANS-PITIE.md (sections 6, 7, 9, 11) + design-bundle/ (brilliant.org)
Contrainte utilisateur : **police JetBrains Mono conservée** partout.

---

## 1. Design system — alignement sur le bundle (skill impeccable)

| Élément | Avant | Après (bundle) |
|---|---|---|
| CTA principal | noir/periwinkle plat | **vert pill #29cc57, ombre 3D dure #22a94c 0 4px** (hover : enfoncement 2px) |
| Boutons secondaires | bordures grises | blancs 3D (#e4e4e4 0 4px), ghost inchangé |
| Radius | 6/10/14px | **8/12/16/18/20/24/60px** (pill 60px, cartes 20px) |
| Ombres | diffuses v3 | les 8 ombres du bundle (shadow-1 à shadow-12) |
| Couleurs | — | pastels bundle (blue/purple/red/orange/teal/yellow) + **gradient signature** #7491ff→#ff90e0→#f9d25c |
| Footer portail | papier + bordure | **noir #000000, texte #ccc** (footer brilliant) |
| Topbar | glass blur | blanche opaque + shadow-4 navbar |
| Badge démo | encre + or | noir bundle, liens blancs soulignés, hover teal |
| Overlay blocage | gradient encre | noir pur, CTA vert pill 3D + secondaire blanc 3D, focus visibles |
| Badge connecté | radius 10 | pill 9999px, dot vert #29cc57 |
| Interactif (liens/focus) | #456dff (3.1:1) | #3556d9 (AA sur papier) / #7491ff en dark |
| Cibles tactiles | 22–28px | logout 32px, close 44px, liens bannière 44px |
| Portail mobile 375px | overflow horizontal | grille `minmax(min(230px,100%),1fr)` — **zéro overflow (mesuré Playwright)** |

**Fichiers** : assets/css/tokens.css, components.css, portal.css, public/css/auth-styles.css, auth-global.css, public/activate.html, index.html
**Preuves rendu** : /tmp/pw-audit/local-portal.png, local-portal-375.png, local-react-ch2-redir.png (footer `rgb(0,0,0)` et ombre CTA `rgb(34,169,76) 0 4px` mesurés au rendu).

## 2. P0 corrigés (tous)

| ID | Correction | Preuve |
|---|---|---|
| COMPLETUDE-001 | epreuves ajouté à build.js COURSE_DIRS | `dist/epreuves/index.html` existe après build |
| UX-LIVE-001 | 145 liens sommaire→chapitres réels re-câblés (19 cours) + **181 placeholders transformés en redirections** (méta-refresh vers le vrai contenu le plus proche ; SQL → modules mod01-12) | 0 placeholder restant ; 145/145 liens valides ; 78/78 liens sommaire→placeholder passent par redirection ; 0 lien mort |
| UX-LIVE-002 | 201 pages : `setupAutoTracker` wrappé défensivement (DOMContentLoaded + retry 60ms) via scripts/fix-auto-tracker.js (idempotent, ré-exécutable via `npm run fix:auto-tracker`) | simulation d'exécution : « TRACKER OK après retry » ; 0 appel direct restant ; 12/12 wrappers parsés OK |
| LOGIQUE-001 | /api/verify : filtre anti-B1 remplacé par rejet de la seule classe 'b0' | code + test |
| LOGIQUE-002 | XSS admin : esc() appliqué à note/key_code/scope/details/ip + username nettoyé avant stockage | 0 concaténation brute restante |

## 3. P1 corrigés (tous)

- **LOGIQUE-003** : CORS `cb(null, false)` (plus de 500/stack-trace par origine externe).
- **LOGIQUE-004** : cookies symétriques pose/suppression avec COOKIE_DOMAIN (auth + admin + preparation).
- **LOGIQUE-009** : `trustProxy: true` → req.ip réelle derrière proxy, rate-limit par client réel.
- **LOGIQUE-006** : throttle last_verified (1×/5 min max) — write amplification ÷~100.
- **INTEGRATION-001/UX-002** : auth-check.js synchronisé sur les 24 cours (+ regex démo banner).
- **UX-LIVE-003** : rd-ai-chat.js injecte Font Awesome 6.5.1 si absent (icônes réparées partout).
- **UX-LIVE-004** : 3 console.log [AI Debug] supprimés de l'atelier.
- **UX-LIVE-005** : liens interactifs AA (#3556d9), focus-visible sur tous les CTA/bannières.
- **UX-LIVE-006** : overflow 375px corrigé (grille minmax) — mesuré 0 overflow.
- **COMPLETUDE-002/UX-003** : progression + classement rewrits avec **4 états** (chargement skeletons, non-connecté, verrouillé, offline/erreur) + esc() + CTA contextualisés.
- **TESTS-001** : suite `npm test` (node --test, zéro dépendance) — **13/13 verts** (access-control ×8, keygen ×5, cohérence Node/Edge/build).

## 4. P2 corrigés (les actionnables)

- **LOGIQUE-005** : '/api/' retiré de BLOCKED_PATHS (405 propre au lieu de 403).
- **COMPLETUDE-003** : allowlist racine dans server.js (index, rd-ai-chat.js, preparation-*.html, robots/sitemap/404) — test-light.html, index-light-preview.html, clarisse.html, *.md, scripts jetables ne sont plus servis.
- **COMPLETUDE-008** : robots.txt + sitemap.xml + 404.html créés (404 maison aux couleurs bundle, gradient signature).
- **COMPLETUDE-004** : roadmap retiré du build + du portail (décision utilisateur) — 6 HTML conservés sur disque.
- **INTEGRATION-003** : vercel.json cache assets → `/(.+)/assets/(.*)` (tous les cours, plus de regex incomplète).
- **UX-LIVE-008** : bannière d'explication `?preparation=locked` sur le portail + retrait du paramètre d'URL.
- **UX-LIVE-007** : (déjà couvert par INTEGRATION-001).
- **TESTS-003** : script `stop` taskkill supprimé de package.json.

## 5. Vérification finale (boucle section 9)

- `node --check` : les 12 fichiers JS modifiés — OK.
- `npm test` : 13/13.
- `npm run build` : exit 0, 779 fichiers, 580 HTML injectés ; dist/ contient epreuves/404/robots/sitemap, plus roadmap ; wrappers et redirections présents dans dist/.
- Playwright local : portail 200 (0 overflow, footer noir, bannière démo), 375px 0 overflow, 404 maison rendue, redirection chapitre placeholder fonctionnelle avec CTA vert 3D mesuré.
- Greps : 0 placeholder, 0 appel direct setupAutoTracker, 0 console.log debug, 0 `cb(new Error`, 24 cours dans auth-check, esc() présent, randomInt/trustProxy présents.

## 6. Reste hors périmètre (planifié, non bloquant)

- **UX-LIVE-001 (fond)** : les redirections sont une mitigation — le remplissage du vrai contenu des chapitres manquants (ex. react 9-11) reste un travail de rédaction.
- **LOGIQUE-008 (partiel)** : keygen resecourisé (randomInt intégral) ; le passage à des clés plus longues changerait le format produit — non fait.
- **INTEGRATION-006** : api/index.js `server.emit('request')` fonctionne en prod (prouvé) ; migration vers `app.routing()` = refonte risquée sans environnement de test Vercel.
- **TESTS-002** : les scripts check_qcm/check_html_quizzes restent limités à leurs cours codés en dur.
- Production : redéployer (Vercel) pour appliquer l'ensemble ; la clé D7FM-WMKV reste liée au navigateur de test → reset admin recommandé avant usage réel.

---

## Round prod post-déploiement (26/09/2026)

Déploiement Vercel CLI (`vercel --prod`) → https://revi-mu.vercel.app, puis re-audit Playwright live (13 vues : desktop + mobile 375).

### Constat initial post-déploiement
- Fonctionnel : tout OK (epreuves 200 protégé, redirections chapitres, FA icônes, bannière démo, 0 erreur JS, 0 overflow, RD-AI streaming OK).
- axe-core : 22 violations résiduelles (contraste sérieux, heading-order, landmarks `region`).

### Corrections appliquées (source, puis rebuild)
| Zone | Correctif |
|---|---|
| `assets/css/base.css` (via portal.css) | La règle `p { color }` rendait le footer noir illisible (#141414 sur #000) → `.portal-footer p { color:#ccc }` + lien souligné (axe link-in-text-block) |
| `assets/css/portal.css` + `components.css` | `.chip__count` : opacity .65/.7 → couleur pleine AA (`--color-text-muted`, blanc sur chip active) |
| `index.html` | Skip-link wrappé `<nav class="skip-nav">` (landmark) ; compteurs chips corrigés (23/12/11) ; `aria-label` sur la marque topbar (texte masqué en mobile) |
| `public/activate.html` | `--text-muted` #78716c → #57534e (AA) ; `.c-name`, `.info-box`, `.promo-cta` : accent sur fond clair → #4c5fd6/#141414 ; h3 orphelin → `p.info-box-title` ; `<div class="card">` → `<main>` ; bannière → `role="region"` ; bouton vert → texte foncé #14320f (bundle) |
| `public/css/auth-styles.css` | CTA overlay vert : blanc → #14320f |
| `rd-ai-chat.js` | h3 orphelin panel → `span.rdai-title role=heading aria-level=2` ; lien WhatsApp wrappé dans `div[role=region][aria-label]` |
| `linux/assets/css/style.css` + `index.html` | XP badge : #fb923c → #c2410c + fond opaque #fff1e6 ; hero-badge → #c2410c ; floating-keywords décoratifs masqués (`display:none`) ; subtitles/footer → `--text-secondary` ; back-link/footer-copy/coeur/code → `--accent-2`/AA ; hero + skip-link intégrés aux landmarks (`<main>`, nav) |
| `react/index.html` | mobile-nav → `role="dialog" aria-label` ; skip-link → nav |
| `linux/assets/js/gamification.js` | bubble BashBuddy → `role="status" aria-live="polite"` |
| `404.html` | « 22 cours » → « 23 cours » |
| `preparation-progression/classement.html` | CTA vert → texte #14320f ; h3 orphelins → `p.state-title` |

### Résultat final (Playwright + axe-core en prod)
- **0 violation axe** sur : portail (desktop+375), react index (desktop+375), linux, activation (desktop+375), epreuves, chapitre protégé, prep progression/classement, 404.
- Seules « violations » restantes : les 5 de `rdai-js-direct` = faux positif (axe audite le fichier JS brut comme page HTML — pas une page).
- `404-test` : 404 = comportement attendu (preuve, pas un problème).
- 0 erreur JS, 0 overflow 375px, icônes FA rendues, panel RD-AI fonctionnel sur toutes les vues.

⚠️ Rappel : clé de test D7FM-WMKV liée au fingerprint du navigateur headless d'audit → à réinitialiser via dashboard admin (🔄) avant usage réel.

---

## Migration Comptes Utilisateurs + FedaPay (26/09/2026)

Refonte complète de l'authentification, déployée et vérifiée en prod.

### Nouvelle politique d'accès
- **Chapitre 1 de chaque cours : gratuit** (visiteur anonyme, aucune trace d'abonnement : ni bannière, ni CTA).
- **Payant** : chapitres ≥ 2, PDFs, données QCM, epreuves (tout), preparation-web.
- **Zéro bannière d'abonnement** sur le portail, les index et les chapitres 1 — le paywall n'apparaît QUE sur du contenu payant.

### Comptes users (remplacent les clés)
- Inscription/connexion **email + mot de passe** (`/_auth/login.html`, onglets Se connecter / S'inscrire / mot de passe oublié).
- Mots de passe hachés **scrypt** natif (`server/utils/password.js`).
- **Session unique par compte** : une connexion sur un nouvel appareil déconnecte l'ancien (kick vérifié en prod).
- **Page Mon compte** (`/_auth/account.html`) : statut abonnement, échéance, appareil, S'abonner/Renouveler, déconnexion.
- **Reset password** : token 30 min hashé en base, email SMTP (Gmail App Password), sessions révoquées après reset.
- **Fingerprint conservé** : hashé en base à chaque connexion (traçage appareil), dashboard admin affiche/permets de déverrouiller.
- `/api/activate` renvoie 410 ; `_auth/activate.html` → 308 vers login (redirect Vercel).

### Abonnements
- Statut `free | active` + `subscription_expires_at` (durée mensuelle 30j par défaut, extensible par paliers de mois ; renouvellement anticipé cumulé après l'échéance).
- **Admin** : création de comptes, +1 mois, retrait d'abonnement, déverrouillage appareil, activation/désactivation, suppression, sessions, paiements, logs (dashboard réécrit).
- **FedaPay** (`server/routes/fedapay.js`) : checkout (transaction + token, fetch natif), webhook signé HMAC `t=…,s=…` vérifié manuellement (tolérance 5 min), `transaction.approved` → abonnement prolongé + email de reçu, idempotent.

### Corrections de sécurité découvertes au déploiement
- ⚠️ **`NODE_ENV="development"` était défini dans Vercel production depuis la création** → cookies `auth_token`/`admin_token` sans flag Secure + fuite du lien de reset en prod. Corrigé : variable supprimée + `IS_PROD` basé sur `VERCEL_ENV === 'production'` en secours + `devResetUrl` jamais envoyé sur Vercel. Vérifié : `Secure` présent, plus aucun lien de reset dans les réponses.
- `sessions.machine_fingerprint` NOT NULL → fallback `'no-fingerprint'` (500 sur register sans fingerprint).
- `server.js`/`middleware.js` : redirect login sans `&course=` (scope supprimé — tout abonné = tout accès).

### Schéma (migration `002_users.sql`)
`users`, `password_reset_tokens`, `sessions.user_id`, `activity_logs.user_id/email`, `preparation_profiles/progress.user_id` (PK assouplies, index uniques partiels cohabitation clé/user), `payments`.

### Vérifications (prod réelle)
- 30/30 tests verts (nouveaux : scrypt, signatures webhook FedaPay, politique gratuit/payant).
- curl E2E : register 200 → verify authentifié → login 2e appareil → ancien cookie kické → subscribed:false → forgot-password générique (sans lien).
- Playwright local : portail/index/ch1/login/account sans bannière ni overlay ; ch2 + epreuves → paywall « Se connecter / Créer un compte » ; 0 erreur JS.
- Prod : portail 200, ch1 200, ch2/epreuves → 307 login, `/api/fedapay/config` 200, `activate.html` 308 login.

### Compte de test résiduel
`e2e-test@audit.local` (mdp `TestE2E2026!`) créé pendant l'E2E — à supprimer depuis le dashboard admin (🗑️).

### Variables d'environnement à ajouter (Vercel)
- `FEDAPAY_SECRET_KEY` (sk_live_… ou sk_sandbox_…) — active le paiement.
- `FEDAPAY_WEBHOOK_SECRET` (wh_…) — vérification webhook (dashboard FedaPay → Webhooks → URL : `https://revi-mu.vercel.app/api/fedapay/webhook`).
- `FEDAPAY_ENVIRONMENT` (optionnel : `live`/`sandbox`, auto-détecté sinon), `FEDAPAY_AMOUNT` (défaut 1000).
- `SMTP_USER` + `SMTP_PASS` (Gmail : mot de passe d'application) + `MAIL_FROM` — active les emails.
- `BASE_URL` = `https://revi-mu.vercel.app` (liens de reset et callback paiement propres).
