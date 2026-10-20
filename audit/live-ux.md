# Rapport — audit live (Playwright) + audit approfondi front
Date : 2026-09-26
Cible : https://revi-mu.vercel.app (production) + lecture intégrale des 3 gros fichiers front
Méthode : Chromium headless via Playwright 1.63, axe-core 4.13, passes anonyme puis authentifiée (clé fournie par le propriétaire). Lecture seule sur la prod : aucune écriture admin, aucune validation de projet, aucune bruteforce.
Total : 2 P0, 5 P1, 4 P2, 2 P3

---

## Preuves d'exécution (extraits des rapports JSON)

| Test | Résultat |
|---|---|
| Activation clé fournie | ✅ success, redirect accueil, `/api/verify` → `{authenticated:true, scope:'all', keyClass:'b2'}` |
| Chapitre protégé authentifié (react/chapitre-2) | ✅ servi sans overlay, badge affiché |
| Déconnexion | ✅ logout 200, verify → `authenticated:false` (COOKIE_DOMAIN non défini en prod, donc LOGIQUE-004 sans impact actuel) |
| Widget RD-AI authentifié (vraie question) | ✅ réponse IA en streaming reçue, aucune erreur réseau |
| `/epreuves/index.html` | ❌ **404 NOT_FOUND Vercel en production** — COMPLETUDE-001 confirmé en live |
| Icônes RD-AI sur portail | ❌ **6/6 icônes vides** (`content: none`) — Font Awesome absent |
| Icônes RD-AI sur linux/index.html | ✅ rendues (FA chargé par cette page seulement) |
| Erreur JS sur chapitres | ❌ `TypeError: Cannot read properties of undefined (reading 'setupAutoTracker')` |
| axe-core portail | color-contrast(3), heading-order(1), link-in-text-block(2), region(4) |
| Overflow horizontal mobile 375px | ❌ portail (réparation UX-006/008 partiellement confirmée côté portail) |
| preparation-progression authentifié | ✅ 12 nœuds/12 rows rendus (mais 403 avant unlock, géré silencieusement) |
| preparation-classement authentifié | ✅ état vide correct (« apparaitra quand les participants auront validé ») |

---

### [P0] 197 chapitres sur 390 (≈ 50 %) sont des coquilles vides livrées aux abonnés
- **ID** : UX-LIVE-001 (nouveau — non détectable sans navigation réelle)
- **Type** : Contenu / Complétude — **le finding le plus grave de l'audit**
- **Fichier(s)** : 197 fichiers `chapitre-N.html` dans 21 cours (sql 16, php 16, rd_java 15, csharp 15, react 11, RD-RO 11, ccna 11, linux 10, assembleur 10, etc.)
- **Description** : les nouveaux sommaires pointent vers des pages générées qui affichent : *« Ce chapitre couvre Chapitre N, un élément essentiel de [cours]. Le contenu original est conservé dans le fichier source du cours ; cette page sert d'entrée en matière »*. **Il n'y a aucune leçon derrière.** Pendant ce temps, le VRAI contenu existe encore dans l'ancienne arborescence (`linux/chapitres/chapitre1.html` etc.), lié uniquement depuis les vieux index (`linux/index.html`) — l'ancien index reste en ligne ET le nouveau sommaire `linux/somaire` (`sommaire.html`) mène vers les pages vides. Pour react : `sommaire.html` et `index.html` ne lient QUE les pages vides — un abonné qui paie 1 000 F/mois n'a littéralement rien à lire.
- **Reproduction** : naviguer react/sommaire.html → cliquer chapitre 2 → page sans contenu. Comparer avec linux/index.html (vrai contenu accessible).
- **Cause racine** : la refonte a régénéré une arborescence de chapitres sans migrer le contenu, et retargeté les sommaires.
- **Correctif proposé** : décision produit requise — (a) relier les nouveaux sommaires vers l'ancien contenu là où il existe, (b) migrer le contenu dans les nouvelles pages, ou (c) retirer les sommaires pointant vers du vide. À traiter cours par cours.
- **Statut** : Ouvert

