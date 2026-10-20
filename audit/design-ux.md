# Rapport — auditeur-design-ux
Date : 2026-09-25
Périmètre : audit statique du code (échantillon : index.html, activate.html, dashboard.html, preparation-web, auth-check.js, tokens.css, portal.css) — lecture seule, aucun navigateur lancé
Total : 0 P0, 3 P1, 3 P2, 2 P3
Méthode : conformité au référentiel design.md section 8.2, vérifiée par lecture du code rendu réel (pas seulement la présence de styles). Limitation assumée : aucun rendu navigateur exécuté pendant cette passe — chaque item est marqué « prouvé par code » ou « à confirmer au rendu ».

---

### [P1] Le système de tokens existe (assets/css/tokens.css) mais de nombreux styles codés en dur lui échappent
- **ID** : UX-001
- **Type** : Visuel
- **Fichier(s)** : assets/css/tokens.css (variables --accent-*, --bg-*, --text-*), index.html (styles inline `style="--bf-i:0"`), public/admin/dashboard.html (couleurs directes dans courseColors JS ligne ~633 : '#f97316', '#2563eb'…), pages de cours (accent défini par page)
- **Description** : le portail et l'auth utilisent correctement les tokens. Le dashboard admin hardcode 8 couleurs de cours en JS alors que `COURSE_THEMES` (access-control.js) est la source de vérité exposée via /api/admin/courses… mais sans les couleurs. Deux sources de vérité pour la même donnée visuelle.
- **Reproduction** : `rg -n "'linux':'#f97316'" public/admin/dashboard.html` → présent ; theme non exposé par /api/admin/courses (route renvoie COURSES uniquement).
- **Cause racine** : dashboard écrit avant COURSE_THEMES.
- **Correctif proposé** : exposer `COURSE_THEMES` dans /api/admin/courses et supprimer courseColors du dashboard.
- **Statut** : Ouvert

### [P1] Flash de contenu protégé sur 8 cours (contrat client/serveur rompu) — doublon INTEGRATION-001 côté UX
- **ID** : UX-002
- **Type** : Visuel / Sécurité perçue
- **Fichier(s)** : public/js/auth-check.js (ligne 13)
- **Description** : le masquage immédiat `auth-content-hidden` (mécanisme correct et présent) ne s'applique pas aux 8 cours absents de la liste client (react, api-rest-flask, erp-si, ingenierie-besoin, masterclass-apprendre, docker, infographie, preparation-web). L'utilisateur voit le chapitre protégé s'afficher 1-2 s avant la redirection serveur. C'est le même bug racine que INTEGRATION-001 — conséquence UX mesurable.
- **Reproduction** : réseau bridé, ouvrir /react/chapitre-2.html.
- **Cause racine** : liste client désynchronisée.
- **Correctif proposé** : synchronisation (voir INTEGRATION-001).
- **Statut** : Ouvert