### [P0] `window.Progress.setupAutoTracker(...)` appelé avant le chargement de progress.js → TypeError sur 201 pages
- **ID** : UX-LIVE-002
- **Type** : Logique front
- **Fichier(s)** : 201 fichiers HTML de cours (ligne inline ~68), assets/js/progress.js (chargé avec `defer`), react/chapitre-2.html en exemple
- **Description** : les pages appellent `window.Progress.setupAutoTracker('react', 'chapitre-02')` dans un script inline en fin de body, mais progress.js est chargé avec `defer` → exécuté APRÈS les scripts inline. Résultat confirmé en prod : `TypeError: Cannot read properties of undefined (reading 'setupAutoTracker')` à chaque chargement, sur TOUTES les pages concernées. Le suivi de progression (scroll 25/50/75/90 %) ne fonctionne nulle part.
- **Reproduction** : ouvrir n'importe quel chapitre → console → TypeError. Progression jamais enregistrée.
- **Cause racine** : `defer` + script inline sans attente DOM/load.
- **Correctif proposé** : soit retirer `defer` sur progress.js, soit envelopper l'appel : `document.addEventListener('DOMContentLoaded', () => window.Progress?.setupAutoTracker(...))` — le second choix est le plus sûr.
- **Statut** : Ouvert

### [P1] Widget RD-AI : icônes vides sur toutes les pages sans Font Awesome
- **ID** : UX-LIVE-003 (confirme la suspicion issue de la lecture de rd-ai-chat.js)
- **Type** : Visuel
- **Fichier(s)** : rd-ai-chat.js (createWidget : `fa-robot`, `fa-xmark`, `fa-trash-can`, `fa-paper-plane`, `fa-user`), pages sans `<link font-awesome>` (portail, react, la majorité des 390 pages)
- **Description** : rd-ai-chat.js n'injecte jamais Font Awesome lui-même : il dépend de la page hôte. Confirmé en prod : 6/6 icônes vides sur le portail (bulle IA = cercle rose sans pictogramme, boutons header/send invisibles) ; rendues sur linux/index.html qui charge FA 6.5.1 depuis cdnjs. La bulle reste cliquable (vérifié : le panneau s'ouvre), mais l'UI est muette et opaque pour l'utilisateur.
- **Reproduction** : ouvrir revi-mu.vercel.app → bulle rose en bas à droite : aucun pictogramme robot.
- **Cause racine** : dépendance implicite non déclarée.
- **Correctif proposé** : injecter le `<link>` cdnjs Font Awesome dans injectStyles() (idempotent), ou remplacer les `<i class="fas...">` par des SVG inline (comme le fait déjà le bouton WhatsApp du même widget — cohérence).
- **Statut** : Ouvert

### [P1] console.log de debug en production dans l'atelier Preparation
- **ID** : UX-LIVE-004
- **Type** : Logique / Hygiène
- **Fichier(s)** : preparation-web/assets/js/app.js (3 occurrences `console.log('[AI Debug] ...')` lignes ~1303, ~1310, ~1324)
- **Description** : chaque envoi de message IA logge le payload complet (prompt système + question) et la réponse en console navigateur. Visible par n'importe quel utilisateur avec F12. Pas de fuite de secret (la clé API reste serveur), mais fuite du prompt système et bruit.
- **Reproduction** : atelier → panneau IA → envoyer un message → console.
- **Cause racine** : debug oublié.
- **Correctif proposé** : supprimer les 3 lignes.
- **Statut** : Ouvert

### [P1] Contrastes WCAG insuffisants confirmés par axe-core sur toutes les pages testées
- **ID** : UX-LIVE-005 (prouve UX-008 qui était « à confirmer au rendu »)
- **Type** : Visuel / Accessibilité
- **Fichier(s)** : portail (3 nœuds), chapitres react/epreuves (5 nœuds), activate.html (4 nœuds)
- **Description** : axe-core remonte des violations color-contrast sur chaque page audité en rendu réel (muted text, badges). Combiné à heading-order (1/page) et region (4-10/page), le niveau AA n'est pas atteint.
- **Reproduction** : rapport JSON `/tmp/pw-audit/live-report.json`, section axe.
- **Cause racine** : tokens de couleur muted trop clairs / textes gris sur fonds sombres.
- **Correctif proposé** : passer les tokens --text-muted en contraste ≥ 4.5:1 sur les deux modes.
- **Statut** : Ouvert

### [P1] Overflow horizontal du portail en mobile 375px
- **ID** : UX-LIVE-006
- **Type** : Visuel / Responsive
- **Fichier(s)** : index.html (grille de cartes portail)
- **Description** : `scrollWidth > clientWidth` mesuré à 375px sur le portail. La checklist design.md exige zéro débordement sur 375px.
- **Reproduction** : viewport 375px, scroll horizontal possible sur l'accueil.
- **Cause racine** : à isoler (carte featured ou grille min-width).
- **Correctif proposé** : audit des largeurs min de la grille portail.
- **Statut** : Ouvert

### [P2] Pages protégées : flash de contenu évité côté serveur, MAIS pas de masquage client précoce sur 8 cours
- **ID** : UX-LIVE-007 (validation terrain d'INTEGRATION-001)
- **Type** : UX
- **Description** : en prod, la protection serveur redirige AVANT le rendu (confirmé : chapitre-2 non authentifié → 307 vers activate.html, jamais de contenu affiché). Le risque UX-002/INTEGRATION-001 reste réel sur réseau lent (le HTML commence à être rendu pendant le fetch) mais n'est pas observable en conditions normales. Déclassé de « flash visible » à « risque de flash sur réseau lent » — la correction (synchroniser auth-check.js) reste valide.
- **Statut** : Ouvert (déclassé P1→P2)

### [P2] Atelier preparation : redirection `?preparation=locked` non traitée par index.html
- **ID** : UX-LIVE-008
- **Type** : UX
- **Fichier(s)** : index.html (aucun handler de `preparation=locked` — vérifié), server.js (émet le param)
- **Description** : en prod, un utilisateur B2 sans mot de passe section qui ouvre l'atelier est renvoyé sur l'accueil avec `?preparation=locked`, et l'accueil n'affiche AUCUN message explicatif (testé : simple accueil). L'utilisateur ne comprend pas pourquoi il a été éjecté.
- **Correctif proposé** : handler dans index.html : si param présent → toast/bannière « L'atelier nécessite le mot de passe de section » + lien.
- **Statut** : Ouvert

### [P2] epreuves/index.html lié depuis le portail → 404 Vercel en prod (déjà COMPLETUDE-001)
- **ID** : UX-LIVE-009
- **Type** : Intégration
- **Description** : confirmé en production : `GET /epreuves/index.html` → 404 NOT_FOUND (page Vercel générique, pas même une 404 maison). Le lien « Épreuves » de la nav et du footer mène au vide. Prouve COMPLETUDE-001 en conditions réelles.
- **Statut** : Ouvert (doublon de COMPLETUDE-001, preuve live ajoutée)

### [P3] Erreurs 403 console sur progression/classement non authentifiés (bruit, comportement par ailleurs correct)
- **ID** : UX-LIVE-010
- **Type** : Hygiène
- **Description** : fetch non authentifié → 401/403 loggés par le navigateur. Inoffensif (géré par catch), bruit console seulement.
- **Statut** : Ouvert

### [P3] /rd-ai-chat.js servi directement sans page → axe violations triviales (document-title etc.)
- **ID** : UX-LIVE-011
- **Type** : Hygiène
- **Description** : le fichier JS brut est accessible en navigation directe (200). Aucun risque (rien de sensible dans le fichier), mais autant servir via X-Content-Type nosniff (déjà en place). Aucune action.
- **Statut** : Ouvert (informationnel)

---

## Résultats positifs prouvés en production (doctrine oblige : le positif aussi est prouvé)

1. **Le flux d'authentification fonctionne de bout en bout** : activation → cookie httpOnly → accès protégé → badge → déconnexion effective.
2. **Le proxy IA fonctionne réellement** : vraie réponse streaming reçue en prod, aucune erreur, filtrage et markdown OK, clé API jamais exposée.
3. **La protection serveur est étanche** : chapitre protégé → redirection avant rendu ; epreuves et preparation-web inclus.
4. **Progression/classement authentifiés** : 12 projets rendus, état vide classement correct.
5. **Helmet + rate-limit actifs**, aucune erreur 500 observée pendant toute la session.

---

## Impact sur la synthèse globale de l'audit

| Avant (audit statique) | Après (live + approfondi) |
|---|---|
| 4 P0 | **6 P0** (+ UX-LIVE-001 coquilles vides, + UX-LIVE-002 setupAutoTracker) |
| 12 P1 | **14 P1** (+ icônes FA, + console.log debug ; UX-002 déclassée P2) |
| Passes design « à confirmer au rendu » | Confirmées : contrastes KO, overflow 375px KO, 404 epreuves KO |

Nouveaux totaux consolidés : **6 P0, 14 P1, 11 P2, 8 P3** — détail dans les 6 fichiers de audit/.

⚠️ **Important — la clé D7FM-WMKV** : l'activation l'a liée à l'empreinte du navigateur de test (headless). Pour l'utiliser sur un vrai appareil, une réinitialisation admin sera nécessaire (Dashboard → clé → 🔄 reset).