### [P1] États obligatoires manquants sur preparation-progression.html et preparation-classement.html
- **ID** : UX-003
- **Type** : Visuel
- **Fichier(s)** : preparation-progression.html (loadProgress : catch → fallback localStorage silencieux), preparation-classement.html (ligne ~42 : seul l'état vide est géré)
- **Description** : état de chargement : absent (le squelette de la page s'affiche vide). État d'erreur : progression.html avale l'erreur réseau et bascule sur les données locales sans le signaler (le classement, lui, reste vide). État « non déverrouillé » (403) : aucun des deux ne le distingue de « vide ». Trois états sur quatre non conformes.
- **Reproduction** : couper le réseau sur /preparation-progression.html → données locales affichées sans indication.
- **Cause racine** : pages annexes moins soignées que l'atelier principal.
- **Correctif proposé** : mutualiser un helper `fetchPrepApi()` avec les 4 états, identique à app.js.
- **Statut** : Ouvert

### [P2] Dashboard admin : aucun état `hover`/`focus` dédié sur les boutons d'action des tables (actions-cell)
- **ID** : UX-004
- **Type** : Visuel (à confirmer au rendu)
- **Fichier(s)** : public/admin/dashboard.html (génération des boutons reset/revoke/delete via innerHTML, classes .btn-sm)
- **Description** : les boutons générés dynamiquement réutilisent .btn/.btn-sm (qui ont des états) — conforme en apparence. MAIS le focus clavier sur ces tables est long (une cellule par tabulation) et les cibles de ~28px (.btn-sm) sont sous la norme 44px pour usage tactile. Prouvé par CSS : `.btn-sm` réduit padding/font-size.
- **Reproduction** : tabulation dans l'onglet Clés.
- **Cause racine** : densité d'interface admin.
- **Correctif proposé** : min-height 44px sur .btn-sm en media (pointer:coarse).
- **Statut** : Ouvert

### [P2] Auth-check overlay : le CTA principal et le lien secondaire ont le même poids visuel en mobile (à confirmer), badge/logout sans cible 44px
- **ID** : UX-005
- **Type** : Visuel (à confirmer au rendu)
- **Fichier(s)** : public/js/auth-check.js (overlay #auth-blocking-overlay, bouton logout #auth-logout-btn '✕')
- **Description** : la hiérarchie primaire/secondaire est codée (auth-block-btn-primary vs secondary — conforme dans le code). Le bouton de déconnexion '✕' du badge n'a pas de taille minimale garantie (texte pur dans un bouton non stylé ici). Item confirmé par code pour la cible tactile, à confirmer au rendu pour le reste.
- **Reproduction** : mesurer #auth-logout-btn au rendu.
- **Cause racine** : élément injecté sans style dédié.
- **Correctif proposé** : styler #auth-logout-btn (min 40×40px, zone de clic).
- **Statut** : Ouvert

### [P2] Responsive admin dashboard : tableaux à 8 colonnes sans scroll horizontal dédié (à confirmer au rendu)
- **ID** : UX-006
- **Type** : Visuel (à confirmer au rendu)
- **Fichier(s)** : public/admin/dashboard.html (tables .d-main)
- **Description** : les tables de clés (8 colonnes dont actions) dépasseront 375px ; aucun wrapper overflow-x visible dans le markup lu. En dessous de ~900px, écrasement probable des cellules.
- **Reproduction** : ouvrir le dashboard à 375px.
- **Cause racine** : conçu desktop.
- **Correctif proposé** : wrapper `overflow-x:auto` autour des tables.
- **Statut** : Ouvert

### [P3] Cohérence typographique : activation.html utilise les tokens, les pages de cours leur propre système — conforme au design « par cours »
- **ID** : UX-007
- **Type** : Visuel (statut : CONFORME avec nuance)
- **Fichier(s)** : public/activate.html (thématisation par cours via COURSE_THEMES — prévu par le design), cours/* (systèmes par cours)
- **Description** : la variance de style entre cours est un choix de conception assumé (thème par cours). La checklist « une seule famille visuelle » est donc partiellement applicable ; ce qui compte est la cohérence interne par cours. Vérifié : activate.html applique bien le thème du cours (fetch /api/course-info → variables CSS).
- **Reproduction** : lecture.
- **Cause racine** : choix de design.
- **Correctif proposé** : aucun.
- **Statut** : Ouvert (conforme)

### [P3] Contrast : aucun audit de contraste automatisé possible en lecture seule — à exécuter au rendu
- **ID** : UX-008
- **Type** : Visuel (à confirmer au rendu)
- **Fichier(s)** : tokens.css, auth-styles.css, pages de cours
- **Description** : les tokens définissent des couleurs plausibles AA, mais la preuve du ratio ≥ 4.5:1 nécessite le rendu. Item reporté à la passe navigateur.
- **Reproduction** : n/a.
- **Cause racine** : limitation de méthode.
- **Correctif proposé** : passe navigateur avec audit Lighthouse/axe sur 5 écrans représentatifs.
- **Statut** : Ouvert

---

## Synthèse de la passe design
Les fondations sont saines (tokens présents, thématisation par cours fonctionnelle, overlay d'auth bien conçu). Les écarts concentrés : (1) 8 cours hors radar client (UX-002, plus grave), (2) deux pages annexes sans états complets (UX-003), (3) dashboard admin densité/tactile (UX-004/005/006), (4) items non prouvables sans navigateur (UX-008) — à passer en rendu réel avant clôture.
